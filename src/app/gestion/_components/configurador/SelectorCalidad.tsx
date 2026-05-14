import { NivelCalidad } from "@/lib/configurador/master-library";
import { Trophy } from "lucide-react";

interface Props {
  calidad: NivelCalidad;
  setCalidad: (c: NivelCalidad) => void;
}

export function SelectorCalidad({ calidad, setCalidad }: Props) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl flex items-center justify-between shadow-2xl">
      <h2 className="text-xs font-black tracking-widest text-white uppercase italic flex items-center gap-2">
        <Trophy size={14} className="text-amber-500" /> Nivel de Obra
      </h2>
      <div className="flex gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
        {(["basica", "estandar", "premium"] as const).map((niv) => (
          <button 
            key={niv} 
            onClick={() => setCalidad(niv)} 
            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
              calidad === niv 
                ? "bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20" 
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {niv}
          </button>
        ))}
      </div>
    </div>
  );
}
