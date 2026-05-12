import { Box, Info, Lightbulb, Beaker, Ruler, Tag, RefreshCcw } from "lucide-react";
import { Material, PrecioFormato } from "@/lib/materials-data";
import { generatePriceKey } from "@/lib/materials-store";

interface MaterialCardProps {
  material: Material;
  isSelected: boolean;
  isEditingPrices: boolean;
  customPrices: Record<string, number>;
  updatePrice: (materialId: string, formato: string, precio: number | null) => void;
  onExpandImage: (image: string) => void;
}

export function MaterialCard({
  material,
  isSelected,
  isEditingPrices,
  customPrices,
  updatePrice,
  onExpandImage,
}: MaterialCardProps) {
  return (
    <div
      id={material.id}
      className={`group relative overflow-hidden rounded-md border transition-all duration-500 ${
        isSelected
          ? "border-primary z-10 scale-[1.02] bg-slate-900/80 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
          : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
      }`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Imagen */}
        <div
          className={`group/image relative aspect-21/9 w-full cursor-pointer overflow-hidden border-b bg-slate-800/50 transition-colors md:aspect-square md:w-40 md:border-r md:border-b-0 ${
            isSelected ? "border-primary/30" : "hover:border-primary/50 border-slate-800"
          }`}
          onClick={() => material.image && onExpandImage(material.image)}
        >
          {material.image ? (
            <>
              <img
                src={material.image}
                alt={material.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover/image:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover/image:opacity-100">
                <Box size={24} className="text-white" />
              </div>
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-700">
              <Box size={32} strokeWidth={1} />
            </div>
          )}
          <div className="text-primary border-primary/20 pointer-events-none absolute top-2 left-2 rounded-sm border bg-slate-900/80 px-1.5 py-0.5 text-[7px] font-black tracking-widest uppercase backdrop-blur-sm">
            {material.category}
          </div>
        </div>

        {/* Información */}
        <div className="flex-1 p-4">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h3 className={`text-lg font-black uppercase italic transition-colors md:text-xl ${isSelected ? "text-primary" : "text-white"}`}>
              {material.name}
            </h3>
            {isSelected && (
              <span className="bg-primary animate-pulse rounded-full px-2 py-0.5 text-[8px] font-black tracking-tighter text-slate-900 uppercase">
                Seleccionado
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {/* Qué es */}
            <div className="space-y-1">
              <p className="text-primary flex items-center gap-1.5 text-[8px] font-black tracking-widest uppercase">
                <Info size={10} /> ¿Qué es?
              </p>
              <p className={`text-[11px] leading-relaxed transition-colors ${isSelected ? "text-white" : "text-text-muted"}`}>
                {material.description}
              </p>
            </div>

            {/* Consejo */}
            <div className="space-y-1">
              <p className="flex items-center gap-1.5 text-[8px] font-black tracking-widest text-amber-500 uppercase">
                <Lightbulb size={10} /> Consejo
              </p>
              <p className={`border-l border-amber-500/30 pl-2 text-[11px] leading-relaxed italic transition-colors ${isSelected ? "font-medium text-slate-100" : "text-text-muted"}`}>
                {material.advice}
              </p>
            </div>

            {/* Preparación */}
            {material.mixRatio && (
              <div className="space-y-1 lg:col-span-2">
                <p className="flex items-center gap-1.5 text-[8px] font-black tracking-widest text-emerald-500 uppercase">
                  <Beaker size={10} /> Preparación
                </p>
                <div className={`rounded-sm border p-2 transition-colors ${isSelected ? "border-emerald-500/40 bg-emerald-500/10" : "border-emerald-500/10 bg-emerald-500/5"}`}>
                  <p className={`text-[11px] leading-relaxed font-bold ${isSelected ? "text-emerald-400" : "text-emerald-100"}`}>
                    {material.mixRatio}
                  </p>
                </div>
              </div>
            )}

            {/* Medidas */}
            {(material.sizes || material.standardSize) && (
              <div className="space-y-1 lg:col-span-2">
                <p className="mt-2 flex items-center gap-1.5 text-[8px] font-black tracking-widest text-indigo-400 uppercase">
                  <Ruler size={10} /> Medidas Disponibles
                </p>
                <div className={`rounded-sm border p-3 transition-colors ${isSelected ? "border-indigo-500/40 bg-indigo-500/10" : "border-indigo-500/10 bg-indigo-500/5"}`}>
                  {material.sizes && (
                    <ul className="mb-2 flex flex-wrap gap-2">
                      {material.sizes.map((size: string, i: number) => (
                        <li key={i} className={`rounded border px-2 py-1 font-mono text-[10px] shadow-sm ${isSelected ? "border-indigo-500/30 bg-indigo-900/50 text-indigo-200" : "border-slate-700 bg-slate-800 text-slate-400"}`}>
                          {size}
                        </li>
                      ))}
                    </ul>
                  )}
                  {material.standardSize && (
                    <p className={`mt-1 border-t pt-2 text-[11px] leading-relaxed ${isSelected ? "border-indigo-500/30 font-medium text-indigo-200" : "border-slate-700 text-slate-400"}`}>
                      <span className="mr-1.5 text-[9px] font-black text-indigo-400 uppercase">Estándar:</span>
                      {material.standardSize}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Precios */}
            {material.precios && material.precios.length > 0 && (
              <div className="space-y-1 lg:col-span-2">
                <p className="mt-2 flex items-center gap-1.5 text-[8px] font-black tracking-widest text-amber-500 uppercase">
                  <Tag size={10} /> Precios de Referencia
                </p>
                <div className={`rounded-sm border p-3 transition-colors ${isSelected ? "border-amber-500/40 bg-amber-500/10" : "border-amber-500/10 bg-amber-500/5"}`}>
                  <ul className="space-y-1.5">
                    {material.precios.map((p: PrecioFormato, i: number) => {
                      const key = generatePriceKey(material.id, p.formato);
                      const customPrice = customPrices[key];
                      const hasCustomPrice = customPrice !== undefined;
                      const currentPrice = hasCustomPrice ? customPrice : p.precio;

                      return (
                        <li key={i} className="flex items-center justify-between border-b border-amber-500/10 pb-1.5 last:border-0 last:pb-0">
                          <span className={`text-[11px] flex items-center gap-1 ${isSelected ? "text-amber-100" : "text-slate-300"}`}>
                            {p.formato}
                            {hasCustomPrice && !isEditingPrices && <span className="text-amber-400">*</span>}
                          </span>
                          <div className="flex items-center gap-2">
                            {isEditingPrices ? (
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  step="0.01"
                                  className="w-16 rounded border border-amber-500/50 bg-slate-900 px-1 py-0.5 text-right font-mono text-[11px] text-amber-300 outline-none focus:ring-1 focus:ring-amber-500"
                                  value={currentPrice}
                                  onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    if (!isNaN(val)) updatePrice(material.id, p.formato, val);
                                  }}
                                />
                                {hasCustomPrice && (
                                  <button onClick={() => updatePrice(material.id, p.formato, null)} className="text-slate-500 hover:text-red-400">
                                    <RefreshCcw size={10} />
                                  </button>
                                )}
                              </div>
                            ) : (
                              <span className={`font-mono text-[12px] font-black ${hasCustomPrice ? "text-amber-300" : "text-amber-400"}`}>
                                {currentPrice.toFixed(2)}€
                              </span>
                            )}
                            <span className="text-[9px] text-amber-500/70">{p.unidad}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
