// Finanzas y economía · Unidad 2: El sistema financiero.
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

  const REV_HISTORIA = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: Una breve historia del dinero', url: 'https://revista.condusef.gob.mx/usuario-inteligente/tu-bolsillo/2017/03/una-breve-historia-del-dinero/' };
  const REV_FILOSOFAL = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: ¿El dinero es la piedra filosofal?', url: 'https://revista.condusef.gob.mx/usuario-inteligente/2022/04/el-dinero-es-la-piedra-filosafal/' };
  const REV_BANCOS = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: Día Internacional de los Bancos', url: 'https://revista.condusef.gob.mx/usuario-inteligente/puntos-cardinales/2022/12/dia-internacional-de-los-bancos/' };
  const CORE10 = { nombre: 'CORE Econ (en español), La Economía, Capítulo 10: Los bancos, el dinero y el mercado de crédito', url: 'https://books.core-econ.org/the-economy-v1/book/es/text/10.html' };
  const SERNAC = { nombre: 'SERNAC (Chile), Educación Financiera: Guía para el docente (PDF)', url: 'https://www.sernac.cl/portal/607/articles-9171_archivo_01.pdf' };

  // ------------------------------------------------------------------
  const HISTORIA = diagrama([0, 21.2], [7, 12.2], [
    caja(0.2, 9.8, 4.4, 11.6), txt(2.3, 10.7, 'trueque'),
    ...flecha([4.5, 10.7], [5.5, 10.7], 0, 0.9),
    caja(5.6, 9.8, 9.8, 11.6), txt(7.7, 10.7, 'moneda'),
    ...flecha([9.9, 10.7], [10.9, 10.7], 0, 0.9),
    caja(11.0, 9.8, 15.2, 11.6), txt(13.1, 10.7, 'papel'),
    ...flecha([15.3, 10.7], [16.3, 10.7], 0, 0.9),
    caja(16.4, 9.8, 20.6, 11.6), txt(18.5, 10.7, 'digital'),
    txt(2.3, 8.9, 'cambiar sin más'), txt(2.3, 7.8, 'no coincidía'),
    txt(7.7, 8.9, 'un solo valor'), txt(7.7, 7.8, 'pesaba mucho'),
    txt(13.1, 8.9, 'más ligero'), txt(13.1, 7.8, 'se falsificaba'),
    txt(18.5, 8.9, 'sin peso'), txt(18.5, 7.8, 'no se toca'),
  ], 'Línea de tiempo de cuatro etapas unidas por flechas, de izquierda a derecha: trueque, moneda, papel y digital. Debajo de cada etapa hay dos rótulos: el primero dice el problema que resolvió esa forma de dinero y el segundo dice el problema que trajo. Bajo trueque: «cambiar sin más» y «no coincidía». Bajo moneda: «un solo valor» y «pesaba mucho». Bajo papel: «más ligero» y «se falsificaba». Bajo digital: «sin peso» y «no se toca».');

  L('Breve historia del dinero', {
    objetivo: 'Recorrer las formas que ha tenido el dinero a lo largo del tiempo y entender que cada forma nació para resolver un problema y trajo otro.',
    explicacion: `
      <p>Tu recibo de sueldo dice «salario» y en tu cartera hay papeles que valen dinero sin oro detrás. Ninguna te resulta rara, pero las dos tienen su historia. Esta lección no explica qué es el dinero, que ya viste en "Qué es el dinero": explica de dónde salió cada forma que ha tenido y qué problema venía a resolver.</p>
      <h3>Objetos que todos aceptaban</h3>
      <p>El trueque, que ya viste en "Trueque y ayuda mutua", se atascaba: casi nadie cambiaba nada porque las dos partes rara vez querían lo que la otra ofrecía. La salida fue elegir objetos que la gente aceptara en casi cualquier lugar. Eran metales preciosos, como el oro y la plata, y también alimentos como el cacao, la sal, el maíz y el pescado.</p>
      <p>Entre ellos estaba la sal, y esa elección explica una palabra que usas todas las semanas. La palabra <strong>salario</strong> (<span lang="en">salary</span>) viene de la sal: los legionarios romanos recibían su paga en sal, y por eso la llamaron así. La sal servía como pago porque era difícil de conseguir, se podía pesar y dividir y no se echaba a perder.</p>
      <h3>La moneda: metal con el valor marcado</h3>
      <p>Los objetos tenían un problema: cada quien los valoraba distinto y había que regatear. Con el surgimiento de los imperios en China y Grecia, la CONDUSEF (México, 2017) cuenta que se empezaron a fabricar las primeras monedas de la historia: piezas de metal con el valor marcado, la <strong>moneda</strong> (<span lang="en">coin</span>). Su utilidad era precisa: estandarizar el valor de cambio y evitar las peleas al momento de hacer los trueques. Una moneda valía igual en todas partes y nadie discutía el valor de su sal.</p>
      <h3>El papel: ligero, pero fácil de falsificar</h3>
      <p>Las monedas tenían otro problema: pesan mucho y llevar bolsas de metal de un pueblo a otro era incómodo. La invención de la imprenta ayudó a crear los primeros <strong>billetes</strong> (<span lang="en">banknote</span>), papeles con el valor escrito, y con ellos mejoró el traslado del dinero de un pueblo a otro. Pero los billetes enfrentaron un gran problema: la facilidad con la que podían ser impresos y falsificados.</p>
      <p>La solución llegó por el lado de las instituciones: en cada país quedó una sola autorizada para emitir e imprimir los billetes, y ese papel pasó a ser el «dinero de curso legal», el que por ley todos deben aceptar. Esa institución es el banco central, y es el tema de la lección 3. Fíjate en el patrón: cada forma de dinero nació de un problema y trajo otro. La sal resolvía que no dependieras de encontrar a alguien que quisiera lo tuyo, pero pesaba y se gastaba. La moneda resolvía el valor, pero pesaba. El papel resolvía el peso, pero se falsificaba.</p>
      <h3>El dinero que ya no se lleva encima</h3>
      <p>Hoy, casi todo el dinero que usas no existe como papel: es una cifra guardada en una computadora que se mueve por medios electrónicos. Se le llama dinero electrónico y es «invisible», porque no pasa de mano en mano. El papel todavía lo puedes tocar; el saldo de una cuenta, no.</p>
      <p>La idea que te llevas es esta: lo que una cosa vale y lo que la gente acepta no siempre son lo mismo. La sal valía porque servía para conservar la comida y costaba mucho conseguirla. El papel vale porque alguien lo garantiza y porque todos lo aceptan. El dinero que se mueve por la pantalla vale porque los sistemas que lo registran funcionan y la gente confía en ellos.</p>
      <p>La línea de tiempo resume el camino: bajo cada etapa, la primera línea dice el problema que resolvió y la segunda, el que trajo.</p>
      ${HISTORIA}
      <p class="nota"><strong>Trampa común:</strong> creer que el dinero siempre fue papel. Durante miles de años fue metal, y antes, comida, conchas y objetos que la gente quería. Cada forma duró lo suficiente para que la gente se acostumbrara a ella, y por eso seguimos usando palabras antiguas.</p>`,
    ejemplo: `
      <p>Un legionario romano recibía su paga en sal.</p>
      <ol class="pasos-ej">
        <li>Primero, por qué la sal servía como pago: era difícil de conseguir y todo el mundo la necesitaba para conservar la comida.</li>
        <li>Segundo, el nombre: como la paga venía en sal, se llamó salario, y así se quedó la palabra que usas para lo que ganas por trabajar.</li>
        <li>Tercero, el problema siguiente: cuando el dinero en metal se volvió incómodo de llevar, el papel resolvió el traslado, porque pesa menos que una bolsa de monedas, pero se falsificaba con facilidad.</li>
        <li>Cuarto, la respuesta: una sola institución de cada país pasó a imprimir los billetes, y ese papel quedó como el dinero de curso legal, el que todos deben aceptar por ley.</li>
      </ol>
      <p>Resultado: <span class="resultado">de la sal como pago vino la palabra «salario»; el papel resolvió el peso, pero abrió la falsificación</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que la sal valía por sí sola. Valía porque era necesaria y difícil de conseguir, y por eso la aceptaban como pago.</p>`,
    vidaReal: `
      <p>El dinero de tu día a día es el resultado de esta historia:</p>
      <ul>
        <li>El papel de tu cartera tiene valor porque alguien lo garantiza, y eso se decidió hace siglos.</li>
        <li>Las piezas de metal de tu bolsillo son de la forma más antigua: la que se inventó para que todo valiera igual.</li>
        <li>El saldo de una cuenta se mueve solo, por medios electrónicos, sin que ningún papel cambie de mano.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En un campamento romano se preparan 3 kilogramos de sal al día para pagar a los legionarios. ¿Cuántos kilogramos se preparan en 30 días?</p>', respuesta: 3 * 30,
        pista: '<p>Multiplica los kilogramos de cada día por los días del mes.</p>',
        solucion: '<p>3 × 30 = <strong>90 kilogramos</strong> de sal en un mes. Esa era la paga, y por eso se le llamaba salario.</p>' },
      { tipo: 'numero', enunciado: '<p>Un país emitió 1 000 billetes de $50. Un falsificador hizo 20 billetes iguales a esos. ¿Cuánto dinero falso puso en circulación?</p>', respuesta: 20 * 50,
        pista: '<p>Multiplica los billetes falsos por lo que vale cada uno.</p>',
        solucion: '<p>20 × 50 = <strong>$1 000</strong> de dinero falso. El problema de los billetes fue siempre ese: se podían imprimir y falsificar con facilidad.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué se inventaron las monedas de metal?</p>',
        opciones: ['Para que la gente no discutiera cuánto valía cada objeto', 'Para que todos los países usaran la misma moneda', 'Para que el papel no se pudiera falsificar'], correcta: 0,
        pista: '<p>Piensa en el problema que tenían los objetos cuando cada quien los valoraba distinto.</p>',
        solucion: '<p>Las monedas sirvieron para <strong>estandarizar el valor de cambio</strong>: una moneda valía lo mismo en todas partes y así no había peleas al cambiar. Lo demás llegó más tarde.</p>' },
      { tipo: 'opciones', enunciado: '<p>El dinero en papel resolvió un problema del dinero en metal, pero trajo otro. ¿Cuál fue el problema nuevo?</p>',
        opciones: ['Que las monedas se gastaban demasiado rápido', 'Que el papel se rompía con la lluvia', 'Que los billetes eran fáciles de imprimir y de falsificar'], correcta: 2,
        pista: '<p>Piensa qué hacía fácil la imprenta: imprimir muchos papeles parecidos.</p>',
        solucion: '<p>El problema nuevo fue que los billetes eran <strong>fáciles de imprimir y de falsificar</strong>. Por eso en cada país quedó una sola institución autorizada para emitirlos.</p>' },
      { tipo: 'texto', enunciado: '<p>¿De qué alimento viene la palabra «salario»?</p>',
        respuestas: ['de la sal', 'la sal', 'sal'],
        pista: '<p>Es el alimento con el que les pagaban.</p>',
        solucion: '<p>Viene <strong>de la sal</strong>, que era la paga de los legionarios romanos. La palabra se quedó y hoy la usas para lo que ganas por trabajar.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena las formas que ha tenido el dinero, de la más antigua a la más reciente.</p>',
        respuesta: ['Objetos que la gente cambiaba entre sí', 'Monedas de metal con el valor marcado', 'Billetes de papel', 'Dinero que se mueve por medios electrónicos'],
        pista: '<p>Empieza por lo más antiguo, que no llevaba ningún valor marcado.</p>',
        solucion: '<p>Primero se cambiaban objetos entre sí, luego llegaron las monedas de metal, después los billetes de papel y al final el dinero que se mueve por medios electrónicos.</p>' },
    ],
    fuentes: [REV_HISTORIA, REV_FILOSOFAL, CORE10],
  });

  // ------------------------------------------------------------------
  const FLUJO_BANCO = diagrama([0, 19], [2, 9.2], [
    caja(0.4, 5.4, 4.4, 8.0), txt(2.4, 6.9, 'ahorrante'), txt(2.4, 5.9, 'pone dinero'),
    ...flecha([4.6, 6.5], [6.9, 6.5], 0, 1),
    txt(5.75, 8.6, 'depósito'),
    caja(7.0, 4.6, 11.0, 8.4), txt(9.0, 7.4, 'el banco'), txt(9.0, 6.3, 'presta'), txt(9.0, 5.4, 'y cobra'),
    ...flecha([11.2, 6.5], [13.5, 6.5], 0, 1),
    txt(12.35, 8.6, 'préstamo'),
    caja(13.6, 5.4, 17.6, 8.0), txt(15.6, 6.9, 'prestatario'), txt(15.6, 5.9, 'pide dinero'),
    { tipo: 'linea', desde: [15.6, 5.4], hasta: [15.6, 3.4] },
    ...flecha([15.6, 3.4], [9.0, 3.4], 0, 1),
    { tipo: 'linea', desde: [9.0, 3.4], hasta: [9.0, 4.6] },
    txt(12.3, 2.4, 'vuelve como depósito nuevo'),
  ], 'Diagrama de flujo. A la izquierda hay una caja que dice «ahorrante, pone dinero», de la que sale una flecha rotulada «depósito» hacia la caja del centro, que dice «el banco, presta y cobra». Del banco sale otra flecha rotulada «préstamo» hacia la caja de la derecha, que dice «prestatario, pide dinero». Por debajo, una flecha va del prestatario de vuelta al banco y está rotulada «vuelve como depósito nuevo».');

  L('Qué hacen los bancos', {
    objetivo: 'Explicar el papel del banco como intermediario entre quien ahorra y quien pide prestado, y entender que el crédito nuevo se convierte en un depósito nuevo.',
    explicacion: `
      <p>En un banco hay diez personas con cien pesos en sus cuentas: mil pesos en total. Ese día dos de ellas piden cien pesos prestados. ¿Qué hace el banco con los ochocientos pesos que sobran? Y otra pregunta más incómoda: si acaba de prestar doscientos pesos, ¿de dónde salieron, si en la caja fuerte no había tanto?</p>
      <h3>El banco no es una caja fuerte</h3>
      <p>Un banco es un negocio que toma el dinero de quien sobra y se lo pasa a quien falta, y cobra por ese servicio. A ese trabajo se le llama <strong>intermediación</strong> (<span lang="en">financial intermediation</span>), es decir, poner en contacto a quien tiene dinero y quien lo necesita. Cuando un banco junta el ahorro de mil personas, cada una con poco dinero, y lo convierte en crédito para una familia o una empresa, está haciendo intermediación. Al conjunto de todos esos créditos que se otorgan y se pagan se le llama <strong>mercado de crédito</strong> (<span lang="en">credit market</span>).</p>
      <p>El banco paga un interés a quien deposita y cobra un interés mayor a quien pide prestado; la diferencia entre las dos cantidades es su ganancia. Por eso le conviene que los créditos salgan bien. Como viste en "Interés simple", el interés se calcula como un porcentaje del dinero, así que el banco gana cuando cobra más de lo que paga.</p>
      <p>El otro lado de la cuenta es el riesgo: si el prestatario no paga, el banco pierde el dinero que prestó. Por eso revisa a quién le presta, cuánto pide y en cuánto tiempo lo devolverá. Las partes de un crédito de consumo ya las viste en "Qué es un crédito"; lo que toca aquí es el papel del banco dentro de la economía.</p>
      <p>Este es el recorrido que hace el dinero dentro del banco, y la flecha de abajo es la parte que sorprende:</p>
      ${FLUJO_BANCO}
      <p>Y este es el balance del negocio para los tres:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Quién</th><th>Qué gana</th><th>Si el prestatario no paga</th></tr>
        <tr><td>El ahorrante</td><td>El interés que le paga el banco</td><td>Recupera su dinero, pero el banco puede perder parte</td></tr>
        <tr><td>El banco</td><td>La diferencia entre lo que cobra y lo que paga</td><td>Pierde lo prestado y busca recuperar el dinero</td></tr>
        <tr><td>El prestatario</td><td>Usa el dinero ahora y lo paga después</td><td>Usó el dinero, pero la deuda sigue y suele crecer con los intereses</td></tr>
      </table></div>
      <h3>El secreto: el crédito crea el depósito</h3>
      <p>Ahora viene lo sorprendente. Cuando el banco presta mil pesos, no saca mil pesos de su bóveda: anota en la cuenta del prestatario que tiene mil pesos. Ese dinero nuevo no existía antes del préstamo. A esto se le llama <strong>creación de dinero</strong> (<span lang="en">money creation</span>), y significa que el crédito nuevo se convierte en un depósito nuevo en la cuenta de quien pidió el dinero prestado.</p>
      <p>Por eso hay que distinguir dos cosas que suenan parecido. El dinero que la gente tiene guardado en el banco es el «dinero bancario», el acumulado por los bancos gracias a los depósitos de sus clientes. El dinero que aparece en la cuenta del prestatario es nuevo: se creó con el préstamo. Cuando alguien dice «hay mucho dinero guardado en los bancos», no está diciendo lo mismo que «hay mucho dinero nuevo en la economía».</p>
      <p>Y no es un truco: los bancos son empresas que buscan maximizar sus beneficios y que crean dinero en forma de depósitos cuando dan crédito. Cada peso prestado es un peso nuevo que se puede gastar, y el banco gana con el interés que cobra.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que el banco solo guarda el dinero de la gente. Guardar es parte de su trabajo, pero cuando presta también crea un depósito nuevo. Y no es dinero gratis: cobra interés por ello y corre el riesgo de que no le paguen.</p>`,
    ejemplo: `
      <p>Un banco tiene mil pesos de depósitos y presta ochocientos. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Primero, lo que el banco paga: a los mil pesos depositados les paga un 2%, que son 1 000 × 2 ÷ 100 = 20 pesos.</li>
        <li>Segundo, lo que cobra: a los 800 prestados les cobra un 8%, que son 800 × 8 ÷ 100 = 64 pesos.</li>
        <li>Tercero, la diferencia: 64 − 20 = 44 pesos. Esa es su ganancia, y como el préstamo no salió de la caja fuerte, el banco conserva sus depósitos y puede seguir prestando.</li>
        <li>Cuarto, el detalle que sorprende: prestó 800 pesos a ocho personas, 100 a cada una, y en la cuenta de cada una hay 100 pesos nuevos que antes no existían en ninguna parte.</li>
      </ol>
      <p>Resultado: <span class="resultado">el banco gana 44 pesos, puede seguir prestando y los 800 del préstamo son dinero nuevo</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que los 800 del préstamo salieron de los depósitos de los ahorrantes. El depósito del prestatario es nuevo: aparece cuando el banco presta.</p>`,
    vidaReal: `
      <p>El trabajo del banco se nota en tu día a día:</p>
      <ul>
        <li>Cuando te aprueban un crédito, el dinero no sale de una bóveda: aparece en tu cuenta.</li>
        <li>El interés de un crédito tiene dos caras: lo que el banco paga a los ahorrantes y lo que te cobra a ti.</li>
        <li>Tu ahorro en una cuenta puede estar prestándose a una familia o a una empresa.</li>
        <li>Cuando comparas dos bancos, comparas también lo que te van a cobrar por el crédito.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un banco tiene 1 000 pesos de depósitos y paga un 2% de interés a quien ahorra. ¿Cuánto paga a los ahorrantes?</p>', respuesta: 1000 * 2 / 100,
        pista: '<p>Calcula el 2% de 1 000: multiplica y divide entre 100.</p>',
        solucion: '<p>1 000 × 2 ÷ 100 = <strong>$20</strong>. Eso es lo que el banco paga por tener el dinero guardado.</p>' },
      { tipo: 'numero', enunciado: '<p>Ese mismo banco prestó 800 pesos y cobra un 8% de interés. ¿Cuánto cobra de interés en total?</p>', respuesta: 800 * 8 / 100,
        pista: '<p>Calcula el 8% de 800: multiplica y divide entre 100.</p>',
        solucion: '<p>800 × 8 ÷ 100 = <strong>$64</strong> de interés. Lo que el banco cobra a los prestatarios.</p>' },
      { tipo: 'numero', enunciado: '<p>El banco cobra 64 pesos de interés y paga 20 pesos a los ahorrantes. ¿Cuánto gana?</p>', respuesta: 64 - 20,
        pista: '<p>Resta lo que paga de lo que cobra.</p>',
        solucion: '<p>64 − 20 = <strong>$44</strong>. Esa diferencia es la ganancia del banco: cobra más de lo que paga.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un banco concede un crédito de 500 pesos. ¿De dónde sale ese dinero?</p>',
        opciones: ['De la caja fuerte del banco, que siempre guarda mucho', 'Aparece como un depósito nuevo en la cuenta de quien pidió el préstamo', 'De los depósitos de los otros clientes, que se lo entregan en efectivo'], correcta: 1,
        pista: '<p>Recuerda qué es la creación de dinero: el crédito se convierte en un depósito nuevo.',
        solucion: '<p>Aparece <strong>como un depósito nuevo en la cuenta de quien pidió el préstamo</strong>. El banco anota el saldo, no entrega billetes: por eso se dice que el crédito crea el depósito.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el conjunto de todos los créditos que se otorgan y se pagan en un país?</p>',
        respuestas: ['mercado de crédito', 'el mercado de crédito'],
        pista: '<p>Son dos palabras y la primera es «mercado».',
        solucion: '<p>Se llama <strong>mercado de crédito</strong>: ahí se otorgan los créditos y ahí se pagan. Un banco es uno de los que lo hacen.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena lo que hace un banco con el dinero que recibe.</p>',
        respuesta: ['El ahorrante deposita su dinero en el banco', 'El banco paga un interés pequeño por el depósito', 'El banco presta ese dinero a quien lo necesita y cobra un interés mayor', 'Con la diferencia entre lo que cobra y lo que paga, el banco gana'],
        pista: '<p>Empieza por el depósito y termina por la ganancia.',
        solucion: '<p>Primero el ahorrante deposita, luego el banco paga un interés pequeño, después presta el dinero cobrando un interés mayor y, por último, se queda con la diferencia.</p>' },
    ],
    fuentes: [CORE10, SERNAC, REV_BANCOS],
  });

  // ---- Constantes de fuentes de las lecciones 3 y 4 ----
  const REV_BANCOCENTRAL = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: ¿Por qué se crea un Banco Central?', url: 'https://revista.condusef.gob.mx/usuario-inteligente/2022/07/por-que-se-crea-un-banco-central/' };
  const REV_PARAQUE = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: ¿Para qué queremos un Banco Central?', url: 'https://revista.condusef.gob.mx/usuario-inteligente/2022/06/para-que-queremos-un-banco-central/' };
  const REV_AUTONOMIA = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: Autonomía del Banco de México', url: 'https://revista.condusef.gob.mx/usuario-inteligente/sabias-que/2022/09/autonomia-del-banco-de-mexico/' };
  const CORE15 = { nombre: 'CORE Econ (en español), La Economía, Capítulo 15: Inflación, desempleo y política monetaria', url: 'https://books.core-econ.org/the-economy-v1/book/es/text/15.html' };
  const WIKI_DEMANDA = { nombre: 'Wikipedia (en español), Demanda agregada (apoyo)', url: 'https://es.wikipedia.org/wiki/Demanda_agregada' };
  const REV_MASCARO = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: ¿Por qué todo es más caro?', url: 'https://revista.condusef.gob.mx/presupuesto/2022/05/por-que-todo-es-mas-caro/' };
  const REV_INFLACAFECTA = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: ¿La inflación afecta mi crédito?', url: 'https://revista.condusef.gob.mx/usuario-inteligente/sabias-que/2022/09/la-inflacion-afecta-mi-credito/' };
  const REV_DINEROINFLACION = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: El dinero y la inflación', url: 'https://revista.condusef.gob.mx/usuario-inteligente/sabias-que/2021/10/el-dinero-y-la-inflacion/' };

  // ------------------------------------------------------------------
  const CADENA_MONETARIA = diagrama([0, 20], [0, 13], [
    caja(0.3, 10.6, 5.1, 12.6), txt(2.7, 11.9, 'banco central'),
    ...flecha([5.3, 11.6], [7.1, 11.6], 0, 1),
    txt(6.2, 9.7, 'tasa oficial'),
    caja(7.3, 10.6, 11.1, 12.6), txt(9.2, 11.9, 'bancos'),
    ...flecha([11.3, 11.6], [13.1, 11.6], 0, 1),
    txt(12.2, 9.7, 'créditos'),
    caja(13.3, 10.6, 19.7, 12.6), txt(16.5, 12.0, 'empresas'), txt(16.5, 11.1, 'y familias'),
    txt(6.0, 8.8, 'Cuando la tasa oficial sube'),
    txt(6.0, 7.0, 'la tasa oficial sube'),
    ...flecha([6.0, 6.8], [6.0, 5.2], 0, 1.2),
    txt(6.0, 5.0, 'los bancos cobran más'),
    ...flecha([6.0, 4.8], [6.0, 3.2], 0, 1.2),
    txt(6.0, 3.0, 'se pide menos prestado'),
    ...flecha([6.0, 2.8], [6.0, 1.2], 0, 1.2),
    txt(6.0, 1.0, 'los precios suben menos'),
    txt(15.5, 8.8, 'Cuando la tasa oficial baja'),
    txt(15.5, 7.0, 'la tasa oficial baja'),
    ...flecha([15.5, 6.8], [15.5, 5.2], 0, 1.2),
    txt(15.5, 5.0, 'los bancos cobran menos'),
    ...flecha([15.5, 4.8], [15.5, 3.2], 0, 1.2),
    txt(15.5, 3.0, 'se pide más prestado'),
    ...flecha([15.5, 2.8], [15.5, 1.2], 0, 1.2),
    txt(15.5, 1.0, 'la economía se calienta'),
  ], 'Diagrama de dos partes. Arriba, de izquierda a derecha: una caja que dice «banco central», una flecha rotulada «tasa oficial», una caja que dice «bancos», una flecha rotulada «créditos» y una caja que dice «empresas y familias». Abajo, dos cadenas verticales. La de la izquierda se titula «Cuando la tasa oficial sube» y baja paso a paso: la tasa oficial sube, los bancos cobran más, se pide menos prestado, los precios suben menos. La de la derecha se titula «Cuando la tasa oficial baja» y sube al revés: la tasa oficial baja, los bancos cobran menos, se pide más prestado, la economía se calienta.');

  L('Bancos centrales y política monetaria', {
    objetivo: 'Explicar qué es un banco central, para qué sirve la política monetaria y cómo una decisión sobre la tasa de interés llega hasta tu bolsillo.',
    explicacion: `
      <p>Dos países vecinos viven un mes parecido, pero sus bancos centrales hacen lo contrario: uno sube su tasa de interés y el otro la baja. Ninguno puede hacer lo que una empresa: cambiar sus precios cuando le parece. Y aun así, esa decisión llega al bolsillo de las familias: al interés del crédito y a los precios.</p>
      <h3>Una institución para el dinero de todos</h3>
      <p>El <strong>banco central</strong> (<span lang="en">central bank</span>) es la institución que emite el dinero y vigila que los bancos del país jueguen bien. Cada país tiene uno solo, y ese banco es la única entidad que pone a circular billetes y monedas y crea el «dinero de curso legal», el que todos debemos aceptar. La CONDUSEF (México, 2022) lo llama, en lenguaje sencillo, el «doctor del dinero», y su campo de acción está claramente delimitado por el dinero.</p>
      <p>Y tiene un borde claro: no controla ni el clima ni el gasto del gobierno (México, 2022), y siempre hay circunstancias que se le escapan, como una pandemia o una guerra (México, 2022).</p>
      <h3>Una palanca: la tasa que él fija</h3>
      <p>Para cuidar la economía, el banco central usa sobre todo una palanca: la tasa de interés oficial, la que cobra a los bancos cuando les presta dinero. Como él mismo la fija, esa tasa sirve de base para los créditos del país. Cuando la tasa oficial sube, los bancos cobran más por sus créditos; cuando baja, cobran menos. Y así, sin darle órdenes a nadie, mueve el gasto de miles de familias y empresas.</p>
      <p>El conjunto de esas decisiones se llama <strong>política monetaria</strong> (<span lang="en">monetary policy</span>). Para que no sea un capricho, se fija antes una meta: el <strong>objetivo de inflación</strong> (<span lang="en">inflation target</span>), el aumento de precios que se quiere mantener cerca de una cifra, año tras año, y la tasa cambia para acercarse a él. El Banco de México procura mantener la inflación anual alrededor del 3% (México, 2022), y cada país tiene el suyo: revisa el dato vigente en tu país. Una empresa quiere más ganancia; el banco central, que los precios queden cerca de la meta. Es el gesto de elegir entre alternativas que viste en "Escasez y costo de oportunidad", pero aquí son subir o bajar la tasa.</p>
      <h3>Dos caminos, uno en cada dirección</h3>
      <p>Cuando la economía se calienta y los precios suben más de la cuenta, el banco central sube la tasa: los bancos cobran más, se pide menos dinero prestado, la gente gasta menos y baja la presión sobre los precios. Cuando la economía se enfría, el banco central la baja: los créditos se abaratan y la gente vuelve a gastar. Este es el recorrido de una decisión hasta tu bolsillo:</p>
      ${CADENA_MONETARIA}
      <p>Fíjate en el diagrama: el banco central no le dice a nadie cuánto gastar. Cambia una tasa, y esa tasa viaja por los bancos hasta los créditos de las familias y de las empresas. Cuando la tasa sube, pedir dinero cuesta más y ahorrar rinde más; cuando baja, pasa lo contrario.</p>
      <h3>Por qué nacen: las crisis</h3>
      <p>Casi ningún banco central se inventó por un plan, sino por un desastre: nacieron tras las repetidas crisis financieras o periodos inflacionarios (México, 2022). Donde el dinero dejó de ser confiable, se creó una institución para devolverle la confianza. El Banco de México se fundó en 1925, nueve años después de que el país sufriera uno de los episodios de inflación más agudos de su historia, en plena Revolución Mexicana (México, 2022). Revisa el dato vigente en tu país: cada uno tiene su propia fecha de nacimiento.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que el banco central pone los precios de las tiendas o que decide cuánto ganas. No hace ninguna de las dos cosas: su trabajo es la salud del dinero y de los precios en general. Tampoco es lo mismo que el gobierno, y por eso en muchos países se le da autonomía (México, 2022).</p>`,
    ejemplo: `
      <p>Un banco central sube la tasa oficial del 3% al 6%. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Primero, el banco que presta: antes compraba dinero al 3% y lo prestaba a las empresas al 5%; ahora compra al 6% y presta al 8%. Sobre $1 000, antes cobraba $50 y pagaba $30; ahora cobra $80 y paga $60, así que le quedan los mismos $20: no gana más, porque su dinero le cuesta más.</li>
        <li>Segundo, una familia que pide un crédito nuevo de $1 000: su banco le suma 2 puntos a la tasa oficial, así que antes pagaba 5% ($50) y ahora 8% ($80).</li>
        <li>Tercero, la comprobación: la tasa oficial subió 3 puntos; los créditos de la familia y de las empresas subieron los mismos 3 puntos, y el margen del banco sigue en 2 puntos.</li>
      </ol>
      <p>Resultado: <span class="resultado">la tasa oficial subió 3 puntos, los créditos subieron lo mismo y el margen del banco no cambió</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que el banco central sube la tasa para que los bancos ganen más. La sube para frenar los precios.</p>`,
    vidaReal: `
      <p>Lo que decide el banco central llega a cosas que usas todos los días:</p>
      <ul>
        <li>En el interés de tu crédito y en el rendimiento de tu cuenta de ahorro.</li>
        <li>En lo rápido que suben los precios de la comida y del transporte.</li>
        <li>En si hay trabajo disponible: las empresas contratan más cuando el dinero está barato.</li>
        <li>En la confianza que la gente tiene en el billete que lleva en la cartera.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un banco central sube su tasa oficial del 3% al 6%. ¿Cuántos puntos subió la tasa?</p>', respuesta: 6 - 3,
        pista: '<p>Resta la tasa de antes de la tasa de después.</p>',
        solucion: '<p>6 − 3 = <strong>3 puntos</strong>. Esa subida se traslada después a los créditos que cobran los bancos.</p>' },
      { tipo: 'numero', enunciado: '<p>Un banco cobra el 8% de interés anual en un crédito. ¿Cuánto cobra de interés por $1 000 en un año?</p>', respuesta: 1000 * 8 / 100,
        pista: '<p>Calcula el 8% de 1 000: multiplica y divide entre 100.</p>',
        solucion: '<p>1 000 × 8 ÷ 100 = <strong>$80</strong> de interés. Como viste en "Interés simple", el interés es un porcentaje del dinero prestado.</p>' },
      { tipo: 'numero', enunciado: '<p>En México, 2022, el Banco de México procura mantener la inflación anual alrededor del 3%. Si en un año la inflación fue del 5%, ¿cuántos puntos se pasó de la meta?</p>', respuesta: 5 - 3,
        pista: '<p>Resta la meta del Banco de México a la inflación de ese año.</p>',
        solucion: '<p>5 − 3 = <strong>2 puntos</strong> por encima de la meta. Cuando la inflación se aleja de la meta, el banco central suele subir la tasa oficial para frenarla. Revisa el dato vigente en tu país.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un banco central sube la tasa oficial. ¿Qué pasa con el crédito en el país?</p>',
        opciones: ['Los bancos cobran menos y se pide más prestado', 'No cambia nada, porque los bancos son privados', 'Los bancos cobran más y se pide menos prestado'], correcta: 2,
        pista: '<p>Piensa qué le cuesta al banco conseguir el dinero que presta.</p>',
        solucion: '<p>Los bancos <strong>cobran más y se pide menos prestado</strong>. Es la cadena del diagrama: la tasa oficial sube, los bancos suben sus créditos y la gente pide menos dinero.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué institución de cada país es la única autorizada para emitir los billetes y las monedas?</p>',
        respuestas: ['el banco central', 'banco central'],
        pista: '<p>Es la institución que se ocupa del dinero de todo el país.</p>',
        solucion: '<p>El <strong>banco central</strong>. En cada país hay uno solo, y es el único autorizado para emitir billetes y monedas y para crear el dinero de curso legal.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena lo que pasa cuando el banco central decide subir su tasa oficial.</p>',
        respuesta: ['El banco central sube la tasa oficial', 'Los bancos cobran más por sus créditos', 'Se pide menos dinero prestado', 'La gente gasta menos y baja la presión sobre los precios'],
        pista: '<p>Empieza por la decisión y termina por el efecto en los precios.',
        solucion: '<p>Primero el banco central sube la tasa oficial, luego los bancos cobran más por sus créditos, después se pide menos dinero prestado y, por último, la gente gasta menos y baja la presión sobre los precios.</p>' },
    ],
    fuentes: [REV_BANCOCENTRAL, REV_PARAQUE, REV_AUTONOMIA, CORE10, CORE15, SERNAC],
  });

  // ------------------------------------------------------------------
  const DEMANDA_AGGREGADA = G({
    x: [0, 10], y: [0, 12], pasos: [2, 2], nombres: false,
    funciones: [
      { f: (x) => 10 - x, etiqueta: 'demanda antes de subir la tasa' },
      { f: (x) => 8 - x, etiqueta: 'demanda cuando la tasa oficial sube' },
    ],
    figuras: [
      ...flecha([5, 5], [3, 5], 2, 1.1),
      txt(0, 12.35, 'precio'),
      txt(5, 0.5, 'cantidad'),
    ],
    descripcion: 'Gráfica con dos rectas que bajan de izquierda a derecha. La recta de la demanda antes de subir la tasa oficial va de (0, 10) a (10, 0). La de la demanda cuando la tasa oficial sube está desplazada a la izquierda: va de (0, 8) a (8, 0). En el eje horizontal está la cantidad que se quiere comprar y en el vertical, el precio. Una flecha señala el desplazamiento: a un precio de 5, antes se compraban 5 unidades y ahora solo 3.',
  });

  L('Tasas de interés y su efecto en la economía', {
    objetivo: 'Entender cómo la tasa de interés oficial mueve el crédito, el gasto y los precios de un país, y por qué una tasa que parece buena puede no serlo cuando los precios suben.',
    explicacion: `
      <p>Dos bolsas de arroz iguales: una comprada antes de que los precios subieran y otra después. ¿En cuál fuiste más listo? En ninguna. Las dos traían el mismo arroz; lo que cambió fue cuánto costó. Esa idea, que con el mismo dinero compras menos cosas, está detrás de esta lección.</p>
      <h3>La tasa que ves y la que fija el banco central</h3>
      <p>Cuando pides un crédito, el banco te cobra un interés. Ese número no lo decide tu banco por capricho: hay una tasa de referencia que viene de más arriba y mueve todo lo demás. La <strong>tasa oficial</strong> (<span lang="en">policy rate</span>) es la tasa que fija el banco central: es el precio al que el banco central les presta a los bancos. Las demás tasas se mueven con ella. La tasa de tu crédito no es la misma que la oficial, pero la sigue: los bancos usan la tasa de referencia para calcular el costo de prestar dinero (México, 2022) y, en gran medida, lo que te cobran depende de la tasa oficial (global). Por eso, cuando la tasa oficial sube, los créditos nuevos salen más caros.</p>
      <h3>La demanda agregada: todo lo que se quiere comprar</h3>
      <p>Si sumas todo lo que las familias, las empresas y el Estado quieren comprar en un país, a un nivel de precios dado, tienes la <strong>demanda agregada</strong> (<span lang="en">aggregate demand</span>). En "Oferta y demanda" viste que la curva de demanda baja de izquierda a derecha: cuanto más caro está algo, menos se quiere. La demanda agregada es esa misma idea, pero dibujada para todo el país. Y aquí está lo importante: si la tasa oficial sube, los créditos se encarecen, la gente pide menos prestado, gasta menos y las empresas invierten menos. Eso no mueve la curva a lo largo de sí misma: la desplaza hacia la izquierda, porque a cada precio se compra menos. Si la tasa oficial baja, pasa lo contrario: la curva se desplaza hacia la derecha.</p>
      ${DEMANDA_AGGREGADA}
      <p>El eje horizontal es la cantidad y el vertical, el precio. La línea de la izquierda es la demanda cuando la tasa oficial sube: a un mismo precio se compra menos, y la flecha muestra el desplazamiento.</p>
      <p>Y esto es lo que la tasa le hace a la economía entera:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Qué pasa</th><th>Si la tasa oficial sube</th><th>Si la tasa oficial baja</th></tr>
        <tr><td>El crédito</td><td>Los bancos cobran más</td><td>Los bancos cobran menos</td></tr>
        <tr><td>El gasto</td><td>Baja: se pide menos prestado</td><td>Sube: los créditos son más baratos</td></tr>
        <tr><td>La inversión de las empresas</td><td>Baja: ampliar una planta sale más caro</td><td>Sube: sale más barato</td></tr>
        <tr><td>Los precios</td><td>Baja la presión para que suban</td><td>Sube la presión para que suban</td></tr>
        <tr><td>El empleo</td><td>Las empresas contratan menos</td><td>Las empresas contratan más</td></tr>
      </table></div>
      <h3>La tasa que de verdad importa</h3>
      <p>Falta un detalle importante. Si pides prestado al 6% y ese año la inflación es del 4%, los precios subieron y el dinero compra menos. La tasa del crédito menos lo que subieron los precios se llama <strong>tasa real</strong> (<span lang="en">real interest rate</span>): 6% − 4% = 2%. Ese 2% es el costo real del préstamo: lo que pagas por encima de la subida de los precios. Y el mismo cálculo al revés: un depósito que paga 2% con una inflación del 4% tiene una tasa real de −2%, es decir, pierdes poder de compra aunque el banco te pague. La cuenta exacta, que descuenta la inflación con una división, la viste en "Tasa nominal y tasa real"; aquí basta con la resta. Para cuidar tu dinero cuando los precios suben, está "Proteger tu dinero de la inflación y la devaluación".</p>
      <p>Para calcular cuánto pagas de interés ya sabes cómo: en "Interés simple" viste que el interés es un porcentaje del dinero, y en "Interés compuesto: la fuerza del tiempo" que el interés genera intereses. Esta lección no repite esas fórmulas: lo nuevo es lo que pasa en la economía cuando la tasa se mueve.</p>`,
    ejemplo: `
      <p>Una familia pide un crédito de $1 000 al 6% anual, y ese año la inflación es del 4%. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Primero, el interés que se paga. Como el interés es un porcentaje del dinero (visto en "Interés simple"), es 1 000 × 6 ÷ 100 = $60 en un año.</li>
        <li>Segundo, la tasa real: la tasa del crédito menos lo que subieron los precios. 6% − 4% = 2%. El costo real del préstamo es 2%.</li>
        <li>Tercero, la comparación. Un depósito que paga el 2% con esa misma inflación del 4% tiene una tasa real de 2% − 4% = −2%: el banco te paga, pero compras menos de lo que comprabas.</li>
        <li>Cuarto, el criterio: una tasa que se ve buena puede no serlo si los precios suben más que ella.</li>
      </ol>
      <p>Resultado: <span class="resultado">pagas $60 de interés, pero tu tasa real es 2%, y un depósito al 2% pierde poder de compra</span>.</p>
      <p class="nota"><strong>Error común:</strong> mirar solo el 6% y olvidar que los precios también suben. Lo que cuenta es la tasa real: 2%.</p>`,
    vidaReal: `
      <p>Esta lección se nota cuando pides dinero prestado o cuando ahorras:</p>
      <ul>
        <li>Al pedir un crédito, entiendes por qué el interés cambia aunque tú no hayas hecho nada distinto.</li>
        <li>Al comparar un crédito con un depósito, puedes preguntarte cuál gana después de la inflación.</li>
        <li>Cuando lees que «subieron las tasas», sabes que los créditos se encarecieron y que el gasto se enfría.</li>
        <li>Cuando un negocio te ofrece «paga 8% anual», puedes preguntarte cuánto de eso es real.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un crédito de $1 000 al 6% anual. ¿Cuánto de interés se paga en un año?</p>', respuesta: 1000 * 6 / 100,
        pista: '<p>El interés es el 6% del dinero: multiplica y divide entre 100.</p>',
        solucion: '<p>1 000 × 6 ÷ 100 = <strong>$60</strong> de interés en un año.</p>' },
      { tipo: 'numero', enunciado: '<p>Un crédito paga 6% y ese año la inflación es del 4%. ¿Cuál es la tasa real, en porcentaje?</p>', respuesta: 6 - 4,
        pista: '<p>La tasa real es la tasa del crédito menos lo que suben los precios.</p>',
        solucion: '<p>6% − 4% = <strong>2%</strong> de tasa real. Es el costo del préstamo por encima de la subida de los precios.</p>' },
      { tipo: 'numero', enunciado: '<p>Un banco central baja su tasa oficial del 7% al 4%. ¿Cuántos puntos bajó la tasa?</p>', respuesta: 7 - 4,
        pista: '<p>Resta la tasa nueva de la tasa anterior.</p>',
        solucion: '<p>7 − 4 = <strong>3 puntos</strong>. Con una tasa oficial más baja, los créditos se abaratan y el gasto se calienta.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué pasa con la demanda agregada de un país cuando la tasa oficial sube?</p>',
        opciones: ['Sube: a cada precio se compra más', 'Baja: a cada precio se compra menos', 'No cambia, porque la demanda solo depende de los precios'], correcta: 1,
        pista: '<p>Piensa qué pasa primero con los créditos y después con el gasto.',
        solucion: '<p><strong>Baja: a cada precio se compra menos</strong>. Los créditos se encarecen, se pide menos prestado y se gasta menos, así que la curva se desplaza hacia la izquierda.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la suma de los bienes y servicios que las personas, las empresas y el Estado quieren comprar a un nivel de precios?</p>',
        respuestas: ['demanda agregada', 'la demanda agregada', 'aggregate demand'],
        pista: '<p>Son dos palabras: la primera es «demanda» y la segunda dice que es de todo el país junto.',
        solucion: '<p>La <strong>demanda agregada</strong>: todo lo que se quiere comprar en un país a un nivel de precios dado. La política monetaria la mueve, como viste en "Oferta y demanda" para el caso de un solo mercado.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena lo que pasa en la economía cuando el banco central sube la tasa oficial.</p>',
        respuesta: ['El banco central sube la tasa oficial', 'Los bancos cobran más por sus créditos', 'Las familias y las empresas piden menos prestado y gastan menos', 'La demanda agregada baja y los precios suben menos'],
        pista: '<p>Empieza por la decisión del banco central y termina por los precios.',
        solucion: '<p>Primero sube la tasa oficial, luego los bancos cobran más, después se pide menos prestado y se gasta menos y, por último, la demanda agregada baja y los precios suben menos.</p>' },
    ],
    fuentes: [CORE15, WIKI_DEMANDA, REV_MASCARO, REV_INFLACAFECTA, REV_DINEROINFLACION, CORE10, SERNAC],
  });
})();
