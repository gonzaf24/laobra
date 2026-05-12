import { GraduationCap, Info } from "lucide-react";

export function AcademiaHeader() {
  return (
    <header className="mb-10">
      <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <GraduationCap className="text-primary" size={24} />
            <span className="text-primary text-[10px] font-black tracking-[0.2em] uppercase">
              Academia Técnica
            </span>
          </div>
          <h2 className="mb-4 text-4xl font-black leading-none tracking-tighter uppercase md:text-5xl">
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
          <Info size={24} className="mt-0.5 shrink-0 text-amber-500" />
          <span>
            <span className="mb-1 block font-bold text-amber-500">
              NOTA IMPORTANTE:
            </span>{" "}
            Estamos preparando la biblioteca completa de formación técnica. Muy pronto tendrás acceso a todos los vídeos paso a paso y consejos profesionales de oficiales de primera.
          </span>
        </p>
      </div>
    </header>
  );
}
