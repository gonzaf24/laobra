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
      { id: "cl-1", title: "Tipos de Ladrillo y sus Usos", description: "Ladrillo hueco, macizo y tabicón." },
      { id: "cl-2", title: "Preparación del Mortero de Agarre", description: "Consistencia ideal para levantar muros." },
      { id: "cl-3", title: "Nivelación y Plomado de Paredes", description: "Uso de la plomada y el nivel de burbuja." },
      { id: "cl-4", title: "Replanteo de la Primera Hilada", description: "La importancia de empezar recto." }
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
      { id: "mp-1", title: "El Ratio de Mezcla Universal", description: "Proporciones según el tipo de trabajo." },
      { id: "mp-2", title: "Aditivos: Hidrófugos y Acelerantes", description: "Cuándo y cómo usarlos correctamente." },
      { id: "mp-3", title: "Uso de la Hormigonera vs Mezclado Manual", description: "Eficiencia y tiempos de batido." }
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
      { id: "as-1", title: "Doble Encolado: Por qué es Vital", description: "Asegurando que no queden huecos bajo la pieza." },
      { id: "as-2", title: "Sistemas de Nivelación (Cuñas)", description: "Evitar cejas en formatos grandes." },
      { id: "as-3", title: "Cortes de Precisión y Esquinas", description: "Uso de la cortadora manual y eléctrica." },
      { id: "as-4", title: "Rejuntado y Limpieza Final", description: "Aplicación del mortero para juntas y acabado impecable." }
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
      { id: "mr-1", title: "Uso del Nivel Láser de 360º", description: "Marcar el nivel de 1 metro en toda la planta." },
      { id: "mr-2", title: "Cálculo de Áreas y Desperdicios", description: "Cuánto material pedir para no quedarse corto." },
      { id: "mr-3", title: "Replanteo en Suelos con Ángulos", description: "Cómo empezar para que los cortes queden ocultos." }
    ]
  },
  {
    id: "logistica-limpieza",
    name: "Logística y Limpieza",
    description: "Zonas comunes, escombros y protección de acabados.",
    icon: Truck,
    color: "text-slate-400",
    bgGradient: "from-slate-500/10 to-slate-900/40",
    lecciones: [
      { id: "ll-1", title: "Protección de Suelos y Ascensores", description: "Materiales para evitar daños en zonas comunes." },
      { id: "ll-2", title: "Organización de Material en Obra", description: "Dónde colocar cada cosa para no trabajar el doble." },
      { id: "ll-3", title: "Gestión de Residuos y Sacos", description: "Normativa y eficiencia en el desescombro." }
    ]
  },
  {
    id: "demolicion-desescombro",
    name: "Demolición y Desescombro",
    description: "Tirar tabiques, quitar azulejos y gestión de residuos.",
    icon: Hammer,
    color: "text-red-400",
    bgGradient: "from-red-500/10 to-slate-900/40",
    lecciones: [
      { id: "dd-1", title: "Seguridad: Apuntalado y Cargas", description: "Identificar muros de carga antes de tirar nada." },
      { id: "dd-2", title: "Herramientas de Demolición", description: "Martillos eléctricos vs maza manual." },
      { id: "dd-3", title: "Retirada Selectiva de Materiales", description: "Separar madera, metal y escombro limpio." }
    ]
  },
  {
    id: "instalaciones-albañil",
    name: "Instalaciones (Albañil)",
    description: "Rozas, cajas de luz y pre-instalaciones de agua.",
    icon: Zap,
    color: "text-amber-400",
    bgGradient: "from-amber-500/10 to-slate-900/40",
    lecciones: [
      { id: "ia-1", title: "Hacer Rozas sin Debilitar Muros", description: "Trayectorias horizontales y verticales permitidas." },
      { id: "ia-2", title: "Recibido de Cajas y Tubos", description: "Uso de yeso rápido o mortero según zona." },
      { id: "ia-3", title: "Pasamuros y Sellado Técnico", description: "Evitar puentes térmicos y ruidos entre habitaciones." }
    ]
  },
  {
    id: "estandar-cotas",
    name: "Medidas Estándar y Cotas",
    description: "Alturas de enchufes, tomas de agua y desagües.",
    icon: Wrench,
    color: "text-indigo-400",
    bgGradient: "from-indigo-500/10 to-slate-900/40",
    lecciones: [
      { id: "ec-1", title: "Alturas Estándar en Baño y Cocina", description: "Dónde poner las tomas para que coincidan con los muebles." },
      { id: "ec-2", title: "Cotas de Mecanismos Eléctricos", description: "Alturas de interruptores, enchufes y tomas de TV." },
      { id: "ec-3", title: "Pendientes en Desagües de Ducha", description: "El mínimo necesario para que el agua no se estanque." }
    ]
  }
];
