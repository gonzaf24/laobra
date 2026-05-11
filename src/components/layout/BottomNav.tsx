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
} from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Formación", href: "/formaciones", icon: GraduationCap },
    { name: "Estancias", href: "/estancias", icon: Layout },
    { name: "Materiales", href: "/materiales", icon: Box },
    { name: "Herramientas", href: "/herramientas", icon: Hammer },
    { name: "Cálculos", href: "/calculos", icon: Calculator },
    { name: "Gestión", href: "/gestion", icon: Layers },
    { name: "Propuesta", href: "/propuesta", icon: ShieldCheck },
  ];

  return (
    <nav className="nav-bottom">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname?.startsWith(item.href + "/");
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${isActive ? "active" : ""}`}
          >
            <Icon size={20} />
            <span className="text-[10px] font-bold tracking-tight">
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
