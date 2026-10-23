// Ofimática · Unidad 5: Trabajo en la nube.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// La unidad se escribe en un solo fragmento: las tres lecciones, del 1 al 3.
// No hay programa de referencia: son servicios web, así que se enseña el concepto y el gesto común.
// Sin nombres de servicios en el texto; las fuentes sí llevan el nombre de su proveedor, porque son la cita.
// La unidad no tiene cifras con país: las cifras de los ejemplos son de ejemplo y se dicen.
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

  // ------------------------------------------------------------------
  // Dos equipos y un servidor en medio, con el borrado que llega a los tres, y una copia aparte.
  const SINCRONIA = diagrama([0, 14], [0, 7.3], [
    ...caja(7, 6.35, 3.4, 1.0, 'servidor'),
    ...caja(2.5, 3.95, 3.0, 1.0, 'equipo A'),
    ...caja(11.5, 3.95, 3.0, 1.0, 'equipo B'),
    ...flecha([2.5, 4.45], [5.2, 6.05], 0, 0.7),
    ...flecha([11.5, 4.45], [8.8, 6.05], 0, 0.7),
    txt(7, 5.05, 'la misma versión'),
    txt(2.5, 2.95, 'borras aquí'),
    ...flecha([2.5, 3.2], [2.5, 3.45], 0, 0.6),
    txt(7, 2.15, 'el borrado llega a los tres'),
    { tipo: 'linea', desde: [5.2, 1.55], hasta: [8.8, 1.55], punteada: true },
    { tipo: 'linea', desde: [5.2, 0.75], hasta: [8.8, 0.75], punteada: true },
    { tipo: 'linea', desde: [5.2, 0.75], hasta: [5.2, 1.55], punteada: true },
    { tipo: 'linea', desde: [8.8, 0.75], hasta: [8.8, 1.55], punteada: true },
    txt(7, 1.15, 'copia aparte'),
    txt(7, 0.3, 'no se sincroniza: sobrevive'),
  ], 'Diagrama con tres recuadros unidos por flechas. Arriba, en el centro, un recuadro que dice servidor; abajo a la izquierda, uno que dice equipo A, y abajo a la derecha, uno que dice equipo B. Las flechas suben de los dos equipos al servidor, y en el centro se lee la misma versión. Bajo el equipo A, una flecha corta señala el recuadro y el rótulo dice borras aquí, y una línea de texto avisa de que el borrado llega a los tres. Más abajo, separado, hay un recuadro punteado que dice copia aparte, con el rótulo no se sincroniza: sobrevive debajo.');

  // ------------------------------------------------------------------
  L('Almacenamiento en la nube', {
    objetivo: 'Reconocer qué es la nube, usar la sincronización sin confundirla con una copia de seguridad y proteger la cuenta que abre tus archivos.',
    vidaReal: `
      <p>Guardas una foto en el teléfono y, al llegar a casa, la ves en la computadora. Ese es un gesto que mucha gente hace varias veces al día, y detrás hay una carpeta que viaja sola entre los equipos. También es lo que permite que un trabajo en grupo siga en pie cuando un equipo se rompe. Aquí aprenderás qué hay detrás de esa comodidad y cómo evitar perder lo que guardas.</p>`,
    explicacion: `
      <p>Piensa en un archivo que usas en tres sitios: lo abres en la computadora del trabajo, lo miras en el teléfono y lo terminas en la de tu casa. Siempre tiene los últimos cambios y nunca lo copiaste a mano. Entonces, ¿dónde está el archivo de verdad?</p>
      <p>Está en la <strong>nube</strong> (<span lang="en">cloud</span>), el conjunto de servidores de otra empresa donde se guardan tus archivos y a los que llegas por internet. La palabra suena a algo que flota, y conviene bajarla a tierra: son computadoras encendidas en un edificio ajeno, atendidas por quien ofrece el servicio (NIST, EE. UU., 2011). La nube es el acceso a un grupo de recursos que alguien más administra.</p>
      <p>Eso da dos ventajas. El archivo se ve desde cualquier equipo con conexión y con tu cuenta, y si tu equipo se rompe, sigue en el servidor. También da una responsabilidad: la puerta es tu cuenta, y quien tenga tu contraseña tiene tus archivos.</p>
      <h3>La misma versión en todas partes</h3>
      <p>Para que la carpeta se comporte igual en los tres equipos existe la <strong>sincronización</strong> (<span lang="en">sync</span>), el trabajo de mantener la misma versión de un archivo en todos tus equipos. Funciona como un mensajero atento: cuando guardas un cambio, lo sube al servidor y lo baja a los demás. Una frase escrita en el teléfono aparece en la computadora.</p>
      <h3>La trampa: el borrado también se sincroniza</h3>
      <p>El mensajero no distingue entre un cambio bueno y uno malo: copia lo que encuentra. Si borras un archivo en un equipo, el servidor lo borra también y los demás equipos hacen lo mismo. Si un programa lo sobrescribe sin querer, la versión sobrescrita llega a todas partes. Y si estaba compartido, al borrarlo desaparece para todas las personas con acceso.</p>
      ${SINCRONIA}
      <p>Por eso hay que separar dos cosas parecidas. Una <strong>copia de seguridad</strong> (<span lang="en">backup</span>) es una copia aparte, hecha para recuperar los datos si se pierden, y sobrevive aunque borres el original. Su rasgo no es el lugar, sino que no se sincroniza: si el original desaparece, la copia no se entera.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Pregunta</th><th>Sincronizar</th><th>Copia de seguridad</th></tr></thead>
        <tbody>
          <tr><th scope="row">Qué hace</th><td>La misma versión en todos los equipos</td><td>Una copia aparte del original</td></tr>
          <tr><th scope="row">Qué pasa si borras</th><td>El borrado llega a todas partes</td><td>La copia sigue donde estaba</td></tr>
          <tr><th scope="row">Dónde vive</th><td>En el servidor y en tus equipos</td><td>Fuera de la carpeta que se sincroniza</td></tr>
          <tr><th scope="row">Para qué sirve</th><td>Trabajar en varios equipos</td><td>Recuperar lo que se perdió</td></tr>
        </tbody>
      </table></div>
      <p>El respaldo del equipo entero es otra cosa, y también conviene: sirve por si el equipo se cambia, se pierde o se avería.</p>
      <h3>La puerta: tu cuenta</h3>
      <p>Como la nube es un disco ajeno, la cuenta hace de puerta. La cuidan una contraseña larga y distinta de las demás, porque una repetida abre varias puertas cuando una se filtra, y la verificación en dos pasos, que pide un segundo dato y protege mucho más la cuenta. Las dos se explican en «Seguridad digital: contraseñas y fraudes en línea».</p>
      <p>Una tercera costumbre es sobre lo que subes: un documento con datos de otras personas no va a una carpeta compartida por enlace.</p>
      <h3>Compartir y trabajar sin conexión</h3>
      <p>Al compartir, el servicio deja enviar un enlace o dar acceso a personas concretas, y en los dos casos se decide si la otra persona solo puede ver o también editar. Conviene empezar por las personas y por el permiso más bajo.</p>
      <p>En un viaje o un aula sin internet, algunos archivos se pueden marcar para descargarlos y usarlos sin conexión, y el cambio se sube al volver. Es una comodidad, no una copia de seguridad: el archivo sigue atado a la carpeta que se sincroniza. Los archivos y las carpetas se vieron en «Archivos y carpetas».</p>
      <p class="nota"><strong>Trampa común:</strong> llamar copia de seguridad a la carpeta que se sincroniza porque «está en internet». Esa carpeta es el original repetido, y un borrado la vacía en todos a la vez.</p>`,
    ejemplo: `
      <p>Ordena la cuenta de una persona que usa dos equipos y tiene un disco externo; los plazos son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Decide qué va a la nube: los apuntes y las fotos sí, y el documento con datos de otras personas no va a una carpeta compartida por enlace.</li>
        <li>Crea una carpeta con un nombre claro y guarda dentro un archivo de prueba.</li>
        <li>Comprueba que el archivo aparece en el segundo equipo: la sincronización copió el cambio.</li>
        <li>Borra el archivo de prueba en el primer equipo y mira el segundo: desaparece también, y del servidor.</li>
        <li>Recupera el archivo desde la copia que ya tenías en el disco externo, que no está dentro de la carpeta sincronizada y por eso no recibió el borrado.</li>
        <li>Deja una copia aparte cada domingo en un disco que no se sincroniza.</li>
      </ol>
      <p>Resultado: <span class="resultado">el archivo volvió desde la copia aparte, no desde la sincronización</span>.</p>
      <p class="nota"><strong>Error común:</strong> dar por hecho que la copia en el servidor evita el borrado. Si borraste, se borró en todas partes; lo que te salva es la copia que no se sincroniza.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Borras un archivo en uno de tus equipos y la carpeta está sincronizada en tres. ¿Qué pasa con el archivo?</p>',
        opciones: ['Se queda en el servidor y desaparece solo del equipo donde lo borraste', 'Desaparece de los tres sitios, porque la sincronización copia también el borrado', 'Vuelve solo a los pocos minutos, porque el servidor lo restaura', 'Se guarda en una copia de seguridad automática sin que hagas nada'], correcta: 1,
        pista: '<p>El mensajero de la sincronización copia lo que encuentra, sea un cambio bueno o uno malo.</p>',
        solucion: '<p>El borrado se sincroniza como cualquier otro cambio: llega al servidor y a los demás equipos. Si el archivo estaba compartido, desaparece también para quienes tenían acceso.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué diferencia hay entre sincronizar y hacer una copia de seguridad?</p>',
        opciones: ['Son lo mismo, con dos nombres distintos según el programa', 'La copia de seguridad ocupa más espacio y por eso es más segura', 'La sincronización mantiene la misma versión; la copia es aparte y sobrevive al borrado', 'La sincronización es para las fotos y la copia para los documentos'], correcta: 2,
        pista: '<p>Piensa qué le pasa a cada una cuando borras el original.</p>',
        solucion: '<p>La sincronización reparte la misma versión por todos los equipos, y con ella viaja el borrado. La copia de seguridad es una copia aparte, que no se sincroniza y sirve para recuperar lo perdido.</p>' },
      { tipo: 'opciones', enunciado: '<p>Compartes una carpeta con un enlace abierto. ¿Quién puede entrar?</p>',
        opciones: ['Solo las personas a las que les mandaste el enlace una por una', 'Cualquiera que tenga la dirección, aunque no sea de tu lista de contactos', 'Solo quien tenga tu contraseña de la cuenta', 'Nadie, porque el enlace necesita una segunda confirmación'], correcta: 1,
        pista: '<p>El enlace es una llave: no pregunta el nombre de quien la usa.</p>',
        solucion: '<p>El enlace abierto deja entrar a cualquiera que tenga la dirección, y además se puede reenviar sin que te enteres. Compartir con personas concretas deja el acceso en una lista que tú controlas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el trabajo de mantener la misma versión de un archivo en todos tus equipos?</p>',
        respuestas: ['sincronizacion', 'la sincronizacion', 'sync', 'sincronización', 'la sincronización'],
        pista: '<p>Es lo que hace que una frase escrita en el teléfono aparezca en la computadora.</p>',
        solucion: '<p>Se llama sincronización (sync en inglés). Mantiene la misma versión en todos los equipos donde está activa, y por eso también reparte los borrados.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para guardar un archivo en la nube y comprobar que está a salvo.</p>',
        respuesta: ['Crear una carpeta con un nombre claro y guardar dentro el archivo', 'Comprobar que el archivo aparece en el segundo equipo', 'Borrar un archivo de prueba en un equipo y ver que desaparece del otro', 'Recuperar el archivo de prueba desde la copia aparte', 'Dejar una copia aparte con una frecuencia fija'],
        pista: '<p>Primero se guarda, después se comprueba que viaja y al final se prueba qué pasa con un borrado.</p>',
        solucion: '<p>El orden es crear la carpeta y guardar, comprobar que el archivo llega al otro equipo, borrar para ver que el borrado viaja, recuperar desde la copia aparte y dejar esa copia con una frecuencia fija. La prueba del borrado es la que muestra que sincronizar no es respaldar.</p>' },
      { tipo: 'numero', enunciado: '<p>Guardas el mismo archivo en dos equipos sincronizados y, aparte, en un disco externo que no se sincroniza. Son tres sitios con el archivo. Si borras el archivo en uno de los equipos, ¿cuántos de esos tres sitios lo conservan?</p>',
        respuesta: 3 - 2,
        pista: '<p>El borrado viaja a los equipos sincronizados, y el disco externo no está en esa carpeta.</p>',
        solucion: '<p>De los tres sitios, los dos equipos pierden el archivo por la sincronización y el disco externo lo conserva: queda <strong>1</strong>. Por eso la copia aparte es la única que responde cuando el borrado se propaga.</p>' },
    ],
    fuentes: [
      { nombre: 'NIST (EE. UU.), CSRC Glossary: cloud computing (en inglés)', url: 'https://csrc.nist.gov/glossary/term/cloud_computing' },
      { nombre: 'NCSC (Reino Unido), Top tips for staying secure online: Turn on 2-step verification (2SV) (en inglés)', url: 'https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online/activate-2-step-verification-on-your-email' },
      { nombre: 'NCSC (Reino Unido), Top tips for staying secure online: Use a strong and separate password for your email (en inglés)', url: 'https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online/use-a-strong-and-separate-password-for-email' },
      { nombre: 'Apple (EE. UU.), Soporte técnico: iCloud', url: 'https://support.apple.com/es-es/icloud' },
      { nombre: 'Wikipedia en español, Almacenamiento en nube (apoyo)', url: 'https://es.wikipedia.org/wiki/Almacenamiento_en_nube' },
      { nombre: 'Wikipedia en español, Copia de seguridad (apoyo)', url: 'https://es.wikipedia.org/wiki/Copia_de_seguridad' },
      { nombre: 'Apple (EE. UU.), Soporte técnico: Trabajar con carpetas y archivos almacenados en iCloud Drive', url: 'https://support.apple.com/es-us/guide/mac-help/mchl1a02d711/mac' },
      { nombre: 'Apple (EE. UU.), Soporte técnico: Cómo iCloud mantiene la información actualizada en todos tus dispositivos', url: 'https://support.apple.com/es-us/guide/icloud/mmd44763ead3/icloud' },
      { nombre: 'Microsoft (EE. UU.), Soporte técnico: Eliminar archivos o carpetas en OneDrive', url: 'https://support.microsoft.com/es-es/onedrive/delete-files-or-folders-in-onedrive' },
      { nombre: 'Microsoft (EE. UU.), Soporte técnico: Compartir archivos y carpetas en OneDrive', url: 'https://support.microsoft.com/es-es/onedrive/share-files-and-folders-in-microsoft-onedrive' },
    ],
  });

  // ------------------------------------------------------------------
  // Dos personas escriben en el mismo documento y el historial guarda las versiones.
  const COLABORA = diagrama([0, 14], [0, 7.2], [
    txt(11.8, 6.4, 'historial'),
    ...caja(2.0, 5.3, 2.6, 0.8, 'persona A'),
    ...caja(2.0, 3.1, 2.6, 0.8, 'persona B'),
    ...caja(6.6, 4.2, 3.8, 2.4, 'el documento'),
    ...flecha([3.3, 5.3], [4.65, 4.7], 0, 0.6),
    ...flecha([3.3, 3.1], [4.65, 3.7], 0, 0.6),
    ...caja(11.8, 5.4, 2.8, 0.8, 'versión 3'),
    ...caja(11.8, 4.2, 2.8, 0.8, 'versión 2', true),
    ...caja(11.8, 3.0, 2.8, 0.8, 'versión 1'),
    ...flecha([8.6, 4.9], [10.3, 5.4], 0, 0.6),
    txt(7, 2.05, 'las dos escriben en el mismo archivo a la vez'),
    txt(7, 1.25, 'la versión 2 se puede restaurar'),
    txt(7, 0.5, 'y vuelve a ser la versión actual'),
  ], 'Diagrama con dos recuadros a la izquierda que dicen persona A y persona B, y una flecha de cada uno hacia un recuadro central que dice el documento. A la derecha hay una columna rotulada historial, con tres recuadros apilados: versión 3, versión 2 y versión 1. El de versión 2 está teñido con otro color. Una flecha va del documento a la versión 3. Debajo, tres rótulos: las dos escriben en el mismo archivo a la vez, la versión 2 se puede restaurar, y vuelve a ser la versión actual.');

  // ------------------------------------------------------------------
  L('Documentos compartidos y colaboración', {
    objetivo: 'Decidir quién entra a un documento y qué puede hacer, trabajar en él con otras personas a la vez y volver a una versión anterior cuando hace falta.',
    vidaReal: `
      <p>Un trabajo en grupo tiene tres autores, dos versiones y ninguna clara. Alguien manda su parte por correo, otra persona escribe encima y al final nadie sabe cuál es el archivo bueno. Con un documento compartido, las tres personas escriben en el mismo sitio y queda una sola versión. Aquí aprenderás a decidir quién entra, qué puede hacer y cómo volver atrás si algo sale mal.</p>`,
    explicacion: `
      <p>Imagina un informe que escriben tres personas. Cada una tiene su copia, cada una le hace cambios y al final hay tres archivos con el mismo nombre y ningún acuerdo sobre cuál vale. La pregunta no es cómo escribir mejor, sino cómo trabajar sobre un solo documento sin pisarse.</p>
      <p>Antes de escribir la primera frase hay dos decisiones, y las dos se toman con el mismo gesto: compartir. La primera es quién entra; la segunda, qué puede hacer cada persona dentro. Eso último se llama <strong>permiso</strong> (<span lang="en">permission</span>): lo que cada una puede hacer con el documento.</p>
      <h3>Cuatro niveles de permiso</h3>
      <p>Los permisos se reparten en una escala corta. En el nivel más bajo, la persona solo puede ver el documento y no toca nada. Un paso más arriba puede comentar: deja notas al margen sin cambiar el texto. Después viene editar, que permite escribir y borrar dentro del archivo. Y arriba del todo está quien administra el documento, que además decide quién más entra y con qué nivel.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Nivel</th><th>Qué puede hacer</th><th>Cuándo darlo</th></tr></thead>
        <tbody>
          <tr><th scope="row">Ver</th><td>Leer el documento, sin tocarlo</td><td>A quien solo necesita consultarlo</td></tr>
          <tr><th scope="row">Comentar</th><td>Dejar notas al margen</td><td>A quien va a opinar sobre lo escrito</td></tr>
          <tr><th scope="row">Editar</th><td>Escribir, borrar y mover el contenido</td><td>A quien tiene una parte a su cargo</td></tr>
          <tr><th scope="row">Administrar</th><td>Editar y decidir quién más entra</td><td>A una sola persona del grupo</td></tr>
        </tbody>
      </table></div>
      <p>Con los permisos, la regla es dar el mínimo que la persona necesita: quien solo va a leer no necesita editar. El servicio ofrece dos caminos para compartir: dar acceso a personas concretas o enviar un enlace, y el enlace es la puerta más ancha, porque cualquiera que tenga la dirección puede entrar, incluso alguien a quien no se lo mandaste.</p>
      <h3>Escribir a la vez, sin copias</h3>
      <p>Con los permisos repartidos aparece la segunda herramienta: la <strong>edición simultánea</strong> (<span lang="en">real-time editing</span>), que es escribir varias personas en el mismo documento a la vez y ver los cambios al momento. Ya no se manda una copia por correo con el nombre «versión final» y otra con «versión final de verdad»: cada una escribe en el mismo archivo y ve aparecer lo que escriben las demás. Funciona aunque las personas estén en ciudades distintas.</p>
      <p>Cuando dos personas cambian exactamente lo mismo, el programa no puede decidir por su cuenta y abre un aviso de conflicto, para elegir qué cambios se conservan. Es raro, y se evita con una costumbre sencilla: cada persona se ocupa de su parte y avisa cuando va a mover algo grande.</p>
      ${COLABORA}
      <h3>Discutir sin tocar el texto</h3>
      <p>Para ponerse de acuerdo sin pisarse hay dos herramientas que no cambian el documento. Los comentarios son notas al margen sobre una frase o un párrafo, y sirven para discutir sin tocar el texto. Las sugerencias proponen el cambio y lo dejan a la vista, para que otra persona lo acepte o lo rechace, en lugar de escribir encima. Las dos se practican en «Ortografía, comentarios y control de cambios»; las copias por correo se tratan en «Correo electrónico».</p>
      <h3>Volver atrás</h3>
      <p>La red de seguridad es el <strong>historial de versiones</strong> (<span lang="en">version history</span>), la lista de cambios guardados que permite volver a una versión anterior. Cada vez que alguien guarda, el servicio anota el estado del documento; si aparece un párrafo borrado que nadie recuerda, se abre el historial, se elige la versión de antes y se restaura, y esa pasa a ser la actual.</p>
      <p>Dos costumbres evitan sustos. La primera es revisar de vez en cuando la lista de personas con acceso y quitar a quien ya no participa, porque el acceso no caduca solo. La segunda es no dejar en un enlace público nada con datos de otras personas.</p>
      <p class="nota"><strong>Trampa común:</strong> dar permiso de editar a todo el grupo porque es más rápido. Cuando alguien borra una parte por error, el historial ayuda, pero el rato perdido no vuelve.</p>`,
    ejemplo: `
      <p>Un informe de ciencias con tres autores; los permisos y el momento del borrado son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Crea el documento y ponle un nombre que diga de qué es, sin «final» ni fechas dentro del nombre.</li>
        <li>Invita a las otras dos personas con permiso para comentar: pueden leer y opinar, todavía no escribir.</li>
        <li>Cuando cada una vaya a redactar su parte, súbela a editar; al terminar, devuélvela a comentar.</li>
        <li>Deja un comentario en la frase que no te convence, en lugar de cambiarla por tu cuenta.</li>
        <li>Cuando la duda se resuelva, responde el comentario y ciérralo, para que no quede suelto.</li>
        <li>Alguien borra un párrafo: abre el historial, elige la versión de la mañana y restaura.</li>
        <li>Revisa la lista de accesos y quita a quien ya entregó su parte.</li>
      </ol>
      <p>Resultado: <span class="resultado">un solo documento, tres personas y una versión que se puede recuperar</span>.</p>
      <p class="nota"><strong>Error común:</strong> bajar el documento y mandarlo por correo para que cada uno escriba en su copia. Ahí vuelven las tres versiones y el historial deja de servir.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Solo necesitas que una persona lea el informe y te diga si se entiende. ¿Qué permiso le das?</p>',
        opciones: ['Editar, para que corrija lo que no entienda', 'Administrar, para que decida quién más lo lee', 'Ver, porque no tiene que escribir nada dentro', 'Comentar, porque así puede cambiar el texto con notas'], correcta: 2,
        pista: '<p>El permiso más bajo que alcanza para lo que la persona va a hacer.</p>',
        solucion: '<p>Con el permiso de ver, la persona lee el documento y no puede tocarlo. Si además necesitas que opine, entonces sí sube a comentar, que deja notas al margen sin cambiar el texto.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve el historial de versiones?</p>',
        opciones: ['Para ver cuántas personas están conectadas en ese momento', 'Para volver a dejar el documento como estaba en una versión anterior', 'Para enviar el documento por correo a quien no tiene acceso', 'Para bloquear el documento mientras alguien escribe'], correcta: 1,
        pista: '<p>Piensa en el párrafo que alguien borró sin querer.</p>',
        solucion: '<p>El historial guarda el estado del documento en cada momento y permite elegir una versión anterior y restaurarla, que pasa a ser la actual. Es la red de seguridad para los borrados por error.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué es riesgoso compartir un documento con un enlace abierto?</p>',
        opciones: ['Porque el documento se vuelve más lento al abrirlo muchas personas', 'Porque el enlace caduca a las pocas horas y hay que crear otro', 'Porque cualquiera que tenga la dirección entra, y el enlace se puede reenviar', 'Porque quien entra con el enlace puede cambiar los permisos de los demás'], correcta: 2,
        pista: '<p>El enlace es una llave que no pregunta el nombre de quien la usa.</p>',
        solucion: '<p>Con un enlace abierto, el acceso depende de tener la dirección, no de estar en una lista. Si ese enlace se reenvía, entra gente que no conoces, y por eso conviene dar acceso a personas concretas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama lo que cada persona puede hacer con un documento: verlo, comentarlo o editarlo?</p>',
        respuestas: ['permiso', 'el permiso', 'permission', 'los permisos'],
        pista: '<p>Es lo que se elige en la misma pantalla en la que se invita a alguien.</p>',
        solucion: '<p>Se llama permiso (permission en inglés). Se reparte en niveles y la regla es dar el mínimo que la persona necesita para su parte.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para compartir un informe con dos personas y quedarte tranquilo con el resultado.</p>',
        respuesta: ['Crear el documento y darle un nombre claro', 'Invitar a las dos personas con permiso para comentar', 'Dar permiso de editar a quien tiene una parte a su cargo', 'Dejar un comentario en la frase dudosa y responderlo cuando se resuelva', 'Abrir el historial y restaurar la versión de antes del borrado', 'Revisar la lista de accesos y quitar a quien ya no participa'],
        pista: '<p>Primero el documento, después las personas, después el trabajo y al final la limpieza de accesos.</p>',
        solucion: '<p>El orden es crear el documento, invitar con el permiso mínimo, subir a editar a quien escribe, resolver el comentario, restaurar desde el historial y quitar a quien ya no participa. La revisión de accesos es el paso que casi siempre se olvida.</p>' },
      { tipo: 'numero', enunciado: '<p>La tabla de la lección reparte los permisos en cuatro niveles: ver, comentar, editar y administrar. ¿Cuántos de esos cuatro permiten cambiar el texto del documento?</p>',
        respuesta: 4 - 2,
        pista: '<p>Ver y comentar no cambian el texto; mira los dos que quedan.</p>',
        solucion: '<p>De los cuatro niveles, solo <strong>2</strong> permiten cambiar el texto: editar y administrar, porque quien administra también puede editar. Ver y comentar dejan el contenido intacto.</p>' },
    ],
    fuentes: [
      { nombre: 'Wikipedia en español, Software colaborativo (apoyo)', url: 'https://es.wikipedia.org/wiki/Software_colaborativo' },
      { nombre: 'Wikipedia en español, Control de versiones (apoyo)', url: 'https://es.wikipedia.org/wiki/Control_de_versiones' },
      { nombre: 'LibreOffice (proyecto), Ayuda: Collaboration (en inglés)', url: 'https://raw.githubusercontent.com/LibreOffice/help/master/source/text/shared/guide/collab.xhp' },
      { nombre: 'Microsoft (EE. UU.), Soporte técnico: Restaurar una versión anterior de un archivo almacenado en OneDrive', url: 'https://support.microsoft.com/es-es/onedrive/restore-a-previous-version-of-a-file-stored-in-onedrive' },
      { nombre: 'Google (EE. UU.), Centro de Aprendizaje de Google Workspace: Cómo funciona el acceso a unidades compartidas', url: 'https://support.google.com/a/users/answer/12380484?hl=es-419' },
      { nombre: 'Google (EE. UU.), Ayuda de Editores de Documentos de Google: Cómo sugerir cambios en Documentos de Google', url: 'https://support.google.com/docs/answer/6033474?hl=es-419&co=GENIE.Platform%3DDesktop' },
      { nombre: 'Google (EE. UU.), Ayuda de Editores de Documentos de Google: Cómo colaborar y comentar con un lector de pantalla', url: 'https://support.google.com/docs/answer/6239410?hl=es-419' },
      { nombre: 'Microsoft (EE. UU.), Soporte técnico: Administrar el uso compartido y los permisos en OneDrive y SharePoint', url: 'https://support.microsoft.com/es-es/onedrive/sharepoint/manage-sharing-and-permissions-in-onedrive-and-sharepoint' },
    ],
  });

  // ------------------------------------------------------------------
  // La ventana de una llamada con sus cinco controles rotulados.
  const VENTANA = diagrama([0, 15], [0, 7.8], [
    { tipo: 'linea', desde: [0.6, 6.7], hasta: [14.4, 6.7] },
    { tipo: 'linea', desde: [0.6, 0.7], hasta: [14.4, 0.7] },
    { tipo: 'linea', desde: [0.6, 0.7], hasta: [0.6, 6.7] },
    { tipo: 'linea', desde: [14.4, 0.7], hasta: [14.4, 6.7] },
    txt(7.5, 7.15, 'la ventana de la llamada'),
    { tipo: 'linea', desde: [1.0, 2.85], hasta: [14.0, 2.85] },
    { tipo: 'linea', desde: [1.0, 2.85], hasta: [1.0, 6.3] },
    { tipo: 'linea', desde: [14.0, 6.3], hasta: [14.0, 2.85] },
    { tipo: 'linea', desde: [1.0, 6.3], hasta: [14.0, 6.3] },
    txt(7.5, 4.6, 'la otra persona'),
    { tipo: 'circulo', x: 2.05, y: 2.15, r: 0.3 },
    { tipo: 'circulo', x: 4.8, y: 2.15, r: 0.3 },
    { tipo: 'circulo', x: 7.55, y: 2.15, r: 0.3 },
    { tipo: 'circulo', x: 10.3, y: 2.15, r: 0.3 },
    { tipo: 'circulo', x: 13.05, y: 2.15, r: 0.3 },
    txt(2.05, 1.45, 'micrófono'),
    txt(4.8, 1.45, 'cámara'),
    txt(7.55, 1.45, 'compartir'),
    txt(10.3, 1.45, 'chat'),
    txt(13.05, 1.45, 'salir'),
    txt(7.5, 0.25, 'micro abierto para hablar, cerrado para escuchar'),
  ], 'Diagrama de la ventana de una llamada, dibujada como un rectángulo grande. Dentro, otro rectángulo ocupa la parte de arriba y dice la otra persona. En la franja de abajo hay cinco controles redondos, y debajo de cada uno su nombre: micrófono, cámara, compartir, chat y salir. Sobre la ventana está el rótulo la ventana de la llamada, y al pie la frase micro abierto para hablar, cerrado para escuchar.');

  // ------------------------------------------------------------------
  L('Videollamadas', {
    objetivo: 'Preparar una videollamada, manejar el micrófono, la pantalla compartida y el ancho de banda, y cuidar quién entra y que todos puedan seguir la reunión.',
    vidaReal: `
      <p>Una entrevista, una reunión con el equipo o una clase a distancia empiezan con la misma escena: el micrófono no suena, la cámara enfoca el techo y alguien pregunta si se oye. Casi siempre el problema se evita con dos minutos de preparación. Aquí aprenderás a dejar lista una llamada, a compartir lo justo y a entrar sin molestar a los demás.</p>`,
    explicacion: `
      <p>La reunión empieza a la hora y ya hay tres problemas: el micrófono no suena, la cámara enfoca el techo y alguien escucha su propia voz con retraso. Ninguno es grave: los tres se evitan con dos minutos de preparación.</p>
      <p>Una <strong>videollamada</strong> (<span lang="en">video call</span>) es una conversación con imagen y sonido por internet, en la que dos o más personas se ven y se oyen al mismo tiempo aunque estén lejos. Hacen falta una cámara, un micrófono y unos auriculares o altavoces, y una conexión que lleve el sonido y la imagen.</p>
      <h3>Los dos minutos de antes</h3>
      <p>La preparación cabe en cuatro pasos. Primero, probar el micrófono y la cámara en la propia aplicación, que suele traer una prueba. Segundo, mirar la luz: conviene tenerla de frente, porque una ventana a la espalda deja la cara a oscuras. Tercero, elegir un fondo simple y silenciar las notificaciones. Y cuarto, entrar con el micrófono cerrado y abrirlo al hablar.</p>
      <h3>El micrófono y el turno</h3>
      <p>Durante la llamada, la regla del micrófono es sencilla: se abre cuando hablas y se cierra cuando no. Cerrado, los ruidos de tu casa no llegan a los demás. Para hablar por turnos, se pide la palabra en voz alta o se escribe en el chat, que es el sitio de los enlaces.</p>
      ${VENTANA}
      <h3>El ancho de banda manda</h3>
      <p>La imagen y el sonido viajan por la misma conexión y no ocupan lo mismo. Esa capacidad se llama <strong>ancho de banda</strong> (<span lang="en">bandwidth</span>) y decide cuánto cabe a la vez. El video ocupa mucho más que el audio: una imagen en alta definición puede pedir 3,8 Mbps mientras el sonido va con 60 a 80 kbps. Por eso, cuando la imagen se congela, lo más rápido es apagar el video: la voz sigue pasando.</p>
      <h3>Compartir pantalla sin compartir de más</h3>
      <p>La herramienta más usada en el trabajo es <strong>compartir pantalla</strong> (<span lang="en">screen sharing</span>): mostrar tu pantalla, o una ventana, a las demás personas. Trae una ventaja y un riesgo. La ventaja es que todos ven lo mismo que tú sin mandar el archivo; el riesgo es que se vea lo que no querías. Lo resuelve compartir la ventana concreta y cerrar antes lo demás.</p>
      <h3>Grabar: avisar y pedir permiso</h3>
      <p>Una llamada se puede grabar. Al empezar, el servicio avisa a todas las personas; antes de grabar, dilo y pide permiso a todas: la grabación se queda con sus caras y sus voces.</p>
      <h3>La puerta de la reunión</h3>
      <p>El enlace de la reunión es una llave: quien lo tiene puede entrar. Por eso no se publica en abierto, se manda a cada persona y se activa la sala de espera, que deja que el organizador admita a cada una. Si entra alguien que no debería, se le expulsa y se cambia el enlace. Las contraseñas y la verificación en dos pasos se explican en «Seguridad digital: contraseñas y fraudes en línea»; una cara que parece real puede ser falsa, como se ve en «Deepfakes y contenido falso»; y si alguien que dice ser de tu banco pide datos, la respuesta está en «Banca en línea y pagos digitales».</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Problema</th><th>Qué hacer</th></tr></thead>
        <tbody>
          <tr><th scope="row">No se oye</th><td>Abrir el micrófono y mirar si está silenciado en el equipo</td></tr>
          <tr><th scope="row">Se congela la imagen</th><td>Apagar el video</td></tr>
          <tr><th scope="row">Hay eco</th><td>Usar auriculares y bajar los altavoces</td></tr>
          <tr><th scope="row">Entra alguien desconocido</th><td>Expulsarlo y cambiar el enlace</td></tr>
        </tbody>
      </table></div>
      <h3>Subtítulos y transcripción</h3>
      <p>Dos ayudas la hacen accesible. Los subtítulos ofrecen por escrito lo que se dice y los sonidos que importan, como un golpe o una risa, y sirven a quien no oye bien y a quien sigue la reunión en otro idioma. La transcripción es esa misma versión escrita, completa y en un texto aparte. Las dos se activan en la aplicación.</p>
      <p class="nota"><strong>Trampa común:</strong> compartir el escritorio entero porque es el botón más grande. En dos segundos aparece todo lo que estaba abierto, y lo visto ya no se puede recoger.</p>`,
    ejemplo: `
      <p>Una reunión de cuatro personas para revisar un documento; la hora y el número de personas son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Envía el enlace a cada persona por separado, no a un grupo abierto donde cualquiera pueda reenviarlo.</li>
        <li>Activa la sala de espera, para que el organizador admita a cada una al entrar.</li>
        <li>Prueba el micrófono y la cámara antes de la hora, y mira la luz: de frente, no detrás.</li>
        <li>Entra con el micrófono cerrado y ábrelo solo cuando te toque hablar.</li>
        <li>Cierra las pestañas y las conversaciones que no tienen que ver, y comparte solo la ventana del documento.</li>
        <li>Activa los subtítulos para quien los necesite y deja el chat para los enlaces.</li>
        <li>Al terminar, deja de compartir, sal de la llamada y cierra la sala.</li>
      </ol>
      <p>Resultado: <span class="resultado">cuatro personas, un enlace y ninguna ventana de más</span>.</p>
      <p class="nota"><strong>Error común:</strong> compartir el escritorio entero para no elegir ventana. Entonces aparece lo que había detrás: una conversación, un correo o una foto.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>La imagen se congela y la voz de los demás se sigue oyendo. ¿Qué haces primero?</p>',
        opciones: ['Apagar el video, porque el sonido ocupa mucho menos ancho de banda', 'Cerrar la llamada y volver a entrar, para empezar de cero', 'Subir el volumen de los altavoces al máximo', 'Pedir a los demás que también cierren su cámara'], correcta: 0,
        pista: '<p>Compara lo que ocupa la imagen con lo que ocupa el sonido.</p>',
        solucion: '<p>El video ocupa mucho más ancho de banda que el audio: una imagen en alta definición puede pedir 3,8 Mbps y el sonido, entre 60 y 80 kbps. Al apagar el video, la conexión se concentra en la voz y la reunión sigue.</p>' },
      { tipo: 'opciones', enunciado: '<p>Compartes una ventana del documento. ¿Qué ven las demás personas?</p>',
        opciones: ['Todo tu escritorio, con las ventanas que estén abiertas detrás', 'Solo esa ventana y lo que aparece dentro de ella', 'La pantalla tal como estaba al empezar la llamada, sin cambios', 'Únicamente el archivo, sin el programa que lo abre'], correcta: 1,
        pista: '<p>La diferencia entre una ventana y el escritorio entero es justo lo que se ve.</p>',
        solucion: '<p>Al compartir una ventana se ve esa ventana y lo que aparece dentro, no las demás. Por eso se elige la ventana concreta: el escritorio entero muestra también lo que no querías enseñar.</p>' },
      { tipo: 'opciones', enunciado: '<p>Quieres grabar la reunión. ¿Qué haces antes de darle a grabar?</p>',
        opciones: ['Nada, porque el servicio avisa solo y con eso alcanza', 'Grabar en silencio y avisar al final de la reunión', 'Avisar en voz alta y pedir permiso a todas las personas de la llamada', 'Pedir permiso solo a quien va a hablar durante la grabación'], correcta: 2,
        pista: '<p>La grabación se queda con las caras y las voces de todos.</p>',
        solucion: '<p>Al empezar a grabar, el servicio avisa a todas las personas, y eso ayuda, pero no reemplaza el permiso. Conviene decirlo en voz alta y pedirlo a todas antes de empezar.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la capacidad de tu conexión, que decide cuánta imagen y cuánto sonido caben a la vez?</p>',
        respuestas: ['ancho de banda', 'el ancho de banda', 'bandwidth', 'ancho de banda de internet'],
        pista: '<p>Es lo que se agota cuando varias personas de la casa usan internet al mismo tiempo.</p>',
        solucion: '<p>Se llama ancho de banda (bandwidth en inglés). Como el video ocupa mucho más que el audio, apagar la cámara es el arreglo más rápido cuando la imagen se congela.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para entrar bien a una reunión y salir sin dejar nada abierto.</p>',
        respuesta: ['Enviar el enlace a cada persona', 'Activar la sala de espera', 'Probar el micrófono y la cámara antes de entrar', 'Entrar con el micrófono cerrado y abrirlo al hablar', 'Compartir solo la ventana del documento', 'Dejar de compartir y cerrar la sala al terminar'],
        pista: '<p>Primero el enlace y la puerta, después las pruebas, después la llamada y al final el cierre.</p>',
        solucion: '<p>El orden es mandar el enlace a cada persona, activar la sala de espera, probar el equipo, entrar con el micrófono cerrado, compartir solo la ventana y cerrar la sala al terminar. La sala de espera va antes de la llamada porque decide quién entra.</p>' },
      { tipo: 'numero', enunciado: '<p>El diagrama de la ventana de la llamada rotula sus controles: micrófono, cámara, compartir, chat y salir. ¿Cuántos controles muestra la franja de abajo?</p>',
        respuesta: 3 + 2,
        pista: '<p>Cuenta los círculos de la franja inferior y sus rótulos.</p>',
        solucion: '<p>Son <strong>5</strong> controles: micrófono, cámara, compartir, chat y salir. Cada uno tiene su rótulo debajo, en la franja de abajo de la ventana.</p>' },
    ],
    fuentes: [
      { nombre: 'NCSC (Reino Unido), Cloud security guidance: Using cloud services securely (en inglés)', url: 'https://www.ncsc.gov.uk/collection/cloud/using-cloud-services-securely' },
      { nombre: 'Wikipedia en español, Videoconferencia (apoyo)', url: 'https://es.wikipedia.org/wiki/Videoconferencia' },
      { nombre: 'W3C Web Accessibility Initiative, Making Audio and Video Media Accessible (en inglés)', url: 'https://www.w3.org/WAI/media/av/' },
      { nombre: 'Microsoft (EE. UU.), Soporte técnico: Manage audio settings in Microsoft Teams meetings (en inglés)', url: 'https://support.microsoft.com/en-us/teams/meetings/manage-audio-settings-in-microsoft-teams-meetings' },
      { nombre: 'Zoom (EE. UU.), Technical Library: Calculating bandwidth usage for Zoom Meetings and phone (en inglés)', url: 'https://library.zoom.com/technical-library/es/rincon-del-administrador/network-management/quality-of-service-and-network-best-practices-explainer/calculating-bandwidth-usage-for-zoom-meetings-and-phone' },
      { nombre: 'Microsoft (EE. UU.), Soporte técnico: Usar la sala de espera en reuniones de Microsoft Teams', url: 'https://support.microsoft.com/es-es/teams/meetings/using-the-lobby-in-microsoft-teams-meetings' },
      { nombre: 'Microsoft (EE. UU.), Soporte técnico: Iniciar, detener y buscar grabaciones de reuniones en Microsoft Teams', url: 'https://support.microsoft.com/es-es/teams/meetings/start-stop-and-find-meeting-recordings-in-microsoft-teams' },
    ],
  });

  // Unidad 5 completa: lecciones 1 a 3.
})();
