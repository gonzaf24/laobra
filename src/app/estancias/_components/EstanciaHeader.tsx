import { Info } from "lucide-react";

export function EstanciaHeader() {
  return (
    <header className="mb-10 text-center md:text-left">
      <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 className="mb-4 text-4xl font-black leading-none tracking-tighter uppercase md:text-5xl">
            Guía por <span className="text-primary">Estancia</span>
          </h2>
          <p className="text-text-muted max-w-lg text-base italic">
            &quot;Explicado paso a paso para que lo entiendas a la primera.&quot;
          </p>
        </div>
        <div className="flex items-center gap-3 self-start rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 md:self-auto">
          <div className="h-2 w-2 animate-pulse rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
          <p className="text-xs font-black tracking-widest text-amber-500 uppercase">
            Vídeos en preparación
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-inner backdrop-blur-sm">
        <p className="text-text-muted flex items-center gap-3 text-xs leading-relaxed italic">
          <Info size={18} className="shrink-0 text-amber-500" />
          <span>
            <span className="not-italic font-bold text-amber-500">AVISO:</span>{" "}
            Estamos preparando la biblioteca didáctica de formación técnica.
            Muy pronto tendrás acceso a todos los vídeos y consejos
            profesionales para trabajar con máxima eficiencia.
          </span>
        </p>
      </div>
    </header>
  );
}
