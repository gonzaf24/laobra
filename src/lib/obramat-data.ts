/**
 * Estructura de datos para el catálogo inteligente de Obramat (Versión Corregida 2026).
 * Basado en la información directa del catálogo Obramat Barcelona proporcionada por el usuario.
 */

export interface ObramatCategoria {
  id: string;
  nombre: string;
  subcategorias: string[];
}

export interface ObramatProducto {
  sku: string;         // Referencia exacta Obramat
  nombre: string;
  formato: string;     // ej. "Saco 25kg", "Caja 1.4m²"
  precioUnitario: number;
  precioMetro?: number; // Para cerámica o tarifas por metro
  categoriaId: string;
  subcategoria: string; // ej. "Morteros", "Placas"
  paginaCatalogo: number; // Página en el PDF para salto directo
  esEstandar?: boolean; // Indica si es la medida/tipo más común
  tipo?: "estandar" | "frecuente"; // Para destacar en la UI
  imagen?: string;      // URL de la imagen del producto
}

export const OBRAMAT_CATEGORIAS: ObramatCategoria[] = [
  {
    id: "materiales",
    nombre: "Materiales de Construcción",
    subcategorias: ["General", "Morteros", "Cementos", "Ladrillos", "Placas PYL", "Aislamientos", "Accesorios PYL", "Pastas PYL", "Áridos"],
  },
  {
    id: "cocinas",
    nombre: "Cocinas",
    subcategorias: ["General", "Encimeras", "Fregaderos", "Grifería"],
  },
  {
    id: "ceramica",
    nombre: "Cerámica",
    subcategorias: ["General", "Suelos", "Revestimientos", "Rodapiés", "Pavimentos", "Suelos Exteriores", "Colocación"],
  },
  {
    id: "banos",
    nombre: "Baños",
    subcategorias: ["General", "Sanitarios", "Duchas", "Mobiliario", "Accesorios"],
  },
  {
    id: "pintura",
    nombre: "Pintura",
    subcategorias: ["General", "Interior", "Exterior", "Preparación", "Selladores"],
  },
  {
    id: "electricidad",
    nombre: "Electricidad e Iluminación",
    subcategorias: ["General", "Cables", "Mecanismos", "Cuadros"],
  },
  {
    id: "fontaneria",
    nombre: "Fontanería",
    subcategorias: ["General", "Tuberías", "Evacuación", "Repuestos"],
  },
  {
    id: "madera",
    nombre: "Madera",
    subcategorias: ["General", "Suelos Laminados", "Puertas", "Listones"],
  },
  {
    id: "herramientas",
    nombre: "Herramientas",
    subcategorias: ["General", "Eléctrica", "Manual", "Medición"],
  },
  {
    id: "ferreteria",
    nombre: "Ferretería",
    subcategorias: ["General", "Fijaciones", "Cerrajería", "Químicos"],
  }
];

export const OBRAMAT_CATALOGO: ObramatProducto[] = [
  // --- MATERIALES DE CONSTRUCCIÓN ---
  { sku: "10761016", nombre: "LADRILLO HUECO DOBLE TXANA (Rayado)", formato: "28x13x9 cm", precioUnitario: 0.22, categoriaId: "materiales", subcategoria: "Ladrillos", paginaCatalogo: 10, esEstandar: true, tipo: "estandar" },
  { sku: "10677975", nombre: "CEMENTO GRIS 32,5 R", formato: "Saco 25kg", precioUnitario: 4.47, categoriaId: "materiales", subcategoria: "Cementos", paginaCatalogo: 12, esEstandar: true, tipo: "estandar" },

  // --- PLACAS PYL ---
  { sku: "10043033", nombre: "PLACA PLADUR BLANCA BA 13mm", formato: "2000x1200mm", precioUnitario: 7.20, categoriaId: "materiales", subcategoria: "Placas PYL", paginaCatalogo: 27, esEstandar: true, tipo: "estandar" },

  // --- CERÁMICA ---
  { sku: "25073602", nombre: "TARIMA ROBLE (Aspecto Madera)", formato: "m²", precioUnitario: 7.95, categoriaId: "ceramica", subcategoria: "Suelos", paginaCatalogo: 122, esEstandar: true, tipo: "estandar" },
  { sku: "25058275", nombre: "CEMENTO COLA H40 GEL (Flexible)", formato: "Saco 20kg", precioUnitario: 14.35, categoriaId: "ceramica", subcategoria: "Colocación", paginaCatalogo: 148, esEstandar: true, tipo: "estandar" },

  // --- BAÑOS (Pág 196-201) ---
  // Inodoros (WC) y Packs (Pág 196)
  { sku: "25023850", nombre: "PACK WC NEREA (Tapa Amortiguada)", formato: "Conjunto", precioUnitario: 189.00, categoriaId: "banos", subcategoria: "Sanitarios", paginaCatalogo: 196, esEstandar: true, tipo: "estandar" },
  { sku: "10745805", nombre: "PACK WC FORMENTERA COMPAC (Rimless)", formato: "Conjunto", precioUnitario: 199.00, categoriaId: "banos", subcategoria: "Sanitarios", paginaCatalogo: 196, tipo: "frecuente" },
  
  // Suspendidos y Bastidores (Pág 197)
  { sku: "10887562", nombre: "BASTIDOR DUPLO ONE ROCA (10.7cm)", formato: "Unidad", precioUnitario: 155.00, categoriaId: "banos", subcategoria: "Sanitarios", paginaCatalogo: 197, esEstandar: true, tipo: "estandar" },
  { sku: "25060608", nombre: "INODORO SUSPENDIDO GAP (Rimless)", formato: "Unidad", precioUnitario: 185.00, categoriaId: "banos", subcategoria: "Sanitarios", paginaCatalogo: 197, tipo: "frecuente" },
  { sku: "10887604", nombre: "PULSADOR DUAL FLUSH (Blanco)", formato: "Unidad", precioUnitario: 45.00, categoriaId: "banos", subcategoria: "Sanitarios", paginaCatalogo: 197, tipo: "frecuente" },

  // Tapas y Accesorios (Pág 197)
  { sku: "10126970", nombre: "TAPA WC VICTORIA (Resina Inox)", formato: "Unidad", precioUnitario: 38.00, categoriaId: "banos", subcategoria: "Sanitarios", paginaCatalogo: 197, esEstandar: true, tipo: "estandar" },
  { sku: "25033830", nombre: "TAPA WC GAP AMORTIGUADA", formato: "Unidad", precioUnitario: 86.00, categoriaId: "banos", subcategoria: "Sanitarios", paginaCatalogo: 197, tipo: "frecuente" },

  // Lavabos (Pág 198)
  { sku: "10203795", nombre: "LAVABO PEDESTAL CAROL (Blanco)", formato: "Unidad", precioUnitario: 36.00, categoriaId: "banos", subcategoria: "Mobiliario", paginaCatalogo: 198, esEstandar: true, tipo: "estandar" },
  { sku: "25050752", nombre: "LAVABO ENCIMERA EXTRAPLANO 61x46", formato: "Unidad", precioUnitario: 65.00, categoriaId: "banos", subcategoria: "Mobiliario", paginaCatalogo: 198, tipo: "frecuente" },

  // Bañeras y Duchas (Pág 199-201)
  { sku: "10097164", nombre: "BAÑERA ACERO CONTESA (150x70)", formato: "Unidad", precioUnitario: 129.00, categoriaId: "banos", subcategoria: "Duchas", paginaCatalogo: 199, esEstandar: true, tipo: "estandar" },
  { sku: "10291302", nombre: "PLATO DE DUCHA RESINA BLANCO 70x120", formato: "70x120 cm", precioUnitario: 90.00, categoriaId: "banos", subcategoria: "Duchas", paginaCatalogo: 201, esEstandar: true, tipo: "estandar" },
  { sku: "10291344", nombre: "PLATO DE DUCHA RESINA NEGRO 70x120", formato: "70x120 cm", precioUnitario: 90.00, categoriaId: "banos", subcategoria: "Duchas", paginaCatalogo: 201, tipo: "frecuente" },

  // --- PINTURA ---
  { sku: "10838583", nombre: "PINTURA PLÁSTICA INTERIOR L3000 BLANCA", formato: "Bote 14L", precioUnitario: 32.50, categoriaId: "pintura", subcategoria: "Interior", paginaCatalogo: 158, esEstandar: true, tipo: "estandar" },
  { sku: "10378326", nombre: "SILICONA ÁCIDA SANITARIOS (Blanca)", formato: "Bote 280ml", precioUnitario: 2.60, categoriaId: "pintura", subcategoria: "Selladores", paginaCatalogo: 172, esEstandar: true, tipo: "estandar" }
];
