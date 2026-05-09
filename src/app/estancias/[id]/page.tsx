"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Info,
  Play,
  Zap,
  ArrowLeft,
  X,
  ExternalLink,
} from "lucide-react";
import { ESTANCIAS_DATA } from "@/lib/estancias-data";
import { MATERIALS_DATA } from "@/lib/materials-data";

export default function EstanciaDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [showVideoModal, setShowVideoModal] = useState(false);

  const estancia = ESTANCIAS_DATA.find((e) => e.id === id);

  if (!estancia) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-12 text-center">
        <h2 className="mb-4 text-3xl font-black text-white uppercase">
          Estancia no encontrada
        </h2>
        <Link
          href="/estancias"
          className="text-primary flex items-center gap-2 font-bold transition-colors hover:text-white"
        >
          <ArrowLeft size={18} />
          Volver a la guía
        </Link>
      </div>
    );
  }

  const IconComponent = estancia.icon;

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 pb-24">
      {/* Botón Volver */}
      <Link
        href="/estancias"
        className="text-text-muted hover:text-primary mb-6 inline-flex items-center gap-2 text-xs font-bold transition-colors"
      >
        <ArrowLeft size={14} />
        Volver a estancias
      </Link>

      {/* Cabecera */}
      <header className="mb-8">
        <div className="mb-4 flex items-center gap-4">
          <div
            className={`rounded-lg p-3 ${estancia.color} border border-white/10 shadow-lg`}
          >
            <IconComponent size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight text-white uppercase italic md:text-2xl">
              {estancia.name}
            </h2>
            <p className="text-text-muted mt-0.5 text-xs">
              {estancia.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-md border border-slate-800 bg-slate-900/60 px-3 py-2">
          <div className="text-primary text-[9px] font-black tracking-widest uppercase">
            {estancia.items.length} zonas de actuación
          </div>
        </div>
      </header>

      {/* Contenido */}
      <div className="space-y-4">
        {estancia.items.map((item, idx) => (
          <div
            key={idx}
            className="overflow-hidden border border-slate-800 bg-slate-900 shadow-sm transition-all duration-300 hover:border-slate-700"
          >
            {/* Cabecera de la sección */}
            <div className="border-b border-slate-800 bg-slate-800/30 px-5 py-3">
              <span className="text-primary text-[10px] font-black tracking-widest uppercase">
                Zona: {item.area}
              </span>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h4 className="mb-3 text-lg font-black text-white uppercase italic">
                  {item.material}
                </h4>

                {/* Links a Fichas Técnicas */}
                {item.materialIds && item.materialIds.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {item.materialIds.map((mId) => {
                      const mat = MATERIALS_DATA.find((m) => m.id === mId);
                      if (!mat) return null;
                      return (
                        <Link
                          key={mId}
                          href={`/materiales?from=${id}#${mId}`}
                          className="group hover:bg-primary flex items-center gap-1.5 rounded-sm bg-slate-800 px-3 py-1.5 text-[10px] font-bold text-slate-300 transition-all hover:text-slate-900"
                        >
                          <ExternalLink size={12} />
                          Ficha: {mat.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Bloques de Información */}
              <div className="space-y-6">
                {/* Propósito */}
                <div className="space-y-2">
                  <p className="text-primary flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
                    <Zap size={14} /> Objetivo de la instalación
                  </p>
                  <p className="text-sm leading-relaxed text-slate-200">
                    {item.purpose}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Razón */}
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-[10px] font-black tracking-widest text-amber-500 uppercase">
                      <Info size={14} /> El porqué técnico
                    </p>
                    <p className="text-xs leading-relaxed text-slate-400 italic">
                      &quot;{item.reason}&quot;
                    </p>
                  </div>

                  {/* Ejemplo */}
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-[10px] font-black tracking-widest text-emerald-500 uppercase">
                      <CheckCircle2 size={14} /> Aplicación práctica
                    </p>
                    <p className="text-xs leading-relaxed text-slate-400">
                      {item.example}
                    </p>
                  </div>
                </div>
              </div>

              {/* Botones de Vídeo */}
              {item.videoIds && item.videoIds.length > 0 && (
                <div className="mt-8 border-t border-slate-800 pt-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                      Material Audiovisual:
                    </span>
                    <div className="flex gap-2">
                      {item.videoIds.map((vId, vIdx) => (
                        <button
                          key={vIdx}
                          onClick={() => setShowVideoModal(true)}
                          className="border-primary/30 bg-primary/5 text-primary hover:bg-primary flex items-center gap-2 rounded-sm border px-4 py-2 text-[10px] font-black tracking-widest uppercase transition-all hover:text-slate-900"
                        >
                          <Play size={14} fill="currentColor" />
                          Lección {vIdx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Botón Volver al final */}
      <div className="mt-8 text-center">
        <Link
          href="/estancias"
          className="bg-primary/10 text-primary hover:bg-primary border-primary/20 inline-flex items-center gap-3 rounded-lg border px-6 py-3 text-xs font-black tracking-widest uppercase shadow-md transition-all hover:text-slate-900"
        >
          <ArrowLeft size={14} />
          Volver a estancias
        </Link>
      </div>

      {/* Modal de Aviso de Vídeo */}
      {showVideoModal && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 backdrop-blur-md duration-300">
          <div className="border-primary/30 shadow-primary/20 animate-in zoom-in-95 relative w-full max-w-md overflow-hidden rounded-xl border bg-slate-950 p-8 shadow-2xl duration-300">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-6 right-6 text-slate-500 transition-colors hover:text-white"
            >
              <X size={24} />
            </button>

            <div className="bg-primary/10 text-primary mb-6 flex h-16 w-16 items-center justify-center rounded-xl">
              <Play size={32} fill="currentColor" />
            </div>

            <h3 className="mb-3 text-xl font-black tracking-tight text-white uppercase">
              Contenido en <span className="text-primary">Producción</span>
            </h3>
            <p className="text-text-muted mb-8 text-sm leading-relaxed">
              Próximamente se enlazará este botón directamente con los vídeos de
              las{" "}
              <span className="decoration-primary font-bold text-white underline">
                formaciones técnicas
              </span>
              . Estamos preparando el material didáctico más completo del
              sector.
            </p>

            <button
              onClick={() => setShowVideoModal(false)}
              className="bg-primary w-full rounded-lg py-3 text-xs font-black tracking-widest text-slate-900 uppercase shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
