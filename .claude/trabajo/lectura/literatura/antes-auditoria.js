// Lectura · Unidad 5: Literatura.
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
  const CERVANTES = { nombre: 'Biblioteca Virtual Miguel de Cervantes (España): Literatura', url: 'https://www.cervantesvirtual.com/areas/literatura/' };
  const WIKI_GENERO = { nombre: 'Wikipedia en español: Género literario (apoyo)', url: 'https://es.wikipedia.org/wiki/G%C3%A9nero_literario' };
  const WIKI_NOVELA = { nombre: 'Wikipedia en español: Novela (apoyo)', url: 'https://es.wikipedia.org/wiki/Novela' };
  const WIKI_CUENTO = { nombre: 'Wikipedia en español: Cuento (apoyo)', url: 'https://es.wikipedia.org/wiki/Cuento' };
  const WIKI_NARRADOR = { nombre: 'Wikipedia en español: Narrador (apoyo)', url: 'https://es.wikipedia.org/wiki/Narrador' };
  const WIKI_PERSONAJE = { nombre: 'Wikipedia en español: Personaje (apoyo)', url: 'https://es.wikipedia.org/wiki/Personaje' };
  const WIKI_TRAMA = { nombre: 'Wikipedia en español: Trama (narratología) (apoyo)', url: 'https://es.wikipedia.org/wiki/Trama_(narratolog%C3%ADa)' };
  const WIKI_FIGURA = { nombre: 'Wikipedia en español: Figura literaria (apoyo)', url: 'https://es.wikipedia.org/wiki/Figura_literaria' };
  const WIKI_METAFORA = { nombre: 'Wikipedia en español: Metáfora (apoyo)', url: 'https://es.wikipedia.org/wiki/Met%C3%A1fora' };
  const WIKI_SIMIL = { nombre: 'Wikipedia en español: Símil (apoyo)', url: 'https://es.wikipedia.org/wiki/S%C3%ADmil' };
  const WIKI_HIPERBOLE = { nombre: 'Wikipedia en español: Hipérbole (apoyo)', url: 'https://es.wikipedia.org/wiki/Hip%C3%A9rbole' };
  const WIKI_PERSONIFICACION = { nombre: 'Wikipedia en español: Personificación (apoyo)', url: 'https://es.wikipedia.org/wiki/Personificaci%C3%B3n' };
  const WIKI_EUFEMISMO = { nombre: 'Wikipedia en español: Eufemismo (apoyo)', url: 'https://es.wikipedia.org/wiki/Eufemismo' };
  const POETS_ALLEGORY = { nombre: 'Academy of American Poets (Estados Unidos, en inglés): Glossary of Poetic Terms: Allegory', url: 'https://poets.org/glossary/allegory' };
  const POETS_LINE = { nombre: 'Academy of American Poets (Estados Unidos, en inglés): Glossary of Poetic Terms: Line', url: 'https://poets.org/glossary/line' };
  const POETS_STANZA = { nombre: 'Academy of American Poets (Estados Unidos, en inglés): Glossary of Poetic Terms: Stanza', url: 'https://poets.org/glossary/stanza' };
  const POETS_POETRY = { nombre: 'Academy of American Poets (Estados Unidos, en inglés): Glossary of Poetic Terms: Poetry', url: 'https://poets.org/glossary/poetry' };
  const WIKI_VERSO = { nombre: 'Wikipedia en español: Verso (apoyo)', url: 'https://es.wikipedia.org/wiki/Verso' };
  const WIKI_ESTROFA = { nombre: 'Wikipedia en español: Estrofa (apoyo)', url: 'https://es.wikipedia.org/wiki/Estrofa' };
  const WIKI_RIMA = { nombre: 'Wikipedia en español: Rima (apoyo)', url: 'https://es.wikipedia.org/wiki/Rima' };
  const WIKI_SONETO = { nombre: 'Wikipedia en español: Soneto (apoyo)', url: 'https://es.wikipedia.org/wiki/Soneto' };
  const WIKI_POESIA = { nombre: 'Wikipedia en español: Poesía (apoyo)', url: 'https://es.wikipedia.org/wiki/Poes%C3%ADa' };
  const WIKI_TEATRO = { nombre: 'Wikipedia en español: Teatro (apoyo)', url: 'https://es.wikipedia.org/wiki/Teatro' };
  const WIKI_ACTO = { nombre: 'Wikipedia en español: Acto (artes escénicas) (apoyo)', url: 'https://es.wikipedia.org/wiki/Acto_(artes_esc%C3%A9nicas)' };
  const WIKI_ESCENA = { nombre: 'Wikipedia en español: Escena (artes escénicas) (apoyo)', url: 'https://es.wikipedia.org/wiki/Escena_(artes_esc%C3%A9nicas)' };
  const WIKI_DIALOGO = { nombre: 'Wikipedia en español: Diálogo (apoyo)', url: 'https://es.wikipedia.org/wiki/Di%C3%A1logo' };
  const WIKI_SUBTEXTO = { nombre: 'Wikipedia en español: Subtexto (apoyo)', url: 'https://es.wikipedia.org/wiki/Subtexto' };
  const WIKI_JORNADA = { nombre: 'Wikipedia en español: Jornada (teatro) (apoyo)', url: 'https://es.wikipedia.org/wiki/Jornada_(teatro)' };
  const WIKI_CELESTINA = { nombre: 'Wikipedia en español: La Celestina (apoyo)', url: 'https://es.wikipedia.org/wiki/La_Celestina' };
  const CERVANTES_CELESTINA = { nombre: 'Biblioteca Virtual Miguel de Cervantes (España): La Celestina', url: 'https://www.cervantesvirtual.com/bib_obra/celestina/' };
  const WIKISOURCE_CAUPOLICAN = { nombre: 'Wikisource: Rubén Darío (Nicaragua), soneto «Caupolicán», de Azul... (1888), edición de Mundo Latino de 1917', url: 'https://es.wikisource.org/wiki/Caupolic%C3%A1n' };
  const WIKISOURCE_DARIO = { nombre: 'Wikisource: Autor:Rubén Darío (Nicaragua)', url: 'https://es.wikisource.org/wiki/Autor:Rub%C3%A9n_Dar%C3%ADo' };
  const WIKISOURCE_LUNA = { nombre: 'Wikisource: Federico García Lorca (España), «Romance de la luna, luna», del Romancero gitano (1928)', url: 'https://es.wikisource.org/wiki/Romance_de_la_luna,_luna' };
  const WIKISOURCE_CELESTINA_EDICIONES = { nombre: 'Wikisource: La Celestina (España), índice de ediciones, desde la de 1599', url: 'https://es.wikisource.org/wiki/La_Celestina' };
  const WIKISOURCE_CELESTINA_1913 = { nombre: 'Wikisource: La Celestina (España), edición de 1913: Aucto primero', url: 'https://es.wikisource.org/wiki/La_Celestina_(1913)/Aucto_primero' };

  // Dos ejes de clasificación: el tipo de texto dice para qué sirve; el género, con qué forma viene.
  const EJES = diagrama([0, 12], [0, 9], [
    caja(0.3, 3.6, 5.7, 8.8), txt(3, 8.3, 'Tipo de texto'), txt(3, 7.7, 'para qué sirve el texto'),
    txt(3, 7.0, 'narrativo'), txt(3, 6.3, 'expositivo'), txt(3, 5.6, 'argumentativo'), txt(3, 4.9, 'instructivo'),
    caja(6.3, 3.6, 11.7, 8.8), txt(9, 8.3, 'Género literario'), txt(9, 7.7, 'su forma y tradición'),
    txt(9, 7.0, 'cuento'), txt(9, 6.3, 'novela'), txt(9, 5.6, 'poesía'), txt(9, 4.9, 'drama'), txt(9, 4.2, 'ensayo'),
    caja(0.3, 0.6, 11.7, 2.6), txt(6, 2.0, 'El mismo texto'), txt(6, 1.3, 'se clasifica de dos maneras'),
    ...flecha([3, 2.6], [3, 3.6]),
    ...flecha([9, 2.6], [9, 3.6]),
  ], 'Diagrama con dos cajas arriba y una caja ancha abajo. La caja de la izquierda dice «Tipo de texto: para qué sirve el texto», y dentro están narrativo, expositivo, argumentativo e instructivo. La caja de la derecha dice «Género literario: su forma y tradición», y dentro están cuento, novela, poesía, drama y ensayo. Abajo hay una caja ancha que dice «El mismo texto se clasifica de dos maneras», y de ella salen dos flechas hacia arriba, una hacia cada caja.');

  // Los elementos de la narración: la voz arriba, y debajo lo que cuenta.
  const ELEMENTOS = diagrama([0, 12], [0, 9], [
    caja(3.2, 7.4, 8.8, 8.8), txt(6, 8.35, 'El narrador'), txt(6, 7.8, 'quién cuenta'),
    caja(3.2, 5.0, 8.8, 6.4), txt(6, 5.95, 'Los personajes'), txt(6, 5.4, 'quiénes participan'),
    caja(3.2, 2.6, 8.8, 4.0), txt(6, 3.55, 'La trama'), txt(6, 3.0, 'los hechos y su orden'),
    caja(0.3, 0.5, 5.7, 2.0), txt(3, 1.55, 'Espacio y tiempo'), txt(3, 0.95, 'dónde y cuándo'),
    caja(6.3, 0.5, 11.7, 2.0), txt(9, 1.55, 'Lo que no dice'), txt(9, 0.95, 'el lector lo deduce'),
    ...flecha([6, 7.4], [6, 6.4]),
    ...flecha([6, 5.0], [6, 4.0]),
    ...flecha([4.0, 2.6], [3.0, 2.0]),
    ...flecha([8.0, 2.6], [9.0, 2.0]),
  ], 'Diagrama con tres cajas en el centro, una debajo de otra: «El narrador: quién cuenta», «Los personajes: quiénes participan» y «La trama: los hechos y su orden». Una flecha baja del narrador a los personajes y otra de los personajes a la trama. Abajo, dos cajas: a la izquierda, «Espacio y tiempo: dónde y cuándo», y a la derecha, «Lo que no dice: el lector lo deduce», y de la trama sale una flecha hacia cada una.');

  // La misma idea en tres versiones: literal, comparación y metáfora.
  const TRES = diagrama([0, 12], [0, 9], [
    caja(1.6, 7.2, 10.4, 8.8), txt(6, 8.35, 'La sala estaba fría y a oscuras'), txt(6, 7.65, 'la versión literal'),
    caja(0.4, 3.3, 5.8, 6.3), txt(3.1, 5.95, 'La sala estaba'), txt(3.1, 5.2, 'como una nevera'),
    txt(3.1, 4.45, 'comparación'), txt(3.1, 3.85, 'se parece a otra'),
    caja(6.2, 3.3, 11.6, 6.3), txt(8.9, 5.95, 'La sala era'), txt(8.9, 5.2, 'una nevera'),
    txt(8.9, 4.45, 'metáfora'), txt(8.9, 3.85, 'es otra cosa'),
    caja(0.4, 0.6, 11.6, 2.4), txt(6, 1.85, 'la metáfora: una cosa ES otra'), txt(6, 1.1, 'la comparación: una cosa SE PARECE a otra'),
    ...flecha([4.0, 7.2], [3.1, 6.3]),
    ...flecha([8.0, 7.2], [8.9, 6.3]),
    ...flecha([3.1, 3.3], [3.1, 2.4]),
    ...flecha([8.9, 3.3], [8.9, 2.4]),
  ], 'Diagrama con una caja ancha arriba que dice «La sala estaba fría y a oscuras», la versión literal. De ella salen dos flechas hacia abajo. A la izquierda, una caja con «La sala estaba como una nevera», que es la comparación, porque la sala se parece a otra cosa. A la derecha, una caja con «La sala era una nevera», que es la metáfora, porque la sala es otra cosa. Abajo, una caja ancha resume: «la metáfora: una cosa ES otra» y «la comparación: una cosa SE PARECE a otra».');

  // El soneto: sus cuatro estrofas y el esquema de rima.
  const SONETO = diagrama([0, 12], [0, 9], [
    caja(0.4, 7.4, 11.6, 8.8), txt(6, 8.4, 'El soneto «Caupolicán», de Rubén Darío (1888)'), txt(6, 7.85, '14 versos en 4 estrofas'),
    caja(0.4, 5.2, 5.8, 6.9), txt(3.1, 6.45, 'Estrofa 1: 4 versos'), txt(3.1, 5.95, 'A B A B'), txt(3.1, 5.45, 'raza y maza'),
    caja(6.2, 5.2, 11.6, 6.9), txt(8.9, 6.45, 'Estrofa 2: 4 versos'), txt(8.9, 5.95, 'C D C D'), txt(8.9, 5.45, 'coraza y caza'),
    caja(0.4, 3.3, 5.8, 5.0), txt(3.1, 4.55, 'Estrofa 3: 3 versos'), txt(3.1, 4.05, 'E E F'), txt(3.1, 3.55, 'día y fría'),
    caja(6.2, 3.3, 11.6, 5.0), txt(8.9, 4.55, 'Estrofa 4: 3 versos'), txt(8.9, 4.05, 'G G H'), txt(8.9, 3.55, 'casta y Basta'),
    caja(0.4, 0.8, 11.6, 2.3), txt(6, 1.85, 'Los versos con la misma letra riman entre sí'), txt(6, 1.35, 'en los tercetos la rima se afloja (asonante)'),
  ], 'Diagrama con una caja ancha arriba que dice «El soneto «Caupolicán», de Rubén Darío (1888)» y «14 versos en 4 estrofas». Debajo, cuatro cajas en dos filas: «Estrofa 1: 4 versos», con las letras A B A B y las palabras «raza y maza»; «Estrofa 2: 4 versos», con C D C D y «coraza y caza»; «Estrofa 3: 3 versos», con E E F y «día y fría»; y «Estrofa 4: 3 versos», con G G H y «casta y Basta». Al final, una caja ancha que dice que los versos con la misma letra riman entre sí y que en los tercetos la rima se afloja y es solo asonante.');

  // La obra de teatro: su estructura y las dos capas de su texto.
  const TEATRO = diagrama([0, 12], [1.5, 9], [
    caja(0.4, 7.4, 11.6, 8.8), txt(6, 8.4, 'La obra de teatro'), txt(6, 7.85, 'un guion que alguien representa'),
    ...flecha([6, 7.4], [6, 7.0]),
    caja(0.4, 5.7, 11.6, 7.0), txt(6, 6.55, 'Acto → escena → entrada y salida'), txt(6, 6.05, 'la parte grande, el trozo, el cambio de reparto'),
    ...flecha([3.1, 5.7], [3.1, 5.3]),
    ...flecha([8.9, 5.7], [8.9, 5.3]),
    { tipo: 'poligono', puntos: [[0.4, 3.8], [5.8, 3.8], [5.8, 5.3], [0.4, 5.3]], relleno: true, serie: 1 },
    txt(3.1, 4.85, 'Diálogo: lo que se dice'), txt(3.1, 4.35, 'los personajes hablan'),
    { tipo: 'poligono', puntos: [[6.2, 3.8], [11.6, 3.8], [11.6, 5.3], [6.2, 5.3]], relleno: true, serie: 2 },
    txt(8.9, 4.85, 'Acotación: lo que se hace'), txt(8.9, 4.35, 'el lugar y los gestos'),
    ...flecha([3.1, 3.8], [3.1, 2.9]),
    caja(0.4, 1.6, 11.6, 2.9), txt(6, 2.4, 'Subtexto: lo que insinúan sin decirlo'), txt(6, 1.9, 'el lector lo deduce'),
  ], 'Diagrama con una caja ancha arriba que dice «La obra de teatro» y «un guion que alguien representa». Debajo, con una flecha, una caja ancha con «Acto, escena, entrada y salida» y «la parte grande, el trozo, el cambio de reparto». De esa caja salen dos flechas hacia dos cajas de colores distintos: a la izquierda, la del diálogo, con borde continuo, que dice «Diálogo: lo que se dice» y «los personajes hablan»; a la derecha, la de las acotaciones, con borde discontinuo, que dice «Acotación: lo que se hace» y «el lugar y los gestos». De la caja del diálogo sale una flecha hacia abajo, a una caja ancha final que dice «Subtexto: lo que insinúan sin decirlo» y «el lector lo deduce».');

  // ------------------------------------------------------------------
  L('Géneros literarios', {
    objetivo: 'Reconocer el género de una obra y distinguir el género literario del tipo de texto, para saber qué esperar al leer.',
    explicacion: `
      <p>Dos textos empiezan igual: «Había una vez un chico que recibió una bicicleta nueva». Uno termina en tres páginas, con una sorpresa al final. El otro sigue doscientas páginas y no acaba nunca. Los dos son literatura, pero no son lo mismo, y esa diferencia tiene un nombre.</p>
      <p>Ese nombre es el <strong>género</strong> (<span lang="en">genre</span>). Los géneros literarios son los grupos o categorías en los que se clasifican las obras literarias por su contenido y por su estructura, según Wikipedia en español (apoyo). Cada género tiene sus propias reglas de forma y, sobre todo, tiene lo que el lector espera de él. La división clásica, que viene de la Antigüedad y de las propuestas de Platón y Aristóteles, reparte las obras en tres grupos: el narrativo, el lírico y el dramático.</p>
      <p>Los cinco que vas a ver más veces son el <strong>cuento</strong> (<span lang="en">short story</span>), la <strong>novela</strong> (<span lang="en">novel</span>), la poesía, el drama y el ensayo. El cuento es una narración corta, más corta que una novela, con una estructura cerrada, un solo clímax y más narración que diálogo. La novela narra una acción fingida, entera o en parte, y se escribe en prosa: predomina la narración, aunque dentro también hay descripción, diálogo o monólogo interior.</p>
      <p>El género no es una jaula, es una convención: inscribir una obra en un género ayuda a encajar las expectativas del público lector. Por eso saber el género te ahorra sorpresas: si es un cuento, buscas el remate; si es una novela, no te agobias porque el primer capítulo no ocurra nada.</p>
      <h3>El género y el tipo de texto son dos ejes distintos</h3>
      <p>Este es el aviso más importante de la lección, porque es el error más común. El tipo de texto dice para qué sirve un texto; lo viste en la unidad 1, en "Tipos de texto: narrativo, expositivo, argumentativo e instructivo". El género dice otra cosa: con qué forma y con qué tradición viene el texto. Son dos ejes distintos, y por eso una novela, que es un género, tiene dentro párrafos que informan y otros que convencen, que son tipos de texto, sin dejar de ser una novela.</p>
      <p>Los contenidos básicos comunes de Lengua del Ministerio de Educación de la Nación (Argentina, documento sin fecha de publicación) lo confirman: el currículo trabaja con cuatro géneros (poesía, cuento, novela y teatro) y, aparte, con las estructuras textuales, que son otra lista distinta. Son dos listas diferentes, y ninguna reemplaza a la otra.</p>
      <p>En España, la Biblioteca Virtual Miguel de Cervantes reúne miles de obras digitalizadas de distintos géneros literarios: una biblioteca donde ver cien ejemplos de cada uno.</p>
      ${EJES}
      <h3>Los cinco géneros, lado a lado</h3>
      <div class="tabla-wrap"><table>
        <thead><tr><th>El género</th><th>Su forma</th><th>Lo que el lector espera</th><th>Un ejemplo de la vida real</th></tr></thead>
        <tbody>
          <tr><th scope="row">Cuento</th><td>En prosa, corto, con un solo clímax</td><td>Un remate y un final cerrado</td><td>La historia que te cuenta un amigo en cinco minutos</td></tr>
          <tr><th scope="row">Novela</th><td>En prosa, larga, con mucho desarrollo</td><td>Un mundo que se abre poco a poco</td><td>El libro de capítulos que lees por las noches</td></tr>
          <tr><th scope="row">Poesía</th><td>En versos, con ritmo</td><td>Imágenes y música antes que argumento</td><td>La tarjeta corta con un poema</td></tr>
          <tr><th scope="row">Drama</th><td>En diálogos, hecho para representarse</td><td>Un conflicto y un escenario</td><td>El guion de la obra que se representa en un teatro</td></tr>
          <tr><th scope="row">Ensayo</th><td>En prosa, escrita para proponer ideas</td><td>Una tesis que el autor defiende</td><td>El texto largo de opinión de un diario</td></tr>
        </tbody>
      </table></div>
      <p>Y un último aviso: el género orienta, no manda. Una obra puede saltarse las reglas de su género y seguir siendo buena, y el currículo argentino dice que los géneros y los estilos se reconocen leyendo, no analizando la gramática. El género te dice qué esperar, no qué va a pasar.</p>`,
    ejemplo: `
      <p>La misma historia, dos formatos. Los dos textos inventados para esta lección arrancan igual.</p>
      <div class="nota texto-muestra"><p>El chico baja la bicicleta a la calle, la monta por primera vez y ve en el manillar el lazo de la bicicleta de su hermana. El texto termina ahí, sin aviso.</p></div>
      <div class="nota texto-muestra"><p>La misma bicicleta y el mismo lazo, pero el texto habla del barrio, de la familia y de doscientas páginas que aún no han empezado. El remate no llega.</p></div>
      <ol class="pasos-ej">
        <li>Señales en A: es corto, cuenta un solo hecho y el final cierra el asunto. Es un cuento.</li>
        <li>Señales en B: hay desarrollo, muchos personajes y el asunto sigue abierto. Eso es una novela.</li>
        <li>Qué espera el lector: con A, el remate; con B, que el mundo se abra poco a poco.</li>
      </ol>
      <p>Resultado: <span class="resultado">las dos son literatura, pero el género cambia lo que el lector espera</span>.</p>
      <p class="nota"><strong>Error común:</strong> decidir el género por el número de páginas. El género no lo decide la cantidad de hojas, sino cómo está construido el texto: un cuento con un solo hecho y un remate, o una novela con desarrollo.</p>`,
    vidaReal: `
      <p>Saber el género te ahorra sorpresas:</p>
      <ul>
        <li>En la biblioteca del colegio: la etiqueta dice el género y ya sabes qué te espera.</li>
        <li>En un examen de lectura: si es un cuento, buscas el remate; si es una novela, no esperes el final en la primera página.</li>
        <li>Cuando lees por gusto: un cuento se lee de una sentada y una novela necesita varios días.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Este es un texto inventado para la lección:</p><div class="nota texto-muestra"><p>Había una vez un chico que recibió una bicicleta nueva. Bajó a la calle con ella, la montó por primera vez y, al ver en el manillar el lazo de su hermana, se quedó quieto. Ahí terminó el texto.</p></div><p>¿Qué género es?</p>',
        opciones: ['Es un cuento: es corto, cuenta un solo hecho y cierra con un remate.', 'Es una novela: tiene desarrollo y el final queda abierto.', 'No se puede saber hasta ver cuántas páginas tiene.', 'Es un drama, porque está escrito como si alguien lo contara en voz alta.'],
        correcta: 0,
        pista: '<p>Fíjate en la longitud del texto, en cuántos hechos cuenta y en cómo termina.</p>',
        solucion: '<p>Es la primera: <strong>un cuento</strong>. Es corto, cuenta un solo hecho (la bicicleta y el lazo) y cierra con un remate. Una novela sería larga y con desarrollo, y un drama está escrito en diálogos entre varios personajes.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué espera el lector de una novela?</p>',
        opciones: ['Un remate en la primera página, como en los cuentos', 'Que le expliquen un solo dato y ya está', 'Que el mundo se abra poco a poco y no haya prisa por cerrar', 'Que todos los personajes aparezcan en las primeras páginas'],
        correcta: 2,
        pista: '<p>Una novela es larga y con mucho desarrollo: el asunto no se resuelve enseguida.</p>',
        solucion: '<p>La tercera: <strong>que el mundo se abra poco a poco</strong>. En una novela el lector espera desarrollo, y por eso no le molesta que el primer capítulo termine sin un remate.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una novela tiene dentro un párrafo que explica datos y otro que intenta convencerte de algo. ¿Qué son esos dos párrafos y qué es el conjunto?</p>',
        opciones: ['Los dos párrafos son dos géneros literarios distintos', 'Los dos párrafos son dos tipos de texto distintos, y el conjunto es un género: la novela', 'Los dos párrafos son tipos de texto, y el conjunto también es un tipo de texto', 'Eso no puede ser: un texto solo se clasifica de una sola manera'],
        correcta: 1,
        pista: '<p>Piensa qué dice el texto a propósito del tipo de texto y del género: son dos ejes distintos.</p>',
        solucion: '<p>La segunda: <strong>los dos párrafos son tipos de texto distintos y el conjunto es un género</strong>. El género dice la forma del conjunto (novela) y el tipo de texto dice para qué sirve cada trozo (informar, convencer). Uno no reemplaza al otro.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué es un género literario? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['género', 'el género', 'un género', 'género literario', 'el género literario', 'un género literario', 'genre', 'los grupos o categorías en las que se clasifican las obras literarias', 'grupos o categorías en las que se clasifican las obras literarias', 'una clase de obras literarias con sus propias reglas de forma'],
        pista: '<p>En inglés se escribe <span lang="en">genre</span>, y es la palabra que usan las bibliotecas para ordenar los libros.</p>',
        solucion: '<p>Es el <strong>género</strong> (<span lang="en">genre</span>): los grupos o categorías en los que se clasifican las obras literarias por su contenido y su estructura. Cada género tiene su forma y lo que el lector espera de él.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena las señales para saber si un texto es un cuento o una novela.</p>',
        respuesta: ['Mira si el texto está en verso o en prosa', 'Mira si dura tres páginas o doscientas', 'Mira si hay un solo clímax y un final cerrado', 'Decide si es cuento o novela y di qué espera el lector'],
        pista: '<p>Empieza por la forma del texto y termina con la decisión y con lo que espera el lector.</p>',
        solucion: '<p>El orden es: mira si el texto está en verso o en prosa, mira si dura tres páginas o doscientas, mira si hay un solo clímax y un final cerrado y, por último, decide si es cuento o novela y di qué espera el lector. La forma y la longitud van primero, porque el remate y el final cerrado ya te dicen casi todo.</p>' },
      { tipo: 'numero', enunciado: '<p>La tabla de esta lección presenta cinco géneros, y el ejemplo resuelto compara dos de ellos: el cuento y la novela. ¿Cuántos géneros de la tabla no se comparan en el ejemplo?</p>',
        respuesta: 5 - 2,
        pista: '<p>Los números son los de la tabla de esta lección. Cuenta los que quedan fuera.</p>',
        solucion: '<p>La tabla tiene 5 géneros y el ejemplo compara 2: 5 − 2 = <strong>3</strong>. Quedan la poesía, el drama y el ensayo.</p>' },
    ],
    fuentes: [CBC, CERVANTES, WIKI_GENERO, WIKI_NOVELA, WIKI_CUENTO],
  });

  // ------------------------------------------------------------------
  L('Elementos de la narración', {
    objetivo: 'Identificar quién cuenta la historia, quiénes participan y qué pasa, y entender cómo el narrador cambia lo que el lector sabe.',
    explicacion: `
      <p>La misma escena, contada dos veces. «Yo estaba en el pasillo cuando se apagó la luz». Y: «A las diez de la noche se apagó la luz del pasillo. Martín, que llevaba un rato contando las estrellas desde que perdió a su abuelo, oyó el zumbido de la luz y entendió que la noche se había acabado». La primera versión te deja a oscuras: no sabes por qué el personaje no se mueve. La segunda te deja con una pregunta: ¿por qué ese chico cuenta estrellas desde que perdió a su abuelo? Lo que cambia entre las dos no son los hechos, es quién los cuenta.</p>
      <p>En toda narración hay un <strong>narrador</strong> (<span lang="en">narrator</span>), unos <strong>personajes</strong> (<span lang="en">character</span>) y una <strong>trama</strong> (<span lang="en">plot</span>), y además un espacio y un tiempo donde pasan las cosas. Los personajes suelen ser el elemento central de los textos de ficción, dice Wikipedia en español (apoyo), y son una construcción mental hecha con palabras e imágenes: un personaje no es su nombre ni su descripción, es lo que hace y lo que quiere. Y la trama son los hechos en su orden y con su causa: otra entrada de Wikipedia en español (apoyo) explica que busca conexiones de causa entre los elementos de la narración y que siempre empieza con un problema, porque si no hay complicación no hay trama.</p>
      <h3>El narrador es lo que más cambia la lectura</h3>
      <p>Wikipedia en español (apoyo) define al narrador como la voz que cuenta y relata sucesos, historias o anécdotas. Y hay dos familias. El narrador en primera persona es un personaje dentro de la historia: actúa, juzga y tiene opiniones sobre los hechos y sobre los demás personajes. El narrador en tercera persona está fuera de la historia. Y dentro de este último están el narrador omnisciente, que conoce la historia a detalle, y el narrador testigo, que es un espectador del acontecer y asume la función de narrar.</p>
      <p>Esa distancia es un instrumento, no un defecto. Cuando el narrador es un personaje, el lector solo sabe lo que ese personaje sabe, y por eso no entiende por qué alguien hizo lo que hizo. Cuando el narrador lo sabe todo, el lector ve más que los personajes y por eso hay suspenso. Y lo que el narrador no dice, y a veces lo que ni siquiera piensa, es justo lo que el lector deduce, como ya se vio en "Inferencias: leer entre líneas".</p>
      <h3>La trama y su orden</h3>
      <p>Aristóteles definía la trama como el principio fundamental de la tragedia y formuló la teoría de la trama unificada, con planteamiento, nudo y desenlace, según cuenta Wikipedia en español (apoyo). Ese es el orden que se nota al leer: un problema que se complica, una escalada y un final. Y el género pesa aquí: en un cuento la trama es un solo hecho bien contado, mientras que en una novela hay una trama larga y muchas secundarias. En Argentina, al estudiar narrativa, el currículo trabaja el personaje, el lugar, el espacio, el orden, el punto de vista y el argumento.</p>
      ${ELEMENTOS}
      <p class="nota"><strong>Trampa común:</strong> creer que toda narración tiene un narrador. Wikipedia en español (apoyo) recuerda que el género dramático se caracteriza por el diálogo de los personajes y porque no aparece la figura del narrador: hay un género donde la voz que cuenta no existe, y los personajes hablan por sí mismos.</p>`,
    ejemplo: `
      <p>La escena del pasillo, dos veces.</p>
      <div class="nota texto-muestra"><p>«Yo estaba en el pasillo cuando se apagó la luz».</p></div>
      <div class="nota texto-muestra"><p>«A las diez de la noche se apagó la luz del pasillo. Martín, que contaba estrellas desde que perdió a su abuelo, oyó el zumbido y entendió que la noche se había acabado».</p></div>
      <ol class="pasos-ej">
        <li>Quién cuenta. En A cuenta un personaje, dentro de la historia; en B, alguien de fuera que sabe lo que le pasó a Martín.</li>
        <li>Personajes. En A no sabemos quién habla; en B sabemos que es Martín y lo que le pasó.</li>
        <li>Trama. Los hechos son los mismos: cambia el orden y la causa que enseña el narrador.</li>
        <li>Espacio y tiempo. En A no hay hora; en B, las diez de la noche en un pasillo.</li>
      </ol>
      <p>Resultado: <span class="resultado">la misma trama contada desde otro punto de vista enseña otra cosa</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que en la versión A el lector no entiende nada porque el texto es corto. No falta información: el narrador solo puede decir lo que sabe, y como es Martín, solo sabemos lo que sabe él.</p>`,
    vidaReal: `
      <p>Cuando alguien te cuenta algo, siempre hay un quién, un qué y un para qué:</p>
      <ul>
        <li>En un grupo de mensajes, el que cuenta lo que pasó no siempre es quien más sabe.</li>
        <li>En un chisme de la escuela, quien lo cuenta decide qué partes te enseña.</li>
        <li>En una película, el narrador puede ser uno de los personajes y la historia cambia entera.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Este es un texto inventado para la lección:</p><div class="nota texto-muestra"><p>Yo estaba en el pasillo cuando se apagó la luz.</p></div><p>¿Quién cuenta la historia?</p>',
        opciones: ['Un personaje que participa en la historia y solo sabe lo que sabe', 'Alguien de fuera de la historia que lo sabe todo', 'El autor del libro', 'Un narrador que no aparece nunca en el texto'],
        correcta: 0,
        pista: '<p>Fíjate en el «yo» y en lo poco que el texto dice.</p>',
        solucion: '<p>La primera: <strong>un personaje que participa en la historia</strong>. El «yo» delata al narrador en primera persona, y como solo cuenta lo que le pasa a él, el lector se queda sin saber casi nada.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un análisis dice que el protagonista se llama Martín, que perdió a su abuelo y que la escena ocurre en un pasillo de noche. ¿Qué elemento de la narración falta en ese análisis?</p>',
        opciones: ['La trama: los hechos y su orden', 'El espacio: dónde pasa', 'El narrador: la voz que cuenta', 'Los personajes: quiénes participan'],
        correcta: 2,
        pista: '<p>El análisis cuenta qué pasó, dónde y con quién, pero no dice quién lo cuenta.</p>',
        solucion: '<p>La tercera: <strong>el narrador</strong>. El análisis dice quién es Martín, qué le pasó, dónde y cuándo, pero no dice quién cuenta la historia. Sin eso no se sabe si el lector recibe toda la verdad o solo una parte.</p>' },
      { tipo: 'opciones', enunciado: '<p>En un cuento, el narrador es un personaje que solo sabe lo que le pasa a él. ¿Qué efecto tiene eso en quien lee?</p>',
        opciones: ['Que el lector lo sabe todo desde el principio', 'Que el lector se queda con dudas y tiene que deducir lo que no se dice', 'Que el texto no tiene trama', 'Que el lector no puede saber nunca qué va a pasar'],
        correcta: 1,
        pista: '<p>Piensa qué pasa cuando el narrador no puede contarte lo que hay más allá de su propia cabeza.</p>',
        solucion: '<p>La segunda: <strong>el lector se queda con dudas y deduce lo que no se dice</strong>. Como el narrador solo sabe lo suyo, lo que omite es justo lo que el lector tiene que sacar por su cuenta, como se vio en «Inferencias: leer entre líneas».</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué es el narrador de una historia? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['narrador', 'el narrador', 'un narrador', 'la voz que cuenta', 'la voz que cuenta la historia', 'la voz que cuenta y relata sucesos', 'narrator'],
        pista: '<p>En inglés se escribe <span lang="en">narrator</span>. Piensa en la voz que te cuenta algo.</p>',
        solucion: '<p>Es el <strong>narrador</strong> (<span lang="en">narrator</span>): la voz que cuenta y relata sucesos, historias o anécdotas. Puede ser un personaje de la historia o alguien que está fuera y lo sabe todo.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para analizar los elementos de una narración.</p>',
        respuesta: ['Busca quién cuenta la historia', 'Identifica a los personajes y lo que quieren', 'Reconstruye los hechos en orden y con su causa', 'Ubica el espacio y el tiempo', 'Mira qué es lo que el narrador no dice'],
        pista: '<p>Empieza por la voz y termina por lo que falta, que es justo lo que el lector deduce.</p>',
        solucion: '<p>El orden es: busca quién cuenta la historia, identifica a los personajes y lo que quieren, reconstruye los hechos en orden y con su causa, ubica el espacio y el tiempo y, por último, mira qué es lo que el narrador no dice. Ese último paso es el que convierte una lista de datos en una lectura completa.</p>' },
      { tipo: 'numero', enunciado: '<p>Una novela puede tener una trama principal y varias tramas secundarias. En la novela de ejemplo hay 1 trama principal y 3 tramas secundarias (las cifras son de ejemplo). ¿Cuántas tramas tiene en total?</p>',
        respuesta: 1 + 3,
        pista: '<p>Suma la trama principal y las secundarias.</p>',
        solucion: '<p>1 trama principal más 3 tramas secundarias son <strong>4 tramas</strong>. En un cuento, en cambio, la trama es un solo hecho bien contado, y por eso pesa más que las tramas secundarias.</p>' },
    ],
    fuentes: [CBC, WIKI_GENERO, WIKI_NARRADOR, WIKI_PERSONAJE, WIKI_TRAMA],
  });

  // ------------------------------------------------------------------
  L('Figuras retóricas', {
    objetivo: 'Reconocer las figuras retóricas más usadas y distinguir la metáfora de la comparación, que es lo que más se confunde.',
    explicacion: `
      <p>La misma idea se puede decir de tres maneras. «La sala estaba fría y a oscuras». «La sala estaba como una nevera». «La sala era una nevera». Las tres dicen lo mismo y, sin embargo, no se leen igual: la primera es un dato, la segunda acerca y la tercera convierte.</p>
      <p>Eso tiene un nombre: una <strong>figura retórica</strong> (<span lang="en">rhetorical device</span>). Wikipedia en español (apoyo) las llama figuras literarias y dice que también se conocen como recursos literarios, estilísticos, retóricos o expresivos: son formas no convencionales de usar las palabras, con particularidades fónicas, gramaticales o semánticas. Están en todas partes: en los anuncios, en las canciones, en los titulares y en las frases de la familia.</p>
      <p>Las dos que más se confunden son la <strong>metáfora</strong> (<span lang="en">metaphor</span>) y la <strong>comparación</strong> (<span lang="en">simile</span>). La metáfora se refiere directamente a una cosa mencionando otra: no dice que una se parezca a la otra, dice que <em>es</em> la otra. La comparación, en cambio, usa la semejanza y se apoya en palabras de relación como «como», «cual», «que» o «se asemeja a». Wikipedia en español (apoyo) lo pone con un ejemplo: «tus níveas manos son suaves como el terciopelo» es comparación, y «tus níveas manos son terciopelo» es metáfora. Los contenidos básicos comunes de Lengua del Ministerio de Educación de la Nación (Argentina, documento sin fecha de publicación) cuentan la comparación y la metáfora entre los recursos que se trabajan al leer poesía.</p>
      <h3>Para qué sirven las figuras</h3>
      <p>Para tres cosas muy concretas. Hacen concreta una idea abstracta: el miedo es como un frío en el estómago. Dan más fuerza a lo que dicen: estaba muerto de risa. Y hacen que el texto se te quede, porque una imagen se recuerda mejor que una explicación. Fíjate en lo que se pierde si las quitas: «la ciudad dormía» se vuelve «la ciudad estaba quieta y sin luces», y con eso desaparece todo lo que había detrás. Las figuras no son adorno: cambian lo que el texto te dice.</p>
      <h3>No toda exageración es una figura</h3>
      <p>Hay figuras con nombre para cada caso, y saber el nombre sirve. La hipérbole exagera a propósito las cantidades, las cualidades o las características, y no se interpreta de manera literal. La personificación atribuye propiedades humanas a un animal o a un objeto. El eufemismo sustituye con palabras inofensivas una expresión que puede ofender o sugerir algo no placentero, y a veces se usa para no reconocer una realidad cruda. Y la alegoría, según la Academia de Poetas Americanos (Estados Unidos, en inglés), es una representación con un significado de fondo, un mensaje moral o una significación política: funciona como la metáfora, comparando una cosa con otra muy distinta, pero además esconde un mensaje. Decir lo contrario de lo que quieres decir, para que el otro entienda justo lo contrario, es la ironía.</p>
      ${TRES}
      <h3>Las cinco, lado a lado</h3>
      <div class="tabla-wrap"><table>
        <thead><tr><th>La figura</th><th>Cómo se reconoce</th><th>Un ejemplo</th><th>Qué efecto produce</th></tr></thead>
        <tbody>
          <tr><th scope="row">Metáfora</th><td>Dice que una cosa es otra, sin palabras de relación</td><td>«La sala era una nevera»</td><td>Convierte y da una imagen que pega</td></tr>
          <tr><th scope="row">Comparación</th><td>Dice que una cosa se parece a otra, con «como» o un verbo de semejanza</td><td>«La sala estaba como una nevera»</td><td>Acerca sin convertir</td></tr>
          <tr><th scope="row">Hipérbole</th><td>Exagera a propósito una cantidad o una cualidad</td><td>«Estaba muerto de risa»</td><td>Da más fuerza a lo que dice</td></tr>
          <tr><th scope="row">Personificación</th><td>Atribuye a un animal o a un objeto algo humano</td><td>«La ciudad dormía»</td><td>Humaniza y hace más vivo</td></tr>
          <tr><th scope="row">Eufemismo</th><td>Sustituye una palabra que puede ofender por otra inofensiva</td><td>«Pasó a mejor vida» por «murió»</td><td>Suaviza lo desagradable</td></tr>
        </tbody>
      </table></div>
      <p>Y una comprobación que sirve siempre: cambia la figura por su versión literal y mira qué se pierde. Si al cambiar «la sala era una nevera» por «la sala estaba como una nevera» el texto suena menos fuerte, tenías una metáfora. Si al cambiarlo no cambia nada, no había ninguna figura.</p>`,
    ejemplo: `
      <p>Tres maneras de decir lo mismo. El texto inventado para esta lección es una frase sobre una sala a oscuras.</p>
      <div class="nota texto-muestra"><p>«La sala estaba fría y a oscuras».</p></div>
      <div class="nota texto-muestra"><p>«La sala estaba como una nevera».</p></div>
      <div class="nota texto-muestra"><p>«La sala era una nevera».</p></div>
      <ol class="pasos-ej">
        <li>La versión literal dice exactamente lo que pasó, y por eso dice poco. Es el punto de partida.</li>
        <li>En la comparación, la sala se parece a una nevera y el «como» hace de puente. Ahora el frío se siente.</li>
        <li>En la metáfora ya no hay puente: la sala es la nevera. La frase pega más porque no deja lugar a mirar.</li>
        <li>Comprueba el cambio: «estaba como una nevera» deja la sala como estaba; «era una nevera» la convierte. La diferencia no es de tamaño, es de forma.</li>
      </ol>
      <p>Resultado: <span class="resultado">las tres dicen lo mismo, pero la metáfora pega más que la comparación</span>.</p>
      <p class="nota"><strong>Error común:</strong> llamar metáfora a cualquier frase con «como». «La sala estaba como una nevera» es comparación; si quitas el «como» y dices «la sala era una nevera», ya es metáfora.</p>`,
    vidaReal: `
      <p>Las frases que oyes todos los días casi nunca son planas, y casi nunca te das cuenta de que son figuras:</p>
      <ul>
        <li>En un anuncio: una crema que «se deshace sola» en la boca.</li>
        <li>En un titular: un partido que «se decide en los últimos minutos».</li>
        <li>En un mensaje de la familia: «estaba muerto de risa».</li>
        <li>En casa, un día de invierno: «la calle estaba como una nevera».</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Lee la frase: «La ciudad dormía». ¿Qué figura retórica usa?</p>',
        opciones: ['Personificación, porque se le da a la ciudad una acción humana', 'Hipérbole, porque exagera lo que pasa en la ciudad', 'Eufemismo, porque suaviza lo que ocurre', 'Comparación, porque la ciudad se parece a alguien que duerme'],
        correcta: 0,
        pista: '<p>Pregúntate si lo que se dice de la ciudad es propio de las personas.</p>',
        solucion: '<p>La primera: <strong>personificación</strong>. Dormir es de los seres humanos, y al atribuírselo a la ciudad, la ciudad se vuelve viva. No hay exageración ni palabras de relación: lo que hay es un atributo humano aplicado a una ciudad.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas dos frases es una metáfora?</p>',
        opciones: ['La sala estaba como una nevera', 'La sala era una nevera', 'Las dos son metáforas', 'Ninguna de las dos: las dos son comparaciones'],
        correcta: 1,
        pista: '<p>Una de las dos tiene una palabra de relación; la otra no.</p>',
        solucion: '<p>La segunda: <strong>La sala era una nevera</strong>. No hay «como» ni ningún verbo de semejanza, así que la sala no se parece a la nevera: es una nevera. La primera sí lleva «como», y por eso es una comparación.</p>' },
      { tipo: 'opciones', enunciado: '<p>Alguien dice: «Estaba muerto de risa». ¿Qué figura es y qué efecto produce?</p>',
        opciones: ['Es una metáfora, y su efecto es convertir a alguien en un cadáver', 'Es una personificación, y su efecto es hacer que la risa tenga un cuerpo', 'Es una hipérbole, y su efecto es dar más fuerza a lo que dice', 'Es un eufemismo, y su efecto es suavizar la situación'],
        correcta: 2,
        pista: '<p>Fíjate si lo que se dice es una exageración que no hay que creerse literalmente.</p>',
        solucion: '<p>La tercera: <strong>es una hipérbole</strong>, porque exagera a propósito y no se interpreta de manera literal. Su efecto es dar más fuerza: nadie se muere de risa, y todos entendemos que se rio muchísimo.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué es una metáfora? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['metáfora', 'la metáfora', 'una metáfora', 'metaphor', 'decir que una cosa es otra', 'una figura que dice que una cosa es otra', 'la figura que dice que una cosa es otra', 'una figura que dice que una cosa es otra sin decir como'],
        pista: '<p>En inglés se escribe <span lang="en">metaphor</span>, y es la figura en la que una cosa se dice que es otra.</p>',
        solucion: '<p>Es la <strong>metáfora</strong> (<span lang="en">metaphor</span>): una figura que se refiere directamente a una cosa mencionando otra, sin palabras de relación. La sala deja de ser una sala parecida a una nevera y pasa a ser una nevera.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para reconocer una figura retórica en una frase.</p>',
        respuesta: ['Mira primero qué dice la frase de manera literal', 'Busca si hay una palabra de relación como «como» o «se parece a»', 'Comprueba si una cosa se está diciendo que es otra', 'Piensa qué efecto produce la frase en quien la lee'],
        pista: '<p>Empieza por lo literal y termina por el efecto: ese es el orden en que se reconoce una figura.</p>',
        solucion: '<p>El orden es: mira primero qué dice la frase de manera literal, busca si hay una palabra de relación, comprueba si una cosa se está diciendo que es otra y, por último, piensa qué efecto produce. Si al final no hay ningún efecto, no hay figura.</p>' },
      { tipo: 'numero', enunciado: '<p>La tabla de esta lección presenta cinco figuras, y el ejemplo resuelto usa dos: la metáfora y la comparación. ¿Cuántas figuras de la tabla no se usan en el ejemplo?</p>',
        respuesta: 5 - 2,
        pista: '<p>Los números son los de la tabla de esta lección. Cuenta las que quedan fuera.</p>',
        solucion: '<p>La tabla tiene 5 figuras y el ejemplo usa 2: 5 − 2 = <strong>3</strong>. Quedan la hipérbole, la personificación y el eufemismo.</p>' },
    ],
    fuentes: [CBC, WIKI_FIGURA, WIKI_METAFORA, WIKI_SIMIL, WIKI_HIPERBOLE, WIKI_PERSONIFICACION, WIKI_EUFEMISMO, POETS_ALLEGORY],
  });
  // ------------------------------------------------------------------
  L('Poesía', {
    objetivo: 'Reconocer los versos, las estrofas y las rimas de un poema, y aprender a leer un poema en voz alta para entenderlo mejor.',
    explicacion: `
      <p>Un poema se lee con la boca, no con los ojos. Leído en silencio parece un acertijo; leído en voz alta entiendes de qué va. En Estados Unidos, la Academia de Poetas Americanos (en inglés) recuerda que la poesía precede a la prosa en todas las literaturas. La poesía junta la forma y el sonido, y el sonido solo se oye en voz alta.</p>
      <p>La forma del poema la marcan tres palabras. La primera es el <strong>verso</strong> (<span lang="en">line</span>): cada línea de un poema. La segunda es la <strong>estrofa</strong> (<span lang="en">stanza</span>): el grupo de versos que se leen juntos. Y la tercera es la <strong>rima</strong> (<span lang="en">rhyme</span>): la coincidencia de sonidos al final de dos o más versos. Wikipedia en español (apoyo) lo explica así: la rima es la repetición de una secuencia de sonidos que empieza en la sílaba tónica al final del verso.</p>
      <h3>El soneto del ejemplo</h3>
      <p>El poema de ejemplo es un soneto de Rubén Darío (Nicaragua), «Caupolicán», publicado en Azul... en 1888 y hoy en dominio público. Wikipedia en español (apoyo) define el soneto como catorce versos en dos cuartetos y dos tercetos, y avisa de que en los sonetos modernistas se usaron también ABAB:ABAB. Cada verso lleva entre paréntesis la letra de su rima: los que tienen la misma letra riman.</p>
      <div class="nota texto-muestra">
        <p>Algo formidable que vió la vieja raza: <em>(A)</em><br>
        robusto tronco de árbol al hombro de un campeón <em>(B)</em><br>
        salvaje y aguerrido, cuya fornida maza <em>(A)</em><br>
        blandiera el brazo de Hércules, o el brazo de Sansón. <em>(B)</em></p>
        <p>Por casco sus cabellos, su pecho por coraza, <em>(C)</em><br>
        pudiera tal guerrero, de Arauco en la región, <em>(D)</em><br>
        lancero de los bosques, Nenrod que todo caza, <em>(C)</em><br>
        desjarretar un toro, o estrangular un león. <em>(D)</em></p>
        <p>Anduvo, anduvo, anduvo. Le vió la luz del día, <em>(E)</em><br>
        le vió la tarde pálida, le vió la noche fría, <em>(E)</em><br>
        y siempre el tronco de árbol a cuestas del titán. <em>(F)</em></p>
        <p>«&#161;El Toqui, el Toqui!&#161;» clama la conmovida casta. <em>(G)</em><br>
        Anduvo, anduvo, anduvo. La Aurora dijo: «Basta», <em>(G)</em><br>
        e irguióse la alta frente del gran Caupolicán. <em>(H)</em></p>
      </div>
      ${SONETO}
      <h3>Por qué se lee dos veces</h3>
      <p>La primera lectura es para oír: te fijas en dónde caen las rimas y en cómo va el ritmo. La segunda es para entender: como ya sabes por dónde va el poema, lo entiendes mucho más rápido. Y hay una razón: un poema es un texto corto y denso, y usa imágenes en vez de explicaciones. Reconocer esas imágenes es lo que viste en "Figuras retóricas". Lo que el poema no dice, lo deduces, como en "Inferencias: leer entre líneas".</p>
      <p>En Argentina, el currículo de CBC de Lengua del Ministerio de Educación de la Nación (documento sin fecha de publicación) trabaja en poesía el ritmo, la rima, la estrofa, la comparación y la metáfora: forma y significado van juntos.</p>
      <h3>Un poema más corto</h3>
      <p>El «Romance de la luna, luna» de Federico García Lorca (España, 1928) funciona igual: alterna versos que se repiten, como «Huye luna, luna, luna», con versos que hacen avanzar la historia. La luna entra en la fragua vestida como una señora y el niño la mira sin dejar de mirar.</p>
      <div class="nota texto-muestra">
        <p>La luna vino a la fragua con su polisón de nardos.<br>
        El niño la mira, mira. El niño la está mirando.</p>
      </div>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Lo que ves</th><th>Lo que suena</th><th>Qué palabra buscar</th><th>Qué efecto tiene</th></tr></thead>
        <tbody>
          <tr><th scope="row">Un verso</th><td>«Anduvo, anduvo, anduvo»</td><td>«Anduvo»</td><td>marca el ritmo</td></tr>
          <tr><th scope="row">Una estrofa</th><td>cuatro o tres versos</td><td>la letra de la rima</td><td>el poema se parte en trozos</td></tr>
          <tr><th scope="row">Una rima</th><td>«raza» y «maza»</td><td>la última palabra</td><td>dos versos cierran igual</td></tr>
          <tr><th scope="row">Una imagen</th><td>«robusto tronco de árbol»</td><td>«tronco»</td><td>el poema dice sin explicar</td></tr>
        </tbody>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> creer que todo lo que está en verso es poesía. Wikipedia en español (apoyo) la define como una manifestación de la belleza o del sentimiento estético por medio de la palabra: lo que hace un poema es lo que hace con las palabras.</p>`,
    ejemplo: `
      <p>Vamos a leer «Caupolicán» en cuatro pasos.</p>
      <ol class="pasos-ej">
        <li>Primero, en voz alta, marcando dónde caen las rimas. Al llegar a «Anduvo, anduvo, anduvo» notas que la repetición empuja el poema, y que en los tercetos la rima se afloja.</li>
        <li>Segundo, di de qué va en una frase: Caupolicán, el toqui (el jefe) de Arauco, avanza sin descanso hasta que la Aurora le dice basta.</li>
        <li>Tercero, busca la imagen: «robusto tronco de árbol al hombro de un campeón». Caupolicán no es un árbol: es una metáfora, y dice que era fuerte y que todos lo veían venir.</li>
        <li>Cuarto, di qué te deja: la imagen de un hombre tan grande que no se puede detener, y un final en el que el amanecer le dice basta.</li>
      </ol>
      <p>Resultado: <span class="resultado">el poema se entiende mucho mejor la segunda vez</span>.</p>
      <p class="nota"><strong>Error común:</strong> leer el poema una sola vez y en silencio, y quedarse con la sensación de que no dice nada. Es el mismo texto, pero los versos y las rimas solo se oyen cuando los dices.</p>`,
    vidaReal: `
      <p>La poesía aparece en sitios muy normales:</p>
      <ul>
        <li>En las canciones que escuchas: muchas llevan líneas que se repiten y que aprendes de memoria sin darte cuenta.</li>
        <li>En las tarjetas de cumpleaños y en los carteles del colegio: hay poemas muy cortos escondidos.</li>
        <li>En el recite y en la clase de literatura: leer en voz alta es la mejor manera de entender un poema.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Lee este fragmento del «Romance de la luna, luna» de Federico García Lorca (España, 1928):</p><div class="nota texto-muestra"><p>La luna vino a la fragua con su polisón de nardos.</p></div><p>¿Qué figura retórica usa?</p>',
        opciones: ['Una comparación: la luna se parece a una señora que va a la fragua', 'Una personificación: la luna va vestida y hace cosas de persona', 'Una hipérbole: la luna es mucho más grande que la fragua', 'Una ironía: la luna no puede estar en la fragua'],
        correcta: 1,
        pista: '<p>Pregúntate si lo que hace la luna es propio de las personas.</p>',
        solucion: '<p>La segunda: <strong>una personificación</strong>. La luna «vino» y llegó «vestida» con un polisón de nardos, y eso es hacer cosas de persona. Ya lo viste en "Figuras retóricas".</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué esquema de rima tienen los dos primeros versos del soneto «Caupolicán»?</p>',
        opciones: ['AABB: el primero rima con el segundo y el tercero con el cuarto', 'AAAA: los cuatro versos terminan con el mismo sonido', 'ABAB: el primero rima con el tercero y el segundo con el cuarto', 'ABBA: el primero rima con el cuarto y el segundo con el tercero'],
        correcta: 2,
        pista: '<p>Mira las letras que lleva cada verso en el poema y qué palabras terminan en cada uno.</p>',
        solucion: '<p>La tercera: <strong>ABAB</strong>. El primer verso termina en «raza» y el tercero en «maza», que riman; el segundo termina en «campeón» y el cuarto en «Sansón», que también riman. Wikipedia en español (apoyo) llama verso rimado al que rima con la palabra final de al menos otro verso, y avisa de que en los sonetos modernistas se usaron también combinaciones como ABAB:ABAB.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué es una estrofa? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['estrofa', 'la estrofa', 'una estrofa', 'stanza', 'grupo de versos', 'un grupo de versos', 'grupo de versos unidos por una serie de criterios fijos de extensión, rima y ritmo', 'un grupo de versos unidos por una serie de criterios fijos de extensión, rima y ritmo', 'la agrupación de versos que se leen juntos'],
        pista: '<p>En inglés se escribe <span lang="en">stanza</span>, y es la palabra que usan las antologías de poesía.</p>',
        solucion: '<p>Es la <strong>estrofa</strong> (<span lang="en">stanza</span>): el grupo de versos que se leen juntos. En Estados Unidos, la Academia de Poetas Americanos (en inglés) la define como la unidad principal de un poema y la compara con el párrafo de la prosa, pero más discontinua y más insistente. En métrica española, Wikipedia en español (apoyo) la define como un grupo de versos unidos por una serie de criterios fijos de extensión, rima y ritmo, y dice que según su número de versos las estrofas reciben nombres distintos.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para leer un poema.</p>',
        respuesta: ['Léelo en voz alta una primera vez, solo para oír', 'Marca dónde caen las rimas y fíjate en el ritmo', 'Léelo otra vez en voz alta, ahora para entender', 'Di de qué va el poema en una frase', 'Busca la imagen que usa y di qué efecto tiene'],
        pista: '<p>Empieza por los oídos y termina por la imagen.</p>',
        solucion: '<p>El orden es: léelo en voz alta una primera vez solo para oír, marca dónde caen las rimas y fíjate en el ritmo, léelo otra vez en voz alta ahora para entender, di de qué va el poema en una frase y, por último, busca la imagen que usa y di qué efecto tiene. En Estados Unidos, la Academia de Poetas Americanos (en inglés) recuerda que el verso lleva el significado de una línea a la siguiente: por eso la segunda lectura, la que ya sabe por dónde va, entiende mucho más.</p>' },
      { tipo: 'numero', enunciado: '<p>El soneto «Caupolicán», de Rubén Darío (1888), ¿cuántos versos tiene en total? Un cuarteto tiene 4 versos y un terceto tiene 3.</p>', respuesta: 4 + 4 + 3 + 3,
        pista: '<p>Es un soneto: dos cuartetos y dos tercetos.</p>',
        solucion: '<p>Dos cuartetos y dos tercetos: 4 + 4 + 3 + 3 = <strong>14 versos</strong>. Wikipedia en español (apoyo) define el soneto como una composición de catorce versos de arte mayor.</p>' },
      { tipo: 'numero', enunciado: '<p>El soneto «Caupolicán» se puede leer en dos cuartetos y dos tercetos. ¿Cuántas estrofas tiene en total?</p>', respuesta: 2 + 2,
        pista: '<p>Suma los dos cuartetos y los dos tercetos.</p>',
        solucion: '<p>2 cuartetos + 2 tercetos = <strong>4 estrofas</strong>. Cada estrofa es un grupo de versos que se leen juntos, y este poema entero se lee en cuatro.</p>' },
    ],
    fuentes: [CBC, WIKI_POESIA, POETS_POETRY, POETS_LINE, POETS_STANZA, WIKI_VERSO, WIKI_ESTROFA, WIKI_RIMA, WIKI_SONETO, WIKISOURCE_CAUPOLICAN, WIKISOURCE_DARIO, WIKISOURCE_LUNA],
  });

  // ------------------------------------------------------------------
  L('Teatro', {
    objetivo: 'Reconocer el acto, el diálogo y las acotaciones en el texto de una obra de teatro, y entender lo que un personaje insinúa sin decirlo.',
    explicacion: `
      <p>En un escenario no hay párrafos. Hay personajes que hablan y, entre paréntesis, lo que hace el cuerpo. «Marta entra y cierra la puerta» y «Marta entra, mira a su hermano y cierra la puerta despacio» son dos textos muy distintos: la diferencia está solo en el paréntesis. Eso no es un adorno: es la mitad de la información.</p>
      <p>El texto de una obra se lee por partes. La primera es el <strong>acto</strong> (<span lang="en">act</span>): cada una de las grandes partes de una obra. Wikipedia en español (apoyo) lo define como cada una de las partes principales en las que se divide una obra escénica, y añade que cada acto suele estar compuesto por escenas, la unidad de acción más pequeña. En el teatro del Siglo de Oro, en España, los actos se llamaban jornadas, y su número se fijó en tres.</p>
      <p>El segundo término es el <strong>diálogo</strong> (<span lang="en">dialogue</span>): lo que dicen los personajes entre ellos. Wikipedia en español (apoyo) recuerda que las obras dramáticas se escriben en diálogos y con las acciones entre paréntesis, que es lo que se llama lenguaje de acotaciones. Y el tercero es la <strong>acotación</strong> (<span lang="en">stage direction</span>): la indicación de lo que pasa en escena y de cómo lo hacen, que no se dice en voz alta. La misma fuente de apoyo explica qué cabe en una acotación: cómo es el escenario, qué hay en él, qué hacen los personajes y con qué entonación.</p>
      <p>Hay además una cuarta cosa, casi nunca escrita: el subtexto. Es lo que el personaje insinúa y no termina de decir, el contenido por debajo del diálogo hablado. Se deduce, como en "Inferencias: leer entre líneas". Al lado del diálogo está el monólogo: la parte de la obra en la que solo habla un personaje y explica en voz alta sus pensamientos.</p>
      <p>Para ver una acotación de verdad, nada mejor que La Celestina. En España, La Celestina es el nombre con el que se popularizó la Tragicomedia de Calisto y Melibea, y la Biblioteca Virtual Miguel de Cervantes guarda el texto; su primera edición impresa, en Burgos en 1499, tenía dieciséis actos, y la de Toledo, en 1500, veintiún. En Wikisource, el índice de ediciones arranca con la de 1599. En la edición de 1913, el primer acto abre con un argumento, un párrafo que resume lo que ocurre. Y entre sus líneas hay acotaciones: «Cierra la ventana e dexa la tiniebla acompañar al triste y al desdichado la ceguedad». Ahí no hay diálogo: hay una acción, y esa acción cambia la escena entera.</p>
      <p>Y un aviso: el texto de una obra es un guion, no la obra entera. Wikipedia en español (apoyo) lo dice así: el texto no agota el hecho teatral, porque una obra dramática no es teatro hasta que se representa. En el escenario pasan la voz, el cuerpo y el ritmo, y el mismo guion se puede representar de mil maneras: leer teatro es como ver la obra con los ojos cerrados.</p>
      <p>En Argentina, el currículo de CBC de Lengua del Ministerio de Educación de la Nación (documento sin fecha de publicación) trabaja en teatro el personaje, el diálogo, el conflicto teatral, la acotación, el texto y la representación, la ambientación y la escenografía.</p>
      ${TEATRO}
      <div class="tabla-wrap"><table>
        <thead><tr><th>El elemento</th><th>Qué es</th><th>Qué te aporta al leer</th></tr></thead>
        <tbody>
          <tr><th scope="row">Acto</th><td>Cada una de las partes principales de la obra</td><td>En qué parte grande estás</td></tr>
          <tr><th scope="row">Escena</th><td>La unidad de acción más pequeña</td><td>Dónde empieza y termina un trozo</td></tr>
          <tr><th scope="row">Entrada y salida</th><td>La parte en que entran o salen los personajes</td><td>Cuándo cambia el reparto</td></tr>
          <tr><th scope="row">Diálogo</th><td>Lo que dicen los personajes entre ellos</td><td>Las palabras y lo que se calla</td></tr>
          <tr><th scope="row">Acotación</th><td>Lo que pasa en escena, entre paréntesis</td><td>El lugar, la hora, los gestos y el tono</td></tr>
        </tbody>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> leer solo los diálogos y saltar las acotaciones. Justamente las acotaciones son la mitad de la información, y sin ellas el diálogo queda vacío.</p>`,
    ejemplo: `
      <p>Esta escena es inventada para la lección: no está en ninguna obra. Sirve para ver las tres piezas.</p>
      <div class="nota texto-muestra">
        <p>(Marta entra y cierra la puerta. Es de noche.)<br>
        MARTA.- Buenas noches, hermano.<br>
        JORGE.- ¿Cómo está mamá?<br>
        (Marta lo mira y no contesta.)<br>
        MARTA.- Está mejor.<br>
        JORGE.- El médico dice que la vemos el mes que viene.<br>
        (Marta se sienta despacio, con una bolsa en la mano.)<br>
        MARTA.- Entonces la visitamos el mes que viene.</p>
      </div>
      <ol class="pasos-ej">
        <li>Lo que se dice: el diálogo. Aquí hablan de la madre y del médico.</li>
        <li>Lo que se hace: las tres acotaciones. La primera dice dónde y cuándo es todo: Marta entra, cierra la puerta y es de noche. Las otras dos dicen qué hace el cuerpo.</li>
        <li>Lo que no se dice: el subtexto. Marta lo mira y no contesta, y llega con una bolsa en la mano. Eso no está en ninguna frase, y por eso la escena tiene un doble fondo.</li>
      </ol>
      <p>Resultado: <span class="resultado">si el autor hubiera dejado solo el diálogo, se perdería la mitad de la escena</span>.</p>`,
    vidaReal: `
      <p>El teatro se te va a aparecer en más sitios de los que parece:</p>
      <ul>
        <li>En el aula: cuando lees en voz alta un diálogo, estás probando cómo suena antes de que lo diga un actor.</li>
        <li>En el guion de una serie de televisión: muchas escenas llevan entre paréntesis lo que hace el cuerpo, igual que en el teatro.</li>
        <li>En los mensajes: cuando alguien escribe «(jeje)», está haciendo lo mismo que una acotación.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué es una acotación?</p>',
        opciones: ['Lo que dicen los personajes cuando hablan entre ellos', 'La indicación de lo que pasa en escena y de cómo lo hacen, que no se dice en voz alta', 'El resumen de un acto, como el que abre los actos de La Celestina', 'La lista de los personajes que están en escena'],
        correcta: 1,
        pista: '<p>Fíjate en lo que va entre paréntesis en el texto de una obra.</p>',
        solucion: '<p>La segunda: <strong>la acotación</strong> (<span lang="en">stage direction</span>). Es la indicación de lo que pasa en escena y de cómo lo hacen, y no se dice en voz alta. Wikipedia en español (apoyo) añade que el autor explica en ella cómo es el escenario, qué hay en él, cómo son los personajes, qué acciones realizan y con qué entonación pronuncian las palabras.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué aporta al leer una acotación?</p>',
        opciones: ['Nada: es un adorno para los actores', 'El resumen de todo lo que va a pasar en la obra', 'La mitad de la información: dónde está cada personaje, qué hace y con qué tono', 'La lista de los personajes que entran en cada escena'],
        correcta: 2,
        pista: '<p>Compara «Marta entra y cierra la puerta» con «Marta entra, mira a su hermano y cierra la puerta despacio».</p>',
        solucion: '<p>La tercera: <strong>la mitad de la información</strong>. La acotación dice dónde y cuándo es la escena, qué hacen los cuerpos y con qué entonación hablan, y sin ella el diálogo queda vacío.</p>' },
      { tipo: 'opciones', enunciado: '<p>En la escena de ejemplo, Marta entra con una bolsa en la mano, mira a su hermano y no contesta. ¿Qué es eso?</p>',
        opciones: ['El subtexto: lo que el personaje insinúa y no termina de decir', 'Un error de la acotación, porque las acotaciones no cuentan historias', 'Un monólogo: la parte en la que solo habla un personaje', 'El resumen del argumento del acto'],
        correcta: 0,
        pista: '<p>Piensa en lo que el lector sabe al terminar la escena y los personajes no dijeron.</p>',
        solucion: '<p>La primera: <strong>el subtexto</strong>. Es el contenido que no se anuncia de manera expresa por los personajes, el contenido por debajo del diálogo hablado, y el lector lo deduce. Un monólogo es otra cosa: la parte en la que solo habla un personaje y explica en voz alta sus pensamientos.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué es una acotación? Escribe el nombre del concepto o su definición.</p>',
        respuestas: ['acotación', 'la acotación', 'una acotación', 'stage direction', 'indicación de lo que pasa en escena', 'la indicación de lo que pasa en escena', 'indicación de lo que pasa en escena y de cómo lo hacen', 'la indicación de lo que pasa en escena y de cómo lo hacen'],
        pista: '<p>En inglés se escribe <span lang="en">stage direction</span>, y es lo que va entre paréntesis en el texto de una obra.</p>',
        solucion: '<p>Es la <strong>acotación</strong> (<span lang="en">stage direction</span>): la indicación de lo que pasa en escena y de cómo lo hacen, que no se dice en voz alta. Wikipedia en español (apoyo) dice que son las indicaciones que hace el autor para que lleguen al director y a los actores sobre la puesta en escena.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena la estructura de una obra de teatro.</p>',
        respuesta: ['La obra se divide en actos', 'Cada acto se divide en escenas', 'Cada escena se divide en entradas y salidas', 'En cada escena los personajes hablan en diálogo y sus acciones van en acotaciones'],
        pista: '<p>Empieza por lo más grande y termina por lo que pasa dentro de la escena.</p>',
        solucion: '<p>El orden es: la obra se divide en actos, cada acto se divide en escenas, cada escena se divide en entradas y salidas y, en cada escena, los personajes hablan en diálogo y sus acciones van en acotaciones. En el teatro del Siglo de Oro, en España, los actos se llamaban jornadas.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas acotaciones, es decir, indicaciones entre paréntesis, tiene la escena de ejemplo de esta lección?</p>', respuesta: 3,
        pista: '<p>Cuenta solo los textos que van entre paréntesis, no las líneas de diálogo.</p>',
        solucion: '<p>Son <strong>3 acotaciones</strong>: la entrada con la puerta, la mirada sin respuesta y la bolsa en la mano. Las líneas que empiezan por «MARTA.-» o por «JORGE.-» son diálogo, no acotaciones.</p>' },
    ],
    fuentes: [CBC, WIKI_TEATRO, WIKI_ACTO, WIKI_ESCENA, WIKI_DIALOGO, WIKI_SUBTEXTO, WIKI_JORNADA, WIKI_CELESTINA, CERVANTES_CELESTINA, WIKISOURCE_CELESTINA_EDICIONES, WIKISOURCE_CELESTINA_1913],
  });
})();
