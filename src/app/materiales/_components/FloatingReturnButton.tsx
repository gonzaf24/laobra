import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface FloatingReturnButtonProps {
  originEstancia: any;
}

export function FloatingReturnButton({ originEstancia }: FloatingReturnButtonProps) {
  if (!originEstancia) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 fixed bottom-24 left-1/2 z-40 w-auto -translate-x-1/2 duration-500">
      <Link
        href={`/estancias/${originEstancia.id}`}
        className="bg-primary hover:shadow-primary/40 flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] font-black tracking-widest text-slate-900 uppercase shadow-xl transition-all active:scale-95"
      >
        <ArrowLeft size={14} strokeWidth={3} />
        Volver a {originEstancia.name}
      </Link>
    </div>
  );
}
