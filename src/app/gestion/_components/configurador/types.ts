import { NivelCalidad } from "@/lib/configurador/master-library";

export type TipoPartida = "tabique" | "suelo" | "techo" | "yeso" | "abertura" | "fontaneria";

export interface ItemConfigurado {
  id: string;
  tipo: TipoPartida;
  cantidad: number;
  opciones: Record<string, any>; // Usamos Record para mayor flexibilidad pero evitando any puro
}

export interface ConfiguradorProps {
  obraId?: string;
  initialItems?: ItemConfigurado[];
  initialCalidad?: NivelCalidad;
}

export interface MaterialDesglosado {
  id: string;
  nombre: string;
  unidad: string;
  cantidadFinal: number;
  precioUnitario: number;
  total: number;
  partida: string;
  capitulo: string;
  categoria?: string;
  afectaCalidad?: boolean;
}
