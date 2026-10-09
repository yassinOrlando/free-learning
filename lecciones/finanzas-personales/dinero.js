// Finanzas personales · Unidad 1: Tú y el dinero.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Sin consejos personalizados ni productos por su nombre. Tasas, leyes y descuentos van con su país, su año y su fuente.
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('finanzas-personales', titulo, datos);
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
  const FPT = (ruta, nombre) => ({ nombre: `Finanzas para todos (Banco de España y CNMV): ${nombre}`, url: `https://www.finanzasparatodos.es/${ruta}` });
  const CMF = { nombre: 'Comisión para el Mercado Financiero de Chile (CMF Educa): ¿Sabes qué es el dinero?', url: 'https://www.cmfchile.cl/educa/621/w3-article-1117.html' };
  const CONDUSEF = { nombre: 'CONDUSEF (México): Conduguía, Cómo hacer un presupuesto (PDF)', url: 'https://www.gob.mx/cms/uploads/attachment/file/475636/como_hacer_un_presupuesto.pdf' };
  const BANSEFI = { nombre: 'Bansefi, hoy Banco del Bienestar (México): Mi Cartilla Financiera (PDF)', url: 'https://www.gob.mx/cms/uploads/attachment/file/408445/Cartilla_Financiera_GenericaV2.pdf' };
  const FLCFO = { nombre: 'Departamento de Servicios Financieros de Florida (EE. UU.): Hoja de consejos, Necesidades y deseos (PDF)', url: 'https://myfloridacfo.com/docs-sf/librariesprovider6/my-money-tip-sheets-spanish/my-money-tip-sheet-needs-wants_sp_jan_2025.pdf' };
  const ARG = { nombre: 'Argentina.gob.ar, Ministerio de Trabajo: Salario', url: 'https://www.argentina.gob.ar/trabajo/salario' };
  const FPT_TRABAJO = FPT('como-cuidar-tu-entorno-personal-y-financiero-trabajo', '¿Cómo cuidar tu entorno personal y financiero? (Empezar a trabajar)');
  const FPT_PRESUPUESTO = FPT('como-elaborar-un-presupuesto', '¿Cómo elaborar un presupuesto?');

  // ------------------------------------------------------------------
  const CICLO = diagrama([0, 12], [0, 7.2], [
    caja(4, 5, 8, 6.9), txt(6, 6.3, 'tú'), txt(6, 5.5, 'tienes pan'),
    caja(0.3, 0.3, 4.3, 2.2), txt(2.3, 1.6, 'zapatería'), txt(2.3, 0.8, 'tiene zapatos'),
    caja(7.7, 0.3, 11.7, 2.2), txt(9.7, 1.6, 'lechería'), txt(9.7, 0.8, 'tiene leche'),
    ...flecha([4.4, 5], [2.9, 2.45], 0, 1.4), txt(2.4, 3.9, 'quieres zapatos'),
    ...flecha([4.5, 1.25], [7.45, 1.25], 0, 1.4), txt(6, 1.75, 'quiere leche'),
    ...flecha([9.1, 2.45], [7.6, 5], 0, 1.4), txt(9.8, 3.9, 'quiere pan'),
  ], 'Tres cajas unidas por flechas en círculo. Arriba, tú, que tienes pan; una flecha con el rótulo "quieres zapatos" baja a la zapatería, que tiene zapatos. De la zapatería sale una flecha, "quiere leche", hacia la lechería, que tiene leche. De la lechería sale una flecha, "quiere pan", que regresa a ti. Nadie quiere justo lo que tiene la persona a la que le pide algo.');

  L('Qué es el dinero', {
    objetivo: 'Explicar qué problema resuelve el dinero, reconocer sus tres tareas y entender por qué un billete vale aunque sea solo papel.',
    explicacion: `
      <p>Imagina que haces pan y necesitas zapatos. Vas a la zapatería y ofreces diez panes por un par. El problema es que en la zapatería no quieren pan: quieren leche. Y en la lechería, donde sí quieren pan, no tienen zapatos. Los tres tienen algo útil, pero nadie puede cambiar directo con quien necesita.</p>
      ${CICLO}
      <p>En Autosuficiencia, en "Trueque y ayuda mutua", viste que el trueque es cambiar una cosa por otra sin usar dinero. Funciona muy bien entre vecinos, pero tiene una desventaja grande: para que el cambio se haga, cada persona tiene que querer justo lo que la otra ofrece. Si eso no pasa, nadie cambia nada.</p>
      <h3>Lo que resuelve el dinero</h3>
      <p>Ahora imagina que todos aceptan un mismo objeto a cambio de lo que venden. Vendes tu pan a quien lo quiera, recibes ese objeto y con él compras los zapatos. En la zapatería lo aceptan porque saben que con él pueden comprar leche. Ese objeto que todos aceptan es el dinero. La Comisión para el Mercado Financiero de Chile (CMF) lo describe así: es algo, casi siempre billetes y monedas, que una sociedad acepta para pagar bienes, servicios y deudas.</p>
      <h3>Las tres tareas del dinero</h3>
      <p>El dinero hace tres trabajos a la vez. Conviene distinguirlos, porque cada uno se nota en un momento distinto de tu día:</p>
      <ul>
        <li>Es un <strong>medio de cambio</strong>, es decir, sirve para pagar. Das dinero y recibes comida, un pasaje de autobús o un corte de pelo, sin buscar a alguien que quiera tus cosas.</li>
        <li>Es una <strong>unidad de cuenta</strong>, es decir, sirve para medir cuánto vale algo. Como todo tiene precio en la misma moneda, comparas en un segundo un kilo de arroz con uno de frijol, igual que usas el metro para comparar distancias.</li>
        <li>Es un <strong>depósito de valor</strong>, es decir, sirve para guardar. Lo que ganas hoy lo puedes usar el mes que viene. El pan, en cambio, se pone duro en dos días.</li>
      </ul>
      <p>Fíjate en la segunda tarea. Sin dinero, cada cosa tendría muchos "precios": los zapatos valdrían tantos panes, tantos litros de leche, tantos huevos. Con una sola medida, cada cosa tiene un solo número y comparar es fácil.</p>
      <h3>¿Por qué vale un billete?</h3>
      <p>Un billete es un pedazo de papel o de plástico, y el dinero de una cuenta del banco ni siquiera se puede tocar: es un número guardado en una computadora. Entonces, ¿por qué sirve? Porque la gente confía en que otros lo van a aceptar. Casi todo el dinero que se usa hoy en el mundo funciona así: no lo respalda el oro, sino la confianza de quienes lo usan. Por eso los bancos centrales, entre otras tareas, cuidan que los precios no se disparen y que la gente siga confiando en su moneda.</p>
      <p>Cuando los precios suben mucho y muy rápido, el dinero guardado compra cada vez menos, y falla como depósito de valor. Lo verás con calma en la unidad Interés e inflación.</p>
      <p>El dinero toma varias formas: monedas, billetes, el dinero de una cuenta o el que pagas con una tarjeta o con el teléfono. Todas hacen las mismas tres tareas.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir el dinero con la riqueza. El dinero es una herramienta para conseguir cosas. Lo que te permite vivir bien también incluye lo que sabes hacer, tu salud, tu casa y las personas con las que cuentas.</p>`,
    ejemplo: `
      <p>En un mercado sin dinero, un par de zapatos se cambia por 12 panes y un litro de leche por 2 panes. ¿Cuántos litros de leche vale un par de zapatos?</p>
      <ol class="pasos-ej">
        <li>Usa el pan como medida común, porque los dos cambios están dichos en panes. Así el pan hace el papel de unidad de cuenta.</li>
        <li>Los zapatos valen 12 panes y cada litro de leche cuesta 2 panes. Para saber cuántos litros caben en 12 panes, divide: 12 ÷ 2 = 6.</li>
        <li>Comprueba al revés: 6 litros a 2 panes cada uno son 6 × 2 = 12 panes, lo mismo que los zapatos.</li>
        <li>Ahora míralo con dinero. Si cada pan cuesta $5, los zapatos cuestan 12 × 5 = $60 y la leche 2 × 5 = $10. Comparar es directo: 60 ÷ 10 = 6 litros.</li>
      </ol>
      <p>Resultado: <span class="resultado">un par de zapatos vale 6 litros de leche</span>.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar 12 × 2 = 24. Pregúntate: si cada litro cuesta 2 panes, ¿con 12 panes te alcanza para más litros o para menos?</p>`,
    vidaReal: `
      <p>Entender para qué sirve el dinero te ayuda a usarlo mejor cada día:</p>
      <ul>
        <li>En el mercado, los precios te permiten comparar en un momento qué te conviene más.</li>
        <li>Al guardar una parte de lo que ganas, puedes usarla el mes que viene o en una emergencia.</li>
        <li>Cuando pagas con tarjeta o con el teléfono, sabes que sigue siendo dinero, aunque no lo veas.</li>
        <li>Cuando en las noticias dicen que una moneda pierde valor, entiendes qué es lo que se pierde.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En un mercado sin dinero, una gallina se cambia por 30 huevos y un kilo de queso por 10 huevos. ¿Cuántos kilos de queso vale una gallina?</p>', respuesta: 30 / 10,
        pista: '<p>Usa los huevos como medida común: ¿cuántas veces caben 10 huevos en 30?</p>',
        solucion: '<p>La gallina vale 30 huevos y cada kilo de queso vale 10, así que 30 ÷ 10 = <strong>3 kilos</strong>. Los huevos hacen el papel de unidad de cuenta.</p>' },
      { tipo: 'numero', enunciado: '<p>Unos zapatos cuestan $360 y un litro de leche cuesta $24 (precios de ejemplo). ¿A cuántos litros de leche equivalen los zapatos?</p>', respuesta: 360 / 24,
        pista: '<p>Como los dos precios están en la misma moneda, divide el precio de los zapatos entre el de la leche.</p>',
        solucion: '<p>360 ÷ 24 = <strong>15 litros</strong>. Con precios en una sola moneda, comparar dos cosas distintas es una sola división.</p>' },
      { tipo: 'opciones', enunciado: '<p>En la tienda ves que el kilo de arroz cuesta $30 y el de avena $45, y eliges el arroz porque es más barato. ¿Qué tarea del dinero usaste al comparar?</p>',
        opciones: ['Medio de cambio', 'Unidad de cuenta', 'Depósito de valor'], correcta: 1,
        pista: '<p>No pagaste ni guardaste nada: solo mediste cuánto vale cada cosa.</p>',
        solucion: '<p><strong>Unidad de cuenta.</strong> Comparaste dos precios dichos en la misma moneda, como quien compara dos distancias en metros.</p>' },
      { tipo: 'opciones', enunciado: '<p>Cada quincena guardas una parte de tu pago para usarla en diciembre. ¿Qué tarea del dinero aprovechas?</p>',
        opciones: ['Medio de cambio', 'Unidad de cuenta', 'Depósito de valor'], correcta: 2,
        pista: '<p>Piensa en lo que pasaría si guardaras pan en lugar de dinero.</p>',
        solucion: '<p><strong>Depósito de valor.</strong> El dinero te deja guardar hoy lo que ganaste para usarlo después, algo que no podrías hacer con pan.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué un billete sirve para pagar, aunque sea solo un pedazo de papel o de plástico?</p>',
        opciones: ['Porque la gente confía en que otros lo van a aceptar', 'Porque el papel con que se hace es muy caro', 'Porque cada billete se puede cambiar por oro en el banco'], correcta: 0,
        pista: '<p>Recuerda qué respalda a casi todo el dinero que se usa hoy.</p>',
        solucion: '<p><strong>Porque la gente confía en que otros lo van a aceptar.</strong> Casi todo el dinero de hoy no lo respalda el oro, sino la confianza de quienes lo usan.</p>' },
      { tipo: 'texto', enunciado: '<p>En el trueque, cada persona tiene que querer justo lo que la otra ofrece. ¿Cómo se llama la tarea del dinero que evita ese problema, porque sirve para pagar?</p>',
        respuestas: ['medio de cambio', 'un medio de cambio', 'el medio de cambio', 'medio de intercambio', 'medio de pago'],
        pista: '<p>Son tres palabras y la última es "cambio".</p>',
        solucion: '<p>Es un <strong>medio de cambio</strong>: vendes a quien quiera lo tuyo y compras a quien tenga lo que buscas.</p>' },
    ],
    fuentes: [CMF, WIKI('Dinero', 'Dinero'), WIKI('Trueque', 'Trueque')],
  });

  // ------------------------------------------------------------------
  const FLUJO = diagrama([0, 12], [0, 6], [
    caja(4.5, 1.6, 7.5, 3.8, true), txt(6, 3, 'tu dinero'), txt(6, 2.3, 'del mes'),
    txt(1.6, 5.4, 'ingresos'), txt(10.4, 5.4, 'gastos'),
    txt(1.6, 4.1, 'sueldo'), ...flecha([1.6, 3.7], [4.35, 3.2], 0, 1.3),
    txt(1.6, 1.0, 'propinas'), ...flecha([1.6, 1.4], [4.35, 2.2], 0, 1.3),
    ...flecha([7.65, 3.4], [9.6, 4.1], 0, 1.3), txt(10.8, 4.3, 'renta'),
    ...flecha([7.65, 2.7], [9.6, 2.7], 0, 1.3), txt(10.8, 2.7, 'comida'),
    ...flecha([7.65, 2], [9.6, 1.3], 0, 1.3), txt(10.8, 1.0, 'transporte'),
  ], 'En el centro, una caja sombreada que dice "tu dinero del mes". A la izquierda, bajo el título "ingresos", dos flechas entran a la caja: una desde "sueldo" y otra desde "propinas". A la derecha, bajo el título "gastos", tres flechas salen de la caja hacia "renta", "comida" y "transporte".');

  L('Ingresos y gastos', {
    objetivo: 'Distinguir ingresos y gastos fijos y variables, repartir los gastos que no llegan cada mes y calcular tu saldo.',
    explicacion: `
      <p>Faltan cuatro días para el próximo pago y ya no tienes dinero. Lo peor es que no sabes bien en qué se fue. La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, usa esta escena para explicar algo muy simple: para que el dinero alcance, primero hay que saber cuánto entra y cuánto sale.</p>
      ${FLUJO}
      <h3>Lo que entra</h3>
      <p>Todo el dinero que recibes es un <strong>ingreso</strong>. El más común es el sueldo, pero no el único: también cuentan una pensión, lo que ganas al vender algo, las propinas, un trabajo extra o lo que te paga el banco por tus ahorros. Finanzas para todos, el sitio de educación financiera del Banco de España y la CNMV, recomienda anotarlos todos en una lista.</p>
      <p>Los ingresos pueden ser de dos clases. Los fijos llegan con regularidad y por la misma cantidad, como un sueldo o una pensión. Los variables cambian de un mes a otro, como las propinas, las comisiones de un vendedor o las ventas de un pequeño negocio. Si tus ingresos son variables, conviene sacar el promedio de varios meses, como viste en Matemáticas en "Media, mediana y moda", en lugar de contar con el mes más alto.</p>
      <h3>Lo que sale</h3>
      <p>Todo el dinero que pagas es un <strong>gasto</strong>. También hay dos clases. Los gastos fijos se repiten cada mes y casi no cambian, como la renta, el transporte al trabajo o el pago de una deuda. Los variables cambian según tus gustos y lo que pase en el mes, como la ropa, las comidas fuera de casa o una emergencia.</p>
      <p>Fíjate en los gastos que no llegan cada mes. En algunos lugares la luz o el agua se pagan cada dos meses, y hay gastos de una vez al año, como los útiles escolares o los regalos de fin de año. Para que no te tomen por sorpresa, repártelos: si la luz cuesta $400 cada dos meses, cuenta $200 en cada mes. En Física, en "Potencia eléctrica y cómo leer tu recibo de luz", viste cómo calcular cuánto vas a pagar.</p>
      <p>Anota también los gastos pequeños, como un café, un refresco o un chicle. Uno solo no se nota, pero juntos pesan. Es la misma idea del inventario que viste en Autosuficiencia, en "Empezar poco a poco: autosuficiencia en la ciudad y en el campo": para mejorar algo, primero hay que medirlo.</p>
      <h3>La resta que lo dice todo</h3>
      <p>Cuando tengas las dos listas, suma cada una y resta lo que sale de lo que entra. A ese resultado se le llama <strong>saldo</strong>.</p>
      <p><strong>saldo = ingresos − gastos</strong></p>
      <p>Se lee "el saldo es lo que entra menos lo que sale". La CONDUSEF distingue tres casos:</p>
      <ul>
        <li>Si el saldo es positivo, te sobra dinero. Es lo ideal, porque puedes ahorrar o enfrentar un imprevisto.</li>
        <li>Si es cero, quedas justo. No está mal, pero cualquier gasto inesperado te desbalancea.</li>
        <li>Si es negativo, gastas más de lo que ganas y tienes que pedir prestada la diferencia. Como viste en "Números enteros: los negativos", ese número negativo es lo que te falta.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> olvidar los gastos que no llegan cada mes. Si en el mes sin recibo de luz crees que te sobra dinero y te lo gastas, al mes siguiente te faltará.</p>`,
    ejemplo: `
      <p>En un mes recibes $9 000 de sueldo y unos $1 000 de propinas. Pagas $3 500 de renta, $3 000 de comida y $1 200 de transporte, y la luz, que llega cada dos meses, cuesta $600. Las cifras son de ejemplo. ¿Cuál es tu saldo del mes?</p>
      <ol class="pasos-ej">
        <li>Suma los ingresos: 9 000 + 1 000 = $10 000.</li>
        <li>Reparte la luz entre los dos meses que cubre, para que cada mes cargue su parte: 600 ÷ 2 = $300.</li>
        <li>Suma los gastos del mes: 3 500 + 3 000 + 1 200 + 300 = $8 000.</li>
        <li>Resta lo que sale de lo que entra: 10 000 − 8 000 = $2 000. El saldo es positivo, así que te sobra dinero.</li>
        <li>Comprueba al revés: lo que gastas más lo que te sobra debe dar lo que entra, y 8 000 + 2 000 = 10 000.</li>
      </ol>
      <p>Resultado: <span class="resultado">tu saldo es de $2 000</span>.</p>
      <p class="nota"><strong>Error común:</strong> restar los $600 completos de la luz en un solo mes. Así ese mes parece peor de lo que es, y el siguiente parece que sobra más de lo real.</p>`,
    vidaReal: `
      <p>Saber cuánto dinero te llega y cuánto pagas te da calma y te evita sorpresas:</p>
      <ul>
        <li>No te comprometes a pagos mensuales que no puedes cubrir.</li>
        <li>Al anotar las compras pequeñas, descubres en qué se te va el dinero sin darte cuenta.</li>
        <li>Si lo que ganas cambia de un mes a otro, puedes planear con un número realista.</li>
        <li>Si al final del mes te sobra algo, puedes empezar a guardarlo para un imprevisto.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Este mes entran $12 000 y gastas $10 500. ¿Cuál es tu saldo?</p>', respuesta: 12000 - 10500,
        pista: '<p>El saldo es lo que entra menos lo que sale.</p>',
        solucion: '<p>12 000 − 10 500 = <strong>$1 500</strong>. Es positivo, así que te sobra dinero para ahorrar o para un imprevisto.</p>' },
      { tipo: 'numero', enunciado: '<p>El recibo del agua te llega cada dos meses por $350. ¿Cuánto debes contar en tus gastos de cada mes?</p>', respuesta: 350 / 2,
        pista: '<p>El recibo cubre dos meses: reparte el pago entre los dos.</p>',
        solucion: '<p>350 ÷ 2 = <strong>$175</strong> al mes. Así cada mes carga su parte y el mes del recibo no te toma por sorpresa.</p>' },
      { tipo: 'numero', enunciado: '<p>En los últimos tres meses recibiste $1 200, $800 y $1 000 de propinas. ¿Cuál es el promedio al mes?</p>', respuesta: (1200 + 800 + 1000) / 3,
        pista: '<p>Suma las tres cantidades y divide entre el número de meses.</p>',
        solucion: '<p>1 200 + 800 + 1 000 = 3 000, y 3 000 ÷ 3 = <strong>$1 000</strong>. Es más prudente planear con este número que con el mes de $1 200.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos es un gasto variable?</p>',
        opciones: ['La renta de tu casa', 'El pago mensual de un préstamo', 'Una comida fuera de casa con tus amistades'], correcta: 2,
        pista: '<p>Busca el gasto que cambia según tus gustos y lo que pase en el mes.</p>',
        solucion: '<p><strong>La comida fuera de casa.</strong> Depende de lo que decidas cada mes. La renta y el pago del préstamo se repiten por la misma cantidad: son fijos.</p>' },
      { tipo: 'opciones', enunciado: '<p>Ganas $8 000 al mes y gastas $8 600. ¿Qué te dice tu saldo?</p>',
        opciones: ['Que te sobran $600 para ahorrar', 'Que te faltan $600 y tendrías que pedirlos prestados', 'Que quedas justo, sin que te sobre ni te falte'], correcta: 1,
        pista: '<p>Calcula 8 000 − 8 600 y fíjate en el signo del resultado.</p>',
        solucion: '<p>8 000 − 8 600 = −600. El saldo es negativo: <strong>te faltan $600</strong>, y esa diferencia tendrías que pedirla prestada o recortarla de tus gastos.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el resultado de restar tus gastos a tus ingresos?</p>',
        respuestas: ['saldo', 'el saldo', 'un saldo', 'balance', 'el balance'],
        pista: '<p>Es una palabra de cinco letras que dice si te sobra, te falta o quedas justo.</p>',
        solucion: '<p>El <strong>saldo</strong>: lo que entra menos lo que sale.</p>' },
    ],
    fuentes: [CONDUSEF, FPT_PRESUPUESTO],
  });

  // ------------------------------------------------------------------
  const DECIDIR = diagrama([0, 12], [0, 7.6], [
    caja(2.6, 5.6, 9.4, 7.3), txt(6, 6.75, '¿lo necesitas para vivir'), txt(6, 6.05, 'sano y seguro?'),
    ...flecha([4, 5.6], [2.6, 4.25], 0, 1.4), txt(2.7, 5.1, 'sí'),
    ...flecha([8, 5.6], [9.4, 4.25], 0, 1.4), txt(9.3, 5.1, 'no'),
    caja(0.3, 3, 4.9, 4.2), txt(2.6, 3.6, 'necesidad'),
    caja(7.1, 3, 11.7, 4.2), txt(9.4, 3.6, 'deseo'),
    ...flecha([2.6, 3], [2.6, 2.05], 0, 1.4), ...flecha([9.4, 3], [9.4, 2.05], 0, 1.4),
    caja(0.3, 0.2, 4.9, 1.9), txt(2.6, 1.35, 'cúbrela primero,'), txt(2.6, 0.65, 'sin gastar de más'),
    caja(7.1, 0.2, 11.7, 1.9), txt(9.4, 1.35, 'si cabe, cómpralo;'), txt(9.4, 0.65, 'si no, ahorra'),
  ], 'Un diagrama de decisión. Arriba, la pregunta "¿lo necesitas para vivir sano y seguro?". Si la respuesta es sí, una flecha lleva a la caja "necesidad" y de ahí a "cúbrela primero, sin gastar de más". Si es no, otra flecha lleva a la caja "deseo" y de ahí a "si cabe, cómpralo; si no, ahorra".');

  L('Necesidades y deseos', {
    objetivo: 'Distinguir una necesidad de un deseo, separar la parte de deseo que trae una compra y medir el costo de oportunidad de un gasto.',
    explicacion: `
      <p>Antes de ir al mercado escribes tu lista: arroz, huevos, jabón, un champú nuevo que viste en un anuncio y unas galletas. Todo parece necesario. Pero si te faltara dinero, ¿qué dejarías fuera primero? Saber responder esa pregunta es la base para que el dinero te alcance.</p>
      <h3>Lo que necesitas y lo que te gustaría</h3>
      <p>Una <strong>necesidad</strong> es algo que tienes que tener para vivir sano y seguro, como la comida, el agua o un lugar donde vivir. Así lo define la hoja de consejos del Departamento de Servicios Financieros de Florida, en Estados Unidos. Por la misma razón, la ropa básica y las medicinas también cuentan como necesidades. En Autosuficiencia, en "Necesidades básicas: agua, comida, refugio y energía", viste las más urgentes.</p>
      <p>Un <strong>deseo</strong> es algo que te gustaría tener, pero sin lo cual puedes vivir bien: un videojuego, una salida al cine, un teléfono más nuevo. Los deseos no son malos. Hacen la vida más agradable y está bien darse gustos. Lo importante es el orden: primero se cubren las necesidades y después, con lo que sobra, los deseos.</p>
      ${DECIDIR}
      <h3>Una misma compra puede tener las dos partes</h3>
      <p>Fíjate en los zapatos. Tener zapatos es una necesidad. Pero si unos sencillos cuestan $500 y unos de marca cuestan $1 200, los $500 cubren la necesidad y los $700 de diferencia pagan un deseo: la marca, el color, la moda. Con la comida pasa igual: comer es una necesidad, y comer en un restaurante es una necesidad más un gusto.</p>
      <p>Esto no quiere decir que debas comprar siempre lo más barato. Quiere decir que sepas cuánto de lo que pagas es necesidad y cuánto es gusto, para decidir con los ojos abiertos.</p>
      <h3>Todo lo que eliges deja algo fuera</h3>
      <p>El dinero no alcanza para todo. Si gastas $200 en algo, esos $200 ya no están para otra cosa. Lo que dejas de tener por elegir otra cosa se llama <strong>costo de oportunidad</strong>. La CONDUSEF lo resume así: al elegir una opción renuncias a otras, porque no se puede tener todo al mismo tiempo.</p>
      <p>Una forma práctica de verlo es medir un gasto con algo que te importa. Si una pizza cuesta $180 y tu pasaje diario cuesta $18, la pizza equivale a 180 ÷ 18 = 10 días de pasaje. No significa que no la compres, sino que sepas lo que cambias por ella.</p>
      <h3>Preguntas antes de comprar</h3>
      <p>Guías oficiales de México y de Florida coinciden en hacerte unas preguntas antes de pagar:</p>
      <ul>
        <li>¿Lo necesito o lo deseo?</li>
        <li>¿Lo necesito ahora, o puedo ahorrar y comprarlo después?</li>
        <li>¿Me alcanza el dinero que tengo?</li>
        <li>¿Hay otro más barato que me sirva igual?</li>
      </ul>
      <p>Y cuando hay que recortar, Finanzas para todos, del Banco de España y la CNMV, aconseja empezar por los gastos que no son imprescindibles, porque se pueden reducir o quitar sin poner en riesgo lo esencial.</p>
      <p class="nota"><strong>Trampa común:</strong> llamar necesidad a una costumbre. El café que compras cada mañana en la calle se siente necesario porque lo haces siempre, pero lo necesario es desayunar; comprarlo fuera es un gusto. Pregúntate qué pasaría si un día no lo compras.</p>`,
    ejemplo: `
      <p>Te quedan $500 para la semana. Tu lista: arroz y frijol, $90; huevos, $60; jabón, $35; pasajes, $150; unas galletas, $40, y una película en el cine, $120. Los precios son de ejemplo. ¿Qué compras primero y cuánto te queda para los deseos?</p>
      <ol class="pasos-ej">
        <li>Separa la lista con la primera pregunta: ¿lo necesito para vivir sano y seguro? El arroz y el frijol, los huevos, el jabón y los pasajes son necesidades. Las galletas y el cine son deseos.</li>
        <li>Suma las necesidades, porque van primero: 90 + 60 + 35 + 150 = $335.</li>
        <li>Resta del dinero que tienes: 500 − 335 = $165. Eso es lo que queda para los deseos.</li>
        <li>Los dos deseos juntos cuestan 40 + 120 = $160, y caben en $165. Si no cupieran, elegirías uno, y el otro sería tu costo de oportunidad.</li>
        <li>Comprueba: 335 + 160 = 495, que es menos que 500. Te sobran $5.</li>
      </ol>
      <p>Resultado: <span class="resultado">cubres las necesidades con $335 y te quedan $165 para los deseos</span>.</p>
      <p class="nota"><strong>Error común:</strong> comprar primero los deseos porque se te antojan o porque son baratos, y descubrir al final que ya no alcanza para los pasajes.</p>`,
    vidaReal: `
      <p>Separar lo que te hace falta de lo que se te antoja te ayuda todos los días:</p>
      <ul>
        <li>En el supermercado, no te sales de lo que llevas aunque haya ofertas por todas partes.</li>
        <li>Antes de una compra grande, preguntarte si puede esperar te da tiempo de ahorrar o de encontrar algo más barato.</li>
        <li>Si un mes ganas menos, sabes qué recortar primero sin dejar de comer ni de pagar la renta.</li>
        <li>Darte un gusto sin culpa es más fácil cuando ya cubriste lo importante.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas compras es una necesidad?</p>',
        opciones: ['Una consola de videojuegos', 'Las medicinas que te recetó tu médico', 'Una suscripción para ver películas'], correcta: 1,
        pista: '<p>¿Sin cuál de las tres pondrías en riesgo tu salud?</p>',
        solucion: '<p><strong>Las medicinas recetadas.</strong> Las necesitas para estar sano. La consola y las películas son deseos: agradables, pero puedes vivir bien sin ellos.</p>' },
      { tipo: 'numero', enunciado: '<p>Unos tenis de marca cuestan $1 200 y unos sencillos que te sirven igual cuestan $450. ¿Cuánto de lo que pagas por los de marca es deseo?</p>', respuesta: 1200 - 450,
        pista: '<p>Los tenis sencillos ya cubren la necesidad. ¿Cuánto pagas de más?</p>',
        solucion: '<p>1 200 − 450 = <strong>$750</strong>. Esa es la parte que pagas por la marca y no por tener zapatos.</p>' },
      { tipo: 'numero', enunciado: '<p>Un helado cuesta $45 y un kilo de frijol $30 (precios de ejemplo). Si compras 2 helados, ¿cuántos kilos de frijol dejas de comprar con ese dinero?</p>', respuesta: 2 * 45 / 30,
        pista: '<p>Calcula primero cuánto cuestan los dos helados y luego cuántos kilos de frijol caben en esa cantidad.</p>',
        solucion: '<p>Dos helados cuestan 2 × 45 = $90, y 90 ÷ 30 = <strong>3 kilos</strong> de frijol. Ese es su costo de oportunidad medido en frijol.</p>' },
      { tipo: 'opciones', enunciado: '<p>Este mes te pagaron menos de lo normal. ¿Qué gasto conviene recortar primero?</p>',
        opciones: ['El pasaje para ir al trabajo', 'La renta de tu casa', 'Las salidas a comer los fines de semana'], correcta: 2,
        pista: '<p>Busca el gasto que puedes quitar sin poner en riesgo lo esencial.</p>',
        solucion: '<p><strong>Las salidas a comer.</strong> Son un gusto que puedes reducir. Sin pasaje no llegas al trabajo, y sin renta pones en riesgo tu casa.</p>' },
      { tipo: 'opciones', enunciado: '<p>Con $300 puedes comprar unos audífonos o pagar la mitad de un curso que quieres tomar. Si eliges los audífonos, ¿cuál es tu costo de oportunidad?</p>',
        opciones: ['La mitad del curso que dejas de pagar', 'Los $300 que pagas por los audífonos', 'Nada, porque los audífonos te gustan'], correcta: 0,
        pista: '<p>El costo de oportunidad no es lo que pagas, sino lo que dejas de tener.</p>',
        solucion: '<p><strong>La mitad del curso.</strong> Es lo que dejas fuera al elegir los audífonos. Los $300 son el precio, no el costo de oportunidad.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama lo que dejas de tener cuando eliges gastar tu dinero en otra cosa?</p>',
        respuestas: ['costo de oportunidad', 'el costo de oportunidad', 'coste de oportunidad', 'el coste de oportunidad'],
        pista: '<p>Son tres palabras: empieza con "costo" y termina con "oportunidad".</p>',
        solucion: '<p>El <strong>costo de oportunidad</strong>: lo que cambias por lo que elegiste.</p>' },
    ],
    fuentes: [FLCFO, CONDUSEF, BANSEFI, FPT_PRESUPUESTO],
  });

  // ------------------------------------------------------------------
  const X0 = 0.5, X1 = 11.5, CORTE = X0 + (X1 - X0) * 0.83;
  const BARRA = diagrama([0, 12], [0, 4.4], [
    { tipo: 'linea', desde: [X0, 3.3], hasta: [X1, 3.3] },
    { tipo: 'linea', desde: [X0, 3.05], hasta: [X0, 3.55] }, { tipo: 'linea', desde: [X1, 3.05], hasta: [X1, 3.55] },
    txt(6, 3.9, 'sueldo bruto: 100%'),
    caja(X0, 1.6, CORTE, 2.7), caja(CORTE, 1.6, X1, 2.7, true),
    txt((X0 + CORTE) / 2, 2.15, 'sueldo neto: 83%'),
    txt((CORTE + X1) / 2, 1.05, 'deducciones'), txt((CORTE + X1) / 2, 0.4, '17%'),
  ], 'Una barra horizontal que representa el sueldo bruto, el 100%. Está partida en dos tramos: el de la izquierda, más largo, es el sueldo neto, el 83%; el de la derecha, corto y sombreado, son las deducciones, el 17%.');

  L('Cómo leer tu recibo de sueldo', {
    objetivo: 'Reconocer las partes de un recibo de sueldo, distinguir el sueldo bruto del neto y calcular el neto a partir de las deducciones.',
    explicacion: `
      <p>Te dijeron que tu sueldo sería de $10 000 al mes, pero el día de pago llegan a tu cuenta unos $8 300 (cifras de ejemplo). ¿Se equivocaron? Casi nunca. Finanzas para todos, del Banco de España y la CNMV, cuenta que a muchos jóvenes les pasa con su primer sueldo: cobran menos de lo que esperaban porque no conocían la diferencia entre dos números. El documento que la explica es el recibo de sueldo.</p>
      <p>El recibo de sueldo es el papel o el archivo que te entrega tu empleador cada vez que te paga. Según el país se llama nómina, recibo de nómina o recibo de haberes, pero dice casi lo mismo en todas partes. Es la prueba de cuánto ganaste y de lo que se pagó por ti, así que conviene revisarlo y guardarlo.</p>
      <h3>Las partes del recibo</h3>
      <p>No hay un solo formato. La ley de Argentina, por ejemplo, pide que el recibo diga como mínimo lo siguiente, y los de otros países traen algo parecido:</p>
      <ul>
        <li>Los datos de quien paga y de quien trabaja, con su número de identificación, el puesto y la fecha de ingreso.</li>
        <li>El periodo que se paga y la fecha en que se paga.</li>
        <li>Todo lo que ganaste, separado por concepto: el sueldo base, las horas extra, las comisiones o los premios.</li>
        <li>Todo lo que te descuentan, también separado por concepto.</li>
        <li>Lo que recibes al final, escrito en números y en letras.</li>
      </ul>
      <h3>Bruto, deducciones y neto</h3>
      <p>El <strong>sueldo bruto</strong> es lo que acordaste con tu empleador, antes de quitarle nada. Es el número que suele aparecer en una oferta de trabajo. Las <strong>deducciones</strong> son las cantidades que se descuentan del bruto, por ley o porque tú lo autorizaste: casi siempre, impuestos y lo que pagas para tu salud y tu jubilación. Lo que queda es el <strong>sueldo neto</strong>, el dinero que de verdad llega a tu bolsillo.</p>
      <p><strong>sueldo neto = sueldo bruto − deducciones</strong></p>
      <p>Se lee "lo que recibes es lo acordado menos lo que te descuentan".</p>
      ${BARRA}
      <p>Las deducciones cambian mucho de un país a otro y con el tiempo. Por ejemplo, según la página del Ministerio de Trabajo de Argentina consultada en 2026, a quien trabaja se le descuenta el 11% para su jubilación, el 3% para su obra social, que es su seguro de salud, y el 3% para el PAMI, el instituto que atiende la salud de las personas jubiladas y pensionadas: el 17% del bruto en total. En España, Finanzas para todos explica que se descuenta lo que pagas a la Seguridad Social y un adelanto del impuesto sobre la renta (IRPF). Revisa el dato vigente en tu país. Como viste en "Porcentajes", si te descuentan el 17%, recibes el 83%.</p>
      <h3>Pagos extra en el año</h3>
      <p>En varios países hay pagos extra. En Argentina se llama aguinaldo o sueldo anual complementario: se paga en dos partes, en junio y en diciembre, y cada una es la mitad del sueldo mensual más alto de ese semestre. En España, muchos sueldos se reparten en 14 pagas al año en lugar de 12. Por eso Finanzas para todos aclara que 21 000 € brutos al año son 1 750 € al mes en 12 pagas, pero 1 500 € al mes en 14.</p>
      <h3>Qué revisar cada vez</h3>
      <p>Comprueba que el neto del recibo coincide con lo que llegó a tu cuenta, que el periodo es el correcto y que no hay descuentos que no reconoces. Si algo no cuadra, pregunta primero en tu trabajo, y si no te dan una respuesta clara, busca la oficina de trabajo de tu país.</p>
      <p class="nota"><strong>Trampa común:</strong> comparar dos ofertas de trabajo mezclando bruto y neto. Una que paga $10 000 brutos puede dejarte menos que otra que paga $9 000 netos. Compara siempre el mismo tipo de número.</p>`,
    ejemplo: `
      <p>En Argentina, una persona tiene un sueldo bruto de $800 000 al mes (cifra de ejemplo). Si solo tiene los descuentos de 11%, 3% y 3%, ¿cuál es su sueldo neto?</p>
      <ol class="pasos-ej">
        <li>Primero suma los porcentajes, porque todos se calculan sobre el mismo bruto: 11 + 3 + 3 = 17%.</li>
        <li>Calcula las deducciones: el 17% de 800 000 es 0.17 × 800 000 = $136 000.</li>
        <li>Resta las deducciones del bruto: 800 000 − 136 000 = $664 000. Ese es el neto.</li>
        <li>Comprueba por otro camino: si te descuentan el 17%, recibes el 83%, y 0.83 × 800 000 = $664 000. Las dos formas coinciden.</li>
      </ol>
      <p>Resultado: <span class="resultado">$664 000 netos al mes</span>.</p>
      <p class="nota"><strong>Error común:</strong> calcular cada descuento sobre lo que quedó después del anterior. Todos se calculan sobre el bruto; por eso se pueden sumar los porcentajes.</p>`,
    vidaReal: `
      <p>Leer bien tu recibo te sirve más de lo que parece:</p>
      <ul>
        <li>Al comparar dos ofertas de trabajo, sabes cuál te deja más dinero de verdad.</li>
        <li>Al planear tus gastos del mes, usas lo que llega a tu cuenta y no lo que dice el contrato.</li>
        <li>Si un mes te pagan menos, el recibo te dice por qué, y puedes reclamar si hay un error.</li>
        <li>Tus recibos guardados prueban cuánto ganas, por ejemplo cuando quieres rentar una casa.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tu sueldo bruto es de $10 000 y tus deducciones suman $1 700. ¿Cuál es tu sueldo neto?</p>', respuesta: 10000 - 1700,
        pista: '<p>El neto es el bruto menos las deducciones.</p>',
        solucion: '<p>10 000 − 1 700 = <strong>$8 300</strong>. Es lo que de verdad llega a tu cuenta.</p>' },
      { tipo: 'numero', enunciado: '<p>En Argentina, con descuentos de 11%, 3% y 3% y ningún otro, ¿cuál es el neto de un sueldo bruto de $600 000?</p>', respuesta: 600000 * (1 - 0.17),
        pista: '<p>Suma los porcentajes. Si te descuentan ese total, ¿qué porcentaje del bruto recibes?</p>',
        solucion: '<p>Los descuentos suman 17%, así que recibes el 83%: 0.83 × 600 000 = <strong>$498 000</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En España, tu contrato dice 28 000 € brutos al año en 14 pagas. ¿Cuánto es cada paga bruta, en euros?</p>', respuesta: 28000 / 14,
        pista: '<p>Reparte el sueldo del año entre el número de pagas, no entre los 12 meses.</p>',
        solucion: '<p>28 000 ÷ 14 = <strong>2 000 €</strong> por paga. Si fueran 12 pagas, cada una sería mayor, unos 2 333 €.</p>' },
      { tipo: 'numero', enunciado: '<p>En Argentina, tu sueldo mensual más alto del primer semestre fue de $900 000. ¿De cuánto es la parte del aguinaldo que se paga en junio?</p>', respuesta: 900000 / 2,
        pista: '<p>Cada parte del aguinaldo es la mitad del sueldo mensual más alto del semestre.</p>',
        solucion: '<p>La mitad de 900 000 es <strong>$450 000</strong>. En diciembre se repite el cálculo con el sueldo más alto del segundo semestre.</p>' },
      { tipo: 'opciones', enunciado: '<p>El neto de tu recibo dice $8 300, pero a tu cuenta llegaron $8 000. ¿Qué haces primero?</p>',
        opciones: ['Nada, porque las diferencias pequeñas son normales', 'Pides un préstamo para cubrir los $300', 'Revisas el recibo y preguntas en tu trabajo por la diferencia'], correcta: 2,
        pista: '<p>El neto del recibo y el depósito deben coincidir.</p>',
        solucion: '<p><strong>Revisas el recibo y preguntas en tu trabajo.</strong> Si el neto y el depósito no coinciden, puede haber un error, y conviene saber por qué.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el sueldo que de verdad llega a tu bolsillo, después de las deducciones?</p>',
        respuestas: ['sueldo neto', 'el sueldo neto', 'neto', 'el neto', 'salario neto', 'el salario neto', 'sueldo líquido', 'líquido', 'sueldo liquido', 'liquido'],
        pista: '<p>Es lo contrario del sueldo bruto.</p>',
        solucion: '<p>El <strong>sueldo neto</strong>: el bruto menos las deducciones.</p>' },
    ],
    fuentes: [FPT_TRABAJO, ARG, WIKI('Nómina', 'Nómina'), WIKI('PAMI', 'PAMI')],
  });
})();
