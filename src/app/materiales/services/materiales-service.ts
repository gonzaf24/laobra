import { MATERIALS_DATA } from "@/lib/materials-data";
import { ESTANCIAS_DATA } from "@/lib/estancias-data";

export const materialesService = {
  getMaterials: () => MATERIALS_DATA,
  
  getMaterialById: (id: string) => 
    MATERIALS_DATA.find((m) => m.id === id),
  
  getOriginEstancia: (id: string | null) => 
    id ? ESTANCIAS_DATA.find((e) => e.id === id) : null,
};
