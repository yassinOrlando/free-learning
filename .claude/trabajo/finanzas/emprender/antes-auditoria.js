// Finanzas y economía · Unidad 6: Emprender.
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

  // ---- Fuentes ----
  const CONDUSEF_EMPRENDER = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: El arte de emprender sin endeudarte (2025)', url: 'https://revista.condusef.gob.mx/inversion/2025/08/el-arte-de-emprender-sin-endeudarte/' };
  const CONDUSEF_MITOS = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: Mitos comunes al entrepreneurship (2025)', url: 'https://revista.condusef.gob.mx/usuario-inteligente/mito-o-verdad/2025/08/mitos-comunes-al-emprender/' };
  const CONDUSEF_PASO = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: Da el siguiente paso (2013)', url: 'https://revista.condusef.gob.mx/usuario-inteligente/perspectivas/2013/10/da-el-siguiente-paso-2/' };
  const WIKI_MODELO = { nombre: 'Wikipedia en español: Modelo de negocio', url: 'https://es.wikipedia.org/wiki/Modelo_de_negocio' };
  const CORE7 = { nombre: 'CORE Econ (en español), La Economía, Capítulo 7: La empresa y sus clientes', url: 'https://books.core-econ.org/the-economy-v1/book/es/text/07.html' };
  const CONDUSEF_PYMES = { nombre: 'CONDUSEF (México), Revista Proteja su Dinero: Pequeñas, pero con grandes verdades (2026)', url: 'https://revista.condusef.gob.mx/inversion/pymes/2026/03/pequenas-pero-con-grandes-verdades/' };
  const WIKI_FONDO = { nombre: 'Wikipedia en español: Fondo de maniobra', url: 'https://es.wikipedia.org/wiki/Fondo_de_maniobra' };
  const WIKI_FLUJO = { nombre: 'Wikipedia en español: Flujo de caja', url: 'https://es.wikipedia.org/wiki/Flujo_de_caja' };
  const BBVA_FLUJO = { nombre: 'BBVA México: ¿Qué es un Flujo de Caja?', url: 'https://www.bbva.mx/educacion-financiera/f/flujo-de-caja.html' };
  const SERNAC = { nombre: 'SERNAC (Chile), Guía para el docente de educación financiera (PDF)', url: 'https://www.sernac.cl/portal/607/articles-9171_archivo_01.pdf' };

  // ------------------------------------------------------------------
  const PREGUNTAS = diagrama([0, 18], [0, 11], [
    caja(0.6, 7.2, 6.6, 10.4),
    caja(11.4, 7.2, 17.4, 10.4),
    caja(11.4, 0.6, 17.4, 3.8),
    caja(0.6, 0.6, 6.6, 3.8),
    txt(3.6, 9.5, '¿Qué problema'), txt(3.6, 8.5, 'resuelvo?'),
    txt(14.4, 9.5, '¿Para quién?'),
    txt(14.4, 2.9, '¿Qué me'), txt(14.4, 1.9, 'diferencia?'),
    txt(3.6, 2.9, '¿Cuánto me'), txt(3.6, 1.9, 'cuesta?'),
    ...flecha([6.85, 8.8], [11.15, 8.8], 0, 1.2),
    ...flecha([14.4, 7.0], [14.4, 4.0], 0, 1.2),
    ...flecha([11.15, 2.2], [6.85, 2.2], 0, 1.2),
    ...flecha([3.6, 4.0], [3.6, 7.0], 0, 1.2),
    txt(9, 6.1, 'y se vuelve'), txt(9, 5.1, 'a empezar'),
  ], 'Diagrama con cuatro cajas en forma de ronda, unidas por flechas en el sentido de las manecillas del reloj. La caja de arriba a la izquierda dice «¿Qué problema resuelvo?», la de arriba a la derecha dice «¿Para quién?», la de abajo a la derecha dice «¿Qué me diferencia?» y la de abajo a la izquierda dice «¿Cuánto me cuesta?». La última flecha vuelve de la última caja a la primera, y en el centro se lee «y se vuelve a empezar».');

  L('De la idea al negocio', {
    objetivo: 'Entender qué hace que una idea se convierta en un negocio, las preguntas que hay que responder antes de abrir y para qué sirve escribir el plan de negocios.',
    explicacion: `
      <p>Ana tiene una idea: hacer pulseras con hilo y venderlas. A ella le salen muy bien y a sus amigos también les gustan. Pero al día siguiente se hace la pregunta incómoda: ¿y ahora qué? ¿A quién se las vendo? ¿Cuánto me cuestan? Una idea buena no es todavía un negocio.</p>
      <h3>Una idea puede ser buena y no ser un negocio</h3>
      <p>Una <strong>idea de negocio</strong> (<span lang="en">business idea</span>) es una idea de producto o servicio que alguien podría querer comprar. Lo de Ana es una idea de negocio: las pulseras de hilo. Lo que le falta es todo lo demás, y eso es lo que convierte la idea en algo que de verdad funciona.</p>
      <p>Antes de abrir hay que responder tres preguntas, y en este orden. La primera es: ¿qué problema resuelvo? La segunda: ¿quién tiene ese problema? Y la tercera: ¿por qué me van a elegir a mí y no a otro? Si no puedes contestarlas, todavía no sabes para quién es tu idea, y un negocio sin cliente claro se queda sin ventas.</p>
      <p>La persona concreta a la que le vas a vender se llama <strong>cliente objetivo</strong> (<span lang="en">target customer</span>). No es «la gente» ni «todo el mundo»: es una persona real, con una necesidad real. En el caso de Ana, el cliente objetivo no es cualquiera al que le guste una pulsera, sino las familias que buscan un regalo de graduación, porque ahí hay una fecha, un presupuesto y una razón clara para comprar.</p>
      <h3>Las cuatro preguntas que se encadenan</h3>
      <p>Estas preguntas no suenan sueltas: se encadenan. Si no sabes a quién le vendes, no puedes saber qué le ofreces; si no sabes cuánto te cuesta, no puedes saber si te conviene. Y como el dinero tiene usos enfrentados, cada peso que metes en una cosa es un peso que no puedes meter en otra, como viste en "Escasez y costo de oportunidad".</p>
      ${PREGUNTAS}
      <p>Las dos ideas de Ana se ven así:</p>
      <div class="tabla-wrap"><table>
        <tr><th>La idea</th><th>¿Ya es negocio?</th><th>El criterio</th></tr>
        <tr><td>Pulseras que hago con hilo, porque me salen bien</td><td>No</td><td>Falta saber a quién se venden y cuánto cuestan</td></tr>
        <tr><td>Pulseras de hilo para regalar en una graduación, con el nombre bordado</td><td>Sí</td><td>Ya sabes quién compra, por qué te eligen y cuánto te cuesta</td></tr>
      </table></div>
      <p>La cuarta pregunta, la que más se olvida, es cuánto cuesta. Cada pulsera tiene un costo: el hilo, las cuentas, el cierre y el empaque. En "Ingresos, costos y utilidad" ya viste cómo se suman esos costos. Aquí solo hace falta una cosa: saber el costo de una unidad antes de vender, no después.</p>
      <h3>El plan de negocios: las respuestas por escrito</h3>
      <p>Todas esas respuestas, escritas y ordenadas en un documento, forman el <strong>plan de negocios</strong> (<span lang="en">business plan</span>). La CONDUSEF lo define como un documento que se presenta de manera organizada y evaluada, para que el emprendedor determine si su negocio es viable o no. O sea que no es un trámite ni un libro: es tu lista de respuestas y los números que las sostienen.</p>
      <p>Se escribe antes de abrir, y hay una razón de peso: el sesgo del optimismo. La CONDUSEF lo dice así: el sesgo del optimismo nos hace subestimar los costos y sobreestimar los ingresos. Con una idea bonita y números optimistas, el dueño ve que va a ganar, abre, y cuando llegan las facturas se sorprende.</p>
      <p>Y el dinero para arrancar tiene dos caminos: ahorrar durante meses o años, o pedir un crédito. Si se pide prestado a un banco hace falta tener historial crediticio, como viste en "Qué es un crédito".</p>
      <p class="nota"><strong>Trampa común:</strong> abrir porque la idea es buena. Que la idea sea buena es el principio, no el final: lo que decide si el negocio sobrevive es qué problema resuelve, para quién y a cuánto costo.</p>`,
    ejemplo: `
      <p>Ana hace pulseras con hilo. Las cifras son de ejemplo. Cada pulsera le cuesta $48 en materiales y $12 en empaque, y tarda 20 minutos en hacerla. Quiere venderlas para regalar en graduaciones. ¿Ya tiene un negocio?</p>
      <ol class="pasos-ej">
        <li>El problema: una familia tiene que comprar un regalo de graduación que no se vea igual en todas partes. Es real y se repite cada año.</li>
        <li>El cliente: las familias que compran ese regalo, con fecha y presupuesto. No es «cualquiera que quiera una pulsera».</li>
        <li>La diferencia: se piden con el nombre de quien las recibe. El puesto de la esquina no lo hace.</li>
        <li>El costo: $48 más $12 son $60 por pulsera. Sin esa cuenta no se sabe si el negocio gana o pierde.</li>
        <li>El tiempo: en una tarde de 4 horas (240 minutos) hace 240 ÷ 20 = 12 pulseras, con materiales de 12 × $60 = $720.</li>
      </ol>
      <p>Resultado: <span class="resultado">ya tiene un negocio: cliente, diferencia y costo de $60</span>.</p>
      <p class="nota"><strong>Error común:</strong> quedarse solo con «me salen muy bien». Eso no dice quién las va a comprar ni cuánto cuestan: sin eso no hay negocio.</p>`,
    vidaReal: `
      <p>Te sirve para lo que estás haciendo ahora mismo, aunque nunca abras un negocio:</p>
      <ul>
        <li>Cuando propones un proyecto o un trabajo en grupo, tienes que decir qué problema resuelve y para quién.</li>
        <li>Cuando ahorras para algo, sabes que lo que gastes hoy no lo vas a tener mañana.</li>
        <li>Cuando alguien te cuenta su negocio, puedes preguntarle quién le compra y cuánto le cuesta, y ver si tiene respuesta.</li>
        <li>Entiendes por qué alguien con una idea excelente puede fracasar: le faltaba saber quién le iba a comprar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Ana tarda 20 minutos en hacer cada pulsera y trabaja 4 horas al día. ¿Cuántas pulseras hace en un día?</p>', respuesta: 4 * 60 / 20,
        pista: '<p>Primero convierte las horas en minutos y luego divide.</p>',
        solucion: '<p>4 horas son 240 minutos, y 240 ÷ 20 = <strong>12 pulseras</strong> en un día de trabajo.</p>' },
      { tipo: 'numero', enunciado: '<p>Los materiales de cada pulsera cuestan $48 y el empaque $12. Si en una tarde hace 15 pulseras, ¿cuánto gasta en materiales y empaque? (Las cifras son de ejemplo.)</p>', respuesta: 15 * (48 + 12),
        pista: '<p>Primero calcula lo que cuesta una pulsera y luego multiplica por las 15.</p>',
        solucion: '<p>Una pulsera sale 48 + 12 = $60. Con 15 pulseras son 15 × 60 = <strong>$900</strong> en materiales y empaque.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas ideas todavía <strong>no</strong> es un negocio?</p>',
        opciones: [
          'Vender pulseras de hilo hechas a mano para regalar en graduaciones, con el nombre bordado',
          'Vender pulseras que hago con hilo, porque me salen muy bien',
          'Vender pulseras de $60 a las familias que compran el regalo de graduación'],
        correcta: 1,
        pista: '<p>Busca la que no dice quién la compra ni cuánto cuesta.</p>',
        solucion: '<p>La segunda. Decir «me salen muy bien» no dice a quién se venden, qué las hace distintas ni cuánto cuestan. Las otras dos sí tienen cliente, diferencia y precio de costo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué conviene escribir el plan de negocios antes de abrir?</p>',
        opciones: [
          'Para saber si el negocio es viable y no estimar mal los costos',
          'Para que el negocio tenga un nombre bonito',
          'Para no tener que hablar nunca con los clientes'],
        correcta: 0,
        pista: '<p>Piensa en lo que pasa cuando se escriben los números después de abrir.',
        solucion: '<p><strong>Para saber si el negocio es viable y no estimar mal los costos.</strong> El sesgo del optimismo hace subestimar los costos y sobreestimar los ingresos, y por eso el plan se escribe antes.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la persona concreta a la que le vas a vender?</p>',
        respuestas: ['cliente objetivo', 'el cliente objetivo', 'target customer'],
        pista: '<p>Son dos palabras: la primera dice a quién le vendes y la segunda que es una persona concreta.',
        solucion: '<p>El <strong>cliente objetivo</strong>: la persona concreta a la que le vendes, no «todo el mundo». En inglés se dice target customer.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena las preguntas que hay que responder antes de abrir un negocio.</p>',
        respuesta: ['¿Qué problema resuelvo?', '¿Quién tiene ese problema?', '¿Por qué me van a elegir a mí y no a otro?', '¿Cuánto me cuesta producir lo que vendo?'],
        pista: '<p>Empieza por el problema y termina por los números.',
        solucion: '<p>Primero se pregunta qué problema resuelves, luego quién lo tiene, después por qué te van a elegir a ti y, por último, cuánto te cuesta producir lo que vendes.</p>' },
    ],
    fuentes: [CONDUSEF_EMPRENDER, CONDUSEF_MITOS, CONDUSEF_PASO],
  });

  // ------------------------------------------------------------------
  const MODELO = diagrama([0, 18], [0, 11], [
    caja(0.6, 7.2, 6.6, 10.4),
    caja(11.4, 7.2, 17.4, 10.4),
    caja(11.4, 0.6, 17.4, 3.8),
    caja(0.6, 0.6, 6.6, 3.8),
    txt(3.6, 9.5, 'Cliente'), txt(3.6, 8.5, '¿quién compra?'),
    txt(14.4, 9.5, 'Propuesta'), txt(14.4, 8.5, 'de valor'),
    txt(14.4, 2.9, 'Canal'), txt(14.4, 1.9, 'de venta'),
    txt(3.6, 2.9, 'Ingreso'), txt(3.6, 1.9, '¿de dónde sale?'),
    ...flecha([6.85, 8.8], [11.15, 8.8], 0, 1.2),
    ...flecha([14.4, 7.0], [14.4, 4.0], 0, 1.2),
    ...flecha([11.15, 2.2], [6.85, 2.2], 0, 1.2),
    ...flecha([3.6, 4.0], [3.6, 7.0], 0, 1.2),
    txt(9, 6.1, 'el dinero vuelve'), txt(9, 5.1, 'a comprar y vender'),
  ], 'Diagrama con cuatro cajas en forma de ronda, unidas por flechas en el sentido de las manecillas del reloj. La caja de arriba a la izquierda dice «Cliente» y debajo «¿quién compra?». La de arriba a la derecha dice «Propuesta de valor». La de abajo a la derecha dice «Canal de venta». La de abajo a la izquierda dice «Ingreso» y debajo «¿de dónde sale?». En el centro se lee «el dinero vuelve a comprar y vender», porque el ingreso del cliente vuelve al negocio para producir otra vez.');

  L('Modelo de negocio', {
    objetivo: 'Entender qué es un modelo de negocio, cuáles son sus cuatro piezas y cómo comparar los modelos de dos negocios que venden lo mismo.',
    explicacion: `
      <p>Dos personas venden el mismo pan en el mismo barrio. Una tiene más clientes y la otra gana más dinero. Si el producto es el mismo y el barrio es el mismo, ¿qué las diferencia? No es el pan: es el modelo.</p>
      <h3>El modelo de negocio: cómo ganas dinero</h3>
      <p>Un <strong>modelo de negocio</strong> (<span lang="en">business model</span>) es el resumen de cómo gana dinero un negocio. Wikipedia en español lo define como una representación abstracta de una organización y de todos los conceptos relacionados con ella. Suena complicado, pero en la práctica son cuatro preguntas: ¿a quién le vendes?, ¿qué le ofreces que le resuelve algo?, ¿por dónde le llega?, y ¿de dónde sale el dinero?</p>
      <h3>Las cuatro piezas</h3>
      <p>La primera pieza es el cliente: la persona concreta que compra. La segunda es la <strong>propuesta de valor</strong> (<span lang="en">value proposition</span>): lo que le ofreces y por qué le sirve. La tercera es el <strong>canal de venta</strong> (<span lang="en">sales channel</span>): por dónde llega el cliente hasta tu producto, que puede ser el mostrador, un teléfono o un repartidor. Y la cuarta es el ingreso: el dinero que entra por la venta y lo que cuesta atenderla.</p>
      ${MODELO}
      <p>El diagrama se lee como una vuelta: el cliente tiene un problema, tu propuesta de valor promete resolverlo, el canal se lo lleva y el cliente paga. Ese pago es el ingreso, y con ese dinero vuelves a comprar y a producir. Por eso el modelo no es un dibujo quieto: Wikipedia en español dice que no describe el modelo de negocio en un momento puntual, sino la secuencia de actividades y la capacidad de adaptación al entorno.</p>
      <p>Los dos modelos de una misma panadería se ven así:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Pieza</th><th>Panadería del local</th><th>Panadería con reparto</th></tr>
        <tr><td>Cliente</td><td>Las familias del barrio</td><td>Las mismas y quien encarga pan</td></tr>
        <tr><td>Propuesta de valor</td><td>Pan recién hecho, sin esperas</td><td>La misma</td></tr>
        <tr><td>Canal de venta</td><td>El mostrador</td><td>El mostrador y el teléfono</td></tr>
        <tr><td>Ingreso y costos</td><td>1 000 panes a $10 al mes</td><td>Los mismos, más $720</td></tr>
      </table></div>
      <h3>De dónde sale el dinero y por qué vuelve</h3>
      <p>El cliente paga porque algo le sirve, y eso ya lo viste en "Oferta y demanda": el precio lo marcan la oferta y la demanda, y cada cliente decide cuánto está dispuesto a pagar. El libro de CORE Econ lo dice con otras palabras: lo que vende una empresa depende de la demanda a la que se enfrente, es decir, de la predisposición de los clientes potenciales a pagar por sus productos. El precio de esa venta ya lo viste en "Cómo fijar un precio de venta".</p>
      <p>Y quién es la empresa que hace todo esto ya lo sabes: en "Qué es una empresa" viste que una empresa combina medios para producir y vender. El modelo agrega el camino entero: de dónde sale el dinero, por dónde pasa y por qué vuelve.</p>
      <h3>Para qué sirve el modelo</h3>
      <p>Sirve, sobre todo, para comparar. Dos negocios del mismo sector pueden tener modelos distintos y ganar dinero igual: uno vive de la gente que pasa por el mostrador y el otro de los encargos por teléfono. Y también sirve para cambiar: la misma panadería puede vender en el local o a domicilio, y cada versión es un modelo distinto.</p>
      <p>Y antes de abrir, el modelo te dice qué pieza está floja. Si nadie compra, el problema puede estar en el cliente (no es el que creías), en la propuesta de valor (no resuelve nada importante), en el canal (nadie se entera de que existes) o en el ingreso (no alcanza para lo que cuesta). Con el modelo en la mano, la pregunta «¿qué me falta?» tiene cuatro respuestas posibles, y eso hace el problema manejable.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que el modelo es el producto. Cambiar el pan no cambia el modelo; cambiar por quién vendes, qué ofreces o por dónde llegas, sí.</p>`,
    ejemplo: `
      <p>La panadería vende el pan en el mostrador a $10 y despacha 1 000 panes al mes (cifras de ejemplo). Su dueño decide probar otro modelo: además del local, entrega a domicilio. ¿Qué cambia?</p>
      <ol class="pasos-ej">
        <li>El cliente se amplía: las familias del barrio y quien encarga pan para una reunión.</li>
        <li>La propuesta de valor no cambia: sigue siendo pan recién hecho, sin esperas.</li>
        <li>El canal de venta cambia: el pedido entra por teléfono y sale en una moto.</li>
        <li>El ingreso cambia poco: el pan sigue a $10. Lo que cambia son los costos: cada pedido a casa cuesta $12.</li>
        <li>De los 1 000 panes, 300 van a casa en pedidos de 5: son 60 pedidos. El reparto cuesta 60 × $12 = $720 al mes.</li>
        <li>Los ingresos siguen siendo $10 000, pero ahora salen $720 más: la pieza floja del modelo nuevo es el canal.</li>
      </ol>
      <p>Resultado: <span class="resultado">el mismo pan, un canal nuevo y $720 de costos extra al mes</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que el reparto es gratis porque no cambia el precio del pan. El canal nuevo trae costos nuevos.</p>`,
    vidaReal: `
      <p>El modelo te sirve aunque nunca abras un negocio:</p>
      <ul>
        <li>Cuando dos tiendas del mismo tipo tienen precios distintos, no siempre es por el producto: es por el modelo.</li>
        <li>Entiendes por qué un local con muchos clientes en el mostrador puede perder dinero: lo que cuesta llegar a ellos.</li>
        <li>Cuando alguien te ofrece dejarte todo en casa, sabes que ese atajo tiene un precio escondido.</li>
        <li>Puedes explicarle a cualquiera cómo gana dinero un negocio con cuatro preguntas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En el modelo con reparto, 300 de los panes del mes se entregan a casa, en pedidos de 5 panes cada uno. ¿Cuántos pedidos a domicilio salen? (Las cifras son de ejemplo.)</p>', respuesta: 300 / 5,
        pista: '<p>Divide los panes que van a casa entre los panes de cada pedido.',
        solucion: '<p>300 ÷ 5 = <strong>60 pedidos</strong> a domicilio. Cada uno de esos pedidos cuesta $12 de reparto, así que el canal nuevo se lleva $720 al mes.</p>' },
      { tipo: 'numero', enunciado: '<p>Cada pedido a domicilio cuesta $12 de moto y tiempo. Con 60 pedidos al mes, ¿cuánto cuestan los repartos? (Las cifras son de ejemplo.)</p>', respuesta: 60 * 12,
        pista: '<p>Multiplica el costo de un pedido por el número de pedidos.',
        solucion: '<p>60 × 12 = <strong>$720</strong> de costos extra al mes. Los ingresos no cambian, así que esa plata sale de donde salía la utilidad.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué pieza del modelo de negocio responde a la pregunta «por dónde llega el cliente hasta tu producto»?</p>',
        opciones: ['La propuesta de valor', 'El canal de venta', 'El cliente objetivo'], correcta: 1,
        pista: '<p>Busca la pieza que habla del camino, no del producto ni de la persona.',
        solucion: '<p><strong>El canal de venta.</strong> La propuesta de valor es lo que le ofreces al cliente y el cliente objetivo es quién compra. El canal es el camino: el mostrador, el teléfono, una red social o un repartidor.</p>' },
      { tipo: 'opciones', enunciado: '<p>Dos panaderías venden el mismo pan en el mismo barrio. Una gana dinero y la otra no. ¿Qué explica la diferencia?</p>',
        opciones: [
          'El pan que hornean, si es igual en las dos',
          'Los años que llevan abiertas al público',
          'El modelo de negocio: a quién le venden, qué le ofrecen y por dónde llega'],
        correcta: 2,
        pista: '<p>Si el producto y el barrio son iguales, algo tiene que estar fuera de ellos.',
        solucion: '<p><strong>El modelo de negocio.</strong> Puede que una tenga mejores costos o un canal más barato. El producto y los años abiertos no explican la diferencia cuando son los mismos.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama lo que le ofreces al cliente y por qué le sirve?</p>',
        respuestas: ['propuesta de valor', 'la propuesta de valor', 'value proposition'],
        pista: '<p>Son dos palabras: la primera es lo que ofreces y la segunda dice cuánto vale para el cliente.',
        solucion: '<p>La <strong>propuesta de valor</strong>: lo que le ofreces al cliente y por qué le sirve. En inglés se dice value proposition.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena lo que pasa en el modelo de negocio de un negocio.</p>',
        respuesta: [
          'El cliente tiene un problema que le conviene resolver',
          'Le ofreces una propuesta de valor que lo resuelve',
          'El canal de venta le hace llegar el producto',
          'El cliente paga y el negocio recibe un ingreso',
          'Con ese dinero el negocio vuelve a producir y a buscar más clientes'],
        pista: '<p>Empieza por el cliente y termina por el dinero que vuelve a empezar la vuelta.',
        solucion: '<p>Primero el cliente tiene un problema, luego le ofreces la propuesta de valor, después el canal de venta le lleva el producto, el cliente paga y, por último, el ingreso vuelve a producir y a buscar más clientes.</p>' },
    ],
    fuentes: [WIKI_MODELO, CONDUSEF_EMPRENDER, CORE7],
  });

  // ------------------------------------------------------------------
  const CAJA = G({
    x: [-0.6, 3.8], y: [-6, 6], pasos: [1, 2], nombres: false,
    descripcion: 'Gráfica de la caja de un puesto de jugos recién abierto. El eje horizontal son los meses y el 0 es el mes en que se abre; el eje vertical es el dinero que queda en la caja, en cientos de dólares. La línea de la caja empieza en 0 el mes en que se abre, sube a 2 en el mes 1, llega a 5 en el mes 2 y baja a menos 4 en el mes 3, por debajo de la línea de cero, que es el límite a partir del cual el negocio ya no tiene dinero para pagar.',
    figuras: [
      { tipo: 'poligono', puntos: [[0, 0], [1, 2], [2, 5], [3, -4]], abierto: true },
      txt(0.35, -1.4, 'se abre'),
      txt(-0.2, 0.2, '0'),
      txt(3.45, -1.2, 'mes'),
      txt(3.05, 6.1, '(en cientos de $)'),
      txt(2.6, -5.3, 'el mes 3: no hay con qué pagar'),
    ],
  });

  L('Finanzas de un pequeño negocio', {
    objetivo: 'Entender de dónde sale el capital inicial de un negocio, cómo se sigue su dinero mes a mes y por qué un negocio puede ganar dinero y aun así no tener con qué pagar.',
    explicacion: `
      <p>El puesto de jugos necesita $3 000 antes de vender el primer vaso: el equipo, el permiso y tres meses de alquiler por adelantado. De dónde sale ese dinero es la primera pregunta. La segunda es más incómoda: ¿qué pasa si se acaba antes de tiempo? El dinero entra y sale en días distintos.</p>
      <h3>El capital inicial: el dinero que se gasta antes de vender</h3>
      <p>El <strong>capital inicial</strong> (<span lang="en">startup capital</span>) es el dinero que hace falta para abrir y arrancar, y se gasta antes de tener un solo cliente: el equipo, el permiso y el alquiler por adelantado. Viene del ahorro o de un préstamo, como ya viste en "Qué es un crédito", pero en cuanto entra al negocio ese dinero deja de ser tuyo y trabaja para él.</p>
      <p>Por eso la CONDUSEF pide separar las finanzas personales de las del emprendimiento y vigilar en las dos los ingresos, los gastos y las deudas. Separadas, se ve la verdad: si al mes sobró o faltó dinero. Mezcladas, tu sueldo tapa el agujero y el agujero sigue ahí.</p>
      <h3>El fondo de maniobra: el dinero que aguanta la espera</h3>
      <p>Con el capital inicial ya gastado y sin haber cobrado nada, hace falta el <strong>fondo de maniobra</strong> (<span lang="en">working capital</span>): el dinero con el que el negocio paga sus gastos mientras espera cobrar. Wikipedia en español lo llama la parte del activo circulante financiada con recursos permanentes, que mide la capacidad de seguir operando en el corto plazo.</p>
      <h3>El flujo de caja: lo que entra y lo sale a lo largo del tiempo</h3>
      <p>El <strong>flujo de caja</strong> (<span lang="en">cash flow</span>) es la cuenta que sigue el dinero del negocio: cuánto entra, cuánto sale y qué saldo queda cada mes. Se anota lo que entró por ventas, lo que salió por insumos y alquiler, y la diferencia: el saldo.</p>
      <p>Y aquí va la idea que casi nadie explica: ser rentable no significa tener liquidez. Un negocio puede ganar dinero y aun así no tener con qué pagar el alquiler, porque el dinero entra después de que sale. Wikipedia en español lo dice así: el ser rentable no significa necesariamente poseer liquidez; una compañía puede tener problemas de efectivo, aun siendo rentable. La utilidad la viste en "Ingresos, costos y utilidad" y el punto de equilibrio en "Punto de equilibrio": los dos miran lo que vendiste, no cuándo te cobran.</p>
      <p>El gráfico es la línea de tiempo de un puesto recién abierto (cifras de ejemplo): la caja al final de cada mes. Sube al principio y se hunde bajo la línea de cero, donde no hay con qué pagar.</p>
      ${CAJA}
      <p>Cada mes se anota lo que entra, lo que sale y el saldo que queda.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Mes</th><th>Dinero que entra</th><th>Dinero que sale</th><th>Saldo que queda</th></tr>
        <tr><td>Mes 1 (cifras de ejemplo)</td><td>$900</td><td>$700</td><td>$200</td></tr>
      </table></div>
      <h3>El presupuesto del negocio: para producir, no para gastar</h3>
      <p>En "Hacer tu primer presupuesto" anotaste tus ingresos y tus gastos. El presupuesto de un negocio se parece en las cuentas y cambia en el propósito: no es para gastar menos, sino para saber si alcanza para producir y para pagar lo que vence. La SERNAC lo define como anotar los ingresos y los gastos de un mismo período.</p>
      <p>Ese presupuesto se revisa cada mes, porque cambian los precios y los costos. La CONDUSEF lo resume: revisarlos es clave para que vender más sea ganar más.</p>
      <h3>El dato que asusta</h3>
      <p>En México, 52 de cada 100 pequeños y medianos empresas cierran en sus primeros dos años de operación, en gran parte por falta de planeación y de una buena gestión de sus recursos (México, 2026). Revisa el dato vigente en tu país, porque cada país tiene los suyos.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que un mes con ganancias significa que el negocio está bien. Las ganancias dicen cuánto vendiste y lo que costó; el flujo de caja dice si tienes dinero para pagar lo que vence.</p>`,
    ejemplo: `
      <p>El puesto abre con $3 000: equipo $1 200, permiso $300 y alquiler de $500 al mes por tres meses adelantado ($1 500). Cifras de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Al abrir entran y salen los $3 000: la caja queda en cero, pero ya tiene equipo, permiso y tres meses de alquiler.</li>
        <li>Mes 1: entran $900 y salen $700; quedan $200. Mes 2: entran $1 100 y salen $800; la caja llega a $500.</li>
        <li>Mes 3: hay un evento escolar y se vende el doble, pero el colegio paga a 30 días y esa venta entra después. Entran $700 y salen $1 600 (insumos $1 100 y alquiler $500). La caja queda en $500 + $700 − $1 600 = −$400.</li>
        <li>Aquí entra la reserva: en los meses 1 y 2 el dueño no gastó el sobrante. Sin ella, en el mes 3 faltarían $900 y no $400: no salvó el mes, pero le dio tiempo.</li>
      </ol>
      <p>Resultado: <span class="resultado">$400 de faltante en la caja, en el mejor mes de ventas</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que un mes con muchas ventas fue bueno. El dinero llegó tarde.</p>`,
    vidaReal: `
      <p>Esto te sirve aunque nunca abras un negocio:</p>
      <ul>
        <li>Cuando oyes que una empresa ganó dinero, te preguntas si de verdad tiene para pagar lo que vence.</li>
        <li>Cuando pides un préstamo, sabes que el dinero entra después y por eso importa tanto cuándo vas a pagar como cuánto pediste.</li>
        <li>Cuando ahorras para algo grande, guardas una parte para los meses difíciles en vez de gastarlo todo.</li>
        <li>Cuando alguien mezcla su dinero con el de su negocio, entiendes por qué no sabe si está ganando.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>El equipo de un puesto cuesta $1 200, el permiso $300 y el alquiler $500 al mes, que se paga tres meses por adelantado. ¿Cuánto capital inicial hace falta? (Las cifras son de ejemplo.)</p>', respuesta: 1200 + 300 + 500 * 3,
        pista: '<p>Suma el equipo y el permiso, y multiplica el alquiler de un mes por los tres meses.</p>',
        solucion: '<p>El alquiler de tres meses es 500 × 3 = $1 500. Con el equipo y el permiso: 1 200 + 300 + 1 500 = <strong>$3 000</strong> de capital inicial.</p>' },
      { tipo: 'numero', enunciado: '<p>En el mes 3 el puesto de jugos recibe $700 y tiene que pagar $1 600, y en la caja había $500. ¿Cuánto dinero falta para pagar todo? (Las cifras son de ejemplo.)</p>', respuesta: 1600 - 700 - 500,
        pista: '<p>Suma lo que entra a lo que ya había en la caja y réstale lo que hay que pagar.</p>',
        solucion: '<p>Había $500 en la caja y entraron $700: 500 + 700 = $1 200. Faltan 1 600 − 1 200 = <strong>$400</strong>. Ese mes el puesto vendió más y aun así no tenía para pagar.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué quiere decir que un negocio sea rentable pero no tenga liquidez?</p>',
        opciones: [
          'Que todavía no sabe a cuánto cobrar sus productos',
          'Que los clientes le pagan tarde',
          'Que gana dinero en sus ventas pero no tiene efectivo para pagar lo que vence',
        ],
        correcta: 2,
        pista: '<p>Piensa en un mes con muchas ventas en las que el dinero todavía no ha llegado.',
        solucion: '<p><strong>Que gana dinero en sus ventas pero no tiene efectivo para pagar lo que vence.</strong> Ser rentable no significa tener liquidez: el dinero puede entrar después de que sale.' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve el fondo de maniobra de un negocio?</p>',
        opciones: [
          'Para saber cuánto dinero vale el negocio',
          'Para pagar los gastos del negocio mientras espera cobrar',
          'Para decidir a qué precio se vende cada producto',
        ],
        correcta: 1,
        pista: '<p>Busca la opción que habla de pagar gastos y de esperar.',
        solucion: '<p><strong>Para pagar los gastos del negocio mientras espera cobrar.</strong> Es el dinero que le permite seguir operando en el corto plazo, aunque todavía no haya recibido el pago de sus ventas.' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el dinero que hace falta para abrir y arrancar un negocio?</p>',
        respuestas: ['capital inicial', 'el capital inicial', 'startup capital'],
        pista: '<p>Son dos palabras: la primera dice que es el dinero del principio y la segunda que es para arrancar.',
        solucion: '<p>El <strong>capital inicial</strong>: el dinero que se gasta antes de vender, para abrir y arrancar el negocio. En inglés se dice startup capital.' },
      { tipo: 'ordenar', enunciado: '<p>Ordena lo que se anota en el mes de un negocio pequeño.</p>',
        respuesta: [
          'Entra el dinero de las ventas que se cobran',
          'El negocio paga sus insumos, sus servicios y el alquiler',
          'Se anota el saldo que queda en la caja al final del mes',
          'Si el saldo quedó en negativo, se actúa antes de que falte el dinero',
        ],
        pista: '<p>Empieza por lo que entra y termina con la decisión que se toma con el saldo.',
        solucion: '<p>Primero entra el dinero de las ventas cobradas, después el negocio paga sus insumos, servicios y alquiler, luego se anota el saldo que queda y, si quedó en negativo, se actúa antes de que falte el dinero.' },
    ],
    fuentes: [CONDUSEF_EMPRENDER, CONDUSEF_PYMES, WIKI_FONDO, WIKI_FLUJO, BBVA_FLUJO, SERNAC],
  });

})();
