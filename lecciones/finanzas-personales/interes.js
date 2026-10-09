// Finanzas personales · Unidad 4: Interés e inflación.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Sin consejos personalizados ni productos por su nombre. Tasas, leyes y estadísticas van con su país, su año y su fuente.
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('finanzas-personales', titulo, datos);
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

  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const FPT = (ruta, nombre) => ({ nombre: `Finanzas para todos (Banco de España y CNMV): ${nombre}`, url: `https://www.finanzasparatodos.es/${ruta}` });
  const REV = (ruta, nombre) => ({ nombre: `CONDUSEF (México), Revista Proteja su Dinero: ${nombre}`, url: `https://revista.condusef.gob.mx/${ruta}/` });
  const BCE = { nombre: 'Banco Central Europeo: ¿Qué es la inflación?', url: 'https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_inflation.es.html' };
  const INEGI = { nombre: 'INEGI (México): Índice Nacional de Precios al Consumidor (INPC)', url: 'https://www.inegi.org.mx/temas/inpc/' };
  const INE = { nombre: 'Instituto Nacional de Estadística (España): Índice de Precios de Consumo (IPC)', url: 'https://www.ine.es/prensa/ipc_prensa.htm' };
  const R72 = { nombre: 'Wikipedia: Rule of 72 (en inglés)', url: 'https://en.wikipedia.org/wiki/Rule_of_72' };
  const FPT_PRESUPUESTO = FPT('como-elaborar-un-presupuesto', '¿Cómo elaborar un presupuesto?');
  const REV_COMPUESTO = REV('inversion/otros/2012/06/la-magia-del-interes-compuesto', 'La magia del interés compuesto');
  const REV_INFLACION = REV('usuario-inteligente/sabias-que/2023/01/que-es-la-inflacion-y-como-afecta-a-tu-bolsillo', '¿Qué es la inflación y cómo afecta a tu bolsillo?');
  const REV_ESFUME = REV('usuario-inteligente/tu-bolsillo/2025/09/que-tu-dinero-no-se-esfume', '¡Que tu dinero no se esfume!');

  // ------------------------------------------------------------------
  const RECTA = G({
    x: [0, 5], y: [0, 8], pasos: [1, 2], nombres: false,
    funciones: [{ f: (t) => 5 + 0.4 * t, etiqueta: 'monto, en miles de $' }],
    puntos: [{ x: 0, y: 5, etiqueta: 'inicio: 5' }, { x: 3, y: 6.2, etiqueta: 'año 3: 6.2' }],
    descripcion: 'Gráfica del monto con interés simple, en miles, contra los años, de 0 a 5. Es una recta que empieza en 5 mil y sube 0.4 mil, es decir 400, cada año. En el año 3 vale 6.2 mil.',
  });

  L('Interés simple', {
    objetivo: 'Calcular el interés simple y el monto final con la fórmula I = C × i × t, y encontrar la tasa a partir del interés.',
    explicacion: `
      <p>Imagina que alguien de tu familia te pide prestados $1 000 y te los devuelve dentro de un año, exactamente los mismos $1 000. Parece justo, pero durante ese año tú no pudiste usar ese dinero. Por eso, cuando alguien usa dinero que no es suyo, casi siempre paga un extra. Ese extra es el interés, que ya mencionamos en "Por qué ahorrar".</p>
      <h3>Las tres piezas</h3>
      <p>El interés depende de tres cosas. La primera es el <strong>capital</strong>, que es el dinero que prestas, ahorras o pides prestado al principio. La segunda es la <strong>tasa de interés</strong>, que es el porcentaje que se paga por cada periodo, casi siempre por año. La tercera es el tiempo.</p>
      <p>Esto funciona en los dos sentidos. Cuando ahorras en una institución, ella usa tu dinero y te paga interés a ti. Cuando pides prestado, tú usas el dinero de otros y pagas el interés. En la unidad Crédito verás ese segundo lado con calma.</p>
      <h3>Interés que no se suma</h3>
      <p>La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, pone este ejemplo: inviertes $5 000 a una tasa de 8% al año. Al cabo de un año ganas $400, porque el 8% de 5 000 es 400, como viste en "Porcentajes". Si retiras esos $400 y dejas los $5 000, al año siguiente vuelves a ganar $400, y así cada año.</p>
      <p>Cuando el interés se calcula siempre sobre el capital del principio, se llama <strong>interés simple</strong>. Su fórmula es:</p>
      <p><strong>I = C × i × t</strong></p>
      <p>Se lee "el interés es el capital por la tasa por el tiempo". C es el capital; i es la tasa escrita como decimal, así que 8% es 0.08; y t es el tiempo, en la misma unidad que la tasa: si la tasa es por año, t va en años. Al final tienes el capital más el interés, y a esa suma se le llama monto:</p>
      <p><strong>monto = C + I</strong></p>
      <h3>Crece en línea recta</h3>
      <p>Fíjate que cada año se suma lo mismo: 400, 400, 400. Es como el taxímetro de "Función lineal y pendiente": empiezas en 5 000 y subes siempre la misma cantidad. Por eso la gráfica del interés simple es una recta.</p>
      ${RECTA}
      <h3>Cuando el tiempo no es un año</h3>
      <p>Si la tasa es anual y el plazo es de meses, convierte los meses en años antes de multiplicar. Seis meses son medio año, 0.5; tres meses son un cuarto de año, 0.25. Con $5 000 al 8% durante 6 meses: I = 5 000 × 0.08 × 0.5 = $200, la mitad de lo que ganas en un año completo.</p>
      <p>La fórmula también sirve al revés. Si sabes cuánto interés se pagó, puedes encontrar la tasa: i = I ÷ (C × t). Si $5 000 ganaron $600 en 2 años, i = 600 ÷ (5 000 × 2) = 0.06, es decir, 6% al año.</p>
      <p class="nota"><strong>Trampa común:</strong> poner la tasa como número entero. Con 8 en lugar de 0.08, el interés de $5 000 en un año saldría $40 000. Antes de multiplicar, divide el porcentaje entre 100.</p>`,
    ejemplo: `
      <p>Depositas $5 000 a una tasa de interés simple de 8% anual durante 3 años, como en el ejemplo de la CONDUSEF. ¿Cuánto interés ganas y cuánto tienes al final?</p>
      <ol class="pasos-ej">
        <li>Identifica las piezas: C = 5 000; i = 8% = 0.08; t = 3 años.</li>
        <li>Calcula el interés: I = 5 000 × 0.08 × 3. Primero 5 000 × 0.08 = 400, que es el interés de un año; luego 400 × 3 = $1 200.</li>
        <li>Suma el capital para obtener el monto: 5 000 + 1 200 = $6 200.</li>
        <li>Comprueba año por año: 5 000 → 5 400 → 5 800 → 6 200. Cada año suma 400, porque el interés siempre se calcula sobre los 5 000 del principio.</li>
      </ol>
      <p>Resultado: <span class="resultado">$1 200 de interés y $6 200 al final</span>.</p>
      <p class="nota"><strong>Error común:</strong> contestar $1 200 cuando te preguntan cuánto tienes al final. Eso es solo lo que ganaste; falta sumar el dinero con el que empezaste.</p>`,
    vidaReal: `
      <p>Saber calcular el interés te ayuda cada vez que el dinero cambia de manos:</p>
      <ul>
        <li>Al comparar dos ofertas para guardar tu dinero, puedes calcular cuánto te pagará cada una.</li>
        <li>Antes de prestarle dinero a alguien, puedes acordar con claridad cuánto te devolverá.</li>
        <li>En un préstamo, sabes cuánto pagarás de más por usar dinero ajeno.</li>
        <li>Con una sola multiplicación puedes revisar si una cuenta que te dan está bien hecha.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuánto interés simple ganan $8 000 al 5% anual en 2 años?</p>', respuesta: 8000 * 0.05 * 2,
        pista: '<p>Usa I = C × i × t, con la tasa como decimal: 5% = 0.05.</p>',
        solucion: '<p>8 000 × 0.05 = 400 al año, y 400 × 2 = <strong>$800</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Depositas $12 000 al 4% anual de interés simple durante 3 años. ¿Cuánto tienes al final?</p>', respuesta: 12000 + 12000 * 0.04 * 3,
        pista: '<p>Calcula primero el interés y después súmale el capital.</p>',
        solucion: '<p>El interés es 12 000 × 0.04 × 3 = 1 440. El monto es 12 000 + 1 440 = <strong>$13 440</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Prestas $6 000 al 10% anual de interés simple durante 6 meses. ¿Cuánto interés se paga?</p>', respuesta: 6000 * 0.1 * 0.5,
        pista: '<p>La tasa es por año: 6 meses son 0.5 años.</p>',
        solucion: '<p>6 000 × 0.10 × 0.5 = <strong>$300</strong>, la mitad de los 600 que se pagarían en un año.</p>' },
      { tipo: 'numero', enunciado: '<p>$4 000 ganaron $480 de interés simple en 3 años. ¿Cuál fue la tasa anual, en porcentaje?</p>', respuesta: 480 / (4000 * 3) * 100,
        pista: '<p>Despeja la tasa: i = I ÷ (C × t). Al final multiplica por 100.</p>',
        solucion: '<p>i = 480 ÷ (4 000 × 3) = 480 ÷ 12 000 = 0.04, es decir, <strong>4%</strong> al año.</p>' },
      { tipo: 'opciones', enunciado: '<p>Con interés simple, ¿qué forma tiene la gráfica de tu dinero año tras año?</p>',
        opciones: ['Una recta, porque cada año suma lo mismo', 'Una curva que sube cada vez más rápido', 'Una línea horizontal, porque el capital no cambia'], correcta: 0,
        pista: '<p>Recuerda el ejemplo de la CONDUSEF: ¿cuánto se suma cada año?</p>',
        solucion: '<p><strong>Una recta.</strong> Cada año se suma la misma cantidad, como en una función lineal.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el dinero que prestas, ahorras o pides prestado al principio, sobre el que se calcula el interés?</p>',
        respuestas: ['capital', 'el capital', 'capital inicial', 'el capital inicial'],
        pista: '<p>En la fórmula I = C × i × t es la letra C.</p>',
        solucion: '<p>El <strong>capital</strong>.</p>' },
    ],
    fuentes: [REV_COMPUESTO, WIKI('Interés_simple', 'Interés simple')],
  });

  // ------------------------------------------------------------------
  const CURVAS = G({
    x: [0, 30], y: [0, 60], pasos: [5, 10], nombres: false,
    funciones: [{ f: (t) => 10 + 0.6 * t, etiqueta: 'interés simple', serie: 0 }, { f: (t) => 10 * 1.06 ** t, etiqueta: 'interés compuesto', serie: 1 }],
    descripcion: 'Gráfica de 10 mil al 6% anual, en miles, contra los años, de 0 a 30. El interés simple es una recta que llega a 28 mil a los 30 años. El interés compuesto es una curva que al principio va casi junto a la recta y luego se separa hacia arriba, hasta unos 57 mil a los 30 años.',
  });

  L('Interés compuesto: la fuerza del tiempo', {
    objetivo: 'Calcular el monto con interés compuesto, compararlo con el interés simple y estimar con la regla del 72 cuánto tarda el dinero en duplicarse.',
    explicacion: `
      <p>Vuelve a los $5 000 al 8% de "Interés simple". Ahora haz una sola cosa distinta: al terminar el año, no retires los $400; déjalos junto con tu dinero. La CONDUSEF hace la cuenta: el segundo año empiezas con $5 400 y terminas con $5 832; el tercer año llegas a unos $6 299. Con interés simple habrías tenido $6 200.</p>
      <h3>Intereses que también ganan intereses</h3>
      <p>¿De dónde salen esos $99 de diferencia? El segundo año, el 8% ya no se calcula sobre 5 000, sino sobre 5 400: los intereses del primer año también ganan intereses. La CONDUSEF lo resume así: es ganar intereses sobre intereses. A esto se le llama <strong>interés compuesto</strong>.</p>
      <p>Cada año pasa lo mismo: lo que tienes se multiplica por 1.08, porque subir 8% es tener el 100% más el 8%, como viste en "Porcentajes". Después de n años lo multiplicaste n veces:</p>
      <p><strong>M = C × (1 + i)ⁿ</strong></p>
      <p>Se lee "el monto es el capital por uno más la tasa, elevado al número de periodos". C es el capital, i la tasa en decimal y n cuántas veces se suma el interés, casi siempre años. Es la función exponencial de "Función exponencial: crecimiento y decaimiento", con a = C y b = 1 + i.</p>
      <h3>El tiempo hace la diferencia</h3>
      <p>Al principio, el simple y el compuesto casi no se distinguen. Pero el compuesto multiplica cada año una cantidad más grande, y con los años se separan cada vez más. Mira lo que pasa con $10 000 al 6% anual:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Años</th><th>Interés simple</th><th>Interés compuesto</th></tr>
        <tr><th>1</th><td>$10 600</td><td>$10 600</td></tr>
        <tr><th>5</th><td>$13 000</td><td>$13 382</td></tr>
        <tr><th>10</th><td>$16 000</td><td>$17 908</td></tr>
        <tr><th>20</th><td>$22 000</td><td>$32 071</td></tr>
        <tr><th>30</th><td>$28 000</td><td>$57 435</td></tr>
      </table></div>
      ${CURVAS}
      <p>Por eso el tiempo pesa tanto. Quien empieza a ahorrar diez años antes le da al interés compuesto diez años más para multiplicar. La CONDUSEF agrega que, si además sigues aportando dinero cada cierto tiempo, el crecimiento se acelera todavía más.</p>
      <h3>Un atajo: la regla del 72</h3>
      <p>¿Cuánto tarda tu dinero en duplicarse? La <strong>regla del 72</strong> da una respuesta aproximada: divide 72 entre la tasa anual, escrita en porcentaje. Al 6%, 72 ÷ 6 = 12 años; al 8%, 72 ÷ 8 = 9 años. Funciona bien con tasas pequeñas, y el cálculo exacto lo viste en "Logaritmos".</p>
      <h3>Los dos lados</h3>
      <p>El interés compuesto también puede trabajar en tu contra. Una deuda que no pagas puede crecer de la misma forma, porque te cobran intereses sobre los intereses que no pagaste; lo verás en la unidad Crédito. Y del lado del ahorro, la CONDUSEF recuerda que las comisiones y los impuestos se llevan parte de lo que ganas, así que hay que mirar lo que de verdad queda.</p>
      <p class="nota"><strong>Trampa común:</strong> calcular 8% × 3 años = 24% y decir que el dinero creció 24%. Eso es interés simple. Con interés compuesto crece más, porque cada año el porcentaje se aplica sobre una cantidad mayor: 1.08³ ≈ 1.26, es decir, casi 26%.</p>`,
    ejemplo: `
      <p>Depositas $10 000 al 6% anual con interés compuesto y no retiras nada durante 10 años. ¿Cuánto tienes al final?</p>
      <ol class="pasos-ej">
        <li>Identifica las piezas: C = 10 000, i = 0.06 y n = 10.</li>
        <li>Calcula el factor 1.06¹⁰, que es 1.06 multiplicado por sí mismo diez veces. Con la tecla de potencia de la calculadora da unos 1.7908.</li>
        <li>Multiplica por el capital: 10 000 × 1.7908 ≈ $17 908.</li>
        <li>Compara con el interés simple: 10 000 × 0.06 × 10 = 6 000 de interés, para un monto de $16 000. El compuesto te da unos $1 908 más.</li>
        <li>Comprueba con la regla del 72: al 6%, el dinero se duplica en unos 12 años. A los 10 años debe estar cerca de 20 000, pero todavía abajo, y 17 908 cuadra.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos $17 908</span>.</p>
      <p class="nota"><strong>Error común:</strong> calcular 10 000 × 1.06 × 10 = 106 000. Ese 10 es un exponente: el 1.06 se multiplica diez veces por sí mismo, no por diez.</p>`,
    vidaReal: `
      <p>Entender cómo crece el dinero con el tiempo cambia algunas decisiones:</p>
      <ul>
        <li>Empezar a guardar pronto, aunque sea poco, puede valer más que guardar mucho más tarde.</li>
        <li>Sabes por qué una deuda que se deja crecer se vuelve tan difícil de pagar.</li>
        <li>Puedes estimar de cabeza en cuántos años se duplica tu dinero.</li>
        <li>Entiendes por qué conviene no retirar lo que ganas si no lo necesitas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Depositas $2 000 al 10% anual con interés compuesto. ¿Cuánto tienes después de 2 años?</p>', respuesta: 2000 * 1.1 ** 2, tolerancia: 0.5,
        pista: '<p>Cada año se multiplica por 1.10: 2 000 × 1.1².</p>',
        solucion: '<p>2 000 → 2 200 → 2 420. En una sola cuenta: 2 000 × 1.21 = <strong>$2 420</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Depositas $5 000 al 8% anual con interés compuesto durante 5 años. ¿Cuánto tienes al final? Redondea a pesos enteros.</p>', respuesta: 5000 * 1.08 ** 5, tolerancia: 1,
        pista: '<p>Usa M = C × (1 + i)ⁿ con C = 5 000, i = 0.08 y n = 5.</p>',
        solucion: '<p>1.08⁵ ≈ 1.4693, y 5 000 × 1.4693 ≈ <strong>$7 347</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con $1 000 al 10% anual durante 3 años, ¿cuánto más tienes con interés compuesto que con interés simple?</p>', respuesta: 1000 * 1.1 ** 3 - (1000 + 1000 * 0.1 * 3), tolerancia: 0.5,
        pista: '<p>Calcula los dos montos y réstalos.</p>',
        solucion: '<p>Compuesto: 1 000 × 1.1³ = 1 331. Simple: 1 000 + 300 = 1 300. La diferencia es <strong>$31</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Según la regla del 72, ¿en cuántos años, aproximadamente, se duplica tu dinero al 9% anual?</p>', respuesta: 72 / 9,
        pista: '<p>Divide 72 entre la tasa escrita en porcentaje.</p>',
        solucion: '<p>72 ÷ 9 = <strong>8 años</strong>, aproximadamente.</p>' },
      { tipo: 'opciones', enunciado: '<p>Dos personas depositan una sola vez $10 000 al mismo 6% anual con interés compuesto y no retiran nada. Una lo hace a los 25 años y la otra a los 35. ¿Quién tiene más a los 60?</p>',
        opciones: ['La que depositó a los 25, porque su dinero tuvo 10 años más para crecer', 'La que depositó a los 35, porque lo hizo con más experiencia', 'Las dos tienen lo mismo, porque depositaron la misma cantidad'], correcta: 0,
        pista: '<p>En M = C × (1 + i)ⁿ, ¿qué cambia entre las dos personas?</p>',
        solucion: '<p><strong>La que depositó a los 25.</strong> Su exponente es 35 y el de la otra es 25. Con la regla del 72, al 6% el dinero se duplica cada 12 años: diez años más valen un poco menos que otra duplicación (1.06¹⁰ ≈ 1.79).</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué hace crecer más tu dinero con interés compuesto?</p>',
        opciones: ['Retirar los intereses cada año', 'Dejar los intereses junto con el capital durante muchos años', 'Cambiar el dinero de cuenta cada mes'], correcta: 1,
        pista: '<p>El interés compuesto necesita que los intereses se queden para ganar más intereses.</p>',
        solucion: '<p><strong>Dejar los intereses durante muchos años.</strong> Si los retiras, vuelves al interés simple.</p>' },
    ],
    fuentes: [REV_COMPUESTO, WIKI('Interés_compuesto', 'Interés compuesto'), R72],
  });

  // ------------------------------------------------------------------
  const CESTA = barras({
    etiquetas: ['año base', '1 año después', '2 años después'], valores: [850, 875, 891], max: 891, paso: 1e9,
    descripcion: 'Gráfica de barras del costo de la misma canasta en el ejemplo del Banco Central Europeo, en euros. Año base: 850. Un año después: 875. Dos años después: 891. Las barras crecen poco a poco.',
  });

  L('Inflación: por qué todo sube de precio', {
    objetivo: 'Explicar qué es la inflación y cómo se mide, calcularla a partir del precio de una canasta y entender cómo reduce el poder adquisitivo.',
    explicacion: `
      <p>Quizá has notado que el pan, las tortillas o el pasaje ya no cuestan lo mismo que hace un año. La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, usa justo ese ejemplo para explicar una palabra que oyes seguido en las noticias.</p>
      <h3>Qué es</h3>
      <p>La <strong>inflación</strong> es el aumento general y continuo de los precios. Fíjate en la palabra "general". El Banco Central Europeo (BCE) lo aclara: siempre hay cosas que suben y otras que bajan; hay inflación cuando sube el precio del conjunto, no el de un solo producto. Así, con el mismo dinero, hoy compras menos cosas que ayer.</p>
      <h3>Cómo se mide</h3>
      <p>Para medirla se arma una canasta, o cesta, con lo que compran las familias en un año: comida, ropa, transporte, vivienda y servicios. Luego se compara cuánto cuesta esa misma canasta de un año a otro. El número que resume esos precios se llama <strong>índice de precios</strong>: al año que se toma como punto de partida se le da el valor 100, y los demás años se comparan con él.</p>
      <p>No todo pesa igual. Según el BCE, lo que las familias compran más pesa más en el índice. En la zona del euro, según la página del BCE consultada en 2026, la gasolina y otros combustibles pesan 4.6%, y el café, el té y el cacao juntos, solo 0.4%. Así, un aumento de la gasolina mueve el índice unas diez veces más que el mismo aumento del café.</p>
      <p>El BCE da este ejemplo con una canasta pequeña, en euros:</p>
      ${CESTA}
      <p>La canasta costó 850 € el primer año, 875 € el segundo y 891 € el tercero. La inflación es cuánto subió, en porcentaje:</p>
      <p><strong>inflación = (precio nuevo − precio anterior) ÷ precio anterior × 100</strong></p>
      <p>Se lee "cuánto subió, comparado con lo que costaba antes". En el ejemplo, (875 − 850) ÷ 850 × 100 ≈ 2.9%. Cada país publica la suya: en México la calcula el INEGI con el Índice Nacional de Precios al Consumidor, y en España el INE con el Índice de Precios de Consumo. Revisa la de tu país en su instituto de estadística o en su banco central.</p>
      <h3>Por qué pasa</h3>
      <p>Las causas son varias. Según la CONDUSEF, los precios pueden subir cuando la gente quiere comprar más de lo que hay, cuando sube lo que cuesta producir, cuando se imprime dinero sin respaldo suficiente, o por conflictos políticos y desastres naturales. Muchos bancos centrales buscan que la inflación sea baja y estable; el del euro, por ejemplo, tiene como objetivo el 2% a medio plazo.</p>
      <h3>Qué le hace a tu dinero</h3>
      <p>La inflación hace que tu dinero compre menos. A lo que puedes comprar con tu dinero se le llama <strong>poder adquisitivo</strong>. Si los precios suben 5% en un año, $1 000 guardados en casa compran lo que antes costaba unos 1 000 ÷ 1.05 ≈ $952. Es la tarea de depósito de valor, de "Qué es el dinero", que empieza a fallar.</p>
      <p>Con los años el efecto se acumula, como el interés compuesto. Finanzas para todos, del Banco de España y la CNMV, calcula que con una inflación de 3% cada año, los precios se duplican en 24 años; es la regla del 72 de la lección anterior: 72 ÷ 3 = 24. La CONDUSEF recuerda, además, que los sueldos no siempre suben al mismo ritmo que los precios. En la unidad Cómo prepararse para una crisis o una depresión verás cómo proteger tu dinero de la inflación.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que una inflación de 2% significa que todo subió 2%. Es un promedio: en el ejemplo del BCE, el pan bajó de precio el segundo año, aunque la canasta completa subió.</p>`,
    ejemplo: `
      <p>Con la canasta del BCE, ¿cuál fue la inflación del tercer año, cuando la canasta pasó de 875 € a 891 €?</p>
      <ol class="pasos-ej">
        <li>Calcula cuánto subió: 891 − 875 = 16 €.</li>
        <li>Compara con lo que costaba el año anterior, no con el primer año: 16 ÷ 875 ≈ 0.0183.</li>
        <li>Pasa a porcentaje: 0.0183 × 100 ≈ 1.8%.</li>
        <li>Comprueba con el índice del BCE, que pasó de 102.9 a 104.8: (104.8 − 102.9) ÷ 102.9 ≈ 1.8%, el mismo resultado.</li>
        <li>Fíjate que la canasta siguió subiendo, pero más despacio que el año anterior, cuando subió 2.9%. Los precios no bajaron: lo que bajó fue la velocidad con la que suben, como un auto que frena pero sigue avanzando.</li>
      </ol>
      <p>Resultado: <span class="resultado">una inflación de alrededor de 1.8%</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que, como la inflación bajó de 2.9% a 1.8%, los precios bajaron. Siguieron subiendo, solo que menos.</p>`,
    vidaReal: `
      <p>Entender por qué suben los precios te ayuda a tomar mejores decisiones:</p>
      <ul>
        <li>Entiendes las noticias cuando dicen que "los precios subieron 4% este año".</li>
        <li>Al pedir un aumento de sueldo, sabes cuánto necesitas solo para no quedarte atrás.</li>
        <li>Ves por qué el dinero guardado en casa durante años termina comprando menos.</li>
        <li>Al planear una compra para dentro de varios años, cuentas con que costará más.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una canasta costaba $2 000 y un año después cuesta $2 100. ¿Cuál fue la inflación, en porcentaje?</p>', respuesta: (2100 - 2000) / 2000 * 100,
        pista: '<p>Calcula cuánto subió y divídelo entre lo que costaba antes.</p>',
        solucion: '<p>Subió 100, y 100 ÷ 2 000 = 0.05, es decir, <strong>5%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un producto cuesta $80. Si su precio sube 5% este año, ¿cuánto costará?</p>', respuesta: 80 * 1.05,
        pista: '<p>Subir 5% es multiplicar por 1.05.</p>',
        solucion: '<p>80 × 1.05 = <strong>$84</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En un año los precios subieron 10%. Con $1 100 de hoy, ¿cuánto de lo que costaba antes puedes comprar?</p>', respuesta: 1100 / 1.1,
        pista: '<p>Lo que antes costaba 1 ahora cuesta 1.10. Divide entre 1.10.</p>',
        solucion: '<p>1 100 ÷ 1.10 = <strong>$1 000</strong>. Tus $1 100 compran lo mismo que $1 000 el año pasado.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas situaciones es inflación?</p>',
        opciones: ['Sube el precio del jitomate por una helada, y lo demás sigue igual', 'Sube el precio de casi todo lo que compran las familias durante el año', 'Una tienda pone ofertas de fin de temporada'], correcta: 1,
        pista: '<p>La inflación es un aumento general, no de un solo producto.</p>',
        solucion: '<p><strong>Sube casi todo lo que compran las familias.</strong> Que suba un solo producto, como el jitomate, no es inflación.</p>' },
      { tipo: 'opciones', enunciado: '<p>En un índice de precios, ¿qué pesa más?</p>',
        opciones: ['Lo que las familias compran más', 'Lo que es más caro por unidad', 'Todo pesa lo mismo'], correcta: 0,
        pista: '<p>Recuerda la gasolina y el café en el ejemplo del BCE.</p>',
        solucion: '<p><strong>Lo que las familias compran más.</strong> Por eso la gasolina pesa más que el café en el índice de la zona del euro.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama lo que puedes comprar con tu dinero, que la inflación va reduciendo?</p>',
        respuestas: ['poder adquisitivo', 'el poder adquisitivo', 'poder de compra', 'el poder de compra'],
        pista: '<p>Son dos palabras: la primera es "poder".</p>',
        solucion: '<p>El <strong>poder adquisitivo</strong>.</p>' },
    ],
    fuentes: [BCE, REV_INFLACION, REV_ESFUME, FPT_PRESUPUESTO, INEGI, INE, WIKI('Inflación', 'Inflación')],
  });

  // ------------------------------------------------------------------
  const X0 = 0.5, X1 = 11.5, CORTE = X0 + (X1 - X0) * 4 / 6;
  const PARTE = diagrama([0, 12], [0, 4.4], [
    { tipo: 'linea', desde: [X0, 3.3], hasta: [X1, 3.3] },
    { tipo: 'linea', desde: [X0, 3.05], hasta: [X0, 3.55] }, { tipo: 'linea', desde: [X1, 3.05], hasta: [X1, 3.55] },
    txt(6, 3.9, 'tasa nominal: 6%'),
    caja(X0, 1.6, CORTE, 2.7, true), caja(CORTE, 1.6, X1, 2.7),
    txt((X0 + CORTE) / 2, 2.15, 'inflación: 4%'), txt((CORTE + X1) / 2, 2.15, 'real ≈ 2%'),
    txt(6, 0.9, 'lo que suben los precios + lo que de verdad ganas'),
  ], 'Una barra que representa una tasa nominal de 6%. Está partida en dos tramos: el de la izquierda, sombreado y más largo, es la inflación de 4%; el de la derecha es la tasa real, de alrededor de 2%. Debajo dice: lo que suben los precios más lo que de verdad ganas.');

  L('Tasa nominal y tasa real', {
    objetivo: 'Distinguir la tasa nominal de la tasa real, calcular la tasa real con el atajo y con la fórmula exacta, y saber cuándo tu dinero pierde valor.',
    explicacion: `
      <p>Tu cuenta te paga 3% al año. Ese mismo año, los precios suben 5%. Al final tienes más dinero que al principio, pero con él compras menos cosas. ¿Ganaste o perdiste?</p>
      <h3>Dos tasas distintas</h3>
      <p>La <strong>tasa nominal</strong> es la que te anuncian: cuánto crece la cantidad de dinero en tu cuenta. La <strong>tasa real</strong> es cuánto crece de verdad lo que puedes comprar con ese dinero, una vez que descuentas la inflación. La primera mide cuánto dinero tienes; la segunda, tu poder adquisitivo, que viste en "Inflación: por qué todo sube de precio".</p>
      <h3>La cuenta rápida</h3>
      <p>Si la inflación no es muy grande, la tasa real se parece mucho a una resta:</p>
      <p><strong>tasa real ≈ tasa nominal − inflación</strong></p>
      <p>Se lee "lo que te pagan menos lo que subieron los precios". El signo ≈ significa "aproximadamente". Wikipedia da este ejemplo: si un depósito paga 5% y se espera una inflación de 2%, la tasa real esperada es de alrededor de 3%.</p>
      ${PARTE}
      <p>En la escena del principio, 3% − 5% = −2%. La tasa real es negativa: aunque la cantidad en tu cuenta subió, puedes comprar alrededor de 2% menos. La CONDUSEF lo advierte: si la tasa de tu cuenta es menor que la inflación, tu dinero pierde valor aunque esté en el banco. Por eso también aconseja desconfiar de los "rendimientos muy seguros", es decir, de las ganancias que te prometen casi sin riesgo, cuando quedan por debajo de la inflación.</p>
      <h3>La cuenta exacta</h3>
      <p>La resta es un atajo. Para la cuenta exacta, compara cuánto creció tu dinero con cuánto crecieron los precios, dividiendo:</p>
      <p><strong>tasa real = (1 + tasa nominal) ÷ (1 + inflación) − 1</strong></p>
      <p>Se lee "lo que creció tu dinero, dividido entre lo que crecieron los precios, menos uno", con las tasas escritas en decimal. Con 6% y 4%: 1.06 ÷ 1.04 ≈ 1.0192; al restar 1 queda 0.0192, es decir, 1.92%, muy cerca del 2% de la resta. Wikipedia explica que la resta solo funciona bien cuando la inflación no es grande; con inflaciones altas, conviene la cuenta exacta.</p>
      <h3>Comparar bien</h3>
      <p>Además de la inflación, la CONDUSEF recuerda restar las comisiones y los impuestos, porque muchas veces se anuncia la tasa antes de quitarlos. Compara siempre "manzanas con manzanas": la misma clase de tasa y por el mismo periodo. En los créditos hay otra forma de comparar, que verás en "El costo total de un crédito".</p>
      <p class="nota"><strong>Trampa común:</strong> elegir siempre la tasa nominal más alta. Una cuenta que paga 10% en un país con 12% de inflación te deja peor que una que paga 4% donde la inflación es de 2%.</p>`,
    ejemplo: `
      <p>Depositas $10 000 al 7% anual. Ese año la inflación es de 4%. ¿Cuánto ganaste de verdad?</p>
      <ol class="pasos-ej">
        <li>Calcula cuánto dinero tienes: crece 7%, así que 10 000 × 1.07 = $10 700.</li>
        <li>Calcula cuánto cuesta ahora lo que antes costaba $10 000: sube 4%, así que 10 000 × 1.04 = $10 400.</li>
        <li>Compara los dos: con 10 700 compras lo que antes costaba 10 700 ÷ 1.04 ≈ $10 288. Ganaste unos $288 de poder adquisitivo, es decir, 2.88% real.</li>
        <li>Comprueba con la fórmula exacta: 1.07 ÷ 1.04 − 1 ≈ 0.0288, o sea, 2.88%.</li>
        <li>Y con el atajo: 7% − 4% = 3%, muy cerca.</li>
      </ol>
      <p>Resultado: <span class="resultado">una tasa real de alrededor de 2.9%</span>.</p>
      <p class="nota"><strong>Error común:</strong> restar al revés, inflación menos tasa nominal, 4% − 7% = −3%, y concluir que perdiste. Lo que se resta es la inflación.</p>`,
    vidaReal: `
      <p>Mirar más allá del porcentaje anunciado te protege de malas sorpresas:</p>
      <ul>
        <li>Antes de guardar tu dinero en una cuenta, puedes ver si de verdad crece o si los precios suben más rápido.</li>
        <li>Cuando te prometen una ganancia "muy segura", sabes qué preguntar.</li>
        <li>Puedes comparar ofertas de distintos años o países sin dejarte llevar por el número más grande.</li>
        <li>Entiendes por qué un aumento de sueldo pequeño puede no alcanzar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tu cuenta paga 8% al año y la inflación es de 3%. ¿Cuál es la tasa real aproximada, en porcentaje?</p>', respuesta: 8 - 3,
        pista: '<p>Usa el atajo: tasa nominal menos inflación.</p>',
        solucion: '<p>8% − 3% = <strong>5%</strong>, aproximadamente.</p>' },
      { tipo: 'numero', enunciado: '<p>Con la misma cuenta de 8% y una inflación de 3%, calcula la tasa real exacta, en porcentaje, con dos decimales.</p>', respuesta: (1.08 / 1.03 - 1) * 100, tolerancia: 0.01,
        pista: '<p>Divide 1.08 entre 1.03, resta 1 y multiplica por 100.</p>',
        solucion: '<p>1.08 ÷ 1.03 ≈ 1.0485. Al restar 1 queda 0.0485, es decir, <strong>4.85%</strong>, un poco menos que el 5% del atajo.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu cuenta paga 2% al año y la inflación es de 6%. ¿Cuál es la tasa real aproximada, en porcentaje?</p>', respuesta: 2 - 6,
        pista: '<p>Resta la inflación a la tasa nominal. El resultado puede ser negativo.</p>',
        solucion: '<p>2% − 6% = <strong>−4%</strong>. Es negativa: tu dinero pierde poder adquisitivo aunque esté en el banco.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas cuentas te deja más poder adquisitivo al final del año?</p>',
        opciones: ['Una que paga 9% con una inflación de 8%', 'Una que paga 12% con una inflación de 13%', 'Una que paga 5% con una inflación de 2%'], correcta: 2,
        pista: '<p>Calcula la tasa real aproximada de cada una.</p>',
        solucion: '<p><strong>La de 5% con 2% de inflación</strong>: su tasa real es de unos 3%. Las otras dan 1% y −1%.</p>' },
      { tipo: 'opciones', enunciado: '<p>Si tu cuenta paga menos que la inflación, ¿qué pasa con tu dinero?</p>',
        opciones: ['Crece y compra más cosas que antes', 'Tienes más dinero, pero con él compras menos', 'No cambia de valor, porque está en el banco'], correcta: 1,
        pista: '<p>Piensa en la tasa real: ¿es positiva o negativa?</p>',
        solucion: '<p><strong>Tienes más dinero, pero compras menos.</strong> La tasa real es negativa, como advierte la CONDUSEF.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la tasa que ya descontó la inflación y dice cuánto crece de verdad lo que puedes comprar?</p>',
        respuestas: ['tasa real', 'la tasa real', 'tasa de interés real', 'la tasa de interés real', 'tipo de interés real', 'interés real'],
        pista: '<p>Es lo contrario de la tasa nominal.</p>',
        solucion: '<p>La <strong>tasa real</strong>.</p>' },
    ],
    fuentes: [WIKI('Tipo_de_interés_real', 'Tipo de interés real'), REV_ESFUME, REV_COMPUESTO],
  });
})();
