import { BookOpen, FolderPlus, PackagePlus } from "lucide-react";

interface PdfViewerProps {
  currentPdf: string;
  categoryName?: string;
  showActions: boolean;
  onAddSubcategory: () => void;
  onAddProduct: () => void;
}

export function PdfViewer({
  currentPdf,
  categoryName,
  showActions,
  onAddSubcategory,
  onAddProduct,
}: PdfViewerProps) {
  return (
    <div className="relative flex-1 bg-slate-900/50 p-4 lg:p-0 overflow-y-auto custom-scrollbar">
      <div className="mx-auto max-w-4xl pt-4 lg:pt-0">
        {/* Previsualización Móvil */}
        <div className="mb-6 flex flex-col items-center gap-4 lg:hidden">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
            <BookOpen size={28} />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-black tracking-tight text-white uppercase italic">
              Previsualización de Catálogo
            </h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase">
              {categoryName || "Índice General"}
            </p>
          </div>
          <a
            href={currentPdf}
            target="_blank"
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-amber-500 py-4 text-xs font-black text-slate-900 uppercase italic shadow-xl transition-transform active:scale-95"
          >
            <BookOpen size={18} /> VER CATÁLOGO COMPLETO
          </a>
        </div>

        {/* Visor PDF */}
        <div className="relative h-[300px] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl lg:h-[calc(100vh-3.5rem)] lg:rounded-none lg:border-none">
          <iframe
            src={currentPdf}
            className="h-full w-full border-none opacity-90 lg:opacity-100"
            title="Visor de Catálogo"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent lg:hidden" />
        </div>
      </div>

      {/* Acciones Rápidas */}
      {showActions && (
        <div className="absolute bottom-6 left-6 z-50 flex flex-row gap-3 lg:top-8 lg:bottom-auto lg:right-8 lg:left-auto">
          <button
            onClick={onAddSubcategory}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-slate-900 text-amber-500 shadow-2xl transition-all hover:scale-110 active:scale-95"
          >
            <FolderPlus size={20} />
          </button>
          <button
            onClick={onAddProduct}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-slate-950 shadow-2xl transition-all hover:scale-110 active:scale-95"
          >
            <PackagePlus size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
