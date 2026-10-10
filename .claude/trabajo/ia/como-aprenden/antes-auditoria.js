// Inteligencia artificial · Unidad 2: Cómo aprenden las máquinas.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Sin marcas ni "mejor modelo". Las cifras de los ejemplos son de ejemplo; los datos salen de la ficha (F1 a F10).
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

  const WIKI = (articulo, nombre) => ({ nombre: `${nombre} - Wikipedia en español`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const F1 = { nombre: 'IBM, What is Training Data? (en inglés)', url: 'https://www.ibm.com/topics/training-data' };
  const F2 = { nombre: 'IBM, What is Machine Learning? (en inglés)', url: 'https://www.ibm.com/think/topics/machine-learning' };
  const F3 = { nombre: 'IBM, What is reinforcement learning? (en inglés)', url: 'https://www.ibm.com/think/topics/reinforcement-learning' };
  const F4 = { nombre: 'IBM, What is Overfitting? (en inglés)', url: 'https://www.ibm.com/think/topics/overfitting' };
  const F5 = { nombre: 'Google for Developers, Machine Learning: Supervised Learning (en inglés)', url: 'https://developers.google.com/machine-learning/intro-to-ml/supervised?hl=en' };
  const F6 = { nombre: 'Google for Developers, Machine Learning Crash Course: Class-imbalanced datasets (en inglés)', url: 'https://developers.google.com/machine-learning/crash-course/overfitting/imbalanced-datasets?hl=en' };
  const F7 = { nombre: 'Google for Developers, Machine Learning Crash Course: Dividing the original dataset (en inglés)', url: 'https://developers.google.com/machine-learning/crash-course/overfitting/dividing-datasets?hl=en' };
  const F8 = { nombre: 'Google for Developers, Machine Learning Crash Course: Accuracy, recall, precision (en inglés)', url: 'https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall?hl=en' };
  const F9 = WIKI('Aprendizaje_autom%C3%A1tico', 'Aprendizaje automático');
  const F10 = WIKI('Red_neuronal_artificial', 'Red neuronal artificial');

  // ------------------------------------------------------------------
  L('Los datos', {
    objetivo: 'Explicar qué son los datos de entrenamiento, distinguir característica y etiqueta, y reconocer por qué la cantidad, la calidad y el equilibrio de los datos afectan a un modelo.',
    vidaReal: `
      <p>Cuando una aplicación te sugiere una canción o aparta un correo basura, lo que sabe viene de ejemplos que alguien reunió antes. Saber que todo depende de esos ejemplos te ayuda a entender por qué una herramienta acierta en unas cosas y falla en otras, y por qué conviene pensar con cuidado qué información entregas a una aplicación. Es el primer paso para usar la IA con criterio.</p>`,
    explicacion: `
      <p>Imagina que quieres enseñarle a un programa a reconocer gatos. Le hacen falta miles de fotos de gatos y de cosas que no son gatos. ¿De dónde salen y qué deben tener? Esa pregunta es el tema de la lección.</p>
      <h3>¿Qué son los datos de entrenamiento?</h3>
      <p>Como viste en "Qué es la inteligencia artificial", la IA aprende de ejemplos. A esos ejemplos se les llama <em>datos de entrenamiento</em>. Según IBM (2025), son la información con la que se enseña a un modelo a predecir y a reconocer patrones. Un <strong>conjunto de datos</strong> (en inglés, <span lang="en">dataset</span>) es la colección completa de esos ejemplos, organizada como una tabla: cada fila es un ejemplo.</p>
      <h3>Características y etiqueta</h3>
      <p>Mira un conjunto pequeño de frutas. De cada una se anotó su peso y su color, y alguien escribió qué fruta es.</p>
      ${'<div class="tabla-wrap"><table><thead><tr><th>Ejemplo</th><th>Peso (g)</th><th>Color</th><th>Fruta</th></tr></thead><tbody>' +
        [['1', '150', 'Rojo', 'Manzana'], ['2', '130', 'Naranja', 'Naranja'], ['3', '170', 'Verde', 'Manzana'], ['4', '120', 'Naranja', 'Naranja'], ['5', '160', 'Rojo', 'Manzana'], ['6', '140', 'Naranja', 'Naranja']]
          .map((f) => '<tr>' + f.map((c) => `<td>${c}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>'}
      <p>Según Google (2025), las <strong>características</strong> son los valores que usa el modelo para predecir, y la <strong>etiqueta</strong> es la "respuesta" que se quiere predecir. Aquí las características son el peso y el color, y la etiqueta es la columna "Fruta". Con datos así, el modelo aprende qué combinaciones de peso y color van con cada fruta.</p>
      <p>No todos los datos traen etiqueta. Según IBM (2025), el aprendizaje supervisado usa datos con etiqueta y el no supervisado usa datos sin etiqueta. Ambos tipos se explican en la lección "Aprendizaje automático".</p>
      <h3>Cantidad, variedad y calidad</h3>
      <p>Un modelo solo conoce lo que hay en sus datos. Si todas las fotos de gatos son de gatos blancos, le costará reconocer uno negro. Por eso importan la cantidad y la variedad. También importa la calidad: IBM (2025) explica que los datos de mala calidad introducen ruido y sesgo, y le impiden al modelo hacer predicciones precisas. El <em>ruido</em> son errores o datos que confunden, como una foto mal etiquetada. El sesgo se verá en la lección "Sesgos en la IA", y qué datos conviene no compartir, en "Privacidad: qué no compartir".</p>
      <h3>Cuando un tipo sobra</h3>
      <p>Según Google (2025), en un conjunto <em>desbalanceado</em> una etiqueta es considerablemente más común que la otra. Piensa en 100 fotos, 90 de gatos y 10 de perros. Un modelo que siempre responda "gato" acertará muchas veces sin haber aprendido nada. Para organizar y revisar datos con orden, puedes repasar "Recolectar y organizar datos", en Matemáticas.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que más datos siempre es mejor. Mil ejemplos con errores o todos iguales enseñan menos que cien bien elegidos y bien etiquetados.</p>`,
    ejemplo: `
      <p>Un conjunto tiene 100 fotos: 90 de gatos y 10 de perros. Un modelo que siempre dice "gato" ¿aprendió algo? Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Primero calcula el porcentaje de gatos: 90 ÷ 100 = 0.9, que es 90%.</li>
        <li>Calcula el de perros: 10 ÷ 100 = 0.1, que es 10%. Los dos suman 100%.</li>
        <li>El modelo dice "gato" siempre, así que acierta en las 90 fotos de gatos y falla en las 10 de perros: acierta 90 de 100, o sea 90%.</li>
        <li>Ese 90% parece excelente, pero el modelo no distingue nada. Solo aprovechó que casi todo es gato. Para evaluarlo de verdad hacen falta más perros.</li>
      </ol>
      <p>Resultado: <span class="resultado">90% de aciertos sin haber aprendido nada</span>.</p>
      <p class="nota"><strong>Error común:</strong> fiarse solo del porcentaje de aciertos. Mira siempre cuántos ejemplos hay de cada clase.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>En la tabla de frutas, ¿qué es la columna "Fruta"?</p>', opciones: ['La etiqueta, la respuesta que se quiere predecir', 'Una característica, como el peso', 'El ruido de los datos', 'El modelo ya entrenado'], correcta: 0,
        pista: '<p>Piensa en cuál es la "respuesta" que el modelo debe aprender a dar.</p>',
        solucion: '<p>La columna "Fruta" es la etiqueta: lo que se quiere predecir. El peso y el color son las características que usa el modelo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos datos es una característica y no una etiqueta, si se quiere predecir la fruta?</p>', opciones: ['La palabra "Manzana"', 'La respuesta correcta de cada ejemplo', 'La palabra "Naranja"', 'El peso de la fruta en gramos'], correcta: 3,
        pista: '<p>Las características son lo que el modelo mira para decidir.</p>',
        solucion: '<p>El peso es un valor que el modelo usa para predecir, así que es una característica. "Manzana" y "Naranja" son posibles etiquetas.</p>' },
      { tipo: 'opciones', enunciado: '<p>Para enseñar a detectar correo basura, se reúnen miles de correos que personas marcaron como "basura" o "no basura". ¿Qué tipo de datos son?</p>', opciones: ['Datos sin etiqueta', 'Datos con etiqueta', 'Datos sin características', 'Datos de prueba solamente'], correcta: 1,
        pista: '<p>Fíjate en que alguien ya escribió la respuesta de cada correo.</p>',
        solucion: '<p>Son datos con etiqueta: cada correo trae la respuesta ("basura" o "no basura") puesta por una persona. Este es el ejemplo que da IBM (2025).</p>' },
      { tipo: 'opciones', enunciado: '<p>Un conjunto tiene 95 fotos de un tipo y 5 de otro. ¿Cómo se llama esta situación?</p>', opciones: ['Un conjunto con ruido', 'Un conjunto de prueba', 'Un conjunto desbalanceado', 'Un conjunto con etiqueta doble'], correcta: 2,
        pista: '<p>Una etiqueta es mucho más común que la otra.</p>',
        solucion: '<p>Es un conjunto desbalanceado: una etiqueta aparece muchísimo más que la otra.</p>' },
      { tipo: 'numero', enunciado: '<p>Un conjunto tiene 200 fotos y 180 son de un mismo tipo. ¿Qué porcentaje de las fotos es del otro tipo? (cifras de ejemplo)</p>', respuesta: (200 - 180) / 200 * 100,
        pista: '<p>Primero halla cuántas fotos son del otro tipo.</p>',
        solucion: '<p>200 − 180 = 20 fotos, y 20 ÷ 200 = 0.1, o sea <strong>10%</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un modelo aprendió con fotos mal etiquetadas y falla mucho. ¿Qué explica mejor el problema?</p>', opciones: ['Los datos de mala calidad introducen ruido', 'El modelo tiene demasiadas neuronas', 'Las fotos eran muy pocas siempre', 'Las características estaban de más'], correcta: 0,
        pista: '<p>Piensa en qué pasa si el modelo aprende de respuestas equivocadas.</p>',
        solucion: '<p>Según IBM (2025), los datos de mala calidad introducen ruido y le impiden al modelo hacer predicciones precisas.</p>' },
    ],
    fuentes: [F1, F5, F6],
  });

  // ------------------------------------------------------------------
  const RECTAS = G({
    x: [0, 5], y: [0, 10],
    funciones: [
      { f: (x) => x, etiqueta: 'Recta inicial: pendiente 1', serie: 0 },
      { f: (x) => 2 * x, etiqueta: 'Recta ajustada: pendiente 2', serie: 1 },
    ],
    puntos: [{ x: 1, y: 2, etiqueta: '(1, 2)' }, { x: 2, y: 4, etiqueta: '(2, 4)' }, { x: 3, y: 5, etiqueta: '(3, 5)' }, { x: 4, y: 8, etiqueta: '(4, 8)' }],
    descripcion: 'Cuatro puntos de horas de estudio (eje x) y calificación (eje y): (1, 2), (2, 4), (3, 5) y (4, 8). La recta inicial, de pendiente 1, queda por debajo de todos los puntos. La recta ajustada, de pendiente 2, pasa por tres de ellos y a una unidad del cuarto.',
  });

  L('Aprendizaje automático', {
    objetivo: 'Explicar qué es el aprendizaje automático, distinguir el aprendizaje supervisado, el no supervisado y el por refuerzo, y ver cómo un modelo sencillo ajusta una recta para equivocarse menos.',
    vidaReal: `
      <p>El filtro que aparta el correo basura, la lista de canciones que te recomiendan o el teclado que anticipa palabras funcionan porque un programa ajustó sus cuentas con muchos ejemplos. Entender esa idea te permite explicar a otras personas por qué estas herramientas mejoran con el uso y por qué dependen de los datos con que se prepararon. Es una base útil para todo lo demás que verás en esta materia.</p>`,
    explicacion: `
      <p>Piensa en cómo aprendes a encestar una pelota. Nadie te da una lista de reglas: lanzas, ves dónde cae, corriges y vuelves a lanzar. Las máquinas aprenden de forma parecida, pero con números. Como ya viste en "Breve historia de la IA", aprender de ejemplos es la base de la IA actual. Aquí veremos cómo se ajusta algo para equivocarse menos.</p>
      <h3>¿Qué es el aprendizaje automático?</h3>
      <p>Según Wikipedia (2025), el <strong>aprendizaje automático</strong> (en inglés, <span lang="en">machine learning</span>) es un subcampo de la computación y una rama de la inteligencia artificial cuyo objetivo es desarrollar técnicas que permitan que las computadoras aprendan. Es decir, el programa mejora su resultado a partir de datos, y no porque alguien le escriba cada regla.</p>
      <h3>Tres maneras de aprender</h3>
      <p>Según los datos que tenga, un modelo aprende de manera distinta.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Manera</th><th>Qué recibe</th><th>Qué hace</th></tr></thead>
        <tbody>
          <tr><td>Supervisado</td><td>Datos con etiqueta</td><td>Aprende a predecir la respuesta</td></tr>
          <tr><td>No supervisado</td><td>Datos sin etiqueta</td><td>Descubre su estructura por sí solo</td></tr>
          <tr><td>Por refuerzo</td><td>Un entorno con el que interactúa</td><td>Aprende de recompensas y castigos</td></tr>
        </tbody>
      </table></div>
      <p>Con el <strong>aprendizaje supervisado</strong>, dice IBM (2025), se entrenan modelos con conjuntos de datos etiquetados para que identifiquen patrones. Un ejemplo de IBM: para detectar correo basura se le muestran miles de correos que personas marcaron como "spam" o "no spam".</p>
      <p>Con el <strong>aprendizaje no supervisado</strong>, según IBM (2025), los modelos trabajan por su cuenta para descubrir la estructura de datos sin etiquetar. Nadie le dice la respuesta correcta.</p>
      <p>El aprendizaje por refuerzo es la tercera manera: según IBM (2025), el agente aprende de recompensas y castigos al actuar dentro de un entorno para cumplir una meta. Piensa en entrenar a un perro con premios.</p>
      <h3>¿Qué se ajusta al aprender?</h3>
      <p>Tomemos un modelo muy sencillo: una recta, como en "Función lineal y pendiente". Imagina que tienes puntos de horas de estudio y calificación, y quieres una recta que los describa. El modelo empieza con una recta cualquiera, mide cuánto se aleja de los puntos y la mueve para que se aleje menos. A esa distancia se le llama <em>error</em>. Repite el proceso hasta que el error ya no baja.</p>
      ${RECTAS}
      <p>En la gráfica, la recta de pendiente 1 deja los puntos arriba, con mucho error. La de pendiente 2 pasa mucho más cerca, así que el modelo se quedaría con ella.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que la máquina "entiende" por qué la recta sirve. Solo busca el ajuste con menos error.</p>`,
    ejemplo: `
      <p>Tenemos 4 puntos de horas de estudio y calificación (cifras de ejemplo): (1, 2), (2, 4), (3, 5) y (4, 8). Comparemos dos rectas que parten de cero: una con pendiente 1, que predice la misma calificación que las horas, y otra con pendiente 2, que predice el doble.</p>
      <ol class="pasos-ej">
        <li>Con pendiente 1, las predicciones son 1, 2, 3 y 4. Las diferencias con las calificaciones reales (2, 4, 5 y 8) son 1, 2, 2 y 4.</li>
        <li>Suma las diferencias: 1 + 2 + 2 + 4 = 9. Ese es el error de la primera recta.</li>
        <li>Con pendiente 2, las predicciones son 2, 4, 6 y 8. Las diferencias son 0, 0, 1 y 0, y su suma es 1.</li>
        <li>Compara: 1 es mucho menor que 9, así que la pendiente 2 ajusta mejor.</li>
      </ol>
      <p>Resultado: <span class="resultado">error 9 contra error 1: gana la pendiente 2</span>.</p>
      <p class="nota"><strong>Error común:</strong> restar con signo y dejar que se cancelen. Toma cada diferencia sin signo, como una distancia.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué es el aprendizaje automático?</p>', opciones: ['Una rama de la IA en la que las computadoras aprenden a partir de datos', 'Un programa que solo sigue reglas escritas a mano', 'Una pantalla que muestra datos', 'Un tipo de memoria de la computadora'], correcta: 0,
        pista: '<p>Recuerda de dónde obtiene lo que sabe el modelo.</p>',
        solucion: '<p>Es una rama de la inteligencia artificial en la que las computadoras aprenden de datos, en lugar de recibir cada regla escrita.</p>' },
      { tipo: 'opciones', enunciado: '<p>Se entrena un modelo con miles de correos que personas marcaron como "spam" o "no spam". ¿Qué tipo de aprendizaje es?</p>', opciones: ['Por refuerzo', 'No supervisado', 'Ninguno, es un programa común', 'Supervisado'], correcta: 3,
        pista: '<p>Fíjate en que los datos ya traen la respuesta.</p>',
        solucion: '<p>Es supervisado: los datos tienen etiqueta, "spam" o "no spam", puesta por personas.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un modelo recibe muchos datos sin etiqueta y descubre su estructura por sí solo. ¿Qué tipo de aprendizaje es?</p>', opciones: ['Supervisado', 'No supervisado', 'Por refuerzo', 'Manual'], correcta: 1,
        pista: '<p>La clave es que no hay respuestas ya escritas.</p>',
        solucion: '<p>Es no supervisado: trabaja con datos sin etiquetar y descubre su estructura sin que nadie le dé la respuesta.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un agente prueba acciones en un entorno y mejora según las recompensas y los castigos que recibe. ¿Qué aprendizaje usa?</p>', opciones: ['Por refuerzo', 'Supervisado', 'No supervisado', 'Ninguno'], correcta: 0,
        pista: '<p>Piensa en entrenar a un perro con premios.</p>',
        solucion: '<p>Es aprendizaje por refuerzo: el agente aprende de recompensas y castigos al interactuar con su entorno.</p>' },
      { tipo: 'numero', enunciado: '<p>Usa los puntos (1, 2), (2, 4), (3, 5) y (4, 8). Una recta de pendiente 3 predice 3, 6, 9 y 12. ¿Cuánto vale la suma de sus diferencias sin signo con las calificaciones reales? (cifras de ejemplo)</p>', respuesta: 1 + 2 + 4 + 4,
        pista: '<p>Resta cada predicción de su calificación real y toma la distancia sin signo.</p>',
        solucion: '<p>|3 − 2| = 1, |6 − 4| = 2, |9 − 5| = 4 y |12 − 8| = 4. La suma es 1 + 2 + 4 + 4 = <strong>11</strong>, peor que la pendiente 2.</p>' },
      { tipo: 'opciones', enunciado: '<p>Al ajustar una recta a unos puntos, ¿qué busca el modelo?</p>', opciones: ['Que la recta pase por el origen', 'Que el error sea lo más grande posible', 'Que el error sea menor', 'Que la pendiente sea siempre 1'], correcta: 2,
        pista: '<p>Recuerda qué hace el modelo con la recta inicial.</p>',
        solucion: '<p>El modelo mueve la recta para que su error sea menor. Con un error más pequeño, sus predicciones se parecen más a los datos.</p>' },
    ],
    fuentes: [F1, F3, F9],
  });

  // ------------------------------------------------------------------
  const nodo = (x, y) => ({ tipo: 'circulo', x, y, r: 0.45 });
  const ENT = [[2, 5.5], [2, 3.5], [2, 1.5]];
  const OCU = [[7, 6], [7, 4.2], [7, 2.4], [7, 0.8]];
  const SAL = [[12, 3.5]];
  const unir = (a, b) => a.flatMap((p) => b.map((q) => ({ tipo: 'linea', desde: [p[0] + 0.45, p[1]], hasta: [q[0] - 0.45, q[1]] })));
  const RED = diagrama([0, 14], [-0.8, 8], [
    ...unir(ENT, OCU), ...unir(OCU, SAL),
    ...[...ENT, ...OCU, ...SAL].map((p) => nodo(p[0], p[1])),
    txt(2, 7.4, 'Capa de entrada'), txt(7, 7.4, 'Capa oculta'), txt(12, 7.4, 'Capa de salida'),
  ], 'Diagrama de una red neuronal con tres capas, de izquierda a derecha. La capa de entrada tiene 3 nodos, la capa oculta 4 y la capa de salida 1. Cada nodo de una capa se conecta con todos los de la siguiente.');

  const NEURONA = diagrama([0, 14], [0, 7], [
    ...caja(2, 5.5, 3.4, 1.2, 'Nubes: 1'), txt(5.1, 6.2, 'peso 2'),
    ...caja(2, 3.5, 3.4, 1.2, 'Pronóstico: 1'), txt(5.1, 3.9, 'peso 3'),
    ...caja(2, 1.5, 3.4, 1.2, 'Viento: 0'), txt(5.1, 0.9, 'peso 1'),
    ...flecha([3.8, 5.5], [8.3, 3.9]), ...flecha([3.8, 3.5], [8.3, 3.5]), ...flecha([3.8, 1.5], [8.3, 3.1]),
    ...caja(10, 3.5, 3.6, 1.8, 'Suma y decide'),
  ], 'Diagrama de una neurona artificial. Tres cajas de entrada, nubes con valor 1 y peso 2, pronóstico con valor 1 y peso 3, y viento con valor 0 y peso 1, envían flechas a una caja que suma y decide.');

  L('Redes neuronales explicadas sin fórmulas', {
    objetivo: 'Describir qué es una red neuronal artificial, qué son las capas y los pesos, y calcular cómo una neurona sencilla decide a partir de sus entradas.',
    vidaReal: `
      <p>Muchos programas que reconocen imágenes, voces o textos se construyen con redes neuronales. No necesitas saber de fórmulas para entender la idea: una red es una cadena de decisiones pequeñas que se combinan. Con esa imagen en mente puedes leer noticias sobre IA con más calma y entender por qué se habla de "entrenar" y de "ajustar" un modelo. Verás que la idea es mucho más simple de lo que suena.</p>`,
    explicacion: `
      <p>Tu cerebro tiene neuronas conectadas entre sí: cada una recibe señales de otras y decide si pasa una señal a las siguientes. Las redes neuronales artificiales toman esa idea como inspiración. No son un cerebro, y lo más importante es no confundirlas con uno.</p>
      <h3>¿Qué es una red neuronal?</h3>
      <p>Según Wikipedia (2025), una <strong>red neuronal</strong> artificial es un modelo inspirado en la estructura y función de las redes neuronales biológicas de los cerebros animales. Sus neuronas artificiales solo modelan vagamente las del cerebro, es decir, es una simplificación y no una copia. En la práctica, una neurona artificial es una operación pequeña con números.</p>
      <h3>Una neurona: sumar y decidir</h3>
      <p>Imagina que decides si sales con paraguas. Miras tres cosas: si hay nubes, si el pronóstico dice lluvia y si hace viento. Cada una vale 1 si ocurre y 0 si no. No todas pesan igual: el pronóstico te importa más que el viento. A esa importancia se le llama <strong>peso</strong>. Según Wikipedia (2025), cada conexión de una red tiene un peso que se ajusta durante el aprendizaje.</p>
      ${NEURONA}
      <p>La neurona multiplica cada entrada por su peso, suma todo y compara con un umbral, que es el número que hay que alcanzar. Si la suma lo alcanza, se "activa" y dice que sí. Si no, dice que no. Eso es todo lo que hace una neurona.</p>
      <h3>Capas: de lo simple a lo complejo</h3>
      <p>Una sola neurona decide poco. Por eso se juntan muchas en <strong>capas</strong>. Según Wikipedia (2025), las señales viajan desde la capa de entrada hasta la de salida, pasando posiblemente por capas intermedias u ocultas. La entrada recibe los datos, las ocultas combinan lo que reciben y la salida da la respuesta. En general, las primeras capas detectan cosas simples y las siguientes las combinan en cosas más complejas.</p>
      ${RED}
      <h3>¿Cómo aprende una red?</h3>
      <p>Al principio los pesos son números cualquiera y la red se equivoca. Durante el entrenamiento se ajustan una y otra vez hasta que los resultados mejoran. Aprender, en una red, es mover los pesos. La lección "Entrenar y evaluar un modelo" explica cómo se comprueba que eso funcionó.</p>
      <h3>Aprendizaje profundo</h3>
      <p>Según Wikipedia (2025), una red se llama típicamente red neuronal profunda si tiene al menos dos capas ocultas. De ahí viene el nombre de aprendizaje profundo: muchas capas. Los modelos grandes tienen una cantidad enorme de pesos; en "Tamaño de un modelo: parámetros y cuánta memoria ocupa" verás qué significa.</p>
      <p class="nota"><strong>Trampa común:</strong> imaginar que una red neuronal piensa como un cerebro. Solo suma productos y compara con un número.</p>`,
    ejemplo: `
      <p>Una neurona decide si sales con paraguas con tres entradas. Hoy hay nubes (1), el pronóstico dice lluvia (1) y no hay viento (0). Los pesos son 2, 3 y 1, y el umbral es 4. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Multiplica cada entrada por su peso: 1 × 2 = 2, 1 × 3 = 3 y 0 × 1 = 0.</li>
        <li>Suma los productos: 2 + 3 + 0 = 5.</li>
        <li>Compara con el umbral: 5 es mayor que 4, así que la neurona se activa y la decisión es llevar paraguas.</li>
        <li>Ahora baja el peso del pronóstico de 3 a 1. La suma queda 2 + 1 + 0 = 3, que no llega a 4, y la decisión cambia: no llevar paraguas.</li>
      </ol>
      <p>Resultado: <span class="resultado">suma 5, sí; con otro peso, suma 3, no</span>. Cambiar un peso cambió la decisión: eso es lo que el entrenamiento mueve.</p>
      <p class="nota"><strong>Error común:</strong> sumar las entradas sin multiplicarlas por sus pesos. Una entrada con peso 0 no influye, aunque valga 1.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>En una red neuronal, ¿qué capa recibe los datos?</p>', opciones: ['La capa de salida', 'La capa de entrada', 'Una capa oculta', 'Ninguna: los datos van directo a la salida'], correcta: 1,
        pista: '<p>Mira el diagrama de izquierda a derecha.</p>',
        solucion: '<p>La capa de entrada recibe los datos, las ocultas los combinan y la de salida da la respuesta.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué se ajusta durante el entrenamiento de una red?</p>', opciones: ['El número de fotos', 'El color de los nodos', 'El nombre del modelo', 'Los pesos de las conexiones'], correcta: 3,
        pista: '<p>Es el número que dice cuánto cuenta cada entrada.</p>',
        solucion: '<p>Cada conexión tiene un peso, y el aprendizaje consiste en ajustar esos pesos hasta que los resultados mejoran.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál afirmación sobre las neuronas artificiales es correcta?</p>', opciones: ['Son copias exactas de las neuronas del cerebro', 'Son una simplificación inspirada en las del cerebro', 'Funcionan igual que cualquier órgano', 'Piensan y sienten como una persona'], correcta: 1,
        pista: '<p>Recuerda la palabra "vagamente".</p>',
        solucion: '<p>Solo modelan vagamente las neuronas del cerebro: son una simplificación, no una copia.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la lección, ¿cuándo se llama profunda a una red neuronal?</p>', opciones: ['Cuando tiene al menos dos capas ocultas', 'Cuando tiene una sola capa', 'Cuando usa fotos', 'Cuando no tiene pesos'], correcta: 0,
        pista: '<p>El nombre habla de "profundidad": muchas capas.</p>',
        solucion: '<p>Una red neuronal profunda tiene al menos dos capas ocultas. De ahí viene el nombre aprendizaje profundo.</p>' },
      { tipo: 'numero', enunciado: '<p>Una neurona tiene entradas 0, 1 y 1, y pesos 2, 3 y 1. ¿Cuánto da la suma de entradas por pesos? (cifras de ejemplo)</p>', respuesta: 0 * 2 + 1 * 3 + 1 * 1,
        pista: '<p>Multiplica cada entrada por su peso y luego suma.</p>',
        solucion: '<p>0 × 2 = 0, 1 × 3 = 3 y 1 × 1 = 1. La suma es 0 + 3 + 1 = <strong>4</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con entradas 1, 1 y 1, y pesos 2, 3 y 1, la suma da 6. Si se sube el peso del pronóstico de 3 a 5, ¿cuánto da ahora la suma? (cifras de ejemplo)</p>', respuesta: 1 * 2 + 1 * 5 + 1 * 1,
        pista: '<p>Solo cambia el segundo peso; vuelve a multiplicar y sumar.</p>',
        solucion: '<p>1 × 2 = 2, 1 × 5 = 5 y 1 × 1 = 1. La suma es 2 + 5 + 1 = <strong>8</strong>.</p>' },
    ],
    fuentes: [F10],
  });

  // ------------------------------------------------------------------
  const FLUJO = diagrama([0, 16], [0, 7], [
    ...caja(2, 5.5, 3.2, 1.4, 'Datos'),
    ...flecha([3.7, 5.5], [5.6, 5.5]),
    ...caja(7.8, 5.5, 4.2, 1.4, 'Separar 80/20'),
    ...flecha([10, 5.5], [11.9, 5.5]),
    ...caja(14, 5.5, 3.2, 1.4, 'Entrenar'),
    ...flecha([14, 4.7], [14, 3.2]),
    ...caja(14, 2.3, 3.2, 1.4, 'Probar'),
    ...flecha([12.1, 2.3], [10.2, 2.3]),
    ...caja(7.8, 2.3, 4.2, 1.4, 'Ajustar'),
    txt(2, 2.3, 'y repetir'),
  ], 'Diagrama de flujo con cinco pasos: datos, separar en 80 por ciento para entrenar y 20 por ciento para probar, entrenar, probar con los datos de prueba y ajustar. Después de ajustar se repite el ciclo.');

  L('Entrenar y evaluar un modelo', {
    objetivo: 'Explicar por qué los datos se separan en entrenamiento y prueba, calcular la exactitud y reconocer el sobreajuste.',
    vidaReal: `
      <p>Aprobar un examen con las preguntas que ya te habías aprendido no prueba que sepas el tema. Con las herramientas de IA pasa igual: un resultado impresionante puede ser solo memoria. Saber cómo se comprueba un modelo te ayuda a no confiar en cualquier porcentaje que veas anunciado, y a preguntarte con qué datos se midió. Es una pregunta sencilla que casi siempre vale la pena hacer.</p>`,
    explicacion: `
      <p>Imagina que un maestro te da 10 problemas para practicar y luego pone esos mismos 10 en el examen. Sacar buena nota no demuestra que aprendiste, solo que recuerdas. Un modelo tiene el mismo riesgo.</p>
      <h3>Entrenar es mejorar por vueltas</h3>
      <p>El <strong>entrenamiento</strong> es el proceso en que el modelo ajusta lo que sabe con los datos. Según IBM (2025), se calcula el error de sus predicciones, se ajusta el algoritmo para reducirlo y el proceso se repite hasta que el modelo es preciso. Es la idea de la recta de "Aprendizaje automático", pero con muchas vueltas.</p>
      <h3>Separar datos para poder comprobar</h3>
      <p>Según Google (2025), el conjunto de datos original se divide en un conjunto de entrenamiento, con el que el modelo aprende, y un <strong>conjunto de prueba</strong> (en inglés, <span lang="en">test set</span>) para evaluarlo. Una división común es 80% para entrenar y 20% para probar. El conjunto de prueba se guarda aparte y el modelo nunca lo ve mientras aprende. Google (2025) explica que probar con un conjunto aparte sirve para asegurar predicciones precisas con datos que el modelo no vio.</p>
      ${FLUJO}
      <h3>La exactitud</h3>
      <p>La forma más sencilla de medir es la <em>exactitud</em>. Según Google (2025), es la proporción de todas las clasificaciones que fueron correctas. En palabras: aciertos entre el total de intentos. Si aciertas 38 de 40, tu exactitud es 38 ÷ 40 = 0.95, o sea 95%. Es la misma cuenta de "Porcentajes", y la idea de qué tan posible es un acierto se ve en "Probabilidad: qué tan posible es algo".</p>
      <h3>Cuando el modelo memoriza</h3>
      <p>Según IBM (2021), hay <strong>sobreajuste</strong> (en inglés, <span lang="en">overfitting</span>) cuando el modelo se ajusta demasiado a sus datos de entrenamiento y no puede predecir bien con otros datos. Es como el estudiante que se memoriza las respuestas. La señal es esta: acierta mucho con el entrenamiento y poco con la prueba.</p>
      <h3>Lo que la exactitud no dice</h3>
      <p>Un número alto no lo cuenta todo. Como viste en "Los datos", un modelo puede acertar casi siempre solo porque una clase es mucho más común. Además, un modelo no es bueno "en general": es bueno para una tarea y para unos datos. Por eso, cuando una herramienta falla con algo distinto, ver "Alucinaciones: cuando la IA inventa" y "Verificar lo que te responde" te ayuda a revisar sus respuestas.</p>
      <p class="nota"><strong>Trampa común:</strong> medir el modelo con los mismos datos con que se entrenó. Siempre parecerá mejor de lo que es.</p>`,
    ejemplo: `
      <p>Un conjunto tiene 200 ejemplos. Se usan 160 para entrenar y 40 para probar. El modelo A acierta 38 de los 40 de prueba. El modelo B acierta el 100% del entrenamiento y 28 de los 40 de prueba. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Primero comprueba la división: 160 ÷ 200 = 0.8, o sea 80% para entrenar, y los otros 40 son 20%.</li>
        <li>Calcula la exactitud de A en prueba: 38 ÷ 40 = 0.95, es decir 95%.</li>
        <li>Calcula la de B en prueba: 28 ÷ 40 = 0.7, es decir 70%.</li>
        <li>Compara: B sacó 100% en entrenamiento y solo 70% en prueba, una caída de 30 puntos. Eso es sobreajuste. A se mantiene alto con datos que no vio.</li>
      </ol>
      <p>Resultado: <span class="resultado">A generaliza mejor: 95% contra 70%</span>.</p>
      <p class="nota"><strong>Error común:</strong> elegir al modelo B por su 100% de entrenamiento. Lo que importa es el resultado con datos que no vio.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Para qué se guarda un conjunto de prueba aparte?</p>', opciones: ['Para hacer el conjunto de entrenamiento más grande', 'Para borrar los datos con ruido', 'Para probar el modelo con datos que no vio', 'Para cambiar las etiquetas'], correcta: 2,
        pista: '<p>Piensa en el examen con preguntas nuevas.</p>',
        solucion: '<p>El conjunto de prueba sirve para evaluar al modelo con datos que no vio y saber si predice bien con casos nuevos.</p>' },
      { tipo: 'numero', enunciado: '<p>Un conjunto tiene 250 ejemplos y se separa 80% para entrenar. ¿Cuántos ejemplos quedan para entrenar? (cifras de ejemplo)</p>', respuesta: 250 * 80 / 100,
        pista: '<p>Calcula el 80% de 250.</p>',
        solucion: '<p>250 × 80 ÷ 100 = <strong>200</strong> ejemplos para entrenar, y 50 para probar.</p>' },
      { tipo: 'numero', enunciado: '<p>Un modelo acierta 36 de 40 ejemplos de prueba. ¿Cuál es su exactitud en porcentaje? (cifras de ejemplo)</p>', respuesta: 36 / 40 * 100,
        pista: '<p>Aciertos entre total, por 100.</p>',
        solucion: '<p>36 ÷ 40 = 0.9, y 0.9 × 100 = <strong>90%</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un modelo acierta 99% en entrenamiento y 60% en prueba. ¿Qué sospechas?</p>', opciones: ['Que tiene muy pocos pesos', 'Que no hay datos de prueba', 'Que es el mejor modelo posible', 'Que está sobreajustado'], correcta: 3,
        pista: '<p>Compara los dos porcentajes: ¿acierta igual con datos nuevos?</p>',
        solucion: '<p>Sospechas sobreajuste: se ajustó demasiado a los datos de entrenamiento y falla con datos nuevos.</p>' },
      { tipo: 'numero', enunciado: '<p>Un modelo acierta 100% en entrenamiento y 70% en prueba. ¿Cuántos puntos porcentuales baja? (cifras de ejemplo)</p>', respuesta: 100 - 70,
        pista: '<p>Resta la exactitud de prueba de la de entrenamiento.</p>',
        solucion: '<p>100 − 70 = <strong>30 puntos</strong>. Una caída grande así es señal de que el modelo memorizó.</p>' },
      { tipo: 'opciones', enunciado: '<p>Después de probar un modelo, el resultado no es bueno. ¿Qué se hace en el ciclo de entrenamiento?</p>', opciones: ['Se ajusta y se repite el entrenamiento', 'Se prueba con el mismo conjunto de prueba, sin cambiar nada', 'Se borra el conjunto de prueba', 'Se publica el modelo igual'], correcta: 0,
        pista: '<p>Recuerda que el entrenamiento se repite hasta que el modelo es preciso.</p>',
        solucion: '<p>Se calcula el error, se ajusta el algoritmo para reducirlo y se repite el proceso hasta que el modelo es preciso.</p>' },
    ],
    fuentes: [F2, F4, F7, F8],
  });
})();
