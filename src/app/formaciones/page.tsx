"use client";

import { useFormaciones } from "./hooks/useFormaciones";
import { AcademiaHeader } from "./_components/AcademiaHeader";
import { GremioCard } from "./_components/GremioCard";

export default function FormacionesPage() {
  const { gremios } = useFormaciones();

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 pb-32">
      <AcademiaHeader />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {gremios.map((gremio) => (
          <GremioCard key={gremio.id} gremio={gremio} />
        ))}
      </div>
    </div>
  );
}
