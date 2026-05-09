"use client";

import { useState } from "react";
import {
  Calculator,
  Box,
  Grid3X3,
  Layers,
  Trash2,
  Paintbrush,
  Database,
  Info,
  Zap,
  Lightbulb,
  Brush,
} from "lucide-react";

export default function CalculosPage() {
  const [activeCalc, setActiveCalc] = useState<
    | "mortero"
    | "yeso"
    | "mermas"
    | "pladur"
    | "escombros"
    | "pintura"
    | "hormigon"
    | "ladrillos"
    | "juntas"
  >("mortero");

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 pb-32">
      <section className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <Calculator className="text-violet-500" size={24} />
          <span className="text-[10px] font-black tracking-[0.2em] text-violet-500 uppercase">
            Herramientas Analíticas
          </span>
        </div>
        <h2 className="mb-2 text-3xl font-black tracking-tight text-white uppercase italic">
          Cálculos de <span className="text-violet-500">Obra</span>
        </h2>
        <p className="text-text-muted text-sm italic">
          Herramientas profesionales para pedir el material exacto, evitar
          desperdicios y ahorrar viajes al almacén.
        </p>
      </section>

      <div className="scrollbar-hide mb-6 flex gap-2 overflow-x-auto pb-4">
        <button
          onClick={() => setActiveCalc("mortero")}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-widest whitespace-nowrap uppercase transition-all ${activeCalc === "mortero" ? "bg-primary border-primary text-slate-900 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-600"}`}
        >
          <Box size={14} /> Mortero
        </button>
        <button
          onClick={() => setActiveCalc("yeso")}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-widest whitespace-nowrap uppercase transition-all ${activeCalc === "yeso" ? "bg-primary border-primary text-slate-900 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-600"}`}
        >
          <Brush size={14} /> Yeso
        </button>
        <button
          onClick={() => setActiveCalc("mermas")}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-widest whitespace-nowrap uppercase transition-all ${activeCalc === "mermas" ? "bg-primary border-primary text-slate-900 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-600"}`}
        >
          <Grid3X3 size={14} /> Cerámica
        </button>
        <button
          onClick={() => setActiveCalc("pladur")}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-widest whitespace-nowrap uppercase transition-all ${activeCalc === "pladur" ? "bg-primary border-primary text-slate-900 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-600"}`}
        >
          <Layers size={14} /> Pladur
        </button>
        <button
          onClick={() => setActiveCalc("escombros")}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-widest whitespace-nowrap uppercase transition-all ${activeCalc === "escombros" ? "bg-primary border-primary text-slate-900 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-600"}`}
        >
          <Trash2 size={14} /> Escombros
        </button>
        <button
          onClick={() => setActiveCalc("pintura")}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-widest whitespace-nowrap uppercase transition-all ${activeCalc === "pintura" ? "bg-primary border-primary text-slate-900 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-600"}`}
        >
          <Paintbrush size={14} /> Pintura
        </button>
        <button
          onClick={() => setActiveCalc("hormigon")}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-widest whitespace-nowrap uppercase transition-all ${activeCalc === "hormigon" ? "bg-primary border-primary text-slate-900 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-600"}`}
        >
          <Database size={14} /> Hormigón
        </button>
        <button
          onClick={() => setActiveCalc("ladrillos")}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-widest whitespace-nowrap uppercase transition-all ${activeCalc === "ladrillos" ? "bg-primary border-primary text-slate-900 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-600"}`}
        >
          <Layers size={14} /> Ladrillos
        </button>
        <button
          onClick={() => setActiveCalc("juntas")}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-widest whitespace-nowrap uppercase transition-all ${activeCalc === "juntas" ? "bg-primary border-primary text-slate-900 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-600"}`}
        >
          <Grid3X3 size={14} /> Juntas
        </button>
      </div>

      <div className="min-h-[500px] rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl backdrop-blur-sm">
        {activeCalc === "mortero" && <CalculadoraMortero />}
        {activeCalc === "yeso" && <CalculadoraYeso />}
        {activeCalc === "mermas" && <CalculadoraMermas />}
        {activeCalc === "pladur" && <CalculadoraPladur />}
        {activeCalc === "escombros" && <CalculadoraEscombros />}
        {activeCalc === "pintura" && <CalculadoraPintura />}
        {activeCalc === "hormigon" && <CalculadoraHormigon />}
        {activeCalc === "ladrillos" && <CalculadoraLadrillos />}
        {activeCalc === "juntas" && <CalculadoraBorada />}
      </div>
    </div>
  );
}

function CalculadoraMortero() {
  const [tipoProducto, setTipoProducto] = useState("mortero"); // 'mortero' o 'cola'
  const [m2, setM2] = useState("");
  const [espesor, setEspesor] = useState("");
  const [encolado, setEncolado] = useState("simple"); // 'simple' o 'doble'

  // Cálculo Morteros (Autonivelante, M-7.5, Cal)
  const totalLitros = Number(m2) * (Number(espesor) / 100) * 1000;
  const sacosMortero = Math.ceil(totalLitros / 15);

  // Cálculo Colas (C1, C2, Flexible)
  const kgPorM2 = encolado === "simple" ? 4 : 7;
  const totalKg = Number(m2) * kgPorM2;
  const sacosCola = Math.ceil(totalKg / 25);

  const sacos =
    tipoProducto === "mortero"
      ? m2 && espesor
        ? sacosMortero
        : 0
      : m2
        ? sacosCola
        : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="mb-3 flex items-center gap-2 text-2xl font-black text-white uppercase italic">
          <Box className="text-primary" /> Morteros y Colas
        </h3>
        <p className="text-text-muted text-xs leading-relaxed">
          Las colas se calculan por cobertura (kg/m²), mientras que los morteros
          base se calculan por volumen (grosor).
        </p>
      </div>

      <div className="mb-2 flex gap-4">
        <button
          onClick={() => setTipoProducto("mortero")}
          className={`flex-1 rounded-lg py-3 text-xs font-black tracking-widest uppercase transition-all ${tipoProducto === "mortero" ? "bg-primary text-slate-900 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" : "border border-slate-700 bg-slate-900 text-slate-400"}`}
        >
          Morteros de Espesor
        </button>
        <button
          onClick={() => setTipoProducto("cola")}
          className={`flex-1 rounded-lg py-3 text-xs font-black tracking-widest uppercase transition-all ${tipoProducto === "cola" ? "bg-primary text-slate-900 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" : "border border-slate-700 bg-slate-900 text-slate-400"}`}
        >
          Cementos Cola
        </button>
      </div>

      {tipoProducto === "mortero" ? (
        <>
          <div className="space-y-2 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
            <p className="flex items-center gap-1.5 text-[9px] font-black tracking-widest text-blue-400 uppercase">
              <Info size={12} /> Productos aplicables:
            </p>
            <p className="mb-2 text-[11px] leading-relaxed text-slate-300">
              Mortero{" "}
              <span className="font-bold text-white">Autonivelante</span>,
              Mortero Seco <span className="font-bold text-white">(M-7.5)</span>{" "}
              y Mortero de <span className="font-bold text-white">Cal</span>. Un
              saco estándar rinde aprox. 15 litros de masa.
            </p>
            <div className="mt-2 border-t border-blue-500/10 pt-2">
              <p className="text-[10px] leading-relaxed text-slate-400">
                <span className="font-bold text-white">Tip Autonivelante:</span>{" "}
                El más común es el{" "}
                <span className="font-bold text-blue-400">Nivelante 10</span>, ideal para alisar irregularidades finas (hasta 1cm o 10mm). Si tienes un desnivel grave, debes usar{" "}
                <span className="font-bold text-amber-500">Nivelante 80</span> (capa gruesa).
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
                Superficie (m²)
              </label>
              <input
                type="number"
                value={m2}
                onChange={(e) => setM2(e.target.value)}
                className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
                placeholder="Ej: 20"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
                Espesor medio (cm)
              </label>
              <input
                type="number"
                value={espesor}
                onChange={(e) => setEspesor(e.target.value)}
                className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
                placeholder="Ej: 0.5 (Para 5mm)"
              />
            </div>
          </div>

          {espesor && (
            <div className="rounded-lg border border-slate-700 bg-slate-950 p-3 shadow-inner">
              <p className="mb-1 text-[9px] font-black tracking-widest text-slate-400 uppercase">
                Sugerencia (Autonivelante Molins):
              </p>
              {Number(espesor) <= 1 ? (
                <p className="text-[11px] text-slate-300">
                  Para {Number(espesor) * 10}mm de grosor, usa{" "}
                  <span className="font-bold text-primary">Nivelante 10</span>. Es perfecto para dejar el suelo a espejo antes de pavimentar.
                </p>
              ) : (
                <p className="text-[11px] text-slate-300">
                  Para {Number(espesor) * 10}mm de grosor, necesitas obligatoriamente{" "}
                  <span className="font-bold text-amber-500">Nivelante 80</span>. El autonivelante de capa fina se fisuraría con este grosor.
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="space-y-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="flex items-center gap-1.5 text-[9px] font-black tracking-widest text-amber-500 uppercase">
              <Info size={12} /> Productos aplicables:
            </p>
            <p className="text-[11px] leading-relaxed text-slate-300">
              Cemento Cola Interior{" "}
              <span className="font-bold text-white">(C1)</span>,
              Exterior/Fuerte <span className="font-bold text-white">(C2)</span>{" "}
              y Ultra-Flexible{" "}
              <span className="font-bold text-white">(C2TE S1)</span>. <br />
              <br />• <span className="font-bold text-white">Simple:</span> ~4
              kg/m² (Piezas pequeñas)
              <br />•{" "}
              <span className="font-bold text-white">Doble Encolado:</span> ~7
              kg/m² (Obligatorio en exteriores o baldosas grandes).
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
                Superficie a alicatar (m²)
              </label>
              <input
                type="number"
                value={m2}
                onChange={(e) => setM2(e.target.value)}
                className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
                placeholder="Ej: 15"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
                Técnica de aplicación
              </label>
              <select
                value={encolado}
                onChange={(e) => setEncolado(e.target.value)}
                className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
              >
                <option value="simple">
                  Encolado Simple (Cola solo al suelo/pared)
                </option>
                <option value="doble">
                  Doble Encolado (Cola a la pared + a la baldosa)
                </option>
              </select>
            </div>
          </div>
        </>
      )}

      <div className="bg-primary/10 border-primary/30 mt-2 flex items-center justify-between rounded-xl border p-5">
        <div>
          <p className="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
            Sacos de 25kg recomendados:
          </p>
          <p className="text-primary text-4xl font-black">
            {sacos} <span className="text-lg">sacos</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            {tipoProducto === "mortero" ? "Volumen:" : "Total Cola:"}
          </p>
          <p className="text-sm font-bold text-white">
            {tipoProducto === "mortero"
              ? `${m2 && espesor ? totalLitros.toFixed(0) : 0} L`
              : `${m2 ? totalKg : 0} Kg`}
          </p>
        </div>
      </div>
    </div>
  );
}

function CalculadoraMermas() {
  const [m2, setM2] = useState("");
  const [merma, setMerma] = useState("10");
  const [tipo, setTipo] = useState("gres");
  const [medidaGres, setMedidaGres] = useState("60x60");
  const [medidaPasta, setMedidaPasta] = useState("30x60");

  const opcionesGres = [
    { label: "30 x 60 cm", value: "30x60", m2PorPieza: 0.18 },
    { label: "60 x 60 cm (Estándar)", value: "60x60", m2PorPieza: 0.36 },
    { label: "90 x 90 cm", value: "90x90", m2PorPieza: 0.81 },
    { label: "120 x 60 cm (Gran Formato)", value: "120x60", m2PorPieza: 0.72 },
  ];

  const opcionesPasta = [
    { label: "20 x 20 cm (Clásico)", value: "20x20", m2PorPieza: 0.04 },
    { label: "30 x 60 cm (Estándar moderno)", value: "30x60", m2PorPieza: 0.18 },
    { label: "33 x 100 cm", value: "33x100", m2PorPieza: 0.33 },
  ];

  const m2PorPieza =
    tipo === "gres"
      ? opcionesGres.find((o) => o.value === medidaGres)?.m2PorPieza || 0.36
      : opcionesPasta.find((o) => o.value === medidaPasta)?.m2PorPieza || 0.18;

  const totalM2 = Number(m2) * (1 + Number(merma) / 100);
  const totalPiezas = Math.ceil(totalM2 / m2PorPieza);

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="mb-3 flex items-center gap-2 text-2xl font-black text-white uppercase italic">
          <Grid3X3 className="text-primary" /> Cálculo de Cerámica
        </h3>
        <p className="text-text-muted text-xs leading-relaxed">
          Nunca pidas los metros exactos de la habitación. Necesitas margen para
          los recortes contra la pared, roturas y para guardar
          repuestos. Ahora puedes calcular las piezas exactas.
        </p>
      </div>

      <div className="space-y-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
        <p className="flex items-center gap-1.5 text-[9px] font-black tracking-widest text-amber-500 uppercase">
          <Lightbulb size={12} /> Guía de Desperdicio (Merma)
        </p>
        <ul className="ml-4 list-disc space-y-1 text-[11px] leading-relaxed text-slate-300 marker:text-amber-500">
          <li>
            <span className="font-bold text-white">5-10%:</span> Colocación
            recta estándar en habitaciones cuadradas.
          </li>
          <li>
            <span className="font-bold text-white">15%:</span> Colocación
            trabada (tipo ladrillo) o baldosas muy grandes.
          </li>
          <li>
            <span className="font-bold text-white">20%:</span> Colocación en
            diagonal o habitaciones muy irregulares.
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
            Tipo de Material
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setTipo("gres")}
              className={`flex-1 rounded-lg py-2 text-[10px] font-black tracking-widest uppercase transition-all ${tipo === "gres" ? "bg-primary text-slate-900 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" : "border border-slate-700 bg-slate-900 text-slate-400"}`}
            >
              Gres Porcelánico
            </button>
            <button
              onClick={() => setTipo("pasta")}
              className={`flex-1 rounded-lg py-2 text-[10px] font-black tracking-widest uppercase transition-all ${tipo === "pasta" ? "bg-primary text-slate-900 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" : "border border-slate-700 bg-slate-900 text-slate-400"}`}
            >
              Pasta Blanca / Roja
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
            Medida de la baldosa
          </label>
          <select
            value={tipo === "gres" ? medidaGres : medidaPasta}
            onChange={(e) =>
              tipo === "gres"
                ? setMedidaGres(e.target.value)
                : setMedidaPasta(e.target.value)
            }
            className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
          >
            {tipo === "gres"
              ? opcionesGres.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : opcionesPasta.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
              Superficie (m²)
            </label>
            <input
              type="number"
              value={m2}
              onChange={(e) => setM2(e.target.value)}
              className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
              placeholder="Ej: 15.5"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
              % Merma
            </label>
            <select
              value={merma}
              onChange={(e) => setMerma(e.target.value)}
              className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
            >
              <option value="5">5% - Muy poco corte</option>
              <option value="10">10% - Corte estándar</option>
              <option value="15">15% - Trabado / Grandes</option>
              <option value="20">20% - Diagonal</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-primary/10 border-primary/30 mt-2 flex items-center justify-between rounded-xl border p-5">
        <div>
          <p className="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
            Piezas necesarias:
          </p>
          <p className="text-primary text-4xl font-black">
            {m2 ? totalPiezas : 0} <span className="text-lg">baldosas</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            M² a pedir (con merma):
          </p>
          <p className="text-sm font-bold text-white">
            {m2 ? totalM2.toFixed(2) : 0} m²
          </p>
        </div>
      </div>
    </div>
  );
}

function CalculadoraPladur() {
  const [m2, setM2] = useState("");

  const placas = Math.ceil(Number(m2) / 2.88);
  const perfiles = Math.ceil(Number(m2) * 1.5);

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="mb-3 flex items-center gap-2 text-2xl font-black text-white uppercase italic">
          <Layers className="text-primary" /> Estructuras de Pladur
        </h3>
        <p className="text-text-muted text-xs leading-relaxed">
          Calcula el material metálico y las placas necesarias para construir
          una pared de cartón-yeso.
        </p>
      </div>

      <div className="space-y-3 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
        <p className="flex items-center gap-1.5 text-[9px] font-black tracking-widest text-blue-400 uppercase">
          <Info size={12} /> Diccionario Rápido
        </p>
        <ul className="ml-4 list-disc space-y-1 text-[11px] leading-relaxed text-slate-300 marker:text-blue-500">
          <li>
            <span className="font-bold text-white">Tabique:</span> Una pared
            nueva e independiente que separa dos habitaciones.
          </li>
          <li>
            <span className="font-bold text-white">Trasdosado:</span> Forrar o
            &quot;tapar&quot; una pared vieja existente para dejarla lisa o para
            meter aislamiento térmico detrás.
          </li>
        </ul>
        <div className="mt-2 border-t border-blue-500/10 pt-2">
          <p className="text-[10px] leading-relaxed text-slate-400">
            * El cálculo asume placas estándar (2.40 x 1.20m) y que los metales
            verticales van colocados cada 60cm.
          </p>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
          Superficie total del muro (m²)
        </label>
        <input
          type="number"
          value={m2}
          onChange={(e) => setM2(e.target.value)}
          className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
          placeholder="Ej: 10"
        />
      </div>

      <div className="mt-2 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-700 bg-slate-950 p-5 text-center shadow-inner">
          <p className="text-primary mb-1 text-[10px] font-black tracking-widest uppercase">
            Nº de Placas
          </p>
          <p className="text-3xl font-black text-white">{m2 ? placas : 0}</p>
          <p className="mt-1 text-[9px] text-slate-500 uppercase">
            De 2.4 x 1.2m
          </p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-950 p-5 text-center shadow-inner">
          <p className="text-primary mb-1 text-[10px] font-black tracking-widest uppercase">
            Perfilería
          </p>
          <p className="text-3xl font-black text-white">
            {m2 ? perfiles : 0} <span className="text-sm">ml</span>
          </p>
          <p className="mt-1 text-[9px] text-slate-500 uppercase">
            Metros Lineales
          </p>
        </div>
      </div>
    </div>
  );
}

function CalculadoraEscombros() {
  const [largo, setLargo] = useState("");
  const [alto, setAlto] = useState("");
  const [tipo, setTipo] = useState("10");

  const volumen = Number(largo) * Number(alto) * (Number(tipo) / 100) * 1.3;
  const sacos = Math.ceil(volumen / 0.02);
  const bigBags = Math.ceil(volumen / 0.8);

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="mb-3 flex items-center gap-2 text-2xl font-black text-white uppercase italic">
          <Trash2 className="text-primary" /> Volumen de Escombros
        </h3>
        <p className="text-text-muted text-xs leading-relaxed">
          Es vital para saber cómo gestionar el residuo: si puedes bajarlo a
          mano en sacos de runa o si necesitas contratar Big Bags o contenedores
          en la calle.
        </p>
      </div>

      <div className="space-y-2 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
        <p className="flex items-center gap-1.5 text-[9px] font-black tracking-widest text-red-400 uppercase">
          <Zap size={12} /> El Efecto Esponjamiento
        </p>
        <p className="text-[11px] leading-relaxed text-slate-300">
          Al derribar un muro, los trozos nunca encajan perfectamente. El
          escombro suelto ocupa un{" "}
          <span className="font-bold text-red-400">30% más de volumen</span> que
          el muro original. Este cálculo lo tiene en cuenta automáticamente.
        </p>
      </div>

      <div className="mb-2 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
            Largo de pared (m)
          </label>
          <input
            type="number"
            value={largo}
            onChange={(e) => setLargo(e.target.value)}
            className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
            placeholder="Ej: 5"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
            Alto de pared (m)
          </label>
          <input
            type="number"
            value={alto}
            onChange={(e) => setAlto(e.target.value)}
            className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
            placeholder="Ej: 2.5"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
          Grosor original del tabique
        </label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
        >
          <option value="7">Tabique fino (7cm) - Separación simple</option>
          <option value="10">Tabique normal (10cm) - Más habitual</option>
          <option value="15">Muro medio (15cm) - Cierre exterior</option>
          <option value="25">Muro carga (25cm) - Fachadas antiguas</option>
        </select>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-4">
        <div className="relative overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-5 text-center shadow-inner">
          <div className="absolute top-0 left-0 h-1 w-full bg-red-500"></div>
          <p className="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
            Big Bags (Sacas 1m³)
          </p>
          <p className="text-3xl font-black text-white">
            {largo && alto ? bigBags : 0}
          </p>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-5 text-center shadow-inner">
          <div className="bg-primary absolute top-0 left-0 h-1 w-full"></div>
          <p className="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
            Sacos Manuales (20L)
          </p>
          <p className="text-3xl font-black text-white">
            {largo && alto ? sacos : 0}
          </p>
        </div>
      </div>
    </div>
  );
}

function CalculadoraPintura() {
  const [m2, setM2] = useState("");
  const [manos, setManos] = useState("2");

  const totalLitros = (Number(m2) * Number(manos)) / 10;
  const botes15L = Math.ceil(totalLitros / 15);

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="mb-3 flex items-center gap-2 text-2xl font-black text-white uppercase italic">
          <Paintbrush className="text-primary" /> Rendimiento de Pintura
        </h3>
        <p className="text-text-muted text-xs leading-relaxed">
          Estimación para pinturas plásticas de interior estándar.
        </p>
      </div>

      <div className="space-y-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
        <p className="flex items-center gap-1.5 text-[9px] font-black tracking-widest text-emerald-400 uppercase">
          <Lightbulb size={12} /> Consejo Profesional
        </p>
        <p className="text-[11px] leading-relaxed text-slate-300">
          El rendimiento medio es de{" "}
          <span className="font-bold text-white">
            10m² por cada Litro de pintura (por capa)
          </span>
          . Es siempre preferible dar dos manos finas en lugar de una gruesa
          para evitar que la pintura chorree y asegurar un color sólido.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
            Superficie total a pintar (m²)
          </label>
          <input
            type="number"
            value={m2}
            onChange={(e) => setM2(e.target.value)}
            className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
            placeholder="Suma de las áreas de todas las paredes y techos"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
            Pasadas (Nº de Manos)
          </label>
          <div className="flex gap-4">
            {["1", "2", "3"].map((n) => (
              <button
                key={n}
                onClick={() => setManos(n)}
                className={`flex-1 rounded-lg border p-3 text-sm font-bold tracking-wider uppercase transition-all ${manos === n ? "bg-primary border-primary text-slate-900 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" : "border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-500"}`}
              >
                {n} {Number(n) === 1 ? "mano" : "manos"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-primary/10 border-primary/30 mt-2 flex items-center justify-between rounded-xl border p-5">
        <div>
          <p className="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
            Litros necesarios:
          </p>
          <p className="text-primary text-4xl font-black">
            {m2 ? totalLitros.toFixed(1) : 0} <span className="text-lg">L</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Botes grandes:
          </p>
          <p className="text-sm font-bold text-white">
            {m2 ? botes15L : 0} cubos de 15L
          </p>
        </div>
      </div>
    </div>
  );
}

function CalculadoraHormigon() {
  const [ancho, setAncho] = useState("");
  const [largo, setLargo] = useState("");
  const [espesor, setEspesor] = useState("");

  const m3 = Number(ancho) * Number(largo) * (Number(espesor) / 100);
  const sacos = Math.ceil(m3 / 0.012);

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="mb-3 flex items-center gap-2 text-2xl font-black text-white uppercase italic">
          <Database className="text-primary" /> Cubicación de Hormigón
        </h3>
        <p className="text-text-muted text-xs leading-relaxed">
          Para rellenar cimientos, hacer soleras gruesas o bancadas pesadas.
        </p>
      </div>

      <div className="space-y-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
        <p className="flex items-center gap-1.5 text-[9px] font-black tracking-widest text-amber-500 uppercase">
          <Zap size={12} /> Ojo a las cantidades
        </p>
        <p className="text-[11px] leading-relaxed text-slate-300">
          Un saco estándar de hormigón seco preparado (25kg) rinde muy poco
          volumen real: unos{" "}
          <span className="font-bold text-white">12 litros (0.012 m³)</span>. Si
          el cálculo supera los 1.5 m³, es más rentable económicamente pedir un
          camión hormigonera de planta.
        </p>
      </div>

      <div className="mb-2 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
            Ancho de la losa (m)
          </label>
          <input
            type="number"
            value={ancho}
            onChange={(e) => setAncho(e.target.value)}
            className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
            placeholder="Ej: 2"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
            Largo de la losa (m)
          </label>
          <input
            type="number"
            value={largo}
            onChange={(e) => setLargo(e.target.value)}
            className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
            placeholder="Ej: 4"
          />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
          Espesor / Profundidad (cm)
        </label>
        <input
          type="number"
          value={espesor}
          onChange={(e) => setEspesor(e.target.value)}
          className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
          placeholder="Ej: 15 (Profundidad de la zanja)"
        />
      </div>

      <div className="mt-2 grid grid-cols-2 gap-4">
        <div className="relative overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-5 text-center shadow-inner">
          <div className="absolute top-0 left-0 h-1 w-full bg-amber-500"></div>
          <p className="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
            Volumen Cúbico
          </p>
          <p className="text-3xl font-black text-white">
            {ancho && largo && espesor ? m3.toFixed(2) : 0}{" "}
            <span className="text-sm">m³</span>
          </p>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-5 text-center shadow-inner">
          <div className="bg-primary absolute top-0 left-0 h-1 w-full"></div>
          <p className="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
            Sacos de 25kg
          </p>
          <p className="text-3xl font-black text-white">
            {ancho && largo && espesor ? sacos : 0}
          </p>
        </div>
      </div>
    </div>
  );
}

function CalculadoraYeso() {
  const [m2, setM2] = useState("");
  const [espesor, setEspesor] = useState("");

  // Rendimiento medio del yeso: 10 kg / m2 por cada centímetro de espesor.
  const totalKg = Number(m2) * (Number(espesor) || 1.5) * 10;
  const sacos = Math.ceil(totalKg / 20); // Sacos de 20kg (estándar europeo manual)

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="mb-3 flex items-center gap-2 text-2xl font-black text-white uppercase italic">
          <Brush className="text-primary" /> Yesos y Enlucidos
        </h3>
        <p className="text-text-muted text-xs leading-relaxed">
          Para lucir paredes de ladrillo en bruto en interiores secos. Nunca
          apliques yeso en exteriores ni en paredes de duchas.
        </p>
      </div>

      <div className="space-y-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
        <p className="flex items-center gap-1.5 text-[9px] font-black tracking-widest text-emerald-400 uppercase">
          <Zap size={12} /> Cálculo y Fraguado
        </p>
        <p className="text-[11px] leading-relaxed text-slate-300">
          Se calcula un consumo de{" "}
          <span className="font-bold text-white">
            10 kg de yeso por m² y centímetro de grosor
          </span>
          . <br />
          <br />
          <span className="font-bold text-emerald-400">Ojo:</span> El yeso
          manual fragua (se endurece) muy rápido. Si no tienes mucha práctica,
          prepara poca masa o desperdiciarás mucho material al endurecerse en el
          cubo.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
            Superficie a lucir (m²)
          </label>
          <input
            type="number"
            value={m2}
            onChange={(e) => setM2(e.target.value)}
            className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
            placeholder="Ej: 30"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
            Espesor estimado (cm)
          </label>
          <input
            type="number"
            value={espesor}
            onChange={(e) => setEspesor(e.target.value)}
            className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
            placeholder="Ej: 1.5 (Grosor estándar)"
          />
        </div>
      </div>

      <div className="bg-primary/10 border-primary/30 mt-2 flex items-center justify-between rounded-xl border p-5">
        <div>
          <p className="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
            Sacos de 20kg recomendados:
          </p>
          <p className="text-primary text-4xl font-black">
            {m2 ? sacos : 0} <span className="text-lg">sacos</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Total Material:
          </p>
          <p className="text-sm font-bold text-white">
            {m2 ? totalKg.toFixed(0) : 0} Kg
          </p>
        </div>
      </div>
    </div>
  );
}

function CalculadoraLadrillos() {
  const [m2, setM2] = useState("");
  const [tipoPieza, setTipoPieza] = useState("hueco-doble");
  const [conMerma, setConMerma] = useState(true);

  const piezasData: Record<
    string,
    { nombre: string; udsM2: number; udsPalet: number; mortero: string }
  > = {
    "hueco-sencillo": {
      nombre: "Ladrillo Hueco Sencillo (24x11,5x4)",
      udsM2: 33,
      udsPalet: 480,
      mortero: "M-5",
    },
    "hueco-doble": {
      nombre: "Ladrillo Hueco Doble / Totxana (24x11,5x7)",
      udsM2: 33,
      udsPalet: 320,
      mortero: "M-5",
    },
    perforado: {
      nombre: "Ladrillo Perforado / Gerol (24x11,5x7)",
      udsM2: 33,
      udsPalet: 320,
      mortero: "M-7,5",
    },
    macizo: {
      nombre: "Ladrillo Macizo (24x11,5x5)",
      udsM2: 33,
      udsPalet: 400,
      mortero: "M-7,5",
    },
    "bloque-10": {
      nombre: "Bloque de Hormigón (40x20x10)",
      udsM2: 12.5,
      udsPalet: 100,
      mortero: "M-7,5",
    },
    "bloque-20": {
      nombre: "Bloque de Hormigón (40x20x20)",
      udsM2: 12.5,
      udsPalet: 60,
      mortero: "M-7,5",
    },
  };

  const pieza = piezasData[tipoPieza];
  const mermaFactor = conMerma ? 1.1 : 1;
  const totalUnidades = Math.ceil(Number(m2) * pieza.udsM2 * mermaFactor);
  const palets = Math.ceil(totalUnidades / pieza.udsPalet);

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="mb-3 flex items-center gap-2 text-2xl font-black text-white uppercase italic">
          <Layers className="text-primary" /> Ladrillos y Bloques
        </h3>
        <p className="text-text-muted text-xs leading-relaxed">
          Calcula cuántas piezas necesitas para levantar una pared. Incluye
          estimación de palets completos para hacer el pedido al almacén.
        </p>
      </div>

      <div className="space-y-2 rounded-lg border border-orange-500/20 bg-orange-500/5 p-4">
        <p className="flex items-center gap-1.5 text-[9px] font-black tracking-widest text-orange-400 uppercase">
          <Info size={12} /> Cómo funciona:
        </p>
        <p className="text-[11px] leading-relaxed text-slate-300">
          Selecciona el tipo de pieza, indica los metros cuadrados de pared y
          obtendrás las{" "}
          <span className="font-bold text-white">unidades exactas</span> y los{" "}
          <span className="font-bold text-white">palets</span> que necesitas
          pedir. La merma del 10% cubre las piezas que se rompen al cortar.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
            Tipo de Pieza
          </label>
          <select
            value={tipoPieza}
            onChange={(e) => setTipoPieza(e.target.value)}
            className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
          >
            <option value="hueco-sencillo">
              Ladrillo Hueco Sencillo (24x11,5x4 cm)
            </option>
            <option value="hueco-doble">
              Ladrillo Hueco Doble / Totxana (24x11,5x7 cm)
            </option>
            <option value="perforado">
              Ladrillo Perforado / Gerol (24x11,5x7 cm)
            </option>
            <option value="macizo">Ladrillo Macizo (24x11,5x5 cm)</option>
            <option value="bloque-10">
              Bloque de Hormigón (40x20x10 cm)
            </option>
            <option value="bloque-20">
              Bloque de Hormigón (40x20x20 cm)
            </option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
            Superficie de pared (m²)
          </label>
          <input
            type="number"
            value={m2}
            onChange={(e) => setM2(e.target.value)}
            className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
            placeholder="Ej: 25"
          />
        </div>
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700 bg-slate-950 p-3 transition-colors hover:border-slate-500">
          <input
            type="checkbox"
            checked={conMerma}
            onChange={(e) => setConMerma(e.target.checked)}
            className="accent-primary h-4 w-4"
          />
          <span className="text-xs text-slate-300">
            Añadir{" "}
            <span className="font-bold text-white">+10% de merma</span>{" "}
            (roturas y cortes)
          </span>
        </label>
      </div>

      {/* Consejo de mortero */}
      <div className="rounded-lg border border-slate-700 bg-slate-950 p-3 shadow-inner">
        <p className="mb-1 text-[9px] font-black tracking-widest text-slate-400 uppercase">
          <Lightbulb size={10} className="mr-1 inline text-amber-500" />
          Mortero recomendado:
        </p>
        <p className="text-[11px] text-slate-300">
          Para{" "}
          <span className="font-bold text-white">{pieza.nombre}</span>, usa
          Mortero Seco{" "}
          <span className="text-primary font-bold">{pieza.mortero}</span>.
          {pieza.mortero === "M-5"
            ? " Es suficiente para paredes interiores que no soportan peso."
            : " Es obligatorio para muros de carga y exteriores."}
        </p>
      </div>

      {/* Resultado */}
      <div className="bg-primary/10 border-primary/30 flex items-center justify-between rounded-xl border p-5">
        <div>
          <p className="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
            Piezas necesarias:
          </p>
          <p className="text-primary text-4xl font-black">
            {m2 ? totalUnidades : 0} <span className="text-lg">uds</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Palets completos:
          </p>
          <p className="text-sm font-bold text-white">
            {m2 ? palets : 0} {palets === 1 ? "palet" : "palets"}
          </p>
          <p className="mt-0.5 text-[9px] text-slate-500">
            ({pieza.udsPalet} uds/palet)
          </p>
        </div>
      </div>
    </div>
  );
}

function CalculadoraBorada() {
  const [largoBaldosa, setLargoBaldosa] = useState("");
  const [anchoBaldosa, setAnchoBaldosa] = useState("");
  const [espesorBaldosa, setEspesorBaldosa] = useState("");
  const [anchoJunta, setAnchoJunta] = useState("");
  const [m2, setM2] = useState("");

  // Fórmula: ((A+B) / (A*B)) * C * D * 1.5 = kg/m²
  const A = Number(largoBaldosa) * 10; // cm a mm
  const B = Number(anchoBaldosa) * 10;
  const C = Number(espesorBaldosa); // ya en mm
  const D = Number(anchoJunta); // ya en mm

  const kgPorM2 = A > 0 && B > 0 ? ((A + B) / (A * B)) * C * D * 1.5 : 0;
  const totalKg = kgPorM2 * Number(m2);
  const sacos5kg = Math.ceil(totalKg / 5);

  const todosRellenados =
    largoBaldosa && anchoBaldosa && espesorBaldosa && anchoJunta && m2;

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="mb-3 flex items-center gap-2 text-2xl font-black text-white uppercase italic">
          <Grid3X3 className="text-primary" /> Mortero para Juntas
        </h3>
        <p className="text-text-muted text-xs leading-relaxed">
          Calcula la cantidad exacta de mortero para juntas (rejuntado) que necesitas en
          función del tamaño de la baldosa y el ancho de la junta.
        </p>
      </div>

      <div className="space-y-2 rounded-lg border border-teal-500/20 bg-teal-500/5 p-4">
        <p className="flex items-center gap-1.5 text-[9px] font-black tracking-widest text-teal-400 uppercase">
          <Info size={12} /> Referencia rápida de juntas:
        </p>
        <p className="text-[11px] leading-relaxed text-slate-300">
          •{" "}
          <span className="font-bold text-white">1.5 - 2 mm:</span> Junta
          mínima para porcelánico rectificado.
          <br />•{" "}
          <span className="font-bold text-white">3 mm:</span> Junta estándar
          para interior.
          <br />•{" "}
          <span className="font-bold text-white">5 mm:</span> Junta ancha
          para exteriores o rústicos.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
            Largo baldosa (cm)
          </label>
          <input
            type="number"
            value={largoBaldosa}
            onChange={(e) => setLargoBaldosa(e.target.value)}
            className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
            placeholder="Ej: 60"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
            Ancho baldosa (cm)
          </label>
          <input
            type="number"
            value={anchoBaldosa}
            onChange={(e) => setAnchoBaldosa(e.target.value)}
            className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
            placeholder="Ej: 60"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
            Espesor baldosa (mm)
          </label>
          <input
            type="number"
            value={espesorBaldosa}
            onChange={(e) => setEspesorBaldosa(e.target.value)}
            className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
            placeholder="Ej: 10"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
            Ancho junta (mm)
          </label>
          <input
            type="number"
            value={anchoJunta}
            onChange={(e) => setAnchoJunta(e.target.value)}
            className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
            placeholder="Ej: 3"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
          Superficie total (m²)
        </label>
        <input
          type="number"
          value={m2}
          onChange={(e) => setM2(e.target.value)}
          className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
          placeholder="Ej: 30"
        />
      </div>

      {/* Consejo dinámico */}
      {anchoJunta && Number(anchoJunta) >= 4 && (
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
          <p className="text-[11px] leading-relaxed text-slate-300">
            <Lightbulb size={12} className="mr-1 inline text-amber-500" />
            Con una junta de{" "}
            <span className="font-bold text-white">{anchoJunta}mm</span> o
            más, usa un mortero para juntas específico{" "}
            <span className="font-bold text-amber-400">
              &quot;para juntas anchas&quot;
            </span>
            . Los morteros normales pueden agrietarse al secar en juntas
            grandes.
          </p>
        </div>
      )}

      {/* Rendimiento calculado */}
      {todosRellenados && (
        <div className="rounded-lg border border-slate-700 bg-slate-950 p-3 shadow-inner">
          <p className="mb-1 text-[9px] font-black tracking-widest text-slate-400 uppercase">
            <Zap size={10} className="mr-1 inline text-teal-400" />
            Rendimiento calculado:
          </p>
          <p className="text-[11px] text-slate-300">
            Con una baldosa de{" "}
            <span className="font-bold text-white">
              {largoBaldosa}x{anchoBaldosa} cm
            </span>{" "}
            y junta de{" "}
            <span className="font-bold text-white">{anchoJunta}mm</span>,
            necesitas aproximadamente{" "}
            <span className="font-bold text-teal-400">
              {kgPorM2.toFixed(2)} kg/m²
            </span>{" "}
            de mortero para juntas.
          </p>
        </div>
      )}

      {/* Resultado */}
      <div className="bg-primary/10 border-primary/30 flex items-center justify-between rounded-xl border p-5">
        <div>
          <p className="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
            Bolsas de 5kg necesarias:
          </p>
          <p className="text-primary text-4xl font-black">
            {todosRellenados ? sacos5kg : 0}{" "}
            <span className="text-lg">bolsas</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Total Material:
          </p>
          <p className="text-sm font-bold text-white">
            {todosRellenados ? totalKg.toFixed(1) : 0} Kg
          </p>
        </div>
      </div>
    </div>
  );
}
