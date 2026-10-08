// Química · Unidad 1: La materia.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const F = window.fraccion;
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('quimica', titulo, datos);
  // Flecha de un vector: línea hasta la base de la punta + triángulo sólido como punta.
  const flecha = (desde, hasta, serie = 0) => {
    const dx = hasta[0] - desde[0], dy = hasta[1] - desde[1], largo = Math.hypot(dx, dy);
    const ux = dx / largo, uy = dy / largo, h = 0.35, w = 0.17;
    const base = [hasta[0] - h * ux, hasta[1] - h * uy];
    return [
      { tipo: 'linea', desde, hasta: base, serie },
      { tipo: 'poligono', puntos: [hasta, [base[0] - w * uy, base[1] + w * ux], [base[0] + w * uy, base[1] - w * ux]], solido: true, serie },
    ];
  };
  const txt = (x, y, texto) => ({ tipo: 'texto', x, y, texto });
  const raya = (...puntos) => ({ tipo: 'poligono', puntos, abierto: true });
  const caja = (x0, y0, x1, y1) => ({ tipo: 'poligono', puntos: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], relleno: true });
  const diagrama = (x, y, figuras, descripcion) => G({ x, y, figuras, descripcion, proporcional: true, ejes: false });
  const bolita = ([x, y]) => ({ tipo: 'circulo', x, y, r: 0.27, relleno: true });

  const OSC = (pagina, nombre) => ({ nombre: `OpenStax, Chemistry 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/chemistry-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = { nombre: 'Khan Academy en español: Química', url: 'https://es.khanacademy.org/science/chemistry' };
  const PHET = (sim, nombre) => ({ nombre: `PhET, Universidad de Colorado: ${nombre}`, url: `https://phet.colorado.edu/es/simulations/${sim}` });

  // ------------------------------------------------------------------
  const ES_MATERIA = diagrama([-0.4, 9.4], [-0.4, 4.6], [
    caja(0, 0, 4, 3.6), caja(5, 0, 9, 3.6),
    txt(2, 4.1, 'Es materia'), txt(7, 4.1, 'No es materia'),
    txt(2, 2.8, 'el aire'), txt(2, 2.0, 'el agua'), txt(2, 1.2, 'una piedra'), txt(2, 0.4, 'el olor del pan'),
    txt(7, 2.8, 'la luz'), txt(7, 2.0, 'el calor'), txt(7, 1.2, 'el sonido'), txt(7, 0.4, 'una sombra'),
  ], 'Dos recuadros. El de la izquierda, titulado "Es materia", contiene el aire, el agua, una piedra y el olor del pan: todos tienen masa y ocupan espacio. El de la derecha, titulado "No es materia", contiene la luz, el calor, el sonido y una sombra.');

  L('Qué es la química', {
    objetivo: 'Saber qué estudia la química y reconocer qué cosas son materia y cuáles no.',
    explicacion: `
      <p>Mezclas harina, agua, sal y levadura, metes la masa al horno y sale pan. El pan ya no sabe a harina cruda, tiene costra dorada y por dentro está lleno de hoyitos. Y no hay forma de regresarlo a harina y agua. Algo cambió por dentro de esos ingredientes.</p>
      <p>La <strong>química</strong> es la ciencia que estudia de qué están hechas las cosas, cómo son y cómo se transforman en otras. La física, que ya conoces, se pregunta cómo se mueven las cosas y qué fuerzas las empujan. La química se pregunta qué son y en qué se pueden convertir.</p>
      <h3>¿Qué es la materia?</h3>
      <p>Todo lo que estudia la química es materia. La <strong>materia</strong> es todo lo que tiene masa y ocupa un lugar en el espacio. Tu mesa, el agua de tu vaso y tu propio cuerpo son materia: puedes pesarlos y no caben dos en el mismo lugar.</p>
      <p>Fíjate en algo que no se ve: el aire. Cuando inflas un globo, el aire ocupa el espacio de adentro y lo estira. Y el aire tiene masa: un metro cúbico de aire, una caja de un metro por lado, tiene una masa de 1.2 kg. El aire de una recámara puede tener tanta masa como un niño de primaria.</p>
      <p>En cambio, la luz, el calor y el sonido no son materia. No tienen masa ni ocupan espacio. Son formas de energía, o maneras en que la materia se mueve y vibra.</p>
      ${ES_MATERIA}
      <h3>Distintas clases de materia</h3>
      <p>La materia viene en muchas clases. El agua, la sal, el azúcar y el oro son materia, pero cada uno es distinto: tiene su propio color, sabor y forma de comportarse. A cada clase de materia con características propias, siempre las mismas, se le llama <strong>sustancia</strong>.</p>
      <p>Las sustancias pueden juntarse sin dejar de existir. Cuando el azúcar se disuelve en tu café, no desaparece: sigue ahí aunque no la veas, y lo sabes porque el café sabe dulce. Otras veces las sustancias sí se transforman en otras nuevas, como en el pan. Entender cuándo pasa cada cosa es justo el trabajo de la química.</p>
      <h3>Las ramas de la química</h3>
      <p>La química es tan grande que se divide en partes:</p>
      <ul>
        <li>La química orgánica estudia las sustancias que tienen carbono, como el azúcar, el plástico o la gasolina.</li>
        <li>La química inorgánica estudia las demás, como los metales, la sal y el agua.</li>
        <li>La bioquímica estudia las sustancias de los seres vivos, como las proteínas de la leche o lo que pasa al digerir la comida.</li>
        <li>La química analítica averigua qué hay en una muestra y cuánto, como al revisar si el agua de la llave es segura.</li>
      </ul>
      <p>Para responder sus preguntas, la química usa el mismo método científico que viste en física: observar, proponer una hipótesis y comprobarla con experimentos.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que "químico" quiere decir algo artificial o peligroso. El agua, el aire y tu cuerpo están hechos de sustancias químicas. Un producto "sin químicos" no existe: todo lo que tiene masa es química.</p>`,
    ejemplo: `
      <p>Estás en la cocina mientras se hornea pan. ¿Cuáles de estas cosas son materia: el vapor que sale de la olla, el olor del pan, el calor del horno y la sombra de tu mano?</p>
      <ol class="pasos-ej">
        <li>Para cada una, haz las dos preguntas de la definición: ¿tiene masa? ¿Ocupa espacio?</li>
        <li>El vapor es agua en forma de gas. Tiene masa y ocupa espacio, aunque se esparza. Es materia.</li>
        <li>El olor llega a tu nariz porque el pan suelta pedacitos diminutos de sus sustancias, que viajan por el aire. Esos pedacitos tienen masa. Es materia.</li>
        <li>El calor del horno es energía. No puedes llenar una caja con calor ni pesarlo. No es materia.</li>
        <li>La sombra es solo un lugar adonde no llega la luz. No es materia.</li>
      </ol>
      <p>Resultado: <span class="resultado">el vapor y el olor son materia; el calor y la sombra no</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que lo que no se ve no es materia. El aire, el vapor y los olores son invisibles, pero tienen masa.</p>`,
    vidaReal: `
      <p>Lo que estudia esta ciencia pasa en tu casa todos los días:</p>
      <ul>
        <li>Al cocinar, el calor convierte un huevo crudo en uno cocido y el azúcar en caramelo.</li>
        <li>Los jabones y el cloro funcionan por lo que les hacen a la grasa y a los gérmenes.</li>
        <li>Los medicamentos se diseñan para actuar dentro de tu cuerpo de una forma precisa.</li>
        <li>Al leer una etiqueta de comida, sabes qué estás comiendo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas cosas <strong>no</strong> es materia?</p>',
        opciones: ['El aire dentro de un globo', 'La luz de una lámpara', 'El agua de un vaso', 'El vidrio de una ventana'], correcta: 1,
        pista: '<p>Pregunta a cada una: ¿tiene masa y ocupa espacio?</p>',
        solucion: '<p><strong>La luz</strong> es una forma de energía: no tiene masa ni ocupa espacio. El aire, el agua y el vidrio sí son materia, aunque el aire no se vea.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama todo lo que tiene masa y ocupa un lugar en el espacio?</p>', respuestas: ['materia', 'la materia'],
        pista: '<p>Es la palabra que define de qué se ocupa la química.</p>',
        solucion: '<p>Se llama <strong>materia</strong>. Tu cuerpo, el aire y una piedra son materia.</p>' },
      { tipo: 'numero', enunciado: '<p>Un metro cúbico de aire tiene una masa de 1.2 kg. Una recámara mide 4 m de largo, 3 m de ancho y 2.5 m de alto. ¿Qué masa tiene el aire de la recámara, en kg?</p>',
        respuesta: 4 * 3 * 2.5 * 1.2,
        pista: '<p>Primero calcula cuántos metros cúbicos mide la recámara: largo × ancho × alto.</p>',
        solucion: '<p>La recámara mide 4 × 3 × 2.5 = 30 m³. Cada metro cúbico tiene 1.2 kg, así que el aire tiene 30 × 1.2 = <strong>36 kg</strong>. El aire no se ve, pero tiene masa.</p>' },
      { tipo: 'numero', enunciado: '<p>En un vaso hay 200 g de agua. Le echas 10 g de azúcar y la revuelves hasta que ya no se ve. ¿Cuál es la masa del agua con azúcar, en gramos?</p>',
        respuesta: 200 + 10,
        pista: '<p>¿El azúcar desaparece o sigue en el vaso aunque no la veas?</p>',
        solucion: '<p>El azúcar no desaparece: sigue en el agua, por eso sabe dulce. La masa total es 200 + 10 = <strong>210 g</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas preguntas es más propia de la química?</p>',
        opciones: ['¿A qué velocidad cae una piedra desde un puente?', '¿Por qué el hierro de una reja se vuelve café y se desmorona?', '¿Cuánto tarda la luz del Sol en llegar a la Tierra?', '¿Con qué fuerza hay que empujar una caja para moverla?'], correcta: 1,
        pista: '<p>La química se pregunta de qué están hechas las cosas y en qué se transforman.</p>',
        solucion: '<p>La pregunta <strong>del hierro que se vuelve café</strong> es química: el hierro se transforma en otra sustancia, el óxido. Las demás tratan de movimiento, fuerzas y luz, temas de la física.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué rama de la química estudia las sustancias de los seres vivos, como las proteínas de la leche?</p>',
        opciones: ['Química analítica', 'Bioquímica', 'Química inorgánica'], correcta: 1,
        pista: '<p>"Bio" quiere decir vida.</p>',
        solucion: '<p>Es la <strong>bioquímica</strong>, que estudia las sustancias de los seres vivos y lo que pasa con ellas, como al digerir la comida.</p>' },
    ],
    fuentes: [
      OSC('1-1-chemistry-in-context', 'Chemistry in Context'),
      WIKI('Química', 'Química'),
      WIKI('Materia', 'Materia'),
      KHAN,
    ],
  });

  // ------------------------------------------------------------------
  L('Propiedades de la materia', {
    objetivo: 'Distinguir las propiedades generales de las específicas y usar la densidad y los puntos de fusión y ebullición para reconocer una sustancia.',
    explicacion: `
      <p>En la cocina hay dos frascos sin etiqueta, y los dos tienen un polvo blanco en granitos. Uno es sal y el otro es azúcar. Sin probarlos, ¿cómo sabes cuál es cuál? Pon una pizca de cada uno en un sartén caliente. El azúcar se derrite y se vuelve caramelo café. La sal se queda igual. Cada sustancia tiene sus propias "señas", y con ellas la reconoces.</p>
      <p>A las características que puedes observar o medir en la materia se les llama propiedades. Hay dos tipos, y sirven para cosas muy distintas.</p>
      <h3>Propiedades que tiene todo</h3>
      <p>Toda la materia tiene masa y volumen, es decir, cuánta materia hay y cuánto espacio ocupa. Por eso se llaman <strong>propiedades generales</strong>. No sirven para reconocer una sustancia: un kilo de sal y un kilo de azúcar tienen la misma masa. Además dependen de cuánto tengas. Si tienes el doble de sal, tienes el doble de masa y el doble de volumen.</p>
      <h3>Propiedades que sirven de huella</h3>
      <p>Otras propiedades son distintas en cada sustancia y no cambian con la cantidad. Se llaman <strong>propiedades específicas</strong>, y funcionan como una huella digital. Las más útiles son estas:</p>
      <ul>
        <li>La densidad, que es cuánta masa hay en cada centímetro cúbico. Se calcula con ρ = ${F('m', 'V')}, la masa entre el volumen, como viste en la lección de densidad de física.</li>
        <li>El punto de fusión, que es la temperatura a la que un sólido se derrite.</li>
        <li>El punto de ebullición, que es la temperatura a la que un líquido hierve.</li>
        <li>Otras, como el color, el olor o si se disuelve en agua.</li>
      </ul>
      <p>Fíjate por qué no cambian con la cantidad. Un cubito de hielo y un bloque enorme de hielo se derriten los dos a 0 °C. Una cuchara de aluminio y una olla de aluminio tienen la misma densidad, porque la olla tiene más masa pero también más volumen, en la misma proporción. En otros libros verás a estas propiedades con el nombre de intensivas, y a las generales con el de extensivas.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Sustancia</th><th>Densidad (g/cm³)</th><th>Se funde a</th><th>Hierve a</th></tr>
        <tr><th>Agua</th><td>1.0</td><td>0 °C</td><td>100 °C</td></tr>
        <tr><th>Alcohol (etanol)</th><td>0.79</td><td>−114 °C</td><td>78 °C</td></tr>
        <tr><th>Sal de mesa</th><td>2.2</td><td>801 °C</td><td>1 465 °C</td></tr>
        <tr><th>Aluminio</th><td>2.7</td><td>660 °C</td><td>2 519 °C</td></tr>
        <tr><th>Hierro</th><td>7.9</td><td>1 538 °C</td><td>2 862 °C</td></tr>
      </table></div>
      <h3>Propiedades que se ven al transformarse</h3>
      <p>Hay propiedades que solo descubres cuando la sustancia se convierte en otra. Que el hierro se oxide con el aire húmedo, que el papel arda o que el azúcar se haga caramelo son ejemplos. Se llaman <strong>propiedades químicas</strong>. Las que se miden sin cambiar la sustancia, como la densidad o el color, se llaman propiedades físicas. Al medir la densidad de un trozo de hierro, sigue siendo hierro; al verlo oxidarse, ya no.</p>
      <p class="nota"><strong>Trampa común:</strong> usar la masa o el tamaño para saber qué es algo. Un anillo pequeño y un lingote grande pueden ser del mismo oro. Para reconocer una sustancia, usa propiedades que no dependan de cuánto hay, como la densidad.</p>`,
    ejemplo: `
      <p>Encuentras un cubo de metal plateado. Tiene 3 cm por lado y una masa de 72.9 g. ¿Es de aluminio o de hierro?</p>
      <ol class="pasos-ej">
        <li>El color y el tamaño no sirven: los dos metales son plateados y pueden tener cualquier tamaño. Necesitas una propiedad específica, la densidad.</li>
        <li>Primero calcula el volumen del cubo, multiplicando sus tres lados: 3 × 3 × 3 = 27 cm³.</li>
        <li>Ahora divide la masa entre el volumen para saber cuántos gramos hay en cada centímetro cúbico: ρ = 72.9 ÷ 27 = 2.7 g/cm³.</li>
        <li>Busca ese valor en la tabla: 2.7 g/cm³ es la densidad del aluminio. El hierro tiene 7.9.</li>
        <li>Comprueba al revés: 27 cm³ de aluminio tendrían 27 × 2.7 = 72.9 g, justo la masa del cubo.</li>
      </ol>
      <p>Resultado: <span class="resultado">es de aluminio</span>.</p>
      <p class="nota"><strong>Error común:</strong> dividir la masa entre un solo lado, 72.9 ÷ 3. El volumen de un cubo es lado × lado × lado.</p>`,
    vidaReal: `
      <p>Reconocer de qué está hecho algo sin romperlo ni probarlo es muy útil:</p>
      <ul>
        <li>En la cocina, la sal y el azúcar se ven iguales, pero en un sartén caliente se portan muy distinto.</li>
        <li>Los centros de reciclaje separan las latas de aluminio de las de hierro con un imán, porque solo el hierro se pega.</li>
        <li>Los bomberos saben qué materiales arden con facilidad y cuáles no.</li>
        <li>Los joyeros comprueban si una pieza es de oro sin dañarla.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un líquido transparente tiene una masa de 79 g y ocupa 100 cm³. ¿Cuál es su densidad, en g/cm³?</p>', respuesta: 79 / 100,
        pista: '<p>Divide la masa entre el volumen.</p>',
        solucion: '<p>ρ = 79 ÷ 100 = <strong>0.79 g/cm³</strong>. Según la tabla, es la densidad del alcohol.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un trozo de metal tiene una masa de 54 g y un volumen de 20 cm³. Según la tabla, ¿de qué metal es?</p>',
        opciones: ['Hierro', 'Aluminio', 'Ninguno de los dos'], correcta: 1,
        pista: '<p>Calcula su densidad y búscala en la tabla.</p>',
        solucion: '<p>ρ = 54 ÷ 20 = 2.7 g/cm³, la densidad del <strong>aluminio</strong>. Si fuera de hierro, tendría 7.9 g/cm³.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas es una propiedad general, que tiene toda la materia y no sirve para reconocer una sustancia?</p>',
        opciones: ['El punto de ebullición', 'La densidad', 'La masa', 'El punto de fusión'], correcta: 2,
        pista: '<p>Busca la que cambia si tienes más o menos cantidad.</p>',
        solucion: '<p><strong>La masa</strong> la tiene toda la materia y depende de cuánto hay. Las otras tres no cambian con la cantidad y sirven para reconocer una sustancia.</p>' },
      { tipo: 'numero', enunciado: '<p>Un cubito de hielo de 10 g se derrite a 0 °C. ¿A qué temperatura se derrite un bloque de hielo de 5 kg, en °C?</p>', respuesta: 0,
        pista: '<p>¿El punto de fusión depende de cuánto hielo hay?</p>',
        solucion: '<p>A <strong>0 °C</strong>. El punto de fusión es una propiedad específica: no cambia con la cantidad. El bloque tarda más en derretirse, pero empieza a la misma temperatura.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas es una propiedad química del hierro?</p>',
        opciones: ['Se oxida con el aire húmedo', 'Se funde a 1 538 °C', 'Su densidad es 7.9 g/cm³', 'Es de color gris plateado'], correcta: 0,
        pista: '<p>Una propiedad química solo se ve cuando la sustancia se convierte en otra.</p>',
        solucion: '<p><strong>Que se oxida</strong> es química: el hierro se convierte en óxido, una sustancia nueva. Al fundirlo, al medir su densidad o al mirar su color, sigue siendo hierro.</p>' },
      { tipo: 'numero', enunciado: '<p>Una pieza de hierro tiene una masa de 158 g. Usa la densidad de la tabla. ¿Cuál es su volumen, en cm³?</p>', respuesta: 158 / 7.9,
        pista: '<p>Cada centímetro cúbico de hierro tiene 7.9 g. ¿Cuántas veces caben 7.9 g en 158 g?</p>',
        solucion: '<p>V = m ÷ ρ = 158 ÷ 7.9 = <strong>20 cm³</strong>.</p>' },
    ],
    fuentes: [
      OSC('1-3-physical-and-chemical-properties', 'Physical and Chemical Properties'),
      WIKI('Propiedades_intensivas_y_extensivas', 'Propiedades intensivas y extensivas'),
      WIKI('Punto_de_ebullición', 'Punto de ebullición'),
      PHET('density', 'Densidad'),
    ],
  });

  // ------------------------------------------------------------------
  const SOLIDO = [0.6, 1.2, 1.8, 2.4].flatMap((x) => [0.35, 0.95, 1.55, 2.15].map((y) => [x, y]));
  const LIQUIDO = [[3.85, 0.35], [4.45, 0.32], [5.05, 0.38], [5.65, 0.33], [6.2, 0.36], [4.1, 0.9],
    [4.75, 0.88], [5.35, 0.95], [5.95, 0.86], [4.4, 1.45], [5.1, 1.5]];
  const GAS = [[7.6, 2.4], [9.3, 2.0], [8.3, 1.2], [7.5, 0.5], [9.4, 0.6]];
  const ESTADOS = diagrama([-0.4, 10.4], [-1.5, 3.2], [
    raya([0, 3], [0, 0], [3, 0], [3, 3]), raya([3.5, 3], [3.5, 0], [6.5, 0], [6.5, 3]), raya([7, 3], [7, 0], [10, 0], [10, 3]),
    ...SOLIDO.map(bolita), ...LIQUIDO.map(bolita), ...GAS.map(bolita),
    txt(1.5, -0.45, 'Sólido'), txt(5, -0.45, 'Líquido'), txt(8.5, -0.45, 'Gas'),
    txt(1.5, -1.05, 'juntas, en orden'), txt(5, -1.05, 'juntas, se deslizan'), txt(8.5, -1.05, 'separadas'),
  ], 'Tres recipientes vistos de frente, con las partículas dibujadas como bolitas. Sólido: 16 bolitas pegadas y acomodadas en filas y columnas, en orden. Líquido: 11 bolitas juntas pero desordenadas, en el fondo del recipiente. Gas: 5 bolitas muy separadas, repartidas por todo el recipiente.');

  L('Estados de agregación', {
    objetivo: 'Describir los estados sólido, líquido y gaseoso con el modelo de partículas y predecir el estado de una sustancia a cierta temperatura.',
    explicacion: `
      <p>El hielo de tu vaso, el agua que te tomas y el vapor que sale de la olla son la misma sustancia. Pero se portan muy distinto. El hielo conserva su forma. El agua se derrama y toma la forma del vaso. El vapor se escapa y se esparce por la cocina.</p>
      <p>A cada una de estas formas en que puede estar la materia se le llama <strong>estado de agregación</strong>. Los tres más comunes son sólido, líquido y gas. Para entender por qué se portan distinto, hay que imaginar cómo es la materia por dentro.</p>
      <h3>La materia vista muy de cerca</h3>
      <p>Imagina que pudieras ver un pedazo de materia con un microscopio muchísimo más potente que cualquiera de la escuela. Verías que está hecha de partículas diminutas, como bolitas. Esta forma de imaginar la materia se llama <strong>modelo de partículas</strong>, y dice tres cosas:</p>
      <ul>
        <li>Toda la materia está hecha de partículas muy pequeñas, con espacio vacío entre ellas.</li>
        <li>Las partículas siempre se están moviendo. Entre más caliente está algo, más rápido se mueven.</li>
        <li>Las partículas se atraen unas a otras, como si tuvieran un imán débil.</li>
      </ul>
      ${ESTADOS}
      <h3>Los tres estados, partícula por partícula</h3>
      <p>En un sólido, las partículas están pegadas y acomodadas en orden, como los huevos en un cartón. Solo vibran en su lugar, sin cambiar de sitio. Por eso un sólido tiene forma y volumen fijos.</p>
      <p>En un líquido, las partículas siguen juntas, pero pueden deslizarse unas sobre otras, como canicas en una bolsa. Por eso un líquido conserva su volumen, pero toma la forma del recipiente.</p>
      <p>En un gas, las partículas están muy separadas y se mueven rápido en todas direcciones, chocando con las paredes. Como casi no se atraen, se reparten por todo el espacio que tengan. Por eso un gas no tiene forma ni volumen propios: llena cualquier recipiente.</p>
      <h3>¿Se puede apretar?</h3>
      <p>Tapa la punta de una jeringa llena de aire y empuja el émbolo: baja bastante. Con agua, casi no se mueve. A la facilidad con que algo se deja apretar para ocupar menos espacio se le llama <strong>compresibilidad</strong>. Los gases son muy compresibles, porque entre sus partículas hay mucho espacio vacío. En los sólidos y los líquidos, las partículas ya están juntas y no hay dónde meterlas.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Estado</th><th>Forma</th><th>Volumen</th><th>¿Se puede apretar?</th></tr>
        <tr><th>Sólido</th><td>Propia</td><td>Propio</td><td>Casi nada</td></tr>
        <tr><th>Líquido</th><td>La del recipiente</td><td>Propio</td><td>Casi nada</td></tr>
        <tr><th>Gas</th><td>La del recipiente</td><td>El del recipiente</td><td>Mucho</td></tr>
      </table></div>
      <h3>¿En qué estado está?</h3>
      <p>Con los puntos de fusión y ebullición de la lección anterior puedes predecir el estado. Por debajo del punto de fusión, la sustancia es sólida. Entre los dos puntos, es líquida. Por encima del punto de ebullición, es gas. Los nombres de cada paso, como fusión o condensación, los viste en la lección de cambios de estado de física. Existe además un cuarto estado, el plasma, un gas tan caliente que brilla, como en los rayos o en el Sol.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que al hervir el agua sus partículas se hacen más grandes. Las partículas son las mismas y del mismo tamaño; lo que cambia es cuánto se separan y qué tan rápido se mueven.</p>`,
    ejemplo: `
      <p>¿En qué estado está el alcohol en un día de 25 °C? ¿Y el hierro en un horno de 1 600 °C?</p>
      <ol class="pasos-ej">
        <li>Busca en la tabla de la lección anterior los dos puntos del alcohol: se funde a −114 °C y hierve a 78 °C.</li>
        <li>Compara: 25 °C está por encima de −114 °C, así que ya no es sólido. Y está por debajo de 78 °C, así que todavía no hierve. Está entre los dos puntos: es líquido.</li>
        <li>Ahora el hierro: se funde a 1 538 °C y hierve a 2 862 °C. El horno, a 1 600 °C, ya pasó el punto de fusión, pero no el de ebullición. El hierro está líquido.</li>
        <li>Comprueba con lo que conoces: el alcohol de tu botiquín es líquido a temperatura ambiente, y en las fundidoras el hierro se vierte como un líquido brillante.</li>
      </ol>
      <p>Resultado: <span class="resultado">los dos están en estado líquido</span>.</p>
      <p class="nota"><strong>Error común:</strong> comparar la temperatura con un solo punto. Para saber si es líquido, revisa que esté por encima del de fusión y por debajo del de ebullición.</p>`,
    vidaReal: `
      <p>Que el agua, el hielo y el vapor se porten distinto explica muchas cosas cotidianas:</p>
      <ul>
        <li>Las llantas se llenan de aire porque el aire se deja apretar y amortigua los golpes.</li>
        <li>El perfume que alguien se pone en la entrada llega pronto a todo el cuarto.</li>
        <li>Los frenos de un coche usan un líquido porque no se deja apretar y transmite la fuerza.</li>
        <li>Puedes servir agua en cualquier vaso, pero un hielo no cabe si es muy grande.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué estado toma la forma del recipiente pero conserva su volumen?</p>',
        opciones: ['Sólido', 'Líquido', 'Gas'], correcta: 1,
        pista: '<p>Piensa en un litro de agua que pasas de una botella a una jarra.</p>',
        solucion: '<p>El <strong>líquido</strong>. Sus partículas se deslizan, así que toma la forma del recipiente, pero siguen juntas, así que el volumen no cambia.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tienes dos jeringas con la punta tapada: una llena de aire y otra llena de agua. ¿En cuál puedes empujar el émbolo bastante?</p>',
        opciones: ['Solo en la de aire', 'Solo en la de agua', 'En las dos por igual'], correcta: 0,
        pista: '<p>¿En cuál hay más espacio vacío entre las partículas?</p>',
        solucion: '<p><strong>Solo en la de aire.</strong> Entre las partículas de un gas hay mucho espacio vacío, así que se pueden acercar. En el agua ya están juntas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿En qué estado de agregación las partículas están muy separadas y llenan todo el recipiente?</p>', respuestas: ['gas', 'gaseoso', 'el gas', 'estado gaseoso', 'el estado gaseoso', 'gases'],
        pista: '<p>Es el estado del vapor y del aire.</p>',
        solucion: '<p>En el <strong>gas</strong>. Sus partículas casi no se atraen, así que se reparten por todo el espacio.</p>' },
      { tipo: 'opciones', enunciado: '<p>La sal de mesa se funde a 801 °C y hierve a 1 465 °C. ¿En qué estado está a 1 000 °C?</p>',
        opciones: ['Sólido', 'Líquido', 'Gas'], correcta: 1,
        pista: '<p>Compara 1 000 °C con los dos puntos.</p>',
        solucion: '<p>1 000 °C está por encima de 801 °C y por debajo de 1 465 °C. La sal está entre los dos puntos: es <strong>líquida</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Pasas 1 litro de agua de una botella a una jarra de 3 litros. ¿Cuántos litros ocupa el agua en la jarra?</p>', respuesta: 1,
        pista: '<p>Un líquido cambia de forma, pero ¿cambia su volumen?</p>',
        solucion: '<p>Ocupa <strong>1 litro</strong>. El líquido toma la forma de la jarra, pero conserva su volumen: no llena los 3 litros.</p>' },
      { tipo: 'numero', enunciado: '<p>Un tanque de 20 litros lleno de gas se conecta con un tubo a otro tanque vacío de 30 litros. Abres la llave y esperas. ¿Cuántos litros ocupa el gas ahora?</p>', respuesta: 20 + 30,
        pista: '<p>Un gas no tiene volumen propio: llena todo el espacio que tenga.</p>',
        solucion: '<p>El gas se reparte por los dos tanques: ocupa 20 + 30 = <strong>50 litros</strong>. Sus partículas quedan más separadas que antes.</p>' },
    ],
    fuentes: [
      OSC('1-2-phases-and-classification-of-matter', 'Phases and Classification of Matter'),
      WIKI('Estado_de_agregación_de_la_materia', 'Estado de agregación de la materia'),
      PHET('states-of-matter-basics', 'Estados de la materia: Básico'),
    ],
  });

  // ------------------------------------------------------------------
  const ARBOL = diagrama([-0.4, 10.4], [0, 4.6], [
    txt(5, 4.1, 'Materia'),
    raya([4.4, 3.8], [2.5, 3.1]), raya([5.6, 3.8], [7.5, 3.1]),
    txt(2.5, 2.7, 'Sustancia pura'), txt(7.5, 2.7, 'Mezcla'),
    raya([2.1, 2.4], [1.2, 1.7]), raya([2.9, 2.4], [3.8, 1.7]), raya([7.1, 2.4], [6.2, 1.7]), raya([7.9, 2.4], [8.8, 1.7]),
    txt(1.2, 1.3, 'Elemento'), txt(3.8, 1.3, 'Compuesto'), txt(6.2, 1.3, 'Homogénea'), txt(8.8, 1.3, 'Heterogénea'),
    txt(1.2, 0.5, 'oro'), txt(3.8, 0.5, 'agua'), txt(6.2, 0.5, 'agua con sal'), txt(8.8, 0.5, 'ensalada'),
  ], 'Un árbol de clasificación. Arriba, "Materia", que se divide en dos ramas: "Sustancia pura" y "Mezcla". Sustancia pura se divide en "Elemento", con el ejemplo del oro, y "Compuesto", con el ejemplo del agua. Mezcla se divide en "Homogénea", con el ejemplo del agua con sal, y "Heterogénea", con el ejemplo de una ensalada.');

  L('Sustancias puras y mezclas', {
    objetivo: 'Clasificar la materia en sustancias puras y mezclas, distinguir mezclas homogéneas de heterogéneas y calcular el porcentaje de un ingrediente en una mezcla.',
    explicacion: `
      <p>Piensa en tres cosas de la cocina: un vaso de agua, un vaso de agua con sal y un plato de cereal con leche. En el cereal ves los pedazos y la leche por separado. En el agua con sal no ves la sal, pero sabe salada. Y el agua sola es solo agua. Las tres son materia, pero no son el mismo tipo de materia.</p>
      <h3>Sustancias puras</h3>
      <p>Una <strong>sustancia pura</strong> es materia hecha de una sola sustancia. Toda ella es igual y tiene siempre las mismas propiedades: el agua pura hierve a 100 °C, venga de donde venga.</p>
      <p>En física viste que toda la materia está hecha de átomos, unas partículas diminutas que conocerás a fondo en la siguiente unidad. Según sus átomos, las sustancias puras son de dos tipos:</p>
      <ul>
        <li>Un elemento está hecho de una sola clase de átomo y no se puede separar en sustancias más simples. El oro (Au), el hierro (Fe) y el oxígeno que respiras (O₂) son elementos.</li>
        <li>Un compuesto está hecho de dos o más elementos unidos, siempre en la misma proporción. El agua (H₂O) es un compuesto. Su fórmula dice que cada partícula de agua tiene 2 átomos de hidrógeno (H) y 1 de oxígeno (O). La sal de mesa (NaCl) y el dióxido de carbono que exhalas (CO₂) también son compuestos.</li>
      </ul>
      <p>Fíjate en cómo se lee una fórmula: las letras dicen qué elementos hay y el numerito de abajo dice cuántos átomos de cada uno. Si no hay número, es uno. Por eso CO₂ tiene 1 átomo de carbono y 2 de oxígeno.</p>
      <h3>Mezclas</h3>
      <p>Una mezcla es lo que obtienes al juntar dos o más sustancias sin que se conviertan en otras. Cada una conserva sus propiedades: el agua con sal sigue sabiendo a sal. Además, puedes poner más o menos de cada una: el agua puede llevar una pizca de sal o mucha.</p>
      <p>Si la mezcla se ve igual en todas sus partes, aunque la mires con lupa, es una <strong>mezcla homogénea</strong>. "Homo" quiere decir igual. El agua con sal, el aire y el café son homogéneos. Si puedes distinguir sus partes, es una <strong>mezcla heterogénea</strong>, porque "hetero" quiere decir distinto. El cereal con leche, la ensalada y la arena con piedritas son heterogéneos.</p>
      ${ARBOL}
      <h3>¿Cuánto hay de cada cosa?</h3>
      <p>Como una mezcla puede llevar más o menos de cada ingrediente, conviene decir cuánto lleva. Se usa un porcentaje, igual que en matemáticas:</p>
      <p>porcentaje = ${F('masa del ingrediente', 'masa total de la mezcla')} × 100</p>
      <p>Se lee "la masa del ingrediente entre la masa de toda la mezcla, por cien". Si disuelves 20 g de sal en 180 g de agua, la mezcla pesa 200 g, y la sal es 20 ÷ 200 × 100 = 10%.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que lo transparente es una sustancia pura. El agua de la llave es transparente, pero lleva sales y aire disueltos: es una mezcla homogénea.</p>`,
    ejemplo: `
      <p>Preparas agua de limón con 40 g de azúcar y 460 g de agua con jugo de limón. ¿Qué porcentaje de la bebida es azúcar? ¿Qué tipo de materia es?</p>
      <ol class="pasos-ej">
        <li>Primero encuentra la masa total, porque el porcentaje se calcula sobre toda la mezcla: 40 + 460 = 500 g.</li>
        <li>Divide la masa del azúcar entre la total para saber qué parte es: 40 ÷ 500 = 0.08.</li>
        <li>Multiplica por 100 para decirlo "de cada cien": 0.08 × 100 = 8%.</li>
        <li>Clasifícala: lleva varias sustancias, así que es una mezcla. Si la cuelas y queda transparente, sin pulpa, se ve igual en todas partes: es homogénea.</li>
        <li>Comprueba al revés: el 8% de 500 g es 500 × 0.08 = 40 g de azúcar.</li>
      </ol>
      <p>Resultado: <span class="resultado">8% de azúcar; es una mezcla homogénea</span>.</p>
      <p class="nota"><strong>Error común:</strong> dividir 40 ÷ 460, entre el agua sola. El porcentaje se calcula sobre la masa de toda la mezcla.</p>`,
    vidaReal: `
      <p>Saber de qué está hecho lo que usas te ayuda a decidir mejor:</p>
      <ul>
        <li>Las etiquetas de los refrescos dicen cuántos gramos de azúcar llevan, y puedes calcular qué parte de la bebida es azúcar.</li>
        <li>Las joyas de "oro de 14 quilates" no son de oro puro: llevan otros metales.</li>
        <li>El suero para la diarrea debe llevar la cantidad justa de sal y azúcar para funcionar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas es una mezcla heterogénea?</p>',
        opciones: ['Agua destilada', 'Aire limpio', 'Una piedra de granito, con manchas de varios colores', 'Una barra de oro puro'], correcta: 2,
        pista: '<p>Busca aquella en la que puedes ver partes distintas.</p>',
        solucion: '<p>El <strong>granito</strong>: se ven granos de distintos minerales. El aire es una mezcla homogénea, y el agua destilada y el oro puro son sustancias puras.</p>' },
      { tipo: 'numero', enunciado: '<p>La fórmula del agua es H₂O. ¿Cuántos átomos en total tiene una partícula de agua?</p>', respuesta: 2 + 1,
        pista: '<p>El 2 va con el hidrógeno. Si una letra no tiene número, es un átomo.</p>',
        solucion: '<p>Tiene 2 átomos de hidrógeno y 1 de oxígeno: 2 + 1 = <strong>3 átomos</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una lata de refresco tiene una masa de 355 g, y 39 g son azúcar. ¿Qué porcentaje del refresco es azúcar? Redondea a un número entero.</p>',
        respuesta: 39 / 355 * 100, tolerancia: 0.5,
        pista: '<p>Divide la masa del azúcar entre la masa total y multiplica por 100.</p>',
        solucion: '<p>39 ÷ 355 = 0.11, y 0.11 × 100 = <strong>11%</strong>. Más de la décima parte del refresco es azúcar.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la mezcla que se ve igual en todas sus partes, como el agua con sal? Escribe la palabra que falta: mezcla ____.</p>',
        respuestas: ['homogénea', 'mezcla homogénea'],
        pista: '<p>Empieza con "homo", que quiere decir igual.</p>',
        solucion: '<p>Es una mezcla <strong>homogénea</strong>: no puedes distinguir sus partes ni con lupa.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas sustancias es un compuesto?</p>',
        opciones: ['O₂, el oxígeno', 'CO₂, el dióxido de carbono', 'Fe, el hierro', 'Au, el oro'], correcta: 1,
        pista: '<p>Un compuesto tiene átomos de dos o más elementos distintos. Fíjate en cuántas letras mayúsculas tiene la fórmula.</p>',
        solucion: '<p>El <strong>CO₂</strong> tiene carbono (C) y oxígeno (O), dos elementos distintos. El O₂ tiene dos átomos, pero los dos son de oxígeno, así que es un elemento.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tomas agua de mar, la filtras y queda transparente, pero sigue sabiendo salada. ¿Qué es?</p>',
        opciones: ['Un elemento', 'Un compuesto', 'Una mezcla homogénea', 'Una mezcla heterogénea'], correcta: 2,
        pista: '<p>¿Tiene una sola sustancia o varias? ¿Puedes ver sus partes?</p>',
        solucion: '<p>Es una <strong>mezcla homogénea</strong>: tiene agua y sal (por eso sabe salada), pero no puedes distinguirlas a simple vista.</p>' },
    ],
    fuentes: [
      OSC('1-2-phases-and-classification-of-matter', 'Phases and Classification of Matter'),
      WIKI('Sustancia_química', 'Sustancia química'),
      WIKI('Mezcla', 'Mezcla'),
      WIKI('Mezcla_homogénea', 'Mezcla homogénea'),
    ],
  });

  // ------------------------------------------------------------------
  const FILTRO = diagrama([-0.5, 8.2], [-0.5, 6], [
    raya([0.6, 5], [1.9, 3], [1.9, 2.2]), raya([3.4, 5], [2.1, 3], [2.1, 2.2]),
    { tipo: 'linea', desde: [0.95, 4.9], hasta: [2, 3.2], punteada: true }, { tipo: 'linea', desde: [2, 3.2], hasta: [3.05, 4.9], punteada: true },
    ...[[1.8, 3.95], [2.2, 3.95], [2, 4.27]].map(([x, y]) => ({ tipo: 'circulo', x, y, r: 0.16, relleno: true })),
    { tipo: 'linea', desde: [2, 2.1], hasta: [2, 1.0], punteada: true },
    raya([1, 1.8], [1, 0], [3, 0], [3, 1.8]), caja(1, 0, 3, 0.7),
    txt(2, 5.5, 'mezcla'),
    { tipo: 'linea', desde: [2.9, 4.6], hasta: [4.2, 4.6] }, txt(5.7, 4.6, 'papel filtro'),
    { tipo: 'linea', desde: [2.4, 3.95], hasta: [4.2, 3.6] }, txt(5.9, 3.6, 'sólido retenido'),
    { tipo: 'linea', desde: [3.1, 0.4], hasta: [4.2, 0.4] }, txt(5.9, 0.4, 'líquido filtrado'),
  ], 'Una filtración. Arriba, un embudo con un papel filtro doblado en forma de cono, marcado con línea punteada; la mezcla se vierte encima. Unas bolitas de sólido se quedan atrapadas en el papel, rotuladas "sólido retenido". Debajo del embudo, una línea punteada de gotas cae a un vaso, donde se junta el "líquido filtrado".');

  const DESTILACION = diagrama([-0.4, 7.6], [-1.6, 3.9], [
    { tipo: 'circulo', x: 1.5, y: 1.2, r: 0.9 }, raya([1.35, 2.08], [1.35, 3]), raya([1.65, 2.08], [1.65, 3]),
    txt(1.5, 1.2, 'mezcla'),
    { tipo: 'linea', desde: [1.5, 3], hasta: [6.2, 1.433] },
    { tipo: 'poligono', puntos: [[3.095, 2.785], [5.095, 2.118], [4.905, 1.548], [2.905, 2.215]] },
    raya([5.5, 1.2], [5.5, 0], [6.9, 0], [6.9, 1.2]), caja(5.5, 0, 6.9, 0.4),
    ...flecha([1.5, -1.1], [1.5, 0.2]), txt(2.4, -0.7, 'calor'),
    txt(2.1, 3.5, 'vapor'), txt(4.5, 3.2, 'agua fría'), txt(6.2, -0.45, 'destilado'),
  ], 'Una destilación simple. A la izquierda, un matraz redondo con la mezcla; una flecha rotulada "calor" apunta hacia él desde abajo. Del cuello del matraz sale un tubo inclinado hacia abajo y a la derecha, por donde viaja el vapor. A la mitad, el tubo pasa por dentro de un tubo más ancho rotulado "agua fría", donde el vapor se enfría y vuelve a ser líquido. El tubo termina sobre un vaso a la derecha, donde se junta el líquido, rotulado "destilado".');

  L('Métodos de separación de mezclas', {
    objetivo: 'Elegir el método adecuado para separar una mezcla según la propiedad en que se distinguen sus componentes.',
    explicacion: `
      <p>Cuando cocinas pasta, la vacías en un colador. El agua pasa por los agujeritos y la pasta se queda arriba. Acabas de separar una mezcla, y lo lograste porque el agua y la pasta tienen tamaños muy distintos.</p>
      <p>Esa es la idea de todos los métodos de separación. Como en una mezcla cada sustancia conserva sus propiedades, puedes aprovechar una propiedad en la que sean distintas: el tamaño, la densidad, la temperatura a la que hierven o si las atrae un imán. Elegir el método es encontrar esa diferencia.</p>
      <h3>Separar por tamaño</h3>
      <p>La <strong>filtración</strong> separa un sólido que no se disuelve de un líquido. La mezcla se vierte sobre un papel filtro, un papel con poros tan finos que deja pasar el líquido pero no los granitos del sólido. Así separas la arena del agua, o el café molido del café que te vas a tomar.</p>
      ${FILTRO}
      <p>Ojo: la filtración no sirve para el agua con sal. La sal disuelta se reparte en partículas tan pequeñas como las del agua, y pasa por el papel junto con ella.</p>
      <h3>Separar por densidad</h3>
      <p>Si mezclas agua y aceite y esperas, el aceite sube y el agua queda abajo, porque el aceite es menos denso. Luego viertes con cuidado la capa de arriba en otro recipiente. Este método se llama <strong>decantación</strong>. También sirve para un sólido pesado en un líquido: dejas que se asiente en el fondo y viertes el líquido de arriba.</p>
      <h3>Separar por punto de ebullición</h3>
      <p>Para quitar la sal del agua, puedes calentarla hasta que el agua se evapore toda. La sal se queda en el fondo, porque hierve a una temperatura muchísimo más alta. Así se obtiene la sal en las salinas. Pero el agua se pierde en el aire.</p>
      <p>Si quieres quedarte con el agua, usa la <strong>destilación</strong>. Se calienta la mezcla, el agua se vuelve vapor y viaja por un tubo que pasa por agua fría. Ahí el vapor se enfría, vuelve a ser líquido y cae en otro recipiente. Al líquido que se junta se le llama destilado. Funciona porque las sustancias de la mezcla hierven a temperaturas distintas: la que hierve primero se va antes.</p>
      ${DESTILACION}
      <h3>Otros métodos</h3>
      <ul>
        <li>La imantación usa un imán para sacar el hierro de una mezcla, porque las demás sustancias no se pegan.</li>
        <li>La cromatografía separa colorantes. Si pones una gota de tinta en un papel y mojas la orilla, el agua sube y arrastra cada colorante a distinta altura.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> pensar que un método sirve para todo. El colador no separa el azúcar del café, y un imán no separa la arena del agua. Primero pregúntate en qué se distinguen las sustancias.</p>`,
    ejemplo: `
      <p>Tienes un frasco con arena, sal y agua revueltas. ¿Cómo recuperas la arena y la sal por separado?</p>
      <ol class="pasos-ej">
        <li>Fíjate en qué se distinguen. La arena no se disuelve; la sal sí, y está repartida en el agua.</li>
        <li>Primero filtra. La arena se queda en el papel, porque sus granos son grandes. El agua pasa, y con ella la sal disuelta.</li>
        <li>Ahora calienta el líquido filtrado hasta que el agua se evapore. La sal hierve a una temperatura mucho más alta, así que se queda en el fondo del recipiente.</li>
        <li>Si también quisieras el agua, en lugar de evaporarla la destilarías.</li>
        <li>Comprueba: la masa de la arena seca, la de la sal y la del agua que había deben sumar la masa de la mezcla original.</li>
      </ol>
      <p>Resultado: <span class="resultado">primero filtrar, después evaporar</span>.</p>
      <p class="nota"><strong>Error común:</strong> evaporar primero. Te quedaría la sal revuelta con la arena en el fondo, y tendrías que empezar de nuevo.</p>`,
    vidaReal: `
      <p>Separar cosas revueltas es algo que haces más seguido de lo que crees:</p>
      <ul>
        <li>La cafetera de goteo separa el café que te tomas del café molido.</li>
        <li>Las plantas potabilizadoras dejan que la tierra del agua se asiente y luego la pasan por capas de arena.</li>
        <li>En las salinas, el sol seca el agua de mar y deja la sal.</li>
        <li>Los centros de reciclaje sacan las latas de hierro de la basura con imanes gigantes.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Quieres separar agua y aceite de cocina. ¿Qué método usas?</p>',
        opciones: ['Filtración', 'Decantación', 'Imantación', 'Cromatografía'], correcta: 1,
        pista: '<p>El aceite y el agua no se mezclan y tienen densidades distintas.</p>',
        solucion: '<p><strong>Decantación.</strong> El aceite, menos denso, queda arriba, y lo viertes con cuidado en otro recipiente. El aceite pasaría por un filtro junto con el agua.</p>' },
      { tipo: 'opciones', enunciado: '<p>Se te cayeron unos clavos de hierro diminutos en la arena. ¿Qué método es el más rápido para separarlos?</p>',
        opciones: ['Imantación', 'Filtración', 'Decantación', 'Destilación'], correcta: 0,
        pista: '<p>¿Qué propiedad tiene el hierro que la arena no tiene?</p>',
        solucion: '<p><strong>Imantación.</strong> El imán atrae el hierro y no la arena.</p>' },
      { tipo: 'opciones', enunciado: '<p>Quieres obtener agua pura para beber a partir de agua de mar, sin perder el agua. ¿Qué método usas?</p>',
        opciones: ['Filtración', 'Evaporación', 'Destilación', 'Decantación'], correcta: 2,
        pista: '<p>La sal está disuelta. ¿Qué método convierte el agua en vapor y luego la vuelve a juntar?</p>',
        solucion: '<p><strong>Destilación.</strong> El agua hierve, el vapor se enfría en el tubo y se junta como agua pura. Al evaporar, el agua se perdería en el aire, y el filtro deja pasar la sal disuelta.</p>' },
      { tipo: 'numero', enunciado: '<p>Tienes 500 g de agua de mar, y el 3.5% de su masa es sal. Si evaporas toda el agua, ¿cuántos gramos de sal te quedan?</p>',
        respuesta: 500 * 3.5 / 100, tolerancia: 0.05,
        pista: '<p>Calcula el 3.5% de 500 g: multiplica por 0.035.</p>',
        solucion: '<p>500 × 0.035 = <strong>17.5 g</strong> de sal. El agua se va como vapor y la sal se queda.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿En qué orden separas una mezcla de arena, sal y agua para quedarte con la arena y con la sal?</p>',
        opciones: ['Primero evaporar el agua y después filtrar', 'Primero filtrar la arena y después evaporar el agua', 'Primero decantar y después usar un imán', 'Solo filtrar'], correcta: 1,
        pista: '<p>¿Qué queda en el papel filtro y qué pasa a través de él?</p>',
        solucion: '<p><strong>Primero filtrar, después evaporar.</strong> El filtro detiene la arena y deja pasar el agua con la sal; al evaporar el agua, queda la sal. Si evaporas primero, la sal y la arena quedan revueltas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿En qué propiedad se basa la destilación?</p>',
        opciones: ['En el tamaño de las partículas', 'En que las sustancias hierven a temperaturas distintas', 'En que una sustancia es atraída por un imán', 'En el color de las sustancias'], correcta: 1,
        pista: '<p>En la destilación se calienta la mezcla hasta que una parte se vuelve vapor.</p>',
        solucion: '<p>En que <strong>hierven a temperaturas distintas</strong>. La sustancia que hierve primero se vuelve vapor y se separa de las demás.</p>' },
    ],
    fuentes: [
      OSC('1-2-phases-and-classification-of-matter', 'Phases and Classification of Matter'),
      WIKI('Métodos_de_separación_de_fases', 'Métodos de separación de fases'),
      WIKI('Destilación', 'Destilación'),
      WIKI('Filtración', 'Filtración'),
    ],
  });

  // ------------------------------------------------------------------
  L('Cambios físicos y químicos', {
    objetivo: 'Distinguir un cambio físico de uno químico por sus señales y usar la conservación de la masa para calcular masas antes y después de un cambio.',
    explicacion: `
      <p>Toma una hoja de papel y rómpela en pedacitos. Cada pedacito sigue siendo papel: puedes escribir en él. Ahora imagina que quemas otra hoja. Queda ceniza negra y sale humo. Eso ya no es papel, y no hay forma de que vuelva a serlo.</p>
      <h3>Cuando la sustancia sigue siendo la misma</h3>
      <p>Un <strong>cambio físico</strong> cambia la forma, el tamaño o el estado de la materia, pero la sustancia sigue siendo la misma. Romper papel, derretir hielo, doblar un alambre o disolver azúcar en agua son cambios físicos. Si derrites un hielo, el líquido sigue siendo agua; si lo vuelves a congelar, regresas al hielo. Muchos cambios físicos se pueden deshacer así.</p>
      <h3>Cuando se forma algo nuevo</h3>
      <p>Un <strong>cambio químico</strong> transforma unas sustancias en otras nuevas, con propiedades distintas. Al quemar papel, el papel y el oxígeno del aire se convierten en ceniza, humo y gases. Cocinar un huevo, oxidarse un clavo, agriarse la leche o hornear pan también son cambios químicos. A un cambio químico también se le llama reacción química.</p>
      <p>No puedes ver las partículas, pero hay señales que te avisan que se formó algo nuevo:</p>
      <ul>
        <li>Salen burbujas de un gas que antes no estaba, como al echar vinagre al bicarbonato.</li>
        <li>Cambia el color, como la manzana partida que se pone café.</li>
        <li>Se suelta luz o calor, como en una fogata.</li>
        <li>Aparece un sólido al juntar dos líquidos, o un olor nuevo, como el de la leche agria.</li>
      </ul>
      <p>Las señales ayudan, pero hay que pensar. El agua que hierve suelta burbujas y, sin embargo, es un cambio físico, porque el vapor sigue siendo agua. La pregunta de fondo siempre es: ¿al final hay una sustancia nueva?</p>
      <h3>La masa no desaparece</h3>
      <p>Cuando se quema un tronco, queda un montoncito de ceniza que pesa mucho menos. ¿Desapareció materia? No. Lo que falta se fue al aire como humo y gases. Si quemaras el tronco dentro de una caja cerrada y pesaras todo, la masa sería la misma antes y después.</p>
      <p>A esta regla se le llama <strong>conservación de la masa</strong>: en un cambio químico, la masa total de lo que había al principio es igual a la masa total de lo que hay al final. Se debe a que los átomos no se crean ni se destruyen; solo se acomodan de otra forma, como las mismas piezas de un juego de construcción armadas en otra figura. La descubrió el químico francés Antoine Lavoisier, pesando con mucho cuidado sus experimentos en recipientes cerrados.</p>
      <p>Por ejemplo, si 10 g de bicarbonato reaccionan con 50 g de vinagre al final hay otra vez 60 g en total, contando el gas que se formó. Si lo haces en un frasco abierto, la báscula marca menos, porque el gas que se forma, dióxido de carbono (CO₂), se escapa.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que en un cambio químico se crea o se pierde materia. Si la báscula marca algo distinto, es porque entró o salió un gas del aire.</p>`,
    ejemplo: `
      <p>Un clavo de hierro de 10 g se deja en el patio. Semanas después está cubierto de óxido café y pesa 10.4 g. ¿Qué tipo de cambio fue? ¿Se rompió la conservación de la masa?</p>
      <ol class="pasos-ej">
        <li>Busca señales. El clavo cambió de color, de gris a café, y el óxido se desmorona; el hierro no hacía eso. Se formó una sustancia nueva: es un cambio químico.</li>
        <li>Ahora la masa. El clavo ganó 10.4 − 10 = 0.4 g. Esa masa no apareció de la nada.</li>
        <li>El hierro se combinó con el oxígeno del aire para formar el óxido. Los 0.4 g extra son el oxígeno que el clavo tomó del aire.</li>
        <li>Comprueba sumando todo lo que había al principio: 10 g de hierro + 0.4 g de oxígeno = 10.4 g, justo la masa final.</li>
      </ol>
      <p>Resultado: <span class="resultado">cambio químico; la masa se conserva</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que el óxido "creó" masa. Solo pesaste el clavo; el oxígeno que tomó del aire no lo habías pesado al principio.</p>`,
    vidaReal: `
      <p>Saber cuándo algo se transforma por dentro te sirve todos los días:</p>
      <ul>
        <li>Pintar una reja la protege del aire húmedo, para que no se oxide.</li>
        <li>La comida se guarda en el refrigerador para que tarde más en echarse a perder.</li>
        <li>Los panaderos saben que el pan se infla por el gas que suelta la levadura.</li>
        <li>Si la leche huele agria, ya no es la misma que compraste.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos es un cambio químico?</p>',
        opciones: ['Derretir mantequilla', 'Romper un vaso', 'Freír un huevo', 'Disolver azúcar en agua'], correcta: 2,
        pista: '<p>Busca el único en el que al final hay una sustancia nueva que no puedes regresar a como estaba.</p>',
        solucion: '<p><strong>Freír un huevo.</strong> La clara transparente se vuelve blanca y firme: se formaron sustancias nuevas. En los otros, la sustancia sigue siendo la misma.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos es un cambio físico?</p>',
        opciones: ['Un clavo que se oxida', 'La leche que se agria', 'El agua que hierve', 'La madera que se quema'], correcta: 2,
        pista: '<p>¿En cuál la sustancia del final sigue siendo la misma del principio?</p>',
        solucion: '<p><strong>El agua que hierve.</strong> Hay burbujas, pero el vapor sigue siendo agua. Los otros tres forman sustancias nuevas.</p>' },
      { tipo: 'numero', enunciado: '<p>Al quemar 24 g de magnesio en el aire se forman 40 g de óxido de magnesio. ¿Cuántos gramos de oxígeno del aire se usaron?</p>', respuesta: 40 - 24,
        pista: '<p>La masa de lo que había al principio, magnesio más oxígeno, es igual a la masa del final.</p>',
        solucion: '<p>Magnesio + oxígeno = óxido, así que 24 + oxígeno = 40. El oxígeno es 40 − 24 = <strong>16 g</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En un vaso abierto mezclas vinagre y bicarbonato. Antes de la reacción, el vaso con todo tiene una masa de 260 g. Cuando dejan de salir burbujas, tiene 258.2 g. ¿Cuántos gramos de gas se escaparon?</p>', respuesta: 260 - 258.2, tolerancia: 0.01,
        pista: '<p>La masa no desaparece: lo que falta se fue al aire.</p>',
        solucion: '<p>Faltan 260 − 258.2 = <strong>1.8 g</strong>. Esa es la masa del dióxido de carbono que se escapó en las burbujas.</p>' },
      { tipo: 'opciones', enunciado: '<p>Mezclas dos líquidos transparentes y, de pronto, aparece un sólido amarillo que se asienta en el fondo. ¿Qué indica?</p>',
        opciones: ['Un cambio químico: se formó una sustancia nueva', 'Un cambio físico: uno de los líquidos se congeló', 'Que la masa total aumentó'], correcta: 0,
        pista: '<p>Antes no había ningún sólido amarillo. ¿De dónde salió?</p>',
        solucion: '<p>Es un <strong>cambio químico</strong>: la aparición de un sólido nuevo es una de sus señales. La masa total sigue siendo la misma.</p>' },
      { tipo: 'texto', enunciado: '<p>Completa el nombre de la regla: en un cambio químico, la masa total antes es igual a la masa total después. Se llama conservación de la ____.</p>',
        respuestas: ['masa', 'la masa'],
        pista: '<p>Es lo que mides con una báscula.</p>',
        solucion: '<p>Conservación de la <strong>masa</strong>: los átomos no se crean ni se destruyen, solo se reacomodan.</p>' },
    ],
    fuentes: [
      OSC('1-3-physical-and-chemical-properties', 'Physical and Chemical Properties'),
      WIKI('Cambio_químico', 'Cambio químico'),
      WIKI('Ley_de_conservación_de_la_materia', 'Ley de conservación de la materia'),
      KHAN,
    ],
  });
})();
