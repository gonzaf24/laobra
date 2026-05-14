"use client";

import { useState, useMemo } from "react";
import { 
  MULTIPLICADORES_CALIDAD, 
  NivelCalidad,
} from "@/lib/configurador/master-library";

// Sub-componentes (los crearemos a continuación)
import { BarraAcciones } from "./configurador/BarraAcciones";
import { ListaConfiguraciones } from "./configurador/ListaConfiguraciones";
import { GenesisTecnica } from "./configurador/GenesisTecnica";
import { SelectorCalidad } from "./configurador/SelectorCalidad";
import { ItemConfigurado, TipoPartida, ConfiguradorProps } from "./configurador/types";
import { calcularMateriales } from "./configurador/engine";

export function ConfiguradorMaestro({ obraId, initialItems = [], initialCalidad = "estandar" }: ConfiguradorProps) {
  const [calidad, setCalidad] = useState<NivelCalidad>(initialCalidad);
  const [items, setItems] = useState<ItemConfigurado[]>(initialItems);

  const handleAddItem = (tipo: TipoPartida) => {
    const newItem: ItemConfigurado = {
      id: Math.random().toString(36).substr(2, 9),
      tipo,
      cantidad: 0,
      opciones: getDefaultOptions(tipo)
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => setItems(items.filter(i => i.id !== id));
  
  const handleUpdateItem = (id: string, updates: Partial<ItemConfigurado>) => {
    setItems(items.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const materialesCalculados = useMemo(() => {
    return calcularMateriales(items, calidad);
  }, [items, calidad]);

  const totalGlobal = materialesCalculados.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 animate-in fade-in duration-500">
      <div className="lg:col-span-5 space-y-6">
        <SelectorCalidad calidad={calidad} setCalidad={setCalidad} />
        <BarraAcciones onAdd={handleAddItem} />
        <ListaConfiguraciones 
          items={items} 
          onRemove={handleRemoveItem} 
          onUpdate={handleUpdateItem} 
        />
      </div>

      <div className="lg:col-span-7">
        <GenesisTecnica 
          materiales={materialesCalculados} 
          total={totalGlobal} 
        />
      </div>
    </div>
  );
}

function getDefaultOptions(tipo: TipoPartida) {
  switch (tipo) {
    case 'tabique': return { sistema: "pladur", montante: "48", placa: "blanca", medida: "2500", dobleCapa: false, tipoLadrillo: "h7" };
    case 'suelo': return { tipoSuelo: "porcelanico", formato: "60x60" };
    case 'techo': return { tipoTecho: "pladur-continuo" };
    case 'abertura': return { tipoAbertura: "ventana-pvc" };
    case 'fontaneria': return { tipoTubo: "multicapa", aparato: "ninguno", grifo: "monomando" };
    default: return {};
  }
}
