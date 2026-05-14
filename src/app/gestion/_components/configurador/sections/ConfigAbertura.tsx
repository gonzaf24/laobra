import { VARIANTES_ABERTURAS } from "@/lib/configurador/master-library";

interface Props {
  opciones: {
    tipoAbertura: string;
  };
  setOpciones: (o: any) => void;
}

export function ConfigAbertura({ opciones, setOpciones }: Props) {
  return (
    <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-300">
      <label className="text-[8px] font-black text-slate-500 uppercase ml-1">Sistema de Carpintería</label>
      <select 
        value={opciones.tipoAbertura} 
        onChange={(e) => setOpciones({ ...opciones, tipoAbertura: e.target.value })} 
        className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-[10px] font-bold text-white outline-none focus:border-pink-500"
      >
        {Object.entries(VARIANTES_ABERTURAS.tipos).map(([k,v]) => (
          <option key={k} value={k}>{v.nombre}</option>
        ))}
      </select>
    </div>
  );
}
