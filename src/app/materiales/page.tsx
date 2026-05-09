/* eslint-disable @next/next/no-img-element */
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MATERIALS_DATA } from "@/lib/materials-data";
import { ESTANCIAS_DATA } from "@/lib/estancias-data";
import { Beaker, Info, Lightbulb, Box, ArrowLeft } from "lucide-react";
import { Suspense, useEffect, useState } from "react";

function MaterialesList() {
  const searchParams = useSearchParams();
  const fromEstancia = searchParams.get("from");
  const [activeHash, setActiveHash] = useState("");
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const originEstancia = fromEstancia
    ? ESTANCIAS_DATA.find((e) => e.id === fromEstancia)
    : null;

  // Detectar el hash actual y hacer scroll
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveHash(hash);

      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 150);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-3 py-4 pb-20">
      {/* Botón Volver Flotante (Sticky) */}
      {originEstancia && (
        <div className="animate-in fade-in slide-in-from-bottom-4 fixed bottom-24 left-1/2 z-40 w-auto -translate-x-1/2 duration-500">
          <Link
            href={`/estancias/${originEstancia.id}`}
            className="bg-primary hover:shadow-primary/40 flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] font-black tracking-widest text-slate-900 uppercase shadow-xl transition-all active:scale-95"
          >
            <ArrowLeft size={14} strokeWidth={3} />
            Volver a {originEstancia.name}
          </Link>
        </div>
      )}

      {/* Cabecera / Botón de retorno superior */}
      {originEstancia ? (
        <div className="mb-6">
          <Link
            href={`/estancias/${originEstancia.id}`}
            className="text-text-muted hover:text-primary inline-flex items-center gap-2 text-[10px] font-bold uppercase transition-colors"
          >
            <ArrowLeft size={12} />
            Volver a {originEstancia.name}
          </Link>
        </div>
      ) : (
        <header className="mb-6">
          <div className="mb-1 flex items-center gap-2">
            <Box className="text-primary" size={18} />
            <h2 className="text-xl font-black tracking-tight text-white uppercase italic md:text-3xl">
              Banda de <span className="text-primary">Materiales</span>
            </h2>
          </div>
          <p className="text-text-muted text-[10px] italic">
            &quot;Conoce el producto para que la obra dure toda la vida.&quot;
          </p>
        </header>
      )}

      <div className="space-y-4">
        {MATERIALS_DATA.map((material) => {
          const isSelected = activeHash === material.id;

          return (
            <div
              key={material.id}
              id={material.id}
              className={`group relative overflow-hidden rounded-md border transition-all duration-500 ${
                isSelected
                  ? "border-primary z-10 scale-[1.02] bg-slate-900/80 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                  : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
              }`}
            >
              <div className="flex flex-col md:flex-row">
                {/* Espacio para Foto */}
                <div
                  className={`group/image relative aspect-[21/9] w-full cursor-pointer overflow-hidden border-b bg-slate-800/50 transition-colors md:aspect-square md:w-40 md:border-r md:border-b-0 ${
                    isSelected
                      ? "border-primary/30"
                      : "hover:border-primary/50 border-slate-800"
                  }`}
                  onClick={() =>
                    material.image && setExpandedImage(material.image)
                  }
                >
                  {material.image ? (
                    <>
                      <img
                        src={material.image}
                        alt={material.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover/image:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover/image:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.3-4.3" />
                          <path d="M8 11h6" />
                          <path d="M11 8v6" />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-700">
                      <Box size={32} strokeWidth={1} />
                    </div>
                  )}
                  <div className="text-primary border-primary/20 pointer-events-none absolute top-2 left-2 rounded-sm border bg-slate-900/80 px-1.5 py-0.5 text-[7px] font-black tracking-widest uppercase backdrop-blur-sm">
                    {material.category}
                  </div>
                </div>

                {/* Información */}
                <div className="flex-1 p-4">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <h3
                      className={`text-lg font-black uppercase italic transition-colors md:text-xl ${
                        isSelected ? "text-primary" : "text-white"
                      }`}
                    >
                      {material.name}
                    </h3>
                    {isSelected && (
                      <span className="bg-primary animate-pulse rounded-full px-2 py-0.5 text-[8px] font-black tracking-tighter text-slate-900 uppercase">
                        Seleccionado
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                    {/* Qué es */}
                    <div className="space-y-1">
                      <p className="text-primary flex items-center gap-1.5 text-[8px] font-black tracking-widest uppercase">
                        <Info size={10} /> ¿Qué es?
                      </p>
                      <p
                        className={`text-[11px] leading-relaxed transition-colors ${
                          isSelected ? "text-white" : "text-text-muted"
                        }`}
                      >
                        {material.description}
                      </p>
                    </div>

                    {/* Consejo */}
                    <div className="space-y-1">
                      <p className="flex items-center gap-1.5 text-[8px] font-black tracking-widest text-amber-500 uppercase">
                        <Lightbulb size={10} /> Consejo
                      </p>
                      <p
                        className={`border-l border-amber-500/30 pl-2 text-[11px] leading-relaxed italic transition-colors ${
                          isSelected
                            ? "font-medium text-slate-100"
                            : "text-text-muted"
                        }`}
                      >
                        {material.advice}
                      </p>
                    </div>

                    {/* Mezcla */}
                    {material.mixRatio && (
                      <div className="space-y-1 lg:col-span-2">
                        <p className="flex items-center gap-1.5 text-[8px] font-black tracking-widest text-emerald-500 uppercase">
                          <Beaker size={10} /> Preparación
                        </p>
                        <div
                          className={`rounded-sm border p-2 transition-colors ${
                            isSelected
                              ? "border-emerald-500/40 bg-emerald-500/10"
                              : "border-emerald-500/10 bg-emerald-500/5"
                          }`}
                        >
                          <p
                            className={`text-[11px] leading-relaxed font-bold ${
                              isSelected
                                ? "text-emerald-400"
                                : "text-emerald-100"
                            }`}
                          >
                            {material.mixRatio}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botón Volver al final si venimos de estancia */}
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

      {/* Lightbox / Modal for expanded image */}
      {expandedImage && (
        <div
          className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm duration-200"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative flex h-full max-h-full w-full max-w-4xl items-center justify-center">
            <button
              className="hover:bg-primary absolute top-4 right-4 z-50 rounded-full bg-slate-800/80 p-2 text-white shadow-lg transition-colors hover:text-slate-900"
              onClick={() => setExpandedImage(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            <img
              src={expandedImage}
              alt="Material expandido"
              className="animate-in zoom-in-95 max-h-[90vh] max-w-full cursor-auto rounded-lg object-contain shadow-2xl duration-300"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function MaterialesPage() {
  return (
    <Suspense
      fallback={<div className="p-8 text-white">Cargando materiales...</div>}
    >
      <MaterialesList />
    </Suspense>
  );
}
