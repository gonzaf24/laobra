import { VARIANTES_FONTANERIA } from "@/lib/configurador/master-library";

interface Props {
  opciones: {
    tipoTubo: string;
    aparato: string;
    grifo: string;
  };
  setOpciones: (o: any) => void;
}

export function ConfigFontaneria({ opciones, setOpciones }: Props) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-300">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-[8px] font-black text-slate-500 uppercase ml-1">Tecnología Caño</label>
          <select 
            value={opciones.tipoTubo} 
            onChange={(e) => setOpciones({ ...opciones, tipoTubo: e.target.value })} 
            className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-[10px] font-bold text-white outline-none focus:border-sky-500"
          >
            {Object.entries(VARIANTES_FONTANERIA.tuberias).map(([k, v]) => (
              <option key={k} value={k}>{v.nombre}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[8px] font-black text-slate-500 uppercase ml-1">Aparato Sanitario</label>
          <select 
            value={opciones.aparato} 
            onChange={(e) => setOpciones({ ...opciones, aparato: e.target.value })} 
            className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-[10px] font-bold text-white outline-none focus:border-sky-500"
          >
            <option value="ninguno">Solo Instalación</option>
            {Object.entries(VARIANTES_FONTANERIA.aparatos).map(([k, v]) => (
              <option key={k} value={k}>{v.nombre}</option>
            ))}
          </select>
        </div>
      </div>
      
      {opciones.aparato !== 'ninguno' && (
        <div className="space-y-1.5">
          <label className="text-[8px] font-black text-slate-500 uppercase ml-1">Grifería / Canilla</label>
          <select 
            value={opciones.grifo} 
            onChange={(e) => setOpciones({ ...opciones, grifo: e.target.value })} 
            className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-[10px] font-bold text-white outline-none focus:border-sky-500"
          >
            {Object.entries(VARIANTES_FONTANERIA.griferia).map(([k, v]) => (
              <option key={k} value={k}>{v.nombre}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
