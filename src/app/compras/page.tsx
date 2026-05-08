import {
  ShoppingCart,
  CheckCircle2,
  Package,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

const SHOPPING_DATA = [
  {
    category: "Cemento y Ladrillo",
    items: [
      {
        title: "Nivelar Suelos",
        material: "Mortero Autonivelante (Base cementosa)",
        tip: "Si el desnivel es >3cm usa 'Capa Gruesa'. Vital para evitar cejas en el porcelánico.",
        pro: "Weberfloor, Argoniv o similares.",
      },
      {
        title: "Nivelar Paredes",
        material: "Mortero Seco M-7,5",
        tip: "Usa siempre cemento en baños y cocinas. El yeso no aguanta bien la humedad tras el azulejo.",
        pro: "Sacos de 25kg ya mezclados.",
      },
      {
        title: "Pegar Suelo (Porcelánico)",
        material: "Cemento Cola C2TE S1 (Flexible)",
        tip: "Indispensable para porcelánico. La 'S1' absorbe movimientos y evita que la pieza se suelte.",
        pro: "Pegoland Profesional, Gecol Flexible.",
      },
      {
        title: "Pegar Azulejos (Paredes)",
        material: "Cemento Cola C1TE",
        tip: "Solo para cerámica tradicional. Si la pared es porcelánica, usa C2 como en el suelo.",
        pro: "Opción económica para pasta roja/blanca.",
      },
    ],
  },
  {
    category: "Yeso y Pladur",
    items: [
      {
        title: "Estructura Vertical (Tabiques)",
        material: "Montantes (V) y Canales (H) de 48mm o 70mm",
        tip: "El de 70mm es más robusto para paredes altas. Los canales van al suelo/techo y los montantes encajan dentro cada 40cm o 60cm.",
        pro: "Acero galvanizado de 0.6mm de espesor.",
      },
      {
        title: "Estructura de Techo",
        material: "Perfil TC-47 + Varilla y Cuelgues",
        tip: "Fundamental para techos continuos. No uses perfiles de tabique para techos; el TC-47 es el que aguanta el peso con seguridad.",
        pro: "Longitud estándar de 3000mm.",
      },
      {
        title: "Trasdosados Directos",
        material: "Perfiles Omega (Maestras)",
        tip: "Se usan para atornillar placas directamente sobre un muro de ladrillo que esté bien plomado. Ahorran mucho espacio.",
        pro: "Fijación con tacos de golpe o tornillos.",
      },
      {
        title: "Placas Técnicas",
        material: "Blanca (Estándar) / Verde (Hidrófuga) / Rosa (Fuego)",
        tip: "Usa siempre de 15mm de grosor para paredes. La de 13mm déjala solo para techos si quieres evitar que la pared suene a 'hueco'.",
        pro: "Diferencia por colores según la zona.",
      },
      {
        title: "Aislamiento Interior",
        material: "Lana de Roca o Lana Mineral (40-60kg/m³)",
        tip: "No dejes el tabique vacío. El aislamiento es lo que hace que la habitación sea silenciosa y no pase frío.",
        pro: "Paneles semi-rígidos para que no se bajen con el tiempo.",
      },
      {
        title: "Fijaciones y Tornillería",
        material: "Tornillos PM (25/35mm) y Tornillos Metal-Metal (MM)",
        tip: "Usa tornillos de 25mm para la primera placa y de 35mm si pones doble placa. Los MM son para unir perfiles entre sí.",
        pro: "Fijación fosfatada (negra) para evitar óxido.",
      },
      {
        title: "Acabado de Calidad",
        material: "Cinta de Papel + Pasta de Juntas Q2/Q3",
        tip: "Prohibido usar malla de fibra en las juntas. La cinta de papel es lo único que garantiza que no saldrán grietas con el tiempo.",
        pro: "Pasta de secado normal (24h) o rápido (2h).",
      },
    ],
  },
];

export default function ComprasPage() {
  return (
    <div className="px-6 py-8 pb-32">
      <header className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="rounded-lg bg-amber-500/20 p-2 text-amber-500">
            <ShoppingCart size={24} />
          </div>
          <h2 className="text-3xl font-black">Asistente de Compra</h2>
        </div>
        <p className="text-text-muted italic">
          &quot;Compra como un experto, evita errores en la obra.&quot;
        </p>
      </header>

      <div className="space-y-12">
        {/* Recomendación Estratégica */}
        <div className="border-primary/30 relative overflow-hidden rounded-2xl border bg-slate-800/80 p-6 shadow-xl">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Lightbulb size={80} />
          </div>
          <h3 className="text-primary mb-3 flex items-center gap-2 text-xl font-black tracking-tighter uppercase">
            <Lightbulb size={24} />
            Estrategia de Logística
          </h3>
          <p className="mb-4 leading-snug font-bold text-white">
            ¿C1 o C2 para toda la obra?
          </p>
          <div className="text-text-muted space-y-3 text-sm">
            <p>
              Aunque el <span className="font-bold text-white">C2TE S1</span> es
              más caro, usarlo para{" "}
              <span className="font-bold text-white">TODO</span> elimina errores
              de la cuadrilla (mezclar sacos) y asegura que nada se suelte en 2
              años.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="rounded border border-red-500/20 bg-red-500/10 p-2">
                <span className="block text-xs font-bold text-red-400">
                  C1 Básico
                </span>
                <span className="text-lg text-white">~4€/saco</span>
              </div>
              <div className="rounded border border-emerald-500/20 bg-emerald-500/10 p-2">
                <span className="block text-xs font-bold text-emerald-400">
                  C2 Premium
                </span>
                <span className="text-lg text-white">~14€/saco</span>
              </div>
            </div>
            <p className="pt-2 text-xs italic">
              &quot;Ahorrar 400€ en cemento puede costar 4.000€ en reparaciones
              futuras.&quot;
            </p>
          </div>
        </div>

        {SHOPPING_DATA.map((group) => (
          <section key={group.category}>
            <div className="mb-6 flex items-center gap-2 border-b border-slate-700 pb-2">
              <Package size={20} className="text-primary" />
              <h3 className="text-xl font-black tracking-widest text-slate-300 uppercase">
                {group.category}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {group.items.map((item) => (
                <div
                  key={item.title}
                  className="card-obra group hover:border-primary/50 p-5 transition-all"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h4 className="mb-1 text-lg font-black text-white uppercase">
                        {item.title}
                      </h4>
                      <p className="text-primary text-sm font-bold">
                        {item.material}
                      </p>
                    </div>
                    <CheckCircle2
                      size={20}
                      className="group-hover:text-primary text-slate-700 transition-colors"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-lg border border-slate-700/50 bg-slate-900/50 p-3">
                      <Lightbulb
                        size={18}
                        className="mt-0.5 shrink-0 text-amber-400"
                      />
                      <p className="text-text-muted text-sm leading-relaxed">
                        <span className="font-bold text-white">TIP: </span>
                        {item.tip}
                      </p>
                    </div>
                    <p className="pl-1 font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                      REFERENCIAS: {item.pro}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparativa Morteros M-5 vs M-7,5 */}
            {group.category === "Cemento y Ladrillo" && (
              <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/80 p-6 shadow-xl">
                <h4 className="mb-4 flex items-center gap-2 text-lg font-black text-white uppercase">
                  <AlertTriangle size={20} className="text-primary" />
                  M-5 vs M-7,5: ¿Cuál elegir?
                </h4>
                <div className="mb-6 grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-text-muted">
                      <span className="mb-1 block text-xs font-bold text-white uppercase">
                        Mortero M-5
                      </span>
                      Resistencia baja-media (50kg/cm²). Solo para tabiquería
                      interior ligera o rellenos.
                    </p>
                    <p className="text-text-muted">
                      <span className="mb-1 block text-xs font-bold text-white uppercase">
                        Mortero M-7,5
                      </span>
                      Estándar profesional (75kg/cm²). Obligatorio en muros de
                      carga y zonas húmedas.
                    </p>
                  </div>
                  <div className="bg-primary/5 border-primary/20 text-text-muted rounded-xl border p-4 text-sm italic">
                    &quot;La diferencia de precio es insignificante. Unifica
                    todo al{" "}
                    <span className="text-primary font-bold">M-7,5</span> para
                    asegurar adherencia y evitar errores en la obra.&quot;
                  </div>
                </div>
              </div>
            )}
          </section>
        ))}

        {/* Comparativa Yeso vs Pladur Premium */}
        <section className="mt-12">
          <div className="mb-8 flex items-center gap-2 border-b border-slate-700 pb-3">
            <AlertTriangle size={24} className="text-amber-500" />
            <div>
              <h3 className="text-2xl font-black tracking-widest text-white uppercase">
                Duelo de Sistemas: Yeso vs Pladur
              </h3>
              <p className="text-text-muted text-xs italic">¿Cuál elegir según el tipo de reforma?</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* YESO TRADICIONAL */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-slate-800 px-4 py-1 rounded-bl-xl text-[10px] font-black text-slate-500 uppercase">Obra Húmeda</div>
              <h4 className="text-xl font-black text-slate-300 mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                Yeso Tradicional
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Resistencia al Impacto</p>
                    <p className="text-xs text-text-muted italic">Es un material macizo y duro. Aguanta mejor los golpes directos.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Precio de Material</p>
                    <p className="text-xs text-text-muted italic">El saco de yeso es muy económico comparado con la placa de pladur.</p>
                  </div>
                </li>
                <li className="flex gap-3 opacity-50">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Logística de Obra</p>
                    <p className="text-xs text-text-muted italic">Mucha agua, mucho polvo y semanas de espera para poder pintar.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* PLADUR (SISTEMA SECO) */}
            <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6 relative overflow-hidden shadow-2xl shadow-primary/5">
              <div className="absolute top-0 right-0 bg-primary/20 px-4 py-1 rounded-bl-xl text-[10px] font-black text-primary uppercase tracking-widest">Recomendación Pro</div>
              <h4 className="text-xl font-black text-primary mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                Pladur (Sistema Seco)
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Insonorización Superior</p>
                    <p className="text-xs text-text-muted italic">Con lana de roca, el aislamiento acústico es infinitamente mejor.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Rapidez y Limpieza</p>
                    <p className="text-xs text-text-muted italic">Obra seca. En 48h puedes pintar. Cero rozas, cero escombros pesados.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Acabados Perfectos</p>
                    <p className="text-xs text-text-muted italic">Paredes 100% planas. Sin grietas por asentamiento del edificio.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
