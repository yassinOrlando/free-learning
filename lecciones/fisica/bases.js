// Física · Unidad 1: Bases de la física.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const F = window.fraccion;
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('fisica', titulo, datos);
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

  const OS = (pagina, nombre) => ({ nombre: `OpenStax, Physics: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/physics/pages/${pagina}` });
  const OSC = (pagina, nombre) => ({ nombre: `OpenStax, College Physics 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/college-physics-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = { nombre: 'Khan Academy en español: Física', url: 'https://es.khanacademy.org/science/physics' };

  // ------------------------------------------------------------------
  L('Qué es la física y el método científico', {
    objetivo: 'Entender qué estudia la física y usar los pasos del método científico para responder una pregunta con un experimento.',
    explicacion: `
      <p>Sueltas una llave y cae al piso. Lanzas una pelota hacia arriba y regresa a tu mano. Frotas tus manos y se calientan. Pasa todos los días y casi nunca nos preguntamos por qué. La <strong>física</strong> es la ciencia que hace justo esas preguntas: estudia cómo y por qué se mueven las cosas, de dónde sale el calor, cómo viaja el sonido y qué es la luz.</p>
      <p>Lo que hace especial a la física es que no se conforma con una opinión. Una respuesta tiene que poder comprobarse, de preferencia midiendo, para que cualquier persona que repita la prueba llegue a lo mismo. Por eso la física usa tantos números: un número medido se puede revisar, una impresión no.</p>
      <h3>¿Cómo se responde una pregunta científica?</h3>
      <p>Para no engañarse a sí mismos, los científicos siguen una serie de pasos llamada <strong>método científico</strong>. No es una receta rígida, pero casi siempre incluye estos pasos:</p>
      <ol>
        <li><strong>Observar.</strong> Notas algo que llama tu atención: unos días la ropa tendida se seca más rápido que otros.</li>
        <li><strong>Preguntar.</strong> Conviertes lo que viste en una pregunta concreta: ¿el viento hace que la ropa se seque más rápido?</li>
        <li><strong>Proponer una hipótesis.</strong> Una <strong>hipótesis</strong> es una respuesta posible que todavía no has comprobado. Se suele escribir como "si pasa esto, entonces pasará aquello": si hay viento, entonces la ropa se seca más rápido.</li>
        <li><strong>Experimentar.</strong> Diseñas una prueba. Tomas dos playeras iguales, las mojas igual y pones una frente a un ventilador y la otra lejos de él.</li>
        <li><strong>Analizar y concluir.</strong> Mides y comparas. Si la playera del ventilador se secó en 1 hora y la otra en 3 horas, los datos apoyan tu hipótesis.</li>
      </ol>
      <h3>¿Por qué cambiar solo una cosa?</h3>
      <p>Fíjate que las dos playeras eran iguales, estaban igual de mojadas y estaban en el mismo cuarto. Lo único distinto era el ventilador. Cada cosa que puede cambiar en un experimento se llama <strong>variable</strong>: el viento, el sol, la tela, la cantidad de agua.</p>
      <p>Si cambias dos variables a la vez, ya no sabes cuál causó el resultado. Imagina que pones una playera al sol y con ventilador, y la otra a la sombra y sin ventilador. Si la primera se seca antes, ¿fue el sol o fue el viento? No hay forma de saberlo. Por eso en un buen experimento cambias solo la variable que quieres estudiar y dejas todas las demás iguales. Es como una carrera justa: todos salen del mismo lugar y a la misma hora, y así sabes que ganó el más rápido.</p>
      <h3>¿Y si la hipótesis falla?</h3>
      <p>Que el experimento no apoye tu hipótesis no es un fracaso. Aprendiste algo: esa explicación no era la correcta. Entonces propones otra hipótesis y la vuelves a probar. Así avanza la ciencia, descartando ideas equivocadas una por una.</p>
      <p>Ahora bien, una hipótesis solo sirve si se puede poner a prueba. "La ropa se seca más rápido con viento" se puede comprobar con un ventilador y un reloj. En cambio, "a la ropa le gusta el viento" no se puede medir de ninguna forma, así que no es una hipótesis científica.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que un solo experimento demuestra algo para siempre. Quizá una playera era más delgada o el reloj se adelantó. Por eso los resultados se repiten varias veces, y de preferencia los repiten otras personas. Si todos llegan a lo mismo, puedes confiar más en la conclusión.</p>`,
    ejemplo: `
      <p>Tienes dos plantas iguales. La de la ventana crece más que la de la cocina. ¿Cómo averiguas por qué?</p>
      <ol class="pasos-ej">
        <li>Empieza por la observación y conviértela en pregunta: ¿la planta de la ventana crece más porque recibe más luz?</li>
        <li>Propón una hipótesis que se pueda probar: si una planta recibe más luz, entonces crece más.</li>
        <li>Diseña el experimento cambiando solo la luz. Usa dos plantas de la misma especie y del mismo tamaño, en la misma maceta y con la misma tierra. Riégalas con la misma cantidad de agua. Una va junto a la ventana y la otra en un rincón oscuro del mismo cuarto.</li>
        <li>Mide la altura de las dos cada semana durante un mes y anota los datos.</li>
        <li>Si la planta con luz crece más, los datos apoyan tu hipótesis. Para estar más seguro, repite la prueba con otro par de plantas.</li>
      </ol>
      <p>Resultado: <span class="resultado">un experimento que solo cambia la luz</span>.</p>
      <p class="nota"><strong>Error común:</strong> regar más a la planta de la ventana "porque se ve más seca". Entonces cambian dos variables, la luz y el agua, y ya no sabrás cuál hizo la diferencia.</p>`,
    vidaReal: `
      <p>Pensar como científico sirve mucho más allá del laboratorio:</p>
      <ul>
        <li>Cuando algo falla en casa, como un foco que no prende, pruebas una cosa a la vez: otro foco, otro apagador, otro enchufe.</li>
        <li>Al cocinar, si un pastel sale duro, cambias un solo ingrediente la siguiente vez para saber qué lo arregló.</li>
        <li>Ante una noticia o un anuncio que promete milagros, te preguntas si alguien lo comprobó de verdad.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas frases es una hipótesis?</p>',
        opciones: ['El hielo se derrite al sacarlo del congelador.', '¿El hielo se derrite más rápido con sal?', 'Si le pongo sal al hielo, entonces se derretirá más rápido.', 'El hielo es agua congelada.'], correcta: 2,
        pista: '<p>Una hipótesis es una respuesta posible que todavía se puede poner a prueba. Suele tener la forma "si…, entonces…".</p>',
        solucion: '<p>"Si le pongo sal al hielo, entonces se derretirá más rápido" es una respuesta posible que se puede comprobar con un experimento. La primera frase es una observación, la segunda es una pregunta y la última es un dato.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas preguntas estudia la física?</p>',
        opciones: ['¿En qué año se fundó tu ciudad?', '¿Por qué un barco de metal flota en el agua?', '¿Qué palabras riman con "canción"?', '¿Cuál es la capital de Perú?'], correcta: 1,
        pista: '<p>La física estudia el movimiento, las fuerzas, el calor, el sonido y la luz.</p>',
        solucion: '<p>Por qué flota un barco tiene que ver con cómo empuja el agua a los objetos, que es un tema de física. Las otras preguntas son de historia, de lengua y de geografía.</p>' },
      { tipo: 'opciones', enunciado: '<p>Quieres saber si el tamaño de una pelota cambia qué tan alto rebota. ¿Cuál experimento es justo?</p>',
        opciones: ['Soltar una pelota chica desde 1 m y una grande desde 2 m.', 'Soltar una pelota chica y una grande del mismo material desde 1 m, sobre el mismo piso.', 'Soltar una pelota chica de hule sobre pasto y una grande de plástico sobre cemento.', 'Soltar solo la pelota grande muchas veces.'], correcta: 1,
        pista: '<p>Busca el experimento en el que lo único distinto entre las dos pruebas sea el tamaño.</p>',
        solucion: '<p>Solo la segunda opción cambia una sola variable, el tamaño. En las demás cambian también la altura, el material o el piso, o no hay nada con qué comparar.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama una respuesta posible a una pregunta que todavía no se ha comprobado con un experimento?</p>',
        respuestas: ['hipótesis', 'una hipótesis', 'la hipótesis'],
        pista: '<p>Es el paso que va entre hacer la pregunta y experimentar.</p>',
        solucion: '<p>Es una <strong>hipótesis</strong>. Se propone antes del experimento, y el experimento sirve para ver si los datos la apoyan o no.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué paso del método científico va justo después de proponer una hipótesis?</p>',
        opciones: ['Observar', 'Hacer una pregunta', 'Experimentar', 'Dar la conclusión'], correcta: 2,
        pista: '<p>Ya tienes una respuesta posible. ¿Qué necesitas hacer para saber si es correcta?</p>',
        solucion: '<p>Después de la hipótesis viene <strong>experimentar</strong>: diseñas una prueba para ver si los datos la apoyan. La conclusión llega al final, cuando ya analizaste esos datos.</p>' },
      { tipo: 'opciones', enunciado: '<p>Hiciste un experimento con cuidado y los datos no apoyan tu hipótesis. ¿Qué conviene hacer?</p>',
        opciones: ['Cambiar los datos para que coincidan.', 'Decir que el experimento salió mal y olvidarlo.', 'Proponer otra hipótesis y ponerla a prueba.', 'Quedarte con la hipótesis de todas formas.'], correcta: 2,
        pista: '<p>Que una hipótesis falle también enseña algo. ¿Cómo sigue avanzando la investigación?</p>',
        solucion: '<p>Descartar una idea equivocada es un avance. Lo correcto es <strong>proponer otra hipótesis y probarla</strong>; cambiar los datos o ignorarlos sería engañarse.</p>' },
    ],
    fuentes: [OS('1-1-physics-definitions-and-applications', 'Physics: Definitions and Applications'), OS('1-2-the-scientific-methods', 'The Scientific Methods'), WIKI('Método_científico', 'Método científico')],
  });

  // ------------------------------------------------------------------
  L('Magnitudes y el Sistema Internacional de Unidades', {
    objetivo: 'Reconocer qué es una magnitud, conocer las unidades básicas del Sistema Internacional y usar los prefijos kilo, centi y mili.',
    explicacion: `
      <p>Si alguien te dice "la tienda está a 5", no sabes si son 5 minutos, 5 cuadras o 5 kilómetros. El número solo no basta: necesitas saber en qué se está midiendo.</p>
      <p>En física, a todo lo que se puede medir y expresar con un número se le llama <strong>magnitud</strong>. El largo de una mesa, la masa de una sandía, el tiempo que tarda un camión o la temperatura del agua son magnitudes. Lo bonito que es un paisaje no lo es, porque no hay forma de medirlo con un número en el que todos estén de acuerdo.</p>
      <h3>¿Qué significa medir?</h3>
      <p>Medir es comparar con una cantidad fija que todos aceptan, llamada <strong>unidad</strong>. Decir que una mesa mide 2 metros significa que le cabe dos veces el largo de un metro. Por eso toda medida tiene dos partes: un número y una unidad. "2 metros" está completo; "2" solo no dice nada.</p>
      <h3>¿Por qué todos usamos las mismas unidades?</h3>
      <p>Hace siglos, cada pueblo medía con lo que tenía a la mano: el pie, el palmo, el paso. Pero el pie de una persona no mide lo mismo que el de otra, y eso causaba pleitos en los mercados. Para evitarlo, hoy casi todo el mundo usa el mismo conjunto de unidades, llamado <strong>Sistema Internacional de Unidades</strong>, o <strong>SI</strong>. Tiene siete unidades básicas:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Magnitud</th><th>Unidad</th><th>Símbolo</th></tr>
        <tr><td>Longitud (qué tan largo es algo)</td><td>metro</td><td>m</td></tr>
        <tr><td>Masa (cuánta materia tiene algo)</td><td>kilogramo</td><td>kg</td></tr>
        <tr><td>Tiempo</td><td>segundo</td><td>s</td></tr>
        <tr><td>Temperatura</td><td>kelvin</td><td>K</td></tr>
        <tr><td>Corriente eléctrica</td><td>ampere</td><td>A</td></tr>
        <tr><td>Cantidad de sustancia</td><td>mol</td><td>mol</td></tr>
        <tr><td>Intensidad de la luz</td><td>candela</td><td>cd</td></tr>
      </table></div>
      <p>Por ahora basta con las tres primeras; las demás aparecerán en su momento. Fíjate que la unidad básica de masa, el kilogramo, es la única que ya trae un prefijo en su nombre.</p>
      <p>Todas las demás magnitudes se forman combinando estas. Por ejemplo, la rapidez se mide en <strong>m/s</strong>, que se lee "metros por segundo" y dice cuántos metros avanzas en cada segundo. El área de un cuarto se mide en <strong>m²</strong>, metros cuadrados.</p>
      <h3>¿Qué significan kilo, centi y mili?</h3>
      <p>Medir la distancia entre dos ciudades en metros daría números enormes, y medir una hormiga daría números diminutos. Para eso existen los <strong>prefijos</strong>, palabras que se ponen antes de la unidad para hacerla más grande o más chica:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Prefijo</th><th>Símbolo</th><th>Significa</th><th>Ejemplo</th></tr>
        <tr><td>kilo</td><td>k</td><td>1 000 veces</td><td>1 km = 1 000 m</td></tr>
        <tr><td>centi</td><td>c</td><td>la centésima parte</td><td>1 m = 100 cm</td></tr>
        <tr><td>mili</td><td>m</td><td>la milésima parte</td><td>1 m = 1 000 mm</td></tr>
      </table></div>
      <p>Todos los prefijos se basan en el 10 (10, 100, 1 000…), igual que el dinero: 100 centavos hacen un peso. Por eso cambiar de uno a otro es solo mover el punto decimal. Además, sirven con cualquier unidad: un kilogramo son 1 000 gramos, y un mililitro es la milésima parte de un litro, la unidad que usamos para los líquidos.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir símbolos que se parecen. "m" sola es metro, pero "mm" es milímetro, mil veces más chico. Y las mayúsculas importan: "k" minúscula es kilo, mientras que "K" mayúscula es kelvin.</p>`,
    ejemplo: `
      <p>Una receta de pan lleva 250 g de harina. Tienes una bolsa de 1 kg. ¿Para cuántas recetas te alcanza?</p>
      <ol class="pasos-ej">
        <li>Las dos cantidades están en unidades distintas, gramos y kilogramos, así que no las puedes comparar directo. Primero pásalas a la misma unidad.</li>
        <li>El prefijo kilo significa 1 000 veces, así que 1 kg = 1 000 g. La bolsa trae 1 000 g de harina.</li>
        <li>Ahora divide la harina que tienes entre la que pide cada receta: 1 000 ÷ 250 = 4.</li>
        <li>Comprueba al revés: 4 recetas de 250 g usan 4 × 250 = 1 000 g, justo lo que trae la bolsa.</li>
      </ol>
      <p>Resultado: <span class="resultado">4 recetas</span>.</p>
      <p class="nota"><strong>Error común:</strong> dividir 1 ÷ 250 sin convertir. Da 0.004, como si no alcanzara ni para una receta. Antes de hacer cuentas, revisa que todas las cantidades estén en la misma unidad.</p>`,
    vidaReal: `
      <p>Las unidades están en casi todo lo que compras y usas:</p>
      <ul>
        <li>En el súper, las etiquetas dicen gramos, kilos o litros, y entenderlas te ayuda a comparar paquetes.</li>
        <li>En la farmacia, la dosis de un jarabe viene en mililitros, y confundir la unidad puede ser peligroso.</li>
        <li>Al comprar una cortina o un mueble, saber si la medida está en centímetros o en metros evita que no quepa.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas cosas <em>no</em> es una magnitud?</p>',
        opciones: ['La rapidez de un coche', 'La temperatura del agua', 'Lo simpática que es una persona', 'La masa de una sandía'], correcta: 2,
        pista: '<p>Una magnitud se puede medir con un número y una unidad en los que todos estén de acuerdo.</p>',
        solucion: '<p>La rapidez, la temperatura y la masa se miden con instrumentos y unidades. <strong>Lo simpática que es una persona</strong> depende de la opinión de cada quien, así que no es una magnitud.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es la unidad básica del SI para medir el tiempo?</p>',
        opciones: ['La hora', 'El minuto', 'El segundo', 'El día'], correcta: 2,
        pista: '<p>Revisa la tabla de las siete unidades básicas.</p>',
        solucion: '<p>Es el <strong>segundo</strong> (s). Las horas y los minutos se usan mucho en la vida diaria, pero se definen a partir del segundo: 1 minuto son 60 segundos.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos milímetros hay en 1 metro?</p>', respuesta: 1000,
        pista: '<p>Mili significa la milésima parte. ¿Cuántas milésimas partes forman un entero?</p>',
        solucion: '<p>Un milímetro es la milésima parte de un metro, así que en un metro caben <strong>1 000</strong> milímetros.</p>' },
      { tipo: 'numero', enunciado: '<p>Una puerta mide 2 metros de alto. ¿Cuántos centímetros son?</p>', respuesta: 2 * 100,
        pista: '<p>Primero piensa cuántos centímetros tiene un solo metro.</p>',
        solucion: '<p>Cada metro tiene 100 centímetros, así que 2 metros son 2 × 100 = <strong>200 cm</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una botella de refresco tiene 1.5 litros. ¿Cuántos mililitros son?</p>', respuesta: 1.5 * 1000,
        pista: '<p>Un litro tiene 1 000 mililitros.</p>',
        solucion: '<p>Como cada litro tiene 1 000 mililitros, 1.5 litros son 1.5 × 1 000 = <strong>1 500 mL</strong>. Es mover el punto decimal tres lugares a la derecha.</p>' },
      { tipo: 'texto', enunciado: '<p>Escribe el símbolo de la unidad básica de masa del SI.</p>',
        respuestas: ['kg'],
        pista: '<p>La unidad básica de masa ya trae un prefijo en su nombre.</p>',
        solucion: '<p>Es el kilogramo, y su símbolo es <strong>kg</strong>: "k" de kilo y "g" de gramo.</p>' },
    ],
    fuentes: [OS('1-3-the-language-of-physics-physical-quantities-and-units', 'The Language of Physics: Physical Quantities and Units'), { nombre: 'BIPM: Unidades de medida del SI', url: 'https://www.bipm.org/en/measurement-units' }, WIKI('Sistema_Internacional_de_Unidades', 'Sistema Internacional de Unidades')],
  });

  // ------------------------------------------------------------------
  L('Conversión de unidades', {
    objetivo: 'Cambiar una medida de una unidad a otra con factores de conversión, incluso de kilómetros por hora a metros por segundo.',
    explicacion: `
      <p>Sales a correr y tu amiga te dice que hizo 5 km. Tu aplicación dice que tú hiciste 5 000 m. ¿Quién corrió más? Ninguna de las dos: es la misma distancia escrita en unidades distintas. Cambiar una medida de una unidad a otra se llama <strong>convertir unidades</strong>.</p>
      <p>Al convertir, la cantidad no cambia, solo la forma de contarla. Es como cambiar un billete de 100 pesos por diez monedas de 10: tienes el mismo dinero, pero contado de otra forma.</p>
      <h3>¿Multiplico o divido?</h3>
      <p>Antes de hacer cuentas, piensa qué esperas. Si pasas a una unidad más chica, el número debe crecer, porque caben más unidades chicas en la misma distancia: 2 m son 200 cm. Si pasas a una unidad más grande, el número debe bajar: 300 cm son solo 3 m. Esta revisión rápida evita la mayoría de los errores.</p>
      <h3>El factor de conversión</h3>
      <p>Hay una forma de convertir que no falla, incluso con unidades raras. Parte de una igualdad que conoces, como 1 km = 1 000 m, y escríbela como fracción:</p>
      <p>${F('1 000 m', '1 km')}</p>
      <p>Esta fracción vale exactamente 1, porque arriba y abajo hay la misma distancia escrita de dos formas. Se llama <strong>factor de conversión</strong>. Multiplicar por 1 no cambia una cantidad, así que puedes multiplicar cualquier medida por este factor sin alterarla.</p>
      <p>El truco está en acomodar la fracción para que la unidad que quieres quitar quede abajo. Así se cancela, igual que un número que está arriba y abajo en una fracción:</p>
      <p>3.5 km × ${F('1 000 m', '1 km')} = 3.5 × 1 000 m = 3 500 m</p>
      <p>Los "km" se cancelan y quedan metros. Para ir al revés, de metros a kilómetros, volteas el factor: ${F('1 km', '1 000 m')}.</p>
      <h3>Conversiones en varios pasos</h3>
      <p>A veces no conoces una igualdad directa, pero puedes encadenar varias. Para pasar 2 horas a segundos, usa que 1 hora tiene 60 minutos y 1 minuto tiene 60 segundos:</p>
      <p>2 h × ${F('60 min', '1 h')} × ${F('60 s', '1 min')} = 2 × 60 × 60 s = 7 200 s</p>
      <p>Las horas se cancelan con el primer factor y los minutos con el segundo.</p>
      <h3>De kilómetros por hora a metros por segundo</h3>
      <p>El velocímetro de un coche marca km/h, pero en física se usa m/s. Aquí hay que cambiar dos unidades: los kilómetros arriba y las horas abajo. Para 72 km/h:</p>
      <p>${F('72 km', '1 h')} × ${F('1 000 m', '1 km')} × ${F('1 h', '3 600 s')} = ${F('72 × 1 000 m', '3 600 s')} = 20 m/s</p>
      <p>Fíjate que siempre multiplicas por 1 000 y divides entre 3 600. Como 3 600 ÷ 1 000 = 3.6, hay un atajo: de km/h a m/s divide entre 3.6, y de m/s a km/h multiplica por 3.6.</p>
      <p>El método funciona igual con unidades que no son del SI. Una pulgada mide 2.54 cm, así que el factor es ${F('2.54 cm', '1 pulgada')}.</p>
      <p class="nota"><strong>Trampa común:</strong> acomodar el factor al revés. Si escribes 3.5 km × ${F('1 km', '1 000 m')}, los kilómetros no se cancelan y el número se vuelve diminuto. Cuando las unidades no se cancelan, voltea el factor.</p>`,
    ejemplo: `
      <p>Un coche va a 90 km/h. ¿Cuántos metros avanza en cada segundo?</p>
      <ol class="pasos-ej">
        <li>Primero cambia los kilómetros a metros. Cada kilómetro tiene 1 000 metros, así que el coche recorre 90 × 1 000 = 90 000 metros en una hora.</li>
        <li>Ahora reparte esa distancia entre los segundos que tiene una hora. Una hora tiene 60 × 60 = 3 600 segundos, así que divide: 90 000 ÷ 3 600 = 25.</li>
        <li>Comprueba con el atajo: 90 ÷ 3.6 = 25. Las dos formas coinciden.</li>
        <li>Revisa si tiene sentido. Un segundo es muy poco tiempo comparado con una hora, así que lo recorrido en un segundo debe ser un número mucho menor que 90 000.</li>
      </ol>
      <p>Resultado: <span class="resultado">25 m/s</span>, justo lo que mide una alberca olímpica a lo ancho (25 m) cada segundo.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar por 3.6 en lugar de dividir. Daría 324 m/s, más rápido que un avión comercial. Si el resultado suena absurdo, revisa hacia dónde convertiste.</p>`,
    vidaReal: `
      <p>Cambiar de unidad es algo que haces más seguido de lo que crees:</p>
      <ul>
        <li>Al comprar una pantalla, el tamaño viene en pulgadas y tu mueble lo mediste en centímetros.</li>
        <li>Al viajar a otro país, los letreros pueden marcar la distancia en millas en vez de kilómetros.</li>
        <li>En la cocina, una receta pide tazas y tú tienes una báscula en gramos.</li>
        <li>Al manejar, saber cuántos metros avanzas por segundo te ayuda a entender por qué hay que guardar distancia.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Convierte 2.5 km a metros.</p>', respuesta: 2.5 * 1000,
        pista: '<p>Usa el factor ' + F('1 000 m', '1 km') + '. ¿El número debe crecer o bajar?</p>',
        solucion: '<p>Pasas a una unidad más chica, así que el número crece: 2.5 × 1 000 = <strong>2 500 m</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una tabla mide 450 cm. ¿Cuántos metros son?</p>', respuesta: 450 / 100,
        pista: '<p>Un metro tiene 100 cm. Pasas a una unidad más grande, así que el número debe bajar.</p>',
        solucion: '<p>Cada 100 cm forman un metro, así que divides: 450 ÷ 100 = <strong>4.5 m</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una película dura 3 horas. ¿Cuántos segundos son?</p>', respuesta: 3 * 60 * 60,
        pista: '<p>Convierte primero las horas a minutos y después los minutos a segundos.</p>',
        solucion: '<p>3 horas son 3 × 60 = 180 minutos, y 180 minutos son 180 × 60 = <strong>10 800 s</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una bicicleta va a 54 km/h. ¿Cuál es su rapidez en m/s?</p>', respuesta: 54 * 1000 / 3600,
        pista: '<p>De km/h a m/s puedes multiplicar por 1 000 y dividir entre 3 600, o usar el atajo de 3.6.</p>',
        solucion: '<p>54 × 1 000 = 54 000 m en una hora, y 54 000 ÷ 3 600 = <strong>15 m/s</strong>. Con el atajo: 54 ÷ 3.6 = 15.</p>' },
      { tipo: 'numero', enunciado: '<p>Una persona corre a 10 m/s. ¿Cuántos km/h son?</p>', respuesta: 10 * 3.6,
        pista: '<p>Ahora vas de m/s a km/h, el camino contrario al del velocímetro.</p>',
        solucion: '<p>De m/s a km/h se multiplica por 3.6: 10 × 3.6 = <strong>36 km/h</strong>. Tiene sentido que el número crezca, porque en una hora se avanza mucho más que en un segundo.</p>' },
      { tipo: 'numero', enunciado: '<p>Una pantalla mide 32 pulgadas en diagonal. Si 1 pulgada = 2.54 cm, ¿cuántos centímetros son? Redondea a un decimal.</p>', respuesta: 32 * 2.54, tolerancia: 0.05,
        pista: '<p>Usa el factor ' + F('2.54 cm', '1 pulgada') + ' para que las pulgadas se cancelen.</p>',
        solucion: '<p>32 × 2.54 = 81.28, que redondeado a un decimal es <strong>81.3 cm</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Quieres convertir 600 m a kilómetros. ¿Por cuál factor multiplicas?</p>',
        opciones: [F('1 000 m', '1 km'), F('1 km', '1 000 m'), F('100 m', '1 km'), F('1 km', '100 m')], correcta: 1,
        pista: '<p>La unidad que quieres quitar, los metros, debe quedar abajo para que se cancele.</p>',
        solucion: '<p>Con ' + F('1 km', '1 000 m') + ' los metros quedan abajo y se cancelan: 600 m × ' + F('1 km', '1 000 m') + ' = 0.6 km. Las opciones con 100 m están mal porque un kilómetro tiene 1 000 metros.</p>' },
    ],
    fuentes: [OSC('1-2-physical-quantities-and-units', 'Physical Quantities and Units'), WIKI('Conversión_de_unidades', 'Conversión de unidades'), KHAN],
  });

  // ------------------------------------------------------------------
  L('Cifras significativas y errores de medición', {
    objetivo: 'Reconocer que toda medición tiene un margen de error, contar las cifras significativas de una medida y calcular el error absoluto y el relativo.',
    explicacion: `
      <p>Mide un lápiz con una regla escolar. La punta queda entre la marca de 14.3 cm y la de 14.4 cm, más o menos a la mitad. Puedes decir que mide unos 14.35 cm. Lo que no puedes decir es que mide 14.3527 cm: tu regla no alcanza a ver tanto.</p>
      <p>Ninguna medición es perfecta. Depende del instrumento, de quien mide y hasta de la luz del cuarto. Por eso en física no basta con dar un número: también importa cuánto puedes confiar en él.</p>
      <h3>¿Qué son las cifras significativas?</h3>
      <p>Los dígitos de una medida en los que puedes confiar se llaman <strong>cifras significativas</strong>. Son los dígitos que leíste con seguridad más el último, que estimaste a ojo. En 14.35 cm, el 1, el 4 y el 3 son seguros y el 5 es estimado: tiene 4 cifras significativas. Un instrumento más fino da más cifras significativas, porque ve diferencias más pequeñas.</p>
      <h3>¿Cuáles ceros cuentan?</h3>
      <p>Los dígitos del 1 al 9 siempre cuentan. Con los ceros hay que fijarse en para qué están:</p>
      <ul>
        <li>Los ceros entre otros dígitos sí cuentan. En 205 g hay 3 cifras, porque ese 0 también se midió.</li>
        <li>Los ceros al principio no cuentan. En 0.0045 m hay solo 2 cifras: los ceros nada más indican dónde va el punto. De hecho, esa misma medida se escribe 4.5 mm, sin ningún cero.</li>
        <li>Los ceros al final, después del punto, sí cuentan. Escribir 3.40 kg dice que mediste hasta las centésimas y salió 0. Si no lo hubieras medido, escribirías 3.4 kg.</li>
      </ul>
      <p>Un número como 1500 sin punto es confuso: no se sabe si los ceros se midieron. La notación científica, que viste en Matemáticas, lo aclara: 1.5 × 10³ tiene 2 cifras y 1.500 × 10³ tiene 4.</p>
      <h3>¿Cuántas cifras dejo al multiplicar?</h3>
      <p>Un resultado no puede ser más preciso que el dato menos preciso que usaste. Por eso, al multiplicar o dividir, el resultado lleva tantas cifras significativas como el dato que tenga menos. Si un rectángulo mide 4.2 cm por 3.15 cm, la calculadora da 13.23 cm². Pero 4.2 solo tiene 2 cifras, así que el área se escribe 13 cm².</p>
      <h3>¿Qué tan lejos quedé?</h3>
      <p>Cuando conoces el valor real de algo, puedes calcular qué tanto se equivocó tu medida. El <strong>error absoluto</strong> es la diferencia entre lo que mediste y el valor real, sin importar el signo. Si una cinta mide 1 m exacto y tú mediste 0.98 m, el error absoluto es 0.02 m.</p>
      <p>Pero ese número solo no dice si el error es grave. Equivocarte por 1 cm al medir un lápiz es mucho; al medir una cancha, casi nada. Para compararlos se usa el <strong>error relativo</strong>: divides el error absoluto entre el valor real y multiplicas por 100, como en porcentajes.</p>
      <p>error relativo = ${F('error absoluto', 'valor real')} × 100</p>
      <p>Se lee: qué porcentaje del valor real fue tu error. 1 cm de error en un lápiz de 10 cm es 10%; en una cancha de 1 000 cm es solo 0.1%.</p>
      <p class="nota"><strong>Trampa común:</strong> copiar todos los dígitos de la calculadora. Si mediste con una regla de milímetros, escribir 13.2300 cm² presume una precisión que no tienes.</p>`,
    ejemplo: `
      <p>Una pesa de laboratorio tiene una masa de exactamente 500 g. Al ponerla en tu báscula de cocina, marca 490 g. ¿Qué tan exacta es tu báscula?</p>
      <ol class="pasos-ej">
        <li>Primero calcula el error absoluto, es decir, por cuánto se equivocó la báscula: 500 − 490 = 10 g.</li>
        <li>Ahora calcula el error relativo para saber si esos 10 g son mucho o poco. Divide el error entre el valor real, que es 500 g, porque quieres saber qué parte de lo real fue el error: 10 ÷ 500 = 0.02.</li>
        <li>Multiplica por 100 para decirlo en porcentaje: 0.02 × 100 = 2%.</li>
        <li>Comprueba por otro camino: el 1% de 500 es 5, así que el 2% es 10 g, justo el error que encontraste.</li>
      </ol>
      <p>Resultado: <span class="resultado">error de 10 g, es decir, 2%</span>. Para cocinar es suficiente; para un laboratorio, no.</p>
      <p class="nota"><strong>Error común:</strong> dividir entre lo que marcó la báscula (490) en vez del valor real (500). El error relativo siempre se compara con el valor real.</p>`,
    vidaReal: `
      <p>Saber qué tanto confiar en una medida te protege de malas decisiones:</p>
      <ul>
        <li>Al comprar fruta, puedes revisar si la báscula de la tienda marca de más con algo de peso conocido.</li>
        <li>Un termómetro de casa puede variar unas décimas, y eso importa al decidir si alguien tiene fiebre.</li>
        <li>Al medir una ventana para comprar un vidrio, un error de unos milímetros puede hacer que no entre.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuántas cifras significativas tiene la medida 0.0072 m?</p>', respuesta: 2,
        pista: '<p>Los ceros al principio solo indican dónde va el punto.</p>',
        solucion: '<p>Los ceros del principio no cuentan, así que solo quedan el 7 y el 2: <strong>2 cifras significativas</strong>. Es lo mismo que escribir 7.2 mm.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas cifras significativas tiene la medida 3.050 kg?</p>', respuesta: 4,
        pista: '<p>Revisa cada cero: ¿está entre otros dígitos o al final después del punto?</p>',
        solucion: '<p>El 0 entre el 3 y el 5 cuenta, y el 0 final después del punto también, porque se midió. Son <strong>4 cifras significativas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas cifras significativas tiene la medida 108 cm?</p>', respuesta: 3,
        pista: '<p>Un cero entre dos dígitos distintos de cero también se midió.</p>',
        solucion: '<p>El 1 y el 8 cuentan, y el 0 que está entre ellos también. Son <strong>3 cifras significativas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un cuarto mide 2.5 m por 3.42 m. Escribe su área con las cifras significativas correctas.</p>', respuesta: 8.6,
        pista: '<p>Multiplica y luego fíjate cuál de los dos datos tiene menos cifras significativas.</p>',
        solucion: '<p>2.5 × 3.42 = 8.55. El dato 2.5 solo tiene 2 cifras, así que el resultado también: <strong>8.6 m²</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una tabla mide en realidad 2.00 m, y tú la mediste en 1.96 m. ¿Cuál es el error absoluto, en metros?</p>', respuesta: 2 - 1.96,
        pista: '<p>Resta tu medida del valor real.</p>',
        solucion: '<p>El error absoluto es la diferencia sin signo: 2.00 − 1.96 = <strong>0.04 m</strong>, es decir, 4 cm.</p>' },
      { tipo: 'numero', enunciado: '<p>Con los mismos datos (valor real 2.00 m, medida 1.96 m), ¿cuál es el error relativo, en porcentaje?</p>', respuesta: (2 - 1.96) / 2 * 100,
        pista: '<p>Divide el error absoluto entre el valor real y multiplica por 100.</p>',
        solucion: '<p>0.04 ÷ 2.00 = 0.02, y 0.02 × 100 = <strong>2%</strong>. Te equivocaste por 2 de cada 100 partes del largo real.</p>' },
    ],
    fuentes: [OSC('1-3-accuracy-precision-and-significant-figures', 'Accuracy, Precision, and Significant Figures'), WIKI('Cifras_significativas', 'Cifras significativas'), WIKI('Error_de_medición', 'Error de medición')],
  });

  // ------------------------------------------------------------------
  const CAMINO = G({ x: [0, 5], y: [0, 5], proporcional: true, figuras: [
    ...flecha([0, 0], [3, 0]), ...flecha([3, 0], [3, 4]), ...flecha([0, 0], [3, 4], 1),
    txt(1.5, 0.35, '3 al este'), txt(3.9, 2, '4 al norte'), txt(0.2, 2.6, 'resultante: 5'),
  ], descripcion: 'Una flecha de 3 cuadros hacia la derecha (este) y, desde su punta, otra de 4 cuadros hacia arriba (norte). La flecha resultante va en diagonal, directo del inicio a la punta final, y mide 5 cuadros.' });

  L('Vectores: magnitud y dirección', {
    objetivo: 'Distinguir magnitudes escalares de vectoriales, representar un vector con una flecha y sumar vectores que van en la misma dirección, en direcciones opuestas o en ángulo recto.',
    explicacion: `
      <p>Preguntas cómo llegar a la panadería y te contestan "camina 3 cuadras". ¿Hacia dónde? Sin la dirección, ese dato no te sirve. En cambio, si preguntas la hora y te dicen "las 3", no hace falta nada más.</p>
      <p>Esa es la diferencia entre dos tipos de magnitudes. Una <strong>magnitud escalar</strong> queda dicha por completo con un número y su unidad: una temperatura de 25 °C, una masa de 2 kg, un tiempo de 10 s. Un <strong>vector</strong> necesita además una dirección: "3 cuadras hacia el norte", o "un viento de 20 km/h hacia el sur".</p>
      <h3>¿Cómo se dibuja un vector?</h3>
      <p>Un vector se dibuja como una flecha. El largo de la flecha muestra qué tan grande es, y la punta muestra hacia dónde va. Al tamaño del vector también se le llama su <strong>magnitud</strong>; fíjate que aquí la palabra tiene un segundo sentido: no "algo que se mide", sino "qué tan grande es la flecha". Para dibujar, se elige una escala, por ejemplo un cuadro de la cuadrícula por cada cuadra. En los libros, los vectores se nombran con una letra en negritas, como <strong>A</strong>, o con una flechita encima.</p>
      <h3>¿Qué pasa si los vectores van en la misma dirección?</h3>
      <p>Caminas 3 cuadras al este, te detienes y luego caminas 2 cuadras más al este. Terminas a 5 cuadras al este de donde empezaste. Cuando dos vectores van en la misma dirección, sus tamaños se suman y la dirección no cambia.</p>
      <h3>¿Y si van en direcciones opuestas?</h3>
      <p>Ahora caminas 5 cuadras al este y luego regresas 2 al oeste. Terminas a 3 cuadras al este del inicio. Cuando los vectores van en direcciones opuestas, sus tamaños se restan, y el resultado apunta hacia donde iba el más grande. Es como jugar a jalar la cuerda: si un equipo jala más fuerte que el otro, la cuerda se mueve hacia ese equipo.</p>
      <h3>¿Y si forman una esquina?</h3>
      <p>Caminas 3 cuadras al este y luego 4 al norte. Para sumar vectores, dibuja el segundo empezando en la punta del primero. El resultado es la flecha que va directo del inicio a la punta final. Esa flecha se llama <strong>resultante</strong>.</p>
      ${CAMINO}
      <p>Las tres flechas forman un triángulo rectángulo, porque el este y el norte forman una esquina recta. La resultante es el lado largo, así que puedes usar el teorema de Pitágoras que viste en Matemáticas:</p>
      <p>resultante = √(3² + 4²) = √(9 + 16) = √25 = 5</p>
      <p>Caminaste 7 cuadras en total, pero terminaste a solo 5 cuadras en línea recta del inicio, en dirección al noreste. Las dos respuestas son correctas; solo responden preguntas distintas.</p>
      <p class="nota"><strong>Trampa común:</strong> sumar 3 + 4 = 7 cuando los vectores forman una esquina. Solo se suman directo los vectores que van en la misma dirección. Si forman una esquina recta, se usa Pitágoras.</p>`,
    ejemplo: `
      <p>Un dron vuela 6 km hacia el norte y después 8 km hacia el este. ¿A qué distancia en línea recta quedó del punto de despegue?</p>
      <ol class="pasos-ej">
        <li>Primero fíjate en las direcciones. El norte y el este forman una esquina recta, así que no puedes sumar 6 + 8 directo.</li>
        <li>Dibuja la flecha de 8 km empezando en la punta de la de 6 km. La resultante va del despegue a la punta final y es el lado largo de un triángulo rectángulo.</li>
        <li>Aplica Pitágoras: 6² + 8² = 36 + 64 = 100, y la raíz cuadrada de 100 es 10.</li>
        <li>Comprueba que el número tenga sentido. La resultante debe ser más grande que el vector más largo, 8 km, y más chica que la suma de los dos, 14 km. 10 está entre ambos. Además, 6, 8 y 10 son el doble de 3, 4 y 5, el triángulo de la explicación.</li>
      </ol>
      <p>Resultado: <span class="resultado">10 km hacia el noreste</span>.</p>
      <p class="nota"><strong>Error común:</strong> responder 14 km. Esa es la distancia que voló el dron, no lo lejos que quedó del punto de despegue.</p>`,
    vidaReal: `
      <p>Saber hacia dónde va algo es tan importante como saber cuánto:</p>
      <ul>
        <li>Las apps de mapas te dicen no solo cuántos metros caminar, sino hacia dónde girar.</li>
        <li>Los pilotos de aviones y lanchas toman en cuenta hacia dónde sopla el viento o corre el agua, porque puede ayudarles o frenarlos.</li>
        <li>Al empujar entre varias personas un coche descompuesto, conviene que todas empujen en la misma dirección.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas cantidades es un vector?</p>',
        opciones: ['La temperatura de un café', 'La masa de un perro', 'Un viento de 30 km/h hacia el oeste', 'La duración de una película'], correcta: 2,
        pista: '<p>Busca la cantidad que necesita una dirección para quedar completa.</p>',
        solucion: '<p>El <strong>viento de 30 km/h hacia el oeste</strong> tiene tamaño y dirección, así que es un vector. La temperatura, la masa y la duración quedan completas con un número y su unidad: son escalares.</p>' },
      { tipo: 'numero', enunciado: '<p>Caminas 4 cuadras al norte y luego 6 cuadras más al norte. ¿A cuántas cuadras del inicio terminas?</p>', respuesta: 4 + 6,
        pista: '<p>Los dos vectores van en la misma dirección.</p>',
        solucion: '<p>Cuando los vectores van en la misma dirección, sus tamaños se suman: 4 + 6 = <strong>10 cuadras</strong> al norte.</p>' },
      { tipo: 'numero', enunciado: '<p>Caminas 7 cuadras al este y luego regresas 3 cuadras al oeste. ¿A cuántas cuadras del inicio terminas?</p>', respuesta: 7 - 3,
        pista: '<p>El este y el oeste son direcciones opuestas.</p>',
        solucion: '<p>En direcciones opuestas los tamaños se restan: 7 − 3 = <strong>4 cuadras</strong>, hacia el este, que es hacia donde iba el vector más grande.</p>' },
      { tipo: 'opciones', enunciado: '<p>En el ejercicio anterior (7 cuadras al este y 3 al oeste), ¿hacia dónde quedaste respecto al inicio?</p>',
        opciones: ['Al este', 'Al oeste', 'Al norte', 'En el mismo punto del inicio'], correcta: 0,
        pista: '<p>El resultado apunta hacia donde iba el vector más grande.</p>',
        solucion: '<p>Caminaste más hacia el este (7) que hacia el oeste (3), así que quedaste <strong>al este</strong> del inicio.</p>' },
      { tipo: 'numero', enunciado: '<p>Un barco avanza 5 km hacia el este y luego 12 km hacia el norte. ¿A qué distancia en línea recta quedó del puerto, en km?</p>', respuesta: Math.sqrt(5 ** 2 + 12 ** 2),
        pista: '<p>El este y el norte forman una esquina recta. Usa el teorema de Pitágoras.</p>',
        solucion: '<p>5² + 12² = 25 + 144 = 169, y la raíz cuadrada de 169 es <strong>13 km</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un gato camina 9 m hacia el sur y luego 12 m hacia el oeste. ¿A cuántos metros en línea recta quedó de donde empezó?</p>', respuesta: Math.sqrt(9 ** 2 + 12 ** 2),
        pista: '<p>El sur y el oeste también forman una esquina recta.</p>',
        solucion: '<p>9² + 12² = 81 + 144 = 225, y la raíz cuadrada de 225 es <strong>15 m</strong>. Son 9, 12 y 15: el triángulo 3, 4, 5 multiplicado por 3.</p>' },
    ],
    fuentes: [OS('5-1-vector-addition-and-subtraction-graphical-methods', 'Vector Addition and Subtraction: Graphical Methods'), OSC('3-2-vector-addition-and-subtraction-graphical-methods', 'Vector Addition and Subtraction: Graphical Methods'), { nombre: 'PhET, Universidad de Colorado: Suma de vectores', url: 'https://phet.colorado.edu/es/simulations/vector-addition' }, WIKI('Magnitud_escalar', 'Magnitud escalar')],
  });
})();
