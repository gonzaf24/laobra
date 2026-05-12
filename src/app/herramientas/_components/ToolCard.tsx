import Image from "next/image";
import { CheckCircle2, Maximize2 } from "lucide-react";
import { ToolItem } from "../services/herramientas-service";

interface ToolCardProps {
  tool: ToolItem;
  onExpand: (image: string) => void;
}

export function ToolCard({ tool, onExpand }: ToolCardProps) {
  return (
    <div className="card-obra group hover:border-primary/40 flex flex-col overflow-hidden p-0 transition-all">
      <div className="relative aspect-square w-full overflow-hidden bg-slate-800">
        <Image
          src={tool.image}
          alt={tool.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => onExpand(tool.image)}
        >
          <div className="translate-y-2 transform rounded-full border border-white/30 bg-white/20 p-2 backdrop-blur-md transition-transform group-hover:translate-y-0">
            <Maximize2 size={18} className="text-white" />
          </div>
        </div>
      </div>

      <div className="flex grow flex-col space-y-2 p-3">
        <div className="flex items-start gap-2">
          <div className="bg-primary/10 border-primary/20 mt-0.5 shrink-0 rounded-md border p-1">
            <CheckCircle2 size={12} className="text-primary" />
          </div>
          <h4 className="text-[11px] font-black leading-tight tracking-tight text-white uppercase">
            {tool.name}
          </h4>
        </div>

        <p className="text-text-muted text-[10px] leading-tight">
          {tool.description}
        </p>

        <div className="mt-auto pt-2">
          <div className="rounded-lg border border-slate-800/50 bg-slate-900/50 p-2">
            <p className="mb-0.5 text-[8px] font-black tracking-widest text-amber-500 uppercase">
              ¿Por qué?
            </p>
            <p className="text-text-muted text-[10px] leading-tight italic">
              &quot;{tool.why}&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
