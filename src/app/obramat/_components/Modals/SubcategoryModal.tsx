import { X, FolderPlus } from "lucide-react";

interface SubcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  categoryName?: string;
}

export function SubcategoryModal({
  isOpen,
  onClose,
  onSubmit,
  categoryName,
}: SubcategoryModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get("nombre") as string;
    if (nombre) onSubmit(nombre);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-amber-500/30 bg-slate-900 p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="flex items-center gap-2 text-sm font-black text-amber-500 uppercase italic">
            <FolderPlus size={18} /> Nueva Sección
          </h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="ml-1 text-[10px] font-black tracking-tight text-slate-400 uppercase">
              Nombre de la Sección
            </label>
            <input
              name="nombre"
              autoFocus
              placeholder="ej. Morteros Técnicos"
              required
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white outline-none focus:border-amber-500/50"
            />
          </div>
          <p className="text-[9px] text-slate-500 italic">
            Se añadirá a la categoría <b className="text-amber-500">{categoryName}</b>.
          </p>
          <button
            type="submit"
            className="w-full rounded-xl bg-amber-500 py-3 text-xs font-black text-slate-900 shadow-xl"
          >
            CREAR SECCIÓN
          </button>
        </form>
      </div>
    </div>
  );
}
