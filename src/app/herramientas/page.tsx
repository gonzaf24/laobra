import { TOOLS } from "@/lib/data";
import { Search, Hammer, Info, PlayCircle } from "lucide-react";

export default function ToolsPage() {
  return (
    <div className="px-6 py-8">
      <section className="mb-8">
        <h2 className="text-3xl font-black mb-2 text-gradient">Herramientas</h2>
        <p className="text-text-muted">
          Catálogo de herramientas, nombres técnicos y cómo usarlas correctamente.
        </p>
      </section>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
        <input 
          type="text" 
          placeholder="Buscar herramienta..." 
          className="w-full bg-surface border border-slate-700 rounded-xl py-3 pl-12 pr-4 focus:border-primary outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {TOOLS.map((tool) => (
          <div key={tool.id} className="card-obra p-3 flex flex-col gap-3">
            <div className="aspect-square rounded-lg bg-slate-700/50 flex items-center justify-center overflow-hidden">
               {/* Using an icon if no image provided */}
               <Hammer size={48} className="text-slate-500 opacity-50" />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1">{tool.name}</h3>
              <div className="flex flex-col gap-2 mt-2">
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider bg-slate-700 py-2 px-3 rounded-lg hover:bg-slate-600 transition-colors">
                  <Info size={14} className="text-primary" />
                  Info
                </button>
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary py-2 px-3 rounded-lg hover:bg-primary/20 transition-colors border border-primary/20">
                  <PlayCircle size={14} />
                  Video
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-10 p-6 bg-primary/5 rounded-2xl border border-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary p-2 rounded-lg text-slate-900">
            <Hammer size={20} />
          </div>
          <h3 className="font-bold">¿Falta alguna?</h3>
        </div>
        <p className="text-sm text-text-muted mb-4">
          Si hay una herramienta nueva en la obra que no aparece aquí, avísale al jefe de obra para que suba el video.
        </p>
        <button className="text-primary font-bold text-sm">Notificar herramienta nueva &rarr;</button>
      </section>
    </div>
  );
}
