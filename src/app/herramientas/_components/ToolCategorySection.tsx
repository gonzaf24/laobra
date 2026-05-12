import { ToolCategory } from "../services/herramientas-service";
import { ToolCard } from "./ToolCard";

interface ToolCategorySectionProps {
  category: ToolCategory;
  onExpandImage: (image: string) => void;
}

export function ToolCategorySection({
  category,
  onExpandImage,
}: ToolCategorySectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <div className={`${category.color} rounded-xl p-2`}>
          <category.icon size={24} />
        </div>
        <h3 className="text-xl font-black tracking-tight text-white uppercase">
          {category.title}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {category.tools.map((tool, idx) => (
          <ToolCard key={idx} tool={tool} onExpand={onExpandImage} />
        ))}
      </div>
    </section>
  );
}
