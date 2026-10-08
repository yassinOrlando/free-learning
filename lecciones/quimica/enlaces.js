// Química · Unidad 4: Enlaces químicos.
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

  // Estructuras de Lewis. Los electrones son puntos alrededor del símbolo; un par va como dos puntos juntos.
  const LADOS = { arriba: [0, 1], der: [1, 0], abajo: [0, -1], izq: [-1, 0] };
  const separacion = (s) => (s.length > 1 ? 0.55 : 0.42); // los símbolos de dos letras son más anchos
  const electron = (x, y) => ({ tipo: 'circulo', x, y, r: 0.07, solido: true });
  const enLado = (x, y, s, lado, cuantos) => {
    const [ux, uy] = LADOS[lado], d = ux ? separacion(s) : 0.42;
    const cx = x + ux * d, cy = y + uy * d;
    return cuantos === 1 ? [electron(cx, cy)] : [electron(cx - uy * 0.12, cy - ux * 0.12), electron(cx + uy * 0.12, cy + ux * 0.12)];
  };
  // Símbolo de Lewis con n electrones de valencia: uno por lado y después se emparejan.
  const lewis = (x, y, s, n) => {
    const orden = ['arriba', 'der', 'abajo', 'izq'];
    return [txt(x, y, s), ...orden.flatMap((lado, i) => (n > i ? enLado(x, y, s, lado, n > i + 4 ? 2 : 1) : []))];
  };
  // Pares libres en los lados indicados (para moléculas, donde los demás lados tienen enlaces).
  const pares = (x, y, s, lados) => lados.flatMap((lado) => enLado(x, y, s, lado, 2));
  // Enlace simple, doble o triple entre dos átomos: rayas paralelas recortadas para no tapar los símbolos.
  const enlace = ([x1, y1], [x2, y2], orden = 1, recorte = 0.3, punteada = false) => {
    const largo = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / largo, uy = (y2 - y1) / largo;
    const desp = { 1: [0], 2: [-0.08, 0.08], 3: [-0.13, 0, 0.13] }[orden];
    return desp.map((o) => ({ tipo: 'linea', punteada,
      desde: [x1 + ux * recorte - uy * o, y1 + uy * recorte + ux * o], hasta: [x2 - ux * recorte - uy * o, y2 - uy * recorte + ux * o] }));
  };

  const OSC = (pagina, nombre) => ({ nombre: `OpenStax, Chemistry 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/chemistry-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = { nombre: 'Khan Academy en español: Enlaces químicos', url: 'https://es.khanacademy.org/science/chemistry/chemical-bonds' };
  const PHET = (sim, nombre) => ({ nombre: `PhET, Universidad de Colorado: ${nombre}`, url: `https://phet.colorado.edu/es/simulations/${sim}` });

  // ------------------------------------------------------------------
  const ELEMENTOS = [['Na', 1, '1'], ['Mg', 2, '2'], ['C', 4, '14'], ['N', 5, '15'], ['O', 6, '16'], ['Cl', 7, '17'], ['Ne', 8, '18']];
  const lugar = (i) => (i < 4 ? [2.2 * i, 2.4] : [2.2 * (i - 4) + 1.1, 0]); // dos filas: 4 arriba, 3 abajo
  const SIMBOLOS = diagrama([-0.9, 7.5], [-1.2, 3.1], [
    ...ELEMENTOS.flatMap(([s, n], i) => lewis(...lugar(i), s, n)),
    ...ELEMENTOS.map(([, , g], i) => txt(lugar(i)[0], lugar(i)[1] - 0.85, `grupo ${g}`)),
  ], 'Símbolos de Lewis de siete elementos en dos filas, cuatro arriba (sodio, magnesio, carbono, nitrógeno) y tres abajo (oxígeno, cloro, neón). Cada uno con sus electrones de valencia como puntos alrededor y su número de grupo debajo. Sodio, grupo 1: 1 punto. Magnesio, grupo 2: 2 puntos. Carbono, grupo 14: 4 puntos, uno por lado. Nitrógeno, grupo 15: 5 puntos, con un par arriba. Oxígeno, grupo 16: 6 puntos, con dos pares. Cloro, grupo 17: 7 puntos, con tres pares y uno solo. Neón, grupo 18: 8 puntos, cuatro pares, el octeto completo.');

  L('Regla del octeto y estructuras de Lewis', {
    objetivo: 'Entender por qué los átomos se unen, aplicar la regla del octeto y dibujar estructuras de Lewis sencillas.',
    explicacion: `
      <p>En la unidad anterior viste que los gases nobles, como el neón y el argón, casi no reaccionan con nada. Están "satisfechos": su último nivel de energía está lleno, con 8 electrones. Los demás átomos no lo están, y buscan quedar como ellos.</p>
      <h3>¿Por qué se unen los átomos?</h3>
      <p>Casi ningún átomo anda solo en la naturaleza. El oxígeno que respiras viene en parejas, O₂, y el sodio siempre aparece unido a otros elementos, como en la sal. A la fuerza que mantiene unidos a dos o más átomos se le llama <strong>enlace químico</strong>.</p>
      <p>Los átomos se unen porque así quedan más estables, con menos energía, igual que una pelota que rueda hasta el fondo de un hoyo y ahí se queda quieta. Y la forma más estable de acomodar los electrones es la de los gases nobles.</p>
      <h3>La regla del ocho</h3>
      <p>A la tendencia de los átomos a quedar con 8 electrones en su último nivel se le llama <strong>regla del octeto</strong> ("octeto" quiere decir grupo de ocho). Para lograrlo hay tres caminos:</p>
      <ul>
        <li>Perder electrones. El sodio tiene 1 electrón de valencia. Si lo suelta, su nivel anterior, que ya tenía 8, queda como el último y el sodio queda como el neón.</li>
        <li>Ganar electrones. El cloro tiene 7. Si gana 1, completa 8 y queda como el argón.</li>
        <li>Compartir electrones. Dos átomos ponen electrones en común, y los dos los cuentan como suyos.</li>
      </ul>
      <p>El hidrógeno es la excepción: solo tiene el nivel 1, donde caben 2 electrones. Se completa con 2, como el helio.</p>
      <h3>Dibujar los electrones de valencia</h3>
      <p>En 1916, el químico Gilbert Lewis propuso una forma muy sencilla de dibujar esto. Se escribe el símbolo del elemento y, alrededor, un punto por cada electrón de valencia. Solo se dibujan los de valencia, porque son los únicos que participan en los enlaces.</p>
      <p>Para saber cuántos puntos van, usa el grupo, como viste en la unidad anterior: en los grupos 1 y 2, el número de grupo; en los grupos 13 a 18, el grupo menos 10. Se pone un punto en cada uno de los cuatro lados y, si sobran, se forman parejas:</p>
      ${SIMBOLOS}
      <p>Fíjate en lo que dice el dibujo. Al neón no le falta nada. Al cloro le falta 1 punto para 8, al oxígeno 2 y al nitrógeno 3. Al sodio le conviene más soltar su único punto que conseguir 7.</p>
      <p>Cuando dibujas una molécula completa, cada par de electrones compartido entre dos átomos se escribe como una raya. Los pares que no se comparten se quedan como puntos. A este dibujo de cómo se reparten los electrones de valencia en una molécula se le llama <strong>estructura de Lewis</strong>.</p>
      <p class="nota"><strong>Trampa común:</strong> dibujar todos los electrones del átomo. El oxígeno tiene 8, pero en su símbolo de Lewis solo van sus 6 de valencia.</p>`,
    ejemplo: `
      <p>Dibuja la estructura de Lewis del agua, H₂O.</p>
      <ol class="pasos-ej">
        <li>Primero cuenta los electrones de valencia de todos los átomos: cada hidrógeno tiene 1 y el oxígeno 6. En total, 1 + 1 + 6 = 8.</li>
        <li>Decide quién va en medio. El hidrógeno solo puede formar un enlace, porque se completa con 2. Entonces el oxígeno va al centro, con un hidrógeno a cada lado.</li>
        <li>Une cada hidrógeno con el oxígeno con una raya, un par compartido: H–O–H. Ya usaste 4 electrones.</li>
        <li>Los 4 que sobran van como dos pares de puntos sobre el oxígeno.</li>
        <li>Comprueba cada átomo. El oxígeno tiene 2 rayas (4 electrones) y 2 pares (4 más): 8. Cada hidrógeno tiene una raya: 2. Todos están completos.</li>
      </ol>
      <p>Resultado: <span class="resultado">H–O–H, con dos pares de puntos en el oxígeno</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner un hidrógeno en medio. Como solo admite 2 electrones, el hidrógeno siempre va en una orilla.</p>`,
    vidaReal: `
      <p>Que los átomos busquen quedar "completos" explica cosas que ves a diario:</p>
      <ul>
        <li>Los globos se llenan de helio porque no arde ni reacciona con nada.</li>
        <li>Algunos focos llevan argón por dentro para que el filamento no se queme.</li>
        <li>El sodio nunca se encuentra puro en la naturaleza: siempre está unido a otros elementos, como en la sal.</li>
        <li>Los químicos dibujan con puntos y rayas para planear medicinas y plásticos nuevos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>El nitrógeno está en el grupo 15. ¿Cuántos puntos lleva su símbolo de Lewis?</p>', respuesta: 15 - 10,
        pista: '<p>En los grupos 13 a 18, los electrones de valencia son el grupo menos 10.</p>',
        solucion: '<p>15 − 10 = <strong>5 puntos</strong>, uno por cada electrón de valencia.</p>' },
      { tipo: 'numero', enunciado: '<p>El oxígeno tiene 6 electrones de valencia. ¿Cuántos le faltan para cumplir la regla del octeto?</p>', respuesta: 8 - 6,
        pista: '<p>¿Cuántos tiene que tener al final?</p>',
        solucion: '<p>8 − 6 = <strong>2 electrones</strong>. Por eso el oxígeno suele formar dos enlaces, como en el agua.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos átomos ya cumple la regla del octeto por sí solo?</p>',
        opciones: ['El sodio', 'El cloro', 'El neón', 'El oxígeno'], correcta: 2,
        pista: '<p>Busca un gas noble.</p>',
        solucion: '<p>El <strong>neón</strong>, un gas noble con 8 electrones de valencia. Por eso casi no reacciona.</p>' },
      { tipo: 'numero', enunciado: '<p>El cloro está en el grupo 17. ¿Cuántos electrones le faltan para completar el octeto?</p>', respuesta: 8 - (17 - 10),
        pista: '<p>Primero calcula sus electrones de valencia.</p>',
        solucion: '<p>Tiene 17 − 10 = 7 electrones de valencia, así que le falta <strong>1</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Con cuántos electrones se completa el hidrógeno?</p>',
        opciones: ['Con 2, como el helio', 'Con 8, como el neón', 'Con 1, el que ya tiene'], correcta: 0,
        pista: '<p>El hidrógeno solo tiene el nivel 1. ¿Cuántos electrones caben ahí?</p>',
        solucion: '<p><strong>Con 2</strong>, porque en el nivel 1 solo caben 2. Queda como el helio.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos electrones de valencia hay en total en una molécula de dióxido de carbono, CO₂? El carbono está en el grupo 14 y el oxígeno en el 16.</p>',
        respuesta: 4 + 6 + 6,
        pista: '<p>Calcula los del carbono y los de cada uno de los dos oxígenos, y súmalos.</p>',
        solucion: '<p>El carbono aporta 4 y cada oxígeno 6: 4 + 6 + 6 = <strong>16 electrones</strong>.</p>' },
    ],
    fuentes: [
      OSC('7-3-lewis-symbols-and-structures', 'Lewis Symbols and Structures'),
      WIKI('Regla_del_octeto', 'Regla del octeto'),
      WIKI('Estructura_de_Lewis', 'Estructura de Lewis'),
      PHET('build-a-molecule', 'Construye una molécula'),
    ],
  });

  // ------------------------------------------------------------------
  const TRANSFERENCIA = diagrama([-0.8, 9], [-0.8, 2], [
    ...lewis(0, 1, 'Na', 1), ...lewis(2.4, 1, 'Cl', 7),
    ...flecha([0.65, 1.3], [1.8, 1.3], 0, 0.6),
    ...flecha([3.4, 1], [4.6, 1]),
    txt(5.4, 1, 'Na⁺'),
    txt(6.45, 1, '['), ...lewis(7.2, 1, 'Cl', 8), txt(7.95, 1, ']'), txt(8.3, 1.4, '−'),
    txt(1.2, -0.2, 'el sodio cede 1 electrón'), txt(6.6, -0.2, 'iones Na⁺ y Cl⁻'),
  ], 'A la izquierda, el sodio con 1 punto y el cloro con 7 puntos. Una flecha pequeña lleva el punto del sodio hacia el cloro: el sodio cede 1 electrón. Una flecha grande apunta a la derecha, al resultado: el ion sodio, Na⁺, sin puntos, y el ion cloruro, entre corchetes, con 8 puntos y carga negativa.');

  L('Enlace iónico', {
    objetivo: 'Explicar cómo se forma un enlace iónico, escribir la fórmula de un compuesto iónico a partir de las cargas de sus iones y reconocer sus propiedades.',
    explicacion: `
      <p>El sodio es un metal tan blando que se corta con un cuchillo, y explota si lo echas al agua. El cloro es un gas verdoso y venenoso. Juntos forman la sal de mesa, que comes todos los días. ¿Cómo pueden dos cosas tan peligrosas formar algo tan inofensivo?</p>
      <h3>Uno da, el otro recibe</h3>
      <p>El sodio tiene 1 electrón de valencia y el cloro tiene 7. Al sodio le conviene soltar ese electrón, y al cloro le conviene recibirlo. Cuando se encuentran, el electrón pasa del sodio al cloro, y los dos quedan con 8 en su último nivel:</p>
      ${TRANSFERENCIA}
      <p>Pero ahora ya no son átomos neutros. El sodio perdió una carga negativa y quedó como Na⁺; el cloro ganó una y quedó como Cl⁻. Como viste en física, las cargas opuestas se atraen, y con mucha fuerza. A esa atracción entre iones de carga opuesta se le llama <strong>enlace iónico</strong>.</p>
      <p>Suele formarse entre un metal, que suelta electrones con facilidad, y un no metal, que los atrapa. Una forma de reconocerlo es la electronegatividad: si la diferencia entre los dos átomos es grande, más o menos mayor que 1.7, uno arranca los electrones del otro. Entre el sodio (0.93) y el cloro (3.16) la diferencia es 2.23.</p>
      <h3>Un enorme tablero de iones</h3>
      <p>En un grano de sal no hay parejas sueltas de Na⁺ y Cl⁻. Cada ion sodio está rodeado de iones cloruro por todos lados, y cada cloruro de iones sodio, en un acomodo ordenado que se repite en las tres direcciones, como los cuadros de un tablero de ajedrez apilados. A ese acomodo se le llama <strong>red cristalina</strong>. Por eso los granos de sal, vistos con lupa, son cubitos.</p>
      <p>A una sustancia formada por iones unidos así se le llama <strong>compuesto iónico</strong>. Su fórmula no cuenta átomos de una molécula: dice en qué proporción están los iones. NaCl quiere decir "un sodio por cada cloro".</p>
      <h3>Las cargas tienen que sumar cero</h3>
      <p>Un compuesto iónico es neutro: las cargas positivas y las negativas se cancelan. Con eso puedes escribir su fórmula. El magnesio forma Mg²⁺ y el cloro Cl⁻. Para cancelar las dos cargas positivas del magnesio hacen falta dos cloruros: MgCl₂. El calcio forma Ca²⁺ y el oxígeno O²⁻; las cargas ya se cancelan una a una: CaO.</p>
      <h3>Cómo se portan</h3>
      <ul>
        <li>Se funden a temperaturas muy altas, porque hay que vencer la atracción de muchísimos iones. La sal se funde a 801 °C.</li>
        <li>Son duros pero quebradizos. Un golpe desliza una capa de iones, quedan cargas iguales frente a frente, se repelen y el cristal se parte.</li>
        <li>En sólido no conducen la electricidad, pero disueltos en agua o fundidos sí, porque entonces los iones se pueden mover.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> pensar que el NaCl es una molécula de dos átomos. Es una red con millones de iones, en proporción de uno a uno.</p>`,
    ejemplo: `
      <p>Escribe la fórmula del óxido de aluminio, el compuesto que forman el aluminio y el oxígeno.</p>
      <ol class="pasos-ej">
        <li>Primero encuentra la carga de cada ion. El aluminio está en el grupo 13: tiene 3 electrones de valencia y los pierde, así que forma Al³⁺.</li>
        <li>El oxígeno está en el grupo 16: tiene 6 y le faltan 2, así que forma O²⁻.</li>
        <li>Busca el número más pequeño que puedan alcanzar las dos cargas: 3 y 2 llegan juntas al 6.</li>
        <li>Para llegar a +6 hacen falta 2 iones aluminio (2 × 3), y para llegar a −6, 3 iones óxido (3 × 2).</li>
        <li>La fórmula queda Al₂O₃. Comprueba: 2 × (+3) + 3 × (−2) = 6 − 6 = 0.</li>
      </ol>
      <p>Resultado: <span class="resultado">Al₂O₃</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir AlO, un ion de cada uno. Las cargas +3 y −2 no se cancelan; siempre comprueba que sumen cero.</p>`,
    vidaReal: `
      <p>Las sustancias formadas por partículas con carga están en tu cocina y en tu cuerpo:</p>
      <ul>
        <li>La sal de mesa forma cubitos diminutos que puedes ver con una lupa.</li>
        <li>Es peligroso usar aparatos eléctricos con las manos mojadas, porque el sudor y el agua con sales conducen la electricidad.</li>
        <li>El suero oral repone las sales que pierdes cuando te enfermas del estómago.</li>
        <li>El yeso y la cal de las construcciones también son de este tipo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>El magnesio forma el ion Mg²⁺ y el cloro forma Cl⁻. ¿Cuántos iones cloruro hacen falta por cada ion magnesio para que las cargas sumen cero?</p>', respuesta: 2,
        pista: '<p>¿Cuántas cargas −1 cancelan una carga +2?</p>',
        solucion: '<p>Hacen falta <strong>2</strong>: +2 + 2 × (−1) = 0. La fórmula es MgCl₂.</p>' },
      { tipo: 'numero', enunciado: '<p>El potasio forma K⁺ y el oxígeno forma O²⁻. ¿Cuántos iones potasio hay por cada ion óxido en el óxido de potasio?</p>', respuesta: 2,
        pista: '<p>¿Cuántas cargas +1 cancelan una carga −2?</p>',
        solucion: '<p>Hacen falta <strong>2</strong>: 2 × (+1) − 2 = 0. La fórmula es K₂O.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué pareja de elementos forma un enlace iónico?</p>',
        opciones: ['Carbono y oxígeno', 'Hidrógeno e hidrógeno', 'Sodio y cloro', 'Nitrógeno y oxígeno'], correcta: 2,
        pista: '<p>Busca un metal con un no metal.</p>',
        solucion: '<p><strong>Sodio y cloro</strong>: un metal que suelta su electrón y un no metal que lo atrapa. Las otras parejas son de no metales, que comparten electrones.</p>' },
      { tipo: 'numero', enunciado: '<p>La electronegatividad del sodio es 0.93 y la del cloro es 3.16. ¿Cuál es la diferencia entre las dos?</p>',
        respuesta: 3.16 - 0.93, tolerancia: 0.005,
        pista: '<p>Resta la menor a la mayor.</p>',
        solucion: '<p>3.16 − 0.93 = <strong>2.23</strong>. Es mayor que 1.7, así que el enlace es iónico.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un cristal de sal no conduce la electricidad, pero el agua con sal sí. ¿Por qué?</p>',
        opciones: ['Porque el agua pura conduce muy bien la electricidad', 'Porque al disolverse, los iones quedan libres para moverse', 'Porque al disolverse, la sal se convierte en metal'], correcta: 1,
        pista: '<p>Para conducir, algo con carga se tiene que poder mover.</p>',
        solucion: '<p>Porque <strong>los iones quedan libres para moverse</strong>. En el cristal están fijos en la red; disueltos, pueden llevar la corriente.</p>' },
      { tipo: 'numero', enunciado: '<p>En el óxido de calcio, CaO, el calcio forma Ca²⁺ y el oxígeno forma O²⁻. ¿Cuántos electrones pasan del calcio al oxígeno?</p>', respuesta: 2,
        pista: '<p>Fíjate en la carga del ion calcio.</p>',
        solucion: '<p>Pasan <strong>2 electrones</strong>: el calcio queda con +2 y el oxígeno con −2.</p>' },
    ],
    fuentes: [
      OSC('7-1-ionic-bonding', 'Ionic Bonding'),
      OSC('10-6-lattice-structures-in-crystalline-solids', 'Lattice Structures in Crystalline Solids'),
      WIKI('Enlace_iónico', 'Enlace iónico'),
      KHAN,
    ],
  });

  // ------------------------------------------------------------------
  const MOLECULAS = diagrama([-0.8, 7], [-0.7, 3.8], [
    txt(0, 3, 'H'), txt(1.2, 3, 'H'), ...enlace([0, 3], [1.2, 3], 1, 0.25),
    txt(4, 3, 'O'), txt(5.4, 3, 'O'), ...enlace([4, 3], [5.4, 3], 2), ...pares(4, 3, 'O', ['arriba', 'abajo']), ...pares(5.4, 3, 'O', ['arriba', 'abajo']),
    txt(0, 0.6, 'N'), txt(1.4, 0.6, 'N'), ...enlace([0, 0.6], [1.4, 0.6], 3), ...pares(0, 0.6, 'N', ['izq']), ...pares(1.4, 0.6, 'N', ['der']),
    txt(3.6, 0.6, 'H'), txt(4.8, 0.6, 'O'), txt(6, 0.6, 'H'), ...enlace([3.6, 0.6], [4.8, 0.6], 1, 0.25), ...enlace([4.8, 0.6], [6, 0.6], 1, 0.25),
    ...pares(4.8, 0.6, 'O', ['arriba', 'abajo']),
    txt(0.6, 2.1, 'H₂: enlace simple'), txt(4.7, 2.1, 'O₂: enlace doble'), txt(0.7, -0.3, 'N₂: enlace triple'), txt(4.8, -0.3, 'H₂O: dos enlaces simples'),
  ], 'Estructuras de Lewis de cuatro moléculas. H₂: dos hidrógenos unidos por una raya, un enlace simple. O₂: dos oxígenos unidos por dos rayas, un enlace doble, y cada oxígeno con dos pares de puntos, arriba y abajo. N₂: dos nitrógenos unidos por tres rayas, un enlace triple, y cada nitrógeno con un par de puntos en su lado de afuera. H₂O: un oxígeno en medio unido por una raya a cada hidrógeno, con dos pares de puntos, arriba y abajo.');

  L('Enlace covalente', {
    objetivo: 'Explicar cómo se forma un enlace covalente, distinguir enlaces simples, dobles y triples, y decidir si un enlace es polar.',
    explicacion: `
      <p>Dos amigos quieren una pizza, pero a ninguno le alcanza el dinero para comprar una entera. Juntan lo que tienen, la compran y la comparten. Ninguno pierde: los dos comen. Hay átomos que hacen justo eso con sus electrones.</p>
      <h3>Compartir en lugar de regalar</h3>
      <p>Cuando se juntan dos no metales, los dos quieren ganar electrones y ninguno quiere soltarlos. La salida es compartir: cada uno pone un electrón y forman un par que pertenece a los dos. A ese par compartido se le llama <strong>enlace covalente</strong>.</p>
      <p>El ejemplo más sencillo es el hidrógeno. Cada átomo tiene 1 electrón y quiere 2. Si comparten sus electrones, los dos cuentan 2 y quedan completos, como el helio. En la estructura de Lewis, el par compartido se dibuja como una raya: H–H.</p>
      <p>Al grupo de átomos unidos por enlaces covalentes se le llama <strong>molécula</strong>. El H₂, el agua (H₂O) y el dióxido de carbono (CO₂) son moléculas. A diferencia de la red de la sal, una molécula es una unidad con un número fijo de átomos.</p>
      ${MOLECULAS}
      <h3>Compartir uno, dos o tres pares</h3>
      <p>A veces un solo par no basta. Al oxígeno le faltan 2 electrones, así que dos oxígenos comparten dos pares. Al nitrógeno le faltan 3, así que comparte tres:</p>
      <ul>
        <li>Un enlace simple comparte un par de electrones, como en H₂ o H₂O.</li>
        <li>Un enlace doble comparte dos pares, como en O₂.</li>
        <li>Un enlace triple comparte tres pares, como en N₂.</li>
      </ul>
      <p>Entre más pares se comparten, más fuerte es el enlace. Por eso el nitrógeno del aire, con su enlace triple, casi no reacciona. Los pares de puntos que no se comparten se llaman pares libres.</p>
      <h3>¿Se comparte por igual?</h3>
      <p>Piensa en dos personas jalando una cuerda. Si son igual de fuertes, la cuerda queda en medio. Si una es más fuerte, la cuerda se le acerca. Con los electrones compartidos pasa lo mismo, y la fuerza de cada átomo es su electronegatividad.</p>
      <p>En el H₂ o el Cl₂, los dos átomos son iguales y jalan igual: el par queda en medio. En el agua, el oxígeno (3.44) jala más que el hidrógeno (2.20), así que los electrones pasan más tiempo cerca del oxígeno. El oxígeno queda un poco negativo y los hidrógenos un poco positivos. A un enlace así, con los electrones repartidos de forma desigual, se le llama <strong>enlace polar</strong>.</p>
      <p>Como guía aproximada, se usa la diferencia de electronegatividad: menos de 0.4, enlace no polar; entre 0.4 y 1.7, polar; más de 1.7, ya es iónico, porque uno arranca el electrón.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que un enlace polar es iónico. En el polar los electrones se siguen compartiendo, aunque no por igual; en el iónico, uno se los queda.</p>`,
    ejemplo: `
      <p>Dibuja la estructura de Lewis del nitrógeno del aire, N₂.</p>
      <ol class="pasos-ej">
        <li>Primero cuenta: cada nitrógeno está en el grupo 15 y tiene 5 electrones de valencia. Entre los dos suman 10.</li>
        <li>A cada nitrógeno le faltan 3 para el octeto. Si comparten un solo par, cada uno llega a 6; con dos pares, a 7. Hacen falta tres pares compartidos: un enlace triple, N≡N.</li>
        <li>Los tres pares usan 6 electrones. Quedan 10 − 6 = 4, que van como un par libre en cada nitrógeno, del lado de afuera.</li>
        <li>Comprueba un nitrógeno: 3 rayas (6 electrones) más 1 par libre (2) son 8. Está completo, y el otro igual.</li>
      </ol>
      <p>Resultado: <span class="resultado">N≡N, con un par libre en cada nitrógeno</span>. Ese enlace triple es tan fuerte que el nitrógeno, casi el 80% del aire, casi no reacciona.</p>
      <p class="nota"><strong>Error común:</strong> unir los dos nitrógenos con una sola raya y llenar el resto con puntos. Así a cada uno le faltarían electrones.</p>`,
    vidaReal: `
      <p>Casi todo lo que te rodea está hecho de átomos que comparten electrones:</p>
      <ul>
        <li>El agua que tomas, el oxígeno que respiras y el gas de la estufa están hechos así.</li>
        <li>El azúcar, la grasa y las proteínas de tu comida también.</li>
        <li>Los plásticos de las botellas y la ropa sintética se fabrican uniendo átomos de esta forma.</li>
        <li>Las medicinas del botiquín y casi todas las sustancias de los seres vivos, incluido tu cuerpo, son de este tipo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>El carbono tiene 4 electrones de valencia. En el metano, CH₄, cada hidrógeno comparte un par con el carbono. ¿Cuántos enlaces forma el carbono?</p>', respuesta: 8 - 4,
        pista: '<p>¿Cuántos electrones le faltan al carbono para el octeto? Cada enlace le da uno más.</p>',
        solucion: '<p>Le faltan 8 − 4 = 4, así que forma <strong>4 enlaces</strong>, uno con cada hidrógeno.</p>' },
      { tipo: 'numero', enunciado: '<p>Los dos oxígenos del O₂ están unidos por un enlace doble. ¿Cuántos electrones comparten en total?</p>', respuesta: 2 * 2,
        pista: '<p>Un enlace doble son dos pares. ¿Cuántos electrones hay en un par?</p>',
        solucion: '<p>Dos pares de 2 electrones: <strong>4 electrones</strong> compartidos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué pareja de elementos forma un enlace covalente?</p>',
        opciones: ['Sodio y cloro', 'Potasio y flúor', 'Magnesio y oxígeno', 'Oxígeno e hidrógeno'], correcta: 3,
        pista: '<p>Busca dos no metales.</p>',
        solucion: '<p><strong>Oxígeno e hidrógeno</strong>, dos no metales que comparten electrones, como en el agua. Las otras parejas tienen un metal y forman enlaces iónicos.</p>' },
      { tipo: 'numero', enunciado: '<p>La electronegatividad del oxígeno es 3.44 y la del hidrógeno es 2.20. ¿Cuál es la diferencia entre las dos?</p>',
        respuesta: 3.44 - 2.20, tolerancia: 0.005,
        pista: '<p>Resta la menor a la mayor.</p>',
        solucion: '<p>3.44 − 2.20 = <strong>1.24</strong>. Está entre 0.4 y 1.7: el enlace O–H es covalente polar.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿El enlace de la molécula H₂ es polar?</p>',
        opciones: ['Sí, porque el hidrógeno es muy electronegativo', 'No, porque los dos átomos jalan los electrones por igual', 'Sí, porque es un enlace iónico'], correcta: 1,
        pista: '<p>¿Cuál es la diferencia de electronegatividad entre dos átomos iguales?</p>',
        solucion: '<p><strong>No es polar.</strong> Los dos átomos son iguales, la diferencia es 0 y el par queda justo en medio.</p>' },
      { tipo: 'numero', enunciado: '<p>En la estructura de Lewis del agua, ¿cuántos pares libres tiene el oxígeno?</p>', respuesta: 2,
        pista: '<p>El oxígeno tiene 6 electrones de valencia y usa 2 en los enlaces con los hidrógenos.</p>',
        solucion: '<p>Le quedan 6 − 2 = 4 electrones propios sin compartir, que forman <strong>2 pares libres</strong>.</p>' },
    ],
    fuentes: [
      OSC('7-2-covalent-bonding', 'Covalent Bonding'),
      WIKI('Enlace_covalente', 'Enlace covalente'),
      WIKI('Molécula', 'Molécula'),
      PHET('molecule-polarity', 'Polaridad de la molécula'),
    ],
  });

  // ------------------------------------------------------------------
  const IONES = [0, 1.4, 2.8, 4.2].flatMap((x) => [0, 1.4, 2.8].map((y) => [x, y]));
  const LIBRES = [[0.7, 0.7], [2.1, 0.7], [3.5, 0.7], [0.7, 2.1], [2.1, 2.1], [3.5, 2.1], [0.7, 1.4], [2.1, 1.4], [3.5, 1.4], [1.4, 2.1]];
  const MAR = diagrama([-0.8, 5], [-1.9, 3.4], [
    ...IONES.flatMap(([x, y]) => [{ tipo: 'circulo', x, y, r: 0.42, relleno: true }, txt(x, y, '+')]),
    ...LIBRES.map(([x, y]) => electron(x, y)),
    txt(2.1, -0.9, 'círculos con +: iones del metal'), txt(2.1, -1.5, 'puntos: electrones que se mueven libres'),
  ], 'Un trozo de metal visto muy de cerca: doce círculos ordenados en tres filas de cuatro, cada uno con un signo más, que son los iones positivos del metal. Entre ellos hay diez puntos sueltos, los electrones, que no pertenecen a ningún ion y se mueven libres por todo el metal.');

  L('Enlace metálico', {
    objetivo: 'Explicar el enlace metálico con el modelo del mar de electrones y usarlo para entender por qué los metales conducen, se doblan y brillan.',
    explicacion: `
      <p>Un alambre de cobre se dobla sin romperse y lleva la electricidad hasta los focos de tu casa. Un cristal de sal, en cambio, se parte de un golpe y no conduce. Los dos son sólidos, pero por dentro están unidos de formas muy distintas.</p>
      <h3>Electrones que no son de nadie</h3>
      <p>Los metales tienen pocos electrones de valencia, y los sujetan con poca fuerza: en la unidad anterior viste que su energía de ionización es baja. En un trozo de metal, cada átomo suelta sus electrones de valencia, y esos electrones ya no pertenecen a ningún átomo en particular. Se mueven libres por todo el metal.</p>
      <p>Los átomos, al perder esos electrones, quedan como iones positivos, acomodados en orden. A esta imagen, con iones positivos fijos rodeados de electrones que se mueven por todas partes, se le llama <strong>mar de electrones</strong>. Los iones son como islas y los electrones, como el agua que las rodea y que va de una a otra.</p>
      ${MAR}
      <p>Los iones positivos y el mar de electrones negativos se atraen, y eso mantiene unido al metal. A esta atracción se le llama <strong>enlace metálico</strong>. No es un intercambio entre dos átomos, como en el enlace iónico, ni un par compartido entre dos, como en el covalente: los electrones se comparten entre todos.</p>
      <h3>Lo que explica el mar</h3>
      <p>Con esta imagen se entienden las propiedades de los metales que viste en la unidad anterior:</p>
      <ul>
        <li>Conducen la electricidad porque sus electrones ya se mueven libres. Al conectar una pila, todos avanzan en la misma dirección, y eso es la corriente.</li>
        <li>Conducen el calor porque esos mismos electrones llevan la energía rápido de un lado a otro.</li>
        <li>Se doblan y se estiran sin romperse porque, si una capa de iones se desliza, el mar de electrones se reacomoda y los sigue uniendo. En la sal, ese mismo deslizamiento pone cargas iguales frente a frente y el cristal se parte.</li>
        <li>Brillan porque los electrones libres rebotan la luz que les llega.</li>
      </ul>
      <h3>Mezclas de metales</h3>
      <p>Los metales puros a veces son demasiado blandos. El oro puro se raya y se dobla con facilidad. Por eso se funden juntos con otros elementos para formar una <strong>aleación</strong>: una mezcla homogénea de un metal con otros elementos, casi siempre metales. Al mezclarse, los átomos de distinto tamaño estorban el deslizamiento de las capas, y el material queda más duro.</p>
      <p>El bronce es cobre con estaño. El acero es hierro con un poco de carbono, de menos del 2%. Y el oro de las joyas se mide en quilates: 24 quilates es oro puro, y el oro de 18 quilates tiene 18 partes de oro de cada 24.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que "mar de electrones" quiere decir que el metal es líquido. El metal sigue siendo sólido: los iones se quedan en su lugar y solo los electrones se mueven.</p>`,
    ejemplo: `
      <p>Un anillo de oro de 14 quilates tiene una masa de 6 g. ¿Cuántos gramos de oro puro tiene?</p>
      <ol class="pasos-ej">
        <li>Recuerda qué significan los quilates: de cada 24 partes del anillo, 14 son de oro. La fracción de oro es 14 ÷ 24.</li>
        <li>Calcula esa fracción: 14 ÷ 24 = 0.583. Es decir, el 58.3% del anillo es oro.</li>
        <li>Multiplica por la masa del anillo, porque quieres esa parte de 6 g: 6 × 0.583 = 3.5 g.</li>
        <li>Lo demás, 6 − 3.5 = 2.5 g, son otros metales, como plata y cobre, que endurecen el anillo.</li>
        <li>Comprueba al revés: 3.5 g de oro de un total de 6 g es 3.5 ÷ 6 = 0.583, la misma fracción que 14 ÷ 24.</li>
      </ol>
      <p>Resultado: <span class="resultado">3.5 g de oro puro</span>.</p>
      <p class="nota"><strong>Error común:</strong> dividir los quilates entre 100, como si fueran un porcentaje. Los quilates se cuentan sobre 24, no sobre 100.</p>`,
    vidaReal: `
      <p>La forma en que se unen los metales por dentro decide para qué sirve cada uno:</p>
      <ul>
        <li>Los cables de tu casa son de cobre porque deja pasar la corriente con mucha facilidad.</li>
        <li>Las ollas calientan rápido la comida porque el metal lleva bien el calor.</li>
        <li>Los edificios y los puentes se construyen con acero, más duro que el hierro solo.</li>
        <li>Al comprar una joya, los quilates te dicen cuánto oro tiene de verdad.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Por qué los metales conducen la electricidad?</p>',
        opciones: ['Porque sus iones positivos viajan de un extremo a otro', 'Porque sus electrones se mueven libres por todo el metal', 'Porque tienen muchos electrones de valencia bien sujetos'], correcta: 1,
        pista: '<p>Piensa en el mar de electrones.</p>',
        solucion: '<p>Porque <strong>sus electrones se mueven libres</strong>. Al conectar una pila, avanzan todos en la misma dirección. Los iones se quedan en su lugar.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué un metal se puede aplastar sin romperse, y un cristal de sal no?</p>',
        opciones: ['Porque el metal no tiene iones', 'Porque la sal es más blanda que el metal', 'Porque en el metal, si una capa de iones se desliza, el mar de electrones la sigue uniendo'], correcta: 2,
        pista: '<p>¿Qué pasa en cada uno cuando una capa se desliza?</p>',
        solucion: '<p><strong>El mar de electrones se reacomoda</strong> y sigue uniendo a los iones. En la sal, el deslizamiento pone cargas iguales frente a frente, se repelen y el cristal se parte.</p>' },
      { tipo: 'numero', enunciado: '<p>Una pieza de acero de 500 g tiene 2% de carbono. ¿Cuántos gramos de carbono tiene?</p>', respuesta: 500 * 2 / 100,
        pista: '<p>Calcula el 2% de 500.</p>',
        solucion: '<p>500 × 0.02 = <strong>10 g</strong> de carbono. Los otros 490 g son hierro.</p>' },
      { tipo: 'numero', enunciado: '<p>El oro de 18 quilates tiene 18 partes de oro de cada 24. ¿Qué porcentaje de oro tiene?</p>', respuesta: 18 / 24 * 100,
        pista: '<p>Divide 18 entre 24 y multiplica por 100.</p>',
        solucion: '<p>18 ÷ 24 = 0.75, y 0.75 × 100 = <strong>75%</strong>. Tres cuartas partes son oro.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos materiales es una aleación?</p>',
        opciones: ['El cobre puro', 'La sal de mesa', 'El bronce', 'El agua'], correcta: 2,
        pista: '<p>Una aleación es una mezcla de un metal con otros elementos.</p>',
        solucion: '<p>El <strong>bronce</strong>, una mezcla de cobre y estaño. El cobre puro es un solo elemento, y la sal y el agua son compuestos.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el modelo que describe a un metal como iones positivos rodeados de electrones que se mueven libres? Escribe el nombre.</p>',
        respuestas: ['mar de electrones', 'el mar de electrones', 'modelo del mar de electrones', 'un mar de electrones'],
        pista: '<p>Los iones son como islas, y los electrones, como el agua que las rodea.</p>',
        solucion: '<p>Es el <strong>mar de electrones</strong>.</p>' },
    ],
    fuentes: [
      OSC('10-6-lattice-structures-in-crystalline-solids', 'Lattice Structures in Crystalline Solids'),
      WIKI('Enlace_metálico', 'Enlace metálico'),
      KHAN,
    ],
  });

  // ------------------------------------------------------------------
  const A = { O: [1, 2.2], H1: [0.3, 1.6], H2: [1.7, 1.6] };
  const B = { O: [2.5, 0.5], H1: [3.2, 1.0], H2: [3.0, -0.2] };
  const PUENTES = diagrama([-0.6, 8], [-1.9, 2.8], [
    ...[A, B].flatMap((m) => [txt(...m.O, 'O'), txt(...m.H1, 'H'), txt(...m.H2, 'H'), ...enlace(m.O, m.H1, 1, 0.25), ...enlace(m.O, m.H2, 1, 0.25)]),
    ...enlace(A.H2, B.O, 1, 0.25, true),
    txt(5.6, 2.1, 'molécula de agua 1'), txt(5.6, 0.2, 'molécula de agua 2'),
    txt(3.7, -1.0, 'línea continua: enlace covalente (dentro)'), txt(3.7, -1.6, 'línea punteada: puente de hidrógeno (entre moléculas)'),
  ], 'Dos moléculas de agua, cada una con un oxígeno unido a dos hidrógenos por líneas continuas, que son enlaces covalentes. Un hidrógeno de la molécula de arriba está unido por una línea punteada al oxígeno de la molécula de abajo: es un puente de hidrógeno, una atracción entre moléculas distintas.');

  L('Fuerzas intermoleculares', {
    objetivo: 'Distinguir los enlaces de las fuerzas entre moléculas, reconocer los puentes de hidrógeno y las fuerzas de dispersión, y usarlos para explicar puntos de ebullición.',
    explicacion: `
      <p>El agua hierve a 100 °C. El metano, el gas de algunas estufas, tiene moléculas de un tamaño parecido, pero hierve a −162 °C. Para separar las moléculas de agua hace falta mucha más energía. Algo las mantiene juntas con fuerza.</p>
      <h3>Dentro y entre</h3>
      <p>Hasta ahora viste los enlaces, que unen los átomos dentro de una molécula. Pero las moléculas también se atraen unas a otras. A las atracciones entre moléculas distintas se les llama <strong>fuerzas intermoleculares</strong> ("inter" quiere decir entre).</p>
      <p>Son mucho más débiles que los enlaces. Cuando el agua hierve, las moléculas se separan unas de otras, pero cada una sigue siendo H₂O: no se rompe ningún enlace entre el oxígeno y sus hidrógenos. Por eso el vapor sigue siendo agua, como viste en la lección de cambios físicos.</p>
      <p>Fíjate en la consecuencia: entre más fuertes son las fuerzas intermoleculares, más energía hace falta para separar las moléculas, y más alto es el punto de ebullición.</p>
      <h3>El agua y sus puentes</h3>
      <p>En la lección anterior viste que en el agua el oxígeno queda un poco negativo y los hidrógenos un poco positivos. Las moléculas polares se atraen: el lado positivo de una jala al lado negativo de la vecina.</p>
      <p>Cuando un hidrógeno está unido a un átomo muy electronegativo, como el oxígeno, el nitrógeno o el flúor, esa atracción es especialmente fuerte. El hidrógeno de una molécula se pega al oxígeno de la de al lado. A esta atracción se le llama <strong>puente de hidrógeno</strong>:</p>
      ${PUENTES}
      <p>El metano no tiene puentes de hidrógeno, porque su hidrógeno está unido a un carbono, que casi no es más electronegativo que él. Por eso sus moléculas se separan con muy poca energía, y a temperatura ambiente es un gas.</p>
      <h3>Una atracción que tienen todas</h3>
      <p>Incluso las moléculas no polares se atraen un poco. Sus electrones se mueven todo el tiempo, y por un instante pueden quedar más de un lado que del otro. Ese desequilibrio pasajero atrae a la molécula vecina. A estas atracciones débiles se les llama <strong>fuerzas de dispersión</strong>, y las tienen todas las moléculas.</p>
      <p>Crecen con el tamaño: una molécula grande tiene más electrones que se pueden desacomodar. Los halógenos lo muestran bien. El flúor (F₂) hierve a −188 °C y el cloro (Cl₂) a −34 °C, así que son gases. El bromo (Br₂), más grande, hierve a 59 °C y es líquido. El yodo (I₂), el más grande, es sólido.</p>
      <p>En resumen, para moléculas de tamaño parecido, de la más débil a la más fuerte:</p>
      <ul>
        <li>Las fuerzas de dispersión, que tienen todas las moléculas.</li>
        <li>Las atracciones entre moléculas polares, llamadas dipolo-dipolo.</li>
        <li>Los puentes de hidrógeno, que son un caso especial y fuerte de las anteriores.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> pensar que al hervir el agua se rompen sus moléculas en hidrógeno y oxígeno. Solo se rompen los puentes de hidrógeno entre ellas.</p>`,
    ejemplo: `
      <p>¿En qué estado están el bromo y el yodo a 25 °C? El bromo se funde a −7 °C y hierve a 59 °C; el yodo se funde a 114 °C.</p>
      <ol class="pasos-ej">
        <li>Usa la regla de los estados de agregación: por debajo del punto de fusión es sólido, entre los dos puntos es líquido y por encima del de ebullición es gas.</li>
        <li>El bromo: 25 °C está por encima de −7 °C y por debajo de 59 °C. Está entre los dos puntos, así que es líquido.</li>
        <li>El yodo: 25 °C está por debajo de su punto de fusión, 114 °C. Todavía no se funde, así que es sólido.</li>
        <li>Explica la diferencia: las moléculas de yodo son más grandes que las de bromo, tienen más electrones y sus fuerzas de dispersión son más fuertes. Hace falta más calor para separarlas.</li>
      </ol>
      <p>Resultado: <span class="resultado">el bromo es líquido y el yodo es sólido</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que el yodo es sólido por tener enlaces más fuertes dentro de su molécula. Lo que cambia es la atracción entre moléculas.</p>`,
    vidaReal: `
      <p>Las atracciones entre las partículas de una sustancia explican cosas curiosas:</p>
      <ul>
        <li>Algunos insectos caminan sobre el agua sin hundirse, porque su superficie se mantiene muy unida.</li>
        <li>Los geckos suben por paredes de vidrio gracias a millones de pelitos que se pegan al vidrio.</li>
        <li>El alcohol que te pones en la piel se evapora más rápido que el agua.</li>
        <li>El sudor te refresca, porque separar sus partículas para evaporarlo le quita calor a tu piel.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Cuando el agua hierve, ¿qué se rompe?</p>',
        opciones: ['Los enlaces entre el oxígeno y los hidrógenos', 'Los puentes de hidrógeno entre las moléculas', 'Los átomos de oxígeno'], correcta: 1,
        pista: '<p>¿El vapor sigue siendo H₂O?</p>',
        solucion: '<p><strong>Los puentes de hidrógeno.</strong> Las moléculas se separan, pero cada una sigue siendo H₂O; por eso el vapor sigue siendo agua.</p>' },
      { tipo: 'numero', enunciado: '<p>El agua hierve a 100 °C y el metano a −162 °C. ¿Cuántos grados de diferencia hay entre los dos puntos de ebullición?</p>', respuesta: 100 - -162,
        pista: '<p>Resta: 100 − (−162). Restar un número negativo es sumar.</p>',
        solucion: '<p>100 − (−162) = 100 + 162 = <strong>262 °C</strong>. Esa enorme diferencia se debe a los puentes de hidrógeno del agua.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas sustancias forma puentes de hidrógeno entre sus moléculas?</p>',
        opciones: ['El metano, CH₄', 'El oxígeno, O₂', 'El agua, H₂O', 'El cloro, Cl₂'], correcta: 2,
        pista: '<p>Busca un hidrógeno unido a oxígeno, nitrógeno o flúor.</p>',
        solucion: '<p>El <strong>agua</strong>: su hidrógeno está unido a un oxígeno. En el metano está unido a un carbono, y el O₂ y el Cl₂ no tienen hidrógeno.</p>' },
      { tipo: 'opciones', enunciado: '<p>El cloro, Cl₂, hierve a −34 °C. ¿En qué estado está a 25 °C?</p>',
        opciones: ['Sólido', 'Líquido', 'Gas'], correcta: 2,
        pista: '<p>¿25 °C está por encima o por debajo de su punto de ebullición?</p>',
        solucion: '<p>25 °C está por encima de −34 °C, así que ya hirvió: es un <strong>gas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el yodo, I₂, es sólido y el flúor, F₂, es gas, si los dos son halógenos?</p>',
        opciones: ['Porque las moléculas de yodo son más grandes y sus fuerzas de dispersión son más fuertes', 'Porque el yodo forma puentes de hidrógeno', 'Porque el flúor no tiene electrones'], correcta: 0,
        pista: '<p>Las fuerzas de dispersión crecen con el tamaño de la molécula.</p>',
        solucion: '<p>Porque <strong>el yodo es más grande</strong>: tiene más electrones, más fuerzas de dispersión y hace falta más calor para separar sus moléculas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es más fuerte?</p>',
        opciones: ['Una fuerza intermolecular entre dos moléculas', 'Son igual de fuertes', 'Un enlace covalente dentro de una molécula'], correcta: 2,
        pista: '<p>¿Qué se rompe primero cuando calientas agua?</p>',
        solucion: '<p><strong>El enlace covalente.</strong> Hervir el agua separa las moléculas a 100 °C, pero romper sus enlaces exige muchísima más energía.</p>' },
    ],
    fuentes: [
      OSC('10-1-intermolecular-forces', 'Intermolecular Forces'),
      WIKI('Fuerza_intermolecular', 'Fuerza intermolecular'),
      WIKI('Puente_de_hidrógeno', 'Puente de hidrógeno'),
      PHET('molecule-shapes', 'Geometría molecular'),
    ],
  });
})();
