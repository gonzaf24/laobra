import { Play, X } from "lucide-react";

interface VideoComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoComingSoonModal({ isOpen, onClose }: VideoComingSoonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 backdrop-blur-md duration-300">
      <div className="border-primary/30 shadow-primary/20 animate-in zoom-in-95 relative w-full max-w-md overflow-hidden rounded-xl border bg-slate-950 p-8 shadow-2xl duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 transition-colors hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="bg-primary/10 text-primary mb-6 flex h-16 w-16 items-center justify-center rounded-xl">
          <Play size={32} fill="currentColor" />
        </div>

        <h3 className="mb-3 text-xl font-black tracking-tight text-white uppercase">
          Contenido en <span className="text-primary">Producción</span>
        </h3>
        <p className="text-text-muted mb-8 text-sm leading-relaxed">
          Estamos preparando la biblioteca didáctica de formación técnica más completa del sector. Muy pronto tendrás acceso a todos los vídeos y consejos profesionales para trabajar con máxima eficiencia.
        </p>

        <button
          onClick={onClose}
          className="bg-primary w-full rounded-lg py-3 text-xs font-black tracking-widest text-slate-900 uppercase shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
