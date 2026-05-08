import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
import { ChevronRight, Play, Home as HomeIcon, PlayCircle, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="px-6 py-8">
      <section className="mb-10">
        <h1 className="text-4xl font-black mb-2 tracking-tighter uppercase">LA OBRA</h1>
        <p className="text-text-muted italic">Plataforma de capacitación técnica para profesionales.</p>
      </section>

      {/* Acceso Rápido por Estancia */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <HomeIcon className="text-primary" size={20} />
          <h2 className="text-xl font-black uppercase tracking-widest text-slate-400">¿Dónde estás trabajando?</h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Link 
            href="/estancias" 
            className="card-obra p-6 bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-between group border-primary/20"
          >
            <div className="pr-4">
              <h3 className="text-2xl font-black text-white mb-1">GUÍA POR ESTANCIA</h3>
              <p className="text-sm text-text-muted leading-snug">Qué materiales necesitas exactamente para Baños, Cocinas o Salón.</p>
            </div>
            <div className="bg-primary text-slate-900 p-3 rounded-full group-hover:scale-110 transition-transform flex-shrink-0">
              <ArrowRight size={24} />
            </div>
          </Link>
        </div>
      </section>

      {/* Formación Técnica */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <PlayCircle className="text-primary" size={20} />
          <h2 className="text-xl font-black uppercase tracking-widest text-slate-400">Formación por Gremios</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/formacion/${cat.id}`}
              className={`card-obra relative overflow-hidden group bg-gradient-to-br ${cat.color}`}
            >
              <div className="flex items-start justify-between relative z-10">
                <div className="flex flex-col gap-1">
                  <div className="bg-white/10 w-fit p-2 rounded-lg mb-2">
                    <cat.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight">{cat.name}</h3>
                  <p className="text-xs text-text-muted max-w-[200px] leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary group-hover:text-slate-900 transition-all duration-300">
                  <ChevronRight size={20} />
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <cat.icon size={120} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
