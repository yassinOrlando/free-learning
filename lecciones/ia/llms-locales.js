// Inteligencia artificial · Unidad 5: LLMs locales: IA en tu propio equipo.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Las marcas Ollama y LM Studio solo se nombran en sus lecciones (7 y 8); en las demás, solo en `fuentes` y en el texto "una herramienta para correr modelos locales".
// Las cifras de los ejemplos son de ejemplo. Datos con fecha: octubre de 2026.
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
  // Numeración = la de la ficha (.claude/trabajo/ia/llms-locales/ficha.md). F25 y F27 repiten la URL de F12 y F9.
  const F1 = { nombre: 'LM Studio, documentación: Welcome to LM Studio Docs (en inglés)', url: 'https://lmstudio.ai/docs/app' };
  const F2 = { nombre: 'LM Studio, documentación: Offline Operation (en inglés)', url: 'https://lmstudio.ai/docs/app/offline' };
  const F3 = { nombre: 'IBM, What Is Cloud Computing? (en inglés)', url: 'https://www.ibm.com/think/topics/cloud-computing' };
  const F4 = { nombre: 'LM Studio, documentación: System Requirements (en inglés)', url: 'https://lmstudio.ai/docs/app/system-requirements' };
  const F5 = { nombre: 'Open Source Initiative, The Open Source AI Definition 1.0 (en inglés)', url: 'https://opensource.org/ai/open-source-ai-definition' };
  const F6 = { nombre: 'Open Source Initiative, Open Weights: not quite what you\'ve been told (en inglés)', url: 'https://opensource.org/ai/open-weights' };
  const F7 = { nombre: 'Hugging Face, Model Cards (en inglés)', url: 'https://huggingface.co/docs/hub/model-cards' };
  const F8 = { nombre: 'Hugging Face, OpenRAIL: Towards open and responsible AI licensing frameworks (en inglés)', url: 'https://huggingface.co/blog/open_rail' };
  const F9 = { nombre: 'Hugging Face, convaiinnovations/laya (en inglés)', url: 'https://huggingface.co/convaiinnovations/laya' };
  const F10 = { nombre: 'IBM, What is a GPU? (en inglés)', url: 'https://www.ibm.com/think/topics/gpu' };
  const F11 = { nombre: 'Apple, Apple unleashes M1 (en inglés)', url: 'https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/' };
  const F12 = { nombre: 'Ollama, documentación: Quickstart (en inglés)', url: 'https://docs.ollama.com/quickstart' };
  const F13 = { nombre: 'Hugging Face, Transformers: Optimizing LLMs for Speed and Memory (en inglés)', url: 'https://huggingface.co/docs/transformers/llm_tutorial_optimization' };
  const F14 = WIKI('Byte', 'Byte');
  const F20 = { nombre: 'Hugging Face, Optimum: Quantization (en inglés)', url: 'https://huggingface.co/docs/optimum/concept_guides/quantization' };
  const F21 = { nombre: 'LM Studio, documentación: Download an LLM (en inglés)', url: 'https://lmstudio.ai/docs/app/basics/download-model' };
  const F22 = { nombre: 'Hugging Face, Hub: GGUF (en inglés)', url: 'https://huggingface.co/docs/hub/gguf' };
  const F23 = WIKI('Nibble', 'Nibble');
  const F24 = { nombre: 'IBM, What Is Instruction Tuning? (en inglés)', url: 'https://www.ibm.com/think/topics/instruction-tuning' };
  const F25 = F12;
  const F26 = { nombre: 'Ollama, biblioteca de modelos: llama3.1, etiquetas (en inglés)', url: 'https://ollama.com/library/llama3.1/tags' };
  const F27 = F9;
  const F28 = { nombre: 'Ollama, documentación: Linux (en inglés)', url: 'https://docs.ollama.com/linux' };
  const F29 = { nombre: 'Ollama, documentación: CLI Reference (en inglés)', url: 'https://docs.ollama.com/cli' };
  const F30 = { nombre: 'Ollama, documentación: Windows (en inglés)', url: 'https://docs.ollama.com/windows' };
  const F31 = { nombre: 'GitHub, ollama/ollama: LICENSE (en inglés)', url: 'https://raw.githubusercontent.com/ollama/ollama/main/LICENSE' };
  const F32 = F4;
  const F33 = { nombre: 'LM Studio, documentación: Get started with LM Studio (en inglés)', url: 'https://lmstudio.ai/docs/app/basics' };
  const F34 = { nombre: 'LM Studio, documentación: lms load (en inglés)', url: 'https://lmstudio.ai/docs/cli/local-models/load' };
  const F35 = F2;
  const F36 = { nombre: 'LM Studio, App Terms of Service (en inglés)', url: 'https://lmstudio.ai/terms' };
  const F40 = { nombre: 'Google AI Edge, repositorio google-ai-edge/gallery en GitHub (en inglés)', url: 'https://github.com/google-ai-edge/gallery' };
  const F41 = { nombre: 'Google AI for Developers, Descripción general del modelo Gemma 3n', url: 'https://ai.google.dev/gemma/docs/gemma-3n' };
  const F42 = { nombre: 'Hugging Face, documentación del Hub: Pickle Scanning (en inglés)', url: 'https://huggingface.co/docs/hub/security-pickle' };
  const F43 = { nombre: 'Hugging Face, documentación de Safetensors (en inglés)', url: 'https://huggingface.co/docs/safetensors/index' };
  const F44 = { nombre: 'Hugging Face, documentación del Hub: Malware Scanning (en inglés)', url: 'https://huggingface.co/docs/hub/security-malware' };
  const F45 = { nombre: 'Hugging Face, documentación del Hub: Licenses (en inglés)', url: 'https://huggingface.co/docs/hub/repositories-licenses' };
  const F46 = WIKI('Suma_de_verificaci%C3%B3n', 'Suma de verificación');
  const F47 = F13;
  const F48 = { nombre: 'Hugging Face, documentación de Text Generation Inference: Streaming (en inglés)', url: 'https://huggingface.co/docs/text-generation-inference/conceptual/streaming' };
  const F49 = { nombre: 'IBM Think, CPU vs. GPU for Machine Learning (en inglés)', url: 'https://www.ibm.com/think/topics/cpu-vs-gpu-machine-learning' };
  const F50 = { nombre: 'Kaplan et al. (OpenAI y Universidad Johns Hopkins, 2020), Scaling Laws for Neural Language Models, arXiv (en inglés)', url: 'https://arxiv.org/abs/2001.08361' };
  const F51 = { nombre: 'Hugging Face, documentación de Leaderboards and Evaluations (en inglés)', url: 'https://huggingface.co/docs/leaderboards/index' };
  const F52 = { nombre: 'Ollama, documentación: Usage (en inglés)', url: 'https://docs.ollama.com/api/usage' };
  const F53 = { nombre: 'IBM Think, What is RAG (Retrieval Augmented Generation)? (en inglés)', url: 'https://www.ibm.com/think/topics/retrieval-augmented-generation' };
  const F54 = { nombre: 'IBM Think, What is Vector Embedding? (en inglés)', url: 'https://www.ibm.com/think/topics/vector-embedding' };
  const F55 = F2;

  // ------------------------------------------------------------------
  const NUBE_LOCAL = diagrama([0, 22], [0, 10], [
    txt(4, 9.2, 'En la nube'),
    ...caja(2.6, 6.8, 4.4, 1.6, 'Tu pregunta'),
    ...flecha([4.8, 6.8], [6, 6.8]),
    ...caja(8.2, 6.8, 4.4, 1.6, 'Internet'),
    ...flecha([10.4, 6.8], [11.6, 6.8]),
    ...caja(13.8, 6.8, 4.4, 1.6, 'Servidor'),
    ...flecha([16, 6.8], [17.2, 6.8]),
    ...caja(19.4, 6.8, 4.4, 1.6, 'Respuesta'),
    txt(4.4, 4.2, 'Modelo local'),
    ...caja(2.6, 1.8, 4.4, 1.6, 'Tu pregunta'),
    ...flecha([4.8, 1.8], [6, 1.8]),
    ...caja(8.2, 1.8, 4.4, 1.6, 'Tu equipo'),
    ...flecha([10.4, 1.8], [11.6, 1.8]),
    ...caja(13.8, 1.8, 4.4, 1.6, 'Respuesta'),
  ], 'Diagrama en dos filas. Arriba, en la nube: tu pregunta viaja por internet a un servidor y la respuesta regresa. Abajo, con un modelo local: tu pregunta entra a tu equipo y de ahí sale la respuesta, sin pasar por internet.');

  L('Qué es un LLM local y por qué usarlo', {
    objetivo: 'Explicar qué es un modelo de lenguaje local, en qué se diferencia de usar uno en la nube y decidir en qué situaciones conviene cada opción.',
    vidaReal: `
      <p>Imagina que quieres resumir tus apuntes durante un viaje largo, sin señal, o que tienes un texto con datos de tu familia y prefieres no enviarlo a ningún servidor. También puede pasar lo contrario: que tu equipo sea modesto y necesites una respuesta que solo un servicio grande puede dar. Conocer las dos formas de usar un modelo te permite elegir con calma, según lo que necesitas hoy.</p>`,
    explicacion: `
      <p>Cuando usas un asistente de IA en una página web o en una aplicación, tu pregunta suele viajar por internet hasta otra computadora. Ella la procesa y te manda la respuesta. Pero también existe otra forma: tener el modelo dentro de tu propio equipo. ¿Qué cambia entre una y otra?</p>
      <h3>Dos lugares donde puede vivir el modelo</h3>
      <p>Un <strong>modelo local</strong> es un modelo de lenguaje que descargas y ejecutas en tu propio equipo, con un programa de escritorio. Así lo describe la documentación de una herramienta para correr modelos locales, consultada en octubre de 2026. Piensa en la diferencia entre ver una película por internet y tenerla guardada en tu computadora: en el segundo caso, ya no dependes de la señal para verla.</p>
      <p>Lo contrario es usar el modelo <strong>en la nube</strong>. Según IBM, usar la nube es acceder por internet a servidores remotos, computadoras potentes que están en grandes centros de datos. IBM habla de la nube en general y no de modelos de lenguaje. Aplicado a ellos, es una simplificación: significa que el modelo corre en esas computadoras ajenas y tu equipo solo envía el texto y recibe la respuesta.</p>
      ${NUBE_LOCAL}
      <h3>Qué ganas con un modelo local</h3>
      <p>La primera ventaja es que puedes trabajar <strong>sin conexión</strong>. Según la documentación de esa herramienta, con el modelo ya descargado puede funcionar completamente sin internet. Ojo: buscar y descargar modelos sí exige conexión, así que el internet se necesita una vez, al principio, para conseguir el archivo del modelo.</p>
      <p>La segunda ventaja es la privacidad. La misma documentación dice que nada de lo que escribes al chatear con un modelo descargado sale del dispositivo. Esto lo afirma esa herramienta; si usas otra, revisa lo que diga la suya.</p>
      <h3>Qué te cuesta</h3>
      <p>Correr un modelo en tu equipo pide equipo suficiente. Según esa documentación, los modelos de lenguaje pueden consumir mucha memoria RAM, y para Windows recomienda al menos 16 GB (octubre de 2026; revisa la información vigente). En "Qué necesita tu equipo: memoria, procesador y tarjeta gráfica" verás qué significa eso.</p>
      <p>Es una simplificación de la lección, no un dato de una fuente: un equipo común puede no tener memoria para los modelos más grandes que ofrece un servicio en la nube, y con un modelo local quizá tengas que ocuparte tú de conseguir sus nuevas versiones.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que local siempre es mejor que la nube, o al revés. Cada una sirve en situaciones distintas, y a veces conviene usar las dos.</p>`,
    ejemplo: `
      <p>Seis situaciones de ejemplo. Para cada una decide si conviene más un modelo local o uno en la nube, y cuenta cuántas son de cada grupo.</p>
      <ol class="pasos-ej">
        <li>Resumir tus apuntes en un avión, sin internet: local, porque funciona sin conexión.</li>
        <li>Consultar un modelo enorme que no cabe en tu computadora: nube, porque tu equipo no alcanza.</li>
        <li>Revisar un texto con datos personales que no quieres enviar: local, porque no sale del dispositivo.</li>
        <li>Usar una computadora vieja con muy poca memoria: nube, por falta de equipo suficiente.</li>
        <li>Practicar preguntas en un cuarto sin señal: local.</li>
        <li>Pedir ayuda desde un celular al que no le cabe el modelo que necesitas: nube.</li>
      </ol>
      <p>Resultado: <span class="resultado">3 situaciones locales y 3 en la nube</span>.</p>
      <p>Para comprobarlo, mira la razón de cada una: las locales dependen de no tener internet o de cuidar tus datos, y las de la nube, de que tu equipo no alcanza. Las situaciones son de ejemplo.</p>
      <p class="nota"><strong>Error común:</strong> pensar que "local" quiere decir que no necesitas internet nunca. Descargar el modelo sí lo requiere.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué es un modelo local?</p>', opciones: ['Un modelo que se descarga y se ejecuta en tu propio equipo', 'Un modelo que solo funciona en una biblioteca', 'Un modelo que corre en grandes centros de datos', 'Una aplicación que no necesita ningún archivo'], correcta: 0,
        pista: '<p>Piensa dónde se ejecuta: ¿en tu equipo o en otro lugar?</p>',
        solucion: '<p>Un modelo local se descarga y se ejecuta en el propio equipo, con un programa de escritorio.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según IBM, ¿qué es usar la nube?</p>', opciones: ['Guardar todo en un disco que llevas contigo', 'Acceder por internet a servidores remotos en centros de datos', 'Usar un programa sin electricidad', 'Comprar una computadora más potente'], correcta: 1,
        pista: '<p>La nube son computadoras de otros a las que llegas por internet.</p>',
        solucion: '<p>IBM la describe como acceder, por internet, a servidores remotos que están en grandes centros de datos.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la documentación de una herramienta local, con el modelo ya descargado y sin internet, ¿qué pasa con lo que escribes?</p>', opciones: ['Se envía a un servidor en cuanto vuelve la señal', 'Se borra al cerrar el programa', 'Nada de lo que escribes sale del dispositivo', 'Lo ve el proveedor del modelo'], correcta: 2,
        pista: '<p>Es una de las dos ventajas principales de la lección.</p>',
        solucion: '<p>Esa documentación dice que nada de lo que escribes al chatear con un modelo descargado sale del dispositivo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Estás en un autobús sin señal y quieres que un modelo te ayude a corregir un texto. ¿Qué opción puede funcionar?</p>', opciones: ['Un modelo en la nube, porque no necesita internet', 'Ninguna: sin internet no hay modelos', 'Un modelo local ya descargado', 'Descargar el modelo en ese momento'], correcta: 2,
        pista: '<p>Acuérdate de cuándo sí hace falta internet con un modelo local.</p>',
        solucion: '<p>Un modelo local ya descargado funciona sin conexión. Descargarlo sí exige internet, así que debió hacerse antes.</p>' },
      { tipo: 'numero', enunciado: '<p>De seis situaciones de ejemplo, en 4 conviene un modelo local. ¿En cuántas conviene un modelo en la nube?</p>', respuesta: 6 - 4,
        pista: '<p>Resta las locales del total.</p>',
        solucion: '<p>6 − 4 = <strong>2</strong> situaciones en la nube.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es una desventaja de correr un modelo en tu equipo?</p>', opciones: ['Necesitas equipo con suficiente memoria', 'Tus datos viajan por internet', 'Nunca puedes usarlo sin conexión', 'Solo lo puede usar un servidor'], correcta: 0,
        pista: '<p>Recuerda lo que dice la documentación sobre la memoria RAM.</p>',
        solucion: '<p>Los modelos pueden consumir mucha memoria, así que tu equipo debe tener suficiente.</p>' },
    ],
    fuentes: [F1, F2, F3, F4],
  });

  // ------------------------------------------------------------------
  L('Modelos abiertos: qué significa que se puedan descargar', {
    objetivo: 'Distinguir entre un modelo cerrado, uno de pesos abiertos y uno de código abierto, y entender qué dicen la licencia y la ficha de un modelo.',
    vidaReal: `
      <p>Cuando bajas una app, un juego o un libro digital, casi siempre hay reglas sobre lo que puedes hacer con él: usarlo, copiarlo, cambiarlo o venderlo. Con los modelos de IA pasa lo mismo. Saber leer esas reglas te ayuda a no meterte en problemas, a elegir un modelo que te sirva para tu proyecto y a entender por qué dos modelos que se pueden descargar no siempre permiten lo mismo.</p>`,
    explicacion: `
      <p>Un modelo cerrado solo lo usas desde la página o la aplicación de la empresa que lo hizo. Otros se pueden descargar. ¿Eso los hace "abiertos"? Depende de qué parte se abra.</p>
      <h3>Qué son los pesos abiertos</h3>
      <p>En "Redes neuronales explicadas sin fórmulas" viste que un modelo aprende ajustando números llamados pesos. Según la Open Source Initiative (OSI, Estados Unidos), los <strong>pesos abiertos</strong> son los pesos y sesgos finales de una red neuronal ya entrenada. Dicho en simple: el archivo con los números que el modelo aprendió, y que puedes descargar. Esa última parte es una simplificación de la lección.</p>
      <h3>Pesos abiertos no es lo mismo que código abierto</h3>
      <p>La Definición de IA de Código Abierto de la OSI (versión 1.0, 2024) pide más. Dice que un modelo o unos pesos de código abierto deben incluir la información de los datos y el código usados para obtener los parámetros. Por eso un modelo puede tener pesos descargables y aun así no cumplir con esa definición: falta saber con qué datos y con qué código se entrenó.</p>
      ${tabla(['Característica', 'Cerrado (solo por internet)', 'Pesos abiertos', 'Código abierto según la OSI'], [
        ['Puedes descargar los pesos', 'No', 'Sí', 'Sí'],
        ['Incluye información de los datos y el código de entrenamiento', 'No', 'No siempre', 'Sí'],
      ])}
      <p>La tabla resume ambas definiciones; las celdas <em>No</em> y <em>No siempre</em> son una simplificación para comparar.</p>
      <h3>La licencia: qué puedes hacer con el modelo</h3>
      <p>La <strong>licencia</strong> es el documento que dice qué permisos te da el autor sobre algo. Según Hugging Face, la licencia de un repositorio indica a los demás qué permisos se les otorgan, y hay que respetarla. Las licencias de los modelos varían: según Hugging Face (2022), algunas, como la familia OpenRAIL, incluyen restricciones de uso en situaciones críticas. Así que "se puede descargar" no quiere decir "se puede usar para todo". Si quieres repasar la idea de licencias, mira "Qué es el software libre".</p>
      <h3>La ficha del modelo</h3>
      <p>La <strong>ficha del modelo</strong> (<span lang="en">model card</span>) es un archivo que acompaña al modelo. Según Hugging Face (octubre de 2026), debe describir sus usos previstos y sus posibles limitaciones. Antes de descargar, léela: es como la etiqueta de un producto.</p>
      <h3>Un ejemplo: Laya</h3>
      <p>En "Modelos de decisión: IA que elige en lugar de escribir" conociste a Laya. Su ficha en Hugging Face (octubre de 2026) la muestra con pesos abiertos, licencia Apache 2.0 y capacidad de ejecutarse en equipos propios, frente a un modelo cerrado que solo se usa por internet. Es solo un ejemplo, sin juicio de calidad.</p>
      <p class="nota"><strong>Trampa común:</strong> llamar "código abierto" a cualquier modelo que se puede descargar. Para la OSI, falta la información de datos y código.</p>`,
    ejemplo: `
      <p>Tres licencias de ejemplo, inventadas para practicar (no son licencias reales). Lee qué permite cada una y cuenta cuántas dejan usar el modelo en un negocio.</p>
      ${tabla(['Licencia de ejemplo', 'Usar', 'Modificar', 'Usar en un negocio'], [['A', 'Sí', 'Sí', 'Sí'], ['B', 'Sí', 'Sí', 'No'], ['C', 'Sí', 'No', 'No']])}
      <ol class="pasos-ej">
        <li>Mira la columna <em>Usar en un negocio</em>, porque es la que pregunta el problema.</li>
        <li>Cuenta los <em>Sí</em>: solo la licencia A.</li>
      </ol>
      <p>Resultado: <span class="resultado">solo 1 licencia de las tres permite usar el modelo en un negocio</span>.</p>
      <p>Para comprobarlo, vuelve a mirar B y C: ambas dicen <em>No</em> en esa columna. En una licencia real, lee el texto completo y revisa la información vigente, porque las condiciones cambian de un modelo a otro.</p>
      <p class="nota"><strong>Error común:</strong> leer solo la columna "Usar". Que puedas usar un modelo no significa que puedas modificarlo o usarlo en un negocio.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según la OSI, ¿qué son los pesos abiertos?</p>', opciones: ['Los pesos y sesgos finales de una red neuronal ya entrenada', 'La lista de todos los datos de entrenamiento', 'El programa con el que se entrena el modelo', 'Un permiso para venderlo'], correcta: 0,
        pista: '<p>Son los números que el modelo aprendió al entrenarse.</p>',
        solucion: '<p>La OSI los define como los pesos y sesgos finales de una red neuronal ya entrenada.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué pide la Definición de IA de Código Abierto 1.0 que no pide un modelo de pesos abiertos?</p>', opciones: ['Que solo se use en un celular', 'Que cueste dinero', 'Que se use sin licencia', 'Incluir la información de los datos y el código usados para obtener los parámetros'], correcta: 3,
        pista: '<p>Piensa en qué más hace falta, además de los pesos.</p>',
        solucion: '<p>La OSI pide incluir la información de los datos y el código usados para obtener los parámetros.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un modelo se puede descargar. ¿Qué debes revisar antes de usarlo para un proyecto?</p>', opciones: ['Nada: si se puede descargar, todo está permitido', 'Solo el tamaño del archivo', 'Su licencia, porque dice qué usos están permitidos', 'Solo el nombre del modelo'], correcta: 2,
        pista: '<p>Algunas licencias tienen restricciones de uso.</p>',
        solucion: '<p>La licencia dice qué puedes hacer; según Hugging Face, algunas incluyen restricciones de uso.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Hugging Face, ¿qué debe describir la ficha del modelo?</p>', opciones: ['Solo el precio', 'Sus usos previstos y sus posibles limitaciones', 'Solo el nombre de quien lo hizo', 'Las contraseñas del autor'], correcta: 1,
        pista: '<p>Es como la etiqueta de un producto.</p>',
        solucion: '<p>La ficha debe describir los usos previstos del modelo y sus posibles limitaciones.</p>' },
      { tipo: 'numero', enunciado: '<p>En una lista de ejemplo hay 5 licencias, y 2 no permiten usar el modelo en un negocio. ¿Cuántas sí lo permiten?</p>', respuesta: 5 - 2,
        pista: '<p>Resta las que no lo permiten del total.</p>',
        solucion: '<p>5 − 2 = <strong>3</strong> licencias lo permiten.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según su ficha (octubre de 2026), ¿cómo aparece Laya?</p>', opciones: ['Con pesos cerrados y solo por internet', 'Con pesos abiertos, licencia Apache 2.0 y capacidad de ejecutarse en equipos propios', 'Sin licencia', 'Como un modelo que no se puede descargar'], correcta: 1,
        pista: '<p>La ficha la compara con un modelo cerrado que solo se usa por internet.</p>',
        solucion: '<p>Su ficha la muestra con pesos abiertos, licencia Apache 2.0 y capacidad de ejecutarse en equipos propios.</p>' },
    ],
    fuentes: [F5, F6, F7, F8, F9],
  });

  // ------------------------------------------------------------------
  const PARTES = diagrama([0, 26], [0, 9], [
    ...caja(2.6, 4.5, 4.6, 1.8, 'Disco'),
    ...flecha([4.9, 4.5], [6.3, 4.5]),
    ...caja(9, 4.5, 4.6, 1.8, 'RAM'),
    ...flecha([11.2, 5.2], [14.4, 7.1]),
    ...flecha([11.2, 3.8], [14.4, 2.2]),
    ...caja(17.2, 7.4, 5.2, 1.8, 'Procesador'),
    ...caja(17.6, 2.0, 6.6, 1.8, 'Tarjeta gráfica'),
    ...flecha([20.9, 2.0], [22.2, 2.0]),
    ...caja(24, 2.0, 3.4, 1.8, 'VRAM'),
  ], 'Diagrama de flujo. El modelo está guardado en el disco y se carga en la RAM. Desde la RAM sale un camino hacia el procesador y otro hacia la tarjeta gráfica, que tiene su propia memoria llamada VRAM.');

  L('Qué necesita tu equipo: memoria, procesador y tarjeta gráfica', {
    objetivo: 'Reconocer qué papel cumplen la memoria RAM, el procesador y la tarjeta gráfica al correr un modelo y comparar un equipo con los requisitos de una herramienta.',
    vidaReal: `
      <p>Antes de comprar un videojuego, miras si tu computadora lo aguanta, y antes de pedir una computadora nueva conviene saber qué hace falta de verdad. Con los modelos de IA ocurre igual: el mismo modelo puede ir fluido en un equipo y no abrir en otro. Aprender qué piezas importan te ayuda a saber si tu computadora puede correr uno, y también a no gastar dinero en piezas que no necesitas.</p>`,
    explicacion: `
      <p>Imagina que cocinas. El armario guarda los ingredientes y la mesa es donde los pones para trabajar. Si la mesa es chica, no cabe todo. Algo así pasa con un modelo: guardado en el disco no hace nada, hay que llevarlo a la mesa. Las piezas de una computadora las repasas en "Partes de una computadora".</p>
      <h3>La memoria: la mesa de trabajo</h3>
      <p>La <strong>memoria RAM</strong> es donde la computadora tiene lo que está usando ahora mismo. Como simplificación, para usar un modelo hay que cargarlo en memoria, así que su tamaño decide si cabe. Por eso la documentación de una herramienta local dice que los modelos pueden consumir mucha RAM.</p>
      <h3>El procesador y la tarjeta gráfica</h3>
      <p>El procesador es el cerebro general de la computadora: hace las cuentas de todos los programas. La <strong>tarjeta gráfica</strong> (<span lang="en">GPU</span>) es otra pieza que nació para dibujar imágenes. Según IBM, las GPU hacen muchos cálculos a la vez, por eso sirven para el aprendizaje profundo y la IA. Un modelo es, en el fondo, una enorme cantidad de cuentas.</p>
      ${PARTES}
      <h3>La memoria de la tarjeta gráfica</h3>
      <p>IBM explica que una GPU tiene su propia memoria, pensada para grandes volúmenes de datos. IBM no usa esa sigla, pero a esa memoria se le llama comúnmente <strong>memoria de video</strong> (<span lang="en">VRAM</span>), y es el nombre que verás en las herramientas. Como simplificación, si el modelo cabe ahí, la tarjeta gráfica puede trabajar con él.</p>
      <h3>Cuando la memoria se comparte</h3>
      <p>Algunas computadoras no separan las memorias. Según Apple (2020), sus chips M1 tienen memoria unificada: un solo conjunto de memoria dentro del mismo paquete. Como simplificación, en estos equipos el procesador y la parte gráfica comparten ese conjunto, y por eso se habla de memoria unificada en lugar de VRAM.</p>
      <h3>Qué piden los programas (octubre de 2026)</h3>
      <p>Cada herramienta publica sus requisitos, y cambian, así que revisa la información vigente. Estos datos vienen de la documentación de dos herramientas distintas, que llamamos A y B, consultadas en octubre de 2026:</p>
      ${tabla(['Sistema o caso', 'Qué dice la documentación', 'Documentación de'], [
        ['Windows', 'Al menos 16 GB de RAM recomendados', 'Herramienta A'],
        ['Mac', 'Chip Apple Silicon, macOS 14.0 o más nuevo y 16 GB o más de RAM recomendados; en Mac de 8 GB, aún puede servir con modelos pequeños', 'Herramienta A'],
        ['Un modelo de unos 7.2 GB de descarga', '8 GB de VRAM disponible, o memoria unificada en Mac; es una orientación para ese modelo, no una tabla general', 'Herramienta B'],
      ])}
      <p>Si falta VRAM, la documentación de la herramienta B dice que puede usar la RAM del sistema, pero las respuestas pueden ir más lentas.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir el disco con la memoria. Un disco de 1 000 GB no ayuda si la RAM es chica, porque el modelo se carga en la memoria, no se queda en el disco.</p>`,
    ejemplo: `
      <p>Tres computadoras de ejemplo. Cuenta cuántas cumplen la recomendación de 16 GB de RAM de la tabla de Windows y Mac.</p>
      ${tabla(['Equipo de ejemplo', 'Sistema', 'Memoria'], [['A', 'Windows', '16 GB de RAM'], ['B', 'Mac con Apple Silicon', '8 GB de memoria unificada'], ['C', 'Windows', '8 GB de RAM y tarjeta gráfica con 8 GB de VRAM']])}
      <ol class="pasos-ej">
        <li>El equipo A tiene 16 GB de RAM: cumple la recomendación.</li>
        <li>El equipo B tiene 8 GB: no llega a 16 GB, pero la documentación dice que aún puede usar modelos pequeños.</li>
        <li>El equipo C tiene 8 GB de RAM: no llega a 16 GB. Sin embargo, sus 8 GB de VRAM coinciden con la orientación para un modelo de unos 7.2 GB.</li>
      </ol>
      <p>Resultado: <span class="resultado">solo 1 equipo (el A) cumple los 16 GB de RAM</span>.</p>
      <p>Para comprobarlo, mira que B y C tienen 8 GB. Cumplir la recomendación no es lo único que importa. Las cifras son de ejemplo.</p>
      <p class="nota"><strong>Error común:</strong> comparar la VRAM con la RAM como si fueran la misma memoria. Son distintas, y cada una tiene su propia cifra.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve la memoria RAM al usar un modelo?</p>', opciones: ['Para imprimir el modelo', 'Para guardar el modelo para siempre', 'Para cargar el modelo mientras lo usas', 'Para conectarte a internet'], correcta: 2,
        pista: '<p>Recuerda la comparación de la mesa de trabajo.</p>',
        solucion: '<p>La RAM es donde se carga lo que estás usando. Un modelo debe caber ahí para funcionar.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según IBM, ¿por qué las GPU sirven para la IA?</p>', opciones: ['Hacen muchos cálculos a la vez', 'Guardan los archivos más tiempo', 'Gastan menos electricidad siempre', 'No necesitan memoria'], correcta: 0,
        pista: '<p>Un modelo requiere muchísimas cuentas.</p>',
        solucion: '<p>IBM dice que las GPU hacen muchos cálculos simultáneos, y por eso sirven para el aprendizaje profundo y de IA.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es la VRAM?</p>', opciones: ['La memoria del procesador', 'Un tipo de disco duro', 'Un programa para descargar modelos', 'La memoria de video, propia de la tarjeta gráfica'], correcta: 3,
        pista: '<p>Es la memoria que tiene la tarjeta gráfica para ella sola.</p>',
        solucion: '<p>La VRAM es la memoria de video: la memoria propia de la tarjeta gráfica.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Apple (2020), ¿qué es la memoria unificada de sus chips M1?</p>', opciones: ['Dos memorias separadas, una para cada pieza', 'Un solo conjunto de memoria dentro del mismo paquete del chip', 'Un disco externo', 'Una memoria que solo usa internet'], correcta: 1,
        pista: '<p>La palabra "unificada" te da la pista: unir en uno.</p>',
        solucion: '<p>Apple la describe como un solo conjunto de memoria de alta velocidad dentro de un paquete.</p>' },
      { tipo: 'numero', enunciado: '<p>Una herramienta recomienda al menos 16 GB de RAM. Tu computadora de ejemplo tiene 8 GB. ¿Cuántos GB le faltan para llegar a la recomendación?</p>', respuesta: 16 - 8,
        pista: '<p>Resta lo que tienes de lo que se recomienda.</p>',
        solucion: '<p>16 − 8 = <strong>8</strong> GB.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la documentación de una herramienta (octubre de 2026), ¿qué puede pasar si tienes poca VRAM?</p>', opciones: ['Puede usar la RAM del sistema, pero las respuestas pueden ir más lentas', 'El modelo se vuelve más inteligente', 'La computadora se apaga siempre', 'El modelo se borra'], correcta: 0,
        pista: '<p>La documentación habla de usar otra memoria.</p>',
        solucion: '<p>Con menos VRAM, esa herramienta puede usar la RAM del sistema, pero las respuestas pueden ser más lentas.</p>' },
    ],
    fuentes: [F4, F10, F11, F12],
  });

  // ------------------------------------------------------------------
  L('Tamaño de un modelo: parámetros y cuánta memoria ocupa', {
    objetivo: 'Calcular cuánta memoria ocupa aproximadamente un modelo a partir de sus parámetros y la precisión con la que se guarda cada número.',
    vidaReal: `
      <p>Antes de bajar una película, miras cuántos gigas pesa y si te caben en el celular. Con un modelo de IA conviene hacer la misma cuenta, pero antes de descargarlo: así evitas esperar una descarga enorme y descubrir después que tu equipo no lo aguanta. Saber hacer esta estimación con una multiplicación te permite comparar modelos de distintos tamaños y decidir, con números, cuáles caben en tu computadora.</p>`,
    explicacion: `
      <p>Un modelo es, en el fondo, una lista enorme de números: sus parámetros. Guardar cada número ocupa lugar en la memoria. Entonces, ¿cuánto ocupa el modelo entero? Depende de cuántos números tiene y de cuánto espacio ocupa cada uno.</p>
      <h3>Bits y bytes</h3>
      <p>Un bit es la unidad más pequeña de información: un 0 o un 1. Un <strong>byte</strong> es una unidad de información formada por ocho bits, según Wikipedia en español. La memoria de los equipos se mide en bytes, y un <strong>gigabyte</strong> (GB) son, aproximadamente, mil millones de bytes. Esa equivalencia es una simplificación; sirve para estimar.</p>
      <h3>La precisión: cuántos bits por número</h3>
      <p>Cada parámetro es un número con decimales, y se puede guardar con más o menos detalle. A cuántos bits usa cada número se le llama <strong>precisión</strong>. Con 32 bits, que son 4 bytes, el número es muy detallado. Con 16 bits, que son 2 bytes, es más ligero. Piensa en medir con una regla de milímetros o con una de centímetros: la segunda es más sencilla, pero menos fina.</p>
      <h3>La cuenta</h3>
      <p>La documentación de Hugging Face (octubre de 2026) da la regla: cargar los pesos de un modelo de X miles de millones de parámetros en 32 bits requiere unos 4 × X GB, y en 16 bits, unos 2 × X GB. En palabras:</p>
      <p><strong>memoria ≈ parámetros × bytes por parámetro</strong></p>
      <p>Aquí "parámetros" es cuántos números tiene el modelo y "bytes por parámetro" es lo que ocupa cada uno. Como un gigabyte son mil millones de bytes y los modelos se miden en miles de millones de parámetros, los gigabytes salen directo. Si quieres repasar cómo se escriben y multiplican números tan grandes, mira "Notación científica" y "Multiplicación y división".</p>
      ${barras({ etiquetas: ['32 bits', '16 bits', '8 bits', '4 bits'], valores: [28, 14, 7, 3.5], max: 30, paso: 10, descripcion: 'Gráfica de barras con la memoria en GB de un modelo de ejemplo de 7 mil millones de parámetros según la precisión: 28 GB con 32 bits, 14 GB con 16 bits, 7 GB con 8 bits y 3.5 GB con 4 bits.' })}
      <p>La gráfica es de un modelo de ejemplo con 7 mil millones de parámetros. Las barras de 32 y 16 bits salen de la regla de Hugging Face; las de 8 y 4 bits no están en esa regla: son la aplicación de la misma cuenta con 1 y 0.5 bytes por parámetro.</p>
      <h3>Qué quiere decir 7B</h3>
      <p>En muchos nombres de modelos aparece una cifra seguida de una B, como 7B. Suele indicar miles de millones de parámetros (7B es 7 mil millones, o 7 × 10⁹). Es una simplificación de la lección, no un dato citado: confirma lo que diga la ficha del modelo que elijas.</p>
      <h3>La memoria que no cuentas</h3>
      <p>Esta cuenta solo estima los pesos. Además, el contexto que viste en "Contexto y memoria" también ocupa lugar. Según Hugging Face, guardar el caché de claves y valores puede costar mucha memoria con entradas largas o chats de varios turnos. Por eso, en la práctica, conviene que te sobre algo.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que el tamaño del modelo en memoria es igual al de sus parámetros. Un mismo modelo ocupa más o menos según los bits con que se guarde.</p>`,
    ejemplo: `
      <p>Un modelo de ejemplo tiene 7 mil millones de parámetros y se guarda con 16 bits. ¿Cuánta memoria ocupa, más o menos? Después, ¿y si se guarda con 4 bits?</p>
      <ol class="pasos-ej">
        <li>Pasa los bits a bytes dividiendo entre 8: 16 bits ÷ 8 = 2 bytes por parámetro.</li>
        <li>Multiplica: 7 mil millones × 2 bytes = 14 mil millones de bytes.</li>
        <li>Pasa a gigabytes, que son mil millones de bytes: unos 14 GB.</li>
        <li>Con 4 bits, cada parámetro ocupa 4 ÷ 8 = 0.5 bytes, así que 7 mil millones × 0.5 = 3.5 mil millones de bytes, o sea 3.5 GB.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 14 GB con 16 bits y unos 3.5 GB con 4 bits</span>.</p>
      <p>Para comprobarlo, usa la regla de Hugging Face: 2 × 7 = 14 GB en 16 bits. Los 3.5 GB son la cuarta parte de los 14 GB, porque 4 bits son la cuarta parte de 16 bits. Las cifras del modelo son de ejemplo.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar por los bits y no por los bytes. Primero divide los bits entre 8.</p>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un byte tiene 8 bits. ¿Cuántos bytes ocupa cada parámetro si se guarda con 32 bits?</p>', respuesta: 32 / 8,
        pista: '<p>Divide los bits entre 8.</p>',
        solucion: '<p>32 ÷ 8 = <strong>4</strong> bytes por parámetro.</p>' },
      { tipo: 'numero', enunciado: '<p>Un modelo de ejemplo tiene 13 mil millones de parámetros y se guarda con 16 bits (2 bytes por parámetro). ¿Cuántos GB ocupa, más o menos?</p>', respuesta: 13 * 2,
        pista: '<p>Multiplica los miles de millones de parámetros por los bytes de cada uno.</p>',
        solucion: '<p>13 × 2 = <strong>26</strong> GB, igual que la regla 2 × X de Hugging Face.</p>' },
      { tipo: 'numero', enunciado: '<p>Un modelo de ejemplo tiene 3 mil millones de parámetros y se guarda con 32 bits. ¿Cuántos GB ocupa, más o menos?</p>', respuesta: 3 * 4,
        pista: '<p>En 32 bits la regla es 4 × X.</p>',
        solucion: '<p>3 × 4 = <strong>12</strong> GB.</p>' },
      { tipo: 'numero', enunciado: '<p>Un modelo de ejemplo tiene 7 mil millones de parámetros y se guarda con 8 bits. ¿Cuántos GB ocupa, más o menos?</p>', respuesta: 7 * 8 / 8,
        pista: '<p>Primero pasa los 8 bits a bytes.</p>',
        solucion: '<p>8 bits son 1 byte, así que 7 × 1 = <strong>7</strong> GB.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un mismo modelo se guarda una vez con 32 bits y otra con 16 bits. ¿Cuál ocupa menos memoria?</p>', opciones: ['La de 32 bits', 'La de 16 bits', 'Ocupan lo mismo', 'Depende del color del archivo'], correcta: 1,
        pista: '<p>Menos bits por número significa menos bytes por número.</p>',
        solucion: '<p>La de 16 bits ocupa la mitad: 2 bytes por parámetro en lugar de 4.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Hugging Face, ¿qué puede costar mucha memoria con entradas largas o chats de varios turnos?</p>', opciones: ['El brillo de la pantalla', 'La velocidad de internet', 'Guardar el caché de claves y valores del contexto', 'El nombre del modelo'], correcta: 2,
        pista: '<p>Es la memoria extra que viene del contexto.</p>',
        solucion: '<p>El caché de claves y valores del contexto puede costar mucha memoria cuando el texto es largo.</p>' },
    ],
    fuentes: [F13, F14],
  });

  // ------------------------------------------------------------------
  L('Cuantización: modelos más ligeros a cambio de un poco de calidad', {
    objetivo: 'Explicar qué es la cuantización, calcular cuánto ahorra y entender qué se pierde.',
    vidaReal: `
      <p>Al mandar una foto por mensaje, el celular puede comprimirla para que pese menos: se ve casi igual, aunque pierde detalle. Con los modelos de IA ocurre algo parecido. Gracias a eso, modelos que no cabrían en una computadora normal pueden usarse en ella. Entender cómo se hace te permite elegir entre una versión más grande y exacta y otra más ligera, y saber por qué un mismo modelo tiene varias versiones.</p>`,
    explicacion: `
      <p>En la lección anterior viste que un modelo con 16 bits por número ocupa mucha memoria. Entonces, ¿se puede guardar el mismo modelo en menos espacio? Sí, y la técnica se llama cuantización.</p>
      <h3>Guardar con menos detalle</h3>
      <p>La <strong>cuantización</strong> consiste en representar los pesos con menos precisión. Según la documentación de Hugging Face (octubre de 2026), es representar los pesos y las activaciones con tipos de datos de baja precisión; por ejemplo, números enteros de 8 bits en lugar de decimales de 32 bits. Es como redondear: en vez de escribir 3.14159265, escribes 3.14. Es más corto, aunque menos exacto.</p>
      <h3>Qué ganas y qué pierdes</h3>
      <p>Con menos <strong>bits</strong> por número, el modelo ocupa menos memoria. Según Hugging Face, además las multiplicaciones de matrices pueden ser mucho más rápidas con aritmética de enteros. A cambio, la documentación de una herramienta para correr modelos locales dice que la cuantización comprime el archivo del modelo cediendo algo de calidad. Por eso hay un intercambio: más ligero, pero con un poco menos de precisión.</p>
      <h3>Cuántos bytes por número</h3>
      <p>Un bit es la unidad más pequeña de información, un 0 o un 1, y un byte son ocho bits. Los 4 bits de una cuantización fuerte son medio byte, según Wikipedia en español, que llama nibble al conjunto de cuatro bits. Así que cada versión ocupa:</p>
      ${tabla(['Bits por parámetro', 'Bytes por parámetro', 'Memoria de un modelo de 7 mil millones de parámetros'], [['16', '2', '14 GB'], ['8', '1', '7 GB'], ['4', '0.5', '3.5 GB']])}
      <p>Las memorias salen de multiplicar los 7 mil millones de parámetros por los bytes de cada fila, con la cuenta de la lección anterior. Son cifras de ejemplo, redondas.</p>
      <h3>Los archivos GGUF</h3>
      <p>Muchos modelos locales se distribuyen en archivos con formato GGUF. Según Hugging Face, este formato tiene tipos de cuantización con nombres como Q4_K. Por ejemplo, ese tipo usa 4 bits por peso nominales, pero en la práctica da 4.5 bits por peso, porque guarda además unas escalas por bloques. Por eso un archivo con ese tipo de cuantización pesa un poco más de lo que sale en la cuenta redonda.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que bajar los bits siempre es gratis. Cuantizar ahorra memoria, pero puede reducir la calidad de las respuestas; mientras menos bits, más riesgo.</p>
      <p>Las versiones de un modelo se publican con su tamaño en las páginas de descarga. Esas cifras cambian y las lees al elegir: lo verás en "Elegir un modelo según tu equipo y tu tarea".</p>`,
    ejemplo: `
      <p>Una biblioteca de modelos publica un modelo de 8 mil millones de parámetros cuya versión de 16 bits pesa 16 GB (a octubre de 2026; revisa la información vigente). Calcula cuánto pesarían las versiones de 8 y 4 bits, y el porcentaje que se ahorra. Las otras dos son cálculos con la fórmula, no tamaños publicados.</p>
      <ol class="pasos-ej">
        <li>Con 8 bits, cada parámetro ocupa 1 byte: 8 mil millones × 1 = 8 GB.</li>
        <li>Con 4 bits, ocupa 0.5 bytes: 8 mil millones × 0.5 = 4 GB.</li>
        <li>El ahorro con 8 bits es (16 − 8) ÷ 16 = 0.5, o sea 50 %.</li>
        <li>El ahorro con 4 bits es (16 − 4) ÷ 16 = 0.75, o sea 75 %.</li>
      </ol>
      <p>Resultado: <span class="resultado">8 GB (50 % menos) con 8 bits y 4 GB (75 % menos) con 4 bits</span>.</p>
      <p>Para comprobarlo, 4 bits son la cuarta parte de 16 bits, y la cuarta parte de 16 GB es 4 GB. En "Porcentajes" lo repasas: 75 % se ahorra y 25 % queda.</p>
      <p class="nota"><strong>Error común:</strong> decir que el ahorro es el tamaño nuevo. Los 4 GB son lo que queda; lo ahorrado son 12 GB, o sea 75 %.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según Hugging Face, ¿qué es cuantizar?</p>', opciones: ['Borrar los pesos más grandes', 'Entrenar el modelo otra vez desde cero', 'Traducir el modelo a otro idioma', 'Representar los pesos con tipos de datos de baja precisión'], correcta: 3,
        pista: '<p>Se parece a redondear números.</p>',
        solucion: '<p>Cuantizar es representar los pesos con tipos de datos de baja precisión, por ejemplo enteros de 8 bits en vez de decimales de 32 bits.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué se puede perder al cuantizar un modelo?</p>', opciones: ['Siempre toda su calidad', 'Algo de calidad', 'Su licencia', 'Su nombre'], correcta: 1,
        pista: '<p>Es el intercambio de la lección: menos memoria a cambio de algo.</p>',
        solucion: '<p>La documentación de una herramienta local dice que cuantizar comprime el archivo cediendo algo de calidad.</p>' },
      { tipo: 'numero', enunciado: '<p>Un modelo de ejemplo con 10 mil millones de parámetros se guarda con 4 bits (0.5 bytes por parámetro). ¿Cuántos GB ocupa, más o menos?</p>', respuesta: 10 * 0.5,
        pista: '<p>Multiplica los miles de millones de parámetros por los bytes de cada uno.</p>',
        solucion: '<p>10 × 0.5 = <strong>5</strong> GB.</p>' },
      { tipo: 'numero', enunciado: '<p>Un modelo de ejemplo pesa 20 GB en 16 bits y 5 GB en 4 bits. ¿Qué porcentaje de memoria se ahorra al pasar a 4 bits?</p>', respuesta: (20 - 5) / 20 * 100,
        pista: '<p>Calcula cuánto se ahorra (20 − 5) y compáralo con el original (20).</p>',
        solucion: '<p>(20 − 5) ÷ 20 = 0.75, o sea <strong>75</strong> %.</p>' },
      { tipo: 'numero', enunciado: '<p>Un tipo de cuantización usa en la práctica 4.5 bits por peso. Para un modelo de ejemplo de 8 mil millones de parámetros, ¿cuántos GB son? (bits ÷ 8 = bytes)</p>', respuesta: 8 * 4.5 / 8, tolerancia: 0.01,
        pista: '<p>Pasa los 4.5 bits a bytes dividiendo entre 8, y luego multiplica por los miles de millones de parámetros.</p>',
        solucion: '<p>4.5 ÷ 8 = 0.5625 bytes por parámetro, y 8 × 0.5625 = <strong>4.5</strong> GB.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuántos bytes ocupa cada parámetro en una cuantización de 4 bits?</p>', opciones: ['4 bytes', '0.5 bytes (medio byte)', '2 bytes', '8 bytes'], correcta: 1,
        pista: '<p>Un byte son 8 bits.</p>',
        solucion: '<p>4 bits son medio byte, es decir 0.5 bytes por parámetro.</p>' },
    ],
    fuentes: [F20, F21, F22, F23],
  });

  // ------------------------------------------------------------------
  const DECISION = diagrama([0, 34], [0, 9], [
    ...caja(5.5, 5.5, 10, 2, '¿Para qué lo usas?'),
    ...flecha([10.5, 5.5], [12, 5.5]),
    ...caja(17, 5.5, 10, 2, '¿Cuánta memoria?'),
    ...flecha([22, 5.5], [23.5, 5.5]),
    ...caja(28.5, 5.5, 10, 2, 'Tamaño y bits'),
    txt(5.5, 2.4, 'conversar, código'),
    txt(17, 2.4, 'RAM o VRAM'),
    txt(28.5, 2.4, 'con margen'),
  ], 'Diagrama de decisión con tres pasos de izquierda a derecha. Primero: para qué lo usas, por ejemplo conversar o programar. Segundo: cuánta memoria tienes, sea RAM, VRAM o memoria unificada. Tercero: elegir el tamaño del modelo y los bits de la cuantización para que quepa con margen.');

  L('Elegir un modelo según tu equipo y tu tarea', {
    objetivo: 'Elegir un modelo local combinando la tarea que quieres hacer y la memoria de tu equipo, y dejar un margen de memoria.',
    vidaReal: `
      <p>Elegir zapatos es parecido: no existe el mejor par, depende de si vas a correr, caminar o trabajar, y de que te queden bien. Con los modelos locales pasa lo mismo. Aprender a combinar lo que quieres hacer con lo que tu equipo aguanta te evita descargar archivos enormes que no abren, o modelos tan pequeños que no te sirven. Así, la elección deja de ser adivinar y se vuelve una cuenta sencilla.</p>`,
    explicacion: `
      <p>Ya sabes qué piezas importan y cuánto ocupa un modelo. Ahora toca decidir cuál usar. Conviene hacerse dos preguntas, en este orden: ¿para qué lo quiero? y ¿cuánta memoria tengo?</p>
      ${DECISION}
      <h3>Primero, para qué lo quieres</h3>
      <p>Un <strong>modelo base</strong> es el que solo aprendió a continuar texto. Según IBM, un modelo preentrenado no está optimizado para conversar ni para seguir instrucciones: en sentido literal, no contesta, solo agrega texto a lo que le diste. El <strong>modelo ajustado a instrucciones</strong> recibe un entrenamiento extra para seguirlas y por eso resulta más útil para conversar. Si lo que quieres es chatear, busca uno ajustado a instrucciones.</p>
      <p>Según IBM, también existen variantes especializadas de un mismo modelo; por ejemplo, una ajustada para el diálogo y otra para programar (ejemplo de 2023). Laya, de la que hablaste en "Modelos de decisión: IA que elige en lugar de escribir", es un ejemplo de modelo que se puede usar en equipos propios: según su ficha (octubre de 2026), tiene pesos abiertos, licencia Apache 2.0 y puede alojarse en equipos propios.</p>
      <h3>Después, cuánta memoria tienes</h3>
      <p>Del paso anterior sabes cuánta memoria pide cada versión de un modelo. La regla de esta lección es que el modelo debe caber con <strong>margen de memoria</strong>. Es una recomendación de la lección, no de una fuente: el sistema operativo, tus otros programas y el contexto también ocupan lugar, así que no llenes toda la memoria con el modelo. Como regla práctica para empezar, que el modelo ocupe menos de la mitad de la memoria disponible. Un modelo justo en el límite puede ir lento o no abrir.</p>
      <p>La documentación de una herramienta local dice que, con poca VRAM, puede usar la RAM del sistema, pero las respuestas pueden ir más lentas (octubre de 2026). Es decir, que no quepa en la memoria rápida no siempre impide usarlo, aunque sí tiene un precio.</p>
      <h3>Por último, el tamaño y los bits</h3>
      <p>Si tu memoria es limitada, puedes elegir un modelo con menos parámetros o la misma versión con menos bits, como viste en "Cuantización: modelos más ligeros a cambio de un poco de calidad". Un modelo más pequeño suele alcanzar para tareas simples; uno grande ayuda cuando la tarea es más difícil, aunque pide más memoria. Esto es una simplificación para empezar a elegir.</p>
      <p>Las páginas de descarga publican el tamaño de cada versión. Por ejemplo, en la biblioteca de una herramienta local, la versión de 16 bits de un modelo de 8 mil millones de parámetros pesa 16 GB (octubre de 2026). Esos tamaños cambian: revisa la información vigente.</p>
      <p class="nota"><strong>Trampa común:</strong> elegir el modelo más grande que cabe justo. Si ocupa casi toda la memoria, no queda lugar para el resto y todo se vuelve lento.</p>`,
    ejemplo: `
      <p>Un equipo de ejemplo tiene 16 GB de memoria. Hay tres modelos de ejemplo, que pesan 2, 5 y 40 GB. La regla de esta lección, que es una recomendación de la lección y no de una fuente, dice que el modelo ocupe menos de la mitad de la memoria disponible. ¿Cuáles se pueden elegir?</p>
      <ol class="pasos-ej">
        <li>Calcula la mitad de la memoria: 16 ÷ 2 = 8 GB. Ese es el tope.</li>
        <li>El modelo de 2 GB está por debajo de 8 GB: se puede elegir.</li>
        <li>El de 5 GB también está por debajo de 8 GB: se puede elegir.</li>
        <li>El de 40 GB supera incluso los 16 GB del equipo: no cabe.</li>
      </ol>
      <p>Resultado: <span class="resultado">se pueden elegir 2 de los 3 modelos (el de 2 GB y el de 5 GB)</span>.</p>
      <p>Para decidir entre los dos, vuelve a la tarea: el de 5 GB, al ser más grande, suele servir para tareas más difíciles, y el de 2 GB para tareas simples. Todas las cifras son de ejemplo.</p>
      <p class="nota"><strong>Error común:</strong> comparar el modelo solo con la memoria total y olvidarse del margen.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Quieres chatear con un modelo local. ¿Cuál conviene buscar?</p>', opciones: ['Uno ajustado a instrucciones', 'Uno que solo continúe texto', 'Uno sin ficha de modelo', 'El más grande que exista'], correcta: 0,
        pista: '<p>Según IBM, uno de los tipos no está optimizado para conversar.</p>',
        solucion: '<p>Un modelo ajustado a instrucciones sirve mejor para conversar. El base solo continúa texto.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según IBM, ¿qué hace literalmente un modelo preentrenado (base)?</p>', opciones: ['Responde siempre con la verdad', 'Revisa su propia licencia', 'Agrega texto a lo que le escribiste', 'Se conecta a internet para consultar'], correcta: 2,
        pista: '<p>No contesta como un asistente.</p>',
        solucion: '<p>IBM dice que, en sentido literal, no responde a una instrucción: solo agrega texto a ella.</p>' },
      { tipo: 'numero', enunciado: '<p>Un equipo de ejemplo tiene 16 GB de memoria y quieres que el modelo ocupe como máximo la mitad. ¿Cuántos GB puede pesar el modelo?</p>', respuesta: 16 / 2,
        pista: '<p>Divide la memoria entre 2.</p>',
        solucion: '<p>16 ÷ 2 = <strong>8</strong> GB.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un equipo de ejemplo tiene 16 GB de memoria. La versión de 16 bits de un modelo pesa 16 GB. ¿Qué conviene pensar?</p>', opciones: ['Que cabe perfecto, porque 16 es igual a 16', 'Que no deja margen, así que conviene una versión más ligera', 'Que el modelo se hará más pequeño solo', 'Que no importa la memoria'], correcta: 1,
        pista: '<p>El sistema operativo y el contexto también ocupan memoria.</p>',
        solucion: '<p>Ocuparía toda la memoria. Conviene una versión con menos bits o un modelo más pequeño para dejar margen.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la documentación de una herramienta local, ¿qué puede pasar con poca VRAM?</p>', opciones: ['No puede usarse ningún modelo', 'El modelo se vuelve mucho más rápido', 'Se pierden los archivos', 'Puede usar la RAM del sistema y responder más lento'], correcta: 3,
        pista: '<p>La documentación habla de otra memoria disponible.</p>',
        solucion: '<p>Con menos VRAM puede usar la RAM del sistema, pero las respuestas pueden ir más lentas.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según su ficha (octubre de 2026), ¿qué se dice de Laya?</p>', opciones: ['Que solo funciona por internet', 'Que no tiene licencia', 'Que nunca se puede descargar', 'Que puede alojarse en tus propios equipos'], correcta: 3,
        pista: '<p>Recuerda que su ficha habla de ejecutarse en equipos propios.</p>',
        solucion: '<p>Su ficha dice que tiene pesos abiertos, licencia Apache 2.0 y capacidad de ejecutarse en equipos propios.</p>' },
    ],
    fuentes: [F24, F25, F26, F27],
  });

  // ------------------------------------------------------------------
  L('Instalar y usar Ollama', {
    objetivo: 'Reconocer los pasos para instalar Ollama en cada sistema y leer los comandos básicos para descargar, usar, listar y borrar modelos.',
    vidaReal: `
      <p>Muchos programas útiles no tienen ventanas ni botones: se manejan escribiendo órdenes cortas. Saber leerlas te sirve para instalar herramientas, para que no te dé miedo una pantalla con letras, probar un asistente de IA sin depender de internet y entender un tutorial sin copiar a ciegas. Aquí practicarás con una herramienta concreta y sus comandos más usados, y todo lo que aprendas sobre leer órdenes te servirá con muchas otras.</p>`,
    explicacion: `
      <p>Pide permiso a un adulto antes de instalar programas o descargar modelos.</p>
      <p>Ollama es un programa para correr modelos de lenguaje en tu propio equipo, sin necesitar un servidor de otra empresa. Tú descargas el programa, descargas el modelo y todo corre en tu computadora. Esta lección cuenta lo que dice su documentación oficial en octubre de 2026. La interfaz y los comandos pueden cambiar, así que revisa la documentación vigente antes de seguir los pasos.</p>
      <h3>Cómo se instala</h3>
      <p>En macOS y en Windows, la documentación indica descargar Ollama desde la página oficial y luego abrir la app o escribir <code>ollama</code> en la terminal. En Linux hay una orden para escribir en la terminal; la documentación de Linux dice que la instalación se hace con este comando:</p>
      <p><code>curl -fsSL https://ollama.com/install.sh | sh</code></p>
      <p>La <strong>terminal</strong> es una ventana donde escribes órdenes en vez de hacer clic. Cada orden se llama <strong>comando</strong>. Este comando en particular descarga un programa de internet y lo ejecuta de inmediato. Por eso, antes de pegarlo comprueba que lo copiaste del sitio oficial y no de un mensaje o un video cualquiera. En "Instalar software libre con seguridad" viste cómo comprobar de dónde viene lo que descargas.</p>
      <h3>Cómo se usa</h3>
      <p>Con Ollama instalado, la documentación muestra que el comando <code>ollama run</code> sirve para empezar. Por ejemplo, <code>ollama run gemma4:e2b</code> descarga el modelo indicado y abre un chat en tu computadora. Ese nombre es el que aparece en la documentación de octubre de 2026 y puede cambiar; lo que va después de <code>run</code> es el modelo que quieres usar.</p>
      ${tabla(["Comando","Qué hace"], [["<code>ollama run gemma4:e2b</code>","Descarga el modelo si hace falta y abre un chat."],["<code>ollama pull gemma4</code>","Descarga un modelo, sin abrir el chat."],["<code>ollama ls</code>","Muestra la lista de los modelos que tienes."],["<code>ollama rm gemma4</code>","Elimina un modelo."]])}
      <p>Fíjate en que la lista se pide con <code>ollama ls</code>, no con <code>ollama list</code>: así lo escribe la documentación. Descargar un modelo ocupa espacio en el disco, y borrar los que ya no usas lo libera. Los modelos pesan varios gigabytes, así que conviene revisar cuánto espacio tienes antes de bajar uno nuevo.</p>
      <h3>Otras cosas que dice la documentación</h3>
      <p>En su página de Windows, la documentación dice que la API local de Ollama se sirve en <code>http://localhost:11434</code>. Una API es la puerta por la que un programa habla con otro, y esta es una dirección interna: otros programas de tu propio equipo pueden hablar con el modelo por ahí. Además, Ollama se publica con la licencia MIT, según su repositorio en GitHub.</p>
      <p class="nota"><strong>Trampa común:</strong> pegar en la terminal un comando que encontraste en cualquier parte. Antes de ejecutar algo que descarga un programa, comprueba que viene del sitio oficial.</p>`,
    ejemplo: `
      <p>Esta es una sesión de ejemplo, escrita en el orden de los pasos. ¿Qué hace cada línea?</p>
      <p><code>ollama run gemma4:e2b</code><br><code>ollama ls</code><br><code>ollama rm gemma4:e2b</code></p>
      <ol class="pasos-ej">
        <li>La primera línea descarga el modelo si todavía no lo tienes y abre un chat con él. Es lo que dice la documentación de <code>run</code>.</li>
        <li>La segunda pide la lista de modelos. Después de la primera línea, el modelo ya debe aparecer ahí.</li>
        <li>La tercera elimina el modelo. Se usa cuando ya no lo necesitas y quieres recuperar espacio.</li>
      </ol>
      <p>Resultado: <span class="resultado">descargar y chatear, revisar la lista y borrar</span>.</p>
      <p>Para comprobarlo, mira la última palabra de cada orden: <code>run</code> es correr, <code>ls</code> es listar y <code>rm</code> es remover.</p>
      <p class="nota"><strong>Error común:</strong> escribir <code>ollama list</code>. La documentación usa <code>ollama ls</code>.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué hace <code>ollama run gemma4:e2b</code>, según la documentación?</p>', opciones: ['Borra el modelo gemma4:e2b', 'Descarga el modelo si hace falta y abre un chat', 'Muestra los modelos instalados', 'Cambia la licencia del programa'], correcta: 1,
        pista: '<p>La palabra <code>run</code> quiere decir correr.</p>',
        solucion: '<p>La documentación dice que Ollama descarga el modelo y abre un chat en tu computadora.</p>' },
      { tipo: 'texto', enunciado: '<p>Escribe el comando que muestra la lista de modelos (las dos palabras, como en la documentación).</p>', respuestas: ['ollama ls'],
        pista: '<p>No es <code>list</code>: son solo dos letras.</p>',
        solucion: '<p>El comando es <strong>ollama ls</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Antes de pegar en la terminal el comando de instalación para Linux, ¿qué conviene hacer?</p>', opciones: ['Pegarlo sin leer, si lo vio mucha gente', 'Comprobar que lo copiaste del sitio oficial', 'Esperar a que alguien más lo pruebe en un chat', 'Cambiarle las letras para que sea más seguro'], correcta: 1,
        pista: '<p>Ese comando descarga un programa y lo ejecuta.</p>',
        solucion: '<p>Comprueba que viene del sitio oficial. Es la misma idea de "Instalar software libre con seguridad".</p>' },
      { tipo: 'opciones', enunciado: '<p>Quieres borrar un modelo que ya no usas. ¿Qué comando va con la documentación?</p>', opciones: ['ollama ls gemma4', 'ollama pull gemma4', 'ollama run gemma4', 'ollama rm gemma4'], correcta: 3,
        pista: '<p><code>rm</code> viene de remover.</p>',
        solucion: '<p>Con <code>ollama rm</code> se elimina un modelo.</p>' },
      { tipo: 'numero', enunciado: '<p>La API local de Ollama se sirve en <code>http://localhost:11434</code>. ¿Cuál es el número del puerto?</p>', respuesta: 11434,
        pista: '<p>Es el número que aparece después de los dos puntos al final de la dirección.</p>',
        solucion: '<p>El puerto es <strong>11434</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Con qué licencia se publica Ollama, según su repositorio en GitHub (octubre de 2026)?</p>', opciones: ['Apache 2.0', 'Es de uso secreto', 'MIT', 'No tiene licencia'], correcta: 2,
        pista: '<p>Son tres letras y aparecen al inicio del archivo de licencia.</p>',
        solucion: '<p>El archivo de licencia de su repositorio empieza con el nombre MIT.</p>' },
    ],
    fuentes: [F25, F28, F29, F30, F31],
  });

  // ------------------------------------------------------------------
  const PASOS_LM = diagrama([0, 48], [0, 9], [
    ...caja(4.5, 5, 8, 2.6, 'Descargar'),
    ...flecha([8.6, 5], [9.9, 5]),
    ...caja(14, 5, 8, 2.6, 'Buscar'),
    ...flecha([18.1, 5], [19.4, 5]),
    ...caja(23.5, 5, 8, 2.6, 'Bajar'),
    ...flecha([27.6, 5], [28.9, 5]),
    ...caja(33, 5, 8, 2.6, 'Cargar'),
    ...flecha([37.1, 5], [38.4, 5]),
    ...caja(42.5, 5, 8, 2.6, 'Chatear'),
    txt(4.5, 1.8, 'la app'), txt(14, 1.8, 'en Discover'), txt(23.5, 1.8, 'el modelo'), txt(33, 1.8, 'en memoria'), txt(42.5, 1.8, 'en Chat'),
], 'Diagrama de cinco pasos de izquierda a derecha: descargar la app, buscar un modelo en la pestaña Discover, bajar el modelo, cargarlo en la memoria y chatear en la pestaña Chat.');

  L('Instalar y usar LM Studio', {
    objetivo: 'Seguir los pasos para usar LM Studio, desde descargar la aplicación hasta conversar con un modelo, y entender qué significa cargar un modelo.',
    vidaReal: `
      <p>No todos prefieren escribir órdenes. A veces quieres un programa con ventanas y botones, como el que usas para ver fotos o abrir documentos. Una aplicación así te permite probar un modelo en tu propia computadora sin saber de comandos, y comparar cómo responde con distintas opciones. Además, entender sus pasos te ayuda a saber qué está pasando por dentro cuando algo tarda.</p>`,
    explicacion: `
      <p>Pide permiso a un adulto antes de instalar programas o descargar modelos.</p>
      <p>LM Studio es un programa con <strong>interfaz gráfica</strong>: se usa con ventanas, pestañas y botones, no con comandos. Esta lección resume lo que dice su documentación en octubre de 2026. Su interfaz puede cambiar, así que revisa la documentación vigente.</p>
      <h3>Dónde funciona</h3>
      <p>Según la documentación de requisitos, funciona en Mac con chips M1, M2, M3 o M4, en Windows (x64 y ARM) y en Linux (x64 y ARM64). Cuánta memoria necesitas ya lo viste en "Qué necesita tu equipo: memoria, procesador y tarjeta gráfica", así que aquí no se repite: revisa esos requisitos antes de descargar nada.</p>
      ${PASOS_LM}
      <h3>Buscar y descargar un modelo</h3>
      <p>Una vez instalada la app, la documentación explica que los modelos se buscan y se bajan en la pestaña Discover: puedes escoger entre opciones sugeridas o buscar con una palabra. Recuerda lo de "Cuantización: modelos más ligeros a cambio de un poco de calidad": cada versión pesa distinto, y conviene elegir una que quepa en tu equipo con margen.</p>
      <h3>Cargar el modelo y conversar</h3>
      <p>Tener el archivo descargado no es lo mismo que tenerlo listo. <strong>Cargar un modelo</strong>, según la documentación, es reservar un espacio en la memoria RAM de tu computadora para sus pesos y otros datos. Cuando termina, ya puedes conversar con el modelo en la pestaña Chat.</p>
      <p>Piensa en una receta: descargar el modelo es comprar los ingredientes, y cargarlo es ponerlos sobre la mesa para cocinar. Ocupan espacio en la mesa mientras trabajas, por eso el modelo debe caber en tu memoria.</p>
      <h3>Repartir el trabajo entre la gráfica y el procesador</h3>
      <p>En la documentación de su herramienta de línea de comandos, <code>lms</code>, hay un ajuste para decidir cuánto del modelo pasa a la tarjeta gráfica: un valor de 0.5 manda la mitad de las capas, y <code>max</code> las manda todas. Las capas son los niveles de la red neuronal por los que pasa el texto. La documentación citada es la de la línea de comandos; suponer que la app tiene un ajuste parecido es una simplificación de la lección. Cuando el modelo no cabe entero en la memoria de la gráfica, repartirlo es una forma de poder usarlo, aunque las respuestas pueden ir más lentas.</p>
      <h3>Otros datos de su documentación</h3>
      <p>La app puede funcionar como un servidor local, en tu propio equipo o en tu red. Para saber si funciona sin conexión, mira la primera lección de esta unidad. Sobre su uso, los términos de la app permiten usarla para fines personales o internos de una empresa; revisa los términos vigentes antes de usarla para otra cosa.</p>
      <p class="nota"><strong>Trampa común:</strong> descargar un modelo grande sin comprobar la memoria. Lo bajas, pero al cargarlo no cabe.</p>`,
    ejemplo: `
      <p>Un equipo de ejemplo tiene 16 GB de RAM. Quieres usar un modelo de 8 mil millones de parámetros. ¿Qué versión descargas y en qué orden haces los pasos?</p>
      <ol class="pasos-ej">
        <li>Descargas la app desde su sitio oficial e instalas, con permiso de un adulto.</li>
        <li>Abres la pestaña Discover y buscas el modelo.</li>
        <li>Calculas con la fórmula de "Tamaño de un modelo: parámetros y cuánta memoria ocupa". A 16 bits, 8 mil millones × 2 bytes son 16 GB: llenaría toda la memoria. A 4 bits, 8 mil millones × 0.5 bytes son 4 GB, y sí deja margen.</li>
        <li>Descargas la versión de 4 bits.</li>
        <li>La cargas, y cuando termina conversas en la pestaña Chat.</li>
      </ol>
      <p>Resultado: <span class="resultado">la versión de 4 bits (unos 4 GB); descargar, buscar, bajar, cargar y chatear</span>.</p>
      <p>Para comprobarlo, 4 GB es la cuarta parte de los 16 GB del equipo, así que queda margen. Todas las cifras son de ejemplo.</p>
      <p class="nota"><strong>Error común:</strong> dejar el chat para antes de cargar. Sin cargar el modelo, no hay con quién conversar.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según la documentación, ¿dónde se buscan y descargan modelos en la app?</p>', opciones: ['En la pestaña Chat', 'En el sitio de tu banco', 'No se pueden descargar desde la app', 'En la pestaña Discover'], correcta: 3,
        pista: '<p>La palabra significa "descubrir".</p>',
        solucion: '<p>La pestaña Discover sirve para buscar y descargar modelos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué quiere decir cargar un modelo?</p>', opciones: ['Borrarlo del disco', 'Reservar memoria en la RAM para sus pesos', 'Cambiar su licencia', 'Cobrar por usarlo'], correcta: 1,
        pista: '<p>Piensa en poner los ingredientes sobre la mesa.</p>',
        solucion: '<p>Cargar es reservar memoria para los pesos y otros datos, y después ya se puede chatear.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es el orden correcto de los pasos?</p>', opciones: ['Cargar, descargar la app, chatear, buscar', 'Chatear, cargar, buscar, descargar la app', 'Descargar la app, buscar el modelo, bajarlo, cargarlo y chatear', 'Buscar, chatear, descargar la app, cargar'], correcta: 2,
        pista: '<p>Para chatear, el modelo debe estar cargado, y para cargarlo debe estar descargado.</p>',
        solucion: '<p>Primero la app, luego buscar y bajar el modelo, después cargarlo, y al final chatear.</p>' },
      { tipo: 'numero', enunciado: '<p>Un modelo de ejemplo tiene 8 mil millones de parámetros y se descarga a 4 bits (0.5 bytes por parámetro). ¿Cuántos GB ocupa más o menos?</p>', respuesta: 8 * 0.5,
        pista: '<p>Multiplica los miles de millones de parámetros por los bytes de cada uno.</p>',
        solucion: '<p>8 × 0.5 = <strong>4</strong> GB.</p>' },
      { tipo: 'opciones', enunciado: '<p>Si el valor del ajuste de la gráfica es 0.5, ¿qué pasa con las capas del modelo, según la documentación de la herramienta de línea de comandos?</p>', opciones: ['Se manda la mitad de las capas a la tarjeta gráfica', 'Se borra la mitad', 'Se manda todo a la tarjeta gráfica', 'Se apaga la tarjeta gráfica'], correcta: 0,
        pista: '<p>0.5 es una mitad.</p>',
        solucion: '<p>Un valor de 0.5 manda la mitad de las capas a la tarjeta gráfica.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según los términos de la app (octubre de 2026), ¿para qué permiten usar el programa?</p>', opciones: ['Solo para vender copias', 'Para fines personales o internos de una empresa', 'Solo para uso militar', 'No permiten ningún uso'], correcta: 1,
        pista: '<p>La licencia habla de dos tipos de uso.</p>',
        solucion: '<p>Los términos permiten usar el programa para fines personales o internos de una empresa. Revisa los términos vigentes.</p>' },
    ],
    fuentes: [F32, F33, F34, F35, F36],
  });

  // ------------------------------------------------------------------
  L('Correr un modelo en el celular', {
    objetivo: 'Explicar qué significa correr un modelo en el dispositivo y calcular si un modelo de ejemplo cabe en la memoria de un celular.',
    vidaReal: `
      <p>Tu celular va contigo a todas partes, incluso donde no hay señal: un camino, un viaje en autobús o una zona rural. Si pudiera ayudarte con un texto o una pregunta sin depender de internet, tendrías una herramienta más. También sirve para entender por qué los teléfonos usan modelos más pequeños que una computadora: no es capricho, es una cuestión de espacio.</p>`,
    explicacion: `
      <p>Pide permiso a un adulto antes de instalar programas o descargar modelos.</p>
      <p>Correr un modelo <strong>en el dispositivo</strong> (<span lang="en">on-device</span>) quiere decir que se ejecuta dentro de tu propio celular o tableta, no en un servidor lejano. Ya viste la idea con las computadoras en "Qué es un LLM local y por qué usarlo"; aquí vemos qué cambia con un teléfono.</p>
      <h3>Una app oficial de ejemplo</h3>
      <p>En octubre de 2026, el repositorio oficial de Google AI Edge Gallery dice que los modelos se ejecutan en el hardware del dispositivo (sus piezas físicas) y que no se necesita internet. Es una app de ejemplo, que usamos con esa fecha y sin juzgar su calidad; existen otras. Según el mismo repositorio, pide Android 12 o superior, o iOS 17 o superior. Revisa la información vigente, porque esos requisitos cambian.</p>
      <h3>Un modelo ligero</h3>
      <p>Un <strong>modelo ligero</strong> es uno pequeño, pensado para caber en poca memoria. Según Google, la documentación oficial de Gemma 3n lo describe como un modelo optimizado para dispositivos cotidianos como teléfonos, laptops y tablets (consultada en octubre de 2026). Lo usamos solo como ejemplo.</p>
      ${tabla(["Dato de ejemplo","Celular","Computadora"], [["Memoria RAM","8 GB","16 GB"],["Memoria libre para el modelo","unos 4 GB","unos 12 GB"],["Tamaño de modelo que cabe con margen","menos de 2 GB","menos de 6 GB"]])}
      <p>Las cifras de la tabla son de ejemplo. El margen sale de la recomendación de la lección en "Elegir un modelo según tu equipo y tu tarea": que el modelo ocupe menos de la mitad de la memoria disponible.</p>
      <h3>Por qué caben menos modelos</h3>
      <p>La razón es la misma de siempre: la memoria. Como simplificación, un celular suele tener menos que una computadora, y el sistema y las otras apps también la usan. Por eso caben menos parámetros o menos bits en cada modelo que corre en el teléfono. Es la misma cuenta de memoria que hiciste con las computadoras, solo que con mucha menos memoria libre. Como depende de cada teléfono, antes de descargar nada revisa cuánta memoria tiene el tuyo y calcula con la fórmula del tamaño de un modelo. Si el modelo es demasiado grande, elige una versión con menos bits o un modelo más pequeño, como viste en "Cuantización: modelos más ligeros a cambio de un poco de calidad".</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que sin internet el modelo no necesita nada. Sí necesita memoria y, antes, descargar su archivo.</p>`,
    ejemplo: `
      <p>Un celular de ejemplo tiene 8 GB de RAM, y la mitad está libre. Usa la fórmula y la cuantización a 4 bits. ¿Cabe con margen un modelo de 3 mil millones de parámetros? ¿Y uno de 8 mil millones?</p>
      <ol class="pasos-ej">
        <li>Memoria libre: 8 ÷ 2 = 4 GB. Con la regla de margen, el modelo debe ocupar menos de la mitad: 4 ÷ 2 = 2 GB.</li>
        <li>A 4 bits, cada parámetro ocupa 0.5 bytes (como en "Cuantización: modelos más ligeros a cambio de un poco de calidad").</li>
        <li>Con 3 mil millones: 3 × 0.5 = 1.5 GB. Es menos de 2 GB, así que cabe con margen.</li>
        <li>Con 8 mil millones: 8 × 0.5 = 4 GB. Es justo toda la memoria libre, sin margen: no conviene.</li>
      </ol>
      <p>Resultado: <span class="resultado">el de 3 mil millones sí cabe (1.5 GB) y el de 8 mil millones no (4 GB)</span>.</p>
      <p>Para comprobarlo, 8 es más del doble que 3, así que su tamaño también lo es. Todas las cifras son de ejemplo.</p>
      <p class="nota"><strong>Error común:</strong> usar la RAM total (8 GB) y no la libre.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué quiere decir correr un modelo "en el dispositivo"?</p>', opciones: ['Que se ejecuta en un servidor lejano', 'Que se ejecuta en tu propio celular o tableta', 'Que solo funciona con internet', 'Que no usa memoria'], correcta: 1,
        pista: '<p>Es la idea de modelo local, aplicada al celular.</p>',
        solucion: '<p>En el dispositivo significa que el modelo corre dentro de tu propio equipo, y no en un servidor.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según el repositorio de la app de ejemplo (octubre de 2026), ¿qué pasa con los modelos que usa?</p>', opciones: ['Se ejecutan en el hardware del dispositivo y no se necesita internet', 'Siempre se ejecutan en servidores', 'Solo funcionan en computadoras', 'Necesitan una cuenta bancaria'], correcta: 0,
        pista: '<p>La app de ejemplo está hecha para esto.</p>',
        solucion: '<p>El repositorio dice que los modelos se ejecutan en el hardware del dispositivo y que no se requiere internet.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué versiones mínimas del sistema pide la app de ejemplo, a octubre de 2026?</p>', opciones: ['Android 5 o iOS 8', 'Cualquier versión', 'Android 12 o superior, o iOS 17 o superior', 'Solo Windows 11'], correcta: 2,
        pista: '<p>Son versiones recientes de dos sistemas de teléfonos.</p>',
        solucion: '<p>El repositorio indica Android 12 o superior, o iOS 17 o superior. Revisa la información vigente.</p>' },
      { tipo: 'numero', enunciado: '<p>Un celular de ejemplo tiene 8 GB de RAM y la mitad está libre. ¿Cuántos GB están libres?</p>', respuesta: 8 / 2,
        pista: '<p>Divide entre 2.</p>',
        solucion: '<p>8 ÷ 2 = <strong>4</strong> GB.</p>' },
      { tipo: 'numero', enunciado: '<p>Un modelo de ejemplo de 3 mil millones de parámetros se cuantiza a 4 bits (0.5 bytes por parámetro). ¿Cuántos GB ocupa?</p>', respuesta: 3 * 0.5,
        pista: '<p>Parámetros en miles de millones por bytes de cada uno.</p>',
        solucion: '<p>3 × 0.5 = <strong>1.5</strong> GB.</p>' },
      { tipo: 'opciones', enunciado: '<p>Con 4 GB libres y la regla de ocupar menos de la mitad, ¿cabe con margen un modelo de ejemplo de 4 GB?</p>', opciones: ['Sí, porque 4 es igual a 4', 'Sí, porque los celulares tienen mucha memoria', 'No, porque ocuparía toda la memoria libre', 'Depende del color del celular'], correcta: 2,
        pista: '<p>El tope con margen es la mitad de la memoria libre.</p>',
        solucion: '<p>El tope es 4 ÷ 2 = 2 GB. Un modelo de 4 GB lo supera y no deja margen.</p>' },
    ],
    fuentes: [F40, F41],
  });

  // ------------------------------------------------------------------
  const LISTA_SEGURA = diagrama([0, 48], [0, 9], [
    ...caja(4.5, 5, 8, 2.6, 'Fuente'),
    ...flecha([8.6, 5], [9.9, 5]),
    ...caja(14, 5, 8, 2.6, 'Formato'),
    ...flecha([18.1, 5], [19.4, 5]),
    ...caja(23.5, 5, 8, 2.6, 'Suma'),
    ...flecha([27.6, 5], [28.9, 5]),
    ...caja(33, 5, 8, 2.6, 'Licencia'),
    ...flecha([37.1, 5], [38.4, 5]),
    ...caja(42.5, 5, 8, 2.6, 'Usar'),
    txt(4.5, 1.8, 'del creador'), txt(14, 1.8, 'seguro'), txt(23.5, 1.8, 'coincide'), txt(33, 1.8, 'lo permite'),
], 'Lista de verificación en cuatro pasos, de izquierda a derecha: la cuenta es la oficial del creador, el formato es seguro, la suma de verificación coincide y la licencia permite tu uso. Si todo se cumple, usas el modelo.');

  L('Descargar modelos de forma segura: fuentes y licencias', {
    objetivo: 'Aplicar una lista de verificación antes de usar un modelo descargado: cuenta oficial, formato, suma de verificación y licencia.',
    vidaReal: `
      <p>Piensa en comprar comida: miras de dónde viene, la fecha y los ingredientes antes de comerla. Con los archivos de internet conviene hacer lo mismo. Los modelos son archivos grandes que se pueden subir y copiar, así que conviene comprobar que sean lo que dicen ser. Unas pocas revisiones, que se hacen en un minuto, te ayudan a evitar sorpresas y a respetar lo que el creador permite.</p>`,
    explicacion: `
      <p>Un modelo se descarga como cualquier archivo, y eso trae las mismas precauciones que al bajar cualquier programa. Esta lección te da una lista corta para revisar. Pide ayuda a un adulto si tienes dudas.</p>
      <h3>1. La fuente oficial</h3>
      <p>Una <strong>fuente oficial</strong> es la cuenta de quien creó el modelo, no una copia de otra persona. Por precaución (es una recomendación de la lección, no una cita), comprueba que el archivo venga de quien dice venir. Por ejemplo, para descargar Laya, de la que hablaste en "Modelos de decisión: IA que elige en lugar de escribir", busca el nombre exacto de la cuenta de su creador, que aparece en su página oficial.</p>
      <h3>2. El formato del archivo</h3>
      <p>Según la documentación de Hugging Face, cargar un archivo en formato pickle puede permitir ataques que ejecutan código arbitrario. Es decir, un archivo en ese formato podría hacer cosas en tu equipo al abrirlo. En cambio, la documentación de safetensors lo presenta como un formato simple para guardar tensores de forma segura, en contraste con pickle. Como simplificación de la lección, piensa en un tensor como una tabla de números, como los pesos de un modelo. La palabra "segura" aquí es la que usa su documentación; no la tomes como garantía absoluta, y sigue con las otras revisiones.</p>
      <p>Hugging Face además pasa por un escáner de malware cada archivo de los repositorios menor de 2 GB. Por ejemplo, la versión de 16 bits del modelo de 8 mil millones de parámetros que viste en "Cuantización: modelos más ligeros a cambio de un poco de calidad" pesa 16 GB, mucho más que 2 GB. Así que ese escáner no revisa los archivos más grandes.</p>
      <h3>3. La suma de verificación</h3>
      <p>La <strong>suma de verificación</strong> (<span lang="en">hash</span>) es un valor calculado a partir de todo el archivo. Según Wikipedia, una suma de verificación sirve para detectar cambios accidentales en una secuencia de datos y proteger su integridad. Si descargas un archivo y su suma no coincide con la que publica la fuente oficial, algo cambió: se dañó o lo modificaron. Es una recomendación de la lección, no de la fuente: si la suma y el archivo vienen del mismo lugar dudoso, comparar no basta; por eso va después de revisar la fuente.</p>
      ${LISTA_SEGURA}
      <h3>4. La licencia</h3>
      <p>La licencia, según Hugging Face, indica a los demás qué permisos se otorgan sobre el código o los datos, y hay que respetarla. Ya viste en "Modelos abiertos: qué significa que se puedan descargar" que cada modelo trae la suya y que unas tienen restricciones. Lee la ficha y la licencia antes de usar el modelo para algo, sobre todo si es un trabajo para otras personas.</p>
      <p>Para más sobre descargar de forma segura cualquier programa, mira "Instalar software libre con seguridad".</p>
      <p class="nota"><strong>Trampa común:</strong> confiar en un archivo solo porque tiene el nombre correcto o muchas descargas.</p>`,
    ejemplo: `
      <p>Cuatro descargas de ejemplo. Aplica la lista y decide cuáles usarías.</p>
      <ol class="pasos-ej">
        <li>Cuenta oficial del creador, formato safetensors, suma coincide, licencia permite tu uso: se usa.</li>
        <li>Cuenta de un desconocido que copió el modelo, con el mismo nombre: no se usa, porque falla el primer paso.</li>
        <li>Cuenta oficial, pero la suma no coincide: no se usa hasta volver a descargarlo y que coincida.</li>
        <li>Todo bien, pero la licencia no permite el uso que quieres: no se usa para ese fin.</li>
      </ol>
      <p>Resultado: <span class="resultado">se usa 1 de las 4 descargas</span>.</p>
      <p>Para comprobarlo, la lista funciona como una cadena: basta que un paso falle para detenerte. Los casos son de ejemplo.</p>
      <p class="nota"><strong>Error común:</strong> revisar solo el nombre del archivo y saltarse los otros pasos.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según Hugging Face, ¿qué puede pasar al cargar un archivo en formato pickle?</p>', opciones: ['Puede permitir ataques que ejecutan código arbitrario', 'Siempre se vuelve más rápido', 'Se borra la licencia', 'Se cambia el nombre del modelo'], correcta: 0,
        pista: '<p>Es la razón de revisar el formato.</p>',
        solucion: '<p>La documentación dice que cargar un pickle puede permitir ataques que ejecutan código arbitrario.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cómo describe su documentación a safetensors?</p>', opciones: ['Como un formato para guardar tensores de forma segura, en contraste con pickle', 'Como un formato que todos deben evitar', 'Como un tipo de licencia', 'Como un escáner de malware'], correcta: 0,
        pista: '<p>Se presenta como la alternativa a pickle.</p>',
        solucion: '<p>Dice que es un formato simple para guardar tensores de forma segura, como opuesto a pickle.</p>' },
      { tipo: 'numero', enunciado: '<p>Hugging Face pasa por un escáner de malware cada archivo menor de cierto tamaño. ¿Cuántos GB es el límite?</p>', respuesta: 2,
        pista: '<p>Está en la documentación, y la lección lo menciona.</p>',
        solucion: '<p>El límite es de <strong>2</strong> GB; los archivos más grandes no pasan por ese escáner.</p>' },
      { tipo: 'opciones', enunciado: '<p>Descargaste un modelo y su suma de verificación no coincide con la oficial. ¿Qué conviene hacer?</p>', opciones: ['Usarlo igual', 'No usarlo y volver a descargarlo de la fuente oficial', 'Cambiarle el nombre', 'Compartirlo con tus amigos'], correcta: 1,
        pista: '<p>La suma sirve para detectar que el archivo cambió.</p>',
        solucion: '<p>Si no coincide, algo cambió: se dañó o lo modificaron. Descárgalo otra vez de la fuente oficial.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Hugging Face, ¿qué indica la licencia de un repositorio?</p>', opciones: ['La velocidad del modelo', 'Qué permisos se otorgan sobre el código o los datos', 'Cuánta memoria necesita', 'El nombre de quien lo descarga'], correcta: 1,
        pista: '<p>Piensa en lo que puedes y no puedes hacer.</p>',
        solucion: '<p>Indica los permisos que se otorgan, y hay que respetarla.</p>' },
      { tipo: 'opciones', enunciado: '<p>Hay una copia de un modelo famoso subida por una cuenta que no conoces. ¿Qué haces primero?</p>', opciones: ['Descargarla y probarla', 'Buscar la cuenta oficial del creador y descargar de ahí', 'Pedir a un amigo que la pruebe', 'Cambiar de formato el archivo'], correcta: 1,
        pista: '<p>Es el primer paso de la lista.</p>',
        solucion: '<p>Primero la fuente: busca la cuenta oficial del creador y descarga de ahí.</p>' },
    ],
    fuentes: [F42, F43, F44, F45, F46],
  });

  // ------------------------------------------------------------------
  const TIEMPO = barras({ etiquetas: ['5 t/s', '20 t/s', '60 t/s'], valores: [60, 15, 5], max: 60, paso: 15,
    descripcion: 'Gráfica de barras con los segundos que tarda un modelo de ejemplo en escribir 300 tokens. A 5 tokens por segundo tarda 60 segundos, a 20 tokens por segundo tarda 15 segundos y a 60 tokens por segundo tarda 5 segundos.' });

  L('Velocidad y calidad: qué esperar de un modelo local', {
    objetivo: 'Calcular cuánto tarda un modelo en responder según sus tokens por segundo y explicar qué influye en la velocidad y la calidad.',
    vidaReal: `
      <p>Al usar un asistente quieres saber si va a responder en un instante o si tendrás que esperar un buen rato. Esa espera depende de tu equipo y del modelo, no solo de la suerte. Entender de qué depende te ayuda a decidir si vale la pena otro modelo, otro tamaño o una versión más ligera, y a no culpar al programa cuando el motivo es la memoria.</p>`,
    explicacion: `
      <p>Un modelo escribe su respuesta pedacito por pedacito, y esos pedacitos son tokens, como viste en «Tokens: cómo "lee" un LLM». Medir su velocidad es contar cuántos escribe cada segundo.</p>
      <h3>Cómo se mide la velocidad</h3>
      <p>La velocidad se expresa en tokens por segundo (abreviado t/s en la gráfica). La documentación de Hugging Face da un ejemplo: un sistema que genera 100 tokens por segundo tarda 10 segundos en producir 1000. Es un ejemplo de su documentación, no una regla general. Para sacar el tiempo, divide los tokens entre la velocidad: tiempo = tokens ÷ tokens por segundo.</p>
      ${TIEMPO}
      <p>La gráfica es de ejemplo: 300 tokens a distintas velocidades. A más tokens por segundo, menos esperas.</p>
      <h3>De qué depende</h3>
      <p>Según la documentación de Transformers, al generar texto el <strong>ancho de banda de memoria</strong> que se necesita para recargar datos puede ser un cuello de botella serio de tiempo. El ancho de banda es qué tan rápido pasan los datos entre la memoria y el procesador, y un cuello de botella es la parte que frena a todo lo demás. Dicho con una comparación: un cocinero muy rápido igual espera si los ingredientes llegan despacio a la mesa. Por eso la memoria cuenta tanto, no solo el procesador.</p>
      <p>IBM explica que las tarjetas gráficas pueden dar más velocidad y eficiencia que los procesadores en aprendizaje automático intensivo. IBM habla de aprendizaje automático en general, no de modelos locales; aplicado a ellos, es una simplificación de la lección. Y si el modelo no cabe en la memoria de la gráfica y se reparte con el resto, ya sabes por "Elegir un modelo según tu equipo y tu tarea" que las respuestas pueden ir más lentas.</p>
      <p>Otro dato: antes de responder, el modelo tiene que cargarse. La documentación de una herramienta para correr modelos locales muestra que sus respuestas pueden incluir cuánto tardó el modelo en cargarse. Como simplificación, es de esperar que la primera respuesta tarde más que las siguientes.</p>
      <h3>Y la calidad</h3>
      <p>En 2020, Kaplan y otros investigadores encontraron que el error de un modelo de lenguaje baja, siguiendo una ley de potencia, cuando aumentan el tamaño del modelo, los datos y el cómputo (una relación matemática que no necesitas calcular). Dicho más simple: en esas pruebas, los modelos más grandes cometen menos errores, aunque ocupan más lugar en la memoria.</p>
      <p>Para comparar modelos hay <strong>pruebas de referencia</strong> (<span lang="en">benchmarks</span>). Hugging Face tiene tablas de clasificación y evaluaciones con resultados de esos conjuntos de datos. Sirven como orientación, pero no te dicen cuál conviene a ti. Es una recomendación de la lección: prueba con tus propios textos y mira si te sirve.</p>
      <p class="nota"><strong>Trampa común:</strong> buscar el "mejor modelo" por un número. Un modelo muy bueno en una tabla puede ser lento en tu equipo o no servir para lo tuyo.</p>`,
    ejemplo: `
      <p>Un modelo de ejemplo debe escribir una respuesta de 300 tokens. ¿Cuánto tarda a 20 tokens por segundo? ¿Y a 5?</p>
      <ol class="pasos-ej">
        <li>Usa tiempo = tokens ÷ tokens por segundo.</li>
        <li>A 20 tokens por segundo: 300 ÷ 20 = 15 segundos.</li>
        <li>A 5 tokens por segundo: 300 ÷ 5 = 60 segundos.</li>
        <li>Compara: 60 ÷ 15 = 4. La velocidad de 20 es 4 veces la de 5, y por eso tarda 4 veces menos.</li>
      </ol>
      <p>Resultado: <span class="resultado">15 segundos a 20 tokens por segundo y 60 segundos a 5</span>.</p>
      <p>Para comprobarlo, multiplica al revés: 15 × 20 = 300 y 60 × 5 = 300. Si el modelo no cupiera en la memoria de la gráfica, podría bajar a velocidades como la segunda. Las cifras son de ejemplo.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar tokens por velocidad para sacar el tiempo. Se divide.</p>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un modelo de ejemplo escribe a 20 tokens por segundo. ¿Cuántos segundos tarda en escribir 300 tokens?</p>', respuesta: 300 / 20,
        pista: '<p>Divide los tokens entre la velocidad.</p>',
        solucion: '<p>300 ÷ 20 = <strong>15</strong> segundos.</p>' },
      { tipo: 'numero', enunciado: '<p>Otro modelo de ejemplo escribe a 5 tokens por segundo. ¿Cuántos segundos tarda en escribir 300 tokens?</p>', respuesta: 300 / 5,
        pista: '<p>Usa la misma cuenta.</p>',
        solucion: '<p>300 ÷ 5 = <strong>60</strong> segundos.</p>' },
      { tipo: 'numero', enunciado: '<p>En el ejemplo de Hugging Face, un sistema genera 100 tokens por segundo. ¿Cuántos segundos tarda en generar 1000 tokens?</p>', respuesta: 1000 / 100,
        pista: '<p>Divide 1000 entre 100.</p>',
        solucion: '<p>1000 ÷ 100 = <strong>10</strong> segundos.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la documentación de Transformers, ¿qué puede ser un cuello de botella al generar texto?</p>', opciones: ['El color de la pantalla', 'El ancho de banda de memoria', 'El nombre del modelo', 'La hora del día'], correcta: 1,
        pista: '<p>Tiene que ver con qué tan rápido se mueven los datos.</p>',
        solucion: '<p>El ancho de banda de memoria para recargar datos puede ser un cuello de botella serio de tiempo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Kaplan y otros (2020), ¿qué pasa con el error de un modelo de lenguaje al aumentar su tamaño?</p>', opciones: ['Sube siempre', 'No cambia nunca', 'Baja siguiendo una ley de potencia', 'Desaparece por completo'], correcta: 2,
        pista: '<p>En esa investigación, más tamaño ayudaba.</p>',
        solucion: '<p>La pérdida baja siguiendo una ley de potencia al aumentar el tamaño, los datos y el cómputo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una tabla de clasificación pone a un modelo en primer lugar. ¿Qué conviene hacer?</p>', opciones: ['Usarlo sin probarlo, porque es el mejor', 'Probarlo con tu propia tarea y ver si te sirve', 'Descargar todos los modelos de la tabla', 'Ignorar para siempre las tablas'], correcta: 1,
        pista: '<p>Tu tarea es la mejor prueba.</p>',
        solucion: '<p>Las tablas orientan, pero lo que importa es cómo responde con tus textos.</p>' },
    ],
    fuentes: [F47, F48, F49, F50, F51, F52],
  });

  // ------------------------------------------------------------------
  const FLUJO_RAG = diagrama([0, 30], [0, 10], [
    ...caja(5, 7.5, 8.4, 2.4, 'Documentos'), ...flecha([9.4, 7.5], [10.6, 7.5]),
    ...caja(15, 7.5, 8.4, 2.4, 'Fragmentos'), ...flecha([19.4, 7.5], [20.6, 7.5]),
    ...caja(25, 7.5, 8.4, 2.4, 'Números'), ...flecha([25, 6.1], [25, 3.9]),
    ...caja(25, 2.5, 8.4, 2.4, 'Parecidos'), ...flecha([20.6, 2.5], [19.4, 2.5]),
    ...caja(15, 2.5, 8.4, 2.4, 'Instrucción'), ...flecha([10.6, 2.5], [9.4, 2.5]),
    ...caja(5, 2.5, 8.4, 2.4, 'Respuesta'),
    txt(15, 9.4, 'se cortan'), txt(25, 9.4, 'embeddings'),
  ], 'Diagrama de flujo en dos filas. Arriba, de izquierda a derecha: los documentos se cortan en fragmentos, los fragmentos se convierten en números. Abajo, de derecha a izquierda: se buscan los números más parecidos a la pregunta, los fragmentos encontrados se agregan a la instrucción y de ahí sale la respuesta.');

  L('Usar un modelo local con tus propios documentos', {
    objetivo: 'Explicar cómo un modelo puede responder usando tus documentos mediante RAG, y calcular cuántos fragmentos caben en la ventana de contexto.',
    vidaReal: `
      <p>Tienes los apuntes de todo el año, un manual largo o los documentos de una actividad, y quieres preguntarles cosas en vez de leerlos de principio a fin. Un modelo no conoce tus archivos, así que hay un método para dárselos. Entenderlo te ayuda a saber qué hace una aplicación cuando le "subes" un documento y a decidir qué tan seguro es hacerlo.</p>`,
    explicacion: `
      <p>Un modelo de lenguaje no conoce tus apuntes, y no puedes pegarlos todos en la conversación: ya viste en "Contexto y memoria" que la ventana de contexto tiene un límite. La solución más usada se llama RAG.</p>
      <h3>Qué es RAG</h3>
      <p>La <strong>generación aumentada por recuperación</strong> (<span lang="en">retrieval augmented generation</span>, RAG) es, según IBM, una arquitectura que mejora un modelo de IA conectándolo con bases de conocimiento externas. La base de conocimiento, en este caso, son tus documentos. Piensa en un examen a libro abierto: el modelo no se sabe tus apuntes, pero puede consultar la página que hace falta. Así, en vez de aprenderse todo, solo lee los fragmentos que necesita para tu pregunta.</p>
      ${FLUJO_RAG}
      <h3>Los pasos, uno por uno</h3>
      <p>Primero, el documento se divide en <strong>fragmentos</strong>, pedazos más pequeños. IBM explica que cortarlo ayuda a que los embeddings no desborden la ventana de contexto del modelo.</p>
      <p>Segundo, cada fragmento se convierte en una representación numérica, un <span lang="en">embedding</span>: según IBM, es una lista de números que sigue expresando el significado original del dato. Textos con significado parecido quedan con números parecidos.</p>
      <p>Tercero, imagina un mapa donde cada fragmento es un punto y los de temas parecidos quedan cerca. Es una simplificación de la lección. Cuando haces una pregunta, esta también se convierte en números, y se buscan los fragmentos más parecidos: la idea es buscar por significado, no por palabras exactas. Si preguntas por los planetas, también puede encontrar un fragmento que hable del Sistema Solar, aunque no use esa palabra.</p>
      <p>Cuarto, según IBM, el sistema arma una instrucción aumentada con el contexto recuperado: tu pregunta más los fragmentos encontrados. El modelo responde con eso a la vista. Para escribir buenas instrucciones, mira "Escribir instrucciones claras". Fíjate en que la pregunta y la respuesta también ocupan lugar en la ventana de contexto, junto con los fragmentos.</p>
      <h3>Y tus documentos, ¿salen del equipo?</h3>
      <p>Depende de la herramienta. La documentación de una herramienta para correr modelos locales dice que, al chatear con un documento o usar RAG, el documento se queda en tu máquina y se procesa localmente. Si usas otra herramienta, revisa lo que diga la suya. Para saber qué información conviene no compartir, mira "Privacidad: qué no compartir".</p>
      <h3>RAG no vuelve perfecto al modelo</h3>
      <p>IBM dice que RAG puede reducir el riesgo de alucinaciones, pero no hace al modelo infalible. Por eso sigue valiendo "Verificar lo que te responde": compara la respuesta con el documento original.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que, por usar tus documentos, el modelo ya no se equivoca.</p>`,
    ejemplo: `
      <p>Un documento de ejemplo tiene 12 000 tokens y se corta en fragmentos de 500 tokens. ¿Cuántos fragmentos salen? Si se agregan los 3 más parecidos a la instrucción, ¿cuántos tokens entran y caben en una ventana de 4 000 tokens?</p>
      <ol class="pasos-ej">
        <li>Fragmentos: 12 000 ÷ 500 = 24.</li>
        <li>Tokens de los 3 fragmentos más parecidos: 3 × 500 = 1 500.</li>
        <li>Compara con la ventana: 1 500 es menos que 4 000, así que caben.</li>
        <li>Queda lugar para lo demás: 4 000 − 1 500 = 2 500 tokens para tu pregunta y la respuesta.</li>
      </ol>
      <p>Resultado: <span class="resultado">24 fragmentos; entran 1 500 tokens y caben con 2 500 de sobra</span>.</p>
      <p>Para comprobarlo, 24 × 500 = 12 000. Sin RAG, los 12 000 tokens no cabrían en la ventana de 4 000. Las cifras son de ejemplo.</p>
      <p class="nota"><strong>Error común:</strong> olvidar que la pregunta y la respuesta también ocupan lugar en la ventana.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según IBM, ¿qué es RAG?</p>', opciones: ['Un tipo de licencia', 'Una arquitectura que conecta un modelo con bases de conocimiento externas', 'Una marca de tarjetas gráficas', 'Un formato de archivo'], correcta: 1,
        pista: '<p>Piensa en el examen a libro abierto.</p>',
        solucion: '<p>IBM la describe como una arquitectura que mejora un modelo conectándolo con bases de conocimiento externas.</p>' },
      { tipo: 'numero', enunciado: '<p>Un documento de ejemplo tiene 12 000 tokens y se corta en fragmentos de 500 tokens. ¿Cuántos fragmentos salen?</p>', respuesta: 12000 / 500,
        pista: '<p>Divide el total entre el tamaño de cada fragmento.</p>',
        solucion: '<p>12 000 ÷ 500 = <strong>24</strong> fragmentos.</p>' },
      { tipo: 'numero', enunciado: '<p>Se agregan a la instrucción los 3 fragmentos más parecidos, de 500 tokens cada uno. ¿Cuántos tokens entran?</p>', respuesta: 3 * 500,
        pista: '<p>Multiplica el número de fragmentos por su tamaño.</p>',
        solucion: '<p>3 × 500 = <strong>1500</strong> tokens.</p>' },
      { tipo: 'opciones', enunciado: '<p>La ventana de contexto es de 4 000 tokens y los fragmentos ocupan 1 500. ¿Cuánto lugar queda para la pregunta y la respuesta?</p>', opciones: ['5 500 tokens', '1 500 tokens', '2 500 tokens', '4 000 tokens'], correcta: 2,
        pista: '<p>Resta lo que ocupan los fragmentos.</p>',
        solucion: '<p>4 000 − 1 500 = 2 500 tokens.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según IBM, ¿qué es un embedding?</p>', opciones: ['Una lista de números que conserva el significado original del dato', 'Una contraseña del modelo', 'Un tipo de memoria RAM', 'Una licencia de uso'], correcta: 0,
        pista: '<p>Convierte texto en números.</p>',
        solucion: '<p>Es una forma de convertir un dato en una lista de números que sigue expresando su significado.</p>' },
      { tipo: 'opciones', enunciado: '<p>Usas RAG con tus apuntes y el modelo te da una respuesta. ¿Qué conviene hacer según la lección?</p>', opciones: ['Aceptarla, porque RAG elimina los errores', 'Compararla con el documento original, porque RAG reduce las alucinaciones pero no las elimina', 'Borrar el documento', 'Subir el documento a internet'], correcta: 1,
        pista: '<p>IBM dice que no lo hace infalible.</p>',
        solucion: '<p>RAG puede reducir las alucinaciones, pero no las elimina. Conviene verificar con el documento.</p>' },
    ],
    fuentes: [F53, F54, F55],
  });
})();
