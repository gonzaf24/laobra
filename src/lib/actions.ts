"use server";

import prisma from "@/lib/db";
import { Obra, TipoObra, EstanciaObra } from "@/lib/arquitecto-types";
import { PresupuestoObra, TARIFAS_DEFECTO, CONFIG_JORNALEROS_DEFECTO } from "@/lib/presupuesto-types";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

// We need a dummy user id since auth is not implemented yet.
const DUMMY_USER_ID = "cm0y010t1000008lc6o4e3l9v"; 

async function ensureDummyUser() {
  const user = await prisma.user.findUnique({ where: { id: DUMMY_USER_ID } });
  if (!user) {
    await prisma.user.create({
      data: {
        id: DUMMY_USER_ID,
        name: "Admin User",
        email: "admin@laobra.app",
      }
    });
  }
}

// --- OBRAS ---

export async function getObrasAction(): Promise<Obra[]> {
  await ensureDummyUser();
  const obras = await prisma.obra.findMany({
    where: { userId: DUMMY_USER_ID },
    include: { estancias: true, planos: true, gastos: true, presupuesto: true },
    orderBy: { updatedAt: "desc" },
  });

  return obras.map((o: any) => parseObra(o));
}

export async function getObraAction(id: string): Promise<Obra | null> {
  await ensureDummyUser();
  const obra = await prisma.obra.findUnique({
    where: { id, userId: DUMMY_USER_ID },
    include: { estancias: true, planos: true, gastos: true, presupuesto: true },
  });

  if (!obra) return null;
  return parseObra(obra);
}

export async function saveObraAction(obra: Obra): Promise<Obra> {
  await ensureDummyUser();

  // Upsert Obra
  const updatedObra = await prisma.obra.upsert({
    where: { id: obra.id },
    update: {
      nombre: obra.nombre,
      direccion: obra.direccion,
      tipo: obra.tipo === "reforma-integral" ? "REFORMA_INTEGRAL" :
            obra.tipo === "reforma-parcial" ? "REFORMA_PARCIAL" :
            obra.tipo === "acondicionamiento" ? "ACONDICIONAMIENTO" :
            obra.tipo === "obra-nueva" ? "OBRA_NUEVA" : "REHABILITACION_ENERGETICA",
    },
    create: {
      id: obra.id,
      nombre: obra.nombre,
      direccion: obra.direccion,
      userId: DUMMY_USER_ID,
      tipo: obra.tipo === "reforma-integral" ? "REFORMA_INTEGRAL" :
            obra.tipo === "reforma-parcial" ? "REFORMA_PARCIAL" :
            obra.tipo === "acondicionamiento" ? "ACONDICIONAMIENTO" :
            obra.tipo === "obra-nueva" ? "OBRA_NUEVA" : "REHABILITACION_ENERGETICA",
    },
  });

  // Estancias
  if (obra.estancias) {
    for (const est of obra.estancias) {
      await saveEstanciaAction(obra.id, est);
    }
    // Delete missing estancias
    const estIds = obra.estancias.map((e) => e.id);
    await prisma.estancia.deleteMany({
      where: { obraId: obra.id, id: { notIn: estIds } },
    });
  }

  // Gastos
  if (obra.gastos) {
    for (const gasto of obra.gastos) {
      await prisma.gasto.upsert({
        where: { id: gasto.id },
        update: {
          concepto: gasto.concepto,
          importe: gasto.importe,
          categoria: gasto.categoria === "materiales" ? "MATERIALES" :
                     gasto.categoria === "mano-de-obra" ? "MANO_DE_OBRA" :
                     gasto.categoria === "servicios" ? "SERVICIOS" : "OTROS",
          fecha: new Date(gasto.fecha),
          fotoUrl: gasto.fotoUrl,
          proveedor: gasto.proveedor,
          notas: gasto.notas,
        },
        create: {
          id: gasto.id,
          obraId: obra.id,
          concepto: gasto.concepto,
          importe: gasto.importe,
          categoria: gasto.categoria === "materiales" ? "MATERIALES" :
                     gasto.categoria === "mano-de-obra" ? "MANO_DE_OBRA" :
                     gasto.categoria === "servicios" ? "SERVICIOS" : "OTROS",
          fecha: new Date(gasto.fecha),
          fotoUrl: gasto.fotoUrl,
          proveedor: gasto.proveedor,
          notas: gasto.notas,
        },
      });
    }
    const gastoIds = obra.gastos.map((g) => g.id);
    await prisma.gasto.deleteMany({
      where: { obraId: obra.id, id: { notIn: gastoIds } },
    });
  }

  // Planos
  if (obra.planos) {
    for (const plano of obra.planos) {
      await prisma.plano.upsert({
        where: { id: plano.id },
        update: {
          titulo: plano.titulo,
          url: plano.url,
          categoria: plano.categoria === "arquitectura" ? "ARQUITECTURA" :
                     plano.categoria === "instalaciones" ? "INSTALACIONES" :
                     plano.categoria === "detalles" ? "DETALLES" : "OTROS",
          version: plano.version,
          fecha: new Date(plano.fecha),
        },
        create: {
          id: plano.id,
          obraId: obra.id,
          titulo: plano.titulo,
          url: plano.url,
          categoria: plano.categoria === "arquitectura" ? "ARQUITECTURA" :
                     plano.categoria === "instalaciones" ? "INSTALACIONES" :
                     plano.categoria === "detalles" ? "DETALLES" : "OTROS",
          version: plano.version,
          fecha: new Date(plano.fecha),
        },
      });
    }
    const planoIds = obra.planos.map((p) => p.id);
    await prisma.plano.deleteMany({
      where: { obraId: obra.id, id: { notIn: planoIds } },
    });
  }

  revalidatePath(`/gestion`);
  revalidatePath(`/gestion/${obra.id}`);
  return obra;
}

export async function deleteObraAction(id: string): Promise<void> {
  await prisma.obra.delete({ where: { id, userId: DUMMY_USER_ID } });
  revalidatePath(`/gestion`);
}

export async function deletePlanoAction(id: string): Promise<void> {
  await prisma.plano.delete({ where: { id } });
}

export async function uploadPlanoAction(formData: FormData): Promise<{ url: string }> {
  const file = formData.get("file") as File;
  const obraId = formData.get("obraId") as string;
  const categoria = formData.get("categoria") as string;
  
  if (!file || !obraId) {
    throw new Error("Missing file or obraId");
  }

  const filename = `${obraId}/${categoria}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const blob = await put(filename, file, { access: "private" });

  return { url: blob.url };
}

// --- ESTANCIAS ---

export async function saveEstanciaAction(obraId: string, estancia: EstanciaObra): Promise<void> {
  await prisma.estancia.upsert({
    where: { id: estancia.id },
    update: {
      nombre: estancia.nombre,
      tipo: mapTipoEstancia(estancia.tipo),
      suelo: estancia.suelo as any,
      paredes: estancia.paredes as any,
      alicatado: estancia.alicatado as any,
      techo: estancia.techo as any,
      pintura: estancia.pintura as any,
    },
    create: {
      id: estancia.id,
      obraId,
      nombre: estancia.nombre,
      tipo: mapTipoEstancia(estancia.tipo),
      suelo: estancia.suelo as any,
      paredes: estancia.paredes as any,
      alicatado: estancia.alicatado as any,
      techo: estancia.techo as any,
      pintura: estancia.pintura as any,
    },
  });
}

export async function deleteEstanciaAction(id: string): Promise<void> {
  await prisma.estancia.delete({ where: { id } });
}

// --- PRESUPUESTO ---

export async function getPresupuestoAction(obraId: string): Promise<PresupuestoObra> {
  const p = await prisma.presupuesto.findUnique({ where: { obraId } });
  if (!p) {
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

  return {
    obraId: p.obraId,
    tarifas: p.tarifas as any,
    jornaleros: p.jornalerosConfig as any,
    personalAdmin: p.personalAdmin as any,
    partidasExtra: p.partidasExtra as any,
    costesAdicionales: p.costesAdicionales as any,
    porcentajeImprevistos: p.porcentajeImprevistos,
    porcentajeBeneficio: p.porcentajeBeneficio,
    updatedAt: p.updatedAt.toISOString(),
  };
}

export async function savePresupuestoAction(presupuesto: PresupuestoObra): Promise<void> {
  await prisma.presupuesto.upsert({
    where: { obraId: presupuesto.obraId },
    update: {
      tarifas: presupuesto.tarifas as any,
      jornalerosConfig: presupuesto.jornaleros as any,
      personalAdmin: presupuesto.personalAdmin as any,
      partidasExtra: presupuesto.partidasExtra as any,
      costesAdicionales: presupuesto.costesAdicionales as any,
      porcentajeImprevistos: presupuesto.porcentajeImprevistos,
      porcentajeBeneficio: presupuesto.porcentajeBeneficio,
    },
    create: {
      obraId: presupuesto.obraId,
      tarifas: presupuesto.tarifas as any,
      jornalerosConfig: presupuesto.jornaleros as any,
      personalAdmin: presupuesto.personalAdmin as any,
      partidasExtra: presupuesto.partidasExtra as any,
      costesAdicionales: presupuesto.costesAdicionales as any,
      porcentajeImprevistos: presupuesto.porcentajeImprevistos,
      porcentajeBeneficio: presupuesto.porcentajeBeneficio,
    },
  });
}

// --- PRECIOS PERSONALIZADOS ---

export async function getCustomPricesAction(): Promise<Record<string, number>> {
  await ensureDummyUser();
  const prices = await prisma.customPrice.findMany({ where: { userId: DUMMY_USER_ID } });
  const result: Record<string, number> = {};
  for (const p of prices) {
    result[`${p.materialId}_${p.formato}`] = p.precio;
  }
  return result;
}

export async function saveCustomPriceAction(materialId: string, formato: string, precio: number): Promise<void> {
  await ensureDummyUser();
  await prisma.customPrice.upsert({
    where: {
      userId_materialId_formato: {
        userId: DUMMY_USER_ID,
        materialId,
        formato,
      }
    },
    update: { precio },
    create: {
      userId: DUMMY_USER_ID,
      materialId,
      formato,
      precio,
    }
  });
}

export async function removeCustomPriceAction(materialId: string, formato: string): Promise<void> {
  await ensureDummyUser();
  try {
    await prisma.customPrice.delete({
      where: {
        userId_materialId_formato: {
          userId: DUMMY_USER_ID,
          materialId,
          formato,
        }
      }
    });
  } catch (e) {
    // Ignore if not exists
  }
}

// --- HELPERS ---

function parseObra(dbObra: any): Obra {
  return {
    id: dbObra.id,
    nombre: dbObra.nombre,
    direccion: dbObra.direccion,
    tipo: dbObra.tipo === "REFORMA_INTEGRAL" ? "reforma-integral" :
          dbObra.tipo === "REFORMA_PARCIAL" ? "reforma-parcial" :
          dbObra.tipo === "ACONDICIONAMIENTO" ? "acondicionamiento" :
          dbObra.tipo === "OBRA_NUEVA" ? "obra-nueva" : "rehabilitacion-energetica",
    estancias: (dbObra.estancias || []).map((e: any) => ({
      id: e.id,
      tipo: unmapTipoEstancia(e.tipo),
      nombre: e.nombre,
      suelo: Array.isArray(e.suelo) ? e.suelo : [],
      paredes: Array.isArray(e.paredes) ? e.paredes : [],
      alicatado: Array.isArray(e.alicatado) ? e.alicatado : [],
      techo: Array.isArray(e.techo) ? e.techo : [],
      pintura: Array.isArray(e.pintura) ? e.pintura : [],
    })).sort((a: any, b: any) => a.orden - b.orden),
    planos: (dbObra.planos || []).map((p: any) => ({
      id: p.id,
      titulo: p.titulo,
      url: p.url,
      categoria: p.categoria === "ARQUITECTURA" ? "arquitectura" :
                 p.categoria === "INSTALACIONES" ? "instalaciones" :
                 p.categoria === "DETALLES" ? "detalles" : "otros",
      version: p.version,
      fecha: p.fecha.toISOString(),
    })),
    gastos: (dbObra.gastos || []).map((g: any) => ({
      id: g.id,
      concepto: g.concepto,
      importe: g.importe,
      categoria: g.categoria === "MATERIALES" ? "materiales" :
                 g.categoria === "MANO_DE_OBRA" ? "mano-de-obra" :
                 g.categoria === "SERVICIOS" ? "servicios" : "otros",
      fecha: g.fecha.toISOString(),
      fotoUrl: g.fotoUrl || undefined,
      proveedor: g.proveedor || undefined,
      notas: g.notas || undefined,
    })),
    updatedAt: dbObra.updatedAt.toISOString(),
    createdAt: dbObra.createdAt.toISOString(),
  };
}

function mapTipoEstancia(tipo: string): any {
  const map: any = {
    dormitorio: "DORMITORIO",
    "baño": "BANO",
    cocina: "COCINA",
    salon: "SALON",
    terraza: "TERRAZA",
    pasillo: "PASILLO",
    lavadero: "LAVADERO",
    sotano: "SOTANO",
    otro: "OTRO",
  };
  return map[tipo] || "OTRO";
}

function unmapTipoEstancia(tipo: string): string {
  const map: any = {
    DORMITORIO: "dormitorio",
    BANO: "baño",
    COCINA: "cocina",
    SALON: "salon",
    TERRAZA: "terraza",
    PASILLO: "pasillo",
    LAVADERO: "lavadero",
    SOTANO: "sotano",
    OTRO: "otro",
  };
  return map[tipo] || "otro";
}
