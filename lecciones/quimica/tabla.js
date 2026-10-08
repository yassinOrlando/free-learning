// Química · Unidad 3: La tabla periódica.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('quimica', titulo, datos);
  // Flecha de un vector: línea hasta la base de la punta + triángulo sólido como punta.
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
  const raya = (...puntos) => ({ tipo: 'poligono', puntos, abierto: true });
  const diagrama = (x, y, figuras, descripcion) => G({ x, y, figuras, descripcion, proporcional: true, ejes: false });

  // Tabla periódica esquemática: casilla del grupo g y periodo p en x = g − 1, y = 7 − p.
  // Las dos filas f (lantánidos y actínidos) van aparte, abajo, en y = −1.5 y −2.5.
  const gruposDe = (p) => p === 1 ? [1, 18] : p <= 3 ? [1, 2, 13, 14, 15, 16, 17, 18] : Array.from({ length: 18 }, (_, i) => i + 1);
  const CELDAS = [];
  for (let p = 1; p <= 7; p++) gruposDe(p).forEach((g) => CELDAS.push({ p, g, x: g - 1, y: 7 - p }));
  [-1.5, -2.5].forEach((y) => { for (let x = 3; x <= 16; x++) CELDAS.push({ f: true, x, y }); });
  const casilla = ({ x, y }, relleno = false) => {
    const m = 0.425;
    return { tipo: 'poligono', puntos: [[x - m, y - m], [x + m, y - m], [x + m, y + m], [x - m, y + m]], relleno };
  };
  const en = (p, g) => ({ x: g - 1, y: 7 - p });
  const arriba = (g) => g === 1 || g === 18 ? 6 : g === 2 || g >= 13 ? 5 : 3; // y de la primera casilla de cada grupo
  const numerosGrupo = () => Array.from({ length: 18 }, (_, i) => txt(i, arriba(i + 1) + 0.75, String(i + 1)));
  const numerosPeriodo = () => Array.from({ length: 7 }, (_, i) => txt(-1, 6 - i, String(i + 1)));

  const OSC = (pagina, nombre) => ({ nombre: `OpenStax, Chemistry 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/chemistry-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = { nombre: 'Khan Academy en español: La tabla periódica', url: 'https://es.khanacademy.org/science/chemistry/periodic-table' };
  const PHET = (sim, nombre) => ({ nombre: `PhET, Universidad de Colorado: ${nombre}`, url: `https://phet.colorado.edu/es/simulations/${sim}` });

  // ------------------------------------------------------------------
  const BLOQUES = diagrama([-1.6, 18], [-3.1, 7.6], [
    ...CELDAS.map((c) => casilla(c)),
    txt(0.5, 7.05, 'bloque s'), txt(6.5, 4.6, 'bloque d'), txt(14.5, 6.1, 'bloque p'), txt(0.8, -2, 'bloque f'),
  ], 'El contorno de la tabla periódica, con sus 118 casillas. Bloque s: las dos columnas de la izquierda, grupos 1 y 2 (el helio, arriba a la derecha, también es del bloque s). Bloque d: las diez columnas del centro, grupos 3 a 12, que empiezan en la cuarta fila. Bloque p: las seis columnas de la derecha, grupos 13 a 18. Bloque f: las dos filas separadas abajo de la tabla.');

  L('Cómo está organizada la tabla periódica', {
    objetivo: 'Entender por qué la tabla periódica tiene esa forma, cómo se ordenan los elementos y qué son los bloques s, p, d y f.',
    explicacion: `
      <p>En un supermercado, las cosas parecidas están juntas: los lácteos en un pasillo, las frutas en otro, los productos de limpieza en otro más. Aunque nunca hayas ido a esa tienda, sabes más o menos dónde buscar la leche. La tabla periódica hace lo mismo con los elementos.</p>
      <h3>Un orden que se repite</h3>
      <p>Hacia 1860 ya se conocían unos 60 elementos, y los químicos notaron algo curioso. Si los ordenas de menor a mayor masa, cada cierto número de elementos aparece uno que se parece mucho a otro anterior. El litio, el sodio y el potasio, por ejemplo, son metales blandos que reaccionan con fuerza con el agua, y aparecen a intervalos regulares.</p>
      <p>A esta idea se le llama <strong>ley periódica</strong>: las propiedades de los elementos se repiten cada cierto tramo, como los días de la semana. Después del domingo vuelve el lunes; después de un gas que casi no reacciona viene otra vez un metal muy reactivo. "Periódico" quiere decir justo eso: que se repite cada cierto tiempo.</p>
      <h3>La apuesta de Mendeléyev</h3>
      <p>En 1869, el químico ruso Dmitri Mendeléyev acomodó los elementos en una tabla: en orden de masa, pero poniendo en la misma columna a los que se parecían. Lo genial fue que dejó huecos. Dijo que ahí iban elementos que nadie había descubierto todavía, y hasta predijo cómo serían. Uno de ellos, al que llamó "eka-silicio", se descubrió en 1886 con casi las mismas propiedades que él anunció: es el germanio.</p>
      <p>A este acomodo de todos los elementos en filas y columnas, según sus propiedades, se le llama <strong>tabla periódica</strong>. Hoy tiene 118 elementos.</p>
      <h3>El orden de hoy</h3>
      <p>Mendeléyev usó la masa porque todavía no se conocían los protones. Hoy los elementos se ordenan por su número atómico Z, el número de protones, que viste en la unidad anterior. Cada casilla tiene un protón más que la anterior: el hidrógeno tiene 1, el helio 2, el litio 3, y así hasta el 118.</p>
      ${BLOQUES}
      <h3>¿Por qué tiene esa forma tan rara?</h3>
      <p>La tabla parece un castillo con torres a los lados y un hueco arriba en medio. Esa forma sale de la configuración electrónica. Recuerda que los electrones llenan subniveles s, p, d y f. A cada zona de la tabla en la que los elementos están llenando el mismo tipo de subnivel se le llama <strong>bloque</strong>:</p>
      <ul>
        <li>El bloque s ocupa 2 columnas, porque en un subnivel s caben 2 electrones.</li>
        <li>El bloque p ocupa 6 columnas, porque en un subnivel p caben 6.</li>
        <li>El bloque d ocupa 10 columnas, porque en un subnivel d caben 10.</li>
        <li>El bloque f ocupa 14 columnas. Se dibuja aparte, abajo, para que la tabla no quede larguísima.</li>
      </ul>
      <p>Fíjate que el ancho de cada bloque es justo el cupo de su subnivel. La forma de la tabla no es un capricho: es el dibujo de cómo se acomodan los electrones.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que la tabla está ordenada por masa, como la de Mendeléyev. Hoy se ordena por número de protones. Casi siempre coincide, pero hay excepciones: el argón (Z = 18) pesa más que el potasio (Z = 19) y va antes.</p>`,
    ejemplo: `
      <p>El fósforo tiene Z = 15. ¿En qué bloque de la tabla está?</p>
      <ol class="pasos-ej">
        <li>Primero escribe su configuración electrónica, porque el bloque depende del último subnivel que se llena. Con 15 electrones: 1s² 2s² 2p⁶ 3s² 3p³.</li>
        <li>Comprueba que estén todos: 2 + 2 + 6 + 2 + 3 = 15.</li>
        <li>Mira el último subnivel que escribiste: es el 3p. El fósforo está llenando un subnivel p.</li>
        <li>Por lo tanto, está en el bloque p, la zona de las seis columnas de la derecha.</li>
        <li>Comprueba con la tabla: el fósforo está en el grupo 15, que es una de las columnas de la derecha, entre el 13 y el 18. Coincide.</li>
      </ol>
      <p>Resultado: <span class="resultado">bloque p</span>. Sus 3 electrones en el 3p lo colocan en la tercera columna de ese bloque.</p>
      <p class="nota"><strong>Error común:</strong> fijarse en el primer subnivel, 1s, y decir "bloque s". Todos los elementos empiezan con 1s; lo que decide el bloque es el último.</p>`,
    vidaReal: `
      <p>Tener todos los elementos bien acomodados es útil aunque no seas químico:</p>
      <ul>
        <li>Un químico puede adivinar cómo se porta un elemento que nunca ha visto, solo por el lugar que ocupa.</li>
        <li>Los fabricantes de celulares buscan materiales parecidos cuando uno se vuelve escaso o caro.</li>
        <li>Se usa para saber qué metales son peligrosos de mezclar con agua.</li>
        <li>Es el mismo truco de cualquier buen orden, como el de una biblioteca: lo parecido va junto.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿En qué orden están los elementos en la tabla periódica de hoy?</p>',
        opciones: ['Por su masa, del más ligero al más pesado', 'Por su número atómico, es decir, su número de protones', 'Por orden alfabético', 'Por la fecha en que se descubrieron'], correcta: 1,
        pista: '<p>Cada casilla tiene una partícula más que la anterior. ¿Cuál?</p>',
        solucion: '<p><strong>Por su número atómico.</strong> Cada elemento tiene un protón más que el anterior. Mendeléyev usó la masa, pero hay excepciones, como el argón y el potasio.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué químico ruso publicó en 1869 la tabla en la que dejó huecos para elementos por descubrir? Escribe su apellido.</p>',
        respuestas: ['Mendeléyev', 'Mendeleiev', 'Mendeléiev', 'Mendeleev', 'Mendeleyev', 'Dmitri Mendeléyev', 'Dmitri Mendeleev', 'Dmitri Mendeleiev'],
        pista: '<p>Empieza con "Mende".</p>',
        solucion: '<p><strong>Dmitri Mendeléyev.</strong> Su acierto fue predecir elementos, como el germanio, antes de que se descubrieran.</p>' },
      { tipo: 'opciones', enunciado: '<p>La configuración electrónica de un elemento termina en 3p⁴. ¿En qué bloque está?</p>',
        opciones: ['Bloque s', 'Bloque p', 'Bloque d', 'Bloque f'], correcta: 1,
        pista: '<p>El bloque lo decide el último subnivel que se llena.</p>',
        solucion: '<p>En el <strong>bloque p</strong>, porque su último subnivel es un p. Es el azufre.</p>' },
      { tipo: 'numero', enunciado: '<p>El periodo 2, la segunda fila, tiene elementos en el bloque s y en el bloque p, pero no en el d. ¿Cuántos elementos tiene?</p>', respuesta: 2 + 6,
        pista: '<p>¿Cuántas columnas ocupa el bloque s? ¿Y el p?</p>',
        solucion: '<p>2 del bloque s + 6 del bloque p = <strong>8 elementos</strong>, del litio al neón.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué elemento predijo Mendeléyev con el nombre de "eka-silicio"?</p>',
        opciones: ['El oxígeno', 'El germanio', 'El hierro', 'El oro'], correcta: 1,
        pista: '<p>Se descubrió en 1886, y su lugar está justo debajo del silicio.</p>',
        solucion: '<p>El <strong>germanio</strong>. Cuando se descubrió, sus propiedades coincidieron casi exactamente con las que Mendeléyev había anunciado.</p>' },
      { tipo: 'numero', enunciado: '<p>El oxígeno tiene Z = 8. ¿Qué número atómico tiene el elemento que va justo después en la tabla?</p>', respuesta: 8 + 1,
        pista: '<p>Cada casilla tiene un protón más que la anterior.</p>',
        solucion: '<p>8 + 1 = <strong>9</strong>. Es el flúor.</p>' },
    ],
    fuentes: [
      OSC('2-5-the-periodic-table', 'The Periodic Table'),
      WIKI('Tabla_periódica_de_los_elementos', 'Tabla periódica de los elementos'),
      WIKI('Dmitri_Mendeléyev', 'Dmitri Mendeléyev'),
      KHAN,
    ],
  });

  // ------------------------------------------------------------------
  const CLORO = en(3, 17);
  const NUMEROS = diagrama([-2.6, 18], [-3.1, 8.2], [
    ...CELDAS.map((c) => casilla(c, c.x === CLORO.x && c.y === CLORO.y)),
    ...numerosGrupo(), ...numerosPeriodo(),
    txt(6.5, 7.6, 'grupo'), txt(-1.4, 7.6, 'periodo'),
    txt(CLORO.x, CLORO.y, 'Cl'),
  ], 'La tabla periódica con los números de grupo, del 1 al 18, encima de cada columna, y los números de periodo, del 1 al 7, a la izquierda de cada fila. La casilla del cloro, Cl, está rellena: queda en la fila del periodo 3 y en la columna del grupo 17.');

  L('Grupos y periodos', {
    objetivo: 'Ubicar un elemento en la tabla por su grupo y su periodo, y relacionar esa ubicación con su configuración electrónica.',
    explicacion: `
      <p>En un estacionamiento grande, para encontrar tu coche anotas algo como "fila 3, columna 17". Con dos números sabes exactamente dónde está. En la tabla periódica, cada elemento también tiene su fila y su columna, y las dos dicen algo de él.</p>
      ${NUMEROS}
      <h3>Las columnas: familias que se parecen</h3>
      <p>Cada columna de la tabla se llama <strong>grupo</strong>. Hay 18, numerados de izquierda a derecha. Los elementos de un mismo grupo se parecen mucho entre sí, como los miembros de una familia.</p>
      <p>¿Por qué se parecen? Porque tienen el mismo número de electrones de valencia, los del último nivel. Y esos electrones son los que participan en las reacciones. El litio (1s² 2s¹) y el sodio (1s² 2s² 2p⁶ 3s¹) tienen los dos un solo electrón de valencia, y por eso los dos lo sueltan con facilidad y reaccionan con fuerza con el agua.</p>
      <p>En los grupos de los extremos, los electrones de valencia se sacan del número de grupo:</p>
      <ul>
        <li>En los grupos 1 y 2, son iguales al número de grupo: 1 y 2.</li>
        <li>En los grupos 13 a 18, son el número de grupo menos 10: el grupo 15 tiene 5, y el 17 tiene 7.</li>
      </ul>
      <p>La regla tiene una excepción: el helio está en el grupo 18 pero tiene solo 2 electrones. En los grupos 3 a 12, del bloque d, la cuenta es más complicada y no sigue esta regla.</p>
      <p>Algunos grupos tienen nombre propio:</p>
      <ul>
        <li>El grupo 1, sin contar al hidrógeno, es el de los metales alcalinos, como el sodio y el potasio.</li>
        <li>El grupo 2 es el de los alcalinotérreos, como el magnesio y el calcio.</li>
        <li>El grupo 17 es el de los halógenos, como el flúor, el cloro y el yodo.</li>
        <li>El grupo 18 es el de los gases nobles, como el helio y el neón. Casi no reaccionan con nada, porque su último nivel ya está lleno.</li>
      </ul>
      <h3>Las filas: cuántos niveles</h3>
      <p>Cada fila se llama <strong>periodo</strong>. Hay 7, numerados de arriba abajo. El número de periodo es el número del último nivel de energía que tiene electrones. El sodio termina en 3s¹, así que está en el periodo 3. Al bajar una fila, el átomo estrena un nivel más.</p>
      <p>Por eso los periodos no se parecen entre sí como los grupos. A lo largo de una fila, cada elemento tiene un electrón más que el anterior, y sus propiedades van cambiando poco a poco: el periodo 3 empieza con el sodio, un metal, y termina con el argón, un gas.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir grupo con periodo. El grupo es la columna, de arriba abajo, y reúne a los parecidos. El periodo es la fila, de izquierda a derecha.</p>`,
    ejemplo: `
      <p>Un elemento tiene la configuración 1s² 2s² 2p⁶ 3s² 3p⁵. ¿En qué periodo y en qué grupo está? ¿Qué elemento es?</p>
      <ol class="pasos-ej">
        <li>Busca el nivel más alto que aparece: el 3, en 3s² y 3p⁵. Entonces está en el periodo 3.</li>
        <li>Cuenta los electrones de valencia, los del nivel 3: 2 + 5 = 7.</li>
        <li>Como termina en un subnivel p, está en el bloque p, entre los grupos 13 y 18. Ahí, los electrones de valencia son el grupo menos 10. Si tiene 7, el grupo es 7 + 10 = 17.</li>
        <li>Suma todos los electrones para conocer Z: 2 + 2 + 6 + 2 + 5 = 17. El elemento con Z = 17 es el cloro.</li>
        <li>Comprueba en el dibujo: la casilla del cloro está en la fila 3 y en la columna 17.</li>
      </ol>
      <p>Resultado: <span class="resultado">periodo 3, grupo 17: el cloro</span>.</p>
      <p class="nota"><strong>Error común:</strong> decir que está en el grupo 7 porque tiene 7 electrones de valencia. En el bloque p hay que sumar 10.</p>`,
    vidaReal: `
      <p>Saber qué elementos son "de la misma familia" explica parecidos que quizá ya notaste:</p>
      <ul>
        <li>El cloro de la alberca y el yodo del botiquín matan gérmenes de forma parecida.</li>
        <li>El helio de los globos no arde ni reacciona, y por eso es seguro, igual que el neón de los letreros luminosos.</li>
        <li>El calcio de tus huesos y el magnesio de algunos suplementos se comportan de forma parecida en tu cuerpo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuántos electrones de valencia tienen los elementos del grupo 17?</p>', respuesta: 17 - 10,
        pista: '<p>En los grupos 13 a 18, resta 10 al número de grupo.</p>',
        solucion: '<p>17 − 10 = <strong>7 electrones de valencia</strong>. Les falta uno para llenar su último nivel.</p>' },
      { tipo: 'numero', enunciado: '<p>Un elemento tiene la configuración 1s² 2s² 2p⁶ 3s² 3p³. ¿En qué periodo está?</p>', respuesta: 3,
        pista: '<p>Busca el número de nivel más alto.</p>',
        solucion: '<p>Su nivel más alto es el 3, así que está en el <strong>periodo 3</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Ese mismo elemento, con 1s² 2s² 2p⁶ 3s² 3p³, ¿en qué grupo está?</p>', respuesta: 2 + 3 + 10,
        pista: '<p>Cuenta los electrones del nivel 3. Como termina en p, suma 10.</p>',
        solucion: '<p>Tiene 2 + 3 = 5 electrones de valencia, y en el bloque p el grupo es 5 + 10 = <strong>15</strong>. Es el fósforo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas parejas de elementos tiene propiedades químicas más parecidas?</p>',
        opciones: ['El sodio y el potasio', 'El sodio y el cloro', 'El sodio y el magnesio'], correcta: 0,
        pista: '<p>Los que se parecen están en el mismo grupo, no en la misma fila.</p>',
        solucion: '<p><strong>El sodio y el potasio</strong>: los dos están en el grupo 1 y tienen 1 electrón de valencia. El cloro y el magnesio están en el mismo periodo que el sodio, pero en otros grupos.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el grupo 18, el de los elementos que casi no reaccionan?</p>',
        respuestas: ['gases nobles', 'los gases nobles', 'gas noble', 'gases inertes', 'los gases inertes'],
        pista: '<p>Son gases, y su nombre suena a realeza.</p>',
        solucion: '<p>Los <strong>gases nobles</strong>. Su último nivel ya está lleno, así que casi no reaccionan.</p>' },
      { tipo: 'numero', enunciado: '<p>El magnesio tiene la configuración 1s² 2s² 2p⁶ 3s². ¿En qué grupo está?</p>', respuesta: 2,
        pista: '<p>Termina en s. En los grupos 1 y 2, el grupo es igual a los electrones de valencia.</p>',
        solucion: '<p>Tiene 2 electrones de valencia en el 3s, así que está en el <strong>grupo 2</strong>.</p>' },
    ],
    fuentes: [
      OSC('2-5-the-periodic-table', 'The Periodic Table'),
      WIKI('Grupo_de_la_tabla_periódica', 'Grupo de la tabla periódica'),
      WIKI('Periodo_de_la_tabla_periódica', 'Periodo de la tabla periódica'),
      PHET('build-an-atom', 'Construye un átomo'),
    ],
  });

  // ------------------------------------------------------------------
  const clave = ({ x, y }) => `${x},${y}`;
  const NO_METALES = new Set([[1, 1], [1, 18], [2, 14], [2, 15], [2, 16], [2, 17], [2, 18], [3, 15], [3, 16], [3, 17], [3, 18],
    [4, 16], [4, 17], [4, 18], [5, 17], [5, 18], [6, 17], [6, 18], [7, 17], [7, 18]].map(([p, g]) => clave(en(p, g))));
  const METALOIDES = [[2, 13], [3, 14], [4, 14], [4, 15], [5, 15], [5, 16]].map(([p, g]) => en(p, g));
  const esMetaloide = (c) => METALOIDES.some((m) => m.x === c.x && m.y === c.y);
  const ZONAS = diagrama([-0.8, 18], [-4.2, 7.2], [
    ...CELDAS.map((c) => casilla(c, !NO_METALES.has(clave(c)) && !esMetaloide(c))),
    ...METALOIDES.map(({ x, y }) => ({ tipo: 'circulo', x, y, r: 0.15, solido: true })),
    raya([11.5, 5.5], [11.5, 4.5], [12.5, 4.5], [12.5, 2.5], [13.5, 2.5], [13.5, 1.5], [15.5, 1.5], [15.5, -0.5]),
    txt(8.5, -3.4, 'con relleno: metales · vacías: no metales · con punto: metaloides'),
  ], 'La tabla periódica dividida en tres zonas. Las casillas de los metales están rellenas y ocupan casi toda la tabla: la izquierda, el centro y las dos filas de abajo. Las de los no metales están vacías y quedan arriba a la derecha, más el hidrógeno arriba a la izquierda. Seis casillas tienen un punto: son los metaloides boro, silicio, germanio, arsénico, antimonio y telurio, que forman una escalera diagonal entre las dos zonas. Una línea en escalera separa los metales del resto. Los tres elementos más pesados de los grupos 17 y 18 (astato, teneso y oganesón) se dibujan vacíos, aunque su clasificación todavía se discute.');

  L('Metales, no metales y metaloides', {
    objetivo: 'Clasificar los elementos en metales, no metales y metaloides por sus propiedades y por su lugar en la tabla.',
    explicacion: `
      <p>Una cuchara de metal brilla, se puede doblar sin romperse y, si la dejas en la sopa, el mango se calienta. Un trozo de azufre, en cambio, es amarillo opaco, se desmorona si lo golpeas y no deja pasar el calor. Son dos formas muy distintas de ser, y casi todos los elementos se portan como una o como la otra.</p>
      <h3>Los metales</h3>
      <p>Un <strong>metal</strong> es un elemento brillante que conduce bien el calor y la electricidad. Los metales también son maleables, es decir, se pueden aplastar en láminas, como el papel aluminio. Y son dúctiles: se pueden estirar en hilos, como los alambres de cobre. Casi todos son sólidos a temperatura ambiente; el mercurio es la excepción, porque es líquido.</p>
      <p>Son mayoría: unos 94 de los 118 elementos son metales. Ocupan la izquierda y el centro de la tabla. Como tienen pocos electrones de valencia, tienden a perderlos y a formar cationes, los iones positivos que viste en la unidad anterior. El sodio, por ejemplo, pierde su único electrón de valencia y queda como Na⁺.</p>
      <h3>Los no metales</h3>
      <p>Un <strong>no metal</strong> es un elemento que no tiene las propiedades de los metales: casi nunca brilla, conduce mal el calor y la electricidad, y si es sólido, se quiebra en lugar de doblarse. Muchos son gases, como el oxígeno, el nitrógeno y el cloro. Están arriba a la derecha de la tabla, y el hidrógeno también es un no metal aunque esté en el grupo 1.</p>
      <p>Los no metales tienen muchos electrones de valencia, así que tienden a ganar electrones y a formar aniones, como el Cl⁻. Esa diferencia, que unos sueltan electrones y otros los atrapan, explica muchas de las reacciones que verás más adelante.</p>
      ${ZONAS}
      <h3>Los que están en medio</h3>
      <p>Junto a la línea en escalera que separa las dos zonas hay unos pocos elementos con propiedades intermedias. Se llaman <strong>metaloides</strong>. El silicio, por ejemplo, brilla como un metal pero se quiebra como un no metal. Además conduce la electricidad mejor que un no metal, pero mucho peor que un metal. A los materiales así se les llama semiconductores, y su conducción se puede controlar. Por eso con silicio se hacen los chips de las computadoras y los paneles solares.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Propiedad</th><th>Metales</th><th>No metales</th><th>Metaloides</th></tr>
        <tr><th>Brillo</th><td>Sí</td><td>Casi nunca</td><td>Algunos</td></tr>
        <tr><th>Conducen la electricidad</th><td>Muy bien</td><td>Mal</td><td>Un poco</td></tr>
        <tr><th>Al golpearlos</th><td>Se doblan</td><td>Se quiebran</td><td>Se quiebran</td></tr>
        <tr><th>Con los electrones</th><td>Los pierden</td><td>Los ganan</td><td>Depende</td></tr>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> pensar que todo lo que está en el grupo 1 es metal. El hidrógeno está ahí porque tiene 1 electrón de valencia, pero es un gas no metálico.</p>`,
    ejemplo: `
      <p>Te dan una muestra de un elemento desconocido. Es un sólido gris y brillante, conduce la electricidad pero muy poco, y al golpearlo con un martillo se rompe en pedazos. ¿Es metal, no metal o metaloide?</p>
      <ol class="pasos-ej">
        <li>Revisa cada propiedad por separado. El brillo apunta a un metal.</li>
        <li>Que se rompa al golpearlo apunta a un no metal: un metal se aplastaría o se doblaría.</li>
        <li>Que conduzca la electricidad, pero poco, no es ni lo uno ni lo otro: un metal conduce muy bien y un no metal casi nada.</li>
        <li>Tiene propiedades de los dos lados, así que es un metaloide.</li>
        <li>Comprueba con un caso conocido: el silicio es gris, brillante, quebradizo y semiconductor. Encaja con la descripción.</li>
      </ol>
      <p>Resultado: <span class="resultado">es un metaloide</span>, probablemente silicio.</p>
      <p class="nota"><strong>Error común:</strong> decidir con una sola propiedad, como el brillo. Hay que revisar varias, porque los metaloides mezclan propiedades de los dos grupos.</p>`,
    vidaReal: `
      <p>Elegir el material adecuado para cada cosa depende de cómo se porta cada elemento:</p>
      <ul>
        <li>Los cables de tu casa son de cobre porque conduce muy bien la electricidad y se estira en hilos.</li>
        <li>Las ollas son de metal porque el calor de la estufa pasa rápido a la comida.</li>
        <li>Los chips de tu celular están hechos de un elemento que conduce solo un poco, y justo eso los hace útiles.</li>
        <li>El mango de un sartén suele ser de plástico para que no te quemes.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Un elemento es brillante, se aplasta en láminas al golpearlo y conduce muy bien la electricidad. ¿Qué es?</p>',
        opciones: ['Un metal', 'Un no metal', 'Un metaloide'], correcta: 0,
        pista: '<p>Revisa la tabla de propiedades: ¿cuál cumple las tres?</p>',
        solucion: '<p>Es un <strong>metal</strong>: brillo, maleabilidad y buena conducción eléctrica son sus señas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos elementos es un metaloide?</p>',
        opciones: ['El hierro', 'El oxígeno', 'El silicio', 'El sodio'], correcta: 2,
        pista: '<p>Es el que se usa en los chips de las computadoras.</p>',
        solucion: '<p>El <strong>silicio</strong>. El hierro y el sodio son metales, y el oxígeno es un no metal.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué metal es líquido a temperatura ambiente?</p>', respuestas: ['mercurio', 'el mercurio', 'Hg'],
        pista: '<p>Se usaba en los termómetros antiguos.</p>',
        solucion: '<p>El <strong>mercurio</strong>, la gran excepción entre los metales, que casi todos son sólidos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué tipo de ion suele formar un metal, como el sodio o el magnesio?</p>',
        opciones: ['Un catión, porque pierde electrones', 'Un anión, porque gana electrones', 'Ninguno: los metales no forman iones'], correcta: 0,
        pista: '<p>Los metales tienen pocos electrones de valencia. ¿Les conviene soltarlos o ganar más?</p>',
        solucion: '<p>Un <strong>catión</strong>: el metal pierde sus pocos electrones de valencia y queda con carga positiva, como Na⁺ o Mg²⁺.</p>' },
      { tipo: 'numero', enunciado: '<p>Unos 94 de los 118 elementos son metales. ¿Qué porcentaje es? Redondea a un número entero.</p>',
        respuesta: 94 / 118 * 100, tolerancia: 0.5,
        pista: '<p>Divide la parte entre el total y multiplica por 100.</p>',
        solucion: '<p>94 ÷ 118 = 0.80, y 0.80 × 100 = <strong>80%</strong>. Cuatro de cada cinco elementos son metales.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué los cables eléctricos se hacen de cobre?</p>',
        opciones: ['Porque es un metal: conduce muy bien la electricidad y se puede estirar en hilos', 'Porque es un no metal y no deja pasar la electricidad', 'Porque es un metaloide y conduce solo un poco'], correcta: 0,
        pista: '<p>¿En qué zona de la tabla está el cobre? Está en el centro.</p>',
        solucion: '<p>Porque el cobre es un <strong>metal</strong>: conduce muy bien y es dúctil, así que se estira en alambres.</p>' },
    ],
    fuentes: [
      OSC('2-5-the-periodic-table', 'The Periodic Table'),
      WIKI('Metal', 'Metal'),
      WIKI('No_metal', 'No metal'),
      WIKI('Metaloide', 'Metaloide'),
    ],
  });

  // ------------------------------------------------------------------
  const TENDENCIAS = diagrama([-0.8, 21.6], [-2.3, 8.2], [
    ...CELDAS.filter((c) => !c.f).map((c) => casilla(c)),
    ...flecha([17.4, -1], [-0.4, -1], 0, 2), txt(8.5, -1.7, 'el radio crece hacia la izquierda'),
    ...flecha([19, 6], [19, 0], 0, 2), txt(20.4, 3.4, 'el radio'), txt(20.4, 2.6, 'crece'),
    ...flecha([2.6, 3.8], [10.6, 5.9], 0, 2), txt(6.5, 7.7, 'la electronegatividad y la energía'), txt(6.5, 6.9, 'de ionización crecen'),
  ], 'El contorno de la tabla periódica, sin las filas de abajo, con tres flechas. Una flecha horizontal debajo de la tabla apunta a la izquierda: el radio crece hacia la izquierda. Una flecha vertical a la derecha apunta hacia abajo: el radio crece hacia abajo. Una flecha inclinada en el hueco del centro apunta hacia arriba y a la derecha: la electronegatividad y la energía de ionización crecen en esa dirección.');

  L('Propiedades periódicas', {
    objetivo: 'Explicar cómo cambian el tamaño de los átomos, la energía de ionización y la electronegatividad a lo largo de la tabla, y comparar dos elementos por su lugar.',
    explicacion: `
      <p>Un imán fuerte atrae los clips desde más lejos y los sujeta con más fuerza que uno débil. En un átomo pasa algo parecido: el núcleo, con sus protones positivos, jala a los electrones negativos. Entre más protones tiene y más cerca están los electrones, más fuerte los sujeta. Con esa idea se explican las tendencias de la tabla.</p>
      <h3>¿Qué tan grande es el átomo?</h3>
      <p>Al tamaño de un átomo, medido del núcleo al borde de su nube de electrones, se le llama <strong>radio atómico</strong>. Es tan pequeño que se mide en picómetros (pm): un picómetro es una billonésima de metro.</p>
      <p>Al avanzar por un periodo, de izquierda a derecha, cada elemento tiene un protón más, pero sus electrones siguen en el mismo nivel. El núcleo jala más fuerte a electrones que están a la misma distancia, y los acerca. Por eso el átomo se encoge.</p>
      <p>Al bajar por un grupo, cada elemento estrena un nivel de energía más, más lejos del núcleo. Por eso el átomo crece, como una cebolla que suma capas.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Periodo 3</th><td>Na</td><td>Mg</td><td>Al</td><td>Si</td><td>P</td><td>S</td><td>Cl</td></tr>
        <tr><th>Radio (pm)</th><td>190</td><td>145</td><td>118</td><td>111</td><td>98</td><td>88</td><td>79</td></tr>
      </table></div>
      <div class="tabla-wrap"><table>
        <tr><th>Grupo 1</th><td>Li</td><td>Na</td><td>K</td></tr>
        <tr><th>Radio (pm)</th><td>167</td><td>190</td><td>243</td></tr>
      </table></div>
      <h3>¿Qué tan fácil suelta un electrón?</h3>
      <p>A la energía que hace falta para arrancarle a un átomo su electrón más externo se le llama <strong>energía de ionización</strong>. Sigue la tendencia contraria al radio. En un átomo grande, el electrón de afuera está lejos del núcleo y sujeto con poca fuerza, así que se suelta fácil. En uno chico, está cerca y bien sujeto. Por eso la energía de ionización crece hacia arriba y hacia la derecha. El litio necesita 520 unidades de energía (kJ/mol), el sodio 496 y el potasio solo 419: bajando por el grupo, cada vez cuesta menos.</p>
      <h3>¿Qué tan fuerte atrae electrones?</h3>
      <p>Cuando dos átomos se unen, comparten electrones, y uno puede jalarlos más que el otro. A esa fuerza con que un átomo atrae los electrones que comparte se le llama <strong>electronegatividad</strong>. Se mide en una escala que llega hasta 4. También crece hacia arriba y hacia la derecha, por la misma razón: un núcleo cercano y con muchos protones jala más. El flúor es el campeón, con 3.98; el oxígeno tiene 3.44 y el cloro 3.16. En el otro extremo, el sodio tiene 0.93 y el potasio 0.82.</p>
      ${TENDENCIAS}
      <p>Fíjate que todo sale de lo mismo: arriba a la derecha, átomos chicos que sujetan fuerte sus electrones y atrapan otros; abajo a la izquierda, átomos grandes que los sueltan fácil. Por eso los metales, a la izquierda, pierden electrones, y los no metales, a la derecha, los ganan.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que un átomo con más protones siempre es más grande. En un mismo periodo pasa lo contrario: más protones jalan más fuerte y el átomo se encoge.</p>`,
    ejemplo: `
      <p>Ordena el sodio, el cloro y el potasio del átomo más grande al más pequeño.</p>
      <ol class="pasos-ej">
        <li>Ubica cada uno. El sodio está en el periodo 3, grupo 1; el cloro, en el periodo 3, grupo 17; el potasio, en el periodo 4, grupo 1.</li>
        <li>Compara el sodio con el cloro. Están en el mismo periodo, y el cloro está más a la derecha, con más protones jalando el mismo nivel. El cloro es más chico.</li>
        <li>Compara el sodio con el potasio. Están en el mismo grupo, y el potasio está una fila abajo, con un nivel más. El potasio es más grande.</li>
        <li>Junta las dos comparaciones: potasio, luego sodio, luego cloro.</li>
        <li>Comprueba con las tablas: 243 pm, 190 pm y 79 pm. El orden coincide.</li>
      </ol>
      <p>Resultado: <span class="resultado">potasio &gt; sodio &gt; cloro</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que el cloro es más grande porque tiene más protones y electrones que el sodio. En el mismo periodo, más protones encogen el átomo.</p>`,
    vidaReal: `
      <p>Saber qué tan fuerte sujeta cada elemento a sus partículas negativas explica cosas sorprendentes:</p>
      <ul>
        <li>El sodio y el potasio se guardan bajo aceite en los laboratorios, porque reaccionan hasta con la humedad del aire.</li>
        <li>El potasio reacciona con el agua todavía más fuerte que el sodio.</li>
        <li>El flúor de las pastas de dientes viene de un elemento que atrapa partículas negativas como ningún otro.</li>
        <li>Te permite predecir cómo se porta un elemento solo por su lugar en la tabla.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué átomo es más grande, el sodio (grupo 1) o el cloro (grupo 17)? Los dos están en el periodo 3.</p>',
        opciones: ['El sodio', 'El cloro', 'Miden lo mismo'], correcta: 0,
        pista: '<p>En un periodo, ¿el radio crece hacia la izquierda o hacia la derecha?</p>',
        solucion: '<p><strong>El sodio.</strong> El cloro tiene más protones jalando el mismo nivel, así que es más chico: 79 pm contra 190 pm.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué átomo es más grande, el sodio (periodo 3) o el potasio (periodo 4)? Los dos están en el grupo 1.</p>',
        opciones: ['El sodio', 'El potasio', 'Miden lo mismo'], correcta: 1,
        pista: '<p>Al bajar por un grupo, ¿se agregan o se quitan niveles?</p>',
        solucion: '<p><strong>El potasio</strong>: tiene un nivel de energía más, así que es más grande: 243 pm contra 190 pm.</p>' },
      { tipo: 'numero', enunciado: '<p>Según la tabla, ¿cuántos picómetros más grande es el átomo de sodio que el de cloro?</p>', respuesta: 190 - 79,
        pista: '<p>Resta los dos radios.</p>',
        solucion: '<p>190 − 79 = <strong>111 pm</strong>. El sodio mide más del doble que el cloro.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos elementos es el más electronegativo?</p>',
        opciones: ['El sodio', 'El potasio', 'El flúor', 'El litio'], correcta: 2,
        pista: '<p>La electronegatividad crece hacia arriba y a la derecha.</p>',
        solucion: '<p>El <strong>flúor</strong>, con 3.98, el más alto de toda la tabla. Los otros tres son metales del grupo 1, abajo a la izquierda en comparación.</p>' },
      { tipo: 'numero', enunciado: '<p>Según la tabla, ¿cuántos picómetros más grande es el potasio que el sodio?</p>', respuesta: 243 - 190,
        pista: '<p>Resta el radio del sodio al del potasio.</p>',
        solucion: '<p>243 − 190 = <strong>53 pm</strong>, por el nivel de energía de más que tiene el potasio.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué átomo suelta más fácil su electrón externo, el litio o el potasio?</p>',
        opciones: ['El litio', 'El potasio', 'Los dos igual'], correcta: 1,
        pista: '<p>¿Cuál es más grande? En el más grande, el electrón de afuera está más lejos del núcleo.</p>',
        solucion: '<p><strong>El potasio.</strong> Es más grande, y su electrón externo está lejos y sujeto con poca fuerza. Su energía de ionización es 419 kJ/mol, contra 520 del litio.</p>' },
    ],
    fuentes: [
      OSC('6-5-periodic-variations-in-element-properties', 'Periodic Variations in Element Properties'),
      WIKI('Radio_atómico', 'Radio atómico'),
      WIKI('Energía_de_ionización', 'Energía de ionización'),
      WIKI('Electronegatividad', 'Electronegatividad'),
      WIKI('Propiedades_periódicas', 'Propiedades periódicas'),
    ],
  });
})();
