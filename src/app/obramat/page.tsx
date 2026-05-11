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
  Info,
  Tag
} from "lucide-react";
import { OBRAMAT_CATEGORIAS, OBRAMAT_CATALOGO, ObramatProducto } from "@/lib/obramat-data";

export default function ObramatPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "pdf">("pdf");
  const [copiedSku, setCopiedSku] = useState<string | null>(null);
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);

  // Materiales locales (para los añadidos a mano)
  const [localMaterials, setLocalMaterials] = useState<ObramatProducto[]>([]);

  const activeCatObj = OBRAMAT_CATEGORIAS.find((c) => c.id === activeCategory);
  const currentPdf = activeCatObj
    ? activeCatObj.pdfPath
    : "/catalogo/cat-01-indice.pdf";

  // Combinar catálogo fijo con añadidos a mano
  const allMaterials = [...OBRAMAT_CATALOGO, ...localMaterials];

  const filteredProducts = allMaterials.filter((p) => {
    if (p.categoriaId !== activeCategory) return false;
    if (activeSubcategory && p.subcategoria !== activeSubcategory) return false;
    return true;
  });

  const handlePdfClick = (sku: string) => {
    navigator.clipboard.writeText(sku);
    setCopiedSku(sku);
    setTimeout(() => setCopiedSku(null), 4000);
  };

  const handleAddLocalMaterial = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newMat: ObramatProducto = {
      sku: (formData.get("sku") as string) || `MAN-${Date.now()}`,
      nombre: formData.get("nombre") as string,
      marca: formData.get("marca") as string,
      formato: formData.get("formato") as string,
      precioUnitario: parseFloat(formData.get("precio") as string) || 0,
      categoriaId: activeCategory!,
      subcategoria: activeSubcategory || "General",
      paginaCatalogo: 0,
      esEstandar: true,
      notas: formData.get("notas") as string,
    };
    setLocalMaterials([...localMaterials, newMat]);
    setIsAddingMaterial(false);
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
            <p className="text-xs font-black tracking-widest uppercase">
              ¡Referencia Copiada!
            </p>
            <p className="text-[10px] text-slate-400">
              Usa <span className="font-bold text-amber-500 underline">Cmd+F</span> para buscar en el PDF.
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
                Arquitecto <span className="text-amber-500 text-[10px]">OBRAMAT</span>
              </h1>
              <p className="text-[9px] font-bold tracking-widest text-amber-500/70 uppercase">
                Base de Datos Técnica
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
        {/* Panel Izquierdo: Acordeón de Categorías */}
        <aside className="hidden w-72 flex-col border-r border-amber-500/10 bg-slate-900/30 lg:flex">
          <div className="p-4 overflow-y-auto custom-scrollbar h-full">
            <button
              onClick={() => {
                setActiveCategory(null);
                setActiveSubcategory(null);
                setViewMode("pdf");
              }}
              className={`mb-4 flex w-full items-center gap-2 rounded-xl border px-4 py-3 text-left transition-all ${
                activeCategory === null
                  ? "border-amber-500 bg-amber-500 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-amber-500/50 hover:text-amber-500"
              }`}
            >
              <BookOpen size={16} className="shrink-0" />
              <span className="text-xs font-black tracking-tight uppercase">
                Índice General
              </span>
            </button>

            <div className="mb-6 h-px bg-amber-500/10" />

            <div className="space-y-1 pb-10">
              {OBRAMAT_CATEGORIAS.map((cat) => {
                const isExpanded = activeCategory === cat.id;
                return (
                  <div key={cat.id} className="mb-1">
                    <button
                      onClick={() => {
                        setActiveCategory(isExpanded ? null : cat.id);
                        setActiveSubcategory(null);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors ${
                        isExpanded
                          ? "bg-slate-800 text-amber-500"
                          : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                      }`}
                    >
                      <span className="text-[11px] font-black leading-tight uppercase tracking-tight">
                        {cat.nombre}
                      </span>
                      <ChevronRight
                        size={14}
                        className={`transition-transform duration-200 ${
                          isExpanded ? "rotate-90 text-amber-500" : "text-slate-700"
                        }`}
                      />
                    </button>

                    {/* Contenido Desplegado */}
                    {isExpanded && (
                      <div className="mt-1 ml-2 space-y-0.5 border-l border-amber-500/20 pl-2 animate-in fade-in slide-in-from-left-2 duration-200">
                        {/* Opción PDF siempre primero */}
                        <button
                          onClick={() => setViewMode("pdf")}
                          className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                            viewMode === "pdf"
                              ? "bg-amber-500/10 text-amber-500"
                              : "text-slate-500 hover:bg-slate-800/30 hover:text-slate-300"
                          }`}
                        >
                          <BookOpen size={12} /> Catálogo / PDF
                        </button>

                        <div className="my-2 h-px bg-slate-800/50 mx-2" />

                        {/* Subcategorías / Materiales */}
                        {cat.subcategorias.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => {
                              setActiveSubcategory(sub);
                              setViewMode("list");
                              setIsAddingMaterial(false);
                            }}
                            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-[10px] font-bold text-left transition-all ${
                              activeSubcategory === sub && viewMode === "list"
                                ? "bg-amber-500/10 text-amber-400"
                                : "text-slate-500 hover:text-slate-300"
                            }`}
                          >
                            <ChevronRight size={10} className="shrink-0" /> {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Panel Derecho: Contenido Dinámico */}
        <main className="relative flex-1 overflow-y-auto bg-slate-950">
          {viewMode === "pdf" ? (
            <iframe
              src={currentPdf}
              className="h-full w-full border-none"
              title="Visor de Catálogo"
            />
          ) : (
            <div className="p-6 lg:p-10">
              <div className="mb-8 flex items-end justify-between border-b border-slate-800 pb-6">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-amber-500">
                    <span className="text-[10px] font-black tracking-widest uppercase italic">
                      Sección: {activeCatObj?.nombre}
                    </span>
                  </div>
                  <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none">
                    {activeSubcategory || "Materiales de Obra"}
                  </h2>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button 
                    onClick={() => setIsAddingMaterial(true)}
                    className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-[10px] font-black text-slate-900 shadow-lg transition-transform active:scale-95"
                  >
                    + AÑADIR MATERIAL PERSONALIZADO
                  </button>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    {filteredProducts.length} Registros Disponibles
                  </p>
                </div>
              </div>

              {/* Formulario de Añadir Material Profesional */}
              {isAddingMaterial && (
                <div className="mb-8 rounded-3xl border border-amber-500/30 bg-slate-900/80 p-8 shadow-2xl animate-in zoom-in duration-300 backdrop-blur-md">
                  <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="text-sm font-black text-amber-500 uppercase italic">Nuevo Registro Técnico de Material</h3>
                    <button onClick={() => setIsAddingMaterial(false)} className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest">Cerrar</button>
                  </div>
                  
                  <form onSubmit={handleAddLocalMaterial} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-tight ml-1">Nombre del Material *</label>
                        <input name="nombre" placeholder="ej. Cemento Cola Flexible" required className="rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white outline-none focus:border-amber-500/50 transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-tight ml-1">Marca / Fabricante</label>
                        <input name="marca" placeholder="ej. Weber, Mapei..." className="rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white outline-none focus:border-amber-500/50 transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-tight ml-1">Referencia / SKU</label>
                        <input name="sku" placeholder="Referencia del proveedor" className="rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white outline-none focus:border-amber-500/50 transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-tight ml-1">Unidad de Compra / Formato *</label>
                        <input name="formato" placeholder="ej. Saco 25kg, m2, Bote 5L..." required className="rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white outline-none focus:border-amber-500/50 transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-tight ml-1">Precio Unitario (€) *</label>
                        <input name="precio" type="number" step="0.01" placeholder="0.00" required className="rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white outline-none focus:border-amber-500/50 transition-all font-bold text-amber-500" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-tight ml-1">Notas Técnicas / Observaciones (Campo Libre)</label>
                      <textarea name="notas" rows={3} placeholder="Añade aquí advertencias de uso, mezclas, tiempos de secado o cualquier detalle técnico relevante..." className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-xs text-white outline-none focus:border-amber-500/50 transition-all resize-none italic" />
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-slate-800">
                      <button type="submit" className="flex-1 rounded-xl bg-amber-500 px-6 py-3 text-xs font-black text-slate-900 transition-all hover:bg-amber-400 active:scale-95 shadow-xl shadow-amber-500/10">GUARDAR EN BASE DE DATOS</button>
                      <button type="button" onClick={() => setIsAddingMaterial(false)} className="rounded-xl bg-slate-800 px-8 py-3 text-xs font-bold text-slate-400 transition-all hover:text-white">CANCELAR</button>
                    </div>
                  </form>
                </div>
              )}

              {/* Grid de Productos Profesional */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((p) => (
                  <div
                    key={p.sku}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition-all hover:border-amber-500/40 hover:bg-slate-900/60"
                  >
                    <div className="mb-4 flex items-start gap-4">
                      <div className="rounded-xl bg-amber-500/10 p-3 text-amber-500">
                        <FileText size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[8px] font-black tracking-widest text-slate-500 uppercase">
                            Ref. {p.sku}
                          </span>
                          {p.marca && (
                            <span className="flex items-center gap-1 rounded bg-amber-500/10 px-1.5 py-0.5 text-[8px] font-bold text-amber-500 uppercase tracking-tighter">
                              <Tag size={8} /> {p.marca}
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm leading-tight font-black text-white uppercase italic">
                          {p.nombre}
                        </h3>
                      </div>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                      <span className="rounded-lg bg-slate-800 px-2 py-1 text-[10px] text-slate-400 font-bold border border-slate-700/50">
                        {p.formato}
                      </span>
                      {p.paginaCatalogo > 0 ? (
                        <span className="text-[10px] text-slate-600 italic font-medium">
                          Pág. {p.paginaCatalogo}
                        </span>
                      ) : (
                        <span className="text-[9px] font-black text-amber-500/40 uppercase tracking-widest">
                          Personalizado
                        </span>
                      )}
                    </div>

                    {/* Notas / Observaciones */}
                    {p.notas && (
                      <div className="mb-4 flex gap-2 rounded-xl bg-slate-950/50 p-3 border border-slate-800/50">
                        <Info size={14} className="shrink-0 text-amber-500/50" />
                        <p className="text-[10px] leading-relaxed text-slate-400 italic line-clamp-3">
                          {p.notas}
                        </p>
                      </div>
                    )}

                    <div className="mt-auto flex items-center justify-between border-t border-slate-800 pt-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Precio Unidad</p>
                        <p className="text-xl font-black text-white">
                          {p.precioUnitario.toFixed(2)}
                          <span className="ml-0.5 text-xs text-amber-500">€</span>
                        </p>
                      </div>
                      {p.paginaCatalogo > 0 && (
                        <button
                          onClick={() => {
                            handlePdfClick(p.sku);
                            setViewMode("pdf");
                          }}
                          className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-[10px] font-black text-amber-500 transition-colors hover:bg-amber-500 hover:text-slate-900 shadow-lg active:scale-95"
                        >
                          VER PDF
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && !isAddingMaterial && (
                <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/20">
                  <Search className="mb-2 text-slate-700" size={32} />
                  <p className="text-sm font-medium text-slate-500 italic">
                    Selecciona una sección para ver los materiales o añade uno nuevo.
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
