"use client";

import { X, Video } from "lucide-react";
import { useEffect } from "react";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export function VideoPlayerModal({
  isOpen,
  onClose,
  videoUrl,
  title,
}: VideoPlayerModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Extraer ID de YouTube
  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(videoUrl);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-red-500/10 p-2 text-red-500">
              <Video size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                Reproduciendo Lección
              </p>
              <h3 className="text-sm font-black text-white uppercase italic">
                {title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Aspect Ratio 16:9 */}
        <div className="relative aspect-video w-full bg-black">
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="rounded-full bg-slate-800 p-4 text-slate-500">
                <Video size={48} />
              </div>
              <div>
                <p className="text-lg font-black text-white uppercase">
                  Error al cargar el vídeo
                </p>
                <p className="text-sm text-slate-400">
                  No se ha podido encontrar un ID de vídeo válido.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-950/50 p-4">
          <p className="text-[10px] leading-relaxed text-slate-400 italic">
            &quot;Formación técnica para profesionales de la construcción. El
            conocimiento es la mejor herramienta.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
