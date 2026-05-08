import { HardHat } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-slate-700/50 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-primary p-2 rounded-lg">
          <HardHat size={20} className="text-slate-900" />
        </div>
        <h1 className="text-xl font-black uppercase tracking-tighter">
          La <span className="text-primary">Obra</span>
        </h1>
      </div>
    </header>
  );
}
