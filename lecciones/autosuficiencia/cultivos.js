// Autosuficiencia · Unidad 5: Cultivos básicos.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Seguridad: yuca (glucósidos cianogénicos, FSANZ), papa verde (MedlinePlus), chile (guantes), hierbas medicinales (sin usos ni dosis; ver Unidad 11).
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('autosuficiencia', titulo, datos);
  // Flecha: línea hasta la base de la punta + triángulo sólido como punta.
  const flecha = (desde, hasta, serie = 0, escala = 1) => {
    const dx = hasta[0] - desde[0], dy = hasta[1] - desde[1], largo = Math.hypot(dx, dy);
    const ux = dx / largo, uy = dy / largo, h = 0.35 * escala, w = 0.17 * escala;
    const base = [hasta[0] - h * ux, hasta[1] - h * uy];
    return [
      { tipo: 'linea', desde, hasta: base, serie },
      { tipo: 'poligono', puntos: [hasta, [base[0] - w * uy, base[1] + w * ux], [base[0] + w * uy, base[1] - w * ux]], solido: true, serie },
    ];
  };
  const txt = (x, y, texto) => ({ tipo: 'texto', x, y, texto });
  const diagrama = (x, y, figuras, descripcion) => G({ x, y, figuras, descripcion, proporcional: true, ejes: false });
  const elipse = (cx, cy, rx, ry, relleno = false) => ({ tipo: 'poligono', relleno, puntos: Array.from({ length: 36 }, (_, i) => [cx + rx * Math.cos((i * Math.PI) / 18), cy + ry * Math.sin((i * Math.PI) / 18)]) });

  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const OSU = { nombre: 'Servicio de Extensión de la Universidad Estatal de Oregon: Su propio cultivo (EM 9027-S, PDF)', url: 'https://extension.oregonstate.edu/sites/default/files/documents/57811/su-propio-cultivo-edsmall.pdf' };
  const IOWA = (ruta, nombre) => ({ nombre: `Extensión de la Universidad Estatal de Iowa: ${nombre} (en inglés)`, url: `https://yardandgarden.extension.iastate.edu/how-to/${ruta}` });
  const CONABIO = (ruta, nombre) => ({ nombre: `CONABIO, Biodiversidad Mexicana: ${nombre}`, url: `https://www.biodiversidad.gob.mx/diversidad/${ruta}` });
  const PUEBLO = { nombre: 'Extensión de la Universidad Estatal de Colorado, condado de Pueblo: Growing Wheat in Your Home Garden (en inglés)', url: 'https://pueblo.extension.colostate.edu/growing-wheat-in-your-home-garden/' };
  const IRRI = { nombre: 'Instituto Internacional de Investigación del Arroz (IRRI), Rice Today: The where and how of rice (en inglés)', url: 'https://ricetoday.irri.org/the-where-and-how-of-rice/' };
  const UFYUCA = { nombre: 'Universidad de Florida, IFAS: Cassava (en inglés)', url: 'https://gardeningsolutions.ifas.ufl.edu/plants/edibles/vegetables/cassava.html' };
  const FSANZ = { nombre: 'Normas Alimentarias de Australia y Nueva Zelanda (FSANZ): Cassava and bamboo shoots (en inglés)', url: 'https://www.foodstandards.gov.au/consumer/chemicals/cassava' };
  const AZRAICES = { nombre: 'Extensión de la Universidad de Arizona: Roots, Tubers and Bulbs (en inglés, PDF)', url: 'https://extension.arizona.edu/sites/default/files/attachment/RootsTubersandBulbsPresentationFactSheet.pdf' };
  const MEDPAPA = { nombre: 'MedlinePlus en español: Intoxicación con los brotes y tubérculos verdes de la papa', url: 'https://medlineplus.gov/spanish/ency/article/002875.htm' };
  const MEDVENENO = { nombre: 'MedlinePlus en español: Primeros auxilios en casos de envenenamiento o intoxicación', url: 'https://medlineplus.gov/spanish/ency/article/007579.htm' };
  const UKY = { nombre: 'Extensión de la Universidad de Kentucky: Amaranth (en inglés, PDF)', url: 'https://publications.ca.uky.edu/sites/publications.ca.uky.edu/files/amaranth.pdf' };
  const UFHIERBAS = { nombre: 'Universidad de Florida, IFAS: Herbs (en inglés)', url: 'https://gardeningsolutions.ifas.ufl.edu/plants/edibles/vegetables/herbs.html' };
  const CORNELL = { nombre: 'Universidad Cornell: Transplants or Direct Seeding, What’s best? (en inglés)', url: 'https://cals.cornell.edu/school-integrative-plant-science/school-sections/horticulture-section/outreach-and-extension/pandemic-vegetable-gardening/pandemic-vegetable-gardening-2021-archive/transplants-or-direct-seeding-whats-best' };

  // ------------------------------------------------------------------
  const MAIZ = diagrama([-5, 5], [0, 10.4], [
    { tipo: 'linea', desde: [0, 0.3], hasta: [0, 8.6] },
    { tipo: 'linea', desde: [-4, 0.3], hasta: [4, 0.3] },
    { tipo: 'poligono', abierto: true, puntos: [[0, 2], [-1.6, 3], [-2.6, 2.6]] },
    { tipo: 'poligono', abierto: true, puntos: [[0, 5.5], [1.6, 6.5], [2.6, 6.1]] },
    { tipo: 'linea', desde: [0, 8.6], hasta: [-0.8, 9.6] }, { tipo: 'linea', desde: [0, 8.6], hasta: [0, 9.9] }, { tipo: 'linea', desde: [0, 8.6], hasta: [0.8, 9.6] },
    elipse(0.75, 4.2, 0.45, 1, true),
    { tipo: 'linea', desde: [0.95, 5.15], hasta: [1.5, 5.7] }, { tipo: 'linea', desde: [0.75, 5.2], hasta: [1.1, 5.9] },
    txt(-2.8, 9.5, 'espiga'), ...flecha([-2.2, 9.2], [-0.9, 9.4], 0, 1),
    txt(3.4, 5.9, 'cabellos'), ...flecha([2.7, 5.9], [1.6, 5.75], 0, 1),
    txt(3.1, 4, 'jilote'), ...flecha([2.6, 4], [1.25, 4.1], 0, 1),
    ...[[-1.4, 8.4], [-1.9, 7.4], [-1.2, 6.6]].map(([x, y]) => ({ tipo: 'circulo', x, y, r: 0.12 })),
    txt(-3.2, 7, 'polen'),
  ], 'Una planta de maíz. Arriba, la espiga, con sus ramitas. A media altura, pegado al tallo, el jilote, que es la mazorca joven, con sus cabellos saliendo por la punta. Unos puntitos rotulados "polen" caen desde la espiga hacia abajo.');

  L('Cultivar maíz', {
    objetivo: 'Sembrar maíz para que se polinice bien, darle el espacio que necesita y cosecharlo en el punto justo, ya sea como elote o como grano seco.',
    explicacion: `
      <p>A veces abres un elote y le faltan granos: tiene huecos o la punta está pelona. No es una plaga ni una enfermedad. Lo más probable es que esa mazorca no recibió suficiente polen, y eso depende de algo que se decide el día de la siembra: cómo acomodas las plantas.</p>
      <h3>Cómo se forma una mazorca</h3>
      ${MAIZ}
      <p>Una planta de maíz tiene dos tipos de flores. Arriba está la <strong>espiga</strong>, la flor que suelta el polen, un polvito amarillo. A media altura, pegado al tallo, está el <strong>jilote</strong>, la mazorca joven, de la que salen los cabellos. Cada cabello está unido a un futuro grano: solo si le cae un grano de polen, ese grano de la mazorca se llena.</p>
      <p>El polen del maíz no lo lleva una abeja, sino el viento; así lo explica la Extensión de la Universidad Estatal de Iowa. Por eso el viento debe llevar suficiente polen a todos los cabellos. Si siembras una sola fila larga, el polen se va de lado y muchos cabellos se quedan sin nada. Iowa recomienda sembrar el maíz en bloques: varias filas cortas, una junto a otra, en lugar de una o dos filas largas. Así el polen cae entre las plantas y las mazorcas se llenan bien.</p>
      <h3>Siembra y distancias</h3>
      <p>El maíz necesita sol pleno, como viste en la unidad El suelo y el huerto, y tierra fértil que drene bien. Se siembra directo, porque no le gusta el trasplante. Iowa indica sembrar a unos 2.5 cm de profundidad en tierra pesada y hasta 5 cm en tierra arenosa, con 20 a 30 cm entre plantas y de 75 a 90 cm entre filas. La guía "Su propio cultivo" de la Universidad Estatal de Oregon propone algo parecido: 4 filas, a unos 90 cm entre filas y 38 cm entre plantas. No conviene sembrar con la tierra todavía fría, porque la semilla puede pudrirse antes de brotar.</p>
      <p>El maíz es un cultivo muy comilón de nitrógeno. Por eso le ayuda la composta y, como verás en "La milpa", la compañía del frijol.</p>
      <h3>Que no se cruce</h3>
      <p>Como el polen viaja con el viento, un maíz puede polinizar al de tu vecino. Iowa advierte que, si un maíz dulce recibe polen de maíz palomero o de maíz de campo, sus granos salen duros y harinosos. Para evitarlo, recomienda separar los distintos tipos al menos 250 pies, unos 75 metros, o sembrarlos en fechas distintas para que las espigas de uno suelten polen al menos 14 días antes o después que las del otro. Esto es importante si quieres guardar tu propia semilla; lo verás a fondo en la unidad Guardar tus propias semillas.</p>
      <h3>Elote o grano</h3>
      <p>Si lo quieres como elote, la mazorca se corta en estado lechoso. Según Iowa, en ese momento los cabellos están cafés y secos en la punta de la mazorca, y si aprietas un grano con la uña, sale un jugo como leche. Si el jugo es transparente y aguado, todavía no está lista; si el grano está duro y pastoso, ya se pasó. Iowa calcula que el elote está listo unos 18 a 23 días después de que salen los cabellos, así que conviene anotar esa fecha.</p>
      <p>Si lo quieres como grano para tortillas o para guardar, se deja que la mazorca se seque en la planta hasta que los granos estén duros. Cómo nixtamalizarlo lo verás en la unidad Alimentos.</p>
      <p class="nota"><strong>Trampa común:</strong> sembrar el maíz en una sola fila a lo largo de la cerca. Se ve ordenado, pero el viento se lleva el polen y las mazorcas salen con huecos.</p>`,
    ejemplo: `
      <p>Tienes una cama de 3 m de largo. Quieres sembrar maíz en bloque, con 4 filas separadas 75 cm y a cada planta le das 30 cm de fila. ¿Cuántas plantas siembras y qué ancho ocupa el bloque?</p>
      <ol class="pasos-ej">
        <li>Primero calcula cuántas plantas caben en una fila: 3 m son 300 cm, y 300 ÷ 30 = 10 plantas por fila.</li>
        <li>Multiplica por las filas: 10 × 4 = 40 plantas.</li>
        <li>Calcula el ancho: entre 4 filas hay 3 espacios, así que 3 × 75 = 225 cm, es decir, 2.25 m.</li>
        <li>Comprueba la idea del bloque: el bloque mide 3 m por 2.25 m, casi cuadrado, así que el polen cae entre las plantas venga de donde venga el viento.</li>
      </ol>
      <p>Resultado: <span class="resultado">40 plantas en un bloque de 3 m por 2.25 m</span>.</p>
      <p class="nota"><strong>Error común:</strong> contar 4 espacios entre 4 filas. Entre las filas solo hay 3 espacios.</p>`,
    vidaReal: `
      <p>Saber cultivar maíz te conecta con la comida más importante de muchas familias:</p>
      <ul>
        <li>Puedes cosechar elotes tiernos en el momento justo, más dulces que los del mercado.</li>
        <li>Tus mazorcas salen llenas porque sembraste en bloque.</li>
        <li>Puedes tener tu propio grano para tortillas, atole o tamales.</li>
        <li>Si te regalan semilla criolla, sabes cómo sembrarla sin que se cruce con otro maíz.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una fila mide 4.5 m y a cada planta de maíz le das 30 cm de fila. ¿Cuántas plantas caben?</p>', respuesta: 450 / 30,
        pista: '<p>Pasa los metros a centímetros y divide entre la distancia.</p>',
        solucion: '<p>4.5 m son 450 cm, y 450 ÷ 30 = <strong>15 plantas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Los cabellos salieron el 3 de julio. Si el elote está listo unos 20 días después, ¿qué día de julio lo cosechas?</p>', respuesta: 3 + 20,
        pista: '<p>Suma 20 días al 3 de julio.</p>',
        solucion: '<p>3 + 20 = <strong>23</strong>, es decir, el 23 de julio. Revisa antes el jugo del grano.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el maíz se siembra en bloques y no en una sola fila larga?</p>',
        opciones: ['Porque así se riega más fácil', 'Porque el viento lleva el polen y en un bloque cae entre las plantas', 'Porque las abejas prefieren los bloques'], correcta: 1,
        pista: '<p>Piensa en quién lleva el polen del maíz.</p>',
        solucion: '<p><strong>Porque lo poliniza el viento.</strong> En bloque, el polen cae entre las plantas y las mazorcas se llenan.</p>' },
      { tipo: 'opciones', enunciado: '<p>Aprietas un grano de elote con la uña y sale un jugo transparente y aguado. ¿Qué significa?</p>',
        opciones: ['Que todavía no está listo', 'Que está en su punto', 'Que ya se pasó'], correcta: 0,
        pista: '<p>En su punto, el jugo es como leche.</p>',
        solucion: '<p><strong>Todavía no está listo.</strong> Espera unos días hasta que el jugo sea lechoso.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tu vecino siembra maíz palomero junto a tu maíz dulce, y las espigas sueltan polen al mismo tiempo. ¿Qué puede pasar?</p>',
        opciones: ['Nada, el maíz no se cruza', 'Tu maíz da más mazorcas', 'Tus elotes pueden salir con granos duros y harinosos'], correcta: 2,
        pista: '<p>El polen viaja con el viento de una milpa a otra.</p>',
        solucion: '<p><strong>Tus elotes pueden salir duros y harinosos.</strong> Para evitarlo, sepáralos o siembra en fechas distintas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la flor de arriba del maíz, la que suelta el polen?</p>',
        respuestas: ['espiga', 'la espiga', 'espigas', 'miahuatl', 'penacho'],
        pista: '<p>Es la misma palabra que se usa para la punta del trigo.</p>',
        solucion: '<p>La <strong>espiga</strong>.</p>' },
    ],
    fuentes: [IOWA('growing-sweet-corn-home-garden', 'Growing Sweet Corn in the Home Garden'), OSU, CONABIO('alimentos/maices', 'Maíces'), WIKI('Zea_mays', 'Zea mays')],
  });

  // ------------------------------------------------------------------
  L('Cultivar frijol', {
    objetivo: 'Elegir entre frijol de mata y de guía, sembrarlo y cuidarlo, y cosecharlo como ejote o como frijol seco.',
    explicacion: `
      <p>El frijol es de los cultivos más agradecidos: brota rápido, casi no pide abono y, además, deja la tierra mejor de como la encontró. Por eso es de los primeros que conviene aprender a sembrar.</p>
      <h3>Muchos frijoles</h3>
      <p>La CONABIO, la comisión mexicana que estudia la biodiversidad, explica que en México se domesticaron cinco especies de frijol. La más conocida es el frijol común; otras son el ayocote, de flores rojas o blancas, cuyas flores también se comen, el frijol lima, el tépari y el acalete o frijol de todo el año. Dentro del frijol común hay cientos de variedades de colores y formas, y sus vainas tiernas son los ejotes.</p>
      <h3>De mata o de guía</h3>
      <p>Antes de sembrar, fíjate qué tipo de frijol tienes:</p>
      <ul>
        <li>El frijol de mata crece como un arbusto bajo y se sostiene solo. Da su cosecha en poco tiempo, casi toda junta.</li>
        <li>El frijol de <strong>guía</strong> es una planta trepadora: sus tallos largos, las guías, se enredan en lo que encuentran. Produce durante más tiempo, pero necesita un <strong>tutor</strong>, que es un soporte por donde trepar: una vara, un hilo, una malla o, en la milpa, la caña del maíz.</li>
      </ul>
      <p>La Extensión de la Universidad Estatal de Iowa recuerda que los frijoles de guía necesitan soporte y los de mata no.</p>
      <h3>Siembra</h3>
      <p>El frijol se siembra directo, porque sufre con el trasplante, como viste en "Siembra directa". Es una semilla grande, así que va de 2.5 a 4 cm de profundidad. La guía "Su propio cultivo" de la Universidad Estatal de Oregon indica filas separadas de 30 a 60 cm; el frijol de mata, a 5 a 15 cm entre plantas, y el de guía, de 30 a 60 cm. Es de temporada cálida: se siembra cuando ya no hay heladas. Iowa sugiere sembrar un poco cada dos semanas para cosechar durante más tiempo.</p>
      <h3>Casi no necesita abono</h3>
      <p>En Ciencias naturales viste que el frijol, con ayuda de bacterias en sus raíces, fija el nitrógeno del aire. Por eso no hay que echarle fertilizante con nitrógeno: le basta con tierra con algo de composta. Si le echas mucho nitrógeno, hace muchas hojas y pocas vainas. Además, como viste en "Lombricomposta y abonos verdes", deja nitrógeno para el siguiente cultivo.</p>
      <h3>Polinización</h3>
      <p>Según Iowa, el frijol se poliniza solo: su flor se fecunda a sí misma, casi sin ayuda de insectos ni del viento. Por eso se cruza poco con otras variedades, y es de las semillas más fáciles de guardar, como verás en la unidad Guardar tus propias semillas.</p>
      <h3>Cosecha</h3>
      <ul>
        <li>Como ejote: según la guía de cosecha de Iowa, se cortan cuando las vainas tienen el grosor de un lápiz, unos 7 a 10 días después de la floración. Si las dejas crecer más, se ponen duras y con hebras. Cortarlos seguido hace que la planta siga dando.</li>
        <li>Como frijol seco: se dejan las vainas en la planta hasta que se sequen y suenen al sacudirlas. Se cosechan en un día seco, se terminan de secar a la sombra y se desgranan. El frijol seco siempre se cuece bien antes de comerlo.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> abonar el frijol con mucho estiércol o fertilizante "para que crezca más". Hará muchas hojas y pocas vainas.</p>`,
    ejemplo: `
      <p>Quieres sembrar frijol de mata en una cama de 1.2 m de ancho y 3 m de largo, con 3 filas a lo largo y a cada planta le das 10 cm de fila. ¿Cuántas semillas necesitas?</p>
      <ol class="pasos-ej">
        <li>Primero calcula cuántas plantas caben en una fila: 3 m son 300 cm, y 300 ÷ 10 = 30 plantas.</li>
        <li>Multiplica por las 3 filas: 30 × 3 = 90 plantas.</li>
        <li>Revisa que las filas quepan a lo ancho: 3 filas tienen 2 espacios entre ellas; si las separas 40 cm, ocupan 80 cm, menos que los 120 cm de la cama.</li>
        <li>Si tu semilla tiene 90% de germinación, como viste en "Prueba de germinación", siembra 90 ÷ 0.9 = 100 semillas.</li>
      </ol>
      <p>Resultado: <span class="resultado">unas 100 semillas para 90 plantas</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar la germinación y quedarte con huecos en las filas.</p>`,
    vidaReal: `
      <p>Sembrar frijol es una de las formas más fáciles de producir tu propia proteína:</p>
      <ul>
        <li>Puedes cosechar ejotes tiernos durante semanas.</li>
        <li>Un costalito de frijol seco te dura meses en la despensa.</li>
        <li>Tu tierra queda con más nitrógeno para lo siguiente que siembres.</li>
        <li>Su semilla es de las más fáciles de guardar de un año a otro.</li>
        <li>Sembrando un poco cada dos semanas, tienes ejotes frescos durante toda la temporada.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una fila mide 2.4 m y a cada planta de frijol de mata le das 8 cm de fila. ¿Cuántas plantas caben?</p>', respuesta: 240 / 8,
        pista: '<p>Pasa los metros a centímetros y divide.</p>',
        solucion: '<p>2.4 m son 240 cm, y 240 ÷ 8 = <strong>30 plantas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu frijol floreció el 10 de agosto. Según Iowa, los ejotes están listos unos 7 a 10 días después. ¿Cuál es el primer día de agosto en que conviene revisarlos?</p>', respuesta: 10 + 7,
        pista: '<p>Suma el menor número de días al día de la floración.</p>',
        solucion: '<p>10 + 7 = <strong>17</strong>, el 17 de agosto.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué necesita un frijol de guía que no necesita uno de mata?</p>',
        opciones: ['Más fertilizante', 'Un tutor por donde trepar', 'Sembrarse en almácigo'], correcta: 1,
        pista: '<p>Sus tallos largos se enredan en lo que encuentran.</p>',
        solucion: '<p><strong>Un tutor</strong>, como una vara, un hilo o la caña del maíz.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el frijol casi no necesita fertilizante con nitrógeno?</p>',
        opciones: ['Porque con ayuda de bacterias fija el nitrógeno del aire', 'Porque no crece mucho', 'Porque solo vive dos semanas'], correcta: 0,
        pista: '<p>Recuerda el ciclo del nitrógeno.</p>',
        solucion: '<p><strong>Porque fija el nitrógeno del aire</strong> con bacterias de sus raíces.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuándo se cortan los ejotes?</p>',
        opciones: ['Cuando las vainas están secas y suenan', 'Cuando la planta se muere', 'Cuando las vainas tienen el grosor de un lápiz'], correcta: 2,
        pista: '<p>Si crecen más, se ponen duros.</p>',
        solucion: '<p><strong>Cuando tienen el grosor de un lápiz.</strong> Las vainas secas son para frijol seco.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el soporte, como una vara o un hilo, por donde trepa un frijol de guía?</p>',
        respuestas: ['tutor', 'un tutor', 'el tutor', 'tutores', 'espaldera', 'guia', 'vara'],
        pista: '<p>Es la misma palabra que se usa para alguien que cuida y guía a un niño.</p>',
        solucion: '<p>Un <strong>tutor</strong>.</p>' },
    ],
    fuentes: [OSU, IOWA('pollination-and-fertilization-vegetable-garden', 'Pollination and Fertilization in the Vegetable Garden'), IOWA('vegetable-harvest-guide', 'Vegetable Harvest Guide'), CONABIO('alimentos/frijoles', 'Frijoles, ayocotes, téparis, ibes')],
  });

  // ------------------------------------------------------------------
  const FLORES = diagrama([-6, 6], [-2.6, 3.4], [
    { tipo: 'poligono', puntos: [[-4, 0], [-5.4, 2.4], [-4, 1.6], [-2.6, 2.4]] },
    { tipo: 'linea', desde: [-4, 0], hasta: [-4, -2] },
    txt(-4, 3, 'flor macho'), txt(-4, -2.4, 'tallo delgado'),
    { tipo: 'poligono', puntos: [[4, 0], [2.6, 2.4], [4, 1.6], [5.4, 2.4]] },
    elipse(4, -0.9, 0.55, 0.85, true),
    { tipo: 'linea', desde: [4, -1.75], hasta: [4, -2.1] },
    txt(4, 3, 'flor hembra'), txt(1.6, -1, 'calabacita'), ...flecha([2.3, -1], [3.4, -0.9], 0, 1),
    ...flecha([-2.4, 1.2], [2.4, 1.2], 0, 1.2), txt(0, 1.8, 'polen'),
  ], 'Dos flores de calabaza. A la izquierda, la flor macho, sobre un tallo delgado. A la derecha, la flor hembra, que tiene en su base una calabacita pequeña, sombreada. Una flecha rotulada "polen" va de la flor macho a la flor hembra.');

  L('Cultivar calabaza', {
    objetivo: 'Darle espacio a la calabaza, entender por qué tiene flores macho y hembra, y cosechar tanto calabacitas tiernas como calabazas para guardar.',
    explicacion: `
      <p>Una mata de calabaza se llena de flores amarillas, aparecen calabacitas diminutas y, de pronto, se ponen amarillas, se arrugan y se caen. Muchas personas creen que la planta está enferma, pero casi siempre el problema es otro: a esas calabacitas no les llegó polen.</p>
      <h3>Flores macho y flores hembra</h3>
      ${FLORES}
      <p>La calabaza tiene dos tipos de flores en la misma planta. La <strong>flor macho</strong> tiene un tallo largo y delgado y produce el polen. La <strong>flor hembra</strong> tiene en su base una calabacita en miniatura, que solo crece si recibe polen. Por eso no todas las flores dan fruto: las flores macho se caen después de soltar su polen, y eso es normal.</p>
      <p>La Extensión de la Universidad Estatal de Iowa explica que las abejas y otros polinizadores tienen que llevar el polen de las flores macho a las flores hembra. Si la flor hembra no recibe suficiente polen, la calabacita empieza a crecer y luego se arruga y muere. Iowa añade que con lluvia las abejas vuelan menos, así que en temporadas lluviosas la polinización falla más.</p>
      <p>Si ves pocas abejas, puedes ayudarles: toma una flor macho recién abierta, en la mañana, quítale los pétalos y toca con ella el centro de una flor hembra. También puedes usar un pincel suave. Las flores de calabaza, además, se comen: la CONABIO menciona que en México se usan en sopas, quesadillas y cremas. Si cortas flores para comer, elige flores macho y deja las hembras para que den fruto.</p>
      <h3>Siembra y espacio</h3>
      <p>La calabaza es de temporada cálida y crece mucho. Iowa recomienda sembrar de 4 a 5 semillas por montículo, a 2.5 cm de profundidad, y dejar después las 2 o 3 plantas más fuertes. Los montículos de calabacita van de 90 a 120 cm entre sí; los de calabaza de guarda, de 120 a 150 cm, con 1.5 a 2 m entre filas. Riega una vez por semana si no llueve y moja la tierra, no las hojas, porque así se evita el polvo blanco del oídio que viste en "Enfermedades de las plantas".</p>
      <h3>Calabacita o calabaza de guarda</h3>
      <ul>
        <li>La calabacita, o calabaza de verano, se come tierna. Según Iowa, se cosecha cada 2 o 3 días, cuando mide unos 5 cm de grueso, con la cáscara tan suave que la marcas con la uña. Si la dejas crecer, se pone dura y la planta produce menos.</li>
        <li>La calabaza de guarda, o de invierno, se deja madurar en la planta hasta que la cáscara está dura. Se corta con un pedazo de tallo, porque sin tallo se pudre antes. Iowa recomienda curarla unos días en un lugar cálido, de 27 a 29 °C, para que su cáscara se endurezca y sus raspones sanen, y después guardarla en un lugar fresco y seco, de 10 a 13 °C. Algunas duran varios meses.</li>
      </ul>
      <h3>Una calabaza amarga</h3>
      <p>La CONABIO explica que las calabazas silvestres no son comestibles para las personas, porque tienen mucha cucurbitacina, una sustancia muy amarga. Si una calabaza de tu huerto sabe muy amarga, no la comas: tírala y no guardes su semilla. Si alguien se siente mal después de comerla, llama al número de emergencias.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que la planta está enferma porque se caen las flores. Las flores macho se caen siempre; solo preocúpate si se caen las calabacitas.</p>`,
    ejemplo: `
      <p>Tienes un terreno de 4 m de largo y quieres sembrar calabacita en montículos separados 1 m, en una sola fila, dejando 50 cm libres en cada extremo. ¿Cuántos montículos caben y cuántas semillas siembras?</p>
      <ol class="pasos-ej">
        <li>Primero resta los extremos: 4 m − 0.5 − 0.5 = 3 m disponibles.</li>
        <li>En 3 m, con montículos cada metro, caben 3 espacios, es decir, 4 montículos: uno al principio y uno en cada metro.</li>
        <li>Iowa sugiere de 4 a 5 semillas por montículo. Con 4 semillas: 4 × 4 = 16 semillas.</li>
        <li>Comprueba: 4 montículos separados 1 m ocupan 3 m, más los 50 cm de cada lado, dan los 4 m del terreno.</li>
      </ol>
      <p>Resultado: <span class="resultado">4 montículos y 16 semillas</span>; al final dejas 2 o 3 plantas en cada uno.</p>
      <p class="nota"><strong>Error común:</strong> contar solo los espacios y olvidar el primer montículo.</p>`,
    vidaReal: `
      <p>Una mata de calabaza da mucho más que calabazas:</p>
      <ul>
        <li>Te da calabacitas tiernas durante semanas si las cortas seguido.</li>
        <li>Sus flores se comen en quesadillas y sopas.</li>
        <li>Una calabaza de guarda te puede durar meses sin refrigerador.</li>
        <li>Sus semillas tostadas son una botana nutritiva.</li>
        <li>Sabes qué hacer si las calabacitas se caen antes de crecer, en lugar de arrancar la planta.</li>
        <li>Reconoces una calabaza amarga y evitas comerla.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Siembras 5 semillas por montículo en 6 montículos. ¿Cuántas semillas usas?</p>', respuesta: 5 * 6,
        pista: '<p>Multiplica las semillas por montículo por el número de montículos.</p>',
        solucion: '<p>5 × 6 = <strong>30 semillas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Cosechas calabacitas cada 3 días durante 30 días. ¿Cuántas veces cosechas?</p>', respuesta: 30 / 3,
        pista: '<p>Divide los días entre cada cuánto cosechas.</p>',
        solucion: '<p>30 ÷ 3 = <strong>10 veces</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cómo distingues una flor hembra de calabaza?</p>',
        opciones: ['Tiene una calabacita pequeña en su base', 'Es más grande y más amarilla', 'Tiene un tallo largo y delgado'], correcta: 0,
        pista: '<p>Solo la flor hembra da fruto.</p>',
        solucion: '<p><strong>Tiene una calabacita en su base.</strong> La flor macho tiene un tallo largo y delgado.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tus calabacitas crecen un poco y luego se arrugan y se caen. ¿Qué es lo más probable?</p>',
        opciones: ['Les sobra agua', 'Les faltó polen', 'Les falta sol'], correcta: 1,
        pista: '<p>Iowa lo relaciona con las abejas.</p>',
        solucion: '<p><strong>Les faltó polen.</strong> Puedes ayudar polinizando a mano en la mañana.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una calabaza de tu huerto sabe muy amarga. ¿Qué haces?</p>',
        opciones: ['La cueces más tiempo y te la comes', 'Le pones azúcar', 'No la comes ni guardas su semilla'], correcta: 2,
        pista: '<p>Recuerda lo que dice la CONABIO de las calabazas silvestres.</p>',
        solucion: '<p><strong>No la comes ni guardas su semilla.</strong> El sabor amargo indica cucurbitacinas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la flor de calabaza que produce el polen y no da fruto?</p>',
        respuestas: ['flor macho', 'macho', 'la flor macho', 'flores macho', 'flor masculina'],
        pista: '<p>La otra es la flor hembra.</p>',
        solucion: '<p>La <strong>flor macho</strong>.</p>' },
    ],
    fuentes: [IOWA('growing-squash-iowa', 'Growing Squash in Iowa'), IOWA('harvesting-and-storing-vine-crops', 'Harvesting and Storing Vine Crops'), CONABIO('alimentos/calabazas', 'Calabazas, tamalayotas, pipianas, chilacayotes'), WIKI('Cucurbita', 'Cucurbita')],
  });

  // ------------------------------------------------------------------
  const MILPA = diagrama([0, 12], [0, 9.6], [
    { tipo: 'linea', desde: [0.3, 0.4], hasta: [11.7, 0.4] },
    ...[3, 9].flatMap((x) => [
      { tipo: 'linea', desde: [x, 0.4], hasta: [x, 8.2] },
      { tipo: 'linea', desde: [x, 8.2], hasta: [x - 0.5, 8.9] }, { tipo: 'linea', desde: [x, 8.2], hasta: [x + 0.5, 8.9] },
      { tipo: 'poligono', abierto: true, puntos: Array.from({ length: 13 }, (_, i) => [x + 0.35 * Math.sin(i * 1.1), 0.6 + i * 0.5]) },
    ]),
    { tipo: 'poligono', abierto: true, puntos: [[4, 0.5], [5, 1], [6, 0.7], [7, 1.1], [8, 0.6]] },
    elipse(5.6, 1.1, 0.5, 0.35, true), elipse(7, 1.3, 0.4, 0.3, true),
    txt(1.4, 9.1, 'maíz'), txt(1.2, 4.6, 'frijol'), ...flecha([1.8, 4.6], [2.7, 4.6], 0, 1),
    txt(6, 2.5, 'calabaza'),
  ], 'Una milpa vista de lado. Dos plantas de maíz altas, con su espiga arriba. Por cada caña de maíz sube una guía de frijol enredada, rotulada "frijol". Entre las dos, al ras del suelo, se extiende una guía de calabaza con hojas grandes, rotulada "calabaza".');

  L('La milpa: maíz, frijol y calabaza juntos', {
    objetivo: 'Explicar qué es la milpa, cómo se ayudan el maíz, el frijol y la calabaza, y planear una milpa pequeña.',
    explicacion: `
      <p>Durante miles de años, en Mesoamérica no se sembró el maíz solo, sino acompañado. Entre las cañas de maíz trepaba el frijol y, al ras del suelo, se extendía la calabaza. A ese campo se le llama milpa, y es uno de los sistemas de cultivo más estudiados y admirados del mundo.</p>
      <h3>¿Qué es la milpa?</h3>
      <p>La CONABIO explica que la palabra viene del náhuatl <span lang="nah">milpan</span>: de <span lang="nah">milli</span>, "parcela sembrada", y <span lang="nah">pan</span>, "encima de". Es un sistema agrícola tradicional en el que se siembran varias especies juntas, lo que se llama un <strong>policultivo</strong>. Su planta principal es el maíz, acompañado de frijol, calabaza, chile, tomate y muchas otras, según la región. A la combinación de maíz, frijol y calabaza se le conoce como la "tríada mesoamericana".</p>
      <p>En la milpa también se aprovechan plantas que nacen solas, sin sembrarlas, y que se comen tiernas: los <strong>quelites</strong>, como las verdolagas, los quintoniles, el huauzontle o los romeritos.</p>
      ${MILPA}
      <h3>Cómo se ayudan</h3>
      <p>Cada planta aporta algo distinto, y juntas aprovechan mejor el espacio, como viste en "Asociación de cultivos":</p>
      <ul>
        <li>El maíz crece alto y derecho, y su caña sirve de tutor al frijol de guía.</li>
        <li>El frijol, con las bacterias de sus raíces, fija nitrógeno, el nutriente que más consume el maíz.</li>
        <li>La calabaza cubre el suelo con sus hojas grandes: le da sombra a la tierra, guarda la humedad y frena las hierbas.</li>
      </ul>
      <p>La CONABIO añade que, al convivir tantas especies, la milpa funciona como un ecosistema: el agua, la luz y el suelo se aprovechan de forma complementaria, y se favorecen relaciones que ayudan, como el control natural de insectos y la polinización. En la milpa también viven especies que pueden afectar a los cultivos, como el gusano del elote, y el huitlacoche, un hongo del maíz que en México se come.</p>
      <h3>Una milpa de temporal</h3>
      <p>La CONABIO describe la milpa como un sistema de temporal, es decir, que depende de las lluvias y no de riego. Por eso se siembra al empezar la temporada de lluvias, como viste en "Calendario de siembra". Para la familia, la milpa es comida variada en el mismo pedazo de tierra: grano, frijol, calabaza, flores, quelites y chile.</p>
      <h3>Sembrar una milpa pequeña</h3>
      <ol>
        <li>Siembra primero el maíz, en bloque, como viste en "Cultivar maíz".</li>
        <li>Cuando el maíz mida unos 15 a 20 cm, siembra el frijol de guía junto a cada mata, para que no le gane al maíz y lo ahogue.</li>
        <li>Al mismo tiempo, siembra la calabaza entre los bloques o en las orillas, dejándole espacio para que se extienda.</li>
        <li>Deja crecer algunos quelites que aparezcan y arranca las hierbas que no uses.</li>
      </ol>
      <p>Los tiempos exactos cambian en cada región; pregunta a quienes siembran milpa cerca de ti.</p>
      <p class="nota"><strong>Trampa común:</strong> sembrar el frijol de guía el mismo día que el maíz. El frijol crece más rápido, trepa antes de que la caña aguante y puede tumbar al maíz.</p>`,
    ejemplo: `
      <p>Planeas una milpa de 4 m por 4 m. Siembras matas de maíz cada 80 cm en filas separadas 80 cm, y junto a cada mata, un frijol. La calabaza va en las 4 esquinas. ¿Cuántas plantas de cada una siembras?</p>
      <ol class="pasos-ej">
        <li>Primero calcula cuántas matas caben a lo largo: en 4 m, cada 80 cm, hay 400 ÷ 80 = 5 espacios, es decir, 6 matas por fila si siembras en ambas orillas.</li>
        <li>Lo mismo a lo ancho: 6 filas. En total, 6 × 6 = 36 matas de maíz.</li>
        <li>Un frijol junto a cada mata: 36 frijoles.</li>
        <li>Calabazas en las 4 esquinas: 4 calabazas.</li>
        <li>Comprueba: 6 matas separadas 80 cm ocupan 5 × 80 = 400 cm, los 4 m del terreno.</li>
      </ol>
      <p>Resultado: <span class="resultado">36 matas de maíz, 36 de frijol y 4 de calabaza</span>.</p>
      <p class="nota"><strong>Error común:</strong> dividir 400 ÷ 80 = 5 y olvidar que hay una mata más que espacios.</p>`,
    vidaReal: `
      <p>Sembrar una milpa es sembrar una despensa entera:</p>
      <ul>
        <li>En un mismo terreno cosechas grano, frijol, calabaza, flores y quelites.</li>
        <li>Necesitas menos fertilizante gracias al frijol.</li>
        <li>Riegas menos porque la calabaza cubre el suelo.</li>
        <li>Mantienes viva una tradición de miles de años y sus semillas criollas.</li>
        <li>Aprovechas los quelites que nacen solos, sin sembrarlos ni comprarlos.</li>
        <li>Tu familia come más variado con lo que da un solo terreno.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En una milpa siembras 25 matas de maíz y un frijol junto a cada una. ¿Cuántas plantas de maíz y frijol hay en total?</p>', respuesta: 25 + 25,
        pista: '<p>Hay tantos frijoles como matas de maíz.</p>',
        solucion: '<p>25 + 25 = <strong>50 plantas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una fila de 3.2 m lleva una mata de maíz cada 80 cm, con una en cada orilla. ¿Cuántas matas caben?</p>', respuesta: 320 / 80 + 1,
        pista: '<p>Calcula los espacios y suma 1.</p>',
        solucion: '<p>320 ÷ 80 = 4 espacios, así que hay 4 + 1 = <strong>5 matas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>En la milpa, ¿qué aporta la calabaza?</p>',
        opciones: ['Cubre el suelo, guarda la humedad y frena las hierbas', 'Sirve de tutor al frijol', 'Fija el nitrógeno del aire'], correcta: 0,
        pista: '<p>Piensa en sus hojas grandes al ras del suelo.</p>',
        solucion: '<p><strong>Cubre el suelo.</strong> El tutor es el maíz y el nitrógeno lo fija el frijol.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué son los quelites?</p>',
        opciones: ['Las plagas del maíz', 'Plantas que nacen solas en la milpa y se comen tiernas', 'Las flores de la calabaza'], correcta: 1,
        pista: '<p>La CONABIO menciona las verdolagas y los quintoniles.</p>',
        solucion: '<p><strong>Plantas que nacen solas y se comen tiernas</strong>, como las verdolagas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué conviene sembrar el frijol de guía unas semanas después que el maíz?</p>',
        opciones: ['Porque el frijol necesita más agua', 'Porque el frijol no germina con calor', 'Para que el maíz ya esté firme cuando el frijol trepe'], correcta: 2,
        pista: '<p>El frijol crece más rápido.</p>',
        solucion: '<p><strong>Para que el maíz esté firme.</strong> Si no, el frijol puede tumbarlo.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama un campo donde se siembran varias especies juntas, como en la milpa?</p>',
        respuestas: ['policultivo', 'un policultivo', 'policultivos', 'cultivo asociado', 'asociacion de cultivos'],
        pista: '<p>"Poli" quiere decir "muchos".</p>',
        solucion: '<p>Un <strong>policultivo</strong>.</p>' },
    ],
    fuentes: [CONABIO('sistemas-productivos/milpa', 'La milpa'), CONABIO('alimentos/maices', 'Maíces'), WIKI('Milpa', 'Milpa')],
  });

  // ------------------------------------------------------------------
  L('Cultivar trigo', {
    objetivo: 'Entender el ciclo del trigo y cultivar un pequeño cuadro en casa, desde la siembra hasta trillar y aventar el grano.',
    explicacion: `
      <p>El pan, las tortillas de harina y la pasta salen de una planta parecida al pasto: el trigo. Casi siempre se cultiva en campos enormes con máquinas, pero también se puede sembrar un cuadro pequeño en casa, y hacerlo enseña de dónde viene cada pieza de pan.</p>
      <h3>La planta</h3>
      <p>El trigo es un pasto. Primero forma un manojo de hojas delgadas; después echa un tallo con una espiga en la punta, y en esa espiga se forman los granos, cada uno dentro de una cascarita. A diferencia del maíz, el trigo se poliniza a sí mismo dentro de cada flor, así que no necesita sembrarse en bloque.</p>
      <p>Hay trigos que se siembran en otoño y pasan el invierno como plantas pequeñas, y trigos que se siembran en primavera. Lo que conviene en tu zona depende del clima; las personas que lo siembran cerca de ti te lo pueden decir.</p>
      <h3>Una experiencia real</h3>
      <p>La Extensión de la Universidad Estatal de Colorado publicó la experiencia de un jardinero que sembró trigo en su huerto en Pueblo, Colorado. Estos fueron sus datos:</p>
      <ul>
        <li>Sembró unos 28 gramos de semilla, en un cuadro de unos 6 m de largo por 1.2 m de ancho, en hileras separadas 15 cm.</li>
        <li>Lo sembró a principios de abril y a mediados de junio ya estaba listo para cosechar.</li>
        <li>Cortó las espigas con tijeras de jardín y las metió en una bolsa de papel para terminar de secarlas.</li>
        <li>Después de limpiar todo, obtuvo unos 340 gramos de grano.</li>
      </ul>
      <p>Fíjate en la cuenta: 28 gramos de semilla se convirtieron en unos 340 gramos de grano, más de 10 veces lo que sembró. Y sirvió para hornear un pan.</p>
      <h3>Trillar y aventar</h3>
      <p>Cosechar es la parte fácil. Lo difícil es separar el grano. Primero hay que <strong>trillar</strong>: golpear o frotar las espigas para que suelten los granos. El jardinero de Colorado lo hizo con guantes, frotando las espigas entre las manos, y cuenta que le costó trabajo, porque muchos granos se quedaban pegados y tuvo que repetirlo.</p>
      <p>Después hay que <strong>aventar</strong>: separar el grano de la paja y las cascaritas, que se llaman tamo o granza, usando el viento. Él puso un ventilador pequeño y una caja abajo: al dejar caer la mezcla frente al ventilador, el grano, que pesa más, cae en la caja, y la paja ligera se va volando. Antes de moler, advierte, hay que quitar las piedritas, porque dañan el molino.</p>
      <h3>Pájaros y lluvia</h3>
      <p>Los pájaros aman el trigo maduro. Una malla ligera sobre el cuadro cuando las espigas empiezan a llenarse evita perder la cosecha. Y conviene cosechar en días secos: el grano húmedo se enmohece, y el grano con moho se tira.</p>
      <h3>¿Vale la pena?</h3>
      <p>Un cuadro pequeño no te dará harina para todo el año, pero sí te enseñará el ciclo completo y te dará semilla para sembrar más la próxima vez. Cómo moler el grano y hornear pan lo verás en la unidad Alimentos.</p>
      <p class="nota"><strong>Trampa común:</strong> cosechar el trigo cuando todavía está verde. El grano debe estar duro y seco; si lo aprietas con la uña y se aplasta, todavía no está listo.</p>`,
    ejemplo: `
      <p>Con los datos del jardinero de Colorado, unos 28 gramos de semilla dieron unos 340 gramos de grano limpio. Si siembras 100 gramos de semilla, ¿cuánto grano podrías esperar?</p>
      <ol class="pasos-ej">
        <li>Primero calcula cuántas veces se multiplicó la semilla: 340 ÷ 28 ≈ 12 veces.</li>
        <li>Usa esa proporción para tus 100 gramos: 100 × 12 = 1 200 gramos.</li>
        <li>Pasa a kilos: 1 200 gramos son 1.2 kg.</li>
        <li>Comprueba con una regla de tres: si 28 dan 340, entonces 100 dan 340 × 100 ÷ 28 ≈ 1 214 gramos, muy parecido.</li>
      </ol>
      <p>Resultado: <span class="resultado">alrededor de 1.2 kg de grano</span>, aunque depende mucho del clima, la tierra y los pájaros. Con eso alcanza para unos cuantos panes y para guardar semilla.</p>
      <p class="nota"><strong>Error común:</strong> tomar un solo ejemplo como regla fija. Es una estimación; tu cosecha puede ser mayor o menor.</p>`,
    vidaReal: `
      <p>Sembrar un poco de trigo te da algo más que grano:</p>
      <ul>
        <li>Entiendes todo el trabajo que hay detrás de una bolsa de harina.</li>
        <li>Puedes hornear un pan con grano que tú sembraste.</li>
        <li>Obtienes semilla para sembrar un cuadro más grande el próximo año.</li>
        <li>La paja te sirve como mantillo para tu huerto.</li>
        <li>Aprendes a trillar y aventar, trabajos que hoy pocas personas saben hacer.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un cuadro de trigo mide 6 m de largo por 1.2 m de ancho. ¿Cuántos metros cuadrados tiene?</p>', respuesta: 6 * 1.2,
        pista: '<p>Multiplica el largo por el ancho.</p>',
        solucion: '<p>6 × 1.2 = <strong>7.2 m²</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En un cuadro de 1.2 m de ancho siembras hileras separadas 15 cm, con una en cada orilla. ¿Cuántas hileras caben?</p>', respuesta: 120 / 15 + 1,
        pista: '<p>Calcula los espacios y suma 1.</p>',
        solucion: '<p>120 ÷ 15 = 8 espacios, así que caben 8 + 1 = <strong>9 hileras</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si cada gramo de semilla rindió unos 12 gramos de grano, ¿cuántos gramos esperas de 50 gramos de semilla?</p>', respuesta: 50 * 12,
        pista: '<p>Multiplica la semilla por 12.</p>',
        solucion: '<p>50 × 12 = <strong>600 gramos</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es trillar?</p>',
        opciones: ['Regar el trigo', 'Golpear o frotar las espigas para que suelten los granos', 'Moler el grano'], correcta: 1,
        pista: '<p>Es el paso que va justo después de cortar las espigas.</p>',
        solucion: '<p><strong>Golpear o frotar las espigas</strong> para separar los granos.</p>' },
      { tipo: 'opciones', enunciado: '<p>Al aventar frente a un ventilador, ¿por qué el grano cae en la caja y la paja se va?</p>',
        opciones: ['Porque el grano pesa más que la paja', 'Porque la paja está mojada', 'Porque el grano es más grande'], correcta: 0,
        pista: '<p>Piensa en qué es más fácil de mover con el viento.</p>',
        solucion: '<p><strong>Porque el grano pesa más.</strong> El viento se lleva lo ligero.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama separar el grano de la paja usando el viento?</p>',
        respuestas: ['aventar', 'aventado', 'el aventado', 'ventear', 'beldar', 'aventar el grano'],
        pista: '<p>Viene de "viento".</p>',
        solucion: '<p><strong>Aventar</strong>.</p>' },
    ],
    fuentes: [PUEBLO, WIKI('Triticum', 'Triticum')],
  });

  // ------------------------------------------------------------------
  L('Cultivar arroz', {
    objetivo: 'Conocer las formas de cultivar arroz, por qué casi siempre se siembra inundado y qué es realista intentar a pequeña escala.',
    explicacion: `
      <p>Si alguna vez viste fotos de campos verdes llenos de agua, como espejos, con gente sembrando con el agua hasta las rodillas, viste arrozales. El arroz es el grano que más gente come en el mundo, y casi todo se cultiva así, con los pies en el agua. Pero no siempre: también hay arroz que crece en tierra seca.</p>
      <h3>Una planta que tolera el agua</h3>
      <p>El arroz es un pasto, pariente del trigo y del maíz. Tiene algo especial: aguanta crecer con las raíces bajo el agua, cuando la mayoría de los cultivos se ahogaría, como viste en "Qué necesitan las plantas". Por eso se puede inundar el campo, y el agua ayuda a frenar a las hierbas que compiten con él.</p>
      <h3>Tres formas de cultivarlo</h3>
      <p>El Instituto Internacional de Investigación del Arroz (IRRI) clasifica los arrozales según cómo reciben el agua:</p>
      <ul>
        <li>El <strong>arroz inundado</strong> de riego crece en campos rodeados de bordos, unos bordes de tierra que retienen el agua. Ocupa cerca del 44% del área de arroz del mundo.</li>
        <li>El arroz de temporal en tierras bajas también se inunda, pero con agua de lluvia, al menos parte de la temporada. Ocupa cerca del 45%.</li>
        <li>El <strong>arroz de secano</strong> crece en campos que no se inundan ni se riegan, como cualquier otro cultivo, con agua de lluvia. Ocupa cerca del 11%, y es la forma más común en África y en Brasil.</li>
      </ul>
      <p>El IRRI explica que el arroz inundado es el más productivo: da cerca del 75% de todo el arroz del mundo. El de secano rinde menos, pero no necesita bordos ni tanta agua.</p>
      <h3>¿Se puede en casa?</h3>
      <p>Para un huerto familiar, el arroz es de los cultivos más difíciles: necesita calor, mucha agua y bastante espacio para producir una cantidad que valga la pena. Si vives en un lugar caluroso y lluvioso, puedes probar el arroz de secano, sembrado directo como el trigo, en una cama que no se encharque. Si tienes una parte baja del terreno donde se junta el agua de lluvia, puedes formar un pequeño cuadro con bordos para inundarlo.</p>
      <p>En muchos lugares, el arroz se siembra primero en un almácigo y después se trasplanta al campo inundado, como viste en "Semilleros y almácigos" y "Trasplantar". Así las plantitas empiezan protegidas y le ganan a las hierbas. Antes de intentarlo, pregunta en tu región si se cultiva arroz y qué variedad usan; una semilla adaptada a tu clima cambia todo.</p>
      <p>Un cuidado importante: el agua quieta de un arrozal también puede criar mosquitos, como viste en la unidad Agua. En un cuadro pequeño, no dejes charcos estancados fuera del cultivo.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que el arroz solo crece inundado. El arroz de secano crece en tierra firme, aunque rinde menos.</p>`,
    ejemplo: `
      <p>Según el IRRI, el arroz irrigado ocupa cerca del 44% del área mundial, el de temporal en tierras bajas cerca del 45% y el de secano cerca del 11%. Si un país tuviera 1 000 hectáreas de arroz (una hectárea es un cuadrado de 100 m por lado) con esas mismas proporciones, ¿cuántas serían de secano?</p>
      <ol class="pasos-ej">
        <li>Primero comprueba que los porcentajes suman el total: 44 + 45 + 11 = 100%.</li>
        <li>Calcula el 11% de 1 000: el 10% es 100 y el 1% es 10, así que el 11% es 110 hectáreas.</li>
        <li>Para comparar, el de riego sería el 44%: 440 hectáreas, y el de temporal en tierras bajas, 450.</li>
        <li>Comprueba: 440 + 450 + 110 = 1 000 hectáreas.</li>
      </ol>
      <p>Resultado: <span class="resultado">110 hectáreas de arroz de secano</span>.</p>
      <p class="nota"><strong>Error común:</strong> confundir "de temporal" con "de secano". El de temporal en tierras bajas sí se inunda con la lluvia; el de secano no se inunda.</p>`,
    vidaReal: `
      <p>Conocer cómo crece el arroz te ayuda a valorarlo y a decidir si te conviene sembrarlo:</p>
      <ul>
        <li>Entiendes por qué el arroz necesita tanta agua y dónde se cultiva.</li>
        <li>Si vives en un lugar cálido y lluvioso, puedes probar un cuadro pequeño.</li>
        <li>Puedes elegir mejor qué granos sembrar según tu clima y tu agua.</li>
        <li>Cuando ves un plato de arroz, sabes el trabajo que hay detrás.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Según el IRRI, el arroz irrigado ocupa el 44% del área y el de temporal en tierras bajas el 45%. ¿Qué porcentaje queda para el de secano?</p>', respuesta: 100 - 44 - 45,
        pista: '<p>Los tres juntos suman 100%.</p>',
        solucion: '<p>100 − 44 − 45 = <strong>11%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si en una región hay 500 hectáreas de arroz y el 44% es de riego, ¿cuántas hectáreas son de riego?</p>', respuesta: 500 * 44 / 100,
        pista: '<p>Saca el 44% de 500.</p>',
        solucion: '<p>500 × 0.44 = <strong>220 hectáreas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es un bordo en un arrozal?</p>',
        opciones: ['Una herramienta para cosechar', 'Un borde de tierra que retiene el agua en el campo', 'Una variedad de arroz'], correcta: 1,
        pista: '<p>Sirve para que el agua no se escape.</p>',
        solucion: '<p><strong>Un borde de tierra</strong> que mantiene el campo inundado.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál forma de cultivar arroz produce la mayor parte del arroz del mundo?</p>',
        opciones: ['El de secano', 'El cultivado en macetas', 'El inundado'], correcta: 2,
        pista: '<p>El IRRI habla de cerca del 75%.</p>',
        solucion: '<p><strong>El inundado</strong>, que produce cerca del 75%.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué ventaja tiene el arroz de secano?</p>',
        opciones: ['No necesita bordos ni inundar el campo', 'Rinde más que el inundado', 'Crece sin agua de ningún tipo'], correcta: 0,
        pista: '<p>Se cultiva como cualquier otro cultivo, con lluvia.</p>',
        solucion: '<p><strong>No necesita bordos ni inundar.</strong> A cambio, rinde menos y necesita lluvia.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el arroz que crece en campos que no se inundan ni se riegan?</p>',
        respuestas: ['arroz de secano', 'secano', 'de secano', 'arroz de tierras altas'],
        pista: '<p>Es lo contrario de "mojado".</p>',
        solucion: '<p>El <strong>arroz de secano</strong>.</p>' },
    ],
    fuentes: [IRRI, WIKI('Oryza_sativa', 'Oryza sativa')],
  });

  // ------------------------------------------------------------------
  L('Cultivar papa', {
    objetivo: 'Sembrar papa, aporcarla para que no se pongan verdes los tubérculos y cosecharla en el momento adecuado para comerla o guardarla.',
    explicacion: `
      <p>La papa viene de los Andes, donde se cultiva desde hace miles de años y hay cientos de variedades. La Extensión de la Universidad Estatal de Iowa recuerda que la llamada "papa irlandesa" en realidad es de Sudamérica. Hoy es uno de los alimentos más importantes del mundo, y en un huerto rinde mucho en poco espacio.</p>
      <h3>Siembra</h3>
      <p>Como viste en "Esquejes, tubérculos y otras formas de multiplicar plantas", la papa se siembra con papas: enteras si son pequeñas, o en trozos con uno o dos ojos, que se dejan cicatrizar antes de sembrar. Iowa indica que prefiere tierra suelta, que drene bien y ligeramente ácida, y advierte no echarle mucho estiércol, porque puede aumentar algunos problemas de la cáscara. Los trozos se siembran a unos 10 cm de profundidad. La guía "Su propio cultivo" de la Universidad Estatal de Oregon indica unos 75 cm entre filas y 30 cm entre plantas.</p>
      <h3>Aporcar</h3>
      <p>Las papas no son raíces: son tallos que crecen bajo tierra. Si les da la luz, se ponen verdes. <strong>Aporcar</strong> es arrimar tierra a la base de la planta, formando un montículo. Según Iowa, aporcar le da a la papa tierra suelta donde crecer y evita que los tubérculos queden al descubierto y se pongan verdes. Se hace varias veces mientras la planta crece, con cuidado de no lastimar las raíces.</p>
      <p>Esto no es solo de apariencia. MedlinePlus advierte que comer los tubérculos verdes o los brotes de la papa puede causar una intoxicación. Si una papa tiene partes verdes o brotes, no la comas; si alguien se siente mal después de comer papas verdes, busca atención médica o llama a emergencias.</p>
      <h3>Riego</h3>
      <p>Iowa recomienda regar a fondo una vez por semana si no llueve, sobre todo cuando se forman los tubérculos. Si la tierra pasa de muy seca a muy mojada una y otra vez, las papas pueden salir huecas por dentro, rajadas o deformes.</p>
      <h3>Cosecha</h3>
      <ul>
        <li>Papas tiernas: según Iowa, se pueden sacar cuando miden más de unos 4 cm, mientras la planta sigue verde. Tienen la cáscara delgada, no se guardan bien y conviene comerlas pronto.</li>
        <li>Papas para guardar: se cosechan cuando la planta ya se secó, más o menos 90 a 120 días después de sembrar. Para saber si están listas, saca una o dos matas: si la cáscara se desprende al frotarla, déjalas unos días más en la tierra.</li>
      </ul>
      <p>Al cosechar, afloja la tierra con una pala o un bieldo y saca las papas con cuidado, sin golpearlas ni cortarlas. Iowa recomienda curarlas dos semanas en un lugar fresco, de 10 a 15 °C, y húmedo, para que sanen los raspones y su cáscara se haga más gruesa. Después se guardan en un lugar oscuro y fresco, para que no se pongan verdes.</p>
      <p>Iowa calcula que, bien cuidadas, rinden de 9 a 14 kilos por cada 3 metros de surco.</p>
      <p class="nota"><strong>Trampa común:</strong> no aporcar y dejar papas al descubierto. Se ponen verdes y ya no se deben comer.</p>`,
    ejemplo: `
      <p>Iowa calcula de 9 a 14 kg de papa por cada 3 m de surco. Tienes 2 surcos de 6 m. ¿Cuántos kilos puedes esperar, como mínimo y como máximo?</p>
      <ol class="pasos-ej">
        <li>Primero calcula los metros totales: 2 × 6 = 12 m de surco.</li>
        <li>¿Cuántos tramos de 3 m hay? 12 ÷ 3 = 4 tramos.</li>
        <li>Mínimo: 4 × 9 = 36 kg. Máximo: 4 × 14 = 56 kg.</li>
        <li>Comprueba por metro: 9 kg en 3 m son 3 kg por metro, y 12 m × 3 = 36 kg, igual que antes.</li>
      </ol>
      <p>Resultado: <span class="resultado">entre 36 y 56 kg de papa</span>. Si tu familia come unos 2 kg por semana, eso alcanza para entre 18 y 28 semanas.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar los 9 kg por los 12 metros, como si fueran por metro.</p>`,
    vidaReal: `
      <p>La papa rinde mucho y se guarda bien:</p>
      <ul>
        <li>Unos cuantos surcos pueden darte papa para varios meses.</li>
        <li>Sabes por qué no debes comer papas verdes o con brotes.</li>
        <li>Puedes cosechar papas tiernas antes de tiempo para una comida especial.</li>
        <li>Guardas tu cosecha en un lugar oscuro y fresco sin que se eche a perder.</li>
        <li>Calculas cuánta papa sembrar según lo que come tu familia en un año.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un surco mide 4.5 m y siembras un trozo de papa cada 30 cm, con uno en cada orilla. ¿Cuántos trozos siembras?</p>', respuesta: 450 / 30 + 1,
        pista: '<p>Calcula los espacios y suma 1.</p>',
        solucion: '<p>450 ÷ 30 = 15 espacios, así que son 15 + 1 = <strong>16 trozos</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Sembraste papa el 1 de marzo. Si tarda unos 100 días en estar lista para guardar, ¿cuántas semanas son, más o menos? Redondea al entero.</p>', respuesta: 100 / 7, tolerancia: 0.6,
        pista: '<p>Divide los días entre 7.</p>',
        solucion: '<p>100 ÷ 7 ≈ 14.3, unas <strong>14 semanas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué se aporca la papa?</p>',
        opciones: ['Para darle tierra suelta y que los tubérculos no queden al sol y se pongan verdes', 'Para que florezca más', 'Para que crezca más rápido hacia arriba'], correcta: 0,
        pista: '<p>Piensa en qué le pasa a una papa expuesta a la luz.</p>',
        solucion: '<p><strong>Para que no queden al sol.</strong> Las papas verdes no se deben comer.</p>' },
      { tipo: 'opciones', enunciado: '<p>Sacas una papa y su cáscara se desprende al frotarla. ¿Qué haces?</p>',
        opciones: ['La cosechas toda de inmediato', 'Riegas el doble', 'Dejas las demás unos días más en la tierra'], correcta: 2,
        pista: '<p>Una cáscara delgada indica que todavía no maduran del todo.</p>',
        solucion: '<p><strong>Las dejas unos días más</strong> para que su cáscara se endurezca y se guarden bien.</p>' },
      { tipo: 'opciones', enunciado: '<p>Encuentras papas con partes verdes en tu cosecha. ¿Qué haces?</p>',
        opciones: ['Las cueces más tiempo', 'No las comes', 'Las comes con cáscara'], correcta: 1,
        pista: '<p>Recuerda lo que advierte MedlinePlus.</p>',
        solucion: '<p><strong>No las comes.</strong> Los tubérculos verdes pueden intoxicar.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama arrimar tierra a la base de la planta de papa formando un montículo?</p>',
        respuestas: ['aporcar', 'aporque', 'el aporque', 'aporcado', 'calzar', 'acollar'],
        pista: '<p>Empieza con "apor".</p>',
        solucion: '<p><strong>Aporcar</strong>.</p>' },
    ],
    fuentes: [IOWA('growing-potatoes-home-garden', 'Growing Potatoes in the Home Garden'), OSU, MEDPAPA, WIKI('Solanum_tuberosum', 'Solanum tuberosum')],
  });

  // ------------------------------------------------------------------
  L('Cultivar camote y yuca', {
    objetivo: 'Cultivar camote a partir de sus brotes y yuca a partir de estacas, y saber por qué la yuca nunca se come cruda.',
    explicacion: `
      <p>El camote y la yuca son raíces llenas de almidón que alimentan a millones de personas en los lugares cálidos. Las dos aguantan calor y suelos pobres, y las dos se siembran sin semilla. Pero la yuca tiene un secreto que hay que conocer antes de comerla.</p>
      <h3>Camote</h3>
      <p>Como viste en "Esquejes, tubérculos y otras formas de multiplicar plantas", el camote se siembra con brotes, que en inglés se llaman <span lang="en">slips</span>. Conviene partir de un camote orgánico, porque a los demás suelen aplicarles productos que impiden que broten. La Extensión de la Universidad Estatal de Iowa describe un buen brote: firme, verde, de 20 a 30 cm de largo y con una o dos hojas. Es un cultivo de temporada cálida que necesita una temporada larga sin heladas y de 6 a 8 horas de sol pleno al día. Iowa recomienda filas separadas de 90 a 120 cm y 30 cm entre plantas.</p>
      <p>La mayoría de las variedades tarda de 90 a 120 días en estar lista. Iowa indica cosechar a finales del verano o principios del otoño, antes de que la tierra se enfríe por debajo de unos 15 °C, o justo antes o después de la primera helada que queme las guías. Saca los camotes con cuidado, porque su cáscara es delicada y se lastima fácil.</p>
      <h3>Yuca</h3>
      <p>La yuca, también llamada mandioca, se siembra con <strong>estacas</strong>, que son trozos del tallo leñoso. La Universidad de Florida indica trozos de unos 25 cm, enterrados de 5 a 10 cm, con 1.2 m entre plantas y entre filas. Es una planta de clima cálido: necesita de 8 a 11 meses sin heladas para formar raíces comestibles. Las raíces se echan a perder muy rápido después de sacarlas, así que se cosechan conforme se van a usar.</p>
      <h3>La yuca no se come cruda</h3>
      <p>La yuca contiene unas sustancias llamadas <strong>glucósidos cianogénicos</strong>, que al romperse liberan cianuro, un veneno. La agencia de normas alimentarias de Australia y Nueva Zelanda (FSANZ) explica que por eso la yuca debe pelarse y cocerse por completo antes de comerse. La Universidad de Florida añade que hay yucas dulces, con poco de esta sustancia, que se pueden comer hervidas como verdura, y yucas amargas, con mucha más. Las hojas también la tienen, incluso más que la raíz, según FSANZ, y no se comen crudas ni se preparan sin que alguien con experiencia te enseñe cómo.</p>
      <p>FSANZ advierte algo importante: hervir, cocer al vapor, hornear o freír quita solo una parte del veneno, y no es confiable para la yuca amarga. Esa yuca necesita procesos más largos, como remojarla varios días, fermentarla o secarla, que las comunidades que la cultivan conocen bien. Por eso:</p>
      <ul>
        <li>Siembra variedades de yuca dulce que la gente de tu región ya come hervida, y pregunta cómo la preparan.</li>
        <li>Nunca comas yuca ni sus hojas crudas.</li>
        <li>Pélala por completo y cuécela hasta que esté bien suave; esto vale para la yuca dulce, no para la amarga.</li>
        <li>Si alguien se siente mal después de comer yuca, llama al número de emergencias o al centro de toxicología de tu país.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> confiar en que hervirla basta para cualquier yuca. Con la yuca amarga no basta; si no sabes qué tipo es, no la comas.</p>`,
    ejemplo: `
      <p>Plantas yuca el 1 de marzo. Si tarda de 8 a 11 meses en dar raíces comestibles, ¿entre qué meses podrías empezar a cosechar?</p>
      <ol class="pasos-ej">
        <li>Primero suma 8 meses a marzo: abril, mayo, junio, julio, agosto, septiembre, octubre y noviembre. El mínimo es noviembre.</li>
        <li>Ahora suma 11 meses: a noviembre le sigues contando diciembre, enero y febrero. El máximo es febrero del año siguiente.</li>
        <li>Recuerda que la planta necesita esos meses sin heladas; si en tu zona hiela en invierno, la yuca no alcanzará a formar raíces.</li>
        <li>Comprueba contando hacia atrás: de febrero a marzo del año anterior hay 11 meses.</li>
      </ol>
      <p>Resultado: <span class="resultado">entre noviembre y febrero del año siguiente</span>, sacando las raíces conforme las vayas a usar.</p>
      <p class="nota"><strong>Error común:</strong> cosechar todas las raíces juntas. Se echan a perder en pocos días.</p>`,
    vidaReal: `
      <p>Saber cultivar estas raíces te da comida en lugares donde otros cultivos sufren:</p>
      <ul>
        <li>Aguantan el calor y suelos poco fértiles.</li>
        <li>Un camote orgánico del mercado puede darte brotes para toda una cama.</li>
        <li>Sabes cómo comer yuca sin correr riesgos.</li>
        <li>La yuca se queda en la tierra hasta que la necesitas.</li>
        <li>Puedes enseñar a otras personas por qué la yuca nunca se come cruda.</li>
        <li>El camote te da raíces dulces y nutritivas en pocos meses.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una cama de camote mide 3.6 m y siembras un brote cada 30 cm, con uno en cada orilla. ¿Cuántos brotes siembras?</p>', respuesta: 360 / 30 + 1,
        pista: '<p>Calcula los espacios y suma 1.</p>',
        solucion: '<p>360 ÷ 30 = 12 espacios, así que son 12 + 1 = <strong>13 brotes</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un terreno de 6 m por 6 m lleva yuca a 1.2 m entre plantas y entre filas, empezando en una orilla. ¿Cuántas plantas caben por fila?</p>', respuesta: 6 / 1.2 + 1,
        pista: '<p>Calcula los espacios en 6 m y suma 1.</p>',
        solucion: '<p>6 ÷ 1.2 = 5 espacios, así que caben 5 + 1 = <strong>6 plantas</strong> por fila.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué la yuca nunca se come cruda?</p>',
        opciones: ['Porque es muy dura', 'Porque contiene sustancias que liberan cianuro', 'Porque no tiene sabor'], correcta: 1,
        pista: '<p>Recuerda lo que explica FSANZ.</p>',
        solucion: '<p><strong>Porque contiene glucósidos cianogénicos</strong>, que liberan cianuro.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según FSANZ, ¿basta con hervir una yuca amarga para que sea segura?</p>',
        opciones: ['Sí, siempre', 'Solo si se hierve 5 minutos', 'No: hervir quita solo una parte y no es confiable'], correcta: 2,
        pista: '<p>FSANZ habla de procesos más largos.</p>',
        solucion: '<p><strong>No es confiable.</strong> La yuca amarga necesita remojo, fermentación o secado.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Con qué se siembra la yuca?</p>',
        opciones: ['Con estacas, que son trozos de tallo', 'Con semillas de la flor', 'Con hojas'], correcta: 0,
        pista: '<p>Es una forma de reproducción vegetativa.</p>',
        solucion: '<p><strong>Con estacas</strong>, trozos del tallo leñoso.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llaman los trozos de tallo con los que se siembra la yuca?</p>',
        respuestas: ['estacas', 'estaca', 'las estacas', 'esquejes', 'esqueje', 'cangres'],
        pista: '<p>Es la misma palabra que se usa para los palos clavados en la tierra.</p>',
        solucion: '<p>Las <strong>estacas</strong>.</p>' },
    ],
    fuentes: [IOWA('growing-sweet-potatoes-iowa', 'Growing Sweet Potatoes in Iowa'), AZRAICES, UFYUCA, FSANZ, MEDVENENO, WIKI('Manihot_esculenta', 'Manihot esculenta')],
  });

  // ------------------------------------------------------------------
  L('Cultivar jitomate', {
    objetivo: 'Elegir entre jitomate determinado e indeterminado, sembrarlo con el espacio y el soporte que necesita, regarlo parejo y cosecharlo en su punto.',
    explicacion: `
      <p>El jitomate es el favorito de muchos huertos, y también uno de los que más decepciona cuando no se entiende cómo crece. Hay plantas que se quedan bajitas y dan todo de golpe, y otras que no paran de crecer hasta que llega el frío. Saber cuál tienes cambia cómo la siembras y cómo la sostienes.</p>
      <h3>Dos formas de crecer</h3>
      <p>La Extensión de la Universidad Estatal de Iowa distingue dos tipos:</p>
      <ul>
        <li>El jitomate <strong>determinado</strong> es una planta pequeña y compacta que crece hasta cierta altura, florece y forma todos sus frutos en poco tiempo. Su cosecha dura unas 4 a 6 semanas, así que conviene si quieres hacer conservas.</li>
        <li>El jitomate <strong>indeterminado</strong> sigue creciendo, floreciendo y dando fruto hasta que lo mata la primera helada. Sus frutos maduran más tarde, pero la cosecha dura de dos a tres meses y suele rendir más. Es una planta alta que se extiende y que produce mejor con estacas o jaulas.</li>
      </ul>
      <p>El sobre de semillas o la etiqueta de la plántula suele decir de qué tipo es.</p>
      <h3>Siembra</h3>
      <p>Iowa indica que el jitomate necesita al menos 6 horas de sol directo, tierra profunda que drene bien y un suelo ligeramente ácido. Se empieza en almácigo: la guía "Su propio cultivo" de la Universidad Estatal de Oregon calcula unas 8 semanas antes del trasplante, e Iowa, de 5 a 6 semanas. Como viste en "Trasplantar sin dañar las raíces", el jitomate se puede plantar más hondo que como estaba en su maceta, porque echa raíces a lo largo del tallo enterrado; Iowa señala que es la única hortaliza que se puede plantar con éxito de esa manera.</p>
      <h3>Espacio y soporte</h3>
      <p>Las distancias dependen del tipo y de cómo lo sostengas. Según Iowa:</p>
      <ul>
        <li>Indeterminado con estaca: de 45 a 60 cm entre plantas.</li>
        <li>Indeterminado en jaula de alambre: de 60 a 90 cm.</li>
        <li>Sin soporte, extendido en el suelo: de 90 a 120 cm.</li>
        <li>Determinado: de 45 a 60 cm, en filas separadas unos 120 cm.</li>
      </ul>
      <p>Poner la estaca o la jaula al momento de plantar evita lastimar las raíces después. Sin soporte, los frutos tocan el suelo, se ensucian y se pudren más.</p>
      <h3>Riego parejo</h3>
      <p>Iowa recomienda regar en la mañana y directo a la tierra, sin mojar las hojas, porque el agua que salpica la tierra ayuda a propagar enfermedades. Lo más importante es regar parejo, sobre todo cuando se forman los frutos: si la tierra pasa de muy seca a muy mojada, los jitomates se rajan o les sale una mancha negra y hundida en la punta, que se llama pudrición apical. Una capa de mantillo, como viste en "Riego eficiente", ayuda a mantener la humedad pareja.</p>
      <h3>Cosecha</h3>
      <p>Según la guía de cosecha de Iowa, el jitomate tiene mejor sabor si se corta bien maduro, y suele estar listo de 40 a 50 días después de la flor. Si se acerca una helada, los jitomates verdes que ya alcanzaron su tamaño se pueden cortar y madurar dentro de la casa.</p>
      <p class="nota"><strong>Trampa común:</strong> regar mucho un día y nada en una semana. Ese vaivén causa jitomates rajados y con la punta negra.</p>`,
    ejemplo: `
      <p>Tienes una cama de 3 m de largo para jitomate indeterminado con estacas, a 60 cm entre plantas. ¿Cuántas plantas caben, con una en cada orilla, y cuántos meses de cosecha puedes esperar?</p>
      <ol class="pasos-ej">
        <li>Primero calcula los espacios: 3 m son 300 cm, y 300 ÷ 60 = 5 espacios.</li>
        <li>Con una planta en cada orilla, hay un espacio menos que plantas: 5 + 1 = 6 plantas.</li>
        <li>Para la cosecha, Iowa calcula de dos a tres meses en el indeterminado, desde que empiezan a madurar hasta la primera helada.</li>
        <li>Comprueba: 6 plantas separadas 60 cm ocupan 5 × 60 = 300 cm, justo los 3 m.</li>
      </ol>
      <p>Resultado: <span class="resultado">6 plantas, con dos a tres meses de cosecha</span>.</p>
      <p class="nota"><strong>Error común:</strong> apretar las plantas para meter más. Con poco aire entre ellas, se enferman más y producen menos.</p>`,
    vidaReal: `
      <p>Saber cultivar jitomate te da uno de los sabores más apreciados del huerto:</p>
      <ul>
        <li>Eliges el tipo de planta según quieras salsa fresca todo el verano o hacer conservas de una vez.</li>
        <li>Evitas los jitomates rajados y con la punta negra regando parejo.</li>
        <li>Puedes madurar dentro de casa los jitomates verdes antes de una helada.</li>
        <li>Un jitomate maduro de tu huerto sabe mucho mejor que uno del mercado.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En una fila de 2.4 m siembras jitomate cada 60 cm, con una planta en cada orilla. ¿Cuántas plantas caben?</p>', respuesta: 240 / 60 + 1,
        pista: '<p>Calcula los espacios y suma 1.</p>',
        solucion: '<p>240 ÷ 60 = 4 espacios, así que caben 4 + 1 = <strong>5 plantas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una flor de jitomate abrió el 5 de julio. Si el fruto tarda unos 45 días en madurar, ¿qué día de agosto estará listo? Julio tiene 31 días.</p>', respuesta: 5 + 45 - 31,
        pista: '<p>Suma 45 días al 5 de julio y resta los 31 días de julio.</p>',
        solucion: '<p>5 + 45 = 50; 50 − 31 = <strong>19</strong>, el 19 de agosto.</p>' },
      { tipo: 'opciones', enunciado: '<p>Quieres hacer muchas conservas de jitomate en un solo fin de semana. ¿Qué tipo conviene?</p>',
        opciones: ['Indeterminado', 'Determinado', 'Cualquiera da igual'], correcta: 1,
        pista: '<p>Uno forma todos sus frutos en poco tiempo.</p>',
        solucion: '<p><strong>Determinado</strong>, porque da casi toda su cosecha en 4 a 6 semanas.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tus jitomates tienen una mancha negra y hundida en la punta. ¿Qué es lo más probable?</p>',
        opciones: ['Riego disparejo', 'Exceso de sol', 'Falta de polinización'], correcta: 0,
        pista: '<p>Iowa lo relaciona con la humedad de la tierra.</p>',
        solucion: '<p><strong>Riego disparejo.</strong> Riega con regularidad y usa mantillo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Se acerca una helada y tienes jitomates verdes de buen tamaño. ¿Qué haces?</p>',
        opciones: ['Los dejas en la planta', 'Los tiras', 'Los cortas y los maduras dentro de la casa'], correcta: 2,
        pista: '<p>La helada mata la planta.</p>',
        solucion: '<p><strong>Los cortas y los maduras dentro.</strong> Así no se pierden con la helada.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el jitomate que sigue creciendo y dando fruto hasta que lo mata la helada?</p>',
        respuestas: ['indeterminado', 'jitomate indeterminado', 'el indeterminado', 'de crecimiento indeterminado'],
        pista: '<p>Es lo contrario de "determinado".</p>',
        solucion: '<p>El <strong>indeterminado</strong>.</p>' },
    ],
    fuentes: [IOWA('growing-tomatoes-home-garden', 'Growing Tomatoes in the Home Garden'), IOWA('recommended-cultivars-and-types-tomatoes-home-garden', 'Recommended Cultivars and Types of Tomatoes'), OSU, IOWA('vegetable-harvest-guide', 'Vegetable Harvest Guide')],
  });

  // ------------------------------------------------------------------
  L('Cultivar chile', {
    objetivo: 'Sembrar chile con el calor y el tiempo que necesita, manejar los chiles picosos con seguridad y cosecharlos verdes o maduros.',
    explicacion: `
      <p>México es tierra de chiles: jalapeño, serrano, poblano, habanero y muchos más. Todos son plantas del mismo grupo, y aunque cambian mucho en forma y picor, se cultivan de manera parecida. La clave es una sola: calor y paciencia.</p>
      <h3>Una planta de calor</h3>
      <p>La Extensión de la Universidad Estatal de Iowa explica que el chile es un cultivo de temporada cálida que necesita una temporada larga para producir bien. Crece mejor con temperaturas de día de unos 21 a 29 °C y necesita al menos 6 horas de sol directo. Por eso se empieza temprano en almácigo: la guía "Su propio cultivo" de la Universidad Estatal de Oregon calcula unas 10 semanas antes del trasplante, más que el jitomate. Se trasplanta cuando ya no hay heladas y la tierra está tibia.</p>
      <h3>Distancias</h3>
      <p>Iowa recomienda unos 45 cm entre plantas y de 60 a 75 cm entre filas. También se pueden plantar dos hileras alternadas, separadas de 30 a 45 cm, con plantas a 45 cm. Iowa señala que las plantas de pimiento se benefician de un soporte pequeño, porque muchas veces dan tantos frutos que las ramas se vencen.</p>
      <h3>¿Por qué pica?</h3>
      <p>El picor viene de unas sustancias llamadas <strong>capsaicinoides</strong>; la principal es la capsaicina. Iowa explica algo que sorprende a muchos: no se producen en las semillas, sino en las membranas blancas que unen las semillas al chile, llamadas placenta. Las semillas pican porque están pegadas a esas membranas. Por eso, si quitas las venas y las semillas, el chile pica menos.</p>
      <p>El picor se mide en unidades Scoville; entre más alto el número, más pica. Cada persona reacciona distinto, y quien come chile seguido se acostumbra.</p>
      <h3>Manejarlo con cuidado</h3>
      <p>Iowa advierte que el chile puede arder en la piel si no se maneja con cuidado:</p>
      <ul>
        <li>Usa guantes de hule al cortarlos o picarlos, sobre todo si son muy picosos.</li>
        <li>No te toques la cara, los ojos ni la boca mientras los manejas, porque la capsaicina pasa con facilidad de las manos a donde toques.</li>
        <li>Si te arden los ojos, enjuágalos con abundante agua limpia; si el ardor no pasa, busca atención médica.</li>
        <li>Si un chile te arde mucho en la boca, Iowa sugiere comer algo con grasa, como queso, o tomar leche.</li>
      </ul>
      <p>La guía de cosecha de Iowa recomienda usar guantes al cosechar chiles picosos.</p>
      <h3>Verde o maduro</h3>
      <p>Según Iowa, muchos chiles y pimientos se cosechan verdes, cuando todavía no maduran, y otros se dejan en la planta hasta que toman su color final: rojo, amarillo, naranja o morado. Un chile maduro tiene otro sabor y, muchas veces, pica más. El pimiento tarda unos 45 a 55 días después de la flor para cosecharse verde, y de 60 a 70 para tomar color. Córtalo con tijeras, no lo jales, porque las ramas son quebradizas.</p>
      <p>Cortar los frutos con frecuencia hace que la planta siga floreciendo. Si los dejas todos en la mata, produce menos.</p>
      <p class="nota"><strong>Trampa común:</strong> tallarse los ojos después de cortar chiles. Lávate bien las manos con agua y jabón antes de tocarte la cara.</p>`,
    ejemplo: `
      <p>Quieres trasplantar tus chiles el 15 de abril y necesitan unas 10 semanas en almácigo. ¿Qué día siembras las semillas?</p>
      <ol class="pasos-ej">
        <li>Primero pasa las semanas a días: 10 × 7 = 70 días.</li>
        <li>Cuenta hacia atrás desde el 15 de abril. Retroceder 15 días te lleva al 31 de marzo; te faltan 70 − 15 = 55 días.</li>
        <li>Marzo tiene 31 días: retroceder 31 te lleva al 28 de febrero; te faltan 55 − 31 = 24 días.</li>
        <li>Retrocede 24 días desde el 28 de febrero: el 4 de febrero.</li>
        <li>Comprueba hacia adelante: del 4 al 28 de febrero hay 24 días, más 31 de marzo y 15 de abril: 24 + 31 + 15 = 70.</li>
      </ol>
      <p>Resultado: <span class="resultado">sembrar el 4 de febrero</span>, en un año que no es bisiesto.</p>
      <p class="nota"><strong>Error común:</strong> olvidar que febrero tiene 28 días, o 29 en año bisiesto.</p>`,
    vidaReal: `
      <p>Cultivar tus chiles te da sabor y ahorro:</p>
      <ul>
        <li>Puedes tener chiles frescos de varias variedades que en el mercado son caros.</li>
        <li>Sabes cómo controlar qué tanto pica una salsa.</li>
        <li>Evitas accidentes en la cocina al manejar chiles muy picosos.</li>
        <li>Una mata bien cuidada da chiles durante meses.</li>
        <li>Puedes secar los chiles que te sobren para tener todo el año.</li>
        <li>Sabes por qué el mismo chile pica más maduro que verde.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una fila de 2.7 m lleva un chile cada 45 cm, con uno en cada orilla. ¿Cuántas plantas caben?</p>', respuesta: 270 / 45 + 1,
        pista: '<p>Calcula los espacios y suma 1.</p>',
        solucion: '<p>270 ÷ 45 = 6 espacios, así que caben 6 + 1 = <strong>7 plantas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>El chile necesita unas 10 semanas en almácigo. ¿Cuántos días son?</p>', respuesta: 10 * 7,
        pista: '<p>Cada semana tiene 7 días.</p>',
        solucion: '<p>10 × 7 = <strong>70 días</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Iowa, ¿en qué parte del chile se produce la capsaicina?</p>',
        opciones: ['En la cáscara', 'En la placenta, las membranas que unen las semillas', 'En el tallo'], correcta: 1,
        pista: '<p>Las semillas pican porque están pegadas a ella.</p>',
        solucion: '<p><strong>En la placenta.</strong> Por eso quitar las venas reduce el picor.</p>' },
      { tipo: 'opciones', enunciado: '<p>Te arde mucho la boca por un chile. Según Iowa, ¿qué te puede ayudar?</p>',
        opciones: ['Tomar leche o comer queso', 'Tomar agua muy fría', 'Comer otro chile'], correcta: 0,
        pista: '<p>Iowa menciona algo con grasa.</p>',
        solucion: '<p><strong>Leche o queso</strong>, que tienen grasa.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué conviene usar guantes al cortar chiles muy picosos?</p>',
        opciones: ['Para que no se manchen', 'Para que duren más', 'Porque la capsaicina puede arder en la piel y pasar a los ojos'], correcta: 2,
        pista: '<p>Piensa en qué pasa si después te tocas la cara.</p>',
        solucion: '<p><strong>Porque la capsaicina arde</strong> y pasa con facilidad a los ojos y la boca.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la sustancia principal que hace que el chile pique?</p>',
        respuestas: ['capsaicina', 'la capsaicina', 'capsaicinoides', 'capsicina'],
        pista: '<p>Viene de "Capsicum", el nombre científico del chile.</p>',
        solucion: '<p>La <strong>capsaicina</strong>.</p>' },
    ],
    fuentes: [IOWA('growing-peppers-home-garden', 'Growing Peppers in the Home Garden'), OSU, IOWA('vegetable-harvest-guide', 'Vegetable Harvest Guide'), WIKI('Capsicum', 'Capsicum')],
  });

  // ------------------------------------------------------------------
  L('Cultivar lechuga y verduras de hoja', {
    objetivo: 'Cultivar lechuga, espinaca y otras verduras de hoja en la temporada fresca, cosecharlas hoja por hoja y evitar que se espiguen.',
    explicacion: `
      <p>Las verduras de hoja son de las más rápidas y fáciles del huerto: en unas semanas ya estás cortando lechuga para la ensalada. Pero con el calor tienen un problema: de pronto la planta se estira, echa un tallo largo y sus hojas se ponen amargas. Entender por qué pasa te ayuda a evitarlo.</p>
      <h3>Plantas de temporada fresca</h3>
      <p>La lechuga, la espinaca, la acelga, la arúgula y muchas otras verduras de hoja son de temporada fría, como viste en "Calendario de siembra y rotación de cultivos". Crecen mejor con días frescos y aguantan heladas ligeras. La Extensión de la Universidad Estatal de Iowa explica que se pueden sembrar dos o tres semanas antes que los cultivos de calor, y que con el calor del verano tienden a espigarse o a ponerse amargas, por eso también son buenas para sembrar a finales del verano y cosechar en otoño.</p>
      <h3>Espigarse</h3>
      <p><strong>Espigarse</strong> es cuando una planta de hoja deja de producir hojas y echa un tallo alto para florecer y dar semilla. Las hojas se vuelven amargas y duras. Lo provoca sobre todo el calor y los días largos. La guía de cosecha de Iowa recomienda, en el caso de la espinaca, cosechar toda la planta en cuanto muestre señales de espigarse.</p>
      <p>Para retrasarlo: siémbralas en la temporada fresca, dales algo de sombra en las tardes calientes, mantén la tierra húmeda y elige variedades que digan "resistente a espigarse" en el sobre.</p>
      <h3>Siembra</h3>
      <p>La lechuga se puede sembrar directo o en almácigo. La Universidad Cornell recuerda que en tierra fría tarda unas dos semanas en germinar, y en verano, de 3 a 4 días. La guía "Su propio cultivo" de la Universidad Estatal de Oregon calcula unas 5 semanas en almácigo, y para la lechuga de hoja, unos 30 cm entre filas y 15 cm entre plantas; la de cabeza necesita unos 30 cm entre plantas. La espinaca va a unos 30 cm entre filas y 8 cm entre plantas. Son semillas pequeñas, así que van casi en la superficie, como viste en "Germinar semillas paso a paso".</p>
      <h3>Cosechar hoja por hoja</h3>
      <p>Con la lechuga de hoja no hace falta arrancar la planta entera. Iowa recomienda cortar las hojas de afuera y dejar el centro, que sigue produciendo. Así, una sola siembra te da hojas durante semanas. La lechuga de hoja está lista unos 45 a 60 días después de sembrar, según la guía de cosecha de Iowa.</p>
      <h3>Siembras escalonadas</h3>
      <p>Si siembras toda la lechuga el mismo día, tendrás demasiada de golpe y luego nada. Es mejor sembrar un poco cada dos o tres semanas; así siempre hay plantas listas. La lechuga crece bien en macetas y en camas pequeñas, como viste en "Huerto en macetas y balcones".</p>
      <h3>Lávalas bien</h3>
      <p>Las verduras de hoja se comen crudas y crecen pegadas al suelo, así que la tierra y los microbios se quedan entre sus hojas. Lávalas hoja por hoja con agua limpia antes de comerlas; en la unidad Salud y primeros auxilios verás cómo manejar los alimentos con seguridad.</p>
      <p class="nota"><strong>Trampa común:</strong> sembrar lechuga en pleno verano a pleno sol. Se espiga en pocas semanas y sus hojas salen amargas.</p>`,
    ejemplo: `
      <p>Una familia come 2 lechugas por semana. Cada siembra de 8 lechugas está lista a las 7 semanas y dura unas 4 semanas cosechando. ¿Cada cuánto conviene sembrar para no quedarse sin lechuga?</p>
      <ol class="pasos-ej">
        <li>Primero calcula cuánto dura una siembra: 8 lechugas ÷ 2 por semana = 4 semanas de consumo.</li>
        <li>Para no quedarte sin lechuga, la siguiente siembra debe estar lista justo cuando se acabe la anterior.</li>
        <li>Como cada siembra dura 4 semanas de consumo, siembras una nueva cada 4 semanas.</li>
        <li>Comprueba: siembras en la semana 0 y en la semana 4; la primera está lista en la semana 7 y se acaba en la 11; la segunda está lista en la 11. No queda hueco.</li>
      </ol>
      <p>Resultado: <span class="resultado">sembrar 8 lechugas cada 4 semanas</span>.</p>
      <p class="nota"><strong>Error común:</strong> sembrar todas juntas. Se espigan antes de que alcances a comerlas.</p>`,
    vidaReal: `
      <p>Las verduras de hoja son la puerta de entrada al huerto:</p>
      <ul>
        <li>En pocas semanas tienes ensalada fresca a la mano.</li>
        <li>Una maceta de lechuga en la ventana te ahorra compras.</li>
        <li>Cortando hojas por fuera, una planta te alimenta por semanas.</li>
        <li>Sembrando poco a poco, nunca te sobra ni te falta.</li>
        <li>Sabes en qué época sembrarlas para que no se amarguen.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una fila de 1.2 m lleva una lechuga de hoja cada 15 cm, con una en cada orilla. ¿Cuántas plantas caben?</p>', respuesta: 120 / 15 + 1,
        pista: '<p>Calcula los espacios y suma 1.</p>',
        solucion: '<p>120 ÷ 15 = 8 espacios, así que caben 8 + 1 = <strong>9 plantas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Siembras lechuga cada 3 semanas desde la semana 1. ¿En qué semana haces la cuarta siembra?</p>', respuesta: 1 + 3 * 3,
        pista: '<p>Entre la primera y la cuarta siembra hay 3 intervalos.</p>',
        solucion: '<p>1 + 3 × 3 = <strong>semana 10</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué provoca sobre todo que la lechuga se espigue?</p>',
        opciones: ['El frío', 'El calor y los días largos', 'El exceso de abono'], correcta: 1,
        pista: '<p>Es una planta de temporada fresca.</p>',
        solucion: '<p><strong>El calor y los días largos.</strong> Por eso se siembra en temporada fresca.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cómo se cosecha la lechuga de hoja para que siga produciendo?</p>',
        opciones: ['Se cortan las hojas de afuera y se deja el centro', 'Se arranca toda la planta', 'Se corta solo el centro'], correcta: 0,
        pista: '<p>El centro sigue sacando hojas nuevas.</p>',
        solucion: '<p><strong>Cortando las hojas de afuera.</strong> El centro sigue creciendo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tu espinaca empieza a echar un tallo alto. Según Iowa, ¿qué haces?</p>',
        opciones: ['Riegas el doble', 'Le pones abono', 'Cosechas toda la planta'], correcta: 2,
        pista: '<p>Se está espigando.</p>',
        solucion: '<p><strong>Cosechas toda la planta</strong> antes de que sus hojas se pongan amargas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se dice cuando una lechuga deja de dar hojas y echa un tallo alto para florecer?</p>',
        respuestas: ['espigarse', 'se espiga', 'espigar', 'espigado', 'subirse', 'se sube'],
        pista: '<p>Viene de "espiga".</p>',
        solucion: '<p>Que se <strong>espiga</strong>.</p>' },
    ],
    fuentes: [IOWA('fall-planting-vegetables', 'Fall Planting of Vegetables'), IOWA('vegetable-harvest-guide', 'Vegetable Harvest Guide'), OSU, CORNELL],
  });

  // ------------------------------------------------------------------
  L('Cultivar cebolla y ajo', {
    objetivo: 'Sembrar cebolla y ajo en la época adecuada, entender por qué la duración del día importa en la cebolla, y cosecharlos y curarlos para que se guarden.',
    explicacion: `
      <p>La cebolla y el ajo están en casi todas las comidas, y los dos se guardan meses si se cosechan y se secan bien. Pertenecen a la misma familia, pero se siembran de forma distinta y en épocas distintas.</p>
      <h3>El bulbo</h3>
      <p>La parte que comemos de la cebolla y del ajo es un <strong>bulbo</strong>: un tallo muy corto rodeado de hojas gruesas que guardan alimento, como capas. La cebolla forma un solo bulbo grande. El ajo, explica la Extensión de la Universidad Estatal de Iowa, forma varios bulbos pequeños, los dientes, envueltos en una piel como papel.</p>
      <h3>Cebolla: la duración del día</h3>
      <p>Iowa explica que la cebolla empieza a formar su bulbo según cuántas horas de luz tiene el día, lo que se llama <strong>fotoperiodo</strong>. Hay variedades de día corto, que forman bulbo con días más cortos, y de día largo, que necesitan días más largos. Iowa recomienda las de día largo para lugares del norte, como su estado. Como viste en "Movimientos de la Tierra", cerca del ecuador los días cambian poco a lo largo del año y nunca son tan largos; por eso, en muchos lugares cercanos al ecuador se usan variedades de día corto. Si siembras una de día largo donde los días son cortos, puede quedarse sin formar bulbo. Revisa el sobre o pregunta qué variedades funcionan en tu zona.</p>
      <p>La cebolla se empieza en almácigo: la guía "Su propio cultivo" de la Universidad Estatal de Oregon calcula unas 10 semanas, con 30 cm entre filas y unos 8 cm entre plantas. También se siembra con cebollitas pequeñas.</p>
      <p>Hay dos formas de cosecharla, según Iowa:</p>
      <ul>
        <li>Como cebollín o cebolla de rabo, cuando todavía no forma bulbo, unos 30 a 50 días después de sembrar.</li>
        <li>Como cebolla seca, para guardar, cuando las hojas se doblan y empiezan a ponerse cafés, unos 90 a 120 días después. Se saca con todo y hojas y se cura en un lugar cálido, seco y con aire, extendida en una sola capa, antes de guardarla.</li>
      </ul>
      <h3>Ajo</h3>
      <p>El ajo se siembra con dientes, como viste en "Esquejes, tubérculos y otras formas de multiplicar plantas". Necesita pasar una temporada fresca para dividirse en dientes, por eso se siembra en otoño: Iowa indica octubre, a 2.5 a 4 cm de profundidad y de 8 a 12 cm entre dientes, en tierra fértil que drene bien. Oregon indica unos 45 cm entre filas. Una capa de paja ayuda a guardar la humedad y frenar las hierbas.</p>
      <p>Algunos ajos echan un tallo floral enroscado, que se llama escapo o vara. Iowa recomienda cortarlo cuando todavía está tierno, para que la planta use su energía en el bulbo, y además se come.</p>
      <p>El ajo se cosecha cuando sus hojas empiezan a secarse: Iowa indica el momento ideal cuando la planta tiene de 4 a 5 hojas de abajo secas y 3 a 4 de arriba todavía verdes. Se saca con cuidado con una pala o bieldo y se deja secar en un lugar ventilado.</p>
      <p class="nota"><strong>Trampa común:</strong> esperar a que todas las hojas del ajo estén secas para cosecharlo. Para entonces la piel de los dientes se abre y el ajo se guarda peor.</p>`,
    ejemplo: `
      <p>Tienes una cama de 1.2 m por 2 m para ajo. Siembras filas a lo largo, separadas 20 cm, y un diente cada 10 cm. ¿Cuántos dientes necesitas, con filas y dientes en las orillas?</p>
      <ol class="pasos-ej">
        <li>Primero calcula cuántas filas caben a lo ancho: 120 ÷ 20 = 6 espacios, así que hay 6 + 1 = 7 filas.</li>
        <li>Luego, cuántos dientes caben en cada fila de 2 m: 200 ÷ 10 = 20 espacios, es decir, 21 dientes.</li>
        <li>Multiplica: 7 × 21 = 147 dientes.</li>
        <li>Si cada cabeza tiene unos 10 dientes, necesitas unas 15 cabezas: 147 ÷ 10 ≈ 15.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 147 dientes, de unas 15 cabezas</span>. Usa las cabezas más grandes y sanas que tengas, porque los dientes grandes dan cabezas grandes.</p>
      <p class="nota"><strong>Error común:</strong> olvidar sumar 1 al contar filas o plantas cuando van en las dos orillas.</p>`,
    vidaReal: `
      <p>Cebolla y ajo propios te duran casi todo el año:</p>
      <ul>
        <li>Bien curados, se guardan meses colgados en un lugar seco.</li>
        <li>Puedes cosechar cebollín tierno mientras esperas las cebollas grandes.</li>
        <li>Unas cuantas cabezas de ajo se multiplican cada año.</li>
        <li>Eliges variedades que de verdad formen bulbo en tu región.</li>
        <li>Ahorras comprando menos cebolla y ajo, que se usan en casi todas las comidas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En una fila de 1.6 m siembras un diente de ajo cada 10 cm, con uno en cada orilla. ¿Cuántos dientes caben?</p>', respuesta: 160 / 10 + 1,
        pista: '<p>Calcula los espacios y suma 1.</p>',
        solucion: '<p>160 ÷ 10 = 16 espacios, así que caben 16 + 1 = <strong>17 dientes</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tienes 6 cabezas de ajo con unos 9 dientes cada una. ¿Cuántos dientes puedes sembrar?</p>', respuesta: 6 * 9,
        pista: '<p>Multiplica las cabezas por los dientes de cada una.</p>',
        solucion: '<p>6 × 9 = <strong>54 dientes</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Vives cerca del ecuador, donde los días son parecidos todo el año. ¿Qué variedad de cebolla conviene?</p>',
        opciones: ['De día largo', 'Cualquiera', 'De día corto'], correcta: 2,
        pista: '<p>Cerca del ecuador los días nunca son muy largos.</p>',
        solucion: '<p><strong>De día corto.</strong> Una de día largo podría no formar bulbo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuándo se cosecha la cebolla para guardar?</p>',
        opciones: ['Cuando las hojas se doblan y empiezan a ponerse cafés', 'Cuando sale la primera hoja', 'Cuando florece'], correcta: 0,
        pista: '<p>Iowa lo relaciona con las hojas.</p>',
        solucion: '<p><strong>Cuando las hojas se doblan y se ponen cafés.</strong> Después se cura.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el ajo se siembra en otoño?</p>',
        opciones: ['Porque en otoño hay más sol', 'Porque necesita una temporada fresca para dividirse en dientes', 'Porque sus semillas solo germinan en otoño'], correcta: 1,
        pista: '<p>El frío le da una señal.</p>',
        solucion: '<p><strong>Porque necesita una temporada fresca</strong> para formar sus dientes.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la parte de la cebolla que comemos, formada por capas de hojas gruesas que guardan alimento?</p>',
        respuestas: ['bulbo', 'el bulbo', 'bulbos', 'cabeza'],
        pista: '<p>Los tulipanes también crecen de uno.</p>',
        solucion: '<p>El <strong>bulbo</strong>.</p>' },
    ],
    fuentes: [IOWA('all-about-onions', 'All About Onions'), IOWA('growing-garlic-home-garden', 'Growing Garlic in the Home Garden'), OSU, WIKI('Allium_sativum', 'Allium sativum')],
  });

  // ------------------------------------------------------------------
  L('Cultivar amaranto', {
    objetivo: 'Conocer el amaranto como grano y como verdura, sembrarlo y cosechar sus semillas.',
    explicacion: `
      <p>Las alegrías, esos dulces de semillas infladas pegadas con miel, están hechas de amaranto. Es una planta de Mesoamérica que se cultiva desde hace siglos y que vuelve a ganar fama por lo nutritiva que es. Y es generosa: una sola planta da miles de semillas.</p>
      <h3>Una planta, muchos usos</h3>
      <p>La Extensión de la Universidad de Kentucky explica que el amaranto se puede cultivar como grano, como verdura de hoja, como planta de ornato o como forraje. El grano se forma en grandes panojas de colores brillantes: rojo, morado, dorado o verde. La <strong>panoja</strong> es el racimo de flores y semillas en la punta de la planta. Sus hojas tiernas, además, se comen como quelite, como viste en "La milpa".</p>
      <h3>Un falso cereal</h3>
      <p>Aunque se usa como el trigo o el maíz, el amaranto no es un pasto. Por eso Kentucky lo llama <strong>pseudocereal</strong>, que quiere decir "falso cereal": una planta de hoja ancha cuyas semillas se comen como un cereal. Su semilla se puede moler para harina, inflar como palomita o aplanar como la avena. Kentucky destaca que tiene mucha proteína y fibra, que es rica en lisina, una pieza de las proteínas que a muchos cereales les falta, y que no tiene gluten.</p>
      <p>La especie que más se cultiva para grano es <span lang="la">Amaranthus hypochondriacus</span>, de origen mexicano.</p>
      <h3>Siembra</h3>
      <p>El amaranto es de temporada cálida y necesita sol. Sus semillas son diminutas, así que se siembran casi en la superficie, como viste en "Germinar semillas paso a paso". Kentucky advierte que las plantitas recién nacidas son pequeñas y frágiles y necesitan humedad para germinar y crecer al principio, y que si la tierra forma una costra dura, a muchas les cuesta salir. Por eso conviene regar con rocío fino y no dejar que la superficie se endurezca.</p>
      <p>Una buena noticia: según Kentucky, una vez establecido, el amaranto aguanta bien la sequía. En sus pruebas, el cultivo funcionó mejor con filas separadas unos 75 cm; así las plantas dan sombra al suelo y se puede deshierbar entre las filas. Las plantas crecen altas, así que siémbralas donde no le den sombra a otros cultivos. En un huerto, puedes aclararlas para que queden a unos 30 a 45 cm entre sí y cosechar las que quitas como verdura.</p>
      <h3>Cosecha</h3>
      <p>En los cultivos grandes de Kentucky se cosecha con máquina después de la primera helada, que ayuda a secar la planta. En un huerto se hace a mano: cuando las semillas empiezan a caer al sacudir la panoja, córtala, cuélgala o ponla sobre una manta o una bolsa de papel en un lugar seco y ventilado, y sacúdela o frótala para que suelte las semillas. Después se limpian aventando, igual que el trigo, como viste en "Cultivar trigo". Guarda las semillas bien secas, en un frasco cerrado.</p>
      <p class="nota"><strong>Trampa común:</strong> esperar demasiado para cosechar. Las semillas maduras se caen con el viento y los pájaros se las comen.</p>`,
    ejemplo: `
      <p>Kentucky menciona panojas que pueden pesar hasta 1 kilo y tener medio millón de semillas. Si una panoja de 1 kg tiene unas 500 000 semillas, ¿cuántas semillas hay, más o menos, por cada gramo de panoja?</p>
      <ol class="pasos-ej">
        <li>Primero pasa el kilo a gramos: 1 kg son 1 000 gramos.</li>
        <li>Divide las semillas entre los gramos: 500 000 ÷ 1 000 = 500 semillas por gramo.</li>
        <li>Ten en cuenta que la panoja pesa también por sus tallos y flores, así que es una cuenta aproximada.</li>
        <li>Comprueba al revés: 500 semillas por gramo × 1 000 gramos = 500 000 semillas.</li>
      </ol>
      <p>Resultado: <span class="resultado">unas 500 semillas por gramo de panoja</span>; por eso un sobre pequeño alcanza para mucho.</p>
      <p class="nota"><strong>Error común:</strong> sembrar las semillas muy tupidas por ser tan pequeñas. Después tendrás que aclarar mucho.</p>`,
    vidaReal: `
      <p>El amaranto es una planta muy completa para un huerto:</p>
      <ul>
        <li>Te da grano y verdura de la misma planta.</li>
        <li>Puedes hacer tus propias alegrías o agregar el grano a tus comidas.</li>
        <li>Aguanta la sequía una vez que crece.</li>
        <li>Sus panojas de colores alegran el huerto y atraen a los insectos benéficos.</li>
        <li>Conservas una planta mesoamericana que alimentó a los pueblos antiguos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una panoja tiene unas 500 000 semillas. Si siembras 1 000 semillas, ¿qué fracción de la panoja usaste? Escribe la respuesta como número decimal.</p>', respuesta: 1000 / 500000,
        pista: '<p>Divide las semillas que siembras entre las de la panoja.</p>',
        solucion: '<p>1 000 ÷ 500 000 = <strong>0.002</strong>, es decir, dos milésimas de la panoja.</p>' },
      { tipo: 'numero', enunciado: '<p>Una fila de 3 m lleva una planta de amaranto cada 37.5 cm, con una en cada orilla. ¿Cuántas plantas caben?</p>', respuesta: 300 / 37.5 + 1,
        pista: '<p>Calcula los espacios y suma 1.</p>',
        solucion: '<p>300 ÷ 37.5 = 8 espacios, así que caben 8 + 1 = <strong>9 plantas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué se dice que el amaranto es un pseudocereal?</p>',
        opciones: ['Porque es un pasto como el trigo', 'Porque no se puede comer', 'Porque no es un pasto, pero sus semillas se comen como un cereal'], correcta: 2,
        pista: '<p>"Pseudo" quiere decir "falso".</p>',
        solucion: '<p><strong>Porque no es un pasto</strong>, aunque sus semillas se usan como cereal.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué le pasa a las plantitas de amaranto si la tierra forma una costra dura?</p>',
        opciones: ['A muchas les cuesta salir', 'Crecen más rápido', 'Nada, son muy fuertes'], correcta: 0,
        pista: '<p>Kentucky dice que son pequeñas y frágiles.</p>',
        solucion: '<p><strong>A muchas les cuesta salir.</strong> Riega con rocío fino para evitar la costra.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué parte del amaranto, además del grano, se come?</p>',
        opciones: ['La raíz', 'Las hojas tiernas, como quelite', 'El tallo seco'], correcta: 1,
        pista: '<p>Recuerda los quelites de la milpa.</p>',
        solucion: '<p><strong>Las hojas tiernas</strong>, que se comen como quelite.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el racimo de flores y semillas en la punta de la planta de amaranto?</p>',
        respuestas: ['panoja', 'la panoja', 'panojas', 'panicula', 'espiga'],
        pista: '<p>Empieza con "pan".</p>',
        solucion: '<p>La <strong>panoja</strong>.</p>' },
    ],
    fuentes: [UKY, WIKI('Amaranthus_hypochondriacus', 'Amaranthus hypochondriacus')],
  });

  // ------------------------------------------------------------------
  L('Cultivar hierbas aromáticas y medicinales', {
    objetivo: 'Cultivar hierbas de cocina y de té en macetas o en el huerto, cosecharlas en su mejor momento y saber qué no hacer con las plantas medicinales.',
    explicacion: `
      <p>Un poco de cilantro en la salsa, una rama de hierbabuena en el agua, un té de manzanilla antes de dormir. Las hierbas aromáticas dan mucho sabor con muy poco espacio, y casi todas crecen bien en una maceta junto a la ventana. Son, además, de las plantas más fáciles para empezar.</p>
      <h3>Cuáles son fáciles</h3>
      <p>La Universidad de Florida menciona entre las más fáciles el romero, la albahaca, el orégano, la hierbabuena y el tomillo. La Extensión de la Universidad Estatal de Iowa agrupa algunas según su uso:</p>
      <ul>
        <li>Para cocinar: perejil, albahaca, orégano, salvia, romero y tomillo.</li>
        <li>Aromáticas: lavanda, manzanilla y cedrón, entre otras.</li>
        <li>Para tés y bebidas: manzanilla, hierbabuena y menta.</li>
      </ul>
      <h3>Anuales y perennes</h3>
      <p>Algunas hierbas viven solo una temporada: se siembran, crecen, dan semilla y mueren. Se llaman <strong>anuales</strong>, como la albahaca o el cilantro, que hay que volver a sembrar. Otras viven varios años: son <strong>perennes</strong>, como el romero, el orégano, el tomillo o la hierbabuena. Florida comenta que, una vez establecida, una planta de romero da hojas por años.</p>
      <h3>Cómo cultivarlas</h3>
      <p>Según Florida, la mayoría de las hierbas crece bien con el mismo sol y la misma tierra que las hortalizas, aunque algunas son más sensibles a la humedad del suelo. Muchas de clima seco, como el romero, el tomillo y el orégano, prefieren que la tierra se seque un poco entre riegos y se pudren si se encharcan. Iowa recomienda macetas con suficientes agujeros de drenaje y un sustrato que drene bien, como viste en "Huerto en macetas y balcones". Las hierbas necesitan poco abono: un poco de composta o un abono diluido de vez en cuando.</p>
      <p>Cuidado con la hierbabuena y la menta: Florida advierte que se extienden muy rápido y pueden invadir todo, por eso conviene tenerlas en maceta. Como viste en "Esquejes", muchas hierbas se multiplican con esquejes, así que una sola planta puede darte varias.</p>
      <h3>Cosechar en su mejor momento</h3>
      <p>Iowa explica que las hierbas anuales de hoja tienen su mejor sabor cuando empiezan a aparecer los botones de las flores, porque en ese momento tienen más aceites aromáticos. Se cortan las puntas con tijeras o un cuchillo filoso, justo arriba de un par de hojas; así la planta se ramifica y da más. Cortar las puntas con frecuencia, que se llama despuntar, evita que la planta se alargue y se ponga flaca.</p>
      <h3>Sobre las plantas medicinales</h3>
      <p>Muchas hierbas se usan en remedios caseros, como la manzanilla o la hierbabuena. Cultivarlas es fácil, pero saber si de verdad sirven para algo, y cuánto se puede tomar con seguridad, es otro tema. Algunas plantas pueden hacer daño en exceso, durante el embarazo o mezcladas con medicinas. En la unidad Salud y primeros auxilios verás qué dice la evidencia de cada una. Mientras tanto, usa estas plantas para cocinar y para tés suaves, no para tratar una enfermedad; ante cualquier malestar que no mejora, consulta a un profesional de la salud.</p>
      <p class="nota"><strong>Trampa común:</strong> regar el romero o el tomillo todos los días como si fueran lechugas. Se pudren sus raíces; prefieren tierra que se seca entre riegos.</p>`,
    ejemplo: `
      <p>Tienes una maceta de albahaca con 6 tallos. Cortas la punta de cada tallo y de cada corte salen 2 tallos nuevos. ¿Cuántos tallos tendrá la planta después de un corte?</p>
      <ol class="pasos-ej">
        <li>Primero piensa en qué pasa al cortar una punta: en lugar de ese tallo crecen 2.</li>
        <li>Si cortas los 6 tallos, cada uno se convierte en 2: 6 × 2 = 12 tallos.</li>
        <li>Además cosechaste 6 puntas para tu comida.</li>
        <li>Comprueba la idea: por eso Iowa recomienda cortar justo arriba de un par de hojas; de las yemas junto a ellas salen los tallos nuevos.</li>
      </ol>
      <p>Resultado: <span class="resultado">12 tallos después de un corte</span>, y una planta más tupida.</p>
      <p class="nota"><strong>Error común:</strong> cortar la planta casi hasta la base. Sin hojas, le cuesta mucho volver a crecer.</p>`,
    vidaReal: `
      <p>Unas cuantas macetas de hierbas cambian tu cocina:</p>
      <ul>
        <li>Tienes cilantro, albahaca y hierbabuena frescos sin comprarlos.</li>
        <li>Puedes preparar tés con plantas de tu ventana.</li>
        <li>Una planta te da esquejes para regalar.</li>
        <li>Sabes cuándo cortarlas para que tengan más sabor.</li>
        <li>Usas las plantas medicinales con prudencia, sabiendo que no sustituyen la atención médica.</li>
        <li>Unas pocas macetas en la ventana bastan para empezar a cultivar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una maceta de orégano tiene 5 tallos. Despuntas todos y de cada corte salen 2 tallos nuevos. ¿Cuántos tallos tendrá?</p>', respuesta: 5 * 2,
        pista: '<p>Cada tallo cortado se convierte en 2.</p>',
        solucion: '<p>5 × 2 = <strong>10 tallos</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una jardinera de 60 cm de largo lleva una hierba cada 20 cm, con una en cada orilla. ¿Cuántas plantas caben?</p>', respuesta: 60 / 20 + 1,
        pista: '<p>Calcula los espacios y suma 1.</p>',
        solucion: '<p>60 ÷ 20 = 3 espacios, así que caben 3 + 1 = <strong>4 plantas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué conviene sembrar la hierbabuena en maceta?</p>',
        opciones: ['Porque necesita mucha sombra', 'Porque se extiende muy rápido y puede invadir todo', 'Porque no aguanta el sol'], correcta: 1,
        pista: '<p>Florida advierte que se extiende muy rápido.</p>',
        solucion: '<p><strong>Porque se extiende muy rápido.</strong> En maceta la mantienes controlada.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Iowa, ¿cuándo tienen más sabor las hierbas anuales de hoja?</p>',
        opciones: ['Cuando empiezan a aparecer los botones de las flores', 'Cuando ya dieron semilla', 'Cuando apenas brotan'], correcta: 0,
        pista: '<p>Es cuando tienen más aceites aromáticos.</p>',
        solucion: '<p><strong>Cuando aparecen los botones de las flores.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Te duele el estómago desde hace varios días. ¿Qué es lo más prudente?</p>',
        opciones: ['Tomar mucho té de una planta del huerto', 'Mezclar varias hierbas en un solo té', 'Consultar a un profesional de la salud'], correcta: 2,
        pista: '<p>Las hierbas de esta lección son para cocinar y tés suaves.</p>',
        solucion: '<p><strong>Consultar a un profesional de la salud.</strong> Un malestar que no mejora necesita atención.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llaman las plantas que viven varios años, como el romero?</p>',
        respuestas: ['perennes', 'perenne', 'plantas perennes', 'las perennes'],
        pista: '<p>Lo contrario de "anuales".</p>',
        solucion: '<p>Las <strong>perennes</strong>.</p>' },
    ],
    fuentes: [UFHIERBAS, IOWA('growing-herbs-containers', 'Growing Herbs in Containers'), WIKI('Planta_arom%C3%A1tica', 'Hierba aromática')],
  });

  // ------------------------------------------------------------------
  L('Cosechar en el momento justo', {
    objetivo: 'Reconocer cuándo está lista cada hortaliza, cosechar seguido para que sigan produciendo y saber qué cosechar antes de una helada.',
    explicacion: `
      <p>Un ejote cortado a tiempo es tierno y dulce; el mismo ejote dos semanas después es duro y fibroso. Una calabacita que se olvida en la mata se vuelve enorme y sin sabor. Muchas veces, la diferencia entre una buena y una mala cosecha no está en cómo sembraste, sino en cuándo cortaste.</p>
      <h3>Dos tipos de madurez</h3>
      <p>Una hortaliza puede estar madura de dos formas. La <strong>madurez de consumo</strong> es cuando está en su mejor punto para comerla: el ejote tierno, la calabacita pequeña, el elote lechoso. La <strong>madurez de semilla</strong> es cuando la planta terminó de formar semillas capaces de germinar, que muchas veces es mucho después: el ejote seco, la calabaza dura. Para comer, casi siempre conviene la primera; para guardar semilla, la segunda, como verás en la unidad Guardar tus propias semillas.</p>
      <h3>Señales de cosecha</h3>
      <p>La guía de cosecha de la Extensión de la Universidad Estatal de Iowa da señales para cada hortaliza. Algunas de las que ya viste en esta unidad:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Hortaliza</th><th>Señal de que está lista</th></tr>
        <tr><th>Ejote</th><td>Vainas del grueso de un lápiz.</td></tr>
        <tr><th>Calabacita</th><td>Unos 5 cm de grueso; se cosecha cada 2 o 3 días.</td></tr>
        <tr><th>Elote</th><td>El grano suelta un jugo lechoso al apretarlo.</td></tr>
        <tr><th>Jitomate</th><td>Bien maduro, para mejor sabor.</td></tr>
        <tr><th>Lechuga de hoja</th><td>Se cortan las hojas de afuera; el calor la amarga.</td></tr>
        <tr><th>Cebolla y ajo</th><td>Las hojas se doblan y empiezan a secarse.</td></tr>
        <tr><th>Papa</th><td>Las matas se ponen cafés y se secan.</td></tr>
        <tr><th>Zanahoria</th><td>El "hombro" naranja asoma por la tierra.</td></tr>
        <tr><th>Rábano</th><td>Menos de 5 cm; más grande se vuelve fofo.</td></tr>
        <tr><th>Brócoli</th><td>Antes de que se abran los botones amarillos.</td></tr>
      </table></div>
      <h3>Cosechar seguido</h3>
      <p>Iowa explica que muchas hortalizas deben cosecharse a lo largo del verano para que la planta siga produciendo. La razón: una planta da frutos para formar semillas. Si dejas que sus frutos maduren por completo, "cumple su tarea" y deja de producir; si los cortas tiernos, sigue intentando y florece más. Por eso unas se cosechan casi a diario, como la calabacita; otras cada semana, como el jitomate; y otras, como muchas raíces, pueden esperar varias semanas en la tierra sin perder sabor.</p>
      <h3>Antes de la helada</h3>
      <p>Iowa recuerda que las hortalizas de temporada cálida, como el jitomate, el chile, la calabaza y el pepino, mueren con la primera helada, así que hay que cosecharlas antes. Las de temporada fría, en cambio, aguantan el frío y algunas, como la zanahoria o el nabo, hasta mejoran su sabor después de unas noches frías.</p>
      <h3>Cómo cosechar</h3>
      <ul>
        <li>Cosecha en la mañana, cuando las plantas están frescas y llenas de agua; las hojas se marchitan menos.</li>
        <li>Usa tijeras o cuchillo para frutos con tallo firme, como el chile o la calabaza, en lugar de jalarlos y romper la planta.</li>
        <li>Maneja con cuidado: un golpe o una herida hace que la hortaliza se eche a perder antes.</li>
        <li>Algunas, como la papa, la cebolla, el ajo y la calabaza de guarda, se curan antes de guardarse, como viste en sus lecciones.</li>
      </ul>
      <p>Cómo guardar y conservar lo que cosechas lo verás en la unidad Alimentos.</p>
      <p class="nota"><strong>Trampa común:</strong> esperar a que los frutos estén "más grandes". En el ejote, la calabacita o el rábano, más grande quiere decir más duro y con menos sabor.</p>`,
    ejemplo: `
      <p>Tus calabacitas deben cosecharse cada 3 días. Si empiezas el 1 de julio, ¿cuántas veces cosechas en julio, que tiene 31 días?</p>
      <ol class="pasos-ej">
        <li>Primero anota los días de cosecha: 1, 4, 7, 10 y así, sumando 3 cada vez.</li>
        <li>Para saber cuántos caben, calcula cuántos intervalos de 3 días hay del día 1 al 31: (31 − 1) ÷ 3 = 10 intervalos.</li>
        <li>Si hay 10 intervalos, hay 10 + 1 = 11 días de cosecha, porque cuentas también el primero.</li>
        <li>Comprueba: el día 1 + 10 × 3 = 31, así que el último día de cosecha es el 31 de julio.</li>
      </ol>
      <p>Resultado: <span class="resultado">11 cosechas en julio</span>. Si en cada una cortas 2 calabacitas, en el mes juntas 22.</p>
      <p class="nota"><strong>Error común:</strong> dividir 31 ÷ 3 ≈ 10 y olvidar contar el primer día.</p>`,
    vidaReal: `
      <p>Cosechar a tiempo se nota en tu plato y en tu huerto:</p>
      <ul>
        <li>Comes verduras más tiernas y sabrosas.</li>
        <li>Tus plantas siguen produciendo durante más semanas.</li>
        <li>No pierdes tu cosecha por una helada.</li>
        <li>Tus hortalizas duran más porque las cortaste con cuidado.</li>
        <li>Aprovechas cada planta en su mejor momento, sin desperdiciar comida.</li>
        <li>Sabes qué verduras pueden esperar en la tierra y cuáles no.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Cosechas ejotes cada 2 días, empezando el día 1 de un mes de 30 días. ¿Cuántas veces cosechas en el mes?</p>', respuesta: Math.floor((30 - 1) / 2) + 1,
        pista: '<p>Calcula los intervalos de 2 días que caben y suma el primer día.</p>',
        solucion: '<p>Los días son 1, 3, 5... hasta el 29. Son (29 − 1) ÷ 2 + 1 = <strong>15 cosechas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un rábano está listo a los 30 días. Si lo sembraste el 5 de marzo, ¿qué día de abril lo cosechas? Marzo tiene 31 días.</p>', respuesta: 5 + 30 - 31,
        pista: '<p>Suma 30 días al 5 de marzo y resta los días de marzo.</p>',
        solucion: '<p>5 + 30 = 35; 35 − 31 = <strong>4</strong>, el 4 de abril.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué cortar los frutos tiernos hace que la planta produzca más?</p>',
        opciones: ['Porque la planta sigue intentando formar semillas y florece más', 'Porque recibe más sol', 'Porque así se riega mejor'], correcta: 0,
        pista: '<p>Una planta da frutos para formar semillas.</p>',
        solucion: '<p><strong>Porque sigue intentando formar semillas</strong> y por eso florece más.</p>' },
      { tipo: 'opciones', enunciado: '<p>Se acerca la primera helada. ¿Qué cosechas primero?</p>',
        opciones: ['Las zanahorias', 'Los jitomates y los chiles', 'Las espinacas'], correcta: 1,
        pista: '<p>Las de temporada cálida mueren con la helada.</p>',
        solucion: '<p><strong>Los jitomates y los chiles</strong>, que son de temporada cálida.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la guía de Iowa, ¿cuándo se corta el brócoli?</p>',
        opciones: ['Cuando ya tiene flores amarillas', 'Cuando la planta se seca', 'Antes de que se abran los botones amarillos'], correcta: 2,
        pista: '<p>Si florece, se pone duro y amargo.</p>',
        solucion: '<p><strong>Antes de que se abran los botones.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el punto en que una hortaliza está mejor para comerla, como el ejote tierno?</p>',
        respuestas: ['madurez de consumo', 'la madurez de consumo', 'madurez comercial', 'madurez hortícola'],
        pista: '<p>Son tres palabras: madurez, "de" y lo que haces al comer.</p>',
        solucion: '<p>La <strong>madurez de consumo</strong>.</p>' },
    ],
    fuentes: [IOWA('vegetable-harvest-guide', 'Vegetable Harvest Guide'), IOWA('late-season-harvest-vegetable-garden', 'Late Season Harvest in the Vegetable Garden'), IOWA('harvesting-and-storing-vine-crops', 'Harvesting and Storing Vine Crops')],
  });
})();
