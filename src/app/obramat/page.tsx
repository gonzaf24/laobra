"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Search,
  Filter,
  HardHat,
  FileText,
  ChevronRight,
} from "lucide-react";
import { OBRAMAT_CATEGORIAS, OBRAMAT_CATALOGO } from "@/lib/obramat-data";

export default function ObramatPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [copiedSku, setCopiedSku] = useState<string | null>(null);

  const handlePdfClick = (sku: string) => {
    // Copiar al portapapeles
    navigator.clipboard.writeText(sku);
    setCopiedSku(sku);
    // Auto-cerrar el aviso
    setTimeout(() => setCopiedSku(null), 4000);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-950">
      {/* Toast de Notificación */}
      {copiedSku && (
        <div className="fixed top-6 left-1/2 z-50 flex -translate-x-1/2 animate-bounce items-center gap-3 rounded-2xl border border-amber-500/50 bg-slate-900/90 px-6 py-4 text-white shadow-[0_0_30px_rgba(245,158,11,0.2)] backdrop-blur-xl">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-slate-950">
            <Search size={20} />
          </div>
          <div>
            <p className="text-xs font-black tracking-widest uppercase">¡Referencia Copiada!</p>
            <p className="text-[10px] text-slate-400">
              Pulsa <span className="text-amber-500 font-bold underline">Cmd+F</span> y luego <span className="text-amber-500 font-bold underline">Cmd+V</span> en el PDF para encontrarlo.
            </p>
          </div>
        </div>
      )}
      {/* Header Fijo */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-amber-500/20 bg-slate-900/80 px-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
          >
            <ArrowLeft size={16} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <HardHat size={18} />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight text-white uppercase italic">
                Materiales <span className="text-amber-500">Obramat</span>
              </h1>
              <p className="text-[9px] font-bold tracking-widest text-amber-500/70 uppercase">
                Visor Oficial 2026
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold text-amber-400">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
            V. 2026-Bcn
          </div>
        </div>
      </header>

      {/* Contenedor Principal Split-Screen */}
      <div className="flex flex-1 overflow-hidden">
        {/* Panel Izquierdo: Índice de Categorías */}
        <aside className="hidden w-64 flex-col border-r border-amber-500/10 bg-slate-900/30 lg:flex">
          <div className="p-4">
            <button
              onClick={() => setActiveCategory(null)}
              className={`mb-4 flex w-full items-center gap-2 rounded-xl border px-4 py-3 transition-all ${
                activeCategory === null
                  ? "border-amber-500 bg-amber-500 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-amber-500/50 hover:text-amber-500"
              }`}
            >
              <BookOpen size={16} />
              <span className="text-xs font-black tracking-tight uppercase">
                Ver Catálogo PDF
              </span>
            </button>

            <div className="mb-6 h-px bg-amber-500/10" />

            <h3 className="mb-3 flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              <Filter size={12} />
              Categorías
            </h3>
            <div className="space-y-1">
              {OBRAMAT_CATEGORIAS.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 transition-colors ${
                    activeCategory === cat.id
                      ? "bg-amber-500/10 text-amber-400"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                  }`}
                >
                  <span className="text-xs font-bold">{cat.nombre}</span>
                  <ChevronRight
                    size={14}
                    className={
                      activeCategory === cat.id
                        ? "text-amber-500"
                        : "text-slate-700"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto p-4">
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-amber-500">
                <FileText size={16} />
                <span className="text-[10px] font-black tracking-widest uppercase">
                  Estado IA
                </span>
              </div>
              <p className="text-[10px] leading-relaxed text-amber-400/70">
                Indexando catálogo 2026... Haz clic en ´VER EN PDF´ para ir
                directamente a la ficha técnica oficial del material.
              </p>
            </div>
          </div>
        </aside>

        {/* Panel Derecho: Dinámico (PDF o Materiales) */}
        <main className="relative flex-1 overflow-y-auto bg-slate-950">
          {activeCategory === null ? (
            <iframe
              src="/catalogo_obramat_2026.pdf"
              className="h-full w-full border-none"
              title="Catálogo Obramat 2026"
            />
          ) : (
            <div className="p-6 lg:p-10">
              <div className="mb-8 flex items-end justify-between border-b border-slate-800 pb-6">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-amber-500">
                    <span className="text-[10px] font-black tracking-widest uppercase">
                      Sección Obramat
                    </span>
                  </div>
                  <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">
                    {
                      OBRAMAT_CATEGORIAS.find((c) => c.id === activeCategory)
                        ?.nombre
                    }
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                    Total Productos
                  </p>
                  <p className="text-2xl font-black text-amber-500">
                    {
                      OBRAMAT_CATALOGO.filter(
                        (p) => p.categoriaId === activeCategory
                      ).length
                    }
                  </p>
                </div>
              </div>

              {/* Agrupaciones por Subcategoría */}
              <div className="space-y-12">
                {OBRAMAT_CATEGORIAS.find(
                  (c) => c.id === activeCategory
                )?.subcategorias.map((sub) => {
                  const products = OBRAMAT_CATALOGO.filter(
                    (p) =>
                      p.categoriaId === activeCategory && p.subcategoria === sub
                  );
                  if (products.length === 0) return null;

                  return (
                    <div key={sub} className="pt-4 first:pt-0">
                      <div className="mb-10 flex items-center gap-6">
                        <div className="h-px flex-1 bg-linear-to-r from-transparent to-amber-500/20" />
                        <h3 className="text-[10px] font-black tracking-[0.4em] whitespace-nowrap text-amber-500/60 uppercase">
                          {sub}
                        </h3>
                        <div className="h-px flex-1 bg-linear-to-r from-amber-500/20 to-transparent" />
                      </div>

                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {products.map((p) => (
                          <div
                            key={p.sku}
                            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition-all hover:border-amber-500/40 hover:bg-slate-900/60"
                          >
                            {/* Badge Estándar */}
                            {p.esEstandar && (
                              <div className="absolute top-3 right-3 z-10 rounded-full bg-amber-500 px-2 py-0.5 text-[8px] font-black text-slate-900 shadow-lg">
                                ESTÁNDAR
                              </div>
                            )}

                            <div className="mb-4 flex items-start gap-4">
                              <div className="rounded-xl bg-amber-500/10 p-3 text-amber-500">
                                <FileText size={24} />
                              </div>
                              <div>
                                <span className="text-[8px] font-black tracking-widest text-slate-500 uppercase">
                                  Ref. {p.sku}
                                </span>
                                <h3 className="text-sm leading-tight font-bold text-white">
                                  {p.nombre}
                                </h3>
                              </div>
                            </div>

                            <div className="mb-4 flex items-center gap-2">
                              <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
                                {p.formato}
                              </span>
                              <span className="text-[10px] text-slate-600">
                                Pág. {p.paginaCatalogo}
                              </span>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                              <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase">
                                  Precio Unitario
                                </p>
                                <p className="text-xl font-black text-white">
                                  {p.precioUnitario.toFixed(2)}
                                  <span className="ml-0.5 text-xs text-amber-500">
                                    €
                                  </span>
                                </p>
                              </div>
                              <a
                                href={`/catalogo_obramat_2026.pdf#page=${p.paginaCatalogo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handlePdfClick(p.sku)}
                                className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-[10px] font-black text-slate-900 shadow-lg transition-transform active:scale-95"
                              >
                                VER EN PDF
                                <ArrowRight size={14} />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {OBRAMAT_CATALOGO.filter((p) => p.categoriaId === activeCategory)
                .length === 0 && (
                <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/20">
                  <Search className="mb-2 text-slate-700" size={32} />
                  <p className="text-sm font-medium text-slate-500 italic">
                    No hay materiales cargados en esta categoría aún.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Overlay Mobile (Solo para pantallas pequeñas si el PDF está activo) */}
          {activeCategory === null && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-amber-500/30 bg-slate-900/90 px-4 py-2 text-[10px] font-bold text-amber-500 shadow-xl backdrop-blur-sm lg:hidden">
              Desliza para ver el catálogo
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
