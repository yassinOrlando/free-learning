// Lectura · Unidad 6: Escribir con claridad.
// Formato de cada lección: ver .claude/docs/formato-leccion.md. Revisar con: node verificar.js
// Los datos de las fuentes oficiales llevan su país y, cuando la ficha lo trae, su año; las de apoyo (Wikipedia) llevan "(apoyo)".
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
  const WIKI_PARRAFO = { nombre: 'Wikipedia en español: Párrafo (apoyo)', url: 'https://es.wikipedia.org/wiki/P%C3%A1rrafo' };
  const WIKI_COESION = { nombre: 'Wikipedia en español: Coesión textual (apoyo)', url: 'https://es.wikipedia.org/wiki/Cohesi%C3%B3n_textual' };
  const WIKI_ARGUMENTATIVO = { nombre: 'Wikipedia en español: Texto argumentativo (apoyo)', url: 'https://es.wikipedia.org/wiki/Texto_argumentativo' };
  const WIKI_ACENTUACION = { nombre: 'Wikipedia en español: Acentuación del idioma español (apoyo)', url: 'https://es.wikipedia.org/wiki/Acentuaci%C3%B3n_del_idioma_espa%C3%B1ol' };
  const WIKI_ORTOGRAFIA = { nombre: 'Wikipedia en español: Ortografía del español (apoyo)', url: 'https://es.wikipedia.org/wiki/Ortograf%C3%ADa_del_espa%C3%B1ol' };
  const WIKI_TILDE = { nombre: 'Wikipedia en español: Tilde (apoyo)', url: 'https://es.wikipedia.org/wiki/Tilde' };
  const WIKI_HIATO = { nombre: 'Wikipedia en español: Hiato (fonología) (apoyo)', url: 'https://es.wikipedia.org/wiki/Hiato_(fonolog%C3%ADa)' };
  const FUNDEU_ACENTUACION = { nombre: 'Fundación del Español Urgente (España): acentuación (2011)', url: 'https://www.fundeu.es/consulta/acentuacion-14069/' };
  const MINAM_TILDE = { nombre: 'Ministerio de Ambiente del Perú (MINAM): Anexo 3, Ortografía, uso de la tilde (Perú, 2017)', url: 'https://www.minam.gob.pe/proyecolegios/Curso/curso-virtual/Modulos/modulo2/3Secundaria/Actividades-Aprendizaje/Comunica/S1/anexo1/Sesi%C3%B3n%201%20AGUA%201ro%20Secundaria%20-%20Comunicaci%C3%B3nANEXO3.pdf' };
  const WIKI_SIGNOS = { nombre: 'Wikipedia en español: Signos de puntuación (apoyo)', url: 'https://es.wikipedia.org/wiki/Signos_de_puntuaci%C3%B3n' };
  const FUNDEU_COMA = { nombre: 'Fundación del Español Urgente (España): no se escribe coma delante de la «y» de las enumeraciones (2011)', url: 'https://www.fundeu.es/recomendacion/no-se-escribe-coma-delante-de-la-yde-las-enumeraciones-1123/' };
  const CERVANTES_DUDAS = { nombre: 'Instituto Cervantes (España): Las 500 dudas más frecuentes del español (2013)', url: 'https://files.sld.cu/traducciones/files/2015/07/las-500-dudas-mas-frecuentes-del-espanol-instituto-cervantes.pdf' };
  const WIKI_PUNTO_COMA = { nombre: 'Wikipedia en español: Punto y coma (apoyo)', url: 'https://es.wikipedia.org/wiki/Punto_y_coma' };
  const WIKI_DOS_PUNTOS = { nombre: 'Wikipedia en español: Dos puntos (apoyo)', url: 'https://es.wikipedia.org/wiki/Dos_puntos' };
  const WIKI_RESUMEN = { nombre: 'Wikipedia en español: Resumen (apoyo)', url: 'https://es.wikipedia.org/wiki/Resumen' };
  const WIKI_TESIS = { nombre: 'Wikipedia en español: Tesis (apoyo)', url: 'https://es.wikipedia.org/wiki/Tesis' };
  const WIKI_ENSAGO = { nombre: 'Wikipedia en español: Ensayo (apoyo)', url: 'https://es.wikipedia.org/wiki/Ensayo' };

  // El camino de un texto: de qué va, qué se desarrolla y qué se queda.
  const ESTRUCTURA = diagrama([0, 12], [0, 9], [
    caja(0.4, 7.0, 11.6, 8.8), txt(6, 8.35, 'Introducción'), txt(6, 7.75, 'de qué va el texto'),
    caja(0.4, 3.4, 11.6, 6.6), txt(6, 6.15, 'Desarrollo: una idea por párrafo'),
    caja(0.9, 3.7, 4.0, 5.4), txt(2.45, 4.85, 'Párrafo 1'), txt(2.45, 4.25, 'una idea'),
    caja(4.45, 3.7, 7.55, 5.4), txt(6.0, 4.85, 'Párrafo 2'), txt(6.0, 4.25, 'otra idea'),
    caja(8.0, 3.7, 11.1, 5.4), txt(9.55, 4.85, 'Párrafo 3'), txt(9.55, 4.25, 'una idea más'),
    caja(0.4, 0.4, 11.6, 2.2), txt(6, 1.7, 'Cierre'), txt(6, 1.0, 'lo que quieres que se quede'),
    ...flecha([6, 7.0], [6, 6.6]),
    ...flecha([6, 3.4], [6, 2.2]),
  ], 'Diagrama con tres bloques, uno encima del otro, unidos por dos flechas que van hacia abajo. Arriba, una caja ancha que dice «Introducción: de qué va el texto». En el centro, una caja ancha que dice «Desarrollo: una idea por párrafo», y dentro tres cajas pequeñas: «Párrafo 1: una idea», «Párrafo 2: otra idea» y «Párrafo 3: una idea más». Abajo, una caja ancha que dice «Cierre: lo que quieres que se quede».');

  // Una palabra partida en sílabas, con el golpe de voz marcado.
  const SILABAS = diagrama([0, 12], [0, 9], [
    caja(1.0, 5.8, 4.0, 7.8), txt(2.5, 7.1, 'cán'), txt(2.5, 6.35, 'golpe de voz'),
    caja(4.6, 5.8, 7.6, 7.8), txt(6.1, 7.1, 'ti'), txt(6.1, 6.35, 'sin golpe'),
    caja(8.2, 5.8, 11.2, 7.8), txt(9.7, 7.1, 'co'), txt(9.7, 6.35, 'sin golpe'),
    ...flecha([2.5, 4.6], [2.5, 5.8]),
    caja(1.0, 2.8, 11.2, 4.4), txt(6, 3.85, 'El golpe cae en la primera sílaba'), txt(6, 3.2, 'es decir, en la antepenúltima'),
    ...flecha([6, 2.8], [6, 2.2]),
    caja(0.4, 0.4, 11.6, 2.2), txt(6, 1.6, 'Esdrújula: siempre lleva tilde'), txt(6, 0.95, 'cántico, médico, régimen'),
  ], 'Diagrama con tres cajas en fila arriba, que son las tres sílabas de la palabra «cántico»: «cán», con la nota «golpe de voz», «ti», con la nota «sin golpe», y «co», también con la nota «sin golpe». Una flecha sube desde el centro hacia la caja de «cán», la primera sílaba. Debajo, una caja ancha que dice «El golpe cae en la primera sílaba, es decir, en la antepenúltima», y otra más abajo que dice «Esdrújula: siempre lleva tilde», con los ejemplos «cántico, médico, régimen».');

  // Las pausas de una frase: dos cortas y una larga.
  const PAUSAS = diagrama([0, 12], [0, 9], [
    caja(0.4, 6.4, 4.0, 8.2), txt(2.2, 7.3, 'Vine,'),
    caja(4.2, 6.4, 7.8, 8.2), txt(6, 7.3, 'vi,'),
    caja(8.0, 6.4, 11.6, 8.2), txt(9.8, 7.3, 'vencí.'),
    { tipo: 'linea', desde: [1.9, 5.7], hasta: [2.5, 5.7] }, txt(2.2, 5.05, 'pausa corta'),
    { tipo: 'linea', desde: [5.7, 5.7], hasta: [6.3, 5.7] }, txt(6, 5.05, 'pausa corta'),
    { tipo: 'linea', desde: [9.0, 5.7], hasta: [10.6, 5.7] }, txt(9.8, 5.05, 'pausa larga'),
    caja(0.4, 0.8, 11.6, 3.6), txt(6, 3.0, 'Dos comas y un punto'), txt(6, 2.3, 'tres pausas: dos cortas y una larga'), txt(6, 1.6, 'cambiar un signo cambia lo que se lee'),
  ], 'Diagrama con tres cajas en fila arriba, que son las tres partes de la frase: «Vine», «vi» y «vencí». Debajo de la primera y de la segunda hay una raya corta con la etiqueta «pausa corta», y debajo de la tercera una raya más larga con la etiqueta «pausa larga». Abajo, una caja ancha que dice «Dos comas y un punto: tres pausas, dos cortas y una larga», y debajo «cambiar un signo cambia lo que se lee».');

  // Los cuatro pasos para escribir un resumen, con el aviso del segundo paso.
  const RESUMEN = diagrama([0, 12], [0, 12], [
    caja(0.4, 9.4, 8.6, 11.7), txt(4.5, 11.1, '1. Tomar notas'), txt(4.5, 10.4, 'el tema, la idea principal'), txt(4.5, 9.8, 'y dos ideas secundarias'),
    ...flecha([4.5, 9.4], [4.5, 8.8]),
    caja(0.4, 6.5, 8.6, 8.8), txt(4.5, 8.2, '2. Cerrar el original'), txt(4.5, 7.5, 'si lo tienes delante,'), txt(4.5, 6.95, 'copiarás sin querer'),
    caja(9.0, 6.7, 11.6, 8.6), txt(10.3, 8.1, 'sin el texto'), txt(10.3, 7.6, 'a la vista'),
    { tipo: 'linea', desde: [8.6, 7.6], hasta: [9.0, 7.6] },
    ...flecha([4.5, 6.5], [4.5, 5.9]),
    caja(0.4, 3.6, 8.6, 5.9), txt(4.5, 5.3, '3. Redactar'), txt(4.5, 4.6, 'con tus palabras, en un párrafo'),
    ...flecha([4.5, 3.6], [4.5, 3.0]),
    caja(0.4, 0.8, 8.6, 3.0), txt(4.5, 2.4, '4. Comprobar'), txt(4.5, 1.85, 'tres preguntas'), txt(4.5, 1.3, 'se entiende, está la idea principal'),
  ], 'Diagrama vertical con cuatro cajas, una debajo de otra, unidas por flechas que bajan. La primera dice «1. Tomar notas», con las líneas «el tema, la idea principal» y «y dos ideas secundarias». La segunda dice «2. Cerrar el original», con «si lo tienes delante, copiarás sin querer»; a su derecha, unida por una raya, hay una caja pequeña que dice «sin el texto a la vista». La tercera dice «3. Redactar», con «con tus palabras, en un párrafo». La cuarta dice «4. Comprobar», con «tres preguntas» y «se entiende, está la idea principal».');

  // Las tres partes de un ensayo argumentativo.
  const ENSAYO = diagrama([0, 12], [0, 10], [
    caja(0.4, 8.4, 11.6, 9.8), txt(6, 9.4, 'Introducción con la tesis'), txt(6, 8.8, 'la postura que vas a defender'),
    ...flecha([2.15, 8.4], [2.15, 7.0]),
    ...flecha([6, 8.4], [6, 7.0]),
    ...flecha([9.85, 8.4], [9.85, 7.0]),
    caja(0.4, 5.0, 3.9, 7.0), txt(2.15, 6.4, 'Razón 1'), txt(2.15, 5.8, 'con su prueba'),
    caja(4.25, 5.0, 7.75, 7.0), txt(6, 6.4, 'Razón 2'), txt(6, 5.8, 'con su prueba'),
    caja(8.1, 5.0, 11.6, 7.0), txt(9.85, 6.4, 'Razón 3'), txt(9.85, 5.8, 'con su prueba'),
    ...flecha([2.15, 5.0], [3.0, 2.8]),
    ...flecha([6, 5.0], [6, 2.8]),
    ...flecha([9.85, 5.0], [9.0, 2.8]),
    caja(0.4, 1.4, 11.6, 2.8), txt(6, 2.4, 'Conclusión'), txt(6, 1.8, 'la misma postura, sin ideas nuevas'),
  ], 'Diagrama con tres bloques. Arriba, una caja ancha que dice «Introducción con la tesis», con la línea «la postura que vas a defender». De ella salen tres flechas hacia abajo, una a cada una de las tres cajas de la fila central, que dicen «Razón 1», «Razón 2» y «Razón 3», y cada una lleva la línea «con su prueba». Desde las tres cajas de razones salen tres flechas hacia abajo que se juntan en una caja ancha del final, que dice «Conclusión», con la línea «la misma postura, sin ideas nuevas».');

  // ------------------------------------------------------------------
  L('Estructura de un texto', {
    objetivo: 'Ordenar las ideas de un texto en tres partes, repartirlas en párrafos y unir las ideas con conectores.',
    explicacion: `
      <p>Empieza por estas cuatro frases, sobre el reciclaje:</p>
      <div class="nota texto-muestra"><p>En el patio del colegio hay un contenedor azul solo para las botellas. Un trozo de botella tarda mucho tiempo en deshacerse. El plástico que se tira al suelo acaba en los desagües. Separar la basura por clases no cuesta dinero.</p></div>
      <p>Las cuatro frases son un ejemplo inventado, y sueltas como están no dicen gran cosa: cada una se entiende por separado, pero no sabes por dónde empieza el texto ni qué quiere contar. Un texto no es una lista de frases: es un camino, y el camino hay que construirlo.</p>
      <p>Ese camino tiene un nombre: la <strong>estructura</strong> (<span lang="en">structure</span>), es decir, el orden y las partes que tiene un texto. Para construirlo hacen falta dos cosas más. Una es el <strong>párrafo</strong> (<span lang="en">paragraph</span>): el bloque de texto que desarrolla una idea. La otra es el <strong>conector</strong> (<span lang="en">connector</span>): la palabra o el grupo de palabras que unen una idea con la anterior.</p>
      <p>Un párrafo, según Wikipedia en español (apoyo), es una unidad de la escritura formada por un conjunto de oraciones que tienen una unidad temática, y dentro de él hay una oración principal de la que dependen las demás. Por eso un párrafo se reconoce cuando puedes decir «aquí se explica una cosa». Y dentro del párrafo el orden es libre: la frase que más pesa puede ir al principio, en medio o al final.</p>
      <p>Los conectores, según Wikipedia en español (apoyo), son los nexos que indican qué relación hay entre las oraciones: por eso, sin embargo, además, en cambio. Con un conector el lector sabe si lo que viene sigue a lo anterior, lo contradice o lo aclara.</p>
      <h3>Las tres partes de un texto</h3>
      <p>Casi cualquier texto se monta con tres partes. La introducción dice de qué va el texto, el desarrollo despliega las ideas y el cierre dice lo que quieres que se quede. En el desarrollo, cada párrafo lleva una idea, y una frase lo engancha con lo anterior.</p>
      <p>Esto es lo que piden los contenidos básicos comunes de Lengua del Ministerio de Educación de la Nación (Argentina, documento sin fecha de publicación) cuando escribes: decidir la superestructura del texto y los contenidos que hay que desarrollar, tener un plan que ordene las ideas, controlar cómo se reparte la información en los párrafos y usar los conectores propios de la narración, la exposición y la argumentación. También piden reconocer la estructura textual y sus elementos nucleares y periféricos, es decir, jerarquizar la información.</p>
      <p>Y hay dos órdenes posibles, y los dos sirven. Puedes ir de lo general a lo particular: primero la idea grande y después los ejemplos. O al revés: un ejemplo que abre el camino y luego la idea general. Lo que decide es cuál te resulta más claro a ti y a quien te lee.</p>
      ${ESTRUCTURA}
      <div class="tabla-wrap"><table>
        <thead><tr><th>La parte</th><th>Qué haces ahí</th><th>Cómo se reconoce</th></tr></thead>
        <tbody>
          <tr><th scope="row">Introducción</th><td>Dices de qué va el texto</td><td>Es la primera parte y habla del tema, todavía sin desarrollarlo</td></tr>
          <tr><th scope="row">Desarrollo</th><td>Desarrollas las ideas, una por párrafo</td><td>Cada párrafo se explica por sí solo y se engancha con el anterior</td></tr>
          <tr><th scope="row">Cierre</th><td>Dices lo que quieres que se quede</td><td>Es la última parte y no trae ideas nuevas</td></tr>
        </tbody>
      </table></div>
      <p>Una prueba que casi nunca falla: léelo en voz alta. Si en algún punto te tropiezas o te falta el aire, ahí falta una unión o sobra una frase.</p>
      <p class="nota"><strong>Trampa común:</strong> escribir el texto entero en un solo bloque, sin párrafos. Se lee como una pared de texto: el lector no encuentra dónde acaba una idea y empieza la siguiente.</p>
      <p>En "Hacer un resumen" viste cómo se elige lo esencial; lo que falta es darle forma de texto, es decir, estructura. Y en "Tipos de texto: narrativo, expositivo, argumentativo e instructivo" viste que la estructura cambia según el tipo de texto. Aquí da igual el tipo: el camino es el mismo.</p>`,
    ejemplo: `
      <p>Vamos a ordenar las cuatro frases del principio y a añadir una que abra y otra que cierre.</p>
      <ol class="pasos-ej">
        <li>La introducción va primero: dice de qué va el texto.</li>
        <li>El desarrollo va después, con una idea por párrafo: por qué importa y qué se puede hacer.</li>
        <li>Las ideas se unen con «por eso» y con «y».</li>
        <li>El cierre va al final: la frase que quieres que se quede.</li>
      </ol>
      <div class="nota texto-muestra"><p>Hoy en día el plástico se recoge aparte del resto de la basura.</p><p>Un trozo de botella tarda mucho tiempo en deshacerse; por eso, el plástico que se tira al suelo acaba en los desagües.</p><p>En el patio del colegio hay un contenedor azul solo para las botellas, y separar la basura por clases no cuesta dinero.</p><p>Separar el plástico es un gesto pequeño, pero se nota.</p></div>
      <p>Compruébalo en voz alta: se sigue el hilo. Y quita el «por eso» del segundo párrafo: el hueco se nota.</p>
      <p class="nota"><strong>Error común:</strong> empezar por la idea más interesante y dejar la introducción para el final. El lector no sabe qué está leyendo hasta media página.</p>`,
    vidaReal: `
      <p>Un texto bien ordenado se entiende mejor en muchos sitios:</p>
      <ul>
        <li>En un trabajo del colegio, el profesor busca la idea principal y, si las frases están bien unidas, la encuentra antes.</li>
        <li>En un mensaje, un texto bien ordenado se entiende a la primera y no hay que preguntar de nuevo.</li>
        <li>En una carta o en un correo, la introducción dice de qué trata y el cierre pide lo que quieres.</li>
        <li>En un examen, saber qué parte va primero evita que escribas la conclusión antes que los argumentos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>En el texto del ejemplo, ¿qué frase es la introducción?</p>',
        opciones: ['«En el patio del colegio hay un contenedor azul solo para las botellas»', '«Hoy en día el plástico se recoge aparte del resto de la basura»', '«Un trozo de botella tarda mucho tiempo en deshacerse»', '«Separar el plástico es un gesto pequeño, pero se nota»'],
        correcta: 1,
        pista: '<p>La introducción es la primera parte: dice de qué va el texto sin desarrollarlo todavía.</p>',
        solucion: '<p>La segunda: <strong>«Hoy en día el plástico se recoge aparte del resto de la basura»</strong>. Es la que abre el texto y anuncia de qué va. La del contenedor pertenece al desarrollo, la de la botella también, y la última es el cierre.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué conector une la idea de que el plástico tarda mucho con la de que acaba en los desagües?</p>',
        opciones: ['«Por eso»', '«Sin embargo»', '«Además»', '«Por ejemplo»'],
        correcta: 0,
        pista: '<p>Busca el conector que explica una causa: una cosa pasa por lo de la otra.</p>',
        solucion: '<p>El primero: <strong>«por eso»</strong>. Une dos ideas de causa y efecto: el plástico tarda mucho, y por eso acaba en los desagües. «Sin embargo» contradice, «además» añade y «por ejemplo» introduce un ejemplo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué conector usaría para decir que lo que viene contradice lo anterior?</p>',
        opciones: ['«Por eso»', '«Además»', '«Por ejemplo»', '«Sin embargo»'],
        correcta: 3,
        pista: '<p>Piensa en la diferencia entre añadir una idea y llevar la contraria.</p>',
        solucion: '<p>El cuarto: <strong>«sin embargo»</strong>. Los conectores dicen qué relación hay entre las oraciones, y este marca una contradicción. «Por eso» explica una causa, «además» añade y «por ejemplo» trae un ejemplo.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué es un conector? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['conector', 'el conector', 'un conector', 'conector discursivo', 'la palabra o el grupo de palabras que une una idea con la anterior', 'la palabra o el grupo de palabras que unen una idea con la anterior', 'palabra o grupo de palabras que une una idea con la anterior', 'conector es la palabra o el grupo de palabras que une una idea con la anterior'],
        pista: '<p>Es lo que aparece en frases como «por eso» o «sin embargo».</p>',
        solucion: '<p>Es el <strong>conector</strong> (<span lang="en">connector</span>): la palabra o el grupo de palabras que unen una idea con la anterior. Wikipedia en español (apoyo) los llama nexos, y dice que indican las relaciones entre las oraciones.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena las cuatro frases del ejemplo para que formen un texto con introducción, desarrollo y cierre.</p>',
        respuesta: [
          'Hoy en día el plástico se recoge aparte del resto de la basura',
          'Un trozo de botella tarda mucho tiempo en deshacerse; por eso, el plástico que se tira al suelo acaba en los desagües',
          'En el patio del colegio hay un contenedor azul solo para las botellas, y separar la basura por clases no cuesta dinero',
          'Separar el plástico es un gesto pequeño, pero se nota',
        ],
        pista: '<p>Primero va la frase que anuncia de qué va el texto, después las dos ideas y al final la frase de cierre.</p>',
        solucion: '<p>El orden es: primero «Hoy en día el plástico se recoge aparte del resto de la basura» (introducción), después «Un trozo de botella tarda mucho tiempo en deshacerse; por eso, el plástico que se tira al suelo acaba en los desagües» (desarrollo), luego «En el patio del colegio hay un contenedor azul solo para las botellas, y separar la basura por clases no cuesta dinero» (desarrollo) y al final «Separar el plástico es un gesto pequeño, pero se nota» (cierre).</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas partes tiene un texto según lo que has aprendido en esta lección?</p>', respuesta: 1 + 1 + 1,
        pista: '<p>Cuenta la introducción, el desarrollo y el cierre.</p>',
        solucion: '<p>Son <strong>3 partes</strong>: la introducción, el desarrollo y el cierre. El desarrollo puede tener muchos párrafos, pero sigue siendo una parte.</p>' },
    ],
    fuentes: [CBC, WIKI_PARRAFO, WIKI_COESION, WIKI_ARGUMENTATIVO],
  });

  // ------------------------------------------------------------------
  L('Acentuación', {
    objetivo: 'Decidir si una palabra lleva tilde con las tres reglas del español y reconocer los casos en que la tilde cambia el significado.',
    explicacion: `
      <p>Tres palabras para empezar: «cantar», «canción» y «cántico». Una lleva la tilde en la última sílaba, otra en la primera y la tercera no lleva ninguna. Y no es un capricho: la tilde dice dónde golpeas la voz al pronunciar la palabra, así que si la pones donde no es, estás cambiando la palabra.</p>
      <p>La <strong>tilde</strong> (<span lang="en">tilde</span>) es la marca gráfica que se pone sobre la vocal donde cae el golpe de la voz. En español moderno, «tilde» significa acento gráfico, y Wikipedia en español (apoyo) la cuenta entre los ocho signos auxiliares de la escritura.</p>
      <p>Para saber dónde va la tilde, primero hay que saber qué sílaba lleva el golpe. Hay tres nombres para las tres posibilidades, y Wikipedia en español (apoyo) los define así: una palabra <strong>llana</strong> (<span lang="en">stressed penultimate</span>) es la que lleva la mayor fuerza de voz en la penúltima sílaba, y una <strong>esdrújula</strong> (<span lang="en">proparoxytone</span>) es la que la lleva en la antepenúltima. La que la lleva en la última sílaba se llama aguda.</p>
      <h3>Tres reglas y ya está</h3>
      <p>Las reglas se aprenden mirando dónde cae el golpe y cómo acaba la palabra, y son tres. Primera: todas las esdrújulas llevan tilde, siempre. Segunda: las llanas llevan tilde salvo que terminen en vocal, n o s. Tercera: las agudas llevan tilde si terminan en vocal, n o s, y no la llevan si terminan en otra consonante.</p>
      <p>El Anexo 3 de ortografía del Ministerio de Ambiente del Perú (Perú, 2017) lo resume así: las agudas se tildan cuando terminan en vocal o en n y s, y las graves, que son las llanas, cuando terminan en cualquier consonante menos n y s. Todas las esdrújulas se tildan.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>La palabra</th><th>Cómo termina</th><th>Ejemplos</th><th>¿Tilde?</th></tr></thead>
        <tbody>
          <tr><th scope="row">Aguda</th><td>En vocal, n o s</td><td>café, Perú, balón</td><td>Sí</td></tr>
          <tr><th scope="row">Aguda</th><td>En otra consonante</td><td>papel, reloj, cantar</td><td>No</td></tr>
          <tr><th scope="row">Llana</th><td>En otra consonante</td><td>árbol, lápiz</td><td>Sí</td></tr>
          <tr><th scope="row">Llana</th><td>En vocal, n o s</td><td>casa, crisis, mesa</td><td>No</td></tr>
          <tr><th scope="row">Esdrújula</th><td>Da igual cómo termine</td><td>cántico, médico, jóvenes</td><td>Siempre</td></tr>
        </tbody>
      </table></div>
      <p>El método que de verdad sirve es este: parte la palabra en sílabas, di en voz alta dónde te choca el golpe y aplica la regla. Si una palabra te da dudas, mira en un diccionario.</p>
      ${SILABAS}
      <h3>Cuando la tilde cambia el significado</h3>
      <p>Hay parejas de palabras que solo se distinguen por la tilde, y por eso cambian de significado. «Tú» es pronombre personal («Tú tendrás futuro») y «tu» es adjetivo posesivo («Tu futuro no está escrito»). «Más» es adverbio de cantidad y «mas» significa lo mismo que «pero». Wikipedia en español (apoyo) llama a esto tilde diacrítica, y el Anexo 3 del Ministerio de Ambiente del Perú (Perú, 2017) explica que distingue palabras con funciones y significados diferentes que, sin ella, se escribirían igual.</p>
      <h3>Dos vocales seguidas</h3>
      <p>Hay palabras con dos vocales juntas, como «país» o «María». Cuando se pronuncian en sílabas separadas hay un hiato. En el caso de una vocal abierta, la a, la e o la o, junto a una cerrada, la i o la u, que lleva el golpe, la tilde va siempre sobre la cerrada, para marcar el hiato: «país», «día», «María». Y si las dos vocales son abiertas, no se usa tilde: «museo» y «poeta» van sin tilde.</p>
      <p>Los monosílabos no llevan tilde por las reglas de acentuación, salvo que tengan tilde diacrítica. Entre ellos están «guion» y «truhan», que se escriben sin tilde porque todas sus vocales van agrupadas en un diptongo o un triptongo; la Fundación del Español Urgente (España, 2011) las cuenta entre los monosílabos por esa razón.</p>
      <p class="nota"><strong>Trampa común:</strong> poner la tilde por costumbre, sin mirar dónde cae el golpe. «Cantar» y «papel» se escriben sin tilde; «canción» y «café», con tilde.</p>
      <p>Y todo esto sirve para lo que escribes: las palabras del resumen que ya sabes hacer, como viste en "Hacer un resumen", pasan por estas tres reglas.</p>`,
    ejemplo: `
      <p>Tres palabras, con el golpe en sitios distintos, y la regla que decide en cada caso. Son palabras de ejemplo.</p>
      <ol class="pasos-ej">
        <li>«Cantar» es aguda: el golpe cae en la última sílaba, «tar». Como termina en otra consonante que no es n ni s, se escribe sin tilde.</li>
        <li>«Canción» es aguda también: el golpe cae en «ción», la última sílaba. Pero termina en n, así que lleva tilde.</li>
        <li>«Cántico» es esdrújula: el golpe cae en «cán», la antepenúltima sílaba. Las esdrújulas llevan tilde siempre.</li>
        <li>Y comprueba el cambio de significado: en «Tú traes tu mochila», «Tú» lleva tilde porque es el pronombre, y «tu» va sin tilde porque es el posesivo. Si pones la tilde en el otro sitio, la frase ya no dice lo mismo.</li>
      </ol>
      <p class="nota"><strong>Error común:</strong> mirar solo cómo acaba la palabra y olvidar la regla de las esdrújulas, o al revés. Primero mira dónde cae el golpe y después mira cómo acaba la palabra.</p>`,
    vidaReal: `
      <p>Las tildes se notan justo cuando escribes para que te entiendan:</p>
      <ul>
        <li>En un mensaje al móvil, si escribes «tu» donde va «tú», quien lo lee se queda con la duda.</li>
        <li>En el título de un trabajo, la tilde dice dónde va el golpe de voz al leerlo en voz alta.</li>
        <li>En los apuntes de una clase, si escribes sin tilde, luego no sabes dónde iba el golpe de voz.</li>
        <li>Al copiar un texto, la tilde es una pista para saber si has copiado bien.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Por qué «café» lleva tilde?</p>',
        opciones: ['Porque es esdrújula', 'Porque es aguda y termina en vocal', 'Porque es llana y termina en n', 'Porque tiene dos vocales juntas'],
        correcta: 1,
        pista: '<p>Mira dónde cae el golpe de voz y cómo acaba la palabra.</p>',
        solucion: '<p>La segunda: <strong>porque es aguda y termina en vocal</strong>. El golpe cae en la última sílaba, «fé», y las agudas que terminan en vocal llevan tilde. El Anexo 3 del Ministerio de Ambiente del Perú (Perú, 2017) lo da como ejemplo de palabra aguda. No es un hiato: en «café» las vocales no están juntas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas frases está bien escrita y con el sentido correcto?</p>',
        opciones: ['«Tú traes tu mochila»', '«Tu traes tu mochila»', '«Tú traes tú mochila»', '«Tu traes tú mochila»'],
        correcta: 0,
        pista: '<p>«Tú» nombra a la persona a la que hablas; «tu» dice que algo pertenece a alguien.</p>',
        solucion: '<p>La primera: <strong>«Tú traes tu mochila»</strong>. «Tú» es pronombre personal (la persona a la que hablas es la que trae) y «tu» es adjetivo posesivo (la mochila es de esa persona). En las otras, la tilde está en el sitio equivocado y la frase ya no significa eso.</p>' },
      { tipo: 'opciones', enunciado: '<p>«Cántico», «médico» y «régimen» llevan tilde las tres. ¿Por qué?</p>',
        opciones: ['Porque son agudas y terminan en vocal', 'Porque son llanas y terminan en n', 'Porque son esdrújulas: el golpe cae en la antepenúltima sílaba', 'Porque llevan dos vocales juntas'],
        correcta: 2,
        pista: '<p>Parte una de ellas en sílabas y di en voz alta dónde choca el golpe.</p>',
        solucion: '<p>La tercera: <strong>porque son esdrújulas</strong>. El golpe cae en «cán», «mé» y «ré», que es la antepenúltima sílaba de cada una, y todas las esdrújulas llevan tilde, siempre.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué es una palabra esdrújula? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['esdrújula', 'la esdrújula', 'una esdrújula', 'palabra esdrújula', 'la palabra esdrújula', 'palabra cuyo acento cae en la antepenúltima sílaba', 'la palabra cuyo acento cae en la antepenúltima sílaba', 'esdrújula es la palabra cuyo acento cae en la antepenúltima sílaba', 'palabra esdrújula es la que lleva el acento en la antepenúltima sílaba'],
        pista: '<p>El golpe de voz cae en la sílaba anterior a la penúltima.</p>',
        solucion: '<p>Una <strong>esdrújula</strong> (<span lang="en">proparoxytone</span>) es la palabra cuyo acento cae en la antepenúltima sílaba. Todas las esdrújulas llevan tilde, como «cántico», «médico» o «jóvenes».</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para decidir si una palabra lleva tilde.</p>',
        respuesta: ['Parte la palabra en sílabas', 'Di en voz alta dónde cae el golpe de voz', 'Mira cómo termina la palabra', 'Aplica la regla y pon la tilde si corresponde'],
        pista: '<p>Primero la sílaba, después el final de la palabra y solo entonces la tilde.</p>',
        solucion: '<p>El orden es: partes la palabra en sílabas, dices en voz alta dónde cae el golpe de voz, miras cómo termina la palabra y aplicas la regla, poniendo la tilde si corresponde. Si miras el final antes de saber dónde cae el golpe, puedes equivocarte.</p>' },
      { tipo: 'numero', enunciado: '<p>De las tres palabras del ejemplo, «cantar», «canción» y «cántico», ¿cuántas llevan tilde?</p>', respuesta: 0 + 1 + 1,
        pista: '<p>Una es aguda y termina en otra consonante, otra es aguda y termina en n, y la tercera es esdrújula.</p>',
        solucion: '<p>Llevan tilde <strong>2</strong>: «canción», que es aguda y termina en n, y «cántico», que es esdrújula. «Cantar» no la lleva, porque es aguda y termina en otra consonante.</p>' },
    ],
    fuentes: [WIKI_ACENTUACION, WIKI_ORTOGRAFIA, WIKI_TILDE, WIKI_HIATO, FUNDEU_ACENTUACION, MINAM_TILDE],
  });

  // ------------------------------------------------------------------
  L('Puntuación', {
    objetivo: 'Poner la puntuación que necesita un texto: comas, punto y coma, dos puntos, comillas y puntos suspensivos, y saber cuándo va cada uno.',
    explicacion: `
      <p>La misma frase, con dos puntuaciones distintas, dice dos cosas distintas. «Vine, vi, vencí» es una lista de tres acciones en fila. «Vine; vi; vencí» son tres oraciones pegadas, y el lector oye que cada una pesa sola. La puntuación es la respiración del texto: le dice dónde parar.</p>
      <p>Los signos de puntuación, según Wikipedia en español (apoyo), delimitan las frases y ordenan las ideas. Los que usarás todo el tiempo son cinco, y cada uno hace un trabajo distinto.</p>
      <h3>La coma</h3>
      <p>La coma hace dos trabajos: separa los elementos de una lista («compramos pan, leche y queso») y aísla una aclaración («Nacho, mi primo, llega hoy»).</p>
      <p>En las enumeraciones hay una regla, y la regla tiene excepciones. Lo normal es no escribir coma delante de la «y» que precede al último elemento: «compramos pan, leche y queso», y no «pan, leche, y queso». La Fundación del Español Urgente (España, 2011) lo recoge así, y el Instituto Cervantes (España, 2013) lo explica de otro modo: la «y» ya enumera, igual que la coma, y poner las dos sobra.</p>
      <p>Pero esa regla no es absoluta: la coma antes de la «y» sí se escribe en algunos casos. El Instituto Cervantes (España, 2013) admite combinarlos cuando hace falta para entender el texto, por ejemplo cuando la «y» une dos oraciones coordinadas y la primera es extensa. Y la Fundación del Español Urgente (España, 2011) señala otro caso: cuando la enumeración tiene elementos complejos que deben separarse por punto y coma.</p>
      <h3>El punto y coma</h3>
      <p>El <strong>punto y coma</strong> (<span lang="en">semicolon</span>) une dos oraciones muy unidas, como si fueran una sola, y marca una pausa mayor que la de la coma y menor que la del punto (Wikipedia en español, apoyo). El Instituto Cervantes (España, 2013) lo resume así: el punto separa oraciones distintas, el punto y coma une las unidades de una misma oración y la coma separa elementos dentro de una oración.</p>
      <h3>Los dos puntos</h3>
      <p>Los <strong>dos puntos</strong> (<span lang="en">colon</span>) anuncian lo que viene detrás: una lista, una explicación o una cita. «Traemos tres cosas: pan, leche y queso». La pausa es mayor que la de la coma y menor que la del punto, y lo que sigue desarrolla la misma idea (Wikipedia en español, apoyo). Después de los dos puntos se empieza en minúscula, salvo que venga una unidad independiente, como una cita (Instituto Cervantes, España, 2013).</p>
      <h3>Las comillas</h3>
      <p>Las <strong>comillas</strong> (<span lang="en">quotation marks</span>) van al principio y al final de lo que se dice tal cual, como una cita o un ejemplo, y también marcan lo que el autor destaca por su importancia o su ironía (Wikipedia en español, apoyo).</p>
      <h3>Los puntos suspensivos</h3>
      <p>Los puntos suspensivos dejan algo sin acabar: en duda, en continuación o en suspenso. «Solo dijo que... y se fue».</p>
      <p>El método que no falla es leer en voz alta: si te quedas sin aire, ahí va un punto, y si el sentido cambia al hacer una pausa, va una coma. Los dos errores típicos son la coma de más y el punto y coma donde cabía una coma.</p>
      ${PAUSAS}
      <div class="tabla-wrap"><table>
        <thead><tr><th>El signo</th><th>Qué hace</th><th>Un ejemplo</th><th>Ojo con esto</th></tr></thead>
        <tbody>
          <tr><th scope="row">Coma</th><td>Separa elementos de una lista y aísla aclaraciones</td><td>compramos pan, leche y queso</td><td>La coma de más</td></tr>
          <tr><th scope="row">Punto y coma</th><td>Une dos oraciones muy unidas</td><td>Había que decidir; no había tiempo</td><td>Donde solo cabía una coma</td></tr>
          <tr><th scope="row">Dos puntos</th><td>Anuncian una lista o una explicación</td><td>Traemos tres cosas: pan, leche y queso</td><td>Mayúscula solo si viene una cita</td></tr>
          <tr><th scope="row">Comillas</th><td>Marcan lo dicho tal cual</td><td>ha dicho «mañana»</td><td>Abrirlas y no cerrarlas</td></tr>
          <tr><th scope="row">Puntos suspensivos</th><td>Dejan algo sin acabar</td><td>solo dijo que... y se fue</td><td>Dejar el texto a medias</td></tr>
        </tbody>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> poner una coma delante de cada «y». En una enumeración, la última «y» va sin coma delante, aunque hay casos en los que sí se escribe.</p>
      <p>Los puntos marcan además las partes del texto que viste en "Estructura de un texto".</p>`,
    ejemplo: `
      <p>Vamos a corregir una frase con la puntuación equivocada. El texto es inventado.</p>
      <ol class="pasos-ej">
        <li>La frase es: «el tren salió tarde, y llovía, y todos se mojaron, y fue un desastre».</li>
        <li>Pregunta dónde cambia la idea. Después de «salió tarde» empieza otra cosa, y después de «se mojaron» empieza la conclusión.</li>
        <li>Ahí van los puntos. Las comas que sobran se quitan: todas las que van antes de cada «y».</li>
      </ol>
      <div class="nota texto-muestra"><p>El tren salió tarde. Llovía y todos se mojaron. Fue un desastre.</p></div>
      <p>La versión corta, con una sola coma y un signo de dos puntos, también se entiende bien: «El tren salió tarde, llovía y todos se mojaron: fue un desastre». Compruébalo en voz alta: las pausas del texto son las del habla.</p>
      <p class="nota"><strong>Error común:</strong> poner dos puntos sin que detrás venga la lista o la explicación que anuncian. Los dos puntos son una promesa: avisan de lo que va a seguir.</p>`,
    vidaReal: `
      <p>La puntuación es lo primero que nota quien te lee:</p>
      <ul>
        <li>En un mensaje, una coma mal puesta hace que el otro se pare a releer.</li>
        <li>En un trabajo del colegio, los dos puntos delante de la lista de razones hacen que el profesor encuentre lo que pides.</li>
        <li>En un texto para leer en voz alta, los puntos son los respiraderos: sin ellos falta aire.</li>
        <li>En un correo o en una carta, las comillas marcan las palabras exactas de otra persona, y así se sabe qué es tuyo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué signo va en el hueco? «Traemos tres cosas_ pan, leche y queso».</p>',
        opciones: ['Una coma', 'Dos puntos', 'Un punto y coma', 'Puntos suspensivos'],
        correcta: 1,
        pista: '<p>El signo tiene que anunciar lo que viene detrás: una lista.</p>',
        solucion: '<p>El segundo: <strong>dos puntos</strong>. Los dos puntos anuncian una lista, una explicación o una cita, y lo que viene detrás sigue desarrollando la misma idea. La coma separaría elementos de la lista, pero aquí lo que se anuncia es la lista entera.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué error hay en esta frase? «Compramos pan, leche, y queso».</p>',
        opciones: ['Falta un punto final', 'Sobra una coma: en una enumeración lo normal es no escribir coma delante de la «y»', 'La «y» debería ir con mayúscula', 'Falta una coma entre «pan» y «leche»'],
        correcta: 1,
        pista: '<p>Mira qué signo separa los tres elementos de la lista.</p>',
        solucion: '<p>La segunda: <strong>sobra una coma</strong>. En una enumeración separada por comas, lo normal es que la «y» que precede al último elemento vaya sin coma delante, como recomienda la Fundación del Español Urgente (España, 2011). La «y» va en minúscula y lo que sobra es solo la coma.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirven las comillas?</p>',
        opciones: ['Para marcar lo que se dice tal cual, como una cita, y también lo que el autor quiere destacar', 'Para separar los elementos de una lista', 'Para anunciar una explicación', 'Para dejar algo sin acabar'],
        correcta: 0,
        pista: '<p>Piensa en cómo se escribe «ha dicho que...».</p>',
        solucion: '<p>La primera: <strong>marcan lo que se dice tal cual</strong>, como una cita o un ejemplo, y también lo que el autor quiere destacar por su importancia o por su carácter irónico (Wikipedia en español, apoyo). Las comillas van al principio y al final de lo que va entre ellas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué son los dos puntos? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['dos puntos', 'los dos puntos', 'los dos puntos (colon)', 'el signo que anuncia una lista o una explicación', 'el signo que anuncia lo que viene después', 'dos puntos es el signo que anuncia una lista o una explicación'],
        pista: '<p>Es el signo que se escribe con dos puntos, uno encima del otro.</p>',
        solucion: '<p>Son los <strong>dos puntos</strong> (<span lang="en">colon</span>): el signo que anuncia una lista, una explicación o una cita. Marcan una pausa mayor que la coma y menor que el punto, y lo que viene detrás sigue desarrollando la misma idea.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para puntuar una frase.</p>',
        respuesta: ['Lee la frase en voz alta', 'Busca dónde cambia la idea y pon un punto', 'Separa con comas los elementos de una lista', 'Mira si entre dos oraciones muy unidas hace falta un punto y coma', 'Quita las comas que sobren y revisa las enumeraciones'],
        pista: '<p>Primero pruebas, después pones los puntos, y al final repasas las comas.</p>',
        solucion: '<p>El orden es: lees la frase en voz alta, buscas dónde cambia la idea y pones un punto, separas con comas los elementos de una lista, miras si entre dos oraciones muy unidas hace falta un punto y coma y, por último, quitas las comas que sobren y revisas las enumeraciones.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas pausas tiene la frase «Vine, vi, vencí» si cuentas también el punto final?</p>', respuesta: 2 + 1,
        pista: '<p>Cuenta cada signo de puntuación de la frase.</p>',
        solucion: '<p>Tiene <strong>3 pausas</strong>: las dos comas y el punto final. Las dos primeras son pausas cortas y la del punto es larga, como se ve en el diagrama de la lección.</p>' },
    ],
    fuentes: [WIKI_SIGNOS, FUNDEU_COMA, CERVANTES_DUDAS, WIKI_PUNTO_COMA, WIKI_DOS_PUNTOS],
  });

  // ------------------------------------------------------------------
  L('Escribir un resumen', {
    objetivo: 'Redactar el resumen de un texto con tus propias palabras, en un párrafo y con la extensión que toca, sin copiar del original.',
    explicacion: `
      <p>Ya sabes qué es un resumen y qué sacar de un texto: eso lo viste en "Hacer un resumen", unidad 2. Falta el paso difícil: escribirlo sin el original delante, con el texto cerrado.</p>
      <p>Un resumen es una <strong>síntesis</strong> (<span lang="en">synthesis</span>): un texto nuevo y más corto que reúne lo esencial de otro y se puede leer solo. Wikipedia en español (apoyo) lo describe como un escrito que sintetiza las ideas principales de un texto, cuyos vínculos lógicos deben quedar claros, aunque cambie el orden, y con un tono objetivo.</p>
      <p>Los contenidos básicos comunes de Lengua del Ministerio de Educación de la Nación (Argentina, documento sin fecha de publicación) piden justo esto: reconocer el tema del texto y elaborar resúmenes, y al escribir usar el parafraseo y eliminar repeticiones. Parafrasear es decirlo con tus palabras; eliminar repeticiones es no repetir palabras ni ideas.</p>
      <h3>Los cuatro pasos</h3>
      <p>El método de esta lección tiene cuatro pasos, y el orden importa porque cada uno prepara al siguiente:</p>
      <ol>
        <li>Lee el texto y toma notas: el tema, la idea principal y las dos ideas secundarias.</li>
        <li>Cierra el original y apártalo de la vista.</li>
        <li>Escribe el resumen con tus palabras, en un párrafo y con la extensión que toca.</li>
        <li>Comprueba el resultado con tres preguntas.</li>
      </ol>
      <p>El segundo paso es el más importante: si escribes con el texto delante, la tentación es copiar, y un resumen copiado no es un resumen, sino un recorte del original. Como extraer lo importante ya lo aprendiste en "Hacer un resumen", lo difícil aquí es decirlo con tus palabras.</p>
      <p>Las tres preguntas de la comprobación son: ¿se entiende sin el original?, ¿sigue estando la idea principal? y ¿he añadido algo que no estaba? Si a la tercera respondes que sí, el resumen lleva una idea que el original no decía.</p>
      <h3>La extensión: una guía, no una ley</h3>
      <p>La <strong>extensión</strong> (<span lang="en">length</span>) es lo que ocupa el resumen. Wikipedia en español (apoyo) recuerda que puede variar, pero que no suele pasar del 25 % del original, es decir, la cuarta parte. Es una guía, no una ley: lo que manda es que no falte lo importante.</p>
      <p>El resumen, como cualquier texto, tiene estructura y sus signos de puntuación, como viste en "Estructura de un texto" y en "Puntuación".</p>
      <p class="nota"><strong>Trampa común:</strong> quedarse con lo que más llama la atención, el ejemplo divertido o la cifra grande, y dejar fuera la idea principal. Un resumen del que solo se recuerda un dato no resume: cuenta una anécdota.</p>
      ${RESUMEN}
      <div class="tabla-wrap"><table>
        <thead><tr><th>En el resumen</th><th>Fuera del resumen</th></tr></thead>
        <tbody>
          <tr><th scope="row">El tema y la idea principal</th><td>Los detalles que decoran el texto</td></tr>
          <tr><th scope="row">Las dos ideas que sostienen la principal</th><td>El ejemplo más divertido</td></tr>
          <tr><th scope="row">Un tono objetivo</th><td>Tu opinión sobre lo que dice el texto</td></tr>
        </tbody>
      </table></div>
      <p>Para practicar, usaremos este texto: está inventado y sus cifras son de ejemplo.</p>
      <div class="nota texto-muestra"><p>La biblioteca del colegio parece un cuarto pequeño lleno de cajas. Durante años recibió libros que nadie leía. Hoy es otro sitio: ordenaron los estantes por temas, pintaron las paredes y abrieron una mesa donde se puede leer sin pedir permiso.</p><p>Lo que más cambió fue el uso. La biblioteca dejó de ser el sitio donde se guardan los libros y pasó a ser el sitio donde se leen. En el recreo siempre hay alguien: quien entrega un trabajo o quien quiere estar tranquilo.</p><p>Además, los propios alumnos han empezado a traer libros. Nadie lo pidió, pero en un mes aparecieron cuarenta y dos novelas y tres diccionarios en una caja de cartón. El acuerdo es sencillo: si no te lo han pedido, trae lo que te apetezca leer.</p><p>Todavía queda mucho por hacer: faltan sillones y los préstamos duran poco. Pero el cambio más importante no se nota con números: se nota en que, por primera vez, entrar en la biblioteca es algo que se hace a propósito.</p></div>
      <p>El resumen que escribiremos tiene unas 43 palabras de las 169 del texto: una cuarta parte.</p>`,
    ejemplo: `
      <p>Vamos a recorrer el método con el texto de arriba.</p>
      <ol class="pasos-ej">
        <li>Tomo notas. El tema es la biblioteca del colegio. La idea principal es que dejó de ser un almacén de libros para ser un sitio donde se leen. Las dos ideas secundarias: cómo se reorganizó el espacio, y que los alumnos empezaron a traer libros.</li>
        <li>Cierro el original y aparto la hoja con el texto.</li>
        <li>Escribo con mis palabras: «La biblioteca del colegio pasó de guardar libros que nadie leía a ser un sitio donde se lee: ordenaron los estantes por temas y abrieron una mesa para leer. Además, los alumnos trajeron sus propios libros y acordaron traer lo que les apetezca».</li>
        <li>Compruebo: se entiende sin el original, la idea principal sigue ahí y no he añadido nada que no estuviera.</li>
      </ol>
      <p class="nota"><strong>Error común:</strong> escribir un resumen que conserva las cuarenta y dos novelas y los tres diccionarios, porque son los detalles más llamativos, y se queda sin la idea principal. Un resumen bien escrito se nota rápido: alguien que no leyó el original lo entiende.</p>`,
    vidaReal: `
      <p>Un resumen bien escrito se nota en muchos sitios:</p>
      <ul>
        <li>En un trabajo del colegio, el resumen que pones al principio es la puerta: si está bien, el profesor sigue leyendo.</li>
        <li>En un examen, resumir el tema en tres líneas es más rápido que escribirlo entero y evita que se te olvide lo importante.</li>
        <li>En un mensaje al móvil, resumir antes de enviar evita mandar un texto largo que nadie va a leer.</li>
        <li>En una nota para un compañero, dos frases con la idea principal valen más que el texto entero.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué frase entraría en el resumen del texto de la biblioteca?</p>',
        opciones: ['«En un mes aparecieron cuarenta y dos novelas y tres diccionarios en una caja de cartón»', '«La biblioteca dejó de ser el sitio donde se guardan los libros y pasó a ser el sitio donde se leen»', '«La biblioteca del colegio parece un cuarto pequeño lleno de cajas»', '«No hay suficientes sillones y los préstamos duran poco»'],
        correcta: 1,
        pista: '<p>Busca la frase que dice de qué va el texto entero, no la que cuenta un detalle.</p>',
        solucion: '<p>La segunda: <strong>«La biblioteca dejó de ser el sitio donde se guardan los libros y pasó a ser el sitio donde se leen»</strong>. Es la idea principal del texto; la primera y la cuarta son detalles, y la tercera es solo el aspecto de partida.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un resumen del texto empieza así: «En la biblioteca del colegio, un mes aparecieron cuarenta y dos novelas y tres diccionarios en una caja de cartón, y como no hay suficientes sillones, sigue siendo un cuarto pequeño lleno de cajas». ¿Qué le falta?</p>',
        opciones: ['Le falta extensión, porque el resumen debería ocupar la mitad del original', 'Le sobra el tono objetivo, porque un resumen va en primera persona', 'Le falta cerrar con una frase final', 'Le falta la idea principal y se ha quedado con los detalles'],
        correcta: 3,
        pista: '<p>Pregunta qué idea del texto original no aparece en ese resumen.</p>',
        solucion: '<p>La cuarta: <strong>le falta la idea principal</strong>. El resumen se ha quedado con el detalle de las cuarenta y dos novelas y con la descripción del cuarto pequeño, y no dice lo más importante: que la biblioteca pasó a ser un sitio donde se lee. Un resumen del que solo se recuerda un dato no resume.</p>' },
      { tipo: 'opciones', enunciado: '<p>La tercera pregunta de la comprobación, «¿he añadido algo que no estaba?», sirve para…</p>',
        opciones: ['Verificar que el resumen dice lo mismo que el original y nada más', 'Comprobar que el resumen está bien puntuado', 'Decidir si la extensión del resumen es la adecuada', 'Comprobar que las palabras del resumen son distintas de las del original'],
        correcta: 0,
        pista: '<p>La pregunta habla de algo que has añadido tú, no de algo que falta.</p>',
        solucion: '<p>La primera: <strong>verificar que el resumen dice lo mismo que el original y nada más</strong>. Si añades una idea que el texto no tenía, el resumen ya no resume ese texto. La extensión se decide al escribir, y la puntuación se revisa con las reglas de "Puntuación"; que las palabras sean distintas es parte de la redacción, no de esta pregunta.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué es una síntesis? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['síntesis', 'la síntesis', 'una síntesis', 'sintesis', 'el texto corto que reúne lo esencial de otro', 'el texto nuevo, más corto, que reúne lo esencial de otro texto y se puede leer solo', 'la síntesis es el texto corto que reúne lo esencial de otro', 'texto que reúne lo esencial de otro texto'],
        pista: '<p>Es lo que hace un resumen: quedarse con lo esencial de un texto y decirlo de otra manera.</p>',
        solucion: '<p>Una <strong>síntesis</strong> (<span lang="en">synthesis</span>) es el texto corto que reúne lo esencial de otro y se puede leer solo. Wikipedia en español (apoyo) dice que el resumen sintetiza las ideas principales de un texto y que no suele pasar del 25 % de su extensión.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los cuatro pasos del método para escribir un resumen.</p>',
        respuesta: [
          'Leer el texto y tomar notas',
          'Cerrar el original y apartarlo de la vista',
          'Escribir el resumen con tus palabras',
          'Comprobar el resultado con tres preguntas',
        ],
        pista: '<p>Primero lees, después cierras, luego escribes y al final compruebas.</p>',
        solucion: '<p>El orden es: lees el texto y tomas notas, cierras el original y lo apartas de la vista, escribes el resumen con tus palabras y, al final, compruebas el resultado con las tres preguntas. Si escribes con el texto delante, la tentación es copiar.</p>' },
      { tipo: 'numero', enunciado: '<p>Un texto tiene 180 palabras. Si el resumen ocupa una cuarta parte, ¿cuántas palabras debería tener?</p>', respuesta: 180 / 4,
        pista: '<p>La cuarta parte es dividir entre cuatro.</p>',
        solucion: '<p>180 ÷ 4 = <strong>45 palabras</strong>. Wikipedia en español (apoyo) recuerda que un resumen no suele pasar del 25 % de la extensión del original, y el 25 % es justamente la cuarta parte. Es una guía, no una ley: lo que no puede faltar es la idea principal.</p>' },
    ],
    fuentes: [CBC, WIKI_RESUMEN],
  });

  // ------------------------------------------------------------------
  L('Escribir un ensayo argumentativo', {
    objetivo: 'Escribir un ensayo argumentativo: elegir una tesis, ordenar las razones en un esquema y desarrollar cada una con su prueba.',
    explicacion: `
      <p>Empieza con una pregunta: «¿debería el recreo ser más largo?». Hay dos respuestas razonables, y por eso es una buena pregunta. Un ensayo argumentativo no es dar tu opinión: es defenderla de manera que quien no está de acuerdo entienda tus razones.</p>
      <p>Un <strong>ensayo</strong> (<span lang="en">essay</span>) es un texto en prosa que explora, analiza o evalúa un tema. Wikipedia en español (apoyo) lo describe como un escrito fundamentado que sintetiza un tema significativo y que tiene como fin argumentar una opinión o descubrirla, y explica que en varios países se enseñan formatos estructurados de ensayo en la escuela para mejorar las habilidades de escritura. Eso significa que se puede construir paso a paso, y esta lección te lo da.</p>
      <p>Antes de escribir nada hay que tener una <strong>tesis</strong> (<span lang="en">thesis</span>), que es la posición que el texto defiende, dicha en una frase. Wikipedia en español (apoyo) la define como el inicio de un texto argumentativo, una afirmación cuya veracidad ha sido argumentada, demostrada o justificada, y también como la afirmación concreta de una idea que se expone de manera abierta y fundamentada. O sea: no es «me parece mal», sino «esto es lo que pienso y esto es lo que lo sostiene».</p>
      <p>Y para ordenar las razones hay un <strong>esquema</strong> (<span lang="en">outline</span>), que es la lista de lo que vas a decir, escrita antes de redactar. Los contenidos básicos comunes de Lengua del Ministerio de Educación de la Nación (Argentina, documento sin fecha de publicación) piden justo eso: un plan de trabajo que genera, selecciona y organiza ideas nucleares y periféricas, y entre sus contenidos están la elaboración de planes, borradores y procedimientos de corrección, la fundamentación de las opiniones y el formato y la estructuración del texto argumentativo, junto con la noticia editorial y el informe breve, con sus conectores propios y su progresión temática.</p>
      <h3>Las tres partes del ensayo</h3>
      <p>Un ensayo argumentativo tiene tres partes, y Wikipedia en español (apoyo) las llama así: una tesis inicial, donde se formula de forma clara la idea que se defiende; un desarrollo argumental, donde se exponen los argumentos y sus justificaciones, y donde pueden aparecer citas textuales; y una conclusión o síntesis, que da el cierre. El orden es el que ya conoces: primero la introducción, luego los argumentos y al final la conclusión, igual que en "Estructura de un texto".</p>
      ${ENSAYO}
      <h3>El método, paso a paso</h3>
      <ol>
        <li>Elige una pregunta que tenga dos respuestas razonables, no una pregunta de manual.</li>
        <li>Escribe la tesis en una frase.</li>
        <li>Haz el esquema: dos o tres razones y la prueba de cada una.</li>
        <li>Escribe una razón por párrafo, con la prueba dentro del párrafo.</li>
        <li>Responde a la mejor objeción, porque quien no está de acuerdo busca justo esa objeción.</li>
        <li>Cierra y revisa la ortografía, la claridad y el orden de las ideas.</li>
      </ol>
      <p>Las reglas de fondo son las de la unidad 3, aplicadas al revés. En "Cómo se construye un argumento" viste cómo se desmonta un argumento, y en "Falacias comunes" viste lo que no hay que hacer: aquí esas piezas se montan, y las falacias son justo lo que hay que evitar. Con una regla en concreto: no se ataca a la persona, se ataca la idea, y no se inventan datos. Se escribe para alguien que piensa distinto, no para quien ya está de acuerdo.</p>
      <p>La comprobación final son tres preguntas: ¿puedes decir tu tesis en una frase?, ¿cada párrafo tiene una sola idea? y ¿el orden de las razones tiene sentido?</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>La parte</th><th>Qué tiene que estar ahí</th><th>El error típico</th></tr></thead>
        <tbody>
          <tr><th scope="row">Introducción</th><td>La tesis en una frase, con la postura que defiendes</td><td>Callar la tesis hasta el final y que el lector adivine qué defiendes</td></tr>
          <tr><th scope="row">Desarrollo</th><td>Una razón por párrafo, con su prueba dentro</td><td>Meter tres ideas en el mismo párrafo y dejar la prueba suelta</td></tr>
          <tr><th scope="row">Conclusión</th><td>La misma postura, defendida, sin ideas nuevas</td><td>Añadir en el cierre una razón que no has desarrollado</td></tr>
        </tbody>
      </table></div>`,
    ejemplo: `
      <p>Pregunta: «¿debería el recreo ser más largo?». Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Elijo la tesis: «El recreo no debería ser más largo, sino más corto y colocado antes de la segunda hora».</li>
        <li>Hago el esquema con dos razones y su prueba: un recreo largo al final de la mañana deja menos atención (prueba de ejemplo: los 30 alumnos de la clase), y el problema es el momento, no la duración (prueba: comparar esos mismos 30 alumnos).</li>
        <li>Escribo un párrafo por razón y contesto la mejor objeción: alguien podría decir que con menos recreo los niños llegan cansados a casa. Es verdad, y por eso la mejor opción no es quitarlo, sino moverlo.</li>
        <li>Cierro sin ideas nuevas y compruebo: ¿puedo decir la tesis en una frase? ¿Cada párrafo tiene una sola idea? ¿El orden de las razones tiene sentido?</li>
      </ol>
      <p class="nota"><strong>Error común:</strong> atacar a quien piensa distinto. «Los que piden más recreo no hacen nada en casa» no es un argumento, es un insulto, y quien no estaba de acuerdo se cierra. Lo que hay que atacar es la idea.</p>`,
    vidaReal: `
      <p>Defender una idea con razones se nota en muchos sitios:</p>
      <ul>
        <li>En un trabajo del colegio, la postura en la primera frase le dice al profesor qué vas a defender, y él busca las razones.</li>
        <li>En una carta a un centro o a una autoridad, escribir la postura y las razones evita que te ignoren.</li>
        <li>En un foro, responder con razones y no con insultos convence a más gente.</li>
        <li>En una entrevista de trabajo, contar por qué opinas una cosa es más útil que dar la opinión suelta.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas frases es una buena tesis para un ensayo argumentativo?</p>',
        opciones: ['«Los recreos son largos y aburridos»', '«El recreo debería ser más corto y colocarse antes de la segunda hora, porque así los alumnos vuelven a clase con más atención»', '«A mí el recreo no me gusta»', '«El recreo es un rato de descanso entre dos clases»'],
        correcta: 1,
        pista: '<p>Una tesis dice lo que defiendes y da una razón, todo en una frase.</p>',
        solucion: '<p>La segunda: <strong>«El recreo debería ser más corto y colocarse antes de la segunda hora, porque así los alumnos vuelven a clase con más atención»</strong>. Wikipedia en español (apoyo) define la tesis como la afirmación cuya veracidad ha sido argumentada, demostrada o justificada. La primera es una opinión sin razones, la cuarta es una definición, y la tercera es una opinión personal.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos esquemas es el mejor para escribir un ensayo?</p>',
        opciones: ['«Razón uno, razón dos, razón tres, razón cuatro, razón cinco», sin pruebas', '«Conclusión, tesis y después las razones»', '«Tesis: el recreo debería ser más corto. Razón 1: el recreo largo al final de la mañana deja menos atención, con su prueba. Razón 2: el problema es el momento y no la duración, con su prueba»', '«Una opinión sobre el recreo, un ejemplo sobre el recreo y una conclusión sobre el recreo»'],
        correcta: 2,
        pista: '<p>Un esquema tiene la tesis primero y cada razón con su prueba.</p>',
        solucion: '<p>La tercera: <strong>empieza por la tesis y cada razón lleva su prueba</strong>. El esquema es la lista de lo que vas a decir, escrita antes de escribirlo. El primero no tiene pruebas, el segundo está al revés y el cuarto mezcla la tesis con las razones sin separarlas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué error tiene este párrafo de ensayo? «Los que piden un recreo más largo no hacen nada en casa, y eso se nota cuando llegan cansados a la clase del lunes».</p>',
        opciones: ['Ataca a la persona en vez de discutir la idea', 'Tiene dos ideas en el mismo párrafo', 'Le falta una cifra que apoye lo que dice', 'No termina con un punto final'],
        correcta: 0,
        pista: '<p>Mira a quién señala el párrafo: a una idea o a las personas que la sostienen.</p>',
        solucion: '<p>La primera: <strong>ataca a la persona en vez de discutir la idea</strong>. Decir «los que piden más recreo no hacen nada en casa» no es una razón, es un juicio sobre las personas, y el lector que no está de acuerdo se cierra. Lo que hay que hacer es atacar la idea y darle una prueba, como viste en "Falacias comunes".</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué es una tesis? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['tesis', 'la tesis', 'una tesis', 'la posición que el texto defiende, dicha en una frase', 'la afirmación concreta de una idea que se expone de manera abierta y fundamentada', 'la tesis es la posición que el texto defiende, dicha en una frase', 'afirmación cuya veracidad ha sido argumentada, demostrada o justificada'],
        pista: '<p>Es la frase que dice qué defiendes y por qué, en un texto argumentativo.</p>',
        solucion: '<p>Una <strong>tesis</strong> (<span lang="en">thesis</span>) es la posición que el texto defiende, dicha en una frase. Wikipedia en español (apoyo) la define como una afirmación cuya veracidad ha sido argumentada, demostrada o justificada, y como la afirmación concreta de una idea que se expone de manera abierta y fundamentada.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena las tres partes de un ensayo argumentativo.</p>',
        respuesta: [
          'Introducción, con la tesis',
          'Desarrollo, con una razón por párrafo y su prueba',
          'Conclusión, con la misma postura y sin ideas nuevas',
        ],
        pista: '<p>Primero dices qué defiendes, después lo demuestras y al final cierras.</p>',
        solucion: '<p>El orden es: la introducción, con la tesis; el desarrollo, con una razón por párrafo y su prueba; y la conclusión, con la misma postura y sin ideas nuevas. Wikipedia en español (apoyo) lo describe como la tesis inicial, el desarrollo argumental y la conclusión o síntesis.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas razones tiene el esquema del ejemplo del recreo?</p>', respuesta: 1 + 1,
        pista: '<p>Cuenta las razones del esquema que se escribió antes de los párrafos.</p>',
        solucion: '<p>Tiene <strong>2 razones</strong>: la primera, que un recreo largo al final de la mañana deja menos atención, y la segunda, que el problema es el momento y no la duración. Cada una lleva su prueba, y la segunda responde a la primera.</p>' },
    ],
    fuentes: [CBC, WIKI_ARGUMENTATIVO, WIKI_TESIS, WIKI_ENSAGO],
  });
})();
