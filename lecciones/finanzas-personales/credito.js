// Finanzas personales · Unidad 5: Crédito.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Sin consejos personalizados ni productos, bancos o empresas por su nombre. Tasas, leyes y estadísticas van con su país, su año y su fuente.
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

  const REV = (ruta, nombre) => ({ nombre: `CONDUSEF (México), Revista Proteja su Dinero: ${nombre}`, url: `https://revista.condusef.gob.mx/${ruta}/` });
  const BDE = (ruta, nombre) => ({ nombre: `Banco de España, Portal del Cliente Bancario: ${nombre}`, url: `https://clientebancario.bde.es/pcb/es/menu-horizontal/${ruta}` });
  const REV_MINIMO = REV('usuario-inteligente/ponlo-en-la-balanza/2026/02/pago-minimo-la-opcion-mas-cara-de-tu-tarjeta', 'Pago mínimo, la opción más cara de tu tarjeta');
  const REV_MINIMO_PDF = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: tabla de pagos mínimos, febrero de 2026 (PDF)', url: 'https://revista.condusef.gob.mx/wp-content/uploads/2026/02/rcd_311.pdf' };
  const REV_CAT = REV('usuario-inteligente/ponlo-en-la-balanza/2018/09/cat-cual-cat', '¿CAT? ¿Cuál CAT?');
  const REV_BURO = REV('usuario-inteligente/tu-bolsillo/2020/06/que-no-te-espante-el-buro-de-credito', '¡Que no te espante el Buró de Crédito!');
  const REV_HISTORIAL = REV('usuario-inteligente/ponlo-en-la-balanza/2017/01/buen-historial-crediticio', 'Buen historial crediticio');
  const BDE_PRESTAMO = BDE('productosservici/financiacion/prestamopersonal/', 'Préstamo personal y crédito al consumo');
  const BDE_PRESTAMO_CREDITO = BDE('productosservici/financiacion/prestamopersonal/guia-textual/conceptocaracter/Prestamo_o_credito.html', 'Préstamo o crédito');
  const BDE_CUOTA = BDE('productosservici/financiacion/prestamopersonal/guia-textual/conceptocaracter/Cuota.html', 'Cuota');
  const BDE_FIJO = BDE('productosservici/financiacion/prestamopersonal/guia-textual/conceptocaracter/Tipo_fijo_o_variable.html', 'Tipo fijo o variable');
  const BDE_ANTICIPADA = BDE('productosservici/financiacion/prestamopersonal/guia-textual/vidaprestamo/Amortizacion_pa_305d2c7f2dd7d51.html', 'Amortización parcial anticipada');
  const BDE_CONTRATAR = BDE('productosservici/financiacion/prestamopersonal/guia-textual/vidaprestamo/Contratacion.html', 'Contratación');
  const BDE_TIPOS = BDE('podemosayudarte/tiposinteres/', 'Tipos de interés');
  const BDE_CIRBE = BDE('podemosayudarte/cirbe/', 'CIRBE');
  const BDE_TARJETAS = BDE('productosservici/serviciospago/tarjetas/', 'Tarjetas');
  const SERNAC_CAE = { nombre: 'SERNAC (Chile): ¿Qué es la Carga Anual Equivalente (CAE)?', url: 'https://www.sernac.cl/portal/607/w3-article-2463.html' };
  const SERNAC_ESTUDIO = { nombre: 'SERNAC (Chile): Diferencias de casi 400% en costo anual de créditos de consumo (2012, histórico)', url: 'https://www.sernac.cl/portal/619/w3-article-2945.html' };
  const BCRA = { nombre: 'Banco Central de la República Argentina: Central de Deudores', url: 'https://www.bcra.gob.ar/BCRAyVos/Situacion_Crediticia.asp' };

  // ------------------------------------------------------------------
  const PLAZOS = diagrama([0, 12], [0, 3.2], [
    caja(0.2, 0.6, 3.6, 2.6), txt(1.9, 1.9, 'hoy recibes'), txt(1.9, 1.2, '$12 000'),
    caja(4.3, 0.6, 7.7, 2.6), txt(6, 1.9, '12 cuotas'), txt(6, 1.2, 'de $1 150'),
    caja(8.4, 0.6, 11.8, 2.6, true), txt(10.1, 1.9, 'total pagado'), txt(10.1, 1.2, '$13 800'),
    ...flecha([3.65, 1.6], [4.25, 1.6], 0, 1.2), ...flecha([7.75, 1.6], [8.35, 1.6], 0, 1.2),
  ], 'Tres cajas unidas por flechas, de izquierda a derecha: "hoy recibes $12 000", "12 cuotas de $1 150" y, sombreada, "total pagado $13 800".');

  L('Qué es un crédito', {
    objetivo: 'Explicar qué es un crédito y cuáles son sus piezas, distinguir un préstamo de una línea de crédito y revisar si una cuota cabe en tu capacidad de pago.',
    explicacion: `
      <p>El refrigerador de tu casa se descompuso y uno nuevo cuesta $12 000. No tienes ese dinero hoy, pero la tienda te ofrece llevártelo ahora y pagarlo en 12 meses. Esa oferta es un crédito, y antes de aceptarla conviene entender cómo funciona.</p>
      ${PLAZOS}
      <h3>Dinero de hoy, pagado después</h3>
      <p>Un <strong>crédito</strong> es dinero que una institución te presta hoy a cambio de que lo devuelvas después, casi siempre con intereses. Como viste en "Interés simple", el interés es el precio de usar dinero que no es tuyo.</p>
      <p>Todo crédito tiene las mismas piezas: el monto que te prestan, la tasa de interés, el plazo para devolverlo y las comisiones. Según el Banco de España, el contrato fija cuánto te prestan y las cuotas que vas a pagar. La <strong>cuota</strong> es cada pago periódico, casi siempre mensual: una parte devuelve el dinero prestado y otra paga los intereses.</p>
      <h3>Préstamo o línea de crédito</h3>
      <p>El Banco de España distingue dos formas. En un préstamo recibes todo el dinero de una sola vez, al principio, y lo devuelves en cuotas. En un crédito, en sentido estricto, tienes un límite: vas tomando dinero cuando lo necesitas, dentro de ese límite, y puedes devolverlo y volver a usarlo. Las tarjetas de crédito funcionan así, como verás en la siguiente lección. En la vida diaria, la palabra "crédito" se usa para las dos cosas.</p>
      <h3>Tipos más comunes</h3>
      <ul>
        <li>El préstamo personal o de consumo sirve para comprar un aparato, pagar un curso o un viaje.</li>
        <li>La tarjeta de crédito sirve para pagar compras con un límite que se renueva.</li>
        <li>El crédito para un auto y el hipotecario, para comprar una casa, se pagan en muchos años.</li>
      </ul>
      <p>El Banco de España señala que los préstamos personales son más fáciles de obtener que una hipoteca, pero más caros, porque sus intereses son más altos.</p>
      <h3>¿Puedes pagarlo?</h3>
      <p>Antes de pedir un crédito, revisa tu <strong>capacidad de pago</strong>: cuánto dinero te queda libre cada mes, después de tus gastos, para pagar la cuota sin dejar de cubrir lo necesario. Sale de tu presupuesto, como viste en "Hacer tu primer presupuesto". La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, recomienda hacer ese balance de ingresos y gastos antes de comprometerte, y el Banco de España explica que la institución también evaluará tu capacidad de pago antes de prestarte.</p>
      <p>Un crédito no es bueno ni malo por sí mismo: te deja tener algo hoy, pero te compromete con pagos futuros. En la unidad Deudas verás cuándo se vuelve un problema.</p>
      <p class="nota"><strong>Trampa común:</strong> fijarte solo en la cuota. "Solo $1 150 al mes" suena poco, pero también importa cuánto pagas en total: la cuota multiplicada por el número de cuotas.</p>`,
    ejemplo: `
      <p>El refrigerador cuesta $12 000 de contado, o 12 cuotas de $1 150. Cada mes te quedan libres $1 500 después de tus gastos. Las cifras son de ejemplo. ¿Cuánto pagas en total, cuánto cuesta el crédito y te alcanza la cuota?</p>
      <ol class="pasos-ej">
        <li>Calcula el total: 1 150 × 12 = $13 800.</li>
        <li>Resta el precio de contado para saber cuánto cuesta el crédito: 13 800 − 12 000 = $1 800.</li>
        <li>Pásalo a porcentaje: 1 800 ÷ 12 000 = 0.15, es decir, pagas 15% más que de contado.</li>
        <li>Revisa tu capacidad de pago: la cuota de $1 150 cabe en los $1 500 que te quedan libres, y te sobran $350 para otros imprevistos.</li>
        <li>Comprueba: 12 000 + 1 800 = 13 800.</li>
      </ol>
      <p>Resultado: <span class="resultado">pagas $13 800 en total; el crédito te cuesta $1 800, y la cuota cabe</span>.</p>
      <p class="nota"><strong>Error común:</strong> comparar la cuota con todo tu sueldo y no con lo que te queda libre después de tus gastos.</p>`,
    vidaReal: `
      <p>Entender cómo funciona un crédito te ayuda a decidir con calma:</p>
      <ul>
        <li>Cuando una tienda te ofrece "pagos chiquitos", sabes calcular cuánto pagarás en total.</li>
        <li>Puedes decidir si conviene esperar y juntar el dinero, o comprar hoy a plazos.</li>
        <li>Antes de firmar, revisas si los pagos caben en tu presupuesto.</li>
        <li>Entiendes por qué no todos los préstamos cuestan lo mismo, aunque presten la misma cantidad.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una lavadora se paga en 10 cuotas de $850. ¿Cuánto pagas en total?</p>', respuesta: 850 * 10,
        pista: '<p>Multiplica la cuota por el número de cuotas.</p>',
        solucion: '<p>850 × 10 = <strong>$8 500</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>La misma lavadora cuesta $7 500 de contado. ¿Cuánto pagas de más con las 10 cuotas de $850?</p>', respuesta: 850 * 10 - 7500,
        pista: '<p>Calcula el total de las cuotas y réstale el precio de contado.</p>',
        solucion: '<p>8 500 − 7 500 = <strong>$1 000</strong>. Ese es el costo del crédito.</p>' },
      { tipo: 'numero', enunciado: '<p>Pediste un préstamo a 24 cuotas y ya pagaste 9. ¿Cuántas cuotas te faltan?</p>', respuesta: 24 - 9,
        pista: '<p>Resta las que ya pagaste del total.</p>',
        solucion: '<p>24 − 9 = <strong>15 cuotas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según el Banco de España, ¿qué diferencia hay entre un préstamo y un crédito en sentido estricto?</p>',
        opciones: ['En el préstamo recibes todo de una vez; en el crédito tomas dinero cuando lo necesitas, hasta un límite', 'En el préstamo no se pagan intereses y en el crédito sí', 'El préstamo es siempre para una casa y el crédito para un auto'], correcta: 0,
        pista: '<p>Piensa en cuándo recibes el dinero en cada caso.</p>',
        solucion: '<p><strong>En el préstamo recibes todo de una vez; en el crédito vas tomando dinero hasta un límite</strong>, como en una tarjeta de crédito. Los dos cobran intereses.</p>' },
      { tipo: 'opciones', enunciado: '<p>Ganas $10 000 al mes y tus gastos suman $9 200. Te ofrecen un crédito con una cuota de $1 200. ¿Te alcanza?</p>',
        opciones: ['Sí, porque $1 200 es poco comparado con $10 000', 'No, porque solo te quedan libres $800 y la cuota es de $1 200', 'Sí, si dejas de pagar la renta un mes'], correcta: 1,
        pista: '<p>Calcula cuánto te queda libre después de tus gastos.</p>',
        solucion: '<p>10 000 − 9 200 = 800. <strong>No te alcanza</strong>: la cuota de $1 200 es mayor que tu capacidad de pago.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama cada pago periódico con el que devuelves un crédito?</p>',
        respuestas: ['cuota', 'la cuota', 'una cuota', 'cuotas', 'mensualidad', 'la mensualidad', 'pago mensual', 'abono'],
        pista: '<p>Una parte devuelve el dinero prestado y otra paga los intereses.</p>',
        solucion: '<p>La <strong>cuota</strong>.</p>' },
    ],
    fuentes: [BDE_PRESTAMO, BDE_PRESTAMO_CREDITO, BDE_CUOTA, BDE_CONTRATAR, REV_HISTORIAL],
  });

  // ------------------------------------------------------------------
  const MINIMO = barras({
    etiquetas: ['lo que debías', 'pagando el mínimo', 'pagando $500 más'], valores: [80, 165, 131], max: 165, paso: 1e9,
    descripcion: 'Gráfica de barras, en miles, del ejemplo de la CONDUSEF de 2025. Lo que se debía: 80 mil. Lo que se paga en total pagando solo el mínimo: unos 165 mil, en 105 meses. Lo que se paga en total pagando 500 más que el mínimo cada mes: unos 131 mil, en 63 meses.',
  });

  L('Tarjetas de crédito y la trampa del pago mínimo', {
    objetivo: 'Entender cómo funciona una tarjeta de crédito, qué significan el límite, la fecha de corte y el pago mínimo, y calcular por qué pagar solo el mínimo sale tan caro.',
    explicacion: `
      <p>Llega el estado de cuenta de la tarjeta, el resumen de lo que compraste y de lo que debes, con dos cantidades destacadas: "pago para no generar intereses: $8 000" y "pago mínimo: $400". Pagar $400 se siente como un alivio. Esta lección explica por qué, casi siempre, es la opción más cara.</p>
      <h3>Cómo funciona una tarjeta de crédito</h3>
      <p>Con una tarjeta de débito pagas con tu propio dinero, el que tienes en tu cuenta. Con una tarjeta de crédito pagas con dinero que te presta la institución que te la dio, y después se lo devuelves. Es una línea de crédito como la de "Qué es un crédito": tienes un <strong>límite de crédito</strong>, que es lo máximo que puedes deber, y cada vez que pagas, ese dinero vuelve a estar disponible.</p>
      <p>Cada mes hay una <strong>fecha de corte</strong>: el día en que se suma lo que compraste en el periodo y se prepara tu estado de cuenta. Después tienes unos días, hasta la fecha límite de pago, para pagar.</p>
      <h3>Pagar todo o pagar poco</h3>
      <p>Si antes de la fecha límite pagas todo lo que debes del periodo, en general no pagas intereses por esas compras. La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, lo dice así: si no quieres pagar intereses, liquida el total de tu deuda mes con mes.</p>
      <p>El <strong>pago mínimo</strong> es la cantidad más baja que te permiten pagar cada mes para mantener tu cuenta al corriente. Según la CONDUSEF, incluye intereses, comisiones y solo una pequeña parte de lo que debes. Por eso la deuda baja muy despacio, y los intereses se siguen calculando sobre lo que queda, como viste en "Interés compuesto: la fuerza del tiempo".</p>
      <h3>Cuánto cuesta pagar solo el mínimo</h3>
      <p>La CONDUSEF hizo la cuenta con su calculadora de pagos mínimos, en México, en septiembre de 2025, para una deuda de $80 000 en tarjetas de varias instituciones. En uno de los casos, con un pago mínimo inicial de $1 250, tardarías 105 meses, casi nueve años, en terminar de pagar, y pagarías en total unos $164 775: más del doble de lo que debías. Si cada mes pagaras $500 más que el mínimo, terminarías en 63 meses y pagarías unos $130 751.</p>
      ${MINIMO}
      <p>Las tasas cambian según la institución, el país y el año, así que estas cifras solo muestran cómo funciona. Revisa las condiciones de tu propia tarjeta.</p>
      <h3>Otros cobros</h3>
      <p>Según la CONDUSEF, sacar dinero en efectivo con la tarjeta de crédito tiene una comisión aparte, igual que reponerla si la pierdes. Por eso conviene leer el contrato antes de usarla. Y recuerda lo que viste en "Fondo de emergencia": pagar todo con tarjeta hoy puede costarte mucho más mañana.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que pagar el mínimo es "estar al día y ya". Estás al corriente, sí, pero la deuda casi no baja y los intereses siguen corriendo cada mes.</p>`,
    ejemplo: `
      <p>Debes $10 000 en tu tarjeta. La tasa es de 3% al mes y el pago mínimo de ese mes es de $400. Las cifras son de ejemplo. Si pagas solo el mínimo y no compras nada más, ¿cuánto baja tu deuda?</p>
      <ol class="pasos-ej">
        <li>Calcula el interés del mes: el 3% de 10 000 es 0.03 × 10 000 = $300.</li>
        <li>De tu pago de $400, primero se cubren esos $300 de interés. Solo lo que sobra baja la deuda: 400 − 300 = $100.</li>
        <li>Tu nueva deuda es 10 000 − 100 = $9 900.</li>
        <li>Compáralo: pagaste $400, pero tu deuda bajó solo $100. Tres cuartas partes de tu pago se fueron en intereses.</li>
        <li>Al mes siguiente, el interés se calcula sobre 9 900, casi lo mismo, y la historia se repite.</li>
      </ol>
      <p>Resultado: <span class="resultado">tu deuda baja solo de $10 000 a $9 900</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que pagando $400 al mes terminas en 25 meses, porque 10 000 ÷ 400 = 25. Los intereses hacen que tardes mucho más.</p>`,
    vidaReal: `
      <p>Saber leer tu tarjeta te ahorra dinero cada mes:</p>
      <ul>
        <li>Al recibir el resumen mensual de tu tarjeta, sabes cuál de las cantidades conviene pagar.</li>
        <li>Antes de una compra grande con tarjeta, calculas si podrás pagarla completa al mes siguiente.</li>
        <li>Evitas sacar efectivo con la tarjeta de crédito, que suele costar más.</li>
        <li>Si ya tienes una deuda en la tarjeta, entiendes por qué pagar un poco más cada mes ayuda tanto.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Debes $6 000 en tu tarjeta y la tasa es de 4% al mes. ¿Cuánto interés se cobra ese mes?</p>', respuesta: 6000 * 0.04,
        pista: '<p>Saca el 4% de 6 000.</p>',
        solucion: '<p>0.04 × 6 000 = <strong>$240</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con esa misma deuda, pagas un mínimo de $300. ¿Cuánto baja tu deuda ese mes?</p>', respuesta: 300 - 6000 * 0.04,
        pista: '<p>Primero se cubre el interés del mes; solo lo que sobra baja la deuda.</p>',
        solucion: '<p>De los $300, $240 son interés. La deuda baja solo 300 − 240 = <strong>$60</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En el ejemplo de la CONDUSEF, debías $80 000 y, pagando solo el mínimo, pagarías $164 775.12 en total. ¿Cuánto pagarías de más, entre intereses y comisiones?</p>', respuesta: 164775.12 - 80000, tolerancia: 1,
        pista: '<p>Resta lo que debías del total que pagarías.</p>',
        solucion: '<p>164 775.12 − 80 000 = <strong>$84 775.12</strong>, más de lo que debías al principio.</p>' },
      { tipo: 'numero', enunciado: '<p>En el mismo ejemplo, pagando $500 más que el mínimo cada mes, el total sería $130 750.90. ¿Cuánto te ahorrarías frente a pagar solo el mínimo?</p>', respuesta: 164775.12 - 130750.90, tolerancia: 1,
        pista: '<p>Resta los dos totales.</p>',
        solucion: '<p>164 775.12 − 130 750.90 = <strong>$34 024.22</strong>, y además terminarías 42 meses antes.</p>' },
      { tipo: 'opciones', enunciado: '<p>Para no pagar intereses por las compras del mes, ¿qué conviene pagar?</p>',
        opciones: ['El pago mínimo', 'Todo lo que debes del periodo, antes de la fecha límite', 'Lo que puedas, cuando puedas'], correcta: 1,
        pista: '<p>Recuerda lo que recomienda la CONDUSEF.</p>',
        solucion: '<p><strong>Todo lo que debes del periodo, antes de la fecha límite.</strong> Con el mínimo, los intereses siguen corriendo.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la cantidad más baja que te permiten pagar al mes para mantener tu tarjeta al corriente?</p>',
        respuestas: ['pago mínimo', 'el pago mínimo', 'mínimo', 'el mínimo'],
        pista: '<p>Son dos palabras; la segunda es lo contrario de "máximo".</p>',
        solucion: '<p>El <strong>pago mínimo</strong>.</p>' },
    ],
    fuentes: [REV_MINIMO, REV_MINIMO_PDF, REV_HISTORIAL, REV_CAT, BDE_TARJETAS],
  });

  // ------------------------------------------------------------------
  const SUMA = diagrama([0, 12], [0, 3.4], [
    caja(0.2, 0.8, 3.2, 2.6), txt(1.7, 2.0, 'prestado'), txt(1.7, 1.35, '$20 000'),
    txt(3.6, 1.7, '+'),
    caja(4.0, 0.8, 6.4, 2.6), txt(5.2, 2.0, 'intereses'), txt(5.2, 1.35, '$2 080'),
    txt(6.8, 1.7, '+'),
    caja(7.1, 0.8, 9.3, 2.6), txt(8.2, 2.0, 'comisión'), txt(8.2, 1.35, '$600'),
    txt(9.55, 1.7, '='),
    caja(9.8, 0.8, 11.8, 2.6, true), txt(10.8, 2.0, 'total'), txt(10.8, 1.35, '$22 680'),
  ], 'Una suma con cajas, sin escala: prestado, $20 000, más intereses, $2 080, más comisión, $600, igual a total, $22 680, en una caja sombreada.');

  L('El costo total de un crédito', {
    objetivo: 'Reconocer las comisiones de un crédito, usar el costo anual total para comparar y calcular cuánto cuesta un crédito en dinero.',
    explicacion: `
      <p>Dos anuncios ofrecen un préstamo de $20 000. Uno dice "tasa de 18%" y el otro "tasa de 20%". El primero parece más barato, pero en la letra pequeña cobra una comisión por abrir el préstamo y un seguro obligatorio. ¿Cuál cuesta menos de verdad?</p>
      <h3>La tasa no es todo</h3>
      <p>Además de los intereses, un crédito puede cobrar comisiones y seguros. Una <strong>comisión</strong> es un cobro por un servicio: por abrir el crédito, por la anualidad de una tarjeta (lo que se cobra cada año por tenerla), por sacar efectivo o por cobranza si te atrasas. La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, advierte que una tarjeta puede tener intereses bajos pero comisiones que suben su costo, y otra al revés.</p>
      <p>Por eso la tasa sola no basta para comparar. En "Tasa nominal y tasa real" viste que la tasa nominal es la anunciada, frente a la que descuenta la inflación. En los créditos la palabra tiene otro uso: el Banco de España llama tipo de interés nominal al precio por prestar, sin contar gastos ni comisiones.</p>
      <h3>Un solo número para comparar</h3>
      <p>Para resolverlo, muchos países obligan a mostrar un porcentaje que lo junta todo. En esta lección lo llamaremos <strong>costo anual total</strong>: el costo de un crédito en un año, contando intereses, comisiones y otros gastos. Cada país le da su nombre:</p>
      <ul>
        <li>En México se llama CAT. Según la CONDUSEF, junta la tasa, la anualidad, el plazo, el monto y otras comisiones, y las instituciones deben publicarlo en su publicidad y en los estados de cuenta.</li>
        <li>En España se llama TAE. El Banco de España explica que incluye, además del tipo de interés, los gastos y comisiones.</li>
        <li>En Chile se llama CAE. El SERNAC, el servicio nacional del consumidor, la explica como el costo del crédito en un año con todos sus gastos.</li>
      </ul>
      <p>Revisa cómo se llama en tu país y si es obligatorio mostrarlo.</p>
      <h3>La regla para usarlo</h3>
      <p>El SERNAC da una regla clara: con el mismo monto y el mismo plazo, siempre es más barato el crédito con el costo anual total más bajo. Si cambian el monto o el plazo, la comparación ya no es justa.</p>
      <p>También puedes medir el costo en dinero, que es lo que de verdad sale de tu bolsillo:</p>
      <p><strong>costo del crédito = total que pagas − monto que te prestaron</strong></p>
      <p>Se lee "todo lo que pagas, menos lo que recibiste". El total incluye todas las cuotas y las comisiones.</p>
      ${SUMA}
      <p>Las diferencias pueden ser enormes. En un estudio de 2012, con datos que ya son históricos, el SERNAC encontró que por un crédito de consumo de 500 mil pesos chilenos a 36 meses, el total a pagar iba de unos 594 mil a unos 982 mil según la institución: en el caso más caro, casi el doble de lo que se pedía.</p>
      <p class="nota"><strong>Trampa común:</strong> comparar el costo anual de dos créditos con plazos distintos. Un crédito a 12 meses y otro a 36 no se comparan solo por ese porcentaje; mira también el total que pagarás.</p>`,
    ejemplo: `
      <p>Dos ofertas por $20 000 a 12 meses. La A tiene cuotas de $1 840 y una comisión de apertura de 3%. La B tiene cuotas de $1 880 y no cobra comisión. Las cifras son de ejemplo. ¿Cuál cuesta menos?</p>
      <ol class="pasos-ej">
        <li>Calcula la comisión de A: el 3% de 20 000 es 0.03 × 20 000 = $600.</li>
        <li>Total de A: 1 840 × 12 = 22 080, más la comisión: 22 080 + 600 = $22 680.</li>
        <li>Total de B: 1 880 × 12 = $22 560.</li>
        <li>Costo de cada uno: A, 22 680 − 20 000 = $2 680; B, 22 560 − 20 000 = $2 560.</li>
        <li>Compara: B cuesta 2 680 − 2 560 = $120 menos, aunque su cuota es más alta.</li>
      </ol>
      <p>Resultado: <span class="resultado">la oferta B es más barata por $120</span>.</p>
      <p class="nota"><strong>Error común:</strong> elegir la A porque su cuota es más baja, sin sumar la comisión de apertura.</p>`,
    vidaReal: `
      <p>Mirar más allá de la tasa anunciada te evita pagar de más:</p>
      <ul>
        <li>Cuando un anuncio presume una tasa baja, sabes buscar los cobros extra en la letra pequeña.</li>
        <li>Puedes comparar dos ofertas con un solo porcentaje, si son por el mismo monto y el mismo plazo.</li>
        <li>Antes de firmar, calculas cuánto pagarás en total.</li>
        <li>Entiendes por qué sacar efectivo con una tarjeta de crédito sale caro.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un préstamo de $15 000 cobra una comisión de apertura de 2%. ¿De cuánto es la comisión?</p>', respuesta: 15000 * 0.02,
        pista: '<p>Saca el 2% de 15 000.</p>',
        solucion: '<p>0.02 × 15 000 = <strong>$300</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Ese préstamo de $15 000 se paga en 12 cuotas de $1 400, más la comisión de $300. ¿Cuánto pagas en total?</p>', respuesta: 1400 * 12 + 300,
        pista: '<p>Suma todas las cuotas y la comisión.</p>',
        solucion: '<p>1 400 × 12 = 16 800, y 16 800 + 300 = <strong>$17 100</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuánto te cuesta ese crédito en dinero?</p>', respuesta: 1400 * 12 + 300 - 15000,
        pista: '<p>Costo del crédito = total que pagas − monto que te prestaron.</p>',
        solucion: '<p>17 100 − 15 000 = <strong>$2 100</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según el Banco de España, ¿qué incluye la TAE además del tipo de interés?</p>',
        opciones: ['Los gastos y las comisiones', 'Solo la inflación del año', 'El precio del producto que compras'], correcta: 0,
        pista: '<p>La TAE sirve para ver el costo completo, no solo el precio por prestar.</p>',
        solucion: '<p><strong>Los gastos y las comisiones.</strong> Por eso sirve más que la tasa sola para comparar.</p>' },
      { tipo: 'opciones', enunciado: '<p>Dos créditos de $50 000 a 24 meses: uno tiene un costo anual total de 32% y el otro de 28%. ¿Cuál es más barato?</p>',
        opciones: ['El de 32%', 'El de 28%', 'No se puede saber sin conocer la cuota'], correcta: 1,
        pista: '<p>Tienen el mismo monto y el mismo plazo. Recuerda la regla del SERNAC.</p>',
        solucion: '<p><strong>El de 28%.</strong> Con el mismo monto y el mismo plazo, el costo anual total más bajo es el más barato.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama un cobro por un servicio, como abrir un crédito o sacar efectivo con la tarjeta?</p>',
        respuestas: ['comisión', 'la comisión', 'una comisión', 'comisiones'],
        pista: '<p>Empieza con "co" y también se usa para lo que gana un vendedor.</p>',
        solucion: '<p>Una <strong>comisión</strong>.</p>' },
    ],
    fuentes: [REV_CAT, BDE_TIPOS, SERNAC_CAE, SERNAC_ESTUDIO],
  });

  // ------------------------------------------------------------------
  const REPORTE = diagrama([0, 12], [0, 5], [
    caja(0.1, 3.2, 3.5, 4.7), txt(1.8, 4.2, 'pagas a tiempo'), txt(1.8, 3.6, 'o tarde'),
    caja(4.5, 3.2, 7.5, 4.7), txt(6, 4.2, 'la institución'), txt(6, 3.6, 'lo reporta'),
    caja(8.7, 3.2, 11.7, 4.7), txt(10.2, 4.2, 'se guarda en'), txt(10.2, 3.6, 'tu historial'),
    caja(4.5, 0.3, 11.7, 1.8, true), txt(8.1, 1.3, 'tu próximo crédito: si te lo dan'), txt(8.1, 0.7, 'y con qué tasa'),
    ...flecha([3.55, 3.95], [4.45, 3.95], 0, 1.2), ...flecha([7.55, 3.95], [8.65, 3.95], 0, 1.2),
    ...flecha([10.2, 3.15], [10.2, 1.85], 0, 1.2),
  ], 'Un diagrama de flujo. "Pagas a tiempo o tarde" lleva a "la institución lo reporta", y eso a "se guarda en tu historial". De ahí una flecha baja a una caja sombreada: "tu próximo crédito: si te lo dan y con qué tasa".');

  L('Historial crediticio', {
    objetivo: 'Explicar qué es el historial crediticio, quién lo guarda y quién lo consulta, desmentir la idea de la "lista negra" y saber cómo cuidarlo.',
    explicacion: `
      <p>Pides un préstamo y, antes de darte una respuesta, la institución revisa algo: cómo pagaste tus créditos anteriores. Lo que encuentre puede decidir si te presta, cuánto y a qué tasa.</p>
      <h3>Tu expediente de pagos</h3>
      <p>El <strong>historial crediticio</strong> es el registro de cómo has usado tus créditos: qué pediste, cuánto debes y si pagaste a tiempo. La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, lo describe como la suma de tus antecedentes de crédito. Lo consultan bancos, tiendas, compañías de teléfono y otras empresas antes de darte un crédito.</p>
      ${REPORTE}
      <p>En México, esa información la reúnen empresas privadas llamadas <strong>sociedades de información crediticia</strong>, que mucha gente conoce como "el buró". Las instituciones les reportan cómo pagas, y ellas dan esa información a quien está por prestarte.</p>
      <p>Otros países lo organizan distinto. En España, el Banco de España tiene la CIRBE, una base de datos con los préstamos y créditos de cada persona cuando en total pasan de 1 000 euros. En Argentina, el Banco Central publica la Central de Deudores, donde se pueden consultar las deudas reportadas con un número de identificación fiscal. Revisa cómo funciona en tu país.</p>
      <h3>No es una lista negra</h3>
      <p>Mucha gente cree que "estar en el buró" significa haber quedado mal. La CONDUSEF lo aclara: no es una lista negra, sino un registro. Aparece cualquier persona que haya tenido un crédito, aunque pague a tiempo. El Banco de España dice lo mismo de la CIRBE: no es un registro de morosos, es decir, de personas que no pagan. Lo que perjudica no es aparecer, sino atrasarte. Según la CONDUSEF, incluso no aparecer puede ser una desventaja, porque quien te presta no sabe cómo pagas.</p>
      <h3>El puntaje</h3>
      <p>Con tu historial se calcula un <strong>puntaje</strong>, un número que resume qué tan bien has pagado. Según la CONDUSEF, de ese puntaje depende el crédito que te pueden dar, y un historial sano te abre la puerta a créditos con mejores condiciones.</p>
      <h3>Cómo cuidarlo</h3>
      <ul>
        <li>Paga cada cuota antes de la fecha límite, porque los atrasos son lo que queda registrado en tu contra.</li>
        <li>No pidas más de lo que puedes pagar; revisa tu capacidad de pago, como en "Qué es un crédito".</li>
        <li>Revisa tu historial. En México, la CONDUSEF explica que puedes pedir tu reporte gratis una vez cada 12 meses; en España, consultar tus datos de la CIRBE es gratuito. Si ves algo que no reconoces, pregunta a la institución que lo reportó.</li>
        <li>Si ya te atrasaste, la CONDUSEF recomienda pagar lo que debes o acercarte a la institución para explicar tu situación. Lo verás en "Negociar con tus acreedores".</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> creer que lo mejor es no aparecer nunca en el historial. Sin historial, quien te presta no sabe cómo pagas, y eso también puede cerrarte puertas.</p>`,
    ejemplo: `
      <p>Dos personas piden $10 000 a un año con interés simple. Una tiene buen historial y le ofrecen 20% anual; la otra se ha atrasado varias veces y le ofrecen 30%. Las tasas son de ejemplo. ¿Cuánto más paga la segunda?</p>
      <ol class="pasos-ej">
        <li>Con buen historial, el interés es 10 000 × 0.20 × 1 = $2 000, como viste en "Interés simple".</li>
        <li>Con atrasos, el interés es 10 000 × 0.30 × 1 = $3 000.</li>
        <li>Resta: 3 000 − 2 000 = $1 000 más, solo por cómo pagó antes.</li>
        <li>Comprueba por otro camino: la diferencia de tasa es de 10 puntos, y el 10% de 10 000 es $1 000.</li>
      </ol>
      <p>Resultado: <span class="resultado">con mal historial paga $1 000 más por el mismo préstamo</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que un atraso pequeño no importa. Queda registrado y puede encarecer tu próximo crédito.</p>`,
    vidaReal: `
      <p>Cómo pagas hoy te acompaña durante años:</p>
      <ul>
        <li>Cuando quieras comprar un auto o una casa a plazos, quien te preste mirará cómo has pagado antes.</li>
        <li>Pagar a tiempo hoy puede significar una tasa más baja mañana.</li>
        <li>Si alguien te dice que estás "en una lista negra", sabes qué preguntar y dónde revisar.</li>
        <li>Puedes detectar a tiempo un crédito a tu nombre que tú no pediste.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En dos años hiciste 24 pagos y 21 fueron a tiempo. ¿Qué porcentaje de tus pagos fue a tiempo?</p>', respuesta: 21 / 24 * 100,
        pista: '<p>Divide los pagos a tiempo entre el total y multiplica por 100.</p>',
        solucion: '<p>21 ÷ 24 = 0.875, es decir, <strong>87.5%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Te prestan $8 000 a un año con interés simple: al 18% si tienes buen historial o al 26% si no. ¿Cuánto más pagarías con mal historial?</p>', respuesta: 8000 * 0.26 - 8000 * 0.18,
        pista: '<p>Calcula el interés con cada tasa y réstalos, o usa la diferencia de tasas: 8 puntos.</p>',
        solucion: '<p>8 000 × 0.26 = 2 080 y 8 000 × 0.18 = 1 440. La diferencia es <strong>$640</strong>, el 8% de 8 000.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la CONDUSEF, ¿qué es el registro de una sociedad de información crediticia?</p>',
        opciones: ['Una lista negra de personas que no pagan', 'Un registro de cómo pagas tus créditos, aunque pagues a tiempo', 'Un castigo que impide pedir créditos para siempre'], correcta: 1,
        pista: '<p>¿Aparece solo quien no paga, o cualquiera que haya tenido un crédito?</p>',
        solucion: '<p><strong>Un registro de cómo pagas</strong>, en el que aparece cualquiera que haya tenido un crédito. Lo que perjudica son los atrasos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué daña más tu historial crediticio?</p>',
        opciones: ['Atrasarte en tus pagos', 'Tener una tarjeta y pagarla completa cada mes', 'Revisar tu propio reporte'], correcta: 0,
        pista: '<p>¿Qué queda registrado en tu contra?</p>',
        solucion: '<p><strong>Atrasarte en tus pagos.</strong> Pagar completo ayuda, y revisar tu reporte no te perjudica.</p>' },
      { tipo: 'opciones', enunciado: '<p>Te atrasaste con un crédito y no puedes pagarlo completo. ¿Qué recomienda la CONDUSEF?</p>',
        opciones: ['Cambiar de número de teléfono para que no te encuentren', 'Pedir otro crédito para olvidarte del primero', 'Acercarte a la institución y explicar tu situación'], correcta: 2,
        pista: '<p>Esconderse o sumar deudas empeora las cosas.</p>',
        solucion: '<p><strong>Acercarte a la institución y explicar tu situación.</strong> Muchas veces se puede llegar a un acuerdo; lo verás en la unidad Deudas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el registro de cómo has usado y pagado tus créditos?</p>',
        respuestas: ['historial crediticio', 'el historial crediticio', 'historial de crédito', 'historial', 'el historial', 'reporte de crédito'],
        pista: '<p>Son dos palabras: la primera es "historial".</p>',
        solucion: '<p>El <strong>historial crediticio</strong>.</p>' },
    ],
    fuentes: [REV_HISTORIAL, REV_BURO, REV_CAT, BDE_CIRBE, BCRA],
  });

  // ------------------------------------------------------------------
  L('Cómo comparar préstamos', {
    objetivo: 'Comparar varias ofertas de préstamo con pasos en orden: igualar monto y plazo, calcular el total, revisar la cuota, elegir entre tasa fija y variable y leer las condiciones.',
    explicacion: `
      <p>Necesitas $20 000 y tienes tres ofertas. Una tiene la cuota más baja, otra el plazo más corto y otra la tasa más baja. Cada una presume lo que más le conviene mostrar. ¿Cómo eliges? Con unos pasos en orden, comparar se vuelve una cuenta sencilla.</p>
      <h3>Paso 1: iguala el monto y el plazo</h3>
      <p>Pide que las ofertas sean por la misma cantidad y el mismo plazo. Como viste en "El costo total de un crédito", solo así es justo comparar su costo anual total, y con el mismo monto y plazo, el más bajo es el más barato.</p>
      <h3>Paso 2: calcula el total</h3>
      <p>Multiplica la cuota por el número de cuotas y suma las comisiones. El Banco de España recomienda fijarse, antes de contratar, en el costo total con intereses, comisiones y gastos, en el plazo y en el importe de las cuotas.</p>
      <h3>Paso 3: revisa que la cuota quepa</h3>
      <p>El crédito más barato no te sirve si su cuota no cabe en tu capacidad de pago. Fíjate en esta relación: con un plazo más largo la cuota es más baja, pero pagas intereses durante más tiempo y el total sube. Con un plazo corto la cuota sube, pero terminas pagando menos.</p>
      <h3>Paso 4: tasa fija o variable</h3>
      <p>Según el Banco de España, una <strong>tasa fija</strong> se mantiene igual durante todo el contrato, así que sabes desde el principio cuánto pagarás en cada cuota. Una <strong>tasa variable</strong> cambia con el tiempo según un índice de referencia, más un porcentaje que no cambia. El Banco de España señala que la tasa fija suele ser más alta que la variable; a cambio, no hay sorpresas. Con la variable, la cuota puede bajar o subir.</p>
      <h3>Paso 5: lee las condiciones</h3>
      <p>Antes de firmar, pide la información de la oferta o el contrato y busca tres cosas:</p>
      <ul>
        <li>Qué comisiones cobran: por abrir el crédito, por atrasarte o por cobranza.</li>
        <li>Si puedes pagar antes de tiempo. El Banco de España explica que pagar una parte antes reduce las cuotas o el plazo, aunque en algunos casos la entidad puede cobrar una compensación.</li>
        <li>Si te piden contratar otro producto, como un seguro, a cambio de una tasa más baja.</li>
      </ul>
      <p>Cotiza en varias instituciones. En Chile, el SERNAC encontró en 2012 que el total a pagar podía ser casi el doble entre la oferta más barata y la más cara. Y desconfía de quien te presta sin revisar nada y con prisa; lo verás en "Préstamos abusivos, gota a gota y cobranza ilegal".</p>
      <p class="nota"><strong>Trampa común:</strong> elegir la oferta con la cuota más baja. Muchas veces es la del plazo más largo, y termina siendo la más cara.</p>`,
    ejemplo: `
      <p>Tres ofertas por $20 000. Cada mes te quedan libres $2 000. Las cifras son de ejemplo:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Oferta</th><th>Cuota</th><th>Número de cuotas</th><th>Comisión</th></tr>
        <tr><th>A</th><td>$1 900</td><td>12</td><td>$0</td></tr>
        <tr><th>B</th><td>$1 050</td><td>24</td><td>$0</td></tr>
        <tr><th>C</th><td>$1 800</td><td>12</td><td>$800</td></tr>
      </table></div>
      <ol class="pasos-ej">
        <li>Las tres prestan lo mismo. A y C tienen el mismo plazo; B es más larga, así que compara por el total.</li>
        <li>Calcula los totales: A, 1 900 × 12 = $22 800; B, 1 050 × 24 = $25 200; C, 1 800 × 12 + 800 = $22 400.</li>
        <li>Calcula el costo de cada una restando los $20 000: A, $2 800; B, $5 200; C, $2 400.</li>
        <li>Revisa la cuota: las tres caben en tus $2 000 libres, pero B, la de cuota más baja, es la más cara.</li>
        <li>Elige C. Comprueba: 1 800 × 12 = 21 600, y 21 600 + 800 = 22 400.</li>
      </ol>
      <p>Resultado: <span class="resultado">la oferta C es la más barata: $22 400 en total</span>.</p>
      <p class="nota"><strong>Error común:</strong> descartar la C por su comisión sin hacer la cuenta. Aun con la comisión, es la que menos cuesta.</p>`,
    vidaReal: `
      <p>Comparar con calma te protege de decisiones apresuradas:</p>
      <ul>
        <li>Cuando un vendedor te presiona con "la cuota más baja", sabes qué preguntar.</li>
        <li>Puedes llevarte las ofertas por escrito y compararlas tranquilamente en tu casa.</li>
        <li>Eliges un plazo que puedas pagar cada mes sin terminar pagando de más.</li>
        <li>Sabes por qué conviene preguntar si puedes pagar antes de tiempo sin que te cobren por hacerlo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una oferta tiene 18 cuotas de $1 300 y una comisión de $500. ¿Cuánto pagas en total?</p>', respuesta: 1300 * 18 + 500,
        pista: '<p>Multiplica la cuota por el número de cuotas y suma la comisión.</p>',
        solucion: '<p>1 300 × 18 = 23 400, y 23 400 + 500 = <strong>$23 900</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Por el mismo préstamo, la oferta X cuesta $23 900 en total y la Y, $24 600. ¿Cuánto te ahorras con la más barata?</p>', respuesta: 24600 - 23900,
        pista: '<p>Resta los dos totales.</p>',
        solucion: '<p>24 600 − 23 900 = <strong>$700</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un préstamo de $10 000 se puede pagar en 12 cuotas de $950 o en 24 cuotas de $520. ¿Cuánto más pagas en total con 24 cuotas?</p>', respuesta: 24 * 520 - 12 * 950,
        pista: '<p>Calcula el total de cada opción y réstalos.</p>',
        solucion: '<p>24 × 520 = 12 480 y 12 × 950 = 11 400. Con 24 cuotas pagas <strong>$1 080</strong> más, aunque la cuota sea más baja.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según el Banco de España, ¿qué ventaja tiene una tasa fija?</p>',
        opciones: ['Siempre es la más baja del mercado', 'Sabes desde el principio cuánto pagarás en cada cuota', 'Baja sola cuando bajan las demás tasas'], correcta: 1,
        pista: '<p>Piensa en qué significa que no cambie durante el contrato.</p>',
        solucion: '<p><strong>Sabes desde el principio cuánto pagarás.</strong> Suele ser más alta que la variable, pero no hay sorpresas.</p>' },
      { tipo: 'opciones', enunciado: '<p>Antes de comparar el costo anual total de dos préstamos, ¿qué debes revisar?</p>',
        opciones: ['Que sean por el mismo monto y el mismo plazo', 'Que tengan la misma cuota mensual', 'Que los ofrezca la misma institución'], correcta: 0,
        pista: '<p>Recuerda la regla del SERNAC.</p>',
        solucion: '<p><strong>Que sean por el mismo monto y el mismo plazo.</strong> Solo así el costo anual total más bajo es el más barato.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la tasa que se mantiene igual durante todo el contrato?</p>',
        respuestas: ['tasa fija', 'la tasa fija', 'tipo fijo', 'interés fijo', 'tasa de interés fija'],
        pista: '<p>Es lo contrario de la tasa variable.</p>',
        solucion: '<p>La <strong>tasa fija</strong>.</p>' },
    ],
    fuentes: [BDE_CONTRATAR, BDE_FIJO, BDE_ANTICIPADA, SERNAC_CAE, SERNAC_ESTUDIO],
  });
})();
