import { Layers } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 py-16 text-center">
      <Layers size={48} className="mb-4 text-slate-700" />
      <p className="mb-1 text-sm font-bold text-slate-500">
        No tienes obras creadas
      </p>
      <p className="text-xs text-slate-600">
        Pulsa &quot;Nueva Obra&quot; para empezar a gestionar tu primera reforma.
      </p>
    </div>
  );
}
