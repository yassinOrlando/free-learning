// Inteligencia artificial · Unidad 3: Modelos de lenguaje (LLMs).
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Sin marcas de chatbots ni "mejor modelo". Solo Jev y Laya (lección 7), con fecha. Las cifras de los ejemplos son de ejemplo.
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
  function barras({ etiquetas, valores, max, paso, descripcion }) {
    const n = valores.length;
    const figuras = valores.flatMap((v, i) => [
      { tipo: 'poligono', puntos: [[i + 0.15, 0], [i + 0.85, 0], [i + 0.85, v], [i + 0.15, v]], solido: true },
      txt(i + 0.5, -max * 0.07, etiquetas[i]),
      txt(i + 0.5, v + max * 0.05, String(v)),
    ]);
    return G({ x: [0, n], y: [-max * 0.12, max * 1.1], pasos: [1e9, paso], nombres: false, figuras, descripcion });
  }
  const tabla = (encabezados, filas) => '<div class="tabla-wrap"><table><thead><tr>' + encabezados.map((h) => `<th>${h}</th>`).join('') + '</tr></thead><tbody>' +
    filas.map((f) => '<tr>' + f.map((c) => `<td>${c}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>';

  const WIKI = (articulo, nombre) => ({ nombre: `${nombre} - Wikipedia en español`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const F1 = { nombre: 'IBM, What are large language models (LLMs)? (en inglés)', url: 'https://www.ibm.com/think/topics/large-language-models' };
  const F2 = WIKI('Modelo_de_lenguaje_grande', 'Modelo de lenguaje de gran tamaño');
  const F3 = { nombre: 'Hugging Face, LLM Course: Natural Language Processing and Large Language Models (en inglés)', url: 'https://huggingface.co/learn/llm-course/chapter1/2' };
  const F4 = { nombre: 'Hugging Face, LLM Course: Tokenizers (en inglés)', url: 'https://huggingface.co/learn/llm-course/chapter2/4' };
  const F5 = { nombre: 'Google, Gemini API: Comprender y contar tokens', url: 'https://ai.google.dev/gemini-api/docs/tokens' };
  const F6 = { nombre: 'Petrov, La Malfa, Torr y Bibi, Language Model Tokenizers Introduce Unfairness Between Languages, arXiv 2305.15425 (en inglés)', url: 'https://arxiv.org/abs/2305.15425' };
  const F7 = { nombre: 'Hugging Face, LLM Course: Deep dive into Text Generation Inference with LLMs (en inglés)', url: 'https://huggingface.co/learn/llm-course/chapter1/8' };
  const F8 = { nombre: 'IBM, What is LLM temperature? (en inglés)', url: 'https://www.ibm.com/think/topics/llm-temperature' };
  const F9 = { nombre: 'Anthropic, Claude Platform Docs: Glossary (en inglés)', url: 'https://docs.anthropic.com/en/docs/about-claude/glossary' };
  const F10 = { nombre: 'IBM, What is a context window? (en inglés)', url: 'https://www.ibm.com/think/topics/context-window' };
  const F11 = { nombre: 'Anthropic, Claude Platform Docs: Context windows (en inglés)', url: 'https://docs.anthropic.com/en/docs/build-with-claude/context-windows' };
  const F12 = { nombre: 'Anthropic, Claude Platform Docs: Using the Messages API (en inglés)', url: 'https://docs.anthropic.com/en/api/messages-examples' };
  const F20 = { nombre: 'IBM, What are AI hallucinations? (en inglés)', url: 'https://www.ibm.com/think/topics/ai-hallucinations' };
  const F21 = { nombre: 'Wikipedia, Mata v. Avianca, Inc. (en inglés)', url: 'https://en.wikipedia.org/wiki/Mata_v._Avianca,_Inc.' };
  const F23 = { nombre: 'IBM, What are AI agents? (en inglés)', url: 'https://www.ibm.com/think/topics/ai-agents' };
  const F24 = { nombre: 'Wikipedia, Knowledge cutoff (en inglés)', url: 'https://en.wikipedia.org/wiki/Knowledge_cutoff' };
  const F25 = WIKI('Jev_(modelo_de_IA)', 'Jev (modelo de IA)');
  const F26 = { nombre: 'TypeSafe AI, documentación: Introduction (en inglés)', url: 'https://docs.typesafe.ai/introduction' };
  const F27 = { nombre: 'TypeSafe AI, página principal (en inglés)', url: 'https://typesafe.ai/' };
  const F28 = { nombre: 'TypeSafe AI, blog: Introducing System One Models & Jev (en inglés)', url: 'https://typesafe.ai/blog/introducing-system-one-models-and-jev' };
  const F29 = { nombre: 'Hugging Face, convaiinnovations/laya (en inglés)', url: 'https://huggingface.co/convaiinnovations/laya' };

  // ------------------------------------------------------------------
  const FLUJO1 = diagrama([0, 20], [0, 7], [
    ...caja(2.6, 5.4, 4.4, 1.5, 'Mucho texto'),
    ...flecha([4.9, 5.4], [6.6, 5.4]),
    ...caja(9.2, 5.4, 4.6, 1.5, 'Entrenamiento'),
    ...flecha([11.6, 5.4], [13.6, 5.4]),
    ...caja(16.4, 5.4, 4.6, 1.5, 'Modelo'),
    ...caja(9.2, 1.6, 4.6, 1.5, 'Tu instrucción'),
    ...flecha([11.6, 2.2], [14.8, 4.5]),
    ...flecha([16.4, 4.6], [16.4, 2.5]),
    ...caja(16.4, 1.6, 4.6, 1.5, 'Respuesta'),
  ], 'Diagrama de flujo. Arriba, de izquierda a derecha: mucho texto, entrenamiento y modelo. Abajo, tu instrucción entra al modelo con una flecha, y otra flecha lleva del modelo a la respuesta.');

  L('Qué es un modelo de lenguaje', {
    objetivo: 'Explicar qué es un modelo de lenguaje grande, por qué se llama grande y en qué se distingue de un chatbot, y estimar a escala cuánto texto lee durante su entrenamiento.',
    vidaReal: `
      <p>Hoy hay programas que redactan un correo, resumen un texto largo o traducen una frase en segundos. Saber qué hay detrás te ayuda a usarlos con criterio. Si entiendes que son modelos que producen texto, y no personas ni enciclopedias, puedes aprovecharlos para borradores y explicaciones, y desconfiar cuando haga falta. También te sirve para leer noticias sobre IA sin asombro ni miedo, porque sabrás de qué tipo de herramienta hablan.</p>`,
    explicacion: `
      <p>Escribes una pregunta y, en unos segundos, aparece una respuesta con párrafos que suenan como si los hubiera escrito una persona. ¿Cómo puede un programa hacer eso? La respuesta empieza con una idea sencilla: aprendió de muchísimo texto.</p>
      <h3>¿Qué es un modelo de lenguaje?</h3>
      <p>Un <strong>modelo de lenguaje</strong> es un programa entrenado con texto para generar texto. Como viste en "Entrenar y evaluar un modelo", entrenar es ajustar un modelo con ejemplos hasta que acierte más. Aquí los ejemplos son frases, libros, artículos y páginas web. Según IBM, el entrenamiento de estos modelos empieza con una cantidad enorme de datos: miles de millones o billones de palabras de libros, artículos, sitios web, código y otros textos.</p>
      <h3>¿Por qué se llama grande?</h3>
      <p>Cuando el modelo es enorme se le llama modelo de lenguaje grande, o <span lang="en">large language model</span> (<strong>LLM</strong>, por sus siglas en inglés). Según IBM, un LLM es un tipo de modelo de aprendizaje profundo entrenado con cantidades inmensas de datos, capaz de entender y generar lenguaje natural y otros contenidos. El aprendizaje profundo es el de las redes con muchas capas que viste en "Redes neuronales explicadas sin fórmulas".</p>
      <p>La palabra <em>grande</em> también habla de su tamaño interno. Según el curso de Hugging Face, estos modelos tienen millones, miles de millones o incluso cientos de miles de millones de <strong>parámetros</strong>. Un parámetro es uno de los números que el modelo ajusta mientras aprende; son los pesos de la lección sobre redes neuronales. En "Tamaño de un modelo: parámetros y cuánta memoria ocupa" verás qué significan en la práctica.</p>
      ${FLUJO1}
      <h3>Modelo y chatbot no son lo mismo</h3>
      <p>El chatbot es la aplicación con la que conversas: la ventana donde escribes y lees. El modelo de lenguaje es el motor que trabaja por dentro. Es una diferencia parecida a la de un auto y su motor, y es una simplificación para entenderlo. Según IBM, los LLM actuales se construyen sobre una arquitectura de red neuronal llamada transformer, que es buena para manejar secuencias de palabras. De dónde salió esa arquitectura lo cuenta "Breve historia de la IA".</p>
      <h3>¿Qué tareas hace?</h3>
      <p>Según Wikipedia, los LLM pueden generar, resumir, traducir y analizar texto. Para hacerlo, un LLM no consulta una lista de respuestas guardadas. Produce el texto nuevo cada vez, palabra por palabra. Cómo lo hace es el tema de las dos lecciones siguientes.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que un modelo de lenguaje es una persona que entiende como tú. Es un programa que aprendió patrones de texto; por eso conviene tratarlo como una herramienta.</p>`,
    ejemplo: `
      <p>Un conjunto de texto de ejemplo tiene 10 000 millones de palabras. Una persona lee 250 palabras por minuto, 8 horas al día. ¿Cuántos años tardaría? Todas las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Primero calcula los minutos: 10 000 000 000 ÷ 250 = 40 000 000 minutos.</li>
        <li>Pasa los minutos a horas, porque lees por horas: 40 000 000 ÷ 60 ≈ 666 667 horas.</li>
        <li>Con 8 horas al día, los días son 666 667 ÷ 8 ≈ 83 333 días.</li>
        <li>Pasa los días a años: 83 333 ÷ 365 ≈ 228 años.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 228 años leyendo todos los días</span>.</p>
      <p>Para comprobarlo, multiplica al revés: 228 años × 365 días × 8 horas × 60 minutos × 250 palabras es casi 10 000 millones. Según IBM, los textos reales pueden ser aún mayores. Por eso un modelo se entrena con computadoras y no con lectura humana.</p>
      <p class="nota"><strong>Error común:</strong> olvidar pasar de minutos a horas antes de dividir entre las horas del día.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué es un modelo de lenguaje grande (LLM)?</p>', opciones: ['Un buscador que guarda respuestas escritas por personas', 'Un modelo entrenado con cantidades inmensas de texto para entender y generar lenguaje', 'Una persona que revisa textos en línea', 'Una base de datos de palabras ordenadas'], correcta: 1,
        pista: '<p>Piensa en qué hace con el texto durante su entrenamiento.</p>',
        solucion: '<p>Es un modelo de aprendizaje profundo entrenado con cantidades inmensas de datos, capaz de entender y generar lenguaje, según IBM.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas frases describe mejor la diferencia entre modelo y chatbot?</p>', opciones: ['El chatbot es el motor y el modelo es la ventana donde escribes', 'Son exactamente lo mismo', 'El chatbot es la aplicación con la que conversas y el modelo trabaja por dentro', 'El modelo solo existe en celulares'], correcta: 2,
        pista: '<p>Recuerda la comparación con el auto y su motor.</p>',
        solucion: '<p>El chatbot es la aplicación que ves; por dentro usa un modelo de lenguaje. Es una forma simple de explicarlo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según el curso de Hugging Face, ¿qué quiere decir que un modelo es grande?</p>', opciones: ['Que ocupa mucho espacio en tu escritorio', 'Que solo sabe un idioma', 'Que lo usan muchas personas a la vez', 'Que tiene millones o miles de millones de parámetros'], correcta: 3,
        pista: '<p>La palabra "grande" se refiere a una cantidad de números internos del modelo.</p>',
        solucion: '<p>Estos modelos tienen millones, miles de millones o incluso cientos de miles de millones de parámetros.</p>' },
      { tipo: 'numero', enunciado: '<p>Un texto de ejemplo tiene 5 000 millones de palabras y una persona lee 250 palabras por minuto. ¿Cuántos millones de minutos necesita? (cifras de ejemplo)</p>', respuesta: 5000 / 250,
        pista: '<p>Divide las palabras entre las palabras por minuto. Trabaja con millones para no escribir tantos ceros.</p>',
        solucion: '<p>5 000 millones ÷ 250 = 20 millones de minutos, o sea <strong>20</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la lección, ¿qué tareas pueden hacer los LLM?</p>', opciones: ['Solo contar palabras', 'Solo traducir', 'Generar, resumir, traducir y analizar texto', 'Sustituir a tus profesores'], correcta: 2,
        pista: '<p>Recuerda la lista que da Wikipedia.</p>',
        solucion: '<p>Según Wikipedia, los LLM pueden generar, resumir, traducir y analizar texto.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Con qué se entrena un modelo de lenguaje?</p>', opciones: ['Con una cantidad enorme de texto', 'Con una sola página web', 'Con fotos únicamente', 'Con las preguntas que le haces en ese momento'], correcta: 0,
        pista: '<p>Según IBM, el entrenamiento empieza con miles de millones o billones de palabras.</p>',
        solucion: '<p>Con una cantidad enorme de texto: libros, artículos, sitios web, código y otras fuentes.</p>' },
    ],
    fuentes: [F1, F2, F3],
  });

  // ------------------------------------------------------------------
  L('Tokens: cómo "lee" un LLM', {
    objetivo: 'Explicar qué es un token, cómo se convierte un texto en números y estimar cuántos tokens tiene un texto con una regla aproximada.',
    vidaReal: `
      <p>Casi todas las herramientas de IA miden lo que escribes y lo que responden en tokens. Esa medida decide cuánto texto cabe en una conversación y, en algunos servicios, cuánto cuesta usarlos. Saber qué es un token te ayuda a entender por qué una respuesta se corta, por qué un mismo texto puede gastar más en un idioma que en otro y cómo estimar cuánto le cabe a una herramienta.</p>`,
    explicacion: `
      <p>Tú lees letras, las juntas en palabras y las palabras en frases. Un modelo de lenguaje no lee así. Antes de procesar tu mensaje, lo corta en trozos pequeños, y esos trozos se llaman tokens.</p>
      <h3>Cortar el texto en trozos</h3>
      <p>Según IBM, los <strong>tokens</strong> son unidades pequeñas como palabras, subpalabras o caracteres. Según el curso de Hugging Face, el primer paso es dividir el texto en palabras o partes de palabras, y a esos trozos se les suele llamar tokens. Ese corte se llama <strong>tokenización</strong>. Mira cómo podría quedar una frase; el corte y los números son de ejemplo, porque cada modelo corta a su manera.</p>
      ${tabla(['Token', 'Me', ' gusta', ' el', ' choco', 'late', ' caliente'], [['Número de ejemplo', '312', '1507', '89', '4021', '733', '2260']])}
      <p>Fíjate en que <em>gusta</em> cabe en un solo token, mientras que <em>chocolate</em> se partió en dos. Fíjate también en que, en este ejemplo, el espacio antes de cada palabra forma parte de su token. No es una regla fija: según el modelo, algunas palabras caben en un token y otras se parten en trozos.</p>
      <h3>Cada token es un número</h3>
      <p>Una red neuronal trabaja con números, no con letras. Según el curso de Hugging Face, el segundo paso es convertir esos tokens en números. Cada modelo tiene su lista de tokens posibles, y a esa lista se le llama <strong>vocabulario</strong>. Como simplificación, imagina que el número de cada token es su posición en la lista, como el número de una página en un índice.</p>
      <h3>¿Cuántos tokens tiene un texto?</h3>
      <p>No hay una cuenta exacta que valga para todos, pero sí una regla aproximada. Según la documentación de Google para sus modelos (23 de septiembre de 2026), un token equivale a unos 4 caracteres, y 100 tokens equivalen a entre 60 y 80 palabras en inglés. Cada modelo cuenta distinto, así que revisa la información vigente de la herramienta que uses.</p>
      <h3>Los idiomas no cuestan lo mismo</h3>
      <p>La regla anterior habla de inglés. Petrov y su equipo (2023) midieron que el mismo texto traducido a distintos idiomas puede tener longitudes de tokenización muy distintas: hasta 15 veces más en algunos casos. Así, en un servicio que cobra por token, decir lo mismo en otro idioma puede gastar más. Los límites de cuánto cabe en una conversación se cuentan también en tokens; los verás en "Contexto y memoria".</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que un token es una palabra. A veces es una palabra, pero también puede ser una sílaba, un signo de puntuación o un carácter suelto.</p>`,
    ejemplo: `
      <p>Quieres estimar cuántos tokens tienen dos textos, usando la regla de Google: 1 token son unos 4 caracteres, y 100 tokens son entre 60 y 80 palabras en inglés. Los textos son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>El primer texto tiene 400 caracteres. Como cada token son unos 4 caracteres, divide 400 ÷ 4 = 100 tokens.</li>
        <li>El segundo texto tiene 300 palabras en inglés. Si 100 tokens son entre 60 y 80 palabras, cuenta cuántos grupos de 100 tokens caben en 300 palabras, con las dos medidas: 300 ÷ 80 = 3.75 y 300 ÷ 60 = 5.</li>
        <li>Multiplica por 100 para pasar de grupos a tokens: 3.75 × 100 = 375 y 5 × 100 = 500.</li>
      </ol>
      <p>Resultado: <span class="resultado">400 caracteres son unos 100 tokens, y 300 palabras en inglés son entre 375 y 500 tokens</span>.</p>
      <p>Para comprobarlo, multiplica al revés: 100 tokens × 4 caracteres dan 400. Es una estimación y no una medida exacta.</p>
      <p class="nota"><strong>Error común:</strong> usar la regla del inglés como si valiera igual en otros idiomas, donde pueden salir más tokens.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué es un token?</p>', opciones: ['Un trozo pequeño de texto, como una palabra, una parte de palabra o un carácter', 'Una moneda digital', 'Una contraseña del modelo', 'Una respuesta completa'], correcta: 0,
        pista: '<p>Piensa en cómo el modelo corta tu mensaje antes de procesarlo.</p>',
        solucion: '<p>Según IBM, los tokens son unidades pequeñas como palabras, subpalabras o caracteres.</p>' },
      { tipo: 'numero', enunciado: '<p>Un texto tiene 800 caracteres. Con la regla de 1 token por cada 4 caracteres, ¿cuántos tokens son aproximadamente?</p>', respuesta: 800 / 4,
        pista: '<p>Divide los caracteres entre 4.</p>',
        solucion: '<p>800 ÷ 4 = <strong>200</strong> tokens, como estimación.</p>' },
      { tipo: 'numero', enunciado: '<p>Un texto en inglés tiene 600 palabras. Usa el extremo de la regla de 80 palabras por cada 100 tokens. ¿Cuántos tokens son, como mínimo?</p>', respuesta: 600 / 80 * 100,
        pista: '<p>Primero calcula cuántos grupos de 80 palabras hay.</p>',
        solucion: '<p>600 ÷ 80 = 7.5 grupos, y 7.5 × 100 = <strong>750</strong> tokens.</p>' },
      { tipo: 'numero', enunciado: '<p>Un modelo cortó la frase de la tabla (Me, gusta, el, choco, late, caliente) en trozos. ¿Cuántos tokens tiene esa frase?</p>', respuesta: 6,
        pista: '<p>Cuenta los trozos de la fila de tokens en la tabla.</p>',
        solucion: '<p>Son <strong>6</strong> tokens. Fíjate en que <em>chocolate</em> usó dos.</p>' },
      { tipo: 'numero', enunciado: '<p>Un texto usa 100 tokens en un idioma. Su traducción usa 15 veces más tokens, el caso extremo que midieron Petrov y su equipo (2023). ¿Cuántos tokens usa la traducción?</p>', respuesta: 100 * 15,
        pista: '<p>Multiplica los tokens del texto original por 15.</p>',
        solucion: '<p>100 × 15 = <strong>1 500</strong> tokens. Es un caso extremo, no lo que ocurre siempre.</p>' },
      { tipo: 'opciones', enunciado: '<p>Después de cortar el texto en tokens, ¿qué recibe el modelo?</p>', opciones: ['Las letras, una por una, sin cambios', 'Una imagen del texto', 'Un número de su vocabulario por cada token', 'Una traducción al inglés'], correcta: 2,
        pista: '<p>Recuerda el segundo paso de la codificación.</p>',
        solucion: '<p>Cada token se convierte en un número según el vocabulario del modelo.</p>' },
    ],
    fuentes: [F1, F4, F5, F6],
  });

  // ------------------------------------------------------------------
  const BARRAS3 = barras({ etiquetas: ['azul', 'gris', 'grande', 'otras'], valores: [55, 20, 10, 15], max: 60, paso: 10,
    descripcion: 'Gráfica de barras con las probabilidades de ejemplo, en porcentaje, de la siguiente palabra después de El cielo es. Azul 55, gris 20, grande 10 y otras 15. Las cuatro suman 100.' });

  L('Cómo genera texto: predecir la siguiente palabra', {
    objetivo: 'Describir cómo un LLM elige un token a la vez a partir de probabilidades, qué hace la temperatura y por qué algo probable no es necesariamente verdadero.',
    vidaReal: `
      <p>Cuando un chatbot te contesta, parece que piensa la respuesta completa de golpe. En realidad la va construyendo pieza por pieza. Entender esto explica varias cosas que verás al usarlo: por qué la misma pregunta puede recibir respuestas distintas, por qué a veces suena muy seguro y se equivoca, y por qué cambiar unas palabras de tu pregunta puede cambiar la respuesta.</p>`,
    explicacion: `
      <p>Cuando escribes un mensaje en el celular, te sugiere la siguiente palabra. Si pones <em>buenos</em>, quizá te propone <em>días</em>. Un modelo de lenguaje hace algo parecido, pero con muchísimo más texto aprendido y una y otra vez.</p>
      <h3>Una lista de candidatos con su probabilidad</h3>
      <p>Según IBM, los LLM funcionan como máquinas de predicción estadística que predicen una y otra vez la siguiente palabra de una secuencia. Según el curso de Hugging Face, al elegir el siguiente token el modelo parte de probabilidades en bruto para cada palabra de su vocabulario. La <strong>probabilidad</strong> es un número entre 0 y 100 % que dice qué tan posible es algo, como en "Probabilidad: qué tan posible es algo". El modelo calcula un número así para cada token de su vocabulario, no solo para unos pocos. Aquí tienes una gráfica de ejemplo, reducida a cuatro opciones, para la frase <em>El cielo es…</em>; las cifras no son de ningún modelo real.</p>
      ${BARRAS3}
      <p>Las cuatro barras suman 100 %, porque alguna de las opciones tiene que salir. En este ejemplo, <em>azul</em> es la más probable, pero no la única posible.</p>
      <h3>Elegir una y seguir</h3>
      <p>Según el curso de Hugging Face, el modelo genera un token a la vez, en un proceso en que cada token nuevo depende de todos los anteriores. Como simplificación para entenderlo, imagina que el modelo elige una palabra, la agrega al texto y vuelve a preguntarse qué sigue. Así se arma una respuesta larga, token a token. Por eso el comienzo importa: si el modelo empieza una frase de cierta manera, todo lo que sigue se acomoda a ese comienzo, igual que cuando eliges cómo arrancar un cuento. Esta idea es una explicación propia para ayudarte a imaginarlo.</p>
      <h3>La temperatura: cuánto se arriesga</h3>
      <p>No siempre se elige la más probable. Según IBM, la <strong>temperatura</strong> controla qué tan aleatorio es el texto que genera un LLM. Según la documentación de un proveedor de modelos, con temperaturas más altas hay más variedad: varias formas de redactar y, en ficción, variación en las respuestas. Por eso, cuando se elige con algo de azar, la misma pregunta puede darte respuestas distintas. Esto es una consecuencia prudente, no un dato de las fuentes: cuánta variedad veas puede depender de cómo esté configurada la aplicación.</p>
      <p>Piensa en una ruleta con sectores de distinto tamaño. Una temperatura baja hace que casi siempre caiga en el sector más grande. Una más alta reparte más las posibilidades. Es una analogía propia, para ayudarte a imaginarlo.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que lo más probable es lo verdadero. Una frase puede ser muy probable porque suena natural y aun así ser falsa. Lo verás en "Alucinaciones: cuando la IA inventa".</p>`,
    ejemplo: `
      <p>Usa la tabla de ejemplo de <em>El cielo es…</em>: azul 55 %, gris 20 %, grande 10 % y otras palabras, que no conoces. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Primero halla el porcentaje de las otras palabras. Las probabilidades suman 100 %, así que resta lo que ya tienes: 100 − 55 − 20 − 10 = 15 %.</li>
        <li>Ahora supón que, después de <em>azul</em>, la palabra <em>hoy</em> tiene 30 % de probabilidad (otra cifra de ejemplo).</li>
        <li>Para saber qué tan probable es la pareja <em>azul hoy</em>, multiplica: 0.55 × 0.30 = 0.165. Se multiplica porque el 30 % vale solo para los casos en que ya salió <em>azul</em>: de cada 100 veces, <em>azul</em> sale 55, y de esas 55, <em>hoy</em> sale en el 30 %. Es una probabilidad de ejemplo; la idea de una cosa que depende de otra está en "Probabilidad: qué tan posible es algo".</li>
        <li>Pasa el decimal a porcentaje: 0.165 × 100 = 16.5 %.</li>
      </ol>
      <p>Resultado: <span class="resultado">15 % para otras palabras y 16.5 % para la pareja azul hoy</span>.</p>
      <p>Para comprobarlo, suma 55 + 20 + 10 + 15 y debe dar 100.</p>
      <p class="nota"><strong>Error común:</strong> sumar en vez de multiplicar las dos probabilidades de la pareja.</p>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En otra tabla de ejemplo, tres palabras tienen 40 %, 25 % y 20 % de probabilidad. ¿Qué porcentaje queda para las demás palabras?</p>', respuesta: 100 - 40 - 25 - 20,
        pista: '<p>Todas las probabilidades juntas deben sumar 100 %.</p>',
        solucion: '<p>100 − 40 − 25 − 20 = <strong>15</strong> %.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según IBM, ¿qué controla la temperatura de un LLM?</p>', opciones: ['La velocidad del procesador', 'La cantidad de tokens que cabe', 'El idioma de la respuesta', 'Qué tan aleatorio es el texto que genera'], correcta: 3,
        pista: '<p>Piensa en la ruleta: ¿se elige siempre lo más probable?</p>',
        solucion: '<p>La temperatura controla qué tan aleatorio es el texto generado.</p>' },
      { tipo: 'numero', enunciado: '<p>La palabra A tiene 50 % de probabilidad y, después de A, la palabra B tiene 20 %. ¿Qué porcentaje tiene la pareja A y luego B? (cifras de ejemplo)</p>', respuesta: 0.5 * 0.2 * 100,
        pista: '<p>Multiplica las dos probabilidades en forma decimal y luego pásalas a porcentaje.</p>',
        solucion: '<p>0.5 × 0.2 = 0.1, o sea <strong>10</strong> %.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según el curso de Hugging Face, ¿cómo genera texto el modelo?</p>', opciones: ['Un token a la vez, y cada token nuevo depende de los anteriores', 'Escribe la respuesta completa de golpe', 'Copia un párrafo de una base de datos', 'Elige las palabras al azar sin mirar el texto'], correcta: 0,
        pista: '<p>Recuerda la idea de elegir una palabra y seguir.</p>',
        solucion: '<p>Genera un token a la vez, y cada token nuevo depende de todos los anteriores.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un modelo da la mayor probabilidad a una frase. ¿Qué se puede concluir?</p>', opciones: ['Que la frase es verdadera', 'Que la frase está en un libro', 'Que la frase es probable, pero puede ser falsa', 'Que otra persona la revisó'], correcta: 2,
        pista: '<p>Probable y verdadero son dos cosas distintas.</p>',
        solucion: '<p>Probable quiere decir que suena natural según los patrones aprendidos. No garantiza que sea cierta.</p>' },
      { tipo: 'numero', enunciado: '<p>Si se eligiera según la tabla y se hiciera la misma pregunta 200 veces, ¿cuántas veces saldría azul, con 55 % de probabilidad? (cifras de ejemplo)</p>', respuesta: 200 * 0.55,
        pista: '<p>Calcula el 55 % de 200.</p>',
        solucion: '<p>200 × 0.55 = <strong>110</strong> veces, más o menos. Es lo esperado, no una cifra exacta.</p>' },
    ],
    fuentes: [F1, F7, F8, F9],
  });

  // ------------------------------------------------------------------
  const VENTANA = diagrama([0, 19.5], [0, 7], [
    { tipo: 'poligono', puntos: [[3.85, 1.3], [18.9, 1.3], [18.9, 5.1], [3.85, 5.1]], serie: 1 },
    ...[1, 2, 3, 4, 5].flatMap((n, i) => caja(2 + i * 3.7, 3.2, 3.3, 1.4, 'Mensaje ' + n)),
    txt(11.4, 5.9, 'Ventana de contexto: lo que el modelo ve'),
    txt(2, 0.6, 'Queda fuera'),
  ], 'Diagrama con cinco mensajes en fila, del 1 al 5. Un recuadro llamado ventana de contexto cubre los mensajes 2 a 5, que son los más recientes. El mensaje 1 queda fuera del recuadro.');

  L('Contexto y memoria', {
    objetivo: 'Explicar qué es el contexto y la ventana de contexto, por qué un modelo no recuerda conversaciones anteriores por sí solo y calcular si un conjunto de mensajes cabe en una ventana.',
    vidaReal: `
      <p>Le cuentas a un chatbot que preparas un examen de ciencias, abres una conversación nueva y ya no sabe nada de eso. O una conversación muy larga empieza a olvidar lo que dijiste al principio. Entender el contexto te ayuda a escribir mejor tus mensajes, a no repetir datos sin necesidad y a decidir cuándo conviene empezar de nuevo con un resumen.</p>`,
    explicacion: `
      <p>Imagina que lees una novela, pero cada vez que cambias de página olvidas todo lo anterior. No podrías seguir la historia. Los modelos de lenguaje tienen un límite parecido, y conocerlo explica por qué un chatbot a veces <em>no se acuerda</em>.</p>
      <h3>El modelo solo ve lo que se le entrega</h3>
      <p>Se llama <strong>contexto</strong> al texto que el modelo recibe en cada respuesta: tu mensaje y, normalmente, lo que se habló antes en esa conversación. Según la documentación de un proveedor de modelos (2026), su interfaz de mensajes no guarda estado: quien la usa debe enviar siempre el historial completo de la conversación. Como simplificación, piensa que cada vez que respondes algo, la aplicación le entrega al modelo toda la conversación hasta ahí.</p>
      <h3>La ventana de contexto</h3>
      <p>Esa entrega tiene un tope. Según IBM, la <strong>ventana de contexto</strong> de un LLM es la cantidad de texto, en tokens, que el modelo puede considerar a la vez. Los tokens son los trozos de texto de la lección sobre tokens. Según la documentación del mismo proveedor, todo lo de la solicitud cuenta para la ventana, y también cuenta lo que el modelo genera como respuesta. Por eso, la ventana se reparte entre lo que entra y lo que sale.</p>
      ${VENTANA}
      <h3>Cuando no cabe</h3>
      <p>Según IBM, si una conversación o un documento excede la ventana de contexto, hay que truncarlo o resumirlo para que el modelo continúe. Truncar es cortar lo que sobra. Qué se corta depende de la aplicación; en el diagrama, como simplificación, se corta lo más viejo. Otra opción es resumir la parte antigua. Por eso, en una charla larga, lo primero que dijiste puede dejar de pesar en la respuesta.</p>
      <h3>Las ventanas han crecido</h3>
      <p>Según IBM (2024), una familia de modelos pasó de 2 048 tokens de ventana en su primera versión a 4 096 en la segunda y a unos 8 000 en la tercera, lanzada en abril de 2024. Es solo un ejemplo con fecha. Los tamaños cambian rápido, así que, a octubre de 2026, revisa la información vigente del servicio que uses.</p>
      <h3>Y la memoria de las aplicaciones</h3>
      <p>Algunas aplicaciones dicen tener <em>memoria</em>. Como simplificación, ese recuerdo suele ser una función de la aplicación, no del modelo: guarda notas y las vuelve a incluir en el contexto. Qué se guarda y quién lo ve importa, y se estudia en "Privacidad: qué no compartir". Dar buen contexto en tu mensaje se practica en "Dar contexto y ejemplos".</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que el modelo aprende de ti al conversar. Como simplificación, lo que dices viaja en el contexto de esa conversación y no cambia por sí solo los pesos del modelo.</p>`,
    ejemplo: `
      <p>Una ventana de ejemplo tiene 4 000 tokens. Quieres reservar 500 para la respuesta. La conversación tiene cinco mensajes con estos tokens: el 1 tiene 1 200, el 2 tiene 900, el 3 tiene 1 100, el 4 tiene 800 y el 5 tiene 700. ¿Cuáles caben? Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Primero calcula el espacio para la conversación: 4 000 − 500 = 3 500 tokens, porque la respuesta también cuenta.</li>
        <li>Como simplificación, conserva primero los mensajes más nuevos: 700 + 800 = 1 500.</li>
        <li>Agrega el 3: 1 500 + 1 100 = 2 600. Agrega el 2: 2 600 + 900 = 3 500, y todavía cabe.</li>
        <li>Agrega el 1: 3 500 + 1 200 = 4 700, que pasa de 3 500. Ese mensaje queda fuera.</li>
      </ol>
      <p>Resultado: <span class="resultado">caben los mensajes 2 a 5 y el 1 queda fuera</span>.</p>
      <p>Para comprobarlo, suma los cuatro mensajes más 500 de respuesta: 3 500 + 500 = 4 000, justo la ventana.</p>
      <p class="nota"><strong>Error común:</strong> olvidar restar el espacio de la respuesta.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Abres una conversación nueva y el chatbot no recuerda la anterior. ¿Qué explica mejor esto?</p>', opciones: ['El modelo solo ve el texto que recibe en ese momento, y esa conversación no se le entrega', 'El chatbot se enfermó', 'El modelo borra su vocabulario cada día', 'Tienes que usar mayúsculas'], correcta: 0,
        pista: '<p>Piensa en qué texto se le entrega al modelo en cada respuesta.</p>',
        solucion: '<p>El modelo responde con el contexto que recibe. Si la conversación anterior no se incluye, no la ve.</p>' },
      { tipo: 'numero', enunciado: '<p>Una ventana de ejemplo tiene 4 000 tokens. La conversación ya usa 2 600 y quieres una respuesta de 500. ¿Cuántos tokens libres quedan?</p>', respuesta: 4000 - 2600 - 500,
        pista: '<p>Resta lo que ya usa la conversación y lo que reservas para la respuesta.</p>',
        solucion: '<p>4 000 − 2 600 − 500 = <strong>900</strong> tokens libres.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según el proveedor de modelos, ¿qué cuenta para la ventana de contexto?</p>', opciones: ['Solo tu pregunta', 'Solo la respuesta', 'La solicitud completa y también la respuesta que genera el modelo', 'Ninguna de las dos'], correcta: 2,
        pista: '<p>Piensa en lo que entra y en lo que sale.</p>',
        solucion: '<p>Todo lo de la solicitud cuenta, y también cuenta lo que el modelo genera como respuesta.</p>' },
      { tipo: 'numero', enunciado: '<p>Cuatro mensajes tienen 900, 1 100, 800 y 700 tokens. ¿Cuántos tokens suman?</p>', respuesta: 900 + 1100 + 800 + 700,
        pista: '<p>Suma de dos en dos para no equivocarte.</p>',
        solucion: '<p>900 + 1 100 = 2 000 y 800 + 700 = 1 500. Juntos son <strong>3 500</strong> tokens.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según IBM, ¿qué pasa si una conversación excede la ventana de contexto?</p>', opciones: ['El modelo amplía su ventana solo', 'Hay que truncarla o resumirla para que el modelo continúe', 'La conversación se borra por completo', 'El modelo se apaga'], correcta: 1,
        pista: '<p>Truncar es cortar lo que sobra.</p>',
        solucion: '<p>La conversación o el documento debe truncarse o resumirse para que el modelo pueda continuar.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una aplicación dice tener memoria. Según la lección, ¿qué suele estar pasando?</p>', opciones: ['El modelo cambia sus pesos con cada charla', 'El modelo lee tu mente', 'La ventana de contexto es infinita', 'La aplicación guarda notas y las vuelve a incluir en el contexto'], correcta: 3,
        pista: '<p>Es una función de la aplicación, no del modelo, como simplificación.</p>',
        solucion: '<p>Como simplificación, la aplicación guarda notas y las incluye de nuevo en el contexto; el modelo en sí no recuerda.</p>' },
    ],
    fuentes: [F10, F11, F12],
  });

  // ------------------------------------------------------------------
  L('Alucinaciones: cuando la IA inventa', {
    objetivo: 'Explicar qué es una alucinación, por qué ocurre y cómo reducir el riesgo comprobando las respuestas, y calcular qué porcentaje de afirmaciones resultó inventado.',
    vidaReal: `
      <p>Pides tres libros para tu trabajo y uno no existe, aunque el título y el autor suenan muy reales. Algo así le puede pasar a cualquiera que use un chatbot para estudiar, trabajar o informarse. Reconocer las alucinaciones te evita citar datos falsos, repetir fechas equivocadas o tomar decisiones con información inventada. Y te enseña un hábito útil para toda la vida: comprobar antes de creer.</p>`,
    explicacion: `
      <p>Le pides a un chatbot tres libros sobre el tema de tu tarea. Dos son reales. El tercero tiene un título atractivo y un autor con nombre creíble, pero no existe. ¿Mintió a propósito? No: pasó algo más sencillo, y conviene entenderlo.</p>
      <h3>¿Qué es una alucinación?</h3>
      <p>Según IBM, las <strong>alucinaciones</strong> de la IA son salidas que suenan plausibles pero son falsas, irrelevantes o completamente inventadas. Plausible quiere decir que suena posible. Puede ser un dato, una cita, una fecha o una fuente que parece de verdad y no lo es.</p>
      <h3>¿Por qué ocurre?</h3>
      <p>Vuelve a la lección "Cómo genera texto: predecir la siguiente palabra". El modelo elige tokens probables. Según IBM, las alucinaciones ocurren porque la IA generativa predice salidas plausibles a partir de patrones que observa en sus datos de entrenamiento. Como ejemplo y simplificación, un título de libro con un autor creíble encaja con el patrón de miles de títulos reales, aunque ese libro en particular no exista.</p>
      <h3>Lo dice con seguridad</h3>
      <p>Aquí está lo difícil. Según IBM, la alucinación es un tipo de error en que el sistema genera información falsa con confianza. Por eso el tono puede sonar igual en lo cierto y en lo inventado, y no sirve para distinguirlo. Mira una tabla con ejemplos genéricos, ideas de esta lección y no de IBM, de lo que se puede comprobar:</p>
      ${tabla(['Lo que dijo', '¿Suena creíble?', '¿Es cierto?', 'Cómo lo compruebo'], [
        ['Un libro con título y autor', 'Sí', 'Puede no existir', 'Busco el título en el catálogo de una biblioteca'],
        ['Una fecha histórica', 'Sí', 'Puede estar mal', 'La busco en un libro de texto o una enciclopedia'],
        ['Una cita textual', 'Sí', 'Puede no haberse dicho', 'Busco la fuente original'],
      ])}
      <h3>Un caso real</h3>
      <p>Según Wikipedia, el caso Mata contra Avianca, de un tribunal federal de Nueva York, Estados Unidos, fue decidido el 22 de junio de 2023: abogados fueron sancionados por usar citas de casos legales falsos generadas por un chatbot. Muestra que confiar sin comprobar tiene consecuencias.</p>
      <h3>Qué hacer</h3>
      <p>IBM recomienda tratar la IA generativa como asistente de borrador e investigación, no como autoridad, con una mentalidad de verificación. <strong>Verificar</strong> es comprobar un dato en una fuente fiable, como un libro, un sitio oficial o una persona experta. Con temas importantes, como salud, dinero o leyes, consulta además a un profesional. El método completo está en "Verificar lo que te responde".</p>
      <p class="nota"><strong>Trampa común:</strong> creer que, si la respuesta está bien escrita y es segura, entonces es cierta.</p>`,
    ejemplo: `
      <p>Un chatbot dio una respuesta con 5 afirmaciones. Las comparaste con una tabla de fuentes y encontraste que dos no aparecen en ninguna: están inventadas. Las cifras son de ejemplo.</p>
      ${tabla(['Afirmación', 'Aparece en una fuente fiable'], [['1', 'Sí'], ['2', 'No'], ['3', 'Sí'], ['4', 'No'], ['5', 'Sí']])}
      <ol class="pasos-ej">
        <li>Cuenta cuántas afirmaciones no aparecen: son 2.</li>
        <li>Divide entre el total: 2 ÷ 5 = 0.4.</li>
        <li>Pasa a porcentaje: 0.4 × 100 = 40 %.</li>
      </ol>
      <p>Resultado: <span class="resultado">40 % de las afirmaciones estaban inventadas</span>.</p>
      <p>Para comprobarlo, 3 ÷ 5 = 60 % sí aparecían, y 60 % + 40 % da 100 %. Con esto aplicas "Porcentajes" a una situación real. Aunque la mayoría estaba bien, no podrías saber cuáles sin comprobar, y por eso conviene verificar toda afirmación importante.</p>
      <p class="nota"><strong>Error común:</strong> dividir entre las afirmaciones correctas y no entre el total de afirmaciones.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según IBM, ¿qué es una alucinación de la IA?</p>', opciones: ['Una salida que suena plausible pero es falsa, irrelevante o inventada', 'Un sueño del programa mientras no se usa', 'Una respuesta siempre muy larga', 'Un error de internet'], correcta: 0,
        pista: '<p>Fíjate en las palabras plausible e inventada.</p>',
        solucion: '<p>Son salidas que suenan plausibles pero son falsas, irrelevantes o completamente inventadas.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según IBM, ¿por qué ocurren las alucinaciones?</p>', opciones: ['Porque la IA quiere engañar', 'Porque siempre falla internet', 'Porque predice salidas plausibles a partir de patrones de sus datos de entrenamiento', 'Porque tus preguntas son difíciles'], correcta: 2,
        pista: '<p>Recuerda la lección de predecir la siguiente palabra.</p>',
        solucion: '<p>La IA generativa predice salidas plausibles a partir de patrones, y lo plausible no siempre es cierto.</p>' },
      { tipo: 'numero', enunciado: '<p>Una respuesta tiene 8 afirmaciones y 2 están inventadas. ¿Qué porcentaje está inventado? (cifras de ejemplo)</p>', respuesta: 2 / 8 * 100,
        pista: '<p>Divide las inventadas entre el total y pasa el decimal a porcentaje.</p>',
        solucion: '<p>2 ÷ 8 = 0.25, o sea <strong>25</strong> %.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué ocurrió en el caso Mata contra Avianca (Nueva York, Estados Unidos, 2023)?</p>', opciones: ['Un chatbot ganó un juicio', 'Un juez usó una calculadora', 'Se prohibieron los chatbots en todo el mundo', 'Abogados presentaron casos legales falsos generados por un chatbot y fueron sancionados'], correcta: 3,
        pista: '<p>Recuerda qué documentos citaron los abogados.</p>',
        solucion: '<p>Los abogados citaron casos que no existían, generados por un chatbot, y fueron sancionados.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un chatbot te da un dato de salud muy seguro. ¿Qué haces?</p>', opciones: ['Lo compruebo en una fuente fiable y consulto a un profesional', 'Lo creo, porque suena seguro', 'Se lo mando a mis amigos', 'Lo ignoro y no pregunto a nadie'], correcta: 0,
        pista: '<p>Piensa en tratar a la IA como asistente, no como autoridad.</p>',
        solucion: '<p>Con temas de salud conviene comprobar en fuentes fiables y consultar a un profesional. Una respuesta segura no es necesariamente cierta.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una respuesta está muy bien escrita y suena muy segura. ¿Qué indica sobre si es cierta?</p>', opciones: ['Que seguramente es cierta', 'Nada seguro: el tono puede ser igual para lo cierto y lo inventado', 'Que viene de un libro', 'Que está verificada'], correcta: 1,
        pista: '<p>Según IBM, el sistema genera información falsa con confianza.</p>',
        solucion: '<p>El tono no ayuda a distinguir: una alucinación puede sonar igual de segura que un dato correcto.</p>' },
    ],
    fuentes: [F20, F21],
  });

  // ------------------------------------------------------------------
  L('Qué puede y qué no puede hacer', {
    objetivo: 'Distinguir para qué tareas conviene usar un LLM y dónde hay que tener cuidado, y explicar qué es la fecha de corte y qué cambia cuando el modelo usa herramientas.',
    vidaReal: `
      <p>Puedes usar un chatbot para ordenar ideas, preparar un resumen o practicar un idioma. También puedes usarlo mal, por ejemplo preguntándole algo que pasó ayer o pidiéndole que decida sobre tu salud. Saber qué hace bien y dónde falla te ahorra tiempo y errores. Con esa idea clara aprovechas la herramienta donde ayuda y le pones límites donde no corresponde.</p>`,
    explicacion: `
      <p>Un martillo sirve para clavar, pero no para cortar madera. Con los modelos de lenguaje pasa algo parecido: son muy útiles para algunas tareas y flojos para otras. Esta lección te da un mapa sencillo.</p>
      <h3>Qué suele hacer bien</h3>
      <p>Según Wikipedia, los LLM pueden generar, resumir, traducir y analizar texto. Según IBM, pueden resumir artículos largos, informes y documentos en textos a la medida de la longitud y el estilo que se pida. Además puedes pedirles que expliquen un tema con otras palabras o que propongan ideas, aunque eso es una aplicación de lo anterior y no un dato de las fuentes. Fíjate en que varias de estas tareas parten de un texto que tú le das. Como consejo de prudencia, conviene pedirle que trabaje con un texto tuyo y no que te dé de memoria datos exactos, porque predice lo plausible y puede inventar. Eso conecta con la lección anterior sobre alucinaciones.</p>
      <h3>La fecha de corte</h3>
      <p>Un modelo se entrena con textos hasta un día determinado. Según Wikipedia, la <strong>fecha de corte</strong> (<span lang="en">knowledge cutoff</span>) es el momento a partir del cual un modelo de lenguaje ya no fue entrenado con datos nuevos. Por eso, sin ayuda extra, no conoce lo que ocurrió después. Es como una enciclopedia impresa: no incluye los hechos posteriores a su impresión.</p>
      <h3>Las herramientas</h3>
      <p>A veces el chatbot no responde solo con lo que aprendió. Según IBM, los agentes de IA (como simplificación, sistemas que combinan un modelo con otras piezas) usan herramientas externas como conjuntos de datos, búsquedas web, APIs e incluso otros agentes. Una <strong>herramienta</strong> es un programa que el modelo puede usar, como un buscador. Con ella puede traer información más reciente, aunque lo que encuentre también conviene comprobarlo.</p>
      ${tabla(['Suele hacer bien', 'Ten cuidado con'], [
        ['Resumir un texto que tú le das', 'Hechos posteriores a su fecha de corte'],
        ['Traducir un mensaje corto', 'Cifras, fechas y citas exactas'],
        ['Explicar algo con otras palabras', 'Respuestas que suenan muy seguras: pueden ser alucinaciones'],
        ['Proponer ideas para empezar', 'Decisiones de salud, leyes o dinero'],
      ])}
      <h3>Qué no puede hacer</h3>
      <p>Según IBM, los LLM pueden reflejar y amplificar sesgos presentes en sus datos de entrenamiento. Este tema se estudia en "Sesgos en la IA". Como simplificación y consejo de prudencia, también conviene recordar que no es una persona y que no reemplaza a un médico, un abogado o un docente. Para esas decisiones, consulta a quien tiene esa formación.</p>
      <p class="nota"><strong>Trampa común:</strong> usar un chatbot para todo, o descartarlo por completo después de un error. Lo más útil es elegir la tarea adecuada y revisar el resultado.</p>`,
    ejemplo: `
      <p>Clasifica seis tareas en tres grupos: buena idea, con cuidado o mala idea. Las razones son de sentido común, a partir de lo que viste en la lección.</p>
      ${tabla(['Tarea', 'Grupo', 'Razón'], [
        ['Resumir un texto que pegaste', 'Buena idea', 'Trabaja con texto que tú le diste'],
        ['Ideas para el nombre de un club', 'Buena idea', 'Aquí no hay una respuesta única'],
        ['Contar las noticias de ayer', 'Con cuidado', 'Puede pasar su fecha de corte'],
        ['Dar una cifra exacta de memoria', 'Con cuidado', 'Puede ser una alucinación; comprueba en una fuente fiable'],
        ['Elegir tu medicina', 'Mala idea', 'Eso lo decide un profesional de salud'],
        ['Citar una ley exacta', 'Con cuidado', 'Comprueba el texto en una fuente oficial'],
      ])}
      <p>Resultado: <span class="resultado">2 buenas ideas, 3 con cuidado y 1 mala idea</span>.</p>
      <p>Para decidir, pregúntate dos cosas: ¿el modelo puede equivocarse sin que me dé cuenta? y ¿qué pasa si me equivoco yo? Si la respuesta a la segunda es grave, no la delegues.</p>
      <p class="nota"><strong>Error común:</strong> clasificar por qué tan cómodo es y no por el riesgo que tiene.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué es la fecha de corte de un modelo?</p>', opciones: ['El momento a partir del cual ya no se entrenó con datos nuevos', 'El día en que se apaga el servicio', 'El día en que lo usaste por primera vez', 'La fecha de tu último mensaje'], correcta: 0,
        pista: '<p>Piensa en la enciclopedia impresa.</p>',
        solucion: '<p>Es el punto en el tiempo a partir del cual el modelo no recibió datos nuevos de entrenamiento.</p>' },
      { tipo: 'opciones', enunciado: '<p>Preguntas por una noticia de ayer a un chatbot sin herramientas. ¿Qué es lo más probable?</p>', opciones: ['La conoce al instante', 'La inventa siempre', 'Siempre te dice la hora exacta', 'Puede no conocerla, porque su entrenamiento terminó antes'], correcta: 3,
        pista: '<p>Recuerda qué pasa con lo posterior a la fecha de corte.</p>',
        solucion: '<p>Si el hecho es posterior a su fecha de corte, puede no conocerlo, salvo que use herramientas como una búsqueda web.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas tareas es una mala idea para delegar a un chatbot?</p>', opciones: ['Resumir un texto que le pegas', 'Proponer ideas para un cartel', 'Decidir qué medicina tomar', 'Traducir un mensaje corto'], correcta: 2,
        pista: '<p>Piensa en qué decisiones requieren una persona profesional.</p>',
        solucion: '<p>Las decisiones de salud corresponden a un profesional. El chatbot puede explicar un tema, pero no reemplaza a quien te atiende.</p>' },
      { tipo: 'numero', enunciado: '<p>Un modelo de ejemplo tiene fecha de corte en marzo de 2025. Hoy es octubre de 2026. ¿Cuántos meses de noticias no conoce? (cifras de ejemplo)</p>', respuesta: (2026 - 2025) * 12 + (10 - 3),
        pista: '<p>Cuenta los meses entre marzo de 2025 y marzo de 2026, y suma los que van hasta octubre.</p>',
        solucion: '<p>De marzo de 2025 a marzo de 2026 son 12 meses, y de marzo a octubre otros 7. En total <strong>19</strong> meses.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué le permite a un chatbot una herramienta como la búsqueda web?</p>', opciones: ['Traer información más reciente que la de su entrenamiento', 'Cambiar su fecha de corte de entrenamiento', 'Nunca equivocarse', 'Dejar de usar tokens'], correcta: 0,
        pista: '<p>Una herramienta es un programa que el modelo puede usar.</p>',
        solucion: '<p>Con una búsqueda web puede traer información reciente. Aun así, conviene comprobar lo que encuentra.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según IBM, ¿qué pueden reflejar los LLM de sus datos de entrenamiento?</p>', opciones: ['Solo hechos verdaderos', 'Sesgos presentes en esos datos', 'Tu opinión personal', 'Nada, porque no usan datos'], correcta: 1,
        pista: '<p>Recuerda la nota sobre lo que aprenden de los textos.</p>',
        solucion: '<p>Pueden reflejar y amplificar sesgos presentes en sus datos. Lo verás en "Sesgos en la IA".</p>' },
    ],
    fuentes: [F1, F2, F23, F24],
  });

  // ------------------------------------------------------------------
  const COMPARA = diagrama([0, 16], [0, 12], [
    txt(4, 11.4, 'Un LLM escribe'),
    ...caja(2.5, 9.6, 4, 1.5, 'Pregunta'), ...flecha([4.6, 9.6], [5.9, 9.6]),
    ...caja(8, 9.6, 3.4, 1.5, 'LLM'), ...flecha([9.8, 9.6], [11.1, 9.6]),
    ...caja(13.4, 9.6, 4, 1.5, 'Párrafo'),
    txt(4.5, 7.2, 'Un modelo de decisión elige'),
    ...caja(3.8, 5.6, 7, 1.5, 'Pregunta y opciones'), ...flecha([7.4, 5.6], [8.6, 5.6]),
    ...caja(12.2, 5.6, 7, 1.5, 'Modelo de decisión'),
    ...flecha([12.2, 4.8], [12.2, 3.1]),
    ...caja(12.2, 2.2, 7, 1.5, 'Opción B, confianza 0.92'), ...flecha([8.6, 2.2], [7.4, 2.2]),
    ...caja(3.8, 2.2, 7, 1.5, 'Otro programa'),
  ], 'Diagrama de tres filas. Arriba, un LLM escribe: la pregunta entra a un LLM y sale un párrafo. En medio, un modelo de decisión elige: la pregunta y las opciones entran a un modelo de decisión. Abajo, el modelo devuelve la opción B con confianza 0.92 y esa salida pasa a otro programa.');

  L('Modelos de decisión: IA que elige en lugar de escribir', {
    objetivo: 'Explicar qué es un modelo de decisión, qué son la confianza y la salida estructurada, y usar una regla de confianza para decidir cuándo revisar a mano.',
    vidaReal: `
      <p>Muchas veces no necesitas un párrafo, sino una decisión rápida: este mensaje es urgente o no, esta foto cumple los requisitos o no, esta solicitud va a una persona o a otra. Saber que existe una clase de modelos hecha para elegir, y que dice qué tan seguro está, te ayuda a entender cómo se automatizan tareas en aplicaciones que usas, y a hacerte buenas preguntas sobre sus errores.</p>`,
    explicacion: `
      <p>A veces no quieres un texto largo, sino una respuesta corta: sí o no, o elegir una opción entre tres, y saber qué tan seguro está el sistema. Para eso sirve otra clase de modelos.</p>
      <h3>Elegir en lugar de escribir</h3>
      <p>Un <strong>modelo de decisión</strong> no escribe texto libre. Recibe una pregunta con opciones dadas y elige una. Se parece a la clasificación que viste en "Aprendizaje automático": poner un ejemplo en una categoría. Como ejemplo, según la documentación de TypeSafe, su modelo Jev responde preguntas de tipo elegir una opción de una lista, puntuar según una regla o verdadero o falso. Como cada respuesta es una opción, otro programa la puede leer sin tener que interpretar un párrafo.</p>
      ${COMPARA}
      <h3>Confianza y salida estructurada</h3>
      <p>Además de elegir, este tipo de modelo dice qué tan seguro está. Esa medida se llama <strong>confianza</strong>: un número entre 0 y 1, donde 0.92 equivale a 92 %. Se conecta con las probabilidades de la lección sobre predecir la siguiente palabra. No es una garantía de que acierte: un modelo puede estar muy seguro y equivocarse. Según TypeSafe, Jev devuelve valores tipados y distribuciones de probabilidad que el código puede usar. A una respuesta con forma fija, hecha para que la lea otro programa, se le llama <strong>salida estructurada</strong>.</p>
      <h3>Un ejemplo con fecha: Jev</h3>
      <p>TypeSafe llama modelos de Sistema Uno a esta nueva clase de modelos, hechos para decisiones dentro de software. Su ejemplo es Jev. Según Wikipedia, Jev es un modelo propietario de TypeSafe AI, una empresa de San Francisco, Estados Unidos, fundada en 2024, y se lanzó en acceso anticipado limitado el 15 de septiembre de 2026. Como simplificación, propietario significa que pertenece a una empresa que decide cómo se usa. Ese artículo tiene una sola referencia, así que, a octubre de 2026, revisa la información vigente.</p>
      <p>Sobre su velocidad, TypeSafe dice, con sus propias pruebas, que Jev responde en 70 a 500 milisegundos, entre 40 y 200 veces más rápido que los modelos de frontera (los más avanzados), en consultas del tipo que la empresa llama Sistema Uno. Un milisegundo es una milésima de segundo. Es una afirmación de la empresa, no un hecho comprobado por otros.</p>
      <h3>Una alternativa abierta: Laya</h3>
      <p>Según su ficha en Hugging Face, Laya es un modelo de decisión de pesos abiertos con licencia Apache 2.0, y la ficha lo compara con Jev, de interfaz cerrada (<span lang="en">closed API</span>). Como simplificación, pesos abiertos quiere decir que se pueden descargar; lo verás en "Modelos abiertos: qué significa que se puedan descargar". No se hace juicio sobre cuál es mejor.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que más confianza significa más verdad. La confianza es lo seguro que está el modelo, no una garantía.</p>`,
    ejemplo: `
      <p>Un modelo de decisión clasifica cinco mensajes y da su confianza: A 0.95; B 0.62; C 0.88; D 0.55; E 0.91. La regla dice que, si la confianza es menor que 0.7, lo revisa una persona. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Compara cada confianza con 0.7. A, C y E son mayores que 0.7, así que siguen solos.</li>
        <li>B (0.62) y D (0.55) son menores que 0.7, así que van a revisión.</li>
        <li>Cuenta: 2 mensajes de 5 van a revisión.</li>
        <li>Calcula el porcentaje: 2 ÷ 5 = 0.4, que es 40 %.</li>
      </ol>
      <p>Resultado: <span class="resultado">2 mensajes, el 40 %, van a revisión</span>.</p>
      <p>Para comprobarlo, 3 ÷ 5 = 60 % siguen solos, y 40 % + 60 % da 100 %. Subir el umbral de 0.7 a 0.9 mandaría más mensajes a revisión.</p>
      <p class="nota"><strong>Error común:</strong> leer 0.62 como 62 mensajes en vez de una confianza de 62 %.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué hace un modelo de decisión en lugar de escribir texto libre?</p>', opciones: ['Dibuja imágenes', 'Traduce libros enteros', 'Elige entre opciones dadas y dice qué tan seguro está', 'Guarda tus contraseñas'], correcta: 2,
        pista: '<p>Piensa en el diagrama de la fila de abajo.</p>',
        solucion: '<p>Recibe una pregunta con opciones, elige una y devuelve una medida de confianza.</p>' },
      { tipo: 'numero', enunciado: '<p>Un modelo de decisión devuelve una confianza de 0.92. ¿Qué porcentaje es?</p>', respuesta: 0.92 * 100,
        pista: '<p>Multiplica el decimal por 100.</p>',
        solucion: '<p>0.92 × 100 = <strong>92</strong> %.</p>' },
      { tipo: 'numero', enunciado: '<p>De 20 mensajes, 3 tienen confianza menor que 0.7 y van a revisión. ¿Qué porcentaje va a revisión? (cifras de ejemplo)</p>', respuesta: 3 / 20 * 100,
        pista: '<p>Divide los que se revisan entre el total.</p>',
        solucion: '<p>3 ÷ 20 = 0.15, o sea <strong>15</strong> %.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Quién suele usar la salida de un modelo de decisión?</p>', opciones: ['Solo una persona que lee un párrafo', 'Nadie, porque no sirve', 'Un cartero', 'Otro programa, que puede decidir según la opción y la confianza'], correcta: 3,
        pista: '<p>Recuerda qué es una salida estructurada.</p>',
        solucion: '<p>Es una respuesta con forma fija que otro programa puede leer y usar, por ejemplo para enviar un mensaje a revisión.</p>' },
      { tipo: 'opciones', enunciado: '<p>TypeSafe dice, con sus propias pruebas, que Jev responde en 70 a 500 milisegundos. ¿Cómo conviene tomar esa cifra?</p>', opciones: ['Como un hecho comprobado por todos', 'Como una afirmación de la empresa, que conviene contrastar y revisar', 'Como una cifra falsa, porque viene de una empresa', 'Como una medida oficial de un gobierno'], correcta: 1,
        pista: '<p>Fíjate en quién da la cifra y cómo la midió.</p>',
        solucion: '<p>Es una afirmación de la empresa, con sus propias pruebas. Conviene contrastarla y revisar la información vigente.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según su ficha en Hugging Face, ¿qué características tiene Laya?</p>', opciones: ['Es un modelo de decisión de pesos abiertos con licencia Apache 2.0', 'Es un chatbot de pago', 'Es un buscador de imágenes', 'Es un modelo de lenguaje que no decide nada'], correcta: 0,
        pista: '<p>Recuerda la alternativa abierta de la lección.</p>',
        solucion: '<p>Su ficha lo describe como un modelo de decisión de pesos abiertos con licencia Apache 2.0.</p>' },
    ],
    fuentes: [F25, F26, F27, F28, F29],
  });
})();
