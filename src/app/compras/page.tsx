import { ShoppingCart, CheckCircle2, Package, Info, AlertTriangle, Lightbulb } from "lucide-react";

const SHOPPING_DATA = [
  {
    category: "Cemento y Ladrillo",
    items: [
      {
        title: "Nivelar Suelos",
        material: "Mortero Autonivelante (Base cementosa)",
        tip: "Si el desnivel es >3cm usa 'Capa Gruesa'. Vital para evitar cejas en el porcelánico.",
        pro: "Weberfloor, Argoniv o similares."
      },
      {
        title: "Nivelar Paredes",
        material: "Mortero Seco M-7,5",
        tip: "Usa siempre cemento en baños y cocinas. El yeso no aguanta bien la humedad tras el azulejo.",
        pro: "Sacos de 25kg ya mezclados."
      },
      {
        title: "Pegar Suelo (Porcelánico)",
        material: "Cemento Cola C2TE S1 (Flexible)",
        tip: "Indispensable para porcelánico. La 'S1' absorbe movimientos y evita que la pieza se suelte.",
        pro: "Pegoland Profesional, Gecol Flexible."
      },
      {
        title: "Pegar Azulejos (Paredes)",
        material: "Cemento Cola C1TE",
        tip: "Solo para cerámica tradicional. Si la pared es porcelánica, usa C2 como en el suelo.",
        pro: "Opción económica para pasta roja/blanca."
      }
    ]
  },
  {
    category: "Yeso y Pladur",
    items: [
      {
        title: "Tabiquería Estándar",
        material: "Placa Blanca (13mm o 15mm)",
        tip: "La de 15mm da más robustez. Usa siempre doble placa si buscas calidad 'maciza'.",
        pro: "Pladur, Knauf o Siniat."
      },
      {
        title: "Baños y Cocinas",
        material: "Placa Verde (H1 - Hidrófuga)",
        tip: "Resistente a humedad. Ojo: Impermeabiliza siempre la zona de ducha sobre la placa.",
        pro: "Evita manchas de moho por condensación."
      },
      {
        title: "Acabado de Juntas",
        material: "Cinta de Papel + Pasta de Juntas",
        tip: "Huye de la malla de fibra (cuadraditos). El estándar de calidad exige cinta de papel para evitar grietas.",
        pro: "Pasta de secado normal o rápido según clima."
      },
      {
        title: "Perfilería y Estructura",
        material: "Montantes (V) y Canales (H)",
        tip: "Acero galvanizado. Pon refuerzos de madera donde vayan muebles de cocina o la TV.",
        pro: "Esqueleto del sistema seco."
      }
    ]
  }
];

export default function ComprasPage() {
  return (
    <div className="px-6 py-8 pb-32">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-amber-500/20 p-2 rounded-lg text-amber-500">
            <ShoppingCart size={24} />
          </div>
          <h2 className="text-3xl font-black">Asistente de Compra</h2>
        </div>
        <p className="text-text-muted italic">"Compra como un experto, evita errores en la obra."</p>
      </header>

      <div className="space-y-12">
        {/* Recomendación Estratégica */}
        <div className="p-6 rounded-2xl bg-slate-800/80 border border-primary/30 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Lightbulb size={80} />
          </div>
          <h3 className="text-primary font-black text-xl mb-3 flex items-center gap-2 uppercase tracking-tighter">
            <Lightbulb size={24} /> 
            Estrategia de Logística
          </h3>
          <p className="text-white font-bold mb-4 leading-snug">
            ¿C1 o C2 para toda la obra?
          </p>
          <div className="space-y-3 text-sm text-text-muted">
            <p>
              Aunque el <span className="text-white font-bold">C2TE S1</span> es más caro, usarlo para <span className="text-white font-bold">TODO</span> elimina errores de la cuadrilla (mezclar sacos) y asegura que nada se suelte en 2 años.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="bg-red-500/10 border border-red-500/20 p-2 rounded">
                <span className="text-red-400 font-bold block text-xs">C1 Básico</span>
                <span className="text-white text-lg">~4€/saco</span>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded">
                <span className="text-emerald-400 font-bold block text-xs">C2 Premium</span>
                <span className="text-white text-lg">~14€/saco</span>
              </div>
            </div>
            <p className="italic text-xs pt-2">"Ahorrar 400€ en cemento puede costar 4.000€ en reparaciones futuras."</p>
          </div>
        </div>

        {SHOPPING_DATA.map((group) => (
          <section key={group.category}>
            <div className="flex items-center gap-2 mb-6 border-b border-slate-700 pb-2">
              <Package size={20} className="text-primary" />
              <h3 className="text-xl font-black uppercase tracking-widest text-slate-300">
                {group.category}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {group.items.map((item) => (
                <div key={item.title} className="card-obra p-5 group hover:border-primary/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-black text-lg text-white mb-1 uppercase">
                        {item.title}
                      </h4>
                      <p className="text-primary font-bold text-sm">{item.material}</p>
                    </div>
                    <CheckCircle2 size={20} className="text-slate-700 group-hover:text-primary transition-colors" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                      <Lightbulb size={18} className="text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-text-muted leading-relaxed">
                        <span className="text-white font-bold">TIP: </span>{item.tip}
                      </p>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest pl-1">
                      REFERENCIAS: {item.pro}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparativa Morteros M-5 vs M-7,5 */}
            {group.category === "Cemento y Ladrillo" && (
              <div className="mt-8 p-6 rounded-2xl bg-slate-900/80 border border-slate-700 shadow-xl">
                <h4 className="text-white font-black text-lg mb-4 uppercase flex items-center gap-2">
                  <AlertTriangle size={20} className="text-primary" />
                  M-5 vs M-7,5: ¿Cuál elegir?
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-sm">
                  <div className="space-y-2">
                    <p className="text-text-muted">
                      <span className="text-white font-bold block mb-1 uppercase text-xs">Mortero M-5</span>
                      Resistencia baja-media (50kg/cm²). Solo para tabiquería interior ligera o rellenos.
                    </p>
                    <p className="text-text-muted">
                      <span className="text-white font-bold block mb-1 uppercase text-xs">Mortero M-7,5</span>
                      Estándar profesional (75kg/cm²). Obligatorio en muros de carga y zonas húmedas.
                    </p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 italic text-sm text-text-muted">
                    "La diferencia de precio es insignificante. Unifica todo al <span className="text-primary font-bold">M-7,5</span> para asegurar adherencia y evitar errores en la obra."
                  </div>
                </div>
              </div>
            )}
          </section>
        ))}

        {/* Comparativa Yeso vs Pladur */}
        <section>
          <div className="flex items-center gap-2 mb-6 border-b border-slate-700 pb-2">
            <AlertTriangle size={20} className="text-amber-500" />
            <h3 className="text-xl font-black uppercase tracking-widest text-slate-300">
              Yeso vs Pladur: Cuándo usar cada uno
            </h3>
          </div>
          <div className="overflow-x-auto rounded-xl border border-slate-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-4">Característica</th>
                  <th className="p-4">Yeso</th>
                  <th className="p-4">Pladur</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700 bg-slate-900/50">
                <tr>
                  <td className="p-4 font-bold text-slate-400">Tiempo</td>
                  <td className="p-4 text-text-muted">Lento (semanas secado)</td>
                  <td className="p-4 text-emerald-400 font-bold">Rápido (48h listo)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-400">Acabado</td>
                  <td className="p-4 text-text-muted">Duro pero agrietable</td>
                  <td className="p-4 text-emerald-400 font-bold">Perfectamente liso</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-400">Instalaciones</td>
                  <td className="p-4 text-text-muted">Requiere rozas/escombros</td>
                  <td className="p-4 text-emerald-400 font-bold">Limpias por dentro</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
