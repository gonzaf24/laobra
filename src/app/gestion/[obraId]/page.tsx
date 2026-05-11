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
} from "lucide-react";
import { getObra } from "@/lib/arquitecto-store";
import type { Obra } from "@/lib/arquitecto-types";

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

  const adminFeatures = [
    {
      id: "arquitecto",
      name: "Arquitecto",
      description: "Cuantificación de materiales y planificación de estancias.",
      icon: PenTool,
      href: `/gestion/${obra.id}/planificador`,
      active: true,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
    },
    {
      id: "planos",
      name: "Planos",
      description: "Visualización y gestión de planos y planimetría técnica.",
      icon: Layout,
      href: `/gestion/${obra.id}/planos`,
      active: true,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      id: "presupuesto",
      name: "Presupuesto",
      description: "Generación de presupuestos y control de costes.",
      icon: Calculator,
      href: `/gestion/${obra.id}/presupuesto`,
      active: true,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      id: "agenda",
      name: "Agenda y Plazos",
      description: "Guía técnica de ejecución y cronograma por estancia.",
      icon: Calendar,
      href: `/gestion/${obra.id}/agenda`,
      active: true,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      id: "documentos",
      name: "Documentación",
      description: "Planos, contratos y permisos de la obra.",
      icon: FileText,
      href: "#",
      active: false,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      id: "fotos",
      name: "Diario Visual",
      description: "Seguimiento fotográfico del progreso.",
      icon: Camera,
      href: "#",
      active: false,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
    {
      id: "equipo",
      name: "Equipo",
      description: "Gestión de operarios y subcontratas.",
      icon: Users,
      href: "#",
      active: false,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
  ];

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
            {obra.direccion && (
              <p className="flex items-center gap-1.5 text-sm text-slate-400">
                <MapPin size={14} className="text-amber-500" /> {obra.direccion}
              </p>
            )}
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
              Alertas
            </p>
            <p className="text-xl font-black text-red-500">0</p>
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
