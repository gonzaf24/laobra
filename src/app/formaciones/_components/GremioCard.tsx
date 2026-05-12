import Link from "next/link";
import { Play, ChevronRight } from "lucide-react";

import { FormacionGremio } from "@/lib/formaciones-data";

interface GremioCardProps {
  gremio: FormacionGremio;
}

export function GremioCard({ gremio }: GremioCardProps) {
  return (
    <Link
      href={`/formacion/${gremio.id}`}
      className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-linear-to-br ${gremio.bgGradient} p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1`}
    >
      {/* Decoración fondo */}
      <div className="absolute -right-4 -top-4 opacity-[0.03] transition-opacity group-hover:opacity-[0.08]">
        <gremio.icon size={120} />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className={`mb-4 inline-flex self-start rounded-xl border border-white/10 bg-slate-800/80 p-3 ${gremio.color} shadow-xl transition-transform group-hover:scale-110`}>
          <gremio.icon size={24} strokeWidth={2.5} />
        </div>

        <h3 className="mb-2 text-lg font-black italic leading-tight tracking-tight text-white uppercase">
          {gremio.name}
        </h3>

        <p className="text-text-muted mb-6 flex-1 text-xs leading-relaxed">
          {gremio.description}
        </p>

        <div className="mt-auto border-t border-white/5 pt-4 flex items-center justify-between">
          <span className="text-primary flex items-center gap-1.5 text-[9px] font-black tracking-widest uppercase">
            <Play size={10} fill="currentColor" /> Ver Módulos
          </span>
          <div className="text-slate-600 transition-colors group-hover:text-primary">
            <ChevronRight size={18} />
          </div>
        </div>
      </div>
    </Link>
  );
}
