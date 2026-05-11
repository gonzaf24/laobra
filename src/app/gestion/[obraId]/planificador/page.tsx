"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Layers,
  Zap,
  StickyNote,
  Wrench,
  Package,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import {
  getObra,
  saveObra,
  addEstancia,
  deleteEstancia,
} from "@/lib/arquitecto-store";
import {
  type Obra,
  type EstanciaObra,
  type TipoEstancia,
  type TipoMuro,
  type SeccionSuelo,
  type SeccionParedes,
  type SeccionAlicatado,
  type SeccionTecho,
  type SeccionPintura,
  TIPOS_ESTANCIA,
  crearSueloDefecto,
  crearParedesDefecto,
  crearAlicatadoDefecto,
  crearTechoDefecto,
  crearPinturaDefecto,
} from "@/lib/arquitecto-types";
import {
  calcularEstancia,
  calcularObra,
  enriquecerConCostes,
  type LineaMaterial,
  type LineaConCoste,
} from "@/lib/arquitecto-calc";
import { useCustomPrices } from "@/lib/materials-store";

// ─── Motor de Sugerencias Inteligentes ───
function aplicarSugerenciaInteligente(est: EstanciaObra): EstanciaObra {
  const t = est.tipo;
  const res = { ...est };

  // Reseteamos limpiamente con los valores por defecto
  // Preserve m2 from the first existing item if any
  const prevM2Suelo = est.suelo[0]?.m2 || 0;
  const prevM2Paredes = est.paredes[0]?.m2 || 0;
  const prevM2Alicatado = est.alicatado[0]?.m2 || 0;
  const prevM2Techo = est.techo[0]?.m2 || 0;
  const prevM2PinturaP = est.pintura[0]?.m2Paredes || 0;
  const prevM2PinturaT = est.pintura[0]?.m2Techo || 0;

  res.suelo = [];
  res.paredes = [];
  res.alicatado = [];
  res.techo = [];
  res.pintura = [];
  res.materialesExtras = "";
  res.notas = "";

  switch (t) {
    case "baño":
      res.suelo = [
        {
          ...crearSueloDefecto(),
          m2: prevM2Suelo,
          tipoBaldosa: "gres",
          medida: "60x60",
          tipoCola: "c2te-s1",
          espesorBaldosa: 10,
          necesitaAutonivelante: true,
          espesorNivelante: 1,
        },
      ];
      res.alicatado = [
        {
          ...crearAlicatadoDefecto(),
          m2: prevM2Alicatado,
          tipoBaldosa: "pasta",
          medida: "30x60",
          tipoCola: "c1",
          espesorBaldosa: 8,
        },
      ];
      res.techo = [{ ...crearTechoDefecto(), m2: prevM2Techo, tipo: "pladur" }];
      res.pintura = [
        {
          ...crearPinturaDefecto(),
          m2Paredes: prevM2PinturaP,
          m2Techo: prevM2PinturaT,
          manos: 2,
        },
      ];
      res.materialesExtras =
        "Plato de ducha (resina/acrílico), inodoro, lavabo, perfilería de acero inoxidable (esquinas), impermeabilizante (tela asfáltica/líquida) para zona ducha.";
      res.notas =
        "Recomendado: Usar Pladur Hidrófugo (placa verde) en el falso techo. Utilizar mortero epoxi antimoho para juntas para garantizar cero filtraciones en zona de agua.";
      break;
    case "cocina":
      res.suelo = [
        {
          ...crearSueloDefecto(),
          m2: prevM2Suelo,
          tipoBaldosa: "gres",
          medida: "60x60",
          tipoCola: "c2",
          espesorBaldosa: 10,
        },
      ];
      res.alicatado = [
        {
          ...crearAlicatadoDefecto(),
          m2: prevM2Alicatado,
          tipoBaldosa: "pasta",
          medida: "30x60",
          tipoCola: "c1",
          espesorBaldosa: 8,
        },
      ];
      res.techo = [{ ...crearTechoDefecto(), m2: prevM2Techo, tipo: "pladur" }];
      res.pintura = [
        {
          ...crearPinturaDefecto(),
          m2Paredes: prevM2PinturaP,
          m2Techo: prevM2PinturaT,
          manos: 2,
        },
      ];
      res.materialesExtras =
        "Perfiles de transición para puertas, silicona fungicida para encimeras.";
      res.notas =
        "Alicatar preferiblemente solo las zonas húmedas y de cocción (frontal), el resto se puede enyesar y pintar con pintura lavable.";
      break;
    case "salon":
    case "dormitorio":
    case "pasillo":
      res.suelo = [
        {
          ...crearSueloDefecto(),
          m2: prevM2Suelo,
          tipoBaldosa: "gres",
          medida: t === "salon" ? "90x90" : "60x60",
          tipoCola: "c2",
          encolado: t === "salon" ? "doble" : "simple",
        },
      ];
      res.paredes = [
        { ...crearParedesDefecto(), m2: prevM2Paredes, tipo: "hueco-doble" },
      ];
      res.techo = [{ ...crearTechoDefecto(), m2: prevM2Techo, tipo: "pladur" }];
      res.pintura = [
        {
          ...crearPinturaDefecto(),
          m2Paredes: prevM2PinturaP,
          m2Techo: prevM2PinturaT,
          manos: 2,
        },
      ];
      if (t === "salon")
        res.notas =
          "Para salones se recomienda baldosa de gran formato (90x90 o mayor) para dar mayor amplitud visual. Requiere SIEMPRE doble encolado.";
      break;
    case "terraza":
      res.suelo = [
        {
          ...crearSueloDefecto(),
          m2: prevM2Suelo,
          tipoBaldosa: "gres",
          medida: "60x60",
          tipoCola: "c2te-s1",
          espesorBaldosa: 14,
        },
      ];
      res.paredes = [
        { ...crearParedesDefecto(), m2: prevM2Paredes, tipo: "bloque-10" },
      ];
      res.materialesExtras =
        "Impermeabilizante exterior, sumideros, rodapié de exterior a juego.";
      res.notas =
        "OBLIGATORIO: Usar porcelánico ANTIDESLIZANTE (C3) para exteriores y Cemento Cola Flexible C2TE-S1 para aguantar la dilatación por cambios de temperatura.";
      break;
  }
  return res;
}

// ─── Helpers ───
const inputCls =
  "focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-white outline-none";
const selectCls = inputCls;
const labelCls =
  "mb-1 block text-[10px] font-bold tracking-widest text-slate-400 uppercase";

function Toggle({
  on,
  onToggle,
  label,
}: {
  on: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onToggle}
      className={`flex w-full items-center gap-2 rounded-lg border p-3 text-left transition-all ${on ? "border-violet-500/40 bg-violet-500/10" : "border-slate-800 bg-slate-900/40 hover:border-slate-700"}`}
    >
      {on ? (
        <ToggleRight size={18} className="text-violet-400" />
      ) : (
        <ToggleLeft size={18} className="text-slate-600" />
      )}
      <span
        className={`text-xs font-bold tracking-widest uppercase ${on ? "text-violet-300" : "text-slate-500"}`}
      >
        {label}
      </span>
    </button>
  );
}

// ─── Sección Suelo ───
function EditorSuelo({
  est,
  onChange,
}: {
  est: EstanciaObra;
  onChange: (e: EstanciaObra) => void;
}) {
  if (est.suelo.length === 0) return null;

  const updateItem = (index: number, patch: Partial<SeccionSuelo>) => {
    const arr = [...est.suelo];
    arr[index] = { ...arr[index], ...patch };
    onChange({ ...est, suelo: arr });
  };

  const removeItem = (index: number) => {
    const arr = est.suelo.filter((_, i) => i !== index);
    onChange({ ...est, suelo: arr });
  };

  const addItem = () => {
    onChange({ ...est, suelo: [...est.suelo, crearSueloDefecto()] });
  };

  return (
    <div className="space-y-4">
      {est.suelo.map((s, i) => (
        <div
          key={i}
          className="relative space-y-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-black tracking-widest text-emerald-400 uppercase">
              Configuración del Suelo {est.suelo.length > 1 ? `#${i + 1}` : ""}
            </p>
            {est.suelo.length > 1 && (
              <button
                onClick={() => removeItem(i)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>

          {/* Opciones de preparación */}
          <div className="flex flex-wrap gap-3 border-b border-emerald-500/10 pb-3">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-300">
              <input
                type="checkbox"
                checked={s.necesitaPicado || false}
                onChange={(e) =>
                  updateItem(i, { necesitaPicado: e.target.checked })
                }
                className="h-3.5 w-3.5 accent-orange-400"
              />
              <span>Picar suelo existente</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-300">
              <input
                type="checkbox"
                checked={s.soloNivelado || false}
                onChange={(e) =>
                  updateItem(i, { soloNivelado: e.target.checked })
                }
                className="h-3.5 w-3.5 accent-amber-400"
              />
              <span>
                Solo nivelar{" "}
                <span className="text-slate-500">(sin baldosa)</span>
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-300">
              <input
                type="checkbox"
                checked={s.necesitaPuenteUnion || false}
                onChange={(e) =>
                  updateItem(i, { necesitaPuenteUnion: e.target.checked })
                }
                className="h-3.5 w-3.5 accent-violet-400"
              />
              <span>Puente de Unión</span>
            </label>
          </div>

          {/* Baldosa (oculta si soloNivelado) */}
          {!s.soloNivelado && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>m² Suelo</label>
                <input
                  type="number"
                  className={inputCls}
                  value={s.m2 || ""}
                  onChange={(e) =>
                    updateItem(i, { m2: Number(e.target.value) })
                  }
                  placeholder="Ej: 20"
                />
              </div>
              <div>
                <label className={labelCls}>Tipo Baldosa</label>
                <select
                  className={selectCls}
                  value={s.tipoBaldosa}
                  onChange={(e) =>
                    updateItem(i, {
                      tipoBaldosa: e.target.value as "gres" | "pasta",
                    })
                  }
                >
                  <option value="gres">Gres Porcelánico</option>
                  <option value="pasta">Pasta Blanca/Roja</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Medida</label>
                <select
                  className={selectCls}
                  value={s.medida}
                  onChange={(e) => updateItem(i, { medida: e.target.value })}
                >
                  {s.tipoBaldosa === "gres" ? (
                    <>
                      <option value="30x60">30x60</option>
                      <option value="60x60">60x60</option>
                      <option value="90x90">90x90</option>
                      <option value="120x60">120x60</option>
                    </>
                  ) : (
                    <>
                      <option value="20x20">20x20</option>
                      <option value="30x60">30x60</option>
                      <option value="33x100">33x100</option>
                    </>
                  )}
                </select>
              </div>
              <div>
                <label className={labelCls}>Espesor (mm)</label>
                <input
                  type="number"
                  className={inputCls}
                  value={s.espesorBaldosa || ""}
                  onChange={(e) =>
                    updateItem(i, { espesorBaldosa: Number(e.target.value) })
                  }
                  placeholder="10"
                />
              </div>
              <div>
                <label className={labelCls}>Tipo Cola</label>
                <select
                  className={selectCls}
                  value={s.tipoCola}
                  onChange={(e) =>
                    updateItem(i, {
                      tipoCola: e.target.value as "c1" | "c2" | "c2te-s1",
                    })
                  }
                >
                  <option value="c1">C1 Básico</option>
                  <option value="c2">C2 Porcelánico</option>
                  <option value="c2te-s1">C2TE S1 Flexible</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Encolado</label>
                <select
                  className={selectCls}
                  value={s.encolado}
                  onChange={(e) =>
                    updateItem(i, {
                      encolado: e.target.value as "simple" | "doble",
                    })
                  }
                >
                  <option value="simple">Simple</option>
                  <option value="doble">Doble</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Junta (mm)</label>
                <input
                  type="number"
                  className={inputCls}
                  value={s.anchoJunta || ""}
                  onChange={(e) =>
                    updateItem(i, { anchoJunta: Number(e.target.value) })
                  }
                  placeholder="3"
                />
              </div>
              <div>
                <label className={labelCls}>Merma %</label>
                <select
                  className={selectCls}
                  value={s.merma}
                  onChange={(e) =>
                    updateItem(i, { merma: Number(e.target.value) })
                  }
                >
                  <option value={5}>5%</option>
                  <option value={10}>10%</option>
                  <option value={15}>15%</option>
                  <option value={20}>20%</option>
                </select>
              </div>
            </div>
          )}

          {/* Solo nivelado: solo m² */}
          {s.soloNivelado && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>m² Suelo</label>
                <input
                  type="number"
                  className={inputCls}
                  value={s.m2 || ""}
                  onChange={(e) =>
                    updateItem(i, { m2: Number(e.target.value) })
                  }
                  placeholder="Ej: 20"
                />
              </div>
            </div>
          )}

          {/* Autonivelante */}
          <div className="flex flex-col gap-3 border-t border-emerald-500/10 pt-3">
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={s.necesitaAutonivelante}
                  onChange={(e) =>
                    updateItem(i, { necesitaAutonivelante: e.target.checked })
                  }
                  className="accent-primary h-4 w-4"
                />
                <span>
                  Necesita <strong className="text-white">Autonivelante</strong>
                </span>
              </label>
              {s.necesitaAutonivelante && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="8"
                    className={inputCls + " w-20!"}
                    value={s.espesorNivelante || ""}
                    onChange={(e) =>
                      updateItem(i, {
                        espesorNivelante: Number(e.target.value),
                      })
                    }
                    placeholder="0.5"
                  />
                  <span className="text-[10px] text-slate-400">cm grosor</span>
                </div>
              )}
            </div>
            {s.necesitaAutonivelante && (
              <p className="text-[10px] leading-relaxed font-bold text-emerald-300">
                {s.espesorNivelante <= 1
                  ? "👉 Autonivelante de 10 (hasta 10mm)."
                  : "👉 Autonivelante de 80 (10-80mm)."}
              </p>
            )}
          </div>

          {i === est.suelo.length - 1 && (
            <div className="mt-2 rounded border border-emerald-500/10 bg-emerald-900/30 p-2.5 text-[10px] leading-relaxed text-emerald-200/80">
              <strong className="text-emerald-300">💡 Tip:</strong> Para
              baños/exteriores → Gres + Cola C2TE-S1. Doble encolado obligatorio
              si baldosa {">"} 60x60. Activa &quot;Puente de Unión&quot; si el
              suelo base es hormigón liso.
            </div>
          )}
        </div>
      ))}
      <button
        onClick={addItem}
        className="flex w-full items-center justify-center gap-1.5 rounded border border-emerald-500/20 py-2 text-xs font-bold text-emerald-400 transition-colors hover:bg-emerald-500/10"
      >
        <Plus size={14} /> Añadir otro suelo
      </button>
    </div>
  );
}

// ─── Sección Paredes ───
function EditorParedes({
  est,
  onChange,
}: {
  est: EstanciaObra;
  onChange: (e: EstanciaObra) => void;
}) {
  if (est.paredes.length === 0) return null;
  const updateItem = (index: number, patch: Partial<SeccionParedes>) => {
    const arr = [...est.paredes];
    arr[index] = { ...arr[index], ...patch };
    onChange({ ...est, paredes: arr });
  };
  const removeItem = (index: number) =>
    onChange({ ...est, paredes: est.paredes.filter((_, i) => i !== index) });
  const addItem = () =>
    onChange({ ...est, paredes: [...est.paredes, crearParedesDefecto()] });
  const esPladur = (tipo: string) => tipo.startsWith("pladur");

  return (
    <div className="space-y-4">
      {est.paredes.map((s, i) => (
        <div
          key={i}
          className="relative space-y-3 rounded-lg border border-sky-500/20 bg-sky-500/5 p-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-black tracking-widest text-sky-400 uppercase">
              Configuración de Tabiquería / Pared{" "}
              {est.paredes.length > 1 ? `#${i + 1}` : ""}
            </p>
            {est.paredes.length > 1 && (
              <button
                onClick={() => removeItem(i)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>m² Tabiquería / Pared</label>
              <input
                type="number"
                className={inputCls}
                value={s.m2 || ""}
                onChange={(e) => updateItem(i, { m2: Number(e.target.value) })}
                placeholder="Ej: 35"
              />
            </div>
            <div>
              <label className={labelCls}>Tipo Construcción</label>
              <select
                className={selectCls}
                value={s.tipo}
                onChange={(e) =>
                  updateItem(i, { tipo: e.target.value as TipoMuro })
                }
              >
                <option value="pladur-13">Pladur 13mm (Estándar)</option>
                <option value="pladur-15">Pladur 15mm (Reforzado)</option>
                <option value="pladur-hidro">Pladur Hidrófugo (Verde)</option>
                <option value="pladur-fuego">Pladur Ignífugo (Rosa)</option>
                <option value="hueco-sencillo">Ladrillo Hueco Sencillo</option>
                <option value="hueco-doble">Ladrillo Hueco Doble</option>
                <option value="perforado">Ladrillo Perforado</option>
                <option value="macizo">Ladrillo Macizo</option>
                <option value="bloque-10">Bloque Hormigón 10cm</option>
                <option value="bloque-20">Bloque Hormigón 20cm</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Altura Media (m)</label>
              <input
                type="number"
                step="0.1"
                className={inputCls}
                value={s.alturaMedia || 2.5}
                onChange={(e) =>
                  updateItem(i, { alturaMedia: Number(e.target.value) })
                }
                placeholder="2.5"
              />
              <p className="mt-1 text-[9px] leading-tight text-slate-500">
                Distancia del suelo al techo. Vital para perfiles.
              </p>
            </div>
            {esPladur(s.tipo) && (
              <div>
                <label className={labelCls}>Modo Pladur</label>
                <select
                  className={selectCls}
                  value={s.modoPladur || "tabique-nuevo"}
                  onChange={(e) =>
                    updateItem(i, {
                      modoPladur: e.target.value as
                        | "trasdosado"
                        | "tabique-nuevo",
                    })
                  }
                >
                  <option value="tabique-nuevo">
                    Tabique Nuevo (Canal+Montante)
                  </option>
                  <option value="trasdosado">
                    Trasdosado (Omega sobre pared)
                  </option>
                </select>
              </div>
            )}
            {esPladur(s.tipo) &&
              (s.modoPladur || "tabique-nuevo") === "tabique-nuevo" && (
                <div>
                  <label className={labelCls}>Caras con Placa</label>
                  <select
                    className={selectCls}
                    value={s.caras || 2}
                    onChange={(e) =>
                      updateItem(i, { caras: Number(e.target.value) as 1 | 2 })
                    }
                  >
                    <option value={2}>2 Caras (Divide habitaciones)</option>
                    <option value={1}>1 Cara (Cierre)</option>
                  </select>
                </div>
              )}
          </div>
          {/* Opciones Ladrillo: Enfoscado y Yeso */}
          <div className="flex flex-wrap gap-3 border-t border-sky-500/10 pt-3">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-300">
              <input
                type="checkbox"
                checked={s.necesitaDemolicion || false}
                onChange={(e) =>
                  updateItem(i, { necesitaDemolicion: e.target.checked })
                }
                className="h-3.5 w-3.5 accent-red-500"
              />
              <span className="font-bold text-red-400">Picar pared existente</span>
            </label>

            {!esPladur(s.tipo) && !s.necesitaDemolicion && (
              <>
                <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={s.necesitaEnfoscado || false}
                    onChange={(e) =>
                      updateItem(i, { necesitaEnfoscado: e.target.checked })
                    }
                    className="h-3.5 w-3.5 accent-amber-400"
                  />
                  <span>
                    Capa base de cemento{" "}
                    <span className="text-slate-500">(Nivelar pared)</span>
                  </span>
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={s.necesitaGuarnecidoYeso || false}
                    onChange={(e) =>
                      updateItem(i, { necesitaGuarnecidoYeso: e.target.checked })
                    }
                    className="h-3.5 w-3.5 accent-yellow-400"
                  />
                  <span>
                    Alisado final con yeso{" "}
                    <span className="text-slate-500">(Para pintar)</span>
                  </span>
                </label>
              </>
            )}
          </div>
          {/* Tip */}
          {esPladur(s.tipo) && (
            <div className="mt-1 rounded border border-sky-500/10 bg-sky-900/30 p-2 text-[10px] leading-relaxed text-sky-200/80">
              <strong className="text-sky-300">💡</strong>{" "}
              {(s.modoPladur || "tabique-nuevo") === "trasdosado"
                ? "Trasdosado: Perfil Omega directo a pared existente (~2cm). Ideal para forrar paredes feas/torcidas."
                : "Tabique nuevo: Canal (suelo/techo) + Montante (cada 60cm). Estructura independiente para dividir espacios."}
            </div>
          )}
          {!esPladur(s.tipo) && i === est.paredes.length - 1 && (
            <div className="mt-1 rounded border border-sky-500/10 bg-sky-900/30 p-2 text-[10px] leading-relaxed text-sky-200/80">
              <strong className="text-orange-300">💡 Tip de Obra:</strong> La{" "}
              <b>Capa Base</b> (Mortero de Cemento) es para tapar el ladrillo y
              nivelar (ideal para poner azulejos). El <b>Alisado</b> (Yeso
              blanco) es la capa final para que la pared quede suave y perfecta
              para <b>pintar</b>.
            </div>
          )}
        </div>
      ))}
      <button
        onClick={addItem}
        className="flex w-full items-center justify-center gap-1.5 rounded border border-sky-500/20 py-2 text-xs font-bold text-sky-400 transition-colors hover:bg-sky-500/10"
      >
        <Plus size={14} /> Añadir otras paredes
      </button>
    </div>
  );
}

// ─── Sección Alicatado ───
function EditorAlicatado({
  est,
  onChange,
}: {
  est: EstanciaObra;
  onChange: (e: EstanciaObra) => void;
}) {
  if (est.alicatado.length === 0) return null;

  const updateItem = (index: number, patch: Partial<SeccionAlicatado>) => {
    const arr = [...est.alicatado];
    arr[index] = { ...arr[index], ...patch };
    onChange({ ...est, alicatado: arr });
  };

  const removeItem = (index: number) => {
    const arr = est.alicatado.filter((_, i) => i !== index);
    onChange({ ...est, alicatado: arr });
  };

  const addItem = () => {
    onChange({
      ...est,
      alicatado: [...est.alicatado, crearAlicatadoDefecto()],
    });
  };

  return (
    <div className="space-y-4">
      {est.alicatado.map((s, i) => (
        <div
          key={i}
          className="relative space-y-3 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-black tracking-widest text-blue-400 uppercase">
              Configuración de Cerámica en Pared{" "}
              {est.alicatado.length > 1 ? `#${i + 1}` : ""}
            </p>
            {est.alicatado.length > 1 && (
              <button
                onClick={() => removeItem(i)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>m² Cerámica</label>
              <input
                type="number"
                className={inputCls}
                value={s.m2 || ""}
                onChange={(e) => updateItem(i, { m2: Number(e.target.value) })}
                placeholder="Ej: 15"
              />
            </div>
            <div>
              <label className={labelCls}>Tipo Material</label>
              <select
                className={selectCls}
                value={s.tipoBaldosa}
                onChange={(e) =>
                  updateItem(i, {
                    tipoBaldosa: e.target.value as "gres" | "pasta",
                  })
                }
              >
                <option value="pasta">Pasta Blanca/Roja (Habitual)</option>
                <option value="gres">Gres Porcelánico</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Medida</label>
              <select
                className={selectCls}
                value={s.medida}
                onChange={(e) => updateItem(i, { medida: e.target.value })}
              >
                {s.tipoBaldosa === "gres" ? (
                  <>
                    <option value="30x60">30x60</option>
                    <option value="60x60">60x60</option>
                  </>
                ) : (
                  <>
                    <option value="20x20">20x20</option>
                    <option value="25x75">25x75</option>
                    <option value="30x60">30x60</option>
                    <option value="30x90">30x90</option>
                    <option value="33x100">33x100</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label className={labelCls}>Espesor (mm)</label>
              <input
                type="number"
                className={inputCls}
                value={s.espesorBaldosa || ""}
                onChange={(e) =>
                  updateItem(i, { espesorBaldosa: Number(e.target.value) })
                }
                placeholder="8"
              />
            </div>
            <div>
              <label className={labelCls}>Tipo Cola</label>
              <select
                className={selectCls}
                value={s.tipoCola}
                onChange={(e) =>
                  updateItem(i, {
                    tipoCola: e.target.value as "c1" | "c2" | "c2te-s1",
                  })
                }
              >
                <option value="c1">C1 Básico</option>
                <option value="c2">C2 Porcelánico</option>
                <option value="c2te-s1">C2TE S1 Flexible</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Encolado</label>
              <select
                className={selectCls}
                value={s.encolado}
                onChange={(e) =>
                  updateItem(i, {
                    encolado: e.target.value as "simple" | "doble",
                  })
                }
              >
                <option value="simple">Simple</option>
                <option value="doble">Doble</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Junta (mm)</label>
              <input
                type="number"
                className={inputCls}
                value={s.anchoJunta || ""}
                onChange={(e) =>
                  updateItem(i, { anchoJunta: Number(e.target.value) })
                }
                placeholder="2"
              />
            </div>
            <div>
              <label className={labelCls}>Merma %</label>
              <select
                className={selectCls}
                value={s.merma}
                onChange={(e) =>
                  updateItem(i, { merma: Number(e.target.value) })
                }
              >
                <option value={5}>5%</option>
                <option value={10}>10%</option>
                <option value={15}>15%</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 border-t border-blue-500/10 pt-3">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-300">
              <input
                type="checkbox"
                checked={s.necesitaPuenteUnion || false}
                onChange={(e) =>
                  updateItem(i, { necesitaPuenteUnion: e.target.checked })
                }
                className="h-3.5 w-3.5 accent-violet-400"
              />
              <span>
                Puente de Unión{" "}
                <span className="text-slate-500">(sobre Pladur/hormigón)</span>
              </span>
            </label>
          </div>

          {i === est.alicatado.length - 1 && (
            <div className="mt-2 rounded border border-blue-500/10 bg-blue-900/30 p-2.5 text-[10px] leading-relaxed text-blue-200/80">
              <strong className="text-blue-300">💡 Tip de Arquitecto:</strong>{" "}
              En baños, la cerámica de Pasta Blanca/Roja es la opción más
              habitual y económica para paredes. Utiliza Cola C1. Si prefieres
              colocar Gres Porcelánico también en la pared, debes usar Cola C2.
            </div>
          )}
        </div>
      ))}
      <button
        onClick={addItem}
        className="flex w-full items-center justify-center gap-1.5 rounded border border-blue-500/20 py-2 text-xs font-bold text-blue-400 transition-colors hover:bg-blue-500/10"
      >
        <Plus size={14} /> Añadir otra cerámica de pared
      </button>
    </div>
  );
}

// ─── Sección Techo ───
function EditorTecho({
  est,
  onChange,
}: {
  est: EstanciaObra;
  onChange: (e: EstanciaObra) => void;
}) {
  if (est.techo.length === 0) return null;
  const updateItem = (index: number, patch: Partial<SeccionTecho>) => {
    const arr = [...est.techo];
    arr[index] = { ...arr[index], ...patch };
    onChange({ ...est, techo: arr });
  };
  const removeItem = (index: number) =>
    onChange({ ...est, techo: est.techo.filter((_, i) => i !== index) });
  const addItem = () =>
    onChange({ ...est, techo: [...est.techo, crearTechoDefecto()] });

  return (
    <div className="space-y-4">
      {est.techo.map((s, i) => (
        <div
          key={i}
          className="relative space-y-3 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-black tracking-widest text-indigo-400 uppercase">
              Configuración del Techo {est.techo.length > 1 ? `#${i + 1}` : ""}
            </p>
            {est.techo.length > 1 && (
              <button
                onClick={() => removeItem(i)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>m² Techo</label>
              <input
                type="number"
                className={inputCls}
                value={s.m2 || ""}
                onChange={(e) => updateItem(i, { m2: Number(e.target.value) })}
                placeholder="Ej: 12"
              />
            </div>
            <div>
              <label className={labelCls}>Tipo Techo</label>
              <select
                className={selectCls}
                value={s.tipo}
                onChange={(e) =>
                  updateItem(i, {
                    tipo: e.target.value as "pladur" | "yeso" | "pintura-solo",
                  })
                }
              >
                <option value="pladur">Falso Techo Pladur</option>
                <option value="yeso">Enlucido de Yeso</option>
                <option value="pintura-solo">Solo Pintura</option>
              </select>
            </div>
            {s.tipo === "pladur" && (
              <>
                <div>
                  <label className={labelCls}>Tipo Placa</label>
                  <select
                    className={selectCls}
                    value={s.tipoPlaca || "blanca"}
                    onChange={(e) =>
                      updateItem(i, {
                        tipoPlaca: e.target.value as
                          | "blanca"
                          | "verde"
                          | "rosa",
                      })
                    }
                  >
                    <option value="blanca">Blanca (Estándar)</option>
                    <option value="verde">Verde (Hidrófugo)</option>
                    <option value="rosa">Rosa (Ignífugo)</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Perímetro (m lineales)</label>
                  <input
                    type="number"
                    step="0.1"
                    className={inputCls}
                    value={s.perimetroML || ""}
                    onChange={(e) =>
                      updateItem(i, { perimetroML: Number(e.target.value) })
                    }
                    placeholder="Ej: 14"
                  />
                </div>
                <div>
                  <label className={labelCls}>Distancia al Forjado (cm)</label>
                  <input
                    type="number"
                    className={inputCls}
                    value={s.distanciaForjado || ""}
                    onChange={(e) =>
                      updateItem(i, {
                        distanciaForjado: Number(e.target.value),
                      })
                    }
                    placeholder="10"
                  />
                </div>
              </>
            )}
          </div>
          {s.tipo === "yeso" && (
            <div className="flex flex-wrap gap-3 border-t border-indigo-500/10 pt-3">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={s.necesitaPuenteUnion || false}
                  onChange={(e) =>
                    updateItem(i, { necesitaPuenteUnion: e.target.checked })
                  }
                  className="h-3.5 w-3.5 accent-violet-400"
                />
                <span>
                  Puente de Unión{" "}
                  <span className="text-slate-500">(sobre hormigón)</span>
                </span>
              </label>
            </div>
          )}
          {s.tipo === "pladur" && (
            <div className="mt-1 rounded border border-indigo-500/10 bg-indigo-900/30 p-2 text-[10px] leading-relaxed text-indigo-200/80">
              <strong className="text-indigo-300">💡</strong> Falso techo:
              Angular L (perímetro) + Maestras TC-47 + Horquillas + Varillas M6
              + Placas. Indica el perímetro para calcular el angular perimetral.
            </div>
          )}
        </div>
      ))}
      <button
        onClick={addItem}
        className="flex w-full items-center justify-center gap-1.5 rounded border border-indigo-500/20 py-2 text-xs font-bold text-indigo-400 transition-colors hover:bg-indigo-500/10"
      >
        <Plus size={14} /> Añadir otro techo
      </button>
    </div>
  );
}

// ─── Sección Pintura ───
function EditorPintura({
  est,
  onChange,
}: {
  est: EstanciaObra;
  onChange: (e: EstanciaObra) => void;
}) {
  if (est.pintura.length === 0) return null;
  const updateItem = (index: number, patch: Partial<SeccionPintura>) => {
    const arr = [...est.pintura];
    arr[index] = { ...arr[index], ...patch };
    onChange({ ...est, pintura: arr });
  };
  const removeItem = (index: number) =>
    onChange({ ...est, pintura: est.pintura.filter((_, i) => i !== index) });
  const addItem = () =>
    onChange({ ...est, pintura: [...est.pintura, crearPinturaDefecto()] });

  return (
    <div className="space-y-4">
      {est.pintura.map((s, i) => (
        <div
          key={i}
          className="relative space-y-3 rounded-lg border border-fuchsia-500/20 bg-fuchsia-500/5 p-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-black tracking-widest text-fuchsia-400 uppercase">
              Configuración de Pintura{" "}
              {est.pintura.length > 1 ? `#${i + 1}` : ""}
            </p>
            {est.pintura.length > 1 && (
              <button
                onClick={() => removeItem(i)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>m² Tabiquería / Pared</label>
              <input
                type="number"
                className={inputCls}
                value={s.m2Paredes || ""}
                onChange={(e) =>
                  updateItem(i, { m2Paredes: Number(e.target.value) })
                }
                placeholder="Ej: 40"
              />
            </div>
            <div>
              <label className={labelCls}>m² Techo</label>
              <input
                type="number"
                className={inputCls}
                value={s.m2Techo || ""}
                onChange={(e) =>
                  updateItem(i, { m2Techo: Number(e.target.value) })
                }
                placeholder="Ej: 12"
              />
            </div>
            <div>
              <label className={labelCls}>Nº Manos</label>
              <select
                className={selectCls}
                value={s.manos}
                onChange={(e) =>
                  updateItem(i, { manos: Number(e.target.value) as 1 | 2 | 3 })
                }
              >
                <option value={1}>1 Mano (Repaso)</option>
                <option value={2}>2 Manos (Estándar)</option>
                <option value={3}>3 Manos (Cambio color)</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 border-t border-fuchsia-500/10 pt-3">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-300">
              <input
                type="checkbox"
                checked={s.necesitaImprimacion ?? true}
                onChange={(e) =>
                  updateItem(i, { necesitaImprimacion: e.target.checked })
                }
                className="h-3.5 w-3.5 accent-pink-400"
              />
              <span>
                Imprimación Fijadora{" "}
                <span className="text-slate-500">
                  (obra nueva / Pladur / yeso)
                </span>
              </span>
            </label>
          </div>
          {i === est.pintura.length - 1 && (
            <div className="mt-1 rounded border border-fuchsia-500/10 bg-fuchsia-900/30 p-2 text-[10px] leading-relaxed text-fuchsia-200/80">
              <strong className="text-pink-300">💡</strong> Mínimo 2 manos para
              buen acabado. La imprimación es obligatoria en superficies nuevas
              (Pladur, yeso, obra nueva) para sellar el poro y que la pintura no
              se absorba.
            </div>
          )}
        </div>
      ))}
      <button
        onClick={addItem}
        className="flex w-full items-center justify-center gap-1.5 rounded border border-fuchsia-500/20 py-2 text-xs font-bold text-fuchsia-400 transition-colors hover:bg-fuchsia-500/10"
      >
        <Plus size={14} /> Añadir otra pintura
      </button>
    </div>
  );
}

// ─── Resumen de materiales por estancia ───
function ResumenEstancia({ est }: { est: EstanciaObra }) {
  const resultado = calcularEstancia(est);
  if (resultado.lineas.length === 0) return null;
  const porCategoria: Record<string, LineaMaterial[]> = {};
  resultado.lineas.forEach((l) => {
    if (!porCategoria[l.categoria]) porCategoria[l.categoria] = [];
    porCategoria[l.categoria].push(l);
  });
  return (
    <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-4">
      <p className="mb-3 flex items-center gap-1.5 text-[9px] font-black tracking-widest text-violet-400 uppercase">
        <Zap size={10} /> Materiales de esta estancia
      </p>
      <div className="space-y-2">
        {Object.entries(porCategoria).map(([cat, lineas]) => (
          <div key={cat}>
            <p className="text-[9px] font-bold text-slate-500 uppercase">
              {cat}
            </p>
            {lineas.map((l, i) => (
              <div key={i} className="flex items-center justify-between py-0.5">
                {l.materialId ? (
                  <Link
                    href={`/materiales#${l.materialId}`}
                    className="text-xs text-slate-300 underline decoration-slate-600 underline-offset-2 transition-colors hover:text-violet-300 hover:decoration-violet-400"
                  >
                    {l.nombre}
                  </Link>
                ) : (
                  <span className="text-xs text-slate-300">{l.nombre}</span>
                )}
                <span className="text-xs font-bold text-white">
                  {l.cantidad}{" "}
                  <span className="text-slate-500">{l.unidad}</span>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Panel de Estancia (Accordion) ───
function PanelEstancia({
  est,
  obraId,
  onUpdate,
  onDelete,
}: {
  est: EstanciaObra;
  obraId: string;
  onUpdate: (e: EstanciaObra) => void;
  onDelete: () => void;
}) {
  const isNew =
    !est.nombre &&
    est.suelo.length === 0 &&
    est.paredes.length === 0 &&
    est.alicatado.length === 0 &&
    est.techo.length === 0 &&
    est.pintura.length === 0;
  const [open, setOpen] = useState(isNew);
  const [confirmDel, setConfirmDel] = useState(false);
  const tipoLabel =
    TIPOS_ESTANCIA.find((t) => t.value === est.tipo)?.label || est.tipo;

  const toggleSection = (
    section: "suelo" | "paredes" | "alicatado" | "techo" | "pintura"
  ) => {
    if (est[section].length > 0) {
      onUpdate({ ...est, [section]: [] });
    } else {
      const defaults = {
        suelo: [crearSueloDefecto()],
        paredes: [crearParedesDefecto()],
        alicatado: [crearAlicatadoDefecto()],
        techo: [crearTechoDefecto()],
        pintura: [crearPinturaDefecto()],
      };
      onUpdate({ ...est, [section]: defaults[section] });
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center gap-3 p-4 text-left transition-colors hover:bg-slate-800/50"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-violet-500/15">
          <Layers size={14} className="text-violet-400" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-white">
            {est.nombre || tipoLabel}
          </p>
          <p className="text-[10px] text-slate-500">{tipoLabel}</p>
        </div>
        <div className="flex items-center gap-3">
          {confirmDel ? (
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="rounded bg-red-600 px-2 py-1 text-[10px] font-bold text-white shadow-lg"
              >
                Sí, borrar
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmDel(false);
                }}
                className="rounded bg-slate-700 px-2 py-1 text-[10px] font-bold text-white"
              >
                No
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setConfirmDel(true);
              }}
              className="rounded p-1.5 text-slate-500 transition-colors hover:bg-red-500/20 hover:text-red-400"
            >
              <Trash2 size={14} />
            </button>
          )}
          {open ? (
            <ChevronUp size={16} className="text-slate-500" />
          ) : (
            <ChevronDown size={16} className="text-slate-500" />
          )}
        </div>
      </div>

      {open && (
        <div className="space-y-4 border-t border-slate-800 p-4">
          {/* Identidad */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Tipo</label>
              <select
                className={selectCls}
                value={est.tipo}
                onChange={(e) =>
                  onUpdate({ ...est, tipo: e.target.value as TipoEstancia })
                }
              >
                {TIPOS_ESTANCIA.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => onUpdate(aplicarSugerenciaInteligente(est))}
                className="mt-2 flex w-full items-center justify-center gap-1.5 rounded bg-violet-600/20 py-1.5 text-[10px] font-bold text-violet-300 transition-colors hover:bg-violet-600/40"
              >
                <Zap size={12} className="text-violet-400" /> Auto-Configurar
                Recomendación
              </button>
            </div>
            <div>
              <label className={labelCls}>Nombre</label>
              <input
                className={inputCls}
                value={est.nombre}
                onChange={(e) => onUpdate({ ...est, nombre: e.target.value })}
                placeholder="Ej: Habitación 1"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <Toggle
              on={est.suelo.length > 0}
              onToggle={() => toggleSection("suelo")}
              label="Suelo"
            />
            <Toggle
              on={est.paredes.length > 0}
              onToggle={() => toggleSection("paredes")}
              label="Tabiquería / Pared"
            />
            <Toggle
              on={est.alicatado.length > 0}
              onToggle={() => toggleSection("alicatado")}
              label="Alicatado / Azulejos Pared"
            />
            <Toggle
              on={est.techo.length > 0}
              onToggle={() => toggleSection("techo")}
              label="Techo"
            />
            <Toggle
              on={est.pintura.length > 0}
              onToggle={() => toggleSection("pintura")}
              label="Pintura"
            />
          </div>

          {/* Secciones activas */}
          <EditorSuelo est={est} onChange={onUpdate} />
          <EditorParedes est={est} onChange={onUpdate} />
          <EditorAlicatado est={est} onChange={onUpdate} />
          <EditorTecho est={est} onChange={onUpdate} />
          <EditorPintura est={est} onChange={onUpdate} />

          {/* Campos libres */}
          <div className="space-y-3 border-t border-slate-800 pt-4">
            <div>
              <label className={labelCls}>
                <Wrench size={10} className="mr-1 inline" />
                Herramientas necesarias
              </label>
              <textarea
                className={inputCls + " min-h-[60px]"}
                value={est.herramientas}
                onChange={(e) =>
                  onUpdate({ ...est, herramientas: e.target.value })
                }
                placeholder="Radial, nivel láser, taladro..."
              />
            </div>
            <div>
              <label className={labelCls}>
                <Package size={10} className="mr-1 inline" />
                Materiales extras
              </label>
              <textarea
                className={inputCls + " min-h-[60px]"}
                value={est.materialesExtras}
                onChange={(e) =>
                  onUpdate({ ...est, materialesExtras: e.target.value })
                }
                placeholder="WC, plato de ducha, mampara, niveladores..."
              />
            </div>
            <div>
              <label className={labelCls}>
                <StickyNote size={10} className="mr-1 inline" />
                Notas
              </label>
              <textarea
                className={inputCls + " min-h-[60px]"}
                value={est.notas}
                onChange={(e) => onUpdate({ ...est, notas: e.target.value })}
                placeholder="Anotaciones libres..."
              />
            </div>
          </div>

          {/* Resumen */}
          <ResumenEstancia est={est} />

          <div className="flex items-center justify-end border-t border-slate-800 pt-4">
            <button
              onClick={() => {
                onUpdate(est);
                setOpen(false);
                setTimeout(() => {
                  document
                    .getElementById("btn-add-estancia")
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 100);
              }}
              className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-black tracking-widest text-white uppercase shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all hover:bg-emerald-500 active:scale-95"
            >
              Listo / Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Resumen Global ───
function ResumenGlobal({ obra }: { obra: Obra }) {
  const { prices } = useCustomPrices();
  const resultado = calcularObra(obra);
  if (resultado.totales.length === 0) return null;

  const totalesConCoste = enriquecerConCostes(resultado.totales, prices);
  const granTotal = totalesConCoste.reduce((sum, l) => sum + l.costeTotal, 0);

  const porCategoria: Record<string, LineaConCoste[]> = {};
  totalesConCoste.forEach((l) => {
    if (!porCategoria[l.categoria]) porCategoria[l.categoria] = [];
    porCategoria[l.categoria].push(l);
  });

  return (
    <div className="border-primary/30 bg-primary/5 mt-12 rounded-2xl border p-6 shadow-[0_0_30px_rgba(245,158,11,0.05)]">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-black text-white uppercase italic">
        <Zap className="text-primary" size={20} /> Resumen Total Obra
      </h3>
      <div className="space-y-4">
        {Object.entries(porCategoria).map(([cat, lineas]) => (
          <div key={cat}>
            <p className="text-primary/70 mb-1 flex justify-between text-[10px] font-black tracking-widest uppercase">
              <span>{cat}</span>
              <span>
                {lineas.reduce((sum, l) => sum + l.costeTotal, 0).toFixed(2)}€
              </span>
            </p>
            <div className="space-y-1">
              {lineas.map((l, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2"
                >
                  <div className="flex flex-col">
                    {l.materialId ? (
                      <Link
                        href={`/materiales#${l.materialId}`}
                        className="hover:text-primary hover:decoration-primary text-xs text-slate-300 underline decoration-slate-600 underline-offset-2 transition-colors"
                      >
                        {l.nombre}
                      </Link>
                    ) : (
                      <span className="text-xs text-slate-300">{l.nombre}</span>
                    )}
                    {l.formatoAplicado !== "-" && (
                      <span className="mt-1 block text-[10px] font-bold text-amber-400">
                        Comprarás:{" "}
                        <span className="text-amber-200">
                          {l.formatoAplicado}
                        </span>{" "}
                        <span className="font-normal text-amber-500/80">
                          ({l.precioUnitario.toFixed(2)}€/ud)
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="block text-sm font-black text-white">
                      {l.costeTotal > 0 ? `${l.costeTotal.toFixed(2)}€` : "-"}
                    </span>
                    <span className="mt-0.5 block text-[11px] font-bold text-emerald-400">
                      Req:{" "}
                      <span className="text-emerald-300">{l.cantidad}</span>{" "}
                      {l.unidad}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-primary/20 mt-8 border-t pt-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-primary text-[10px] font-black tracking-widest uppercase">
              Presupuesto Estimado
            </p>
            <p className="mt-1 max-w-[200px] text-xs leading-tight text-slate-400">
              Suma total de materiales aproximada.
            </p>
          </div>
          <p className="text-4xl font-black text-white">
            {granTotal.toFixed(2)}
            <span className="text-primary text-2xl">€</span>
          </p>
        </div>
      </div>

      {/* Desglose por Estancia */}
      <div className="mt-8 border-t border-slate-800 pt-8">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-widest text-slate-300 uppercase">
          <Layers size={16} className="text-slate-500" />
          Desglose por Estancia
        </h3>
        <div className="space-y-4">
          {resultado.porEstancia.map((est, idx) => {
            if (est.lineas.length === 0) return null;
            const original = obra.estancias[idx];

            const m2Suelo = original.suelo.reduce((sum, s) => sum + s.m2, 0);
            const m2Pared = original.paredes.reduce((sum, p) => sum + p.m2, 0);
            const m2CeramicaP = original.alicatado.reduce(
              (sum, a) => sum + a.m2,
              0
            );
            const m2Techo = original.techo.reduce((sum, t) => sum + t.m2, 0);
            const m2Pintura = original.pintura.reduce(
              (sum, p) => sum + p.m2Paredes + p.m2Techo,
              0
            );

            return (
              <details
                key={idx}
                className="group rounded-xl border border-slate-800 bg-slate-900/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between p-4 outline-none [&::-webkit-details-marker]:hidden">
                  <p className="text-xs font-black tracking-widest text-white uppercase">
                    {est.estanciaNombre}
                  </p>
                  <ChevronDown
                    size={14}
                    className="text-slate-500 transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="space-y-4 p-4 pt-0">
                  <div className="space-y-1.5 border-b border-slate-800/50 pb-4">
                    {est.lineas.map((l, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between border-b border-slate-800/50 pb-1.5 last:border-0 last:pb-0"
                      >
                        {l.materialId ? (
                          <Link
                            href={`/materiales#${l.materialId}`}
                            className="hover:text-primary hover:decoration-primary text-[11px] text-slate-400 underline decoration-slate-700 underline-offset-2 transition-colors"
                          >
                            {l.nombre}
                          </Link>
                        ) : (
                          <span className="text-[11px] text-slate-400">
                            {l.nombre}
                          </span>
                        )}
                        <span className="text-[11px] font-bold text-slate-300">
                          {l.cantidad}{" "}
                          <span className="font-normal text-slate-500">
                            {l.unidad}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Caja de Detalles */}
                  <div className="rounded-lg border border-slate-800/80 bg-black/40 p-4">
                    <p className="text-primary/70 mb-2 text-[10px] font-black tracking-widest uppercase">
                      Detalles y Mediciones Técnicas
                    </p>
                    <ul className="list-disc space-y-1.5 pl-4 text-xs text-slate-400 marker:text-slate-700">
                      {m2Suelo > 0 && (
                        <li>
                          <b>Suelo:</b> {m2Suelo} m² medidos.
                        </li>
                      )}
                      {m2Pared > 0 && (
                        <li>
                          <b>Tabiquería / Pared Base:</b> {m2Pared} m² medidos.
                        </li>
                      )}
                      {m2CeramicaP > 0 && (
                        <li>
                          <b>Cerámica en Pared:</b> {m2CeramicaP} m² medidos.
                        </li>
                      )}
                      {m2Techo > 0 && (
                        <li>
                          <b>Techo:</b> {m2Techo} m² medidos.
                        </li>
                      )}
                      {m2Pintura > 0 && (
                        <li>
                          <b>Pintura Total:</b> {m2Pintura} m² a pintar.
                        </li>
                      )}

                      <li className="mt-2 text-yellow-500/80">
                        <b className="text-yellow-500">
                          Herramientas / Extras:
                        </b>{" "}
                        {original.herramientas || "N/A"}
                      </li>

                      <li className="text-blue-400/80">
                        <b className="text-blue-400">Notas Adicionales:</b>{" "}
                        {original.notas || "N/A"}
                      </li>

                      <li className="text-emerald-400/80">
                        <b className="text-emerald-400">
                          Material Extra Suministrado:
                        </b>{" "}
                        {original.materialesExtras || "N/A"}
                      </li>
                    </ul>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// PÁGINA PRINCIPAL DEL DETALLE DE OBRA
// ═══════════════════════════════════════════════════
export default function ObraDetallePage() {
  const params = useParams();
  const obraId = params.obraId as string;

  const [obra, setObra] = useState<Obra | null>(null);

  const reloadObra = useCallback(() => {
    // Usamos queueMicrotask para evitar el warning de React 19:
    // "Calling setState synchronously within an effect..."
    queueMicrotask(() => {
      setObra(getObra(obraId));
    });
  }, [obraId]);

  useEffect(() => {
    reloadObra();
  }, [reloadObra]);

  if (!obra)
    return (
      <div className="flex items-center justify-center py-32 text-slate-500">
        Cargando obra...
      </div>
    );

  const handleAddEstancia = () => {
    addEstancia(obraId);
    reloadObra();
  };

  const handleUpdateEstancia = (est: EstanciaObra) => {
    setObra((prev) => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        estancias: prev.estancias.map((e) => (e.id === est.id ? est : e)),
        updatedAt: new Date().toISOString(),
      };
      saveObra(updated);
      return updated;
    });
  };

  const handleDeleteEstancia = (estId: string) => {
    deleteEstancia(obraId, estId);
    setObra(getObra(obraId));
  };

  const handleUpdateObra = (patch: Partial<Obra>) => {
    setObra((prev) => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        ...patch,
        updatedAt: new Date().toISOString(),
      };
      saveObra(updated);
      return updated;
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 pb-32">
      {/* Nav */}
      <Link
        href={`/gestion/${obraId}`}
        className="text-text-muted mb-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase hover:text-amber-500"
      >
        <ArrowLeft size={12} /> Dashboard de la Obra
      </Link>

      {/* Cabecera editable */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between">
          <input
            className="flex-1 bg-transparent text-2xl font-black tracking-tight text-white uppercase italic outline-none placeholder:text-slate-700"
            value={obra.nombre}
            onChange={(e) => handleUpdateObra({ nombre: e.target.value })}
            placeholder="Nombre de la obra"
          />
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[9px] font-bold text-emerald-400">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            GUARDADO EN LOCAL
          </div>
        </div>
        <input
          className="w-full bg-transparent text-sm text-slate-400 outline-none placeholder:text-slate-700"
          value={obra.direccion}
          onChange={(e) => handleUpdateObra({ direccion: e.target.value })}
          placeholder="Dirección (opcional)"
        />
      </div>

      {/* Estancias */}
      <div className="mb-6 space-y-4">
        {obra.estancias.map((est) => (
          <PanelEstancia
            key={est.id}
            est={est}
            obraId={obraId}
            onUpdate={handleUpdateEstancia}
            onDelete={() => handleDeleteEstancia(est.id)}
          />
        ))}
      </div>

      {/* Añadir estancia */}
      <button
        id="btn-add-estancia"
        onClick={handleAddEstancia}
        className="mb-8 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-violet-500/50 bg-violet-500/5 py-5 text-sm font-black tracking-widest text-violet-400 uppercase shadow-[0_0_15px_rgba(139,92,246,0.1)] transition-all hover:bg-violet-500/10 hover:text-violet-300 active:scale-95"
      >
        <Plus size={18} strokeWidth={3} /> Añadir Nueva Estancia
      </button>

      {/* Resumen Global */}
      {obra.estancias.length > 0 && <ResumenGlobal obra={obra} />}
    </div>
  );
}
