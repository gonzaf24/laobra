/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Search,
  HardHat,
  FileText,
  ChevronRight,
  Info,
  Tag,
  Plus,
  FolderPlus,
  PackagePlus,
  X,
  Menu,
} from "lucide-react";
import {
  OBRAMAT_CATEGORIAS,
  OBRAMAT_CATALOGO,
  ObramatProducto,
} from "@/lib/obramat-data";

export default function ObramatPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("obramat_activeCategory");
    }
    return null;
  });
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(
    () => {
      if (typeof window !== "undefined") {
        return localStorage.getItem("obramat_activeSubcategory");
      }
      return null;
    }
  );
  const [viewMode, setViewMode] = useState<"list" | "pdf">(() => {
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("obramat_viewMode") as "list" | "pdf") || "pdf"
      );
    }
    return "pdf";
  });
  const [copiedSku, setCopiedSku] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [localMaterials, setLocalMaterials] = useState<ObramatProducto[]>(
    () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("obramat_localMaterials");
        return saved ? JSON.parse(saved) : [];
      }
      return [];
    }
  );

  const [localExtraSubcategories, setLocalExtraSubcategories] = useState<
    Record<string, string[]>
  >(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("obramat_localExtraSubs");
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  // Guardar estado en localStorage cuando cambie
  useEffect(() => {
    if (activeCategory)
      localStorage.setItem("obramat_activeCategory", activeCategory);
    else localStorage.removeItem("obramat_activeCategory");
  }, [activeCategory]);

  useEffect(() => {
    if (activeSubcategory)
      localStorage.setItem("obramat_activeSubcategory", activeSubcategory);
    else localStorage.removeItem("obramat_activeSubcategory");
  }, [activeSubcategory]);

  useEffect(() => {
    localStorage.setItem("obramat_viewMode", viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem(
      "obramat_localMaterials",
      JSON.stringify(localMaterials)
    );
  }, [localMaterials]);

  useEffect(() => {
    localStorage.setItem(
      "obramat_localExtraSubs",
      JSON.stringify(localExtraSubcategories)
    );
  }, [localExtraSubcategories]);

  // Modales
  const [isModalSubOpen, setIsModalSubOpen] = useState(false);
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);

  const activeCatObj = OBRAMAT_CATEGORIAS.find((c) => c.id === activeCategory);

  // Combinar subcategorías estáticas con las añadidas por el usuario
  const getSubcategories = (catId: string) => {
    const base =
      OBRAMAT_CATEGORIAS.find((c) => c.id === catId)?.subcategorias || [];
    const extra = localExtraSubcategories[catId] || [];
    return [...base, ...extra];
  };

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

  const handleAddSubcategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!activeCategory) return;
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get("nombre") as string;

    if (nombre) {
      setLocalExtraSubcategories({
        ...localExtraSubcategories,
        [activeCategory]: [
          ...(localExtraSubcategories[activeCategory] || []),
          nombre,
        ],
      });
      setIsModalSubOpen(false);
    }
  };

  const handleAddLocalMaterial = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("imagen") as File;
    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
      imageUrl = URL.createObjectURL(imageFile);
    }

    const newMat: ObramatProducto = {
      sku: (formData.get("sku") as string) || `MAN-${Date.now()}`,
      nombre: formData.get("nombre") as string,
      marca: formData.get("marca") as string,
      formato: formData.get("formato") as string,
      precioUnitario: parseFloat(formData.get("precio") as string) || 0,
      categoriaId: activeCategory!,
      subcategoria:
        (formData.get("subcategoria") as string) ||
        activeSubcategory ||
        "General",
      paginaCatalogo: 0,
      esEstandar: true,
      notas: (formData.get("notas") as string) || "",
      imagen: imageUrl,
    };
    setLocalMaterials([...localMaterials, newMat]);
    setIsModalProductOpen(false);
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
              Usa{" "}
              <span className="font-bold text-amber-500 underline">Cmd+F</span>{" "}
              para buscar en el PDF.
            </p>
          </div>
        </div>
      )}

      {/* Contenedor Principal Split-Screen */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Panel Izquierdo: Acordeón de Categorías */}
        <aside
          className={`fixed inset-0 z-70 transform transition-transform duration-300 lg:static lg:z-0 lg:flex lg:w-72 lg:translate-x-0 lg:border-r lg:border-amber-500/10 lg:bg-slate-900/30 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} `}
        >
          {/* Overlay para móvil */}
          {isMobileMenuOpen && (
            <div
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          <div className="custom-scrollbar relative flex h-full w-72 flex-col overflow-y-auto border-r border-amber-500/20 bg-slate-900 p-4 lg:border-none lg:bg-transparent">
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
                const subs = getSubcategories(cat.id);
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
                      <span className="text-[11px] leading-tight font-black tracking-tight uppercase">
                        {cat.nombre}
                      </span>
                      <ChevronRight
                        size={14}
                        className={`transition-transform duration-200 ${
                          isExpanded
                            ? "rotate-90 text-amber-500"
                            : "text-slate-700"
                        }`}
                      />
                    </button>

                    {/* Contenido Desplegado */}
                    {isExpanded && (
                      <div className="animate-in fade-in slide-in-from-left-2 mt-1 ml-2 space-y-0.5 border-l border-amber-500/20 pl-2 duration-200">
                        {/* Opción PDF siempre primero */}
                        <button
                          onClick={() => {
                            setViewMode("pdf");
                            setIsMobileMenuOpen(false);
                          }}
                          className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-[10px] font-black tracking-widest uppercase transition-all ${
                            viewMode === "pdf"
                              ? "bg-amber-500/10 text-amber-500"
                              : "text-slate-500 hover:bg-slate-800/30 hover:text-slate-300"
                          }`}
                        >
                          <BookOpen size={12} /> Catálogo / PDF
                        </button>

                        <div className="mx-2 my-2 h-px bg-slate-800/50" />

                        {/* Subcategorías / Materiales */}
                        {subs.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => {
                              setActiveSubcategory(sub);
                              setViewMode("list");
                              setIsModalProductOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-[10px] font-bold transition-all ${
                              activeSubcategory === sub && viewMode === "list"
                                ? "bg-amber-500/10 text-amber-400"
                                : "text-slate-500 hover:text-slate-300"
                            }`}
                          >
                            <ChevronRight size={10} className="shrink-0" />{" "}
                            {sub}
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
        <main className="custom-scrollbar relative flex-1 overflow-y-auto bg-slate-950">
          {/* Header del Panel (Internal) */}
          <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-amber-500/20 bg-slate-900/80 px-4 backdrop-blur-md">
            <div className="flex items-center gap-4">
              {/* Botón Menú Móvil */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:text-amber-500 lg:hidden"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>

              <Link
                href="/"
                className="hidden h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white sm:flex"
              >
                <ArrowLeft size={16} />
              </Link>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  <HardHat size={18} />
                </div>
                <div>
                  <h1 className="text-xs font-black tracking-tight text-white uppercase italic sm:text-sm">
                    Arquitecto{" "}
                    <span className="text-[8px] text-amber-500 sm:text-[10px]">
                      OBRAMAT
                    </span>
                  </h1>
                  <p className="text-[8px] font-bold tracking-widest text-amber-500/70 uppercase sm:text-[9px]">
                    Base de Datos Técnica
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[8px] font-bold text-amber-400 sm:px-3 sm:text-[10px]">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                <span className="xs:inline hidden">V. 2026-Bcn</span>
                <span className="xs:hidden">V.26</span>
              </div>
            </div>
          </header>
          {viewMode === "pdf" ? (
            <div className="relative h-full w-full">
              <iframe
                src={currentPdf}
                className="h-full w-full border-none"
                title="Visor de Catálogo"
              />

              {/* Acciones Rápidas del Arquitecto (Sticky Overlay) */}
              {activeCategory && (
                <div className="absolute top-20 left-4 z-50 flex flex-row gap-3 sm:top-24 sm:left-8">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsModalSubOpen(true);
                    }}
                    className="group pointer-events-auto flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-slate-900 text-amber-500 shadow-2xl transition-all hover:scale-110 active:scale-95 sm:h-12 sm:w-12 sm:rounded-2xl"
                  >
                    <FolderPlus size={18} />
                    <span className="absolute left-full ml-3 hidden rounded bg-amber-500 px-2 py-1 text-[8px] font-black tracking-widest whitespace-nowrap text-slate-950 uppercase lg:group-hover:block">
                      Nueva Subcategoría
                    </span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsModalProductOpen(true);
                    }}
                    className="group pointer-events-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-slate-950 shadow-2xl transition-all hover:scale-110 active:scale-95 sm:h-12 sm:w-12 sm:rounded-2xl"
                  >
                    <PackagePlus size={18} />
                    <span className="absolute left-full ml-3 hidden rounded bg-slate-900 px-2 py-1 text-[8px] font-black tracking-widest whitespace-nowrap text-white uppercase lg:group-hover:block">
                      Crear Producto
                    </span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 lg:p-10">
              <div className="mb-8 flex items-end justify-between border-b border-slate-800 pb-6">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-amber-500">
                    <span className="text-[10px] font-black tracking-widest uppercase italic">
                      Sección: {activeCatObj?.nombre}
                    </span>
                  </div>
                  <h2 className="text-3xl leading-none font-black tracking-tighter text-white uppercase italic">
                    {activeSubcategory || "Materiales de Obra"}
                  </h2>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => setIsModalProductOpen(true)}
                    className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-[10px] font-black text-slate-900 shadow-lg transition-transform active:scale-95"
                  >
                    <Plus size={14} /> AÑADIR MATERIAL PERSONALIZADO
                  </button>
                  <p className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">
                    {filteredProducts.length} Registros Disponibles
                  </p>
                </div>
              </div>

              {/* Grid de Productos Profesional */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((p) => (
                  <div
                    key={p.sku}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition-all hover:border-amber-500/40 hover:bg-slate-900/60"
                  >
                    <div className="mb-4 flex items-start gap-4">
                      {p.imagen ? (
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                          <img
                            src={p.imagen}
                            alt={p.nombre}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="shrink-0 rounded-xl bg-amber-500/10 p-3 text-amber-500">
                          <FileText size={24} />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-[8px] font-black tracking-widest text-slate-500 uppercase">
                            Ref. {p.sku}
                          </span>
                          {p.marca && (
                            <span className="flex items-center gap-1 rounded bg-amber-500/10 px-1.5 py-0.5 text-[8px] font-bold tracking-tighter text-amber-500 uppercase">
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
                      <span className="rounded-lg border border-slate-700/50 bg-slate-800 px-2 py-1 text-[10px] font-bold text-slate-400">
                        {p.formato}
                      </span>
                      {p.paginaCatalogo > 0 ? (
                        <span className="text-[10px] font-medium text-slate-600 italic">
                          Pág. {p.paginaCatalogo}
                        </span>
                      ) : (
                        <span className="text-[9px] font-black tracking-widest text-amber-500/40 uppercase">
                          Personalizado
                        </span>
                      )}
                    </div>

                    {/* Notas / Observaciones */}
                    {p.notas && (
                      <div className="mb-4 flex gap-2 rounded-xl border border-slate-800/50 bg-slate-950/50 p-3">
                        <Info
                          size={14}
                          className="shrink-0 text-amber-500/50"
                        />
                        <p className="line-clamp-3 text-[10px] leading-relaxed text-slate-400 italic">
                          {p.notas}
                        </p>
                      </div>
                    )}

                    <div className="mt-auto flex items-center justify-between border-t border-slate-800 pt-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase">
                          Precio Unidad
                        </p>
                        <p className="text-xl font-black text-white">
                          {p.precioUnitario.toFixed(2)}
                          <span className="ml-0.5 text-xs text-amber-500">
                            €
                          </span>
                        </p>
                      </div>
                      {p.paginaCatalogo > 0 && (
                        <button
                          onClick={() => {
                            handlePdfClick(p.sku);
                            setViewMode("pdf");
                          }}
                          className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-[10px] font-black text-amber-500 shadow-lg transition-colors hover:bg-amber-500 hover:text-slate-900 active:scale-95"
                        >
                          VER PDF
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/20">
                  <Search className="mb-2 text-slate-700" size={32} />
                  <p className="text-sm font-medium text-slate-500 italic">
                    Selecciona una sección para ver los materiales o añade uno
                    nuevo.
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ═══ MODALES ═══ */}

      {/* Modal Subcategoría */}
      {isModalSubOpen && (
        <div className="animate-in fade-in fixed inset-0 z-100 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm duration-200">
          <div className="animate-in zoom-in w-full max-w-md rounded-3xl border border-amber-500/30 bg-slate-900 p-8 shadow-2xl duration-300">
            <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="flex items-center gap-2 text-sm font-black text-amber-500 uppercase italic">
                <FolderPlus size={18} /> Nueva Subcategoría
              </h3>
              <button
                onClick={() => setIsModalSubOpen(false)}
                className="text-slate-500 transition-colors hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubcategory} className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="ml-1 text-[10px] font-black tracking-tight text-slate-400 uppercase">
                  Nombre de la Sección
                </label>
                <input
                  name="nombre"
                  autoFocus
                  placeholder="ej. Morteros Técnicos, Aislamiento Acústico..."
                  required
                  className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white transition-all outline-none focus:border-amber-500/50"
                />
              </div>
              <p className="text-[9px] text-slate-500 italic">
                Esta sección se añadirá a la categoría{" "}
                <b className="text-amber-500">{activeCatObj?.nombre}</b>.
              </p>
              <div className="flex gap-4 border-t border-slate-800 pt-4">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-amber-500 px-6 py-3 text-xs font-black text-slate-900 shadow-xl shadow-amber-500/10 transition-all hover:bg-amber-400 active:scale-95"
                >
                  CREAR SECCIÓN
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalSubOpen(false)}
                  className="rounded-xl bg-slate-800 px-8 py-3 text-xs font-bold text-slate-400 transition-all hover:text-white"
                >
                  CANCELAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Producto */}
      {isModalProductOpen && (
        <div className="animate-in fade-in fixed inset-0 z-100 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm duration-200">
          <div className="animate-in zoom-in custom-scrollbar max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-amber-500/30 bg-slate-900 p-8 shadow-2xl duration-300">
            <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="flex items-center gap-2 text-sm font-black text-amber-500 uppercase italic">
                <PackagePlus size={18} /> Nuevo Material / Producto
              </h3>
              <button
                onClick={() => setIsModalProductOpen(false)}
                className="text-slate-500 transition-colors hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddLocalMaterial} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="ml-1 text-[10px] font-black tracking-tight text-slate-400 uppercase">
                    Nombre del Material *
                  </label>
                  <input
                    name="nombre"
                    placeholder="ej. Cemento Cola Flexible"
                    required
                    className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white transition-all outline-none focus:border-amber-500/50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="ml-1 text-[10px] font-black tracking-tight text-slate-400 uppercase">
                    Subcategoría (Sección)
                  </label>
                  <select
                    name="subcategoria"
                    defaultValue={activeSubcategory || "General"}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white transition-all outline-none focus:border-amber-500/50"
                  >
                    {getSubcategories(activeCategory!).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="ml-1 text-[10px] font-black tracking-tight text-slate-400 uppercase">
                    Marca / Fabricante
                  </label>
                  <input
                    name="marca"
                    placeholder="ej. Weber, Mapei..."
                    className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white transition-all outline-none focus:border-amber-500/50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="ml-1 text-[10px] font-black tracking-tight text-slate-400 uppercase">
                    Referencia / SKU
                  </label>
                  <input
                    name="sku"
                    placeholder="Referencia del proveedor"
                    className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white transition-all outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="ml-1 text-[10px] font-black tracking-tight text-slate-400 uppercase">
                    Unidad / Formato *
                  </label>
                  <input
                    name="formato"
                    placeholder="ej. Saco 25kg, m2, Bote 5L..."
                    required
                    className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white transition-all outline-none focus:border-amber-500/50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="ml-1 text-[10px] font-black tracking-tight text-slate-400 uppercase">
                    Precio Unitario (€) *
                  </label>
                  <input
                    name="precio"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    required
                    className="text-whit rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs font-bold transition-all outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="ml-1 text-[10px] font-black tracking-tight text-slate-400 uppercase">
                    Notas Técnicas / Observaciones
                  </label>
                  <textarea
                    name="notas"
                    rows={3}
                    placeholder="Detalles técnicos relevantes..."
                    className="resize-none rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs text-white italic transition-all outline-none focus:border-amber-500/50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="ml-1 text-[10px] font-black tracking-tight text-slate-400 uppercase">
                    Imagen del Producto
                  </label>
                  <div className="relative flex h-[104px] w-full items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950 transition-colors hover:border-amber-500/50">
                    <input
                      type="file"
                      name="imagen"
                      accept="image/*"
                      className="absolute inset-0 z-10 cursor-pointer opacity-0"
                    />
                    <div className="flex flex-col items-center gap-1 text-slate-500">
                      <Plus size={20} />
                      <span className="text-[10px] font-bold tracking-widest uppercase">
                        Subir Foto
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 border-t border-slate-800 pt-4">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-amber-500 px-6 py-3 text-xs font-black text-slate-900 shadow-xl shadow-amber-500/10 transition-all hover:bg-amber-400 active:scale-95"
                >
                  GUARDAR MATERIAL
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalProductOpen(false)}
                  className="rounded-xl bg-slate-800 px-8 py-3 text-xs font-bold text-slate-400 transition-all hover:text-white"
                >
                  CANCELAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
