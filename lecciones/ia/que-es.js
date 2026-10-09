// Inteligencia artificial · Unidad 1: Qué es la IA.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Sin marcas actuales de asistentes ni de chatbots. Las cifras de los ejemplos son de ejemplo.
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

  const WIKI_EN = (articulo, nombre) => ({ nombre: `${nombre} - Wikipedia (en inglés)`, url: `https://en.wikipedia.org/wiki/${articulo}` });
  const WIKI = (articulo, nombre) => ({ nombre: `${nombre} - Wikipedia en español`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const PARLAMENTO = { nombre: 'Parlamento Europeo, Qué es la inteligencia artificial y cómo se usa', url: 'https://www.europarl.europa.eu/topics/es/article/20200827STO85804/que-es-la-inteligencia-artificial-y-como-se-usa' };
  const WIKI_IA = WIKI_EN('Artificial_intelligence', 'Artificial Intelligence');
  const WIKI_HIST = WIKI('Historia_de_la_inteligencia_artificial', 'Historia de la inteligencia artificial');

  // ------------------------------------------------------------------
  const REGLAS = diagrama([0, 15], [0, 8], [
    txt(2.2, 7.4, 'Programa común'),
    ...caja(2.2, 5.6, 3.4, 1.6, 'Reglas'), txt(4.6, 5.6, '+'),
    ...caja(7, 5.6, 3.4, 1.6, 'Datos'),
    ...flecha([8.9, 5.6], [10.3, 5.6]),
    ...caja(12.4, 5.6, 3.6, 1.6, 'Respuestas'),
    txt(2.2, 3.4, 'Inteligencia artificial'),
    ...caja(2.2, 1.6, 3.4, 1.6, 'Datos'), txt(4.6, 1.6, '+'),
    ...caja(7, 1.6, 3.4, 1.6, 'Respuestas'),
    ...flecha([8.9, 1.6], [10.3, 1.6]),
    ...caja(12.6, 1.6, 4.2, 1.6, 'Reglas o patrón'),
  ], 'Diagrama de dos filas. Fila de arriba, programa común: las reglas escritas por una persona, más los datos, producen las respuestas. Fila de abajo, inteligencia artificial: los datos, más las respuestas de muchos ejemplos, producen las reglas o el patrón.');

  L('Qué es la inteligencia artificial', {
    objetivo: 'Explicar con tus palabras qué es la inteligencia artificial, en qué se diferencia de un programa común y por qué hoy solo existe la que hace una tarea a la vez.',
    vidaReal: `
      <p>Cada vez que el celular te sugiere la siguiente palabra, que una aplicación separa tus fotos por personas o que tu correo aparta los mensajes basura, hay un programa que "aprendió" esa tarea. Entender cómo funciona te sirve para confiar en él cuando acierta, para dudar cuando se equivoca y para saber qué puedes pedirle y qué no, sin esperar que haga cosas que no sabe hacer.</p>`,
    explicacion: `
      <p>Piensa en el teclado de tu celular. Mientras escribes, te sugiere la palabra que sigue, y muchas veces acierta. Nadie le explicó una por una todas las frases posibles del idioma. Entonces, ¿cómo "sabe"? La respuesta es el tema de esta lección.</p>
      <h3>Un programa común sigue reglas</h3>
      <p>Una calculadora recibe 2 + 3 y responde 5. Lo hace siguiendo un <strong>algoritmo</strong>, que es una receta de pasos que se ejecutan en orden, igual que una receta de cocina. En un programa común, una persona escribe esas reglas a mano y la computadora las obedece sin cambiar nada. Si las reglas están bien, las respuestas son correctas siempre. Si algo no está previsto en las reglas, el programa no sabe qué hacer.</p>
      <h3>La inteligencia artificial aprende de ejemplos</h3>
      <p>Hay tareas en las que escribir las reglas a mano es casi imposible. Intenta describir con reglas exactas cómo se ve un gato en una foto: hay gatos grandes y pequeños, de frente y de lado, dormidos y saltando. En lugar de escribir las reglas, se hace lo contrario: se le muestran al programa miles de fotos con su respuesta ("gato", "no es gato") y el propio programa encuentra el patrón que las distingue.</p>
      <p>A esto se le llama <strong>inteligencia artificial</strong> (IA): programas que realizan tareas que normalmente asociamos con la inteligencia humana, como reconocer imágenes, entender el lenguaje o hacer recomendaciones, y que logran esto aprendiendo de datos. Según el Parlamento Europeo, es la habilidad de una máquina de presentar capacidades humanas como el razonamiento, el aprendizaje y la creatividad. Los <em>datos</em> son la información que recibe: textos, fotos, sonidos o números, que a veces llegan por sensores como una cámara.</p>
      <p>El diagrama muestra la diferencia. En un programa común entran reglas y datos, y salen respuestas. En la IA entran datos y respuestas de ejemplo, y lo que sale son las reglas, o mejor dicho un patrón, que luego sirve para contestar casos nuevos.</p>
      ${REGLAS}
      <p>La forma exacta de aprender, con números y ajustes, se verá en la lección "Aprendizaje automático" (en inglés, <span lang="en">machine learning</span>). Por ahora basta la idea: aprender de ejemplos en lugar de seguir reglas escritas.</p>
      <h3>¿Una IA piensa como una persona?</h3>
      <p>No. Una IA no entiende ni siente lo que hace. Encuentra patrones en los datos con los que se le entrenó, y por eso puede equivocarse con algo raro que nunca vio. Es una herramienta muy útil, pero no una mente. Si el teclado sugiere una palabra que no tiene sentido, no es que "se haya confundido" como una persona: el patrón no encajó.</p>
      <h3>IA estrecha e IA general</h3>
      <p>Toda la IA que existe hoy es <strong>IA estrecha</strong> (también llamada IA débil): está diseñada para una tarea específica. El programa que reconoce gatos no sabe traducir, y el que traduce no sabe jugar ajedrez. La <em>IA general</em> sería una que pudiera hacer cualquier tarea intelectual que haga una persona. Todavía es solo una idea que se estudia, no algo que ya exista.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que una IA que escribe o conversa "entiende" lo que dice. Hace tareas parecidas a las de una persona, pero lo logra por otro camino, con patrones. Por eso conviene revisar lo que responde.</p>`,
    ejemplo: `
      <p>Quieres separar el correo basura del normal. Veamos las dos maneras con seis correos.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Correo</th><th>Es</th><th>La regla dice</th></tr></thead>
        <tbody>
          <tr><td>1. Premio gratis</td><td>Basura</td><td>Basura, acierta</td></tr>
          <tr><td>2. Tarea de mañana</td><td>Normal</td><td>Normal, acierta</td></tr>
          <tr><td>3. Problema con tu cuenta</td><td>Basura</td><td>Normal, falla</td></tr>
          <tr><td>4. Reunión del club</td><td>Normal</td><td>Normal, acierta</td></tr>
          <tr><td>5. Descuento solo hoy</td><td>Basura</td><td>Normal, falla</td></tr>
          <tr><td>6. Fotos gratis de la fiesta</td><td>Normal</td><td>Basura, falla</td></tr>
        </tbody>
      </table></div>
      <ol class="pasos-ej">
        <li>Primero aplica la regla "si dice gratis, es basura" y anota si acertó. Acertó en 1, 2 y 4: 3 de 6.</li>
        <li>Calcula el acierto: 3 de 6 es la mitad, 50%. Se le escaparon el 3 y el 5, y marcó mal el 6. Arreglarla exige más reglas a mano, cada una con excepciones.</li>
        <li>Ahora mira la otra manera. Le das miles de correos ya marcados, y él busca qué se repite en cada grupo. Así descubre patrones que nadie pensó en escribir.</li>
      </ol>
      <p>Resultado: <span class="resultado">3 de 6 (50%)</span>. Las cifras son de ejemplo.</p>
      <p class="nota"><strong>Error común:</strong> creer que la IA nunca falla. Con pocos ejemplos, o muy parecidos, también se equivoca.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál describe mejor a un algoritmo?</p>', opciones: ['Una máquina que piensa como una persona', 'Una base de datos con fotos', 'Un aparato que se conecta a internet', 'Una receta de pasos que se ejecutan en orden'], correcta: 3,
        pista: '<p>Piensa en una receta de cocina.</p>',
        solucion: '<p>Un algoritmo es una lista de pasos ordenados para resolver algo. Una calculadora y una IA usan algoritmos, pero el algoritmo en sí no piensa.</p>' },
      { tipo: 'opciones', enunciado: '<p>En un programa común, ¿qué escribe una persona a mano?</p>', opciones: ['Las respuestas de todos los casos', 'Los patrones que descubrió la máquina', 'Las reglas que el programa debe seguir', 'Las fotos de ejemplo'], correcta: 2,
        pista: '<p>Mira la fila de arriba del diagrama: ¿qué entra junto con los datos?</p>',
        solucion: '<p>En un programa común las reglas las escribe una persona y el programa las sigue. En la IA, en cambio, esas reglas o patrones salen de los ejemplos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas tareas conviene más resolver con IA que con reglas escritas a mano?</p>', opciones: ['Sumar dos números', 'Reconocer a un gato en fotos muy distintas', 'Convertir pesos a otra moneda con un precio fijo', 'Contar las letras de una palabra'], correcta: 1,
        pista: '<p>Busca la tarea en la que es muy difícil describir todas las reglas.</p>',
        solucion: '<p>Los gatos aparecen en infinitas posturas y tamaños, así que es más fácil mostrar muchos ejemplos que escribir las reglas. Las otras tareas tienen reglas exactas y sencillas.</p>' },
      { tipo: 'texto', enunciado: '<p>La IA que existe hoy hace una sola tarea. ¿Cómo se llama este tipo de IA? Escribe una palabra: estrecha o débil.</p>', respuestas: ['estrecha', 'ia estrecha', 'debil', 'ia debil', 'inteligencia artificial estrecha', 'inteligencia artificial debil'],
        pista: '<p>Se le llama así porque su campo de acción es pequeño y específico.</p>',
        solucion: '<p>Se llama <strong>IA estrecha</strong> o débil. La IA general, capaz de hacer cualquier tarea intelectual humana, todavía no existe.</p>' },
      { tipo: 'numero', enunciado: '<p>Un filtro revisó 20 correos de ejemplo y acertó en 15. ¿Qué porcentaje de aciertos tuvo? (cifras de ejemplo)</p>', respuesta: 15 / 20 * 100,
        pista: '<p>Divide los aciertos entre el total y multiplica por 100.</p>',
        solucion: '<p>15 ÷ 20 = 0.75, y 0.75 × 100 = <strong>75%</strong>. Es la misma idea de la lección "Porcentajes".</p>' },
      { tipo: 'opciones', enunciado: '<p>Un chatbot responde con mucha seguridad una fecha equivocada. ¿Qué es lo más sensato?</p>', opciones: ['Creerle, porque una IA nunca se equivoca', 'Pensar que la IA lo hizo a propósito', 'Dejar de usar cualquier programa', 'Revisar el dato en una fuente confiable'], correcta: 3,
        pista: '<p>Recuerda que la IA encuentra patrones; no comprueba si algo es verdad.</p>',
        solucion: '<p>La IA puede equivocarse aunque suene segura, porque se basa en patrones y no entiende lo que dice. Contrastar con una fuente confiable es la mejor costumbre.</p>' },
    ],
    fuentes: [PARLAMENTO, WIKI('Inteligencia_artificial_d%C3%A9bil', 'Inteligencia artificial débil'), WIKI('Inteligencia_artificial_general', 'Inteligencia artificial general'), WIKI('Antispam', 'Antispam')],
  });

  // ------------------------------------------------------------------
  const hito = (i, anio, texto, alto) => [
    txt(1.5 + i * 2.2, 3.1, anio),
    { tipo: 'linea', desde: [1.5 + i * 2.2, 2.6], hasta: [1.5 + i * 2.2, 2.3] },
    txt(1.5 + i * 2.2, alto ? 3.9 : 1.5, texto),
  ];
  const LINEA = diagrama([0, 14], [0.5, 6], [
    ...flecha([0.3, 2.45], [13.6, 2.45]),
    ...hito(0, '1950', 'Prueba de Turing', true),
    ...hito(1, '1956', 'Dartmouth', false),
    ...hito(2, '1997', 'Deep Blue', true),
    ...hito(3, '2012', 'ImageNet', false),
    ...hito(4, '2016', 'AlphaGo', true),
    ...hito(5, '2022', 'Chatbot público', false),
  ], 'Línea del tiempo que avanza de izquierda a derecha con seis hitos, no a escala: 1950, prueba de Turing; 1956, taller de Dartmouth; 1997, Deep Blue; 2012, ImageNet; 2016, AlphaGo; 2022, un chatbot al alcance del público.');

  L('Breve historia de la IA', {
    objetivo: 'Ubicar en el tiempo los hitos principales de la inteligencia artificial, desde 1950 hasta 2022, y explicar por qué avanzó a saltos.',
    vidaReal: `
      <p>Las noticias hablan de la IA como si hubiera aparecido de un día para otro. Conocer su historia te ayuda a ver que es el resultado de muchos años de trabajo, con épocas de entusiasmo y de decepción. Así puedes juzgar con calma, sin asustarte ni dejarte llevar, las promesas nuevas, tanto las exageradas como las que dicen que todo es una moda pasajera.</p>`,
    explicacion: `
      <p>Las computadoras personales llegaron mucho después de que la gente se preguntara si una máquina podría pensar. La historia de la IA es la de esa pregunta, y se cuenta mejor con unos pocos hitos.</p>
      <h3>1950 y 1956: la pregunta y el nombre</h3>
      <p>En 1950, el matemático británico Alan Turing publicó un ensayo titulado <span lang="en">Computing Machinery and Intelligence</span>. En él propuso un juego que hoy se conoce como la <strong>prueba de Turing</strong>: un evaluador lee o sostiene una conversación solo por escrito, con un teclado y una pantalla, entre una persona y una máquina que no ve. Si no logra distinguir con acierto cuál es la máquina, se dice que la máquina pasó la prueba. La idea sirvió para cambiar una pregunta difícil, si la máquina piensa, por otra más fácil de comprobar: si puede comportarse como una persona.</p>
      <p>En 1956, un grupo de investigadores se reunió en un taller en la Universidad de Dartmouth, en Estados Unidos, organizado por John McCarthy y Marvin Minsky. Ahí John McCarthy introdujo el nombre "inteligencia artificial", y por eso se considera el momento en que nació como disciplina académica.</p>
      <h3>Épocas de entusiasmo y de frío</h3>
      <p>Después de Dartmouth hubo mucho optimismo, pero las máquinas de entonces eran lentas y casi no había datos. Los resultados no llegaron tan rápido como se prometió, y el dinero y el interés se retiraron. A esas épocas se les llama <strong>inviernos de la IA</strong>. Hubo dos grandes: de 1974 a 1980 y de 1987 a 1993. Cada vez que parecía que todo se detenía, nuevos avances traían de vuelta la atención.</p>
      <h3>Del ajedrez a las imágenes y al lenguaje</h3>
      <p>En mayo de 1997, la computadora Deep Blue, de IBM, ganó una serie de seis partidas de ajedrez contra el campeón mundial Garri Kaspárov, por 3.5 a 2.5. Según IBM, fue la primera vez que un sistema de cómputo derrotó a un campeón mundial en vigor en un match con las reglas de tiempo de un torneo. Mostró que una computadora podía superar a un campeón en una tarea difícil.</p>
      <p>En 2012 llegó otro salto. Un modelo llamado AlexNet ganó el concurso ImageNet, que pide reconocer objetos en imágenes, con un margen de error mucho menor que el segundo lugar. ImageNet es una base de datos de millones de imágenes que voluntarios etiquetaron una por una. Ese año se juntaron tres cosas: muchos datos, tarjetas gráficas (GPU) que aceleran las cuentas y redes neuronales, un tipo de programa que se verá en esta materia. A partir de ahí crecieron el dinero y el interés.</p>
      ${LINEA}
      <p>En marzo de 2016, un programa llamado AlphaGo derrotó 4 a 1 al jugador profesional Lee Sedol en el juego de go, que muchos especialistas en IA consideran más exigente que el ajedrez. Se comparó con lo ocurrido en 1997 con Deep Blue. En 2017 apareció el artículo "<span lang="en">Attention Is All You Need</span>", que presentó el <em>transformer</em>, una forma de organizar un modelo basada solo en mecanismos de atención. Después de 2017 el crecimiento se aceleró aún más. Y el 30 de noviembre de 2022, un chatbot, es decir, un programa con el que se conversa por escrito, quedó al alcance del público general.</p>
      <h3>Por qué avanzó a saltos</h3>
      <p>Cada salto necesitó dos cosas que antes faltaban: más datos y computadoras más potentes. Por eso hubo promesas, decepciones y regresos en lugar de una subida constante.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que la IA nació en 2022. Ese año solo llegó al público general algo que se venía construyendo desde 1956.</p>`,
    ejemplo: `
      <p>¿Cuántos años pasaron entre los hitos de 1956, 1997 y 2016?</p>
      <ol class="pasos-ej">
        <li>Primero calcula el tiempo entre Dartmouth (1956) y Deep Blue (1997): 1997 − 1956 = 41 años. En ese lapso hubo dos inviernos de la IA.</li>
        <li>Después calcula de Deep Blue (1997) a AlphaGo (2016): 2016 − 1997 = 19 años. El intervalo se acortó a menos de la mitad, porque había más datos y computadoras más potentes.</li>
        <li>Comprueba sumando los dos intervalos: 41 + 19 = 60. Y restando directo, 2016 − 1956 = 60. Coinciden, así que el cálculo es correcto.</li>
      </ol>
      <p>Resultado: <span class="resultado">41 años y 19 años, en total 60</span>.</p>
      <p class="nota"><strong>Error común:</strong> contar el año de inicio y el final como si fueran dos años enteros. Para saber cuánto tiempo pasó, se restan los años, no se cuentan.</p>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Alan Turing propuso su prueba en 1950 y el taller de Dartmouth fue en 1956. ¿Cuántos años pasaron entre los dos hechos?</p>', respuesta: 1956 - 1950,
        pista: '<p>Resta el año menor al mayor.</p>',
        solucion: '<p>1956 − 1950 = <strong>6 años</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Deep Blue ganó en 1997 y el modelo que ganó ImageNet fue en 2012. ¿Cuántos años pasaron?</p>', respuesta: 2012 - 1997,
        pista: '<p>Resta 1997 a 2012.</p>',
        solucion: '<p>2012 − 1997 = <strong>15 años</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>El primer gran invierno de la IA fue de 1974 a 1980. ¿Cuántos años duró?</p>', respuesta: 1980 - 1974,
        pista: '<p>Resta el año en que terminó al año en que empezó.</p>',
        solucion: '<p>1980 − 1974 = <strong>6 años</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es un invierno de la IA?</p>', opciones: ['Una época en que la IA se usó solo en climas fríos', 'Una época de menos dinero e interés después de promesas que no se cumplieron', 'El nombre de un programa de ajedrez', 'Un tipo de computadora muy potente'], correcta: 1,
        pista: '<p>Piensa en el invierno como una época de poca actividad.</p>',
        solucion: '<p>Los inviernos de la IA fueron períodos en que el dinero y el interés bajaron porque los resultados no llegaron tan rápido como se esperaba.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué hecho ocurrió en 1956?</p>', opciones: ['Turing publicó su ensayo', 'Deep Blue ganó a Kaspárov', 'El taller de Dartmouth, donde nació el nombre "inteligencia artificial"', 'AlphaGo ganó al go'], correcta: 2,
        pista: '<p>Mira la línea del tiempo: ¿qué hito está justo después de 1950?</p>',
        solucion: '<p>En 1956 se realizó el taller de Dartmouth. Turing publicó en 1950, Deep Blue ganó en 1997 y AlphaGo en 2016.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el avance de la IA fue a saltos y no constante?</p>', opciones: ['Porque nadie se interesó en el tema', 'Porque hacían falta más datos y computadoras más potentes', 'Porque las computadoras de antes eran más rápidas', 'Porque solo se podía estudiar una vez al año'], correcta: 1,
        pista: '<p>Recuerda lo que se juntó en 2012.</p>',
        solucion: '<p>Cada salto dependió de tener más datos y más poder de cálculo. Mientras faltaron, el avance se frenó.</p>' },
    ],
    fuentes: [
      WIKI_IA, WIKI_EN('History_of_artificial_intelligence', 'History of Artificial Intelligence'), WIKI('Prueba_de_Turing', 'Prueba de Turing'), WIKI_HIST,
      WIKI('Invierno_IA', 'Invierno IA'),
      { nombre: 'IBM, Deep Blue en la historia de IBM (en inglés)', url: 'https://www.ibm.com/history/deep-blue' },
      WIKI_EN('Deep_Blue_(chess_computer)', 'Deep Blue (chess computer)'), WIKI_EN('AlphaGo_versus_Lee_Sedol', 'AlphaGo versus Lee Sedol'), WIKI('AlphaGo_versus_Lee_Sedol', 'AlphaGo versus Lee Sedol'),
      { nombre: 'Attention Is All You Need - arXiv (en inglés)', url: 'https://arxiv.org/abs/1706.03762' },
      WIKI('ChatGPT', 'ChatGPT'),
    ],
  });

  // ------------------------------------------------------------------
  L('La IA en tu vida diaria', {
    objetivo: 'Reconocer usos cotidianos de la inteligencia artificial, saber qué datos tuyos necesitan y distinguir cuándo una acción usa IA y cuándo no.',
    vidaReal: `
      <p>Detectar la IA en tu día te permite saber qué datos tuyos están en juego cuando usas el celular, la computadora o un aparato inteligente. Te ayuda a elegir con más calma qué permisos dar, a entender por qué un programa te sugiere cierta cosa y a no confiar a ciegas cuando se equivoca, porque a veces lo hace, igual que cualquier herramienta.</p>`,
    explicacion: `
      <p>Imagina una mañana cualquiera. Suena la alarma, desbloqueas el celular, mandas un mensaje y buscas algo en internet. Sin darte cuenta, quizá usaste inteligencia artificial varias veces antes del desayuno.</p>
      <h3>Dónde aparece la IA</h3>
      <p>Estos son algunos de los lugares donde más se usa. Para cada uno, la tabla dice qué haces tú, qué hace la IA y qué datos necesita para lograrlo:</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Lo que haces</th><th>Qué hace la IA</th><th>Qué datos usa</th></tr></thead>
        <tbody>
          <tr><td>Desbloqueas el celular con la cara</td><td>Identifica a la persona</td><td>La imagen de tu rostro que capta la cámara</td></tr>
          <tr><td>Dictas un mensaje con la voz</td><td>Convierte lo que dices en texto</td><td>El sonido de tu voz</td></tr>
          <tr><td>Recibes tu correo</td><td>Aparta los mensajes basura</td><td>El contenido de los correos</td></tr>
          <tr><td>Buscas algo en internet</td><td>Ordena resultados relevantes</td><td>Lo que tú y otras personas buscan y eligen</td></tr>
          <tr><td>Lees un letrero en otro idioma</td><td>Traduce el texto</td><td>El texto escrito o hablado</td></tr>
        </tbody>
      </table></div>
      <h3>Reconocimiento de voz y de rostro</h3>
      <p>El <strong>reconocimiento de voz</strong> (llamado también reconocimiento del habla) permite que una máquina interprete el lenguaje hablado y lo convierta en texto o en una orden. Por eso puedes dictar un mensaje o pedirle algo a un asistente de voz, un programa que responde preguntas y ayuda a organizar tus rutinas. El reconocimiento facial es parecido, pero con imágenes: una aplicación que identifica personas por su rostro, como cuando el celular se desbloquea al verte.</p>
      <h3>Recomendaciones</h3>
      <p>Un <strong>sistema de recomendación</strong> es un programa que sugiere cosas que quizá te gusten, como un video, una canción o un producto, a partir de lo que tú y otras personas ya han visto o elegido. Según el Parlamento Europeo, los motores de búsqueda aprenden de la gran cantidad de datos que proporcionan sus usuarios para ofrecer resultados relevantes. Entre más usas un servicio, más ejemplos tiene el programa para acertar.</p>
      <h3>Los traductores y los filtros</h3>
      <p>Los traductores de idiomas, tanto de texto escrito como hablado, usan IA para ofrecer y mejorar sus traducciones. Los filtros de correo clasifican automáticamente los mensajes, como viste en "Qué es la inteligencia artificial". En todos los casos, el programa aprendió a hacer esa tarea con muchos ejemplos.</p>
      <h3>La IA usa tus datos</h3>
      <p>Mira la última columna de la tabla. Para funcionar, la IA necesita datos: lo que ves, dónde estás, cómo suena tu voz. Eso la hace útil, pero también significa que conviene saber qué compartes. En la lección "Privacidad: qué no compartir", de otra unidad, se estudia cómo cuidar esos datos. Y los fraudes con voces o imágenes falsas se tratan en "Fraudes comunes y cómo evitarlos", de Finanzas personales.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que todo lo digital usa IA. Una alarma que suena a la hora fijada o una calculadora siguen reglas exactas y no aprenden de datos. Para decidir, pregúntate: ¿esta tarea se aprendió de ejemplos o solo sigue reglas fijas?</p>`,
    ejemplo: `
      <p>En tu mañana hiciste 10 acciones: apagar la alarma, desbloquear el celular con la cara, desayunar, dictar un mensaje, recibir el correo sin basura, caminar a la escuela, buscar una tarea en internet, traducir un letrero, saludar a un amigo y guardar tus llaves. ¿Qué porcentaje usó IA? (cifras de ejemplo)</p>
      <ol class="pasos-ej">
        <li>Primero separa las acciones que usaron IA. Son las que reconocen, clasifican o traducen aprendiendo de ejemplos: desbloquear con la cara, dictar, filtrar el correo, buscar en internet y traducir. Son 5.</li>
        <li>Las otras 5 no usan IA: la alarma sigue una hora fija, y desayunar, caminar, saludar y guardar las llaves no son tareas de un programa.</li>
        <li>Ahora calcula la parte entre el total: 5 ÷ 10 = 0.5. Multiplicado por 100 da 50%.</li>
        <li>Comprueba: 5 y 5 suman 10, y 5 de 10 es la mitad, o sea 50%.</li>
      </ol>
      <p>Resultado: <span class="resultado">50%</span>. Las cifras son de ejemplo.</p>
      <p class="nota"><strong>Error común:</strong> contar la alarma como IA solo porque está en el celular. Que el aparato sea inteligente no significa que cada función aprenda de datos.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas acciones usa reconocimiento de voz?</p>', opciones: ['Dictar un mensaje hablando', 'Escribir un mensaje con el teclado', 'Programar una alarma a las 7:00', 'Apagar la pantalla'], correcta: 0,
        pista: '<p>El reconocimiento de voz convierte lo que dices en texto.</p>',
        solucion: '<p>Al dictar, un programa interpreta el sonido de tu voz y lo escribe. Las demás acciones no necesitan interpretar el habla.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué dato necesita sobre todo el desbloqueo con la cara?</p>', opciones: ['El sonido de tu voz', 'La imagen de tu rostro captada por la cámara', 'Tu lista de compras', 'La hora del día'], correcta: 1,
        pista: '<p>Mira la tabla: ¿qué dato corresponde a esa fila?</p>',
        solucion: '<p>El reconocimiento facial identifica a las personas a partir de la imagen de su rostro.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es un sistema de recomendación?</p>', opciones: ['Un programa que borra tus mensajes', 'Un programa que sugiere cosas que quizá te gusten según lo que ya hiciste', 'Un aparato para escuchar música', 'Un manual de instrucciones'], correcta: 1,
        pista: '<p>Piensa en cómo una aplicación de videos te propone qué ver después.</p>',
        solucion: '<p>Un sistema de recomendación sugiere videos, canciones o productos a partir de lo que tú y otras personas han visto o elegido.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas acciones NO usa IA?</p>', opciones: ['Traducir un letrero con la cámara', 'Apartar el correo basura', 'Una alarma que suena a las 7:00 por una hora fija', 'Dictar un mensaje'], correcta: 2,
        pista: '<p>Busca la que solo sigue una regla fija y no aprende de datos.</p>',
        solucion: '<p>La alarma solo compara la hora con la que programaste, una regla exacta. Las otras tres tareas se aprendieron de muchos ejemplos.</p>' },
      { tipo: 'numero', enunciado: '<p>En una mañana hiciste 8 acciones y 3 usaron IA. ¿Qué porcentaje usó IA? (cifras de ejemplo)</p>', respuesta: 3 / 8 * 100,
        pista: '<p>Divide las acciones con IA entre el total y multiplica por 100.</p>',
        solucion: '<p>3 ÷ 8 = 0.375, y 0.375 × 100 = <strong>37.5%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si 6 de tus 12 acciones de la mañana usaron IA, ¿cuántas acciones NO la usaron? (cifras de ejemplo)</p>', respuesta: 12 - 6,
        pista: '<p>Resta las que usaron IA del total.</p>',
        solucion: '<p>12 − 6 = <strong>6 acciones</strong> no usaron IA. Es la mitad, 50%.</p>' },
    ],
    fuentes: [PARLAMENTO, WIKI('Sistema_de_reconocimiento_facial', 'Sistema de reconocimiento facial'), WIKI('Reconocimiento_del_habla', 'Reconocimiento del habla'), WIKI('Sistema_de_recomendaci%C3%B3n', 'Sistema de recomendación'), WIKI('Antispam', 'Antispam'), WIKI_IA],
  });
})();
