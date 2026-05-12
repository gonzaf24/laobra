import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { formacionesService } from "@/app/formaciones/services/formaciones-service";
import { Leccion } from "@/lib/formaciones-data";

export function useFormacionDetalle() {
  const params = useParams();
  const id = params.id as string;
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Leccion | null>(null);

  const formacion = useMemo(() => 
    formacionesService.getGremioById(id), 
  [id]);

  const handleLessonClick = (leccion: Leccion) => {
    if (leccion.videoUrl) {
      setSelectedLesson(leccion);
    } else {
      setShowComingSoon(true);
    }
  };

  return {
    formacion,
    showComingSoon,
    setShowComingSoon,
    selectedLesson,
    setSelectedLesson,
    handleLessonClick,
  };
}
