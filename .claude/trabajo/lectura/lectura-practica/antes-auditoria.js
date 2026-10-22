// Lectura · Unidad 4: Lectura práctica.
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

  const YOUR_EUROPE_SEGURIDAD = { nombre: 'Your Europe (Unión Europea): Seguridad de los productos', url: 'https://europa.eu/youreurope/citizens/consumers/shopping/product-safety/index_es.htm' };
  const REGLAMENTO_988 = { nombre: 'Reglamento (UE) 2023/988 sobre la seguridad general de los productos (DOUE, en el BOE)', url: 'https://www.boe.es/buscar/doc.php?id=DOUE-L-2023-80684' };
  const EMA_QRD = { nombre: 'European Medicines Agency (EMA): Product-information (QRD) templates (en inglés)', url: 'https://www.ema.europa.eu/en/human-regulatory-overview/marketing-authorisation/product-information-requirements/product-information-qrd-templates-human' };
  const WIKI_MANUAL_INSTRUCCIONES = { nombre: 'Wikipedia en español: Manual de instrucciones (apoyo)', url: 'https://es.wikipedia.org/wiki/Manual_de_instrucciones' };
  const WIKI_MANUAL_USUARIO = { nombre: 'Wikipedia en español: Manual de usuario (apoyo)', url: 'https://es.wikipedia.org/wiki/Manual_de_usuario' };
  const WIKI_PROSPECTO = { nombre: 'Wikipedia en español: Prospecto (apoyo)', url: 'https://es.wikipedia.org/wiki/Prospecto' };
  const YOUR_EUROPE_CONTRATO = { nombre: 'Your Europe (Unión Europea): Information you should get when buying, signing a contract (en inglés)', url: 'https://europa.eu/youreurope/citizens/consumers/shopping/contract-information/index_en.htm' };
  const CONSUMO_RESPONDE = { nombre: 'Consumo Responde (España, Junta de Andalucía): Cómo presentar una reclamación', url: 'https://www.consumoresponde.es/temas/como_presentar_una_reclamacion' };
  const INDECOPI = { nombre: 'Indecopi (Perú): Libro de Reclamaciones, una herramienta útil para la protección de tus derechos', url: 'https://www.gob.pe/institucion/indecopi/campa%C3%B1as/65149-libro-de-reclamaciones-una-herramienta-util-para-la-proteccion-de-tus-derechos' };
  const ARGENTINA_CONSUMIDOR = { nombre: 'Ministerio de Economía (Argentina): Defensa del consumidor', url: 'https://argentina.gob.ar/produccion/consumidor' };
  const WIKI_CONTRATO = { nombre: 'Wikipedia en español: Contrato (apoyo)', url: 'https://es.wikipedia.org/wiki/Contrato' };
  const WIKT_CLAUSULA = { nombre: 'Wikcionario en español: cláusula (apoyo)', url: 'https://es.wiktionary.org/wiki/cl%C3%A1usula' };

  // Anatomía de un manual: el recorrido que hace quien busca una cosa.
  const MANUAL = diagrama([0, 12], [0, 9], [
    caja(3.4, 7.3, 8.6, 8.7), txt(6, 8.3, 'Índice'), txt(6, 7.7, 'los temas y la página'),
    caja(0.4, 5.1, 5.6, 6.7), txt(3.0, 6.1, 'Apartado numerado'), txt(3.0, 5.5, 'solo ese trozo'),
    caja(0.4, 2.9, 5.6, 4.5), txt(3.0, 3.9, 'Pasos numerados'), txt(3.0, 3.3, 'los pasos en orden'),
    caja(7.0, 2.9, 11.6, 4.5), txt(9.3, 3.9, 'Advertencia'), txt(9.3, 3.3, 'avisa del peligro'),
    caja(5.4, 0.6, 11.6, 2.2), txt(8.5, 1.6, 'Referencia cruzada'), txt(8.5, 1.0, '«véase el apartado 2.3»'),
    ...flecha([6, 7.3], [3.0, 6.7]),
    ...flecha([3.0, 5.1], [3.0, 4.5], 0, 0.7),
    ...flecha([5.6, 3.7], [7.0, 3.7], 0, 0.8),
    ...flecha([9.3, 2.9], [9.3, 2.2], 0, 0.7),
  ], 'Diagrama del recorrido para buscar un dato en un manual. Arriba, una caja: «Índice: los temas y la página». Una flecha baja a la izquierda hacia «Apartado numerado: solo ese trozo». De esa caja baja otra flecha hacia «Pasos numerados: los pasos en orden». Una flecha sale a la derecha hacia «Advertencia: avisa del peligro», y de esa caja baja la última flecha hacia «Referencia cruzada: véase el apartado 2.3».');

  // ------------------------------------------------------------------
  L('Leer instructivos y manuales', {
    objetivo: 'Encontrar en un manual o un prospecto la información que buscas, siguiendo el índice, los apartados, las advertencias y las referencias cruzadas.',
    explicacion: `
      <p>Compras un aparato nuevo y en la caja hay un manual de cuarenta páginas. Nadie se lo lee entero, y casi nadie lo abre antes de usarlo. El error caro no es no leerlo: es no leerlo cuando toca.</p>
      <p>El <strong>manual</strong> (<span lang="en">manual</span>) es el libro de instrucciones que trae un producto: Wikipedia en español lo define como el libro que da la información, las reglas y el buen uso de un objeto. Un manual largo se divide en <strong>apartados</strong> (<span lang="en">section</span>), las partes numeradas donde está cada tema, y dentro de ellos hay <strong>advertencias</strong> (<span lang="en">warning</span>), las partes que avisan de un peligro o de una condición de uso.</p>
      <h3>Un manual se navega, no se lee entero</h3>
      <p>La idea central es esa: un manual no se lee de principio a fin, se navega. El camino es siempre el mismo. Primero abres el índice, que en los manuales grandes lista los temas con la página de cada uno. Segundo buscas el apartado que te importa. Tercero lees solo ese trozo. Y cuarto, antes de hacer nada, miras las advertencias y los símbolos, escritos para tu caso.</p>
      <p>Hay una cosa más, la que más se pasa por alto: las referencias cruzadas. Cuando el manual dice «véase el apartado 2.3», no es un adorno, te está mandando a otro sitio del mismo manual, y puede que la respuesta esté justo allí. Wikipedia en español llama «seguridad» a la parte del manual sobre los usos inadecuados que podrían acarrear riesgos para la salud.</p>
      <h3>Un dato que se puede comprobar</h3>
      <p>El Reglamento (UE) 2023/988 sobre la seguridad general de los productos (Unión Europea, 2023) dice que los productos deben ir acompañados de instrucciones e información de seguridad claras, en un lenguaje fácilmente comprensible para los consumidores, según determine el Estado miembro donde se comercialicen. En la práctica, esto significa algo sencillo: si el manual de tu aparato viene en un idioma que no entiendes, el problema no es tuyo, es del documento, y eso se puede reclamar. En la Unión Europea (2026), además, todos los bienes de consumo que se venden deben cumplir las normas de seguridad, y las normas exigen advertencias de seguridad en los productos.</p>
      <h3>Lo mismo pasa con el prospecto de un medicamento</h3>
      <p>El prospecto es la información escrita que acompaña al medicamento, y va con apartados fijos: composición, contraindicaciones, reacciones adversas y conservación, con el aviso de no pasar de la fecha de caducidad. En la Unión Europea (2023), la Agencia Europea de Medicamentos revisa la plantilla del folleto para que la información esté agrupada por temas, más fácil de localizar, con lo más importante al principio.</p>
      <p>Quedan dos errores típicos: no abrir el manual hasta que algo falla, y para entonces ya has roto algo; y saltarte las advertencias, escritas justo para tu caso. Y un aviso: las condiciones de uso (la edad, la altura, el peso, la temperatura máxima) cambian según el producto y el país, así que el dato vigente se mira en el manual que tienes delante, no en uno de internet.</p>
      <p>Estas son las cuatro partes del manual y para qué se leen:</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>La parte del manual</th><th>Qué te dice</th><th>Para qué la lees</th></tr></thead>
        <tbody>
          <tr><td>El índice</td><th scope="row">Los temas y su página</th><td>Para saber dónde está lo que buscas</td></tr>
          <tr><td>El apartado numerado</td><th scope="row">La información de un tema</th><td>Para leer solo ese trozo</td></tr>
          <tr><td>La advertencia</td><th scope="row">Un peligro o una condición de uso</th><td>Antes de usar el aparato</td></tr>
          <tr><td>La referencia cruzada</td><th scope="row">«Véase el apartado 2.3»</th><td>Para seguir la pista a otro sitio</td></tr>
        </tbody>
      </table></div>
      <p>Y este es el recorrido que hace alguien que busca una cosa:</p>
      ${MANUAL}
      <p>Es el mismo trabajo que hiciste en "Mapas conceptuales" con un texto largo, aplicado a un documento técnico. Y el género ya lo viste en "Tipos de texto: narrativo, expositivo, argumentativo e instructivo": aquí no se aprende qué tipo de texto es, sino cómo moverse por dentro.</p>`,
    ejemplo: `
      <p>El pasaje es el índice y el apartado 4.3 de un manual de ejemplo de un horno: el índice manda a un apartado, y el apartado da los pasos y la advertencia. Es un manual inventado.</p>
      <div class="nota texto-muestra">
        <p><strong>Índice:</strong> si el horno no se enciende, ve al apartado 4.3.</p>
        <p><strong>Apartado 4.3:</strong> el horno no se enciende.</p>
        <p>1. Comprueba que el cable está bien enchufado.</p>
        <p>2. Abre la puerta y ciérrala.</p>
        <p>3. Espera un minuto y vuelve a intentarlo.</p>
        <p><strong>Advertencia:</strong> el aparato no se enchufa con un cable dañado.</p>
      </div>
      <p>El recorrido tiene cuatro pasos: el índice te da el apartado. El apartado te da tres pasos: la toma, la puerta y un minuto. La advertencia te dice lo que no hay que hacer. Y al final hay una referencia cruzada al apartado 2.1, sobre el fusible, que es lo que buscabas.</p>
      <p class="nota"><strong>Error común:</strong> abrir el manual cuando ya ha pasado algo. La sección de solución de problemas existe para antes: Wikipedia en español la define, al hablar del manual de usuario, como la sección que detalla los errores posibles y su solución.</p>`,
    vidaReal: `
      <p>Los manuales aparecen en la vida de todos los días, y se leen siempre igual:</p>
      <ul>
        <li>Cuando un aparato nuevo no hace lo que debería, el apartado de solución de problemas suele tener la respuesta.</li>
        <li>Antes de la primera dosis de un medicamento, el prospecto dice para qué sirve y qué efectos tiene.</li>
        <li>En un juguete o una bicicleta, la edad, el peso y la altura permitidos están en el manual, no en tu memoria.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿En qué parte del manual encuentras el número de página de cada tema?</p>',
        opciones: ['En el índice, que lista los temas y la página de cada uno', 'En la última página, donde está la garantía', 'En la portada, con el nombre y la foto del aparato', 'En la sección de solución de problemas'],
        correcta: 0,
        pista: '<p>Es la primera parte que se mira en un manual largo, y su nombre empieza por «in».</p>',
        solucion: '<p>La primera: <strong>en el índice, que lista los temas y la página de cada uno</strong>. El índice es el mapa del manual: con el número de página de cada tema, no hace falta leer el libro entero para saber dónde está lo que buscas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es una advertencia en un manual?</p>',
        opciones: ['La sección que cuenta los errores posibles y cómo solucionarlos', 'El índice del principio, con los temas y sus páginas', 'La parte que avisa de un peligro o de una condición de uso', 'La lista de piezas y de repuestos del aparato'],
        correcta: 2,
        pista: '<p>Piensas en la palabra inglesa <span lang="en">warning</span>, que es la que aparece en las señales de tránsito.</p>',
        solucion: '<p>La tercera: <strong>la parte que avisa de un peligro o de una condición de uso</strong>. Se escribe <span lang="en">warning</span> en inglés, y su trabajo es decirte qué puede salir mal y en qué condiciones no debes usar el aparato.</p>' },
      { tipo: 'opciones', enunciado: '<p>Compras un aparato en la Unión Europea y el manual viene solo en un idioma que no entiendes. ¿Qué dice la norma?</p>',
        opciones: ['Que el manual puede ir en el idioma que elija el fabricante, y que la traducción es un favor', 'Que las instrucciones deben entregarse en un lenguaje fácilmente comprensible para el consumidor, según el Estado miembro donde se comercializa (Unión Europea, 2023)', 'Que basta con el folleto del producto, aunque el manual no venga en tu idioma', 'Que solo los productos vendidos por internet necesitan manual en el idioma del comprador'],
        correcta: 1,
        pista: '<p>Busca el dato en el Reglamento (UE) 2023/988, sobre la seguridad general de los productos.</p>',
        solucion: '<p>La segunda: <strong>que las instrucciones deben entregarse en un lenguaje fácilmente comprensible para el consumidor, según el Estado miembro donde se comercializa</strong> (Unión Europea, 2023). Si el manual está en un idioma que no entiendes, el problema no es tuyo: es del documento, y por eso se puede reclamar.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama cada una de las partes numeradas en las que está dividido un manual? Escribe el término o su definición.</p>',
        respuestas: ['apartado', 'un apartado', 'el apartado', 'apartado numerado', 'cada una de las partes numeradas en las que se divide un manual', 'cada parte numerada de un manual', 'la parte numerada de un manual donde se explica un tema'],
        pista: '<p>Es una palabra de siete letras que empieza por «a».</p>',
        solucion: '<p>Se llama <strong>apartado</strong> (<span lang="en">section</span>): cada una de las partes numeradas en las que está dividido el manual. En el índice es donde se ven todos los apartados y la página de cada uno.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena el recorrido para encontrar un dato en un manual.</p>',
        respuesta: ['Abre el índice y busca el tema que te interesa', 'Apunta el número de página del apartado', 'Abre ese apartado y lee solo lo que necesitas', 'Lee las advertencias antes de hacer nada', 'Si el apartado te remite a otro, sigue la referencia cruzada'],
        pista: '<p>Empiezas por el índice y terminas siguiendo la pista que el propio manual te da.</p>',
        solucion: '<p>El orden es: abres el índice y buscas el tema, apuntas el número de página del apartado, abres ese apartado y lees solo lo que necesitas, lees las advertencias antes de hacer nada y, si el apartado te remite a otro, sigues la referencia cruzada.</p>' },
      { tipo: 'numero', enunciado: '<p>En el manual de ejemplo de la lección, el apartado 4.3 del horno tiene pasos numerados. ¿Cuántos pasos tiene?</p>', respuesta: 1 + 1 + 1,
        pista: '<p>Suma uno por cada paso numerado del apartado.</p>',
        solucion: '<p>El apartado 4.3 tiene tres pasos: comprueba que el cable está bien enchufado, abre la puerta y ciérrala, y espera un minuto antes de volver a intentarlo. 1 + 1 + 1 = <strong>3 pasos</strong>.</p>' },
    ],
    fuentes: [YOUR_EUROPE_SEGURIDAD, REGLAMENTO_988, EMA_QRD, WIKI_MANUAL_INSTRUCCIONES, WIKI_MANUAL_USUARIO, WIKI_PROSPECTO],
  });

  // ------------------------------------------------------------------
  L('Leer contratos y letras pequeñas', {
    objetivo: 'Leer un contrato con cinco preguntas fijas: las partes, las obligaciones, el costo total, el plazo y la forma de terminarlo.',
    explicacion: `
      <p>Firmas un contrato de treinta páginas y no lo lees. En la letra pequeña dice que la cuota sube el segundo año, que se cobra un gasto de gestión cada mes y que el servicio se renueva solo. Nadie te engañó: el texto era claro. Faltaba leerlo.</p>
      <p>Un <strong>contrato</strong> (<span lang="en">contract</span>) es el documento en el que dos partes se obligan a algo: Wikipedia en español lo define como un acuerdo, oral o escrito, entre dos o más personas, las partes, que se obligan recíprocamente sobre un objeto determinado. Y se divide en <strong>cláusulas</strong> (<span lang="en">clause</span>): el Wikcionario en español define la cláusula como cada una de las secciones de un documento jurídico. Por eso un contrato no se lee como un libro: se lee por partes, como un manual.</p>
      <h3>Cinco preguntas para cualquier contrato</h3>
      <p>La primera: ¿quién es cada parte? La segunda: ¿qué te obligan a hacer? La tercera: ¿cuánto vas a pagar de verdad? Eso es el <strong>costo total</strong> (<span lang="en">total cost</span>): el precio más las comisiones, el gasto de gestión, los impuestos y lo que sube el segundo año. La cuarta: ¿cuánto tiempo dura? El plazo. Y la quinta: ¿cómo se termina? Cancelación, aviso previo o penalización.</p>
      <p>Hay un truco de bolsillo: pasa el dedo por el papel buscando cinco palabras, «total», «cada mes», «automáticamente», «plazo» y «cancelar». Esas palabras están donde están las cinco respuestas: el resto del contrato se puede leer después, si te interesa.</p>
      <p>La postura correcta no es desconfiar de todo: es que las cinco preguntas tengan respuesta antes de firmar. Y si algo no queda claro, la respuesta no es adivinar, es preguntar al organismo de protección al consumidor de tu país, antes de firmar. Si ya firmaste y algo no cuadra, ahí es donde se reclama.</p>
      <h3>Lo que dice la norma y dónde reclamar</h3>
      <p>En la Unión Europea (2026), el vendedor debe dar información clara, correcta y comprensible antes de comprar, y entre los datos están el precio total con impuestos y todos los cargos, los gastos de entrega, la identidad del vendedor y la duración del contrato. Los contratos van en lenguaje claro y no pueden contener cláusulas abusivas, y en compras a distancia hay derecho a cancelar en 14 días.</p>
      <p>Dónde reclamar cambia según el país. En Andalucía (España, 2026), se puede pedir la hoja oficial de quejas y reclamaciones, y la empresa tiene 10 días hábiles para contestar. En Perú (2026), el Libro de Reclamaciones debe estar a tu disposición en los locales y en las plataformas de venta por internet con sucursal en el país, y sirve para presentar quejas. En Argentina (2026), el portal oficial permite iniciar un reclamo y conocer los derechos del consumidor.</p>
      <p>Y dos avisos. El primero: los datos concretos cambian según el país, el producto y la fecha, así que se leen del documento que tienes delante y se revisan con la normativa vigente de tu país. El segundo: aquí no se le dice a nadie qué hacer con su caso; se explican las preguntas y los criterios, y cada uno decide con su situación.</p>
      <p>Estas son las cinco preguntas y dónde está cada respuesta:</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>La pregunta</th><th>Dónde la buscas</th><th>Qué tiene que decir la respuesta</th></tr></thead>
        <tbody>
          <tr><td>¿Quién es cada parte?</td><th scope="row">En la cabecera y las firmas</th><td>Quién te obliga y a quién obligas</td></tr>
          <tr><td>¿Qué te obligan a hacer?</td><th scope="row">En las obligaciones</th><td>Lo que tienes que hacer y lo que no</td></tr>
          <tr><td>¿Cuánto pagas de verdad?</td><th scope="row">En el precio y los gastos</th><td>El precio, los cargos y lo que sube</td></tr>
          <tr><td>¿Cuánto tiempo dura?</td><th scope="row">En la cláusula del plazo</th><td>La duración y desde cuándo corre</td></tr>
          <tr><td>¿Cómo se termina?</td><th scope="row">En la cancelación</th><td>Cómo se cancela y qué penalización hay</td></tr>
        </tbody>
      </table></div>
      <p>Es el mismo cuidado que en "Cómo leer tu recibo de sueldo" (Finanzas personales): otro documento con obligaciones y letra pequeña. Y la fuente del contrato merece una mirada, como en "Verificar noticias y detectar desinformación": mira quién lo publica.</p>`,
    ejemplo: `
      <p>Este contrato es de ejemplo: un servicio de video por internet inventado, con cifras de ejemplo. Lo que ves aquí es su letra pequeña, con sus cuatro cláusulas.</p>
      <div class="nota texto-muestra">
        <p><strong>Partes.</strong> La empresa «Ejemplo Video» y la persona que contrata el servicio.</p>
        <p><strong>Precio y gastos.</strong> 9,99 € al mes, más un gasto de gestión de 2 € al mes.</p>
        <p><strong>Plazo.</strong> Doce meses de permanencia. Si se cancela antes, se paga una penalización de 60 €.</p>
        <p><strong>Cancelación y renovación.</strong> El contrato se renueva solo por doce meses más, salvo que se avise con treinta días de antelación.</p>
      </div>
      <p>Las cinco preguntas dan tres hallazgos. Al precio: el costo total del mes no son 9,99 €, son 9,99 € + 2 € = 11,99 €, porque el gasto de gestión se cobra cada mes. Al plazo: hay permanencia de doce meses, y salir antes cuesta 60 €. A la cancelación: la renovación es automática, así que el aviso de treinta días importa más que la fecha de fin.</p>
      <p>Con esos hallazgos ya sabes qué preguntar antes de firmar. Y el patrón se repite en todos los contratos: el mismo esquema, con otros números.</p>`,
    vidaReal: `
      <p>Los contratos aparecen en cuanto empieza algo que dura, y se leen con las mismas cinco preguntas:</p>
      <ul>
        <li>En un curso o un gimnasio, al mirar la cuota, la permanencia y lo que pasa si te vas antes de tiempo.</li>
        <li>En un alquiler o un servicio de internet, al ver quién te cobra, cuánto y cada cuánto.</li>
        <li>En una compra a distancia, al comprobar el precio total, los gastos de entrega y el plazo de cancelación.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>En un contrato, ¿qué cláusula responde a la pregunta «¿cuánto tiempo dura»?</p>',
        opciones: ['La de las partes, con los datos de quien firma', 'La del precio y de los gastos', 'La del plazo', 'La de cancelación, con el aviso previo y la penalización'],
        correcta: 2,
        pista: '<p>La palabra que la busca es «plazo», y sale en el mismo sitio donde se dice hasta cuándo.</p>',
        solucion: '<p>La tercera: <strong>la del plazo</strong>. Es la cláusula que dice cuánto dura el acuerdo y desde cuándo corre. Si no la encuentras, es que el contrato no la tiene, y eso también hay que preguntarlo antes de firmar.</p>' },
      { tipo: 'opciones', enunciado: '<p>En el contrato de ejemplo de la lección, el precio del mes es 9,99 € y el costo total del mes es 11,99 €. ¿Por qué?</p>',
        opciones: ['Porque hay un gasto de gestión de 2 € al mes que se suma al precio', 'Porque el precio del primer mes incluye los impuestos y los demás no', 'Porque el servicio sube de precio a partir del segundo mes', 'Porque la entrega de los equipos cuesta 2 € al mes'],
        correcta: 0,
        pista: '<p>Fíjate en la cláusula de precio y gastos: el precio no es lo único que se cobra cada mes.</p>',
        solucion: '<p>La primera: <strong>porque hay un gasto de gestión de 2 € al mes que se suma al precio</strong>. El precio grande se le queda bien a la gente, y el gasto pequeño es el que aparece en letra pequeña. Las cifras de este ejemplo son de ejemplo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Antes de firmar, te queda una duda sobre la cláusula de cancelación. ¿Qué es lo razonable?</p>',
        opciones: ['Firmar y ver después si el problema aparece', 'Preguntarlo al organismo de protección al consumidor de tu país, antes de firmar, y no adivinar', 'Buscar en internet qué dicen otros usuarios del servicio', 'Suponer que en cualquier contrato hay cláusulas abusivas'],
        correcta: 1,
        pista: '<p>La respuesta no es adivinar ni suposar: es preguntar, y hay un sitio oficial donde preguntar.</p>',
        solucion: '<p>La segunda: <strong>preguntarlo al organismo de protección al consumidor de tu país, antes de firmar, y no adivinar</strong>. Cada país tiene su organismo y sus normas, así que el sitio donde preguntar y la respuesta dependen de dónde estés: revisa el dato vigente en tu país.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama lo que de verdad pagas por un contrato, con el precio más todos los cargos y gastos que están en letra pequeña? Escribe el término o su definición.</p>',
        respuestas: ['costo total', 'el costo total', 'costo total del contrato', 'lo que de verdad pagas con todo lo que está en letra pequeña', 'el precio más las comisiones, los gastos y los impuestos', 'la suma del precio con todos los cargos y lo que sube después'],
        pista: '<p>Son dos palabras: la primera es lo que cuesta y la segunda dice que es el total.</p>',
        solucion: '<p>Se llama <strong>costo total</strong> (<span lang="en">total cost</span>): el precio más las comisiones, el gasto de gestión, los impuestos y lo que sube más adelante. En la Unión Europea (2026) el vendedor tiene que dar ese precio total con impuestos y todos los cargos antes de comprar.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena las cinco preguntas del contrato, de la primera a la última.</p>',
        respuesta: ['¿Quién es cada parte?', '¿Qué te obligan a hacer?', '¿Cuánto vas a pagar de verdad?', '¿Cuánto tiempo dura?', '¿Cómo se termina?'],
        pista: '<p>Empiezas por las personas y terminas por el final del contrato.</p>',
        solucion: '<p>El orden es: quién es cada parte, qué te obligan a hacer, cuánto vas a pagar de verdad, cuánto tiempo dura y, por último, cómo se termina. Es el mismo orden en todos los contratos, y por eso sirve de lista de control.</p>' },
      { tipo: 'numero', enunciado: '<p>En el contrato de ejemplo de la lección, el precio es 9,99 € al mes más un gasto de gestión de 2 € al mes. ¿Cuál es el costo total de un mes? Las cifras son de ejemplo.</p>', respuesta: 9.99 + 2,
        pista: '<p>Suma el precio y el gasto de gestión: los dos se cobran cada mes.</p>',
        solucion: '<p>El costo total del mes es 9,99 € + 2 € = <strong>11,99 €</strong>. Ese es el número que hay que comparar con el precio del primer mes, porque es lo que sale de tu bolsillo cada mes.</p>' },
    ],
    fuentes: [YOUR_EUROPE_CONTRATO, CONSUMO_RESPONDE, INDECOPI, ARGENTINA_CONSUMIDOR, WIKI_CONTRATO, WIKT_CLAUSULA],
  });

  // ------------------------------------------------------------------
  // Fragmento 2: «Leer gráficas e infografías» y «Lectura rápida y escaneo».
  const OWID_ESPERANZA = { nombre: 'Our World in Data: Life expectancy (en inglés)', url: 'https://ourworldindata.org/grapher/life-expectancy' };
  const WIKI_INFOGRAFIA = { nombre: 'Wikipedia en español: Infografía (apoyo)', url: 'https://es.wikipedia.org/wiki/Infograf%C3%ADa' };
  const WIKI_GRAFICA = { nombre: 'Wikipedia en español: Gráfica (apoyo)', url: 'https://es.wikipedia.org/wiki/Gr%C3%A1fica' };
  const WIKI_LEYENDA = { nombre: 'Wikipedia en español: Leyenda (cartografía) (apoyo)', url: 'https://es.wikipedia.org/wiki/Leyenda_(cartograf%C3%ADa)' };
  const WIKI_DIAGRAMA = { nombre: 'Wikipedia en español: Diagrama (apoyo)', url: 'https://es.wikipedia.org/wiki/Diagrama' };
  const WIKI_LECTURA_VELOZ = { nombre: 'Wikipedia en español: Lectura veloz (apoyo)', url: 'https://es.wikipedia.org/wiki/Lectura_veloz' };
  const WIKI_LECTURA = { nombre: 'Wikipedia en español: Lectura (apoyo)', url: 'https://es.wikipedia.org/wiki/Lectura' };
  const CORNELL_TEXTBOOK = { nombre: 'Learning Strategies Center, Cornell University: Textbook Reading Systems (en inglés)', url: 'https://lsc.cornell.edu/how-to-study/reading-strategies/textbook-reading-systems/' };
  const CORNELL_3PS = { nombre: 'Learning Strategies Center, Cornell University: 3 P’s for Effective Reading (en inglés)', url: 'https://lsc.cornell.edu/how-to-study/reading-strategies/3-ps-for-effective-reading/' };
  const BRYSBAERT = { nombre: 'Marc Brysbaert, «How many words do we read per minute? A review and meta-analysis of reading rate» (Journal of Memory and Language, 2019) (en inglés)', url: 'https://reader.ku.edu/sites/reader/files/2024-01/How%20many%20words%20do%20we%20read%20per%20minute%20(1).pdf' };

  // Gráfica de barras de una sola serie: etiqueta abajo, valor encima de cada barra.
  function barras({ etiquetas, valores, max, paso, descripcion, min = 0 }) {
    const n = valores.length, alto = max - min;
    const figuras = valores.flatMap((v, i) => [
      { tipo: 'poligono', puntos: [[i + 0.15, min], [i + 0.85, min], [i + 0.85, v], [i + 0.15, v]], solido: true },
      txt(i + 0.5, min - alto * 0.07, etiquetas[i]),
      txt(i + 0.5, v + alto * 0.05, String(v)),
    ]);
    return G({ x: [0, n], y: [min - alto * 0.12, max + alto * 0.1], pasos: [1e9, paso], nombres: false, figuras, descripcion });
  }

  const GRAFICA_BARRAS = barras({
    etiquetas: ['5', '10', '15', '20', '25'],
    valores: [3, 9, 12, 5, 1],
    max: 14,
    paso: 2,
    descripcion: 'Gráfica de barras de ejemplo. En el eje horizontal, el tiempo que tardan en llegar a la escuela, en minutos; en el eje vertical, el número de estudiantes. Cinco minutos: 3 estudiantes; diez minutos: 9; quince minutos: 12; veinte minutos: 5; veinticinco minutos: 1. Las cifras son de ejemplo.',
  });

  // Fila de diez círculos: cada círculo es el 10 %; los rellenos son la parte de esa actividad.
  const pictograma = (x0, y, n) => Array.from({ length: 10 }, (_, i) => ({
    tipo: 'circulo', x: x0 + i * 0.48, y, r: 0.16, ...(i < n ? { solido: true } : {}),
  }));
  const INFOGRAFIA = diagrama([0, 12], [0, 9.4], [
    caja(0.4, 7.9, 11.6, 9.4), txt(6, 9.0, 'Los jóvenes y el móvil'), txt(6, 8.35, 'Porcentaje del tiempo diario con el móvil'),
    caja(0.4, 4.9, 5.8, 7.6), txt(3.1, 7.25, 'Chatear'), txt(3.1, 6.6, '40 %'), ...pictograma(0.9, 5.45, 4),
    caja(6.2, 4.9, 11.6, 7.6), txt(8.9, 7.25, 'Redes sociales'), txt(8.9, 6.6, '30 %'), ...pictograma(6.7, 5.45, 3),
    caja(0.4, 1.9, 5.8, 4.6), txt(3.1, 4.25, 'Ver vídeos'), txt(3.1, 3.6, '20 %'), ...pictograma(0.9, 2.45, 2),
    caja(6.2, 1.9, 11.6, 4.6), txt(8.9, 4.25, 'Jugar'), txt(8.9, 3.6, '10 %'), ...pictograma(6.7, 2.45, 1),
    caja(0.4, 0.55, 11.6, 1.65), { tipo: 'circulo', x: 1.0, y: 1.1, r: 0.16, solido: true },
    txt(5.9, 1.1, 'Cada círculo es el 10 % del tiempo con el móvil'),
    txt(6, 0.1, 'Fuente de ejemplo: 30 estudiantes de un curso'),
  ], 'Infografía de ejemplo. Arriba, el título «Los jóvenes y el móvil» y el subtítulo «Porcentaje del tiempo diario con el móvil». Debajo, cuatro bloques: «Chatear, 40 %», «Redes sociales, 30 %», «Ver vídeos, 20 %» y «Jugar, 10 %». En cada bloque hay una fila de diez círculos, y los círculos rellenos marcan la parte de esa actividad: cuatro rellenos en el bloque de chatear, tres en el de redes sociales, dos en el de vídeos y uno en el de jugar. Abajo, una leyenda que dice «Cada círculo es el 10 % del tiempo con el móvil» y la fuente de ejemplo: una encuesta a 30 estudiantes de un curso.');

  const MAPA_PAGINA = diagrama([0, 12], [0, 9.7], [
    caja(0.5, 8.5, 6.3, 9.3), txt(3.4, 8.9, 'El ciclo del agua'),
    caja(0.5, 7.4, 6.3, 8.0), txt(3.4, 7.7, 'Qué es'),
    caja(0.5, 6.5, 6.3, 7.1), txt(3.4, 6.8, 'Cómo funciona'),
    caja(0.5, 5.6, 6.3, 6.2), txt(3.4, 5.9, 'Ejemplos'),
    caja(0.5, 4.0, 6.3, 5.2), txt(3.4, 4.9, 'palabra clave'), txt(3.4, 4.4, 'evaporación'),
    caja(0.5, 2.4, 6.3, 3.6), txt(3.4, 3.3, 'cifras: 2 000 litros'), txt(3.4, 2.85, 'el examen: el día 14'),
    caja(0.5, 0.9, 6.3, 1.7), txt(3.4, 1.3, 'Pie de página: fuente y fecha'),
    // Ruta del esaneo: entra por el título, los tres subtítulos y la palabra clave.
    { tipo: 'linea', desde: [7.6, 8.9], hasta: [7.6, 4.6], serie: 1 },
    ...flecha([7.6, 8.9], [6.3, 8.9], 1, 0.6),
    ...flecha([7.6, 7.7], [6.3, 7.7], 1, 0.6),
    ...flecha([7.6, 6.8], [6.3, 6.8], 1, 0.6),
    ...flecha([7.6, 5.9], [6.3, 5.9], 1, 0.6),
    ...flecha([7.6, 4.6], [6.3, 4.6], 1, 0.6),
    txt(9.6, 8.9, 'Ruta del esaneo'), txt(9.6, 8.35, '¿De qué va el texto?'),
    // Ruta del escaneo: entra por las cifras y por el pie de página.
    { tipo: 'linea', desde: [11.4, 3.9], hasta: [11.4, 1.3], serie: 2 },
    ...flecha([11.4, 3.3], [6.3, 3.3], 2, 0.9),
    ...flecha([11.4, 1.3], [6.3, 1.3], 2, 0.9),
    txt(9.4, 4.35, 'Ruta del escaneo'), txt(9.4, 3.85, '¿Dónde está el dato?'),
  ], 'Mapa de una página de un tema, con dos rutas de lectura. A la izquierda está la página: arriba, el título «El ciclo del agua»; debajo, tres subtítulos, «Qué es», «Cómo funciona» y «Ejemplos»; más abajo, una caja con la palabra clave «evaporación»; después, una caja con las cifras, «2 000 litros» y «el examen: el día 14»; y al pie, el «Pie de página: fuente y fecha». A la derecha está la ruta del esaneo, con flechas que entran por el título, los tres subtítulos y la palabra clave: esa ruta busca saber de qué va el texto. Abajo a la derecha está la ruta del escaneo, con flechas que entran en la caja de las cifras y en el pie de página: esa ruta busca un dato concreto, como la fecha del examen.');

  // ------------------------------------------------------------------
  L('Leer gráficas e infografías', {
    objetivo: 'Localizar en un gráfico o en una infografía las cinco piezas que lo hacen legible (título, ejes, leyenda, unidad y fuente) y contar después con palabras lo que dice.',
    explicacion: `
      <p>Una imagen bonita de colores, flechas y cifras bien grandes. Dice «el 60 % de los jóvenes» y te quedas con la duda: el 60 % de qué jóvenes, y de qué. Antes de opinar, hay que encontrar cinco cosas concretas dentro del dibujo.</p>
      <p>Una gráfica es, según Wikipedia en español, una representación de datos mediante recursos visuales: líneas, vectores, superficies o símbolos. Y una <strong>infografía</strong> (<span lang="en">infographic</span>) es un texto visual que resume o explica información de manera concisa y didáctica. Su estructura general, según Wikipedia en español, es el título, el texto explicativo, los gráficos, las fuentes y los créditos.</p>
      <h3>Las cinco piezas de un gráfico</h3>
      <p>El título dice de qué trata. Los ejes dicen qué se mide en cada dirección. La <strong>leyenda</strong> (<span lang="en">legend</span>) dice qué color o qué símbolo es cada cosa: Wikipedia en español, al hablar de los mapas, la define como la explicación de los símbolos y los colores. La <strong>unidad</strong> (<span lang="en">unit</span>) dice qué mide cada número y de qué grupo: en porcentaje, por cada mil, por cada habitante. Y al pie, casi siempre, está la fuente: quién hizo el gráfico y con qué datos.</p>
      <p>La pieza que más se olvida es la unidad, y es la que más cambia lo que significa un número. Un «60 %» a secas es un número sin dueño: no dice de qué grupo, ni de qué periodo, ni sobre qué total está calculado. Con la unidad escrita, no hay que adivinar.</p>
      <h3>Un gráfico bien hecho dice de dónde salen los datos</h3>
      <p>Our World in Data (en inglés) es un sitio de gráficas sobre el mundo, y su gráfica de la esperanza de vida lleva escrito su unidad, que son años, el rango de fechas que cubre, de 1543 a 2023, y la fecha de la última actualización, el 22 de octubre de 2025. El sitio explica que un gráfico bien presentado dice de qué fuentes se sacaron los datos. Eso es lo que hay que buscar en cualquier gráfico: de dónde sale cada número.</p>
      <h3>Una infografía se lee en orden</h3>
      <p>Una infografía es lo mismo con más libertad: en vez de ejes y líneas, tiene bloques, iconos y cifras, y se lee en un orden fijo, el título, los bloques, las cifras y la fuente al pie. Wikipedia en español recuerda, hablando de los diagramas, que son dibujos usados en ciencia y educación para presentar gráficamente una proposición.</p>
      <p>Y dos avisos. El primero: leer un gráfico bien es poder contarlo con palabras. Si no puedes decir en voz alta qué dice el dibujo, es que todavía no lo has leído; por eso una infografía bien hecha lleva su texto al lado. El segundo: aquí no se juzga si las cifras engañan, porque eso tiene su propia lección en Matemáticas, "Cómo leer estadísticas en las noticias sin que te engañen". Aquí solo se localiza dónde están los datos y quién los puso.</p>
      <p>Estas son las cinco piezas y dónde está cada una:</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>La pieza</th><th>Qué te dice</th><th>Dónde está</th></tr></thead>
        <tbody>
          <tr><th scope="row">El título</th><td>De qué trata el gráfico</td><td>Arriba, en el centro</td></tr>
          <tr><th scope="row">Los ejes</th><td>Qué se mide en cada dirección</td><td>En los dos lados del dibujo</td></tr>
          <tr><th scope="row">La leyenda</th><td>Qué color o símbolo es cada cosa</td><td>Abajo o en el margen derecho</td></tr>
          <tr><th scope="row">La unidad</th><td>Qué mide cada número y de qué grupo</td><td>Junto al número o en la cabecera</td></tr>
          <tr><th scope="row">La fuente</th><td>Quién lo hizo y con qué datos</td><td>Al pie, en letra pequeña</td></tr>
        </tbody>
      </table></div>
      <p>Y aquí una gráfica de barras de ejemplo, con cifras inventadas:</p>
      ${GRAFICA_BARRAS}
      <p>En el eje horizontal, los minutos de camino a la escuela; en el vertical, cuántos estudiantes hay. Sin esas dos frases, el 12 de una barra no quiere decir nada: sin unidad, un número suelto.</p>
      <p class="nota"><strong>Trampa común:</strong> mirar solo el título y el color más bonito, y dar por buena la cifra. Un dibujo bonito no dice de dónde salen los datos: eso está al pie, en letra pequeña.</p>`,
    ejemplo: `
      <p>Esta infografía es inventada y sus cifras son de ejemplo. Habla del tiempo que un grupo de estudiantes dedica al móvil:</p>
      <div class="nota texto-muestra">
        <p>Los jóvenes y el móvil</p>
        <p>Porcentaje del tiempo diario con el móvil</p>
        <p>Chatear con amigos: 40 %</p>
        <p>Redes sociales: 30 %</p>
        <p>Ver vídeos: 20 %</p>
        <p>Jugar: 10 %</p>
        <p>Cada círculo es el 10 % del tiempo con el móvil.</p>
        <p>Fuente de ejemplo: encuesta a 30 estudiantes de un curso.</p>
      </div>
      <p>Y así queda el dibujo:</p>
      ${INFOGRAFIA}
      <p>Se lee en orden. El título dice de qué va. Los bloques dicen qué se mide: chatear, redes sociales, vídeos y juegos. La leyenda dice qué significa cada círculo. La unidad está en el subtítulo: es el porcentaje del tiempo diario con el móvil, no de la semana. Y al pie está la fuente.</p>
      <p>Queda la pregunta que separa leer de interpretar: ¿el dibujo dice lo que su título promete? El título habla de «los jóvenes», pero la encuesta solo llegó a treinta estudiantes de un mismo curso. El dibujo es fiel; el título no lo es. Y eso ya es un asunto de "Verificar noticias y detectar desinformación".</p>`,
    vidaReal: `
      <p>Las gráficas y las infografías están en todas partes, y siempre se leen igual: primero el título, luego la unidad, y al final la fuente. En el parte del tiempo, en el cartel del autobús, en los resultados de un partido, en la etiqueta de un alimento, en la gráfica de una noticia o en el cartel del colegio: los mismos cinco pasos. Y hay un segundo uso muy útil: si un dibujo no trae su texto, escríbelo tú. Es la forma más fácil de saber si lo has entendido.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué pieza de un gráfico te dice qué color o qué símbolo representa cada cosa?</p>',
        opciones: ['El título', 'La leyenda', 'La unidad', 'La fuente'],
        correcta: 1,
        pista: '<p>Es la palabra que en inglés se escribe con una L y que aparece en el margen del mapa.</p>',
        solucion: '<p>La segunda: <strong>la leyenda</strong>. Wikipedia en español, al hablar de los mapas, la define como la explicación de los símbolos y los colores, y dice que suele estar en la zona inferior o en el margen derecho del dibujo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un gráfico de ejemplo dice: «el 60 % de los jóvenes pasa más de dos horas al día con el móvil». ¿Qué te falta para saber de qué se está hablando?</p>',
        opciones: ['La unidad: de qué grupo, de qué periodo y sobre qué total se calcula ese 60 %', 'El título, porque los títulos de los gráficos no se leen', 'El color de las barras, que dice si el dato es bueno o malo', 'El tamaño del dibujo, que dice si el dato es importante'],
        correcta: 0,
        pista: '<p>Un «60 %» sin más es un número sin dueño. ¿Qué información le falta para tener dueño?</p>',
        solucion: '<p>La primera: <strong>la unidad</strong>. Falta saber de qué grupo de jóvenes se trata, de qué periodo (un día, una semana, un mes) y sobre qué total está calculado ese 60 %. Con la unidad escrita, no hay que adivinar.</p>' },
      { tipo: 'opciones', enunciado: '<p>La gráfica de la esperanza de vida de Our World in Data (en inglés) indica la unidad (años), el rango de fechas (1543 a 2023) y la última actualización (22 de octubre de 2025). ¿Qué ganas al mirar esos tres datos?</p>',
        opciones: ['Saber cuántos países aparecen en el gráfico', 'Saber cuánto mide de alto el dibujo', 'Saber si el número es un promedio de muchos años o de uno solo, y cuándo se publicó', 'Saber qué colores se han usado en las barras'],
        correcta: 2,
        pista: '<p>Piensa en la diferencia entre una línea que sube durante ochenta años y una línea con un solo punto.</p>',
        solucion: '<p>La tercera: <strong>saber si el número es un promedio de muchos años o de uno solo, y cuándo se publicó</strong>. El rango de fechas dice el periodo que cubre la línea y la fecha de actualización dice hasta cuándo vale lo que lees. Our World in Data explica además que un gráfico bien presentado dice de qué fuentes se sacaron los datos.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la parte de un gráfico o de un mapa que explica qué significa cada color y cada símbolo? Escribe el término o su definición.</p>',
        respuestas: ['leyenda', 'la leyenda', 'la parte del gráfico que dice qué significa cada color o cada símbolo', 'la parte del gráfico que explica los colores y los símbolos', 'la explicación de los símbolos y los colores que aparecen en el mapa o en el gráfico', 'la parte que dice qué color o símbolo es cada cosa'],
        pista: '<p>Son siete letras y es la palabra que aparece al pie de los mapas, junto a los símbolos.</p>',
        solucion: '<p>Se llama <strong>leyenda</strong> (<span lang="en">legend</span>): la parte del gráfico que dice qué significa cada color o cada símbolo. Wikipedia en español la define, al hablar de los mapas, como la explicación de los símbolos y los colores, y dice que suele estar en la zona inferior o en el margen derecho.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena las cinco piezas de un gráfico en el orden en que las localizas.</p>',
        respuesta: ['Lee el título', 'Mira los ejes y qué mide cada uno', 'Busca la leyenda de los colores y los símbolos', 'Comprueba la unidad de los números', 'Baja al pie y mira quién puso los datos'],
        pista: '<p>Empiezas por arriba del dibujo y terminas abajo del todo.</p>',
        solucion: '<p>El orden es: lees el título, miras los ejes y qué mide cada uno, buscas la leyenda de los colores y los símbolos, compruebas la unidad de los números y bajas al pie para ver quién puso los datos.</p>' },
      { tipo: 'numero', enunciado: '<p>En la infografía de ejemplo de la lección, ¿cuántas piezas localizas? Cuenta el título, los cuatro bloques con su cifra, la leyenda y la fuente al pie. Las cifras son de ejemplo.</p>', respuesta: 1 + 4 + 1 + 1,
        pista: '<p>Suma el título, los bloques, la leyenda y la fuente.</p>',
        solucion: '<p>Son siete piezas: 1 + 4 + 1 + 1 = <strong>7</strong>. El título, los cuatro bloques con su pictograma, la leyenda y la fuente al pie. Localizarlas es el trabajo de leer; decidir si los números engañan es otra lección, la de Matemáticas.</p>' },
    ],
    fuentes: [OWID_ESPERANZA, WIKI_INFOGRAFIA, WIKI_GRAFICA, WIKI_LEYENDA, WIKI_DIAGRAMA],
  });

  // ------------------------------------------------------------------
  L('Lectura rápida y escaneo', {
    objetivo: 'Decidir qué parte de un texto leer despacio, y usar el esaneo y el escaneo para encontrar rápido lo que buscas.',
    explicacion: `
      <p>Tienes doce páginas del tema de mañana y cinco minutos. No vas a leerlas todas, y no hace falta. Hay dos formas de leer deprisa, y usar la equivocada es perder el tiempo: una para saber de qué va el texto y otra para encontrar un dato concreto.</p>
      <p>La primera se llama <strong>esaneo</strong> (<span lang="en">skimming</span>): leer deprisa para quedarse con la idea general de qué va el texto. La segunda, <strong>escaneo</strong> (<span lang="en">scanning</span>): leer deprisa para encontrar un dato concreto, una fecha, un precio o un nombre. Wikipedia en español lo explica así: el escaneo busca términos individuales en un texto, y en la lectura diagonal el lector solo lee los pasajes especiales: los títulos, la primera frase de un párrafo, las negritas y los resúmenes. El metanálisis de Marc Brysbaert (2019) lo resume igual: el esaneo encuentra ideas en un texto y el escaneo encuentra palabras concretas.</p>
      <h3>Cómo se esanea un texto</h3>
      <p>El Learning Strategies Center de la Universidad de Cornell (en inglés, 2026) da un método para esanear un capítulo: echar un vistazo a los encabezados para ver los puntos grandes y leer el párrafo final de resumen. Para previsualizar un libro: leer la introducción, hojear los encabezados, mirar los gráficos y las imágenes, y leer el último párrafo. Y avisa de un error fácil: no se trata de pasar la vista por encima de las palabras, sino de pensar en su significado. Cornell también recomienda mirar los títulos con un propósito en mente.</p>
      <h3>Cómo se escanea</h3>
      <p>Cuando ya sabes lo que buscas, no hay que recorrer el texto entero: se va directo a los números y a los nombres. Si el texto está en pantalla, se usa el buscador del navegador; si está en papel, el índice. Y lo que hace que las dos cosas funcionen es la <strong>palabra clave</strong> (<span lang="en">keyword</span>): la palabra que dice de qué va un apartado o un párrafo. En un texto bien escrito, cada apartado tiene una o dos palabras que lo resumen, y esas son las que se buscan.</p>
      <h3>El límite: leer muy rápido es leer peor</h3>
      <p>Hay un punto en el que la velocidad sube y la comprensión baja, y ese es el límite del esaneo. El metanálisis de Marc Brysbaert (2019) llegó a una conclusión clara: por encima de 1 000 palabras por minuto la comprensión del texto se pierde. Ojo con las cifras de velocidad: ese análisis, con 190 estudios y 18 573 participantes, da un promedio de 238 palabras por minuto en no ficción y 260 en ficción, y la mayoría de los adultos leen en silencio entre 175 y 300 palabras por minuto en no ficción. Son promedios de estudios, no una velocidad universal. Wikipedia en español recuerda además que las palabras por minuto son una medida no oficial y que no todos los métodos de lectura veloz tienen estudios que los respalden.</p>
      <p>Y un aviso: el esaneo no funciona con un texto mal escrito, sin subtítulos y sin palabras clave. Ahí no hay atajo. La regla final es sencilla: lo que no vas a usar, esanéalo; lo que vas a usar, léelo entero; y lo que tienes que aprender o criticar, se lee despacio.</p>
      <p>Eligiendo el modo, la página se lee así:</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Lo que quiero</th><th>El modo que sirve</th><th>Dónde miro</th></tr></thead>
        <tbody>
          <tr><th scope="row">Saber de qué va el texto</th><td>Esaneo</td><td>El título, los subtítulos, la primera y la última frase de cada apartado</td></tr>
          <tr><th scope="row">Encontrar un dato: una fecha, un precio, un nombre</th><td>Escaneo</td><td>Los números y los nombres, con el buscador o con el índice</td></tr>
          <tr><th scope="row">Usar el texto: aprenderlo o criticarlo</th><td>Ninguno de los dos: lectura entera</td><td>Todo el texto, despacio</td></tr>
        </tbody>
      </table></div>
      <p>Este es el mapa de una página con las dos rutas marcadas:</p>
      ${MAPA_PAGINA}
      <p class="nota"><strong>Trampa común:</strong> usar el esaneo cuando lo que necesitas es un dato exacto. Para la cifra que va en un trabajo, hay que escanear y luego leer ese trozo entero.</p>`,
    ejemplo: `
      <p>El tema de mañana tiene doce páginas y tú tienes cinco minutos. Esta es la primera, de un tema de ejemplo:</p>
      <div class="nota texto-muestra">
        <p>El ciclo del agua</p>
        <p>Qué es. El agua de la Tierra gira en un ciclo: sale del mar por evaporación y vuelve como lluvia.</p>
        <p>Cómo funciona. El sol calienta el agua del mar; el vapor se enfría y forma las nubes.</p>
        <p>Ejemplos. En una olla, el agua que hierve se evapora y vuelve a caer en la tapa.</p>
        <p>El examen es el día 14. Los mismos 2 000 litros pueden caer dos veces al año.</p>
      </div>
      <p>Primero, esaneo. Miras el título, los tres subtítulos («qué es», «cómo funciona», «ejemplos»), la primera frase de cada apartado y la última del apartado final. Ya sabes de qué va y si te interesa.</p>
      <p>Segundo, escaneo. Buscas la fecha del examen: vas directo a los números, la encuentras en la primera página y te vas. La regla: lo que no vas a usar, esaneo; lo que vas a usar, se lee entero. Y el aviso: sin subtítulos ni palabras clave, no hay esaneo.</p>`,
    vidaReal: `
      <p>La técnica de leer deprisa se usa todos los días, casi siempre sin darte cuenta: cuando hojeas el índice de un libro, cuando buscas la fecha de un examen en el calendario del colegio, cuando miras una receta para ver de cuántos minutos es o cuando buscas en un artículo de internet el dato que te faltaba. Y funciona al revés: si vas a citar ese dato, o a aprenderte el tema, el atajo se acaba y empieza la lectura de verdad.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué modo de lectura sirve para encontrar la fecha del examen en un tema de doce páginas?</p>',
        opciones: ['El esaneo', 'El escaneo', 'Ninguno: hay que leer las doce páginas enteras', 'Las dos cosas, por separado'],
        correcta: 1,
        pista: '<p>Una de las dos formas busca una idea general; la otra busca un término concreto. La fecha es un término concreto.</p>',
        solucion: '<p>La segunda: <strong>el escaneo</strong>. Es la técnica para buscar términos individuales en un texto, como una fecha o un precio. Con el esaneo te quedarías con la idea general del tema, que es otra cosa.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué pasa si el texto no tiene subtítulos ni palabras clave?</p>',
        opciones: ['El esaneo no sirve: no hay ningún atajo y hay que leerlo entero', 'El escaneo no sirve, pero el esaneo sí', 'Da igual, porque el título siempre alcanza', 'Da igual, porque el buscador del navegador encuentra cualquier cosa'],
        correcta: 0,
        pista: '<p>Piensa en qué se apoya el esaneo: en las partes del texto que resumen lo demás.',
        solucion: '<p>La primera: <strong>el esaneo no sirve, no hay ningún atajo y hay que leerlo entero</strong>. El esaneo se apoya en los encabezados, en la primera frase de cada apartado y en la palabra clave de cada uno. Sin esas piezas, queda leer despacio.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según el metanálisis de Marc Brysbaert (2019), ¿qué pasa por encima de 1 000 palabras por minuto?</p>',
        opciones: ['El texto se lee más rápido y se entiende mejor', 'No pasa nada: se puede leer a esa velocidad sin problema', 'La comprensión del texto se pierde', 'Solo se pierde la velocidad, pero no la comprensión'],
        correcta: 2,
        pista: '<p>El análisis revisó 190 estudios con 18 573 participantes. ¿Qué concluyeron sobre ese límite?</p>',
        solucion: '<p>La tercera: <strong>la comprensión del texto se pierde</strong>. Por encima de 1 000 palabras por minuto, leer es imposible sin una pérdida grave de la comprensión. Por eso el esaneo sirve para decidir qué leer con calma, no para sustituir la lectura.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama leer deprisa para quedarse con la idea general de qué va un texto? Escribe el término o su definición.</p>',
        respuestas: ['esaneo', 'el esaneo', 'escanear', 'leer deprisa para quedarse con la idea general de qué va el texto', 'leer rápido para saber de qué va el texto', 'leer deprisa para saber de qué va el texto sin leerlo todo', 'leer a toda velocidad para saber de qué va el texto'],
        pista: '<p>Es una palabra de siete letras que empieza por «e» y que se parece mucho a otra: no es la de buscar un dato concreto.</p>',
        solucion: '<p>Se llama <strong>esaneo</strong> (<span lang="en">skimming</span>): leer deprisa para quedarse con la idea general de qué va el texto. La otra, el escaneo (<span lang="en">scanning</span>), sirve para encontrar un dato concreto: una fecha, un precio o un nombre.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena por las partes por las que se pasa en un esaneo.</p>',
        respuesta: ['Mira el título', 'Lee los subtítulos', 'Busca la palabra clave de cada apartado', 'Lee la primera frase de cada apartado', 'Fíjate en los dibujos y en las gráficas', 'Lee la última frase del apartado final'],
        pista: '<p>Empiezas por arriba del texto y terminas por el final del apartado.',
        solucion: '<p>El orden es: miras el título, lees los subtítulos, buscas la palabra clave de cada apartado, lees la primera frase de cada apartado, te fijas en los dibujos y en las gráficas y lees la última frase del apartado final. Es el método que recomienda el Learning Strategies Center de la Universidad de Cornell (en inglés, 2026).</p>' },
      { tipo: 'numero', enunciado: '<p>El promedio de los estudios de Marc Brysbaert (2019) es de 238 palabras por minuto en no ficción. ¿Cuántas palabras leerías en 5 minutos a ese ritmo?</p>', respuesta: 238 * 5,
        pista: '<p>Multiplica las palabras por minuto por los minutos.</p>',
        solucion: '<p>238 × 5 = <strong>1 190 palabras</strong>. Ese ritmo es un promedio de estudios (190 estudios, 18 573 participantes), no una velocidad universal: cada uno lee a su ritmo.</p>' },
    ],
    fuentes: [WIKI_LECTURA_VELOZ, WIKI_LECTURA, CORNELL_TEXTBOOK, CORNELL_3PS, BRYSBAERT],
  });
})();
