import { LucideIcon, Ruler, PaintBucket, Layers, Scissors, Layout, Wrench, Truck, ShieldCheck, Trash2 } from "lucide-react";

export interface ToolItem {
  name: string;
  description: string;
  why: string;
  image: string;
}

export interface ToolCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  tools: ToolItem[];
}

export const TOOLS_DATA: ToolCategory[] = [
  {
    id: "medicion",
    title: "Medición y Trazado",
    icon: Ruler,
    color: "bg-blue-500/10 text-blue-400",
    tools: [
      {
        name: "Nivel Láser 360°",
        description: "Proyecta una línea nivelada en todas las paredes a la vez.",
        why: "Para que los enchufes, techos y suelos de toda la casa estén a la misma altura exacta.",
        image: "/herramientas/nivel-laser-360.png",
      },
      {
        name: "Flexómetro Magnético",
        description: "Cinta métrica con imán en la punta.",
        why: "Permite medir distancias largas tú solo sujetando la punta a los perfiles metálicos del Pladur.",
        image: "/herramientas/flexometro.png",
      },
      {
        name: "Bota de Marcar",
        description: "Cordel con tiza que markas líneas rectas de varios metros.",
        why: "Para marcar en el suelo dónde irán los tabiques antes de empezar a montar.",
        image: "/herramientas/bota-de-marcar.png",
      },
      {
        name: "Falsa Escuadra",
        description: "Herramienta ajustable para copiar ángulos.",
        why: "Vital para copiar ángulos de paredes que no están rectas y cortar el suelo o pladur perfecto.",
        image: "/herramientas/escuadra-combinada.webp",
      },
      {
        name: "Regla con Nivel",
        description: "Regla de aluminio con burbujas de nivel incorporadas.",
        why: "Para nivelar grandes superficies (como encimeras o suelos) donde un nivel de mano se queda corto.",
        image: "/herramientas/regla-nivel.webp",
      },
    ],
  },
  {
    id: "albanileria",
    title: "Albañilería y Mezcla",
    icon: PaintBucket,
    color: "bg-orange-500/10 text-orange-400",
    tools: [
      {
        name: "Batidora Eléctrica",
        description: "Mezcladora de hélice potente.",
        why: "El cemento cola y el autonivelante necesitan una mezcla sin aire ni grumos para no agrietarse.",
        image: "/herramientas/batidora-electrica.png",
      },
      {
        name: "Gavetas de Goma",
        description: "Recipientes para el 'paste' irrompibles.",
        why: "Si el cemento se seca, le das un golpe y salta solo, dejando el cubo limpio.",
        image: "/herramientas/gaveta-goma.png",
      },
      {
        name: "Paleta Madrileña",
        description: "La herramienta básica de mano.",
        why: "Sirve para todo: aplicar mortero, romper un ladrillo o limpiar otras herramientas.",
        image: "/herramientas/paleta-madrilena.jpg",
      },
      {
        name: "Talocha de Esponja",
        description: "Plancha con esponja para el acabado final.",
        why: "Para dejar el mortero suave, liso y listo para pintar (el famoso fratasado).",
        image: "/herramientas/talocha-esponja.png",
      },
    ],
  },
  {
    id: "alicatado",
    title: "Cerámica y Revestimiento",
    icon: Layers,
    color: "bg-emerald-500/10 text-emerald-400",
    tools: [
      {
        name: "Llanas Dentadas",
        description: "Peines de acero con diferentes dientes.",
        why: "Aseguran que la cantidad de cola sea la misma en toda la superficie, evitando cámaras de aire.",
        image: "/herramientas/llana-dentada.png",
      },
      {
        name: "Maza de Goma Blanca",
        description: "Martillo de goma clara.",
        why: "Asienta la baldosa sin riesgo de rotura y NO deja marcas negras como la maza negra.",
        image: "/herramientas/maza-goma-blanca.png",
      },
      {
        name: "Sistema de Nivelación",
        description: "Calzos y Cuñas de plástico de un solo uso.",
        why: "Evitan las 'cejas' (esos tropezones molestos entre una baldosa y otra).",
        image: "/herramientas/sistema-nivelacion.jpg",
      },
      {
        name: "Ventosas Dobles",
        description: "Herramienta de agarre para piezas grandes.",
        why: "Para mover baldosas grandes (gran formato) con seguridad, precisión y sin dañarse la espalda.",
        image: "/herramientas/ventosas-dobles.jpg",
      },
      {
        name: "Vibrador de Baldosas",
        description: "Ventosa vibratoria de alta frecuencia.",
        why: "Sustituye a la maza en piezas grandes. Expulsa el aire y garantiza que el agarre sea del 100%.",
        image: "/herramientas/vibrador-baldosas.jpg",
      },
    ],
  },
  {
    id: "corte",
    title: "Corte y Demolición",
    icon: Scissors,
    color: "bg-red-500/10 text-red-400",
    tools: [
      {
        name: "Martillo Combinado",
        description: "Picador y taladro pesado.",
        why: "Imprescindible para levantar el suelo viejo o abrir huecos de puertas en muros.",
        image: "/herramientas/martillo-combinado.webp",
      },
      {
        name: "Cortadora Manual",
        description: "Máquina de corte seco (Tipo Rubi).",
        why: "Es la forma más rápida y limpia. Evita usar la radial para todo para no llenar la casa de polvo.",
        image: "/herramientas/cortadora-manual.webp",
      },
      {
        name: "Corona de Diamante",
        description: "Brocas circulares huecas.",
        why: "Para hacer el agujero perfecto del desagüe en el azulejo sin que se estalle.",
        image: "/herramientas/corona-diamante.webp",
      },
      {
        name: "Cortafríos y Puntero",
        description: "Herramientas de acero para picar a mano.",
        why: "Para picar en sitios delicados donde la máquina eléctrica rompe demasiado.",
        image: "/herramientas/cortafrios-puntero.webp",
      },
      {
        name: "Multiherramienta Oscilante",
        description: "Herramienta eléctrica con un cabezal que vibra a alta velocidad.",
        why: "Capaz de hacer cortes rectangulares perfectos en mitad de una pared ya puesta o cortar un marco de puerta a ras de suelo sin esfuerzo.",
        image: "/herramientas/multiherramienta.jpg",
      },
      {
        name: "Martillo Demoledor",
        description: "Herramienta de gran potencia diseñada exclusivamente para picar.",
        why: "La bestia de carga para levantar suelos enteros o derribar tabiques sin el esfuerzo físico de la maza.",
        image: "/herramientas/martillo-demoledor.jpg",
      },
      {
        name: "Amoladora Angular",
        description: "Herramienta manual de alta velocidad (Radial 115mm).",
        why: "La herramienta 'para todo': cortar tuberías, repasar azulejos, varillas de hierro o hacer rozas.",
        image: "/herramientas/amoladora-angular.webp",
      },
      {
        name: "Disco Diamante Continuo",
        description: "Disco liso sin cortes en el borde.",
        why: "Para cortar azulejos y porcelánico sin astillar el esmalte, dejando un acabado perfecto.",
        image: "/herramientas/disco-diamante-continuo.jpeg",
      },
      {
        name: "Disco Diamante Segmentado",
        description: "Disco con ranuras (espacios) en el borde.",
        why: "Para materiales brutos como ladrillo u hormigón. Las ranuras ayudan a refrigerar y evacuar el polvo.",
        image: "/herramientas/disco-diamante-segmentado.webp",
      },
      {
        name: "Disco de Corte Metal",
        description: "Disco fino hecho de granos abrasivos.",
        why: "Específico para cortar perfiles de Pladur, varillas de acero o tuberías metálicas.",
        image: "/herramientas/disco-corte-metal.jpg",
      },
      {
        name: "Disco de Láminas",
        description: "Disco compuesto por capas de lija (Flap disc).",
        why: "Para repasar cortes vivos en metal, quitar óxido o suavizar cantos de piedra.",
        image: "/herramientas/disco-laminas.webp",
      },
    ],
  },
  {
    id: "pladur",
    title: "Pladur y Acabados",
    icon: Layout,
    color: "bg-sky-500/10 text-sky-400",
    tools: [
      {
        name: "Atornillador de Profundidad",
        description: "Taladro que para solo al llegar al ras.",
        why: "Si el tornillo rompe el papel del Pladur, no sujeta nada. El tope evita este fallo.",
        image: "/herramientas/atornillador-profundidad.jpg",
      },
      {
        name: "Lijadora Jirafa",
        description: "Lijadora de brazo largo con aspiración.",
        why: "Lijar juntas a mano es una tortura. La jirafa lo hace en minutos y sin manchar nada.",
        image: "/herramientas/lijadora-jirafa.jpg",
      },
      {
        name: "Cizalla de Aviación",
        description: "Tijeras para metal de alta precisión.",
        why: "Cortan los perfiles de acero sin chispas ni ruido, mucho más seguro que la radial.",
        image: "/herramientas/cizalla-aviacion.jpg",
      },
      {
        name: "Espátulas de Juntas",
        description: "Juego de hojas de acero inoxidable (15 y 25 cm).",
        why: "La pequeña carga la pasta y la grande la extiende para dejar la unión totalmente plana e invisible.",
        image: "/herramientas/espatulas-juntas.jpg",
      },
      {
        name: "Llana de Acero Inoxidable",
        description: "Plancha lisa metálica con mango (Llana Fina).",
        why: "Es la herramienta para 'lucir'. Imprescindible para que la pared quede lisa como un espejo.",
        image: "/herramientas/llana-acero-inox.webp",
      },
      {
        name: "Cepillo de Desbastar",
        description: "Rallador metálico para cantos (Surform).",
        why: "Para crear el bisel en los cortes. Si no desbastas el borde, la pasta no agarra y saldrán grietas.",
        image: "/herramientas/cepillo-desbastar.avif",
      },
      {
        name: "Punzonadora de Perfiles",
        description: "Tenaza que une metales por presión.",
        why: "Fija los perfiles entre sí sin tornillos, evitando bultos que estorben al pegar la placa después.",
        image: "/herramientas/punzonadora-perfiles.jpg",
      },
      {
        name: "Elevador de Placas",
        description: "Soporte para elevar paneles (Pedal o Telescópico).",
        why: "Sujeta la placa contra el techo mientras tienes las manos libres para atornillar. Te ahorra un ayudante.",
        image: "/herramientas/elevador-placas.webp",
      },
      {
        name: "Serrucho de Punta",
        description: "Sierra estrecha con punta afilada.",
        why: "La única forma de hacer los agujeros para enchufes o focos una vez que la placa ya está instalada.",
        image: "/herramientas/serrucho-punta.webp",
      },
      {
        name: "Regla Trapezoidal",
        description: "Regla de aluminio con perfil en 'H' y bordes afilados.",
        why: "Clave para 'cortar' el exceso de material en el yeso y dejar la superficie perfectamente plana.",
        image: "/herramientas/regla-aluminio.webp",
      },
      {
        name: "Skimming Blade",
        description: "Espátula de gran formato extra flexible (de 60cm a 100cm).",
        why: "Permite alisar superficies grandes de una pasada, logrando el acabado Q4 sin marcas.",
        image: "/herramientas/espatula-alisado.jpg",
      },
    ],
  },
  {
    id: "mano",
    title: "Herramientas de Mano",
    icon: Wrench,
    color: "bg-slate-500/10 text-slate-400",
    tools: [
      {
        name: "Pico de Loro",
        description: "Alicate ajustable de gran apertura.",
        why: "La herramienta universal para apretar cualquier tuerca de fontanería de cualquier tamaño.",
        image: "/herramientas/pico-de-loro.webp",
      },
      {
        name: "Destornilladores VDE",
        description: "Aislados hasta 1000V.",
        why: "Seguridad vital: evita calambrazos incluso si hay corriente por accidente.",
        image: "/herramientas/destornilladores-vde.webp",
      },
      {
        name: "Cúter Profesional",
        description: "Cúter con cuerpo metálico y bloqueo de cuchilla.",
        why: "En obra se cortan materiales duros; si la cuchilla se desliza por no tener bloqueo, el tajo está asegurado.",
        image: "/herramientas/cuter-profesional.avif",
      },
      {
        name: "Maza de Acero (1kg)",
        description: "Martillo pesado para demolición manual.",
        why: "Para golpear el cortafríos con la fuerza real que un martillo normal no tiene.",
        image: "/herramientas/maza-acero.webp",
      },
      {
        name: "Martillo de Oreja",
        description: "Martillo clásico de carpintero.",
        why: "La herramienta perfecta para clavar y sacar clavos de forma rápida.",
        image: "/herramientas/martillo-oreja.webp",
      },
    ],
  },
  {
    id: "logistica",
    title: "Logística y Auxiliar",
    icon: Truck,
    color: "bg-indigo-500/10 text-indigo-400",
    tools: [
      {
        name: "Aspirador Clase M",
        description: "Aspirador industrial de alta filtración.",
        why: "El polvo de obra es malo para los pulmones. Este aspirador lo atrapa todo de verdad.",
        image: "/herramientas/aspirador-clase-m.webp",
      },
      {
        name: "Focos LED con Trípode",
        description: "Iluminación potente de obra.",
        why: "Para ver los fallos y sombras en las paredes antes de pintar y que no sea tarde.",
        image: "/herramientas/focos-led-tripode.jpg",
      },
      {
        name: "Enrollacables Pro",
        description: "Alargador con protección térmica.",
        why: "Evita incendios; si el cable se calienta por usar muchas máquinas, el térmico salta.",
        image: "/herramientas/enrollacables-pro.webp",
      },
      {
        name: "Borriquetas y Tablones",
        description: "Andamio de interior regulable.",
        why: "Para trabajar en techos con seguridad y sin tener que bajarse de la escalera cada 2 minutos.",
        image: "/herramientas/borriquetas-tablones.webp",
      },
    ],
  },
  {
    id: "seguridad",
    title: "Seguridad (EPIs)",
    icon: ShieldCheck,
    color: "bg-rose-500/10 text-rose-400",
    tools: [
      {
        name: "Rodilleras de Gel",
        description: "Protecciones ergonómicas para las rodillas.",
        why: "Poner suelo destruye las rodillas. El gel reparte el peso para trabajar sin dolor.",
        image: "/herramientas/rodilleras-gel.webp",
      },
      {
        name: "Mascarilla FFP3",
        description: "Protección respiratoria de máximo nivel.",
        why: "Protege contra el polvo de ladrillo y yeso, que es muy irritante para los pulmones.",
        image: "/herramientas/mascarilla-ffp3.webp",
      },
      {
        name: "Protectores Auditivos",
        description: "Cascos o tapones profesionales.",
        why: "Evita daños irreversibles al usar la radial o el martillo picador durante horas.",
        image: "/herramientas/botas-s3.avif",
      },
    ],
  },
  {
    id: "limpieza",
    title: "Limpieza y Protección",
    icon: Trash2,
    color: "bg-gray-500/10 text-gray-400",
    tools: [
      {
        name: "Cartón y Fieltro",
        description: "Protectores de suelo ondulados.",
        why: "Evita rayar el suelo nuevo y absorbe los golpes de las herramientas que caen.",
        image: "/herramientas/carton-fieltro.webp",
      },
      {
        name: "Cinta de Carrocero Especial",
        description: "Cinta de baja adhesión (Washi tape).",
        why: "Si usas cinta barata, al quitarla semanas después te llevarás la pintura de la pared.",
        image: "/herramientas/cinta-carrocero.jpg",
      },
      {
        name: "Cepillo de Alambre / Metal",
        description: "Cepillo con cerdas de acero muy resistentes.",
        why: "Imprescindible para limpiar el cemento seco de las herramientas o quitar el óxido de los perfiles metálicos.",
        image: "/herramientas/cepillo-mano.jpg",
      },
    ],
  },
];

export const herramientasService = {
  getTools: () => TOOLS_DATA,
  getCategoryById: (id: string) => TOOLS_DATA.find((c) => c.id === id),
};
