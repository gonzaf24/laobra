import Link from "next/link";
import { Box, ArrowLeft, Edit3, CheckCircle } from "lucide-react";

interface MaterialHeaderProps {
  originEstancia: any;
  isEditingPrices: boolean;
  onToggleEditMode: () => void;
}

export function MaterialHeader({
  originEstancia,
  isEditingPrices,
  onToggleEditMode,
}: MaterialHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      {originEstancia ? (
        <Link
          href={`/estancias/${originEstancia.id}`}
          className="text-text-muted hover:text-primary mt-2 inline-flex items-center gap-2 text-[10px] font-bold uppercase transition-colors"
        >
          <ArrowLeft size={12} />
          Volver a {originEstancia.name}
        </Link>
      ) : (
        <header>
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

      <button
        onClick={onToggleEditMode}
        className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
          isEditingPrices
            ? "bg-amber-500 text-slate-900 hover:bg-amber-400"
            : "border border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
        }`}
      >
        {isEditingPrices ? <CheckCircle size={14} /> : <Edit3 size={14} />}
        {isEditingPrices ? "Terminar Edición" : "Editar Precios"}
      </button>
    </div>
  );
}
