// Lectura · Unidad 3: Pensamiento crítico.
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
  const WIKI_PENSAMIENTO = { nombre: 'Wikipedia en español: Pensamiento crítico (apoyo)', url: 'https://es.wikipedia.org/wiki/Pensamiento_cr%C3%ADtico' };
  const WIKI_INTENCION = { nombre: 'Wikipedia en español: Intención del autor (apoyo)', url: 'https://es.wikipedia.org/wiki/Intenci%C3%B3n_del_autor' };
  const WIKI_AUTOR = { nombre: 'Wikipedia en español: Autor implícito (apoyo)', url: 'https://es.wikipedia.org/wiki/Autor_impl%C3%ADcito' };
  const WIKI_ARGUMENTO = { nombre: 'Wikipedia en español: Argumento (apoyo)', url: 'https://es.wikipedia.org/wiki/Argumento' };
  const WIKI_ARGUMENTATIVO = { nombre: 'Wikipedia en español: Texto argumentativo (apoyo)', url: 'https://es.wikipedia.org/wiki/Texto_argumentativo' };
  const WIKI_FALACIA = { nombre: 'Wikipedia en español: Falacia (apoyo)', url: 'https://es.wikipedia.org/wiki/Falacia' };
  const WIKI_FALACIA_INFORMAL = { nombre: 'Wikipedia en español: Falacia informal (apoyo)', url: 'https://es.wikipedia.org/wiki/Falacia_informal' };
  const WIKI_AD_HOMINEM = { nombre: 'Wikipedia en español: Argumento ad hominem (apoyo)', url: 'https://es.wikipedia.org/wiki/Argumento_ad_hominem' };
  const IEP_FALLACIES = { nombre: 'Internet Encyclopedia of Philosophy: Fallacies (en inglés)', url: 'https://iep.utm.edu/fallacy/' };
  const FCT_FALLACIES = { nombre: 'Foundation for Critical Thinking: Informal Fallacies (en inglés)', url: 'https://www.criticalthinking.org/data/pages/25/2e51737bb044ed99a88bdc1220fe8cb660f7687377bed.pdf' };
  const WIKI_SESGO = { nombre: 'Wikipedia en español: Sesgo cognitivo (apoyo)', url: 'https://es.wikipedia.org/wiki/Sesgo_cognitivo' };
  const WIKI_CONFIRMACION = { nombre: 'Wikipedia en español: Sesgo de confirmación (apoyo)', url: 'https://es.wikipedia.org/wiki/Sesgo_de_confirmaci%C3%B3n' };
  const WIKI_ANCLAJE = { nombre: 'Wikipedia en español: Efecto de anclaje (apoyo)', url: 'https://es.wikipedia.org/wiki/Efecto_de_anclaje' };
  const WIKI_DUNNING = { nombre: 'Wikipedia en español: Efecto Dunning-Kruger (apoyo)', url: 'https://es.wikipedia.org/wiki/Efecto_Dunning-Kruger' };
  const OPENSTAX = { nombre: 'OpenStax: Introduction to Philosophy, términos clave (en inglés)', url: 'https://openstax.org/books/introduction-philosophy/pages/2-key-terms' };
  const BIT = { nombre: 'Behavioural Insights Team: Behavioral Government (en inglés, 2018)', url: 'https://www.bi.team/wp-content/uploads/2018/07/BIT-Behavioral-Government-Report-US.pdf' };
  const WIKI_DESINFORMACION = { nombre: 'Wikipedia en español: Desinformación (apoyo)', url: 'https://es.wikipedia.org/wiki/Desinformaci%C3%B3n' };
  const UNESCO_MIL = { nombre: 'UNESCO: Media and Information Literacy (en inglés)', url: 'https://www.unesco.org/en/media-information-literacy' };
  const IFCN = { nombre: 'IFCN Code of Principles (en inglés)', url: 'https://ifcncodeofprinciples.poynter.org' };
  const REUTERS = { nombre: 'Reuters Institute for the Study of Journalism: How the public checks information (en inglés, 2025)', url: 'https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2025/how-public-checks-information-it-thinks-might-be-wrong' };
  const ONU_NOTICIAS = { nombre: 'Noticias ONU: ¿Estás seguro de querer compartir eso? (2021)', url: 'https://news.un.org/es/story/2021/11/1500492' };

  // Dos rutas: una acaba en verdadero o falso, la otra depende de cada uno.
  const HECHO_OPINION = diagrama([0, 12], [2.6, 9], [
    caja(0.4, 7.2, 5.8, 8.8), txt(3.1, 8.35, 'Hecho'), txt(3.1, 7.7, 'afirmación comprobable'),
    caja(6.2, 7.2, 11.6, 8.8), txt(8.9, 8.35, 'Opinión'), txt(8.9, 7.7, 'el juicio de alguien'),
    caja(0.4, 5.0, 5.8, 6.4), txt(3.1, 5.95, 'Se comprueba'), txt(3.1, 5.3, 'buscas una prueba'),
    caja(6.2, 5.0, 11.6, 6.4), txt(8.9, 5.95, 'Se apoya en'), txt(8.9, 5.3, 'sus propios criterios'),
    caja(0.4, 2.8, 5.8, 4.2), txt(3.1, 3.75, 'Sale verdadero'), txt(3.1, 3.1, 'o sale falso'),
    caja(6.2, 2.8, 11.6, 4.2), txt(8.9, 3.75, 'No se comprueba'), txt(8.9, 3.1, 'con una prueba'),
    ...flecha([3.1, 7.2], [3.1, 6.4]),
    ...flecha([8.9, 7.2], [8.9, 6.4]),
    ...flecha([3.1, 5.0], [3.1, 4.2]),
    ...flecha([8.9, 5.0], [8.9, 4.2]),
  ], 'Diagrama con dos columnas y tres filas de cajas, unidas por flechas hacia abajo. En la columna izquierda: «Hecho: afirmación comprobable», «Se comprueba: buscas una prueba» y «Sale verdadero o sale falso». En la columna derecha: «Opinión: el juicio de alguien», «Se apoya en sus propios criterios» y «No se comprueba con una prueba».');

  // ------------------------------------------------------------------
  L('Hechos y opiniones', {
    objetivo: 'Distinguir los hechos de las opiniones en un texto y explicar por qué una afirmación se puede comprobar y otra no.',
    explicacion: `
      <p>Dos frases sobre el café. La primera: «El café contiene cafeína». La segunda: «El café es la mejor bebida del mundo». Las dos parecen afirmaciones, pero la primera se puede comprobar y la segunda no. Si buscas el dato del café, te dice si es verdad o no. En cambio, no hay forma de mirar y ver que el café es la mejor bebida del mundo, porque «la mejor» depende de los criterios de quien lo dice.</p>
      <p>Una afirmación que se puede comprobar, y que sale verdadera o falsa, es un <strong>hecho</strong> (<span lang="en">fact</span>). Un juicio de alguien, que se apoya en sus criterios y no en pruebas, es una <strong>opinión</strong> (<span lang="en">opinion</span>). Y una afirmación es <strong>verificable</strong> (<span lang="en">verifiable</span>) cuando se puede comprobar con una fuente o una prueba.</p>
      <h3>El truco: comprobar y negar</h3>
      <p>Para distinguirlas hay dos pasos. Primero, pregúntate: «¿esto se puede comprobar?». Segundo, prueba a negar la frase y mira qué pasa. Si la versión negada también podría ser verdad y ninguna prueba lo decide, entonces es una opinión. Por ejemplo, «este equipo es el mejor del barrio» y «este equipo no es el mejor del barrio» pueden ser las dos ciertas o las dos falsas según los criterios de quien habla: eso es una opinión. En cambio, «el jueves hay clase a las ocho» se comprueba mirando el horario, y sale verdadero o falso: eso es un hecho.</p>
      <p>Y dos avisos importantes. El primero: una opinión no es menos válida por ser opinión, ni un hecho es mejor por ser dato; se valoran de manera distinta, y eso está bien. El segundo: que una frase suene a hecho no la convierte en hecho. «El noventa por ciento de los jóvenes no lee», por ejemplo, suena a dato, pero si el texto no dice de dónde sale ese número, no es un hecho: es una afirmación sin respaldo.</p>
      <p>Los contenidos básicos comunes de Lengua del Ministerio de Educación de la Nación (Argentina, documento sin fecha de publicación) piden dos cosas juntas: «identificación de hechos y opiniones en el texto» y «elaboración de inferencias y fundamentación de opiniones». Primero se separa y después se razona. Y la entrada de Wikipedia en español sobre el pensamiento crítico (apoyo) va por ahí: el pensamiento crítico es el proceso de dudar de las afirmaciones que en la vida cotidiana suelen aceptarse como verdaderas.</p>
      <p>Esta es la tabla con cinco frases y lo que hay que mirar en cada una:</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>La frase</th><th>¿Hecho u opinión?</th><th>Cómo se comprueba, o por qué no</th></tr></thead>
        <tbody>
          <tr><td>«El café contiene cafeína.»</td><th scope="row">Hecho</th><td>Se busca en la etiqueta de un paquete o en un libro de química y sale verdadero o falso</td></tr>
          <tr><td>«El café es la mejor bebida del mundo.»</td><th scope="row">Opinión</th><td>Depende de los criterios de quien lo dice: no hay prueba que lo decida</td></tr>
          <tr><td>«El café quita el sueño a todo el mundo.»</td><th scope="row">Ni una cosa ni otra</th><td>No se puede comprobar tal como está escrita, y tampoco es el juicio de nadie</td></tr>
          <tr><td>«El noventa por ciento de los adolescentes toma café todos los días.»</td><th scope="row">Ni una cosa ni otra todavía</th><td>El texto no dice de dónde sale el número; las cifras son de ejemplo</td></tr>
          <tr><td>«Esta bolsa de café pesa 250 gramos.»</td><th scope="row">Hecho</th><td>Se lee en la etiqueta y se pesa en la balanza</td></tr>
        </tbody>
      </table></div>
      <p>Y así se ven las dos rutas:</p>
      ${HECHO_OPINION}
      <p class="nota"><strong>Trampa común:</strong> dar por hecho que si algo está escrito en un texto es verdad. Un texto puede afirmar cualquier cosa: lo que lo hace fiable es que la afirmación se pueda comprobar, y eso se mira frase por frase.</p>
      <p>El mismo cuidado con los números te lo da la lección "Cómo leer estadísticas en las noticias sin que te engañen" (Matemáticas), y en "Tipos de texto: narrativo, expositivo, argumentativo e instructivo" viste que el argumentativo presenta razones para convencerte, y ahí es donde más conviene separar el dato de la opinión.</p>`,
    ejemplo: `
      <p>Vamos a trabajar tres frases sobre el café, paso a paso.</p>
      <ol class="pasos-ej">
        <li>«El café contiene cafeína». Pregunta: ¿se puede comprobar? Sí: se busca en la etiqueta o en un libro de química, y sale verdadero o falso. Es un hecho.</li>
        <li>«El café es la mejor bebida del mundo». Prueba a negarla: «el café no es la mejor bebida del mundo». Las dos versiones son posibles según los criterios de quien habla: no hay forma de decidir. Es una opinión.</li>
        <li>«El café quita el sueño». Esta parece un hecho, pero no se puede comprobar tal como está escrita: hay gente que con el café duerme perfectamente y la cantidad importa. Como no se puede comprobar tal cual, no es un hecho. Y tampoco es una opinión, porque no es el juicio de nadie: es una afirmación sin respaldo.</li>
      </ol>
      <p>El método queda en tres palabras: comprobar, negar, ver qué pasa.</p>
      <p class="nota"><strong>Error común:</strong> meter en el mismo saco toda frase que suene segura. Una afirmación sin respaldo no es una opinión: es una frase que todavía no se ha comprobado, y eso es distinto.</p>`,
    vidaReal: `
      <p>Cada día lees frases que suenan igual de firmes: unas las puedes comprobar y otras son solo la manera de verlo de quien las dice. Distinguir una cosa de otra te sirve en muchos sitios:</p>
      <ul>
        <li>En un aviso del colegio, para ver qué es una norma y qué una queja.</li>
        <li>En una noticia, para separar el dato del comentario.</li>
        <li>En una conversación, para saber si tu amigo te da un dato o su manera de verlo.</li>
        <li>En un trabajo, para no apoyar una frase en algo que nadie ha comprobado.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas frases es un hecho?</p>',
        opciones: ['«El chocolate sabe mejor que el helado.»', '«El chocolate se derrite con el calor.»', '«El chocolate es lo más rico que existe.»', '«A mí me gusta más el chocolate que el helado.»'],
        correcta: 1,
        pista: '<p>Pregunta cuál de las cuatro se puede comprobar con una prueba.</p>',
        solucion: '<p>La segunda: <strong>«El chocolate se derrite con el calor»</strong>. Se puede comprobar poniendo chocolate al fuego: se derrite. Las otras tres dependen del gusto o de los criterios de quien las dice, y por eso son opiniones.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un texto dice: «El ochenta por ciento de los estudiantes de este colegio lee tebeos cada día». ¿Qué es esa frase? La cifra es de ejemplo.</p>',
        opciones: ['Un hecho, porque dice un número exacto', 'Una opinión, porque habla de gustos', 'Una afirmación sin respaldo, porque no dice de dónde sale el número', 'Un dato comprobado por la biblioteca del colegio'],
        correcta: 2,
        pista: '<p>Un número no convierte nada en hecho. Fíjate en si el texto dice de dónde sacó ese número.</p>',
        solucion: '<p>La tercera: <strong>una afirmación sin respaldo, porque no dice de dónde sale el número</strong>. Suena a dato, y ese es el truco: si el texto no explica de dónde sale el porcentaje, no hay forma de comprobarlo. Las cifras de este ejemplo son de ejemplo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué pasa si negas la frase «Este equipo es el mejor del barrio»?</p>',
        opciones: ['Las dos versiones pueden ser ciertas o falsas según los criterios de quien habla, así que es una opinión', 'La versión negada es imposible, así que la frase original es un hecho', 'Aparece un dato que hay que buscar en una fuente', 'La frase no se puede negar, porque ya es una opinión'],
        correcta: 0,
        pista: '<p>Niega la frase y mira si la versión negada podría ser verdad o no.</p>',
        solucion: '<p>La primera: <strong>las dos versiones pueden ser ciertas o falsas según los criterios de quien habla, así que es una opinión</strong>. Las dos se apoyan en criterios distintos y ninguna prueba decide cuál es verdad, y por eso no se puede comprobar. Ese es el segundo paso del truco.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama una afirmación que se puede comprobar y que sale verdadera o falsa? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['hecho', 'un hecho', 'el hecho', 'hecho comprobable', 'un hecho comprobable', 'una afirmación que se puede comprobar y sale verdadera o falsa', 'afirmación que se puede comprobar y sale verdadera o falsa', 'una afirmación comprobable que sale verdadera o falsa'],
        pista: '<p>Es una palabra de cinco letras que empieza por «he».</p>',
        solucion: '<p>Se llama <strong>hecho</strong> (<span lang="en">fact</span>): una afirmación que se puede comprobar y sale verdadera o falsa.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para decidir si una frase es un hecho.</p>',
        respuesta: ['Pregunta si la frase se puede comprobar', 'Niega la frase y mira si alguna prueba decide cuál de las dos es verdad', 'Si una prueba decide, es un hecho; si ninguna lo hace, es una opinión'],
        pista: '<p>Primero compruebas, después niegas y al final decides.</p>',
        solucion: '<p>El orden es: pregunta si la frase se puede comprobar, niega la frase y mira si alguna prueba decide cuál de las dos es verdad, y al final decide: si una prueba decide, es un hecho, y si ninguna lo hace, es una opinión.</p>' },
      { tipo: 'numero', enunciado: '<p>En el ejemplo de la lección hay 3 frases sobre el café y 2 de ellas no son hechos comprobables. ¿Cuántas frases son hechos?</p>', respuesta: 3 - 2,
        pista: '<p>Restas las frases que no son hechos.</p>',
        solucion: '<p>3 frases menos 2 que no son hechos son <strong>1 hecho</strong>: «el café contiene cafeína».</p>' },
    ],
    fuentes: [CBC, WIKI_PENSAMIENTO],
  });

  // ------------------------------------------------------------------
  // La cadena que va del autor a lo que quiere de ti.
  const CADENA = diagrama([0, 12], [0.9, 9.1], [
    caja(0.6, 7.4, 11.4, 8.9), txt(6, 8.45, 'Autor'), txt(6, 7.85, 'quien escribe el texto'),
    caja(0.6, 5.3, 11.4, 6.9), txt(6, 6.45, 'Mensaje'), txt(6, 5.85, 'lo que dice y lo que calla'),
    caja(0.6, 3.2, 11.4, 4.8), txt(6, 4.35, 'Audiencia'), txt(6, 3.75, 'las personas a las que habla'),
    caja(0.6, 1.1, 11.4, 2.7), txt(6, 2.25, 'Lo que quiere que hagas'), txt(6, 1.65, 'comprar, participar o enterarte'),
    ...flecha([6, 7.4], [6, 6.9]),
    ...flecha([6, 5.3], [6, 4.8]),
    ...flecha([6, 3.2], [6, 2.7]),
  ], 'Diagrama con cuatro cajas encadenadas de arriba abajo por flechas. La primera dice «Autor: quien escribe el texto», la segunda «Mensaje: lo que dice y lo que calla», la tercera «Audiencia: las personas a las que habla» y la cuarta «Lo que quiere que hagas: comprar, participar o enterarte».');

  // ------------------------------------------------------------------
  L('La intención del autor', {
    objetivo: 'Descubrir a quién le habla un texto y qué quiere conseguir de ti, y deducirlo de pistas concretas del propio texto.',
    explicacion: `
      <p>En la puerta de un parque hay un cartel. Dice: «Este parque se cuida entre todos. Ayúdanos a mantenerlo limpio». Alguien lo escribió, y desde el primer momento te pide algo. Un cartel así no es un dato: es una petición. Y saber para quién y para qué está escrito cambia lo que haces con un texto.</p>
      <p>Todo texto, además de lo que dice, tiene un para qué. Se dirige a alguien, y ese alguien es su <strong>audiencia</strong> (<span lang="en">audience</span>): las personas a las que habla. De ellas quiere conseguir algo, y eso es su <strong>intención</strong> (<span lang="en">intention</span>): lo que busca con el texto. El <strong>tono</strong> (<span lang="en">tone</span>) es la manera de hablar que elige el texto, y también dice algo de la intención: un cartel del parque y el mensaje de una empresa no suenan igual, y no por nada.</p>
      <h3>Las cuatro pistas</h3>
      <p>No hace falta adivinar: hay cuatro pistas en el texto. La primera es el género, que ya viste en "Tipos de texto: narrativo, expositivo, argumentativo e instructivo": un texto argumentativo quiere convencerte y uno instructivo quiere que hagas algo. La segunda son las palabras que elige y las que no usa: si un texto nunca habla de un precio, no quiere hablar de precios. La tercera es el tono. Y la cuarta es lo que pide: comprar, creer, tener miedo, participar o solo enterarte.</p>
      <h3>Las tres preguntas</h3>
      <p>Con esas pistas se trabaja siempre igual, con tres preguntas: ¿quién escribe esto?, ¿para quién escribe? y ¿qué quiere que haga yo? Después se comprueba en el texto: si no hay una frase que lo diga, la respuesta está inventada.</p>
      <p>Los contenidos básicos comunes de Lengua del Ministerio de Educación de la Nación (Argentina, documento sin fecha de publicación), al describir la lectura de los medios, hablan de la «postura y línea editorial» y del «criterio de audiencia»: hasta un periódico decide a quién le habla. Entre sus contenidos están los géneros periodísticos, con los titulares como parte del paratexto, y el análisis de propagandas.</p>
      <p>La entrada de Wikipedia en español sobre la intención del autor (apoyo) lo plantea desde la teoría: las intenciones de un autor deben limitar cómo se interpreta bien un texto. Y la de autor implícito (apoyo) llama así a la imagen del autor que proyecta una obra; de ahí nos sirve una idea sencilla: detrás de cada texto hay alguien, y ese alguien ha querido algo.</p>
      <p class="nota"><strong>Trampa común:</strong> sospechar de todo. Reconocer la intención de un texto no es pensar que todo es una trampa. El cartel del parque no esconde nada: dice lo que quiere con otras palabras. Lo que cambia es que dejas de leerlo como una noticia y lo lees como una petición.</p>
      <p>La cadena que hay que seguir, y los cuatro textos con las preguntas respondidas:</p>
      ${CADENA}
      <div class="tabla-wrap"><table>
        <thead><tr><th>El texto</th><th>Qué quiere de ti</th><th>¿Quién escribe?</th><th>¿Para quién?</th><th>¿Qué te pide?</th></tr></thead>
        <tbody>
          <tr><td>«Este parque se cuida entre todos. Ayúdanos a mantenerlo limpio»</td><th scope="row">Que hagas algo</th><td>El municipio</td><td>Quien usa el parque</td><td>Que no tires basura al suelo</td></tr>
          <tr><td>«Mezcla un huevo, dos tazas de harina y una pizca de sal»</td><th scope="row">Que sigas los pasos</th><td>Quien escribe la receta</td><td>Quien va a cocinar</td><td>Que la prepares paso a paso</td></tr>
          <tr><td>«Antes de abrir el aparato, desconecta el cable»</td><th scope="row">Que sigas los pasos</th><td>Quien escribe el manual</td><td>Quien usa el aparato</td><td>Que lo desconectes antes</td></tr>
          <tr><td>«El río baja un palmo y el puente vuelve a estar abierto»</td><th scope="row">Que te enteres</th><td>Quien publica el periódico</td><td>Quien lee el periódico</td><td>Nada: solo te enteres</td></tr>
        </tbody>
      </table></div>
      <p>El error típico va por el otro lado: leer un texto de venta como si fuera una descripción y quedarse con los datos concretos, sin ver lo que el texto quiere que hagas con ellos. Y en "Hacer un resumen" viste que un resumen se queda con la idea principal; en un texto argumentativo, esa idea principal es justo lo que el autor quiere que aceptes.</p>`,
    ejemplo: `
      <p>Vamos a trabajar el cartel del parque, paso a paso. El texto es de ejemplo:</p>
      <div class="nota texto-muestra"><p>Este parque se cuida entre todos. Ayúdanos a mantenerlo limpio.</p></div>
      <ol class="pasos-ej">
        <li>¿Quién escribe? El municipio: lo dice el logo y lo delata el verbo en plural, «ayúdanos», que habla con la comunidad y no con alguien concreto.</li>
        <li>¿Para quién? Para quienes usan el parque, que son los que pueden dejar papeles en el suelo.</li>
        <li>¿Qué quiere? Que cambies un comportamiento: que no tires la basura y que la recojas.</li>
        <li>La prueba: el texto pide algo, así que no es informativo. Quien lo lee como un dato se lleva una impresión distinta de quien lo lee como una petición.</li>
      </ol>
      <p>Y el cartel no necesita esconder nada para que funcione: su tono amable es justo la manera de pedirlo.</p>
      <p class="nota"><strong>Error común:</strong> buscar una intención oculta donde solo hay una petición clara, y acabar desconfiando de todo lo que lees.</p>`,
    vidaReal: `
      <p>Todos los textos que lees hablan con alguien, aunque no lo parezca. Saber quién es ese alguien y qué espera de ti cambia lo que haces con el texto:</p>
      <ul>
        <li>En un cartel del parque, entiendes que te están pidiendo algo, no contándote una noticia.</li>
        <li>En un anuncio, reconoces que quieren que compres y decides con la cabeza fría.</li>
        <li>En una receta o en un manual, sabes que la persona que escribe quiere que la sigas paso a paso.</li>
        <li>Y en un titular, entiendes que solo te está informando de algo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Un cartel dice: «Este parque se cuida entre todos. Ayúdanos a mantenerlo limpio». ¿Quién es la audiencia de ese cartel?</p>',
        opciones: ['Las personas que usan el parque', 'El municipio que lo escribió', 'Los niños del barrio', 'Nadie: los carteles no tienen audiencia'],
        correcta: 0,
        pista: '<p>La audiencia es quien recibe el mensaje, no quien lo escribe.</p>',
        solucion: '<p>La primera: <strong>las personas que usan el parque</strong>. El municipio es el autor, no la audiencia. Y el cartel se dirige a cualquiera que entre por la puerta, por eso habla en plural y no a una persona concreta.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una receta empieza así: «Mezcla un huevo, dos tazas de harina y una pizca de sal. Amasa hasta que la masa quede suave». ¿Qué quiere el autor de esa receta?</p>',
        opciones: ['Que pruebes la receta y digas qué te pareció', 'Que le digas a otra persona que la prepare', 'Que la prepares siguiendo los pasos', 'Que compres los ingredientes en una tienda concreta'],
        correcta: 2,
        pista: '<p>Mira el verbo: la receta te dice qué hacer, paso a paso.</p>',
        solucion: '<p>La tercera: <strong>que la prepares siguiendo los pasos</strong>. La receta es un texto instructivo: su intención es que hagas la receta. No quiere que compres en una tienda concreta ni que opines sobre el sabor.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué delata la intención de este texto: «Quedan doce plazas. Llama hoy mismo»?</p>',
        opciones: ['Que usa un número', 'Que termina con una llamada a actuar, dirigida a ti', 'Que habla en pasado', 'Que no menciona ningún precio'],
        correcta: 1,
        pista: '<p>Busca la parte del texto que le pide algo a quien lo lee.</p>',
        solucion: '<p>La segunda: <strong>que termina con una llamada a actuar, dirigida a ti</strong>. «Llama hoy mismo» es una orden: el texto quiere que llames. El número y el tiempo solo sirven para meterte prisa.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama lo que el autor quiere conseguir con un texto? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['intención', 'la intención', 'intención del autor', 'la intención del autor', 'lo que el autor quiere conseguir con el texto', 'lo que el autor quiere conseguir del texto', 'lo que el autor quiere del texto', 'lo que quiere el autor con el texto'],
        pista: '<p>Es una palabra de nueve letras que empieza por «in» y significa lo que alguien se propone.</p>',
        solucion: '<p>Se llama <strong>intención</strong> (<span lang="en">intention</span>): lo que el autor quiere conseguir con el texto. Con la audiencia y la intención ya sabes a quién le habla y qué espera de esa persona.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena las tres preguntas que te ayudan a descubrir la intención de un texto.</p>',
        respuesta: ['¿Quién escribe esto?', '¿Para quién escribe?', '¿Qué quiere que haga yo?'],
        pista: '<p>Primero el autor, después su público y al final lo que pide.</p>',
        solucion: '<p>El orden es: ¿quién escribe esto?, ¿para quién escribe? y ¿qué quiere que haga yo? Después de contestarlas, comprueba en el texto que hay una frase que lo respalde.</p>' },
      { tipo: 'numero', enunciado: '<p>En la tabla hay 4 textos y solo 1 se limita a informar. ¿Cuántos te piden que hagas algo?</p>', respuesta: 4 - 1,
        pista: '<p>Restas del total los textos que solo informan.</p>',
        solucion: '<p>4 textos menos 1 que solo informa son <strong>3 textos</strong> que te piden que hagas algo: el cartel, la receta y el manual. El titular es el único que solo te informa.</p>' },
    ],
    fuentes: [CBC, WIKI_INTENCION, WIKI_AUTOR],
  });

  // ------------------------------------------------------------------
  // Las tres piezas de un argumento y las dos preguntas que quedan.
  const ARGUMENTO = diagrama([0, 12], [0.8, 6], [
    caja(0.5, 4.0, 5.5, 5.8), txt(3, 5.35, 'Premisa'), txt(3, 4.75, 'la razón que se da'),
    caja(6.5, 4.0, 11.5, 5.8), txt(9, 5.35, 'Conclusión'), txt(9, 4.75, 'lo que debes aceptar'),
    caja(0.5, 1.0, 5.5, 2.8), txt(3, 2.35, 'Pruebas'), txt(3, 1.75, 'los datos que la apoyan'),
    caja(6.5, 1.0, 11.5, 3.0), txt(9, 2.6, 'Dos preguntas'), txt(9, 2.1, '¿Sostiene la razón?'), txt(9, 1.6, '¿Qué pruebas faltan?'),
    ...flecha([5.5, 4.9], [6.5, 4.9]),
    ...flecha([1.6, 2.8], [1.6, 4.0]),
    txt(4.0, 3.4, 'apoyan la razón'),
  ], 'Diagrama con tres cajas y una más. Arriba a la izquierda, una caja con «Premisa: la razón que se da», y arriba a la derecha, otra con «Conclusión: lo que debes aceptar», unidas por una flecha que va de la primera a la segunda. Abajo a la izquierda, una caja con «Pruebas: los datos que la apoyan», con una flecha que sube hacia la caja de la premisa y la frase «apoyan la razón» al lado. Abajo a la derecha, una caja con «Dos preguntas», «¿Sostiene la razón?» y «¿Qué pruebas faltan?».');

  // La estructura por causa: un hecho causa otro y los dos fundamentan la tesis.
  const CAUSA = diagrama([0, 12], [0.8, 8], [
    caja(3.0, 6.2, 9.0, 7.8), txt(6, 7.35, 'Hecho 1'), txt(6, 6.75, 'la causa'),
    caja(3.0, 3.9, 9.0, 5.3), txt(6, 4.85, 'Hecho 2'), txt(6, 4.25, 'el efecto'),
    caja(3.0, 1.0, 9.0, 2.8), txt(6, 2.35, 'Conclusión'), txt(6, 1.75, 'lo que se quiere defender'),
    ...flecha([6, 6.2], [6, 5.3]), txt(6.9, 5.75, 'causa'),
    ...flecha([6, 3.9], [6, 2.8]), txt(7.6, 3.35, 'fundamenta'),
  ], 'Diagrama con tres cajas apiladas de arriba abajo y dos flechas. La caja de arriba dice «Hecho 1: la causa», la del medio «Hecho 2: el efecto», y la de abajo «Conclusión: lo que se quiere defender». La primera flecha baja del hecho 1 al hecho 2 y tiene al lado la palabra «causa»; la segunda baja del hecho 2 a la conclusión y tiene al lado la palabra «fundamenta».');

  // ------------------------------------------------------------------
  L('Cómo se construye un argumento', {
    objetivo: 'Separar las piezas de un argumento (premisa, conclusión y pruebas) y comprobar si la razón sostiene de verdad la conclusión.',
    explicacion: `
      <p>Lee esta frase: «Hay que subir el precio del agua porque se está agotando». A primera vista parece una sola idea, pero tiene dos partes: una razón y una conclusión. Si las separas, ya ves cómo se montó el razonamiento.</p>
      <p>Un <strong>argumento</strong> (<span lang="en">argument</span>) es un razonamiento que va de unas razones a una conclusión. La razón que se da es la <strong>premisa</strong> (<span lang="en">premise</span>), y lo que se quiere que aceptes es la <strong>conclusión</strong> (<span lang="en">conclusion</span>). Aparte están las pruebas: los datos que apoyan la razón. Son tres piezas, y el trabajo consiste en separarlas.</p>
      <p>Un ejemplo que lo enseña rápido: «Todos los alumnos de tercero hacen Senderismo, tú estás en tercero, luego deberías hacer Senderismo». Aquí la premisa es «todos los alumnos de tercero hacen Senderismo», la conclusión es «deberías hacer Senderismo», y las pruebas son las que el texto no da. Fíjate en la palabra «todos»: en un curso real hay alguien que no hizo Senderismo, así que la premisa no está probada. Por eso separar las piezas sirve: en cuanto las separas, ves el hueco.</p>
      <h3>Las dos preguntas que quedan</h3>
      <p>Después de separar, siempre quedan dos preguntas. La primera: ¿la razón sostiene de verdad la conclusión? La segunda: ¿qué pruebas faltan? Un argumento no es fuerte porque grite más, y tampoco es débil solo porque a alguien no le guste lo que dice.</p>
      <p>Los contenidos básicos comunes de Lengua del Ministerio de Educación de la Nación (Argentina, documento sin fecha de publicación) piden el «reconocimiento de la estructura textual», la «identificación de hechos y opiniones en el texto» y la «elaboración de inferencias y fundamentación de opiniones». Reconocer la estructura de un texto argumentativo es, en el fondo, esto mismo: ver qué pieza hace de premisa, cuál de conclusión y dónde están los datos que las sostienen.</p>
      <p>La entrada de Wikipedia en español sobre el argumento (apoyo) lo define como un conjunto de premisas seguidas de una conclusión. Y la de texto argumentativo (apoyo) describe el razonamiento por causa: se establece una conexión causal entre dos hechos que fundamentan la tesis, y llama tesis inicial a la idea fundamental que se quiere defender, que aquí es la conclusión.</p>
      <p>Este es el mapa de las piezas, con las dos preguntas que quedan al final:</p>
      ${ARGUMENTO}
      <div class="tabla-wrap"><table>
        <thead><tr><th>La pieza</th><th>Qué es</th><th>Cómo la detecto en el texto</th></tr></thead>
        <tbody>
          <tr><th scope="row">Premisa</th><td>La razón que se da</td><td>Suele venir con «porque» o con «ya que»</td></tr>
          <tr><th scope="row">Conclusión</th><td>Lo que se quiere que aceptes</td><td>Es la frase que dice qué hay que hacer, pensar o creer</td></tr>
          <tr><th scope="row">Pruebas</th><td>Los datos que apoyan la razón</td><td>Son las cifras, los ejemplos y los datos concretos del texto</td></tr>
        </tbody>
      </table></div>
      <p>Y así se ve la estructura por causa, que es la que usa el ejemplo del agua:</p>
      ${CAUSA}
      <p class="nota"><strong>Trampa común:</strong> dar por buena una conclusión porque te parece razonable. Que a ti te parezca justo no dice nada de si las pruebas la sostienen.</p>
      <p>Y hay un puente con lo que ya sabes: en "Mapas conceptuales" viste que un mapa conceptual une ideas con flechas que llevan una frase. Un mapa de un argumento es justo eso, una flecha que va de la razón a la conclusión. En "Idea principal e ideas secundarias" viste que la idea principal manda sobre las demás, y en un texto argumentativo esa idea principal es la conclusión.</p>`,
    ejemplo: `
      <p>Vamos a desmontar el argumento del precio del agua, paso a paso. El texto es de ejemplo:</p>
      <div class="nota texto-muestra"><p>Hay que subir el precio del agua porque se está agotando. Los datos de los embalses de los últimos años muestran que el agua disponible ha bajado.</p></div>
      <ol class="pasos-ej">
        <li>La premisa, la razón que se da: el agua se está agotando.</li>
        <li>La conclusión, lo que se quiere que aceptes: el precio tiene que subir.</li>
        <li>Las pruebas que el texto da: una, los datos de los embalses, que dicen que el agua disponible ha bajado.</li>
        <li>Faltan dos pruebas. Una sería cómo afecta el precio a quien consume menos agua, y la otra, si hay soluciones que no sean subir el precio.</li>
      </ol>
      <p>Al escribir el mapa del argumento en dos frases, el hueco se ve: «porque el agua se está agotando, el precio tiene que subir». Y al lado, las pruebas: una está, dos no.</p>
      <p class="nota"><strong>Error común:</strong> quedarte con la conclusión porque te parece razonable. Lo que hay que mirar es si las pruebas que faltan, cuando aparezcan, sostienen la conclusión.</p>`,
    vidaReal: `
      <p>Cada vez que alguien te convence de algo hay un razonamiento detrás, y casi siempre puedes desmontarlo en piezas. Saber hacerlo te sirve en muchos sitios:</p>
      <ul>
        <li>En un debate del colegio, para ver si lo que te dicen se sostiene con datos.</li>
        <li>En un aviso o en una carta, para saber qué quieren que hagas y con qué se justifican.</li>
        <li>En las noticias, para separar la razón que dan de lo que quieren que creas.</li>
        <li>Y en un trabajo tuyo, para comprobar que tus ideas tienen pruebas detrás.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>En el argumento «El agua se está agotando, por eso hay que subir su precio», ¿cuál es la premisa?</p>',
        opciones: ['Hay que subir el precio del agua', 'El agua se está agotando', 'El agua es un bien público', 'Subir el precio no es justo'],
        correcta: 1,
        pista: '<p>La premisa es la razón que se da, no lo que se quiere que aceptes.</p>',
        solucion: '<p>La segunda: <strong>el agua se está agotando</strong>. Esa es la razón del argumento. Lo que se quiere que aceptes, la conclusión, es «hay que subir su precio», y por eso las dos frases no pueden ser la misma pieza.</p>' },
      { tipo: 'opciones', enunciado: '<p>En el mismo argumento, ¿cuál es la conclusión, es decir, lo que se quiere que aceptes?</p>',
        opciones: ['El agua se está agotando', 'El precio del agua sube cada año', 'Hay que subir el precio del agua', 'Nadie bebe agua del grifo'],
        correcta: 2,
        pista: '<p>Es la frase que el argumento quiere que te lleves.</p>',
        solucion: '<p>La tercera: <strong>hay que subir el precio del agua</strong>. La primera opción es la premisa, la razón que se da. Y el dato de que el precio sube cada año no lo dice el texto: es un dato inventado para distraer.</p>' },
      { tipo: 'opciones', enunciado: '<p>La entrada de Wikipedia sobre el texto argumentativo (apoyo) describe un razonamiento por causa. ¿Cuál de estos textos sigue esa estructura?</p>',
        opciones: ['«Hay que subir el precio del agua porque se está agotando.»', '«En este barrio hay tres papeleras y casi nadie las usa.»', '«El parque abre a las ocho.»', '«Esta receta es para cuatro personas.»'],
        correcta: 0,
        pista: '<p>Busca el texto donde una cosa es la causa de la otra.</p>',
        solucion: '<p>El primero: <strong>«Hay que subir el precio del agua porque se está agotando»</strong>. El agotamiento del agua es la causa y el precio es la consecuencia. Los otros tres textos no relacionan dos hechos, sino que dan un dato suelto o una instrucción.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la razón que se da en un argumento? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['premisa', 'la premisa', 'una premisa', 'la premisa de un argumento', 'la razón que se da', 'la razón que se da en un argumento', 'la razón que da el argumento'],
        pista: '<p>Es una palabra de siete letras que empieza por «pre».</p>',
        solucion: '<p>Se llama <strong>premisa</strong> (<span lang="en">premise</span>): la razón que se da en el argumento. La conclusión es lo que se quiere que aceptes, y las pruebas son los datos que apoyan la razón.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas de un argumento siguiendo el camino del razonamiento.</p>',
        respuesta: ['Las pruebas: los datos que apoyan la razón', 'La premisa: la razón que se da', 'La conclusión: lo que se quiere que aceptes'],
        pista: '<p>Primero los datos, después la razón y al final lo que se quiere que aceptes.</p>',
        solucion: '<p>El orden es: las pruebas, la premisa y la conclusión. Los datos apoyan la razón, y la razón lleva a la conclusión. Escribir ese camino en dos frases es la mejor forma de ver qué falta.</p>' },
      { tipo: 'numero', enunciado: '<p>El texto del ejemplo da 1 prueba y deja 2 pruebas sin dar. ¿Cuántas pruebas hay que revisar en total?</p>', respuesta: 1 + 2,
        pista: '<p>Sumas las pruebas que da el texto y las que le faltan.</p>',
        solucion: '<p>1 prueba que da el texto más 2 que le faltan son <strong>3 pruebas</strong> que hay que revisar. Las que faltan suelen ser las que deciden si el argumento se sostiene.</p>' },
    ],
    fuentes: [CBC, WIKI_ARGUMENTO, WIKI_ARGUMENTATIVO],
  });

  // ------------------------------------------------------------------
  L('Falacias comunes', {
    objetivo: 'Reconocer las falacias más comunes en un texto o en una conversación, explicar cómo se detectan y decidir qué respuesta sirve.',
    explicacion: `
      <p>En un debate de clase alguien suelta: «No le hagas caso: no sabe de qué habla». Eso no es un argumento, es un golpe. Y hay muchos golpes así, todos con nombre. Cuando sabes el nombre, los ves enseguida.</p>
      <p>Una <strong>falacia</strong> (<span lang="en">fallacy</span>) es un error en el razonamiento: un paso que parece bueno y no lo es. Wikipedia en español (apoyo) lo resume: una falacia es un argumento que parece válido pero no lo es, y pueden ser muy sutiles y persuasivas, por lo que hay que poner mucha atención para detectarlas. La Internet Encyclopedia of Philosophy (en inglés) va por el mismo camino: «<span lang="en">A fallacy is a kind of error in reasoning</span>». La Foundation for Critical Thinking (en inglés) añade un matiz: una falacia es un defecto del razonamiento, no solo unas premisas falsas.</p>
      <h3>Las cinco que se ven enseguida</h3>
      <p>El <strong>ataque personal</strong> (<span lang="en">ad hominem</span>) ataca a la persona en vez de responder a la idea: en lugar de decir «esto no se sostiene», dice «quien lo dice no sabe de qué habla». La entrada de Wikipedia en español sobre el argumento ad hominem (apoyo) cuenta que, a principios del siglo XX, se vinculó con una falacia lógica: el debatiente atacaba a su oponente en lugar de refutar el argumento. La <strong>generalización</strong> (<span lang="en">generalization</span>) da por cierto un caso general a partir de uno o de pocos: si has visto dos materias en las que el profesor se equivocaba, dices que siempre se equivoca.</p>
      <p>Las otras tres tienen nombre pero se reconocen por la forma. El falso dilema ofrece dos opciones cuando hay más. La apelación a la autoridad fuera de lugar da la opinión de alguien que no es experto, y la apelación a la emoción apela al miedo o al cariño en vez de a la prueba.</p>
      <p>Y hay dos avisos que evitan discusiones. El primero: una falacia no es necesariamente una mentira. Alguien puede creer de verdad lo que dice y estar equivocándose, así que se habla de que razona mal, no de que miente. El segundo: cuando pillas una falacia, el objetivo no es ganar el debate, sino pedir la prueba que falta: «¿con qué datos?». Las falacias informales, que son las de esta lección, son un tipo de argumento incorrecto en el lenguaje natural (Wikipedia en español, apoyo): salen en cualquier conversación y no solo en los libros.</p>
      <p>Esta es la tabla que te puedes llevar: cómo se reconoce cada una, un ejemplo y la pregunta que funciona.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>La falacia</th><th>Cómo se reconoce</th><th>Un ejemplo</th><th>Qué se responde</th></tr></thead>
        <tbody>
          <tr><td>Ataque personal</td><td>Se ataca a la persona en vez de a la idea</td><td>«Eres demasiado joven para opinar de esto»</td><td>«¿Qué prueba apoya tu idea?»</td></tr>
          <tr><td>Generalización</td><td>Se saca una regla de uno o de pocos casos</td><td>«En mi clase nadie lee, así que leer no sirve»</td><td>«¿En cuántas clases lo has visto?»</td></tr>
          <tr><td>Falso dilema</td><td>Se ofrecen dos opciones y se dice que no hay más</td><td>«O estudias más o no vale la pena»</td><td>«¿Qué otras opciones hay?»</td></tr>
          <tr><td>Autoridad fuera de lugar</td><td>Quien da la opinión no es experto en el tema</td><td>«Un jugador de fútbol explica cómo se abona un huerto»</td><td>«¿Quién sabe de esto de verdad?»</td></tr>
          <tr><td>Apelación a la emoción</td><td>Se apela al miedo o al cariño, no a la prueba</td><td>«Si no firmas esto, perderás el trabajo»</td><td>«¿Qué dice el texto del trabajo?»</td></tr>
        </tbody>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> creer que señalar una falacia gana la discusión. No la gana: la destapa. La respuesta útil es pedir el dato que falta y seguir leyendo.</p>
      <p>El orden de trabajo es el mismo que viste en "Cómo se construye un argumento": separa la conclusión, separa la razón, comprueba si la razón sostiene la conclusión y, si no, busca la falacia. En "Cómo leer estadísticas en las noticias sin que te engañen" (Matemáticas) la generalización aparece como el error típico con los porcentajes.</p>`,
    ejemplo: `
      <p>Vamos a mirar un chat de ejemplo con tres falacias:</p>
      <div class="nota texto-muestra">
        <p>Ana: El club de lectura del centro va fatal. Yo estuve el mes pasado y solo había tres personas, así que hay que cerrarlo.</p>
        <p>Bruno: No voy a un club donde va alguien que no ha abierto un libro en su vida.</p>
        <p>Carla: O se arregla el club o se cierra. No hay tercera opción.</p>
      </div>
      <ol class="pasos-ej">
        <li>Ana hace una generalización: de una tarde con tres personas salta a «hay que cerrarlo». Faltan los datos de los otros meses.</li>
        <li>Bruno hace un ataque personal: en vez de decir qué no le gusta del club, ataca a una persona y supone algo que no sabe.</li>
        <li>Carla hace un falso dilema: presenta dos caminos cuando puede haber un tercero, y no dice cuál es el bueno.</li>
      </ol>
      <p>La respuesta sirve para los tres casos: en lugar de devolver el golpe, se pide el dato que falta y se deja hablar a la otra persona.</p>
      <p class="nota"><strong>Error común:</strong> responder a un ataque personal con otro ataque personal. Así el debate sube de tono, no de nivel.</p>`,
    vidaReal: `
      <p>Detectar un error de razonamiento te sirve en muchos sitios, y casi siempre te ahorra discutir:</p>
      <ul>
        <li>En un debate de clase, para ver si lo que te dicen se sostiene con datos.</li>
        <li>En un chat de la familia, para no entrar en una discusión que no lleva a ninguna parte.</li>
        <li>En un anuncio o en un cartel, para ver a quién le conviene lo que se dice.</li>
        <li>Y en una conversación con un amigo, para responder con una pregunta en vez de con un golpe.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>En un debate, alguien dice: «No escuches a quien dice eso, no tiene ni idea del tema». ¿Qué falacia es?</p>',
        opciones: ['Un ataque personal, porque ataca a la persona en vez de responder a la idea', 'Una generalización, porque saca una regla de un solo caso', 'Un falso dilema, porque presenta solo dos opciones', 'Una apelación a la autoridad, porque no cita ninguna fuente'],
        correcta: 0,
        pista: '<p>Pregunta qué se está discutiendo: la idea de la otra persona o la otra persona.</p>',
        solucion: '<p>La primera: <strong>un ataque personal</strong>. La respuesta no toca lo que dice la otra persona, sino su capacidad de decirlo. En una generalización habría un salto de un caso a todos, y aquí no hay ningún caso: solo un desprecio.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas respuestas sirve de verdad ante un ataque personal?</p>',
        opciones: ['«Estás equivocado y no entiendes nada»', '«¿Qué dato demuestra eso?»', '«Todos los de tu edad dicen lo mismo»', '«Mejor no discutimos esto»'],
        correcta: 1,
        pista: '<p>La respuesta útil pide una prueba y no devuelve el golpe.</p>',
        solucion: '<p>La segunda: <strong>«¿Qué dato demuestra eso?»</strong>. Pide el dato que falta y deja a la otra persona con la palabra. La primera y la tercera son dos ataques personales más, y la cuarta esquiva el tema.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un texto dice: «Los dos primeros días fueron un desastre, así que el plan no va a funcionar». ¿Qué le falta a ese razonamiento?</p>',
        opciones: ['Una definición de plan', 'Un ataque personal', 'Los datos de los demás días y una explicación', 'Una autoridad que firmara el plan'],
        correcta: 2,
        pista: '<p>Piensa qué más haría falta para saber si el plan funciona, y no en quién lo dice.</p>',
        solucion: '<p>La tercera: <strong>los datos de los demás días y una explicación</strong>. Con dos días no se puede juzgar un plan entero: falta la información de lo que pasó después. No falta ninguna persona ni ninguna firma.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama un error en el razonamiento, un paso que parece bueno y no lo es? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['falacia', 'la falacia', 'una falacia', 'error en el razonamiento', 'un error en el razonamiento', 'un error del razonamiento', 'un paso que parece bueno y no lo es', 'un argumento que parece válido pero no lo es'],
        pista: '<p>Es una palabra de siete letras que empieza por «f» y acaba en «a».</p>',
        solucion: '<p>Se llama <strong>falacia</strong> (<span lang="en">fallacy</span>): un error en el razonamiento, un paso que parece bueno y no lo es. Su nombre en inglés es <span lang="en">fallacy</span>.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para analizar un argumento y encontrar sus falacias.</p>',
        respuesta: ['Identifica la conclusión: lo que se quiere que aceptes', 'Identifica la razón: la premisa', 'Comprueba si la razón sostiene de verdad la conclusión', 'Si no la sostiene, busca la falacia que rompe el paso'],
        pista: '<p>Primero separas las dos piezas, luego las comparas y al final buscas el error.</p>',
        solucion: '<p>El orden es: identificar la conclusión, identificar la razón, comprobar si la razón sostiene la conclusión y, si no, buscar la falacia. Es el mismo camino que viste en "Cómo se construye un argumento", con un paso más.</p>' },
      { tipo: 'numero', enunciado: '<p>En la tabla de la lección hay 5 falacias y en el chat del ejemplo aparecen 3. ¿Cuántas de la tabla no aparecen en el chat?</p>', respuesta: 5 - 3,
        pista: '<p>Restas las falacias del chat al total de la tabla.</p>',
        solucion: '<p>5 falacias de la tabla menos 3 que aparecen en el chat son <strong>2 falacias</strong>: la apelación a la autoridad fuera de lugar y la apelación a la emoción.</p>' },
    ],
    fuentes: [WIKI_FALACIA, WIKI_FALACIA_INFORMAL, WIKI_AD_HOMINEM, IEP_FALLACIES, FCT_FALLACIES],
  });

  // ------------------------------------------------------------------
  // Dos rutas que se mezclan: lo que ya crees y lo que dice el texto.
  const SESGOS = diagrama([0, 13], [0, 8.6], [
    caja(0.4, 6.2, 5.4, 8.0), txt(2.9, 7.5, 'Lo que yo ya creo'), txt(2.9, 6.8, 'lo que pensaba antes'),
    caja(0.4, 4.0, 5.4, 5.8), txt(2.9, 5.3, 'Lo que dice el texto'), txt(2.9, 4.6, 'lo que el texto cuenta'),
    caja(6.2, 5.0, 12.6, 7.2), txt(9.4, 6.6, 'Se mezclan'), txt(9.4, 5.9, 'y ya no los distingues'),
    caja(6.2, 2.2, 12.6, 4.4), txt(9.4, 3.8, 'Lo que yo entiendo'), txt(9.4, 3.1, 'sin saber qué es de quién'),
    ...flecha([5.4, 7.1], [6.2, 6.6]),
    ...flecha([5.4, 4.9], [6.2, 5.6]),
    ...flecha([9.4, 5.0], [9.4, 4.4]),
  ], 'Diagrama con dos cajas a la izquierda y dos a la derecha, unidas por flechas. Arriba a la izquierda, una caja con «Lo que yo ya creo: lo que pensaba antes». Debajo, otra con «Lo que dice el texto: lo que el texto cuenta». Las dos flechas van hacia una caja de la derecha, «Se mezclan: y ya no los distingues», y de esa caja baja una flecha a una última caja, «Lo que yo entiendo: sin saber qué es de quién».');

  // ------------------------------------------------------------------
  L('Sesgos cognitivos', {
    objetivo: 'Reconocer los sesgos cognitivos que te inclinan sin que te enteres y saber qué pasos seguir para leer sin dejarte anclar ni buscar solo lo que ya creías.',
    explicacion: `
      <p>Lee este titular de ejemplo: «El 70 % de los jóvenes no lee». A partir de ese 70 %, todo lo que leas del artículo va a parecer grave, aunque el artículo cuente el mismo dato al revés, con un 30 %. El número te ha sujetado la cabeza.</p>
      <p>Un <strong>sesgo</strong> (<span lang="en">bias</span>) es la inclinación automática con la que piensas, sin darte cuenta. Wikipedia en español (apoyo) lo define como un efecto psicológico que desvía el procesamiento mental y lleva a un juicio inexacto. La cabeza no es neutra: dos personas pueden leer el mismo texto y sacar cosas distintas.</p>
      <h3>El efecto de anclaje</h3>
      <p>El <strong>efecto de anclaje</strong> (<span lang="en">anchoring</span>) es la tendencia a confiar demasiado en la primera información que te ofrecen. Wikipedia en español (apoyo) lo describe como confiar en el ancla, que es el primer dato, y el Behavioural Insights Team (en inglés, 2018) lo define como verse influido por la información a la que ya se estuvo expuesto, aunque no tenga que ver con la decisión. Fíjate en el titular: si el 70 % va primero, el 30 % del final parece una buena noticia, y si el 30 % va primero, el mismo 70 % parece una catástrofe. El número no ha cambiado, pero tu lectura sí.</p>
      <h3>El efecto de confirmación</h3>
      <p>El <strong>efecto de confirmación</strong> (<span lang="en">confirmation bias</span>) es buscar, interpretar y recordar la información que confirma lo que ya creías, dejando de lado las alternativas. Wikipedia en español (apoyo) lo describe como favorecer la información que confirma las propias creencias y dejar de lado las alternativas, y el Behavioural Insights Team (en inglés, 2018) lo resume como la tendencia a buscar, interpretar, juzgar y recordar la información de manera que apoye las ideas previas. Por eso un texto que confirma lo que ya pensabas te parece más sólido que otro que te pone en duda, y no es porque el segundo sea falso.</p>
      <h3>Un aviso: el efecto Dunning-Kruger</h3>
      <p>Hay un sesgo más que conviene conocer como aviso. El efecto Dunning-Kruger, según Wikipedia en español (apoyo), es el sesgo por el que las personas con capacidades limitadas en un área concreta tienden a sobreestimar su desempeño real en ella. OpenStax (en inglés) lo define como el sesgo cognitivo en el que las personas con poca experiencia en una tarea valoran su conocimiento por encima del de quienes tienen más. En una frase: quien menos sabe de un tema tiende a creerse mejor de lo que es. Es un aviso para desconfiar de la seguridad que no viene con datos.</p>
      <h3>Dos reglas de lectura</h3>
      <p>De todo esto salen dos reglas prácticas. La primera: separa lo que tú ya creías de lo que dice el texto, y anótalo en dos columnas. La segunda: busca el primer dato del texto antes de leer el resto, porque es el que te va a anclar. Y nada de esto es culpa tuya: por eso se llaman sesgos y no errores de carácter.</p>
      <p>La tabla resume los tres sesgos.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>El sesgo</th><th>Cómo se nota leyendo</th><th>Qué hago para contrarrestarlo</th></tr></thead>
        <tbody>
          <tr><th scope="row">Efecto de anclaje</th><td>El primer dato del texto se queda y tira del resto</td><td>Busco el primer dato antes de leer nada más</td></tr>
          <tr><th scope="row">Efecto de confirmación</th><td>Me fijo en lo que confirma mi idea y paso por alto lo demás</td><td>Escribo aparte lo que yo creía y lo que dice el texto</td></tr>
          <tr><th scope="row">Efecto Dunning-Kruger</th><td>Me siento seguro de un tema que controlo poco</td><td>Busco datos y no me fío de la seguridad</td></tr>
        </tbody>
      </table></div>
      <p>Así se te mezclan las dos cosas:</p>
      ${SESGOS}
      <p class="nota"><strong>Trampa común:</strong> creer que te has engañado es un error de carácter. No lo es: los sesgos son automáticos y funcionan en todo el mundo, y por eso tienen nombre.</p>
      <p>En "Cómo leer estadísticas en las noticias sin que te engañen" (Matemáticas) los porcentajes se leen con la misma desconfianza, y la diferencia entre un dato y una impresión es la que separaste en "Hechos y opiniones".</p>`,
    ejemplo: `
      <p>Vamos a trabajar el titular del 70 %, que es de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Lo que dice el texto: el 30 % de los jóvenes sí lee.</li>
        <li>Lo que se te ha quedado en la cabeza: el 70 % del titular.</li>
        <li>Cómo cambia la lectura: con el 70 % delante, el 30 % del final parece una mejora, y con el 30 % delante, el mismo 70 % del final parecería un problema. El dato no ha cambiado; ha cambiado tu punto de partida.</li>
        <li>Qué hacer: buscar el primer dato antes de leer el resto, separar en dos columnas lo que ya creía y lo que dice el texto, y contrastar la cifra con su fuente.</li>
      </ol>
      <p>Y el efecto de confirmación aparece después: si ya piensas que leer no sirve, un texto que dice «el 70 % no lee» te convence más que otro que diga que sí, y eso no es porque el segundo sea falso.</p>
      <p class="nota"><strong>Error común:</strong> dar por bueno el titular y leer el cuerpo buscando la razón. A veces el titular y el cuerpo no cuentan lo mismo.</p>`,
    vidaReal: `
      <p>Estas inclinaciones no son un defecto tuyo: funcionan en todas las personas, y conocerlas te ayuda a no dejarte llevar por ellas:</p>
      <ul>
        <li>En una noticia, para no leer solo lo que ya pensabas.</li>
        <li>En un debate, para preguntarte qué prueba cambiaría tu opinión.</li>
        <li>En un buscador o en un asistente, para comprobar que no te está contestando lo que querías oír.</li>
        <li>Y en un trabajo, para darle el mismo peso a los datos que no te gustan.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Lees el titular «El 70 % de los jóvenes no lee» y más abajo el texto dice que el 30 % sí lee. ¿Qué está pasando? Las cifras son inventadas.</p>',
        opciones: ['Actúa el efecto de anclaje: el 70 % del titular se ha quedado y ha cambiado cómo lees el 30 %', 'Actúa el efecto de confirmación: el artículo solo cuenta lo que tú ya creías', 'Actúa el efecto Dunning-Kruger: el titular te hace sentir experto en el tema', 'No pasa nada: el orden de los datos no cambia lo que se entiende'],
        correcta: 0,
        pista: '<p>Fíjate en qué dato se ha quedado en tu cabeza antes de leer el otro.</p>',
        solucion: '<p>La primera: <strong>actúa el efecto de anclaje</strong>. El 70 % del titular es el ancla, y con ese número delante el 30 % se lee como una buena noticia. Si el 30 % hubiera ido primero, el 70 % del final se habría leído como un problema. Las cifras de este ejemplo son inventadas.</p>' },
      { tipo: 'opciones', enunciado: '<p>Ya crees que las novelas no valen la pena. En una conversación sueltas que todas las novelas son un desastre y no te fijas en lo que el otro cuenta de las que le gustaron. ¿Qué está pasando?</p>',
        opciones: ['Es un hecho comprobable: si todas las novelas son un desastre, ya no es una opinión', 'Es el efecto Dunning-Kruger: hablas del tema con una seguridad que no tienes', 'Es el efecto de confirmación: atiendes y recuerdas lo que confirma lo que ya creías', 'No pasa nada: las opiniones no se pueden comprobar y no hay nada que hacer'],
        correcta: 2,
        pista: '<p>La pregunta es qué partes de lo que te dijeron te has quedado.</p>',
        solucion: '<p>La tercera: <strong>es el efecto de confirmación</strong>. Buscas, escuchas y recuerdas lo que confirma tu idea, y las partes que la pondrían en duda se te escapan. Lo que dijo el otro no era falso, es que solo te quedaste con una parte.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es lo mejor que puedes hacer para no dejarte llevar por el sesgo de confirmación?</p>',
        opciones: ['Quedarte con lo que ya sabías, que para algo ya lo sabías', 'Escribir en dos columnas lo que yo ya creo y lo que dice el texto, y compararlas', 'Buscar solo el titular, que es la parte que más dice de todo el texto', 'Preguntarle a un asistente, que tiene todos los datos a mano'],
        correcta: 1,
        pista: '<p>El truco es hacer visible la diferencia entre lo que traías y lo que te dan.</p>',
        solucion: '<p>La segunda: <strong>escribir en dos columnas lo que yo ya creo y lo que dice el texto</strong>. Al ponerlas una al lado de la otra se ve qué parte de lo que has entendido era tuya y qué parte venía del texto. Y un asistente también puede confirmar lo que ya pensabas, así que no es una fuente fiable de por sí.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la inclinación automática con la que piensas, sin darte cuenta? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['sesgo', 'el sesgo', 'un sesgo', 'sesgo cognitivo', 'el sesgo cognitivo', 'inclinación automática al pensar', 'la inclinación automática con la que piensas', 'inclinación automática con la que piensas sin darte cuenta'],
        pista: '<p>Es una palabra de cinco letras que empieza por «s» y que en inglés es «bias».</p>',
        solucion: '<p>Se llama <strong>sesgo</strong> (<span lang="en">bias</span>): la inclinación automática con la que piensas, sin darte cuenta. Los tres sesgos de esta lección son el efecto de anclaje, el efecto de confirmación y el efecto Dunning-Kruger.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para leer un texto sin dejarte anclar.</p>',
        respuesta: ['Busca el primer dato del texto, que es el que te va a anclar', 'Separa en dos columnas lo que tú ya creías y lo que dice el texto', 'Comprueba de dónde sale cada cifra y quién la firma', 'Decide qué te has creído sin darte cuenta y vuelve a leerlo'],
        pista: '<p>Empiezas por el ancla, luego separas las dos columnas y al final compruebas.</p>',
        solucion: '<p>El orden es: buscar el primer dato del texto, separar en dos columnas lo que ya creías y lo que dice el texto, comprobar de dónde sale cada cifra y, al final, decidir qué te has creído sin darte cuenta. El último paso es el que hace el trabajo.</p>' },
      { tipo: 'numero', enunciado: '<p>En esta lección se nombran 3 sesgos concretos: el efecto de anclaje, el efecto de confirmación y el efecto Dunning-Kruger. ¿Cuántos sesgos son?</p>', respuesta: 1 + 1 + 1,
        pista: '<p>Suma uno por cada sesgo que nombra la lección.</p>',
        solucion: '<p>1 + 1 + 1 = <strong>3 sesgos</strong>: el efecto de anclaje, el efecto de confirmación y el efecto Dunning-Kruger. El efecto Dunning-Kruger va como aviso, y por eso la lección no le pone cifras.</p>' },
    ],
    fuentes: [WIKI_SESGO, WIKI_CONFIRMACION, WIKI_ANCLAJE, WIKI_DUNNING, OPENSTAX, BIT],
  });

  // ------------------------------------------------------------------
  // Un mensaje y las dos rutas que puede tomar según su fuente.
  const RUTAS_MENSAJE = diagrama([0, 13], [0, 10], [
    caja(4.4, 8.0, 8.6, 9.4), txt(6.5, 8.9, 'El mensaje'), txt(6.5, 8.2, 'que te llega'),
    caja(0.4, 5.0, 4.4, 6.6), txt(2.4, 5.9, 'Con nombre'), txt(2.4, 5.2, 'y con fecha'),
    caja(0.4, 1.6, 4.4, 3.2), txt(2.4, 2.5, 'Puedes comprobar'), txt(2.4, 1.8, 'el dato'),
    caja(8.6, 5.0, 12.6, 6.6), txt(10.6, 5.9, 'Sin rostro'), txt(10.6, 5.2, 'ni fecha ni lugar'),
    caja(8.6, 1.6, 12.6, 3.2), txt(10.6, 2.5, 'Nada que mirar'), txt(10.6, 1.8, 'ni una prueba'),
    txt(2.4, 7.3, 'Ruta con fuente'), txt(10.6, 7.3, 'Ruta sin fuente'),
    ...flecha([5.3, 8.0], [3.6, 6.6]),
    ...flecha([7.7, 8.0], [9.4, 6.6]),
    ...flecha([2.4, 5.0], [2.4, 3.2]),
    ...flecha([10.6, 5.0], [10.6, 3.2]),
  ], 'Diagrama con un mensaje en la parte de arriba que se abre en dos rutas. Arriba, una caja con «El mensaje: que te llega». De ella salen dos flechas: la de la izquierda, con la etiqueta «Ruta con fuente», va a una caja con «Con nombre: y con fecha» y de ahí baja a otra con «Puedes comprobar: el dato». La de la derecha, con la etiqueta «Ruta sin fuente», va a una caja con «Sin rostro: ni fecha ni lugar» y de ahí baja a otra con «Nada que mirar: ni una prueba».');

  // ------------------------------------------------------------------
  L('Verificar noticias y detectar desinformación', {
    objetivo: 'Verificar una información con un método de preguntas, reconocer las señales de alarma de un mensaje y saber a quién y dónde preguntar.',
    explicacion: `
      <p>Te llega un mensaje de ejemplo con una foto de un ratón gigante y un texto que asegura que es real y te pide reenviarlo a diez personas. Antes de reenviarlo, hay seis preguntas que te dan la respuesta en pocos minutos.</p>
      <p><strong>Verificar</strong> (<span lang="en">verify</span>) es comprobar antes de creértelo o de reenviarlo. Y detrás de cada comprobación hay siempre la misma pregunta: ¿de quién es esto?, es decir, cuál es la <strong>fuente</strong> (<span lang="en">source</span>), quién lo publica y qué le conviene. La <strong>desinformación</strong> (<span lang="en">disinformation</span>) es información falsa que se difunde a propósito. Wikipedia en español (apoyo) señala que se puede usar para manipular o intensificar controversias, así que casi nunca llega sola: suele ser una cosa real con un titular que la deforma, una foto de otro sitio o un dato sin origen.</p>
      <h3>Las seis preguntas</h3>
      <p>El método se basa en preguntas, no en intuiciones, y estas seis forman la lista de comprobación que llevas.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>La pregunta</th><th>Qué miras</th><th>La señal de alarma</th></tr></thead>
        <tbody>
          <tr><th scope="row">¿Quién publica esto?</th><td>El nombre de la cuenta y si hay alguien detrás</td><td>Una cuenta sin nombre ni datos</td></tr>
          <tr><th scope="row">¿El titular dice lo mismo que el cuerpo?</th><td>Las dos partes, una detrás de otra</td><td>El titular promete algo que el texto no cuenta</td></tr>
          <tr><th scope="row">¿Hay fecha, lugar y datos concretos?</th><td>La fecha, el sitio y las cifras</td><td>No hay fecha ni lugar, o las cifras no se comprueban</td></tr>
          <tr><th scope="row">¿De dónde sale el número?</th><td>El nombre del estudio y su autor</td><td>Un porcentaje sin ningún estudio detrás</td></tr>
          <tr><th scope="row">¿Lo cuenta alguna fuente independiente?</th><td>La misma noticia en otros sitios</td><td>Nadie más lo cuenta</td></tr>
          <tr><th scope="row">¿Por qué te lo cuentan?</th><td>Lo que te pide el mensaje</td><td>Te pide reenviarlo, te mete miedo o te ofrece un premio</td></tr>
        </tbody>
      </table></div>
      <p>Los contenidos básicos comunes de Lengua del Ministerio de Educación de la Nación (Argentina, documento sin fecha de publicación) explican, al describir la lectura de los medios, que hay que fijarse en los titulares y en los géneros periodísticos, y que cada medio tiene su «postura y línea editorial». Por eso el titular se lee con el cuerpo al lado, nunca solo. La UNESCO (en inglés) presenta la alfabetización mediática e informacional como habilidades esenciales para los retos del siglo XXI, y el IFCN Code of Principles (en inglés) dice que verificar los hechos es un instrumento poderoso del periodismo responsable.</p>
      <p>Y la comprobación no es una guerra. Noticias ONU (2021) cuenta que un curso enseña a verificar los hechos y a hablar con quienes propagaron información errónea; ese segundo punto importa, porque el que reenvió un mensaje falso no es el enemigo. En una encuesta del Reuters Institute for the Study of Journalism (en inglés, 2025), el 13 % de quienes respondieron no sabían cómo verificar una información que sospechaban falsa, y el 62 % no pensaban en los medios como primer sitio al que acudir.</p>
      <h3>Qué hacer cuando algo no cuadra</h3>
      <p>Si lo que has visto no se sostiene, hay dos pasos. El primero: no reenviarlo. Un mensaje que no has comprobado no se reenvía. El segundo: buscar el dato donde vive, en el organismo oficial del tema de tu país, no donde te lo pasaron. Y si el contenido es falso, hay un paso más: denunciarlo en la plataforma donde lo viste y, si el tema depende de un organismo de tu país, en ese organismo. Una duda razonable no es ignorancia: preguntar «¿esto de dónde sale?» es lo que toca.</p>
      <p>Así se ven las dos rutas de un mismo mensaje:</p>
      ${RUTAS_MENSAJE}
      <p class="nota"><strong>Trampa común:</strong> quedarte tranquilo porque el mensaje te parecía verosímil. Que suene serio y use un porcentaje no lo hace verdad: lo hace la fuente.</p>
      <p>Y en "Deepfakes y contenido falso" (Inteligencia artificial) verás lo mismo pero con vídeo e imágenes generadas. Las cifras están en "Cómo leer estadísticas en las noticias sin que te engañen" (Matemáticas), y el motivo por el que te lo crees tan rápido, en "Sesgos cognitivos".</p>`,
    ejemplo: `
      <p>Vamos a revisar el mensaje del ratón gigante, que es de ejemplo. Llega por chat, con una foto del animal:</p>
      <div class="nota texto-muestra">
        <p>«Urgente: han encontrado un ratón gigante en un laboratorio. El 90 % de los tratamientos contra las plagas ya no sirve y nadie lo dice. Reenvíalo a diez personas o te lo perderás.»</p>
      </div>
      <ol class="pasos-ej">
        <li>La fuente: una cuenta sin nombre, sin datos y que no contesta.</li>
        <li>La primera frase promete un hallazgo enorme y el resto del mensaje no cuenta nada del hallazgo.</li>
        <li>La fecha y el lugar: no hay ninguna de las dos.</li>
        <li>El número: el «90 % de los tratamientos» no cita ningún estudio.</li>
        <li>Otra fuente: nadie lo cuenta.</li>
        <li>El motivo: te pide reenviarlo a diez personas.</li>
      </ol>
      <p>Qué haces: no lo reenvías, buscas el dato en el organismo oficial del tema en tu país y, si es falso, lo denuncias en la plataforma donde lo viste. Y un recordatorio: el problema es lo que afirma el mensaje, no el animal.</p>
      <p class="nota"><strong>Error común:</strong> responder al mensaje con otro mensaje en vez de con una pregunta. Comprobar es buscar el dato, no discutir.</p>`,
    vidaReal: `
      <p>Comprobar antes de reenviar son unos minutos de trabajo que evitan mucho ruido:</p>
      <ul>
        <li>En un chat de la familia, antes de pasar algo que te ha emocionado o asustado.</li>
        <li>En un trabajo del colegio, cuando una cita no tiene autor ni fecha.</li>
        <li>En una compra, cuando un precio o una oferta parece demasiado buena.</li>
        <li>Y en las redes, cuando te piden que compartas algo «urgentemente».</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Un mensaje dice: «Un estudio de Estados Unidos demuestra que el 87 % de los adolescentes no duerme bien». ¿Cuál es la señal de alarma más clara? La cifra es de ejemplo.</p>',
        opciones: ['Que el número es alto', 'Que el texto es corto', 'Que no dice qué estudio es ni de dónde sale el número', 'Que habla de sueño'],
        correcta: 2,
        pista: '<p>Pregunta por la cuarta pregunta de la lista de comprobación.</p>',
        solucion: '<p>La tercera: <strong>que no dice qué estudio es ni de dónde sale el número</strong>. Un porcentaje sin el nombre de quien lo midió no se puede comprobar, por muy oficial que parezca el mensaje.</p>' },
      { tipo: 'opciones', enunciado: '<p>En un chat te llega una foto de un animal raro con este pie de foto: «Urgente: compártelo antes de que lo borren». Todavía no has comprobado nada. ¿Qué haces?</p>',
        opciones: ['No lo reenvío: primero compruebo quién lo publica y de dónde sale la foto', 'Lo reenvío, pero avisando de que no lo he comprobado', 'Lo reenvío a un solo amigo, para que me ayude a decidir', 'Lo reenvío, porque si fuera falso alguien ya lo habría corregido'],
        correcta: 0,
        pista: '<p>La sexta pregunta de la lista es por qué te lo cuentan.</p>',
        solucion: '<p>La primera: <strong>no lo reenvío y primero compruebo</strong>. El mensaje te pide que lo compartas y eso ya es una señal de alarma. Reenviarlo avisando de que no está comprobado sigue siendo reenviarlo, y esperar a que lo corrija alguien significa esperar a que llegue el daño.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un mensaje afirma que el agua de tu zona tiene una sustancia peligrosa. ¿A quién le preguntas para comprobarlo?</p>',
        opciones: ['Al grupo de chat que te lo pasó', 'Al organismo oficial de tu país que se ocupa del agua', 'A la primera página que aparezca en tu buscador', 'A quien te lo reenvió, para que te lo aclare'],
        correcta: 1,
        pista: '<p>Piensa en dónde vive el dato: en la fuente oficial del tema.</p>',
        solucion: '<p>La segunda: <strong>al organismo oficial de tu país que se ocupa del agua</strong>. El que te lo pasó no es la fuente: es el mensajero, y puede estar equivocado o tener interés en que te asustes. El dato se comprueba donde vive, no donde te lo contaron.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la información falsa que se difunde a propósito? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['desinformación', 'la desinformación', 'información falsa que se difunde a propósito', 'información falsa difundida a propósito', 'información falsa que alguien difunde a propósito', 'información falsa que se difunde con intención'],
        pista: '<p>Es una palabra de doce letras que empieza por «des» y acaba en «ción».</p>',
        solucion: '<p>Se llama <strong>desinformación</strong> (<span lang="en">disinformation</span>): información falsa que se difunde a propósito. Su nombre en inglés es <span lang="en">disinformation</span>.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena las preguntas de comprobación de un mensaje, de la primera a la última.</p>',
        respuesta: ['¿Quién publica esto?', '¿El titular dice lo mismo que el cuerpo?', '¿Hay fecha, lugar y datos concretos?', '¿De dónde sale el número?', '¿Lo cuenta alguna fuente independiente?', '¿Por qué te lo cuentan?'],
        pista: '<p>Empiezas por la fuente y terminas preguntándote por qué te lo cuentan.</p>',
        solucion: '<p>El orden es: quién publica esto, si el titular dice lo mismo que el cuerpo, si hay fecha, lugar y datos concretos, de dónde sale el número, si lo cuenta alguna fuente independiente y, por último, por qué te lo cuentan. Recorrerlas en orden evita quedarse enganchado en la primera.</p>' },
      { tipo: 'numero', enunciado: '<p>En el mensaje del ejemplo saltan las 6 preguntas de la lista de comprobación. ¿Cuántas señales de alarma tiene?</p>', respuesta: 1 + 1 + 1 + 1 + 1 + 1,
        pista: '<p>Suma una señal por cada pregunta de la lista.</p>',
        solucion: '<p>1 + 1 + 1 + 1 + 1 + 1 = <strong>6 señales de alarma</strong>: la fuente sin nombre, la primera frase que promete un hallazgo que el resto no cuenta, la falta de fecha y lugar, el porcentaje sin estudio, que nadie más lo cuenta y que te piden reenviarlo.</p>' },
    ],
    fuentes: [CBC, WIKI_DESINFORMACION, UNESCO_MIL, IFCN, REUTERS, ONU_NOTICIAS],
  });
})();
