export function ToolHeader() {
  return (
    <>
      <header className="mb-8">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-black tracking-tighter uppercase">
            Diccionario de Herramientas
          </h2>
          <div className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 flex items-center gap-2">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500"></div>
            <p className="text-[10px] font-black tracking-widest text-amber-500 uppercase">
              Tutoriales próximamente
            </p>
          </div>
        </div>
        <p className="text-text-muted text-sm italic">
          &quot;Un buen oficial se conoce por sus herramientas.&quot;
        </p>
      </header>

      <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
        <p className="text-text-muted text-[11px] leading-relaxed italic">
          <span className="not-italic font-bold text-amber-500">🚀 PRÓXIMAMENTE:</span> Añadiremos tutoriales en vídeo para cada herramienta, mostrando cómo usarlas de forma segura, eficiente y eficaz en la obra real.
        </p>
      </div>
    </>
  );
}
