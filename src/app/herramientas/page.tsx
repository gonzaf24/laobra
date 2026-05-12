"use client";

import { useHerramientas } from "./hooks/useHerramientas";
import { ToolHeader } from "./_components/ToolHeader";
import { ToolCategorySection } from "./_components/ToolCategorySection";
import { MaintenanceSection } from "./_components/MaintenanceSection";
import { ToolLightbox } from "./_components/ToolLightbox";

export default function HerramientasPage() {
  const { toolsData, selectedImage, setSelectedImage } = useHerramientas();

  return (
    <div className="px-6 py-8 pb-32">
      <ToolHeader />

      <div className="space-y-12">
        {toolsData.map((cat) => (
          <ToolCategorySection
            key={cat.id}
            category={cat}
            onExpandImage={setSelectedImage}
          />
        ))}

        <MaintenanceSection />
      </div>

      <ToolLightbox
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
