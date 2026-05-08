"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlayCircle, Hammer, Calculator, ShoppingCart } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Inicio", href: "/", icon: Home },
    { name: "Formación", href: "/formacion", icon: PlayCircle },
    { name: "Compras", href: "/compras", icon: ShoppingCart },
    { name: "Herramientas", href: "/herramientas", icon: Hammer },
    { name: "Cálculos", href: "/calculos", icon: Calculator },
  ];

  return (
    <nav className="nav-bottom">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${isActive ? "active" : ""}`}
          >
            <Icon size={24} />
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
