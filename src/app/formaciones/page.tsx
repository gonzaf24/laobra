import { FORMACIONES_DATA } from "@/lib/formaciones-data";
import { Info, Play, ChevronRight, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function FormacionesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8 pb-32">
      <header className="mb-10">
        <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="text-primary" size={24} />
              <span className="text-primary text-[10px] font-black tracking-[0.2em] uppercase">Academia Técnica</span>
            </div>
            <h2 className="mb-4 text-4xl leading-none font-black tracking-tighter uppercase md:text-5xl">
              Formación por <span className="text-primary">Gremios</span>
            </h2>
            <p className="text-text-muted max-w-lg text-base italic">
              &quot;La biblioteca didáctica más completa del sector para trabajar con máxima eficiencia.&quot;
            </p>
          </div>
          
          <div className="flex items-center gap-3 self-start rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 md:self-auto">
            <div className="h-2 w-2 animate-pulse rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
            <p className="text-xs font-black tracking-widest text-amber-500 uppercase">
              Biblioteca en preparación
            </p>
          </div>
        </div>

        {/* Aviso Importante */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 shadow-inner backdrop-blur-sm">
          <p className="text-text-muted flex items-start gap-4 text-sm leading-relaxed">
            <Info size={24} className="shrink-0 text-amber-500 mt-0.5" />
            <span>
              <span className="font-bold text-amber-500 block mb-1">
                NOTA IMPORTANTE:
              </span>{" "}
              Estamos preparando la biblioteca completa de formación técnica. Muy pronto tendrás acceso a todos los vídeos paso a paso y consejos profesionales de oficiales de primera.
            </span>
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FORMACIONES_DATA.map((gremio) => (
          <Link
            key={gremio.id}
            href={`/formacion/${gremio.id}`}
            className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-linear-to-br ${gremio.bgGradient} p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1`}
          >
            {/* Decoración fondo */}
            <div className="absolute -right-4 -top-4 opacity-[0.03] transition-opacity group-hover:opacity-[0.08]">
              <gremio.icon size={120} />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className={`mb-4 inline-flex rounded-xl border border-white/10 bg-slate-800/80 p-3 ${gremio.color} shadow-xl transition-transform group-hover:scale-110 self-start`}>
                <gremio.icon size={24} strokeWidth={2.5} />
              </div>

              <h3 className="mb-2 text-lg font-black tracking-tight text-white uppercase italic leading-tight">
                {gremio.name}
              </h3>
              
              <p className="text-text-muted mb-6 text-xs leading-relaxed flex-1">
                {gremio.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className="text-[9px] font-black tracking-widest text-primary uppercase flex items-center gap-1.5">
                  <Play size={10} fill="currentColor" /> Ver Módulos
                </span>
                <div className="text-slate-600 transition-colors group-hover:text-primary">
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
