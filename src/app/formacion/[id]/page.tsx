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
const MOCK_VIDEOS: VideoItem[] = [
  {
    id: "v1",
    title: "Nivelación de perfilería base",
    duration: "12:45",
    description:
      "Cómo usar el láser para marcar el nivel maestro en todo el perímetro.",
    thumbnail:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "v2",
    title: "Corte de placas a medida",
    duration: "08:20",
    description: "Técnica de corte limpio con cúter y lijado de bordes.",
    thumbnail:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "v3",
    title: "Tratamiento de juntas (Pasta y Cinta)",
    duration: "15:10",
    description:
      "Aplicación de primera mano y colocación correcta de la cinta microperforada.",
    thumbnail:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400",
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
    thumbnail:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400",
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

  const videos = id === "mezclas" ? MEZCLAS_VIDEOS : MOCK_VIDEOS;

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
          <span className="w-8 h-[1px] bg-slate-700"></span>
          Referencia Técnica de Obra
        </h3>
        
        {id === "cemento-ladrillo" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
              <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                Suelos y Nivelación
              </h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Usa siempre <span className="text-white">Mortero Autonivelante</span> para acabados perfectos. Si el desnivel es {">"}3cm, pide Capa Gruesa.
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
                {video.proportion && (
                  <div className="bg-primary rounded-md px-2 py-1 text-[10px] font-black tracking-wider text-slate-900 uppercase shadow-lg">
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
                Reproducir ahora <ChevronRight size={16} />
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
