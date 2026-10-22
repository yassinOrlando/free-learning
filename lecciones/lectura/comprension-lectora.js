// Lectura · Unidad 2: Comprensión lectora.
// Formato de cada lección: ver .claude/docs/formato-leccion.md. Revisar con: node verificar.js
// Los datos de las fuentes oficiales van con su país y su año; las de apoyo (Wikipedia) llevan "(apoyo)".
// Las cifras de los ejemplos son de ejemplo.
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('lectura', titulo, datos);
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
  const caja = (x0, y0, x1, y1) => ({ tipo: 'poligono', puntos: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], relleno: true });
  const diagrama = (x, y, figuras, descripcion) => G({ x, y, figuras, descripcion, proporcional: true, ejes: false });

  const CBC = { nombre: 'Ministerio de Educación de la Nación (Argentina): CBC, Educación General Básica, Lengua', url: 'https://cfe.educacion.gob.ar/documentos/cbc/egb/lengua.pdf' };
  const WIKI_EXPOSITIVO = { nombre: 'Wikipedia en español: Texto expositivo (apoyo)', url: 'https://es.wikipedia.org/wiki/Texto_expositivo' };
  const WIKI_VOCABULARIO = { nombre: 'Wikipedia en español: Vocabulario (apoyo)', url: 'https://es.wikipedia.org/wiki/Vocabulario' };
  const WIKI_INFERENCIA = { nombre: 'Wikipedia en español: Inferencia (apoyo)', url: 'https://es.wikipedia.org/wiki/Inferencia' };

  // Estructura de un texto: la idea principal manda, las ideas secundarias la apoyan, los detalles ilustran.
  const JERARQUIA = diagrama([0, 12], [0, 9], [
    caja(2.2, 7.0, 9.8, 8.8), txt(6, 8.35, 'Idea principal'), txt(6, 7.7, 'lo que el texto dice que importa'),
    caja(0.4, 4.2, 5.6, 6.0), txt(3, 5.5, 'Idea secundaria 1'), txt(3, 4.85, 'las polinizan'),
    caja(6.4, 4.2, 11.6, 6.0), txt(9, 5.5, 'Idea secundaria 2'), txt(9, 4.85, 'hay que cuidarlas'),
    caja(0.4, 1.0, 11.6, 2.8), txt(6, 2.3, 'Detalles'), txt(6, 1.65, 'una obrera visita cientos de flores al día'),
    ...flecha([5.2, 7.0], [3.2, 6.0]),
    ...flecha([6.8, 7.0], [8.8, 6.0]),
    ...flecha([3, 4.2], [3, 2.8]),
    ...flecha([9, 4.2], [9, 2.8]),
  ], 'Diagrama de tres niveles. Arriba, una caja con la idea principal y la frase «lo que el texto dice que importa». En el centro, dos cajas: a la izquierda, «Idea secundaria 1: las polinizan», y a la derecha, «Idea secundaria 2: hay que cuidarlas». Abajo, una caja ancha con «Detalles: una obrera visita cientos de flores al día». Dos flechas bajan de la idea principal a las dos ideas secundarias, y dos flechas más bajan de cada idea secundaria a los detalles.');

  // Las cuatro pistas del contexto, alrededor de la palabra que no se conoce.
  const PISTAS = diagrama([0, 12], [0, 9], [
    caja(0.3, 6.9, 5.3, 8.6), txt(2.8, 8.05, 'La frase'), txt(2.8, 7.4, 'quién hace qué'),
    caja(6.7, 6.9, 11.7, 8.6), txt(9.2, 8.05, 'El tema'), txt(9.2, 7.4, 'de qué va el texto'),
    caja(4.4, 3.5, 7.6, 5.5), txt(6, 4.95, '«ladera»'), txt(6, 4.3, 'la palabra nueva'),
    caja(0.3, 0.4, 5.3, 2.1), txt(2.8, 1.65, 'Las palabras'), txt(2.8, 1.0, 'que están al lado'),
    caja(6.4, 0.4, 11.8, 2.1), txt(9.1, 1.65, 'El ejemplo'), txt(9.1, 1.0, 'lo que viene después'),
    ...flecha([5.3, 6.9], [4.6, 5.5]),
    ...flecha([6.7, 6.9], [7.4, 5.5]),
    ...flecha([5.3, 2.1], [4.6, 3.5]),
    ...flecha([6.4, 2.1], [7.4, 3.5]),
  ], 'Diagrama con una caja en el centro, «ladera», que es la palabra nueva. La rodean cuatro cajas: arriba a la izquierda, «La frase: quién hace qué»; arriba a la derecha, «El tema: de qué va el texto»; abajo a la izquierda, «Las palabras que están al lado»; y abajo a la derecha, «El ejemplo: lo que viene después». Las cuatro flechas apuntan hacia la caja del centro.');

  // ------------------------------------------------------------------
  L('Idea principal e ideas secundarias', {
    objetivo: 'Distinguir el tema de un texto, encontrar la idea principal y separar las ideas secundarias y los detalles que la apoyan.',
    explicacion: `
      <p>Empieza por un texto sobre las abejas. Si alguien te pregunta de qué va, contestas sin pensar: de las abejas. Y no mentiste, pero tampoco entendiste el texto. Un texto no dice todo con la misma fuerza: hay una idea que manda y otras que la apoyan.</p>
      <p>La primera pregunta es por el <strong>tema</strong> (<span lang="en">topic</span>): de qué trata el texto, dicho en pocas palabras. El tema del texto de las abejas son las abejas y su importancia.</p>
      <p>La segunda pregunta es más fina: qué es lo más importante que el texto dice sobre ese tema. Eso es la <strong>idea principal</strong> (<span lang="en">main idea</span>). En este texto, la idea principal es que sin las abejas no habría comida para casi todo el mundo.</p>
      <p>Después vienen las <strong>ideas secundarias</strong> (<span lang="en">supporting ideas</span>): las ideas que apoyan y explican la principal. Aquí son dos: que las abejas polinizan las flores y que hay que cuidarlas porque cada año hay menos colmenas. Y debajo de esas dos hay detalles, que ilustran sin sostener el mensaje: que una obrera visita cientos de flores al día y que las abejas viven en colmenas.</p>
      <p>Los contenidos básicos comunes de Lengua del Ministerio de Educación de la Nación (Argentina, documento sin fecha de publicación) llaman a este trabajo jerarquizar la información y discriminar la información: cada texto tiene elementos nucleares, que son los que sostienen el mensaje, y elementos periféricos, que solo lo ilustran. Reconocer esa estructura es lo que permite detectar el tema de un texto y después resumirlo.</p>
      <h3>El truco de dos pasos</h3>
      <p>Cuando leas un texto largo, haz siempre las mismas dos preguntas, y en este orden. Primero, de qué va, para saber el tema. Segundo, qué es lo más importante que dice sobre ese tema, para sacar la idea principal. Si solo sabes el tema, tienes los datos sueltos: sabes de qué habla, pero no qué quiere decir. Y si sabes la idea principal, ya tienes el mensaje, y todo lo demás cuelga de ella.</p>
      <p>Este es el texto que vamos a usar. El autor informa de forma objetiva sobre lo que hacen las abejas y sobre por qué importan, así que es un texto expositivo; los datos son de ejemplo:</p>
      <div class="nota texto-muestra"><p>Las abejas parecen pequeñas, pero sin ellas no habría comida para casi todo el mundo. Las abejas polinizan las flores, y por eso los campos y los árboles frutales dan fruto. Una obrera visita cientos de flores al día. Las abejas viven en colmenas, y cada año hay menos, así que hay que cuidarlas.</p></div>
      <p>Y esta es la estructura que tiene, que es la misma en cualquier texto:</p>
      ${JERARQUIA}
      <div class="tabla-wrap"><table>
        <thead><tr><th>Lo que buscas</th><th>En el texto de las abejas</th></tr></thead>
        <tbody>
          <tr><th scope="row">Tema</th><td>Las abejas y por qué importan</td></tr>
          <tr><th scope="row">Idea principal</th><td>Sin las abejas no habría comida para casi todo el mundo</td></tr>
          <tr><th scope="row">Ideas secundarias</th><td>Polinizan las flores, y hay que cuidarlas porque cada año hay menos colmenas</td></tr>
          <tr><th scope="row">Detalles</th><td>Una obrera visita cientos de flores al día, y las abejas viven en colmenas</td></tr>
        </tbody>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> quedarte con el tema y creer que ya has entendido el texto. Decir que va de las abejas es el principio, no el final: si solo puedes decir eso, tienes la etiqueta del texto, pero no su mensaje.</p>
      <p>En "Tipos de texto: narrativo, expositivo, argumentativo e instructivo" viste que un texto expositivo organiza la información para que se entienda bien. Eso es justo lo que te permite ahora sacarle una idea principal: la estructura ya está, solo falta reconocerla.</p>`,
    ejemplo: `
      <p>Vamos a trabajar el texto de las abejas, paso a paso. Los datos son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Pregunta uno, el tema: de qué va el texto. De las abejas y de su importancia para la comida.</li>
        <li>Pregunta dos, la idea principal: qué es lo más importante que dice. Que sin las abejas no habría comida para casi todo el mundo. Es lo que el texto quiere que te lleves.</li>
        <li>Busca las ideas secundarias, que son las que apoyan y explican la principal. Aquí hay dos: que las abejas polinizan las flores y que hay que cuidarlas porque cada año hay menos colmenas.</li>
        <li>Deja aparte los detalles: la obrera que visita cientos de flores al día y las colmenas donde viven. Ayudan a entender, pero no sostienen el mensaje.</li>
      </ol>
      <p>Compruébalo por otro camino: si alguien solo puede decir que va de las abejas, todavía no ha entendido el texto.</p>
      <p class="nota"><strong>Error común:</strong> señalar como idea principal el primer dato o la frase más bonita. La idea principal no es la primera frase, sino la que explica de qué trata el texto entero.</p>`,
    vidaReal: `
      <p>Saber cuál es la idea principal de un texto te ahorra trabajo en muchos momentos:</p>
      <ul>
        <li>En un examen, la respuesta correcta suele ser la que encaja con el texto entero, no con un detalle suelto.</li>
        <li>En un aviso del colegio, lo que está en negrita o en la primera frase suele ser lo que de verdad importa.</li>
        <li>Y cuando te piden contar el texto en pocas líneas, la idea principal es el punto de partida.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Lee este texto: «Las abejas parecen pequeñas, pero sin ellas no habría comida para casi todo el mundo. Las abejas polinizan las flores, y por eso los campos dan fruto. Una obrera visita cientos de flores al día». ¿Cuál es la idea principal del texto?</p>',
        opciones: ['Que una obrera visita cientos de flores al día', 'Que sin las abejas no habría comida para casi todo el mundo', 'Que las abejas polinizan las flores', 'Que las abejas parecen pequeñas'],
        correcta: 1,
        pista: '<p>Pregunta qué es lo más importante que el texto dice, y no qué datos suelta.</p>',
        solucion: '<p>La idea principal es que <strong>sin las abejas no habría comida para casi todo el mundo</strong>. Es la segunda opción. Lo demás son ideas secundarias o detalles: que polinizan las flores y que una obrera visita cientos de flores al día apoyan ese mensaje, y que parezcan pequeñas es solo el contraste con el que empieza el texto.</p>' },
      { tipo: 'opciones', enunciado: '<p>Lee este texto inventado sobre el patio de un colegio; las cifras son de ejemplo: «Casi nadie usa las papeleras, y por eso el patio del colegio se llena de papeles. Los papeles que se tiran al suelo terminan en la basura y en los desagües. Cada año se recogen unos 200 kilos de papel del suelo. El papel que se queda en el patio tapa los desagües y la lluvia lo lleva al río. En este colegio hay papeleras en cada esquina, pero casi están vacías». ¿Cuál de estas afirmaciones es la idea principal y no una idea secundaria o un detalle?</p>',
        opciones: ['Casi nadie usa las papeleras, y por eso el patio del colegio se llena de papeles', 'Cada año se recogen unos 200 kilos de papel del suelo', 'El papel que se queda en el patio tapa los desagües', 'En este colegio hay papeleras en cada esquina'],
        correcta: 0,
        pista: '<p>Busca la afirmación que explica de qué trata el texto entero. Las otras tres son datos que lo apoyan.</p>',
        solucion: '<p>La idea principal es la primera: <strong>casi nadie usa las papeleras, y por eso el patio se llena de papeles</strong>. Los 200 kilos son un dato, los desagües son una consecuencia y las papeleras vacías son un detalle. Todos ayudan, pero ninguno es el mensaje del texto.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama lo más importante que dice un texto sobre su tema? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['idea principal', 'la idea principal', 'idea principal de un texto', 'la idea principal de un texto', 'lo más importante que el texto dice sobre su tema', 'lo más importante que dice el texto'],
        pista: '<p>Son dos palabras: la primera nombra una idea y la segunda dice de qué tipo de idea se trata.</p>',
        solucion: '<p>Se llama <strong>idea principal</strong> (<span lang="en">main idea</span>). Es lo más importante que el texto dice sobre su tema, y es la idea a la que apuntan todas las demás.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena estas afirmaciones del texto del patio, de la más principal a la menos.</p>',
        respuesta: ['Casi nadie usa las papeleras y por eso el patio se llena de papeles', 'El papel que se queda en el patio tapa los desagües', 'Cada año se recogen unos 200 kilos de papel del suelo'],
        pista: '<p>Primero va lo que explica de qué trata el texto, después la consecuencia y al final el dato.</p>',
        solucion: '<p>El orden es: primero, casi nadie usa las papeleras y por eso el patio se llena de papeles; después, el papel que se queda tapa los desagües; y al final, los 200 kilos que se recogen cada año. Así se ve la estructura: la idea principal manda, la idea secundaria la apoya y el dato la ilustra.</p>' },
      { tipo: 'numero', enunciado: '<p>El texto de las abejas tiene 2 ideas secundarias y 2 detalles que solo ilustran. ¿Cuántos elementos de apoyo tiene en total, sin contar la idea principal?</p>', respuesta: 2 + 2,
        pista: '<p>Sumas las ideas secundarias y los detalles.</p>',
        solucion: '<p>2 ideas secundarias más 2 detalles son <strong>4 elementos de apoyo</strong>. Con la idea principal, el texto de las abejas tiene cinco piezas: una que manda y cuatro que la sostienen.</p>' },
      { tipo: 'opciones', enunciado: '<p>Lee este texto inventado sobre un puente; las cifras son de ejemplo: «El nuevo puente del río se abrió en marzo. Mide 400 metros y lo usan unos 8 000 coches al día. Antes de construirlo, cruzar el río tardaba una hora; ahora, diez minutos». ¿Cuál es la idea principal y por qué?</p>',
        opciones: ['Que el puente mide 400 metros', 'Que muchos coches lo usan, unos 8 000 al día', 'Que cruzar el río ahora es mucho más rápido que antes', 'Que el puente se abrió en marzo'],
        correcta: 2,
        pista: '<p>Fíjate en la última frase: compara el antes y el ahora. Las otras opciones son datos sueltos.</p>',
        solucion: '<p>La idea principal es la tercera: <strong>cruzar el río ahora es mucho más rápido que antes</strong>. El texto lo dice con dos datos enfrentados, una hora antes y diez minutos ahora, y esa comparación es el mensaje que quiere que te lleves. Los 400 metros, los 8 000 coches y el mes de apertura son datos y detalles que la apoyan, pero el texto no está hablando de ellos.</p>' },
    ],
    fuentes: [CBC, WIKI_EXPOSITIVO],
  });

  // ------------------------------------------------------------------
  L('Deducir palabras por el contexto', {
    objetivo: 'Deducir el significado de una palabra que no conoces usando el texto que la rodea, sin dejar la lectura a mitad.',
    explicacion: `
      <p>En un texto de un museo te sale una palabra que no conoces: «ladera». Si cierras el libro y vas corriendo al diccionario, se acabó la lectura. Pero el texto te está dando la respuesta todo el tiempo, solo que con otras palabras.</p>
      <p>Lo que te da la respuesta se llama el <strong>contexto</strong> (<span lang="en">context</span>): las palabras que rodean a la palabra desconocida y el texto entero donde está. Y el significado que tiene una palabra en un sitio concreto se llama su <strong>sentido</strong> (<span lang="en">meaning</span>), que no siempre es el que le da el diccionario.</p>
      <p>Cuando una palabra no la conoces, el texto te da cuatro pistas. La primera es la frase donde está: quién hace qué y qué le pasa a quién. La segunda es el tema del texto: si el texto va de montañas, la palabra desconocida es de montaña. La tercera son las palabras que la rodean, que a veces son sinónimos y otras veces son contrarios. Y la cuarta es cualquier ejemplo que venga después, porque un ejemplo siempre enseña con cosas concretas.</p>
      <h3>El método en cuatro pasos</h3>
      <p>Con esas cuatro pistas, muchas palabras desconocidas se deducen sin diccionario. Primero, lee la frase entera, sin saltarte nada. Segundo, pregunta de qué va el texto. Tercero, prueba un significado que encaje con el resto de la frase. Y cuarto, si encaja, quédate con ese significado: una palabra tiene un significado en el diccionario y otro sentido aquí, y el contexto decide cuál de los dos vale.</p>
      <p>Los contenidos básicos comunes de Lengua del Ministerio de Educación de la Nación (Argentina, documento sin fecha de publicación) llaman a esto inferencia léxica, y dicen que la selección de las palabras se hace en función del contexto comunicativo. También explican que leer enriquece el vocabulario de reconocimiento, que son las palabras que ya conoces porque las has visto contextualizadas, y que al analizarlas se forman campos léxicos, grupos de palabras que hablan de lo mismo. El vocabulario, por cierto, es el conjunto de palabras de un idioma, o el conjunto de las que conoce una persona, y cada texto es una forma de ampliarlo.</p>
      <p>Las cuatro pistas, alrededor de la palabra que no conoces:</p>
      ${PISTAS}
      <p>Una frase con la palabra desconocida: «la niebla cubría la ladera». Fíjate en que la frase sola ya dice bastante: la niebla cubre superficies, y a una persona no la cubren con niebla.</p>
      <p class="nota"><strong>Trampa común:</strong> cerrar el texto y buscar la palabra en el diccionario antes de haber terminado la frase. También el otro extremo: quedarse con el primer significado que se te ocurre, aunque no encaje con nada de lo que dice el texto.</p>
      <p>El tema del texto es la pista más grande de todas, y por eso conviene sacarlo primero, como viste en "Idea principal e ideas secundarias". Y en "Tipos de texto: narrativo, expositivo, argumentativo e instructivo" viste que un texto instructivo te dice que vas a hacer algo: eso también acota lo que puede ser la palabra desconocida.</p>`,
    ejemplo: `
      <p>En un museo del valle te sale una palabra desconocida en cada frase. El texto es de ejemplo:</p>
      <div class="nota texto-muestra"><p>El recorrido empieza en la sala del valle, donde una maqueta muestra el valle entero con su río, sus pueblos y sus caminos. Desde el mirador se veían las cumbres lejanas, y por la mañana la niebla cubría la ladera.</p></div>
      <ol class="pasos-ej">
        <li>La palabra «maqueta» se deduce por la frase y por el tema: en la sala de un museo hay una maqueta del valle, es decir, un modelo en miniatura del valle para verlo entero de un vistazo.</li>
        <li>La palabra «cumbres» se deduce por la frase: desde el mirador se veían las cumbres lejanas, y lo que se ve desde lo alto son las partes más altas de las montañas.</li>
        <li>La palabra «ladera» se deduce por la frase: la niebla cubría la ladera, porque la niebla cubre superficies y la ladera es la pendiente de la montaña.</li>
      </ol>
      <p>El truco final es este: si un significado encaja con el resto de la frase, es el bueno, y solo después se mira el diccionario.</p>`,
    vidaReal: `
      <p>En la vida real muchas veces hay una palabra que no conoces, y no siempre puedes parar a buscarla:</p>
      <ul>
        <li>En un cartel de una tienda, la palabra rara suele estar junto a otras que te dan la pista.</li>
        <li>En un parte médico, el contexto y el tema te ayudan a entender lo que quiere decir.</li>
        <li>En un texto del colegio, si lees la frase entera, muchas veces puedes deducir la palabra sin ayuda.</li>
        <li>Y en una receta, el paso anterior y el siguiente te dicen qué hace ese utensilio.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>En un texto sobre un volcán: «La lava bajó despacio por la ladera y se quedó fría al llegar al valle». ¿Qué significa «ladera» en esta frase?</p>',
        opciones: ['Una persona que camina despacio', 'La parte de abajo de un recipiente', 'La pendiente de una montaña', 'El fondo de un valle muy hondo'],
        correcta: 2,
        pista: '<p>¿Por dónde baja la lava? Y fíjate en la palabra que va justo después: el valle.</p>',
        solucion: '<p>«Ladera» es <strong>la pendiente de una montaña</strong>. La lava baja por la pendiente hasta el valle, y por eso la respuesta correcta es la tercera. El agua y la niebla bajan por las laderas de las montañas; una persona o un recipiente no tienen ladera.</p>' },
      { tipo: 'opciones', enunciado: '<p>Para deducir el significado de una palabra, ¿cuál de estas NO es una pista del contexto?</p>',
        opciones: ['La frase donde está la palabra', 'El tema del texto', 'El ejemplo que viene después', 'El número de la página donde sale'],
        correcta: 3,
        pista: '<p>Las tres primeras te dicen algo sobre la palabra. La cuarta te dice dónde está, no qué significa.</p>',
        solucion: '<p>El número de la página no es una pista: te dice dónde está la palabra, no qué significa. Las otras tres sí sirven, porque la frase, el tema y el ejemplo que viene después te dan información sobre lo que quiere decir la palabra en ese sitio.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué es el contexto de una palabra? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['contexto', 'el contexto', 'el contexto de una palabra', 'las palabras que rodean a la palabra desconocida y el texto entero donde está', 'las palabras que rodean a una palabra y el texto donde está'],
        pista: '<p>Es una palabra de tres sílabas que empieza por la letra con la que empieza «contar».</p>',
        solucion: '<p>Es el <strong>contexto</strong> (<span lang="en">context</span>): las palabras que rodean a la palabra desconocida y el texto entero donde está. Con el contexto, muchas palabras se deducen sin salir de la lectura.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para deducir el significado de una palabra que no conoces.</p>',
        respuesta: ['Lee la frase entera donde está la palabra', 'Pregunta de qué va el texto', 'Prueba un significado que encaje con la frase', 'Quédate con el que encaja y compruébalo en el diccionario'],
        pista: '<p>Primero lees, después te sitúas, después pruebas y al final confirmas.</p>',
        solucion: '<p>El orden es: lee la frase entera donde está la palabra, pregunta de qué va el texto, prueba un significado que encaje con la frase y, por último, quédate con el que encaja y compruébalo en el diccionario. El diccionario sirve para confirmar, no para decidir.</p>' },
      { tipo: 'numero', enunciado: '<p>El texto del museo tiene 3 palabras desconocidas y en cada una usas 2 pistas del contexto. ¿Cuántas pistas has usado en total?</p>', respuesta: 3 * 2,
        pista: '<p>Multiplicas las palabras desconocidas por las pistas que usas en cada una.</p>',
        solucion: '<p>3 palabras por 2 pistas son <strong>6 pistas</strong>. Con seis pistas se deducen las tres palabras sin necesidad de abrir el diccionario hasta el final.</p>' },
      { tipo: 'opciones', enunciado: '<p>En un texto de ciencias aparece una palabra que no conoces: «El técnico encendió el espectrómetro y anotó el resultado en su cuaderno». ¿Por qué esta palabra es difícil de deducir por el contexto?</p>',
        opciones: ['Porque la palabra es muy larga', 'Porque la frase no dice qué mide ni para qué sirve', 'Porque la palabra no aparece en el diccionario', 'Porque el texto es un texto expositivo'],
        correcta: 1,
        pista: '<p>Fíjate en lo que la frase dice de la palabra, no en cómo está escrita.</p>',
        solucion: '<p>Porque la frase no dice qué mide ni para qué sirve: solo cuenta que el técnico lo encendió y anotó el resultado. Eso basta para saber que es un aparato, pero no qué hace. Aquí el contexto ayuda poco y por eso toca buscarla en el diccionario. Si la frase hubiera dicho que el espectrómetro mide la luz de las estrellas, el contexto bastaba.</p>' },
    ],
    fuentes: [CBC, WIKI_VOCABULARIO],
  });

  // ------------------------------------------------------------------
  L('Inferencias: leer entre líneas', {
    objetivo: 'Distinguir lo que un texto dice de lo que insinúa, y sacar inferencias que se apoyen en una pista concreta.',
    explicacion: `
      <p>Lee este mensaje de celular: «Ya está. No hace falta que vengas». Literalmente son dos frases. Pero quien lo lee sabe mucho más: alguien ha decidido algo y no quiere que le estorben. Lo que el texto dice y lo que el texto significa son dos capas, y leer bien es saltar de una a otra.</p>
      <p>La capa de abajo es lo <strong>literal</strong> (<span lang="en">literal</span>): lo que el texto dice tal cual, sin interpretar. En el mensaje, lo literal es que algo está hecho y que no hace falta que la otra persona venga.</p>
      <p>La capa de arriba es lo <strong>implícito</strong> (<span lang="en">implied</span>): lo que el texto sugiere sin decirlo. En el mensaje, lo implícito es que a alguien le molesta la visita o que ha pasado algo que no quiere contar.</p>
      <p>Y el salto de una capa a la otra es una <strong>inferencia</strong> (<span lang="en">inference</span>): la conclusión que sacas de lo que el texto no dice pero insinúa. Es un proceso: partes de unos datos o de una suposición y llegas a una conclusión que no estaba escrita.</p>
      <h3>Cómo se hace una inferencia</h3>
      <p>Un salto bien hecho se apoya siempre en una pista concreta del texto. Las pistas más útiles son cuatro: lo que el texto omite, el tono con que está escrito, los datos que da y lo que ya sabes del mundo. Si no puedes señalar ninguna, no estás infiriendo: te estás inventando.</p>
      <p>El método tiene cuatro pasos. Escribe primero lo literal, para no confundir lo que dice con lo que crees. Propón después dos o tres lecturas posibles del texto, sin quedarte con la primera. Pregunta cuál de esas lecturas se apoya en una pista que exista en el texto. Y dilo con prudencia, con un «probablemente» o un «parece que», porque una inferencia nunca es una certeza.</p>
      <p>Los contenidos básicos comunes de Lengua del Ministerio de Educación de la Nación (Argentina, documento sin fecha de publicación) distinguen la información literal de la inferencial, y dicen que la lectura no debe agotarse en lo literal: leer supone procesos de inferencia, valoración y crítica, e incluye inferencias léxicas, temáticas y causales, y el reconocimiento de lo que el texto da por supuesto.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Lo que dice el texto</th><th>Lo que sugiere</th><th>La pista que lo apoya</th></tr></thead>
        <tbody>
          <tr><td>«Ya está. No hace falta que vengas»</td><td>Alguien ha decidido algo y no quiere que le estorben</td><td>No da ninguna explicación: lo que omite es justo la explicación</td></tr>
          <tr><td>«El tren sale a las ocho y el andén está lleno»</td><td>El viaje va a ser incómodo y con mucha gente</td><td>El andén lleno es un dato del texto, y ese dato apunta a la multitud</td></tr>
          <tr><td>«El museo cierra a las siete, pero hoy abre hasta las diez»</td><td>Hoy hay algo especial que merece la pena</td><td>El pero marca un cambio, y los cambios se señalan cuando importan</td></tr>
        </tbody>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> estar seguro de una inferencia que no tiene ninguna pista detrás. Si puedes señalar la frase del texto que la sostiene, es una inferencia; si no puedes, es un deseo tuyo, y decirlo como si fuera un dato daña tu credibilidad con quien te lee.</p>
      <p>El mismo salto que hiciste con una palabra desconocida en "Deducir palabras por el contexto" lo haces aquí con un significado entero. Y en "Tipos de texto: narrativo, expositivo, argumentativo e instructivo" viste un caso especial: en un texto expositivo lo que se omite suele ser un dato, no una opinión.</p>`,
    ejemplo: `
      <p>Volvemos al mensaje: «Ya está. No hace falta que vengas». Lo vamos a trabajar por pasos.</p>
      <ol class="pasos-ej">
        <li>Escribe lo literal, sin interpretar: alguien avisa de que algo ya está hecho y de que no hace falta que la otra persona venga. Eso es todo lo que dice el mensaje.</li>
        <li>Propón dos o tres lecturas posibles: está enfadado, se ha equivocado, le da vergüenza, ya no quiere tu ayuda. De momento ninguna gana.</li>
        <li>Pregunta cuál se apoya en una pista del texto: el mensaje es corto y no da explicaciones. Lo que omite es la explicación, y esa es la pista.</li>
        <li>Dilo con prudencia: probablemente ha pasado algo y no quiere hablar de ello, o está molesto. No se puede saber con certeza.</li>
      </ol>
      <p>La diferencia se ve en la última frase. Mal: «no le cae bien». Bien: «parece que está molesto, porque el mensaje es corto y no explica nada».</p>
      <p class="nota"><strong>Error común:</strong> decir la inferencia como si fuera un dato del texto. Si lo escribes sin la pista que la sostiene, cualquiera te puede preguntar de dónde lo has sacado.</p>`,
    vidaReal: `
      <p>Inferir bien es lo que haces sin darte cuenta en muchos momentos:</p>
      <ul>
        <li>Cuando alguien dice «no te preocupes» y suena raro, ya has hecho una inferencia.</li>
        <li>En un chat del grupo, un mensaje corto puede significar muchas cosas y el tono da la pista.</li>
        <li>En una receta, si un paso no viene explicado, lo deduces de lo que hiciste antes.</li>
        <li>Y en las noticias, leer entre líneas te ayuda a ver qué es información y qué es ruido.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Lee el mensaje: «Ya está. No hace falta que vengas». ¿Cuál de estas afirmaciones es literal, es decir, lo que el mensaje dice tal cual?</p>',
        opciones: ['Alguien avisa de que algo está hecho y de que no hace falta venir', 'La persona que lo escribe está enfadada', 'Las dos personas han discutido antes', 'La otra persona no volverá a ser invitada nunca'],
        correcta: 0,
        pista: '<p>Literal es lo que se lee sin interpretarlo. Las otras opciones necesitan una pista que el mensaje no da.</p>',
        solucion: '<p>La afirmación literal es la primera: <strong>alguien avisa de que algo está hecho y de que no hace falta venir</strong>. Las otras tres son inferencias, y se pueden leer en el mensaje, pero no están escritas en él.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un cartel dice: «El museo cierra a las siete, pero hoy abre hasta las diez». ¿Qué inferencia se apoya en una pista del texto?</p>',
        opciones: ['El museo nunca cierra a las siete', 'Alguien ha estropeado la puerta del museo', 'Hoy hay algo especial que merece la pena ir', 'El museo va a cerrar a las diez'],
        correcta: 2,
        pista: '<p>Una inferencia válida se apoya en algo que el texto dice. Busca el cambio que señala el pero.</p>',
        solucion: '<p>La tercera: <strong>hoy hay algo especial que merece la pena ir</strong>. La pista es el pero, que marca un cambio respecto de lo de siempre. Si el cambio no importara, no se mencionaría, y por eso la inferencia es prudente.</p>' },
      { tipo: 'opciones', enunciado: '<p>En el mensaje «Ya está. No hace falta que vengas», ¿qué pista sostiene la inferencia de que alguien ha decidido algo y no quiere que le estorben?</p>',
        opciones: ['El mensaje lleva dos signos de exclamación', 'El mensaje es corto y no da ninguna explicación', 'La palabra «venir» está escrita en cursiva', 'El mensaje se ha enviado por la noche'],
        correcta: 1,
        pista: '<p>Busca algo que el mensaje no dice, más que algo que dice con adornos.',
        solucion: '<p>La segunda: <strong>el mensaje es corto y no da ninguna explicación</strong>. La pista es lo que el texto omite: avisa de que algo está hecho y rechaza la visita, pero no dice por qué. Quien escribe y no explica deja a quien lee con la duda, y esa duda es la pista.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué es una inferencia? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['inferencia', 'la inferencia', 'una inferencia', 'la inferencia de un texto', 'la conclusión que sacas de lo que el texto no dice pero insinúa', 'conclusión que se saca de lo que el texto no dice pero insinúa'],
        pista: '<p>Es una palabra que empieza por la misma letra que «inferir» y que en inglés se escribe <span lang="en">inference</span>.</p>',
        solucion: '<p>Es la <strong>inferencia</strong> (<span lang="en">inference</span>): la conclusión que sacas de lo que el texto no dice pero insinúa. Para que valga, tiene que apoyarse en una pista concreta del texto.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para hacer una inferencia a partir de un texto.</p>',
        respuesta: ['Escribe lo que el texto dice tal cual', 'Propón dos o tres lecturas posibles', 'Pregunta cuál se apoya en una pista del texto', 'Dilo con prudencia: probablemente, parece que'],
        pista: '<p>Primero separas lo que dice de lo que crees, después buscas opciones y al final eliges y lo dices con cuidado.',
        solucion: '<p>El orden es: escribe lo que el texto dice tal cual, propón dos o tres lecturas posibles, pregunta cuál se apoya en una pista del texto y, por último, dilo con prudencia. Sin el primer paso se mezclan las cosas, y sin el último una inferencia se vuelve una afirmación tajante.</p>' },
      { tipo: 'numero', enunciado: '<p>En el método de inferir se proponen 3 lecturas posibles del texto y solo 1 se apoya en una pista. ¿Cuántas lecturas se descartan?</p>', respuesta: 3 - 1,
        pista: '<p>Restas las lecturas que se quedan de las que propones.',
        solucion: '<p>3 lecturas posibles menos 1 que se apoya en una pista son <strong>2 lecturas descartadas</strong>. Descartarlas es parte del método: por eso hay que proponer varias y no quedarse con la primera que se te ocurre.</p>' },
    ],
    fuentes: [CBC, WIKI_INFERENCIA],
  });

  // ------------------------------------------------------------------
  const WIKI_RESUMEN = { nombre: 'Wikipedia en español: Resumen (apoyo)', url: 'https://es.wikipedia.org/wiki/Resumen' };

  // Embudo del resumen: el texto entero pasa por un filtro y sale un párrafo corto.
  const FILTRO = diagrama([0, 12], [0, 9], [
    caja(0.4, 7.0, 11.6, 8.6), txt(6, 8.15, 'El texto entero'), txt(6, 7.6, 'cuatro párrafos'),
    caja(2.2, 3.9, 9.8, 6.1), txt(6, 5.75, 'El filtro'), txt(6, 5.2, 'tema + idea principal'), txt(6, 4.65, '+ dos ideas secundarias'),
    caja(3.2, 1.4, 8.8, 3.0), txt(6, 2.55, 'El resumen'), txt(6, 2.0, 'un párrafo de 45 palabras'),
    ...flecha([6, 7.0], [6, 6.1]),
    ...flecha([6, 3.9], [6, 3.0]),
  ], 'Diagrama en forma de embudo. Arriba, una caja ancha con «El texto entero» y, debajo, «cuatro párrafos». En el centro, una caja más estrecha con «El filtro» y, debajo, «tema + idea principal» y «+ dos ideas secundarias». Abajo, la caja más estrecha, con «El resumen» y debajo «un párrafo de 45 palabras». Una flecha baja de la caja del texto a la del filtro, y otra flecha baja del filtro al resumen.');

  // ------------------------------------------------------------------
  L('Hacer un resumen', {
    objetivo: 'Reducir un texto a un párrafo corto que conserve lo esencial, quitando repeticiones y detalles, y comprobar que se entiende sin el original.',
    explicacion: `
      <p>Te dan un texto de cuatro párrafos y tienes que contarlo en tres líneas. Casi todo el mundo empieza copiando el principio, y así lo que sale no es un resumen: es un recorte que pierde lo mejor del texto.</p>
      <p>Lo que buscas se llama <strong>resumen</strong> (<span lang="en">summary</span>): un texto corto que cuenta lo esencial de otro texto. No es el original en miniatura, es su esqueleto: deja los huesos y quita la grasa.</p>
      <p>El método tiene cinco pasos. El primero: saca el tema y la idea principal, como en "Idea principal e ideas secundarias". El segundo: elige las ideas secundarias que de verdad sostienen esa idea principal. El tercero: quita lo que sobra, repeticiones, ejemplos y detalles que solo ilustran. El cuarto: escríbelo con tus palabras, en un solo párrafo. El quinto: comprueba que se entiende sin el texto original delante.</p>
      <p>El cuarto paso tiene nombre propio: <strong>parafraseo</strong> (<span lang="en">paraphrasing</span>), que es decir lo mismo con otras palabras. Parafrasear sirve por dos razones: si copias, quien lo lee no sabe qué has entendido tú y qué has copiado; y las repeticiones se quitan mejor al cambiar las palabras. Los contenidos básicos comunes de Lengua del Ministerio de Educación de la Nación (Argentina, documento sin fecha de publicación) listan el parafraseo y la eliminación de repeticiones entre las técnicas de trabajo con el texto.</p>
      <p>¿Y cuánto tiene que medir? Poco. La entrada de Wikipedia en español sobre el resumen (apoyo) dice que no suele pasar del 25 % del original. Esa cuarta parte es una buena meta: si el original tiene 180 palabras, el resumen debería tener 45.</p>
      <p>Los contenidos básicos comunes incluyen el resumen dentro de la lectura: hay que reconocer el tema del texto y elaborar resúmenes, y el resumen es también una estrategia de verificación de la lectura, junto con los apuntes y los esquemas.</p>
      <p>El filtro, de un vistazo:</p>
      ${FILTRO}
      <p>El autor informa de forma objetiva de dónde sale el papel y qué pasa con el que ya usamos; los datos son de ejemplo:</p>
      <div class="nota texto-muestra"><p>El papel de tu cuaderno empezó en un bosque. Cuando un árbol crece, su madera se endurece y forma el tronco. Al cortar el tronco, la madera se lleva a una fábrica, donde se cuece, se aplasta y se seca hasta hacerse láminas finísimas. Un árbol tarda años en crecer.</p><p>Ese trabajo gasta mucha agua y mucha energía. La energía sale de centrales que queman carbón, gas o petróleo, y al quemarlo el aire se ensucia. Por eso cada hoja de papel lleva consigo una parte de ese desgaste, y el agua vuelve sucia.</p><p>Pero el papel viejo no tiene por qué acabar en la basura. Si se recoge, se limpia y se vuelve a usar, se hace papel nuevo con mucho menos gasto. Reciclar una hoja consume muchísima menos energía que fabricar otra desde cero.</p><p>No todo sirve, eso sí. El papel de cocina, los pañuelos y las servilletas usadas no se pueden reciclar, porque están sucios y con restos de comida. Van a la basura y se acabó. Por eso hay que separarlos del resto antes de reciclar.</p></div>
      <p>El resultado de pasar el texto por el filtro:</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Lo que se queda</th><th>Lo que se va</th></tr></thead>
        <tbody>
          <tr><td>El papel sale de la madera de los árboles</td><td>Un árbol tarda años en crecer</td></tr>
          <tr><td>Hacer papel gasta mucha agua y energía</td><td>Las centrales queman carbón, gas o petróleo</td></tr>
          <tr><td>Reciclar el papel usado gasta mucho menos</td><td>El papel de cocina no se puede reciclar</td></tr>
        </tbody>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> recortar el principio del texto y dar eso por resumen. Y el error contrario: quitar tanto que el resumen ya solo dice de qué tema era el texto, sin decir lo que el texto decía.</p>
      <p>Y una cosa más: aquí se resume lo que se lee; en la última unidad de la materia se escriben resúmenes como texto propio.</p>`,
    ejemplo: `
      <p>Vamos a pasar el texto del papel por el filtro, paso a paso.</p>
      <ol class="pasos-ej">
        <li>El tema: de dónde sale el papel y qué pasa con el que ya usaste.</li>
        <li>La idea principal: hacer papel gasta mucha agua y energía, y reciclar el papel usado gasta mucho menos.</li>
        <li>Las dos ideas secundarias que la sostienen: el papel sale de la madera de los árboles, y el papel viejo se recoge y se vuelve a usar.</li>
        <li>Lo que se va: el árbol tarda años en crecer, las centrales queman carbón, gas o petróleo, y el papel de cocina no se puede reciclar.</li>
      </ol>
      <p>El resumen, escrito con tus palabras y en un solo párrafo:</p>
      <p>El papel sale de los árboles: la madera se cuece y se aplasta hasta hacerse láminas. Hacerlo consume mucha agua y energía, pero reciclar el papel usado gasta mucho menos. Por eso conviene recoger el papel y separarlo bien del resto para poder reciclarlo después.</p>
      <p>Compruébalo por otro camino: si alguien que no ha leído el texto entiende la historia con este párrafo, el resumen funciona.</p>`,
    vidaReal: `
      <p>Resumir se te pide mucho más de lo que parece:</p>
      <ul>
        <li>Cuando un profesor dice «cuéntame de qué va», te pide un resumen oral.</li>
        <li>En un trabajo de grupo, el resumen de una página es lo que lee el que no pudo estar.</li>
        <li>En una receta o en un manual, el resumen del principio te dice si te sirve.</li>
        <li>Y en las noticias, el primer párrafo suele ser el resumen de todo lo que viene después.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Has leído el texto del papel. ¿Cuál de estas frases sí puede formar parte de su resumen?</p>',
        opciones: ['Que un árbol tarda años en crecer', 'Que reciclar el papel usado gasta mucha menos energía que hacer papel nuevo', 'Que el papel de cocina no se puede reciclar', 'Que las centrales eléctricas queman carbón, gas o petróleo'],
        correcta: 1,
        pista: '<p>El resumen guarda la idea principal y las ideas secundarias que la sostienen. Los detalles y los casos particulares se van.</p>',
        solucion: '<p>La segunda: <strong>que reciclar el papel usado gasta mucha menos energía</strong>. Esa es una de las dos ideas secundarias que sostienen la idea principal. El árbol que tarda años en crecer, el papel de cocina y las centrales son detalles: pueden ser verdad, pero el resumen no los necesita.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es parafrasear?</p>',
        opciones: ['Copiar el texto tal cual, con las mismas frases', 'Hacer el texto más largo añadiendo ejemplos', 'Contar lo mismo con otras palabras', 'Leer el texto en voz alta para entenderlo mejor'],
        correcta: 2,
        pista: '<p>Busca la opción que dice «lo mismo» y, a la vez, «con otras palabras».</p>',
        solucion: '<p>La tercera: <strong>contar lo mismo con otras palabras</strong>. Copiar no es parafrasear, y al cambiar las palabras también se quitan las repeticiones, que es justo una de las técnicas de trabajo con el texto que recogen los contenidos básicos comunes de Lengua.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el texto corto que cuenta lo esencial de otro texto? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['resumen', 'el resumen', 'un resumen', 'el resumen de un texto', 'el texto corto que cuenta lo esencial de otro texto', 'texto corto que cuenta lo esencial de otro texto'],
        pista: '<p>Es una palabra de siete letras que empieza por «re» y significa lo que se hace con lo esencial de un texto.</p>',
        solucion: '<p>Se llama <strong>resumen</strong> (<span lang="en">summary</span>): el texto corto que cuenta lo esencial de otro texto. En esta unidad se resume lo que se lee; en la última unidad de la materia se escriben resúmenes como texto propio.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para hacer el resumen de un texto.</p>',
        respuesta: ['Saca el tema y la idea principal', 'Elige las ideas secundarias que sostienen la idea principal', 'Quita repeticiones, ejemplos y detalles que solo ilustran', 'Escribe el resumen con tus palabras, en un solo párrafo', 'Comprueba que el resumen se entiende sin el texto original'],
        pista: '<p>Primero lo importante, después lo que lo apoya, después lo que sobra, después lo escribes y al final lo compruebas.</p>',
        solucion: '<p>El orden es: saca el tema y la idea principal, elige las ideas secundarias que sostienen la idea principal, quita repeticiones, ejemplos y detalles que solo ilustran, escribe el resumen con tus palabras en un solo párrafo y, por último, comprueba que se entiende sin el texto original. El paso final es el que enseña: si alguien que no leyó el texto no lo entiende, el resumen todavía no está.</p>' },
      { tipo: 'numero', enunciado: '<p>El texto del ejemplo tiene 180 palabras. Si su resumen ocupa la cuarta parte, ¿cuántas palabras tiene el resumen?</p>', respuesta: 180 / 4,
        pista: '<p>La cuarta parte es dividir entre 4.</p>',
        solucion: '<p>180 ÷ 4 = <strong>45 palabras</strong>. Esa es la meta que da la proporción: un resumen no suele pasar de la cuarta parte del original, y con menos palabras tiene que contar lo mismo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Alguien resume el texto del papel así: «El papel viene de los árboles. Las fábricas hacen papel con la madera. Se puede reciclar. El papel de cocina no se puede reciclar». ¿Qué le falta a este resumen?</p>',
        opciones: ['Le sobra una frase', 'Le faltan las cuatro ideas secundarias', 'Es demasiado corto', 'Le falta la idea principal y se queda con un detalle que no la sostiene'],
        correcta: 3,
        pista: '<p>Compara el resumen con la idea principal del texto, y fíjate en qué información elige y cuál deja fuera.</p>',
        solucion: '<p>Le falta la idea principal: <strong>el resumen no dice que hacer papel gasta mucha agua y energía y que reciclar gasta mucho menos</strong>. En su lugar se queda con un detalle, el papel de cocina, que no sostiene el mensaje del texto. La longitud está bien: cuatro frases son pocas y el problema no es la cantidad de palabras.</p>' },
    ],
    fuentes: [CBC, WIKI_RESUMEN],
  });

  // ------------------------------------------------------------------
  const WIKI_MAPA = { nombre: 'Wikipedia en español: Mapa conceptual (apoyo)', url: 'https://es.wikipedia.org/wiki/Mapa_conceptual' };

  // Mapa conceptual del café: cinco cajas y cuatro flechas, cada una con su frase.
  const MAPA = diagrama([0, 18], [0, 12], [
    caja(6.9, 5.25, 11.1, 6.75), txt(9, 6.0, 'El café'),
    caja(0.5, 9.6, 4.7, 11.1), txt(2.6, 10.35, 'La planta'),
    caja(13.3, 9.6, 17.5, 11.1), txt(15.4, 10.35, 'El clima'),
    caja(0.5, 0.9, 4.7, 2.4), txt(2.6, 1.65, 'El tueste'),
    caja(13.3, 0.9, 17.5, 2.4), txt(15.4, 1.65, 'La taza'),
    txt(3.4, 8.3, 'es la semilla'), txt(3.4, 7.6, 'de un arbusto'),
    txt(14.8, 8.3, 'crece en climas'), txt(14.8, 7.6, 'cálidos'),
    txt(3.4, 3.8, 'se tuesta'),
    txt(14.8, 4.0, 'se muele y'), txt(14.8, 3.3, 'se hierve'),
    ...flecha([6.9, 6.75], [4.7, 9.6]),
    ...flecha([11.1, 6.75], [13.3, 9.6]),
    ...flecha([6.9, 5.25], [4.7, 2.4]),
    ...flecha([11.1, 5.25], [13.3, 2.4]),
  ], 'Mapa conceptual con cinco cajas. En el centro, una caja con «El café». Arriba a la izquierda, una caja con «La planta», con una flecha que sale del centro hacia ella y la frase «es la semilla de un arbusto», escrita en dos renglones. Arriba a la derecha, una caja con «El clima», con su flecha y la frase «crece en climas cálidos», en dos renglones. Abajo a la izquierda, una caja con «El tueste», con la flecha «se tuesta». Abajo a la derecha, una caja con «La taza», con la flecha «se muele y se hierve», en dos renglones.');

  // ------------------------------------------------------------------
  L('Mapas conceptuales', {
    objetivo: 'Dibujar un mapa conceptual de un tema: una idea general en el centro, ideas concretas alrededor y una frase con sentido en cada flecha.',
    explicacion: `
      <p>Hay un dibujo que mucha gente hace en los apuntes: cajas con una palabra dentro y flechas que unen unas con otras. Si las flechas no dicen nada, es un esquema. Si cada flecha lleva una frase, ya no es un esquema: es un <strong>mapa conceptual</strong> (<span lang="en">concept map</span>), un dibujo que muestra las ideas de un tema y cómo se relacionan entre sí.</p>
      <p>Esa frase de la flecha es lo que hace que el mapa funcione. Si lees una flecha junto a las dos cajas que une, obtienes una frase completa: por ejemplo, «el café crece en climas cálidos». Esa frase se llama <strong>proposición</strong> (<span lang="en">proposition</span>). Un mapa conceptual bien hecho es un mapa de proposiciones: cada flecha dice algo, y al leerlas todas sabes el tema entero sin volver al texto.</p>
      <p>El orden de las cajas también importa. Las ideas se colocan de lo general a lo particular, y ese orden se llama <strong>jerarquía</strong> (<span lang="en">hierarchy</span>): la idea más general, la que engloba todo, va en el centro, y las ideas más concretas la rodean. Con esa jerarquía se ve de un vistazo qué es lo que manda y qué cuelga de ello.</p>
      <h3>Cómo se hace un mapa conceptual</h3>
      <p>Los pasos son cinco. Primero, elige la idea más general del tema y ponla en el centro. Segundo, busca tres o cuatro ideas principales y colócalas alrededor. Tercero, une cada una con una flecha que lleve su frase. Cuarto, si hace falta, añade en un segundo nivel los detalles de cada idea, con sus propias flechas. Quinto, comprueba: cada flecha, leída junto con las dos cajas que une, tiene que formar una frase completa, y ninguna caja puede quedar suelta.</p>
      <p>Esa comprobación es la que enseña. Si no sabes qué frase poner entre dos cajas, todavía no sabes cómo se relacionan, y eso es un problema del texto, no del dibujo. Y si la frase se entiende sola, sin mirar las cajas, la relación está clara de verdad.</p>
      <p>Los contenidos básicos comunes de Lengua del Ministerio de Educación de la Nación (Argentina, documento sin fecha de publicación) incluyen la confección de mapas conceptuales y semánticos entre los contenidos de Lengua, junto con el uso de semejanzas, oposiciones y gradaciones de sentido. Dicen además que al organizar mapas conceptuales se amplía el vocabulario disciplinar, es decir, las palabras propias de cada materia.</p>
      <p>La entrada de Wikipedia en español sobre el mapa conceptual (apoyo) lo define como una sinopsis gráfica de un tema, que muestra sus partes y sus relaciones y deja ver de un vistazo cómo se ramifica todo lo que sabes de un tema.</p>
      <p>Los tres elementos del mapa:</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Elemento</th><th>Qué es</th></tr></thead>
        <tbody>
          <tr><th scope="row">La caja</th><td>Una idea, nunca una frase entera</td></tr>
          <tr><th scope="row">La flecha</th><td>La unión entre dos cajas</td></tr>
          <tr><th scope="row">La frase de la flecha</th><td>Lo que dice esa unión: una proposición</td></tr>
        </tbody>
      </table></div>
      <p>Y así queda un mapa del café, con su caja central, sus cuatro cajas y la frase de cada flecha:</p>
      ${MAPA}
      <p class="nota"><strong>Trampa común:</strong> hacer el mapa y dejar las flechas sin frase. Un dibujo de flechas sin frases no explica nada: parece ordenado, pero quien lo mira no entiende qué se relaciona con qué. Y tampoco valen las cajas sueltas: cada caja tiene que estar unida a otra por una flecha que diga algo.</p>
      <p>La diferencia con la lección anterior conviene tenerla clara. El resumen es el filtro: decide qué se queda y lo cuenta en palabras. El mapa conceptual es el dibujo: enseña cómo se relacionan esas mismas ideas. Los dos usan el mismo material, la idea principal y sus ideas secundarias, como viste en "Idea principal e ideas secundarias"; lo que cambia es el resultado, un párrafo en un caso y un dibujo en el otro.</p>`,
    ejemplo: `
      <p>El autor explica de forma objetiva cómo se hace el café; los datos son de ejemplo:</p>
      <div class="nota texto-muestra"><p>El café es la semilla de un arbusto que crece en zonas cálidas y húmedas. La planta da frutos rojos, y dentro de cada fruto hay dos semillas. Cuando maduran, se recogen y se llevan a una fábrica, donde se tuestan: el calor abre el aroma. El grano tostado se muele, se mezcla con agua hirviendo, y de esa mezcla sale la taza que bebes cada mañana.</p></div>
      <ol class="pasos-ej">
        <li>Elige la idea más general y ponla en el centro: el café.</li>
        <li>Busca las ideas principales y colócalas alrededor: la planta, el clima, el tueste y la taza.</li>
        <li>Une cada una con una flecha que lleve su frase: «es la semilla de un arbusto», «crece en climas cálidos», «se tuesta» y «se muele y se hierve».</li>
        <li>Lee cada flecha como una frase entera y comprueba que las cuatro se entienden.</li>
      </ol>
      <p>El mapa del café es el de arriba: cinco cajas y cuatro flechas con su frase. Siguiendo las flechas ya sabes cómo se hace el café.</p>`,
    vidaReal: `
      <p>Los mapas conceptuales salen en muchos sitios donde un tema tiene partes:</p>
      <ul>
        <li>En los apuntes de una clase, cuando el tema tiene cuatro o cinco ideas que hay que relacionar.</li>
        <li>En el manual de un aparato, para saber qué pieza va con cuál.</li>
        <li>En un proyecto del colegio, para organizar de dónde hay que sacar la información.</li>
        <li>Y cuando explicas algo a alguien, dibujar el mapa es la forma más rápida de que lo entienda.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>En un mapa conceptual del café hay una flecha con la frase «se tuesta». ¿Qué es esa frase, si la lees junto a las dos cajas que une?</p>',
        opciones: ['El título de la caja central', 'Un dato curioso que sale del texto', 'Una proposición, porque se lee como una frase que une dos cajas'],
        correcta: 2,
        pista: '<p>La frase de una flecha, leída con sus dos cajas, forma una oración completa.</p>',
        solucion: '<p>Es la tercera: <strong>una proposición, porque se lee como una frase que une dos cajas</strong>. Al leerla sale «el café se tuesta», y esa oración dice exactamente cómo se relacionan las dos cajas. Un mapa bien hecho es un mapa de proposiciones.</p>' },
      { tipo: 'opciones', enunciado: '<p>En un mapa conceptual, una caja dice «La planta» y otra dice «El café». ¿Qué frase de la flecha encaja mejor entre ellas?</p>',
        opciones: ['se tuesta', 'es la semilla de un arbusto', 'crece en climas cálidos', 'se muele y se hierve'],
        correcta: 1,
        pista: '<p>Lee la flecha en voz alta con las dos cajas: «el café... la planta».</p>',
        solucion: '<p>La segunda: <strong>es la semilla de un arbusto</strong>. Leída con las dos cajas, la proposición queda «el café es la semilla de un arbusto», y el café es justamente la semilla de la planta que lo produce. Las otras frases relacionarían el café con el clima o con la taza.</p>' },
      { tipo: 'opciones', enunciado: '<p>Has dibujado un mapa del clima con la caja central «El clima», cuatro cajas alrededor y flechas que las unen, pero ninguna flecha tiene frase. ¿Qué le falta al mapa?</p>',
        opciones: ['Le faltan más ideas alrededor de la caja central', 'Le faltan flechas entre las cajas', 'Le sobra la caja central', 'Le faltan las frases de las flechas, y con ellas las proposiciones'],
        correcta: 3,
        pista: '<p>Falta algo que diga cómo se relaciona cada caja con la central.</p>',
        solucion: '<p>La cuarta: <strong>le faltan las frases de las flechas, y con ellas las proposiciones</strong>. Sin frase, las flechas solo unen cajas: el dibujo parece ordenado, pero no dice cómo se relacionan las ideas. Con una frase en cada flecha, el mapa ya se puede leer como un texto.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el dibujo que muestra las ideas de un tema y cómo se relacionan entre sí? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['mapa conceptual', 'el mapa conceptual', 'un mapa conceptual', 'el mapa conceptual de un tema', 'un dibujo que muestra las ideas de un tema y cómo se relacionan', 'dibujo que muestra las ideas de un tema y cómo se relacionan entre sí'],
        pista: '<p>Son dos palabras: la primera nombra un tipo de dibujo y la segunda dice de qué tipo de dibujo se trata.</p>',
        solucion: '<p>Es el <strong>mapa conceptual</strong> (<span lang="en">concept map</span>): un dibujo que muestra las ideas de un tema y cómo se relacionan. Cada caja lleva una idea y cada flecha una frase que se puede leer sola.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para hacer el mapa conceptual de un texto.</p>',
        respuesta: ['Elige la idea más general y ponla en el centro', 'Coloca alrededor las tres o cuatro ideas principales', 'Une cada idea con una flecha que lleve su frase', 'Añade en un segundo nivel los detalles, con sus propias flechas', 'Comprueba que cada flecha se lee como una frase y que no queda ninguna caja suelta'],
        pista: '<p>Primero lo general, después lo particular, después las uniones, después los detalles y al final la revisión.</p>',
        solucion: '<p>El orden es: elige la idea más general y ponla en el centro, coloca alrededor las ideas principales, une cada idea con una flecha que lleve su frase, añade en un segundo nivel los detalles con sus propias flechas y, por último, comprueba que cada flecha se lee como una frase y que no queda ninguna caja suelta. Ese último paso es el que delata los huecos.</p>' },
      { tipo: 'numero', enunciado: '<p>El mapa del café tiene una caja central y cuatro cajas alrededor, y cada flecha lleva su frase. ¿Cuántas ideas tiene el mapa en total?</p>', respuesta: 1 + 4,
        pista: '<p>Sumas la caja central y las cajas que la rodean.</p>',
        solucion: '<p>1 caja central más 4 cajas alrededor son <strong>5 ideas</strong>. Cada una tiene su flecha, así que el mapa tiene también 4 proposiciones: cuatro frases que cuentan el tema entero.</p>' },
    ],
    fuentes: [CBC, WIKI_MAPA],
  });
})();
