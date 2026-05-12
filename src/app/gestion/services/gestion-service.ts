import { getObras, createObra, deleteObra } from "@/lib/arquitecto-store";
import { type TipoObra } from "@/lib/arquitecto-types";

export const gestionService = {
  getProjects: () => getObras(),
  
  createProject: (nombre: string, direccion: string, tipo: TipoObra) => 
    createObra(nombre, direccion, tipo),
  
  deleteProject: (id: string) => 
    deleteObra(id),
};
