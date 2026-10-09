// Autosuficiencia · Unidad 13: Software libre.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Fuentes: sitios oficiales de cada proyecto, Open Source Initiative, guía de instalación de Linux Mint y Wikipedia como apoyo.
// No se recomiendan productos de pago ni se dan precios: solo se nombran las alternativas libres por lo que hacen.
(function () {
  const L = (titulo, datos) => window.registrarLeccion('autosuficiencia', titulo, datos);

  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const OSI = { nombre: 'Open Source Initiative: The Open Source Definition (en inglés)', url: 'https://opensource.org/osd' };
  const SITIO = (nombre, url, ingles = true) => ({ nombre: `${nombre}, sitio oficial${ingles ? ' (en inglés)' : ''}`, url });
  const LO = SITIO('LibreOffice', 'https://es.libreoffice.org/', false);
  const LOAYUDA = { nombre: 'Ayuda de LibreOffice: Usar Microsoft Office y LibreOffice', url: 'https://help.libreoffice.org/latest/es/text/shared/guide/ms_user.html' };
  const MINT = SITIO('Linux Mint: About', 'https://linuxmint.com/about.php');
  const MINTGUIA = { nombre: 'Linux Mint Installation Guide (en inglés)', url: 'https://linuxmint-installation-guide.readthedocs.io/en/latest/' };
  const MINTVERIF = { nombre: 'Linux Mint Installation Guide: Verify your ISO image (en inglés)', url: 'https://linuxmint-installation-guide.readthedocs.io/en/latest/verify.html' };
  const KERNEL = SITIO('The Linux Kernel Archives: What is Linux?', 'https://www.kernel.org/linux.html');
  const UBUNTU = SITIO('Ubuntu: Download Ubuntu Desktop', 'https://ubuntu.com/download/desktop');
  const ARTCRAFT = SITIO('ArtCraft: Crafting Apps', 'https://getartcraft.com/apps');

  // ------------------------------------------------------------------
  L('Qué es el software libre', {
    objetivo: 'Explicar qué hace "libre" a un programa, en qué se diferencia de uno gratuito y qué quiere decir "código abierto".',
    explicacion: `
      <p>Imagina una receta de cocina. Si te la dan escrita, puedes cocinarla, ver qué lleva, cambiarle la sal a tu gusto y pasársela a tu vecina. Si solo te venden el platillo ya hecho, puedes comértelo, pero no sabes qué tiene ni puedes cambiarlo. Con los programas de computadora pasa algo muy parecido.</p>
      <h3>El código fuente: la receta del programa</h3>
      <p>Todo programa empieza como un texto escrito por personas en un lenguaje de programación. A ese texto se le llama <strong>código fuente</strong>, y es como la receta: quien lo tiene puede ver cómo funciona el programa y cambiarlo. Muchas empresas solo te entregan el programa ya listo para usar, sin el código fuente, y además una licencia que te prohíbe copiarlo o modificarlo.</p>
      <h3>Las cuatro libertades</h3>
      <p>En los años ochenta, el programador Richard Stallman y la organización que fundó, la Free Software Foundation, definieron el <strong>software libre</strong>: un programa es libre cuando quien lo usa tiene cuatro libertades. Según la Wikipedia, que recoge esa definición, se numeran desde el cero:</p>
      <ol start="0">
        <li>Libertad de usar el programa como quieras y para lo que quieras.</li>
        <li>Libertad de estudiar cómo funciona y cambiarlo para que haga lo que necesitas. Para eso hace falta el código fuente.</li>
        <li>Libertad de hacer copias y regalarlas para ayudar a otras personas.</li>
        <li>Libertad de compartir tus versiones modificadas, para que toda la comunidad se beneficie.</li>
      </ol>
      <p>Esas libertades se garantizan con una licencia, que es el documento legal que dice qué puedes hacer con el programa. Una de las más conocidas es la Licencia Pública General de GNU, llamada GPL.</p>
      <h3>Libre no es lo mismo que gratis</h3>
      <p>En inglés se dice <span lang="en">free software</span>, y <span lang="en">free</span> significa tanto "libre" como "gratis". Por eso hay confusión. La Wikipedia lo aclara: el software libre suele no costar nada, pero puede venderse; y un programa gratuito puede no ser libre, si no te deja ver su código ni compartirlo. Por ejemplo, una aplicación gratis que no te deja ver cómo funciona y te prohíbe copiarla es gratuita, pero no libre.</p>
      <h3>¿Y el código abierto?</h3>
      <p>Más tarde surgió otro nombre: el <strong>código abierto</strong>. La Open Source Initiative, la organización que lo define, pone diez condiciones. Entre ellas, que el programa incluya su código fuente y que la licencia permita regalarlo o venderlo sin pagar regalías. En la práctica, la mayoría de los programas que vas a conocer en esta unidad son libres y de código abierto a la vez. La diferencia es de enfoque: el movimiento del software libre pone el acento en la libertad de las personas, y el del código abierto, en la forma de desarrollar programas de manera abierta y en colaboración. La Wikipedia aclara además que el código abierto se define sobre todo por tener el código disponible, sin hablar de las libertades de quien lo usa, así que un programa de código abierto puede no ser libre.</p>
      <h3>¿Quién hace estos programas?</h3>
      <p>Muchos los hacen comunidades de voluntarios de todo el mundo, otros fundaciones sin fines de lucro y otros empresas que viven de dar soporte o servicios. Por ejemplo, la página de Blender explica que es un proyecto comunitario coordinado por la Fundación Blender y financiado sobre todo con donaciones, y que miles de personas han contribuido a su código.</p>
      <p>En las siguientes lecciones conocerás programas libres para casi todo: un sistema operativo completo, la oficina, el diseño, la foto, el audio y el video.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que "gratis" y "libre" son lo mismo. Lo que hace libre a un programa son las libertades que te da, no su precio.</p>`,
    ejemplo: `
      <p>Revisa tres programas y decide cuáles son libres:</p>
      <ul>
        <li>A: gratis, pero no publica su código y prohíbe copiarlo.</li>
        <li>B: gratis, publica su código y permite modificarlo y compartirlo.</li>
        <li>C: cuesta dinero, publica su código y permite modificarlo y compartirlo.</li>
      </ul>
      <ol class="pasos-ej">
        <li>Primero, olvida el precio: no decide si un programa es libre.</li>
        <li>A no deja estudiar el programa ni compartirlo: le faltan las libertades 1, 2 y 3. No es libre.</li>
        <li>B cumple las cuatro libertades: es libre.</li>
        <li>C también cumple las cuatro, aunque cueste: es libre. Lo puedes comprar una vez y luego regalar copias.</li>
        <li>Comprueba: los libres son B y C, justo los dos que publican su código y dejan compartirlo.</li>
      </ol>
      <p>Resultado: <span class="resultado">B y C son libres; A solo es gratuito</span>. Fíjate que la pregunta clave nunca fue el precio.</p>`,
    vidaReal: `
      <p>Entender qué es el software libre te ayuda a elegir mejor tus herramientas:</p>
      <ul>
        <li>Distingues un programa libre de uno que solo es gratis por ahora.</li>
        <li>Sabes que puedes copiar y regalar los programas libres sin hacer nada ilegal.</li>
        <li>Entiendes qué quiere decir "código abierto" cuando lo leas.</li>
        <li>Sabes que detrás de muchos programas hay comunidades a las que puedes sumarte.</li><li>Puedes explicar a otras personas por qué "gratis" no siempre quiere decir "libre".</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Las libertades del software libre se numeran desde el 0. Si la última es la número 3, ¿cuántas libertades son?</p>', respuesta: 4,
        pista: '<p>Cuenta el 0, el 1, el 2 y el 3.</p>',
        solucion: '<p>Del 0 al 3 son <strong>4 libertades</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>La Open Source Initiative pone diez condiciones para el código abierto. Si un programa cumple 7, ¿cuántas le faltan?</p>', respuesta: 10 - 7,
        pista: '<p>Resta.</p>',
        solucion: '<p>10 − 7 = <strong>3</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una aplicación es gratis pero no publica su código y prohíbe copiarla. ¿Es software libre?</p>',
        opciones: ['Sí, porque es gratis', 'No: es gratuita, pero no te da las libertades', 'Sí, porque funciona en todas las computadoras'], correcta: 1,
        pista: '<p>El precio no decide.</p>',
        solucion: '<p><strong>No.</strong> Le faltan las libertades de estudiar y compartir.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué hace falta el código fuente?</p>',
        opciones: ['Para estudiar cómo funciona el programa y poder cambiarlo', 'Para que el programa sea más rápido', 'Para que el programa ocupe menos espacio'], correcta: 0,
        pista: '<p>Es como la receta.</p>',
        solucion: '<p><strong>Para estudiar y cambiar el programa.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Puede venderse un programa libre?</p>',
        opciones: ['No, nunca', 'Solo en otro país', 'Sí: libre no quiere decir gratis'], correcta: 2,
        pista: '<p>Recuerda la confusión con la palabra inglesa.</p>',
        solucion: '<p><strong>Sí.</strong> Lo que lo hace libre son las libertades, no el precio.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el texto escrito por personas con el que se hace un programa?</p>',
        respuestas: ['codigo fuente', 'el codigo fuente', 'codigo'],
        pista: '<p>Son dos palabras; la primera es "código".</p>',
        solucion: '<p>El <strong>código fuente</strong>.</p>' },
    ],
    fuentes: [WIKI('Software_libre', 'Software libre'), OSI, SITIO('Blender: About', 'https://www.blender.org/about/')],
  });

  // ------------------------------------------------------------------
  L('Por qué usar software libre', {
    objetivo: 'Valorar las ventajas y los límites del software libre para decidir cuándo te conviene usarlo.',
    explicacion: `
      <p>Muchos programas populares se pagan cada mes o cada año, y si dejas de pagar, ya no puedes abrir tus propios archivos. Otros son gratis, pero a cambio muestran anuncios o recogen datos de lo que haces. El software libre ofrece otro camino, con ventajas claras y algunos límites que conviene conocer.</p>
      <h3>Ventajas</h3>
      <ul>
        <li>Ahorro: casi todos los programas de esta unidad se descargan sin costo, y no hay que renovar una suscripción para seguir usándolos.</li>
        <li>Control de tus archivos: muchos guardan en formatos abiertos, que cualquier programa puede leer, y no dependen de que una empresa siga existiendo.</li>
        <li>Privacidad: como el código es público, cualquiera puede revisarlo en busca de funciones que espíen, aunque eso no garantiza que alguien lo haya hecho. Algunos lo dicen expresamente; por ejemplo, el sitio de KeePassXC, un gestor de contraseñas libre, dice que no tiene anuncios, ni rastreadores, ni nube, ni suscripciones.</li>
        <li>Compartir sin culpa: como viste en la lección anterior, puedes copiarlos y regalarlos a tu familia, tu escuela o tu negocio de forma legal.</li>
        <li>Comunidad: hay foros, manuales y traducciones hechos por voluntarios, muchas veces en español.</li>
      </ul>
      <h3>Una ventaja escondida: computadoras viejas</h3>
      <p>Muchas computadoras que ya no reciben actualizaciones de su sistema siguen funcionando bien por dentro. Con un sistema operativo libre, que verás en la siguiente lección, pueden seguir siendo útiles muchos años. Es una forma de ahorrar y de producir menos basura electrónica, como viste en la unidad Vivienda con los residuos.</p>
      <h3>Límites honestos</h3>
      <ul>
        <li>Hay que aprender: los menús y los nombres cambian, y al principio cuesta encontrar las cosas.</li>
        <li>Compatibilidad: algunos archivos muy complejos de programas de pago pueden verse un poco distintos al abrirlos en un programa libre.</li>
        <li>Trabajo en equipo: si tu escuela o tu trabajo exige un programa concreto, quizá tengas que usarlo allí.</li>
        <li>Proyectos nuevos: algunos programas libres están en desarrollo temprano y todavía fallan o les faltan funciones. Revisa siempre si dicen "alfa", "beta" o "en desarrollo".</li>
      </ul>
      <h3>Cómo decidir</h3>
      <p>No hace falta cambiarlo todo de golpe. Una buena estrategia es la misma escalera que viste en la primera unidad: empieza por un programa que uses mucho, por ejemplo el navegador o la suite de oficina, úsalo un mes y luego da el siguiente paso. Muchos programas libres funcionan también en Windows y en Mac, así que puedes probarlos sin cambiar de sistema.</p>
      <p>Pregúntate tres cosas:</p>
      <ol>
        <li>¿Hace lo que necesito? Pruébalo con tus archivos reales.</li>
        <li>¿Cuánto me ahorra al año?</li>
        <li>¿Lo puedo aprender con calma, con ayuda de su comunidad o de alguien que ya lo use?</li>
      </ol>
      <p class="nota"><strong>Trampa común:</strong> cambiar todos tus programas el mismo día antes de una entrega importante. Prueba primero con tiempo y sin presión.</p>`,
    ejemplo: `
      <p>Una pequeña papelería paga una suscripción de oficina de 1 200 pesos al año por cada una de sus 3 computadoras. Los precios son solo un ejemplo. Si cambia a una suite libre, ¿cuánto ahorra en 4 años?</p>
      <ol class="pasos-ej">
        <li>Primero calcula lo que paga en un año: 1 200 × 3 = 3 600 pesos.</li>
        <li>Luego multiplica por los 4 años: 3 600 × 4 = 14 400 pesos.</li>
        <li>La suite libre no cobra licencia, así que ese es el ahorro, menos el tiempo de aprenderla.</li>
        <li>Comprueba por computadora: 1 200 × 4 = 4 800 pesos cada una, y 4 800 × 3 = 14 400 pesos.</li>
      </ol>
      <p>Resultado: <span class="resultado">14 400 pesos en 4 años</span>. Antes de cambiar, conviene probar sus archivos más usados en el programa libre y dar unos días a quienes atienden la papelería para que se acostumbren.</p>`,
    vidaReal: `
      <p>Saber cuándo conviene el software libre te ayuda a decidir con calma:</p>
      <ul>
        <li>Dejas de pagar suscripciones por programas que usas poco.</li>
        <li>Le das una segunda vida a una computadora vieja.</li>
        <li>Guardas tus archivos en formatos que siempre podrás abrir.</li>
        <li>Sabes cuándo un programa todavía está en desarrollo y te puede fallar.</li><li>Cambias de programa poco a poco, sin estrés y sin perder tu trabajo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Pagas una suscripción de 150 pesos al mes (precio de ejemplo). ¿Cuánto pagas en un año?</p>', respuesta: 150 * 12,
        pista: '<p>Multiplica por 12.</p>',
        solucion: '<p>150 × 12 = <strong>1 800 pesos</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una escuela tiene 20 computadoras y una licencia cuesta 800 pesos por computadora (precio de ejemplo). ¿Cuánto ahorra con un programa libre?</p>', respuesta: 20 * 800,
        pista: '<p>Multiplica.</p>',
        solucion: '<p>20 × 800 = <strong>16 000 pesos</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tu computadora ya no recibe actualizaciones de su sistema, pero funciona bien. ¿Qué te puede ayudar?</p>',
        opciones: ['Tirarla', 'Un sistema operativo libre', 'Comprar siempre una computadora nueva'], correcta: 1,
        pista: '<p>Lo verás en la siguiente lección.</p>',
        solucion: '<p><strong>Un sistema operativo libre</strong> puede alargar su vida.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un programa libre dice "alfa" en su página. ¿Qué significa para ti?</p>',
        opciones: ['Que está en desarrollo temprano y puede fallar', 'Que es el mejor', 'Que es de pago'], correcta: 0,
        pista: '<p>Es una etapa de desarrollo.</p>',
        solucion: '<p><strong>Que todavía está en desarrollo</strong> y puede fallar.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es una buena forma de empezar con el software libre?</p>',
        opciones: ['Cambiar todo el día antes de un examen', 'No probar nada', 'Empezar con un programa que usas mucho y probarlo con calma'], correcta: 2,
        pista: '<p>Recuerda la escalera de la primera unidad.</p>',
        solucion: '<p><strong>Un programa a la vez, con calma.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el pago que se hace cada mes o cada año para seguir usando un programa?</p>',
        respuestas: ['suscripcion', 'una suscripcion', 'subscripcion', 'mensualidad'],
        pista: '<p>Empieza con "s".</p>',
        solucion: '<p>Una <strong>suscripción</strong>.</p>' },
    ],
    fuentes: [SITIO('KeePassXC', 'https://keepassxc.org/'), LO, WIKI('Software_libre', 'Software libre')],
  });

  // ------------------------------------------------------------------
  L('Linux: un sistema operativo libre', {
    objetivo: 'Entender qué es Linux, qué es una distribución y cómo probarla sin borrar nada de tu computadora.',
    explicacion: `
      <p>Cuando prendes una computadora, antes de abrir cualquier programa aparece el sistema operativo: el programa principal que maneja la pantalla, el teclado, los archivos y todo lo demás. Los más conocidos son de pago o vienen incluidos con el equipo. Pero existe una familia de sistemas operativos libres que usan millones de personas: Linux.</p>
      <h3>¿Qué es Linux?</h3>
      <p>El sitio oficial del núcleo de Linux explica que lo escribió desde cero Linus Torvalds, con ayuda de programadores de todo el mundo conectados por internet. Ese <strong>núcleo</strong>, o <span lang="en">kernel</span>, es la parte central que habla con las piezas de la computadora. Junto con otros programas libres, muchos del proyecto GNU de Richard Stallman, forma un sistema operativo completo. Por eso a veces se le llama GNU/Linux.</p>
      <h3>Las distribuciones</h3>
      <p>El mismo sitio aclara algo importante para quien empieza: no se descarga el núcleo solo, sino una <strong>distribución</strong>, que es un sistema Linux completo, con el núcleo, el escritorio y los programas listos para usar. Hay muchas, cada una con su estilo. Dos muy usadas para empezar:</p>
      <ul>
        <li>Linux Mint: su sitio dice que es una de las distribuciones de escritorio más populares, usada por millones de personas, y que busca ser moderna, cómoda, potente y fácil de usar. Es gratuita, de código abierto y está basada en Debian y Ubuntu.</li>
        <li>Ubuntu: su sitio explica que sus versiones LTS, de "soporte a largo plazo", reciben cinco años de actualizaciones de seguridad gratuitas.</li>
      </ul>
      <h3>Probar sin instalar</h3>
      <p>La gran ventaja es que puedes probar Linux sin tocar tu sistema actual. La guía oficial de instalación de Linux Mint explica los pasos:</p>
      <ol>
        <li>Descargar la imagen del sistema, un archivo con terminación .iso.</li>
        <li>Verificar que el archivo esté completo y sea auténtico.</li>
        <li>Crear con él una memoria USB de arranque.</li>
        <li>Reiniciar la computadora y elegir arrancar desde la USB, con una tecla especial que depende de cada equipo.</li>
      </ol>
      <p>Así Linux se ejecuta desde la memoria, sin instalarse en el disco. A esto la Wikipedia lo llama una distribución "live". Puedes ver si funcionan el wifi, el sonido y la pantalla, y solo si te convence, instalarlo.</p>
      <h3>Antes de instalar</h3>
      <ul>
        <li>Respalda tus archivos en otra memoria o disco. Instalar un sistema operativo puede borrar el disco si eliges mal una opción.</li>
        <li>Lee con calma cada pantalla del instalador. Si dudas, pide ayuda a alguien con experiencia o en los foros de la distribución.</li>
        <li>Puedes instalarlo junto a tu sistema actual y elegir cuál usar al prender la computadora.</li>
      </ul>
      <h3>¿Y mis programas?</h3>
      <p>Las distribuciones traen una tienda de programas, donde instalas con un clic. El sitio de Linux Mint dice que ofrece unos 30 000 paquetes. Muchos programas de esta unidad, como LibreOffice, Firefox, GIMP o VLC, ya vienen instalados o están en esa tienda.</p>
      <p class="nota"><strong>Trampa común:</strong> instalar Linux sin respaldar antes tus archivos. Pruébalo primero desde la USB y respalda todo.</p>`,
    ejemplo: `
      <p>Quieres probar Linux Mint en una computadora vieja de tu casa. Ordena los pasos de la guía oficial y lo que harías antes de instalarlo.</p>
      <ol class="pasos-ej">
        <li>Primero descarga la imagen .iso desde el sitio oficial de Linux Mint.</li>
        <li>Luego verifica el archivo, para confirmar que se descargó completo y que no es una copia modificada.</li>
        <li>Después crea la memoria USB de arranque con ese archivo.</li>
        <li>Reinicia, elige arrancar desde la USB y prueba el wifi, el sonido y la pantalla sin instalar nada.</li>
        <li>Si te gusta, respalda tus archivos y solo entonces instala.</li>
        <li>Comprueba: no tocaste el disco hasta tener respaldo y saber que todo funciona.</li>
      </ol>
      <p>Resultado: <span class="resultado">descargar, verificar, crear la USB, probar y, al final, respaldar e instalar</span>. Si algo no funciona en la prueba, no pasa nada: apagas, quitas la USB y tu computadora sigue igual que antes.</p>`,
    vidaReal: `
      <p>Conocer Linux te abre una alternativa libre para tu computadora:</p>
      <ul>
        <li>Puedes darle años de vida extra a una computadora vieja.</li>
        <li>Pruebas un sistema nuevo desde una USB sin arriesgar tus archivos.</li>
        <li>Instalas programas libres desde una tienda, con un clic.</li>
        <li>Sabes qué distribución elegir para empezar y dónde pedir ayuda.</li><li>Puedes ayudar a un familiar a revivir una computadora que ya iba a tirar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Las versiones LTS de Ubuntu reciben cinco años de actualizaciones de seguridad gratuitas. Si una salió en 2026, ¿hasta qué año las recibe?</p>', respuesta: 2026 + 5,
        pista: '<p>Suma 5.</p>',
        solucion: '<p>2026 + 5 = <strong>2031</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>La guía de Linux Mint tiene cuatro pasos antes de probarlo desde la USB: descargar, verificar, crear la USB y arrancar. Si ya hiciste los dos primeros, ¿cuántos te faltan?</p>', respuesta: 4 - 2,
        pista: '<p>Resta.</p>',
        solucion: '<p>4 − 2 = <strong>2 pasos</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Si eres principiante, ¿qué descargas para usar Linux?</p>',
        opciones: ['Una distribución, como Linux Mint o Ubuntu', 'Solo el núcleo', 'Un antivirus'], correcta: 0,
        pista: '<p>Lo aclara el sitio oficial del núcleo.</p>',
        solucion: '<p><strong>Una distribución</strong>, que es un sistema completo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué ventaja tiene arrancar Linux desde una memoria USB?</p>',
        opciones: ['Que borra tu disco', 'Que puedes probarlo sin instalar nada', 'Que es más lento a propósito'], correcta: 1,
        pista: '<p>Se llama distribución "live".</p>',
        solucion: '<p><strong>Lo pruebas sin instalar nada.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué haces antes de instalar Linux en tu disco?</p>',
        opciones: ['Nada, es automático', 'Desconectar la pantalla', 'Respaldar tus archivos'], correcta: 2,
        pista: '<p>Una opción mal elegida puede borrar el disco.</p>',
        solucion: '<p><strong>Respaldar tus archivos.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama un sistema Linux completo, con núcleo, escritorio y programas listos para usar?</p>',
        respuestas: ['distribucion', 'una distribucion', 'distro', 'distribucion linux', 'distribucion de linux'],
        pista: '<p>Empieza con "d".</p>',
        solucion: '<p>Una <strong>distribución</strong>.</p>' },
    ],
    fuentes: [KERNEL, MINT, UBUNTU, MINTGUIA, WIKI('Distribuci%C3%B3n_Linux', 'Distribución Linux'), WIKI('GNU/Linux', 'GNU/Linux')],
  });

  // ------------------------------------------------------------------
  L('Ofimática, internet y comunicación libres', {
    objetivo: 'Conocer alternativas libres para escribir documentos, hacer hojas de cálculo y presentaciones, navegar, usar el correo y hacer videollamadas.',
    explicacion: `
      <p>Escribir una carta, llevar las cuentas de la casa en una hoja de cálculo, hacer una presentación para la escuela, revisar el correo: son las tareas más comunes en una computadora. Para todas existen programas libres de buena calidad.</p>
      <h3>LibreOffice: la oficina completa</h3>
      <p>La <strong>suite de oficina</strong> es un paquete de programas para el trabajo de oficina. LibreOffice es una suite libre y de código abierto que, según su sitio, incluye seis herramientas:</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th scope="col">Herramienta</th><th scope="col">Para qué sirve</th></tr></thead>
        <tbody>
          <tr><th scope="row">Writer</th><td>Procesador de texto, desde notas hasta libros completos.</td></tr>
          <tr><th scope="row">Calc</th><td>Hoja de cálculo, para hacer cuentas, analizar datos y crear gráficas.</td></tr>
          <tr><th scope="row">Impress</th><td>Presentaciones.</td></tr>
          <tr><th scope="row">Draw</th><td>Diagramas e ilustraciones.</td></tr>
          <tr><th scope="row">Base</th><td>Bases de datos, con tablas, formularios e informes.</td></tr>
          <tr><th scope="row">Math</th><td>Fórmulas matemáticas.</td></tr>
        </tbody>
      </table></div>
      <p>La ayuda oficial de LibreOffice explica que puede abrir y guardar archivos de Microsoft Office: los de Word, como .doc y .docx, se abren en Writer; los de Excel, como .xls y .xlsx, en Calc, y los de PowerPoint, como .ppt y .pptx, en Impress. También permite guardar en esos formatos para compartir con quien use otro programa.</p>
      <p>Su formato propio se llama OpenDocument, con archivos como .odt para textos y .ods para hojas de cálculo. Es un formato abierto: cualquier programa puede leerlo, así que tus documentos no dependen de un solo fabricante.</p>
      <h3>Navegar e informarte</h3>
      <ul>
        <li>Firefox es un navegador libre de la fundación Mozilla, que se enfoca en la privacidad.</li>
        <li>Thunderbird, del mismo proyecto, maneja tu correo, tu calendario y tus contactos en Windows, Linux y macOS, y tiene versión para Android.</li>
      </ul>
      <h3>Contraseñas</h3>
      <p>KeePassXC es un gestor de contraseñas libre: guarda todas tus contraseñas cifradas en tu propia computadora, para que solo tengas que recordar una. Su sitio dice que no guarda nada en servidores remotos y que funciona en Windows, macOS y Linux.</p>
      <h3>Videollamadas y archivos en equipo</h3>
      <ul>
        <li>Jitsi permite hacer videollamadas gratis desde el navegador o el celular. Su sitio lo describe como seguro, flexible y completamente gratis.</li>
        <li>Nextcloud es una plataforma de código abierto para guardar y compartir archivos y trabajar en equipo. La puede instalar una escuela, una organización o una familia en su propio servidor, en lugar de depender de una nube ajena.</li>
      </ul>
      <p>La materia de Ofimática de este sitio enseñará a usar estos programas paso a paso. Aquí basta con saber que existen y qué hace cada uno.</p>
      <p class="nota"><strong>Trampa común:</strong> mandar un archivo en formato propio de LibreOffice a quien no lo usa sin avisarle. Si no sabes qué programa tiene, guárdalo también en un formato común, como .docx o PDF.</p>`,
    ejemplo: `
      <p>Te mandan por correo un archivo de Excel, presupuesto.xlsx, y quieres modificarlo con software libre y devolverlo. ¿Qué haces?</p>
      <ol class="pasos-ej">
        <li>Primero identifica el tipo: .xlsx es una hoja de cálculo de Excel.</li>
        <li>Según la ayuda de LibreOffice, ese archivo se abre en Calc.</li>
        <li>Haz los cambios en Calc.</li>
        <li>Al guardar, elige en "Guardar como" el mismo formato .xlsx, para que la otra persona lo abra sin problema.</li>
        <li>Revisa el archivo antes de mandarlo: si tenía fórmulas o formatos muy complejos, comprueba que se vean bien.</li>
        <li>Comprueba: abriste un .xlsx en Calc y lo devolviste en .xlsx.</li>
      </ol>
      <p>Resultado: <span class="resultado">abrirlo en Calc, editarlo y guardarlo otra vez como .xlsx</span>. Si solo necesitan leerlo y no modificarlo, también puedes mandarlo como PDF, que se ve igual en cualquier computadora.</p>`,
    vidaReal: `
      <p>Las herramientas libres de oficina cubren casi todo lo que haces en una computadora:</p>
      <ul>
        <li>Escribes, haces cuentas y presentaciones sin pagar licencias.</li>
        <li>Abres y devuelves archivos de Office, y revisas que se vean bien.</li>
        <li>Guardas tus contraseñas de forma segura en tu propio equipo.</li>
        <li>Haces videollamadas gratis con tu familia o tu escuela.</li><li>Sabes guardar tus archivos en un formato que cualquier persona podrá abrir.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Según su sitio, ¿cuántas herramientas trae LibreOffice?</p>', respuesta: 6,
        pista: '<p>Cuenta Writer, Calc, Impress, Draw, Base y Math.</p>',
        solucion: '<p><strong>6 herramientas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una familia usa 4 programas de pago que cuestan 300 pesos al mes en total (precio de ejemplo). Si los cambia por programas libres, ¿cuánto ahorra en 6 meses?</p>', respuesta: 300 * 6,
        pista: '<p>Multiplica.</p>',
        solucion: '<p>300 × 6 = <strong>1 800 pesos</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Con qué herramienta de LibreOffice abres un archivo .docx?</p>',
        opciones: ['Calc', 'Writer', 'Impress'], correcta: 1,
        pista: '<p>Es un documento de texto.</p>',
        solucion: '<p><strong>Writer</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué programa libre sirve para manejar el correo, el calendario y los contactos?</p>',
        opciones: ['Thunderbird', 'Jitsi', 'Calc'], correcta: 0,
        pista: '<p>Es del mismo proyecto que Firefox.</p>',
        solucion: '<p><strong>Thunderbird</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué ventaja tiene guardar en un formato abierto como OpenDocument?</p>',
        opciones: ['Que nadie lo puede abrir', 'Que ocupa más espacio', 'Que cualquier programa puede leerlo y no dependes de un fabricante'], correcta: 2,
        pista: '<p>Piensa en qué pasa si un programa desaparece.</p>',
        solucion: '<p><strong>No dependes de un solo fabricante.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama un paquete de programas para el trabajo de oficina, como LibreOffice?</p>',
        respuestas: ['suite de oficina', 'suite ofimatica', 'paquete de oficina', 'suite', 'paquete ofimatico'],
        pista: '<p>Son tres palabras: "suite de ...".</p>',
        solucion: '<p>Una <strong>suite de oficina</strong>.</p>' },
    ],
    fuentes: [LO, LOAYUDA, SITIO('Firefox', 'https://www.mozilla.org/es-MX/firefox/', false), SITIO('Thunderbird', 'https://www.thunderbird.net/es-MX/', false), SITIO('KeePassXC', 'https://keepassxc.org/'), SITIO('Jitsi', 'https://jitsi.org/'), SITIO('Nextcloud', 'https://nextcloud.com/'), WIKI('OpenDocument', 'OpenDocument')],
  });

  // ------------------------------------------------------------------
  L('Diseño, foto, audio y video libres', {
    objetivo: 'Conocer programas libres para editar imágenes, dibujar, revelar fotos, hacer 3D, editar audio y video, y transmitir en vivo.',
    explicacion: `
      <p>Los programas de diseño y video más famosos suelen ser de los más caros, y muchos se pagan por suscripción. Para quien empieza, para una escuela o para un pequeño negocio, eso puede ser una barrera. Hay alternativas libres para casi cada tarea creativa.</p>
      <h3>Una tabla para orientarte</h3>
      <div class="tabla-wrap"><table>
        <thead><tr><th scope="col">Tarea</th><th scope="col">Programa libre</th><th scope="col">Qué dice su sitio</th></tr></thead>
        <tbody>
          <tr><th scope="row">Retocar fotos e imágenes</th><td>GIMP</td><td>Editor de imágenes para GNU/Linux, macOS y Windows; software libre que puedes cambiar y compartir.</td></tr>
          <tr><th scope="row">Pintura e ilustración digital</th><td>Krita</td><td>Programa de pintura digital profesional, libre y gratuito, hecho por artistas.</td></tr>
          <tr><th scope="row">Dibujo vectorial, logotipos</th><td>Inkscape</td><td>Programa de dibujo vectorial libre.</td></tr>
          <tr><th scope="row">Revelar fotos RAW</th><td>darktable</td><td>Revelador de fotos RAW y organizador de fotos, hecho por fotógrafos; nunca modifica la imagen original.</td></tr>
          <tr><th scope="row">3D y animación</th><td>Blender</td><td>Software de creación 3D libre y de código abierto, para siempre, bajo la licencia GPL.</td></tr>
          <tr><th scope="row">Editar video</th><td>Kdenlive y Shotcut</td><td>Kdenlive es un editor de video de código abierto para Linux, Windows, macOS y BSD.</td></tr>
          <tr><th scope="row">Editar y grabar audio</th><td>Audacity</td><td>Editor y grabadora de audio libre y de código abierto, con más de 100 millones de descargas desde el año 2000.</td></tr>
          <tr><th scope="row">Grabar pantalla y transmitir en vivo</th><td>OBS Studio</td><td>Software libre y de código abierto para grabar video y transmitir en vivo en Windows, Mac o Linux.</td></tr>
          <tr><th scope="row">Ver cualquier video o música</th><td>VLC</td><td>Reproductor multimedia libre de VideoLAN.</td></tr>
        </tbody>
      </table></div>
      <h3>ArtCraft: una suite creativa nueva</h3>
      <p>Hay un proyecto reciente que vale la pena conocer. ArtCraft ofrece siete "Crafting Apps", todas de código abierto, gratuitas y escritas en el lenguaje Rust, que imitan la forma de trabajar de las suites creativas profesionales de pago:</p>
      <ul>
        <li>PhotoCraft: editor de imágenes.</li>
        <li>VectorCraft: ilustración vectorial.</li>
        <li>FilmCraft: edición de video.</li>
        <li>LightCraft: biblioteca de fotos y revelado RAW.</li>
        <li>PdfCraft: leer, organizar, unir, dividir y proteger archivos PDF.</li>
        <li>EffectCraft: animación gráfica y efectos visuales.</li>
        <li>DesignCraft: maquetación y publicación de páginas.</li>
      </ul>
      <p>Su sitio dice que todo su código está publicado bajo licencias permisivas, que funcionan en macOS, Windows y Linux, que muchas corren también en el navegador, y que buscan menús y atajos que los profesionales ya conocen para que no tengan que aprender de nuevo. También dice que todo corre en tu computadora, con tus archivos, sin pasar por la nube.</p>
      <p>Pero sé honesto contigo: según su propia página, PhotoCraft y PdfCraft están en <strong>versión alfa</strong>, es decir, en una etapa temprana, y las demás siguen en desarrollo. Están para probarse y seguir de cerca, no todavía para un trabajo importante con fecha de entrega. Para eso, por ahora, los programas de la tabla tienen años de uso.</p>
      <h3>Por dónde empezar</h3>
      <p>Elige según lo que más haces. Si retocas fotos para redes o para tu negocio, empieza con GIMP o Krita. Si haces logotipos o carteles, con Inkscape. Si grabas clases o tutoriales, con OBS Studio y Kdenlive. Todos tienen tutoriales gratuitos en sus sitios y comunidades que ayudan.</p>
      <p class="nota"><strong>Trampa común:</strong> esperar que un programa libre tenga los mismos menús que el de pago que conoces. Las funciones suelen estar, pero en otro lugar o con otro nombre; date unos días para acostumbrarte.</p>`,
    ejemplo: `
      <p>Una tienda de artesanías quiere hacer su logotipo, retocar las fotos de sus productos y grabar un video corto para redes. ¿Qué programas libres le sirven para cada tarea?</p>
      <ol class="pasos-ej">
        <li>Primero el logotipo: se hace mejor en dibujo vectorial, que se puede agrandar sin perder calidad. Programa: Inkscape.</li>
        <li>Luego las fotos: para recortarlas y corregir la luz, GIMP. Si las tomó en formato RAW, darktable.</li>
        <li>Después el video: para grabar la pantalla o la cámara, OBS Studio; para cortarlo y unirlo, Kdenlive o Shotcut.</li>
        <li>Si quiere probar algo nuevo, puede ver ArtCraft, sabiendo que todavía está en etapa temprana.</li>
        <li>Comprueba: tres tareas, y cada una tiene al menos un programa libre con años de uso.</li>
      </ol>
      <p>Resultado: <span class="resultado">Inkscape, GIMP o darktable, y OBS Studio con Kdenlive</span>.</p>`,
    vidaReal: `
      <p>Las herramientas creativas libres te permiten crear sin pagar licencias caras:</p>
      <ul>
        <li>Puedes diseñar el logotipo y las fotos de tu negocio.</li>
        <li>Grabas clases, tutoriales o transmisiones en vivo.</li>
        <li>Aprendes diseño, 3D o edición de video sin gastar.</li>
        <li>Sabes qué proyectos nuevos, como ArtCraft, conviene seguir de cerca.</li><li>Eliges la herramienta adecuada para cada tarea en lugar de usar una para todo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>ArtCraft ofrece siete apps. Si según su página dos están en versión alfa y el resto en desarrollo, ¿cuántas están en desarrollo?</p>', respuesta: 7 - 2,
        pista: '<p>Resta.</p>',
        solucion: '<p>7 − 2 = <strong>5 apps</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>El sitio de Audacity dice que tiene más de 100 millones de descargas desde el año 2000. ¿Cuántos años han pasado hasta 2026?</p>', respuesta: 2026 - 2000,
        pista: '<p>Resta los años.</p>',
        solucion: '<p>2026 − 2000 = <strong>26 años</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Quieres hacer un logotipo que se pueda agrandar sin perder calidad. ¿Qué programa libre usas?</p>',
        opciones: ['Audacity', 'VLC', 'Inkscape'], correcta: 2,
        pista: '<p>Es dibujo vectorial.</p>',
        solucion: '<p><strong>Inkscape.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué programa libre sirve para grabar la pantalla y transmitir en vivo?</p>',
        opciones: ['OBS Studio', 'Krita', 'darktable'], correcta: 0,
        pista: '<p>Lo usan muchos maestros y creadores de contenido.</p>',
        solucion: '<p><strong>OBS Studio.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Según su página, ¿en qué etapa están las apps de ArtCraft?</p>',
        opciones: ['Terminadas desde hace años', 'En alfa o en desarrollo', 'Retiradas'], correcta: 1,
        pista: '<p>Son un proyecto reciente.</p>',
        solucion: '<p><strong>En alfa o en desarrollo.</strong> Conviene probarlas, no usarlas aún para algo urgente.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la etapa temprana de un programa, cuando todavía puede fallar y le faltan funciones?</p>',
        respuestas: ['alfa', 'version alfa', 'alpha', 'la version alfa', 'fase alfa'],
        pista: '<p>Es la primera letra del alfabeto griego.</p>',
        solucion: '<p>La <strong>versión alfa</strong>.</p>' },
    ],
    fuentes: [ARTCRAFT, SITIO('GIMP', 'https://www.gimp.org/'), SITIO('Krita', 'https://krita.org/es/', false), SITIO('Inkscape', 'https://inkscape.org/'), SITIO('darktable', 'https://darktable.org/'), SITIO('Blender: About', 'https://www.blender.org/about/'), SITIO('Kdenlive', 'https://kdenlive.org/es/', false), SITIO('Shotcut', 'https://shotcut.org/'), SITIO('Audacity', 'https://www.audacityteam.org/'), SITIO('OBS Studio', 'https://obsproject.com/es', false), SITIO('VLC, VideoLAN', 'https://www.videolan.org/vlc/index.es.html', false)],
  });

  // ------------------------------------------------------------------
  L('Instalar software libre con seguridad', {
    objetivo: 'Descargar e instalar programas libres sin correr riesgos: desde el sitio oficial, verificando lo que bajas y con respaldo de tus archivos.',
    explicacion: `
      <p>Que un programa sea libre no quiere decir que cualquier copia que encuentres en internet sea segura. Alguien puede tomar un programa, agregarle algo dañino y subirlo a otro sitio con el mismo nombre. Por eso importa tanto de dónde lo descargas.</p>
      <h3>Siempre del sitio oficial</h3>
      <p>Cada programa de esta unidad tiene su sitio oficial, que es el que aparece en las fuentes de cada lección. Descarga desde ahí, o desde la tienda de programas de tu distribución Linux, que es su canal oficial. Desconfía de:</p>
      <ul>
        <li>Anuncios que dicen "descarga aquí" en sitios que no son del proyecto.</li>
        <li>Versiones "mejoradas" o "con todo incluido" hechas por desconocidos.</li>
        <li>Programas de pago "liberados" o "crackeados": no son software libre, y no sabes qué traen.</li>
      </ul>
      <h3>Verificar lo que descargas</h3>
      <p>La guía de instalación de Linux Mint explica por qué es importante verificar un archivo descargado:</p>
      <ul>
        <li>La verificación de <strong>integridad</strong> confirma que el archivo se descargó completo y es una copia exacta del que está en los servidores. Un error en la descarga puede causar fallas al instalar.</li>
        <li>La verificación de autenticidad confirma que el archivo lo firmó el propio proyecto, y que no es una copia modificada o dañina hecha por alguien más.</li>
      </ul>
      <p>Muchos proyectos publican junto a la descarga un número de comprobación, una especie de huella digital del archivo. Si la huella de tu archivo coincide con la publicada, el archivo es idéntico.</p>
      <h3>Respaldar antes de cambios grandes</h3>
      <p>Antes de instalar un sistema operativo o de cambiar un programa con el que guardas todo tu trabajo, haz un respaldo: una copia de tus archivos en otra memoria, otro disco u otro equipo. Como viste en "Linux: un sistema operativo libre", una opción mal elegida al instalar puede borrar el disco.</p>
      <h3>Mantenerlo al día</h3>
      <ul>
        <li>Instala las actualizaciones, sobre todo las de seguridad. En Linux suelen llegar por un administrador de actualizaciones; el sitio de Linux Mint destaca el suyo.</li>
        <li>Usa contraseñas distintas y guárdalas en un gestor como KeePassXC, que viste en "Ofimática, internet y comunicación libres".</li>
        <li>Desinstala lo que ya no uses.</li>
      </ul>
      <h3>Pedir ayuda</h3>
      <p>Si algo no sale, busca el foro oficial del programa o de tu distribución. Muchas comunidades tienen secciones en español. Al preguntar, di qué sistema y qué versión usas y qué hiciste antes del error. Y recuerda lo que viste en "Trueque y ayuda mutua": enseñar a otros lo que aprendiste también es parte de la comunidad del software libre.</p>
      <p class="nota"><strong>Trampa común:</strong> descargar un programa libre desde el primer resultado de un buscador, que a veces es un anuncio. Revisa que la dirección sea la del sitio oficial.</p>`,
    ejemplo: `
      <p>Buscas "descargar GIMP" y aparecen tres resultados: un anuncio de "GIMP Pro gratis con todo incluido", el sitio gimp.org y un blog con un enlace de descarga. ¿Cuál eliges y qué haces después?</p>
      <ol class="pasos-ej">
        <li>Primero descarta el anuncio: una versión "Pro con todo incluido" hecha por otros no es la oficial.</li>
        <li>Luego descarta el blog: no sabes si su archivo fue modificado.</li>
        <li>Elige gimp.org, el sitio oficial del proyecto.</li>
        <li>Si el sitio publica una huella de comprobación, compara la de tu archivo con la publicada.</li>
        <li>Instálalo y mantenlo al día con las actualizaciones.</li>
        <li>Comprueba: descargaste del sitio oficial y verificaste el archivo.</li>
      </ol>
      <p>Resultado: <span class="resultado">el sitio oficial gimp.org, y verificar el archivo</span>. Antes de hacer clic, fíjate en la dirección que aparece en la barra del navegador: debe ser la del proyecto.</p>`,
    vidaReal: `
      <p>Instalar con cuidado te permite disfrutar el software libre sin sustos:</p>
      <ul>
        <li>Evitas copias modificadas con programas dañinos.</li>
        <li>Sabes comprobar que un archivo descargado está completo y es auténtico.</li>
        <li>Respaldas tus archivos antes de un cambio grande, como instalar un sistema nuevo.</li>
        <li>Mantienes tus programas al día y sabes dónde pedir ayuda.</li><li>Puedes enseñar a tu familia a reconocer una descarga sospechosa.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Descargaste 5 programas: 4 del sitio oficial y 1 de un blog desconocido. ¿Cuántos conviene volver a descargar del sitio oficial?</p>', respuesta: 1,
        pista: '<p>Cuenta los que no vienen del sitio oficial.</p>',
        solucion: '<p><strong>1</strong>: el del blog.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu memoria de respaldo tiene 64 GB y tus archivos ocupan 38 GB. ¿Cuántos GB te sobran?</p>', respuesta: 64 - 38,
        pista: '<p>Resta.</p>',
        solucion: '<p>64 − 38 = <strong>26 GB</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿De dónde conviene descargar un programa libre?</p>',
        opciones: ['Del primer anuncio que aparezca', 'Del sitio oficial del proyecto o de la tienda de tu distribución', 'De cualquier blog'], correcta: 1,
        pista: '<p>Alguien puede subir copias modificadas.</p>',
        solucion: '<p><strong>Del sitio oficial o la tienda de la distribución.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Según la guía de Linux Mint, ¿qué confirma la verificación de autenticidad?</p>',
        opciones: ['Que el archivo lo firmó el proyecto y no es una copia modificada', 'Que el archivo es pequeño', 'Que tienes internet'], correcta: 0,
        pista: '<p>Es distinta de la de integridad.</p>',
        solucion: '<p><strong>Que lo firmó el proyecto</strong> y nadie lo modificó.</p>' },
      { tipo: 'opciones', enunciado: '<p>Vas a instalar Linux en tu disco. ¿Qué haces primero?</p>',
        opciones: ['Nada', 'Borrar tus fotos', 'Un respaldo de tus archivos'], correcta: 2,
        pista: '<p>Una opción mal elegida puede borrar el disco.</p>',
        solucion: '<p><strong>Un respaldo.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la verificación que confirma que un archivo se descargó completo y es una copia exacta?</p>',
        respuestas: ['integridad', 'verificacion de integridad', 'la integridad', 'comprobacion de integridad'],
        pista: '<p>Empieza con "i".</p>',
        solucion: '<p>La verificación de <strong>integridad</strong>.</p>' },
    ],
    fuentes: [MINTVERIF, MINT, SITIO('KeePassXC', 'https://keepassxc.org/'), SITIO('GIMP', 'https://www.gimp.org/')],
  });
})();
