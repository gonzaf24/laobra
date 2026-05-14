"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  PenTool,
  Calendar,
  FileText,
  Camera,
  Users,
  Settings,
  MapPin,
  ChevronRight,
  Calculator,
  Layout,
  Construction,
} from "lucide-react";
import { getObra } from "@/lib/arquitecto-store";
import type { Obra } from "@/lib/arquitecto-types";
import { TIPOS_OBRA } from "@/lib/arquitecto-types";

export default function ObraDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const [obra, setObra] = useState<Obra | null>(null);

  useEffect(() => {
    if (params.obraId) {
      const data = getObra(params.obraId as string);
      if (data) {
        queueMicrotask(() => {
          setObra(data);
        });
      } else {
        router.push("/gestion");
      }
    }
  }, [params.obraId, router]);

  if (!obra) return null;

  const tipoLabel = TIPOS_OBRA.find((t) => t.value === obra.tipo)?.label || obra.tipo;

  const adminFeatures = [
// ... (rest of adminFeatures)
    {
      id: "arquitecto",
      name: "Configuración Técnica",
      description: "Cuantificación experta de materiales y desglose técnico por estancia.",
      icon: PenTool,
      href: `/gestion/${obra.id}/planificador`,
      active: true,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
    },
    {
      id: "genesis",
      name: "Génesis Técnica",
      description: "Motor maestro de cuantificación global y pedido logístico unificado.",
      icon: Construction,
      href: `/gestion/${obra.id}/genesis`,
      active: true,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      id: "planos",
      name: "Planimetría",
      description: "Repositorio central de planos técnicos y control de versiones para supervisión.",
      icon: Layout,
      href: `/gestion/${obra.id}/planos`,
      active: true,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      id: "gastos",
      name: "Control de Compras",
      description: "Registro de tickets, facturas y control de flujo de caja de la obra.",
      icon: Calculator,
      href: `/gestion/${obra.id}/gastos`,
      active: true,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      id: "presupuesto",
      name: "Presupuesto Ejecutivo",
      description: "Gestión de presupuestos, certificación y control de desviaciones.",
      icon: FileText,
      href: `/gestion/${obra.id}/presupuesto`,
      active: true,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      id: "agenda",
      name: "Hitos y Plazos",
      description: "Cronograma de ejecución crítica y supervisión de calendario de obra.",
      icon: Calendar,
      href: `/gestion/${obra.id}/agenda`,
      active: true,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      id: "fotos",
      name: "Diario de Obra",
      description: "Bitácora gráfica para el control de calidad y certificación visual.",
      icon: Camera,
      href: "#",
      active: false,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
    {
      id: "equipo",
      name: "Gestión de Actores",
      description: "Directorio de subcontratas, responsables y control de personal.",
      icon: Users,
      href: "#",
      active: false,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
  ];

  const totalGastado = obra.gastos?.reduce((acc, g) => acc + g.importe, 0) || 0;

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 pb-32">
      {/* Botón Volver */}
      <Link
        href="/gestion"
        className="mb-6 flex w-fit items-center gap-2 text-xs font-bold text-slate-500 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Volver a Mis Obras
      </Link>

      {/* Cabecera de la Obra */}
      <section className="mb-10">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="mb-1 text-3xl font-black tracking-tight text-white uppercase italic">
              {obra.nombre}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {obra.direccion && (
                <p className="flex items-center gap-1.5 text-sm text-slate-400">
                  <MapPin size={14} className="text-amber-500" /> {obra.direccion}
                </p>
              )}
              <div className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-black text-amber-500 uppercase tracking-widest">
                {tipoLabel}
              </div>
            </div>
          </div>
          <button className="rounded-lg bg-slate-800 p-2 text-slate-400 hover:text-white">
            <Settings size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <p className="mb-1 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              Estancias
            </p>
            <p className="text-xl font-black text-white">
              {obra.estancias.length}
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <p className="mb-1 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              Progreso
            </p>
            <p className="text-xl font-black text-amber-500">12%</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <p className="mb-1 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              Días Transc.
            </p>
            <p className="text-xl font-black text-white">8</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <p className="mb-1 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              Total Gastado
            </p>
            <p className="text-xl font-black text-amber-500">
              {totalGastado.toLocaleString("es-ES", {
                style: "currency",
                currency: "EUR",
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Funcionalidades */}
      <h2 className="mb-6 text-xs font-black tracking-[0.3em] text-slate-500 uppercase">
        Herramientas de Gestión
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {adminFeatures.map((feature) => (
          <Link
            key={feature.id}
            href={feature.href}
            className={`group relative overflow-hidden rounded-2xl border p-5 transition-all ${
              feature.active
                ? "border-slate-800 bg-slate-900/60 hover:border-amber-500/50 hover:bg-slate-900"
                : "cursor-not-allowed border-slate-900 bg-slate-950 opacity-60"
            }`}
            onClick={(e) => !feature.active && e.preventDefault()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className={`rounded-xl ${feature.bg} p-3 ${feature.color}`}>
                <feature.icon size={24} />
              </div>
              {feature.active ? (
                <ChevronRight
                  size={18}
                  className="text-slate-700 transition-colors group-hover:text-amber-500"
                />
              ) : (
                <span className="text-[8px] font-black tracking-widest text-slate-700 uppercase">
                  Próximamente
                </span>
              )}
            </div>
            <h3
              className={`mb-1 text-sm font-black uppercase italic ${feature.active ? "text-white" : "text-slate-600"}`}
            >
              {feature.name}
            </h3>
            <p className="text-xs leading-relaxed text-slate-500">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
