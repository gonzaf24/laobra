"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Play,
  ArrowLeft,
  X,
  Info,
  Clock,
  BookOpen,
  Award,
} from "lucide-react";
import { FORMACIONES_DATA } from "@/lib/formaciones-data";

export default function FormacionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [showVideoModal, setShowVideoModal] = useState(false);

  const formacion = FORMACIONES_DATA.find((f) => f.id === id);

  if (!formacion) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-12 text-center">
        <h2 className="mb-4 text-3xl font-black text-white uppercase">
          Formación no encontrada
        </h2>
        <Link
          href="/formaciones"
          className="text-primary flex items-center gap-2 font-bold transition-colors hover:text-white"
        >
          <ArrowLeft size={18} />
          Volver a academia
        </Link>
      </div>
    );
  }

  const IconComponent = formacion.icon;

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 pb-24">
      {/* Botón Volver */}
      <Link
        href="/formaciones"
        className="text-text-muted hover:text-primary mb-6 inline-flex items-center gap-2 text-xs font-bold transition-colors"
      >
        <ArrowLeft size={14} />
        Volver a academia
      </Link>

      {/* Cabecera */}
      <header className="mb-8">
        <div className="mb-6 flex items-center gap-4">
          <div className={`rounded-xl p-4 ${formacion.color} bg-slate-900 border border-white/10 shadow-xl`}>
            <IconComponent size={32} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-white uppercase italic md:text-3xl">
              {formacion.name}
            </h2>
            <p className="text-text-muted mt-1 text-sm">
              {formacion.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <div className="rounded-md border border-slate-800 bg-slate-900/60 p-3 text-center">
            <Clock className="text-primary mx-auto mb-1" size={16} />
            <p className="text-[10px] font-black text-white uppercase tracking-tighter">{formacion.lecciones.length} Lecciones</p>
          </div>
          <div className="rounded-md border border-slate-800 bg-slate-900/60 p-3 text-center">
            <BookOpen className="text-blue-400 mx-auto mb-1" size={16} />
            <p className="text-[10px] font-black text-white uppercase tracking-tighter">Formación Pro</p>
          </div>
          <div className="rounded-md border border-slate-800 bg-slate-900/60 p-3 text-center">
            <Award className="text-emerald-400 mx-auto mb-1" size={16} />
            <p className="text-[10px] font-black text-white uppercase tracking-tighter">Certificado</p>
          </div>
        </div>
      </header>

      {/* Cuadrícula de Lecciones (Estilo Vídeo) */}
      <div className="space-y-4">
        <h3 className="text-primary text-[10px] font-black tracking-widest uppercase mb-4">Módulos del curso:</h3>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {formacion.lecciones.map((leccion) => (
            <div
              key={leccion.id}
              onClick={() => setShowVideoModal(true)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 cursor-pointer transition-all hover:border-slate-700 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative aspect-video bg-slate-800">
                <div className="absolute inset-0 bg-slate-900">
                  <img
                    src="/video_placeholder.png"
                    alt={leccion.title}
                    className="h-full w-full object-cover opacity-40 transition-opacity duration-300 group-hover:opacity-60 grayscale group-hover:grayscale-0"
                    onError={(e) => {
                      // Fallback por si la imagen no existe
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/20">
                  <Play size={48} className="text-white opacity-80 transition-transform group-hover:scale-110" fill="currentColor" />
                </div>
                <div className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                  {leccion.duration || "12:30"}
                </div>
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <div className="bg-amber-500/90 rounded-md px-2 py-1 text-[9px] font-black tracking-wider text-slate-900 uppercase shadow-lg backdrop-blur-sm border border-white/20">
                    Próximamente: Vídeo Real
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-5 flex-1">
                <h4 className="mb-2 text-lg font-black tracking-tight text-white uppercase italic">
                  {leccion.title}
                </h4>
                <p className="text-text-muted text-xs leading-relaxed flex-1">
                  {leccion.description}
                </p>
              </div>
            </div>
          ))}
        </div>
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
              Estamos preparando la biblioteca didáctica de formación técnica más completa del sector. Muy pronto tendrás acceso a todos los vídeos y consejos profesionales para trabajar con máxima eficiencia.
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
