import { X } from "lucide-react";

interface MaterialLightboxProps {
  image: string | null;
  onClose: () => void;
}

export function MaterialLightbox({ image, onClose }: MaterialLightboxProps) {
  if (!image) return null;

  return (
    <div
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm duration-200"
      onClick={onClose}
    >
      <div className="relative flex h-full max-h-full w-full max-w-4xl items-center justify-center">
        <button
          className="hover:bg-primary absolute top-4 right-4 z-50 rounded-full bg-slate-800/80 p-2 text-white shadow-lg transition-colors hover:text-slate-900"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <img
          src={image}
          alt="Material expandido"
          className="animate-in zoom-in-95 max-h-[90vh] max-w-full cursor-auto rounded-lg object-contain shadow-2xl duration-300"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
