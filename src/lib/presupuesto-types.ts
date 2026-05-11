// ─────────────────────────────────────────────────
// Módulo Presupuesto — Modelo de Datos
// ─────────────────────────────────────────────────

// Tarifas de mano de obra por tipo de trabajo (€/m²)
export interface TarifasManoDeObra {
  solado: number;               // Colocación cerámica suelo
  alicatado: number;            // Colocación cerámica pared
  tabiqueriaPladur: number;     // Montaje tabiquería de pladur
  tabioqueriaLadrillo: number;  // Levantamiento tabiquería ladrillo
  falsoTechoPladur: number;     // Montaje falso techo pladur
  enlucidoYesoTecho: number;    // Enlucido yeso techo
  pintura: number;              // Pintura paredes y techos
  enfoscado: number;            // Enfoscado / revoque de paredes
  guarnecidoYeso: number;       // Guarnecido de yeso en paredes
  demolicionSuelo: number;      // Picado de suelo existente
  demolicionTabique: number;    // Picado de tabiquería
  desescombro: number;          // Carga y bajada de escombro
  nivelado: number;             // Nivelado / autonivelante
}

// Tarifas por defecto (mercado español 2026, precios medios)
export const TARIFAS_DEFECTO: TarifasManoDeObra = {
  solado: 22,
  alicatado: 25,
  tabiqueriaPladur: 30,
  tabioqueriaLadrillo: 35,
  falsoTechoPladur: 28,
  enlucidoYesoTecho: 14,
  pintura: 8,
  enfoscado: 15,
  guarnecidoYeso: 12,
  demolicionSuelo: 12,
  demolicionTabique: 15,
  desescombro: 8,
  nivelado: 12,
};

// ─── Modelo Jornaleros ───

export type NivelRendimiento = "bajo" | "normal" | "alto";

export interface PersonalAdmin {
  id: string;
  nombre: string;
  tipo: "jornal" | "fijo";
  valor: number; // €/día si es jornal, € totales si es fijo
}

export interface ConfigJornaleros {
  activo: boolean;
  precioJornal: number; // €/día por operario
  numOperarios: number; // Nº de albañiles en la cuadrilla
  rendimiento: NivelRendimiento;
  trabajaSabados: boolean;
  // % de tiempo no productivo por jornada (preparación, limpieza, esperas, etc.)
  porcentajeTiempoMuerto: number;
  trabajosExcluidos: string[]; // Claves de RENDIMIENTOS_MEDIOS que NO hace la cuadrilla
}

export const CONFIG_JORNALEROS_DEFECTO: ConfigJornaleros = {
  activo: false,
  precioJornal: 120, // €/día (oficial + peón aprox.)
  numOperarios: 2,
  rendimiento: "normal",
  trabajaSabados: false,
  porcentajeTiempoMuerto: 20,
  trabajosExcluidos: [],
};

// Rendimiento medio en m²/día para 1 operario a rendimiento "normal"
// Basado en tablas de rendimientos de construcción del sector español
export const RENDIMIENTOS_MEDIOS: Record<string, { m2dia: number; label: string; desc: string }> = {
  demolicionSuelo:    { m2dia: 10, label: "Demolición de suelo y rodapié", desc: "Quitar el suelo viejo y los zócalos (la tira que va en la base de la pared)." },
  demolicionTabique:  { m2dia: 8,  label: "Tirar Tabiquería / Pared", desc: "Tirar paredes viejas de ladrillo o pladur para abrir espacios nuevos." },
  desescombro:        { m2dia: 6,  label: "Desescombro y limpieza", desc: "Recoger los restos, meterlos en sacos y llevarlos al contenedor de la calle." },
  nivelado:           { m2dia: 20, label: "Nivelado / Autonivelante", desc: "Echar una pasta para que el suelo quede plano antes de poner el nuevo." },
  solado:             { m2dia: 10, label: "Solado / Suelo Cerámico", desc: "Poner el suelo nuevo (baldosas, gres, etc.) y rellenar las juntas." },
  alicatado:          { m2dia: 8,  label: "Alicatado / Azulejos Pared", desc: "Pegar los azulejos en las paredes (baños/cocinas) y rematar las juntas." },
  tabiqueriaPladur:   { m2dia: 10, label: "Tabiquería / Pared Pladur", desc: "Hacer paredes nuevas usando placas de yeso y metal (rápido y limpio)." },
  tabioqueriaLadrillo:{ m2dia: 6,  label: "Tabiquería / Pared Ladrillo", desc: "Levantar paredes nuevas usando ladrillos de toda la vida y cemento." },
  enfoscado:          { m2dia: 12, label: "Enfoscado / Base Cemento", desc: "Dar una capa de cemento a los ladrillos para dejarlos rectos y duros." },
  guarnecidoYeso:     { m2dia: 15, label: "Guarnecido / Alisar Pared", desc: "Dar yeso blanco para que la pared quede suave, lisa y lista para pintar." },
  falsoTechoPladur:   { m2dia: 10, label: "Falso techo Pladur", desc: "Poner un techo nuevo más bajo para tapar cables o poner luces." },
  enlucidoYesoTecho:  { m2dia: 12, label: "Enlucido / Alisar Techo", desc: "Alisar el techo con yeso para que quede perfecto y sin bultos." },
  pintura:            { m2dia: 25, label: "Pintura", desc: "Lijar paredes, tapar fallos y dar el color (mínimo 2 manos)." },
};

// Factores multiplicadores por nivel de rendimiento
export const FACTORES_RENDIMIENTO: Record<NivelRendimiento, number> = {
  bajo: 0.7,    // Operario lento / obra difícil
  normal: 1.0,
  alto: 1.3,    // Operario muy experimentado / obra fácil
};

// Resultado de cálculo de jornaleros
export interface LineaJornalero {
  concepto: string;
  m2: number;
  rendimientoEfectivo: number; // m²/día real (con factores aplicados)
  diasOperario: number;        // Días-operario necesarios (Jornadas)
  diasCalendario: number;      // Días calendario (depende de nº operarios)
  esEspecialista: boolean;     // Si lo hace un externo
}

export interface ResumenJornaleros {
  lineas: LineaJornalero[];
  totalJornadasCuadrilla: number;
  totalJornadasEspecialistas: number;
  totalDiasObra: number;
  totalSemanasObra: number;
  costeJornalesCuadrilla: number;
  costeAdmin: number;
  costeTotalManoDeObra: number;
  // Compatibilidad con código anterior
  totalDiasOperario: number;
  totalDiasCalendario: number;
  totalSemanasCalendario: number;
  costeTotal: number;
}

// ─── Línea de coste adicional ───

export interface CosteAdicional {
  id: string;
  concepto: string;
  cantidad: number;
  precioUnitario: number;
}

export const COSTES_COMUNES: Omit<CosteAdicional, "id">[] = [
  { concepto: "Contenedor de escombros (6m³)", cantidad: 1, precioUnitario: 350 },
  { concepto: "Licencia de obra menor", cantidad: 1, precioUnitario: 500 },
  { concepto: "Transporte de materiales", cantidad: 2, precioUnitario: 80 },
  { concepto: "Limpieza final de obra", cantidad: 1, precioUnitario: 300 },
  { concepto: "Equipos de protección (EPI)", cantidad: 1, precioUnitario: 150 },
];

// ─── Línea de mano de obra manual (Especialistas extra) ───

export interface PartidaManoObra {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;       // "Suelos", "Paredes", "Techos", "Instalaciones", etc.
  cantidad: number;
  precioUnitario: number;
  unidad: string;          // "m2", "ud", "ml", "global"
}

// ─── Presupuesto completo ───

export interface PresupuestoObra {
  obraId: string;
  tarifas: TarifasManoDeObra;
  jornaleros: ConfigJornaleros;
  personalAdmin: PersonalAdmin[];
  partidasExtra: PartidaManoObra[]; // Partidas añadidas manualmente
  costesAdicionales: CosteAdicional[];
  porcentajeImprevistos: number;
  porcentajeBeneficio: number;
  updatedAt: string;
}

// Resultado calculado de mano de obra por estancia (modo especialista)
export interface LineaManoDeObra {
  estanciaId: string;
  estanciaNombre: string;
  concepto: string;
  m2: number;
  tarifa: number;
  total: number;
}

// Resumen completo del presupuesto
export interface ResumenPresupuesto {
  totalMateriales: number;
  totalManoDeObra: number;         // Especialistas €/m²
  totalJornaleros: number;         // Cuadrilla por jornales
  totalAdmin: number;              // Gestión y administración (Universal)
  totalCostesAdicionales: number;
  subtotal: number;
  importeImprevistos: number;
  importeBeneficio: number;
  totalGeneral: number;
  lineasManoDeObra: LineaManoDeObra[];
  resumenJornaleros: ResumenJornaleros | null;
}
