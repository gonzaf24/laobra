import Link from "next/link";
import {
  Home as HomeIcon,
  ArrowRight,
  GraduationCap,
  Layout,
  Box,
  Hammer,
  HelpCircle,
  Zap,
  Calculator
} from "lucide-react";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 pb-24">
      {/* Cabecera Principal */}
      <section className="mb-8">
        <h1 className="mb-1 text-3xl font-black tracking-tighter uppercase md:text-4xl">
          LA <span className="text-primary">OBRA</span>
        </h1>
        <p className="text-text-muted max-w-md text-xs italic leading-relaxed">
          Plataforma de consulta y capacitación técnica para asegurar que cada metro cuadrado se ejecute con estándares profesionales.
        </p>
      </section>

      {/* Panel de Módulos */}
      <section className="mb-10">
        <div className="mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
          <HomeIcon className="text-primary" size={16} />
          <h2 className="text-sm font-black tracking-widest text-slate-400 uppercase">
            Módulos del Sistema
          </h2>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          
          {/* 1. Formación */}
          <Link
            href="/formaciones"
            className="group border-primary/20 from-primary/5 hover:border-primary/40 relative overflow-hidden rounded-xl border bg-linear-to-br to-slate-900 p-5 shadow-lg transition-all hover:-translate-y-0.5"
          >
            <div className="relative z-10">
              <div className="mb-3 flex items-center gap-3">
                <div className="bg-primary rounded-lg p-2 text-slate-900 shadow-sm">
                  <GraduationCap size={18} />
                </div>
                <h3 className="text-lg font-black text-white uppercase italic tracking-tight">
                  Academia Técnica
                </h3>
              </div>
              
              <div className="space-y-3 mt-4 border-t border-white/5 pt-3">
                <div>
                  <p className="flex items-center gap-1.5 text-[9px] font-black text-primary uppercase tracking-widest mb-1">
                    <HelpCircle size={10} /> ¿Qué encontrarás?
                  </p>
                  <p className="text-text-muted text-[11px] leading-relaxed">
                    Videotutoriales y lecciones teóricas separadas por gremio (Albañilería, Pladur, Alicatado, Instalaciones).
                  </p>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-[9px] font-black text-primary uppercase tracking-widest mb-1">
                    <Zap size={10} /> ¿Para qué sirve?
                  </p>
                  <p className="text-text-muted text-[11px] leading-relaxed">
                    Para aprender a ejecutar tareas desde cero, aplicando la técnica, los tiempos y los trucos de un Oficial de Primera.
                  </p>
                </div>
              </div>
            </div>
            <ArrowRight className="text-primary absolute top-6 right-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" size={18} />
          </Link>

          {/* 2. Guía por Estancia */}
          <Link
            href="/estancias"
            className="group border-blue-500/20 from-blue-500/5 hover:border-blue-500/40 relative overflow-hidden rounded-xl border bg-linear-to-br to-slate-900 p-5 shadow-lg transition-all hover:-translate-y-0.5"
          >
            <div className="relative z-10">
              <div className="mb-3 flex items-center gap-3">
                <div className="bg-blue-500 rounded-lg p-2 text-slate-900 shadow-sm">
                  <Layout size={18} />
                </div>
                <h3 className="text-lg font-black text-white uppercase italic tracking-tight">
                  Guía por Estancia
                </h3>
              </div>
              
              <div className="space-y-3 mt-4 border-t border-white/5 pt-3">
                <div>
                  <p className="flex items-center gap-1.5 text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">
                    <HelpCircle size={10} /> ¿Qué encontrarás?
                  </p>
                  <p className="text-text-muted text-[11px] leading-relaxed">
                    Un mapa interactivo de la vivienda (Baños, Cocinas, Terrazas) dividido en zonas críticas de actuación.
                  </p>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">
                    <Zap size={10} /> ¿Para qué sirve?
                  </p>
                  <p className="text-text-muted text-[11px] leading-relaxed">
                    Para saber qué solución constructiva aplicar en cada entorno, evitando errores graves (como usar yeso en áreas húmedas).
                  </p>
                </div>
              </div>
            </div>
            <ArrowRight className="text-blue-400 absolute top-6 right-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" size={18} />
          </Link>

          {/* 3. Materiales */}
          <Link
            href="/materiales"
            className="group border-emerald-500/20 from-emerald-500/5 hover:border-emerald-500/40 relative overflow-hidden rounded-xl border bg-linear-to-br to-slate-900 p-5 shadow-lg transition-all hover:-translate-y-0.5"
          >
            <div className="relative z-10">
              <div className="mb-3 flex items-center gap-3">
                <div className="bg-emerald-500 rounded-lg p-2 text-slate-900 shadow-sm">
                  <Box size={18} />
                </div>
                <h3 className="text-lg font-black text-white uppercase italic tracking-tight">
                  Ref. Materiales
                </h3>
              </div>
              
              <div className="space-y-3 mt-4 border-t border-white/5 pt-3">
                <div>
                  <p className="flex items-center gap-1.5 text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">
                    <HelpCircle size={10} /> ¿Qué encontrarás?
                  </p>
                  <p className="text-text-muted text-[11px] leading-relaxed">
                    Fichas técnicas ultracompactas de productos de construcción (Morteros, Adhesivos, Aislamientos).
                  </p>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">
                    <Zap size={10} /> ¿Para qué sirve?
                  </p>
                  <p className="text-text-muted text-[11px] leading-relaxed">
                    Para consultar a pie de obra la dosificación de agua exacta, el tipo de mezcla y el tiempo de secado de cada producto.
                  </p>
                </div>
              </div>
            </div>
            <ArrowRight className="text-emerald-400 absolute top-6 right-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" size={18} />
          </Link>

          {/* 4. Herramientas */}
          <Link
            href="/herramientas"
            className="group border-amber-500/20 from-amber-500/5 hover:border-amber-500/40 relative overflow-hidden rounded-xl border bg-linear-to-br to-slate-900 p-5 shadow-lg transition-all hover:-translate-y-0.5"
          >
            <div className="relative z-10">
              <div className="mb-3 flex items-center gap-3">
                <div className="bg-amber-500 rounded-lg p-2 text-slate-900 shadow-sm">
                  <Hammer size={18} />
                </div>
                <h3 className="text-lg font-black text-white uppercase italic tracking-tight">
                  Herramientas
                </h3>
              </div>
              
              <div className="space-y-3 mt-4 border-t border-white/5 pt-3">
                <div>
                  <p className="flex items-center gap-1.5 text-[9px] font-black text-amber-500 uppercase tracking-widest mb-1">
                    <HelpCircle size={10} /> ¿Qué encontrarás?
                  </p>
                  <p className="text-text-muted text-[11px] leading-relaxed">
                    El inventario de maquinaria pesada, herramientas de mano y EPIs (Equipos de Protección).
                  </p>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-[9px] font-black text-amber-500 uppercase tracking-widest mb-1">
                    <Zap size={10} /> ¿Para qué sirve?
                  </p>
                  <p className="text-text-muted text-[11px] leading-relaxed">
                    Para verificar que cuentas con el utillaje necesario antes de arrancar una tarea, ahorrando viajes y tiempo perdido.
                  </p>
                </div>
              </div>
            </div>
            <ArrowRight className="text-amber-500 absolute top-6 right-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" size={18} />
          </Link>
          {/* 5. Cálculos */}
          <Link
            href="/calculos"
            className="group border-violet-500/20 from-violet-500/5 hover:border-violet-500/40 relative overflow-hidden rounded-xl border bg-linear-to-br to-slate-900 p-5 shadow-lg transition-all hover:-translate-y-0.5 md:col-span-2 lg:col-span-1"
          >
            <div className="relative z-10">
              <div className="mb-3 flex items-center gap-3">
                <div className="bg-violet-500 rounded-lg p-2 text-slate-900 shadow-sm">
                  <Calculator size={18} />
                </div>
                <h3 className="text-lg font-black text-white uppercase italic tracking-tight">
                  Cálculos de Obra
                </h3>
              </div>
              
              <div className="space-y-3 mt-4 border-t border-white/5 pt-3">
                <div>
                  <p className="flex items-center gap-1.5 text-[9px] font-black text-violet-400 uppercase tracking-widest mb-1">
                    <HelpCircle size={10} /> ¿Qué encontrarás?
                  </p>
                  <p className="text-text-muted text-[11px] leading-relaxed">
                    Herramientas para calcular sacos de cemento, botes de agua, m² de suelo y kilos de borada.
                  </p>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-[9px] font-black text-violet-400 uppercase tracking-widest mb-1">
                    <Zap size={10} /> ¿Para qué sirve?
                  </p>
                  <p className="text-text-muted text-[11px] leading-relaxed">
                    Para comprar el material exacto, evitando desperdicios de presupuesto y viajes extra al almacén.
                  </p>
                </div>
              </div>
            </div>
            <ArrowRight className="text-violet-400 absolute top-6 right-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" size={18} />
          </Link>
        </div>
      </section>

      {/* Info Pie de Obra */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/30 p-4 text-center backdrop-blur-sm">
        <p className="text-text-muted text-[10px] leading-relaxed italic tracking-wide">
          &quot;No importa la reforma; lo que importa es usar el producto adecuado, en la proporción correcta, con la herramienta perfecta.&quot;
        </p>
      </section>
    </div>
  );
}
