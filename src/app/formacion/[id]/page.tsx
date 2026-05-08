import { CATEGORIES } from "@/lib/data";
import { notFound } from "next/navigation";
import { Play, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Mock videos - In a real app, these would come from the DB
const MOCK_VIDEOS = [
  {
    id: "v1",
    title: "Nivelación de perfilería base",
    duration: "12:45",
    description: "Cómo usar el láser para marcar el nivel maestro en todo el perímetro.",
    thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "v2",
    title: "Corte de placas a medida",
    duration: "08:20",
    description: "Técnica de corte limpio con cúter y lijado de bordes.",
    thumbnail: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "v3",
    title: "Tratamiento de juntas (Pasta y Cinta)",
    duration: "15:10",
    description: "Aplicación de primera mano y colocación correcta de la cinta microperforada.",
    thumbnail: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400",
  }
];

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const category = CATEGORIES.find((c) => c.id === id);

  if (!category) {
    notFound();
  }

  return (
    <div className="px-6 py-8">
      <Link 
        href="/" 
        className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        <span>Volver al inicio</span>
      </Link>

      <section className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary/20 p-2 rounded-lg text-primary">
            <category.icon size={24} />
          </div>
          <h2 className="text-3xl font-black">{category.name}</h2>
        </div>
        <p className="text-text-muted">{category.description}</p>
      </section>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_VIDEOS.map((video) => (
          <div key={video.id} className="card-obra p-0 overflow-hidden flex flex-col">
            <div className="relative aspect-video">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group cursor-pointer hover:bg-black/20 transition-all">
                <div className="bg-primary text-slate-900 p-4 rounded-full scale-90 group-hover:scale-100 transition-transform">
                  <Play size={24} fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm">
                <Clock size={12} />
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-1">{video.title}</h3>
              <p className="text-sm text-text-muted line-clamp-2">
                {video.description}
              </p>
              <button className="mt-4 text-primary text-sm font-bold flex items-center gap-1 hover:underline">
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
