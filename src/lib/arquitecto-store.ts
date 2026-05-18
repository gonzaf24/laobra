import {
  Obra,
  EstanciaObra,
  TipoObra,
  crearObraDefecto,
  crearEstanciaDefecto,
} from "./arquitecto-types";

import {
  getObrasAction,
  getObraAction,
  saveObraAction,
  deleteObraAction,
  saveEstanciaAction,
  deleteEstanciaAction,
} from "./actions";

// ── Lectura ──

export async function getObras(): Promise<Obra[]> {
  return await getObrasAction();
}

export async function getObra(id: string): Promise<Obra | null> {
  return await getObraAction(id);
}

// ── Escritura ──

export async function saveObra(obra: Obra): Promise<Obra> {
  return await saveObraAction(obra);
}

export async function deleteObra(id: string): Promise<void> {
  await deleteObraAction(id);
}

export async function createObra(
  nombre: string,
  direccion: string = "",
  tipo: TipoObra = "reforma-integral"
): Promise<Obra> {
  const obra = crearObraDefecto();
  obra.nombre = nombre;
  obra.direccion = direccion;
  obra.tipo = tipo;
  return await saveObra(obra);
}

// ── Estancias dentro de una Obra ──

export async function addEstancia(obraId: string): Promise<EstanciaObra | null> {
  const obra = await getObra(obraId);
  if (!obra) return null;
  const estancia = crearEstanciaDefecto();
  obra.estancias.push(estancia);
  await saveObra(obra);
  return estancia;
}

export async function updateEstancia(
  obraId: string,
  estancia: EstanciaObra
): Promise<void> {
  await saveEstanciaAction(obraId, estancia);
}

export async function deleteEstancia(obraId: string, estanciaId: string): Promise<void> {
  await deleteEstanciaAction(estanciaId);
}
