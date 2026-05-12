import Link from "next/link";
import { Layers, Tag, MapPin, PenTool, Calendar, ChevronRight, Trash2 } from "lucide-react";
import { type Obra, TIPOS_OBRA } from "@/lib/arquitecto-types";

interface ObraCardProps {
  obra: Obra;
  isConfirmingDelete: boolean;
  onDeleteClick: (id: string | null) => void;
  onConfirmDelete: (id: string) => void;
}

export function ObraCard({
  obra,
  isConfirmingDelete,
  onDeleteClick,
  onConfirmDelete,
}: ObraCardProps) {
  const tipoLabel = TIPOS_OBRA.find((t) => t.value === obra.tipo)?.label || obra.tipo;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 transition-all hover:border-slate-600">
      <Link href={`/gestion/${obra.id}`} className="flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
          <Layers size={22} className="text-amber-400" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="truncate text-base font-black text-white">{obra.nombre}</h3>
            <span className="flex items-center gap-1 rounded bg-slate-800 px-2 py-0.5 text-[8px] font-bold tracking-tighter text-amber-500 uppercase">
              <Tag size={8} /> {tipoLabel}
            </span>
          </div>
          {obra.direccion && (
            <p className="flex items-center gap-1 truncate text-xs text-slate-400">
              <MapPin size={10} /> {obra.direccion}
            </p>
          )}
          <div className="mt-1 flex items-center gap-3 text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <PenTool size={10} /> Arquitecto Activo
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={10} /> {new Date(obra.updatedAt).toLocaleDateString("es-ES")}
            </span>
          </div>
        </div>
        <ChevronRight size={18} className="shrink-0 text-slate-600 transition-colors group-hover:text-amber-400" />
      </Link>

      {isConfirmingDelete ? (
        <div className="flex items-center gap-2 border-t border-slate-800 px-5 py-3 bg-slate-950/50">
          <p className="flex-1 text-xs text-red-400">¿Eliminar esta obra y todas sus estancias?</p>
          <button onClick={() => onConfirmDelete(obra.id)} className="rounded bg-red-600 px-3 py-1 text-[10px] font-bold text-white">Sí, eliminar</button>
          <button onClick={() => onDeleteClick(null)} className="rounded bg-slate-700 px-3 py-1 text-[10px] font-bold text-white">Cancelar</button>
        </div>
      ) : (
        <button
          onClick={() => onDeleteClick(obra.id)}
          className="absolute right-14 top-5 rounded p-1 text-slate-700 transition-colors hover:text-red-500"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}
