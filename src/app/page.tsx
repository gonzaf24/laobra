import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
import { ChevronRight, Play } from "lucide-react";

export default function Home() {
  return (
    <div className="px-6 py-8">
      <section className="mb-10">
        <h2 className="text-3xl font-black mb-2 text-gradient">
          Formación Profesional
        </h2>
        <p className="text-text-muted">
          Aprende las mejores técnicas directamente de los oficiales de primera.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4">
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
                <h3 className="text-xl font-bold">{cat.name}</h3>
                <p className="text-sm text-text-muted max-w-[200px]">
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

      <section className="mt-12 mb-8 bg-surface border border-primary/20 rounded-2xl p-6 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">Novedades Semanales</h3>
          <p className="text-sm text-text-muted mb-4">
            Nuevo video: &quot;Cómo instalar un plato de ducha de resina paso a paso&quot;.
          </p>
          <button className="btn-primary w-full sm:w-auto">
            <Play size={18} fill="currentColor" />
            Ver último video
          </button>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      </section>
    </div>
  );
}
