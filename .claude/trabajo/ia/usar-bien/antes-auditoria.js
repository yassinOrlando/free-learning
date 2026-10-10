// Inteligencia artificial · Unidad 4: Usar la IA bien.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Sin nombres de chatbots. Las instrucciones de ejemplo son genéricas y las cifras de los ejemplos son de ejemplo.
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('ia', titulo, datos);
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
  // Caja con texto centrado: (x, y) es el centro.
  const caja = (x, y, w, h, texto) => [
    { tipo: 'poligono', puntos: [[x - w / 2, y - h / 2], [x + w / 2, y - h / 2], [x + w / 2, y + h / 2], [x - w / 2, y + h / 2]] },
    txt(x, y, texto),
  ];
  const tabla = (encabezados, filas) => '<div class="tabla-wrap"><table><thead><tr>' + encabezados.map((h) => `<th>${h}</th>`).join('') + '</tr></thead><tbody>' +
    filas.map((f) => '<tr>' + f.map((c) => `<td>${c}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>';

  const F1 = { nombre: 'Google, Gemini API: Estrategias de diseño de instrucciones', url: 'https://ai.google.dev/gemini-api/docs/prompting-strategies' };
  const F2 = { nombre: 'Anthropic, Claude Docs: Prompting best practices (en inglés)', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices' };
  const F3 = { nombre: 'IBM, What is few shot prompting? (en inglés)', url: 'https://www.ibm.com/think/topics/few-shot-prompting' };
  const F4 = { nombre: 'IBM, What is zero-shot prompting? (en inglés)', url: 'https://www.ibm.com/think/topics/zero-shot-prompting' };
  const F5 = { nombre: 'Wikipedia: Ingeniería de instrucciones', url: 'https://es.wikipedia.org/wiki/Ingenier%C3%ADa_de_instrucciones' };
  const F20 = { nombre: 'The Stanford Daily (Universidad de Stanford, EE. UU.), sobre el estudio de Wineburg y McGrew, 2017 (en inglés)', url: 'https://stanforddaily.com/2017/10/26/fact-checkers-more-likely-than-peer-expert-groups-to-identify-credible-information-determine-gse-researchers/' };
  const F21 = { nombre: 'IBM, What are AI hallucinations? (en inglés)', url: 'https://www.ibm.com/think/topics/ai-hallucinations' };
  const F22 = { nombre: 'Noticias ONU: Un niño debe tener al menos 13 años para empezar a utilizar la inteligencia artificial en las aulas', url: 'https://news.un.org/es/story/2023/09/1523892' };
  const F23 = { nombre: 'Wikipedia: Plagio', url: 'https://es.wikipedia.org/wiki/Plagio' };
  const F24 = { nombre: 'Wikipedia: Testing effect (en inglés)', url: 'https://en.wikipedia.org/wiki/Testing_effect' };
  const F25 = { nombre: 'INTEF (España): Orientaciones para la integración de la inteligencia artificial en la formación del profesorado', url: 'https://intef.es/wp-content/uploads/2025/06/Orientaciones-para-la-integracion-de-la-IA-en-la-formacion-docente_Actualizacion_2026.pdf' };

  // ------------------------------------------------------------------
  L('Escribir instrucciones claras', {
    objetivo: 'Escribir una instrucción clara para una herramienta de IA, con tarea, público, extensión y formato, y mejorarla poco a poco cuando la respuesta no sirve.',
    vidaReal: `
      <p>Pedirle algo a una herramienta de IA se parece a pedirle algo a un compañero: si dices solo "ayúdame con la tarea", te contesta cualquier cosa. Escribir bien lo que quieres te ahorra tiempo en trabajos escolares, resúmenes, borradores de mensajes, explicaciones de temas difíciles o ideas para un proyecto. Y aprendes algo útil fuera de la IA: pensar con claridad qué necesitas antes de pedirlo.</p>`,
    explicacion: `
      <p>Imagina que le dices a alguien: "Háblame de volcanes". Puede contarte durante media hora, o dos líneas, o algo que ya sabes. En cambio, si dices: "Explícame en 5 líneas, para un niño de sexto grado, por qué hacen erupción", sabe qué hacer. Con una herramienta de IA pasa lo mismo.</p>
      <h3>¿Qué es una instrucción?</h3>
      <p>Una <strong>instrucción</strong> (en inglés, <span lang="en">prompt</span>) es el texto en lenguaje natural que describe la tarea que debe hacer la IA, según Wikipedia. Es lo que escribes en la ventana de la conversación. Según Google, escribirla bien es un proceso de prueba y ajuste: se experimenta y se mejora según las respuestas que se observan.</p>
      <h3>Las piezas de una buena instrucción</h3>
      <p>Según Anthropic, cuanto más precisamente explicas lo que quieres, mejor es el resultado. Una forma de explicarlo con precisión es incluir cuatro piezas. La primera es la <strong>tarea</strong>: qué quieres que haga (explicar, resumir, comparar). La segunda es para quién es, o sea, el público. La tercera es la extensión: cuánto quieres. La cuarta es el <strong>formato</strong>: cómo quieres la respuesta. Según Google, puedes pedir una tabla, una lista, un párrafo o una sola oración. Las cuatro piezas son una guía de esta lección, no una fórmula oficial.</p>
      ${tabla(['Instrucción vaga', 'Qué le falta', 'Instrucción clara'], [
        ['Háblame de volcanes', 'Tarea, público, extensión y formato', 'Explícame en 5 líneas, para sexto grado, por qué hacen erupción'],
        ['Ayúdame con mi texto', 'Qué tarea y qué extensión', 'Resume este texto en 3 frases'],
        ['Dame ideas', 'Para qué y en qué formato', 'Dame una lista de 5 ideas para un cartel sobre reciclar'],
        ['Explica las fracciones', 'Público y ejemplo', 'Explica las fracciones a alguien de 10 años, con un ejemplo de pizza'],
      ])}
      <h3>Tareas grandes: por partes</h3>
      <p>Si la tarea es larga, no la pidas toda junta. Según Google, para tareas complejas conviene dividir la instrucción en componentes más simples. Por ejemplo, primero pide una lista de ideas, luego elige una y pide un borrador.</p>
      <h3>Di lo que sí quieres</h3>
      <p>Según Anthropic, suele funcionar mejor decir qué hacer que decir qué no hacer. "Escribe en frases cortas" guía más que "no escribas frases largas".</p>
      <h3>Si no sale bien, ajusta</h3>
      <p>Si la respuesta no te sirve, no empieces de cero: mira qué pieza faltó, agrégala y vuelve a probar. Aun con una instrucción excelente, la IA puede equivocarse; cómo comprobarlo lo verás en "Verificar lo que te responde".</p>
      <p class="nota"><strong>Trampa común:</strong> creer que una instrucción más larga siempre es mejor. Lo que ayuda es que tenga las piezas necesarias, no que tenga muchas palabras.</p>`,
    ejemplo: `
      <p>Parte de la instrucción "Háblame de volcanes" y mejórala en cuatro pasos. En cada paso, cuenta cuántas de las cuatro piezas tiene.</p>
      <ol class="pasos-ej">
        <li>Versión 1: "Háblame de volcanes". Solo dice el tema, así que tiene 0 de las 4 piezas.</li>
        <li>Agrega la tarea para que sepa qué hacer: "Explícame por qué hacen erupción los volcanes". Ahora tiene 1 pieza.</li>
        <li>Agrega el público y la extensión: "para sexto grado, en 5 líneas". Pasa de 1 a 3 piezas.</li>
        <li>Agrega el formato: "en una lista de 5 puntos, uno por línea". Ahora tiene las 4 piezas.</li>
      </ol>
      <p>Resultado: <span class="resultado">Explícame por qué hacen erupción los volcanes, para sexto grado, en 5 líneas, como una lista de 5 puntos</span>.</p>
      <p>Para comprobarlo, lee la instrucción final y pregunta: ¿sabe qué hacer, para quién, cuánto y cómo? Si una respuesta es "no", falta esa pieza.</p>
      <p class="nota"><strong>Error común:</strong> agregar detalles que no cambian nada, como "por favor responde bien", en lugar de las piezas que faltan.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas instrucciones es más clara?</p>', opciones: ['Háblame del agua', 'Ayúdame con ciencias', 'Explica el ciclo del agua en 6 líneas, para alguien de 10 años', 'Dame información sobre cosas del agua'], correcta: 2,
        pista: '<p>Busca la que dice la tarea, el público y la extensión.</p>',
        solucion: '<p>La tercera dice la tarea (explicar el ciclo del agua), el público (alguien de 10 años) y la extensión (6 líneas).</p>' },
      { tipo: 'opciones', enunciado: '<p>Quieres comparar dos animales de forma ordenada. ¿Qué pieza de la instrucción pide eso?</p>', opciones: ['El tema', 'El formato, por ejemplo "en una tabla de dos columnas"', 'Un saludo amable', 'Repetir la instrucción dos veces'], correcta: 1,
        pista: '<p>Según Google, puedes pedir una tabla, una lista, un párrafo o una oración.</p>',
        solucion: '<p>El formato dice cómo quieres la respuesta. Una tabla de dos columnas sirve para comparar.</p>' },
      { tipo: 'opciones', enunciado: '<p>Necesitas un resumen largo y un cartel sobre el mismo tema. Según Google, ¿qué conviene hacer?</p>', opciones: ['Pedir todo en una sola instrucción enorme', 'Dividir el trabajo en partes más simples y pedirlas una por una', 'Pedir el cartel primero y no leer lo demás', 'Cambiar de tema'], correcta: 1,
        pista: '<p>Piensa en tareas complejas.</p>',
        solucion: '<p>Según Google, para tareas complejas conviene dividir la instrucción en componentes más simples.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Anthropic, suele funcionar mejor decir qué hacer. ¿Cuál instrucción sigue esa idea?</p>', opciones: ['No uses palabras difíciles ni frases largas', 'No hagas un texto aburrido', 'No escribas más de lo necesario', 'Usa palabras sencillas y frases cortas'], correcta: 3,
        pista: '<p>Busca la que dice lo que sí quieres.</p>',
        solucion: '<p>"Usa palabras sencillas y frases cortas" dice lo que sí quieres. Las otras solo dicen lo que no.</p>' },
      { tipo: 'numero', enunciado: '<p>Una instrucción dice: "Resume este texto, para alguien de 10 años, en 3 frases, como una lista". Las cuatro piezas son tarea, público, extensión y formato. ¿Cuántas de las cuatro tiene?</p>', respuesta: 4,
        pista: '<p>Marca cada pieza: resumir, 10 años, 3 frases, lista.</p>',
        solucion: '<p>Tiene la tarea (resumir), el público (10 años), la extensión (3 frases) y el formato (lista): <strong>4</strong> piezas.</p>' },
      { tipo: 'opciones', enunciado: '<p>La respuesta que te dio la herramienta salió demasiado larga. ¿Qué haces?</p>', opciones: ['Dejar de usar la herramienta', 'Agregar la pieza que faltó, por ejemplo "en 5 líneas", y probar otra vez', 'Escribir lo mismo con mayúsculas', 'Creer que la respuesta es la mejor posible'], correcta: 1,
        pista: '<p>Según Google, diseñar instrucciones es un proceso de prueba y ajuste.</p>',
        solucion: '<p>Se ajusta la instrucción agregando la extensión y se vuelve a probar.</p>' },
    ],
    fuentes: [F1, F2, F5],
  });

  // ------------------------------------------------------------------
  const FLUJO2 = diagrama([0, 20], [0, 8], [
    ...caja(3, 6.6, 5, 1.4, 'Instrucción'),
    ...caja(3, 4, 5, 1.4, 'Contexto'),
    ...caja(3, 1.4, 5, 1.4, 'Ejemplos'),
    ...flecha([5.5, 6.2], [8.2, 4.5]),
    ...flecha([5.5, 4], [8.2, 4]),
    ...flecha([5.5, 1.8], [8.2, 3.5]),
    ...caja(10.4, 4, 4, 1.8, 'Modelo'),
    ...flecha([12.4, 4], [14.2, 4]),
    ...caja(17, 4, 5, 2.4, 'Respuesta'),
    txt(17, 2.4, 'con el formato pedido'),
  ], 'Diagrama de flujo. A la izquierda, tres cajas: instrucción, contexto y ejemplos. De cada una sale una flecha hacia una caja llamada modelo. Del modelo sale una flecha hacia una caja llamada respuesta, con el formato pedido.');

  L('Dar contexto y ejemplos', {
    objetivo: 'Mejorar una instrucción dándole contexto, uno o dos ejemplos y, si ayuda, un rol, y reconocer qué pieza hace que la respuesta salga con el formato esperado.',
    vidaReal: `
      <p>Cuando le pides ayuda a un amigo, le cuentas para qué la necesitas, y si quieres algo parecido a otra cosa, se la enseñas. Lo mismo funciona con una herramienta de IA. Te sirve para hacer tarjetas de estudio con el formato que prefieres, preparar un mensaje con el tono adecuado o pedir una explicación a tu nivel. Dar un poco de contexto y un par de ejemplos cambia mucho el resultado, y casi no cuesta trabajo.</p>`,
    explicacion: `
      <p>Piensa en un compañero nuevo en tu salón. Si le pides "hazme una tarjeta", no sabe cuál es el tema ni cómo te gustan. Pero si le muestras dos tarjetas ya hechas, entiende enseguida. A la IA le pasa igual: no tiene idea de lo que tú tienes en la cabeza.</p>
      <h3>El modelo solo sabe lo que hay en la conversación</h3>
      <p>Como viste en "Contexto y memoria", el modelo trabaja con lo que está dentro de la conversación. Todo lo que no escribas, no lo sabe. Según Google, conviene dar al modelo la información que necesita en lugar de suponer que ya la tiene. Útil es decir para quién es el resultado, qué nivel tienes, para qué lo vas a usar y los datos que hacen falta.</p>
      <h3>Ejemplos que muestran el formato</h3>
      <p>Un <strong>ejemplo</strong> dentro de la instrucción enseña mejor que una descripción larga. Según IBM, una instrucción con pocos ejemplos (en inglés, <span lang="en">few-shot</span>) consiste en darle al modelo unos cuantos ejemplos de la tarea para guiar su desempeño. Según Google, uno de los objetivos de agregar ejemplos es mostrar el formato de respuesta que buscas.</p>
      <p>Si no incluyes ejemplos, la técnica se llama <span lang="en">zero-shot</span>, o sin ejemplos: según IBM, al modelo no se le dan ejemplos de la salida que se quiere. No es mala, solo da menos pistas del formato.</p>
      <h3>Un rol para orientar el estilo</h3>
      <p>Un <strong>rol</strong> es el papel que le pides que tome, por ejemplo "actúa como un profesor de ciencias". Según Anthropic, asignar un rol en las instrucciones de sistema, que son las que da el proveedor de una aplicación, orienta el comportamiento y el tono del modelo. Algo parecido puedes hacer en tu instrucción, como simplificación, diciéndole con qué estilo explicar.</p>
      ${FLUJO2}
      <p>Fíjate en el diagrama: la instrucción, el contexto y los ejemplos entran juntos al modelo, y de ahí sale una respuesta que sigue el formato que mostraste. Si falta alguna de las tres entradas, el modelo rellena el hueco por su cuenta, y puede que no sea como querías. Por eso, cuando una respuesta no te convence, revisa primero qué le faltó decir, antes de pensar que la herramienta "no entiende".</p>
      <h3>Cuida tus datos</h3>
      <p>Dar contexto no significa contar todo. No escribas datos personales ni privados, como tu dirección, tu escuela completa o fotos de otras personas. En "Privacidad: qué no compartir" verás por qué.</p>
      <p class="nota"><strong>Trampa común:</strong> dar un solo ejemplo muy particular. El modelo puede copiar justo ese detalle; con dos ejemplos distintos se nota mejor el patrón.</p>`,
    ejemplo: `
      <p>Quieres tarjetas para aprender vocabulario de ciencias. Compara dos instrucciones y elige cuál da el formato esperado. Los ejemplos son de ejemplo.</p>
      <p>Versión A: "Hazme tarjetas de vocabulario de ciencias".</p>
      <p>Versión B: "Soy de sexto grado y estudio el sistema solar. Hazme 5 tarjetas con este formato. Planeta: cuerpo que gira alrededor de una estrella. Satélite: cuerpo que gira alrededor de un planeta."</p>
      <ol class="pasos-ej">
        <li>Busca la tarea: en las dos, hacer tarjetas.</li>
        <li>Busca el contexto: solo la B dice el grado y el tema, por lo que la A tendría que adivinarlos.</li>
        <li>Busca los ejemplos: la B incluye 2, "planeta" y "satélite", y la A ninguno.</li>
        <li>Busca el formato: la B lo muestra con sus ejemplos, y la A no lo dice.</li>
      </ol>
      <p>Resultado: <span class="resultado">la versión B tiene 4 piezas y la A solo 1, así que la B dará el formato esperado</span>.</p>
      <p>Para comprobarlo, mira si podrías copiar el formato de los ejemplos a una tarjeta nueva. Si puedes, el modelo también.</p>
      <p class="nota"><strong>Error común:</strong> pedir "tarjetas" y quejarse del formato, cuando nunca se mostró cuál era.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según Google, ¿por qué conviene darle información a la herramienta?</p>', opciones: ['Porque no tiene por qué saber lo que tú sabes', 'Porque se aburre si escribes poco', 'Porque cobra por palabra', 'Porque así recuerda todo para siempre'], correcta: 0,
        pista: '<p>Recuerda "Contexto y memoria": solo sabe lo que hay en la conversación.</p>',
        solucion: '<p>Según Google, conviene dar la información que el modelo necesita en lugar de suponer que ya la tiene.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según IBM, ¿qué es una instrucción con pocos ejemplos (<span lang="en">few-shot</span>)?</p>', opciones: ['Una instrucción muy corta', 'Una instrucción sin ninguna información', 'Una instrucción que incluye unos cuantos ejemplos de la tarea', 'Una instrucción en inglés'], correcta: 2,
        pista: '<p>La palabra "shot" aquí quiere decir "ejemplo".</p>',
        solucion: '<p>Es darle al modelo unos cuantos ejemplos de la tarea para guiar su desempeño.</p>' },
      { tipo: 'opciones', enunciado: '<p>Quieres que la respuesta tenga una línea con la palabra y otra con su significado. ¿Qué te ayuda más según Google?</p>', opciones: ['Escribir en mayúsculas', 'Pedir "hazlo bonito"', 'Incluir un ejemplo con ese formato', 'Repetir la instrucción'], correcta: 2,
        pista: '<p>Según Google, un objetivo de los ejemplos es mostrar el formato.</p>',
        solucion: '<p>Un ejemplo que muestre la palabra en una línea y el significado en otra enseña el formato mejor que una descripción.</p>' },
      { tipo: 'numero', enunciado: '<p>Una instrucción tiene tarea, contexto (grado y tema) y dos ejemplos que muestran el formato. Cuenta las piezas: tarea, contexto, ejemplos y formato. ¿Cuántas piezas tiene?</p>', respuesta: 4,
        pista: '<p>Los ejemplos muestran el formato, así que cuentan para las dos últimas piezas.</p>',
        solucion: '<p>Tiene las cuatro piezas: tarea, contexto, ejemplos y formato, o sea <strong>4</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Quieres que te expliquen un tema con la paciencia de un profesor. ¿Cuál instrucción usa un rol?</p>', opciones: ['Actúa como un profesor de ciencias y explícame cómo se forma la lluvia', 'Explícame la lluvia, no la hagas difícil', 'Lluvia, 3 líneas', 'Dime todo sobre el clima'], correcta: 0,
        pista: '<p>El rol es el papel que le pides tomar.</p>',
        solucion: '<p>"Actúa como un profesor de ciencias" asigna un rol, que orienta el estilo de la respuesta.</p>' },
      { tipo: 'opciones', enunciado: '<p>Para darle contexto a una herramienta de IA, ¿qué NO conviene escribir?</p>', opciones: ['Tu grado escolar', 'El tema que estudias', 'Tu dirección de casa y datos de tu familia', 'Para qué vas a usar la respuesta'], correcta: 2,
        pista: '<p>Piensa en datos privados.</p>',
        solucion: '<p>Los datos personales y privados no se comparten. Para dar contexto basta el grado, el tema y el uso.</p>' },
    ],
    fuentes: [F1, F2, F3, F4],
  });

  // ------------------------------------------------------------------
  const FLUJO3 = diagrama([0, 20], [0, 8], [
    ...caja(2.4, 6, 4.2, 1.8, '1 Separar'),
    ...flecha([4.6, 6], [5.6, 6], 0, 0.8),
    ...caja(7.8, 6, 4.2, 1.8, '2 Buscar'),
    ...flecha([10, 6], [11, 6], 0, 0.8),
    ...caja(13.2, 6, 4.2, 1.8, '3 Comprobar'),
    ...flecha([15.4, 6], [16.4, 6], 0, 0.8),
    ...caja(18.4, 6, 3.2, 1.8, '4 Usar'),
    ...flecha([13.2, 5], [13.2, 2.9]),
    ...caja(13.2, 1.8, 5.2, 1.8, 'No lo uses'),
    txt(16.9, 3.9, 'si no lo encuentras'),
  ], 'Diagrama de flujo con cuatro pasos de izquierda a derecha: separar, buscar, comprobar y usar. Del tercer paso sale una flecha hacia abajo, con el texto si no lo encuentras, hacia una caja llamada no lo uses.');

  L('Verificar lo que te responde', {
    objetivo: 'Comprobar lo que dice una herramienta de IA con un método corto de cuatro pasos, usando lectura lateral y dos fuentes fiables, y decidir qué usar, qué corregir y qué descartar.',
    vidaReal: `
      <p>Una respuesta bien escrita suena segura, aunque esté equivocada. Eso importa cuando buscas un dato para la escuela, copias una fecha o una cifra en un trabajo o te llega una recomendación sobre dinero o salud. Un método corto para comprobar te da tranquilidad: sabes qué parte de la respuesta puedes usar y qué parte necesita revisión. También te hace más difícil de engañar, venga el texto de una herramienta, de una red social o de un video.</p>`,
    explicacion: `
      <p>La respuesta llegó en segundos, está bien escrita y hasta trae un enlace. ¿Con eso basta? Como viste en "Alucinaciones: cuando la IA inventa", no. Según IBM, una herramienta de IA generativa puede presentar datos falsos, estudios inventados y enlaces que no existen como si fueran hechos.</p>
      <h3>Qué se puede comprobar</h3>
      <p>No todo en una respuesta se comprueba igual. Una <strong>afirmación comprobable</strong> es una frase que se puede confirmar o desmentir: cifras, fechas, nombres, citas y enlaces. Una opinión, en cambio, no se comprueba; sobre eso trata "Hechos y opiniones", de Lectura.</p>
      <h3>Lectura lateral</h3>
      <p>Según un artículo de la Universidad de Stanford (EE. UU., 2017), los verificadores profesionales primero hojean la página y luego abren otros sitios en otras pestañas para buscar comparaciones y contexto. A eso se le llama <strong>lectura lateral</strong>. El mismo artículo cuenta que, en el estudio de Wineburg y McGrew, los verificadores evaluaron con más acierto la credibilidad de la información en línea que historiadores y estudiantes. No quiere decir que la lectura lateral lo explique todo, pero es un buen hábito.</p>
      <h3>Método de cuatro pasos</h3>
      <p>Este método es una recomendación de la lección.</p>
      <ol>
        <li>Separa las afirmaciones comprobables de la respuesta.</li>
        <li>Búscalas fuera del chat, en dos fuentes fiables e independientes. Una <strong>fuente fiable</strong> es una que dice quién la escribe, cita de dónde saca los datos y se puede revisar, como un organismo oficial o una institución educativa.</li>
        <li>Comprueba que los enlaces y las fuentes citadas existan y digan eso.</li>
        <li>Si no lo encuentras, no lo uses.</li>
      </ol>
      ${FLUJO3}
      <h3>Cuándo es más importante</h3>
      <p>Según IBM, la supervisión humana es esencial donde las alucinaciones pueden causar daño importante. Por eso, lo que importa, como salud, dinero y tareas que se califican, siempre se verifica. Para temas de salud o dinero, además, consulta a un adulto de confianza o a un profesional.</p>
      <p>Fíjate en que el paso 2 pide dos fuentes y no una. Si una fuente se equivoca, la otra lo deja ver; y si las dos dicen lo mismo sin copiarse entre sí, es más difícil que ambas fallen. Que sean independientes quiere decir que una no repite a la otra. Esto es una recomendación de la lección: contrastar con dos fuentes antes de usar un dato que importa.</p>
      <p>Para aprender más sobre cómo evaluar fuentes, ve a "Verificar noticias y detectar desinformación", de Lectura.</p>
      <p class="nota"><strong>Trampa común:</strong> pedirle a la misma herramienta que se confirme a sí misma. Eso no cuenta como fuente independiente.</p>`,
    ejemplo: `
      <p>Una herramienta de IA responde sobre un río de ejemplo con 4 afirmaciones. Buscaste en dos fuentes fiables. Las cifras son de ejemplo.</p>
      ${tabla(['Afirmación', 'Fuente A', 'Fuente B', 'Decisión'], [
        ['Mide 1 200 km', '1 200 km', '1 200 km', 'Usar'],
        ['Pasa por 5 países', '4 países', '4 países', 'Corregir a 4'],
        ['Lo estudió "Pérez, 2019"', 'No aparece', 'No aparece', 'Descartar'],
        ['Desemboca en un mar', 'Sí, en un mar', 'Sí, en un mar', 'Usar'],
      ])}
      <ol class="pasos-ej">
        <li>Si las dos fuentes coinciden con la respuesta, se usa.</li>
        <li>Si coinciden entre sí pero no con la respuesta, se corrige con lo que dicen ellas.</li>
        <li>Si no aparece en ninguna, se descarta.</li>
        <li>Cuenta las confirmadas tal cual: 2 de 4, o sea 2 ÷ 4 = 0.5, que es 50 %.</li>
      </ol>
      <p>Resultado: <span class="resultado">se usan 2, se corrige 1 y se descarta 1; solo el 50 % estaba confirmado</span>.</p>
      <p class="nota"><strong>Error común:</strong> quedarse con la parte que suena bien y no buscar la cita que no aparece.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas frases es una afirmación comprobable?</p>', opciones: ['Ese libro es muy bonito', 'La ciudad fue fundada en 1850', 'Creo que se sentía triste', 'Es la mejor película'], correcta: 1,
        pista: '<p>Se puede comprobar una fecha, una cifra, un nombre o una cita.</p>',
        solucion: '<p>Una fecha se puede confirmar o desmentir. Las otras son opiniones o gustos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es la lectura lateral?</p>', opciones: ['Leer solo los lados de la página', 'Leer un texto dos veces seguidas', 'Abrir otros sitios en otras pestañas para ver quién respalda lo que lees', 'Leer en voz alta'], correcta: 2,
        pista: '<p>Los verificadores buscan comparaciones y contexto fuera de la página.</p>',
        solucion: '<p>Es hojear la página y abrir otros sitios en otras pestañas para buscar comparaciones y contexto.</p>' },
      { tipo: 'opciones', enunciado: '<p>La respuesta trae un enlace. ¿Qué haces con él?</p>', opciones: ['Lo doy por bueno porque es un enlace', 'Compruebo que exista y que diga lo que la respuesta afirma', 'Lo borro sin mirar', 'Lo copio en mi trabajo'], correcta: 1,
        pista: '<p>Según IBM, la IA puede presentar enlaces que no existen.</p>',
        solucion: '<p>Hay que abrirlo y comprobar que exista y que respalde esa afirmación.</p>' },
      { tipo: 'opciones', enunciado: '<p>Buscas un dato y solo lo encuentras en la propia respuesta de la herramienta. ¿Qué dice el método de la lección?</p>', opciones: ['Usarlo, porque suena seguro', 'Preguntarle a la misma herramienta si es verdad', 'Cambiarle una cifra', 'No usarlo mientras no lo encuentres en otras fuentes'], correcta: 3,
        pista: '<p>El cuarto paso del método dice qué hacer si no lo encuentras.</p>',
        solucion: '<p>Si no lo encuentras en fuentes fiables, no lo uses.</p>' },
      { tipo: 'numero', enunciado: '<p>Una respuesta de ejemplo tiene 5 afirmaciones comprobables y confirmaste 4 en dos fuentes. ¿Qué porcentaje está confirmado?</p>', respuesta: 4 / 5 * 100,
        pista: '<p>Divide las confirmadas entre el total y multiplica por 100.</p>',
        solucion: '<p>4 ÷ 5 = 0.8, y 0.8 × 100 = <strong>80</strong> %. Cifras de ejemplo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿En cuál de estos casos es más importante verificar?</p>', opciones: ['Un chiste para tu cuaderno', 'Una cifra para un trabajo que te van a calificar', 'El nombre de un juego inventado', 'Una idea para decorar tu cuarto'], correcta: 1,
        pista: '<p>Lo que importa, como salud, dinero y tareas, siempre se verifica.</p>',
        solucion: '<p>La cifra de un trabajo calificado importa, así que se verifica con dos fuentes fiables.</p>' },
    ],
    fuentes: [F20, F21],
  });

  // ------------------------------------------------------------------
  L('Usar IA para estudiar sin hacer trampa', {
    objetivo: 'Distinguir cuándo una herramienta de IA te ayuda a aprender y cuándo hace el trabajo por ti, y aplicar una prueba rápida y las reglas de tu escuela.',
    vidaReal: `
      <p>Una herramienta de IA puede ser como un tutor que tiene paciencia a cualquier hora: te explica de otra forma, te hace preguntas o te da ejercicios para practicar. Usada así, estudias mejor. Pero también puede hacer la tarea entera, y entonces no aprendes lo que la tarea buscaba. Saber la diferencia te sirve para sacar provecho, para llegar bien preparado a un examen y para cumplir las reglas de tu escuela con tranquilidad.</p>`,
    explicacion: `
      <p>Tienes tarea de historia. Una opción es pedirle a la IA que la escriba. Otra es pedirle que te haga preguntas hasta que entiendas el tema. En las dos usas la misma herramienta, pero solo una te deja algo contigo.</p>
      <h3>Qué es el plagio</h3>
      <p>Según el Diccionario de la lengua española de la RAE, citado en Wikipedia, <strong>plagiar</strong> es "copiar en lo sustancial obras ajenas, dándolas como propias". Si una herramienta escribe un texto y lo entregas como tuyo, hay un problema parecido: tu nombre dice algo que no es cierto.</p>
      <h3>Recordar sin mirar</h3>
      <p>Hay una razón más para no dejar que otro piense por ti. La <strong>práctica de recuperación</strong>, también llamada efecto de prueba, es tratar de recordar sin mirar. Según Wikipedia (en inglés), sugiere que la memoria a largo plazo aumenta si parte del tiempo de estudio se dedica a recordar la información. Por eso las preguntas que te hace la IA ayudan, y una respuesta lista te quita ese esfuerzo.</p>
      ${tabla(['Te ayuda a aprender', 'Hace el trabajo por ti'], [
        ['Explicarte un tema de otra forma', 'Escribir la tarea completa'],
        ['Hacerte preguntas para que recuerdes', 'Dar las respuestas del cuestionario para copiarlas'],
        ['Señalar partes confusas de tu borrador mientras tú lo corriges', 'Reescribir todo tu borrador para que lo entregues'],
        ['Darte ejercicios parecidos para practicar', 'Resolver tus ejercicios y que solo pegues el resultado'],
        ['Decirte qué parte del tema repasar', 'Hacer un resumen que entregas como si fuera tuyo'],
      ])}
      <h3>Una prueba rápida</h3>
      <p>Hazte esta pregunta: ¿podrías explicarlo sin la IA? Si la respuesta es sí, la usaste para aprender. Si es no, vuelve a estudiarlo con tus palabras. Es un criterio de la lección, no una regla oficial.</p>
      <h3>Reglas de tu escuela</h3>
      <p>Según una guía para docentes de España (INTEF, 2026), la IA no puede reemplazar el esfuerzo personal ni el desarrollo de competencias esenciales para el aprendizaje. La misma guía dice que es recomendable informar, citar y referenciar los contenidos generados con IA. Entonces, si usas IA, dilo. Las reglas cambian de un lugar a otro y, según una encuesta de la UNESCO en más de 450 escuelas y universidades (2023), menos del 10 % tenía políticas formales sobre IA generativa. Pregunta qué se permite y qué no.</p>
      <p>Según la UNESCO (vía Noticias ONU, septiembre de 2023), un niño debe tener al menos 13 años para empezar a usar herramientas de IA en las aulas. Revisa las reglas de tu país y tu escuela, y usa estas herramientas con un adulto o docente.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que "casi nadie se entera" es una razón. La razón es que la tarea existe para que tú aprendas.</p>`,
    ejemplo: `
      <p>Clasifica estos 6 usos en tres grupos: ayuda, depende de las reglas y reemplaza. Luego cuenta cuántos hay en cada grupo.</p>
      <ol class="pasos-ej">
        <li>"Hazme 5 preguntas sobre la Revolución para ver si la entendí": ayuda, porque te hace recordar.</li>
        <li>"Explícame este tema de otra forma": ayuda, porque tú sigues pensando.</li>
        <li>"Dime qué parte de mi borrador es confusa", y luego corriges tú: ayuda, porque el trabajo sigue siendo tuyo.</li>
        <li>"Corrige la ortografía de mi texto": depende de las reglas, porque algunas escuelas lo permiten y otras no.</li>
        <li>"Escribe mi tarea completa" y la entregas: reemplaza, porque tu nombre dice algo que no hiciste.</li>
        <li>"Dame las respuestas del examen en casa" y las copias: reemplaza, porque no practicaste.</li>
      </ol>
      <p>Resultado: <span class="resultado">3 ayudan, 1 depende de las reglas y 2 reemplazan</span>.</p>
      <p>Para comprobarlo, suma los grupos: 3 + 1 + 2 = 6, los mismos usos del inicio.</p>
      <p class="nota"><strong>Error común:</strong> clasificar por la herramienta y no por lo que haces tú. Importa quién piensa.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según la RAE, citada en Wikipedia, ¿qué es plagiar?</p>', opciones: ['Leer un libro dos veces', 'Copiar en lo sustancial obras ajenas, dándolas como propias', 'Explicar un tema con tus palabras', 'Usar una biblioteca'], correcta: 1,
        pista: '<p>Fíjate en la parte de "dándolas como propias".</p>',
        solucion: '<p>Plagiar es copiar en lo sustancial obras ajenas, dándolas como propias.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos usos te ayuda a aprender?</p>', opciones: ['Pedirle que haga tu tarea completa', 'Copiar sus respuestas sin leerlas', 'Entregar un texto suyo con tu nombre', 'Pedirle que te haga preguntas hasta que entiendas el tema'], correcta: 3,
        pista: '<p>Elige el uso en el que tú sigues pensando.</p>',
        solucion: '<p>Las preguntas te hacen recordar y pensar. En las demás, el trabajo lo hace la herramienta.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Wikipedia, ¿qué sugiere el efecto de prueba?</p>', opciones: ['Que estudiar menos siempre es mejor', 'Que la memoria a largo plazo aumenta si parte del estudio se dedica a recordar la información', 'Que los exámenes no sirven', 'Que leer una sola vez basta'], correcta: 1,
        pista: '<p>Se trata de recordar sin mirar.</p>',
        solucion: '<p>Dedicar parte del tiempo a recordar la información aumenta la memoria a largo plazo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Terminaste un trabajo con ayuda de la IA. Según la prueba rápida de la lección, ¿qué te preguntas?</p>', opciones: ['¿Cuánto tardó la respuesta?', '¿Podría explicarlo sin la IA?', '¿Cuántas palabras tiene?', '¿Se nota que lo usé?'], correcta: 1,
        pista: '<p>Se trata de si aprendiste.</p>',
        solucion: '<p>La pregunta es si podrías explicarlo sin la IA. Si no, vuelve a estudiarlo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tu escuela no dice nada sobre el uso de IA. ¿Qué haces?</p>', opciones: ['Asumir que todo está permitido', 'Preguntar a tu docente qué se permite y avisar cuándo la usaste', 'No preguntar nunca', 'Ocultar que la usaste'], correcta: 1,
        pista: '<p>Según la UNESCO, menos del 10 % de las instituciones de su encuesta tenía políticas formales.</p>',
        solucion: '<p>Pregunta qué se permite y di cuándo usaste IA, como recomienda INTEF.</p>' },
      { tipo: 'numero', enunciado: '<p>De 6 usos de ejemplo, 3 ayudan a aprender y 1 depende de las reglas. ¿Cuántos reemplazan tu trabajo?</p>', respuesta: 6 - 3 - 1,
        pista: '<p>Resta del total los que ya clasificaste.</p>',
        solucion: '<p>6 − 3 − 1 = <strong>2</strong> usos reemplazan tu trabajo.</p>' },
    ],
    fuentes: [F22, F23, F24, F25],
  });
})();
