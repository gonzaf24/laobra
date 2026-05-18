"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Printer,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  ClipboardList,
} from "lucide-react";
import { getObra } from "@/lib/arquitecto-store";
import type { Obra, EstanciaObra } from "@/lib/arquitecto-types";

// ── Guía de Expertos: Lógica de Secuencia y Consejos ──
const GUIA_TRABAJOS: Record<string, { orden: number; consejos: string[] }> = {
  demolicion: {
    orden: 1,
    consejos: [
      "Retirar escombros diariamente para mantener el área segura.",
      "Cuidado con bajantes y montantes comunitarias ocultas.",
      "Humedecer las zonas a picar para minimizar el polvo en suspensión.",
    ],
  },
  instalaciones: {
    orden: 2,
    consejos: [
      "Verificar niveles de tomas de agua y desagües antes de cerrar.",
      "Proteger puntas de tubos de electricidad para evitar entrada de mortero.",
      "Realizar prueba de presión en tuberías antes del alicatado.",
    ],
  },
  tabiqueria: {
    orden: 3,
    consejos: [
      "Comprobar el plomo de los perfiles o ladrillos cada 3 hiladas.",
      "En Pladur, asegurar que la lana de roca no deje huecos de aislamiento.",
      "Dejar 1cm de holgura en techos para absorber movimientos estructurales.",
    ],
  },
  yeso: {
    orden: 4,
    consejos: [
      "Asegurar ventilación natural para el secado pero evitar corrientes directas.",
      "No pintar hasta que el yeso esté completamente blanco (mínimo 7-10 días).",
      "Proteger carpinterías y cajas eléctricas con cinta de carrocero.",
    ],
  },
  alicatado: {
    orden: 5,
    consejos: [
      "Replanteo inicial para evitar piezas de menos de 1/3 de baldosa en esquinas.",
      "Usar crucetas o sistemas de nivelación para juntas perfectas.",
      "Limpiar el exceso de cemento cola antes de que fragüe.",
    ],
  },
  pintura: {
    orden: 6,
    consejos: [
      "Lijar suavemente entre manos para un acabado premium.",
      "Usar fijador previo si la pared es nueva o muy absorbente.",
      "Pintar primero techos y luego paredes para evitar goteos.",
    ],
  },
};

export default function AgendaPage() {
  const params = useParams();
  const [obra, setObra] = useState<Obra | null>(null);

  useEffect(() => {
    const id = params?.obraId;
    if (typeof id === "string") {
      getObra(id).then((data) => {
        if (data) setObra(data);
      });
    }
  }, [params]);

  if (!obra) return null;

  const generarInstrucciones = (est: EstanciaObra) => {
    const pasos: { tipo: string; titulo: string; detalle: string }[] = [];

    // Lógica para detectar trabajos por estancia
    if (est.suelo.some((s) => s.necesitaPicado)) {
      pasos.push({
        tipo: "demolicion",
        titulo: "Demolición y Preparación",
        detalle: "Picado de suelo existente y desescombro manual.",
      });
    }

    if (est.paredes.length > 0) {
      const tipo = est.paredes[0].tipo.includes("pladur") ? "Pladur" : "Ladrillo";
      pasos.push({
        tipo: "tabiqueria",
        titulo: `Tabiquería (${tipo})`,
        detalle: `Ejecución de muros según diseño. Altura media: ${est.paredes[0].alturaMedia}m.`,
      });
      
      if (est.paredes[0].necesitaGuarnecidoYeso || est.techo.some(t => t.tipo === 'yeso')) {
        pasos.push({
          tipo: "yeso",
          titulo: "Guarnecido y Enlucidos",
          detalle: "Revestimiento de paramentos verticales y/o techos con yeso proyectado o manual.",
        });
      }
    }

    if (est.alicatado.length > 0) {
      pasos.push({
        tipo: "alicatado",
        titulo: "Alicatados y Solados",
        detalle: `Colocación de cerámica en paredes (${est.alicatado[0].m2}m²) con junta de ${est.alicatado[0].anchoJunta}mm.`,
      });
    }

    if (est.pintura.length > 0) {
      pasos.push({
        tipo: "pintura",
        titulo: "Acabado de Pintura",
        detalle: `Aplicación de ${est.pintura[0].manos} manos de pintura plástica de alta calidad.`,
      });
    }

    return pasos.sort((a, b) => GUIA_TRABAJOS[a.tipo].orden - GUIA_TRABAJOS[b.tipo].orden);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 pb-32">
      {/* Header */}
      <div className="mb-10 flex items-end justify-between no-print">
        <div>
          <Link
            href={`/gestion/${params.obraId}`}
            className="mb-4 flex w-fit items-center gap-2 text-xs font-bold text-slate-500 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} /> Volver al Dashboard
          </Link>
          <h1 className="mb-1 text-3xl font-black tracking-tight text-white uppercase italic">
            Guía de Ejecución y Agenda
          </h1>
          <p className="text-sm text-slate-400">
            Instrucciones detalladas por estancia para la cuadrilla de{" "}
            <span className="font-bold text-white">{obra.nombre}</span>
          </p>
        </div>
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-black tracking-widest text-black uppercase transition-all hover:bg-slate-200 active:scale-95 shadow-lg shadow-white/5"
        >
          <Printer size={16} /> Imprimir Hojas de Obra
        </button>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {obra.estancias.map((est) => {
          const pasos = generarInstrucciones(est);
          
          return (
            <div 
              key={est.id} 
              className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 p-8 transition-all hover:border-blue-500/30 print:border-black print:bg-white print:p-10 print:text-black"
            >
              <div className="mb-8 flex items-start justify-between border-b border-slate-800 pb-6 print:border-black">
                <div>
                  <h2 className="text-2xl font-black text-white uppercase italic print:text-black">
                    {est.nombre}
                  </h2>
                  <p className="text-xs font-bold tracking-widest text-blue-500 uppercase">
                    Hoja de Trabajo Técnica
                  </p>
                </div>
                <div className="hidden items-center gap-2 rounded-lg bg-blue-500/10 px-3 py-1.5 text-[10px] font-black text-blue-400 print:flex print:border print:border-black">
                  <ClipboardList size={14} /> ESTANCIA: {est.id.slice(0, 5)}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Columna Izquierda: Pasos */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-xs font-black tracking-widest text-slate-500 uppercase print:text-black">
                    <Clock size={14} className="text-blue-500" /> Orden de Ejecución
                  </h3>
                  <div className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-slate-800 print:before:bg-black">
                    {pasos.map((paso, idx) => (
                      <div key={idx} className="relative pl-8">
                        <div className="absolute left-0 top-1.5 h-[23px] w-[23px] rounded-full border border-slate-800 bg-slate-950 text-center text-[10px] font-black leading-[21px] text-white print:border-black print:bg-white print:text-black">
                          {idx + 1}
                        </div>
                        <h4 className="text-sm font-bold text-white print:text-black">
                          {paso.titulo}
                        </h4>
                        <p className="text-xs leading-relaxed text-slate-400 print:text-black">
                          {paso.detalle}
                        </p>
                      </div>
                    ))}
                    {pasos.length === 0 && (
                      <p className="text-xs italic text-slate-600">No hay trabajos técnicos definidos para esta estancia.</p>
                    )}
                  </div>
                </div>

                {/* Columna Derecha: Consejos de Experto */}
                <div className="rounded-2xl bg-slate-950/50 p-6 print:border print:border-black print:bg-white">
                  <h3 className="mb-4 flex items-center gap-2 text-xs font-black tracking-widest text-amber-500 uppercase">
                    <Info size={14} /> Recomendaciones del Jefe de Obra
                  </h3>
                  <div className="space-y-4">
                    {pasos.map((paso) => (
                      <div key={paso.tipo}>
                        {GUIA_TRABAJOS[paso.tipo]?.consejos.map((consejo, cIdx) => (
                          <div key={cIdx} className="mb-2 flex items-start gap-2 text-xs text-slate-400 print:text-black">
                            <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-emerald-500" />
                            <span>{consejo}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                    <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 print:border-black">
                      <p className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase italic">
                        <AlertTriangle size={12} /> Atención General
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-400 print:text-black">
                        Cualquier desviación del plano o duda técnica debe consultarse con el aparejador antes de proceder. La limpieza y el orden son obligatorios.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pie de página (Solo para imprimir) */}
              <div className="mt-10 hidden border-t border-dashed border-black pt-6 print:block">
                <div className="flex justify-between text-[10px] font-bold uppercase text-black">
                  <div>Vº Bº Jefe de Obra: _______________________</div>
                  <div>Fecha Inicio: ____ / ____ / ____</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          .print\:border-black {
            border-color: black !important;
          }
          .print\:text-black {
            color: black !important;
          }
          .print\:bg-white {
            background-color: white !important;
          }
          .mx-auto {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
