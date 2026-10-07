// Física · Unidad 3: Fuerzas (dinámica).
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

  const OS = (pagina, nombre) => ({ nombre: `OpenStax, Physics: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/physics/pages/${pagina}` });
  const OSC = (pagina, nombre) => ({ nombre: `OpenStax, College Physics 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/college-physics-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = { nombre: 'Khan Academy en español: Fuerzas y leyes de Newton', url: 'https://es.khanacademy.org/science/physics/forces-newtons-laws' };
  const PHET = { nombre: 'PhET, Universidad de Colorado: Fuerzas y movimiento, fundamentos', url: 'https://phet.colorado.edu/es/simulations/forces-and-motion-basics' };

  // ------------------------------------------------------------------
  const DOS_FUERZAS = diagrama([-3.6, 4.4], [-1.4, 1.8], [
    caja(-1, -0.7, 1, 0.7), txt(0, -0.1, 'caja'),
    ...flecha([1, 0], [4, 0]), txt(2.5, 0.4, '30 N'),
    ...flecha([-1, 0], [-3, 0]), txt(-2, 0.4, '20 N'),
  ], 'Una caja vista de lado. Desde su cara derecha sale una flecha de 30 N que apunta a la derecha; desde su cara izquierda sale una flecha más corta, de 20 N, que apunta a la izquierda. Las flechas están dibujadas a escala: la de 30 N es más larga.');

  L('Qué es una fuerza', {
    objetivo: 'Reconocer qué es una fuerza, medirla en newtons y sumar varias fuerzas para encontrar la fuerza neta.',
    explicacion: `
      <p>Para mover un carrito del súper lo empujas; para abrir un cajón lo jalas. Para detener un balón que viene rodando, pones el pie. En todos los casos haces lo mismo: empujas o jalas algo. A un empujón o un jalón se le llama <strong>fuerza</strong>.</p>
      <p>Una fuerza puede poner algo en movimiento, frenarlo, cambiarle la dirección o deformarlo, como cuando aprietas una pelota de esponja. No todas las fuerzas necesitan contacto: un imán jala un clip sin tocarlo, y la Tierra jala hacia abajo todo lo que sueltas.</p>
      <h3>¿Hacia dónde empujo?</h3>
      <p>No es lo mismo empujar una puerta hacia adentro que hacia afuera. Por eso una fuerza es un vector, como los de la Unidad 1: tiene tamaño y dirección, y se dibuja con una flecha. El largo de la flecha muestra qué tan fuerte es, y la punta, hacia dónde empuja o jala.</p>
      <h3>¿Cómo se mide una fuerza?</h3>
      <p>La unidad de fuerza del SI es el <strong>newton</strong>, en honor al científico inglés Isaac Newton, y su símbolo es N. Para darte una idea, sostener en la mano una manzana chica, de unos 100 gramos, requiere más o menos 1 N. Levantar una bolsa con un litro de leche requiere unos 10 N.</p>
      <h3>¿Qué pasa si hay varias fuerzas?</h3>
      <p>Casi siempre hay más de una fuerza sobre un objeto. Imagina que tú empujas una caja hacia la derecha con 30 N y tu hermano la empuja hacia la izquierda con 20 N:</p>
      ${DOS_FUERZAS}
      <p>La caja no "siente" cada fuerza por separado, sino el resultado de todas juntas. A la suma de todas las fuerzas que actúan sobre un objeto se le llama <strong>fuerza neta</strong>. Como las fuerzas son vectores, se suman igual que los vectores de la Unidad 1:</p>
      <ul>
        <li>Si van en la misma dirección, se suman: 30 N y 20 N hacia la derecha dan 50 N hacia la derecha.</li>
        <li>Si van en direcciones opuestas, se restan, y la fuerza neta apunta hacia la más grande. En el dibujo, 30 − 20 = 10 N hacia la derecha, así que la caja tiende a moverse hacia la derecha, hacia donde empujas tú.</li>
        <li>Si forman una esquina recta, se usa el teorema de Pitágoras.</li>
      </ul>
      <p>Cuando las fuerzas se cancelan por completo, la fuerza neta es 0 y se dice que el objeto está en equilibrio. Es lo que pasa cuando dos equipos jalan una cuerda con la misma fuerza: los dos hacen un gran esfuerzo, pero la cuerda no se mueve.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que si algo no se mueve, no hay fuerzas sobre él. Un libro sobre la mesa tiene dos fuerzas: la Tierra lo jala hacia abajo y la mesa lo empuja hacia arriba. Se cancelan, por eso la fuerza neta es 0, pero las dos fuerzas existen.</p>`,
    ejemplo: `
      <p>Dos amigos empujan un coche descompuesto hacia adelante, uno con 300 N y otro con 250 N. El piso y las llantas frenan el coche con 400 N hacia atrás. ¿Cuál es la fuerza neta sobre el coche?</p>
      <ol class="pasos-ej">
        <li>Primero junta las fuerzas que van hacia adelante, porque van en la misma dirección y se suman: 300 + 250 = 550 N.</li>
        <li>Ahora compara con la que va hacia atrás. Son direcciones opuestas, así que se restan: 550 − 400 = 150 N.</li>
        <li>La dirección es la de la fuerza más grande: hacia adelante.</li>
        <li>Comprueba sumando con signos, tomando adelante como positivo: 300 + 250 + (−400) = 150. Sale lo mismo.</li>
      </ol>
      <p>Resultado: <span class="resultado">150 N hacia adelante</span>.</p>
      <p class="nota"><strong>Error común:</strong> sumar todo, 300 + 250 + 400 = 950 N. La fuerza que va hacia atrás se opone a las otras, así que se resta.</p>`,
    vidaReal: `
      <p>Empujar y jalar es parte de todo lo que haces con tu cuerpo:</p>
      <ul>
        <li>Al cargar a alguien entre varias personas, conviene que todas jalen en la misma dirección para que el esfuerzo se sume.</li>
        <li>Los ingenieros calculan cuánto empuje aguanta un puente o un balcón antes de construirlo.</li>
        <li>En el gimnasio, las máquinas indican cuánta carga estás moviendo con tus músculos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas situaciones <em>no</em> tiene una fuerza que cambie el movimiento de algo?</p>',
        opciones: ['Un imán atrae un clip.', 'Pateas un balón.', 'Un libro descansa solo sobre una mesa, con la fuerza neta en 0.', 'Frenas una bicicleta.'], correcta: 2,
        pista: '<p>Busca el caso en que las fuerzas se cancelan y nada cambia.</p>',
        solucion: '<p>En el libro sobre la mesa las fuerzas se cancelan: la fuerza neta es 0 y su movimiento <strong>no cambia</strong>. En los demás casos una fuerza pone algo en movimiento, lo atrae o lo frena.</p>' },
      { tipo: 'numero', enunciado: '<p>Dos personas empujan un mueble en la misma dirección, una con 40 N y otra con 35 N. ¿Cuál es la fuerza neta, en N?</p>', respuesta: 40 + 35,
        pista: '<p>Las dos fuerzas van hacia el mismo lado.</p>',
        solucion: '<p>Las fuerzas en la misma dirección se suman: 40 + 35 = <strong>75 N</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En un juego de jalar la cuerda, un equipo jala con 120 N y el otro con 100 N. ¿Cuál es la fuerza neta sobre la cuerda, en N?</p>', respuesta: 120 - 100,
        pista: '<p>Los equipos jalan en direcciones opuestas.</p>',
        solucion: '<p>En direcciones opuestas las fuerzas se restan: 120 − 100 = <strong>20 N</strong>, hacia el equipo que jala con 120 N.</p>' },
      { tipo: 'numero', enunciado: '<p>Sobre una caja actúan tres fuerzas: 50 N hacia la derecha, 20 N hacia la izquierda y 10 N hacia la izquierda. ¿Cuál es la fuerza neta, en N?</p>', respuesta: 50 - 20 - 10,
        pista: '<p>Junta primero las que van hacia la izquierda y luego compáralas con la de la derecha.</p>',
        solucion: '<p>Hacia la izquierda suman 20 + 10 = 30 N. Contra los 50 N de la derecha queda 50 − 30 = <strong>20 N</strong> hacia la derecha.</p>' },
      { tipo: 'numero', enunciado: '<p>Una lancha recibe una fuerza de 30 N hacia el este por el motor y otra de 40 N hacia el norte por el viento. ¿De cuántos newtons es la fuerza neta?</p>', respuesta: Math.sqrt(30 ** 2 + 40 ** 2),
        pista: '<p>El este y el norte forman una esquina recta. Usa el teorema de Pitágoras, como con los vectores.</p>',
        solucion: '<p>30² + 40² = 900 + 1 600 = 2 500, y la raíz cuadrada de 2 500 es <strong>50 N</strong>, hacia el noreste.</p>' },
      { tipo: 'opciones', enunciado: '<p>Dos equipos jalan una cuerda con exactamente la misma fuerza. ¿Qué pasa con la cuerda?</p>',
        opciones: ['Se mueve hacia el equipo más grande.', 'No se mueve, porque la fuerza neta es 0.', 'Se mueve hacia el equipo que jaló primero.', 'Se rompe siempre.'], correcta: 1,
        pista: '<p>Resta dos fuerzas iguales que van en direcciones opuestas.</p>',
        solucion: '<p>Las fuerzas se cancelan, así que la fuerza neta es 0: la cuerda está en <strong>equilibrio y no se mueve</strong>.</p>' },
    ],
    fuentes: [OS('4-1-force', 'Force'), WIKI('Fuerza', 'Fuerza'), PHET, KHAN],
  });

  // ------------------------------------------------------------------
  L('Primera ley de Newton: inercia', {
    objetivo: 'Entender que los objetos mantienen su estado de reposo o de movimiento si nada los empuja, y reconocer la inercia en situaciones diarias.',
    explicacion: `
      <p>Vas de pie en un camión y el chofer frena de golpe. Sin querer, tu cuerpo se va hacia adelante. Nadie te empujó: tu cuerpo solo siguió avanzando como antes. Esa resistencia a cambiar de movimiento es una de las ideas más importantes de la física.</p>
      <h3>¿Se detienen solas las cosas?</h3>
      <p>Durante casi dos mil años se creyó que, para que algo se mueva, hay que empujarlo todo el tiempo: una carreta se detiene si el caballo deja de jalar. Parece obvio, porque en la vida diaria todo termina frenando. Pero las cosas no se detienen solas: las frena algo, como el roce con el piso o el aire.</p>
      <p>Piensa en un disco de hockey. Sobre el pasto se detiene muy pronto; sobre el hielo, que casi no lo frena, se desliza muchísimo más. Si no hubiera nada que lo frenara, seguiría para siempre en línea recta y con la misma rapidez. Galileo lo notó primero, e Isaac Newton lo convirtió en la primera de sus tres leyes del movimiento.</p>
      <h3>¿Qué dice la primera ley?</h3>
      <p>La <strong>primera ley de Newton</strong> dice que, si la fuerza neta sobre un objeto es 0, el objeto no cambia su movimiento:</p>
      <ul>
        <li>Si está quieto, sigue quieto.</li>
        <li>Si se está moviendo, sigue moviéndose en línea recta y con la misma rapidez. Es decir, sigue con el movimiento rectilíneo uniforme de la Unidad 2.</li>
      </ul>
      <p>Solo una fuerza neta puede hacer que algo arranque, frene o dé vuelta. Por eso una sonda espacial, lejos de todo, sigue viajando durante años con los motores apagados: en el espacio casi no hay nada que la frene.</p>
      <h3>¿Qué es la inercia?</h3>
      <p>A esa tendencia de los objetos a seguir como están se le llama <strong>inercia</strong>. Por inercia te vas hacia adelante cuando el camión frena: el camión se detiene, pero tu cuerpo sigue avanzando hasta que algo lo detiene, como tus pies o el tubo del que te agarras. Y por inercia te vas hacia atrás cuando el camión arranca: el camión avanza y tu cuerpo tiende a quedarse donde estaba.</p>
      <p>No todos los objetos tienen la misma inercia. Mientras más masa tiene algo, más le cuesta cambiar de movimiento. Es fácil detener un balón de playa que viene rodando, pero muy difícil detener un coche que rueda a la misma rapidez. El coche tiene mucha más masa, así que tiene mucha más inercia.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que un objeto que se mueve a velocidad constante necesita una fuerza neta hacia adelante. Un coche que va a 80 km/h en línea recta sin cambiar de velocidad tiene fuerza neta 0: el motor empuja justo lo mismo que el aire y el piso lo frenan.</p>`,
    ejemplo: `
      <p>Pones una moneda sobre una tarjeta encima de un vaso y le das un golpe rápido a la tarjeta de lado. ¿Qué le pasa a la moneda y por qué?</p>
      <ol class="pasos-ej">
        <li>Primero piensa cómo estaba la moneda antes del golpe: quieta. Por la primera ley, tiende a seguir quieta.</li>
        <li>El golpe empuja a la tarjeta, no a la moneda. Como el golpe es rápido, la tarjeta sale antes de que el roce alcance a arrastrar a la moneda.</li>
        <li>Sin la tarjeta debajo, la moneda ya no tiene nada que la sostenga, así que la Tierra la jala hacia abajo y cae dentro del vaso.</li>
        <li>Compruébalo con lo contrario: si jalas la tarjeta despacio, el roce sí alcanza a arrastrar a la moneda y se cae fuera del vaso.</li>
      </ol>
      <p>Resultado: <span class="resultado">la moneda cae dentro del vaso por inercia</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que la moneda "salta" hacia el vaso. No se mueve hacia ningún lado: se queda donde estaba y solo cae.</p>`,
    vidaReal: `
      <p>Que las cosas tiendan a seguir como están explica muchos cuidados que tenemos:</p>
      <ul>
        <li>El cinturón de seguridad te detiene cuando el coche frena, porque tu cuerpo seguiría avanzando.</li>
        <li>Al subir cosas sueltas a una camioneta, se amarran para que no salgan volando en una frenada.</li>
        <li>Para sacudir la cátsup de la botella o el polvo de un tapete, los mueves rápido y los detienes de golpe.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Vas sentado en un autobús que frena de golpe. ¿Por qué tu cuerpo se va hacia adelante?</p>',
        opciones: ['Porque el autobús te empuja hacia adelante.', 'Porque tu cuerpo tiende a seguir moviéndose como antes.', 'Porque el aire te empuja.', 'Porque la gravedad cambia al frenar.'], correcta: 1,
        pista: '<p>Antes de frenar, tu cuerpo ya se movía junto con el autobús.</p>',
        solucion: '<p>Por inercia, tu cuerpo <strong>tiende a seguir moviéndose</strong> a la misma velocidad. El autobús frena, pero tú sigues avanzando hasta que algo te detiene.</p>' },
      { tipo: 'numero', enunciado: '<p>Un coche va en línea recta a 80 km/h, siempre igual. ¿Cuál es la fuerza neta sobre él, en N?</p>', respuesta: 0,
        pista: '<p>Si su velocidad no cambia, ¿hay algo que lo esté acelerando?</p>',
        solucion: '<p>Su movimiento no cambia, así que por la primera ley la fuerza neta es <strong>0 N</strong>. El empuje del motor se cancela con lo que lo frena.</p>' },
      { tipo: 'numero', enunciado: '<p>En una pista de hielo sin nada de roce, un disco se desliza a 5 m/s y nadie lo toca. ¿Qué rapidez tendrá 10 s después, en m/s?</p>', respuesta: 5,
        pista: '<p>Si ninguna fuerza actúa sobre él, ¿puede cambiar su movimiento?</p>',
        solucion: '<p>Sin fuerza neta, el disco mantiene su movimiento: sigue a <strong>5 m/s</strong> en la misma dirección.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos objetos tiene más inercia?</p>',
        opciones: ['Una pelota de tenis', 'Una bicicleta', 'Un camión de carga', 'Una pluma'], correcta: 2,
        pista: '<p>La inercia depende de la masa.</p>',
        solucion: '<p>El <strong>camión de carga</strong> tiene mucha más masa que los demás, así que es el que más se resiste a arrancar, frenar o dar vuelta.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una sonda espacial viaja lejos de cualquier planeta con los motores apagados. ¿Qué hace?</p>',
        opciones: ['Se detiene poco a poco.', 'Sigue en línea recta con la misma rapidez.', 'Empieza a girar en círculos.', 'Se detiene de inmediato.'], correcta: 1,
        pista: '<p>En el espacio casi no hay aire ni nada que la frene.</p>',
        solucion: '<p>Sin fuerzas que la frenen, la sonda <strong>sigue en línea recta con la misma rapidez</strong>, tal como dice la primera ley.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un camión arranca de golpe y una caja suelta que va en la parte de atrás se recorre. ¿Hacia dónde se recorre respecto al camión?</p>',
        opciones: ['Hacia adelante', 'Hacia atrás', 'Hacia un lado', 'No se mueve'], correcta: 1,
        pista: '<p>Antes de arrancar, la caja estaba quieta. ¿Qué tiende a hacer?</p>',
        solucion: '<p>La caja tiende a quedarse quieta mientras el camión avanza, así que, vista desde el camión, se recorre <strong>hacia atrás</strong>.</p>' },
    ],
    fuentes: [OS('4-2-newtons-first-law-of-motion-inertia', "Newton's First Law of Motion: Inertia"), WIKI('Inercia', 'Inercia'), KHAN],
  });

  // ------------------------------------------------------------------
  L('Segunda ley de Newton: F = m·a', {
    objetivo: 'Usar la segunda ley de Newton para relacionar la fuerza neta, la masa y la aceleración de un objeto.',
    explicacion: `
      <p>Empuja un carrito del súper vacío y luego el mismo carrito lleno de garrafones, con la misma fuerza. El vacío sale disparado; el lleno apenas arranca. Y si empujas el vacío más fuerte, sale todavía más rápido. La fuerza y la masa deciden juntas qué tanto acelera algo.</p>
      <h3>¿Qué tanto acelera?</h3>
      <p>Con experimentos como este se encuentran dos patrones. Primero, si duplicas la fuerza neta, la aceleración también se duplica: empujar más fuerte hace que la velocidad cambie más rápido. Segundo, si duplicas la masa, la aceleración se reduce a la mitad: lo pesado se resiste más a cambiar, por su inercia.</p>
      <p>Las dos ideas caben en una sola fórmula:</p>
      <p>a = ${F('F', 'm')}</p>
      <p>Se lee "la aceleración es la fuerza neta entre la masa". F es <strong>la fuerza neta, el empujón total</strong>, en newtons; m es <strong>la masa, qué tanto se resiste a cambiar</strong>, en kilogramos; y a es <strong>la aceleración</strong>, en m/s². Fíjate que la fuerza está arriba, así que más fuerza da más aceleración, y la masa está abajo, así que más masa da menos.</p>
      <h3>La forma más famosa</h3>
      <p>Si pasas la masa al otro lado multiplicando, obtienes la forma en que casi siempre se escribe:</p>
      <p>F = m·a</p>
      <p>Se lee "la fuerza neta es la masa por la aceleración". A esto se le llama <strong>segunda ley de Newton</strong>. De aquí sale también qué es un newton: la fuerza que hace que 1 kg acelere 1 m/s². Por eso 1 N = 1 kg·m/s².</p>
      <h3>Mini ejemplos con números pequeños</h3>
      <ul>
        <li>Empujas una caja de 2 kg con una fuerza neta de 10 N: a = 10 ÷ 2 = 5 m/s².</li>
        <li>Empujas una caja de 4 kg con la misma fuerza: a = 10 ÷ 4 = 2.5 m/s². El doble de masa, la mitad de aceleración.</li>
        <li>Quieres que una caja de 3 kg acelere 2 m/s²: necesitas F = 3 × 2 = 6 N.</li>
      </ul>
      <h3>¿Y si hay varias fuerzas?</h3>
      <p>La F de la fórmula es la fuerza neta, la que viste en la lección "Qué es una fuerza". Primero sumas todas las fuerzas con su dirección y luego usas ese resultado. Esta ley también explica la primera: si la fuerza neta es 0, la aceleración es 0, y el objeto no cambia su movimiento.</p>
      <p class="nota"><strong>Trampa común:</strong> usar solo la fuerza con la que empujas e ignorar las que frenan. Si empujas con 50 N y el piso frena con 20 N, la fuerza que acelera al objeto es 30 N, no 50 N.</p>`,
    ejemplo: `
      <p>Empujas un carrito de 15 kg con 45 N, y el roce de las ruedas lo frena con 15 N. ¿Cuál es su aceleración y qué velocidad lleva después de 3 s, si salió del reposo?</p>
      <ol class="pasos-ej">
        <li>Primero calcula la fuerza neta, porque es la que produce la aceleración. Tu empuje y el roce van en direcciones opuestas: 45 − 15 = 30 N hacia adelante.</li>
        <li>Ahora usa la segunda ley: a = F ÷ m = 30 ÷ 15 = 2 m/s².</li>
        <li>Para la velocidad, usa lo que aprendiste en la Unidad 2: v = v₀ + a·t = 0 + 2 × 3 = 6 m/s.</li>
        <li>Comprueba al revés: para que 15 kg aceleren 2 m/s² hace falta F = 15 × 2 = 30 N, justo la fuerza neta.</li>
      </ol>
      <p>Resultado: <span class="resultado">2 m/s² y 6 m/s a los 3 s</span>.</p>
      <p class="nota"><strong>Error común:</strong> dividir 45 ÷ 15 = 3 m/s². Así ignoras el roce: la aceleración la produce la fuerza neta, no solo tu empuje.</p>`,
    vidaReal: `
      <p>Esta relación entre empujón, masa y arranque está en muchas decisiones:</p>
      <ul>
        <li>Un coche cargado con toda la familia y las maletas arranca y frena más lento que vacío.</li>
        <li>En el futbol, patear más fuerte hace que el balón salga más rápido.</li>
        <li>Los camiones de carga necesitan motores y frenos mucho más potentes que un coche.</li>
        <li>Al mudarte, es más fácil mover una caja medio llena que una repleta.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una caja de 2 kg acelera 3 m/s². ¿Cuál es la fuerza neta sobre ella, en N?</p>', respuesta: 2 * 3,
        pista: '<p>Usa F = m·a.</p>',
        solucion: '<p>F = 2 × 3 = <strong>6 N</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Empujas una mochila de 4 kg con una fuerza neta de 20 N. ¿Cuál es su aceleración, en m/s²?</p>', respuesta: 20 / 4,
        pista: '<p>La aceleración es la fuerza neta entre la masa.</p>',
        solucion: '<p>a = 20 ÷ 4 = <strong>5 m/s²</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una fuerza neta de 30 N hace que un objeto acelere 6 m/s². ¿Cuál es su masa, en kg?</p>', respuesta: 30 / 6,
        pista: '<p>Despeja la masa de F = m·a: ¿qué número por 6 da 30?</p>',
        solucion: '<p>m = F ÷ a = 30 ÷ 6 = <strong>5 kg</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un coche de 1 000 kg acelera 2 m/s². ¿Qué fuerza neta lo impulsa, en N?</p>', respuesta: 1000 * 2,
        pista: '<p>Multiplica la masa por la aceleración.</p>',
        solucion: '<p>F = 1 000 × 2 = <strong>2 000 N</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Empujas un trineo de 10 kg con 50 N, y la nieve lo frena con 20 N. ¿Cuál es su aceleración, en m/s²?</p>', respuesta: (50 - 20) / 10,
        pista: '<p>Calcula primero la fuerza neta.</p>',
        solucion: '<p>La fuerza neta es 50 − 20 = 30 N, y a = 30 ÷ 10 = <strong>3 m/s²</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Empujas dos carritos con la misma fuerza neta. Uno tiene el doble de masa que el otro. ¿Cómo es su aceleración?</p>',
        opciones: ['El doble', 'Igual', 'La mitad', 'Cuatro veces menor'], correcta: 2,
        pista: '<p>En a = F ÷ m, ¿qué pasa si el número de abajo se duplica?</p>',
        solucion: '<p>La masa está dividiendo: si se duplica, la aceleración queda en <strong>la mitad</strong>.</p>' },
    ],
    fuentes: [OSC('4-3-newtons-second-law-of-motion-concept-of-a-system', "Newton's Second Law of Motion"), WIKI('Leyes_de_Newton', 'Leyes de Newton'), PHET, KHAN],
  });

  // ------------------------------------------------------------------
  const PATINADORES = diagrama([-4.2, 4.2], [-1.6, 2.4], [
    { tipo: 'circulo', x: -1, y: 0.4, r: 0.6 }, txt(-1, -0.9, 'Ana'),
    { tipo: 'circulo', x: 1, y: 0.4, r: 0.6 }, txt(1, -0.9, 'Beto'),
    ...flecha([1.6, 0.4], [3.6, 0.4]), txt(2.6, 1.3, 'Ana empuja a Beto'), txt(2.6, 0.85, '100 N'),
    ...flecha([-1.6, 0.4], [-3.6, 0.4]), txt(-2.6, 1.3, 'Beto empuja a Ana'), txt(-2.6, 0.85, '100 N'),
  ], 'Dos patinadores, Ana a la izquierda y Beto a la derecha, se empujan con las manos. Sobre Beto actúa una flecha de 100 N hacia la derecha: la fuerza con la que Ana lo empuja. Sobre Ana actúa una flecha del mismo largo, de 100 N, hacia la izquierda: la fuerza con la que Beto la empuja.');

  L('Tercera ley de Newton: acción y reacción', {
    objetivo: 'Reconocer que las fuerzas siempre aparecen en pares iguales y opuestos, y explicar con ello cómo caminamos, nadamos o despegan los cohetes.',
    explicacion: `
      <p>Ponte unos patines frente a una pared y empújala. ¿Qué pasa? Tú sales rodando hacia atrás. Empujaste la pared, pero fuiste tú quien se movió. Eso quiere decir que la pared también te empujó a ti.</p>
      <h3>¿Quién empuja a quién?</h3>
      <p>Cada vez que un objeto empuja o jala a otro, el segundo empuja o jala al primero de vuelta. Las fuerzas nunca aparecen solas: siempre vienen en pares. A esto se le llama <strong>tercera ley de Newton</strong>, o ley de <strong>acción y reacción</strong>:</p>
      <p>Si A empuja a B con una fuerza, B empuja a A con una fuerza del mismo tamaño y en dirección contraria.</p>
      <p>No importa cuál llames acción y cuál reacción: las dos ocurren al mismo tiempo y son igual de fuertes. Si empujas la pared con 50 N, la pared te empuja con 50 N.</p>
      ${PATINADORES}
      <h3>¿Por qué no se cancelan?</h3>
      <p>Si las dos fuerzas son iguales y opuestas, ¿por qué no se cancelan y nadie se mueve? Porque actúan sobre cuerpos distintos. En el dibujo, una fuerza actúa sobre Beto y la otra sobre Ana. Para saber si Beto acelera, solo cuentan las fuerzas que actúan sobre Beto, y ahí solo hay una. Las fuerzas se cancelan únicamente cuando actúan sobre el mismo objeto, como en la lección "Qué es una fuerza".</p>
      <h3>¿Entonces se mueven igual?</h3>
      <p>No necesariamente. Las fuerzas son iguales, pero las masas pueden ser distintas. Por la segunda ley, a = F ÷ m: quien tenga menos masa acelera más. Si Ana tiene 50 kg y Beto 25 kg, con 100 N Ana acelera 2 m/s² y Beto 4 m/s². Beto sale más rápido, aunque la fuerza sobre los dos sea la misma.</p>
      <h3>Pares de fuerzas en todos lados</h3>
      <ul>
        <li>Al caminar, tu pie empuja el piso hacia atrás, y el piso te empuja hacia adelante. Por eso cuesta caminar sobre hielo: el pie no logra empujar el piso.</li>
        <li>Al nadar, tus brazos empujan el agua hacia atrás, y el agua te empuja hacia adelante.</li>
        <li>Un cohete empuja los gases hacia abajo con mucha fuerza, y los gases empujan al cohete hacia arriba. No necesita aire para apoyarse.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> creer que en un choque entre un camión y un mosquito, el camión empuja más fuerte. Las dos fuerzas son iguales. Lo que cambia es el efecto: el mosquito tiene tan poca masa que su aceleración es enorme, y el camión ni lo nota.</p>`,
    ejemplo: `
      <p>Desde una lancha quieta, una persona lanza una caja de 20 kg hacia adelante, empujándola con 100 N. La lancha, contando a la persona, tiene 200 kg y el agua no la frena. ¿Qué le pasa a la lancha?</p>
      <ol class="pasos-ej">
        <li>Primero encuentra el par de fuerzas: si la persona empuja la caja con 100 N hacia adelante, la caja empuja a la persona con 100 N hacia atrás. Como la persona va en la lancha, la empuja con ella.</li>
        <li>Calcula la aceleración de la caja con la segunda ley: a = 100 ÷ 20 = 5 m/s² hacia adelante.</li>
        <li>Ahora la de la lancha con la persona, que reciben la misma fuerza pero tienen más masa: a = 100 ÷ 200 = 0.5 m/s² hacia atrás.</li>
        <li>Comprueba: la lancha tiene 10 veces la masa de la caja, y su aceleración es 10 veces menor.</li>
      </ol>
      <p>Resultado: <span class="resultado">la lancha se mueve hacia atrás con 0.5 m/s²</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que la lancha recibe menos fuerza porque se mueve menos. La fuerza es igual; se mueve menos porque tiene más masa.</p>`,
    vidaReal: `
      <p>Los pares de fuerzas explican cómo te mueves por el mundo:</p>
      <ul>
        <li>Para saltar, empujas el piso hacia abajo con las piernas, y el piso te lanza hacia arriba.</li>
        <li>Al remar en una lancha, empujas el agua hacia atrás con el remo, y el agua empuja la lancha hacia adelante.</li>
        <li>Los cohetes que llevan satélites al espacio funcionan lanzando gases con mucha fuerza hacia abajo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Empujas una pared con una fuerza de 60 N. ¿Con cuántos newtons te empuja la pared a ti?</p>', respuesta: 60,
        pista: '<p>Las fuerzas de un par son del mismo tamaño.</p>',
        solucion: '<p>La pared te empuja con <strong>60 N</strong>, en dirección contraria a tu empuje.</p>' },
      { tipo: 'numero', enunciado: '<p>Dos patinadores se empujan. Ana tiene 60 kg y Beto 40 kg. Ana empuja a Beto con 120 N. ¿Cuál es la aceleración de Ana, en m/s²?</p>', respuesta: 120 / 60,
        pista: '<p>Beto empuja a Ana con la misma fuerza. Usa a = F ÷ m con la masa de Ana.</p>',
        solucion: '<p>Ana recibe 120 N de Beto, así que a = 120 ÷ 60 = <strong>2 m/s²</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con los mismos patinadores (Ana 60 kg, Beto 40 kg, fuerza de 120 N), ¿cuál es la aceleración de Beto, en m/s²?</p>', respuesta: 120 / 40,
        pista: '<p>Usa la misma fuerza, pero con la masa de Beto.</p>',
        solucion: '<p>a = 120 ÷ 40 = <strong>3 m/s²</strong>. Beto acelera más porque tiene menos masa.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un camión choca con un mosquito. ¿Cuál fuerza es más grande?</p>',
        opciones: ['La del camión sobre el mosquito', 'La del mosquito sobre el camión', 'Son del mismo tamaño', 'No hay fuerza sobre el camión'], correcta: 2,
        pista: '<p>Recuerda que las fuerzas de un par siempre son iguales. El efecto es lo que cambia.</p>',
        solucion: '<p>Por la tercera ley, las dos fuerzas <strong>son del mismo tamaño</strong>. El mosquito sufre mucho más porque su masa es diminuta y su aceleración es enorme.</p>' },
      { tipo: 'opciones', enunciado: '<p>Al caminar, ¿qué fuerza te empuja hacia adelante?</p>',
        opciones: ['La que tus músculos hacen sobre tu cuerpo', 'La que el piso hace sobre tu pie', 'El aire que te empuja por la espalda', 'La gravedad'], correcta: 1,
        pista: '<p>Tu pie empuja el piso hacia atrás. ¿Qué hace el piso de vuelta?</p>',
        solucion: '<p>Tu pie empuja el piso hacia atrás, y <strong>el piso empuja tu pie hacia adelante</strong>. Esa reacción es la que te mueve.</p>' },
      { tipo: 'opciones', enunciado: '<p>Si las fuerzas de acción y reacción son iguales y opuestas, ¿por qué no se cancelan?</p>',
        opciones: ['Porque una ocurre antes que la otra', 'Porque actúan sobre cuerpos distintos', 'Porque una siempre es más grande', 'Sí se cancelan siempre'], correcta: 1,
        pista: '<p>¿Sobre quién actúa cada fuerza del par?</p>',
        solucion: '<p>Cada fuerza del par actúa <strong>sobre un cuerpo distinto</strong>. Solo se cancelan las fuerzas que actúan sobre el mismo objeto.</p>' },
    ],
    fuentes: [OSC('4-4-newtons-third-law-of-motion-symmetry-in-forces', "Newton's Third Law of Motion: Symmetry in Forces"), WIKI('Leyes_de_Newton', 'Leyes de Newton'), KHAN],
  });

  // ------------------------------------------------------------------
  L('Masa y peso', {
    objetivo: 'Distinguir la masa del peso y calcular el peso de un objeto en la Tierra o en la Luna con P = m·g.',
    explicacion: `
      <p>Te subes a la báscula del baño y marca 60. Decimos "peso 60 kilos", pero en física esa frase mezcla dos ideas distintas. Para verlo, imagina que te llevas la báscula a la Luna: ahí marcaría unos 10. ¿Perdiste 50 kilos en el viaje? Tu cuerpo es exactamente el mismo.</p>
      <h3>¿Qué es la masa?</h3>
      <p>La <strong>masa</strong> es la cantidad de materia que tiene un objeto, y se mide en kilogramos. También mide su inercia: qué tanto se resiste a cambiar de movimiento. La masa no depende del lugar: tu cuerpo tiene los mismos 60 kg en tu casa, en la Luna o flotando en el espacio, porque está hecho de la misma materia.</p>
      <h3>¿Qué es el peso?</h3>
      <p>El <strong>peso</strong> es la fuerza con la que un planeta o una luna jala hacia abajo a un objeto. Como es una fuerza, se mide en newtons y tiene dirección: hacia el centro del planeta. En la Unidad 2 viste que todo lo que cae en la Tierra acelera 9.8 m/s². Por la segunda ley, la fuerza que causa esa aceleración es masa por aceleración:</p>
      <p>P = m·g</p>
      <p>Se lee "el peso es la masa por la aceleración de la gravedad". P es <strong>con cuánta fuerza te jala el planeta</strong>, m es tu masa y g es la aceleración de la gravedad del lugar donde estés. En la Tierra, g ≈ 9.8 m/s², así que una persona de 60 kg pesa 60 × 9.8 = 588 N.</p>
      <h3>¿Por qué el peso cambia de un lugar a otro?</h3>
      <p>La Luna tiene mucha menos masa que la Tierra, así que jala con menos fuerza: su g es de unos 1.6 m/s². La masa no cambia, pero el peso sí:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Lugar</th><th>g (m/s²)</th><th>Masa</th><th>Peso</th></tr>
        <tr><th>Tierra</th><td>9.8</td><td>60 kg</td><td>588 N</td></tr>
        <tr><th>Luna</th><td>1.6</td><td>60 kg</td><td>96 N</td></tr>
        <tr><th>Espacio, lejos de todo</th><td>casi 0</td><td>60 kg</td><td>casi 0 N</td></tr>
      </table></div>
      <p>Por eso los astronautas dan grandes saltos en la Luna: su masa es la misma, pero la Luna los jala con apenas una sexta parte de la fuerza.</p>
      <h3>¿Y la báscula?</h3>
      <p>Una báscula de baño en realidad mide con cuánta fuerza la aplastas, es decir, tu peso. Pero, como casi todos la usamos en la Tierra, viene ajustada para dividir entre 9.8 y mostrarte la masa en kilogramos. En la Luna esa cuenta ya no sirve, y por eso marcaría mal.</p>
      <p class="nota"><strong>Trampa común:</strong> dar el peso en kilogramos. En la vida diaria se entiende, pero en física el peso es una fuerza y se mide en newtons. Los kilogramos son para la masa.</p>`,
    ejemplo: `
      <p>Un astronauta tiene una masa de 80 kg. ¿Cuánto pesa en la Tierra y cuánto en la Luna?</p>
      <ol class="pasos-ej">
        <li>Primero aclara qué no cambia: la masa es la misma en los dos lugares, 80 kg, porque el astronauta está hecho de la misma materia.</li>
        <li>En la Tierra, multiplica la masa por la g de la Tierra: P = 80 × 9.8 = 784 N.</li>
        <li>En la Luna, usa la g de la Luna: P = 80 × 1.6 = 128 N.</li>
        <li>Comprueba la proporción: 784 ÷ 128 ≈ 6. En la Luna pesa unas seis veces menos, igual que 9.8 ÷ 1.6 ≈ 6.</li>
      </ol>
      <p>Resultado: <span class="resultado">784 N en la Tierra y 128 N en la Luna, con la misma masa de 80 kg</span>.</p>
      <p class="nota"><strong>Error común:</strong> decir que en la Luna su masa es menor. Cambia el peso, no la masa.</p>`,
    vidaReal: `
      <p>Separar cuánta materia tienes de cuánto te jala el planeta aclara muchas cosas:</p>
      <ul>
        <li>Al leer una etiqueta del súper, los gramos y kilos indican cuánta comida hay, no cuánto jala la Tierra.</li>
        <li>Los ingenieros calculan en newtons cuánta fuerza aguanta un estante, una grúa o un elevador.</li>
        <li>Explica por qué los astronautas entrenan bajo el agua o en aviones especiales para acostumbrarse a sentirse más ligeros.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuánto pesa en la Tierra una persona de 50 kg, en N? Usa g = 9.8 m/s².</p>', respuesta: 50 * 9.8,
        pista: '<p>Usa P = m·g.</p>',
        solucion: '<p>P = 50 × 9.8 = <strong>490 N</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuánto pesaría esa misma persona de 50 kg en la Luna, en N? Usa g = 1.6 m/s².</p>', respuesta: 50 * 1.6,
        pista: '<p>Usa la misma masa con la g de la Luna.</p>',
        solucion: '<p>P = 50 × 1.6 = <strong>80 N</strong>, unas seis veces menos que en la Tierra.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la masa de esa persona en la Luna, en kg?</p>', respuesta: 50,
        pista: '<p>¿La masa depende del lugar?</p>',
        solucion: '<p>La masa no cambia de un lugar a otro: sigue siendo <strong>50 kg</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un costal pesa 98 N en la Tierra. ¿Cuál es su masa, en kg? Usa g = 9.8 m/s².</p>', respuesta: 98 / 9.8,
        pista: '<p>Despeja la masa de P = m·g: ¿qué número por 9.8 da 98?</p>',
        solucion: '<p>m = P ÷ g = 98 ÷ 9.8 = <strong>10 kg</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un astronauta viaja de la Tierra a la Luna. ¿Qué cambia?</p>',
        opciones: ['Solo su masa', 'Solo su peso', 'Su masa y su peso', 'Nada'], correcta: 1,
        pista: '<p>Una de las dos depende de qué tan fuerte jala el lugar donde estás.</p>',
        solucion: '<p>Cambia <strong>solo su peso</strong>, porque la Luna jala con menos fuerza. Su masa, la cantidad de materia, es la misma.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿En qué unidad se mide el peso en física?</p>',
        opciones: ['Kilogramos', 'Newtons', 'Metros por segundo', 'Gramos'], correcta: 1,
        pista: '<p>El peso es una fuerza.</p>',
        solucion: '<p>El peso es una fuerza, así que se mide en <strong>newtons</strong>. Los kilogramos y los gramos son para la masa.</p>' },
    ],
    fuentes: [OS('4-1-force', 'Force'), WIKI('Peso', 'Peso'), KHAN],
  });

  // ------------------------------------------------------------------
  const ROCE = diagrama([-4, 4], [-3.4, 3.2], [
    { tipo: 'linea', desde: [-4, -1], hasta: [4, -1] }, txt(-3.2, -1.5, 'piso'),
    caja(-1, -1, 1, 0.6), txt(0, -0.3, 'mueble'),
    ...flecha([1, -0.2], [3.2, -0.2]), txt(2.2, 0.2, 'empuje'),
    ...flecha([-1, -0.7], [-2.8, -0.7]), txt(-2, -0.3, 'fricción'),
    ...flecha([0, 0.6], [0, 2.8]), txt(0.95, 2.5, 'normal'),
    ...flecha([0, -1], [0, -3.2]), txt(0.8, -2.8, 'peso'),
  ], 'Un mueble sobre el piso con cuatro fuerzas. El empuje apunta a la derecha. La fricción apunta a la izquierda, a lo largo del piso. El peso apunta hacia abajo y la fuerza normal hacia arriba; las dos flechas verticales miden lo mismo. Cada flecha lleva su rótulo: empuje, fricción, normal y peso.');

  L('Fricción', {
    objetivo: 'Entender qué es la fricción, calcularla con f = μ·N y tomarla en cuenta al usar la segunda ley de Newton.',
    explicacion: `
      <p>Intenta empujar un mueble pesado. Al principio no se mueve, aunque empujes fuerte. De pronto arranca y, ya en movimiento, cuesta un poco menos mantenerlo andando. Lo que se opone a tu empuje es el roce entre el mueble y el piso.</p>
      <h3>¿Qué es la fricción?</h3>
      <p>Ninguna superficie es perfectamente lisa. Vistas con un microscopio, hasta las más pulidas tienen pequeñas montañas y valles que se atoran unos con otros. A la fuerza que se opone a que dos superficies se deslicen una sobre otra se le llama <strong>fricción</strong>. Siempre apunta en contra del movimiento, o en contra del lugar hacia donde algo intenta moverse.</p>
      ${ROCE}
      <h3>Dos tipos de fricción</h3>
      <ul>
        <li>La fricción estática actúa mientras el objeto está quieto. Crece tanto como haga falta para impedir que se mueva, hasta un límite. Cuando tu empuje pasa ese límite, el mueble arranca.</li>
        <li>La fricción cinética actúa cuando el objeto ya se desliza. Casi siempre es menor que el límite de la estática: por eso cuesta más arrancar algo que mantenerlo en movimiento.</li>
      </ul>
      <h3>¿De qué depende?</h3>
      <p>Depende de dos cosas. La primera es qué tan fuerte se aprietan las superficies. Sobre un piso plano, el piso empuja al mueble hacia arriba con una fuerza igual a su peso; esa fuerza se llama <strong>fuerza normal</strong>, N, porque "normal" significa perpendicular a la superficie. Mientras más pesado es el mueble, más se aprietan las superficies y más fricción hay.</p>
      <p>La segunda es el tipo de superficies. Hule sobre cemento se agarra mucho; hielo sobre hielo, casi nada. Eso se resume en un número llamado <strong>coeficiente de fricción</strong>, que se escribe con la letra griega μ (mu). Juntando las dos ideas:</p>
      <p>f = μ·N</p>
      <p>Se lee "la fricción es el coeficiente de fricción por la fuerza normal". μ es <strong>qué tanto se agarran las superficies</strong>; no tiene unidades y suele estar entre 0 y 1. N es <strong>qué tan fuerte se aprietan</strong>, en newtons. Cada par de superficies tiene un μ estático y otro cinético, y el estático suele ser mayor.</p>
      <p>Por ejemplo, para hule sobre cemento seco μ está entre 0.7 y 1, y para hielo sobre hielo, entre 0.03 y 0.1. Por eso un coche frena bien en el pavimento seco y patina sobre una calle congelada.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que la fricción siempre es mala. Sin fricción no podrías caminar, tus zapatos resbalarían, los coches no podrían frenar y los clavos se saldrían de la madera.</p>`,
    ejemplo: `
      <p>Una caja de 20 kg está en el piso. El coeficiente de fricción estático es 0.5 y el cinético es 0.3. ¿Con cuánta fuerza hay que empujar para que arranque, y cuánta fricción hay ya en movimiento? Usa g = 9.8 m/s².</p>
      <ol class="pasos-ej">
        <li>Primero calcula la fuerza normal. En un piso plano es igual al peso: N = 20 × 9.8 = 196 N.</li>
        <li>Para que arranque, tu empuje debe superar el límite de la fricción estática: f = 0.5 × 196 = 98 N.</li>
        <li>Ya en movimiento, actúa la fricción cinética: f = 0.3 × 196 = 58.8 N.</li>
        <li>Comprueba que tenga sentido: la fricción en movimiento (58.8 N) es menor que el límite para arrancar (98 N), como pasa con el mueble.</li>
      </ol>
      <p>Resultado: <span class="resultado">más de 98 N para que arranque; 58.8 N de fricción ya en movimiento</span>.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar μ por la masa, 0.5 × 20 = 10. La fórmula pide la fuerza normal en newtons, no la masa en kilogramos.</p>`,
    vidaReal: `
      <p>El roce entre superficies está detrás de cosas que haces sin pensarlo:</p>
      <ul>
        <li>Los zapatos deportivos tienen suelas de hule con dibujos para no resbalar.</li>
        <li>Las llantas gastadas son peligrosas porque se agarran menos al piso mojado.</li>
        <li>Se pone aceite en una bisagra que rechina para que las piezas se deslicen mejor.</li>
        <li>Frotar las manos en invierno las calienta por el roce.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una caja de 10 kg descansa en un piso plano. ¿Cuál es la fuerza normal sobre ella, en N? Usa g = 9.8 m/s².</p>', respuesta: 10 * 9.8,
        pista: '<p>En un piso plano, la fuerza normal es igual al peso.</p>',
        solucion: '<p>N = P = 10 × 9.8 = <strong>98 N</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si el coeficiente de fricción es 0.4 y la fuerza normal es 200 N, ¿cuánto vale la fricción, en N?</p>', respuesta: 0.4 * 200,
        pista: '<p>Usa f = μ·N.</p>',
        solucion: '<p>f = 0.4 × 200 = <strong>80 N</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un ropero de 50 kg tiene un coeficiente de fricción estático de 0.6 con el piso. ¿Con cuántos newtons, como mínimo, hay que empujarlo para que arranque? Usa g = 9.8 m/s².</p>', respuesta: 0.6 * 50 * 9.8,
        pista: '<p>Calcula primero la fuerza normal y luego el límite de la fricción estática.</p>',
        solucion: '<p>N = 50 × 9.8 = 490 N, y f = 0.6 × 490 = <strong>294 N</strong>. Hay que empujar con un poco más que eso.</p>' },
      { tipo: 'numero', enunciado: '<p>Empujas una caja de 10 kg con 50 N y ya se está deslizando. El coeficiente de fricción cinético es 0.2. ¿Cuál es su aceleración, en m/s²? Usa g = 9.8 m/s².</p>', respuesta: (50 - 0.2 * 10 * 9.8) / 10, tolerancia: 0.05,
        pista: '<p>Calcula la fricción, réstala de tu empuje para obtener la fuerza neta y usa a = F ÷ m.</p>',
        solucion: '<p>La fricción es 0.2 × 98 = 19.6 N. La fuerza neta es 50 − 19.6 = 30.4 N, y a = 30.4 ÷ 10 = <strong>3.04 m/s²</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué cuesta más arrancar un mueble que mantenerlo en movimiento?</p>',
        opciones: ['Porque el mueble pesa más cuando está quieto.', 'Porque el límite de la fricción estática es mayor que la fricción cinética.', 'Porque el aire lo frena al arrancar.', 'Porque la fuerza normal desaparece al moverse.'], correcta: 1,
        pista: '<p>Compara los dos tipos de fricción.</p>',
        solucion: '<p>Para arrancar hay que vencer el <strong>límite de la fricción estática, que es mayor que la cinética</strong>. Una vez que se desliza, el roce es menor.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas acciones <em>disminuye</em> la fricción?</p>',
        opciones: ['Ponerle arena a una banqueta congelada', 'Ponerle aceite a una bisagra', 'Usar zapatos con suela de hule', 'Cargar más peso sobre una caja'], correcta: 1,
        pista: '<p>Busca la opción que hace que las superficies se deslicen mejor.</p>',
        solucion: '<p>El <strong>aceite</strong> forma una capa entre las piezas y las deja deslizar mejor. La arena y el hule aumentan la fricción, y más peso aumenta la fuerza normal.</p>' },
    ],
    fuentes: [OSC('5-1-friction', 'Friction'), WIKI('Fricción', 'Fricción'), PHET],
  });

  // ------------------------------------------------------------------
  L('Gravitación universal', {
    objetivo: 'Entender que todos los objetos con masa se atraen y predecir cómo cambia esa atracción con las masas y la distancia.',
    explicacion: `
      <p>Una manzana cae del árbol, y la Luna da vueltas alrededor de la Tierra. Parecen dos cosas sin relación, pero Isaac Newton se dio cuenta de que la misma fuerza explica las dos: la Tierra jala a la manzana y también jala a la Luna. La Luna no cae al suelo porque se mueve de lado muy rápido; va "cayendo" alrededor de la Tierra todo el tiempo, como en el movimiento circular de la Unidad 2.</p>
      <h3>¿Quién atrae a quién?</h3>
      <p>Newton fue más allá: no solo la Tierra atrae cosas. Cualquier par de objetos con masa se atrae: tú y tu mesa, el Sol y la Tierra, dos granos de arena. A esa atracción se le llama <strong>gravitación universal</strong>, porque ocurre en todo el universo. Por la tercera ley, la fuerza es igual para los dos: tú jalas a la Tierra con la misma fuerza con la que ella te jala a ti, pero la Tierra tiene tanta masa que no se nota que se mueva.</p>
      <h3>¿De qué depende la atracción?</h3>
      <p>Depende de dos cosas: las masas y la distancia entre ellas. Newton lo escribió así:</p>
      <p>F = G · ${F('m₁ · m₂', 'r²')}</p>
      <p>Se lee "la fuerza es G por la primera masa por la segunda masa, entre la distancia al cuadrado". m₁ y m₂ son <strong>las masas de los dos objetos</strong>, r es <strong>la distancia entre sus centros</strong>, y G es un número fijo, igual en todo el universo, llamado <strong>constante de gravitación universal</strong>:</p>
      <p>G = 6.67 × 10⁻¹¹ N·m²/kg²</p>
      <p>Es un número diminuto, escrito con la notación científica que viste en Matemáticas: 0.0000000000667. Por eso la atracción entre dos personas es tan débil que no la sientes. Solo se nota cuando una de las masas es enorme, como un planeta.</p>
      <h3>Más masa, más atracción</h3>
      <p>Las masas multiplican arriba. Si una de ellas se duplica, la fuerza se duplica; si se triplica, la fuerza se triplica.</p>
      <h3>Más lejos, mucho menos atracción</h3>
      <p>La distancia divide, y además está al cuadrado. Si te alejas al doble, la fuerza no baja a la mitad, sino a la cuarta parte, porque 2² = 4. Al triple de distancia, baja a la novena parte, porque 3² = 9.</p>
      <p>¿Por qué al cuadrado? Piensa en un aerosol de pintura. Si lo alejas al doble de la pared, la mancha sale el doble de ancha y el doble de alta, así que ocupa cuatro veces más área. La misma pintura repartida en un área cuatro veces mayor queda cuatro veces más tenue. La atracción de la gravedad se reparte de la misma forma al alejarse.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que al doble de distancia la fuerza baja a la mitad. Como la distancia está al cuadrado, baja a la cuarta parte.</p>`,
    ejemplo: `
      <p>Dos personas de 70 kg y 60 kg están a 1 m de distancia. ¿Con cuánta fuerza se atraen? Compáralo con el peso de una manzana chica, que es de 1 N.</p>
      <ol class="pasos-ej">
        <li>Primero multiplica las masas, porque las dos van arriba: 70 × 60 = 4 200.</li>
        <li>Divide entre la distancia al cuadrado. Como r = 1 m, r² = 1 y el número no cambia: 4 200.</li>
        <li>Multiplica por G: 6.67 × 10⁻¹¹ × 4 200 ≈ 2.8 × 10⁻⁷ N, es decir, 0.00000028 N.</li>
        <li>Compara: la manzana pesa 1 N, unas 3.5 millones de veces más. Por eso no sientes que la otra persona te jale.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 2.8 × 10⁻⁷ N, una fuerza tan pequeña que no se siente</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar elevar la distancia al cuadrado. Aquí no se notó porque r = 1, pero a 2 m la fuerza sería la cuarta parte, no la mitad.</p>`,
    vidaReal: `
      <p>La misma atracción que te mantiene en el piso organiza el cielo:</p>
      <ul>
        <li>Mantiene a la Luna dando vueltas alrededor de la Tierra y a la Tierra alrededor del Sol.</li>
        <li>La atracción de la Luna sobre los océanos produce las mareas que suben y bajan en la playa.</li>
        <li>Los satélites de GPS y de televisión se colocan a la distancia justa para no caer ni escaparse.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Dos objetos se atraen con cierta fuerza. Si la masa de uno de ellos se triplica y la distancia no cambia, ¿por cuánto se multiplica la fuerza?</p>', respuesta: 3,
        pista: '<p>Las masas multiplican en la fórmula.</p>',
        solucion: '<p>La fuerza es proporcional a cada masa, así que si una se triplica, la fuerza se multiplica por <strong>3</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si la distancia entre dos objetos se duplica, ¿entre cuánto se divide la fuerza de atracción?</p>', respuesta: 4,
        pista: '<p>La distancia está al cuadrado en la fórmula.</p>',
        solucion: '<p>Al doble de distancia, r² se vuelve 2² = 4 veces más grande, así que la fuerza se divide entre <strong>4</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si la distancia entre dos objetos se triplica, ¿entre cuánto se divide la fuerza de atracción?</p>', respuesta: 9,
        pista: '<p>Eleva al cuadrado el número de veces que creció la distancia.</p>',
        solucion: '<p>3² = 9, así que la fuerza se divide entre <strong>9</strong>: queda en la novena parte.</p>' },
      { tipo: 'numero', enunciado: '<p>Las dos masas se duplican y la distancia también se duplica. ¿Por cuánto se multiplica la fuerza?</p>', respuesta: 2 * 2 / 2 ** 2,
        pista: '<p>Calcula por separado lo que hacen las masas (arriba) y lo que hace la distancia (abajo).</p>',
        solucion: '<p>Las masas multiplican la fuerza por 2 × 2 = 4, y la distancia la divide entre 2² = 4. El resultado es 4 ÷ 4 = <strong>1</strong>: la fuerza no cambia.</p>' },
      { tipo: 'numero', enunciado: '<p>Dos coches de 1 000 kg cada uno están a 1 m de distancia. ¿Con cuánta fuerza se atraen, en N? Usa G = 6.67 × 10⁻¹¹ N·m²/kg². Puedes escribir la respuesta con notación científica, por ejemplo 2×10^-5.</p>', respuesta: 6.67e-11 * 1000 * 1000 / 1 ** 2, tolerancia: 0.005e-5,
        pista: '<p>Multiplica las masas, divide entre 1² y multiplica por G.</p>',
        solucion: '<p>1 000 × 1 000 = 10⁶, y 6.67 × 10⁻¹¹ × 10⁶ = <strong>6.67 × 10⁻⁵ N</strong>, una fuerza diminuta.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tú y tu amigo tienen masa, así que se atraen. ¿Por qué no lo notan?</p>',
        opciones: ['Porque la gravedad solo actúa entre planetas.', 'Porque sus masas son muy pequeñas comparadas con la de la Tierra, y G es diminuta.', 'Porque el aire cancela la atracción.', 'Porque la fuerza solo existe si se tocan.'], correcta: 1,
        pista: '<p>Mira el tamaño de G y piensa en qué masa sí produce una fuerza que se nota.</p>',
        solucion: '<p>La atracción existe, pero <strong>sus masas son pequeñas y G es diminuta</strong>, así que la fuerza es de millonésimas de newton. Solo con masas enormes, como la de la Tierra, se vuelve notable.</p>' },
    ],
    fuentes: [OSC('6-5-newtons-universal-law-of-gravitation', "Newton's Universal Law of Gravitation"), WIKI('Ley_de_gravitación_universal', 'Ley de gravitación universal'), { nombre: 'PhET, Universidad de Colorado: Laboratorio de fuerza gravitacional', url: 'https://phet.colorado.edu/es/simulations/gravity-force-lab' }],
  });
})();
