import { Layers } from "lucide-react";

export function GestionHeader() {
  return (
    <section className="mb-8">
      <div className="mb-2 flex items-center gap-2">
        <Layers className="text-amber-500" size={24} />
        <span className="text-[10px] font-black tracking-[0.2em] text-amber-500 uppercase">
          Administración de Proyectos
        </span>
      </div>
      <h2 className="mb-2 text-3xl font-black tracking-tight text-white uppercase italic">
        Gestión de <span className="text-amber-500">Obras</span>
      </h2>
      <p className="text-text-muted text-sm italic">
        Crea y administra tus proyectos de reforma desde un solo lugar.
      </p>
    </section>
  );
}
