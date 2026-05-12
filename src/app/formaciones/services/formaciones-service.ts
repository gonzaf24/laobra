import { FORMACIONES_DATA, FormacionGremio } from "@/lib/formaciones-data";

export const formacionesService = {
  getGremios: (): FormacionGremio[] => FORMACIONES_DATA,
  
  getGremioById: (id: string): FormacionGremio | undefined => 
    FORMACIONES_DATA.find((g) => g.id === id),
};
