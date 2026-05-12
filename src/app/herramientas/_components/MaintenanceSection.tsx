import { Info, Wrench } from "lucide-react";

export function MaintenanceSection() {
  return (
    <section className="from-primary/10 border-primary/20 relative overflow-hidden rounded-3xl border bg-linear-to-br to-slate-900 p-8 text-center shadow-2xl">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Wrench size={120} />
      </div>
      <div className="relative z-10">
        <Info size={32} className="text-primary mx-auto mb-4" />
        <h3 className="mb-2 text-2xl font-black tracking-tighter text-white uppercase">
          Mantenimiento Pro
        </h3>
        <p className="text-text-muted mx-auto mb-6 max-w-md text-sm">
          Limpia tus herramientas al terminar el día. El cemento seco en una
          paleta es el primer paso para un mal acabado mañana.
        </p>
        <div className="inline-block rounded-2xl border border-white/5 bg-black/40 p-4">
          <p className="text-primary text-xs font-black tracking-[0.2em] uppercase">
            ⚙️ Herramienta limpia = Trabajo rápido
          </p>
        </div>
      </div>
    </section>
  );
}
