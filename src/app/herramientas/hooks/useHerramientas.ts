import { useState } from "react";
import { herramientasService } from "../services/herramientas-service";

export function useHerramientas() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const toolsData = herramientasService.getTools();

  return {
    toolsData,
    selectedImage,
    setSelectedImage,
  };
}
