import { useState, useEffect, useMemo } from "react";
import { ObramatProducto } from "@/lib/obramat-data";
import { obramatService } from "../services/obramat-service";

export function useObramat() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "pdf">("pdf");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localMaterials, setLocalMaterials] = useState<ObramatProducto[]>([]);
  const [localExtraSubcategories, setLocalExtraSubcategories] = useState<Record<string, string[]>>({});
  const [copiedSku, setCopiedSku] = useState<string | null>(null);

  // Modales
  const [isModalSubOpen, setIsModalSubOpen] = useState(false);
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);

  // Carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveCategory(obramatService.loadFromLocal("activeCategory", null));
      setActiveSubcategory(obramatService.loadFromLocal("activeSubcategory", null));
      setViewMode(obramatService.loadFromLocal("viewMode", "pdf"));
      setLocalMaterials(obramatService.loadFromLocal("localMaterials", []));
      setLocalExtraSubcategories(obramatService.loadFromLocal("localExtraSubs", {}));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Persistencia automática
  useEffect(() => obramatService.saveToLocal("activeCategory", activeCategory), [activeCategory]);
  useEffect(() => obramatService.saveToLocal("activeSubcategory", activeSubcategory), [activeSubcategory]);
  useEffect(() => obramatService.saveToLocal("viewMode", viewMode), [viewMode]);
  useEffect(() => obramatService.saveToLocal("localMaterials", localMaterials), [localMaterials]);
  useEffect(() => obramatService.saveToLocal("localExtraSubs", localExtraSubcategories), [localExtraSubcategories]);

  // Datos derivados
  const activeCatObj = useMemo(() => 
    obramatService.getCategories().find((c) => c.id === activeCategory), 
  [activeCategory]);

  const subcategories = useMemo(() => 
    activeCategory ? obramatService.getSubcategories(activeCategory, localExtraSubcategories) : [],
  [activeCategory, localExtraSubcategories]);

  const filteredProducts = useMemo(() => 
    obramatService.getMaterials(activeCategory, activeSubcategory, localMaterials),
  [activeCategory, activeSubcategory, localMaterials]);

  const currentPdf = activeCatObj ? activeCatObj.pdfPath : "/catalogo/cat-01-indice.pdf";

  // Handlers
  const handlePdfClick = (sku: string) => {
    navigator.clipboard.writeText(sku);
    setCopiedSku(sku);
    setTimeout(() => setCopiedSku(null), 4000);
  };

  const addSubcategory = (name: string) => {
    if (!activeCategory) return;
    setLocalExtraSubcategories({
      ...localExtraSubcategories,
      [activeCategory]: [...(localExtraSubcategories[activeCategory] || []), name],
    });
    setIsModalSubOpen(false);
  };

  const addMaterial = (newMat: ObramatProducto) => {
    setLocalMaterials([...localMaterials, newMat]);
    setIsModalProductOpen(false);
  };

  return {
    activeCategory, setActiveCategory,
    activeSubcategory, setActiveSubcategory,
    viewMode, setViewMode,
    isMobileMenuOpen, setIsMobileMenuOpen,
    localMaterials,
    localExtraSubcategories,
    copiedSku,
    isModalSubOpen, setIsModalSubOpen,
    isModalProductOpen, setIsModalProductOpen,
    activeCatObj,
    subcategories,
    filteredProducts,
    currentPdf,
    handlePdfClick,
    addSubcategory,
    addMaterial,
  };
}
