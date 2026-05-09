export interface PrecioFormato {
  formato: string;       // Ej: "Saco 25kg", "Bidón 15L", "Placa 2000x1200"
  precio: number;        // Precio en € (IVA incluido)
  unidad: string;        // Ej: "€/saco", "€/ud", "€/m²"
}

export interface Material {
  id: string;
  name: string;
  description: string;
  advice: string;
  mixRatio?: string;
  sizes?: string[];
  standardSize?: string;
  image?: string;
  category:
    | "morteros"
    | "yesos"
    | "adhesivos"
    | "placas"
    | "perfiles"
    | "quimicos"
    | "ladrillos"
    | "baldosas"
    | "azulejos"
    | "acabados"
    | "pinturas"
    | "base";
  // ── Precios ──
  precios: PrecioFormato[];
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
    sizes: ["Saco de 25kg", "Saca BigBag de 1000kg"],
    standardSize: "Saco de 25kg.",
    image: "/materiales/mortero-m75.jpg",
    precios: [{ formato: "Saco 25kg", precio: 2.15, unidad: "€/saco" }],
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
    sizes: ["Saco de 25kg", "Saca BigBag de 1000kg"],
    standardSize: "Saco de 25kg.",
    image: "/materiales/mortero-m5.jpeg",
    precios: [{ formato: "Saco 25kg", precio: 1.95, unidad: "€/saco" }],
  },
  {
    id: "autonivelante-10",
    name: "Cemento Autonivelante de 10",
    category: "morteros",
    description:
      "Cemento autonivelante para capas finas de hasta 10mm. Se vierte sobre el suelo viejo y se extiende solo por gravedad, dejando una superficie perfectamente plana. Ideal para pequeñas correcciones de nivel antes de poner baldosas.",
    advice:
      "Aplica SIEMPRE una imprimación (puente de unión) antes de verter el autonivelante, o el suelo existente chupará todo el agua del producto y se fisurará. No lo utilices si el desnivel supera los 10mm.",
    mixRatio:
      "Aprox. 5.5 - 6 litros de agua por saco. Debe fluir como una crema densa.",
    sizes: ["Saco de 25kg"],
    standardSize: "Saco de 25kg.",
    image: "/materiales/mortero-autonivelante.png",
    precios: [{ formato: "Saco 25kg", precio: 9.95, unidad: "€/saco" }],
  },
  {
    id: "autonivelante-80",
    name: "Cemento Autonivelante de 80",
    category: "morteros",
    description:
      "Cemento autonivelante de alto espesor para recrecidos gruesos de 10 a 80mm. Permite rellenar grandes desniveles y recrecer suelos muy desnivelados de una sola pasada, sin necesidad de hacer capas sucesivas.",
    advice:
      "Si el desnivel es muy grande (más de 4cm), es recomendable verterlo en dos capas dejando secar entre ellas. Aplica SIEMPRE imprimación antes de verter. Respeta los tiempos de secado antes de colocar la cerámica encima.",
    mixRatio:
      "Aprox. 4.5 - 5 litros de agua por saco. Consistencia más espesa que el de 10.",
    sizes: ["Saco de 25kg"],
    standardSize: "Saco de 25kg.",
    image: "/materiales/mortero-autonivelante.png",
    precios: [{ formato: "Saco 25kg", precio: 8.50, unidad: "€/saco" }],
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
    sizes: ["Saco de 25kg"],
    standardSize: "Saco de 25kg.",
    image: "/materiales/mortero-cal.png",
    precios: [{ formato: "Saco 25kg", precio: 5.95, unidad: "€/saco" }],
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
    sizes: ["Saco de 25kg"],
    standardSize: "Saco de 25kg.",
    image: "/materiales/cola-c1.jpg",
    precios: [{ formato: "Saco 25kg", precio: 4.50, unidad: "€/saco" }],
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
    sizes: ["Saco de 25kg"],
    standardSize: "Saco de 25kg.",
    image: "/materiales/cola-c2.webp",
    precios: [{ formato: "Saco 25kg", precio: 7.95, unidad: "€/saco" }],
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
    sizes: ["Saco de 25kg"],
    standardSize: "Saco de 25kg.",
    image: "/materiales/cola-c2te-s1.jpg",
    precios: [{ formato: "Saco 25kg", precio: 12.50, unidad: "€/saco" }],
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
    sizes: ["Bote de 1kg", "Bote de 5kg", "Bote de 25kg"],
    standardSize: "Bote de 5kg (suficiente para un baño o cocina estándar).",
    image: "/materiales/puente-union.webp",
    precios: [{ formato: "Bote 1kg", precio: 4.95, unidad: "€/ud" }, { formato: "Bote 5kg", precio: 14.95, unidad: "€/ud" }],
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
    mixRatio: "Atornillado cada 25cm.",
    sizes: ["2000x1200mm", "2500x1200mm", "3000x1200mm"],
    standardSize: "2000x1200mm con 13mm o 15mm de grosor.",
    image: "/materiales/placa-blanca.jpg",
    precios: [{ formato: "Placa 2000x1200 13mm", precio: 5.95, unidad: "€/placa" }, { formato: "Placa 2500x1200 15mm", precio: 8.50, unidad: "€/placa" }],
  },
  {
    id: "placa-verde",
    name: "Placa Pladur Verde (H1)",
    category: "placas",
    description:
      "Placa con un tratamiento especial para que el cartón no se pudra con la humedad. Se usa en baños, cocinas y galerías.",
    advice:
      "Que sea verde NO significa que sea impermeable. En la zona de ducha hay que poner siempre una goma líquida encima antes de alicatar.",
    mixRatio: "Atornillado cada 25cm.",
    sizes: ["2000x1200mm", "2500x1200mm", "3000x1200mm"],
    standardSize: "2000x1200mm con 15mm de grosor (más rígido para alicatar encima).",
    image: "/materiales/placa-verde.webp",
    precios: [{ formato: "Placa 2000x1200 15mm", precio: 9.95, unidad: "€/placa" }],
  },
  {
    id: "placa-azul",
    name: "Placa Alta Dureza (Diamant/Azul)",
    category: "placas",
    description:
      "Placa 'blindada'. Pesa más porque es mucho más densa. Aguanta golpes y aísla mucho mejor del ruido que la placa blanca.",
    advice:
      "Ponla siempre en pasillos y habitaciones infantiles. Aguantará mucho mejor los golpes accidentales sin que se marquen hoyos.",
    mixRatio: "Atornillado cada 25cm.",
    sizes: ["2000x1200mm", "2500x1200mm", "3000x1200mm"],
    standardSize: "2000x1200mm con 15mm de grosor.",
    image: "/materiales/placa-azul.webp",
    precios: [{ formato: "Placa 2000x1200 15mm", precio: 12.50, unidad: "€/placa" }],
  },
  {
    id: "placa-rosa",
    name: "Placa Ignífuga (Foc/Rosa)",
    category: "placas",
    description:
      "Placa cargada de fibra de vidrio para resistir el fuego. Tarda mucho más tiempo en quemarse que una placa normal.",
    advice:
      "Obligatoria para forrar chimeneas, calderas o paredes que separen vecinos. Te da unos minutos vitales de seguridad en caso de incendio.",
    mixRatio: "Atornillado cada 25cm.",
    sizes: ["2000x1200mm", "2500x1200mm", "3000x1200mm"],
    standardSize: "2000x1200mm con 15mm de grosor.",
    image: "/materiales/placa-rosa.webp",
    precios: [{ formato: "Placa 2000x1200 15mm", precio: 11.50, unidad: "€/placa" }],
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
    mixRatio: "Fijación al suelo/techo con tacos de impacto cada 60cm.",
    sizes: ["Ancho 48mm", "Ancho 70mm", "Ancho 90mm"],
    standardSize: "Ancho 48mm en tiras de 3 metros (es el tamaño más común para hacer paredes normales dentro de casa).",
    image: "/materiales/perfil-canal.webp",
    precios: [{ formato: "Perfil 48mm 3m", precio: 3.50, unidad: "€/ud" }],
  },
  {
    id: "perfil-montante",
    name: "Montante de Pladur",
    category: "perfiles",
    description:
      "Los 'postes' verticales que se encajan en los canales. Son el esqueleto que sujeta las placas de pladur.",
    advice:
      "No los atornilles a los canales; deja que 'floten' dentro de ellos para que la estructura pueda dilatar sin que salgan grietas en las juntas.",
    mixRatio: "Colocación cada 60cm o 40cm.",
    sizes: ["Ancho 48mm", "Ancho 70mm", "Ancho 90mm"],
    standardSize: "Ancho 48mm en tiras de 3 metros de largo.",
    image: "/materiales/perfil-montante.webp",
    precios: [{ formato: "Perfil 48mm 3m", precio: 3.95, unidad: "€/ud" }],
  },
  {
    id: "perfil-maestra",
    name: "Maestra / Perfil Techo (TC-47)",
    category: "perfiles",
    description:
      "El perfil de metal que se usa para sujetar los techos falsos o para dejar las paredes de mortero perfectamente rectas.",
    advice:
      "En techos, la distancia entre perfiles debe ser de 60cm máximo. Si pones más distancia, el techo acabará 'haciendo panza' con el tiempo.",
    mixRatio: "Suspensión cada 1 metro máximo.",
    sizes: ["Perfil TC-47 (47mm de ancho)"],
    standardSize: "Tiras de 3 metros de longitud.",
    image: "/materiales/perfil-maestra.webp",
    precios: [{ formato: "Perfil TC-47 3m", precio: 2.95, unidad: "€/ud" }],
  },
  {
    id: "perfil-angular",
    name: "Perfil Angular (L)",
    category: "perfiles",
    description:
      "Es un perfil con forma de 'L' de acero galvanizado que se coloca en todo el perímetro de la habitación. Es el apoyo perimetral obligatorio para los techos continuos. Se atornilla a la pared a la altura deseada y sobre él descansan los extremos de los perfiles de techo (maestras).",
    advice:
      "Si el techo debe tener aislamiento acústico, pon banda estanca también detrás del angular. Si no lo pones, el techo 'flotará' mal y se verán grietas en las esquinas.",
    mixRatio: "Atornillado perimetral cada 60cm.",
    sizes: ["L de 24x24mm", "L de 30x30mm"],
    standardSize: "24x24mm en tiras de 3 metros.",
    image: "/materiales/perfil-angular.webp",
    precios: [{ formato: "Perfil L 24x24 3m", precio: 2.20, unidad: "€/ud" }],
  },
  {
    id: "perfil-omega",
    name: "Perfil Omega",
    category: "perfiles",
    description:
      "Un perfil metálico con forma de sombrero que se atornilla directamente pegado a una pared vieja o en mal estado. Sirve como base para atornillar encima las placas de Pladur nuevas y forrar la pared entera.",
    advice:
      "Es la solución perfecta para tapar una pared fea o un poco torcida perdiendo apenas 2 centímetros de habitación, en lugar de perder los casi 10 centímetros de espacio que te quitaría hacer una estructura de metal normal separada de la pared.",
    mixRatio: "Atornillado directo al muro base cada 60cm.",
    sizes: ["82x16mm (ancho x fondo)"],
    standardSize: "Tiras de 3 metros.",
    image: "/materiales/perfil-omega.jpg",
    precios: [{ formato: "Perfil 82x16 3m", precio: 3.25, unidad: "€/ud" }],
  },
  {
    id: "horquilla-techo",
    name: "Horquilla de Techo (Clip TC-47)",
    category: "perfiles",
    description:
      "Pieza metálica con forma de 'U' invertida que tiene un agujero roscado en la parte superior para meter la varilla. Es la pieza que 'muerde' el perfil TC-47 para colgar el techo falso.",
    advice:
      "Usa siempre la marca compatible con el perfil (como Pladur o Semin) para asegurar un anclaje perfecto y evitar desplomes del techo.",
    mixRatio: "Se encaja girándola a presión dentro del perfil TC-47.",
    sizes: ["Para TC-47"],
    standardSize: "Medida única para perfil de 47mm.",
    image: "/materiales/horquilla-techo.jpeg",
    precios: [{ formato: "Caja 100 uds", precio: 15.00, unidad: "€/caja" }],
  },
  {
    id: "varilla-roscada",
    name: "Varilla Roscada M6 (Galvanizada)",
    category: "perfiles",
    description:
      "Barra totalmente roscada de acero galvanizado (zincado brillante), normalmente de métrica 6. Se usa junto a la horquilla para colgar el techo falso a la altura deseada.",
    advice:
      "Usa siempre varillas y tacos de latón para fijarlas al forjado. Nunca uses acero negro ni inoxidable para evitar problemas de oxidación o compatibilidad galvánica con el resto de la estructura.",
    mixRatio: "Enroscada a la horquilla y al taco.",
    sizes: ["M4", "M6", "M8"],
    standardSize: "M6 (Métrica 6) en barras de 1 metro.",
    image: "/materiales/varilla-roscada.jpeg",
    precios: [{ formato: "Varilla M6 1m", precio: 1.10, unidad: "€/ud" }],
  },
  
  // --- LADRILLOS Y BLOQUES ---
  {
    id: "ladrillo-hueco",
    name: "Ladrillo Hueco (Totxana / Mahón)",
    category: "ladrillos",
    description:
      "Es el ladrillo más común para construir paredes interiores. Se llama 'hueco' porque tiene celdas interiores que lo hacen muy ligero y aísla del ruido. Se divide en Sencillo (más delgado) y Doble (la clásica 'Totxana' más gruesa).",
    advice:
      "Para colgar muebles pesados o cuadros grandes, usa siempre tacos especiales para ladrillo hueco. Si usas un taco normal de expansión, romperás la pared interior del ladrillo y el tornillo bailará.",
    mixRatio: "Se asienta con Mortero Seco M-5. Es imprescindible 'regarlos' con una manguera antes de ponerles la masa para que no absorban el agua del mortero.",
    sizes: ["Sencillo: 24x11,5x4 cm", "Doble: 24x11,5x7 cm", "Triple: 24x11,5x10 cm"],
    standardSize: "Hueco Doble (24x11,5x7 cm) que es el estándar para separar habitaciones.",
    image: "/materiales/ladrillo-hueco.webp",
    precios: [{ formato: "Doble 24x11,5x7", precio: 0.25, unidad: "€/ud" }],
  },
  {
    id: "ladrillo-perforado",
    name: "Ladrillo Perforado (Gerol)",
    category: "ladrillos",
    description:
      "Es un ladrillo macizo pero con agujeros verticales. Es mucho más resistente que el hueco y se usa para levantar muros que deben soportar peso o para separar viviendas (da más masa acústica).",
    advice:
      "Es el ladrillo que debes usar si vas a hacer una barbacoa, una chimenea o un muro exterior que luego irá pintado o revocado, ya que aguanta mucho mejor los golpes y la presión.",
    mixRatio: "Al ser para soportar peso, se debe asentar obligatoriamente con Mortero Seco M-7,5.",
    sizes: ["24x11,5x7 cm", "24x11,5x10 cm"],
    standardSize: "24x11,5x7 cm.",
    image: "/materiales/ladrillo-perforado.jpeg",
    precios: [{ formato: "Perforado 24x11,5x7", precio: 0.30, unidad: "€/ud" }],
  },
  {
    id: "ladrillo-macizo",
    name: "Ladrillo Macizo (Manual / Prensado)",
    category: "ladrillos",
    description:
      "Ladrillo sin huecos, muy denso y pesado. Hoy en día se usa sobre todo por estética (para dejarlo visto), para reforzar los bordes de las puertas o para construir barbacoas.",
    advice:
      "Si lo vas a poner en una zona donde habrá fuego directo, asegúrate de que sea la variante 'Refractaria' (que aguanta el calor extremo sin rajarse).",
    mixRatio: "Si es para dejarlo a la vista, suele usarse con un mortero coloreado para que la junta quede bonita.",
    sizes: ["24x11,5x3 cm (Rasilla)", "24x11,5x5 cm"],
    standardSize: "24x11,5x5 cm.",
    image: "/materiales/ladrillo-macizo.jpg",
    precios: [{ formato: "Macizo 24x11,5x5", precio: 0.45, unidad: "€/ud" }],
  },
  {
    id: "bloque-hormigon",
    name: "Bloque de Hormigón",
    category: "ladrillos",
    description:
      "Pieza gris prefabricada. Al ser muy grande, permite levantar muros exteriores, parkings o cierres de fincas a gran velocidad.",
    advice:
      "Es un material muy frío que transmite el ruido. Si lo usas para cerrar una casa, debes añadirle aislamiento térmico y Pladur por el interior, o tendrás problemas de condensación y frío.",
    mixRatio: "Se asienta con Mortero M-7,5. En muros altos es obligatorio meter varillas de hierro por los huecos y rellenarlos de hormigón.",
    sizes: ["40x20x10 cm (Pared delgada)", "40x20x20 cm (Muro estándar)", "40x20x30 cm (Muro ancho)"],
    standardSize: "40x20x20 cm.",
    image: "/materiales/bloque-hormigon.webp",
    precios: [{ formato: "Bloque 40x20x20", precio: 1.20, unidad: "€/ud" }],
  },
  
  // --- BALDOSAS, AZULEJOS Y ACABADOS ---
  {
    id: "gres-porcelanico",
    name: "Gres Porcelánico",
    category: "baldosas",
    description:
      "Es la baldosa más dura y resistente que existe. Casi no absorbe agua, lo que la hace ideal para cualquier clima. Es el material estándar hoy en día para suelos de toda la casa.",
    advice:
      "Al no tener poro, el agua no penetra en la pieza. Por eso, es obligatorio usar Cemento Cola C2. Si usas un adhesivo básico (C1), la baldosa se soltará entera en pocos meses porque no hay agarre mecánico.",
    sizes: ["30x60 cm", "60x60 cm", "90x90 cm", "120x60 cm (Gran formato)"],
    standardSize: "60x60 cm (El estándar actual).",
    image: "/materiales/gres-porcelanico.webp",
    precios: [{ formato: "60x60 cm", precio: 15.00, unidad: "€/m²" }],
  },
  {
    id: "azulejo-pasta",
    name: "Azulejo de Pasta Blanca / Roja",
    category: "azulejos",
    description:
      "Es una baldosa cerámica más blanda y porosa que el porcelánico. Se utiliza exclusivamente para revestir paredes de baños y cocinas (alicatado). La pasta blanca es de mayor calidad y permite cortes más limpios.",
    advice:
      "Es mucho más fácil de cortar y perforar (para pasar tuberías o poner accesorios de baño) que el porcelánico. Para este material, el Cemento Cola C1 es suficiente.",
    sizes: ["20x20 cm (Clásico)", "30x60 cm (Estándar moderno)", "33x100 cm"],
    standardSize: "30x60 cm.",
    image: "/materiales/azulejo-pasta.jpeg",
    precios: [{ formato: "30x60 cm", precio: 12.00, unidad: "€/m²" }],
  },
  {
    id: "mortero-juntas",
    name: "Mortero para Juntas",
    category: "acabados",
    description:
      "Es el mortero coloreado que se aplica en los huecos (juntas) entre baldosa y baldosa. No solo es estético; sirve para absorber las pequeñas dilataciones del suelo y evitar que las piezas choquen y se rompan. También se le conoce como borada o pasta de rejuntar.",
    advice:
      "En suelos con calefacción radiante o exteriores, usa siempre Mortero para Juntas Flexible. Si la junta es muy ancha (más de 3mm), busca uno específico 'para juntas anchas' para evitar que se agriete al secar.",
    mixRatio: "Se mezcla con agua hasta obtener una pasta similar a la pasta de dientes y se aplica con llana de goma.",
    sizes: ["Bolsas de 2kg", "Sacos de 5kg"],
    standardSize: "Bolsa de 5kg (suele dar para unos 15-20 m²).",
    image: "/materiales/borada-junta.jpg",
    precios: [{ formato: "Bolsa 5kg", precio: 4.50, unidad: "€/ud" }],
  },
  {
    id: "malla-fibra",
    name: "Malla de Fibra de Vidrio",
    category: "base",
    description:
      "Es una red fina que se 'ahoga' dentro del mortero o el cemento cola. Actúa como el esqueleto de la masa, evitando que salgan grietas por movimientos de la estructura.",
    advice:
      "Es imprescindible ponerla en las uniones de materiales distintos (por ejemplo, donde una pared de ladrillo toca una columna de hormigón) y en las esquinas de puertas y ventanas.",
    sizes: ["Rollos de 1x50 metros"],
    standardSize: "Cuadrícula de 5x5mm (para mortero) o 10x10mm (para fachadas/SATE).",
    image: "/materiales/malla-fibra.jpg",
    precios: [{ formato: "Rollo 1x50m", precio: 25.00, unidad: "€/rollo" }],
  },

  // --- YESOS ---
  {
    id: "yeso-manual",
    name: "Yeso Manual (Proyectable)",
    category: "yesos",
    description:
      "Yeso de construcción para enlucir techos y paredes interiores. Se aplica a mano o con máquina de proyectar para crear una superficie lisa y uniforme, lista para pintar.",
    advice:
      "No lo apliques nunca sobre superficies húmedas ni en exteriores, ya que el yeso se degrada con el agua. Aplica siempre una capa de puente de unión en superficies de hormigón antes de enyesar.",
    mixRatio: "Mezclar con agua hasta obtener una pasta homogénea y cremosa. Tiempo de trabajo: 60-90 minutos.",
    sizes: ["Saco de 20kg", "Saco de 25kg"],
    standardSize: "Saco de 20kg.",
    image: "/materiales/Yeso Manual (Proyectable).webp",
    precios: [{ formato: "Saco 20kg", precio: 2.80, unidad: "€/saco" }],
  },

  // --- PINTURAS ---
  {
    id: "pintura-plastica",
    name: "Pintura Plástica Interior",
    category: "pinturas",
    description:
      "Pintura acrílica mate o satinada para paredes y techos interiores. Es lavable, de fácil aplicación con rodillo o brocha, y ofrece una gran cobertura. Es el producto estándar para acabar cualquier estancia después de enyesar o de montar Pladur.",
    advice:
      "Aplica siempre 2 manos mínimo (3 si cambias de color oscuro a claro). Diluye la primera mano con un 10-15% de agua para que penetre bien y la segunda mano aplícala sin diluir para un acabado perfecto.",
    mixRatio: "Rendimiento medio: 10-12 m² por litro y mano. Para un dormitorio de 12m² (paredes + techo ≈ 50m²), necesitarás unos 10 litros para 2 manos.",
    sizes: ["Bote de 750ml", "Bote de 4L", "Bidón de 15L"],
    standardSize: "Bidón de 15L (el más rentable para obras completas).",
    image: "/materiales/Pintura Plástica Interior.webp",
    precios: [{ formato: "Bidón 15L", precio: 35.00, unidad: "€/ud" }],
  },
  {
    id: "imprimacion",
    name: "Imprimación Fijadora",
    category: "pinturas",
    description:
      "Líquido transparente que se aplica sobre el yeso o el Pladur ANTES de pintar. Sella los poros de la superficie y crea una base uniforme para que la pintura agarre bien y no se absorba de forma desigual.",
    advice:
      "Es obligatoria en obra nueva o en parches de yeso/Pladur recién aplicados. Si no la pones, la pintura se absorberá de forma desigual y se verán manchas y diferencias de brillo en la pared.",
    mixRatio: "Lista para usar (no diluir). Aplicar con rodillo de pelo corto.",
    sizes: ["Bote de 750ml", "Bote de 4L", "Bidón de 15L"],
    standardSize: "Bote de 4L (para una habitación estándar).",
    image: "/materiales/Imprimación Fijadora.webp",
    precios: [{ formato: "Bote 4L", precio: 18.00, unidad: "€/ud" }],
  },
];
