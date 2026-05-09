"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  PenTool,
  Plus,
  Trash2,
  MapPin,
  Calendar,
  Layers,
  ChevronRight,
} from "lucide-react";
import { getObras, createObra, deleteObra } from "@/lib/arquitecto-store";
import type { Obra } from "@/lib/arquitecto-types";

export default function ArquitectoPage() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaDireccion, setNuevaDireccion] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    setObras(getObras());
  }, []);

  const handleCrear = () => {
    if (!nuevoNombre.trim()) return;
    createObra(nuevoNombre.trim(), nuevaDireccion.trim());
    setObras(getObras());
    setNuevoNombre("");
    setNuevaDireccion("");
    setShowModal(false);
  };

  const handleEliminar = (id: string) => {
    deleteObra(id);
    setObras(getObras());
    setConfirmDelete(null);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 pb-32">
      {/* Cabecera */}
      <section className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <PenTool className="text-violet-500" size={24} />
          <span className="text-[10px] font-black tracking-[0.2em] text-violet-500 uppercase">
            Planificador Profesional
          </span>
        </div>
        <h2 className="mb-2 text-3xl font-black tracking-tight text-white uppercase italic">
          Mis <span className="text-violet-500">Obras</span>
        </h2>
        <p className="text-text-muted text-sm italic">
          Crea y gestiona tus proyectos de reforma. Cada obra contiene sus
          estancias con todos los materiales calculados al detalle.
        </p>
      </section>

      {/* Botón Nueva Obra */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-primary hover:shadow-primary/30 mb-8 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-black tracking-widest text-slate-900 uppercase shadow-lg transition-all hover:scale-[1.02] active:scale-95"
      >
        <Plus size={18} strokeWidth={3} /> Nueva Obra
      </button>

      {/* Lista de Obras */}
      {obras.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 py-16 text-center">
          <PenTool size={48} className="mb-4 text-slate-700" />
          <p className="mb-1 text-sm font-bold text-slate-500">
            No tienes obras creadas
          </p>
          <p className="text-xs text-slate-600">
            Pulsa &quot;Nueva Obra&quot; para empezar a planificar tu primera
            reforma.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {obras.map((obra) => (
            <div
              key={obra.id}
              className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 transition-all hover:border-slate-600"
            >
              <Link
                href={`/arquitecto/${obra.id}`}
                className="flex items-center gap-4 p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                  <PenTool size={22} className="text-violet-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-black text-white">
                    {obra.nombre}
                  </h3>
                  {obra.direccion && (
                    <p className="flex items-center gap-1 truncate text-xs text-slate-400">
                      <MapPin size={10} /> {obra.direccion}
                    </p>
                  )}
                  <div className="mt-1 flex items-center gap-3 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Layers size={10} /> {obra.estancias.length} estancias
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />{" "}
                      {new Date(obra.updatedAt).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="shrink-0 text-slate-600 transition-colors group-hover:text-violet-400"
                />
              </Link>

              {/* Botón Eliminar */}
              {confirmDelete === obra.id ? (
                <div className="flex items-center gap-2 border-t border-slate-800 px-5 py-3">
                  <p className="flex-1 text-xs text-red-400">
                    ¿Eliminar esta obra y todas sus estancias?
                  </p>
                  <button
                    onClick={() => handleEliminar(obra.id)}
                    className="rounded bg-red-600 px-3 py-1 text-[10px] font-bold text-white"
                  >
                    Sí, eliminar
                  </button>
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="rounded bg-slate-700 px-3 py-1 text-[10px] font-bold text-white"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDelete(obra.id)}
                  className="absolute right-14 top-5 rounded p-1 text-slate-700 transition-colors hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal Nueva Obra */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <h3 className="mb-4 text-xl font-black text-white uppercase">
              Nueva Obra
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
                  Nombre de la Obra *
                </label>
                <input
                  type="text"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
                  placeholder="Ej: Reforma Piso Eixample"
                  autoFocus
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">
                  Dirección (opcional)
                </label>
                <input
                  type="text"
                  value={nuevaDireccion}
                  onChange={(e) => setNuevaDireccion(e.target.value)}
                  className="focus:border-primary w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none"
                  placeholder="Ej: C/ Aragó 123, 3º 1ª"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleCrear}
                disabled={!nuevoNombre.trim()}
                className="bg-primary flex-1 rounded-lg py-3 text-xs font-black tracking-widest text-slate-900 uppercase transition-all disabled:opacity-40"
              >
                Crear Obra
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setNuevoNombre("");
                  setNuevaDireccion("");
                }}
                className="flex-1 rounded-lg border border-slate-700 py-3 text-xs font-black tracking-widest text-slate-400 uppercase"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
