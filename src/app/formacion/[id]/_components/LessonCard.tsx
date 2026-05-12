import { Play, Video } from "lucide-react";
import { Leccion } from "@/lib/formaciones-data";

interface LessonCardProps {
  leccion: Leccion;
  onClick: () => void;
}

export function LessonCard({ leccion, onClick }: LessonCardProps) {
  const hasVideo = !!leccion.videoUrl;

  return (
    <div
      onClick={onClick}
      className={`group flex flex-col overflow-hidden rounded-2xl border transition-all hover:shadow-2xl hover:-translate-y-1 cursor-pointer ${
        hasVideo 
          ? "border-amber-500/30 bg-slate-900 shadow-amber-500/5" 
          : "border-slate-800 bg-slate-900/40"
      }`}
    >
      <div className="relative aspect-video bg-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950">
          <img
            src={hasVideo 
              ? `https://img.youtube.com/vi/${leccion.videoUrl?.split('v=')[1]?.split('&')[0]}/maxresdefault.jpg` 
              : "/video_placeholder.png"
            }
            alt={leccion.title}
            className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-110 ${
              hasVideo ? "opacity-60 group-hover:opacity-80" : "opacity-30 grayscale"
            }`}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        
        {/* Overlay Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

        <div className="absolute inset-0 flex items-center justify-center transition-colors group-hover:bg-black/20">
          <div className={`flex items-center justify-center rounded-full p-4 transition-all duration-300 ${
            hasVideo 
              ? "bg-red-600 text-white shadow-lg shadow-red-600/40 group-hover:scale-110 group-hover:bg-red-500" 
              : "bg-slate-800/80 text-white/50 group-hover:scale-110"
          }`}>
            {hasVideo ? <Video size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
          </div>
        </div>

        <div className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-[10px] font-black text-white backdrop-blur-md border border-white/10 uppercase tracking-widest">
          {leccion.duration || "10:00 MIN"}
        </div>

        <div className="absolute top-3 left-3">
          {hasVideo ? (
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[9px] font-black tracking-widest text-slate-950 uppercase shadow-lg backdrop-blur-sm">
              <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-slate-950" />
              Vídeo Real Disponible
            </div>
          ) : (
            <div className="rounded-full bg-slate-800/90 px-2.5 py-1 text-[9px] font-black tracking-widest text-slate-400 uppercase border border-white/5">
              Próximamente
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col p-5 flex-1">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h4 className="text-lg font-black tracking-tight text-white uppercase italic leading-tight group-hover:text-amber-400 transition-colors">
            {leccion.title}
          </h4>
        </div>
        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
          {leccion.description}
        </p>
        
        <div className="mt-4 flex items-center gap-2">
          <div className="h-0.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-1000 ${hasVideo ? "w-full bg-amber-500" : "w-0"}`} />
          </div>
          <span className={`text-[10px] font-black uppercase italic ${hasVideo ? "text-amber-500" : "text-slate-600"}`}>
            {hasVideo ? "Ver Ahora" : "Sin Acceso"}
          </span>
        </div>
      </div>
    </div>
  );
}
