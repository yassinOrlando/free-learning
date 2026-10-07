// Física · Unidad 7: Ondas, sonido y luz.
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
  const oculta = (desde, hasta) => ({ tipo: 'linea', desde, hasta, punteada: true });
  const diagrama = (x, y, figuras, descripcion) => G({ x, y, figuras, descripcion, proporcional: true, ejes: false });

  const OSC = (pagina, nombre) => ({ nombre: `OpenStax, College Physics 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/college-physics-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN_SONIDO = { nombre: 'Khan Academy en español: Ondas mecánicas y sonido', url: 'https://es.khanacademy.org/science/physics/mechanical-waves-and-sound' };
  const KHAN_OPTICA = { nombre: 'Khan Academy en español: Óptica geométrica', url: 'https://es.khanacademy.org/science/physics/geometric-optics' };
  const PHET = (sim, nombre) => ({ nombre: `PhET, Universidad de Colorado: ${nombre}`, url: `https://phet.colorado.edu/es/simulations/${sim}` });

  // ------------------------------------------------------------------
  const ONDA = G({ x: [0, 8], y: [-3, 5], funciones: [{ f: (x) => 2 * Math.sin(2 * Math.PI * (x - 0) / 4), etiqueta: 'forma de la cuerda' }],
    figuras: [oculta([1, 2.9], [5, 2.9]), txt(3, 3.4, 'longitud de onda: 4 m'), oculta([5, 0], [5, 2]), txt(6.6, 1, 'amplitud: 2 m')],
    puntos: [{ x: 1, y: 2, etiqueta: 'cresta' }, { x: 3, y: -2, etiqueta: 'valle' }],
    descripcion: 'Foto de una onda en una cuerda. El eje horizontal es la posición a lo largo de la cuerda, de 0 a 8 m, y el vertical cuánto se aleja la cuerda de su lugar de reposo. La cuerda sube y baja de forma pareja entre 2 m y −2 m. Hay crestas en 1 m y 5 m, y valles en 3 m y 7 m. Una línea punteada marca la distancia entre dos crestas, la longitud de onda, de 4 m. Otra marca la amplitud, de 2 m, desde el centro hasta una cresta.' });

  L('Qué es una onda', {
    objetivo: 'Reconocer qué es una onda, describirla con su amplitud, su longitud de onda y su frecuencia, y usar v = λ·f.',
    explicacion: `
      <p>Lanza una piedra a un estanque tranquilo. Se forman círculos que se alejan del lugar donde cayó. Si hay una hoja flotando, sube y baja cuando le pasan los círculos, pero no viaja con ellos: se queda casi en el mismo lugar. Lo que viaja no es el agua, sino un movimiento.</p>
      <h3>¿Qué es una onda?</h3>
      <p>Una <strong>onda</strong> es una perturbación que viaja de un lugar a otro llevando energía, sin llevarse la materia. Pasa lo mismo con "la ola" en un estadio: cada persona solo se levanta y se sienta en su lugar, pero la ola recorre todo el estadio.</p>
      <p>Hay dos formas en que se puede mover el material por donde pasa una onda:</p>
      <ul>
        <li>En las ondas transversales, el material se mueve de lado, perpendicular a la dirección en que avanza la onda. Así es una cuerda que sacudes hacia arriba y hacia abajo.</li>
        <li>En las ondas longitudinales, el material se mueve hacia adelante y hacia atrás, en la misma dirección en que avanza la onda. Así es un resorte largo que empujas por una punta: se forman zonas apretadas y zonas estiradas que viajan por él.</li>
      </ul>
      <h3>¿Cómo se describe una onda?</h3>
      ${ONDA}
      <p>En la foto de la cuerda, los puntos más altos se llaman crestas y los más bajos, valles. Para describir la onda se usan tres medidas:</p>
      <ul>
        <li>La <strong>amplitud</strong> es qué tanto se aleja el material de su lugar de reposo: la altura de una cresta medida desde el centro. Mientras más amplitud, más energía lleva la onda.</li>
        <li>La <strong>longitud de onda</strong> es la distancia entre dos crestas seguidas. Se escribe con la letra griega λ (lambda).</li>
        <li>La frecuencia es cuántas crestas pasan por un punto en cada segundo, en hertz (Hz), igual que en el movimiento circular de la Unidad 2. El periodo es el tiempo entre una cresta y la siguiente, y vale T = 1 ÷ f.</li>
      </ul>
      <h3>¿Qué tan rápido viaja?</h3>
      <p>En un periodo, cada cresta avanza justo hasta donde estaba la siguiente: recorre una longitud de onda. Así que la rapidez de la onda es λ ÷ T, y como dividir entre T es lo mismo que multiplicar por f:</p>
      <p>v = λ·f</p>
      <p>Se lee "la rapidez de la onda es la longitud de onda por la frecuencia". Si en una cuerda las crestas están a 4 m una de otra y pasan 2 cada segundo, la onda avanza 4 × 2 = 8 m cada segundo.</p>
      <p>La rapidez la decide el material por donde viaja la onda. Si sacudes la mano más rápido, aumenta la frecuencia, pero la rapidez sigue igual, así que las crestas quedan más juntas: la longitud de onda se acorta.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que el agua de una ola viaja junto con la ola. El agua solo sube, baja y gira un poco en su lugar; lo que viaja hasta la playa es la energía.</p>`,
    ejemplo: `
      <p>Una niña sacude una cuerda larga 2 veces por segundo, y las crestas quedan a 1.5 m una de otra. ¿A qué rapidez viaja la onda? ¿Cuánto tarda en llegar a una pared que está a 6 m?</p>
      <ol class="pasos-ej">
        <li>Primero identifica los datos. Sacude 2 veces por segundo, así que la frecuencia es f = 2 Hz. La distancia entre crestas es la longitud de onda: λ = 1.5 m.</li>
        <li>Usa v = λ·f: v = 1.5 × 2 = 3 m/s.</li>
        <li>Para el tiempo, usa lo que viste en la Unidad 2: tiempo = distancia ÷ rapidez = 6 ÷ 3 = 2 s.</li>
        <li>Comprueba de otra forma: en 2 s, la niña hace 2 × 2 = 4 sacudidas, y 4 longitudes de onda de 1.5 m suman 6 m, justo la distancia a la pared.</li>
      </ol>
      <p>Resultado: <span class="resultado">3 m/s; tarda 2 s en llegar a la pared</span>.</p>
      <p class="nota"><strong>Error común:</strong> sumar 1.5 + 2. La rapidez sale de multiplicar la longitud de onda por la frecuencia.</p>`,
    vidaReal: `
      <p>Las ondas están en muchas cosas que vives a diario:</p>
      <ul>
        <li>El sonido que oyes y la luz que ves llegan a ti viajando de esta forma.</li>
        <li>El radio, la televisión, el celular y el wifi envían información con ondas invisibles.</li>
        <li>Los sismos son ondas que viajan por la Tierra, y estudiarlas ayuda a construir edificios más seguros.</li>
        <li>Los surfistas aprovechan la energía de las olas del mar para deslizarse hasta la orilla.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una onda tiene una longitud de onda de 2 m y una frecuencia de 3 Hz. ¿A qué rapidez viaja, en m/s?</p>', respuesta: 2 * 3,
        pista: '<p>Usa v = λ·f.</p>',
        solucion: '<p>v = 2 × 3 = <strong>6 m/s</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una onda viaja a 340 m/s con una frecuencia de 170 Hz. ¿Cuál es su longitud de onda, en m?</p>', respuesta: 340 / 170,
        pista: '<p>Despeja λ de v = λ·f: ¿qué número por 170 da 340?</p>',
        solucion: '<p>λ = v ÷ f = 340 ÷ 170 = <strong>2 m</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Entre una cresta y la siguiente pasan 0.5 s. ¿Cuál es la frecuencia de la onda, en Hz?</p>', respuesta: 1 / 0.5,
        pista: '<p>El periodo es 0.5 s. Usa f = 1 ÷ T.</p>',
        solucion: '<p>f = 1 ÷ 0.5 = <strong>2 Hz</strong>: pasan dos crestas cada segundo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un pato flota en un estanque y le pasan varias ondas. ¿Qué hace el pato?</p>',
        opciones: ['Viaja con las ondas hasta la orilla', 'Sube y baja casi en el mismo lugar', 'Se hunde', 'Se queda totalmente quieto'], correcta: 1,
        pista: '<p>¿Qué lleva una onda: materia o energía?</p>',
        solucion: '<p>La onda lleva energía, no materia: el pato <strong>sube y baja casi en el mismo lugar</strong> mientras la onda sigue de largo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Empujas un resorte largo por una punta y se forman zonas apretadas que viajan por él. ¿Qué tipo de onda es?</p>',
        opciones: ['Transversal', 'Longitudinal', 'No es una onda', 'Circular'], correcta: 1,
        pista: '<p>Las vueltas del resorte se mueven en la misma dirección en que avanza la onda.</p>',
        solucion: '<p>Es <strong>longitudinal</strong>: el resorte se mueve hacia adelante y hacia atrás, en la misma dirección en que viaja la onda.</p>' },
      { tipo: 'numero', enunciado: '<p>En el mar, las crestas de las olas están a 10 m una de otra y llega una a la playa cada 5 s. ¿A qué rapidez viajan las olas, en m/s?</p>', respuesta: 10 / 5,
        pista: '<p>En un periodo, la ola avanza una longitud de onda.</p>',
        solucion: '<p>Cada 5 s avanza 10 m, así que v = 10 ÷ 5 = <strong>2 m/s</strong>. Con la fórmula: f = 1 ÷ 5 = 0.2 Hz y v = 10 × 0.2 = 2 m/s.</p>' },
    ],
    fuentes: [OSC('16-9-waves', 'Waves'), PHET('wave-on-a-string', 'Onda en una cuerda'), WIKI('Onda', 'Onda'), KHAN_SONIDO],
  });

  // ------------------------------------------------------------------
  L('El sonido', {
    objetivo: 'Entender cómo se produce y viaja el sonido, relacionar el tono con la frecuencia y calcular distancias con el eco.',
    explicacion: `
      <p>Pon los dedos en tu garganta y di "aaaa". Sientes un cosquilleo: tus cuerdas vocales están vibrando. Todo sonido empieza así, con algo que vibra: la cuerda de una guitarra, la piel de un tambor, la bocina de tu celular.</p>
      <h3>¿Cómo viaja el sonido?</h3>
      <p>Cuando algo vibra, empuja al aire de al lado y lo aprieta; luego se retira y lo deja menos apretado. Esas zonas apretadas y estiradas viajan por el aire hasta tu oído, como en el resorte de la lección anterior. El <strong>sonido</strong> es, entonces, una onda longitudinal que viaja por un material.</p>
      <p>Como necesita algo que empujar, el sonido no viaja por el vacío. En el espacio, una explosión no se oiría. En cambio, viaja más rápido en los líquidos y en los sólidos, donde las partículas están más juntas y se pasan el empujón más rápido:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Material</th><th>Rapidez del sonido</th></tr>
        <tr><th>Aire a 20 °C</th><td>343 m/s</td></tr>
        <tr><th>Agua</th><td>unos 1 480 m/s</td></tr>
        <tr><th>Acero</th><td>unos 5 900 m/s</td></tr>
      </table></div>
      <h3>¿Agudo o grave? ¿Fuerte o suave?</h3>
      <p>Que un sonido sea agudo, como un silbato, o grave, como un tambor, se llama su <strong>tono</strong>, y depende de la frecuencia. Mientras más vibraciones por segundo, más agudo. Las personas oímos entre 20 Hz y 20 000 Hz, más o menos. Los sonidos más agudos que eso se llaman ultrasonido; los perros y los murciélagos sí los oyen, y los médicos los usan para hacer ecografías.</p>
      <p>Que un sonido sea fuerte o suave depende de su amplitud: qué tanto se aprieta el aire en cada vibración. El volumen se mide en decibeles (dB). Una conversación tiene unos 60 dB; un concierto, más de 100 dB. Escuchar por mucho tiempo sonidos de más de 85 dB puede dañar el oído para siempre.</p>
      <h3>El eco</h3>
      <p>Cuando el sonido choca con una pared o una montaña, rebota y regresa. Al sonido que regresa se le llama <strong>eco</strong>. Si mides cuánto tarda, puedes calcular a qué distancia está lo que lo reflejó. Ojo: el sonido va y vuelve, así que recorre el doble de la distancia:</p>
      <p>distancia = ${F('v·t', '2')}</p>
      <p>Se lee "la distancia es la rapidez del sonido por el tiempo, entre 2". Así miden la profundidad del mar los barcos, y así se orientan los murciélagos.</p>
      <h3>¿Qué tan lejos está la tormenta?</h3>
      <p>La luz del relámpago llega casi al instante, pero el trueno viaja a 343 m/s y tarda más. En 3 segundos, el sonido recorre unos 343 × 3 ≈ 1 000 m. Por eso, si cuentas los segundos entre el relámpago y el trueno y divides entre 3, sabes a cuántos kilómetros está la tormenta.</p>
      <p class="nota"><strong>Trampa común:</strong> olvidar que en el eco el sonido va y vuelve. El tiempo medido es de ida y vuelta, así que la distancia es la mitad de lo que recorrió el sonido.</p>`,
    ejemplo: `
      <p>En un cañón, gritas "hola" y oyes el eco 2 s después. ¿A qué distancia está la pared del cañón? Usa 343 m/s para la rapidez del sonido.</p>
      <ol class="pasos-ej">
        <li>Primero piensa qué mediste. Los 2 s empiezan cuando gritas y terminan cuando oyes el eco, así que cubren el viaje completo: ida hasta la pared y regreso hasta ti.</li>
        <li>Calcula cuánto recorrió el sonido en esos 2 s. Como va a 343 m/s, recorre 343 × 2 = 686 m.</li>
        <li>Ese camino incluye la ida y la vuelta, y la pared solo está en la mitad del recorrido. Por eso divide entre 2: 686 ÷ 2 = 343 m.</li>
        <li>Comprueba: si la pared está a 343 m, el sonido tarda 1 s en llegar y 1 s en volver, 2 s en total, que es lo que mediste.</li>
      </ol>
      <p>Resultado: <span class="resultado">343 m</span>.</p>
      <p class="nota"><strong>Error común:</strong> responder 686 m. Ese es el camino de ida y vuelta, no la distancia a la pared.</p>`,
    vidaReal: `
      <p>Entender cómo viaja lo que oyes tiene usos muy prácticos:</p>
      <ul>
        <li>Contar los segundos entre el relámpago y el trueno te dice si una tormenta se acerca.</li>
        <li>Los médicos ven a los bebés antes de nacer con aparatos que usan vibraciones demasiado agudas para oírlas.</li>
        <li>Bajar el volumen de los audífonos protege tus oídos.</li>
        <li>Los barcos miden la profundidad del mar escuchando el rebote de sus propios sonidos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Ves un relámpago y oyes el trueno 6 s después. ¿A cuántos metros está la tormenta? Usa 343 m/s.</p>', respuesta: 343 * 6, tolerancia: 60,
        pista: '<p>La luz llega casi al instante. Calcula cuánto recorre el sonido en 6 s.</p>',
        solucion: '<p>343 × 6 = <strong>2 058 m</strong>, unos 2 km. Con el atajo: 6 ÷ 3 = 2 km, que es 2 000 m y también cuenta como correcto.</p>' },
      { tipo: 'numero', enunciado: '<p>Gritas frente a un edificio y oyes el eco 4 s después. ¿A cuántos metros está el edificio? Usa 343 m/s.</p>', respuesta: 343 * 4 / 2,
        pista: '<p>El sonido fue y regresó.</p>',
        solucion: '<p>El sonido recorrió 343 × 4 = 1 372 m de ida y vuelta, así que el edificio está a 1 372 ÷ 2 = <strong>686 m</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un sonido de 343 Hz viaja por el aire a 343 m/s. ¿Cuál es su longitud de onda, en m?</p>', respuesta: 343 / 343,
        pista: '<p>Usa λ = v ÷ f.</p>',
        solucion: '<p>λ = 343 ÷ 343 = <strong>1 m</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>En una película, una nave explota en el espacio con un gran estruendo. ¿Es realista?</p>',
        opciones: ['Sí, las explosiones grandes siempre suenan', 'No, el sonido no viaja por el vacío', 'Sí, el sonido viaja más rápido en el vacío', 'Solo si la nave es de metal'], correcta: 1,
        pista: '<p>¿Qué necesita el sonido para viajar?</p>',
        solucion: '<p><strong>No es realista</strong>: el sonido necesita un material que vibre, y en el vacío del espacio no hay nada que empujar.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un silbato suena mucho más agudo que un tambor. ¿Qué tiene mayor el silbato?</p>',
        opciones: ['Amplitud', 'Frecuencia', 'Rapidez', 'Longitud de onda'], correcta: 1,
        pista: '<p>El tono depende de cuántas vibraciones hay por segundo.</p>',
        solucion: '<p>Un sonido agudo tiene <strong>mayor frecuencia</strong>. Como viajan a la misma rapidez, su longitud de onda es menor.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un aparato emite un sonido de 30 000 Hz. ¿Lo puede oír una persona?</p>',
        opciones: ['Sí, se oye muy agudo', 'No, está por encima de lo que oye el oído humano', 'Sí, pero muy grave', 'Solo si está muy fuerte'], correcta: 1,
        pista: '<p>Las personas oímos más o menos entre 20 y 20 000 Hz.</p>',
        solucion: '<p>30 000 Hz es ultrasonido, <strong>más agudo de lo que podemos oír</strong>. Un perro o un murciélago sí podría oírlo.</p>' },
    ],
    fuentes: [OSC('17-1-sound', 'Sound'), OSC('17-2-speed-of-sound-frequency-and-wavelength', 'Speed of Sound, Frequency, and Wavelength'), PHET('sound-waves', 'Ondas de sonido'), WIKI('Sonido', 'Sonido')],
  });

  // ------------------------------------------------------------------
  L('Efecto Doppler', {
    objetivo: 'Explicar por qué cambia el tono de un sonido cuando su fuente se acerca o se aleja, y calcular la frecuencia que se oye.',
    explicacion: `
      <p>Estás en la banqueta y pasa una ambulancia con la sirena encendida. Mientras se acerca, el sonido es más agudo; justo al pasar frente a ti, de golpe se vuelve más grave. La sirena no cambió: suena igual para quien va adentro. Lo que cambió es cómo te llega a ti.</p>
      <h3>¿Por qué cambia el tono?</h3>
      <p>Imagina que la sirena lanza una cresta de sonido en cada vibración. Si la ambulancia está quieta, las crestas salen en círculos parejos, todas a la misma distancia. Pero si avanza, entre una cresta y la siguiente la ambulancia ya se movió un poco hacia adelante. Por eso, delante de ella, las crestas quedan más amontonadas, y detrás, más separadas.</p>
      <p>Delante, la longitud de onda es más corta, así que te llegan más crestas por segundo: oyes una frecuencia más alta, un sonido más agudo. Detrás, la longitud de onda es más larga, te llegan menos crestas por segundo y oyes un sonido más grave. A este cambio en la frecuencia que se percibe, por el movimiento de la fuente o de quien escucha, se le llama <strong>efecto Doppler</strong>, por el físico austriaco Christian Doppler.</p>
      <h3>¿Cuánto cambia?</h3>
      <p>Si la fuente se acerca a ti, que estás quieto, con rapidez v<sub>f</sub>, en cada periodo T el sonido avanza v·T, pero la fuente avanza v<sub>f</sub>·T en la misma dirección. Así que la cresta nueva sale más cerca de la anterior: la distancia entre crestas es (v − v<sub>f</sub>)·T. Como la frecuencia que oyes es la rapidez del sonido entre esa longitud de onda, queda:</p>
      <p>acercándose: f′ = f · ${F('v', 'v − v<sub>f</sub>')} &nbsp;&nbsp; alejándose: f′ = f · ${F('v', 'v + v<sub>f</sub>')}</p>
      <p>Se leen "la frecuencia que oyes es la frecuencia original por la rapidez del sonido entre la rapidez del sonido menos (o más) la rapidez de la fuente". f es la <strong>frecuencia que emite la fuente</strong>, f′ (se lee "f prima") es <strong>la que oyes tú</strong>, v es la rapidez del sonido y v<sub>f</sub> es la rapidez de la fuente.</p>
      <p>Fíjate en el porqué del signo: al acercarse, el número de abajo es más chico que el de arriba, así que la fracción es mayor que 1 y la frecuencia sube. Al alejarse, la fracción es menor que 1 y la frecuencia baja. Si la fuente está quieta, v<sub>f</sub> = 0, la fracción vale 1 y oyes el sonido tal cual.</p>
      <h3>No solo con el sonido</h3>
      <p>El efecto Doppler pasa con todas las ondas, también con la luz. Los radares de la policía lanzan ondas a los coches y miden cuánto cambia la frecuencia al rebotar; con eso calculan su velocidad. Los meteorólogos usan el mismo truco para ver hacia dónde se mueve la lluvia. Y los astrónomos ven que la luz de las galaxias lejanas llega con longitudes de onda más largas, corrida hacia el rojo: eso indica que se alejan de nosotros.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que el sonido se vuelve más agudo porque la ambulancia acelera o porque el sonido "se vuelve más fuerte". El tono cambia por la dirección del movimiento: más agudo al acercarse y más grave al alejarse, aunque vaya siempre a la misma rapidez.</p>`,
    ejemplo: `
      <p>Una sirena emite 700 Hz y la ambulancia va a 30 m/s. ¿Qué frecuencia oyes cuando se acerca y cuál cuando se aleja? Usa 340 m/s para la rapidez del sonido.</p>
      <ol class="pasos-ej">
        <li>Primero, al acercarse. Las crestas se amontonan, así que se resta abajo: f′ = 700 × 340 ÷ (340 − 30) = 700 × 340 ÷ 310 ≈ 767.7 Hz.</li>
        <li>Ahora, al alejarse. Las crestas se separan, así que se suma abajo: f′ = 700 × 340 ÷ (340 + 30) = 700 × 340 ÷ 370 ≈ 643.2 Hz.</li>
        <li>Comprueba que tenga sentido: al acercarse la frecuencia es mayor que 700 (más agudo) y al alejarse es menor (más grave), como se oye en la calle.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 768 Hz al acercarse y 643 Hz al alejarse</span>. Ese salto de más de 100 Hz es el cambio que notas al pasar la ambulancia.</p>
      <p class="nota"><strong>Error común:</strong> intercambiar los signos. Si al acercarse te da menos de 700 Hz, usaste la fórmula equivocada.</p>`,
    vidaReal: `
      <p>Que el tono cambie con el movimiento tiene usos que quizá no imaginas:</p>
      <ul>
        <li>Puedes saber si una ambulancia o un tren se acercan o se alejan solo por cómo suena.</li>
        <li>Los radares de velocidad en las carreteras miden qué tan rápido va un coche.</li>
        <li>Los médicos miden qué tan rápido corre la sangre por las venas con aparatos de ultrasonido.</li>
        <li>Los astrónomos saben que el universo se expande estudiando la luz de galaxias lejanas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una bocina emite 640 Hz y se acerca a ti a 20 m/s. ¿Qué frecuencia oyes, en Hz? Usa 340 m/s para el sonido.</p>', respuesta: 640 * 340 / (340 - 20),
        pista: '<p>Al acercarse, se resta abajo: f′ = f · v ÷ (v − v<sub>f</sub>).</p>',
        solucion: '<p>f′ = 640 × 340 ÷ 320 = 640 × 1.0625 = <strong>680 Hz</strong>, más agudo que el original.</p>' },
      { tipo: 'numero', enunciado: '<p>La misma bocina (640 Hz, a 20 m/s) ahora se aleja de ti. ¿Qué frecuencia oyes, en Hz? Redondea a un decimal.</p>', respuesta: 640 * 340 / (340 + 20), tolerancia: 0.06,
        pista: '<p>Al alejarse, se suma abajo: f′ = f · v ÷ (v + v<sub>f</sub>).</p>',
        solucion: '<p>f′ = 640 × 340 ÷ 360 ≈ <strong>604.4 Hz</strong>, más grave que el original.</p>' },
      { tipo: 'numero', enunciado: '<p>Una fuente emite 200 Hz y se acerca a 40 m/s. El sonido viaja a 340 m/s. ¿Cuál es la longitud de onda delante de la fuente, en m?</p>', respuesta: (340 - 40) / 200,
        pista: '<p>En cada periodo, el sonido avanza v·T y la fuente avanza v<sub>f</sub>·T. Con T = 1 ÷ f, la distancia entre crestas es (v − v<sub>f</sub>) ÷ f.</p>',
        solucion: '<p>λ′ = (340 − 40) ÷ 200 = 300 ÷ 200 = <strong>1.5 m</strong>. Sin moverse sería 340 ÷ 200 = 1.7 m: delante, las crestas se amontonan.</p>' },
      { tipo: 'opciones', enunciado: '<p>Para el chofer de la ambulancia, que va dentro, ¿cómo suena la sirena?</p>',
        opciones: ['Más aguda todo el tiempo', 'Más grave todo el tiempo', 'Igual, sin cambio de tono', 'Cambia al pasar frente a una persona'], correcta: 2,
        pista: '<p>¿El chofer se acerca o se aleja de la sirena?</p>',
        solucion: '<p>El chofer se mueve junto con la sirena, así que no se acerca ni se aleja de ella: la oye <strong>igual, sin cambio de tono</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>La luz de una galaxia llega con longitudes de onda más largas de lo normal, corrida hacia el rojo. ¿Qué significa?</p>',
        opciones: ['Que se acerca a nosotros', 'Que se aleja de nosotros', 'Que está quieta', 'Que es muy caliente'], correcta: 1,
        pista: '<p>Cuando una fuente se aleja, sus ondas llegan más separadas.</p>',
        solucion: '<p>Ondas más separadas, con longitud de onda más larga, indican que la galaxia <strong>se aleja de nosotros</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un tren con la bocina encendida se acerca a la estación a rapidez constante. ¿Cómo oyes la bocina mientras se acerca?</p>',
        opciones: ['Más grave que su sonido real', 'Más aguda que su sonido real', 'Igual que su sonido real', 'No se oye'], correcta: 1,
        pista: '<p>Al acercarse, las crestas se amontonan delante del tren.</p>',
        solucion: '<p>Las crestas te llegan más amontonadas, con mayor frecuencia: la oyes <strong>más aguda</strong>. Al pasar y alejarse, se oirá más grave.</p>' },
    ],
    fuentes: [OSC('17-4-doppler-effect-and-sonic-booms', 'Doppler Effect and Sonic Booms'), WIKI('Efecto_Doppler', 'Efecto Doppler'), KHAN_SONIDO],
  });

  // ------------------------------------------------------------------
  L('Naturaleza de la luz', {
    objetivo: 'Reconocer la luz como una onda electromagnética, ubicarla en el espectro y calcular cuánto tarda en recorrer grandes distancias.',
    explicacion: `
      <p>Cuando ves el Sol, no lo ves como está ahora, sino como estaba hace unos 8 minutos. Ese es el tiempo que tarda su luz en llegar hasta nosotros. La luz es lo más rápido que existe, pero no es instantánea.</p>
      <h3>¿Qué es la luz?</h3>
      <p>La luz es una onda, pero distinta del sonido. No necesita aire ni nada que empujar: viaja perfectamente por el vacío, y por eso nos llega la luz del Sol y de las estrellas. Es una vibración de campos eléctricos y magnéticos, del tipo que verás en la unidad de electricidad. Por eso se le llama <strong>onda electromagnética</strong>.</p>
      <p>En el vacío, la luz viaja a unos 300 000 km cada segundo. Se escribe con la letra c:</p>
      <p>c ≈ 300 000 km/s = 3 × 10⁸ m/s</p>
      <p>A esa rapidez, la luz le da más de 7 vueltas a la Tierra en un segundo. En el agua o en el vidrio va un poco más lenta, como verás en la lección de refracción.</p>
      <h3>Mucho más que lo que vemos</h3>
      <p>La luz que ven nuestros ojos es solo una pequeña parte de una familia enorme de ondas electromagnéticas. Todas viajan a la misma rapidez en el vacío; lo que cambia es su longitud de onda. A toda la familia ordenada se le llama <strong>espectro electromagnético</strong>:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Tipo</th><th>Longitud de onda aproximada</th><th>Para qué se usa</th></tr>
        <tr><th>Ondas de radio</th><td>de metros a kilómetros</td><td>Radio, televisión</td></tr>
        <tr><th>Microondas</th><td>centímetros</td><td>Horno de microondas, celulares, wifi</td></tr>
        <tr><th>Infrarrojo</th><td>menos de un milímetro</td><td>Controles remotos, cámaras térmicas</td></tr>
        <tr><th>Luz visible</th><td>de 400 a 700 nanómetros</td><td>Ver</td></tr>
        <tr><th>Ultravioleta</th><td>de 10 a 400 nanómetros</td><td>Broncea y quema la piel</td></tr>
        <tr><th>Rayos X</th><td>menos de 10 nanómetros</td><td>Radiografías</td></tr>
        <tr><th>Rayos gamma</th><td>todavía más cortas</td><td>Tratamientos contra el cáncer</td></tr>
      </table></div>
      <p>Un nanómetro es la milmillonésima parte de un metro. Mientras más corta es la longitud de onda, más energía entrega la luz cada vez que choca con algo. Por eso los rayos ultravioleta, los rayos X y los gamma pueden dañar las células, y las ondas de radio no.</p>
      <h3>¿Onda o partícula?</h3>
      <p>Durante siglos los científicos discutieron si la luz era una onda o una lluvia de partículas. Hoy sabemos que se comporta de las dos formas: viaja como una onda, pero entrega su energía en paquetes diminutos llamados fotones. Esa idea es la base de la física moderna, que verás al final del curso.</p>
      <h3>Distancias enormes</h3>
      <p>Para medir las distancias entre estrellas, los kilómetros se quedan cortos. Se usa el <strong>año luz</strong>: la distancia que recorre la luz en un año, unos 9.5 billones de kilómetros (un billón es un millón de millones, así que son 9.5 × 10¹² km). Aunque tiene la palabra "año", es una distancia, no un tiempo. La estrella más cercana después del Sol está a unos 4.2 años luz.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que la luz necesita aire para viajar, como el sonido. La luz cruza el vacío del espacio sin problema; el sonido no.</p>`,
    ejemplo: `
      <p>El Sol está a unos 150 000 000 km de la Tierra. ¿Cuánto tarda su luz en llegar? Usa c = 300 000 km/s.</p>
      <ol class="pasos-ej">
        <li>Primero piensa qué operación usar: es un problema de distancia, rapidez y tiempo, como en la Unidad 2. El tiempo es la distancia entre la rapidez.</li>
        <li>Divide: 150 000 000 ÷ 300 000 = 500 s. Puedes quitar cinco ceros arriba y abajo: 1 500 ÷ 3 = 500.</li>
        <li>Pásalo a minutos: 500 ÷ 60 ≈ 8.3, es decir, 8 minutos y 20 segundos.</li>
        <li>Comprueba al revés: en 500 s, la luz recorre 300 000 × 500 = 150 000 000 km.</li>
      </ol>
      <p>Resultado: <span class="resultado">500 s, unos 8 minutos y 20 segundos</span>.</p>
      <p class="nota"><strong>Error común:</strong> mezclar kilómetros con metros. Si usas c = 300 000 km/s, la distancia también debe ir en kilómetros.</p>`,
    vidaReal: `
      <p>Lo que viaja como la luz está en muchos aparatos de tu casa:</p>
      <ul>
        <li>El horno de microondas, el control remoto y el wifi usan parientes invisibles de la luz.</li>
        <li>El bloqueador solar te protege de la parte invisible de la luz del Sol que quema la piel.</li>
        <li>Las radiografías permiten ver los huesos sin abrir el cuerpo.</li>
        <li>Al ver las estrellas, ves luz que salió de ellas hace años, a veces muchísimos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>La Luna está a unos 384 000 km de la Tierra. ¿Cuántos segundos tarda su luz en llegar? Usa c = 300 000 km/s.</p>', respuesta: 384000 / 300000, tolerancia: 0.05,
        pista: '<p>Divide la distancia entre la rapidez de la luz.</p>',
        solucion: '<p>384 000 ÷ 300 000 = <strong>1.28 s</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos kilómetros recorre la luz en 3 s? Usa c = 300 000 km/s.</p>', respuesta: 300000 * 3,
        pista: '<p>Distancia = rapidez × tiempo.</p>',
        solucion: '<p>300 000 × 3 = <strong>900 000 km</strong>, más del doble de la distancia a la Luna.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas puede viajar por el vacío del espacio?</p>',
        opciones: ['El sonido', 'La luz', 'Las olas del mar', 'Ninguna'], correcta: 1,
        pista: '<p>¿Cuál de ellas necesita un material que vibre?</p>',
        solucion: '<p>Solo <strong>la luz</strong>, que es una onda electromagnética. El sonido y las olas necesitan un material por donde viajar.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas ondas electromagnéticas tiene la longitud de onda más larga?</p>',
        opciones: ['Rayos X', 'Luz visible', 'Ondas de radio', 'Ultravioleta'], correcta: 2,
        pista: '<p>Revisa la tabla del espectro.</p>',
        solucion: '<p>Las <strong>ondas de radio</strong>, con longitudes de metros o kilómetros. Los rayos X son las más cortas de las cuatro.</p>' },
      { tipo: 'numero', enunciado: '<p>Una estación de radio transmite a 100 000 000 Hz (100 MHz). ¿Cuál es la longitud de onda de sus ondas, en m? Usa c = 300 000 000 m/s.</p>', respuesta: 300000000 / 100000000,
        pista: '<p>Usa λ = c ÷ f, como en la lección de ondas.</p>',
        solucion: '<p>λ = 300 000 000 ÷ 100 000 000 = <strong>3 m</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué mide un año luz?</p>',
        opciones: ['Un tiempo', 'Una distancia', 'Una rapidez', 'Un brillo'], correcta: 1,
        pista: '<p>Es lo que recorre la luz en un año.</p>',
        solucion: '<p>Un año luz es <strong>una distancia</strong>: lo que recorre la luz en un año, unos 9.5 billones de kilómetros.</p>' },
    ],
    fuentes: [OSC('24-3-the-electromagnetic-spectrum', 'The Electromagnetic Spectrum'), WIKI('Luz', 'Luz'), WIKI('Espectro_electromagnético', 'Espectro electromagnético')],
  });

  // ------------------------------------------------------------------
  const REFLEJO = diagrama([-3.4, 3.4], [-0.9, 3.4], [
    { tipo: 'linea', desde: [-3, 0], hasta: [3, 0] }, txt(-2.3, -0.45, 'espejo'),
    oculta([0, 0], [0, 3]), txt(0, 3.25, 'normal'),
    ...flecha([-2.2, 2.2], [0, 0]), txt(-2.6, 2.5, 'rayo que llega'),
    ...flecha([0, 0], [2.2, 2.2]), txt(2.5, 2.5, 'rayo reflejado'),
    { tipo: 'angulo', x: 0, y: 0, desde: 90, hasta: 135, r: 0.9, etiqueta: '45°' },
    { tipo: 'angulo', x: 0, y: 0, desde: 45, hasta: 90, r: 0.9, etiqueta: '45°' },
  ], 'Un espejo plano horizontal. Una línea punteada vertical, la normal, sale del punto donde llega la luz. Un rayo baja desde la izquierda hasta ese punto formando 45° con la normal, y el rayo reflejado sube hacia la derecha formando también 45° con la normal.');

  L('Reflexión y espejos', {
    objetivo: 'Usar la ley de la reflexión para predecir hacia dónde rebota la luz y entender cómo forman imágenes los espejos planos, cóncavos y convexos.',
    explicacion: `
      <p>En un día sin viento te asomas a un charco y ves tu cara. Pero si alguien lanza una piedra y el agua se agita, tu reflejo se deshace. La luz rebota en el agua, y la forma de la superficie decide qué ves.</p>
      <h3>¿Cómo rebota la luz?</h3>
      <p>Cuando la luz choca con una superficie y regresa, se dice que se refleja. A ese rebote se le llama <strong>reflexión</strong>. Para describirlo, se traza una línea imaginaria perpendicular a la superficie en el punto donde llega la luz, llamada la <strong>normal</strong>. Los ángulos se miden desde ella.</p>
      ${REFLEJO}
      <p>La ley de la reflexión dice que el ángulo con el que llega la luz es igual al ángulo con el que sale. Es como una pelota que rebota en la pared sin girar: si llega inclinada, sale con la misma inclinación hacia el otro lado.</p>
      <h3>Superficies lisas y rugosas</h3>
      <p>Un espejo o el agua quieta son tan lisos que todos los rayos rebotan en orden, y se forma una imagen clara. Una hoja de papel parece lisa, pero de cerca está llena de fibras en todas direcciones: cada rayo rebota hacia un lado distinto, y la luz se esparce sin formar imagen. Por eso ves la hoja desde cualquier lugar, pero no te ves reflejado en ella.</p>
      <h3>El espejo plano</h3>
      <p>Cuando te ves en un espejo plano, tu imagen parece estar detrás del espejo, a la misma distancia a la que tú estás delante. Si te paras a 1 m del espejo, tu imagen parece estar 1 m detrás, a 2 m de ti. A esa imagen, que se ve pero por donde no pasa la luz de verdad, se le llama <strong>imagen virtual</strong>. Además, aparece con la izquierda y la derecha cambiadas: si levantas la mano derecha, tu reflejo levanta la izquierda.</p>
      <h3>Espejos curvos</h3>
      <p>Un espejo cóncavo está hundido hacia adentro, como el interior de una cuchara. Junta los rayos de luz en un punto, y por eso se usa en linternas, faros y antenas de televisión satelital. De cerca, agranda lo que refleja: así son los espejos para maquillarse.</p>
      <p>Un espejo convexo está abombado hacia afuera, como el dorso de una cuchara. Separa los rayos y muestra una vista más amplia, pero con los objetos más pequeños. Por eso se usa en los retrovisores laterales de los coches y en las esquinas de las tiendas. Por eso en muchos retrovisores dice "los objetos están más cerca de lo que parecen": se ven más chicos y, al verlos chicos, parecen más lejos.</p>
      <p class="nota"><strong>Trampa común:</strong> medir los ángulos desde la superficie del espejo en lugar de desde la normal. Si un rayo forma 30° con el espejo, forma 60° con la normal.</p>`,
    ejemplo: `
      <p>Una persona mide 1.70 m. ¿Qué altura mínima debe tener un espejo plano en la pared para que se vea completa, de los pies a la cabeza?</p>
      <ol class="pasos-ej">
        <li>Primero piensa en la luz que va de los pies a los ojos. Sale de los pies, rebota en el espejo y llega a los ojos. Como llega y sale con la misma inclinación, el rebote ocurre a la mitad de la altura entre los pies y los ojos.</li>
        <li>Lo mismo pasa con la luz de la coronilla: rebota a la mitad de la altura entre los ojos y la cabeza.</li>
        <li>El espejo solo necesita cubrir desde un punto de rebote hasta el otro. Esa distancia es la mitad de la altura total de la persona: 1.70 ÷ 2 = 0.85 m.</li>
        <li>Comprueba algo curioso: no importa a qué distancia te pares. Eso sí, el borde de abajo del espejo debe quedar a la mitad de la altura de tus ojos.</li>
      </ol>
      <p>Resultado: <span class="resultado">0.85 m, la mitad de su altura</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que el espejo debe medir lo mismo que la persona. Basta con la mitad, bien colocado.</p>`,
    vidaReal: `
      <p>Que la luz rebote de forma ordenada se aprovecha en muchos lugares:</p>
      <ul>
        <li>Los retrovisores curvos de los coches muestran más de lo que tienes detrás, y por eso evitan choques al cambiar de carril.</li>
        <li>Las linternas y los faros juntan la luz en un haz para iluminar lejos.</li>
        <li>Las antenas para televisión por satélite concentran la señal en un punto.</li>
        <li>Las paredes claras hacen que un cuarto se vea más iluminado, porque devuelven mucha luz en lugar de absorberla.</li>      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un rayo llega a un espejo formando 35° con la normal. ¿Con qué ángulo, medido desde la normal, sale reflejado?</p>', respuesta: 35,
        pista: '<p>La ley de la reflexión dice que los dos ángulos son iguales.</p>',
        solucion: '<p>El ángulo de salida es igual al de llegada: <strong>35°</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un rayo forma 20° con la superficie de un espejo. ¿Qué ángulo forma con la normal?</p>', respuesta: 90 - 20,
        pista: '<p>La normal es perpendicular al espejo: forma 90° con él.</p>',
        solucion: '<p>La normal forma 90° con el espejo, así que el rayo forma 90 − 20 = <strong>70°</strong> con la normal.</p>' },
      { tipo: 'numero', enunciado: '<p>Te paras a 2 m de un espejo plano. ¿A cuántos metros de ti parece estar tu imagen?</p>', respuesta: 2 * 2,
        pista: '<p>La imagen parece estar detrás del espejo, a la misma distancia que tú delante.</p>',
        solucion: '<p>Tú estás 2 m delante y tu imagen 2 m detrás: está a 2 + 2 = <strong>4 m</strong> de ti.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué los retrovisores laterales de los coches son espejos convexos?</p>',
        opciones: ['Porque agrandan los objetos', 'Porque muestran una vista más amplia', 'Porque juntan la luz en un punto', 'Porque son más baratos'], correcta: 1,
        pista: '<p>Un espejo convexo separa los rayos de luz.</p>',
        solucion: '<p>El espejo convexo <strong>muestra una vista más amplia</strong>, aunque los objetos se vean más chicos y parezcan más lejanos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué no te puedes ver reflejado en una hoja de papel blanca, aunque refleje mucha luz?</p>',
        opciones: ['Porque absorbe toda la luz', 'Porque su superficie es rugosa y esparce la luz en todas direcciones', 'Porque es muy delgada', 'Porque es blanca'], correcta: 1,
        pista: '<p>Piensa en cómo es la superficie del papel vista de muy cerca.</p>',
        solucion: '<p>El papel tiene fibras en todas direcciones: <strong>esparce la luz</strong> sin orden, así que no forma una imagen.</p>' },
      { tipo: 'numero', enunciado: '<p>Una persona mide 1.60 m. ¿Qué altura mínima, en metros, debe tener un espejo plano para que se vea completa?</p>', respuesta: 1.6 / 2,
        pista: '<p>La luz de los pies y la de la cabeza rebotan a la mitad de cada altura.</p>',
        solucion: '<p>Basta con la mitad de su altura: 1.60 ÷ 2 = <strong>0.80 m</strong>.</p>' },
    ],
    fuentes: [OSC('25-2-the-law-of-reflection', 'The Law of Reflection'), OSC('25-7-image-formation-by-mirrors', 'Image Formation by Mirrors'), WIKI('Reflexión_(física)', 'Reflexión (física)'), KHAN_OPTICA],
  });

  // ------------------------------------------------------------------
  const QUIEBRE = diagrama([-3.2, 3.2], [-2.9, 2.9], [
    { tipo: 'linea', desde: [-3, 0], hasta: [3, 0] }, txt(-2.3, 0.35, 'aire'), txt(-2.3, -0.45, 'agua'),
    oculta([0, 2.6], [0, -2.6]), txt(0.55, 2.55, 'normal'),
    ...flecha([-1.84, 1.84], [0, 0]), txt(-2.1, 2.2, 'rayo que llega'),
    ...flecha([0, 0], [1.38, -2.2]), txt(2.1, -2.5, 'rayo desviado'),
    { tipo: 'angulo', x: 0, y: 0, desde: 90, hasta: 135, r: 0.8, etiqueta: '45°' },
    { tipo: 'angulo', x: 0, y: 0, desde: 270, hasta: 302, r: 0.8, etiqueta: '32°' },
  ], 'Un rayo de luz pasa del aire, arriba, al agua, abajo. La superficie del agua es una línea horizontal y una línea punteada vertical marca la normal. En el aire, el rayo forma 45° con la normal. Al entrar al agua se desvía y forma 32° con la normal: queda más cerca de ella.');

  L('Refracción y lentes', {
    objetivo: 'Explicar por qué la luz se desvía al cambiar de material, calcular su rapidez con el índice de refracción y reconocer cómo funcionan las lentes.',
    explicacion: `
      <p>Mete un popote en un vaso con agua y míralo de lado. Parece quebrado justo en la superficie del agua. El popote está entero; lo que se dobla es el camino de la luz que llega a tus ojos.</p>
      <h3>¿Por qué se desvía la luz?</h3>
      <p>La luz viaja a 300 000 km/s en el vacío, pero en otros materiales va más lenta. Cuando un rayo pasa inclinado de un material a otro, por ejemplo del aire al agua, cambia de rapidez y por eso cambia de dirección. A esa desviación se le llama <strong>refracción</strong>.</p>
      <p>Imagina un carrito del súper que pasa del piso liso a un tapete, entrando de lado. La rueda que toca primero el tapete se frena antes, mientras la otra sigue rápida, y el carrito gira. Con la luz pasa lo mismo: al entrar a un material donde va más lenta, se desvía hacia la normal; al salir a uno donde va más rápida, se aleja de ella. Si el rayo entra derecho, sin inclinación, no se desvía.</p>
      ${QUIEBRE}
      <p>En el diagrama, un rayo que llega al agua formando 45° con la normal queda, dentro del agua, a unos 32°: más cerca de la normal.</p>
      <h3>¿Qué tanto se frena la luz?</h3>
      <p>Para cada material se usa un número que dice cuántas veces más lenta va la luz ahí que en el vacío. Se llama <strong>índice de refracción</strong>, se escribe con la letra n y se calcula así:</p>
      <p>n = ${F('c', 'v')}</p>
      <p>Se lee "el índice de refracción es la rapidez de la luz en el vacío entre su rapidez en el material". Como la luz nunca va más rápido que en el vacío, n siempre es 1 o más. El aire tiene casi 1, el agua 1.33, el vidrio común unos 1.5 y el diamante 2.42. Mientras mayor es n, más lenta va la luz y más se desvía al entrar. Buena parte del brillo del diamante viene de eso.</p>
      <h3>Las lentes</h3>
      <p>Una <strong>lente</strong> es una pieza de vidrio o plástico con caras curvas, hecha para desviar la luz de forma ordenada. Hay dos tipos:</p>
      <ul>
        <li>Las lentes convergentes son más gruesas en el centro. Juntan los rayos en un punto, y de cerca agrandan lo que ves. Una lupa es una lente convergente, y también se usan en los lentes para quienes no ven bien de cerca.</li>
        <li>Las lentes divergentes son más delgadas en el centro. Separan los rayos. Se usan en los lentes para la miopía, cuando alguien no ve bien de lejos.</li>
      </ul>
      <p>Tu propio ojo tiene una lente natural, el cristalino, que junta la luz sobre el fondo del ojo para formar una imagen nítida. Cuando no la junta en el lugar justo, la vista se ve borrosa, y unos lentes la corrigen.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que la luz se desvía porque "rebota" en el agua. Eso es reflexión. En la refracción la luz sí entra al agua, pero cambia de dirección al cambiar de rapidez.</p>`,
    ejemplo: `
      <p>La luz entra a una ventana de vidrio con índice de refracción 1.5. ¿A qué rapidez viaja dentro del vidrio? Usa c = 300 000 km/s.</p>
      <ol class="pasos-ej">
        <li>Primero piensa qué te dice el índice: 1.5 significa que en el vidrio la luz va 1.5 veces más lenta que en el vacío.</li>
        <li>Despeja la rapidez de n = c ÷ v. Si n·v = c, entonces v = c ÷ n.</li>
        <li>Divide: v = 300 000 ÷ 1.5 = 200 000 km/s.</li>
        <li>Comprueba: 200 000 × 1.5 = 300 000, la rapidez en el vacío.</li>
      </ol>
      <p>Resultado: <span class="resultado">200 000 km/s</span>, todavía rapidísimo, pero un tercio más lento que en el vacío.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar 300 000 × 1.5. Daría una rapidez mayor que en el vacío, y eso es imposible.</p>`,
    vidaReal: `
      <p>Que la luz cambie de dirección al pasar de un material a otro tiene muchos usos:</p>
      <ul>
        <li>Los lentes y los lentes de contacto corrigen la vista de millones de personas.</li>
        <li>Las lupas, los microscopios y los telescopios permiten ver lo muy pequeño y lo muy lejano.</li>
        <li>Las cámaras de los celulares enfocan con piezas de vidrio curvo.</li>
        <li>Gracias a este cambio de dirección, una alberca parece menos honda de lo que realmente es, así que conviene meter el pie con cuidado.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿A qué rapidez viaja la luz en un vidrio con índice de refracción 1.5, en km/s? Usa c = 300 000 km/s.</p>', respuesta: 300000 / 1.5,
        pista: '<p>Usa v = c ÷ n.</p>',
        solucion: '<p>v = 300 000 ÷ 1.5 = <strong>200 000 km/s</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En un material, la luz viaja a 150 000 km/s. ¿Cuál es su índice de refracción? Usa c = 300 000 km/s.</p>', respuesta: 300000 / 150000,
        pista: '<p>Usa n = c ÷ v.</p>',
        solucion: '<p>n = 300 000 ÷ 150 000 = <strong>2</strong>: la luz va a la mitad de su rapidez en el vacío.</p>' },
      { tipo: 'numero', enunciado: '<p>Un material tiene índice de refracción 2.4. ¿A qué rapidez viaja la luz en él, en km/s? Usa c = 300 000 km/s.</p>', respuesta: 300000 / 2.4,
        pista: '<p>Divide la rapidez en el vacío entre el índice.</p>',
        solucion: '<p>v = 300 000 ÷ 2.4 = <strong>125 000 km/s</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un rayo de luz pasa inclinado del aire al agua. ¿Qué le pasa?</p>',
        opciones: ['Se desvía alejándose de la normal', 'Se desvía acercándose a la normal', 'Sigue derecho', 'Rebota hacia el aire'], correcta: 1,
        pista: '<p>En el agua la luz va más lenta que en el aire.</p>',
        solucion: '<p>Al entrar a un material donde va más lenta, la luz <strong>se desvía hacia la normal</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una persona con miopía no ve bien de lejos. ¿Qué tipo de lente la ayuda?</p>',
        opciones: ['Convergente, más gruesa en el centro', 'Divergente, más delgada en el centro', 'Un espejo cóncavo', 'Ninguna'], correcta: 1,
        pista: '<p>La miopía se corrige separando un poco los rayos antes de que entren al ojo.</p>',
        solucion: '<p>La miopía se corrige con lentes <strong>divergentes</strong>, que separan los rayos para que el ojo los junte en el lugar correcto.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué tipo de lente es una lupa?</p>',
        opciones: ['Divergente', 'Convergente', 'Plana', 'Un espejo'], correcta: 1,
        pista: '<p>Una lupa agranda lo que ves de cerca y puede juntar los rayos del sol en un punto.</p>',
        solucion: '<p>La lupa es una lente <strong>convergente</strong>: más gruesa en el centro, junta los rayos y agranda lo que ves de cerca.</p>' },
    ],
    fuentes: [OSC('25-3-the-law-of-refraction', 'The Law of Refraction'), OSC('25-6-image-formation-by-lenses', 'Image Formation by Lenses'), PHET('bending-light', 'Doblando la luz'), WIKI('Refracción', 'Refracción'), WIKI('Lente', 'Lente')],
  });

  // ------------------------------------------------------------------
  L('El color', {
    objetivo: 'Explicar de dónde salen los colores, por qué un objeto se ve de cierto color y cómo se mezclan la luz y las pinturas.',
    explicacion: `
      <p>Después de la lluvia, si el sol sale a tu espalda, a veces aparece un arcoíris. Y si pones un vaso con agua en una ventana soleada, en la pared puede aparecer una franja de colores. Esos colores no los pinta el agua: ya venían escondidos en la luz del sol.</p>
      <h3>La luz blanca es una mezcla</h3>
      <p>La luz del sol parece blanca, pero en realidad es una mezcla de todos los colores. Cada color es luz con una longitud de onda distinta: el rojo tiene la más larga, de unos 700 nanómetros, y el violeta la más corta, de unos 400. En medio, en orden, están el naranja, el amarillo, el verde y el azul.</p>
      <p>Al pasar por un prisma de vidrio o por una gota de agua, cada color se desvía un poco distinto, porque el índice de refracción cambia ligeramente con la longitud de onda: el violeta se desvía más y el rojo menos. Así los colores se separan. A esa separación de la luz en sus colores se le llama <strong>dispersión</strong>, y es lo que forma el arcoíris: millones de gotas que hacen de prismas.</p>
      <h3>¿Por qué una manzana se ve roja?</h3>
      <p>Una manzana no produce luz. Cuando la ilumina la luz blanca, absorbe casi todos los colores y refleja sobre todo el rojo. Esa luz roja es la que llega a tus ojos. Un objeto blanco refleja todos los colores; uno negro los absorbe casi todos. Por eso la ropa oscura se calienta más al sol.</p>
      <p>Esto tiene una consecuencia curiosa: el color de un objeto depende de la luz que lo ilumina. Bajo una luz que no tiene rojo, una manzana roja no tiene nada que reflejar y se ve oscura.</p>
      <h3>Mezclar luces y mezclar pinturas</h3>
      <p>Las pantallas de tu celular y tu televisión forman todos los colores con puntitos de solo tres luces: rojo, verde y azul. Al juntar luces, se suman colores: rojo y verde dan amarillo, y los tres juntos dan blanco. A esto se le llama <strong>mezcla aditiva</strong>, porque cada luz agrega algo.</p>
      <p>Con las pinturas pasa lo contrario. Cada pigmento absorbe, es decir, le quita a la luz ciertos colores. Al mezclar pinturas, se quitan cada vez más colores y el resultado se oscurece. A esto se le llama <strong>mezcla sustractiva</strong>. Las impresoras usan tres tintas, cian (azul verdoso), magenta (rosa intenso) y amarillo: cian y amarillo dan verde, y las tres juntas dan un color casi negro.</p>
      <h3>¿Por qué el cielo es azul?</h3>
      <p>El aire esparce en todas direcciones mucho más la luz de longitud de onda corta, como el azul, que la larga, como el rojo. Por eso, mires adonde mires, te llega luz azul del cielo. (El violeta se esparce todavía más, pero el Sol da menos de él y nuestros ojos lo ven peor.) Al atardecer, la luz cruza mucho más aire, el azul se esparce por el camino y llegan sobre todo el naranja y el rojo.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que el color está "dentro" del objeto. El color depende de qué luz refleja el objeto y de qué luz lo ilumina. Además, alrededor de 1 de cada 12 hombres distingue algunos colores de forma distinta, así que es buena idea no comunicar nada solo con colores.</p>`,
    ejemplo: `
      <p>En una fiesta con luz verde, ¿de qué color se ve una camiseta roja?</p>
      <ol class="pasos-ej">
        <li>Primero piensa por qué la camiseta se ve roja de día: con luz blanca, absorbe los demás colores y refleja el rojo.</li>
        <li>Ahora fíjate en qué luz le llega en la fiesta: solo verde. No le llega nada de rojo que pueda reflejar.</li>
        <li>La camiseta absorbe la luz verde, igual que de día, así que casi no refleja nada.</li>
        <li>Comprueba con lo contrario: una camiseta verde, bajo la misma luz, sí reflejaría el verde y se vería verde y brillante.</li>
      </ol>
      <p>Resultado: <span class="resultado">se ve muy oscura, casi negra</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que se verá "rojo con verde", como si se mezclaran. La camiseta no puede reflejar una luz que no recibe.</p>`,
    vidaReal: `
      <p>Entender de dónde salen los colores tiene usos muy cotidianos:</p>
      <ul>
        <li>Las pantallas forman millones de colores con puntitos de solo tres luces.</li>
        <li>Las impresoras usan pocas tintas para imprimir fotos de todos los colores.</li>
        <li>Al comprar ropa, conviene ver el color con luz natural, porque la luz de la tienda puede engañar.</li>
        <li>Con esto puedes explicar por qué el cielo es azul de día y naranja al atardecer.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>En una pantalla, ¿qué color se ve al juntar luz roja y luz verde?</p>',
        opciones: ['Café', 'Amarillo', 'Negro', 'Azul'], correcta: 1,
        pista: '<p>Al juntar luces, los colores se suman.</p>',
        solucion: '<p>En la mezcla aditiva de luces, rojo y verde dan <strong>amarillo</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿De qué color se ve una camiseta azul iluminada solo con luz roja?</p>',
        opciones: ['Azul', 'Morada', 'Muy oscura, casi negra', 'Roja'], correcta: 2,
        pista: '<p>La camiseta azul solo refleja luz azul. ¿Le llega luz azul?</p>',
        solucion: '<p>No le llega luz azul para reflejar, y absorbe la roja: se ve <strong>muy oscura, casi negra</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué color de la luz visible tiene la longitud de onda más larga?</p>',
        opciones: ['Violeta', 'Azul', 'Verde', 'Rojo'], correcta: 3,
        pista: '<p>Va de unos 400 nanómetros a unos 700 nanómetros.</p>',
        solucion: '<p>El <strong>rojo</strong>, de unos 700 nanómetros. El violeta tiene la más corta, de unos 400.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la separación de la luz blanca en sus colores, como en un prisma o un arcoíris?</p>',
        respuestas: ['dispersión', 'la dispersión', 'dispersión de la luz', 'la dispersión de la luz'],
        pista: '<p>Pasa porque cada color se desvía un poco distinto.</p>',
        solucion: '<p>Se llama <strong>dispersión</strong>: cada color se refracta un poco distinto y se separan.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué las hojas de los árboles se ven verdes?</p>',
        opciones: ['Porque producen luz verde', 'Porque reflejan sobre todo la luz verde y absorben los demás colores', 'Porque absorben la luz verde', 'Porque el cielo las ilumina de verde'], correcta: 1,
        pista: '<p>Lo que ves es la luz que el objeto devuelve.</p>',
        solucion: '<p>Las hojas <strong>reflejan sobre todo el verde</strong> y absorben la mayor parte de los demás colores, que usan para hacer su alimento.</p>' },
      { tipo: 'opciones', enunciado: '<p>Mezclas pintura cian con pintura amarilla. ¿Qué color obtienes?</p>',
        opciones: ['Verde', 'Rojo', 'Blanco', 'Magenta'], correcta: 0,
        pista: '<p>Al mezclar pinturas, cada una le quita colores a la luz.</p>',
        solucion: '<p>En la mezcla sustractiva, cian y amarillo dan <strong>verde</strong>: es el único color que ninguna de las dos absorbe.</p>' },
    ],
    fuentes: [OSC('25-5-dispersion-the-rainbow-and-prisms', 'Dispersion: The Rainbow and Prisms'), OSC('26-3-color-and-color-vision', 'Color and Color Vision'), PHET('color-vision', 'Visión del color'), WIKI('Color', 'Color')],
  });
})();
