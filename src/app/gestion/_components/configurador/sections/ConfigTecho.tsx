import { VARIANTES_TECHOS } from "@/lib/configurador/master-library";

interface Props {
  opciones: {
    tipoTecho: string;
  };
  setOpciones: (o: any) => void;
}

export function ConfigTecho({ opciones, setOpciones }: Props) {
  return (
    <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-300">
      <label className="text-[8px] font-black text-slate-500 uppercase ml-1">Tipo de Solución de Techo</label>
      <select 
        value={opciones.tipoTecho} 
        onChange={(e) => setOpciones({ ...opciones, tipoTecho: e.target.value })} 
        className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-[10px] font-bold text-white outline-none focus:border-cyan-500"
      >
        {Object.entries(VARIANTES_TECHOS.tipos).map(([k,v]) => (
          <option key={k} value={k}>{v.nombre}</option>
        ))}
      </select>
    </div>
  );
}
