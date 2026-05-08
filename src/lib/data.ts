import { 
  Trash2, 
  Layers, 
  Grid, 
  Droplets, 
  Zap, 
  Paintbrush,
} from "lucide-react";

export const CATEGORIES = [
  {
    id: "demolicion",
    name: "Demoliciones",
    icon: Trash2,
    description: "Seguridad, protección y gestión de escombros.",
    color: "from-red-500/20 to-red-600/5",
  },
  {
    id: "tabiqueria",
    name: "Tabiquería y Pladur",
    icon: Layers,
    description: "Nivelación de perfiles y tratamiento de juntas.",
    color: "from-blue-500/20 to-blue-600/5",
  },
  {
    id: "revestimientos",
    name: "Revestimientos",
    icon: Grid,
    description: "Suelos autonivelantes y colocación de cerámica.",
    color: "from-amber-500/20 to-amber-600/5",
  },
  {
    id: "fontaneria",
    name: "Fontanería",
    icon: Droplets,
    description: "Impermeabilización de platos de ducha y tuberías.",
    color: "from-cyan-500/20 to-cyan-600/5",
  },
  {
    id: "electricidad",
    name: "Electricidad",
    icon: Zap,
    description: "Rozas, cajas de mecanismos y cableado.",
    color: "from-yellow-500/20 to-yellow-600/5",
  },
  {
    id: "acabados",
    name: "Acabados",
    icon: Paintbrush,
    description: "Masillado, lijado y técnicas de pintura.",
    color: "from-emerald-500/20 to-emerald-600/5",
  },
];

export const TOOLS = [
  {
    id: "1",
    name: "Nivel Láser",
    description: "Fundamental para nivelar perfiles y suelos.",
    videoUrl: "https://www.youtube.com/watch?v=mock1",
    image: "/tools/laser.jpg"
  },
  {
    id: "2",
    name: "Cortadora de Azulejos",
    description: "Manual y eléctrica. Cortes rectos y en inglete.",
    videoUrl: "https://www.youtube.com/watch?v=mock2",
    image: "/tools/cutter.jpg"
  }
];
