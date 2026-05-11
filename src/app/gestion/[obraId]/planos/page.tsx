/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Layout,
  Plus,
  Maximize2,
  Download,
  Share2,
  Layers,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { getObra, saveObra } from "@/lib/arquitecto-store";
import type { Obra, PlanoObra } from "@/lib/arquitecto-types";

type PlanoCategoria = "arquitectura" | "instalaciones" | "detalles" | "otros";

export default function PlanosPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<PlanoCategoria>("arquitectura");
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewPlano, setViewPlano] = useState<PlanoObra | null>(null);

  // Form state para nuevo plano
  const [newPlano, setNewPlano] = useState({
    titulo: "",
    categoria: "arquitectura" as PlanoCategoria,
    url: "",
  });

  const obraId = typeof params?.obraId === "string" ? params.obraId : null;

  const [obra, setObra] = useState<Obra | null>(() => {
    if (typeof window !== "undefined" && obraId) {
      return getObra(obraId);
    }
    return null;
  });

  // Sincronizar si cambia el obraId (ej: navegando entre obras)
  const [prevId, setPrevId] = useState<string | null>(obraId);
  if (obraId !== prevId) {
    setPrevId(obraId);
    setObra(obraId ? getObra(obraId) : null);
  }

  if (!obra) return null;

  const filteredPlanos = (obra.planos || []).filter(
    (p) => p.categoria === activeTab
  );

  const handleSubirPlano = () => {
    if (!newPlano.titulo || !newPlano.url) return;

    const plano: PlanoObra = {
      id: crypto.randomUUID(),
      titulo: newPlano.titulo,
      categoria: newPlano.categoria,
      url: newPlano.url,
      version: "v1.0",
      fecha: new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    const updatedObra = {
      ...obra,
      planos: [...(obra.planos || []), plano],
    };

    saveObra(updatedObra);
    setObra(updatedObra);
    setShowAddModal(false);
    setNewPlano({ titulo: "", categoria: "arquitectura", url: "" });
  };

  const handleEliminarPlano = (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar este plano?")) return;

    const updatedObra = {
      ...obra,
      planos: (obra.planos || []).filter((p) => p.id !== id),
    };

    saveObra(updatedObra);
    setObra(updatedObra);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 pb-32">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/gestion/${params.obraId}`}
          className="mb-4 flex w-fit items-center gap-2 text-xs font-bold text-slate-500 transition-colors hover:text-white"
        >
          <ArrowLeft size={14} /> Volver al Dashboard
        </Link>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="mb-1 text-3xl font-black tracking-tight text-white uppercase italic">
              Planos Técnicos
            </h1>
            <p className="text-sm text-slate-400">
              Gestión y visualización de la planimetría de{" "}
              <span className="font-bold text-white">{obra.nombre}</span>
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-black tracking-widest text-white uppercase shadow-lg shadow-violet-600/20 transition-all hover:bg-violet-500 active:scale-95"
          >
            <Plus size={16} strokeWidth={3} /> Agregar Plano
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {[
          { id: "arquitectura", label: "Arquitectura", icon: Layout },
          { id: "instalaciones", label: "Instalaciones", icon: Layers },
          { id: "detalles", label: "Detalles Técnicos", icon: Search },
          { id: "otros", label: "Otros", icon: Search },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as PlanoCategoria)}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-[10px] font-black tracking-widest uppercase transition-all ${
              activeTab === tab.id
                ? "bg-white text-black"
                : "bg-slate-900 text-slate-500 hover:bg-slate-800"
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid de Planos */}
      {filteredPlanos.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {filteredPlanos.map((plano) => (
            <div
              key={plano.id}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 transition-all hover:border-violet-500/50"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={plano.url}
                  alt={plano.titulo}
                  className="h-full w-full object-cover opacity-60 transition-all group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => setViewPlano(plano)}
                    className="rounded-lg bg-black/50 p-2 text-white backdrop-blur-md hover:bg-violet-600"
                  >
                    <Maximize2 size={16} />
                  </button>
                  <button
                    onClick={() => handleEliminarPlano(plano.id)}
                    className="rounded-lg bg-black/50 p-2 text-white backdrop-blur-md hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-violet-400">
                      {plano.titulo}
                    </h3>
                    <p className="text-[10px] text-slate-500 uppercase">
                      {plano.version} • {plano.fecha}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-800 py-2 text-[10px] font-bold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white">
                    <Download size={12} /> Descargar
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-800 py-2 text-[10px] font-bold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white">
                    <Share2 size={12} /> Compartir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-800 py-24 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-slate-600">
            <Layout size={32} />
          </div>
          <p className="mb-2 text-sm font-bold text-slate-400">
            No hay planos en esta categoría
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-[10px] font-bold tracking-widest text-violet-500 uppercase hover:text-violet-400"
          >
            + Agregar el primero
          </button>
        </div>
      )}

      {/* Modal Agregar */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="border-b border-slate-800 bg-slate-800/50 p-6">
              <h3 className="text-lg font-black text-white uppercase italic">
                Agregar Nuevo Plano
              </h3>
            </div>
            <div className="space-y-4 p-6">
              <div>
                <label className="mb-1 block text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                  Título del Plano
                </label>
                <input
                  type="text"
                  value={newPlano.titulo}
                  onChange={(e) =>
                    setNewPlano({ ...newPlano, titulo: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-white outline-none focus:border-violet-500"
                  placeholder="Ej: Planta propuesta reforma"
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                  Categoría
                </label>
                <select
                  value={newPlano.categoria}
                  onChange={(e) =>
                    setNewPlano({
                      ...newPlano,
                      categoria: e.target.value as PlanoCategoria,
                    })
                  }
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-white outline-none focus:border-violet-500"
                >
                  <option value="arquitectura">Arquitectura</option>
                  <option value="instalaciones">Instalaciones</option>
                  <option value="detalles">Detalles Técnicos</option>
                  <option value="otros">Otros</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                  URL de la Imagen / Plano
                </label>
                <input
                  type="text"
                  value={newPlano.url}
                  onChange={(e) =>
                    setNewPlano({ ...newPlano, url: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-white outline-none focus:border-violet-500"
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-xl bg-slate-800 py-3 text-xs font-bold text-white transition-colors hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubirPlano}
                  className="flex-1 rounded-xl bg-violet-600 py-3 text-xs font-black tracking-widest text-white uppercase transition-colors hover:bg-violet-500"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visor de Plano */}
      {viewPlano && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl sm:p-10">
          <div
            className="absolute inset-0 bg-black/90"
            onClick={() => setViewPlano(null)}
          />
          <button
            onClick={() => setViewPlano(null)}
            className="absolute top-6 right-6 z-10 rounded-full bg-slate-800 p-3 text-white hover:bg-slate-700"
          >
            <X size={24} />
          </button>
          <div className="relative h-full w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-950">
            <img
              src={viewPlano.url}
              alt={viewPlano.titulo}
              className="h-full w-full object-contain"
            />
            <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/80 p-8">
              <h2 className="text-xl font-black text-white uppercase italic">
                {viewPlano.titulo}
              </h2>
              <p className="text-sm text-slate-400">
                {viewPlano.categoria.toUpperCase()} • Versión{" "}
                {viewPlano.version} • {viewPlano.fecha}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
