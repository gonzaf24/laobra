import {
  Trash2,
  Layers,
  Grid,
  Droplets,
  Zap,
  Ruler,
  Truck,
  ListTodo,
} from "lucide-react";

export const CATEGORIES = [
  {
    id: "cemento-ladrillo",
    name: "Cemento y Ladrillo",
    icon: Grid,
    description: "Nivelación, pegado de suelos y paredes de obra tradicional.",
    color: "from-slate-500/20 to-slate-600/5",
  },
  {
    id: "yeso-pladur",
    name: "Yeso y Pladur",
    icon: Layers,
    description: "Tabiquería seca, techos, aislamientos y acabados de yeso.",
    color: "from-amber-500/20 to-amber-600/5",
  },
  {
    id: "mezclas",
    name: "Mezclas y Proporciones",
    icon: Droplets,
    description: "Dosificación exacta de agua, cemento y aditivos.",
    color: "from-blue-400/20 to-blue-500/5",
  },
  {
    id: "alicatado",
    name: "Azulejos, Suelos y Ladrillo",
    icon: Layers,
    description:
      "Poner baldosas, alicatar paredes y acabados de ladrillo visto.",
    color: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    id: "medidas",
    name: "Cómo Tomar Medidas",
    icon: Ruler,
    description: "Cálculo de m², niveles, huecos de ventana y replanteos.",
    color: "from-violet-500/20 to-violet-600/5",
  },
  {
    id: "logistica",
    name: "Logística y Limpieza",
    icon: Truck,
    description: "Zonas comunes, escombros y protección de acabados.",
    color: "from-indigo-500/20 to-indigo-600/5",
  },
  {
    id: "demolicion",
    name: "Demolición y Desescombro",
    icon: Trash2,
    description: "Tirar tabiques, quitar azulejos y gestión de residuos.",
    color: "from-red-500/20 to-red-600/5",
  },
  {
    id: "instalaciones-tecnicas",
    name: "Instalaciones (Albañil)",
    icon: Zap,
    description: "Rozas, cajas de luz y pre-instalaciones de agua.",
    color: "from-yellow-500/20 to-yellow-600/5",
  },
  {
    id: "cotas-estandar",
    name: "Medidas Estándar y Cotas",
    icon: ListTodo,
    description: "Alturas de enchufes, tomas de agua y desagües.",
    color: "from-cyan-500/20 to-cyan-600/5",
  },
];

export const TOOLS = [
  {
    id: "1",
    name: "Nivel Láser",
    description: "Fundamental para nivelar perfiles y suelos.",
    videoUrl: "https://www.youtube.com/watch?v=mock1",
    image: "/tools/laser.jpg",
  },
  {
    id: "2",
    name: "Cortadora de Azulejos",
    description: "Manual y eléctrica. Cortes rectos y en inglete.",
    videoUrl: "https://www.youtube.com/watch?v=mock2",
    image: "/tools/cutter.jpg",
  },
];
