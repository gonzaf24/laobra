import Image from "next/image";
import { X } from "lucide-react";

interface ToolLightboxProps {
  image: string | null;
  onClose: () => void;
}

export function ToolLightbox({ image, onClose }: ToolLightboxProps) {
  if (!image) return null;

  return (
    <div
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-all"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        onClick={onClose}
      >
        <X size={24} />
      </button>
      <div className="animate-in zoom-in-95 relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl duration-300">
        <Image
          src={image}
          alt="Tool preview"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
