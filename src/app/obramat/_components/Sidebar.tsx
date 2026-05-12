import { HardHat, X, BookOpen, ChevronRight } from "lucide-react";
import { OBRAMAT_CATEGORIAS } from "@/lib/obramat-data";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string | null;
  activeSubcategory: string | null;
  viewMode: "list" | "pdf";
  onSelectCategory: (id: string | null) => void;
  onSelectSubcategory: (sub: string) => void;
  onSelectViewMode: (mode: "list" | "pdf") => void;
  getSubcategories: (catId: string) => string[];
}

export function Sidebar({
  isOpen,
  onClose,
  activeCategory,
  activeSubcategory,
  viewMode,
  onSelectCategory,
  onSelectSubcategory,
  onSelectViewMode,
  getSubcategories,
}: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-[250] w-72 transform border-r border-amber-500/10 bg-slate-900 transition-transform duration-300 lg:static lg:z-0 lg:flex lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="custom-scrollbar relative flex h-full w-full flex-col overflow-y-auto p-4 lg:bg-transparent">
        {/* Cabecera Sidebar Móvil */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-2">
            <HardHat size={16} className="text-amber-500" />
            <span className="text-[10px] font-black text-white uppercase italic tracking-widest">
              Catálogo Obramat
            </span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <button
          onClick={() => {
            onSelectCategory(null);
            onSelectViewMode("pdf");
            onClose();
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
                    onSelectCategory(isExpanded ? null : cat.id);
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
                      isExpanded ? "rotate-90 text-amber-500" : "text-slate-700"
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="animate-in fade-in slide-in-from-left-2 mt-1 ml-2 space-y-0.5 border-l border-amber-500/20 pl-2 duration-200">
                    <button
                      onClick={() => {
                        onSelectViewMode("pdf");
                        onClose();
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
                    {subs.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          onSelectSubcategory(sub);
                          onSelectViewMode("list");
                          onClose();
                        }}
                        className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-[10px] font-bold transition-all ${
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
  );
}
