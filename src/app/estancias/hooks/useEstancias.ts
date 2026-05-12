import { useMemo } from "react";
import { estanciasService } from "../services/estancias-service";

export function useEstancias() {
  const estancias = useMemo(() => estanciasService.getEstancias(), []);

  return {
    estancias,
  };
}
