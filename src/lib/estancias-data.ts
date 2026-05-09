import { Home, Bath, Utensils, Sun, Droplets, Hammer, Zap, LucideIcon } from "lucide-react";

export interface EstanciaItem {
  area: string;
  material: string;
  materialIds?: string[];
  purpose: string;
  reason: string;
  example: string;
  videoIds?: string[];
}

export interface Estancia {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  bgGradient: string; // Añadido para la home
  description: string;
  items: EstanciaItem[];
}

export const ESTANCIAS_DATA: Estancia[] = [
  {
    id: "salon",
    name: "Sala / Dormitorios",
    icon: Home,
    color: "text-slate-400",
    bgGradient: "from-slate-500/15 to-slate-900/40",
    description: "Habitaciones normales: Que queden bonitas, calientes y sin ruidos.",
    items: [
      {
        area: "Suelos",
        material: "Mortero Autonivelante + Cemento Cola Flexible",
        materialIds: ["mortero-autonivelante", "cola-c2te-s1"],
        purpose: "Dejar el suelo liso como un espejo antes de poner las baldosas.",
        reason: "Si el suelo tiene bultos, al pisar la baldosa esta puede crujir o romperse (el famoso 'baile').",
        example: "Echar el líquido autonivelante para que el suelo quede plano antes de poner el parquet.",
        videoIds: ["v1", "v2"],
      },
      {
        area: "Paredes",
        material: "Pladur Blanco o Yeso",
        materialIds: ["placa-blanca"],
        purpose: "Forrar las paredes para que queden lisas y no pase el ruido.",
        reason: "La placa de 15mm es más gorda y fuerte; si le das un golpe sin querer, no se rompe tan fácil.",
        example: "Poner una segunda pared de pladur con lana de roca (como una manta) para no oír al vecino.",
        videoIds: ["v3", "v4"],
      },
      {
        area: "Techos",
        material: "Pladur Blanco estándar",
        materialIds: ["placa-blanca", "perfil-maestra"],
        purpose: "Hacer un techo falso para esconder cables y tubos.",
        reason: "Es mejor que romper el techo real. Así puedes poner luces empotradas donde quieras.",
        example: "Instalar las luces redondas (focos) que van metidas dentro del techo.",
        videoIds: ["v5"],
      },
    ],
  },
  {
    id: "bano",
    name: "Baños",
    icon: Bath,
    color: "text-blue-400",
    bgGradient: "from-blue-500/15 to-slate-900/40",
    description: "Zonas de agua: Para que no haya goteras ni humedades.",
    items: [
      {
        area: "Suelos",
        material: "Líquido Autonivelante + Goma Líquida",
        materialIds: ["mortero-autonivelante"],
        purpose: "Hacer que el suelo sea como una piscina que no deja pasar ni una gota.",
        reason: "Evita que el agua cale al vecino de abajo. NO uses pintura normal, tiene que ser membrana especial para duchas.",
        example: "Aplicar la goma líquida en el suelo y subir 20cm por la pared antes de poner los azulejos.",
        videoIds: ["m1", "m2"],
      },
      {
        area: "Paredes",
        material: "Pladur Verde + Cola Fuerte (C2)",
        materialIds: ["placa-verde", "cola-c2"],
        purpose: "Hacer paredes que aguanten el vapor y los salpicones de agua.",
        reason: "El pladur verde no se pudre con la humedad. La cola C2 pega el azulejo tan fuerte que no se cae jamás.",
        example: "Hacer la pared donde va colgado el espejo y el lavabo.",
        videoIds: ["v7", "v8"],
      },
      {
        area: "Techos",
        material: "Pladur Verde (Antihumedad)",
        materialIds: ["placa-verde"],
        purpose: "Que el techo no se llene de manchas negras de moho.",
        reason: "Al ducharnos sale vapor caliente; este pladur aguanta ese vapor sin estropearse.",
        example: "Poner el techo del baño para que siempre esté limpio y seco.",
        videoIds: ["v9"],
      },
    ],
  },
  {
    id: "cocina",
    name: "Cocinas",
    icon: Utensils,
    color: "text-amber-400",
    bgGradient: "from-amber-500/15 to-slate-900/40",
    description: "Zonas de mucho peso: Preparadas para muebles pesados y calor.",
    items: [
      {
        area: "Suelos",
        material: "Autonivelante + Cemento Cola Flexible",
        materialIds: ["mortero-autonivelante", "cola-c2te-s1"],
        purpose: "Un suelo muy resistente que aguante el peso de la nevera y el horno.",
        reason: "La cocina se usa mucho y se limpia con agua; el suelo debe estar perfecto y no soltarse.",
        example: "Poner baldosas grandes que aguanten golpes si se cae una olla.",
        videoIds: ["v1", "v2"],
      },
      {
        area: "Paredes",
        material: "Pladur Verde + Refuerzos",
        materialIds: ["placa-verde", "perfil-montante"],
        purpose: "Reforzar la pared para que aguanten los muebles de cocina colgados.",
        reason: "La madera DM no se mueve con el calor. El pladur solo no aguanta el peso; la madera interna es la que sujeta los tornillos.",
        example: "Meter tableros de DM de 15mm tras el pladur donde irán los muebles altos.",
        videoIds: ["v3", "v10"],
      },
    ],
  },
  {
    id: "terrazas",
    name: "Terrazas / Exterior",
    icon: Sun,
    color: "text-orange-400",
    bgGradient: "from-orange-500/15 to-slate-900/40",
    description: "Al aire libre: Para aguantar el sol, la lluvia y el frío.",
    items: [
      {
        area: "Suelos",
        material: "Mortero de Cemento M-7,5",
        materialIds: ["mortero-m75"],
        purpose: "Hacer que el suelo esté un poco inclinado hacia el desagüe.",
        reason: "Si el suelo está plano, el agua se queda estancada y acaba entrando en casa o haciendo charcos.",
        example: "Hacer que el agua de lluvia corra solita hacia el agujero del desagüe.",
        videoIds: ["v12"],
      },
      {
        area: "Adhesivo",
        material: "Cemento Cola Ultra-Flexible",
        materialIds: ["cola-c2te-s1"],
        purpose: "Pegar las baldosas para que no se rajen con el calor del sol.",
        reason: "Con el sol, la baldosa se estira. Esta cola es como un chicle que deja que la baldosa se mueva sin romperse.",
        example: "Pegar el suelo de una terraza que le da el sol todo el día.",
        videoIds: ["v13", "v14"],
      },
    ],
  },
  {
    id: "lavaderos",
    name: "Lavaderos / Galerías",
    icon: Droplets,
    color: "text-cyan-400",
    bgGradient: "from-cyan-500/15 to-slate-900/40",
    description: "Mucha humedad y olores de tuberías.",
    items: [
      {
        area: "Paredes",
        material: "Pladur Verde o Mortero de Cal",
        materialIds: ["placa-verde", "mortero-cal"],
        purpose: "Aguantar el vapor de la secadora y la humedad de la ropa.",
        reason: "Si el lavadero está en un sótano, NO uses pladur (se pudrirá). Usa el Mortero de Cal que deja transpirar.",
        example: "Forrar con pladur verde solo en galerías ventiladas sobre el nivel del suelo.",
        videoIds: ["v7"],
      },
    ],
  },
  {
    id: "sotanos",
    name: "Sótanos / Garajes",
    icon: Hammer,
    color: "text-emerald-400",
    bgGradient: "from-emerald-500/15 to-slate-900/40",
    description: "Zonas con mucha humedad que viene del suelo.",
    items: [
      {
        area: "Paredes",
        material: "Mortero de Cal (que respira)",
        materialIds: ["mortero-cal"],
        purpose: "Dejar que la humedad del muro salga hacia fuera sin romper la pared.",
        reason: "EL YESO ESTÁ PROHIBIDO AQUÍ. Si pones yeso, se hinchará y se caerá. La cal deja que el muro 'respire'.",
        example: "Arreglar las paredes de un garaje o un trastero que están bajo tierra.",
        videoIds: ["v17"],
      },
    ],
  },
  {
    id: "pasos",
    name: "Pasillos / Escaleras",
    icon: Zap,
    color: "text-purple-400",
    bgGradient: "from-purple-500/15 to-slate-900/40",
    description: "Pasillos: Zonas de mucho paso y posibles golpes.",
    items: [
      {
        area: "Paredes",
        material: "Pladur Alta Dureza (Placa Azul)",
        materialIds: ["placa-azul"],
        purpose: "Paredes que aguanten golpes sin marcarse.",
        reason: "En los pasillos solemos dar golpes con maletas o bicis. Esta placa azul es dura como una piedra.",
        example: "Forrar las paredes del pasillo que lleva a las habitaciones.",
        videoIds: ["v19"],
      },
    ],
  },
];
