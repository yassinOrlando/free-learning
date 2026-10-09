// Finanzas personales · Unidad 6: Deudas.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Sin consejos personalizados ni productos, bancos o empresas por su nombre. Sin dramatizar ni culpar; pedir ayuda está bien.
// Préstamos abusivos y cobranza ilegal: solo fuentes oficiales y siempre a dónde acudir.
// Las cifras de bola de nieve y avalancha (lecciones 5 a 8 y 10) salen de una simulación mes a mes:
// cada mes se suma el interés al saldo y luego se paga; los mínimos no cambian; el total al mes es de $1 400.
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
  const FPT_DEUDAS = { nombre: 'Finanzas para todos (Banco de España y CNMV): ¿Cómo gestionar mis deudas?', url: 'https://www.finanzasparatodos.es/c-mo-gestionar-mis-deudas' };
  const BDE_RAPIDOS = { nombre: 'Banco de España, Portal del Cliente Bancario: Créditos rápidos', url: 'https://clientebancario.bde.es/pcb/es/menu-horizontal/productosservici/financiacion/prestamopersonal/guia-textual/tiposprestamospe/Creditos_rapidos.html' };
  const ILLINOIS = { nombre: 'Extensión de la Universidad de Illinois: Debt repaying strategies, how do you decide? (en inglés)', url: 'https://extension.illinois.edu/blogs/finding-financial-balance/2024-05-08-debt-repaying-strategies-how-do-you-decide' };
  const WISC = { nombre: 'Extensión de la Universidad de Wisconsin: Debt Repayment (PDF, en inglés)', url: 'https://finances.extension.wisc.edu/files/2024/08/Debt-Repayment.pdf' };
  const SFC = { nombre: 'Superintendencia Financiera de Colombia: ¿Cómo denunciar? Falsos prestamistas', url: 'https://www.superfinanciera.gov.co/10115521' };
  const MEDLINE = { nombre: 'MedlinePlus en español: Estrés', url: 'https://medlineplus.gov/spanish/stress.html' };
  const REV_BUENAS = REV('credito/deudas/2021/03/deudas-buenas-vs-malas', 'Deudas buenas vs malas');
  const REV_SALIR = REV('credito/deudas/2016/10/como-salir-de-deudas-sin-morir-en-el-intento', 'Cómo salir de deudas sin morir en el intento');
  const REV_ESTRES = REV('credito/deudas/2026/03/de-la-preocupaciona-la-accion', 'De la preocupación a la acción');
  const REV_TERMINA = REV('credito/deudas/2024/12/alegria', '¡Termina el año sin deudas!');
  const REV_CONSOLIDA = REV('credito/deudas/2016/02/consolidacion-de-deudas', '¿Consolidación de deudas?');
  const REV_GOTA = REV('usuario-inteligente/que-hay-de-nuevo/2019/04/prestamos-gota-a-gota', 'Préstamos gota a gota');
  const REV_DESPACHO = REV('usuario-inteligente/ponlo-en-la-balanza/2023/04/un-despacho-de-cobranza-viola-tus-derechos', '¿Un despacho de cobranza viola tus derechos?');
  const REV_DELITO = REV('usuario-inteligente/a-tu-favor/2017/07/cobranza-extrajudicial-es-un-delito', 'Cobranza extrajudicial es un delito');
  const REV_HISTORIAL = REV('usuario-inteligente/ponlo-en-la-balanza/2017/01/buen-historial-crediticio', 'Buen historial crediticio');
  const REV_APUROS = REV('usuario-inteligente/a-tu-favor/2025/06/emergencia', 'Para los apuros, el ahorro seguro');

  // ------------------------------------------------------------------
  const CIRCULO = diagrama([0, 12], [0, 6.6], [
    caja(4.3, 5.1, 7.7, 6.3), txt(6, 5.7, 'no alcanza'),
    caja(8.3, 2.6, 11.7, 3.8), txt(10, 3.2, 'pides prestado'),
    caja(4.3, 0.2, 7.7, 1.4), txt(6, 0.8, 'más intereses'),
    caja(0.3, 2.6, 3.7, 3.8), txt(2, 3.2, 'pagos más altos'),
    ...flecha([7.8, 5.4], [9.6, 3.95], 0, 1.3), ...flecha([9.6, 2.45], [7.8, 1.1], 0, 1.3),
    ...flecha([4.2, 1.1], [2.4, 2.45], 0, 1.3), ...flecha([2.4, 3.95], [4.2, 5.4], 0, 1.3),
  ], 'Un círculo de cuatro cajas unidas por flechas en el sentido de las manecillas del reloj: "no alcanza", arriba, lleva a "pides prestado", a la derecha; eso lleva a "más intereses", abajo; eso a "pagos más altos", a la izquierda, que regresa a "no alcanza".');

  L('Qué es una deuda y cuándo se vuelve un problema', {
    objetivo: 'Explicar qué es una deuda, reconocer cuándo se convierte en sobreendeudamiento y calcular si tus pagos caben en tu capacidad de pago.',
    explicacion: `
      <p>Compraste un celular a 12 meses y una sala a 18. Cada pago, por separado, parecía pequeño. Un mes se juntan con la tarjeta, te recortan horas en el trabajo y, de pronto, el dinero ya no alcanza. Le pasa a mucha gente, y tiene solución. El primer paso es entender qué es una deuda y cuándo deja de ser manejable.</p>
      <h3>Qué es una deuda</h3>
      <p>Cuando usas un crédito, como viste en "Qué es un crédito", quedas con una <strong>deuda</strong>: la obligación de devolver el dinero que te prestaron, más los intereses, en las condiciones que aceptaste. Así la define la CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros.</p>
      <p>Tener deudas es normal. Finanzas para todos, del Banco de España y la CNMV, explica que es prácticamente imposible pasar toda la vida sin endeudarse, porque la mayoría de las personas no puede pagar de una sola vez una casa o un auto. Una deuda que cabe en tu presupuesto y que pagas a tiempo es una herramienta. El problema empieza cuando deja de caber.</p>
      <h3>Cuándo se vuelve un problema</h3>
      <p>Hay <strong>sobreendeudamiento</strong> cuando lo que debes pagar cada mes es más de lo que puedes pagar sin dejar de cubrir tus necesidades; es decir, cuando los pagos superan tu capacidad de pago. Finanzas para todos advierte que el exceso de deuda puede subir tus gastos fijos hasta niveles que no se pueden sostener, y hacer que llegar a fin de mes sea una angustia.</p>
      <p>Fíjate en cómo suele empezar. Según la CONDUSEF, una deuda se complica cuando se compra a crédito por encima de la capacidad de pago, cuando se paga solo el mínimo de las tarjetas o cuando se pide un préstamo nuevo para pagar uno anterior. Este último paso forma un círculo:</p>
      ${CIRCULO}
      <p>Cada vuelta suma intereses, como viste en "Interés compuesto: la fuerza del tiempo", y la deuda crece aunque estés pagando. Por eso la CONDUSEF insiste en reconocer pronto el problema, antes de que las cuentas lleguen a cobranza.</p>
      <h3>No es una falta moral</h3>
      <p>Una deuda que se complicó no dice nada malo de ti. La CONDUSEF lo reconoce: mucha gente ha enfrentado una crisis por quedarse sin empleo, por un problema de salud o porque gastó de más y perdió el control. Lo útil no es culparte, sino ver los números con calma. Si la preocupación no te deja dormir, hablar con alguien de confianza o con un profesional de la salud está bien; lo verás también en "Salir de deudas y no volver a caer".</p>
      <p>En esta unidad verás, paso a paso, cómo medir tus deudas, hacer una lista, elegir un método para pagarlas, negociar y protegerte de los préstamos abusivos.</p>
      <p class="nota"><strong>Trampa común:</strong> pedir un préstamo nuevo para pagar uno viejo sin cambiar nada más. El problema no desaparece: se mueve de lugar y suma intereses.</p>`,
    ejemplo: `
      <p>Tu sueldo neto es de $10 000. Tus gastos necesarios suman $7 000 y tus pagos de deudas, $4 200 al mes. Las cifras son de ejemplo. ¿Tus deudas son manejables?</p>
      <ol class="pasos-ej">
        <li>Calcula tu capacidad de pago, lo que te queda después de los gastos necesarios: 10 000 − 7 000 = $3 000.</li>
        <li>Compara con tus pagos de deudas: $4 200 es más que $3 000.</li>
        <li>La diferencia es lo que falta cada mes: 4 200 − 3 000 = $1 200.</li>
        <li>Si cubres esa falta con otro préstamo, entras al círculo: el mes siguiente tendrás que pagar todavía más.</li>
        <li>Comprueba sumando todo lo que sale: 7 000 + 4 200 = 11 200, más que los 10 000 que entran. Tu saldo es de −1 200, como en "Ingresos y gastos".</li>
      </ol>
      <p>Resultado: <span class="resultado">no son manejables: faltan $1 200 cada mes</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que el problema es solo la deuda más grande. Lo que importa es la suma de todos los pagos frente a lo que puedes pagar.</p>`,
    vidaReal: `
      <p>Saber cuándo una deuda deja de ser manejable te da tiempo para actuar:</p>
      <ul>
        <li>Antes de comprar a plazos, puedes ver si ese pago nuevo cabe junto con los que ya tienes.</li>
        <li>Si un mes no alcanza, reconoces la señal a tiempo, antes de que lleguen las llamadas de cobranza.</li>
        <li>Evitas el círculo de pedir prestado para pagar lo que ya debes.</li>
        <li>Puedes hablar del tema con tu familia sin culpas y con números en la mano.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Ganas $12 000 netos al mes y tus gastos necesarios son de $8 500. ¿Cuál es tu capacidad de pago para deudas?</p>', respuesta: 12000 - 8500,
        pista: '<p>Resta los gastos necesarios a tu ingreso neto.</p>',
        solucion: '<p>12 000 − 8 500 = <strong>$3 500</strong> al mes.</p>' },
      { tipo: 'numero', enunciado: '<p>Con esa capacidad de pago de $3 500, tus deudas te piden $4 100 al mes. ¿Cuánto te falta cada mes?</p>', respuesta: 4100 - 3500,
        pista: '<p>Resta tu capacidad de pago a lo que piden tus deudas.</p>',
        solucion: '<p>4 100 − 3 500 = <strong>$600</strong>. Es una señal de sobreendeudamiento.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuándo hay sobreendeudamiento?</p>',
        opciones: ['Cuando tienes cualquier deuda, aunque la pagues sin problema', 'Cuando los pagos de tus deudas superan lo que puedes pagar sin descuidar tus necesidades', 'Cuando debes más de $10 000'], correcta: 1,
        pista: '<p>No depende de tener deudas ni de una cifra fija, sino de tu capacidad de pago.</p>',
        solucion: '<p><strong>Cuando los pagos superan lo que puedes pagar.</strong> Una deuda grande que cabe en tu presupuesto no es sobreendeudamiento.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas situaciones forma un círculo de deuda?</p>',
        opciones: ['Pagar el total de la tarjeta cada mes', 'Ahorrar antes de hacer una compra grande', 'Pedir un préstamo nuevo para pagar uno anterior'], correcta: 2,
        pista: '<p>Busca la opción en la que una deuda se paga con otra deuda.</p>',
        solucion: '<p><strong>Pedir un préstamo nuevo para pagar uno anterior.</strong> La deuda no baja: cambia de lugar y suma intereses.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Finanzas para todos, ¿se puede vivir toda la vida sin ninguna deuda?</p>',
        opciones: ['Para la mayoría es prácticamente imposible, por ejemplo al comprar una casa o un auto', 'Sí, siempre que nunca uses una tarjeta', 'Solo las personas con sueldos altos logran no endeudarse'], correcta: 0,
        pista: '<p>Piensa en las compras que casi nadie puede pagar de una sola vez.</p>',
        solucion: '<p><strong>Para la mayoría es prácticamente imposible.</strong> Lo importante no es no tener deudas, sino que quepan en tu presupuesto.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la situación en que los pagos de tus deudas superan tu capacidad de pago?</p>',
        respuestas: ['sobreendeudamiento', 'el sobreendeudamiento', 'sobre endeudamiento', 'endeudamiento excesivo', 'exceso de deudas'],
        pista: '<p>Es "endeudamiento" con un prefijo que significa "por encima de".</p>',
        solucion: '<p>El <strong>sobreendeudamiento</strong>.</p>' },
    ],
    fuentes: [REV_BUENAS, REV_SALIR, FPT_DEUDAS],
  });

  // ------------------------------------------------------------------
  L('Deuda buena y deuda mala', {
    objetivo: 'Distinguir una deuda buena de una deuda mala según para qué se usa y si cabe en tu presupuesto, y calcular cuánto cuesta un gusto pagado a crédito.',
    explicacion: `
      <p>Dos personas piden el mismo préstamo de $20 000. Una lo usa para un curso que le permite conseguir un trabajo mejor pagado; la otra, para unas vacaciones. Pagan las mismas cuotas, pero dentro de un año su situación es muy distinta. La diferencia no está en el préstamo, sino en lo que hicieron con él.</p>
      <h3>Lo que deja la deuda</h3>
      <p>La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, describe la deuda como un arma de doble filo: bien usada puede mejorar tu economía; mal manejada, la desequilibra. Por eso propone separarlas en dos grupos.</p>
      <p>Una <strong>deuda buena</strong> es la que te ayuda a aumentar lo que tienes o te protege, y cuyo pago cabe en tu presupuesto. Según la CONDUSEF, suele usarse para algo que dura o que genera ingresos: una casa, un curso que mejora tu empleo, un negocio o un auto usado en buen estado que te sirve para trabajar.</p>
      <p>Una <strong>deuda mala</strong> es la que se usa para cosas que no necesitas, que duran poco o que pierden valor rápido, o la que ya no puedes pagar. La CONDUSEF da ejemplos: pagar viajes, ropa o la despensa con la tarjeta, usarla como si fuera una extensión del sueldo, o comprar el celular más nuevo para aparentar.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Pregunta</th><th>Deuda buena</th><th>Deuda mala</th></tr>
        <tr><th>¿Para qué es?</th><td>Algo que dura o que genera ingresos</td><td>Algo que se acaba pronto o que no necesitas</td></tr>
        <tr><th>¿Cabe el pago?</th><td>Sí, dentro de tu capacidad de pago</td><td>No, o apenas</td></tr>
        <tr><th>¿Qué te deja?</th><td>Patrimonio, protección o mejores ingresos</td><td>Solo el pago pendiente</td></tr>
      </table></div>
      <h3>La misma deuda puede cambiar de grupo</h3>
      <p>Fíjate que no basta con el "para qué". La CONDUSEF también usa una medida: cuando los pagos de deudas se llevan más del 30% de tus ingresos, la deuda se vuelve mala aunque sea para algo útil. Una casa es una deuda buena si su cuota cabe; si te deja sin dinero para comer, ya no lo es. Y, según la CONDUSEF, una deuda buena se vuelve mala si se paga tarde, porque los intereses siguen creciendo.</p>
      <h3>Preguntas para clasificarla</h3>
      <ul>
        <li>¿Lo que compro me va a durar más que la deuda?</li>
        <li>¿Me ayuda a ganar más, a ahorrar o a protegerme?</li>
        <li>¿La cuota cabe en mi capacidad de pago, como viste en "Qué es un crédito"?</li>
        <li>¿Podría esperar y juntar el dinero, como en "Metas de ahorro"?</li>
      </ul>
      <p>Si a las tres primeras respondes que no, lo más probable es que sea una deuda mala.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que una deuda es buena solo porque lo que compras es útil. Un auto puede ayudarte a trabajar, pero si la cuota se lleva más de lo que puedes pagar, se convierte en una carga.</p>`,
    ejemplo: `
      <p>Quieres un viaje de $9 000. Puedes pagarlo en 12 cuotas de $870 con la tarjeta, o ahorrar durante un año y viajar después. Las cifras son de ejemplo. ¿Cuánto cuesta pagarlo a crédito?</p>
      <ol class="pasos-ej">
        <li>Calcula el total a crédito: 870 × 12 = $10 440.</li>
        <li>Resta el precio para saber el costo del crédito: 10 440 − 9 000 = $1 440.</li>
        <li>Calcula lo que tendrías que ahorrar: 9 000 ÷ 12 = $750 al mes durante un año.</li>
        <li>Compara: a crédito pagas $870 al mes y el viaje termina mucho antes que los pagos; ahorrando apartas $750 al mes y vuelves sin deber nada.</li>
        <li>Comprueba: 750 × 12 = 9 000, justo el precio del viaje.</li>
      </ol>
      <p>Resultado: <span class="resultado">pagado a crédito, el viaje te cuesta $1 440 más</span>.</p>
      <p class="nota"><strong>Error común:</strong> comparar solo las cuotas, $870 contra $750, y pensar que la diferencia es de $120. En todo el año son $1 440.</p>`,
    vidaReal: `
      <p>Distinguir para qué te endeudas te ayuda a decidir con calma:</p>
      <ul>
        <li>Antes de pedir un préstamo, puedes preguntarte si lo que compras te durará más que los pagos.</li>
        <li>Distingues entre pedir prestado para estudiar o trabajar mejor y pedirlo para un gusto.</li>
        <li>Evitas pagar la despensa de cada semana con la tarjeta.</li>
        <li>Decides con más claridad cuándo vale la pena esperar y juntar el dinero.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas es más probable que sea una deuda buena?</p>',
        opciones: ['Un curso que te ayuda a conseguir un empleo mejor pagado, con una cuota que cabe en tu presupuesto', 'Unas vacaciones pagadas con la tarjeta', 'La despensa de cada semana pagada con la tarjeta'], correcta: 0,
        pista: '<p>Busca la que deja algo que dura y cuyo pago cabe.</p>',
        solucion: '<p><strong>El curso con una cuota que cabe.</strong> Puede mejorar tus ingresos. Las otras dos se gastan pronto y la CONDUSEF las pone como ejemplos de deuda mala.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la CONDUSEF, ¿qué hace que una deuda útil se vuelva mala?</p>',
        opciones: ['Que sea con un banco', 'Que sus pagos se lleven más del 30% de tus ingresos o que no puedas pagarla a tiempo', 'Que se pague en más de 12 meses'], correcta: 1,
        pista: '<p>Recuerda la medida que usa la CONDUSEF.</p>',
        solucion: '<p><strong>Que los pagos pasen del 30% de tus ingresos o que no puedas pagarla a tiempo.</strong> Entonces deja de caber en tu presupuesto.</p>' },
      { tipo: 'numero', enunciado: '<p>Ganas $14 000 netos al mes. ¿Cuánto es lo máximo que podrías pagar de deudas al mes para no pasar del 30%?</p>', respuesta: 14000 * 0.3,
        pista: '<p>Saca el 30% de 14 000: tres veces el 10%.</p>',
        solucion: '<p>El 10% de 14 000 es 1 400, así que el 30% es 3 × 1 400 = <strong>$4 200</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una pantalla de $6 000 se paga en 12 cuotas de $640. ¿Cuánto cuesta el crédito?</p>', respuesta: 640 * 12 - 6000,
        pista: '<p>Calcula el total de las cuotas y réstale el precio.</p>',
        solucion: '<p>640 × 12 = 7 680, y 7 680 − 6 000 = <strong>$1 680</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tus pagos de deudas suman $3 900 al mes y tu ingreso neto es de $12 000. ¿Qué porcentaje de tu ingreso se va en deudas?</p>', respuesta: 3900 / 12000 * 100,
        pista: '<p>Divide los pagos entre el ingreso y multiplica por 100.</p>',
        solucion: '<p>3 900 ÷ 12 000 = 0.325, es decir, <strong>32.5%</strong>, un poco por encima de la referencia de 30% de la CONDUSEF.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la deuda que se usa para cosas que no necesitas, que duran poco o que pierden valor rápido?</p>',
        respuestas: ['deuda mala', 'la deuda mala', 'una deuda mala', 'mala'],
        pista: '<p>Es lo contrario de la deuda buena.</p>',
        solucion: '<p>Una <strong>deuda mala</strong>.</p>' },
    ],
    fuentes: [REV_BUENAS, REV_SALIR],
  });

  // ------------------------------------------------------------------
  const PREGUNTAS = diagrama([0, 12], [0, 5.4], [
    caja(0.2, 3.4, 3.6, 5.0), txt(1.9, 4.45, '¿lo necesito'), txt(1.9, 3.85, 'ahora?'),
    caja(4.3, 3.4, 7.7, 5.0), txt(6, 4.45, '¿la cuota cabe'), txt(6, 3.85, 'con las demás?'),
    caja(8.4, 3.4, 11.8, 5.0, true), txt(10.1, 4.45, 'compara el'), txt(10.1, 3.85, 'costo total'),
    caja(1.0, 0.3, 6.9, 1.6), txt(3.95, 0.95, 'espera y ahorra'),
    ...flecha([3.65, 4.2], [4.25, 4.2], 0, 1.2), txt(3.95, 4.75, 'sí'),
    ...flecha([7.75, 4.2], [8.35, 4.2], 0, 1.2), txt(8.05, 4.75, 'sí'),
    ...flecha([1.9, 3.35], [1.9, 1.65], 0, 1.2), txt(1.5, 2.5, 'no'),
    ...flecha([6, 3.35], [6, 1.65], 0, 1.2), txt(6.4, 2.5, 'no'),
  ], 'Un diagrama de decisión. Primera pregunta: "¿lo necesito ahora?". Si es sí, sigue a "¿la cuota cabe con las demás?"; si también es sí, llega a una caja sombreada: "compara el costo total". Si cualquiera de las dos respuestas es no, una flecha baja a "espera y ahorra".');

  L('Cómo evitar una deuda', {
    objetivo: 'Reconocer las compras por impulso y las ofertas a meses, hacerte tres preguntas antes de usar crédito y usar el ahorro para no endeudarte por una emergencia.',
    explicacion: `
      <p>Ves una pantalla con un letrero que dice "a 12 meses sin intereses" y piensas que no pierdes nada. Antes de firmar, conviene saber cómo funcionan esas ofertas y qué preguntas te protegen de una deuda que no necesitas.</p>
      <h3>Antes de comprar a crédito</h3>
      <p>Muchas deudas empiezan con una <strong>compra por impulso</strong>: una compra que no planeabas y que haces porque algo te gustó en el momento, porque está en oferta o porque es fácil pagar con tarjeta. La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, señala como errores comunes no distinguir entre deseos y necesidades, no comparar precios y comprar algo solo porque está barato. Lo viste en "Necesidades y deseos".</p>
      <h3>Tres preguntas</h3>
      ${PREGUNTAS}
      <ul>
        <li>¿Lo necesito ahora, o puedo esperar y ahorrar para comprarlo, como en "Metas de ahorro"?</li>
        <li>Si lo compro a crédito, ¿la cuota cabe en mi capacidad de pago junto con mis otras deudas?</li>
        <li>¿Cuánto me cuesta en total, comparado con pagarlo de contado?</li>
      </ul>
      <h3>"Sin intereses" no es gratis</h3>
      <p>Finanzas para todos, del Banco de España y la CNMV, lo advierte: una financiación "sin intereses" no significa que el costo del crédito sea cero, porque puede haber comisiones y otros gastos. Además, cada compra a meses es una cuota más que se suma a las que ya tienes. Revisa el costo anual total, como viste en "El costo total de un crédito".</p>
      <h3>No uses crédito para lo de todos los días</h3>
      <p>La CONDUSEF pone como ejemplos de deuda mala pagar la ropa, el calzado o la despensa con la tarjeta, o pagar servicios como la luz y el agua con crédito, y señala como error comprar a crédito cosas que se acaban pronto. Si un gasto se repite cada mes, debe salir de tu presupuesto, no de un préstamo.</p>
      <h3>Un colchón para las emergencias</h3>
      <p>Muchas deudas no vienen de un antojo, sino de una emergencia. La CONDUSEF lo explica así: ante un gasto inesperado, lo más común es pedir prestado, pero eso puede empeorar el apuro, porque después hay que pagar con intereses. Por eso el fondo de "Fondo de emergencia" es una de las mejores formas de evitar deudas.</p>
      <p>La CONDUSEF propone además una idea curiosa: ahorrar como si ya estuvieras pagando una deuda imaginaria. La cantidad que pagarías de cuota, apártala cada mes; cuando llegue el gasto, ya tendrás el dinero.</p>
      <p class="nota"><strong>Trampa común:</strong> mirar cada compra a meses por separado. Tres cuotas pequeñas de $400 son $1 200 al mes durante todo el plazo.</p>`,
    ejemplo: `
      <p>Una pantalla cuesta $7 200 de contado, o 12 cuotas de $690. Puedes ahorrar $1 200 al mes. Ya pagas $2 500 de otras deudas y tu capacidad de pago es de $3 000. Las cifras son de ejemplo. ¿Qué conviene?</p>
      <ol class="pasos-ej">
        <li>Calcula el total a crédito: 690 × 12 = $8 280. El crédito cuesta 8 280 − 7 200 = $1 080.</li>
        <li>Revisa si la cuota cabe: 2 500 + 690 = $3 190, más que tus $3 000. No cabe.</li>
        <li>Calcula cuánto tardas ahorrando: 7 200 ÷ 1 200 = 6 meses.</li>
        <li>Compara: esperas 6 meses, pero no pagas $1 080 de más ni te pasas de tu capacidad de pago.</li>
        <li>Comprueba: 1 200 × 6 = 7 200.</li>
      </ol>
      <p>Resultado: <span class="resultado">ahorrando la compras en 6 meses y te ahorras $1 080</span>.</p>
      <p class="nota"><strong>Error común:</strong> decidir porque la cuota "es poquito", sin sumarla a las que ya pagas.</p>`,
    vidaReal: `
      <p>Unas cuantas preguntas a tiempo te ahorran meses de pagos:</p>
      <ul>
        <li>En una tienda, frente a una oferta a meses, sabes qué preguntarte antes de firmar.</li>
        <li>Pagas la despensa y los servicios con tu dinero del mes, no con un préstamo.</li>
        <li>Cuando surge un gasto inesperado, tienes un ahorro en lugar de pedir prestado.</li>
        <li>Te das cuenta a tiempo cuando varias cuotas pequeñas ya suman demasiado.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tienes tres compras a meses de $450, $380 y $520. ¿Cuánto pagas al mes por ellas?</p>', respuesta: 450 + 380 + 520,
        pista: '<p>Suma las tres cuotas.</p>',
        solucion: '<p>450 + 380 + 520 = <strong>$1 350</strong> al mes.</p>' },
      { tipo: 'numero', enunciado: '<p>Un celular cuesta $5 400. Si ahorras $900 al mes, ¿en cuántos meses lo juntas?</p>', respuesta: 5400 / 900,
        pista: '<p>Divide el precio entre lo que ahorras al mes.</p>',
        solucion: '<p>5 400 ÷ 900 = <strong>6 meses</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>El mismo celular se ofrece en 12 cuotas de $520. ¿Cuánto pagarías de más que de contado?</p>', respuesta: 520 * 12 - 5400,
        pista: '<p>Calcula el total de las cuotas y réstale el precio de contado.</p>',
        solucion: '<p>520 × 12 = 6 240, y 6 240 − 5 400 = <strong>$840</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la CONDUSEF, ¿cuál de estas es un ejemplo de deuda mala?</p>',
        opciones: ['Pagar la despensa y los servicios con la tarjeta de crédito', 'Comparar precios antes de comprar', 'Ahorrar para una compra grande'], correcta: 0,
        pista: '<p>Busca un gasto de todos los días pagado con crédito.</p>',
        solucion: '<p><strong>Pagar la despensa y los servicios con la tarjeta.</strong> Son gastos que se repiten y deben salir del presupuesto.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una tienda ofrece un aparato "a meses sin intereses". Según Finanzas para todos, ¿qué es cierto?</p>',
        opciones: ['Nunca tiene ningún costo', 'Su costo no es necesariamente cero, y además es una cuota más que se suma a tus pagos', 'Siempre es más caro que pagar de contado'], correcta: 1,
        pista: '<p>"Sin intereses" no quiere decir "sin costo".</p>',
        solucion: '<p><strong>Su costo no es necesariamente cero</strong>, porque puede haber comisiones y otros gastos, y suma una cuota más a tu mes.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama una compra que no planeabas y que haces por un antojo del momento?</p>',
        respuestas: ['compra por impulso', 'una compra por impulso', 'compras por impulso', 'compra impulsiva', 'una compra impulsiva'],
        pista: '<p>Son tres palabras: "compra por…".</p>',
        solucion: '<p>Una <strong>compra por impulso</strong>.</p>' },
    ],
    fuentes: [REV_APUROS, REV_BUENAS, FPT_DEUDAS],
  });

  // ------------------------------------------------------------------
  const PERSONAS = barras({
    etiquetas: ['Persona A', 'Persona B', 'Persona C'], valores: [20, 32, 45], max: 45, paso: 1e9,
    descripcion: 'Gráfica de barras de la razón de endeudamiento de tres personas de ejemplo, en porcentaje. Persona A: 20, por debajo de las referencias. Persona B: 32, por encima del 30% de la CONDUSEF. Persona C: 45, por encima también del 40% que citan algunos expertos en España.',
  });

  L('Señales de que tienes demasiadas deudas', {
    objetivo: 'Reconocer las señales de alerta de un exceso de deudas y calcular tu razón de endeudamiento para compararla con las referencias.',
    explicacion: `
      <p>Las deudas casi nunca se vuelven un problema de un día para otro. Casi siempre dan señales antes. Reconocerlas a tiempo te da más opciones para resolverlas.</p>
      <h3>Señales de alerta</h3>
      <p>A partir de lo que advierten la CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, y Finanzas para todos, del Banco de España y la CNMV, estas son algunas señales de que tus deudas ya pesan demasiado:</p>
      <ul>
        <li>Pagas solo el mínimo de tus tarjetas, mes tras mes.</li>
        <li>Usas un préstamo o una tarjeta para pagar otra deuda.</li>
        <li>Ya no logras ahorrar, y llegar a fin de mes es una angustia.</li>
        <li>Usas el crédito para gastos de todos los días, como la despensa.</li>
        <li>Te atrasas en algún pago o te llaman para cobrarte.</li>
        <li>No sabes con exactitud cuánto debes en total.</li>
      </ul>
      <p>Si te identificas con varias, no es motivo para desesperarte: es una señal para revisar tus números. También cuenta cómo te sientes. La CONDUSEF explica que el estrés por dinero puede causar ansiedad, problemas para dormir y dolores de cabeza.</p>
      <h3>Una medida: la razón de endeudamiento</h3>
      <p>Además de las señales, puedes medir. La <strong>razón de endeudamiento</strong> es qué parte de tu ingreso se va en pagar deudas:</p>
      <p><strong>razón de endeudamiento = pagos de deudas al mes ÷ ingreso neto al mes × 100</strong></p>
      <p>Se lee "qué porcentaje de lo que ganas se va en deudas". En los pagos cuentas todas las cuotas: préstamos, tarjetas, hipoteca y compras a meses. Usa el ingreso neto, el que llega a tu bolsillo, como en "Cómo leer tu recibo de sueldo".</p>
      <p>¿Cuánto es demasiado? No hay un número único. La CONDUSEF, en México, usa como referencia que los pagos de deudas no pasen del 30% de tu ingreso neto. Finanzas para todos, en España, cita a expertos que ponen el límite en 40%, y a otros que lo ponen en 35%, contando la hipoteca. Toma estas cifras como referencias, no como una ley, y revisa las que se usan en tu país.</p>
      ${PERSONAS}
      <p>Fíjate que la razón no lo dice todo, y no te califica como persona: es solo una forma de ver tus números. Alguien con 25% puede estar en apuros si sus gastos necesarios son muy altos. Por eso conviene mirarla junto con tu capacidad de pago, como en "Qué es una deuda y cuándo se vuelve un problema".</p>
      <p class="nota"><strong>Trampa común:</strong> calcular la razón con el sueldo bruto. Como ese dinero no llega completo a tu bolsillo, el porcentaje sale más bajo que el real.</p>`,
    ejemplo: `
      <p>Tu ingreso neto es de $12 000. Pagas $1 200 de tarjeta, $1 800 de un préstamo y $600 de una compra a meses. Las cifras son de ejemplo. ¿Cuál es tu razón de endeudamiento?</p>
      <ol class="pasos-ej">
        <li>Suma todos los pagos de deudas: 1 200 + 1 800 + 600 = $3 600.</li>
        <li>Divide entre el ingreso neto: 3 600 ÷ 12 000 = 0.30.</li>
        <li>Pásalo a porcentaje: 0.30 × 100 = 30%.</li>
        <li>Compara con las referencias: estás justo en el 30% de la CONDUSEF, así que cualquier deuda nueva te dejaría por encima.</li>
        <li>Comprueba al revés: el 30% de 12 000 es 3 600, la suma de tus pagos.</li>
      </ol>
      <p>Resultado: <span class="resultado">tu razón de endeudamiento es de 30%</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar las compras a meses o los pagos pequeños. Todos cuentan.</p>`,
    vidaReal: `
      <p>Revisar tus deudas a tiempo te da margen para corregir:</p>
      <ul>
        <li>En cinco minutos, con una división, sabes si tus deudas pesan demasiado.</li>
        <li>Antes de aceptar un crédito nuevo, ves cuánto subiría lo que pagas cada mes.</li>
        <li>Reconoces las señales en ti, y también puedes ayudar a alguien de tu familia a verlas.</li>
        <li>Actúas antes de atrasarte, cuando todavía tienes más opciones.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tu ingreso neto es de $15 000 y tus pagos de deudas suman $4 800 al mes. ¿Cuál es tu razón de endeudamiento, en porcentaje?</p>', respuesta: 4800 / 15000 * 100,
        pista: '<p>Divide los pagos entre el ingreso neto y multiplica por 100.</p>',
        solucion: '<p>4 800 ÷ 15 000 = 0.32, es decir, <strong>32%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu ingreso neto es de $9 000. ¿Cuánto es lo máximo que podrías pagar de deudas al mes para no pasar del 30%?</p>', respuesta: 9000 * 0.3,
        pista: '<p>Saca el 30% de 9 000.</p>',
        solucion: '<p>El 10% de 9 000 es 900, así que el 30% es <strong>$2 700</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu ingreso neto es de $10 000 y hoy pagas $2 500 de deudas. Si aceptas un crédito nuevo con una cuota de $900, ¿cuál será tu razón de endeudamiento, en porcentaje?</p>', respuesta: (2500 + 900) / 10000 * 100,
        pista: '<p>Suma la cuota nueva a lo que ya pagas y divide entre el ingreso.</p>',
        solucion: '<p>2 500 + 900 = 3 400, y 3 400 ÷ 10 000 = 0.34, es decir, <strong>34%</strong>: pasarías del 25% a estar por encima del 30%.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas es una señal de alerta?</p>',
        opciones: ['Pagar el total de la tarjeta cada mes', 'Usar una tarjeta para pagar otra deuda', 'Tener una hipoteca cuya cuota cabe en tu presupuesto'], correcta: 1,
        pista: '<p>Busca la opción en la que una deuda se paga con otra.</p>',
        solucion: '<p><strong>Usar una tarjeta para pagar otra deuda.</strong> Es el círculo de pedir prestado para pagar.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Con qué ingreso se calcula la razón de endeudamiento?</p>',
        opciones: ['Con el ingreso neto, el que llega a tu bolsillo', 'Con el sueldo bruto', 'Con el ingreso del mejor mes del año'], correcta: 0,
        pista: '<p>Usa el dinero que de verdad tienes para pagar.</p>',
        solucion: '<p><strong>Con el ingreso neto.</strong> Con el bruto, el porcentaje saldría más bajo que el real.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el porcentaje de tu ingreso que se va en pagar deudas?</p>',
        respuestas: ['razón de endeudamiento', 'la razón de endeudamiento', 'nivel de endeudamiento', 'ratio de endeudamiento', 'índice de endeudamiento'],
        pista: '<p>Son tres palabras: "razón de…".</p>',
        solucion: '<p>La <strong>razón de endeudamiento</strong>.</p>' },
    ],
    fuentes: [REV_SALIR, REV_BUENAS, REV_ESTRES, FPT_DEUDAS],
  });

  // ------------------------------------------------------------------
  L('Haz la lista de todas tus deudas', {
    objetivo: 'Hacer una lista completa de tus deudas con acreedor, saldo, tasa, pago mínimo y fecha, y calcular el total, los mínimos y lo que puedes pagar de más.',
    explicacion: `
      <p>Imagina que guardas tus estados de cuenta en cajones distintos, recibes avisos por correo y por mensaje, y no recuerdas cuánto debes en total. Así es muy difícil hacer un plan. La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, lo dice con una imagen: antes de decidir nada, necesitas saber el tamaño del monstruo.</p>
      <h3>Qué anotar</h3>
      <p>Reúne tus estados de cuenta y tus contratos, y haz una tabla con una fila por deuda. La CONDUSEF recomienda anotar de cada una:</p>
      <ul>
        <li>El <strong>acreedor</strong>, que es la persona o la institución a la que le debes: un banco, una tienda o un familiar.</li>
        <li>El <strong>saldo</strong>, que es cuánto debes hoy en total, no lo que pagas al mes.</li>
        <li>La tasa de interés o el costo anual total, como viste en "El costo total de un crédito".</li>
        <li>El pago mínimo o la cuota de cada mes.</li>
        <li>La fecha límite de pago.</li>
      </ul>
      <p>Si te falta un dato, búscalo en el estado de cuenta o pregúntalo directamente a quien te prestó. Incluye también lo que les debes a familiares o amistades, aunque no cobren intereses: también es un compromiso.</p>
      <h3>Una lista de ejemplo</h3>
      <p>Esta es la lista que usaremos en las siguientes lecciones. Las cifras son de ejemplo, y para compararlas todas las tasas están por mes:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Deuda</th><th>Saldo</th><th>Tasa al mes</th><th>Pago mínimo</th><th>Fecha límite</th></tr>
        <tr><th>Tienda departamental</th><td>$2 000</td><td>3%</td><td>$100</td><td>Día 5</td></tr>
        <tr><th>Tarjeta de crédito</th><td>$8 000</td><td>4%</td><td>$400</td><td>Día 12</td></tr>
        <tr><th>Préstamo personal</th><td>$5 000</td><td>2%</td><td>$300</td><td>Día 20</td></tr>
      </table></div>
      <h3>Tres números que vas a usar</h3>
      <p>Con la tabla completa puedes sacar tres números:</p>
      <ol>
        <li>El total que debes, que es la suma de los saldos.</li>
        <li>Lo que pagas al mes como mínimo, que es la suma de los pagos mínimos.</li>
        <li>Lo que puedes pagar de más, que es lo que tu presupuesto deja libre después de los mínimos, como viste en "Hacer tu primer presupuesto".</li>
      </ol>
      <p>Con esos tres números, en "Método bola de nieve" y "Método avalancha" decidirás en qué orden pagar.</p>
      <h3>Mírala sin miedo</h3>
      <p>Ver todo junto puede asustar, y es normal. Pero un número que conoces se puede atacar; uno que ignoras sigue creciendo en silencio. Pon la lista donde la veas y actualízala cada mes, cuando lleguen los estados de cuenta. Ver cómo bajan los saldos también motiva.</p>
      <p class="nota"><strong>Trampa común:</strong> anotar solo el pago mensual y no el saldo. Con el pago sabes cuánto sale este mes; con el saldo sabes cuánto falta para terminar.</p>`,
    ejemplo: `
      <p>Con la lista de ejemplo, y sabiendo que tu presupuesto te permite pagar $1 400 al mes en deudas, saca los tres números y el interés del primer mes.</p>
      <ol class="pasos-ej">
        <li>Suma los saldos: 2 000 + 8 000 + 5 000 = $15 000 en total.</li>
        <li>Suma los mínimos: 100 + 400 + 300 = $800 al mes.</li>
        <li>Calcula lo que puedes pagar de más: 1 400 − 800 = $600 al mes.</li>
        <li>Calcula el interés del primer mes de cada deuda: tienda, 0.03 × 2 000 = $60; tarjeta, 0.04 × 8 000 = $320; préstamo, 0.02 × 5 000 = $100.</li>
        <li>Súmalos: 60 + 320 + 100 = $480. De tus $800 en mínimos, $480 se van en intereses.</li>
      </ol>
      <p>Resultado: <span class="resultado">debes $15 000, pagas $800 de mínimos y puedes poner $600 extra</span>.</p>
      <p class="nota"><strong>Error común:</strong> sumar las tasas, 3% + 4% + 2% = 9%, como si fueran una sola. Cada tasa se aplica solo a su propio saldo.</p>`,
    vidaReal: `
      <p>Tener todas tus deudas en una sola hoja te da control:</p>
      <ul>
        <li>Sabes cuánto debes en total y a quién, sin tener que buscar papeles.</li>
        <li>No se te pasa ninguna fecha de pago, porque las tienes todas juntas.</li>
        <li>Puedes explicar tu situación con claridad si decides pedir ayuda o negociar.</li>
        <li>Cada mes ves avanzar los números, y eso ayuda a seguir.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tus saldos son $3 500, $6 200 y $1 300. ¿Cuánto debes en total?</p>', respuesta: 3500 + 6200 + 1300,
        pista: '<p>Suma los tres saldos.</p>',
        solucion: '<p>3 500 + 6 200 + 1 300 = <strong>$11 000</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Sus pagos mínimos son $175, $310 y $65. ¿Cuánto pagas al mes como mínimo?</p>', respuesta: 175 + 310 + 65,
        pista: '<p>Suma los tres pagos mínimos.</p>',
        solucion: '<p>175 + 310 + 65 = <strong>$550</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu presupuesto te permite pagar $1 000 al mes en deudas, y los mínimos suman $550. ¿Cuánto puedes pagar de más?</p>', respuesta: 1000 - 550,
        pista: '<p>Resta los mínimos a lo que puedes pagar.</p>',
        solucion: '<p>1 000 − 550 = <strong>$450</strong> al mes.</p>' },
      { tipo: 'numero', enunciado: '<p>Una de esas deudas tiene un saldo de $6 200 y una tasa de 4% al mes. ¿Cuánto interés genera en un mes?</p>', respuesta: 6200 * 0.04,
        pista: '<p>Saca el 4% de 6 200.</p>',
        solucion: '<p>0.04 × 6 200 = <strong>$248</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es el saldo de una deuda?</p>',
        opciones: ['Lo que pagas cada mes', 'Lo que debes hoy en total', 'La tasa de interés que te cobran'], correcta: 1,
        pista: '<p>Es lo que te falta para terminar de pagar.</p>',
        solucion: '<p><strong>Lo que debes hoy en total.</strong> El pago mensual es otra cosa.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la persona o institución a la que le debes dinero?</p>',
        respuestas: ['acreedor', 'el acreedor', 'acreedora', 'la acreedora', 'acreedores', 'los acreedores'],
        pista: '<p>Viene de "crédito": es quien te dio el crédito.</p>',
        solucion: '<p>El <strong>acreedor</strong>.</p>' },
    ],
    fuentes: [REV_TERMINA, REV_SALIR, REV_ESTRES],
  });

  // ------------------------------------------------------------------
  const BOLA = diagrama([0, 12], [0, 5], [
    caja(0.3, 2.0, 2.9, 3.4), txt(1.6, 3.0, 'tienda'), txt(1.6, 2.4, '$700 al mes'),
    caja(3.7, 1.6, 7.1, 3.8), txt(5.4, 3.0, 'préstamo'), txt(5.4, 2.4, '$1 000 al mes'),
    caja(7.9, 1.2, 11.8, 4.2, true), txt(9.85, 3.0, 'tarjeta'), txt(9.85, 2.4, '$1 400 al mes'),
    ...flecha([2.95, 2.7], [3.65, 2.7], 0, 1.2), ...flecha([7.15, 2.7], [7.85, 2.7], 0, 1.2),
    txt(1.6, 1.3, 'meses 1 a 4'), txt(5.4, 0.9, 'meses 5 a 8'), txt(9.85, 0.5, 'meses 9 a 14'),
  ], 'Tres cajas de tamaño creciente, unidas por flechas, como una bola de nieve que crece. La primera, pequeña: "tienda, $700 al mes", meses 1 a 4. La segunda, mediana: "préstamo, $1 000 al mes", meses 5 a 8. La tercera, grande y sombreada: "tarjeta, $1 400 al mes", meses 9 a 14.');

  L('Método bola de nieve', {
    objetivo: 'Aplicar el método bola de nieve: pagar los mínimos, poner el extra en la deuda de menor saldo y pasar lo que se libera a la siguiente.',
    explicacion: `
      <p>Imagina una bola de nieve que ruedas cuesta abajo: empieza pequeña, pero en cada vuelta se le pega más nieve y crece. Con tus deudas puedes hacer algo parecido. Lo que crece no es la deuda, sino el dinero con el que la pagas.</p>
      <h3>Cómo funciona</h3>
      <p>El <strong>método bola de nieve</strong> consiste en pagar primero la deuda con el saldo más pequeño, sin importar su tasa. Las extensiones de las universidades de Wisconsin y de Illinois, en Estados Unidos, lo explican así:</p>
      <ol>
        <li>Paga el mínimo en todas tus deudas, para no atrasarte en ninguna.</li>
        <li>Todo el dinero extra que tengas va a la deuda con el saldo más pequeño.</li>
        <li>Cuando la terminas, lo que pagabas por ella se suma al pago de la siguiente más pequeña. Y así hasta la última.</li>
      </ol>
      <p>Fíjate en el paso 3. Ahí está el truco: el dinero que liberas no se gasta, se pasa a la siguiente deuda. Por eso el pago crece como una bola de nieve.</p>
      ${BOLA}
      <h3>Por qué funciona</h3>
      <p>Según la extensión de Illinois, su ventaja es la motivación: terminar pronto una deuda te da una victoria que se nota y te anima a seguir. Además, con menos deudas abiertas es más fácil organizarte y no olvidar pagos.</p>
      <p>Su desventaja es el costo. Como no mira las tasas, puede dejar para el final la deuda más cara, que mientras tanto sigue cobrando intereses altos. La extensión de Illinois cita un estudio según el cual, en promedio, los hogares que usan este método pagan entre 1.8% y 4.3% más en intereses. En "Bola de nieve o avalancha: cuál elegir" lo compararás con números.</p>
      <h3>Un ejemplo pequeño</h3>
      <p>Imagina dos deudas sin intereses, para ver solo el movimiento del dinero: una de $600 con pago de $100 y otra de $1 500 con pago de $100, y $200 extra al mes. La pequeña recibe 100 + 200 = $300 al mes y se termina en 2 meses. Desde el mes 3, la grande recibe su pago más los $300 que se liberaron: $400 al mes. Fíjate que nunca pagaste más de $400 al mes en total; solo cambió a dónde iba el dinero.</p>
      <h3>Lo que necesitas</h3>
      <p>Para usarlo necesitas tu lista de "Haz la lista de todas tus deudas", ordenada de menor a mayor saldo, y una cantidad extra cada mes, aunque sea pequeña. Si un mes no puedes poner extra, paga al menos los mínimos y retoma el plan al mes siguiente.</p>
      <p class="nota"><strong>Trampa común:</strong> gastar el dinero que se libera al terminar una deuda. Si dejas de pasarlo a la siguiente, la bola deja de crecer y el método pierde su fuerza.</p>`,
    ejemplo: `
      <p>Usa la lista de ejemplo: tienda, $2 000 al 3% mensual con mínimo de $100; préstamo, $5 000 al 2% con $300; tarjeta, $8 000 al 4% con $400. Pagas $1 400 al mes en total y no haces compras nuevas.</p>
      <ol class="pasos-ej">
        <li>Ordena por saldo, de menor a mayor: tienda, préstamo y tarjeta.</li>
        <li>Pagas los mínimos, y los $600 extra van a la tienda, que recibe 100 + 600 = $700 al mes. Queda pagada en el mes 4.</li>
        <li>Ahora el préstamo recibe su mínimo más lo que pagabas a la tienda: 300 + 700 = $1 000 al mes. Queda pagado en el mes 8.</li>
        <li>Al final, la tarjeta recibe todo: 400 + 1 000 = $1 400 al mes. Queda pagada en el mes 14.</li>
        <li>Comprueba: el total al mes nunca cambió, 100 + 400 + 300 + 600 = $1 400.</li>
      </ol>
      <p>Resultado: <span class="resultado">todo pagado en 14 meses, con la primera deuda terminada en el mes 4 y unos $4 080 de intereses</span>.</p>
      <p class="nota"><strong>Error común:</strong> dejar de pagar el mínimo de las otras deudas para terminar más rápido la pequeña. Eso causa atrasos y recargos.</p>`,
    vidaReal: `
      <p>Un plan sencillo, con victorias pronto, ayuda a no abandonar:</p>
      <ul>
        <li>Si te cuesta mantener un plan, ver una deuda terminada en pocos meses te anima a seguir.</li>
        <li>Con menos pagos abiertos, es más difícil que se te pase una fecha.</li>
        <li>Sabes qué hacer con el dinero que se libera al terminar un pago.</li>
        <li>Puedes empezar hoy, aunque solo tengas una cantidad extra pequeña.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Con el método bola de nieve, ¿qué deuda pagas primero?</p>',
        opciones: ['La de saldo más pequeño', 'La de tasa más alta', 'La más antigua'], correcta: 0,
        pista: '<p>La bola empieza pequeña.</p>',
        solucion: '<p><strong>La de saldo más pequeño</strong>, sin importar su tasa.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tienes tres deudas: A, saldo $4 000 al 5%; B, saldo $1 500 al 2%; C, saldo $9 000 al 3%. ¿En qué orden las pagas con bola de nieve?</p>',
        opciones: ['A, C, B', 'B, A, C', 'C, A, B'], correcta: 1,
        pista: '<p>Ordénalas solo por saldo, de menor a mayor.</p>',
        solucion: '<p><strong>B, A, C</strong>: $1 500, $4 000 y $9 000.</p>' },
      { tipo: 'numero', enunciado: '<p>Terminas una deuda cuyo mínimo era $250 y a la que ponías $500 extra. La siguiente tiene un mínimo de $400. ¿Cuánto le pagas ahora al mes?</p>', respuesta: 400 + 250 + 500,
        pista: '<p>Suma su mínimo y todo lo que pagabas a la deuda que terminaste.</p>',
        solucion: '<p>400 + 250 + 500 = <strong>$1 150</strong> al mes.</p>' },
      { tipo: 'numero', enunciado: '<p>Le debes $1 200 a un familiar que no cobra intereses, y le pagas $300 al mes. ¿En cuántos meses terminas?</p>', respuesta: 1200 / 300,
        pista: '<p>Sin intereses, basta con dividir.</p>',
        solucion: '<p>1 200 ÷ 300 = <strong>4 meses</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En el ejemplo de la lección, ¿en qué mes quedó pagada la primera deuda?</p>', respuesta: 4,
        pista: '<p>Revisa el paso 2 del ejemplo.</p>',
        solucion: '<p>En el <strong>mes 4</strong>: la tienda, que era la de saldo más pequeño.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el método que paga primero la deuda de saldo más pequeño?</p>',
        respuestas: ['bola de nieve', 'método bola de nieve', 'el método bola de nieve', 'la bola de nieve', 'método de bola de nieve', 'método de la bola de nieve'],
        pista: '<p>Empieza pequeña y crece al rodar.</p>',
        solucion: '<p>El <strong>método bola de nieve</strong>.</p>' },
    ],
    fuentes: [WISC, ILLINOIS],
  });

  // ------------------------------------------------------------------
  L('Método avalancha', {
    objetivo: 'Aplicar el método avalancha: pagar los mínimos y poner el extra en la deuda de tasa más alta, y comparar tasas en la misma unidad.',
    explicacion: `
      <p>Ahora piensa en una avalancha: empieza en lo más alto de la montaña y baja con toda su fuerza. Este método también empieza por lo más alto, pero no por el saldo más grande, sino por la tasa de interés más alta.</p>
      <h3>Cómo funciona</h3>
      <p>En el <strong>método avalancha</strong> pagas primero la deuda más cara, la que tiene la tasa de interés más alta. La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, lo describe así:</p>
      <ol>
        <li>Haz una lista de todas tus deudas con su saldo, su acreedor y su tasa de interés o su costo anual total.</li>
        <li>Ordénalas de la tasa más alta a la más baja.</li>
        <li>Paga el mínimo en todas, y todo lo extra va a la de tasa más alta.</li>
        <li>Cuando la terminas, repites el proceso con la siguiente.</li>
      </ol>
      <p>Igual que en la bola de nieve, el dinero que se libera al terminar una deuda pasa a la siguiente. Lo único que cambia es el orden.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Orden</th><th>Deuda</th><th>Tasa al mes</th><th>Saldo</th></tr>
        <tr><th>1</th><td>Tarjeta de crédito</td><td>4%</td><td>$8 000</td></tr>
        <tr><th>2</th><td>Tienda departamental</td><td>3%</td><td>$2 000</td></tr>
        <tr><th>3</th><td>Préstamo personal</td><td>2%</td><td>$5 000</td></tr>
      </table></div>
      <h3>Por qué es el más barato</h3>
      <p>Recuerda "Interés compuesto: la fuerza del tiempo": cada mes, la deuda más cara es la que más intereses suma. Si la pagas primero, dejas de alimentar justo esa. Por eso la CONDUSEF dice que ordenar por tasa es la mejor estrategia en términos financieros, y la extensión de la Universidad de Illinois lo describe como la forma más económica de reducir deudas.</p>
      <p>Su desventaja, según la extensión de Illinois, es la motivación: si la deuda más cara también es grande, puedes tardar meses en ver la primera terminada, y es más fácil desanimarse.</p>
      <h3>Comparar tasas bien</h3>
      <p>Para ordenar, compara tasas del mismo tipo y del mismo periodo: todas por mes o todas por año. Si una deuda dice 3% al mes y otra 30% al año, primero ponlas en la misma unidad. Una forma rápida es multiplicar la tasa mensual por 12: 3% al mes es alrededor de 36% al año, y en realidad algo más, por el interés compuesto. Lo más sencillo es usar el costo anual total de cada deuda, que viste en "El costo total de un crédito".</p>
      <p class="nota"><strong>Trampa común:</strong> ordenar por el pago mínimo más alto en lugar de por la tasa. Que una deuda pida un pago grande no quiere decir que sea la más cara.</p>`,
    ejemplo: `
      <p>Usa la misma lista de ejemplo y los mismos $1 400 al mes que en "Método bola de nieve", ahora ordenada por tasa.</p>
      <ol class="pasos-ej">
        <li>Ordena de la tasa más alta a la más baja: tarjeta (4%), tienda (3%) y préstamo (2%).</li>
        <li>Pagas los mínimos y los $600 extra van a la tarjeta, que recibe 400 + 600 = $1 000 al mes. Queda pagada en el mes 10.</li>
        <li>Luego la tienda recibe su mínimo más lo de la tarjeta: 100 + 1 000 = $1 100 al mes. Como ya bajó con sus mínimos, queda pagada en el mes 12.</li>
        <li>Al final, el préstamo recibe todo y queda pagado en el mes 14.</li>
        <li>Comprueba: el total al mes sigue siendo 100 + 400 + 300 + 600 = $1 400; solo cambió el orden.</li>
      </ol>
      <p>Resultado: <span class="resultado">todo pagado en 14 meses, con la primera deuda terminada en el mes 10 y unos $3 380 de intereses</span>.</p>
      <p class="nota"><strong>Error común:</strong> comparar una tasa mensual con una anual sin ponerlas en la misma unidad. Un 4% al mes es mucho más que un 30% al año.</p>`,
    vidaReal: `
      <p>Elegir el orden con cuidado te ahorra dinero real:</p>
      <ul>
        <li>Pagas menos intereses en total con el mismo dinero de cada mes.</li>
        <li>Si eres constante, aunque no veas resultados rápidos, este orden te favorece.</li>
        <li>Aprendes a leer la tasa de cada deuda y a compararlas bien.</li>
        <li>Entiendes por qué la tarjeta más cara merece primero tu dinero extra, aunque no siempre sea la deuda más grande.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Con el método avalancha, ¿qué deuda pagas primero?</p>',
        opciones: ['La de saldo más pequeño', 'La de tasa de interés más alta', 'La de pago mínimo más bajo'], correcta: 1,
        pista: '<p>La avalancha empieza por lo más alto… de la tasa.</p>',
        solucion: '<p><strong>La de tasa de interés más alta</strong>, porque es la que más intereses suma cada mes.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tienes tres deudas: A, saldo $4 000 al 5%; B, saldo $1 500 al 2%; C, saldo $9 000 al 3%. ¿En qué orden las pagas con avalancha?</p>',
        opciones: ['A, C, B', 'B, A, C', 'C, A, B'], correcta: 0,
        pista: '<p>Ordénalas solo por tasa, de mayor a menor.</p>',
        solucion: '<p><strong>A, C, B</strong>: 5%, 3% y 2%.</p>' },
      { tipo: 'numero', enunciado: '<p>Una deuda cobra 3% al mes. Si multiplicas por 12, ¿alrededor de qué porcentaje es al año?</p>', respuesta: 3 * 12,
        pista: '<p>Multiplica la tasa mensual por los 12 meses.</p>',
        solucion: '<p>3 × 12 = <strong>36%</strong> al año, aproximadamente; con el interés compuesto es un poco más.</p>' },
      { tipo: 'numero', enunciado: '<p>En la lista de ejemplo, la tarjeta tiene $8 000 al 4% y el préstamo $5 000 al 2%. ¿Cuánto más interés genera la tarjeta que el préstamo en el primer mes?</p>', respuesta: 8000 * 0.04 - 5000 * 0.02,
        pista: '<p>Calcula el interés de cada una y réstalos.</p>',
        solucion: '<p>La tarjeta genera 320 y el préstamo 100. La diferencia es <strong>$220</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En el ejemplo de la lección, ¿en qué mes quedó pagada la tarjeta?</p>', respuesta: 10,
        pista: '<p>Revisa el paso 2 del ejemplo.</p>',
        solucion: '<p>En el <strong>mes 10</strong>. Tardó más que la primera deuda de la bola de nieve, pero era la más cara.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el método que paga primero la deuda con la tasa de interés más alta?</p>',
        respuestas: ['avalancha', 'método avalancha', 'el método avalancha', 'la avalancha', 'método de avalancha', 'método de la avalancha'],
        pista: '<p>Empieza en lo más alto de la montaña.</p>',
        solucion: '<p>El <strong>método avalancha</strong>.</p>' },
    ],
    fuentes: [REV_ESTRES, REV_SALIR, ILLINOIS, WISC],
  });

  // ------------------------------------------------------------------
  const COMPARA = barras({
    etiquetas: ['bola de nieve', 'avalancha'], valores: [4080, 3380], max: 4080, paso: 1e9,
    descripcion: 'Gráfica de barras de los intereses pagados con la lista de ejemplo y $1 400 al mes. Bola de nieve: unos 4080. Avalancha: unos 3380. Los dos métodos terminan en el mes 14.',
  });

  L('Bola de nieve o avalancha: cuál elegir', {
    objetivo: 'Comparar los resultados de los dos métodos con los mismos números y elegir el que te conviene según el costo y tu forma de ser.',
    explicacion: `
      <p>Ya conoces los dos métodos y los probaste con las mismas tres deudas. Ahora la pregunta es práctica: ¿cuál te conviene a ti? No hay una respuesta única, pero sí una forma clara de decidir.</p>
      <h3>Lo que dicen los números</h3>
      <p>Con la lista de ejemplo y los mismos $1 400 al mes, los resultados fueron estos:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Resultado</th><th>Bola de nieve</th><th>Avalancha</th></tr>
        <tr><th>Primera deuda terminada</th><td>Mes 4</td><td>Mes 10</td></tr>
        <tr><th>Todas terminadas</th><td>Mes 14</td><td>Mes 14</td></tr>
        <tr><th>Intereses pagados</th><td>$4 080</td><td>$3 380</td></tr>
      </table></div>
      ${COMPARA}
      <p>Fíjate en dos cosas. En este ejemplo los dos terminan en el mismo mes, pero la avalancha cuesta unos $700 menos de intereses. Y la bola de nieve da la primera victoria seis meses antes. Con otras deudas los resultados cambian: la diferencia crece cuando la deuda más cara es también la más grande, y casi desaparece cuando las tasas se parecen.</p>
      <h3>Lo que dicen los expertos</h3>
      <p>La extensión de la Universidad de Illinois lo resume así: la avalancha suele ser la forma más económica de pagar, y la bola de nieve ayuda con la motivación, aunque en promedio cuesta entre 1.8% y 4.3% más de intereses. Y agrega una idea importante: más que el método exacto, lo que importa es tener un plan para pagar tus deudas.</p>
      <h3>Cómo decidir</h3>
      <ul>
        <li>Si te cuesta mantener un plan, o tienes muchas deudas pequeñas, la bola de nieve puede ayudarte a no abandonar.</li>
        <li>Si eres constante y tu deuda más cara es grande, la avalancha te ahorra más dinero.</li>
        <li>Si las tasas son parecidas, la diferencia es pequeña, así que elige el que más te anime.</li>
        <li>Si una deuda cobra una tasa muchísimo más alta que las demás, el ahorro de empezar por ella suele pesar más.</li>
      </ul>
      <p>Una forma de verlo es como un precio: en el ejemplo, la motivación de la bola de nieve cuesta unos $700. Si para ti ver una deuda terminada en el mes 4 vale más que eso, porque sabes que así no abandonarás, es una elección razonable. Si prefieres ese dinero y confías en tu constancia, la avalancha es mejor.</p>
      <p>Lo que no cambia en ninguno de los dos: pagar siempre los mínimos, no hacer compras nuevas a crédito mientras pagas y pasar a la siguiente deuda el dinero que se libera. Si eliges uno y después quieres cambiar al otro, puedes hacerlo. Lo importante es no detenerte.</p>
      <p class="nota"><strong>Trampa común:</strong> pasar semanas buscando el método perfecto y no empezar ninguno. Cualquiera de los dos es mucho mejor que pagar solo los mínimos, como viste en "Tarjetas de crédito y la trampa del pago mínimo".</p>`,
    ejemplo: `
      <p>Con los resultados exactos de la simulación, $4 079.68 de intereses con bola de nieve y $3 380.20 con avalancha, ¿cuánto cuesta la motivación de la bola de nieve?</p>
      <ol class="pasos-ej">
        <li>Calcula la diferencia de intereses: 4 079.68 − 3 380.20 = $699.48.</li>
        <li>Ponla en contexto: es la mitad de un mes de tus pagos de $1 400.</li>
        <li>Calcula lo que pagas en total con cada uno, sumando los $15 000 que debías: 19 079.68 con bola de nieve y 18 380.20 con avalancha.</li>
        <li>Compara la motivación: con bola de nieve terminas la primera deuda en el mes 4; con avalancha, en el mes 10.</li>
        <li>Decide: si sabes que eres constante, la avalancha te ahorra unos $700; si temes desanimarte antes del mes 10, la bola de nieve puede valer ese costo.</li>
      </ol>
      <p>Resultado: <span class="resultado">la avalancha ahorra unos $699; la bola de nieve da la primera victoria seis meses antes</span>.</p>
      <p class="nota"><strong>Error común:</strong> comparar solo los meses. Aquí son iguales, pero el costo no.</p>`,
    vidaReal: `
      <p>Elegir con números y conociéndote te ayuda a terminar lo que empiezas:</p>
      <ul>
        <li>Eliges un método según cómo eres tú, no según lo que hace otra persona.</li>
        <li>Sabes calcular cuánto te cuesta, en dinero, la motivación de ver avances rápidos.</li>
        <li>Si un método no te funciona, puedes cambiar al otro sin empezar de cero.</li>
        <li>Puedes explicarle a tu familia por qué elegiste ese orden.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En el ejemplo, los intereses fueron $4 079.68 con bola de nieve y $3 380.20 con avalancha. ¿Cuánto te ahorras con la avalancha?</p>', respuesta: 4079.68 - 3380.2, tolerancia: 0.5,
        pista: '<p>Resta los intereses de la avalancha a los de la bola de nieve.</p>',
        solucion: '<p>4 079.68 − 3 380.20 = <strong>$699.48</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si debías $15 000 y pagaste $3 380.20 de intereses con avalancha, ¿cuánto pagaste en total?</p>', respuesta: 15000 + 3380.2, tolerancia: 0.5,
        pista: '<p>Suma la deuda inicial y los intereses.</p>',
        solucion: '<p>15 000 + 3 380.20 = <strong>$18 380.20</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Otra persona calcula $2 600 de intereses con bola de nieve y $2 450 con avalancha. ¿Cuánto ahorraría con avalancha?</p>', respuesta: 2600 - 2450,
        pista: '<p>Resta los dos montos.</p>',
        solucion: '<p>2 600 − 2 450 = <strong>$150</strong>. Con una diferencia tan pequeña, puede elegir el método que más ánimo le dé.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la extensión de la Universidad de Illinois, ¿cuál suele ser la forma más económica de pagar deudas?</p>',
        opciones: ['El método bola de nieve', 'El método avalancha', 'Pagar solo los mínimos'], correcta: 1,
        pista: '<p>¿Cuál ataca primero la deuda que más intereses cobra?</p>',
        solucion: '<p><strong>El método avalancha.</strong> La bola de nieve ayuda con la motivación, pero cuesta un poco más.</p>' },
      { tipo: 'opciones', enunciado: '<p>Te desanimas con facilidad y tienes cinco deudas pequeñas con tasas parecidas. ¿Qué método podría ayudarte más a no abandonar?</p>',
        opciones: ['El método bola de nieve', 'El método avalancha', 'Ninguno: mejor esperar a ganar más'], correcta: 0,
        pista: '<p>Con tasas parecidas, la diferencia de costo es pequeña.</p>',
        solucion: '<p><strong>La bola de nieve.</strong> Terminarás deudas pronto, y con tasas parecidas casi no pagarás de más.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué tienen en común los dos métodos?</p>',
        opciones: ['Dejar de pagar las deudas grandes al principio', 'Pedir un préstamo nuevo para empezar', 'Pagar siempre los mínimos y pasar a la siguiente deuda el dinero que se libera'], correcta: 2,
        pista: '<p>Solo cambia el orden; lo demás es igual.</p>',
        solucion: '<p><strong>Pagar siempre los mínimos y pasar a la siguiente deuda lo que se libera.</strong> Lo único distinto es el orden.</p>' },
    ],
    fuentes: [ILLINOIS, WISC, REV_SALIR],
  });

  // ------------------------------------------------------------------
  L('Negociar con tus acreedores', {
    objetivo: 'Prepararte para negociar con quien te prestó, conocer las opciones de reestructura y quita, y calcular cuánto cuesta en total un nuevo acuerdo.',
    explicacion: `
      <p>Sabes que el próximo mes no vas a poder pagar completa la cuota de un préstamo. Puedes esperar a que te llamen para cobrarte, o puedes llamar tú antes. La segunda opción suele darte más posibilidades.</p>
      <h3>Por qué conviene acercarte</h3>
      <p>A la institución le interesa recuperar su dinero, y a ti, poder pagarlo. Por eso la CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, recomienda que, si no puedes cubrir tus deudas, te acerques a la institución que te dio el crédito y le expliques tu situación, sin esperar a que tu cuenta llegue a cobranza. Según la CONDUSEF, muchas instituciones ofrecen opciones como estas:</p>
      <ul>
        <li>Una <strong>reestructura</strong>, que es cambiar las condiciones de tu crédito para que puedas pagarlo: por ejemplo, ampliar el plazo para bajar la cuota o reducir la tasa de interés por un tiempo.</li>
        <li>Una <strong>quita</strong>, que es un acuerdo en el que pagas de una sola vez una cantidad menor a la que debes y con eso terminas la deuda. La CONDUSEF advierte que, en México, una quita deja una mala nota en tu historial y puede hacer que otras instituciones no te presten hasta por 6 años.</li>
      </ul>
      <p>Ninguna opción es automática: dependen de cada institución y de tu caso. Y tienen un costo: ampliar el plazo baja la cuota, pero casi siempre sube el total que pagas, como viste en "Cómo comparar préstamos".</p>
      <h3>Antes de llamar</h3>
      <ol>
        <li>Ten a la mano tu lista de "Haz la lista de todas tus deudas".</li>
        <li>Revisa tu presupuesto y calcula cuánto puedes pagar de verdad cada mes. No prometas una cuota que no vas a poder sostener.</li>
        <li>Explica con claridad qué cambió, por ejemplo una baja en tus ingresos o una enfermedad, y propón una cantidad.</li>
        <li>Pregunta el costo total del nuevo acuerdo, no solo la nueva cuota.</li>
      </ol>
      <h3>Cuida la forma</h3>
      <p>La CONDUSEF recomienda negociar directamente con la institución, y no a través de otras empresas que se ofrecen como intermediarias. Pide que el acuerdo quede por escrito: en México, la CONDUSEF explica que los despachos de cobranza están obligados a documentar por escrito los acuerdos de pago, con sus términos y condiciones. Guarda una copia y anota la fecha y el nombre de quien te atendió.</p>
      <p>Si alguien te presiona con amenazas para aceptar un acuerdo, eso no es una negociación. Lo verás en "Préstamos abusivos, gota a gota y cobranza ilegal".</p>
      <p class="nota"><strong>Trampa común:</strong> esperar a estar muy atrasado para hablar. Cada mes de atraso suma intereses y recargos, y deja marca en tu historial, como viste en "Historial crediticio".</p>`,
    ejemplo: `
      <p>Te faltan 12 cuotas de $1 100 de un préstamo, pero tus ingresos bajaron y solo puedes pagar $900 al mes. La institución te ofrece una reestructura de 18 cuotas de $790. Las cifras son de ejemplo. ¿Te conviene?</p>
      <ol class="pasos-ej">
        <li>Revisa la cuota actual: $1 100 es más que los $900 que puedes pagar; no cabe.</li>
        <li>Revisa la oferta: $790 sí cabe, y te sobran 900 − 790 = $110.</li>
        <li>Calcula lo que te faltaba pagar: 1 100 × 12 = $13 200.</li>
        <li>Calcula el total con la reestructura: 790 × 18 = $14 220.</li>
        <li>El alivio cuesta 14 220 − 13 200 = $1 020 más. Puede convenirte si, de otro modo, ibas a atrasarte. Si aceptas, pide el acuerdo por escrito.</li>
      </ol>
      <p>Resultado: <span class="resultado">una cuota de $790 que sí cabe, con un costo extra de $1 020</span>.</p>
      <p class="nota"><strong>Error común:</strong> aceptar la primera cuota que te ofrecen sin preguntar cuánto pagarás en total.</p>`,
    vidaReal: `
      <p>Hablar a tiempo con quien te prestó puede evitarte problemas mayores:</p>
      <ul>
        <li>Si tus ingresos bajan, sabes que puedes llamar antes de atrasarte.</li>
        <li>Llegas a la llamada con números claros y una propuesta que de verdad puedes cumplir.</li>
        <li>Pides el acuerdo por escrito y guardas tus copias.</li>
        <li>Evitas pagarle a intermediarios que prometen arreglar tus deudas por ti a cambio de una comisión.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Te ofrecen cambiar 10 cuotas de $1 500 por 15 cuotas de $1 100. ¿Cuánto más pagarías en total?</p>', respuesta: 15 * 1100 - 10 * 1500,
        pista: '<p>Calcula el total de cada opción y réstalos.</p>',
        solucion: '<p>15 × 1 100 = 16 500 y 10 × 1 500 = 15 000. Pagarías <strong>$1 500</strong> más.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu capacidad de pago es de $1 200 al mes. Con la nueva cuota de $1 100, ¿cuánto te sobra?</p>', respuesta: 1200 - 1100,
        pista: '<p>Resta la cuota a tu capacidad de pago.</p>',
        solucion: '<p>1 200 − 1 100 = <strong>$100</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es una reestructura?</p>',
        opciones: ['Cambiar las condiciones del crédito, como el plazo o la tasa, para que puedas pagarlo', 'Dejar de pagar hasta que la institución te busque', 'Pedir un préstamo nuevo con otra institución'], correcta: 0,
        pista: '<p>Es el mismo crédito, con condiciones distintas.</p>',
        solucion: '<p><strong>Cambiar las condiciones del crédito</strong>, por ejemplo ampliar el plazo o bajar la tasa por un tiempo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la CONDUSEF, ¿con quién conviene negociar?</p>',
        opciones: ['Con una empresa intermediaria que cobra por negociar por ti', 'Directamente con la institución que te dio el crédito', 'Con cualquier persona que te llame ofreciendo arreglar tu deuda'], correcta: 1,
        pista: '<p>La CONDUSEF lo dice en su artículo sobre consolidación.</p>',
        solucion: '<p><strong>Directamente con la institución.</strong> Así evitas costos extra e intermediarios que no son tu acreedor.</p>' },
      { tipo: 'opciones', enunciado: '<p>Acordaste una nueva cuota por teléfono. ¿Qué haces?</p>',
        opciones: ['Confías en la palabra de quien te atendió', 'Esperas a ver si te cobran lo acordado', 'Pides el acuerdo por escrito y guardas una copia'], correcta: 2,
        pista: '<p>¿Cómo demostrarías lo que acordaron si hay un problema?</p>',
        solucion: '<p><strong>Pides el acuerdo por escrito y guardas una copia</strong>, con la fecha y el nombre de quien te atendió.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el acuerdo en que pagas de una sola vez menos de lo que debes para terminar la deuda?</p>',
        respuestas: ['quita', 'una quita', 'la quita'],
        pista: '<p>Es una palabra corta que viene de "quitar".</p>',
        solucion: '<p>Una <strong>quita</strong>. Ayuda a terminar la deuda, pero en México deja una mala nota en tu historial.</p>' },
    ],
    fuentes: [REV_HISTORIAL, REV_TERMINA, REV_CONSOLIDA, REV_DESPACHO, REV_SALIR],
  });

  // ------------------------------------------------------------------
  L('Consolidar deudas: cuándo conviene y cuándo no', {
    objetivo: 'Entender qué es consolidar deudas, revisar las condiciones para que convenga y comparar el total que pagarías con y sin consolidación.',
    explicacion: `
      <p>Ves un anuncio que dice "junta todas tus deudas en un solo pago". Suena a alivio: en lugar de tres fechas y tres estados de cuenta, uno solo. A veces conviene, y a veces solo cambia el problema de lugar.</p>
      <h3>Qué es consolidar</h3>
      <p>La <strong>consolidación de deudas</strong> consiste en pedir un solo crédito, a una institución que te ofrezca mejores condiciones, para pagar con él varias deudas que tienes en otras. Así quedas con una sola deuda y un solo pago al mes. Así lo explica la CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, que aclara además que ninguna institución está obligada a ofrecerla, y que tú tampoco tienes obligación de aceptarla.</p>
      <h3>Cuándo puede convenir</h3>
      <p>Según la CONDUSEF, una ventaja es el orden: es más fácil controlar una sola tarjeta que varias, con menos fechas de corte y de pago y menos comisiones anuales. Pero pone una condición clara: antes de consolidar, asegúrate de que la tasa de interés nueva sea más baja que la de tus deudas por separado.</p>
      <p>Con esa base, consolidar puede convenir cuando:</p>
      <ul>
        <li>La tasa o el costo anual total es menor que el de tus deudas actuales.</li>
        <li>El total que pagarás al final es menor que si siguieras con tus deudas como están.</li>
        <li>Dejas de usar las tarjetas que pagaste, para no volver a llenarlas.</li>
      </ul>
      <h3>Cuándo no conviene</h3>
      <p>La CONDUSEF advierte que, aunque el pago de cada mes baje, el plazo para terminar puede alargarse. En otro artículo agrega que pedir un préstamo nuevo para pagar los anteriores, sin un plan sólido, solo pospone el problema y compromete tus ingresos futuros. No conviene si:</p>
      <ul>
        <li>La tasa nueva es igual o más alta que la de tus deudas.</li>
        <li>La cuota baja solo porque el plazo es mucho más largo, y el total sube.</li>
        <li>Cobran comisiones, como la de apertura, que se comen el ahorro.</li>
        <li>Sigues usando las tarjetas viejas y terminas con la consolidación más deudas nuevas.</li>
      </ul>
      <p>Haz la cuenta como en "El costo total de un crédito": compara el total que pagarías con cada opción, no solo la cuota. Y, como recomienda la CONDUSEF, trata directamente con la institución, no con intermediarios.</p>
      <p>Recuerda también tu historial: pagar a tiempo el nuevo crédito lo cuida, como viste en "Historial crediticio".</p>
      <p class="nota"><strong>Trampa común:</strong> sentir que las deudas desaparecieron porque ya solo ves un pago. Lo que debes sigue siendo lo mismo; solo cambió de lugar.</p>`,
    ejemplo: `
      <p>Con la lista de ejemplo y el método avalancha pagarías $18 380 en total, en 14 meses, con hasta $1 400 al mes. Te ofrecen dos consolidaciones por los $15 000. La X: 24 cuotas de $800. La Y: 14 cuotas de $1 250. Las cifras son de ejemplo. ¿Alguna conviene?</p>
      <ol class="pasos-ej">
        <li>Calcula el total de la X: 800 × 24 = $19 200. La cuota baja, pero pagas 19 200 − 18 380 = $820 más y tardas 10 meses más.</li>
        <li>Calcula el total de la Y: 1 250 × 14 = $17 500. Pagas 18 380 − 17 500 = $880 menos en el mismo tiempo, con una cuota más baja que tus $1 400.</li>
        <li>Revisa las comisiones de la Y: si cobrara más de unos $880 por abrirla, dejaría de convenir.</li>
        <li>Si eliges la Y, deja de usar las tarjetas que pagaste.</li>
        <li>Comprueba la Y al revés: 17 500 ÷ 14 = 1 250.</li>
      </ol>
      <p>Resultado: <span class="resultado">la Y conviene, porque baja el total; la X no, aunque su cuota sea menor</span>.</p>
      <p class="nota"><strong>Error común:</strong> elegir la X porque su cuota es la más baja. Termina costando más que no consolidar.</p>`,
    vidaReal: `
      <p>Las ofertas de "un solo pago" se ven en todas partes; esto te ayuda a evaluarlas:</p>
      <ul>
        <li>Cuando te ofrezcan juntar tus deudas, sabes hacer la cuenta antes de aceptar.</li>
        <li>Comparas el total y el tiempo, no solo cuánto pagarás al mes.</li>
        <li>Si juntas tus deudas, dejas de usar las tarjetas que ya pagaste.</li>
        <li>Desconfías de quien te cobra por "arreglar" tus deudas sin ser quien te prestó.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una consolidación te ofrece 20 cuotas de $900. ¿Cuánto pagarías en total?</p>', respuesta: 20 * 900,
        pista: '<p>Multiplica la cuota por el número de cuotas.</p>',
        solucion: '<p>20 × 900 = <strong>$18 000</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si siguieras con tu plan actual pagarías $16 800 en total. ¿Cuánto más te costaría esa consolidación de $18 000?</p>', respuesta: 18000 - 16800,
        pista: '<p>Resta los dos totales.</p>',
        solucion: '<p>18 000 − 16 800 = <strong>$1 200</strong> más. No conviene.</p>' },
      { tipo: 'numero', enunciado: '<p>Otra oferta: 12 cuotas de $1 300, más una comisión de apertura de $400. ¿Cuánto pagarías en total?</p>', respuesta: 12 * 1300 + 400,
        pista: '<p>Suma todas las cuotas y la comisión.</p>',
        solucion: '<p>12 × 1 300 = 15 600, y 15 600 + 400 = <strong>$16 000</strong>: $800 menos que tu plan actual.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la CONDUSEF, ¿qué debes asegurar antes de consolidar?</p>',
        opciones: ['Que la tasa nueva sea más baja que la de tus deudas por separado', 'Que el plazo sea el más largo posible', 'Que te den una tarjeta nueva'], correcta: 0,
        pista: '<p>Si la tasa no baja, ¿qué ganas además del orden?</p>',
        solucion: '<p><strong>Que la tasa nueva sea más baja.</strong> Si no, solo cambias el problema de lugar.</p>' },
      { tipo: 'opciones', enunciado: '<p>Consolidaste tus deudas de tarjeta. ¿Qué ayuda a que no vuelvas a caer?</p>',
        opciones: ['Seguir usando las tarjetas viejas solo para compras pequeñas', 'Dejar de usar las tarjetas que pagaste y seguir tu presupuesto', 'Pedir otra consolidación cuando se vuelvan a llenar'], correcta: 1,
        pista: '<p>Si las tarjetas se vuelven a llenar, tendrás dos deudas en lugar de una.</p>',
        solucion: '<p><strong>Dejar de usar las tarjetas que pagaste</strong> y seguir tu presupuesto.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama juntar varias deudas en un solo crédito?</p>',
        respuestas: ['consolidación', 'consolidación de deudas', 'la consolidación', 'la consolidación de deudas', 'consolidar', 'consolidar deudas'],
        pista: '<p>Viene de "consolidar".</p>',
        solucion: '<p>La <strong>consolidación de deudas</strong>.</p>' },
    ],
    fuentes: [REV_CONSOLIDA, REV_TERMINA],
  });

  // ------------------------------------------------------------------
  const SIYNO = diagrama([0, 12], [0, 6.4], [
    caja(0.2, 0.2, 5.8, 6.2), txt(3, 5.6, 'sí pueden'),
    txt(3, 4.7, 'decir quiénes son'), txt(3, 3.9, 'decir cuánto debes'), txt(3, 3.1, 'tratarte con respeto'),
    txt(3, 2.3, 'llamar de 7:00 a 22:00 h'), txt(3, 1.5, 'dar acuerdos por escrito'), txt(3, 0.7, 'avisar de acciones legales'),
    caja(6.2, 0.2, 11.8, 6.2, true), txt(9, 5.6, 'no pueden'),
    txt(9, 4.7, 'amenazarte o insultarte'), txt(9, 3.9, 'cobrarles a tus vecinos'), txt(9, 3.1, 'fingir ser del gobierno'),
    txt(9, 2.3, 'imitar papeles judiciales'), txt(9, 1.5, 'llamar con número oculto'),
  ], 'Dos columnas sobre la cobranza en México, según la CONDUSEF. "Sí pueden": decir quiénes son, decir cuánto debes, tratarte con respeto, llamar de 7:00 a 22:00 horas, darte el acuerdo por escrito y avisarte de acciones legales reales. "No pueden", en la columna sombreada: amenazarte o insultarte, cobrarles a tus vecinos o a otras personas sin relación con la deuda, hacerse pasar por una oficina de gobierno, enviar documentos que parezcan de un juzgado y llamar con número oculto.');

  L('Préstamos abusivos, gota a gota y cobranza ilegal', {
    objetivo: 'Reconocer los préstamos gota a gota y otros préstamos abusivos, saber qué puede y qué no puede hacer quien te cobra, y saber a dónde acudir.',
    explicacion: `
      <p>En el mercado, alguien se acerca a tu puesto y te ofrece dinero hoy mismo: sin papeles, sin revisar tu historial, sin preguntas. Parece una ayuda justo cuando más la necesitas. Muchas veces es el principio de un problema mucho más grande. Esta lección te ayuda a reconocer estas trampas y a saber a dónde acudir.</p>
      <h3>Préstamos gota a gota</h3>
      <p>Un <strong>préstamo gota a gota</strong> es un préstamo informal, de palabra y sin contrato, que se cobra en pagos diarios o muy seguidos, con intereses altísimos. La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, lo describe como una forma de fraude que se ha extendido por varios países de América Latina.</p>
      <p>Según la CONDUSEF, los prestamistas ofrecen dinero a pequeños comerciantes, lo entregan en un día pidiendo solo una identificación y cobran intereses de 10% o 20% al mes, o de 1% a 3% al día. Como se cobra tan seguido, la deuda pronto se vuelve imposible de pagar, y entonces llegan las amenazas y hasta el robo de mercancía. Y como no hay contrato, a las víctimas les cuesta defenderse. En Colombia, la Superintendencia Financiera advierte también del "gota a gota virtual", que presta por aplicaciones del teléfono.</p>
      <h3>Otros préstamos de riesgo</h3>
      <p>No todo préstamo rápido es ilegal. El Banco de España explica que existen créditos rápidos legales, pero pide leer bien el contrato antes de aceptar, porque tendrás que devolver a tiempo lo recibido con sus intereses y gastos, y planificar para no caer en el sobreendeudamiento. La señal de alarma es otra: quien presta sin contrato, sin estar autorizado, o con prisa y presión. La CONDUSEF recomienda acudir solo a instituciones financieras autorizadas.</p>
      <h3>Cobranza: lo que sí y lo que no</h3>
      <p>Quien te prestó tiene derecho a cobrarte, pero no de cualquier forma. La <strong>cobranza ilegal</strong> es cobrar con amenazas, insultos, intimidación o engaños. En México, la CONDUSEF explica que los despachos de cobranza deben identificarse, decirte qué institución te prestó y cuánto debes, tratarte con respeto, contactarte solo entre las 7:00 y las 22:00 horas y darte por escrito los acuerdos. Ahí la cobranza intimidatoria es un delito, aunque sí es válido que te informen de las consecuencias legales reales de no pagar.</p>
      ${SIYNO}
      <p>Las reglas cambian de un país a otro, así que revisa las del tuyo.</p>
      <h3>A dónde acudir</h3>
      <ul>
        <li>Si te amenazan o temes por tu seguridad, acude a la policía o a la fiscalía: tu seguridad va primero.</li>
        <li>Para quejas contra instituciones o despachos de cobranza, acude al organismo de protección al consumidor financiero de tu país. En México, la CONDUSEF tiene un registro para quejas contra despachos de cobranza, llamado REDECO.</li>
        <li>En Colombia, la Superintendencia Financiera recibe denuncias de falsos prestamistas, y para el gota a gota virtual indica acudir a la Fiscalía, la Policía o la Superintendencia de Industria y Comercio.</li>
      </ul>
      <p>Si caíste en un préstamo así, no es tu culpa ni tienes que resolverlo sin ayuda. Pedirla es lo más sensato.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que un préstamo "sin papeles" es más sencillo porque no tiene letra pequeña. Sin contrato no tienes cómo defenderte cuando cambian las reglas.</p>`,
    ejemplo: `
      <p>Un prestamista sin contrato te ofrece $5 000 al 1% diario, la tasa más baja que menciona la CONDUSEF para estos préstamos. ¿Cuánto interés pagarías en 30 días, sin contar que el interés se suma? Compáralo con una institución autorizada que cobrara 30% al año (tasa de ejemplo).</p>
      <ol class="pasos-ej">
        <li>Interés de un día: 0.01 × 5 000 = $50.</li>
        <li>En 30 días: 50 × 30 = $1 500, casi un tercio de lo que te prestaron, en un solo mes.</li>
        <li>Con la institución, 30% al año son alrededor de 30 ÷ 12 = 2.5% al mes: 0.025 × 5 000 = $125.</li>
        <li>Compara: 1 500 ÷ 125 = 12. El préstamo gota a gota cobra 12 veces más.</li>
        <li>Y es con la tasa más baja: al 3% diario serían 150 × 30 = $4 500 en un mes.</li>
      </ol>
      <p>Resultado: <span class="resultado">$1 500 de interés en un mes, contra unos $125 en una institución autorizada</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar "es solo 1%". Un 1% al día no es lo mismo que un 1% al mes o al año.</p>`,
    vidaReal: `
      <p>Saber reconocer estas trampas te protege a ti y a tu familia:</p>
      <ul>
        <li>Reconoces una oferta de dinero fácil antes de aceptarla.</li>
        <li>Sabes qué puede y qué no puede hacer quien te cobra una deuda.</li>
        <li>Si alguien de tu familia recibe amenazas por una deuda, sabes a dónde acudir.</li>
        <li>Antes de pedir prestado, revisas que la institución esté autorizada y que te dé un contrato.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Te prestan $3 000 al 2% diario. ¿Cuánto interés se acumula en 15 días, sin sumar el interés al saldo?</p>', respuesta: 3000 * 0.02 * 15,
        pista: '<p>Calcula el interés de un día y multiplícalo por 15.</p>',
        solucion: '<p>0.02 × 3 000 = 60 al día, y 60 × 15 = <strong>$900</strong> en solo 15 días.</p>' },
      { tipo: 'numero', enunciado: '<p>Te prestan $4 000 con un interés de 10% al mes. ¿Cuánto interés pagas en un mes?</p>', respuesta: 4000 * 0.1,
        pista: '<p>Saca el 10% de 4 000.</p>',
        solucion: '<p>0.10 × 4 000 = <strong>$400</strong> en un mes.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la CONDUSEF, ¿cuál de estas es una práctica de cobranza prohibida?</p>',
        opciones: ['Decirte cuánto debes y a qué institución', 'Llamar a tus vecinos para presionarte a pagar', 'Darte por escrito un acuerdo de pago'], correcta: 1,
        pista: '<p>Las personas sin relación con la deuda no tienen por qué enterarse.</p>',
        solucion: '<p><strong>Llamar a tus vecinos para presionarte.</strong> No pueden cobrarles a personas que no tienen que ver con la deuda.</p>' },
      { tipo: 'opciones', enunciado: '<p>En México, ¿en qué horario pueden contactarte los despachos de cobranza, según la CONDUSEF?</p>',
        opciones: ['De 7:00 a 22:00 horas', 'A cualquier hora del día o de la noche', 'De 6:00 a 23:00 horas'], correcta: 0,
        pista: '<p>Recuerda el diagrama de "sí pueden" y "no pueden".</p>',
        solucion: '<p><strong>De 7:00 a 22:00 horas.</strong> Fuera de ese horario no deben contactarte.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un prestamista sin contrato te amenaza para que le pagues. ¿Qué haces primero?</p>',
        opciones: ['Pagar lo que te pida para que te deje en paz', 'Pedir otro préstamo para pagarle', 'Acudir a la policía o a la fiscalía y buscar orientación del organismo de protección al consumidor financiero de tu país'], correcta: 2,
        pista: '<p>Tu seguridad va primero, y no tienes que resolverlo sin ayuda.</p>',
        solucion: '<p><strong>Acudir a la policía o a la fiscalía y buscar orientación.</strong> Pagar bajo amenaza o pedir otro préstamo suele empeorar las cosas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el préstamo informal, sin contrato, que se cobra en pagos diarios con intereses altísimos?</p>',
        respuestas: ['gota a gota', 'préstamo gota a gota', 'el gota a gota', 'préstamos gota a gota', 'crédito gota a gota', 'el préstamo gota a gota'],
        pista: '<p>Se llama como el agua que cae poco a poco.</p>',
        solucion: '<p>Un <strong>préstamo gota a gota</strong>.</p>' },
    ],
    fuentes: [REV_GOTA, REV_DESPACHO, REV_DELITO, BDE_RAPIDOS, SFC],
  });

  // ------------------------------------------------------------------
  L('Salir de deudas y no volver a caer', {
    objetivo: 'Juntar en un plan los pasos para salir de deudas, decidir qué hacer con el dinero que se libera y cuidar tu salud durante el proceso.',
    explicacion: `
      <p>Llega el día en que haces el último pago. Es una gran noticia, y también un momento delicado: si nada cambió en tu forma de manejar el dinero, es fácil volver a empezar. Esta lección junta todo lo de la unidad en un plan, y te ayuda a cuidarte en el camino.</p>
      <h3>El plan completo</h3>
      <p>La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, lo resume en dos palabras: planeación y disciplina. En la práctica, son estos pasos, que ya viste uno por uno:</p>
      <ol>
        <li>Reconoce el problema y mide tu razón de endeudamiento, como en "Señales de que tienes demasiadas deudas".</li>
        <li>Haz la lista de todas tus deudas y no sumes deudas nuevas mientras pagas.</li>
        <li>Haz un presupuesto para saber cuánto puedes pagar de más cada mes, como en "Hacer tu primer presupuesto".</li>
        <li>Elige un método, bola de nieve o avalancha, y síguelo.</li>
        <li>Si no te alcanza, negocia pronto con tus acreedores.</li>
        <li>Cuando termines, usa lo que pagabas para ahorrar.</li>
      </ol>
      <h3>Para no volver a caer</h3>
      <p>La CONDUSEF insiste en que terminar de pagar es solo el primer paso; lo importante es no repetir los mismos patrones. Algunas costumbres ayudan mucho:</p>
      <ul>
        <li>Arma tu fondo de emergencia, como viste en "Fondo de emergencia", para que el próximo imprevisto no se convierta en deuda.</li>
        <li>Revisa tus gastos cada mes, como en "Registrar y revisar tus gastos", y cuida los gastos hormiga.</li>
        <li>Usa el crédito solo cuando la cuota cabe y lo que compras lo vale; si usas tarjeta, paga el total cada mes.</li>
        <li>Antes de cada compra grande, hazte las preguntas de "Cómo evitar una deuda".</li>
      </ul>
      <p>Hay un truco que aprovecha lo que ya lograste: cuando termines de pagar, sigue apartando la misma cantidad, pero ahora para ti. Tu presupuesto ya funcionaba sin ese dinero. Es la idea de la CONDUSEF de ahorrar como si siguieras pagando una deuda.</p>
      <h3>Si un mes sale mal</h3>
      <p>Puede que algún mes no alcances tu meta, o que surja un gasto que te obligue a usar crédito otra vez. Pasa, y no quiere decir que fracasaste. Revisa qué ocurrió, ajusta el plan y sigue. Lo que cuenta es la dirección de varios meses, no un mes aislado.</p>
      <h3>Cuida también tu salud</h3>
      <p>Las deudas pesan en el cuerpo y en la mente. La CONDUSEF explica que el estrés financiero puede causar ansiedad, tristeza, problemas para dormir, dolores de cabeza y discusiones en casa. Hablar del tema con personas de confianza ayuda. Si la preocupación no te deja dormir, comer o trabajar, buscar ayuda profesional está bien; MedlinePlus, de la Biblioteca Nacional de Medicina de Estados Unidos, reúne información en español sobre el estrés y cómo manejarlo. Si en algún momento piensas en hacerte daño, pide ayuda de inmediato al número de emergencias de tu país.</p>
      <p class="nota"><strong>Trampa común:</strong> celebrar el último pago con una compra grande a crédito. Celebra, sí, pero con dinero que ya tienes.</p>`,
    ejemplo: `
      <p>Terminaste de pagar con el método avalancha y se liberan los $1 400 que pagabas cada mes. Tus gastos básicos son de $9 000 al mes. Las cifras son de ejemplo. ¿En cuánto tiempo juntas un fondo de emergencia de tres meses?</p>
      <ol class="pasos-ej">
        <li>Calcula la meta, como en "Fondo de emergencia": 9 000 × 3 = $27 000.</li>
        <li>Si apartas los $1 400 completos: 27 000 ÷ 1 400 ≈ 19.3. Como no hay meses de 0.3, lo completas en el mes 20.</li>
        <li>Si apartas solo la mitad, $700, y la otra mitad la usas para gustos: 27 000 ÷ 700 ≈ 38.6, unos 39 meses.</li>
        <li>Compara: apartar todo te da el fondo en menos de dos años; la mitad, en más de tres.</li>
        <li>Comprueba: 1 400 × 20 = 28 000, que ya pasa de los 27 000.</li>
      </ol>
      <p>Resultado: <span class="resultado">en 20 meses si apartas todo, o en unos 39 si apartas la mitad</span>.</p>
      <p class="nota"><strong>Error común:</strong> no decidir el destino de ese dinero. Si no lo apartas desde el primer mes, se diluye en gastos del día a día.</p>`,
    vidaReal: `
      <p>Terminar de pagar es el comienzo de una etapa más tranquila:</p>
      <ul>
        <li>Cuando termines de pagar, sabes exactamente qué hacer con el dinero que se libera.</li>
        <li>Un imprevisto ya no te obliga a volver a pedir prestado, porque tienes un ahorro para eso.</li>
        <li>Si un mes sale mal, sabes ajustar el plan sin abandonarlo.</li>
        <li>Cuidas tu tranquilidad y la de tu familia, no solo tus números.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Terminas de pagar y se liberan $1 200 al mes. Tu meta de fondo de emergencia es de $18 000. ¿En cuántos meses la alcanzas?</p>', respuesta: 18000 / 1200,
        pista: '<p>Divide la meta entre lo que apartas cada mes.</p>',
        solucion: '<p>18 000 ÷ 1 200 = <strong>15 meses</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si de esos $1 200 apartas solo $900, ¿en cuántos meses alcanzas los $18 000?</p>', respuesta: 18000 / 900,
        pista: '<p>Divide la meta entre $900.</p>',
        solucion: '<p>18 000 ÷ 900 = <strong>20 meses</strong>, cinco más que apartando todo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la CONDUSEF, ¿qué es lo más importante después de terminar de pagar tus deudas?</p>',
        opciones: ['Pedir un crédito nuevo para celebrar', 'No volver a caer en los mismos patrones', 'Dejar el presupuesto porque ya no hace falta'], correcta: 1,
        pista: '<p>Terminar de pagar es solo el primer paso.</p>',
        solucion: '<p><strong>No volver a caer en los mismos patrones</strong>, con presupuesto, fondo de emergencia y crédito bien usado.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un mes no lograste pagar lo extra que planeabas. ¿Qué es lo más sensato?</p>',
        opciones: ['Revisar qué pasó, ajustar el plan y seguir', 'Abandonar el plan, porque ya fallaste', 'Dejar de pagar los mínimos ese mes'], correcta: 0,
        pista: '<p>Un mes difícil no borra lo que ya avanzaste.</p>',
        solucion: '<p><strong>Revisar qué pasó, ajustar el plan y seguir.</strong> Lo que cuenta es la dirección de varios meses.</p>' },
      { tipo: 'opciones', enunciado: '<p>Desde hace semanas, la preocupación por tus deudas no te deja dormir. ¿Qué puedes hacer?</p>',
        opciones: ['Guardártelo para no preocupar a nadie', 'Pedir otro préstamo para calmarte', 'Hablar con alguien de confianza y buscar ayuda profesional si la necesitas'], correcta: 2,
        pista: '<p>Pedir ayuda está bien.</p>',
        solucion: '<p><strong>Hablar con alguien de confianza y buscar ayuda profesional</strong> si la necesitas. Cuidar tu salud también es parte del plan.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué ahorro te protege para que el próximo imprevisto no se convierta en una deuda?</p>',
        respuestas: ['fondo de emergencia', 'el fondo de emergencia', 'un fondo de emergencia', 'fondo de emergencias', 'ahorro de emergencia'],
        pista: '<p>Lo viste en la unidad Ahorro.</p>',
        solucion: '<p>El <strong>fondo de emergencia</strong>.</p>' },
    ],
    fuentes: [REV_SALIR, REV_TERMINA, REV_APUROS, REV_ESTRES, MEDLINE],
  });
})();
