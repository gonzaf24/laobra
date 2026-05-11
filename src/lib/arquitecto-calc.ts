// ─────────────────────────────────────────────────
// Módulo Arquitecto — Motor de Cálculos
// Todas las fórmulas son idénticas a las de /calculos
// ─────────────────────────────────────────────────

import type {
  EstanciaObra,
  Obra,
  SeccionSuelo,
  SeccionAlicatado,
  SeccionParedes,
  SeccionTecho,
  SeccionPintura,
} from "./arquitecto-types";

import { MATERIALS_DATA } from "./materials-data";

// ─────────────────────────────────────────────────
// Tablas de referencia
// ─────────────────────────────────────────────────

const M2_POR_PIEZA: Record<string, number> = {
  // Gres Porcelánico
  "gres-30x60": 0.18,
  "gres-60x60": 0.36,
  "gres-90x90": 0.81,
  "gres-120x60": 0.72,
  // Pasta Blanca / Roja
  "pasta-20x20": 0.04,
  "pasta-25x75": 0.1875,
  "pasta-30x60": 0.18,
  "pasta-30x90": 0.27,
  "pasta-33x100": 0.33,
};

const LADRILLOS_DATA: Record<
  string,
  { udsM2: number; udsPalet: number; mortero: string }
> = {
  "hueco-sencillo": { udsM2: 33, udsPalet: 480, mortero: "M-5" },
  "hueco-doble": { udsM2: 33, udsPalet: 320, mortero: "M-5" },
  perforado: { udsM2: 33, udsPalet: 320, mortero: "M-7,5" },
  macizo: { udsM2: 33, udsPalet: 400, mortero: "M-7,5" },
  "bloque-10": { udsM2: 12.5, udsPalet: 100, mortero: "M-7,5" },
  "bloque-20": { udsM2: 12.5, udsPalet: 60, mortero: "M-7,5" },
};

// ─────────────────────────────────────────────────
// Tipos de resultado
// ─────────────────────────────────────────────────

export interface LineaMaterial {
  nombre: string;
  cantidad: number;
  unidad: string;
  categoria: string;
  materialId?: string;
  m2Referencia?: number;
}

export interface ResultadoEstancia {
  estanciaId: string;
  estanciaNombre: string;
  lineas: LineaMaterial[];
}

export interface ResultadoObra {
  porEstancia: ResultadoEstancia[];
  totales: LineaMaterial[];
}

// ─────────────────────────────────────────────────
// Funciones de cálculo por sección
// ─────────────────────────────────────────────────

function calcularCeramica(
  secciones: (SeccionSuelo | SeccionAlicatado)[],
  ubicacion: "Suelo" | "Cerámica Pared"
): LineaMaterial[] {
  const lineas: LineaMaterial[] = [];
  
  for (const seccion of secciones) {
    if (seccion.m2 <= 0) continue;

    // ── Puente de Unión (Suelo o Alicatado) ──
    if (seccion.necesitaPuenteUnion) {
      // Rendimiento: ~5 m²/litro
      const litrosPU = Math.ceil(seccion.m2 / 5);
      lineas.push({
        nombre: `Puente de Unión (${ubicacion})`,
        cantidad: litrosPU,
        unidad: "litros",
        categoria: "Químicos",
        materialId: "puente-union",
      });
    }

    // ── Solo Nivelado (Suelo sin cerámica) ──
    if ("soloNivelado" in seccion && seccion.soloNivelado) {
      // Solo calculamos autonivelante si lo necesita, sin baldosas
      if (
        "necesitaAutonivelante" in seccion &&
        seccion.necesitaAutonivelante &&
        seccion.espesorNivelante > 0
      ) {
        const litros = seccion.m2 * (seccion.espesorNivelante / 100) * 1000;
        const sacosNivel = Math.ceil(litros / 15);
        const esFinito = seccion.espesorNivelante <= 1;
        lineas.push({
          nombre: esFinito
            ? "Cemento Autonivelante de 10"
            : "Cemento Autonivelante de 80",
          cantidad: sacosNivel,
          unidad: "sacos 25kg",
          categoria: "Morteros",
          materialId: esFinito ? "autonivelante-10" : "autonivelante-80",
        });
      }
      continue; // No calcular baldosas, cola, ni juntas
    }

    // ── Baldosas ──
    const key = `${seccion.tipoBaldosa}-${seccion.medida}`;
    const m2Pieza = M2_POR_PIEZA[key] || 0.36;
    const m2ConMerma = seccion.m2 * (1 + seccion.merma / 100);
    const piezas = Math.ceil(m2ConMerma / m2Pieza);
    const tipoLabel =
      seccion.tipoBaldosa === "gres" ? "Gres Porcelánico" : "Cerámica Pasta Blanca/Roja";
    lineas.push({
      nombre: `${tipoLabel} ${seccion.medida} (${ubicacion})`,
      cantidad: piezas,
      unidad: "piezas",
      categoria: "Cerámica",
      materialId: seccion.tipoBaldosa === "gres" ? "gres-porcelanico" : "azulejo-pasta",
      m2Referencia: m2ConMerma,
    });

    // ── Cola ──
    const kgM2 = seccion.encolado === "simple" ? 4 : 7;
    const totalKgCola = seccion.m2 * kgM2;
    const sacosCola = Math.ceil(totalKgCola / 25);
    const colaLabels: Record<string, string> = {
      c1: "Cemento Cola C1 (Básico)",
      c2: "Cemento Cola C2 (Porcelánico)",
      "c2te-s1": "Cemento Cola C2TE S1 (Flexible)",
    };
    const colaIds: Record<string, string> = {
      c1: "cola-c1",
      c2: "cola-c2",
      "c2te-s1": "cola-c2te-s1",
    };
    lineas.push({
      nombre: `${colaLabels[seccion.tipoCola]} (${ubicacion})`,
      cantidad: sacosCola,
      unidad: "sacos 25kg",
      categoria: "Adhesivos",
      materialId: colaIds[seccion.tipoCola],
    });

    // ── Mortero para Juntas ──
    const partes = seccion.medida.split("x").map(Number);
    if (partes.length === 2 && partes[0] > 0 && partes[1] > 0) {
      const A = partes[0] * 10; // cm → mm
      const B = partes[1] * 10;
      const C = seccion.espesorBaldosa;
      const D = seccion.anchoJunta;
      const kgM2Juntas = ((A + B) / (A * B)) * C * D * 1.5;
      const totalKgJuntas = kgM2Juntas * seccion.m2;
      const bolsas = Math.ceil(totalKgJuntas / 5);
      lineas.push({
        nombre: `Mortero para Juntas (${ubicacion})`,
        cantidad: bolsas,
        unidad: "bolsas 5kg",
        categoria: "Juntas",
        materialId: "mortero-juntas",
      });
    }

    // ── Autonivelante (solo suelo) ──
    if (
      "necesitaAutonivelante" in seccion &&
      seccion.necesitaAutonivelante &&
      seccion.espesorNivelante > 0
    ) {
      const litros = seccion.m2 * (seccion.espesorNivelante / 100) * 1000;
      const sacosNivel = Math.ceil(litros / 15);
      const esFinito = seccion.espesorNivelante <= 1;
      const tipoNivelante = esFinito 
        ? "Cemento Autonivelante de 10" 
        : "Cemento Autonivelante de 80";
        
      lineas.push({
        nombre: tipoNivelante,
        cantidad: sacosNivel,
        unidad: "sacos 25kg",
        categoria: "Morteros",
        materialId: esFinito ? "autonivelante-10" : "autonivelante-80",
      });
    }
  }

  return lineas;
}

function calcularParedes(secciones: SeccionParedes[]): LineaMaterial[] {
  const lineas: LineaMaterial[] = [];

  for (const seccion of secciones) {
    if (seccion.m2 <= 0) continue;

    const altura = seccion.alturaMedia || 2.5;

    if (seccion.tipo.startsWith("pladur")) {
      // ─── PLADUR ───
      const nombresPladur: Record<string, string> = {
        "pladur-13": "Placas Pladur 13mm Estándar",
        "pladur-15": "Placas Pladur 15mm Estándar",
        "pladur-hidro": "Placas Pladur Hidrófugo (Verde)",
        "pladur-fuego": "Placas Pladur Ignífugo (Rosa)",
      };
      const idsPladur: Record<string, string> = {
        "pladur-13": "placa-blanca",
        "pladur-15": "placa-blanca",
        "pladur-hidro": "placa-verde",
        "pladur-fuego": "placa-rosa",
      };
      const nombre = nombresPladur[seccion.tipo] || "Placas Pladur";
      const modo = seccion.modoPladur || "tabique-nuevo";
      const caras = seccion.caras || (modo === "tabique-nuevo" ? 2 : 1);

      // Metros lineales de pared (longitud)
      const mlPared = seccion.m2 / altura;

      if (modo === "trasdosado") {
        // ─── TRASDOSADO: Perfil Omega contra pared existente ───
        // Omega cada 60cm → barras necesarias
        const numOmegas = Math.ceil(mlPared / 0.6);
        const barrasOmega = Math.ceil((numOmegas * altura) / 3); // barras de 3m
        lineas.push({
          nombre: "Perfil Omega (Trasdosado)",
          cantidad: barrasOmega,
          unidad: "barras 3m",
          categoria: "Pladur",
          materialId: "perfil-omega",
        });

        // Placas (1 cara)
        const placas = Math.ceil(seccion.m2 / 2.88);
        lineas.push({
          nombre: `${nombre} (Trasdosado)`,
          cantidad: placas,
          unidad: "placas",
          categoria: "Pladur",
          materialId: idsPladur[seccion.tipo] || "placa-blanca",
        });
      } else {
        // ─── TABIQUE NUEVO: Canal + Montante ───
        // Canal: suelo + techo → 2 × longitud pared
        const mlCanal = mlPared * 2;
        const barrasCanal = Math.ceil(mlCanal / 3);
        lineas.push({
          nombre: "Canal (Suelo + Techo)",
          cantidad: barrasCanal,
          unidad: "barras 3m",
          categoria: "Pladur",
          materialId: "perfil-canal",
        });

        // Montante: cada 60cm × altura
        const numMontantes = Math.ceil(mlPared / 0.6) + 1;
        const barrasMontante = Math.ceil((numMontantes * altura) / 3);
        lineas.push({
          nombre: "Montante (Vertical)",
          cantidad: barrasMontante,
          unidad: "barras 3m",
          categoria: "Pladur",
          materialId: "perfil-montante",
        });

        // Placas (2 caras por defecto en tabique nuevo)
        const placas = Math.ceil((seccion.m2 * caras) / 2.88);
        lineas.push({
          nombre: `${nombre} (Tabique ${caras} caras)`,
          cantidad: placas,
          unidad: "placas",
          categoria: "Pladur",
          materialId: idsPladur[seccion.tipo] || "placa-blanca",
        });
      }
    } else {
      // ─── LADRILLOS / BLOQUES ───
      const data = LADRILLOS_DATA[seccion.tipo];
      if (data) {
        const uds = Math.ceil(seccion.m2 * data.udsM2 * 1.1); // 10% merma
        const palets = Math.ceil(uds / data.udsPalet);

        const nombresPieza: Record<string, string> = {
          "hueco-sencillo": "Ladrillo Hueco Sencillo",
          "hueco-doble": "Ladrillo Hueco Doble",
          perforado: "Ladrillo Perforado",
          macizo: "Ladrillo Macizo",
          "bloque-10": "Bloque Hormigón 10cm",
          "bloque-20": "Bloque Hormigón 20cm",
        };
        const idsPieza: Record<string, string> = {
          "hueco-sencillo": "ladrillo-hueco",
          "hueco-doble": "ladrillo-hueco",
          perforado: "ladrillo-perforado",
          macizo: "ladrillo-macizo",
          "bloque-10": "bloque-hormigon",
          "bloque-20": "bloque-hormigon",
        };

        lineas.push({
          nombre: nombresPieza[seccion.tipo] || seccion.tipo,
          cantidad: uds,
          unidad: `uds (${palets} palets)`,
          categoria: "Ladrillos",
          materialId: idsPieza[seccion.tipo],
        });

        // Mortero para asentar
        // Estimación: ~0.02 m³ de mortero por m² de pared
        const sacosM = Math.ceil((seccion.m2 * 0.02 * 1000) / 15);
        lineas.push({
          nombre: `Mortero ${data.mortero} (Asentar)`,
          cantidad: sacosM,
          unidad: "sacos 25kg",
          categoria: "Morteros",
          materialId: data.mortero === "M-5" ? "mortero-m5" : "mortero-m75",
        });

        // ── Enfoscado / Revoque ──
        if (seccion.necesitaEnfoscado) {
          // ~15 kg/m² para enfoscado de 1.5cm
          const sacosEnfoscado = Math.ceil((seccion.m2 * 15) / 25);
          lineas.push({
            nombre: "Mortero Enfoscado / Revoque (Paredes)",
            cantidad: sacosEnfoscado,
            unidad: "sacos 25kg",
            categoria: "Morteros",
            materialId: "mortero-m5",
          });
        }

        // ── Guarnecido de Yeso ──
        if (seccion.necesitaGuarnecidoYeso) {
          // ~13.3 kg/m² para 0.8cm de yeso
          const sacosYeso = Math.ceil((seccion.m2 * 13.3) / 20);
          lineas.push({
            nombre: "Yeso Guarnecido (Paredes)",
            cantidad: sacosYeso,
            unidad: "sacos 20kg",
            categoria: "Yesos",
            materialId: "yeso-manual",
          });
        }
      }
    }
  }

  return lineas;
}

function calcularTecho(secciones: SeccionTecho[]): LineaMaterial[] {
  const lineas: LineaMaterial[] = [];

  for (const seccion of secciones) {
    if (seccion.m2 <= 0) continue;

    if (seccion.tipo === "pladur") {
      // ─── FALSO TECHO PLADUR (Desglose completo) ───
      const tipoPlaca = seccion.tipoPlaca || "blanca";
      const perimetro = seccion.perimetroML || 0;

      const placaNames: Record<string, string> = {
        blanca: "Placas Pladur (Techo)",
        verde: "Placas Pladur Hidrófugo (Techo)",
        rosa: "Placas Pladur Ignífugo (Techo)",
      };
      const placaIds: Record<string, string> = {
        blanca: "placa-blanca",
        verde: "placa-verde",
        rosa: "placa-rosa",
      };

      // 1. Angular L perimetral
      if (perimetro > 0) {
        const barrasAngular = Math.ceil(perimetro / 3);
        lineas.push({
          nombre: "Perfil Angular L (Perímetro Techo)",
          cantidad: barrasAngular,
          unidad: "barras 3m",
          categoria: "Pladur",
          materialId: "perfil-angular",
        });
      }

      // 2. Maestras TC-47 (cada 40cm → ~2.5 ml/m²)
      const mlMaestras = seccion.m2 * 2.5;
      const barrasMaestras = Math.ceil(mlMaestras / 3);
      lineas.push({
        nombre: "Maestra TC-47 (Techo)",
        cantidad: barrasMaestras,
        unidad: "barras 3m",
        categoria: "Pladur",
        materialId: "perfil-maestra",
      });

      // 3. Horquillas de techo (1 por cada m²)
      const horquillas = Math.ceil(seccion.m2);
      lineas.push({
        nombre: "Horquilla de Techo (Clip TC-47)",
        cantidad: horquillas,
        unidad: "uds",
        categoria: "Pladur",
        materialId: "horquilla-techo",
      });

      // 4. Varillas roscadas M6 (1 por horquilla)
      lineas.push({
        nombre: "Varilla Roscada M6",
        cantidad: horquillas,
        unidad: "uds",
        categoria: "Pladur",
        materialId: "varilla-roscada",
      });

      // 5. Placas
      const placas = Math.ceil(seccion.m2 / 2.88);
      lineas.push({
        nombre: placaNames[tipoPlaca] || "Placas Pladur (Techo)",
        cantidad: placas,
        unidad: "placas",
        categoria: "Pladur",
        materialId: placaIds[tipoPlaca] || "placa-blanca",
      });
    } else if (seccion.tipo === "yeso") {
      // ─── ENLUCIDO DE YESO ───
      // Puente de unión si es sobre hormigón
      if (seccion.necesitaPuenteUnion) {
        const litrosPU = Math.ceil(seccion.m2 / 5);
        lineas.push({
          nombre: "Puente de Unión (Techo)",
          cantidad: litrosPU,
          unidad: "litros",
          categoria: "Químicos",
          materialId: "puente-union",
        });
      }

      // ~0.8cm espesor estándar → m² * 0.008 * 1000 / 0.6 ≈ m² * 13.3 kg → /20
      const sacosYeso = Math.ceil((seccion.m2 * 13.3) / 20);
      lineas.push({
        nombre: "Yeso (Techo)",
        cantidad: sacosYeso,
        unidad: "sacos 20kg",
        categoria: "Yesos",
        materialId: "yeso-manual",
      });
    }
    // "pintura-solo" → no añade material de techo, se calcula en pintura
  }

  return lineas;
}

function calcularPintura(secciones: SeccionPintura[]): LineaMaterial[] {
  const lineas: LineaMaterial[] = [];

  for (const seccion of secciones) {
    const m2Total = (seccion.m2Paredes || 0) + (seccion.m2Techo || 0);
    if (m2Total <= 0) continue;

    // ── Imprimación Fijadora ──
    if (seccion.necesitaImprimacion) {
      // Rendimiento: ~8 m²/litro
      const litrosImprimacion = Math.ceil(m2Total / 8);
      lineas.push({
        nombre: "Imprimación Fijadora",
        cantidad: litrosImprimacion,
        unidad: "litros",
        categoria: "Pintura",
        materialId: "imprimacion",
      });
    }

    // ── Pintura plástica ──
    // Rendimiento medio: 10 m²/litro por mano
    const litros = Math.ceil((m2Total * seccion.manos) / 10);
    lineas.push({
      nombre: `Pintura Interior (${seccion.manos} manos)`,
      cantidad: litros,
      unidad: "litros",
      categoria: "Pintura",
      materialId: "pintura-plastica",
    });
  }

  return lineas;
}

// ─────────────────────────────────────────────────
// Cálculo de una estancia completa
// ─────────────────────────────────────────────────

export function calcularEstancia(estancia: EstanciaObra): ResultadoEstancia {
  const lineas: LineaMaterial[] = [
    ...calcularCeramica(estancia.suelo, "Suelo"),
    ...calcularParedes(estancia.paredes),
    ...calcularCeramica(estancia.alicatado, "Cerámica Pared"),
    ...calcularTecho(estancia.techo),
    ...calcularPintura(estancia.pintura),
  ];

  return {
    estanciaId: estancia.id,
    estanciaNombre: estancia.nombre || estancia.tipo,
    lineas,
  };
}

// ─────────────────────────────────────────────────
// Cálculo global de la obra (suma de estancias)
// ─────────────────────────────────────────────────

export function calcularObra(obra: Obra): ResultadoObra {
  const porEstancia = obra.estancias.map(calcularEstancia);

  // Agrupar y sumar líneas por nombre + unidad
  const mapa = new Map<string, LineaMaterial>();
  for (const res of porEstancia) {
    for (const linea of res.lineas) {
      const key = `${linea.nombre}__${linea.unidad}`;
      const existing = mapa.get(key);
      if (existing) {
        existing.cantidad += linea.cantidad;
      } else {
        mapa.set(key, { ...linea });
      }
    }
  }

  // Ordenar por categoría
  const totales = Array.from(mapa.values()).sort((a, b) =>
    a.categoria.localeCompare(b.categoria)
  );

  return { porEstancia, totales };
}

export interface LineaConCoste extends LineaMaterial {
  precioUnitario: number;
  costeTotal: number;
  formatoAplicado: string;
}

export function enriquecerConCostes(
  lineas: LineaMaterial[],
  customPrices: Record<string, number>
): LineaConCoste[] {
  return lineas.map((linea) => {
    let costeTotal = 0;
    let precioUnitario = 0;
    let formatoAplicado = "-";

    const materialDef = MATERIALS_DATA.find((m) => m.id === linea.materialId);

    if (materialDef && materialDef.precios && materialDef.precios.length > 0) {
      // Tomamos el primer formato como referencia base comercial
      const formatoBase = materialDef.precios[0];
      const customKey = `${materialDef.id}_${formatoBase.formato}`;
      const precioComercial = customPrices[customKey] !== undefined ? customPrices[customKey] : formatoBase.precio;
      
      precioUnitario = precioComercial;
      formatoAplicado = formatoBase.formato;

      // Lógica de conversión de necesidades a unidades comerciales
      if (linea.m2Referencia && formatoBase.unidad.includes("m²")) {
        // Cerámica (€/m²) -> compramos los m² (o cajas que sumen m²)
        costeTotal = linea.m2Referencia * precioComercial;
      } else if (linea.unidad === "litros") {
        if (materialDef.id === "pintura-plastica") {
           const bidones = Math.ceil(linea.cantidad / 15);
           costeTotal = bidones * precioComercial;
           formatoAplicado = `Bidón 15L (${bidones} uds)`;
        } else if (materialDef.id === "imprimacion") {
           const botes = Math.ceil(linea.cantidad / 4);
           costeTotal = botes * precioComercial;
           formatoAplicado = `Bote 4L (${botes} uds)`;
        } else if (materialDef.id === "puente-union") {
           // 1L ~ 1kg (bote de 1kg).
           costeTotal = Math.ceil(linea.cantidad) * precioComercial; 
        } else {
           costeTotal = Math.ceil(linea.cantidad) * precioComercial;
        }
      } else if (linea.unidad === "uds" && materialDef.id === "horquilla-techo") {
        const cajas = Math.ceil(linea.cantidad / 100);
        costeTotal = cajas * precioComercial;
        formatoAplicado = `Caja 100 uds (${cajas} uds)`;
      } else if (linea.unidad === "uds" || linea.unidad.includes("palets")) {
        // Ladrillos, varillas (se venden por ud)
        costeTotal = Math.ceil(linea.cantidad) * precioComercial;
      } else {
        // Fallback genérico 1 a 1 (sacos, placas, barras, rollos, etc)
        costeTotal = Math.ceil(linea.cantidad) * precioComercial;
      }
    }

    return {
      ...linea,
      precioUnitario,
      costeTotal,
      formatoAplicado,
    };
  });
}
