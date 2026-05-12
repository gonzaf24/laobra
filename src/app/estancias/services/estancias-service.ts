import { ESTANCIAS_DATA } from "@/lib/estancias-data";

export const estanciasService = {
  getEstancias: () => ESTANCIAS_DATA,
  
  getEstanciaById: (id: string) => 
    ESTANCIAS_DATA.find((e) => e.id === id),
};
