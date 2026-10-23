// Ofimática · Unidad 1: La computadora.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Lecciones 1 a 7 de la unidad «La computadora». Escrito en dos fragmentos: el 1 (lecciones 1 a 4) y el 2 (lecciones 5 a 7).
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
  const MS = (nombre, url) => ({ nombre: `Microsoft Support (España): ${nombre}`, url });
  const MSLEARN = (nombre, url) => ({ nombre: `Microsoft Learn (España): ${nombre}`, url });
  const APPLE = (nombre, url) => ({ nombre: `Apple Support (España): ${nombre}`, url });
  const LO = (nombre, url) => ({ nombre: `LibreOffice Help (español): ${nombre}`, url });
  const NIST = (nombre, url) => ({ nombre: `NIST (EE. UU.): ${nombre} (en inglés)`, url });
  const CISA = (nombre, url) => ({ nombre: `CISA (EE. UU.): ${nombre} (en inglés)`, url });

  // ------------------------------------------------------------------
  const PARTES = diagrama([0, 8], [0, 10], [
    ...caja(4, 8.9, 6.4, 1.8, 'Entrada', true), txt(4, 8.5, 'teclado, ratón, micrófono'),
    ...flecha([4, 8.0], [4, 7.4], 0, 0.7),
    ...caja(4, 6.5, 6.4, 1.8, 'Procesamiento', true), txt(4, 6.1, 'el procesador y la memoria de trabajo'),
    ...flecha([4, 5.6], [4, 5.0], 0, 0.7),
    ...caja(4, 4.1, 6.4, 1.8, 'Salida', true), txt(4, 3.7, 'pantalla, impresora, bocinas'),
    ...flecha([4, 3.2], [4, 2.6], 0, 0.7),
    ...caja(4, 1.7, 6.4, 1.8, 'Almacenamiento', true), txt(4, 1.3, 'el disco: lo que queda guardado'),
  ], 'Diagrama vertical de cuatro cajas unidas por flechas que bajan. De arriba abajo: Entrada, con teclado, ratón y micrófono; Procesamiento, con el procesador y la memoria de trabajo; Salida, con pantalla, impresora y bocinas; Almacenamiento, con el disco, donde queda lo que se guardó.');

  // ------------------------------------------------------------------
  L('Partes de una computadora', {
    objetivo: 'Reconocer las piezas de una computadora, decir qué hace cada una y separar el hardware del software.',
    vidaReal: `
      <p>Cuando la pantalla se queda en negro, cuando el ratón no responde o cuando lo que guardaste el mes pasado no aparece por ninguna parte, casi siempre hay una pieza del equipo que no está haciendo su trabajo. Saber qué hace cada pieza te ayuda a explicar bien el problema en casa, en la escuela o en el trabajo, y a decidir si toca reiniciar, cambiar el cable o pedir ayuda.</p>`,
    explicacion: `
      <p>Imagina que enciendes el equipo: la pantalla se enciende, el teclado se ilumina y el ratón despierta. Delante de ti hay cuatro cosas que usas todo el tiempo y, al lado, una caja: la torre. La pregunta de esta lección es qué hace cada pieza y por qué hace falta esa caja.</p>
      <h3>El cuerpo y las instrucciones</h3>
      <p>Las piezas que puedes tocar se llaman <strong>hardware</strong> (<span lang="en">hardware</span>): el procesador, la memoria, el disco, el teclado, el ratón y la pantalla. Son las partes físicas del equipo, y también los dispositivos que se le conectan. En cambio, las instrucciones que le dicen a la máquina qué tiene que hacer se llaman <strong>software</strong> (<span lang="en">software</span>): el sistema operativo, el procesador de textos, el navegador, el juego.</p>
      <p>Las dos cosas van juntas y se necesitan: el software envía instrucciones y el hardware las ejecuta. Por eso, sin software un equipo es como una lámpara apagada: está entero, pero no hace nada. Y por eso no todos los programas son iguales. En la lección "Qué es el software libre" verás que hay programas que se pueden copiar, modificar y compartir, y otros que no.</p>
      <h3>Todo lo que se enchufa es un periférico</h3>
      <p>Los dispositivos que se conectan al equipo y con los que la computadora se comunica con el exterior se llaman <strong>periféricos</strong> (<span lang="en">peripheral</span>). Según lo que hagan, se dividen en cuatro grupos. Los de entrada solo mandan datos hacia la computadora: el teclado, el ratón, el micrófono, el escáner y la cámara digital. Los de salida solo reciben datos y los muestran: el monitor, la impresora y los altavoces o auriculares. Los de entrada y salida hacen las dos cosas: una pantalla táctil o una impresora multifunción. Y los de almacenamiento, como el disco duro o la unidad de estado sólido, guardan la información y sirven de memoria auxiliar de la memoria principal.</p>
      <h3>Los cuatro momentos del trabajo</h3>
      <p>Todo lo que hace una computadora pasa por cuatro momentos. Entenderlos ayuda a saber dónde está el problema cuando algo falla.</p>
      ${PARTES}
      <p>El primer momento es la entrada: la información entra por el teclado o el ratón. El segundo es el procesamiento: el procesador, que es el componente del hardware que interpreta las instrucciones de un programa con operaciones básicas, hace los cálculos, y la memoria de trabajo, que el sistema operativo reparte entre los programas abiertos, sostiene lo que tienes abierto ahora mismo. El tercero es la salida: la pantalla, la impresora o las bocinas muestran el resultado. El cuarto es el almacenamiento: el disco guarda lo que queda cuando cierras el programa y apagas el equipo.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Pieza</th><th>Qué hace</th></tr></thead>
        <tbody>
          <tr><th scope="row">Torre o caja</th><td>Va dentro el procesador, que hace los cálculos y sigue las instrucciones de los programas.</td></tr>
          <tr><th scope="row">Memoria de trabajo</th><td>Sostiene lo que está abierto ahora: el documento, la página que estás mirando.</td></tr>
          <tr><th scope="row">Disco</th><td>Guarda lo que queda después de cerrar: archivos, fotos, programas.</td></tr>
          <tr><th scope="row">Teclado</th><td>Periférico de entrada: manda al equipo lo que escribes.</td></tr>
          <tr><th scope="row">Ratón</th><td>Periférico de entrada: manda los clics y los movimientos.</td></tr>
          <tr><th scope="row">Pantalla o monitor</th><td>Periférico de salida: muestra lo que el equipo responde.</td></tr>
          <tr><th scope="row">Impresora</th><td>Periférico de salida: lleva el documento a papel.</td></tr>
          <tr><th scope="row">Bocinas o auriculares</th><td>Periféricos de salida: suenan los audios.</td></tr>
        </tbody>
      </table></div>
      <p>Fíjate en una diferencia importante: la memoria de trabajo es como la mesa donde pones todo lo que estás usando ahora, y el disco es el cajón donde se guarda lo que ya terminaste. Por eso, si cierras el programa sin guardar, el trabajo se pierde, y también si apagas el equipo a la fuerza.</p>
      <p>Si te interesa el manual que viene con el equipo, la lección "Leer instructivos y manuales" explica cómo se lee. Y la lección "Linux: un sistema operativo libre" te muestra un sistema que cualquiera puede instalar, copiar y modificar.</p>`,
    ejemplo: `
      <p>Escribes «hola» en un programa de textos y presionas Enter. ¿Qué pasó en la máquina?</p>
      <ol class="pasos-ej">
        <li>Primero, la entrada. Al teclear, cada tecla viaja del teclado a la computadora. El teclado es un periférico de entrada: solo manda datos, no recibe.</li>
        <li>Después, el procesamiento. El procesador, que interpreta las instrucciones del programa con operaciones básicas, recibe las letras y las ordena con ayuda de la memoria de trabajo, donde está abierto ese documento.</li>
        <li>Luego, la salida. La pantalla, que es un periférico de salida, dibuja las letras que pediste.</li>
        <li>Al final, el almacenamiento. Si guardas el documento, el archivo pasa al disco, y ahí se queda aunque apagues el equipo.</li>
      </ol>
      <p>Resultado: <span class="resultado">una palabra escrita, mostrada en la pantalla y guardada en el disco</span>.</p>
      <p class="nota"><strong>Error común:</strong> si al reiniciar perdiste lo que no habías guardado, la máquina no falló: el almacenamiento solo guarda lo que le mandas guardar. Y si la palabra sale con errores, el problema estuvo en la entrada; si la pantalla se congela, en el procesamiento.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué hace el procesador?</p>',
        opciones: ['Guarda los archivos en el disco', 'Interpreta las instrucciones de un programa', 'Muestra las letras en la pantalla'], correcta: 1,
        pista: '<p>Piensa en el momento del procesamiento.</p>',
        solucion: '<p>El procesador interpreta las instrucciones de un programa haciendo operaciones básicas, como las aritméticas y lógicas. Guardar en el disco es almacenamiento, y mostrar en pantalla es salida.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos periféricos es de salida?</p>',
        opciones: ['El teclado', 'El ratón', 'La impresora'], correcta: 2,
        pista: '<p>Un periférico de salida recibe datos y los muestra, no los manda.</p>',
        solucion: '<p>La impresora es de salida: recibe los datos del documento y los lleva al papel. El teclado y el ratón son de entrada, porque solo mandan datos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas piezas pertenece al hardware?</p>',
        opciones: ['El disco duro', 'El procesador de textos', 'El navegador'], correcta: 0,
        pista: '<p>Una de las tres se puede tocar y desenchufar.</p>',
        solucion: '<p>El disco duro es hardware: es una parte física del equipo. El procesador de textos y el navegador son software, o sea, programas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el conjunto de las partes físicas de la computadora que puedes tocar?</p>',
        respuestas: ['hardware', 'el hardware'],
        pista: '<p>Es la palabra en inglés que también se usa en español.</p>',
        solucion: '<p>Se dice hardware. El software es lo otro: los programas que le dicen al hardware qué tiene que hacer.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los cuatro momentos por los que pasa lo que haces en la computadora.</p>',
        respuesta: ['Entrada: el teclado y el ratón mandan los datos', 'Procesamiento: el procesador hace los cálculos', 'Salida: la pantalla muestra el resultado', 'Almacenamiento: el archivo pasa al disco'],
        pista: '<p>Primero entra la información, después se trabaja con ella, luego se muestra y al final se guarda.</p>',
        solucion: '<p>El orden es entrada, procesamiento, salida y almacenamiento. Los datos entran por el teclado o el ratón, el procesador trabaja con ellos, la pantalla los muestra y, al guardar, el archivo pasa al disco.</p>' },
      { tipo: 'numero', enunciado: '<p>En la tabla de piezas de la lección, ¿cuántos periféricos de salida aparecen?</p>', respuesta: 3,
        pista: '<p>Cuenta las filas que dicen que la pieza recibe datos y los muestra.</p>',
        solucion: '<p>Son tres: la pantalla o monitor, la impresora y las bocinas o auriculares. El teclado y el ratón son de entrada, y el disco es de almacenamiento.</p>' },
    ],
    fuentes: [
      WIKI('Hardware', 'Hardware'),
      WIKI('Software', 'Software'),
      WIKI('Perif%C3%A9rico_(inform%C3%A1tica)', 'Periférico (informática)'),
      WIKI('Unidad_central_de_procesamiento', 'Unidad central de procesamiento'),
      WIKI('Sistema_operativo', 'Sistema operativo'),
    ],
  });

  // ------------------------------------------------------------------
  const CAPAS = diagrama([0, 8], [0, 10], [
    ...caja(4, 1.2, 6.4, 1.6, 'Hardware', true), txt(4, 0.8, 'las piezas del equipo'),
    ...flecha([4, 2.0], [4, 2.6], 0, 0.7),
    ...caja(4, 3.4, 6.4, 1.6, 'Sistema operativo', true), txt(4, 3.0, 'administra el equipo'),
    ...flecha([4, 4.2], [4, 4.8], 0, 0.7),
    ...caja(4, 5.6, 6.4, 1.6, 'Aplicaciones', true), txt(4, 5.2, 'el navegador, el procesador de textos'),
    ...flecha([4, 6.4], [4, 7.0], 0, 0.7),
    ...caja(4, 7.8, 6.4, 1.6, 'La persona', true), txt(4, 7.4, 'usa los programas'),
  ], 'Diagrama de cuatro capas apiladas de abajo arriba, unidas por flechas que suben. Abajo está el hardware, las piezas del equipo; encima, el sistema operativo, que administra el equipo; encima, las aplicaciones, como el navegador o el procesador de textos; y arriba del todo, la persona, que usa los programas.');

  // ------------------------------------------------------------------
  L('El sistema operativo', {
    objetivo: 'Explicar para qué sirve el sistema operativo, distinguirlo de las aplicaciones y saber qué hacer cuando un programa deja de responder.',
    vidaReal: `
      <p>El escritorio que ves al encender el equipo, los iconos, la franja de programas abiertos y el reloj de la esquina: todo eso lo puso alguien, y ese alguien es un programa que trabaja por debajo. Entenderlo te sirve para saber por qué el equipo va lento cuando abres demasiadas ventanas, por qué conviene instalar las actualizaciones y qué hacer cuando un programa deja de responder, sin miedo a romper nada.</p>`,
    explicacion: `
      <p>Enciendes el equipo y aparece un escritorio con iconos, una barra de tareas y un reloj en la esquina. Nada de eso salió de la fábrica: alguien lo puso ahí. Y aunque en un equipo se ve distinto, en otro igual, el trabajo de fondo es el mismo. La pregunta de esta lección es quién hace ese trabajo.</p>
      <h3>El programa que administra el equipo</h3>
      <p>Ese programa se llama <strong>sistema operativo</strong> (<span lang="en">operating system</span>). Es el conjunto de programas que gestiona los recursos del hardware y le presta servicios a las demás aplicaciones. En la práctica, es el administrador que está entre las personas y las piezas: enciende la máquina, reconoce el teclado y la pantalla, abre y cierra los programas, guarda los archivos, se conecta a internet y decide qué puede hacer cada cuenta de usuario.</p>
      <p>Windows, macOS y Linux son tres ejemplos de sistemas operativos que se usan todos los días. Cada uno pone su propia capa encima, pero el trabajo de fondo es el mismo. La lección "Linux: un sistema operativo libre" cuenta por qué hay gente que lo prefiere, y las lecciones "Qué es el software libre" y "Por qué usar software libre" explican esa diferencia.</p>
      <h3>Lo que ves en la pantalla</h3>
      <p>El escritorio, los iconos, la barra de tareas (en Windows) o el menú superior (en macOS), la bandeja del reloj: todo eso es la parte visible del sistema operativo, y cada elemento tiene su trabajo. Los que se usan a diario son los que están en la tabla de abajo.</p>
      <h3>Ventanas y procesos</h3>
      <p>Cada programa que abres trabaja dentro de una <strong>ventana</strong> (<span lang="en">window</span>): ese marco con bordes y botones donde aparece el contenido. Tienes el procesador de textos en una ventana, el navegador en otra y el explorador de archivos en otra más. Y cada programa en funcionamiento se llama <strong>proceso</strong> (<span lang="en">process</span>): una unidad de actividad con sus instrucciones, su estado actual y los recursos que el equipo le prestó.</p>
      <p>Aquí está la diferencia importante: el sistema operativo es la base, y un programa como el procesador de textos o el navegador es una aplicación que trabaja encima de esa base, cada una en su ventana. El procesador de textos, con el que trabajarás en la unidad siguiente, es una de esas aplicaciones.</p>
      <h3>Cuentas, actualizaciones y programas colgados</h3>
      <p>El sistema operativo gestiona la autenticación y la autorización de los usuarios, es decir, quién entra y a qué puede acceder. Por eso un equipo compartido puede tener una cuenta para cada persona, con su escritorio y sus archivos.</p>
      <p>También es el que publica las actualizaciones. En Windows, Windows Update es el mecanismo que publica, examina y descarga las actualizaciones del sistema, y hay actualizaciones de características, de seguridad y de controladores de dispositivo. Las de seguridad tapan huecos que alguien ya encontró, así que conviene instalarlas cuando aparecen.</p>
      <p>Y cuando un programa deja de responder, el camino es terminar su proceso. En Windows se abre el administrador de tareas con Ctrl+Alt+Supr y se finaliza el proceso que está colgado; en el Mac, Opción+Comando+Esc fuerza la salida de la aplicación. Después lo vuelves a abrir. Eso sí: lo que no habías guardado se perdió, y por eso conviene guardar a menudo.</p>
      ${CAPAS}`,
    ejemplo: `
      <p>Abres el procesador de textos y, de repente, la ventana no responde: no acepta clics y el reloj de la barra no avanza. ¿Qué haces?</p>
      <ol class="pasos-ej">
        <li>Primero confirmas que el problema es ese programa y no todo el equipo. Si las demás ventanas sí responden, el que está colgado es el proceso de ese programa.</li>
        <li>Abres el gestor de tareas del sistema con Ctrl+Alt+Supr (en Windows) o la salida forzada con Opción+Comando+Esc (en el Mac).</li>
        <li>Ahí ves la lista de programas en funcionamiento. Eliges el que está colgado y lo finalizas: eso termina su proceso.</li>
        <li>Vuelves a abrir el programa y retomas el trabajo donde lo dejaste.</li>
      </ol>
      <p>Resultado: <span class="resultado">el programa colgado cerrado y el equipo otra vez respondiendo</span>.</p>
      <p class="nota"><strong>Error común:</strong> reiniciar el equipo a la fuerza cada vez que algo se cuelga. Funciona, pero pierdes todo lo que tenías abierto. Mejor termina solo el proceso que falla.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Windows, macOS y Linux son ejemplos de:</p>',
        opciones: ['Periféricos de entrada', 'Sistemas operativos', 'Carpetas del disco'], correcta: 1,
        pista: '<p>Son los programas que administran el equipo por debajo.</p>',
        solucion: '<p>Los tres son sistemas operativos: el conjunto de programas que gestiona el hardware y da servicio a las aplicaciones. Un teclado es un periférico de entrada, y una carpeta es un cajón de archivos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué elemento de la pantalla sirve para cambiar de un programa abierto a otro?</p>',
        opciones: ['El icono del escritorio', 'La bandeja del reloj', 'La barra de tareas'], correcta: 2,
        pista: '<p>Es la franja donde aparecen los programas que tienes abiertos.</p>',
        solucion: '<p>La barra de tareas (en Windows) o el menú superior (en macOS) muestran los programas abiertos y permiten cambiar de uno a otro. El icono del escritorio abre programas y la bandeja del reloj muestra la hora.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un programa deja de responder. ¿Qué haces?</p>',
        opciones: ['Finalizas su proceso y lo vuelves a abrir', 'Borras el archivo del disco', 'Reinicias el equipo a la fuerza'], correcta: 0,
        pista: '<p>Existe una herramienta para terminar el proceso que está colgado.</p>',
        solucion: '<p>Se termina el proceso del programa que falla, con el administrador de tareas o la salida forzada, y luego se vuelve a abrir. Borrar archivos o reiniciar a la fuerza son medidas más drásticas y hacen perder más trabajo.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el programa que administra el equipo y da servicio a los demás programas?</p>',
        respuestas: ['sistema operativo', 'el sistema operativo'],
        pista: '<p>Es el programa base, el que está por debajo de todo lo demás.</p>',
        solucion: '<p>Se dice sistema operativo. Las aplicaciones, como el navegador o el procesador de textos, son programas que trabajan encima de él.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para salir de un programa que no responde.</p>',
        respuesta: ['Abrir el gestor de tareas o la salida forzada', 'Elegir el programa que está colgado', 'Finalizar su proceso', 'Volver a abrir el programa'],
        pista: '<p>Primero se abre la herramienta, luego se busca el programa, después se termina y al final se abre otra vez.</p>',
        solucion: '<p>El orden es: abrir el gestor de tareas o la salida forzada, elegir el programa colgado, finalizar su proceso y volver a abrir el programa. Lo que no se había guardado se pierde en ese momento.</p>' },
      { tipo: 'numero', enunciado: '<p>Tienes abiertos el procesador de textos, el navegador y el explorador de archivos, cada uno en su propia ventana. ¿Cuántas ventanas hay abiertas?</p>', respuesta: 3,
        pista: '<p>Cada programa abierto ocupa una ventana.</p>',
        solucion: '<p>Son <strong>3</strong> ventanas: una por cada programa. Los iconos del escritorio no son ventanas, sino accesos directos para abrir programas.</p>' },
    ],
    fuentes: [
      WIKI('Sistema_operativo', 'Sistema operativo'),
      WIKI('Proceso_(inform%C3%A1tica)', 'Proceso (informática)'),
      WIKI('Interfaz_gr%C3%A1fica_de_usuario', 'Interfaz gráfica de usuario'),
      MSLEARN('Introducción a Windows Update', 'https://learn.microsoft.com/es-es/windows/deployment/update/windows-update-overview'),
      MS('Métodos abreviados de teclado de Windows', 'https://support.microsoft.com/es-es/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec'),
      APPLE('Atajos de teclado del Mac', 'https://support.apple.com/es-es/102650'),
    ],
  });

  // ------------------------------------------------------------------
  const ARBOL = diagrama([0, 12], [0, 10], [
    ...caja(2.2, 8.6, 3.6, 1.2, 'Documentos', true),
    ...flecha([2.2, 8.0], [5.0, 7.0], 0, 0.8),
    ...caja(5.0, 6.4, 3.6, 1.2, 'Trabajo', true),
    ...flecha([5.0, 5.8], [8.0, 4.8], 0, 0.8),
    ...caja(8.0, 4.2, 4.4, 1.2, 'Plan de estudios', true),
    ...flecha([8.0, 3.6], [10.4, 2.6], 0, 0.8),
    ...caja(10.4, 2.0, 3.4, 1.2, 'plan.docx'),
    txt(10.4, 1.0, 'archivo'),
  ], 'Diagrama del árbol de carpetas. La carpeta Documentos, arriba a la izquierda, contiene la carpeta Trabajo; Trabajo contiene la carpeta Plan de estudios; y dentro de Plan de estudios está el archivo plan.docx, dibujado sin relleno porque no es una carpeta.');

  // ------------------------------------------------------------------
  L('Archivos y carpetas', {
    objetivo: 'Distinguir el nombre, la extensión y el contenido de un archivo, ordenar tus cosas en carpetas y encontrar un archivo con la ruta o por fecha.',
    vidaReal: `
      <p>Guardar un trabajo, encontrarlo tres meses después y abrirlo sin miedo a que falte algo: eso es ordenar bien las cosas. Esta lección te sirve para saber dónde quedó cada cosa, para reconocer un documento sospechoso que llega de golpe, para entender por qué el equipo dice que no hay espacio y para no perder el trabajo de un año por vaciar la papelera con prisa.</p>`,
    explicacion: `
      <p>Tu escritorio tiene cuarenta cosas encima: un documento del mes pasado, tres fotos, un texto sin nombre y un montón de descargas. Y ahora necesitas uno de esos documentos, pero no recuerdas dónde lo guardaste. Para que eso no pase, hay que entender dos cosas: cómo se llaman las cosas que guardas y cómo se ordenan.</p>
      <h3>El nombre de un archivo</h3>
      <p>Un <strong>archivo</strong> (<span lang="en">file</span>) es el contenedor con nombre que guarda información: un texto, una foto, un video, una canción. Ese nombre son dos cosas pegadas y separadas por un punto. La primera la eliges tú y te dice de qué va: «plan», «foto-playa» o «cancion». La segunda son las últimas letras, y se llama <strong>extensión</strong> (<span lang="en">file extension</span>): dice de qué tipo es el archivo y con qué programa se abre. Un archivo llamado «plan.docx» es un documento de texto y se abre con un procesador de textos.</p>
      <p>La extensión es la que manda, no el nombre. Puedes llamar «cancion» a un video y «informe» a una foto, y la computadora no se va a equivocar: abrirá el video con el reproductor y la foto con el visor de imágenes. El nombre lo puedes cambiar cuando quieras; cambiar la extensión es otra cosa, porque le dirías a la computadora que el contenido es del otro tipo.</p>
      <h3>Carpetas: cajones dentro de cajones</h3>
      <p>Una <strong>carpeta</strong> (<span lang="en">folder</span>) es el cajón que organiza: guarda archivos y también otras carpetas. Así se arma un árbol, con cada carpeta dentro de otra. Por eso hay carpetas que ya vienen creadas en el equipo, como Documentos, Descargas y el Escritorio.</p>
      <p>El camino completo desde la raíz hasta un archivo se llama la ruta. Por ejemplo: Documentos, luego Trabajo, luego Plan de estudios, y ahí dentro el archivo plan.docx. Con la ruta completa sabes exactamente dónde está cualquier cosa, y por eso la ruta es lo que copias y pegas cuando le pides ayuda a alguien.</p>
      ${ARBOL}
      <h3>Cuatro cosas prácticas</h3>
      <p>La primera: el escritorio es el peor sitio para trabajar. Todo amontonado se pierde de vista, así que conviene guardar cada cosa en la carpeta que le toca.</p>
      <p>La segunda: cuando borras un archivo, no desaparece de inmediato. Va a la papelera, y el sistema la conserva ahí hasta que se vacía. Por eso un archivo borrado por error todavía se puede recuperar.</p>
      <p>La tercera: el tamaño importa. Un texto ocupa poquísimo y un video, muchísimo más. Por eso las carpetas llenan el disco tan rápido y por eso el equipo avisa cuando no queda espacio.</p>
      <p>La cuarta: una extensión que no reconoces, o un archivo que llega de alguien que no esperabas, es una señal de alarma. En la lección "Seguridad digital: contraseñas y fraudes en línea" de esta unidad verás qué hacer con eso.</p>
      <p>Guardar un archivo de verdad, con su nombre y su carpeta, se ve paso a paso en la lección "Crear, guardar y abrir documentos" de la unidad siguiente. Y los manuales de los equipos y de los programas también son archivos: la lección "Leer instructivos y manuales" explica cómo se leen.</p>`,
    ejemplo: `
      <p>Necesitas el resumen de un libro que anotaste hace un mes y no recuerdas dónde lo guardaste. ¿Cómo lo encuentras?</p>
      <ol class="pasos-ej">
        <li>Piensa primero en la palabra que usaste al guardarlo. Si no te sale ninguna, empieza por donde sueles guardar: Documentos, Descargas o el Escritorio.</li>
        <li>Cuando llegas a la carpeta, mira la extensión: un .docx es un documento de texto y un .mp3 es un audio.</li>
        <li>Si no aparece, usa la búsqueda de la ventana de archivos. Puedes ordenar los elementos por nombre, por tipo, por tamaño o por fecha.</li>
        <li>Por último, mira la fecha de modificación de cada uno. El que buscas es el que se modificó en la fecha que te acuerdas.</li>
      </ol>
      <p>Resultado: <span class="resultado">el archivo aparece por su extensión y su fecha, aunque el nombre no te suene</span>.</p>
      <p class="nota"><strong>Error común:</strong> vaciar la papelera sin mirar. Si borraste el archivo por error y vacías la papelera, ya no está en ninguna parte, porque la papelera conserva lo que borraste hasta que la vacías.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué extensión corresponde a un texto sin formato?</p>',
        opciones: ['.txt', '.jpg', '.mp3'], correcta: 0,
        pista: '<p>Una extensión es un archivo de texto y las otras dos son de imagen y de audio.</p>',
        solucion: '<p>La extensión <strong>.txt</strong> es la de un texto sin formato. La <strong>.jpg</strong> es de imagen y la <strong>.mp3</strong> es de audio.</p>' },
      { tipo: 'opciones', enunciado: '<p>La ruta Documentos, Trabajo, plan.docx dice:</p>',
        opciones: ['Que el archivo está en Documentos y nada más', 'El camino completo desde la raíz hasta el archivo', 'Que el archivo está vacío'], correcta: 1,
        pista: '<p>Una ruta se lee como un camino, carpeta por carpeta.</p>',
        solucion: '<p>Una ruta es el camino completo: la carpeta de la raíz, la de en medio y, al final, el nombre del archivo con su extensión. Por eso sirve para decir exactamente dónde está.</p>' },
      { tipo: 'opciones', enunciado: '<p>Cuando vacías la papelera:</p>',
        opciones: ['Los archivos vuelven a su carpeta', 'Los archivos se copian al Escritorio', 'Los archivos borrados se van para siempre'], correcta: 2,
        pista: '<p>Hasta ese momento, la papelera todavía los guardaba.</p>',
        solucion: '<p>Al vaciar la papelera, los archivos que estaban guardados en ella se eliminan de verdad y ya no se pueden recuperar. Por eso conviene mirarla antes de vaciarla.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llaman las últimas letras del nombre de un archivo, separadas por un punto, que dicen de qué tipo es?</p>',
        respuestas: ['extensión', 'la extensión'],
        pista: '<p>Es lo que va después del punto, como en «plan.docx».</p>',
        solucion: '<p>Se dice extensión. Sirve para identificar el tipo de archivo y el programa asociado con él, por eso el equipo abre cada archivo con el programa correcto.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para encontrar un archivo que no recuerdas dónde guardaste.</p>',
        respuesta: ['Pensar en una palabra del nombre', 'Revisar Documentos, Descargas y el Escritorio', 'Mirar la extensión para saber qué es', 'Buscar por fecha y revisar la fecha de modificación'],
        pista: '<p>Primero lo que recuerdas del nombre, luego los sitios de siempre, después cómo se reconoce y al final la fecha.</p>',
        solucion: '<p>El orden es: pensar en una palabra del nombre, revisar las carpetas donde sueles guardar, mirar la extensión para saber qué es y, si sigue sin aparecer, buscar por fecha y revisar la fecha de modificación.</p>' },
      { tipo: 'numero', enunciado: '<p>En la ruta del ejemplo (Documentos, Trabajo, Plan de estudios, plan.docx), ¿cuántas carpetas hay?</p>', respuesta: 3,
        pista: '<p>Cuenta solo las carpetas, no el archivo.</p>',
        solucion: '<p>Son <strong>3</strong> carpetas: Documentos, Trabajo y Plan de estudios. «plan.docx» es el archivo que está dentro de la última.</p>' },
    ],
    fuentes: [
      WIKI('Sistema_de_archivos', 'Sistema de archivos'),
      WIKI('Papelera_de_reciclaje', 'Papelera de reciclaje'),
      APPLE('Organizar los archivos en carpetas en el Mac', 'https://support.apple.com/es-es/guide/mac-help/mh26885/mac'),
      LO('Abrir documentos', 'https://help.libreoffice.org/latest/es/text/shared/01/01020000.html'),
    ],
  });

  // ------------------------------------------------------------------
  const TECLADO = diagrama([0, 10.2], [0, 5], [
    { tipo: 'poligono', puntos: [[0.4, 0.4], [9.8, 0.4], [9.8, 4.6], [0.4, 4.6]] },
    { tipo: 'poligono', puntos: [[1.0, 2.1], [7.2, 2.1], [7.2, 4.0], [1.0, 4.0]] },
    txt(4.1, 3.05, 'Letras'),
    { tipo: 'poligono', puntos: [[7.6, 3.1], [8.9, 3.1], [8.9, 4.0], [7.6, 4.0]] },
    txt(8.25, 3.55, 'Enter'),
    { tipo: 'poligono', puntos: [[1.0, 1.35], [6.2, 1.35], [6.2, 1.85], [1.0, 1.85]] },
    txt(3.6, 1.6, 'Mayús'),
    { tipo: 'poligono', puntos: [[1.0, 0.65], [2.7, 0.65], [2.7, 1.15], [1.0, 1.15]], relleno: true },
    txt(1.85, 0.9, 'Ctrl'),
    { tipo: 'poligono', puntos: [[3.0, 0.65], [4.5, 0.65], [4.5, 1.15], [3.0, 1.15]], relleno: true },
    txt(3.75, 0.9, 'Alt'),
    { tipo: 'poligono', puntos: [[4.9, 0.65], [9.4, 0.65], [9.4, 1.15], [4.9, 1.15]] },
    txt(7.15, 0.9, 'Espacio'),
  ], 'Esquema de un teclado visto desde arriba. En el centro está el bloque grande de las letras. A su derecha, la tecla Enter. Debajo de las letras, la tecla Mayús. En la fila de abajo, a la izquierda, la tecla Ctrl y a su lado la tecla Alt, las dos marcadas con un relleno para distinguirlas del resto, y en el centro la barra del espacio.');

  // ------------------------------------------------------------------
  L('Atajos de teclado esenciales', {
    objetivo: 'Usar los atajos de teclado que funcionan en cualquier programa: copiar, pegar, deshacer, guardar, buscar, imprimir y cambiar de ventana.',
    vidaReal: `
      <p>Trabajar con una mano en el ratón y la otra en el teclado es lento. Cuando sabes pedirle a la máquina las cosas sin soltar el teclado, escribes más rápido, copias sin errores y salvas el trabajo a tiempo. Te sirve en la escuela, en la casa y en el trabajo, donde a veces hay que mover un dato de un sitio a otro en segundos.</p>`,
    explicacion: `
      <p>Escribes con una mano en el ratón y la otra en el teclado. Cada vez que sueltas el ratón para buscar una opción en un menú, tardas más de lo necesario. Hay una manera más corta de pedir lo mismo: pulsar dos o tres teclas a la vez. Esa combinación se llama <strong>atajo de teclado</strong> (<span lang="en">keyboard shortcut</span>).</p>
      <p>Los atajos que sirven en cualquier programa son casi los mismos en todos los equipos, y en esta lección están todos juntos en la tabla del final. Antes de verlos, conviene entender por qué funcionan.</p>
      <h3>Copiar, cortar y pegar</h3>
      <p>Cuando pulsas Ctrl+C, lo que tenías seleccionado no desaparece: se copia a un lugar temporal donde queda a la espera. Ese lugar se llama <strong>portapapeles</strong> (<span lang="en">clipboard</span>). Ctrl+X hace dos cosas a la vez: copia al portapapeles y borra de donde estaba. Ctrl+V toma lo que hay en el portapapeles y lo pega donde tienes el cursor. Por eso copiar y pegar te deja llevar un dato de un sitio a otro sin escribirlo otra vez.</p>
      <h3>Deshacer y rehacer</h3>
      <p>Ctrl+Z es <strong>deshacer</strong> (<span lang="en">undo</span>): vuelve atrás en los cambios que acabas de hacer. Funciona porque el programa recuerda los últimos cambios que hiciste, y por eso puedes deshacer varias veces seguidas, una por cada cambio. Ctrl+Y es lo contrario: rehace lo que acabas de deshacer. Si apretaste Ctrl+Z de más, con Ctrl+Y recuperas el cambio que habías borrado sin querer.</p>
      <h3>El atajo que más te va a salvar</h3>
      <p>Ctrl+S guarda el documento en el que estás trabajando. Es el más importante porque una computadora apagada no guardó nada: si se apaga, se corta la luz o se cae el equipo, lo que no guardaste se perdió.</p>
      <p>Fíjate en cómo se escriben: en un teclado hay una tecla que se llama Ctrl y cumple ese papel en todos los programas. En los equipos de Apple la misma tecla se llama Comando y se escribe ⌘, así que el atajo de guardar es ⌘S. En la tabla pongo Ctrl, que es lo más común, y el atajo equivalente en el Mac.</p>
      <h3>Cambiar de ventana</h3>
      <p>Alt+Tab cambia entre las ventanas abiertas. Mantienes Alt apretada y vas pulsando Tab hasta llegar a la que quieres. Es el atajo más útil cuando tienes cinco cosas abiertas y solo sabes en cuál estabas trabajando.</p>
      ${TECLADO}
      <div class="tabla-wrap"><table>
        <thead><tr><th>Teclas</th><th>Qué hace</th><th>Para qué te sirve</th></tr></thead>
        <tbody>
          <tr><th scope="row">Ctrl+C</th><td>Copia lo seleccionado al portapapeles.</td><td>Llevar un dato a otro sitio sin reescribirlo.</td></tr>
          <tr><th scope="row">Ctrl+X</th><td>Corta lo seleccionado y también lo copia.</td><td>Quitar un dato de un sitio y llevarlo a otro.</td></tr>
          <tr><th scope="row">Ctrl+V</th><td>Pega lo que hay en el portapapeles.</td><td>Colocar el dato copiado donde estás escribiendo.</td></tr>
          <tr><th scope="row">Ctrl+Z</th><td>Deshace el último cambio que hiciste.</td><td>Corregir un error sin rehacer todo el trabajo.</td></tr>
          <tr><th scope="row">Ctrl+Y</th><td>Rehace el cambio que acabas de deshacer.</td><td>Recuperar algo que borraste sin querer.</td></tr>
          <tr><th scope="row">Ctrl+A</th><td>Selecciona todo el contenido de una vez.</td><td>Agarrar un texto entero sin marcarlo con el ratón.</td></tr>
          <tr><th scope="row">Ctrl+S</th><td>Guarda el documento que tienes abierto.</td><td>Que no se pierda el trabajo si se apaga el equipo.</td></tr>
          <tr><th scope="row">Ctrl+F</th><td>Abre el cuadro de búsqueda del documento.</td><td>Encontrar una palabra concreta dentro del texto.</td></tr>
          <tr><th scope="row">Ctrl+P</th><td>Abre el cuadro de diálogo de impresión.</td><td>Imprimir el documento o guardarlo en PDF.</td></tr>
          <tr><th scope="row">Alt+Tab</th><td>Cambia entre las ventanas que están abiertas.</td><td>Pasar de una ventana a otra sin tocar el ratón.</td></tr>
        </tbody>
      </table></div>
      <p>En los equipos de Apple, los atajos de esta tabla se escriben con ⌘ en lugar de Ctrl: ⌘C, ⌘X, ⌘V, ⌘Z, ⌘A, ⌘S, ⌘F y ⌘P. Para rehacer, el Mac usa ⌘Mayús+Z.</p>
      <p>Guardar e imprimir tienen su propia lección en la unidad de procesador de textos: "Crear, guardar y abrir documentos" y "Exportar a PDF e imprimir".</p>`,
    ejemplo: `
      <p>Recibes un correo con la dirección de una tienda y la quieres pasar a un documento tuyo. ¿Cómo lo haces sin soltar el teclado?</p>
      <ol class="pasos-ej">
        <li>Primero seleccionas el dato que quieres. Puedes marcarlo con el ratón o pulsar Ctrl+A si lo que quieres es todo el texto del mensaje.</li>
        <li>Copias lo que está seleccionado con Ctrl+C. La dirección queda guardada en el portapapeles, y el correo no cambia.</li>
        <li>Cambias de ventana con Alt+Tab hasta llegar a tu documento, y colocas el cursor donde va la dirección.</li>
        <li>Pegas el dato en el documento con Ctrl+V. La dirección aparece una sola vez, en su sitio.</li>
      </ol>
      <p>Resultado: <span class="resultado">la dirección copiada del correo y pegada en el documento</span>.</p>
      <p class="nota"><strong>Error común:</strong> si pegaste donde no era, no borres a mano: pulsa Ctrl+Z y el programa deshace el último cambio solo.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué hace Ctrl+Z?</p>',
        opciones: ['Deshace el último cambio', 'Copia lo seleccionado', 'Guarda el documento'], correcta: 0,
        pista: '<p>Es el atajo que te salva cuando te equivocas escribiendo.</p>',
        solucion: '<p>Ctrl+Z deshace el último cambio, y se puede usar varias veces seguidas, una por cada cambio. Ctrl+C copia y Ctrl+S guarda.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Con qué combinación se guarda el documento en el que estás trabajando?</p>',
        opciones: ['Ctrl+P', 'Ctrl+Z', 'Ctrl+S'], correcta: 2,
        pista: '<p>Es la tecla que, en el Mac, se escribe ⌘S.</p>',
        solucion: '<p>Se guarda con <strong>Ctrl+S</strong> (⌘S en el Mac). Ctrl+P abre el cuadro de impresión y Ctrl+Z deshace, así que ninguna de las otras dos guarda.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos atajos cambia entre las ventanas abiertas?</p>',
        opciones: ['Ctrl+A', 'Alt+Tab', 'Ctrl+F'], correcta: 1,
        pista: '<p>Mantienes una tecla apretada y vas pulsando la otra.</p>',
        solucion: '<p>Alt+Tab cambia entre las ventanas abiertas: mantienes Alt y vas pulsando Tab. Ctrl+A selecciona todo y Ctrl+F busca en el documento.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el lugar temporal donde queda lo que copias, hasta que lo pegas en otro sitio?</p>',
        respuestas: ['portapapeles', 'el portapapeles'],
        pista: '<p>Su nombre viene de un objeto de papel que se usaba antes de las computadoras.</p>',
        solucion: '<p>Se dice portapapeles. Ctrl+C y Ctrl+X dejan ahí lo seleccionado, y Ctrl+V pega lo que hay en él desde el último copiado o corte.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para pasar un dato de un sitio a otro con el teclado.</p>',
        respuesta: ['Seleccionar el dato', 'Copiarlo con Ctrl+C', 'Cambiar de ventana con Alt+Tab', 'Pegarlo con Ctrl+V'],
        pista: '<p>Primero lo agarras, después lo copias, luego te mueves y al final lo pegas.</p>',
        solucion: '<p>El orden es: seleccionar el dato, copiarlo con Ctrl+C, cambiar de ventana con Alt+Tab y pegarlo con Ctrl+V. Si te equivocaste al pegar, un Ctrl+Z lo deshace.</p>' },
      { tipo: 'numero', enunciado: '<p>En el ejemplo de la lección, desde que seleccionas el texto hasta que lo pegas en el documento, ¿cuántos pasos hay?</p>', respuesta: 4,
        pista: '<p>Cuenta los pasos de la lista, sin contar el aviso del error común.</p>',
        solucion: '<p>Son <strong>4</strong> pasos: seleccionar, copiar, cambiar de ventana y pegar. El Ctrl+Z del final es el remedio si te equivocaste, no un paso de la secuencia.</p>' },
    ],
    fuentes: [
      MS('Métodos abreviados de teclado de Windows', 'https://support.microsoft.com/es-es/windows/keyboard-shortcuts-in-windows-dcc61a57-8ff0-cffe-9796-cb9706c75eec'),
      APPLE('Atajos de teclado del Mac', 'https://support.apple.com/es-es/102650'),
      LO('Atajos de teclado generales en LibreOffice', 'https://help.libreoffice.org/latest/es/text/shared/04/01010000.html'),
      WIKI('Atajo_de_teclado', 'Atajo de teclado'),
    ],
  });

  // ------------------------------------------------------------------
  const VENTANA = diagrama([0, 12], [0, 9.5], [
    { tipo: 'poligono', puntos: [[0.2, 0.2], [11.8, 0.2], [11.8, 9.3], [0.2, 9.3]] },
    { tipo: 'poligono', puntos: [[0.4, 8.4], [11.6, 8.4], [11.6, 9.1], [0.4, 9.1]] },
    { tipo: 'poligono', puntos: [[0.7, 8.4], [3.6, 8.4], [3.6, 9.1], [0.7, 9.1]], relleno: true },
    txt(2.15, 8.75, 'Pestaña'),
    { tipo: 'poligono', puntos: [[0.5, 6.4], [11.5, 6.4], [11.5, 7.1], [0.5, 7.1]] },
    { tipo: 'poligono', puntos: [[0.9, 6.55], [1.25, 6.55], [1.25, 6.95], [0.9, 6.95]], relleno: true },
    txt(2.6, 6.75, 'ejemplo.org'),
    txt(8.2, 6.75, 'Barra de direcciones'),
    { tipo: 'poligono', puntos: [[0.5, 1.0], [11.5, 1.0], [11.5, 6.1], [0.5, 6.1]] },
    txt(6.0, 3.6, 'La página que estás viendo'),
    { tipo: 'poligono', puntos: [[0.9, 1.4], [4.6, 1.4], [4.6, 2.1], [0.9, 2.1]] },
    txt(2.75, 1.75, 'Aviso de descarga'),
    { tipo: 'poligono', puntos: [[0.6, 7.55], [1.1, 7.55], [1.1, 8.05], [0.6, 8.05]] },
    txt(1.9, 7.8, 'Atrás'),
    { tipo: 'poligono', puntos: [[2.5, 7.55], [3.0, 7.55], [3.0, 8.05], [2.5, 8.05]] },
    txt(4.0, 7.8, 'Adelante'),
    { tipo: 'poligono', puntos: [[5.0, 7.55], [5.5, 7.55], [5.5, 8.05], [5.0, 8.05]] },
    txt(6.5, 7.8, 'Recargar'),
    { tipo: 'poligono', puntos: [[7.9, 7.55], [8.4, 7.55], [8.4, 8.05], [7.9, 8.05]] },
    txt(9.3, 7.8, 'Inicio'),
  ], 'Esquema de la ventana de un navegador. En la franja de arriba hay una pestaña con el rótulo Pestaña. Debajo, a la izquierda, tres botones con los rótulos Atrás, Adelante y Recargar, y a la derecha un botón con el rótulo Inicio. En el centro está la Barra de direcciones, con un candado y la dirección ejemplo.org. Abajo, un rectángulo grande con el rótulo La página que estás viendo, y en su esquina inferior izquierda una banda con el rótulo Aviso de descarga.');

  // ------------------------------------------------------------------
  L('Internet y el navegador', {
    objetivo: 'Explicar qué es internet y qué hace el navegador, leer las partes de una URL y comprobar de dónde viene una página antes de escribir tus datos en ella.',
    vidaReal: `
      <p>Cuando necesitas una información, la buscas en la ventana del programa con el que miras internet y a los dos minutos tienes veinte pestañas abiertas y ninguna es la que buscabas. También pasa en la tienda: hay un sitio que se parece al que quieres, pero la dirección es otra. Esta lección te sirve para entender qué hay detrás de esa ventana, para leer de verdad la dirección de un sitio y para comprobar de dónde viene lo que estás leyendo antes de entregar tus datos.</p>`,
    explicacion: `
      <p>Abres el programa con el que miras internet y aparecen veinte pestañas, tres de ellas con noticias que no estabas buscando. Para un momento: ¿qué es internet y qué es exactamente esa ventana? Las dos preguntas se responden juntas, y las dos sirven para lo mismo: saber de dónde viene lo que estás leyendo.</p>
      <h3>Internet es una red con direcciones</h3>
      <p>Internet es el nombre de una red enorme de computadoras conectadas entre sí, y cada sitio de esa red tiene una dirección propia. Piensa en el revés para entenderlo: sin el sistema de nombres de dominio, en lugar de escribir el nombre de un sitio tendrías que escribir su dirección numérica, un número largo que nadie memoriza. El nombre de un sitio, como <span lang="en">es.wikipedia.org</span>, esconde esa dirección: la parte del medio es el nombre de la máquina donde vive la página.</p>
      <h3>El programa que pide las páginas</h3>
      <p>El <strong>navegador</strong> (<span lang="en">web browser</span>) es el programa que permite el acceso a la web: pide las páginas y las dibuja en la ventana. Cuando escribes una dirección, el navegador hace una solicitud, espera la respuesta y la convierte en lo que ves, con su texto, sus imágenes y sus botones. Hay varios navegadores y se usan igual: Chrome, Firefox y Edge son tres ejemplos.</p>
      <p>A veces la respuesta ya está guardada en lo que se llama una caché, un lugar donde se conservan datos para atender más rápido las solicitudes siguientes. Por eso la segunda vez que abres la misma página aparece casi al instante.</p>
      <h3>Las tres partes de una dirección</h3>
      <p>La dirección de una página se llama <strong>URL</strong> (<span lang="en">URL</span>) y se escribe en la barra de direcciones, la franja larga de arriba. Mirada con calma, tiene tres partes: el protocolo (en <span lang="en">https://ejemplo.org/directorio/hoja.html</span> es <span lang="en">https</span>, la versión cifrada de <span lang="en">http</span>), el nombre del sitio (<span lang="en">ejemplo.org</span>, la parte que de verdad te dice a quién estás entrando) y el camino dentro del sitio (<span lang="en">/directorio/hoja.html</span>), que lleva hasta la página concreta.</p>
      <h3>Una pestaña, una página</h3>
      <p>Cada página que abres dentro de la ventana del navegador es una <strong>pestaña</strong> (<span lang="en">tab</span>). La mayoría de los navegadores admiten abrir varias páginas en pestañas distintas, y por eso se acumulan tan deprisa: cada pestaña es un sitio abierto que sigue funcionando mientras haces otra cosa.</p>
      ${VENTANA}
      <h3>Qué mirar antes de escribir tus datos</h3>
      <p>Antes de escribir un dato tuyo en una página hay cuatro cosas que conviene mirar. La primera es la dirección completa: mira el nombre del sitio y no solo el título de la página, porque el título lo escribe quien la publica y se puede inventar. La segunda es el candado de la barra de direcciones, que indica que la conexión está cifrada, aunque no dice nada sobre si el sitio es honesto: de eso se ocupa la lección "Seguridad digital: contraseñas y fraudes en línea". La tercera es la fecha de la información y la cuarta, quién la escribió.</p>
      <p>Las dos últimas se aprenden en la lección "Verificar noticias y detectar desinformación" de Lectura, y para leerlas con ritmo está "Lectura rápida y escaneo". Si los números de una página te parecen demasiado buenos, la lección "Cómo leer estadísticas en las noticias sin que te engañen" de Matemáticas te enseña a revisarlos.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Elemento de la ventana</th><th>Para qué sirve</th></tr></thead>
        <tbody>
          <tr><th scope="row">Barra de direcciones</th><td>Escribes ahí la dirección de la página y ves en qué sitio estás.</td></tr>
          <tr><th scope="row">Botón de atrás</th><td>Regresa a la página anterior que visitaste.</td></tr>
          <tr><th scope="row">Botón de adelante</th><td>Avanza a la página siguiente de la que visitaste.</td></tr>
          <tr><th scope="row">Botón de recargar</th><td>Vuelve a cargar la página, cuando algo no se ve bien.</td></tr>
          <tr><th scope="row">Botón de inicio</th><td>Regresa a la página de inicio que elegiste.</td></tr>
          <tr><th scope="row">Pestañas</th><td>Cada una es una página abierta en la misma ventana.</td></tr>
          <tr><th scope="row">Candado del cifrado</th><td>El candado que indica que la conexión está cifrada.</td></tr>
          <tr><th scope="row">Aviso de descarga</th><td>La banda que aparece cuando se descarga un archivo.</td></tr>
        </tbody>
      </table></div>`,
    ejemplo: `
      <p>Buscas información sobre el reciclaje de papel y te salen veinte páginas. ¿Cómo compruebas cuál te sirve?</p>
      <ol class="pasos-ej">
        <li>Primero abres el navegador y escribes lo que buscas. Si ya conoces la página, escribes su dirección directamente en la barra.</li>
        <li>Segundo, miras los primeros resultados y lees el nombre del sitio, no el título. El título lo escribe quien publica la página, así que un título rollo no dice nada; el nombre del sitio sí.</li>
        <li>Tercero, abres la página que promete y compruebas dos cosas: cuándo se publicó y quién la escribió.</li>
        <li>Cuarto, si el dato te sirve, lo copias. Si no, vuelves atrás con el botón de retroceso y pruebas con otro resultado.</li>
      </ol>
      <p>Resultado: <span class="resultado">quedas con la página del sitio que esperabas, no con la primera que apareció</span>.</p>
      <p class="nota"><strong>Error común:</strong> fiarse del título y del candado, y escribir tus datos sin mirar el nombre del sitio. El candado solo dice que la conexión está cifrada, y un sitio falso también lo puede tener.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué es el navegador?</p>',
        opciones: ['Un programa que permite el acceso a la web', 'Un servicio que guarda tus archivos', 'Un programa que hace cuentas'], correcta: 0,
        pista: '<p>Es el programa con el que miras las páginas de internet.</p>',
        solucion: '<p>El navegador es el programa que permite el acceso a la web: pide las páginas y las dibuja en la ventana. Chrome, Firefox y Edge son tres ejemplos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve la barra de direcciones?</p>',
        opciones: ['Para cambiar el tamaño de las letras', 'Para cerrar la ventana del navegador', 'Para escribir la dirección de la página y ver en qué sitio estás'], correcta: 2,
        pista: '<p>Es la franja larga de arriba, encima de la página.</p>',
        solucion: '<p>La barra de direcciones es donde escribes la dirección de la página y donde ves la dirección del sitio en el que estás. El tamaño de las letras se cambia en otro sitio, y la ventana se cierra con su propio botón.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué conviene revisar antes de escribir tus datos en una página?</p>',
        opciones: ['Solo que la página se vea bonita', 'El nombre del sitio, el candado, la fecha y quién escribió la información', 'El color del fondo y el tamaño de la letra'], correcta: 1,
        pista: '<p>Son cuatro cosas, y ninguna tiene que ver con el gusto de la página.</p>',
        solucion: '<p>Hay que mirar el nombre del sitio, el candado del cifrado, la fecha de la información y quién la escribió. El título de la página lo pone quien la publica, así que no sirve como garantía.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama cada página abierta dentro de la ventana del navegador?</p>',
        respuestas: ['pestaña', 'la pestaña'],
        pista: '<p>Es lo que ves en la franja de arriba de la ventana.</p>',
        solucion: '<p>Se dice pestaña. Cada pestaña es una página abierta, y por eso se acumulan tan deprisa cuando navegas.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para buscar información y comprobar de dónde viene.</p>',
        respuesta: ['Abrir el navegador y escribir la dirección o la pregunta', 'Mirar los primeros resultados y leer el nombre del sitio, no el título', 'Abrir la página y comprobar la fecha y quién la escribió', 'Volver atrás con el botón de retroceso si no sirve'],
        pista: '<p>Primero buscas, después lees los resultados, luego compruebas y al final decides si te quedas o vuelves.</p>',
        solucion: '<p>El orden es: abrir el navegador y escribir la dirección o la pregunta, mirar los primeros resultados leyendo el nombre del sitio y no el título, abrir la página y comprobar la fecha y la autoría, y volver atrás con el botón de retroceso si no sirve.</p>' },
      { tipo: 'numero', enunciado: '<p>Una URL como <span lang="en">https://ejemplo.org/directorio/hoja.html</span> tiene protocolo, nombre del sitio y camino. ¿Cuántas partes tiene?</p>', respuesta: 3,
        pista: '<p>Cuenta los tres tramos que se ven en el ejemplo.</p>',
        solucion: '<p>Son <strong>3</strong> partes: el protocolo (https), el nombre del sitio (ejemplo.org) y el camino dentro del sitio (/directorio/hoja.html).</p>' },
    ],
    fuentes: [
      WIKI('Navegador_web', 'Navegador web'),
      WIKI('Domain_Name_System', 'Sistema de nombres de dominio'),
      WIKI('Cach%C3%A9_(inform%C3%A1tica)', 'Caché (informática)'),
    ],
  });

  // ------------------------------------------------------------------
  const MENSAJE = diagrama([0, 10], [0, 8], [
    { tipo: 'poligono', puntos: [[0.4, 0.4], [9.6, 0.4], [9.6, 7.6], [0.4, 7.6]] },
    { tipo: 'poligono', puntos: [[1.4, 6.6], [8.6, 6.6], [8.6, 7.4], [1.4, 7.4]], relleno: true },
    txt(5.0, 7.0, 'Remitente'),
    { tipo: 'poligono', puntos: [[1.4, 5.6], [8.6, 5.6], [8.6, 6.4], [1.4, 6.4]] },
    txt(5.0, 6.0, 'Destinatario'),
    { tipo: 'poligono', puntos: [[1.4, 4.6], [8.6, 4.6], [8.6, 5.4], [1.4, 5.4]] },
    txt(5.0, 5.0, 'Asunto'),
    { tipo: 'poligono', puntos: [[1.4, 2.4], [8.6, 2.4], [8.6, 4.4], [1.4, 4.4]] },
    txt(5.0, 3.4, 'Cuerpo del mensaje'),
    { tipo: 'poligono', puntos: [[1.4, 1.0], [8.6, 1.0], [8.6, 2.0], [1.4, 2.0]] },
    { tipo: 'poligono', puntos: [[1.9, 1.3], [2.2, 1.3], [2.2, 1.7], [1.9, 1.7]], relleno: true },
    txt(5.0, 1.5, 'Archivo adjunto'),
  ], 'Esquema de la anatomía de un mensaje de correo. De arriba abajo: Remitente, en una franja destacada; Destinatario; Asunto; un recuadro grande con el rótulo Cuerpo del mensaje; y, abajo, un recuadro con un clip y el rótulo Archivo adjunto.');

  // ------------------------------------------------------------------
  L('Correo electrónico', {
    objetivo: 'Reconocer las cinco partes de un mensaje de correo, enviar un archivo adjunto y tratar el correo que no pediste.',
    vidaReal: `
      <p>El correo es la manera más fácil de avisarle a alguien que está lejos, de mandar un trabajo de la escuela o de recibir un aviso del banco. También es por donde entran los mensajes que no quieres: publicidad, cadenas y intentos de robarte datos. Con lo que aprenderás en esta lección mandas tu primer archivo, contestas a tiempo y reconoces los mensajes que conviene borrar sin leer.</p>`,
    explicacion: `
      <p>Para avisarle a alguien que está a mil kilómetros hace falta un buzón con llave y una dirección. El correo electrónico es exactamente eso: un buzón con llave para cada persona y un camino que lleva el mensaje hasta el otro buzón.</p>
      <h3>La dirección con arroba</h3>
      <p>Cada persona tiene una dirección de correo, y esa dirección lleva un signo «@» en el medio. Fue Tomlinson quien propuso el arroba como divisor: la parte que va antes es el nombre de la persona dentro del servicio, y la que va después es el nombre del dominio que aloja la cuenta. Así, una dirección completa se compone de la parte local, el símbolo «@» y el dominio.</p>
      <h3>El mensaje y sus cinco partes</h3>
      <p>Entre tu equipo y el buzón del destinatario hay un servidor de correo que hace de intermediario: guarda los mensajes un momento antes de enviarlos. Cuando el mensaje llega, tiene cinco partes, y todas están rotuladas en el esquema de abajo. El <strong>remitente</strong> (<span lang="en">sender</span>) es quien envía el mensaje, y su nombre o apodo aparece en el primer campo. El destinatario es quien lo recibe. El asunto es el tema del que trata. El cuerpo es el texto que se escribe. Y los <strong>adjuntos</strong> (<span lang="en">attachment</span>) son los archivos que viajan pegados al mensaje.</p>
      <p>Cuando aparece una marca con un clip al lado del asunto, significa que el mensaje viene con uno o varios archivos anexos. Se puede enviar cualquier tipo de archivo digital, aunque suelen existir límites de tamaño. Por eso, antes de mandar un adjunto, conviene mirar su nombre y su peso: el nombre es el que dice de qué tipo es el archivo, como viste en "Archivos y carpetas", y el tamaño aparece en el campo del mensaje que indica el espacio que ocupa.</p>
      ${MENSAJE}
      <h3>El correo que no pediste</h3>
      <p>El <strong>correo no deseado</strong> (<span lang="en">spam</span>) son los mensajes no solicitados, no deseados o con remitente no conocido: publicidad, ofertas y cadenas. La regla es simple: se marca como no deseado y se borra. Y hay una costumbre que conviene aprender ya: no pidas datos personales por correo, porque un mensaje puede venir de alguien que se hace pasar por tu banco o por tu escuela.</p>
      <p>Dos costumbres más. La primera es contestar: un correo que no se contesta se queda sin respuesta, y quien lo mandó no se entera de si llegó. La segunda es no reenviar cadenas: casi nunca aportan nada útil y hacen que el mensaje crezca en cada reenvío. Si un archivo pesa demasiado para ir adjunto, el camino es otro, y lo verás en la lección "Almacenamiento en la nube" de la unidad de trabajo en la nube.</p>
      <p>Una app de correo como Mail, en el Mac, sirve para enviar, recibir y gestionar todas tus cuentas de correo desde el mismo programa. Los avisos legales y los contratos también llegan por correo, y para leerlos con calma está la lección "Leer contratos y letras pequeñas" de Lectura. Para escribir tus propios mensajes, las lecciones "Escribir un correo informal" y "Escribir un correo formal" de Inglés te dan las dos formas de redactarlos.</p>`,
    ejemplo: `
      <p>Te escriben para preguntarte si puedes pasar un trabajo, y quieren que les mandes el archivo. ¿Cómo respondes?</p>
      <ol class="pasos-ej">
        <li>Primero abres el mensaje y lees el remitente y el asunto. Compruebas que el remitente es quien dice ser y que el mensaje trata de lo que esperabas.</li>
        <li>Segundo, respondes con el botón de responder, que conserva el hilo de la conversación y ya escribe la dirección correcta.</li>
        <li>Tercero, escribes el texto y adjuntas el archivo. Antes de mandarlo, miras cómo se llama y cuánto pesa.</li>
        <li>Cuarto, pulsas enviar y revisas la carpeta de enviados, para confirmar que el mensaje salió con el adjunto incluido.</li>
      </ol>
      <p>Resultado: <span class="resultado">el mensaje enviado, con su archivo adjunto y sin respuestas perdidas</span>.</p>
      <p class="nota"><strong>Error común:</strong> mandar el archivo a todos los destinatarios, o adjuntar el documento equivocado porque había dos con nombres parecidos. Revisa la lista de destinatarios y el nombre del adjunto antes de enviar.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué parte del mensaje dice de qué trata?</p>',
        opciones: ['El remitente', 'El asunto', 'El destinatario'], correcta: 1,
        pista: '<p>Es el tema, en una sola línea, arriba del texto.</p>',
        solucion: '<p>El asunto muestra el tema que trata el mensaje. El remitente indica quién lo envía y el destinatario, quién lo recibe.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es un adjunto?</p>',
        opciones: ['El texto que escribes en el cuerpo', 'La dirección de quien envía el mensaje', 'Un archivo que viaja pegado al mensaje'], correcta: 2,
        pista: '<p>Cuando lo hay, aparece una marca con un clip.</p>',
        solucion: '<p>Los datos adjuntos son los archivos que viajan con el mensaje, y la marca del clip lo indica. El cuerpo es el texto y la dirección es el campo del remitente.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué haces con el correo no deseado?</p>',
        opciones: ['Lo marcas como no deseado y lo borras', 'Lo contestas para saber de quién es', 'Lo reenvías a tus contactos'], correcta: 0,
        pista: '<p>Es un mensaje que no pediste, así que no hay nada que responder.</p>',
        solucion: '<p>El correo no deseado se marca como tal y se borra. Contestar o reenviarlo solo le da un poco más de vida y molesta a más gente.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la parte del mensaje que indica quién lo envía?</p>',
        respuestas: ['remitente', 'el remitente'],
        pista: '<p>Es la primera línea, arriba del todo.</p>',
        solucion: '<p>Se dice remitente. En ese campo puede aparecer el nombre o el apodo de la persona o la entidad que envía el mensaje.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena las partes de un mensaje de correo, de arriba abajo.</p>',
        respuesta: ['Remitente: quien envía el mensaje', 'Destinatario: quien lo recibe', 'Asunto: de qué trata', 'Cuerpo: el texto que se escribe', 'Archivo adjunto: el documento que viaja pegado'],
        pista: '<p>Empieza por quien envía, sigue por quien recibe y termina por el texto y lo que va pegado.</p>',
        solucion: '<p>El orden es: remitente, destinatario, asunto, cuerpo y archivo adjunto. Con esos cinco campos se puede entender cualquier mensaje sin abrirlo entero.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas partes tiene un mensaje de correo?</p>', respuesta: 5,
        pista: '<p>Cuenta las que aparecen rotuladas en el esquema de la lección.</p>',
        solucion: '<p>Son <strong>5</strong>: remitente, destinatario, asunto, cuerpo y archivo adjunto.</p>' },
    ],
    fuentes: [
      WIKI('Correo_electr%C3%B3nico', 'Correo electrónico'),
      WIKI('Correo_no_deseado', 'Correo no deseado'),
      WIKI('Sistema_de_archivos', 'Sistema de archivos'),
      APPLE('Manual de uso de Mail para Mac', 'https://support.apple.com/es-es/guide/mail/welcome/mac'),
    ],
  });

  // ------------------------------------------------------------------
  const CADENA = diagrama([0, 10], [0, 10], [
    ...caja(5, 8.6, 8, 1.6, 'Mensaje', true), txt(5, 8.15, 'te pide datos o dinero, con urgencia'),
    ...flecha([5, 7.8], [5, 7.0], 0, 1.0),
    { tipo: 'linea', desde: [4.65, 7.75], hasta: [5.35, 7.05], serie: 1 },
    { tipo: 'linea', desde: [4.65, 7.05], hasta: [5.35, 7.75], serie: 1 },
    { tipo: 'linea', desde: [5.45, 7.4], hasta: [6.9, 7.4], punteada: true },
    txt(8.1, 7.4, 'no pulses aquí'),
    ...caja(5, 6.2, 8, 1.6, 'Enlace', true), txt(5, 5.75, 'apunta a otro sitio'),
    ...flecha([5, 5.4], [5, 4.6], 0, 1.0),
    ...caja(5, 3.8, 8, 1.6, 'Sitio falso', true), txt(5, 3.35, 'copia el aspecto del original'),
    ...flecha([5, 3.0], [5, 2.2], 0, 1.0),
    ...caja(5, 1.4, 8, 1.6, 'Tus datos', true), txt(5, 0.95, 'la contraseña y el número de tarjeta'),
  ], 'Diagrama vertical de cuatro cajas unidas por flechas que bajan. De arriba abajo: Mensaje, con la nota «te pide datos o dinero, con urgencia»; Enlace, con la nota «apunta a otro sitio»; Sitio falso, con la nota «copia el aspecto del original»; y Tus datos, con la nota «la contraseña y el número de tarjeta». Entre la primera y la segunda caja, una cruz marca el punto de corte de la cadena, con la advertencia «no pulses aquí».');

  // ------------------------------------------------------------------

  // ------------------------------------------------------------------
  L('Seguridad digital: contraseñas y fraudes en línea', {
    objetivo: 'Elegir contraseñas largas y distintas para cada sitio, usar un gestor de contraseñas y reconocer un intento de suplantación.',
    vidaReal: `
      <p>Vas a crear tu primera cuenta y te piden una contraseña. Poco después llega un correo que dice que tu cuenta será bloqueada si no confirmas tus datos. Saber distinguir esas dos situaciones te evita entregar tu contraseña a quien no es, y saber dónde denunciar el intento de fraude hace que perder tiempo no sirva de nada. En la escuela, en la casa y en el trabajo, casi todos los servicios que usas tienen una contraseña.</p>`,
    explicacion: `
<p>Hay tres cosas que no le dices a un desconocido: tu nombre, tu número de tarjeta y tu contraseña. Esta lección trata de las tres y del mensaje que las pide.</p>
<h3>La contraseña</h3>
<p>Una <strong>contraseña</strong> (<span lang="en">password</span>) es una forma de autenticación: usa información secreta para controlar el acceso a un recurso, como tu correo o tu cuenta del banco. Para que sirva, tiene que ser larga, distinta en cada sitio y no compartida con nadie. El NIST de Estados Unidos, en su guía del año 2017, dice que una contraseña elegida por el usuario debe tener al menos ocho caracteres y que no hay que imposingle otras reglas de complicación. El CISA, del mismo país, avisa de que contraseñas como 12345 o los datos personales no protegen nada.</p>
<p>Fíjate en lo que piden: no piden símbolos raros, pero sí que sea larga y que no se repita. Una frase de varias palabras se recuerda bien y es difícil de adivinar.</p>
<h3>El gestor de contraseñas</h3>
<p>Recordar una contraseña distinta para cada sitio es imposible, y por eso existen los <strong>gestores de contraseñas</strong> (<span lang="en">password manager</span>). Guardan muchas parejas de usuario y contraseña, de forma que tú solo memorizas una clave para acceder a todas las demás. Hay dos tipos: los que vienen con el sistema del equipo y los que se instalan aparte. El CISA recomienda crear contraseñas largas, aleatorias y únicas con un gestor.</p>
<h3>La suplantación</h3>
<p>La <strong>suplantación</strong> (<span lang="en">phishing</span>) es un conjunto de técnicas de engaño que se ganan la confianza de la víctima haciéndose pasar por una persona, una empresa o un servicio de confianza. El CISA de Estados Unidos, en una guía del año 2021, describe las señales más comunes, y las cinco están en la tabla de abajo.</p>
<p>La regla es corta: si el mensaje te pide datos o dinero, no pulses el enlace, no respondas, márcalo como no deseado y denomínalo en el organismo de protección al consumidor o en la policía de tu país.</p>
<p class="nota"><strong>Trampa común:</strong> ver el candado del navegador y dar por hecho que el sitio es de fiar. El candado solo indica que la conexión está cifrada, porque HTTPS es la versión cifrada de HTTP: un sitio falso también puede tener candado.</p>
${CADENA}
<h3>Una capa más</h3>
<p>Hay una medida que refuerza todo lo anterior: la verificación en dos pasos. El NIST de Estados Unidos, en un texto del año 2025, explica que esta comprobación añade una capa de seguridad y que las credenciales deben venir de dos categorías distintas. En la práctica: tu contraseña más un código que llega a tu teléfono. Los fraudes los repasan las lecciones "Fraudes comunes y cómo evitarlos" y "Banca en línea y pagos digitales" de Finanzas personales.</p>
<p>Si ya escribiste tus datos o pulsaste el enlace, lo sensato es lo de la última tabla. Ojo: esos tres pasos son un criterio propio de la lección, no de una fuente oficial.</p>
<div class="tabla-wrap"><table>
  <thead><tr><th>Señal de alerta</th><th>Qué hacer</th></tr></thead>
  <tbody>
    <tr><th scope="row">El remitente imita a una empresa con otra dirección</th><td>No pulses ni respondas: comprueba la dirección por otra vía.</td></tr>
    <tr><th scope="row">El enlace apunta a otro sitio al pasar el cursor</th><td>Cierra el mensaje y entra escribiendo la dirección.</td></tr>
    <tr><th scope="row">El mensaje mete prisa o invoca una importancia falsa</th><td>La prisa es la señal más típica: tómate tu tiempo.</td></tr>
    <tr><th scope="row">Pide datos de tu cuenta o dinero</th><td>No los envíes.</td></tr>
    <tr><th scope="row">Un correo no solicitado pide descargar un archivo</th><td>No lo abras: márcalo como no deseado.</td></tr>
  </tbody>
</table></div>
<div class="tabla-wrap"><table>
  <thead><tr><th>Contraseña débil</th><th>Contraseña fuerte</th></tr></thead>
  <tbody>
    <tr><th scope="row">12345</th><td>Una frase de varias palabras</td></tr>
    <tr><th scope="row">La fecha de tu cumpleaños</th><td>Una distinta para cada sitio</td></tr>
    <tr><th scope="row">El nombre de tu mascota</th><td>Una que no compartes</td></tr>
  </tbody>
</table></div>
<div class="tabla-wrap"><table>
  <thead><tr><th>Si ya pulsaste o escribiste algo</th><th>Qué hacer</th></tr></thead>
  <tbody>
    <tr><th scope="row">Diste tu contraseña o tus datos</th><td>Cambia esa contraseña y avisa a quien toque.</td></tr>
    <tr><th scope="row">Estaba en juego dinero</th><td>Comunícate con tu banco.</td></tr>
    <tr><th scope="row">Vas a denunciar</th><td>Guarda el mensaje y las capturas.</td></tr>
  </tbody>
</table></div>`,
    ejemplo: `
      <p>Llega un correo con este texto: «Ganaste un premio. Entra y cobralo antes de hoy». Es un mensaje inventado, para practicar. ¿Cómo lo revisas?</p>
      <ol class="pasos-ej">
        <li>Primero, quién dice venir. Miras la dirección completa del remitente y notas que el dominio no es el de la empresa que dice representar, aunque se parezca mucho.</li>
        <li>Segundo, qué pide. Pide tus datos y que pulses un enlace. Ningún premio se cobra así.</li>
        <li>Tercero, si hay urgencia. El texto mete prisa: solo hasta hoy.</li>
        <li>Cuarto, a dónde apunta el enlace. Sin pulsarlo, el navegador muestra la dirección real al pasar el cursor, y es otro sitio distinto.</li>
        <li>Quinto, si el asunto es genérico. Dice «notificación importante» y no dice de qué.</li>
      </ol>
      <p>Resultado: <span class="resultado">no se pulsa el enlace</span>, se marca el mensaje como correo no deseado y se denuncia donde corresponda.</p>
      <p class="nota"><strong>Error común:</strong> fiarse del candado o del asunto en lugar de mirar el dominio. El candado solo dice que la conexión está cifrada, y el asunto lo escribe quien envía el mensaje.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas contraseñas es más fuerte?</p>',
        opciones: ['12345', 'La fecha de tu cumpleaños', 'Una frase de varias palabras que solo tú conoces'], correcta: 2,
        pista: '<p>Piensa en qué le cuesta más adivinar a otra persona.</p>',
        solucion: '<p>La frase de varias palabras es la más fuerte: es larga, se recuerda bien y es difícil de adivinar. El 12345 es corto y adivinable, y la fecha de cumpleaños son datos personales que cualquiera puede buscar.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos mensajes es una señal de suplantación?</p>',
        opciones: ['Un mensaje corto de una persona que ya conoces', 'Un correo que imita a una empresa legítima con una dirección casi igual', 'Una lista de vínculos de un sitio que ya habías abierto'], correcta: 1,
        pista: '<p>Busca el que cambia algunos caracteres de una dirección conocida.</p>',
        solucion: '<p>El correo que imita a una empresa legítima cambiando o quitando unos pocos caracteres de la dirección es una señal clásica de suplantación. Un mensaje de alguien que ya conoces no tiene por qué ser falso.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un mensaje te pide datos y trae un enlace sospechoso. ¿Qué haces?</p>',
        opciones: ['No pulsar el enlace, no responder, marcarlo como correo no deseado y denunciarlo donde corresponda', 'Pulsar el enlace para ver de qué se trata', 'Responder pidiendo más detalles para salir de dudas'], correcta: 0,
        pista: '<p>Piensa en la regla de la lección: si te pide datos o dinero, no pulses, no respondas y denomínalo.</p>',
        solucion: '<p>Se hace exactamente eso: no pulsar, no responder, marcar como correo no deseado y denunciar en el organismo de protección al consumidor o en la policía de tu país. Pulsar o responder solo le da al fraudulento lo que busca.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el programa que guarda muchas contraseñas para que solo tengas que recordar una?</p>',
        respuestas: ['gestor de contraseñas', 'el gestor de contraseñas'],
        pista: '<p>Es un programa que guarda parejas de usuario y contraseña.</p>',
        solucion: '<p>Se dice gestor de contraseñas. Guarda muchas parejas de usuario y contraseña, de forma que solo memorizas una clave para acceder a todas las demás.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para revisar un mensaje sospechoso.</p>',
        respuesta: ['Mirar quién dice venir: el remitente y su dominio', 'Mirar qué pide: datos, dinero o un clic', 'Buscar si mete prisa o urgencia', 'Mirar a dónde apunta el enlace sin pulsarlo', 'Comprobar si el asunto es genérico'],
        pista: '<p>Empieza por quién viene, sigue por lo que pide, luego la prisa, después el enlace y al final el asunto.</p>',
        solucion: '<p>El orden es: mirar quién dice venir y su dominio, mirar qué pide, buscar si hay prisa, mirar a dónde apunta el enlace sin pulsarlo y comprobar si el asunto es genérico. Si algo no cuadra, no pulses nada.</p>' },
      { tipo: 'numero', enunciado: '<p>En la tabla de señales de alerta de la lección, ¿cuántas señales aparecen?</p>', respuesta: 5,
        pista: '<p>Cuenta las filas de la primera tabla.</p>',
        solucion: '<p>Son <strong>5</strong> señales: remitente que imita a la empresa, enlace que apunta a otro sitio, urgencia inventada, petición de datos o dinero, y correo no solicitado que pide descargar un archivo.</p>' },
    ],
    fuentes: [
      WIKI('Contrase%C3%B1a', 'Contraseña'),
      WIKI('Gestor_de_contrase%C3%B1as', 'Gestor de contraseñas'),
      WIKI('Phishing', 'Phishing'),
      WIKI('Navegador_web', 'Navegador web'),
      NIST('Special Publication 800-63B', 'https://pages.nist.gov/800-63-3/sp800-63b.html'),
      NIST('Back to basics: Multi-factor authentication', 'https://www.nist.gov/itl/applied-cybersecurity/tig/back-basics-multi-factor-authentication'),
      CISA('Use Strong Passwords', 'https://www.cisa.gov/secure-our-world/use-strong-passwords'),
      CISA('Avoiding Social Engineering and Phishing Attacks', 'https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks'),
    ],
  });

})();
