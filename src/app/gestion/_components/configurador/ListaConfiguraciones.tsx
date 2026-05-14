import { ItemConfigurado } from "./types";
import { CardConfiguracion } from "./CardConfiguracion";

interface Props {
  items: ItemConfigurado[];
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<ItemConfigurado>) => void;
}

export function ListaConfiguraciones({ items, onRemove, onUpdate }: Props) {
  return (
    <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
      {items.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/20 p-12 text-center border-dashed opacity-50">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">No hay partidas configuradas</p>
        </div>
      ) : (
        items.map((item) => (
          <CardConfiguracion 
            key={item.id} 
            item={item} 
            onRemove={() => onRemove(item.id)} 
            onUpdate={(updates) => onUpdate(item.id, updates)} 
          />
        ))
      )}
    </div>
  );
}
