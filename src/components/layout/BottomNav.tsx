"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Hammer,
  Box,
  Layers,
  GraduationCap,
  Calculator,
  Layout,
  ShieldCheck,
  HardHat,
} from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Formación", href: "/formaciones", icon: GraduationCap },
    { name: "Estancias", href: "/estancias", icon: Layout },
    { name: "Materiales", href: "/materiales", icon: Box },
    { name: "Obramat", href: "/obramat", icon: HardHat },
    { name: "Herramientas", href: "/herramientas", icon: Hammer },
    { name: "Cálculos", href: "/calculos", icon: Calculator },
    { name: "Gestión", href: "/gestion", icon: Layers },
    { name: "Propuesta", href: "/propuesta", icon: ShieldCheck },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-700/50 bg-slate-900/80 pb-safe backdrop-blur-xl">
      <div className="custom-scrollbar flex w-full items-center justify-between overflow-x-auto px-4 py-2 sm:justify-around sm:px-6">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-none flex-col items-center gap-1 px-3 transition-all duration-200 active:scale-90 ${
                isActive ? "text-amber-500" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                  isActive
                    ? "bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                    : "bg-transparent"
                }`}
              >
                <Icon size={isActive ? 22 : 20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span
                className={`text-[9px] font-black tracking-widest uppercase italic transition-all ${
                  isActive ? "opacity-100" : "opacity-50"
                }`}
              >
                {item.name}
              </span>
              {isActive && (
                <div className="h-0.5 w-4 rounded-full bg-amber-500 animate-in fade-in zoom-in duration-300" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
