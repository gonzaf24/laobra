import { Euro, ClipboardList, ChevronRight } from "lucide-react";

interface MaterialDesglosado {
  id: string;
  nombre: string;
  unidad: string;
  cantidadFinal: number;
  precioUnitario: number;
  total: number;
  partida: string;
  capitulo: string;
}

interface Props {
  materiales: MaterialDesglosado[];
  total: number;
}

export function GenesisTecnica({ materiales, total }: Props) {
  const capitulos = Array.from(new Set(materiales.map(m => m.capitulo)));

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-xl shadow-2xl sticky top-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-inner">
            <Euro size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">Génesis Técnica</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">Pedido Logístico Maestro</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-4xl font-black italic text-emerald-500 tracking-tighter drop-shadow-xl">
            {total.toLocaleString()}€
          </p>
          <p className="text-[8px] font-bold text-slate-600 uppercase mt-1">Estimación Técnica Neta</p>
        </div>
      </div>

      {materiales.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-800/50 text-center opacity-30">
          <ClipboardList size={48} className="mb-4 text-slate-700" />
          <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em]">Configure soluciones para desglosar el pedido</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          {capitulos.map((cap) => (
            <div key={cap} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800/50 pb-2">
                <ChevronRight size={12} className="text-emerald-500" />
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{cap}</h3>
              </div>
              <div className="space-y-2">
                {materiales.filter(m => m.capitulo === cap).map((mat, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl bg-slate-950/40 p-3 border border-slate-800/30 hover:bg-slate-900/80 transition-all group">
                    <div className="flex-1">
                      <p className="text-[7px] font-bold text-slate-600 uppercase mb-0.5 tracking-wider">{mat.partida}</p>
                      <h4 className="text-[10px] font-black text-white leading-tight group-hover:text-blue-400 transition-colors">{mat.nombre}</h4>
                      <p className="text-[9px] font-bold text-blue-400 mt-1">
                        {mat.cantidadFinal.toFixed(2)} <span className="text-[7px] opacity-70 uppercase">{mat.unidad}</span>
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-xs font-black text-white italic tracking-tighter">{mat.total.toLocaleString()}€</p>
                      <p className="text-[8px] text-slate-600 font-bold uppercase tracking-tighter">{mat.precioUnitario.toFixed(2)}€/u</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
