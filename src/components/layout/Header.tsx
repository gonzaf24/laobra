import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-background/80 sticky top-0 z-40 flex items-center justify-between border-b border-slate-700/50 px-6 py-4 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="bg-primary overflow-hidden p-1.5 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]">
          <Image
            src="/icon-512.png"
            alt="La Obra Logo"
            width={28}
            height={28}
            className="object-contain"
          />
        </div>
        <h1 className="text-xl font-black tracking-tighter uppercase">
          La <span className="text-primary">Obra</span>
        </h1>
      </div>
    </header>
  );
}
