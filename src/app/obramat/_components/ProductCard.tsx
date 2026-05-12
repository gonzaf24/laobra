import { FileText, Tag, Info } from "lucide-react";
import { ObramatProducto } from "@/lib/obramat-data";

interface ProductCardProps {
  product: ObramatProducto;
  onViewPdf: (sku: string) => void;
}

export function ProductCard({ product, onViewPdf }: ProductCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition-all hover:border-amber-500/40">
      <div className="mb-4 flex items-start gap-4">
        {product.imagen ? (
          <div className="h-12 w-12 overflow-hidden rounded-xl bg-slate-950">
            <img
              src={product.imagen}
              alt={product.nombre}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="rounded-xl bg-amber-500/10 p-3 text-amber-500">
            <FileText size={24} />
          </div>
        )}
        <div className="flex-1">
          <p className="text-[8px] font-black text-slate-500 tracking-widest uppercase">
            Ref. {product.sku}
          </p>
          <h3 className="text-sm font-black text-white uppercase italic">
            {product.nombre}
          </h3>
          {product.marca && (
            <div className="mt-1 flex items-center gap-1 text-[9px] font-bold text-amber-500/60 uppercase">
              <Tag size={10} /> {product.marca}
            </div>
          )}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-lg border border-slate-700/50 bg-slate-800 px-2 py-1 text-[10px] font-bold text-slate-400">
          {product.formato}
        </span>
        {product.paginaCatalogo > 0 && (
          <span className="text-[10px] font-medium text-slate-600 italic">
            Pág. {product.paginaCatalogo}
          </span>
        )}
      </div>

      {product.notas && (
        <div className="mb-4 flex gap-2 rounded-xl border border-slate-800/50 bg-slate-950/50 p-3">
          <Info size={14} className="shrink-0 text-amber-500/50" />
          <p className="line-clamp-3 text-[10px] leading-relaxed text-slate-400 italic">
            {product.notas}
          </p>
        </div>
      )}

      <div className="mt-auto flex items-center justify-between border-t border-slate-800 pt-4">
        <p className="text-xl font-black text-white">
          {product.precioUnitario.toFixed(2)}
          <span className="ml-0.5 text-xs text-amber-500">€</span>
        </p>
        {product.paginaCatalogo > 0 && (
          <button
            onClick={() => onViewPdf(product.sku)}
            className="rounded-xl bg-slate-800 px-4 py-2 text-[10px] font-black text-amber-500 transition-colors hover:bg-amber-500 hover:text-slate-900"
          >
            VER PDF
          </button>
        )}
      </div>
    </div>
  );
}
