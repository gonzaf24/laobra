"use client";

import {
  ShieldCheck,
  Target,
  Clock,
  TrendingUp,
  FileText,
  CheckCircle2,
  GraduationCap,
  Hammer,
  Lightbulb,
  Shield,
} from "lucide-react";

export default function PropuestaPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 pb-32">
      {/* Header */}
      <div className="mb-16 text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-amber-500/10 p-4 text-amber-500">
          <ShieldCheck size={48} strokeWidth={1.5} />
        </div>
        <h1 className="mb-4 text-4xl font-black tracking-tight text-white uppercase italic">
          Arquitecto <span className="text-amber-500">Valor</span>
        </h1>
        <p className="text-lg text-slate-400">
          La digitalización inteligente para el profesional de las reformas.
        </p>
      </div>

      {/* Introducción */}
      <section className="mb-20">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 md:p-12">
          <h2 className="mb-6 text-2xl font-black text-white uppercase italic">
            ¿Por qué este aplicativo?
          </h2>
          <div className="space-y-4 leading-relaxed text-slate-300">
            <p>
              <b className="text-white">Arquitecto</b> nace para resolver el
              caos documental y la falta de previsión en las obras de reforma.
              La industria de la construcción sufre constantes desviaciones de
              presupuesto y retrasos por falta de una comunicación clara entre
              la oficina y el operario.
            </p>
            <p>
              Esta herramienta unifica el criterio técnico, eliminando la
              improvisación y garantizando que cada decisión tomada en el
              proyecto esté basada en datos reales de rendimiento y materiales.
            </p>
          </div>
        </div>
      </section>

      {/* Áreas de Gestión Técnica */}
      <section className="mb-20">
        <h2 className="mb-10 text-center text-xs font-black tracking-[0.3em] text-slate-500 uppercase">
          Gestión Técnica de Obra
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              title: "Precisión Técnica",
              desc: "Transforma las mediciones en estancias reales, calculando automáticamente el material necesario sin margen de error humano.",
              icon: Target,
              color: "text-blue-500",
              bg: "bg-blue-500/10",
            },
            {
              title: "Control de Costes",
              desc: "Separa la mano de obra propia de las subcontratas, permitiendo ver el beneficio real en cada partida.",
              icon: TrendingUp,
              color: "text-emerald-500",
              bg: "bg-emerald-500/10",
            },
            {
              title: "Gestión de Tiempos",
              desc: "Traduce los m² en jornadas reales, ofreciendo una fecha de finalización basada en rendimientos históricos, no en suposiciones.",
              icon: Clock,
              color: "text-violet-500",
              bg: "bg-violet-500/10",
            },
            {
              title: "Ejecución Guiada",
              desc: "Genera hojas de ruta por estancia que explican al operario el qué, cómo y por qué de cada tarea, elevando el estándar de calidad.",
              icon: FileText,
              color: "text-amber-500",
              bg: "bg-amber-500/10",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-slate-800 bg-slate-900/20 p-6 transition-all hover:border-slate-700"
            >
              <div
                className={`mb-4 inline-flex rounded-xl ${item.bg} p-3 ${item.color}`}
              >
                <item.icon size={24} />
              </div>
              <h3 className="mb-2 font-black text-white uppercase italic">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Áreas de Formación y Herramientas */}
      <section className="mb-20">
        <h2 className="mb-10 text-center text-xs font-black tracking-[0.3em] text-slate-500 uppercase">
          Capacitación y Activos
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Formación */}
          <div className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
              <GraduationCap size={32} />
            </div>
            <h3 className="mb-4 text-xl font-black text-white uppercase italic">
              Ecosistema de Formación
            </h3>
            <div className="space-y-4 text-sm leading-relaxed text-slate-400">
              <div className="flex gap-3">
                <Lightbulb size={18} className="mt-1 shrink-0 text-amber-400" />
                <p>
                  <b className="text-white">Mentoría Digital</b>: La plataforma
                  no solo gestiona, sino que enseña. El operario puede formarse
                  y resolver dudas técnicas al instante, entendiendo el{" "}
                  <span className="font-bold text-white italic">´por qué´</span>{" "}
                  de cada proceso.
                </p>
              </div>
              <div className="flex gap-3">
                <Shield size={18} className="mt-1 shrink-0 text-emerald-400" />
                <p>
                  <b className="text-white">Nivelación de Equipo</b>: Diseñado
                  para que personal sin experiencia alcance el estándar de la
                  empresa rápidamente, reduciendo la necesidad de supervisión
                  constante y errores de base.
                </p>
              </div>
            </div>
          </div>

          {/* Herramientas */}
          <div className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
              <Hammer size={32} />
            </div>
            <h3 className="mb-4 text-xl font-black text-white uppercase italic">
              Control de Herramientas
            </h3>
            <div className="space-y-4 text-sm leading-relaxed text-slate-400">
              <div className="flex gap-3">
                <CheckCircle2
                  size={18}
                  className="mt-1 shrink-0 text-amber-500"
                />
                <p>
                  <b className="text-white">Inventario de Stock</b>: Seguimiento
                  exhaustivo de cada activo. Sabes qué herramientas tienes, en
                  qué estado están y quién las está utilizando.
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2
                  size={18}
                  className="mt-1 shrink-0 text-amber-500"
                />
                <p>
                  <b className="text-white">Guía de Uso Profesional</b>:
                  Manuales integrados que explican la aplicación recomendada y
                  el mantenimiento preventivo, alargando la vida útil del
                  equipo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="mb-20">
        <h2 className="mb-8 text-2xl font-black text-white uppercase italic">
          Beneficios del Profesional
        </h2>
        <div className="space-y-4">
          {[
            "Eliminación de Incertidumbre: Sabes exactamente qué pedir y cuánto tiempo tardará antes de empezar.",
            "Transparencia Total: Facilita la presentación de presupuestos profesionales y justificados al cliente final.",
            "Reducción de Errores: Centraliza planos y guías técnicas, eliminando malentendidos y rectificaciones costosas.",
            "Escalabilidad: Permite gestionar múltiples obras simultáneamente manteniendo el mismo nivel de control.",
          ].map((benefit, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-2xl border border-slate-800/50 bg-slate-900/40 p-5"
            >
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-amber-500"
              />
              <p className="font-medium text-slate-300">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Conclusión */}
      <div className="rounded-3xl bg-amber-500 p-8 text-black shadow-2xl shadow-amber-500/10 md:p-12">
        <h2 className="mb-4 text-2xl font-black uppercase italic">
          En resumen
        </h2>
        <p className="mb-8 text-lg leading-relaxed font-bold">
          Arquitecto no es solo un visualizador o una calculadora; es el cerebro
          técnico de la obra que garantiza que cada proyecto sea rentable,
          predecible y profesional.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 rounded-full bg-black/10 px-4 py-2 text-xs font-black tracking-wider uppercase">
            ✓ Rentabilidad
          </div>
          <div className="flex items-center gap-2 rounded-full bg-black/10 px-4 py-2 text-xs font-black tracking-wider uppercase">
            ✓ Control
          </div>
          <div className="flex items-center gap-2 rounded-full bg-black/10 px-4 py-2 text-xs font-black tracking-wider uppercase">
            ✓ Profesionalidad
          </div>
        </div>
      </div>
    </div>
  );
}
