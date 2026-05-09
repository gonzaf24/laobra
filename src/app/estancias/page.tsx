import Link from "next/link";
import {
  Info,
  ChevronRight,
} from "lucide-react";
import { ESTANCIAS_DATA } from "@/lib/estancias-data";

export default function EstanciasPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8 pb-32">
      <header className="mb-10 text-center md:text-left">
        <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="mb-4 text-4xl leading-none font-black tracking-tighter uppercase md:text-5xl">
              Guía por <span className="text-primary">Estancia</span>
            </h2>
            <p className="text-text-muted max-w-lg text-base italic">
              &quot;Explicado paso a paso para que lo entiendas a la
              primera.&quot;
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
              <span className="font-bold text-amber-500 not-italic">
                AVISO:
              </span>{" "}
              Estamos preparando la biblioteca didáctica de formación técnica.
              Muy pronto tendrás acceso a todos los vídeos y consejos
              profesionales para trabajar con máxima eficiencia.
            </span>
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {ESTANCIAS_DATA.map((estancia) => (
          <Link
            key={estancia.id}
            href={`/estancias/${estancia.id}`}
            className={`group relative flex items-center gap-4 overflow-hidden rounded-3xl border border-slate-800 bg-linear-to-br ${estancia.bgGradient} p-5 shadow-lg transition-all duration-300 hover:border-primary/40 hover:shadow-primary/5 hover:-translate-y-0.5`}
          >
            {/* Background icon */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.04] transition-opacity group-hover:opacity-10">
              <estancia.icon size={100} />
            </div>

            <div className="relative z-10 flex w-full items-center gap-4">
              <div
                className={`shrink-0 rounded-2xl border border-white/10 bg-slate-800/80 p-3.5 ${estancia.color} shadow-xl transition-transform group-hover:scale-110`}
              >
                <estancia.icon size={26} strokeWidth={2.5} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-black tracking-tight text-white uppercase italic md:text-xl">
                  {estancia.name}
                </h3>
                <p className="text-text-muted mt-0.5 text-xs leading-snug">
                  {estancia.description}
                </p>
                <p className="text-primary mt-1.5 text-[10px] font-bold tracking-widest uppercase">
                  {estancia.items.length} {estancia.items.length === 1 ? 'zona' : 'zonas'} de actuación
                </p>
              </div>

              <div className="bg-primary/10 text-primary shrink-0 rounded-full p-2 transition-all group-hover:bg-primary group-hover:text-slate-900">
                <ChevronRight size={20} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
