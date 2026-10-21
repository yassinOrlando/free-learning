// Finanzas y economía · Unidad 3: La economía de un país.
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
  function barras({ etiquetas, valores, max, paso, sufijo = '', descripcion }) {
    const n = valores.length;
    const figuras = valores.flatMap((v, i) => [
      { tipo: 'poligono', puntos: [[i + 0.15, 0], [i + 0.85, 0], [i + 0.85, v], [i + 0.15, v]], solido: true },
      txt(i + 0.5, -max * 0.07, etiquetas[i]),
      txt(i + 0.5, v + max * 0.05, String(v) + sufijo),
    ]);
    return G({ x: [0, n], y: [-max * 0.12, max * 1.1], pasos: [1e9, paso], nombres: false, figuras, descripcion });
  }

  // ---- Fuentes ----
  const CORE1 = { nombre: 'CORE Econ (en español), La Economía, Capítulo 1: La revolución capitalista', url: 'https://books.core-econ.org/the-economy-v1/book/es/text/01.html' };
  const CORE2 = { nombre: 'CORE Econ (en español), La Economía, Capítulo 2: Tecnología, población y crecimiento', url: 'https://books.core-econ.org/the-economy-v1/book/es/text/02.html' };
  const CORE13 = { nombre: 'CORE Econ (en español), La Economía, Capítulo 13: Fluctuaciones económicas y desempleo', url: 'https://books.core-econ.org/the-economy-v1/book/es/text/13.html' };
  const CORE16 = { nombre: 'CORE Econ (en español), La Economía, Capítulo 16: Progreso tecnológico, empleo y niveles de vida a largo plazo', url: 'https://books.core-econ.org/the-economy-v1/book/es/text/16.html' };
  const NBER = { nombre: 'Oficina Nacional de Investigación Económica de EE. UU. (NBER): Business Cycle Dating (en inglés)', url: 'https://www.nber.org/research/business-cycle-dating' };
  const FED_CR = { nombre: 'Reserva Federal de EE. UU., Federal Reserve History: Recessions and Depressions (en inglés)', url: 'https://www.federalreservehistory.org/essays/recessions-depressions' };
  const WIKI_PIB = { nombre: 'Wikipedia (en español), Producto interno bruto (apoyo)', url: 'https://es.wikipedia.org/wiki/Producto_interno_bruto' };
  const WIKI_DESEMPLEO = { nombre: 'Wikipedia (en español), Desempleo (apoyo)', url: 'https://es.wikipedia.org/wiki/Desempleo' };
  const WIKI_INFORMAL = { nombre: 'Wikipedia (en español), Economía informal (apoyo)', url: 'https://es.wikipedia.org/wiki/Econom%C3%ADa_informal' };
  const CORE14 = { nombre: 'CORE Econ (en español), La Economía, Capítulo 14: Desempleo y política fiscal', url: 'https://books.core-econ.org/the-economy-v1/book/es/text/14.html' };
  const CORE15 = { nombre: 'CORE Econ (en español), La Economía, Capítulo 15: Inflación, desempleo y política monetaria', url: 'https://books.core-econ.org/the-economy-v1/book/es/text/15.html' };
  const CORE18 = { nombre: 'CORE Econ (en español), La Economía, Capítulo 18: La nación y la economía mundial', url: 'https://books.core-econ.org/the-economy-v1/book/es/text/18.html' };
  const SERNAC = { nombre: 'SERNAC (Chile), Guía para el docente de educación financiera', url: 'https://www.sernac.cl/portal/607/articles-9171_archivo_01.pdf' };
  const CONDUSEF_MONEDA = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: Una sola moneda', url: 'https://revista.condusef.gob.mx/usuario-inteligente/peque-finanzas/2025/06/moneda/' };
  const WIKI_COMERCIO = { nombre: 'Wikipedia (en español), Comercio internacional (apoyo)', url: 'https://es.wikipedia.org/wiki/Comercio_internacional' };
  const WIKI_TASA = { nombre: 'Wikipedia (en español), Tasa de cambio (apoyo)', url: 'https://es.wikipedia.org/wiki/Tasa_de_cambio' };
  const WIKI_DEFICIT = { nombre: 'Wikipedia (en español), Déficit presupuestario (apoyo)', url: 'https://es.wikipedia.org/wiki/D%C3%A9ficit_presupuestario' };

  // ------------------------------------------------------------------
  const PIB_PER_CAPITA = barras({
    etiquetas: ['País A', 'País B', 'País C'], valores: [12, 6, 3], max: 12, paso: 3, sufijo: ' mil',
    descripcion: 'Gráfica de barras del PIB per cápita de tres países inventados, en miles de dólares por persona. El País A tiene 12 mil dólares por persona, el País B 6 mil y el País C 3 mil. Las cifras son de ejemplo.',
  });

  L('Producto Interno Bruto (PIB)', {
    objetivo: 'Entender qué mide el PIB de un país, por qué se usa el PIB per cápita para comparar países y qué trabajos y daños quedan fuera de esa cuenta.',
    explicacion: `
      <p>Dos países tienen el mismo número de habitantes y uno produce el doble de bienes y servicios que el otro. ¿Vive su gente el doble de bien? No necesariamente: puede que la producción se reparta mal, que haya mucho trabajo sin declarar o que el medio ambiente quede arruinado. Para mirar esto hay dos cifras: el <strong>PIB</strong> (<span lang="en">GDP</span>) y el PIB por persona.</p>
      <h3>Qué mide el PIB</h3>
      <p>Ya viste en "Recesión y depresión: en qué se diferencian" qué es el PIB y que sirve para saber si la economía crece o cae. Aquí toca mirar lo que esa cifra mide y lo que deja fuera. Primero, un detalle importante: el PIB es una cifra total. Un país con el doble de habitantes suele tener el doble de PIB, aunque su gente viva exactamente igual. El PIB dice qué tan grande es la economía, no qué tan bien vive la gente.</p>
      <h3>El PIB para cada persona</h3>
      <p>Para eso está el <strong>PIB per cápita</strong> (<span lang="en">GDP per capita</span>): el PIB repartido entre los habitantes, uno por uno. «Per cápita» viene del latín y significa «por cabeza», así que la cuenta es sencilla:</p>
      <p><strong>PIB per cápita = PIB ÷ número de habitantes</strong></p>
      <p>Se lee "el PIB dividido entre el número de habitantes". CORE Econ lo resume así: el PIB per cápita corresponde al promedio anual de ingresos. Por eso sirve para comparar países de tamaños distintos. Si un país tiene el doble de PIB que otro, pero también el doble de habitantes, los dos viven en niveles parecidos. Y para expresar qué parte del total le toca a cada grupo, los porcentajes ayudan, como viste en "Porcentajes".</p>
      ${PIB_PER_CAPITA}
      <p>Fíjate en la gráfica: cada barra muestra el PIB per cápita en miles de dólares por persona. Los tres países son inventados y las cifras son de ejemplo, pero la idea es real. Para saber cómo vive la gente, el PIB se reparte; no basta con mirar el total.</p>
      <h3>Lo que el PIB no cuenta</h3>
      <p>Ahora bien, el PIB es una medida incompleta. Esta tabla resume lo que cuenta y lo que deja fuera:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Qué cuenta el PIB</th><th>Qué no cuenta</th></tr>
        <tr><td>El trabajo que se declara y se paga</td><td>El trabajo que se hace y se cobra, pero sin quedar registrado</td></tr>
        <tr><td>Los bienes y servicios que la gente compra</td><td>El trabajo del hogar: las comidas y el cuidado de los niños</td></tr>
        <tr><td>Los servicios que se pagan, como el transporte público</td><td>La salud y la educación cuando las da el Gobierno, porque no se compran</td></tr>
      </table></div>
      <p>La <strong>economía informal</strong> (<span lang="en">informal economy</span>) merece una explicación aparte, porque pesa mucho. Como dice Wikipedia en español, la economía informal son las actividades económicas que no están reguladas, registradas ni protegidas por el Estado. Es el trabajo de quien vende en la calle, de quien arregla carros a la entrada del barrio o de quien cuida niños en casa. Se hace y se cobra, pero no aparece en ninguna cuenta, así que cuando es grande el PIB de un país subestima lo que ese país realmente produce.</p>
      <p>Y hay dos cosas más que el PIB no mira. Una es la calidad del entorno: el aire limpio, las amistades, la tranquilidad de una calle segura. La otra es el desgaste del medio ambiente: si un país produce muchas cosas y para hacerlo ensucia sus ríos, el PIB sube y el país queda peor. Por eso dos países con el mismo PIB pueden vivir de forma muy distinta.</p>
      <p>Un último detalle, y es importante: el PIB puede crecer y la gente no estar mejor. Si la población crece más rápido que la producción, el PIB sube y el PIB per cápita baja. La tasa de crecimiento del PIB, en el fondo, es una tasa de cambio: cuánto cambió de un periodo a otro.</p>`,
    ejemplo: `
      <p>Un país tiene 10 millones de habitantes y un PIB de $2 billones al año. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Primero, el PIB per cápita: se reparte el total entre los habitantes. 2 000 000 000 000 ÷ 10 000 000 = <strong>$200 000</strong> por persona.</li>
        <li>Segundo, si la mitad de la gente se muda a otro país con el mismo PIB, el total se reparte entre 5 millones: 2 000 000 000 000 ÷ 5 000 000 = <strong>$400 000</strong> por persona.</li>
        <li>Tercero, fíjate en lo que pasó: el PIB no cambió ni un peso, pero cada persona pasó a tocar el doble.</li>
        <li>Cuarto, el caso inverso: si el PIB se queda igual y la población crece un 10%, a cada persona le toca menos.</li>
        <li>Comprueba: si cada persona tenía 100, ahora tiene 100 ÷ 1,10 = 90,9.</li>
      </ol>
      <p>Resultado: <span class="resultado">$200 000 por persona; si la mitad de la población se va, $400 000 por persona</span>.</p>
      <p class="nota"><strong>Error común:</strong> comparar dos países solo con el PIB total: un país con el doble de habitantes suele tener el doble de PIB, aunque su gente viva igual.</p>`,
    vidaReal: `
      <p>Estas dos cifras aparecen en las noticias casi todos los días:</p>
      <ul>
        <li>Cuando oyes que «el PIB del país creció», sabes que la economía produjo más, no que tú ganes más.</li>
        <li>Cuando comparan tu país con otro, casi siempre usan el PIB per cápita, que es el que se reparte.</li>
        <li>Si te dicen que el trabajo informal es grande, sabes que el país produce más de lo que dice el papel.</li>
        <li>Cuando suben el PIB y baja el aire limpio, entiendes por qué una cifra sola no cuenta la historia.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un país tiene un PIB de $1 200 millones y 6 millones de habitantes. ¿Cuánto es su PIB per cápita?</p>', respuesta: 1200000000 / 6000000,
        pista: '<p>Reparte el PIB entre los habitantes: divide el total entre el número de personas.</p>',
        solucion: '<p>1 200 000 000 ÷ 6 000 000 = <strong>$200</strong> por persona.</p>' },
      { tipo: 'numero', enunciado: '<p>Ese país tiene un PIB per cápita de $200 y su población crece un 10%, mientras el PIB se queda igual. ¿Cuál es el nuevo PIB per cápita?</p>', respuesta: 200 / 1.1, tolerancia: 0.05,
        pista: '<p>Reparte el mismo total entre un 10% más de personas.</p>',
        solucion: '<p>200 ÷ 1,10 = <strong>$181,8</strong> por persona. El PIB no cambió, pero como hay más personas, a cada una le toca menos.' },
      { tipo: 'numero', enunciado: '<p>Un país de 10 millones de habitantes tiene un PIB de $2 billones ($2 000 000 000 000). La mitad de la gente se muda a otro país con el mismo PIB. ¿Cuál es el PIB per cápita del país que se quedó?</p>', respuesta: 2000000000000 / 5000000,
        pista: '<p>Ahora el PIB se reparte entre la mitad de los habitantes: 5 millones.</p>',
        solucion: '<p>2 000 000 000 000 ÷ 5 000 000 = <strong>$400 000</strong> por persona. El PIB del país no cambió, pero la cuenta por persona se duplicó.' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas cosas NO cuenta el PIB?</p>',
        opciones: ['El trabajo que se declara y se paga', 'El trabajo del hogar, como las comidas de la casa', 'Los bienes y servicios que la gente compra'], correcta: 1,
        pista: '<p>Busca la que no se declara en ninguna cuenta del país.</p>',
        solucion: '<p>El <strong>trabajo del hogar</strong>, como las comidas o el cuidado de los niños. El PIB no incluye los bienes y servicios que se producen dentro de la casa.' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el trabajo que se hace y se cobra, pero que no queda registrado en ninguna cuenta del país?</p>',
        respuestas: ['economia informal', 'la economia informal', 'sector informal', 'economia irregular', 'trabajo informal', 'el trabajo informal'],
        pista: '<p>Son dos palabras: la primera dice que la actividad no está registrada por el Estado.</p>',
        solucion: '<p>La <strong>economía informal</strong>: actividades económicas que no están reguladas, registradas ni protegidas por el Estado.' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para calcular el PIB per cápita de un país.</p>',
        respuesta: ['Miras el PIB total del país en un año', 'Miras cuántos habitantes tiene el país', 'Divides el PIB entre el número de habitantes', 'Ese resultado es el PIB per cápita, el PIB repartido entre la gente'],
        pista: '<p>Empieza por el total y termina por el reparto.</p>',
        solucion: '<p>Primero se toma el PIB total del año, luego se mira cuántos habitantes hay, después se divide el PIB entre los habitantes y, por último, ese resultado es el PIB per cápita.</p>' },
    ],
    fuentes: [CORE1, CORE2, WIKI_PIB, WIKI_INFORMAL],
  });

  // ------------------------------------------------------------------
  const POBLACION = diagrama([0, 18], [2, 10], [
    caja(0.4, 7.0, 5.4, 9.2), txt(2.9, 8.6, 'Con empleo'), txt(2.9, 7.8, '600 personas'),
    caja(5.9, 7.0, 10.9, 9.2), txt(8.4, 8.6, 'Buscan trabajo'), txt(8.4, 7.8, '100 personas'),
    caja(11.4, 7.0, 17.9, 9.2), txt(14.65, 8.6, 'No buscan trabajo'), txt(14.65, 7.8, '300 personas'),
    { tipo: 'linea', desde: [0.4, 6.2], hasta: [10.9, 6.2] },
    { tipo: 'linea', desde: [0.4, 7.0], hasta: [0.4, 6.2] },
    { tipo: 'linea', desde: [10.9, 7.0], hasta: [10.9, 6.2] },
    txt(5.65, 5.5, 'población activa: 700'),
    txt(14.65, 5.5, 'no se cuentan: 300'),
    caja(2.6, 2.6, 15.4, 4.1), txt(9.0, 3.35, 'tasa de desempleo = 100 ÷ 700 = 14,3%'),
  ], 'Diagrama con tres cajas en una fila. La primera dice «Con empleo, 600 personas», la segunda «Buscan trabajo, 100 personas» y la tercera «No buscan trabajo, 300 personas». Debajo de las dos primeras hay una llave que las agrupa y dice «población activa: 700», y debajo de la tercera dice «no se cuentan: 300». Abajo del todo, una caja muestra la cuenta: «tasa de desempleo = 100 ÷ 700 = 14,3%».');

  L('Empleo y desempleo', {
    objetivo: 'Entender cómo se mide el desempleo de un país, por qué la tasa de desempleo puede bajar sin que haya más trabajo y qué es el desempleo estructural.',
    explicacion: `
      <p>En las noticias dicen «el desempleo bajó del 8% al 6%» (cifras de ejemplo) y todo el mundo celebra. Pero hay una pregunta incómoda: ¿bajó porque más gente encontró trabajo, o porque la que no encontraba dejó de contar? Para responderla hay que ver cómo se cuenta el desempleo de un país.</p>
      <h3>Sobre quién se mide el desempleo</h3>
      <p>Ya viste en "Qué pasa con los empleos, los precios y los ahorros en una crisis" qué es la <strong>tasa de desempleo</strong> (<span lang="en">unemployment rate</span>). Lo que faltaba era el segundo detalle, y es el que cambia todo: ese porcentaje no se calcula sobre toda la población, sino solo sobre una parte. A esa parte se le llama <strong>población activa</strong> (<span lang="en">labor force</span>), y está formada por las personas que tienen empleo y las que lo buscan. Quien no busca trabajo, porque estudia, está jubilado, está enfermo o no quiere trabajar, queda fuera de la cuenta: es lo que Wikipedia en español llama población inactiva.</p>
      <p>La cuenta es una fracción, así que importa muchísimo quién está arriba y quién abajo:</p>
      <p><strong>tasa de desempleo = personas que buscan trabajo ÷ población activa × 100</strong></p>
      <p>Se lee "las personas que están buscando trabajo, divididas entre la población activa, multiplicadas por 100". Es decir: de todas las personas que están buscando o ya tienen trabajo, ¿qué porcentaje no lo encuentra?</p>
      ${POBLACION}
      <p>El diagrama lo muestra con un ejemplo de mil personas: seiscientas tienen empleo, cien buscan trabajo y trescientas no buscan. La población activa son las primeras setecientas, y la tasa es 100 de cada 700.</p>
      <h3>Por qué la tasa puede mentir</h3>
      <p>Aquí está la trampa. Imagina que de esos cien que buscan trabajo, cincuenta dejan de buscar: se dedicaron al estudio, se cansaron de buscar o se fueron del país. ¿Qué pasa con la tasa? El numerador baja a 50 y el denominador baja a 650. La tasa baja del 14,3% al 7,7%, y las noticias titularán que el desempleo se ha reducido a la mitad. Pero el empleo no cambió ni una persona: sigue habiendo 600 personas trabajando.</p>
      <p>Por eso el dato que hay que mirar primero es el empleo, no la tasa. Y por eso la tasa de desempleo nunca se lee sola: hay que preguntarse siempre por el número de personas que sí están trabajando.</p>
      <h3>Dos clases de desempleo</h3>
      <p>El desempleo no es siempre igual. Hay dos clases, y la diferencia está en si esperar ayuda o si hay que cambiar algo:</p>
      <ul>
        <li>El <strong>desempleo estructural</strong> (<span lang="en">structural unemployment</span>) aparece cuando el trabajo que había cambió de tipo y la gente no tiene la habilidad que el trabajo nuevo pide. Wikipedia en español lo define como un desajuste entre la oferta y la demanda de mano de obra, es decir, entre los puestos que hay y las personas disponibles para cubrirlos. Esperar no lo arregla: hay que aprender.</li>
        <li>El desempleo cíclico aparece cuando la economía cae y desaparece cuando se recupera. Ese sí se arregla esperando, porque vuelve el trabajo que se había perdido.</li>
      </ul>
      <p>Fíjate en la diferencia: en los auges la economía crece y el desempleo baja; en las recesiones la economía cae y el desempleo sube. En la lección siguiente, "Crecimiento económico y ciclos", vas a ver esa relación en la curva del PIB.</p>`,
    ejemplo: `
      <p>Un país tiene 1 000 personas: 600 con empleo, 100 buscando trabajo y 300 que no buscan. Las cifras son de ejemplo. ¿Cuál es la tasa de desempleo?</p>
      <ol class="pasos-ej">
        <li>Primero, la población activa: los que tienen empleo más los que lo buscan, 600 + 100 = 700 personas.</li>
        <li>Segundo, la tasa: 100 ÷ 700 = 0,1428, es decir, <strong>14,3%</strong>.</li>
        <li>Tercero, el año siguiente: 50 de los que buscaban dejan de buscar. La población activa baja a 650 y los que buscan son 50: 50 ÷ 650 = 0,0769, o sea, <strong>7,7%</strong>.</li>
        <li>Cuarto, fíjate en lo que no cambió: siguen siendo 600 personas con empleo. Lo que bajó fue el número de los que buscan trabajo, y por eso bajó también el denominador.</li>
        <li>Comprueba: 100 ÷ 700 = 14,3% y 50 ÷ 650 = 7,7%. La tasa casi se partió a la mitad y, sin embargo, el empleo es el mismo.</li>
      </ol>
      <p>Resultado: <span class="resultado">la tasa bajó de 14,3% a 7,7% sin que nadie más encontrara trabajo</span>.</p>
      <p class="nota"><strong>Error común:</strong> dividir los que buscan trabajo entre toda la población (100 ÷ 1 000). La tasa se mide solo sobre la población activa.</p>`,
    vidaReal: `
      <p>Saber cómo se mide el desempleo te sirve al leer las noticias:</p>
      <ul>
        <li>Si la tasa de desempleo baja, mira si el empleo subió: a lo mejor solo dejó de contarse gente.</li>
        <li>Cuando leas la tasa de desempleo de un país, recuerda que deja fuera a quien no busca trabajo.</li>
        <li>Si el trabajo de tu barrio cambió de tipo, puede que el problema sea el desempleo estructural, que no se arregla esperando.</li>
        <li>Entiendes por qué unas noticias celebran la baja del desempleo y otras dicen que no mejoró nada.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En un país hay 420 personas con empleo y 80 que están buscando trabajo. ¿Cuántas personas forman la población activa?</p>', respuesta: 420 + 80,
        pista: '<p>Suma quienes tienen empleo y quienes lo buscan.</p>',
        solucion: '<p>420 + 80 = <strong>500 personas</strong> forman la población activa. Quien no busca trabajo no se cuenta en esa suma.</p>' },
      { tipo: 'numero', enunciado: '<p>En ese país, 80 personas buscan trabajo y la población activa es de 500 personas. ¿Cuál es la tasa de desempleo, en porcentaje?</p>', respuesta: 80 / 500 * 100, tolerancia: 0.1,
        pista: '<p>Divide los que buscan trabajo entre la población activa y multiplica por 100.</p>',
        solucion: '<p>80 ÷ 500 = 0,16, y 0,16 × 100 = <strong>16%</strong> de tasa de desempleo.</p>' },
      { tipo: 'numero', enunciado: '<p>En otro país hay 200 personas buscando trabajo y 800 con empleo. Si 40 de las que buscaban dejan de buscar, ¿cuál es la nueva tasa de desempleo, en porcentaje?</p>', respuesta: 160 / 960 * 100, tolerancia: 0.2,
        pista: '<p>Los que buscan ahora son 200 − 40, y la población activa es 800 + 160.</p>',
        solucion: '<p>Quedan 160 buscando trabajo y la población activa es 960: 160 ÷ 960 = 0,1667, es decir, <strong>16,7%</strong>. Baja porque el numerador y el denominador bajaron, no porque haya más empleo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué puede bajar la tasa de desempleo aunque no haya más trabajo?</p>',
        opciones: ['Porque el Gobierno cambió la forma de contarla', 'Porque las empresas contrataron a más gente', 'Porque menos personas buscan trabajo y por eso la tasa baja'], correcta: 2,
        pista: '<p>Piensa en qué pasa con las dos partes de la división.</p>',
        solucion: '<p><strong>Porque menos personas buscan trabajo.</strong> Si dejan de buscar, salen del numerador y también del denominador, y la tasa baja aunque el empleo siga igual.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el conjunto de las personas que tienen empleo o que están buscando trabajo?</p>',
        respuestas: ['poblacion activa', 'la poblacion activa'],
        pista: '<p>Son dos palabras: la primera dice de qué gente se trata y la segunda que es la que está en la actividad.</p>',
        solucion: '<p>La <strong>población activa</strong>: las personas empleadas más las que buscan empleo. Es el denominador de la tasa de desempleo.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para calcular la tasa de desempleo de un país.</p>',
        respuesta: ['Miras quién tiene empleo y quién busca trabajo', 'Sumas esos dos grupos para sacar la población activa', 'Divides los que buscan trabajo entre la población activa', 'Multiplicas por 100 para expresar el resultado como porcentaje'],
        pista: '<p>Empieza por contar la gente y termina por pasarlo a porcentaje.</p>',
        solucion: '<p>Primero se cuenta quién tiene empleo y quién lo busca, luego se suman para obtener la población activa, después se divide y, por último, se multiplica por 100.</p>' },
    ],
    fuentes: [CORE13, CORE16, WIKI_DESEMPLEO],
  });

  // ------------------------------------------------------------------
  const CICLO_PIB = G({
    x: [1, 9], y: [92, 114], pasos: [1, 5], nombres: false,
    figuras: [
      { tipo: 'poligono', puntos: [[1, 92], [3, 92], [3, 114], [1, 114]], relleno: true },
      { tipo: 'poligono', puntos: [[3, 92], [5, 92], [5, 114], [3, 114]], relleno: true, serie: 1 },
      { tipo: 'poligono', puntos: [[1, 100], [2, 103], [3, 106], [4, 103], [5, 98], [6, 100], [7, 103], [8, 106]], abierto: true },
      txt(2, 110, 'auge'),
      txt(4, 110, 'recesión'),
      txt(6.6, 110, 'recuperación'),
      txt(2.2, 93.2, 'trimestre'),
      txt(1, 115.2, 'PIB'),
    ],
    puntos: [{ x: 3, y: 106, etiqueta: 'pico' }, { x: 5, y: 98, etiqueta: 'valle' }],
    descripcion: 'Gráfica de la curva del PIB a lo largo de ocho trimestres. La curva sube desde 100 en el trimestre 1 hasta 106 en el trimestre 3, que es el pico; baja hasta 98 en el trimestre 5, que es el valle; y vuelve a subir hasta 106 en el trimestre 8. Una franja sombreada marca el auge, del trimestre 1 al 3, y otra marca la recesión, del trimestre 3 al 5. En el eje horizontal están los trimestres y en el vertical el valor del PIB.',
  });

  L('Crecimiento económico y ciclos', {
    objetivo: 'Explicar por qué la economía sube y baja, distinguir un auge de una recesión y saber que los picos y los valles los fecha un comité de expertos.',
    explicacion: `
      <p>Si la economía tuviera un motor, el indicador iría siempre hacia arriba. Pero las noticias alternan épocas buenas y crisis desde hace siglos. ¿Qué hace subir y bajar la aguja? La respuesta corta es la demanda, y la respuesta larga es lo que vas a ver en esta lección.</p>
      <h3>Un ciclo, no una línea recta</h3>
      <p>La economía no crece en línea recta: da tirones. En los periodos buenos, que se llaman <strong>auge</strong> (<span lang="en">boom</span>), se produce más, se contrata más y la gente gasta más. En los malos, que se llaman <strong>recesión</strong> (<span lang="en">recession</span>), pasa lo contrario. La diferencia entre una recesión y una depresión la viste en "Recesión y depresión: en qué se diferencian"; aquí importa otra cosa: cómo se encadenan esas etapas.</p>
      <p>El movimiento del auge a la recesión y de vuelta al auge se llama ciclo económico. CORE Econ explica que las recesiones, entendidas como crecimiento negativo (cuando la economía se hace más pequeña), ocurren aproximadamente dos veces cada diez años. Es decir: la recesión es la excepción, no la regla.</p>
      <h3>El motor es la demanda</h3>
      <p>¿Por qué sube y baja? Por el lado de la demanda, que ya viste en "Oferta y demanda". Cuando la gente y las empresas gastan más, las empresas venden más, así que producen más y contratan más personas. Y como hay más empleo, hay más ingresos y se gasta todavía más. Cuando dejan de gastar, pasa justo lo contrario: se vende menos, se produce menos y se despide. Por eso, en los auges el desempleo baja y en las recesiones sube, como viste en "Empleo y desempleo".</p>
      <h3>El pico y el valle</h3>
      <p>Cada ciclo tiene dos puntos donde la dirección cambia: el <strong>pico y valle</strong> (<span lang="en">peak and trough</span>), que son el punto más alto y el punto más bajo. Al pico le sigue la caída y al valle, la recuperación. Al valle también lo llaman «fondo», como viste en "Qué es una crisis económica".</p>
      ${CICLO_PIB}
      <p>La curva sube en el primer tramo, ese es el auge. Luego baja entre el pico y el valle, esa es la recesión. Y desde el valle vuelve a subir, que es la recuperación, hasta un pico más alto.</p>
      <h3>Quién fecha los picos y los valles</h3>
      <p>Nadie puede marcar la hora exacta de antemano. En Estados Unidos, la Oficina Nacional de Investigación Económica (NBER) mantiene una cronología del ciclo de ese país. Un comité de expertos mira el empleo, la producción y los ingresos de la gente, y decide qué meses fueron el pico y cuáles el valle. Según la NBER, las expansiones (las etapas de crecimiento) van de un valle a un pico, y las recesiones van de un pico a un valle.</p>
      <p>Y avisa: la recesión se anuncia meses después de que empezó, porque hace falta tener datos suficientes. Las historias de las crisis más conocidas están en "Crisis históricas y lo que nos enseñaron". Las señales que avisan que se acerca una están en "Señales de alerta de una crisis".</p>`,
    ejemplo: `
      <p>Un país anota su PIB en ocho trimestres. Las cifras son de ejemplo. ¿Dónde empieza y termina cada auge y cada recesión, y cuánto crece el ciclo?</p>
      <div class="tabla-wrap"><table>
        <tr><th>Trimestre</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr>
        <tr><th>PIB</th><td>100</td><td>103</td><td>106</td><td>103</td><td>98</td><td>100</td><td>103</td><td>106</td></tr>
      </table></div>
      <ol class="pasos-ej">
        <li>Primero, el pico: el PIB deja de subir en el trimestre 3, cuando llega a 106. Del 1 al 3 hay un auge.</li>
        <li>Segundo, el valle: el PIB deja de bajar en el trimestre 5, con 98. Del pico al valle es la recesión.</li>
        <li>Tercero, la caída: 106 − 98 = 8 puntos, y 8 ÷ 106 = 7,5% del pico.</li>
        <li>Cuarto, el ciclo completo: del valle (98) al siguiente pico (106) subió 8 puntos en tres trimestres, 8,2%.</li>
        <li>Quinto, en los auges baja el desempleo y en las recesiones sube, como viste en "Empleo y desempleo".</li>
      </ol>
      <p>Resultado: <span class="resultado">auge de 1 a 3, recesión de 3 a 5, y 8,2% de crecimiento del valle al pico</span>.</p>
      <p class="nota"><strong>Error común:</strong> medir la caída desde el valle: va de 106 a 98, y el 100% se toma del 106.</p>`,
    vidaReal: `
      <p>Saber que la economía sube y baja te sirve para leer las noticias sin asustarte:</p>
      <ul>
        <li>Cuando oyes que «la economía está en auge», sabes que normalmente hay más trabajo y que ese tiempo puede durar.</li>
        <li>Cuando dicen que «entraron en recesión», no es el fin del mundo: la mayoría son breves, aunque recuperarse puede tardar.</li>
        <li>Entiendes por qué los precios, el empleo y los negocios cambian de golpe y después se estabilizan.</li>
        <li>Sabes que las recesiones se anuncian tarde: cuando te lo digan, ya llevaban un tiempo ocurriendo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En un país el PIB cayó de 106 a 98 durante una recesión. ¿En qué porcentaje cayó, tomando como referencia el valor del pico?</p>', respuesta: (106 - 98) / 106 * 100, tolerancia: 0.1,
        pista: '<p>Divide lo que cayó entre el valor que tenía en el pico.</p>',
        solucion: '<p>8 ÷ 106 = 0,0755, es decir, <strong>7,5%</strong> de caída. El 100% se toma del pico, porque la caída va de 106 a 98.</p>' },
      { tipo: 'numero', enunciado: '<p>Del valle al siguiente pico, el PIB pasó de 98 a 106 en tres trimestres. ¿Cuántos puntos sube, de media, cada trimestre?</p>', respuesta: (106 - 98) / 3, tolerancia: 0.05,
        pista: '<p>Divide los 8 puntos que subió entre los tres trimestres.</p>',
        solucion: '<p>8 ÷ 3 = <strong>2,7 puntos</strong> por trimestre. Ese es el ritmo de crecimiento de la recuperación.</p>' },
      { tipo: 'numero', enunciado: '<p>El PIB de un país subió de 100 en el primer trimestre a 106 en el tercero. ¿Cuántos puntos subió en ese auge?</p>', respuesta: 106 - 100,
        pista: '<p>Resta el valor del primer trimestre al del tercero.</p>',
        solucion: '<p>106 − 100 = <strong>6 puntos</strong> de subida. En porcentaje sería 6 ÷ 100 = 6%.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué pone en marcha un auge económico?</p>',
        opciones: ['Que el Estado suba los impuestos', 'Que la población deje de buscar trabajo', 'Que la gente y las empresas gasten más'], correcta: 2,
        pista: '<p>Es el motor del ciclo: ¿qué hace la gente cuando la economía va bien?</p>',
        solucion: '<p><strong>Que la gente y las empresas gasten más.</strong> Las empresas venden más, producen más y contratan más personas, y con más empleo vuelve a gastarse más.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el punto más alto del ciclo, justo antes de que la economía empiece a caer?</p>',
        respuestas: ['pico', 'el pico', 'peak'],
        pista: '<p>Es una palabra corta: es lo contrario del valle.</p>',
        solucion: '<p>El <strong>pico</strong>. El valle es el punto más bajo, justo antes de que la economía vuelva a subir.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena lo que pasa en la economía durante un auge.</p>',
        respuesta: ['La gente y las empresas gastan más', 'Las empresas venden más de lo que vendían', 'Producen más y contratan más personas', 'Con más empleo hay más ingresos y se vuelve a gastar más'],
        pista: '<p>Empieza por el gasto y termina por el gasto otra vez.</p>',
        solucion: '<p>Primero la gente y las empresas gastan más, luego las empresas venden más, después producen más y contratan más personas y, por último, con más empleo hay más ingresos y se vuelve a gastar más.</p>' },
    ],
    fuentes: [CORE13, NBER, FED_CR],
  });

  // ------------------------------------------------------------------
  const FLUJO_PRESUPUESTO = diagrama([0, 20], [0, 10], [
    caja(0.2, 3.6, 4.2, 6.4), txt(2.2, 5.5, 'Familias'), txt(2.2, 4.6, 'y empresas'),
    ...flecha([4.35, 5.0], [5.4, 5.0], 0, 1.4),
    caja(5.55, 3.6, 8.95, 6.4), txt(7.25, 5.0, 'Impuestos'),
    ...flecha([9.1, 5.0], [10.55, 5.0], 0, 1.4),
    caja(10.7, 3.6, 14.1, 6.4), txt(12.4, 5.5, 'El Estado'), txt(12.4, 4.6, 'gasta'),
    ...flecha([14.25, 5.0], [15.7, 5.0], 0, 1.4),
    caja(15.85, 3.6, 19.25, 6.4), txt(17.55, 5.5, 'Servicios'), txt(17.55, 4.6, 'públicos'),
    txt(9.9, 2.5, 'Escuelas, hospitales, carreteras y seguridad'),
  ], 'Diagrama con cuatro cajas en una fila, unidas por flechas que van de izquierda a derecha. La primera caja dice «Familias y empresas», la segunda «Impuestos», la tercera «El Estado» y la cuarta «Servicios públicos». Debajo de las cajas, una frase dice que el Estado gasta en «Escuelas, hospitales, carreteras y seguridad». El recorrido muestra que las familias y las empresas pagan impuestos, el Estado los reúne y los devuelve en servicios públicos.');

  L('Impuestos y gasto público', {
    objetivo: 'Entender para qué gasta el Estado el dinero que recauda, qué pasa cuando gasta más de lo que recauda y por qué un déficit repetido se convierte en deuda.',
    explicacion: `
      <p>Cuando miras tu recibo de sueldo, una parte de lo que ganaste no llega a tu bolsillo: son los impuestos. Y en el precio de la comida que compras también hay un impuesto. Ya viste en "Impuestos básicos" qué son y cómo se pagan. Falta la pregunta que viene después: ¿a dónde va ese dinero y qué pasa cuando no alcanza?</p>
      <h3>El dinero que el Estado reparte</h3>
      <p>El Estado gasta parte de ese dinero en cosas que usas todos los días sin pagarlas en el momento: la escuela pública, el hospital, la calle por la que circulas, la biblioteca. A todo eso se le llama <strong>gasto público</strong> (<span lang="en">public spending</span>). El SERNAC lo resume así: el Estado obtiene sus recursos por dos vías, la recaudación de impuestos y el ejercicio de determinadas actividades económicas. Con ellos financia programas sociales y de obras públicas, invierte en su propia infraestructura y genera empleos.</p>
      <p>CORE Econ añade: gran parte del gasto público, sin contar las pensiones y otras ayudas, se destina a servicios públicos generales, salud y educación.</p>
      ${FLUJO_PRESUPUESTO}
      <p>Fíjate en el recorrido del diagrama: las familias y las empresas pagan impuestos, el Estado los reúne y los devuelve en servicios públicos. Es dinero que vuelve a ti, pero no en el mismo sitio ni el día que tú decides.</p>
      <h3>Cuando el Estado gasta más de lo que recauda</h3>
      <p>Supongamos que el Estado recoge 100 y gasta 120 (cifras de ejemplo). Lo que gastó es más de lo que recogió, y esa diferencia tiene nombre: <strong>déficit</strong> (<span lang="en">deficit</span>). Wikipedia en español lo define como la situación en la que los gastos realizados por el Estado superan a los ingresos no financieros (el dinero que entra sin contar los préstamos) en un periodo determinado, normalmente un año.</p>
      <p><strong>déficit = gastos − ingresos</strong></p>
      <p>Se lee «gastos menos ingresos». Si el resultado es positivo, el Estado gastó más de lo que recogió ese año.</p>
      <p>Un déficit en un año no es una catástrofe. Cuando la economía está floja, gastar más ayuda. CORE Econ explica que un aumento en el gasto público desplaza la curva de demanda agregada hacia arriba. Eso pone a los negocios a vender más y a contratar más personas, como viste en "Crecimiento económico y ciclos". El problema aparece cuando el Estado repite la jugada todos los años, sin que la economía lo necesite.</p>
      <h3>De dónde sale el dinero que falta</h3>
      <p>Cuando falta dinero, el Estado pide prestado, y eso es tomar un crédito, como viste en "Qué es un crédito". Lo hace emitiendo bonos: papeles que prometen devolver el dinero dentro de un tiempo y pagar intereses. La suma de todos esos bonos que el Estado todavía no ha pagado se llama <strong>deuda pública</strong> (<span lang="en">public debt</span>). CORE Econ la define como la suma de todos los bonos que el Estado ha vendido a lo largo de los años para financiar sus déficits, menos los que han vencido.</p>
      <h3>Gastar de más y gastar de menos</h3>
      <p>Los dos extremos tienen consecuencias distintas, y por eso conviene mirar los dos lados:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Si el Estado gasta de más</th><th>Si el Estado gasta de menos</th></tr>
        <tr><th>El déficit</th><td>Aparece: gasta más de lo que recauda.</td><td>No aparece: sobra dinero, y a ese sobrante se le llama superávit.</td></tr>
        <tr><th>La deuda</th><td>Crece, si la diferencia se financia con préstamos.</td><td>Puede bajar, porque el Estado puede pagar deuda con el sobrante.</td></tr>
        <tr><th>Los servicios</th><td>Se mantienen, pero el margen para una crisis se achica.</td><td>Se recortan: la escuela o el hospital reciben menos.</td></tr>
        <tr><th>La economía</th><td>Ayuda si estaba floja; sin necesidad, puede desestabilizarla.</td><td>La empeora si estaba floja, y el desempleo sube.</td></tr>
      </table></div>
      <p>Ahí aparece el costo de oportunidad, que viste en "Escasez y costo de oportunidad": cada peso que el Estado gasta en una cosa es un peso que no gasta en otra. Por eso un Estado que gasta demasiado también puede hacer daño, y uno que gasta de menos también.</p>`,
    ejemplo: `
      <p>Un país recauda 100 millones y el Estado gasta 120 millones. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Primero, la cuenta: recoge 100 millones y gasta 120 millones.</li>
        <li>Segundo, la diferencia: 120 − 100 = 20 millones. Eso es el déficit: gastos menos ingresos.</li>
        <li>Tercero, al año siguiente, si vuelve a recoger 100 y a gastar 100, no hay déficit nuevo, pero los 20 millones anteriores hay que pagarlos con intereses: al 5% son 1 millón, y la deuda queda en 21 millones.</li>
        <li>Cuarto, comprueba: el año uno terminó con un déficit de 20 millones y el año dos con una deuda de 21.</li>
        <li>Quinto, ojo: gastar de más no siempre es un error. Si la economía está floja, da trabajo a la gente; el daño llega cuando se repite cada año sin que la economía lo necesite, porque entonces puede desestabilizarla.</li>
      </ol>
      <p>Resultado: <span class="resultado">un déficit de 20 millones y, al año siguiente, una deuda de 21 millones</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que un déficit es dinero que se debe sin más. Si se cubre con préstamos, hay que devolverlos con intereses.</p>`,
    vidaReal: `
      <p>Saber de dónde sale el dinero del Estado te ayuda a leer las noticias:</p>
      <ul>
        <li>Cuando oyes que el Gobierno subió el gasto en salud o en educación, sabes que ese dinero sale de los impuestos de todos.</li>
        <li>Cuando dicen que el país tiene déficit, sabes que el Estado gastó más de lo que recogió ese año.</li>
        <li>Entiendes por qué un recorte de gastos en plena crisis puede empeorar las cosas: menos obras y menos trabajo.</li>
        <li>Entiendes que un Estado que pide prestado cada año tiene menos margen para una emergencia.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un Estado recauda 80 millones de dólares en impuestos y gasta 95 millones. ¿De cuánto es el déficit, en millones?</p>', respuesta: 95 - 80,
        pista: '<p>Resta lo que gasta menos lo que recauda.</p>',
        solucion: '<p>95 − 80 = <strong>15 millones</strong> de déficit. El Estado gastó 15 millones más de lo que recogió.</p>' },
      { tipo: 'numero', enunciado: '<p>Un país tiene una deuda pública de 50 millones y cada año su déficit es de 10 millones. Si el Estado no devuelve nada del principal, ¿cuál será la deuda dentro de tres años?</p>', respuesta: 50 + 10 * 3,
        pista: '<p>Suma la deuda que ya existe y el déficit de los tres años.</p>',
        solucion: '<p>50 + (10 × 3) = <strong>80 millones</strong>. Cada año el déficit se suma a la deuda, y en la realidad hay que pagar además los intereses de los préstamos.' },
      { tipo: 'opciones', enunciado: '<p>¿Qué pasa cuando el Estado gasta menos de lo que recauda?</p>',
        opciones: ['Sobra dinero, y el Estado puede usarlo para pagar deuda o guardar margen', 'El Estado pide prestado para poder pagar los servicios', 'Aparece un déficit cada vez más grande'], correcta: 0,
        pista: '<p>Cuando entra más dinero del que sale, el resultado es lo contrario del déficit.</p>',
        solucion: '<p><strong>Sobra dinero.</strong> A ese sobrante se le llama superávit, y con él el Estado puede pagar deuda o tener más margen para una crisis.' },
      { tipo: 'opciones', enunciado: '<p>Un Estado gasta más de lo que recauda todos los años y lo financia con préstamos. ¿Cuál de estas cosas es verdad?</p>',
        opciones: ['El país no tiene ningún problema, porque el dinero prestado se devuelve solo', 'La deuda pública crece año con año y el Estado tiene menos margen para una crisis', 'El déficit desaparece en cuanto el Estado pide prestado'], correcta: 1,
        pista: '<p>Piensa en lo que pasa con la deuda cuando el déficit se repite.</p>',
        solucion: '<p><strong>La deuda pública crece año con año.</strong> Cada préstamo se suma a la deuda anterior y hay que pagarlo con intereses, así que el margen para una próxima crisis se hace más pequeño.' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la suma de los préstamos que el Estado ha emitido para financiar sus déficits y que todavía no ha pagado?</p>',
        respuestas: ['deuda publica', 'la deuda publica'],
        pista: '<p>Son dos palabras: la primera dice a quién se le debe el dinero.</p>',
        solucion: '<p>La <strong>deuda pública</strong>: la suma de todos los bonos que el Estado ha vendido a lo largo de los años para financiar sus déficits, menos los que han vencido.' },
      { tipo: 'ordenar', enunciado: '<p>Ordena lo que pasa cuando el Estado gasta más de lo que recauda.</p>',
        respuesta: ['El Estado gasta más de lo que recauda', 'Aparece un déficit en las cuentas públicas', 'Para cubrirlo, el Estado pide dinero prestado', 'La deuda pública crece y hay que pagarla con intereses'],
        pista: '<p>Empieza por el gasto y termina por la deuda.</p>',
        solucion: '<p>Primero el Estado gasta más de lo que recauda, después aparece el déficit, luego pide dinero prestado para cubrirlo y, por último, la deuda pública crece y hay que pagarla con intereses.' },
    ],
    fuentes: [CORE14, SERNAC, WIKI_DEFICIT],
  });

  // ------------------------------------------------------------------
  const INTERCAMBIO = diagrama([0, 20], [0, 10], [
    caja(0.4, 3.0, 5.6, 7.0), txt(3.0, 5.9, 'País A'), txt(3.0, 4.9, 'produce café'), txt(3.0, 4.2, 'y ropa'),
    caja(14.4, 3.0, 19.6, 7.0), txt(17.0, 5.9, 'País B'), txt(17.0, 4.9, 'produce'), txt(17.0, 4.2, 'máquinas'),
    ...flecha([5.8, 5.8], [14.2, 5.8], 0, 1.4),
    ...flecha([14.2, 4.2], [5.8, 4.2], 1, 1.4),
    txt(10.0, 6.5, 'exporta café y ropa'),
    txt(10.0, 3.4, 'exporta máquinas'),
    txt(3.3, 2.0, 'compra máquinas'),
    txt(17.0, 2.0, 'compra café'),
    txt(10.0, 0.9, 'Los dos ganan: cada uno hace lo que sabe hacer'),
  ], 'Diagrama con dos cajas. A la izquierda, la caja «País A», que produce café y ropa; a la derecha, la caja «País B», que produce máquinas. Una flecha va del país A al país B y está rotulada «exporta café y ropa»; otra flecha va del país B al país A y dice «exporta máquinas». Debajo de cada caja se lee que el país A compra máquinas y el país B compra café.');

  const MERCADO_MONEDA = G({
    x: [0, 10], y: [0, 40], pasos: [2, 10], nombres: false,
    funciones: [
      { f: (x) => 30 - 2 * x, etiqueta: 'demanda de moneda extranjera', serie: 0 },
      { f: (x) => 10 + 2 * x, etiqueta: 'oferta de moneda extranjera', serie: 1 },
    ],
    figuras: [txt(1.6, 42, 'tipo de cambio'), txt(5, 1.8, 'cantidad de moneda')],
    puntos: [{ x: 5, y: 20, etiqueta: 'equilibrio' }],
    descripcion: 'Gráfica del mercado de la moneda extranjera. La curva de demanda baja desde un tipo de cambio de 30, cuando no se cambia moneda, hasta 10, cuando se cambian 10 unidades. La curva de oferta sube desde 10 hasta 30. Las dos curvas se cruzan en el punto de equilibrio, con 5 unidades de moneda y un tipo de cambio de 20. En el eje horizontal está la cantidad de moneda y en el eje vertical el tipo de cambio.',
  });

  L('Comercio internacional y tipo de cambio', {
    objetivo: 'Entender por qué los países comercian entre sí, qué es el tipo de cambio y por qué sube o baja, y cómo se mide la balanza comercial de un país.',
    explicacion: `
      <p>En tu ciudad no hay fábrica de teléfonos, ni de zapatos, ni de café. Y sin embargo tienes de todo. ¿Cómo llega hasta tu casa cada cosa? La respuesta es el comercio entre países, y ese intercambio tiene un precio que se mueve todos los días: el precio al que se cambian las monedas.</p>
      <h3>Por qué se comercia</h3>
      <p>Nadie fabrica todo. Cada país se especializa en lo que sabe hacer mejor y cambia el resto. Un país con clima cálido produce café; otro, con yacimientos de cobre, produce cobre. CORE Econ explica que esta especialización permite ganancias mutuas para las personas de los países que comercian entre sí: cada uno hace lo que le sale bien y después cambia por lo que no puede producir.</p>
      ${INTERCAMBIO}
      <p>En el diagrama, el país A produce café y ropa y se lo exporta al país B, que produce máquinas y se las exporta. Nadie necesita saber hacerlo todo: el intercambio hace el trabajo.</p>
      <p>Ahora bien, el comercio no siempre reparte parejo: CORE Econ advierte que puede beneficiar a algunos grupos de un país mientras perjudica a otros. Por eso algunos gobiernos quieren proteger a las industrias nacionales de la competencia extranjera, lo que se llama proteccionismo. El problema, como dice la misma fuente, es que los consumidores pagan más por las importaciones.</p>
      <h3>El precio del intercambio</h3>
      <p>Para cambiar pesos por dólares hay que mirar el <strong>tipo de cambio</strong> (<span lang="en">exchange rate</span>). La CONDUSEF lo explica así: el tipo de cambio te dice cuántos pesos valen un dólar, o un euro. Es el precio de la moneda de otro país medido en dinero del tuyo.</p>
      <p>Ese precio sube y baja todos los días por las noticias que afectan la economía, por las decisiones de los bancos centrales y por la demanda de dólares, como recuerda la CONDUSEF.</p>
      <p>Fíjate en lo que pasa cuando el tipo de cambio sube: un dólar que costaba 25 pesos pasa a costar 28 (cifras de ejemplo), y tu moneda vale menos. Eso es una depreciación, y ya viste en "Proteger tu dinero de la inflación y la devaluación" qué significa para tus ahorros. Al revés, si el tipo de cambio baja y tu moneda vale más, eso se llama apreciación. Con el comercio, el efecto es el contrario de lo que parece a primera vista. Las importaciones se encarecen, pero las exportaciones se abaratan para los compradores extranjeros, y eso hace que el país exporte más, como explica Wikipedia en español.</p>
      <p>Para entender por qué se mueve, mira el mercado de la moneda extranjera como cualquier otro, con su oferta y su demanda. Ya viste cómo funcionan en "Oferta y demanda" y en "Mercados y formación de precios".</p>
      ${MERCADO_MONEDA}
      <p>La demanda de moneda extranjera la hacen quienes necesitan comprar productos de fuera. La oferta la hacen quienes venden al extranjero y cambian el dinero que reciben. Si el país exporta más, los extranjeros necesitan más moneda local y ofrecen más moneda extranjera. Entonces el tipo de cambio baja y el país compra más barato en el exterior. Si el país importa más, la demanda de moneda extranjera sube, el tipo de cambio sube y las importaciones se encarecen. Por eso, con el tiempo, las exportaciones se abaratan para el extranjero y el país vuelve a exportar más.</p>
      <h3>Exportaciones, importaciones y balanza comercial</h3>
      <p>Lo que un país vende al exterior son sus <strong>exportaciones</strong> (<span lang="en">exports</span>) y lo que compra son sus importaciones. La diferencia entre las dos cosas se llama <strong>balanza comercial</strong> (<span lang="en">trade balance</span>). Wikipedia en español la define como un indicador que se calcula como la diferencia entre las exportaciones y las importaciones de un país en un tiempo determinado. Si el país exporta más de lo que importa, la balanza es positiva; si importa más, es negativa.</p>`,
    ejemplo: `
      <p>Un exportador de café vende su kilo a 300 pesos y el tipo de cambio es 25 pesos por dólar. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Primero, lo que paga el extranjero: 300 ÷ 25 = <strong>12 dólares por kilo</strong>.</li>
        <li>Segundo, si el tipo de cambio sube a 28, ese kilo le cuesta 300 ÷ 28 = <strong>10,71 dólares</strong>: 1,29 menos.</li>
        <li>Tercero, lo importante: el exportador sigue recibiendo 300 pesos por kilo, pero su café se abarató en el país del cliente, así que puede vender más.</li>
        <li>Cuarto, con el tipo de cambio en 28, las importaciones se encarecen para quien compra dentro del país.</li>
        <li>Quinto, comprueba: 300 ÷ 25 = 12 y 300 ÷ 28 = 10,71; el precio en pesos no cambió, el que bajó fue el precio en dólares.</li>
      </ol>
      <p>Resultado: <span class="resultado">12 dólares por kilo con el tipo de cambio en 25, y 10,71 con el tipo en 28</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que una moneda más débil sube el precio en pesos de tu producto. El precio en pesos no cambió: lo que cambió es que se abarató afuera, y eso puede aumentar tus ventas.</p>`,
    vidaReal: `
      <p>Saber cómo funciona el tipo de cambio ayuda a entender muchas noticias:</p>
      <ul>
        <li>Cuando oyes que «el dólar subió», sabes que lo que viene de fuera cuesta más en tu moneda.</li>
        <li>Cuando dicen que tu moneda «se apreció», entiendes que exportar se puso más difícil y comprar fuera sale más barato.</li>
        <li>Entiendes por qué un país que exporta mucho café o cobre vive un tipo de cambio distinto de uno que solo importa.</li>
        <li>Entiendes por qué los precios de dos países no se comparan sin mirar el tipo de cambio.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Si un dólar cuesta 25 pesos, ¿cuántos pesos son 60 dólares?</p>', respuesta: 60 * 25,
        pista: '<p>Multiplica los dólares por el precio de cada dólar.</p>',
        solucion: '<p>60 × 25 = <strong>1 500 pesos</strong>. El tipo de cambio dice cuánto dinero de tu país cuesta una unidad de la moneda extranjera.' },
      { tipo: 'numero', enunciado: '<p>El café se exporta a 12 dólares el kilo. Con un tipo de cambio de 28 pesos por dólar, ¿cuántos pesos recibe el exportador por kilo?</p>', respuesta: 12 * 28,
        pista: '<p>El precio en dólares no cambia; lo que cambia es lo que vale cada dólar.</p>',
        solucion: '<p>12 × 28 = <strong>336 pesos</strong> por kilo. Con un tipo de cambio de 25 serían 300 pesos, así que, si el precio en dólares no cambia, el exportador recibe 36 pesos más por kilo.' },
      { tipo: 'opciones', enunciado: '<p>El tipo de cambio de un país sube, y su moneda vale menos. ¿Qué efecto tiene eso en las exportaciones?</p>',
        opciones: ['Se hacen más caras para los compradores extranjeros, y el país exporta menos', 'Se abaratan para los compradores extranjeros, y el país puede exportar más', 'No cambia nada, porque el precio de los productos es el mismo'], correcta: 1,
        pista: '<p>Piensa en cuántos dólares paga el comprador extranjero por el mismo café.</p>',
        solucion: '<p><strong>Se abaratan para los compradores extranjeros.</strong> Con la moneda depreciada, lo que exporta el país cuesta menos en la moneda de fuera, así que se vende más. En cambio, las importaciones se encarecen.' },
      { tipo: 'opciones', enunciado: '<p>Un país pone impuestos a los productos que vienen de fuera para proteger a sus fábricas. ¿Qué pasa con los precios dentro del país?</p>',
        opciones: ['Suben, porque los productos importados se encarecen', 'Bajan, porque hay más competencia', 'No cambian, porque los impuestos solo afectan a las fábricas'], correcta: 0,
        pista: '<p>Piensa en lo que le pasa a un producto cuando le ponen un impuesto encima.</p>',
        solucion: '<p><strong>Suben.</strong> El proteccionismo protege a las industrias nacionales de la competencia extranjera, pero significa que los consumidores deben pagar más por las importaciones.' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la diferencia entre lo que un país exporta y lo que importa en un año?</p>',
        respuestas: ['balanza comercial', 'la balanza comercial'],
        pista: '<p>Son dos palabras: la primera es lo que se compara y la segunda dice en qué se mide.</p>',
        solucion: '<p>La <strong>balanza comercial</strong>: la diferencia entre las exportaciones y las importaciones de un país en un tiempo determinado.' },
      { tipo: 'ordenar', enunciado: '<p>Ordena lo que pasa cuando el tipo de cambio de un país sube.</p>',
        respuesta: ['El precio de la moneda extranjera sube en el país', 'Las importaciones se encarecen para quien compra dentro', 'Las exportaciones se abaratan para los compradores extranjeros', 'Los extranjeros compran más y las exportaciones del país crecen'],
        pista: '<p>Empieza por el precio y termina por el resultado.</p>',
        solucion: '<p>Primero sube el precio de la moneda extranjera, después las importaciones se encarecen, luego las exportaciones se abaratan para el extranjero y, por último, los extranjeros compran más y las exportaciones del país crecen.' },
    ],
    fuentes: [CORE18, CORE15, CONDUSEF_MONEDA, WIKI_COMERCIO, WIKI_TASA],
  });
})();
