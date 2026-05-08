import { CATEGORIES } from "@/lib/data";
import { notFound } from "next/navigation";
import { Play, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface VideoItem {
  id: string;
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
  proportion?: string;
}

// Mock videos - In a real app, these would come from the DB
const YESO_VIDEOS: VideoItem[] = [
  {
    id: "v1",
    title: "Nivelación de perfilería base",
    duration: "12:45",
    description:
      "Cómo usar el láser para marcar el nivel maestro en todo el perímetro antes de montar canales y montantes.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "v2",
    title: "Corte y Atornillado de Placas",
    duration: "08:20",
    description: "Técnica de corte limpio con cúter y ajuste del atornillador de profundidad para no romper el papel.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "v3",
    title: "Tratamiento de Juntas Q2 y Q3",
    duration: "15:10",
    description:
      "Aplicación de pasta, colocación de cinta de papel y lucido para dejar la pared lista para pintar.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "v4",
    title: "Instalación de Aislamiento (Lana de Roca)",
    duration: "11:30",
    description:
      "Cómo colocar el aislamiento térmico y acústico sin dejar puentes térmicos ni huecos vacíos.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "v5",
    title: "Montaje de Techos Continuos",
    duration: "20:45",
    description:
      "Uso de varillas, cuelgues y nivelación láser para techos perfectamente planos.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "v6",
    title: "Refuerzos para Cargas Pesadas (TV/Muebles)",
    duration: "09:15",
    description:
      "Dónde y cómo colocar refuerzos de madera o metal dentro del tabique para colgar peso con seguridad.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "v7",
    title: "Maestría en Acabado Q4 (Skimming Blade)",
    duration: "18:20",
    description:
      "Técnica de alisado total para paredes críticas con luz lateral. Acabado espejo.",
    thumbnail: "/video_placeholder.png",
  },
];

const CEMENTO_VIDEOS: VideoItem[] = [
  {
    id: "c1",
    title: "Nivelación de Suelos (Autonivelante)",
    duration: "14:20",
    description: "Preparación del soporte y vertido de mortero fluido para dejar el suelo como un espejo.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "c2",
    title: "Levantado de Tabiquería de Ladrillo",
    duration: "18:30",
    description: "Cómo 'tirar líneas', recibir los primeros ladrillos y mantener el plomo en toda la altura.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "c3",
    title: "Maestreado de Paredes con Mortero",
    duration: "22:15",
    description: "Colocación de maestras y técnica de regleado para corregir desplomes en muros viejos.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "c4",
    title: "Instalación de Precercos y Cargaderos",
    duration: "10:50",
    description: "Fijación de marcos de puerta y refuerzo de huecos para evitar grietas en las esquinas.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "c5",
    title: "Sustitución de Ventanas (Vieja por Nueva)",
    duration: "25:15",
    description: "Cómo desmontar el marco antiguo sin romper el muro y técnica de recibido de la nueva ventana con espuma y mortero.",
    thumbnail: "/video_placeholder.png",
  },
];

const MEZCLAS_VIDEOS: VideoItem[] = [
  {
    id: "m1",
    title: "Mortero M-5 (Gris Estándar)",
    duration: "05:30",
    proportion: "5L Agua / 25kg Saco",
    description:
      "Mezcla ideal para tabiquería de ladrillo. Consistencia de trabajo óptima.",
    thumbnail:
      "https://images.unsplash.com/photo-1517646281042-74951002f220?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "m2",
    title: "Cemento Cola Porcelánico (C2TE)",
    duration: "07:15",
    proportion: "6.5L Agua / 25kg Saco",
    description:
      "Técnica de batido doble y tiempo de reposo obligatorio de 5 minutos.",
    thumbnail:
      "https://images.unsplash.com/photo-1590385602641-3834e94a5090?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "m3",
    title: "Pasta de Juntas Pladur",
    duration: "04:45",
    proportion: "Manual / Listo al uso",
    description:
      "Cómo rectificar la pasta si se ha quedado seca y técnica de amasado sin grumos.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "m4",
    title: "Mortero de Cal (Restauración)",
    duration: "09:30",
    proportion: "1 Cal / 3 Arena / 1 Agua",
    description:
      "La mezcla perfecta para muros antiguos que necesitan transpirar y evitar humedades por capilaridad.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "m5",
    title: "Mortero Monocapa para Fachadas",
    duration: "12:15",
    proportion: "5L Agua / 25kg Saco",
    description:
      "Técnica de batido y tiempo de espera antes de proyectar o raspar en exteriores.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "m6",
    title: "Aditivos y Puentes de Unión",
    duration: "08:45",
    proportion: "Variable según producto",
    description:
      "Uso de resinas y látex para mejorar la adherencia en soportes difíciles (hormigón liso).",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "m7",
    title: "Yeso Manual (Proporción y Amasado)",
    duration: "10:20",
    proportion: "1 Agua / 1.5 Yeso",
    description:
      "El arte de amasar el yeso para que no se 'muera' rápido y permita trabajar el lucido con calma.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "m8",
    title: "Limpieza y Mantenimiento de Batidora",
    duration: "05:10",
    proportion: "N/A",
    description:
      "Cómo limpiar la varilla y el motor después de cada uso para evitar averías y grumos secos.",
    thumbnail: "/video_placeholder.png",
  },
];

const ALICATADO_VIDEOS: VideoItem[] = [
  {
    id: "a1",
    title: "Replanteo de Suelos y Paredes",
    duration: "15:45",
    description: "Cómo calcular la 'maestra' para que los cortes queden ocultos o centrados de forma estética.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "a2",
    title: "Técnica del Doble Encolado",
    duration: "10:20",
    description: "Aplicación de cola en soporte y en la pieza para evitar huecos en porcelánico de gran formato.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "a3",
    title: "Cortes de Precisión y Agujeros",
    duration: "12:30",
    description: "Uso de cortadora manual y coronas de diamante para tomas de agua y enchufes.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "a4",
    title: "Rejuntado y Limpieza Final",
    duration: "08:15",
    description: "Aplicación de borada y técnica de limpieza con esponja para no vaciar la junta.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "a5",
    title: "Pendientes en Platos de Ducha de Obra",
    duration: "18:50",
    description: "El arte de crear los 4 planos de caída hacia el desagüe sin que queden resaltes.",
    thumbnail: "/video_placeholder.png",
  },
];

const MEDICION_VIDEOS: VideoItem[] = [
  {
    id: "me1",
    title: "Cálculo de m² (Suelos y Paredes)",
    duration: "10:15",
    description: "Cómo medir una estancia y calcular la cantidad exacta de material con el margen de desperdicio del 10%.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "me2",
    title: "El Nivel Maestro (La marca de 1m)",
    duration: "12:30",
    description: "La técnica fundamental de marcar 1 metro desde el suelo para que toda la casa esté nivelada.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "me3",
    title: "Medir Huecos de Ventana y Puerta",
    duration: "14:45",
    description: "Cómo tomar medidas para encargar carpintería: ancho, alto, fondo y comprobación de descuadres.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "me4",
    title: "Uso del Medidor y Nivel Láser",
    duration: "08:50",
    description: "Tutorial rápido sobre cómo sacar medidas indirectas y niveles 360° en estancias grandes.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "me5",
    title: "Comprobación de Escuadras (3-4-5)",
    duration: "11:20",
    description: "La regla matemática infalible para saber si una esquina está a 90 grados sin usar escuadra gigante.",
    thumbnail: "/video_placeholder.png",
  },
];

const LOGISTICA_VIDEOS: VideoItem[] = [
  {
    id: "l1",
    title: "Protección de Zonas Comunes",
    duration: "08:15",
    description: "Cómo forrar ascensores y proteger el suelo de los pasillos de la comunidad para evitar quejas.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "l2",
    title: "Gestión y Clasificación de Escombros",
    duration: "10:30",
    description: "Técnicas de ensacado eficiente y clasificación de residuos (ladrillo, madera, metal).",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "l3",
    title: "Protección de Suelos Terminados",
    duration: "06:45",
    description: "Uso de fieltro y cartón para proteger el parquet o suelo nuevo mientras se termina la obra.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "l4",
    title: "Limpieza Final de Obra",
    duration: "12:10",
    description: "Eliminación de restos de cemento, polvo de yeso y velos de borada en azulejos.",
    thumbnail: "/video_placeholder.png",
  },
];

const DEMOLICION_VIDEOS: VideoItem[] = [
  {
    id: "d1",
    title: "Derribo de Tabiques (Seguridad)",
    duration: "15:20",
    description: "Técnica de arriba-abajo para evitar desplomes peligrosos y daños en el techo.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "d2",
    title: "Retirada de Azulejos sin Daños",
    duration: "09:45",
    description: "Cómo usar el martillo picador con ángulo para no destrozar el muro de soporte.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "d3",
    title: "Carga de Contenedor y Saco (Big Bag)",
    duration: "07:30",
    description: "Optimización del espacio en el contenedor y precauciones al mover cargas pesadas.",
    thumbnail: "/video_placeholder.png",
  },
];

const INSTALACIONES_VIDEOS: VideoItem[] = [
  {
    id: "i1",
    title: "Rozas Seguras en Muros y Tabiques",
    duration: "11:15",
    description: "Donde cortar y donde NO cortar para no comprometer la estabilidad de la pared.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "i2",
    title: "Recibido de Cajas y Tubos",
    duration: "13:40",
    description: "Cómo fijar las cajas de luz con yeso o mortero rápido para que queden a nivel y al ras.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "i3",
    title: "Tapado de Rozas (Anti-grietas)",
    duration: "10:50",
    description: "Uso de malla de fibra y mortero para que la pintura no se agriete sobre el tubo después.",
    thumbnail: "/video_placeholder.png",
  },
];

const COTAS_VIDEOS: VideoItem[] = [
  {
    id: "co1",
    title: "Alturas Estándar: Electricidad",
    duration: "09:30",
    description: "Referencia de alturas para interruptores (110cm), enchufes (30cm) y encimeras (110cm).",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "co2",
    title: "Posición de Tomas de Agua",
    duration: "11:15",
    description: "Ubicación técnica para lavabos, duchas, bidet y fregaderos según normativa estándar.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "co3",
    title: "Desagües y Pendientes de Evacuación",
    duration: "13:50",
    description: "Diámetros de tubería recomendados y la pendiente mínima del 2% para evitar atascos.",
    thumbnail: "/video_placeholder.png",
  },
  {
    id: "co4",
    title: "Ergonomía en Cocina y Baño",
    duration: "15:20",
    description: "Medidas de paso y alturas de mobiliario para que la estancia sea cómoda y funcional.",
    thumbnail: "/video_placeholder.png",
  },
];

export default async function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const category = CATEGORIES.find((c) => c.id === id);

  if (!category) {
    notFound();
  }

  let videos = YESO_VIDEOS;
  if (id === "mezclas") videos = MEZCLAS_VIDEOS;
  if (id === "cemento-ladrillo") videos = CEMENTO_VIDEOS;
  if (id === "alicatado") videos = ALICATADO_VIDEOS;
  if (id === "medidas") videos = MEDICION_VIDEOS;
  if (id === "logistica") videos = LOGISTICA_VIDEOS;
  if (id === "demolicion") videos = DEMOLICION_VIDEOS;
  if (id === "instalaciones-tecnicas") videos = INSTALACIONES_VIDEOS;
  if (id === "cotas-estandar") videos = COTAS_VIDEOS;

  return (
    <div className="px-6 py-8">
      <Link
        href="/"
        className="text-text-muted hover:text-primary mb-6 flex items-center gap-2 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Volver al inicio</span>
      </Link>

      <section className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="bg-primary/20 text-primary rounded-lg p-2">
            <category.icon size={24} />
          </div>
          <h2 className="text-3xl font-black">{category.name}</h2>
        </div>
        <p className="text-text-muted">{category.description}</p>
      </section>

      {/* Información Técnica Filtrada */}
      <section className="mb-10 space-y-4">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2">
          <span className="w-8 h-px bg-slate-700"></span>
          Referencia Técnica de Obra
        </h3>
        
        {id === "cemento-ladrillo" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
              <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                Morteros (M-5 vs M-7,5)
              </h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Usa <span className="text-white font-bold">M-7,5</span> como estándar. Tiene mejor plasticidad y resistencia (75kg/cm²) que el M-5, evitando que se disgrege al secar.
              </p>
            </div>
            <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
              <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                Adhesivos (Colas)
              </h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Porcelánico: <span className="text-primary font-bold">C2TE S1</span> (Flexible). <br />
                Cerámica: <span className="text-white">C1TE</span> (Solo para paredes de pasta roja/blanca).
              </p>
            </div>
          </div>
        )}

        {id === "yeso-pladur" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
              <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                Tipos de Placa
              </h4>
              <p className="text-xs text-text-muted leading-relaxed">
                <span className="text-emerald-400">Verde (H1):</span> Baños y cocinas. <br />
                <span className="text-white">Blanca:</span> Estándar (Techos y tabiques secos).
              </p>
            </div>
            <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
              <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                Juntas de Calidad
              </h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Usa <span className="text-white">Cinta de Papel</span>. Evita la malla de fibra si quieres evitar grietas a futuro.
              </p>
            </div>
          </div>
        )}
      </section>

      <div className="mb-8 p-4 bg-slate-900/50 border border-slate-800 rounded-2xl">
        <p className="text-[11px] text-text-muted italic leading-relaxed">
          <span className="text-amber-500 font-bold not-italic">⚠️ NOTA DE FORMACIÓN:</span> Los vídeos que ves a continuación son demostrativos. Próximamente subiremos las lecciones reales paso a paso con consejos de ejecución eficiente para cada tarea de {category.name.toLowerCase()}.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {videos.map((video) => (
          <div
            key={video.id}
            className="card-obra flex flex-col overflow-hidden p-0"
          >
            <div className="relative aspect-video">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 transition-all hover:bg-black/20">
                <div className="bg-primary scale-90 rounded-full p-4 text-slate-900 transition-transform group-hover:scale-100">
                  <Play size={24} fill="currentColor" />
                </div>
              </div>
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <div className="bg-amber-500/90 rounded-md px-2 py-1 text-[9px] font-black tracking-wider text-slate-900 uppercase shadow-lg backdrop-blur-sm border border-white/20">
                  Próximamente: Vídeo Real
                </div>
                {video.proportion && (
                  <div className="bg-white/90 rounded-md px-2 py-1 text-[9px] font-black tracking-wider text-slate-900 uppercase shadow-lg border border-white/20">
                    {video.proportion}
                  </div>
                )}
              </div>
              <div className="absolute right-3 bottom-3 flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm">
                <Clock size={12} />
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <h3 className="mb-1 text-lg font-bold">{video.title}</h3>
              <p className="text-text-muted line-clamp-2 text-sm">
                {video.description}
              </p>
              <button className="text-primary mt-4 flex items-center gap-1 text-sm font-bold hover:underline">
                Saber más <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Add ChevronRight here as it was missing in imports
import { ChevronRight } from "lucide-react";
