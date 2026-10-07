// Física · Unidad 4: Trabajo y energía.
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
  const caja = (x0, y0, x1, y1) => ({ tipo: 'poligono', puntos: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], relleno: true });
  const diagrama = (x, y, figuras, descripcion) => G({ x, y, figuras, descripcion, proporcional: true, ejes: false });

  const OSC = (pagina, nombre) => ({ nombre: `OpenStax, College Physics 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/college-physics-2e/pages/${pagina}` });
  const OS = (pagina, nombre) => ({ nombre: `OpenStax, Physics: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/physics/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = { nombre: 'Khan Academy en español: Trabajo y energía', url: 'https://es.khanacademy.org/science/physics/work-and-energy' };
  const PHET_PISTA = { nombre: 'PhET, Universidad de Colorado: Energía en la pista de patinaje', url: 'https://phet.colorado.edu/es/simulations/energy-skate-park-basics' };

  // ------------------------------------------------------------------
  const EMPUJE = diagrama([-1, 6.4], [-1.6, 2], [
    { tipo: 'linea', desde: [-1, -0.6], hasta: [6.4, -0.6] },
    caja(0, -0.6, 1.2, 0.6), txt(0.6, -0.1, 'caja'),
    ...flecha([1.2, 0], [2.8, 0]), txt(2, 0.4, 'fuerza: 20 N'),
    { tipo: 'linea', desde: [0.6, -1.1], hasta: [5.6, -1.1], punteada: true },
    ...flecha([5.2, -1.1], [5.8, -1.1]), txt(3.1, -1.5, 'recorrido: 5 m'),
  ], 'Una caja sobre el piso. Una flecha de fuerza de 20 N la empuja hacia la derecha. Debajo, una línea punteada que termina en flecha muestra que la caja recorre 5 m hacia la derecha, en la misma dirección que la fuerza.');

  L('Trabajo mecánico', {
    objetivo: 'Calcular el trabajo que hace una fuerza al mover un objeto y reconocer cuándo una fuerza no hace trabajo.',
    explicacion: `
      <p>Cargas tu mochila mientras subes tres pisos por la escalera. Después la sostienes quieta un buen rato mientras esperas a alguien. Las dos cosas te cansan, pero en física solo una cuenta como "trabajo". Veamos por qué.</p>
      <h3>¿Qué es el trabajo en física?</h3>
      <p>En la vida diaria, trabajo es cualquier esfuerzo. En física es algo más preciso: una fuerza hace <strong>trabajo</strong> cuando mueve un objeto en la dirección en que empuja o jala. Si empujas una caja con 20 N y la caja avanza 5 m en esa misma dirección, tu fuerza hizo trabajo.</p>
      ${EMPUJE}
      <p>Se calcula multiplicando la fuerza por la distancia que avanzó el objeto:</p>
      <p>W = F·d</p>
      <p>Se lee "el trabajo es la fuerza por la distancia". W es <strong>el trabajo</strong> (de la palabra inglesa <span lang="en">work</span>), F es <strong>con cuánta fuerza empujas</strong>, en newtons, y d es <strong>cuántos metros avanzó el objeto</strong> en la dirección de esa fuerza. En la caja, W = 20 × 5 = 100.</p>
      <p>Tiene sentido multiplicar: empujar el doble de fuerte o el doble de lejos cuesta el doble.</p>
      <h3>¿En qué se mide?</h3>
      <p>Como es newtons por metros, su unidad es el N·m, que tiene nombre propio: el <strong>joule</strong> (J), en honor al científico inglés James Joule. Un joule es más o menos el trabajo de subir una manzana chica, de 1 N, a un metro de altura. El trabajo de la caja fue de 100 J.</p>
      <h3>¿Cuándo una fuerza no hace trabajo?</h3>
      <p>Cuando sostienes la mochila quieta, haces fuerza, pero la mochila no se mueve: d = 0, así que W = 0. Te cansas porque tus músculos se contraen y relajan sin parar por dentro, pero sobre la mochila no hay trabajo.</p>
      <p>Tampoco hay trabajo cuando la fuerza es perpendicular al movimiento. Si caminas en un piso plano cargando la mochila, tu mano la empuja hacia arriba, pero la mochila avanza de lado. Tu fuerza no la empuja ni un centímetro en la dirección en que avanza, así que no hace trabajo sobre ella.</p>
      <h3>Subir algo</h3>
      <p>Para subir algo despacio y parejo, necesitas empujarlo hacia arriba con una fuerza igual a su peso, P = m·g, como viste en la Unidad 3. Por eso el trabajo de subir algo es su peso por la altura.</p>
      <p>Una fuerza que va en contra del movimiento, como la fricción, hace un trabajo negativo: le quita al objeto en lugar de darle. Si la fricción frena una caja con 10 N mientras se desliza 3 m, su trabajo es −30 J.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que cansarse es lo mismo que hacer trabajo. Sostener algo pesado sin moverlo cansa, pero el trabajo sobre el objeto es 0, porque no avanzó.</p>`,
    ejemplo: `
      <p>Subes una bolsa del súper de 5 kg por la escalera hasta un piso que está 3 m más arriba. ¿Cuánto trabajo haces sobre la bolsa? Usa g = 9.8 m/s².</p>
      <ol class="pasos-ej">
        <li>Primero encuentra la fuerza. Para subir la bolsa parejo, la empujas hacia arriba con una fuerza igual a su peso: P = 5 × 9.8 = 49 N.</li>
        <li>La distancia que cuenta es la que avanza en la dirección de tu fuerza, hacia arriba: 3 m. Lo que caminas de lado en la escalera no cuenta.</li>
        <li>Multiplica: W = 49 × 3 = 147 J.</li>
        <li>Comprueba con las unidades: newtons por metros dan N·m, que es lo mismo que joules.</li>
      </ol>
      <p>Resultado: <span class="resultado">147 J</span>.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar la masa por la altura, 5 × 3 = 15. La fórmula pide la fuerza en newtons, así que primero hay que calcular el peso.</p>`,
    vidaReal: `
      <p>Medir el esfuerzo de mover cosas ayuda a planear y a cuidarte:</p>
      <ul>
        <li>Al cambiarte de casa, subir las cajas a un piso alto cuesta más que llevarlas por la planta baja.</li>
        <li>Los elevadores y las grúas se diseñan según cuánto peso pueden subir y a qué altura.</li>
        <li>Subir una cuesta en bici cansa mucho porque haces trabajo contra tu peso; bajarla casi no cansa porque el peso trabaja a tu favor.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Empujas un carrito con una fuerza de 20 N y avanza 15 m en esa misma dirección. ¿Cuánto trabajo haces, en J?</p>', respuesta: 20 * 15,
        pista: '<p>Usa W = F·d.</p>',
        solucion: '<p>W = 20 × 15 = <strong>300 J</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Subes una caja de 10 kg a una repisa que está 2 m más arriba. ¿Cuánto trabajo haces, en J? Usa g = 9.8 m/s².</p>', respuesta: 10 * 9.8 * 2,
        pista: '<p>Calcula primero el peso de la caja, que es la fuerza con la que debes empujarla hacia arriba.</p>',
        solucion: '<p>El peso es 10 × 9.8 = 98 N, y el trabajo es 98 × 2 = <strong>196 J</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Sostienes una sandía de 5 kg sin moverla durante un minuto. ¿Cuánto trabajo haces sobre ella, en J?</p>', respuesta: 0,
        pista: '<p>¿Cuántos metros avanzó la sandía?</p>',
        solucion: '<p>La sandía no se movió, así que d = 0 y el trabajo es <strong>0 J</strong>, aunque te canses.</p>' },
      { tipo: 'opciones', enunciado: '<p>Caminas 50 m por un piso plano cargando una mochila. ¿Cuánto trabajo hace sobre la mochila la fuerza hacia arriba de tu mano?</p>',
        opciones: ['Mucho, porque caminaste 50 m', 'Cero, porque la fuerza es hacia arriba y la mochila avanza de lado', 'Lo mismo que si la subieras 50 m', 'Depende de qué tan rápido camines'], correcta: 1,
        pista: '<p>¿La mochila sube o baja mientras caminas?</p>',
        solucion: '<p>Tu mano empuja hacia arriba, pero la mochila avanza de lado: la fuerza es perpendicular al movimiento, así que su trabajo es <strong>cero</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una fuerza hace 500 J de trabajo al mover un mueble 25 m. ¿De cuántos newtons es la fuerza?</p>', respuesta: 500 / 25,
        pista: '<p>¿Qué número multiplicado por 25 da 500?</p>',
        solucion: '<p>F = W ÷ d = 500 ÷ 25 = <strong>20 N</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una caja se desliza 4 m por el piso y la fricción la frena con 30 N. ¿Cuánto trabajo hace la fricción, en J?</p>', respuesta: -30 * 4,
        pista: '<p>La fricción va en contra del movimiento, así que su trabajo es negativo.</p>',
        solucion: '<p>W = −30 × 4 = <strong>−120 J</strong>. El signo negativo indica que la fricción le quita energía a la caja en lugar de dársela.</p>' },
    ],
    fuentes: [OSC('7-1-work-the-scientific-definition', 'Work: The Scientific Definition'), OS('9-1-work-power-and-the-work-energy-theorem', 'Work, Power, and the Work–Energy Theorem'), WIKI('Trabajo_(física)', 'Trabajo (física)'), KHAN],
  });

  // ------------------------------------------------------------------
  L('Energía cinética y potencial', {
    objetivo: 'Calcular la energía de un objeto por su movimiento (cinética) y por su altura (potencial).',
    explicacion: `
      <p>Un balón que viene volando puede romper una ventana. Una maceta en lo alto de un balcón puede romperse, o romper algo, si cae. Las dos tienen algo guardado: la capacidad de mover o empujar cosas. En física, a esa capacidad de hacer trabajo se le llama <strong>energía</strong>, y se mide en joules, igual que el trabajo.</p>
      <h3>Energía por moverse</h3>
      <p>Todo lo que se mueve tiene energía, y mientras más rápido va, más tiene. A la energía que tiene un objeto por moverse se le llama <strong>energía cinética</strong> ("cinética" viene del griego y quiere decir "movimiento"). Se calcula así:</p>
      <p>Ec = ½·m·v²</p>
      <p>Se lee "la energía cinética es un medio de la masa por la rapidez al cuadrado". m es <strong>qué tanta masa tiene</strong>, en kilogramos, y v es <strong>qué tan rápido va</strong>, en m/s.</p>
      <p>¿De dónde sale? Es el trabajo que hace falta para acelerar el objeto desde el reposo hasta la rapidez v. Con las fórmulas de las unidades 2 y 3: la fuerza es F = m·a, y la distancia que recorre al acelerar es d = ½·a·t². Al multiplicarlas da m·a·½·a·t² = ½·m·(a·t)², y a·t es justo la rapidez final v.</p>
      <h3>¿Por qué la rapidez va al cuadrado?</h3>
      <p>Porque al doble de rapidez, la energía no se duplica: se multiplica por 4, ya que 2² = 4. Al triple de rapidez, por 9. Un coche a 100 km/h tiene cuatro veces la energía que a 50 km/h. Por eso un choque a alta velocidad es mucho más grave, y por eso un coche rápido necesita mucho más espacio para frenar.</p>
      <h3>Energía por estar arriba</h3>
      <p>La maceta del balcón está quieta, pero si cae ganará rapidez. Mientras está arriba, tiene energía guardada por su altura. A esa energía se le llama <strong>energía potencial</strong>, porque es energía "en potencia": está lista para convertirse en movimiento. Se calcula así:</p>
      <p>Ep = m·g·h</p>
      <p>Se lee "la energía potencial es la masa por g por la altura". m·g es el peso, en newtons, y h es <strong>a cuántos metros de altura está</strong>. Tiene sentido: es justo el trabajo que hiciste para subirla, peso por altura, como en la lección anterior. Ese trabajo no se perdió; quedó guardado en la maceta.</p>
      <p>La altura se mide desde un nivel que tú eliges, por ejemplo el suelo. Lo importante es usar siempre el mismo.</p>
      <p>Hay otras formas de guardar energía. Un resorte apretado o una liga estirada también tienen energía potencial: al soltarlos, empujan.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que la energía cinética crece igual que la rapidez. Si vas al doble de rápido, tienes cuatro veces la energía, no el doble.</p>`,
    ejemplo: `
      <p>Una persona en bicicleta, con 70 kg entre las dos, va a 5 m/s. ¿Cuánta energía cinética tiene? ¿Y si va al doble de rápido?</p>
      <ol class="pasos-ej">
        <li>Primero eleva la rapidez al cuadrado, porque en la fórmula solo la rapidez va al cuadrado: 5² = 25.</li>
        <li>Multiplica por la masa y por un medio: Ec = ½ × 70 × 25 = 35 × 25 = 875 J.</li>
        <li>Ahora a 10 m/s: 10² = 100, y Ec = ½ × 70 × 100 = 3 500 J.</li>
        <li>Comprueba la regla del cuadrado: 3 500 ÷ 875 = 4. Al doble de rapidez, cuatro veces la energía.</li>
      </ol>
      <p>Resultado: <span class="resultado">875 J a 5 m/s y 3 500 J a 10 m/s</span>.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar ½ × 70 × 5 sin elevar al cuadrado. Daría 175 J, cinco veces menos que la respuesta correcta.</p>`,
    vidaReal: `
      <p>La energía del movimiento y de la altura está en cosas muy cotidianas:</p>
      <ul>
        <li>Bajar un poco la velocidad en la carretera reduce mucho el daño en un accidente, porque la energía crece con el cuadrado de la rapidez.</li>
        <li>Las presas guardan agua en lo alto para que, al caer, mueva turbinas y genere electricidad.</li>
        <li>Al tensar una resortera o una liga guardas energía que luego lanza la piedra.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una pelota de 0.5 kg vuela a 4 m/s. ¿Cuál es su energía cinética, en J?</p>', respuesta: 0.5 * 0.5 * 4 ** 2,
        pista: '<p>Usa Ec = ½·m·v². Empieza por elevar la rapidez al cuadrado.</p>',
        solucion: '<p>4² = 16, y Ec = ½ × 0.5 × 16 = <strong>4 J</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una maceta de 2 kg está en un balcón a 3 m de altura sobre el suelo. ¿Cuál es su energía potencial, en J? Usa g = 9.8 m/s².</p>', respuesta: 2 * 9.8 * 3,
        pista: '<p>Usa Ep = m·g·h.</p>',
        solucion: '<p>Ep = 2 × 9.8 × 3 = <strong>58.8 J</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si la rapidez de un objeto se triplica, ¿por cuánto se multiplica su energía cinética?</p>', respuesta: 3 ** 2,
        pista: '<p>La rapidez va al cuadrado en la fórmula.</p>',
        solucion: '<p>3² = 9, así que la energía cinética se multiplica por <strong>9</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un coche de 1 000 kg va a 20 m/s. ¿Cuál es su energía cinética, en J?</p>', respuesta: 0.5 * 1000 * 20 ** 2,
        pista: '<p>20² = 400. Luego multiplica por la masa y por un medio.</p>',
        solucion: '<p>Ec = ½ × 1 000 × 400 = <strong>200 000 J</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál tiene más energía cinética?</p>',
        opciones: ['Un camión estacionado', 'Una bicicleta en movimiento', 'Una casa', 'Una montaña'], correcta: 1,
        pista: '<p>La energía cinética es la energía del movimiento.</p>',
        solucion: '<p>Solo la <strong>bicicleta</strong> se mueve. Los demás están quietos, así que su energía cinética es 0, aunque tengan mucha masa.</p>' },
      { tipo: 'numero', enunciado: '<p>Un objeto de 2 kg tiene 98 J de energía potencial. ¿A qué altura está, en m? Usa g = 9.8 m/s².</p>', respuesta: 98 / (2 * 9.8),
        pista: '<p>Calcula su peso m·g y luego busca qué altura, multiplicada por el peso, da 98.</p>',
        solucion: '<p>El peso es 2 × 9.8 = 19.6 N, y h = 98 ÷ 19.6 = <strong>5 m</strong>.</p>' },
    ],
    fuentes: [OSC('7-2-kinetic-energy-and-the-work-energy-theorem', 'Kinetic Energy and the Work-Energy Theorem'), OSC('7-3-gravitational-potential-energy', 'Gravitational Potential Energy'), WIKI('Energía_cinética', 'Energía cinética'), WIKI('Energía_potencial', 'Energía potencial')],
  });

  // ------------------------------------------------------------------
  const RUSA = G({ x: [0, 20], y: [0, 28], funciones: [{ f: (x) => (x <= 10 ? 10 + 10 * Math.cos(Math.PI * x / 10) : 6 - 6 * Math.cos(Math.PI * (x - 10) / 10)), etiqueta: 'vía de la montaña rusa' }],
    puntos: [{ x: 0, y: 20, etiqueta: 'A' }, { x: 10, y: 0, etiqueta: 'B' }, { x: 20, y: 12, etiqueta: 'C' }],
    descripcion: 'Perfil de una montaña rusa. El eje horizontal es la distancia en metros y el vertical la altura en metros. El punto A está en lo alto, a 20 m. La vía baja hasta el punto B, a 0 m, y vuelve a subir hasta el punto C, a 12 m.' });

  L('Conservación de la energía', {
    objetivo: 'Usar la conservación de la energía para seguir cómo la energía potencial se convierte en cinética y calcular rapideces sin conocer los tiempos.',
    explicacion: `
      <p>En una montaña rusa, el carrito sube despacio hasta lo más alto y luego se suelta. Baja cada vez más rápido, vuelve a subir otra loma más chica y así sigue, sin motor. ¿De dónde saca la rapidez? De su altura.</p>
      ${RUSA}
      <h3>La energía cambia de forma</h3>
      <p>En el punto A, el carrito está en lo más alto y quieto por un instante: tiene mucha energía potencial y nada de cinética. Al bajar, pierde altura y gana rapidez: la energía potencial se va convirtiendo en cinética. En B, abajo de todo, toda es cinética. Al subir hacia C ocurre lo contrario.</p>
      <p>A la suma de las dos se le llama <strong>energía mecánica</strong>. Mira qué pasa con un carrito de 100 kg, usando g = 9.8 m/s²:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Punto</th><th>Altura</th><th>Ep (J)</th><th>Ec (J)</th><th>Suma (J)</th></tr>
        <tr><th>A</th><td>20 m</td><td>19 600</td><td>0</td><td>19 600</td></tr>
        <tr><th>B</th><td>0 m</td><td>0</td><td>19 600</td><td>19 600</td></tr>
        <tr><th>C</th><td>12 m</td><td>11 760</td><td>7 840</td><td>19 600</td></tr>
      </table></div>
      <p>Fíjate que la suma nunca cambia. La energía no aparece ni desaparece: solo pasa de una forma a otra. A esta regla se le llama <strong>principio de conservación de la energía</strong>, y es una de las leyes más importantes de toda la ciencia. Es como el dinero que pasas de tu cartera a tu bolsillo: cambia de lugar, pero la cantidad total es la misma.</p>
      <h3>¿Qué tan rápido llega abajo?</h3>
      <p>Si algo baja desde una altura h sin fricción, toda su energía potencial se vuelve cinética al llegar abajo:</p>
      <p>m·g·h = ½·m·v²</p>
      <p>La masa aparece en los dos lados, así que se cancela. Despejando la rapidez queda:</p>
      <p>v = √(2·g·h)</p>
      <p>Se lee "la rapidez es la raíz cuadrada de dos por g por la altura". Fíjate que no depende de la masa: un carrito lleno y uno vacío llegan abajo igual de rápido, igual que en la caída libre de la Unidad 2. En el punto B, v = √(2 × 9.8 × 20) = √392 ≈ 19.8 m/s. Con las fórmulas de caída libre sale lo mismo, pero aquí no necesitas saber cuánto tardó, ni importa la forma de la vía.</p>
      <h3>¿Y la fricción?</h3>
      <p>En la vida real, el carrito roza con la vía y con el aire, y cada loma alcanza menos altura que la anterior. ¿Se perdió energía? No: la fricción la convierte en calor y en sonido. Por eso se calientan las ruedas y los frenos. La energía total sigue siendo la misma; solo una parte ya no está en forma de movimiento o de altura.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que lo más pesado llega más rápido abajo. Sin fricción, la masa se cancela: la rapidez solo depende de la altura de la que baja.</p>`,
    ejemplo: `
      <p>Una niña se suelta desde lo alto de una resbaladilla de 5 m de altura. Si no hubiera fricción, ¿con qué rapidez llegaría abajo? Usa g = 9.8 m/s².</p>
      <ol class="pasos-ej">
        <li>Primero piensa en la energía: arriba la niña está quieta y alta, así que solo tiene energía potencial. Abajo, toda esa energía se vuelve cinética.</li>
        <li>Como la masa se cancela, usa directo v = √(2·g·h) = √(2 × 9.8 × 5) = √98.</li>
        <li>La raíz de 98 es un poco menos que la de 100, que es 10: √98 ≈ 9.9 m/s.</li>
        <li>Comprueba con caída libre: caer 5 m tarda t = √(5 ÷ 4.9) ≈ 1.01 s, y en ese tiempo la velocidad llega a 9.8 × 1.01 ≈ 9.9 m/s. Coincide.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 9.9 m/s</span>, alrededor de 36 km/h. En la vida real llega más lenta, porque la fricción convierte parte de la energía en calor.</p>
      <p class="nota"><strong>Error común:</strong> olvidar la raíz cuadrada y responder 98. Ese número es v², no v.</p>`,
    vidaReal: `
      <p>La energía que cambia de forma sin perderse explica muchas cosas:</p>
      <ul>
        <li>En un columpio, subes y bajas convirtiendo altura en rapidez y rapidez en altura.</li>
        <li>Al frenar, los frenos de un coche se calientan porque convierten el movimiento en calor.</li>
        <li>Las presas aprovechan la caída del agua para producir electricidad.</li>
        <li>Una pelota que rebota sube cada vez menos, porque en cada golpe parte de la energía se vuelve sonido y calor.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un carrito tiene 1 000 J de energía potencial en lo alto de una montaña rusa y está quieto. Sin fricción, ¿cuánta energía cinética tiene al llegar al punto más bajo, en J?</p>', respuesta: 1000,
        pista: '<p>En el punto más bajo, toda la energía potencial se volvió cinética.</p>',
        solucion: '<p>La energía mecánica se conserva, así que toda la potencial se vuelve cinética: <strong>1 000 J</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con el mismo carrito (1 000 J en total), en un punto intermedio le quedan 400 J de energía potencial. ¿Cuánta energía cinética tiene ahí, en J?</p>', respuesta: 1000 - 400,
        pista: '<p>La suma de las dos energías siempre es 1 000 J.</p>',
        solucion: '<p>Ec = 1 000 − 400 = <strong>600 J</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un objeto se suelta desde 10 m de altura. Sin fricción, ¿con qué rapidez llega al suelo, en m/s? Usa g = 9.8 m/s².</p>', respuesta: Math.sqrt(2 * 9.8 * 10),
        pista: '<p>Usa v = √(2·g·h).</p>',
        solucion: '<p>2 × 9.8 × 10 = 196, y √196 = <strong>14 m/s</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Lanzas una pelota hacia arriba a 14 m/s. ¿Qué altura alcanza, en m? Usa g = 9.8 m/s² e ignora el aire.</p>', respuesta: 14 ** 2 / (2 * 9.8),
        pista: '<p>Ahora la energía cinética se convierte en potencial: ½·m·v² = m·g·h. La masa se cancela.</p>',
        solucion: '<p>½·v² = g·h, así que h = 14² ÷ (2 × 9.8) = 196 ÷ 19.6 = <strong>10 m</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un carrito de montaña rusa con fricción no alcanza la misma altura de la que salió. ¿Qué pasó con la energía que le falta?</p>',
        opciones: ['Desapareció.', 'Se convirtió en calor y sonido.', 'Se convirtió en masa.', 'Regresó al punto de partida.'], correcta: 1,
        pista: '<p>La energía no aparece ni desaparece. ¿Qué se calienta cuando hay fricción?</p>',
        solucion: '<p>La fricción convirtió esa energía en <strong>calor y sonido</strong>. La energía total se conserva, aunque ya no esté en forma de movimiento o altura.</p>' },
      { tipo: 'opciones', enunciado: '<p>Dos carritos, uno con el doble de masa que el otro, bajan sin fricción desde la misma altura. ¿Cuál llega más rápido abajo?</p>',
        opciones: ['El de más masa', 'El de menos masa', 'Llegan igual de rápido', 'No se puede saber'], correcta: 2,
        pista: '<p>En v = √(2·g·h), ¿aparece la masa?</p>',
        solucion: '<p>La masa se cancela, así que la rapidez solo depende de la altura: <strong>llegan igual de rápido</strong>.</p>' },
    ],
    fuentes: [OSC('7-6-conservation-of-energy', 'Conservation of Energy'), OS('9-2-mechanical-energy-and-conservation-of-energy', 'Mechanical Energy and Conservation of Energy'), PHET_PISTA, WIKI('Principio_de_conservación_de_la_energía', 'Principio de conservación de la energía')],
  });

  // ------------------------------------------------------------------
  L('Potencia', {
    objetivo: 'Calcular la potencia como el trabajo hecho en cada segundo y usar el kilowatt-hora para calcular el consumo de electricidad.',
    explicacion: `
      <p>Subes las escaleras de tu casa caminando con calma. Al día siguiente las subes corriendo. En los dos casos llevaste tu cuerpo a la misma altura, así que el trabajo fue el mismo. Pero corriendo terminas sin aire. La diferencia está en qué tan rápido hiciste ese trabajo.</p>
      <h3>¿Qué tan rápido se hace el trabajo?</h3>
      <p>Al trabajo que se hace en cada segundo se le llama <strong>potencia</strong>. Se calcula dividiendo el trabajo entre el tiempo que tomó:</p>
      <p>P = ${F('W', 't')}</p>
      <p>Se lee "la potencia es el trabajo entre el tiempo". W es <strong>cuánto trabajo se hizo</strong>, en joules, y t es <strong>cuánto tardó</strong>, en segundos. Dividir reparte el trabajo en partes iguales, una por cada segundo. Por eso, si haces el mismo trabajo en la mitad del tiempo, tu potencia es el doble.</p>
      <h3>¿En qué se mide?</h3>
      <p>Un joule por segundo se llama <strong>watt</strong> (W), en honor a James Watt, el inventor escocés que mejoró la máquina de vapor. No lo confundas con la W de trabajo: aquí es la unidad. Para potencias grandes se usa el kilowatt: 1 kW = 1 000 W.</p>
      <p>Seguro has visto watts en los aparatos de tu casa. Un foco LED usa unos 10 W, una licuadora unos 500 W y una plancha unos 1 000 W. Esos números dicen cuánta energía eléctrica usa el aparato en cada segundo.</p>
      <h3>¿Cuánta energía gasta un aparato?</h3>
      <p>Si conoces la potencia y el tiempo, puedes saber la energía, porque energía = potencia × tiempo. Un foco de 10 W encendido 1 s usa 10 J. Pero en una casa los joules dan números enormes, así que la compañía de luz usa una unidad más práctica: el <strong>kilowatt-hora</strong> (kWh). Es la energía que usa un aparato de 1 kW durante una hora.</p>
      <p>Para calcular kilowatts-hora, pasa la potencia a kilowatts y multiplícala por las horas de uso. Una plancha de 1 000 W, que es 1 kW, encendida 2 horas usa 1 × 2 = 2 kWh. Un foco de 10 W, que es 0.01 kW, encendido 5 horas usa 0.01 × 5 = 0.05 kWh. Tu recibo de luz cobra por cada kWh, así que con este cálculo puedes saber cuánto cuesta usar cada aparato.</p>
      <p>Aunque se llame "kilowatt-hora", no es una potencia: es una cantidad de energía. Un kWh equivale a 3 600 000 J, porque 1 000 W durante 3 600 s dan 1 000 × 3 600 joules.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que un aparato de más watts siempre gasta más. Importa también cuánto tiempo lo usas: una plancha de 1 000 W durante 10 minutos gasta menos que un refrigerador de 150 W encendido todo el día.</p>`,
    ejemplo: `
      <p>Una persona de 60 kg sube corriendo una escalera de 3 m de altura en 6 s. ¿Qué potencia desarrolla? ¿Y si la sube caminando en 12 s? Usa g = 9.8 m/s².</p>
      <ol class="pasos-ej">
        <li>Primero calcula el trabajo, que es el mismo en los dos casos: peso por altura. El peso es 60 × 9.8 = 588 N, y el trabajo es 588 × 3 = 1 764 J.</li>
        <li>Corriendo, reparte ese trabajo entre 6 s: P = 1 764 ÷ 6 = 294 W.</li>
        <li>Caminando, entre 12 s: P = 1 764 ÷ 12 = 147 W.</li>
        <li>Comprueba la relación: en el doble de tiempo, la potencia es la mitad, y 294 ÷ 2 = 147.</li>
      </ol>
      <p>Resultado: <span class="resultado">294 W corriendo y 147 W caminando</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que corriendo se hace más trabajo. El trabajo es el mismo; lo que cambia es la potencia.</p>`,
    vidaReal: `
      <p>Saber cuánta energía usan las cosas por segundo te sirve en casa y fuera de ella:</p>
      <ul>
        <li>Para entender tu recibo de luz y saber qué aparatos gastan más.</li>
        <li>Al comprar focos, para comparar cuánto consumen y elegir los que ahorran.</li>
        <li>Al comparar motores y herramientas por qué tan fuertes y rápidos trabajan.</li>
        <li>Para elegir un regulador o una extensión que aguante los aparatos que conectarás.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un motor hace 1 200 J de trabajo en 4 s. ¿Cuál es su potencia, en W?</p>', respuesta: 1200 / 4,
        pista: '<p>Divide el trabajo entre el tiempo.</p>',
        solucion: '<p>P = 1 200 ÷ 4 = <strong>300 W</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una licuadora de 500 W funciona durante 10 s. ¿Cuánta energía usa, en J?</p>', respuesta: 500 * 10,
        pista: '<p>Un watt es un joule cada segundo. Multiplica la potencia por el tiempo.</p>',
        solucion: '<p>Energía = 500 × 10 = <strong>5 000 J</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un foco de 100 W está encendido 10 horas. ¿Cuántos kWh usa?</p>', respuesta: 0.1 * 10,
        pista: '<p>Pasa primero los watts a kilowatts dividiendo entre 1 000.</p>',
        solucion: '<p>100 W son 0.1 kW, y 0.1 × 10 = <strong>1 kWh</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una plancha de 1 000 W se usa 1 hora al día durante 30 días. ¿Cuántos kWh usa en el mes?</p>', respuesta: 1 * 1 * 30,
        pista: '<p>1 000 W es 1 kW. Calcula cuántas horas se usa en total.</p>',
        solucion: '<p>Se usa 1 × 30 = 30 horas en el mes, y 1 kW × 30 h = <strong>30 kWh</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si cada kWh cuesta $2, ¿cuánto cuesta usar esa plancha durante el mes (30 kWh)?</p>', respuesta: 30 * 2,
        pista: '<p>Multiplica los kWh por el precio de cada uno.</p>',
        solucion: '<p>30 × 2 = <strong>$60</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Dos personas de la misma masa suben la misma escalera. Una tarda 10 s y la otra 20 s. ¿Qué es cierto?</p>',
        opciones: ['La más rápida hace más trabajo.', 'Hacen el mismo trabajo, pero la más rápida desarrolla más potencia.', 'Desarrollan la misma potencia.', 'La más lenta hace más trabajo.'], correcta: 1,
        pista: '<p>El trabajo depende del peso y la altura. La potencia depende también del tiempo.</p>',
        solucion: '<p>Suben el mismo peso a la misma altura, así que <strong>hacen el mismo trabajo</strong>. La que tarda la mitad del tiempo desarrolla <strong>el doble de potencia</strong>.</p>' },
    ],
    fuentes: [OSC('7-7-power', 'Power'), WIKI('Potencia_(física)', 'Potencia (física)'), WIKI('Kilovatio_hora', 'Kilovatio hora'), KHAN],
  });

  // ------------------------------------------------------------------
  const PALANCA = diagrama([-2.6, 5.4], [-2.4, 4.4], [
    { tipo: 'linea', desde: [-1.8, 0], hasta: [4.6, 0] },
    { tipo: 'poligono', puntos: [[0, 0], [-0.4, -0.9], [0.4, -0.9]], relleno: true }, txt(0, -1.5, 'apoyo'),
    caja(-1.5, 0, -0.5, 0.9), ...flecha([-1, 3], [-1, 1]), txt(-1, 3.5, 'piedra: 600 N'),
    ...flecha([4, 3], [4, 0.1]), txt(4, 3.5, 'tú: 150 N'),
    txt(-0.9, -0.5, '0.5 m'), txt(2, -0.5, '2 m'),
  ], 'Una barra recta apoyada sobre un punto de apoyo en forma de triángulo. A 0.5 m a la izquierda del apoyo hay una piedra, con una flecha hacia abajo de 600 N. A 2 m a la derecha del apoyo, una flecha hacia abajo de 150 N muestra dónde empujas tú.');

  L('Máquinas simples: palancas y poleas', {
    objetivo: 'Usar la ley de la palanca para calcular cuánta fuerza se necesita, y entender cómo ayudan las poleas, sin que ninguna máquina ahorre trabajo.',
    explicacion: `
      <p>Intenta levantar una piedra muy pesada con las manos: imposible. Ahora mete una barra larga debajo, apóyala en un tronco y empuja el otro extremo. La piedra sube. No te volviste más fuerte; la barra te ayudó.</p>
      <h3>¿Qué es una máquina simple?</h3>
      <p>Una <strong>máquina simple</strong> es un objeto sencillo que cambia el tamaño o la dirección de la fuerza que haces. La barra con el tronco es una <strong>palanca</strong>: una barra rígida que gira alrededor de un punto fijo, llamado punto de apoyo. El sube y baja, las tijeras, el destapador y la carretilla son palancas.</p>
      ${PALANCA}
      <h3>La ley de la palanca</h3>
      <p>En el dibujo, la piedra de 600 N está a 0.5 m del apoyo, y tú empujas a 2 m. Para equilibrarla basta con 150 N. La regla es que la fuerza por su distancia al apoyo debe ser igual en los dos lados:</p>
      <p>F₁·d₁ = F₂·d₂</p>
      <p>Se lee "la primera fuerza por su distancia al apoyo es igual a la segunda fuerza por su distancia". En el dibujo: 600 × 0.5 = 300, y 150 × 2 = 300. Mientras más lejos del apoyo empujes, menos fuerza necesitas. Por eso es más fácil abrir una puerta empujando lejos de las bisagras.</p>
      <h3>¿Por qué funciona? Nadie regala trabajo</h3>
      <p>Cuando la barra gira, tu extremo, que está 4 veces más lejos del apoyo, recorre 4 veces más camino que la piedra. Si empujas tu extremo 40 cm hacia abajo, la piedra sube solo 10 cm. Compara el trabajo: tú haces 150 × 0.4 = 60 J, y la piedra recibe 600 × 0.1 = 60 J. Es el mismo trabajo.</p>
      <p>Esa es la clave de todas las máquinas simples: no ahorran trabajo, pero lo reparten de otra forma. Usas menos fuerza a cambio de mover más distancia. Cuántas veces multiplica tu fuerza una máquina se llama ventaja mecánica; en la piedra es 600 ÷ 150 = 4.</p>
      <h3>¿Y las poleas?</h3>
      <p>Una <strong>polea</strong> es una rueda con una cuerda que pasa por su borde. Una polea fija, como la de un pozo, no reduce la fuerza, pero cambia su dirección: jalas hacia abajo para subir la cubeta, que es más cómodo.</p>
      <p>Una polea móvil, que sube junto con la carga, sí reduce la fuerza a la mitad. La carga cuelga de dos tramos de cuerda, y cada uno sostiene la mitad. Pero, de nuevo, nada es gratis: para subir la carga 1 m, tienes que jalar 2 m de cuerda.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que una máquina simple ahorra trabajo o energía. Reduce la fuerza, pero aumenta en la misma proporción la distancia, así que el trabajo es igual. En la vida real es un poco mayor, por la fricción.</p>`,
    ejemplo: `
      <p>Quieres sacar un clavo con un martillo. El clavo resiste con 1 200 N y está a 3 cm del punto de apoyo. Tu mano está a 30 cm del apoyo. ¿Con cuánta fuerza debes jalar?</p>
      <ol class="pasos-ej">
        <li>Primero reconoce la palanca: el martillo gira sobre el punto donde su cabeza toca la madera. El clavo está de un lado y tu mano del otro.</li>
        <li>Calcula el lado del clavo: fuerza por distancia, 1 200 × 3 = 3 600. No hace falta pasar a metros si usas centímetros en los dos lados.</li>
        <li>Ese producto debe ser igual del lado de tu mano: F × 30 = 3 600, así que F = 3 600 ÷ 30 = 120 N.</li>
        <li>Comprueba con la ventaja mecánica: tu mano está 10 veces más lejos que el clavo, así que necesitas 10 veces menos fuerza: 1 200 ÷ 10 = 120 N.</li>
      </ol>
      <p>Resultado: <span class="resultado">120 N</span>.</p>
      <p class="nota"><strong>Error común:</strong> mezclar metros en un lado y centímetros en el otro. Usa la misma unidad de distancia en los dos lados.</p>`,
    vidaReal: `
      <p>Usas máquinas simples todos los días, aunque no lo notes:</p>
      <ul>
        <li>Las tijeras, el cortaúñas, el destapador y las pinzas multiplican la fuerza de tu mano gracias a una barra que gira sobre un punto.</li>
        <li>En el sube y baja, una persona ligera puede equilibrar a una pesada si se sienta más lejos del centro.</li>
        <li>Las grúas y los pozos usan una rueda con una cuerda para subir cargas pesadas con menos esfuerzo o de forma más cómoda.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En un sube y baja, una niña que pesa 300 N se sienta a 2 m del centro. ¿A cuántos metros del centro debe sentarse un niño que pesa 400 N para equilibrarla?</p>', respuesta: 300 * 2 / 400,
        pista: '<p>Usa F₁·d₁ = F₂·d₂: calcula primero 300 × 2.</p>',
        solucion: '<p>300 × 2 = 600, y 400 × d = 600, así que d = 600 ÷ 400 = <strong>1.5 m</strong>. Quien pesa más se sienta más cerca del centro.</p>' },
      { tipo: 'numero', enunciado: '<p>Con una barra levantas una carga de 800 N que está a 0.4 m del apoyo. Tú empujas a 1.6 m del apoyo. ¿Con cuántos newtons debes empujar?</p>', respuesta: 800 * 0.4 / 1.6,
        pista: '<p>El producto fuerza por distancia debe ser igual en los dos lados.</p>',
        solucion: '<p>800 × 0.4 = 320, y F = 320 ÷ 1.6 = <strong>200 N</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En esa misma barra (carga de 800 N y empuje de 200 N), ¿cuál es la ventaja mecánica?</p>', respuesta: 800 / 200,
        pista: '<p>¿Cuántas veces cabe tu fuerza en la de la carga?</p>',
        solucion: '<p>Ventaja mecánica = 800 ÷ 200 = <strong>4</strong>: la barra multiplica tu fuerza por 4.</p>' },
      { tipo: 'numero', enunciado: '<p>Con una polea móvil quieres subir una carga de 500 N. ¿Con cuántos newtons debes jalar la cuerda? Ignora el peso de la polea y la fricción.</p>', respuesta: 500 / 2,
        pista: '<p>La carga cuelga de dos tramos de cuerda.</p>',
        solucion: '<p>Cada tramo sostiene la mitad, así que jalas con 500 ÷ 2 = <strong>250 N</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con esa polea móvil, para subir la carga 2 m, ¿cuántos metros de cuerda tienes que jalar?</p>', respuesta: 2 * 2,
        pista: '<p>Lo que ganas en fuerza lo pagas en distancia.</p>',
        solucion: '<p>Usas la mitad de fuerza, así que jalas el doble de cuerda: 2 × 2 = <strong>4 m</strong>. El trabajo es el mismo: 250 × 4 = 500 × 2 = 1 000 J.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Una máquina simple ahorra trabajo?</p>',
        opciones: ['Sí, siempre reduce el trabajo a la mitad.', 'No: reduce la fuerza, pero aumenta la distancia, y el trabajo es el mismo.', 'Sí, si la barra es muy larga.', 'Solo las poleas ahorran trabajo.'], correcta: 1,
        pista: '<p>Compara fuerza por distancia de los dos lados.</p>',
        solucion: '<p><strong>No ahorra trabajo</strong>: usas menos fuerza, pero a lo largo de más distancia, y el producto es el mismo. Con fricción, incluso es un poco mayor.</p>' },
    ],
    fuentes: [OSC('9-5-simple-machines', 'Simple Machines'), OS('9-3-simple-machines', 'Simple Machines'), WIKI('Palanca', 'Palanca'), WIKI('Polea', 'Polea'), { nombre: 'PhET, Universidad de Colorado: Ley del equilibrio', url: 'https://phet.colorado.edu/es/simulations/balancing-act' }],
  });

  // ------------------------------------------------------------------
  L('Cantidad de movimiento y choques', {
    objetivo: 'Calcular la cantidad de movimiento de un objeto y usar su conservación para predecir qué pasa después de un choque o un empujón.',
    explicacion: `
      <p>Una bicicleta y un camión vienen hacia ti a la misma rapidez, 3 m/s. ¿Cuál preferirías detener con las manos? La bici, claro. Ahora piensa en una pelota lanzada despacio y la misma pelota lanzada con toda tu fuerza: la rápida pega mucho más duro. Lo difícil de detener depende de la masa y de la velocidad juntas.</p>
      <h3>¿Qué es la cantidad de movimiento?</h3>
      <p>A la masa multiplicada por la velocidad se le llama <strong>cantidad de movimiento</strong>. También se le dice momento lineal o ímpetu, y se escribe con la letra p:</p>
      <p>p = m·v</p>
      <p>Se lee "la cantidad de movimiento es la masa por la velocidad". m es la masa, en kilogramos, y v es la velocidad, en m/s; por eso su unidad es kg·m/s. Como la velocidad es un vector, la cantidad de movimiento también: tiene dirección, y en una línea recta el signo la indica.</p>
      <p>Compara: la bici con su ciclista, 80 kg a 3 m/s, tiene p = 240 kg·m/s. El camión, 5 000 kg a 3 m/s, tiene p = 15 000 kg·m/s, casi 63 veces más. Por eso es tan difícil detenerlo.</p>
      <h3>¿Qué pasa en un choque?</h3>
      <p>Cuando dos objetos chocan, por la tercera ley de Newton se empujan con fuerzas iguales y opuestas, y durante el mismo tiempo. Lo que uno gana de cantidad de movimiento, el otro lo pierde exactamente. Esto pasa porque una fuerza que actúa durante cierto tiempo cambia la cantidad de movimiento: F = m·a, y a es cuánto cambia la velocidad en cada segundo. Como las dos fuerzas son iguales y duran lo mismo, los cambios son iguales y opuestos. Por eso la suma de las dos no cambia. A esto se le llama <strong>conservación de la cantidad de movimiento</strong>:</p>
      <p>la cantidad de movimiento total antes del choque = la total después del choque</p>
      <p>Funciona siempre que ninguna fuerza de afuera, como la fricción, actúe con fuerza notable durante el choque. Es parecido a la conservación de la energía de la lección anterior: algo que pasa de un objeto a otro sin perderse.</p>
      <h3>Choques en que quedan pegados</h3>
      <p>Si un carrito de 2 kg a 3 m/s choca con otro de 1 kg que está quieto y se quedan pegados, ¿a qué velocidad siguen? Antes: 2 × 3 + 1 × 0 = 6 kg·m/s. Después se mueven juntos, con 3 kg, y deben tener la misma cantidad de movimiento: 3 × v = 6, así que v = 2 m/s. Siguen más lento, porque ahora esa cantidad de movimiento se reparte entre más masa. Ojo: aquí se conserva la cantidad de movimiento, pero no la energía cinética, porque al quedar pegados parte de la energía se vuelve calor y sonido.</p>
      <h3>Empujones desde el reposo</h3>
      <p>Si dos patinadores quietos se empujan, al principio la cantidad de movimiento total es 0, y debe seguir siendo 0. Por eso salen en direcciones opuestas: uno con p positiva y otro con p negativa del mismo tamaño. Lo mismo hace un cañón que retrocede al disparar.</p>
      <p class="nota"><strong>Trampa común:</strong> olvidar el signo. Si dos objetos van en direcciones opuestas, uno tiene velocidad negativa, y su cantidad de movimiento resta en la suma.</p>`,
    ejemplo: `
      <p>Un coche de 1 000 kg va a 10 m/s y choca por detrás con otro de 1 500 kg que estaba detenido. Se quedan enganchados. ¿A qué velocidad se mueven juntos justo después del choque?</p>
      <ol class="pasos-ej">
        <li>Primero calcula la cantidad de movimiento total antes del choque. El coche en movimiento tiene 1 000 × 10 = 10 000 kg·m/s, y el detenido tiene 0. Total: 10 000 kg·m/s.</li>
        <li>Después del choque se mueven juntos, con una masa de 1 000 + 1 500 = 2 500 kg.</li>
        <li>La cantidad de movimiento se conserva: 2 500 × v = 10 000, así que v = 10 000 ÷ 2 500 = 4 m/s.</li>
        <li>Comprueba: 2 500 × 4 = 10 000 kg·m/s, lo mismo que antes. Y tiene sentido que vayan más lento que 10 m/s, porque la misma cantidad de movimiento se reparte en más masa.</li>
      </ol>
      <p>Resultado: <span class="resultado">4 m/s</span>.</p>
      <p class="nota"><strong>Error común:</strong> dividir entre la masa de un solo coche. Después del choque se mueven juntos, así que se usa la suma de las masas.</p>`,
    vidaReal: `
      <p>Combinar masa y velocidad explica muchas situaciones de todos los días:</p>
      <ul>
        <li>Los camiones pesados necesitan mucha más distancia para frenar que un coche a la misma rapidez.</li>
        <li>Al saltar de una lancha al muelle, la lancha se aleja hacia atrás.</li>
        <li>En el billar, una bola que pega de frente a otra quieta se detiene y le pasa su movimiento.</li>
        <li>Las bolsas de aire de los coches hacen que tu cuerpo se detenga de forma más suave.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una corredora de 50 kg va a 6 m/s. ¿Cuál es su cantidad de movimiento, en kg·m/s?</p>', respuesta: 50 * 6,
        pista: '<p>Usa p = m·v.</p>',
        solucion: '<p>p = 50 × 6 = <strong>300 kg·m/s</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una pelota de 0.2 kg vuela a 15 m/s. ¿Cuál es su cantidad de movimiento, en kg·m/s?</p>', respuesta: 0.2 * 15,
        pista: '<p>Multiplica la masa por la velocidad.</p>',
        solucion: '<p>p = 0.2 × 15 = <strong>3 kg·m/s</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál tiene más cantidad de movimiento: un camión de 2 000 kg a 1 m/s o un coche de 1 000 kg a 3 m/s?</p>',
        opciones: ['El camión', 'El coche', 'Tienen la misma', 'No se puede saber'], correcta: 1,
        pista: '<p>Calcula m·v para cada uno.</p>',
        solucion: '<p>El camión tiene 2 000 × 1 = 2 000 kg·m/s y el coche 1 000 × 3 = 3 000 kg·m/s. Gana <strong>el coche</strong>, aunque tenga menos masa.</p>' },
      { tipo: 'numero', enunciado: '<p>Un carrito de 2 kg a 6 m/s choca con otro de 1 kg que está quieto, y se quedan pegados. ¿A qué velocidad se mueven juntos, en m/s?</p>', respuesta: (2 * 6) / (2 + 1),
        pista: '<p>Calcula la cantidad de movimiento total antes y repártela entre la masa de los dos juntos.</p>',
        solucion: '<p>Antes: 2 × 6 = 12 kg·m/s. Después: 3 × v = 12, así que v = <strong>4 m/s</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un vagón de 3 000 kg a 2 m/s choca con otro de 1 000 kg que está quieto y se enganchan. ¿A qué velocidad siguen, en m/s?</p>', respuesta: (3000 * 2) / (3000 + 1000),
        pista: '<p>Después del choque, la masa es la suma de los dos vagones.</p>',
        solucion: '<p>Antes: 3 000 × 2 = 6 000 kg·m/s. Después: 4 000 × v = 6 000, así que v = <strong>1.5 m/s</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Dos patinadores están quietos sobre el hielo. Uno de 50 kg empuja a otro de 25 kg, que sale a 4 m/s. ¿Con qué rapidez sale hacia atrás el de 50 kg, en m/s? Escribe solo el número, sin signo.</p>', respuesta: 25 * 4 / 50,
        pista: '<p>La cantidad de movimiento total era 0, así que las dos deben ser iguales y opuestas.</p>',
        solucion: '<p>El de 25 kg tiene 25 × 4 = 100 kg·m/s. El otro debe tener 100 kg·m/s hacia el lado contrario: 50 × v = 100, así que v = <strong>2 m/s</strong>.</p>' },
    ],
    fuentes: [OSC('8-1-linear-momentum-and-force', 'Linear Momentum and Force'), OSC('8-3-conservation-of-momentum', 'Conservation of Momentum'), OS('8-3-elastic-and-inelastic-collisions', 'Elastic and Inelastic Collisions'), { nombre: 'PhET, Universidad de Colorado: Laboratorio de colisiones', url: 'https://phet.colorado.edu/es/simulations/collision-lab' }, WIKI('Cantidad_de_movimiento', 'Cantidad de movimiento')],
  });
})();
