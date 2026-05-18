"use client";

import { useEffect, useState } from "react";
import { getCustomPricesAction, saveCustomPriceAction, removeCustomPriceAction } from "./actions";

// Record<materialId_formato, price>
export type CustomPrices = Record<string, number>;

export async function getCustomPrices(): Promise<CustomPrices> {
  return await getCustomPricesAction();
}

export async function saveCustomPrice(materialId: string, formato: string, precio: number) {
  await saveCustomPriceAction(materialId, formato, precio);
}

export async function removeCustomPrice(materialId: string, formato: string) {
  await removeCustomPriceAction(materialId, formato);
}

// Hook to subscribe to prices in UI
export function useCustomPrices() {
  const [prices, setPrices] = useState<CustomPrices>({});

  useEffect(() => {
    getCustomPricesAction().then(setPrices);
  }, []);

  const updatePrice = async (materialId: string, formato: string, precio: number | null) => {
    if (precio === null) {
      await removeCustomPriceAction(materialId, formato);
    } else {
      await saveCustomPriceAction(materialId, formato, precio);
    }
    const updated = await getCustomPricesAction();
    setPrices(updated); // Update local state
  };

  return { prices, updatePrice };
}

export function generatePriceKey(materialId: string, formato: string) {
    return `${materialId}_${formato}`;
}
