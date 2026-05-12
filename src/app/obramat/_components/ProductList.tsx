import { Plus, Search } from "lucide-react";
import { ObramatProducto } from "@/lib/obramat-data";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  categoryName?: string;
  subcategoryName: string;
  products: ObramatProducto[];
  onAddProduct: () => void;
  onViewPdf: (sku: string) => void;
}

export function ProductList({
  categoryName,
  subcategoryName,
  products,
  onAddProduct,
  onViewPdf,
}: ProductListProps) {
  return (
    <div className="h-full w-full overflow-y-auto p-4 sm:p-8 custom-scrollbar">
      <div className="mb-8 flex items-end justify-between border-b border-slate-800 pb-6">
        <div>
          <p className="mb-1 text-[10px] font-black tracking-widest text-amber-500 uppercase italic">
            Sección: {categoryName}
          </p>
          <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">
            {subcategoryName}
          </h2>
        </div>
        <button
          onClick={onAddProduct}
          className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-[10px] font-black text-slate-900 shadow-lg"
        >
          <Plus size={14} /> AÑADIR MATERIAL
        </button>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.sku} product={p} onViewPdf={onViewPdf} />
          ))}
        </div>
      ) : (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/20">
          <Search className="mb-2 text-slate-700" size={32} />
          <p className="text-sm font-medium text-slate-500 italic">
            No hay materiales en esta sección. Añade uno nuevo.
          </p>
        </div>
      )}
    </div>
  );
}
