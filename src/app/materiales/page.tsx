"use client";

import { Suspense } from "react";
import { useMateriales } from "./hooks/useMateriales";
import { MaterialHeader } from "./_components/MaterialHeader";
import { MaterialCard } from "./_components/MaterialCard";
import { MaterialLightbox } from "./_components/MaterialLightbox";
import { FloatingReturnButton } from "./_components/FloatingReturnButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function MaterialesList() {
  const {
    materials,
    originEstancia,
    activeHash,
    expandedImage,
    setExpandedImage,
    isEditingPrices,
    setIsEditingPrices,
    customPrices,
    updatePrice,
  } = useMateriales();

  return (
    <div className="mx-auto max-w-4xl px-3 py-4 pb-20">
      <FloatingReturnButton originEstancia={originEstancia} />

      <MaterialHeader
        originEstancia={originEstancia}
        isEditingPrices={isEditingPrices}
        onToggleEditMode={() => setIsEditingPrices(!isEditingPrices)}
      />

      <div className="space-y-4">
        {materials.map((material) => (
          <MaterialCard
            key={material.id}
            material={material}
            isSelected={activeHash === material.id}
            isEditingPrices={isEditingPrices}
            customPrices={customPrices}
            updatePrice={updatePrice}
            onExpandImage={setExpandedImage}
          />
        ))}
      </div>

      {originEstancia && (
        <div className="mt-8 text-center">
          <Link
            href={`/estancias/${originEstancia.id}`}
            className="inline-flex items-center gap-2 rounded-md bg-slate-800 px-6 py-3 text-[10px] font-black tracking-widest text-slate-400 uppercase transition-all hover:text-white"
          >
            <ArrowLeft size={14} />
            Volver a la estancia
          </Link>
        </div>
      )}

      <MaterialLightbox
        image={expandedImage}
        onClose={() => setExpandedImage(null)}
      />
    </div>
  );
}

export default function MaterialesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-white">Cargando materiales...</div>}>
      <MaterialesList />
    </Suspense>
  );
}
