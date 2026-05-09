"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "laobra-materials-prices";

// Record<materialId_formato, price>
export type CustomPrices = Record<string, number>;

export function getCustomPrices(): CustomPrices {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveCustomPrice(materialId: string, formato: string, precio: number) {
  const key = `${materialId}_${formato}`;
  const prices = getCustomPrices();
  prices[key] = precio;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prices));
}

export function removeCustomPrice(materialId: string, formato: string) {
  const key = `${materialId}_${formato}`;
  const prices = getCustomPrices();
  delete prices[key];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prices));
}

// Hook to subscribe to prices in UI
export function useCustomPrices() {
  const [prices, setPrices] = useState<CustomPrices>({});

  useEffect(() => {
    setPrices(getCustomPrices());
    
    // Listen to storage events if changed from other tabs
    const handleStorage = () => setPrices(getCustomPrices());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const updatePrice = (materialId: string, formato: string, precio: number | null) => {
    if (precio === null) {
      removeCustomPrice(materialId, formato);
    } else {
      saveCustomPrice(materialId, formato, precio);
    }
    setPrices(getCustomPrices()); // Update local state
  };

  return { prices, updatePrice };
}

export function generatePriceKey(materialId: string, formato: string) {
    return `${materialId}_${formato}`;
}
