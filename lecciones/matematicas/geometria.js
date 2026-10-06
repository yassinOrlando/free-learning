// Matemáticas · Unidad 4: Geometría.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const F = window.fraccion;
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('matematicas', titulo, datos);
  // Figura geométrica: misma escala en ambos ejes y sin cuadrícula.
  const fig = (x, y, figuras, descripcion, extra = {}) => G({ x, y, figuras, descripcion, proporcional: true, ejes: false, ...extra });
  const raya = (...puntos) => ({ tipo: 'poligono', puntos, abierto: true });
  const oculta = (desde, hasta) => ({ tipo: 'linea', desde, hasta, punteada: true });
  const txt = (x, y, texto) => ({ tipo: 'texto', x, y, texto });
  const tolPi = (v) => Math.abs(v) * 0.002; // acepta π ≈ 3.14 (error 0.05%) y redondeo a un decimal

  const PA = (pagina, nombre) => ({ nombre: `OpenStax, Prealgebra 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/prealgebra-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = { nombre: 'Khan Academy en español: Geometría', url: 'https://es.khanacademy.org/math/geometry' };
  const KHAN_BASE = { nombre: 'Khan Academy en español: Geometría básica', url: 'https://es.khanacademy.org/math/basic-geo' };

  // ------------------------------------------------------------------
  // Transversal a 65° que corta dos paralelas (y = 1, y = 3) en (3, 1) y (3.933, 3).
  const TRANSVERSAL = fig([0, 8], [0, 4], [
    raya([0, 1], [8, 1]), raya([0, 3], [8, 3]), { ...raya([2.534, 0], [4.399, 4]), serie: 1 },
    { tipo: 'angulo', x: 3, y: 1, desde: 0, hasta: 65, r: 0.5, etiqueta: 'a' },
    { tipo: 'angulo', x: 3, y: 1, desde: 65, hasta: 180, r: 0.35, etiqueta: 'c' },
    { tipo: 'angulo', x: 3.933, y: 3, desde: 0, hasta: 65, r: 0.5, etiqueta: 'b' },
  ], 'Dos rectas paralelas horizontales cortadas por una transversal inclinada. El ángulo a está arriba a la derecha del primer cruce, c a su izquierda (también arriba), y b en el segundo cruce en la misma posición que a.');

  L('Puntos, rectas y ángulos', {
    objetivo: 'Reconocer los elementos básicos de la geometría, clasificar ángulos y calcular ángulos complementarios, suplementarios y opuestos.',
    explicacion: `
      <p>Piensa en un mapa de tu colonia. Tu casa es un lugar exacto, las calles son líneas derechas y, en cada esquina, dos calles se cruzan y forman una "abertura". La geometría estudia justo eso: lugares, líneas y aberturas. Son las piezas con las que después se construyen todas las figuras.</p>
      <h3>¿Cuáles son las piezas básicas?</h3>
      <ul>
        <li>Un <strong>punto</strong> marca una posición exacta, como la tachuela que clavas en un mapa. No tiene tamaño. Se nombra con una letra mayúscula, por ejemplo A.</li>
        <li>Una <strong>recta</strong> es una línea derecha que nunca termina: sigue y sigue hacia los dos lados.</li>
        <li>Un <strong>segmento</strong> es un pedazo de recta entre dos puntos, como una regla. Si los puntos son A y B, se llama AB, y sí se puede medir.</li>
        <li>Un <strong>rayo</strong> (también llamado semirrecta) empieza en un punto y sigue sin fin hacia un solo lado, como la luz de una linterna.</li>
      </ul>
      <p>Dos rectas pueden relacionarse de dos maneras especiales. Son <strong>paralelas</strong> si nunca se cruzan, como los rieles del tren. Son <strong>perpendiculares</strong> si se cruzan formando una esquina perfecta, como la esquina de una hoja de papel.</p>
      <h3>¿Qué es un ángulo y cómo se mide?</h3>
      <p>Abre un abanico o las tijeras: las dos hojas salen del mismo punto y entre ellas queda una abertura. Esa abertura es un <strong>ángulo</strong>. Está formado por dos rayos que salen del mismo punto, y ese punto se llama <strong>vértice</strong>.</p>
      <p>Los ángulos se miden en <strong>grados</strong>, que se escriben con un circulito: 90°. Una vuelta completa, como la que da la manecilla de un reloj en una hora, son 360°. Media vuelta son 180° y un cuarto de vuelta, 90°.</p>
      ${fig([0, 14], [0, 4], [
        raya([3.30, 2.43], [1, 0.5], [4, 0.5]), { tipo: 'angulo', x: 1, y: 0.5, desde: 0, hasta: 40, r: 0.8, etiqueta: '40°' }, txt(2.5, 3.6, 'agudo'),
        raya([5, 3.5], [5, 0.5], [8, 0.5]), { tipo: 'angulo', x: 5, y: 0.5, desde: 0, hasta: 90, r: 0.6, etiqueta: '90°' }, txt(6.5, 3.6, 'recto'),
        raya([9.07, 2.80], [11, 0.5], [13.5, 0.5]), { tipo: 'angulo', x: 11, y: 0.5, desde: 0, hasta: 130, r: 0.6, etiqueta: '130°' }, txt(11.5, 3.6, 'obtuso'),
      ], 'Tres ángulos: uno agudo de 40 grados, uno recto de 90 y uno obtuso de 130.')}
      <p>Según qué tan abiertos estén, los ángulos reciben un nombre:</p>
      <ul>
        <li>Un ángulo <strong>recto</strong> mide exactamente 90°. Es la esquina de una hoja, y es el que forman dos rectas perpendiculares.</li>
        <li>Un ángulo <strong>agudo</strong> mide menos de 90°: está más cerrado que la esquina de la hoja.</li>
        <li>Un ángulo <strong>obtuso</strong> mide entre 90° y 180°: está más abierto que la esquina, pero todavía no es una línea recta.</li>
        <li>Un ángulo <strong>llano</strong> mide 180°: sus dos rayos forman una sola línea recta.</li>
      </ul>
      <h3>¿Cuánto le falta a un ángulo?</h3>
      <p>Muchas veces dos ángulos están juntos y llenan una esquina o una línea. Si dos ángulos suman 90°, se llaman <strong>complementarios</strong>: juntos completan una esquina recta. Si suman 180°, se llaman <strong>suplementarios</strong>: juntos forman una línea recta. Por eso, para saber cuánto mide el que falta, basta con restar. El complemento de 30° es 90° − 30° = 60°, y su suplemento es 180° − 30° = 150°.</p>
      <h3>¿Qué pasa cuando dos rectas se cruzan?</h3>
      <p>Haz una X con dos lápices. Se forman cuatro ángulos, y los que quedan uno frente al otro, tocándose solo por la punta, se llaman <strong>opuestos por el vértice</strong>. Siempre miden lo mismo. La razón es sencilla: cada uno es el suplemento del mismo ángulo vecino, así que los dos son 180° menos lo mismo.</p>
      <p>Ahora imagina dos calles paralelas cortadas por una avenida diagonal. A esa recta que corta a las paralelas se le llama <strong>transversal</strong>. En cada cruce se forman ángulos, y como las paralelas tienen la misma dirección, la transversal las corta con la misma inclinación. Por eso, los ángulos que ocupan la misma posición en cada cruce son iguales. Se llaman <strong>correspondientes</strong>.</p>
      ${TRANSVERSAL}
      <p class="nota"><strong>Trampa común:</strong> confundir complementarios con suplementarios. Un truco para recordarlo: la "c" de complementario va antes que la "s" de suplementario en el abecedario, igual que 90 va antes que 180.</p>`,
    ejemplo: `
      <p>En la figura de las paralelas cortadas por la transversal, el ángulo a mide 65°. ¿Cuánto miden b y c?</p>
      <ol class="pasos-ej">
        <li>Empieza por b. Fíjate dónde está: en el cruce de arriba, en la misma posición que a ocupa en el cruce de abajo (arriba y a la derecha de la transversal). Por eso son ángulos correspondientes, y los correspondientes miden lo mismo: b = 65°.</li>
        <li>Ahora c. Los ángulos a y c están uno junto al otro sobre la misma paralela, y entre los dos llenan la línea recta. Eso quiere decir que son suplementarios y suman 180°. Para saber cuánto mide c, resta lo que ya ocupa a: c = 180° − 65° = 115°.</li>
        <li>Comprueba. Suma a y c: 65° + 115° = 180°, justo una línea recta. Además, c se ve más abierto que una esquina, como debe ser.</li>
      </ol>
      <p>Resultado: <span class="resultado">b = 65° y c = 115°</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que c también mide 65° porque está en el mismo cruce que a. Ángulos vecinos sobre una línea se reparten 180°, no son iguales.</p>`,
    vidaReal: `
      <p>Las líneas y las aberturas entre ellas están en casi todo lo que te rodea:</p>
      <ul>
        <li>Al armar un mueble o un marco, los cortes y las esquinas deben quedar bien medidos para que todo encaje.</li>
        <li>Al construir, las paredes deben quedar bien derechas respecto al piso, o la casa se ve chueca.</li>
        <li>Una brújula o un mapa te indica hacia dónde caminar con medidas de giro.</li>
        <li>Las calles de una ciudad se cruzan y forman esquinas más abiertas o más cerradas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuánto mide el complemento de un ángulo de 35°?</p>', respuesta: 90 - 35,
        pista: '<p>Dos ángulos complementarios juntos forman una esquina recta, es decir, suman 90°.</p>',
        solucion: '<p>Al complemento le falta lo que ya ocupa el ángulo de 35° para llegar a 90°: 90° − 35° = <strong>55°</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuánto mide el suplemento de un ángulo de 110°?</p>', respuesta: 180 - 110,
        pista: '<p>Dos ángulos suplementarios juntos forman una línea recta, es decir, suman 180°.</p>',
        solucion: '<p>Para completar la línea recta faltan 180° − 110° = <strong>70°</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un ángulo de 135° es…</p>', opciones: ['Agudo', 'Recto', 'Obtuso', 'Llano'], correcta: 2,
        pista: '<p>¿Es mayor o menor que 90°? ¿Y que 180°?</p>',
        solucion: '<p>135° es más que 90° (una esquina) pero menos que 180° (una línea recta). Los ángulos entre esas dos medidas son <strong>obtusos</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Dos rectas se cruzan y uno de los ángulos mide 72°. ¿Cuánto mide el ángulo opuesto por el vértice?</p>', respuesta: 72,
        pista: '<p>Los ángulos opuestos por el vértice son iguales.</p>',
        solucion: '<p>Los ángulos opuestos por el vértice siempre miden lo mismo, así que el otro también mide <strong>72°</strong>.</p>' },
      { tipo: 'numero', enunciado: `<p>En esta figura (no está a escala), a = 58°.</p>${TRANSVERSAL}<p>¿Cuánto mide c?</p>`, respuesta: 180 - 58,
        pista: '<p>a y c forman juntos una línea recta.</p>',
        solucion: '<p>a y c llenan juntos la línea recta, así que son suplementarios: 180° − 58° = <strong>122°</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Dos ángulos suplementarios miden x y 2x. ¿Cuánto mide el <strong>mayor</strong>?</p>', respuesta: 2 * (180 / 3),
        pista: '<p>Los dos ángulos juntos suman 180°. Escribe x + 2x = 180 y encuentra x.</p>',
        solucion: '<p>x + 2x es 3x, así que 3x = 180 y x = 60°. El ángulo mayor es el doble: 2x = <strong>120°</strong>.</p>' },
    ],
    fuentes: [PA('9-3-use-properties-of-angles-triangles-and-the-pythagorean-theorem', 'Use Properties of Angles, Triangles, and the Pythagorean Theorem'), WIKI('Ángulo', 'Ángulo'), KHAN_BASE],
  });

  // ------------------------------------------------------------------
  L('Triángulos y sus propiedades', {
    objetivo: 'Clasificar triángulos por sus lados y sus ángulos, usar que sus ángulos suman 180° y saber cuándo tres medidas pueden formar un triángulo.',
    explicacion: `
      <p>Toma tres palitos de madera y júntalos por las puntas. Acabas de armar un <strong>triángulo</strong>: una figura cerrada con tres lados rectos, tres esquinas (vértices) y tres ángulos por dentro. Es la figura más sencilla que se puede cerrar con líneas rectas, y por eso aparece en todas partes.</p>
      <h3>¿Cómo se clasifican?</h3>
      <p>Hay dos maneras de agrupar los triángulos: fijándote en sus lados o fijándote en sus ángulos. Cada triángulo tiene un nombre de cada columna.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Por sus lados</th><th>Por sus ángulos</th></tr>
        <tr><td><strong>Equilátero:</strong> 3 lados iguales</td><td><strong>Acutángulo:</strong> 3 ángulos agudos</td></tr>
        <tr><td><strong>Isósceles:</strong> 2 lados iguales</td><td><strong>Rectángulo:</strong> 1 ángulo recto</td></tr>
        <tr><td><strong>Escaleno:</strong> ningún lado igual</td><td><strong>Obtusángulo:</strong> 1 ángulo obtuso</td></tr>
      </table></div>
      <p>Los nombres ayudan a recordar. "Equi" significa igual, como en "equipo". "Acut" viene de agudo y "obtus", de obtuso. Recuerda que un ángulo agudo mide menos de 90°, uno recto mide 90° y uno obtuso, más de 90°.</p>
      <h3>¿Cuánto suman sus ángulos?</h3>
      <p>Haz este experimento. Dibuja un triángulo cualquiera en una hoja, recórtalo y luego arranca sus tres esquinas. Si las pones una junto a otra, con las puntas tocándose, verás que forman una línea recta. Una línea recta es un ángulo llano, que mide 180°. Por eso, en <em>cualquier</em> triángulo:</p>
      <p class="resultado">A + B + C = 180°</p>
      <p>Aquí A, B y C son <strong>las medidas de los tres ángulos de adentro</strong>, llamados ángulos interiores. Sin importar si el triángulo es grande, chico, alto o aplastado, siempre suman lo mismo.</p>
      ${fig([-0.5, 6.5], [-0.3, 4.6], [
        { tipo: 'poligono', puntos: [[0, 0], [6, 0], [3.555, 4.236]], relleno: true },
        { tipo: 'angulo', x: 0, y: 0, desde: 0, hasta: 50, r: 0.7, etiqueta: '50°' },
        { tipo: 'angulo', x: 6, y: 0, desde: 120, hasta: 180, r: 0.7, etiqueta: '60°' },
        { tipo: 'angulo', x: 3.555, y: 4.236, desde: 230, hasta: 300, r: 0.7, etiqueta: '70°' },
      ], 'Triángulo con ángulos de 50, 60 y 70 grados, que suman 180.')}
      <p>De esta regla salen varias consecuencias útiles:</p>
      <ul>
        <li>En un triángulo equilátero, los tres ángulos son iguales. Como se reparten 180° entre tres, cada uno mide 60°.</li>
        <li>En un isósceles, los dos ángulos que están frente a los lados iguales también son iguales. Se les llama ángulos de la base. Y al revés: si los tres ángulos son distintos, los tres lados también lo son.</li>
        <li>Un triángulo tiene como mucho un ángulo recto u obtuso. Si tuviera dos, esos dos ya sumarían 180° o más, y no quedaría nada para el tercero. Los otros dos siempre son agudos.</li>
      </ul>
      <h3>¿Cualquier trío de medidas forma un triángulo?</h3>
      <p>No. Imagina varillas de 3, 4 y 8 cm. Pon la de 8 acostada y trata de unir sus extremos con las otras dos. Aunque las estires al máximo, juntas solo alcanzan 3 + 4 = 7 cm, y no llegan a cerrar. Esta regla se llama <strong>desigualdad triangular</strong>: cada lado debe ser <strong>menor que la suma</strong> de los otros dos. Basta revisarlo con el lado más largo.</p>
      <h3>¿Qué es un ángulo exterior?</h3>
      <p>Si alargas uno de los lados más allá de un vértice, se forma un ángulo por fuera, llamado <strong>ángulo exterior</strong>. Este ángulo y el interior que está a su lado forman una línea recta, así que suman 180°. Pero los tres interiores también suman 180°. Por eso, el ángulo exterior es igual a la suma de los dos ángulos interiores que no están junto a él.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que los ángulos de un triángulo grande suman más que los de uno chico. El tamaño cambia los lados, no la suma de los ángulos: siempre es 180°.</p>`,
    ejemplo: `
      <p>Un triángulo tiene ángulos de 47° y 68°. ¿Cuánto mide el tercero y qué tipo de triángulo es?</p>
      <ol class="pasos-ej">
        <li>Primero encuentra el ángulo que falta. Los tres suman 180°, así que a 180° le quitas los dos que ya conoces: 180° − 47° − 68° = 65°.</li>
        <li>Ahora clasifícalo por sus ángulos. Los tres (47°, 68° y 65°) son menores de 90°, es decir, todos son agudos. Por eso es acutángulo.</li>
        <li>Luego clasifícalo por sus lados. En un triángulo, ángulos iguales van frente a lados iguales. Como los tres ángulos son distintos, los tres lados también lo son: es escaleno.</li>
        <li>Comprueba la suma: 47° + 68° + 65° = 180°. Cuadra.</li>
      </ol>
      <p>Resultado: <span class="resultado">65°; acutángulo y escaleno</span>.</p>
      <p class="nota"><strong>Error común:</strong> restar solo uno de los ángulos conocidos a 180°. Hay que quitar los dos.</p>`,
    vidaReal: `
      <p>Las figuras de tres lados son las más firmes que existen, y por eso se usan mucho:</p>
      <ul>
        <li>Los puentes, las torres de luz y los techos de las casas están hechos de muchos triángulos, porque no se deforman al empujarlos.</li>
        <li>Si cruzas un parque, ir derecho siempre es más corto que dar la vuelta por dos lados.</li>
        <li>Quienes navegan o miden terrenos ubican un punto lejano midiendo desde dos lugares distintos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Dos ángulos de un triángulo miden 35° y 85°. ¿Cuánto mide el tercero?</p>', respuesta: 180 - 35 - 85,
        pista: '<p>Los tres suman 180°.</p>',
        solucion: '<p>Los dos ángulos conocidos ya ocupan 35° + 85° = 120°. Para llegar a 180° faltan 180° − 120° = <strong>60°</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En un triángulo isósceles, el ángulo distinto mide 40°. ¿Cuánto mide cada uno de los otros dos?</p>', respuesta: (180 - 40) / 2,
        pista: '<p>Los otros dos son iguales y entre los dos suman 180° − 40°.</p>',
        solucion: '<p>Quitando el ángulo distinto quedan 180° − 40° = 140° para los otros dos. Como son iguales, cada uno mide 140° ÷ 2 = <strong>70°</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Se puede formar un triángulo con lados de 3, 4 y 8 cm?</p>', opciones: ['Sí', 'No'], correcta: 1,
        pista: '<p>Revisa si el lado más largo es menor que la suma de los otros dos.</p>',
        solucion: '<p>Los dos lados cortos suman 3 + 4 = 7 cm, que es menos que el lado de 8 cm. No alcanzan a cerrar la figura, así que <strong>no</strong> se forma un triángulo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un triángulo con lados de 5, 5 y 5 cm es…</p>', opciones: ['Escaleno', 'Isósceles con dos lados iguales solamente', 'Equilátero'], correcta: 2,
        pista: '<p>¿Cuántos lados iguales tiene?</p>',
        solucion: '<p>Tiene sus tres lados iguales, así que es <strong>equilátero</strong>. Además, cada uno de sus ángulos mide 60°.</p>' },
      { tipo: 'numero', enunciado: '<p>Dos ángulos interiores de un triángulo miden 45° y 75°. ¿Cuánto mide el ángulo exterior que está junto al tercer ángulo?</p>', respuesta: 45 + 75,
        pista: '<p>El ángulo exterior es la suma de los dos interiores que no están junto a él.</p>',
        solucion: '<p>El ángulo exterior es la suma de los dos interiores que no están junto a él: 45° + 75° = <strong>120°</strong>. Compruébalo: el tercer ángulo interior mide 60°, y 60° + 120° = 180°.</p>' },
      { tipo: 'numero', enunciado: '<p>En un triángulo rectángulo, uno de los ángulos agudos mide 28°. ¿Cuánto mide el otro?</p>', respuesta: 90 - 28,
        pista: '<p>El ángulo recto ya usa 90° de los 180°.</p>',
        solucion: '<p>El ángulo recto ya ocupa 90° de los 180°. Quedan 90° para los otros dos, así que el que falta mide 90° − 28° = <strong>62°</strong>.</p>' },
    ],
    fuentes: [PA('9-3-use-properties-of-angles-triangles-and-the-pythagorean-theorem', 'Use Properties of Angles, Triangles, and the Pythagorean Theorem'), WIKI('Triángulo', 'Triángulo'), KHAN_BASE],
  });

  // ------------------------------------------------------------------
  L('Teorema de Pitágoras', {
    objetivo: 'Usar el teorema de Pitágoras para encontrar un lado de un triángulo rectángulo y para comprobar si un triángulo es rectángulo.',
    explicacion: `
      <p>Recargas una escalera en la pared. La pared y el piso forman una esquina recta, y la escalera va de una a otro en diagonal. Si sabes qué tan lejos está el pie de la escalera y qué tan alto llega, ¿puedes saber cuánto mide la escalera sin medirla? Sí, y la herramienta para hacerlo tiene más de 2 500 años.</p>
      <h3>¿Cómo se llaman los lados?</h3>
      <p>Esa situación forma un <strong>triángulo rectángulo</strong>, es decir, un triángulo con un ángulo de 90°. Sus lados tienen nombres especiales:</p>
      <ul>
        <li>Los <strong>catetos</strong> son los dos lados que forman la esquina recta. En el ejemplo, el piso y la pared. Los llamaremos a y b.</li>
        <li>La <strong>hipotenusa</strong> es el lado que queda enfrente de la esquina recta: la escalera. La llamaremos c. Siempre es el lado más largo, porque está frente al ángulo más grande, el de 90°.</li>
      </ul>
      <h3>¿Qué dice el teorema?</h3>
      <p>Mira la figura. El triángulo tiene catetos de 3 y 4, y sobre cada lado se dibujó un cuadrado. El cuadrado del cateto de 3 tiene 3 × 3 = 9 cuadritos. El del cateto de 4 tiene 4 × 4 = 16. Y el de la hipotenusa, que mide 5, tiene 5 × 5 = 25. Fíjate: 9 + 16 = 25.</p>
      ${fig([-3.5, 7.5], [-4.5, 7.5], [
        { tipo: 'poligono', puntos: [[0, 0], [4, 0], [4, -4], [0, -4]], relleno: true, serie: 0 },
        { tipo: 'poligono', puntos: [[0, 0], [0, 3], [-3, 3], [-3, 0]], relleno: true, serie: 2 },
        { tipo: 'poligono', puntos: [[4, 0], [0, 3], [3, 7], [7, 4]], relleno: true, serie: 1 },
        { tipo: 'poligono', puntos: [[0, 0], [4, 0], [0, 3]] },
        txt(2, -2, '16'), txt(-1.5, 1.5, '9'), txt(3.5, 3.5, '25'),
        txt(2, 0.45, 'b = 4'), txt(0.85, 1.5, 'a = 3'), txt(1.5, 2.3, 'c = 5'),
      ], 'Triángulo rectángulo de catetos 3 y 4 e hipotenusa 5, con un cuadrado sobre cada lado: áreas 9, 16 y 25.', { x: [-3.5, 7.5], y: [-4.5, 7.5] })}
      <p>Esto no es casualidad: pasa en todos los triángulos rectángulos. Los dos cuadrados pequeños juntos tienen exactamente el mismo tamaño que el cuadrado grande. A esta regla se le llama <strong>teorema de Pitágoras</strong>, por el matemático griego al que se le atribuye:</p>
      <p class="resultado" style="font-size:1.2rem">a² + b² = c²</p>
      <p>Léelo así: "un cateto al cuadrado, más el otro cateto al cuadrado, es igual a la hipotenusa al cuadrado". Recuerda que elevar al cuadrado es multiplicar un número por sí mismo: 3² = 3 × 3 = 9.</p>
      <h3>¿Cómo encuentro un lado que falta?</h3>
      <p>Para encontrar el lado necesitas deshacer el cuadrado, y eso lo hace la <strong>raíz cuadrada</strong> (√): busca el número que, multiplicado por sí mismo, da el que tienes. Por ejemplo, √25 = 5, porque 5 × 5 = 25.</p>
      <ul>
        <li>Si te falta la <strong>hipotenusa</strong>, suma los cuadrados de los catetos y saca la raíz: c = √(a² + b²).</li>
        <li>Si te falta <strong>un cateto</strong>, al cuadrado de la hipotenusa réstale el del cateto que conoces, y saca la raíz: b = √(c² − a²). Se resta porque c² es la suma de los dos cuadrados pequeños: si ya conoces uno, al quitarlo te queda el otro.</li>
      </ul>
      <p>Algunos tríos de números enteros cumplen la regla exacta, sin decimales. Se llaman <strong>ternas pitagóricas</strong>: 3-4-5, 5-12-13, 8-15-17 y sus múltiplos, como 6-8-10 (que es 3-4-5 por dos).</p>
      <h3>¿Cómo sé si un triángulo es rectángulo?</h3>
      <p>La regla también funciona al revés. Si tienes tres lados y el cuadrado del mayor es igual a la suma de los cuadrados de los otros dos, el triángulo <strong>es rectángulo</strong>. Si no se cumple, no tiene esquina recta.</p>
      <p class="nota"><strong>Trampa común:</strong> sumar los lados sin elevarlos al cuadrado. Con catetos de 3 y 4, la hipotenusa no es 3 + 4 = 7, sino √(9 + 16) = 5.</p>`,
    ejemplo: `
      <p>Recargas una escalera de 5 m en una pared, con el pie a 3 m de la pared. ¿A qué altura llega?</p>
      <ol class="pasos-ej">
        <li>Identifica los lados. La escalera va en diagonal, frente a la esquina entre pared y piso: es la hipotenusa, c = 5. La distancia del pie a la pared es un cateto, a = 3. La altura es el otro cateto, b, el que buscas.</li>
        <li>Como falta un cateto, resta los cuadrados: 5² − 3² = 25 − 9 = 16.</li>
        <li>Saca la raíz para deshacer el cuadrado: b = √16 = 4, porque 4 × 4 = 16.</li>
        <li>Comprueba con la regla completa: 3² + 4² = 9 + 16 = 25 = 5². Además, 4 es menor que 5, como debe ser un cateto.</li>
      </ol>
      <p>Resultado: <span class="resultado">llega a 4 m de altura</span>.</p>
      <p class="nota"><strong>Error común:</strong> sumar 25 + 9 porque "siempre se suma". Se suma solo cuando buscas la hipotenusa.</p>`,
    vidaReal: `
      <p>Siempre que hay una esquina recta y una diagonal, esta regla te ayuda a medir sin cinta métrica:</p>
      <ul>
        <li>Los albañiles marcan 3, 4 y 5 metros con un cordel para trazar esquinas perfectamente rectas.</li>
        <li>Una televisión de "55 pulgadas" mide eso en diagonal, de una esquina a la opuesta.</li>
        <li>Si caminas 60 m al norte y luego 80 m al este, quedas a 100 m en línea recta de donde saliste.</li>
        <li>Sirve para calcular escaleras, rampas, cables y techos inclinados.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Los catetos de un triángulo rectángulo miden 6 y 8. ¿Cuánto mide la hipotenusa?</p>', respuesta: Math.sqrt(6 ** 2 + 8 ** 2),
        pista: '<p>Te falta la hipotenusa: eleva cada cateto al cuadrado, súmalos y saca la raíz.</p>',
        solucion: '<p>6² + 8² = 36 + 64 = 100, y √100 = <strong>10</strong>, porque 10 × 10 = 100. Es la terna 3-4-5 multiplicada por 2.</p>' },
      { tipo: 'numero', enunciado: '<p>La hipotenusa mide 13 y un cateto mide 5. ¿Cuánto mide el otro cateto?</p>', respuesta: Math.sqrt(13 ** 2 - 5 ** 2),
        pista: '<p>Te falta un cateto: al cuadrado de la hipotenusa réstale el cuadrado del cateto que conoces.</p>',
        solucion: '<p>13² − 5² = 169 − 25 = 144, y √144 = <strong>12</strong>. Es la terna 5-12-13.</p>' },
      { tipo: 'numero', enunciado: '<p>Los dos catetos miden 1. ¿Cuánto mide la hipotenusa? Redondea a dos decimales.</p>', respuesta: Math.SQRT2, tolerancia: 0.006,
        pista: '<p>Busca la hipotenusa: suma los cuadrados de los dos catetos y saca la raíz cuadrada con la calculadora.</p>',
        solucion: '<p>c = √(1 + 1) = √2. √2 no es un número entero ni un decimal exacto; con calculadora, √2 ≈ <strong>1.41</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Es rectángulo un triángulo de lados 7, 24 y 25?</p>', opciones: ['Sí', 'No'], correcta: 0,
        pista: '<p>Comprueba si 7² + 24² = 25².</p>',
        solucion: '<p>El lado mayor es 25. Compara: 7² + 24² = 49 + 576 = 625, y 25² = 625. Son iguales, así que <strong>sí</strong> es rectángulo.</p>' },
      { tipo: 'numero', enunciado: '<p>Una pantalla mide 48 cm de ancho y 36 cm de alto. ¿Cuánto mide su diagonal?</p>', respuesta: Math.sqrt(48 ** 2 + 36 ** 2),
        pista: '<p>La diagonal es la hipotenusa de un triángulo de catetos 48 y 36.</p>',
        solucion: '<p>El ancho y el alto forman la esquina recta, y la diagonal es la hipotenusa: √(48² + 36²) = √(2 304 + 1 296) = √3 600 = <strong>60 cm</strong>. Es la terna 3-4-5 multiplicada por 12.</p>' },
      { tipo: 'numero', enunciado: '<p>Caminas 300 m hacia el norte y luego 400 m hacia el este. ¿A qué distancia en línea recta quedas del punto de partida?</p>', respuesta: Math.sqrt(300 ** 2 + 400 ** 2),
        pista: '<p>Norte y este forman un ángulo recto.</p>',
        solucion: '<p>El camino al norte y el camino al este son los catetos, y la distancia directa es la hipotenusa: √(300² + 400²) = √250 000 = <strong>500 m</strong>.</p>' },
    ],
    fuentes: [PA('9-3-use-properties-of-angles-triangles-and-the-pythagorean-theorem', 'Use the Pythagorean Theorem'), WIKI('Teorema_de_Pitágoras', 'Teorema de Pitágoras'), KHAN],
  });

  // ------------------------------------------------------------------
  const R3 = Math.sqrt(3);
  L('Polígonos y perímetros', {
    objetivo: 'Nombrar polígonos, calcular la suma de sus ángulos interiores y obtener perímetros.',
    explicacion: `
      <p>Mira a tu alrededor: una hoja de papel tiene cuatro lados, una señal de alto tiene ocho y una celda de panal, seis. Todas son figuras planas cerradas, hechas solo con líneas rectas. A una figura así se le llama <strong>polígono</strong>, y a cada línea, <strong>lado</strong>. Los puntos donde se juntan dos lados son los <strong>vértices</strong>. Un círculo no es polígono, porque su borde es curvo.</p>
      <h3>¿Cómo se llaman?</h3>
      <p>Los polígonos se nombran según cuántos lados tienen:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Lados</th><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>10</td></tr>
        <tr><th>Nombre</th><td>triángulo</td><td>cuadrilátero</td><td>pentágono</td><td>hexágono</td><td>heptágono</td><td>octágono</td><td>decágono</td></tr>
      </table></div>
      <p>Los nombres vienen del griego y llevan el número escondido: "penta" es cinco, "hexa" es seis, "octa" es ocho (como el pulpo, que tiene ocho brazos) y "deca" es diez. "Gono" quiere decir ángulo.</p>
      <p>Un polígono es <strong>regular</strong> si todos sus lados miden lo mismo y todos sus ángulos también. La señal de alto es un octágono regular. Una hoja de papel no lo es, porque tiene dos lados largos y dos cortos.</p>
      <h3>¿Cuánto suman sus ángulos?</h3>
      <p>Ya sabes que los tres ángulos de un triángulo suman 180°. Esa idea te sirve para cualquier polígono. Elige un vértice y traza líneas desde él hasta los demás vértices. El polígono queda partido en triángulos, y sus ángulos juntos forman los ángulos del polígono.</p>
      ${fig([-2.4, 2.4], [-2.1, 2.1], [
        { tipo: 'poligono', puntos: [[2, 0], [1, R3], [-1, R3], [-2, 0], [-1, -R3], [1, -R3]], relleno: true },
        oculta([2, 0], [-1, R3]), oculta([2, 0], [-2, 0]), oculta([2, 0], [-1, -R3]),
      ], 'Hexágono regular dividido en 4 triángulos con líneas punteadas que salen de un mismo vértice.')}
      <p>Cuenta los triángulos en distintas figuras y verás un patrón:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Lados</th><td>4</td><td>5</td><td>6</td></tr>
        <tr><th>Triángulos</th><td>2</td><td>3</td><td>4</td></tr>
      </table></div>
      <p>Siempre salen dos triángulos menos que lados. La razón: desde el vértice elegido no puedes trazar líneas hacia sí mismo ni hacia sus dos vecinos, porque ya están unidos a él por lados. Así, si el polígono tiene n lados, trazas n − 3 líneas y la figura se parte en n − 2 triángulos. Como cada uno aporta 180°:</p>
      <p class="resultado">Suma de ángulos interiores = (n − 2) × 180°</p>
      <p>Aquí n es <strong>el número de lados</strong>. En el hexágono de la figura, n = 6: se parte en 4 triángulos, y 4 × 180° = 720°. Si además es regular, sus seis ángulos son iguales, así que cada uno mide 720° ÷ 6 = 120°.</p>
      <p>Un aviso: esta regla y el truco de los triángulos se explican aquí con polígonos <strong>convexos</strong>, es decir, sin ninguna "muesca" hacia adentro, como todos los de esta lección. Si la figura tiene una muesca, como la punta de una flecha, alguna línea trazada desde un vértice saldría de la figura, y entonces hay que partirla de otra manera.</p>
      <h3>¿Cuánto mide el contorno?</h3>
      <p>Si caminas alrededor de una cancha pegado a la orilla, la distancia de una vuelta es su <strong>perímetro</strong>: la suma de todos sus lados. Se mide en unidades de longitud, como metros o centímetros.</p>
      <p>Hay dos atajos. En un polígono regular todos los lados son iguales, así que en vez de sumar puedes multiplicar: n × ℓ, donde ℓ es <strong>lo que mide cada lado</strong>. En un rectángulo hay dos largos y dos anchos iguales, así que el perímetro es 2 × (largo + ancho).</p>
      <p class="nota"><strong>Trampa común:</strong> en un rectángulo, sumar solo el largo y el ancho una vez. Eso es media vuelta; para la vuelta completa hay que multiplicar por 2.</p>`,
    ejemplo: `
      <p>Quieres cercar un terreno rectangular de 25 m por 18 m con 3 vueltas de alambre. ¿Cuánto alambre necesitas?</p>
      <ol class="pasos-ej">
        <li>Primero calcula una vuelta, que es el perímetro. El terreno tiene dos lados de 25 m y dos de 18 m. Suma un largo y un ancho, 25 + 18 = 43 m, y como eso es media vuelta, multiplícalo por 2: 2 × 43 = 86 m.</li>
        <li>Ahora toma en cuenta las vueltas. Cada vuelta usa 86 m de alambre y quieres dar 3, así que 3 × 86 = 258 m.</li>
        <li>Comprueba sumando lado por lado: 25 + 18 + 25 + 18 = 86 m por vuelta. Y 86 + 86 + 86 = 258 m. Coincide.</li>
      </ol>
      <p>Resultado: <span class="resultado">258 m de alambre</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar las vueltas y comprar solo 86 m. Antes de terminar, vuelve a leer qué te preguntan.</p>`,
    vidaReal: `
      <p>Saber medir el contorno de una figura te ayuda en muchas compras y actividades:</p>
      <ul>
        <li>Las cercas, los zoclos, las molduras y los marcos se venden por metro, así que debes saber cuánto mide la orilla.</li>
        <li>Las abejas hacen sus panales con figuras de seis lados, que encajan sin dejar huecos, igual que muchos adoquines.</li>
        <li>Si corres alrededor de un parque, puedes saber cuántos metros recorres en cada vuelta.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuánto suman los ángulos interiores de un pentágono?</p>', respuesta: (5 - 2) * 180,
        pista: '<p>Un pentágono tiene 5 lados. Usa (n − 2) × 180° con n = 5.</p>',
        solucion: '<p>Un pentágono se parte en 5 − 2 = 3 triángulos, y 3 × 180° = <strong>540°</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuánto mide cada ángulo interior de un octágono regular?</p>', respuesta: ((8 - 2) * 180) / 8,
        pista: '<p>Calcula la suma total y divídela entre 8.</p>',
        solucion: '<p>Un octágono se parte en 8 − 2 = 6 triángulos, así que sus ángulos suman 6 × 180° = 1 080°. Como es regular, los 8 ángulos son iguales: 1 080° ÷ 8 = <strong>135°</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es el perímetro de un hexágono regular de 7 cm de lado?</p>', respuesta: 6 * 7,
        pista: '<p>Tiene 6 lados iguales.</p>',
        solucion: '<p>Un hexágono regular tiene 6 lados iguales, así que en vez de sumar multiplicas: 6 × 7 = <strong>42 cm</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un rectángulo tiene 50 m de perímetro y 15 m de largo. ¿Cuánto mide de ancho?</p>', respuesta: 50 / 2 - 15,
        pista: '<p>Un largo más un ancho es media vuelta. ¿Cuánto es la mitad de 50?</p>',
        solucion: '<p>La mitad del perímetro es un largo más un ancho: 50 ÷ 2 = 25. Si el largo es 15, el ancho es 25 − 15 = <strong>10 m</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cómo se llama un polígono de 10 lados?</p>', opciones: ['Octágono', 'Decágono', 'Dodecágono', 'Eneágono'], correcta: 1,
        pista: '<p>"Deca" significa diez.</p>',
        solucion: '<p>"Deca" significa diez, así que un polígono de 10 lados es un <strong>decágono</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Vas a enmarcar un cuadro de 40 cm por 30 cm. ¿Cuántos centímetros de moldura necesitas como mínimo?</p>', respuesta: 2 * (40 + 30),
        pista: '<p>La moldura rodea todo el contorno.</p>',
        solucion: '<p>La moldura rodea todo el cuadro, así que necesitas su perímetro: 2 × (40 + 30) = 2 × 70 = <strong>140 cm</strong>.</p>' },
    ],
    fuentes: [PA('9-4-use-properties-of-rectangles-triangles-and-trapezoids', 'Use Properties of Rectangles, Triangles, and Trapezoids'), WIKI('Polígono', 'Polígono'), WIKI('Perímetro', 'Perímetro')],
  });

  // ------------------------------------------------------------------
  L('Áreas de figuras planas', {
    objetivo: 'Calcular el área de rectángulos, triángulos, paralelogramos, trapecios, polígonos regulares y figuras compuestas, y convertir unidades de área.',
    explicacion: `
      <p>Imagina que vas a cubrir el piso de un cuarto con losetas cuadradas. Si el cuarto mide 4 losetas de largo y 3 de ancho, caben 3 filas de 4 losetas: 12 en total. Ese número, cuánta superficie cubre una figura, es su <strong>área</strong>.</p>
      <p>El área se mide contando cuadritos. Por eso sus unidades llevan un 2 chiquito: cm² (centímetros cuadrados) o m² (metros cuadrados). Un m² es un cuadrado de 1 m por lado, más o menos el tamaño de una mesa pequeña.</p>
      <h3>¿Por qué se multiplica en el rectángulo?</h3>
      <p>Como viste con las losetas, un rectángulo tiene tantas filas como mide de alto, y cada fila tiene tantos cuadritos como mide de largo. Por eso su área es <strong>base × altura</strong>. Un cuadrado es un rectángulo con los dos lados iguales, así que su área es lado × lado, o lado².</p>
      <p>Las demás fórmulas salen de esta idea: se recorta o se acomoda la figura hasta convertirla en un rectángulo.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Figura</th><th>Área</th></tr>
        <tr><td>Rectángulo</td><td>base × altura</td></tr>
        <tr><td>Cuadrado</td><td>lado²</td></tr>
        <tr><td>Triángulo</td><td>${F('base × altura', 2)}</td></tr>
        <tr><td>Paralelogramo</td><td>base × altura</td></tr>
        <tr><td>Trapecio</td><td>${F('(B + b) × h', 2)} (B y b son las bases paralelas)</td></tr>
        <tr><td>Polígono regular</td><td>${F('perímetro × apotema', 2)}</td></tr>
      </table></div>
      <h3>¿Qué es cada figura?</h3>
      <p>Un <strong>paralelogramo</strong> tiene cuatro lados y dos pares de lados paralelos, como un rectángulo "empujado" de lado. Si le cortas el triángulo de una punta y lo pegas en la otra, se vuelve un rectángulo con la misma base y la misma altura. Por eso su área también es base × altura.</p>
      <p>Un <strong>trapecio</strong> tiene un solo par de lados paralelos, llamados bases: la mayor (B) y la menor (b). La letra h es <strong>su altura</strong>. La fórmula promedia las dos bases y multiplica por la altura, como si fuera un rectángulo de base intermedia.</p>
      <p>La <strong>apotema</strong> de un polígono regular es la distancia de su centro a la mitad de un lado. Sirve porque el polígono se puede partir en triángulos iguales que salen del centro, y la apotema es la altura de cada uno. Cada triángulo mide lado × apotema ÷ 2, y al sumarlos todos los lados forman el perímetro: de ahí sale la fórmula.</p>
      <h3>¿Por qué el triángulo se divide entre 2?</h3>
      <p>Mira la figura de la izquierda: el triángulo cabe dentro de un rectángulo con su misma base y su misma altura, y ocupa justo la mitad. Lo que sobra a los lados, juntado, es otro triángulo igual. Por eso su área es base × altura ÷ 2.</p>
      <div class="dos-graficas">
        ${fig([-0.5, 6.5], [-0.8, 4.5], [
          { tipo: 'poligono', puntos: [[0, 0], [6, 0], [6, 4], [0, 4]], serie: 1 },
          { tipo: 'poligono', puntos: [[0, 0], [6, 0], [2, 4]], relleno: true },
          oculta([2, 4], [2, 0]), txt(3, -0.45, 'base = 6'), txt(2.8, 1.6, 'h = 4'),
        ], 'Triángulo de base 6 y altura 4 dentro de un rectángulo de 6 por 4: ocupa la mitad.')}
        ${fig([-0.5, 7.5], [-0.8, 3.6], [
          { tipo: 'poligono', puntos: [[0, 0], [7, 0], [5, 3], [1, 3]], relleno: true, serie: 2 },
          oculta([1, 3], [1, 0]), txt(3.5, -0.45, 'B = 7'), txt(3, 3.35, 'b = 4'), txt(1.6, 1.5, 'h = 3'),
        ], 'Trapecio con base mayor 7, base menor 4 y altura 3.')}
      </div>
      <p>Ojo: la <strong>altura</strong> siempre se mide derecha, formando una esquina recta con la base (la línea punteada), no por el lado inclinado.</p>
      <h3>¿Y si la figura es rara?</h3>
      <p>Pártela en figuras conocidas, calcula cada área y súmalas. Otra opción es calcular un rectángulo grande que la rodee y restarle lo que sobra.</p>
      <p class="nota"><strong>Trampa común:</strong> 1 m = 100 cm, pero <strong>1 m² = 100 × 100 = 10 000 cm²</strong>, porque un metro cuadrado tiene 100 filas de 100 cuadritos de 1 cm. Al convertir áreas, el número de conversión se eleva al cuadrado.</p>`,
    ejemplo: `
      <p>Vas a pintar una pared de 4 m por 2.5 m que tiene una ventana de 1.2 m por 1 m. Un litro de pintura cubre 10 m². ¿Cuánta pintura necesitas para una mano?</p>
      <ol class="pasos-ej">
        <li>Calcula el área de toda la pared, como si no tuviera ventana. Es un rectángulo: 4 × 2.5 = 10 m².</li>
        <li>La ventana no se pinta, así que calcula su área para quitarla: 1.2 × 1 = 1.2 m².</li>
        <li>Resta para saber cuánto hay que pintar de verdad: 10 − 1.2 = 8.8 m².</li>
        <li>Cada litro cubre 10 m², así que divide la superficie entre lo que rinde un litro: 8.8 ÷ 10 = 0.88 L.</li>
        <li>Comprueba al revés: 0.88 L × 10 m² por litro = 8.8 m². Coincide.</li>
      </ol>
      <p>Resultado: <span class="resultado">0.88 litros (compra 1 L)</span>.</p>
      <p class="nota"><strong>Error común:</strong> sumar los lados (4 + 2.5) en lugar de multiplicarlos. Eso da parte del contorno, no la superficie.</p>`,
    vidaReal: `
      <p>Cada vez que necesitas cubrir una superficie, tienes que saber qué tan grande es:</p>
      <ul>
        <li>Para comprar piso, pasto, pintura, tela o lona sin que te falte ni te sobre mucho.</li>
        <li>Para comparar terrenos o departamentos: dividir el precio entre la superficie te dice cuál conviene.</li>
        <li>Para saber cuántas losetas, paneles solares o macetas caben en un patio, una azotea o un cuarto.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuál es el área de un triángulo de base 10 cm y altura 7 cm?</p>', respuesta: (10 * 7) / 2,
        pista: '<p>Base por altura entre 2.</p>',
        solucion: '<p>El triángulo es la mitad del rectángulo de 10 por 7: 10 × 7 = 70, y 70 ÷ 2 = <strong>35 cm²</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un trapecio tiene bases de 12 m y 8 m, y altura de 5 m. ¿Cuál es su área?</p>', respuesta: ((12 + 8) * 5) / 2,
        pista: `<p>Suma las dos bases, multiplica por la altura y divide entre 2.</p>`,
        solucion: '<p>Las bases suman 12 + 8 = 20. Por la altura: 20 × 5 = 100, y entre 2 da <strong>50 m²</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un paralelogramo tiene base de 9 cm y altura de 4 cm. ¿Cuál es su área?</p>', respuesta: 9 * 4,
        pista: '<p>Si cortas un triángulo de un lado y lo pasas al otro, se vuelve un rectángulo.</p>',
        solucion: '<p>Al pasar el triángulo de un lado al otro, el paralelogramo se vuelve un rectángulo de 9 por 4: 9 × 4 = <strong>36 cm²</strong>.</p>' },
      { tipo: 'numero', enunciado: `<p>Calcula el área de esta figura en forma de L (medidas en metros).</p>${fig([-1.3, 9], [-1, 6.8], [
          { tipo: 'poligono', puntos: [[0, 0], [8, 0], [8, 4], [5, 4], [5, 6], [0, 6]], relleno: true },
          txt(4, -0.5, '8'), txt(-0.6, 3, '6'), txt(6.5, 4.45, '3'), txt(5.45, 5, '2'),
        ], 'Figura en forma de L: un rectángulo de 8 por 6 al que le falta un rectángulo de 3 por 2 en la esquina superior derecha.')}`, respuesta: 8 * 6 - 3 * 2,
        pista: '<p>Imagina el rectángulo completo de 8 por 6 y réstale la esquina que falta.</p>',
        solucion: '<p>Si la figura fuera un rectángulo completo, tendría 8 × 6 = 48 m². La esquina que falta es un rectángulo de 3 × 2 = 6 m². Se resta: 48 − 6 = <strong>42 m²</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos cm² son 3 m²?</p>', respuesta: 3 * 10000,
        pista: '<p>Un metro cuadrado tiene 100 filas de 100 cuadritos de 1 cm: 1 m² = 10 000 cm².</p>',
        solucion: '<p>Cada m² son 10 000 cm², así que 3 m² son 3 × 10 000 = <strong>30 000 cm²</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un cuarto mide 5 m por 4 m. ¿Cuántas losetas cuadradas de 50 cm de lado necesitas para cubrir el piso?</p>', respuesta: (5 * 4) / (0.5 * 0.5),
        pista: '<p>Cada loseta mide 0.5 m × 0.5 m = 0.25 m².</p>',
        solucion: '<p>20 m² ÷ 0.25 m² = <strong>80 losetas</strong>.</p>' },
    ],
    fuentes: [PA('9-4-use-properties-of-rectangles-triangles-and-trapezoids', 'Use Properties of Rectangles, Triangles, and Trapezoids'), WIKI('Área', 'Área'), KHAN_BASE],
  });

  // ------------------------------------------------------------------
  L('El círculo y la circunferencia', {
    objetivo: 'Distinguir círculo y circunferencia, y calcular longitudes, áreas, arcos y sectores usando π.',
    explicacion: `
      <p>Amarra un hilo a un lápiz, sujeta la otra punta con el dedo sobre una hoja y gira el lápiz alrededor. La línea que dibujas es una <strong>circunferencia</strong>: todos sus puntos están a la misma distancia del dedo, que es el <strong>centro</strong>. Lo que queda adentro, la superficie que podrías colorear, es el <strong>círculo</strong>. Dicho de otro modo, la circunferencia es la orilla de una pizza, y el círculo es toda la pizza.</p>
      ${fig([-3.6, 3.6], [-3.4, 3.4], [
        { tipo: 'circulo', x: 0, y: 0, r: 3, relleno: true },
        { tipo: 'linea', desde: [0, 0], hasta: [0, 3], serie: 1 },
        oculta([-3, 0], [3, 0]),
        { tipo: 'angulo', x: 0, y: 0, desde: 0, hasta: 90, r: 0.6, etiqueta: '90°' },
        txt(-0.45, 1.6, 'r'), txt(-1.5, -0.4, 'diámetro'),
      ], 'Circunferencia con su centro, un radio vertical marcado r, un diámetro horizontal punteado y un sector de 90 grados entre ellos.', { puntos: [{ x: 0, y: 0 }] })}
      <h3>¿Qué partes tiene?</h3>
      <ul>
        <li>El <strong>radio (r)</strong> es la distancia del centro a la orilla. En el ejemplo del lápiz, es lo que mide el hilo.</li>
        <li>El <strong>diámetro (d)</strong> es un segmento que cruza de orilla a orilla pasando por el centro. Está formado por dos radios, uno de cada lado, así que d = 2r.</li>
        <li>Una <strong>cuerda</strong> es cualquier segmento que une dos puntos de la orilla. El diámetro es la cuerda más larga: es la que pasa por el centro.</li>
      </ul>
      <h3>¿Qué es el número π?</h3>
      <p>Toma un vaso, un plato y una tapa. Mide con un hilo el contorno de cada uno y luego mide de lado a lado, pasando por el centro. Si divides el contorno entre el diámetro, siempre te sale casi lo mismo: un poco más de 3. Ese número tiene nombre: se llama <strong>pi</strong> y se escribe <strong>π</strong>.</p>
      <p>π ≈ 3.14159… Tiene una infinidad de decimales que nunca se repiten en un patrón, así que en la práctica se usa 3.14 o la tecla π de la calculadora.</p>
      <h3>¿Cuánto mide la orilla?</h3>
      <p>Si el contorno es π veces el diámetro, entonces la <strong>longitud de la circunferencia</strong> es C = πd. Como el diámetro es dos radios, también es C = 2πr. Aquí C es <strong>lo que mide la orilla</strong>, r es el radio y d el diámetro.</p>
      <h3>¿Cuánto mide la superficie?</h3>
      <p>Para el <strong>área del círculo</strong> se usa A = πr², es decir, π por el radio por el radio. Una forma de verlo: si cortas el círculo en muchas rebanadas delgadas, como una pizza, y las acomodas alternando una hacia arriba y otra hacia abajo, se forma casi un rectángulo. Su base es media orilla (πr) y su altura es el radio (r). Al multiplicar, sale πr².</p>
      <h3>¿Y si solo tengo una rebanada?</h3>
      <p>Una rebanada que va del centro a la orilla se llama <strong>sector</strong>, y el pedazo de orilla que le toca se llama <strong>arco</strong>. Si la rebanada abre n grados, es ${F('n', 360)} de la vuelta completa, porque una vuelta tiene 360°. Así que toma esa misma parte del área o de la orilla:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Longitud de la circunferencia</th><td>C = 2πr = πd</td></tr>
        <tr><th>Área del círculo</th><td>A = πr²</td></tr>
        <tr><th>Sector de n°</th><td>${F('n', 360)} × πr²</td></tr>
        <tr><th>Arco de n°</th><td>${F('n', 360)} × 2πr</td></tr>
      </table></div>
      <p>Por ejemplo, un sector de 90° es ${F(90, 360)} = ${F(1, 4)} de vuelta: la cuarta parte del círculo.</p>
      <p class="nota"><strong>Trampa común:</strong> usar el diámetro en lugar del radio en πr². Si te dan el diámetro, divídelo entre 2 antes de empezar.</p>`,
    ejemplo: `
      <p>Una pizza mide 30 cm de diámetro. ¿Cuánta superficie tiene y cuánto mide su orilla?</p>
      <ol class="pasos-ej">
        <li>La fórmula del área usa el radio, y te dieron el diámetro. El radio es la mitad: 30 ÷ 2 = 15 cm.</li>
        <li>Calcula el área. Primero eleva el radio al cuadrado, 15 × 15 = 225, y luego multiplica por π: π × 225 ≈ 706.9 cm².</li>
        <li>Para la orilla puedes usar el diámetro directamente: π × 30 ≈ 94.2 cm.</li>
        <li>Comprueba la orilla por el otro camino: 2 × π × 15 = π × 30, lo mismo. Y revisa que tenga sentido: la orilla es un poco más de 3 veces el diámetro, y 94 es un poco más de 3 × 30 = 90.</li>
      </ol>
      <p>Resultado: <span class="resultado">≈ 707 cm² de pizza y ≈ 94 cm de orilla</span>.</p>
      <p class="nota"><strong>Error común:</strong> hacer π × 30² y obtener unos 2 827 cm², cuatro veces más de lo correcto.</p>`,
    vidaReal: `
      <p>Las figuras redondas están en la cocina, en la calle y en casa:</p>
      <ul>
        <li>Para decidir si conviene una pizza grande o dos medianas, puedes comparar cuánta pizza trae de verdad cada opción antes de pagar.</li>
        <li>Para entender cómo sabe el coche cuántos kilómetros avanzó: cuenta las vueltas que dan sus llantas.</li>
        <li>Para calcular el material de una mesa redonda, una maceta, una alberca o un tubo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuánto mide la circunferencia de un círculo de radio 5 cm? Usa π ≈ 3.14 o la tecla π.</p>', respuesta: 2 * Math.PI * 5, tolerancia: tolPi(2 * Math.PI * 5),
        pista: '<p>La orilla mide 2 × π × radio.</p>',
        solucion: '<p>C = 2 × π × 5 = 10π. Con π ≈ 3.14 da ≈ <strong>31.4 cm</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es el área de un círculo de radio 4 m? Usa π ≈ 3.14 o la tecla π.</p>', respuesta: Math.PI * 4 ** 2, tolerancia: tolPi(Math.PI * 16),
        pista: '<p>A = πr²: primero eleva el radio al cuadrado.</p>',
        solucion: '<p>Primero el radio al cuadrado: 4 × 4 = 16. Luego por π: π × 16 ≈ <strong>50.3 m²</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un círculo tiene radio de 7.5 cm. ¿Cuánto mide su diámetro?</p>', respuesta: 2 * 7.5,
        pista: '<p>El diámetro es el doble del radio.</p>',
        solucion: '<p>El diámetro está formado por dos radios: 2 × 7.5 = <strong>15 cm</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>La rueda de una bicicleta mide 70 cm de diámetro. ¿Cuántas vueltas completas da aproximadamente para avanzar 22 m?</p>', respuesta: 10, tolerancia: 0.5,
        pista: '<p>En cada vuelta la rueda avanza lo que mide su orilla: π × 70 cm ≈ 220 cm. Pasa los 22 m a centímetros y divide.</p>',
        solucion: '<p>En cada vuelta la rueda avanza π × 70 ≈ 219.9 cm. Como 22 m son 2 200 cm, da 2 200 ÷ 219.9 ≈ <strong>10 vueltas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es el área de un sector de 90° en un círculo de radio 6 cm? Usa π ≈ 3.14 o la tecla π.</p>', respuesta: (90 / 360) * Math.PI * 6 ** 2, tolerancia: tolPi(9 * Math.PI),
        pista: `<p>90° es ${F(1, 4)} de la vuelta: calcula la cuarta parte de π × 36.</p>`,
        solucion: '<p>90° es un cuarto de la vuelta (90 ÷ 360), así que el sector es la cuarta parte del círculo. El círculo completo mide π × 36 = 36π, y su cuarta parte es 9π ≈ <strong>28.3 cm²</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Si duplicas el radio de un círculo, su área se multiplica por…</p>', opciones: ['2', '4', 'π', '8'], correcta: 1,
        pista: '<p>Compara π(2r)² con πr².</p>',
        solucion: '<p>El radio se usa dos veces en πr². Con el doble de radio queda π × 2r × 2r = 4πr², así que el área se multiplica por <strong>4</strong>. Por eso una pizza de 40 cm rinde más que dos de 20 cm.</p>' },
    ],
    fuentes: [PA('9-5-solve-geometry-applications-circles-and-irregular-figures', 'Solve Geometry Applications: Circles and Irregular Figures'), WIKI('Circunferencia', 'Circunferencia'), WIKI('Número_π', 'Número π')],
  });

  // ------------------------------------------------------------------
  L('Cuerpos geométricos y volumen', {
    objetivo: 'Reconocer los principales cuerpos geométricos, contar sus caras, aristas y vértices, y calcular volúmenes y áreas totales.',
    explicacion: `
      <p>Una hoja de papel es plana: tiene largo y ancho. Pero una caja de cereal, una lata o una pelota también tienen grosor: puedes tomarlas en la mano y llenarlas. A estos objetos, que ocupan espacio en tres direcciones (largo, ancho y alto), se les llama <strong>cuerpos geométricos</strong>.</p>
      <h3>¿Qué tipos hay?</h3>
      <ul>
        <li>Los <strong>poliedros</strong> tienen todas sus caras planas. Entre ellos están los <strong>prismas</strong>, como una caja, que tienen dos bases iguales unidas por paredes rectas, y las <strong>pirámides</strong>, que tienen una base y paredes que suben hasta una punta.</li>
        <li>Los <strong>cuerpos redondos</strong> tienen alguna parte curva: el <strong>cilindro</strong> (una lata), el <strong>cono</strong> (un cucurucho de helado) y la <strong>esfera</strong> (una pelota).</li>
      </ul>
      <div class="dos-graficas">
        ${fig([-0.3, 4.5], [-0.3, 4.3], [
          { tipo: 'poligono', puntos: [[0, 0], [3, 0], [3, 3], [0, 3]], relleno: true },
          raya([0, 3], [1.2, 4], [4.2, 4], [3, 3]), raya([4.2, 4], [4.2, 1], [3, 0]),
          oculta([0, 0], [1.2, 1]), oculta([1.2, 1], [4.2, 1]), oculta([1.2, 1], [1.2, 4]),
        ], 'Cubo dibujado en perspectiva, con las aristas ocultas en línea punteada.')}
        ${fig([-0.3, 4.5], [-0.3, 3.8], [
          raya([0, 0], [3, 0], [4.2, 1]), raya([0, 0], [2.1, 3.5], [3, 0]), raya([4.2, 1], [2.1, 3.5]),
          oculta([4.2, 1], [1.2, 1]), oculta([1.2, 1], [0, 0]), oculta([1.2, 1], [2.1, 3.5]),
        ], 'Pirámide de base cuadrada en perspectiva, con las aristas ocultas en línea punteada.', )}
      </div>
      <h3>¿Qué partes tiene un poliedro?</h3>
      <p>Toma un dado. Cada lado plano es una <strong>cara</strong> (tiene 6). Cada borde donde se juntan dos caras es una <strong>arista</strong> (tiene 12). Cada esquina es un <strong>vértice</strong> (tiene 8). En los dibujos, las líneas punteadas son aristas que quedan escondidas atrás.</p>
      <p>Con estos tres números pasa algo curioso: en un poliedro sin agujeros que lo atraviesen, como un dado (a diferencia de un marco de fotos, que tiene un hueco en medio), caras + vértices − aristas = 2. Se llama <strong>fórmula de Euler</strong>. En el dado: 6 + 8 − 12 = 2. Sirve para encontrar un dato que no puedes contar porque está escondido.</p>
      <h3>¿Cuánto cabe adentro?</h3>
      <p>El <strong>volumen</strong> mide el espacio que ocupa un cuerpo. Así como el área cuenta cuadritos, el volumen cuenta cubitos. Por eso sus unidades llevan un 3 chiquito: cm³ (centímetros cúbicos) o m³ (metros cúbicos).</p>
      <p>Imagina una caja que en el piso tiene 4 cubitos de largo y 3 de ancho: en la primera capa caben 4 × 3 = 12 cubitos. Si la caja tiene 5 capas de alto, caben 12 × 5 = 60. Fíjate que 12 es el área de la base. Por eso el volumen de un prisma es <strong>área de la base × altura</strong>. Un cilindro funciona igual: es como una pila de círculos del mismo tamaño.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Cuerpo</th><th>Volumen</th></tr>
        <tr><td>Prisma (y cubo) o cilindro</td><td>área de la base × altura</td></tr>
        <tr><td>Pirámide o cono</td><td>${F(1, 3)} × área de la base × altura</td></tr>
        <tr><td>Esfera</td><td>${F(4, 3)} πr³</td></tr>
      </table></div>
      <p>¿Por qué la pirámide lleva ${F(1, 3)}? Porque se va haciendo angosta hasta la punta. Si llenas de arena una pirámide y la vacías en una caja con la misma base y la misma altura, necesitas exactamente 3 pirámides para llenarla. Con el cono y el cilindro pasa lo mismo. En la esfera, r es <strong>su radio</strong>, y r³ quiere decir r × r × r.</p>
      <p class="nota"><strong>Volumen y capacidad:</strong> un cubo de 10 cm por lado (1 dm³, o decímetro cúbico) guarda exactamente 1 litro. Por eso 1 dm³ = 1 litro, y 1 m³ = 1 000 litros.</p>
      <h3>¿Cuánto material lo cubre?</h3>
      <p>El <strong>área total</strong> es la suma de las áreas de todas las caras, como si desarmaras la caja y midieras el cartón. Un cubo de arista ℓ tiene 6 caras cuadradas de ℓ × ℓ, así que su área total es 6ℓ².</p>`,
    ejemplo: `
      <p>Una pecera mide 60 cm de largo, 30 cm de ancho y 40 cm de alto. ¿Cuántos litros de agua le caben?</p>
      <ol class="pasos-ej">
        <li>La pecera es un prisma, así que calcula primero el área de la base: 60 × 30 = 1 800 cm². Es el volumen de una capa de 1 cm de alto, porque hay 1 800 cubitos de 1 cm³.</li>
        <li>Hay 40 capas, así que el volumen es 1 800 × 40 = 72 000 cm³.</li>
        <li>Para pasar a litros, usa que 1 litro = 1 dm³ = 1 000 cm³, porque un cubo de 10 cm por lado tiene 10 × 10 × 10 cubitos. Divide entre 1 000: 72 000 ÷ 1 000 = 72 dm³, es decir, 72 litros.</li>
        <li>Comprueba midiendo en decímetros desde el principio: 6 × 3 × 4 = 72 dm³. Da lo mismo.</li>
      </ol>
      <p>Resultado: <span class="resultado">72 litros</span>.</p>
      <p class="nota"><strong>Error común:</strong> responder 72 000 litros. Esos son centímetros cúbicos, no litros.</p>`,
    vidaReal: `
      <p>Saber cuánto cabe en un recipiente o cuánto material lo cubre resuelve problemas de todos los días:</p>
      <ul>
        <li>Calcular cuánta agua cabe en un tinaco, una cisterna o una alberca antes de llenarlos.</li>
        <li>Saber cuánto concreto pedir para un piso o una columna, porque se vende por volumen.</li>
        <li>Elegir la caja que usa menos cartón para guardar la misma cantidad de producto.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuál es el volumen de un cubo de 4 cm de arista?</p>', respuesta: 4 ** 3,
        pista: '<p>En un cubo, el largo, el ancho y el alto miden lo mismo. Multiplica los tres.</p>',
        solucion: '<p>La base tiene 4 × 4 = 16 cubitos y hay 4 capas: 16 × 4 = <strong>64 cm³</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es el volumen de un cilindro de radio 3 cm y altura 10 cm? Usa π ≈ 3.14 o la tecla π.</p>', respuesta: Math.PI * 3 ** 2 * 10, tolerancia: tolPi(90 * Math.PI),
        pista: '<p>Calcula el área de la base, que es un círculo (π × radio × radio), y multiplícala por la altura.</p>',
        solucion: '<p>La base mide π × 3 × 3 = 9π cm², y hay 10 cm de altura: 9π × 10 = 90π ≈ <strong>282.7 cm³</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una pirámide tiene base cuadrada de 6 m de lado y 5 m de altura. ¿Cuál es su volumen?</p>', respuesta: (6 * 6 * 5) / 3,
        pista: `<p>${F(1, 3)} × (6 × 6) × 5.</p>`,
        solucion: '<p>La base mide 6 × 6 = 36 m². Un prisma con esa base y 5 m de altura tendría 36 × 5 = 180 m³, y la pirámide es la tercera parte: 180 ÷ 3 = <strong>60 m³</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un prisma triangular tiene 5 caras y 6 vértices. ¿Cuántas aristas tiene?</p>', respuesta: 5 + 6 - 2,
        pista: '<p>Usa la fórmula de Euler: caras + vértices − aristas = 2.</p>',
        solucion: '<p>Con la fórmula de Euler, 5 + 6 − aristas = 2. Como 5 + 6 = 11, las aristas son 11 − 2 = <strong>9</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una cisterna mide 2 m de largo, 1.5 m de ancho y 1 m de profundidad. ¿Cuántos litros le caben?</p>', respuesta: 2 * 1.5 * 1 * 1000,
        pista: '<p>Calcula los m³ y recuerda que 1 m³ = 1 000 L.</p>',
        solucion: '<p>El volumen es 2 × 1.5 × 1 = 3 m³. Cada m³ guarda 1 000 litros, así que caben 3 × 1 000 = <strong>3 000 L</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es el área total de un cubo de 5 cm de arista?</p>', respuesta: 6 * 5 ** 2,
        pista: '<p>Tiene 6 caras cuadradas iguales.</p>',
        solucion: '<p>Cada cara es un cuadrado de 5 × 5 = 25 cm², y un cubo tiene 6 caras: 6 × 25 = <strong>150 cm²</strong>.</p>' },
    ],
    fuentes: [PA('9-6-solve-geometry-applications-volume-and-surface-area', 'Solve Geometry Applications: Volume and Surface Area'), WIKI('Volumen', 'Volumen'), WIKI('Poliedro', 'Poliedro')],
  });

  // ------------------------------------------------------------------
  L('Semejanza y congruencia', {
    objetivo: 'Distinguir figuras congruentes y semejantes, usar la razón de semejanza para calcular medidas desconocidas y entender cómo cambian áreas y volúmenes al escalar.',
    explicacion: `
      <p>Piensa en dos monedas de 10 pesos: son idénticas, puedes poner una encima de la otra y coinciden por completo. Ahora piensa en una foto y su ampliación para un cartel: se ven igual, pero una es más grande. Estas dos ideas tienen nombre en geometría.</p>
      <h3>¿Cuándo dos figuras son iguales?</h3>
      <p>Dos figuras son <strong>congruentes</strong> si tienen la misma forma y el mismo tamaño, como las dos monedas. Si recortas una, cabe exacta encima de la otra, aunque a veces tengas que girarla o voltearla.</p>
      <p>En los triángulos no hace falta medir todo para saberlo. Si coinciden ciertas medidas, las demás quedan obligadas a coincidir también, porque solo se puede armar un triángulo con ellas. Estas reglas se llaman <strong>criterios de congruencia</strong>. En sus nombres, L significa lado y A significa ángulo:</p>
      <ul>
        <li><strong>LLL:</strong> los tres lados miden lo mismo. Con tres varillas fijas solo se arma un triángulo.</li>
        <li><strong>LAL:</strong> dos lados miden lo mismo, y también el ángulo que queda entre ellos.</li>
        <li><strong>ALA:</strong> dos ángulos miden lo mismo, y también el lado que queda entre ellos.</li>
      </ul>
      <h3>¿Cuándo tienen la misma forma?</h3>
      <p>Dos figuras son <strong>semejantes</strong> si tienen la misma forma pero pueden tener distinto tamaño, como la foto y su ampliación. En figuras semejantes, los ángulos miden lo mismo y los lados son <strong>proporcionales</strong>: todos se multiplicaron por el mismo número. Ese número se llama <strong>razón de semejanza</strong> y se escribe con la letra k.</p>
      ${fig([-0.8, 12], [-0.9, 4.5], [
        { tipo: 'poligono', puntos: [[0, 0], [3, 0], [3, 2]], relleno: true },
        { tipo: 'poligono', puntos: [[5, 0], [11, 0], [11, 4]], relleno: true, serie: 1 },
        txt(1.5, -0.5, '3'), txt(3.45, 1, '2'), txt(8, -0.5, '6'), txt(11.45, 2, '4'),
      ], 'Dos triángulos rectángulos semejantes: uno de catetos 3 y 2, y otro de catetos 6 y 4, el doble.')}
      <p>Mira la figura. El lado de 3 se volvió 6, y el de 2 se volvió 4. Cada lado del grande mide el doble que el lado que le corresponde en el chico, así que k = 2. Para encontrar k basta dividir un lado del grande entre el lado que le corresponde en el chico: 6 ÷ 3 = 2.</p>
      <p>Fíjate que si k = 1, las figuras tienen el mismo tamaño: son congruentes. Por eso la congruencia es un caso especial de la semejanza.</p>
      <h3>¿Qué pasa con el área y el volumen?</h3>
      <p>Aquí hay que tener cuidado. Si duplicas los lados de un cuadrado de 1 × 1, queda uno de 2 × 2: ya no cabe 1 cuadrito, caben 4. El área creció el doble a lo largo y el doble a lo ancho, o sea, 2 × 2 veces.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que el área y el volumen crecen igual que los lados. Si los lados se multiplican por k, el área se multiplica por k² y el volumen por k³. Duplicar los lados multiplica el área por 4 y el volumen por 8. El volumen crece en tres direcciones a la vez (largo, ancho y alto), por eso es k × k × k.</p>
      <h3>¿Cómo medir algo muy alto con su sombra? (teorema de Tales)</h3>
      <p>A la misma hora, el sol ilumina todo con la misma inclinación. Por eso un palo y su sombra forman un triángulo con la misma forma que un árbol y su sombra: son triángulos semejantes. Si la sombra del árbol es 6 veces la del palo, el árbol también mide 6 veces lo que mide el palo. Esta idea se atribuye a Tales, un sabio griego que, según se cuenta, midió así la altura de una pirámide.</p>`,
    ejemplo: `
      <p>Un palo de 1.5 m proyecta una sombra de 2 m. A la misma hora, un árbol proyecta una sombra de 12 m. ¿Cuánto mide el árbol?</p>
      <ol class="pasos-ej">
        <li>Como es la misma hora, el palo con su sombra y el árbol con su sombra forman triángulos semejantes. Por eso la altura entre la sombra da lo mismo en los dos: ${F('altura del árbol', 12)} = ${F(1.5, 2)}.</li>
        <li>El lado derecho vale 1.5 ÷ 2 = 0.75: cada objeto mide 0.75 veces su sombra.</li>
        <li>Aplícalo al árbol: altura = 12 × 0.75 = 9.</li>
        <li>Comprueba con la razón de semejanza. La sombra del árbol es 12 ÷ 2 = 6 veces la del palo, así que el árbol es 6 veces el palo: 6 × 1.5 = 9. Coincide.</li>
      </ol>
      <p>Resultado: <span class="resultado">el árbol mide 9 m</span>.</p>
      <p class="nota"><strong>Error común:</strong> mezclar el orden y poner la sombra arriba en un lado y abajo en el otro. Sigue el mismo orden en las dos fracciones.</p>`,
    vidaReal: `
      <p>Copiar una forma más grande o más chica, sin deformarla, es algo que hacemos a diario:</p>
      <ul>
        <li>Los mapas, los planos de una casa y las maquetas tienen la misma forma que lo real, solo que en pequeño.</li>
        <li>Al ampliar una foto sin que las personas se vean estiradas o aplastadas.</li>
        <li>Para medir la altura de un árbol o un edificio sin subirte, usando sombras.</li>
        <li>En las fábricas, las piezas idénticas se pueden cambiar una por otra.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un triángulo tiene lados de 4, 6 y 8 cm. Otro triángulo semejante tiene su lado menor de 10 cm. ¿Cuánto mide su lado mayor?</p>', respuesta: 8 * (10 / 4),
        pista: '<p>Compara los lados menores para saber por cuánto se multiplicó todo: 10 ÷ 4.</p>',
        solucion: '<p>El lado menor pasó de 4 a 10, así que la razón de semejanza es 10 ÷ 4 = 2.5. El lado mayor también se multiplica por 2.5: 8 × 2.5 = <strong>20 cm</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una persona de 1.6 m proyecta una sombra de 2 m. A la misma hora, un edificio proyecta una sombra de 25 m. ¿Cuánto mide el edificio?</p>', respuesta: 25 * (1.6 / 2),
        pista: `<p>${F('altura', 25)} = ${F(1.6, 2)}.</p>`,
        solucion: '<p>Cada objeto mide 1.6 ÷ 2 = 0.8 veces su sombra. El edificio mide 25 × 0.8 = <strong>20 m</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Dos triángulos tienen sus tres lados iguales, uno a uno. ¿Qué criterio asegura que son congruentes?</p>', opciones: ['LLL', 'LAL', 'ALA', 'Ninguno, falta medir los ángulos'], correcta: 0,
        pista: '<p>L significa lado y A, ángulo.</p>',
        solucion: '<p><strong>LLL</strong>: si los tres lados son iguales, solo se puede armar un triángulo con ellos, así que los ángulos también coinciden.</p>' },
      { tipo: 'numero', enunciado: '<p>Una maqueta a escala 1:50 mide 30 cm de alto. ¿Cuántos metros mide el edificio real?</p>', respuesta: (30 * 50) / 100,
        pista: '<p>Escala 1:50 quiere decir que cada centímetro de la maqueta son 50 cm reales. Luego pasa a metros.</p>',
        solucion: '<p>30 × 50 = 1 500 cm reales. Como 100 cm son 1 m, el edificio mide 1 500 ÷ 100 = <strong>15 m</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un cuadrado tiene 9 cm² de área. Si duplicas la medida de sus lados, ¿cuál es el área nueva?</p>', respuesta: 9 * 2 ** 2,
        pista: '<p>Si los lados se duplican, k = 2, y el área se multiplica por k² = 4.</p>',
        solucion: '<p>Con k = 2, el área se multiplica por 4: 9 × 4 = <strong>36 cm²</strong>. Compruébalo: el lado pasa de 3 a 6, y 6 × 6 = 36.</p>' },
      { tipo: 'opciones', enunciado: '<p>Dos triángulos tienen los mismos ángulos pero uno es más grande. Son…</p>', opciones: ['Congruentes', 'Semejantes', 'Ni congruentes ni semejantes'], correcta: 1,
        pista: '<p>¿Tienen la misma forma? ¿Y el mismo tamaño?</p>',
        solucion: '<p>Tienen la misma forma (mismos ángulos) pero no el mismo tamaño, así que son <strong>semejantes</strong>, no congruentes.</p>' },
    ],
    fuentes: [PA('9-3-use-properties-of-angles-triangles-and-the-pythagorean-theorem', 'Similar Triangles'), WIKI('Semejanza_(geometría)', 'Semejanza'), WIKI('Teorema_de_Tales', 'Teorema de Tales')],
  });

  // ------------------------------------------------------------------
  const T = [[1, 1], [4, 1], [1, 3]];
  const mueve = (f) => T.map(([a, b]) => f(a, b));
  const centro = (p) => [(p[0][0] + p[1][0] + p[2][0]) / 3, (p[0][1] + p[1][1] + p[2][1]) / 3];
  const conOriginal = (pts, desc) => G({ x: [-5, 5], y: [-4, 4], proporcional: true, descripcion: desc, figuras: [
    { tipo: 'poligono', puntos: T, relleno: true }, { tipo: 'poligono', puntos: pts, relleno: true, serie: 1 },
    txt(...centro(T), 'T'), txt(...centro(pts), "T'")] });
  L('Transformaciones: traslación, rotación y simetría', {
    objetivo: 'Aplicar traslaciones, rotaciones y reflexiones a figuras en el plano cartesiano, y encontrar ejes de simetría.',
    explicacion: `
      <p>Cuando acomodas una foto en el celular, puedes arrastrarla, girarla o voltearla como en un espejo. La foto se mueve, pero no se deforma: las caras no se estiran ni se encogen. Cada uno de esos movimientos tiene nombre en geometría.</p>
      <p>A cualquier cambio de lugar de una figura se le llama <strong>transformación</strong>. Las tres que vas a ver no cambian ni la forma ni el tamaño, así que la figura nueva es congruente con la original. A estos movimientos se les llama <strong>isometrías</strong>, que quiere decir "misma medida".</p>
      <h3>¿Cómo se describe un movimiento con números?</h3>
      <p>Recuerda que en el plano cartesiano cada punto tiene dos coordenadas (x, y): x dice cuánto está a la derecha (o a la izquierda, si es negativa) e y dice cuánto está arriba (o abajo). Para mover una figura, mueves cada uno de sus puntos con la misma regla.</p>
      <ul>
        <li>Una <strong>traslación</strong> desliza la figura sin girarla, como empujar un libro sobre la mesa. Mover a unidades a la derecha suma a la x, y mover b unidades hacia arriba suma a la y. A la izquierda o hacia abajo, se resta.</li>
        <li>Una <strong>reflexión</strong> voltea la figura como en un espejo. Si el espejo es el eje y (la línea vertical), cada punto queda a la misma distancia del otro lado: la x cambia de signo y la y se queda igual. Si el espejo es el eje x (la línea horizontal), pasa al revés.</li>
        <li>Una <strong>rotación</strong> gira la figura alrededor de un punto, como un volante. Aquí giramos alrededor del origen, el punto (0, 0), y en sentido contrario a las manecillas del reloj.</li>
      </ul>
      <div class="tabla-wrap"><table>
        <tr><th>Transformación</th><th>Qué hace</th><th>Regla con coordenadas</th></tr>
        <tr><td><strong>Traslación</strong> por (a, b)</td><td>desliza la figura</td><td>(x, y) → (x + a, y + b)</td></tr>
        <tr><td><strong>Reflexión</strong> sobre el eje y</td><td>espejo izquierda-derecha</td><td>(x, y) → (−x, y)</td></tr>
        <tr><td><strong>Reflexión</strong> sobre el eje x</td><td>espejo arriba-abajo</td><td>(x, y) → (x, −y)</td></tr>
        <tr><td><strong>Rotación</strong> de 90° (contra las manecillas)</td><td>gira un cuarto de vuelta alrededor del origen</td><td>(x, y) → (−y, x)</td></tr>
        <tr><td><strong>Rotación</strong> de 180°</td><td>gira media vuelta alrededor del origen</td><td>(x, y) → (−x, −y)</td></tr>
      </table></div>
      <p>La flecha → se lee "se convierte en". Por ejemplo, con la reflexión sobre el eje y, el punto (3, 2) se convierte en (−3, 2): queda a la misma altura, pero del otro lado.</p>
      <p>¿Por qué la media vuelta cambia los dos signos? Porque al girar 180°, lo que estaba a la derecha queda a la izquierda y lo que estaba arriba queda abajo. Con un cuarto de vuelta, en cambio, lo que estaba a la derecha queda arriba: el punto (1, 0) pasa a (0, 1). Por eso las coordenadas intercambian lugares.</p>
      ${G({ x: [-5, 5], y: [-4, 4], proporcional: true, descripcion: 'Triángulo T en el primer cuadrante, su reflejo T prima sobre el eje y en el segundo cuadrante, y su rotación de 180 grados T doble prima en el tercer cuadrante.', figuras: [
        { tipo: 'poligono', puntos: T, relleno: true },
        { tipo: 'poligono', puntos: mueve((a, b) => [-a, b]), relleno: true, serie: 1 },
        { tipo: 'poligono', puntos: mueve((a, b) => [-a, -b]), relleno: true, serie: 2 },
        txt(1.9, 1.6, 'T'), txt(-1.9, 1.6, "T'"), txt(-1.9, -1.6, "T''"),
      ] })}
      <p>En la figura, T es el triángulo original. T' (se lee "T prima") es su reflejo sobre el eje y: está a la misma altura, pero volteado. T'' ("T doble prima") es T girado media vuelta: quedó abajo y a la izquierda.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir una reflexión con una rotación de 180°. En la reflexión sobre el eje y la figura se queda a la misma altura; en la media vuelta, cambia de lado y también de altura.</p>
      <h3>¿Cuándo una figura es simétrica?</h3>
      <p>Dobla por la mitad una hoja con una mariposa dibujada: si las dos alas coinciden, la línea del doblez es un <strong>eje de simetría</strong>. Es como si esa línea fuera un espejo y cada mitad fuera el reflejo de la otra. Un rectángulo tiene 2 ejes (uno vertical y uno horizontal). Un cuadrado tiene 4, porque además se puede doblar por sus dos diagonales. Un triángulo equilátero tiene 3, y un círculo tiene una infinidad: cualquier línea que pase por su centro lo parte en dos mitades iguales.</p>`,
    ejemplo: `
      <p>Traslada el punto A(2, −1) 3 unidades a la derecha y 4 hacia arriba. Luego refleja el resultado sobre el eje x.</p>
      <ol class="pasos-ej">
        <li>Empieza por la traslación. Ir 3 a la derecha suma 3 a la x, y subir 4 suma 4 a la y: (2 + 3, −1 + 4) = (5, 3). Este punto se llama A'.</li>
        <li>Ahora la reflexión sobre el eje x, que funciona como un espejo acostado. El punto conserva su x, y su y cambia de signo: (5, 3) se convierte en (5, −3).</li>
        <li>Comprueba la reflexión: (5, 3) está 3 unidades arriba del eje x y (5, −3) está 3 unidades abajo, justo en la misma vertical. Es su imagen en el espejo.</li>
      </ol>
      <p>Resultado: <span class="resultado">A' = (5, 3) y después (5, −3)</span>.</p>
      <p class="nota"><strong>Error común:</strong> cambiar el signo de la x al reflejar sobre el eje x. Ese espejo es horizontal, así que solo cambia lo de arriba y abajo: la y.</p>`,
    vidaReal: `
      <p>Mover, girar y voltear figuras sin deformarlas es algo que ves todos los días:</p>
      <ul>
        <li>En los videojuegos y los programas de diseño, los personajes y las imágenes se mueven, giran y se voltean así.</li>
        <li>Los mosaicos, las grecas y los bordados repiten una misma figura una y otra vez.</li>
        <li>Muchas hojas, mariposas, edificios y logotipos tienen dos mitades iguales, como en un espejo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Trasladas el punto P(−3, 5) 4 unidades a la derecha y 2 hacia abajo. ¿Cuál es la coordenada <strong>x</strong> del punto nuevo?</p>', respuesta: -3 + 4,
        pista: '<p>Moverse a la derecha suma a la x.</p>',
        solucion: '<p>Moverse 4 unidades a la derecha suma 4 a la x: −3 + 4 = <strong>1</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con la misma traslación (4 a la derecha y 2 hacia abajo), ¿cuál es la coordenada <strong>y</strong> del punto nuevo?</p>', respuesta: 5 - 2,
        pista: '<p>Moverse hacia abajo resta a la y.</p>',
        solucion: '<p>Bajar 2 unidades resta 2 a la y: 5 − 2 = <strong>3</strong>. El punto nuevo es (1, 3).</p>' },
      { tipo: 'numero', enunciado: '<p>Reflejas el punto (6, −2) sobre el eje x. ¿Cuál es la coordenada <strong>y</strong> del punto reflejado?</p>', respuesta: 2,
        pista: '<p>Sobre el eje x, la x se queda igual y la y cambia de signo.</p>',
        solucion: '<p>El eje x es un espejo horizontal: la x se queda igual y la y cambia de signo. (6, −2) se convierte en (6, <strong>2</strong>).</p>' },
      { tipo: 'numero', enunciado: '<p>Giras el punto (3, 1) 90° contra las manecillas del reloj alrededor del origen. ¿Cuál es la coordenada <strong>x</strong> del resultado?</p>', respuesta: -1,
        pista: '<p>Usa la regla de la rotación de 90°: (x, y) → (−y, x).</p>',
        solucion: '<p>Con la regla (x, y) → (−y, x), el punto (3, 1) se convierte en (−1, 3). La x es <strong>−1</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos ejes de simetría tiene un cuadrado?</p>', respuesta: 4,
        pista: '<p>Busca las líneas por las que puedes doblarlo y que las mitades coincidan: piensa en verticales, horizontales y diagonales.</p>',
        solucion: '<p>Tiene <strong>4</strong>: uno vertical, uno horizontal y uno por cada diagonal. En los cuatro dobleces las dos mitades coinciden.</p>' },
      { tipo: 'opciones', enunciado: '<p>En cada opción, T es el triángulo original. ¿En cuál opción T\' es su <strong>reflejo sobre el eje y</strong>?</p>',
        opciones: [
          conOriginal(mueve((a, b) => [-a, -b]), 'Triángulo T y T prima, que es su rotación de 180 grados.'),
          conOriginal(mueve((a, b) => [a - 5, b - 4]), 'Triángulo T y T prima, que es una traslación hacia abajo a la izquierda.'),
          conOriginal(mueve((a, b) => [-a, b]), 'Triángulo T y T prima, que es su reflejo sobre el eje y, como en un espejo.'),
        ], correcta: 2,
        pista: '<p>En un reflejo sobre el eje y, la figura queda "volteada" como en un espejo, a la misma altura.</p>',
        solucion: '<p>Es la tercera: el triángulo quedó a la misma altura y volteado, como en un espejo, con su ángulo recto abajo a la derecha. La primera y la segunda caen las dos abajo a la izquierda, así que la ubicación no basta para distinguirlas; fíjate en la orientación. En la primera, el triángulo giró media vuelta y su ángulo recto quedó arriba a la derecha. En la segunda solo se deslizó: se ve igual que T, con el ángulo recto abajo a la izquierda, sin voltearse.</p>' },
    ],
    fuentes: [WIKI('Transformación_geométrica', 'Transformación geométrica'), WIKI('Simetría', 'Simetría'), KHAN],
  });
})();
