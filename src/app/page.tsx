import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
import {
  ChevronRight,
  Home as HomeIcon,
  PlayCircle,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="px-6 py-8">
      <section className="mb-10">
        <h1 className="mb-2 text-4xl font-black tracking-tighter uppercase">
          LA OBRA
        </h1>
        <p className="text-text-muted italic">
          Plataforma de capacitación técnica para profesionales.
        </p>
      </section>

      {/* Acceso Rápido por Estancia */}
      <section className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <HomeIcon className="text-primary" size={20} />
          <h2 className="text-xl font-black tracking-widest text-slate-400 uppercase">
            ¿Dónde estás trabajando?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/estancias"
            className="card-obra from-primary/10 group border-primary/20 flex items-center justify-between bg-linear-to-br to-transparent p-6"
          >
            <div className="pr-4">
              <h3 className="mb-1 text-2xl font-black text-white">
                GUÍA POR ESTANCIA
              </h3>
              <p className="text-text-muted text-sm leading-snug">
                Materiales exactos para cada cuarto.
              </p>
            </div>
            <div className="bg-primary shrink-0 rounded-full p-3 text-slate-900 transition-transform group-hover:scale-110">
              <ArrowRight size={24} />
            </div>
          </Link>
          <Link
            href="/herramientas"
            className="card-obra from-amber-500/10 group border-amber-500/20 flex items-center justify-between bg-linear-to-br to-transparent p-6"
          >
            <div className="pr-4">
              <h3 className="mb-1 text-2xl font-black text-white">
                HERRAMIENTAS
              </h3>
              <p className="text-text-muted text-sm leading-snug">
                El utillaje pro para cada gremio.
              </p>
            </div>
            <div className="bg-amber-500 shrink-0 rounded-full p-3 text-slate-900 transition-transform group-hover:scale-110">
              <ArrowRight size={24} />
            </div>
          </Link>
        </div>
      </section>

      {/* Formación Técnica */}
      <section>
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <PlayCircle className="text-primary" size={20} />
            <h2 className="text-xl font-black tracking-widest text-slate-400 uppercase">
              Formación por Gremios
            </h2>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
            <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Próximamente: Biblioteca completa</p>
          </div>
        </div>
        
        <div className="mb-8 p-4 bg-slate-900/50 border border-slate-800 rounded-2xl">
          <p className="text-[11px] text-text-muted italic leading-relaxed">
            <span className="text-amber-500 font-bold not-italic">⚠️ NOTA:</span> Estamos preparando la biblioteca didáctica de formación técnica más completa del sector. Muy pronto tendrás acceso a todos los vídeos y consejos profesionales para trabajar con máxima eficiencia.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/formacion/${cat.id}`}
              className={`card-obra group relative overflow-hidden bg-linear-to-br ${cat.color}`}
            >
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <div className="mb-2 w-fit rounded-lg bg-white/10 p-2">
                    <cat.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-black tracking-tight uppercase">
                    {cat.name}
                  </h3>
                  <p className="text-text-muted max-w-[200px] text-xs leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="bg-primary/10 group-hover:bg-primary rounded-full p-2 transition-all duration-300 group-hover:text-slate-900">
                  <ChevronRight size={20} />
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute -right-4 -bottom-4 opacity-10 transition-opacity group-hover:opacity-20">
                <cat.icon size={120} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
