import { Trash2, Layers, Grid, Droplets, Zap, Paintbrush } from "lucide-react";

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
