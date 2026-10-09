// Finanzas personales · Unidad 10: Cómo prepararse para una crisis o una depresión.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Sin consejos personalizados ni bancos, fondos, instrumentos o marcas por su nombre.
// Los datos históricos van con su país y su año; las cifras de los ejemplos son de ejemplo.
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
  const FED = (ensayo, nombre) => ({ nombre: `Reserva Federal de EE. UU., Federal Reserve History: ${nombre} (en inglés)`, url: `https://www.federalreservehistory.org/essays/${ensayo}` });
  const WISC = (ruta, nombre) => ({ nombre: `Extensión de la Universidad de Wisconsin: ${nombre} (en inglés)`, url: `https://finances.extension.wisc.edu/articles/${ruta}/` });
  const REV_CRISIS14 = REV('usuario-inteligente/a-tu-favor/2014/03/finanzas-personales-a-prueba-de-crisis', 'Finanzas personales a prueba de crisis');
  const REV_CRISIS25 = REV('usuario-inteligente/sabias-que/2025/08/a-pruebade-crisis', 'A prueba de crisis');
  const REV_ESFUME = REV('usuario-inteligente/tu-bolsillo/2025/09/que-tu-dinero-no-se-esfume', '¡Que tu dinero no se esfume!');
  const REV_BILLETE = REV('usuario-inteligente/ponlo-en-la-balanza/2015/09/sube-el-billete-verde-que-hago', 'Sube el billete verde, ¿qué hago?');
  const REV_INVIERTE = REV('inversion/2026/05/invierte-en-ti', 'Invierte en ti');
  const REV_INDEP = REV('usuario-inteligente/perspectivas/2025/03/independencia', 'Es tiempo de mujeres');
  const FPT_FONDO = FPT('fondo-de-emergencia-que-es-cuanto-necesitas-y-como-construirlo', 'Fondo de emergencia: qué es, cuánto necesitas y cómo construirlo');
  const FPT_CUANTO = FPT('cuanto-debe-tener-tu-fondo-de-emergencia', '¿Cuánto debe tener tu fondo de emergencia?');
  const FED_GD = FED('great-depression', 'The Great Depression');
  const FED_1929 = FED('stock-market-crash-of-1929', 'Stock Market Crash of 1929');
  const FED_GR = FED('great-recession-of-200709', 'The Great Recession');
  const NBER = { nombre: 'Oficina Nacional de Investigación Económica de EE. UU. (NBER): Business Cycle Dating (en inglés)', url: 'https://www.nber.org/research/business-cycle-dating' };
  const SEC_PANICO = { nombre: 'Comisión de Bolsa y Valores de EE. UU. (SEC), Investor.gov: Don’t Panic, Plan It! (en inglés)', url: 'https://www.investor.gov/additional-resources/spotlight/directors-take/dont-panic-plan-it' };
  const WISC_TIGHT = WISC('cutting-back-and-keeping-up-when-money-is-tight', 'Cutting Back and Keeping Up When Money is Tight');
  const WISC_JOB = WISC('managing-finances-after-a-job-loss', 'Managing Finances After a Job Loss');
  const WISC_CUT = WISC('cutting-expenses-and-increasing-income', 'Cutting Expenses and Increasing Income');
  const MEDLINE = { nombre: 'MedlinePlus en español: Estrés', url: 'https://medlineplus.gov/spanish/stress.html' };

  // ------------------------------------------------------------------
  const onda = (x) => 2.2 + 0.08 * x + 1.2 * Math.sin((x - 0.5) * Math.PI / 4);
  const CICLO = diagrama([0, 12], [-0.6, 5], [
    { tipo: 'poligono', puntos: Array.from({ length: 45 }, (_, i) => { const x = 0.5 + i * 0.25; return [x, onda(x)]; }), abierto: true },
    ...flecha([0.5, 0.2], [11.6, 0.2]), txt(6, -0.3, 'tiempo'),
    txt(2.5, 4.1, 'pico'), txt(6.5, 1.0, 'fondo'),
    txt(5.2, 3.3, 'caída'), txt(9.6, 2.0, 'recuperación'), txt(1.5, 2.0, 'crecimiento'),
  ], 'Diagrama de una línea ondulada que avanza en el tiempo de izquierda a derecha. Sube en una etapa de crecimiento hasta un punto alto llamado pico, baja en una caída hasta un punto bajo llamado fondo, y vuelve a subir en la recuperación hasta un pico más alto que el primero.');

  L('Qué es una crisis económica', {
    objetivo: 'Explicar qué es una crisis económica, distinguirla de una crisis en tu casa y reconocer las etapas en que la economía sube y baja.',
    explicacion: `
      <p>Imagina que en tu colonia cierran varias tiendas el mismo año, a muchos vecinos los despiden y quienes siguen trabajando ganan menos. No le pasa a una sola familia: le pasa a casi todos al mismo tiempo. Eso es una crisis económica.</p>
      <h3>Una crisis de todos y una crisis de casa</h3>
      <p>Una <strong>crisis económica</strong> es un periodo en el que la economía de un país, o de muchos, empeora de golpe: se vende y se produce menos, se pierden empleos y mucha gente gana menos. La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, recuerda que varias generaciones de mexicanos vivieron crisis con precios que subían muchísimo, intereses muy altos, devaluaciones y mucho desempleo.</p>
      <p>La CONDUSEF distingue dos clases. Una crisis nacional o mundial afecta a todo un país o a varios. Una crisis de casa le pega a una sola familia: perder el empleo, un accidente, una enfermedad grave o la muerte de quien aportaba el dinero. Fíjate que las dos se sienten igual en el bolsillo: entra menos dinero o sale mucho más. Por eso, lo que prepares para una te sirve también para la otra.</p>
      <h3>La economía sube y baja</h3>
      <p>La economía no crece siempre al mismo ritmo. Tiene temporadas buenas, con más trabajo y más ventas, y temporadas malas. A ese ir y venir se le llama <strong>ciclo económico</strong>. Se parece a las mareas del mar: suben y bajan, aunque sin un horario fijo.</p>
      <p>La Oficina Nacional de Investigación Económica de Estados Unidos (NBER), que fecha las subidas y bajadas de ese país, usa estos nombres: el pico es el punto más alto antes de caer, y el fondo es el punto más bajo antes de volver a subir. Entre los dos está la caída, y después del fondo viene la recuperación. Según la NBER, lo normal es que la economía esté creciendo y que la mayoría de las caídas sean breves, aunque volver al nivel de antes puede tardar bastante.</p>
      ${CICLO}
      <h3>Por qué llegan</h3>
      <p>Las crisis tienen muchas causas, y casi nunca una sola. Algunas empiezan cuando el precio de algo, como las casas o las acciones, sube mucho y después se desploma: según la Reserva Federal de Estados Unidos, la vivienda fue el centro de la crisis de 2008. Otras llegan cuando un país, sus empresas o muchas familias deben más de lo que pueden pagar. Y otras vienen de fuera, como la pandemia de 2020. Verás las más conocidas en "Crisis históricas y lo que nos enseñaron", y en la materia Finanzas y economía, en "Crecimiento económico y ciclos", cómo se miden.</p>
      <p>Ahora bien, no puedes evitar una crisis del país, pero sí prepararte para ella. De eso trata esta unidad, paso a paso.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que una crisis es culpa de quien la sufre. Una crisis del país golpea también a personas que hicieron todo bien. Prepararte no la evita, pero hace que el golpe duela menos.</p>`,
    ejemplo: `
      <p>Una panadería anota sus ventas por trimestre, que es un periodo de tres meses. Las cifras son de ejemplo. ¿Dónde está el pico, dónde el fondo y cuánto cayeron las ventas?</p>
      <div class="tabla-wrap"><table>
        <tr><th>Trimestre</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr>
        <tr><th>Ventas, en miles de $</th><td>100</td><td>110</td><td>120</td><td>105</td><td>90</td><td>98</td></tr>
      </table></div>
      <ol class="pasos-ej">
        <li>Busca dónde las ventas dejan de subir: suben hasta 120 en el trimestre 3 y luego bajan. El trimestre 3 es el pico.</li>
        <li>Busca dónde dejan de bajar: bajan hasta 90 en el trimestre 5 y luego suben a 98. El trimestre 5 es el fondo.</li>
        <li>Calcula la caída del pico al fondo: 120 − 90 = 30 mil.</li>
        <li>En porcentaje: 30 ÷ 120 = 0.25, es decir, 25%.</li>
        <li>Comprueba: el 25% de 120 es 30, y 120 − 30 = 90, el fondo.</li>
      </ol>
      <p>Resultado: <span class="resultado">pico en el trimestre 3, fondo en el trimestre 5 y una caída de 25%</span>.</p>
      <p class="nota"><strong>Error común:</strong> calcular el porcentaje sobre el fondo, 30 ÷ 90. La caída se mide desde donde estabas, que es el pico.</p>`,
    vidaReal: `
      <p>Entender qué es una crisis te ayuda a enfrentarla con más calma:</p>
      <ul>
        <li>Entiendes las noticias cuando dicen que la economía va mal, y sabes qué puede pasarle a tu trabajo.</li>
        <li>Distingues un mal momento de tu familia de uno de todo el país, y sabes que en los dos sirve prepararse.</li>
        <li>Recuerdas que, después de los tiempos malos, suelen llegar tiempos mejores.</li>
        <li>Dejas de culparte por problemas que le pasan a mucha gente al mismo tiempo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un negocio vendía $50 000 al mes en su mejor momento, y en lo peor de la crisis vende $40 000. ¿En qué porcentaje cayeron sus ventas?</p>', respuesta: (50000 - 40000) / 50000 * 100,
        pista: '<p>Divide lo que cayó entre lo que vendía en su mejor momento.</p>',
        solucion: '<p>Cayó 10 000, y 10 000 ÷ 50 000 = 0.20, es decir, <strong>20%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Después, las ventas de ese negocio suben de $40 000 a $46 000. ¿En qué porcentaje subieron?</p>', respuesta: (46000 - 40000) / 40000 * 100,
        pista: '<p>Ahora el punto de partida es 40 000.</p>',
        solucion: '<p>Subió 6 000, y 6 000 ÷ 40 000 = 0.15, es decir, <strong>15%</strong>. Fíjate que todavía no vuelve a los 50 000 de antes.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas es una crisis de casa y no una del país?</p>',
        opciones: ['Que despidan a mucha gente en todo el país', 'Que quien aporta el dinero en tu casa pierda su empleo', 'Que los precios suban mucho en todo el país'], correcta: 1,
        pista: '<p>La crisis de casa le pega a una sola familia.</p>',
        solucion: '<p><strong>Que quien aporta el dinero en tu casa pierda su empleo.</strong> Las otras dos afectan a todo el país.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la NBER, ¿qué es lo normal en la economía?</p>',
        opciones: ['Que esté en crisis casi siempre', 'Que nunca caiga', 'Que esté creciendo, con caídas que suelen ser breves'], correcta: 2,
        pista: '<p>Las caídas existen, pero no son lo más común.</p>',
        solucion: '<p><strong>Que esté creciendo, con caídas que suelen ser breves.</strong> Aun así, volver al nivel de antes puede tardar.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el punto más bajo de una caída, justo antes de que la economía vuelva a subir?</p>',
        respuestas: ['fondo', 'el fondo', 'valle', 'el valle'],
        pista: '<p>Es lo contrario del pico.</p>',
        solucion: '<p>El <strong>fondo</strong>.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el ir y venir de la economía entre temporadas buenas y malas?</p>',
        respuestas: ['ciclo economico', 'el ciclo economico', 'ciclo', 'el ciclo', 'ciclos economicos', 'ciclo de la economia'],
        pista: '<p>Son dos palabras; la primera significa "algo que se repite".</p>',
        solucion: '<p>El <strong>ciclo económico</strong>.</p>' },
    ],
    fuentes: [REV_CRISIS14, NBER, FED_GR, WIKI('Crisis_econ%C3%B3mica', 'Crisis económica')],
  });

  // ------------------------------------------------------------------
  L('Recesión y depresión: en qué se diferencian', {
    objetivo: 'Distinguir una recesión de una depresión económica, saber cómo se reconoce una recesión y no confundir la depresión económica con la enfermedad.',
    explicacion: `
      <p>En las noticias se oye "el país entró en recesión" y, a veces, "esto podría ser una depresión". Suenan parecido, pero no son lo mismo. La diferencia está en qué tan fuerte y qué tan larga es la caída.</p>
      <h3>Cómo se mide lo que produce un país</h3>
      <p>Para saber si la economía crece o cae, se suma el valor de todo lo que un país produce en un periodo: alimentos, ropa, casas, cortes de pelo, clases. A esa suma se le llama producto interno bruto, o PIB. Si este trimestre el PIB es menor que el anterior, la economía cayó. Lo verás con calma en "Producto Interno Bruto (PIB)", de la materia Finanzas y economía.</p>
      <h3>Recesión</h3>
      <p>Una <strong>recesión</strong> es una caída de la economía que se nota en casi todo el país y dura más que unos pocos meses. Así la define la NBER, la oficina de Estados Unidos que fecha las subidas y bajadas de ese país: una caída importante, extendida por toda la economía y de más de unos meses. Para decidirlo, la NBER no mira solo el PIB. Mira sobre todo el empleo y los ingresos de las personas, y también las ventas y la producción de las fábricas.</p>
      <p>Muchos medios usan una regla más sencilla: hay recesión cuando el PIB cae dos trimestres seguidos, es decir, seis meses. Esta regla se hizo popular en 1975, por un artículo del economista Julius Shiskin. Sirve como guía rápida, pero no es la única forma de decidirlo. Por ejemplo, en 2020 la caída fue tan profunda y tan extendida que la NBER la contó como recesión aunque duró solo dos meses, de febrero a abril.</p>
      <h3>Depresión</h3>
      <p>Una <strong>depresión económica</strong> es una recesión mucho más profunda y larga, que dura años. El caso más conocido es la Gran Depresión. Según la Reserva Federal de Estados Unidos, empezó en 1929 y duró una década: la producción de las fábricas se desplomó y el desempleo se disparó. Fue la caída más larga y profunda de la historia de ese país.</p>
      <p>En cambio, la crisis de 2007 a 2009, conocida como la Gran Recesión, duró de diciembre de 2007 a junio de 2009. Fue la recesión más larga en Estados Unidos desde la Segunda Guerra Mundial, pero no llegó a ser una depresión.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Pregunta</th><th>Recesión</th><th>Depresión</th></tr>
        <tr><th>¿Cuánto dura?</th><td>Meses</td><td>Años</td></tr>
        <tr><th>¿Qué tan fuerte es?</th><td>Una caída importante</td><td>Una caída muy profunda</td></tr>
        <tr><th>Ejemplo en EE. UU.</th><td>De 2007 a 2009</td><td>De 1929 a la década de 1930</td></tr>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> confundir la depresión económica con la depresión que es una enfermedad. Comparten el nombre, pero una habla de la economía y la otra de la salud de una persona. Si una crisis te hace sentir mal por mucho tiempo, pedir ayuda está bien; lo verás en "Salir adelante: reconstruir después de la crisis".</p>`,
    ejemplo: `
      <p>Un país anota cuánto cambió su PIB cada trimestre respecto al anterior. Las cifras son de ejemplo. Con la regla de los dos trimestres, ¿hubo recesión?</p>
      <div class="tabla-wrap"><table>
        <tr><th>Trimestre</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>
        <tr><th>Cambio del PIB</th><td>+0.6%</td><td>+0.2%</td><td>−0.4%</td><td>−0.7%</td><td>+0.3%</td></tr>
      </table></div>
      <ol class="pasos-ej">
        <li>Marca los trimestres con signo menos, que son los que cayeron: el 3 y el 4.</li>
        <li>Fíjate si van seguidos: sí, el 4 viene justo después del 3.</li>
        <li>Con la regla de los dos trimestres, hubo recesión en los trimestres 3 y 4.</li>
        <li>Suma las dos caídas para ver, de forma aproximada, cuánto cayó: −0.4 + (−0.7) = −1.1%.</li>
        <li>Comprueba con la idea de la NBER: dos trimestres son seis meses, más que "unos pocos meses". Para estar seguros, habría que revisar también el empleo y las ventas.</li>
      </ol>
      <p>Resultado: <span class="resultado">según la regla, sí hubo recesión, con una caída de alrededor de 1.1%</span>.</p>
      <p class="nota"><strong>Error común:</strong> contar caídas que no van seguidas. Si el PIB cae, sube y vuelve a caer, la regla no se cumple.</p>`,
    vidaReal: `
      <p>Saber la diferencia te ayuda a leer las noticias sin asustarte de más:</p>
      <ul>
        <li>Entiendes qué quieren decir los noticieros cuando hablan de "recesión" o de "depresión".</li>
        <li>Sabes que una caída de meses no es lo mismo que una de años, y puedes planear con calma.</li>
        <li>No te dejas llevar por titulares exagerados que anuncian el fin del mundo.</li>
        <li>Puedes explicarle a tu familia lo que pasa sin palabras complicadas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>El PIB de un país cambió así en cuatro trimestres: +0.5%, −0.2%, +0.1% y −0.3%. Con la regla de los dos trimestres, ¿hubo recesión?</p>',
        opciones: ['Sí, porque cayó dos veces', 'No, porque las caídas no van seguidas', 'Sí, porque el último trimestre cayó'], correcta: 1,
        pista: '<p>La regla pide dos caídas, una justo después de la otra.</p>',
        solucion: '<p><strong>No, porque las caídas no van seguidas.</strong> Entre las dos hubo un trimestre de subida.</p>' },
      { tipo: 'numero', enunciado: '<p>La Gran Recesión duró de diciembre de 2007 a junio de 2009. ¿Cuántos meses fueron?</p>', respuesta: 12 + 6,
        pista: '<p>De diciembre de 2007 a diciembre de 2008 hay 12 meses. Suma los que van de diciembre de 2008 a junio de 2009.</p>',
        solucion: '<p>12 + 6 = <strong>18 meses</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos meses son dos trimestres?</p>', respuesta: 2 * 3,
        pista: '<p>Un trimestre son tres meses.</p>',
        solucion: '<p>2 × 3 = <strong>6 meses</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>El PIB de un país baja de 500 mil millones a 490 mil millones. ¿En qué porcentaje cayó?</p>', respuesta: (500 - 490) / 500 * 100,
        pista: '<p>Divide lo que cayó entre el valor de antes.</p>',
        solucion: '<p>Cayó 10, y 10 ÷ 500 = 0.02, es decir, <strong>2%</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué hace que una caída sea una depresión y no solo una recesión?</p>',
        opciones: ['Que ocurra en una sola ciudad', 'Que dure exactamente seis meses', 'Que dure años y sea mucho más profunda'], correcta: 2,
        pista: '<p>Piensa en la Gran Depresión.</p>',
        solucion: '<p><strong>Que dure años y sea mucho más profunda.</strong> La Gran Depresión duró una década.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama una caída de la economía que se nota en casi todo el país y dura más que unos pocos meses?</p>',
        respuestas: ['recesion', 'una recesion', 'la recesion'],
        pista: '<p>Es más leve y más corta que una depresión.</p>',
        solucion: '<p>Una <strong>recesión</strong>.</p>' },
    ],
    fuentes: [NBER, FED_GD, FED_GR, WIKI('Recesi%C3%B3n', 'Recesión')],
  });

  // ------------------------------------------------------------------
  L('Crisis históricas y lo que nos enseñaron', {
    objetivo: 'Conocer cuatro crisis económicas famosas, qué pasó en cada una y qué enseñan para cuidar tu dinero.',
    explicacion: `
      <p>Las crisis no son nuevas. Quizá alguien mayor de tu familia te ha contado de una época en que "el dinero ya no alcanzaba". Mirar las crisis del pasado sirve para algo práctico: casi todas repiten las mismas trampas, y las mismas defensas funcionan.</p>
      <h3>1929: la Gran Depresión</h3>
      <p>En los años veinte, en Estados Unidos mucha gente compraba acciones con dinero prestado. Según la Reserva Federal de ese país, lo común era poner el 10% del precio y pedir prestado el resto. Los precios subieron sin freno hasta que, a finales de octubre de 1929, la bolsa se desplomó, y para mediados de noviembre había perdido casi la mitad de su valor. Siguieron años de quiebras de bancos, y en 1933 el desempleo llegó a 25%. La lección: comprar con deudas algo cuyo precio sube sin freno puede terminar muy mal.</p>
      <h3>1994: la crisis de México</h3>
      <p>A finales de 1994, México se quedó sin suficientes dólares de reserva y el peso perdió mucho valor de golpe. A eso se le llama devaluación, y lo verás en "Proteger tu dinero de la inflación y la devaluación". Las tasas de interés se dispararon, y muchas familias con préstamos a tasa variable, o con deudas en dólares, no pudieron pagar y perdieron sus casas. La lección: una deuda cuyo pago puede subir de golpe es peligrosa en una crisis.</p>
      <h3>2001: la crisis de Argentina</h3>
      <p>Argentina venía de una crisis larga, con años de recesión, que empezó en 1998. En diciembre de 2001, el gobierno limitó cuánto efectivo podía sacar la gente de los bancos, una medida que se conoció como "corralito". Golpeó sobre todo a quienes vivían al día y a la clase media. La lección: muchas crisis se van formando durante años, así que las señales suelen llegar antes que el golpe.</p>
      <h3>2008: la crisis financiera mundial</h3>
      <p>En Estados Unidos se dieron muchos préstamos para comprar casa a personas que difícilmente podrían pagarlos. Cuando los precios de las casas dejaron de subir, todo se vino abajo. Según la Reserva Federal, entre mediados de 2006 y mediados de 2009 las casas bajaron cerca de 30% en promedio, y el desempleo subió de 5% a 10%. La crisis se extendió al mundo, y la CONDUSEF recuerda que también golpeó el empleo en México. La lección: un precio que "siempre sube" puede dejar de subir.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Año</th><th>Lugar</th><th>Qué pasó</th><th>Qué enseñó</th></tr>
        <tr><th>1929</th><td>Estados Unidos y el mundo</td><td>La bolsa se desplomó y vino la Gran Depresión</td><td>Comprar con deudas algo que sube sin freno es arriesgado</td></tr>
        <tr><th>1994</th><td>México</td><td>El peso se devaluó y las tasas de interés se dispararon</td><td>Las deudas cuyo pago puede subir son peligrosas</td></tr>
        <tr><th>2001</th><td>Argentina</td><td>Se limitó el efectivo que se podía sacar de los bancos</td><td>Las señales suelen llegar antes que el golpe</td></tr>
        <tr><th>2008</th><td>Estados Unidos y el mundo</td><td>Bajaron las casas y subió el desempleo</td><td>Un precio que "siempre sube" puede bajar</td></tr>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> pensar "eso ya no puede pasar". Después de cada crisis se mejoraron las reglas, pero las crisis siguieron llegando, como la de 2020.</p>`,
    ejemplo: `
      <p>Usa el dato de la Reserva Federal sobre 2008. Una casa valía $300 000 a mediados de 2006 y bajó como el promedio, cerca de 30%. Su dueño todavía debía $280 000 de la hipoteca. El precio y la deuda son cifras de ejemplo. ¿Cuánto valía la casa en 2009 y cuánto debía de más?</p>
      <ol class="pasos-ej">
        <li>Lo que bajó: el 30% de 300 000 es 0.30 × 300 000 = $90 000.</li>
        <li>Lo que valía en 2009: 300 000 − 90 000 = $210 000.</li>
        <li>Compara con la deuda: 280 000 − 210 000 = $70 000. Debía $70 000 más de lo que valía la casa.</li>
        <li>Por eso, aunque la vendiera, no le alcanzaba para pagar lo que debía. Eso le pasó a mucha gente en 2008.</li>
        <li>Comprueba por otro camino: si bajó 30%, quedó en el 70%, y 0.70 × 300 000 = 210 000.</li>
      </ol>
      <p>Resultado: <span class="resultado">la casa valía $210 000 y la deuda era $70 000 mayor</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que vender la casa siempre resuelve la deuda. Si el precio cae por debajo de lo que debes, vender no alcanza.</p>`,
    vidaReal: `
      <p>Conocer las crisis del pasado te prepara para las que vengan:</p>
      <ul>
        <li>Cuando alguien de tu familia te cuente de una crisis que vivió, entenderás mejor lo que pasó.</li>
        <li>Reconoces las trampas que se repiten, como las deudas de más y los precios que "siempre suben".</li>
        <li>Desconfías cuando todo el mundo asegura que algo nunca va a bajar de precio.</li>
        <li>Aprendes de los errores de otras épocas sin tener que vivirlos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En 1929 era común poner el 10% del precio de las acciones y pedir prestado el resto. Para comprar acciones por $5 000, ¿cuánto se pedía prestado?</p>', respuesta: 5000 * 0.9,
        pista: '<p>Si pones el 10%, pides prestado el 90%.</p>',
        solucion: '<p>0.90 × 5 000 = <strong>$4 500</strong>. Solo se ponían $500 propios.</p>' },
      { tipo: 'numero', enunciado: '<p>En Estados Unidos, el desempleo pasó de 5% a 10% entre 2007 y 2009. ¿Cuántas veces más grande quedó?</p>', respuesta: 10 / 5,
        pista: '<p>Divide el valor nuevo entre el de antes.</p>',
        solucion: '<p>10 ÷ 5 = <strong>2</strong>: se duplicó.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la tabla, ¿qué pasó en México en 1994?</p>',
        opciones: ['La bolsa se desplomó y vino la Gran Depresión', 'Se limitó el efectivo que se podía sacar de los bancos', 'El peso se devaluó y las tasas de interés se dispararon'], correcta: 2,
        pista: '<p>Busca la fila de 1994.</p>',
        solucion: '<p><strong>El peso se devaluó y las tasas de interés se dispararon.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué muchas familias mexicanas no pudieron pagar sus deudas en 1994?</p>',
        opciones: ['Porque los precios bajaron mucho', 'Porque tenían préstamos a tasa variable o deudas en dólares, y el pago subió de golpe', 'Porque los bancos dejaron de cobrar'], correcta: 1,
        pista: '<p>Piensa en qué pasó con las tasas y con el peso.</p>',
        solucion: '<p><strong>Porque el pago de sus deudas subió de golpe</strong>, por las tasas variables y la devaluación.</p>' },
      { tipo: 'numero', enunciado: '<p>Una acción vale $100 y pierde 48%, casi la mitad, como la bolsa en 1929. ¿Cuánto vale después?</p>', respuesta: 100 * (1 - 0.48),
        pista: '<p>Si pierde 48%, le queda el 52%.</p>',
        solucion: '<p>100 × 0.52 = <strong>$52</strong>.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llamó en Argentina la medida de 2001 que limitaba el efectivo que se podía sacar de los bancos?</p>',
        respuestas: ['corralito', 'el corralito'],
        pista: '<p>Es el diminutivo de un lugar donde se encierra a los animales.</p>',
        solucion: '<p>El <strong>corralito</strong>.</p>' },
    ],
    fuentes: [FED_1929, FED_GD, FED_GR, REV_CRISIS14, WIKI('Gran_Depresi%C3%B3n', 'Gran Depresión'), WIKI('Crisis_econ%C3%B3mica_de_M%C3%A9xico_de_1994', 'Crisis económica de México de 1994'), WIKI('Crisis_de_diciembre_de_2001_en_Argentina', 'Crisis de diciembre de 2001 en Argentina'), WIKI('Crisis_financiera_de_2008', 'Crisis financiera de 2007-2008')],
  });

  // ------------------------------------------------------------------
  L('Señales de alerta de una crisis', {
    objetivo: 'Reconocer señales de que la economía o tus finanzas se están poniendo difíciles, sin caer en el pánico, y saber qué revisar en casa.',
    explicacion: `
      <p>Antes de una tormenta, el cielo se nubla y sopla el viento. Con la economía pasa algo parecido: muchas veces hay avisos antes del golpe. A un dato que avisa que algo podría ir mal se le llama <strong>señal de alerta</strong>. No sirve para saber el día exacto, pero sí para empezar a prepararte a tiempo.</p>
      <h3>Nadie sabe la fecha exacta</h3>
      <p>Conviene empezar con honestidad: ni los expertos saben cuándo empezará una crisis. La NBER, la oficina que decide cuándo empieza una recesión en Estados Unidos, espera a tener suficientes datos, y por eso suele anunciarla varios meses después de que empezó. Si quienes más saben la reconocen tarde, nadie puede prometerte la fecha. Por eso lo sensato es prepararte en los tiempos buenos, sin esperar la señal perfecta.</p>
      <h3>Señales en la economía</h3>
      <p>Para fechar una recesión, la NBER mira sobre todo el empleo y los ingresos de las personas, y también las ventas y la producción. Esas mismas cifras salen en las noticias y te dan pistas:</p>
      <ul>
        <li>Cada mes hay menos empleos, o el desempleo sube varios meses seguidos.</li>
        <li>Las ventas de las tiendas y la producción de las fábricas bajan.</li>
        <li>Los precios suben mucho y muy rápido, o la moneda pierde valor frente al dólar; la CONDUSEF recuerda que así fueron muchas crisis en México.</li>
        <li>El precio de algo, como las casas o las acciones, sube sin freno y mucha gente pide prestado para comprarlo, como en 1929 y en 2008.</li>
      </ul>
      <p>Una sola señal no quiere decir que venga una crisis. Lo que importa es cuando varias aparecen juntas y duran.</p>
      <h3>Señales en tu casa</h3>
      <p>Tus propias cuentas también avisan. La Extensión de la Universidad de Wisconsin advierte que, si lo que debes en la tarjeta de crédito crece mes con mes, puede ser señal de que estás usando el crédito para cubrir los gastos de todos los días. Otras señales son que te recorten horas de trabajo, que tu negocio tenga menos clientes o que tus gastos suban más rápido que tus ingresos. Es lo mismo que viste en "Señales de que tienes demasiadas deudas", pero mirando también tu trabajo.</p>
      <p>Fíjate que las señales de casa son las que más puedes controlar. Revisarlas cada mes, junto con tu presupuesto, te da tiempo para actuar antes de que el problema crezca.</p>
      <p class="nota"><strong>Trampa común:</strong> vivir pendiente de cada noticia. Revisar las señales te prepara; revisarlas a cada rato solo te angustia.</p>`,
    ejemplo: `
      <p>Revisas tus cuentas de los últimos tres meses. Tu deuda de tarjeta fue de $3 000, $3 600 y $4 300. Te recortaron 4 de tus 40 horas de trabajo a la semana, y tus gastos siguen iguales. Las cifras son de ejemplo. ¿Qué señales aparecen?</p>
      <ol class="pasos-ej">
        <li>La deuda de la tarjeta subió de 3 000 a 3 600 y luego a 4 300. Crece mes con mes: es una señal.</li>
        <li>Cuánto creció en total: 4 300 − 3 000 = $1 300 en dos meses.</li>
        <li>Las horas: 4 ÷ 40 = 0.10, es decir, 10% menos. Si te pagan por hora, ganarás 10% menos: otra señal.</li>
        <li>Los gastos siguen iguales mientras el ingreso baja. Lo que falta sale de la tarjeta, que es justo lo que muestra el paso 1.</li>
        <li>Comprueba que todo encaja: entra menos dinero y la diferencia se pide prestada.</li>
      </ol>
      <p>Resultado: <span class="resultado">hay dos señales claras, la deuda que crece y las horas recortadas</span>. Es momento de ajustar el presupuesto.</p>
      <p class="nota"><strong>Error común:</strong> esperar a que la deuda "se arregle sola". Si crece tres meses seguidos, revisa tu presupuesto cuanto antes.</p>`,
    vidaReal: `
      <p>Reconocer los avisos a tiempo te da margen para actuar:</p>
      <ul>
        <li>Notas cuándo tu dinero empieza a no alcanzar, antes de que el problema crezca.</li>
        <li>Entiendes las cifras de empleo y de precios que salen en las noticias.</li>
        <li>Te preparas con calma, en vez de reaccionar con miedo cuando ya es tarde.</li>
        <li>Desconfías de quien asegura saber el día exacto en que llegará una crisis.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Te recortan 6 de tus 40 horas de trabajo a la semana. ¿En qué porcentaje bajan tus horas?</p>', respuesta: 6 / 40 * 100,
        pista: '<p>Divide las horas recortadas entre las horas que tenías.</p>',
        solucion: '<p>6 ÷ 40 = 0.15, es decir, <strong>15%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Ganas $12 000 al mes y te pagan por hora. Con ese recorte de 15%, ¿cuánto ganarás al mes?</p>', respuesta: 12000 * (1 - 0.15),
        pista: '<p>Si pierdes el 15%, te queda el 85%.</p>',
        solucion: '<p>12 000 × 0.85 = <strong>$10 200</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu deuda de tarjeta fue de $2 000, $2 500 y $3 100 en tres meses. ¿Cuánto creció del primer mes al tercero?</p>', respuesta: 3100 - 2000,
        pista: '<p>Resta la primera cifra a la última.</p>',
        solucion: '<p>3 100 − 2 000 = <strong>$1 100</strong>. Crece cada mes: es una señal de alerta.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuándo suele anunciar la NBER que empezó una recesión?</p>',
        opciones: ['Meses antes de que empiece', 'Varios meses después de que empezó, cuando tiene datos suficientes', 'El mismo día en que empieza'], correcta: 1,
        pista: '<p>La NBER espera a estar segura.</p>',
        solucion: '<p><strong>Varios meses después.</strong> Por eso nadie puede darte la fecha exacta por adelantado.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas es una señal de alerta en tu casa?</p>',
        opciones: ['Que tu deuda de tarjeta crezca mes con mes', 'Que pagues tu tarjeta completa cada mes', 'Que tu fondo de emergencia crezca'], correcta: 0,
        pista: '<p>Busca la que muestra que el dinero no alcanza.</p>',
        solucion: '<p><strong>Que tu deuda de tarjeta crezca mes con mes.</strong> Las otras dos son buenas noticias.</p>' },
      { tipo: 'texto', enunciado: '<p>Además del empleo, ¿qué otra cifra mira sobre todo la NBER para fechar una recesión? Es lo que gana la gente.</p>',
        respuestas: ['ingresos', 'los ingresos', 'ingreso', 'el ingreso', 'ingresos de las personas', 'los ingresos de las personas'],
        pista: '<p>Es lo contrario de los gastos.</p>',
        solucion: '<p>Los <strong>ingresos</strong> de las personas.</p>' },
    ],
    fuentes: [NBER, WISC_TIGHT, REV_CRISIS14, FED_1929],
  });

  // ------------------------------------------------------------------
  const DESEMPLEO = barras({
    etiquetas: ['1933', 'dic. 2007', 'oct. 2009'], valores: [25, 5, 10], max: 25, paso: 5,
    descripcion: 'Gráfica de barras de la tasa de desempleo en Estados Unidos, en porcentaje. En 1933, en la Gran Depresión, 25%. En diciembre de 2007, al empezar la Gran Recesión, 5%. En octubre de 2009, en su punto más alto, 10%.',
  });

  L('Qué pasa con los empleos, los precios y los ahorros en una crisis', {
    objetivo: 'Explicar qué suele pasar con el empleo, los precios, los ahorros y las inversiones en una crisis, y calcular cuántos meses te alcanza lo que tienes ahorrado.',
    explicacion: `
      <p>Cuando llega una crisis, no todo se mueve igual. Algunas cosas bajan, otras suben y otras se quedan quietas. Saber qué suele pasar con tu trabajo, con los precios y con tus ahorros te ayuda a decidir qué proteger primero.</p>
      <h3>El empleo</h3>
      <p>Lo que más se siente es la pérdida de trabajo. Cuando la gente compra menos, las empresas venden menos, contratan menos y despiden. De las personas que quieren trabajar, al porcentaje que busca trabajo y no lo encuentra se le llama <strong>tasa de desempleo</strong>. En Estados Unidos, según la Reserva Federal, pasó de 5% en diciembre de 2007 a 10% en octubre de 2009. En la Gran Depresión llegó a 25% en 1933. Lo verás con más detalle en "Empleo y desempleo", de la materia Finanzas y economía.</p>
      ${DESEMPLEO}
      <h3>Los precios</h3>
      <p>Los precios pueden moverse hacia los dos lados. En algunas crisis suben muchísimo: la CONDUSEF recuerda que en México hubo inflación de dos y hasta tres dígitos, es decir, de 10% o más, y hasta de 100% o más. En otras bajan. En la Gran Depresión, según la Reserva Federal, los precios cayeron casi 30% entre finales de 1930 y principios de 1933. Que bajen parece bueno, pero no lo es: las empresas ganan menos y despiden más, y las deudas pesan más, porque sigues debiendo lo mismo mientras ganas menos.</p>
      <h3>Los ahorros y las inversiones</h3>
      <p>El dinero en una cuenta de banco no cambia de cantidad por una crisis, y en muchos países está protegido hasta un límite si el banco quiebra, como viste en "Tipos de cuentas bancarias". Las inversiones son otra historia. Según la Reserva Federal, en la crisis de 2008 un índice de las principales acciones de Estados Unidos cayó 57%. Como viste en "Diversificación", repartir tu dinero ayuda, pero cuando casi todo baja a la vez, una cartera repartida también puede bajar. Por eso la SEC, la Comisión de Bolsa y Valores de Estados Unidos, recomienda tener en algo de poco riesgo el dinero que podrías necesitar de pronto, por ejemplo si te quedas sin empleo.</p>
      <h3>Cuánto te alcanza</h3>
      <p>Una pregunta útil es cuántos meses podrías vivir de tus ahorros si dejara de entrar dinero. La Extensión de la Universidad de Wisconsin sugiere hacer esta cuenta al perder un empleo:</p>
      <p><strong>meses que te alcanza = ahorros ÷ gastos esenciales al mes</strong></p>
      <p>Se lee "cuántas veces cabe un mes de gastos esenciales en lo que tienes ahorrado". Los gastos esenciales son los que no puedes dejar: vivienda, comida, servicios y transporte.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que, si los precios bajan en todo el país, te conviene. Cuando eso pasa, también suelen bajar los sueldos y los empleos.</p>`,
    ejemplo: `
      <p>Tienes $30 000 ahorrados y gastas $15 000 al mes, de los que $12 000 son esenciales. Las cifras son de ejemplo. Si te quedas sin ingreso, ¿cuántos meses te alcanza?</p>
      <ol class="pasos-ej">
        <li>Si sigues gastando igual: 30 000 ÷ 15 000 = 2 meses.</li>
        <li>Si dejas solo lo esencial: 30 000 ÷ 12 000 = 2.5 meses.</li>
        <li>Recortar $3 000 al mes te da medio mes más, unas dos semanas.</li>
        <li>La Extensión de Wisconsin menciona los trabajos de medio tiempo. Si consigues uno que te deja $4 000 al mes, de tus ahorros sale 12 000 − 4 000 = $8 000 al mes, y te alcanza para 30 000 ÷ 8 000 = 3.75 meses.</li>
        <li>Comprueba: 8 000 × 3.75 = 30 000.</li>
      </ol>
      <p>Resultado: <span class="resultado">entre 2 y 3.75 meses, según lo que recortes y lo que consigas ganar</span>.</p>
      <p class="nota"><strong>Error común:</strong> dividir entre tus gastos de siempre. En una crisis, la cuenta útil es con tus gastos esenciales.</p>`,
    vidaReal: `
      <p>Saber qué se mueve en una crisis te ayuda a proteger lo importante:</p>
      <ul>
        <li>Sabes cuántos meses podría aguantar tu casa si dejara de entrar dinero.</li>
        <li>Entiendes por qué no conviene tener en inversiones arriesgadas el dinero que podrías necesitar pronto.</li>
        <li>Entiendes por qué que bajen los precios en todo el país no siempre es buena noticia.</li>
        <li>Te preparas para lo que más suele golpear, que es perder ingresos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tienes $24 000 ahorrados y tus gastos esenciales son de $8 000 al mes. ¿Cuántos meses te alcanza?</p>', respuesta: 24000 / 8000,
        pista: '<p>Divide tus ahorros entre tus gastos esenciales.</p>',
        solucion: '<p>24 000 ÷ 8 000 = <strong>3 meses</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con esos mismos $24 000 y gastos esenciales de $8 000, consigues un ingreso de $2 000 al mes. ¿Cuántos meses te alcanza ahora?</p>', respuesta: 24000 / (8000 - 2000),
        pista: '<p>Primero calcula cuánto sale de tus ahorros cada mes.</p>',
        solucion: '<p>Salen 8 000 − 2 000 = 6 000 al mes, y 24 000 ÷ 6 000 = <strong>4 meses</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tus inversiones valían $10 000 y caen 57%, como el índice de acciones en 2008. ¿Cuánto valen después?</p>', respuesta: 10000 * (1 - 0.57),
        pista: '<p>Si caen 57%, queda el 43%.</p>',
        solucion: '<p>10 000 × 0.43 = <strong>$4 300</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la Reserva Federal, ¿qué pasó con los precios en Estados Unidos durante la Gran Depresión?</p>',
        opciones: ['Subieron casi 30%', 'Se quedaron iguales', 'Bajaron casi 30%'], correcta: 2,
        pista: '<p>Fue una de las crisis en que los precios cayeron.</p>',
        solucion: '<p><strong>Bajaron casi 30%</strong>, entre finales de 1930 y principios de 1933.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué que bajen los precios en todo el país no es una buena noticia?</p>',
        opciones: ['Porque las empresas ganan menos y despiden, y las deudas pesan más', 'Porque todo se vuelve más caro', 'Porque los bancos cierran las cuentas'], correcta: 0,
        pista: '<p>Piensa en los sueldos y en lo que debes.</p>',
        solucion: '<p><strong>Porque las empresas ganan menos y despiden, y las deudas pesan más.</strong> Sigues debiendo lo mismo mientras ganas menos.</p>' },
      { tipo: 'texto', enunciado: '<p>De las personas que quieren trabajar, ¿cómo se llama el porcentaje que busca trabajo y no lo encuentra?</p>',
        respuestas: ['tasa de desempleo', 'la tasa de desempleo', 'desempleo', 'el desempleo', 'tasa de paro', 'paro'],
        pista: '<p>Empieza con "tasa de…".</p>',
        solucion: '<p>La <strong>tasa de desempleo</strong>.</p>' },
    ],
    fuentes: [FED_GR, FED_GD, WIKI('Gran_Depresi%C3%B3n', 'Gran Depresión'), REV_CRISIS14, SEC_PANICO, WISC_JOB],
  });

  // ------------------------------------------------------------------
  L('Un fondo de emergencia para tiempos difíciles', {
    objetivo: 'Calcular un fondo de emergencia pensado para una crisis, decidir cuántos meses cubrir según tu situación y armar un plan por etapas para juntarlo.',
    explicacion: `
      <p>En "Fondo de emergencia" aprendiste a guardar dinero para imprevistos como una reparación o una enfermedad. Ahora piensa en algo más grande: quedarte sin ingreso varios meses, justo cuando mucha gente también busca trabajo. Para eso, el fondo necesita pensarse un poco distinto.</p>
      <h3>Cuánto guardar</h3>
      <p>Finanzas para todos, del Banco de España y la CNMV, dice que el mínimo recomendado es lo que cubra de 3 a 6 meses de tus gastos básicos: vivienda, comida, servicios y transporte. Agrega que la cantidad cambia según tu situación, por ejemplo si hay personas que dependen de ti, si tus ingresos varían de un mes a otro o si trabajas por tu cuenta. La SEC, la Comisión de Bolsa y Valores de Estados Unidos, menciona que muchos profesionales recomiendan tener hasta seis meses ahorrados para pasar los tiempos económicos difíciles.</p>
      <p>Fíjate en la razón del número alto. En una crisis no solo puedes perder tu ingreso; también hay muchas más personas buscando trabajo al mismo tiempo, como viste en "Qué pasa con los empleos, los precios y los ahorros en una crisis". Por eso el fondo tiene que durar más.</p>
      <h3>Una meta por meses</h3>
      <p>Finanzas para todos propone calcularlo así:</p>
      <p><strong>fondo = gastos básicos al mes × meses que quieres cubrir</strong></p>
      <p>Se lee "lo que necesitas para vivir un mes, repetido tantas veces como meses quieras aguantar". Seis meses es una meta grande, y está bien llegar por etapas: primero un mes, luego tres, luego seis. Cada etapa ya te protege más que la anterior.</p>
      <h3>Dónde tenerlo</h3>
      <p>Finanzas para todos insiste en que el fondo debe estar fácil de usar, pero no debajo del colchón: por ejemplo, en una cuenta de ahorro aparte de la que usas a diario, para que no te tiente gastarlo. La SEC agrega que el dinero para emergencias debe estar en algo de poco riesgo que puedas sacar en cualquier momento. Como viste en "Tipos de cuentas bancarias", en muchos países los depósitos están protegidos hasta un límite; revisa el de tu país.</p>
      <h3>Cómo juntarlo</h3>
      <p>Finanzas para todos sugiere tratar el ahorro para el fondo como un gasto fijo más, programar que se aparte solo cada mes y usar los ingresos extra, como un aguinaldo o una devolución de impuestos. También ayuda recortar algunos gastos por un tiempo, como viste en "Gastos hormiga". La CONDUSEF lo resume así: la mejor forma de prepararte no es esperar a que llegue la emergencia, sino empezar desde ahora. Lo que más cuenta es la constancia, no la cantidad.</p>
      <p class="nota"><strong>Trampa común:</strong> usar el fondo para algo que no es una emergencia, como unas vacaciones o una oferta. Si un día lo usas de verdad, el plan es volver a llenarlo.</p>`,
    ejemplo: `
      <p>Tus gastos básicos son de $9 000 al mes. Trabajas por tu cuenta y tus ingresos cambian mucho, así que eliges la meta de 6 meses. Ya tienes $9 000 ahorrados y puedes apartar $1 500 al mes. Las cifras son de ejemplo. ¿Cuál es tu meta y cuánto tardarás?</p>
      <ol class="pasos-ej">
        <li>La meta: 9 000 × 6 = $54 000.</li>
        <li>Lo que te falta: 54 000 − 9 000 = $45 000.</li>
        <li>El tiempo: 45 000 ÷ 1 500 = 30 meses, es decir, dos años y medio.</li>
        <li>Por etapas: tres meses de gastos son 9 000 × 3 = $27 000. Te faltan 27 000 − 9 000 = $18 000, que juntas en 18 000 ÷ 1 500 = 12 meses.</li>
        <li>Comprueba: 9 000 + 1 500 × 30 = 9 000 + 45 000 = 54 000.</li>
      </ol>
      <p>Resultado: <span class="resultado">meta de $54 000; llegas a 3 meses en un año y a 6 meses en dos años y medio</span>.</p>
      <p class="nota"><strong>Error común:</strong> calcular la meta con todos tus gastos, incluidos los que dejarías en una crisis. Usa solo los básicos.</p>`,
    vidaReal: `
      <p>Un fondo pensado para tiempos difíciles te da tiempo para reaccionar:</p>
      <ul>
        <li>Sabes cuánto dinero necesitarías para aguantar varios meses sin ingreso.</li>
        <li>Si tus ingresos cambian mucho o alguien depende de ti, entiendes por qué conviene una meta más alta.</li>
        <li>Avanzas por etapas, sin desanimarte por lo grande de la meta.</li>
        <li>Guardas el dinero donde puedas usarlo rápido y sin arriesgarlo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tus gastos básicos son de $7 000 al mes y quieres cubrir 6 meses. ¿De cuánto es tu meta?</p>', respuesta: 7000 * 6,
        pista: '<p>Multiplica tus gastos básicos por los meses.</p>',
        solucion: '<p>7 000 × 6 = <strong>$42 000</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tus gastos básicos son de $10 000 y tu meta es de 3 meses. Ya tienes $6 000 y apartas $2 000 al mes. ¿Cuántos meses tardas en llegar?</p>', respuesta: (10000 * 3 - 6000) / 2000,
        pista: '<p>Calcula la meta, réstale lo que ya tienes y divide entre lo que apartas.</p>',
        solucion: '<p>La meta es 30 000. Faltan 30 000 − 6 000 = 24 000, y 24 000 ÷ 2 000 = <strong>12 meses</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si apartas $1 200 al mes, ¿cuánto juntas en 18 meses?</p>', respuesta: 1200 * 18,
        pista: '<p>Multiplica lo que apartas por los meses.</p>',
        solucion: '<p>1 200 × 18 = <strong>$21 600</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Finanzas para todos, ¿qué puede hacer que necesites un fondo más grande?</p>',
        opciones: ['Tener un sueldo fijo y a nadie a tu cargo', 'Tener personas que dependen de ti o ingresos que cambian mucho', 'Tener el fondo en una cuenta aparte'], correcta: 1,
        pista: '<p>Piensa en qué hace más difícil aguantar sin ingreso.</p>',
        solucion: '<p><strong>Tener personas que dependen de ti o ingresos que cambian mucho.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Dónde sugiere Finanzas para todos tener el fondo de emergencia?</p>',
        opciones: ['En casa, debajo del colchón', 'En una inversión que sube y baja', 'En una cuenta de ahorro aparte, fácil de usar'], correcta: 2,
        pista: '<p>Tiene que estar disponible, pero sin tentarte.</p>',
        solucion: '<p><strong>En una cuenta de ahorro aparte, fácil de usar.</strong></p>' },
      { tipo: 'numero', enunciado: '<p>Un fondo de $36 000 cubre 6 meses de gastos básicos. ¿De cuánto son esos gastos al mes?</p>', respuesta: 36000 / 6,
        pista: '<p>Haz la cuenta al revés: divide el fondo entre los meses.</p>',
        solucion: '<p>36 000 ÷ 6 = <strong>$6 000</strong> al mes.</p>' },
    ],
    fuentes: [FPT_FONDO, FPT_CUANTO, SEC_PANICO, REV_CRISIS25],
  });

  // ------------------------------------------------------------------
  L('Reducir deudas antes de que llegue la crisis', {
    objetivo: 'Explicar por qué las deudas pesan más en una crisis, reconocer cuáles conviene bajar primero y calcular si tus pagos aguantarían un ingreso menor.',
    explicacion: `
      <p>Una deuda que hoy pagas sin problema puede volverse una carga si mañana ganas menos. En una crisis el ingreso puede bajar, pero la cuota sigue llegando cada mes. Por eso conviene bajar las deudas mientras todavía entra dinero.</p>
      <h3>Por qué pesan más en una crisis</h3>
      <p>En "Señales de que tienes demasiadas deudas" viste la razón de endeudamiento: qué parte de tu ingreso se va en pagar deudas. Fíjate qué pasa si el ingreso baja y las cuotas no: esa parte crece sin que pidas un peso más. Además, en algunas crisis las tasas de interés suben. En la crisis de México de 1994, muchas familias con préstamos a tasa variable, o con deudas en dólares cuando el peso se devaluó, vieron subir sus pagos de golpe y no pudieron pagar.</p>
      <h3>Cuáles bajar primero</h3>
      <p>Empieza con la lista de "Haz la lista de todas tus deudas". Luego fíjate en tres cosas:</p>
      <ul>
        <li>Las deudas con la tasa más alta son las que más te cuestan cada mes; es la idea del "Método avalancha".</li>
        <li>Las deudas con tasa variable, que viste en "Cómo comparar préstamos", pueden subir justo cuando la economía se pone mal, como en 1994.</li>
        <li>Las deudas en otra moneda pueden crecer si tu moneda pierde valor, porque necesitas más de tu dinero para pagar lo mismo.</li>
      </ul>
      <p>Mientras tanto, la CONDUSEF recomienda no contratar deudas que afecten la estabilidad de tus finanzas. Esperar para comprar algo a plazos también es una forma de prepararte.</p>
      <h3>Hablar antes de atrasarte</h3>
      <p>Si ves que no vas a poder pagar, la Extensión de la Universidad de Wisconsin recomienda actuar en cuanto lo notes: llamar a quien te prestó, explicar tu situación y hacer una propuesta concreta y realista, como mover la fecha de pago o pagar menos durante más tiempo. Nadie está obligado a aceptar, pero preguntar no cuesta. Ojo: pagar menos durante más tiempo suele sumar más intereses. Lo viste en "Negociar con tus acreedores".</p>
      <h3>Cuidado con los préstamos fáciles</h3>
      <p>Cuando el dinero no alcanza, aparecen ofertas de préstamos rápidos y sin requisitos, por mensaje o en la calle. Como viste en "Préstamos abusivos, gota a gota y cobranza ilegal", pueden cobrar intereses enormes y amenazar para cobrar. Si te pasa, denúncialo ante el organismo de protección al consumidor financiero de tu país.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar "en una crisis dejo de pagar y listo". Dejar de pagar sin hablar con quien te prestó suma intereses y cargos, y daña tu historial. Pedir ayuda a tiempo te da más opciones.</p>`,
    ejemplo: `
      <p>Ganas $20 000 al mes y pagas $6 000 de deudas. En una crisis te reducen el sueldo a $16 000. Las cifras son de ejemplo. Usa el límite de 35% que viste en "Señales de que tienes demasiadas deudas". ¿Siguen cabiendo tus cuotas?</p>
      <ol class="pasos-ej">
        <li>Antes: 6 000 ÷ 20 000 = 0.30, es decir, 30%. Estabas dentro del límite.</li>
        <li>Después: 6 000 ÷ 16 000 = 0.375, es decir, 37.5%. Sin pedir nada nuevo, pasaste el límite.</li>
        <li>Lo máximo para quedar en 35% con el nuevo sueldo: 0.35 × 16 000 = $5 600 de cuotas.</li>
        <li>Tendrías que bajar tus cuotas 6 000 − 5 600 = $400 al mes, por ejemplo terminando antes de pagar una deuda pequeña.</li>
        <li>Comprueba: 5 600 ÷ 16 000 = 0.35, justo el límite.</li>
      </ol>
      <p>Resultado: <span class="resultado">tus cuotas pasan de 30% a 37.5% del ingreso; necesitas bajarlas $400 al mes</span>.</p>
      <p class="nota"><strong>Error común:</strong> revisar la razón solo con el sueldo de hoy. Haz la cuenta también con un ingreso menor.</p>`,
    vidaReal: `
      <p>Bajar tus deudas a tiempo te deja más tranquilidad si llegan tiempos difíciles:</p>
      <ul>
        <li>Sabes qué deudas podrían volverse más pesadas si la economía se pone mal.</li>
        <li>Calculas si podrías seguir pagando con un ingreso menor.</li>
        <li>Hablas a tiempo con quien te prestó si ves que no vas a poder pagar.</li>
        <li>Reconoces los préstamos fáciles que se aprovechan de la urgencia.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Pagas $4 500 de deudas al mes y tu ingreso baja de $18 000 a $15 000. ¿Qué porcentaje de tu ingreso se va ahora en deudas?</p>', respuesta: 4500 / 15000 * 100,
        pista: '<p>Divide tus cuotas entre el ingreso nuevo.</p>',
        solucion: '<p>4 500 ÷ 15 000 = 0.30, es decir, <strong>30%</strong>. Antes era 25%.</p>' },
      { tipo: 'numero', enunciado: '<p>Con un ingreso de $15 000 y un límite de 35%, ¿cuánto podrías pagar de cuotas como máximo?</p>', respuesta: 15000 * 0.35,
        pista: '<p>Saca el 35% del ingreso.</p>',
        solucion: '<p>0.35 × 15 000 = <strong>$5 250</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu cuota a tasa variable es de $2 000 y sube 25%. ¿De cuánto es la nueva cuota?</p>', respuesta: 2000 * 1.25,
        pista: '<p>Sumar 25% es multiplicar por 1.25.</p>',
        solucion: '<p>2 000 × 1.25 = <strong>$2 500</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué una deuda en dólares es riesgosa si tu moneda pierde valor?</p>',
        opciones: ['Porque la deuda desaparece', 'Porque necesitas más de tu moneda para pagar lo mismo', 'Porque baja la tasa de interés'], correcta: 1,
        pista: '<p>Piensa en cuántos pesos cuesta cada dólar.</p>',
        solucion: '<p><strong>Porque necesitas más de tu moneda para pagar lo mismo.</strong> Así les pasó a muchas familias en México en 1994.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la Extensión de Wisconsin, ¿qué conviene hacer en cuanto ves que no vas a poder pagar?</p>',
        opciones: ['Esperar a que te llamen', 'Pedir un préstamo rápido para cubrirlo', 'Llamar a quien te prestó y hacer una propuesta concreta'], correcta: 2,
        pista: '<p>Entre antes actúes, más opciones tienes.</p>',
        solucion: '<p><strong>Llamar a quien te prestó y hacer una propuesta concreta y realista.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la tasa de interés que puede cambiar mientras pagas tu préstamo?</p>',
        respuestas: ['tasa variable', 'la tasa variable', 'variable', 'interes variable', 'tasa de interes variable'],
        pista: '<p>Es lo contrario de la tasa fija.</p>',
        solucion: '<p>La <strong>tasa variable</strong>.</p>' },
    ],
    fuentes: [WISC_TIGHT, REV_CRISIS14, WIKI('Crisis_econ%C3%B3mica_de_M%C3%A9xico_de_1994', 'Crisis económica de México de 1994')],
  });

  // ------------------------------------------------------------------
  L('Diversificar ingresos y habilidades', {
    objetivo: 'Explicar por qué ayuda no depender de un solo ingreso, calcular cuánto protege una segunda fuente de dinero y reconocer las ofertas de trabajo falsas.',
    explicacion: `
      <p>Si todo tu dinero viene de un solo trabajo y lo pierdes, tu ingreso cae a cero de un día para otro. Si viene de dos fuentes y pierdes una, todavía entra algo. En una crisis, esa diferencia puede ser enorme.</p>
      <h3>No poner todos los huevos en la misma canasta</h3>
      <p>En "Diversificación" viste que repartir tu dinero entre varias inversiones baja el riesgo. Con los ingresos pasa lo mismo. A tener más de una fuente de dinero se le llama <strong>diversificar ingresos</strong>. La CONDUSEF lo explica con un ejemplo: un hogar que recibe el ingreso de dos personas evita depender de uno solo y enfrenta mejor las crisis.</p>
      <p>Por eso la CONDUSEF sugiere, además de tener un empleo, pensar en ingresos extra aprovechando lo que sabes hacer, como repostería, manualidades, o cuidar niños, personas mayores o mascotas unas horas al día. También menciona dar clases en línea o asesorías.</p>
      <h3>Empieza por lo que ya sabes</h3>
      <p>En 2026, la CONDUSEF propone empezar con preguntas sencillas: ¿qué sabes hacer?, ¿en qué eres bueno o buena?, ¿podrías ganar dinero con eso? Muchas veces lo que sabes viene de la experiencia diaria, no de un curso. Algunas ideas que menciona son dar clases de cocina, ejercicio o idiomas; hacer jardinería o mantenimiento; tomar fotos en eventos; o vender ropa, aparatos o muebles en buen estado que ya no usas.</p>
      <p>Una <strong>habilidad</strong> es algo que sabes hacer bien gracias a la práctica. Las habilidades son como un ahorro que nadie te puede quitar: si un trabajo se acaba, lo que sabes hacer se queda contigo. Por eso la CONDUSEF habla de "invertir en ti", tomando cursos y siguiendo aprendiendo. En la materia Autosuficiencia, "Herramientas básicas y reparaciones" y "Trueque y ayuda mutua" enseñan habilidades que ahorran dinero y crean lazos con tu comunidad.</p>
      <h3>Cuidado con las ofertas falsas</h3>
      <p>En tiempos difíciles se multiplican las ofertas de "gana dinero desde casa" que piden pagar por adelantado un curso, un paquete de productos o una inscripción. Como viste en "Fraudes comunes y cómo evitarlos" y en "Esquemas piramidales y promesas de dinero fácil", pedir dinero por adelantado y prometer ganancias fáciles son señales de fraude. Si te pasa, denúncialo ante el organismo de protección al consumidor financiero de tu país.</p>
      <p class="nota"><strong>Trampa común:</strong> empezar un segundo ingreso que cuesta tanto tiempo o dinero que no deja ganancia. Antes de empezar, resta lo que te cuesta a lo que te deja.</p>`,
    ejemplo: `
      <p>Una familia recibe $14 000 al mes de un solo empleo. Otra recibe lo mismo, pero repartido: $10 000 de un empleo y $4 000 de dar clases. Las dos gastan $12 000 al mes en lo esencial y tienen un fondo de $24 000. Las cifras son de ejemplo. ¿Qué pasa si cada una pierde el empleo?</p>
      <ol class="pasos-ej">
        <li>La primera familia pierde los $14 000. Su ingreso queda en $0.</li>
        <li>La segunda pierde los $10 000, pero siguen las clases: le quedan $4 000.</li>
        <li>Lo que sale del fondo cada mes: la primera, 12 000 − 0 = $12 000; la segunda, 12 000 − 4 000 = $8 000.</li>
        <li>Lo que aguanta cada una: la primera, 24 000 ÷ 12 000 = 2 meses; la segunda, 24 000 ÷ 8 000 = 3 meses.</li>
        <li>Comprueba: 12 000 × 2 = 24 000 y 8 000 × 3 = 24 000.</li>
      </ol>
      <p>Resultado: <span class="resultado">con el mismo fondo, la familia con dos fuentes aguanta un mes más</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que el segundo ingreso tiene que ser grande. Aquí, con $4 000, la familia gana un mes entero.</p>`,
    vidaReal: `
      <p>Tener más de una fuente de dinero te da respaldo cuando algo falla:</p>
      <ul>
        <li>Si pierdes un trabajo, todavía te queda algo de dinero para cubrir lo básico de tu casa.</li>
        <li>Descubres que lo que ya sabes hacer puede convertirse en dinero.</li>
        <li>Aprender algo nuevo te abre puertas, aunque cambie la economía.</li>
        <li>Reconoces las ofertas falsas que te piden dinero para darte trabajo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Ganas $9 000 de un empleo y $3 000 vendiendo comida. Si pierdes el empleo, ¿qué porcentaje de tu ingreso conservas?</p>', respuesta: 3000 / (9000 + 3000) * 100,
        pista: '<p>Divide lo que te queda entre tu ingreso total de antes.</p>',
        solucion: '<p>Tu ingreso era 12 000, y 3 000 ÷ 12 000 = 0.25, es decir, <strong>25%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tus gastos esenciales son de $10 000 al mes y te queda un ingreso de $3 000. Con un fondo de $21 000, ¿cuántos meses aguantas?</p>', respuesta: 21000 / (10000 - 3000),
        pista: '<p>Primero calcula cuánto sale del fondo cada mes.</p>',
        solucion: '<p>Salen 10 000 − 3 000 = 7 000 al mes, y 21 000 ÷ 7 000 = <strong>3 meses</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Das clases a 5 personas, cobras $150 a cada una por clase y das 8 clases al mes. Gastas $600 al mes en materiales. ¿Cuánto te deja al mes?</p>', respuesta: 5 * 150 * 8 - 600,
        pista: '<p>Calcula lo que cobras en el mes y réstale lo que gastas.</p>',
        solucion: '<p>5 × 150 × 8 = 6 000, y 6 000 − 600 = <strong>$5 400</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una oferta de "trabajo desde casa" te pide pagar $800 por un paquete de productos antes de empezar. ¿Qué haces?</p>',
        opciones: ['Pagar rápido para no perder el lugar', 'Desconfiar: pedir dinero por adelantado es una señal de fraude', 'Pagar con tarjeta para que sea seguro'], correcta: 1,
        pista: '<p>Recuerda las señales de fraude.</p>',
        solucion: '<p><strong>Desconfiar.</strong> Pedir dinero por adelantado es una de las señales de fraude más comunes.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por dónde propone la CONDUSEF empezar a buscar ingresos extra?</p>',
        opciones: ['Por lo que ya sabes hacer', 'Por pedir un préstamo para abrir un negocio grande', 'Por dejar tu empleo actual'], correcta: 0,
        pista: '<p>Recuerda las preguntas sencillas del principio.</p>',
        solucion: '<p><strong>Por lo que ya sabes hacer.</strong> Muchas veces viene de la experiencia diaria.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se le llama a tener más de una fuente de dinero?</p>',
        respuestas: ['diversificar ingresos', 'diversificar los ingresos', 'diversificar tus ingresos', 'diversificacion de ingresos', 'diversificar', 'diversificacion'],
        pista: '<p>Es la misma palabra que usaste para repartir inversiones.</p>',
        solucion: '<p><strong>Diversificar ingresos</strong>.</p>' },
    ],
    fuentes: [REV_CRISIS14, REV_INVIERTE, REV_INDEP],
  });

  // ------------------------------------------------------------------
  L('Proteger tu dinero de la inflación y la devaluación', {
    objetivo: 'Explicar qué son la hiperinflación y la devaluación, cómo afectan a tu dinero y qué medidas generales recomiendan los organismos oficiales.',
    explicacion: `
      <p>Imagina que guardas $10 000 en un cajón durante varios años. El billete sigue diciendo lo mismo, pero cada año compra menos cosas. En una crisis esto puede pasar mucho más rápido. Hay dos cosas que hacen que tu dinero valga menos: la inflación y la devaluación.</p>
      <h3>Cuando los precios se disparan</h3>
      <p>En "Inflación: por qué todo sube de precio" viste que la inflación es la subida general de los precios. En tiempos normales los precios suben poco cada año. En una crisis pueden dispararse: la CONDUSEF recuerda que en México hubo inflación de dos y hasta tres dígitos. Cuando los precios suben 50% o más en un solo mes, se le llama <strong>hiperinflación</strong>, según la definición clásica del economista Philip Cagan. Le pasó a Alemania en 1923 y a Zimbabue a finales de los años 2000.</p>
      <h3>Cuando tu moneda vale menos</h3>
      <p>Una <strong>devaluación</strong> es la pérdida de valor de una moneda frente a otras: necesitas más pesos, por ejemplo, para comprar un dólar. Puede pasar cuando hay poca confianza en la economía de un país. Como muchas cosas se hacen o se pagan en otros países, una devaluación encarece lo que viene de fuera, como el combustible o muchos aparatos. En México, en 1994, el peso se devaluó de golpe, y muchas familias con deudas en dólares no pudieron pagar.</p>
      <p>Fíjate que no a todos les pega igual. La CONDUSEF explica que quienes reciben dinero de familiares en Estados Unidos reciben más pesos por los mismos dólares, y lo mismo pasa con quienes venden sus productos al extranjero.</p>
      <h3>Qué recomiendan los organismos oficiales</h3>
      <p>Nadie puede proteger tu dinero por completo, pero la CONDUSEF da algunas ideas generales:</p>
      <ul>
        <li>No guardes mucho efectivo en casa. Además de ser inseguro, pierde valor: con la inflación de México en 2024, que fue de 4.8% (revisa el dato vigente en tu país), 100 mil pesos guardados perdieron 4 800 pesos de su valor real.</li>
        <li>Revisa que tu cuenta o tu inversión te pague más que la inflación. Si te paga menos, tu dinero pierde valor aunque esté en el banco; es la tasa real de "Tasa nominal y tasa real".</li>
        <li>Conoce los instrumentos de ahorro que emite el gobierno de tu país; la CONDUSEF menciona los de México como una forma segura de mantener el valor de tus ahorros.</li>
        <li>Reparte tu dinero en lugar de ponerlo todo en un solo lugar, como viste en "Diversificación".</li>
      </ul>
      <p>Sobre las monedas de otros países, la CONDUSEF advirtió en 2015 que comprar dólares cuando ya están caros, solo para ahorrar, puede salir mal: si después bajan, pierdes parte de tu dinero. Revisa siempre la información oficial vigente en tu país antes de decidir.</p>
      <p class="nota"><strong>Trampa común:</strong> comprar con prisa lo que sea cuando suben el dólar o los precios. Las decisiones tomadas con pánico suelen salir caras, como verás en "Errores comunes en una crisis: pánico, fraudes y ventas de remate".</p>`,
    ejemplo: `
      <p>Guardas $20 000 en casa y la inflación de un año es de 5%. Además, quieres un aparato que cuesta 100 dólares, y el dólar pasa de 18 a 20 pesos. Las cifras son de ejemplo. ¿Cuánto valor pierden tus ahorros y cuánto sube el aparato?</p>
      <ol class="pasos-ej">
        <li>Con la cuenta sencilla que usa la CONDUSEF, tus ahorros pierden el 5% de su valor: 0.05 × 20 000 = $1 000.</li>
        <li>El aparato antes costaba 100 × 18 = 1 800 pesos.</li>
        <li>Ahora cuesta 100 × 20 = 2 000 pesos.</li>
        <li>Subió 2 000 − 1 800 = 200 pesos, que es 200 ÷ 1 800 ≈ 0.11, unos 11%.</li>
        <li>Comprueba por otro camino: el dólar subió (20 − 18) ÷ 18 ≈ 0.11, también unos 11%. Coincide, porque el precio del aparato está en dólares.</li>
      </ol>
      <p>Resultado: <span class="resultado">tus ahorros pierden unos $1 000 de valor y el aparato sube unos 11%</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que una devaluación no te afecta si no compras dólares. Te afecta en todo lo que tiene su precio en dólares, como el combustible y muchos aparatos.</p>`,
    vidaReal: `
      <p>Entender qué le quita valor a tu dinero te ayuda a cuidarlo:</p>
      <ul>
        <li>Entiendes por qué el dinero guardado en casa vale menos con el tiempo.</li>
        <li>Sabes por qué suben de precio las cosas que vienen de otros países cuando sube el dólar.</li>
        <li>Revisas si tus ahorros ganan más de lo que suben los precios.</li>
        <li>Tomas decisiones con calma, aunque las noticias hablen de precios por las nubes.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Guardas $50 000 en casa y la inflación es de 4.8%, como en México en 2024. Con la cuenta sencilla, ¿cuánto valor pierden?</p>', respuesta: 50000 * 0.048,
        pista: '<p>Saca el 4.8% de 50 000.</p>',
        solucion: '<p>0.048 × 50 000 = <strong>$2 400</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Algo cuesta 50 dólares. Si el dólar pasa de 17 a 19 pesos, ¿cuántos pesos más cuesta?</p>', respuesta: 50 * (19 - 17),
        pista: '<p>Cada dólar cuesta 2 pesos más.</p>',
        solucion: '<p>50 × 2 = <strong>100 pesos</strong> más. Pasa de 850 a 950 pesos.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu cuenta te paga 3% al año y la inflación es de 4.8%. Con el atajo de "Tasa nominal y tasa real", ¿cuál es tu tasa real, en porcentaje?</p>', respuesta: 3 - 4.8,
        pista: '<p>Resta la inflación a la tasa que te pagan.</p>',
        solucion: '<p>3 − 4.8 = <strong>−1.8%</strong>. Tu dinero pierde valor aunque esté en el banco.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la CONDUSEF, ¿a quién puede beneficiar que suba el dólar?</p>',
        opciones: ['A quien tiene deudas en dólares', 'A quien recibe dinero de familiares en Estados Unidos', 'A quien compra aparatos importados'], correcta: 1,
        pista: '<p>Piensa en quién recibe dólares.</p>',
        solucion: '<p><strong>A quien recibe dinero de familiares en Estados Unidos</strong>, porque recibe más pesos por los mismos dólares.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la definición clásica, ¿cuándo hay hiperinflación?</p>',
        opciones: ['Cuando los precios suben 5% en un año', 'Cuando los precios bajan', 'Cuando los precios suben 50% o más en un solo mes'], correcta: 2,
        pista: '<p>Es una subida enorme y muy rápida.</p>',
        solucion: '<p><strong>Cuando los precios suben 50% o más en un solo mes.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la pérdida de valor de una moneda frente a otras?</p>',
        respuestas: ['devaluacion', 'la devaluacion', 'una devaluacion', 'depreciacion', 'la depreciacion'],
        pista: '<p>Viene de "perder valor".</p>',
        solucion: '<p>La <strong>devaluación</strong>.</p>' },
    ],
    fuentes: [REV_ESFUME, REV_BILLETE, REV_CRISIS14, WIKI('Devaluaci%C3%B3n', 'Devaluación'), WIKI('Hiperinflaci%C3%B3n', 'Hiperinflación'), WIKI('Crisis_econ%C3%B3mica_de_M%C3%A9xico_de_1994', 'Crisis económica de México de 1994')],
  });

  // ------------------------------------------------------------------
  L('Presupuesto de crisis: recortar sin perder lo esencial', {
    objetivo: 'Ajustar un presupuesto a un ingreso menor, separando lo esencial de lo que puede esperar, sin dejar de cubrir lo básico.',
    explicacion: `
      <p>Si un mes entra menos dinero, el presupuesto de siempre ya no cuadra. No se trata de dejar de comer ni de vivir con angustia, sino de decidir con calma qué se paga primero y qué puede esperar.</p>
      <h3>Primero, los números</h3>
      <p>La Extensión de la Universidad de Wisconsin propone una lista para cuando baja el ingreso: calcula cuánto puedes gastar, anota en qué estás gastando, busca dónde recortar, piensa cómo podrías ganar más y haz un plan para seguir pagando tus cuentas. Y agrega algo importante: entre antes revises tu presupuesto, más opciones tienes. Si nunca has hecho uno, empieza con "Hacer tu primer presupuesto".</p>
      <h3>Lo esencial va primero</h3>
      <p>Un <strong>presupuesto de crisis</strong> es un presupuesto ajustado a un ingreso menor, que cubre primero lo esencial y pone en pausa lo demás. Para la Extensión de Wisconsin, lo más importante es la vivienda, la comida, el transporte y servicios como la luz y el agua. La CONDUSEF coincide: lo primero es cubrir los gastos básicos, como la comida y la atención médica, para ti y los tuyos. Lo que no es esencial, como el entretenimiento, los regalos o los viajes, puede esperar hasta que tu ingreso se estabilice.</p>
      <h3>Gastos fijos y gastos que cambian</h3>
      <p>Wisconsin distingue dos clases de gastos. Los fijos, como la renta o las cuotas de un préstamo, cuestan lo mismo cada mes y son difíciles de mover. Los variables, como la ropa o la comida, cambian de un mes a otro y tienen más margen. Por eso los recortes suelen empezar por los variables. Algunas ideas que da son comprar ropa usada en buen estado, apagar las luces y los aparatos que nadie usa, y hacer tú las reparaciones sencillas o pedir ayuda a alguien que sepa. Para los gastos pequeños de todos los días, usa lo que viste en "Gastos hormiga".</p>
      <p>Ojo con dónde recortas. Wisconsin pone un ejemplo: es mejor dejar los antojos de la máquina expendedora que recortar la comida sana. Recortar no es comer peor; es dejar lo que menos te importa.</p>
      <h3>En familia</h3>
      <p>Wisconsin recomienda hablar con tu familia sobre los cambios. A los niños no hace falta preocuparlos con todos los detalles, pero está bien explicarles que por ahora entra menos dinero y que algunas compras tendrán que esperar. Cuando todos participan en las decisiones, el plan funciona mejor.</p>
      <p class="nota"><strong>Trampa común:</strong> recortar lo esencial para no tocar lo demás, como comer peor para mantener todas las suscripciones. Primero se protege lo básico.</p>`,
    ejemplo: `
      <p>Tu ingreso baja de $16 000 a $12 000 al mes. Las cifras son de ejemplo. Este era tu presupuesto. ¿Cómo lo ajustas?</p>
      <div class="tabla-wrap"><table>
        <tr><th>Gasto</th><th>Al mes</th></tr>
        <tr><th>Vivienda</th><td>$5 000</td></tr>
        <tr><th>Comida</th><td>$4 000</td></tr>
        <tr><th>Transporte</th><td>$1 500</td></tr>
        <tr><th>Luz y agua</th><td>$800</td></tr>
        <tr><th>Salidas y entretenimiento</th><td>$2 200</td></tr>
        <tr><th>Ropa</th><td>$1 000</td></tr>
        <tr><th>Suscripciones</th><td>$500</td></tr>
        <tr><th>Ahorro</th><td>$1 000</td></tr>
      </table></div>
      <ol class="pasos-ej">
        <li>Suma lo esencial: 5 000 + 4 000 + 1 500 + 800 = $11 300.</li>
        <li>Lo que queda del nuevo ingreso: 12 000 − 11 300 = $700.</li>
        <li>Pon en pausa salidas, ropa y suscripciones, que suman 2 200 + 1 000 + 500 = $3 700.</li>
        <li>Los $700 que quedan van al ahorro, aunque sea menos que antes.</li>
        <li>Comprueba: 11 300 + 700 = 12 000. El presupuesto cuadra.</li>
      </ol>
      <p>Resultado: <span class="resultado">cubres lo esencial con $11 300 y aún apartas $700</span>.</p>
      <p class="nota"><strong>Error común:</strong> dejar de ahorrar del todo. Aunque sea poco, apartar algo cada mes mantiene el hábito.</p>`,
    vidaReal: `
      <p>Saber recortar con orden te ayuda a pasar un mal momento sin descuidar lo importante:</p>
      <ul>
        <li>Si un mes entra menos dinero, sabes qué pagar primero.</li>
        <li>Recortas sin dejar de cubrir la comida, la casa y la salud.</li>
        <li>Hablas con tu familia de los cambios sin angustiar a nadie.</li>
        <li>Sabes que los recortes son por un tiempo, hasta que tu ingreso se recupere.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tus gastos esenciales suman $9 500 y tu nuevo ingreso es de $11 000. ¿Cuánto te queda después de cubrir lo esencial?</p>', respuesta: 11000 - 9500,
        pista: '<p>Resta lo esencial al ingreso.</p>',
        solucion: '<p>11 000 − 9 500 = <strong>$1 500</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Vivienda $4 000, comida $3 500, transporte $1 200, y luz y agua $700. ¿Cuánto suman tus gastos esenciales?</p>', respuesta: 4000 + 3500 + 1200 + 700,
        pista: '<p>Suma las cuatro cantidades.</p>',
        solucion: '<p>4 000 + 3 500 + 1 200 + 700 = <strong>$9 400</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Pones en pausa salidas de $1 800 y suscripciones de $400 al mes. ¿Cuánto dejas de gastar en un año?</p>', respuesta: (1800 + 400) * 12,
        pista: '<p>Suma lo de un mes y multiplica por 12.</p>',
        solucion: '<p>1 800 + 400 = 2 200 al mes, y 2 200 × 12 = <strong>$26 400</strong> al año.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la Extensión de Wisconsin, ¿cuál de estos es un gasto variable?</p>',
        opciones: ['La renta', 'La cuota de un préstamo', 'La ropa'], correcta: 2,
        pista: '<p>Busca el que cambia de un mes a otro.</p>',
        solucion: '<p><strong>La ropa.</strong> La renta y la cuota de un préstamo son fijas.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la Extensión de Wisconsin, ¿cuándo conviene revisar tu presupuesto si baja tu ingreso?</p>',
        opciones: ['Lo antes posible, porque así tienes más opciones', 'Solo cuando ya no puedas pagar', 'Una vez al año'], correcta: 0,
        pista: '<p>Entre antes, mejor.</p>',
        solucion: '<p><strong>Lo antes posible.</strong> Entre antes lo revises, más opciones tienes.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el presupuesto ajustado a un ingreso menor que cubre primero lo esencial?</p>',
        respuestas: ['presupuesto de crisis', 'un presupuesto de crisis', 'el presupuesto de crisis'],
        pista: '<p>Lleva el nombre de esta unidad.</p>',
        solucion: '<p>Un <strong>presupuesto de crisis</strong>.</p>' },
    ],
    fuentes: [WISC_TIGHT, WISC_CUT, WISC_JOB, REV_CRISIS25],
  });

  // ------------------------------------------------------------------
  L('Errores comunes en una crisis: pánico, fraudes y ventas de remate', {
    objetivo: 'Reconocer tres errores frecuentes en una crisis, vender por pánico, caer en fraudes y malbaratar lo que tienes, y calcular cuánto cuestan.',
    explicacion: `
      <p>En una crisis, el miedo empuja a decidir rápido. Y las decisiones rápidas, tomadas con miedo, suelen salir caras. Conocer de antemano los errores más comunes te ayuda a frenar antes de cometerlos.</p>
      <h3>Vender por pánico</h3>
      <p>Cuando las inversiones bajan, la primera reacción puede ser venderlo todo para "no perder más". La SEC, la Comisión de Bolsa y Valores de Estados Unidos, lo dice así: tu primera reacción puede ser el pánico, pero no tomes decisiones precipitadas. Fíjate por qué: si vendes cuando el precio está abajo, conviertes una baja que podría ser pasajera en una pérdida real. La SEC explica que la mayoría de los planes de inversión son de largo plazo, como viste en "Invertir a largo plazo", y que por eso conviene no distraerse con las subidas y bajadas de corto plazo.</p>
      <p>Ahora bien, eso vale para el dinero que no vas a necesitar pronto. Para el que quizá necesites en poco tiempo, la SEC sugiere tenerlo desde antes en algo de menos riesgo, justamente para no tener que vender en una caída.</p>
      <h3>Caer en fraudes</h3>
      <p>El miedo y la prisa son justo lo que buscan los estafadores. En una crisis aparecen inversiones "seguras" con ganancias altísimas, préstamos sin requisitos y trabajos que piden pagar por adelantado. Como viste en "Fraudes comunes y cómo evitarlos" y en "Esquemas piramidales y promesas de dinero fácil", la ganancia alta y sin riesgo no existe, y pedir dinero por adelantado es una señal de fraude. Si te pasa, denúncialo ante el organismo de protección al consumidor financiero de tu país.</p>
      <h3>Malbaratar lo que tienes</h3>
      <p>Una <strong>venta de remate</strong> es vender algo muy por debajo de su valor porque necesitas el dinero ya. En una crisis pasa con autos, herramientas o joyas: hay mucha gente vendiendo y poca comprando, así que los precios bajan. A veces vender ayuda; la Extensión de la Universidad de Wisconsin sugiere vender lo que ya no usas para conseguir dinero. El problema es vender con prisa algo que necesitas, como la herramienta con la que trabajas: recibes poco y después te cuesta mucho volver a comprarla. Tener un fondo de emergencia es lo que te da tiempo para no malbaratar.</p>
      <h3>Comprar por pánico</h3>
      <p>También existe el error contrario: comprar de más por miedo a que algo se acabe o suba, hasta vaciar los estantes. Así se gasta el dinero que podría hacer falta después. Para una emergencia basta un plan como el de "Plan familiar de emergencias", de la materia Autosuficiencia, no llenar la casa por miedo.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar "esta vez es diferente, hay que actuar ya". La prisa es la herramienta favorita de los estafadores y la peor consejera para vender.</p>`,
    ejemplo: `
      <p>Tienes inversiones por $20 000 que no vas a necesitar pronto. En una crisis bajan 30%. Las cifras son de ejemplo. Si vendes en la caída, ¿cuánto pierdes y cuánto tendrían que subir para volver a valer lo de antes?</p>
      <ol class="pasos-ej">
        <li>Lo que valen en la caída: 20 000 × 0.70 = $14 000.</li>
        <li>Si vendes ahí, la pérdida ya es real: 20 000 − 14 000 = $6 000.</li>
        <li>Si no vendes y después se recuperan hasta el valor de antes, vuelves a tener $20 000. Nadie garantiza cuándo pasará.</li>
        <li>Para volver de 14 000 a 20 000 tienen que subir 6 000 ÷ 14 000 ≈ 0.43, es decir, unos 43%.</li>
        <li>Comprueba: 14 000 × 1.43 ≈ 20 020, casi 20 000.</li>
      </ol>
      <p>Resultado: <span class="resultado">vender en la caída fija una pérdida de $6 000, y para recuperarse hace falta subir unos 43%</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que, si algo bajó 30%, basta con que suba 30%. Subir 30% desde 14 000 da 18 200, no 20 000.</p>`,
    vidaReal: `
      <p>Reconocer estos errores te ayuda a no tomar decisiones de las que luego te arrepientas:</p>
      <ul>
        <li>Frenas antes de vender algo con prisa cuando todo el mundo tiene miedo.</li>
        <li>Reconoces las ofertas que se aprovechan de la urgencia de la gente.</li>
        <li>Cuidas las cosas que te sirven para trabajar, en lugar de venderlas baratas.</li>
        <li>Compras lo que necesitas, sin llenar la casa por miedo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una inversión de $8 000 baja 25%. ¿Cuánto vale después?</p>', respuesta: 8000 * (1 - 0.25),
        pista: '<p>Si baja 25%, queda el 75%.</p>',
        solucion: '<p>8 000 × 0.75 = <strong>$6 000</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si la vendes en $6 000, ¿cuánto pierdes respecto a los $8 000 de antes?</p>', respuesta: 8000 - 6000,
        pista: '<p>Resta lo que recibes a lo que valía.</p>',
        solucion: '<p>8 000 − 6 000 = <strong>$2 000</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Para volver de $6 000 a $8 000, ¿en qué porcentaje tiene que subir? Redondea a un decimal.</p>', respuesta: (8000 - 6000) / 6000 * 100, tolerancia: 0.06,
        pista: '<p>Divide lo que falta subir entre el valor de ahora, 6 000.</p>',
        solucion: '<p>2 000 ÷ 6 000 ≈ 0.333, es decir, unos <strong>33.3%</strong>, más que el 25% que bajó.</p>' },
      { tipo: 'numero', enunciado: '<p>Una herramienta vale $5 000 y la vendes de remate en $3 000. ¿Qué porcentaje de su valor pierdes?</p>', respuesta: (5000 - 3000) / 5000 * 100,
        pista: '<p>Divide lo que pierdes entre lo que vale.</p>',
        solucion: '<p>Pierdes 2 000, y 2 000 ÷ 5 000 = 0.40, es decir, <strong>40%</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la SEC, ¿qué conviene hacer cuando tus inversiones de largo plazo bajan de golpe?</p>',
        opciones: ['Venderlo todo enseguida', 'No tomar decisiones precipitadas y revisar tu plan', 'Pedir prestado para comprar más'], correcta: 1,
        pista: '<p>La SEC dice: no entres en pánico.</p>',
        solucion: '<p><strong>No tomar decisiones precipitadas y revisar tu plan.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama vender algo muy por debajo de su valor porque necesitas el dinero ya?</p>',
        respuestas: ['venta de remate', 'una venta de remate', 'remate', 'vender de remate', 'malbaratar'],
        pista: '<p>Viene en el título de esta lección.</p>',
        solucion: '<p>Una <strong>venta de remate</strong>.</p>' },
    ],
    fuentes: [SEC_PANICO, WISC_JOB],
  });

  // ------------------------------------------------------------------
  L('Salir adelante: reconstruir después de la crisis', {
    objetivo: 'Ordenar los pasos para reconstruir tus finanzas después de una crisis, calcular cuánto tardarás en reponer tu fondo y saber cuándo pedir ayuda.',
    explicacion: `
      <p>Las crisis terminan. Según la NBER, la mayoría de las recesiones son breves, aunque volver al nivel de antes puede tardar. Cuando lo peor pasa, quedan cosas por arreglar: un fondo vacío, alguna deuda atrasada, quizá un trabajo nuevo con otro sueldo. Reconstruir lleva tiempo, y se hace paso a paso.</p>
      <h3>Primero, tú</h3>
      <p>Una crisis cansa. No llegar a fin de mes o perder el empleo afecta también la salud. La Extensión de la Universidad de Wisconsin cita investigaciones según las cuales perder el trabajo puede afectar la salud mental y física. Recomienda cuidarla: hacer ejercicio, respirar hondo, buscar apoyo en amistades, familia o grupos de apoyo, y usar servicios de orientación gratuitos o de bajo costo. Agrega que, con la mente más tranquila, es más fácil ocuparse del dinero.</p>
      <p>MedlinePlus, de la Biblioteca Nacional de Medicina de Estados Unidos, explica que todas las personas sienten estrés de vez en cuando. Y recomienda buscar ayuda de inmediato si sientes que no puedes con todo, si consumes alcohol o drogas más de lo habitual o si tienes pensamientos de suicidio. Pedir ayuda no es un fracaso: es parte de salir adelante.</p>
      <h3>Un orden para reconstruir</h3>
      <p>No tienes que arreglar todo a la vez. Este es un orden posible, que junta lo que viste en esta materia:</p>
      <ul>
        <li>Primero, cubre lo esencial con un presupuesto de crisis, hasta que tu ingreso se estabilice.</li>
        <li>Después, ponte al día con las deudas atrasadas, hablando con quien te prestó, como en "Negociar con tus acreedores".</li>
        <li>Luego, vuelve a llenar tu fondo de emergencia por etapas: primero un mes de gastos, después tres.</li>
        <li>Mientras tanto, paga a tiempo para cuidar tu historial, como viste en "Historial crediticio".</li>
        <li>Al final, retoma tus metas de ahorro y de inversión.</li>
      </ul>
      <h3>Aprender de lo que pasó</h3>
      <p>Cuando las cosas se calmen, revisa qué funcionó y qué faltó. ¿Alcanzó el fondo? ¿Alguna deuda pesó más de lo esperado? ¿Te habría ayudado un segundo ingreso? Las respuestas son tu plan para la próxima vez. La CONDUSEF lo resume así: la mejor forma de prepararte para una emergencia no es esperar a que llegue, sino empezar desde ahora a construir un colchón económico.</p>
      <p>Fíjate que salir de una crisis no siempre significa volver exactamente a donde estabas. A veces el trabajo nuevo paga distinto, o la familia tuvo que mudarse. Lo importante es recuperar el control de tus números, poco a poco.</p>
      <p class="nota"><strong>Trampa común:</strong> querer recuperar todo de golpe con una inversión arriesgada o "una oportunidad única". Es justo lo que buscan los fraudes que viste en "Esquemas piramidales y promesas de dinero fácil".</p>`,
    ejemplo: `
      <p>Después de una crisis, tu fondo quedó en $2 000. Tus gastos básicos son de $8 000 al mes. Ya cubres lo esencial y te quedan $1 200 al mes para el fondo. Las cifras son de ejemplo. ¿Cuánto tardas en tener un mes y tres meses de gastos?</p>
      <ol class="pasos-ej">
        <li>Meta de un mes: $8 000. Te faltan 8 000 − 2 000 = $6 000.</li>
        <li>Tiempo: 6 000 ÷ 1 200 = 5 meses.</li>
        <li>Meta de tres meses: 8 000 × 3 = $24 000. Desde el principio te faltan 24 000 − 2 000 = $22 000.</li>
        <li>Tiempo: 22 000 ÷ 1 200 ≈ 18.3. Redondea hacia arriba, porque a los 18 meses todavía no llegas: unos 19 meses.</li>
        <li>Comprueba: con 18 meses tendrías 2 000 + 1 200 × 18 = 23 600, que no alcanza; con 19 tendrías 24 800, que ya pasa.</li>
      </ol>
      <p>Resultado: <span class="resultado">llegas a un mes de gastos en 5 meses y a tres meses en unos 19</span>.</p>
      <p class="nota"><strong>Error común:</strong> desanimarte por lo lejos que se ve la meta final. A los 5 meses ya tienes un mes completo de protección.</p>`,
    vidaReal: `
      <p>Saber cómo reconstruir te devuelve la calma después de un golpe:</p>
      <ul>
        <li>Después de un mal momento, sabes por dónde empezar a ordenar tu dinero, sin querer arreglarlo todo a la vez.</li>
        <li>Calculas cuánto tardarás en volver a tener un ahorro para emergencias.</li>
        <li>Sabes que pedir ayuda, para tu dinero o para tu ánimo, está bien.</li>
        <li>Usas lo que aprendiste para prepararte mejor para la próxima vez.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tu fondo está en $1 000, tus gastos básicos son de $6 000 al mes y apartas $1 000 al mes. ¿Cuántos meses tardas en tener un mes de gastos?</p>', respuesta: (6000 - 1000) / 1000,
        pista: '<p>Calcula cuánto te falta y divide entre lo que apartas.</p>',
        solucion: '<p>Faltan 6 000 − 1 000 = 5 000, y 5 000 ÷ 1 000 = <strong>5 meses</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con esos gastos básicos de $6 000, ¿cuánto necesitas para cubrir tres meses?</p>', respuesta: 6000 * 3,
        pista: '<p>Multiplica los gastos de un mes por 3.</p>',
        solucion: '<p>6 000 × 3 = <strong>$18 000</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si empiezas con $1 000 y apartas $1 000 al mes, ¿cuántos meses tardas en llegar a $18 000?</p>', respuesta: (18000 - 1000) / 1000,
        pista: '<p>Resta lo que ya tienes y divide entre lo que apartas.</p>',
        solucion: '<p>Faltan 17 000, y 17 000 ÷ 1 000 = <strong>17 meses</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según MedlinePlus, ¿cuándo hay que buscar ayuda de inmediato?</p>',
        opciones: ['Cuando sientes un poco de nervios antes de un examen', 'Cuando sientes que no puedes con todo o tienes pensamientos de suicidio', 'Nunca, porque el estrés siempre pasa solo'], correcta: 1,
        pista: '<p>Busca la opción que habla de no poder con todo.</p>',
        solucion: '<p><strong>Cuando sientes que no puedes con todo o tienes pensamientos de suicidio.</strong> Pedir ayuda está bien.</p>' },
      { tipo: 'opciones', enunciado: '<p>Después de una crisis, alguien te ofrece "recuperar todo en un mes" con una inversión. ¿Qué haces?</p>',
        opciones: ['Desconfiar: es la promesa típica de un fraude', 'Invertir todo tu fondo', 'Pedir prestado para invertir más'], correcta: 0,
        pista: '<p>Recuerda la trampa común de esta lección.</p>',
        solucion: '<p><strong>Desconfiar.</strong> Las ganancias rápidas y seguras no existen.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el registro de cómo has pagado tus créditos, que conviene cuidar al reconstruir?</p>',
        respuestas: ['historial crediticio', 'el historial crediticio', 'historial de credito', 'el historial de credito', 'historial'],
        pista: '<p>Lo viste en la unidad de Crédito.</p>',
        solucion: '<p>El <strong>historial crediticio</strong>.</p>' },
    ],
    fuentes: [WISC_JOB, MEDLINE, NBER, REV_CRISIS25],
  });
})();
