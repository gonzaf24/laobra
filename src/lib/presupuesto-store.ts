// ─────────────────────────────────────────────────
// Módulo Presupuesto — Persistencia y Cálculo
// ─────────────────────────────────────────────────

import {
  type PresupuestoObra,
  type TarifasManoDeObra,
  type LineaManoDeObra,
  type ResumenPresupuesto,
  type ConfigJornaleros,
  type LineaJornalero,
  type ResumenJornaleros,
  type PartidaManoObra,
  TARIFAS_DEFECTO,
  CONFIG_JORNALEROS_DEFECTO,
  RENDIMIENTOS_MEDIOS,
  FACTORES_RENDIMIENTO,
} from "./presupuesto-types";

import type { Obra, EstanciaObra } from "./arquitecto-types";
import { calcularObra, enriquecerConCostes } from "./arquitecto-calc";

const STORAGE_KEY = "laobra-presupuestos";

// ── Lectura / Escritura ──

function getAll(): Record<string, PresupuestoObra> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getPresupuesto(obraId: string): PresupuestoObra {
  const all = getAll();
  if (all[obraId]) {
    const p = all[obraId];
    // Migraciones
    if (!p.jornaleros) p.jornaleros = { ...CONFIG_JORNALEROS_DEFECTO };
    if (!p.partidasExtra) p.partidasExtra = [];
    
    // Migrar personalAdmin de jornaleros a la raíz si existe
    if (!p.personalAdmin) {
      p.personalAdmin = (p.jornaleros as any).personalAdmin || [];
    }
    
    return p;
  }
  return {
    obraId,
    tarifas: { ...TARIFAS_DEFECTO },
    jornaleros: { ...CONFIG_JORNALEROS_DEFECTO },
    personalAdmin: [],
    partidasExtra: [],
    costesAdicionales: [],
    porcentajeImprevistos: 10,
    porcentajeBeneficio: 0,
    updatedAt: new Date().toISOString(),
  };
}

export function savePresupuesto(presupuesto: PresupuestoObra): void {
  const all = getAll();
  presupuesto.updatedAt = new Date().toISOString();
  all[presupuesto.obraId] = presupuesto;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

// ── Cálculo Mano de Obra (Modo Especialista €/m²) ──

function calcularManoDeObraEstancia(
  est: EstanciaObra,
  tarifas: TarifasManoDeObra
): LineaManoDeObra[] {
  const lineas: LineaManoDeObra[] = [];
  const nombre = est.nombre || est.tipo;

  for (const s of est.suelo) {
    if (s.m2 <= 0) continue;
    if (s.necesitaPicado) {
      lineas.push({
        estanciaId: est.id,
        estanciaNombre: nombre,
        concepto: "Demolición suelo existente",
        m2: s.m2,
        tarifa: tarifas.demolicionSuelo,
        total: s.m2 * tarifas.demolicionSuelo,
      });
    }
    if (s.soloNivelado) {
      lineas.push({
        estanciaId: est.id,
        estanciaNombre: nombre,
        concepto: "Nivelado de suelo",
        m2: s.m2,
        tarifa: tarifas.nivelado,
        total: s.m2 * tarifas.nivelado,
      });
    } else {
      lineas.push({
        estanciaId: est.id,
        estanciaNombre: nombre,
        concepto: "Colocación cerámica suelo",
        m2: s.m2,
        tarifa: tarifas.solado,
        total: s.m2 * tarifas.solado,
      });
      if (s.necesitaAutonivelante && s.espesorNivelante > 0) {
        lineas.push({
          estanciaId: est.id,
          estanciaNombre: nombre,
          concepto: "Aplicación autonivelante",
          m2: s.m2,
          tarifa: tarifas.nivelado,
          total: s.m2 * tarifas.nivelado,
        });
      }
    }
  }

  for (const p of est.paredes) {
    if (p.m2 <= 0) continue;
    const esPladur = p.tipo.startsWith("pladur");
    const tarifa = esPladur
      ? tarifas.tabiqueriaPladur
      : tarifas.tabioqueriaLadrillo;
    lineas.push({
      estanciaId: est.id,
      estanciaNombre: nombre,
      concepto: esPladur ? "Tabiquería de Pladur" : "Tabiquería de Ladrillo",
      m2: p.m2,
      tarifa,
      total: p.m2 * tarifa,
    });
    if (!esPladur && p.necesitaEnfoscado) {
      lineas.push({
        estanciaId: est.id,
        estanciaNombre: nombre,
        concepto: "Enfoscado de paredes",
        m2: p.m2,
        tarifa: tarifas.enfoscado,
        total: p.m2 * tarifas.enfoscado,
      });
    }
    if (!esPladur && p.necesitaGuarnecidoYeso) {
      lineas.push({
        estanciaId: est.id,
        estanciaNombre: nombre,
        concepto: "Guarnecido de yeso",
        m2: p.m2,
        tarifa: tarifas.guarnecidoYeso,
        total: p.m2 * tarifas.guarnecidoYeso,
      });
    }
  }

  for (const a of est.alicatado) {
    if (a.m2 <= 0) continue;
    lineas.push({
      estanciaId: est.id,
      estanciaNombre: nombre,
      concepto: "Alicatado cerámica pared",
      m2: a.m2,
      tarifa: tarifas.alicatado,
      total: a.m2 * tarifas.alicatado,
    });
  }

  for (const t of est.techo) {
    if (t.m2 <= 0) continue;
    if (t.tipo === "pladur") {
      lineas.push({
        estanciaId: est.id,
        estanciaNombre: nombre,
        concepto: "Falso techo de Pladur",
        m2: t.m2,
        tarifa: tarifas.falsoTechoPladur,
        total: t.m2 * tarifas.falsoTechoPladur,
      });
    } else if (t.tipo === "yeso") {
      lineas.push({
        estanciaId: est.id,
        estanciaNombre: nombre,
        concepto: "Enlucido de yeso techo",
        m2: t.m2,
        tarifa: tarifas.enlucidoYesoTecho,
        total: t.m2 * tarifas.enlucidoYesoTecho,
      });
    }
  }

  for (const pi of est.pintura) {
    const m2Total = (pi.m2Paredes || 0) + (pi.m2Techo || 0);
    if (m2Total <= 0) continue;
    lineas.push({
      estanciaId: est.id,
      estanciaNombre: nombre,
      concepto: `Pintura (${pi.manos} manos)`,
      m2: m2Total,
      tarifa: tarifas.pintura,
      total: m2Total * tarifas.pintura,
    });
  }

  return lineas;
}

// ── Cálculo Jornaleros ──

/**
 * Agrupa todos los m² de la obra por tipo de trabajo y calcula
 * cuántos días-operario y días-calendario se necesitan.
 */
function calcularJornaleros(
  obra: Obra,
  config: ConfigJornaleros,
  partidasExtra: PartidaManoObra[] = []
): ResumenJornaleros {
  // 1. Acumular m² por tipo de trabajo
  const acumulado: Record<string, number> = {};

  let m2DemolicionTotal = 0;

  for (const est of obra.estancias) {
    for (const s of est.suelo) {
      if (s.m2 <= 0) continue;
      if (s.necesitaPicado) {
        acumulado["demolicionSuelo"] = (acumulado["demolicionSuelo"] || 0) + s.m2;
        m2DemolicionTotal += s.m2;
      }
      if (s.soloNivelado) {
        acumulado["nivelado"] = (acumulado["nivelado"] || 0) + s.m2;
      } else {
        acumulado["solado"] = (acumulado["solado"] || 0) + s.m2;
        if (s.necesitaAutonivelante)
          acumulado["nivelado"] = (acumulado["nivelado"] || 0) + s.m2;
      }
    }
    for (const p of est.paredes) {
      if (p.m2 <= 0) continue;

      if (p.necesitaDemolicion) {
        acumulado["demolicionTabique"] = (acumulado["demolicionTabique"] || 0) + p.m2;
        m2DemolicionTotal += p.m2;
      } else {
        // Solo construimos si no estamos demoliendo
        const key = p.tipo.startsWith("pladur")
          ? "tabiqueriaPladur"
          : "tabioqueriaLadrillo";
        acumulado[key] = (acumulado[key] || 0) + p.m2;
        if (!p.tipo.startsWith("pladur") && p.necesitaEnfoscado)
          acumulado["enfoscado"] = (acumulado["enfoscado"] || 0) + p.m2;
        if (!p.tipo.startsWith("pladur") && p.necesitaGuarnecidoYeso)
          acumulado["guarnecidoYeso"] = (acumulado["guarnecidoYeso"] || 0) + p.m2;
      }
    }
    // ... (resto de bucles)
    for (const a of est.alicatado) {
      if (a.m2 <= 0) continue;
      acumulado["alicatado"] = (acumulado["alicatado"] || 0) + a.m2;
    }
    for (const t of est.techo) {
      if (t.m2 <= 0) continue;
      if (t.tipo === "pladur")
        acumulado["falsoTechoPladur"] =
          (acumulado["falsoTechoPladur"] || 0) + t.m2;
      else if (t.tipo === "yeso")
        acumulado["enlucidoYesoTecho"] =
          (acumulado["enlucidoYesoTecho"] || 0) + t.m2;
    }
    for (const pi of est.pintura) {
      const m2 = (pi.m2Paredes || 0) + (pi.m2Techo || 0);
      if (m2 <= 0) continue;
      acumulado["pintura"] = (acumulado["pintura"] || 0) + m2;
    }
  }

  // 1.1. Añadir Desescombro automático
  if (m2DemolicionTotal > 0) {
    acumulado["desescombro"] = m2DemolicionTotal;
  }

  // 2. Calcular días por tipo de trabajo
  const factorRendimiento = FACTORES_RENDIMIENTO[config.rendimiento];
  const tiempoMuertoClamped = Math.min(
    50,
    Math.max(5, config.porcentajeTiempoMuerto)
  );
  const factorProductivo = 1 - tiempoMuertoClamped / 100;
  const numOp = Math.max(1, config.numOperarios);
  const excluidos = config.trabajosExcluidos || [];
  const nombresManuales = partidasExtra.map((p) => p.nombre);

  const lineas: LineaJornalero[] = [];
  let totalJornadasCuadrilla = 0;
  let totalJornadasEspecialistas = 0;
  let totalDiasCalendario = 0;

  for (const [key, m2Auto] of Object.entries(acumulado)) {
    const rend = RENDIMIENTOS_MEDIOS[key];
    if (!rend) continue;

    const partidaManual = partidasExtra.find((p) => p.nombre === rend.label);
    const isEspecialista = excluidos.includes(key) || !!partidaManual;

    // Si hay una partida manual con el mismo nombre, su cantidad es la que manda
    // para el cálculo del tiempo. Si no, usamos los m² automáticos del planificador.
    const m2Efectivos = partidaManual ? partidaManual.cantidad : m2Auto;

    if (m2Efectivos <= 0) continue;

    const rendEfectivo = Math.max(
      0.5,
      rend.m2dia * factorRendimiento * factorProductivo
    );
    const jornadas = m2Efectivos / rendEfectivo;

    // Para el calendario usamos la velocidad de la cuadrilla (numOp)
    const diasCal = jornadas / numOp;

    if (isEspecialista) {
      totalJornadasEspecialistas += jornadas;
    } else {
      totalJornadasCuadrilla += jornadas;
    }
    totalDiasCalendario += diasCal;

    lineas.push({
      concepto: rend.label,
      m2: m2Efectivos,
      rendimientoEfectivo: Math.round(rendEfectivo * 10) / 10,
      diasOperario: Math.round(jornadas * 10) / 10,
      diasCalendario: Math.round(diasCal * 10) / 10,
      esEspecialista: isEspecialista,
    });
  }

  // Ordenar por fases lógicas de obra
  const orden = [
    "demolicionSuelo",
    "demolicionTabique",
    "desescombro",
    "nivelado",
    "tabioqueriaLadrillo",
    "tabiqueriaPladur",
    "enfoscado",
    "guarnecidoYeso",
    "falsoTechoPladur",
    "enlucidoYesoTecho",
    "solado",
    "alicatado",
    "pintura",
  ];
  lineas.sort((a, b) => {
    const ia = orden.findIndex(
      (k) => RENDIMIENTOS_MEDIOS[k]?.label === a.concepto
    );
    const ib = orden.findIndex(
      (k) => RENDIMIENTOS_MEDIOS[k]?.label === b.concepto
    );
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  const diasPorSemana = config.trabajaSabados ? 6 : 5;
  const totalSemanas = totalDiasCalendario / diasPorSemana;
  const costeCuadrilla = Math.ceil(totalJornadasCuadrilla) * config.precioJornal;

  return {
    lineas,
    totalJornadasCuadrilla: Math.ceil(totalJornadasCuadrilla),
    totalJornadasEspecialistas: Math.ceil(totalJornadasEspecialistas),
    totalDiasObra: Math.ceil(totalDiasCalendario),
    totalSemanasObra: Math.round(totalSemanas * 10) / 10,
    costeJornalesCuadrilla: costeCuadrilla,
    costeAdmin: 0, // Se calcula fuera ahora
    costeTotalManoDeObra: costeCuadrilla,
    // Compatibilidad
    totalDiasOperario: Math.ceil(
      totalJornadasCuadrilla + totalJornadasEspecialistas
    ),
    totalDiasCalendario: Math.ceil(totalDiasCalendario),
    totalSemanasCalendario: Math.round(totalSemanas * 10) / 10,
    costeTotal: costeCuadrilla,
  };
}

// ── Cálculo Principal ──

export function calcularPresupuesto(
  obra: Obra,
  presupuesto: PresupuestoObra,
  customPrices: Record<string, number>
): ResumenPresupuesto {
  // 1. Materiales
  const resultadoObra = calcularObra(obra);
  const materialesConCoste = enriquecerConCostes(
    resultadoObra.totales,
    customPrices
  );
  const totalMateriales = materialesConCoste.reduce(
    (sum, l) => sum + l.costeTotal,
    0
  );

  // 2. Mano de obra (especialistas €/m²)
  const lineasManoDeObra: LineaManoDeObra[] = [];
  for (const est of obra.estancias) {
    lineasManoDeObra.push(
      ...calcularManoDeObraEstancia(est, presupuesto.tarifas)
    );
  }

  // Añadir partidas extra de mano de obra a las líneas
  const totalPartidasExtra = (presupuesto.partidasExtra || []).reduce(
    (sum, p) => sum + p.cantidad * p.precioUnitario,
    0
  );

  const totalManoDeObra =
    lineasManoDeObra.reduce((sum, l) => sum + l.total, 0) + totalPartidasExtra;

  // 3. Jornaleros
  let resumenJornaleros: ResumenJornaleros | null = null;
  let totalJornaleros = 0;

  if (presupuesto.jornaleros?.activo) {
    resumenJornaleros = calcularJornaleros(
      obra,
      presupuesto.jornaleros,
      presupuesto.partidasExtra
    );

    const excluidos = presupuesto.jornaleros.trabajosExcluidos || [];
    const nombresManuales = (presupuesto.partidasExtra || []).map(
      (p) => p.nombre
    );

    const mappingConceptos: Record<string, keyof TarifasManoDeObra> = {
      demolicionSuelo: "demolicionSuelo",
      demolicionTabique: "demolicionTabique",
      desescombro: "desescombro",
      nivelado: "nivelado",
      solado: "solado",
      alicatado: "alicatado",
      tabiqueriaPladur: "tabiqueriaPladur",
      tabioqueriaLadrillo: "tabioqueriaLadrillo",
      enfoscado: "enfoscado",
      guarnecidoYeso: "guarnecidoYeso",
      falsoTechoPladur: "falsoTechoPladur",
      enlucidoYesoTecho: "enlucidoYesoTecho",
      pintura: "pintura",
    };

    const extraEspecialistasExcluidos = lineasManoDeObra
      .filter((l) => {
        const key = Object.keys(mappingConceptos).find(
          (k) => RENDIMIENTOS_MEDIOS[k]?.label === l.concepto
        );
        const isExcludedByChecklist = key && excluidos.includes(key);
        const hasManualEntry = nombresManuales.includes(l.concepto);

        return isExcludedByChecklist && !hasManualEntry;
      })
      .reduce((sum, l) => sum + l.total, 0);

    totalJornaleros =
      resumenJornaleros.costeTotal +
      totalPartidasExtra +
      extraEspecialistasExcluidos;
  }

  // 4. Personal de Administración (Universal)
  // Calculamos el coste administrativo basándonos en el plazo estimado
  const diasObra = resumenJornaleros?.totalDiasObra || 20; // Default 20 días si no hay cálculo temporal
  let totalAdmin = 0;
  if (presupuesto.personalAdmin) {
    presupuesto.personalAdmin.forEach((admin) => {
      if (admin.tipo === "jornal") {
        totalAdmin += admin.valor * diasObra;
      } else {
        totalAdmin += admin.valor;
      }
    });
  }

  // 5. Costes adicionales
  const totalCostesAdicionales = presupuesto.costesAdicionales.reduce(
    (sum, c) => sum + c.cantidad * c.precioUnitario,
    0
  );

  // 6. Subtotal
  const manoDeObraEfectiva = presupuesto.jornaleros?.activo
    ? totalJornaleros
    : totalManoDeObra;

  const subtotal =
    totalMateriales +
    manoDeObraEfectiva +
    totalAdmin + // Ahora se suma por separado para claridad
    totalCostesAdicionales;

  // 7. Imprevistos y beneficio
  const importeImprevistos =
    subtotal * (presupuesto.porcentajeImprevistos / 100);
  const importeBeneficio =
    (subtotal + importeImprevistos) * (presupuesto.porcentajeBeneficio / 100);
  const totalGeneral = subtotal + importeImprevistos + importeBeneficio;

  // Actualizamos el resumenJornaleros si existe con el coste real de admin
  if (resumenJornaleros) {
    resumenJornaleros.costeAdmin = totalAdmin;
    resumenJornaleros.costeTotalManoDeObra =
      resumenJornaleros.costeJornalesCuadrilla + totalAdmin;
  }

  return {
    totalMateriales,
    totalManoDeObra,
    totalJornaleros,
    totalAdmin, // Nuevo campo en el resumen
    totalCostesAdicionales,
    subtotal,
    importeImprevistos,
    importeBeneficio,
    totalGeneral,
    lineasManoDeObra,
    resumenJornaleros,
  };
}
