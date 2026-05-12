"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useFormacionDetalle } from "./hooks/useFormacionDetalle";
import { TradeHero } from "./_components/TradeHero";
import { TradeStats } from "./_components/TradeStats";
import { LessonCard } from "./_components/LessonCard";
import { VideoComingSoonModal } from "./_components/VideoComingSoonModal";
import { VideoPlayerModal } from "./_components/VideoPlayerModal";
import { Leccion } from "@/lib/formaciones-data";

export default function FormacionDetailPage() {
  const {
    formacion,
    showComingSoon,
    setShowComingSoon,
    selectedLesson,
    setSelectedLesson,
    handleLessonClick,
  } = useFormacionDetalle();

  if (!formacion) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-12 text-center">
        <h2 className="mb-4 text-3xl font-black text-white uppercase">
          Formación no encontrada
        </h2>
        <Link
          href="/formaciones"
          className="text-primary flex items-center gap-2 font-bold transition-colors hover:text-white"
        >
          <ArrowLeft size={18} />
          Volver a academia
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 pb-24">
      <TradeHero formacion={formacion} />

      <TradeStats leccionesCount={formacion.lecciones.length} />

      <div className="space-y-4">
        <h3 className="text-primary mb-4 text-[10px] font-black tracking-widest uppercase">
          Módulos del curso:
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {formacion.lecciones.map((leccion: Leccion) => (
            <LessonCard
              key={leccion.id}
              leccion={leccion}
              onClick={() => handleLessonClick(leccion)}
            />
          ))}
        </div>
      </div>

      <VideoComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
      />

      {selectedLesson && selectedLesson.videoUrl && (
        <VideoPlayerModal
          isOpen={!!selectedLesson}
          onClose={() => setSelectedLesson(null)}
          videoUrl={selectedLesson.videoUrl}
          title={selectedLesson.title}
        />
      )}
    </div>
  );
}
