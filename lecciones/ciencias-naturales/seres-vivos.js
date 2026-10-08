// Ciencias naturales · Unidad 1: Los seres vivos.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('ciencias-naturales', titulo, datos);
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
  // Rótulo a la derecha con una flecha que apunta a la parte del dibujo.
  const rotulo = (x, y, texto, hasta) => [txt(x, y, texto), ...flecha([x - 1.4, y], hasta, 0, 0.8)];
  const caja = (x0, y0, x1, y1, relleno = false) => ({ tipo: 'poligono', puntos: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], relleno });
  // Gráfica de barras de una sola serie (como en matematicas/estadistica.js): etiquetas abajo, valor encima.
  function barras({ etiquetas, valores, max, paso, descripcion }) {
    const n = valores.length;
    const figuras = valores.flatMap((v, i) => [
      { tipo: 'poligono', puntos: [[i + 0.15, 0], [i + 0.85, 0], [i + 0.85, v], [i + 0.15, v]], solido: true },
      txt(i + 0.5, -max * 0.07, etiquetas[i]),
      txt(i + 0.5, v + max * 0.05, String(v)),
    ]);
    return G({ x: [0, n], y: [-max * 0.12, max * 1.1], pasos: [1e9, paso], nombres: false, figuras, descripcion });
  }

  const OSB = (pagina, nombre) => ({ nombre: `OpenStax, Biology 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/biology-2e/pages/${pagina}` });
  const OCB = (pagina, nombre) => ({ nombre: `OpenStax, Concepts of Biology: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/concepts-biology/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = (ruta, nombre) => ({ nombre: `Khan Academy en español: ${nombre}`, url: `https://es.khanacademy.org/science/biology/${ruta}` });
  const MEDLINE = (ruta, nombre) => ({ nombre: `MedlinePlus en español: ${nombre}`, url: `https://medlineplus.gov/spanish/${ruta}` });
  const OMS = (ruta, nombre) => ({ nombre: `Organización Mundial de la Salud: ${nombre}`, url: `https://www.who.int/es/${ruta}` });

  // ------------------------------------------------------------------
  L('Qué distingue a un ser vivo', {
    objetivo: 'Reconocer las características que comparten todos los seres vivos y usarlas para decidir si algo está vivo.',
    explicacion: `
      <p>Un gato y un robot aspiradora se mueven por la casa. Los dos cambian de dirección cuando chocan con un mueble. Sin embargo, sabes que solo el gato está vivo. ¿En qué se nota?</p>
      <p>Moverse no basta: una hoja que arrastra el viento también se mueve. Los biólogos, que son los científicos que estudian la vida, buscaron lo que tienen en común todos los seres vivos, desde una bacteria hasta una ballena. Un <strong>ser vivo</strong> es algo que cumple todas esas características a la vez, no solo una o dos.</p>
      <h3>Lo que comparten todos los seres vivos</h3>
      <ul>
        <li>Están hechos de células, unas piezas diminutas que solo se ven con microscopio. Las verás en la próxima lección.</li>
        <li>Se nutren: toman materia y energía de su entorno. Tú comes, y una planta aprovecha la luz del Sol. En Física viste que nada funciona sin energía, y la vida tampoco.</li>
        <li>Crecen y se desarrollan siguiendo instrucciones que llevan dentro, como un pollito que se convierte en gallina.</li>
        <li>Responden a lo que pasa a su alrededor, como el gato que corre al oír que abres su comida.</li>
        <li>Se reproducen, es decir, forman nuevos seres parecidos a ellos.</li>
        <li>Mantienen su interior estable. Cuando hace calor, sudas para que tu cuerpo no se caliente de más.</li>
      </ul>
      <p>Fíjate que el robot falla en casi todas. Funciona con la energía del enchufe, pero no crece, no está hecho de células y no puede fabricar otro robot.</p>
      <h3>Las tres funciones vitales</h3>
      <p>Para recordarlas mejor, esas características se agrupan en tres <strong>funciones vitales</strong>, que son las tareas que todo ser vivo hace para mantenerse vivo y para que haya más seres como él:</p>
      <ul>
        <li>La nutrición es conseguir materia y energía, y usarlas para crecer y repararse.</li>
        <li>La relación es darse cuenta de lo que pasa alrededor y responder.</li>
        <li>La reproducción es formar nuevos seres vivos.</li>
      </ul>
      <p>Un <strong>estímulo</strong> es cualquier cambio del entorno que un ser vivo puede detectar: la luz, un ruido, el frío o un olor. La función de relación consiste en responder a los estímulos. Una planta no tiene ojos, pero sus tallos se inclinan hacia la ventana porque responde a la luz.</p>
      <h3>Cómo decidir si algo está vivo</h3>
      <p>Revisa las características una por una. Si algo falla en una sola, no es un ser vivo. Solo la reproducción se mira en el grupo y no en cada individuo: una mula no puede tener crías, pero está viva, porque nació de seres vivos que sí se reproducen. Mira cómo quedan cuatro casos con tres de ellas:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Caso</th><th>Hecho de células</th><th>Crece</th><th>Se reproduce</th></tr>
        <tr><th>Gato</th><td>Sí</td><td>Sí</td><td>Sí</td></tr>
        <tr><th>Semilla</th><td>Sí</td><td>Sí, al germinar</td><td>Sí, la planta que nace dará semillas</td></tr>
        <tr><th>Fuego</th><td>No</td><td>Parece, pero solo se extiende</td><td>No</td></tr>
        <tr><th>Robot</th><td>No</td><td>No</td><td>No</td></tr>
      </table></div>
      <p>Hay un caso difícil, el de los virus, que verás al final de esta unidad.</p>
      <p class="nota"><strong>Trampa común:</strong> decidir con una sola pista. El fuego se mueve, se extiende y consume oxígeno, pero no está hecho de células. Y al revés, una semilla guardada en un frasco parece una piedra, pero está viva: si la siembras y la riegas, germina.</p>`,
    ejemplo: `
      <p>Si cuelgas un hilo en un vaso de agua con mucha sal, en unos días se forman cristales que crecen. ¿El cristal de sal es un ser vivo?</p>
      <ol class="pasos-ej">
        <li>Primero revisa si crece. Sí, pero crece porque se le pegan más partículas de sal desde afuera, como cuando apilas bloques. No usa alimento para construirse por dentro.</li>
        <li>Ahora busca células. Al microscopio solo se ven cubos de sal, sin células. Esta característica ya falla.</li>
        <li>Revisa la nutrición. El cristal no toma energía de su entorno ni la usa para nada.</li>
        <li>Revisa la reproducción. Un pedazo que se rompe no es un cristal nuevo que nació, sino un trozo del mismo.</li>
      </ol>
      <p>Resultado: <span class="resultado">el cristal de sal no es un ser vivo</span>.</p>
      <p>Para comprobarlo por otro camino, piensa en los estímulos: si apagas la luz o le haces ruido, el cristal no responde de ninguna forma.</p>
      <p class="nota"><strong>Error común:</strong> decir que está vivo solo porque crece. Crecer es una pista, pero hace falta cumplir todas las características.</p>`,
    vidaReal: `
      <p>Saber reconocer lo que está vivo te sirve más de lo que parece:</p>
      <ul>
        <li>En una emergencia, revisar si una persona respira y responde te dice cómo ayudarla.</li>
        <li>Las semillas guardadas en un lugar seco y fresco siguen vivas, y pueden brotar años después.</li>
        <li>El moho del pan viejo crece y se extiende porque está vivo y se alimenta del pan.</li>
        <li>Los científicos que buscan vida en otros planetas usan estas mismas pistas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos es un ser vivo?</p>',
        opciones: ['Una nube que crece y se mueve', 'Una semilla de frijol guardada en un frasco', 'Una vela encendida'], correcta: 1,
        pista: '<p>Pregúntate cuál está hecho de células y puede reproducirse, aunque parezca quieto.</p>',
        solucion: '<p>La <strong>semilla</strong>. Está hecha de células y, si la siembras, germina y crece. La nube y la vela cambian, pero no tienen células ni se reproducen.</p>' },
      { tipo: 'texto', enunciado: '<p>Una planta en la ventana inclina su tallo hacia la luz. ¿Qué función vital está realizando: nutrición, relación o reproducción?</p>',
        respuestas: ['relacion', 'la relacion', 'de relacion', 'la de relacion', 'funcion de relacion', 'la funcion de relacion'],
        pista: '<p>La planta detecta un cambio del entorno y responde a él.</p>',
        solucion: '<p>La <strong>relación</strong>. La luz es un estímulo, y la planta responde a él inclinándose.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es un estímulo?</p>',
        opciones: ['Un cambio del entorno que un ser vivo puede detectar', 'El alimento que toma un ser vivo', 'Un ser vivo recién nacido'], correcta: 0,
        pista: '<p>La luz, un ruido y el frío son ejemplos.</p>',
        solucion: '<p>Es <strong>un cambio del entorno que un ser vivo puede detectar</strong>, como la luz o un ruido. Responder a los estímulos es la función de relación.</p>' },
      { tipo: 'numero', enunciado: '<p>En la tabla de la explicación, ¿cuántas de las tres características cumple la semilla?</p>', respuesta: 3,
        pista: '<p>Revisa la fila de la semilla, columna por columna.</p>',
        solucion: '<p>Las <strong>3</strong>: está hecha de células, crece al germinar y la planta que nace dará semillas.</p>' },
      { tipo: 'opciones', enunciado: '<p>El fuego crece y consume oxígeno. ¿Por qué no es un ser vivo?</p>',
        opciones: ['Porque no se mueve', 'Porque necesita oxígeno', 'Porque no está hecho de células'], correcta: 2,
        pista: '<p>Revisa la fila del fuego en la tabla.</p>',
        solucion: '<p>Porque <strong>no está hecho de células</strong>, y tampoco se reproduce. El fuego sí se mueve, y muchos seres vivos también necesitan oxígeno.</p>' },
      { tipo: 'opciones', enunciado: '<p>Cuando corres, tu cuerpo suda. ¿Qué característica de los seres vivos muestra eso?</p>',
        opciones: ['Que se reproducen', 'Que mantienen su interior estable', 'Que están hechos de células'], correcta: 1,
        pista: '<p>¿Para qué sirve sudar cuando haces ejercicio?</p>',
        solucion: '<p>Que <strong>mantienen su interior estable</strong>. El sudor te enfría para que tu temperatura no suba de más.</p>' },
    ],
    fuentes: [
      OCB('1-1-themes-and-concepts-of-biology', 'Themes and Concepts of Biology'),
      OSB('1-2-themes-and-concepts-of-biology', 'Themes and Concepts of Biology'),
      WIKI('Ser_vivo', 'Ser vivo'),
      KHAN('intro-to-biology', 'Introducción a la biología'),
    ],
  });

  // ------------------------------------------------------------------
  const CELULA = diagrama([-0.8, 9.2], [-0.2, 4.8], [
    { tipo: 'circulo', x: 3, y: 2.3, r: 2.1 },
    { tipo: 'circulo', x: 3.2, y: 2.5, r: 0.8, relleno: true },
    ...rotulo(7.6, 4.1, 'membrana', [4.55, 3.85]),
    ...rotulo(7.6, 2.5, 'núcleo', [4.05, 2.5]),
    ...rotulo(7.6, 0.9, 'citoplasma', [3.75, 1.25]),
  ], 'Dibujo de una célula: un círculo grande con un círculo más pequeño y sombreado adentro. Tres rótulos con flechas: membrana, que señala el borde del círculo grande; núcleo, que señala el círculo pequeño; y citoplasma, que señala el espacio entre los dos.');

  L('La célula', {
    objetivo: 'Saber qué es una célula, nombrar sus tres partes básicas y comparar su tamaño con cosas que conoces.',
    explicacion: `
      <p>Una pared está hecha de ladrillos parecidos, pegados uno junto a otro. Tu cuerpo también está hecho de piezas, pero tan pequeñas que no las ves: en el espacio de un grano de arena cabrían miles.</p>
      <p>Una <strong>célula</strong> es la pieza más pequeña que está viva por sí misma. En la lección anterior viste que todo ser vivo está hecho de células. Algunos, como las bacterias, son una sola célula. Tú tienes unos 30 billones, es decir, 3 × 10¹³.</p>
      <h3>Las ideas de la teoría celular</h3>
      <p>El nombre viene de Robert Hooke, que hace unos 350 años miró corcho con uno de los primeros microscopios y vio celdillas como las de un panal. Con el tiempo, los científicos reunieron tres ideas que hoy se llaman teoría celular:</p>
      <ul>
        <li>Todos los seres vivos están formados por una o más células.</li>
        <li>La célula es la unidad más pequeña de la vida, porque sus partes, por separado, no están vivas.</li>
        <li>Toda célula nace de otra célula que se divide en dos.</li>
      </ul>
      <p>La tercera idea explica por qué creces: tus células se dividen una y otra vez, y cada división deja dos células donde había una.</p>
      <h3>Tres partes que casi todas tienen</h3>
      ${CELULA}
      <p>La <strong>membrana</strong> es la capa delgada que envuelve a la célula, como la piel de un globo con agua. Separa el interior del exterior y decide qué entra y qué sale: deja pasar el agua y el alimento, y saca los desechos.</p>
      <p>Por dentro, la célula está llena de citoplasma, un líquido espeso parecido a la gelatina. En él flotan las piezas que hacen el trabajo, como fabricar proteínas, esas cadenas largas que viste en Química.</p>
      <p>El <strong>núcleo</strong> es una bolsa dentro de la célula que guarda el ADN, la molécula con las instrucciones para construir y hacer funcionar al ser vivo. Es como la oficina donde se guardan los planos de una fábrica.</p>
      <p>Ahora bien, no todas las células tienen núcleo. Las bacterias tienen su ADN suelto en el citoplasma, y por eso se dice que son células sin núcleo (los biólogos las llaman procariotas). Las células de animales, plantas y hongos sí lo tienen (son eucariotas).</p>
      <h3>¿Qué tan pequeñas son?</h3>
      <p>Las células se miden en micrómetros, que se escriben µm. Un milímetro, la rayita más pequeña de tu regla, tiene 1 000 µm. Una célula típica de tu cuerpo mide unos 10 µm, así que en un milímetro caben 1 000 ÷ 10 = 100 células en fila. Una bacteria típica mide alrededor de 1 µm, unas 10 veces menos.</p>
      <p>Un microscopio que aumenta 400 veces hace que esa célula de 10 µm se vea como si midiera 10 × 400 = 4 000 µm, o sea, 4 mm. Por eso se alcanza a distinguir.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que un animal grande tiene células más grandes. Las células de un elefante miden casi lo mismo que las de un ratón. El elefante es grande porque tiene muchísimas más.</p>`,
    ejemplo: `
      <p>Las células de tu mejilla miden unos 60 µm. Con un microscopio que aumenta 100 veces, ¿cuántos milímetros parece medir una?</p>
      <ol class="pasos-ej">
        <li>Primero calcula el tamaño aumentado. Aumentar 100 veces es multiplicar por 100: 60 × 100 = 6 000 µm.</li>
        <li>Ahora pasa a milímetros. Como 1 mm tiene 1 000 µm, divide entre 1 000: 6 000 ÷ 1 000 = 6 mm.</li>
        <li>Comprueba por otro camino: convierte primero. 60 µm son 60 ÷ 1 000 = 0.06 mm, y 0.06 × 100 = 6 mm. Las dos formas coinciden.</li>
      </ol>
      <p>Resultado: <span class="resultado">parece medir 6 mm</span>, más o menos lo que mide una lenteja.</p>
      <p class="nota"><strong>Error común:</strong> olvidar el cambio de unidades y contestar 6 000 mm, que serían 6 metros. Si el resultado es más grande que el microscopio, revisa las unidades.</p>`,
    vidaReal: `
      <p>Las células están detrás de cosas que ves todos los días:</p>
      <ul>
        <li>Cuando te cortas, la herida se cierra porque las células de tu piel se dividen y forman piel nueva.</li>
        <li>Un análisis de sangre cuenta cuántas células de cada tipo tienes, y así el médico sabe si algo anda mal.</li>
        <li>El jabón ayuda a eliminar gérmenes porque rompe la envoltura de muchos de ellos.</li>
        <li>Los médicos miran células al microscopio para encontrar enfermedades a tiempo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una célula mide 20 µm. ¿Cuántas cabrían en fila en 1 mm?</p>', respuesta: 1000 / 20,
        pista: '<p>Recuerda que 1 mm tiene 1 000 µm.</p>',
        solucion: '<p>1 000 ÷ 20 = <strong>50 células</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué parte de la célula decide qué entra y qué sale?</p>',
        opciones: ['El núcleo', 'El citoplasma', 'La membrana'], correcta: 2,
        pista: '<p>Es la capa que la envuelve, como la piel de un globo.</p>',
        solucion: '<p>La <strong>membrana</strong>. Envuelve a la célula y deja pasar el agua y el alimento. El núcleo guarda el ADN y el citoplasma es el relleno.</p>' },
      { tipo: 'numero', enunciado: '<p>Un glóbulo rojo mide unos 8 µm. Con un microscopio que aumenta 400 veces, ¿cuántos milímetros parece medir?</p>', respuesta: 8 * 400 / 1000, tolerancia: 0.01,
        pista: '<p>Multiplica por 400 y después pasa de µm a mm.</p>',
        solucion: '<p>8 × 400 = 3 200 µm, y 3 200 ÷ 1 000 = <strong>3.2 mm</strong>.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué parte de la célula guarda el ADN?</p>', respuestas: ['nucleo', 'el nucleo', 'nucleo celular', 'el nucleo celular'],
        pista: '<p>Es la bolsa que funciona como la oficina de los planos.</p>',
        solucion: '<p>El <strong>núcleo</strong>, en las células que lo tienen. En las bacterias, el ADN está suelto en el citoplasma.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas ideas forma parte de la teoría celular?</p>',
        opciones: ['Toda célula nace de otra célula', 'Las células pueden formarse solas a partir del polvo', 'Solo los animales están hechos de células'], correcta: 0,
        pista: '<p>Piensa en cómo creces: de dónde salen tus células nuevas.</p>',
        solucion: '<p><strong>Toda célula nace de otra célula</strong>, que se divide en dos. Las plantas, los hongos y las bacterias también están hechos de células.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una bacteria no tiene núcleo. ¿Dónde está su ADN?</p>',
        opciones: ['Fuera de la membrana', 'Suelto en el citoplasma', 'No tiene ADN'], correcta: 1,
        pista: '<p>Toda célula necesita sus instrucciones, aunque no tenga una bolsa para guardarlas.</p>',
        solucion: '<p><strong>Suelto en el citoplasma</strong>. Por eso se dice que es una célula sin núcleo, o procariota.</p>' },
    ],
    fuentes: [
      OCB('3-1-how-cells-are-studied', 'How Cells Are Studied'),
      OCB('3-2-comparing-prokaryotic-and-eukaryotic-cells', 'Comparing Prokaryotic and Eukaryotic Cells'),
      WIKI('Célula', 'Célula'),
      WIKI('Teoría_celular', 'Teoría celular'),
      KHAN('structure-of-a-cell', 'Estructura de una célula'),
    ],
  });

  // ------------------------------------------------------------------
  const ANIMAL = diagrama([-0.8, 9.2], [-0.2, 4.9], [
    { tipo: 'circulo', x: 2.8, y: 2.4, r: 2.2 },
    { tipo: 'circulo', x: 2.4, y: 2.8, r: 0.7, relleno: true },
    { tipo: 'circulo', x: 3.5, y: 1.3, r: 0.35 },
    ...rotulo(7.6, 4.4, 'membrana', [4.3, 4.05]),
    ...rotulo(7.6, 2.8, 'núcleo', [3.15, 2.8]),
    ...rotulo(7.6, 1.2, 'mitocondria', [3.9, 1.27]),
  ], 'Célula animal: un círculo grande y redondeado. Adentro, un círculo sombreado rotulado núcleo y un círculo pequeño rotulado mitocondria. Otro rótulo, membrana, señala el borde del círculo grande. No tiene pared ni cloroplastos.');

  const VEGETAL = diagrama([-0.5, 9.5], [-0.8, 5.1], [
    caja(0.3, 0.2, 5.3, 4.6),
    caja(0.6, 0.5, 5.0, 4.3),
    caja(1.0, 0.9, 3.1, 3.9, true),
    { tipo: 'circulo', x: 4.1, y: 3.5, r: 0.45, relleno: true },
    { tipo: 'circulo', x: 4.1, y: 2.3, r: 0.3, relleno: true },
    { tipo: 'circulo', x: 4.1, y: 1.2, r: 0.22 },
    txt(2.05, 2.4, 'vacuola'),
    ...rotulo(8.0, 4.75, 'pared celular', [5.35, 4.45]),
    ...rotulo(8.0, 3.95, 'membrana', [5.02, 3.95]),
    ...rotulo(8.0, 3.15, 'núcleo', [4.55, 3.45]),
    ...rotulo(8.0, 2.3, 'cloroplasto', [4.42, 2.3]),
    ...rotulo(8.0, 1.45, 'mitocondria', [4.34, 1.25]),
  ], 'Célula vegetal: un rectángulo con dos bordes, uno por fuera rotulado pared celular y otro justo por dentro rotulado membrana. Adentro, un rectángulo grande sombreado con la palabra vacuola, que ocupa casi la mitad de la célula. A su lado hay tres círculos rotulados, de arriba abajo: núcleo, cloroplasto y mitocondria.');

  L('Célula animal y célula vegetal', {
    objetivo: 'Distinguir una célula animal de una vegetal por sus partes, y explicar para qué sirve cada una.',
    explicacion: `
      <p>Una hoja de lechuga fresca cruje al morderla, y un pedazo de carne no. Además, un árbol se mantiene de pie durante siglos sin tener ni un hueso. Las dos cosas se explican mirando sus células.</p>
      <p>En la lección anterior viste que casi todas las células tienen membrana, citoplasma y núcleo. Las células de animales y de plantas comparten esas tres partes, pero las de las plantas tienen piezas extra, porque las plantas viven de otra forma: no se mueven y fabrican su propio alimento.</p>
      <h3>Lo que tienen las dos</h3>
      <p>Además de membrana, citoplasma y núcleo, las dos tienen mitocondrias. Son piezas pequeñas, con forma de frijol, que sacan la energía guardada en el alimento para que la célula la pueda usar. Por eso se les dice "la central de energía de la célula". Las plantas también las tienen, porque también necesitan sacar energía de su alimento.</p>
      ${ANIMAL}
      <h3>Lo que tienen las plantas y no los animales</h3>
      <p>La <strong>pared celular</strong> es una capa dura que rodea a la membrana por fuera, como la caja que protege a un globo. Está hecha de celulosa, un material resistente formado por cadenas largas de azúcar. Gracias a ella, la célula vegetal tiene una forma fija, casi siempre como un ladrillo, y la planta se sostiene sin huesos. La madera y el papel son, en gran parte, paredes celulares.</p>
      <p>El <strong>cloroplasto</strong> es la pieza verde donde la planta fabrica su alimento con la luz del Sol. A este proceso se le llama fotosíntesis, y con lo que aprendiste de ecuaciones químicas se escribe así:</p>
      <p>6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</p>
      <p>Se lee "seis moléculas de dióxido de carbono más seis de agua dan una de glucosa y seis de oxígeno". La glucosa es un azúcar, y la luz pone la energía para fabricarla. Por eso las plantas necesitan sol, agua y aire, y por eso sueltan el oxígeno que respiras. Son verdes por la clorofila, la sustancia que atrapa la luz. Las células de las raíces, que viven a oscuras, no tienen cloroplastos.</p>
      <p>La <strong>vacuola</strong> es una bolsa llena de agua. En las plantas es tan grande que ocupa casi toda la célula. Cuando está llena, empuja contra la pared y la célula queda firme, como un balón bien inflado; por eso la lechuga fresca cruje. Si la planta no recibe agua, sus vacuolas se vacían y las hojas se ponen lacias. Las células animales también pueden tener vacuolas, pero son pequeñas.</p>
      ${VEGETAL}
      <p>Compara los dos dibujos. La célula animal suele ser redondeada y flexible. La vegetal tiene forma de caja, con pared, cloroplastos y una vacuola grande.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que las plantas no respiran porque hacen fotosíntesis. De día y de noche, sus mitocondrias usan oxígeno para sacar energía del azúcar, igual que las tuyas. Lo que pasa es que de día la fotosíntesis produce más oxígeno del que gastan.</p>`,
    ejemplo: `
      <p>Al microscopio ves unas células con forma de ladrillo, un borde grueso alrededor y muchos granitos verdes. Cada una tiene un núcleo. ¿Son de una planta o de un animal?</p>
      <ol class="pasos-ej">
        <li>Fíjate en la forma. Una forma fija de caja, con un borde grueso, indica que hay pared celular. Las células animales no la tienen.</li>
        <li>Fíjate en el color. Los granitos verdes son cloroplastos, donde se hace la fotosíntesis. Solo los tienen las plantas y las algas.</li>
        <li>Fíjate en el núcleo. Como lo tienen, no son bacterias.</li>
        <li>Junta las pistas: pared y cloroplastos solo aparecen juntos en plantas y algas. Como hay cloroplastos, vienen de una parte que recibe luz, como una hoja, y no de una raíz.</li>
      </ol>
      <p>Resultado: <span class="resultado">son células vegetales</span>, o de un alga.</p>
      <p>Para comprobarlo, busca una vacuola grande que ocupe casi toda la célula. Si la encuentras, confirma que es vegetal.</p>
      <p class="nota"><strong>Error común:</strong> decidir por el núcleo o las mitocondrias. Esas partes están en los dos tipos de célula, así que no sirven para distinguirlas.</p>`,
    vidaReal: `
      <p>Lo que pasa dentro de las plantas se nota en tu vida diaria:</p>
      <ul>
        <li>Las verduras se ponen lacias porque pierden agua, y si las remojas en agua fría recuperan su firmeza.</li>
        <li>La madera, el papel y el algodón de tu ropa vienen de la parte dura que envuelve a las células de las plantas.</li>
        <li>La fibra de la comida, que ayuda a tu digestión, es ese mismo material, que tu cuerpo no puede deshacer.</li>
        <li>El oxígeno que respiras lo producen las plantas y las algas con la luz del Sol.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas partes tiene una célula vegetal pero no una animal?</p>',
        opciones: ['Mitocondria', 'Núcleo', 'Pared celular'], correcta: 2,
        pista: '<p>Busca la parte que le da a la planta su forma fija.</p>',
        solucion: '<p>La <strong>pared celular</strong>. El núcleo y las mitocondrias están en los dos tipos de célula.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una planta lleva días sin agua y sus hojas cuelgan. ¿Qué pasó en sus células?</p>',
        opciones: ['Sus vacuolas perdieron agua y ya no empujan contra la pared', 'Sus paredes celulares se disolvieron', 'Sus núcleos salieron de la célula'], correcta: 0,
        pista: '<p>¿Qué parte, llena de agua, mantiene firme a la célula?</p>',
        solucion: '<p>Sus <strong>vacuolas perdieron agua</strong>. Al vaciarse, dejan de empujar contra la pared y la hoja se pone lacia. Si la riegas a tiempo, se recupera.</p>' },
      { tipo: 'numero', enunciado: '<p>En la fotosíntesis, la planta produce 6O₂. ¿Cuántos átomos de oxígeno hay ahí?</p>', respuesta: 6 * 2,
        pista: '<p>Multiplica el coeficiente por el subíndice, como en Química.</p>',
        solucion: '<p>6 moléculas con 2 átomos cada una: 6 × 2 = <strong>12 átomos de oxígeno</strong>.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la parte verde de la célula vegetal donde se hace la fotosíntesis?</p>',
        respuestas: ['cloroplasto', 'cloroplastos', 'el cloroplasto', 'los cloroplastos'],
        pista: '<p>Su nombre viene de "cloro", que en griego significa verde.</p>',
        solucion: '<p>El <strong>cloroplasto</strong>. Es verde por la clorofila, que atrapa la luz.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas afirmaciones es verdadera?</p>',
        opciones: ['Las plantas no tienen mitocondrias porque hacen fotosíntesis', 'Las plantas y los animales tienen mitocondrias', 'Solo las células animales tienen membrana'], correcta: 1,
        pista: '<p>Las plantas también necesitan sacar energía de su alimento.</p>',
        solucion: '<p><strong>Las dos tienen mitocondrias</strong>, porque las dos sacan energía del azúcar. Y las dos tienen membrana; la planta tiene, además, la pared por fuera.</p>' },
      { tipo: 'numero', enunciado: '<p>Para fabricar una molécula de glucosa, una planta usa 6 moléculas de CO₂. ¿Cuántas necesita para fabricar 5 de glucosa?</p>', respuesta: 5 * 6,
        pista: '<p>Cada glucosa necesita 6 de CO₂.</p>',
        solucion: '<p>5 × 6 = <strong>30 moléculas de CO₂</strong>. Por eso las plantas sacan tanto CO₂ del aire.</p>' },
    ],
    fuentes: [
      OCB('3-3-eukaryotic-cells', 'Eukaryotic Cells'),
      OSB('4-3-eukaryotic-cells', 'Eukaryotic Cells'),
      WIKI('Célula_vegetal', 'Célula vegetal'),
      WIKI('Célula_animal', 'Célula animal'),
    ],
  });

  // ------------------------------------------------------------------
  L('Clasificación de los seres vivos', {
    objetivo: 'Entender cómo se agrupan los seres vivos, de los grupos grandes a los pequeños, y leer un nombre científico.',
    explicacion: `
      <p>En un supermercado no buscas la leche anaquel por anaquel. Vas al pasillo de lácteos, luego al refrigerador de las leches y ahí eliges. Como todo está agrupado por parecidos, encuentras algo entre miles de productos en un minuto.</p>
      <p>Con los seres vivos pasa lo mismo, pero hay muchos más: los científicos ya han descrito cerca de 2 millones de tipos distintos, y faltan muchos por conocer. Para no perderse, los agrupan según lo que tienen en común. A esa tarea se le llama clasificar.</p>
      <h3>La especie, el grupo más pequeño</h3>
      <p>Una <strong>especie</strong> es un grupo de seres vivos tan parecidos que, en la naturaleza, pueden tener crías juntos, y esas crías también pueden tenerlas. Todos los perros son de la misma especie: un chihuahua y un gran danés se ven muy distintos, pero pueden cruzarse. En cambio, el caballo y el burro son especies distintas: su cría, la mula, casi nunca puede tener crías.</p>
      <h3>De los grupos grandes a los pequeños</h3>
      <p>Las especies parecidas se juntan en grupos más grandes, y estos en otros mayores, como cajas dentro de cajas. La tabla muestra los ocho niveles, del más grande al más pequeño, para el ser humano y para el gato:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Nivel</th><th>Ser humano</th><th>Gato</th></tr>
        <tr><th>Dominio</th><td>Eucariotas</td><td>Eucariotas</td></tr>
        <tr><th>Reino</th><td>Animales</td><td>Animales</td></tr>
        <tr><th>Filo</th><td>Cordados</td><td>Cordados</td></tr>
        <tr><th>Clase</th><td>Mamíferos</td><td>Mamíferos</td></tr>
        <tr><th>Orden</th><td>Primates</td><td>Carnívoros</td></tr>
        <tr><th>Familia</th><td>Homínidos</td><td>Félidos</td></tr>
        <tr><th>Género</th><td><i lang="la">Homo</i></td><td><i lang="la">Felis</i></td></tr>
        <tr><th>Especie</th><td><i lang="la">Homo sapiens</i></td><td><i lang="la">Felis catus</i></td></tr>
      </table></div>
      <p>Mientras más niveles comparten dos seres vivos, más parecidos son y más cercanos están en la familia de la vida. El humano y el gato comparten cuatro niveles, hasta la clase: los dos son mamíferos, porque tienen pelo y alimentan a sus crías con leche. A partir del orden se separan.</p>
      <h3>Los reinos</h3>
      <p>El <strong>reino</strong> es el segundo nivel más grande. En la escuela se suelen usar cinco:</p>
      <ul>
        <li>Los animales se alimentan de otros seres vivos, y casi todos se mueven por sí mismos.</li>
        <li>Las plantas fabrican su alimento con la luz, gracias a sus cloroplastos.</li>
        <li>Los hongos, como los champiñones y el moho, absorben su alimento de lo que los rodea.</li>
        <li>Los protistas son, en su mayoría, seres de una sola célula con núcleo, como las amebas y muchas algas.</li>
        <li>Las moneras son las bacterias, que son células sin núcleo.</li>
      </ul>
      <p>Hoy muchos biólogos agrupan los reinos en los tres dominios: dos de células sin núcleo, las bacterias y las arqueas, y uno de células con núcleo, los eucariotas.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que los hongos son plantas porque crecen en el suelo y no se mueven. No tienen cloroplastos ni hacen fotosíntesis. Se alimentan absorbiendo comida, y en eso se parecen más a los animales que a las plantas.</p>
      <h3>¿Cómo se lee un nombre científico?</h3>
      <p>Un mismo animal tiene nombres distintos según el país: el puma también se llama león de montaña. Para entenderse, los científicos le dan a cada especie un <strong>nombre científico</strong> de dos palabras en latín, igual en todo el mundo. La primera es el género y va con mayúscula; la segunda distingue a la especie dentro de su género y va con minúscula. Se escribe en cursiva, como <i lang="la">Homo sapiens</i>, que quiere decir "humano sabio".</p>`,
    ejemplo: `
      <p>El león se llama <i lang="la">Panthera leo</i> y el tigre, <i lang="la">Panthera tigris</i>. ¿Cuántos niveles comparten?</p>
      <ol class="pasos-ej">
        <li>Lee la primera palabra de cada nombre. Las dos dicen <i lang="la">Panthera</i>, así que son del mismo género.</li>
        <li>Si comparten el género, comparten también todos los niveles de arriba, porque cada caja está dentro de la anterior: familia, orden, clase, filo, reino y dominio.</li>
        <li>Lee la segunda palabra. Es distinta, así que son especies diferentes.</li>
        <li>Cuenta: del dominio al género hay 7 niveles, y el octavo, la especie, ya no lo comparten.</li>
      </ol>
      <p>Resultado: <span class="resultado">comparten 7 de los 8 niveles</span>, así que son parientes muy cercanos.</p>
      <p>Compruébalo con la tabla: el humano y el gato, de géneros distintos, comparten solo 4. Tiene sentido que el león y el tigre se parezcan mucho más.</p>
      <p class="nota"><strong>Error común:</strong> tomar la segunda palabra sola como nombre de la especie. "<i lang="la">leo</i>" no basta; el nombre de la especie son las dos palabras juntas.</p>`,
    vidaReal: `
      <p>Agrupar a los seres vivos por parecidos tiene usos muy prácticos:</p>
      <ul>
        <li>Un nombre igual en todo el mundo evita confundir una planta comestible con una venenosa de nombre parecido.</li>
        <li>El tomate y la papa son parientes cercanos, y por eso los agricultores saben que los atacan plagas parecidas.</li>
        <li>Los médicos identifican el tipo exacto de ser diminuto que causa una infección para elegir la medicina correcta.</li>
        <li>En un zoológico, los letreros con dos palabras en latín te dicen el nombre que usan los científicos de todos los países.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos grupos contiene a los otros dos?</p>',
        opciones: ['Género', 'Reino', 'Familia'], correcta: 1,
        pista: '<p>Revisa en la tabla cuál está más arriba.</p>',
        solucion: '<p>El <strong>reino</strong>, que es el segundo nivel más grande. Dentro de un reino hay muchas familias, y dentro de cada familia, varios géneros.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cuál es el género de <i lang="la">Homo sapiens</i>?</p>', respuestas: ['homo'],
        pista: '<p>Es la primera de las dos palabras, la que va con mayúscula.</p>',
        solucion: '<p><strong><i lang="la">Homo</i></strong>. La primera palabra de un nombre científico es siempre el género.</p>' },
      { tipo: 'numero', enunciado: '<p>El león (<i lang="la">Panthera leo</i>) y el gato (<i lang="la">Felis catus</i>) son de la misma familia, los félidos, pero de géneros distintos. ¿Cuántos niveles comparten, contando desde el dominio?</p>', respuesta: 6,
        pista: '<p>Cuenta en la tabla desde el dominio hasta la familia.</p>',
        solucion: '<p>Dominio, reino, filo, clase, orden y familia: <strong>6 niveles</strong>. Se separan en el género.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿A qué reino pertenece el champiñón?</p>',
        opciones: ['Plantas', 'Animales', 'Hongos'], correcta: 2,
        pista: '<p>No tiene cloroplastos y absorbe su alimento.</p>',
        solucion: '<p>A los <strong>hongos</strong>. Aunque crece en el suelo, no hace fotosíntesis, así que no es una planta.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas parejas está más emparentada?</p>',
        opciones: ['Un perro y un pez', 'El lobo (<i lang="la">Canis lupus</i>) y el coyote (<i lang="la">Canis latrans</i>)', 'Un hongo y una planta'], correcta: 1,
        pista: '<p>Busca la pareja que comparte la primera palabra de su nombre científico.</p>',
        solucion: '<p><strong>El lobo y el coyote</strong>, porque son del mismo género, <i lang="la">Canis</i>, y comparten 7 niveles. El perro y el pez solo comparten hasta el filo, y el hongo y la planta, solo el dominio.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos nombres científicos está bien escrito?</p>',
        opciones: ['<i lang="la">Felis catus</i>', '<i lang="la">felis Catus</i>', '<i lang="la">Catus</i>'], correcta: 0,
        pista: '<p>Son dos palabras: el género con mayúscula y la segunda con minúscula.</p>',
        solucion: '<p><strong><i lang="la">Felis catus</i></strong>. El género va primero y con mayúscula, y la segunda palabra va con minúscula. Una sola palabra no basta para nombrar una especie.</p>' },
    ],
    fuentes: [
      OSB('20-1-organizing-life-on-earth', 'Organizing Life on Earth'),
      WIKI('Taxonomía', 'Taxonomía'),
      WIKI('Reino_(biología)', 'Reino (biología)'),
      WIKI('Nomenclatura_binomial', 'Nomenclatura binomial'),
    ],
  });

  // ------------------------------------------------------------------
  const DIVISION = barras({ etiquetas: ['0', '20', '40', '60', '80', '100', '120'], valores: [1, 2, 4, 8, 16, 32, 64], max: 70, paso: 10,
    descripcion: 'Gráfica de barras del número de bacterias según los minutos que pasan, si se dividen cada 20 minutos. A los 0 minutos hay 1; a los 20, 2; a los 40, 4; a los 60, 8; a los 80, 16; a los 100, 32; y a los 120, 64. Cada barra mide el doble que la anterior.' });

  L('Microorganismos: bacterias, virus y hongos', {
    objetivo: 'Distinguir bacterias, hongos microscópicos y virus, saber cuáles nos ayudan y cuáles nos enferman, y entender por qué los antibióticos no sirven contra los virus.',
    explicacion: `
      <p>El yogur, el pan esponjoso, la gripe y una infección de garganta tienen algo en común: en todos actúa algo tan pequeño que no lo puedes ver. Casi siempre son <strong>microorganismos</strong>, o microbios: seres vivos que solo se ven con microscopio. Están en el aire, en el agua, en la tierra y dentro de ti.</p>
      <h3>Bacterias</h3>
      <p>Las bacterias son células sin núcleo, como viste en la lección de la célula, y miden alrededor de 1 µm. Se multiplican partiéndose en dos: una forma dos, cada una de esas forma otras dos, y así sigue. En condiciones ideales, algunas lo hacen cada 20 minutos. En la gráfica, abajo están los minutos y encima de cada barra, cuántas bacterias hay:</p>
      ${DIVISION}
      <p>El número se duplica en cada paso. Después de n divisiones hay 2ⁿ bacterias, que se lee "dos elevado a la n": n es cuántas veces se han dividido. Por eso la comida que se deja fuera del refrigerador se echa a perder tan rápido.</p>
      <p>La mayoría de las bacterias no hace daño, y muchas son útiles: las de tu intestino te ayudan a digerir, y otras convierten la leche en yogur. Solo unas pocas causan enfermedades, como algunas infecciones de garganta o de orina.</p>
      <h3>Hongos microscópicos</h3>
      <p>Algunos hongos son tan pequeños que solo se ven con microscopio. La levadura es un hongo de una sola célula: come el azúcar de la masa y suelta CO₂, cuyas burbujas inflan el pan. El moho del pan viejo también es un hongo: lo que ves es un montón de hilitos diminutos juntos. Unos pocos causan infecciones, como el pie de atleta.</p>
      <h3>Virus</h3>
      <p>Un <strong>virus</strong> es todavía más pequeño: uno típico mide unos 0.1 µm, diez veces menos que una bacteria. No es una célula. Es una cápsula de proteína con instrucciones adentro, y no come ni crece. Para multiplicarse entra en una célula viva y la obliga a fabricar copias del virus. Como solo cumple algunas características de los seres vivos, y solo dentro de una célula, se considera que está en la frontera entre lo vivo y lo no vivo. Los virus causan la gripe, el resfriado y el sarampión.</p>
      <h3>Antibióticos: contra bacterias, no contra virus</h3>
      <p>Un <strong>antibiótico</strong> es una medicina que mata bacterias o les impide multiplicarse. Funciona porque ataca partes que tienen las bacterias y no tus células, como la pared que las rodea. Un virus no tiene esas partes, así que el antibiótico no le hace nada: no cura la gripe ni el resfriado.</p>
      <p>Usar antibióticos cuando no hacen falta tiene un costo. Las bacterias que logran sobrevivir se multiplican, y así aparecen bacterias resistentes, contra las que el antibiótico ya no funciona. La Organización Mundial de la Salud lo considera una de las mayores amenazas para la salud. Por eso, tómalos solo si te los receta un médico, y como te lo indique.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que todos los microbios son dañinos. Sin las bacterias de tu intestino digerirías peor, y sin levadura no habría pan.</p>
      <p class="nota"><strong>Cuándo buscar ayuda:</strong> si tienes fiebre muy alta, te cuesta respirar o te sientes peor después de unos días, busca atención médica.</p>`,
    ejemplo: `
      <p>Una bacteria cae en un plato de arroz que se quedó fuera del refrigerador. Si se divide cada 20 minutos, ¿cuántas habrá en 3 horas?</p>
      <ol class="pasos-ej">
        <li>Primero pasa las horas a minutos, porque el tiempo de división está en minutos: 3 × 60 = 180 minutos.</li>
        <li>Calcula cuántas veces se divide: 180 ÷ 20 = 9 divisiones.</li>
        <li>Cada división duplica el número, así que multiplicas por 2 nueve veces: 2⁹ = 512.</li>
        <li>Comprueba duplicando paso a paso: 1, 2, 4, 8, 16, 32, 64, 128, 256 y 512. Son nueve duplicaciones.</li>
      </ol>
      <p>Resultado: <span class="resultado">512 bacterias</span>. En la vida real casi nunca empieza una sola, así que serían muchas más. Por eso conviene meter la comida al refrigerador pronto.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar 9 × 2 = 18. El número no aumenta de 2 en 2, sino que se duplica cada vez.</p>`,
    vidaReal: `
      <p>Los seres diminutos que no ves influyen en tu salud y en tu cocina:</p>
      <ul>
        <li>Guardar la comida en el refrigerador frena a los seres diminutos que la echan a perder.</li>
        <li>Lavarte las manos con jabón quita muchos gérmenes que causan diarrea y resfriados.</li>
        <li>El yogur, el queso, el pan y el vinagre se hacen con ayuda de seres que no se ven a simple vista.</li>
        <li>Saber qué causa una enfermedad te ayuda a entender por qué el médico receta una medicina y no otra.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una bacteria se divide cada 20 minutos. Si empiezas con una, ¿cuántas habrá después de 4 horas?</p>', respuesta: 2 ** (4 * 60 / 20),
        pista: '<p>Pasa las 4 horas a minutos y calcula cuántas divisiones caben.</p>',
        solucion: '<p>4 horas son 240 minutos, y 240 ÷ 20 = 12 divisiones. Como cada una duplica el número, hay 2¹² = <strong>4 096 bacterias</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una bacteria mide 2 µm y un virus mide 0.1 µm. ¿Cuántas veces más grande es la bacteria?</p>', respuesta: 2 / 0.1, tolerancia: 0.01,
        pista: '<p>Divide el tamaño de la bacteria entre el del virus.</p>',
        solucion: '<p>2 ÷ 0.1 = <strong>20 veces</strong>. En el largo de esa bacteria cabrían 20 virus en fila.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tienes un resfriado común. ¿Te sirve un antibiótico?</p>',
        opciones: ['Sí, porque mata todos los microbios', 'No, porque el resfriado lo causa un virus', 'Sí, porque baja la fiebre de cualquier enfermedad'], correcta: 1,
        pista: '<p>Piensa contra qué tipo de microbio funcionan los antibióticos.</p>',
        solucion: '<p><strong>No</strong>. El resfriado lo causa un virus, y los antibióticos solo atacan bacterias. Tomarlo sin necesidad ayuda a que aparezcan bacterias resistentes.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es la levadura que se usa para hacer pan?</p>',
        opciones: ['Un hongo de una sola célula', 'Una bacteria', 'Un virus'], correcta: 0,
        pista: '<p>Revisa la sección de hongos microscópicos.</p>',
        solucion: '<p>Es <strong>un hongo de una sola célula</strong>. Come el azúcar de la masa y suelta CO₂, que infla el pan.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama lo que no es una célula y solo puede multiplicarse dentro de una célula viva?</p>',
        respuestas: ['virus', 'un virus', 'los virus', 'el virus'],
        pista: '<p>Es una cápsula de proteína con instrucciones adentro.</p>',
        solucion: '<p>Un <strong>virus</strong>. Por eso está en la frontera entre lo vivo y lo no vivo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué aparecen bacterias resistentes a los antibióticos?</p>',
        opciones: ['Porque las bacterias se convierten en virus', 'Porque tu cuerpo se acostumbra a los antibióticos', 'Porque al usar antibióticos de más, sobreviven y se multiplican las que los aguantan'], correcta: 2,
        pista: '<p>Piensa qué pasa con las pocas bacterias que no mueren.</p>',
        solucion: '<p>Porque <strong>las que aguantan el antibiótico sobreviven y se multiplican</strong>. Mientras más se usan sin necesidad, más bacterias resistentes hay. No es tu cuerpo el que se acostumbra: son las bacterias las que sobreviven.</p>' },
    ],
    fuentes: [
      OSB('22-1-prokaryotic-diversity', 'Prokaryotic Diversity'),
      OSB('21-1-viral-evolution-morphology-and-classification', 'Viral Evolution, Morphology, and Classification'),
      OSB('24-1-characteristics-of-fungi', 'Characteristics of Fungi'),
      WIKI('Microorganismo', 'Microorganismo'),
      MEDLINE('antibiotics.html', 'Antibióticos'),
      MEDLINE('antibioticresistance.html', 'Resistencia a los antibióticos'),
      OMS('news-room/fact-sheets/detail/antimicrobial-resistance', 'Resistencia a los antimicrobianos'),
    ],
  });
})();
