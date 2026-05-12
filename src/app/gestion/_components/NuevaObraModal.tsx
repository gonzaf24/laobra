import { useState } from "react";
import { TIPOS_OBRA, type TipoObra } from "@/lib/arquitecto-types";

interface NuevaObraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (nombre: string, direccion: string, tipo: TipoObra) => void;
}

export function NuevaObraModal({ isOpen, onClose, onSubmit }: NuevaObraModalProps) {
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaDireccion, setNuevaDireccion] = useState("");
  const [nuevoTipo, setNuevoTipo] = useState<TipoObra>("reforma-integral");

  if (!isOpen) return null;

  const handleClose = () => {
    setNuevoNombre("");
    setNuevaDireccion("");
    setNuevoTipo("reforma-integral");
    onClose();
  };

  const handleSubmit = () => {
    if (!nuevoNombre.trim()) return;
    onSubmit(nuevoNombre.trim(), nuevaDireccion.trim(), nuevoTipo);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
        <h3 className="mb-4 text-xl font-black text-white uppercase tracking-tight">Nueva Obra</h3>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">Nombre de la Obra *</label>
            <input
              type="text"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-amber-500/50"
              placeholder="Ej: Reforma Piso Eixample"
              autoFocus
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">Tipo de Obra *</label>
            <select
              value={nuevoTipo}
              onChange={(e) => setNuevoTipo(e.target.value as TipoObra)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-white outline-none focus:border-amber-500/50"
            >
              {TIPOS_OBRA.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold tracking-widest text-slate-300 uppercase">Dirección (opcional)</label>
            <input
              type="text"
              value={nuevaDireccion}
              onChange={(e) => setNuevaDireccion(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-amber-500/50"
              placeholder="Ej: C/ Aragó 123, 3º 1ª"
            />
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={!nuevoNombre.trim()}
            className="bg-amber-500 flex-1 rounded-lg py-3 text-xs font-black tracking-widest text-slate-900 uppercase transition-all disabled:opacity-40"
          >
            Crear Obra
          </button>
          <button onClick={handleClose} className="flex-1 rounded-lg border border-slate-700 py-3 text-xs font-black tracking-widest text-slate-400 uppercase">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
