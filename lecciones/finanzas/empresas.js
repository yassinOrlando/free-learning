// Finanzas y economía · Unidad 4: Empresas.
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
      txt(i + 0.5, v + max * 0.05, String(v).replace('.', ',') + sufijo),
    ]);
    return G({ x: [0, n], y: [-max * 0.12, max * 1.1], pasos: [1e9, paso], nombres: false, figuras, descripcion });
  }

  // ---- Fuentes ----
  const CORE7 = { nombre: 'CORE Econ (en español), La Economía, Capítulo 7: La empresa y sus clientes', url: 'https://books.core-econ.org/the-economy-v1/book/es/text/07.html' };
  const SERNAC = { nombre: 'SERNAC (Chile), Guía para el docente de educación financiera', url: 'https://www.sernac.cl/portal/607/articles-9171_archivo_01.pdf' };
  const CONDUSEF26 = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: Pequeñas, pero con grandes verdades (2026)', url: 'https://revista.condusef.gob.mx/inversion/pymes/2026/03/pequenas-pero-con-grandes-verdades/' };
  const CONDUSEF13 = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: Pequeñas grandes ideas (2013)', url: 'https://revista.condusef.gob.mx/inversion/pymes/2013/10/pequenas-grandes-ideas/' };
  const WIKI_EMPRESA = { nombre: 'Wikipedia (en español), Empresa (apoyo)', url: 'https://es.wikipedia.org/wiki/Empresa' };
  const WIKI_FACTORES = { nombre: 'Wikipedia (en español), Factores de producción (apoyo)', url: 'https://es.wikipedia.org/wiki/Factor_de_producci%C3%B3n' };
  const WIKI_INSUMO = { nombre: 'Wikipedia (en español), Insumo (apoyo)', url: 'https://es.wikipedia.org/wiki/Insumo' };
  const WIKI_ESTADOS = { nombre: 'Wikipedia (en español), Estados financieros (apoyo)', url: 'https://es.wikipedia.org/wiki/Estado_financiero' };
  const WIKI_CUENTA = { nombre: 'Wikipedia (en español), Cuenta de resultados (apoyo)', url: 'https://es.wikipedia.org/wiki/Cuenta_de_resultados' };
  const WIKI_ACTIVO = { nombre: 'Wikipedia (en español), Activo (contabilidad) (apoyo)', url: 'https://es.wikipedia.org/wiki/Activo_(contabilidad)' };
  const WIKI_PASIVO = { nombre: 'Wikipedia (en español), Pasivo (contabilidad) (apoyo)', url: 'https://es.wikipedia.org/wiki/Pasivo_(contabilidad)' };
  const WIKI_PATRIMONIO = { nombre: 'Wikipedia (en español), Patrimonio neto (apoyo)', url: 'https://es.wikipedia.org/wiki/Patrimonio_neto' };
  const WIKI_COSTE_FIJO = { nombre: 'Wikipedia (en español), Coste fijo (apoyo)', url: 'https://es.wikipedia.org/wiki/Costo_fijo' };
  const WIKI_PUNTO_MUERTO = { nombre: 'Wikipedia (en español), Punto muerto (economía) (apoyo)', url: 'https://es.wikipedia.org/wiki/Punto_muerto_(econom%C3%ADa)' };

  // ------------------------------------------------------------------
  const FLUJO_EMPRESAS = diagrama([0, 20], [0, 13], [
    caja(0.6, 1.0, 6.2, 3.8), txt(3.4, 3.1, 'Familias'), txt(3.4, 2.2, 'dan su trabajo'),
    caja(13.8, 1.0, 19.4, 3.8), txt(16.6, 3.1, 'Empresas'), txt(16.6, 2.2, 'hacen productos'),
    caja(7.0, 9.2, 13.0, 12.0), txt(10.0, 11.3, 'El Estado'), txt(10.0, 10.4, 'presta servicios'),
    ...flecha([6.55, 3.2], [13.45, 3.2], 0, 2), txt(10.0, 3.7, 'trabajo'),
    ...flecha([13.45, 2.2], [6.55, 2.2], 1, 2), txt(10.0, 1.3, 'productos'),
    ...flecha([16.6, 3.8], [11.2, 9.2], 0, 2), txt(16.2, 6.4, 'impuestos'),
  ], 'Diagrama con tres cajas y flechas que forman un círculo. Abajo a la izquierda está la caja «Familias», que dan su trabajo. Abajo a la derecha está la caja «Empresas», que hacen productos. Arriba en el centro está la caja «El Estado», que presta servicios. Una flecha va de las familias a las empresas y dice «trabajo». Otra flecha va de las empresas a las familias y dice «productos». Una tercera flecha sale de las empresas hacia el Estado y dice «impuestos».');

  L('Qué es una empresa', {
    objetivo: 'Entender qué distingue a una empresa de un puesto cualquiera, qué compra una empresa para producir y cómo se relacionan las familias, las empresas y el Estado en una economía.',
    explicacion: `
      <p>En tu ciudad hay una panadería, un taller y una tienda. Los tres compran cosas, los tres pagan a alguien y los tres venden. Y sin embargo no son lo mismo que un puesto improvisado en la acera: hay algo que los organiza y los hace empresa. Aquí vas a ver qué es eso, qué compra una empresa para producir y cómo se acomodan las familias, las empresas y el Estado en una economía.</p>
      <h3>Una empresa combina medios para vender</h3>
      <p>Una <strong>empresa</strong> (<span lang="en">business</span>) es una organización que combina medios para producir algo y venderlo. Wikipedia en español la describe como un conjunto de elementos humanos, técnicos y financieros, organizados según una jerarquía. Fíjate en esas tres palabras: humanos (quien trabaja), técnicos (las máquinas) y financieros (el dinero). No hace falta que sea una fábrica gigante: un puesto de jugos en la esquina también es empresa, porque combina un lugar, un trabajo y dinero para vender algo.</p>
      <p>Como en "Ingresos y gastos", lo que entra son los ingresos. Lo que sale también se anota, pero aquí se llama costo, porque ese dinero se gasta en producir y vender, no en vivir.</p>
      <p>Las empresas van desde un puesto de una persona hasta una fábrica. Según el INEGI (México, 2013), la diferencia entre una micro, una pequeña y una mediana empresa está sobre todo en el número de personas que la componen. Revisa el dato vigente en tu país.</p>
      <h3>Los tres actores de la economía</h3>
      <p>En una economía hay tres actores, como explica la guía del SERNAC: las familias, las empresas y el Estado. Cada uno recibe el dinero de una manera y lo gasta de otra.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Actor</th><th>De dónde viene su dinero</th><th>En qué lo gasta</th><th>Qué pone en la economía</th></tr>
        <tr><td>Las familias</td><td>Del sueldo o de lo que venden</td><td>En comida, transporte y cosas del hogar</td><td>Su trabajo</td></tr>
        <tr><td>Las empresas</td><td>De la venta de bienes y servicios</td><td>En insumos, sueldos e impuestos</td><td>Productos y servicios</td></tr>
        <tr><td>El Estado</td><td>De los impuestos</td><td>En servicios públicos</td><td>Escuelas y hospitales</td></tr>
      </table></div>
      <p>El dinero de las familias entra como sueldo y sale como comida y transporte. El de las empresas entra como venta y sale como compra de insumos, sueldos e impuestos. El del Estado entra como impuestos y sale como servicios públicos, como viste en "Impuestos y gasto público".</p>
      ${FLUJO_EMPRESAS}
      <p>Fíjate en el diagrama: el dinero no se queda quieto, circula. Las familias dan su trabajo a las empresas, las empresas devuelven productos y una parte va al Estado en impuestos.</p>
      <h3>Qué compra una empresa: los insumos</h3>
      <p>Para producir, una empresa tiene que comprar. Lo que compra se llama <strong>insumo</strong> (<span lang="en">input</span>): la harina de la panadería, el azúcar del puesto de jugos, las herramientas del taller. Wikipedia en español dice que los insumos se transforman para formar parte del producto final: la harina deja de ser harina y pasa a ser pan.</p>
      <p>Los insumos se agrupan en tres grandes tipos, y a cada tipo se le llama <strong>factor de producción</strong> (<span lang="en">factor of production</span>): el trabajo de la gente, el capital (las máquinas y el dinero para comprarlas) y la tierra (el local o el terreno). Una panadería necesita los tres: panaderos que horneen, un horno y un local pagado.</p>
      <h3>El detalle que importa</h3>
      <p>Aquí está lo que separa a una empresa de un puesto cualquiera: si no sabe cuánto le cuestan sus insumos, no sabe si está ganando o perdiendo dinero, aunque tenga la caja llena de ventas. Puedes tener el mostrador lleno de clientes y perder dinero en cada pan que vendes. Y como el dinero tiene usos enfrentados, cada peso gastado en una cosa es un peso que no se gasta en otra, como viste en "Escasez y costo de oportunidad". Por eso toda empresa lleva la cuenta de cuánto entra, cuánto sale y qué queda. De eso se ocupan las dos lecciones siguientes.</p>`,
    ejemplo: `
      <p>La panadería de la calle vende $10 000 en pan durante el mes (cifras de ejemplo). Compra $4 000 de insumos, paga $3 000 de sueldos y $1 500 de alquiler. ¿Cuánto le queda antes de impuestos?</p>
      <ol class="pasos-ej">
        <li>Primero, lo que entra: $10 000.</li>
        <li>Segundo, lo que sale por producir: 4 000 + 3 000 + 1 500 = $8 500.</li>
        <li>Tercero, la diferencia: 10 000 − 8 500 = $1 500. Ese es lo que le queda antes de impuestos.</li>
        <li>Cuarto, si paga $300 de impuestos, al final del mes le quedan $1 200.</li>
        <li>Quinto, comprueba: 4 000 + 3 000 + 1 500 + 300 + 1 200 = $10 000. Todo el dinero está explicado.</li>
        <li>Sexto, mira lo que puede pasar: si el mes siguiente vende $12 000 y los insumos suben a $6 500, entonces 12 000 − (6 500 + 3 000 + 1 500) = $1 000. Vendió más y ganó menos.</li>
      </ol>
      <p>Resultado: <span class="resultado">$1 500 antes de impuestos y $1 200 después</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que vendiendo más se gana más: en el último paso vendió $2 000 más y se quedó con $500 menos.</p>`,
    vidaReal: `
      <p>Saber qué hace una empresa te sirve todos los días:</p>
      <ul>
        <li>Cuando compras pan, una parte de tu dinero paga los ingredientes y otra paga el sueldo de quien lo horneó.</li>
        <li>Si el puesto de jugos de tu barrio baja de precio, sabes que puede estar vendiendo por debajo de lo que le cuesta.</li>
        <li>Entiendes por qué un negocio nuevo necesita menos plata para arrancar que uno grande.</li>
        <li>Cuando lees que una empresa cerró, entiendes que no solo perdió ventas: también dejó de pagar lo que le costaba seguir abierta.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una panadería compra $2 500 de insumos y paga $1 800 de sueldos y $900 de alquiler. ¿Cuánto sale en total?</p>', respuesta: 2500 + 1800 + 900,
        pista: '<p>Suma los tres pagos: los insumos, los sueldos y el alquiler.</p>',
        solucion: '<p>2 500 + 1 800 + 900 = <strong>$5 200</strong>. Eso es lo que la panadería gasta en el mes para poder producir.</p>' },
      { tipo: 'numero', enunciado: '<p>Esa panadería vendió $7 000 en pan y le salieron $5 200 en costos. ¿Cuánto le queda antes de impuestos?</p>', respuesta: 7000 - 5200,
        pista: '<p>Resta lo que salió de lo que entró.</p>',
        solucion: '<p>7 000 − 5 200 = <strong>$1 800</strong>. Antes de impuestos, ese mes la panadería ganó $1 800.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas cosas es un insumo de la panadería?</p>',
        opciones: ['La harina y la mantequilla que compra', 'Los clientes que compran pan', 'El dinero que gana el dueño'], correcta: 0,
        pista: '<p>Busca lo que la empresa compra para poder producir.</p>',
        solucion: '<p><strong>La harina y la mantequilla.</strong> Son insumos porque la empresa las compra y luego las transforma en pan. Los clientes compran el producto final y el dueño no compra nada.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una empresa vende $10 000 en un mes y tiene $10 500 de costos. ¿Qué le pasa?</p>',
        opciones: ['Gana $500', 'Pierde $500', 'Gana $10 500'], correcta: 1,
        pista: '<p>Calcula la diferencia entre lo que entró y lo que salió.</p>',
        solucion: '<p>10 000 − 10 500 = −500, así que <strong>pierde $500</strong>. Vendió bastante y aun así el mes cerró en rojo.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama cada uno de los tres grandes tipos de recurso que usa una empresa para producir, como el trabajo de la gente o las máquinas?</p>',
        respuestas: ['factor de produccion', 'el factor de produccion', 'factores de produccion', 'los factores de produccion'],
        pista: '<p>Son dos palabras: la primera dice qué son y la segunda que se usan para producir.</p>',
        solucion: '<p>El <strong>factor de producción</strong>: el trabajo, el capital (máquinas y dinero) y la tierra. Cada insumo pertenece a uno de esos tres tipos.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena lo que hace una empresa para poder ganar dinero.</p>',
        respuesta: ['Compra insumos para poder producir', 'Paga el trabajo de la gente y el alquiler', 'Vende lo que produce', 'Le queda la utilidad, que es el dinero que se queda en el negocio'],
        pista: '<p>Empieza por lo que compra y termina por lo que le queda.</p>',
        solucion: '<p>Primero compra insumos para producir, después paga el trabajo y el alquiler, luego vende lo que produjo y, por último, se queda con la utilidad.</p>' },
    ],
    fuentes: [CORE7, SERNAC, CONDUSEF26, CONDUSEF13, WIKI_EMPRESA, WIKI_FACTORES, WIKI_INSUMO],
  });

  // ------------------------------------------------------------------
  const MESES = barras({
    etiquetas: ['ingresos A', 'costos A', 'ingresos B', 'costos B'],
    valores: [10, 11, 8, 9.8], max: 12, paso: 3, sufijo: ' mil',
    descripcion: 'Gráfica de barras con cuatro barras que comparan los ingresos y los costos de dos meses de un puesto de jugos. Las cifras están en miles de dólares. En el mes A, el de 1 000 vasos, los ingresos son 10 mil y los costos 11 mil. En el mes B, el de 800 vasos, los ingresos son 8 mil y los costos 9,8 mil. En los dos meses la barra de costos queda por encima de la de ingresos, así que los dos meses cerraron en rojo. Las cifras son de ejemplo.',
  });

  L('Ingresos, costos y utilidad', {
    objetivo: 'Distinguir los ingresos, los costos y la utilidad de una empresa, separar los costos fijos de los variables y entender por qué vender mucho no siempre significa ganar dinero.',
    explicacion: `
      <p>En la esquina de tu barrio hay dos puestos de jugos. Al terminar el mes, el que vendió más está en números rojos. ¿Cómo es posible que vender mucho no baste? La respuesta está en una resta y en dos clases de costos. Vamos a seguir a uno de esos puestos dos meses: en el mes A vendió 1 000 vasos y en el mes B, 800. Los dos meses cerraron en rojo.</p>
      <h3>Del gasto de la casa al costo del negocio</h3>
      <p>Ya viste en "Ingresos y gastos" que en una casa el dinero que entra se llama ingreso y el que sale se llama gasto. En una empresa el <strong>ingreso</strong> (<span lang="en">revenue</span>) es la misma palabra con otro sentido: es todo el dinero que entra por vender. Y lo que sale ya no se llama gasto, sino <strong>costo</strong> (<span lang="en">cost</span>), porque no se gasta en vivir sino en producir y vender. Lo que queda al final es la <strong>utilidad</strong> (<span lang="en">profit</span>).</p>
      <p><strong>utilidad = ingresos − costos</strong></p>
      <p>Se lee "la utilidad es lo que entra menos lo que sale". CORE Econ lo dice con otras palabras: los beneficios de una empresa son la diferencia entre los ingresos por venta y los costos de producción. Si esa diferencia da negativo, la empresa perdió dinero en ese periodo.</p>
      <h3>Dos clases de costos</h3>
      <p>Lo que esconde esa resta son dos cosas muy distintas. Hay costos fijos, que la empresa paga los tenga o no: el alquiler del local, el sueldo del encargado, los intereses del préstamo. Wikipedia en español lo dice así: son los costos que la empresa debe pagar independientemente de su nivel de operación, es decir, produzca o no produzca debe pagarlos. Y hay costos variables, que suben y bajan con lo que vendes: la fruta, el azúcar, los vasos y las servilletas.</p>
      <p>La diferencia importa muchísimo. Si el puesto de jugos vende 1 000 vasos o 800, el alquiler sigue siendo el mismo. Cada vaso extra que vendes tapa una parte de ese alquiler fijo, y por eso a veces vender más salva el mes. Pero los costos fijos no bajan por vender más, y esa es la trampa.</p>
      <h3>Por qué vender mucho no alcanza</h3>
      <p>Los ingresos los decide el mercado, no tú: el precio lo marcan los clientes y la competencia, como viste en "Oferta y demanda". Los costos fijos dependen de las decisiones del negocio, y cuando son demasiado altos, vender mucho no alcanza. La CONDUSEF lo resume: tener muchas ventas no siempre significa que un negocio esté ganando dinero, porque la rentabilidad depende no solo de cuánto se vende, sino de los costos de producción, operación y financiamiento.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Concepto</th><th>Mes A (1 000 vasos)</th><th>Mes B (800 vasos)</th></tr>
        <tr><td>Ingresos (vasos × $10)</td><td>$10 000</td><td>$8 000</td></tr>
        <tr><td>Costos variables ($6 por vaso)</td><td>$6 000</td><td>$4 800</td></tr>
        <tr><td>Costos fijos (alquiler y sueldos)</td><td>$5 000</td><td>$5 000</td></tr>
        <tr><td>Total de costos</td><td>$11 000</td><td>$9 800</td></tr>
        <tr><td>Utilidad</td><td>−$1 000</td><td>−$1 800</td></tr>
      </table></div>
      ${MESES}
      <p>Fíjate en la gráfica: cada mes tiene dos barras, la de ingresos y la de costos, y las cifras están en miles de dólares. En los dos meses la de costos queda más arriba, y esa diferencia es la pérdida. Pero en el mes A la diferencia es de $1 000 y en el mes B de $1 800: vender más tapó parte de los costos fijos.</p>
      <p>En el puesto de jugos del ejemplo, cada vaso se vende a $10 y le cuesta $6 en fruta, azúcar y vasos, así que de cada venta quedan $4 para tapar los $5 000 de costos fijos del mes. Esa parte de $4 es el 40% del precio, y los porcentajes son la manera de comparar negocios distintos, como viste en "Porcentajes".</p>
      <p class="nota"><strong>Trampa común:</strong> creer que en un mal mes basta con «no abrir». El alquiler llega igual, te llames como te llames el mes.</p>`,
    ejemplo: `
      <p>El puesto de jugos de la esquina vende un vaso a $10 y cada vaso le cuesta $6. Los costos fijos del mes son $5 000. Las cifras son de ejemplo. ¿Cómo le fue en cada mes?</p>
      <ol class="pasos-ej">
        <li>Mes A (1 000 vasos): ingresos 1 000 × 10 = $10 000; variables 1 000 × 6 = $6 000; fijos $5 000. Total de costos: $11 000.</li>
        <li>La utilidad es 10 000 − 11 000 = −$1 000: perdió $1 000.</li>
        <li>Mes B (800 vasos): ingresos 800 × 10 = $8 000; variables 800 × 6 = $4 800; fijos $5 000. Total: $9 800.</li>
        <li>La utilidad es 8 000 − 9 800 = −$1 800: perdió más.</li>
        <li>El mes que vendió más perdió menos: cada vaso tapó $4 de costos fijos (10 − 6 = 4). Los dos meses cerraron en rojo: el problema son los $5 000 fijos, no las ventas.</li>
      </ol>
      <p>Resultado: <span class="resultado">−$1 000 en el mes A y −$1 800 en el mes B</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que el mes con más ventas fue el peor: vendió 200 vasos más y perdió $800 menos.</p>`,
    vidaReal: `
      <p>Estas dos ideas explican por qué unos negocios viven y otros no:</p>
      <ul>
        <li>Cuando oyes que un negocio «va bien», no solo importó cuánto vendió: importó cuánto le costaron las ventas.</li>
        <li>Entiendes por qué un café con un alquiler altísimo necesita vender mucho más para sobrevivir.</li>
        <li>Cuando sube el precio de la fruta, sabes que cada vaso te cuesta más.</li>
        <li>Si ves un negocio con precios muy altos, puedes pensar si no estará cubriendo gastos que no puede bajar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un puesto de jugos vende 600 vasos en el mes a $8 cada uno. Cada vaso le cuesta $5 en insumos y los costos fijos del mes son $1 500. ¿Cuál fue su utilidad?</p>', respuesta: 600 * 8 - (600 * 5 + 1500),
        pista: '<p>Primero calcula los ingresos por un lado y los costos por otro, y al final resta.</p>',
        solucion: '<p>Ingresos: 600 × 8 = 4 800. Costos: 600 × 5 = 3 000, más 1 500 fijos, o sea 4 500. La utilidad es 4 800 − 4 500 = <strong>$300</strong>.' },
      { tipo: 'numero', enunciado: '<p>En el mes B el puesto vendió 800 vasos y cada uno le costó $6 en insumos. ¿Cuánto gastó en insumos ese mes?</p>', respuesta: 800 * 6,
        pista: '<p>Es el costo variable: multiplica los vasos vendidos por lo que cuesta cada uno.</p>',
        solucion: '<p>800 × 6 = <strong>$4 800</strong> en insumos. Esa cifra sube y baja con las ventas, a diferencia de los costos fijos.' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos es un costo fijo?</p>',
        opciones: ['El alquiler del local', 'La fruta que se compra cada día', 'Los vasos de plástico'], correcta: 0,
        pista: '<p>Busca el gasto que hay que pagar aunque no se venda nada.</p>',
        solucion: '<p><strong>El alquiler del local.</strong> Se paga produzca o no produzca. La fruta y los vasos solo se compran para lo que se vende, así que son costos variables.' },
      { tipo: 'opciones', enunciado: '<p>Un negocio tuvo $15 000 de ingresos y $16 200 de costos en el mes. ¿Qué ocurrió?</p>',
        opciones: ['Ganó $1 200', 'Perdió $1 200', 'Perdió $16 200'], correcta: 1,
        pista: '<p>Resta los costos a los ingresos y fíjate en el signo del resultado.</p>',
        solucion: '<p>15 000 − 16 200 = −1 200, así que <strong>perdió $1 200</strong>. Vendió bastante y aun así el mes cerró en rojo, porque los costos fueron mayores que los ingresos.' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama lo que queda al restar los costos a los ingresos?</p>',
        respuestas: ['utilidad', 'la utilidad', 'utilidad neta', 'beneficio', 'el beneficio', 'ganancia', 'la ganancia'],
        pista: '<p>Es una palabra que también se usa para la ganancia que deja un negocio al final del año.</p>',
        solucion: '<p>La <strong>utilidad</strong>: la diferencia entre los ingresos y los costos. Si sale negativa, hay pérdida.' },
      { tipo: 'ordenar', enunciado: '<p>Ordena lo que pasa en un mes de un puesto de jugos.</p>',
        respuesta: ['Los clientes pagan los vasos y entran los ingresos', 'Se compra la fruta y el azúcar: son los costos variables', 'Se paga el alquiler del local: es un costo fijo', 'Se restan los costos a los ingresos', 'Lo que queda es la utilidad, o una pérdida si el resultado es negativo'],
        pista: '<p>Empieza por el dinero que entra y termina por el que queda.</p>',
        solucion: '<p>Primero entran los ingresos por las ventas, después se pagan los costos variables y los fijos, luego se restan los costos a los ingresos y, por último, lo que queda es la utilidad o, si el resultado es negativo, una pérdida.' },
    ],
    fuentes: [CORE7, CONDUSEF26, WIKI_COSTE_FIJO],
  });

  // ------------------------------------------------------------------
  const BALANZA = diagrama([0, 24], [0, 12], [
    { tipo: 'linea', desde: [4.7, 9.0], hasta: [4.7, 7.3] },
    { tipo: 'linea', desde: [3.1, 7.0], hasta: [6.3, 7.0] },
    { tipo: 'linea', desde: [3.1, 7.0], hasta: [4.7, 7.4] },
    { tipo: 'linea', desde: [6.3, 7.0], hasta: [4.7, 7.4] },
    { tipo: 'linea', desde: [19.3, 9.0], hasta: [19.3, 7.3] },
    { tipo: 'linea', desde: [17.7, 7.0], hasta: [20.9, 7.0] },
    { tipo: 'linea', desde: [17.7, 7.0], hasta: [19.3, 7.4] },
    { tipo: 'linea', desde: [20.9, 7.0], hasta: [19.3, 7.4] },
    { tipo: 'linea', desde: [3.5, 9.0], hasta: [20.5, 9.0] },
    { tipo: 'poligono', puntos: [[11.2, 3.8], [12.8, 3.8], [12.0, 8.9]], relleno: true },
    caja(0.4, 1.0, 10.0, 6.6),
    caja(14.0, 1.0, 23.6, 6.6),
    txt(5.2, 5.9, 'Activo'), txt(5.2, 4.7, 'equipos 12 000'), txt(5.2, 3.6, 'mercadería 5 000'),
    txt(5.2, 2.5, 'caja 3 000'), txt(5.2, 1.4, 'total 20 000'),
    txt(18.8, 5.4, 'Pasivo y patrimonio'), txt(18.8, 4.2, 'préstamo 8 000'), txt(18.8, 3.0, 'dueños 12 000'),
    txt(18.8, 1.8, 'total 20 000'),
  ], 'Diagrama de una balanza en equilibrio. Una barra horizontal sostiene dos platillos, y en el centro un triángulo hace de fulcro. En el platillo de la izquierda hay una caja con el rótulo «Activo» y cuatro líneas: «equipos 12 000», «mercadería 5 000», «caja 3 000» y «total 20 000». En el platillo de la derecha hay una caja con el rótulo «Pasivo y patrimonio» y tres líneas: «préstamo 8 000», «dueños 12 000» y «total 20 000». Los dos platillos están a la misma altura, porque los dos lados suman lo mismo.');

  L('Estados financieros básicos', {
    objetivo: 'Saber qué es un estado financiero, distinguir el balance, la cuenta de resultados y el flujo de caja, y comprobar la regla que hace que un balance siempre cuadre.',
    explicacion: `
      <p>La panadería de la lección 1 abre sus puertas, y sus dueños quieren dejar por escrito con qué empiezan: tienen una caja con dinero, deben una parte al banco y el resto lo pusieron ellos. Ese primer papel es el balance de apertura. Un año después, cuando cierren el año, alguien les va a pedir las cuentas: ¿cómo se anota todo eso en un papel que cualquier banco entienda? Para eso existen los estados financieros.</p>
      <h3>Una foto del negocio</h3>
      <p>Un <strong>estado financiero</strong> (<span lang="en">financial statement</span>) es un resumen de cómo está un negocio en una fecha. Wikipedia en español los define como informes técnicos que muestran la situación económica, patrimonial y financiera de una empresa u organización. Hay varios: el balance, la cuenta de resultados y el flujo de caja. Cada uno responde a una pregunta distinta, y por eso se leen juntos.</p>
      <h3>El balance: qué tienes y qué debes</h3>
      <p>El <strong>balance</strong> (<span lang="en">balance sheet</span>) es la parte que dice qué tienes, qué debes y qué le pertenece a tus dueños en ese momento. Wikipedia en español lo llama también estado de situación patrimonial, y sus tres partidas tienen nombre:</p>
      <ul>
        <li>El activo son los recursos que la empresa controla y de los que espera obtener beneficios económicos: el horno, la mercadería y el dinero de la caja.</li>
        <li>El pasivo es el total de las deudas que la empresa tiene con terceros, documentadas o no: en nuestro caso, el préstamo del banco, que es dinero prestado, como viste en "Qué es un crédito".</li>
        <li>El <strong>patrimonio</strong> (<span lang="en">equity</span>) es lo que le queda a los dueños de la empresa: lo que puso cada uno más las utilidades que se han quedado en el negocio. Wikipedia en español lo define como la diferencia entre el activo y el pasivo.</li>
      </ul>
      <p>Y de esa definición sale la regla más útil de todas:</p>
      <p><strong>activo = pasivo + patrimonio</strong></p>
      <p>Se lee "lo que tienes es lo que le debes a los demás más lo que te pertenece a ti". Cada peso del activo tiene que estar en un lado o en el otro, y por eso el balance siempre cuadra.</p>
      ${BALANZA}
      <p>La balanza del diagrama está en equilibrio porque los dos lados suman lo mismo: 20 000 contra 20 000. Si el negocio pierde dinero, el lado de los dueños baja y la balanza se inclina.</p>
      <h3>La otra mitad: la cuenta de resultados y el flujo de caja</h3>
      <p>El balance dice cómo estás hoy, pero no cuenta lo que pasó durante el año. Para eso están la cuenta de resultados, que según Wikipedia en español permite calcular y explicar los beneficios o pérdidas de una empresa (la utilidad de la que hablaste en "Ingresos, costos y utilidad"), y el flujo de caja, que muestra los cambios en la situación de dinero. Esta tabla resume las tres cuentas:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Cuenta</th><th>Pregunta que responde</th><th>Dato de la panadería</th></tr>
        <tr><td>Balance</td><td>¿Qué tienes, qué debes y qué es de los dueños?</td><td>Al abrir: activo 20 000; pasivo 8 000; patrimonio 12 000</td></tr>
        <tr><td>Cuenta de resultados</td><td>¿Cuánto entró y cuánto salió en el año?</td><td>Ventas 120 000; costos 122 000; utilidad −2 000</td></tr>
        <tr><td>Flujo de caja</td><td>¿Entró y salió dinero de verdad?</td><td>Entraron 120 000 y salieron 122 000</td></tr>
      </table></div>
      <p>En este ejemplo las dos cifras coinciden porque todo se cobra y se paga al contado; en un negocio real puede vender hoy y cobrar el mes que viene.</p>
      <p>Una empresa que lleva un registro claro de ingresos, gastos y obligaciones tiene mucho mejor control de su salud, como dice la CONDUSEF. Y esa guía recuerda un detalle importante: hay que separar el dinero del negocio del dinero personal.</p>
      <p>Por eso el estado financiero no es un trámite. Es la manera de saber cómo está el negocio antes de que sea tarde, y en la siguiente lección vas a ver cómo se usa esa misma cuenta para saber cuánto hay que vender para no perder dinero.</p>`,
    ejemplo: `
      <p>La panadería abrió con $12 000 que pusieron sus dueños y un préstamo de $8 000 del banco. Las cifras son de ejemplo. ¿Cómo queda su balance?</p>
      <ol class="pasos-ej">
        <li>Activo: equipos $12 000, mercadería $5 000 y caja $3 000. Total: $20 000.</li>
        <li>Pasivo: el préstamo del banco, $8 000.</li>
        <li>Patrimonio: lo que pusieron los dueños, $12 000.</li>
        <li>Comprueba la regla: 20 000 = 8 000 + 12 000. El balance cuadra.</li>
        <li>Un año después, supongamos que cerró con $2 000 de pérdida (en el mes de la lección 1 le quedaban $1 200 después de impuestos, pero en otros meses perdió más). El patrimonio baja a 10 000, el pasivo sigue en 8 000 y el activo baja a 18 000.</li>
        <li>Comprueba otra vez: 18 000 = 8 000 + 10 000. El balance sigue cuadrando, aunque el negocio haya perdido dinero.</li>
      </ol>
      <p>Resultado: <span class="resultado">activo 20 000 = pasivo 8 000 + patrimonio 12 000</span>.</p>
      <p class="nota"><strong>Error común:</strong> dejar el activo igual cuando hay pérdida. Si el negocio pierde $2 000, el patrimonio baja $2 000 y el activo baja lo mismo.</p>`,
    vidaReal: `
      <p>Saber leer un balance te sirve aunque nunca abras una empresa:</p>
      <ul>
        <li>Cuando pides un préstamo, el banco mira exactamente estos números para saber si te puede devolver el dinero.</li>
        <li>Entiendes por qué un negocio con mucha caja pero con deudas grandes no está tranquilo.</li>
        <li>Cuando lees que una empresa «perdió $2 millones», sabes que eso no es lo mismo que tener menos dinero en la caja.</li>
        <li>Sabes qué preguntarle a un negocio que te quiere vender algo: qué debe y qué le pertenece a sus dueños.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una empresa tiene un activo de $24 000 y un pasivo de $9 000. ¿Cuánto vale su patrimonio?</p>', respuesta: 24000 - 9000,
        pista: '<p>El patrimonio es la diferencia entre el activo y el pasivo.</p>',
        solucion: '<p>24 000 − 9 000 = <strong>$15 000</strong> de patrimonio. Con eso el balance cuadra: 24 000 = 9 000 + 15 000.</p>' },
      { tipo: 'numero', enunciado: '<p>El activo de un negocio es $18 000 y su pasivo $8 000. Si el negocio pierde $2 000 en el año, ¿cuánto vale el activo al final?</p>', respuesta: 18000 - 2000,
        pista: '<p>Una pérdida hace bajar el activo, porque el dinero que se fue tenía que salir de algún lado.</p>',
        solucion: '<p>18 000 − 2 000 = <strong>$16 000</strong>. El patrimonio también baja a 8 000, y el balance sigue cuadrando: 16 000 = 8 000 + 8 000.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué cuenta responde a la pregunta «¿cuánto entró y cuánto salió durante el año?»?</p>',
        opciones: ['La cuenta de resultados', 'El balance', 'El inventario de la mercadería'], correcta: 0,
        pista: '<p>Una de las tres cuentas mira hacia atrás, al año que acaba de pasar.</p>',
        solucion: '<p><strong>La cuenta de resultados.</strong> El balance dice cómo estás hoy y el flujo de caja muestra el movimiento del dinero, pero las utilidades y pérdidas del año se calculan en la cuenta de resultados.' },
      { tipo: 'opciones', enunciado: '<p>En el balance de una empresa, el pasivo es...</p>',
        opciones: ['el dinero que hay en la caja', 'el total de las deudas con terceros', 'lo que le pertenece a los dueños'], correcta: 1,
        pista: '<p>Busca la partida que agrupa lo que la empresa le debe a alguien que no son sus dueños.</p>',
        solucion: '<p><strong>El total de las deudas con terceros</strong>, como el préstamo del banco. Lo que le pertenece a los dueños es el patrimonio, y el dinero en la caja es parte del activo.' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la parte del estado financiero que dice qué tienes, qué debes y qué le pertenece a los dueños?</p>',
        respuestas: ['balance', 'el balance', 'balance general', 'el balance general', 'balance sheet'],
        pista: '<p>Es una palabra de siete letras; en inglés se llama balance sheet.</p>',
        solucion: '<p>El <strong>balance</strong>, también llamado balance general o estado de situación patrimonial. Muestra el activo, el pasivo y el patrimonio en una fecha.' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para comprobar que un balance cuadra.</p>',
        respuesta: ['Miras el total del activo', 'Miras el total del pasivo', 'Miras el total del patrimonio', 'Compruebas que el activo sea igual al pasivo más el patrimonio'],
        pista: '<p>Empieza por el activo y termina comparando.</p>',
        solucion: '<p>Primero se mira el total del activo, luego el del pasivo y el del patrimonio, y al final se comprueba que el activo sea igual al pasivo más el patrimonio.' },
    ],
    fuentes: [WIKI_ESTADOS, WIKI_CUENTA, WIKI_ACTIVO, WIKI_PASIVO, WIKI_PATRIMONIO, CONDUSEF26, SERNAC],
  });

  // ------------------------------------------------------------------
  const EQUILIBRIO = diagrama([-5, 25], [-4, 22], [
    // Zonas: a la izquierda se pierde dinero, a la derecha se gana
    { tipo: 'poligono', puntos: [[0, 0], [12.5, 12.5], [0, 5]], relleno: true, serie: 1 },
    { tipo: 'poligono', puntos: [[12.5, 12.5], [20, 20], [20, 17]], relleno: true, serie: 0 },
    // Las dos rectas: ingresos y costos
    { tipo: 'linea', desde: [0, 0], hasta: [20, 20], serie: 0 },
    { tipo: 'linea', desde: [0, 5], hasta: [20, 17], serie: 1 },
    // Ejes
    { tipo: 'linea', desde: [0, 0], hasta: [20.8, 0] },
    { tipo: 'linea', desde: [0, 0], hasta: [0, 20.6] },
    // Marca del punto de equilibrio y su proyección en el eje
    { tipo: 'circulo', x: 12.5, y: 12.5, r: 0.35, serie: 0 },
    { tipo: 'linea', desde: [12.5, 12.5], hasta: [12.5, -1.7], punteada: true },
    { tipo: 'linea', desde: [11.6, 13.2], hasta: [12.3, 12.6] },
    // Marcas del eje de la cantidad vendida
    { tipo: 'linea', desde: [5, 0], hasta: [5, -0.5] },
    { tipo: 'linea', desde: [10, 0], hasta: [10, -0.5] },
    { tipo: 'linea', desde: [15, 0], hasta: [15, -0.5] },
    { tipo: 'linea', desde: [20, 0], hasta: [20, -0.5] },
    txt(0, -1.1, '0'), txt(5, -1.1, '500'), txt(10, -1.1, '1 000'), txt(15, -1.1, '1 500'), txt(20, -1.1, '2 000'),
    // Marcas del eje del dinero
    { tipo: 'linea', desde: [-0.5, 5], hasta: [0, 5] },
    { tipo: 'linea', desde: [-0.5, 10], hasta: [0, 10] },
    { tipo: 'linea', desde: [-0.5, 15], hasta: [0, 15] },
    { tipo: 'linea', desde: [-0.5, 20], hasta: [0, 20] },
    txt(-1.1, 5, '5'), txt(-1.1, 10, '10'), txt(-1.1, 15, '15'), txt(-1.1, 20, '20'),
    // Rótulos
    txt(6.5, 13.2, 'punto de equilibrio'),
    txt(22.3, 20.2, 'ingresos'),
    txt(22.3, 16.6, 'costos'),
    txt(6, -2.5, 'pérdida'),
    txt(16.5, -2.5, 'ganancia'),
    txt(0.8, 21.7, 'dinero (en miles de $)'),
    txt(10, -3.9, 'cantidad vendida (en vasos)'),
  ], 'Gráfica con dos rectas que se cruzan. El eje horizontal es la cantidad vendida, de 0 a 2 000 vasos, y el eje vertical es el dinero, de 0 a 20 mil. La recta de los ingresos sale del origen y sube hasta 20 mil en 2 000 vasos. La recta de los costos empieza en 5 mil, que son los costos fijos, y sube hasta 17 mil. Las dos rectas se cruzan en el punto de equilibrio: 1 250 vasos y 12 500. A la izquierda del cruce, la recta de los costos está arriba y el puesto pierde dinero; a la derecha, la de los ingresos está arriba y el puesto gana.');

  L('Punto de equilibrio', {
    objetivo: 'Calcular el punto de equilibrio de un negocio, entender qué significa margen y saber cuántas ventas hacen falta para no perder dinero.',
    explicacion: `
      <p>El puesto de jugos de la esquina paga un alquiler todos los meses, llueva o no. Ya viste en "Ingresos, costos y utilidad" que el mes A, con 1 000 vasos, cerró en números rojos. La pregunta del dueño es otra: ¿cuántos vasos hay que vender para no perder dinero?</p>
      <h3>El punto donde no pierdes ni ganas</h3>
      <p>La respuesta tiene nombre: se llama <strong>punto de equilibrio</strong> (<span lang="en">break-even point</span>), y es la cantidad que hay que vender para que los ingresos y los costos sean exactamente iguales. En ese punto la utilidad es cero: no ganas dinero, pero tampoco lo pierdes. Por debajo de esa cantidad, el negocio pierde dinero; por encima, la ganancia crece con cada venta.</p>
      <p><strong>ingresos = costos</strong></p>
      <p>Wikipedia en español lo llama también punto muerto, y dice que es el número mínimo de unidades que hay que vender para que el beneficio sea cero.</p>
      <h3>Cada venta deja un margen</h3>
      <p>Necesitas saber cuánto deja cada venta. Si el vaso se vende a $10 y le cuesta $6 en fruta, azúcar y vasos, de cada venta quedan $4. A esa parte se le llama <strong>margen</strong> (<span lang="en">margin</span>): lo que queda después de pagar lo que costó esa venta, y que sirve para tapar los gastos que no dependen de lo que vendes.</p>
      <p>Y esos gastos son los <strong>costos fijos</strong> (<span lang="en">fixed costs</span>): el alquiler, el sueldo del encargado, la licencia. Son los mismos que viste en "Ingresos, costos y utilidad", y se llaman fijos porque se pagan vendas mucho o vendas poco.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Lo que pasa con cada vaso</th><th>Dinero</th></tr>
        <tr><td>Lo que paga el cliente</td><td>$10</td></tr>
        <tr><td>Lo que cuesta el vaso (fruta, azúcar y vasos de plástico)</td><td>−$6</td></tr>
        <tr><td>El margen, que se queda para cubrir el alquiler</td><td>$4</td></tr>
      </table></div>
      <p>El margen son 4 de cada 10 pesos, el 40% del precio, y así se comparan negocios que venden cosas distintas, como viste en "Porcentajes". Y el precio no lo pones a tu gusto: lo marca el mercado, como viste en "Oferta y demanda".</p>
      <h3>El atajo para hallarlo</h3>
      <p>Con esos dos datos, el punto de equilibrio sale en una sola división: divide los costos fijos entre el margen de cada venta. Si cada vaso deja $4 y hay $5 000 de gastos fijos, hacen falta 5 000 ÷ 4 = 1 250 vasos para cubrirlos todos.</p>
      <p><strong>punto de equilibrio = costos fijos ÷ margen</strong></p>
      <p>Ojo con el orden: los costos fijos van arriba y el margen abajo. Y como el margen depende del precio, cambiar el precio mueve la frontera.</p>
      ${EQUILIBRIO}
      <h3>Qué pasa a cada lado de la frontera</h3>
      <p>En la gráfica, la recta de los ingresos sale del origen. La de los costos arranca en $5 000, porque los costos fijos se pagan aunque no se venda nada, y luego sube más despacio, $6 por vaso. Las dos se cruzan en el punto de equilibrio: 1 250 vasos y $12 500. A la izquierda del cruce los costos quedan más arriba y el puesto pierde; a la derecha, al revés.</p>
      <p>Comprueba con la cuenta: a 1 000 vasos, los que vendió el mes A, los ingresos son $10 000 y los costos $6 000 de insumos más $5 000 fijos, o sea $11 000: se pierden $1 000. A 1 500 vasos, los ingresos son $15 000 y los costos $14 000: se ganan $1 000. Todo sale del mismo margen de $4.</p>
      <p>El libro de CORE Econ lo llama curva de beneficio económico cero, y añade algo que parece raro pero es cierto: en las empresas grandes los costos fijos pesan menos en el costo de cada unidad. Por eso una empresa grande puede vender más barato y ganar igual: sus gastos fijos se reparten entre muchísimas ventas.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que el punto de equilibrio es siempre el mismo. Si suben el alquiler o el azúcar, la frontera se mueve: con $6 000 de costos fijos pasa a 1 500 vasos.</p>`,
    ejemplo: `
      <p>El puesto vende el vaso a $10, cada vaso le cuesta $6 y los costos fijos del mes son $5 000. Las cifras son de ejemplo. ¿Cuántos vasos necesita para no perder dinero?</p>
      <ol class="pasos-ej">
        <li>El margen de cada vaso: el precio menos lo que cuesta, 10 − 6 = $4.</li>
        <li>Los costos fijos que hay que cubrir: $5 000 entre el alquiler y los sueldos.</li>
        <li>El punto de equilibrio sale de dividir: 5 000 ÷ 4 = 1 250 vasos.</li>
        <li>Comprueba con 1 000 vasos: ingresos $10 000; costos $6 000 más $5 000 fijos, o sea $11 000. La utilidad es −$1 000, el número rojo del mes A.</li>
        <li>Comprueba con 1 500 vasos: ingresos $15 000 y costos $14 000, así que la utilidad es $1 000.</li>
        <li>Y en el punto exacto, 1 250 vasos: ingresos $12 500 y costos $12 500. Los dos números coinciden.</li>
      </ol>
      <p>Resultado: <span class="resultado">1 250 vasos</span>.</p>
      <p class="nota"><strong>Error común:</strong> dividir $5 000 entre $10 en lugar de entre $4. Da 500 vasos, y con eso los costos variables se comen casi todo el dinero.</p>`,
    vidaReal: `
      <p>Saber dónde está la frontera te sirve en muchos sitios:</p>
      <ul>
        <li>Cuando un negocio dice que necesita «un mínimo de clientes para abrir», ese mínimo es su punto de equilibrio.</li>
        <li>Te sirve para calcular si un precio te deja ganancia: divides lo que tienes que pagar entre lo que deja cada venta.</li>
        <li>Cuando el alquiler o la materia prima suben, la frontera se mueve y hay que vender más.</li>
        <li>Entiendes por qué una panadería que vende por debajo de sus costos no se salva ni con muchísimos clientes.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un puesto de jugos tiene $4 500 de costos fijos y cada vaso deja $3 de margen. ¿Cuántos vasos necesita vender para no perder dinero?</p>', respuesta: 4500 / 3,
        pista: '<p>Divide los costos fijos entre el margen de cada vaso.</p>',
        solucion: '<p>4 500 ÷ 3 = <strong>1 500 vasos</strong>. A partir de ahí, cada vaso vendido deja $3 para cubrir los costos fijos y el puesto ya no pierde.</p>' },
      { tipo: 'numero', enunciado: '<p>El punto de equilibrio del puesto de jugos es 1 250 vasos y cada vaso deja $4 de margen. Si vende 1 600 vasos, ¿cuánta utilidad obtiene?</p>', respuesta: (1600 - 1250) * 4,
        pista: '<p>Primero calcula cuántos vasos vende por encima del punto de equilibrio y luego multiplica por el margen.</p>',
        solucion: '<p>Por encima del punto de equilibrio están 1 600 − 1 250 = 350 vasos, y cada uno deja $4: 350 × 4 = <strong>$1 400</strong> de utilidad.</p>' },
      { tipo: 'opciones', enunciado: '<p>El puesto de jugos vende 1 000 vasos y pierde $1 000. ¿Cuántos vasos más necesita vender para llegar al punto de equilibrio?</p>',
        opciones: ['125 vasos', '250 vasos', '1 000 vasos'], correcta: 1,
        pista: '<p>Resta los vasos que ya vendió a los que necesita en total.</p>',
        solucion: '<p>El punto de equilibrio son 1 250 vasos, así que faltan 1 250 − 1 000 = <strong>250 vasos</strong>. Cada uno de esos 250 vasos deja $4, y con eso los $1 000 de pérdida quedan tapados.</p>' },
      { tipo: 'opciones', enunciado: '<p>Si los costos fijos suben de $5 000 a $6 000 y el margen sigue siendo de $4 por vaso, ¿qué pasa con el punto de equilibrio?</p>',
        opciones: ['Sube a 1 500 vasos', 'Baja a 1 000 vasos', 'No cambia'], correcta: 0,
        pista: '<p>Vuelve a dividir los costos fijos, ahora más grandes, entre el mismo margen.</p>',
        solucion: '<p>6 000 ÷ 4 = <strong>1 500 vasos</strong>. Cuando suben los costos fijos, hay que vender más para no perder: la frontera se mueve hacia la derecha.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la cantidad que hay que vender para que los ingresos sean iguales a los costos?</p>',
        respuestas: ['punto de equilibrio', 'el punto de equilibrio', 'punto muerto', 'el punto muerto', 'break even point', 'break-even point'],
        pista: '<p>Son dos palabras: la primera dice que es un punto y la segunda que en él no pierdes ni ganas.</p>',
        solucion: '<p>El <strong>punto de equilibrio</strong>, también llamado punto muerto. En inglés se dice break-even point.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para calcular el punto de equilibrio de un negocio.</p>',
        respuesta: ['Calcula el margen de cada venta: el precio menos el costo variable', 'Suma los costos fijos del mes', 'Divide los costos fijos entre el margen de cada venta', 'Comprueba con la cuenta cuánto entra y cuánto sale a esa cantidad'],
        pista: '<p>Empieza por lo que deja cada venta y termina comprobando el resultado.</p>',
        solucion: '<p>Primero se calcula el margen de cada venta, luego se suman los costos fijos del mes, después se dividen los costos fijos entre el margen y, por último, se comprueba con la cuenta cuánto entra y cuánto sale.</p>' },
    ],
    fuentes: [CORE7, WIKI_PUNTO_MUERTO, WIKI_COSTE_FIJO],
  });

  // ------------------------------------------------------------------
  const FRANJA = diagrama([0, 20], [0, 9], [
    // La escala de precios
    { tipo: 'linea', desde: [2, 3.8], hasta: [18, 3.8] },
    // La franja que va del suelo al techo
    { tipo: 'poligono', puntos: [[8, 3.4], [12, 3.4], [12, 4.2], [8, 4.2]], relleno: true, serie: 0 },
    // El precio elegido, dentro de la franja
    ...flecha([10, 6.9], [10, 4.5], 0, 1.2),
    txt(10, 7.6, 'precio elegido: $11'),
    txt(6.6, 2.6, 'suelo: $10'),
    txt(13.4, 2.6, 'techo: $12'),
    txt(3, 5.3, 'más barato'),
    txt(17, 5.3, 'más caro'),
    txt(3.8, 1.2, 'por debajo: pérdida'),
    txt(16, 1.2, 'por encima: se va'),
  ], 'Diagrama de una franja de precios posibles. En el centro hay una barra que va del suelo al techo: en su extremo izquierdo está el suelo, de 10 pesos, y en el extremo derecho el techo, de 12 pesos. Una flecha hacia abajo señala en el centro el precio elegido, de 11 pesos, que está dentro de la franja. A la izquierda de la franja se lee «por debajo: pérdida» y a la derecha «por encima: se va», o sea, el cliente se marcha a otro puesto.');

  L('Cómo fijar un precio de venta', {
    objetivo: 'Entender cómo se decide el precio de venta de un producto, con un suelo que depende de los costos y un techo que depende de la demanda, y revisar el precio cuando los costos cambian.',
    explicacion: `
      <p>Dos puestos de jugos en la misma esquina. Uno cobra $10 y el otro $12. El de $10 vive de los clientes que pasan y el de $12 no. En la unidad 1 te dijimos que el precio lo define la oferta y la demanda, y también lo que cuesta producir. Esta lección cumple esa promesa: el precio no sale de un solo lado, se decide entre dos límites.</p>
      <h3>El precio tiene un suelo y un techo</h3>
      <p>El <strong>precio de venta</strong> (<span lang="en">selling price</span>) es lo que cobra el cliente por su producto. Ese precio no se elige en el aire: tiene un suelo y un techo. El suelo es el <strong>precio mínimo</strong>, el precio más bajo al que, vendiendo lo que alcanzas a vender, todavía no se pierde dinero. El techo es lo más que el mercado está dispuesto a pagar. Entre los dos límites decide el dueño, y esa decisión hay que revisarla.</p>
      <p>El suelo tiene un nombre que ya usaste: el punto de equilibrio. Como viste en "Punto de equilibrio", en ese punto los ingresos cubren exactamente los costos. Y hay un detalle que importa: el suelo no es un número fijo, porque depende de cuántos vasos alcanzas a vender. Para este puesto, que en un buen mes vende 1 250 vasos, el suelo es $10; si bajara a $8, el margen caería a $2 y necesitaría 2 500 vasos, más de los que es capaz de vender. Por debajo de $6, el costo de cada vaso, perdería en cada venta aunque vendiera miles.</p>
      <p>El techo lo pone la gente, no el dueño. Por $12 todavía hay quien compre, porque el puesto de al lado cobra eso, pero por más de $12 el cliente se va a la acera de enfrente. Por eso el puesto vecino no vive: cobra $12, pero sus costos son más altos, así que su suelo queda por encima de su techo.</p>
      ${FRANJA}
      <p>En el diagrama, la franja une el suelo con el techo, y en el medio está el precio elegido. Por debajo de la franja pierdes dinero; por encima, el cliente se marcha. Entre los dos límites hay espacio para decidir el precio.</p>
      <h3>Qué pasa si subes el precio o si lo bajas</h3>
      <p>El <strong>margen</strong> es lo que deja cada venta, y ya lo usaste en "Punto de equilibrio": el precio menos el costo variable de ese vaso. Si el precio sube, el margen crece y el punto de equilibrio baja: hacen falta menos ventas para no perder. Si el precio baja, el margen se encoge y hay que vender más.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Precio del vaso</th><th>Margen</th><th>Punto de equilibrio</th><th>Si vendes 1 000 vasos</th><th>Los clientes</th></tr>
        <tr><td>$8</td><td>$2</td><td>2 500 vasos</td><td>−$3 000</td><td>Vienen algunos más</td></tr>
        <tr><td>$10</td><td>$4</td><td>1 250 vasos</td><td>−$1 000</td><td>Los de siempre</td></tr>
        <tr><td>$11</td><td>$5</td><td>1 000 vasos</td><td>$0</td><td>Casi los de siempre</td></tr>
        <tr><td>$12</td><td>$6</td><td>834 vasos</td><td>$1 000</td><td>El mismo precio del vecino</td></tr>
        <tr><td>$14</td><td>$8</td><td>625 vasos</td><td>$3 000</td><td>Se va la mayoría</td></tr>
      </table></div>
      <p>Esta tabla explica el misterio del principio: subir el precio sube el margen, pero baja la cantidad de gente que compra. CORE Econ lo dice con otras palabras: las empresas que venden productos diferenciados escogen el precio y la cantidad para maximizar sus beneficios, mirando a la vez la curva de demanda y sus costos.</p>
      <p>Y el precio nunca está quieto, como te anunciamos en "Mercados y formación de precios". Si suben los insumos, el suelo se levanta y hay que subir el precio; si cambia la moda o la demanda, el techo se mueve. La CONDUSEF lo recomienda: revisar periódicamente los precios y los costos es clave para que vender más se traduzca en ganar más.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que subir el precio siempre es ganar más. Subirlo agranda el margen, pero espanta clientes, y el margen de un vaso que nadie compra no sirve de nada.</p>`,
    ejemplo: `
      <p>El puesto cobra $10 por vaso, cada vaso le cuesta $6 y los costos fijos del mes son $5 000. En un buen mes vende 1 250 vasos. Las cifras son de ejemplo. ¿Qué pasa si sube el precio a $12?</p>
      <ol class="pasos-ej">
        <li>El margen cambia: 12 − 6 = $6 por vaso, antes $4.</li>
        <li>El punto de equilibrio baja: 5 000 ÷ 6 = 833,3 vasos, o sea 834, antes 1 250.</li>
        <li>Si se van algunos clientes y vende 1 000 vasos, los ingresos son $12 000 y los costos $11 000: todavía gana $1 000.</li>
        <li>Si no se va ninguno y mantiene 1 250 vasos, gana $2 500: cada vaso deja $2 más.</li>
        <li>El riesgo: a $12 el puesto queda igual que el de al lado, y si sube un peso más, el cliente se va.</li>
      </ol>
      <p>Resultado: <span class="resultado">a $12 gana entre $1 000 y $2 500, según los clientes que se queden</span>.</p>
      <p class="nota"><strong>Error común:</strong> mirar solo el margen. Si bajan las ventas, el total puede empeorar: hay que mirar las dos cosas.</p>`,
    vidaReal: `
      <p>Fijar un precio no es solo un cálculo, es una decisión que se revisa:</p>
      <ul>
        <li>Cuando comparas dos precios del mismo producto, estás viendo dos mercados y dos costos distintos.</li>
        <li>Saber el precio mínimo de un negocio te dice si un pedido sale a cuenta o no.</li>
        <li>Cuando suben los insumos, el suelo se levanta y por eso suben los precios en la frutería o en el mercado.</li>
        <li>Cuando un negocio sube el precio y no pierde clientes, es que estaba cobrando por debajo de lo que el mercado aguantaba.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>El puesto de jugos sube el precio del vaso de $10 a $12 y el costo variable sigue siendo de $6. ¿Cuál es ahora el margen de cada vaso?</p>', respuesta: 12 - 6,
        pista: '<p>Resta el costo variable del precio nuevo.</p>',
        solucion: '<p>12 − 6 = <strong>$6</strong> de margen por vaso. Antes eran $4, así que cada venta deja $2 más para cubrir los costos fijos.</p>' },
      { tipo: 'numero', enunciado: '<p>Con $5 000 de costos fijos y un margen de $6 por vaso, ¿cuántos vasos hay que vender como mínimo para no perder dinero?</p>', respuesta: 5000 / 6, tolerancia: 1,
        pista: '<p>Divide los costos fijos entre el margen de cada vaso y, si sale con decimales, redondea hacia arriba: no se venden fracciones de vaso.</p>',
        solucion: '<p>5 000 ÷ 6 = 833,3 vasos. Como no se puede vender una fracción, hacen falta <strong>834 vasos</strong>: con 833 todavía faltan $2 para cubrir los costos fijos.</p>' },
      { tipo: 'opciones', enunciado: '<p>El puesto baja el precio del vaso de $10 a $8 y el costo variable no cambia. ¿Qué pasa?</p>',
        opciones: ['El margen baja a $2 y el punto de equilibrio sube a 2 500 vasos', 'El margen sube a $8 y el punto de equilibrio baja a 625 vasos', 'No cambia nada, porque el precio no importa'], correcta: 0,
        pista: '<p>Calcula el margen nuevo y divide los $5 000 de costos fijos entre él.</p>',
        solucion: '<p>El margen queda en 8 − 6 = $2 y el punto de equilibrio en 5 000 ÷ 2 = <strong>2 500 vasos</strong>. Con el precio más bajo hacen falta muchos más vasos para no perder.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es el precio mínimo de un negocio?</p>',
        opciones: ['El precio más alto que el mercado está dispuesto a pagar', 'El precio más bajo al que todavía no se pierde dinero', 'El precio que cobra el negocio más caro de la calle'], correcta: 1,
        pista: '<p>Es el límite de abajo: por debajo, los costos no salen.',
        solucion: '<p>Es <strong>el precio más bajo al que todavía no se pierde dinero</strong>. Es el suelo de la franja de precios y coincide con el punto de equilibrio del negocio.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama lo que cobra el cliente por su producto?</p>',
        respuestas: ['precio de venta', 'el precio de venta', 'precio', 'el precio', 'selling price'],
        pista: '<p>Son dos palabras: la primera es el precio y la segunda dice a quién se le cobra.',
        solucion: '<p>El <strong>precio de venta</strong>, que en inglés es selling price. No es lo mismo que el precio mínimo, que es el límite de abajo que marca el suelo.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena lo que hace un dueño al decidir el precio de su producto.</p>',
        respuesta: ['Calcula su margen: el precio menos el costo variable de cada venta', 'Calcula su suelo: el precio mínimo para no perder dinero', 'Mira su techo: lo que el mercado está dispuesto a pagar', 'Elige un precio dentro de la franja, entre el suelo y el techo', 'Revisa la decisión de vez en cuando, porque los costos y la demanda cambian'],
        pista: '<p>Empieza por los números del negocio y termina con el precio.',
        solucion: '<p>Primero se calcula el margen y el suelo, después se mira el techo que pone el mercado, luego se elige un precio dentro de la franja y, por último, se revisa la decisión cuando cambian los costos o la demanda.</p>' },
    ],
    fuentes: [CORE7, CONDUSEF26, WIKI_PUNTO_MUERTO],
  });
})();
