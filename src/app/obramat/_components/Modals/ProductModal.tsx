import { X, PackagePlus } from "lucide-react";
import { ObramatProducto } from "@/lib/obramat-data";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: ObramatProducto) => void;
  subcategories: string[];
  activeSubcategory: string | null;
  activeCategory: string;
}

export function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  subcategories,
  activeSubcategory,
  activeCategory,
}: ProductModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newMat: ObramatProducto = {
      sku: (formData.get("sku") as string) || `MAN-${Date.now()}`,
      nombre: formData.get("nombre") as string,
      marca: formData.get("marca") as string,
      formato: formData.get("formato") as string,
      precioUnitario: parseFloat(formData.get("precio") as string) || 0,
      categoriaId: activeCategory,
      subcategoria: (formData.get("subcategoria") as string) || activeSubcategory || "General",
      paginaCatalogo: 0,
      esEstandar: true,
      notas: (formData.get("notas") as string) || "",
    };
    
    onSubmit(newMat);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="custom-scrollbar max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-amber-500/30 bg-slate-900 p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="flex items-center gap-2 text-sm font-black text-amber-500 uppercase italic">
            <PackagePlus size={18} /> Nuevo Material
          </h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase">Nombre</label>
              <input name="nombre" placeholder="Nombre" required className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white outline-none focus:border-amber-500/50" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase">Subcategoría</label>
              <select name="subcategoria" defaultValue={activeSubcategory || ""} className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white outline-none focus:border-amber-500/50">
                {subcategories.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase">Formato</label>
              <input name="formato" placeholder="Formato" required className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white outline-none focus:border-amber-500/50" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase">Precio (€)</label>
              <input name="precio" type="number" step="0.01" placeholder="Precio" required className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white outline-none focus:border-amber-500/50" />
            </div>
          </div>
          <button type="submit" className="w-full rounded-xl bg-amber-500 py-3 text-xs font-black text-slate-900 shadow-xl">GUARDAR MATERIAL</button>
        </form>
      </div>
    </div>
  );
}
