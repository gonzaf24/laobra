// ─────────────────────────────────────────────────
// Módulo Arquitecto — Persistencia (localStorage)
// ─────────────────────────────────────────────────

import {
  Obra,
  EstanciaObra,
  crearObraDefecto,
  crearEstanciaDefecto,
} from "./arquitecto-types";

const STORAGE_KEY = "laobra-arquitecto-obras";

// ── Lectura ──

export function getObras(): Obra[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const obras: Obra[] = JSON.parse(raw);
    
    // Migración transparente para multi-secciones
    return obras.map((obra) => {
      if (!obra.planos) obra.planos = [];
      if (obra.estancias) {
        obra.estancias = obra.estancias.map((est) => {
          if (!Array.isArray(est.suelo))
            est.suelo = (est.suelo as any)?.habilitado ? [est.suelo] : [];
          if (!Array.isArray(est.paredes))
            est.paredes = (est.paredes as any)?.habilitado ? [est.paredes] : [];
          if (!Array.isArray(est.alicatado))
            est.alicatado = (est.alicatado as any)?.habilitado ? [est.alicatado] : [];
          if (!Array.isArray(est.techo))
            est.techo = (est.techo as any)?.habilitado ? [est.techo] : [];
          if (!Array.isArray(est.pintura))
            est.pintura = (est.pintura as any)?.habilitado ? [est.pintura] : [];
          return est;
        });
      }
      return obra;
    });
  } catch {
    return [];
  }
}

export function getObra(id: string): Obra | null {
  return getObras().find((o) => o.id === id) ?? null;
}

// ── Escritura ──

function persistObras(obras: Obra[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obras));
}

export function saveObra(obra: Obra): Obra {
  const obras = getObras();
  const idx = obras.findIndex((o) => o.id === obra.id);
  obra.updatedAt = new Date().toISOString();
  if (idx >= 0) {
    obras[idx] = obra;
  } else {
    obras.push(obra);
  }
  persistObras(obras);
  return obra;
}

export function deleteObra(id: string) {
  persistObras(getObras().filter((o) => o.id !== id));
}

export function createObra(nombre: string, direccion: string = ""): Obra {
  const obra = crearObraDefecto();
  obra.nombre = nombre;
  obra.direccion = direccion;
  return saveObra(obra);
}

// ── Estancias dentro de una Obra ──

export function addEstancia(obraId: string): EstanciaObra | null {
  const obra = getObra(obraId);
  if (!obra) return null;
  const estancia = crearEstanciaDefecto();
  obra.estancias.push(estancia);
  saveObra(obra);
  return estancia;
}

export function updateEstancia(
  obraId: string,
  estancia: EstanciaObra
): void {
  const obra = getObra(obraId);
  if (!obra) return;
  const idx = obra.estancias.findIndex((e) => e.id === estancia.id);
  if (idx >= 0) {
    obra.estancias[idx] = estancia;
    saveObra(obra);
  }
}

export function deleteEstancia(obraId: string, estanciaId: string): void {
  const obra = getObra(obraId);
  if (!obra) return;
  obra.estancias = obra.estancias.filter((e) => e.id !== estanciaId);
  saveObra(obra);
}
