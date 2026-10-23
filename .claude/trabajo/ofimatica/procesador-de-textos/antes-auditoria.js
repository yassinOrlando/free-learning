// Ofimática · Unidad 2: Procesador de textos.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// La unidad se escribe en tres fragmentos: el 1 (lecciones 1 a 3), el 2 (lecciones 4 a 6) y el 3 (lecciones 7 a 9).
// Cada fragmento añade sus lecciones al final del archivo, antes del cierre, y nunca reescribe lo anterior.
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

  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia en español: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const WIKIEN = (articulo, nombre) => ({ nombre: `Wikipedia en inglés: ${nombre}`, url: `https://en.wikipedia.org/wiki/${articulo}` });
  // La ayuda oficial de LibreOffice está en inglés; el texto plano de cada página vive en su repositorio oficial.
  const LO = (nombre, url) => ({ nombre: `LibreOffice Help (en inglés): ${nombre}`, url });

  // ------------------------------------------------------------------
  // Ciclo del trabajo con un texto: crear, escribir, guardar, cerrar y abrir.
  const CICLO = diagrama([0, 8], [0, 13.4], [
    ...caja(4, 11.8, 6.6, 1.6, 'Crear', true), txt(4, 11.25, 'un texto nuevo'),
    ...flecha([4, 11.0], [4, 10.4], 0, 0.7),
    ...caja(4, 9.6, 6.6, 1.6, 'Escribir', true), txt(4, 9.05, 'el texto vive en la memoria'),
    ...flecha([4, 8.8], [4, 8.2], 0, 0.7),
    ...caja(4, 7.4, 6.6, 1.6, 'Guardar', true), txt(4, 6.85, 'el texto pasa al archivo'),
    ...flecha([4, 6.6], [4, 6.0], 0, 0.7),
    ...caja(4, 5.2, 6.6, 1.6, 'Cerrar', true), txt(4, 4.65, 'el archivo queda en el disco'),
    ...flecha([4, 4.4], [4, 3.8], 0, 0.7),
    ...caja(4, 3.0, 6.6, 1.6, 'Abrir', true), txt(4, 2.45, 'el texto vuelve a la memoria'),
    txt(4, 1.1, 'El ciclo del trabajo con un texto'),
  ], 'Diagrama vertical de cinco cajas unidas por flechas que bajan. De arriba abajo: Crear, un texto nuevo; Escribir, el texto vive en la memoria; Guardar, el texto pasa al archivo; Cerrar, el archivo queda en el disco; Abrir, el texto vuelve a la memoria. Debajo, el rótulo El ciclo del trabajo con un texto.');

  // ------------------------------------------------------------------
  // Las cuatro alineaciones: cada bloque muestra tres líneas de texto.
  const ALINEACIONES = diagrama([0, 16], [0, 12], [
    { tipo: 'poligono', puntos: [[0.5, 7.2], [7.5, 7.2], [7.5, 10.8], [0.5, 10.8]] },
    { tipo: 'linea', desde: [0.9, 9.8], hasta: [5.4, 9.8] }, { tipo: 'linea', desde: [0.9, 9.1], hasta: [6.5, 9.1] }, { tipo: 'linea', desde: [0.9, 8.4], hasta: [4.7, 8.4] },
    txt(4, 6.6, 'Izquierda'),
    { tipo: 'poligono', puntos: [[8.5, 7.2], [15.5, 7.2], [15.5, 10.8], [8.5, 10.8]] },
    { tipo: 'linea', desde: [10.0, 9.8], hasta: [14.0, 9.8] }, { tipo: 'linea', desde: [9.4, 9.1], hasta: [14.6, 9.1] }, { tipo: 'linea', desde: [10.7, 8.4], hasta: [13.3, 8.4] },
    txt(12, 6.6, 'Centrada'),
    { tipo: 'poligono', puntos: [[0.5, 2.2], [7.5, 2.2], [7.5, 5.8], [0.5, 5.8]] },
    { tipo: 'linea', desde: [0.9, 4.8], hasta: [7.1, 4.8] }, { tipo: 'linea', desde: [0.9, 4.1], hasta: [7.1, 4.1] }, { tipo: 'linea', desde: [0.9, 3.4], hasta: [7.1, 3.4] },
    txt(4, 1.6, 'Justificada'),
    { tipo: 'poligono', puntos: [[8.5, 2.2], [15.5, 2.2], [15.5, 5.8], [8.5, 5.8]] },
    { tipo: 'linea', desde: [10.1, 4.8], hasta: [15.1, 4.8] }, { tipo: 'linea', desde: [11.0, 4.1], hasta: [15.1, 4.1] }, { tipo: 'linea', desde: [9.6, 3.4], hasta: [15.1, 3.4] },
    txt(12, 1.6, 'A la derecha'),
  ], 'Cuatro bloques de texto, cada uno con tres líneas representadas por líneas horizontales. Arriba a la izquierda, el bloque Izquierda: las tres líneas arrancan en el mismo sitio y terminan a distinta distancia. Arriba a la derecha, el bloque Centrada: las tres líneas están centradas respecto al bloque. Abajo a la izquierda, el bloque Justificada: las tres líneas tienen la misma longitud y llenan todo el ancho. Abajo a la derecha, el bloque A la derecha: las tres líneas terminan en el mismo sitio y arrancan a distinta distancia.');

  // ------------------------------------------------------------------
  // Jerarquía de los estilos de título: cada nivel baja un escalón.
  const JERARQUIA = diagrama([0, 12], [0, 9.6], [
    ...caja(3.0, 7.8, 4.6, 1.2, 'Título 1', true), txt(6.2, 7.8, 'nivel 1'),
    ...flecha([3.0, 7.2], [5.4, 6.2], 0, 0.8),
    ...caja(5.4, 5.6, 4.6, 1.2, 'Título 2', true), txt(8.4, 5.6, 'nivel 2'),
    ...flecha([5.4, 5.0], [7.8, 4.0], 0, 0.8),
    ...caja(7.8, 3.4, 4.6, 1.2, 'Título 3', true), txt(10.8, 3.4, 'nivel 3'),
    ...flecha([7.8, 2.8], [8.6, 1.8], 0, 0.8),
    ...caja(8.6, 1.2, 4.6, 1.2, 'Texto del cuerpo', true),
  ], 'Diagrama de cuatro cajas en escalón, unidas por flechas que bajan y van hacia la derecha. Arriba del todo, la caja Título 1, con la etiqueta nivel 1 al lado. Debajo y más a la derecha, la caja Título 2, con la etiqueta nivel 2. Más abajo y más a la derecha, la caja Título 3, con la etiqueta nivel 3. Al final, la caja Texto del cuerpo, sin nivel, porque es el texto normal.');

  // ------------------------------------------------------------------
  L('Crear, guardar y abrir documentos', {
    objetivo: 'Crear un documento de texto, guardarlo con un nombre y una carpeta que tú eliges, volver a abrirlo y saber qué formato tiene.',
    vidaReal: `
      <p>Guardar bien un trabajo decide si sirve o si toca empezar otra vez. En la escuela, un texto entregado a tiempo vale más que uno perfecto que se perdió. En casa, la lista del súper o las notas de clase también se escriben en la computadora. Y cuando trabajas con otra persona, el archivo tiene que quedar guardado en un sitio donde los dos puedan encontrarlo. Todo eso empieza por un gesto pequeño: guardar.</p>`,
    explicacion: `
      <p>Escribes tres líneas en el procesador de textos, apagas el equipo y al día siguiente lo enciendes otra vez. La pantalla aparece en blanco: lo que escribiste se quedó solo en la memoria de la computadora. Un texto no está a salvo hasta que lo guardas.</p>
      <h3>El texto vive en la memoria hasta que lo guardas</h3>
      <p>Un procesador de textos es un programa donde escribes. Lo que escribes se llama <strong>documento</strong> (<span lang="en">document</span>), que es el archivo de texto que estás editando. Mientras el programa está abierto, el documento vive en la memoria de trabajo, la parte del equipo que sostiene lo que tienes abierto. Al guardar, baja al disco y queda como un archivo con nombre.</p>
      <h3>El formato del archivo</h3>
      <p>El <strong>formato</strong> (<span lang="en">file format</span>) es el tipo de archivo, y decide qué programa lo abre. Un formato es una especificación: la manera en que se ordena la información dentro del archivo. Como cada formato está pensado para un tipo de programa, a menudo hace falta un programa concreto para trabajar con él.</p>
      <p>Los que te vas a encontrar son el texto plano (.txt), que se abre en cualquier parte; el .odt de LibreOffice Writer, que guarda también los estilos y las imágenes; el .docx, de otros programas; y el PDF, que se ve igual en cualquier dispositivo y no se desordena al mandarlo.</p>
      <h3>Guardar y guardar como</h3>
      <p>Guardar y guardar como se confunden, pero hacen cosas distintas. Guardar sustituye el archivo que ya existe con el mismo nombre y en el mismo sitio. Guardar como crea un archivo nuevo, y ahí eliges el nombre, la carpeta y la unidad. La primera vez que guardas un documento nuevo se abre ese cuadro. Además, el programa añade la extensión al nombre por ti, así que no hace falta escribir .odt a mano.</p>
      <p>Para guardar en otro formato se usa también Guardar como: en la lista de tipo de archivo eliges el que quieres. Cuando no es el formato del programa, aparece un aviso antes de guardar, y conviene leerlo, porque lo que el programa no entiende puede que no se guarde igual.</p>
      <h3>Una copia por si acaso</h3>
      <p>Hay una costumbre que evita sorpresas: la <strong>copia de seguridad</strong> (<span lang="en">backup</span>). Es una copia aparte de tu archivo, para que, si el original se daña o se borra, tengas una versión anterior. El programa puede crearla solo: si activas la opción de crear copia de seguridad siempre, al guardar se guarda también la versión anterior, con el mismo nombre pero con la extensión .BAK. El autoguardado guarda, cada cierto número de minutos, lo necesario para recuperar el texto si el programa se cierra de golpe.</p>
      <h3>El ciclo del trabajo</h3>
      <p>Crear, escribir, guardar, cerrar y abrir son cinco gestos que se repiten. En la tabla de abajo está qué hace cada uno y cuándo toca usarlo:</p>
      ${CICLO}
      <div class="tabla-wrap"><table>
        <thead><tr><th>Comando</th><th>Qué hace</th><th>Cuándo usarlo</th></tr></thead>
        <tbody>
          <tr><th scope="row">Nuevo</th><td>Abre un documento en blanco.</td><td>Cuando empiezas un texto desde cero.</td></tr>
          <tr><th scope="row">Abrir</th><td>Trae a la pantalla un archivo que ya existe.</td><td>Cuando vuelves a un texto guardado.</td></tr>
          <tr><th scope="row">Guardar</th><td>Sustituye el archivo del mismo nombre que está en el disco.</td><td>Cada pocos minutos, mientras escribes.</td></tr>
          <tr><th scope="row">Guardar como</th><td>Crea un archivo nuevo con el nombre y la carpeta que eliges.</td><td>La primera vez que guardas, o para otra copia con otro nombre u otro formato.</td></tr>
          <tr><th scope="row">Cerrar</th><td>Sale del documento y avisa si falta guardar.</td><td>Cuando terminas por hoy.</td></tr>
        </tbody>
      </table></div>
      <p>Por eso conviene un orden: escribir un rato, guardar, seguir escribiendo, guardar otra vez, y nunca esperar al final. En la unidad "Archivos y carpetas" viste qué es un archivo; si prefieres guardar en la nube, la lección "Almacenamiento en la nube" te explica cómo.</p>
      <p class="nota"><strong>Trampa común:</strong> trabajar media hora sin guardar y confiar en que el programa se encarga. El programa solo guarda cuando tú se lo pides, así que un cierre inesperado se lleva por delante lo que no habías guardado.</p>`,
    ejemplo: `
      <p>Escribes una carta de tres líneas para el director del colegio y quieres entregarla el viernes.</p>
      <ol class="pasos-ej">
        <li>Abres el procesador de textos. Con el icono de documento nuevo, o con el menú Archivo - Nuevo, aparece una hoja en blanco.</li>
        <li>Escribes las tres líneas. No hace falta guardar todavía: el texto está en la memoria de trabajo.</li>
        <li>Guardas por primera vez con Archivo - Guardar como. Escribes el nombre «Carta para el director», eliges la carpeta y el programa añade solo la extensión .odt.</li>
        <li>Pulsas Guardar y compruebas que el archivo aparece en la carpeta. Ahora el texto está en el disco y no se pierde si apagas el equipo.</li>
        <li>Cierras el documento y lo vuelves a abrir con Archivo - Abrir para verificar que el texto sigue ahí.</li>
      </ol>
      <p>Resultado: <span class="resultado">un archivo con nombre, en la carpeta elegida, que se abre con todo su texto</span>.</p>
      <p class="nota"><strong>Error común:</strong> aceptar el nombre que pone el programa, como «Documento 1», y no mirar en qué carpeta se guarda. El archivo acaba donde no creías y luego cuesta encontrarlo.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>El documento ya tiene nombre y está guardado. ¿Qué hace el comando Guardar?</p>',
        opciones: ['Sustituye el archivo del mismo nombre, en el mismo sitio', 'Crea un archivo nuevo con el nombre y la carpeta que tú eliges', 'Cierra el documento y pregunta si quieres guardar', 'Guarda una copia del archivo con la extensión .BAK'], correcta: 0,
        pista: '<p>Fíjate en la diferencia entre guardar y guardar como.</p>',
        solucion: '<p>Guardar sustituye el archivo que ya existe con el mismo nombre y en el mismo sitio. Guardar como es el que crea un archivo nuevo, y el que se usa la primera vez que guardas un documento.</p>' },
      { tipo: 'opciones', enunciado: '<p>Quieres mandar el documento a otra persona y que se vea igual en cualquier equipo. ¿Qué formato conviene?</p>',
        opciones: ['.txt', '.odt', '.pdf', '.BAK'], correcta: 2,
        pista: '<p>Busca el formato que se ve igual en cualquier dispositivo y no se desordena al enviarlo.</p>',
        solucion: '<p>El PDF está pensado para verse igual en cualquier dispositivo y para mandarse sin que se desordene. El .txt solo guarda letras, el .odt es el formato de documento de LibreOffice Writer y el .BAK es la copia de seguridad.</p>' },
      { tipo: 'opciones', enunciado: '<p>Escribes tres líneas y apagas el equipo sin guardar. ¿Qué pasa con el texto?</p>',
        opciones: ['El programa lo guarda solo al apagar el equipo', 'Se pierde, porque solo estaba en la memoria del equipo', 'Queda guardado como un archivo con la extensión .BAK', 'Se guarda en la carpeta donde estaba el último archivo'], correcta: 1,
        pista: '<p>Recuerda dónde vive el texto mientras el programa está abierto.</p>',
        solucion: '<p>El texto estaba solo en la memoria de trabajo, que se borra al apagar el equipo. Por eso hay que guardar: el archivo es lo que queda en el disco, y solo se crea al guardar.' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la copia aparte de tu archivo que se guarda por si el original se daña o se borra?</p>',
        respuestas: ['copia de seguridad', 'la copia de seguridad', 'backup'],
        pista: '<p>En el programa, la copia automática lleva la extensión .BAK.</p>',
        solucion: '<p>Se llama copia de seguridad (backup). Si activas la opción de crear copia de seguridad siempre, al guardar se guarda también la versión anterior del documento, con el mismo nombre y la extensión .BAK.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para guardar un documento nuevo por primera vez.</p>',
        respuesta: ['Escribir el texto en el documento nuevo', 'Elegir Archivo - Guardar como', 'Escribir el nombre del archivo', 'Elegir la carpeta donde va a guardarse', 'Pulsar Guardar y comprobar que aparece en la carpeta'],
        pista: '<p>Primero escribes, y la primera vez que guardas el programa te pide el nombre y la carpeta.</p>',
        solucion: '<p>El orden es escribir, elegir Guardar como, poner el nombre, elegir la carpeta y pulsar Guardar. La primera vez que guardas un documento nuevo se abre el cuadro Guardar como, y ahí es donde eliges nombre y carpeta.' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos comandos aparecen en la tabla de la lección?</p>', respuesta: 5,
        pista: '<p>Cuenta las filas de la tabla, sin contar el encabezado.</p>',
        solucion: '<p>Son cinco: nuevo, abrir, guardar, guardar como y cerrar. Los dos que más se confunden son guardar y guardar como, porque uno sustituye el archivo que ya existe y el otro crea uno nuevo.' },
    ],
    fuentes: [
      LO('Abrir documentos', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/shared/guide/doc_open.xhp'),
      LO('Guardar documentos', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/shared/guide/doc_save.xhp'),
      LO('Guardar documentos automáticamente', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/shared/guide/doc_autosave.xhp'),
      LO('Guardar documentos en otros formatos', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/shared/guide/export_ms.xhp'),
      WIKI('Formato_de_archivo', 'Formato de archivo'),
      WIKI('Portable_Document_Format', 'Portable Document Format'),
    ],
  });

  // ------------------------------------------------------------------
  L('Formato de texto y de párrafo', {
    objetivo: 'Dar formato a las letras y a los párrafos de un texto, elegir la alineación que conviene y saber qué se aplica a lo seleccionado.',
    vidaReal: `
      <p>El formato decide si el lector encuentra lo que necesita. En un aviso del colegio, un título grande y bien marcado dice de qué va el aviso antes de que nadie lea una palabra. En un trabajo con pasos, poner números evita que alguien se pierda. Y en una carta, unas líneas de aire hacen que se lea sin agobios. Nada de esto cambia lo que escribes: solo decide cómo se ve y cómo se encuentra.</p>`,
    explicacion: `
      <p>Si escribes un texto y no le cambias nada, queda como un muro de letras iguales: el lector no distingue el título del final, ni una idea importante de una frase de relleno. El formato es la manera de marcar qué es lo que de verdad importa, para que quien lee encuentre rápido lo que busca.</p>
      <h3>Dos niveles de formato</h3>
      <p>El formato tiene dos niveles. El primero afecta a las letras: la negrita, la cursiva, el subrayado, el tamaño, el color o las mayúsculas. El segundo afecta al párrafo: la alineación, el interlineado, la sangría y el espacio que hay antes y después.</p>
      <p>La <strong>negrita</strong> (<span lang="en">bold</span>) es el estilo tipográfico en el que las letras tienen un trazo más grueso que las normales. Sirve para lo que de verdad importa: el título, la palabra clave o el dato que no se puede perder de vista.</p>
      <p>La <strong>cursiva</strong> (<span lang="en">italic</span>) usa las letras inclinadas. Se reserva para cosas concretas: el título de una obra, una palabra que hay que leer en otro idioma o un énfasis puntual. El subrayado también es una forma de énfasis, con líneas horizontales debajo de las letras.</p>
      <h3>La alineación</h3>
      <p>La <strong>alineación</strong> (<span lang="en">alignment</span>) es la posición de la línea dentro de la página. Hay cuatro: a la izquierda, centrada, justificada y a la derecha. La de la izquierda es la más cómoda para leer un texto largo. La centrada va bien para los títulos. La justificada estira o comprime los espacios para que los dos bordes de cada línea queden rectos. Y la de la derecha se usa para las fechas, los números o las firmas.</p>
      ${ALINEACIONES}
      <p>En el diagrama se ve la diferencia: en el bloque justificado las tres líneas tienen la misma longitud y en el de la derecha todas terminan en el mismo sitio. La justificada se ve muy limpia, pero cansa más de leer.</p>
      <h3>El formato se aplica a lo seleccionado</h3>
      <p>El formato se aplica a lo que está seleccionado. Si seleccionas tres palabras y pulsas la negrita, esas tres quedan en negrita y nada más. Si no has seleccionado nada, se aplica al punto donde está el cursor, y en los cambios de párrafo, como la alineación, al párrafo completo. Por eso, antes de dar formato, mira qué está seleccionado.</p>
      <p>El interlineado es la distancia entre renglones, y forma parte del estilo del párrafo: el programa usa esa distancia como una rejilla vertical invisible donde coloca las líneas. La sangría se mide respecto a los márgenes de la página, y el color de la letra se aplica como cualquier otro cambio: se selecciona el texto y se elige el color en la barra de herramientas.</p>
      <p>Y si el resultado no convence, se puede volver atrás: un comando borra el formato directo, es decir, quita de golpe las negritas, las cursivas y los colores puestos a mano. La diferencia con la lección siguiente es esa: el estilo hace el trabajo una sola vez.</p>
      <p>En la tabla están todos los cambios y cuándo conviene usar cada uno:</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Cambio</th><th>Para qué sirve</th><th>Cuándo se usa</th></tr></thead>
        <tbody>
          <tr><th scope="row">Negrita</th><td>Marca lo que importa.</td><td>En el título o la palabra clave.</td></tr>
          <tr><th scope="row">Cursiva</th><td>Destaca una palabra.</td><td>En el título de una obra.</td></tr>
          <tr><th scope="row">Subrayado</th><td>Da énfasis con líneas debajo.</td><td>Con cuidado, en un dato.</td></tr>
          <tr><th scope="row">Tamaño de letra</th><td>Agranda o reduce las letras.</td><td>En un título.</td></tr>
          <tr><th scope="row">Color</th><td>Cambia el color de las letras.</td><td>Con moderación, en un aviso.</td></tr>
          <tr><th scope="row">Alineación</th><td>Sitúa la línea en la página.</td><td>A la izquierda para leer.</td></tr>
          <tr><th scope="row">Interlineado</th><td>Separa más o menos los renglones.</td><td>En los textos largos.</td></tr>
          <tr><th scope="row">Sangría</th><td>Deja un hueco al principio.</td><td>Para separar párrafos.</td></tr>
        </tbody>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> ponerlo todo en negrita. Si cada frase, cada palabra y cada título están destacados, no hay nada destacado: el lector no sabe dónde mirar. Guarda la negrita para lo que de verdad merece la pena.</p>`,
    ejemplo: `
      <p>Tienes una carta de tres párrafos escrita y sin forma. Quieres que se lea bien.</p>
      <ol class="pasos-ej">
        <li>El título. Seleccionas la primera línea y la pones en negrita y centrada, para que se sepa de qué va la carta antes de leer.</li>
        <li>El cuerpo. Seleccionas los tres párrafos y los alineas a la izquierda, la forma más cómoda de leer un texto largo. La alineación se aplica al párrafo completo.</li>
        <li>El aire. Con los párrafos seleccionados, subes el interlineado un poco, para que el texto no se vea apretado.</li>
        <li>Una palabra en cursiva: el nombre de la obra del segundo párrafo. Aquí la cursiva tiene un significado, no es un adorno.</li>
        <li>Compruebas el resultado. Si algo quedó raro, usas el comando de borrar formato directo, que deja el texto sin negritas ni cursivas.</li>
      </ol>
      <p>Resultado: <span class="resultado">una carta con el título centrado y en negrita, el cuerpo alineado a la izquierda y con aire entre renglones</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner la negrita y la cursiva a la vez en la misma palabra. Elige una cosa y comprueba el resultado: el formato se acumula.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos cambios afecta al párrafo y no a las letras?</p>',
        opciones: ['La negrita', 'El subrayado', 'El interlineado', 'El color de la letra'], correcta: 2,
        pista: '<p>Uno de los dos niveles de formato trata del bloque de texto completo.</p>',
        solucion: '<p>El interlineado es la distancia entre renglones, y es un cambio de párrafo. La negrita, el subrayado y el color son cambios de las letras: forman parte del nivel del texto carácter por carácter.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve la alineación justificada?</p>',
        opciones: ['Para que los dos bordes de cada línea queden rectos', 'Para centrar los títulos en la página', 'Para poner en cursiva las palabras sueltas', 'Para dejar más espacio entre los renglones'], correcta: 0,
        pista: '<p>Para esto hay que estirar o comprimir los espacios entre palabras.</p>',
        solucion: '<p>La justificación estira o comprime los espacios para que los dos bordes de cada línea queden rectos. Se ve muy limpia, pero cansa un poco más de leer porque los espacios quedan desiguales.</p>' },
      { tipo: 'opciones', enunciado: '<p>No has seleccionado nada y aplicas la negrita. ¿Qué ocurre?</p>',
        opciones: ['El formato se aplica a todo el documento', 'El formato se aplica al párrafo completo', 'El formato se aplica al punto donde está el cursor', 'No ocurre nada hasta que selecciones texto'], correcta: 2,
        pista: '<p>El formato se aplica a lo seleccionado, y si no hay nada seleccionado, a otra cosa.</p>',
        solucion: '<p>Sin nada seleccionado, el formato se aplica al punto donde está el cursor, y lo que escribas después sale ya con ese formato. Si quieres aplicarlo a un párrafo entero, selecciona el párrafo antes de darle formato.' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la posición de la línea dentro de la página?</p>',
        respuestas: ['alineación', 'la alineación', 'alignment'],
        pista: '<p>Hay cuatro: a la izquierda, centrada, justificada y a la derecha.</p>',
        solucion: '<p>Se llama alineación (alignment). Eligiéndola bien, el texto se lee más fácil: a la izquierda para los textos largos, centrada para los títulos y a la derecha para números y firmas.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para dar formato a un texto.</p>',
        respuesta: ['Seleccionar el texto que quieres cambiar', 'Elegir el formato en la barra de herramientas', 'Revisar el resultado en la pantalla', 'Deshacer el cambio si el resultado no era el esperado'],
        pista: '<p>El formato se aplica a lo que está seleccionado, así que el primer paso va antes que el segundo.</p>',
        solucion: '<p>El orden es seleccionar, elegir el formato, revisar y deshacer si hace falta. Revisar es un paso de verdad: si el resultado no era el esperado, el atajo para deshacer siempre está a mano.' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas alineaciones muestra el diagrama de la lección?</p>', respuesta: 4,
        pista: '<p>Cuenta los bloques de texto del diagrama.</p>',
        solucion: '<p>Son cuatro: a la izquierda, centrada, justificada y a la derecha. En el diagrama se ve la diferencia: la justificada tiene las líneas todas iguales de largas y la alineada a la derecha las tiene todas igual de terminadas.' },
    ],
    fuentes: [
      LO('Quitar el formato directo', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/reset_format.xhp'),
      LO('Sangrías de párrafo', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/indenting.xhp'),
      LO('Cambiar el color del texto', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/shared/guide/text_color.xhp'),
      LO('Interlineado y estilo de referencia de la página', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/registertrue.xhp'),
      WIKIEN('Text_alignment', 'Text alignment'),
      WIKI('Negrita', 'Negrita'),
      WIKI('Cursiva', 'Cursiva'),
      WIKI('Subrayado', 'Subrayado'),
    ],
  });

  // ------------------------------------------------------------------
  L('Estilos y títulos', {
    objetivo: 'Usar estilos de párrafo para dar formato de un golpe, marcar las secciones con títulos de nivel y cambiar el aspecto de todo el documento de una sola vez.',
    vidaReal: `
      <p>Hay una diferencia enorme entre un texto que se arregla en cinco minutos y uno que hay que maquetar cada vez. En un trabajo de diez páginas, cambiar de una vez el aspecto de todos los títulos hace que el documento se vea igual por todas partes. Además, el texto queda ordenado por dentro, y por eso el programa puede montar un índice sin ayuda. En la escuela, un documento con estructura se lee mejor y se corrige más rápido.</p>`,
    explicacion: `
      <p>Aplicaste negrita a tres títulos, y cuando llega el momento de cambiar el aspecto de uno, tienes que volver a cambiarlo todo. El problema no es la negrita: es que el formato quedó pegado a las letras. La solución es dejar de hacerlo así.</p>
      <h3>Un formato con nombre</h3>
      <p>Un <strong>estilo</strong> (<span lang="en">style</span>) es un nombre que guarda un conjunto de formatos y se aplica de un golpe. En vez de poner en negrita, de centrado y con un tamaño de letra más grande tres veces seguidas, escribes «esto es un título» y el programa ya sabe cómo se ve un título.</p>
      <p>Eso da tres cosas. Primera: se cambia el aspecto de todo el documento cambiando el estilo una sola vez. Segunda: el documento queda ordenado por dentro, y por eso el programa puede montar un índice solo o dejarte saltar de sección a sección con el panel de navegación, que muestra las distintas partes del documento y se abre con la tecla F5. Tercera: dos personas que trabajan en el mismo documento mantienen el mismo aspecto, porque usan los mismos estilos.</p>
      <h3>Los niveles de los títulos</h3>
      <p>Un <strong>título</strong> (<span lang="en">heading</span>) es el estilo que marca las secciones del documento y su orden, y cada título lleva un <strong>nivel</strong> (<span lang="en">level</span>): título 1, título 2, título 3. El de nivel 1 es la sección principal; el de nivel 2, un apartado de esa sección; el de nivel 3, un apartado del apartado. El cuerpo del texto tiene su propio estilo, llamado párrafo de texto.</p>
      ${JERARQUIA}
      <p>En el diagrama, cada nivel baja un escalón y se mete más adentro.</p>
      <p>Y hay una regla de oro: el estilo de título se aplica al párrafo entero, nunca a unas letras sueltas. Si marcas tres palabras de una frase y aplicas el estilo de título 2, el párrafo entero se vuelve un título, y el índice muestra una sección que no existe. Por eso conviene colocar el cursor en cualquier parte del párrafo y aplicar el estilo.</p>
      <h3>Cambiar un estilo una sola vez</h3>
      <p>Para cambiar el aspecto de todos los títulos de nivel 1 no vas uno por uno. En el panel de estilos, con el cursor dentro de un título, eliges la opción de actualizar el estilo seleccionado: los atributos que tenías a mano pasan al estilo y todos los párrafos que lo usan cambian a la vez. También se puede crear un estilo nuevo arrastrando una selección con formato manual hasta el panel de estilos.</p>
      <p>El foco de estilos da una pista rápida: el formato directo de párrafo se marca con un patrón de rayas en el indicador de color y con una etiqueta al lado del nombre del estilo. Así ves qué párrafos tienen formato pegado encima del estilo.</p>
      <p>En la tabla están los estilos de párrafo que usa un procesador de textos y cuándo conviene cada uno:</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Estilo</th><th>Qué marca</th><th>Cuándo se usa</th></tr></thead>
        <tbody>
          <tr><th scope="row">Título 1</th><td>La sección principal.</td><td>Para el nombre del tema o del capítulo.</td></tr>
          <tr><th scope="row">Título 2</th><td>Un apartado de una sección.</td><td>Para los apartados de un capítulo.</td></tr>
          <tr><th scope="row">Título 3</th><td>Un apartado del apartado.</td><td>Para los detalles de un apartado.</td></tr>
          <tr><th scope="row">Texto del cuerpo</th><td>El formato normal del texto.</td><td>Para todo lo que no es un título.</td></tr>
          <tr><th scope="row">Cita</th><td>Un texto copiado de otro autor.</td><td>Cuando citas un libro o un artículo.</td></tr>
          <tr><th scope="row">Lista</th><td>Elementos en lista.</td><td>Para ingredientes o ideas sueltas.</td></tr>
        </tbody>
      </table></div>
      <p>La lección "Formato de texto y de párrafo" de esta unidad te enseñó a dar formato a mano; los estilos son la forma rápida. Y la lección "Estructura de un texto", de Lectura, explica cómo se ordenan las partes de un texto: los estilos son la herramienta que pone esa estructura dentro del programa.</p>
      <p class="nota"><strong>Trampa común:</strong> usar la negrita para los títulos y dejar los estilos sin usar. El resultado parece bueno, pero cuando el documento crece hay que corregir título por título, y el índice no sale solo, porque se construye con los estilos.</p>`,
    ejemplo: `
      <p>Tienes un trabajo de cinco páginas sobre las tortugas, escrito en un solo bloque. Quieres darle estructura.</p>
      <ol class="pasos-ej">
        <li>Lees el texto y decides qué partes son secciones principales y cuáles son apartados.</li>
        <li>Colocas el cursor dentro de cada título de sección, sin seleccionar las letras, y aplicas el estilo Título 1.</li>
        <li>Dentro de cada sección aplicas el estilo Título 2 a los apartados. El panel de navegación muestra los tres títulos con sus apartados, en orden.</li>
        <li>Seleccionas los párrafos del cuerpo y aplicas el estilo de texto, que es el formato normal.</li>
        <li>Por último cambias el estilo Título 1 una sola vez: engordas la letra. Los tres títulos cambian a la vez y el trabajo sigue viéndose igual.</li>
      </ol>
      <p>Resultado: <span class="resultado">un documento con tres secciones de nivel 1, sus apartados de nivel 2 y un cuerpo con formato uniforme</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner el estilo de título en un párrafo que es texto normal, porque queda más grande. El título marca secciones: como el índice se construye con estos estilos, cada título de más sale como una sección que no existe.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué es un estilo?</p>',
        opciones: ['Un tipo de letra que se instala en el equipo', 'Un nombre que guarda un conjunto de formatos y se aplica de un golpe', 'Una copia del documento con otro nombre', 'Una forma de alinear los párrafos de la página'], correcta: 1,
        pista: '<p>Piensa en lo que hace que las dos personas que escriben juntas vean lo mismo.</p>',
        solucion: '<p>Un estilo es un nombre que guarda un conjunto de formatos y se aplica de un golpe. Con él cambias el aspecto de todo el documento cambiando el estilo una sola vez.' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve un título de nivel 2?</p>',
        opciones: ['Para poner en negrita una palabra del texto', 'Para marcar los apartados que están dentro de una sección principal', 'Para crear el índice del documento', 'Para cambiar el color de todas las letras'], correcta: 1,
        pista: '<p>Fíjate en la jerarquía: el nivel 2 va por debajo del nivel 1.</p>',
        solucion: '<p>El título de nivel 2 marca los apartados que están dentro de una sección principal. El nivel 1 es la sección principal, y el nivel 3 es un apartado del apartado.' },
      { tipo: 'opciones', enunciado: '<p>¿Qué se rompe si aplicas el estilo de título solo a unas letras sueltas de un párrafo?</p>',
        opciones: ['Nada, el resultado se ve igual', 'Solo el color de la letra', 'El índice y la estructura, porque un título tiene que ser un párrafo entero', 'El nombre del archivo del documento'], correcta: 2,
        pista: '<p>Piensa en lo que el índice muestra de cada sección.</p>',
        solucion: '<p>El estilo de título se aplica al párrafo entero. Si solo marcas unas letras, el párrafo completo se convierte en título, y el índice va a mostrar una sección que en realidad no existe.' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama un conjunto de formatos que se guarda con un nombre y se aplica de un golpe?</p>',
        respuestas: ['estilo', 'un estilo', 'style'],
        pista: '<p>Es la palabra que se usa también en inglés, sin tilde y con una «e» al final.</p>',
        solucion: '<p>Se llama estilo (style). Aplicar un estilo es como etiquetar un párrafo: el programa ya sabe cómo tiene que verse todo lo que lleva esa etiqueta.' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para dar estructura a un documento con estilos de título.</p>',
        respuesta: ['Escribir el texto plano con sus secciones', 'Aplicar el estilo de título 1 a las secciones principales', 'Aplicar el estilo de título 2 a los apartados', 'Aplicar el estilo de texto al cuerpo', 'Comprobar en el panel de navegación que los títulos aparecen en orden'],
        pista: '<p>Primero va el texto, después los títulos de nivel más alto y al final la comprobación.</p>',
        solucion: '<p>El orden es escribir el texto, aplicar el título 1 a las secciones, el título 2 a los apartados, el estilo de texto al cuerpo y comprobar en el panel de navegación. Si el panel muestra solo los títulos que quieres, la estructura está bien.' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos niveles de título muestra la jerarquía del diagrama?</p>', respuesta: 3,
        pista: '<p>Cuenta las cajas que llevan la palabra título, sin contar la del texto del cuerpo.</p>',
        solucion: '<p>Son tres niveles: título 1, título 2 y título 3. Cada nivel baja un escalón en el diagrama, y el texto del cuerpo, que no es un título, se queda al final.' },
    ],
    fuentes: [
      LO('Crear estilos nuevos a partir de una selección', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/stylist_fromselect.xhp'),
      LO('Actualizar estilos a partir de una selección', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/stylist_update.xhp'),
      LO('Panel de navegación en los documentos de texto', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/navigator.xhp'),
      LO('Usar estilos de otro documento o de una plantilla', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/load_styles.xhp'),
      LO('El foco de estilos', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/spotlight_styles.xhp'),
      LO('Crear una tabla de contenido', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/indices_toc.xhp'),
    ],
  });

  // ------------------------------------------------------------------
  // Una lista con viñetas, una lista numerada y una tabla de tres filas y dos columnas.
  const LISTAS_TABLA = diagrama([0, 16], [0, 10], [
    { tipo: 'poligono', puntos: [[0.6, 5.6], [7.4, 5.6], [7.4, 9.2], [0.6, 9.2]] },
    txt(4.0, 8.75, 'Lista con viñetas'),
    { tipo: 'circulo', x: 1.15, y: 8.0, r: 0.22, solido: true },
    { tipo: 'linea', desde: [1.8, 8.0], hasta: [6.6, 8.0] },
    { tipo: 'circulo', x: 1.15, y: 7.2, r: 0.22, solido: true },
    { tipo: 'linea', desde: [1.8, 7.2], hasta: [5.9, 7.2] },
    { tipo: 'circulo', x: 1.15, y: 6.4, r: 0.22, solido: true },
    { tipo: 'linea', desde: [1.8, 6.4], hasta: [6.2, 6.4] },
    { tipo: 'poligono', puntos: [[8.6, 5.6], [15.4, 5.6], [15.4, 9.2], [8.6, 9.2]] },
    txt(12.0, 8.75, 'Lista numerada'),
    txt(9.3, 8.0, '1'), { tipo: 'linea', desde: [9.9, 8.0], hasta: [14.7, 8.0] },
    txt(9.3, 7.2, '2'), { tipo: 'linea', desde: [9.9, 7.2], hasta: [13.8, 7.2] },
    txt(9.3, 6.4, '3'), { tipo: 'linea', desde: [9.9, 6.4], hasta: [14.2, 6.4] },
    { tipo: 'poligono', puntos: [[0.6, 0.5], [15.4, 0.5], [15.4, 5.0], [0.6, 5.0]] },
    { tipo: 'linea', desde: [0.6, 3.33], hasta: [15.4, 3.33] },
    { tipo: 'linea', desde: [0.6, 1.67], hasta: [15.4, 1.67] },
    { tipo: 'linea', desde: [8.0, 0.5], hasta: [8.0, 5.0] },
    txt(4.3, 4.25, 'Material'), txt(11.7, 4.25, 'Unidades'),
    txt(4.3, 2.5, 'Tornillos'), txt(11.7, 2.5, '12'),
    txt(4.3, 1.08, 'Clavos'), txt(11.7, 1.08, '8'),
  ], 'Diagrama con tres bloques. Arriba a la izquierda, una lista con viñetas: tres marcas redondas pequeñas delante de tres líneas de texto. Arriba a la derecha, una lista numerada: los números 1, 2 y 3 delante de otras tres líneas. Abajo, una tabla de tres filas y dos columnas: la primera fila es la de encabezado, con las palabras Material y Unidades; debajo, una fila con Tornillos y 12, y otra fila con Clavos y 8.');

  // ------------------------------------------------------------------
  // Tres casos de anclaje de una imagen sobre un bloque de texto.
  const ANCLAJE = diagrama([0, 18], [0, 8], [
    { tipo: 'poligono', puntos: [[0.3, 1.0], [5.5, 1.0], [5.5, 6.6], [0.3, 6.6]] },
    txt(2.9, 7.05, 'Al párrafo'),
    { tipo: 'linea', desde: [0.7, 6.0], hasta: [3.7, 6.0] },
    { tipo: 'linea', desde: [0.7, 5.5], hasta: [4.5, 5.5] },
    { tipo: 'linea', desde: [0.7, 5.0], hasta: [3.3, 5.0] },
    { tipo: 'poligono', puntos: [[0.8, 3.5], [2.7, 3.5], [2.7, 4.7], [0.8, 4.7]], relleno: true },
    { tipo: 'circulo', x: 1.35, y: 4.4, r: 0.16 },
    { tipo: 'circulo', x: 0.95, y: 3.25, r: 0.2, solido: true },
    { tipo: 'linea', desde: [1.35, 2.85], hasta: [4.4, 2.85] },
    { tipo: 'linea', desde: [0.7, 2.3], hasta: [4.0, 2.3] },
    { tipo: 'poligono', puntos: [[6.4, 1.0], [11.6, 1.0], [11.6, 6.6], [6.4, 6.6]] },
    txt(9.0, 7.05, 'Al carácter'),
    { tipo: 'linea', desde: [6.8, 6.0], hasta: [10.6, 6.0] },
    { tipo: 'linea', desde: [6.8, 5.5], hasta: [9.4, 5.5] },
    { tipo: 'linea', desde: [6.8, 4.6], hasta: [7.9, 4.6] },
    { tipo: 'poligono', puntos: [[8.2, 4.2], [9.8, 4.2], [9.8, 5.0], [8.2, 5.0]], relleno: true },
    { tipo: 'linea', desde: [10.1, 4.6], hasta: [11.2, 4.6] },
    { tipo: 'circulo', x: 8.0, y: 4.6, r: 0.16, solido: true },
    { tipo: 'linea', desde: [6.8, 3.6], hasta: [10.4, 3.6] },
    { tipo: 'linea', desde: [6.8, 3.1], hasta: [9.8, 3.1] },
    { tipo: 'poligono', puntos: [[12.5, 1.0], [17.7, 1.0], [17.7, 6.6], [12.5, 6.6]] },
    txt(15.1, 7.05, 'A la página'),
    { tipo: 'linea', desde: [12.9, 5.9], hasta: [15.2, 5.9] },
    { tipo: 'linea', desde: [12.9, 5.4], hasta: [15.2, 5.4] },
    { tipo: 'poligono', puntos: [[15.6, 5.2], [17.4, 5.2], [17.4, 6.3], [15.6, 6.3]], relleno: true },
    { tipo: 'circulo', x: 12.85, y: 6.35, r: 0.2, solido: true },
    { tipo: 'linea', desde: [12.9, 4.6], hasta: [16.9, 4.6] },
    { tipo: 'linea', desde: [12.9, 4.1], hasta: [16.1, 4.1] },
    { tipo: 'linea', desde: [12.9, 3.6], hasta: [16.9, 3.6] },
    { tipo: 'linea', desde: [12.9, 3.1], hasta: [15.4, 3.1] },
  ], 'Diagrama con tres hojas de muestra, una al lado de la otra. En la primera, la imagen está dentro del texto y el punto relleno del símbolo de anclaje está en el párrafo que la sostiene. En la segunda, la imagen está en mitad de una línea de texto, como si fuera una letra, y el punto de anclaje está en esa misma línea. En la tercera, la imagen está en la esquina superior derecha y el punto de anclaje está en la esquina de la hoja, lejos de cualquier línea de texto.');

  // ------------------------------------------------------------------
  // Una hoja con las tres zonas: encabezado, cuerpo y pie de página.
  const PAGINA = diagrama([0, 11], [0, 16], [
    { tipo: 'poligono', puntos: [[3.0, 0.8], [8.6, 0.8], [8.6, 15.2], [3.0, 15.2]] },
    { tipo: 'linea', desde: [3.8, 13.8], hasta: [7.8, 13.8], punteada: true },
    { tipo: 'linea', desde: [3.8, 2.2], hasta: [7.8, 2.2], punteada: true },
    { tipo: 'linea', desde: [3.8, 2.2], hasta: [3.8, 13.8], punteada: true },
    { tipo: 'linea', desde: [7.8, 2.2], hasta: [7.8, 13.8], punteada: true },
    { tipo: 'poligono', puntos: [[3.8, 12.9], [7.8, 12.9], [7.8, 13.8], [3.8, 13.8]], relleno: true },
    txt(5.8, 13.45, 'Encabezado'),
    { tipo: 'linea', desde: [4.0, 12.0], hasta: [7.6, 12.0] },
    { tipo: 'linea', desde: [4.0, 11.3], hasta: [7.6, 11.3] },
    { tipo: 'linea', desde: [4.0, 10.6], hasta: [7.0, 10.6] },
    { tipo: 'linea', desde: [4.0, 9.9], hasta: [7.6, 9.9] },
    txt(5.8, 8.6, 'Cuerpo'), txt(5.8, 8.0, 'del texto'),
    { tipo: 'linea', desde: [4.0, 6.9], hasta: [7.6, 6.9] },
    { tipo: 'linea', desde: [4.0, 6.2], hasta: [6.8, 6.2] },
    { tipo: 'poligono', puntos: [[3.8, 2.2], [7.8, 2.2], [7.8, 3.1], [3.8, 3.1]], relleno: true },
    txt(5.8, 2.72, 'Pie de página'),
    txt(1.5, 8.0, 'Márgenes'),
    ...flecha([2.4, 8.0], [3.4, 8.0], 0, 0.9),
  ], 'Diagrama de una hoja con tres zonas. La hoja es el rectángulo grande; los márgenes son el borde en blanco que la rodea, señalados con una flecha que viene de la palabra Márgenes. Arriba, dentro del margen superior, está el encabezado, en una franja sombreada. Abajo, dentro del margen inferior, está el pie de página, también sombreado. En el centro, entre líneas punteadas, está el cuerpo del texto, con cuatro líneas por encima de la palabra Cuerpo del texto y dos por debajo.');

  // ------------------------------------------------------------------
  L('Listas y tablas', {
    objetivo: 'Convertir un bloque de texto en una lista, anidar sus apartados y ordenar la información en una tabla con su fila de encabezado.',
    vidaReal: `
      <p>En una hoja de instrucciones de un mueble, los pasos vienen uno detrás de otro y es fácil saltarse uno. Cuando comparas precios de tres tiendas, lo que se ordena en columnas ayuda mucho más que un párrafo largo. Y en una receta, el orden de los pasos importa y el de los ingredientes no. Son tres cosas distintas, y un documento bien hecho las resuelve de tres maneras: con pasos numerados, con elementos que llevan una marca delante y con los datos comparados en columnas.</p>`,
    explicacion: `
      <p>Un mueble viene con sus instrucciones en un solo bloque: «saca las piezas del cartón, atornilla la barra superior, atornilla la inferior, pon las patas en los huecos y aprieta todo». Las cinco frases son correctas, pero es fácil saltarse una. Un bloque así esconde la estructura del trabajo, y una lista la vuelve visible.</p>
      <h3>Dos tipos de lista</h3>
      <p>Una <strong>viñeta</strong> (<span lang="en">bullet</span>) es la marca que precede a cada elemento de una lista en la que el orden no importa: el punto o el guion que ves delante de la palabra. La usas cuando da igual el orden, como en la lista de ingredientes de un postre.</p>
      <p>La <strong>numeración</strong> (<span lang="en">numbering</span>) es la lista cuyos elementos van numerados, y se usa cuando el orden sí importa: los pasos de un montaje, las etapas de un experimento, las prioridades de una lista de tareas. En los dos casos el gesto es el mismo: seleccionas los párrafos y pulsas el icono de lista, el de la viñeta si el orden no importa y el de la numeración si importa. Si lo pulsas otra vez, la lista se deshace.</p>
      <h3>Listas dentro de listas</h3>
      <p>Una lista puede meterse dentro de otra. La sangría es ese hueco que queda al principio de la línea, y deja claro que un elemento depende del de arriba. En las instrucciones del mueble, «atornilla la barra superior» puede llevar debajo tres subpasos, cada uno sangrado hacia la derecha. Y hay un detalle que el programa resuelve solo: si mueves un elemento de una lista numerada a otro sitio, la cuenta sigue y los números no se repiten.</p>
      <h3>La tabla, para comparar</h3>
      <p>Una <strong>tabla</strong> (<span lang="en">table</span>) es una rejilla de filas y columnas que sirve para comparar cosas que tienen las mismas características. Cada fila es un elemento y cada columna, una característica. Arriba va la fila de encabezado, que dice de qué es cada columna, para que nadie tenga que adivinarlo. Insertarla es fácil: colocas el cursor donde la quieres y eliges Tabla - Insertar tabla, diciendo cuántas filas y columnas vas a usar. También puedes arrastrar sobre la rejilla del icono de tabla hasta marcar las que necesitas.</p>
      <p>Y hay tres cuidados con las tablas. El primero: si la tabla es larga, la fila de encabezado se puede repetir en cada página nueva, para que quien lea la página tres sepa qué significa cada columna. El segundo: el ancho de una columna se ajusta arrastrando la línea que la separa de la vecina. El tercero: si una fila ha quedado en el sitio equivocado, la mueves arrastrándola o cortándola y pegándola donde va; es una operación corriente, aunque cada programa la llama de forma distinta.</p>
      ${LISTAS_TABLA}
      <p>En el diagrama están las tres cosas: una lista con viñetas, una lista numerada y una tabla de tres filas y dos columnas con su fila de encabezado.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Elemento</th><th>Para qué sirve</th></tr></thead>
        <tbody>
          <tr><th scope="row">Viñeta</th><td>Marca cada elemento sin obligar a leerlo en un orden.</td></tr>
          <tr><th scope="row">Numeración</th><td>Da un número a cada elemento para que se vea la secuencia.</td></tr>
          <tr><th scope="row">Sangría</th><td>Separa un elemento del que está por encima, dentro de una lista.</td></tr>
          <tr><th scope="row">Fila de encabezado</th><td>Explica de qué es cada columna y se repite en cada página.</td></tr>
          <tr><th scope="row">Mover una fila</th><td>Cambia el orden de los datos sin rehacer la tabla entera.</td></tr>
        </tbody>
      </table></div>
      <p>Una lista con sangrías ya tiene la forma de una sección con apartados, y por eso los estilos de párrafo de la lección "Estilos y títulos" se apoyan en ellas. Y si quieres una tabla que calcule, eso ya no es un documento de texto: lo explica la lección "Celdas, filas y columnas" de la unidad de hojas de cálculo.</p>
      <p class="nota"><strong>Trampa común:</strong> meter en una tabla de texto los cálculos que hay que hacer. Una tabla de texto sirve para comparar y ordenar, no para calcular: en cuanto necesitas fórmulas, el trabajo se va a una hoja de cálculo.</p>`,
    ejemplo: `
      <p>Escribes cinco instrucciones de montaje en un solo bloque y quieres que se entiendan de un vistazo.</p>
      <ol class="pasos-ej">
        <li>Marcas los cinco párrafos y pulsas el icono de lista numerada. Los pasos quedan numerados y se ve el orden.</li>
        <li>El paso «atornilla la barra superior» lleva tres subpasos. Escribes el primero debajo y pulsas Intro, y el párrafo siguiente se numera solo. Le aplicas la sangría y repites con los otros.</li>
        <li>Ahora comparas dos tipos de tornillo en dos tiendas: seleccionas esas partes y eliges Tabla - Insertar tabla, con dos columnas y tres filas.</li>
        <li>Escribes los encabezados: «Material» y «Unidades». Debajo, una fila por material, con su cantidad.</li>
        <li>Mueves la fila del clavo, que estaba antes que la de los tornillos, y lo compruebas contando: tres filas, dos columnas, y una de encabezado.</li>
      </ol>
      <p>Resultado: <span class="resultado">pasos numerados, un apartado sangrado y una tabla de tres filas y dos columnas</span>.</p>
      <p class="nota"><strong>Error común:</strong> numerar la lista y dejar los subpasos al mismo nivel, sin sangrarlos. Así el lector no distingue «atornilla la barra» de «aprieta el tornillo», que son cosas muy distintas.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuándo conviene una lista con viñetas en vez de una lista numerada?</p>',
        opciones: ['Cuando el orden de los elementos no importa', 'Cuando hay que seguir unos pasos en un orden exacto', 'Cuando los elementos van dentro de una tabla', 'Cuando el texto va centrado en la página'], correcta: 0,
        pista: '<p>Piensa en la lista de ingredientes de una receta y en los pasos de montaje de un mueble.</p>',
        solucion: '<p>La viñeta se usa cuando el orden no importa, como en la lista de ingredientes. La numeración se usa cuando el orden importa, como en los pasos de un montaje: los números muestran la secuencia.' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es la fila de encabezado de una tabla?</p>',
        opciones: ['La última fila, que cierra la tabla', 'Una fila que se borra al imprimir', 'La primera fila, que dice de qué es cada columna', 'La fila que separa las celdas entre sí'], correcta: 2,
        pista: '<p>Es la fila que le da las etiquetas a las columnas.</p>',
        solucion: '<p>Es la primera fila de la tabla, la que dice de qué es cada columna. Así quien lee el documento no tiene que adivinar qué significa cada dato, y en las tablas largas se puede repetir en cada página nueva.' },
      { tipo: 'opciones', enunciado: '<p>Una tabla ocupa tres páginas. ¿Qué puedes hacer con la fila de encabezado?</p>',
        opciones: ['Dejarla en blanco en las páginas siguientes', 'Repetirla en cada página nueva', 'Borrarla para que la tabla quepa', 'No se puede tocarla una vez escrita'], correcta: 1,
        pista: '<p>Piensa en quien lee la tercera página sin ver las dos primeras.</p>',
        solucion: '<p>Se puede repetir en cada página nueva que abarque la tabla, marcando las casillas de encabezado y de repetir las filas de encabezado en páginas nuevas. Así cada página se entiende sola.' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la lista cuyos elementos van numerados porque el orden importa?</p>',
        respuestas: ['numeración', 'la numeración', 'numbering'],
        pista: '<p>Es la lista en la que cada elemento tiene un número delante.</p>',
        solucion: '<p>Se llama numeración (numbering). Se aplica con el icono de lista ordenada, y al mover un elemento de la lista a otro sitio la cuenta sigue, sin repetir números.' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para pasar un bloque de texto a una lista.</p>',
        respuesta: ['Seleccionar los párrafos que forman la lista', 'Pulsar el icono de lista con viñetas o de lista numerada', 'Escribir el siguiente elemento y aplicarle la sangría si es un subapartado', 'Revisar que los elementos quedan en la posición correcta'],
        pista: '<p>Primero eliges qué párrafos entran en la lista, y solo después le pones la marca.</p>',
        solucion: '<p>El orden es seleccionar, pulsar el icono de lista, escribir los elementos siguientes y revisar. Si la lista lleva subapartados, a esos se les aplica la sangría para que se vea que dependen del elemento de arriba.' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas celdas tiene en total la tabla del diagrama?</p>', respuesta: 3 * 2,
        pista: '<p>Cuenta las filas y las columnas de la tabla y multiplica.</p>',
        solucion: '<p>La tabla tiene tres filas y dos columnas, así que 3 × 2 = <strong>6</strong> celdas. Una de esas filas es la de encabezado, con las palabras Material y Unidades.' },
    ],
    fuentes: [
      LO('Añadir viñetas', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/using_numbered_lists.xhp'),
      LO('Añadir numeración', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/using_numbered_lists2.xhp'),
      LO('Insertar tablas', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/table_insert.xhp'),
      LO('Redimensionar filas y columnas en una tabla de texto', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/table_sizing.xhp'),
      LO('Repetir el encabezado de una tabla en una página nueva', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/table_repeat_multiple_headers.xhp'),
    ],
  });

  // ------------------------------------------------------------------
  L('Imágenes en el documento', {
    objetivo: 'Insertar una imagen, decidir a qué punto del documento queda pegada, cambiar su tamaño sin deformarla y escribir la descripción que la sustituye.',
    vidaReal: `
      <p>Metes en un trabajo la foto de la tortuga que encontraste y el texto se descuadra. La estiras un poco y sale deformada, con la cara más ancha de lo que es. Y hay quien lee el documento con un programa que lo lee en voz alta: si la imagen no dice qué lleva, esa persona se queda sin saber qué hay en la foto. Colocar bien una imagen es, en el fondo, dos cosas: dejarla en su sitio y explicarla con palabras.</p>`,
    explicacion: `
      <p>Insertar una imagen es la parte fácil: la buscas en el equipo y la metes en el texto. Lo difícil es decidir dónde queda y cómo se mueve. Si no lo decides, la imagen se coloca donde hiciste clic y el texto se descuadra alrededor.</p>
      <h3>El anclaje: el punto de referencia</h3>
      <p>El <strong>anclaje</strong> (<span lang="en">anchor</span>) es el punto del documento al que queda pegada la imagen, y de él depende cómo se mueve. Hay tres casos. Anclada a un párrafo, la imagen va y viene con él: si escribes más líneas antes, la imagen baja con ellos. Anclada a un carácter, se comporta como una letra. Anclada a la página, se queda quieta en un punto fijo de la hoja, y el texto pasa por detrás o por delante de ella.</p>
      <p>El programa coloca la imagen por defecto centrada sobre el párrafo en el que hiciste clic, y desde ahí decides si la dejas donde está o le cambias el anclaje. El comando está en el menú de la imagen.</p>
      ${ANCLAJE}
      <p>En el diagrama, el punto relleno es el símbolo de anclaje: en el primer caso está en el párrafo que sostiene la imagen, en el segundo en la línea donde hace de letra, y en el tercero en la esquina de la hoja.</p>
      <h3>Redimensionar sin deformar</h3>
      <p><strong>Redimensionar</strong> (<span lang="en">resize</span>) una imagen es cambiarle el tamaño, y aquí hay una trampa fácil de caer. Si cambias el ancho y el alto por separado, la foto sale estirada: una cara queda más ancha de lo que es. La solución es mantener las proporciones, o sea, hacer que el ancho y el alto cambien en la misma medida. Si el programa te da esa opción al cambiar el tamaño, actívala. Y si la imagen es más ancha que la página, ajústala al ancho del texto antes que reducirla a ojo.</p>
      <h3>El contorno del texto</h3>
      <p>Con la imagen ya colocada, falta decidir qué hace el texto que la rodea. El contorno es la forma en que el texto se acomoda alrededor de la imagen. La opción más corriente es que el texto fluya en paralelo: la imagen ocupa su sitio y las líneas pasan por el lado libre. También se puede cambiar la forma del contorno, y si prefieres que la imagen quede delante o detrás del texto, esa es otra opción aparte.</p>
      <h3>La descripción de la imagen</h3>
      <p>Hay un detalle que no es un adorno: la imagen necesita una descripción guardada con ella, que se llama <strong>texto alternativo</strong> (<span lang="en">alt text</span>). Es el equivalente en texto de un objeto que no es texto. Cuando alguien usa un lector de pantalla, lo que se lee en voz alta es ese texto alternativo, no la imagen.</p>
      <p>Y lo que se escribe depende de la imagen. Si es una gráfica de datos, la descripción da sentido a quien no ve la gráfica: tiene que decir qué se compara y qué dato llama la atención. Si es una foto decorativa, que solo está para que la página se vea más bonita, se marca como decorativa y se deja vacía. La lección "Leer gráficas e infografías" de Lectura explica qué información debe llevar una imagen de datos, y la lección "Imágenes y gráficos en presentaciones" trabaja las mismas decisiones en las diapositivas.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Ajuste</th><th>Qué hace</th></tr></thead>
        <tbody>
          <tr><th scope="row">Mantener proporciones</th><td>Cambia el ancho y el alto en la misma medida.</td></tr>
          <tr><th scope="row">Ajustar al ancho</th><td>Hace que la imagen ocupe el ancho del texto.</td></tr>
          <tr><th scope="row">Contorno del texto</th><td>Decide si el texto fluye alrededor o si la imagen va delante.</td></tr>
          <tr><th scope="row">Texto alternativo</th><td>Guarda con la imagen la descripción que leen los lectores de pantalla.</td></tr>
        </tbody>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> estirar la imagen arrastrando solo un tirador de esquina. La foto queda deformada y el texto se descuadra. Cambia el tamaño manteniendo la proporción y comprueba el resultado con el documento abierto en otro tamaño de pantalla.</p>`,
    ejemplo: `
      <p>Entregas un trabajo de ciencias con la foto de una tortuga que encontraste.</p>
      <ol class="pasos-ej">
        <li>Colocas el cursor donde va la foto y la insertas desde el equipo. El programa la deja centrada sobre ese párrafo, así que la mueves de sitio.</li>
        <li>La foto es más ancha que el texto. La ajustas al ancho del texto y compruebas que el alto cambia en la misma medida, porque mantienes la proporción y no sale estirada.</li>
        <li>Eliges que el texto fluya alrededor, en paralelo, para que las líneas no se metan bajo la foto.</li>
        <li>Escribes el texto alternativo: «Tortuga de caparazón oscuro sobre la hierba, con el cuello estirado hacia la izquierda». Es lo que oye quien no ve la foto.</li>
        <li>Guardas y abres el documento en otro tamaño de pantalla: si el texto sigue en su sitio y la foto no está deformada, está bien.</li>
      </ol>
      <p>Resultado: <span class="resultado">una foto en su sitio, del tamaño correcto y con su descripción</span>.</p>
      <p class="nota"><strong>Error común:</strong> ampliar la imagen arrastrando solo el tirador de una esquina. La tortuga sale con la cara ancha y empuja el texto.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué es el anclaje de una imagen?</p>',
        opciones: ['El marco que dibuja el programa alrededor de la imagen', 'El punto del documento al que queda pegada la imagen', 'El tamaño que tiene la imagen en la página', 'El nombre del archivo de la imagen'], correcta: 1,
        pista: '<p>Piensa en qué decide de dónde no se mueve la imagen cuando escribes más texto.</p>',
        solucion: '<p>El anclaje es el punto de referencia al que queda pegada la imagen: un párrafo, un carácter o la página. De eso depende si la imagen se mueve con el texto o se queda quieta en la hoja.' },
      { tipo: 'opciones', enunciado: '<p>Estiras una foto cambiando solo el ancho y dejando el alto como estaba. ¿Qué pasa?</p>',
        opciones: ['La imagen sale deformada, porque pierde las proporciones', 'No cambia nada, porque el programa no deja hacerlo', 'La imagen se borra del documento', 'El texto se vuelve más grande para dejarla sitio'], correcta: 0,
        pista: '<p>Una cara de tortuga puede quedar más ancha de lo que es de verdad.</p>',
        solucion: '<p>La imagen sale deformada, porque el ancho y el alto ya no guardan la misma proporción. La solución es mantener las proporciones al cambiar el tamaño, y comprobarlo con el documento abierto en otro tamaño de pantalla.' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve el texto alternativo de una imagen?</p>',
        opciones: ['Para poner el pie de foto que sale debajo de la imagen', 'Para renombrar el archivo de la imagen', 'Para guardar con la imagen la descripción que leen los lectores de pantalla', 'Para que la imagen se imprima en color'], correcta: 2,
        pista: '<p>Piensa en quien usa un lector de pantalla y no ve la imagen.</p>',
        solucion: '<p>El texto alternativo es la descripción que se guarda con la imagen y que leen los lectores de pantalla. En una gráfica de datos, esa descripción es la que da sentido a quien no ve la gráfica.' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el punto del documento al que queda pegada una imagen?</p>',
        respuestas: ['anclaje', 'el anclaje', 'anchor'],
        pista: '<p>Es la palabra que en inglés empieza por «a» y que oirás junto a la palabra imagen.</p>',
        solucion: '<p>Se llama anclaje (anchor). Puede ser a un párrafo, a un carácter o a la página, y de él depende cómo se mueve la imagen cuando escribes más texto.' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para insertar y colocar bien una imagen.</p>',
        respuesta: ['Insertar la imagen desde el equipo en el punto del texto', 'Ajustar su tamaño manteniendo las proporciones', 'Elegir el contorno para que el texto fluya alrededor', 'Escribir el texto alternativo que la describe', 'Guardar y comprobar el resultado en otro tamaño de pantalla'],
        pista: '<p>Primero metes la imagen, después la colocas y al final la describes.</p>',
        solucion: '<p>El orden es insertar, ajustar el tamaño, elegir el contorno, escribir el texto alternativo y comprobar. El paso del texto alternativo no se puede saltar: sin él, quien lee con lector de pantalla se queda sin saber qué hay en la imagen.' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos casos de anclaje muestra el diagrama de la lección?</p>', respuesta: 3,
        pista: '<p>Cuenta las hojas de muestra del diagrama.</p>',
        solucion: '<p>Son tres: al párrafo, al carácter y a la página. En el primero la imagen sigue al párrafo, en el segundo se comporta como una letra y en el tercero se queda quieta en un punto fijo de la hoja.' },
    ],
    fuentes: [
      LO('Posicionar objetos (anclaje)', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/anchor_object.xhp'),
      LO('Hacer que el texto fluya alrededor de los objetos', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/wrap.xhp'),
      LO('Insertar un gráfico desde un archivo', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/insert_graphic_dialog.xhp'),
      WIKI('Texto_alternativo', 'Texto alternativo'),
    ],
  });

  // ------------------------------------------------------------------
  L('Encabezados, pies de página y numeración', {
    objetivo: 'Añadir un encabezado y un pie de página al documento, numerar las páginas y dejar la primera página distinta del resto.',
    vidaReal: `
      <p>Cuando llevas un informe de diez páginas al colegio o a la oficina, cada hoja necesita saber de qué es y en cuál estás. Sin eso, las páginas se mezclan y nadie encuentra el apartado que falta. Además, una portada no lleva el nombre del informe arriba, porque ya está en grande en el centro. Y si el documento va a quedar encuadernado, conviene que el número esté siempre en el mismo sitio, se mire la hoja por el anverso o por el reverso.</p>`,
    explicacion: `
      <p>Imprimes un documento de diez páginas y ninguna dice de qué es ni en cuál estás. Al pasar las hojas, no se distinguen. Un buen documento resuelve eso con tres zonas que se repiten en todas las páginas.</p>
      <h3>El encabezado y el pie de página</h3>
      <p>El <strong>encabezado</strong> (<span lang="en">header</span>) es la franja de arriba de cada página, y el <strong>pie de página</strong> (<span lang="en">footer</span>) es la franja de abajo. Las dos están en los márgenes, el espacio en blanco entre el texto y el borde de la hoja, y en ellas se puede escribir texto o poner un gráfico. En el encabezado suele ir el título del documento o el nombre de quien lo escribe; en el pie, el número de página y a veces la fecha.</p>
      <p>Para añadirlos se va al menú: Insertar - Encabezado y pie de página - Encabezado, y el programa pregunta a qué estilo de página se lo pones. El texto del cuerpo nunca invade esas zonas, así que no se pisa con el encabezado aunque la página esté llena.</p>
      ${PAGINA}
      <p>En el diagrama se ven las tres zonas de la hoja: el encabezado arriba, el cuerpo del texto en el medio y el pie de página abajo.</p>
      <h3>La primera página puede ser distinta</h3>
      <p>Muchos documentos, como una carta o un informe, tienen una primera página distinta de las demás. En una portada, repetir arriba el título del trabajo queda redundante. Para evitarlo, el programa permite dejar la primera página sin encabezado: en las opciones del estilo de página se desmarca la casilla de mismo contenido en la primera página.</p>
      <p>Hay otro caso parecido: los documentos que se imprimen a doble cara. En ellos, las páginas pares y las impares se leen al revés, así que conviene que el encabezado esté en el lado exterior de cada hoja. El programa puede aplicar estilos de página distintos a las pares y a las impares, y para eso se desmarca la casilla de mismo contenido a izquierda y derecha.</p>
      <h3>Numerar las páginas</h3>
      <p>La <strong>numeración de páginas</strong> (<span lang="en">page numbering</span>) es el número que se imprime en cada hoja. No es un número escrito a mano: es un hueco que el programa rellena y cambia según la página, así que al imprimir diez páginas salen los números del 1 al 10 sin que tengas que contarlos. Puedes insertarlo donde quieras, y también decidir que empiece en otro número si el documento es la parte segunda de algo.</p>
      <h3>Los márgenes mandan</h3>
      <p>Los márgenes son el borde en blanco de la hoja y se cambian en Formato - Estilo de página, en la pestaña Página, donde se define el valor de los cuatro márgenes: el izquierdo, el derecho, el superior y el inferior. Como el encabezado y el pie viven dentro de ellos, ensanchar los márgenes les deja sitio.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Elemento</th><th>Para qué sirve</th><th>Dónde se cambia</th></tr></thead>
        <tbody>
          <tr><th scope="row">Encabezado</th><td>Repite arriba el título del documento.</td><td>Insertar - Encabezado y pie de página - Encabezado.</td></tr>
          <tr><th scope="row">Pie de página</th><td>Repite abajo el número de página o la fecha.</td><td>Insertar - Encabezado y pie de página - Pie de página.</td></tr>
          <tr><th scope="row">Primera página distinta</th><td>Deja la portada sin encabezado.</td><td>En el estilo de página, desmarcando mismo contenido en la primera página.</td></tr>
          <tr><th scope="row">Números de página</th><td>Numera las hojas de forma automática.</td><td>Insertar - Número de página.</td></tr>
          <tr><th scope="row">Márgenes</th><td>Dan sitio al encabezado y al pie.</td><td>Formato - Estilo de página, en la pestaña Página.</td></tr>
        </tbody>
      </table></div>
      <p>Todo esto se ve luego en el papel o en el PDF: la lección "Exportar a PDF e imprimir" de esta unidad explica cómo llevar el documento a la impresora sin que se descuadre. Y si lo que rotulas es una carta, la lección "Escribir un correo formal" del inglés trata del mismo cuidado.</p>
      <p class="nota"><strong>Trampa común:</strong> escribir el número de página a mano en cada hoja. Se equivoca en cuanto el texto crece o se borra una página, y al final hay dos hojas con el mismo número. El número lo pone el programa.</p>`,
    ejemplo: `
      <p>Tienes un trabajo de cinco páginas y quieres que cada hoja diga qué es y en cuál estás.</p>
      <ol class="pasos-ej">
        <li>En el menú Insertar - Encabezado y pie de página - Encabezado, activas el encabezado y escribes el título, que aparece en todas las páginas.</li>
        <li>Activas el pie de página y escribes tu nombre y la fecha, que se repiten en cada hoja.</li>
        <li>Insertas el número de página en el centro del pie. El programa lo coloca solo en cada hoja, sin que escribas nada a mano.</li>
        <li>Como la primera página es una portada, desmarcas la casilla de mismo contenido en la primera página y quitas el encabezado de esa hoja.</li>
        <li>Miras la vista previa de dos páginas: compruebas que la numeración va del 1 al 5 y que el pie no choca con el texto.</li>
      </ol>
      <p>Resultado: <span class="resultado">cada hoja con el título, el nombre y su número de página</span>.</p>
      <p class="nota"><strong>Error común:</strong> activar el encabezado y no revisar la primera página. El título aparece dos veces en la portada, arriba y en el centro, y la portada parece un error.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Dónde va por lo común el número de página?</p>',
        opciones: ['En el pie de página, dentro del margen inferior', 'En el encabezado, en la parte de arriba', 'En la última línea del texto de cada página', 'En el nombre del archivo, antes de guardarlo'], correcta: 0,
        pista: '<p>Piensa en la franja de abajo de la hoja, la que se repite en todas las páginas.</p>',
        solucion: '<p>El número de página va en el pie de página, dentro del margen inferior. El programa lo coloca como un hueco que se rellena solo, de modo que sale el número correcto en cada hoja sin escribirlo a mano.' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve dejar la primera página con un encabezado distinto?</p>',
        opciones: ['Para que el número de página empiece en la página dos', 'Para que la portada no repita el título que ya lleva en grande', 'Para que el texto de la portada ocupe más sitio', 'Para que las páginas pares tengan otro formato'], correcta: 1,
        pista: '<p>Piensa en un informe o una carta, que empiezan con una hoja propia.</p>',
        solucion: '<p>Sirve para que la portada no repita el título que ya lleva en grande. Se consigue desmarcando la casilla de mismo contenido en la primera página, en las opciones del estilo de página.' },
      { tipo: 'opciones', enunciado: '<p>El texto del cuerpo del documento, ¿en qué zona puede invadir?</p>',
        opciones: ['En el encabezado, si la página está llena', 'En el pie de página, en la última línea', 'En ninguna zona: el encabezado y el pie son para el texto repetido', 'En los márgenes, cuando sobra sitio'], correcta: 2,
        pista: '<p>Las tres zonas de la hoja están separadas y el texto del cuerpo tiene la suya.</p>',
        solucion: '<p>En ninguna zona. El encabezado y el pie de página son franjas aparte, dentro de los márgenes, para el texto que se repite en todas las páginas. El cuerpo del texto nunca entra en ellas, por eso no se pisan.' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la franja de abajo de cada página, dentro del margen inferior?</p>',
        respuestas: ['pie de página', 'el pie de página', 'pie de pagina', 'footer'],
        pista: '<p>Es la parte de la hoja que queda a los pies, y en ella suele ir el número de página.</p>',
        solucion: '<p>Se llama pie de página (footer). Es una franja del margen inferior donde se puede escribir texto o poner un gráfico, y lo que pongas ahí se repite en todas las hojas del documento.' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para rotular un documento con encabezado, pie y numeración.</p>',
        respuesta: ['Activar el encabezado y escribir el título del documento', 'Activar el pie de página y escribir el nombre o la fecha', 'Insertar el número de página en el pie', 'Dejar la primera página sin encabezado si es una portada', 'Revisar la vista previa y comprobar que la numeración es correcta'],
        pista: '<p>Empieza por arriba de la hoja y termina revisando el resultado.',
        solucion: '<p>El orden es activar el encabezado, activar el pie, insertar el número de página, tratar la primera página y revisar en la vista previa. Al final compruebas que la numeración va de la primera a la última y que el pie no choca con el texto.' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas zonas tiene la hoja en el diagrama de la lección?</p>', respuesta: 3,
        pista: '<p>Cuenta las zonas rotuladas de la hoja, sin contar los márgenes.</p>',
        solucion: '<p>Son tres: el encabezado, el cuerpo del texto y el pie de página. Los márgenes no son una zona del texto, sino el borde en blanco donde caben el encabezado y el pie.' },
    ],
    fuentes: [
      LO('Encabezados y pies de página', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/header_footer.xhp'),
      LO('Números de página', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/pagenumbers.xhp'),
      LO('Estilos de página alternos en páginas pares e impares', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/even_odd_sdw.xhp'),
      LO('Usar una página de título', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/title_page.xhp'),
      LO('Elegir el área máxima imprimible de una página (márgenes)', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/shared/guide/pageformat_max.xhp'),
    ],
  });

  // ------------------------------------------------------------------
  // Del estilo de los títulos al índice y de ahí a las páginas.
  const INDICE = diagrama([0, 12], [0, 11.2], [
    ...caja(6, 9.5, 8.6, 1.7, 'Títulos con estilos', true), txt(6, 8.95, 'cada sección con su estilo'),
    ...flecha([6, 8.65], [6, 8.05], 0, 0.7),
    ...caja(6, 7.2, 8.6, 1.7, 'Índice (campo)', true), txt(6, 6.65, 'un hueco que rellena el programa'),
    ...flecha([6, 6.35], [6, 5.75], 0, 0.7),
    ...caja(6, 4.9, 8.6, 1.7, 'Páginas', true), txt(6, 4.35, 'la lista con el número de cada sección'),
    txt(6, 2.7, 'De los títulos con estilos a las páginas'),
  ], 'Diagrama vertical de tres cajas unidas por flechas que bajan. Arriba, la caja Títulos con estilos, con la nota cada sección con su estilo. En el medio, la caja Índice (campo), con la nota un hueco que rellena el programa. Abajo, la caja Páginas, con la nota la lista con el número de cada sección. Debajo del todo, el rótulo De los títulos con estilos a las páginas.');

  // ------------------------------------------------------------------
  // Una hoja con texto tachado, texto añadido y una nota al margen.
  const REVISION = diagrama([0, 19], [4.4, 8.8], [
    { tipo: 'poligono', puntos: [[0.4, 5.0], [9.0, 5.0], [9.0, 8.5], [0.4, 8.5]] },
    txt(4.7, 7.7, 'Los ríos llegan al mar'),
    txt(2.5, 6.6, 'suave'),
    { tipo: 'linea', desde: [1.55, 6.6], hasta: [3.45, 6.6] },
    txt(4.9, 6.6, 'fuerte'),
    { tipo: 'linea', desde: [3.9, 6.2], hasta: [5.9, 6.2] },
    txt(4.7, 5.5, 'y forman deltas.'),
    { tipo: 'poligono', puntos: [[10.2, 5.2], [18.6, 5.2], [18.6, 8.0], [10.2, 8.0]] },
    { tipo: 'linea', desde: [9.0, 6.6], hasta: [10.2, 6.6] },
    txt(14.4, 7.6, 'Comentario'),
    txt(14.4, 6.7, '¿Por qué dices eso?'),
    txt(14.4, 5.8, 'No cambia el texto.'),
  ], 'Diagrama con una hoja a la izquierda y una nota a la derecha. En la hoja, un párrafo de tres líneas: «Los ríos llegan al mar»; en la segunda línea, la palabra suave con una línea horizontal que la tacha y, justo al lado, la palabra fuerte con una línea debajo; y en la tercera línea, «y forman deltas». De la hoja sale una línea horizontal que llega a una caja a la derecha, rotulada Comentario, con dentro la pregunta ¿Por qué dices eso? y la frase No cambia el texto.');

  // ------------------------------------------------------------------
  // Las dos salidas de un mismo documento: un archivo o el papel.
  const SALIDAS = diagrama([0, 12], [0, 13.2], [
    ...caja(6, 11.7, 7.4, 1.7, 'Documento', true), txt(6, 11.15, 'el archivo que editas'),
    ...flecha([4.5, 10.85], [3.4, 9.85], 0, 0.9),
    ...flecha([7.5, 10.85], [8.6, 9.85], 0, 0.9),
    ...caja(3.1, 8.9, 5.2, 1.7, 'Exportar', true), txt(3.1, 8.35, 'crea una copia'),
    ...flecha([3.1, 8.05], [3.1, 7.45], 0, 0.8),
    ...caja(3.1, 6.3, 5.2, 1.7, 'PDF', true), txt(3.1, 5.75, 'un archivo para mandar'),
    ...flecha([3.1, 5.45], [3.1, 4.85], 0, 0.8),
    ...caja(3.1, 3.7, 5.2, 1.7, 'Se ve igual', true), txt(3.1, 3.15, 'en cualquier equipo'),
    ...caja(8.9, 8.9, 5.2, 1.7, 'Imprimir', true), txt(8.9, 8.35, 'lo manda a la impresora'),
    ...flecha([8.9, 8.05], [8.9, 7.45], 0, 0.8),
    ...caja(8.9, 6.3, 5.2, 1.7, 'Papel', true), txt(8.9, 5.75, 'hojas con el documento'),
    ...flecha([8.9, 5.45], [8.9, 4.85], 0, 0.8),
    ...caja(8.9, 3.7, 5.2, 1.7, 'Vista previa', true), txt(8.9, 3.15, 'muestra lo que va a salir'),
    txt(6, 1.5, 'Dos salidas del mismo documento'),
  ], 'Diagrama vertical con una caja arriba, Documento, con la nota el archivo que editas. De ella salen dos flechas: la de la izquierda va a la caja Exportar, con la nota crea una copia, y sigue por flechas hasta la caja PDF, con la nota un archivo para mandar, y hasta la caja Se ve igual, con la nota en cualquier equipo. La de la derecha va a la caja Imprimir, con la nota lo manda a la impresora, y sigue por flechas hasta la caja Papel, con la nota hojas con el documento, y hasta la caja Vista previa, con la nota muestra lo que va a salir. Debajo del todo, el rótulo Dos salidas del mismo documento.');

  // ------------------------------------------------------------------
  L('Índice automático', {
    objetivo: 'Insertar un índice automático en un documento, elegir qué niveles de título entran en él y actualizarlo cuando el texto cambia.',
    vidaReal: `
      <p>Imagina un trabajo de veinte páginas sobre un tema: un capítulo sobre el agua, otro sobre las plantas y otro sobre los animales. Si el lector no tiene un índice, tiene que pasar páginas y páginas hasta encontrar el capítulo que busca. Un índice con el número de página de cada sección ahorra ese trabajo. Y si el trabajo crece, el índice tiene que crecer con él, sin que nadie lo vuelva a escribir a mano.</p>`,
    explicacion: `
      <p>Un documento de veinte páginas sin índice es un laberinto: quien lo lee tiene que pasar hojas y hojas hasta encontrar el apartado que busca. La parte difícil ya la tienes hecha: en la lección "Estilos y títulos" viste que las secciones se marcan con estilos de título, y con esos estilos el programa puede montar solo la lista de capítulos con su número de página.</p>
      <h3>Un índice que no se escribe a mano</h3>
      <p>El <strong>índice</strong> (<span lang="en">table of contents</span>) es la lista de las secciones del documento con la página en la que empieza cada una. Lo importante no es solo lo que se ve, sino quién lo escribe: el índice no lo escribes tú, lo construye el programa. Un índice escrito a mano se queda viejo en cuanto el texto crece, porque nadie vuelve a numerar las páginas después de cada cambio. El que construye el programa, en cambio, se vuelve a calcular cuando tú se lo pides.</p>
      <h3>El hueco que rellena el programa</h3>
      <p>Para que el programa pueda montarlo hacen falta dos cosas. La primera ya la tienes: las secciones marcadas con estilos de título. La segunda es que el índice se inserte como un <strong>campo</strong> (<span lang="en">field</span>), es decir, un hueco en el documento que el programa rellena solo. Los campos se usan para los datos que cambian dentro de un documento, como la fecha del día o el número total de páginas. El índice es uno de esos huecos, y por eso tiene un botón para recalcularlo.</p>
      <h3>Por qué el índice se queda viejo</h3>
      <p>Y aquí está la trampa, mejor saberla desde el principio: el índice no se actualiza solo. Si escribes un capítulo nuevo, el índice sigue enseñando la lista de antes, con los números de página viejos. No es un fallo: es que el programa no tiene forma de saber cuándo has terminado de escribir. Por eso, cuando el texto cambie, hay que <strong>actualizar</strong> (<span lang="en">update</span>) el índice, y hay un atajo que actualiza todos los campos del documento de una sola vez.</p>
      <h3>Qué niveles entran y cómo se quita</h3>
      <p>Al insertar el índice se decide qué niveles de título entran en la lista: solo los títulos de primer nivel, o también los de segundo y tercer nivel. También se puede cambiar el texto de un título sin que la lista se rompa, porque el índice lee lo que dice el título en ese momento. Y si el índice sobra, se quita entero sin tocar el resto del documento.</p>
      ${INDICE}
      <p>En el diagrama se ve el camino que sigue el programa: de los títulos con estilos sale el índice, que es un campo, y del campo salen las páginas. Lo que hay que cuidar es el paso del medio, porque de él depende que la lista esté al día.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Paso</th><th>Qué pasa</th></tr></thead>
        <tbody>
          <tr><th scope="row">Insertar el índice</th><td>El programa coloca el campo con la lista de títulos y sus páginas.</td></tr>
          <tr><th scope="row">Actualizar</th><td>El campo vuelve a calcularse y la lista refleja el texto actual.</td></tr>
          <tr><th scope="row">Cambiar los niveles</th><td>Se decide qué niveles de título entran en la lista.</td></tr>
          <tr><th scope="row">Quitar el índice</th><td>El campo se borra y el resto del documento no se toca.</td></tr>
        </tbody>
      </table></div>
      <p>La lección "Estilos y títulos" de esta unidad es la base de todo esto. La lección "Hacer un resumen", de Lectura, explica una cosa parecida pero distinta: el resumen cuenta de qué trata el texto, mientras que el índice dice dónde está cada parte. Y en la lección "Crear, guardar y abrir documentos" viste que el índice no es texto corriente, y por eso no se edita a mano.</p>
      <p class="nota"><strong>Trampa común:</strong> añadir un capítulo nuevo y no actualizar el índice. La lista sigue enseñando la estructura anterior y los números de página ya no cuadran con el texto. Si vas a imprimir o mandar el documento, actualiza el índice antes: es un segundo de trabajo que evita un error que se nota mucho.</p>`,
    ejemplo: `
      <p>Montas el índice de un trabajo de tres capítulos.</p>
      <ol class="pasos-ej">
        <li>Escribes el texto y marcas los tres capítulos con Título 1 y los apartados con Título 2. Sin eso, el índice no tiene nada que leer.</li>
        <li>Colocas el cursor en la página en blanco del principio e insertas el índice con Insertar - Tabla de contenido e índice - Tabla de contenido.</li>
        <li>En la ventana que se abre eliges qué niveles de título entran y pulsas Aceptar. Aparece la lista de capítulos con su página.</li>
        <li>Añades al final un cuarto capítulo con el estilo Título 1 y, con el botón derecho sobre el índice, eliges Actualizar índice. El capítulo nuevo entra en la lista y los números viejos se corrigen.</li>
        <li>Compruebas el resultado: el índice tiene cuatro capítulos y cada página coincide con donde empieza su capítulo.</li>
      </ol>
      <p>Resultado: <span class="resultado">un índice con los cuatro capítulos y el número de página de cada uno</span>.</p>
      <p class="nota"><strong>Error común:</strong> insertar el índice antes de aplicar los estilos de título. El programa no tiene nada que leer y la lista sale vacía. Marca primero los capítulos y después insértalo.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué es un campo dentro de un documento?</p>',
        opciones: ['Una palabra que el programa corrige mientras escribes', 'Un hueco que el programa rellena con un dato que puede cambiar', 'Una copia del documento con otro nombre', 'Una imagen pegada al principio del texto'], correcta: 1,
        pista: '<p>Piensa en lo que hay en un documento que cambia solo, como la fecha de hoy.</p>',
        solucion: '<p>Un campo es un hueco que el programa rellena con un dato que puede cambiar, como la fecha del día o el número total de páginas. El índice es uno de esos huecos, y por eso se le puede pedir que se recalcule.</p>' },
      { tipo: 'opciones', enunciado: '<p>Añades un capítulo nuevo al documento y el índice sigue igual que antes. ¿Por qué?</p>',
        opciones: ['Porque el índice no se actualiza solo: hay que pedirle al programa que lo recalcule', 'Porque los estilos de título se pierden al escribir', 'Porque el índice solo funciona en documentos de más de diez páginas', 'Porque el número de página de un capítulo nunca cambia'], correcta: 0,
        pista: '<p>El programa no puede saber cuándo has terminado de escribir el texto.</p>',
        solucion: '<p>Porque el índice no se actualiza solo. Es un campo, y hay que pedirle al programa que lo recalcule con el botón de actualizar índice o con el atajo que actualiza todos los campos del documento.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué necesita el programa para construir el índice de un documento?</p>',
        opciones: ['Un programa de dibujos para las ilustraciones', 'Que el documento tenga al menos una imagen', 'Que las secciones estén marcadas con estilos de título y que el índice se inserte como un campo', 'Que el documento esté guardado en la nube'], correcta: 2,
        pista: '<p>Son dos cosas: una que se marca en el texto y otra que se inserta en el documento.</p>',
        solucion: '<p>Hacen falta las dos: las secciones marcadas con estilos de título y el índice insertado como un campo. Si falta la primera, la lista sale vacía; si falta la segunda, el índice es texto escrito a mano y se queda viejo.' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la lista de las secciones de un documento con el número de página de cada una?</p>',
        respuestas: ['índice', 'el índice', 'índice automático', 'el índice automático', 'table of contents'],
        pista: '<p>Es la lista que va al principio de los libros, con el número de página al lado de cada capítulo.</p>',
        solucion: '<p>Se llama índice (table of contents). El que construye el programa no se escribe a mano: es un campo que se inserta en el documento y que hay que actualizar cada vez que el texto cambia.' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para poner un índice en un documento que ya está escrito.</p>',
        respuesta: ['Marcar los capítulos con el estilo de título', 'Colocar el cursor donde va el índice', 'Insertar el índice como campo', 'Elegir qué niveles de título entran en la lista', 'Actualizar el índice y comprobar los números de página'],
        pista: '<p>Primero se marca el texto y solo después se inserta la lista.',
        solucion: '<p>El orden es marcar los capítulos, colocar el cursor, insertar el índice, elegir los niveles y actualizar. Si insertas el índice antes de marcar los títulos, la lista sale vacía.' },
      { tipo: 'numero', enunciado: '<p>En el ejemplo, el trabajo empieza con tres capítulos y se añade uno más. ¿Cuántos capítulos tiene el índice al final?</p>', respuesta: 4,
        pista: '<p>Suma los capítulos que había al principio y el que se añadió después.</p>',
        solucion: '<p>Son <strong>4</strong>: tres capítulos al principio y uno más añadido al final, que aparece en el índice después de actualizarlo.' },
    ],
    fuentes: [
      LO('Crear una tabla de contenido', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/indices_toc.xhp'),
      LO('Definir las entradas de un índice o una tabla de contenido', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/indices_enter.xhp'),
      LO('Sobre los campos', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/fields.xhp'),
      WIKI('Campo_(inform%C3%A1tica)', 'Campo (informática)'),
    ],
  });

  // ------------------------------------------------------------------
  L('Ortografía, comentarios y control de cambios', {
    objetivo: 'Revisar la ortografía de un texto, dejar comentarios al lado de lo que se escribe y usar el control de cambios para corregir el trabajo de otra persona sin pisar lo que ya estaba.',
    vidaReal: `
      <p>En un trabajo de grupo, tres personas escribieron a la vez y nadie sabe qué cambió. Revisar ese texto con el corrector automático es trabajo de más, porque el programa a veces corrige lo que estaba bien, como un nombre propio. Y cuando alguien escribe al lado del texto para preguntar por qué dice algo, hace falta una forma de dejar esa nota sin tocar las frases. Esta lección reúne las tres herramientas que resuelven esos tres problemas.</p>`,
    explicacion: `
      <p>Al final de un trabajo de grupo queda un texto con errores y sin rastro de por qué dice lo que dice. Hay tres herramientas para esto, y conviene no confundirlas: una escribe por ti, otra te avisa de lo que no reconoce y la tercera deja constancia de los cambios de cada persona.</p>
      <h3>La autocorrección escribe por ti</h3>
      <p>La <strong>autocorrección</strong> (<span lang="en">autocorrect</span>) es una función muy común en los procesadores de texto: mientras escribes, pone mayúscula en la primera letra de la frase, cambia dos mayúsculas seguidas por una sola y corrige un par de palabras que casi siempre se escriben juntas. Es cómoda, pero a veces se equivoca. Se puede desactivar y se pueden añadir excepciones para que no toque abreviaturas concretas o palabras con mayúsculas y minúsculas mezcladas. Y si una corrección no te convence, el atajo de deshacer está a mano.</p>
      <h3>El corrector ortográfico avisa, no escribe</h3>
      <p>El corrector ortográfico es otra cosa: compara las palabras del texto con las de un diccionario y marca con una línea ondulada roja las que no reconoce. Al hacer clic derecho encima, el programa propone una lista de sustituciones. Para revisar el texto entero se abre el diálogo de ortografía, y hacen falta los diccionarios del idioma instalados. Y hay una limitación: un corrector no puede garantizar que un texto sea correcto, porque comprueba las palabras una por una sin mirar lo que significan.</p>
      <h3>El control de cambios no borra nada</h3>
      <p>Cuando dos personas trabajan en el mismo texto, el <strong>control de cambios</strong> (<span lang="en">track changes</span>) es el modo en el que el programa anota y guarda cada cambio. Con el modo activado, todo lo que añades queda subrayado en color y todo lo que borras se queda visible pero tachado: el texto original nunca se pierde. Si pasas el ratón por encima de un cambio, el programa te dice quién lo hizo y cuándo. Después, cada cambio se acepta o se rechaza, uno a uno o todos a la vez, desde el cuadro de gestión de cambios: aceptarlo lo conserva, rechazarlo lo deshace.</p>
      <p>El <strong>comentario</strong> (<span lang="en">comment</span>) es la otra vía, y es más sencilla: no cambia el texto, solo deja una nota pegada al punto que señalas, como una nota al margen. Por eso no hay nada que aceptar ni que rechazar: la nota es un comentario, y se borra cuando ya no hace falta. Como criterio general de estos programas, el comentario sirve para preguntar por qué dices algo sin reescribir la frase.</p>
      ${REVISION}
      <p>En el diagrama se ve cómo queda el texto con el control de cambios activado: lo tachado es lo que se borró, lo subrayado es lo que se añadió y la caja de la derecha es el comentario.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Herramienta</th><th>Qué hace</th><th>Qué se ve</th></tr></thead>
        <tbody>
          <tr><th scope="row">Autocorrección</th><td>Cambia palabras mientras escribes.</td><td>La palabra corregida, tal cual, en el texto.</td></tr>
          <tr><th scope="row">Corrector ortográfico</th><td>Compara con el diccionario y avisa de lo que no reconoce.</td><td>Una línea ondulada roja bajo la palabra.</td></tr>
          <tr><th scope="row">Control de cambios</th><td>Anota y guarda cada cambio del texto.</td><td>Lo añadido subrayado en color y lo borrado tachado.</td></tr>
          <tr><th scope="row">Comentario</th><td>Deja una nota al lado sin cambiar el texto.</td><td>Una nota pegada al punto que señalas.</td></tr>
          <tr><th scope="row">Aceptar o rechazar</th><td>Decide qué cambio se queda en el documento.</td><td>La lista de cambios del cuadro de gestión.</td></tr>
        </tbody>
      </table></div>
      <p>Las reglas de cuándo va una tilde o cuándo un punto va coma las explican las lecciones "Acentuación" y "Puntuación" de Lectura: el corrector solo compara palabras con un diccionario. Y si lo que revisas es un texto con argumentos, la lección "Escribir un ensayo argumentativo" de Lectura explica qué mirar más allá de las palabras.</p>
      <p class="nota"><strong>Trampa común:</strong> desactivar el control de cambios a mitad de la revisión y seguir corrigiendo. A partir de ahí los cambios se aplican directamente sobre el texto y se pierde el rastro de qué era de quién. Deja el modo activado hasta el final.</p>`,
    ejemplo: `
      <p>Revisas el trabajo de un compañero antes de entregarlo.</p>
      <ol class="pasos-ej">
        <li>Abres el documento y activas el control de cambios con Editar - Control de cambios - Registrar cambios. A partir de ahora, todo lo que escribas queda marcado.</li>
        <li>Corriges una frase: el compañero escribió «los ríos llegan al mar suave». Borras «suave» y escribes «fuerte». El programa lo enseña: lo borrado tachado y lo nuevo subrayado en color.</li>
        <li>Dejas un comentario sobre «fuerte» con la pregunta «¿de dónde sale ese dato?», para que la pregunta no se pierda.</li>
        <li>Desactivas el control de cambios y abres Editar - Control de cambios - Gestionar.</li>
        <li>Aceptas tu cambio y rechazas el otro, que no era tuyo y no quieres.</li>
        <li>Borras el comentario, que ya ha hecho su trabajo, y lees el texto final de corrido.</li>
      </ol>
      <p>Resultado: <span class="resultado">un texto con la corrección aceptada y sin notas pendientes</span>.</p>
      <p class="nota"><strong>Error común:</strong> aceptar todos los cambios de una vez sin mirarlos. Así se cuela un cambio que no era tuyo y que no quieres. Revísalos uno a uno.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué hace el control de cambios?</p>',
        opciones: ['Borra el texto anterior sin dejar rastro', 'Anota y guarda cada cambio, y el texto original se conserva', 'Corrige los errores de ortografía por ti', 'Añade una nota al margen del documento'], correcta: 1,
        pista: '<p>Piensa en lo que ves cuando escribes con el modo activado: hay algo tachado y algo subrayado.',
        solucion: '<p>El control de cambios anota y guarda cada cambio que se hace en el texto. Lo añadido queda subrayado en color y lo borrado se queda visible pero tachado, de modo que el texto original nunca se pierde.' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es la diferencia entre un comentario y un cambio?</p>',
        opciones: ['El comentario se borra al final; el cambio hay que aceptarlo o rechazarlo', 'Los dos se aceptan con el mismo botón del programa', 'El comentario cambia el texto y el cambio deja una nota al lado', 'El comentario solo se puede poner en el título del documento'], correcta: 0,
        pista: '<p>Uno de los dos no modifica el texto en absoluto.',
        solucion: '<p>El comentario no cambia el texto: es una nota pegada al punto que señalas, y se borra cuando ya no hace falta. El cambio sí modifica el texto, y por eso hay que decidir si se acepta o se rechaza.' },
      { tipo: 'opciones', enunciado: '<p>¿Qué puede cambiar la autocorrección?</p>',
        opciones: ['Puede poner el documento entero en otro idioma', 'Puede borrar todo lo que has escrito durante el día', 'Puede cambiar una palabra mientras escribes, sin que tú lo pidas', 'No puede cambiar nada: solo avisa de los errores'], correcta: 2,
        pista: '<p>Es la función que actúa mientras escribes, sin que pulses ningún botón.',
        solucion: '<p>La autocorrección cambia palabras mientras escribes, sin que tú lo pidas: la mayúscula inicial, dos mayúsculas seguidas o un par de palabras que se escriben juntas. Se puede desactivar y se pueden añadir excepciones para abreviaturas concretas.' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el modo en el que el programa anota y guarda cada cambio que se hace en un texto?</p>',
        respuestas: ['control de cambios', 'el control de cambios', 'control de cambio', 'track changes'],
        pista: '<p>Es lo que se activa para no pisar el trabajo de otra persona.',
        solucion: '<p>Se llama control de cambios (track changes). Con el modo activado, cada cambio queda anotado con tu nombre y la fecha, y después se acepta o se rechaza uno a uno.' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para revisar el trabajo de un compañero.</p>',
        respuesta: ['Activar el control de cambios', 'Corregir las frases que haga falta', 'Dejar un comentario donde haya que preguntar algo', 'Desactivar el control de cambios', 'Aceptar o rechazar los cambios uno a uno', 'Borrar los comentarios y leer el texto final'],
        pista: '<p>Empieza por activar el modo que deja constancia y termina limpiando lo que ya no hace falta.',
        solucion: '<p>El orden es activar el control de cambios, corregir, dejar el comentario, desactivar el modo, aceptar o rechazar los cambios y borrar los comentarios. Si desactivas el modo antes de tiempo, se pierde el rastro de qué cambio era de quién.' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas herramientas aparecen en la tabla de la lección?</p>', respuesta: 5,
        pista: '<p>Cuenta las filas de la tabla, sin contar el encabezado.',
        solucion: '<p>Son <strong>5</strong>: autocorrección, corrector ortográfico, control de cambios, comentario y aceptar o rechazar un cambio. Las dos primeras escriben o avisan por ti; las otras dos dejan constancia de lo que hizo cada persona.' },
    ],
    fuentes: [
      LO('Revisar la ortografía automáticamente', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/auto_spellcheck.xhp'),
      LO('Revisar la ortografía y la gramática', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/spellcheck_dialog.xhp'),
      LO('Añadir excepciones a la lista de autocorrección', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/autocorr_except.xhp'),
      LO('Registrar cambios', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/shared/guide/redlining_enter.xhp'),
      LO('Aceptar o rechazar cambios', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/shared/guide/redlining_accept.xhp'),
      WIKI('Corrector_ortogr%C3%A1fico', 'Corrector ortográfico'),
      WIKI('Autocorrecci%C3%B3n', 'Autocorrección'),
      WIKI('Control_de_cambios', 'Control de cambios'),
    ],
  });

  // ------------------------------------------------------------------
  L('Exportar a PDF e imprimir', {
    objetivo: 'Exportar un documento a PDF, decidir el formato de papel y la orientación, y usar la vista previa para imprimir solo las páginas que hacen falta.',
    vidaReal: `
      <p>Mandas un documento a otra persona y al otro lado se ve distinto, con las imágenes movidas y los párrafos descuadrados. Y cuando llevas el trabajo al colegio en papel, descubres que la última hoja ha salido en blanco o que el documento entero fue en horizontal. Convertir el trabajo en un archivo que se ve igual en cualquier sitio, y mirar antes de gastar una hoja, son dos gestos que evitan los dos problemas.</p>`,
    explicacion: `
      <p>Mandas un documento y al otro lado se ve distinto: las imágenes se han movido, los párrafos no caen donde deberían y el texto se ha repartido de otra manera. El motivo es que el archivo que editas guarda el documento y también la manera de mostrarlo, y cada programa decide por su cuenta cómo lo enseña. Hay un formato que quita ese problema de en medio.</p>
      <h3>Exportar a PDF</h3>
      <p>El <strong>PDF</strong> es ese formato. Un archivo PDF se puede ver e imprimir en cualquier plataforma con el formato original intacto, siempre que haya un programa capaz de abrirlo. Y no pierde la forma al mandarlo, que es justo lo que pasa con un documento de texto: al enviarlo, se desordenan las páginas y los párrafos. <strong>Exportar</strong> (<span lang="en">export</span>) es crear una copia del documento en ese formato: el documento sigue donde estaba, editable, y además nace un archivo nuevo que ya no se toca. En el programa de referencia, el botón Exportar crea ese archivo.</p>
      <p>El PDF está pensado para leerse y no para editarse, así que quien lo recibe no lo cambia por accidente. Y como el formato fija el aspecto, hay que decidir antes las dos cosas que lo afectan: el formato de papel, A4 o Carta, y la orientación, vertical u horizontal. Se cambian en Formato - Estilo de página, en la pestaña Página. Un cambio de orientación solo afecta a las páginas que usan ese estilo de página, no a todo el documento.</p>
      <h3>Imprimir es otra cosa</h3>
      <p>Exportar deja un archivo en el equipo; imprimir produce papel. Son dos gestos distintos y no se sustituyen: puedes exportar a PDF sin tener impresora, y puedes imprimir sin haber exportado nunca. Antes de gastar hojas está la <strong>vista previa</strong> (<span lang="en">print preview</span>), que muestra cómo va a quedar cada página, cuántas páginas son y cómo van a salir en el papel. Se abre con Archivo - Vista previa de impresión y se recorre con las flechas.</p>
      <p>En el cuadro de impresión hay opciones que ahorran trabajo: el número de copias, el rango de páginas, para sacar solo la tercera y la cuarta si solo quieres esas, y el número de páginas por hoja, que sirve para poner dos páginas pequeñas en una sola hoja y gastar menos papel. El número de copias y el rango de páginas son opciones generales de cualquier cuadro de impresión; lo que cambia de un programa a otro es el nombre exacto del botón.</p>
      ${SALIDAS}
      <p>El diagrama separa las dos salidas del mismo documento: por un lado sale un archivo que se ve igual en cualquier sitio y por otro sale el papel, con la vista previa avisando antes de gastar nada.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Opción</th><th>Para qué sirve</th></tr></thead>
        <tbody>
          <tr><th scope="row">Formato de papel</th><td>Elegir el tamaño de la hoja: A4 o Carta.</td></tr>
          <tr><th scope="row">Orientación</th><td>Poner la página vertical u horizontal.</td></tr>
          <tr><th scope="row">Número de copias</th><td>Imprimir varias copias del mismo documento.</td></tr>
          <tr><th scope="row">Rango de páginas</th><td>Imprimir solo algunas páginas, por ejemplo la primera y la segunda.</td></tr>
          <tr><th scope="row">Dos páginas por hoja</th><td>Poner dos páginas en una sola hoja para ahorrar papel.</td></tr>
        </tbody>
      </table></div>
      <p>El PDF es un formato de archivo, como los que viste en la lección "Crear, guardar y abrir documentos", pero con una diferencia: no se edita. Y todo lo que pusiste en el encabezado y el pie de página sale también en el PDF, porque el PDF es una copia del documento tal como estaba. La lección "Encabezados, pies de página y numeración" de esta unidad explica cómo se rotula cada hoja.</p>
      <p class="nota"><strong>Trampa común:</strong> exportar a PDF sin guardar antes. Como criterio prudent de esta lección, guarda el documento antes de exportar: así no te quedan dos versiones distintas, el PDF que mandas y el archivo que dejas en el equipo.</p>`,
    ejemplo: `
      <p>Dejas un documento listo para entregar.</p>
      <ol class="pasos-ej">
        <li>Guardas el documento con Archivo - Guardar, para que el archivo del equipo esté al día.</li>
        <li>Exportas a PDF con el botón Exportar. El programa te pregunta dónde poner el archivo y con qué nombre.</li>
        <li>Compruebas que el papel es A4 y la orientación vertical, en Formato - Estilo de página, en la pestaña Página.</li>
        <li>Abres el PDF en otro dispositivo y compruebas que las imágenes están en su sitio y las páginas se ven igual.</li>
        <li>Vuelves al documento y abres la vista previa con Archivo - Vista previa de impresión. Recorres las páginas con las flechas y ves que la última sale medio vacía.</li>
        <li>Abres el cuadro de impresión, pones el rango de páginas 1 a 2 y una copia, y mandas el trabajo a la impresora.</li>
      </ol>
      <p>Resultado: <span class="resultado">un PDF que se ve igual en cualquier sitio y dos páginas en papel</span>.</p>
      <p class="nota"><strong>Error común:</strong> mandar a imprimir el documento entero sin mirar la vista previa. Así gastas hojas y tinta en páginas que no hacía falta sacar. Mira cuántas páginas son y elige el rango.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál es la diferencia entre exportar a PDF e imprimir?</p>',
        opciones: ['Exportar necesita una impresora y el papel es opcional', 'Exportar crea una copia del documento en otro formato; imprimir lo saca en papel', 'Las dos cosas hacen exactamente lo mismo', 'Imprimir crea un archivo en el equipo y exportar lo manda a la impresora'], correcta: 1,
        pista: '<p>Una de las dos cosas deja un archivo en el equipo y la otra no.',
        solucion: '<p>Exportar crea una copia del documento en PDF, un archivo que se ve igual en cualquier sitio y que se manda. Imprimir produce el documento en papel. Son gestos distintos y no se sustituyen.' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve la vista previa de impresión?</p>',
        opciones: ['Para cambiar el texto antes de imprimirlo', 'Para guardar el documento con otro nombre', 'Para ver cómo va a quedar cada página antes de gastar hojas', 'Para comprobar la ortografía del documento'], correcta: 2,
        pista: '<p>Es el último control antes de que la impresora se ponga en marcha.',
        solucion: '<p>La vista previa muestra cómo va a quedar cada página, cuántas páginas son y cómo van a salir en el papel. Es el último control antes de gastar hojas y tinta.' },
      { tipo: 'opciones', enunciado: '<p>¿Qué formato fija el aspecto del documento, de manera que se ve igual en cualquier dispositivo?</p>',
        opciones: ['El PDF, que guarda el aspecto tal como se ve en pantalla', 'El texto plano, que no guarda nada', 'El formato de documento del programa de texto, que guarda estilos e imágenes', 'La copia de seguridad, que guarda la versión anterior'], correcta: 0,
        pista: '<p>Es el mismo formato del que te habrás acordado en la primera lección de esta unidad.',
        solucion: '<p>Es el PDF. Un archivo PDF se puede ver e imprimir en cualquier plataforma con el formato original intacto, y no pierde la forma al mandarlo, cosa que sí pasa con un documento de texto.' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la vista que muestra cómo va a quedar el documento antes de imprimirlo?</p>',
        respuestas: ['vista previa', 'la vista previa', 'vista previa de impresión', 'la vista previa de impresión', 'print preview'],
        pista: '<p>Es la palabra que se usa también en inglés, con «previa» y con «print».',
        solucion: '<p>Se llama vista previa (print preview). Muestra el documento tal como saldrá en el papel y se recorre con las flechas del programa.' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para dejar un documento listo para entregar.</p>',
        respuesta: ['Guardar el documento', 'Exportar el documento a PDF', 'Comprobar el formato de papel y la orientación', 'Abrir el PDF y comprobar que se ve igual', 'Mirar la vista previa de impresión', 'Elegir el rango de páginas y mandar a imprimir'],
        pista: '<p>Empieza por guardar y termina por el papel.',
        solucion: '<p>El orden es guardar, exportar a PDF, comprobar el papel y la orientación, abrir el PDF y mirarlo, mirar la vista previa y elegir el rango de páginas. Cada paso es un control antes del siguiente.' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos formatos de salida tiene el diagrama de la lección?</p>', respuesta: 2,
        pista: '<p>Cuenta las dos ramas en las que se divide el documento.',
        solucion: '<p>Son <strong>2</strong>: el archivo PDF, que se ve igual en cualquier sitio, y el papel, que sale por la impresora. Exportar deja un archivo en el equipo; imprimir produce hojas.' },
    ],
    fuentes: [
      LO('Exportar a PDF', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/shared/01/ref_pdf_export.xhp'),
      LO('Ver una página antes de imprimir', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/print_preview.xhp'),
      LO('Imprimir varias páginas en una sola hoja', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/print_small.xhp'),
      LO('Cambiar la orientación de la página', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/swriter/guide/pageorientation.xhp'),
      WIKI('Portable_Document_Format', 'Portable Document Format'),
    ],
  });
})();
