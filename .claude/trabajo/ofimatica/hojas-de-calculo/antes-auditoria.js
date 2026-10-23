// Ofimática · Unidad 3: Hojas de cálculo.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// La unidad se escribe en cuatro fragmentos: el 1 (lecciones 1 a 3), el 2 (4 a 6), el 3 (7 a 9) y el 4 (10 a 12).
// Cada fragmento añade sus lecciones al final del archivo, antes del cierre, y nunca reescribe lo anterior.
// Programa de referencia: LibreOffice Calc. Primero el concepto genérico (hoja, celda, fórmula, rango) y después
// el nombre del comando o de la función. Las cifras de los ejemplos son de ejemplo.
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
  const WIKI = (nombre, url) => ({ nombre: `Wikipedia: ${nombre}`, url });

  // ------------------------------------------------------------------
  // La rejilla de una hoja: las columnas llevan letras, las filas llevan números y B3 es una celda.
  const REJILLA = diagrama([0, 8.6], [0, 7.5], [
    { tipo: 'linea', desde: [1.3, 6.6], hasta: [6.5, 6.6] }, { tipo: 'linea', desde: [1.3, 5.5], hasta: [6.5, 5.5] },
    { tipo: 'linea', desde: [1.3, 4.4], hasta: [6.5, 4.4] }, { tipo: 'linea', desde: [1.3, 3.3], hasta: [6.5, 3.3] },
    { tipo: 'linea', desde: [1.3, 2.2], hasta: [6.5, 2.2] },
    { tipo: 'linea', desde: [1.3, 2.2], hasta: [1.3, 6.6] }, { tipo: 'linea', desde: [2.6, 2.2], hasta: [2.6, 6.6] },
    { tipo: 'linea', desde: [3.9, 2.2], hasta: [3.9, 6.6] }, { tipo: 'linea', desde: [5.2, 2.2], hasta: [5.2, 6.6] },
    { tipo: 'linea', desde: [6.5, 2.2], hasta: [6.5, 6.6] },
    txt(1.95, 7.0, 'A'), txt(3.25, 7.0, 'B'), txt(4.55, 7.0, 'C'), txt(5.85, 7.0, 'D'),
    txt(0.65, 6.05, '1'), txt(0.65, 4.95, '2'), txt(0.65, 3.85, '3'), txt(0.65, 2.75, '4'),
    { tipo: 'poligono', puntos: [[2.6, 3.3], [3.9, 3.3], [3.9, 4.4], [2.6, 4.4]], relleno: true, serie: 1 },
    txt(3.25, 3.85, 'B3'),
    txt(4.0, 1.4, 'Las columnas llevan letras y las filas llevan números'),
    txt(4.0, 0.7, 'La celda marcada es B3: columna B, fila 3'),
  ], 'Diagrama de una rejilla con cuatro columnas y cuatro filas. Las columnas se nombran A, B, C y D, y las filas, 1, 2, 3 y 4. La celda de la columna B y la fila 3 está marcada con otro color y dentro pone B3. Debajo, el rótulo Las columnas llevan letras y las filas llevan números, y la frase La celda marcada es B3: columna B, fila 3.');

  // ------------------------------------------------------------------
  // Tres celdas de la misma columna: un número, un texto y un error.
  const TIPOS = diagrama([0, 8], [0, 8], [
    { tipo: 'linea', desde: [2.0, 6.6], hasta: [6.0, 6.6] }, { tipo: 'linea', desde: [2.0, 5.2], hasta: [6.0, 5.2] },
    { tipo: 'linea', desde: [2.0, 3.8], hasta: [6.0, 3.8] }, { tipo: 'linea', desde: [2.0, 2.4], hasta: [6.0, 2.4] },
    { tipo: 'linea', desde: [2.0, 2.4], hasta: [2.0, 6.6] }, { tipo: 'linea', desde: [6.0, 2.4], hasta: [6.0, 6.6] },
    txt(4.0, 7.0, 'B'),
    txt(1.0, 5.9, 'número'), txt(1.0, 4.5, 'texto'), txt(1.0, 3.1, 'error'),
    txt(5.35, 5.9, '120'), txt(2.65, 4.5, '120'),
    { tipo: 'poligono', puntos: [[2.0, 2.4], [6.0, 2.4], [6.0, 3.8], [2.0, 3.8]], relleno: true, serie: 1 },
    txt(4.0, 3.1, '#DIV/0!'),
    txt(4.0, 1.5, 'El mismo 120, guardado de dos maneras'),
    txt(4.0, 0.8, 'a la derecha, un número; a la izquierda, un texto'),
  ], 'Diagrama de una columna con tres celdas y, a la izquierda de cada una, su tipo: número, texto y error. En la celda de arriba, el número 120 aparece pegado a la derecha. En la del medio, el mismo 120 aparece pegado a la izquierda, porque está guardado como texto. En la de abajo, la celda está teñida con otro color y muestra el código de error DIV/0. Debajo, el rótulo El mismo 120, guardado de dos maneras, y la frase a la derecha, un número; a la izquierda, un texto.');

  // ------------------------------------------------------------------
  // De dos celdas con datos a una celda con el resultado de sumarlas.
  const FORMULA = diagrama([0, 12], [0, 5.2], [
    ...caja(1.9, 4.3, 2.8, 1.0, 'A1 = 20', true),
    ...caja(1.9, 2.7, 2.8, 1.0, 'A2 = 5', true),
    ...flecha([3.5, 4.3], [4.45, 4.15], 0, 0.8),
    ...flecha([3.5, 2.7], [4.45, 2.85], 0, 0.8),
    ...caja(6.2, 3.5, 3.2, 1.3, '=A1+A2', true),
    ...flecha([7.9, 3.5], [8.85, 3.5], 0, 0.8),
    ...caja(10.4, 3.5, 2.8, 1.3, 'A3 = 25', true),
    txt(6.0, 1.4, 'El resultado aparece en la celda A3'),
    txt(6.0, 0.7, 'La barra de fórmulas muestra =A1+A2'),
  ], 'Diagrama de izquierda a derecha. Dos cajas: la de arriba dice A1 = 20 y la de abajo dice A2 = 5. Dos flechas salen de ellas hacia una caja central que dice =A1+A2. De esa caja sale una flecha hacia una última caja que dice A3 = 25. Debajo, el rótulo El resultado aparece en la celda A3, y la frase La barra de fórmulas muestra =A1+A2.');

  // ------------------------------------------------------------------
  L('Celdas, filas y columnas', {
    objetivo: 'Nombrar las partes de una hoja de cálculo, decir cómo se llama cada celda y reconocer un rango de celdas.',
    vidaReal: `
      <p>Las notas de una materia, los gastos de una semana o los puntos de un juego se llevan mejor en una tabla de casillas que en un cuaderno. Entras un dato en cada casilla y el programa se encarga de sumarlos, de buscar el más alto y de avisarte cuando algo se pasa del límite. Y si corriges una cifra, todo lo que depende de ella se corrige solo: no hay que rehacer las cuentas a mano.</p>`,
    explicacion: `
      <p>Una hoja de cálculo se abre como una tabla enorme y vacía: filas y columnas que se cruzan. A primera vista parece un cuaderno cuadriculado, pero la diferencia es que aquí el programa sabe contar. La primera pregunta que hay que resolver es otra: ¿cómo se habla de cada casilla?</p>
      <p>Cada casilla de la rejilla es una <strong>celda</strong> (<span lang="en">cell</span>), la unidad más pequeña de la hoja: ahí dentro cabe un dato, un texto o el resultado de una cuenta. Las celdas se ordenan en columnas, que se nombran con letras (A, B, C...) y en filas, que se nombran con números (1, 2, 3...).</p>
      <p>Si juntas la letra de la columna con el número de la fila, tienes el nombre de la celda: B3 es la celda de la columna B en la fila 3. Ese nombre se llama referencia, y es la dirección que se usa para hablar de esa celda y para meterla en una cuenta. La regla es fija: primero la letra, después el número.</p>
      <p>El archivo donde vive esta rejilla se llama <strong>hoja de cálculo</strong> (<span lang="en">spreadsheet</span>). Es un archivo más, como el documento de texto de la unidad anterior: tiene nombre, se guarda y se abre después desde el mismo sitio.</p>
      <h3>Un bloque de celdas: el rango</h3>
      <p>A veces no te interesa una celda sola, sino varias seguidas. Cuando eso pasa se escribe un <strong>rango</strong> (<span lang="en">range</span>): la referencia de la primera celda, dos puntos y la referencia de la última. B2:B9 son las ocho celdas de la columna B, desde la fila 2 hasta la fila 9.</p>
      <p>Fíjate en el detalle: el rango se cuenta siempre desde la esquina de arriba hasta la de abajo, nunca al revés, y los dos puntos no se pueden omitir. Ese bloque es lo que luego podrás sumar o promediar de una sola vez, sin escribir celda por celda.</p>
      <h3>Varias hojas dentro del mismo archivo</h3>
      <p>Dentro del archivo hay pestañas, y cada pestaña es una hoja con su propia rejilla. En un archivo nuevo hay una sola, la que se llama «Hoja1»; con el botón (+) de abajo se añaden más, y con los botones de navegación saltas a la primera, a la última o recorres las que hay cuando son muchas. Separar los datos en hojas distintas es cómodo: una para los datos y otra para el resumen.</p>
      <p>Las hojas también se pueden usar juntas: una fórmula puede tomar el valor de una celda de otra hoja escribiendo el nombre de la hoja y un punto antes de la referencia, como =Hoja2.A1. Si en la hoja 2 cambias el dato, en la hoja 1 se ve el cambio.</p>
      <h3>Una celda tiene un contenido</h3>
      <p>Este es el punto que explica casi todo lo demás: una celda guarda un contenido, y ese contenido puede ser un dato escrito a mano o el resultado de una cuenta. La celda es el sitio y el contenido es lo que hay dentro. Como el contenido se puede calcular, la hoja es mucho más que una tabla: es una tabla que responde sola.</p>
      ${REJILLA}
      <div class="tabla-wrap"><table>
        <thead><tr><th>Elemento</th><th>Qué es</th></tr></thead>
        <tbody>
          <tr><th scope="row">Columna</th><td>Una tira vertical de celdas. Se nombra con una letra: A, B, C...</td></tr>
          <tr><th scope="row">Fila</th><td>Una tira horizontal de celdas. Se nombra con un número: 1, 2, 3...</td></tr>
          <tr><th scope="row">Celda</th><td>El cruce de una columna y una fila. Es la unidad más pequeña.</td></tr>
          <tr><th scope="row">Referencia</th><td>El nombre de una celda: la letra de su columna y el número de su fila, como B3.</td></tr>
          <tr><th scope="row">Rango</th><td>Un bloque de celdas escrito con dos referencias y dos puntos, como B2:B9.</td></tr>
          <tr><th scope="row">Hoja</th><td>Cada pestaña del archivo, con su propia rejilla. En un archivo nuevo hay una, «Hoja1».</td></tr>
        </tbody>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> leer B3 como «la fila B, la columna 3». Es al revés: la letra siempre es la columna y el número siempre es la fila. Si te equivocas al escribir una referencia, el programa busca otra celda y el resultado sale raro, sin avisar.</p>`,
    ejemplo: `
      <p>Una hoja con una lista de gastos: en la columna A están las fechas, en la columna B los importes, y el total está en B9.</p>
      <ol class="pasos-ej">
        <li>Busca la celda B3: mira la letra de la columna, arriba del todo, y baja por esa columna hasta el número de la fila, a la izquierda.</li>
        <li>Lee su nombre: B3. La B es la segunda columna y el 3 es la tercera fila.</li>
        <li>Ahora el rango: empieza en B2, el primer importe, y termina en B9, el total. Entre las dos referencias van dos puntos: B2:B9. De la fila 2 a la 9 son ocho celdas.</li>
        <li>El tabulador pasa a la siguiente celda de la fila y el Intro baja a la fila siguiente.</li>
        <li>Comprueba en el programa: al seleccionar una celda, el recuadro de arriba a la izquierda muestra su nombre, y al seleccionar el bloque, el rango.</li>
      </ol>
      <p>Resultado: <span class="resultado">la celda B3 y el rango B2:B9</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir el rango al revés, como B9:B2. El bloque es el mismo, pero la forma correcta empieza por la esquina de arriba.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>En una hoja de cálculo, ¿qué es la celda B3?</p>',
        opciones: ['La celda de la columna B, en la fila 3', 'La celda de la fila B, en la columna 3', 'El bloque de celdas que va de B2 a B9', 'La tercera hoja del archivo'], correcta: 0,
        pista: '<p>La letra es siempre la columna y el número es siempre la fila.</p>',
        solucion: '<p>B3 es la celda de la columna B en la fila 3. La segunda opción está al revés: no existen filas con letra.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué quiere decir el rango B2:B9?</p>',
        opciones: ['Que hay que corregir las celdas B2 y B9', 'Que la hoja tiene nueve columnas', 'Que son las ocho celdas de la columna B, de la fila 2 a la 9', 'Que la celda B9 está vacía'], correcta: 2,
        pista: '<p>Cuenta las filas que van de la 2 a la 9 en esa columna.</p>',
        solucion: '<p>Un rango se escribe con la referencia de la primera celda, dos puntos y la de la última. B2:B9 son las ocho celdas de la columna B, desde la fila 2 hasta la fila 9.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un archivo de hoja de cálculo nuevo, ¿cuántas hojas tiene?</p>',
        opciones: ['Ninguna: las hojas se crean al escribir algo', 'Una, la primera, que se llama «Hoja1»', 'Tres: una para los datos, otra para las cuentas y otra para el resumen', 'Tantas como columnas tenga la rejilla'], correcta: 1,
        pista: '<p>Piensa en lo que aparece al abrir un archivo nuevo por primera vez.</p>',
        solucion: '<p>Al abrir un archivo nuevo hay una sola hoja, la que se llama «Hoja1». Las demás se añaden después con el botón (+) que está abajo.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama cada casilla de la rejilla de una hoja de cálculo?</p>',
        respuestas: ['celda', 'la celda', 'cell'],
        pista: '<p>Es la unidad más pequeña de la rejilla: la casilla donde se escribe un dato.</p>',
        solucion: '<p>Se llama celda (cell en inglés). Cada casilla de la rejilla es una celda, y dentro de ella cabe un dato, un texto o el resultado de una cuenta.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para encontrar la celda C4 en la rejilla.</p>',
        respuesta: ['Mirar la letra de la columna, que está arriba del todo', 'Localizar la columna C', 'Bajar por esa columna hasta la fila 4', 'Leer el nombre de la celda: C4'],
        pista: '<p>Primero las columnas, después las filas.</p>',
        solucion: '<p>El orden es mirar la letra de la columna, localizar la C, bajar hasta la fila 4 y leer el nombre. La letra va siempre antes que el número.</p>' },
      { tipo: 'numero', enunciado: '<p>Un rango de 3 columnas por 4 filas, ¿cuántas celdas tiene?</p>', respuesta: 3 * 4,
        pista: '<p>Multiplica las columnas por las filas.</p>',
        solucion: '<p>3 × 4 = <strong>12</strong> celdas. Es la misma cuenta que harías con una tabla de papel.</p>' },
    ],
    fuentes: [
      LO('Entering Values', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/cell_enter.xhp'),
      LO('Navigating Through Sheet Tabs', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/multi_tables.xhp'),
      LO('Referencing a Cell in Another Sheet', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/cellreferences.xhp'),
      LO('Addresses and References, Absolute and Relative', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/relativ_absolut_ref.xhp'),
      WIKI('Hoja de cálculo', 'https://es.wikipedia.org/wiki/Hoja_de_c%C3%A1lculo'),
    ],
  });

  // ------------------------------------------------------------------
  L('Tipos de datos', {
    objetivo: 'Reconocer si una celda guarda un número, un texto, una fecha o un error, y entender por qué una suma a veces sale más baja de lo que debería.',
    vidaReal: `
      <p>Un total que sale cero o un número que no cuadra casi siempre tiene una explicación sencilla: algún dato quedó guardado como texto en lugar de número. Pasa con el precio de un periódico, con la nota de un examen o con la fecha de un evento, y el programa se lo come sin avisar. Esta lección te enseña a mirar cómo está guardado cada dato antes de fiarte del resultado, que es el primer paso para no perder un presupuesto entero por un signo de más.</p>`,
    explicacion: `
      <p>Escribes 12,5 en una celda y el programa la coloca pegada a la derecha. Escribes 12,5 con una comilla delante y la coloca pegada a la izquierda. Has escrito lo mismo y el programa lo ha guardado distinto. La pregunta es por qué.</p>
      <p>La respuesta es que cada celda guarda un tipo de dato, y el tipo decide qué se puede hacer con ella: por eso hay números, texto y fechas, y por eso una celda con texto no se puede sumar como una celda con números.</p>
      <h3>Número o texto: la diferencia que más se confunde</h3>
      <p>El <strong>número</strong> (<span lang="en">number</span>) es el tipo que se puede calcular, y el único que se alinea a la derecha. El texto se alinea a la izquierda, así que la posición del dato es una pista rápida: si un número está pegado a la izquierda, casi siempre es que no se ha guardado como número.</p>
      <p>Y aquí está la trampa: cuando una función suma un rango, las celdas de texto no se suman, se saltan. La ayuda de LibreOffice lo pone con un ejemplo: si en A1 hay 100 y en A2 el texto 1e2, la suma del rango devuelve 101 en lugar de 201, porque el texto se ignora. No sale ningún aviso: el total sale más corto, y por eso un presupuesto se descuadra sin que nadie entienda la causa. Además, la conversión de texto a número solo ocurre en una cuenta con un valor suelto, no en una función que recorre un rango.</p>
      <h3>Las fechas</h3>
      <p>La <strong>fecha</strong> (<span lang="en">date</span>) es el tipo que guarda un día, un mes y un año. Es un número por dentro, pero se muestra con el formato de la celda: al restar dos fechas, el programa enseña la diferencia con formato de fecha, y para ver los días hay que cambiar el formato de esa celda al de número.</p>
      <p>Ojo con cómo se escriben las fechas: una fecha con barras, como 3/4/25, es ambigua, porque no se sabe si el primer número es el día o el mes. Revisa cómo ha quedado la fecha en la celda después de escribirla.</p>
      <h3>Cuando la cuenta no se puede hacer</h3>
      <p>Cuando una fórmula no puede calcular, el programa no se calla: escribe un <strong>error</strong> (<span lang="en">error</span>). Hay tres que verás muy a menudo: el de división por cero, que la ayuda de LibreOffice escribe #DIV/0!, el #N/A, que significa que el resultado no está disponible, y el #VALUE!, que sale cuando la fórmula produce un valor que no corresponde.</p>
      <p>Y los errores se propagan: si una celda hace una cuenta usando otra celda que tiene un error, ese error pasa a la celda que hace la cuenta. Un error pequeño en una esquina puede llenar una columna entera de errores, así que conviene cazarlos pronto.</p>
      <h3>El formato no cambia el dato</h3>
      <p>El formato de una celda decide cómo se ve lo que hay dentro, no lo que hay dentro. Si una celda muestra 12,50, el número guardado sigue siendo 12,5: el formato solo redondea lo que ves, y por dentro conserva todos sus decimales. El formato «General» es el que muestra las fechas como fechas.</p>
      ${TIPOS}
      <div class="tabla-wrap"><table>
        <thead><tr><th>Tipo</th><th>Cómo se ve</th><th>Qué se puede hacer con él</th></tr></thead>
        <tbody>
          <tr><th scope="row">Número</th><td>Alineado a la derecha.</td><td>Se puede sumar, restar, multiplicar y dividir.</td></tr>
          <tr><th scope="row">Texto</th><td>Alineado a la izquierda.</td><td>Se puede escribir y buscar, pero no cuenta en las sumas.</td></tr>
          <tr><th scope="row">Fecha</th><td>Con el formato de la celda: día, mes y año.</td><td>Se puede comparar y restar; para ver días, hay que poner el formato de número.</td></tr>
          <tr><th scope="row">Error</th><td>Un código como #DIV/0! o #N/A.</td><td>No se puede calcular con él, y se arrastra a las celdas que dependen.</td></tr>
        </tbody>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> fiarse del resultado sin mirar cómo están guardados los datos. Una celda de texto no da error al sumarla: no cuenta. Cuando un total no cuadra, mira primero la alineación de las celdas que lo componen.</p>`,
    ejemplo: `
      <p>En una hoja de gastos, la columna B guarda los importes y en B6 hay una fórmula que los suma. El total debería ser 45, pero sale 30.</p>
      <ol class="pasos-ej">
        <li>Mira cómo están escritas las celdas de la columna. Los importes se alinean a la derecha, pero el 15 de B4 se ve pegado a la izquierda: ese dato es texto.</li>
        <li>Abre la barra de fórmulas y mira qué hay escrito en B4: pone 15, pero guardado como texto, y por eso la suma lo salta.</li>
        <li>Con la celda seleccionada, abre el diálogo Formato de celdas y cambia su formato al de número. El dato se guarda como número y se alinea a la derecha.</li>
        <li>Repite la suma: ahora el total sale 45, que es la cuenta correcta.</li>
      </ol>
      <p>Resultado: <span class="resultado">45 en la celda B6</span>, porque la celda de texto vuelve a ser un número.</p>
      <p class="nota"><strong>Error común:</strong> borrar el dato y escribirlo otra vez sin mirar. Si dejas un espacio pegado, vuelve a guardarse como texto. Comprueba que la celda se alinea a la derecha antes de fiarte de un total.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>En una celda aparece la palabra «pendiente», pegada a la izquierda. ¿Qué tipo de dato guarda?</p>',
        opciones: ['Un número', 'Un texto', 'Una fecha', 'Un error'], correcta: 1,
        pista: '<p>Piensa en cómo se alinea cada tipo de dato dentro de la celda.</p>',
        solucion: '<p>Es un texto: el texto se alinea a la izquierda y además se puede escribir con palabras, mientras que los números van a la derecha. Un error, en cambio, se ve como un código como #DIV/0!.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué muestra el programa cuando una fórmula divide entre cero?</p>',
        opciones: ['El número 0, sin más', 'Un aviso de que falta un dato', '#DIV/0!', '#N/A'], correcta: 2,
        pista: '<p>El nombre del error dice lo que ha pasado: división por cero.</p>',
        solucion: '<p>Muestra el error de división por cero, que la ayuda de LibreOffice escribe #DIV/0!. El error #N/A es otro: significa que el resultado no está disponible.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué una fecha escrita con barras puede ser ambigua?</p>',
        opciones: ['Porque no se sabe si el primer número es el día o el mes', 'Porque el programa guarda las fechas como texto', 'Porque el año siempre se escribe antes que el mes', 'Porque con barras no se puede escribir una fecha'], correcta: 0,
        pista: '<p>Piensa qué dos cosas podría querer decir 3/4/25.</p>',
        solucion: '<p>Porque 3/4/25 puede querer decir 3 de abril o 4 de marzo. La forma de salir de dudas es mirar cómo ha quedado la fecha en la celda después de escribirla.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el valor que aparece en una celda cuando una fórmula no puede calcular?</p>',
        respuestas: ['error', 'un error', 'el error', 'error de fórmula', 'error de cálculo'],
        pista: '<p>Es una palabra de una sola sílaba que también se usa al hablar de un problema.</p>',
        solucion: '<p>Se llama error. Cuando una fórmula no puede calcular, el programa escribe un código de error en la celda, como #DIV/0! o #N/A, en lugar de dejar la celda vacía.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para averiguar por qué una suma sale más baja de lo que debería.</p>',
        respuesta: ['Mirar cómo están alineadas las celdas de la columna', 'Localizar la celda que está alineada a la izquierda', 'Abrir la barra de fórmulas y ver qué hay escrito en ella', 'Cambiar el formato de esa celda al de número', 'Volver a mirar el total'],
        pista: '<p>Empieza por mirar, no por volver a escribir los datos.</p>',
        solucion: '<p>El orden es mirar la alineación, localizar la celda rara, abrir la barra de fórmulas, cambiar su formato al de número y volver a mirar el total. Una celda de texto se salta en la suma sin dar ningún error.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos tipos de dato aparecen en la tabla de la lección?</p>', respuesta: 4,
        pista: '<p>Cuenta las filas de la tabla, sin contar el encabezado.</p>',
        solucion: '<p>Son <strong>4</strong>: número, texto, fecha y error. Cada uno se ve de una manera en la celda y deja hacer cosas distintas.</p>' },
    ],
    fuentes: [
      LO('Calculating With Dates and Times', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/calc_date.xhp'),
      LO('Formatting Numbers With Decimals', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/format_value.xhp'),
      LO('Displaying Formulas or Values', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/formula_value.xhp'),
      LO('Converting Text to Numbers', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/numbers_text.xhp'),
      LO('Error Codes in Calc', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/05/02140000.xhp'),
      WIKI('Hoja de cálculo', 'https://es.wikipedia.org/wiki/Hoja_de_c%C3%A1lculo'),
      WIKI('Tipo de dato', 'https://es.wikipedia.org/wiki/Tipo_de_dato'),
    ],
  });

  // ------------------------------------------------------------------
  L('Fórmulas básicas', {
    objetivo: 'Escribir fórmulas con el signo igual, combinar referencias y operadores, y comprobar en la barra de fórmulas qué hay escrito en una celda.',
    vidaReal: `
      <p>Cuando un total se calcula solo, corregir un dato ya no obliga a rehacer la cuenta. Es lo que pasa en el presupuesto del mes: escribes los gastos una vez y el programa va sumando; si corriges un precio, el total se corrige solo. La misma idea sirve para llevar las notas de una materia, para repartir una lista de compras o para cobrar un trabajo por horas. La diferencia entre hacerlo a mano y dejarlo escrito en la hoja es que el error se nota enseguida.</p>`,
    explicacion: `
      <p>En una celda escribes =2+2 y el programa escribe 4 en su lugar. Es un gesto pequeño, pero abre una puerta enorme: a partir de ahora la hoja no solo guarda datos, también calcula con ellos. La pregunta es cómo se le pide una cuenta.</p>
      <p>La respuesta empieza por una <strong>fórmula</strong> (<span lang="en">formula</span>), que es lo que escribes para que el programa calcule. La regla de la ayuda de LibreOffice es tajante: las fórmulas empiezan siempre por el signo igual. Si lo escribes sin él, el programa entiende que es un texto corriente y lo deja tal cual, sin avisar.</p>
      <h3>De dónde salen los números de la cuenta</h3>
      <p>Una fórmula tiene dos ingredientes: números escritos a mano y referencias a otras celdas. Si escribes =A1+A2 le estás diciendo al programa que sume lo que hay en las celdas A1 y A2, y no el 1 y el 2. La diferencia se nota enseguida: si después cambias el 20 de A1 por un 30, el resultado se corrige solo, sin que vuelvas a tocar la fórmula.</p>
      <p>Para ver y retocar lo que has escrito está la <strong>barra de fórmulas</strong> (<span lang="en">formula bar</span>), la franja de arriba de la ventana. Al seleccionar una celda, en esa franja aparece lo que hay dentro: si es una cuenta, verás la cuenta; si es un número tecleado, verás el número. Por eso, antes de fiarte de un total, mira esa barra.</p>
      <h3>Los operadores</h3>
      <p>Los signos que unen dos valores se llaman <strong>operadores</strong> (<span lang="en">operator</span>). Los básicos son cuatro, más la potencia, y hay una regla que ya conoces de Matemáticas, en la lección «Jerarquía de operaciones»: la multiplicación y la división se hacen antes que la suma y la resta. Los paréntesis cambian ese orden, porque mandan sobre él.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Operador</th><th>Qué hace</th><th>Ejemplo</th></tr></thead>
        <tbody>
          <tr><th scope="row">+</th><td>Suma dos valores.</td><td>=A1+B2</td></tr>
          <tr><th scope="row">−</th><td>Resta el segundo valor del primero.</td><td>=B2-A1</td></tr>
          <tr><th scope="row">×</th><td>Multiplica dos valores.</td><td>=A1*A2</td></tr>
          <tr><th scope="row">÷</th><td>Divide el primer valor por el segundo.</td><td>=B2/A1</td></tr>
          <tr><th scope="row">^</th><td>Eleva el primer valor a la potencia del segundo.</td><td>=A1^2</td></tr>
          <tr><th scope="row">( )</th><td>Agrupa lo que va dentro: no es un operador, pero decide el orden.</td><td>=(1+2)*3</td></tr>
        </tbody>
      </table></div>
      <p>Ojo con la última fila: la fórmula =(1+2)*3 da un resultado distinto que =1+2*3, porque el paréntesis se resuelve primero. Los paréntesis no son un operador, pero se usan como si lo fueran.</p>
      <h3>Dos atajos que ahorran trabajo</h3>
      <p>El primero es la suma automática, el botón con la letra sigma (Σ) que hay en la barra de herramientas: le dices el rango y el programa escribe la fórmula de suma por ti. El segundo es el tirador de relleno, la manija pequeña de la esquina de la celda: si la arrastras hacia abajo o hacia la derecha, copia la fórmula y va ajustando las referencias a la nueva posición.</p>
      <h3>Dos errores que conviene reconocer</h3>
      <p>El primero es empezar la fórmula sin el signo igual: el programa se lo toma como texto y no calcula nada. El segundo es olvidar que las fórmulas se recalculan solas. Si cambias un dato, la cuenta se rehace por ti, y por eso una hoja bien hecha nunca tiene un total tecleado a mano.</p>
      ${FORMULA}
      <p class="nota"><strong>Trampa común:</strong> escribir la cuenta sin el signo igual. El programa entiende entonces que es un texto y lo deja como está, sin avisar: la celda parece una cuenta, pero no lo es. La cuenta puede llevar mayúsculas o minúsculas; lo que no puede es empezar sin el signo igual.</p>`,
    ejemplo: `
      <p>Una hoja de gastos tiene tres importes: 8, 12 y 5, en B2, B3 y B4. El total va en B5.</p>
      <ol class="pasos-ej">
        <li>Escribe 8 en B2, 12 en B3 y 5 en B4. Con la tecla Intro pasas de una fila a la siguiente, así que no hace falta mover el ratón.</li>
        <li>Ahora la fórmula: haz clic en B5 y escribe =B2+B3+B4, con el signo igual pegado delante.</li>
        <li>Pulsa Intro. En la celda aparece 25.</li>
        <li>Comprueba con la barra de fórmulas: selecciona B5 y arriba verás =B2+B3+B4, no un 25 tecleado. Eso significa que la celda está viva.</li>
        <li>Para un total de columna hay atajo: selecciona los importes y pulsa el botón de la suma automática (Σ), que escribe la fórmula.</li>
        <li>Cambia el 12 de B3 por un 20: el total ya no es 25, sino 33. La fórmula se recalculó sola.</li>
      </ol>
      <p>Resultado: <span class="resultado">25 en la celda B5, con la fórmula =B2+B3+B4 detrás</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir 25 a mano en la celda del total. Se ve igual, pero deja de ser una cuenta y no se corrige al cambiar un importe.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Con qué tiene que empezar una fórmula?</p>',
        opciones: ['Con un signo igual', 'Con el nombre de la celda', 'Con una letra', 'Con una coma'], correcta: 0,
        pista: '<p>Es el signo que le dice al programa que lo que viene detrás es una cuenta.</p>',
        solucion: '<p>Con un signo igual, pegado al principio. Sin él, el programa toma lo que has escrito como un texto corriente y no calcula nada.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué hace el operador * ?</p>',
        opciones: ['Suma dos valores', 'Multiplica dos valores', 'Divide dos valores', 'Eleva un valor a una potencia'], correcta: 1,
        pista: '<p>En la tabla de los operadores de la lección hay una fila que explica lo que hace este signo.</p>',
        solucion: '<p>El asterisco multiplica: 3 * 4 vale 12. Para dividir se usa la barra y para elevar a una potencia, el acento circunflejo (^).</p>' },
      { tipo: 'opciones', enunciado: '<p>Seleccionas la celda A3, que tiene una fórmula. ¿Qué ves en la barra de fórmulas?</p>',
        opciones: ['El resultado de la cuenta, listo para copiar', 'El formato de la celda', 'La fórmula que está escrita en la celda', 'El número de filas de la hoja'], correcta: 2,
        pista: '<p>La barra de fórmulas muestra lo que hay dentro de la celda, no lo que se ve en ella.</p>',
        solucion: '<p>Muestra la fórmula escrita en la celda, por ejemplo =A1+A2. Si en su lugar aparece el resultado, es que en esa celda hay un número tecleado y no una cuenta.</p>' },
      { tipo: 'texto', enunciado: '<p>Escribe la fórmula que suma el contenido de las celdas A1 y A2.</p>',
        respuestas: ['=A1+A2', 'A1+A2', '=A1 + A2', 'A1 + A2'],
        pista: '<p>Empieza por el signo igual y pon la referencia de cada celda, una detrás de otra, con el signo de sumar en medio.</p>',
        solucion: '<p>La fórmula es <strong>=A1+A2</strong>. Si pones espacios alrededor del signo de sumar, el programa lo lee igual y el resultado es el mismo.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para calcular el total de una columna con la suma automática.</p>',
        respuesta: ['Seleccionar las celdas de los importes', 'Pulsar el botón de la suma automática', 'Ver el total que aparece en la celda de abajo', 'Seleccionar el total y mirarlo en la barra de fórmulas'],
        pista: '<p>Primero se señala el rango y después se pulsa el botón.</p>',
        solucion: '<p>El orden es seleccionar, pulsar el botón, ver el total y comprobar en la barra de fórmulas que lo que hay escrito es una fórmula y no un número tecleado.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos operadores hay en la tabla de la lección?</p>', respuesta: 5,
        pista: '<p>Cuenta los símbolos de la primera columna, pero no cuentes los paréntesis.</p>',
        solucion: '<p>Son <strong>5</strong>: sumar, restar, multiplicar, dividir y elevar a una potencia. Los paréntesis están también en la tabla, pero no son un operador: sirven para agrupar y decidir el orden.</p>' },
    ],
    fuentes: [
      LO('Entering Formulas', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/formula_enter.xhp'),
      LO('Calculating in Spreadsheets', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/calculate.xhp'),
      LO('Calculating With Formulas', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/formulas.xhp'),
      LO('Copying Formulas', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/formula_copy.xhp'),
      LO('Select Function (AutoSum)', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/02/06030000.xhp'),
      LO('Displaying Formulas or Values', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/formula_value.xhp'),
    ],
  });

  // ------------------------------------------------------------------
  // Al copiar una fórmula, lo relativo se mueve y lo absoluto se queda quieto.
  const RELATIVAS = diagrama([0, 12.6], [0, 6], [
    txt(2.2, 5.5, 'Referencia relativa'),
    ...caja(2.2, 4.6, 3.4, 0.75, 'C2: =A2*B1'),
    ...flecha([2.2, 4.18], [2.2, 3.72], 0, 0.7),
    ...caja(2.2, 3.3, 3.4, 0.75, 'C3: =A3*B2'),
    txt(2.2, 2.45, 'Se mueve'),
    txt(10.4, 5.5, 'Referencia absoluta'),
    ...caja(10.4, 4.6, 3.4, 0.75, 'C2: =A2*$B$1'),
    ...flecha([10.4, 4.18], [10.4, 3.72], 0, 0.7),
    ...caja(10.4, 3.3, 3.4, 0.75, 'C3: =A3*$B$1'),
    txt(10.4, 2.45, 'No se mueve'),
    { tipo: 'linea', desde: [5.4, 4.6], hasta: [7.2, 4.6] }, { tipo: 'linea', desde: [5.4, 3.8], hasta: [7.2, 3.8] },
    { tipo: 'linea', desde: [5.4, 3.0], hasta: [7.2, 3.0] }, { tipo: 'linea', desde: [5.4, 2.2], hasta: [7.2, 2.2] },
    { tipo: 'linea', desde: [5.4, 2.2], hasta: [5.4, 4.6] }, { tipo: 'linea', desde: [6.3, 2.2], hasta: [6.3, 4.6] },
    { tipo: 'linea', desde: [7.2, 2.2], hasta: [7.2, 4.6] },
    txt(5.85, 4.9, 'A'), txt(6.75, 4.9, 'B'),
    txt(5.05, 4.2, '1'), txt(5.05, 3.4, '2'), txt(5.05, 2.6, '3'),
    { tipo: 'poligono', puntos: [[6.3, 3.8], [7.2, 3.8], [7.2, 4.6], [6.3, 4.6]], relleno: true, serie: 1 },
    txt(6.3, 1.8, 'El precio, en B1'),
    txt(6.3, 1.0, 'La misma fórmula, copiada hacia abajo'),
    txt(6.3, 0.35, 'Lo que se ajusta y lo que se queda quieto'),
  ], 'Diagrama con dos grupos de cajas y una rejilla en medio. A la izquierda, el título Referencia relativa: una caja con C2: =A2*B1, una flecha hacia abajo y otra caja con C3: =A3*B2, con el rótulo Se mueve. A la derecha, el título Referencia absoluta: una caja con C2: =A2*$B$1, una flecha hacia abajo y otra caja con C3: =A3*$B$1, con el rótulo No se mueve. En el centro, una rejilla de dos columnas, A y B, y tres filas, 1, 2 y 3, con la celda B1 marcada con otro color y la frase El precio, en B1. Abajo, las frases La misma fórmula, copiada hacia abajo y Lo que se ajusta y lo que se queda quieto.');

  // ------------------------------------------------------------------
  // Dos columnas de importes con su total y el tirador de relleno que lo copia.
  const TOTALES = diagrama([0, 9.5], [0, 6.4], [
    { tipo: 'linea', desde: [1.8, 5.3], hasta: [3.6, 5.3] }, { tipo: 'linea', desde: [1.8, 4.6], hasta: [3.6, 4.6] },
    { tipo: 'linea', desde: [1.8, 3.9], hasta: [3.6, 3.9] }, { tipo: 'linea', desde: [1.8, 3.2], hasta: [3.6, 3.2] },
    { tipo: 'linea', desde: [1.8, 2.5], hasta: [3.6, 2.5] }, { tipo: 'linea', desde: [1.8, 1.8], hasta: [3.6, 1.8] },
    { tipo: 'linea', desde: [1.8, 1.1], hasta: [3.6, 1.1] },
    { tipo: 'linea', desde: [1.8, 1.1], hasta: [1.8, 5.3] }, { tipo: 'linea', desde: [3.6, 1.1], hasta: [3.6, 5.3] },
    { tipo: 'linea', desde: [4.8, 5.3], hasta: [6.6, 5.3] }, { tipo: 'linea', desde: [4.8, 4.6], hasta: [6.6, 4.6] },
    { tipo: 'linea', desde: [4.8, 3.9], hasta: [6.6, 3.9] }, { tipo: 'linea', desde: [4.8, 3.2], hasta: [6.6, 3.2] },
    { tipo: 'linea', desde: [4.8, 2.5], hasta: [6.6, 2.5] }, { tipo: 'linea', desde: [4.8, 1.8], hasta: [6.6, 1.8] },
    { tipo: 'linea', desde: [4.8, 1.1], hasta: [6.6, 1.1] },
    { tipo: 'linea', desde: [4.8, 1.1], hasta: [4.8, 5.3] }, { tipo: 'linea', desde: [6.6, 1.1], hasta: [6.6, 5.3] },
    txt(2.7, 5.65, 'B'), txt(5.7, 5.65, 'C'),
    txt(1.45, 4.95, '1'), txt(1.45, 4.25, '2'), txt(1.45, 3.55, '3'), txt(1.45, 2.85, '4'),
    txt(1.45, 2.15, '5'), txt(1.45, 1.45, '6'),
    txt(2.7, 4.95, 'Importe'), txt(5.7, 4.95, 'Importe'),
    txt(2.7, 4.25, '10'), txt(2.7, 3.55, '20'), txt(2.7, 2.85, '30'), txt(2.7, 2.15, '40'),
    txt(5.7, 4.25, '70'), txt(5.7, 3.55, '30'), txt(5.7, 2.85, '20'), txt(5.7, 2.15, '10'),
    { tipo: 'poligono', puntos: [[1.8, 1.8], [3.6, 1.8], [3.6, 1.1], [1.8, 1.1]], relleno: true, serie: 1 },
    txt(2.7, 1.45, '150'),
    { tipo: 'poligono', puntos: [[3.45, 1.1], [3.6, 1.1], [3.6, 1.25], [3.45, 1.25]], relleno: true, serie: 1 },
    ...flecha([3.75, 1.18], [4.65, 1.18], 0, 0.6),
    { tipo: 'poligono', puntos: [[4.8, 1.8], [6.6, 1.8], [6.6, 1.1], [4.8, 1.1]], relleno: true, serie: 1 },
    txt(5.7, 1.45, '130'),
    txt(2.7, 0.65, '=SUMA(B2:B5)'), txt(5.7, 0.65, '=SUMA(C2:C5)'),
    txt(4.4, 0.15, 'El tirador de relleno copia el total a las demás columnas'),
  ], 'Diagrama de dos columnas de una hoja, la B y la C. Cada una tiene una fila de encabezado con la palabra Importe y cuatro filas de datos. La columna B guarda los valores 10, 20, 30 y 40, y en la fila 6 una celda marcada con otro color que muestra el total 150; debajo pone la fórmula =SUMA(B2:B5). En la esquina inferior derecha de esa celda hay un pequeño cuadrado, el tirador de relleno, y una flecha va hacia la columna C. La columna C guarda los valores 70, 30, 20 y 10 y, en la fila 6, otra celda con el total 130 y debajo la fórmula =SUMA(C2:C5). Abajo, la frase El tirador de relleno copia el total a las demás columnas.');

  // ------------------------------------------------------------------
  // La decisión de la función SI: una pregunta y dos respuestas.
  const DECISION = diagrama([0, 10], [0, 5.2], [
    ...caja(5.0, 4.3, 4.0, 0.9, 'Condición: B2 > 100'),
    ...flecha([5.0, 3.85], [5.0, 3.5], 0, 0.8),
    { tipo: 'poligono', puntos: [[5.0, 3.5], [5.7, 3.0], [5.0, 2.5], [4.3, 3.0]] },
    txt(5.0, 3.0, '?'),
    ...flecha([4.3, 3.0], [3.55, 3.0], 0, 0.8),
    ...flecha([5.7, 3.0], [6.45, 3.0], 0, 0.8),
    txt(3.92, 3.42, 'Sí'), txt(6.08, 3.42, 'No'),
    ...caja(2.1, 3.0, 2.8, 1.0, 'Valor verdadero'),
    txt(2.1, 2.15, 'Por ejemplo: 150'),
    ...caja(7.9, 3.0, 2.8, 1.0, 'Valor falso'),
    txt(7.9, 2.15, 'Por ejemplo: "pendiente"'),
    txt(5.0, 1.2, 'Una pregunta, dos respuestas posibles'),
  ], 'Diagrama de una decisión. Arriba, una caja con Condición: B2 mayor que 100. De ella sale una flecha hacia un rombo con un signo de interrogación. Del rombo salen dos flechas: la de la izquierda, rotulada Sí, va a una caja que dice Valor verdadero, y debajo pone Por ejemplo: 150; la de la derecha, rotulada No, va a una caja que dice Valor falso, y debajo pone Por ejemplo: "pendiente". Abajo del todo, la frase Una pregunta, dos respuestas posibles.');

  // ------------------------------------------------------------------
  L('Referencias relativas y absolutas', {
    objetivo: 'Copiar fórmulas sin que se rompan: saber cuándo una referencia se mueve con la fórmula y cuándo hay que fijarla.',
    vidaReal: `
      <p>Copiar una fórmula es lo más rápido que hay y también lo que más problemas da. En una lista de precios, la misma cuenta (la cantidad por el precio) se repite en veinte filas: si la dirección de la celda se mueve de sitio, los veinte resultados salen mal y cuesta mucho tiempo encontrarlos. Por eso conviene mirar la barra de fórmulas antes de dar por bueno un total, y acordarse de fijar a mano las direcciones que no deben moverse.</p>`,
    explicacion: `
      <p>Copias la fórmula de un total y la pegas una fila más abajo. El resultado cambia de sitio, el total sale mal y no sabes por qué. La pregunta es cómo viaja una fórmula sin romperse.</p>
      <p>La respuesta está en cómo están escritas las direcciones de las celdas dentro de la fórmula. Cuando copias una fórmula, el programa ajusta esas direcciones para que sigan señalando a las celdas que quedan al lado de la nueva posición. Por eso, si en la celda C2 escribes =A2*B1 y la copias a C3, en C3 acabarás con =A3*B2: la columna A pasó a ser la B y la fila 2 pasó a ser la 3, porque cada dirección se ha corrido una posición.</p>
      <p>Una <strong>referencia relativa</strong> (<span lang="en">relative reference</span>) es, justamente, una dirección que se mueve con la fórmula. Es lo que quieres cuando repites la misma cuenta en una columna entera, y es lo que hace el tirador de relleno, la manija de la esquina de la celda: si lo arrastras hacia abajo, copia la fórmula y va ajustando las direcciones por su cuenta.</p>
      <p>Ahora bien, hay un caso en el que no quieres que se mueva. Imagina una hoja con el precio de un producto escrito en B1 y las cantidades en la columna A. La fórmula que multiplica una cantidad por el precio es =A2*$B$1, y el precio tiene que seguir siendo el de B1 en todas las filas, aunque copies la fórmula veinte veces.</p>
      <p>Para que eso pase, la dirección tiene que ser una <strong>referencia absoluta</strong> (<span lang="en">absolute reference</span>): se escribe con un signo de dólar delante de la letra y del número, como $B$1. Ese signo se llama <strong>fijado</strong> (<span lang="en">absolute reference marker</span>) y significa «esta dirección no se mueve, aunque copies la fórmula».</p>
      <p>La ayuda de LibreOffice explica además un atajo muy cómodo: la tecla F4 va cambiando la referencia de la celda en la que está el cursor. Con la referencia A1, la primera vez que la pulsas se vuelve $A$1 (quedan fijas la columna y la fila), la segunda vez A$1 (queda fija solo la fila), la tercera $A1 (queda fija solo la columna) y la cuarta vuelve a A1, que se mueve con la fórmula.</p>
      <p>Fíjate en la diferencia entre las dos formas de escribir una referencia: con A$1 la fila 1 se queda quieta y la columna sigue cambiando; con $A1 la columna A se queda quieta y la fila sigue cambiando. Con los dos dólares, $A$1, no se mueve nada.</p>
      <p>Y una regla práctica para el día a día: si al copiar una fórmula el resultado sale raro, lo primero es mirar la barra de fórmulas y ver si falta un signo de dólar en alguna dirección.</p>
      ${RELATIVAS}
      <div class="tabla-wrap"><table>
        <thead><tr><th>Tipo de referencia</th><th>Cómo se escribe</th><th>Qué pasa al copiarla</th></tr></thead>
        <tbody>
          <tr><th scope="row">Relativa</th><td>=A2*B1</td><td>Se ajusta: copiada una fila abajo pasa a ser =A3*B2.</td></tr>
          <tr><th scope="row">Absoluta</th><td>=A2*$B$1</td><td>No se mueve: el precio sigue siendo el de B1 en todas las filas.</td></tr>
          <tr><th scope="row">Absoluta con la fila fija</th><td>=A2*B$1</td><td>La fila 1 se queda quieta; la columna se mueve.</td></tr>
          <tr><th scope="row">Absoluta con la columna fija</th><td>=A2*$B1</td><td>La columna B se queda quieta; la fila se mueve.</td></tr>
        </tbody>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> dejar que la fórmula se ajuste cuando no debía. Si el precio está en B1 y escribes =A2*B1, al copiar hacia abajo la dirección se va a B2, que está vacía, y el total sale cero en lugar del precio. Si en esa celda hay un texto en vez de un número, el programa muestra el error #VALUE!. La solución no es rehacer la cuenta: es añadir los dos dólares.</p>`,
    ejemplo: `
      <p>Una hoja de ventas: en B1 está el precio de un producto, 2,50, y en A2, A3 y A4 las cantidades, 3, 5 y 2. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Escribe 2,50 en B1 y las cantidades 3, 5 y 2 en A2, A3 y A4.</li>
        <li>En C2 escribe =A2*$B$1. En la celda aparece 7,50: tres multiplicado por 2,50.</li>
        <li>Copia C2 y pégala en C3 y en C4. Los resultados son 12,50 y 5,00, los correctos.</li>
        <li>Comprueba en la barra de fórmulas con C4 seleccionada: pone =A4*$B$1. El precio sigue en B1, porque el signo de dólar lo fija.</li>
        <li>Prueba sin el signo de dólar: escribe =A2*B1 en D2 y cópiala hacia abajo. En D3 sale 0, porque la dirección se ha movido a B2, que está vacía.</li>
      </ol>
      <p>Resultado: <span class="resultado">7,50, 12,50 y 5,00 en la columna C, con el precio siempre en B1</span>.</p>
      <p class="nota"><strong>Error común:</strong> quedarse con el total en cero y buscar el fallo en los datos. La causa casi siempre es la misma: falta un signo de dólar en la dirección que debía quedarse quieta.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Copias una fórmula hacia abajo. ¿Qué referencia se queda exactamente en el mismo sitio?</p>',
        opciones: ['$B$1', 'B1', 'A2', '$B2'], correcta: 0,
        pista: '<p>Busca la que tiene el signo de dólar delante de la letra y del número.</p>',
        solucion: '<p>$B$1 no se mueve al copiar la fórmula: la columna B y la fila 1 siguen siendo las mismas. En cambio, B1 y A2 se ajustan, y $B2 solo tiene fijada la columna, así que la fila sí cambia.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué hace el signo de dólar en una referencia?</p>',
        opciones: ['Convierte la referencia en absoluta, para que la dirección no se mueva al copiar la fórmula', 'Indica que la celda está vacía y hay que llenarla', 'Marca el final de la fórmula', 'Sirve para redondear el resultado a dos decimales'], correcta: 1,
        pista: '<p>Piensa en lo que le pasa a la dirección cuando copias la fórmula.</p>',
        solucion: '<p>El signo de dólar convierte la referencia en absoluta: la dirección deja de moverse al copiar la fórmula. Por eso una fórmula que multiplica por un precio fijo necesita los dos dólares delante de la letra y del número.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas referencias es relativa?</p>',
        opciones: ['A2', '$A$2', 'A$2', '$A2'], correcta: 2,
        pista: '<p>Una referencia relativa es la que no tiene ningún signo de dólar.</p>',
        solucion: '<p>A2 es la única sin dólares, así que es la relativa: al copiarla se convierte en A3, A4... Las otras tres tienen alguna parte fijada, y por eso no se mueven del todo.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la dirección de una celda que no se mueve cuando copias la fórmula?</p>',
        respuestas: ['referencia absoluta', 'la referencia absoluta', 'absolute reference', 'referencia absoluta (absolute reference)'],
        pista: '<p>Es el contrario de la referencia que se mueve con la fórmula, y lleva un signo de dólar.',
        solucion: '<p>Se llama referencia absoluta (absolute reference). Se escribe con un signo de dólar delante de la letra y del número, como $B$1, y no se mueve cuando copias la fórmula.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para dejar fija la dirección del precio en una fórmula.</p>',
        respuesta: ['Seleccionar la celda con la fórmula', 'Poner el cursor sobre la dirección del precio', 'Pulsar la tecla F4 hasta que aparezca el signo de dólar', 'Mirar en la barra de fórmulas que la dirección lo tiene'],
        pista: '<p>Primero se selecciona, después se coloca el cursor y al final se comprueba.',
        solucion: '<p>El orden es seleccionar la celda, poner el cursor sobre la dirección, pulsar F4 hasta que aparezca el signo de dólar y mirar en la barra de fórmulas que la dirección lo tiene. Con un solo F4 la referencia pasa a $A$1, con la columna y la fila fijas.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas direcciones de celda aparecen en las cuatro fórmulas del diagrama?</p>', respuesta: 4 * 2,
        pista: '<p>Cada fórmula del diagrama lleva dos direcciones: una multiplicada y otra por la que se multiplica.',
        solucion: '<p>Son <strong>8</strong>: las cuatro fórmulas del diagrama (dos relativas y dos absolutas) llevan dos direcciones cada una, y 4 × 2 = 8.</p>' },
    ],
    fuentes: [
      LO('Addresses and References, Absolute and Relative', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/relativ_absolut_ref.xhp'),
      LO('Copying Formulas', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/formula_copy.xhp'),
      LO('Error Codes in Calc', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/05/02140000.xhp'),
    ],
  });

  // ------------------------------------------------------------------
  L('Funciones: SUMA, PROMEDIO, MIN, MAX y CONTAR', {
    objetivo: 'Usar las funciones SUMA, PROMEDIO, MIN, MAX y CONTAR para obtener totales, medias y recuentos de un rango, y poner un total con la suma automática.',
    vidaReal: `
      <p>Hay cuentas que se repiten siempre igual: el total de los gastos, el promedio de las notas, el día en que más se gastó. Pedírselas al programa una sola vez y que se calculen solas es la diferencia entre rehacer la cuenta cada mes y tenerla lista en un segundo. También sirve para comparar de un vistazo el mayor, el menor y cuántos datos hay, sin recorrer la lista con el dedo.</p>`,
    explicacion: `
      <p>Sumar una columna a mano es un trabajo que se repite cada mes, y al mes siguiente vuelve a empezar. La pregunta es cómo se lo pides al programa una sola vez.</p>
      <p>Una <strong>función</strong> (<span lang="en">function</span>) es una operación con nombre que el programa sabe hacer. Se escribe con el nombre de la función y un paréntesis: =SUMA(B2:B9). Lo que va dentro del paréntesis son los <strong>argumentos</strong> (<span lang="en">argument</span>): lo que le pasas a la función. En este caso, el argumento es un rango de celdas, B2:B9, el bloque que quieres sumar.</p>
      <p>Hay una diferencia con la fórmula de la lección «Fórmulas básicas»: allí escribías operadores (+, -, *) entre los valores; aquí no hay operadores, solo el nombre y sus paréntesis. Y las partes de una función se separan con un punto y coma, como en =REDONDEAR(A1;1).</p>
      <p>Las cinco funciones de esta lección se reparten las preguntas que más se le hacen a una lista de números:</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Función</th><th>Qué hace</th><th>Ejemplo de fórmula</th></tr></thead>
        <tbody>
          <tr><th scope="row">SUMA</th><td>Suma los números de un rango o de una lista.</td><td>=SUMA(B2:B9)</td></tr>
          <tr><th scope="row">PROMEDIO</th><td>Calcula la media: el total dividido por la cantidad de números.</td><td>=PROMEDIO(B2:B9)</td></tr>
          <tr><th scope="row">MIN</th><td>Devuelve el valor más pequeño de una lista.</td><td>=MIN(B2:B9)</td></tr>
          <tr><th scope="row">MAX</th><td>Devuelve el valor más grande de una lista.</td><td>=MAX(B2:B9)</td></tr>
          <tr><th scope="row">CONTAR</th><td>Cuenta cuántos números hay en la lista. El texto no se cuenta.</td><td>=CONTAR(B2:B9)</td></tr>
        </tbody>
      </table></div>
      <p>El promedio es la media de los números, la que ya viste en la lección «Media, mediana y moda» de Matemáticas; aquí lo que hace el programa es calcularla por ti sobre el rango que le digas.</p>
      <p>Ahora viene la diferencia importante entre SUMA y CONTAR: SUMA suma los números que encuentra y se salta el texto, mientras que CONTAR cuenta solo los números. La ayuda de LibreOffice lo pone con un ejemplo: =CONTAR(2;4;6;"ocho") devuelve 3, porque cuenta los tres números y deja fuera el texto. Si en tu lista hay una celda con la palabra «pendiente», el total y la cuenta saldrán más bajos de lo que parece. MIN y MAX tienen el mismo cuidado con el texto, y si el rango no tiene ningún número devuelven 0 en lugar de un error.</p>
      <p>El atajo que más ahorra tiempo es la <strong>suma automática</strong> (<span lang="en">AutoSum</span>): el botón con la letra sigma (Σ) que hay en la barra de herramientas. Si seleccionas antes el rango de los importes y pulsas el botón, el programa escribe la fórmula de suma por ti y coloca el resultado en la primera celda libre debajo del rango (a la derecha, si el rango es de una sola fila).</p>
      <p>La flecha que tiene ese botón a su derecha abre una lista con las variantes: Suma, Promedio, Mín, Máx, Contar, ContarA, Producto, DesvEst, DesvEstP, Var y VarP. Así que no hace falta acordarse de memoria el nombre de cada función: se elige en la lista y el programa escribe la fórmula.</p>
      <p>Y para llevar ese total a otras columnas está el tirador de relleno, la manija de la esquina de la celda: si lo arrastras hacia la derecha, copia la fórmula y ajusta las direcciones, de modo que el total de cada columna se calcula con los datos de esa columna.</p>
      <p>Por último, una regla de oro: el total se escribe con la función, nunca con el número a mano. Un total tecleado no se corrige cuando cambias un importe; uno calculado, sí.</p>
      ${TOTALES}
      <p class="nota"><strong>Trampa común:</strong> esperar que la función avise de que hay un dato que no es un número. No avisa: SUMA se salta el texto sin más y el total sale más corto. Si un total no cuadra, mira primero cómo están guardados los datos.</p>`,
    ejemplo: `
      <p>Una hoja de gastos con cinco importes en B2:B6, que son 10, 20, 30, 40 y 50. Las cifras del ejemplo son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Marca el rango B2:B6, arrastrando desde B2 hasta B6.</li>
        <li>Pulsa el botón de la suma automática, el que tiene la letra sigma (Σ). El total 150 aparece en B7, justo debajo del rango.</li>
        <li>Selecciona B7 y mira la barra de fórmulas: pone =SUMA(B2:B6). El total está vivo, no es un número tecleado.</li>
        <li>Abre la flecha del botón y elige Promedio. En B8 aparece =PROMEDIO(B2:B6), que da 30.</li>
        <li>Cambia el 20 de B3 por 60: el total pasa a 190 y el promedio a 36, sin que toques ninguna fórmula.</li>
        <li>Por último, arrastra el tirador de la esquina de B7 hacia la derecha, hasta E7, y verás el total de cada columna.</li>
      </ol>
      <p>Resultado: <span class="resultado">150 en B7, con la fórmula =SUMA(B2:B6) detrás</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir 150 a mano en la celda del total. Se ve igual, pero deja de actualizarse en cuanto corriges o añades un importe.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué función devuelve el valor más grande de un rango?</p>',
        opciones: ['MAX', 'MIN', 'CONTAR', 'PROMEDIO'], correcta: 1,
        pista: '<p>Una de ellas devuelve el valor más grande y otra, el más pequeño.',
        solucion: '<p>MAX devuelve el valor más grande y MIN el más pequeño. CONTAR dice cuántos números hay y PROMEDIO calcula su media.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué cuenta la función CONTAR?</p>',
        opciones: ['El número de celdas con números', 'El número de celdas con cualquier contenido', 'La suma de los números', 'El promedio de los números'], correcta: 0,
        pista: '<p>Piensa qué hace con una celda que contiene una palabra en vez de un número.',
        solucion: '<p>CONTAR cuenta solo los números: las celdas de texto no se cuentan. Por eso =CONTAR(2;4;6;"ocho") devuelve 3.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es un argumento de una función?</p>',
        opciones: ['Lo que le pasas a la función: un rango, un número o un texto', 'El nombre de la función', 'El resultado que devuelve la función', 'El signo igual con el que empieza la fórmula'], correcta: 2,
        pista: '<p>Va dentro de los paréntesis de la función.',
        solucion: '<p>El argumento es lo que va dentro de los paréntesis: en =SUMA(B2:B9), el argumento es el rango B2:B9. El nombre de la función va antes del paréntesis.</p>' },
      { tipo: 'texto', enunciado: '<p>Escribe la fórmula que suma las celdas del rango B2:B9.</p>',
        respuestas: ['=SUMA(B2:B9)', 'SUMA(B2:B9)', '=SUMA (B2:B9)', 'SUMA (B2:B9)', '=SUMA( B2:B9 )'],
        pista: '<p>Empieza por el signo igual, escribe el nombre de la función, abre el paréntesis, pon el rango con dos puntos y cierra el paréntesis.',
        solucion: '<p>La fórmula es <strong>=SUMA(B2:B9)</strong>. El argumento es el rango: la dirección de la primera celda, dos puntos y la de la última.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para poner un total con la suma automática.</p>',
        respuesta: ['Seleccionar el rango de los importes', 'Pulsar el botón de la suma automática', 'Ver el total que aparece debajo del rango', 'Seleccionar la celda del total y mirarlo en la barra de fórmulas'],
        pista: '<p>Primero se señala el rango y después se pulsa el botón.',
        solucion: '<p>El orden es seleccionar, pulsar el botón, ver el total y comprobar en la barra de fórmulas que lo que hay escrito es una fórmula y no un número tecleado.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas funciones hay en la tabla de la lección?</p>', respuesta: 5,
        pista: '<p>Cuenta las filas de la tabla, sin contar el encabezado.',
        solucion: '<p>Son <strong>5</strong>: SUMA, PROMEDIO, MIN, MAX y CONTAR. Cada una responde a una pregunta distinta sobre la misma lista de números.</p>' },
    ],
    fuentes: [
      LO('Calculating With Formulas', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/formulas.xhp'),
      LO('Converting Text to Numbers', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/numbers_text.xhp'),
      LO('COUNT Function', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/01/04060181.xhp'),
      LO('AVERAGE, MIN, MAX Functions', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/01/04060184.xhp'),
      LO('Select Function (AutoSum)', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/02/06030000.xhp'),
      LO('Copying Formulas', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/formula_copy.xhp'),
    ],
  });

  // ------------------------------------------------------------------
  L('La función SI', {
    objetivo: 'Escribir la función SI para que la hoja elija una respuesta u otra según se cumpla una condición, y saber cuándo usar texto entre comillas.',
    vidaReal: `
      <p>En una hoja de pagos o en una lista de tareas, cada fila necesita una etiqueta: si ya está pagado, si falta el dato, si se pasa del límite. Escribir esa etiqueta a mano en cada fila es un trabajo que se equivoca en algún momento. Una fórmula que decide sola según lo que hay en cada fila evita ese error y además se corrige sola cuando cambias un dato.</p>`,
    explicacion: `
      <p>La columna del total necesita una etiqueta: «pendiente» si falta un dato, «al día» si ya está pagado. Escribir esa etiqueta a mano en cada fila es un trabajo que se equivoca en algún momento. La pregunta es cómo pedirle al programa una cosa u otra según el caso.</p>
      <p>Para eso está la función SI. Se escribe =SI(Prueba; ValorVerdadero; ValorFalso) y lo que hace es muy sencillo: le haces una pregunta y te devuelve una de dos respuestas. La pregunta se llama <strong>condición</strong> (<span lang="en">condition</span>) y es cualquier cosa que se pueda responder con verdadero o falso. Las dos respuestas también tienen nombre: lo que se escribe si la pregunta es cierta se llama <strong>valor verdadero</strong> (<span lang="en">true value</span>), y lo que se escribe si es falsa se llama <strong>valor falso</strong> (<span lang="en">false value</span>).</p>
      <p>La forma de leerla en voz alta es la que te va a salir sola: «si B2 es mayor que 100, escribe "alto"; si no, escribe "bajo"».</p>
      <p>Y lo que la hace útil en una hoja es que en cada rama puede haber un texto, un número o una cuenta. Puedes marcar un pago, avisar de que un importe se pasa del límite o calcular una comisión, todo con la misma fórmula.</p>
      <p>La condición se escribe comparando. Para números, con los signos que ya conoces: B2&gt;100 quiere decir «el valor de B2 es mayor que 100». Para texto, la comparación se hace con el texto entre comillas rectas: D2="pagado" quiere decir «en D2 pone pagado». La ayuda de LibreOffice pone el ejemplo =SI(A1&gt;5;100;"too small"): si en A1 hay un número mayor que 5, devuelve 100; si no, devuelve el texto.</p>
      <p>Un criterio de esta lección: el texto que comparas tiene que estar escrito exactamente igual que está en la celda, porque «pagado» y «Pagado» no son el mismo texto.</p>
      <p>Y un detalle sobre las partes que sobran: la ayuda explica que si dejas vacío el valor verdadero o el valor falso, el programa lo toma como un cero. Por eso una fórmula a la que le falta una rama no da error: da 0, y eso es más difícil de detectar.</p>
      <p>El separador entre las tres partes es, en los ejemplos de esta lección, el punto y coma. Criterio de esta lección: si tu programa usa la coma, escribe la fórmula con comas, porque el separador cambia según la configuración del programa.</p>
      ${DECISION}
      <div class="tabla-wrap"><table>
        <thead><tr><th>Parte de la función</th><th>Qué es</th><th>Ejemplo</th></tr></thead>
        <tbody>
          <tr><th scope="row">Condición</th><td>La pregunta que se responde con verdadero o falso.</td><td>B2&gt;100</td></tr>
          <tr><th scope="row">Valor verdadero</th><td>Lo que se escribe si la condición se cumple.</td><td>"alto"</td></tr>
          <tr><th scope="row">Valor falso</th><td>Lo que se escribe si la condición no se cumple.</td><td>"bajo"</td></tr>
          <tr><th scope="row">Separador</th><td>El signo que va entre las tres partes.</td><td>;</td></tr>
        </tbody>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> comparar un texto sin comillas. El programa toma «pagado» como el nombre de una celda, no encuentra esa celda y la fórmula no hace lo que querías. Las comillas rectas no son un adorno: le dicen al programa que lo que va dentro es texto.</p>`,
    ejemplo: `
      <p>Una hoja de pedidos: en la columna B está el importe de cada pedido y en la columna C quieres la etiqueta «alto» o «bajo».</p>
      <ol class="pasos-ej">
        <li>Escribe en C2 la fórmula =SI(B2&gt;100;"alto";"bajo") y pulsa Intro. En C2 aparece «alto», porque el importe de B2 es 150.</li>
        <li>Selecciona C2 y mira la barra de fórmulas: pone la fórmula, no la palabra «alto» tecleada.</li>
        <li>Cambia el 150 de B2 por 80: la celda C2 pasa a decir «bajo» sola, sin que toques nada.</li>
        <li>Ahora una condición de texto: en D2 hay «pagado» y en E2 escribes =SI(D2="pagado";"al día";"pendiente"). En E2 aparece «al día».</li>
        <li>Cambia «pagado» por «pendiente» en D2 y mira cómo cambia E2 al instante.</li>
      </ol>
      <p>Resultado: <span class="resultado">C2 dice «alto» o «bajo» según el importe, y E2 marca el pago</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar las comillas del texto. Si escribes =SI(D2=pagado;"al día";"pendiente"), el programa busca una celda llamada pagado, no la encuentra y la fórmula no funciona.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué escribe la función SI cuando la condición es falsa?</p>',
        opciones: ['El valor falso', 'El valor verdadero', 'Nada: la celda queda vacía', 'El error #N/A'], correcta: 2,
        pista: '<p>Son dos respuestas: una para cuando la condición se cumple y otra para cuando no.',
        solucion: '<p>Escribe el valor falso, que es la segunda respuesta. Si esa parte se deja vacía, el programa la toma como un cero.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué va primero en la fórmula de la función SI?</p>',
        opciones: ['La condición', 'El valor verdadero', 'El valor falso', 'El nombre de la función y el signo igual'], correcta: 0,
        pista: '<p>Es la pregunta que se hace la hoja.',
        solucion: '<p>Primero va la condición, la pregunta que se responde con verdadero o falso. Después van el valor verdadero y el valor falso.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve la rama verdadera?</p>',
        opciones: ['Para lo que se escribe cuando la condición se cumple', 'Para comprobar que la fórmula está bien escrita', 'Para poner el nombre de la función', 'Para separar las tres partes de la fórmula'], correcta: 1,
        pista: '<p>Es la respuesta que sale cuando la pregunta es cierta.',
        solucion: '<p>La rama verdadera es lo que se escribe si la condición se cumple. Puede ser un texto, un número o una cuenta, como en =SI(B2&gt;100;100;0).</p>' },
      { tipo: 'texto', enunciado: '<p>Escribe la función SI que escribe "alto" si el importe de la celda B2 es mayor que 100, y "bajo" si no lo es.</p>',
        respuestas: [
          '=SI(B2>100;"alto";"bajo")', 'SI(B2>100;"alto";"bajo")',
          '=SI(B2>100,"alto","bajo")', 'SI(B2>100,"alto","bajo")',
          '=SI(B2>100; "alto"; "bajo")', '=SI(B2>100, "alto", "bajo")',
          'SI(B2>100; "alto"; "bajo")', 'SI(B2>100, "alto", "bajo")',
        ],
        pista: '<p>Escribe SI, la condición con su signo de mayor que, y después las dos respuestas entre comillas.',
        solucion: '<p>La fórmula es <strong>=SI(B2&gt;100;"alto";"bajo")</strong>. La condición va primero y las dos respuestas, entre comillas rectas, después.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena las tres partes de la función SI.</p>',
        respuesta: ['La condición: la pregunta que se responde con verdadero o falso', 'El valor verdadero: lo que se escribe si la condición se cumple', 'El valor falso: lo que se escribe si la condición no se cumple'],
        pista: '<p>Primero se pregunta, después se contesta.',
        solucion: '<p>El orden es la condición, el valor verdadero y el valor falso. La fórmula se lee en voz alta como «si la condición se cumple, escribe el valor verdadero; si no, escribe el valor falso».</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas ramas tiene el diagrama de la lección?</p>', respuesta: 2,
        pista: '<p>Cuenta los caminos que salen de la pregunta: uno para el sí y otro para el no.',
        solucion: '<p>Son <strong>2</strong>: la rama del sí, que da el valor verdadero, y la rama del no, que da el valor falso.</p>' },
    ],
    fuentes: [
      LO('IF Function', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/01/04060105.xhp'),
      LO('Calculating With Formulas', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/formulas.xhp'),
      LO('Error Codes in Calc', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/05/02140000.xhp'),
    ],
  });

  // ------------------------------------------------------------------
  // De dos tablas a una respuesta: el valor buscado entra y el precio sale.
  const BUSQUEDA = diagrama([0, 13.6], [0, 7], [
    ...caja(2.0, 4.3, 3.4, 1.0, 'D5 = "Camiseta"', true),
    ...flecha([3.85, 4.3], [5.0, 4.3], 0, 0.8),
    { tipo: 'poligono', puntos: [[5.2, 2.9], [7.2, 2.9], [7.2, 5.4], [5.2, 5.4]], relleno: true, serie: 0 },
    { tipo: 'poligono', puntos: [[7.2, 3.8], [9.2, 3.8], [9.2, 4.6], [7.2, 4.6]], relleno: true, serie: 1 },
    { tipo: 'linea', desde: [5.2, 5.4], hasta: [9.2, 5.4] }, { tipo: 'linea', desde: [5.2, 4.6], hasta: [9.2, 4.6] },
    { tipo: 'linea', desde: [5.2, 3.8], hasta: [9.2, 3.8] }, { tipo: 'linea', desde: [5.2, 2.9], hasta: [9.2, 2.9] },
    { tipo: 'linea', desde: [5.2, 2.9], hasta: [5.2, 5.4] }, { tipo: 'linea', desde: [7.2, 2.9], hasta: [7.2, 5.4] },
    { tipo: 'linea', desde: [9.2, 2.9], hasta: [9.2, 5.4] },
    txt(6.2, 5.05, 'Producto'), txt(8.2, 5.05, 'Precio'),
    txt(6.2, 4.2, 'Camiseta'), txt(8.2, 4.2, '12,50'),
    txt(6.2, 3.35, 'Pantalón'), txt(8.2, 3.35, '18,00'),
    ...flecha([9.35, 4.2], [9.9, 4.2], 0, 0.8),
    ...caja(11.6, 4.2, 3.5, 1.0, 'Resultado: 12,50', true),
    txt(6.6, 2.1, 'BUSCARV recorre la primera columna, señalada a la izquierda'),
    txt(6.6, 1.3, 'y toma el valor de la columna que le pidas, marcada a la derecha'),
  ], 'Diagrama de izquierda a derecha. Una caja con D5 = "Camiseta", el valor que se quiere encontrar. Una flecha llega a una tabla de precios con dos columnas, Producto y Precio, y dos filas: Camiseta con 12.50 y Pantalón con 18.00. La primera columna, donde BUSCARV busca de arriba a abajo, está sombreada, y la celda con el precio 12.50 está marcada con otro color. De esa celda sale una flecha hacia una última caja que dice Resultado: 12.50. Debajo, las frases BUSCARV recorre la primera columna, señalada a la izquierda, y toma el valor de la columna que le pidas, marcada a la derecha.');

  // ------------------------------------------------------------------
  L('Buscar datos: BUSCARV y BUSCARX', {
    objetivo: 'Cruzar dos listas con las funciones de búsqueda: escribir BUSCARV con su número de índice y exigir la coincidencia exacta, y reconocer el error #N/A cuando el dato no está.',
    vidaReal: `
      <p>Tienes la lista de lo que vas a comprar en una hoja y la lista de precios en otra, y cruzarlas a mano es mirar fila por fila, con el riesgo de copiar el precio equivocado. La hoja puede hacer ese cruce por ti: tú escribes qué artículo buscas y la tabla te contesta con el precio que le corresponde. Si el dato no está, te lo dice con un aviso visible en lugar de inventarse una respuesta.</p>`,
    explicacion: `
      <p>Vas por una lista de compras con la lista de precios al lado, y buscarlos a mano es lento y de vez en cuando te llevas el precio de la fila de al lado. La pregunta es cómo se lo pides al programa.</p>
      <p>Para eso sirve un tipo de función que busca. La más clásica es BUSCARV, así la llama LibreOffice Calc (la V viene de vertical): comprueba si un valor está en la primera columna de una tabla y, si está, devuelve el valor de esa misma fila en la columna que tú le indiques. La fórmula se escribe =BUSCARV(ValorBuscado; Matriz; Índice; CoincidenciaExacta), con el paréntesis y los argumentos igual que en la lección «Funciones: SUMA, PROMEDIO, MIN, MAX y CONTAR».</p>
      <p>El primer argumento es el <strong>valor buscado</strong> (<span lang="en">lookup value</span>): lo que quieres encontrar, por ejemplo el nombre de un producto. El segundo es la tabla donde se busca, escrita como un rango con dos puntos. El tercero es el índice, el número de la columna de la tabla donde está el resultado, y ojo: la primera columna es la 1, contado desde dentro del rango y no desde la hoja entera.</p>
      <h3>El último argumento: la coincidencia exacta</h3>
      <p>El cuarto argumento es la <strong>coincidencia exacta</strong> (<span lang="en">exact match</span>). Si escribes un 0, el programa solo devuelve un resultado cuando el valor buscado es idéntico al de la tabla; si no lo encuentra, devuelve el error #N/A. Si se omite, el programa asume que la columna está ordenada y, cuando no halla el valor, trae el último valor más pequeño que él: un valor parecido, sin decir nada. La regla práctica sale de ahí: pon siempre el 0 del final, porque es mejor un error visible que el precio de otro producto.</p>
      <h3>Buscar al revés: BUSCARH y BUSCARX</h3>
      <p>Si tus claves están en la primera fila y no en la primera columna, la hermana es BUSCARH, de horizontal: busca en la primera fila y devuelve el valor de la fila que le indiques, con los mismos cuatro argumentos.</p>
      <p>Y está BUSCARX, que LibreOffice llama el reemplazo moderno de las anteriores: busca un valor en un vector (una fila o una columna) y devuelve lo que hay en otro vector del mismo tamaño, sin exigir orden. Se escribe =BUSCARX(ValorBuscado; VectorBúsqueda; VectorResultado) y acepta un cuarto argumento, SiNoEncontrado: ahí escribes lo que quieres ver cuando no hay coincidencia, por ejemplo "no está", y ese texto aparece en la celda en lugar del error.</p>
      <p>El <strong>error #N/A</strong> no es un fallo de la hoja: significa «valor no disponible» y sale cuando la búsqueda no encuentra el valor. Es buena noticia: se ve de lejos y avisa de que falta el dato. Lo peligroso es la búsqueda que devuelve un cero o un precio del otro producto sin avisar: parece que todo va bien y el total está mal.</p>
      ${BUSQUEDA}
      <div class="tabla-wrap"><table>
        <thead><tr><th>Función</th><th>Dónde busca</th><th>Qué devuelve</th></tr></thead>
        <tbody>
          <tr><th scope="row">BUSCARV</th><td>En la primera columna de la tabla, de arriba abajo.</td><td>El valor de la misma fila en la columna que pida el índice.</td></tr>
          <tr><th scope="row">BUSCARH</th><td>En la primera fila de la tabla, de izquierda a derecha.</td><td>El valor de la misma columna en la fila que pida el índice.</td></tr>
          <tr><th scope="row">BUSCARX</th><td>En un vector, una fila o una columna.</td><td>El valor del vector resultado, del mismo tamaño; sin exigir orden.</td></tr>
          <tr><th scope="row">Coincidencia exacta</th><td>Se pide con un 0 como último argumento.</td><td>Resultado solo si el valor es idéntico; si no, el error #N/A.</td></tr>
          <tr><th scope="row">Error #N/A</th><td>Aparece cuando la búsqueda no encuentra nada.</td><td>Nada: significa «valor no disponible» y avisa del hueco.</td></tr>
        </tbody>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> olvidar el 0 del final y fiarse del resultado aunque llegue sin el dato exacto. Si ese argumento falta, el programa asume que la columna está ordenada y, si el dato no está, entrega el valor más parecido que sea más pequeño: parece un precio legítimo y es el de otro producto. El #N/A, a la vista, nunca miente.</p>`,
    ejemplo: `
      <p>La lista de precios está en el rango A2:B9: la columna A con los productos y la B con sus importes. En la columna D anotas los pedidos y en la E quieres el precio de cada uno. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>En D5 escribe Camiseta, el producto pedido.</li>
        <li>En E5 escribe =BUSCARV(D5;A2:B9;2;0) y pulsa Intro: aparece 12,50, el valor de la segunda columna en la fila de la Camiseta.</li>
        <li>Cambia D5 por Pantalón: E5 pasa a 18,00 sola, porque la fórmula sigue viviendo ahí.</li>
        <li>Prueba con Gorra, que no está en la lista: en E5 aparece #N/A, el aviso de que no hay dato que devolver.</li>
        <li>En la celda de al lado escribe =BUSCARX(D5;A2:A9;B2:B9;"no está"): con la gorra en D5, aparece el texto en lugar del error.</li>
      </ol>
      <p>Resultado: <span class="resultado">E5 muestra 12,50, 18,00, "no está" o #N/A, según lo que haya en D5</span>.</p>
      <p class="nota"><strong>Error común:</strong> contar el índice desde la hoja entera: dentro del rango A2:B9, la columna A es la 1 y la B la 2, y pedir el 3 trae un valor de fuera de la tabla.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Tienes los nombres de los productos en la primera <em>fila</em> de la tabla, no en la primera columna. ¿Qué función busca en esa primera fila?</p>',
        opciones: ['BUSCARH, que busca en la primera fila y devuelve el valor de la fila que pidas', 'BUSCARV, que busca de arriba abajo', 'BUSCARX, porque es la más moderna', 'Ninguna: hay que girar la tabla a mano'], correcta: 0,
        pista: '<p>La letra del nombre de la función dice la dirección: V de vertical, H de horizontal.</p>',
        solucion: '<p>Es BUSCARH, la versión horizontal: busca en la primera fila y devuelve el valor de la fila que le indiques, con los mismos argumentos que BUSCARV. BUSCARX también sabe buscar en filas, pero si la tabla está puesta a lo ancho, la clásica es esta.</p>' },
      { tipo: 'opciones', enunciado: '<p>En la celda del resultado aparece #N/A después de buscar. ¿Qué significa?</p>',
        opciones: ['Que la fórmula está mal escrita y hay que borrarla', 'Que la celda del resultado está demasiado estrecha', 'Que no se encontró el valor buscado: el resultado no está disponible', 'Que la tabla tiene demasiadas columnas'], correcta: 2,
        pista: '<p>El error dice lo que le pasa a la búsqueda: el valor no está donde la fórmula lo buscó.</p>',
        solucion: '<p>Significa «valor no disponible»: la búsqueda recorrió la columna y no halló el valor que le pediste. Es un aviso honesto, mejor que un resultado entregado sin decirlo, como un cero o un precio parecido.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve poner un 0 como último argumento de BUSCARV?</p>',
        opciones: ['Para que la búsqueda acepte valores parecidos si no encuentra el exacto', 'Para que el resultado se alinee a la derecha de la celda', 'Para ordenar la tabla antes de buscar', 'Para exigir la coincidencia exacta y que aparezca #N/A si el valor no está'], correcta: 3,
        pista: '<p>Es el argumento de la coincidencia exacta de la lección.</p>',
        solucion: '<p>El 0 (o FALSO) exige que el valor buscado sea idéntico al de la tabla; si no lo es, la función devuelve #N/A en lugar de traer un valor parecido. Sin ese argumento, la búsqueda asume datos ordenados y puede traerte el precio de otro producto.</p>' },
      { tipo: 'texto', enunciado: '<p>Escribe la fórmula BUSCARV completa: el valor a encontrar está en la celda A2, la tabla en el rango B2:D9, el dato que quieres está en la tercera columna de esa tabla y el último argumento es un 0 para exigir la coincidencia exacta.</p>',
        respuestas: [
          '=BUSCARV(A2;B2:D9;3;0)', 'BUSCARV(A2;B2:D9;3;0)',
          '=BUSCARV(A2,B2:D9,3,0)', 'BUSCARV(A2,B2:D9,3,0)',
          '=BUSCARV(A2; B2:D9; 3; 0)', 'BUSCARV(A2; B2:D9; 3; 0)',
          '=BUSCARV(A2, B2:D9, 3, 0)', 'BUSCARV(A2, B2:D9, 3, 0)',
        ],
        pista: '<p>El orden de los argumentos: primero el valor buscado, después la tabla, luego el número de columna y al final el 0, separados por punto y coma.</p>',
        solucion: '<p>La fórmula es <strong>=BUSCARV(A2;B2:D9;3;0)</strong>. Los argumentos van separados por punto y coma (o por coma, según la configuración del programa) y el 0 del final pide la coincidencia exacta.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para traer el precio de un producto a la celda del resultado.</p>',
        respuesta: ['Escribir el valor que quieres encontrar en una celda libre', 'Escribir la función BUSCARV con ese valor, la tabla y el número de columna', 'Poner un 0 como último argumento, para exigir la coincidencia exacta', 'Pulsar Intro y comprobar el resultado en la celda'],
        pista: '<p>Primero se apunta lo que se busca, después se escribe la fórmula que va a buscarlo.</p>',
        solucion: '<p>El orden es escribir el valor buscado, escribir la fórmula con los cuatro argumentos, poner el 0 del final y comprobar el resultado. Sin el 0, la búsqueda puede traerte el valor de otra fila sin avisar.</p>' },
      { tipo: 'numero', enunciado: '<p>La tabla del ejemplo está en el rango A2:B9 y el precio está en la columna B. Si la columna A del rango es la 1, ¿qué número de columna hay que poner como índice? Responde con el número.</p>', respuesta: 2,
        pista: '<p>El índice se cuenta desde la primera columna del rango de la tabla, y ahí la A es la 1.</p>',
        solucion: '<p>El precio está en la <strong>2</strong>: dentro del rango A2:B9 la columna A es la primera y la B la segunda. Contar el índice desde la hoja entera es el error que trae resultados de otra columna.</p>' },
    ],
    fuentes: [
      LO('VLOOKUP and HLOOKUP', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/01/04060109.xhp'),
      LO('XLOOKUP Function', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/01/func_xlookup.xhp'),
      LO('Error Codes in Calc', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/05/02140000.xhp'),
    ],
  });

  // ------------------------------------------------------------------
  // La misma tabla, dos veces: entera y con el filtro de marzo puesto.
  const FILTRO = diagrama([0, 12.6], [0, 7.6], [
    txt(3.1, 6.9, 'La tabla entera'), txt(9.2, 6.9, 'Filtro por marzo activado'),
    { tipo: 'linea', desde: [1.6, 6.2], hasta: [4.9, 6.2] }, { tipo: 'linea', desde: [1.6, 5.5], hasta: [4.9, 5.5] },
    { tipo: 'linea', desde: [1.6, 4.8], hasta: [4.9, 4.8] }, { tipo: 'linea', desde: [1.6, 4.1], hasta: [4.9, 4.1] },
    { tipo: 'linea', desde: [1.6, 3.4], hasta: [4.9, 3.4] }, { tipo: 'linea', desde: [1.6, 2.7], hasta: [4.9, 2.7] },
    { tipo: 'linea', desde: [1.6, 2.7], hasta: [1.6, 6.2] }, { tipo: 'linea', desde: [3.0, 2.7], hasta: [3.0, 6.2] },
    { tipo: 'linea', desde: [4.9, 2.7], hasta: [4.9, 6.2] },
    txt(2.3, 5.85, 'Mes'), txt(3.95, 5.85, 'Importe'),
    txt(2.3, 5.15, 'Marzo'), txt(3.95, 5.15, '20'),
    txt(2.3, 4.45, 'Abril'), txt(3.95, 4.45, '15'),
    txt(2.3, 3.75, 'Marzo'), txt(3.95, 3.75, '30'),
    txt(2.3, 3.05, 'Mayo'), txt(3.95, 3.05, '10'),
    { tipo: 'linea', desde: [7.7, 6.2], hasta: [11.0, 6.2] }, { tipo: 'linea', desde: [7.7, 5.5], hasta: [11.0, 5.5] },
    { tipo: 'linea', desde: [7.7, 4.8], hasta: [11.0, 4.8] }, { tipo: 'linea', desde: [7.7, 4.1], hasta: [11.0, 4.1] },
    { tipo: 'linea', desde: [7.7, 3.4], hasta: [11.0, 3.4] }, { tipo: 'linea', desde: [7.7, 2.7], hasta: [11.0, 2.7] },
    { tipo: 'linea', desde: [7.7, 2.7], hasta: [7.7, 6.2] }, { tipo: 'linea', desde: [9.1, 2.7], hasta: [9.1, 6.2] },
    { tipo: 'linea', desde: [11.0, 2.7], hasta: [11.0, 6.2] },
    { tipo: 'poligono', puntos: [[7.7, 4.8], [11.0, 4.8], [11.0, 5.5], [7.7, 5.5]], relleno: true, serie: 1 },
    { tipo: 'poligono', puntos: [[7.7, 3.4], [11.0, 3.4], [11.0, 4.1], [7.7, 4.1]], relleno: true, serie: 1 },
    txt(8.4, 5.85, 'Mes'), txt(10.05, 5.85, 'Importe'),
    txt(8.4, 5.15, 'Marzo'), txt(10.05, 5.15, '20'),
    txt(8.4, 3.75, 'Marzo'), txt(10.05, 3.75, '30'),
    txt(6.2, 1.9, 'Las filas de abril y mayo desaparecen de la vista'),
    txt(6.15, 1.2, 'siguen guardadas y reaparecen al quitar el filtro'),
  ], 'Diagrama con dos copias de una tabla de ventas, una a cada lado. La tabla de la izquierda se llama La tabla entera y tiene una columna de Mes y otra de Importe, con cuatro filas: Marzo con 20, Abril con 15, Marzo con 30 y Mayo con 10. La tabla de la derecha se llama Filtro por marzo activado, con las mismas columnas; solo las dos filas de Marzo muestran su texto y llevan un sombreado de acento, y las filas de Abril y Mayo quedan como casillas vacías, porque el filtro las ha escondido. Debajo, las frases Las filas de abril y mayo desaparecen de la vista, siguen guardadas y reaparecen al quitar el filtro.');

  // ------------------------------------------------------------------
  L('Ordenar y filtrar', {
    objetivo: 'Reorganizar las filas de una tabla con el comando de ordenar, ver solo las filas que cumplen un criterio con el filtro y saber qué les pasa a los totales cuando hay filas escondidas.',
    vidaReal: `
      <p>Cuando una lista de compras, de gastos o de notas pasa de diez líneas, seguirla a ojo deja de funcionar: el dato que buscas está en medio y no se ve. Dos gestos resuelven casi todo el trabajo diario: colocar las filas en un orden que tenga sentido, por fecha o del importe mayor al menor, y dejar a la vista únicamente las filas que te interesan, sin borrar nada. Así una lista larga vuelve a leerse de un vistazo y los totales dejan de dar sorpresas.</p>`,
    explicacion: `
      <p>Tienes una lista de ventas de doscientas filas y una pregunta: «cuáles de ellas se hacen en marzo». Recorrer las doscientas a mano ocupa la tarde, y sin ningún orden es peor todavía. La pregunta es cómo se lo pides al programa una sola vez y él obedece siempre.</p>
      <p>Con los datos puestos como corresponde, una fila por registro y una columna por tipo de dato, como viste en la lección «Celdas, filas y columnas», la hoja te da dos herramientas para responder esa clase de preguntas. La primera es <strong>ordenar</strong> (<span lang="en">sort</span>): el programa reorganiza las filas, del texto de la A a la Z o al revés, del número menor al mayor o al contrario, y con las fechas, del día más antiguo al más reciente, porque una fecha es un número por dentro, como viste en la lección «Tipos de datos».</p>
      <p>Para ordenar, la ayuda de LibreOffice distingue dos casos que cambian el resultado. Si marcas antes un trozo de celdas, se ordena únicamente ese trozo; si haces clic en una celda cualquiera sin seleccionar nada, se ordena el rango de datos entero. Después eliges Datos - Ordenar, y ahí conviene pararse: el rango que va a moverse se resalta con los colores invertidos, así que puedes comprobar antes de aceptar si va a mover lo que creías.</p>
      <p>Fíjate además en el detalle que más errores causa: el orden se pide por una columna concreta, no por la primera que aparezca. Ordenar por el nombre del cliente deja la lista en orden alfabético de nombres, y quien esperaba un orden de importes se lleva la sorpresa al mirar el resultado, porque la columna de los importes solo acompañaba el movimiento.</p>
      <p>La segunda herramienta es <strong>filtrar</strong> (<span lang="en">filter</span>): el programa esconde las filas que no cumplen el <strong>criterio</strong> (<span lang="en">criterion</span>), la condición que tú pones. El filtro automático (Datos - Filtro automático) añade un botón con una flecha en el encabezado de cada columna; abres la flecha, eliges el valor que quieres ver y quedan a la vista solo las filas que lo llevan. Puedes fijar otro filtro en otra columna: los desplegables de las columnas restantes pasan a ofrecer solo los datos que ya sobrevivieron, la entrada Todas devuelve la lista completa, y para desactivarlo vale con repetir Datos - Filtro automático o elegir Datos - Filtro - Restablecer. Si un criterio se queda corto, el filtro estándar une varias condiciones con Y u O, y el filtro avanzado admite hasta ocho criterios, escritos en la propia hoja.</p>
      <p>La diferencia que hay que llevarse: ordenar no esconde ni borra nada, solo cambia las filas de sitio; filtrar esconde filas pero no las borra, y al quitar el filtro la tabla vuelve tal como estaba. Una sorpresa que conviene conocer: la suma de una columna sigue contando también las celdas escondidas por el filtro, así que el total de la vista puede no ser el total que parece; para sumar solo lo que se ve existe la función SUBTOTALES. Y un criterio de esta lección: antes de ordenar o filtrar mucho, guarda una copia del archivo.</p>
      ${FILTRO}
      <div class="tabla-wrap"><table>
        <thead><tr><th>Herramienta</th><th>Para qué sirve</th><th>Dónde se encuentra</th></tr></thead>
        <tbody>
          <tr><th scope="row">Ordenar</th><td>Reorganiza las filas según la columna que pidas.</td><td>Datos - Ordenar.</td></tr>
          <tr><th scope="row">Filtro automático</th><td>Pone flechas en los encabezados para ver solo un valor por columna.</td><td>Datos - Filtro automático.</td></tr>
          <tr><th scope="row">Filtro estándar</th><td>Une varias condiciones con Y u O.</td><td>La opción Estándar del desplegable del filtro.</td></tr>
          <tr><th scope="row">Filtro avanzado</th><td>Admite hasta ocho criterios, escritos en la hoja.</td><td>Datos - Filtro - Filtro avanzado.</td></tr>
          <tr><th scope="row">Restablecer el filtro</th><td>Devuelve a la vista todas las filas.</td><td>Datos - Filtro - Restablecer.</td></tr>
        </tbody>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> confundir las dos herramientas. Buscas las ventas de marzo, ordenas la lista por el mes y al mirar crees que ya está: la tabla sigue entera, solo reformada, con los meses juntos. Ordenar reorganiza; para que se vea una parte sola, hace falta filtrar.</p>`,
    ejemplo: `
      <p>Una hoja de ventas: la columna A con la fecha, la B con el mes y la C con el importe, y un total en C10. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Haz clic en B3 sin seleccionar nada: la lista entera se ordena, y el resaltado con colores invertidos muestra qué trozo va a moverse.</li>
        <li>Elige Datos - Ordenar por la columna de la fecha: la lista queda en orden de fecha y ninguna fila cambia de contenido, solo de sitio.</li>
        <li>Activa el filtro automático, abre la flecha del encabezado B y elige marzo: solo esas filas quedan a la vista.</li>
        <li>Mira C10: cuenta también las filas escondidas, así que no es el total de marzo; para sumar solo lo visible se usa SUBTOTALES.</li>
        <li>Elige Datos - Filtro - Restablecer: la tabla vuelve a enseñarse entera, y el total tampoco cambia al reaparecer las filas.</li>
      </ol>
      <p>Resultado: <span class="resultado">la lista ordenada por fecha y, con el filtro puesto, solo marzo a la vista</span>.</p>
      <p class="nota"><strong>Error común:</strong> tomar C10 por el total de marzo con el filtro puesto: la suma cuenta también lo que no se ve.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Activas un filtro y eliges un valor en la flecha de una columna. ¿Qué pasa con las filas que no llevan ese valor?</p>',
        opciones: ['Se borran de la hoja y hay que escribirlas otra vez', 'Se copian a otra hoja, en la de abajo', 'Se esconden de la vista, pero siguen guardadas en la hoja'], correcta: 2,
        pista: '<p>Al quitar el filtro, ¿la tabla vuelve tal como estaba o has perdido filas?</p>',
        solucion: '<p>Se esconden: no se ven, pero siguen dentro de la hoja. Al desactivar el filtro con Datos - Filtro - Restablecer, todas las filas reaparecen tal como estaban.</p>' },
      { tipo: 'opciones', enunciado: '<p>Ordenas la tabla por la columna del importe. ¿Qué cambió en los datos?</p>',
        opciones: ['Nada en el contenido: las filas están todas, otra vez en el orden de los importes', 'Los importes se reemplazaron por su promedio', 'Se perdieron las filas del mes pasado', 'Las fechas empezaron a contarse desde cero'], correcta: 0,
        pista: '<p>Mira la tabla antes y después de ordenar: ¿queda alguna fila menos?</p>',
        solucion: '<p>Ordenar solo reorganiza: todas las filas siguen ahí, en el orden que pediste. Lo que no hizo el movimiento fue esconder nada, y por eso el total de la columna no cambia.</p>' },
      { tipo: 'opciones', enunciado: '<p>Con el filtro de marzo puesto, sumas la columna de los importes con SUMA. ¿Qué da?</p>',
        opciones: ['La suma solo de las filas de marzo, que son las que se ven', 'El error #N/A, porque hay filas escondidas', 'El total de todas las filas, también las escondidas por el filtro'], correcta: 2,
        pista: '<p>La suma de una columna mira las celdas del rango, con o sin vista.</p>',
        solucion: '<p>SUMA suma también las celdas ocultas por el filtro: aunque no se vean, siguen en el rango y cuentan. Para sumar únicamente lo que sí se ve existe la función SUBTOTALES.</p>' },
      { tipo: 'texto', enunciado: '<p>Al filtrar, pones una condición para decidir qué filas se quedan a la vista. ¿Cómo se llama esa condición en esta lección?</p>',
        respuestas: ['criterio', 'un criterio', 'el criterio', 'criterio del filtro', 'criterio de filtro'],
        pista: '<p>Es la palabra que aparece cuando alguien pregunta por qué criterio usaste para dejar solo esas filas.</p>',
        solucion: '<p>Se llama criterio. El filtro esconde las filas que no cumplen el criterio y deja a la vista las que sí lo cumplen.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para dejar a la vista solo las filas de un mes.</p>',
        respuesta: ['Hacer clic en una celda de la tabla, sin seleccionar nada', 'Elegir Datos - Filtro automático y ver una flecha por cada encabezado', 'Abrir la flecha de la columna del mes', 'Elegir el valor que quieres ver, por ejemplo marzo'],
        pista: '<p>Primero se activa el filtro, después se elige el valor.</p>',
        solucion: '<p>El orden es activar el filtro automático, abrir la flecha del encabezado de la columna del mes y elegir el valor. Las filas que no lo cumplen se esconden; para volverlas a ver, quita el filtro.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas herramientas aparecen en la tabla de la lección?</p>', respuesta: 5,
        pista: '<p>Cuenta las filas de la tabla, sin contar los encabezados.</p>',
        solucion: '<p>Son <strong>5</strong>: el comando de ordenar, el filtro automático, el filtro estándar, el filtro avanzado y el que restablece el filtro. Las dos primeras cubren casi todo el trabajo diario.</p>' },
    ],
    fuentes: [
      LO('Sorting Data', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/database_sort.xhp'),
      LO('Filtering Cell Ranges', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/database_filter.xhp'),
      LO('Applying AutoFilter', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/autofilter.xhp'),
      LO('Applying Filters', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/filters.xhp'),
    ],
  });

  // ------------------------------------------------------------------
  // Dos maneras de teñir celdas: por una regla que cumplen pocas y por una escala que tiñe todas.
  const REGLAS = diagrama([0, 12.4], [0, 7], [
    txt(3.0, 6.4, 'Regla: mayor que 60'), txt(8.9, 6.4, 'Escala de color'),
    { tipo: 'linea', desde: [2.2, 5.6], hasta: [3.8, 5.6] }, { tipo: 'linea', desde: [2.2, 4.9], hasta: [3.8, 4.9] },
    { tipo: 'linea', desde: [2.2, 4.2], hasta: [3.8, 4.2] }, { tipo: 'linea', desde: [2.2, 3.5], hasta: [3.8, 3.5] },
    { tipo: 'linea', desde: [2.2, 2.8], hasta: [3.8, 2.8] },
    { tipo: 'linea', desde: [2.2, 2.8], hasta: [2.2, 5.6] }, { tipo: 'linea', desde: [3.8, 2.8], hasta: [3.8, 5.6] },
    txt(3.0, 5.25, '20'), txt(3.0, 4.55, '50'), txt(3.0, 3.85, '70'), txt(3.0, 3.15, '90'),
    { tipo: 'poligono', puntos: [[2.2, 3.5], [3.8, 3.5], [3.8, 4.2], [2.2, 4.2]], relleno: true, serie: 1 },
    { tipo: 'poligono', puntos: [[2.2, 2.8], [3.8, 2.8], [3.8, 3.5], [2.2, 3.5]], relleno: true, serie: 1 },
    { tipo: 'linea', desde: [7.9, 5.6], hasta: [9.9, 5.6] }, { tipo: 'linea', desde: [7.9, 4.65], hasta: [9.9, 4.65] },
    { tipo: 'linea', desde: [7.9, 3.7], hasta: [9.9, 3.7] }, { tipo: 'linea', desde: [7.9, 2.75], hasta: [9.9, 2.75] },
    { tipo: 'linea', desde: [7.9, 2.75], hasta: [7.9, 5.6] }, { tipo: 'linea', desde: [9.9, 2.75], hasta: [9.9, 5.6] },
    { tipo: 'poligono', puntos: [[7.9, 4.65], [9.9, 4.65], [9.9, 5.6], [7.9, 5.6]], relleno: true },
    { tipo: 'poligono', puntos: [[7.9, 3.7], [9.9, 3.7], [9.9, 4.65], [7.9, 4.65]], relleno: true, serie: 1 },
    { tipo: 'poligono', puntos: [[7.9, 2.75], [9.9, 2.75], [9.9, 3.7], [7.9, 3.7]], relleno: true, serie: 2 },
    txt(8.9, 5.1, '10'), txt(8.9, 4.15, '50'), txt(8.9, 3.2, '90'),
    txt(5.9, 1.9, 'A la izquierda, solo las celdas que cumplen la regla quedan teñidas'),
    txt(5.9, 1.2, 'a la derecha, todas llevan un tono, de claro a oscuro según el valor'),
  ], 'Diagrama con dos columnas de una hoja, una a cada lado. A la izquierda hay una columna con los valores 20, 50, 70 y 90; su título dice Regla: mayor que 60, y las dos celdas con los valores 70 y 90 están teñidas con un tono de acento, porque son las únicas que superan 60. A la derecha hay otra columna con los valores 10, 50 y 90; su título dice Escala de color, y las tres celdas están teñidas con un tono cada vez más intenso conforme sube el valor. Debajo, las frases A la izquierda, solo las celdas que cumplen la regla quedan teñidas, y a la derecha, todas llevan un tono, de claro a oscuro según el valor.');

  // ------------------------------------------------------------------
  L('Formato condicional', {
    objetivo: 'Aplicar formato solo a las celdas que cumplen una condición con el formato condicional, y conocer las reglas por valor, por texto, por duplicados, por escala de color y por barras de datos.',
    vidaReal: `
      <p>Una lista de doscientos gastos y solo cuatro pasan del límite del mes. Recorrerla a mano, marcando las cuatro, funciona una vez; al mes siguiente hay que rehacerlo, y a la primera de cambio llevas el color al gasto equivocado. La hoja puede dejar ese trabajo hecho: tú escribes una sola vez cuándo pintar y con qué color, y a partir de ahí las celdas se pintan y se despintan solas, cada vez que un dato cambia. Así el aviso nunca envejece.</p>`,
    explicacion: `
      <p>Doscientas celdas con importes y solo cuatro pasan del límite que te importa. Podrías recorrerlas y colorearlas a mano, con el error de fila que eso implica. La pregunta es cómo le pides ese trabajo al programa, y que se repita en cada cambio.</p>
      <p>La respuesta es el <strong>formato condicional</strong> (<span lang="en">conditional formatting</span>): formato que se aplica a las celdas que cumplen una condición, y que se define en el diálogo del menú Formato. Tú no pintas la celda: le dices al programa «si el valor es mayor que el límite, aplícale ese estilo», y el tono aparece solo. La ayuda de LibreOffice lo muestra con un ejemplo: resaltar los totales que superan la media de todos ellos; si los totales cambian, el formato cambia también, sin reeditar nada a mano. Esa es su ventaja: la celda se pinta y se despinta sola conforme los datos cambian.</p>
      <p>Lo que se aplica en cada caso es una <strong>regla</strong> (<span lang="en">rule</span>): la condición y el formato, juntos. La condición se escribe sobre el valor de la celda: mayor o menor que un número, entre dos valores, el texto que contiene la celda, los valores que aparecen repetidos. Y las reglas se acumulan: una celda puede llevar varias, y el programa las evalúa de la primera a la última; si la primera se cumple, se aplica su formato y no se mira la siguiente, y si ninguna coincide, el formato de la celda queda como estaba.</p>
      <h3>Las reglas que tiñen el rango entero</h3>
      <p>Hay dos reglas que no preguntan sí o no, porque colorean el rango de arriba abajo. La <strong>escala de color</strong> (<span lang="en">color scale</span>) aplica un degradado de dos o tres colores según el valor de cada celda: la de valor más bajo lleva el primer color, la más alta el último, y las del medio un tono mezclado, con umbrales que se calculan con el mínimo y el máximo del rango, con un valor fijo o con un percentil. Las barras de datos rellenan cada celda con una barra proporcional al número: es, en miniatura, un gráfico de barras dentro de la celda.</p>
      <h3>Cuidados: el formato a mano y el cálculo automático</h3>
      <p>El formato condicional no borra lo que la celda tenga puesto a mano: ese formato queda guardado y reaparece cuando quitas las reglas o cuando ninguna condición coincide. Por eso, si una celda con un color a mano parece no obedecer a la regla, la causa está en la mezcla de los dos formatos. Criterio de esta lección: no mezcles colores puestos a mano con reglas en la misma columna, porque después no se sabe cuál manda. Otro cuidado de la ayuda: el cálculo automático de la hoja debe estar activado, porque es lo que reevalúa las condiciones.</p>
      ${REGLAS}
      <div class="tabla-wrap"><table>
        <thead><tr><th>Regla</th><th>Para qué sirve</th><th>Qué se ve en la celda</th></tr></thead>
        <tbody>
          <tr><th scope="row">Mayor que un número</th><td>Resalta los valores que superan un límite.</td><td>Solo las celdas que pasan el límite llevan el estilo.</td></tr>
          <tr><th scope="row">Menor que un número</th><td>Resalta los valores por debajo del límite.</td><td>Solo las celdas bajo el límite llevan el estilo.</td></tr>
          <tr><th scope="row">Entre dos valores</th><td>Resalta lo que cae dentro de un tramo.</td><td>Las celdas del tramo se pintan y las demás no.</td></tr>
          <tr><th scope="row">Contiene un texto</th><td>Marca las celdas con esa palabra dentro.</td><td>Las celdas con esa parte del texto se pintan.</td></tr>
          <tr><th scope="row">Valores duplicados</th><td>Caza los datos que aparecen dos veces o más.</td><td>Las repeticiones quedan marcadas.</td></tr>
          <tr><th scope="row">Escala de color</th><td>Colorea el rango según el valor de cada celda.</td><td>Un tono de claro a oscuro, de uno o varios colores.</td></tr>
          <tr><th scope="row">Barras de datos</th><td>Dibuja el valor como una barra interior.</td><td>Una barra proporcional al número, dentro de la celda.</td></tr>
        </tbody>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> pintar a mano en lugar de crear la regla. El color puesto a mano se queda donde está, aunque el importe cambie y deje de merecer el aviso. La regla, en cambio, se reevalúa con cada dato: se pinta y se despinta sola.</p>`,
    ejemplo: `
      <p>La hoja de gastos tiene B2:B6 con los importes 35, 42, 28, 55 y 18, y tu límite por partida es 40. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Selecciona B2:B6: la regla se aplica al rango entero.</li>
        <li>Abre el diálogo del formato condicional, en el menú Formato, y crea una condición de celda mayor que 40, con el estilo que quieras, por ejemplo un fondo coloreado.</li>
        <li>Acepta y mira: solo las celdas con 42 y 55 quedan teñidas.</li>
        <li>Cambia el 42 de B3 por 39: pierde el color sola, sin toque a mano.</li>
        <li>Vuelve a poner el 42 y añade una escala de color al mismo rango: las cinco celdas quedan teñidas de claro a oscuro, según su valor.</li>
      </ol>
      <p>Resultado: <span class="resultado">celdas de más de 40 teñidas por la regla y, añadida la escala, todo el rango coloreado</span>.</p>
      <p class="nota"><strong>Error común:</strong> colorear la celda a mano cuando el importe pasa del límite. Se ve igual esa semana, pero a la siguiente el dato cambia, el color se queda y la lista avisa mal. La regla se mantiene sola.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Creas una regla en un rango de diez celdas. ¿A cuáles aplica el formato?</p>',
        opciones: ['A las diez, cumpliendo o no la condición', 'Solo a las celdas cuyo valor cumple la condición', 'Ninguna: solo guarda la regla por si luego', 'A todas menos a la primera fila'], correcta: 1,
        pista: '<p>El formato es condicional: depende de que algo pase en cada celda.</p>',
        solucion: '<p>La regla se aplica únicamente a las celdas que cumplen la condición. Las demás quedan como están, y si los valores cambian, la lista de celdas teñidas se recalcula sola.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué hace la escala de color sobre un rango de celdas?</p>',
        opciones: ['Pinta cada celda del mismo color, para unificar la vista', 'Borra la celda que tenga el número más pequeño', 'Aplica un tono a cada celda, de claro a oscuro, según su valor'], correcta: 2,
        pista: '<p>No se pregunta en cada caso una condición: se miden uno contra otro los valores del rango.</p>',
        solucion: '<p>La escala de color tiñe el rango con un degradado de dos o tres tonos: el valor más bajo lleva el color de un extremo, el más alto el del otro, y los del medio llevan una mezcla. Todas las celdas quedan coloreadas, no solo algunas.</p>' },
      { tipo: 'opciones', enunciado: '<p>Corriges el importe de una celda teñida por la regla y el nuevo valor deja de superar el límite. ¿Qué pasa con el color?</p>',
        opciones: ['Se queda para siempre, aunque el dato ya no cumple', 'Desaparece solo, porque la regla se reevalúa con cada dato', 'El programa pide confirmación antes de quitar el color'], correcta: 1,
        pista: '<p>La ventaja frente al color puesto a mano es esta: nadie tiene que borrarlo.</p>',
        solucion: '<p>El color desaparece solo: la regla se reevalúa cada vez que cambias un dato, y la celda se despinta. Si además la celda tenía un color puesto a mano, ese reaparece cuando ninguna condición coincide.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el formato que se aplica únicamente a las celdas que cumplen una condición y se actualiza solo cuando cambian los datos?</p>',
        respuestas: ['formato condicional', 'el formato condicional', 'conditional formatting', 'formato condicional (conditional formatting)'],
        pista: '<p>Conditional: depende de una condición que se cumple o no en cada celda.</p>',
        solucion: '<p>Se llama formato condicional. La regla une la condición con el formato, y el programa reevalúa esa condición con cada cambio de los datos, pintando y despintando las celdas solo.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para dejar teñidas las celdas que superan un límite.</p>',
        respuesta: ['Seleccionar el rango de las celdas de los importes', 'Abrir el diálogo del formato condicional, en el menú Formato', 'Elegir la condición mayor que y escribir el límite', 'Elegir el estilo de celda que se aplica cuando se cumple', 'Comprobar que solo quedan teñidas las celdas que superan el límite'],
        pista: '<p>Primero se señala dónde se van a aplicar las reglas; el formato condicional no sabe solo a qué celdas referirse.</p>',
        solucion: '<p>El orden es seleccionar el rango, abrir el diálogo, escribir la condición con su límite, elegir el estilo y comprobar el resultado. Si una celda teñida no debía estarlo, su valor no pasa el límite.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas reglas hay en la tabla de la lección?</p>', respuesta: 7,
        pista: '<p>Cuenta las filas de la tabla, sin contar los encabezados.</p>',
        solucion: '<p>Son <strong>7</strong>: mayor que, menor que, entre dos valores, contiene un texto, valores duplicados, escala de color y barras de datos. Cinco preguntan algo de sí o no y dos tiñen el rango entero.</p>' },
    ],
    fuentes: [
      LO('Applying Conditional Formatting', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/cellstyle_conditional.xhp'),
      LO('Conditional Formatting Dialog', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/01/05120000.xhp'),
      LO('Conditional Formatting - Color Scale and Data Bar', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/01/05120400.xhp'),
    ],
  });

  // ------------------------------------------------------------------
  // Un gráfico de columnas con sus piezas al descubierto: título, ejes rotulados, dos series y leyenda.
  const PIEZAS = diagrama([0, 13.2], [0, 9.6], [
    txt(5.3, 9.0, 'Gastos de un mes, en euros'),
    { tipo: 'linea', desde: [1.5, 2.2], hasta: [1.5, 7.2] },
    { tipo: 'linea', desde: [1.5, 2.2], hasta: [9.2, 2.2] },
    txt(0.95, 6.2, '60'), txt(0.95, 4.2, '30'), txt(0.95, 2.2, '0'),
    txt(1.05, 7.9, 'Importe'),
    { tipo: 'poligono', puntos: [[2.0, 2.2], [2.65, 2.2], [2.65, 5.2], [2.0, 5.2]], solido: true },
    { tipo: 'poligono', puntos: [[2.8, 2.2], [3.45, 2.2], [3.45, 3.87], [2.8, 3.87]], solido: true, serie: 1 },
    { tipo: 'poligono', puntos: [[4.7, 2.2], [5.35, 2.2], [5.35, 4.53], [4.7, 4.53]], solido: true },
    { tipo: 'poligono', puntos: [[5.5, 2.2], [6.15, 2.2], [6.15, 3.2], [5.5, 3.2]], solido: true, serie: 1 },
    { tipo: 'poligono', puntos: [[7.4, 2.2], [8.05, 2.2], [8.05, 5.53], [7.4, 5.53]], solido: true },
    { tipo: 'poligono', puntos: [[8.2, 2.2], [8.85, 2.2], [8.85, 2.87], [8.2, 2.87]], solido: true, serie: 1 },
    txt(2.75, 1.85, 'Enero'), txt(5.45, 1.85, 'Febrero'), txt(8.1, 1.85, 'Marzo'),
    { tipo: 'linea', desde: [9.9, 4.6], hasta: [12.9, 4.6] }, { tipo: 'linea', desde: [9.9, 6.4], hasta: [12.9, 6.4] },
    { tipo: 'linea', desde: [9.9, 4.6], hasta: [9.9, 6.4] }, { tipo: 'linea', desde: [12.9, 4.6], hasta: [12.9, 6.4] },
    { tipo: 'poligono', puntos: [[10.1, 5.75], [10.5, 5.75], [10.5, 6.1], [10.1, 6.1]], solido: true },
    txt(11.65, 5.92, 'Comida'),
    { tipo: 'poligono', puntos: [[10.1, 4.9], [10.5, 4.9], [10.5, 5.25], [10.1, 5.25]], solido: true, serie: 1 },
    txt(11.65, 5.07, 'Transporte'),
    txt(11.4, 6.9, 'La leyenda'),
    txt(5.3, 1.15, 'Las series de datos son los grupos de barras'),
    txt(5.3, 0.5, 'El título y las etiquetas nombran los dos ejes'),
  ], 'Diagrama de un gráfico de columnas con sus piezas marcadas. Arriba del todo está el título, Gastos de un mes, en euros. Debajo hay un gráfico con un eje vertical rotulado Importe, con los valores 0, 30 y 60, y un eje horizontal con los meses Enero, Febrero y Marzo. Sobre cada mes hay dos barras, una de cada color: en enero las barras llegan a 45 y a 25; en febrero, a 35 y a 15; en marzo, a 50 y a 10. En el cuadro de la derecha está la leyenda, rotulada La leyenda, con dos muestras de color y sus nombres: Comida y Transporte.');
  // ------------------------------------------------------------------
  L('Gráficos', {
    objetivo: 'Construir un gráfico a partir de una tabla: señalar los datos con sus encabezados, elegir el tipo que responde la pregunta y completar el título, las etiquetas y la leyenda.',
    vidaReal: `
      <p>Una lista de notas, de gastos o de tiempos de viaje se lee despacio: hay que comparar números uno a uno. El mismo dato dibujado en barras se entiende de un vistazo, y por eso las noticias están llenas de gráficos. Esta lección te enseña a construir el tuyo con los datos de tu hoja; la lectura de cada tipo es materia de Matemáticas y de Lectura.</p>`,
    explicacion: `
      <p>Una tabla de doce meses con un importe en cada fila se lee despacio: hay que comparar números uno por uno. Convertido en barras, el mismo material se entiende en un segundo, porque la vista capta las diferencias de altura. La pregunta es cómo se construye ese dibujo.</p>
      <p>La respuesta es el <strong>gráfico</strong> (<span lang="en">chart</span>): una imagen hecha con los datos de la hoja, que se lee de un vistazo. La ayuda de LibreOffice lo reduce a tres pasos: clic dentro del rango, pulso en el icono Insertar gráfico y seguimiento del Asistente de gráfico. Las dos páginas que más importan son la del rango de datos y la del tipo.</p>
      <h3>El primer paso: qué celdas se marcan</h3>
      <p>El gráfico se arma con la columna de las categorías y la de los valores (los meses y los importes), y se marcan también los encabezados. La ayuda lo explica con las casillas «Primera fila como etiqueta» y «Primera columna como etiqueta», que dejan al programa usar esas filas y columnas como nombres del dibujo. Desmarcadas, cada fila del rango se vuelve una serie aparte y la lista de nombres se rellena con rótulos genéricos como «Fila 1, Fila 2».</p>
      <p>La lista de nombres toma los rótulos del rango y no se puede corregir a mano: si salieron genéricos, el arreglo está en los encabezados de la hoja. Y cuando los datos cambian, el gráfico se actualiza solo, porque está alimentado por las celdas.</p>
      <h3>El segundo paso: el tipo que responde la pregunta</h3>
      <p>En la primera página del asistente se elige el tipo básico: Columnas, Barras, Circular, Líneas y otros, con variantes para cada uno. La elección no es una preferencia: cada tipo responde una pregunta distinta, y cómo se lee cada dibujo es materia de las lecciones «Gráficas: barras, pastel e histogramas» de Matemáticas y «Leer gráficas e infografías» de Lectura. Aquí toca decidir cuál pedir en cada caso.</p>
      <p>Las columnas comparan cantidades entre categorías, cada una con su barra de pie a escala. Las barras repiten la comparación tumbadas, útiles con nombres largos. Las líneas cuentan la evolución: un punto por periodo unido por una línea que dice si algo subió o bajó. Y el circular, el pastel, reparte un total entre sus partes.</p>
      <p>Los grupos de valores son las <strong>series de datos</strong> (<span lang="en">data series</span>): los importes de Comida y los de Transporte forman dos series. En la página del rango se dice si van por filas o por columnas, y el programa dibuja una por cada una.</p>
      <h3>Las piezas que hay que saber nombrar</h3>
      <p>Las piezas se nombran: el título; los dos ejes, con sus etiquetas; las series, que son las cifras ya dibujadas; y la <strong>leyenda</strong> (<span lang="en">legend</span>), la lista que dice qué color o qué línea corresponde a cada serie. En la última página se escriben título y etiquetas, y la leyenda se coloca donde se lea mejor.</p>
      <p>Y dos reglas para cerrar: el gráfico lleva siempre título y etiquetas de ejes, porque sin rótulos no se lee; y si la tabla de la que nace es una tabla dinámica, el gráfico dinámico toma su rango y sus series de ella, como se ve en la lección «Tablas dinámicas».</p>
      ${PIEZAS}
      <div class="tabla-wrap"><table>
        <thead><tr><th>Tipo de gráfico</th><th>Para qué sirve</th><th>Pregunta de ejemplo</th></tr></thead>
        <tbody>
          <tr><th scope="row">Columnas</th><td>Comparar cantidades entre categorías, con las barras de pie.</td><td>¿Cuánto se gastó en cada categoría?</td></tr>
          <tr><th scope="row">Líneas</th><td>Ver cómo cambia algo a lo largo del tiempo: la evolución.</td><td>¿Cómo fue el gasto de mes a mes?</td></tr>
          <tr><th scope="row">Barras</th><td>Comparar igual que las columnas, pero con las barras tumbadas.</td><td>¿Cuánto costó cada artículo, con nombres largos?</td></tr>
          <tr><th scope="row">Sectores (el pastel)</th><td>Mostrar cómo se reparte un total entre sus partes.</td><td>¿Qué parte del gasto es de comida?</td></tr>
        </tbody>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> dejar los encabezados fuera de la selección y procurar arreglar los nombres en la leyenda. Esa lista no se edita a mano: toma los rótulos de la primera fila o columna del rango.</p>`,
    ejemplo: `
      <p>La hoja guarda el gasto por categoría en el rango A1:B4, con los encabezados en la fila 1. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Marca el rango A1:B4: las dos columnas y también sus encabezados, porque de ahí salen los nombres.</li>
        <li>Pulsa el icono Insertar gráfico: se abre una vista previa y el Asistente.</li>
        <li>Elige el tipo Columnas: la pregunta es comparar lo gastado por categoría.</li>
        <li>Mira el paso del rango: las casillas de etiquetas van marcadas, o la lista de nombres sale genérica.</li>
        <li>En los elementos escribe el título y revisa las etiquetas de los ejes y la leyenda.</li>
        <li>Acepta, recoloca el dibujo y dale tamaño; cambiar un importe después lo corrige solo.</li>
      </ol>
      <p>Resultado: <span class="resultado">columnas con título, ejes rotulados y sus nombres en la leyenda</span>.</p>
      <p class="nota"><strong>Error común:</strong> retocar los nombres de la leyenda: no se edita, copia los encabezados del rango, y el arreglo está en la hoja.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Quieres ver cómo cambió el gasto de enero a diciembre, mes a mes. ¿Qué tipo de gráfico está hecho para esa pregunta?</p>',
        opciones: ['El de líneas, porque muestra la evolución con un punto por periodo', 'El de sectores, porque parte el total en doce', 'El de columnas, porque tiene una columna por mes', 'Da igual: los cuatro tipos cuentan lo mismo'], correcta: 0,
        pista: '<p>Piensa qué dibujo dice mejor si algo subió o bajó en el tiempo.</p>',
        solucion: '<p>El de líneas: dibuja un punto por cada periodo y los une, así que la evolución se lee de un vistazo. Las columnas comparan categorías y los sectores reparten un total.</p>' },
      { tipo: 'opciones', enunciado: '<p>En un gráfico con dos colores de barra, ¿qué pieza dice qué color corresponde a cada serie de datos?</p>',
        opciones: ['El título, que resume el asunto', 'Las etiquetas de los ejes', 'La leyenda, que lleva una muestra de color para cada serie', 'La primera columna del rango'], correcta: 2,
        pista: '<p>Es la lista pequeña que acompaña al dibujo con un nombre por color.</p>',
        solucion: '<p>La leyenda: es la lista que empareja cada color o cada línea con el nombre de su serie. El título dice el asunto y los ejes se rotulan con sus magnitudes, pero la correspondencia de colores la da la leyenda.</p>' },
      { tipo: 'opciones', enunciado: '<p>Creas un gráfico pero dejas desmarcadas las casillas de etiquetas del asistente. ¿Qué pasa?</p>',
        opciones: ['El gráfico no se crea y hay que empezar de nuevo', 'Cada fila del rango se dibuja como una serie y la leyenda se llena con nombres genéricos, como Fila 1 y Fila 2', 'El dibujo sale vacío, sin ninguna barra', 'Los encabezados se escriben solos en la hoja'], correcta: 1,
        pista: '<p>Recuerda para qué sirven las casillas «Primera fila como etiqueta» y «Primera columna como etiqueta».</p>',
        solucion: '<p>Sin las casillas marcadas, el programa trata todas las filas o columnas del rango como series de datos y fabrica nombres genéricos para la leyenda. Los nombres honrados se consiguen marcando las casillas, con los encabezados dentro del rango.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la pieza del gráfico que dice qué color o qué línea corresponde a cada serie de datos?</p>',
        respuestas: ['leyenda', 'la leyenda', 'legend'],
        pista: '<p>Es la lista pequeña que va pegada al dibujo, con una muestra de color y un nombre por cada serie.</p>',
        solucion: '<p>Se llama leyenda (legend en inglés). Copia los nombres de los encabezados del rango: por eso, si los del dibujo salen genéricos, el arreglo está en la hoja y no en la leyenda.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para construir el gráfico de los gastos por mes.</p>',
        respuesta: ['Marcar los datos: la columna de las categorías y la de los importes, encabezados incluidos', 'Pulsar el icono Insertar gráfico y elegir el tipo en el asistente, por ejemplo columnas', 'Completar el título, las etiquetas de los ejes y el lugar de la leyenda', 'Aceptar, recolocar el dibujo y comprobar que responde a la pregunta'],
        pista: '<p>Primero se marcan las celdas de las que sale todo, después viene el asistente.</p>',
        solucion: '<p>El orden es marcar el rango con sus encabezados, insertar el gráfico y elegir el tipo, completar títulos y etiquetas, y recolocarlo. La selección manda: si falta el encabezado, la leyenda sale con nombres genéricos.</p>' },
      { tipo: 'numero', enunciado: '<p>En el gráfico del diagrama de la lección, ¿cuántas piezas se pueden señalar aparte?</p>', respuesta: 5,
        pista: '<p>Cuenta el título, la etiqueta del eje vertical, los nombres de los meses, los grupos de barras y la leyenda.</p>',
        solucion: '<p>Son <strong>5</strong>: el título de arriba, la etiqueta del eje vertical, los nombres de los meses en el eje horizontal, las series de datos (los dos grupos de barras) y la leyenda. Sin esos rótulos, el dibujo se vuelve decoración.</p>' },
    ],
    fuentes: [
      LO('Inserting Charts', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/shared/guide/chart_insert.xhp'),
      LO('Chart Wizard - Chart Type', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/schart/01/wiz_chart_type.xhp'),
      LO('Chart Wizard - Data Range', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/schart/01/wiz_data_range.xhp'),
      LO('Chart Wizard - Chart Elements', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/schart/01/wiz_chart_elements.xhp'),
      LO('Pivot Chart', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/pivotchart.xhp'),
      WIKI('Gráfico', 'https://es.wikipedia.org/wiki/Gr%C3%A1fico'),
      WIKI('Diagrama de barras', 'https://es.wikipedia.org/wiki/Diagrama_de_barras'),
    ],
  });

  // ------------------------------------------------------------------
  // De la tabla de origen, a través de las cuatro zonas del diálogo, a la tabla dinámica.
  const ZONAS = diagrama([0, 14.8], [0, 8.2], [
    ...caja(2.2, 4.9, 4.2, 1.1, 'Tabla de origen', true),
    txt(3.0, 3.85, 'las 400 ventas del mes'),
    ...flecha([4.4, 4.9], [5.65, 4.9], 0, 0.8),
    ...caja(8.0, 6.7, 4.6, 0.85, 'Filtros'),
    ...caja(8.0, 5.6, 4.6, 0.85, 'Campos de columna'),
    ...caja(8.0, 4.5, 4.6, 0.85, 'Campos de fila'),
    ...caja(8.0, 3.4, 4.6, 0.85, 'Campos de datos'),
    txt(8.0, 2.55, 'Cada columna del origen es un botón que se suelta en una zona'),
    ...flecha([10.4, 4.9], [11.2, 4.9], 0, 0.8),
    ...caja(12.9, 4.9, 3.4, 1.1, 'Tabla dinámica', true),
    txt(12.3, 3.85, 'el cruce y sus totales'),
    txt(6.9, 1.35, 'Cuatro zonas: filtros, columnas, filas y datos'),
    txt(6.9, 0.7, 'y en la de datos se pide la cuenta: suma, promedio o cuenta'),
  ], 'Diagrama de tres partes, de izquierda a derecha. A la izquierda, la caja Tabla de origen con la frase las 400 ventas, fila por fila. Una flecha lleva a la parte central, donde hay cuatro cajas unas debajo de otras: Filtros, Campos de columna, Campos de fila y Campos de datos, con la frase Cada columna del origen es un botón que se suelta en una zona. Otra flecha lleva a la derecha, a la caja Tabla dinámica con la frase el cruce con sus totales. Debajo del todo, las frases Cuatro zonas: filtros, columnas, filas y datos, y en la de datos se pide la cuenta: suma, promedio o cuenta.');
  // ------------------------------------------------------------------
  L('Tablas dinámicas', {
    objetivo: 'Resumir una tabla larga en otra pequeña con la tabla dinámica: crearla en tres pasos, colocar los campos en las cuatro zonas y pedir el resumen que la pregunta necesita.',
    vidaReal: `
      <p>Cuando una lista se alarga, las preguntas útiles dejan de ser «qué hay en la fila cuarenta» y pasan a ser de grupo: cuánto suma cada parte, cuál va primero, dónde se repite. Con puntos de un torneo, con los gastos de semanas o con las notas de varias materias pasa lo mismo. Esta lección enseña a pedirle esa condensación al programa: se agrupa y se cuenta en una tabla pequeña, y como se arma arrastrando piezas, se gira y se reordena sin rehacer nada a mano.</p>`,
    explicacion: `
      <p>Imagina cuatrocientas ventas en filas: doce meses, cinco productos y un importe en cada fila. Contestar a mano «cuánto se vendió de cada producto en cada mes» es un trabajo de horas, con sumas por todos lados. La pregunta es cómo se lo pides al programa de una vez.</p>
      <p>La herramienta es la <strong>tabla dinámica</strong> (<span lang="en">pivot table</span>): una tabla nueva, separada de la de datos, que resume su contenido. La ayuda de LibreOffice la describe como una forma de combinar, comparar y analizar grandes cantidades; la Wikipedia añade que agrupa los datos de una tabla mayor y los cuenta, totaliza o promedia automáticamente. La tabla de origen no se toca: el resultado sale por separado, en otro cuadro de la hoja.</p>
      <h3>Los tres pasos para crearla</h3>
      <p>El primero es colocar el cursor dentro de la tabla de origen, porque ahí están los valores y los encabezados que dan los nombres. El segundo es elegir Insertar - Tabla dinámica y aceptar la selección actual. El tercero es armarla en el diálogo, donde cada encabezado es un botón: los <strong>campos</strong> (<span lang="en">field</span>), las columnas del origen listas para arrastrarse a las cuatro zonas del diálogo: Filtros, Campos de columna, Campos de fila y Campos de datos.</p>
      <p>La zona de las filas lista su campo hacia abajo: sueltas el Mes y hay una fila por mes. La de las columnas reparte otro hacia los lados: sueltas el Producto y hay una columna por producto, con una casilla por cada cruce. La zona de Filtros pone una lista sobre la tabla para mirar un solo valor sin desmontar el resto. Y los totales quedan en los bordes, al final de cada fila y de cada columna.</p>
      <h3>El resumen: la cuenta de cada casilla</h3>
      <p>Lo que el programa hace con los números de cada cruce se llama <strong>resumen</strong> (<span lang="en">summary</span>): la suma de los importes, su promedio o la cuenta de filas del cruce. Se elige tocando dos veces el campo de la zona de datos, que abre el diálogo de operaciones. La misma tabla dice cuánto entró en total con la suma y cuánto entra de media con el promedio.</p>
      <p>Girarla es fácil y ahí está su valor: si el campo Producto pasa de las columnas a las filas, el mismo dato se reordena; si un botón se arrastra fuera, desaparece del resultado. Con el botón derecho se abre el diálogo de Propiedades, que retoca el diseño. Y el resumen se rehace con los datos del origen del momento: no queda congelada como una copia a mano.</p>
      <p>Un límite conviene conocer: si sueltas demasiados campos a la vez, el resultado puede quedar tan grande como la tabla de origen y deja de condensar nada; con dos o tres bien elegidos casi siempre basta, y es un criterio de esta lección. Su destino natural es un dibujo: el gráfico dinámico toma su rango y sus series de la tabla dinámica y se ajusta cuando ella cambia de tamaño, como se ve en la lección «Gráficos».</p>
      ${ZONAS}
      <div class="tabla-wrap"><table>
        <thead><tr><th>Zona del diálogo</th><th>Qué se suelta ahí</th><th>Qué sale en la tabla</th></tr></thead>
        <tbody>
          <tr><th scope="row">Filtros</th><td>Un campo que se quiere tener a mano, para mirar un valor con calma.</td><td>Una lista sobre la tabla, para enseñar solo una parte.</td></tr>
          <tr><th scope="row">Campos de fila</th><td>La columna que se quiere listada hacia abajo.</td><td>Una fila por cada valor, como una fila por mes.</td></tr>
          <tr><th scope="row">Campos de columna</th><td>La columna que se quiere repartida hacia los lados.</td><td>Una columna por cada valor, como una por producto.</td></tr>
          <tr><th scope="row">Campos de datos</th><td>La columna con la que hay que hacer una cuenta.</td><td>El resumen de cada cruce: suma, promedio o cuenta.</td></tr>
        </tbody>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> pedir una cuenta sobre una columna con textos mezclados. Si los importes no están guardados como números, la suma sale más corta y sin aviso, y el total del mes parece más pequeño. El arreglo está en los datos de origen, como viste en la lección «Tipos de datos».</p>`,
    ejemplo: `
      <p>La tabla de origen tiene cuatrocientas filas: la columna A con el mes, la B con el producto y la C con el importe. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Deja el cursor dentro de la tabla y elige Insertar - Tabla dinámica; acepta la selección actual.</li>
        <li>En el diálogo arrastra Mes a Campos de fila y Producto a Campos de columna.</li>
        <li>Arrastra Importe a Campos de datos: sale la suma y, tocando dos veces, cambia a promedio o cuenta.</li>
        <li>Acepta y lee: una fila por mes, una columna por producto, la venta de cada cruce y los totales en el borde.</li>
        <li>Gírala: Producto pasa a las filas y Mes a las columnas, con el mismo dato del revés.</li>
        <li>Cambia la suma por el promedio y compara: el total de cada cruce frente a su media.</li>
      </ol>
      <p>Resultado: <span class="resultado">el cruce de meses y productos con su resumen, girado y recalculado en dos movimientos</span>.</p>
      <p class="nota"><strong>Error común:</strong> dar la respuesta por buena con la primera orientación: el mismo cruce girado suele contestar mejor, y girar cuesta arrastrar un botón.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué es una tabla dinámica?</p>',
        opciones: ['Una copia de seguridad de la tabla de datos, por si se pierde algo', 'Un gráfico de columnas que se dibuja junto a la tabla', 'Una tabla nueva y separada que resume el contenido de la tabla de datos'], correcta: 2,
        pista: '<p>Fíjate en dónde vive el resultado: en un cuadro aparte de la hoja.</p>',
        solucion: '<p>Es una tabla nueva, separada de la de datos, que resume su contenido agrupando, contando o promediando. La tabla de origen no se toca: el resultado sale por separado, en otro cuadro.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿En qué zona del diálogo se pide la cuenta que sale en cada casilla del cruce?</p>',
        opciones: ['En la zona Filtros', 'En la zona Campos de fila', 'En la zona Campos de datos', 'En la zona Campos de columna'], correcta: 2,
        pista: '<p>Es la zona de la columna con la que hay que hacer una cuenta.</p>',
        solucion: '<p>En la zona de Campos de datos: ahí se pide el resumen, que es la suma, el promedio o la cuenta de las filas del cruce. Se elige tocando dos veces el campo de esa zona.</p>' },
      { tipo: 'opciones', enunciado: '<p>Cambias un importe en la tabla de origen. ¿Qué pasa con la tabla dinámica?</p>',
        opciones: ['El resumen se rehace con los datos del origen tal como están en ese momento', 'La tabla dinámica queda con la cifra vieja para siempre', 'El programa borra la tabla y hay que crearla otra vez', 'Aparece el error #N/A en todas las casillas'], correcta: 0,
        pista: '<p>La tabla dinámica no es una copia congelada a mano.</p>',
        solucion: '<p>El resumen se rehace tomando los datos del origen del momento, así que la tabla no envejece como una copia a mano. Quedar congelada es justo lo que pasa con los números tecleados a mano, no con esta herramienta.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama en esta lección cada columna de los datos de origen, la que se convierte en un botón que se arrastra en el diálogo?</p>',
        respuestas: ['campo', 'un campo', 'el campo', 'fields', 'field'],
        pista: '<p>Es una palabra corta: cada columna de los datos lleva su propio nombre y se suelta donde quieras.</p>',
        solucion: '<p>Se llama campo (field en inglés). Cada columna del origen es un campo, y esos botones se arrastran a las cuatro zonas: Filtros, Campos de columna, Campos de fila y Campos de datos.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para resumir las ventas de una tabla larga por mes y por producto.</p>',
        respuesta: ['Dejar el cursor dentro de la tabla de origen', 'Elegir Insertar - Tabla dinámica y aceptar la selección actual', 'Arrastrar los campos a las zonas: el mes a las filas y el producto a las columnas', 'Pedir el resumen en la zona de datos y comprobar los totales de los bordes'],
        pista: '<p>Primero el cursor en la tabla, después el diálogo y luego los arrastres.</p>',
        solucion: '<p>El orden es situar el cursor en el origen, insertar la tabla dinámica, arrastrar los campos a sus zonas y pedir el resumen en la de datos. El resultado sale por separado, con los totales en los bordes.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas zonas tiene el diálogo donde se arma la tabla dinámica?</p>', respuesta: 4,
        pista: '<p>Cuenta las cajas del diagrama del centro, de arriba a abajo.</p>',
        solucion: '<p>Son <strong>4</strong>: Filtros, Campos de columna, Campos de fila y Campos de datos. Con dos o tres campos bien colocados basta casi siempre.</p>' },
    ],
    fuentes: [
      LO('Pivot Table', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/datapilot.xhp'),
      LO('Creating Pivot Tables', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/datapilot_createtable.xhp'),
      LO('Editing Pivot Tables', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/datapilot_edittable.xhp'),
      LO('Pivot Chart', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/pivotchart.xhp'),
      WIKI('Tabla dinámica', 'https://es.wikipedia.org/wiki/Tabla_din%C3%A1mica'),
    ],
  });

  // ------------------------------------------------------------------
  // La hoja del proyecto, en tres bloques encadenados: datos, cuentas y avisos.
  const ESTRUCTURA = diagrama([0, 13.8], [0, 9.5], [
    ...caja(6.9, 8.4, 6.0, 1.0, 'Los datos', true),
    txt(6.9, 7.35, 'los ingresos y los gastos del mes,'),
    txt(6.9, 7.0, 'cada gasto con su categoría'),
    ...flecha([6.9, 6.85], [6.9, 6.15], 0, 0.8),
    ...caja(6.9, 5.7, 6.0, 1.0, 'Los totales y el saldo', true),
    txt(6.9, 4.75, 'la suma de cada categoría'),
    txt(6.9, 4.4, 'y el saldo: ingresos menos gastos'),
    ...flecha([6.9, 4.15], [6.9, 3.45], 0, 0.8),
    ...caja(6.9, 2.9, 6.0, 1.0, 'Avisos y dibujo', true),
    txt(6.9, 1.95, 'el color se enciende cuando un total'),
    txt(6.9, 1.6, 'supera su límite, junto al gráfico'),
    txt(6.9, 1.0, 'La hoja, en tres bloques encadenados'),
    txt(6.9, 0.55, 'Primero los datos, después las cuentas y al final la vista'),
  ], 'Diagrama vertical de tres cajas unidas por flechas. La primera caja dice Los datos, con las frases los ingresos y los gastos del mes y cada gasto con su categoría. La primera flecha lleva a la caja Los totales y el saldo, con las frases la suma de cada categoría y y el saldo: ingresos menos gastos. La segunda flecha lleva a la caja Avisos y dibujo, con las frases el color se enciende cuando un total supera su límite y junto al gráfico. Debajo del todo, dos frases: La hoja, en tres bloques encadenados, y Primero los datos, después las cuentas y al final la vista.');
  
  L('Proyecto: tu presupuesto personal en una hoja de cálculo', {
    objetivo: 'Montar de principio a fin la hoja de un presupuesto: escribir los datos del mes, pedir los totales por categoría con SUMA, calcular el saldo con una fórmula viva, montar el aviso de los límites y cerrar con el gráfico.',
    vidaReal: `
      <p>Un presupuesto en papel funciona mientras lo revisas todos los días; desatendido, el mes termina sin avisos. En la hoja la cuenta va escrita de una vez para siempre: escribes cada gasto con su grupo, el programa suma solo, marca lo que supera su límite y dibuja el reparto del mes. Y como el mes anterior queda guardado, el siguiente se compara contra él sin recomenzar de cero.</p>`,
    explicacion: `
      <p>El gasto del mes puede llevarse en un cuaderno, y esa es una manera leal de hacerlo, pero el cuaderno no cuenta solo y no avisa de nada. Esta lección monta la versión de la hoja: las listas del mes, las cuentas detrás y el aviso de los límites. La pregunta es por dónde se empieza.</p>
      <p>Lo que se está montando tiene nombre. El <strong>presupuesto</strong> (<span lang="en">budget</span>) es el cálculo anticipado de los ingresos y los gastos de un periodo, un plan escrito en cifras que se revisa al terminar el mes. Cada gasto va en su <strong>categoría</strong> (<span lang="en">category</span>), el grupo al que pertenece: vivienda, comida, transporte, ocio. Y la cifra que contesta el mes es el <strong>saldo</strong> (<span lang="en">balance</span>): lo que queda después de restar los gastos de los ingresos.</p>
      <h3>El orden de la obra</h3>
      <p>La hoja se arma en tres bloques, y cada uno se alimenta del anterior: los datos, las cuentas y la vista. </p>
      <p>El primer bloque son los datos: los ingresos y los gastos, fila por fila, cada gasto con su categoría. El segundo bloque son las cuentas: el total de cada categoría se pide con la suma de la lección «Funciones: SUMA, PROMEDIO, MIN, MAX y CONTAR», y el saldo va en una celda propia con la resta de los totales, como en la lección «Fórmulas básicas».</p>
      <p>Este bloque funciona si todo va en fórmula viva: corriges un importe y el total de la categoría, el saldo y lo que dependa de ellos se corrigen solos. Un número tecleado a mano rompe la cadena, porque queda congelado aunque los datos cambien.</p>
      <h3>El aviso: cuando una categoría se pasa de su límite</h3>
      <p>El tercer bloque es el que avisa. Con la función SI de la lección «La función SI», la columna de los avisos escribe «se pasa» cuando un total supera el límite fijado y «bien» cuando no. Sobre esa columna va el formato condicional de la lección «Formato condicional», que tiñe las celdas donde se lee «se pasa», y el color se ajusta solo con cada cambio del mes.</p>
      <p>El gráfico, la pieza de la lección «Gráficos», dice otra cosa: el color marca qué categoría superó su límite y el dibujo muestra el reparto completo del gasto. Los dos cuentan la misma hoja y ninguno sustituye al otro.</p>
      <p>Queda lo que la hoja no puede hacer: la hoja calcula, pero no decide. Qué parte del ingreso merece cada categoría lo trabaja el método de «Hacer tu primer presupuesto», «La regla 50/30/20», «Ingresos y gastos» y «Gastos hormiga», en Finanzas personales; la hoja aplica los límites que pones y cuenta con lo que escribes.</p>
      <p>Las cifras de esta lección son inventadas; las tuyas pueden ser distintas sin estar mal. Y una costumbre que vale mucho: los datos de un mes no se borran al llegar el siguiente, se guardan y se comparan; ver cómo subió el transporte es, a veces, el mejor aviso.</p>
      ${ESTRUCTURA}
      <div class="tabla-wrap"><table>
        <thead><tr><th>Paso del proyecto</th><th>Qué haces</th><th>Con qué</th></tr></thead>
        <tbody>
          <tr><th scope="row">Escribir los datos</th><td>Los ingresos y los gastos del mes, fila por fila, cada gasto con su categoría.</td><td>Escritura a mano, sin fórmulas todavía.</td></tr>
          <tr><th scope="row">Poner los totales con SUMA</th><td>Un total por categoría y el total de los ingresos.</td><td>La función SUMA, un rango por categoría.</td></tr>
          <tr><th scope="row">Calcular el saldo</th><td>El total de ingresos menos el total de gastos.</td><td>Una fórmula de resta, en una celda propia.</td></tr>
          <tr><th scope="row">Montar el aviso</th><td>«Se pasa» cuando un total supera su límite, y el color que lo tiñe.</td><td>La función SI y el formato condicional.</td></tr>
          <tr><th scope="row">Hacer el gráfico</th><td>Las categorías con su total, dibujadas para leer el reparto.</td><td>El gráfico de columnas o de barras.</td></tr>
        </tbody>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> teclear el saldo al terminar el mes. Se ve correcto y queda congelado: el mes siguiente cambia un gasto y la cifra escrita a mano sigue siendo la vieja. El saldo y los totales van en fórmula, para que la cuenta se rehaga sola.</p>`,
    ejemplo: `
      <p>El presupuesto de un mes inventado: ingresos por 480 y diez gastos entre Comida, Transporte, Ocio y Útiles. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Escribe los diez gastos con su categoría a la izquierda y el importe a la derecha.</li>
        <li>Lista las categorías y pide su total con la suma: Comida 120, Transporte 60, Ocio 45 y Útiles 35.</li>
        <li>El total de ingresos da 480 y el saldo, restando los 260 de gastos, 220.</li>
        <li>Al lado escribe el límite de cada categoría (130, 70, 40 y 40) y la función SI que marca «se pasa»: solo Ocio la lleva, con 45.</li>
        <li>Con el formato condicional tiñe las celdas donde se lee «se pasa»: la de Ocio queda marcada.</li>
        <li>Cierra con un gráfico de columnas de las categorías y sus totales. Cambia un gasto: saldo, aviso y dibujo se corrigen solos.</li>
      </ol>
      <p>Resultado: <span class="resultado">un saldo de 220, Ocio marcada y el reparto del gasto dibujado</span>.</p>
      <p class="nota"><strong>Error común:</strong> borrar la tabla del mes al terminar: el valor está en comparar meses: los datos se quedan y el próximo se lleva en una copia.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>En la hoja del proyecto, ¿qué fórmula da el saldo del mes?</p>',
        opciones: ['La suma de los gastos, con la función SUMA', 'La suma de los ingresos más la de los gastos', 'El total de los ingresos menos el total de los gastos', 'El saldo no lleva fórmula: se teclea al final del mes'], correcta: 2,
        pista: '<p>El saldo es lo que queda al restar los gastos de los ingresos, y va en fórmula viva.</p>',
        solucion: '<p>El saldo es el total de ingresos menos el total de gastos, escrito con una fórmula de resta. Si se tecleará a mano, quedaría congelado y dejaría de corregirse cuando cambia un dato.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué hace en el proyecto la combinación de la función SI y del formato condicional?</p>',
        opciones: ['Cambia los límites por ti cuando termina el mes', 'Escribe «se pasa» cuando un total supera su límite y tiñe la celda de color', 'Borra los gastos que ya no corresponden', 'Suma otra vez los gastos de cada categoría'], correcta: 1,
        pista: '<p>Una escribe la etiqueta y la otra la pinta: las dos se apoyan en el límite que tú fijaste.</p>',
        solucion: '<p>La función SI escribe la etiqueta «se pasa» en las categorías cuyo total supera el límite fijado, y el formato condicional tiñe las celdas donde se lee esa palabra. Con cada cambio del mes, la etiqueta y el color se ajustan solos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve el gráfico del proyecto?</p>',
        opciones: ['Para ver de un vistazo el reparto del gasto entre las categorías y compararlas', 'Para corregir los importes que quedaron mal escritos', 'Para avisar de que falta un dato en la tabla', 'Para borrar la categoría que se pasó de su límite'], correcta: 0,
        pista: '<p>El color marca qué categoría superó su límite; el dibujo cuenta algo más general.</p>',
        solucion: '<p>El gráfico muestra el reparto completo del gasto, de la categoría más pesada a la más liviana, y deja compararlas de un vistazo. Los avisos marcan el límite y el dibujo enseña el conjunto.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama en esta lección el grupo al que se asigna cada gasto, como vivienda, comida o transporte?</p>',
        respuestas: ['categoría', 'una categoría', 'la categoría', 'categorias', 'category'],
        pista: '<p>Es la palabra que agrupa los gastos que son del mismo tipo.</p>',
        solucion: '<p>Se llama categoría (category en inglés). Asignar cada gasto a su categoría es lo que permite pedir el total de cada grupo con la suma y avisar cuando supera su límite.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos del proyecto para montar la hoja del presupuesto de un mes.</p>',
        respuesta: ['Escribir los ingresos y los gastos, cada gasto con su categoría', 'Poner el total de cada categoría con la suma', 'Calcular el saldo restando el total de gastos al total de ingresos', 'Montar el aviso con la función SI y el formato condicional', 'Cerrar con el gráfico de las categorías y comprobar que todo se corrige solo'],
        pista: '<p>Primero el material, después las cuentas y al final lo que se ve de un vistazo.</p>',
        solucion: '<p>El orden es datos, totales por categoría, saldo, avisos y gráfico. Cada bloque se alimenta del anterior: si se empieza por el final, el gráfico y el saldo no tienen todavía nada que contar.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos pasos tiene la tabla del proyecto en la lección?</p>', respuesta: 5,
        pista: '<p>Cuenta las filas de la tabla de los pasos, sin contar el encabezado.</p>',
        solucion: '<p>Son <strong>5</strong>: escribir los datos, poner los totales con la suma, calcular el saldo, montar el aviso y hacer el gráfico. El método de reparto del dinero no está entre las filas: el método lo trae Finanzas personales.</p>' },
    ],
    fuentes: [
      WIKI('Presupuesto', 'https://es.wikipedia.org/wiki/Presupuesto'),
      WIKI('Balance (contabilidad)', 'https://es.wikipedia.org/wiki/Balance_(contabilidad)'),
      LO('Calculating With Formulas', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/formulas.xhp'),
      LO('Inserting Charts', 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/shared/guide/chart_insert.xhp'),
    ],
  });

  // ------------------------------------------------------------------
  // Unidad completa: 12 lecciones (las tres de este fragmento cierran la lista del temario).
})();
