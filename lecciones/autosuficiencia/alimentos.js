// Autosuficiencia · Unidad 7: Alimentos.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Seguridad: germinados (Oregon, FDA), salmonela de aves (Wisconsin), cal (MedlinePlus), botulismo y envasado (Penn State, NCHFP, MedlinePlus).
// No se dan recetas de envasado de alimentos de baja acidez: solo principios y remisión a recetas probadas.
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
  const caja = (x0, y0, x1, y1, relleno = false) => ({ tipo: 'poligono', puntos: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], relleno });

  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const MEDLINE = (ruta, nombre) => ({ nombre: `MedlinePlus en español: ${nombre}`, url: `https://medlineplus.gov/spanish/${ruta}` });
  const PSU = (ruta, nombre) => ({ nombre: `Extensión de la Universidad Estatal de Pensilvania: Vamos a conservar alimentos, ${nombre}`, url: `https://extension.psu.edu/vamos-a-conservar-alimentos-${ruta}` });
  const NCHFP = (archivo, nombre) => ({ nombre: `Centro Nacional para la Conservación de Alimentos en Casa (NCHFP, Universidad de Georgia): ${nombre} (PDF)`, url: `https://nchfp.uga.edu/papers/${archivo}` });
  const OMS = { nombre: 'Organización Mundial de la Salud: Alimentación sana', url: 'https://www.who.int/es/news-room/fact-sheets/detail/healthy-diet' };
  const OHA = { nombre: 'Autoridad de Salud de Oregon: Germinado de semillas o frijoles, hoja de datos 14 (PDF)', url: 'https://www.oregon.gov/oha/PH/HEALTHYENVIRONMENTS/FOODSAFETY/Documents/translations/FactSheet14Sprouts_Spanish.pdf' };
  const FDA = { nombre: 'Administración de Alimentos y Medicamentos de EE. UU. (FDA): Selecting and Serving Produce Safely (en inglés)', url: 'https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-produce-safely' };
  const WISC = { nombre: 'Departamento de Servicios de Salud de Wisconsin: Salmonella and Backyard Poultry (en inglés, PDF)', url: 'https://dhs.wisconsin.gov/publications/p01788.pdf' };
  const ALAN = { nombre: 'Bressani y colaboradores, Archivos Latinoamericanos de Nutrición (1997): Efecto de la nixtamalización del maíz (PDF)', url: 'https://www.alanrevista.org/download/article/4508' };
  const PICS = { nombre: 'Universidad Purdue: PICS Network, bolsas herméticas para granos (en inglés)', url: 'https://ag.purdue.edu/department/entm/extension/pics-network/' };
  const WSU = { nombre: 'Extensión de la Universidad Estatal de Washington: Cleaning Out the Kitchen Cupboard (en inglés)', url: 'https://extension.wsu.edu/foodsafety/2016/04/29/cleaning-out-the-kitchen-cupboard/' };
  const NMSU = { nombre: 'Universidad Estatal de Nuevo México: Breadmaking, guía E-206 (en inglés)', url: 'https://pubs.nmsu.edu/_e/E206/index.html' };
  const IOWA = (ruta, nombre) => ({ nombre: `Extensión de la Universidad Estatal de Iowa: ${nombre} (en inglés)`, url: `https://yardandgarden.extension.iastate.edu/${ruta}` });
  const VIKAS = { nombre: 'Vikaspedia, portal del Gobierno de la India: Hay Box (en inglés)', url: 'https://en.vikaspedia.in/viewcontent/energy/energy-efficiency/low-cost-energy-efficient-technologies/hay-box?lgn=en' };
  const APROV = { nombre: 'Centro de Investigación Aprovecho: Retained Heat Cooking (en inglés)', url: 'https://aprovecho.org/biomass-alternatives/retained-heat-cooking/' };
  const ONU = { nombre: 'Naciones Unidas: Día Internacional de Concienciación sobre la Pérdida y el Desperdicio de Alimentos', url: 'https://www.un.org/es/observances/end-food-waste-day' };

  // ------------------------------------------------------------------
  L('Comer bien con lo que cultivas', {
    objetivo: 'Planear qué sembrar según lo que tu familia necesita comer, buscando variedad, y saber qué parte de la dieta es difícil de cubrir solo con el huerto.',
    explicacion: `
      <p>Un huerto lleno de lechugas se ve precioso, pero una familia no puede vivir de lechugas. Para que lo que cultivas de verdad alimente, conviene planear el huerto pensando en el plato, no solo en lo que es fácil sembrar.</p>
      <h3>Lo que ya sabes del plato</h3>
      <p>En Ciencias naturales, en "Nutrición y alimentación equilibrada", viste el plato que recomiendan muchas guías: la mitad de verduras y frutas, un cuarto de cereales y un cuarto de proteínas, y agua para beber. También viste las metas de la Organización Mundial de la Salud, como comer al menos 400 gramos de frutas y verduras al día. Aquí no se repiten: se usan para planear el huerto.</p>
      <h3>Del plato al huerto</h3>
      <p>Piensa en cada parte del plato y en qué la puede llenar desde tu tierra:</p>
      <ul>
        <li>Verduras y frutas: hortalizas de hoja, jitomate, chile, calabacita, zanahoria y, a la larga, árboles frutales, como verás en "Árboles frutales y plantas perennes".</li>
        <li>Cereales: maíz, trigo, arroz o amaranto, que viste en "Cultivos básicos". Ocupan más espacio, pero se guardan meses.</li>
        <li>Proteínas: frijol, haba, chícharo, cacahuate y, si tienes espacio, huevos de gallina. En la siguiente lección verás cómo combinar cereales y leguminosas.</li>
      </ul>
      <h3>Variedad de colores</h3>
      <p>La <strong>diversidad de la dieta</strong> es comer muchos alimentos distintos a lo largo de la semana. La OMS insiste en ella porque ningún alimento lo tiene todo, como viste en Ciencias naturales. Una forma práctica de lograrla en el huerto es sembrar colores distintos: verde de las hojas, rojo del jitomate y el chile, naranja de la calabaza y la zanahoria, morado del frijol o el betabel. Cada color suele venir con vitaminas y otras sustancias diferentes.</p>
      <h3>Comer de temporada</h3>
      <p>La <strong>temporada</strong> de un alimento es la época del año en que se cosecha en tu región. El huerto no da lo mismo todo el año: hay meses de muchos jitomates y meses de puras hojas. Por eso conviene comer lo que hay en cada temporada y guardar los excedentes. En esta unidad verás cómo: secar, fermentar, encurtir, envasar con seguridad y guardar granos.</p>
      <h3>Lo que el huerto difícilmente da</h3>
      <p>Ser realista también es parte de comer bien. Algunas cosas son difíciles de producir en casa en cantidad suficiente, como el aceite, el azúcar o la sal, y algunos nutrientes vienen sobre todo de alimentos de origen animal. Si tu familia come poca carne, huevo o leche, conviene consultar con un profesional de la salud o de la nutrición para asegurarse de no tener carencias. La autosuficiencia, como viste en la primera unidad, no es producirlo todo; es producir lo que puedas y planear bien lo demás.</p>
      <h3>Planear con números</h3>
      <p>Para saber cuánto sembrar, empieza por lo que comes: cuántos kilos de frijol, de maíz o de jitomate usa tu casa en un año. Luego busca cuánto rinde cada cultivo, como viste en "Cultivar papa" con los kilos por surco. Con esos dos números calculas cuántos metros sembrar. Empieza por uno o dos alimentos que tu familia coma mucho, y crece desde ahí.</p>
      <p class="nota"><strong>Trampa común:</strong> sembrar lo que es fácil o bonito sin pensar en lo que tu familia come. Terminas regalando calabacitas y comprando frijol.</p>`,
    ejemplo: `
      <p>Tu familia de 4 personas quiere cubrir con el huerto la meta de la OMS de 400 gramos de frutas y verduras por persona al día. ¿Cuántos kilos necesitan a la semana?</p>
      <ol class="pasos-ej">
        <li>Primero calcula lo que necesita la familia en un día: 400 g × 4 personas = 1 600 g.</li>
        <li>Luego multiplica por los 7 días de la semana: 1 600 × 7 = 11 200 g.</li>
        <li>Pasa a kilos: 11 200 g son 11.2 kg.</li>
        <li>Comprueba de otra forma: una persona necesita 400 × 7 = 2 800 g a la semana, y 2 800 × 4 = 11 200 g.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 11 kg de frutas y verduras por semana</span>. Si tu huerto da 3 kg a la semana, ya cubres más de la cuarta parte.</p>
      <p class="nota"><strong>Error común:</strong> olvidar multiplicar por el número de personas.</p>`,
    vidaReal: `
      <p>Planear el huerto pensando en tu plato te ayuda en tu día a día:</p>
      <ul>
        <li>Siembras lo que tu familia de verdad come, sin desperdiciar espacio.</li>
        <li>Tu mesa tiene más colores y más variedad.</li>
        <li>Sabes cuánto sembrar para cubrir una parte de lo que compras.</li>
        <li>Aprovechas cada temporada y guardas lo que sobra para después.</li><li>Empiezas por uno o dos alimentos que tu familia come mucho, y vas creciendo con calma cada temporada.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una familia de 3 personas quiere 400 g de frutas y verduras por persona al día. ¿Cuántos gramos necesitan en un día?</p>', respuesta: 400 * 3,
        pista: '<p>Multiplica lo de una persona por el número de personas.</p>',
        solucion: '<p>400 × 3 = <strong>1 200 gramos</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu familia usa 60 kg de frijol al año y tu milpa rinde unos 15 kg. ¿Qué porcentaje del frijol cubres?</p>', respuesta: 15 / 60 * 100,
        pista: '<p>Divide lo que produces entre lo que usas y multiplica por 100.</p>',
        solucion: '<p>15 ÷ 60 = 0.25, es decir, <strong>25%</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué conviene sembrar hortalizas de colores distintos?</p>',
        opciones: ['Porque así el huerto se ve más bonito', 'Porque cada color suele traer vitaminas y sustancias diferentes', 'Porque crecen más rápido'], correcta: 1,
        pista: '<p>Recuerda la diversidad de la dieta.</p>',
        solucion: '<p><strong>Porque cada color trae nutrientes distintos</strong>, y así la dieta es más variada.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué parte del plato cubren el frijol y la haba?</p>',
        opciones: ['Las proteínas', 'Las verduras', 'El agua'], correcta: 0,
        pista: '<p>Son leguminosas.</p>',
        solucion: '<p><strong>Las proteínas</strong>, junto con el huevo y otros alimentos.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tu familia casi no come carne, huevo ni leche. ¿Qué es lo más prudente?</p>',
        opciones: ['No preocuparse, el huerto lo da todo', 'Comer solo lechuga', 'Consultar con un profesional de la salud o de la nutrición'], correcta: 2,
        pista: '<p>Algunos nutrientes vienen sobre todo de alimentos de origen animal.</p>',
        solucion: '<p><strong>Consultar con un profesional</strong> para evitar carencias.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la época del año en que un alimento se cosecha en tu región?</p>',
        respuestas: ['temporada', 'la temporada', 'estacion', 'epoca de cosecha'],
        pista: '<p>Se dice que la fruta está "de ..."</p>',
        solucion: '<p>Su <strong>temporada</strong>.</p>' },
    ],
    fuentes: [OMS, MEDLINE('foodsafety.html', 'Seguridad con los alimentos'), WIKI('Dieta_equilibrada', 'Dieta equilibrada')],
  });

  // ------------------------------------------------------------------
  L('Proteínas sin carne: combinar cereales y leguminosas', {
    objetivo: 'Entender qué son los aminoácidos y las proteínas completas, y cómo combinar cereales y leguminosas a lo largo del día para obtener proteína sin carne.',
    explicacion: `
      <p>Durante miles de años, en Mesoamérica la base de la comida fue la tortilla con frijoles. No es casualidad: juntos dan mucho más de lo que dan por separado. Para entender por qué, hay que mirar de qué están hechas las proteínas.</p>
      <h3>Piezas para construir</h3>
      <p>En Química, en "La química de los alimentos", viste que las proteínas son uno de los tres grandes nutrientes. MedlinePlus explica que sirven para construir y reparar el cuerpo: los músculos, los huesos y la piel. Cada proteína es como un collar hecho de cuentas más pequeñas llamadas <strong>aminoácidos</strong>. El cuerpo deshace las proteínas de la comida en sus aminoácidos y con ellos arma las proteínas que necesita.</p>
      <p>Algunos aminoácidos el cuerpo los puede fabricar; otros no, y tienen que venir de la comida. Si falta uno de esos, el cuerpo no puede terminar de armar sus proteínas, como un collar al que le falta un tipo de cuenta.</p>
      <h3>Completas e incompletas</h3>
      <p>MedlinePlus explica que las proteínas de la carne y de otros alimentos de origen animal son <strong>proteínas completas</strong>: traen todos los aminoácidos que el cuerpo no puede fabricar. En cambio, la mayoría de las proteínas de las plantas son incompletas: a cada una le falta o le queda corto alguno.</p>
      <p>La buena noticia es que no a todas les falta lo mismo. A los cereales, como el maíz, el trigo o el arroz, el aminoácido que más les queda corto es uno llamado lisina. Un informe de expertos de la FAO y la OMS, citado en Wikipedia, explica que ese faltante se resuelve agregando cantidades modestas de otras proteínas, como las de las leguminosas: el frijol, la lenteja o el garbanzo. Por eso, al juntarlos, se completan: lo que le falta al cereal lo pone la leguminosa.</p>
      <h3>A lo largo del día</h3>
      <p>MedlinePlus aclara que hay que combinar distintos tipos de proteínas de plantas cada día para obtener todos los aminoácidos que el cuerpo necesita. No hace falta que vayan en el mismo bocado, pero sí en la comida de ese día.</p>
      <p>Algunas combinaciones de toda la vida:</p>
      <ul>
        <li>Tortilla de maíz con frijoles.</li>
        <li>Arroz con frijoles o con lentejas.</li>
        <li>Pan o tortilla de trigo con garbanzos o con cacahuate.</li>
        <li>Sopa de pasta con habas.</li>
      </ul>
      <p>El amaranto, que viste en "Cultivar amaranto", es especial: tiene mucha lisina, así que complementa bien a los cereales.</p>
      <h3>Del huerto al plato</h3>
      <p>Esta idea es la base de la milpa que viste en la unidad Cultivos básicos: el maíz y el frijol crecen juntos y se comen juntos. Si quieres producir proteína en casa, las leguminosas son de lo más eficiente: crecen rápido, se guardan secas por mucho tiempo y además dejan nitrógeno en el suelo.</p>
      <p>Si tu familia no come productos de origen animal, conviene además consultar con un profesional de la salud, porque algunos nutrientes, aparte de las proteínas, vienen sobre todo de ellos.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que hay que combinar cereales y leguminosas en el mismo plato o no sirve. Basta con comer de ambos a lo largo del día.</p>`,
    ejemplo: `
      <p>Una persona come en un día 3 tortillas, que aportan unos 2 g de proteína cada una, y una taza de frijoles, que aporta unos 15 g. ¿Cuánta proteína suma, y qué parte viene del frijol?</p>
      <ol class="pasos-ej">
        <li>Primero calcula la proteína de las tortillas: 3 × 2 = 6 g.</li>
        <li>Suma la del frijol: 6 + 15 = 21 g en total.</li>
        <li>Para saber qué parte viene del frijol, divide: 15 ÷ 21 ≈ 0.71, es decir, unas 7 de cada 10 partes.</li>
        <li>Comprueba: 6 ÷ 21 ≈ 0.29 viene de la tortilla, y 0.71 + 0.29 = 1, el total.</li>
      </ol>
      <p>Resultado: <span class="resultado">21 g de proteína, unos 71% del frijol</span>. Estas cantidades son un ejemplo para practicar; cada tortilla y cada taza varían.</p>
      <p class="nota"><strong>Error común:</strong> pensar que la tortilla no aporta nada. También tiene proteína, y además completa a la del frijol.</p>`,
    vidaReal: `
      <p>Saber combinar proteínas de plantas te da opciones baratas y nutritivas:</p>
      <ul>
        <li>Puedes comer bien aunque la carne esté cara.</li>
        <li>Entiendes por qué la tortilla con frijoles es tan buena combinación.</li>
        <li>Tu huerto y tu milpa pueden darte buena parte de tu proteína.</li>
        <li>Planeas comidas variadas a lo largo del día sin complicarte.</li><li>Si en tu casa alguien deja de comer carne, sabes cómo armar sus comidas para que no le falte proteína.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En un día comes 4 tortillas de 2 g de proteína cada una y una taza de lentejas de 18 g. ¿Cuántos gramos de proteína suman?</p>', respuesta: 4 * 2 + 18,
        pista: '<p>Calcula la proteína de las tortillas y súmale la de las lentejas.</p>',
        solucion: '<p>4 × 2 = 8 g, y 8 + 18 = <strong>26 g</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si una comida tiene 24 g de proteína y 18 g vienen del frijol, ¿qué porcentaje viene del frijol?</p>', respuesta: 18 / 24 * 100,
        pista: '<p>Divide la parte del frijol entre el total y multiplica por 100.</p>',
        solucion: '<p>18 ÷ 24 = 0.75, es decir, <strong>75%</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según MedlinePlus, ¿qué son las proteínas completas?</p>',
        opciones: ['Las que traen todos los aminoácidos que el cuerpo no puede fabricar', 'Las que vienen solo de las plantas', 'Las que no tienen grasa'], correcta: 0,
        pista: '<p>Suelen venir de alimentos de origen animal.</p>',
        solucion: '<p><strong>Las que traen todos los aminoácidos</strong> que el cuerpo no puede fabricar.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el maíz y el frijol se complementan?</p>',
        opciones: ['Porque los dos tienen los mismos aminoácidos', 'Porque se cuecen juntos', 'Porque el frijol aporta la lisina que al maíz le queda corta'], correcta: 2,
        pista: '<p>Piensa en la lisina.</p>',
        solucion: '<p><strong>Porque se completan</strong>: el frijol pone la lisina que le falta al maíz.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Hace falta comer el cereal y la leguminosa en el mismo bocado?</p>',
        opciones: ['Sí, o no sirve', 'No, basta con comer de ambos a lo largo del día', 'Solo si son crudos'], correcta: 1,
        pista: '<p>MedlinePlus habla de combinarlos cada día.</p>',
        solucion: '<p><strong>No: basta con comerlos a lo largo del día.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llaman las piezas pequeñas de las que están hechas las proteínas?</p>',
        respuestas: ['aminoacidos', 'los aminoacidos', 'aminoacido'],
        pista: '<p>Son como las cuentas de un collar.</p>',
        solucion: '<p>Los <strong>aminoácidos</strong>.</p>' },
    ],
    fuentes: [MEDLINE('dietaryproteins.html', 'Proteínas en la dieta'), OMS, WIKI('Prote%C3%ADna_completa', 'Proteína completa'), WIKI('Lisina', 'Lisina')],
  });

  // ------------------------------------------------------------------
  const NIXTA = ['maíz, agua y cal', 'cocer 55 a 75 min', 'reposar unas 12 h', 'lavar el grano', 'moler: masa'];
  const NIXTAFIG = diagrama([0, 10], [0, 11.4], [
    ...NIXTA.flatMap((e, i) => [caja(1, 9.6 - 2.2 * i, 9, 11 - 2.2 * i), txt(5, 10.3 - 2.2 * i, e)]),
    ...[0, 1, 2, 3].flatMap((i) => flecha([5, 9.55 - 2.2 * i], [5, 8.85 - 2.2 * i], 0, 1.2)),
  ], 'Cinco cajas en columna, de arriba hacia abajo, unidas por flechas: maíz, agua y cal; cocer de 55 a 75 minutos; reposar unas 12 horas; lavar el grano; moler, que da la masa.');

  L('Nixtamalizar maíz y hacer tortillas', {
    objetivo: 'Explicar por qué se cuece el maíz con cal, seguir los pasos de la nixtamalización con seguridad y hacer tortillas con la masa.',
    explicacion: `
      <p>Si mueles maíz crudo y tratas de hacer tortillas, se te desmoronan. Si lo cueces primero con un poco de cal, la masa se vuelve suave, elástica y fácil de tortear. Ese truco, inventado hace miles de años en Mesoamérica, no solo cambia la textura: cambia lo que el maíz le da a tu cuerpo.</p>
      <h3>¿Qué es el nixtamal?</h3>
      <p>El <strong>nixtamal</strong> es el maíz cocido con agua y cal. La palabra viene del náhuatl. La <strong>cal</strong> que se usa en la cocina es hidróxido de calcio, un polvo blanco que vuelve el agua alcalina, es decir, lo contrario de ácida, como viste en Química, en "El pH".</p>
      <h3>Lo que hace la cal</h3>
      <ul>
        <li>Afloja la cascarita del grano, que se desprende al lavarlo.</li>
        <li>Cambia el almidón y las proteínas del maíz, y por eso la masa se une y se puede tortear.</li>
        <li>Aumenta mucho el calcio: un estudio de Bressani y su equipo, publicado en los Archivos Latinoamericanos de Nutrición, encontró que el calcio de la masa y la tortilla puede aumentar hasta 400% respecto al maíz crudo.</li>
        <li>Libera la niacina, una vitamina del maíz que sin nixtamal el cuerpo casi no aprovecha.</li>
      </ul>
      <p>Lo de la niacina es muy importante. MedlinePlus explica que la pelagra es una enfermedad que aparece cuando falta niacina, y causa diarrea, llagas en la piel expuesta al sol y confusión. Cuando el maíz llegó a otros continentes sin la técnica del nixtamal, muchas personas que comían casi solo maíz enfermaron de pelagra. Las comunidades mesoamericanas, que siempre lo nixtamalizaron, casi no la padecían.</p>
      ${NIXTAFIG}
      <h3>Los pasos</h3>
      <p>Las proporciones cambian de una familia a otra. En su estudio, el equipo de Bressani usó entre 0.4% y 1.2% de cal respecto al peso del maíz, tres partes de agua por una de maíz, cocción de 55 a 75 minutos y, como en el método casero tradicional, 12 horas de reposo. Un proceso típico:</p>
      <ol>
        <li>Pon el maíz limpio en una olla con agua y disuelve la cal en el agua.</li>
        <li>Cuécelo hasta que la cascarita se desprenda al frotar un grano entre los dedos.</li>
        <li>Déjalo reposar en esa misma agua toda la noche.</li>
        <li>Al día siguiente, tira el agua de cocción, que tiene la cal sobrante, y lava muy bien el grano frotándolo, hasta que el agua salga clara.</li>
        <li>Muélelo en molino o metate hasta tener una masa suave. Si está seca, agrégale poquita agua.</li>
      </ol>
      <p>Para las tortillas, haz bolitas, aplánalas con una prensa o con las manos y cuécelas en un comal bien caliente, volteándolas dos veces. Una tortilla bien hecha se infla un poco con el vapor.</p>
      <h3>Cuidado con la cal</h3>
      <p>La cal es cáustica: quema la piel, los ojos y la boca. MedlinePlus explica que tragarla o que caiga en los ojos es una urgencia: si cae en la piel o en los ojos, hay que enjuagar con abundante agua durante al menos 15 minutos y buscar ayuda médica de inmediato. Si alguien la traga, no le provoques el vómito y llama de inmediato a emergencias o al centro de toxicología de tu país. Por eso:</p>
      <ul>
        <li>Usa solo cal de grado alimenticio, la que se vende para nixtamalizar; nunca cal de construcción ni de jardín.</li>
        <li>Guarda la cal en un frasco cerrado y etiquetado, lejos de los niños.</li>
        <li>No la manejes con las manos mojadas y no te toques los ojos.</li>
        <li>Agrégala al agua con cuidado para que no salpique.</li>
        <li>Lava bien el grano: la cal sobrante no debe quedar en la masa.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> echar "un puño" de cal sin medir. Con demasiada, la masa sabe amarga y se pone amarilla; con muy poca, no se suelta la cascarita.</p>`,
    ejemplo: `
      <p>Quieres nixtamalizar 2 kg de maíz con 1% de cal respecto a su peso y tres partes de agua por una de maíz. ¿Cuánta cal y cuánta agua usas?</p>
      <ol class="pasos-ej">
        <li>Primero pasa el maíz a gramos: 2 kg son 2 000 g.</li>
        <li>Calcula el 1% de 2 000: 2 000 ÷ 100 = 20 g de cal.</li>
        <li>Para el agua, tres partes por una de maíz: 2 × 3 = 6 kg de agua, que son unos 6 litros.</li>
        <li>Comprueba: 20 g es la centésima parte de 2 000 g, es decir, el 1%.</li>
      </ol>
      <p>Resultado: <span class="resultado">20 g de cal y unos 6 litros de agua</span>. Pesa la cal en lugar de calcularla a ojo.</p>
      <p class="nota"><strong>Error común:</strong> calcular el 1% del agua en lugar del maíz. La proporción del estudio es respecto al peso del maíz.</p>`,
    vidaReal: `
      <p>Nixtamalizar tu propio maíz te da tortillas mejores y más nutritivas:</p>
      <ul>
        <li>Puedes hacer tortillas, tamales o atole con el maíz de tu milpa.</li>
        <li>Aprovechas el calcio y la vitamina que gana el maíz con la cal.</li>
        <li>Conservas una técnica de miles de años.</li>
        <li>Sabes manejar la cal sin lastimarte y qué hacer si salpica.</li><li>Puedes compartir la masa con tus vecinos y hacer tortillas para toda la semana.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Vas a nixtamalizar 3 kg de maíz con 1% de cal respecto a su peso. ¿Cuántos gramos de cal usas?</p>', respuesta: 3000 / 100,
        pista: '<p>Pasa los kilos a gramos y saca el 1%.</p>',
        solucion: '<p>3 kg son 3 000 g, y el 1% es <strong>30 g</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con tres partes de agua por una de maíz, ¿cuántos litros de agua usas para 2.5 kg de maíz?</p>', respuesta: 2.5 * 3,
        pista: '<p>Multiplica el maíz por 3.</p>',
        solucion: '<p>2.5 × 3 = <strong>7.5 litros</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué enfermedad evitaban las comunidades que nixtamalizaban el maíz?</p>',
        opciones: ['La pelagra, por falta de niacina', 'La gripe', 'La caries'], correcta: 0,
        pista: '<p>La cal libera una vitamina del maíz.</p>',
        solucion: '<p><strong>La pelagra</strong>, que aparece cuando falta niacina.</p>' },
      { tipo: 'opciones', enunciado: '<p>Te cae agua con cal en un ojo. Según MedlinePlus, ¿qué haces?</p>',
        opciones: ['Te tallas el ojo', 'Esperas a que se quite solo', 'Enjuagas con abundante agua al menos 15 minutos y buscas ayuda médica'], correcta: 2,
        pista: '<p>La cal es cáustica.</p>',
        solucion: '<p><strong>Enjuagar con abundante agua al menos 15 minutos</strong> y buscar ayuda médica de inmediato.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué se lava bien el nixtamal antes de molerlo?</p>',
        opciones: ['Para que se enfríe', 'Para quitar la cascarita suelta y la cal sobrante', 'Para que germine'], correcta: 1,
        pista: '<p>La cal sobrante no debe quedar en la masa.</p>',
        solucion: '<p><strong>Para quitar la cascarita y la cal sobrante.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el maíz cocido con agua y cal?</p>',
        respuestas: ['nixtamal', 'el nixtamal', 'maiz nixtamalizado', 'nistamal'],
        pista: '<p>Es una palabra que viene del náhuatl.</p>',
        solucion: '<p>El <strong>nixtamal</strong>.</p>' },
    ],
    fuentes: [ALAN, MEDLINE('ency/article/000342.htm', 'Pelagra'), MEDLINE('ency/article/002910.htm', 'Intoxicación con hidróxido de calcio'), WIKI('Nixtamalizaci%C3%B3n', 'Nixtamalización')],
  });

  // ------------------------------------------------------------------
  L('Moler granos y hacer pan', {
    objetivo: 'Moler grano en casa, guardar la harina sin que se eche a perder y entender cómo la levadura y el gluten hacen que el pan se esponje.',
    explicacion: `
      <p>Un puñado de trigo que tú sembraste, cosechaste y trillaste, como viste en "Cultivar trigo", todavía no es pan. Falta molerlo, mezclarlo, amasarlo y hornearlo. Cada paso tiene una razón, y entenderlas te ayuda a que el pan salga bien.</p>
      <h3>Moler</h3>
      <p>Moler es romper el grano hasta convertirlo en polvo. Durante siglos se hizo con piedras, como el metate o el molino de piedra; hoy hay molinos de mano y eléctricos para casa. Si mueles el grano completo, con su cascarita y su germen, obtienes harina integral; si se le quitan, harina blanca.</p>
      <p>Un dato importante para guardar: la Extensión de la Universidad Estatal de Washington explica que la harina integral dura de 1 a 3 meses a temperatura ambiente, porque los aceites del germen se enrancian, es decir, toman un olor y un sabor rancios. En el refrigerador dura unos 6 meses, y en el congelador hasta 12. La harina blanca dura de 6 a 12 meses en un lugar fresco y seco. El grano entero, en cambio, se guarda mucho más, como verás en "Guardar granos sin plagas". Por eso conviene guardar el grano entero y moler poco a poco, lo que vayas a usar.</p>
      <h3>Los ingredientes</h3>
      <p>La Universidad Estatal de Nuevo México explica que el pan básico lleva harina, levadura, un líquido y sal:</p>
      <ul>
        <li>La <strong>levadura</strong> es un hongo microscópico, como viste en Ciencias naturales, en "Microorganismos". Necesita humedad, alimento, como el azúcar y la harina, y tibieza. Cuando crece, suelta un gas, el dióxido de carbono, que infla la masa, y un poco de alcohol que se evapora al hornear y da el olor del pan.</li>
        <li>La harina de trigo contiene <strong>gluten</strong>, una mezcla de proteínas que, al mojarse y amasarse, forma una red elástica. Esa red atrapa el gas de la levadura como si fueran miles de globitos.</li>
        <li>El líquido, agua o leche, despierta a la levadura y forma el gluten.</li>
        <li>La sal da sabor.</li>
      </ul>
      <h3>Los pasos</h3>
      <ol>
        <li>Mezcla los ingredientes. El líquido debe estar tibio, no caliente: Nuevo México lo calienta a 43 a 46 °C (110 a 115 °F), y el calor fuerte mata a la levadura.</li>
        <li>Amasa hasta que la masa esté lisa y elástica. Amasar desarrolla el gluten.</li>
        <li>Tápala y déjala reposar en un lugar tibio hasta que doble su tamaño. A esto se le llama levar.</li>
        <li>Desínflala con el puño, dale forma y déjala levar otra vez.</li>
        <li>Hornéala hasta que esté dorada y suene hueca al golpear la base.</li>
      </ol>
      <p>Si no tienes horno, muchos panes planos, como las tortillas de harina o las pitas, se cuecen en comal o sartén.</p>
      <h3>Otros granos</h3>
      <p>El maíz, el arroz y el amaranto casi no tienen gluten, así que su harina no esponja igual. Por eso con el maíz se hacen tortillas y tamales, como viste en la lección anterior, y no pan de levadura. Si mezclas harina de trigo con un poco de harina de otros granos, obtienes panes con más sabor y variedad.</p>
      <p class="nota"><strong>Trampa común:</strong> moler mucho grano de una vez y guardar la harina integral meses en la alacena. Se enrancia y el pan sabe amargo.</p>`,
    ejemplo: `
      <p>Horneas 2 panes por semana y cada uno lleva unos 500 g de harina. Si mueles tu trigo, ¿cuántos kilos de grano necesitas para un año, y por qué conviene moler cada semana?</p>
      <ol class="pasos-ej">
        <li>Primero calcula la harina por semana: 2 × 500 = 1 000 g, es decir, 1 kg.</li>
        <li>Multiplica por las 52 semanas del año: 1 × 52 = 52 kg de harina.</li>
        <li>Al moler el grano completo casi no se pierde nada, así que necesitas unos 52 kg de grano.</li>
        <li>Comprueba la razón de moler cada semana: la harina integral dura de 1 a 3 meses a temperatura ambiente, y el grano entero, mucho más. Si mueles 1 kg a la vez, siempre es harina fresca.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 52 kg de trigo al año, moliendo 1 kg por semana</span>.</p>
      <p class="nota"><strong>Error común:</strong> moler los 52 kg de una vez. Gran parte se enranciaría antes de usarla.</p>`,
    vidaReal: `
      <p>Moler y hornear en casa te da control sobre tu comida:</p>
      <ul>
        <li>Puedes hacer pan con el trigo que cosechaste.</li>
        <li>Siempre tienes harina fresca si mueles poco a poco.</li>
        <li>Sabes por qué tu pan no esponja y cómo corregirlo.</li>
        <li>Puedes hacer tortillas de harina o panes planos aunque no tengas horno.</li><li>Guardas el grano entero, que dura mucho más que la harina, y no pierdes nada.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Usas 750 g de harina a la semana. ¿Cuántos kilos usas en 8 semanas?</p>', respuesta: 0.75 * 8,
        pista: '<p>Pasa los gramos a kilos y multiplica por 8.</p>',
        solucion: '<p>750 g son 0.75 kg, y 0.75 × 8 = <strong>6 kg</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Según la Universidad Estatal de Washington, la harina integral dura hasta 12 meses en el congelador y hasta 3 a temperatura ambiente. ¿Cuántas veces más dura en el congelador?</p>', respuesta: 12 / 3,
        pista: '<p>Divide los meses del congelador entre los del ambiente.</p>',
        solucion: '<p>12 ÷ 3 = <strong>4 veces</strong> más.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué hace que el pan se esponje?</p>',
        opciones: ['La sal', 'El gas que suelta la levadura, atrapado en la red del gluten', 'El agua caliente'], correcta: 1,
        pista: '<p>La levadura es un ser vivo que suelta un gas.</p>',
        solucion: '<p><strong>El dióxido de carbono de la levadura</strong>, atrapado en el gluten.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué la harina integral se echa a perder antes que la blanca?</p>',
        opciones: ['Porque tiene más agua', 'Porque tiene gluten', 'Porque los aceites del germen se enrancian'], correcta: 2,
        pista: '<p>La harina integral conserva el germen del grano.</p>',
        solucion: '<p><strong>Porque los aceites del germen se enrancian.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el líquido para el pan debe estar tibio y no caliente?</p>',
        opciones: ['Porque el calor fuerte mata a la levadura', 'Porque el agua caliente no moja la harina', 'Porque así sabe mejor'], correcta: 0,
        pista: '<p>La levadura es un ser vivo.</p>',
        solucion: '<p><strong>Porque el calor fuerte mata a la levadura</strong>, y entonces el pan no esponja.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la mezcla de proteínas del trigo que forma una red elástica al amasar?</p>',
        respuestas: ['gluten', 'el gluten'],
        pista: '<p>Las personas celíacas no lo pueden comer.</p>',
        solucion: '<p>El <strong>gluten</strong>.</p>' },
    ],
    fuentes: [NMSU, WSU, WIKI('Pan', 'Pan'), WIKI('Molino', 'Molino')],
  });

  // ------------------------------------------------------------------
  L('Germinados para comer', {
    objetivo: 'Entender qué son los germinados, por qué pueden causar enfermedades y cómo comerlos con menos riesgo.',
    explicacion: `
      <p>En muchas ensaladas y tortas aparecen unos brotes blancos y crujientes: germinados de frijol mungo o de alfalfa. Se hacen en pocos días, en un frasco, sin tierra. Parecen el alimento perfecto para hacer en casa, pero tienen un riesgo que conviene conocer antes.</p>
      <h3>¿Qué es un germinado?</h3>
      <p>Un <strong>germinado</strong> es una semilla que se deja germinar unos días y se come cuando apenas sacó su raíz y su tallito, antes de que crezca como planta. Viste el proceso en la unidad Semillas y germinación: la semilla absorbe agua, se hincha y brota. Para comer se usan, por ejemplo, alfalfa, trébol, girasol, brócoli, mostaza, rábano, ajo, frijol mungo y otros frijoles, según la Autoridad de Salud de Oregon.</p>
      <h3>El riesgo</h3>
      <p>La Administración de Alimentos y Medicamentos de Estados Unidos (FDA) explica el problema: los germinados crecen con calor y humedad, que son también las condiciones ideales para que se multipliquen bacterias como la salmonela, la listeria y algunas <span lang="la">E. coli</span>. Si unas pocas bacterias vienen en la semilla, durante la germinación pueden llegar a niveles muy altos, aunque los germines en casa con mucha limpieza.</p>
      <p>La Autoridad de Salud de Oregon añade que los germinados crudos y poco cocidos, sobre todo de alfalfa, trébol y frijol mungo, han causado varios brotes de enfermedad, y que no se ha encontrado ningún tratamiento que elimine por completo esas bacterias. Lavarlos tampoco basta: las bacterias pueden estar dentro de la semilla.</p>
      <h3>Quién no debe comerlos crudos</h3>
      <p>Hay personas a las que una infección de este tipo les puede hacer mucho más daño. Forman un <strong>grupo de riesgo</strong>: niñas y niños, personas mayores, mujeres embarazadas y personas con las defensas bajas. La FDA recomienda que estas personas eviten comer germinados de cualquier tipo crudos o poco cocidos.</p>
      <h3>Cómo comerlos con menos riesgo</h3>
      <ul>
        <li>Cocinarlos: en sopas, guisos o salteados hasta que estén bien calientes. El calor mata a las bacterias, como viste al hervir el agua en la unidad Agua.</li>
        <li>Usar semillas destinadas a germinar para consumo, no semillas para sembrar, que pueden venir tratadas con plaguicidas, como viste en "Almacenar semillas".</li>
        <li>Lavarte las manos y usar frascos limpios.</li>
        <li>Guardarlos en el refrigerador y comerlos pronto.</li>
        <li>Tirarlos si huelen mal o se ven babosos.</li>
      </ul>
      <p>Si alguien tiene diarrea, vómito, fiebre o cólicos después de comer germinados, que beba líquidos para no deshidratarse y busque atención médica con las señales que viste en "Cómo saber si el agua puede estar contaminada": diarrea de más de dos días en un adulto o de más de 24 horas en un niño, sangre en las heces, fiebre de 38.8 °C o más, o señales de deshidratación. Si es un bebé, una persona mayor, una embarazada o alguien del grupo de riesgo, que consulte cuanto antes. Si se desmaya o se confunde, llama a emergencias.</p>
      <h3>¿Vale la pena?</h3>
      <p>Los germinados son ricos y baratos, pero en el huerto hay opciones con menos riesgo para comer crudas, como la lechuga y otras hojas tiernas, bien lavadas. Si te gustan los germinados, cocinarlos es la forma más segura de disfrutarlos.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que los germinados hechos en casa son seguros porque los hiciste con limpieza. La FDA aclara que las bacterias pueden venir dentro de la semilla.</p>`,
    ejemplo: `
      <p>Una familia tiene 5 integrantes: dos adultos de 35 años, una abuela de 78, un niño de 2 años y una adolescente de 14. Según la FDA, ¿cuántas personas deberían evitar los germinados crudos?</p>
      <ol class="pasos-ej">
        <li>Primero revisa quién está en el grupo de riesgo: niñas y niños, personas mayores, embarazadas y personas con defensas bajas.</li>
        <li>La abuela de 78 años es una persona mayor: sí está en el grupo.</li>
        <li>El bebé de 2 años es un niño pequeño: sí está en el grupo.</li>
        <li>La adolescente de 14 años es todavía menor de edad; por prudencia, conviene que tampoco los coma crudos.</li>
        <li>Los dos adultos no están en el grupo, salvo que alguno esté embarazada o tenga las defensas bajas.</li>
      </ol>
      <p>Resultado: <span class="resultado">al menos 2 personas, y conviene que sean 3</span>. Si cocinan los germinados, toda la familia puede comerlos con menos riesgo.</p>
      <p class="nota"><strong>Error común:</strong> preparar un platillo aparte "solo para los adultos" con germinados crudos y servirlo en la misma mesa. Es fácil que alguien del grupo de riesgo coma sin darse cuenta.</p>`,
    vidaReal: `
      <p>Conocer el riesgo de los germinados te ayuda a cuidar a tu familia:</p>
      <ul>
        <li>Sabes quién de tu familia no debe comerlos crudos.</li>
        <li>Puedes seguir disfrutándolos bien cocinados en sopas y guisos.</li>
        <li>Entiendes por qué lavarlos no basta.</li>
        <li>Eliges con calma qué alimentos comer crudos y cuáles cocer.</li><li>Si alguien se enferma del estómago, sabes qué hacer y cuándo buscar atención médica.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Pones 2 cucharadas de semilla de frijol mungo y el germinado ocupa 8 veces más volumen. ¿Cuántas cucharadas de germinado obtienes?</p>', respuesta: 2 * 8,
        pista: '<p>Multiplica por 8.</p>',
        solucion: '<p>2 × 8 = <strong>16 cucharadas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En una familia de 6 personas, 2 están en el grupo de riesgo. ¿Qué porcentaje de la familia debe evitar los germinados crudos? Redondea al entero.</p>', respuesta: 2 / 6 * 100, tolerancia: 0.5,
        pista: '<p>Divide 2 entre 6 y multiplica por 100.</p>',
        solucion: '<p>2 ÷ 6 ≈ 0.33, es decir, unas <strong>33%</strong> de las personas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué los germinados pueden tener muchas bacterias aunque los hagas con limpieza?</p>',
        opciones: ['Porque las bacterias pueden venir dentro de la semilla y se multiplican con el calor y la humedad', 'Porque el agua siempre está contaminada', 'Porque los frascos de vidrio crían bacterias'], correcta: 0,
        pista: '<p>La FDA explica de dónde vienen.</p>',
        solucion: '<p><strong>Porque pueden venir dentro de la semilla</strong> y se multiplican al germinar.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la FDA, ¿quién debe evitar los germinados crudos o poco cocidos?</p>',
        opciones: ['Solo los deportistas', 'Nadie', 'Niñas y niños, personas mayores, embarazadas y personas con defensas bajas'], correcta: 2,
        pista: '<p>Es el grupo de riesgo.</p>',
        solucion: '<p><strong>El grupo de riesgo</strong>: niños, mayores, embarazadas y personas con defensas bajas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es la forma más segura de comer germinados?</p>',
        opciones: ['Crudos, bien lavados', 'Cocinados hasta que estén bien calientes', 'Remojados en agua fría'], correcta: 1,
        pista: '<p>Lavarlos no elimina las bacterias.</p>',
        solucion: '<p><strong>Cocinados</strong>, porque el calor mata a las bacterias.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama una semilla que se deja brotar unos días para comerla?</p>',
        respuestas: ['germinado', 'un germinado', 'germinados', 'brote', 'brotes'],
        pista: '<p>Viene de "germinar".</p>',
        solucion: '<p>Un <strong>germinado</strong>.</p>' },
    ],
    fuentes: [FDA, OHA, MEDLINE('salmonellainfections.html', 'Infecciones por salmonela')],
  });

  // ------------------------------------------------------------------
  L('Árboles frutales y plantas perennes', {
    objetivo: 'Planear árboles frutales y plantas perennes que den comida por muchos años, sabiendo cuánto tardan en producir y qué necesitan para polinizarse.',
    explicacion: `
      <p>Las hortalizas se siembran cada temporada; un árbol frutal se siembra una vez y, si lo cuidas, da fruta durante décadas. A cambio, pide paciencia: los primeros años casi no produce. Por eso dicen que quien planta un árbol piensa en el futuro.</p>
      <h3>Plantas que viven muchos años</h3>
      <p>Como viste en "Cultivar hierbas aromáticas y medicinales", las plantas que viven varios años se llaman <strong>perennes</strong>. Entre las que dan comida están los árboles frutales, como el manzano, el durazno, el aguacate, el limón o el mango, y también arbustos y plantas como el nopal, el chayote, el plátano, la zarzamora o el maguey, según el clima de tu región. Una vez establecidas, dan comida cada año sin volver a sembrarlas.</p>
      <h3>Paciencia: los años sin fruta</h3>
      <p>Un árbol joven primero usa su energía en crecer. La Extensión de la Universidad Estatal de Iowa da la edad promedio a la que empiezan a dar fruto algunos árboles de clima templado: manzano, de 4 a 5 años; cerezo ácido y ciruelo, de 3 a 5; peral, de 4 a 6. Iowa explica que los manzanos y perales enanos o semienanos, es decir, injertados sobre una raíz que los mantiene pequeños, dan fruto mucho antes que los de tamaño normal. El vivero te puede decir cuál es el tuyo.</p>
      <p>Por eso conviene plantar los árboles lo antes posible, aunque todavía estés empezando con el huerto, y mientras tanto cultivar hortalizas entre ellos.</p>
      <h3>Polinización: a veces hacen falta dos</h3>
      <p>Algunos frutales no dan fruto con el polen de su misma variedad: necesitan el de otra variedad cercana, que llegue con las abejas. A esto se le llama polinización cruzada, como viste en "Polinización: cómo evitar que tus semillas se crucen". Iowa explica que el manzano es así: necesita otra variedad de manzano que florezca al mismo tiempo, a menos de unos 15 a 30 metros. Si plantas un solo manzano, puede florecer mucho y dar poca fruta.</p>
      <p>Antes de comprar un árbol, pregunta en el vivero si necesita una pareja para polinizarse y qué variedades florecen al mismo tiempo.</p>
      <h3>Elegir según tu clima</h3>
      <p>Cada frutal tiene sus exigencias. Algunos, como el manzano o el durazno, necesitan inviernos fríos para florecer bien; otros, como el mango o el plátano, no aguantan las heladas. Iowa da un ejemplo: en buena parte de su estado, el durazno no aguanta con seguridad el frío del invierno. Lo más seguro es preguntar qué frutales se dan bien en tu zona y buscar variedades criollas o locales, adaptadas a tu clima, como viste en la unidad Guardar tus propias semillas.</p>
      <h3>Dónde plantarlos</h3>
      <ul>
        <li>Con sol, y donde su sombra futura no tape el huerto.</li>
        <li>Con espacio para el tamaño que tendrán de adultos, no el que tienen al plantarlos.</li>
        <li>En tierra que drene bien, porque casi ningún frutal aguanta el encharcamiento.</li>
      </ul>
      <p>Riega con frecuencia los primeros años, hasta que sus raíces estén establecidas, y cubre la base con mantillo, sin pegarlo al tronco.</p>
      <p class="nota"><strong>Trampa común:</strong> plantar un solo árbol de una especie que necesita pareja para polinizarse. Florece cada año y casi no da fruta.</p>`,
    ejemplo: `
      <p>En 2026 plantas un manzano y un ciruelo. Según Iowa, el manzano tarda de 4 a 5 años en empezar a dar fruto y el ciruelo, de 3 a 5. ¿Entre qué años esperas la primera cosecha de cada uno?</p>
      <ol class="pasos-ej">
        <li>Primero, para el manzano, suma los años al año de plantación: 2026 + 4 = 2030 y 2026 + 5 = 2031.</li>
        <li>Así, la primera cosecha del manzano llegaría entre 2030 y 2031.</li>
        <li>Haz lo mismo con el ciruelo: 2026 + 3 = 2029 y 2026 + 5 = 2031.</li>
        <li>Compara: el ciruelo podría darte fruta un año antes que el manzano, en 2029, aunque también podría tardar hasta 2031.</li>
        <li>Comprueba restando: 2030 − 2026 = 4 años y 2031 − 2026 = 5 años, lo que dice Iowa para el manzano.</li>
      </ol>
      <p>Resultado: <span class="resultado">manzano entre 2030 y 2031; ciruelo entre 2029 y 2031</span>. Mientras tanto, las hortalizas te dan comida.</p>
      <p class="nota"><strong>Error común:</strong> esperar fruta el primer año y arrancar el árbol porque "no sirve".</p>`,
    vidaReal: `
      <p>Plantar perennes es pensar en tu comida de los próximos años:</p>
      <ul>
        <li>Un árbol bien cuidado da fruta a tu familia durante décadas.</li>
        <li>Las perennes casi no necesitan resembrarse cada año.</li>
        <li>Sabes por qué un árbol puede florecer y no dar fruta.</li>
        <li>Eliges frutales que se adaptan a tu clima y no pierdes dinero.</li><li>Plantas pronto, para que tus árboles ya den fruta cuando más la necesites.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Plantas un peral en 2025 y tarda unos 5 años en dar fruto. ¿En qué año esperas la primera cosecha?</p>', respuesta: 2025 + 5,
        pista: '<p>Suma los años al año de plantación.</p>',
        solucion: '<p>2025 + 5 = <strong>2030</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un árbol adulto ocupará un círculo de 6 m de diámetro. ¿A cuántos metros de distancia, como mínimo, plantas el siguiente árbol del mismo tamaño?</p>', respuesta: 6,
        pista: '<p>Cada árbol ocupa 3 m hacia cada lado.</p>',
        solucion: '<p>Cada copa mide 3 m de radio; dos copas juntas suman 3 + 3 = <strong>6 m</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Plantas un solo manzano y florece mucho, pero casi no da fruta. Según Iowa, ¿qué es lo más probable?</p>',
        opciones: ['Que le falta agua', 'Que necesita el polen de otra variedad de manzano cercana', 'Que es muy joven para florecer'], correcta: 1,
        pista: '<p>Piensa en la polinización cruzada.</p>',
        solucion: '<p><strong>Necesita otra variedad</strong> que florezca al mismo tiempo, cerca.</p>' },
      { tipo: 'opciones', enunciado: '<p>Vives en un lugar caluroso donde nunca hiela. ¿Qué frutal es más probable que se dé bien?</p>',
        opciones: ['El mango', 'El manzano', 'El cerezo'], correcta: 0,
        pista: '<p>Algunos frutales necesitan inviernos fríos.</p>',
        solucion: '<p><strong>El mango</strong>. El manzano y el cerezo necesitan inviernos fríos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Dónde conviene plantar un árbol frutal?</p>',
        opciones: ['En el centro del huerto, aunque le tape el sol', 'En un hoyo donde se junta el agua', 'Con sol y espacio para su tamaño adulto, en tierra que drene bien'], correcta: 2,
        pista: '<p>Piensa en cómo será en 10 años.</p>',
        solucion: '<p><strong>Con sol, espacio y buen drenaje.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llaman las plantas que viven muchos años y dan comida cada temporada sin resembrarlas?</p>',
        respuestas: ['perennes', 'perenne', 'plantas perennes', 'las perennes'],
        pista: '<p>Lo contrario de "anuales".</p>',
        solucion: '<p>Las <strong>perennes</strong>.</p>' },
    ],
    fuentes: [IOWA('faq/how-soon-will-newly-planted-fruit-tree-begin-bear-fruit', 'How soon will a newly planted fruit tree begin to bear fruit?'), IOWA('how-to/pollination-requirements-tree-and-small-fruits', 'Pollination Requirements for Tree and Small Fruits'), WIKI('Árbol_frutal', 'Árbol frutal')],
  });

  // ------------------------------------------------------------------
  L('Gallinas y animales pequeños', {
    objetivo: 'Saber qué necesitan unas gallinas de patio para estar sanas y cómo cuidar a tu familia de la salmonela que pueden llevar.',
    explicacion: `
      <p>Unas cuantas gallinas en el patio dan huevos casi todos los días, se comen las sobras de la cocina y dejan estiércol para la composta. Por eso son de los animales más comunes en las casas que buscan producir parte de su comida. Pero, como todo animal, traen responsabilidades y un riesgo de salud que es fácil de manejar si lo conoces.</p>
      <h3>Lo que necesitan</h3>
      <p>Las gallinas necesitan cuatro cosas básicas, igual que tú: refugio, agua, comida y espacio.</p>
      <ul>
        <li>Un <strong>gallinero</strong>, que es el lugar techado donde duermen y ponen. Debe estar seco, con buena ventilación y cerrado de noche, porque los perros, los zorros, los tlacuaches y otros animales las atacan.</li>
        <li>Agua limpia todos los días, en un bebedero que no se voltee ni se ensucie con su excremento.</li>
        <li>Alimento: maíz quebrado, alimento balanceado para aves, hierbas y sobras de verduras. Las sobras ayudan, pero no bastan solas.</li>
        <li>Nidos con paja, donde ponen los huevos, y un patio donde puedan escarbar y tomar el sol.</li>
      </ul>
      <p>Recoge los huevos todos los días y limpia el gallinero con frecuencia. El estiércol, ya compostado como viste en "El suelo y la composta", es un excelente abono.</p>
      <h3>La salmonela</h3>
      <p>La <strong>salmonela</strong> es una bacteria que vive en el intestino de muchas aves. El Departamento de Servicios de Salud de Wisconsin explica que puede enfermar a las personas con vómito, diarrea, fiebre y cólicos. Lo importante es esto: las aves la llevan en su excremento, en sus plumas, sus patas y su pico, aunque se vean sanas y limpias. Desde ahí pasa a sus jaulas, comederos, bebederos y a todo el lugar donde andan. Cualquiera que las toque o que trabaje o juegue donde viven puede contagiarse.</p>
      <h3>Reglas para cuidarte</h3>
      <p>Wisconsin da reglas sencillas:</p>
      <ul>
        <li>Lávate las manos con agua y jabón justo después de tocar a las aves o cualquier cosa del lugar donde viven. Si no hay agua y jabón, usa gel desinfectante.</li>
        <li>Vigila que las niñas y los niños pequeños se laven bien las manos.</li>
        <li>Las aves se quedan afuera, aunque sean pollitos, y nunca entran a la cocina, al baño ni a donde se guarda la comida.</li>
        <li>No comas ni bebas donde viven las aves, y no las beses ni las abraces contra la cara.</li>
        <li>Lava sus jaulas, comederos y bebederos afuera, y no los metas a la casa.</li>
        <li>Cocina los huevos hasta que la clara y la yema estén firmes.</li>
      </ul>
      <p>Además, hay personas que no deben tocar a las aves. Según Wisconsin, los menores de 5 años, las personas mayores, las embarazadas y las personas con las defensas bajas tienen más riesgo de enfermar gravemente, así que no deben cargar ni tocar pollitos, patitos ni otras aves vivas.</p>
      <p>Si alguien tiene diarrea, vómito o fiebre, que tome líquidos para no deshidratarse, como viste en la unidad Agua, y busque atención médica si las señales son fuertes, si hay sangre en la diarrea o si se trata de un bebé, una persona mayor o alguien del grupo de riesgo. Si se desmaya o se confunde, llama a emergencias.</p>
      <h3>Otros animales pequeños</h3>
      <p>Hay familias que crían patos, codornices o conejos. Las reglas de higiene son las mismas: manos limpias, animales fuera de la cocina y equipo lavado afuera. Antes de tener cualquier animal, revisa si tu municipio lo permite, cuánto espacio necesita y quién lo va a cuidar todos los días, incluso cuando la familia sale de viaje.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que una gallina que se ve sana y limpia no puede contagiar nada. La salmonela no se ve.</p>`,
    ejemplo: `
      <p>Llegan 4 pollitos a una casa donde viven un abuelo de 80 años, una pareja de 30, una niña de 8 y un niño de 3. ¿Quién puede cargarlos, y qué hace después?</p>
      <ol class="pasos-ej">
        <li>Primero revisa quién no debe tocarlos según Wisconsin: menores de 5 años, personas mayores, embarazadas y personas con defensas bajas.</li>
        <li>El niño de 3 años es menor de 5: no los carga.</li>
        <li>El abuelo de 80 años es una persona mayor: tampoco.</li>
        <li>La pareja de 30 sí puede, si nadie está embarazada ni tiene las defensas bajas.</li>
        <li>La niña de 8 puede, con un adulto que vigile que se lave bien las manos al terminar.</li>
        <li>Comprueba contando: de 5 personas, 2 no los tocan y 3 sí, y las 3 se lavan las manos después.</li>
      </ol>
      <p>Resultado: <span class="resultado">3 personas pueden cargarlos y se lavan las manos al terminar</span>.</p>`,
    vidaReal: `
      <p>Saber criar gallinas con cuidado te da comida y tranquilidad:</p>
      <ul>
        <li>Tienes huevos frescos casi todos los días.</li>
        <li>Aprovechas las sobras y obtienes abono para el huerto.</li>
        <li>Proteges a los niños pequeños y a los abuelos de la salmonela.</li>
        <li>Sabes qué hacer si alguien de la casa se enferma del estómago.</li><li>Antes de comprar aves, revisas el espacio, las reglas de tu municipio y quién las cuidará.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tus gallinas ponen en total 20 huevos a la semana y tu familia usa 12. ¿Cuántos huevos te sobran en 4 semanas?</p>', respuesta: (20 - 12) * 4,
        pista: '<p>Calcula lo que sobra en una semana y multiplícalo por 4.</p>',
        solucion: '<p>Sobran 20 − 12 = 8 por semana, y 8 × 4 = <strong>32 huevos</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En una casa viven 6 personas: una bebé de 1 año, una embarazada, una abuela de 75 y tres adultos sanos. ¿Cuántas pueden tocar a los pollitos según Wisconsin?</p>', respuesta: 6 - 3,
        pista: '<p>Cuenta cuántas están en el grupo de riesgo y réstalas.</p>',
        solucion: '<p>La bebé, la embarazada y la abuela no deben tocarlos: 6 − 3 = <strong>3 personas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una gallina se ve sana y limpia. ¿Puede llevar salmonela?</p>',
        opciones: ['No, solo las gallinas enfermas', 'Sí, en el excremento, las plumas, las patas y el pico', 'Solo si es pollito'], correcta: 1,
        pista: '<p>Wisconsin dice que se ven sanas aunque la lleven.</p>',
        solucion: '<p><strong>Sí</strong>: la llevan aunque se vean sanas y limpias.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cómo se deben cocinar los huevos según Wisconsin?</p>',
        opciones: ['Hasta que la clara y la yema estén firmes', 'Tibios, con la yema líquida', 'No hace falta cocinarlos si son de tu gallinero'], correcta: 0,
        pista: '<p>El calor mata a la salmonela.</p>',
        solucion: '<p><strong>Hasta que la clara y la yema estén firmes.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Dónde lavas los bebederos y comederos de las gallinas?</p>',
        opciones: ['En el fregadero de la cocina', 'En la regadera', 'Afuera de la casa'], correcta: 2,
        pista: '<p>La salmonela pasa al equipo de las aves.</p>',
        solucion: '<p><strong>Afuera</strong>, sin meterlos a la casa.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la bacteria que las aves llevan en el intestino y que causa diarrea, vómito y fiebre?</p>',
        respuestas: ['salmonela', 'la salmonela', 'salmonella', 'salmonelosis'],
        pista: '<p>Empieza con "s".</p>',
        solucion: '<p>La <strong>salmonela</strong>.</p>' },
    ],
    fuentes: [WISC, MEDLINE('salmonellainfections.html', 'Infecciones por salmonela')],
  });

  // ------------------------------------------------------------------
  L('Guardar granos sin plagas', {
    objetivo: 'Guardar maíz, frijol y otros granos durante meses sin que se los coman los insectos ni se llenen de moho.',
    explicacion: `
      <p>Después de meses de trabajo en la milpa, la cosecha llega toda junta. Pero tu familia la come poco a poco, durante todo el año. Si el grano se guarda mal, en unas semanas puede llenarse de gorgojos o de moho, y el trabajo se pierde. Guardarlo bien es tan importante como cultivarlo.</p>
      <h3>Los dos enemigos: insectos y humedad</h3>
      <p>En "Semillas secas: maíz, frijol, trigo y arroz" conociste al gorgojo, un escarabajo muy pequeño que pone sus huevos en los granos. Sus larvas se comen el grano por dentro y lo dejan lleno de agujeros. Hay otras palomillas y escarabajos que hacen lo mismo con el maíz, el trigo y el arroz. El otro enemigo es la humedad: un grano húmedo se calienta, se enmohece y se pudre.</p>
      <h3>Paso 1: grano bien seco</h3>
      <p>Antes de guardar, el grano debe estar muy seco. Viste cómo comprobarlo en la unidad Guardar tus propias semillas: un grano seco se rompe o suena duro al morderlo, en lugar de aplastarse. Si guardas grano húmedo en un recipiente cerrado, la humedad se queda atrapada y aparece el moho.</p>
      <h3>Paso 2: limpio y revisado</h3>
      <p>Quita la tierra, las piedras, la paja y los granos rotos o con agujeros, que atraen a los insectos. Si ves insectos, separa ese grano y no lo mezcles con el sano.</p>
      <h3>Paso 3: congelar para matar huevos</h3>
      <p>Muchas veces los huevos del gorgojo ya vienen dentro del grano y no se ven. En "Semillas secas" viste que, para frijol en cantidades pequeñas, congelarlo de 24 a 30 horas mata los huevos y las larvas. Después deja que se ponga a temperatura ambiente con el frasco cerrado, para que no se humedezca.</p>
      <h3>Paso 4: recipiente hermético</h3>
      <p>Un recipiente <strong>hermético</strong> es uno que cierra tan bien que no deja pasar el aire, el agua ni los insectos. Puede ser un frasco de vidrio con tapa de rosca y empaque de hule, una cubeta con tapa de cierre, un tambo o una bolsa especial.</p>
      <p>Para cantidades grandes existen bolsas de varias capas. La Universidad Purdue desarrolló las bolsas PICS, de tres capas de plástico, para que familias campesinas de muchos países guarden su grano seco después de la cosecha con muy pocas pérdidas por insectos. Purdue explica que estas bolsas eliminan el uso de insecticidas en el grano guardado. Para que funcionen, hay que llenarlas, sacar el aire que se pueda y amarrar cada capa por separado, sin agujeros.</p>
      <h3>Paso 5: lugar fresco, seco y revisado</h3>
      <p>Guarda los recipientes en un lugar fresco, seco y oscuro, sobre tarimas o tablas y no directo en el piso, donde pasan humedad y ratones. Revisa el grano cada mes: abre, mira, huele. Señales de que algo va mal:</p>
      <ul>
        <li>Hay insectos vivos, telarañas finas o polvo de grano al fondo.</li>
        <li>Los granos tienen agujeros redondos.</li>
        <li>Huele a humedad o a moho, o los granos están pegados o tienen manchas de colores.</li>
        <li>El recipiente está caliente o sudado por dentro.</li>
      </ul>
      <p>Si el grano tiene moho, no lo comas: algunos mohos producen sustancias dañinas que no se quitan al cocinar. Ante la duda, tíralo. Si alguien se siente mal después de comer grano con moho, busca atención médica.</p>
      <p class="nota"><strong>Trampa común:</strong> echar insecticida de jardín o de casa al grano para comer. Esos productos no son para alimentos; para cuidar el grano usa los métodos de esta lección.</p>`,
    ejemplo: `
      <p>Cosechaste 180 kg de maíz seco y tienes bolsas herméticas de 50 kg. ¿Cuántas bolsas necesitas?</p>
      <ol class="pasos-ej">
        <li>Primero divide el maíz entre lo que cabe en cada bolsa: 180 ÷ 50 = 3.6.</li>
        <li>No puedes usar 3.6 bolsas: con 3 bolsas guardas solo 150 kg.</li>
        <li>Te quedan 180 − 150 = 30 kg, que necesitan una bolsa más.</li>
        <li>Así que necesitas 4 bolsas: 3 llenas y una con 30 kg.</li>
        <li>Comprueba: 3 × 50 + 30 = 150 + 30 = 180 kg.</li>
      </ol>
      <p>Resultado: <span class="resultado">4 bolsas</span>. En la bolsa que queda a medio llenar, saca bien el aire y amarra cada capa por separado antes de guardarla. Si en el futuro cosechas más, ya sabes cuántas bolsas comprar con la misma cuenta.</p>
      <p class="nota"><strong>Error común:</strong> redondear 3.6 hacia abajo y dejar 30 kg de maíz en un costal abierto.</p>`,
    vidaReal: `
      <p>Guardar bien tus granos protege el trabajo de toda una temporada:</p>
      <ul>
        <li>Tu cosecha te dura hasta la siguiente, sin plagas.</li>
        <li>No gastas en insecticidas ni los pones en tu comida.</li>
        <li>Puedes comprar grano barato en temporada y guardarlo.</li>
        <li>Sabes reconocer pronto si algo va mal y salvas el resto.</li><li>Puedes compartir o vender grano sano cuando en el mercado escasea.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tienes 130 kg de frijol y cubetas herméticas de 20 kg. ¿Cuántas cubetas necesitas como mínimo?</p>', respuesta: 7,
        pista: '<p>Divide y, si no es exacto, redondea hacia arriba.</p>',
        solucion: '<p>130 ÷ 20 = 6.5, así que necesitas <strong>7 cubetas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Guardaste 200 kg de maíz y por las plagas perdiste 15 kg. ¿Qué porcentaje perdiste?</p>', respuesta: 15 / 200 * 100,
        pista: '<p>Divide lo perdido entre el total y multiplica por 100.</p>',
        solucion: '<p>15 ÷ 200 = 0.075, es decir, <strong>7.5%</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué pasa si guardas grano húmedo en un recipiente hermético?</p>',
        opciones: ['La humedad queda atrapada y aparece el moho', 'Se seca solo', 'Nada, el recipiente lo protege'], correcta: 0,
        pista: '<p>El recipiente no deja salir la humedad.</p>',
        solucion: '<p><strong>Aparece el moho</strong>, porque la humedad no tiene por dónde salir.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Purdue, ¿qué ventaja tienen las bolsas PICS?</p>',
        opciones: ['Hacen que el grano crezca', 'Guardan el grano con muy pocas pérdidas por insectos y sin insecticidas', 'Sirven para grano húmedo'], correcta: 1,
        pista: '<p>Son bolsas de tres capas para grano seco.</p>',
        solucion: '<p><strong>Pocas pérdidas por insectos y sin insecticidas.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Abres una cubeta y el maíz huele a moho y tiene manchas. ¿Qué haces?</p>',
        opciones: ['Lo lavas y lo cocinas', 'Lo secas al sol y lo comes', 'No lo comes'], correcta: 2,
        pista: '<p>Algunos mohos dejan sustancias que el calor no quita.</p>',
        solucion: '<p><strong>No lo comes.</strong> Ante la duda, se tira.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama un recipiente que cierra tan bien que no deja pasar el aire ni el agua?</p>',
        respuestas: ['hermetico', 'recipiente hermetico', 'un recipiente hermetico'],
        pista: '<p>Empieza con "h".</p>',
        solucion: '<p><strong>Hermético</strong>.</p>' },
    ],
    fuentes: [PICS, WSU, WIKI('Sitophilus', 'Sitophilus (gorgojo)')],
  });

  // ------------------------------------------------------------------
  L('Conservar alimentos: secado, fermentado y encurtido', {
    objetivo: 'Conservar frutas y verduras secándolas, fermentándolas o encurtiéndolas, siguiendo las medidas de una fuente confiable.',
    explicacion: `
      <p>En temporada, el huerto da más jitomates, chiles o pepinos de los que puedes comer. Antes de los refrigeradores, las familias ya sabían guardarlos para el invierno: los secaban al sol, los hacían chucrut o los ponían en vinagre. Estas técnicas siguen funcionando, y entender por qué funcionan te ayuda a hacerlas sin riesgos.</p>
      <h3>Por qué funcionan</h3>
      <p>En Química, en "La química de los alimentos", viste que los microbios que echan a perder la comida necesitan agua, una temperatura agradable y un medio poco ácido. Cada técnica les quita algo: el secado les quita el agua; el vinagre y la fermentación hacen el alimento muy ácido; la sal saca el agua y frena a los microbios dañinos.</p>
      <h3>Secado</h3>
      <p><strong>Deshidratar</strong> es quitarle a un alimento casi toda su agua. La Extensión de la Universidad Estatal de Pensilvania (Penn State) explica que hace falta calor y aire que se mueva: el calor saca el agua y el aire se la lleva.</p>
      <ul>
        <li>Al sol: funciona en climas secos y calurosos. Pon la fruta en rebanadas delgadas sobre una rejilla, tapada con una tela fina contra los insectos, y métela de noche para que no se humedezca.</li>
        <li>En el horno: Penn State indica 60 a 65 °C, con la puerta abierta de 5 a 7.5 cm para que salga la humedad.</li>
      </ul>
      <p>Penn State también explica que muchas verduras se escaldan antes de secarlas: se sumergen unos minutos en agua hirviendo, para que conserven mejor su color y su sabor. Cuando están secas, se guardan en frascos herméticos en un lugar fresco y oscuro.</p>
      <h3>Fermentado</h3>
      <p>En Ciencias naturales viste que algunas bacterias son útiles. En la fermentación, bacterias buenas se comen los azúcares del alimento y producen ácido, que lo conserva y le da su sabor agrio. Así se hacen el chucrut, que es col fermentada, y los pepinillos fermentados.</p>
      <p>La sal es clave. Penn State da la proporción del chucrut: 3 cucharadas de sal por cada 2.25 kg de col. Advierte que cambiar esa proporción puede volverlo inseguro, así que no le pongas menos sal "para que sea más sano". Otros puntos de Penn State:</p>
      <ul>
        <li>La col debe quedar siempre bajo el líquido; si le falta, se completa con salmuera, que es agua con sal, de 1½ cucharadas de sal por litro de agua.</li>
        <li>A 21 a 23 °C fermenta en 2 a 4 semanas; a 15 a 18 °C puede tardar hasta seis semanas.</li>
        <li>Por debajo de 15 °C puede no fermentar, y por encima de 26 °C puede ablandarse y echarse a perder.</li>
      </ul>
      <h3>Encurtido</h3>
      <p>Un <strong>encurtido</strong> es un alimento conservado en vinagre, como los chiles en vinagre o los pepinillos. Aquí el ácido no lo producen bacterias: se lo pones tú. Penn State insiste en usar vinagre de 5% de acidez, que es lo que dice la etiqueta del vinagre comercial, y en no diluirlo más de lo que pide la receta, porque el ácido es lo que lo protege. Si quieres guardarlo fuera del refrigerador, el frasco debe procesarse en baño maría, como verás en la siguiente lección. Mientras no lo proceses así, guárdalo en el refrigerador.</p>
      <h3>Señales de que algo va mal</h3>
      <ul>
        <li>Moho de colores o de aspecto algodonoso que llega al alimento.</li>
        <li>Olor podrido, en lugar de agrio.</li>
        <li>Textura babosa o muy blanda.</li>
        <li>En frutas secas, manchas de moho o humedad en el frasco.</li>
      </ul>
      <p>Si ves cualquiera de estas señales, tíralo y no lo pruebes para comprobar. Si alguien se siente mal después de comer una conserva casera, busca atención médica; en la siguiente lección verás las señales del botulismo, que es una urgencia. Sigue siempre una receta probada de una fuente confiable, y no improvises cantidades de sal o vinagre.</p>
      <p class="nota"><strong>Trampa común:</strong> reducir la sal del chucrut o diluir el vinagre al gusto. Esas cantidades no son solo de sabor: son las que lo hacen seguro.</p>`,
    ejemplo: `
      <p>Tienes 4.5 kg de col para chucrut. Penn State indica 3 cucharadas de sal por cada 2.25 kg. ¿Cuánta sal usas, y cuánto tardará a 22 °C?</p>
      <ol class="pasos-ej">
        <li>Primero calcula cuántas veces cabe 2.25 kg en tu col: 4.5 ÷ 2.25 = 2.</li>
        <li>Como tienes el doble de col, usas el doble de sal: 3 × 2 = 6 cucharadas.</li>
        <li>Luego revisa la temperatura: 22 °C está entre 21 y 23 °C, así que tardará de 2 a 4 semanas.</li>
        <li>Comprueba: si 2.25 kg llevan 3 cucharadas, cada cucharada sirve para 0.75 kg, y 6 × 0.75 = 4.5 kg.</li>
      </ol>
      <p>Resultado: <span class="resultado">6 cucharadas de sal, de 2 a 4 semanas de fermentación</span>. Mide la sal con cucharas de medir, no a ojo.</p>
      <p class="nota"><strong>Error común:</strong> dejar el frasco junto a la estufa, donde pasa de 26 °C y el chucrut se echa a perder.</p>`,
    vidaReal: `
      <p>Conservar tus cosechas te da comida para los meses flacos:</p>
      <ul>
        <li>Aprovechas lo que sobra en temporada y no lo regalas ni lo tiras.</li>
        <li>Tienes fruta seca para el camino o para la escuela.</li>
        <li>Haces chiles en vinagre o chucrut con tus propias verduras.</li>
        <li>Sabes reconocer cuándo una conserva ya no se debe comer.</li><li>Sigues medidas confiables de sal y vinagre, y así tus conservas son seguras.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Penn State indica 3 cucharadas de sal por cada 2.25 kg de col. ¿Cuántas cucharadas usas para 6.75 kg?</p>', respuesta: 6.75 / 2.25 * 3,
        pista: '<p>Calcula cuántas veces cabe 2.25 en 6.75.</p>',
        solucion: '<p>6.75 ÷ 2.25 = 3, y 3 × 3 = <strong>9 cucharadas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Para completar el líquido del chucrut preparas 2 litros de salmuera, con 1½ cucharadas de sal por litro. ¿Cuántas cucharadas de sal usas?</p>', respuesta: 1.5 * 2,
        pista: '<p>Multiplica la sal de un litro por los litros.</p>',
        solucion: '<p>1.5 × 2 = <strong>3 cucharadas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué le quita el secado a los microbios?</p>',
        opciones: ['La luz', 'El agua', 'La sal'], correcta: 1,
        pista: '<p>Deshidratar es quitar...</p>',
        solucion: '<p><strong>El agua</strong>, que necesitan para crecer.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tu casa está a 28 °C. Según Penn State, ¿qué le puede pasar al chucrut?</p>',
        opciones: ['Fermenta más rápido y mejor', 'No pasa nada', 'Puede ablandarse y echarse a perder'], correcta: 2,
        pista: '<p>Penn State da un límite de 26 °C.</p>',
        solucion: '<p>Por encima de 26 °C <strong>puede ablandarse y echarse a perder</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué vinagre pide Penn State para los encurtidos?</p>',
        opciones: ['Vinagre de 5% de acidez, sin diluir más de lo que pide la receta', 'Cualquier vinagre, diluido al gusto', 'Vinagre hecho en casa de acidez desconocida'], correcta: 0,
        pista: '<p>El ácido es lo que lo protege.</p>',
        solucion: '<p><strong>Vinagre de 5%</strong>, sin diluirlo más de lo indicado.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama un alimento conservado en vinagre?</p>',
        respuestas: ['encurtido', 'un encurtido', 'encurtidos', 'escabeche'],
        pista: '<p>Los chiles en vinagre son un ejemplo.</p>',
        solucion: '<p>Un <strong>encurtido</strong>.</p>' },
    ],
    fuentes: [PSU('el-secado-de-frutas-y-vegetales-deshidratacion', 'El secado de frutas y vegetales'), PSU('fermentacion-col-fermentada-chucrut-y-pepinillos', 'Fermentación: col fermentada (chucrut) y pepinillos'), PSU('proceso-rapido-para-preparar-pepinillos-en-vinagre', 'Proceso rápido para preparar pepinillos en vinagre')],
  });

  // ------------------------------------------------------------------
  const ACIDEZ = diagrama([0, 14], [0, 8.6], [
    caja(0.4, 5.4, 6.6, 8.2), txt(3.5, 7.4, 'Ácidos'), txt(3.5, 6.2, 'frutas, encurtidos'),
    caja(7.4, 5.4, 13.6, 8.2), txt(10.5, 7.4, 'Baja acidez'), txt(10.5, 6.2, 'verduras, carne, frijol'),
    ...flecha([3.5, 5.3], [3.5, 3.4], 0, 1.3), ...flecha([10.5, 5.3], [10.5, 3.4], 0, 1.3),
    caja(0.4, 0.4, 6.6, 3.2, true), txt(3.5, 2.2, 'baño maría'), txt(3.5, 1.1, '100 °C'),
    caja(7.4, 0.4, 13.6, 3.2, true), txt(10.5, 2.2, 'envasadora a presión'), txt(10.5, 1.1, 'más de 115 °C'),
  ], 'Dos columnas. A la izquierda, los alimentos ácidos, como frutas y encurtidos, llevan una flecha hacia el baño maría, a 100 °C. A la derecha, los alimentos de baja acidez, como verduras, carne y frijol, llevan una flecha hacia la envasadora a presión, a más de 115 °C.');

  L('Envasado seguro y el riesgo del botulismo', {
    objetivo: 'Distinguir qué alimentos se pueden envasar en baño maría y cuáles necesitan envasadora a presión, y reconocer el botulismo como una urgencia médica.',
    explicacion: `
      <p>Un frasco de conserva casera bien hecho puede durar un año en la alacena. Uno mal hecho puede verse, oler y saber normal, y aun así tener un veneno capaz de matar. Por eso el envasado casero tiene reglas que no se negocian, y esta lección es más de seguridad que de cocina.</p>
      <h3>El enemigo: una bacteria del suelo</h3>
      <p>El <strong>botulismo</strong> es una enfermedad grave causada por una toxina, es decir, un veneno, que produce la bacteria <span lang="la">Clostridium botulinum</span>. Esta bacteria vive en el suelo y forma esporas, una especie de semillas muy resistentes. Penn State explica tres cosas sobre ellas:</p>
      <ul>
        <li>Sobreviven a 100 °C, la temperatura del agua hirviendo.</li>
        <li>Prosperan en alimentos de baja acidez, a temperatura ambiente, sin aire y con humedad. Esas son justo las condiciones de un frasco cerrado de verduras o carne.</li>
        <li>Se destruyen a más de 115 °C (240 °F).</li>
      </ul>
      ${ACIDEZ}
      <h3>Ácidos y de baja acidez</h3>
      <p>Por eso lo primero es saber qué tan ácido es el alimento, como viste en Química, en "El pH". En un medio ácido, las esporas no pueden crecer.</p>
      <ul>
        <li>Los alimentos ácidos, como la mayoría de las frutas, las mermeladas y los encurtidos en vinagre, se pueden procesar en baño maría: los frascos se hierven sumergidos en agua, a 100 °C. Eso basta porque el ácido frena a las esporas.</li>
        <li>Los alimentos de <strong>baja acidez</strong>, como las verduras, las carnes, el pescado y los frijoles, no tienen ácido que frene a las esporas. Penn State indica que estos solo se envasan en una <strong>envasadora a presión</strong>, una olla especial que, al subir la presión, sube el agua a más de 115 °C.</li>
      </ul>
      <p>El jitomate está en el límite. Penn State indica agregarle jugo de limón embotellado, ácido cítrico o vinagre de 5% para que sea seguro en baño maría.</p>
      <p>Una olla de presión de cocina no es lo mismo que una envasadora a presión. El Centro Nacional para la Conservación de Alimentos en Casa (NCHFP) tiene guías en español sobre cómo usar cada una.</p>
      <h3>Reglas que no se negocian</h3>
      <ul>
        <li>Usa siempre una receta probada, de una fuente como Penn State o el NCHFP, sin cambiar cantidades, tamaño de frasco ni tiempos. Por eso aquí no damos recetas de verduras ni carnes envasadas.</li>
        <li>Si vives a gran altura, ajusta los tiempos con la tabla de la receta: el agua hierve a menos temperatura en la montaña. Penn State pide ajustarlos por encima de los 1 800 m.</li>
        <li>No reutilices frascos comerciales de un solo uso, como los de mayonesa o café.</li>
        <li>Guarda las conservas en un lugar fresco, de 10 a 21 °C según Penn State.</li>
        <li>Tira cualquier frasco con la tapa inflada o suelta, con líquido que sale, que chisporrotea al abrir, que huele raro o que tiene moho. Penn State advierte que un alimento puede tener la toxina sin dar ninguna señal: ante la duda, tíralo, y nunca lo pruebes para comprobar.</li>
      </ul>
      <h3>Síntomas: es una urgencia</h3>
      <p>MedlinePlus explica que el botulismo puede ser mortal y siempre es una urgencia médica. Sus síntomas son ver doble, vista borrosa, párpados caídos, dificultad para hablar o tragar, boca seca y debilidad de los músculos. Si alguien tiene estas señales, sobre todo después de comer una conserva casera, llama a emergencias o llévalo de inmediato a un hospital. No esperes a ver si se le pasa.</p>
      <h3>La miel y los bebés</h3>
      <p>MedlinePlus también explica que los bebés pueden enfermar de botulismo al tragar esporas que vienen en la tierra o en la miel. Por eso nunca le des miel a un bebé menor de 1 año, ni siquiera un poquito en el chupón. Si un bebé tiene estreñimiento, se ve flácido, come mal o succiona con poca fuerza, llévalo de inmediato a urgencias.</p>
      <p class="nota"><strong>Trampa común:</strong> envasar ejotes o frijoles en baño maría "porque así lo hacía la abuela". El agua hirviendo no mata las esporas, y la toxina no se ve ni se huele.</p>`,
    ejemplo: `
      <p>Tienes tres cosechas para envasar: duraznos, ejotes y jitomates. ¿Qué método corresponde a cada una?</p>
      <ol class="pasos-ej">
        <li>Primero pregunta si cada alimento es ácido o de baja acidez.</li>
        <li>Los duraznos son fruta, y la mayoría de las frutas son ácidas: van en baño maría, con una receta probada.</li>
        <li>Los ejotes son verdura, de baja acidez: solo en envasadora a presión, porque el baño maría no pasa de 100 °C y las esporas sobreviven.</li>
        <li>Los jitomates están en el límite: van en baño maría solo si les agregas jugo de limón embotellado, ácido cítrico o vinagre de 5%, según la receta.</li>
        <li>Comprueba con el dibujo: los ejotes caen en la columna de baja acidez, que lleva a la envasadora a presión.</li>
      </ol>
      <p>Resultado: <span class="resultado">duraznos y jitomates acidificados en baño maría; ejotes en envasadora a presión</span>.</p>`,
    vidaReal: `
      <p>Conocer estas reglas protege a tu familia de un veneno que no se ve:</p>
      <ul>
        <li>Sabes qué conservas puedes hacer en casa con una olla normal.</li>
        <li>No arriesgas a nadie con verduras mal envasadas.</li>
        <li>Reconoces los síntomas de una urgencia y actúas rápido.</li>
        <li>Proteges a los bebés de la casa sin darles miel.</li><li>Usas recetas probadas y no improvisas con algo que puede ser peligroso.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Según Penn State, el agua hierve a 100 °C y las esporas se destruyen a más de 115 °C. ¿Cuántos grados le faltan al agua hirviendo para llegar a 115 °C?</p>', respuesta: 115 - 100,
        pista: '<p>Resta las dos temperaturas.</p>',
        solucion: '<p>115 − 100 = <strong>15 °C</strong>. Por eso hace falta la envasadora a presión.</p>' },
      { tipo: 'numero', enunciado: '<p>Penn State recomienda guardar las conservas entre 10 y 21 °C. Tu alacena está a 26 °C. ¿Cuántos grados está por encima del máximo?</p>', respuesta: 26 - 21,
        pista: '<p>Resta el máximo a la temperatura de tu alacena.</p>',
        solucion: '<p>26 − 21 = <strong>5 °C</strong> por encima. Busca un lugar más fresco.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cómo se envasan los frijoles cocidos?</p>',
        opciones: ['Solo en envasadora a presión, con una receta probada', 'En baño maría, hirviendo más tiempo', 'En un frasco cerrado, sin procesar'], correcta: 0,
        pista: '<p>Los frijoles son de baja acidez.</p>',
        solucion: '<p><strong>Solo en envasadora a presión</strong>: el baño maría no mata las esporas.</p>' },
      { tipo: 'opciones', enunciado: '<p>Abres un frasco de conserva casera y la tapa estaba inflada, pero huele normal. ¿Qué haces?</p>',
        opciones: ['Lo pruebas un poquito para ver si está bien', 'Lo tiras sin probarlo', 'Lo hierves y lo comes'], correcta: 1,
        pista: '<p>La toxina puede no dar ninguna señal más.</p>',
        solucion: '<p><strong>Lo tiras sin probarlo.</strong> Ante la duda, se tira.</p>' },
      { tipo: 'opciones', enunciado: '<p>Alguien de tu casa ve doble y le cuesta tragar después de comer una conserva casera. ¿Qué haces?</p>',
        opciones: ['Le das un té y esperas', 'Le das más comida para que se reponga', 'Llamas a emergencias o lo llevas de inmediato a un hospital'], correcta: 2,
        pista: '<p>MedlinePlus dice que el botulismo es una urgencia médica.</p>',
        solucion: '<p><strong>Emergencias de inmediato.</strong> El botulismo puede ser mortal.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la enfermedad grave causada por la toxina de una bacteria que puede crecer en conservas mal hechas?</p>',
        respuestas: ['botulismo', 'el botulismo'],
        pista: '<p>La bacteria se llama Clostridium botulinum.</p>',
        solucion: '<p>El <strong>botulismo</strong>.</p>' },
    ],
    fuentes: [PSU('aspectos-basicos-de-la-preparacion-de-conservas-en-casa', 'Aspectos básicos de la preparación de conservas en casa'), NCHFP('BWC-sp2025.pdf', 'Uso de envasadoras de agua hirviendo'), NCHFP('PC-sp2025.pdf', 'Uso de envasadoras a presión'), MEDLINE('botulism.html', 'Botulismo'), MEDLINE('ency/article/001384.htm', 'Botulismo en bebés')],
  });

  // ------------------------------------------------------------------
  const CAJA = diagrama([0, 12], [0, 8.4], [
    caja(1, 0.6, 9, 6.6), caja(1.6, 1.2, 8.4, 6, true), caja(3.4, 2, 6.6, 4.6), { tipo: 'linea', desde: [3.1, 4.9], hasta: [6.9, 4.9] },
    caja(0.6, 6.6, 9.4, 7.2),
    txt(5, 3.3, 'olla tapada'),
    ...flecha([10.6, 5.6], [8.6, 5.2]), txt(10.6, 6.1, 'aislante'),
    ...flecha([10.6, 1.4], [9.2, 1.4]), txt(10.6, 0.9, 'caja'),
    ...flecha([10.6, 7.8], [9.5, 6.95]), txt(10.6, 8.1, 'tapa'),
  ], 'Corte de una caja de calor: por fuera, una caja con tapa; dentro, una capa gruesa de aislante, como heno o cobijas, que rodea por todos lados una olla tapada en el centro.');

  L('Cocinar con poca energía', {
    objetivo: 'Gastar menos gas, leña o electricidad al cocinar, usando la tapa, el remojo y la caja de calor, sin dejar la comida en temperaturas peligrosas.',
    explicacion: `
      <p>Una olla de frijoles puede hervir dos horas en la estufa. Todo ese tiempo gastas gas o leña, aunque buena parte del calor se va al aire de la cocina. Con unos trucos sencillos puedes cocinar lo mismo gastando mucho menos, y además dejar de vigilar la olla.</p>
      <h3>Trucos que no cuestan nada</h3>
      <ul>
        <li>Tapa la olla. Sin tapa, el vapor se lleva mucho calor; con tapa, el agua hierve antes y se mantiene hirviendo con la flama más baja.</li>
        <li>Baja la flama cuando ya hierve. El agua no se calienta por encima de 100 °C aunque pongas más fuego; el fuego extra solo hace burbujas más fuertes.</li>
        <li>Remoja los frijoles, garbanzos y otros granos duros desde la noche anterior, para que se cuezan en menos tiempo.</li>
        <li>Corta los alimentos en trozos más pequeños, que se cuecen más rápido.</li>
        <li>Usa una olla del tamaño de la hornilla, para que la flama no se salga por los lados.</li>
      </ul>
      <h3>La olla de presión</h3>
      <p>La olla de presión de cocina cierra tan bien que el vapor no puede salir. Al subir la presión, el agua hierve a más de 100 °C, y por eso los frijoles y la carne se cuecen mucho más rápido. Sigue siempre las instrucciones del fabricante y revisa que la válvula y el empaque estén limpios. Nunca la abras a la fuerza mientras tenga presión: espera a que baje por completo. Recuerda que, como viste en la lección anterior, una olla de presión de cocina no sirve para envasar.</p>
      <h3>La caja de calor</h3>
      ${CAJA}
      <p>Cocinar con <strong>calor retenido</strong> es aprovechar el calor que ya tiene la comida para que se termine de cocer sola, sin fuego. El Centro de Investigación Aprovecho explica la idea: si una olla ya hirviendo se rodea de un buen aislante, pierde el calor tan despacio que la comida se sigue cociendo.</p>
      <p>Una caja de calor se hace con una caja o una cubeta grande, y un aislante, es decir, un material que no deja pasar el calor, como heno, paja seca, periódico arrugado o cobijas viejas. El aislante debe rodear la olla por abajo, por los lados y por arriba.</p>
      <ol>
        <li>Pon a hervir la comida en una olla con tapa que cierre bien. El arroz o los frijoles remojados necesitan unos minutos de hervor; usa una receta como guía. Los frijoles crudos o mal cocidos pueden enfermar: déjalos hervir con fuerza el tiempo que pida la receta y comprueba que estén blandos antes de comerlos.</li>
        <li>Sin destaparla, métela rápido a la caja, rodéala de aislante y cierra.</li>
        <li>Déjala unas horas, sin abrir, porque cada vez que abres se escapa calor. En las pruebas que verás abajo, la comida pasó 5 horas en la caja; no la dejes mucho más tiempo.</li>
      </ol>
      <p>¿Cuánto ahorra? El portal Vikaspedia, del Gobierno de la India, reporta pruebas de la Universidad Agrícola de Tamil Nadu: con la caja de calor se ahorró el 58% del tiempo de cocción en la estufa y el 44% del dinero gastado en combustible. En esas pruebas, el arroz que pasó 5 horas en la caja seguía a 61 °C, mientras que el que quedó fuera había bajado a 35 °C.</p>
      <h3>La temperatura peligrosa</h3>
      <p>Aquí hay que tener cuidado. Penn State explica que entre 4 y 60 °C los mohos, las levaduras y las bacterias crecen activamente. Una comida que pasa muchas horas tibia está justo en esa zona. Por eso:</p>
      <ul>
        <li>Mete la olla a la caja hirviendo, nunca tibia.</li>
        <li>Al sacarla, revisa que esté muy caliente, humeante; con un termómetro de cocina, debe marcar más de 60 °C. Si está tibia, ponla otra vez al fuego hasta que hierva antes de comer.</li>
        <li>No dejes la comida en la caja toda la noche ni todo el día. Si no la vas a comer pronto, enfríala y guárdala en el refrigerador.</li>
      </ul>
      <p>Las estufas ahorradoras de leña y la cocina solar se verán en las unidades Fuego y calor y Energía.</p>
      <p class="nota"><strong>Trampa común:</strong> dejar los frijoles en la caja desde la mañana y comerlos fríos en la noche sin recalentarlos. Pasaron horas en la zona de 4 a 60 °C.</p>`,
    ejemplo: `
      <p>Cocinar frijoles en la estufa te cuesta 30 pesos de gas a la semana. Si la caja de calor ahorra el 44% del dinero gastado en combustible, como en las pruebas que reporta Vikaspedia, ¿cuánto ahorras en un mes de 4 semanas?</p>
      <ol class="pasos-ej">
        <li>Primero calcula el ahorro de una semana: el 44% de 30 es 30 × 0.44 = 13.2 pesos.</li>
        <li>Luego multiplica por las 4 semanas: 13.2 × 4 = 52.8 pesos.</li>
        <li>Comprueba de otra forma: en un mes gastas 30 × 4 = 120 pesos, y el 44% de 120 es 52.8.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 53 pesos al mes</span>. El ahorro real depende de tu olla, tu aislante y la receta.</p>
      <p class="nota"><strong>Error común:</strong> restar 44 pesos en lugar del 44%. Un porcentaje es una parte de lo que gastas, no una cantidad fija.</p>`,
    vidaReal: `
      <p>Cocinar con menos energía cuida tu bolsillo y tu tiempo:</p>
      <ul>
        <li>Gastas menos gas, leña o electricidad cada semana.</li>
        <li>Puedes dejar la comida cociéndose sin vigilarla.</li>
        <li>Sabes cuándo una comida tibia ya no es segura.</li>
        <li>Si un día falta el gas, la comida rinde más con menos fuego.</li><li>Puedes hacer tu propia caja de calor con una caja vieja y unas cobijas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Gastas 200 pesos de gas al mes en cocinar. Si ahorras el 44%, ¿cuántos pesos ahorras?</p>', respuesta: 200 * 0.44,
        pista: '<p>Multiplica por 0.44.</p>',
        solucion: '<p>200 × 0.44 = <strong>88 pesos</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Unos frijoles necesitan 2 horas de fuego. Si la caja de calor ahorra el 58% del tiempo en la estufa, ¿cuántos minutos de fuego necesitas?</p>', respuesta: 120 * (1 - 0.58), tolerancia: 0.5,
        pista: '<p>Pasa las horas a minutos y calcula el 42% que queda.</p>',
        solucion: '<p>2 horas son 120 minutos; queda el 100% − 58% = 42%, y 120 × 0.42 = <strong>50.4 minutos</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Penn State, ¿entre qué temperaturas crecen activamente los microbios?</p>',
        opciones: ['Entre 4 y 60 °C', 'Por encima de 100 °C', 'Por debajo de 0 °C'], correcta: 0,
        pista: '<p>Es la zona de lo "tibio".</p>',
        solucion: '<p><strong>Entre 4 y 60 °C.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Sacas la olla de la caja de calor y la comida está apenas tibia. ¿Qué haces?</p>',
        opciones: ['La sirves así', 'La guardas en la caja otro rato', 'La pones al fuego hasta que hierva antes de comer'], correcta: 2,
        pista: '<p>Tibio está en la zona peligrosa.</p>',
        solucion: '<p><strong>La recalientas hasta que hierva.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué no conviene subir la flama cuando el agua ya hierve?</p>',
        opciones: ['Porque se apaga la estufa', 'Porque el agua no pasa de 100 °C; solo gastas más', 'Porque la comida se cuece más rápido'], correcta: 1,
        pista: '<p>¿A qué temperatura hierve el agua?</p>',
        solucion: '<p><strong>El agua no pasa de 100 °C</strong> en una olla normal: el fuego extra se desperdicia.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama cocinar aprovechando el calor que ya tiene la comida, sin fuego?</p>',
        respuestas: ['calor retenido', 'cocina de calor retenido', 'coccion por calor retenido', 'cocinar con calor retenido'],
        pista: '<p>Es el calor que se queda "guardado".</p>',
        solucion: '<p>Cocinar con <strong>calor retenido</strong>.</p>' },
    ],
    fuentes: [VIKAS, APROV, PSU('aspectos-basicos-de-la-preparacion-de-conservas-en-casa', 'Aspectos básicos de la preparación de conservas en casa')],
  });

  // ------------------------------------------------------------------
  L('Evitar el desperdicio de comida', {
    objetivo: 'Distinguir la pérdida del desperdicio de alimentos y aplicar hábitos sencillos para tirar menos comida en casa.',
    explicacion: `
      <p>Piensa en la última vez que tiraste algo del refrigerador: una lechuga marchita, medio jitomate, unas tortillas duras. Parece poco, pero si lo sumas todo el año, es mucho dinero y mucho trabajo que terminan en la basura. Para quien cultiva su comida, además, cada jitomate tirado es agua, tiempo y cuidados perdidos.</p>
      <h3>Pérdida y desperdicio</h3>
      <p>En Ciencias naturales, en "Consumo responsable y reciclaje", viste que se tira una parte muy grande de la comida del mundo. Las Naciones Unidas distinguen dos momentos:</p>
      <ul>
        <li>La <strong>pérdida de alimentos</strong> ocurre antes de que la comida llegue a la tienda: en la cosecha, el transporte o el almacén. Según la ONU, con datos de la FAO de 2019, el 13% de los alimentos se pierde después de la cosecha y antes de llegar a la venta.</li>
        <li>El <strong>desperdicio de alimentos</strong> ocurre después: en las tiendas, los restaurantes y las casas. La ONU calcula que se desperdicia el 19% de los alimentos que llegan a los consumidores, unos 1 050 millones de toneladas.</li>
      </ul>
      <p>Si produces tu comida, te tocan los dos: la pérdida, cuando la cosecha se pudre o se la comen las plagas, y el desperdicio, cuando se echa a perder en tu cocina.</p>
      <h3>Contra la pérdida: lo que ya aprendiste</h3>
      <p>Buena parte de esta unidad sirve para eso. Guardar los granos secos y en recipientes herméticos, como viste en "Guardar granos sin plagas", y secar, fermentar o envasar los excedentes, como viste en las lecciones de conservas, evitan que la cosecha se pierda. Sembrar de forma escalonada, unas cuantas plantas cada dos o tres semanas, también ayuda a que no madure todo al mismo tiempo.</p>
      <h3>Contra el desperdicio: hábitos en casa</h3>
      <ul>
        <li>Planea las comidas de la semana y compra o cosecha solo lo que vas a usar.</li>
        <li>Revisa qué tienes antes de comprar, para no repetir.</li>
        <li>Pon adelante lo más viejo y atrás lo más nuevo, en el refrigerador y en la alacena, para usar primero lo que se va a echar a perder antes.</li>
        <li>Sirve porciones pequeñas; si alguien quiere más, que repita.</li>
        <li>Aprovecha las sobras: el arroz de ayer sirve para una sopa, las tortillas duras para chilaquiles o totopos, y la fruta muy madura para agua o mermelada.</li>
        <li>Congela lo que no vas a comer pronto, como pan, tortillas o caldos.</li>
      </ul>
      <h3>Sin arriesgar la salud</h3>
      <p>Evitar el desperdicio nunca significa comer algo que ya no es seguro. En la primera unidad, en "Necesidades básicas: agua, comida, refugio y energía", viste la regla de Ready.gov: la carne, el pollo, el pescado, los huevos y las sobras que pasan dos horas o más a más de unos 4 °C se tiran. Guarda las sobras en el refrigerador pronto, en recipientes tapados, y recaliéntalas hasta que estén bien calientes. Si una sobra huele mal, tiene moho o no sabes cuánto tiempo lleva, tírala.</p>
      <h3>Lo que no se come, vuelve a la tierra</h3>
      <p>Las cáscaras, los tallos, el café usado y los restos de verdura no son basura: son composta, como viste en "El suelo y la composta". Las gallinas también se comen muchas sobras de verdura, como viste en "Gallinas y animales pequeños". Así, lo que no comes tú se convierte en huevos o en tierra fértil para la siguiente cosecha.</p>
      <p class="nota"><strong>Trampa común:</strong> comprar de más "porque está barato". Si se echa a perder antes de usarlo, no fue barato.</p>`,
    ejemplo: `
      <p>Tu familia gasta 3 000 pesos al mes en comida. Si se desperdicia el 19%, como el promedio que calcula la ONU para los consumidores, ¿cuánto dinero se va a la basura en un año?</p>
      <ol class="pasos-ej">
        <li>Primero calcula lo que se tira en un mes: 3 000 × 0.19 = 570 pesos.</li>
        <li>Luego multiplica por los 12 meses: 570 × 12 = 6 840 pesos.</li>
        <li>Comprueba de otra forma: en un año gastas 3 000 × 12 = 36 000 pesos, y el 19% de 36 000 es 6 840.</li>
        <li>Si con los hábitos de la lección reduces el desperdicio a la mitad, ahorras 6 840 ÷ 2 = 3 420 pesos al año.</li>
      </ol>
      <p>Resultado: <span class="resultado">6 840 pesos al año</span>. El 19% es un promedio mundial; tu casa puede tirar más o menos.</p>
      <p class="nota"><strong>Error común:</strong> calcular el 19% de un mes y olvidar multiplicar por 12.</p>`,
    vidaReal: `
      <p>Tirar menos comida se nota en tu casa y en tu bolsillo:</p>
      <ul>
        <li>Ahorras dinero cada mes sin comer menos ni peor.</li>
        <li>Aprovechas todo lo que cosechaste con tanto trabajo.</li>
        <li>Conviertes los restos en composta para tu huerto.</li>
        <li>Sabes cuándo una sobra todavía es segura y cuándo ya no.</li><li>Tus gallinas o tu composta aprovechan lo que tu familia no se come.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Cosechaste 40 kg de jitomate y se te pudrieron 6 kg antes de comerlos o conservarlos. ¿Qué porcentaje perdiste?</p>', respuesta: 6 / 40 * 100,
        pista: '<p>Divide lo perdido entre lo cosechado y multiplica por 100.</p>',
        solucion: '<p>6 ÷ 40 = 0.15, es decir, <strong>15%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tiras 150 pesos de comida a la semana. ¿Cuánto tiras en un año de 52 semanas?</p>', respuesta: 150 * 52,
        pista: '<p>Multiplica por 52.</p>',
        solucion: '<p>150 × 52 = <strong>7 800 pesos</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una cosecha de maíz se la comen las plagas en el almacén, antes de llegar a la tienda. ¿Es pérdida o desperdicio?</p>',
        opciones: ['Pérdida', 'Desperdicio', 'Ninguno'], correcta: 0,
        pista: '<p>Ocurre antes de llegar a la venta.</p>',
        solucion: '<p>Es <strong>pérdida</strong>: ocurre antes de llegar a la tienda.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué hábito ayuda a usar primero lo que se va a echar a perder antes?</p>',
        opciones: ['Guardar lo nuevo adelante', 'Comprar más de lo que necesitas', 'Poner adelante lo más viejo y atrás lo más nuevo'], correcta: 2,
        pista: '<p>Lo que ves primero es lo que usas primero.</p>',
        solucion: '<p><strong>Lo viejo adelante y lo nuevo atrás.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Unas sobras de pollo pasaron toda la tarde fuera del refrigerador en un día caluroso. ¿Qué haces?</p>',
        opciones: ['Las recalientas y las comes', 'Las tiras', 'Las guardas en el refrigerador para mañana'], correcta: 1,
        pista: '<p>Recuerda la regla de las dos horas.</p>',
        solucion: '<p><strong>Las tiras</strong>: pasaron más de dos horas a más de 4 °C.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la comida que se tira en las tiendas, los restaurantes y las casas?</p>',
        respuestas: ['desperdicio de alimentos', 'desperdicio', 'desperdicio de comida', 'el desperdicio de alimentos'],
        pista: '<p>No es "pérdida", que ocurre antes de la tienda.</p>',
        solucion: '<p>El <strong>desperdicio de alimentos</strong>.</p>' },
    ],
    fuentes: [ONU, { nombre: 'Ready.gov en español: Apagones', url: 'https://www.ready.gov/es/apagones' }],
  });
})();
