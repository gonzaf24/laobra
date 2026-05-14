import { 
  LIBRERIA_MAESTRA, 
  MULTIPLICADORES_CALIDAD, 
  NivelCalidad,
  VARIANTES_LADRILLO,
  VARIANTES_SUELO,
  VARIANTES_PLADUR,
  VARIANTES_TECHOS,
  VARIANTES_ABERTURAS,
  VARIANTES_FONTANERIA
} from "@/lib/configurador/master-library";
import { ItemConfigurado, MaterialDesglosado } from "./types";

export function calcularMateriales(items: ItemConfigurado[], calidad: NivelCalidad): MaterialDesglosado[] {
  const desglose: MaterialDesglosado[] = [];
  const multi = MULTIPLICADORES_CALIDAD[calidad];

  items.forEach((item) => {
    if (item.cantidad <= 0) return;

    // --- TABIQUE ---
    if (item.tipo === "tabique") {
      if (item.opciones.sistema === "pladur") {
        const partida = LIBRERIA_MAESTRA.find(p => p.id === "tabique-pladur-estandar");
        if (partida) {
          partida.materiales.forEach(mat => {
            let cantidad = mat.formula(item.cantidad);
            let nombre = mat.nombre; let precio = mat.precioBase;
            if (mat.categoria === "Placas") {
              const oP = VARIANTES_PLADUR.placas[item.opciones.placa as keyof typeof VARIANTES_PLADUR.placas || 'blanca'];
              nombre = `${item.opciones.dobleCapa ? 'Doble ' : ''}${oP.nombre}`;
              if (item.opciones.dobleCapa) cantidad *= 2;
              precio = oP.precio;
            }
            if (mat.id === "montante") {
              const oMt = VARIANTES_PLADUR.montantes[item.opciones.montante as keyof typeof VARIANTES_PLADUR.montantes || '48'];
              nombre = oMt.nombre; precio = oMt.precio;
            }
            if (mat.id === "tornillo-pm25" && item.opciones.dobleCapa) {
              desglose.push({ ...mat, id: 'pm25', nombre: "Tornillo PM 25 (1ª)", cantidadFinal: item.cantidad * 12, precioUnitario: 0.015, total: item.cantidad * 12 * 0.015, partida: "Pladur", capitulo: "Albañilería" });
              desglose.push({ ...mat, id: 'pm35', nombre: "Tornillo PM 35 (2ª)", cantidadFinal: item.cantidad * 25, precioUnitario: 0.018, total: item.cantidad * 25 * 0.018, partida: "Pladur", capitulo: "Albañilería" });
              return;
            }
            desglose.push({ ...mat, nombre, partida: "Tabique Pladur", capitulo: partida.capitulo, cantidadFinal: cantidad, precioUnitario: mat.afectaCalidad ? precio * multi : precio, total: cantidad * (mat.afectaCalidad ? precio * multi : precio) });
          });
        }
      } else {
        const partida = LIBRERIA_MAESTRA.find(p => p.id === "tabique-ladrillo");
        if (partida) {
          const vL = VARIANTES_LADRILLO[item.opciones.tipoLadrillo as keyof typeof VARIANTES_LADRILLO];
          if (vL) {
            partida.materiales.forEach(mat => {
              const uds_m2 = vL.uds_m2;
              const mortero = vL.mortero_l_m2;
              let cant = mat.id === "ladrillo" ? item.cantidad * uds_m2 : (item.cantidad * mortero) / 25;
              let p = mat.id === "ladrillo" ? vL.precio : mat.precioBase;
              desglose.push({ ...mat, nombre: mat.id === "ladrillo" ? vL.nombre : mat.nombre, partida: "Ladrillo", capitulo: partida.capitulo, cantidadFinal: cant, precioUnitario: p, total: cant * p });
            });
          }
        }
      }
    }

    // --- SUELO ---
    if (item.tipo === "suelo") {
      const partida = LIBRERIA_MAESTRA.find(p => p.id === "suelo-porcelanico");
      if (partida) {
        const vS = VARIANTES_SUELO.tipos[item.opciones.tipoSuelo as keyof typeof VARIANTES_SUELO.tipos];
        const vF = VARIANTES_SUELO.formatos[item.opciones.formato as keyof typeof VARIANTES_SUELO.formatos];
        if (vS && vF) {
          partida.materiales.forEach(mat => {
            let cantidad = 0; let precio = vF.precio_m2;
            if (mat.id === "baldosa") cantidad = item.cantidad * 1.1;
            else if (mat.id === "adhesivo") {
              if (item.opciones.tipoSuelo === 'porcelanico') { cantidad = item.cantidad / 5; precio = 14; }
              else if ((vF as any).manta) { cantidad = item.cantidad * 1.05; precio = 4.5; }
            } else if (mat.id === "nivelacion" && item.opciones.tipoSuelo === 'porcelanico') {
              cantidad = Math.ceil(item.cantidad * 11 / 300); precio = 18;
            }
            if (cantidad > 0) desglose.push({ ...mat, nombre: mat.id === "baldosa" ? vS.nombre : mat.nombre, partida: "Suelos", capitulo: "Acabados", cantidadFinal: cantidad, precioUnitario: mat.afectaCalidad ? precio * multi : precio, total: cantidad * (mat.afectaCalidad ? precio * multi : precio) });
          });
        }
      }
    }

    // --- TECHOS ---
    if (item.tipo === "techo") {
      const partida = LIBRERIA_MAESTRA.find(p => p.id === "techo-tecnico");
      if (partida) {
        const vT = VARIANTES_TECHOS.tipos[item.opciones.tipoTecho as keyof typeof VARIANTES_TECHOS.tipos];
        if (vT) {
          partida.materiales.forEach(mat => {
            let precio = mat.id === "placa-techo" ? vT.precio_base : mat.precioBase;
            desglose.push({ ...mat, nombre: mat.id === "placa-techo" ? vT.nombre : mat.nombre, partida: "Techos", capitulo: "Albañilería", cantidadFinal: mat.formula(item.cantidad), precioUnitario: mat.afectaCalidad ? precio * multi : precio, total: mat.formula(item.cantidad) * (mat.afectaCalidad ? precio * multi : precio) });
          });
        }
      }
    }

    // --- ABERTURAS ---
    if (item.tipo === "abertura") {
      const partida = LIBRERIA_MAESTRA.find(p => p.id === "carpinteria-exterior");
      if (partida) {
        const vA = VARIANTES_ABERTURAS.tipos[item.opciones.tipoAbertura as keyof typeof VARIANTES_ABERTURAS.tipos];
        if (vA) {
          partida.materiales.forEach(mat => {
            let p = mat.id === "unidad-abertura" ? vA.precio_unit : mat.precioBase;
            desglose.push({ ...mat, nombre: mat.id === "unidad-abertura" ? vA.nombre : mat.nombre, partida: "Carpintería", capitulo: "Carpintería", cantidadFinal: mat.formula(item.cantidad), precioUnitario: mat.afectaCalidad ? p * multi : p, total: mat.formula(item.cantidad) * (mat.afectaCalidad ? p * multi : p) });
          });
        }
      }
    }

    // --- FONTANERÍA ---
    if (item.tipo === "fontaneria") {
      const pFont = LIBRERIA_MAESTRA.find(p => p.id === "fontaneria-general");
      if (pFont) {
        const vT = VARIANTES_FONTANERIA.tuberias[item.opciones.tipoTubo as keyof typeof VARIANTES_FONTANERIA.tuberias];
        if (vT) {
          pFont.materiales.forEach(mat => {
            let p = mat.id === "tubo-font" ? vT.precio : mat.precioBase;
            desglose.push({ ...mat, nombre: mat.id === "tubo-font" ? vT.nombre : mat.nombre, partida: "Fontanería (Inst.)", capitulo: "Instalaciones", cantidadFinal: mat.formula(item.cantidad), precioUnitario: p, total: mat.formula(item.cantidad) * p });
          });
        }
      }
      if (item.opciones.aparato !== "ninguno") {
        const pSan = LIBRERIA_MAESTRA.find(p => p.id === "aparato-sanitario");
        if (pSan) {
          const vP = VARIANTES_FONTANERIA.aparatos[item.opciones.aparato as keyof typeof VARIANTES_FONTANERIA.aparatos];
          const vG = VARIANTES_FONTANERIA.griferia[item.opciones.grifo as keyof typeof VARIANTES_FONTANERIA.griferia];
          if (vP && vG) {
            pSan.materiales.forEach(mat => {
              let p = mat.id === "pieza-sanitaria" ? vP.precio : mat.precioBase;
              desglose.push({ ...mat, nombre: mat.id === "pieza-sanitaria" ? vP.nombre : mat.nombre, partida: "Equipamiento", capitulo: "Instalaciones", cantidadFinal: 1, precioUnitario: mat.afectaCalidad ? p * multi : p, total: 1 * (mat.afectaCalidad ? p * multi : p) });
            });
            desglose.push({ 
              id: 'grifo', 
              nombre: vG.nombre, 
              unidad: "Ud", 
              cantidadFinal: 1, 
              precioUnitario: vG.precio * multi, 
              total: vG.precio * multi,
              partida: "Equipamiento", 
              capitulo: "Instalaciones" 
            });
          }
        }
      }
    }
  });

  return desglose;
}
