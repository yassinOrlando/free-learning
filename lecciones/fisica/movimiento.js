// Física · Unidad 2: Movimiento (cinemática).
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
  const tolPi = (v) => Math.abs(v) * 0.002; // acepta π ≈ 3.14 y redondeo a un decimal

  const OS = (pagina, nombre) => ({ nombre: `OpenStax, Physics: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/physics/pages/${pagina}` });
  const OSC = (pagina, nombre) => ({ nombre: `OpenStax, College Physics 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/college-physics-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN_1D = { nombre: 'Khan Academy en español: Movimiento en una dimensión', url: 'https://es.khanacademy.org/science/physics/one-dimensional-motion' };
  const KHAN_2D = { nombre: 'Khan Academy en español: Movimiento en dos dimensiones', url: 'https://es.khanacademy.org/science/physics/two-dimensional-motion' };

  // ------------------------------------------------------------------
  // Calle con la casa en 0: ida a la tienda (0 → 4) y regreso a la panadería (4 → 1).
  const CALLE = G({ x: [-3, 6], y: [-2, 1.8], proporcional: true, ejes: false, figuras: [
    { tipo: 'linea', desde: [-3, 0], hasta: [6, 0] },
    ...[-2, -1, 0, 1, 2, 3, 4, 5].flatMap((v) => [{ tipo: 'linea', desde: [v, -0.12], hasta: [v, 0.12] }, txt(v, -0.55, String(v))]),
    txt(0, -1.1, 'casa'), txt(1, -1.6, 'panadería'), txt(4, -1.1, 'tienda'),
    ...flecha([0, 0.6], [4, 0.6]), ...flecha([4, 1.3], [1, 1.3], 1),
    txt(2, 0.95, 'ida: 4'), txt(2.5, 1.65, 'regreso: 3'),
  ], descripcion: 'Una calle dibujada como recta numérica, de −2 a 5 cuadras. La casa está en 0, la panadería en 1 y la tienda en 4. Una flecha de ida va de 0 a 4 y, arriba de ella, una flecha de regreso va de 4 a 1.' });

  L('Posición, distancia y desplazamiento', {
    objetivo: 'Describir dónde está algo con un punto de referencia y distinguir la distancia que recorre del desplazamiento que logra.',
    explicacion: `
      <p>Si alguien te pregunta dónde está la tienda, no basta con decir "a 4 cuadras". Necesitas decir a 4 cuadras de dónde y hacia qué lado: "a 4 cuadras de mi casa, hacia el este". Para describir un movimiento, primero hay que saber desde dónde se mide.</p>
      <h3>¿Dónde está algo?</h3>
      <p>Imagina tu calle como una recta numérica, como la que se usa en Matemáticas. Tu casa es el 0 y es tu punto de referencia, el lugar desde el que mides todo. Hacia el este los números son positivos y hacia el oeste, negativos. Así, la tienda está en 4 y un parque que queda dos cuadras al oeste está en −2. Ese número que dice dónde está algo respecto al punto de referencia se llama <strong>posición</strong>, y se suele escribir con la letra x.</p>
      <p>Fíjate que el signo es la dirección: el 4 y el −4 están a la misma distancia de tu casa, pero en lados opuestos.</p>
      <h3>¿Cuánto caminé?</h3>
      <p>Sales de tu casa, caminas a la tienda y luego regresas 3 cuadras hasta la panadería, que está en 1.</p>
      ${CALLE}
      <p>En total tus pies recorrieron 4 cuadras de ida más 3 de regreso: 7 cuadras. A todo el camino recorrido se le llama <strong>distancia</strong>. Es lo que marcaría un podómetro, y nunca es negativa, porque cada paso suma.</p>
      <h3>¿Qué tan lejos quedé del inicio?</h3>
      <p>Ahora mira solo dónde empezaste y dónde terminaste: saliste del 0 y acabaste en el 1. Quedaste a 1 cuadra al este de tu casa. Ese cambio de posición se llama <strong>desplazamiento</strong>. Se calcula restando la posición inicial de la final:</p>
      <p>Δx = x<sub>final</sub> − x<sub>inicial</sub></p>
      <p>Se lee "delta x es igual a la posición final menos la inicial". La letra griega Δ (delta) significa "cambio de". En tu paseo, Δx = 1 − 0 = 1 cuadra.</p>
      <p>El desplazamiento es un vector, como los de la lección anterior: tiene tamaño y dirección, y el signo dice la dirección. Si hubieras terminado en el parque, en −2, tu desplazamiento sería −2 − 0 = −2: dos cuadras hacia el oeste.</p>
      <h3>¿Por qué son distintos?</h3>
      <p>La distancia cuenta todo lo que caminaste, incluidas las vueltas y los regresos. El desplazamiento solo compara el punto de llegada con el de salida, como una foto del antes y otra del después. Por eso la distancia nunca es menor que el tamaño del desplazamiento. Solo son iguales cuando caminas en línea recta sin dar la vuelta.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que si regresas al punto de partida no te moviste. Tu desplazamiento es 0, pero la distancia que recorriste no. Si vas a la escuela y vuelves, caminaste el doble del camino aunque termines en casa.</p>`,
    ejemplo: `
      <p>Un repartidor sale de la tienda, que está en la posición 2 km de una avenida. Va hasta la posición 9 km y luego regresa a la 5 km. ¿Qué distancia recorrió y cuál fue su desplazamiento?</p>
      <ol class="pasos-ej">
        <li>Primero calcula la distancia tramo por tramo, porque la distancia cuenta todo el camino. De 2 a 9 hay 9 − 2 = 7 km. De 9 a 5 hay 9 − 5 = 4 km.</li>
        <li>Suma los dos tramos: 7 + 4 = 11 km de distancia.</li>
        <li>Para el desplazamiento solo importan el inicio y el final: Δx = 5 − 2 = 3 km. Es positivo, así que quedó 3 km hacia donde crecen los números.</li>
        <li>Comprueba que tenga sentido: el desplazamiento (3 km) es menor que la distancia (11 km), como debe ser cuando hay un regreso.</li>
      </ol>
      <p>Resultado: <span class="resultado">distancia de 11 km y desplazamiento de 3 km</span>.</p>
      <p class="nota"><strong>Error común:</strong> restar 9 − 5 y decir que el desplazamiento es 4 km. Ese es solo el tramo de regreso; el desplazamiento compara el inicio (2) con el final (5).</p>`,
    vidaReal: `
      <p>Separar lo que recorres de lo lejos que llegas sirve en muchos momentos:</p>
      <ul>
        <li>Una app de ejercicio cuenta los kilómetros que corriste, aunque termines en la puerta de tu casa.</li>
        <li>Un taxi te cobra por el camino que hizo, no por lo lejos que quedó tu destino en línea recta.</li>
        <li>Para dar indicaciones a alguien, necesitas decir desde dónde se cuenta y hacia qué lado ir.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Caminas 5 cuadras al este y luego 2 cuadras al oeste. ¿Qué distancia recorriste, en cuadras?</p>', respuesta: 5 + 2,
        pista: '<p>La distancia cuenta todo el camino, sin importar la dirección.</p>',
        solucion: '<p>La distancia suma todos los tramos: 5 + 2 = <strong>7 cuadras</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con el mismo paseo (5 cuadras al este y luego 2 al oeste), ¿cuál fue tu desplazamiento, en cuadras? Toma el este como positivo.</p>', respuesta: 5 - 2,
        pista: '<p>Si empiezas en 0, ¿en qué posición terminas?</p>',
        solucion: '<p>Empiezas en 0, llegas a 5 y regresas a 3. El desplazamiento es 3 − 0 = <strong>3 cuadras</strong> hacia el este.</p>' },
      { tipo: 'numero', enunciado: '<p>Una corredora da una vuelta completa a una pista de 400 m y termina donde empezó. ¿Cuál fue su desplazamiento, en metros?</p>', respuesta: 0,
        pista: '<p>Compara el punto de salida con el de llegada.</p>',
        solucion: '<p>Terminó en el mismo lugar del que salió, así que su desplazamiento es <strong>0 m</strong>, aunque recorrió una distancia de 400 m.</p>' },
      { tipo: 'numero', enunciado: '<p>Un gato está en la posición −3 m y camina en línea recta hasta la posición 5 m. ¿Cuál es su desplazamiento, en metros?</p>', respuesta: 5 - (-3),
        pista: '<p>Usa Δx = posición final − posición inicial, y cuida el signo de −3.</p>',
        solucion: '<p>Δx = 5 − (−3) = 5 + 3 = <strong>8 m</strong>. Restar un número negativo es lo mismo que sumarlo.</p>' },
      { tipo: 'numero', enunciado: '<p>Un coche pasa de la posición 6 km a la posición 2 km de una carretera. ¿Cuál es su desplazamiento, en km?</p>', respuesta: 2 - 6,
        pista: '<p>Resta la posición inicial de la final. ¿El coche fue hacia donde crecen o hacia donde bajan los números?</p>',
        solucion: '<p>Δx = 2 − 6 = <strong>−4 km</strong>. El signo negativo dice que el coche se movió hacia donde bajan los números.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Puede la distancia recorrida ser menor que el tamaño del desplazamiento?</p>',
        opciones: ['Sí, cuando el camino es muy largo.', 'No, la distancia siempre es mayor o igual.', 'Sí, cuando el desplazamiento es negativo.', 'Solo si se camina en línea recta.'], correcta: 1,
        pista: '<p>Piensa en qué cuenta cada una: todo el camino o solo el inicio y el final.</p>',
        solucion: '<p>La distancia incluye todo el camino, así que <strong>nunca es menor</strong> que el desplazamiento. Son iguales solo cuando vas en línea recta sin regresar.</p>' },
    ],
    fuentes: [OS('2-1-relative-motion-distance-and-displacement', 'Relative Motion, Distance, and Displacement'), WIKI('Desplazamiento_(vector)', 'Desplazamiento'), KHAN_1D],
  });

  // ------------------------------------------------------------------
  L('Rapidez y velocidad', {
    objetivo: 'Calcular la rapidez media y la velocidad media de un movimiento, y usarlas para encontrar distancias y tiempos.',
    explicacion: `
      <p>Dos amigas van al mismo parque, que está a 6 km. Una llega en 1 hora y la otra en 2 horas. ¿Quién fue más rápida? La primera, porque recorrió lo mismo en menos tiempo. Para decir qué tan rápido va algo, hay que comparar la distancia con el tiempo.</p>
      <h3>¿Qué tan rápido voy?</h3>
      <p>La primera amiga recorrió 6 km en 1 hora: 6 km cada hora. La segunda recorrió 6 km en 2 horas: 3 km cada hora. A cuánto camino recorres en cada unidad de tiempo se le llama <strong>rapidez</strong>, y se calcula dividiendo:</p>
      <p>rapidez = ${F('distancia', 'tiempo')}</p>
      <p>Se lee "la rapidez es la distancia entre el tiempo". Dividir reparte la distancia en partes iguales, una por cada hora o cada segundo. Por eso sus unidades son de distancia "por" tiempo: km/h o m/s.</p>
      <h3>¿Rapidez media o rapidez en este momento?</h3>
      <p>En un viaje en autobús no vas siempre igual de rápido: frenas en los semáforos y aceleras en la carretera. Si recorres 120 km en 2 horas, tu <strong>rapidez media</strong> es 120 ÷ 2 = 60 km/h. Es la rapidez que tendrías si fueras siempre igual, aunque en realidad hubo ratos más rápidos y más lentos. El velocímetro, en cambio, marca la rapidez de cada instante, que cambia todo el tiempo.</p>
      <h3>¿Cuál es la diferencia con la velocidad?</h3>
      <p>En la vida diaria decimos "velocidad" y "rapidez" como si fueran lo mismo, pero en física no lo son. La <strong>velocidad</strong> es un vector: además de qué tan rápido, dice hacia dónde. Se calcula con el desplazamiento de la lección anterior, en lugar de la distancia:</p>
      <p>v = ${F('Δx', 'Δt')}</p>
      <p>Se lee "la velocidad es el desplazamiento entre el tiempo que tardó". Δt es el tiempo que pasó. Como el desplazamiento puede ser negativo, la velocidad también: el signo dice la dirección.</p>
      <p>La diferencia importa cuando hay regresos. Si nadas una alberca de 50 m de ida y vuelta en 100 s, recorriste 100 m, así que tu rapidez media fue 1 m/s. Pero terminaste donde empezaste: tu desplazamiento fue 0, y tu velocidad media también fue 0.</p>
      <h3>¿Cómo encuentro la distancia o el tiempo?</h3>
      <p>Si conoces dos de los tres datos, sacas el tercero. Si vas a 60 km/h durante 3 horas, cada hora recorres 60 km, así que en total recorres 60 × 3 = 180 km: distancia = rapidez × tiempo. Y si quieres recorrer 180 km a 60 km/h, te preguntas cuántas veces cabe 60 en 180: tiempo = distancia ÷ rapidez = 3 horas.</p>
      <p class="nota"><strong>Trampa común:</strong> mezclar unidades. Si la distancia está en metros y el tiempo en horas, el resultado no sale en m/s ni en km/h. Antes de dividir, pasa todo a unidades que combinen, como aprendiste en la lección de conversión de unidades.</p>`,
    ejemplo: `
      <p>Un autobús recorre 120 km en 1.5 horas. ¿Cuál fue su rapidez media en km/h y en m/s?</p>
      <ol class="pasos-ej">
        <li>Primero divide la distancia entre el tiempo, porque la rapidez es cuánto se avanza en cada hora: 120 ÷ 1.5 = 80 km/h.</li>
        <li>Ahora pásalo a m/s. Un kilómetro son 1000 m y una hora son 3600 s, así que de km/h a m/s se divide entre 3.6: 80 ÷ 3.6 ≈ 22.2 m/s.</li>
        <li>Comprueba al revés con la primera respuesta: si avanzas 80 km cada hora durante 1.5 horas, recorres 80 × 1.5 = 120 km, justo la distancia del viaje.</li>
      </ol>
      <p>Resultado: <span class="resultado">80 km/h, unos 22.2 m/s</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que el velocímetro marcó 80 todo el camino. La rapidez media resume el viaje completo; en algunos ratos el autobús fue a 100 y en otros estuvo detenido.</p>`,
    vidaReal: `
      <p>Comparar camino con tiempo te ayuda a planear tu día:</p>
      <ul>
        <li>Para saber a qué hora salir y llegar a tiempo a una cita, según lo lejos que esté.</li>
        <li>Para entender los límites de velocidad en calles y carreteras, y por qué cambian.</li>
        <li>Para comparar si conviene ir en bici, en camión o caminando.</li>
        <li>Para medir tu propio avance cuando sales a correr.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una persona recorre 100 m en 20 s. ¿Cuál es su rapidez media, en m/s?</p>', respuesta: 100 / 20,
        pista: '<p>Divide la distancia entre el tiempo.</p>',
        solucion: '<p>100 ÷ 20 = <strong>5 m/s</strong>: avanza 5 metros en cada segundo.</p>' },
      { tipo: 'numero', enunciado: '<p>Un coche recorre 240 km en 3 horas. ¿Cuál es su rapidez media, en km/h?</p>', respuesta: 240 / 3,
        pista: '<p>Reparte los kilómetros entre las horas.</p>',
        solucion: '<p>240 ÷ 3 = <strong>80 km/h</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Vas a 60 km/h durante 2.5 horas. ¿Cuántos kilómetros recorres?</p>', respuesta: 60 * 2.5,
        pista: '<p>Cada hora recorres 60 km. ¿Cuántas horas viajas?</p>',
        solucion: '<p>distancia = rapidez × tiempo = 60 × 2.5 = <strong>150 km</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Caminas a 1.5 m/s. ¿Cuántos segundos tardas en recorrer 300 m?</p>', respuesta: 300 / 1.5,
        pista: '<p>¿Cuántas veces cabe 1.5 m en 300 m?</p>',
        solucion: '<p>tiempo = distancia ÷ rapidez = 300 ÷ 1.5 = <strong>200 s</strong>, es decir, 3 minutos y 20 segundos.</p>' },
      { tipo: 'numero', enunciado: '<p>Nadas una alberca de 50 m de ida y vuelta en 80 s. ¿Cuál fue tu rapidez media, en m/s?</p>', respuesta: 100 / 80,
        pista: '<p>La rapidez usa la distancia: ¿cuántos metros nadaste en total?</p>',
        solucion: '<p>Nadaste 50 + 50 = 100 m, así que tu rapidez media fue 100 ÷ 80 = <strong>1.25 m/s</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En la misma alberca (50 m de ida y vuelta en 80 s), ¿cuál fue tu velocidad media, en m/s?</p>', respuesta: 0,
        pista: '<p>La velocidad usa el desplazamiento: ¿dónde terminaste respecto al inicio?</p>',
        solucion: '<p>Terminaste donde empezaste, así que el desplazamiento es 0 y la velocidad media es 0 ÷ 80 = <strong>0 m/s</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué marca el velocímetro de un coche?</p>',
        opciones: ['La rapidez media de todo el viaje', 'La rapidez en ese instante', 'La distancia que falta por recorrer', 'El desplazamiento del coche'], correcta: 1,
        pista: '<p>Fíjate que la aguja se mueve cada vez que frenas o aceleras.</p>',
        solucion: '<p>El velocímetro marca la <strong>rapidez en cada instante</strong>; por eso cambia cuando frenas o aceleras. La rapidez media solo se puede calcular al final, con la distancia total y el tiempo total.</p>' },
    ],
    fuentes: [OS('2-2-speed-and-velocity', 'Speed and Velocity'), WIKI('Velocidad', 'Velocidad'), KHAN_1D],
  });

  // ------------------------------------------------------------------
  const ALCANCE = G({ x: [0, 6], y: [0, 20], funciones: [
    { f: (t) => 2 + 3 * t, etiqueta: 'bicicleta: x = 2 + 3t', serie: 0 },
    { f: (t) => 10 + t, etiqueta: 'persona: x = 10 + t', serie: 1 },
  ], puntos: [{ x: 4, y: 14, etiqueta: '(4, 14)' }],
  descripcion: 'Gráfica de posición contra tiempo. El eje horizontal es el tiempo, de 0 a 6 segundos, y el vertical la posición, de 0 a 20 metros. La recta de la bicicleta empieza en 2 m y sube 3 m cada segundo. La recta de la persona empieza en 10 m y sube 1 m cada segundo; es menos inclinada. Las dos rectas se cruzan en el punto (4, 14).' });
  const SUBE = G({ x: [0, 5], y: [0, 12], funciones: [{ f: (t) => 2 + 2 * t, etiqueta: 'x = posición en metros' }], puntos: [{ x: 0, y: 2, etiqueta: '(0, 2)' }, { x: 4, y: 10, etiqueta: '(4, 10)' }],
    descripcion: 'Gráfica de posición contra tiempo: una recta que pasa por el punto (0, 2) y por el punto (4, 10). El eje horizontal es el tiempo en segundos y el vertical la posición en metros.' });

  L('Movimiento rectilíneo uniforme', {
    objetivo: 'Reconocer el movimiento con velocidad constante, usar la fórmula x = x₀ + v·t y leer su gráfica de posición contra tiempo.',
    explicacion: `
      <p>Vas en carretera con el control de velocidad del coche fijo en 20 m/s. Si cada segundo anotas cuántos metros llevas desde que empezaste a contar, obtienes esta tabla:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Tiempo (s)</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
        <tr><th>Posición (m)</th><td>0</td><td>20</td><td>40</td><td>60</td><td>80</td></tr>
      </table></div>
      <p>Fíjate que la posición crece siempre lo mismo: 20 metros cada segundo, sin sorpresas. Cuando algo se mueve en línea recta y su velocidad no cambia, se dice que tiene <strong>movimiento rectilíneo uniforme</strong>, o MRU. "Rectilíneo" quiere decir en línea recta, y "uniforme", siempre igual.</p>
      <h3>¿Dónde estaré dentro de un rato?</h3>
      <p>Como avanzas lo mismo cada segundo, puedes saber dónde estarás sin hacer la tabla completa. Supón que no empiezas en 0, sino en otro punto. Tu posición en cualquier momento es:</p>
      <p>x = x₀ + v·t</p>
      <p>Se lee "la posición es igual a la posición inicial más la velocidad por el tiempo". Cada letra tiene su papel:</p>
      <ul>
        <li>x₀ es <strong>dónde empiezas</strong>. Se llama posición inicial, y el 0 pequeño indica "al principio".</li>
        <li>v es <strong>cuánto avanzas cada segundo</strong>: la velocidad.</li>
        <li>t es <strong>cuánto tiempo ha pasado</strong>, y v·t es todo lo que avanzaste en ese tiempo.</li>
      </ul>
      <p>En el coche, x₀ = 0 y v = 20, así que a los 4 s estás en x = 0 + 20·4 = 80 m, igual que en la tabla.</p>
      <h3>¿Cómo se ve en una gráfica?</h3>
      <p>Si pones el tiempo en el eje horizontal y la posición en el vertical, el MRU siempre da una línea recta. Es la misma idea de la función lineal y = mx + b que viste en Matemáticas: la velocidad v es la pendiente y la posición inicial x₀ es la ordenada al origen. Una recta más inclinada es un objeto más rápido. Una recta horizontal es un objeto quieto, porque el tiempo pasa y la posición no cambia. Y una recta que baja es un objeto que va hacia atrás, con velocidad negativa.</p>
      ${ALCANCE}
      <p>En esta gráfica, una bicicleta sale de 2 m y avanza 3 m cada segundo, y una persona sale de 10 m y avanza 1 m cada segundo. La recta de la bicicleta es más inclinada porque va más rápido. Las rectas se cruzan en (4, 14): a los 4 segundos, las dos están en la posición 14 m. Ahí la bicicleta alcanza a la persona.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir la gráfica con el camino. Una recta que sube no significa que el coche suba una colina; significa que su posición crece con el tiempo. El camino puede ser totalmente plano.</p>`,
    ejemplo: `
      <p>Un tren pasa por el kilómetro 10 de la vía y sigue a 80 km/h sin cambiar su velocidad. ¿En qué kilómetro estará 2.5 horas después?</p>
      <ol class="pasos-ej">
        <li>Primero identifica los datos de la fórmula. El tren empieza en x₀ = 10 km, avanza v = 80 km cada hora y pasan t = 2.5 horas.</li>
        <li>Calcula cuánto avanza en ese tiempo: v·t = 80 × 2.5 = 200 km.</li>
        <li>Súmalo a donde empezó, porque la posición cuenta desde el kilómetro 0 de la vía: x = 10 + 200 = 210 km.</li>
        <li>Comprueba al revés: del kilómetro 10 al 210 hay 200 km, y 200 ÷ 80 = 2.5 horas. Coincide con el tiempo del enunciado.</li>
      </ol>
      <p>Resultado: <span class="resultado">kilómetro 210</span>.</p>
      <p class="nota"><strong>Error común:</strong> contestar 200 km. Ese es lo que avanzó el tren, pero no empezó en 0: hay que sumarle los 10 km donde estaba al principio.</p>`,
    vidaReal: `
      <p>Moverse siempre igual de rápido hace fácil predecir:</p>
      <ul>
        <li>Las apps de mapas calculan a qué hora llegarás suponiendo que mantienes la misma rapidez.</li>
        <li>En un viaje por carretera, puedes calcular en qué ciudad estarás a la hora de comer.</li>
        <li>Si alguien salió antes que tú, puedes saber cuánto tardarás en alcanzarlo si vas más rápido.</li>
        <li>Para revisar si un tren o un autobús va a tiempo: si sabes en qué kilómetro está ahora y a cuánto va, sabes en qué kilómetro estará dentro de una hora.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un carrito empieza en x₀ = 5 m y avanza a 2 m/s. ¿En qué posición está a los 10 s, en metros?</p>', respuesta: 5 + 2 * 10,
        pista: '<p>Usa x = x₀ + v·t: primero calcula cuánto avanza en 10 s.</p>',
        solucion: '<p>En 10 s avanza 2 × 10 = 20 m. Como empezó en 5 m, está en x = 5 + 20 = <strong>25 m</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una tortuga está en 0 cm, 15 cm, 30 cm y 45 cm en los segundos 0, 1, 2 y 3. ¿Cuál es su velocidad, en cm/s?</p>', respuesta: 15,
        pista: '<p>¿Cuánto cambia la posición de un segundo al siguiente?</p>',
        solucion: '<p>Cada segundo avanza 15 cm, siempre lo mismo, así que su velocidad es <strong>15 cm/s</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un robot sale de la posición 0 a 4 m/s. ¿Cuántos segundos tarda en llegar a la posición 120 m?</p>', respuesta: 120 / 4,
        pista: '<p>Cada segundo avanza 4 m. ¿Cuántas veces cabe 4 en 120?</p>',
        solucion: '<p>Tiene que avanzar 120 m a 4 m cada segundo: 120 ÷ 4 = <strong>30 s</strong>.</p>' },
      { tipo: 'numero', enunciado: `<p>La gráfica muestra la posición de un objeto con MRU. ¿Cuál es su velocidad, en m/s?</p>${SUBE}`, respuesta: (10 - 2) / 4,
        pista: '<p>La velocidad es la pendiente: cuánto sube la posición entre cuánto pasa el tiempo.</p>',
        solucion: '<p>En 4 s la posición pasa de 2 m a 10 m: sube 8 m. La velocidad es 8 ÷ 4 = <strong>2 m/s</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>En una gráfica de posición contra tiempo, ¿qué significa una recta horizontal?</p>',
        opciones: ['Que el objeto va muy rápido', 'Que el objeto está quieto', 'Que el objeto va por un camino plano', 'Que el objeto va hacia atrás'], correcta: 1,
        pista: '<p>En una recta horizontal, ¿cambia la posición cuando pasa el tiempo?</p>',
        solucion: '<p>Si la recta es horizontal, el tiempo pasa pero la posición no cambia: el objeto está <strong>quieto</strong>. Su velocidad es 0.</p>' },
      { tipo: 'numero', enunciado: '<p>Una moto sale de la posición 0 a 5 m/s. Al mismo tiempo, un ciclista que está 30 m adelante avanza a 2 m/s en la misma dirección. ¿A los cuántos segundos lo alcanza la moto?</p>', respuesta: 30 / (5 - 2),
        pista: '<p>Cada segundo la moto le descuenta al ciclista la diferencia de sus velocidades.</p>',
        solucion: '<p>Cada segundo la moto se acerca 5 − 2 = 3 m. Para cerrar los 30 m de ventaja necesita 30 ÷ 3 = <strong>10 s</strong>. Comprueba: la moto está en 5 × 10 = 50 m y el ciclista en 30 + 2 × 10 = 50 m.</p>' },
    ],
    fuentes: [OS('2-3-position-vs-time-graphs', 'Position vs. Time Graphs'), WIKI('Movimiento_rectilíneo_uniforme', 'Movimiento rectilíneo uniforme'), KHAN_1D],
  });

  // ------------------------------------------------------------------
  const ARRANQUE = G({ x: [0, 5], y: [0, 15], funciones: [{ f: (t) => 3 * t, etiqueta: 'velocidad: v = 3t' }], puntos: [{ x: 4, y: 12, etiqueta: '(4, 12)' }],
    descripcion: 'Gráfica de velocidad contra tiempo de un coche que arranca. El eje horizontal es el tiempo, de 0 a 5 segundos, y el vertical la velocidad, de 0 a 15 m/s. La recta sale del origen y sube 3 m/s cada segundo; a los 4 segundos marca 12 m/s.' });

  L('Aceleración y movimiento uniformemente acelerado', {
    objetivo: 'Calcular la aceleración como el cambio de velocidad en cada segundo y usar las fórmulas del movimiento uniformemente acelerado.',
    explicacion: `
      <p>El semáforo se pone en verde y el coche de adelante arranca. No llega de golpe a su velocidad: va cada vez más rápido. Si miras su velocímetro cada segundo, ves esto:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Tiempo (s)</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
        <tr><th>Velocidad (m/s)</th><td>0</td><td>3</td><td>6</td><td>9</td><td>12</td></tr>
      </table></div>
      <p>La velocidad sube 3 m/s cada segundo. Qué tan rápido cambia la velocidad se llama <strong>aceleración</strong>. Se calcula como el cambio de velocidad entre el tiempo que tardó:</p>
      <p>a = ${F('v − v₀', 't')}</p>
      <p>Se lee "la aceleración es la velocidad final menos la inicial, entre el tiempo". v₀ es <strong>con qué velocidad empiezas</strong>, v es <strong>con qué velocidad terminas</strong> y t es el tiempo que pasó. En el coche, a = (12 − 0) ÷ 4 = 3.</p>
      <p>Su unidad es m/s², que se lee "metros por segundo al cuadrado". Suena raro, pero quiere decir algo sencillo: "metros por segundo, cada segundo". Una aceleración de 3 m/s² significa que cada segundo la velocidad crece 3 m/s.</p>
      <h3>¿Frenar también es acelerar?</h3>
      <p>Sí. En física, acelerar es cualquier cambio de velocidad, también hacerse más lento. Si un coche va a 20 m/s y frena hasta 0 en 4 s, su aceleración es (0 − 20) ÷ 4 = −5 m/s². El signo negativo dice que la velocidad está bajando.</p>
      <h3>¿Qué velocidad llevo después de un rato?</h3>
      <p>Cuando la aceleración no cambia, como en el coche que arranca, el movimiento se llama <strong>movimiento uniformemente acelerado</strong>, o MUA. Si cada segundo ganas a metros por segundo, después de t segundos ganaste a·t. Por eso:</p>
      <p>v = v₀ + a·t</p>
      <p>Se lee "la velocidad es la inicial más la aceleración por el tiempo". En la gráfica de velocidad contra tiempo, el MUA es una recta, y su pendiente es la aceleración.</p>
      ${ARRANQUE}
      <h3>¿Cuánto avancé?</h3>
      <p>Como la velocidad sube de manera pareja, en promedio vas a la mitad entre la velocidad inicial y la final. El coche que arranca va de 0 a 12 m/s en 4 s, así que su velocidad promedio es 6 m/s, y en 4 s avanza 6 × 4 = 24 m. Si haces esta cuenta con letras, sale la fórmula de la distancia:</p>
      <p>x = v₀·t + ½·a·t²</p>
      <p>Se lee "la distancia es la velocidad inicial por el tiempo, más un medio de la aceleración por el tiempo al cuadrado". El primer término es lo que avanzarías sin acelerar, y el segundo es lo que ganas extra por ir cada vez más rápido. Con el coche: 0·4 + ½·3·4² = ½·3·16 = 24 m, lo mismo que con el promedio.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir ir rápido con acelerar. Un avión que vuela a 900 km/h siempre igual, en línea recta, tiene aceleración 0, porque su velocidad no cambia. Un coche que apenas arranca va lento, pero tiene mucha aceleración.</p>`,
    ejemplo: `
      <p>Un coche parte del reposo y llega a 20 m/s en 5 s, con aceleración constante. ¿Cuál es su aceleración y cuántos metros avanza en esos 5 s?</p>
      <ol class="pasos-ej">
        <li>Primero la aceleración: la velocidad cambió de 0 a 20 m/s en 5 s, así que a = (20 − 0) ÷ 5 = 4 m/s². Cada segundo gana 4 m/s.</li>
        <li>Para la distancia, usa la velocidad promedio, porque la velocidad subió de forma pareja: (0 + 20) ÷ 2 = 10 m/s.</li>
        <li>En 5 s a un promedio de 10 m/s avanza 10 × 5 = 50 m.</li>
        <li>Comprueba con la fórmula: x = ½·4·5² = ½·4·25 = 50 m. Las dos formas coinciden.</li>
      </ol>
      <p>Resultado: <span class="resultado">4 m/s² y 50 m</span>.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar la velocidad final por el tiempo, 20 × 5 = 100 m. El coche solo fue a 20 m/s al final; al principio iba mucho más lento.</p>`,
    vidaReal: `
      <p>Que algo gane o pierda rapidez poco a poco está presente en muchos momentos:</p>
      <ul>
        <li>Por eso un coche necesita varios metros para frenar, y hay que dejar espacio con el de adelante.</li>
        <li>Los anuncios de coches dicen en cuántos segundos llegan a 100 km/h.</li>
        <li>Las pistas de los aeropuertos son largas porque un avión necesita tiempo para ganar velocidad y despegar.</li>
        <li>Al conducir, saber que frenar también es cambiar de velocidad ayuda a entender por qué una frenada brusca deja marcas largas en el pavimento.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una bicicleta pasa de 2 m/s a 8 m/s en 3 s. ¿Cuál es su aceleración, en m/s²?</p>', respuesta: (8 - 2) / 3,
        pista: '<p>Calcula cuánto cambió la velocidad y divídelo entre el tiempo.</p>',
        solucion: '<p>La velocidad cambió 8 − 2 = 6 m/s en 3 s: a = 6 ÷ 3 = <strong>2 m/s²</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un coche va a 20 m/s y frena hasta detenerse en 4 s. ¿Cuál es su aceleración, en m/s²?</p>', respuesta: (0 - 20) / 4,
        pista: '<p>La velocidad final es 0. Cuida el signo.</p>',
        solucion: '<p>a = (0 − 20) ÷ 4 = <strong>−5 m/s²</strong>. El signo negativo indica que la velocidad baja: el coche frena.</p>' },
      { tipo: 'numero', enunciado: '<p>Un patinador va a 4 m/s y acelera a 3 m/s² durante 5 s. ¿Qué velocidad alcanza, en m/s?</p>', respuesta: 4 + 3 * 5,
        pista: '<p>Usa v = v₀ + a·t: ¿cuánta velocidad gana en 5 s?</p>',
        solucion: '<p>En 5 s gana 3 × 5 = 15 m/s. Como ya iba a 4, alcanza v = 4 + 15 = <strong>19 m/s</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un carrito parte del reposo y acelera a 2 m/s² durante 6 s. ¿Cuántos metros avanza?</p>', respuesta: 0.5 * 2 * 6 ** 2,
        pista: '<p>Parte del reposo, así que v₀ = 0. Usa x = ½·a·t², o la velocidad promedio.</p>',
        solucion: '<p>x = ½·2·6² = ½·2·36 = <strong>36 m</strong>. Con el promedio: llega a 12 m/s, el promedio es 6 m/s y 6 × 6 = 36 m.</p>' },
      { tipo: 'numero', enunciado: '<p>Un tren va a 10 m/s y acelera a 2 m/s² durante 4 s. ¿Cuántos metros avanza en ese tiempo?</p>', respuesta: 10 * 4 + 0.5 * 2 * 4 ** 2,
        pista: '<p>Usa x = v₀·t + ½·a·t²: calcula cada parte por separado.</p>',
        solucion: '<p>Sin acelerar avanzaría 10 × 4 = 40 m, y por acelerar gana ½·2·4² = 16 m más. En total, <strong>56 m</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un avión vuela en línea recta a 900 km/h todo el tiempo. ¿Cuál es su aceleración?</p>',
        opciones: ['900 km/h', 'Muy grande, porque va muy rápido', '0, porque su velocidad no cambia', 'No se puede saber'], correcta: 2,
        pista: '<p>La aceleración mide el cambio de velocidad, no qué tan grande es.</p>',
        solucion: '<p>Si la velocidad no cambia ni de tamaño ni de dirección, la aceleración es <strong>0</strong>, aunque el avión vaya muy rápido.</p>' },
    ],
    fuentes: [OS('3-1-acceleration', 'Acceleration'), OS('3-2-representing-acceleration-with-equations-and-graphs', 'Representing Acceleration with Equations and Graphs'), WIKI('Movimiento_rectilíneo_uniformemente_acelerado', 'Movimiento rectilíneo uniformemente acelerado')],
  });

  // ------------------------------------------------------------------
  L('Caída libre', {
    objetivo: 'Calcular la velocidad y la distancia de un objeto que cae usando la aceleración de la gravedad, g ≈ 9.8 m/s².',
    explicacion: `
      <p>Suelta al mismo tiempo una piedra y una hoja de papel extendida. La piedra llega primero. Ahora haz una bola apretada con la hoja y repite: las dos llegan casi juntas. ¿Qué cambió? No el peso de la hoja, sino cuánto aire tiene que empujar al caer.</p>
      <h3>¿Lo pesado cae más rápido?</h3>
      <p>Durante siglos se pensó que sí. Pero el aire es lo que frena a la hoja extendida, porque choca con mucho aire a la vez. Sin aire, todo cae igual. En 1971, un astronauta lo mostró en la Luna, donde no hay aire: soltó un martillo y una pluma al mismo tiempo, y los dos tocaron el suelo juntos.</p>
      <p>Cuando un objeto cae solo por la gravedad, sin que el aire lo frene de forma notable, se dice que está en <strong>caída libre</strong>. Una piedra, una llave o una pelota que se suelta desde unos metros están casi en caída libre.</p>
      <h3>¿Qué tan rápido gana velocidad?</h3>
      <p>Cerca de la superficie de la Tierra, todo lo que cae libremente gana 9.8 m/s de velocidad cada segundo. Esa aceleración es igual para todos los objetos, así que tiene nombre propio: la <strong>aceleración de la gravedad</strong>, y se escribe con la letra g:</p>
      <p>g ≈ 9.8 m/s²</p>
      <p>El símbolo ≈ quiere decir "aproximadamente igual", porque el valor cambia un poquito según el lugar del planeta.</p>
      <h3>¿Qué velocidad lleva y cuánto ha caído?</h3>
      <p>La caída libre es un movimiento uniformemente acelerado, como el de la lección anterior, con a = g. Si sueltas algo desde el reposo, empieza con v₀ = 0, y las fórmulas quedan así:</p>
      <p>v = g·t &nbsp;&nbsp;y&nbsp;&nbsp; h = ½·g·t²</p>
      <p>Se leen "la velocidad es g por el tiempo" y "la altura que cae es un medio de g por el tiempo al cuadrado". Aquí h es <strong>cuántos metros ha bajado</strong> desde donde lo soltaste. Mira cómo crecen:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Tiempo (s)</th><td>1</td><td>2</td><td>3</td></tr>
        <tr><th>Velocidad (m/s)</th><td>9.8</td><td>19.6</td><td>29.4</td></tr>
        <tr><th>Altura que cae (m)</th><td>4.9</td><td>19.6</td><td>44.1</td></tr>
      </table></div>
      <p>Fíjate que la velocidad crece parejo, pero la altura crece cada vez más rápido: en el tercer segundo cae más que en los dos primeros juntos. Eso pasa porque cada segundo va más rápido que el anterior.</p>
      <h3>¿Y si lanzo algo hacia arriba?</h3>
      <p>La gravedad sigue actuando, pero ahora en contra del movimiento. Una pelota lanzada hacia arriba a 19.6 m/s pierde 9.8 m/s cada segundo: después de 1 s va a 9.8 m/s, y después de 2 s se detiene un instante en lo más alto. Luego empieza a caer.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que en el punto más alto la aceleración es 0. Ahí la velocidad es 0 solo por un instante, pero la gravedad sigue jalando hacia abajo con 9.8 m/s². Si la aceleración fuera 0, la pelota se quedaría flotando.</p>`,
    ejemplo: `
      <p>Sueltas una piedra en un pozo y tarda 3 s en llegar al fondo. ¿Qué tan profundo es el pozo y con qué velocidad llega la piedra? Ignora el aire.</p>
      <ol class="pasos-ej">
        <li>Primero identifica los datos. La soltaste, así que empieza desde el reposo; cae con g = 9.8 m/s² durante t = 3 s.</li>
        <li>Calcula la altura con h = ½·g·t². Primero el tiempo al cuadrado: 3² = 9. Luego h = ½ × 9.8 × 9 = 4.9 × 9 = 44.1 m.</li>
        <li>Calcula la velocidad final con v = g·t: 9.8 × 3 = 29.4 m/s.</li>
        <li>Comprueba con la velocidad promedio: la piedra pasó de 0 a 29.4 m/s, así que en promedio fue a 14.7 m/s. En 3 s recorre 14.7 × 3 = 44.1 m, igual que antes.</li>
      </ol>
      <p>Resultado: <span class="resultado">44.1 m de profundidad; llega a 29.4 m/s</span>.</p>
      <p class="nota"><strong>Error común:</strong> calcular la altura como 9.8 × 3 = 29.4 m. Esa cuenta da la velocidad final, no la altura; para la altura falta el ½ y elevar el tiempo al cuadrado.</p>`,
    vidaReal: `
      <p>Entender cómo caen las cosas ayuda a cuidarte y a calcular:</p>
      <ul>
        <li>Explica por qué una caída desde un segundo piso es mucho más peligrosa que desde una silla.</li>
        <li>Puedes estimar la profundidad de un pozo o la altura de un puente contando cuánto tarda en caer una piedra.</li>
        <li>Los paracaídas funcionan porque usan el aire para frenar la caída.</li>
        <li>Explica por qué, al saltar a una alberca desde un trampolín alto, llegas al agua mucho más rápido que desde la orilla.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Sueltas una pelota desde lo alto de un edificio. ¿Qué velocidad lleva después de 4 s de caída libre, en m/s? Usa g = 9.8 m/s².</p>', respuesta: 9.8 * 4,
        pista: '<p>Cada segundo gana 9.8 m/s. Usa v = g·t.</p>',
        solucion: '<p>v = 9.8 × 4 = <strong>39.2 m/s</strong>, más de 140 km/h.</p>' },
      { tipo: 'numero', enunciado: '<p>Una llave cae libremente durante 2 s. ¿Cuántos metros cae? Usa g = 9.8 m/s².</p>', respuesta: 0.5 * 9.8 * 2 ** 2,
        pista: '<p>Usa h = ½·g·t². Empieza por elevar el tiempo al cuadrado.</p>',
        solucion: '<p>2² = 4, y h = ½ × 9.8 × 4 = <strong>19.6 m</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Lanzas una pelota hacia arriba a 19.6 m/s. ¿Cuántos segundos tarda en llegar a lo más alto? Usa g = 9.8 m/s².</p>', respuesta: 19.6 / 9.8,
        pista: '<p>En lo más alto la velocidad es 0. ¿Cuántos segundos tarda en perder 19.6 m/s si pierde 9.8 cada segundo?</p>',
        solucion: '<p>Pierde 9.8 m/s cada segundo, así que tarda 19.6 ÷ 9.8 = <strong>2 s</strong> en quedarse sin velocidad.</p>' },
      { tipo: 'numero', enunciado: '<p>Una maceta cae desde 78.4 m de altura. ¿Cuántos segundos tarda en llegar al suelo? Usa g = 9.8 m/s² e ignora el aire.</p>', respuesta: Math.sqrt(2 * 78.4 / 9.8),
        pista: '<p>En h = ½·g·t², ½·g vale 4.9. ¿Qué número al cuadrado, multiplicado por 4.9, da 78.4?</p>',
        solucion: '<p>78.4 = 4.9·t², así que t² = 78.4 ÷ 4.9 = 16, y t = <strong>4 s</strong>, porque 4² = 16.</p>' },
      { tipo: 'opciones', enunciado: '<p>En la Luna, donde no hay aire, un astronauta suelta al mismo tiempo un martillo y una pluma desde la misma altura. ¿Qué pasa?</p>',
        opciones: ['El martillo llega primero', 'La pluma llega primero', 'Llegan al mismo tiempo', 'La pluma se queda flotando'], correcta: 2,
        pista: '<p>¿Qué es lo que frena a la pluma aquí en la Tierra?</p>',
        solucion: '<p>Sin aire que la frene, la pluma cae con la misma aceleración que el martillo, así que <strong>llegan al mismo tiempo</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una pelota lanzada hacia arriba llega a su punto más alto. En ese instante, ¿qué es cierto?</p>',
        opciones: ['Su velocidad y su aceleración son 0.', 'Su velocidad es 0 y su aceleración sigue siendo 9.8 m/s² hacia abajo.', 'Su velocidad es 9.8 m/s y su aceleración es 0.', 'Su velocidad y su aceleración son de 9.8.'], correcta: 1,
        pista: '<p>¿Deja de jalar la gravedad en algún momento?</p>',
        solucion: '<p>En lo más alto la pelota se detiene un instante, así que su <strong>velocidad es 0</strong>, pero la gravedad sigue jalando: su <strong>aceleración sigue siendo 9.8 m/s² hacia abajo</strong>. Por eso vuelve a caer.</p>' },
    ],
    fuentes: [OSC('2-7-falling-objects', 'Falling Objects'), WIKI('Caída_libre', 'Caída libre'), KHAN_1D],
  });

  // ------------------------------------------------------------------
  // Pelota lanzada horizontalmente a 3 m/s desde 4.9 m: cae y = 4.9 − 4.9·t², con t = x / 3.
  const TIRO = G({ x: [0, 3.5], y: [0, 5.5], proporcional: true, funciones: [{ f: (x) => (x <= 3 ? 4.9 - 4.9 * (x / 3) ** 2 : NaN), etiqueta: 'trayectoria de la pelota' }],
    puntos: [{ x: 0, y: 4.9, etiqueta: 't = 0 s' }, { x: 1.5, y: 3.675, etiqueta: 't = 0.5 s' }, { x: 3, y: 0, etiqueta: 't = 1 s' }],
    descripcion: 'Trayectoria de una pelota lanzada horizontalmente a 3 m/s desde 4.9 m de altura. El eje horizontal es la distancia en metros y el vertical la altura. Sale de (0, 4.9), pasa por (1.5, 3.675) a los 0.5 s y toca el suelo en (3, 0) al segundo. La curva es media parábola que cae cada vez más inclinada.' });

  L('Tiro parabólico', {
    objetivo: 'Separar el movimiento de un objeto lanzado en una parte horizontal y otra vertical para calcular cuánto tarda en caer y qué tan lejos llega.',
    explicacion: `
      <p>Cuando pateas un balón o sale agua de una manguera, la trayectoria no es una línea recta: hace una curva. Primero avanza y sube, y luego avanza y baja. ¿Cómo se calcula dónde va a caer?</p>
      <h3>Dos movimientos que no se estorban</h3>
      <p>Imagina dos pelotas a la misma altura. Una la sueltas y la otra la empujas hacia adelante en ese mismo instante. ¿Cuál llega primero al suelo? Aunque parezca extraño, llegan juntas. La que empujaste avanza hacia adelante, pero cae exactamente igual de rápido que la otra.</p>
      <p>Esto pasa porque el movimiento hacia adelante y el movimiento hacia abajo son independientes: uno no afecta al otro. Por eso un objeto lanzado se puede estudiar como dos movimientos que ya conoces:</p>
      <ul>
        <li>Hacia adelante no hay nada que lo empuje ni lo frene, si ignoramos el aire. Avanza siempre igual de rápido: es un movimiento rectilíneo uniforme, y la distancia es x = v·t.</li>
        <li>Hacia abajo la gravedad lo jala como a cualquier objeto: es caída libre, y lo que baja es h = ½·g·t².</li>
      </ul>
      <p>El camino que dibuja un objeto se llama <strong>trayectoria</strong>. Al juntar el avance parejo con la caída que se acelera, la trayectoria es una parábola, la misma curva de la función cuadrática que viste en Matemáticas. Por eso al movimiento de un objeto lanzado se le llama <strong>tiro parabólico</strong>.</p>
      <h3>Lanzar algo horizontalmente</h3>
      <p>Una pelota rueda a 3 m/s por una mesa de 4.9 m de alto y sale por la orilla. Primero piensa en la caída, porque decide cuánto tiempo está en el aire: 4.9 = ½·9.8·t² = 4.9·t², así que t = 1 s. Durante ese segundo avanza 3 m/s hacia adelante, así que cae a 3 × 1 = 3 m de la mesa.</p>
      ${TIRO}
      <p>Fíjate en la gráfica: a la mitad del tiempo ya avanzó la mitad de la distancia, pero apenas cayó la cuarta parte de la altura. La caída empieza lenta y se acelera.</p>
      <h3>Lanzar algo hacia arriba y hacia adelante</h3>
      <p>Cuando lanzas inclinado, la velocidad tiene una parte hacia adelante y otra hacia arriba. A cada parte se le llama componente; en Matemáticas, el seno y el coseno sirven para calcularlas a partir del ángulo. Si ya conoces las dos partes, el resto es como antes. La parte hacia arriba sube y baja como una pelota lanzada verticalmente: si la parte hacia arriba de la velocidad es 9.8 m/s, tarda 1 s en subir y 1 s en bajar, 2 s en total. Mientras tanto, la parte hacia adelante sigue pareja: a 10 m/s, en 2 s llega a 20 m.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que lanzar más rápido hacia adelante hace que algo tarde más en caer. El tiempo en el aire depende solo del movimiento vertical. Ir más rápido hacia adelante solo hace que caiga más lejos.</p>`,
    ejemplo: `
      <p>Desde un acantilado de 19.6 m de alto, lanzas una piedra horizontalmente a 5 m/s. ¿A qué distancia de la base cae? Usa g = 9.8 m/s².</p>
      <ol class="pasos-ej">
        <li>Empieza por la parte vertical, porque es la que decide cuánto dura el vuelo. La piedra cae 19.6 m como si la soltaras: 19.6 = 4.9·t².</li>
        <li>Despeja: t² = 19.6 ÷ 4.9 = 4, así que t = 2 s.</li>
        <li>Ahora la parte horizontal. Durante esos 2 s la piedra avanza parejo a 5 m/s: x = 5 × 2 = 10 m.</li>
        <li>Comprueba la caída con el tiempo que encontraste: ½ × 9.8 × 2² = 4.9 × 4 = 19.6 m, justo la altura del acantilado.</li>
      </ol>
      <p>Resultado: <span class="resultado">cae a 10 m de la base</span>.</p>
      <p class="nota"><strong>Error común:</strong> dividir la altura entre la velocidad, 19.6 ÷ 5. Esa velocidad es hacia adelante y no tiene nada que ver con cuánto tarda en caer.</p>`,
    vidaReal: `
      <p>Todo lo que vuela por el aire después de ser lanzado sigue la misma regla:</p>
      <ul>
        <li>En deportes como el básquet o el futbol, explica qué tan fuerte y con qué inclinación lanzar para atinarle a la canasta o a la portería.</li>
        <li>Al regar el jardín, inclinar la manguera cambia hasta dónde llega el agua.</li>
        <li>Los aviones que llevan ayuda a zonas aisladas sueltan los paquetes antes de pasar encima del lugar donde deben caer.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una canica rueda por una mesa de 1.225 m de alto y sale por la orilla. ¿Cuántos segundos tarda en llegar al piso? Usa g = 9.8 m/s².</p>', respuesta: Math.sqrt(2 * 1.225 / 9.8),
        pista: '<p>Solo importa la caída: 1.225 = 4.9·t². ¿Cuánto vale t²?</p>',
        solucion: '<p>t² = 1.225 ÷ 4.9 = 0.25, así que t = <strong>0.5 s</strong>, porque 0.5 × 0.5 = 0.25.</p>' },
      { tipo: 'numero', enunciado: '<p>Si esa canica salió de la mesa a 4 m/s, ¿a cuántos metros de la orilla cae?</p>', respuesta: 4 * 0.5,
        pista: '<p>Hacia adelante avanza parejo durante el tiempo que está en el aire.</p>',
        solucion: '<p>Está 0.5 s en el aire y avanza 4 m cada segundo: 4 × 0.5 = <strong>2 m</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Desde la misma altura y al mismo tiempo, sueltas una pelota y lanzas otra horizontalmente. Sin aire, ¿cuál llega primero al suelo?</p>',
        opciones: ['La que soltaste', 'La que lanzaste', 'Llegan al mismo tiempo', 'Depende de cuánto pesen'], correcta: 2,
        pista: '<p>El movimiento hacia adelante no cambia el movimiento hacia abajo.</p>',
        solucion: '<p>Las dos caen con la misma aceleración desde la misma altura, así que <strong>llegan al mismo tiempo</strong>. La lanzada solo cae más lejos.</p>' },
      { tipo: 'numero', enunciado: '<p>Pateas un balón con una velocidad de 6 m/s hacia adelante y 19.6 m/s hacia arriba. ¿Cuántos segundos está en el aire hasta volver al suelo? Usa g = 9.8 m/s².</p>', respuesta: 2 * 19.6 / 9.8,
        pista: '<p>Calcula cuánto tarda la parte hacia arriba en llegar a 0, y recuerda que tarda lo mismo en bajar.</p>',
        solucion: '<p>Tarda 19.6 ÷ 9.8 = 2 s en subir y otros 2 s en bajar: <strong>4 s</strong> en total.</p>' },
      { tipo: 'numero', enunciado: '<p>Con el mismo balón (6 m/s hacia adelante y 4 s en el aire), ¿a cuántos metros cae de donde lo pateaste?</p>', respuesta: 6 * 4,
        pista: '<p>Hacia adelante avanza parejo todo el tiempo que vuela.</p>',
        solucion: '<p>Avanza 6 m cada segundo durante 4 s: 6 × 4 = <strong>24 m</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Qué altura máxima alcanza ese balón, que sube a 19.6 m/s? Usa g = 9.8 m/s².</p>', respuesta: (19.6 / 2) * (19.6 / 9.8),
        pista: '<p>Sube durante 2 s. Mientras sube, su velocidad va de 19.6 a 0: ¿cuál es su velocidad promedio?</p>',
        solucion: '<p>Mientras sube, su velocidad promedio es (19.6 + 0) ÷ 2 = 9.8 m/s, y sube durante 2 s: 9.8 × 2 = <strong>19.6 m</strong>.</p>' },
    ],
    fuentes: [OS('5-3-projectile-motion', 'Projectile Motion'), { nombre: 'PhET, Universidad de Colorado: Movimiento de proyectiles', url: 'https://phet.colorado.edu/es/simulations/projectile-motion' }, WIKI('Tiro_parabólico', 'Tiro parabólico'), KHAN_2D],
  });

  // ------------------------------------------------------------------
  const GIRO = G({ x: [-3.2, 3.2], y: [-2.8, 3.4], proporcional: true, ejes: false, figuras: [
    { tipo: 'circulo', x: 0, y: 0, r: 2 }, { tipo: 'circulo', x: 0, y: 0, r: 0.06, solido: true },
    ...flecha([2, 0], [2, 1.6]), ...flecha([0, 2], [-1.6, 2]),
    ...flecha([2, 0], [0.9, 0], 1), ...flecha([0, 2], [0, 0.9], 1),
    txt(2.95, 0.9, 'velocidad'), txt(-1.6, 2.5, 'velocidad'),
    txt(0.9, -0.4, 'hacia el centro'), txt(0, -0.9, 'centro'),
  ], descripcion: 'Un círculo visto desde arriba. En el punto de la derecha, la flecha de velocidad apunta hacia arriba, tocando el círculo sin cruzarlo; en el punto de arriba, apunta hacia la izquierda. Desde cada uno de esos puntos, otra flecha más corta apunta hacia el centro del círculo: es la aceleración. Las flechas largas llevan la etiqueta "velocidad", la etiqueta "hacia el centro" nombra las cortas, y el centro está rotulado con la palabra "centro".' });

  L('Movimiento circular', {
    objetivo: 'Calcular el periodo, la frecuencia y la rapidez de algo que gira en círculo, y entender por qué tiene una aceleración hacia el centro.',
    explicacion: `
      <p>En una rueda de la fortuna, tu asiento da vueltas siempre igual de rápido. Sin embargo, en cada momento vas hacia un lado distinto: subes, luego vas de lado, luego bajas. En esta lección veremos qué pasa cuando algo gira en círculo con rapidez constante, como esa rueda.</p>
      <h3>¿Cuánto tarda en dar una vuelta?</h3>
      <p>El tiempo que tarda en dar una vuelta completa se llama <strong>periodo</strong> y se escribe T. Si la rueda de la fortuna da una vuelta cada 40 s, T = 40 s. También se puede decir al revés: cuántas vueltas da en cada segundo. A eso se le llama <strong>frecuencia</strong>, f, y se calcula así:</p>
      <p>f = ${F(1, 'T')}</p>
      <p>Se lee "la frecuencia es uno entre el periodo". Funciona porque si una vuelta tarda 0.5 s, en un segundo caben 1 ÷ 0.5 = 2 vueltas. Su unidad es vueltas por segundo, que se llama hertz (Hz).</p>
      <h3>¿Qué tan rápido va?</h3>
      <p>En una vuelta completa recorres todo el borde del círculo, que mide 2πr, donde r es el radio: la distancia del centro al borde. Como la rapidez es la distancia entre el tiempo, y una vuelta tarda T:</p>
      <p>v = ${F('2πr', 'T')}</p>
      <p>Se lee "la rapidez es dos pi por el radio, entre el periodo". Fíjate en algo curioso: en un carrusel, los caballitos de afuera van más rápido que los de adentro, aunque todos dan la vuelta en el mismo tiempo. Los de afuera recorren un círculo más grande en el mismo tiempo.</p>
      <h3>¿Por qué hay aceleración si la rapidez no cambia?</h3>
      <p>En la lección de aceleración viste que acelerar es cualquier cambio de velocidad, y la velocidad tiene dirección. Al girar, la dirección cambia todo el tiempo, así que hay aceleración aunque la rapidez sea la misma.</p>
      ${GIRO}
      <p>En cada punto, la velocidad apunta de lado, tocando el círculo sin cruzarlo. Para que el objeto no se siga derecho, algo lo tiene que jalar hacia el centro: la cuerda de una honda, el piso en una curva, la estructura de la rueda. Por eso la aceleración apunta hacia el centro. Se llama <strong>aceleración centrípeta</strong>, que quiere decir "que busca el centro", y se calcula así:</p>
      <p>a = ${F('v²', 'r')}</p>
      <p>Se lee "la aceleración es la rapidez al cuadrado entre el radio". Tiene sentido: girar más rápido o en una curva más cerrada exige un cambio de dirección más brusco.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que si sueltas una piedra que gira en una honda, sale disparada hacia afuera, lejos del centro. En realidad sale en línea recta en la dirección que llevaba en ese instante: de lado, tocando el círculo.</p>`,
    ejemplo: `
      <p>Una rueda de la fortuna tiene 10 m de radio y da una vuelta cada 40 s. ¿Qué tan rápido va un asiento y cuál es su aceleración?</p>
      <ol class="pasos-ej">
        <li>Primero calcula cuánto mide una vuelta, porque eso es lo que recorre el asiento en un periodo: 2πr = 2 × 3.14 × 10 = 62.8 m.</li>
        <li>Divide esa distancia entre el tiempo de una vuelta: v = 62.8 ÷ 40 = 1.57 m/s.</li>
        <li>Ahora la aceleración hacia el centro: a = v² ÷ r = 1.57² ÷ 10 = 2.46 ÷ 10 ≈ 0.25 m/s².</li>
        <li>Comprueba la rapidez de otra forma: a 1.57 m/s, en 40 s se recorren 1.57 × 40 = 62.8 m, que es justo una vuelta.</li>
      </ol>
      <p>Resultado: <span class="resultado">1.57 m/s y una aceleración de unos 0.25 m/s² hacia el centro</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar el diámetro (20 m) en lugar del radio. La fórmula 2πr pide la distancia del centro al borde, que es la mitad del diámetro.</p>`,
    vidaReal: `
      <p>Las cosas que giran están por todos lados:</p>
      <ul>
        <li>Las lavadoras centrifugan la ropa girando muy rápido para sacarle el agua.</li>
        <li>En una curva cerrada, el coche necesita que las llantas se agarren bien al piso; por eso hay que bajar la velocidad.</li>
        <li>Los ventiladores y los discos duros indican cuántas vueltas dan por minuto, para saber qué tan rápido giran.</li>
        <li>Los satélites que dan vueltas alrededor de la Tierra siguen un movimiento circular, y por eso saben cuándo pasarán otra vez sobre tu ciudad.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Las aspas de un ventilador dan 5 vueltas cada segundo. ¿Cuál es su periodo, en segundos?</p>', respuesta: 1 / 5,
        pista: '<p>Si en un segundo caben 5 vueltas, ¿cuánto dura cada una?</p>',
        solucion: '<p>Un segundo repartido entre 5 vueltas: T = 1 ÷ 5 = <strong>0.2 s</strong> por vuelta.</p>' },
      { tipo: 'numero', enunciado: '<p>Una rueda tarda 0.5 s en dar una vuelta. ¿Cuál es su frecuencia, en hertz (vueltas por segundo)?</p>', respuesta: 1 / 0.5,
        pista: '<p>Usa f = 1 ÷ T.</p>',
        solucion: '<p>f = 1 ÷ 0.5 = <strong>2 Hz</strong>. Si cada vuelta dura medio segundo, en un segundo caben dos vueltas completas.</p>' },
      { tipo: 'numero', enunciado: '<p>Un atleta corre por una pista circular de 50 m de radio y da una vuelta en 20 s. ¿Cuál es su rapidez, en m/s? Puedes usar π ≈ 3.14.</p>', respuesta: 2 * Math.PI * 50 / 20, tolerancia: tolPi(2 * Math.PI * 50 / 20),
        pista: '<p>Calcula primero cuánto mide una vuelta con 2πr.</p>',
        solucion: '<p>Una vuelta mide 2 × 3.14 × 50 = 314 m, y la recorre en 20 s: v = 314 ÷ 20 ≈ <strong>15.7 m/s</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un coche toma una curva de 25 m de radio a 10 m/s. ¿Cuál es su aceleración centrípeta, en m/s²?</p>', respuesta: 10 ** 2 / 25,
        pista: '<p>Usa a = v² ÷ r. Empieza por elevar la rapidez al cuadrado.</p>',
        solucion: '<p>10² = 100, y a = 100 ÷ 25 = <strong>4 m/s²</strong>, hacia el centro de la curva.</p>' },
      { tipo: 'opciones', enunciado: '<p>Giras una piedra con una honda y la sueltas. ¿Hacia dónde sale?</p>',
        opciones: ['Hacia el centro del círculo', 'Hacia afuera, en línea recta desde el centro del círculo', 'En línea recta, en la dirección que llevaba en ese instante', 'Sigue girando en círculo'], correcta: 2,
        pista: '<p>Al soltarla, ya nada la jala hacia el centro. ¿Qué dirección llevaba su velocidad?</p>',
        solucion: '<p>Sin la cuerda que la jale al centro, la piedra sigue <strong>en línea recta en la dirección que llevaba</strong>, de lado, tocando el círculo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un carrusel gira siempre igual de rápido. ¿Los caballitos tienen aceleración?</p>',
        opciones: ['No, porque su rapidez no cambia.', 'Sí, porque su dirección cambia todo el tiempo.', 'Solo los de afuera.', 'Solo cuando el carrusel arranca.'], correcta: 1,
        pista: '<p>Recuerda que la velocidad tiene tamaño y dirección.</p>',
        solucion: '<p><strong>Sí tienen aceleración</strong>: aunque la rapidez no cambie, la dirección cambia en cada instante, y eso es un cambio de velocidad. Esa aceleración apunta hacia el centro.</p>' },
    ],
    fuentes: [OS('6-1-angle-of-rotation-and-angular-velocity', 'Angle of Rotation and Angular Velocity'), OS('6-2-uniform-circular-motion', 'Uniform Circular Motion'), WIKI('Movimiento_circular', 'Movimiento circular'), KHAN_2D],
  });
})();
