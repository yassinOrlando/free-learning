// Finanzas personales · Unidad 2: Presupuesto.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Sin consejos personalizados ni productos por su nombre. Tasas, leyes y estadísticas van con su país, su año y su fuente.
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
  // Gráfica de pastel (máximo 3 sectores, uno por color validado), con porcentaje dentro y nombre afuera.
  function pastel({ etiquetas, valores, descripcion }) {
    const total = valores.reduce((a, b) => a + b, 0);
    let inicio = 90; // empieza arriba y avanza en sentido de las manecillas
    const figuras = [];
    valores.forEach((v, i) => {
      const barrido = (v / total) * 360, fin = inicio - barrido, medio = ((inicio + fin) / 2) * Math.PI / 180;
      const arco = Array.from({ length: 41 }, (_, k) => {
        const g = (inicio - (barrido * k) / 40) * Math.PI / 180;
        return [Math.cos(g), Math.sin(g)];
      });
      figuras.push({ tipo: 'poligono', puntos: [[0, 0], ...arco], solido: true, serie: i });
      figuras.push(txt(0.6 * Math.cos(medio), 0.6 * Math.sin(medio), `${Math.round((v / total) * 100)}%`));
      figuras.push(txt((1.32 - 0.3 * Math.min(0, Math.cos(medio))) * Math.cos(medio), 1.22 * Math.sin(medio), etiquetas[i]));
      inicio = fin;
    });
    return G({ x: [-1.9, 1.9], y: [-1.45, 1.45], proporcional: true, ejes: false, figuras, descripcion });
  }

  const FPT = (ruta, nombre) => ({ nombre: `Finanzas para todos (Banco de España y CNMV): ${nombre}`, url: `https://www.finanzasparatodos.es/${ruta}` });
  const REV = (ruta, nombre) => ({ nombre: `CONDUSEF (México), Revista Proteja su Dinero: ${nombre}`, url: `https://revista.condusef.gob.mx/${ruta}/` });
  const CONDUSEF = { nombre: 'CONDUSEF (México): Conduguía, Cómo hacer un presupuesto (PDF)', url: 'https://www.gob.mx/cms/uploads/attachment/file/475636/como_hacer_un_presupuesto.pdf' };
  const BANSEFI = { nombre: 'Bansefi, hoy Banco del Bienestar (México): Mi Cartilla Financiera (PDF)', url: 'https://www.gob.mx/cms/uploads/attachment/file/408445/Cartilla_Financiera_GenericaV2.pdf' };
  const NDSU = { nombre: 'Extensión de la Universidad Estatal de Dakota del Norte (NDSU): 50/30/20 Budget (PDF, en inglés)', url: 'https://ndsu.edu/agriculture/sites/default/files/2024-08/fe222h.pdf' };
  const FPT_PRESUPUESTO = FPT('como-elaborar-un-presupuesto', '¿Cómo elaborar un presupuesto?');
  const REV_5030 = REV('presupuesto/ingresos/2019/06/un-presupuesto-para-millennials', 'Un presupuesto para millennials');
  const REV_PRES = REV('presupuesto/presupuestos/2021/03/como-hacer-un-presupuesto-y-ahorrar-facilmente', 'Cómo hacer un presupuesto y ahorrar fácilmente');
  const REV_HORMIGA = REV('usuario-inteligente/a-tu-favor/2019/11/que-tu-bolsillo-no-sufra-con-los-gastos-hormiga', 'Que tu bolsillo no sufra con los gastos hormiga');
  const REV_TRABAJO = REV('presupuesto/gastos/2024/06/gastos-hormiga-en-tu-rutina-de-trabajo', 'Gastos hormiga en tu rutina de trabajo');

  // ------------------------------------------------------------------
  const PASOS = diagrama([0, 12], [0, 5], [
    caja(0.3, 3.2, 3.3, 4.6), txt(1.8, 3.9, '1. ingresos'),
    caja(4.5, 3.2, 7.5, 4.6), txt(6, 3.9, '2. gastos'),
    caja(8.7, 3.2, 11.7, 4.6), txt(10.2, 3.9, '3. metas'),
    caja(8.7, 0.3, 11.7, 1.7), txt(10.2, 1.0, '4. balance'),
    caja(4.5, 0.3, 7.5, 1.7, true), txt(6, 1.0, '5. excedente'),
    ...flecha([3.35, 3.9], [4.45, 3.9], 0, 1.2), ...flecha([7.55, 3.9], [8.65, 3.9], 0, 1.2),
    ...flecha([10.2, 3.15], [10.2, 1.75], 0, 1.2), ...flecha([8.65, 1.0], [7.55, 1.0], 0, 1.2),
  ], 'Cinco cajas unidas por flechas, en orden: 1, ingresos; 2, gastos; 3, metas, en la fila de arriba de izquierda a derecha. Una flecha baja a 4, balance, y otra va a la izquierda hasta 5, excedente, que está sombreada.');

  L('Hacer tu primer presupuesto', {
    objetivo: 'Armar un presupuesto mensual en cinco pasos, apartar el ahorro antes de gastar y reservar dinero para los imprevistos.',
    explicacion: `
      <p>En "Ingresos y gastos" aprendiste a sumar lo que entró, restar lo que salió y ver tu saldo. Eso te dice qué pasó el mes pasado. Ahora piensa en la lista del súper: la haces antes de ir a la tienda, no al salir. Con el dinero del mes conviene hacer lo mismo.</p>
      <h3>Un plan para tu dinero</h3>
      <p>Un <strong>presupuesto</strong> es un plan escrito de cuánto dinero vas a recibir en un periodo y en qué lo vas a usar. La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, recomienda hacerlo por escrito y no de memoria, porque así es más fácil organizar las cuentas. También aconseja hacerlo cada mes, porque es el plazo en que se pagan casi todos los servicios.</p>
      <p>Fíjate en la diferencia con el saldo. El saldo mira hacia atrás y el presupuesto mira hacia adelante. Al final del mes los comparas, como verás en "Registrar y revisar tus gastos".</p>
      ${PASOS}
      <h3>Cinco pasos</h3>
      <ol>
        <li>Anota tus ingresos del mes. Si una parte es variable, usa una cantidad prudente y no la del mejor mes. La CONDUSEF aconseja cubrir las necesidades básicas con los ingresos fijos, porque son los que seguro llegan.</li>
        <li>Anota tus gastos. Además de los fijos y los variables, la cartilla de Bansefi pide contar los <strong>imprevistos</strong>: gastos que no sabes cuándo llegarán, como un aparato que se descompone, una enfermedad o un regalo. No sabes cuánto costarán, pero sí que alguno llegará; por eso conviene apartar una cantidad para ellos.</li>
        <li>Escribe tus metas: qué quieres lograr, cuánto cuesta y en cuánto tiempo, por ejemplo juntar para una estufa o para un curso.</li>
        <li>Saca el balance: ingresos menos gastos planeados. Es la misma resta del saldo, pero con lo que planeas.</li>
        <li>Busca que te sobre algo, un excedente, y destínalo a tus metas. Si el balance sale negativo, recorta primero los deseos, como viste en "Necesidades y deseos".</li>
      </ol>
      <h3>El ahorro va primero</h3>
      <p>Mucha gente ahorra "lo que sobre" al final del mes, y casi nunca sobra nada. Finanzas para todos, el sitio de educación financiera del Banco de España y la CNMV, propone lo contrario: <strong>págate primero</strong>. Es decir, en cuanto recibes tu dinero, apartas una cantidad fija para ti, como si fuera un pago más, y después repartes lo demás. La CONDUSEF lo dice de forma parecida: trata el ahorro y el pago de tus deudas como dos gastos fijos más de tu presupuesto.</p>
      <p>¿Cuánto apartar? Depende de cada persona. La cartilla de Bansefi, en México, sugiere destinar al menos el 10% de tus ingresos. Si hoy no puedes, empieza con menos: lo importante es el hábito. En la unidad Ahorro verás para qué usar ese dinero.</p>
      <p>Finanzas para todos agrega un consejo: si un día tus ingresos suben, no dejes que tus gastos suban en la misma cantidad. Así el aumento también se nota en tu ahorro.</p>
      <p>Al principio tus cifras no van a ser exactas, y está bien. La CONDUSEF lo aclara: el primer objetivo no es ser preciso, sino empezar a poner orden en tu dinero.</p>
      <p class="nota"><strong>Trampa común:</strong> hacer el presupuesto con el mejor mes que has tenido. Si un mes recibiste muchas propinas, planear con esa cifra te deja corto en los meses normales.</p>`,
    ejemplo: `
      <p>Tu sueldo neto es de $12 000 al mes. Tus gastos fijos son renta, $4 000; comida, $3 000; transporte, $1 000, y servicios, $800. Quieres apartar el 10% para ahorro y $500 para imprevistos. Las cifras son de ejemplo. ¿Cuánto te queda para tus gastos variables?</p>
      <ol class="pasos-ej">
        <li>Págate primero: el 10% de 12 000 es 1 200, porque basta con dividir entre 10. Ese ahorro se aparta antes que todo lo demás.</li>
        <li>Suma los gastos fijos: 4 000 + 3 000 + 1 000 + 800 = $8 800.</li>
        <li>Suma todo lo que ya tiene destino: 1 200 + 8 800 + 500 = $10 500.</li>
        <li>Resta del ingreso: 12 000 − 10 500 = $1 500. Eso queda para los gastos variables, como ropa o salidas.</li>
        <li>Comprueba que cada peso tiene un destino: 1 200 + 8 800 + 500 + 1 500 = 12 000.</li>
      </ol>
      <p>Resultado: <span class="resultado">te quedan $1 500 para gastos variables</span>.</p>
      <p class="nota"><strong>Error común:</strong> dejar el ahorro para el final, después de los gastos variables. Si los variables se pasan, el ahorro desaparece.</p>`,
    vidaReal: `
      <p>Planear tu dinero antes de gastarlo cambia cómo vives el mes:</p>
      <ul>
        <li>Es más fácil llegar al final del mes sin pedir prestado.</li>
        <li>Sabes con tiempo si te alcanza para una compra grande o si conviene esperar.</li>
        <li>Cuando se descompone algo en casa, ya tienes un dinero apartado para eso.</li>
        <li>Puedes hablar de dinero con tu familia con números claros, no con suposiciones.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Recibes $15 000 netos al mes. Si te pagas primero el 10%, ¿cuánto apartas para tu ahorro?</p>', respuesta: 15000 * 10 / 100,
        pista: '<p>Sacar el 10% es dividir entre 10.</p>',
        solucion: '<p>15 000 ÷ 10 = <strong>$1 500</strong>. Lo apartas en cuanto te pagan, antes de los demás gastos.</p>' },
      { tipo: 'numero', enunciado: '<p>Te pagan $5 500 cada quincena. ¿Cuánto recibes al mes para tu presupuesto?</p>', respuesta: 5500 * 2,
        pista: '<p>Un mes tiene dos quincenas.</p>',
        solucion: '<p>5 500 × 2 = <strong>$11 000</strong> al mes. Conviene planear con el total del mes, porque la mayoría de los servicios se pagan cada mes.</p>' },
      { tipo: 'numero', enunciado: '<p>Tus ingresos del mes son $10 000. Apartas $1 000 de ahorro, tus gastos fijos suman $7 200 y reservas $400 para imprevistos. ¿Cuánto queda para gastos variables?</p>', respuesta: 10000 - 1000 - 7200 - 400,
        pista: '<p>Suma todo lo que ya tiene destino y réstalo del ingreso.</p>',
        solucion: '<p>1 000 + 7 200 + 400 = 8 600, y 10 000 − 8 600 = <strong>$1 400</strong> para gastos variables.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la idea de "págate primero", ¿cuándo apartas tu ahorro?</p>',
        opciones: ['Al final del mes, con lo que sobre', 'En cuanto recibes tu dinero, antes de los demás gastos', 'Solo los meses en que te dan un bono'], correcta: 1,
        pista: '<p>La idea es tratar el ahorro como un pago más, no como un sobrante.</p>',
        solucion: '<p><strong>En cuanto recibes tu dinero.</strong> Si esperas al final del mes, casi nunca sobra nada.</p>' },
      { tipo: 'opciones', enunciado: '<p>En los últimos tres meses recibiste $800, $1 000 y $2 500 de propinas. ¿Con qué cantidad conviene planear tu presupuesto?</p>',
        opciones: ['Con una cantidad prudente, como la del mes más bajo, $800', 'Con $2 500, que fue el mejor mes', 'Con la suma de los tres meses, $4 300'], correcta: 0,
        pista: '<p>Piensa qué pasa si planeas con mucho y luego llega un mes normal.</p>',
        solucion: '<p><strong>Con una cantidad prudente, como $800.</strong> Si planeas con $2 500, un mes normal te deja corto. La suma de tres meses no es lo que recibes en uno.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama un gasto que no sabes cuándo va a llegar, como un aparato que se descompone o una enfermedad?</p>',
        respuestas: ['imprevisto', 'un imprevisto', 'el imprevisto', 'imprevistos', 'gasto imprevisto', 'gastos imprevistos'],
        pista: '<p>Es algo que no estaba "previsto".</p>',
        solucion: '<p>Un <strong>imprevisto</strong>. Por eso conviene apartar una cantidad para ellos en el presupuesto.</p>' },
    ],
    fuentes: [CONDUSEF, BANSEFI, FPT_PRESUPUESTO, REV_PRES],
  });

  // ------------------------------------------------------------------
  const REPARTO = pastel({
    etiquetas: ['necesidades', 'gustos', 'ahorro'], valores: [50, 30, 20],
    descripcion: 'Gráfica de pastel del sueldo neto en tres partes: necesidades, 50%, la mitad del círculo; gustos, 30%; ahorro, 20%.',
  });

  L('La regla 50/30/20', {
    objetivo: 'Repartir el sueldo neto con la regla 50/30/20, calcular cada parte y saber cuándo conviene ajustarla.',
    explicacion: `
      <p>Ya sabes hacer un presupuesto, pero la primera vez cuesta decidir cuánto poner en cada cosa. ¿Cuánto es razonable para la renta y la comida? ¿Cuánto para salir? ¿Cuánto guardar? Una guía sencilla te da un punto de partida mientras conoces tus propios números.</p>
      <h3>Tres partes de tu sueldo</h3>
      <p>La <strong>regla 50/30/20</strong> reparte tu ingreso neto en tres partes. La CONDUSEF y la extensión de la Universidad Estatal de Dakota del Norte (NDSU), en Estados Unidos, la explican así:</p>
      <ul>
        <li>El 50% va a los gastos necesarios: comida, vivienda, luz, agua, teléfono, transporte y los pagos de tus deudas.</li>
        <li>El 30% va a los gustos, como salir al cine o a comer, una prenda que te gustó o una suscripción para ver películas.</li>
        <li>El 20% va al ahorro, que la CONDUSEF sugiere dividir entre metas cercanas y metas lejanas.</li>
      </ul>
      ${REPARTO}
      <p>Fíjate que las dos primeras partes son las que viste en "Necesidades y deseos": el 50% cubre necesidades y el 30% deseos. La regla solo les pone un tamaño.</p>
      <h3>¿Por qué sobre el neto?</h3>
      <p>Los porcentajes se calculan sobre el sueldo neto, el que de verdad llega a tu bolsillo, como viste en "Cómo leer tu recibo de sueldo". Si los calcularas sobre el bruto, estarías repartiendo dinero que nunca recibes, porque las deducciones ya se fueron.</p>
      <h3>Cómo se calcula</h3>
      <p>Como viste en "Porcentajes", el 50% es la mitad y el 10% es dividir entre 10; el 20% y el 30% son dos y tres veces ese 10%. Si tu neto es de $10 000, el 10% es $1 000. Así que van $5 000 a necesidades, $3 000 a gustos y $2 000 al ahorro. Como 50 + 30 + 20 = 100, las tres partes siempre suman tu sueldo completo: 5 000 + 3 000 + 2 000 = 10 000.</p>
      <p>La CONDUSEF llama al 20% "el deber": es dinero que no se toca. En cambio, si un mes no gastas todo el 30% de gustos, la NDSU sugiere sumar lo que sobre al ahorro. Los gustos pueden pasar al ahorro, pero el ahorro no pasa a los gustos.</p>
      <h3>Una guía, no una ley</h3>
      <p>La regla es un punto de partida, no una obligación. Si tu renta es alta o tienes muchos gastos necesarios, la CONDUSEF propone moverla, por ejemplo a 60% para pagos, 20% para gustos y 20% para ahorro. También recuerda que lo importante es empezar a ahorrar, sin importar la cantidad. Lo útil de la regla es que te obliga a ver cuánto va a cada parte y a guardar un lugar para el ahorro desde el principio, en lugar de ahorrar "lo que sobre".</p>
      <p class="nota"><strong>Trampa común:</strong> aplicar la regla al sueldo bruto. Con un bruto de $10 000 y un neto de $8 300, el 50% para necesidades no es $5 000, sino $4 150.</p>`,
    ejemplo: `
      <p>La CONDUSEF usa este ejemplo: un sueldo neto de $7 500 al mes, como el de una persona que acaba de terminar sus estudios en México. ¿Cuánto va a cada parte con la regla 50/30/20?</p>
      <ol class="pasos-ej">
        <li>Calcula primero el 10%, que te sirve de base para todo: 7 500 ÷ 10 = $750.</li>
        <li>Necesidades, el 50%, es la mitad del sueldo: 7 500 ÷ 2 = $3 750.</li>
        <li>Gustos, el 30%, son tres veces el 10%: 3 × 750 = $2 250.</li>
        <li>Ahorro, el 20%, son dos veces el 10%: 2 × 750 = $1 500.</li>
        <li>Comprueba que no falta ni sobra nada: 3 750 + 2 250 + 1 500 = 7 500, el sueldo completo.</li>
      </ol>
      <p>Resultado: <span class="resultado">$3 750 a necesidades, $2 250 a gustos y $1 500 al ahorro</span>.</p>
      <p class="nota"><strong>Error común:</strong> calcular el 30% y el 20% sobre lo que quedó después de quitar el 50%. Las tres partes se calculan sobre el sueldo neto completo.</p>`,
    vidaReal: `
      <p>Tener una guía para repartir tu sueldo te ayuda desde el primer día de pago:</p>
      <ul>
        <li>Cuando recibes tu primer sueldo, tienes una forma rápida de repartirlo sin gastarlo todo en la primera semana.</li>
        <li>Si tu renta se lleva más de la mitad de lo que ganas, lo notas enseguida.</li>
        <li>Puedes darte gustos sin culpa, porque ya tienen su lugar.</li>
        <li>Guardar una parte fija cada mes se vuelve un hábito.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tu sueldo neto es de $9 000 al mes. Con la regla 50/30/20, ¿cuánto va a necesidades?</p>', respuesta: 9000 * 50 / 100,
        pista: '<p>El 50% es la mitad.</p>',
        solucion: '<p>La mitad de 9 000 es <strong>$4 500</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu sueldo neto es de $15 000 al mes. ¿Cuánto va al ahorro con la regla 50/30/20?</p>', respuesta: 15000 * 20 / 100,
        pista: '<p>Saca el 10% y multiplícalo por 2.</p>',
        solucion: '<p>El 10% de 15 000 es 1 500, así que el 20% es 2 × 1 500 = <strong>$3 000</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu sueldo bruto es de $12 000 y tu neto es de $10 000. Con la regla 50/30/20, ¿cuánto va a gustos?</p>', respuesta: 10000 * 30 / 100,
        pista: '<p>¿Sobre cuál de los dos sueldos se calcula la regla?</p>',
        solucion: '<p>La regla se aplica al neto: el 30% de 10 000 es 3 × 1 000 = <strong>$3 000</strong>. Si usaras el bruto, repartirías dinero que no recibes.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu neto es de $8 000. Este mes, de lo que tenías para gustos solo gastaste $1 900. Si sumas lo que sobró al ahorro, ¿cuánto ahorras en total este mes?</p>', respuesta: 8000 * 0.2 + (8000 * 0.3 - 1900),
        pista: '<p>Calcula el 30% y el 20% de 8 000. Luego ve cuánto sobró de los gustos.</p>',
        solucion: '<p>Para gustos tenías 2 400 y gastaste 1 900, así que sobraron 500. El ahorro era 1 600, y con lo que sobró queda 1 600 + 500 = <strong>$2 100</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿En qué parte de la regla 50/30/20 va una suscripción para ver películas?</p>',
        opciones: ['En el 50% de necesidades', 'En el 30% de gustos', 'En el 20% de ahorro'], correcta: 1,
        pista: '<p>¿Pones en riesgo tu salud o tu casa si no la tienes?</p>',
        solucion: '<p><strong>En el 30% de gustos.</strong> Es agradable, pero puedes vivir bien sin ella.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tu renta y tus demás gastos necesarios se llevan el 60% de tu sueldo neto. ¿Qué propone la CONDUSEF?</p>',
        opciones: ['Dejar de ahorrar hasta que bajen tus gastos', 'Pagar parte de la renta con el dinero del ahorro', 'Ajustar la regla, por ejemplo a 60% para pagos, 20% para gustos y 20% para ahorro'], correcta: 2,
        pista: '<p>Recuerda que la regla es un punto de partida, no una ley.</p>',
        solucion: '<p><strong>Ajustar la regla</strong>, por ejemplo a 60/20/20. Así sigues guardando un lugar para el ahorro aunque tus gastos necesarios sean altos.</p>' },
    ],
    fuentes: [REV_5030, REV_PRES, NDSU],
  });

  // ------------------------------------------------------------------
  const CICLO = diagrama([0, 12], [0, 6.6], [
    caja(4.5, 5.1, 7.5, 6.3), txt(6, 5.7, 'planear'),
    caja(8.5, 2.6, 11.5, 3.8), txt(10, 3.2, 'registrar'),
    caja(4.5, 0.2, 7.5, 1.4), txt(6, 0.8, 'revisar'),
    caja(0.5, 2.6, 3.5, 3.8), txt(2, 3.2, 'ajustar'),
    ...flecha([7.6, 5.4], [9.6, 3.95], 0, 1.3), ...flecha([9.6, 2.45], [7.6, 1.1], 0, 1.3),
    ...flecha([4.4, 1.1], [2.4, 2.45], 0, 1.3), ...flecha([2.4, 3.95], [4.4, 5.4], 0, 1.3),
    txt(6, 3.2, 'cada mes'),
  ], 'Un ciclo de cuatro cajas unidas por flechas en el sentido de las manecillas del reloj: planear, arriba; registrar, a la derecha; revisar, abajo; ajustar, a la izquierda, que regresa a planear. En el centro dice "cada mes".');

  L('Registrar y revisar tus gastos', {
    objetivo: 'Llevar un registro de gastos, agruparlo en categorías y comparar lo planeado con lo real para ajustar tu presupuesto.',
    explicacion: `
      <p>En tu presupuesto escribiste $2 000 para comida. Llega el fin de mes y te preguntas: ¿cuánto gasté de verdad? Si no lo anotaste, solo puedes adivinar. Por eso un presupuesto necesita dos compañeros: anotar lo que gastas y revisarlo con calma.</p>
      ${CICLO}
      <h3>Anotar al momento</h3>
      <p>Un <strong>registro de gastos</strong> es la lista de todo lo que pagas, con la fecha, en qué y cuánto. La CONDUSEF recomienda llevar una libreta pequeña y anotar cada gasto en el momento en que lo haces, sin olvidar los más pequeños. Si prefieres el teléfono o la computadora, también sirve: lo importante es que sea cómodo para ti, porque un registro que cuesta trabajo se abandona pronto.</p>
      <p>No esperes a la noche para anotar todo de memoria, porque siempre se olvida algo: el pasaje, el refresco, la recarga del teléfono.</p>
      <h3>Agrupar en categorías</h3>
      <p>Después de un mes tendrás una lista larga. Para entenderla, agrupa los gastos en <strong>categorías</strong>, que son grupos de gastos parecidos. La CONDUSEF propone, por ejemplo, alimentos, vivienda, salud, educación, diversión y transporte. Así, en lugar de cien renglones, tienes seis totales, y ves en un momento a qué se va tu dinero. Es lo mismo que hiciste en Matemáticas en "Tablas de frecuencia", y puedes dibujar los totales como en "Gráficas: barras, pastel e histogramas".</p>
      <h3>Comparar lo planeado con lo real</h3>
      <p>Al final del mes pon lado a lado lo que planeaste y lo que de verdad gastaste en cada categoría, y resta. A ese resultado le vamos a llamar <strong>diferencia</strong>.</p>
      <p><strong>diferencia = gasto real − gasto planeado</strong></p>
      <p>Se lee "lo que gastaste menos lo que pensabas gastar". Si es positiva, te pasaste; si es negativa, gastaste menos de lo planeado; si es cero, acertaste.</p>
      <p>Para saber si una diferencia es grande o pequeña, compárala con lo planeado: divide la diferencia entre lo planeado y multiplica por 100, como en "Porcentajes". Pasarte $200 sobre $2 000 planeados es 10%; pasarte $200 sobre $400 es 50%. La misma cantidad pesa muy distinto.</p>
      <h3>Revisar también el banco</h3>
      <p>Finanzas para todos, del Banco de España y la CNMV, recomienda revisar con frecuencia los movimientos de tus cuentas, los cobros automáticos y los resúmenes de tu tarjeta. Si no entiendes un cargo o crees que hay un error, contacta a tu banco. También sugiere apuntar en un calendario las fechas en que vence cada pago, para evitar sorpresas y recargos por pagar tarde.</p>
      <h3>Ajustar</h3>
      <p>Con las diferencias en la mano, ajusta el presupuesto del mes siguiente. Según Finanzas para todos, es normal que algunas cantidades no resulten realistas y que tengas que corregirlas varias veces. Si una categoría siempre se pasa, decide: o la recortas, o le das más y quitas de otra. Así el plan se parece cada vez más a tu vida real.</p>
      <p class="nota"><strong>Trampa común:</strong> revisar solo el total. Puedes cumplir el total del mes y aun así pasarte mucho en una categoría, porque otra gastó menos por casualidad. Revisa cada categoría.</p>`,
    ejemplo: `
      <p>Este es el resumen de tu mes. Las cifras son de ejemplo. ¿En qué categoría te pasaste más?</p>
      <div class="tabla-wrap"><table>
        <tr><th>Categoría</th><th>Planeado</th><th>Real</th></tr>
        <tr><th>Comida</th><td>$2 000</td><td>$2 300</td></tr>
        <tr><th>Transporte</th><td>$1 000</td><td>$900</td></tr>
        <tr><th>Diversión</th><td>$600</td><td>$750</td></tr>
        <tr><th>Salud</th><td>$400</td><td>$400</td></tr>
      </table></div>
      <ol class="pasos-ej">
        <li>Calcula cada diferencia, real menos planeado: comida, 300; transporte, −100; diversión, 150; salud, 0.</li>
        <li>En dinero, la mayor es comida, con $300 de más.</li>
        <li>Ahora compara con lo planeado: comida, 300 ÷ 2 000 = 0.15, o sea 15%; diversión, 150 ÷ 600 = 0.25, o sea 25%.</li>
        <li>En proporción, diversión se pasó más.</li>
        <li>Comprueba el total: planeaste $4 000 y gastaste $4 350. La diferencia, 350, es igual a 300 − 100 + 150 + 0.</li>
      </ol>
      <p>Resultado: <span class="resultado">en dinero te pasaste más en comida ($300); en proporción, en diversión (25%)</span>.</p>
      <p class="nota"><strong>Error común:</strong> restar al revés, planeado menos real. Entonces una diferencia positiva parece que te pasaste cuando en realidad te sobró.</p>`,
    vidaReal: `
      <p>Anotar y revisar lo que gastas te da información que la memoria no guarda:</p>
      <ul>
        <li>Descubres en qué se va tu dinero de verdad, no en qué crees que se va.</li>
        <li>Si el banco te cobra algo que no reconoces, lo notas a tiempo para reclamar.</li>
        <li>Pagas tus cuentas a tiempo porque tienes las fechas a la vista.</li>
        <li>Cada mes tu plan se parece más a tu vida, y te cuesta menos cumplirlo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Planeaste $1 500 de transporte y gastaste $1 650. ¿Cuál es la diferencia (real menos planeado)?</p>', respuesta: 1650 - 1500,
        pista: '<p>Resta lo planeado de lo real.</p>',
        solucion: '<p>1 650 − 1 500 = <strong>150</strong>. Es positiva: te pasaste $150.</p>' },
      { tipo: 'numero', enunciado: '<p>Planeaste $800 de diversión y gastaste $1 000. ¿En qué porcentaje te pasaste de lo planeado?</p>', respuesta: (1000 - 800) / 800 * 100,
        pista: '<p>Calcula la diferencia y divídela entre lo planeado. Luego multiplica por 100.</p>',
        solucion: '<p>La diferencia es 200, y 200 ÷ 800 = 0.25, es decir, <strong>25%</strong> más de lo planeado.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu registro de la semana dice: tortillas $25, fruta $60, pasaje $36, leche $28 y pasaje $36. ¿Cuánto gastaste en la categoría alimentos?</p>', respuesta: 25 + 60 + 28,
        pista: '<p>Suma solo lo que se come. Los pasajes van en transporte.</p>',
        solucion: '<p>Tortillas, fruta y leche: 25 + 60 + 28 = <strong>$113</strong>. Los dos pasajes, $72, van en transporte.</p>' },
      { tipo: 'opciones', enunciado: '<p>En el resumen de tu tarjeta aparece un cargo que no reconoces. ¿Qué haces?</p>',
        opciones: ['Contactas a tu banco para preguntar por ese cargo', 'Lo ignoras, porque seguro se corrige solo', 'Esperas al mes siguiente para ver si se repite'], correcta: 0,
        pista: '<p>Recuerda lo que recomienda Finanzas para todos cuando no entiendes un cargo.</p>',
        solucion: '<p><strong>Contactas a tu banco.</strong> Si es un error, conviene notarlo pronto; esperar solo deja que se acumule.</p>' },
      { tipo: 'opciones', enunciado: '<p>En la categoría comida, la diferencia salió −200. ¿Qué significa?</p>',
        opciones: ['Que te pasaste $200 de lo planeado', 'Que gastaste $200 menos de lo planeado', 'Que hay un error, porque una diferencia no puede ser negativa'], correcta: 1,
        pista: '<p>La diferencia es real menos planeado. ¿Cuándo da un número negativo?</p>',
        solucion: '<p><strong>Gastaste $200 menos.</strong> La resta da negativo cuando lo real es menor que lo planeado.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama cada grupo de gastos parecidos, como alimentos o transporte?</p>',
        respuestas: ['categoría', 'una categoría', 'la categoría', 'categorías', 'rubro', 'rubros'],
        pista: '<p>La CONDUSEF propone seis: alimentos, vivienda, salud, educación, diversión y transporte.</p>',
        solucion: '<p>Una <strong>categoría</strong>. Agrupar los gastos en categorías te deja ver a qué se va tu dinero.</p>' },
    ],
    fuentes: [CONDUSEF, FPT_PRESUPUESTO, REV_PRES],
  });

  // ------------------------------------------------------------------
  const ACUMULA = barras({
    etiquetas: ['al día', 'al mes', 'al año'], valores: [152, 4560, 54720], max: 54720, paso: 1e9,
    descripcion: 'Gráfica de barras de un mismo gasto hormiga, según el ejemplo de la CONDUSEF. Al día: 152, una barra casi invisible. Al mes: 4560. Al año: 54720, la barra más alta.',
  });

  L('Gastos hormiga', {
    objetivo: 'Reconocer los gastos hormiga, calcular cuánto suman en un mes y en un año, y decidir cuáles recortar.',
    explicacion: `
      <p>Un café de $25 en la mañana no parece nada. Unas galletas de $15 en la tarde, tampoco. Pero si lo haces cada día de trabajo, al final del mes son varios cientos que ni recuerdas haber gastado.</p>
      <h3>Pequeños, pero muchos</h3>
      <p>La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, llama <strong>gastos hormiga</strong> a esos pequeños consumos de todos los días que haces sin pensar y que, al final, afectan tu dinero. Se llaman así porque son como las hormigas: una sola no se nota, pero muchas juntas se llevan bastante. Según la CONDUSEF, pueden acabar con tu capacidad de ahorro e incluso llevarte a endeudarte sin necesidad.</p>
      <p>Algunos ejemplos que da son el café de la mañana, un refresco, las galletas, las frituras, los chicles o los cigarros, y pagos chicos como que te limpien los zapatos, el estacionamiento en la calle o las propinas.</p>
      <p>Hay también gastos hormiga más nuevos, que la CONDUSEF relaciona con el teléfono: las <strong>suscripciones</strong>, que son pagos que se cobran solos cada mes por usar un servicio, como una plataforma de música o de películas. Como el cobro es automático, es fácil olvidarlas, aunque ya casi no las uses.</p>
      <h3>Cuánto suman</h3>
      <p>La única manera de ver las hormigas es contarlas. Multiplica lo que gastas en un día por los días del mes, y luego por los meses del año. La CONDUSEF hizo la cuenta con gastos comunes en un día de trabajo en México: con los precios más bajos, sumaban 152 pesos al día, 4 560 al mes y 54 720 al año. Su cuenta multiplica por 30 días cada mes, es decir, supone que haces el gasto todos los días.</p>
      ${ACUMULA}
      <p>Según datos del INEGI, el instituto de estadística de México, que cita la CONDUSEF en 2024, los gastos hormiga pueden llegar a ser el 12% del ingreso de una persona, y la mitad de la gente gasta en cosas que no tenía planeadas. Son cifras de México; en tu país pueden ser distintas.</p>
      <h3>Tres preguntas para encontrarlos</h3>
      <p>La CONDUSEF propone que te hagas estas preguntas ante una compra pequeña:</p>
      <ul>
        <li>¿Está dentro de mi presupuesto?</li>
        <li>¿Lo gasto seguido, cada día, cada quincena o cada mes?</li>
        <li>¿Me lo pude haber ahorrado?</li>
      </ul>
      <p>Para encontrarlos, revisa tu registro, como viste en "Registrar y revisar tus gastos", y busca las compras pequeñas que se repiten.</p>
      <h3>Qué hacer con ellos</h3>
      <p>No se trata de prohibirte todo. Un gusto pequeño que eliges a propósito está bien, y para eso existe la parte de gustos de tu presupuesto. El problema es el gasto que haces sin darte cuenta. Recuerda el costo de oportunidad de "Necesidades y deseos": lo que se va en hormigas es dinero que no llega a tus metas.</p>
      <p>Algunas ideas de la CONDUSEF: lleva de casa una botella con agua y tu comida o tu café; borra del teléfono las aplicaciones que ya no usas y no pagues dos suscripciones que hacen lo mismo; y si tu trayecto lo permite, camina o usa el transporte público en lugar de pedir un auto por aplicación.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que un gasto es tan pequeño que no importa. Lo que cuenta no es el precio de una vez, sino cuántas veces se repite.</p>`,
    ejemplo: `
      <p>Cada día de trabajo compras un café de $25 y unas galletas de $15. Trabajas 20 días al mes. Los precios son de ejemplo. ¿Cuánto gastas en un mes y en un año?</p>
      <ol class="pasos-ej">
        <li>Suma lo de un día: 25 + 15 = $40.</li>
        <li>Multiplica por los días de trabajo del mes, porque el gasto se repite en cada uno: 40 × 20 = $800.</li>
        <li>Pasa al año multiplicando por los 12 meses: 800 × 12 = $9 600.</li>
        <li>Comprueba por otro camino: en un año trabajas 20 × 12 = 240 días, y 40 × 240 = $9 600.</li>
        <li>Míralo como costo de oportunidad: si tu sueldo neto fuera de $8 000, ese café con galletas te costaría más de un mes de sueldo al año.</li>
      </ol>
      <p>Resultado: <span class="resultado">$800 al mes y $9 600 al año</span>.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar por 30 días cuando solo compras en días de trabajo. Cuenta solo los días en que de verdad haces el gasto.</p>`,
    vidaReal: `
      <p>Poner atención a las compras pequeñas tiene efectos grandes:</p>
      <ul>
        <li>Encuentras dinero para tus metas sin ganar más, solo dejando de gastarlo en cosas que ni disfrutas.</li>
        <li>Al revisar los cobros automáticos de tu teléfono, dejas de pagar servicios que ya no usas.</li>
        <li>Llevar tu comida y tu agua de casa te da más control sobre lo que comes.</li>
        <li>Aprendes a darte gustos a propósito, no por costumbre.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Compras un refresco de $18 cada día de trabajo, y trabajas 22 días al mes. ¿Cuánto gastas en refrescos al mes?</p>', respuesta: 18 * 22,
        pista: '<p>Multiplica el precio por los días en que lo compras.</p>',
        solucion: '<p>18 × 22 = <strong>$396</strong> al mes.</p>' },
      { tipo: 'numero', enunciado: '<p>Pagas una suscripción de $139 al mes que casi no usas. ¿Cuánto pagas por ella en un año?</p>', respuesta: 139 * 12,
        pista: '<p>Un año tiene 12 cobros mensuales.</p>',
        solucion: '<p>139 × 12 = <strong>$1 668</strong> al año por algo que casi no usas.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu sueldo neto es de $9 000 al mes y tus gastos hormiga suman $1 080 al mes. ¿Qué porcentaje de tu ingreso se llevan?</p>', respuesta: 1080 / 9000 * 100,
        pista: '<p>Divide la parte entre el total y multiplica por 100.</p>',
        solucion: '<p>1 080 ÷ 9 000 = 0.12, es decir, <strong>12%</strong>, la cifra que la CONDUSEF cita como lo que los gastos hormiga pueden llegar a representar.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos es un gasto hormiga?</p>',
        opciones: ['El pago mensual de la renta', 'Un paquete de chicles que compras casi a diario sin pensarlo', 'La colegiatura de la escuela'], correcta: 1,
        pista: '<p>Busca un gasto pequeño que se repite y que haces sin pensar.</p>',
        solucion: '<p><strong>Los chicles de casi todos los días.</strong> Son baratos, pero se repiten. La renta y la colegiatura son gastos fijos grandes que sí planeas.</p>' },
      { tipo: 'opciones', enunciado: '<p>Pagas dos suscripciones de música que hacen lo mismo. ¿Qué propone la CONDUSEF?</p>',
        opciones: ['Pagar las dos, porque cada una es barata', 'Cambiar una de ellas por una de películas', 'Quedarte con la que te sea más útil y cancelar la otra'], correcta: 2,
        pista: '<p>Si las dos hacen lo mismo, ¿necesitas pagar por ambas?</p>',
        solucion: '<p><strong>Quedarte con la más útil y cancelar la otra.</strong> Pagar dos veces por lo mismo es un gasto hormiga clásico.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llaman los gastos pequeños de todos los días que, sumados, se llevan mucho dinero?</p>',
        respuestas: ['gastos hormiga', 'gasto hormiga', 'los gastos hormiga', 'hormiga', 'hormigas'],
        pista: '<p>Llevan el nombre de un insecto pequeño que trabaja en grupo.</p>',
        solucion: '<p>Los <strong>gastos hormiga</strong>: uno solo no se nota, pero muchos juntos se llevan bastante.</p>' },
    ],
    fuentes: [REV_HORMIGA, REV_TRABAJO, CONDUSEF],
  });
})();
