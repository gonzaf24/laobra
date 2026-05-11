"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calculator,
  Package,
  Users,
  Truck,
  AlertTriangle,
  TrendingUp,
  Plus,
  Trash2,
  ChevronDown,
  Save,
  ShieldCheck,
  Info,
} from "lucide-react";
import { getObra } from "@/lib/arquitecto-store";
import type { Obra } from "@/lib/arquitecto-types";
import { useCustomPrices } from "@/lib/materials-store";
import { calcularObra, enriquecerConCostes } from "@/lib/arquitecto-calc";
import {
  getPresupuesto,
  savePresupuesto,
  calcularPresupuesto,
} from "@/lib/presupuesto-store";
import {
  type PresupuestoObra,
  type CosteAdicional,
  type TarifasManoDeObra,
  type PartidaManoObra,
  type ConfigJornaleros,
  type NivelRendimiento,
  type ResumenPresupuesto,
  TARIFAS_DEFECTO,
  CONFIG_JORNALEROS_DEFECTO,
  COSTES_COMUNES,
  RENDIMIENTOS_MEDIOS,
} from "@/lib/presupuesto-types";

const inputCls =
  "focus:border-amber-500 w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-white outline-none";
const labelCls =
  "mb-1 block text-[10px] font-bold tracking-widest text-slate-400 uppercase";

const CORE_CONCEPTOS = [
  { label: "Demolición de suelo", precio: 10, unidad: "m2" },
  { label: "Nivelado / Autonivelante", precio: 12, unidad: "m2" },
  { label: "Colocación cerámica suelo", precio: 22, unidad: "m2" },
  { label: "Alicatado cerámica pared", precio: 25, unidad: "m2" },
  { label: "Tabiquería Pladur", precio: 30, unidad: "m2" },
  { label: "Tabiquería Ladrillo", precio: 35, unidad: "m2" },
  { label: "Enfoscado / Revoque", precio: 15, unidad: "m2" },
  { label: "Guarnecido de Yeso", precio: 12, unidad: "m2" },
  { label: "Falso techo Pladur", precio: 28, unidad: "m2" },
  { label: "Enlucido yeso techo", precio: 14, unidad: "m2" },
  { label: "Pintura", precio: 8, unidad: "m2" },
];

type Tab = "resumen" | "materiales" | "mano-obra" | "otros";

function formatEur(n: number): string {
  return (
    n.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "€"
  );
}

// ─── Barra de porcentaje visual ───
function BarSegment({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
}) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  if (pct < 1) return null;
  return (
    <div className="flex items-center gap-3 text-xs">
      <div className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span className="min-w-[120px] text-slate-400">{label}</span>
      <div className="flex-1">
        <div className="h-2 w-full rounded-full bg-slate-800">
          <div
            className={`h-2 rounded-full ${color}`}
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>
      </div>
      <span className="min-w-[80px] text-right font-bold text-white">
        {formatEur(value)}
      </span>
      <span className="min-w-[40px] text-right text-slate-500">
        {pct.toFixed(0)}%
      </span>
    </div>
  );
}

// ─── Tab Resumen ───
function TabResumen({
  resumen,
  presupuesto,
  obra,
}: {
  resumen: ResumenPresupuesto;
  presupuesto: PresupuestoObra;
  obra: Obra;
}) {
  const usaJornaleros = presupuesto.jornaleros?.activo;
  const moLabel = usaJornaleros ? "Jornaleros" : "Mano de Obra";
  const moValue = usaJornaleros
    ? resumen.totalJornaleros
    : resumen.totalManoDeObra;
  const { subtotal } = resumen;

  // Calcular m² totales de suelo de la obra para el ratio
  const m2TotalesSuelo = obra.estancias.reduce(
    (sum, e) => sum + e.suelo.reduce((s, sec) => s + sec.m2, 0),
    0
  );

  const totalExtras = presupuesto.partidasExtra.reduce(
    (sum, p) => sum + p.cantidad * p.precioUnitario,
    0
  );
  const totalMOBase = usaJornaleros
    ? resumen.resumenJornaleros?.costeTotal || 0
    : resumen.totalManoDeObra - totalExtras;

  return (
    <div className="space-y-8">
      {/* Gran Total */}
      <div className="rounded-2xl border border-amber-500/30 bg-linear-to-br from-amber-500/10 to-transparent p-6">
        <p className="mb-1 text-[10px] font-black tracking-widest text-amber-500/70 uppercase">
          Presupuesto Total Estimado
        </p>
        <p className="text-5xl font-black text-white">
          {formatEur(resumen.totalGeneral)}
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
          <span>Imprevistos: {presupuesto.porcentajeImprevistos}%</span>
          {presupuesto.porcentajeBeneficio > 0 && (
            <span>
              Beneficio Industrial: {presupuesto.porcentajeBeneficio}%
            </span>
          )}
          {usaJornaleros && (
            <span className="text-blue-400">Modo: Cuadrilla de Jornaleros</span>
          )}
        </div>
      </div>

      {/* Cards de resumen */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            label: "Materiales",
            value: resumen.totalMateriales,
            icon: Package,
            color: "text-emerald-500",
          },
          {
            label: usaJornaleros ? "Cuadrilla" : "Mano de Obra",
            value: totalMOBase,
            icon: Users,
            color: "text-blue-500",
          },
          {
            label: "Especialistas",
            value: totalExtras,
            icon: ShieldCheck,
            color: "text-amber-500",
          },
          {
            label: "Otros Costes",
            value: resumen.totalCostesAdicionales,
            icon: Truck,
            color: "text-slate-400",
          },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
          >
            <c.icon size={16} className={`mb-2 ${c.color}`} />
            <p className="mb-1 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              {c.label}
            </p>
            <p className="text-lg font-black text-white">
              {formatEur(c.value)}
            </p>
          </div>
        ))}
      </div>

      {/* Timeline jornaleros */}
      {resumen.resumenJornaleros && (
        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5">
          <h3 className="mb-4 text-xs font-black tracking-widest text-blue-400 uppercase">
            ⏱ Planificación Temporal de la Obra
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-[9px] font-bold text-blue-400/60 uppercase">
                Plazo Total
              </p>
              <p className="text-2xl font-black text-white">
                {resumen.resumenJornaleros.totalDiasObra}
                <span className="ml-1 text-xs font-normal text-slate-500">
                  días
                </span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-[9px] font-bold text-blue-400/60 uppercase">
                Jornales Cuadrilla
              </p>
              <p className="text-2xl font-black text-white">
                {resumen.resumenJornaleros.totalJornadasCuadrilla}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[9px] font-bold text-amber-400/60 uppercase">
                Jornales Especialistas
              </p>
              <p className="text-2xl font-black text-amber-400">
                {resumen.resumenJornaleros.totalJornadasEspecialistas}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[9px] font-bold text-blue-400/60 uppercase">
                Duración
              </p>
              <p className="text-2xl font-black text-white">
                {resumen.resumenJornaleros.totalSemanasObra}
                <span className="ml-1 text-xs font-normal text-slate-500">
                  sem.
                </span>
              </p>
            </div>
          </div>
          <p className="mt-4 text-[10px] leading-relaxed text-slate-500">
            Cálculo secuencial basado en {presupuesto.jornaleros.numOperarios}{" "}
            operarios.
            {presupuesto.jornaleros.trabajaSabados
              ? " Incluye sábados."
              : " Lunes a viernes."}
            <span className="mt-2 block rounded-lg bg-slate-800/50 p-2 italic">
              <strong>Nota profesional:</strong> Aunque delegues trabajos a
              especialistas, estos siguen ocupando tiempo en el calendario.
              Calculamos sus jornadas usando rendimientos estándar para que tu
              plazo de obra sea realista y evitar solapamientos imposibles entre
              gremios.
            </span>
            {resumen.resumenJornaleros.totalJornadasEspecialistas > 0 && (
              <span className="mt-2 block font-bold text-amber-500">
                ✨ {resumen.resumenJornaleros.totalJornadasEspecialistas}{" "}
                jornadas delegadas a especialistas externos.
              </span>
            )}
          </p>
        </div>
      )}

      {/* Desglose visual */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 lg:col-span-2">
          <h3 className="mb-4 text-xs font-black tracking-widest text-slate-400 uppercase">
            Distribución de Gastos
          </h3>
          <div className="space-y-3">
            <BarSegment
              label="Materiales"
              value={resumen.totalMateriales}
              total={subtotal}
              color="bg-emerald-500"
            />
            <BarSegment
              label={moLabel}
              value={moValue}
              total={subtotal}
              color="bg-blue-500"
            />
            <BarSegment
              label="Otros Costes"
              value={resumen.totalCostesAdicionales}
              total={subtotal}
              color="bg-amber-500"
            />
          </div>
          <div className="mt-6 border-t border-slate-800 pt-4">
            <p className="text-[10px] leading-relaxed text-slate-500">
              <b className="text-slate-400">Nota del Experto:</b> En reformas
              integrales, la proporción ideal suele ser 40% materiales / 60%
              mano de obra. Si el material supera el 50%, asegúrate de que las
              calidades (cerámicas, griferías) justifican el incremento.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-6">
          <h3 className="mb-3 flex items-center gap-2 text-xs font-black tracking-widest text-violet-400 uppercase">
            <TrendingUp size={14} /> Análisis de Viabilidad
          </h3>
          <div className="space-y-4">
            <div>
              <p className="mb-1 text-[10px] font-bold tracking-wider text-violet-300/70 uppercase">
                Coste por m² de suelo
              </p>
              <p className="text-xl font-black text-white">
                {m2TotalesSuelo > 0
                  ? formatEur(resumen.totalGeneral / m2TotalesSuelo)
                  : "—"}
                <span className="ml-1 text-xs font-normal text-slate-500">
                  /m²
                </span>
              </p>
              {m2TotalesSuelo > 0 && (
                <p className="mt-1 text-[9px] text-slate-600">
                  Sobre {m2TotalesSuelo} m² de superficie de suelo configurada.
                </p>
              )}
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Para una reforma de calidad en 2026, los precios oscilan entre{" "}
              <b className="text-white">800€ - 1.200€/m²</b>.
            </p>
          </div>
        </div>
      </div>

      {/* Desglose completo */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
        <h3 className="mb-4 text-xs font-black tracking-widest text-slate-400 uppercase">
          Desglose del Presupuesto
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Materiales</span>
            <span className="font-bold text-white">
              {formatEur(resumen.totalMateriales)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">
              {usaJornaleros
                ? "Cuadrilla (Jornaleros)"
                : "Mano de Obra (Planificador)"}
            </span>
            <span className="font-bold text-white">
              {formatEur(totalMOBase)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-indigo-400">
              Gestión y Administración (Indirectos)
            </span>
            <span className="font-bold text-indigo-400">
              {formatEur(resumen.totalAdmin || 0)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-amber-400">
              Especialistas y Subcontratas
            </span>
            <span className="font-bold text-amber-400">
              {formatEur(totalExtras)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Gastos Adicionales</span>
            <span className="font-bold text-white">
              {formatEur(resumen.totalCostesAdicionales)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2 font-bold">
            <span className="text-slate-300">Subtotal</span>
            <span className="text-white">{formatEur(subtotal)}</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-red-400">
              + Imprevistos ({presupuesto.porcentajeImprevistos}%)
            </span>
            <span className="font-bold text-red-400">
              {formatEur(resumen.importeImprevistos)}
            </span>
          </div>
          {presupuesto.porcentajeBeneficio > 0 && (
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-emerald-400">
                + Beneficio Industrial ({presupuesto.porcentajeBeneficio}%)
              </span>
              <span className="font-bold text-emerald-400">
                {formatEur(resumen.importeBeneficio)}
              </span>
            </div>
          )}
          <div className="flex justify-between pt-2 text-sm">
            <span className="font-black text-amber-400 uppercase">
              Total General
            </span>
            <span className="font-black text-amber-400">
              {formatEur(resumen.totalGeneral)}
            </span>
          </div>
        </div>
      </div>

      {/* Mano de obra por estancia (solo modo especialista) */}
      {!usaJornaleros && resumen.lineasManoDeObra.length > 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <h3 className="mb-4 text-xs font-black tracking-widest text-slate-400 uppercase">
            Mano de Obra por Estancia
          </h3>
          {(() => {
            const grouped: Record<string, typeof resumen.lineasManoDeObra> = {};
            resumen.lineasManoDeObra.forEach((l) => {
              if (!grouped[l.estanciaNombre]) grouped[l.estanciaNombre] = [];
              grouped[l.estanciaNombre].push(l);
            });
            return Object.entries(grouped).map(([nombre, lineas]) => (
              <details
                key={nombre}
                className="group mb-2 rounded-lg border border-slate-800 bg-slate-950/50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between p-3 [&::-webkit-details-marker]:hidden">
                  <span className="text-xs font-bold text-white uppercase">
                    {nombre}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-emerald-400">
                      {formatEur(lineas.reduce((s, l) => s + l.total, 0))}
                    </span>
                    <ChevronDown
                      size={14}
                      className="text-slate-500 transition-transform group-open:rotate-180"
                    />
                  </div>
                </summary>
                <div className="space-y-1 border-t border-slate-800 p-3">
                  {lineas.map((l, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-400">{l.concepto}</span>
                      <span className="text-slate-300">
                        {l.m2}m² × {l.tarifa}€ ={" "}
                        <b className="text-white">{formatEur(l.total)}</b>
                      </span>
                    </div>
                  ))}
                </div>
              </details>
            ));
          })()}
        </div>
      )}

      {/* Detalle jornaleros en resumen */}
      {usaJornaleros &&
        resumen.resumenJornaleros &&
        resumen.resumenJornaleros.lineas.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40">
            <div className="bg-slate-800/30 p-4">
              <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase">
                Análisis Detallado de Rendimientos y Plazos
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-[9px] font-black tracking-widest text-slate-500 uppercase">
                    <th className="p-3 pl-6">Trabajo</th>
                    <th className="p-3 text-right">Superficie</th>
                    <th className="p-3 text-right">Rendimiento</th>
                    <th className="p-3 text-right">Jornales</th>
                    <th className="p-3 text-right">Plazo (Días)</th>
                    <th className="p-3 pr-6 text-right">Coste Est.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {resumen.resumenJornaleros.lineas.map((l, i) => {
                    const coste = l.esEspecialista
                      ? 0
                      : l.diasOperario * presupuesto.jornaleros.precioJornal;

                    return (
                      <tr
                        key={i}
                        className="group transition-colors hover:bg-slate-800/20"
                      >
                        <td className="p-3 pl-6">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">
                              {l.concepto}
                            </span>
                            {l.esEspecialista && (
                              <span className="rounded bg-amber-500/10 px-1 py-0.5 text-[8px] font-bold text-amber-500 uppercase">
                                Especialista
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-right text-xs text-slate-400">
                          {l.m2}
                          <span className="ml-0.5 text-[10px] text-slate-600">
                            m²
                          </span>
                        </td>
                        <td className="p-3 text-right text-[10px] text-slate-500">
                          {l.rendimientoEfectivo}
                          <span className="ml-0.5 text-slate-600">m²/día</span>
                        </td>
                        <td className="p-3 text-right text-xs font-medium text-slate-300">
                          {l.diasOperario}
                        </td>
                        <td className="p-3 text-right">
                          <span
                            className={`text-xs font-black ${
                              l.esEspecialista
                                ? "text-amber-400"
                                : "text-blue-400"
                            }`}
                          >
                            {l.diasCalendario}
                            <span className="ml-0.5 text-[10px] font-normal text-slate-600">
                              d
                            </span>
                          </span>
                        </td>
                        <td className="p-3 pr-6 text-right text-xs font-bold text-slate-400">
                          {l.esEspecialista ? (
                            <span className="text-[10px] font-normal text-slate-600 italic">
                              Subcontrata
                            </span>
                          ) : (
                            formatEur(coste)
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
    </div>
  );
}

// ─── Tab Materiales (Read-only from planificador) ───
function TabMateriales({ obra }: { obra: Obra }) {
  const { prices } = useCustomPrices();
  const resultado = calcularObra(obra);
  const conCoste = enriquecerConCostes(resultado.totales, prices);
  const total = conCoste.reduce((s, l) => s + l.costeTotal, 0);

  if (conCoste.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <Package size={40} className="text-slate-700" />
        <p className="text-sm text-slate-500">
          No hay materiales configurados en el planificador.
        </p>
        <Link
          href={`/gestion/${obra.id}/planificador`}
          className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-bold text-white"
        >
          Ir al Planificador
        </Link>
      </div>
    );
  }

  const porCategoria: Record<string, typeof conCoste> = {};
  conCoste.forEach((l) => {
    if (!porCategoria[l.categoria]) porCategoria[l.categoria] = [];
    porCategoria[l.categoria].push(l);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Datos auto-calculados desde el{" "}
          <b className="text-emerald-400">Planificador</b>
        </p>
        <p className="text-lg font-black text-white">
          Total: {formatEur(total)}
        </p>
      </div>
      {Object.entries(porCategoria).map(([cat, lineas]) => (
        <div
          key={cat}
          className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] font-black tracking-widest text-emerald-400 uppercase">
              {cat}
            </p>
            <p className="text-xs font-bold text-slate-400">
              {formatEur(lineas.reduce((s, l) => s + l.costeTotal, 0))}
            </p>
          </div>
          <div className="space-y-1.5">
            {lineas.map((l, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-slate-300">{l.nombre}</span>
                <div className="flex items-center gap-4">
                  <span className="text-slate-500">
                    {l.cantidad} {l.unidad}
                  </span>
                  <span className="min-w-[70px] text-right font-bold text-white">
                    {l.costeTotal > 0 ? formatEur(l.costeTotal) : "-"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Tab Mano de Obra ───

function Capitulo({
  titulo,
  icon,
  categoria,
  conceptosSugeridos,
  partidasExtra,
  lineasAutoAgrupadas,
  tarifas,
  onAddPartida,
  onRemovePartida,
  onUpdatePartida,
  onUpdateTarifa,
}: {
  titulo: string;
  icon: string;
  categoria: string;
  conceptosSugeridos: { label: string; precio: number; unidad: string }[];
  partidasExtra: PartidaManoObra[];
  lineasAutoAgrupadas: Record<
    string,
    { m2: number; tarifaKey: keyof TarifasManoDeObra }
  >;
  tarifas: TarifasManoDeObra;
  onAddPartida: (
    categoria: string,
    nombre?: string,
    precio?: number,
    unidad?: string
  ) => void;
  onRemovePartida: (id: string) => void;
  onUpdatePartida: (id: string, updates: Partial<PartidaManoObra>) => void;
  onUpdateTarifa: (key: keyof TarifasManoDeObra, val: number) => void;
}) {
  const extras = partidasExtra.filter((p) => p.categoria === categoria);
  const autos = Object.entries(lineasAutoAgrupadas).filter(([concepto]) => {
    if (categoria === "Suelos")
      return [
        "Demolición de suelo",
        "Nivelado / Autonivelante",
        "Colocación de suelo",
      ].includes(concepto);
    if (categoria === "Tabiquería / Pared")
      return [
        "Tabiquería Pladur",
        "Tabiquería Ladrillo",
        "Enfoscado / Revoque",
        "Guarnecido de Yeso",
        "Alicatado",
      ].includes(concepto);
    if (categoria === "Techos")
      return ["Falso techo Pladur", "Enlucido Yeso Techo"].includes(concepto);
    if (categoria === "Acabados") return ["Pintura"].includes(concepto);
    return false;
  });

  if (
    autos.length === 0 &&
    extras.length === 0 &&
    categoria !== "Instalaciones"
  )
    return null;

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-800/30 p-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <h3 className="text-xs font-black tracking-widest text-white uppercase">
            {titulo}
          </h3>
        </div>
        <select
          className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] font-bold text-slate-400 outline-none"
          onChange={(e) => {
            if (e.target.value === "custom") {
              onAddPartida(categoria);
            } else {
              const sug = conceptosSugeridos.find(
                (s) => s.label === e.target.value
              );
              if (sug)
                onAddPartida(categoria, sug.label, sug.precio, sug.unidad);
            }
            e.target.value = "";
          }}
          value=""
        >
          <option value="" disabled>
            + Añadir partida...
          </option>
          {conceptosSugeridos.map((s) => (
            <option key={s.label} value={s.label}>
              {s.label}
            </option>
          ))}
          <option value="custom">✨ Tarea personalizada...</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800/50 text-[9px] font-black tracking-tighter text-slate-500 uppercase">
              <th className="p-3 pl-6">Partida</th>
              <th className="p-3 text-right">Cant.</th>
              <th className="p-3 text-center">Ud.</th>
              <th className="p-3 text-right">Precio</th>
              <th className="p-3 pr-6 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/30">
            {autos.map(([concepto, data]) => (
              <tr key={concepto} className="group hover:bg-slate-800/20">
                <td className="p-3 pl-6">
                  <p className="text-xs font-bold text-white">{concepto}</p>
                  <p className="text-[10px] text-slate-500 italic">
                    Métrica del planificador
                  </p>
                </td>
                <td className="p-3 text-right text-xs text-slate-400">
                  {data.m2.toFixed(2)}
                </td>
                <td className="p-3 text-center text-[10px] text-slate-600">
                  m²
                </td>
                <td className="p-3 text-right">
                  <input
                    type="number"
                    className="w-16 bg-transparent text-right text-xs font-bold text-blue-400 outline-none"
                    value={tarifas[data.tarifaKey]}
                    onChange={(e) =>
                      onUpdateTarifa(data.tarifaKey, Number(e.target.value))
                    }
                  />
                </td>
                <td className="p-3 pr-6 text-right text-xs font-black text-white">
                  {formatEur(data.m2 * tarifas[data.tarifaKey])}
                </td>
              </tr>
            ))}
            {extras.map((p) => (
              <tr key={p.id} className="group hover:bg-slate-800/20">
                <td className="p-3 pl-6">
                  <input
                    className="w-full bg-transparent text-xs font-bold text-amber-400 outline-none"
                    value={p.nombre}
                    onChange={(e) =>
                      onUpdatePartida(p.id, { nombre: e.target.value })
                    }
                    placeholder="Nueva tarea..."
                  />
                  <input
                    className="w-full bg-transparent text-[10px] text-slate-500 outline-none"
                    value={p.descripcion}
                    onChange={(e) =>
                      onUpdatePartida(p.id, { descripcion: e.target.value })
                    }
                    placeholder="Añadir descripción..."
                  />
                </td>
                <td className="p-3 text-right">
                  <input
                    type="number"
                    className="w-16 bg-transparent text-right text-xs text-slate-300 outline-none"
                    value={p.cantidad}
                    onChange={(e) =>
                      onUpdatePartida(p.id, {
                        cantidad: Number(e.target.value),
                      })
                    }
                  />
                </td>
                <td className="p-3 text-center">
                  <select
                    className="bg-transparent text-[10px] text-slate-600 outline-none"
                    value={p.unidad}
                    onChange={(e) =>
                      onUpdatePartida(p.id, { unidad: e.target.value })
                    }
                  >
                    <option value="global">glb</option>
                    <option value="m2">m²</option>
                    <option value="ud">ud</option>
                  </select>
                </td>
                <td className="p-3 text-right">
                  <input
                    type="number"
                    className="w-16 bg-transparent text-right text-xs font-black text-amber-400 outline-none"
                    value={p.precioUnitario}
                    onChange={(e) =>
                      onUpdatePartida(p.id, {
                        precioUnitario: Number(e.target.value),
                      })
                    }
                  />
                </td>
                <td className="relative p-3 pr-6 text-right text-xs font-black text-white">
                  {formatEur(p.cantidad * p.precioUnitario)}
                  <button
                    onClick={() => onRemovePartida(p.id)}
                    className="absolute top-1/2 -right-2 -translate-y-1/2 p-2 text-slate-600 opacity-0 group-hover:opacity-100 hover:text-red-400"
                  >
                    <Trash2 size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TabManoDeObra({
  tarifas,
  onChange,
  jornaleros,
  onChangeJornaleros,
  personalAdmin,
  onChangePersonalAdmin,
  resumen,
  partidasExtra,
  onChangePartidasExtra,
}: {
  tarifas: TarifasManoDeObra;
  onChange: (t: TarifasManoDeObra) => void;
  jornaleros: ConfigJornaleros;
  onChangeJornaleros: (j: ConfigJornaleros) => void;
  personalAdmin: PresupuestoObra["personalAdmin"];
  onChangePersonalAdmin: (p: PresupuestoObra["personalAdmin"]) => void;
  resumen: ResumenPresupuesto;
  partidasExtra: PartidaManoObra[];
  onChangePartidasExtra: (p: PartidaManoObra[]) => void;
}) {
  const resetDefaults = () => onChange({ ...TARIFAS_DEFECTO });

  const addPersonaAdmin = () => {
    onChangePersonalAdmin([
      ...personalAdmin,
      { id: crypto.randomUUID(), nombre: "", tipo: "jornal", valor: 0 },
    ]);
  };

  const removePersonaAdmin = (id: string) => {
    onChangePersonalAdmin(personalAdmin.filter((p) => p.id !== id));
  };

  const updatePersonaAdmin = (
    id: string,
    updates: Partial<PresupuestoObra["personalAdmin"][0]>
  ) => {
    onChangePersonalAdmin(
      personalAdmin.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  // Agrupar líneas automáticas por concepto
  const lineasAutoAgrupadas: Record<
    string,
    { m2: number; tarifaKey: keyof TarifasManoDeObra }
  > = {};

  const conceptoToTarifa: Record<string, keyof TarifasManoDeObra> = {
    "Demolición de suelo": "demolicionSuelo",
    "Nivelado / Autonivelante": "nivelado",
    "Colocación de suelo": "solado",
    "Tabiquería Pladur": "tabiqueriaPladur",
    "Tabiquería Ladrillo": "tabioqueriaLadrillo",
    "Enfoscado / Revoque": "enfoscado",
    "Guarnecido de Yeso": "guarnecidoYeso",
    Alicatado: "alicatado",
    "Falso techo Pladur": "falsoTechoPladur",
    "Enlucido Yeso Techo": "enlucidoYesoTecho",
    Pintura: "pintura",
  };

  resumen.lineasManoDeObra.forEach((l) => {
    if (!lineasAutoAgrupadas[l.concepto]) {
      lineasAutoAgrupadas[l.concepto] = {
        m2: 0,
        tarifaKey: conceptoToTarifa[l.concepto],
      };
    }
    lineasAutoAgrupadas[l.concepto].m2 += l.m2;
  });

  const addPartida = (
    categoria: string,
    nombre = "",
    precio = 0,
    unidad = "global"
  ) => {
    const newPartida: PartidaManoObra = {
      id: Math.random().toString(36).substring(2, 11),
      nombre: nombre || "Nueva partida",
      descripcion: "",
      categoria,
      cantidad: 1,
      precioUnitario: precio,
      unidad: unidad,
    };
    onChangePartidasExtra([...partidasExtra, newPartida]);
  };

  const removePartida = (id: string) => {
    onChangePartidasExtra(partidasExtra.filter((p) => p.id !== id));
  };

  const updatePartida = (id: string, updates: Partial<PartidaManoObra>) => {
    onChangePartidasExtra(
      partidasExtra.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const updateTarifa = (key: keyof TarifasManoDeObra, val: number) => {
    onChange({ ...tarifas, [key]: val });
  };

  return (
    <div className="space-y-10">
      {/* ═══ SECCIÓN JORNALEROS ═══ */}
      <div
        className={`rounded-2xl border p-6 transition-colors ${jornaleros.activo ? "border-blue-500/40 bg-blue-500/5" : "border-slate-800 bg-slate-900/40"}`}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-black text-white uppercase">
              👷 Cuadrilla de Jornaleros
            </h3>
            <p className="text-[11px] text-slate-400 italic">
              Personal fijo cobrando por día completo.
            </p>
          </div>
          <button
            onClick={() =>
              onChangeJornaleros({ ...jornaleros, activo: !jornaleros.activo })
            }
            className={`rounded-full px-4 py-1.5 text-[10px] font-black uppercase transition-all ${jornaleros.activo ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40" : "bg-slate-800 text-slate-500"}`}
          >
            {jornaleros.activo ? "✓ Activado" : "Activar"}
          </button>
        </div>

        {jornaleros.activo && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <label className={labelCls}>Jornal (€/día)</label>
                <input
                  type="number"
                  className={inputCls}
                  value={jornaleros.precioJornal}
                  onChange={(e) =>
                    onChangeJornaleros({
                      ...jornaleros,
                      precioJornal: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className={labelCls}>Nº Operarios</label>
                <input
                  type="number"
                  className={inputCls}
                  value={jornaleros.numOperarios}
                  onChange={(e) =>
                    onChangeJornaleros({
                      ...jornaleros,
                      numOperarios: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className={labelCls}>Rendimiento</label>
                <select
                  className={inputCls}
                  value={jornaleros.rendimiento}
                  onChange={(e) =>
                    onChangeJornaleros({
                      ...jornaleros,
                      rendimiento: e.target.value as NivelRendimiento,
                    })
                  }
                >
                  <option value="bajo">🐢 Bajo</option>
                  <option value="normal">⚡ Normal</option>
                  <option value="alto">🚀 Alto</option>
                </select>
              </div>
              <div className="flex flex-col justify-end">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-700 bg-slate-950/50 p-2 text-xs text-slate-400">
                  <input
                    type="checkbox"
                    checked={jornaleros.trabajaSabados}
                    onChange={(e) =>
                      onChangeJornaleros({
                        ...jornaleros,
                        trabajaSabados: e.target.checked,
                      })
                    }
                    className="accent-blue-500"
                  />
                  Sábados
                </label>
              </div>
            </div>

            {/* Checklist de trabajos incluidos */}
            <div className="mt-6 border-t border-blue-500/10 pt-4">
              <label className={labelCls + " mb-3"}>
                ¿Qué trabajos hace tu cuadrilla?
              </label>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                {Object.entries(RENDIMIENTOS_MEDIOS).map(([key, info]) => {
                  const isExcluded = (
                    jornaleros.trabajosExcluidos || []
                  ).includes(key);
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <label className="flex cursor-pointer items-center gap-2 text-[10px] text-slate-400 hover:text-white">
                        <input
                          type="checkbox"
                          checked={!isExcluded}
                          onChange={(e) => {
                            const newExcluidos = e.target.checked
                              ? (jornaleros.trabajosExcluidos || []).filter(
                                  (k) => k !== key
                                )
                              : [...(jornaleros.trabajosExcluidos || []), key];
                            onChangeJornaleros({
                              ...jornaleros,
                              trabajosExcluidos: newExcluidos,
                            });
                          }}
                          className="accent-blue-500"
                        />
                        {info.label}
                      </label>
                      <div className="group relative">
                        <Info
                          size={11}
                          className="cursor-help text-slate-600 transition-colors hover:text-blue-400"
                        />
                        <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-48 -translate-x-1/2 rounded-lg border border-slate-700 bg-slate-900 p-2 text-[9px] leading-relaxed text-slate-200 opacity-0 shadow-2xl transition-opacity group-hover:opacity-100">
                          {info.desc}
                          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-slate-700 bg-slate-900" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-[9px] text-slate-500 italic">
                Los trabajos desmarcados se calcularán automáticamente con el
                precio de <b>Especialista (€/m²)</b>.
              </p>
            </div>

            {resumen.resumenJornaleros && (
              <div className="flex items-center justify-between rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
                <div className="flex-1 text-center">
                  <p className="text-[9px] font-black text-slate-500 uppercase">
                    Plazo estimado
                  </p>
                  <p className="text-xl font-black text-white">
                    {resumen.resumenJornaleros?.totalDiasCalendario || 0}{" "}
                    <span className="text-xs font-normal text-slate-500">
                      días
                    </span>
                  </p>
                </div>
                <div className="h-8 w-px bg-blue-500/20" />
                <div className="flex-1 text-center">
                  <p className="text-[9px] font-black text-slate-500 uppercase">
                    Coste mano obra
                  </p>
                  <p className="text-xl font-black text-blue-400">
                    {formatEur(resumen.resumenJornaleros?.costeTotal || 0)}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ═══ EQUIPO DE GESTIÓN (INDIRECTOS) ═══ */}
      <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6 transition-colors">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-black text-indigo-400 uppercase">
              💼 Equipo de Gestión y Oficina
            </h3>
            <p className="text-[11px] text-slate-400 italic">
              Personal para compras, inventario y administración (Costes
              Indirectos).
            </p>
          </div>
          <button
            onClick={addPersonaAdmin}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-[10px] font-black text-white uppercase shadow-lg shadow-indigo-900/40"
          >
            <Plus size={14} /> Añadir Responsable
          </button>
        </div>

        {personalAdmin.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 py-8">
            <p className="text-[10px] font-bold tracking-widest text-slate-600 uppercase">
              No has añadido personal de gestión
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {personalAdmin.map((p) => (
              <div
                key={p.id}
                className="flex flex-wrap items-end gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4"
              >
                <div className="min-w-[200px] flex-1">
                  <label className={labelCls}>Nombre / Rol</label>
                  <input
                    placeholder="Ej: Gestor de Compras y Almacén"
                    className={inputCls}
                    value={p.nombre}
                    onChange={(e) =>
                      updatePersonaAdmin(p.id, { nombre: e.target.value })
                    }
                  />
                </div>
                <div className="w-[140px]">
                  <label className={labelCls}>Tipo de Coste</label>
                  <select
                    className={inputCls}
                    value={p.tipo}
                    onChange={(e) =>
                      updatePersonaAdmin(p.id, {
                        tipo: e.target.value as "jornal" | "fijo",
                      })
                    }
                  >
                    <option value="jornal">Por día</option>
                    <option value="fijo">Fijo total</option>
                  </select>
                </div>
                <div className="w-[120px]">
                  <label className={labelCls}>
                    {p.tipo === "jornal" ? "€ / Día" : "€ Total"}
                  </label>
                  <input
                    type="number"
                    className={inputCls}
                    value={p.valor || ""}
                    onChange={(e) =>
                      updatePersonaAdmin(p.id, {
                        valor: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex h-[40px] items-center gap-4">
                  <div className="text-right">
                    <p className="text-[8px] font-bold text-slate-500 uppercase">
                      Coste Estimado
                    </p>
                    <p className="text-xs font-black text-indigo-400">
                      {formatEur(
                        p.tipo === "jornal"
                          ? p.valor *
                              (resumen.resumenJornaleros?.totalDiasObra || 20)
                          : p.valor
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => removePersonaAdmin(p.id)}
                    className="text-red-500/50 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            <p className="mt-2 text-[9px] leading-relaxed text-slate-500 italic">
              * El coste `&quot;`Por día`&quot;` se calcula basándose en el
              plazo total estimado de la obra (
              {resumen.resumenJornaleros?.totalDiasObra || 20} días).
            </p>
          </div>
        )}
      </div>

      {/* ═══ CAPÍTULOS DE ESPECIALISTAS ═══ */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-black text-white uppercase">
            <Users size={16} className="text-amber-500" /> Especialistas y
            Subcontratas
          </h3>
          <button
            onClick={resetDefaults}
            className="text-[9px] font-bold tracking-widest text-slate-600 uppercase hover:text-white"
          >
            Restaurar bases
          </button>
        </div>

        <Capitulo
          titulo="Capítulo 1: Suelos y Cimentación"
          icon="🧱"
          categoria="Suelos"
          conceptosSugeridos={[
            ...CORE_CONCEPTOS,
            { label: "Rodapié madera/cerámico", precio: 5, unidad: "ml" },
            { label: "Refuerzo solera", precio: 25, unidad: "m2" },
          ]}
          partidasExtra={partidasExtra}
          lineasAutoAgrupadas={lineasAutoAgrupadas}
          tarifas={tarifas}
          onAddPartida={addPartida}
          onRemovePartida={removePartida}
          onUpdatePartida={updatePartida}
          onUpdateTarifa={updateTarifa}
        />
        <Capitulo
          titulo="Capítulo 2: Albañilería y Tabiques"
          icon="🏛️"
          categoria="Tabiquería / Pared"
          conceptosSugeridos={[
            ...CORE_CONCEPTOS,
            { label: "Rozas para cables", precio: 15, unidad: "ml" },
            { label: "Formación de platos ducha", precio: 200, unidad: "ud" },
          ]}
          partidasExtra={partidasExtra}
          lineasAutoAgrupadas={lineasAutoAgrupadas}
          tarifas={tarifas}
          onAddPartida={addPartida}
          onRemovePartida={removePartida}
          onUpdatePartida={updatePartida}
          onUpdateTarifa={updateTarifa}
        />
        <Capitulo
          titulo="Capítulo 3: Techos y Pladur"
          icon="🏠"
          categoria="Techos"
          conceptosSugeridos={[
            ...CORE_CONCEPTOS,
            { label: "Aislamiento lana roca", precio: 8, unidad: "m2" },
            { label: "Foseados para LED", precio: 30, unidad: "ml" },
          ]}
          partidasExtra={partidasExtra}
          lineasAutoAgrupadas={lineasAutoAgrupadas}
          tarifas={tarifas}
          onAddPartida={addPartida}
          onRemovePartida={removePartida}
          onUpdatePartida={updatePartida}
          onUpdateTarifa={updateTarifa}
        />
        <Capitulo
          titulo="Capítulo 4: Instalaciones"
          icon="🔌"
          categoria="Instalaciones"
          conceptosSugeridos={[
            ...CORE_CONCEPTOS,
            { label: "Punto de luz completo", precio: 65, unidad: "ud" },
            { label: "Fontanería baño", precio: 450, unidad: "global" },
            { label: "Acometida general", precio: 1200, unidad: "global" },
            { label: "Oficial de primera", precio: 150, unidad: "global" },
          ]}
          partidasExtra={partidasExtra}
          lineasAutoAgrupadas={lineasAutoAgrupadas}
          tarifas={tarifas}
          onAddPartida={addPartida}
          onRemovePartida={removePartida}
          onUpdatePartida={updatePartida}
          onUpdateTarifa={updateTarifa}
        />
        <Capitulo
          titulo="Capítulo 5: Acabados"
          icon="🎨"
          categoria="Acabados"
          conceptosSugeridos={[
            ...CORE_CONCEPTOS,
            { label: "Papel pintado", precio: 35, unidad: "m2" },
            { label: "Barnizado de carpintería", precio: 120, unidad: "ud" },
          ]}
          partidasExtra={partidasExtra}
          lineasAutoAgrupadas={lineasAutoAgrupadas}
          tarifas={tarifas}
          onAddPartida={addPartida}
          onRemovePartida={removePartida}
          onUpdatePartida={updatePartida}
          onUpdateTarifa={updateTarifa}
        />
      </div>

      {/* Consejo final */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
        <p className="text-[11px] leading-relaxed text-slate-500">
          <b className="text-amber-400">💡 Consejo:</b> Pide siempre al menos{" "}
          <b className="text-white">3 presupuestos</b> a operarios diferentes y
          anota sus precios aquí. El precio más barato no siempre es el mejor —
          valora también la experiencia, las referencias y si incluyen garantía
          de acabado.
        </p>
      </div>
    </div>
  );
}

// ─── Tab Otros Costes ───
function TabOtrosCostes({
  costes,
  onChange,
  porcentajeImprevistos,
  porcentajeBeneficio,
  onChangeImprevistos,
  onChangeBeneficio,
}: {
  costes: CosteAdicional[];
  onChange: (c: CosteAdicional[]) => void;
  porcentajeImprevistos: number;
  porcentajeBeneficio: number;
  onChangeImprevistos: (v: number) => void;
  onChangeBeneficio: (v: number) => void;
}) {
  const addCoste = () => {
    onChange([
      ...costes,
      { id: crypto.randomUUID(), concepto: "", cantidad: 1, precioUnitario: 0 },
    ]);
  };

  const addComun = (c: Omit<CosteAdicional, "id">) => {
    onChange([...costes, { ...c, id: crypto.randomUUID() }]);
  };

  const updateCoste = (id: string, patch: Partial<CosteAdicional>) => {
    onChange(costes.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const removeCoste = (id: string) => {
    onChange(costes.filter((c) => c.id !== id));
  };

  const total = costes.reduce((s, c) => s + c.cantidad * c.precioUnitario, 0);

  return (
    <div className="space-y-8">
      {/* Explicación de Coeficientes */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-400" />
            <h4 className="text-xs font-black tracking-widest text-red-400 uppercase">
              La Partida de Imprevistos
            </h4>
          </div>
          <p className="mb-4 text-[11px] leading-relaxed text-slate-400">
            Ninguna obra es perfecta. Siempre aparecen vicios ocultos (tuberías
            en mal estado, humedades no detectadas). Aplicar un{" "}
            <b className="text-white">10-15%</b> te permite absorber estos
            costes sin detener la obra ni renegociar con el cliente.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="1"
              min="0"
              max="30"
              className={inputCls}
              value={porcentajeImprevistos}
              onChange={(e) => onChangeImprevistos(Number(e.target.value))}
            />
            <span className="text-xs font-bold text-slate-500">%</span>
          </div>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-400" />
            <h4 className="text-xs font-black tracking-widest text-emerald-400 uppercase">
              Beneficio Industrial (BI)
            </h4>
          </div>
          <p className="mb-4 text-[11px] leading-relaxed text-slate-400">
            Si eres el profesional que gestiona la obra, este margen cubre tus
            gastos de estructura, oficina y tu{" "}
            <b className="text-white">ganancia neta</b>. Un{" "}
            <b className="text-white">13% + 6% (Gastos Generales)</b> es el
            estándar legal en licitaciones públicas.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="1"
              min="0"
              max="40"
              className={inputCls}
              value={porcentajeBeneficio}
              onChange={(e) => onChangeBeneficio(Number(e.target.value))}
            />
            <span className="text-xs font-bold text-slate-500">%</span>
          </div>
        </div>
      </div>

      {/* Costes comunes rápidos */}
      <div>
        <p className="mb-3 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          Añadir costes comunes
        </p>
        <div className="flex flex-wrap gap-2">
          {COSTES_COMUNES.map((c, i) => (
            <button
              key={i}
              onClick={() => addComun(c)}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-[10px] font-bold text-slate-300 transition-colors hover:border-amber-500/50 hover:text-white"
            >
              + {c.concepto}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de costes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Costes adicionales ({costes.length})
          </p>
          <p className="text-sm font-black text-white">
            Total: {formatEur(total)}
          </p>
        </div>
        {costes.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
          >
            <div className="mb-3 flex items-start justify-between">
              <input
                className={inputCls + " max-w-[300px]"}
                value={c.concepto}
                onChange={(e) =>
                  updateCoste(c.id, { concepto: e.target.value })
                }
                placeholder="Concepto"
              />
              <button
                onClick={() => removeCoste(c.id)}
                className="ml-2 text-red-400 hover:text-red-300"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>Cantidad</label>
                <input
                  type="number"
                  className={inputCls}
                  value={c.cantidad}
                  onChange={(e) =>
                    updateCoste(c.id, { cantidad: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <label className={labelCls}>Precio Unit.</label>
                <input
                  type="number"
                  className={inputCls}
                  value={c.precioUnitario}
                  onChange={(e) =>
                    updateCoste(c.id, {
                      precioUnitario: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className={labelCls}>Total</label>
                <p className="p-2.5 text-sm font-bold text-white">
                  {formatEur(c.cantidad * c.precioUnitario)}
                </p>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={addCoste}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-amber-500/30 bg-amber-500/5 py-4 text-xs font-bold text-amber-400 transition-colors hover:bg-amber-500/10"
        >
          <Plus size={16} /> Añadir Coste Personalizado
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// PÁGINA PRINCIPAL DEL PRESUPUESTO
// ═══════════════════════════════════════════════════
export default function PresupuestoPage() {
  const params = useParams();
  const obraId = params.obraId as string;
  const { prices } = useCustomPrices();

  const [obra, setObra] = useState<Obra | null>(null);
  const [presupuesto, setPresupuesto] = useState<PresupuestoObra | null>(null);
  const [tab, setTab] = useState<Tab>("resumen");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const o = getObra(obraId);
    if (o) {
      queueMicrotask(() => {
        setObra(o);
        setPresupuesto(getPresupuesto(obraId));
      });
    }
  }, [obraId]);

  const handleSave = useCallback(() => {
    if (!presupuesto) return;
    savePresupuesto(presupuesto);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [presupuesto]);

  // Auto-save on changes
  useEffect(() => {
    if (!presupuesto) return;
    const timeout = setTimeout(() => savePresupuesto(presupuesto), 500);
    return () => clearTimeout(timeout);
  }, [presupuesto]);

  if (!obra || !presupuesto) {
    return (
      <div className="flex items-center justify-center py-32 text-slate-500">
        Cargando presupuesto...
      </div>
    );
  }

  const resumen = calcularPresupuesto(obra, presupuesto, prices);

  const tabs: { id: Tab; label: string; icon: typeof Calculator }[] = [
    { id: "resumen", label: "Resumen", icon: Calculator },
    { id: "materiales", label: "Materiales", icon: Package },
    { id: "mano-obra", label: "Mano de Obra", icon: Users },
    { id: "otros", label: "Otros Costes", icon: Truck },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 pb-32">
      {/* Header */}
      <Link
        href={`/gestion/${obraId}`}
        className="mb-4 inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase hover:text-amber-500"
      >
        <ArrowLeft size={12} /> Dashboard de la Obra
      </Link>

      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="mb-1 text-3xl font-black tracking-tight text-white uppercase italic">
            Presupuesto
          </h1>
          <p className="text-sm text-slate-400">
            Control de costes de{" "}
            <span className="font-bold text-white">{obra.nombre}</span>
          </p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
            saved
              ? "bg-emerald-600 text-white"
              : "border border-slate-700 text-slate-400 hover:border-amber-500/50 hover:text-white"
          }`}
        >
          <Save size={14} /> {saved ? "Guardado ✓" : "Guardar"}
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-2 overflow-x-auto border-b border-slate-800 pb-px">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 border-b-2 px-4 pb-3 text-xs font-bold tracking-widest whitespace-nowrap uppercase transition-colors ${
              tab === t.id
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "resumen" && (
        <TabResumen resumen={resumen} presupuesto={presupuesto} obra={obra} />
      )}
      {tab === "materiales" && <TabMateriales obra={obra} />}
      {tab === "mano-obra" && (
        <TabManoDeObra
          tarifas={presupuesto.tarifas}
          onChange={(tarifas) => setPresupuesto({ ...presupuesto, tarifas })}
          jornaleros={presupuesto.jornaleros || CONFIG_JORNALEROS_DEFECTO}
          onChangeJornaleros={(jornaleros) =>
            setPresupuesto({ ...presupuesto, jornaleros })
          }
          partidasExtra={presupuesto.partidasExtra || []}
          onChangePartidasExtra={(partidasExtra) =>
            setPresupuesto({ ...presupuesto, partidasExtra })
          }
          personalAdmin={presupuesto.personalAdmin || []}
          onChangePersonalAdmin={(personalAdmin) =>
            setPresupuesto({ ...presupuesto, personalAdmin })
          }
          resumen={resumen}
        />
      )}
      {tab === "otros" && (
        <TabOtrosCostes
          costes={presupuesto.costesAdicionales}
          onChange={(costesAdicionales) =>
            setPresupuesto({ ...presupuesto, costesAdicionales })
          }
          porcentajeImprevistos={presupuesto.porcentajeImprevistos}
          porcentajeBeneficio={presupuesto.porcentajeBeneficio}
          onChangeImprevistos={(porcentajeImprevistos) =>
            setPresupuesto({ ...presupuesto, porcentajeImprevistos })
          }
          onChangeBeneficio={(porcentajeBeneficio) =>
            setPresupuesto({ ...presupuesto, porcentajeBeneficio })
          }
        />
      )}
    </div>
  );
}
