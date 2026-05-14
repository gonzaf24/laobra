"use client";

import { useState } from "react";
import {
  ChevronDown,
  ShieldCheck,
  Truck,
  Hammer,
  Zap,
  Paintbrush,
  Layout,
  HardHat,
  FileText,
  ThermometerSun,
  Home,
  Bath,
  Package,
  type LucideIcon,
} from "lucide-react";

interface SubItem {
  name: string;
  detail: string;
}

interface Area {
  title: string;
  icon: LucideIcon;
  items: SubItem[];
}

interface TipoDefinicion {
  id: string;
  title: string;
  description: string;
  areas: Area[];
}

const DEFINICIONES: TipoDefinicion[] = [
  {
    id: "reforma-integral",
    title: "Reforma Integral",
    description:
      "Transformación total de la vivienda. Incluye redistribución, cambios estructurales y renovación completa de instalaciones.",
    areas: [
      {
        title: "Logística y Administración",
        icon: FileText,
        items: [
          {
            name: "Licencias y Permisos",
            detail:
              "Gestión de Licencia de Obra Mayor/Menor, Tasas Urbanísticas (ICIO) y fianzas de residuos.",
          },
          {
            name: "Suministros Provisionales",
            detail:
              "Alta de luz y agua de obra, gestión de cuadros de obra certificados.",
          },
          {
            name: "Seguridad y Salud",
            detail:
              "Plan de seguridad, protecciones colectivas (redes, barandillas) e individuales (EPIs).",
          },
          {
            name: "Planificación Logística",
            detail:
              "Carga/descarga, acopio de materiales por fases y control de accesos.",
          },
        ],
      },
      {
        title: "Demoliciones y Estructura",
        icon: Hammer,
        items: [
          {
            name: "Derribos Técnicos",
            detail:
              "Desmontaje de instalaciones, picado de revestimientos y retirada selectiva de escombros.",
          },
          {
            name: "Apeos y Refuerzos",
            detail:
              "Cálculo de apuntalamientos, instalación de vigas IPN/HEB y conectores estructurales.",
          },
          {
            name: "Saneamiento de Forjados",
            detail:
              "Reparación de viguetas, limpieza de armaduras y aplicación de pasivadores de óxido.",
          },
        ],
      },
      {
        title: "Instalaciones Críticas",
        icon: Zap,
        items: [
          {
            name: "Fontanería de Vanguardia",
            detail:
              "Colectores de distribución, tuberías Multicapa/PEX con aislamiento térmico y retorno de ACS.",
          },
          {
            name: "Electricidad Inteligente",
            detail:
              "Cuadros con protectores de sobretensiones, circuitos domóticos y mecanismos de diseño.",
          },
          {
            name: "Saneamiento Insonorizado",
            detail:
              "Bajantes de PVC de triple capa para absorción acústica y botes sifónicos registrables.",
          },
        ],
      },
      {
        title: "Envolvente y Acabados",
        icon: Layout,
        items: [
          {
            name: "Trasdosados Acústicos",
            detail:
              "Sistemas de Pladur con lana de roca de alta densidad y bandas estancas perimetrales.",
          },
          {
            name: "Pavimentos de Lujo",
            detail:
              "Suelos porcelánicos rectificados, parqué de madera natural o microcemento bicomponente.",
          },
          {
            name: "Carpintería Técnica",
            detail:
              "Ventanas con Triple Vidrio y Gas Argón, puertas de paso macizas y armarios de suelo a techo.",
          },
        ],
      },
      {
        title: "Ingeniería de Baños",
        icon: Bath,
        items: [
          {
            name: "Fontanería Empotrada",
            detail:
              "Cuerpos de grifería termostática empotrados, cisternas de inodoro ocultas y rociadores de techo.",
          },
          {
            name: "Impermeabilización Total",
            detail:
              "Membranas bicomponentes en toda la zona de agua y bandas elásticas en esquinas/juntas.",
          },
          {
            name: "Alicatado de Autor",
            detail:
              "Colocación de Gran Formato (120x260), cortes a inglete a 45º y rejuntado epoxi antimoho.",
          },
        ],
      },
      {
        title: "Alta Cocina",
        icon: Package,
        items: [
          {
            name: "Ergonomía y Herrajes",
            detail:
              "Mecanismos de extracción total, organizadores técnicos y cajones con freno de alta carga.",
          },
          {
            name: "Superficies Técnicas",
            detail:
              "Encimeras de porcelánico de gran espesor (Dekton/Neolith) con fregaderos bajo encimera.",
          },
          {
            name: "Extracción e Iluminación",
            detail:
              "Campanas de alto flujo insonorizadas e iluminación LED integrada en muebles altos.",
          },
        ],
      },
      {
        title: "Climatización Invisible",
        icon: ThermometerSun,
        items: [
          {
            name: "Suelo Radiante / Refrescante",
            detail:
              "Instalación de paneles de tetones, tubería PEX-a y mortero autonivelante de alta conductividad térmica.",
          },
          {
            name: "Aerotermia y Control",
            detail:
              "Bomba de calor aire-agua, depósitos de inercia y termostatos inteligentes por zonas (Airzone).",
          },
          {
            name: "Ventilación VMC",
            detail:
              "Sistema de ventilación mecánica controlada de doble flujo con recuperador de calor para salud ambiental.",
          },
        ],
      },
      {
        title: "Pintura y Revestimientos",
        icon: Paintbrush,
        items: [
          {
            name: "Alisado de Paramentos",
            detail:
              "Eliminación de gotelé mediante lijado con aspiración y aplicación de masillas de terminación Q4.",
          },
          {
            name: "Decoración Avanzada",
            detail:
              "Molduras de Orac Decor, papeles pintados vinílicos y aplicación de microcemento en zonas nobles.",
          },
        ],
      },
    ],
  },
  {
    id: "reforma-parcial",
    title: "Reforma Parcial (Cocina/Baños)",
    description:
      "Intervención de alta precisión en zonas húmedas. Foco en la estanqueidad, la ergonomía y los acabados de diseño.",
    areas: [
      {
        title: "Ingeniería de Baños",
        icon: Bath,
        items: [
          {
            name: "Fontanería Empotrada",
            detail:
              "Cuerpos de grifería termostática empotrados, cisternas de inodoro ocultas y rociadores de techo.",
          },
          {
            name: "Impermeabilización Total",
            detail:
              "Membranas bicomponentes en toda la zona de agua y bandas elásticas en esquinas/juntas.",
          },
          {
            name: "Techos Técnicos",
            detail:
              "Falsos techos de pladur hidrófugo con trampillas de registro ocultas para aire acondicionado.",
          },
        ],
      },
      {
        title: "Alta Cocina",
        icon: Package,
        items: [
          {
            name: "Ergonomía y Herrajes",
            detail:
              "Mecanismos de extracción total, organizadores técnicos y cajones con freno de alta carga.",
          },
          {
            name: "Superficies Técnicas",
            detail:
              "Encimeras de porcelánico de gran espesor (Dekton/Neolith) con fregaderos bajo encimera.",
          },
          {
            name: "Logística Específica",
            detail:
              "Traslado de calderas, contadores y protección exhaustiva de zonas comunes y suelos.",
          },
        ],
      },
    ],
  },
  {
    id: "acondicionamiento",
    title: "Acondicionamiento (Lavado de Cara)",
    description:
      "Mejoras estéticas y funcionales sin tocar la estructura ni la distribución principal. Maximiza el valor con la mínima obra.",
    areas: [
      {
        title: "Carpintería y Estética",
        icon: Paintbrush,
        items: [
          {
            name: "Lacado y Herrajes",
            detail:
              "Lacado de puertas en obra con turbina, cambio de manetas y actualización de rodapiés a 10-12cm.",
          },
          {
            name: "Suelos Rápidos",
            detail:
              "Colocación de suelo laminado AC5 o vinílico SPC sobre el suelo existente sin rebajar puertas.",
          },
        ],
      },
      {
        title: "Limpieza y Entrega",
        icon: ShieldCheck,
        items: [
          {
            name: "Limpieza de Fin de Obra",
            detail:
              "Eliminación de restos de cemento, pintura en vidrios y desinfección profunda de estancias.",
          },
          {
            name: "Repasado Eléctrico",
            detail:
              "Sustitución de mecanismos amarilleados y actualización a luminarias LED de tono neutro.",
          },
        ],
      },
    ],
  },
  {
    id: "obra-nueva",
    title: "Obra Nueva / Ampliación",
    description:
      "Construcción desde cero o ampliaciones de volumen. Requiere proyecto arquitectónico y gestión integral de obra.",
    areas: [
      {
        title: "Proyecto y Cimentación",
        icon: FileText,
        items: [
          {
            name: "Estudios Previos",
            detail:
              "Estudio Geotécnico del terreno, levantamiento topográfico y acta de replanteo oficial.",
          },
          {
            name: "Cimentación Técnica",
            detail:
              "Excavación, losas o zapatas reforzadas, muros de sótano impermeabilizados y drenajes perimetrales.",
          },
        ],
      },
      {
        title: "Estructura y Cerramientos",
        icon: Home,
        items: [
          {
            name: "Estructura Portante",
            detail:
              "Pilares de hormigón/acero, forjados unidireccionales o reticulares y escaleras de hormigón visto.",
          },
          {
            name: "Envolvente Térmica",
            detail:
              "Fachadas ventiladas o SATE de alto espesor y cubiertas invertidas con aislamiento XPS de 10-14cm.",
          },
        ],
      },
      {
        title: "Ingeniería de Instalaciones",
        icon: Zap,
        items: [
          {
            name: "Sistemas Passivhaus",
            detail:
              "Aerotermia con suelo radiante/refrescante y ventilación mecánica (VMC) con recuperación de calor.",
          },
          {
            name: "Energía y Domótica",
            detail:
              "Placas fotovoltaicas, control de accesos, domótica KNX y puntos de recarga de vehículos.",
          },
        ],
      },
      {
        title: "Ingeniería de Baños",
        icon: Bath,
        items: [
          {
            name: "Fontanería Empotrada",
            detail:
              "Cuerpos de grifería termostática empotrados, cisternas de inodoro ocultas y rociadores de techo.",
          },
          {
            name: "Impermeabilización Total",
            detail:
              "Membranas bicomponentes en toda la zona de agua y bandas elásticas en esquinas/juntas.",
          },
          {
            name: "Alicatado de Autor",
            detail:
              "Colocación de Gran Formato (120x260), cortes a inglete a 45º y rejuntado epoxi antimoho.",
          },
        ],
      },
      {
        title: "Alta Cocina",
        icon: Package,
        items: [
          {
            name: "Ergonomía y Herrajes",
            detail:
              "Mecanismos de extracción total, organizadores técnicos y cajones con freno de alta carga.",
          },
          {
            name: "Superficies Técnicas",
            detail:
              "Encimeras de porcelánico de gran espesor (Dekton/Neolith) con fregaderos bajo encimera.",
          },
          {
            name: "Extracción e Iluminación",
            detail:
              "Campanas de alto flujo insonorizadas e iluminación LED integrada en muebles altos.",
          },
        ],
      },
      {
        title: "Pintura y Acabados Nobles",
        icon: Paintbrush,
        items: [
          {
            name: "Alisado Q4",
            detail:
              "Preparación de paramentos para pintura lisa perfecta, eliminando cualquier imperfección de obra.",
          },
          {
            name: "Revestimientos de Diseño",
            detail:
              "Aplicación de pinturas de alta calidad, papeles pintados técnicos y remates de carpintería.",
          },
        ],
      },
      {
        title: "Exteriores y Suministros",
        icon: Truck,
        items: [
          {
            name: "Urbanización Privada",
            detail:
              "Vallado perimetral, pavimentación de accesos, gestión de pluviales y depuradoras biológicas.",
          },
          {
            name: "Acometidas y Altas",
            detail:
              "Gestión de conexiones a red de alcantarillado, agua potable y transformadores eléctricos.",
          },
        ],
      },
    ],
  },
  {
    id: "rehabilitacion-energetica",
    title: "Rehabilitación Energética",
    description:
      "Mejora drástica de la eficiencia para reducir el consumo y aumentar el confort térmico.",
    areas: [
      {
        title: "Aislamiento Proactivo",
        icon: ShieldCheck,
        items: [
          {
            name: "Insuflado Térmico",
            detail:
              "Relleno de cámaras de aire con celulosa o lana de roca mediante perforaciones mínimas.",
          },
          {
            name: "Aislamiento de Puentes",
            detail:
              "Tratamiento de cantos de forjado, pilares y cajas de persiana para evitar condensaciones.",
          },
        ],
      },
      {
        title: "Sistemas de Ahorro",
        icon: Zap,
        items: [
          {
            name: "Energía Solar",
            detail:
              "Instalación de paneles fotovoltaicos, inversores híbridos y preinstalación para baterías.",
          },
          {
            name: "Ventilación Inteligente",
            detail:
              "Sistemas VMC que renuevan el aire sin perder temperatura, eliminando humedades por completo.",
          },
        ],
      },
    ],
  },
];

export function GuiaTiposObra() {
  const [openType, setOpenType] = useState<string | null>(null);

  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
          <HardHat size={20} />
        </div>
        <div>
          <h2 className="text-sm font-black tracking-widest text-white uppercase">
            Guía Maestra de Alcance
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase">
            Definición de estándares según el tipo de intervención
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {DEFINICIONES.map((tipo) => (
          <div
            key={tipo.id}
            className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
              openType === tipo.id
                ? "border-amber-500/30 bg-slate-900/80 shadow-2xl"
                : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
            }`}
          >
            <button
              onClick={() => setOpenType(openType === tipo.id ? null : tipo.id)}
              className="flex w-full items-center justify-between p-5 text-left"
            >
              <div className="flex-1">
                <h3
                  className={`text-base font-black tracking-tight uppercase italic transition-colors ${
                    openType === tipo.id ? "text-amber-500" : "text-white"
                  }`}
                >
                  {tipo.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {tipo.description}
                </p>
              </div>
              <div
                className={`ml-4 flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                  openType === tipo.id
                    ? "rotate-180 border-amber-500/50 bg-amber-500/10 text-amber-500"
                    : "border-slate-800 text-slate-600"
                }`}
              >
                <ChevronDown size={18} />
              </div>
            </button>

            {openType === tipo.id && (
              <div className="border-t border-slate-800/50 p-5 pt-2">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {tipo.areas.map((area, idx) => (
                    <div key={idx} className="rounded-xl bg-slate-950/40 p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                          <area.icon size={14} />
                        </div>
                        <h4 className="text-[10px] font-black tracking-widest text-slate-300 uppercase">
                          {area.title}
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {area.items.map((item, iidx) => (
                          <li key={iidx} className="group">
                            <p className="mb-0.5 text-[10px] font-bold tracking-tighter text-amber-500/80 uppercase transition-colors group-hover:text-amber-500">
                              {item.name}
                            </p>
                            <p className="text-[10px] leading-relaxed text-slate-500">
                              {item.detail}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-[10px] text-amber-500/70 italic">
                  <ShieldCheck size={14} />
                  <span>
                    Este desglose define el punto de partida técnico para la
                    configuración automática de materiales y plazos.
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
