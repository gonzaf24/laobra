import {
  Home,
  Bath,
  Utensils,
  Sun,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
} from "lucide-react";
import Link from "next/link";

const ESTANCIAS_DATA = [
  {
    id: "salon",
    name: "Sala / Dormitorios",
    icon: Home,
    color: "bg-slate-500/10 text-slate-400",
    description: "Zonas secas: Estética, confort térmico y planimetría.",
    items: [
      {
        area: "Suelos",
        material: "Mortero Autonivelante + C2TE S1",
        tip: "Usa lana de roca en trasdosados para aislar del vecino.",
      },
      {
        area: "Paredes",
        material: "Pladur Blanco (13/15mm) o Yeso",
        tip: "La placa de 15mm da más robustez al tacto.",
      },
      {
        area: "Techos",
        material: "Pladur Blanco estándar",
        tip: "Ideal para focos empotrados y pasar cables fácil.",
      },
    ],
  },
  {
    id: "bano",
    name: "Baños",
    icon: Bath,
    color: "bg-blue-500/10 text-blue-400",
    description: "Zonas húmedas: Resistencia al agua y al vapor.",
    items: [
      {
        area: "Suelos",
        material: "Autonivelante + Membrana Líquida",
        tip: "Impermeabiliza siempre antes de pegar el suelo.",
      },
      {
        area: "Paredes",
        material: "Pladur Verde (H1) + Cemento Cola C2",
        tip: "El C2 es obligatorio por el contacto con agua.",
      },
      {
        area: "Techos",
        material: "Pladur Verde (H1)",
        tip: "Fundamental para resistir el vapor de la ducha.",
      },
    ],
  },
  {
    id: "cocina",
    name: "Cocinas",
    icon: Utensils,
    color: "bg-amber-500/10 text-amber-400",
    description: "Zonas de carga: Humedad y refuerzos estructurales.",
    items: [
      {
        area: "Suelos",
        material: "Autonivelante + C2TE S1",
        tip: "Igual que el baño por resistencia y limpieza.",
      },
      {
        area: "Paredes",
        material: "Pladur Verde + Refuerzos de madera",
        tip: "Pon refuerzos tras la placa para colgar muebles altos.",
      },
      {
        area: "Electricidad",
        material: "Cable de 6mm² (Horno/Vitro)",
        tip: "Indispensable por seguridad y normativa.",
      },
    ],
  },
  {
    id: "terrazas",
    name: "Terrazas / Exterior",
    icon: Sun,
    color: "bg-orange-500/10 text-orange-400",
    description: "Exterior: Resistencia extrema al sol y lluvia.",
    items: [
      {
        area: "Suelos",
        material: "Mortero M-7,5 (Pendientes)",
        tip: "Da inclinación hacia el desagüe para evitar charcos.",
      },
      {
        area: "Adhesivo",
        material: "Cemento Cola C2TE S2",
        tip: "Máxima flexibilidad para aguantar el sol directo.",
      },
      {
        area: "Paredes",
        material: "Mortero Monocapa / Hidrófugo",
        tip: "Protege la estructura de las filtraciones.",
      },
    ],
  },
];

export default function EstanciasPage() {
  return (
    <div className="px-6 py-8 pb-32">
      <header className="mb-8">
        <h2 className="mb-2 text-3xl font-black">Guía por Estancia</h2>
        <p className="text-text-muted italic">
          "Elige dónde estás trabajando para ver los imprescindibles."
        </p>
      </header>

      <div className="space-y-6">
        {ESTANCIAS_DATA.map((estancia) => (
          <div key={estancia.id} className="card-obra overflow-hidden p-0">
            <div className={`flex items-center gap-4 p-4 ${estancia.color}`}>
              <estancia.icon size={32} />
              <div>
                <h3 className="text-xl font-black uppercase">
                  {estancia.name}
                </h3>
                <p className="text-xs opacity-80">{estancia.description}</p>
              </div>
            </div>

            <div className="space-y-4 p-5">
              {estancia.items.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="mt-1">
                    <CheckCircle2 size={16} className="text-primary" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-slate-500 uppercase">
                      {item.area}
                    </span>
                    <p className="mb-1 text-sm font-bold text-white">
                      {item.material}
                    </p>
                    <p className="text-text-muted text-xs leading-relaxed">
                      {item.tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Tabla Comparativa Rápida */}
        <section className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <div className="mb-6 flex items-center gap-2">
            <AlertTriangle size={20} className="text-amber-500" />
            <h3 className="text-lg font-black tracking-tighter uppercase">
              Diferencias Clave
            </h3>
          </div>
          <div className="mb-2 grid grid-cols-3 gap-2 border-b border-slate-800 pb-2 text-center">
            <div className="text-[10px] font-bold text-slate-500 uppercase">
              Elemento
            </div>
            <div className="text-[10px] font-bold text-slate-500 uppercase">
              En Salón
            </div>
            <div className="text-[10px] font-bold text-slate-500 uppercase">
              En Baño
            </div>
          </div>
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-3 gap-2 border-b border-slate-800/50 py-1 italic">
              <div className="font-bold text-slate-400">Pladur</div>
              <div className="text-white">Blanco</div>
              <div className="font-bold text-emerald-400">Verde</div>
            </div>
            <div className="grid grid-cols-3 gap-2 border-b border-slate-800/50 py-1 italic">
              <div className="font-bold text-slate-400">Mortero</div>
              <div className="text-white">M-7,5</div>
              <div className="font-bold text-emerald-400">Hidrófugo</div>
            </div>
            <div className="grid grid-cols-3 gap-2 border-b border-slate-800/50 py-1 italic">
              <div className="font-bold text-slate-400">Cola</div>
              <div className="text-white">C1 / C2</div>
              <div className="font-bold text-emerald-400">C2 Siempre</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
