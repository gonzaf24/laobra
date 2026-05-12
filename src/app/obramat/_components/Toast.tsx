import { Search } from "lucide-react";

interface ToastProps {
  show: boolean;
}

export function Toast({ show }: ToastProps) {
  if (!show) return null;

  return (
    <div className="fixed top-20 left-1/2 z-[300] flex -translate-x-1/2 animate-bounce items-center gap-3 rounded-2xl border border-amber-500/50 bg-slate-900/90 px-6 py-4 text-white shadow-[0_0_30px_rgba(245,158,11,0.2)] backdrop-blur-xl">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-slate-950">
        <Search size={20} />
      </div>
      <div>
        <p className="text-xs font-black tracking-widest uppercase">
          ¡Referencia Copiada!
        </p>
        <p className="text-[10px] text-slate-400">
          Usa <span className="font-bold text-amber-500 underline">Cmd+F</span> para buscar en el PDF.
        </p>
      </div>
    </div>
  );
}
