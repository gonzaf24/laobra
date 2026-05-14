import Link from "next/link";
import { Menu, ArrowLeft, HardHat } from "lucide-react";

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-0 z-[200] flex h-14 shrink-0 items-center justify-between border-b border-amber-500/20 bg-slate-900 px-4 shadow-xl">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:text-amber-500 lg:hidden"
        >
          <Menu size={18} />
        </button>
        <Link
          href="/"
          className="hidden h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white sm:flex"
        >
          <ArrowLeft size={16} />
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <HardHat size={18} />
          </div>
          <div>
            <h1 className="text-xs font-black tracking-tight text-white uppercase italic sm:text-sm">
              Arquitecto{" "}
              <span className="text-[8px] text-amber-500 sm:text-[10px]">
                OBRAMAT
              </span>
            </h1>
            <p className="text-[8px] font-bold tracking-widest text-amber-500/70 uppercase sm:text-[9px]">
              Base de Datos Técnica
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[8px] font-bold text-amber-400 sm:px-3 sm:text-[10px]">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
          <span className="xs:inline hidden text-white">V. 2026-Bcn</span>
          <span className="xs:hidden">V.26</span>
        </div>
      </div>
    </header>
  );
}
