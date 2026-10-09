// Finanzas personales · Unidad 3: Ahorro.
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

  const FPT = (ruta, nombre) => ({ nombre: `Finanzas para todos (Banco de España y CNMV): ${nombre}`, url: `https://www.finanzasparatodos.es/${ruta}` });
  const REV = (ruta, nombre) => ({ nombre: `CONDUSEF (México), Revista Proteja su Dinero: ${nombre}`, url: `https://revista.condusef.gob.mx/${ruta}/` });
  const CONDUSEF = { nombre: 'CONDUSEF (México): Conduguía, Cómo hacer un presupuesto (PDF)', url: 'https://www.gob.mx/cms/uploads/attachment/file/475636/como_hacer_un_presupuesto.pdf' };
  const BANSEFI = { nombre: 'Bansefi, hoy Banco del Bienestar (México): Mi Cartilla Financiera (PDF)', url: 'https://www.gob.mx/cms/uploads/attachment/file/408445/Cartilla_Financiera_GenericaV2.pdf' };
  const FINDEX = { nombre: 'Banco Mundial: The Global Findex Database 2025 (en inglés)', url: 'https://www.worldbank.org/en/publication/globalfindex' };
  const FPT_INVERTIR = FPT('c-mo-invertir-tu-dinero', '¿Cómo invertir tu dinero?');
  const REV_INFORMAL = REV('ahorro-general/ahorro-formal/2016/04/evita-el-ahorro-informal', 'Evita el ahorro informal');
  const REV_DIA = REV('usuario-inteligente/perspectivas/2020/10/31-de-octubre-dia-mundial-del-ahorro-2', '31 de octubre, Día Mundial del Ahorro');
  const REV_METAS = REV('ahorro-general/ahorro-formal/2015/05/papa-con-ahorro-cumple-tus-metas', 'Papá, con ahorro cumple tus metas');
  const REV_RENUEVA = REV('usuario-inteligente/perspectivas/2026/01/renueva-tus-metas', 'Renueva tus metas');
  const REV_CONTROL = REV('usuario-inteligente/tu-bolsillo/2025/05/planificaion', 'Bajo el control de mamá');
  const REV_BEF = REV('usuario-inteligente/buro-de-entidades-financieras/2023/05/consejos-del-bef-para-mama', 'Consejos del BEF para mamá');
  const REV_PLAN = REV('presupuesto/plan-de-vida-financiero/2020/06/plan-financiero-para-emergencias', 'Plan financiero para emergencias');
  const REV_PRES = REV('presupuesto/presupuestos/2021/03/como-hacer-un-presupuesto-y-ahorrar-facilmente', 'Cómo hacer un presupuesto y ahorrar fácilmente');

  // ------------------------------------------------------------------
  const CAMINOS = diagrama([0, 12], [0, 5.8], [
    caja(0.3, 2.2, 3.3, 3.6), txt(1.8, 3.15, 'imprevisto'), txt(1.8, 2.55, 'de $3 000'),
    caja(4.4, 4.0, 8.0, 5.4), txt(6.2, 4.95, 'con ahorro:'), txt(6.2, 4.35, 'pagas de contado'),
    caja(8.7, 4.0, 11.7, 5.4), txt(10.2, 4.95, 'repones'), txt(10.2, 4.35, 'poco a poco'),
    caja(4.4, 0.4, 8.0, 1.8, true), txt(6.2, 1.35, 'sin ahorro:'), txt(6.2, 0.75, 'pides prestado'),
    caja(8.7, 0.4, 11.7, 1.8, true), txt(10.2, 1.35, 'pagas de más'), txt(10.2, 0.75, 'con intereses'),
    ...flecha([3.35, 3.3], [4.35, 4.4], 0, 1.2), ...flecha([3.35, 2.5], [4.35, 1.4], 0, 1.2),
    ...flecha([8.05, 4.7], [8.65, 4.7], 0, 1.2), ...flecha([8.05, 1.1], [8.65, 1.1], 0, 1.2),
  ], 'Un diagrama con dos caminos que salen de la caja "imprevisto de $3 000". Arriba: "con ahorro: pagas de contado", y después "repones poco a poco". Abajo, en cajas sombreadas: "sin ahorro: pides prestado", y después "pagas de más con intereses".');

  L('Por qué ahorrar', {
    objetivo: 'Explicar para qué sirve el ahorro, calcular cuánto juntas guardando poco a poco y distinguir el ahorro formal del informal.',
    explicacion: `
      <p>Un martes se descompone el refrigerador y la reparación cuesta $3 000. Si tienes ese dinero guardado, pagas y en unos días todo vuelve a la normalidad. Si no lo tienes, toca pedir prestado, y casi siempre terminas pagando más de lo que te prestaron: ese extra se llama interés. La diferencia entre los dos caminos es el ahorro.</p>
      ${CAMINOS}
      <h3>Qué es ahorrar</h3>
      <p>El <strong>ahorro</strong> es guardar hoy una parte del dinero que recibes para usarla después, cuando la necesites. Así lo definen la CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, y la cartilla de Bansefi. En "Hacer tu primer presupuesto" viste cómo apartarlo en cuanto recibes tu dinero; aquí verás para qué sirve y dónde conviene guardarlo.</p>
      <h3>Para qué sirve</h3>
      <p>Según la CONDUSEF, ahorrar te permite:</p>
      <ul>
        <li>Cubrir un imprevisto, como una enfermedad o una reparación, sin tener que endeudarte.</li>
        <li>Comprar algo que quieres, o pagar de contado, es decir, de una sola vez, algo caro como un curso. También juntar el enganche de una casa, que es la parte del precio que se paga al comprarla.</li>
        <li>Tener tranquilidad cuando dejes de trabajar, en tu retiro.</li>
      </ul>
      <p>Fíjate que las tres tienen algo en común: el ahorro te da opciones. Sin él, cada imprevisto se vuelve una deuda. Y no es un problema raro. Según la Encuesta Nacional sobre Salud Financiera de México de 2023, que cita la CONDUSEF, el 45.9% de los adultos de ese país casi nunca tiene dinero al final del mes.</p>
      <h3>Poco a poco también cuenta</h3>
      <p>Mucha gente cree que ahorrar es solo para quien gana mucho. La CONDUSEF responde que todas las personas pueden ahorrar, sin importar la cantidad. Su ejemplo: $1 al día se vuelve $30 al mes y $365 al año; $10 al día, $300 al mes y $3 650 al año. Es la misma multiplicación que viste en "Gastos hormiga", pero ahora juega a tu favor.</p>
      <h3>Dónde guardarlo</h3>
      <p>El lugar donde guardas tu dinero importa tanto como guardarlo. El <strong>ahorro formal</strong> es el que guardas en una institución financiera autorizada, como un banco o una cooperativa de ahorro autorizada. El <strong>ahorro informal</strong> es el que guardas en casa, con un pariente o en una tanda, que es un grupo de personas que juntan dinero cada cierto tiempo y se turnan para recibir el total.</p>
      <p>La CONDUSEF advierte los riesgos del ahorro informal: el dinero en casa se puede robar o perder en un incendio o una inundación, y en una tanda quien la organiza se puede quedar con el dinero. En una institución autorizada tu dinero está más protegido. En la unidad Bancos y seguridad, en "Tipos de cuentas bancarias", verás cómo funciona esa protección y qué límites tiene en cada país.</p>
      <p>Esto pasa en muchos países. Según el Banco Mundial, en 2024 el 40% de los adultos de las economías en desarrollo ahorró en una cuenta financiera: más que en 2021, pero todavía menos de la mitad.</p>
      <h3>Ahorrar no es invertir</h3>
      <p>Finanzas para todos, del Banco de España y la CNMV, separa dos ideas. Ahorrar es guardar dinero para emergencias o necesidades cercanas, sin arriesgarlo. Invertir es poner el dinero que sobra después de ahorrar, con la esperanza, pero sin la seguridad, de que crezca; por eso tiene riesgo. Primero se ahorra. Lo verás en la unidad Inversión.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que no vale la pena ahorrar porque la cantidad es pequeña. Lo que importa al principio es el hábito; lo guardado se va juntando mes con mes.</p>`,
    ejemplo: `
      <p>Decides guardar $10 cada día, como en el ejemplo de la CONDUSEF. ¿Cuánto juntas en un mes de 30 días y en un año? ¿Cuánto tardarías en tener los $3 000 de la reparación?</p>
      <ol class="pasos-ej">
        <li>Multiplica por los días del mes, porque guardas lo mismo cada día: 10 × 30 = $300.</li>
        <li>Para el año, multiplica por sus 365 días: 10 × 365 = $3 650. Con 12 meses de 30 días saldría $3 600; la diferencia es porque el año tiene 365 días, no 360.</li>
        <li>Para la reparación, divide lo que cuesta entre lo que guardas al mes: 3 000 ÷ 300 = 10 meses.</li>
        <li>Comprueba al revés: 10 meses × $300 = $3 000.</li>
      </ol>
      <p>Resultado: <span class="resultado">$300 al mes, $3 650 al año, y la reparación cubierta en 10 meses</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que $10 al día "no alcanza para nada". En menos de un año cubre una reparación que, sin ahorro, sería una deuda.</p>`,
    vidaReal: `
      <p>Tener dinero guardado se nota en los días buenos y en los malos:</p>
      <ul>
        <li>Cuando se descompone algo en casa, lo pagas sin pedir prestado.</li>
        <li>Puedes pagar de una sola vez algo que quieres, en lugar de pagarlo en partes y terminar pagando de más.</li>
        <li>Vives con más calma, porque sabes que tienes un respaldo.</li>
        <li>Con tu ejemplo, tu familia aprende que guardar un poco cada vez funciona.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Guardas $15 cada día. ¿Cuánto juntas en 30 días?</p>', respuesta: 15 * 30,
        pista: '<p>Multiplica lo que guardas cada día por el número de días.</p>',
        solucion: '<p>15 × 30 = <strong>$450</strong> en un mes.</p>' },
      { tipo: 'numero', enunciado: '<p>Guardas $300 cada mes. ¿Cuánto juntas en un año?</p>', respuesta: 300 * 12,
        pista: '<p>Un año tiene 12 meses.</p>',
        solucion: '<p>300 × 12 = <strong>$3 600</strong> en un año.</p>' },
      { tipo: 'numero', enunciado: '<p>Necesitas $3 000 para una reparación y puedes guardar $250 al mes. ¿Cuántos meses tardas en juntarlo?</p>', respuesta: 3000 / 250,
        pista: '<p>Divide lo que necesitas entre lo que guardas cada mes.</p>',
        solucion: '<p>3 000 ÷ 250 = <strong>12 meses</strong>. Comprueba: 12 × 250 = 3 000.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la CONDUSEF, ¿cuál es un riesgo de guardar tus ahorros en casa?</p>',
        opciones: ['Que te cobren una comisión cada mes', 'Que se pierdan en un robo, un incendio o una inundación', 'Que el banco los use sin avisarte'], correcta: 1,
        pista: '<p>Piensa qué le puede pasar al dinero si está guardado dentro de tu casa.</p>',
        solucion: '<p><strong>Que se pierdan en un robo, un incendio o una inundación.</strong> Por eso conviene el ahorro formal, en una institución autorizada.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué diferencia hay entre ahorrar e invertir?</p>',
        opciones: ['Son lo mismo; solo cambia el nombre', 'Invertir nunca tiene riesgo y ahorrar sí', 'Ahorrar es guardar sin arriesgar el dinero; invertir busca que crezca, pero con riesgo'], correcta: 2,
        pista: '<p>Recuerda qué dice Finanzas para todos sobre el riesgo de cada uno.</p>',
        solucion: '<p><strong>Ahorrar es guardar sin arriesgar; invertir busca que el dinero crezca, con riesgo.</strong> Por eso primero se ahorra y después se invierte lo que sobra.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el ahorro que guardas en una institución financiera autorizada, como un banco?</p>',
        respuestas: ['ahorro formal', 'el ahorro formal', 'formal'],
        pista: '<p>Es lo contrario del ahorro informal.</p>',
        solucion: '<p>El <strong>ahorro formal</strong>.</p>' },
    ],
    fuentes: [REV_PRES, REV_DIA, REV_INFORMAL, REV_RENUEVA, BANSEFI, FPT_INVERTIR, FINDEX],
  });

  // ------------------------------------------------------------------
  const META = G({
    x: [0, 24], y: [0, 30], pasos: [4, 6], nombres: false,
    funciones: [{ f: (x) => 1.2 * x, etiqueta: 'ahorro acumulado, en miles de $', serie: 0 }, { f: () => 24, etiqueta: 'meta de 3 meses: 24 mil', serie: 1 }],
    puntos: [{ x: 20, y: 24, etiqueta: 'mes 20' }],
    descripcion: 'Gráfica del ahorro acumulado, en miles, contra los meses, de 0 a 24. Una recta sube desde 0 de 1.2 en 1.2 mil cada mes. Una línea horizontal marca la meta de 24 mil, tres meses de gastos básicos de 8 mil. La recta alcanza la meta en el mes 20.',
  });

  L('Fondo de emergencia', {
    objetivo: 'Calcular de cuánto debe ser tu fondo de emergencia, cuánto tardas en juntarlo y saber dónde guardarlo y cuándo usarlo.',
    explicacion: `
      <p>Imagina que un mes te recortan horas en el trabajo, o que alguien de tu casa necesita una consulta médica urgente. No sabes cuándo pasará algo así, pero es casi seguro que algún día pasará. Para esos días existe una reserva especial de dinero.</p>
      <h3>Una reserva para lo que no puedes prever</h3>
      <p>Un <strong>fondo de emergencia</strong> es dinero que guardas solo para emergencias: una enfermedad, la pérdida del empleo o una reparación urgente en casa. La CONDUSEF lo compara con un colchón que protege ante los imprevistos: no evita la caída, pero la amortigua. Como viste en Autosuficiencia, en "Plan familiar de emergencias", prepararse antes es lo que permite actuar con calma después.</p>
      <p>Fíjate en la diferencia con "Hacer tu primer presupuesto". Allí apartabas cada mes una cantidad para los imprevistos de ese mes. El fondo de emergencia es una reserva más grande, que se junta durante meses, para golpes que el presupuesto de un mes no aguanta.</p>
      <h3>¿De cuánto?</h3>
      <p>La CONDUSEF reconoce que no hay un acuerdo único, pero recomienda juntar entre tres y seis meses de tus <strong>gastos básicos</strong>, que son los que necesitas para vivir: vivienda, comida, servicios, transporte y salud. Son tus necesidades, como viste en "Necesidades y deseos". No se cuentan los gustos.</p>
      <p>¿Por qué tantos meses? Porque si pierdes el trabajo, encontrar otro puede tardar. Tres meses de gastos te dan tiempo para buscar sin endeudarte; seis te dan más margen.</p>
      <p><strong>fondo = gastos básicos de un mes × número de meses</strong></p>
      <p>Se lee "lo que necesitas para vivir un mes, multiplicado por los meses que quieres cubrir". Con gastos básicos de $8 000, tres meses son $24 000.</p>
      ${META}
      <p>Juntarlo no es rápido, y está bien. La CONDUSEF sugiere tratarlo como un gasto fijo más del presupuesto, una cantidad que apartas cada mes como si fuera la renta. Si apartas $1 200 al mes, el ahorro sube siempre lo mismo y su gráfica es una recta, como viste en "Función lineal y pendiente". En la gráfica, la recta llega a los $24 000 en el mes 20.</p>
      <h3>Dónde guardarlo</h3>
      <p>Una emergencia no avisa, así que el dinero tiene que estar disponible pronto. A la facilidad para usar tu dinero rápido y sin perder parte de él se le llama <strong>liquidez</strong>. Por eso la CONDUSEF recomienda una cuenta de ahorro de fácil acceso, y no inversiones de alto riesgo ni plazos fijos, en los que el dinero se queda guardado un tiempo sin que puedas sacarlo. Tampoco debajo del colchón, donde se puede perder. Además, conviene tenerlo separado del ahorro para tus metas, porque su destino es otro.</p>
      <h3>Usarlo bien</h3>
      <p>Antes de tocarlo, pregúntate si de verdad es una emergencia. La CONDUSEF lo dice claro: no es una caja chica, y una oferta o unas vacaciones no son emergencias. Si lo usas, repónlo lo antes posible. Y si todavía no tienes fondo, ten cuidado con pagar todo con tarjeta de crédito: lo que hoy no puedes pagar, mañana costará más por los intereses, como verás en la unidad Crédito. En la unidad Cómo prepararse para una crisis o una depresión verás cómo adaptarlo a tiempos difíciles.</p>
      <p class="nota"><strong>Trampa común:</strong> ir tomando del fondo para gastos pequeños que no son emergencias. Poco a poco se vacía y, cuando llega el golpe de verdad, ya no está.</p>`,
    ejemplo: `
      <p>Tus gastos básicos son de $9 000 al mes (cifra de ejemplo). ¿De cuánto debe ser tu fondo de emergencia, y cuánto tardas en juntar el mínimo si apartas $1 500 al mes?</p>
      <ol class="pasos-ej">
        <li>Calcula el mínimo, tres meses de gastos básicos: 9 000 × 3 = $27 000.</li>
        <li>Calcula el máximo recomendado, seis meses: 9 000 × 6 = $54 000. Fíjate que es el doble del mínimo, porque seis meses son el doble de tres.</li>
        <li>Para saber cuánto tardas en llegar al mínimo, divide la meta entre lo que apartas al mes: 27 000 ÷ 1 500 = 18 meses.</li>
        <li>Comprueba al revés: 18 × 1 500 = 27 000.</li>
      </ol>
      <p>Resultado: <span class="resultado">un fondo de entre $27 000 y $54 000; el mínimo lo juntas en 18 meses</span>.</p>
      <p class="nota"><strong>Error común:</strong> calcular el fondo con todo lo que gastas, incluidos los gustos. Así la meta sale más grande de lo necesario y parece imposible de alcanzar.</p>`,
    vidaReal: `
      <p>Tener una reserva para los golpes fuertes cambia cómo los vives:</p>
      <ul>
        <li>Si te quedas sin trabajo, tienes unos meses para buscar otro con calma.</li>
        <li>Una consulta médica urgente no se convierte en una deuda.</li>
        <li>Puedes decir que no a un préstamo caro cuando tienes prisa por conseguir dinero.</li>
        <li>Tu familia vive con menos angustia porque sabe que hay un respaldo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tus gastos básicos son de $7 500 al mes. ¿Cuánto necesitas en tu fondo para cubrir tres meses?</p>', respuesta: 7500 * 3,
        pista: '<p>Multiplica los gastos básicos de un mes por los meses que quieres cubrir.</p>',
        solucion: '<p>7 500 × 3 = <strong>$22 500</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu meta de fondo de emergencia es de $24 000 y apartas $1 200 al mes. ¿Cuántos meses tardas en juntarla?</p>', respuesta: 24000 / 1200,
        pista: '<p>Divide la meta entre lo que apartas cada mes.</p>',
        solucion: '<p>24 000 ÷ 1 200 = <strong>20 meses</strong>, justo lo que muestra la gráfica.</p>' },
      { tipo: 'numero', enunciado: '<p>Tenías $18 000 en tu fondo y usaste $4 500 en una reparación urgente. Si repones $750 al mes, ¿cuántos meses tardas en volver a tener $18 000?</p>', respuesta: 4500 / 750,
        pista: '<p>Solo tienes que reponer lo que sacaste.</p>',
        solucion: '<p>Te faltan $4 500, y 4 500 ÷ 750 = <strong>6 meses</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas situaciones es una emergencia para usar tu fondo?</p>',
        opciones: ['Una oferta de pantallas con 40% de descuento', 'Unas vacaciones que ya tenías planeadas', 'La reparación urgente del techo después de una tormenta'], correcta: 2,
        pista: '<p>Una emergencia es algo inesperado, necesario y urgente.</p>',
        solucion: '<p><strong>La reparación urgente del techo.</strong> La CONDUSEF lo aclara: una oferta o unas vacaciones no son emergencias.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Dónde conviene guardar tu fondo de emergencia?</p>',
        opciones: ['En una cuenta de ahorro de fácil acceso', 'En una inversión de alto riesgo, para que crezca más', 'Debajo del colchón, para tenerlo a la mano'], correcta: 0,
        pista: '<p>Necesitas sacarlo rápido, sin perder parte de él y sin que se pierda en casa.</p>',
        solucion: '<p><strong>En una cuenta de ahorro de fácil acceso.</strong> Tiene liquidez. Una inversión de riesgo puede valer menos justo cuando la necesitas, y en casa se puede perder.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la facilidad para usar tu dinero rápido y sin perder parte de él?</p>',
        respuestas: ['liquidez', 'la liquidez'],
        pista: '<p>Viene de "líquido": algo que fluye fácil.</p>',
        solucion: '<p>La <strong>liquidez</strong>. Por eso el fondo de emergencia va en una cuenta de fácil acceso.</p>' },
    ],
    fuentes: [REV_CONTROL, REV_BEF, REV_PLAN],
  });

  // ------------------------------------------------------------------
  const LINEA = diagrama([0, 12], [0, 3.6], [
    ...flecha([0.5, 1.4], [11.7, 1.4], 0, 1.3), txt(0.7, 0.75, 'hoy'),
    { tipo: 'linea', desde: [2.5, 1.15], hasta: [2.5, 1.65] }, txt(2.5, 2.9, 'corto plazo'), txt(2.5, 2.25, 'zapatos'),
    { tipo: 'linea', desde: [6, 1.15], hasta: [6, 1.65] }, txt(6, 2.9, 'mediano plazo'), txt(6, 2.25, 'un curso'),
    { tipo: 'linea', desde: [9.6, 1.15], hasta: [9.6, 1.65] }, txt(9.6, 2.9, 'largo plazo'), txt(9.6, 2.25, 'tu retiro'),
    txt(10.8, 0.75, 'tiempo'),
  ], 'Una línea del tiempo que empieza en "hoy" y avanza hacia la derecha. Tiene tres marcas: cerca, corto plazo, unos zapatos; en medio, mediano plazo, un curso; lejos, largo plazo, tu retiro.');

  L('Metas de ahorro', {
    objetivo: 'Convertir un deseo en una meta de ahorro con costo y plazo, calcular cuánto guardar cada mes y ordenar varias metas para que quepan en tu presupuesto.',
    explicacion: `
      <p>"Quiero ahorrar" es un buen propósito, pero es difícil de cumplir, porque no dice cuánto ni para cuándo. Compáralo con el ejemplo de la cartilla de Bansefi: quiero comprar una estufa que cuesta $2 700 y voy a guardar $300 al mes. Con esa frase ya sabes que la tendrás en 9 meses.</p>
      <h3>Qué es una meta de ahorro</h3>
      <p>Una <strong>meta de ahorro</strong> es algo que quieres lograr con tu dinero, con un precio y una fecha. Bansefi la define como lo que quieres alcanzar en un tiempo establecido. La CONDUSEF lo dice con una imagen: ponle nombre y apellido a tu ahorro. El nombre es para qué es; el apellido, cuánto y en cuánto tiempo.</p>
      <p>Al tiempo que falta para cumplir una meta se le llama <strong>plazo</strong>. Las metas de corto plazo se cumplen pronto, como unos zapatos para el próximo mes. Las de mediano plazo toman más tiempo, como un curso o un aparato grande. Las de largo plazo toman muchos años, como el enganche de una casa o tu retiro.</p>
      ${LINEA}
      <h3>Cuánto guardar cada mes</h3>
      <p>Con el precio y el plazo, la cuenta es una división:</p>
      <p><strong>ahorro por mes = costo de la meta ÷ meses que faltan</strong></p>
      <p>Se lee "lo que cuesta, repartido entre los meses que tienes". Si lo que quieres saber es el tiempo, divides al revés: meses = costo ÷ ahorro por mes. Así salió la estufa: 2 700 ÷ 300 = 9 meses.</p>
      <p>La cantidad tiene que caber en tu presupuesto. La conduguía de la CONDUSEF pide metas realistas, acordes con tus posibilidades. Si con "La regla 50/30/20" apartas el 20% de tu sueldo, lo que piden todas tus metas juntas no puede pasar de ese 20%, y ahí también va tu fondo de emergencia.</p>
      <h3>Ordenar las metas</h3>
      <p>Casi nunca alcanza para todo al mismo tiempo. La CONDUSEF recomienda anotar tus metas de la forma más específica posible y ordenarlas según la importancia que tienen para ti, para enfocarte primero en algunas. La conduguía agrega que escribas el costo de cada una y el tiempo que te tomará. Si una meta no cabe, tienes tres caminos: darle más tiempo, bajar su costo o esperar a terminar otra.</p>
      <p>Para no gastar sin querer el dinero de una meta, la CONDUSEF sugiere separar el ahorro por objetivo, por ejemplo en cuentas distintas, y que se aparte de forma automática.</p>
      <p>Las metas de largo plazo tienen un detalle más: con los años, los precios cambian y tu dinero guardado puede crecer con intereses. Lo verás en la unidad Interés e inflación.</p>
      <p class="nota"><strong>Trampa común:</strong> una meta sin fecha, como "algún día compraré una moto". Sin plazo no puedes calcular cuánto guardar al mes, y ese "algún día" no llega.</p>`,
    ejemplo: `
      <p>Apartas $2 000 al mes para ahorrar, y de eso $1 000 van a tu fondo de emergencia. Para tus metas quedan $1 000. Las cifras son de ejemplo:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Meta</th><th>Costo</th><th>Plazo</th></tr>
        <tr><th>Zapatos</th><td>$600</td><td>3 meses</td></tr>
        <tr><th>Curso</th><td>$3 000</td><td>6 meses</td></tr>
        <tr><th>Bicicleta</th><td>$4 800</td><td>12 meses</td></tr>
      </table></div>
      <ol class="pasos-ej">
        <li>Calcula cuánto pide cada meta al mes, dividiendo su costo entre su plazo: zapatos, 600 ÷ 3 = $200; curso, 3 000 ÷ 6 = $500; bicicleta, 4 800 ÷ 12 = $400.</li>
        <li>Suma: 200 + 500 + 400 = $1 100 al mes. Te faltan $100.</li>
        <li>Elige un camino. Si le das 4 meses más a la bicicleta, pide 4 800 ÷ 16 = $300 al mes, y la suma queda en 200 + 500 + 300 = $1 000. Ya cabe.</li>
        <li>Comprueba la bicicleta al revés: 300 × 16 = 4 800.</li>
      </ol>
      <p>Resultado: <span class="resultado">con 16 meses para la bicicleta, tus tres metas caben en $1 000 al mes</span>.</p>
      <p class="nota"><strong>Error común:</strong> sumar los costos (600 + 3 000 + 4 800) y compararlos con lo que ahorras en un mes. Cada meta tiene su plazo; compara lo que cada una pide al mes.</p>`,
    vidaReal: `
      <p>Ponerle cifras y fechas a lo que quieres te ayuda a conseguirlo:</p>
      <ul>
        <li>Sabes exactamente cuánto guardar cada quincena o cada mes para llegar a lo que quieres.</li>
        <li>Compras de contado en lugar de endeudarte para tenerlo ya.</li>
        <li>Cuando tienes que elegir entre dos gustos, decides con números y no por impulso.</li>
        <li>Ver cómo avanza lo que guardas te anima a seguir.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Quieres juntar $3 600 para un curso en 8 meses. ¿Cuánto tienes que guardar al mes?</p>', respuesta: 3600 / 8,
        pista: '<p>Divide el costo entre los meses que faltan.</p>',
        solucion: '<p>3 600 ÷ 8 = <strong>$450</strong> al mes. Comprueba: 450 × 8 = 3 600.</p>' },
      { tipo: 'numero', enunciado: '<p>Una tableta cuesta $4 200 y puedes guardar $350 al mes. ¿Cuántos meses tardas en juntarla?</p>', respuesta: 4200 / 350,
        pista: '<p>Ahora quieres el tiempo: divide el costo entre lo que guardas al mes.</p>',
        solucion: '<p>4 200 ÷ 350 = <strong>12 meses</strong>, un año.</p>' },
      { tipo: 'numero', enunciado: '<p>Tienes dos metas: $1 200 en 4 meses y $6 000 en 12 meses. ¿Cuánto necesitas guardar al mes para las dos?</p>', respuesta: 1200 / 4 + 6000 / 12,
        pista: '<p>Calcula lo que pide cada meta al mes y suma.</p>',
        solucion: '<p>1 200 ÷ 4 = 300 y 6 000 ÷ 12 = 500. En total, 300 + 500 = <strong>$800</strong> al mes.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas metas está mejor definida?</p>',
        opciones: ['Quiero ahorrar más este año', 'Quiero juntar $2 400 para una lavadora en 8 meses', 'Quiero comprar una lavadora algún día'], correcta: 1,
        pista: '<p>Busca la que tenga nombre y apellido: para qué, cuánto y cuándo.</p>',
        solucion: '<p><strong>Juntar $2 400 para una lavadora en 8 meses.</strong> Con esos datos sabes que necesitas 2 400 ÷ 8 = $300 al mes.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tus metas piden $1 300 al mes, pero solo puedes guardar $1 000. ¿Qué es lo más razonable?</p>',
        opciones: ['Darle más tiempo a una meta o empezarla después', 'Tomar los $300 que faltan de tu fondo de emergencia', 'Pedir prestados cada mes los $300 que faltan'], correcta: 0,
        pista: '<p>El fondo de emergencia es solo para emergencias, y pedir prestado cuesta intereses.</p>',
        solucion: '<p><strong>Darle más tiempo a una meta o empezarla después.</strong> Así las metas caben en lo que de verdad puedes guardar.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el tiempo que falta para cumplir una meta?</p>',
        respuestas: ['plazo', 'el plazo', 'un plazo'],
        pista: '<p>Puede ser corto, mediano o largo.</p>',
        solucion: '<p>El <strong>plazo</strong>.</p>' },
    ],
    fuentes: [BANSEFI, REV_METAS, REV_PRES, REV_RENUEVA, CONDUSEF],
  });
})();
