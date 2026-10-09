// Finanzas personales · Unidad 8: Inversión.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Sin consejos personalizados ni productos, fondos, acciones o marcas por su nombre.
// Los rendimientos de los ejemplos son cifras de ejemplo; ningún rendimiento pasado se presenta como promesa.
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

  const FPT = (ruta, nombre) => ({ nombre: `Finanzas para todos (Banco de España y CNMV): ${nombre}`, url: `https://www.finanzasparatodos.es/${ruta}` });
  const REV = (ruta, nombre) => ({ nombre: `CONDUSEF (México), Revista Proteja su Dinero: ${nombre}`, url: `https://revista.condusef.gob.mx/${ruta}/` });
  const FPT_INVERTIR = FPT('c-mo-invertir-tu-dinero', '¿Cómo invertir tu dinero?');
  const FPT_PASOS = FPT('los-3-pasos-para-tomar-decisiones-de-inversi-n', 'Los 3 pasos para tomar decisiones de inversión');
  const FPT_PRODUCTOS = FPT('en-qu-productos-invertir', '¿En qué productos invertir?');
  const SEC_CARTERA = { nombre: 'Comisión de Bolsa y Valores de EE. UU. (SEC), Investor.gov: Asset Allocation and Diversification (en inglés)', url: 'https://www.investor.gov/introduction-investing/getting-started/asset-allocation' };
  const SEC_PERIODICAS = { nombre: 'Comisión de Bolsa y Valores de EE. UU. (SEC), Investor.gov: Dollar Cost Averaging (en inglés)', url: 'https://www.investor.gov/introduction-investing/investing-basics/glossary/dollar-cost-averaging' };
  const REV_MIEDO = REV('usuario-inteligente/mito-o-verdad/2021/10/pierde-el-miedo-a-invertir', 'Pierde el miedo a invertir');
  const REV_ESFUME = REV('usuario-inteligente/tu-bolsillo/2025/09/que-tu-dinero-no-se-esfume', '¡Que tu dinero no se esfume!');
  const REV_ETF = REV('usuario-inteligente/tu-bolsillo/2025/12/etfs', 'El ABC para empezar a invertir');

  // ------------------------------------------------------------------
  const B = [12, -6, 15, -3, 10];
  const rendB = (x) => { const i = Math.min(3, Math.max(0, Math.floor(x - 1))); return B[i] + (B[i + 1] - B[i]) * (x - 1 - i); };
  const VAIVEN = G({
    x: [1, 5], y: [-8, 16], pasos: [1, 4], nombres: false,
    funciones: [{ f: () => 5, etiqueta: 'inversión A, en %', serie: 0 }, { f: rendB, etiqueta: 'inversión B, en %', serie: 1 }],
    descripcion: 'Gráfica del rendimiento anual de dos inversiones de ejemplo durante 5 años. La inversión A es una línea horizontal en 5% todos los años. La inversión B sube y baja: 12%, −6%, 15%, −3% y 10%.',
  });

  L('Riesgo y rendimiento', {
    objetivo: 'Explicar qué es invertir, por qué el riesgo y el rendimiento van juntos, medir el riesgo como variación y reconocer cuánto riesgo puedes aceptar.',
    explicacion: `
      <p>Tienes $10 000 guardados. Un banco te ofrece un depósito que paga 5% al año, seguro y sin sorpresas. Una persona conocida te propone meterlos en su negocio: "puedes ganar 20%". Pero también podrías perderlos. ¿Cuál eliges? Para decidir bien necesitas dos ideas que siempre van juntas.</p>
      <h3>Qué es invertir</h3>
      <p>En "Por qué ahorrar" viste que ahorrar es guardar dinero sin arriesgarlo. Una <strong>inversión</strong> va un paso más allá: según Finanzas para todos, del Banco de España y la CNMV, es comprometer parte de tus ahorros con la esperanza, pero sin la certeza, de obtener una ganancia. Esa ganancia se llama <strong>rendimiento</strong>: lo que tu dinero produce, como intereses, una parte de las ganancias de una empresa o lo que sube el precio de lo que compraste. Casi siempre se mide en porcentaje, como en "Porcentajes".</p>
      <p>Como no hay certeza, invertir tiene <strong>riesgo</strong>: la incertidumbre sobre el resultado. El rendimiento puede ser grande, pequeño o ninguno, y hasta puedes perder parte o todo lo que pusiste.</p>
      <h3>Riesgo y rendimiento van juntos</h3>
      <p>Finanzas para todos lo resume así: a mayor rendimiento esperado, mayor riesgo, y no existe inversión sin riesgo, aunque algunas tienen más que otras. Fíjate en la palabra "esperado": aceptar más riesgo no garantiza ganar más. Solo quiere decir que el resultado puede ser mucho mejor o mucho peor.</p>
      <p>Por eso, cuando alguien promete ganancias muy altas y "sin riesgo", desconfía. Como viste en "Esquemas piramidales y promesas de dinero fácil", esa combinación no existe en las inversiones reales.</p>
      ${VAIVEN}
      <p>Una forma de ver el riesgo es mirar cuánto cambia el rendimiento de un año a otro. En la gráfica, la inversión A da 5% todos los años. La B da un poco más en promedio, pero un año gana 15% y otro pierde 6%: su resultado varía mucho, y por eso es más arriesgada. Medir qué tan dispersos están unos números es lo que viste en "Rango, varianza y desviación estándar".</p>
      <h3>¿Cuánto riesgo puedes aceptar?</h3>
      <p>La Comisión de Bolsa y Valores de Estados Unidos (SEC) llama tolerancia al riesgo a tu capacidad y tu disposición para perder parte o todo lo que inviertes, a cambio de una ganancia posible mayor. Finanzas para todos lo divide en dos partes. Una depende de tus números: cuánto podrías perder sin poner en peligro tu situación. La otra depende de ti: cuánta pérdida aguantas sin angustiarte. Su frase lo dice todo: una inversión que te quita el sueño no es buena, por muy rentable que parezca.</p>
      <h3>Antes de invertir</h3>
      <p>Finanzas para todos pone un orden: primero controla tus deudas, como viste en la unidad Deudas; luego junta tu fondo de emergencia, y solo después invierte el dinero que no vas a necesitar pronto. La CONDUSEF agrega que no hace falta mucho dinero para empezar, pero sí un presupuesto y un ahorro para imprevistos.</p>
      <p class="nota"><strong>Trampa común:</strong> elegir una inversión solo por su rendimiento más alto. Pregunta siempre también cuánto podrías perder y si podrías soportarlo.</p>`,
    ejemplo: `
      <p>Durante 5 años, la inversión A rindió 5%, 5%, 5%, 5% y 5%. La B rindió 12%, −6%, 15%, −3% y 10%. Son cifras de ejemplo. Compara su rendimiento promedio y su rango.</p>
      <ol class="pasos-ej">
        <li>Media de A: (5 + 5 + 5 + 5 + 5) ÷ 5 = 5%.</li>
        <li>Media de B: (12 − 6 + 15 − 3 + 10) ÷ 5 = 28 ÷ 5 = 5.6%, como en "Media, mediana y moda".</li>
        <li>Rango de A: 5 − 5 = 0. Rango de B: el mayor menos el menor, 15 − (−6) = 21 puntos.</li>
        <li>Compara: B da 0.6 puntos más en promedio, pero su rango es enorme, y un año pierdes 6%. A nunca cambia.</li>
        <li>Comprueba la suma de B por partes: 12 + 15 + 10 = 37 y −6 − 3 = −9, así que 37 − 9 = 28.</li>
      </ol>
      <p>Resultado: <span class="resultado">B rinde un poco más en promedio, pero con mucho más riesgo</span>.</p>
      <p class="nota"><strong>Error común:</strong> calcular el rango de B como 15 − 6 = 9. El menor es −6, y restar un número negativo es sumar, como viste en "Números enteros: los negativos".</p>`,
    vidaReal: `
      <p>Entender esta pareja de ideas te protege cuando alguien te ofrece "invertir":</p>
      <ul>
        <li>Cuando te ofrezcan una ganancia alta, sabes que debes preguntar también qué podrías perder.</li>
        <li>Distingues el dinero que podrías arriesgar del que necesitas para vivir.</li>
        <li>Eliges según cuánto puedes perder sin angustiarte, no según lo que hace otra persona.</li>
        <li>Reconoces las promesas de "ganar mucho sin arriesgar nada" como una señal de engaño.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Inviertes $8 000 y al cabo de un año valen $8 600. ¿Cuál fue el rendimiento, en porcentaje?</p>', respuesta: (8600 - 8000) / 8000 * 100,
        pista: '<p>Calcula cuánto ganaste y divídelo entre lo que invertiste.</p>',
        solucion: '<p>Ganaste 600, y 600 ÷ 8 000 = 0.075, es decir, <strong>7.5%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una inversión rindió 8%, −2%, 6% y 4% en cuatro años. ¿Cuál fue su rendimiento promedio, en porcentaje?</p>', respuesta: (8 - 2 + 6 + 4) / 4,
        pista: '<p>Suma los cuatro rendimientos, con el signo de cada uno, y divide entre 4.</p>',
        solucion: '<p>8 − 2 + 6 + 4 = 16, y 16 ÷ 4 = <strong>4%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es el rango de esos rendimientos (8%, −2%, 6% y 4%), en puntos?</p>', respuesta: 8 - (-2),
        pista: '<p>Resta el menor al mayor; el menor es negativo.</p>',
        solucion: '<p>8 − (−2) = 8 + 2 = <strong>10 puntos</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué dice Finanzas para todos sobre el riesgo y el rendimiento?</p>',
        opciones: ['A mayor rendimiento esperado, mayor riesgo', 'Las inversiones con más rendimiento no tienen riesgo', 'Aceptar más riesgo garantiza ganar más'], correcta: 0,
        pista: '<p>Recuerda que van juntos, pero sin garantías.</p>',
        solucion: '<p><strong>A mayor rendimiento esperado, mayor riesgo.</strong> Y aceptar más riesgo no garantiza nada.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Finanzas para todos, ¿qué conviene hacer antes de invertir?</p>',
        opciones: ['Invertir primero y después juntar el fondo de emergencia', 'Controlar tus deudas y tener un fondo de emergencia', 'Pedir un préstamo para invertir más'], correcta: 1,
        pista: '<p>Se invierte el dinero que no vas a necesitar pronto.</p>',
        solucion: '<p><strong>Controlar tus deudas y tener un fondo de emergencia.</strong> Solo después se invierte lo que sobra.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la incertidumbre sobre el resultado de una inversión?</p>',
        respuestas: ['riesgo', 'el riesgo'],
        pista: '<p>Siempre va de la mano del rendimiento.</p>',
        solucion: '<p>El <strong>riesgo</strong>.</p>' },
    ],
    fuentes: [FPT_INVERTIR, FPT_PASOS, SEC_CARTERA, REV_MIEDO],
  });

  // ------------------------------------------------------------------
  const CANASTAS = diagrama([0, 12], [0, 5.4], [
    caja(0.3, 2.6, 5.4, 4.6), txt(2.85, 4.0, 'todo junto'), txt(2.85, 3.2, '$10 000'),
    txt(2.85, 1.6, 'si falla, pierdes'), txt(2.85, 0.9, '$5 000'),
    ...[0, 1, 2, 3, 4].map((i) => caja(6.4 + i * 1.08, 2.6, 6.4 + i * 1.08 + 0.9, 4.6, i === 0)),
    ...[0, 1, 2, 3, 4].flatMap((i) => [txt(6.85 + i * 1.08, 3.95, '$2'), txt(6.85 + i * 1.08, 3.25, 'mil')]),
    txt(9.0, 1.6, 'si falla una, pierdes'), txt(9.0, 0.9, '$1 000'),
  ], 'Dos maneras de invertir $10 000. A la izquierda, una sola caja con todo junto: si esa inversión cae a la mitad, pierdes $5 000. A la derecha, cinco cajas de $2 mil cada una; la primera está sombreada: si solo esa cae a la mitad, pierdes $1 000.');

  L('Diversificación', {
    objetivo: 'Explicar qué es diversificar y por qué reduce el riesgo sin eliminarlo, calcular el efecto de repartir el dinero y entender cuándo rebalancear una cartera.',
    explicacion: `
      <p>Si llevas todos los huevos en una sola canasta y se te cae, se rompen todos. Si los repartes en varias canastas, una caída te deja sin algunos, no sin todos. La Comisión de Bolsa y Valores de Estados Unidos (SEC) y Finanzas para todos, del Banco de España y la CNMV, usan justo esa imagen para explicar una de las ideas más importantes de la inversión.</p>
      <h3>Qué es diversificar</h3>
      <p>La <strong>diversificación</strong> es repartir tu dinero entre distintas inversiones para reducir el riesgo. Al conjunto de todas tus inversiones se le llama <strong>cartera</strong>. Según la SEC, la idea es que, si una inversión pierde, las otras compensen esa pérdida.</p>
      <p>¿Por qué funciona? Porque no todas las inversiones suben o bajan al mismo tiempo ni por las mismas razones. La SEC explica que lo que perjudica a un tipo de inversión puede mejorar los resultados de otro.</p>
      ${CANASTAS}
      <h3>Dos formas de repartir</h3>
      <p>La SEC propone diversificar en dos niveles:</p>
      <ul>
        <li>Entre tipos de inversión, por ejemplo acciones (partes de una empresa), bonos (préstamos a un gobierno o a una empresa) y efectivo, que verás en "Instrumentos de inversión: deuda, fondos y acciones".</li>
        <li>Dentro de cada tipo: tener acciones de varias empresas y de sectores distintos, como alimentos, salud o tecnología, en lugar de una sola.</li>
      </ul>
      <p>Finanzas para todos agrega que los fondos de inversión están obligados a diversificar. La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, recomienda además repartir tu dinero en al menos dos instituciones distintas.</p>
      <h3>Diversificar no elimina el riesgo</h3>
      <p>Fíjate en las palabras de la SEC: se diversifica con la esperanza de que unas inversiones compensen a otras. No es una garantía. Si casi todo baja al mismo tiempo, como en una crisis, una cartera diversificada también puede bajar; lo verás en la unidad Cómo prepararse para una crisis o una depresión. Diversificar baja el riesgo de perderlo todo por un solo problema, pero no hace que el riesgo desaparezca.</p>
      <h3>Volver al reparto original</h3>
      <p>Con el tiempo, unas inversiones crecen más que otras, y tu reparto cambia sin que lo decidas. La SEC da un ejemplo: empiezas con 60% de tu cartera en acciones y, como subieron, llegan a ser 80%. Ahora tienes más riesgo del que querías. Volver al reparto original se llama rebalancear: vender una parte de lo que creció o poner dinero nuevo en lo demás. La SEC menciona que algunos expertos aconsejan hacerlo cada seis o doce meses.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que tu cartera está diversificada porque tienes muchas inversiones, cuando todas dependen de lo mismo. Cinco inversiones en la misma empresa se comportan como una sola.</p>`,
    ejemplo: `
      <p>Tienes $10 000 para invertir. Puedes ponerlos todos en una empresa o repartirlos en partes iguales entre cinco empresas. Supón que una de ellas cae 50% y las demás no cambian. Las cifras son de ejemplo. ¿Cuánto pierdes en cada caso?</p>
      <ol class="pasos-ej">
        <li>Todo en una empresa que cae 50%: te quedan 10 000 × 0.50 = $5 000. Pierdes la mitad.</li>
        <li>Repartido en cinco: 10 000 ÷ 5 = $2 000 en cada empresa.</li>
        <li>Si solo una cae 50%, en ella te quedan $1 000, y las otras cuatro siguen en $2 000: 1 000 + 4 × 2 000 = $9 000.</li>
        <li>Pierdes $1 000, es decir, 1 000 ÷ 10 000 = 10% de tu cartera, en lugar de 50%.</li>
        <li>Comprueba: 10 000 − 9 000 = 1 000.</li>
      </ol>
      <p>Resultado: <span class="resultado">repartido, pierdes 10%; todo junto, 50%</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que diversificar hace que ganes más. Lo que hace es suavizar el golpe; si todas caen a la vez, también pierdes.</p>`,
    vidaReal: `
      <p>Repartir con cuidado te protege de los golpes de un solo problema:</p>
      <ul>
        <li>Si algún día inviertes, sabes que no conviene poner todo en una sola cosa.</li>
        <li>Revisas de vez en cuando si tu reparto cambió sin darte cuenta.</li>
        <li>Desconfías de quien te pide meter todos tus ahorros en un solo negocio.</li>
        <li>Entiendes por qué algunos productos de inversión reparten el dinero entre muchas empresas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Repartes $12 000 en partes iguales entre 4 inversiones. ¿Cuánto pones en cada una?</p>', respuesta: 12000 / 4,
        pista: '<p>Divide el total entre 4.</p>',
        solucion: '<p>12 000 ÷ 4 = <strong>$3 000</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una de esas 4 inversiones de $3 000 pierde 40% y las demás no cambian. ¿Cuánto vale ahora tu cartera?</p>', respuesta: 3000 * 0.6 + 3 * 3000,
        pista: '<p>Perder 40% es quedarte con el 60% de esa inversión. Suma las otras tres.</p>',
        solucion: '<p>3 000 × 0.60 = 1 800, y 1 800 + 3 × 3 000 = <strong>$10 800</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si tu cartera pasó de $12 000 a $10 800, ¿qué porcentaje perdiste?</p>', respuesta: (12000 - 10800) / 12000 * 100,
        pista: '<p>Divide la pérdida entre lo que tenías al principio.</p>',
        solucion: '<p>Perdiste 1 200, y 1 200 ÷ 12 000 = 0.10, es decir, <strong>10%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu cartera tenía $6 000 en acciones y $4 000 en bonos. Las acciones subieron a $9 000 y los bonos siguen igual. ¿Qué porcentaje de tu cartera son ahora las acciones? Redondea a un decimal.</p>', respuesta: 9000 / 13000 * 100, tolerancia: 0.1,
        pista: '<p>Divide lo que valen las acciones entre el total nuevo de la cartera.</p>',
        solucion: '<p>El total es 9 000 + 4 000 = 13 000, y 9 000 ÷ 13 000 ≈ 0.692, es decir, <strong>69.2%</strong>. Pasaste de 60% a casi 70%: tienes más riesgo que antes, y podrías rebalancear.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué hace la diversificación?</p>',
        opciones: ['Elimina todo el riesgo', 'Reduce el riesgo de perderlo todo por un solo problema, sin eliminarlo', 'Garantiza que ganes más que sin diversificar'], correcta: 1,
        pista: '<p>Recuerda que la SEC habla de "esperanza", no de garantía.</p>',
        solucion: '<p><strong>Reduce el riesgo de perderlo todo por un solo problema</strong>, pero no lo elimina ni garantiza ganancias.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el conjunto de todas tus inversiones?</p>',
        respuestas: ['cartera', 'la cartera', 'cartera de inversión', 'portafolio', 'el portafolio', 'portafolio de inversión'],
        pista: '<p>Es el mismo nombre del objeto donde guardas tu dinero en el bolsillo.</p>',
        solucion: '<p>Tu <strong>cartera</strong>.</p>' },
    ],
    fuentes: [SEC_CARTERA, FPT_PRODUCTOS, REV_ESFUME],
  });

  // ------------------------------------------------------------------
  L('Instrumentos de inversión: deuda, fondos y acciones', {
    objetivo: 'Distinguir la renta fija, las acciones y los fondos de inversión, saber cómo se gana y qué riesgos tiene cada uno, y qué revisar antes de elegir.',
    explicacion: `
      <p>Imagina dos formas de usar tus ahorros. En la primera, le prestas dinero a alguien que promete devolvértelo con intereses en una fecha. En la segunda, compras una parte de un negocio y ganas si al negocio le va bien. Casi todas las inversiones son una de esas dos ideas, o una mezcla de ambas.</p>
      <h3>Prestar: la renta fija</h3>
      <p>La <strong>renta fija</strong> es invertir prestándole dinero a un gobierno o a una empresa. Según Finanzas para todos, del Banco de España y la CNMV, quien compra uno de estos títulos se vuelve acreedor de quien lo emite. Es lo que viste en "Haz la lista de todas tus deudas", pero del otro lado: aquí tú eres quien presta. Los más conocidos son las letras y los bonos; en España, por ejemplo, según esa página consultada en 2026, las letras del Tesoro duran de 3 a 12 meses y los bonos del Estado, 3 o 5 años. Cada país tiene los suyos.</p>
      <p>Finanzas para todos aclara que renta fija no quiere decir rendimiento fijo ni ausencia de riesgo. Tiene tres riesgos principales: que su precio baje si suben las tasas de interés, que quieras venderla y nadie la compre, y que quien te debe no te pague.</p>
      <h3>Ser socio: las acciones</h3>
      <p>Una <strong>acción</strong> es una parte de una empresa. Quien compra acciones se vuelve socio, dueño de un pedacito del negocio. Según Finanzas para todos, se gana de dos formas: recibiendo dividendos, que son una parte de las ganancias que la empresa reparte, o vendiendo las acciones más caras de lo que costaron.</p>
      <p>Su rendimiento no se conoce de antemano. Depende de la empresa y también de la economía, las tasas de interés y la inflación. Finanzas para todos subraya que lo que una acción hizo en el pasado no garantiza lo que hará en el futuro.</p>
      <h3>Juntar dinero con otros: los fondos</h3>
      <p>Un <strong>fondo de inversión</strong> junta el dinero de muchas personas y lo invierte en renta fija, en acciones o en una mezcla. Cada persona tiene una parte del fondo, y una empresa gestora decide en qué invertir. Según Finanzas para todos, sus ventajas son llegar a inversiones que no estarían a tu alcance, una administración profesional y la diversificación, porque los fondos están obligados a repartir el dinero, como viste en "Diversificación". El valor de tu parte sube y baja con lo que tenga el fondo.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Pregunta</th><th>Renta fija</th><th>Acciones</th><th>Fondo de inversión</th></tr>
        <tr><th>¿Qué eres?</th><td>Acreedor: prestas</td><td>Socio de una empresa</td><td>Dueño de una parte del fondo</td></tr>
        <tr><th>¿Cómo ganas?</th><td>Con intereses</td><td>Con dividendos y si sube el precio</td><td>Con lo que ganen sus inversiones</td></tr>
        <tr><th>¿Qué riesgo tiene?</th><td>Que baje el precio, no poder vender o que no te paguen</td><td>El rendimiento no se conoce de antemano</td><td>Depende de en qué invierte</td></tr>
      </table></div>
      <h3>Antes de elegir</h3>
      <ul>
        <li>No inviertas en algo que no entiendes. Finanzas para todos lo dice así: si no sabes explicar cómo funciona una inversión, no la hagas.</li>
        <li>Pregunta por las comisiones, porque reducen tu rendimiento, a veces mucho.</li>
        <li>Usa solo intermediarios autorizados y verifícalos en el registro oficial de tu país, como viste en "Esquemas piramidales y promesas de dinero fácil".</li>
      </ul>
      <p>En la materia Finanzas y economía, en la unidad Mercados financieros, verás con más detalle las acciones, los bonos y la bolsa de valores.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que "renta fija" significa que siempre ganas lo mismo. Su precio también sube y baja, y quien te debe podría no pagarte.</p>`,
    ejemplo: `
      <p>Compras 20 acciones a $150 cada una. En el año, la empresa reparte un dividendo de $4 por acción, y al final vendes tus acciones a $165. Las cifras son de ejemplo. ¿Cuánto ganaste y cuál fue tu rendimiento?</p>
      <ol class="pasos-ej">
        <li>Calcula cuánto pagaste: 20 × 150 = $3 000.</li>
        <li>Calcula los dividendos: 20 × 4 = $80.</li>
        <li>Calcula la venta: 20 × 165 = $3 300, así que ganas 3 300 − 3 000 = $300 por la subida del precio.</li>
        <li>Suma las dos ganancias: 300 + 80 = $380. Tu rendimiento es 380 ÷ 3 000 ≈ 0.127, es decir, alrededor de 12.7%.</li>
        <li>Mira el otro lado: si el precio hubiera bajado a $135, la venta habría dado 20 × 135 = 2 700, y con los dividendos tu resultado sería 2 700 + 80 − 3 000 = −$220.</li>
      </ol>
      <p>Resultado: <span class="resultado">ganaste $380, un rendimiento de alrededor de 12.7%</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar las comisiones por comprar y vender, que también se restan de tu ganancia.</p>`,
    vidaReal: `
      <p>Saber qué hay detrás de cada inversión te permite hacer las preguntas correctas:</p>
      <ul>
        <li>Cuando alguien te ofrezca "invertir", puedes preguntar si estarías prestando, haciéndote socio o entrando a un fondo, que junta el dinero de muchas personas.</li>
        <li>Sabes qué preguntar sobre comisiones antes de entregar tu dinero.</li>
        <li>Entiendes las noticias cuando dicen que el precio de una empresa subió o bajó.</li>
        <li>Recuerdas que ninguna de estas formas garantiza ganar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Compras 10 acciones a $200 cada una. ¿Cuánto pagas?</p>', respuesta: 10 * 200,
        pista: '<p>Multiplica el número de acciones por su precio.</p>',
        solucion: '<p>10 × 200 = <strong>$2 000</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Esas 10 acciones pagan un dividendo de $6 cada una. ¿Cuánto recibes?</p>', respuesta: 10 * 6,
        pista: '<p>Multiplica el dividendo por el número de acciones.</p>',
        solucion: '<p>10 × 6 = <strong>$60</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Vendes esas 10 acciones a $180 cada una, después de comprarlas a $200. ¿Cuánto ganas o pierdes por el cambio de precio? (Si pierdes, escribe un número negativo.)</p>', respuesta: 10 * 180 - 10 * 200,
        pista: '<p>Resta lo que pagaste a lo que recibes al vender.</p>',
        solucion: '<p>10 × 180 = 1 800 y 1 800 − 2 000 = <strong>−200</strong>: pierdes $200 por el precio, aunque recibiste $60 de dividendos.</p>' },
      { tipo: 'numero', enunciado: '<p>Compras un bono de $5 000 que paga 6% al año. ¿Cuánto interés recibes en un año?</p>', respuesta: 5000 * 0.06,
        pista: '<p>Saca el 6% de 5 000, como en "Interés simple".</p>',
        solucion: '<p>0.06 × 5 000 = <strong>$300</strong>, si quien lo emitió te paga como prometió.</p>' },
      { tipo: 'opciones', enunciado: '<p>Si compras un bono, ¿qué eres de quien lo emitió?</p>',
        opciones: ['Acreedor: le prestaste dinero', 'Socio de su negocio', 'Dueño de una parte de su banco'], correcta: 0,
        pista: '<p>La renta fija es prestar.</p>',
        solucion: '<p><strong>Acreedor.</strong> Le prestaste dinero y te debe devolverlo con intereses. El socio es quien compra acciones.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama una parte de una empresa que te vuelve socio del negocio?</p>',
        respuestas: ['acción', 'una acción', 'acciones', 'las acciones'],
        pista: '<p>Se compran y se venden en la bolsa de valores.</p>',
        solucion: '<p>Una <strong>acción</strong>.</p>' },
    ],
    fuentes: [FPT_PRODUCTOS, FPT_PASOS, SEC_CARTERA],
  });

  // ------------------------------------------------------------------
  L('Invertir a largo plazo', {
    objetivo: 'Elegir inversiones según tu horizonte temporal, entender por qué el tiempo ayuda y calcular cómo funcionan las aportaciones periódicas.',
    explicacion: `
      <p>Inviertes en un fondo y, a los dos meses, su valor baja 10%. La tentación es vender para "no perder más". Muchas veces, esa es justo la decisión que convierte una baja pasajera en una pérdida real. Para entender por qué, hay que pensar en el tiempo.</p>
      <h3>Tu horizonte</h3>
      <p>El <strong>horizonte temporal</strong> es el número de meses, años o décadas que piensas mantener una inversión para lograr una meta. Así lo define la Comisión de Bolsa y Valores de Estados Unidos (SEC). Es como el plazo de "Metas de ahorro", pero para invertir. Según la SEC, quien tiene un horizonte largo puede sentirse cómodo con inversiones más arriesgadas, y quien tiene uno corto suele preferir las menos arriesgadas.</p>
      <p>Finanzas para todos, del Banco de España y la CNMV, da un ejemplo: no conviene invertir en acciones el dinero que vas a necesitar en menos de 3 años. Sus precios pueden subir y bajar mucho, y si tienes que vender durante una baja, puedes perder. Con un horizonte largo, en cambio, puedes esperar a que el precio se recupere, aunque nadie garantiza que lo haga.</p>
      <h3>El tiempo trabaja a tu favor</h3>
      <p>Como viste en "Interés compuesto: la fuerza del tiempo", lo que ganas también puede generar ganancias, y ese efecto crece con los años. La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, lo dice así: el dinero no crece de un día para otro, y en general los plazos más largos ofrecen mejores rendimientos. También advierte que las promesas de hacerse rico muy rápido suelen ser fraudes.</p>
      <p>No invertir también tiene un costo: si tu dinero guardado rinde menos que la inflación, pierde poder adquisitivo, como viste en "Tasa nominal y tasa real".</p>
      <h3>Aportar poco a poco</h3>
      <p>Una forma sencilla de invertir a largo plazo es hacer <strong>aportaciones periódicas</strong>: invertir la misma cantidad cada cierto tiempo, por ejemplo cada mes, sin importar si el precio subió o bajó. La SEC explica que así compras más partes cuando el precio está bajo y menos cuando está alto, y que esto ayuda a manejar el riesgo. Además, no tienes que adivinar cuál es "el mejor momento" para entrar.</p>
      <h3>Durante el camino</h3>
      <ul>
        <li>No vendas por pánico cuando el precio baje, como recomienda la CONDUSEF; antes, recuerda para cuándo es tu meta.</li>
        <li>Revisa tus inversiones de vez en cuando y rebalancea si tu reparto cambió, como en "Diversificación".</li>
        <li>A medida que se acerca tu meta, puedes pasar poco a poco a inversiones menos arriesgadas; la SEC explica que algunos fondos hacen eso por ti. Lo verás en "Retiro y pensiones".</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> mirar tu inversión todos los días y reaccionar a cada subida y bajada. Para una meta a 10 años, una semana mala dice muy poco de cómo terminará.</p>`,
    ejemplo: `
      <p>Durante cuatro meses inviertes $1 000 cada mes en un fondo, sin importar su precio. Las cifras son de ejemplo:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Mes</th><th>Precio de cada parte</th><th>Partes que compras</th></tr>
        <tr><th>1</th><td>$50</td><td>1 000 ÷ 50 = 20</td></tr>
        <tr><th>2</th><td>$40</td><td>1 000 ÷ 40 = 25</td></tr>
        <tr><th>3</th><td>$25</td><td>1 000 ÷ 25 = 40</td></tr>
        <tr><th>4</th><td>$50</td><td>1 000 ÷ 50 = 20</td></tr>
      </table></div>
      <ol class="pasos-ej">
        <li>Suma las partes: 20 + 25 + 40 + 20 = 105 partes, por las que pagaste 4 × 1 000 = $4 000.</li>
        <li>Calcula tu costo promedio por parte: 4 000 ÷ 105 ≈ $38.10. Es menos que el precio promedio de los cuatro meses, (50 + 40 + 25 + 50) ÷ 4 = $41.25.</li>
        <li>Calcula lo que vale todo al final, al precio del mes 4: 105 × 50 = $5 250.</li>
        <li>El precio terminó igual que al principio, y aun así ganas 5 250 − 4 000 = $1 250, porque compraste más partes cuando estaba barato.</li>
      </ol>
      <p>Resultado: <span class="resultado">105 partes con un costo promedio de unos $38.10 y una ganancia de $1 250</span>.</p>
      <p class="nota"><strong>Error común:</strong> dejar de aportar en el mes 3, cuando el precio bajó a $25. Justo ese mes fue cuando más partes compraste.</p>`,
    vidaReal: `
      <p>Pensar a largo plazo te ayuda a mantener la calma y a seguir aportando:</p>
      <ul>
        <li>Si el valor de lo que inviertes baja, recuerdas tu meta antes de decidir.</li>
        <li>Puedes invertir una cantidad pequeña cada mes, en lugar de esperar a tener mucho dinero.</li>
        <li>Sabes que el dinero que necesitarás pronto no debe estar en inversiones arriesgadas.</li>
        <li>Desconfías de las promesas de hacerte rico en pocos meses.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Inviertes $600 al mes. Este mes, cada parte del fondo cuesta $30. ¿Cuántas partes compras?</p>', respuesta: 600 / 30,
        pista: '<p>Divide lo que inviertes entre el precio de cada parte.</p>',
        solucion: '<p>600 ÷ 30 = <strong>20 partes</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Durante tres meses inviertes $600 cada mes, con precios de $40, $30 y $20 por parte. ¿Cuántas partes tienes en total?</p>', respuesta: 600 / 40 + 600 / 30 + 600 / 20,
        pista: '<p>Calcula las partes de cada mes y súmalas.</p>',
        solucion: '<p>15 + 20 + 30 = <strong>65 partes</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si pagaste $1 800 por esas 65 partes, ¿cuál fue tu costo promedio por parte? Redondea a dos decimales.</p>', respuesta: 1800 / 65, tolerancia: 0.01,
        pista: '<p>Divide lo que pagaste entre el número de partes.</p>',
        solucion: '<p>1 800 ÷ 65 ≈ <strong>$27.69</strong>, menos que el precio promedio de los tres meses, que fue $30.</p>' },
      { tipo: 'opciones', enunciado: '<p>Vas a necesitar un dinero dentro de 2 años. Según Finanzas para todos, ¿conviene invertirlo en acciones?</p>',
        opciones: ['Sí, porque las acciones siempre suben', 'No conviene: es dinero que vas a necesitar en menos de 3 años', 'Sí, si vendes y compras cada semana'], correcta: 1,
        pista: '<p>Recuerda el ejemplo de los 3 años.</p>',
        solucion: '<p><strong>No conviene.</strong> Si tienes que vender en un momento de baja, podrías perder justo cuando necesitas el dinero.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tu inversión para una meta dentro de 15 años bajó 10% este mes. ¿Qué es lo más prudente?</p>',
        opciones: ['Vender todo de inmediato para no perder más', 'Pedir un préstamo para comprar más', 'Recordar tu horizonte, revisar tu plan y no decidir por pánico'], correcta: 2,
        pista: '<p>Una baja en un mes dice poco de una meta a 15 años.</p>',
        solucion: '<p><strong>Recordar tu horizonte, revisar tu plan y no decidir por pánico.</strong> Vender en la baja convierte una baja pasajera en una pérdida real.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el tiempo que piensas mantener una inversión para lograr tu meta?</p>',
        respuestas: ['horizonte temporal', 'el horizonte temporal', 'horizonte', 'horizonte de inversión', 'el horizonte'],
        pista: '<p>Son dos palabras: la primera es la línea donde parece que se juntan el cielo y la tierra.</p>',
        solucion: '<p>El <strong>horizonte temporal</strong>.</p>' },
    ],
    fuentes: [SEC_CARTERA, SEC_PERIODICAS, FPT_PASOS, REV_MIEDO, REV_ETF],
  });
})();
