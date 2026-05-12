import { 
  Wrench, 
  Layers, 
  Droplets, 
  LayoutGrid, 
  Ruler, 
  Truck, 
  Hammer, 
  Zap, 
  Construction,
  LucideIcon 
} from "lucide-react";

export interface Leccion {
  id: string;
  title: string;
  description: string;
  duration?: string;
  videoUrl?: string;
}

export interface FormacionGremio {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgGradient: string;
  lecciones: Leccion[];
}

export const FORMACIONES_DATA: FormacionGremio[] = [
  {
    id: "cemento-ladrillo",
    name: "Cemento y Ladrillo",
    description: "Nivelación, pegado de suelos y paredes de obra tradicional.",
    icon: Construction,
    color: "text-orange-400",
    bgGradient: "from-orange-500/10 to-slate-900/40",
    lecciones: [
      { 
        id: "cl-1", 
        title: "Tipos de Ladrillo y sus Usos", 
        description: "Ladrillo hueco vs común: diferencias, resistencia y cuándo elegir cada uno.",
        videoUrl: "https://www.youtube.com/watch?v=j-kh5yiskFQ"
      },
      { 
        id: "cl-5", 
        title: "Nivelación de Suelos y Maestreo", 
        description: "Cómo hacer pendientes y nivelar suelos con mortero paso a paso.",
        videoUrl: "https://www.youtube.com/watch?v=FyMhNcg0Jvo" 
      },
      {
        id: "cl-6",
        title: "Losa de Cimentación y Saneamiento",
        description: "Preparación de terreno, hierro y vertido de hormigón con tuberías de desagüe.",
        videoUrl: "https://www.youtube.com/watch?v=6QjAacJN5hI"
      },
      {
        id: "cl-7",
        title: "Alicatado Profesional: Baños y Cocinas",
        description: "Técnicas de pegado, cortes y nivelación de azulejos en paredes.",
        videoUrl: "https://www.youtube.com/watch?v=tsw-_Vp-5Zc"
      },
      {
        id: "cl-8",
        title: "Detalles de Alicatado en Baños",
        description: "Trucos y detalles específicos para alicatar zonas difíciles y esquinas.",
        videoUrl: "https://www.youtube.com/watch?v=Wg4cXxt-iKY"
      },
      {
        id: "cl-9",
        title: "Enlucido Monocapa y Malla",
        description: "Aplicación de mortero monocapa, colocación de malla de refuerzo y acabado raspado o fratasado.",
        videoUrl: "https://www.youtube.com/watch?v=LfNqMyJWvaw"
      }
    ]
  },
  {
    id: "yeso-pladur",
    name: "Yeso y Pladur",
    description: "Tabiquería seca, techos, aislamientos y acabados de yeso.",
    icon: Layers,
    color: "text-blue-400",
    bgGradient: "from-blue-500/10 to-slate-900/40",
    lecciones: [
      { 
        id: "yp-1", 
        title: "Estructura Metálica: Canales y Montantes", 
        description: "Instalación del esqueleto del tabique paso a paso.",
        videoUrl: "https://www.youtube.com/watch?v=kbM_i-JY-Ug" 
      },
      { 
        id: "yp-2", 
        title: "Corte y Atornillado de Placas", 
        description: "Técnicas de corte limpio y fijación de placas de yeso laminado.",
        videoUrl: "https://www.youtube.com/watch?v=VmVC6Woq8MQ" 
      },
      { 
        id: "yp-3", 
        title: "Tratamiento de Juntas (Pastas)", 
        description: "Encintado y acabado profesional para dejar la pared lista para pintura.",
        videoUrl: "https://www.youtube.com/watch?v=Wxx1ORLMzac" 
      },
      { 
        id: "yp-4", 
        title: "Aislamiento Acústico y Térmico", 
        description: "Colocación de lana de roca y sellado de puentes térmicos.",
        videoUrl: "https://www.youtube.com/watch?v=LjtlcPEUDDE" 
      },
      {
        id: "yp-5",
        title: "Techos Falsos: Instalación y Nivelación",
        description: "Cómo montar la estructura de techo y nivelarla perfectamente.",
        videoUrl: "https://www.youtube.com/watch?v=wnLbLx-2xTU"
      }
    ]
  },
  {
    id: "mezclas-proporciones",
    name: "Mezclas y Proporciones",
    description: "Dosificación exacta de agua, cemento y aditivos.",
    icon: Droplets,
    color: "text-emerald-400",
    bgGradient: "from-emerald-500/10 to-slate-900/40",
    lecciones: [
      {
        id: "mp-4",
        title: "Morteros Autonivelantes de Bajo Espesor",
        description: "Preparación de la mezcla y técnica de vertido para conseguir suelos perfectos.",
        videoUrl: "https://www.youtube.com/watch?v=HMQL8h_FsaQ"
      },
      {
        id: "mp-5",
        title: "Mortero Autonivelante para Suelo Radiante",
        description: "Aplicación técnica sobre sistemas de calefacción por suelo radiante.",
        videoUrl: "https://www.youtube.com/watch?v=tRepwclqDsg"
      },
      {
        id: "mp-6",
        title: "Guía de Cementos Cola",
        description: "Tipos de adhesivos (C1, C2, T, E, S1) y cuál elegir según el soporte y la pieza.",
        videoUrl: "https://www.youtube.com/watch?v=q8sxsZ_Fr_Y"
      },
      {
        id: "mp-7",
        title: "Morteros Técnicos Especiales",
        description: "Morteros de reparación r4, impermeabilizantes, anclajes y cosmética de hormigón.",
        videoUrl: "https://www.youtube.com/watch?v=3S8QiupAwK8"
      }
    ]
  },
  {
    id: "azulejos-suelos",
    name: "Azulejos, Suelos y Ladrillo",
    description: "Poner baldosas, alicatar paredes y acabados de ladrillo visto.",
    icon: LayoutGrid,
    color: "text-cyan-400",
    bgGradient: "from-cyan-500/10 to-slate-900/40",
    lecciones: [
      { 
        id: "as-2", 
        title: "Sistemas de Nivelación (Cuñas)", 
        description: "Uso de calzos y cuñas para evitar cejas en porcelánicos imitación madera.",
        videoUrl: "https://www.youtube.com/watch?v=C5B9ql7wTcY"
      },
      { 
        id: "as-3", 
        title: "Cortes de Precisión y Esquinas", 
        description: "Uso de la cortadora manual para conseguir cortes rectos e impecables.",
        videoUrl: "https://www.youtube.com/watch?v=2wV7VlFOTPg"
      },
      {
        id: "as-5",
        title: "Técnicas para Gran Formato",
        description: "Manipulación, doble encolado y colocación de piezas porcelánicas de gran tamaño.",
        videoUrl: "https://www.youtube.com/watch?v=ETJckYYAu6Y"
      },
      {
        id: "as-6",
        title: "Gran Formato en Baños: Alicatado Vertical",
        description: "Técnicas de corte, pegado y manipulación de piezas grandes en paredes de baño.",
        videoUrl: "https://www.youtube.com/watch?v=qQYrx3E_yHg"
      }
    ]
  },
  {
    id: "medidas-replanteos",
    name: "Cómo Tomar Medidas",
    description: "Cálculo de m², niveles, huecos de ventana y replanteos.",
    icon: Ruler,
    color: "text-purple-400",
    bgGradient: "from-purple-500/10 to-slate-900/40",
    lecciones: [
      { 
        id: "mr-1", 
        title: "Uso del Nivel Láser de 360º", 
        description: "Marcar el nivel de 1 metro en toda la planta y alineaciones perfectas.",
        videoUrl: "https://www.youtube.com/watch?v=J_8L__a-cOA"
      },
      {
        id: "mr-4",
        title: "Práctica Real con Nivel Autonivelante",
        description: "7 ejemplos de uso en obra: desde techos hasta alineación de muebles.",
        videoUrl: "https://www.youtube.com/watch?v=lIDUQLdQB1Q"
      }
    ]
  },
  {
    id: "fontaneria-saneamiento",
    name: "Fontanería y Saneamiento",
    description: "Instalación de tuberías, sanitarios y sistemas de desagüe.",
    icon: Droplets,
    color: "text-blue-500",
    bgGradient: "from-blue-600/10 to-slate-900/40",
    lecciones: [
      {
        id: "fs-1",
        title: "Instalación de Sanitarios: El Inodoro",
        description: "Montaje paso a paso de un WC, fijación al suelo y conexión de cisterna.",
        videoUrl: "https://www.youtube.com/watch?v=qswMPk1k1m8"
      },
      {
        id: "fs-2",
        title: "Cambio de Bañera por Plato de Ducha",
        description: "Retirada de bañera, movimiento de desagüe e impermeabilización crítica del plato.",
        videoUrl: "https://www.youtube.com/watch?v=MmxomD5bFws"
      },
      {
        id: "fs-3",
        title: "Plato de Ducha de Obra y Piedra",
        description: "Creación de pendientes, instalación de sumidero sifónico y acabado con malla de piedras.",
        videoUrl: "https://www.youtube.com/watch?v=b_NpVYzHv08"
      }
    ]
  }
];
