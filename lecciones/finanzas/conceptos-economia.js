// Finanzas y economía · Unidad 1: Conceptos de economía.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Sin marcas ni empresas por su nombre. Las cifras de los ejemplos son de ejemplo.
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('finanzas', titulo, datos);
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

  const CORE3 = { nombre: 'CORE Econ (en español), La Economía, Capítulo 3: Escasez, trabajo y elección', url: 'https://books.core-econ.org/the-economy-v1/book/es/text/03.html' };
  const CORE8 = { nombre: 'CORE Econ (en español), La Economía, Capítulo 8: Oferta y Demanda', url: 'https://books.core-econ.org/the-economy-v1/book/es/text/08.html' };
  const CORE7 = { nombre: 'CORE Econ (en español), La Economía, Capítulo 7: La empresa y sus clientes', url: 'https://books.core-econ.org/the-economy-v1/book/es/text/07.html' };
  const CORE11 = { nombre: 'CORE Econ (en español), La Economía, Capítulo 11: Búsqueda de rentas, fijación de precios y dinámicas de mercado', url: 'https://books.core-econ.org/the-economy-v1/book/es/text/11.html' };
  const SERNAC = { nombre: 'SERNAC (Chile), Educación Financiera: Guía para el docente (PDF)', url: 'https://www.sernac.cl/portal/607/articles-9171_archivo_01.pdf' };
  const WIKI_MONOPOLIO = { nombre: 'Wikipedia (en español), Monopolio natural', url: 'https://es.wikipedia.org/wiki/Monopolio_natural' };
  const WIKI_BARRERAS = { nombre: 'Wikipedia (en español), Barrera de entrada', url: 'https://es.wikipedia.org/wiki/Barrera_de_entrada' };

  // ------------------------------------------------------------------
  const ELECCION = diagrama([0, 14], [0, 6], [
    caja(0.2, 1.6, 4.4, 4.4), txt(2.3, 3.8, 'Elijo:'), txt(2.3, 3.0, 'trabajar'), txt(2.3, 2.2, 'el turno'),
    ...flecha([4.55, 3.0], [7.45, 3.0], 0, 1.2),
    txt(6.0, 4.4, 'costo de'), txt(6.0, 3.9, 'oportunidad'),
    caja(7.6, 1.6, 11.8, 4.4), txt(9.7, 3.8, 'Dejo de lado:'), txt(9.7, 3.0, 'estudiar'), txt(9.7, 2.2, 'para el examen'),
  ], 'Diagrama con dos cajas unidas por una flecha horizontal. La caja de la izquierda dice «Elijo: trabajar el turno». La flecha, con el rótulo «costo de oportunidad» escrito encima, va hacia la caja de la derecha, que dice «Dejo de lado: estudiar para el examen».');

  L('Escasez y costo de oportunidad', {
    objetivo: 'Entender qué es la escasez y el costo de oportunidad, y comparar dos opciones calculando lo que dejas al elegir una.',
    explicacion: `
      <p>Es sábado por la mañana y tienes ocho horas libres. Tienes dos planes en la cabeza: inscribirte en un curso extra de dibujo o hacer un turno de ocho horas en el negocio de un vecino. Sea cual sea tu decisión, algo se queda en el camino. Eso no es mala suerte: es la norma, y hay una palabra para nombrarlo.</p>
      <p>La <strong>escasez</strong> (<span lang="en">scarcity</span>) es la situación en la que no hay suficientes recursos para todo lo que quieres. El tiempo es limitado: solo hay 24 horas en un día. El dinero es limitado: la mesada no alcanza para todo. Hasta tu atención es limitada: no puedes estudiar seis materias al mismo tiempo. Por eso, cuando alguien dice «no me alcanza», casi nunca quiere decir que le falta dinero en el banco: quiere decir que tiene que elegir.</p>
      <p>La escasez no es un asunto de adultos ni de países lejanos. Como viste en "Necesidades y deseos", cada persona tiene necesidades y deseos, y para atenderlos hacen falta tiempo, dinero y energía. Como los recursos son limitados y los deseos no, siempre hay que decidir. Esa decisión se llama <strong>toma de decisiones</strong>: elegir entre alternativas. La economía es, precisamente, la ciencia que estudia esas decisiones, la ciencia de la elección. Por eso esta lección no habla solo de empresas: habla de ti.</p>
      <h3>Lo que dejas atrás al elegir</h3>
      <p>Elegir, dice la gente, es ganar algo. Pero en realidad es ganar una cosa y dejar otra. A lo que dejas se te llama <strong>costo de oportunidad</strong> (<span lang="en">opportunity cost</span>): lo que dejas de tener por haber elegido. Y hay un detalle que cambia todo: el costo de oportunidad no es todo lo demás que dejaste de hacer, sino solamente la mejor alternativa que dejaste atrás.</p>
      <p>¿Cuál es la mejor alternativa? Depende de ti y de tu momento. La misma persona, el mismo sábado, puede valorar cosas distintas: si el examen es mañana, estudiar es la mejor alternativa; si el dinero urge para un regalo, el turno puede serlo. La escasez nos obliga a elegir entre varias opciones, según nuestras preferencias y posibilidades, y el costo de oportunidad es lo que vale la opción que perdimos.</p>
      ${ELECCION}
      <p>El diagrama muestra la mecánica de una elección: eliges una cosa y pierdes una alternativa concreta, no todas. Mira las dos filas de la tabla. En la primera eliges trabajar y dejas de lado estudiar para el examen: ese es tu costo de oportunidad. En la segunda eliges estudiar y dejas de lado el turno: también hay un costo de oportunidad, el dinero que no entró.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Opción</th><th>Lo que ganas</th><th>Lo que dejas (tu mejor alternativa)</th></tr>
        <tr><td>Trabajar el turno</td><td>Dinero y experiencia de trabajo</td><td>Estudiar para el examen</td></tr>
        <tr><td>Estudiar 4 horas</td><td>Salir con mejor preparación para el examen</td><td>El turno de trabajo y el dinero</td></tr>
      </table></div>
      <p>El costo de oportunidad casi nunca aparece en la cuenta del banco: no hay un recibo que lo enseñe. Por eso es fácil olvidarlo, y por eso toca calcularlo a mano, igual que en "Hacer tu primer presupuesto", donde cada gasto que haces desplaza una compra que no vas a hacer. Y cuando comparas dos opciones con la misma medida, como cuando comparas porcentajes en "Porcentajes", el costo de oportunidad se vuelve el número que decide.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que el costo de oportunidad es «todo lo que no hice». No es una suma de todo, es una sola cosa: la mejor alternativa que dejaste atrás. Si dejaste de lado el curso, el paseo y la comida, el costo de oportunidad sigue siendo el curso.</p>`,
    ejemplo: `
      <p>Es sábado y tienes ocho horas libres. Un vecino te ofrece un turno de ocho horas que te paga $40; la otra alternativa es estudiar cuatro horas para un examen. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Escribe las dos opciones. Con el turno: $40 y algo de experiencia. Con el estudio: cuatro horas de preparación y te quedan cuatro horas libres.</li>
        <li>El costo de oportunidad del turno es la mejor alternativa que dejas: las cuatro horas de estudio, porque el examen te importa más que esos $40.</li>
        <li>El costo de oportunidad de estudiar es el turno: te quedas sin los $40 y sin la experiencia.</li>
        <li>Comprueba que no sumas de más. Si estudias, también dejaste de lado dormir más y salir con tus amigos, pero eso no cuenta: solo cuenta la mejor alternativa, el turno.</li>
      </ol>
      <p>Resultado: <span class="resultado">trabajar cuesta 4 horas de estudio; estudiar cuesta $40</span>.</p>
      <p class="nota"><strong>Error común:</strong> decir que el costo de oportunidad del turno es «todo lo que no hice el sábado». Es una sola alternativa: la mejor que dejaste atrás.</p>`,
    vidaReal: `
      <ul>
        <li>Al elegir una materia extra, lo que dejas de hacer con ese tiempo es tu costo de oportunidad.</li>
        <li>Antes de aceptar un trabajo de fin de semana, conviene pensar qué es lo que vas a dejar de hacer.</li>
        <li>En un presupuesto, cada gasto que haces desplaza la compra que no harás: decidir es elegir hasta en cosas pequeñas.</li>
        <li>Cuando comparas dos precios, el más barato no siempre es el que te conviene: mira qué alternativa estás dejando atrás.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un curso de dibujo tiene 50 plazas y 300 personas quieren una. ¿Cuántas personas se quedan sin plaza?</p>', respuesta: 300 - 50,
        pista: '<p>¿Cuántas personas quieren una plaza y cuántas plazas hay?</p>',
        solucion: '<p>Hay 300 personas para 50 plazas. Lo que sobra es 300 − 50 = <strong>250 personas</strong>. Eso es escasez: no hay suficientes lugares para todos los que los quieren.</p>' },
      { tipo: 'numero', enunciado: '<p>Un turno de 6 horas paga $45. La otra opción del mismo día es un trabajo de 4 horas que paga $60. Si eliges el turno, ¿cuál es el costo de oportunidad, en dinero?</p>', respuesta: 60,
        pista: '<p>El costo de oportunidad es lo que vale la mejor alternativa que dejas, no el dinero que ganas.</p>',
        solucion: '<p>Tu mejor alternativa era el trabajo de $60, así que el costo de oportunidad del turno es <strong>$60</strong>. No son los $45 que ganas: es el valor de la alternativa que dejaste.</p>' },
      { tipo: 'numero', enunciado: '<p>Tienes 10 horas libres. Estudiar para un examen toma 6 horas, justo en el horario en que podrías hacer un turno de 4 horas. Si eliges estudiar, ¿a cuántas horas de trabajo dejas de lado?</p>', respuesta: 4,
        pista: '<p>La mejor alternativa aquí es el turno de 4 horas, no el tiempo que te queda libre.</p>',
        solucion: '<p>Dejaste de lado el turno de <strong>4 horas</strong>. Las horas libres que te quedan no cuentan: el costo de oportunidad es una sola alternativa, la mejor de las que dejaste atrás.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué significa la escasez?</p>',
        opciones: ['Que no hay suficientes recursos para todo lo que queremos', 'Que no hay dinero en el banco', 'Que la gente no estudia', 'Que los precios suben'], correcta: 0,
        pista: '<p>La escasez tiene que ver con los recursos y con lo que quieres, no solo con el dinero.</p>',
        solucion: '<p>La escasez es que los recursos (tiempo, dinero, atención) son limitados y los deseos no: por eso hay que elegir. Lo demás son cosas que pueden pasar, pero no son la definición.</p>' },
      { tipo: 'opciones', enunciado: '<p>Eliges trabajar el turno y dejas de lado estudiar para el examen. ¿Cuál es tu costo de oportunidad?</p>',
        opciones: ['Todo lo que no hiciste ese día', 'El dinero que ganaste', 'Las horas de estudio que no hiciste', 'Las horas de sueño que perdiste'], correcta: 2,
        pista: '<p>El costo de oportunidad es una sola alternativa: la mejor que dejaste.',
        solucion: '<p>El costo es la mejor alternativa que dejaste atrás: <strong>las horas de estudio</strong>. No es la suma de todo lo demás que no hiciste.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para calcular el costo de oportunidad de una decisión.</p>',
        respuesta: ['Escribe qué opciones tienes', 'Elige una de ellas', 'Identifica la mejor alternativa que dejas', 'Ese es el costo de oportunidad'],
        pista: '<p>Empieza por las opciones y termina por el nombre del costo.',
        solucion: '<p>Primero se listan las opciones, luego se elige una, después se busca la mejor alternativa que se deja y, por último, esa alternativa es el costo de oportunidad.</p>' },
    ],
    fuentes: [CORE3, SERNAC],
  });

  // ------------------------------------------------------------------
  const OFERTA_DEMANDA = G({
    x: [0, 10], y: [0, 5], pasos: [2, 1], nombres: false,
    funciones: [
      { f: (q) => (11 - q) / 3, etiqueta: 'demanda', serie: 0 },
      { f: (q) => (q + 1) / 3, etiqueta: 'oferta', serie: 1 },
    ],
    puntos: [{ x: 5, y: 2 }],
    figuras: [
      { tipo: 'linea', desde: [0, 2], hasta: [5, 2], punteada: true, serie: 2 },
      { tipo: 'linea', desde: [5, 0], hasta: [5, 2], punteada: true, serie: 2 },
      txt(2.0, 0.12, 'cantidad'),
      txt(0, 5.25, 'precio ($)'),
      txt(2.0, 2.15, 'precio de equilibrio'),
    ],
    descripcion: 'Gráfica de la oferta y la demanda de limonada en una feria. El eje horizontal es la cantidad de limonada, de 0 a 10, y el eje vertical es el precio, de 0 a 5 dólares. La curva de demanda baja de izquierda a derecha y la curva de oferta sube. Las dos se cruzan en el punto (5, 2): 5 limonadas a 2 dólares. Una línea punteada horizontal lleva ese precio al eje vertical y otra vertical lleva esa cantidad al eje horizontal.',
  });

  L('Oferta y demanda', {
    objetivo: 'Distinguir la oferta de la demanda, leer una gráfica de las dos curvas y explicar por qué los precios suben o bajan según lo que pasa en un mercado.',
    explicacion: `
      <p>El tomate está barato en verano y carísimo en invierno. El concierto del sábado se llena en dos días. ¿Por qué cambia el precio de las cosas si nadie lo decide? La respuesta tiene que ver con dos grupos de personas: los que venden y los que compran.</p>
      <p>Todo esto pasa en un mercado, es decir, en el espacio físico o virtual donde se compran y venden productos y servicios. Ahora, los dos grupos.</p>
      <p>La <strong>oferta</strong> (<span lang="en">supply</span>) es lo que los vendedores quieren poner a la venta: cuántos kilos de tomate están dispuestos a vender y a qué precio. Si el precio sube, al vendedor le conviene vender más, así que la oferta crece. La <strong>demanda</strong> (<span lang="en">demand</span>) es lo que los compradores quieren comprar: cuántos kilos de tomate están dispuestos a llevar y a qué precio. Si el precio sube, el comprador se arrepiente, así que la demanda baja.</p>
      <p>Aquí está la idea clave: el precio no lo decide ninguna persona, lo decide el choque entre los dos grupos. Si hay más compradores que vendedores, el precio sube, porque los compradores compiten entre ellos por el mismo producto. Si sobra producto, el precio baja, porque los vendedores compiten por el que quiere comprar. El precio funciona como un mensaje que va en los dos sentidos: dice a los vendedores qué producir y a los compradores qué comprar.</p>
      <h3>El punto donde todo encaja</h3>
      <p>Hay un precio en el que las dos cantidades se emparejan: exactamente tantos compradores como vendedores, y el producto alcanza. Ese momento es el <strong>equilibrio</strong>, y ese precio se llama precio de equilibrio. Fíjate que no es el resultado de que alguien lo decrete: es el punto donde la curva de oferta y la de demanda se cruzan.</p>
      <p>La gráfica lo muestra. La curva de demanda baja de izquierda a derecha, porque cuanto más caro está algo, menos gente lo quiere; la curva de oferta sube, porque cuanto más caro está algo, más gente lo quiere vender. Como viste en "El plano cartesiano y las gráficas", se leen de izquierda a derecha, y por eso se ven así.</p>
      ${OFERTA_DEMANDA}
      <p>Para verlo con números, mira un puesto de limonada en una feria. Las cifras son de ejemplo. La tabla dice cuántos quieren comprar y cuántos quieren vender a cada precio:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Precio</th><th>Cuántos quieren comprar</th><th>Cuántos quieren vender</th><th>Qué pasa</th></tr>
        <tr><td>$1</td><td>8</td><td>2</td><td>Falta producto: el precio sube</td></tr>
        <tr><td>$2</td><td>5</td><td>5</td><td>Se emparejan: es el equilibrio</td></tr>
        <tr><td>$3</td><td>2</td><td>8</td><td>Sobra producto: el precio baja</td></tr>
      </table></div>
      <p>Fíjate en la fila del medio: 5 quieren comprar y 5 quieren vender. Ese es el equilibrio, y coincide con el punto donde se cruzan las curvas. En la fila de arriba sobran compradores (8 contra 2), así que el precio sube; en la de abajo sobran vendedores (8 contra 2), así que el precio baja. Por eso el precio se va acomodando solo, sin que nadie lo ordene.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que el precio de equilibrio es un precio «justo» o mágico. Es solo el precio en el que las cantidades coinciden. Y no significa que nadie pueda cobrar más: si un vendedor pide más que ese precio, se queda sin compradores y el precio vuelve a bajar.</p>`,
    ejemplo: `
      <p>Instalas un puesto de limonada en una feria. Anotas cuántos quieren comprar y cuántos vender a cada precio; las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Primero, el precio más bajo. A $1 quieren comprar 8 limonadas y solo 2 quieren vender: falta producto, así que el precio empuja hacia arriba.</li>
        <li>Ahora el precio más alto. A $3 quieren comprar 2 y quieren vender 8: sobra producto, así que los vendedores bajan el precio.</li>
        <li>El precio de equilibrio está en el medio, donde las cantidades coinciden: $2, con 5 compradores y 5 vendedores. Se venden 5 limonadas y ni sobra ni falta.</li>
        <li>Comprueba con la gráfica: las curvas se cruzan en (5, 2), o sea 5 limonadas a 2 dólares, y las líneas punteadas llevan ese precio y esa cantidad a los ejes.</li>
      </ol>
      <p>Resultado: <span class="resultado">el precio de equilibrio es $2</span>, y se venden 5 limonadas.</p>
      <p class="nota"><strong>Error común:</strong> escoger el precio que deja más dinero, $3, sin mirar cuántos compradores hay. A $3 solo 2 quieren comprar, y el vendedor se queda con limonada sin vender.</p>`,
    vidaReal: `
      <ul>
        <li>En el mercado de frutas y verduras los precios suben cuando hay poca cosecha y bajan cuando hay mucha.</li>
        <li>Las entradas de un concierto o de un partido se encarecen cuando todos quieren ir el mismo día.</li>
        <li>Las verduras de temporada son más baratas cuando hay mucha cosecha y más caras cuando escasean.</li>
        <li>Un libro de texto usado baja de precio cuando hay muchos en venta y sube cuando quedan pocos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En la feria, a $1 quieren comprar 8 limonadas y a $3 solo quieren comprar 2. ¿Cuántas personas dejan de querer comprar cuando el precio pasa de $1 a $3?</p>', respuesta: 8 - 2,
        pista: '<p>Resta las dos cantidades de compradores.',
        solucion: '<p>8 − 2 = <strong>6 personas</strong>. Cuanto más caro está, menos gente lo quiere: esa es la curva de demanda bajando.</p>' },
      { tipo: 'numero', enunciado: '<p>A $3, 8 vendedores quieren vender limonada pero solo 2 compradores la quieren. ¿Cuánta limonada sobra?</p>', respuesta: 8 - 2,
        pista: '<p>Compara cuántos quieren vender con cuántos quieren comprar.',
        solucion: '<p>8 − 2 = <strong>6 limonadas</strong> sobran. Con producto de sobra, los vendedores bajan el precio.</p>' },
      { tipo: 'numero', enunciado: '<p>Si a $1 compran 8 limonadas y a $3 compran 2, ¿cuántos compradores se pierden por cada dólar que sube el precio?</p>', respuesta: (8 - 2) / (3 - 1),
        pista: '<p>Primero mira cuántos compradores se pierden en total y luego divide entre cuántos dólares subió el precio.',
        solucion: '<p>Se pierden 8 − 2 = 6 compradores y el precio subió 3 − 1 = 2 dólares. Entonces 6 ÷ 2 = <strong>3 compradores por dólar</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>El precio está por encima del precio de equilibrio. ¿Qué pasa?</p>',
        opciones: ['Sobra producto y el precio baja', 'Falta producto y el precio sube', 'El precio se queda quieto', 'Todos pueden comprar lo que quieren'], correcta: 0,
        pista: '<p>Piensa en qué pasa con los vendedores que no encuentran a quién venderle.',
        solucion: '<p>Si el precio está alto, <strong>sobra producto</strong>: los vendedores no encuentran compradores y bajan el precio hasta el equilibrio.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es la oferta?</p>',
        opciones: ['Lo que sobra en el mercado', 'Lo que los vendedores quieren poner a la venta', 'Lo que los compradores quieren comprar', 'El precio en el que todos se emparejan'], correcta: 1,
        pista: '<p>Una de esas cuatro es la demanda y otra es el equilibrio.',
        solucion: '<p>La oferta es <strong>lo que los vendedores quieren poner a la venta</strong>. Lo que quieren los compradores es la demanda, y el precio en el que coinciden es el equilibrio.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena lo que pasa cuando el precio está por encima del equilibrio.</p>',
        respuesta: ['El precio está por encima del equilibrio', 'Sobra producto y los vendedores no encuentran compradores', 'Los vendedores bajan el precio', 'El precio vuelve al equilibrio'],
        pista: '<p>Empieza por la situación y termina por el precio que se alcanza.',
        solucion: '<p>Primero el precio está alto; luego sobra producto porque sobran vendedores; después los vendedores bajan el precio, y así el precio vuelve al equilibrio.</p>' },
    ],
    fuentes: [CORE8, SERNAC],
  });

  // ------------------------------------------------------------------
  const EMPUJE = diagrama([0, 12], [0, 10], [
    ...flecha([6, 1.3], [6, 4.3], 0, 1.1),
    ...flecha([6, 8.7], [6, 5.7], 1, 1.1),
    { tipo: 'circulo', x: 6, y: 5, r: 0.32, solido: true },
    txt(2.7, 2.3, 'exceso de demanda'),
    txt(2.7, 1.5, 'el precio sube'),
    txt(9.3, 7.6, 'exceso de oferta'),
    txt(9.3, 6.8, 'el precio baja'),
    txt(9.3, 4.9, 'precio de equilibrio'),
  ], 'Diagrama con dos flechas que empujan hacia un punto central. La flecha de abajo sube hacia el centro y está rotulada «exceso de demanda, el precio sube». La flecha de arriba baja hacia el centro y está rotulada «exceso de oferta, el precio baja». En el punto central hay un círculo rotulado «precio de equilibrio».');

  L('Mercados y formación de precios', {
    objetivo: 'Explicar cómo se forman los precios en un mercado, distinguir el exceso de demanda del exceso de oferta y ver qué pasa cuando alguien fija un tope de precio o un precio mínimo.',
    explicacion: `
      <p>El mismo cuaderno cuesta una cosa en el barrio y otra en el centro. Y a veces el producto ni aparece: el puesto está abierto y no hay nada. ¿Quién decide esos precios? Casi nadie.</p>
      <p>Todo eso pasa en un <strong>mercado</strong>: el espacio físico o virtual donde se compran y venden productos y servicios, que funciona a través de la ley de la oferta y la demanda. Como viste en "Oferta y demanda", el precio queda definido por la relación entre lo que los vendedores ofrecen y lo que los compradores piden durante un tiempo determinado. Por eso el precio es siempre provisional: cambia con la estación, con la moda y con lo que cuesta producir, de lo que se ocupa "Cómo fijar un precio de venta".</p>
      <h3>Por qué no hay un solo precio</h3>
      <p>Cada lugar es un mercado distinto: cambian los compradores, los vendedores y los costos, así que el precio sale distinto. Nadie controla un mercado entero de arriba abajo. Y una diferencia grande de precio entre dos lugares tampoco se mantiene: si un bien se vendiera a precios distintos en distintos lugares, un comerciante podría comprarlo a bajo precio en uno y venderlo a un precio más alto en el otro. A ese movimiento se le llama arbitraje.</p>
      <h3>Los dos excesos que empujan el precio</h3>
      <p>Cuando el precio queda corto, todo el mundo quiere comprar y no alcanza: eso es <strong>exceso de demanda</strong>, la situación en que la cantidad que se pide es mayor que la cantidad que se ofrece al precio actual. Los vendedores lo notan y suben el precio. Cuando el precio queda alto pasa lo contrario: hay más producto del que se compra, y eso es <strong>exceso de oferta</strong>, la situación en que la cantidad que se ofrece es mayor que la cantidad que se demanda al precio actual. Entonces los vendedores bajan el precio.</p>
      <p>Los dos excesos empujan en sentidos contrarios, y el precio se acomoda donde ya no sobra ni falta nada. En el diagrama, la flecha que sube es el exceso de demanda; la que baja es el exceso de oferta. Las dos se encuentran en el precio de equilibrio.</p>
      ${EMPUJE}
      <div class="tabla-wrap"><table>
        <tr><th>Si el precio está…</th><th>Los compradores</th><th>Los vendedores</th><th>El precio</th></tr>
        <tr><td>por encima del equilibrio</td><td>Compran menos</td><td>No encuentran a quién vender</td><td>Baja</td></tr>
        <tr><td>por debajo del equilibrio</td><td>No alcanzan a comprar todo lo que quieren</td><td>Venden todo y quieren vender más</td><td>Sube</td></tr>
      </table></div>
      <h3>Cuando alguien fija el precio</h3>
      <p>Hasta aquí el precio se forma solo. Pero a veces no manda el mercado: manda una norma que dice «nadie puede cobrar más de X» o «nadie puede cobrar menos de X». Al primer tipo se le llama tope de precio y al segundo, precio mínimo.</p>
      <p>Un tope de precio que queda por debajo del equilibrio obliga a vender más barato, así que aparece un exceso de demanda: más gente quiere comprar de la que puede alcanzar. Y el resultado es raro: el producto se acaba o desaparece, porque a los vendedores ese precio no les sale. Con una tarifa fija para los taxis, era difícil conseguir un auto: quedaban pocos en la calle. Y cuando el precio oficial no alcanza, aparece un mercado secundario: la gente se arregla para comprar y vender por fuera de ese precio. El precio mínimo hace lo contrario: obliga a que el precio no baje de cierto punto, y si ese punto queda por encima del equilibrio, sobra producto y los vendedores quisieran bajarlo, pero no pueden.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que un tope de precio abarata el mercado para todos. Lo abarata solo para quien consigue comprar, y si el precio es demasiado bajo los vendedores dejan de vender: un tope de precio no crea más oferta.</p>
      <p>La inflación, que ya viste en "Inflación: por qué todo sube de precio", también altera el mercado: los precios suben en general y el dinero alcanza para menos.</p>`,
    ejemplo: `
      <p>En un mercado de fruta hay 100 cajas y 150 personas quieren comprar. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Compara: 150 personas quieren comprar y solo hay 100 cajas. Sobran compradores: hay exceso de demanda.</li>
        <li>Con exceso de demanda el precio sube. Las 100 cajas se venden y 50 personas se quedan sin comprar: 150 − 100 = 50.</li>
        <li>Ahora el caso contrario: 100 cajas y solo 60 personas quieren comprar. Sobran cajas: 100 − 60 = 40 sin comprador. Hay exceso de oferta.</li>
        <li>Con exceso de oferta el precio baja, y las cajas que sobran se quedan a precio de liquidación o se regalan.</li>
        <li>Comprueba la regla: el precio subió cuando sobraban compradores y bajó cuando sobró producto. Nadie de la feria fijó el precio.</li>
      </ol>
      <p>Resultado: <span class="resultado">con 150 personas el precio sube y 50 se quedan sin comprar; con 60 personas el precio baja y quedan 40 cajas sin vender</span>.</p>
      <p class="nota"><strong>Error común:</strong> decir que «el precio lo fijó el que trajo más cajas». No hay nadie que lo fije: el precio es la respuesta a que falten o sobren cajas.</p>`,
    vidaReal: `
      <ul>
        <li>El tomate baja de precio en temporada, cuando hay mucha cosecha, y sube en invierno, cuando hay poca.</li>
        <li>Cuando una norma pone un precio máximo y el producto escasea, aparece un mercado secundario: gente que compra y vende por fuera de ese precio.</li>
        <li>Un precio máximo al alquiler lo abarata, pero también puede hacer que haya más gente buscando casa que casas disponibles.</li>
        <li>Comparar el precio de un mismo producto en tres tiendas es ver tres mercados distintos en acción.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En el mercado de fruta hay 100 cajas y 150 personas quieren comprar. ¿Cuántas personas se quedan sin comprar?</p>', respuesta: 150 - 100,
        pista: '<p>Compara cuántas cajas hay con cuántas personas quieren comprar.</p>',
        solucion: '<p>150 − 100 = <strong>50 personas</strong>. Sobran compradores y no hay cajas: eso es exceso de demanda, y por eso el precio sube.</p>' },
      { tipo: 'numero', enunciado: '<p>En el mismo mercado hay 100 cajas y solo 60 personas quieren comprar. ¿Cuántas cajas se quedan sin vender?</p>', respuesta: 100 - 60,
        pista: '<p>Resta las personas que compran de las cajas que hay.</p>',
        solucion: '<p>100 − 60 = <strong>40 cajas</strong> sin comprador. Sobra producto: eso es exceso de oferta, y por eso el precio baja.</p>' },
      { tipo: 'numero', enunciado: '<p>Con 150 personas y 100 cajas, el precio de la caja sube de $10 a $12. ¿Cuánto pagan de más las 100 cajas que sí se venden?</p>', respuesta: 100 * (12 - 10),
        pista: '<p>Primero mira cuánto subió la caja y luego multiplica por las cajas que se venden.',
        solucion: '<p>La caja subió 12 − 10 = $2 y se venden 100 cajas: 100 × 2 = <strong>$200</strong> de más.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es un tope de precio?</p>',
        opciones: ['El precio más alto que se puede cobrar', 'El precio más bajo que se puede cobrar', 'El precio que se paga en un mercado secundario', 'El precio de equilibrio'], correcta: 0,
        pista: '<p>Es una norma que dice qué precio no se puede pasar.',
        solucion: '<p>Un tope de precio es <strong>el precio más alto que se puede cobrar</strong>. El precio mínimo es el más bajo que se puede cobrar, y el de equilibrio es donde la oferta y la demanda coinciden.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un tope de precio muy bajo en el alquiler de un barrio, ¿qué provoca?</p>',
        opciones: ['El alquiler baja hasta llegar al precio de equilibrio', 'Los dueños ofrecen más casas en alquiler', 'Aparecen más compradores que casas disponibles'], correcta: 2,
        pista: '<p>Piensa qué pasa con la gente que busca casa y con las casas que hay.',
        solucion: '<p>Aparecen <strong>más compradores que casas disponibles</strong>: hay exceso de demanda, porque el precio no puede subir hasta el equilibrio.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena lo que pasa cuando se fija un tope de precio por debajo del precio de equilibrio.</p>',
        respuesta: ['Alguien fija un tope de precio por debajo del equilibrio', 'El precio oficial queda más bajo que el del mercado', 'Aparece un exceso de demanda: no alcanza para todos', 'Aparece un mercado secundario para conseguir el producto'],
        pista: '<p>Empieza por la norma y termina por lo que hace la gente.',
        solucion: '<p>Primero se fija el tope, después el precio oficial queda por debajo del mercado, luego aparece el exceso de demanda porque no alcanza para todos, y al final surge un mercado secundario para conseguir el producto.</p>' },
    ],
    fuentes: [CORE8, CORE11, SERNAC],
  });

  // ------------------------------------------------------------------
  const DUELO = diagrama([0, 21], [0, 8], [
    txt(5.0, 7.0, 'Con competencia'),
    txt(15.6, 7.0, 'Con un solo vendedor'),
    caja(0.5, 2.05, 5.2, 5.4),
    txt(2.85, 4.65, 'varias'), txt(2.85, 3.85, 'tiendas'), txt(2.85, 3.05, 'compiten'),
    ...flecha([5.3, 3.1], [7.15, 3.45], 0, 1),
    ...flecha([5.3, 3.7], [7.15, 3.72], 0, 1),
    ...flecha([5.3, 4.3], [7.15, 3.99], 0, 1),
    ...flecha([5.3, 4.9], [7.15, 4.26], 0, 1),
    caja(7.2, 2.6, 10.0, 5.4), txt(8.6, 4.15, 'cliente'), txt(8.6, 1.9, 'elige'),
    caja(11.8, 2.6, 15.4, 5.4), txt(13.6, 4.7, 'un solo'), txt(13.6, 3.9, 'vendedor'),
    ...flecha([15.5, 4.0], [17.85, 4.0], 1, 1.2),
    caja(17.9, 2.6, 20.7, 5.4), txt(19.3, 4.15, 'cliente'), txt(19.3, 1.9, 'no elige'),
  ], 'Diagrama con dos casos lado a lado. A la izquierda, el rótulo dice «Con competencia»: una caja dice «varias tiendas compiten» y de ella salen cuatro flechas hacia una caja que dice «cliente», con la palabra «elige» debajo. A la derecha, el rótulo dice «Con un solo vendedor»: una caja dice «un solo vendedor» y de ella sale una sola flecha hacia una caja que dice «cliente», con la palabra «no elige» debajo.');

  L('Competencia y monopolios', {
    objetivo: 'Comparar un mercado con competencia con uno de un solo vendedor, y explicar qué es un monopolio natural y por qué algunos monopolios son regulados.',
    explicacion: `
      <p>En tu ciudad hay diez tiendas de alimentación y, en cambio, una sola empresa de agua o de electricidad. ¿Por qué unas compiten entre sí y la otra no?</p>
      <p>La diferencia no es la suerte: es la <strong>competencia</strong>. Cuando varias empresas venden lo mismo, se pelean por el mismo cliente, y esa pelea se nota en el precio y en el servicio. Si dos productos se sustituyen fácilmente, la competencia entre quienes los venden suele acabar en precios más bajos. Y al revés: una empresa está en posición fuerte cuando hay pocas que hacen productos parecidos: se enfrenta a poca competencia.</p>
      <p>En el otro extremo está el <strong>monopolio</strong> (<span lang="en">monopoly</span>): una empresa que es la única proveedora de un producto que no tiene sustitutos cercanos, y también un mercado con un solo vendedor. Sin competencia, la pérdida de eficiencia puede ser alta: por eso hay políticas de competencia. El problema es que un mercado con un solo vendedor no se corrige solo: nadie obliga a bajar el precio. Por eso en muchos países se regulan sus actividades, limitando su discrecionalidad sobre los precios, para que el consumidor se quede con más parte de lo que paga.</p>
      <h3>El monopolio que sale de la eficiencia</h3>
      <p>Hay un monopolio que parece injusto y no lo es. Se llama <strong>monopolio natural</strong>: el costo medio a largo plazo baja con fuerza, hasta el punto de que es imposible mantener la competencia en ese mercado. En palabras: una sola empresa sale más barata que tres que se reparten el trabajo, porque los costos dependen de cuántas unidades se fabriquen y mientras más se produce, menos cuesta cada una.</p>
      <p>El agua potable es uno de los monopolios naturales por excelencia, y también lo son el alcantarillado, el gas, la electricidad y, en algunos casos, la telefonía. Lo mismo ocurre con las infraestructuras: carreteras, ferrocarriles, aeropuertos, presas hidráulicas y puentes. Si en una ciudad la red de agua ya llega a cada casa, quien quiera ofrecer ese servicio tiene que pagar por construir otra red: ese gasto no se lo impone la empresa que ya está. Eso es una barrera de entrada: un obstáculo que aparece en el camino de quien quiere entrar a un mercado, y que hace que entrar sea más caro que seguir dentro. Por eso en un monopolio natural no sirven los precios más bajos por la vía de la competencia: si entraran más empresas, los costos medios subirían y el precio final también.</p>
      <p>En un caso así, tener tres redes de agua en paralelo sería tirar el dinero. Por eso la mayoría de las compañías de agua potable del mundo son del Estado, y el sector queda regulado por una agencia pública.</p>
      <h3>No todos los monopolios son iguales</h3>
      <p>Hay mercados donde no hay competencia y no la va a haber: los que acabamos de ver. En otros hay pocas empresas que venden productos parecidos y compiten entre ellas. Al final, lo que decide lo que pagas no es solo la competencia, sino que alguien vigile el precio.</p>
      <div class="tabla-wrap"><table>
        <tr><th></th><th>Con competencia</th><th>Con un solo vendedor</th></tr>
        <tr><th>Precio</th><td>Bajo: los vendedores pelean por el cliente</td><td>Más alto: nadie obliga al vendedor a bajarlo</td></tr>
        <tr><th>Calidad</th><td>Hay que mejorar el servicio para no perder clientes</td><td>Se puede atender peor sin perder clientes</td></tr>
        <tr><th>Poder de negociación</th><td>Lo tiene el cliente: puede cambiar de tienda</td><td>Lo tiene el vendedor: el cliente no tiene alternativa</td></tr>
        <tr><th>Quién puede entrar</th><td>Cualquiera puede abrir un negocio parecido</td><td>Cuesta entrar: hay barreras de entrada</td></tr>
      </table></div>
      ${DUELO}
      <p class="nota"><strong>Trampa común:</strong> pensar que «monopolio» es siempre malo, o siempre bueno. Un monopolio natural es una forma más eficiente de prestar un servicio, pero sin un regulador que vigile el precio, el consumidor paga de más y no tiene a dónde ir.</p>`,
    ejemplo: `
      <p>En un pueblo hay tres tiendas. Dos venden el mismo pan en el centro: una a $10 y otra a $12, así que compiten. La tercera está en la zona rural, donde no hay más tiendas: es la única que vende pan, a $16. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Promedia los precios de las que compiten: (10 + 12) ÷ 2 = $11, el precio de un mercado con competencia.</li>
        <li>La tienda rural cobra $16 y no tiene rival: 16 − 11 = $5 más.</li>
        <li>El cliente paga $5 más por el mismo pan y no tiene con quién comparar; la empresa gana más, pero depende de que nadie le abra competencia.</li>
        <li>Comprueba el resultado: si la tienda rural cobrara $11, el cliente pagaría lo mismo que en el centro; los $5 de diferencia miden lo que le cuesta no tener con quién comparar.</li>
      </ol>
      <p>Resultado: <span class="resultado">se pagan $5 más por el mismo pan: $16 contra $11</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que el pan de la tienda rural cuesta más porque es mejor. Cuesta más porque no tiene competencia cerca.</p>`,
    vidaReal: `
      <ul>
        <li>El pan, la leche y las verduras los venden muchas tiendas a la vez: esa pelea es lo que mantiene bajo el precio.</li>
        <li>El agua y la luz llegan a tu casa por una sola red, vigilada por un organismo público.</li>
        <li>Entrar a un mercado puede ser caro: hay gastos que tiene que pagar quien entra y no el que ya está dentro.</li>
        <li>Cuando dos tiendas del barrio se pelean por el mismo cliente, tú te quedas con el precio más bajo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Dos tiendas que compiten venden el mismo producto a $10 y a $12. ¿Cuál es el precio promedio?</p>', respuesta: (10 + 12) / 2,
        pista: '<p>Suma los dos precios y divide entre 2.',
        solucion: '<p>(10 + 12) ÷ 2 = <strong>$11</strong>. Ese es el precio promedio de un mercado donde hay competencia.</p>' },
      { tipo: 'numero', enunciado: '<p>La tienda que no tiene rival cobra $16 y el promedio de las que compiten es $11. ¿Cuántos pesos más paga el cliente?</p>', respuesta: 16 - 11,
        pista: '<p>Resta el promedio de las que compiten al precio de la tienda única.',
        solucion: '<p>16 − 11 = <strong>$5</strong> más. Sin rival, el vendedor pone el precio y el cliente no tiene con quién comparar.</p>' },
      { tipo: 'numero', enunciado: '<p>Una tienda con competencia baja su precio de $20 a $16 para no perder clientes. ¿Qué porcentaje del precio original es esa baja?</p>', respuesta: (20 - 16) / 20 * 100,
        pista: '<p>Primero calcula cuánto bajó en pesos y luego divide entre el precio original, como en "Porcentajes".',
        solucion: '<p>Bajó 20 − 16 = $4. Sobre el precio original: 4 ÷ 20 = 0,20, o sea un <strong>20%</strong> de rebaja.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es un monopolio natural?</p>',
        opciones: ['Un mercado donde una sola empresa puede prestar el servicio más barata que varias', 'Un mercado donde muchas empresas venden lo mismo', 'Una empresa que sube el precio cada año', 'Un mercado donde el Estado fija todos los precios'], correcta: 0,
        pista: '<p>La clave es que una sola empresa sale más barata que varias.',
        solucion: '<p>Un monopolio natural es <strong>un mercado donde una sola empresa puede prestar el servicio más barata que varias</strong>, porque los costos bajan mientras más unidades se fabrica.</p>' },
      { tipo: 'opciones', enunciado: '<p>En una ciudad, el agua potable llega a todas las casas y solo hay una empresa que la distribuye. ¿Por qué no llegan más empresas a competir?</p>',
        opciones: ['Porque el agua no se puede vender', 'Porque las familias no lo permitirían', 'Porque a quien entra le tocaría pagar por construir su propia red, y ese gasto el que ya está dentro no lo tiene que hacer'], correcta: 2,
        pista: '<p>Piensa en lo que tiene que pagar quien llega nuevo a ese mercado.',
        solucion: '<p>Es una <strong>barrera de entrada</strong>: quien entra tiene que pagar por su propia red y el que ya está no paga lo mismo. Por eso en ese mercado lo normal es una sola empresa regulada.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena lo que pasa en un mercado donde hay competencia.</p>',
        respuesta: ['Varias empresas venden lo mismo', 'Cada una baja el precio o mejora el servicio para atraer al cliente', 'El cliente compara y se queda con la mejor oferta', 'El precio se mantiene bajo y el servicio mejora'],
        pista: '<p>Empieza por las empresas y termina por lo que le pasa al cliente.',
        solucion: '<p>Primero varias empresas venden lo mismo; después cada una baja el precio o mejora el servicio para atraer al cliente; luego el cliente compara y elige; y al final el precio se mantiene bajo y el servicio mejora.</p>' },
    ],
    fuentes: [CORE7, WIKI_MONOPOLIO, WIKI_BARRERAS],
  });
})();
