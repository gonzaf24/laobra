// ─────────────────────────────────────────────────
// Módulo Arquitecto — Persistencia (localStorage)
// ─────────────────────────────────────────────────

import {
  Obra,
  EstanciaObra,
  TipoObra,
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
    
    // Migración transparente para multi-secciones y nuevos campos
    return obras.map((obra) => {
      if (!obra.planos) obra.planos = [];
      if (!obra.tipo) obra.tipo = "reforma-integral"; // Default para obras antiguas
      if (!obra.gastos) obra.gastos = []; // Nueva sección de gastos
      if (obra.estancias) {
        obra.estancias = obra.estancias.map((est) => {
          // Función auxiliar para migrar objetos antiguos a arrays
          const migrate = (val: unknown) => {
            if (Array.isArray(val)) return val;
            if (val && typeof val === "object" && "habilitado" in (val as object) && (val as {habilitado: boolean}).habilitado) {
              return [val];
            }
            return [];
          };

          est.suelo = migrate(est.suelo);
          est.paredes = migrate(est.paredes);
          est.alicatado = migrate(est.alicatado);
          est.techo = migrate(est.techo);
          est.pintura = migrate(est.pintura);
          
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

export function createObra(
  nombre: string,
  direccion: string = "",
  tipo: TipoObra = "reforma-integral"
): Obra {
  const obra = crearObraDefecto();
  obra.nombre = nombre;
  obra.direccion = direccion;
  obra.tipo = tipo;
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
