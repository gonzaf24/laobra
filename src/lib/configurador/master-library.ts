/**
 * LIBRERÍA MAESTRA DE CONSTRUCCIÓN - GÉNESIS TÉCNICA
 */

export type NivelCalidad = "basica" | "estandar" | "premium";

export const MULTIPLICADORES_CALIDAD: Record<NivelCalidad, number> = {
  basica: 0.85,
  estandar: 1.0,
  premium: 1.45,
};

export const VARIANTES_LADRILLO = {
  h7: { nombre: "Hueco Doble 7cm", uds_m2: 36, mortero_l_m2: 15, precio: 0.45 },
  h11: { nombre: "Hueco Doble 11cm", uds_m2: 33, mortero_l_m2: 22, precio: 0.58 },
  panal: { nombre: "Termoarcilla 14cm", uds_m2: 15, mortero_l_m2: 28, precio: 1.10 },
  macizo: { nombre: "Ladrillo Macizo 9cm", uds_m2: 60, mortero_l_m2: 35, precio: 0.38 }
};

export const VARIANTES_SUELO = {
  tipos: {
    "porcelanico": { nombre: "Porcelánico Rectificado", formatos: ["30x60", "60x60", "120x60"] },
    "laminado": { nombre: "Suelo Laminado (Tarima)", formatos: ["AC4", "AC5", "AC6"] },
    "vinilico": { nombre: "Vinílico SPC (Click)", formatos: ["4mm", "5mm", "6mm"] }
  },
  formatos: {
    "30x60": { niveladores_m2: 18, adhesivo_kg_m2: 5, precio_m2: 18 },
    "60x60": { niveladores_m2: 11, adhesivo_kg_m2: 5.5, precio_m2: 22 },
    "120x60": { niveladores_m2: 8, adhesivo_kg_m2: 7, precio_m2: 35 },
    "AC4": { precio_m2: 12, manta: true },
    "AC5": { precio_m2: 18, manta: true },
    "AC6": { precio_m2: 26, manta: true },
    "4mm": { precio_m2: 22, manta: false },
    "5mm": { precio_m2: 28, manta: false }
  }
};

export const VARIANTES_PLADUR = {
  montantes: { "48": { nombre: "Perfil 48mm", precio: 2.2 }, "70": { nombre: "Perfil 70mm", precio: 2.9 } },
  placas: {
    "blanca": { nombre: "Placa Standard (Blanca)", color: "#ffffff", precio: 6.5 },
    "verde": { nombre: "Placa Hidrófuga (Verde)", color: "#22c55e", precio: 9.8 },
    "roja": { nombre: "Placa Ignífuga (Roja)", color: "#ef4444", precio: 11.2 },
    "azul": { nombre: "Placa Acústica (Azul)", color: "#3b82f6", precio: 13.5 }
  },
  medidas: { "2000": { nombre: "1200 x 2000 mm", factor: 2.4 }, "2500": { nombre: "1200 x 2500 mm", factor: 3.0 }, "3000": { nombre: "1200 x 3000 mm", factor: 3.6 } }
};

export const VARIANTES_TECHOS = {
  tipos: {
    "pladur-continuo": { nombre: "Techo Continuo Pladur", precio_base: 24 },
    "yeso-proyectado": { nombre: "Yeso Proyectado (Directo)", precio_base: 12 },
    "escayola-falsa": { nombre: "Falso Techo Escayola", precio_base: 15 },
    "registrable-vinilico": { nombre: "Techo Registrable Vinílico", precio_base: 18 }
  }
};

export const VARIANTES_ABERTURAS = {
  tipos: {
    "ventana-pvc": { nombre: "Ventana PVC Oscilobatiente", precio_unit: 450 },
    "ventana-alu": { nombre: "Ventana Aluminio RPT", precio_unit: 580 },
    "puerta-block": { nombre: "Puerta de Paso (Block)", precio_unit: 220 },
    "puerta-corredera": { nombre: "Puerta Corredera (Casoneto)", precio_unit: 480 }
  }
};

export const VARIANTES_FONTANERIA = {
  aparatos: {
    "inodoro": { nombre: "Inodoro (Vater) Compacto", precio: 185 },
    "lavamanos": { nombre: "Lavamanos Porcelana", precio: 65 },
    "mueble-baño": { nombre: "Mueble de Baño + Espejo", precio: 240 },
    "plato-ducha": { nombre: "Plato de Ducha Resina Antideslizante", precio: 210 }
  },
  griferia: {
    "monomando": { nombre: "Grifo Monomando Estándar", precio: 45 },
    "termostatica": { nombre: "Columna Ducha Termostática", precio: 165 },
    "cascada": { nombre: "Grifo Lavabo Cascada", precio: 85 }
  },
  tuberias: {
    "multicapa": { nombre: "Tubería Multicapa 16mm (m)", precio: 1.8 },
    "ppr": { nombre: "Tubería PPR 20mm (m)", precio: 1.2 },
    "cobre": { nombre: "Tubería Cobre 15mm (m)", precio: 5.5 }
  }
};

export interface MaterialItem {
  id: string;
  nombre: string;
  unidad: string;
  precioBase: number;
  formula: (cantidad: number) => number;
  afectaCalidad: boolean;
  categoria: string;
}

export interface PartidaObra {
  id: string;
  nombre: string;
  capitulo: string;
  materiales: MaterialItem[];
}

export const LIBRERIA_MAESTRA: PartidaObra[] = [
  {
    id: "tabique-ladrillo",
    nombre: "Tabiquería Ladrillo",
    capitulo: "Albañilería",
    materiales: [
      { id: "ladrillo", nombre: "Ladrillo", unidad: "Ud", precioBase: 0.45, formula: (m2) => m2*36, afectaCalidad: false, categoria: "Cerámico" },
      { id: "mortero", nombre: "Mortero M-5", unidad: "Saco", precioBase: 3.5, formula: (m2) => m2*0.8, afectaCalidad: false, categoria: "Morteros" }
    ]
  },
  {
    id: "tabique-pladur-estandar",
    nombre: "Tabiquería Pladur",
    capitulo: "Albañilería",
    materiales: [
      { id: "placa", nombre: "Placa Pladur", unidad: "m2", precioBase: 6.5, formula: (m2) => m2*2.1, afectaCalidad: true, categoria: "Placas" },
      { id: "montante", nombre: "Montante Galvanizado", unidad: "ml", precioBase: 2.2, formula: (m2) => m2*2.4, afectaCalidad: false, categoria: "Perfilería" },
      { id: "canal", nombre: "Canal Galvanizado", unidad: "ml", precioBase: 1.8, formula: (m2) => m2*0.8, afectaCalidad: false, categoria: "Perfilería" },
      { id: "tornillo-pm25", nombre: "Tornillo PM 3.5x25", unidad: "Ud", precioBase: 0.015, formula: (m2) => m2*25, afectaCalidad: false, categoria: "Fijaciones" }
    ]
  },
  {
    id: "suelo-porcelanico",
    nombre: "Pavimentos",
    capitulo: "Acabados",
    materiales: [
      { id: "baldosa", nombre: "Material de Suelo", unidad: "m2", precioBase: 22, formula: (m2) => m2*1.1, afectaCalidad: true, categoria: "Acabado" },
      { id: "adhesivo", nombre: "Adhesivo / Manta", unidad: "Saco/Ud", precioBase: 14, formula: (m2) => m2/5, afectaCalidad: false, categoria: "Instalación" },
      { id: "nivelacion", nombre: "Kit Nivelación", unidad: "Ud", precioBase: 18, formula: (m2) => m2/30, afectaCalidad: false, categoria: "Instalación" }
    ]
  },
  {
    id: "techo-tecnico",
    nombre: "Techos",
    capitulo: "Albañilería",
    materiales: [
      { id: "placa-techo", nombre: "Placa para Techo", unidad: "m2", precioBase: 6.5, formula: (m2) => m2 * 1.05, afectaCalidad: true, categoria: "Placas" },
      { id: "perfil-tc47", nombre: "Perfil Primario TC-47", unidad: "ml", precioBase: 1.9, formula: (m2) => m2 * 2.2, afectaCalidad: false, categoria: "Perfilería" }
    ]
  },
  {
    id: "yeso-maestreado",
    nombre: "Guarnecido de Yeso",
    capitulo: "Albañilería",
    materiales: [
      { id: "yeso-saco", nombre: "Yeso (25kg)", unidad: "Saco", precioBase: 3.8, formula: (m2) => m2 * 0.6, afectaCalidad: false, categoria: "Morteros" },
      { id: "guardavivo", nombre: "Guardavivo Metálico", unidad: "Ud", precioBase: 1.2, formula: (m2) => m2 * 0.2, afectaCalidad: false, categoria: "Perfilería" }
    ]
  },
  {
    id: "carpinteria-exterior",
    nombre: "Carpintería y Aberturas",
    capitulo: "Carpintería",
    materiales: [
      { id: "unidad-abertura", nombre: "Unidad Seleccionada", unidad: "Ud", precioBase: 350, formula: (uds) => uds, afectaCalidad: true, categoria: "Principal" },
      { id: "espuma-pu", nombre: "Espuma PU", unidad: "Bote", precioBase: 8.5, formula: (uds) => uds * 0.5, afectaCalidad: false, categoria: "Consumibles" },
      { id: "silicona", nombre: "Silicona Neutra", unidad: "Ud", precioBase: 4.2, formula: (uds) => uds * 1.2, afectaCalidad: false, categoria: "Consumibles" }
    ]
  },
  {
    id: "fontaneria-general",
    nombre: "Fontanería",
    capitulo: "Instalaciones",
    materiales: [
      { id: "tubo-font", nombre: "Tubería Seleccionada", unidad: "m", precioBase: 2, formula: (m) => m * 1.05, afectaCalidad: false, categoria: "Canalización" },
      { id: "teflon", nombre: "Cinta Teflón", unidad: "Ud", precioBase: 0.8, formula: (m) => m / 20, afectaCalidad: false, categoria: "Consumibles" }
    ]
  },
  {
    id: "aparato-sanitario",
    nombre: "Equipamiento Sanitario",
    capitulo: "Instalaciones",
    materiales: [
      { id: "pieza-sanitaria", nombre: "Pieza Seleccionada", unidad: "Ud", precioBase: 150, formula: (u) => u, afectaCalidad: true, categoria: "Sanitarios" },
      { id: "latiguillo", nombre: "Latiguillo", unidad: "Ud", precioBase: 4.5, formula: (u) => u * 2, afectaCalidad: false, categoria: "Accesorios" },
      { id: "valvula-corte", nombre: "Llave de Escuadra", unidad: "Ud", precioBase: 5.2, formula: (u) => u * 2, afectaCalidad: false, categoria: "Accesorios" }
    ]
  }
];
