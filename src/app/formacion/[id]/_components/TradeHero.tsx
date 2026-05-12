import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { FormacionGremio } from "@/lib/formaciones-data";

interface TradeHeroProps {
  formacion: FormacionGremio;
}

export function TradeHero({ formacion }: TradeHeroProps) {
  const IconComponent = formacion.icon;

  return (
    <>
      <Link
        href="/formaciones"
        className="text-text-muted hover:text-primary mb-6 inline-flex items-center gap-2 text-xs font-bold transition-colors"
      >
        <ArrowLeft size={14} />
        Volver a academia
      </Link>

      <header className="mb-8">
        <div className="mb-6 flex items-center gap-4">
          <div className={`rounded-xl p-4 ${formacion.color} border border-white/10 bg-slate-900 shadow-xl`}>
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
      </header>
    </>
  );
}
