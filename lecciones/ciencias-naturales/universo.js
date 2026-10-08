// Ciencias naturales · Unidad 7: El universo.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Traslapes: la rapidez de la luz y el año luz ya están en Física ("Naturaleza de la luz"); aquí solo se retoman.
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('ciencias-naturales', titulo, datos);
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
  // Media esfera sombreada (la mitad iluminada), de un ángulo a otro en grados.
  const mitad = (x, y, r, desde, hasta) => ({ tipo: 'poligono', relleno: true, puntos: Array.from({ length: 13 }, (_, i) => {
    const a = ((desde + ((hasta - desde) * i) / 12) * Math.PI) / 180;
    return [x + r * Math.cos(a), y + r * Math.sin(a)];
  }) });

  const OSA = (pagina, nombre) => ({ nombre: `OpenStax, Astronomy 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/astronomy-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const PHET = (sim, nombre) => ({ nombre: `PhET, Universidad de Colorado: ${nombre}`, url: `https://phet.colorado.edu/es/simulations/${sim}` });
  const NASA = (ruta, nombre) => ({ nombre: `NASA Ciencia: ${nombre}`, url: `https://ciencia.nasa.gov/${ruta}/` });
  const SP = (ruta, nombre) => ({ nombre: `NASA Space Place en español: ${nombre}`, url: `https://spaceplace.nasa.gov/${ruta}/sp/` });

  // ------------------------------------------------------------------
  L('El sistema solar', {
    objetivo: 'Conocer los cuerpos que forman el sistema solar, explicar por qué giran alrededor del Sol y comparar sus distancias.',
    explicacion: `
      <p>De noche, algunos puntos brillantes del cielo no titilan como las estrellas: son planetas. Y el Sol, que de día parece una bola pequeña, es una estrella como las demás, solo que muy cerca de nosotros. Todo lo que gira a su alrededor forma nuestro vecindario en el espacio.</p>
      <p>El <strong>sistema solar</strong> es el Sol junto con todo lo que gira a su alrededor: planetas, lunas, planetas enanos, asteroides y cometas. Solo el Sol tiene más del 99% de toda la masa del sistema solar.</p>
      <h3>¿Por qué todo gira alrededor del Sol?</h3>
      <p>En Física viste la gravitación universal: todo lo que tiene masa atrae a lo demás. El Sol, con tanta masa, jala a los planetas hacia él. Pero los planetas también avanzan muy rápido de lado. La combinación hace que no caigan al Sol ni salgan disparados: le dan vueltas. El camino que sigue un cuerpo alrededor de otro se llama <strong>órbita</strong>. Es como una piedra atada a una cuerda que haces girar, donde la cuerda es la gravedad.</p>
      <h3>Los planetas</h3>
      <p>Un <strong>planeta</strong> es un cuerpo grande y redondo que gira alrededor del Sol y que, con su gravedad, ha limpiado su camino de otros objetos. Hay ocho. Plutón cumple las dos primeras condiciones, pero no la tercera, y por eso desde 2006 se le llama planeta enano.</p>
      <p>Las distancias son tan grandes que se miden con la unidad astronómica (UA): la distancia promedio entre la Tierra y el Sol, unos 150 millones de kilómetros.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Planeta</th><th>Distancia al Sol (UA)</th><th>Tipo</th></tr>
        <tr><th>Mercurio</th><td>0.4</td><td>Rocoso</td></tr>
        <tr><th>Venus</th><td>0.7</td><td>Rocoso</td></tr>
        <tr><th>Tierra</th><td>1</td><td>Rocoso</td></tr>
        <tr><th>Marte</th><td>1.5</td><td>Rocoso</td></tr>
        <tr><th>Júpiter</th><td>5.2</td><td>Gigante de gas</td></tr>
        <tr><th>Saturno</th><td>9.5</td><td>Gigante de gas</td></tr>
        <tr><th>Urano</th><td>19.2</td><td>Gigante de hielo</td></tr>
        <tr><th>Neptuno</th><td>30.1</td><td>Gigante de hielo</td></tr>
      </table></div>
      <p>Fíjate en el patrón: los cuatro planetas cercanos al Sol son pequeños y rocosos, y los cuatro lejanos son gigantes. Cuando se formó el sistema solar, cerca del Sol hacía tanto calor que solo podían juntarse la roca y el metal. Lejos, también se congelaban el agua y otras sustancias, y había mucho más material para formar planetas enormes.</p>
      <h3>Los cuerpos pequeños</h3>
      <p>Entre Marte y Júpiter hay un cinturón de asteroides, rocas de todos los tamaños. Más allá de Neptuno hay otro cinturón de cuerpos helados, donde está Plutón. Los cometas son bolas de hielo y polvo que vienen de muy lejos; cuando se acercan al Sol, el hielo se evapora y forma una cola brillante. Y las estrellas fugaces, como viste en la lección de la atmósfera, son pedacitos de roca que se queman al entrar al aire.</p>
      <p class="nota"><strong>Trampa común:</strong> imaginar los planetas cerca unos de otros, como en los dibujos de los libros. Los dibujos los juntan para que quepan en la página, pero Neptuno está 30 veces más lejos del Sol que la Tierra, y casi todo el sistema solar es espacio vacío.</p>`,
    ejemplo: `
      <p>En Física viste que la luz del Sol tarda unos 500 segundos, más de 8 minutos, en llegar a la Tierra, que está a 1 UA. ¿Cuánto tarda en llegar a Júpiter, que está a 5.2 UA?</p>
      <ol class="pasos-ej">
        <li>La luz viaja siempre a la misma rapidez, así que el tiempo es proporcional a la distancia. Si 1 UA tarda 500 segundos, 5.2 UA tardan 5.2 veces más.</li>
        <li>Multiplica: 5.2 × 500 = 2 600 segundos.</li>
        <li>Pásalo a minutos dividiendo entre 60: 2 600 ÷ 60 ≈ 43 minutos.</li>
        <li>Comprueba con kilómetros: 5.2 × 150 000 000 = 780 000 000 km, y 780 000 000 ÷ 300 000 km/s = 2 600 segundos. Coincide.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 43 minutos</span>. Por eso las naves que exploran planetas lejanos no se pueden manejar en directo: cada orden tarda minutos u horas en llegar.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar la distancia por la rapidez de la luz. Para el tiempo hay que dividir: tiempo = distancia ÷ rapidez.</p>`,
    vidaReal: `
      <p>Lo que pasa en nuestro vecindario en el espacio te toca más de lo que parece:</p>
      <ul>
        <li>Las naves que exploran Marte tardan meses en llegar, por lo lejos que está.</li>
        <li>Los satélites que dan señal al GPS de tu celular dan vueltas a la Tierra, igual que la Luna.</li>
        <li>El "lucero" que brilla al atardecer o al amanecer casi siempre es Venus, no una estrella.</li>
        <li>Los astrónomos vigilan las rocas espaciales cercanas para avisar si alguna se acerca demasiado.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Marte está a 1.5 UA del Sol, y 1 UA son 150 millones de km. ¿A cuántos millones de kilómetros del Sol está Marte?</p>', respuesta: 1.5 * 150, tolerancia: 0.1,
        pista: '<p>Multiplica las UA por 150.</p>',
        solucion: '<p>1.5 × 150 = <strong>225 millones de km</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>La luz del Sol tarda unos 8 minutos en recorrer 1 UA. ¿Cuántos minutos tarda en llegar a Saturno, que está a 9.5 UA?</p>', respuesta: 8 * 9.5, tolerancia: 0.5,
        pista: '<p>El tiempo crece igual que la distancia.</p>',
        solucion: '<p>8 × 9.5 = <strong>76 minutos</strong>, más de una hora.</p>' },
      { tipo: 'numero', enunciado: '<p>En Júpiter, la gravedad es de unos 24.8 m/s². ¿Cuánto pesaría ahí, en newtons, una persona de 40 kg? Usa P = m·g, como en Física.</p>', respuesta: 40 * 24.8, tolerancia: 1,
        pista: '<p>Multiplica la masa por la gravedad de Júpiter.</p>',
        solucion: '<p>40 × 24.8 = <strong>992 N</strong>, unas dos veces y media lo que pesaría en la Tierra. Su masa sigue siendo 40 kg.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué Plutón ya no se considera planeta?</p>',
        opciones: ['Porque es demasiado frío', 'Porque no ha limpiado su camino de otros objetos', 'Porque no es redondo'], correcta: 1,
        pista: '<p>Revisa las tres condiciones de un planeta.</p>',
        solucion: '<p>Porque <strong>no ha limpiado su camino</strong>: comparte su zona con muchos otros cuerpos helados. Sí es redondo y sí gira alrededor del Sol.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué mantiene a la Tierra girando alrededor del Sol?</p>',
        opciones: ['La gravedad del Sol', 'El viento del espacio', 'El campo magnético de la Tierra'], correcta: 0,
        pista: '<p>Piensa en la cuerda que sujeta la piedra.</p>',
        solucion: '<p>La <strong>gravedad del Sol</strong>, junto con lo rápido que avanza la Tierra de lado.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cómo son los cuatro planetas más cercanos al Sol?</p>',
        opciones: ['Gigantes de gas', 'Gigantes de hielo', 'Pequeños y rocosos'], correcta: 2,
        pista: '<p>Revisa la tabla.</p>',
        solucion: '<p><strong>Pequeños y rocosos</strong>: Mercurio, Venus, la Tierra y Marte. Cerca del Sol hacía demasiado calor para que se juntara el hielo.</p>' },
    ],
    fuentes: [
      OSA('7-1-overview-of-our-planetary-system', 'Overview of Our Planetary System'),
      NASA('sistema-solar', 'Sistema solar'),
      SP('planets', 'Los planetas'),
      WIKI('Sistema_solar', 'Sistema solar'),
      WIKI('Planeta_enano', 'Planeta enano'),
      WIKI('Unidad_astronómica', 'Unidad astronómica'),
      PHET('gravity-and-orbits', 'Gravedad y órbitas'),
    ],
  });

  // ------------------------------------------------------------------
  // Tierra con su eje inclinado 23.5° hacia la derecha en las dos posiciones de la órbita.
  const eje = (x, y) => {
    const dx = 0.95 * Math.sin((23.5 * Math.PI) / 180), dy = 0.95 * Math.cos((23.5 * Math.PI) / 180);
    return [{ tipo: 'linea', desde: [x - dx, y - dy], hasta: [x + dx, y + dy] }, txt(x + dx + 0.05, y + dy + 0.35, 'N')];
  };
  const ESTACIONES = diagrama([-1, 13], [-2.2, 3.4], [
    { tipo: 'circulo', x: 6, y: 1.2, r: 0.7, relleno: true }, txt(6, 0.1, 'Sol'),
    { tipo: 'circulo', x: 2, y: 1.2, r: 0.55 }, ...eje(2, 1.2),
    { tipo: 'circulo', x: 10, y: 1.2, r: 0.55 }, ...eje(10, 1.2),
    txt(2, -0.4, 'junio'), txt(2, -1, 'verano en el norte'), txt(2, -1.6, 'invierno en el sur'),
    txt(10, -0.4, 'diciembre'), txt(10, -1, 'invierno en el norte'), txt(10, -1.6, 'verano en el sur'),
  ], 'El Sol en medio y la Tierra en dos lados de su órbita, con el eje inclinado siempre hacia la derecha y el polo norte rotulado N. A la izquierda, en junio, el polo norte se inclina hacia el Sol: verano en el norte e invierno en el sur. A la derecha, en diciembre, el polo norte se inclina en sentido contrario al Sol: invierno en el norte y verano en el sur.');

  L('Movimientos de la Tierra: días, años y estaciones', {
    objetivo: 'Explicar cómo los movimientos de la Tierra producen el día, el año y las estaciones, y por qué las estaciones son opuestas en cada mitad del planeta.',
    explicacion: `
      <p>En diciembre, en México hace frío, y en Argentina la gente va a la playa. Si las estaciones dependieran de qué tan cerca estamos del Sol, todo el planeta tendría verano al mismo tiempo. Algo más está pasando.</p>
      <h3>El día: la Tierra gira sobre sí misma</h3>
      <p>La <strong>rotación</strong> es el giro de la Tierra sobre su propio eje, una línea imaginaria que la atraviesa de polo a polo. Da una vuelta en unas 24 horas. La mitad que mira al Sol tiene día, y la otra mitad, noche. Por eso el Sol parece salir por el este y ponerse por el oeste: en realidad somos nosotros los que giramos. No lo sentimos porque el giro es muy parejo, como en un avión que no se sacude.</p>
      <h3>El año: la vuelta al Sol</h3>
      <p>La <strong>traslación</strong> es el viaje de la Tierra alrededor del Sol, siguiendo su órbita. Una vuelta completa tarda unos 365 días y 6 horas, es decir, 365.25 días. Como el calendario usa años de 365 días, cada año sobra un cuarto de día. Por eso cada cuatro años se agrega un día, el 29 de febrero: 4 × 0.25 = 1 día. A ese año se le llama bisiesto.</p>
      <h3>Las estaciones: el eje inclinado</h3>
      <p>El eje de la Tierra no está derecho: está inclinado unos 23.5°, y apunta siempre hacia el mismo lado del espacio mientras la Tierra le da la vuelta al Sol. A esto se le llama la <strong>inclinación del eje</strong>, y es la verdadera causa de las estaciones.</p>
      ${ESTACIONES}
      <p>Fíjate en el dibujo. En junio, el polo norte está inclinado hacia el Sol. La mitad norte del planeta recibe los rayos más directos y tiene días más largos: es verano en el norte. Al mismo tiempo, la mitad sur recibe los rayos de lado y tiene días cortos: es invierno. Seis meses después, en diciembre, la Tierra está del otro lado del Sol, y ahora es la mitad sur la que se inclina hacia él.</p>
      <p>¿Por qué importa que los rayos lleguen directos? Haz la prueba con una linterna. Si la apuntas derecho a la mesa, ilumina un círculo pequeño y brillante; si la inclinas, la misma luz se reparte en una mancha más grande y más tenue. Con el calor del Sol pasa lo mismo.</p>
      <p>Hay cuatro días especiales. En los solsticios, en junio y en diciembre, una mitad del planeta tiene su día más largo y la otra, su día más corto. En los equinoccios, en marzo y en septiembre, ningún polo apunta hacia el Sol, y el día y la noche duran casi lo mismo en todo el planeta.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que en verano la Tierra está más cerca del Sol. De hecho, la Tierra está más cerca del Sol a principios de enero, en pleno invierno del norte. La distancia cambia muy poco; lo que cambia todo es la inclinación.</p>`,
    ejemplo: `
      <p>La vuelta a la Tierra por el ecuador mide unos 40 000 km, y la Tierra da un giro en 24 horas. ¿A qué rapidez se mueve una persona parada en el ecuador?</p>
      <ol class="pasos-ej">
        <li>En un giro, esa persona recorre toda la vuelta del ecuador: 40 000 km.</li>
        <li>Como en Física, la rapidez es distancia entre tiempo: 40 000 ÷ 24 ≈ 1 667 km/h.</li>
        <li>Compárala con algo conocido: un avión comercial vuela a unos 900 km/h, así que vas casi al doble, sin sentirlo.</li>
        <li>Comprueba al revés: 1 667 km/h × 24 h ≈ 40 000 km, la vuelta completa.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 1 667 km/h</span>. Cerca de los polos la vuelta es mucho más corta, así que ahí la rapidez es menor.</p>
      <p class="nota"><strong>Error común:</strong> dividir entre 365 días. La rotación tarda un día, no un año; el año corresponde a la vuelta alrededor del Sol.</p>`,
    vidaReal: `
      <p>Los movimientos del planeta ordenan tu calendario:</p>
      <ul>
        <li>Existen los husos horarios porque, cuando en tu ciudad es mediodía, del otro lado del planeta es medianoche.</li>
        <li>Los agricultores siembran según la temporada del año para aprovechar la lluvia y el calor.</li>
        <li>Las vacaciones de verano caen en meses distintos en el norte y en el sur del planeta.</li>
        <li>Cada cuatro años, febrero tiene un día más en el calendario.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuántos días hay en cuatro años seguidos, si uno de ellos es bisiesto?</p>', respuesta: 365 * 4 + 1,
        pista: '<p>Tres años de 365 días y uno de 366.</p>',
        solucion: '<p>365 × 4 + 1 = <strong>1 461 días</strong>, que son justo 4 × 365.25.</p>' },
      { tipo: 'numero', enunciado: '<p>La Tierra gira 360° en 24 horas. ¿Cuántos grados gira en una hora?</p>', respuesta: 360 / 24,
        pista: '<p>Reparte los 360° entre las 24 horas.</p>',
        solucion: '<p>360 ÷ 24 = <strong>15°</strong> por hora. Por eso cada huso horario abarca unos 15°.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué causa las estaciones del año?</p>',
        opciones: ['Que la Tierra se acerca y se aleja del Sol', 'La inclinación del eje de la Tierra', 'Que el Sol brilla más en algunos meses'], correcta: 1,
        pista: '<p>Si fuera la distancia, las dos mitades del planeta tendrían la misma estación.</p>',
        solucion: '<p><strong>La inclinación del eje</strong>, que hace que cada mitad del planeta reciba los rayos más directos en una época distinta.</p>' },
      { tipo: 'opciones', enunciado: '<p>En junio, el polo norte se inclina hacia el Sol. ¿Qué estación hay entonces en Argentina, en la mitad sur?</p>',
        opciones: ['Verano', 'Primavera', 'Invierno'], correcta: 2,
        pista: '<p>Las estaciones son opuestas en cada mitad.</p>',
        solucion: '<p><strong>Invierno</strong>, porque la mitad sur recibe los rayos de lado y tiene días cortos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿A qué se deben el día y la noche?</p>',
        opciones: ['A la rotación de la Tierra', 'A la traslación de la Tierra', 'A que la Luna tapa el Sol'], correcta: 0,
        pista: '<p>Pasa una vez cada 24 horas.</p>',
        solucion: '<p>A la <strong>rotación</strong>: la mitad que mira al Sol tiene día y la otra, noche.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el año que tiene 366 días?</p>', respuestas: ['bisiesto', 'año bisiesto', 'un año bisiesto', 'el año bisiesto'],
        pista: '<p>Tiene un 29 de febrero.</p>',
        solucion: '<p>Año <strong>bisiesto</strong>.</p>' },
    ],
    fuentes: [
      OSA('4-2-the-seasons', 'The Seasons'),
      OSA('4-3-keeping-time', 'Keeping Time'),
      SP('seasons', '¿Qué causa las estaciones?'),
      WIKI('Rotación_de_la_Tierra', 'Rotación de la Tierra'),
      WIKI('Estación_del_año', 'Estación del año'),
      WIKI('Año_bisiesto', 'Año bisiesto'),
    ],
  });

  // ------------------------------------------------------------------
  // Vista desde arriba del polo norte, con el Sol a la izquierda. La mitad sombreada de cada Luna es la iluminada.
  const luna = (x, y) => [{ tipo: 'circulo', x, y, r: 0.4 }, mitad(x, y, 0.4, 90, 270)];
  const FASES = diagrama([-1.6, 9.2], [-1.6, 5.7], [
    ...flecha([-1.3, 3.2], [0.6, 3.2], 0, 1.6), ...flecha([-1.3, 0.8], [0.6, 0.8], 0, 1.6), txt(-0.4, 2, 'luz del Sol'),
    { tipo: 'circulo', x: 5, y: 2, r: 0.5, relleno: true }, txt(5, 2, 'Tierra'),
    ...luna(2.6, 2), txt(2.6, 1.15, 'nueva'),
    ...luna(5, -0.4), txt(5, -1.25, 'cuarto creciente'),
    ...luna(7.4, 2), txt(7.4, 1.15, 'llena'),
    ...luna(5, 4.4), txt(5, 5.25, 'cuarto menguante'),
  ], 'La Tierra vista desde arriba del polo norte, con la luz del Sol llegando desde la izquierda. La Luna aparece en cuatro posiciones a su alrededor, y en todas está iluminada la mitad que mira al Sol, dibujada sombreada. A la izquierda, entre el Sol y la Tierra, la luna nueva. Abajo, el cuarto creciente. A la derecha, detrás de la Tierra, la luna llena. Arriba, el cuarto menguante.');

  L('Fases de la Luna y eclipses', {
    objetivo: 'Explicar por qué la Luna cambia de forma a lo largo del mes y cómo se producen los eclipses de Sol y de Luna.',
    explicacion: `
      <p>Si miras la Luna varias noches seguidas, la ves cambiar: un día es un hilito, otro día media luna y otro un círculo completo. La Luna no cambia de forma; lo que cambia es cuánto vemos de su parte iluminada.</p>
      <h3>Una pelota iluminada de un solo lado</h3>
      <p>La Luna no tiene luz propia: brilla porque refleja la luz del Sol. Como es una esfera, el Sol siempre ilumina la mitad que lo mira, y la otra mitad está a oscuras. Mientras la Luna da vueltas alrededor de la Tierra, la vemos desde ángulos distintos, y por eso vemos más o menos de su mitad iluminada. Cada uno de esos aspectos se llama <strong>fase lunar</strong>.</p>
      ${FASES}
      <ul>
        <li>En la luna nueva, la Luna está entre la Tierra y el Sol. Su mitad iluminada mira hacia el Sol, y no la vemos.</li>
        <li>En el cuarto creciente, una semana después, vemos iluminada la mitad de su cara, como un semicírculo.</li>
        <li>En la luna llena, la Tierra está entre el Sol y la Luna, y vemos toda su mitad iluminada.</li>
        <li>En el cuarto menguante vuelve a verse un semicírculo, el del otro lado, y la Luna se adelgaza hasta la siguiente luna nueva.</li>
      </ul>
      <p>El ciclo completo, de una luna nueva a la siguiente, dura unos 29.5 días; de ahí viene la idea del mes. Además, la Luna tarda lo mismo en girar sobre sí misma que en darle la vuelta a la Tierra, y por eso siempre nos muestra la misma cara.</p>
      <h3>Los eclipses</h3>
      <p>Un eclipse ocurre cuando el Sol, la Tierra y la Luna quedan en línea, y uno de ellos le tapa la luz a otro.</p>
      <p>En un <strong>eclipse solar</strong>, la Luna pasa entre el Sol y la Tierra, y su sombra cae sobre una franja del planeta. Desde ahí, el Sol se ve tapado por un disco negro, y si queda tapado por completo, de día se oscurece como de noche. Solo puede pasar en luna nueva. Aunque la Luna es unas 400 veces más pequeña que el Sol, también está unas 400 veces más cerca, y por eso los dos se ven casi del mismo tamaño en el cielo.</p>
      <p>En un <strong>eclipse lunar</strong>, la Tierra queda entre el Sol y la Luna, y la sombra de la Tierra cubre la Luna. Solo pasa en luna llena, y la Luna se ve rojiza, porque el aire de la Tierra desvía hacia ella un poco de luz roja, como en los atardeceres.</p>
      <p>¿Por qué no hay eclipses cada mes? Porque la órbita de la Luna está inclinada unos 5° respecto a la de la Tierra, y casi siempre pasa un poco arriba o un poco abajo de la línea entre el Sol y la Tierra.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que las fases se deben a la sombra de la Tierra. Esa sombra solo cae sobre la Luna en los eclipses lunares, que son raros; las fases pasan todos los meses.</p>
      <p class="nota"><strong>Cuidado:</strong> nunca mires el Sol directamente, ni siquiera en un eclipse parcial, ni con lentes oscuros comunes, binoculares o telescopios, porque puede dañar tus ojos para siempre. Usa solo lentes certificados para eclipses o un proyector de cartón con un agujerito: con él no miras el Sol, sino la imagen que cae en una hoja, de espaldas al Sol. El eclipse lunar sí se puede ver sin protección. Si miraste el Sol sin protección y ves borroso o te duelen los ojos, acude a un médico.</p>`,
    ejemplo: `
      <p>Hoy hay luna llena. ¿En cuántos días, más o menos, habrá cuarto menguante, y en cuántos luna nueva?</p>
      <ol class="pasos-ej">
        <li>El ciclo completo dura 29.5 días y tiene cuatro fases principales separadas por tiempos iguales. Cada tramo dura 29.5 ÷ 4 ≈ 7.4 días.</li>
        <li>Después de la llena viene el cuarto menguante, un tramo después: unos 7.4 días, una semana.</li>
        <li>Luego viene la nueva, dos tramos después de la llena: 2 × 7.4 ≈ 14.8 días, unas dos semanas.</li>
        <li>Comprueba: cuatro tramos, 4 × 7.4 ≈ 29.5 días, te devuelven a la luna llena.</li>
      </ol>
      <p>Resultado: <span class="resultado">cuarto menguante en una semana y luna nueva en unas dos semanas</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner el cuarto menguante antes de la luna llena. El orden es nueva, cuarto creciente, llena y cuarto menguante: "creciente" quiere decir que la parte iluminada va creciendo hacia la llena.</p>`,
    vidaReal: `
      <p>La Luna marca ritmos que siguen vigentes:</p>
      <ul>
        <li>Muchos calendarios tradicionales, y las fechas de algunas fiestas, se basan en los cambios de la Luna.</li>
        <li>Los pescadores toman en cuenta la Luna, porque influye en las mareas.</li>
        <li>Saber cuándo habrá luna llena te ayuda a planear una caminata de noche con más luz.</li>
        <li>Proteger tus ojos cuando el Sol se oscurece de día evita lesiones que no tienen cura.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>El ciclo de la Luna dura 29.5 días. ¿Cuántos días pasan entre una fase principal y la siguiente? Redondea a un decimal.</p>', respuesta: 29.5 / 4, tolerancia: 0.05,
        pista: '<p>Son cuatro fases principales en un ciclo.</p>',
        solucion: '<p>29.5 ÷ 4 ≈ <strong>7.4 días</strong>, más o menos una semana.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos ciclos completos de la Luna, de 29.5 días cada uno, caben en un año de 365 días?</p>', respuesta: 12,
        pista: '<p>Divide 365 entre 29.5 y quédate con la parte entera.</p>',
        solucion: '<p>365 ÷ 29.5 ≈ 12.4, así que caben <strong>12 ciclos completos</strong>. Por eso un año tiene 12 meses, y a veces hay 13 lunas llenas.</p>' },
      { tipo: 'opciones', enunciado: '<p>En un eclipse solar, ¿cómo están acomodados el Sol, la Tierra y la Luna?</p>',
        opciones: ['La Luna está entre el Sol y la Tierra', 'La Tierra está entre el Sol y la Luna', 'El Sol está entre la Tierra y la Luna'], correcta: 0,
        pista: '<p>Lo que se tapa es el Sol.</p>',
        solucion: '<p><strong>La Luna está entre el Sol y la Tierra</strong>, y su sombra cae sobre la Tierra.</p>' },
      { tipo: 'opciones', enunciado: '<p>Durante la luna llena, ¿dónde está la Luna?</p>',
        opciones: ['Entre el Sol y la Tierra', 'Del lado de la Tierra opuesto al Sol', 'Detrás del Sol'], correcta: 1,
        pista: '<p>Revisa el diagrama.</p>',
        solucion: '<p><strong>Del lado opuesto al Sol</strong>, así que desde la Tierra vemos toda su mitad iluminada.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué no hay un eclipse cada mes?</p>',
        opciones: ['Porque la Luna a veces deja de brillar', 'Porque la Tierra gira muy rápido', 'Porque la órbita de la Luna está inclinada unos 5°'], correcta: 2,
        pista: '<p>Piensa en dos aros con el mismo centro, pero un poco inclinados.</p>',
        solucion: '<p>Porque <strong>la órbita de la Luna está inclinada</strong>, y casi siempre pasa arriba o abajo de la línea entre el Sol y la Tierra.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cómo se puede ver un eclipse solar sin dañarte los ojos?</p>',
        opciones: ['Con lentes de sol comunes', 'Con lentes certificados para eclipses o un proyector de cartón', 'Con binoculares'], correcta: 1,
        pista: '<p>Los lentes comunes no bastan.</p>',
        solucion: '<p>Con <strong>lentes certificados o un proyector de cartón</strong>. Los binoculares concentran la luz y son todavía más peligrosos.</p>' },
    ],
    fuentes: [
      OSA('4-5-phases-and-motions-of-the-moon', 'Phases and Motions of the Moon'),
      OSA('4-7-eclipses-of-the-sun-and-moon', 'Eclipses of the Sun and Moon'),
      NASA('luna', 'La Luna'),
      NASA('eclipses', 'Eclipses'),
      SP('moon-phases', 'Las fases de la Luna'),
      SP('eclipses', 'Eclipses'),
      WIKI('Fase_lunar', 'Fase lunar'),
      WIKI('Eclipse', 'Eclipse'),
    ],
  });

  // ------------------------------------------------------------------
  L('Estrellas y galaxias', {
    objetivo: 'Explicar qué es una estrella, por qué brilla, cómo nace y muere, y qué lugar ocupa el Sol en la Vía Láctea.',
    explicacion: `
      <p>Lejos de las luces de la ciudad, en una noche sin luna, el cielo se llena de miles de estrellas, y a veces se ve una franja blanquecina que lo cruza. Cada punto de luz es un sol, y esa franja son miles de millones de soles tan lejanos que se ven como neblina.</p>
      <h3>Qué es una estrella</h3>
      <p>Una <strong>estrella</strong> es una esfera enorme de gas muy caliente, sobre todo hidrógeno y helio, que produce su propia luz. El Sol es una estrella mediana; se ve tan grande y brillante porque está mucho más cerca que las demás.</p>
      <p>¿De dónde sale tanta energía? En el centro de una estrella, la gravedad aprieta el gas con una fuerza enorme, y la temperatura llega a millones de grados: en el Sol, unos 15 millones. Ahí los núcleos de hidrógeno chocan tan fuerte que se unen y forman helio. Esa unión de núcleos se llama <strong>fusión nuclear</strong>, y libera muchísima energía, que sale como luz y calor.</p>
      <h3>El color dice la temperatura</h3>
      <p>Un metal que se calienta en el fuego brilla primero rojo y luego casi blanco. Con las estrellas pasa algo parecido: las más frías son rojas y las más calientes, azules.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Color</th><th>Temperatura de la superficie</th><th>Ejemplo</th></tr>
        <tr><th>Roja</th><td>Menos de 3 500 °C</td><td>Próxima Centauri</td></tr>
        <tr><th>Amarilla</th><td>Unos 5 500 °C</td><td>El Sol</td></tr>
        <tr><th>Azul</th><td>Más de 10 000 °C</td><td>Rigel, en la constelación de Orión</td></tr>
      </table></div>
      <h3>La vida de una estrella</h3>
      <p>Las estrellas nacen en nubes de gas y polvo que la gravedad junta poco a poco, y pasan casi toda su vida fusionando hidrógeno. Una estrella como el Sol vive unos 10 000 millones de años, y al Sol le queda más o menos la mitad. Al final se hincha y se vuelve una gigante roja, suelta sus capas de afuera y deja un centro pequeño y caliente, una enana blanca.</p>
      <p>Las estrellas mucho más grandes viven menos y terminan en una explosión gigantesca, una supernova, que lanza al espacio los elementos que fabricaron, como el carbono, el oxígeno y el hierro. Con ese material se formaron después nuevos planetas, y también tú: el carbono de tus células y el hierro de tu sangre se fabricaron dentro de estrellas.</p>
      <h3>Galaxias</h3>
      <p>Una <strong>galaxia</strong> es un grupo enorme de estrellas, gas y polvo que la gravedad mantiene juntos. La nuestra es la Vía Láctea, la franja blanquecina del principio. Tiene forma de disco con brazos en espiral, mide unos 100 000 años luz de un lado a otro y tiene entre 200 000 y 400 000 millones de estrellas. El Sol está en uno de sus brazos, lejos del centro.</p>
      <p>En Física viste el año luz, que equivale a unos 9.5 billones de kilómetros. La estrella más cercana después del Sol, Próxima Centauri, está a unos 4.2 años luz, y la galaxia grande más cercana, Andrómeda, a unos 2.5 millones. Y en el universo hay cientos de miles de millones de galaxias, o quizá más.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que vemos las estrellas como son ahora. Su luz tardó años en llegar, así que ves cada estrella como era cuando salió esa luz.</p>`,
    ejemplo: `
      <p>Próxima Centauri está a unos 4.2 años luz, y un año luz son unos 9.5 billones de kilómetros. ¿A cuántos kilómetros está?</p>
      <ol class="pasos-ej">
        <li>Multiplica los años luz por los kilómetros de cada uno: 4.2 × 9.5 = 39.9 billones de km.</li>
        <li>Recuerda que en español un billón es un millón de millones, 10¹². Así que son unos 39.9 × 10¹² km, o redondeado, 4 × 10¹³ km.</li>
        <li>Para imaginarlo: un coche a 100 km/h, sin parar, tardaría 4 × 10¹³ ÷ 100 = 4 × 10¹¹ horas, unos 45 millones de años.</li>
        <li>Comprueba el orden de magnitud: 4 años luz por casi 10 billones cada uno da unos 40 billones.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 40 billones de kilómetros, 4 × 10¹³ km</span>, y es la estrella más cercana.</p>
      <p class="nota"><strong>Error común:</strong> confundir el billón en español, 10¹², con el "billion" del inglés, que son mil millones, 10⁹. La diferencia es de mil veces.</p>`,
    vidaReal: `
      <p>Lo que pasa muy lejos tiene que ver contigo:</p>
      <ul>
        <li>Apagar las luces innecesarias de noche ayuda a que se vea mejor el cielo.</li>
        <li>Durante siglos, los navegantes se orientaron con los puntos de luz del cielo nocturno.</li>
        <li>El hierro de tu sangre y el calcio de tus huesos se formaron hace miles de millones de años, dentro de estrellas.</li>
        <li>Los telescopios espaciales, como el James Webb, ven objetos tan lejanos que su luz salió hace miles de millones de años.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>La galaxia de Andrómeda está a unos 2.5 millones de años luz. ¿Hace cuántos años salió la luz que vemos hoy de ella?</p>', respuesta: 2.5e6, tolerancia: 1,
        pista: '<p>Un año luz es lo que la luz recorre en un año.</p>',
        solucion: '<p>Hace <strong>2 500 000 años</strong>, unos 2.5 millones. La vemos como era entonces.</p>' },
      { tipo: 'numero', enunciado: '<p>Si un año luz son 9.5 billones de km, ¿cuántos billones de km son 4.2 años luz?</p>', respuesta: 4.2 * 9.5, tolerancia: 0.1,
        pista: '<p>Multiplica los años luz por 9.5.</p>',
        solucion: '<p>4.2 × 9.5 = <strong>39.9 billones de km</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas estrellas tiene la superficie más caliente?</p>',
        opciones: ['Una estrella roja', 'Una estrella amarilla', 'Una estrella azul'], correcta: 2,
        pista: '<p>Revisa la tabla de colores.</p>',
        solucion: '<p><strong>La azul</strong>, con más de 10 000 °C. Las rojas son las más frías.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿De dónde viene la energía de una estrella?</p>',
        opciones: ['De la fusión de hidrógeno en helio en su centro', 'De un fuego como el de una fogata', 'De la luz que recibe de otras estrellas'], correcta: 0,
        pista: '<p>Pasa en el centro, a millones de grados.</p>',
        solucion: '<p>De la <strong>fusión nuclear</strong>: los núcleos de hidrógeno se unen y forman helio. No es fuego, porque en el espacio no hay oxígeno para quemar nada.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es la Vía Láctea?</p>',
        opciones: ['La estrella más cercana al Sol', 'La galaxia donde está el Sol', 'Una nube de la atmósfera'], correcta: 1,
        pista: '<p>Es la franja blanquecina que se ve de noche lejos de la ciudad.</p>',
        solucion: '<p>Es <strong>nuestra galaxia</strong>, con cientos de miles de millones de estrellas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la gran explosión con que terminan las estrellas mucho más grandes que el Sol?</p>', respuestas: ['supernova', 'una supernova', 'la supernova'],
        pista: '<p>Lanza al espacio el carbono y el hierro que fabricó la estrella.</p>',
        solucion: '<p>Una <strong>supernova</strong>.</p>' },
    ],
    fuentes: [
      OSA('18-1-a-stellar-census', 'A Stellar Census'),
      OSA('22-1-evolution-from-the-main-sequence-to-red-giants', 'Evolution from the Main Sequence to Red Giants'),
      OSA('22-5-the-evolution-of-more-massive-stars', 'The Evolution of More Massive Stars'),
      OSA('25-1-the-architecture-of-the-galaxy', 'The Architecture of the Galaxy'),
      SP('galaxy', '¿Qué es una galaxia?'),
      SP('light-year', '¿Qué es un año luz?'),
      WIKI('Estrella', 'Estrella'),
      WIKI('Vía_Láctea', 'Vía Láctea'),
      WIKI('Año_luz', 'Año luz'),
    ],
  });

  // ------------------------------------------------------------------
  L('Origen del universo', {
    objetivo: 'Explicar qué dice la teoría del <span lang="en">Big Bang</span>, qué pruebas la sostienen y por qué mirar lejos es mirar al pasado.',
    explicacion: `
      <p>Cuando miras la Luna, la ves como era hace poco más de un segundo, porque su luz tarda ese tiempo en llegar. Al Sol lo ves como era hace unos 8 minutos, y a Andrómeda, como era hace 2.5 millones de años. Mirar lejos es mirar al pasado. Con telescopios muy potentes, los astrónomos ven galaxias como eran hace más de 13 000 millones de años. ¿Qué había antes?</p>
      <h3>El universo se estira</h3>
      <p>Hace unos cien años, el astrónomo Edwin Hubble descubrió algo sorprendente: casi todas las galaxias se alejan de nosotros, y mientras más lejos están, más rápido se alejan. No es que nosotros seamos el centro. Lo que pasa es que el espacio mismo se está estirando. A esto se le llama <strong>expansión del universo</strong>.</p>
      <p>Imagina un pan de pasas mientras se hornea. La masa se esponja, y cada pasa se aleja de todas las demás, sin que ninguna sea el centro. Una pasa lejana se aleja más rápido que una cercana, porque entre ellas hay más masa que crece. Las pasas son las galaxias, y la masa es el espacio.</p>
      <h3>El <span lang="en">Big Bang</span></h3>
      <p>Si el universo se está expandiendo, antes era más pequeño. Si regresas la película, todo estaba cada vez más junto, más denso y más caliente. La teoría del <strong><span lang="en">Big Bang</span></strong>, que en inglés quiere decir "gran explosión", explica que el universo empezó hace unos 13 800 millones de años en un estado muy denso y caliente, y que desde entonces se expande y se enfría. Al enfriarse se formaron, poco a poco, los átomos, después las estrellas y las galaxias y, mucho más tarde, el Sol y la Tierra, hace unos 4 600 millones de años.</p>
      <h3>Las pruebas</h3>
      <ul>
        <li>Las galaxias se alejan unas de otras, como predice la expansión.</li>
        <li>Todo el cielo tiene un brillo muy débil de microondas, una luz invisible como la del horno de microondas, que llega por igual de todas direcciones. Es la <strong>radiación de fondo</strong>: la luz que quedó del universo joven y caliente, estirada por la expansión. Se descubrió por accidente en 1965, como un ruido en una antena.</li>
        <li>El universo está hecho casi todo de hidrógeno y helio, justo en las cantidades que la teoría predice para sus primeros minutos.</li>
      </ul>
      <p>Todavía hay preguntas abiertas, como de qué está hecha la materia oscura o qué pasó en el primerísimo instante. Así trabaja la ciencia: una teoría se acepta porque explica las pruebas, y se sigue poniendo a prueba con cada nueva observación.</p>
      <p class="nota"><strong>Trampa común:</strong> imaginar el <span lang="en">Big Bang</span> como una bomba que explotó en un punto del espacio vacío. No había un espacio afuera: fue el espacio mismo el que empezó a expandirse, en todas partes a la vez. Por eso el universo no tiene un centro.</p>`,
    ejemplo: `
      <p>Imagina toda la historia del universo, 13 800 millones de años, comprimida en un solo año de calendario, del 1 de enero al 31 de diciembre. ¿En qué fecha se formó la Tierra, hace 4 600 millones de años?</p>
      <ol class="pasos-ej">
        <li>Calcula qué parte de la historia ha pasado desde que se formó la Tierra: 4 600 ÷ 13 800 ≈ 0.33, un tercio.</li>
        <li>Pásalo a días de calendario: un tercio de 365 son unos 122 días antes del final del año.</li>
        <li>Resta desde el 31 de diciembre: 365 − 122 = día 243 del año, que cae a finales de agosto.</li>
        <li>Comprueba: de finales de agosto al 31 de diciembre quedan unos cuatro meses, la tercera parte del año.</li>
      </ol>
      <p>Resultado: <span class="resultado">a finales de agosto</span>. En ese calendario, toda la historia humana cabe en los últimos minutos del 31 de diciembre.</p>
      <p class="nota"><strong>Error común:</strong> contar los 122 días desde el 1 de enero. Los 4 600 millones de años son "hace", así que se cuentan hacia atrás desde el final.</p>`,
    vidaReal: `
      <p>La historia del universo también es tu historia:</p>
      <ul>
        <li>El hidrógeno del agua que bebes se formó en los primeros minutos del universo.</li>
        <li>Los telescopios espaciales funcionan como máquinas del tiempo, porque reciben luz que salió hace miles de millones de años.</li>
        <li>Una pequeña parte del ruido que se veía en las televisiones antiguas sin señal venía del universo joven.</li>
        <li>Entender cómo trabaja la ciencia te ayuda a distinguir una idea con pruebas de una opinión sin ellas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>El universo tiene unos 13 800 millones de años, y la Tierra unos 4 600 millones. ¿Qué porcentaje de la edad del universo tiene la Tierra? Redondea a un decimal.</p>', respuesta: 4600 / 13800 * 100, tolerancia: 0.1,
        pista: '<p>Divide la edad de la Tierra entre la del universo y multiplica por 100.</p>',
        solucion: '<p>4 600 ÷ 13 800 × 100 ≈ <strong>33.3%</strong>, una tercera parte.</p>' },
      { tipo: 'numero', enunciado: '<p>La Luna está a unos 384 400 km, y la luz viaja a 300 000 km/s. ¿Cuántos segundos tarda su luz en llegarnos? Redondea a dos decimales.</p>', respuesta: 384400 / 300000, tolerancia: 0.01,
        pista: '<p>Tiempo = distancia ÷ rapidez.</p>',
        solucion: '<p>384 400 ÷ 300 000 ≈ <strong>1.28 segundos</strong>. Ves la Luna como era hace poco más de un segundo.</p>' },
      { tipo: 'opciones', enunciado: '<p>En la comparación del pan de pasas, ¿qué representan las pasas?</p>',
        opciones: ['Las estrellas', 'Las galaxias', 'Los planetas'], correcta: 1,
        pista: '<p>Son lo que se aleja entre sí mientras el espacio crece.</p>',
        solucion: '<p><strong>Las galaxias</strong>. La masa que se esponja es el espacio.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas es una prueba del <span lang="en">Big Bang</span>?</p>',
        opciones: ['La radiación de fondo que llega de todas direcciones', 'Que la Tierra gira sobre su eje', 'Que hay eclipses de Sol'], correcta: 0,
        pista: '<p>Es la luz que quedó del universo joven.</p>',
        solucion: '<p>La <strong>radiación de fondo</strong>. Las otras dos son hechos ciertos, pero no dicen nada sobre el origen del universo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Dónde ocurrió el <span lang="en">Big Bang</span>?</p>',
        opciones: ['En el centro de la Vía Láctea', 'En un punto del espacio vacío que hoy se puede señalar', 'En todas partes a la vez, porque fue el espacio mismo el que empezó a expandirse'], correcta: 2,
        pista: '<p>No había un espacio afuera.</p>',
        solucion: '<p><strong>En todas partes a la vez</strong>. Por eso el universo no tiene un centro.</p>' },
      { tipo: 'numero', enunciado: '<p>Si los 13 800 millones de años del universo se comprimen en un año de 365 días, ¿cuántos millones de años representa cada día? Redondea a un decimal.</p>', respuesta: 13800 / 365, tolerancia: 0.1,
        pista: '<p>Divide los millones de años entre los días del año.</p>',
        solucion: '<p>13 800 ÷ 365 ≈ <strong>37.8 millones de años</strong> por cada día del calendario.</p>' },
    ],
    fuentes: [
      OSA('29-1-the-age-of-the-universe', 'The Age of the Universe'),
      OSA('29-2-a-model-of-the-universe', 'A Model of the Universe'),
      OSA('29-4-the-cosmic-microwave-background', 'The Cosmic Microwave Background'),
      NASA('universo', 'Universo'),
      SP('big-bang', '¿Qué es el <span lang="en">Big Bang</span>?'),
      WIKI('Teoría_del_Big_Bang', 'Teoría del <span lang="en">Big Bang</span>'),
      WIKI('Radiación_de_fondo_de_microondas', 'Radiación de fondo de microondas'),
    ],
  });
})();
