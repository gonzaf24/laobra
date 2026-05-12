import {
  OBRAMAT_CATEGORIAS,
  OBRAMAT_CATALOGO,
  ObramatProducto,
} from "@/lib/obramat-data";

export const obramatService = {
  // Categorías y Subcategorías
  getCategories: () => OBRAMAT_CATEGORIAS,

  getSubcategories: (
    catId: string,
    localExtraSubs: Record<string, string[]>
  ) => {
    const base =
      OBRAMAT_CATEGORIAS.find((c) => c.id === catId)?.subcategorias || [];
    const extra = localExtraSubs[catId] || [];
    return [...base, ...extra];
  },

  // Materiales
  getMaterials: (
    categoryId: string | null,
    subcategory: string | null,
    localMaterials: ObramatProducto[]
  ) => {
    const all = [...OBRAMAT_CATALOGO, ...localMaterials];
    return all.filter((p) => {
      if (p.categoriaId !== categoryId) return false;
      if (subcategory && p.subcategoria !== subcategory) return false;
      return true;
    });
  },

  // Persistencia (Abstracción de LocalStorage)
  saveToLocal: <T>(key: string, data: T | null) => {
    if (typeof window !== "undefined") {
      if (data === null) {
        localStorage.removeItem(`obramat_${key}`);
      } else {
        localStorage.setItem(
          `obramat_${key}`,
          typeof data === "string" ? data : JSON.stringify(data)
        );
      }
    }
  },

  loadFromLocal: <T>(key: string, defaultValue: T): T => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`obramat_${key}`);
      if (!saved) return defaultValue;
      try {
        return JSON.parse(saved) as T;
      } catch {
        return (saved as unknown) as T;
      }
    }
    return defaultValue;
  },
};
