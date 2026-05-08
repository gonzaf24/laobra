"use client";

import { useEffect, useState } from "react";
import {
  Home,
  Bath,
  Utensils,
  Sun,
  CheckCircle2,
  Info,
  Play,
  Droplets,
  Hammer,
  Zap,
  LucideIcon,
  Calculator,
  AlertTriangle,
  ChevronDown,
  X,
} from "lucide-react";

interface EstanciaItem {
  area: string;
  material: string;
  purpose: string;
  reason: string;
  example: string;
  videoIds?: string[];
}

interface Estancia {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  description: string;
  items: EstanciaItem[];
}

const ESTANCIAS_DATA: Estancia[] = [
  // ... (keeping same data)
  {
    id: "salon",
    name: "Sala / Dormitorios",
    icon: Home,
    color: "bg-slate-500/10 text-slate-400",
    description:
      "Habitaciones normales: Que queden bonitas, calientes y sin ruidos.",
    items: [
      {
        area: "Suelos",
        material: "Mortero Autonivelante + Cemento Cola Flexible",
        purpose:
          "Dejar el suelo liso como un espejo antes de poner las baldosas.",
        reason:
          "Si el suelo tiene bultos, al pisar la baldosa esta puede crujir o romperse (el famoso 'baile').",
        example:
          "Echar el líquido autonivelante para que el suelo quede plano antes de poner el parquet.",
        videoIds: ["v1", "v2"],
      },
      {
        area: "Paredes",
        material: "Pladur Blanco o Yeso",
        purpose: "Forrar las paredes para que queden lisas y no pase el ruido.",
        reason:
          "La placa de 15mm es más gorda y fuerte; si le das un golpe sin querer, no se rompe tan fácil.",
        example:
          "Poner una segunda pared de pladur con lana de roca (como una manta) para no oír al vecino.",
        videoIds: ["v3", "v4"],
      },
      {
        area: "Techos",
        material: "Pladur Blanco estándar",
        purpose: "Hacer un techo falso para esconder cables y tubos.",
        reason:
          "Es mejor que romper el techo real. Así puedes poner luces empotradas donde quieras.",
        example:
          "Instalar las luces redondas (focos) que van metidas dentro del techo.",
        videoIds: ["v5"],
      },
    ],
  },
  {
    id: "bano",
    name: "Baños",
    icon: Bath,
    color: "bg-blue-500/10 text-blue-400",
    description: "Zonas de agua: Para que no haya goteras ni humedades.",
    items: [
      {
        area: "Suelos",
        material:
          "Líquido Autonivelante + Goma Líquida o Membrana Impermeabilizante",
        purpose:
          "Hacer que el suelo sea como una piscina que no deja pasar ni una gota.",
        reason:
          "Evita que el agua cale al vecino de abajo. NO uses pintura normal, tiene que ser membrana especial para duchas.",
        example:
          "Aplicar la goma líquida en el suelo y subir 20cm por la pared antes de poner los azulejos.",
        videoIds: ["m1", "m2"],
      },
      {
        area: "Paredes",
        material: "Pladur Verde (Antihumedad) + Cola Fuerte",
        purpose:
          "Hacer paredes que aguanten el vapor y los salpicones de agua.",
        reason:
          "El pladur verde no se pudre con la humedad. La cola C2 pega el azulejo tan fuerte que no se cae jamás.",
        example: "Hacer la pared donde va colgado el espejo y el lavabo.",
        videoIds: ["v7", "v8"],
      },
      {
        area: "Techos",
        material: "Pladur Verde (Antihumedad)",
        purpose: "Que el techo no se llene de manchas negras de moho.",
        reason:
          "Al ducharnos sale vapor caliente; este pladur aguanta ese vapor sin estropearse.",
        example: "Poner el techo del baño para que siempre esté limpio y seco.",
        videoIds: ["v9"],
      },
    ],
  },
  {
    id: "cocina",
    name: "Cocinas",
    icon: Utensils,
    color: "bg-amber-500/10 text-amber-400",
    description:
      "Zonas de mucho peso: Preparadas para muebles pesados y calor.",
    items: [
      {
        area: "Suelos",
        material: "Autonivelante + Cemento Cola Flexible",
        purpose:
          "Un suelo muy resistente que aguante el peso de la nevera y el horno.",
        reason:
          "La cocina se usa mucho y se limpia con agua; el suelo debe estar perfecto y no soltarse.",
        example:
          "Poner baldosas grandes que aguanten golpes si se cae una olla.",
        videoIds: ["v1", "v2"],
      },
      {
        area: "Paredes",
        material: "Pladur Verde + Refuerzos de Madera DM o Contrachapado",
        purpose:
          "Reforzar la pared para que aguanten los muebles de cocina colgados.",
        reason:
          "La madera DM no se mueve con el calor. El pladur solo no aguanta el peso; la madera interna es la que sujeta los tornillos.",
        example:
          "Meter tableros de DM de 15mm tras el pladur donde irán los muebles altos.",
        videoIds: ["v3", "v10"],
      },
      {
        area: "Electricidad",
        material: "Cable de 6mm² (Vitro) + Línea propia (Horno)",
        purpose: "Evitar incendios por sobrecarga y cumplir normativa.",
        reason:
          "La placa vitrocerámica necesita un cable grueso de 6mm². El horno debe ir en su propia línea separada.",
        example:
          "Poner el enchufe de 25A para la placa y otro de 16A independiente para el horno.",
        videoIds: ["v11"],
      },
    ],
  },
  {
    id: "terrazas",
    name: "Terrazas / Exterior",
    icon: Sun,
    color: "bg-orange-500/10 text-orange-400",
    description: "Al aire libre: Para aguantar el sol, la lluvia y el frío.",
    items: [
      {
        area: "Suelos",
        material: "Mortero de Cemento (con rampa)",
        purpose: "Hacer que el suelo esté un poco inclinado hacia el desagüe.",
        reason:
          "Si el suelo está plano, el agua se queda estancada y acaba entrando en casa o haciendo charcos.",
        example:
          "Hacer que el agua de lluvia corra solita hacia el agujero del desagüe.",
        videoIds: ["v12"],
      },
      {
        area: "Adhesivo",
        material: "Cemento Cola Ultra-Flexible (S2)",
        purpose:
          "Pegar las baldosas para que no se rajen con el calor del sol.",
        reason:
          "Con el sol, la baldosa se estira. Esta cola es como un chicle que deja que la baldosa se mueva sin romperse.",
        example: "Pegar el suelo de una terraza que le da el sol todo el día.",
        videoIds: ["v13", "v14"],
      },
      {
        area: "Paredes",
        material: "Mortero Especial Exterior",
        purpose:
          "Forrar las paredes de fuera para que no pase el agua de lluvia.",
        reason:
          "Es como ponerle un impermeable a la casa para que no salgan manchas de humedad dentro.",
        example: "Dar el acabado final a la pared de un patio de luces.",
        videoIds: ["v15"],
      },
    ],
  },
  {
    id: "lavaderos",
    name: "Lavaderos / Galerías",
    icon: Droplets,
    color: "bg-cyan-500/10 text-cyan-400",
    description: "Zona de lavadora: Mucha humedad y olores de tuberías.",
    items: [
      {
        area: "Paredes",
        material: "Pladur Verde (Ojo: solo si NO es un sótano)",
        purpose: "Aguantar el vapor de la secadora y la humedad de la ropa.",
        reason:
          "Si el lavadero está en un sótano, NO uses pladur (se pudrirá). Usa el Mortero de Cal que deja transpirar.",
        example:
          "Forrar con pladur verde solo en galerías ventiladas sobre el nivel del suelo.",
        videoIds: ["v7"],
      },
      {
        area: "Fontanería",
        material: "Sifón Individual (Tubería en U)",
        purpose: "Que no huela a alcantarilla en la zona de lavado.",
        reason:
          "Esta pieza atrapa un poco de agua que hace de 'tapón' para que no suban los malos olores.",
        example:
          "Poner la pieza de plástico que conecta el desagüe de la lavadora.",
        videoIds: ["v16"],
      },
      {
        area: "Electricidad",
        material: "Cables directos para cada máquina",
        purpose:
          "Que no salten los plomos cuando pongas la lavadora y la secadora a la vez.",
        reason:
          "Cada máquina necesita su propio 'camino' de electricidad para no sobrecargar el sistema.",
        example:
          "Poner enchufes separados para la lavadora y para la secadora.",
      },
    ],
  },
  {
    id: "sotanos",
    name: "Sótanos / Garajes",
    icon: Hammer,
    color: "bg-emerald-500/10 text-emerald-400",
    description: "Bajo tierra: Zonas con mucha humedad que viene del suelo.",
    items: [
      {
        area: "Paredes",
        material: "Mortero de Cal (que respira)",
        purpose:
          "Dejar que la humedad del muro salga hacia fuera sin romper la pared.",
        reason:
          "EL YESO ESTÁ PROHIBIDO AQUÍ. Si pones yeso, se hinchará y se caerá. La cal deja que el muro 'respire'.",
        example:
          "Arreglar las paredes de un garaje o un trastero que están bajo tierra.",
        videoIds: ["v17"],
      },
      {
        area: "Iluminación",
        material: "Lámparas Cerradas (IP65)",
        purpose: "Luces que no se rompen con el polvo o la humedad.",
        reason:
          "Son lámparas que van selladas; así no les entra suciedad ni agua y no hay cortocircuitos.",
        example: "Poner los tubos de luz en el techo de un garaje oscuro.",
      },
      {
        area: "Suelos",
        material: "Hormigón Duro o Cemento Fuerte",
        purpose: "Un suelo que aguante el peso de los coches sin romperse.",
        reason:
          "Los coches pesan mucho y al girar las ruedas desgastan el suelo; necesita ser muy duro.",
        example:
          "Hacer el suelo de un garaje para que no suelte polvo al pasar.",
        videoIds: ["v18"],
      },
    ],
  },
  {
    id: "pasos",
    name: "Pasillos / Escaleras",
    icon: Zap,
    color: "bg-purple-500/10 text-purple-400",
    description: "Pasillos: Zonas de mucho paso y posibles golpes.",
    items: [
      {
        area: "Paredes",
        material: "Pladur Alta Dureza (Placa Azul)",
        purpose: "Paredes que aguanten golpes sin marcarse.",
        reason:
          "En los pasillos solemos dar golpes con maletas o bicis. Esta placa azul es dura como una piedra.",
        example: "Forrar las paredes del pasillo que lleva a las habitaciones.",
        videoIds: ["v19"],
      },
      {
        area: "Electricidad",
        material: "Conmutadores (varios interruptores para la misma luz)",
        purpose:
          "Poder encender la luz al principio del pasillo y apagarla al final.",
        reason:
          "Comodidad y seguridad: así no tienes que volver a oscuras a la otra punta del pasillo para apagar.",
        example:
          "Poner conmutadores para no tener que volver a oscuras a la otra punta del pasillo.",
      },
      {
        area: "Escaleras",
        material: "Cemento de Agarre Fuerte",
        purpose: "Dejar los escalones perfectos antes de poner el mármol.",
        reason:
          "Hay que dejar el escalón 'a plomo' (recto de arriba a abajo) para que luego la piedra encaje bien.",
        example:
          "Rellenar los huecos de una escalera de obra antes de vestirla de bonito.",
        videoIds: ["v20"],
      },
    ],
  },
];

export default function EstanciasPage() {
  const [openEstancias, setOpenEstancias] = useState<string[]>([]);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Cargar estado inicial desde localStorage (solo al montar)
  useEffect(() => {
    const saved = localStorage.getItem("laobra_estancias_open");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Desfasamos la actualización para evitar el renderizado en cascada síncrono
          setTimeout(() => {
            setOpenEstancias(parsed);
          }, 0);
        }
      } catch (e) {
        console.error("Error al cargar estancias abiertas", e);
      }
    }
  }, []);

  const toggleEstancia = (id: string) => {
    setOpenEstancias((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      // Guardamos directamente en el evento para evitar efectos en cascada
      localStorage.setItem("laobra_estancias_open", JSON.stringify(next));
      return next;
    });
  };

  const isEstanciaOpen = (id: string) => openEstancias.includes(id);

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 pb-32">
      <header className="mb-10 text-center md:text-left">
        <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="mb-4 text-4xl leading-none font-black tracking-tighter uppercase md:text-5xl">
              Guía por <span className="text-primary">Estancia</span>
            </h2>
            <p className="text-text-muted max-w-lg text-base italic">
              &quot;Explicado paso a paso para que lo entiendas a la
              primera.&quot;
            </p>
          </div>
          <div className="flex items-center gap-3 self-start rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 md:self-auto">
            <div className="h-2 w-2 animate-pulse rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
            <p className="text-xs font-black tracking-widest text-amber-500 uppercase">
              Vídeos en preparación
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-inner backdrop-blur-sm">
          <p className="text-text-muted flex items-center gap-3 text-xs leading-relaxed italic">
            <Info size={18} className="shrink-0 text-amber-500" />
            <span>
              <span className="font-bold text-amber-500 not-italic">
                AVISO:
              </span>{" "}
              Los vídeos de ejecución de materiales se están procesando. Pronto
              tendrás acceso a la guía visual completa.
            </span>
          </p>
        </div>
      </header>

      <div className="space-y-6">
        {ESTANCIAS_DATA.map((estancia) => (
          <section key={estancia.id} className="relative">
            {/* Cabecera del Acordeón */}
            <button
              onClick={() => toggleEstancia(estancia.id)}
              className="group hover:border-primary/50 flex w-full items-center justify-between gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-4 transition-all"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-2xl p-3 ${estancia.color} border border-white/10 shadow-xl transition-transform group-hover:scale-110`}
                >
                  <estancia.icon size={28} strokeWidth={2.5} />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-black tracking-tight text-white uppercase italic md:text-2xl">
                    {estancia.name}
                  </h3>
                  <p className="text-text-muted text-[10px] tracking-widest uppercase">
                    {estancia.items.length} zonas de actuación
                  </p>
                </div>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-500 transition-all ${isEstanciaOpen(estancia.id) ? "bg-primary/20 text-primary rotate-180" : ""}`}
              >
                <ChevronDown size={20} />
              </div>
            </button>

            {/* Contenido del Acordeón */}
            {isEstanciaOpen(estancia.id) && (
              <div className="animate-in fade-in slide-in-from-top-4 mt-6 grid grid-cols-1 gap-8 duration-300">
                {estancia.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="group hover:border-primary/40 hover:shadow-primary/5 relative overflow-hidden rounded-4xl border border-slate-800 bg-slate-900/40 shadow-lg transition-all duration-300 hover:bg-slate-900/60"
                  >
                    {/* Área / Título */}
                    <div className="absolute top-0 left-0 rounded-br-2xl border-r border-b border-slate-700/50 bg-slate-800 px-6 py-2">
                      <span className="text-primary text-[10px] font-black tracking-[0.3em] uppercase">
                        {item.area}
                      </span>
                    </div>

                    <div className="p-8 pt-12">
                      <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row">
                        <div className="max-w-xl">
                          <h4 className="group-hover:text-primary mb-3 text-2xl leading-tight font-black text-white uppercase transition-colors md:text-3xl">
                            {item.material}
                          </h4>
                          <div className="text-primary flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase">
                            <Hammer size={12} />
                            Ficha Técnica de Instalación
                          </div>
                        </div>

                        {item.videoIds && item.videoIds.length > 0 && (
                          <div className="flex gap-2 self-end md:self-auto">
                            {item.videoIds.map((vId, vIdx) => (
                              <button
                                key={vIdx}
                                onClick={() => setShowVideoModal(true)}
                                className="bg-primary hover:shadow-primary/50 relative flex h-14 w-14 items-center justify-center rounded-2xl text-slate-900 shadow-[0_8px_20px_rgba(var(--primary-rgb),0.3)] transition-all hover:-translate-y-1"
                                title="Ver vídeo"
                              >
                                <Play size={24} fill="currentColor" />
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 animate-ping rounded-full bg-white opacity-40"></span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Grid de Detalles Técnicos */}
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {/* Propósito */}
                        <div className="bg-primary/5 border-primary/20 rounded-2xl border p-5 md:col-span-3">
                          <p className="text-primary mb-2 flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
                            <Zap size={14} /> ¿Para qué sirve?
                          </p>
                          <p className="text-base leading-relaxed text-white">
                            {item.purpose}
                          </p>
                        </div>

                        {/* Razón */}
                        <div className="rounded-2xl border border-slate-800/50 bg-slate-800/30 p-5">
                          <p className="mb-3 flex items-center gap-2 text-[10px] font-black tracking-widest text-amber-500 uppercase">
                            <Info size={14} /> El motivo
                          </p>
                          <p className="text-text-muted border-l-2 border-amber-500/30 pl-3 text-sm leading-relaxed italic">
                            &quot;{item.reason}&quot;
                          </p>
                        </div>

                        {/* Ejemplo */}
                        <div className="rounded-2xl border border-slate-800/50 bg-slate-800/30 p-5 md:col-span-2">
                          <p className="mb-3 flex items-center gap-2 text-[10px] font-black tracking-widest text-emerald-500 uppercase">
                            <CheckCircle2 size={14} /> Caso Práctico
                          </p>
                          <p className="text-text-muted text-sm leading-relaxed">
                            {item.example}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Cierre de Sección Potente */}
        <footer className="border-primary/30 relative mt-24 overflow-hidden rounded-[3rem] border bg-slate-900 p-8 text-center shadow-2xl md:p-12">
          <div className="via-primary/50 absolute top-0 left-0 h-1 w-full bg-linear-to-r from-transparent to-transparent"></div>
          <div className="bg-primary/10 text-primary mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl">
            <Calculator size={40} />
          </div>
          <h3 className="mb-4 text-3xl font-black tracking-tight text-white uppercase">
            Planifica con <span className="text-primary">Cabeza</span>
          </h3>
          <p className="text-text-muted mx-auto mb-10 max-w-lg text-lg leading-relaxed">
            Si algún término te suena raro, pregunta a tu oficial de primera. Es
            mejor preguntar dos veces que picar el suelo una vez mal.
          </p>
          <div className="inline-flex items-center gap-4 rounded-full border border-slate-700 bg-slate-800 px-8 py-4 shadow-inner">
            <AlertTriangle className="text-amber-500" size={20} />
            <p className="text-sm font-black tracking-widest text-white uppercase">
              La seguridad es lo primero
            </p>
          </div>
        </footer>
      </div>

      {/* Modal de Aviso de Vídeo */}
      {showVideoModal && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 backdrop-blur-md duration-300">
          <div className="border-primary/30 shadow-primary/20 animate-in zoom-in-95 relative w-full max-w-md overflow-hidden rounded-[2.5rem] border bg-slate-950 p-8 shadow-2xl duration-300">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-6 right-6 text-slate-500 transition-colors hover:text-white"
            >
              <X size={24} />
            </button>

            <div className="bg-primary/10 text-primary mb-6 flex h-20 w-20 items-center justify-center rounded-3xl">
              <Play size={40} fill="currentColor" />
            </div>

            <h3 className="mb-3 text-2xl font-black tracking-tight text-white uppercase">
              Contenido en <span className="text-primary">Producción</span>
            </h3>
            <p className="text-text-muted mb-8 text-base leading-relaxed">
              Próximamente se enlazará este botón directamente con los vídeos de
              las{" "}
              <span className="decoration-primary font-bold text-white underline">
                formaciones técnicas
              </span>
              . Estamos preparando el material didáctico más completo del
              sector.
            </p>

            <button
              onClick={() => setShowVideoModal(false)}
              className="bg-primary w-full rounded-2xl py-4 text-sm font-black tracking-widest text-slate-900 uppercase shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
