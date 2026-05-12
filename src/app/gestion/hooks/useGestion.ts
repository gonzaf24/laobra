import { useState, useEffect, useCallback } from "react";
import { gestionService } from "../services/gestion-service";
import { type Obra, type TipoObra } from "@/lib/arquitecto-types";

export function useGestion() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const refreshObras = useCallback(() => {
    setObras(gestionService.getProjects());
  }, []);

  useEffect(() => {
    refreshObras();
  }, [refreshObras]);

  const handleCrear = (nombre: string, direccion: string, tipo: TipoObra) => {
    gestionService.createProject(nombre, direccion, tipo);
    refreshObras();
    setShowModal(false);
  };

  const handleEliminar = (id: string) => {
    gestionService.deleteProject(id);
    refreshObras();
    setConfirmDelete(null);
  };

  return {
    obras,
    showModal,
    setShowModal,
    confirmDelete,
    setConfirmDelete,
    handleCrear,
    handleEliminar,
  };
}
