export interface Material {
  id: string;
  name: string;
  description: string;
  advice: string;
  mixRatio?: string;
  image?: string;
  category:
    | "morteros"
    | "yesos"
    | "adhesivos"
    | "placas"
    | "perfiles"
    | "quimicos";
}

export const MATERIALS_DATA: Material[] = [
  // --- MORTEROS ---
  {
    id: "mortero-m75",
    name: "Mortero Seco M-7,5",
    category: "morteros",
    description:
      "Es el mortero de 'fuerza'. Se usa para levantar paredes de carga, muros exteriores y cualquier tabique que deba aguantar peso o presión.",
    advice:
      "Humedecer siempre el ladrillo antes de poner la masa. Si el ladrillo está seco, le absorberá el agua al mortero demasiado rápido y la unión será débil (se 'quema').",
    mixRatio: "5 litros de agua por cada saco de 25kg.",
    image: "/materiales/mortero-m75.jpg",
  },
  {
    id: "mortero-m5",
    name: "Mortero Seco M-5",
    category: "morteros",
    description:
      "Mortero estándar para tabiquería interior sencilla que no soporta peso estructural. Es más fácil de manejar pero tiene menos resistencia que el M-7,5.",
    advice:
      "Úsalo solo en interiores para dividir estancias. No lo utilices nunca para muros exteriores o paredes donde vayas a colgar elementos muy pesados.",
    mixRatio: "5 litros de agua por cada saco de 25kg.",
    image: "/materiales/mortero-m5.jpeg",
  },
  {
    id: "mortero-autonivelante",
    name: "Mortero Autonivelante",
    category: "morteros",
    description:
      "Mortero líquido que busca su propio nivel por gravedad. Se divide en dos tipos: Nivelante 10 (El más común, para capas finas de hasta 10mm) y Nivelante 80 (Para capas gruesas y grandes desniveles de hasta 80mm).",
    advice:
      "Si el suelo tiene bultos o desniveles, las baldosas acabarán rompiéndose. Aplica SIEMPRE una imprimación (puente de unión) antes de verter el autonivelante o el suelo existente chupará todo el agua y se fisurará.",
    mixRatio:
      "Aprox. 5.5 - 6 litros de agua por saco. Debe fluir como una crema densa.",
    image: "/materiales/mortero-autonivelante.png",
  },
  {
    id: "mortero-cal",
    name: "Mortero de Cal (Transpirable)",
    category: "morteros",
    description:
      "Es el 'mortero que respira'. Permite que la humedad acumulada en el muro salga al exterior en forma de vapor sin romper la pintura ni el enfoscado.",
    advice:
      "Es la única solución real para sótanos y plantas bajas con humedad. NUNCA lo tapes con yeso o pinturas plásticas, porque bloquearías la salida del aire y volverían las manchas.",
    mixRatio:
      "Sigue estrictamente la proporción del fabricante para no perder sus propiedades.",
    image: "/materiales/mortero-cal.png",
  },

  // --- ADHESIVOS Y QUÍMICOS ---
  {
    id: "cola-c1",
    name: "Cemento Cola C1 (Básico)",
    category: "adhesivos",
    description:
      "Es el adhesivo más sencillo. Solo sirve para azulejos normales (pasta roja o blanca) en paredes interiores y suelos con poco tránsito.",
    advice:
      "NUNCA lo uses para pegar gres porcelánico, porque no tiene agarre químico y las piezas se acabarán soltando. Es solo para cerámica porosa.",
    mixRatio: "6 litros de agua por saco.",
    image: "/materiales/cola-c1.png",
  },
  {
    id: "cola-c2",
    name: "Cemento Cola C2 (Para Porcelánico)",
    category: "adhesivos",
    description:
      "Adhesivo de alta adherencia. Es el mínimo obligatorio si vas a poner gres porcelánico en interiores.",
    advice:
      "Aunque pega muy bien el porcelánico, no es flexible. Si tienes suelo radiante o vas a alicatar una terraza al sol, salta directamente al C2 S1 (Flexible).",
    mixRatio: "6 litros de agua por saco.",
    image: "/materiales/cola-c2.png",
  },
  {
    id: "cola-c2te-s1",
    name: "Cemento Cola C2TE S1 (Flexible)",
    category: "adhesivos",
    description:
      "Es como un 'chicle' de alta resistencia. Este cemento cola permite que la baldosa se mueva un poco con los cambios de temperatura sin rajarse ni soltarse.",
    advice:
      "Imprescindible en fachadas, terrazas al sol y suelos radiantes. El 'doble encolado' (pasta en suelo y pasta en pieza) es lo que garantiza que no suene a hueco al pisar.",
    mixRatio: "6.5 litros de agua por saco.",
    image: "/materiales/cola-c2te-s1.png",
  },
  {
    id: "puente-union",
    name: "Puente de Unión (Resina)",
    category: "quimicos",
    description:
      "Es una resina de unión que sirve para que el yeso o el mortero 'agarren' sobre superficies lisas y sin poro (como columnas de hormigón o techos). Actúa como un puente de pegamento.",
    advice:
      "Es obligatorio en cualquier superficie de hormigón visto. Aplícalo con rodillo y espera a que esté 'mordiente' (que pegue al tocarlo con el dedo) antes de empezar a lucir.",
    mixRatio: "Listo para usar o dilución según fabricante.",
    image: "/materiales/puente-union.png",
  },

  // --- PLACAS PYL ---
  {
    id: "placa-blanca",
    name: "Placa Pladur Blanca (Estándar)",
    category: "placas",
    description:
      "La placa de toda la vida para techos y paredes en zonas secas como salones o dormitorios.",
    advice:
      "Es la más barata pero la más débil. Evita usarla en baños o pasillos de mucho tránsito donde pueda recibir golpes con maletas o muebles.",
    mixRatio: "N/A (Atornillado cada 25cm).",
    image: "/materiales/placa-blanca.png",
  },
  {
    id: "placa-verde",
    name: "Placa Pladur Verde (H1)",
    category: "placas",
    description:
      "Placa con un tratamiento especial para que el cartón no se pudra con la humedad. Se usa en baños, cocinas y galerías.",
    advice:
      "Que sea verde NO significa que sea impermeable. En la zona de ducha hay que poner siempre una goma líquida encima antes de alicatar.",
    mixRatio: "N/A",
    image: "/materiales/placa-verde.png",
  },
  {
    id: "placa-azul",
    name: "Placa Alta Dureza (Diamant/Azul)",
    category: "placas",
    description:
      "Placa 'blindada'. Pesa más porque es mucho más densa. Aguanta golpes y aísla mucho mejor del ruido que la placa blanca.",
    advice:
      "Ponla siempre en pasillos y habitaciones infantiles. Aguantará mucho mejor los golpes accidentales sin que se marquen hoyos.",
    mixRatio: "N/A",
    image: "/materiales/placa-azul.png",
  },
  {
    id: "placa-rosa",
    name: "Placa Ignífuga (Foc/Rosa)",
    category: "placas",
    description:
      "Placa cargada de fibra de vidrio para resistir el fuego. Tarda mucho más tiempo en quemarse que una placa normal.",
    advice:
      "Obligatoria para forrar chimeneas, calderas o paredes que separen vecinos. Te da unos minutos vitales de seguridad en caso de incendio.",
    mixRatio: "N/A",
    image: "/materiales/placa-rosa.png",
  },

  // --- PERFILERÍA ---
  {
    id: "perfil-canal",
    name: "Canal de Pladur",
    category: "perfiles",
    description:
      "Es la 'guía' de metal que va atornillada al suelo y al techo. Marca por dónde va a ir el tabique.",
    advice:
      "Si quieres que el tabique no vibre y no pase el ruido, pon siempre una banda de caucho (banda acústica) debajo del canal antes de atornillar.",
    mixRatio: "Fijación con tacos de impacto cada 60cm.",
    image: "/materiales/perfil-canal.png",
  },
  {
    id: "perfil-montante",
    name: "Montante de Pladur",
    category: "perfiles",
    description:
      "Los 'postes' verticales que se encajan en los canales. Son el esqueleto que sujeta las placas de pladur.",
    advice:
      "No los atornilles a los canales; deja que 'floten' dentro de ellos para que la estructura pueda dilatar sin que salgan grietas en las juntas.",
    mixRatio:
      "Modulación estándar a 600mm (o 400mm para paredes que lleven muebles de cocina).",
    image: "/materiales/perfil-montante.png",
  },
  {
    id: "perfil-maestra",
    name: "Maestra / Perfil Techo (TC-47)",
    category: "perfiles",
    description:
      "El perfil de metal que se usa para sujetar los techos falsos o para dejar las paredes de mortero perfectamente rectas.",
    advice:
      "En techos, la distancia entre perfiles debe ser de 60cm máximo. Si pones más distancia, el techo acabará 'haciendo panza' con el tiempo.",
    mixRatio: "Suspensión con varilla roscada o cuelgue rápido.",
    image: "/materiales/perfil-maestra.png",
  },
];
