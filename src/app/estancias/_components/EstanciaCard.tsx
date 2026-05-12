import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Estancia } from "@/lib/estancias-data";

interface EstanciaCardProps {
  estancia: Estancia;
}

export function EstanciaCard({ estancia }: EstanciaCardProps) {
  return (
    <Link
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
          <h3 className="text-lg font-black italic tracking-tight text-white uppercase md:text-xl">
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
  );
}
