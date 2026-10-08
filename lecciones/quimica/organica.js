// Química · Unidad 9: Química orgánica.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('quimica', titulo, datos);
  // Flecha de un vector: línea hasta la base de la punta + triángulo sólido como punta.
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
  // Átomo como bolita con su letra encima: se distingue por la letra, no por el color.
  const atomo = ([x, y], letra) => [{ tipo: 'circulo', x, y, r: 0.27, relleno: true }, txt(x, y - 0.02, letra)];
  // Enlace simple, doble o triple entre dos átomos: rayas paralelas recortadas para no tapar los símbolos.
  const enlace = ([x1, y1], [x2, y2], orden = 1, recorte = 0.3) => {
    const largo = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / largo, uy = (y2 - y1) / largo;
    const desp = { 1: [0], 2: [-0.08, 0.08], 3: [-0.13, 0, 0.13] }[orden];
    return desp.map((o) => ({ tipo: 'linea',
      desde: [x1 + ux * recorte - uy * o, y1 + uy * recorte + ux * o], hasta: [x2 - ux * recorte - uy * o, y2 - uy * recorte + ux * o] }));
  };
  // Molécula: átomos [[x, y, letra]] y enlaces [[i, j, orden]] por índice.
  const molecula = (atomos, enlaces) => [
    ...enlaces.flatMap(([i, j, orden]) => enlace(atomos[i], atomos[j], orden)),
    ...atomos.flatMap(([x, y, letra]) => atomo([x, y], letra)),
  ];

  const OSC = (pagina, nombre) => ({ nombre: `OpenStax, Chemistry 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/chemistry-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN_CARBONO = { nombre: 'Khan Academy en español: Propiedades del carbono', url: 'https://es.khanacademy.org/science/biology/properties-of-carbon' };
  const KHAN_ORGANICA = { nombre: 'Khan Academy en español: Química orgánica', url: 'https://es.khanacademy.org/science/organic-chemistry' };
  const PHET = (sim, nombre) => ({ nombre: `PhET, Universidad de Colorado: ${nombre}`, url: `https://phet.colorado.edu/es/simulations/${sim}` });

  // ------------------------------------------------------------------
  const ANILLO = Array.from({ length: 6 }, (_, i) => [9.5 + Math.cos((i * Math.PI) / 3), 1 + Math.sin((i * Math.PI) / 3), 'C']);
  const ESQUELETOS = diagrama([-0.6, 11.1], [-1, 2.6], [
    ...molecula([[0, 1, 'C'], [1, 1, 'C'], [2, 1, 'C'], [3, 1, 'C']], [[0, 1, 1], [1, 2, 1], [2, 3, 1]]),
    ...molecula([[4.5, 1, 'C'], [5.5, 1, 'C'], [6.5, 1, 'C'], [5.5, 2, 'C']], [[0, 1, 1], [1, 2, 1], [1, 3, 1]]),
    ...molecula(ANILLO, [[0, 1, 1], [1, 2, 1], [2, 3, 1], [3, 4, 1], [4, 5, 1], [5, 0, 1]]),
    txt(1.5, -0.5, 'cadena recta'), txt(5.5, -0.5, 'ramificada'), txt(9.5, -0.5, 'anillo'),
  ], 'Tres formas en que se unen los carbonos, dibujados como bolitas con la letra C y unidos por rayas; los hidrógenos no se dibujan. Cadena recta: 4 carbonos en fila. Ramificada: 3 carbonos en fila y un cuarto que sale hacia arriba del carbono de en medio. Anillo: 6 carbonos unidos en un hexágono cerrado.');

  L('El carbono, base de la vida', {
    objetivo: 'Entender por qué el carbono forma tantísimos compuestos y leer fórmulas estructurales sencillas.',
    explicacion: `
      <p>Tu cuerpo, el azúcar del café, la gasolina, la madera de una mesa y una bolsa de plástico parecen no tener nada en común. Pero si los miras por dentro, todos están construidos sobre lo mismo: átomos de carbono unidos unos con otros.</p>
      <h3>La química del carbono</h3>
      <p>En la Unidad 1 viste que la química se divide en ramas. A la rama que estudia los compuestos del carbono se le llama <strong>química orgánica</strong>. El nombre viene de que antes se creía que estas sustancias solo podían fabricarlas los seres vivos. Hoy se fabrican en laboratorios, pero el nombre se quedó. Unos pocos compuestos con carbono, como el CO₂ o los carbonatos, se estudian aparte, en la química inorgánica.</p>
      <p>Lo sorprendente es cuántos son: la gran mayoría de las sustancias que se conocen, decenas de millones, son compuestos de carbono. Casi todos los demás elementos juntos forman muchas menos.</p>
      <h3>¿Por qué el carbono?</h3>
      <p>Hay dos razones, y las dos ya las conoces.</p>
      <ul>
        <li>El carbono tiene 4 electrones de valencia, así que forma 4 enlaces covalentes, como viste en la Unidad 4. Es como una pieza de construcción con cuatro conectores: se puede unir a muchas cosas a la vez.</li>
        <li>Se une muy bien consigo mismo. Un carbono se puede pegar a otro, y ese a otro, y así formar filas larguísimas.</li>
      </ul>
      <p>A esa fila de carbonos unidos, que forma el "esqueleto" de una molécula orgánica, se le llama <strong>cadena de carbono</strong>. Puede ser recta, tener ramas o cerrarse sobre sí misma en un anillo:</p>
      ${ESQUELETOS}
      <p>Además, entre dos carbonos puede haber un enlace simple, doble o triple. Con tantas formas de combinar el tamaño de la cadena, las ramas, los anillos y los tipos de enlace, las posibilidades son casi infinitas, como las palabras que puedes armar con las letras del alfabeto.</p>
      <h3>Cómo se dibujan</h3>
      <p>Una fórmula como C₃H₈ dice qué átomos hay, pero no cómo están unidos. Por eso en química orgánica se usa la <strong>fórmula estructural</strong>: un dibujo donde cada átomo está en su lugar y cada raya es un enlace, como en las estructuras de Lewis. A veces se escribe abreviada, por ejemplo CH₃–CH₂–CH₃, que quiere decir "un carbono con 3 hidrógenos, unido a uno con 2, unido a otro con 3".</p>
      <p>La regla para revisar un dibujo es sencilla: cada carbono tiene que tener exactamente 4 enlaces, y cada hidrógeno, 1.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que "orgánico" quiere decir "natural" o "sin químicos", como en los alimentos orgánicos. En química, orgánico solo quiere decir que tiene carbono: el plástico y la gasolina son orgánicos.</p>`,
    ejemplo: `
      <p>El propano, el gas de los tanques de cocina, tiene una cadena recta de 3 carbonos con solo enlaces simples. ¿Cuántos hidrógenos tiene?</p>
      <ol class="pasos-ej">
        <li>Dibuja la cadena: C–C–C. Cada carbono necesita 4 enlaces en total.</li>
        <li>Los carbonos de las puntas solo tocan a un carbono vecino, así que usan 1 enlace. Les faltan 3, y los llenas con 3 hidrógenos cada uno.</li>
        <li>El carbono de en medio toca a dos carbonos, así que usa 2 enlaces. Le faltan 2: lleva 2 hidrógenos.</li>
        <li>Suma: 3 + 2 + 3 = 8 hidrógenos. La fórmula es C₃H₈, que abreviada se escribe CH₃–CH₂–CH₃.</li>
        <li>Comprueba cada carbono contando sus rayas: todos tienen 4.</li>
      </ol>
      <p>Resultado: <span class="resultado">8 hidrógenos: C₃H₈</span>.</p>
      <p class="nota"><strong>Error común:</strong> darle 4 hidrógenos a cada carbono, como si estuvieran solos. Los enlaces con otros carbonos también cuentan.</p>`,
    vidaReal: `
      <p>El carbono está detrás de cosas muy distintas que usas a diario:</p>
      <ul>
        <li>La comida que te da energía, como el pan y el azúcar, está hecha sobre todo de él.</li>
        <li>La gasolina y el gas de la estufa también, y por eso arden.</li>
        <li>Los plásticos de botellas, juguetes y ropa sintética se fabrican a partir de él.</li>
        <li>Tu propio cuerpo, tu pelo y tus músculos están construidos con él.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuántos enlaces covalentes forma un átomo de carbono?</p>', respuesta: 4,
        pista: '<p>¿Cuántos electrones de valencia tiene?</p>',
        solucion: '<p>Forma <strong>4 enlaces</strong>, uno por cada electrón de valencia que le falta para el octeto.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas sustancias es un compuesto orgánico?</p>',
        opciones: ['La sal de mesa, NaCl', 'El agua, H₂O', 'El óxido de hierro, Fe₂O₃', 'El azúcar, C₁₂H₂₂O₁₁'], correcta: 3,
        pista: '<p>Busca la que está construida sobre carbono.</p>',
        solucion: '<p>El <strong>azúcar</strong>: tiene una estructura de 12 carbonos. Las otras no tienen carbono.</p>' },
      { tipo: 'numero', enunciado: '<p>El metano, CH₄, tiene un solo carbono. ¿Cuántos hidrógenos lleva unidos?</p>', respuesta: 4,
        pista: '<p>El carbono no está unido a otro carbono, así que sus 4 enlaces van a hidrógenos.</p>',
        solucion: '<p>Lleva <strong>4 hidrógenos</strong>, uno en cada enlace.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el carbono forma tantísimos compuestos distintos?</p>',
        opciones: ['Porque es el elemento más pesado', 'Porque es un metal muy reactivo', 'Porque forma 4 enlaces y se une consigo mismo en cadenas, ramas y anillos'], correcta: 2,
        pista: '<p>Piensa en sus conectores y en con quién se puede unir.</p>',
        solucion: '<p>Porque <strong>forma 4 enlaces y se une consigo mismo</strong>: con eso arma cadenas de cualquier largo y forma.</p>' },
      { tipo: 'numero', enunciado: '<p>El etano tiene 2 carbonos unidos por un enlace simple. ¿Cuántos hidrógenos tiene?</p>', respuesta: 3 + 3,
        pista: '<p>Cada carbono usa un enlace en el otro carbono. ¿Cuántos le quedan?</p>',
        solucion: '<p>A cada carbono le quedan 3 enlaces, que llena con 3 hidrógenos: 3 + 3 = <strong>6</strong>. Es C₂H₆.</p>' },
      { tipo: 'opciones', enunciado: '<p>Si los dos extremos de una cadena de carbonos se unen entre sí, ¿qué forma se obtiene?</p>',
        opciones: ['Un anillo', 'Una cadena ramificada', 'Una cadena recta más larga'], correcta: 0,
        pista: '<p>Mira el tercer dibujo.</p>',
        solucion: '<p>Se forma <strong>un anillo</strong>, una cadena cerrada sobre sí misma.</p>' },
    ],
    fuentes: [
      WIKI('Química_orgánica', 'Química orgánica'),
      WIKI('Carbono', 'Carbono'),
      KHAN_CARBONO,
      PHET('build-a-molecule', 'Construye una molécula'),
    ],
  });

  // ------------------------------------------------------------------
  const PROPANO = diagrama([-1.7, 4.5], [-2.3, 1.6], [
    ...molecula([[0, 0, 'C'], [1.4, 0, 'C'], [2.8, 0, 'C'],
      [-1.1, 0, 'H'], [0, 1.1, 'H'], [0, -1.1, 'H'], [1.4, 1.1, 'H'], [1.4, -1.1, 'H'], [3.9, 0, 'H'], [2.8, 1.1, 'H'], [2.8, -1.1, 'H']],
    [[0, 1, 1], [1, 2, 1], [0, 3, 1], [0, 4, 1], [0, 5, 1], [1, 6, 1], [1, 7, 1], [2, 8, 1], [2, 9, 1], [2, 10, 1]]),
    txt(1.4, -1.9, 'propano, C₃H₈'),
  ], 'Fórmula estructural del propano: 3 carbonos en fila unidos por rayas simples. El carbono de la izquierda tiene 3 hidrógenos alrededor, el de en medio 2 (arriba y abajo) y el de la derecha 3. En total, 3 carbonos y 8 hidrógenos, y cada carbono tiene 4 rayas.');

  L('Hidrocarburos', {
    objetivo: 'Reconocer los hidrocarburos, distinguir alcanos, alquenos y alquinos, y escribir la fórmula de un alcano a partir de su número de carbonos.',
    explicacion: `
      <p>El gas de la estufa, la gasolina del coche y la cera de una vela vienen del mismo lugar: el petróleo y el gas natural. Y están hechos de solo dos elementos, carbono e hidrógeno, acomodados en cadenas de distintos tamaños.</p>
      <h3>Solo carbono e hidrógeno</h3>
      <p>A un compuesto formado únicamente por carbono e hidrógeno se le llama <strong>hidrocarburo</strong>. Son los compuestos orgánicos más sencillos y los que más energía nos dan: al quemarse, forman dióxido de carbono y agua y sueltan mucho calor, como viste en la lección de tipos de reacciones.</p>
      <h3>Alcanos: solo enlaces simples</h3>
      <p>Un <strong>alcano</strong> es un hidrocarburo en el que todos los enlaces entre carbonos son simples. Como cada carbono comparte solo un enlace con cada vecino, le quedan más lugares libres para hidrógenos: lleva el máximo de hidrógenos que puede tener. Su nombre termina en "-ano", y el principio dice cuántos carbonos tiene:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Nombre</th><th>Carbonos</th><th>Fórmula</th><th>Dónde lo encuentras</th></tr>
        <tr><th>Metano</th><td>1</td><td>CH₄</td><td>Gas natural</td></tr>
        <tr><th>Etano</th><td>2</td><td>C₂H₆</td><td>Gas natural</td></tr>
        <tr><th>Propano</th><td>3</td><td>C₃H₈</td><td>Gas de los tanques de cocina</td></tr>
        <tr><th>Butano</th><td>4</td><td>C₄H₁₀</td><td>Encendedores y gas de cocina</td></tr>
        <tr><th>Pentano</th><td>5</td><td>C₅H₁₂</td><td>Disolventes</td></tr>
        <tr><th>Octano</th><td>8</td><td>C₈H₁₈</td><td>Gasolina</td></tr>
      </table></div>
      <p>Fíjate en el patrón de la tabla: los hidrógenos siempre son el doble de los carbonos, más 2. Por eso la fórmula de cualquier alcano es:</p>
      <p>CₙH₂ₙ₊₂</p>
      <p>Se lee "n carbonos y dos por n más dos hidrógenos", donde n es el número de carbonos. ¿De dónde sale el "+2"? Cada carbono de la cadena lleva 2 hidrógenos, uno arriba y uno abajo, y los dos de las puntas llevan uno más cada uno.</p>
      ${PROPANO}
      <h3>Alquenos y alquinos: enlaces dobles y triples</h3>
      <p>Si entre dos carbonos hay un enlace doble, el hidrocarburo es un <strong>alqueno</strong> y su nombre termina en "-eno". El más sencillo es el eteno, C₂H₄: como los carbonos comparten dos pares entre ellos, les quedan menos lugares y llevan menos hidrógenos que el etano. Las frutas sueltan un poco de eteno, y eso las madura. Si hay un enlace triple, es un alquino, terminado en "-ino", como el etino o acetileno de los sopletes de soldar.</p>
      <h3>Del petróleo a la gasolina</h3>
      <p>El petróleo es una mezcla de cientos de hidrocarburos. Se separa en las refinerías por destilación, el método que viste en la Unidad 1: las cadenas cortas hierven a temperaturas bajas y salen como gas; las medianas, como gasolina; y las largas, como diésel, aceites y ceras.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que la terminación no importa. Etano (-ano), eteno (-eno) y etino (-ino) tienen los mismos dos carbonos, pero son sustancias distintas por el tipo de enlace.</p>`,
    ejemplo: `
      <p>Escribe la fórmula del butano, un alcano de 4 carbonos, y comprueba que esté bien.</p>
      <ol class="pasos-ej">
        <li>Usa la fórmula de los alcanos, CₙH₂ₙ₊₂, con n = 4, porque el prefijo "but-" quiere decir 4 carbonos.</li>
        <li>Calcula los hidrógenos: 2 × 4 + 2 = 10. La fórmula es C₄H₁₀.</li>
        <li>Comprueba dibujando la cadena C–C–C–C. Los dos carbonos de las puntas tienen 1 vecino, así que llevan 3 hidrógenos cada uno: 6.</li>
        <li>Los dos de en medio tienen 2 vecinos, así que llevan 2 hidrógenos cada uno: 4.</li>
        <li>Suma los hidrógenos de las puntas y los de en medio: 6 + 4 = 10. Coincide con lo que dio la fórmula.</li>
      </ol>
      <p>Resultado: <span class="resultado">C₄H₁₀</span>, el gas de los encendedores.</p>
      <p class="nota"><strong>Error común:</strong> olvidar el "+2" y escribir C₄H₈. Esa fórmula no es de un alcano: le faltan los hidrógenos extra de las puntas.</p>`,
    vidaReal: `
      <p>Las sustancias hechas solo de carbono e hidrógeno mueven buena parte del mundo:</p>
      <ul>
        <li>El gas de la estufa y el de los tanques de cocina sirven para cocinar tus alimentos.</li>
        <li>La gasolina y el diésel mueven coches, autobuses y camiones de carga.</li>
        <li>Las velas y algunas cremas están hechas de ceras que vienen del petróleo.</li>
        <li>Los plátanos verdes maduran más rápido en una bolsa cerrada, por un gas que ellos mismos sueltan.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>El pentano es un alcano de 5 carbonos. ¿Cuántos hidrógenos tiene?</p>', respuesta: 2 * 5 + 2,
        pista: '<p>Usa CₙH₂ₙ₊₂ con n = 5.</p>',
        solucion: '<p>2 × 5 + 2 = <strong>12 hidrógenos</strong>: C₅H₁₂.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el alcano C₃H₈, el gas de los tanques de cocina?</p>', respuestas: ['propano', 'el propano', 'gas propano'],
        pista: '<p>El prefijo para 3 carbonos es "prop-".</p>',
        solucion: '<p>Es el <strong>propano</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas fórmulas es la de un alqueno?</p>',
        opciones: ['C₂H₆', 'CH₄', 'C₂H₄', 'C₃H₈'], correcta: 2,
        pista: '<p>Los alcanos cumplen CₙH₂ₙ₊₂. Busca el que tenga menos hidrógenos de los que le tocarían.</p>',
        solucion: '<p>El <strong>C₂H₄</strong>, el eteno: tiene un enlace doble entre sus carbonos. Las otras tres cumplen CₙH₂ₙ₊₂ y son alcanos.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos carbonos tiene el octano, uno de los componentes de la gasolina?</p>', respuesta: 8,
        pista: '<p>"Oct-" es el mismo prefijo de octágono.</p>',
        solucion: '<p>Tiene <strong>8 carbonos</strong>: C₈H₁₈.</p>' },
      { tipo: 'numero', enunciado: '<p>El hexano es un alcano de 6 carbonos. ¿Cuántos hidrógenos tiene?</p>', respuesta: 2 * 6 + 2,
        pista: '<p>El doble de los carbonos, más 2.</p>',
        solucion: '<p>2 × 6 + 2 = <strong>14 hidrógenos</strong>: C₆H₁₄.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué se forma cuando un hidrocarburo se quema con suficiente oxígeno?</p>',
        opciones: ['Dióxido de carbono y agua', 'Hidrógeno y carbono sueltos', 'Oxígeno y metano'], correcta: 0,
        pista: '<p>El carbono se junta con oxígeno, y el hidrógeno también.</p>',
        solucion: '<p><strong>Dióxido de carbono y agua</strong>, y se suelta mucho calor.</p>' },
    ],
    fuentes: [
      OSC('20-1-hydrocarbons', 'Hydrocarbons'),
      WIKI('Hidrocarburo', 'Hidrocarburo'),
      WIKI('Alcano', 'Alcano'),
      WIKI('Alqueno', 'Alqueno'),
    ],
  });

  // ------------------------------------------------------------------
  const ETANOL_ACETICO = diagrama([-1.7, 11.3], [-2.3, 2], [
    ...molecula([[0, 0, 'C'], [1.4, 0, 'C'], [2.8, 0, 'O'], [3.9, 0, 'H'],
      [-1.1, 0, 'H'], [0, 1.1, 'H'], [0, -1.1, 'H'], [1.4, 1.1, 'H'], [1.4, -1.1, 'H']],
    [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 4, 1], [0, 5, 1], [0, 6, 1], [1, 7, 1], [1, 8, 1]]),
    ...molecula([[6.7, 0, 'C'], [8.1, 0, 'C'], [8.1, 1.3, 'O'], [9.5, 0, 'O'], [10.6, 0, 'H'],
      [5.6, 0, 'H'], [6.7, 1.1, 'H'], [6.7, -1.1, 'H']],
    [[0, 1, 1], [1, 2, 2], [1, 3, 1], [3, 4, 1], [0, 5, 1], [0, 6, 1], [0, 7, 1]]),
    txt(3.35, -0.75, 'grupo –OH'), txt(9.3, -0.75, 'grupo –COOH'),
    txt(1.4, -1.9, 'etanol (alcohol)'), txt(8.1, -1.9, 'ácido acético (vinagre)'),
  ], 'Dos fórmulas estructurales. A la izquierda, el etanol: dos carbonos con sus hidrógenos y, en la punta derecha, un oxígeno unido a un hidrógeno, rotulado "grupo –OH". A la derecha, el ácido acético del vinagre: dos carbonos; el segundo tiene un oxígeno arriba unido con doble raya y otro oxígeno a la derecha unido a un hidrógeno; ese conjunto está rotulado "grupo –COOH".');

  L('Grupos funcionales', {
    objetivo: 'Reconocer los grupos funcionales más comunes y relacionarlos con las propiedades de sustancias cotidianas.',
    explicacion: `
      <p>El alcohol del gel antibacterial, el vinagre y el quitaesmalte tienen moléculas pequeñas, de 2 o 3 carbonos. Sin embargo, huelen distinto, se portan distinto y sirven para cosas muy diferentes. La diferencia no está en la cadena de carbonos, sino en un grupito de átomos que llevan pegado.</p>
      <h3>La parte que manda</h3>
      <p>A un grupo de átomos que le da a una molécula orgánica su forma de portarse se le llama <strong>grupo funcional</strong>. Es como el accesorio de una herramienta: el mango puede ser igual, pero la punta decide si es destornillador o martillo. La cadena de carbonos es el mango, y el grupo funcional es la punta.</p>
      <p>Por eso los químicos agrupan las sustancias orgánicas en familias según su grupo funcional. Si sabes cómo se porta un miembro de la familia, sabes más o menos cómo se portan los demás.</p>
      <h3>Dos grupos muy comunes</h3>
      <p>Un <strong>alcohol</strong> es un compuesto orgánico que tiene un grupo –OH, un oxígeno con un hidrógeno, unido a un carbono. El más conocido es el etanol, CH₃–CH₂–OH, el de las bebidas alcohólicas y el gel antibacterial. Ojo: el grupo –OH de un alcohol no es el ion OH⁻ de los hidróxidos; aquí está unido con un enlace covalente y no se suelta en el agua.</p>
      <p>Un <strong>ácido carboxílico</strong> tiene el grupo –COOH: un carbono con un oxígeno unido con doble enlace y un –OH. Ese hidrógeno del final sí se suelta un poco en el agua, y por eso estos compuestos son ácidos débiles, como viste en la Unidad 8. El ácido acético del vinagre, CH₃–COOH, es uno; el ácido cítrico del limón tiene tres grupos así.</p>
      ${ETANOL_ACETICO}
      <h3>Otras familias</h3>
      <div class="tabla-wrap"><table>
        <tr><th>Familia</th><th>Cómo se reconoce</th><th>Ejemplo cotidiano</th></tr>
        <tr><th>Alcohol</th><td>–OH unido a un carbono</td><td>Etanol del gel antibacterial</td></tr>
        <tr><th>Ácido carboxílico</th><td>–COOH</td><td>Ácido acético del vinagre</td></tr>
        <tr><th>Cetona</th><td>Un C=O en medio de la cadena</td><td>Acetona del quitaesmalte, CH₃–CO–CH₃</td></tr>
        <tr><th>Éster</th><td>–COO– entre dos cadenas</td><td>Olores de frutas, como el plátano</td></tr>
        <tr><th>Éter</th><td>Un O entre dos cadenas</td><td>Éter que se usaba como anestesia</td></tr>
        <tr><th>Amina</th><td>Un N unido a la cadena</td><td>Olor del pescado</td></tr>
      </table></div>
      <p>Un cambio pequeño en la cadena puede cambiarlo todo. El metanol, CH₃–OH, tiene un carbono menos que el etanol y el mismo grupo –OH, pero es muy tóxico: tomar un poco puede dejar ciega a una persona o matarla. Por eso nunca se bebe alcohol de origen desconocido.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que "alcohol" solo es el de las bebidas. En química, alcohol es toda una familia: cualquier molécula orgánica con un –OH unido a un carbono.</p>`,
    ejemplo: `
      <p>Tienes dos líquidos transparentes: uno es CH₃–CH₂–OH y el otro es CH₃–COOH. Sin probarlos, ¿cuál es el agrio?</p>
      <ol class="pasos-ej">
        <li>Busca el grupo funcional del primero. Termina en –OH unido a un carbono que no tiene otro oxígeno: es un alcohol, el etanol.</li>
        <li>Busca el del segundo. Termina en –COOH: un carbono con un oxígeno doble y un –OH. Es un ácido carboxílico, el ácido acético.</li>
        <li>Recuerda qué hace cada familia: los ácidos carboxílicos sueltan un poco de H⁺ en el agua, y el H⁺ es lo que da el sabor agrio.</li>
        <li>Comprueba sin probar: una gota de cada uno en agua de col morada. El ácido acético la pondrá roja; el etanol la dejará morada.</li>
      </ol>
      <p>Resultado: <span class="resultado">el agrio es CH₃–COOH, el ácido del vinagre</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que los dos son ácidos porque los dos terminan en OH. Lo que importa es el grupo completo: en el ácido, ese OH está junto a un oxígeno con doble enlace.</p>`,
    vidaReal: `
      <p>Un pequeño grupo de átomos puede cambiar por completo cómo se porta una sustancia:</p>
      <ul>
        <li>El gel antibacterial mata gérmenes, y el vinagre condimenta tu ensalada, aunque sus moléculas se parezcan mucho.</li>
        <li>Los sabores artificiales de fresa o plátano se fabrican copiando las sustancias que dan su olor a las frutas.</li>
        <li>El quitaesmalte disuelve el barniz de uñas.</li>
        <li>Nunca hay que tomar alcohol de origen desconocido, porque podría ser uno muy tóxico.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas moléculas es un alcohol?</p>',
        opciones: ['CH₄', 'CH₃–COOH', 'CH₃–CO–CH₃', 'CH₃–CH₂–OH'], correcta: 3,
        pista: '<p>Busca un –OH unido a un carbono que no tenga otro oxígeno.</p>',
        solucion: '<p>El <strong>CH₃–CH₂–OH</strong>, el etanol. El CH₃–COOH es un ácido, el CH₃–CO–CH₃ es la acetona, una cetona, y el CH₄ es un alcano.</p>' },
      { tipo: 'opciones', enunciado: '<p>La acetona del quitaesmalte tiene un C=O en medio de la cadena. ¿A qué familia pertenece?</p>',
        opciones: ['Cetona', 'Alcohol', 'Amina'], correcta: 0,
        pista: '<p>Revisa la tabla: ¿qué familia tiene un C=O en medio?</p>',
        solucion: '<p>Es una <strong>cetona</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué grupo funcional hace ácido al vinagre?</p>',
        opciones: ['Éster', 'Ácido carboxílico, –COOH', 'Amina'], correcta: 1,
        pista: '<p>Su ácido es el ácido acético.</p>',
        solucion: '<p>El <strong>grupo –COOH</strong> de los ácidos carboxílicos, que suelta un poco de H⁺ en el agua.</p>' },
      { tipo: 'texto', enunciado: '<p>Una molécula orgánica tiene un grupo –OH unido a un carbono. ¿A qué familia pertenece?</p>',
        respuestas: ['alcohol', 'alcoholes', 'un alcohol', 'los alcoholes'],
        pista: '<p>Es la familia del etanol.</p>',
        solucion: '<p>Es un <strong>alcohol</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos átomos en total tiene una molécula de etanol, C₂H₆O?</p>', respuesta: 2 + 6 + 1,
        pista: '<p>Suma los carbonos, los hidrógenos y el oxígeno.</p>',
        solucion: '<p>2 + 6 + 1 = <strong>9 átomos</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué nunca hay que beber metanol, aunque sea un alcohol?</p>',
        opciones: ['Porque sabe muy agrio', 'Porque no tiene carbono', 'Porque es muy tóxico y puede causar ceguera o la muerte'], correcta: 2,
        pista: '<p>Un carbono menos que el etanol cambia mucho las cosas.</p>',
        solucion: '<p>Porque <strong>es muy tóxico</strong>: aun en poca cantidad puede dejar ciega a una persona o matarla.</p>' },
    ],
    fuentes: [
      OSC('20-2-alcohols-and-ethers', 'Alcohols and Ethers'),
      OSC('20-3-aldehydes-ketones-carboxylic-acids-and-esters', 'Aldehydes, Ketones, Carboxylic Acids, and Esters'),
      OSC('20-4-amines-and-amides', 'Amines and Amides'),
      WIKI('Grupo_funcional', 'Grupo funcional'),
      WIKI('Etanol', 'Etanol'),
    ],
  });

  // ------------------------------------------------------------------
  const SUELTOS = [[0, 1], [1, 1.3], [0.3, 0], [1.3, 0.2], [0.6, -0.9], [1.6, -0.8]];
  const CADENA_M = Array.from({ length: 6 }, (_, i) => [4.4 + 0.65 * i, 0.2, 'M']);
  const CADENA = diagrama([-0.6, 8.2], [-2.1, 1.8], [
    ...SUELTOS.flatMap(([x, y]) => atomo([x, y], 'M')),
    ...flecha([2.4, 0.2], [3.6, 0.2]),
    ...molecula(CADENA_M, [[0, 1, 1], [1, 2, 1], [2, 3, 1], [3, 4, 1], [4, 5, 1]]),
    txt(0.8, -1.7, 'monómeros sueltos'), txt(6, -1.7, 'polímero'),
  ], 'A la izquierda, seis bolitas sueltas rotuladas M, los monómeros. Una flecha apunta a la derecha, donde las mismas seis bolitas M están unidas en fila, una tras otra, formando una cadena: el polímero.');

  L('Polímeros y plásticos', {
    objetivo: 'Entender qué son los polímeros, distinguir los naturales de los sintéticos y conocer los tipos de plástico y su impacto.',
    explicacion: `
      <p>Un collar se arma ensartando muchas cuentas iguales, una tras otra. Un tren se arma enganchando vagones. Con muchas piezas pequeñas y repetidas se puede construir algo largo y fuerte. Las moléculas más grandes del mundo se construyen igual.</p>
      <h3>Piezas que se repiten</h3>
      <p>A la pieza pequeña que se repite se le llama <strong>monómero</strong> ("mono" quiere decir uno). Al unirse cientos o miles de monómeros en una cadena larguísima se forma un <strong>polímero</strong> ("poli" quiere decir muchos). Y a la reacción en la que los monómeros se enganchan se le llama <strong>polimerización</strong>.</p>
      ${CADENA}
      <p>Tu cuerpo está lleno de polímeros naturales. El almidón del pan y la papa es una cadena de muchas unidades de glucosa, un azúcar. La celulosa de la madera y del algodón también. Las proteínas de tus músculos son cadenas de aminoácidos, y el ADN, que guarda tus instrucciones genéticas, es otro polímero.</p>
      <h3>Polímeros fabricados</h3>
      <p>Los plásticos son polímeros sintéticos, fabricados casi siempre a partir del petróleo. El más común es el polietileno, el de las bolsas. Su monómero es el eteno, C₂H₄, el alqueno que viste en la lección de hidrocarburos. Durante la polimerización, el enlace doble de cada eteno se abre y le deja un brazo libre a cada carbono, con el que se engancha al eteno vecino. Así se forma una cadena con miles de carbonos.</p>
      <p>Los plásticos se identifican con un número dentro de un triángulo de flechas, que suele venir en la base del envase:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Código</th><th>Plástico</th><th>Dónde lo encuentras</th></tr>
        <tr><th>1</th><td>PET</td><td>Botellas de agua y refresco</td></tr>
        <tr><th>2</th><td>PEAD (polietileno de alta densidad)</td><td>Envases de leche, shampoo y detergente</td></tr>
        <tr><th>3</th><td>PVC</td><td>Tubos y mangueras</td></tr>
        <tr><th>4</th><td>PEBD (polietileno de baja densidad)</td><td>Bolsas y películas para envolver</td></tr>
        <tr><th>5</th><td>PP (polipropileno)</td><td>Tapas y recipientes para comida</td></tr>
        <tr><th>6</th><td>PS (poliestireno)</td><td>Unicel y vasos desechables</td></tr>
        <tr><th>7</th><td>Otros</td><td>Otros plásticos o mezclas de varios</td></tr>
      </table></div>
      <h3>El problema de lo que dura</h3>
      <p>Lo que hace útiles a los plásticos, que son baratos, ligeros y resistentes, también es su problema: duran cientos de años. Con el sol y el agua se rompen en pedacitos llamados microplásticos, que ya se encuentran en el mar, en los peces y en el agua que tomamos.</p>
      <p>Por eso el orden importa: primero reducir, después reutilizar y al final reciclar. Reciclar gasta energía y no todo el plástico se puede reciclar, así que lo mejor es no necesitarlo.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que el triángulo de flechas significa que el envase se recicla. Solo dice de qué plástico está hecho; muchos tipos casi no se reciclan.</p>`,
    ejemplo: `
      <p>Una cadena de polietileno tiene una masa de 28 000 u. Cada monómero de eteno, C₂H₄, pesa 28 u. ¿Cuántos monómeros forman la cadena?</p>
      <ol class="pasos-ej">
        <li>Primero comprueba la masa del monómero: 2 carbonos de 12 y 4 hidrógenos de 1 dan 24 + 4 = 28 u.</li>
        <li>La cadena es la suma de muchos monómeros iguales, así que divides la masa total entre la de cada pieza: 28 000 ÷ 28 = 1 000.</li>
        <li>Calcula cuántos carbonos hay: cada monómero aporta 2, así que la cadena tiene 2 × 1 000 = 2 000 carbonos.</li>
        <li>Comprueba al revés: 1 000 monómeros de 28 u pesan 1 000 × 28 = 28 000 u.</li>
      </ol>
      <p>Resultado: <span class="resultado">1 000 monómeros de eteno</span>. Las cadenas reales de una bolsa son todavía más largas.</p>
      <p class="nota"><strong>Error común:</strong> dividir entre la masa de un solo carbono, 12. El monómero completo es C₂H₄, con sus 28 u.</p>`,
    vidaReal: `
      <p>Las moléculas larguísimas hechas de piezas repetidas te rodean por todas partes:</p>
      <ul>
        <li>La ropa de algodón, la de poliéster y la de nylon están hechas de ellas.</li>
        <li>El pan, la papa y la tortilla te dan energía gracias a una de ellas, el almidón.</li>
        <li>El número en la base de una botella te dice de qué plástico está hecha.</li>
        <li>Llevar tu propia bolsa al mercado evita que miles de bolsas terminen en el mar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una cadena de polietileno tiene una masa de 56 000 u, y cada monómero de eteno pesa 28 u. ¿Cuántos monómeros tiene?</p>', respuesta: 56000 / 28,
        pista: '<p>Divide la masa total entre la masa de cada monómero.</p>',
        solucion: '<p>56 000 ÷ 28 = <strong>2 000 monómeros</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos es un polímero natural?</p>',
        opciones: ['El polietileno', 'El almidón', 'El PVC', 'El nylon'], correcta: 1,
        pista: '<p>Busca el que fabrican las plantas.</p>',
        solucion: '<p>El <strong>almidón</strong>, que fabrican las plantas uniendo muchas glucosas. Los otros tres son plásticos fabricados.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una botella de agua tiene el número 1 en su base. ¿De qué plástico es?</p>',
        opciones: ['PET', 'PVC', 'Poliestireno (unicel)'], correcta: 0,
        pista: '<p>Revisa la tabla de códigos.</p>',
        solucion: '<p>Es <strong>PET</strong>, el plástico de las botellas de agua y refresco.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es un monómero?</p>',
        opciones: ['La pieza pequeña que se repite para formar un polímero', 'Una cadena muy larga de átomos', 'Un plástico reciclado'], correcta: 0,
        pista: '<p>"Mono" quiere decir uno.</p>',
        solucion: '<p>Es <strong>la pieza pequeña que se repite</strong>, como cada cuenta de un collar.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos es un polímero sintético, fabricado por las personas?</p>',
        opciones: ['La celulosa', 'El almidón', 'Las proteínas', 'El nylon'], correcta: 3,
        pista: '<p>Tres de ellos los fabrican los seres vivos.</p>',
        solucion: '<p>El <strong>nylon</strong>, que se usa en ropa, cuerdas y cepillos. Los otros tres son naturales.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué ayuda más al ambiente con los plásticos?</p>',
        opciones: ['Reciclar todo y usar todo el plástico que quieras', 'Reducir y reutilizar antes de reciclar', 'Quemar los plásticos en casa'], correcta: 1,
        pista: '<p>Reciclar gasta energía y no todo se puede reciclar.</p>',
        solucion: '<p><strong>Reducir y reutilizar primero</strong>: el plástico que no se usa no contamina. Quemarlo en casa suelta gases tóxicos.</p>' },
    ],
    fuentes: [
      WIKI('Polímero', 'Polímero'),
      WIKI('Plástico', 'Plástico'),
      WIKI('Polietileno', 'Polietileno'),
      WIKI('Microplástico', 'Microplástico'),
      KHAN_ORGANICA,
    ],
  });
})();
