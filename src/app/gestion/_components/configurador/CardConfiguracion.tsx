import { Trash2 } from "lucide-react";
import { ItemConfigurado } from "./types";
import { ConfigTabique } from "./sections/ConfigTabique";
import { ConfigSuelo } from "./sections/ConfigSuelo";
import { ConfigFontaneria } from "./sections/ConfigFontaneria";
import { ConfigTecho } from "./sections/ConfigTecho";
import { ConfigAbertura } from "./sections/ConfigAbertura";

interface Props {
  item: ItemConfigurado;
  onRemove: () => void;
  onUpdate: (updates: Partial<ItemConfigurado>) => void;
}

export function CardConfiguracion({ item, onRemove, onUpdate }: Props) {
  return (
    <div className="group relative rounded-3xl border border-slate-800 bg-slate-950 p-6 transition-all hover:border-slate-700 shadow-xl">
      <button 
        type="button"
        onClick={onRemove} 
        className="absolute -right-2 -top-2 h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 flex hover:bg-red-500 hover:text-white transition-all shadow-lg z-10"
      >
        <Trash2 size={14} />
      </button>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white italic">{item.tipo}</h3>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[9px] font-black text-slate-600 uppercase">Cantidad</label>
          <input 
            type="number" 
            value={item.cantidad} 
            onChange={(e) => onUpdate({ cantidad: Number(e.target.value) })} 
            className="w-20 rounded-xl border border-slate-800 bg-slate-900 p-2 text-[12px] font-black text-white text-center outline-none focus:border-blue-500 transition-colors" 
          />
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-top-1 duration-500">
        {item.tipo === 'tabique' && <ConfigTabique opciones={item.opciones as any} setOpciones={(o) => onUpdate({ opciones: o })} />}
        {item.tipo === 'suelo' && <ConfigSuelo opciones={item.opciones as any} setOpciones={(o) => onUpdate({ opciones: o })} />}
        {item.tipo === 'fontaneria' && <ConfigFontaneria opciones={item.opciones as any} setOpciones={(o) => onUpdate({ opciones: o })} />}
        {item.tipo === 'techo' && <ConfigTecho opciones={item.opciones as any} setOpciones={(o) => onUpdate({ opciones: o })} />}
        {item.tipo === 'abertura' && <ConfigAbertura opciones={item.opciones as any} setOpciones={(o) => onUpdate({ opciones: o })} />}
      </div>
    </div>
  );
}
