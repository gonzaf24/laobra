import { VARIANTES_SUELO } from "@/lib/configurador/master-library";

interface Props {
  opciones: {
    tipoSuelo: string;
    formato: string;
  };
  setOpciones: (o: any) => void;
}

export function ConfigSuelo({ opciones, setOpciones }: Props) {
  const currentTipo = VARIANTES_SUELO.tipos[opciones.tipoSuelo as keyof typeof VARIANTES_SUELO.tipos];

  return (
    <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-1 duration-300">
      <div className="space-y-1.5">
        <label className="text-[8px] font-black text-slate-500 uppercase ml-1">Material Pavimento</label>
        <select 
          value={opciones.tipoSuelo} 
          onChange={(e) => setOpciones({ 
            ...opciones, 
            tipoSuelo: e.target.value, 
            formato: (VARIANTES_SUELO.tipos as any)[e.target.value].formatos[0] 
          })} 
          className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-[10px] font-bold text-white outline-none focus:border-emerald-500 transition-colors"
        >
          {Object.entries(VARIANTES_SUELO.tipos).map(([k, v]) => (
            <option key={k} value={k}>{v.nombre}</option>
          ))}
        </select>
      </div>
      <div className="space-y-1.5">
        <label className="text-[8px] font-black text-slate-500 uppercase ml-1">Formato / Clase</label>
        <select 
          value={opciones.formato} 
          onChange={(e) => setOpciones({ ...opciones, formato: e.target.value })} 
          className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-[10px] font-bold text-white outline-none focus:border-emerald-500 transition-colors"
        >
          {currentTipo.formatos.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
