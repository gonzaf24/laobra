import { 
  Plus, 
  Construction, 
  Droplets, 
  Box, 
  Layout, 
  Spline, 
  DoorOpen 
} from "lucide-react";
import { TipoPartida } from "./types";

interface Props {
  onAdd: (tipo: TipoPartida) => void;
}

const ACCIONES = [
  { id: 'tabique', icon: Construction, label: 'Tabique', color: 'blue' },
  { id: 'fontaneria', icon: Droplets, label: 'Fontanería', color: 'sky' },
  { id: 'suelo', icon: Box, label: 'Suelo', color: 'emerald' },
  { id: 'techo', icon: Layout, label: 'Techo', color: 'cyan' },
  { id: 'yeso', icon: Spline, label: 'Yeso', color: 'purple' },
  { id: 'abertura', icon: DoorOpen, label: 'Abertura', color: 'pink' }
] as const;

export function BarraAcciones({ onAdd }: Props) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl shadow-xl">
      <h2 className="mb-4 text-[10px] font-black tracking-widest text-white uppercase italic flex items-center gap-2">
        <Plus size={14} className="text-blue-500" /> Añadir Solución Constructiva
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {ACCIONES.map(btn => (
          <button 
            key={btn.id} 
            onClick={() => onAdd(btn.id as TipoPartida)} 
            className="flex flex-col items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950 p-3 text-[8px] font-black uppercase text-slate-500 hover:border-slate-500 hover:text-white transition-all shadow-sm group"
          >
            <btn.icon size={18} className="group-hover:scale-110 transition-transform" /> 
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
