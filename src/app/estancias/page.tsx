"use client";

import { useEstancias } from "./hooks/useEstancias";
import { EstanciaHeader } from "./_components/EstanciaHeader";
import { EstanciaCard } from "./_components/EstanciaCard";

export default function EstanciasPage() {
  const { estancias } = useEstancias();

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 pb-32">
      <EstanciaHeader />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {estancias.map((estancia) => (
          <EstanciaCard key={estancia.id} estancia={estancia} />
        ))}
      </div>
    </div>
  );
}
