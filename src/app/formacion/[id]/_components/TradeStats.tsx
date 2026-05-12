import { Clock, BookOpen, Award } from "lucide-react";

interface TradeStatsProps {
  leccionesCount: number;
}

export function TradeStats({ leccionesCount }: TradeStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8">
      <div className="rounded-md border border-slate-800 bg-slate-900/60 p-3 text-center">
        <Clock className="text-primary mx-auto mb-1" size={16} />
        <p className="text-[10px] font-black text-white uppercase tracking-tighter">{leccionesCount} Lecciones</p>
      </div>
      <div className="rounded-md border border-slate-800 bg-slate-900/60 p-3 text-center">
        <BookOpen className="text-blue-400 mx-auto mb-1" size={16} />
        <p className="text-[10px] font-black text-white uppercase tracking-tighter">Formación Pro</p>
      </div>
      <div className="rounded-md border border-slate-800 bg-slate-900/60 p-3 text-center">
        <Award className="text-emerald-400 mx-auto mb-1" size={16} />
        <p className="text-[10px] font-black text-white uppercase tracking-tighter">Certificado</p>
      </div>
    </div>
  );
}
