import { useState, useEffect, useCallback } from "react";
import { gestionService } from "../services/gestion-service";
import { type Obra, type TipoObra } from "@/lib/arquitecto-types";

export function useGestion() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const refreshObras = useCallback(() => {
    gestionService.getProjects().then(setObras);
  }, []);

  useEffect(() => {
    refreshObras();
  }, [refreshObras]);

  const handleCrear = async (nombre: string, direccion: string, tipo: TipoObra) => {
    await gestionService.createProject(nombre, direccion, tipo);
    refreshObras();
    setShowModal(false);
  };

  const handleEliminar = async (id: string) => {
    await gestionService.deleteProject(id);
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
