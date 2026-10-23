// Ofimática · Unidad 4: Presentaciones.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// La unidad se escribe en dos fragmentos: el 1 (lecciones 1 y 2) y el 2 (lecciones 3 y 4).
// Cada fragmento añade sus lecciones al final del archivo, antes del cierre, y nunca reescribe lo anterior.
// Programa de referencia: LibreOffice Impress. Primero el concepto genérico (diapositiva, plantilla, notas) y después
// el nombre del comando. La unidad no tiene cifras con país: las cifras de los ejemplos son de ejemplo y se dicen.
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('ofimatica', titulo, datos);
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
  // Caja con el texto centrado: (x, y) es el centro.
  const caja = (x, y, w, h, texto, relleno = false) => [
    { tipo: 'poligono', puntos: [[x - w / 2, y - h / 2], [x + w / 2, y - h / 2], [x + w / 2, y + h / 2], [x - w / 2, y + h / 2]], relleno },
    txt(x, y, texto),
  ];

  // La ayuda oficial de LibreOffice está en inglés; el texto plano de cada página vive en su repositorio oficial.
  const LO = (nombre, url) => ({ nombre: `LibreOffice (en inglés), Help: ${nombre}`, url });
  const W3C = (nombre, url) => ({ nombre: `W3C, WCAG 2.2 (en inglés): ${nombre}`, url });

  // ------------------------------------------------------------------
  // Las zonas fijas de una diapositiva: título, cuerpo, márgenes y una esquina libre.
  const ZONAS = diagrama([0, 14], [0, 7.4], [
    // Marco de la diapositiva (2,1.6) a (12,6.4): banda del título arriba y zona del cuerpo debajo.
    { tipo: 'poligono', puntos: [[2, 5.4], [12, 5.4], [12, 6.4], [2, 6.4]] },
    txt(7, 5.9, 'Título'),
    { tipo: 'linea', desde: [2, 1.6], hasta: [12, 1.6] }, { tipo: 'linea', desde: [2, 1.6], hasta: [2, 6.4] },
    { tipo: 'linea', desde: [12, 1.6], hasta: [12, 6.4] },
    txt(5.2, 3.4, 'Cuerpo'),
    // Esquina libre, marcada con líneas punteadas y sin adornos.
    { tipo: 'linea', desde: [8.2, 1.9], hasta: [12, 1.9], punteada: true }, { tipo: 'linea', desde: [8.2, 3.3], hasta: [12, 3.3], punteada: true },
    { tipo: 'linea', desde: [8.2, 1.9], hasta: [8.2, 3.3], punteada: true },
    txt(10.1, 2.6, 'Zona libre'),
    txt(1.0, 4.4, 'Margen'), txt(13.2, 4.4, 'Margen'),
    txt(7, 0.9, 'El título arriba, el cuerpo debajo'),
    txt(7, 0.35, 'y los márgenes a los dos lados, con una esquina libre'),
  ], 'Diagrama de una diapositiva con sus zonas rotuladas. Arriba va un recuadro donde se lee Título. Debajo queda el cuerpo, y en su esquina inferior derecha hay un cuadro que dice Zona libre. A la izquierda y a la derecha del rectángulo, fuera de él, aparece la palabra Margen. Debajo, el rótulo El título arriba, el cuerpo debajo, y la frase y los márgenes a los dos lados, con una esquina libre.');

  // ------------------------------------------------------------------
  // La misma idea en tres versiones: párrafo, tres frases y palabras clave.
  const RECORTES = diagrama([0, 15], [0, 5.4], [
    // Primera tarjeta: un párrafo denso, dibujado como líneas de texto seguidas.
    { tipo: 'linea', desde: [0.5, 4.9], hasta: [4.3, 4.9] }, { tipo: 'linea', desde: [0.5, 1.9], hasta: [0.5, 4.9] }, { tipo: 'linea', desde: [4.3, 1.9], hasta: [4.3, 4.9] }, { tipo: 'linea', desde: [0.5, 1.9], hasta: [4.3, 1.9] },
    { tipo: 'linea', desde: [0.7, 4.55], hasta: [4.1, 4.55] }, { tipo: 'linea', desde: [0.7, 4.0], hasta: [4.1, 4.0] },
    { tipo: 'linea', desde: [0.7, 3.45], hasta: [4.1, 3.45] }, { tipo: 'linea', desde: [0.7, 2.9], hasta: [4.1, 2.9] },
    { tipo: 'linea', desde: [0.7, 2.45], hasta: [3.5, 2.45] },
    // Segunda tarjeta: tres viñetas, una por frase corta.
    { tipo: 'linea', desde: [5.6, 4.9], hasta: [9.4, 4.9] }, { tipo: 'linea', desde: [5.6, 1.9], hasta: [5.6, 4.9] }, { tipo: 'linea', desde: [9.4, 1.9], hasta: [9.4, 4.9] },
    { tipo: 'circulo', x: 5.95, y: 4.3, r: 0.07 }, { tipo: 'linea', desde: [6.2, 4.3], hasta: [9.1, 4.3] },
    { tipo: 'circulo', x: 5.95, y: 3.4, r: 0.07 }, { tipo: 'linea', desde: [6.2, 3.4], hasta: [9.1, 3.4] },
    { tipo: 'circulo', x: 5.95, y: 2.5, r: 0.07 }, { tipo: 'linea', desde: [6.2, 2.5], hasta: [8.4, 2.5] },
    // Tercera tarjeta: las palabras clave, una por línea.
    { tipo: 'linea', desde: [10.7, 4.9], hasta: [14.5, 4.9] }, { tipo: 'linea', desde: [10.7, 1.9], hasta: [10.7, 4.9] }, { tipo: 'linea', desde: [14.5, 1.9], hasta: [14.5, 4.9] },
    txt(12.6, 4.3, 'Lluvia récord'), txt(12.6, 3.4, 'Cosecha doble'), txt(12.6, 2.5, 'Precio bajo'),
    ...flecha([4.5, 3.4], [5.35, 3.4], 0, 0.8),
    ...flecha([9.6, 3.4], [10.45, 3.4], 0, 0.8),
    txt(2.4, 1.35, 'Párrafo: 90 palabras'), txt(7.5, 1.35, 'Tres frases cortas'), txt(12.6, 1.35, 'Seis palabras clave'),
    txt(7.5, 0.45, 'La misma idea, cada vez con menos texto'),
  ], 'Diagrama de tres tarjetas en fila, unidas por dos flechas que van de izquierda a derecha. La primera tarjeta contiene un bloque denso de líneas seguidas, que representan un párrafo de 90 palabras; la cifra es de ejemplo. La segunda contiene tres viñetas con una línea cada una, las tres frases cortas. La tercera contiene tres rótulos de dos palabras cada uno: Lluvia récord, Cosecha doble y Precio bajo; en total, seis palabras. Debajo de cada tarjeta va su nombre, y al pie está el rótulo La misma idea, cada vez con menos texto.');

  // ------------------------------------------------------------------
  L('Diseño de diapositivas', {
    objetivo: 'Reconocer las zonas fijas de una diapositiva, usar una plantilla para que todas queden coherentes y comprobar que el texto se lee por su contraste y su tamaño.',
    vidaReal: `
      <p>Las ideas de un trabajo de clase, de un negocio o de un club se cuentan muchas veces frente a otras personas, y apoyarlas con unas cuantas pantallas ordenadas ayuda a que te entiendan. Cuando lo que se ve queda claro y sin adornos, la audiencia se queda con lo importante y no con el desorden. Aquí aprenderás qué lleva cada pantalla, dónde va cada cosa y qué conviene comprobar antes de mostrar nada a nadie.</p>`,
    explicacion: `
      <p>Imagina dos presentaciones con las mismas ideas y el mismo tiempo. En la primera, cada pantalla se entiende de un vistazo: el título está siempre en el mismo sitio, la letra es la misma en todas y los colores no cansan la vista. En la segunda, los títulos saltan de un lado a otro y el fondo se pelea con el texto. Quien mira la segunda tiene que adivinar dónde está la información. El contenido es el mismo, y lo que cambia es la distribución.</p>
      <p>Una presentación es una secuencia de pantallas, y cada pantalla es una <strong>diapositiva</strong> (<span lang="en">slide</span>). Fíjate en que la diapositiva tiene zonas fijas, como una hoja de cuaderno bien aprovechada: el título arriba, el cuerpo debajo y un margen libre hacia los lados, con una esquina que conviene dejar sin nada. Cuando el título aparece siempre en el mismo lugar y el cuerpo siempre debajo, la vista sabe dónde buscar sin pensarlo dos veces, y no tiene que reaprender en cada diapositiva.</p>
      <h3>La plantilla: la distribución que se hereda</h3>
      <p>Esa distribución no se consigue colocando cada diapositiva a mano: se hereda de una sola vez. La herramienta que la fija es la <strong>plantilla</strong> (<span lang="en">template</span>), el modelo de diseño que define la letra, los colores y las posiciones. En LibreOffice Impress se elige en la lista de diapositivas maestras de la barra lateral de Propiedades: cada diapositiva tiene exactamente una diapositiva maestra, y esa hoja determina el formato del título y el fondo de todas las diapositivas que la usan. Un archivo puede traer varias maestras, y se elige la de la lista; cambiar una cambia de golpe todas las diapositivas que la usan.</p>
      ${ZONAS}
      <div class="tabla-wrap"><table>
        <thead><tr><th>Elemento</th><th>Regla</th><th>Por qué</th></tr></thead>
        <tbody>
          <tr><th scope="row">Título</th><td>Arriba, en el mismo sitio</td><td>La vista no lo busca en cada pantalla</td></tr>
          <tr><th scope="row">Cuerpo</th><td>Debajo del título</td><td>Sigue el orden de lectura</td></tr>
          <tr><th scope="row">Letra</th><td>La misma en todas</td><td>El cambio constante distrae</td></tr>
          <tr><th scope="row">Colores</th><td>Dos o tres, siempre los mismos</td><td>Los pocos muestran lo que importa</td></tr>
          <tr><th scope="row">Márgenes</th><td>Borde libre a los cuatro lados</td><td>El contenido no se corta al proyectar</td></tr>
          <tr><th scope="row">Tamaño</th><td>Medida predefinida, elegida al empezar</td><td>Todas comparten la proporción</td></tr>
        </tbody>
      </table></div>
      <h3>El contraste que hace legible el texto</h3>
      <p>De las reglas de legibilidad, la que más se incumple es el <strong>contraste</strong> (<span lang="en">contrast</span>), la diferencia de claridad entre el texto y el fondo que lo hace legible. La receta práctica es emparejar un texto oscuro con un fondo claro, o al revés, cuidando que la diferencia entre los dos colores sea marcada, y las guías de accesibilidad del W3C lo piden en números: una relación mínima de 4,5 a 1 entre el texto y el fondo. Un gris claro sobre blanco se ve fino en el monitor y desaparece en el proyector, así que la prueba es bajar el zoom hasta ver la diapositiva pequeña: si el texto se distingue ahí, se distinguirá en la sala.</p>
      <h3>La letra, el espacio y el tamaño</h3>
      <p>Esa prueba de la vista pequeña sirve para otra regla de la sala: la letra tiene que verse desde el fondo del local, y un tamaño cómodo frente al monitor suele quedar chico en una pantalla proyectada. Que la letra sea grande trae un efecto curioso: deja sitio para poco texto, que es justo lo que aquí se busca. Y el espacio vacío no es espacio desperdiciado: es lo que deja que los ojos encuentren el título y el cuerpo sin rodeos.</p>
      <p>Solo falta fijar el tamaño de la presentación, que se elige una vez en las propiedades de la diapositiva entre las medidas predefinidas: el formato ancho llena una pantalla ancha sin bandas oscuras, y para imprimir manda la proporción del papel.</p>
      <p class="nota"><strong>Trampa común:</strong> decorar cada diapositiva a mano, con el título en un sitio distinto y una letra nueva en cada una. Al llegar la décima diapositiva, ninguna cuadra ya con ninguna, y arreglarlo a mano cuesta más que heredar la distribución desde la plantilla.</p>`,
    ejemplo: `
      <p>Monta una presentación de ciencias con tres diapositivas; los datos del tema son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>En la barra lateral de Propiedades, elige una plantilla de la lista de diapositivas maestras: la letra, los colores y las posiciones vienen de ahí.</li>
        <li>Fíjate en dónde queda el título: arriba y en el mismo sitio. Escribe el de la primera diapositiva sin moverlo de su caja.</li>
        <li>Escribe el cuerpo debajo, en la caja de texto de la plantilla, sin agregar cajas extra para rellenar.</li>
        <li>Revisa la pareja de colores: texto oscuro sobre fondo claro, o al revés, con la diferencia marcada.</li>
        <li>Baja el zoom y mira la diapositiva pequeña: si el texto se distingue ahí, sirve para la sala.</li>
        <li>Duplica la diapositiva para la siguiente idea, o elige el mismo diseño en la barra de Presentación, y repite la distribución en las tres.</li>
      </ol>
      <p>Resultado: <span class="resultado">tres diapositivas con el mismo orden y el mismo contraste</span>.</p>
      <p class="nota"><strong>Error común:</strong> mover el título de sitio en la segunda diapositiva para variar. El orden manda en todas: la variación va en el contenido, no en las posiciones.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué hace la plantilla en una presentación?</p>',
        opciones: ['Decide el orden en que se proyectan las diapositivas', 'Escribe los títulos de cada diapositiva por ti', 'Fija la letra, los colores y las posiciones de todas las diapositivas de una vez', 'Cuenta cuántas diapositivas debe tener el archivo'], correcta: 2,
        pista: '<p>Es el modelo de diseño del que todas las pantallas heredan su distribución.</p>',
        solucion: '<p>La plantilla fija la letra, los colores y las posiciones de una sola vez, porque vive en la diapositiva maestra que todas comparten. Cambiar ahí corrige de una vez todas las diapositivas que la usan.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué mide el contraste entre el texto y su fondo?</p>',
        opciones: ['Cuántos colores se usan en la diapositiva', 'El tamaño de la letra, contado en puntos', 'La distancia entre el proyector y la pantalla', 'La diferencia de claridad entre los dos, la que hace legible el texto'], correcta: 3,
        pista: '<p>Piensa por qué un gris claro sobre blanco cuesta leer aún con una letra grande.</p>',
        solucion: '<p>El contraste es la diferencia de claridad entre el texto y el fondo. Las guías de accesibilidad del W3C lo piden con una relación mínima de 4,5 a 1 para que el texto sea legible.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve dejar espacio vacío en una diapositiva?</p>',
        opciones: ['Para que los ojos encuentren sin rodeos el título y el cuerpo', 'Para poder agregar más texto después, sin apuro', 'Para que la presentación se vea moderna y actual', 'Para que la diapositiva se vea más llena y completa'], correcta: 1,
        pista: '<p>Fíjate en cómo te orientas en una página con aire alrededor del contenido.</p>',
        solucion: '<p>El espacio vacío da aire y deja que la vista encuentre el título y el cuerpo sin rodeos. Es un hueco a propósito, no un sitio disponible para más contenido.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama cada pantalla de una presentación?</p>',
        respuestas: ['diapositiva', 'la diapositiva', 'slide'],
        pista: '<p>Es la unidad que compone la presentación; el programa las muestra en miniatura en un panel.</p>',
        solucion: '<p>Se llama diapositiva (slide en inglés). La presentación entera es la secuencia de diapositivas que se proyectan una tras otra.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para dejar coherente un conjunto de diapositivas.</p>',
        respuesta: ['Elegir una plantilla de la lista de diapositivas maestras', 'Comprobar que el título queda arriba y en el mismo sitio', 'Escribir el cuerpo debajo, en la caja de texto de la plantilla', 'Revisar que el texto se distinga del fondo por su claridad', 'Duplicar la diapositiva o elegir el mismo diseño para la siguiente'],
        pista: '<p>Primero el modelo que hereda todo, después el contenido y las comprobaciones de legibilidad.</p>',
        solucion: '<p>El orden es elegir la plantilla, colocar el título y el cuerpo, revisar el contraste y repetir la misma distribución en la diapositiva siguiente. La coherencia sale de heredar el diseño, no de retocar cada pantalla.</p>' },
      { tipo: 'numero', enunciado: '<p>El diagrama de la lección rotula las zonas de una diapositiva: título, cuerpo, márgenes a los dos lados y una zona libre. ¿Cuántas clases de zona distingue el diagrama?</p>', respuesta: 3 + 1,
        pista: '<p>Cuenta los rótulos del diagrama y agrupa los dos márgenes, que son la misma clase de zona.</p>',
        solucion: '<p>Son <strong>4</strong> clases: título, cuerpo, margen y zona libre. Los márgenes van a los dos lados, pero son una sola clase de zona.</p>' },
    ],
    fuentes: [
      LO('Changing and Adding a Master Slide', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/simpress/guide/masterpage.xhp'),
      LO('Slide Properties Sidebar', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/simpress/01/sidebarslidebackground.xhp'),
      LO('Layout', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/simpress/01/05130000.xhp'),
      W3C('Understanding Success Criterion 1.4.3: Contrast (Minimum)', 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html'),
    ],
  });

  // ------------------------------------------------------------------
  L('Menos texto, más ideas', {
    objetivo: 'Armar un guion para decidir qué va en la presentación, dejar una idea por diapositiva con pocas palabras y llevar lo que sobra a las notas del orador.',
    vidaReal: `
      <p>Presentas un tema en clase o en el trabajo y cada diapositiva llega llena de párrafos. Tu público deja de escucharte para leer, y a los dos minutos va por la sexta pantalla mientras tú sigues en la primera. Aquí aprenderás a decidir qué se queda en cada pantalla y a dónde va lo que sobra, para que la gente te escuche a ti y no se pierda en la proyección.</p>`,
    explicacion: `
      <p>Imagina que abres una diapositiva y te recibe un párrafo de nueve líneas, como el del ejemplo. El público dejó de escucharte en la primera línea: está leyendo. Cuando termina, va por delante de tu charla y tu voz se vuelve ruido de fondo. La pregunta no es cómo escribir más, sino qué dejar en la pantalla y a dónde va lo demás.</p>
      <p>La primera diferencia es clara: una diapositiva no es un documento. Un documento se lee solo y con calma, y su lector vuelve sobre un párrafo cuando quiere. La diapositiva acompaña a una persona que está hablando en voz alta delante de ella, y si lleva todo el texto completo, el público lee en lugar de escuchar.</p>
      <h3>Primero el guion, después el programa</h3>
      <p>La solución empieza antes de abrir el programa. La lista ordenada que decide qué ideas entran y en qué orden se llama <strong>guion</strong> (<span lang="en">outline</span>), y se arma en papel o en un texto aparte, una idea por línea. Si una idea no cabe en la lista, tampoco cabe en la presentación. Luego el programa respeta ese orden: en LibreOffice Impress, la vista de esquema muestra la secuencia de títulos y deja mover una diapositiva a otra posición.</p>
      <p>Con el guion a la vista, cada diapositiva se arma alrededor de un <strong>punto clave</strong> (<span lang="en">key point</span>), la única idea que el público debe llevarse de esa pantalla. El título suele decirla y el cuerpo la acompaña con frases cortas o palabras sueltas, nunca con párrafos. Si el cuerpo necesita tres ideas, hay tres diapositivas en una: mejor repartirlas.</p>
      <h3>El texto que sobra va a las notas</h3>
      <p>Lo que se recorta no se tira: se guarda. El texto completo de la idea va a las <strong>notas del orador</strong> (<span lang="en">speaker notes</span>), el apunte que solo ves tú mientras presentas y que se escribe en la vista de notas del programa. Al proyectar, LibreOffice Impress ayuda con la consola del presentador, que muestra vistas distintas para ti y para el público: en tu pantalla están la diapositiva actual, la que sigue y las notas, mientras el público solo ve las diapositivas.</p>
      ${RECORTES}
      <div class="tabla-wrap"><table>
        <thead><tr><th>Qué sobra</th><th>A dónde va</th><th>Ejemplo</th></tr></thead>
        <tbody>
          <tr><th scope="row">La frase que solo abre</th><td>Fuera, sin reemplazo</td><td>«A continuación veremos»</td></tr>
          <tr><th scope="row">Lo que repite la idea</th><td>Las notas del orador</td><td>El segundo párrafo que dice lo mismo</td></tr>
          <tr><th scope="row">La enumeración larga</th><td>Tres elementos</td><td>De doce viñetas a las tres que importan</td></tr>
          <tr><th scope="row">La tabla de doce filas</th><td>El número, en grande</td><td>«40 %», una línea sola y grande</td></tr>
          <tr><th scope="row">El ejemplo largo</th><td>Las notas del orador</td><td>La explicación completa, de tu lado</td></tr>
        </tbody>
      </table></div>
      <h3>Los recortes que casi siempre sirven</h3>
      <p>Hay tres cortes que resuelven la mayoría de las pantallas cargadas. El primero es quitar la frase que solo sirve de introducción, porque «en esta diapositiva veremos» no aporta nada que el título ya diga. El segundo es convertir la enumeración larga en tres elementos, que se cuentan de un vistazo. El tercero es dejar los números importantes solos y en grande, en lugar de meterlos en una tabla que nadie lee de lejos. Después de cortar, una última comprobación lo cierra: si la diapositiva se entiende sin ti, sobra texto; si no se entiende ni contigo, falta claridad, y toca corregir la frase.</p>
      <p>Cortar la diapositiva es, además, el mismo trabajo que el resumen que enseña Lectura en «Hacer un resumen»: decidir qué se conserva y qué se suelta. Encontrar la idea que se queda es lo que practica «Idea principal e ideas secundarias», y ordenar qué va delante y qué queda de respaldo lo manda «Estructura de un texto». Con presentaciones largas, las diapositivas se agrupan en secciones, bloques lógicos, como los capítulos de un libro.</p>
      <p class="nota"><strong>Trampa común:</strong> borrar sin decidir, hasta que las diapositivas quedan en frases troceadas que no dicen nada. El recorte sale del guion: cada palabra que se va tiene una razón, y las notas guardan lo que la pantalla suelta.</p>`,
    ejemplo: `
      <p>La diapositiva de la cosecha lleva un párrafo de 90 palabras; las cifras son de ejemplo. Hay que dejarla legible de un vistazo.</p>
      <ol class="pasos-ej">
        <li>Lee el párrafo y marca la idea que se queda: llovió más que nunca y la cosecha se dobló.</li>
        <li>Tacha lo que repite la idea y la frase de introducción: salen 60 de las 90 palabras.</li>
        <li>Arma tres frases cortas: «Llovió sin parar», «La cosecha se dobló», «El precio del maíz bajó». Son 12 palabras.</li>
        <li>Corta cada frase a la mitad y deja solo las palabras clave: «Lluvia récord», «Cosecha doble», «Precio bajo». La diapositiva queda con 6.</li>
        <li>Pega el párrafo completo en las notas del orador, que no se proyectan.</li>
        <li>Revisa el título: que diga la idea («La cosecha se dobló») y no el tema («Agricultura»).</li>
      </ol>
      <p>Resultado: <span class="resultado">seis palabras en la diapositiva y las 90 a salvo en las notas</span>.</p>
      <p class="nota"><strong>Error común:</strong> pegar el párrafo completo en la diapositiva por si acaso. Con el texto entero a la vista, el recorte no sirve: el público lee en lugar de escucharte.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Recortaste la diapositiva y el material que quitaste todavía vale: son los detalles que sostienen la idea. ¿Dónde lo escribes?</p>',
        opciones: ['Dentro de la misma diapositiva, en letra más pequeña', 'En las notas del orador, que el público no ve', 'En la plantilla, para que salga en todas las diapositivas', 'En un documento aparte, porque las notas no aceptan texto'], correcta: 1,
        pista: '<p>Es el texto que solo ves tú mientras presentas.</p>',
        solucion: '<p>Lo recortado va a las notas del orador, que no se proyectan. Al presentar, la consola del presentador te las muestra en tu pantalla mientras el público solo ve las diapositivas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es el punto clave de una diapositiva?</p>',
        opciones: ['La primera frase del párrafo, tal como estaba', 'La palabra más repetida del texto', 'La única idea que el público debe llevarse de esa pantalla', 'La viñeta que ocupa más espacio en el cuerpo'], correcta: 2,
        pista: '<p>Es la respuesta a la pregunta qué debe quedarse el público de esta pantalla.</p>',
        solucion: '<p>El punto clave es la única idea que el público debe llevarse de la diapositiva. El título suele decirla y el cuerpo la acompaña con pocas palabras.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una diapositiva lleva un párrafo entero. ¿Qué pasa mientras el público lo lee?</p>',
        opciones: ['Lee y deja de escuchar la explicación', 'Confirma que la presentación está completa y bien hecha', 'Deja el párrafo para después y sigue pendiente de tu voz', 'Nada, porque el párrafo es solo material del orador'], correcta: 0,
        pista: '<p>Piensa en qué se pone tu propia atención cuando una pantalla llena de texto aparece frente a ti.</p>',
        solucion: '<p>El público lee y deja de escuchar, porque la lectura y la escucha van por el mismo canal. Por eso el párrafo va a las notas y la pantalla se queda con las palabras clave.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la lista ordenada de ideas que decide qué diapositivas van y en qué orden, antes de abrir el programa?</p>',
        respuestas: ['guion', 'el guion', 'outline'],
        pista: '<p>Es la lista con la idea de la presentación, una por línea, armada en papel o en un texto aparte.</p>',
        solucion: '<p>Se llama guion (outline en inglés). Conviene armarlo antes de abrir el programa: si una idea no cabe en la lista, tampoco cabe en la presentación.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para recortar un párrafo hasta dejar una diapositiva legible.</p>',
        respuesta: ['Leer el párrafo y marcar la idea que se queda', 'Tachar lo que repite la idea y la frase que solo sirve de introducción', 'Armar dos o tres frases cortas con lo que queda', 'Cortar cada frase hasta dejar solo sus palabras clave', 'Pasar el texto completo a las notas del orador'],
        pista: '<p>Primero decide, después tacha, después comprime y al final guarda lo que sobró.</p>',
        solucion: '<p>El orden es marcar la idea, tachar lo que repite, armar frases cortas, dejar las palabras clave y llevar el texto completo a las notas. Si se empieza por borrar sin decidir, la diapositiva queda troceada y sin sentido.</p>' },
      { tipo: 'numero', enunciado: '<p>Tras los tachones, el párrafo del ejemplo quedó en 12 palabras repartidas en tres frases cortas. Cuando cada frase se corta a la mitad para dejar solo sus palabras clave, ¿cuántas palabras tiene la diapositiva final?</p>', respuesta: 12 / 2,
        pista: '<p>Toma la mitad de las 12 palabras que quedaron tras las frases cortas.</p>',
        solucion: '<p>La mitad de 12 es <strong>6</strong>: dos palabras por cada una de las tres frases. En el ejemplo del tema quedan «Lluvia récord», «Cosecha doble» y «Precio bajo».</p>' },
    ],
    fuentes: [
      LO('Using the Presenter Console', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/simpress/guide/presenter_console.xhp'),
      LO('Changing the Slide Order', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/simpress/guide/arrange_slides.xhp'),
      LO('Presentation sections', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/simpress/guide/sections.xhp'),
    ],
  });

  // Wikipedia en español, como apoyo (nunca como única fuente de un dato).
  const WIKI = (nombre, url) => ({ nombre: `Wikipedia: ${nombre}`, url });

  // ------------------------------------------------------------------
  // La misma foto colocada de tres formas: estirada, recortada y escalada con la proporción sujeta.
  const IMAGEN = diagrama([0, 14.4], [0, 5.6], [
    // Primera tarjeta: la foto arrastrada de una esquina sin Mayús; el sol sale aplastado y el monte ancho.
    { tipo: 'linea', desde: [0.6, 2.1], hasta: [5.3, 2.1] }, { tipo: 'linea', desde: [5.3, 2.1], hasta: [5.3, 4.3] },
    { tipo: 'linea', desde: [5.3, 4.3], hasta: [0.6, 4.3] }, { tipo: 'linea', desde: [0.6, 4.3], hasta: [0.6, 2.1] },
    { tipo: 'poligono', puntos: [[2.45, 3.7], [2.375, 3.835], [2.175, 3.935], [1.9, 3.97], [1.625, 3.935], [1.425, 3.835], [1.35, 3.7], [1.425, 3.565], [1.625, 3.465], [1.9, 3.43], [2.175, 3.465], [2.375, 3.565]] },
    { tipo: 'poligono', puntos: [[2.8, 2.45], [3.85, 3.05], [4.9, 2.45]] },
    // Segunda tarjeta: la foto recortada; lo que sobra arriba queda fuera, marcado con líneas punteadas.
    { tipo: 'linea', desde: [5.9, 2.1], hasta: [9.5, 2.1] }, { tipo: 'linea', desde: [9.5, 2.1], hasta: [9.5, 4.3] },
    { tipo: 'linea', desde: [9.5, 4.3], hasta: [5.9, 4.3] }, { tipo: 'linea', desde: [5.9, 4.3], hasta: [5.9, 2.1] },
    { tipo: 'poligono', puntos: [[5.9, 5.0], [9.5, 5.0], [9.5, 4.3], [5.9, 4.3]], abierto: false, punteado: false },
    { tipo: 'linea', desde: [5.9, 4.3], hasta: [9.5, 4.3], punteada: true },
    { tipo: 'linea', desde: [5.9, 4.3], hasta: [5.9, 5.0], punteada: true },
    { tipo: 'linea', desde: [9.5, 4.3], hasta: [9.5, 5.0], punteada: true },
    { tipo: 'linea', desde: [5.9, 5.0], hasta: [9.5, 5.0], punteada: true },
    txt(7.7, 4.65, 'Se quita'),
    { tipo: 'circulo', x: 7.0, y: 3.6, r: 0.28 },
    { tipo: 'poligono', puntos: [[7.95, 2.45], [8.7, 3.75], [9.4, 2.45]] },
    // Tercera tarjeta: la foto escalada con Mayús; proporción intacta, tamaño más pequeño.
    { tipo: 'linea', desde: [11.0, 2.4], hasta: [13.4, 2.4] }, { tipo: 'linea', desde: [13.4, 2.4], hasta: [13.4, 4.0] },
    { tipo: 'linea', desde: [13.4, 4.0], hasta: [11.0, 4.0] }, { tipo: 'linea', desde: [11.0, 4.0], hasta: [11.0, 2.4] },
    { tipo: 'circulo', x: 11.9, y: 3.5, r: 0.22 },
    { tipo: 'poligono', puntos: [[12.35, 2.65], [12.9, 3.55], [13.35, 2.65]] },
    txt(2.95, 1.6, 'Estirada: se deforma'),
    txt(7.7, 1.6, 'Recortada'),
    txt(12.1, 1.6, 'Escalada con Mayús'),
    txt(7.2, 0.7, 'La misma foto (900 × 600) en tres colocaciones'),
  ], 'Diagrama de tres recuadros en fila con la misma foto de 900 por 600 píxeles, colocada de tres formas; los números son de ejemplo. En el primero, la foto se estiró arrastrando una esquina sin mantener la proporción: el recuadro queda más ancho y lo que había dentro se ve aplastado. En el segundo, la foto se recortó: un sector punteado por encima del recuadro está marcado con el rótulo Se quita, y el resto conserva la forma natural del sol y de la montaña. En el tercero, la foto es más pequeña pero sin deformarse, porque se escaló con la proporción sujeta. Debajo de cada recuadro va su nombre: Estirada, se deforma; Recortada; y Escalada con Mayús. Al pie está el rótulo La misma foto en tres colocaciones.');

  // ------------------------------------------------------------------
  L('Imágenes y gráficos en presentaciones', {
    objetivo: 'Elegir imágenes y gráficos que se vean en la sala, colocarlos sin deformarlos y describirlos por escrito para que cualquiera pueda leerlos.',
    vidaReal: `
      <p>Cuando expones un tema, una buena imagen te ahorra medio minuto de explicación: la foto del lugar que describes o el dibujo que muestra la comparación que llevas detrás de tus palabras. Una imagen borrosa o un gráfico que nadie entiende hacen lo contrario: mientras el público descifra la pantalla, deja de escucharte. Aquí aprenderás a elegir imágenes que se vean bien proyectadas, a colocarlas sin deformarlas y a armar gráficos que se leen desde el fondo de la sala.</p>`,
    explicacion: `
      <p>Imagina que llega tu turno de exponer. El proyector muestra la primera diapositiva y la foto que en tu pantalla se veía bien ocupa ahora toda la pared, enorme y hecha de cuadritos; a un lado, un gráfico con doce líneas que nadie distingue desde su silla. La pregunta es cómo elegir imágenes y gráficos, y cómo ponerlos para que se lean desde la última fila.</p>
      <p>Una imagen en una diapositiva tiene un trabajo: apoyar con algo visible la idea que estás contando. Si su única función es rellenar el hueco, compite con tu voz; si no aporta a la idea, se quita.</p>
      <h3>Los dos números que arruinan una imagen</h3>
      <p>Un programa describe una imagen con dos números: cuántos píxeles (los cuadritos de color) tiene de ancho y cuántos de alto. A esa cantidad se le llama <strong>resolución</strong> (<span lang="en">resolution</span>), y decide si la foto se ve nítida al agrandarla: una foto chica, estirada hasta llenar la pantalla, sale pixelada, y en el proyector, mucho más grande que tu monitor, los cuadritos se notan. La prueba es encender el proyector algunos minutos antes, con la diapositiva abierta, y mirar la foto al tamaño final.</p>
      <p>El otro número es la <strong>relación de aspecto</strong> (<span lang="en">aspect ratio</span>), la proporción entre el ancho y el alto de la imagen. Si arrastras una esquina para agrandar la foto y la proporción cambia, la imagen se deforma: las caras salen alargadas o aplastadas. Las salidas son recortar lo que sobra o escalarla sin deformarla; en LibreOffice Impress, arrastrar el identificador de la imagen con la tecla Mayús presionada conserva la proporción.</p>
      ${IMAGEN}
      <h3>De dónde viene la imagen</h3>
      <p>Antes de colocarla viene otra pregunta: de dónde salió. Hay imágenes que cualquiera puede usar, como las de dominio público, sobre las que ya nadie reclama derechos, y las de licencias libres, que se comparten con permiso para usos determinados; otras tienen derechos y usarlas sin permiso es un problema. La regla práctica de esta lección es comprobar la licencia antes de usar la imagen, dar el crédito que pida y no presentar como propia la fotografía de otra persona.</p>
      <h3>El texto alternativo: describir lo que se ve</h3>
      <p>Falta un dato pequeño y valioso: el <strong>texto alternativo</strong> (<span lang="en">alt text</span>), el equivalente por escrito de una imagen, una frase que dice lo que se ve. Lo lee en voz alta un lector de pantalla, para quien no puede ver las imágenes, y te respalda a ti cuando una imagen no carga. El W3C lo recomienda para toda imagen con contenido, y ese campo está en las propiedades de la imagen.</p>
      <h3>El gráfico: un mensaje por dibujo</h3>
      <p>Con los gráficos pasa lo mismo: un mensaje por gráfico. El tipo se elige según la pregunta: el asistente de gráficos de LibreOffice Impress pide primero el tipo, entre Columnas, Barras, Pastel y otros, y después los elementos, como el título y las etiquetas, que dejan que el dibujo se entienda solo. Los adornos en tres dimensiones van fuera.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Tipo de gráfico</th><th>Pregunta que responde</th><th>Cuándo no usarlo</th></tr></thead>
        <tbody>
          <tr><th scope="row">Columnas</th><td>Comparar cantidades entre categorías</td><td>Para una evolución en el tiempo, que se lee mejor con líneas</td></tr>
          <tr><th scope="row">Líneas</th><td>Ver la evolución: qué sube y qué baja</td><td>Con muchas líneas cruzadas que la sala no distingue</td></tr>
          <tr><th scope="row">Pastel</th><td>Mostrar las partes de un total</td><td>Con muchas partes, o parecidas, que nadie logra distinguir</td></tr>
        </tbody>
      </table></div>
      <p>El gráfico, además, se arma con datos: la tabla que lo alimenta la viste en «Gráficos» y la lectura de cada tipo, en «Gráficas: barras, pastel e histogramas» de Matemáticas. Qué cuenta un dibujo ajeno es de «Leer gráficas e infografías», y las licencias, de «Diseño, foto, audio y video libres».</p>
      <p class="nota"><strong>Trampa común:</strong> rellenar el hueco con una imagen decorativa que no dice nada de tu idea. La imagen no es un adorno de pared: si su única labor es ocupar sitio, aporta cero y roba atención a tu explicación.</p>`,
    ejemplo: `
      <p>La diapositiva del proyecto lleva una foto deformada y una tabla de doce filas; los datos son de ejemplo. Hay que arreglarla antes de presentar.</p>
      <ol class="pasos-ej">
        <li>La colocación dejó la foto en 900 por 400, cuando la original es de 900 por 600: está estirada.</li>
        <li>Corrígelo: devuélvele su proporción original y redúcela con la tecla Mayús presionada, que la mantiene. La foto queda en 480 por 320 y se ve nítida.</li>
        <li>Recorta lo que sobra: el cielo no apoya a la idea y sale del encuadre.</li>
        <li>Escribe el texto alternativo en la descripción de la imagen: «Bote de remos en el río con la ciudad al fondo», de ejemplo.</li>
        <li>Sustituye la tabla de doce filas por un gráfico de columnas con las cuatro cifras clave, con su título y la fuente del dato abajo.</li>
      </ol>
      <p>Resultado: <span class="resultado">una foto recta y un gráfico que se lee desde la última fila</span>.</p>
      <p class="nota"><strong>Error común:</strong> agrandar la foto arrastrando la esquina sin Mayús para que llene el hueco. La deformación se ve en la sala, cuando ya no hay tiempo de arreglarla.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué pasa si agrandas una foto arrastrando su esquina sin mantener la proporción?</p>',
        opciones: ['La foto gana detalle y nitidez al ocupar más espacio', 'La foto se estira y se deforma: los elementos salen alargados o aplastados', 'El programa avisa y corrige la proporción solo', 'Nada, porque las fotos se pueden agrandar siempre'], correcta: 1,
        pista: '<p>Piensa qué le pasa a un círculo cuando lo arrastras de un solo lado.</p>',
        solucion: '<p>La imagen se estira y se deforma, porque cambia su relación de aspecto. Para agrandar sin deformar se escala con la tecla Mayús presionada o se recorta.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué describe el texto alternativo de una imagen?</p>',
        opciones: ['El nombre del archivo de la foto', 'La licencia o el permiso de uso', 'La cámara con la que se tomó la foto', 'Lo que se ve en la imagen, por escrito, para quien no puede verla'], correcta: 3,
        pista: '<p>Piensa en qué necesita saber alguien que escucha la diapositiva sin poder mirarla.</p>',
        solucion: '<p>Es el equivalente por escrito de la imagen: una frase que dice lo que se ve. Lo lee un lector de pantalla, y también ayuda cuando la imagen no carga.</p>' },
      { tipo: 'opciones', enunciado: '<p>Quieres mostrar cómo llovió mes a mes durante un año. ¿Qué gráfico lo muestra mejor?</p>',
        opciones: ['Un pastel con doce sectores, uno por mes', 'Una tabla con las doce cifras', 'Una línea', 'Unas columnas con el total de cada año'], correcta: 2,
        pista: '<p>La pregunta es de evolución: qué sube y qué baja en el tiempo.</p>',
        solucion: '<p>Una evolución en el tiempo se lee mejor con líneas, porque el ojo recorre la subida y la bajada de un tirón. El pastel es para las partes de un total.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la relación entre el ancho y el alto de una imagen?</p>',
        respuestas: ['relacion de aspecto', 'la relacion de aspecto', 'aspect ratio', 'el aspect ratio'],
        pista: '<p>Es lo que se conserva al escalar con la tecla Mayús presionada, y lo que cambia cuando la imagen se deforma.</p>',
        solucion: '<p>Se llama relación de aspecto (aspect ratio en inglés). Si cambia al agrandar, la imagen se estira y se deforma.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para colocar bien una imagen en una diapositiva.</p>',
        respuesta: ['Elegir una imagen con una licencia que permita usarla, y anotar el crédito si lo pide', 'Comprobar que su resolución alcanza para el tamaño en que la vas a mostrar', 'Colocarla en la diapositiva y ajustar su tamaño con la tecla Mayús presionada', 'Recortar lo que no apoya a la idea', 'Escribir el texto alternativo que dice qué se ve'],
        pista: '<p>Primero el permiso, después el tamaño y la colocación, y al final el recorte y el texto alternativo.</p>',
        solucion: '<p>El orden es comprobar la licencia, comprobar la resolución, escalar sin deformar, recortar lo que sobra y escribir el texto alternativo. Lo último es lo que casi siempre se olvida, y es lo que le sirve al público que no puede ver la pantalla.</p>' },
      { tipo: 'numero', enunciado: '<p>Una imagen con proporción 16:9 mide 720 píxeles de alto. ¿Cuántos píxeles mide de ancho?</p>', respuesta: 720 * 16 / 9,
        pista: '<p>La proporción dice que el ancho es 16/9 del alto.</p>',
        solucion: '<p>Con la proporción 16 a 9, el ancho es 720 × 16 ÷ 9 = <strong>1 280</strong> píxeles. Si lo estiraras a más de eso sin mantener la proporción, la imagen se deformaría.</p>' },
    ],
    fuentes: [
      LO('Editing Graphic Objects', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/shared/guide/insert_graphic_drawit.xhp'),
      LO('Chart Wizard - Chart Type', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/schart/01/wiz_chart_type.xhp'),
      LO('Chart Wizard - Chart Elements', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/schart/01/wiz_chart_elements.xhp'),
      W3C('An alt Decision Tree', 'https://www.w3.org/WAI/tutorials/images/decision-tree/'),
      WIKI('Relación de aspecto', 'https://es.wikipedia.org/wiki/Relaci%C3%B3n_de_aspecto'),
      WIKI('Resolución de imagen', 'https://es.wikipedia.org/wiki/Resoluci%C3%B3n_de_imagen'),
      WIKI('Texto alternativo', 'https://es.wikipedia.org/wiki/Texto_alternativo'),
    ],
  });

  // ------------------------------------------------------------------
  // La charla en tres partes: apertura, cuerpo y cierre, con el reparto de minutos.
  const TIEMPO = diagrama([0, 13], [0, 4.4], [
    // La flecha del tiempo corre por debajo de las cajas.
    ...flecha([0.4, 2.25], [12.9, 2.25], 0, 1.2),
    ...caja(1.0, 2.6, 1.2, 0.7, '1 min'),
    ...caja(5.8, 2.6, 8.4, 0.7, '7 min'),
    ...caja(11.2, 2.6, 2.4, 0.7, '2 min'),
    txt(1.0, 3.55, 'Por qué importa'),
    txt(5.8, 3.55, 'Dos o tres ideas'),
    txt(11.2, 3.55, 'Qué hacer ahora'),
    txt(1.0, 1.7, 'Apertura'),
    txt(5.8, 1.7, 'Cuerpo'),
    txt(11.2, 1.7, 'Cierre'),
    txt(6.6, 0.5, 'Charla de 10 minutos; el reparto es de ejemplo'),
  ], 'Diagrama de la línea de tiempo de una charla de diez minutos de ejemplo, que avanza de izquierda a derecha sobre una flecha. La primera caja se llama Apertura, ocupa alrededor de un minuto y por encima lleva el rótulo Por qué importa. La segunda es el Cuerpo, la más ancha, lleva 7 min y por encima Dos o tres ideas. La tercera es el Cierre, lleva 2 min y por encima Qué hacer ahora. Debajo, el rótulo Charla de 10 minutos recuerda que el reparto de minutos es de ejemplo.');

  // ------------------------------------------------------------------
  L('Cómo presentar en público', {
    objetivo: 'Preparar una charla con público, diapositivas y ensayo, manejar el programa durante la proyección y saber qué hacer con los nervios y las preguntas.',
    vidaReal: `
      <p>En algún momento tendrás que hablar frente a otras personas con una pantalla detrás: la exposición de clase, la idea en la reunión del barrio, el proyecto frente al club. La parte que asusta rara vez es el programa; es el hablar. La buena noticia es que casi todo se prepara antes, y lo que queda delante del público se entrena. Aquí verás qué se prepara, qué ayuda te da el programa el día de la presentación y qué hacer con los nervios y las preguntas.</p>`,
    explicacion: `
      <p>La presentación está terminada y aun así la noche anterior cuesta dormir. Los nervios antes de hablar en público son normales: no son una señal de que algo vaya mal, es el cuerpo avisando que el momento importa. Esta lección reúne lo que se prepara antes, para dejar poco a la improvisación.</p>
      <h3>El público decide antes que el programa</h3>
      <p>La preparación empieza antes de abrir el programa, con tres preguntas: qué sabe el público del tema, qué necesita saber al salir de la sala y qué debería hacer con lo que escuchó. Las respuestas deciden lo demás: si sabe poco, la charla va por la base; si el objetivo es que hagan algo, el cierre lo anuncia.</p>
      <h3>Tres partes, con su tiempo</h3>
      <p>Con esas respuestas, la charla se arma en tres partes. La apertura dice por qué importa el tema, en una o dos frases conectadas con la vida del público. El cuerpo desarrolla dos o tres ideas, una por diapositiva. El cierre no dice «eso es todo»: dice qué hacer ahora con lo escuchado. En una de diez minutos, la apertura lleva uno, el cuerpo siete y el cierre dos; el diagrama muestra el reparto de ejemplo.</p>
      ${TIEMPO}
      <h3>El ensayo: decirlo en voz alta y con reloj</h3>
      <p>El <strong>ensayo</strong> (<span lang="en">rehearsal</span>) ayuda a bajar los nervios: consiste en decir la presentación completa en voz alta, en orden y con reloj. Ensayar revela si sobran diapositivas, si una frase se traba y cuánto tarda cada parte. LibreOffice Impress trae el ensayo de los tiempos de cambio, que registra el tiempo de cada diapositiva, por si la quieres con cambio automático. Ensayar no es memorizar palabra por palabra, sino practicar las ideas y su orden, el guion de «Menos texto, más ideas».</p>
      <h3>El día: la mecánica y la consola del presentador</h3>
      <p>El día de la charla, la mecánica cabe en cuatro pasos. Primero, llegar antes y probar la pantalla con la presentación abierta: los cables sorprenden. Segundo, llevar respaldo: una copia en PDF conserva el formato original y se abre en cualquier equipo con un lector de PDF; en papel, los apuntes o las notas. Tercero, arrancar: el menú Presentación de diapositivas inicia la proyección; la tecla F5 la empieza de cero y, con Mayús, desde la diapositiva que tienes en pantalla; un clic o la barra espaciadora avanzan, y para ir a una diapositiva concreta se escribe su número y se presiona Intro.</p>
      <p>Cuarto, si hay dos pantallas, la consola del presentador muestra en la tuya la actual, la que sigue, las notas y un temporizador, sin proyectarse; Esc sale de la proyección si el tiempo se acaba.</p>
      <h3>El cuerpo: contacto visual y ritmo</h3>
      <p>Al hablar, el cuerpo acompaña a la voz: de pie, sin refugiarse detrás del equipo. El <strong>contacto visual</strong> (<span lang="en">eye contact</span>) no es mirar a todo el público: es mirar un momento a tres o cuatro personas repartidas por la sala; cada mirada te dice si se entiende. Y el <strong>ritmo</strong> (<span lang="en">pace</span>) es la velocidad a la que hablas y las pausas que dejas: en una sala toca ir más despacio, y las pausas dan al público tiempo para pensar la idea anterior.</p>
      <h3>Nervios y preguntas: lo que sí se puede preparar</h3>
      <p>Lo práctico con los nervios: suelen calmarse con ensayo, porque el cuerpo ya sabe lo que viene, y con respiración lenta. Si el miedo impide hablar incluso en situaciones cotidianas, pedir ayuda a alguien de confianza es una opción razonable. Con las preguntas, el orden ayuda: repetirla en voz alta, responder corto y con una razón, y, si no se sabe, decirlo y ofrecer averiguarlo. Ese orden es, en pequeño, lo que Lectura enseña en «Cómo se construye un argumento».</p>
      <p class="nota"><strong>Trampa común:</strong> convertir el ensayo en memorizar el texto. Si se aprende palabra por palabra, olvidar una lo desordena todo; con las ideas y su orden ensayados, las palabras pueden variar sin que nadie lo note.</p>`,
    ejemplo: `
      <p>Una exposición de diez minutos para tu clase; los minutos y el tema son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Piensa en tu clase: sabe poco y necesita entenderlo para la prueba; ese público decide el nivel y el orden.</li>
        <li>Arma las tres partes: apertura de un minuto, cuerpo con las diapositivas del guion y cierre de dos minutos para decir qué hacer con lo aprendido.</li>
        <li>Ensaya dos veces con reloj; en la segunda, el programa registra el tiempo de cada diapositiva y el recorte se decide ahí.</li>
        <li>Exporta la copia en PDF y otra impresa con apuntes o notas, varias por hoja.</li>
        <li>Llega antes, prueba la pantalla y arranca con F5; tus notas quedan en la consola del presentador, fuera de la vista del público.</li>
        <li>En la charla misma: hablar despacio, pausa en cada cambio de idea y mirada repartida entre tres o cuatro personas.</li>
      </ol>
      <p>Resultado: <span class="resultado">la charla quedó en 10 minutos, con respaldo y notas listas</span>.</p>
      <p class="nota"><strong>Error común:</strong> ensayar la noche anterior, de un tirón y en silencio; mejor dos ensayos con reloj, aunque el público sea una sola persona.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Durante la presentación, alguien pide volver a la diapositiva doce. ¿Cómo lo haces sin cerrar la presentación?</p>',
        opciones: ['Salir con Esc, buscar la diapositiva y volver a empezar', 'Cerrar el programa y abrirlo de nuevo en esa diapositiva', 'Escribir el número 12 y presionar Intro para ir a esa diapositiva', 'Pedir al público que imagine lo que iba en esa diapositiva'], correcta: 2,
        pista: '<p>El programa entiende un número escrito como la orden de ir a esa diapositiva, sin salir de la proyección.</p>',
        solucion: '<p>Con la presentación en marcha, se escribe el número de la diapositiva y se presiona Intro: el programa salta a esa diapositiva y de ahí se sigue la charla. La tecla Esc sí corta la proyección completa.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es ensayar una presentación?</p>',
        opciones: ['Decirla en voz alta, en orden y con reloj, para ajustar el tiempo y las frases', 'Leer las diapositivas en silencio, la noche anterior', 'Aprender de memoria el texto completo de cada diapositiva', 'Repetir en voz baja el texto de cada diapositiva mientras la lees'], correcta: 0,
        pista: '<p>Es lo que revela cosas que leer en silencio no muestra: el tiempo real y las frases que se traban.</p>',
        solucion: '<p>Ensayar es decir la presentación completa en voz alta, en orden y con reloj. No es memorizar palabra por palabra: se ensayan las ideas y su orden.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿A quién se mira mientras presentas?</p>',
        opciones: ['A la pantalla, para no perder el hilo', 'A las tres o cuatro personas repartidas por la sala, quedándote un momento con cada una', 'Al suelo, porque mirar incomoda al público', 'A la ventana, con las notas en la mano'], correcta: 1,
        pista: '<p>El contacto visual repartido incluye a la gente; la pantalla ya se ve sola.</p>',
        solucion: '<p>El contacto visual es buscar a pocas personas repartidas por la sala y quedarse un momento con cada una. Mirar la pantalla de espaldas al público descompone la charla, y las notas van en tu pantalla con la consola del presentador.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama decir la presentación completa en voz alta, en orden y con reloj, antes del día?</p>',
        respuestas: ['ensayo', 'ensayar', 'el ensayo', 'rehearsal'],
        pista: '<p>Es lo que más baja los nervios y lo que mide el modo de tiempos de cambio del programa.</p>',
        solucion: '<p>Se llama ensayo (rehearsal en inglés). Ensayar en voz alta y con reloj revela si sobran diapositivas y cuánto tarda cada parte.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos de la preparación de una charla.</p>',
        respuesta: ['Decidir qué sabe y qué necesita el público', 'Armar las tres partes: apertura, cuerpo y cierre', 'Recortar cada diapositiva a una idea y guardar el resto en las notas', 'Ensayar en voz alta, con reloj y con el tiempo de cada diapositiva', 'Exportar la copia en PDF y probar el equipo en la sala'],
        pista: '<p>Primero el público, después la estructura, después el recorte, después la voz y al final el resguardo y la prueba.</p>',
        solucion: '<p>El orden es público, tres partes, recorte de diapositivas, ensayo en voz alta con reloj y respaldo con prueba del equipo. Lo del ensayo es lo que decide el recorte final: si una parte se pasa del tiempo, ahí se ajusta.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu charla de ejemplo dura 10 minutos y quieres darle a cada diapositiva unos 2 minutos de proyección. ¿Cuántas diapositivas caben?</p>', respuesta: 10 / 2,
        pista: '<p>Divide los minutos totales entre los minutos de cada diapositiva.</p>',
        solucion: '<p>Caben 10 ÷ 2 = <strong>5</strong> diapositivas. Si tras el ensayo el número no da para ese tiempo, el recorte va en las diapositivas, no en la claridad.</p>' },
    ],
    fuentes: [
      LO('Using the Presenter Console', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/simpress/guide/presenter_console.xhp'),
      LO('Showing a Slide Show', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/simpress/guide/show.xhp'),
      LO('Shortcut Keys for Impress', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/simpress/04/01020000.xhp'),
      LO('Using Shortcut Keys in Impress', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/simpress/guide/keyboard.xhp'),
      LO('Rehearse Timings of Slide Changes', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/simpress/guide/rehearse_timings.xhp'),
      LO('Export as PDF', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/shared/01/ref_pdf_export.xhp'),
      LO('Printing Presentations', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/simpress/guide/printing.xhp'),
    ],
  });

  // Unidad 4 completa: lecciones 1 a 4.
})();
