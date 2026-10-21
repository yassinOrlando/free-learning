// Finanzas y economía · Unidad 5: Mercados financieros.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Sin marcas ni empresas por su nombre. Las cifras de los ejemplos son de ejemplo.
// Este archivo se escribió en dos fragmentos: primero las lecciones 1 y 2 (Acciones, Bonos),
// después las lecciones 3 y 4 (La bolsa de valores, Burbujas y crisis financieras).
// Ojo: los helpers y las constantes de fuentes de abajo son de toda la unidad.
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
  const mini = (funciones, descripcion, x = [-4, 4], y = [-4, 4]) => G({ x, y, funciones, descripcion });

  // ---- Fuentes de toda la unidad ----
  const CONDUSEF_DUMMIES = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: La Bolsa de Valores para Dummies (2018)', url: 'https://revista.condusef.gob.mx/inversion/otros/2018/05/la-bolsa-de-valores-para-dummies/' };
  const CONDUSEF_BIVA = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: BIVA te explica el mercado de valores (2023)', url: 'https://revista.condusef.gob.mx/usuario-inteligente/puntos-cardinales/2023/04/biva-te-explica-el-mercado-de-valores/' };
  const CONDUSEF_GLOSARIO = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: Glosario de inversión para principiantes (2022)', url: 'https://revista.condusef.gob.mx/inversion/2022/01/glosario-de-inversion-para-principiantes/' };
  const CONDUSEF_BOLSA25 = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: ¿Invertir en la bolsa? (2025)', url: 'https://revista.condusef.gob.mx/inversion/2025/11/invertir-en-la-bolsa/' };
  const CONDUSEF_INVERTIR = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: ¿No sabes cómo invertir tu dinero? (2020)', url: 'https://revista.condusef.gob.mx/inversion/pymes/2020/03/no-sabes-como-invertir-tu-dinero/' };
  const CONDUSEF_MARTHA = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: ¿Qué pasó con los ahorros de Martha y Daniel? (2020)', url: 'https://revista.condusef.gob.mx/ahorro-general/ahorro-formal/2020/10/que-paso-con-los-ahorros-de-martha-y-daniel/' };
  const WIKI_ACCION = { nombre: 'Wikipedia (en español), Acción (finanzas) (apoyo)', url: 'https://es.wikipedia.org/wiki/Acci%C3%B3n_(econom%C3%ADa)' };
  const WIKI_BONO = { nombre: 'Wikipedia (en español), Bono (finanzas) (apoyo)', url: 'https://es.wikipedia.org/wiki/Bono_(finanzas)' };
  const WIKI_BOLSA = { nombre: 'Wikipedia (en español), Bolsa de valores (apoyo)', url: 'https://es.wikipedia.org/wiki/Bolsa_de_valores' };
  const WIKI_INDICE = { nombre: 'Wikipedia (en español), Índice bursátil (apoyo)', url: 'https://es.wikipedia.org/wiki/%C3%8Dndice_burs%C3%A1til' };
  const WIKI_BURBUJA = { nombre: 'Wikipedia (en español), Burbuja económica (apoyo)', url: 'https://es.wikipedia.org/wiki/Burbuja_econ%C3%B3mica' };
  const CORE7 = { nombre: 'CORE Econ (en español), La Economía, Capítulo 7: La empresa y sus clientes', url: 'https://books.core-econ.org/the-economy-v1/book/es/text/07.html' };
  const CORE15 = { nombre: 'CORE Econ (en español), La Economía, Capítulo 15: Inflación, desempleo y política monetaria', url: 'https://books.core-econ.org/the-economy-v1/book/es/text/15.html' };
  const CORE17 = { nombre: 'CORE Econ (en español), La Economía, Capítulo 17: La Gran Depresión, la edad de oro y la crisis financiera mundial', url: 'https://books.core-econ.org/the-economy-v1/book/es/text/17.html' };
  const FED1929 = { nombre: 'Reserva Federal de EE. UU., Federal Reserve History: Stock Market Crash of 1929 (en inglés)', url: 'https://www.federalreservehistory.org/essays/stock-market-crash-of-1929' };
  const FED1987 = { nombre: 'Reserva Federal de EE. UU., Federal Reserve History: Stock Market Crash of 1987 (en inglés)', url: 'https://www.federalreservehistory.org/essays/stock-market-crash-of-1987' };

  // ------------------------------------------------------------------
  // Lección 1 · Acciones: de dónde sale el precio.
  const DEMANDA_ACCION = G({
    x: [0, 10], y: [0, 7], pasos: [2, 1], nombres: false,
    funciones: [
      { f: (q) => (10 - q) / 2, etiqueta: 'cuando las expectativas son bajas', serie: 0 },
      { f: (q) => (13 - q) / 2, etiqueta: 'cuando las expectativas suben', serie: 1 },
    ],
    figuras: [
      { tipo: 'linea', desde: [0, 3], hasta: [4, 3], punteada: true, serie: 2 },
      { tipo: 'linea', desde: [0, 4.5], hasta: [4, 4.5], punteada: true, serie: 2 },
      { tipo: 'linea', desde: [4, 0], hasta: [4, 4.5], punteada: true, serie: 2 },
      txt(6.2, 0.3, 'cantidad de acciones'),
      txt(3.0, 7.3, 'precio de la acción'),
    ],
    descripcion: 'Gráfica de la demanda de las acciones de una empresa. El eje horizontal es la cantidad de acciones que la gente quiere comprar y el vertical es el precio de la acción. Hay dos rectas que bajan de izquierda a derecha. La de las expectativas bajas va de (0, 5) a (10, 0) y la de las expectativas altas está por encima, va de (0, 6,5) a (10, 1,5). Una línea punteada vertical marca 4 acciones y dos horizontales muestran los precios de esa misma cantidad: 3 en la recta baja y 4,5 en la recta alta. Así se ve que, con la misma cantidad de acciones, el precio es más alto cuando las expectativas suben.',
  });

  L('Acciones', {
    objetivo: 'Entender de dónde sale el precio de una acción: cómo influyen la empresa, las expectativas de la gente y la oferta y la demanda.',
    explicacion: `
      <p>Dos personas tienen acciones de la misma empresa. Una dice: «esa empresa es un negocio redondo». La otra dice: «me dijeron que el mes que viene gana mucho». ¿Quién tiene razón? Ninguna de las dos. El precio de una acción no lo decide la opinión de quien la tiene: lo decide el conjunto de personas que la compran y la venden, y eso depende de lo que esperan que pase.</p>
      <p>En "Instrumentos de inversión: deuda, fondos y acciones" ya viste qué es una <strong>acción</strong> (<span lang="en">share</span>), una parte de una empresa, y las dos formas de ganar con ella: el <strong>dividendo</strong> (<span lang="en">dividend</span>), que es la parte de las ganancias que la empresa reparte entre sus accionistas, y la venta de la acción por más de lo que te costó. Esta lección no repite eso. Va a la pregunta que quedó abierta: ¿de dónde sale el precio?</p>
      <h3>El precio lo pone la gente, no la empresa</h3>
      <p>El precio sale de tres cosas que se empujan entre sí. La primera es la empresa: lo que produce, lo que gana y lo que puede crecer. La segunda son las <strong>expectativas</strong> (<span lang="en">expectations</span>), es decir, lo que la gente cree que va a pasar; de eso depende el precio, porque el precio mira hacia adelante y no hacia atrás. Y la tercera es la oferta y la demanda, la misma fuerza que viste en "Oferta y demanda", pero aquí los que compran y los que venden no son limonada: son personas que compran y venden pedacitos de empresas.</p>
      <p>La empresa manda, pero no manda sola. Lo que el negocio produce y lo que gana es la base, como viste en "Ingresos, costos y utilidad": si la utilidad sube, hay más para repartir en dividendos. CORE Econ, en el capítulo 7, recuerda que las empresas eligen su precio y su cantidad mirando a la vez lo que cuesta producir y lo que la gente está dispuesta a comprar. Y hay un detalle del mundo de las tasas: cuando la tasa de interés baja, el precio de los activos sube, porque guardar el dinero da menos y buscarlo da más, como cuenta el capítulo 15 del mismo libro.</p>
      <h3>Lo que la gente espera es el motor</h3>
      <p>Ahora viene la parte que más sorprende: el precio de una acción no mira hacia atrás, mira hacia adelante. Si todo el mundo espera que la empresa va a ganar más el año que viene, aparece más gente queriendo esa acción y el precio sube. Si las expectativas se enfrían, el precio baja aunque la empresa no haya cerrado peor. CORE Econ lo dice así en el capítulo 15: las expectativas de beneficio y la confianza condicionan las decisiones de inversión de las empresas. Y Wikipedia en español añade que el precio de las acciones depende también de factores que no tienen que ver con la situación actual de la empresa.</p>
      <p>La gráfica muestra cómo se mueve la curva de demanda de una acción cuando cambian las expectativas. Cuando las expectativas suben, la curva se desplaza hacia arriba: en la misma cantidad de acciones, el precio es más alto.</p>
      ${DEMANDA_ACCION}
      <p>Y aquí entra la oferta y la demanda. La demanda de una acción es el número de personas que quieren comprarla a un precio dado, y la oferta es el número de personas que quieren venderla. La oferta de las acciones de una empresa es casi fija, porque el número de acciones que emite no cambia cada día. Por eso, cuando la demanda crece, el precio tiene que subir para que se emparejen las dos, como viste en "Oferta y demanda".</p>
      <p class="nota"><strong>Trampa común:</strong> creer que el precio de una acción es el lugar donde el negocio está realmente. El precio es lo que la gente está dispuesta a pagar hoy por una promesa de mañana, y esa promesa se puede equivocar.</p>`,
    ejemplo: `
      <p>La panadería de la esquina quiere abrir un segundo local y necesita $500 000. Decide vender parte de la empresa en acciones. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Emite 1 000 acciones de $500. Entran $500 000, y ese dinero se usa para el segundo local.</li>
        <li>Con dos locales, la empresa pasa de ganar $120 000 al año a $240 000.</li>
        <li>El dividendo sale de la utilidad, como viste en "Ingresos, costos y utilidad". Reparte la tercera parte: 240 000 ÷ 3 = $80 000, o sea $80 por acción.</li>
        <li>El precio: antes valía $500. Ahora se espera que la empresa gane más, así que más gente la quiere y el precio sube a $620. No lo fijó la panadería, sino la oferta y la demanda.</li>
        <li>Y si el segundo local no funciona, las expectativas bajan y el precio cae, aunque siga repartiendo dividendos.</li>
      </ol>
      <p>Resultado: <span class="resultado">$500 000 captados, $80 de dividendo por acción y un precio que depende de las expectativas</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que el precio lo decide la empresa. Si lo pone más alto que el mercado, nadie le compra.</p>`,
    vidaReal: `
      <p>Saber de dónde sale el precio de una acción te sirve cada día:</p>
      <ul>
        <li>Cuando las noticias dicen que una empresa «subió un 8 %», sabes que no fue un premio por lo que hizo hoy, sino por lo que se espera de mañana.</li>
        <li>Cuando alguien dice que una acción «está barata», puede señalar una oportunidad o una trampa, porque el precio depende de lo que la gente espera.</li>
        <li>Entiendes por qué la misma empresa puede valer mucho en un mes y poco en otro, sin que sus cuentas hayan cambiado.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una panadería emite 1 000 acciones de $500 cada una para abrir un segundo local. ¿Cuánto dinero entra en la empresa?</p>', respuesta: 1000 * 500,
        pista: '<p>Multiplica el número de acciones por el precio de cada una.</p>',
        solucion: '<p>1 000 × 500 = <strong>$500 000</strong>. Ese dinero es para el segundo local, y por eso la empresa puede crecer.</p>' },
      { tipo: 'numero', enunciado: '<p>Con dos locales, la panadería gana $240 000 al año y reparte la tercera parte de esa utilidad en dividendos. ¿Cuánto dinero reparte en total?</p>', respuesta: 240000 / 3,
        pista: '<p>Una tercera parte es dividir entre 3.</p>',
        solucion: '<p>240 000 ÷ 3 = <strong>$80 000</strong> repartidos entre los accionistas. El dividendo sale de la utilidad, como viste en "Ingresos, costos y utilidad".</p>' },
      { tipo: 'opciones', enunciado: '<p>Si la gente espera que una empresa gane más el año que viene, ¿qué pasa con el precio de su acción?</p>',
        opciones: ['Sube, porque aparece más gente que la quiere', 'Baja, porque la empresa tiene más acciones', 'Se queda igual, porque el precio lo fija la empresa'], correcta: 0,
        pista: '<p>Piensa en la demanda: ¿cuánta gente quiere comprar esa acción?',
        solucion: '<p><strong>Sube</strong>. Las expectativas altas mueven la curva de demanda hacia arriba, y con la oferta casi fija el precio tiene que subir.</p>' },
      { tipo: 'opciones', enunciado: '<p>El precio de una acción de una empresa cayó un 7 % un día, aunque la empresa no haya cerrado peor. ¿Qué explica mejor ese movimiento?</p>',
        opciones: ['Que la empresa vendió menos pan ese mes', 'Que la gente espera menos de esa empresa', 'Que la empresa cambió de nombre'], correcta: 1,
        pista: '<p>El precio no depende solo de lo que ya pasó, sino de lo que se espera.',
        solucion: '<p>Que <strong>la gente espera menos de esa empresa</strong>. El precio mira hacia adelante, así que un cambio de expectativas lo mueve aunque las cuentas no hayan cambiado.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama lo que la gente cree que va a pasar con una empresa, de lo que depende el precio de su acción?</p>',
        respuestas: ['expectativas', 'las expectativas', 'expectativa', 'la expectativa', 'expectativas sobre la empresa'],
        pista: '<p>Es una palabra que también se usa para decir lo que se espera de un examen.',
        solucion: '<p>Las <strong>expectativas</strong>. Lo que la gente espera del futuro de la empresa es una de las tres cosas de las que sale el precio de su acción.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena lo que pasa cuando una empresa vende parte de sí misma en acciones y usa ese dinero para crecer.</p>',
        respuesta: ['La empresa produce y gana dinero', 'Alguien compra acciones y la empresa recibe ese dinero', 'La empresa usa el dinero para crecer o para ampliar el negocio', 'El negocio crece o se encoge según lo que результате', 'El precio de la acción sube o baja según lo que la gente espera'],
        pista: '<p>Empieza por lo que hace la empresa y termina por lo que pasa con el precio.',
        solucion: '<p>Primero la empresa produce y gana dinero, después alguien compra acciones y la empresa recibe ese dinero, luego la empresa lo usa para crecer, el negocio crece o se encoge, y al final el precio de la acción sube o baja según lo que la gente espera.' },
    ],
    fuentes: [CONDUSEF_BOLSA25, WIKI_ACCION, CORE7, CORE15],
  });

  // ------------------------------------------------------------------
  // Lección 2 · Bonos: las piezas del bono y por qué su precio se mueve.
  const FLUJO_BONO = diagrama([0, 24], [0.6, 10.2], [
    // Línea de tiempo
    { tipo: 'linea', desde: [1.5, 3.0], hasta: [22.6, 3.0] },
    ...flecha([21.8, 3.0], [23.0, 3.0]),
    { tipo: 'linea', desde: [3.5, 3.0], hasta: [3.5, 2.6] },
    { tipo: 'linea', desde: [7.0, 3.0], hasta: [7.0, 2.6] },
    { tipo: 'linea', desde: [10.5, 3.0], hasta: [10.5, 2.6] },
    { tipo: 'linea', desde: [14.0, 3.0], hasta: [14.0, 2.6] },
    { tipo: 'linea', desde: [17.5, 3.0], hasta: [17.5, 2.6] },
    { tipo: 'linea', desde: [21.0, 3.0], hasta: [21.0, 2.6] },
    txt(3.5, 1.1, 'Año 0'), txt(7.0, 1.1, 'Año 1'), txt(10.5, 1.1, 'Año 2'),
    txt(14.0, 1.1, 'Año 3'), txt(17.5, 1.1, 'Año 4'), txt(21.0, 1.1, 'Año 5'),
    // El emisor
    caja(0.8, 6.6, 12.0, 9.8),
    txt(6.4, 9.0, 'El emisor'), txt(6.4, 8.0, 'un gobierno o una empresa'), txt(6.4, 7.0, 'recibe $1 000'),
    ...flecha([3.5, 3.4], [3.5, 6.4]),
    // El pago de cada año
    { tipo: 'linea', desde: [6.5, 4.8], hasta: [21.0, 4.8] },
    ...flecha([7.0, 4.8], [7.0, 3.4]),
    ...flecha([10.5, 4.8], [10.5, 3.4]),
    ...flecha([14.0, 4.8], [14.0, 3.4]),
    ...flecha([17.5, 4.8], [17.5, 3.4]),
    ...flecha([21.0, 4.8], [21.0, 3.4]),
    txt(13.0, 5.6, 'un cupón de $60 cada año'),
    txt(21.0, 2.3, '$1 000'),
  ], 'Diagrama del flujo del dinero de un bono sobre una línea de tiempo. Arriba a la izquierda hay una caja que dice «El emisor», «un gobierno o una empresa» y «recibe $1 000». Una flecha sube desde el año 0 hasta esa caja: ese es el dinero que le prestas. Abajo, una línea de tiempo va del año 0 al año 5 y termina en flecha. Una línea horizontal en el medio, rotulada «un cupón de $60 cada año», tiene cinco flechas que bajan a los años 1, 2, 3, 4 y 5: son los cupones. Bajo el año 5 aparece la cantidad «$1 000», que es el valor nominal que se devuelve al final.');

  const PRECIO_BONO = G({
    x: [-0.6, 5], y: [700, 1200], pasos: [1, 100], nombres: false,
    funciones: [
      { f: (x) => 1000 + 17.8 * (5 - x), etiqueta: 'si las tasas bajan', serie: 0 },
      { f: (x) => 1000 - 16 * (5 - x), etiqueta: 'si las tasas suben', serie: 1 },
    ],
    puntos: [
      { x: 5, y: 1089, etiqueta: '$1 089' },
      { x: 5, y: 920, etiqueta: '$920' },
      { x: 0, y: 1000, etiqueta: '$1 000' },
    ],
    figuras: [
      txt(2.5, 760, 'años que faltan para el vencimiento'),
      txt(4.5, 1180, 'precio del bono'),
    ],
    descripcion: 'Gráfica del precio de un bono de $1 000 comprado al 6 % con cinco años de plazo. El eje horizontal son los años que faltan para el vencimiento, de 0 a 5, y el vertical es el precio del bono, de 700 a 1 200 dólares. Hay dos rectas que se juntan en el punto (0, 1000), el momento del vencimiento. La recta de las tasas que bajan empieza en $1 089 con cinco años de plazo y baja hasta $1 000. La recta de las tasas que suben empieza en $920 y sube hasta $1 000. Las dos terminan en el mismo precio, porque al final el bono siempre devuelve lo mismo.',
  });

  L('Bonos', {
    objetivo: 'Conocer las piezas de un bono (cupón, valor nominal y fecha de vencimiento) y entender por qué su precio baja cuando suben las tasas de interés.',
    explicacion: `
      <p>Un papel dice: «te pagaré $60 al año durante cinco años y te devolveré $1 000 al final». Todo queda claro... hasta que dentro de dos años cambias de opinión y quieres tu dinero antes. ¿Cuánto te pagan? Esa pregunta es la que responde esta lección.</p>
      <p>En "Instrumentos de inversión: deuda, fondos y acciones" ya viste qué es la renta fija, cuáles son sus tres riesgos y que existen las letras y los bonos del Tesoro. Aquí no repetimos eso: vamos a las piezas del bono y a lo que le pasa a su precio.</p>
      <h3>Las tres piezas del bono</h3>
      <p>Un <strong>bono</strong> (<span lang="en">bond</span>) es un préstamo con fecha de devolución y pagos periódicos. Quien lo emite se compromete a devolver el capital prestado en una fecha determinada, la fecha de vencimiento, y a pagar además intereses periódicos durante la vida del instrumento, como explica Wikipedia en español.</p>
      <p>Esos pagos periódicos tienen nombre: se llaman <strong>cupón</strong> (<span lang="en">coupon</span>), y son el interés del préstamo. El cupón se calcula como un porcentaje del valor nominal, el mismo interés simple que viste en "Interés simple": un bono de $1 000 con cupón del 6 % paga $60 al año.</p>
      <p>Y la cantidad que el bono devuelve al final se llama <strong>valor nominal</strong> (<span lang="en">face value</span>): es el dinero que vuelve a la fecha de vencimiento, $1 000 en nuestro papel. La CONDUSEF lo dice así: los emisores de deuda se comprometen a devolver el dinero en la fecha determinada.</p>
      <p>Con esas tres piezas se puede dibujar el camino del dinero:</p>
      ${FLUJO_BONO}
      <p>La línea de tiempo va del día de hoy al vencimiento: el emisor recibe tu dinero al principio, te paga un cupón cada año y te devuelve el valor nominal al final.</p>
      <h3>El precio no es lo que te van a pagar</h3>
      <p>Y aquí está la diferencia que sorprende a todo el mundo. Si mantienes el bono hasta el final, sabes exactamente cuánto recibes: los cupones y el valor nominal. Pero si lo vendes antes, el precio es otro, y lo fija el mercado. El precio de hoy de un bono es lo que valen hoy sus pagos futuros, y por eso, cuando las tasas de interés suben, ese precio baja.</p>
      <p>La razón se entiende con números. Tu bono paga $60 al año. Si las tasas del mercado suben al 8 %, aparece un bono nuevo de $1 000 que paga $80 al año. ¿Quién compraría el tuyo por $1 000, si puede comprar el otro y ganar $20 más cada año? Por eso el tuyo se vende por menos de $1 000, aunque al final te devuelvan $1 000. Y al revés: si las tasas bajan al 4 %, tu bono paga más que los nuevos y su precio sube por encima de $1 000.</p>
      <p>Wikipedia en español lo resume: el valor de los bonos se mueve en sentido inverso a las tasas de interés, cae cuando suben y sube cuando bajan. CORE Econ lo dice desde otro lado: cuando la tasa de interés baja, el precio de los activos sube.</p>
      ${PRECIO_BONO}
      <p>En la gráfica, la recta de arriba es el precio de tu bono con tasas más bajas, y la de abajo, con tasas más altas. Las dos se juntan en el valor nominal.</p>
      <p>Por eso "renta fija" no quiere decir "rendimiento fijo": lo que es fijo es el cupón, no el precio. El cupón está escrito en el papel desde el primer día; el precio se mueve cada día. Por eso las tasas de interés de un país, como viste en "Tasas de interés y su efecto en la economía", terminan moviendo el precio de los bonos que ya existen.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que vender un bono antes de tiempo te devuelve el valor nominal. No: solo te lo devuelven si lo mantienes hasta la fecha de vencimiento. Si lo vendes antes, recibes lo que el mercado pague ese día, que puede ser menos.</p>`,
    ejemplo: `
      <p>Un bono de $1 000 paga $60 al año y devuelve $1 000 a los cinco años. Las cifras son de ejemplo. ¿Qué pasa si las tasas suben al 8 % antes de que venza?</p>
      <ol class="pasos-ej">
        <li>Las piezas: valor nominal $1 000, cupón del 6 %, o sea $60 al año, y vencimiento a los cinco años.</li>
        <li>Si lo mantienes hasta el final, recibes cinco cupones ($300) más los $1 000 del valor nominal: $1 300.</li>
        <li>Pero supongamos que a los dos años quieres venderlo, con las tasas del mercado en el 8 %.</li>
        <li>Un bono nuevo de $1 000 paga $80 al año. Quien te compre el tuyo gana $20 menos al año, así que solo te lo paga por menos de $1 000: unos $920.</li>
        <li>Si las tasas bajaran al 4 %, el tuyo, que paga $60, valdría más de $1 000. En ambos casos terminas con $1 000 al vencer: cambia el precio de hoy.</li>
      </ol>
      <p>Resultado: <span class="resultado">el bono vale unos $920 en el mercado</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que «bono de $1 000» es su precio. Es lo que devuelve al final.</p>`,
    vidaReal: `
      <ul>
        <li>Si te ofrecen un papel que te paga una cantidad fija cada año y te devuelve el dinero al final, ya estás mirando un bono.</li>
        <li>Cuando un gobierno o una empresa quiere reunir dinero sin pedir un préstamo a un banco, emite bonos.</li>
        <li>Entiendes por qué un bono que te prometía un 6 % puede venderse hoy por menos de lo que te devolverán.</li>
        <li>Cuando sube la tasa oficial de tu país, entiendes por qué el dinero que ya está prestado vale menos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un bono de $1 000 paga un cupón del 6 % al año. ¿Cuánto te pagan cada año?</p>', respuesta: 1000 * 0.06,
        pista: '<p>Saca el 6 % de $1 000, como en "Interés simple".</p>',
        solucion: '<p>0,06 × 1 000 = <strong>$60</strong> al año. Ese pago es el cupón, y se calcula sobre el valor nominal.' },
      { tipo: 'numero', enunciado: '<p>Manejas un bono de $1 000 con cupón del 6 % hasta el vencimiento, dentro de cinco años. ¿Cuánto dinero recibes en total: los cupones y el valor nominal?</p>', respuesta: 1000 * 0.06 * 5 + 1000,
        pista: '<p>Primero los cinco cupones, y al final el valor nominal.',
        solucion: '<p>Cinco cupones de $60 son $300, más los $1 000 del final: <strong>$1 300</strong> en total, si te lo pagan todo como prometió.</p>' },
      { tipo: 'numero', enunciado: '<p>Las tasas del mercado suben al 8 % y aparece un bono nuevo de $1 000. ¿Cuánto paga de cupón al año ese bono nuevo?</p>', respuesta: 1000 * 0.08,
        pista: '<p>Es el 8 % de $1 000.',
        solucion: '<p>0,08 × 1 000 = <strong>$80</strong> al año. Por eso el bono viejo, que paga $60, se vende por menos de $1 000.' },
      { tipo: 'opciones', enunciado: '<p>¿Qué pasa con el precio de un bono viejo cuando las tasas de interés suben?</p>',
        opciones: ['Baja, porque hay bonos nuevos que pagan más', 'Sube, porque todos lo quieren', 'Se queda igual, porque el cupón está escrito en el papel'], correcta: 0,
        pista: '<p>Piensa qué te pagan por un bono nuevo igual.',
        solucion: '<p><strong>Baja.</strong> Si un bono nuevo paga $80 y el viejo $60, el viejo solo se vende por menos de $1 000. Lo que está fijo es el cupón, no el precio.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el pago que recibes cada año por tener un bono?</p>',
        respuestas: ['cupón', 'el cupón', 'cupones', 'los cupones', 'coupon'],
        pista: '<p>Es una palabra de cinco letras, y en inglés se dice coupon.',
        solucion: '<p>El <strong>cupón</strong>. Se calcula como un porcentaje del valor nominal y se paga hasta la fecha de vencimiento.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena lo que pasa con un bono desde que lo compras hasta que vence.</p>',
        respuesta: ['Le prestas el dinero al emisor y él te paga un cupón cada año', 'El bono tiene una fecha de vencimiento y un valor nominal', 'Si el mercado cambia, su precio sube o baja, aunque el cupón siga igual', 'En la fecha de vencimiento te devuelven el valor nominal'],
        pista: '<p>Empieza por lo que haces cuando lo compras y termina por lo que pasa el día del vencimiento.',
        solucion: '<p>Primero le prestas el dinero al emisor y él te paga un cupón cada año; el bono tiene una fecha de vencimiento y un valor nominal; si el mercado cambia, su precio sube o baja aunque el cupón siga igual; y en la fecha de vencimiento te devuelven el valor nominal.' },
    ],
    fuentes: [WIKI_BONO, CONDUSEF_INVERTIR, CORE15],
  });

  // ------------------------------------------------------------------
  // Lección 3 · La bolsa de valores: el recorrido de una orden.
  const RECORRIDO_ORDEN = diagrama([0, 18], [0.4, 17.6], [
    caja(5.0, 14.6, 14.0, 16.8),
    txt(9.5, 16.1, 'Tú'), txt(9.5, 15.2, 'quieres vender tus acciones'),
    caja(5.0, 10.8, 14.0, 13.0),
    txt(9.5, 12.3, 'El intermediario'), txt(9.5, 11.4, 'broker o casa de bolsa'),
    caja(5.0, 7.0, 14.0, 9.2),
    txt(9.5, 8.5, 'La bolsa'), txt(9.5, 7.6, 'las órdenes se cruzan'),
    caja(5.0, 3.2, 14.0, 5.4),
    txt(9.5, 4.7, 'Quien compra'), txt(9.5, 3.8, 'te compra tus acciones'),
    // El recorrido de la orden, de arriba abajo.
    ...flecha([9.5, 14.4], [9.5, 13.2], 0, 2),
    ...flecha([9.5, 10.6], [9.5, 9.4], 0, 2),
    ...flecha([9.5, 6.8], [9.5, 5.6], 0, 2),
    // El dinero vuelve por el otro lado.
    { tipo: 'linea', desde: [4.8, 4.3], hasta: [2.6, 4.3], punteada: true },
    { tipo: 'linea', desde: [2.6, 4.3], hasta: [2.6, 15.7], punteada: true },
    { tipo: 'linea', desde: [2.6, 15.7], hasta: [4.4, 15.7], punteada: true },
    ...flecha([4.4, 15.7], [5.0, 15.7], 2, 1.8),
    txt(2.7, 2.9, 'tu dinero vuelve'),
    // Rótulos de las flechas.
    txt(12.4, 13.8, 'mandas tu orden'),
    txt(13.6, 9.9, 'lleva la orden al mercado'),
    txt(14.4, 6.1, 'se topa con la orden de compra'),
  ], 'Diagrama del recorrido de una orden de venta en la bolsa, de arriba abajo. Primera caja: «Tú» y «quieres vender tus acciones». Una flecha con el rótulo «mandas tu orden» baja a la segunda caja: «El intermediario» y «broker o casa de bolsa». Otra flecha, rotulada «lleva la orden al mercado», baja a la tercera caja: «La bolsa» y «las órdenes se cruzan». Una tercera flecha, con el rótulo «se topa con la orden de compra», baja a la cuarta caja: «Quien compra» y «te compra tus acciones». A la izquierda, una línea punteada sube desde esa última caja hasta la primera, con el rótulo «tu dinero vuelve».');

  L('La bolsa de valores', {
    objetivo: 'Saber qué es la bolsa de valores, cómo viaja una orden hasta cerrarse, quién fija el precio y para qué sirve un índice.',
    explicacion: `
      <p>Quieres vender tus acciones de una empresa y tu amigo las quiere comprar. ¿Se pisan en la calle para hacer el trato? No. ¿Entonces qué hay entre los dos? La <strong>bolsa de valores</strong> (<span lang="en">stock exchange</span>), que es el mercado donde se compran y venden acciones y bonos.</p>
      <p>En "Instrumentos de inversión: deuda, fondos y acciones" ya viste qué son las acciones y los bonos. Aquí no repetimos eso: lo que falta es el escenario, quién compra, quién vende, quién pone el precio y qué pasa con tu orden.</p>
      <h3>Un mercado con dos lados</h3>
      <p>La bolsa de valores es un tipo de mercado en el que se puede vender y comprar una gran variedad de instrumentos de inversión: acciones, bonos públicos o privados, certificados o títulos de participación. Así lo describe la CONDUSEF, el organismo mexicano que protege a los usuarios de servicios financieros. Wikipedia en español la define como una institución que facilita la negociación de valores entre inversores, en un espacio regulado y transparente.</p>
      <p>Hay dos lados, y los dos están en la misma sala. Los ofertantes son, casi siempre, las empresas, que venden sus acciones o bonos a cambio de dinero para expandirse. Los demandantes son los inversionistas, que compran esos valores y se vuelven accionistas. Esos dos lados nunca se tratan directamente entre ellos.</p>
      <h3>El precio lo pone la oferta y la demanda</h3>
      <p>La bolsa funciona con la dinámica de libre mercado, es decir, con la oferta y la demanda, como ya viste en "Oferta y demanda" y en "Mercados y formación de precios". Nadie dentro de la bolsa decide cuánto vale una acción: el precio sube cuando aparece más gente que quiere comprarla y baja cuando aparece más gente que quiere venderla. Por eso la fluctuación de los precios hay que tomarla en cuenta al invertir.</p>
      <p>Y hay un detalle que sorprende a quien llega por primera vez: el precio que ves no es el de tu operación, sino el de la última operación. Si mandas una orden de compra a $50 y la última operación se cerró a $52, tu orden se cierra a $52; y si no hay ninguna venta a $50, tu orden se queda esperando, sin comprar nada.</p>
      <h3>El intermediario</h3>
      <p>¿Cómo llega tu orden al mercado? Por un <strong>intermediario</strong> (<span lang="en">broker</span>), que en México se llama casa de bolsa. La CONDUSEF lo dice así: la fijación de los precios y la compraventa de los instrumentos se hacen por medio de brokers o corredores de bolsa. Por eso el intermediario no pone el precio: ejecuta órdenes, y el precio lo pone el mercado.</p>
      ${RECORRIDO_ORDEN}
      <p>Hay dos etapas: la emisión, donde la empresa o el gobierno coloca sus instrumentos en la bolsa para financiarse, y el mercado secundario, donde los inversionistas negocian entre sí, también con una casa de bolsa. Cuando compras una acción estás en esa segunda etapa.</p>
      <h3>El índice: un número para todo</h3>
      <p>Con miles de empresas cotizando, nadie puede revisarlas todas una por una cada día. Para eso existe el <strong>índice</strong> (<span lang="en">index</span>): un registro estadístico, normalmente un solo número, que refleja las variaciones de valor o la rentabilidad promedio de las acciones que lo componen. Si dicen que «el índice de la bolsa subió», es que, en promedio, las empresas que lo forman valen más que ayer.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Pregunta</th><th>Respuesta</th></tr>
        <tr><th>¿Quién compra y quién vende?</th><td>Las empresas ofrecen sus acciones y bonos para reunir dinero, y los inversionistas compran y se vuelven accionistas.</td></tr>
        <tr><th>¿Quién fija el precio?</th><td>Nadie en particular: lo fijan la oferta y la demanda, como en cualquier mercado libre.</td></tr>
        <tr><th>¿Qué pasa con tu orden?</th><td>El intermediario la manda al mercado y se cierra al precio de la última operación, no al precio que pediste.</td></tr>
      </table></div>
      <p>La CONDUSEF recuerda que la bolsa es un lugar, físico y digital, donde cualquier persona puede invertir comprando pequeños pedazos de una empresa. Detrás no hay un misterio: hay reglas y un precio que sale del mercado.</p>`,
    ejemplo: `
      <p>Ana tiene 200 acciones de una empresa y quiere venderlas. Beto quiere comprar de esa misma empresa, pero no sabe a cuánto se venden hoy. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Los dos quieren lo mismo, pero no pueden acordar el precio: Ana no sabe a cuánto puede vender y Beto no sabe a cuánto puede comprar. Lo resuelve la bolsa.</li>
        <li>Ana manda su orden de venta a su casa de bolsa: 200 acciones, y Beto manda la suya: comprar 200. Ninguno pone el precio: lo pone el mercado.</li>
        <li>Cuando las dos órdenes se cruzan, se cierra a un precio, digamos $75 por acción. Ana recibe 200 × 75 = $15 000 y Beto se queda con sus 200 acciones.</li>
        <li>Si Beto limitara su orden a $70, esperaría a que alguien vendiera a ese precio. Y el índice resume en un número cómo va un grupo de empresas.</li>
      </ol>
      <p>Resultado: <span class="resultado">las 200 acciones se vendieron a $75 cada una: $15 000 en total</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que el intermediario pone el precio. Él ejecuta órdenes; el precio lo fijan la oferta y la demanda.</p>`,
    vidaReal: `
      <p>Entender cómo funciona la bolsa te sirve para cosas concretas:</p>
      <ul>
        <li>Cuando en las noticias dicen que «el índice subió», ya sabes qué se mide y por qué eso no significa que a ti te vaya bien.</li>
        <li>Cuando comparas dos formas de invertir, entiendes por qué cambian los precios aunque la empresa no cambie.</li>
        <li>Sabes que el precio que ves es el de la última operación, y por eso tiene sentido poner un precio límite a tu orden.</li>
        <li>Entiendes para qué sirve un intermediario y por qué nadie negocia contigo directamente.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>El precio de la última operación de una acción fue de $120. Mandas a tu intermediario una orden de compra a $118 y tu orden se cierra enseguida. ¿A qué precio compras la acción?</p>', respuesta: 120,
        pista: '<p>Tu orden no pone el precio: se ejecuta al del mercado.</p>',
        solucion: '<p>A <strong>$120</strong>, el precio de la última operación. Si a $118 no hay ninguna orden de venta, tu orden espera; no compras nada más barato solo porque lo pidas.</p>' },
      { tipo: 'numero', enunciado: '<p>Una amiga quiere vender 200 acciones de una empresa. El precio de la última operación es de $75 y su orden se cierra a ese precio. ¿Cuánto dinero recibe?</p>', respuesta: 200 * 75,
        pista: '<p>Multiplica el número de acciones por el precio de cada una.</p>',
        solucion: '<p>200 × 75 = <strong>$15 000</strong>. Es el mismo trato del ejemplo: el precio lo puso el mercado, no ella.' },
      { tipo: 'opciones', enunciado: '<p>¿Quién fija el precio de una acción en la bolsa?</p>',
        opciones: ['La empresa que emite las acciones', 'Tu intermediario, que ejecuta la orden', 'La oferta y la demanda, como en cualquier mercado libre', 'El organismo que vigila la bolsa'], correcta: 2,
        pista: '<p>Piensa qué mueve el precio cuando aparece más gente que quiere comprar.',
        solucion: '<p>La <strong>oferta y la demanda</strong>. El intermediario ejecuta órdenes y la empresa emite acciones, pero el precio lo pone el juego entre los que compran y los que venden.' },
      { tipo: 'opciones', enunciado: '<p>Ana quiere vender acciones y Beto quiere comprarlas. ¿Cómo se hace el trato?</p>',
        opciones: ['Se encuentran en la calle y se ponen de acuerdo en el precio', 'Cada uno manda su orden a su casa de bolsa y ahí se cruzan las dos órdenes', 'La bolsa les impone un precio y los dos lo aceptan', 'La empresa que emitió las acciones decide cuánto valen'], correcta: 1,
        pista: '<p>Nadie compra directamente a otro inversionista.',
        solucion: '<p>Cada uno manda su orden a su casa de bolsa y ahí se cruzan las dos órdenes. El precio lo fija el mercado, y el dinero llega a través del intermediario.' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el número que resume cómo va un grupo de empresas que cotizan en la bolsa?</p>',
        respuestas: ['índice', 'el índice', 'indice', 'los índices', 'índice bursátil'],
        pista: '<p>Es una palabra de seis letras que también se usa para la lista de capítulos de un libro.',
        solucion: '<p>El <strong>índice</strong>. Es un registro estadístico que refleja las variaciones de valor o la rentabilidad promedio de las acciones que lo componen.' },
      { tipo: 'ordenar', enunciado: '<p>Ordena el camino que sigue tu orden de compra en la bolsa.</p>',
        respuesta: ['Mandas tu orden a tu intermediario', 'El intermediario la lleva al mercado', 'Tu orden se cruza con la orden de venta de otro inversionista', 'La operación se cierra al precio de la última operación', 'Recibes las acciones y el intermediario cobra su comisión'],
        pista: '<p>Empieza por lo que haces tú y termina por lo que pasa con tu dinero.',
        solucion: '<p>Primero mandas tu orden a tu intermediario, él la lleva al mercado, tu orden se cruza con la orden de venta de otro inversionista, la operación se cierra al precio de la última operación y, al final, recibes las acciones y el intermediario cobra su comisión.' },
    ],
    fuentes: [CONDUSEF_DUMMIES, CONDUSEF_BIVA, CONDUSEF_BOLSA25, WIKI_BOLSA, WIKI_INDICE],
  });

  // ------------------------------------------------------------------
  // Lección 4 · Burbujas y crisis financieras: la mecánica de la burbuja.
  const CICLO_BURBUJA = diagrama([0, 15], [5, 15.2], [
    // Ciclo de arriba: la burbuja crece.
    txt(3.8, 14.5, 'la burbuja crece'),
    caja(1.4, 12.2, 6.2, 13.8), txt(3.8, 13.0, 'Esperan que suba'),
    caja(1.4, 8.8, 6.2, 10.4), txt(3.8, 9.6, 'Compran'),
    caja(1.4, 5.4, 6.2, 7.0), txt(3.8, 6.2, 'El precio sube'),
    ...flecha([3.8, 12.0], [3.8, 10.6], 0, 1.4),
    ...flecha([3.8, 8.6], [3.8, 7.2], 0, 1.4),
    { tipo: 'linea', desde: [1.2, 6.2], hasta: [0.6, 6.2], punteada: true },
    { tipo: 'linea', desde: [0.6, 6.2], hasta: [0.6, 13.0], punteada: true },
    { tipo: 'linea', desde: [0.6, 13.0], hasta: [1.0, 13.0], punteada: true },
    ...flecha([1.0, 13.0], [1.4, 13.0], 2, 1.4),
    // Ciclo de abajo: la burbuja se rompe.
    txt(11.2, 14.5, 'la burbuja se rompe'),
    caja(8.8, 12.2, 13.6, 13.8), txt(11.2, 13.0, 'Dudan'),
    caja(8.8, 8.8, 13.6, 10.4), txt(11.2, 9.6, 'Venden'),
    caja(8.8, 5.4, 13.6, 7.0), txt(11.2, 6.2, 'El precio baja'),
    ...flecha([11.2, 12.0], [11.2, 10.6], 1, 1.4),
    ...flecha([11.2, 8.6], [11.2, 7.2], 1, 1.4),
    { tipo: 'linea', desde: [13.8, 6.2], hasta: [14.4, 6.2], punteada: true },
    { tipo: 'linea', desde: [14.4, 6.2], hasta: [14.4, 13.0], punteada: true },
    { tipo: 'linea', desde: [14.4, 13.0], hasta: [14.0, 13.0], punteada: true },
    ...flecha([14.0, 13.0], [13.6, 13.0], 2, 1.4),
  ], 'Diagrama con dos ciclos, uno al lado del otro. A la izquierda, el titled «la burbuja crece»: una caja que dice «Esperan que suba», una flecha hacia abajo, una caja que dice «Compran», otra flecha hacia abajo, una caja que dice «El precio sube», y una línea punteada que sube por la izquierda desde esa última caja hasta la primera y cierra el círculo. A la derecha, el titled «la burbuja se rompe»: una caja que dice «Dudan», una flecha hacia abajo, una caja que dice «Venden», otra flecha hacia abajo, una caja que dice «El precio baja», y una línea punteada que sube por la derecha de vuelta a la primera caja.');

  const PRECIO_BURBUJA = G({
    x: [0, 10], y: [0, 120], pasos: [1, 20], nombres: false,
    funciones: [
      { f: (x) => {
          if (x <= 3) return 30 + (10 / 3) * x;
          if (x <= 5.8) return 40 + 55 * Math.pow((x - 3) / 2.8, 2.2);
          if (x <= 6.4) return 95 - 60 * ((x - 5.8) / 0.6);
          if (x <= 7.2) return 35 - 13 * ((x - 6.4) / 0.8);
          if (x <= 8.2) return 22 + 10 * (x - 7.2);
          return 32 + 8 * ((x - 8.2) / 1.8);
        }, serie: 0 },
    ],
    puntos: [{ x: 5.8, y: 95, etiqueta: '¿precio real?' }],
    figuras: [
      { tipo: 'linea', desde: [0, 30], hasta: [10, 30], punteada: true, serie: 2 },
      { tipo: 'linea', desde: [3, 0], hasta: [3, 100], punteada: true, serie: 2 },
      { tipo: 'linea', desde: [5.8, 0], hasta: [5.8, 100], punteada: true, serie: 2 },
      txt(4.4, 108, 'zona de burbuja'),
      txt(1.4, 116, 'precio del activo'),
      txt(1.4, 24, 'su valor real'),
      txt(8.5, 4, 'tiempo que pasa'),
    ],
    descripcion: 'Gráfica del precio de un activo a lo largo del tiempo. El eje horizontal es el tiempo, de 0 a 10, y el eje vertical es el precio del activo, de 0 a 120. Una línea punteada horizontal marca el valor real del activo, 30, con la etiqueta «su valor real». La curva empieza en 30, sube despacio hasta 40 y, en la zona de burbuja, entre los momentos 3 y 5.8, se dispara hasta 95. Ese tramo está encerrado por dos líneas punteadas verticales y rotulado «zona de burbuja». En la crista, en el punto (5.8, 95), hay un punto con la etiqueta «¿precio real?». Después la curva se desploma: baja hasta 35, sigue hasta 22, por debajo del valor real, y luego sube despacio hasta 40 al final.',
  });

  L('Burbujas y crisis financieras', {
    objetivo: 'Entender cómo se forma una burbuja, por qué se rompe y por qué el problema de los precios puede llegar a los bancos y al trabajo de la gente.',
    explicacion: `
      <p>En un pueblo, todos compran las mismas cajas de coleccionables porque el año pasado valían el doble. Nadie las necesita: no se comen, no se usan. ¿Por qué siguen subiendo? Porque cada vez que alguien las compra, el precio sube, y eso hace que más gente quiera comprarlas.</p>
      <p>A ese precio que se aleja de lo que el objeto vale en realidad se le llama <strong>burbuja</strong> (<span lang="en">bubble</span>). Y cuando lo que la sostiene no es el uso de la cosa, sino la esperanza de venderla más caro, se llama <strong>burbuja especulativa</strong> (<span lang="en">speculative bubble</span>). Wikipedia en español la describe como una subida anormal e incontrolada del precio de un activo, causada por gente que compra para vender más caro. Por qué emite una empresa acciones ya lo viste en "Qué es una empresa".</p>
      <h3>El motor de la burbuja</h3>
      <p>Una burbuja no se sostiene por una razón externa, sino por un bucle. Alguien compra, el precio sube, quien ve que el precio sube compra más, ese precio más alto refuerza la expectativa y trae a más gente. Cada vuelta sube el precio un poco más, y el activo se aleja de lo que vale. En el pueblo de las cajas pasaba eso mismo.</p>
      ${CICLO_BURBUJA}
      <p>La gráfica del precio tiene esa forma: sube despacio, se dispara en la zona de burbuja y se desploma después.</p>
      ${PRECIO_BURBUJA}
      <p>Y hay un segundo motor, el más peligroso: el crédito. Comprar con dinero prestado agranda la burbuja, porque el que pide prestado también compra. Pero esa misma deuda agranda la caída. Hyman Minsky, que estudió las burbujas financieras, las relacionó con el crédito.</p>
      <h3>Cuando se derrumba</h3>
      <p>La burbuja se rompe cuando aparece alguien que no cree: entonces hay mucha gente vendiendo y muy poca comprando, y el precio se hunde. Wikipedia en español lo describe así: la burbuja estallla por la venta masiva, cuando ya quedan pocos compradores.</p>
      <p>Ahora bien, el daño en la economía real depende de una pregunta: ¿el dinero que se valor mal es el que financia la economía? Si la burbuja es de acciones y nadie pidió prestado, el daño se queda en las cuentas de quien invirtió. Pero si es de casas, y con ellas se prestó dinero, el problema salta a la calle.</p>
      <p>Así fue la crisis financiera mundial: empezó en 2007 con el desplome de los precios de la vivienda en Estados Unidos, lo que llevó a una duda sobre si los bancos podrían pagar (Estados Unidos, 2007). Y el efecto se extiende: cuando los precios bajan, el hogar debe más y gasta menos, y si la casa vale menos que la hipoteca, su patrimonio es negativo. Los bancos también son parte del bucle: durante la burbuja, como se esperaba que los precios siguieran subiendo, el riesgo era menor y prestaron más. Eso es el acelerador financiero: si sube la garantía, hay más crédito y gasto; si baja, pasa lo contrario.</p>
      <h3>En la calle</h3>
      <p>Una <strong>crisis financiera</strong> (<span lang="en">financial crisis</span>) es cuando el problema de los precios llega a los bancos y al trabajo de la gente. No todos los países llegaron a ese punto: Alemania, los países nórdicos, Japón, Canadá y Australia no tuvieron burbuja y evitaron en general la crisis (CORE Econ, capítulo 17). Las señales de que algo viene ya las viste en "Señales de alerta de una crisis".</p>
      <p>Un desplome de la bolsa no es lo mismo que una crisis: esta llega cuando el problema alcanza a los bancos y al trabajo de la gente. En 1987 el índice de las acciones de Estados Unidos había ganado un 44 % en siete meses, lo que ya despertaba dudas sobre una burbuja, y el 19 de octubre bajó un 22,6 % (Estados Unidos, 1987). En "Crisis históricas y lo que nos enseñaron" ya viste esas crisis una por una; aquí va la mecánica. Y las promesas de que todos ganan ya las viste en "Esquemas piramidales y promesas de dinero fácil".</p>`,
    ejemplo: `
      <p>En un pueblo, las cajas de coleccionables de una serie se vendían en $100 y el año pasado costaban $200, así que todos compran. El valor real de la caja no cambió: sigue siendo un cartón con una estampa. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Como todos esperan que el precio suba, compran y empujan el precio: la compra confirma la expectativa y trae más compras.</li>
        <li>Quien entra con dinero prestado compra tres veces más cajas y el precio sube más rápido. El préstamo agranda la burbuja.</li>
        <li>Un día, un vecino duda: «esto no puede seguir así». Vende, y otros que ya pensaban en vender se suman. Como casi nadie compra a ese precio, el precio se desploma.</li>
        <li>El que compró con dinero prestado no puede aguantar: tiene que vender aunque el precio se derrumbe. La deuda agranda la caída.</li>
      </ol>
      <p>Resultado: <span class="resultado">el precio se derrumbó y el problema llegó hasta el trabajo de la gente</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que, si el precio baja, quien compró prestado solo pierde en sus cuentas. La pérdida llega a su banco y a su trabajo.</p>`,
    vidaReal: `
      <p>Entender cómo se forman las burbujas te sirve para mucho:</p>
      <ul>
        <li>Cuando todo el mundo dice que algo «sube y sube», entiendes por qué puede ser una burbuja y no una buena noticia.</li>
        <li>Cuando alguien te ofrece un negocio que promete que todos ganan, ya sabes mirar quién compra y con qué dinero.</li>
        <li>Entiendes por qué una deuda puede ser más peligrosa que un activo, aunque las dos parezcan igual de atractivas.</li>
        <li>Si baja el valor de tu casa, sabes que tu patrimonio puede quedar por debajo de lo que debes.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>El 28 de octubre de 1929 el índice de las acciones de Estados Unidos bajó casi un 13 %. Si el día anterior había cerrado en 200 puntos, ¿en cuántos puntos quedó, suponiendo que la caída fue exactamente del 13 %?</p>', respuesta: 200 * (1 - 0.13),
        pista: '<p>Si pierde el 13 %, le queda el 87 %.',
        solucion: '<p>200 × 0,87 = <strong>174 puntos</strong>. Esa fue la caída del «lunes negro» (Estados Unidos, 1929), y al día siguiente bajó casi otro 12 %.' },
      { tipo: 'numero', enunciado: '<p>Una casa vale $200 000 y la hipoteca que se pidió por ella es de $210 000. Cuando el valor de la casa baja por debajo de lo que se debe, el hogar tiene patrimonio neto negativo. ¿Cuánto dinero le falta para que su patrimonio neto llegue a cero?</p>', respuesta: 210000 - 200000,
        pista: '<p>Compara lo que vale con lo que se debe.',
        solucion: '<p>210 000 − 200 000 = <strong>$10 000</strong>. Mientras la casa valga menos que la hipoteca, el hogar debe más de lo que tiene, y además gasta menos porque cada mes tiene que atender a la deuda (CORE Econ, capítulo 17).' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es lo que empuja el precio de un activo durante una burbuja?</p>',
        opciones: ['La gente que compra porque espera venderlo más caro', 'El gobierno, que fija el precio cada año', 'Las empresas, que producen más cantidad cada mes'], correcta: 0,
        pista: '<p>Piensa en lo que hace el que compra una vez que el precio ya subió.',
        solucion: '<p>La gente que compra porque espera venderlo más caro. Cada compra empuja el precio, y el precio subir trae más compradores: es el bucle que se ve en el diagrama.' },
      { tipo: 'opciones', enunciado: '<p>Durante la burbuja inmobiliaria, los bancos concedieron más préstamos. ¿Por qué?</p>',
        opciones: ['Porque el gobierno se lo ordenó a todos los bancos', 'Porque el riesgo les parecía menor, ya que esperaban que los precios de la vivienda siguieran subiendo', 'Porque la gente estaba devolviendo los préstamos antes de tiempo'], correcta: 1,
        pista: '<p>¿Qué cambia para el banco cuando espera que el bien que respalda el préstamo se valorice más?',
        solucion: '<p>Porque el <strong>riesgo les parecía menor</strong>: si la casa valía más, el banco recuperaba más dinero aunque el hogar dejara de pagar (CORE Econ, capítulo 17).' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el problema que empieza en los precios y llega a los bancos y al trabajo de la gente?</p>',
        respuestas: ['crisis financiera', 'la crisis financiera', 'crisis economica', 'la crisis economica'],
        pista: '<p>Empieza por la palabra «crisis» y la segunda palabra habla de dinero.',
        solucion: '<p>La <strong>crisis financiera</strong>. Es cuando el problema de los precios llega a los bancos y al trabajo de la gente, y no se queda en las cuentas de quien invirtió.' },
      { tipo: 'ordenar', enunciado: '<p>Ordena lo que pasa en un pueblo donde todos compran las mismas cajas de coleccionables.</p>',
        respuesta: ['Alguien espera que el precio de las cajas siga subiendo', 'Compra cajas y el precio sube un poco más', 'El precio que sube hace que más gente quiera comprar', 'La gente compra y el precio vuelve a subir', 'La caja termina valiendo mucho más de lo que vale en realidad'],
        pista: '<p>Empieza por lo que alguien cree y termina por el resultado de la rueda.',
        solucion: '<p>Alguien espera que el precio siga subiendo, compra y el precio sube un poco más; ese precio hace que más gente quiera comprar; la gente compra y el precio vuelve a subir; y así la caja termina valiendo mucho más de lo que vale en realidad.' },
    ],
    fuentes: [CORE17, FED1929, FED1987, WIKI_BURBUJA],
  });
})();
