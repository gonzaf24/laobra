"use client";

import { useGestion } from "./hooks/useGestion";
import { GestionHeader } from "./_components/GestionHeader";
import { ObraCard } from "./_components/ObraCard";
import { NuevaObraModal } from "./_components/NuevaObraModal";
import { EmptyState } from "./_components/EmptyState";
import { GuiaTiposObra } from "./_components/GuiaTiposObra";

import { Plus } from "lucide-react";

export default function GestionPage() {
  const {
    obras,
    showModal,
    setShowModal,
    confirmDelete,
    setConfirmDelete,
    handleCrear,
    handleEliminar,
  } = useGestion();

  return (
    <div className="w-full px-4 lg:px-12 py-8 pb-32">
      <GestionHeader />

      <section className="mb-16">
        <GuiaTiposObra />
      </section>



      <button
        onClick={() => setShowModal(true)}
        className="bg-amber-500 hover:shadow-amber-500/30 mb-8 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-black tracking-widest text-slate-900 uppercase shadow-lg transition-all hover:scale-[1.02] active:scale-95"
      >
        <Plus size={18} strokeWidth={3} /> Nueva Obra
      </button>

      {obras.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {obras.map((obra) => (
            <ObraCard
              key={obra.id}
              obra={obra}
              isConfirmingDelete={confirmDelete === obra.id}
              onDeleteClick={setConfirmDelete}
              onConfirmDelete={handleEliminar}
            />
          ))}
        </div>
      )}

      <NuevaObraModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCrear}
      />
    </div>
  );
}
