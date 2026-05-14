import { VARIANTES_PLADUR, VARIANTES_LADRILLO } from "@/lib/configurador/master-library";
import { CheckCircle2 } from "lucide-react";

interface Props {
  opciones: {
    sistema: string;
    montante: string;
    placa: string;
    medida: string;
    dobleCapa: boolean;
    tipoLadrillo: string;
  };
  setOpciones: (o: any) => void;
}

export function ConfigTabique({ opciones, setOpciones }: Props) {
  return (
    <div className="space-y-5">
      <div className="flex gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 mb-4">
        {["pladur", "ladrillo"].map((sis) => (
          <button 
            key={sis} 
            onClick={() => setOpciones({ ...opciones, sistema: sis })} 
            className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${
              opciones.sistema === sis ? "bg-blue-500 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {sis}
          </button>
        ))}
      </div>

      {opciones.sistema === 'pladur' ? (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-300">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[7px] font-black text-slate-600 uppercase ml-1">Estructura</label>
              <select 
                value={opciones.montante} 
                onChange={(e) => setOpciones({ ...opciones, montante: e.target.value })} 
                className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2 text-[10px] font-bold text-white outline-none focus:border-blue-500"
              >
                <option value="48">Perfil 48mm</option>
                <option value="70">Perfil 70mm</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[7px] font-black text-slate-600 uppercase ml-1">Longitud Placa</label>
              <select 
                value={opciones.medida} 
                onChange={(e) => setOpciones({ ...opciones, medida: e.target.value })} 
                className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2 text-[10px] font-bold text-white outline-none focus:border-blue-500"
              >
                {Object.entries(VARIANTES_PLADUR.medidas).map(([k,v]) => (<option key={k} value={k}>{v.nombre}</option>))}
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[7px] font-black text-slate-600 uppercase ml-1">Tipo de Placa</label>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(VARIANTES_PLADUR.placas).map(([key, val]) => (
                <button 
                  key={key} 
                  type="button"
                  onClick={() => setOpciones({ ...opciones, placa: key })} 
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-2 transition-all ${
                    opciones.placa === key ? "border-blue-500 bg-blue-500/5 shadow-inner" : "border-slate-800 bg-slate-900/30"
                  }`}
                >
                  <div className="h-4 w-full rounded shadow-sm" style={{ backgroundColor: val.color }} />
                  <span className={`text-[7px] font-black uppercase ${opciones.placa === key ? 'text-blue-400' : 'text-slate-600'}`}>{key}</span>
                </button>
              ))}
            </div>
          </div>

          <button 
            type="button"
            onClick={() => setOpciones({ ...opciones, dobleCapa: !opciones.dobleCapa })} 
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-[9px] font-black uppercase transition-all ${
              opciones.dobleCapa ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            <CheckCircle2 size={14} />
            Doble Capa Pladur
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-1 duration-300">
          {Object.entries(VARIANTES_LADRILLO).map(([k,v]) => (
            <button 
              key={k} 
              type="button"
              onClick={() => setOpciones({ ...opciones, tipoLadrillo: k })} 
              className={`py-3 rounded-xl border text-[9px] font-black uppercase transition-all ${
                opciones.tipoLadrillo === k ? 'border-orange-500 bg-orange-500/10 text-orange-500 shadow-md' : 'border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
            >
              {v.nombre}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
