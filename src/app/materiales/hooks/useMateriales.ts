import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { materialesService } from "../services/materiales-service";
import { useCustomPrices } from "@/lib/materials-store";

export function useMateriales() {
  const searchParams = useSearchParams();
  const fromEstancia = searchParams.get("from");
  const [activeHash, setActiveHash] = useState("");
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [isEditingPrices, setIsEditingPrices] = useState(false);
  const { prices: customPrices, updatePrice } = useCustomPrices();

  const originEstancia = materialesService.getOriginEstancia(fromEstancia);
  const materials = materialesService.getMaterials();

  // Detectar el hash actual y hacer scroll
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveHash(hash);

      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 150);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return {
    materials,
    originEstancia,
    activeHash,
    expandedImage,
    setExpandedImage,
    isEditingPrices,
    setIsEditingPrices,
    customPrices,
    updatePrice,
  };
}
