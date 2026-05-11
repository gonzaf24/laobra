// ─────────────────────────────────────────────────
// Módulo Arquitecto — Modelo de Datos
// ─────────────────────────────────────────────────

export type TipoEstancia =
  | "dormitorio"
  | "baño"
  | "cocina"
  | "salon"
  | "terraza"
  | "pasillo"
  | "lavadero"
  | "sotano"
  | "otro";

export const TIPOS_ESTANCIA: { value: TipoEstancia; label: string }[] = [
  { value: "dormitorio", label: "Dormitorio / Habitación" },
  { value: "salon", label: "Salón / Comedor" },
  { value: "baño", label: "Baño" },
  { value: "cocina", label: "Cocina" },
  { value: "terraza", label: "Terraza / Exterior" },
  { value: "pasillo", label: "Pasillo / Escalera" },
  { value: "lavadero", label: "Lavadero / Galería" },
  { value: "sotano", label: "Sótano / Garaje" },
  { value: "otro", label: "Otro" },
];

// ── Sección Suelo ──
export interface SeccionSuelo {
  m2: number;
  tipoBaldosa: "gres" | "pasta";
  medida: string;
  espesorBaldosa: number;
  tipoCola: "c1" | "c2" | "c2te-s1";
  encolado: "simple" | "doble";
  anchoJunta: number;
  merma: number;
  necesitaAutonivelante: boolean;
  espesorNivelante: number;
  // ── Nuevos campos ──
  necesitaPicado: boolean;           // ¿Demoler suelo existente?
  necesitaPuenteUnion: boolean;      // ¿Imprimación antes de autonivelante?
  soloNivelado: boolean;             // Solo nivelar, sin colocar cerámica
}

// ── Sección Paredes (Construcción) ──
export type TipoMuro =
  | "hueco-sencillo"
  | "hueco-doble"
  | "perforado"
  | "macizo"
  | "bloque-10"
  | "bloque-20"
  | "pladur-13"
  | "pladur-15"
  | "pladur-hidro"
  | "pladur-fuego";

export interface SeccionParedes {
  m2: number;
  tipo: TipoMuro;
  // ── Nuevos campos Pladur ──
  modoPladur: "trasdosado" | "tabique-nuevo";  // Omega directo vs Canal+Montante
  caras: 1 | 2;                                // Nº de caras con placa (tabique=2)
  // ── Nuevos campos Ladrillo ──
  necesitaEnfoscado: boolean;                  // ¿Revoque con mortero?
  necesitaGuarnecidoYeso: boolean;             // ¿Capa de yeso posterior?
  // ── Común ──
  alturaMedia: number;                         // Altura en metros (para canales)
  necesitaDemolicion: boolean;                 // ¿Hay que tirar esta pared?
}

// ── Sección Alicatado (Cerámica en Paredes) ──
export interface SeccionAlicatado {
  m2: number;
  tipoBaldosa: "gres" | "pasta";
  medida: string;
  espesorBaldosa: number;
  tipoCola: "c1" | "c2" | "c2te-s1";
  encolado: "simple" | "doble";
  anchoJunta: number;
  merma: number;
  // ── Nuevos campos ──
  necesitaPuenteUnion: boolean;     // ¿Imprimación en superficie lisa?
}

// ── Sección Techo ──
export interface SeccionTecho {
  m2: number;
  tipo: "pladur" | "yeso" | "pintura-solo";
  // ── Nuevos campos Pladur ──
  tipoPlaca: "blanca" | "verde" | "rosa";   // Estándar / Hidrófugo / Ignífugo
  perimetroML: number;                       // Perímetro habitación (metros lineales)
  distanciaForjado: number;                  // Distancia al forjado en cm
  // ── Nuevos campos Yeso ──
  necesitaPuenteUnion: boolean;              // ¿Imprimación en hormigón?
}

// ── Sección Pintura ──
export interface SeccionPintura {
  m2Paredes: number;
  m2Techo: number;
  manos: 1 | 2 | 3;
  // ── Nuevos campos ──
  necesitaImprimacion: boolean;     // ¿Imprimación fijadora previa?
}

// ── Estancia Completa ──
export interface EstanciaObra {
  id: string;
  tipo: TipoEstancia;
  nombre: string;
  suelo: SeccionSuelo[];
  paredes: SeccionParedes[];
  alicatado: SeccionAlicatado[];
  techo: SeccionTecho[];
  pintura: SeccionPintura[];
  herramientas: string;
  materialesExtras: string;
  notas: string;
}

export interface PlanoObra {
  id: string;
  titulo: string;
  categoria: "arquitectura" | "instalaciones" | "detalles" | "otros";
  url: string;
  version: string;
  fecha: string;
}

export type TipoObra =
  | "reforma-integral"
  | "reforma-parcial"
  | "acondicionamiento"
  | "obra-nueva"
  | "rehabilitacion-energetica";

export const TIPOS_OBRA: { value: TipoObra; label: string }[] = [
  { value: "reforma-integral", label: "Reforma Integral" },
  { value: "reforma-parcial", label: "Reforma Parcial (Cocina/Baños)" },
  { value: "acondicionamiento", label: "Acondicionamiento (Lavado de cara)" },
  { value: "obra-nueva", label: "Obra Nueva / Ampliación" },
  { value: "rehabilitacion-energetica", label: "Rehabilitación Energética" },
];

export interface GastoObra {
  id: string;
  concepto: string;
  importe: number;
  categoria: "materiales" | "mano-de-obra" | "servicios" | "otros";
  fecha: string;
  fotoUrl?: string; // Base64 del ticket/factura
  proveedor?: string;
  notas?: string; // Detalle de materiales o texto libre
}

// ── Obra Completa ──
export interface Obra {
  id: string;
  nombre: string;
  direccion: string;
  tipo: TipoObra;
  createdAt: string;
  updatedAt: string;
  estancias: EstanciaObra[];
  planos?: PlanoObra[];
  gastos: GastoObra[];
}

// ─────────────────────────────────────────────────
// Valores por defecto (fábricas)
// ─────────────────────────────────────────────────

export function crearSueloDefecto(): SeccionSuelo {
  return {
    m2: 0,
    tipoBaldosa: "gres",
    medida: "60x60",
    espesorBaldosa: 10,
    tipoCola: "c2",
    encolado: "simple",
    anchoJunta: 3,
    merma: 10,
    necesitaAutonivelante: false,
    espesorNivelante: 0.5,
    necesitaPicado: false,
    necesitaPuenteUnion: false,
    soloNivelado: false,
  };
}

export function crearParedesDefecto(): SeccionParedes {
  return {
    m2: 0,
    tipo: "hueco-doble",
    modoPladur: "tabique-nuevo",
    caras: 2,
    necesitaEnfoscado: false,
    necesitaGuarnecidoYeso: false,
    alturaMedia: 2.5,
    necesitaDemolicion: false,
  };
}

export function crearAlicatadoDefecto(): SeccionAlicatado {
  return {
    m2: 0,
    tipoBaldosa: "pasta",
    medida: "30x60",
    espesorBaldosa: 8,
    tipoCola: "c1",
    encolado: "simple",
    anchoJunta: 2,
    merma: 10,
    necesitaPuenteUnion: false,
  };
}

export function crearTechoDefecto(): SeccionTecho {
  return {
    m2: 0,
    tipo: "pladur",
    tipoPlaca: "blanca",
    perimetroML: 0,
    distanciaForjado: 10,
    necesitaPuenteUnion: false,
  };
}

export function crearPinturaDefecto(): SeccionPintura {
  return {
    m2Paredes: 0,
    m2Techo: 0,
    manos: 2,
    necesitaImprimacion: true,
  };
}

export function crearEstanciaDefecto(): EstanciaObra {
  return {
    id: crypto.randomUUID(),
    tipo: "dormitorio",
    nombre: "",
    suelo: [],
    paredes: [],
    alicatado: [],
    techo: [],
    pintura: [],
    herramientas: "",
    materialesExtras: "",
    notas: "",
  };
}

export function crearObraDefecto(): Obra {
  return {
    id: crypto.randomUUID(),
    nombre: "",
    direccion: "",
    tipo: "reforma-integral",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    estancias: [],
    gastos: [],
  };
}
