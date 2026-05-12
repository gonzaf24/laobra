import { useMemo } from "react";
import { formacionesService } from "../services/formaciones-service";

export function useFormaciones() {
  const gremios = useMemo(() => formacionesService.getGremios(), []);

  return {
    gremios,
  };
}
