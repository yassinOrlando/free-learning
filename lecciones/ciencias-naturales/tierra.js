// Ciencias naturales · Unidad 6: La Tierra.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Traslapes: tiempo y clima, y la composición del aire, ya están en Ecología; el ozono, en Química.
// Lo que hay que hacer en una emergencia sale solo de fuentes oficiales (Ready.gov en español, OMS, UNDRR).
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
  const caja = (x0, y0, x1, y1, relleno = false) => ({ tipo: 'poligono', puntos: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], relleno });

  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const PHET = (sim, nombre) => ({ nombre: `PhET, Universidad de Colorado: ${nombre}`, url: `https://phet.colorado.edu/es/simulations/${sim}` });
  const OMS = (tema, nombre) => ({ nombre: `Organización Mundial de la Salud: ${nombre}`, url: `https://www.who.int/es/health-topics/${tema}` });
  const USGS = (pagina, nombre) => ({ nombre: `Servicio Geológico de Estados Unidos (USGS), This Dynamic Earth: ${nombre}`, url: `https://pubs.usgs.gov/gip/dynamic/${pagina}.html` });
  const SGM = (ruta, nombre) => ({ nombre: `Servicio Geológico Mexicano, Museo Virtual: ${nombre}`, url: `https://www.sgm.gob.mx/Web/MuseoVirtual/${ruta}.html` });
  const NASA = (ruta, nombre) => ({ nombre: `NASA Space Place en español: ${nombre}`, url: `https://spaceplace.nasa.gov/${ruta}/sp/` });
  const READY = (ruta, nombre) => ({ nombre: `Ready.gov en español: ${nombre}`, url: `https://www.ready.gov/es/${ruta}` });

  // ------------------------------------------------------------------
  // Capas a escala en miles de km: núcleo interno 1.22, núcleo externo hasta 3.48, manto y corteza hasta 6.37.
  const punto = (r, grados) => [r * Math.cos((grados * Math.PI) / 180), r * Math.sin((grados * Math.PI) / 180)];
  const CAPAS = diagrama([-6.6, 13.4], [0, 6.8], [
    { tipo: 'circulo', x: 0, y: 0, r: 6.37 },
    { tipo: 'circulo', x: 0, y: 0, r: 3.48, relleno: true },
    { tipo: 'circulo', x: 0, y: 0, r: 1.22, relleno: true },
    { tipo: 'linea', desde: [-6.37, 0], hasta: [6.37, 0] },
    txt(0, -0.5, 'centro'),
    txt(10.4, 6.0, 'corteza'), ...flecha([7.6, 6.0], punto(6.37, 70), 0, 1.8),
    txt(10.4, 4.4, 'manto'), ...flecha([7.6, 4.4], punto(5, 50), 0, 1.8),
    txt(10.4, 2.8, 'núcleo externo'), ...flecha([7.4, 2.8], punto(2.4, 30), 0, 1.8),
    txt(10.4, 1.2, 'núcleo interno'), ...flecha([7.4, 1.2], punto(0.75, 15), 0, 1.8),
  ], 'Media Tierra cortada, a escala. El borde de afuera es la corteza, tan delgada que es solo una línea. Debajo, la franja más ancha es el manto, que llega hasta unos 2 900 km de profundidad. Luego un semicírculo sombreado, el núcleo externo, líquido, y en el centro otro semicírculo sombreado más pequeño, el núcleo interno, sólido. Cada capa tiene su rótulo con una flecha.');

  L('Capas de la Tierra', {
    objetivo: 'Describir las capas de la Tierra, saber de qué están hechas y entender cómo las conocemos sin haber llegado a ellas.',
    explicacion: `
      <p>Si partes un aguacate a la mitad, ves tres partes: una cáscara delgada, la pulpa gruesa y un hueso en el centro. La Tierra por dentro se parece: también tiene una capa delgada por fuera, una muy gruesa en medio y un centro.</p>
      <p>Lo curioso es que nadie ha ido a ver. El pozo más profundo que se ha excavado, en Rusia, llega a unos 12 km, y el centro de la Tierra está a unos 6 370 km. Es como rascar la cáscara de una manzana sin llegar siquiera a la pulpa. ¿Cómo sabemos, entonces, qué hay adentro?</p>
      <h3>Escuchar a los sismos</h3>
      <p>En Física viste que las ondas cambian de rapidez y de dirección cuando pasan de un material a otro, como la luz al entrar al agua. Los sismos producen ondas que atraviesan todo el planeta. Al medirlas en estaciones de todo el mundo, los científicos descubrieron a qué profundidad cambia el material, e incluso que una parte del centro es líquida: hay ondas que no pueden viajar por líquidos, y no logran cruzarla.</p>
      <h3>Las capas</h3>
      ${CAPAS}
      <p>La <strong>corteza</strong> es la capa de roca sólida de la superficie, donde vivimos. Es muy delgada comparada con el resto: bajo los océanos mide unos 5 km, y bajo los continentes, unos 30 km en promedio, y más bajo las montañas altas. En el dibujo es apenas la línea de afuera.</p>
      <p>El <strong>manto</strong> es la capa gruesa que sigue, y llega hasta unos 2 900 km de profundidad. Es roca muy caliente que, aunque es sólida, se deforma y fluye muy despacio a lo largo de millones de años, como la plastilina. Ese movimiento lento, causado por el calor de adentro, es la convección que viste en Física, y es lo que mueve la corteza, como verás en la próxima lección.</p>
      <p>El <strong>núcleo terrestre</strong> es el centro de la Tierra, hecho sobre todo de hierro y níquel. No tiene que ver con el núcleo de la célula: solo comparten el nombre, que quiere decir "centro". Tiene dos partes. El núcleo externo es líquido y mide unos 2 200 km de grosor; el hierro que se mueve en él produce el campo magnético que hace funcionar las brújulas. El núcleo interno es una bola sólida de unos 1 250 km de radio, a unos 5 400 °C, casi tan caliente como la superficie del Sol. Es sólido a pesar del calor porque ahí la presión es enorme.</p>
      <p>Fíjate en un patrón: mientras más profundo, más calor y más presión. Además, los materiales más densos, como el hierro, se fueron al centro, y los menos densos quedaron arriba, igual que el aceite flota sobre el agua.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que bajo la corteza hay un mar de lava. El manto es casi todo sólido; solo se derrite en algunas zonas, y de ahí sale el magma de los volcanes.</p>`,
    ejemplo: `
      <p>El pozo más profundo mide unos 12 km, y el centro de la Tierra está a unos 6 370 km. ¿Qué porcentaje del camino hasta el centro se ha excavado?</p>
      <ol class="pasos-ej">
        <li>Divide lo excavado entre la distancia total: 12 ÷ 6 370 ≈ 0.0019.</li>
        <li>Multiplica por 100 para pasarlo a porcentaje: 0.0019 × 100 ≈ 0.19%.</li>
        <li>Comprueba al revés: el 0.19% de 6 370 es 0.0019 × 6 370 ≈ 12 km.</li>
        <li>Imagínalo: si la Tierra fuera un balón de 30 cm, con un radio de 15 cm, el pozo sería un rasguño de apenas 0.3 mm.</li>
      </ol>
      <p>Resultado: <span class="resultado">alrededor del 0.19% del camino</span>, ni siquiera una quinta parte del uno por ciento. Por eso lo que sabemos del interior viene de las ondas de los sismos.</p>
      <p class="nota"><strong>Error común:</strong> dividir al revés, 6 370 ÷ 12. Eso dice cuántas veces cabe el pozo en el radio, no qué parte se ha recorrido.</p>`,
    vidaReal: `
      <p>Lo que pasa bajo tus pies se nota en la superficie:</p>
      <ul>
        <li>Las brújulas funcionan gracias al hierro líquido que se mueve en lo profundo del planeta.</li>
        <li>En algunos lugares, el calor de las profundidades se usa para producir electricidad en plantas geotérmicas.</li>
        <li>Los aparatos que registran sismos ayudan a dar la alerta en algunas ciudades.</li>
        <li>Los metales que usamos se sacan de la capa delgada de roca donde vivimos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>La corteza bajo los continentes mide unos 30 km, y el radio de la Tierra, unos 6 370 km. ¿Qué porcentaje del radio es la corteza? Redondea a dos decimales.</p>', respuesta: 30 / 6370 * 100, tolerancia: 0.01,
        pista: '<p>Divide el grosor de la corteza entre el radio y multiplica por 100.</p>',
        solucion: '<p>30 ÷ 6 370 × 100 ≈ <strong>0.47%</strong>: menos de la mitad del uno por ciento.</p>' },
      { tipo: 'numero', enunciado: '<p>Bajo un continente, el manto empieza a unos 30 km de profundidad y termina a unos 2 900 km. ¿Cuántos kilómetros de grosor tiene ahí el manto?</p>', respuesta: 2900 - 30,
        pista: '<p>Resta la profundidad donde empieza a la profundidad donde termina.</p>',
        solucion: '<p>2 900 − 30 = <strong>2 870 km</strong>, casi la mitad del camino al centro.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué capa de la Tierra es líquida?</p>',
        opciones: ['El núcleo interno', 'El núcleo externo', 'La corteza'], correcta: 1,
        pista: '<p>Algunas ondas de los sismos no pueden cruzarla.</p>',
        solucion: '<p>El <strong>núcleo externo</strong>. El núcleo interno es sólido por la enorme presión, y la corteza es roca sólida.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cómo saben los científicos qué hay dentro de la Tierra?</p>',
        opciones: ['Por las ondas de los sismos que atraviesan el planeta', 'Porque se ha excavado hasta el centro', 'Por rocas que los volcanes lanzan desde el núcleo'], correcta: 0,
        pista: '<p>El pozo más profundo llega a solo 12 km.</p>',
        solucion: '<p><strong>Por las ondas de los sismos</strong>, que cambian al pasar de un material a otro.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la capa delgada de roca de la superficie, donde vivimos?</p>', respuestas: ['corteza', 'la corteza', 'corteza terrestre', 'la corteza terrestre'],
        pista: '<p>Es como la cáscara del aguacate.</p>',
        solucion: '<p>La <strong>corteza</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el hierro quedó en el centro de la Tierra?</p>',
        opciones: ['Porque es magnético', 'Porque se formó al último', 'Porque es más denso que las rocas de arriba'], correcta: 2,
        pista: '<p>Piensa en el aceite y el agua.</p>',
        solucion: '<p>Porque <strong>es más denso</strong>: lo más denso se va al fondo y lo menos denso queda arriba.</p>' },
    ],
    fuentes: [
      USGS('inside', 'Inside the Earth'),
      SGM('Planeta/Origen-del-planeta', 'Origen del planeta'),
      WIKI('Estructura_interna_de_la_Tierra', 'Estructura interna de la Tierra'),
      WIKI('Corteza_terrestre', 'Corteza terrestre'),
      WIKI('Pozo_superprofundo_de_Kola', 'Pozo superprofundo de Kola'),
    ],
  });

  // ------------------------------------------------------------------
  L('Placas tectónicas, sismos y volcanes', {
    objetivo: 'Explicar por qué se mueven las placas de la corteza y cómo ese movimiento produce sismos, montañas y volcanes.',
    explicacion: `
      <p>Si golpeas un huevo duro contra la mesa, el cascarón se rompe en pedazos que siguen cubriendo el huevo. La capa de afuera de la Tierra está rota de una forma parecida. Por eso en algunos lugares tiembla seguido y en otros casi nunca.</p>
      <h3>Un rompecabezas que se mueve</h3>
      <p>Una <strong>placa tectónica</strong> es uno de los grandes pedazos en que está partida la capa rígida de la superficie, formada por la corteza y la parte de arriba del manto. Hay siete placas muy grandes y varias más pequeñas, que encajan como un rompecabezas.</p>
      <p>Las placas se mueven sobre el manto, que fluye despacio por el calor de adentro. Avanzan unos pocos centímetros al año, más o menos lo que crecen tus uñas. Parece nada, pero en millones de años suman miles de kilómetros: hace unos 200 millones de años, los continentes estaban juntos en uno solo, llamado Pangea. Por eso la costa de Sudamérica y la de África encajan como dos piezas.</p>
      <h3>Lo que pasa en los bordes</h3>
      <p>Casi todo ocurre donde se tocan dos placas. Hay tres tipos de borde:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Borde</th><th>Cómo se mueven</th><th>Qué produce</th></tr>
        <tr><th>Divergente</th><td>Se separan</td><td>Nuevo fondo marino y volcanes bajo el mar, como en medio del océano Atlántico</td></tr>
        <tr><th>Convergente</th><td>Chocan</td><td>Montañas como el Himalaya, o una placa se hunde bajo la otra y se forman volcanes, como en los Andes</td></tr>
        <tr><th>Transformante</th><td>Se deslizan de lado</td><td>Sismos frecuentes, como en la falla de San Andrés, en California</td></tr>
      </table></div>
      <p>Muchos bordes rodean el océano Pacífico. Por eso a esa franja, donde están Chile, Perú, México, Japón e Indonesia, se le llama Cinturón de Fuego: ahí ocurren la mayoría de los sismos y volcanes del mundo.</p>
      <h3>Sismos</h3>
      <p>Las placas no se deslizan suavemente: se atoran, y la tensión se acumula durante años, como cuando doblas una regla. Cuando la roca ya no aguanta, se rompe y se suelta de golpe, y la energía viaja en ondas que sacuden el suelo. Eso es un sismo. El punto bajo tierra donde se rompe la roca se llama hipocentro, y el punto de la superficie justo encima es el <strong>epicentro</strong>, donde suele sentirse más fuerte.</p>
      <p>Las primeras ondas en llegar, las P, empujan y jalan la roca, como un resorte. Después llegan las S, más lentas, que la sacuden de lado, como cuando agitas una cuerda. Las alertas sísmicas aprovechan la ventaja: detectan el sismo cerca de donde empieza y avisan a ciudades lejanas segundos antes de que llegue la sacudida fuerte.</p>
      <p>La <strong>magnitud</strong> mide cuánta energía soltó un sismo. Cada número más en la escala significa unas 32 veces más energía, así que dos números más son unas 32 × 32 ≈ 1 000 veces más.</p>
      <h3>Volcanes</h3>
      <p>Donde una placa se hunde bajo otra, o donde dos se separan, parte del manto se derrite y forma magma, roca fundida que sube porque es menos densa. Cuando sale a la superficie se llama lava. Los volcanes también lanzan gases y ceniza.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que la magnitud dice qué tanto se movió el suelo donde estás. Cada sismo tiene una sola magnitud; lo que sientes depende además de qué tan lejos estás del epicentro y del tipo de suelo.</p>`,
    ejemplo: `
      <p>En la falla de San Andrés, una placa se desliza junto a otra unos 5 cm al año. ¿Cuántos kilómetros se mueve en un millón de años?</p>
      <ol class="pasos-ej">
        <li>Multiplica la rapidez por el tiempo, como en Física: 5 cm × 1 000 000 = 5 000 000 cm.</li>
        <li>Pasa los centímetros a kilómetros. Un metro tiene 100 cm y un kilómetro tiene 1 000 m, así que un kilómetro tiene 100 × 1 000 = 100 000 cm.</li>
        <li>Divide: 5 000 000 ÷ 100 000 = 50 km.</li>
        <li>Comprueba con notación científica: 5 × 10⁶ cm ÷ 10⁵ cm por km = 5 × 10 = 50 km.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 50 km en un millón de años</span>. Para la Tierra, un millón de años es poco tiempo, y por eso los continentes han cambiado tanto de lugar.</p>
      <p class="nota"><strong>Error común:</strong> pensar que un kilómetro tiene 1 000 cm. Tiene 100 000; con 1 000 saldrían 5 000 km, cien veces más.</p>`,
    vidaReal: `
      <p>El movimiento del suelo influye en cómo vivimos:</p>
      <ul>
        <li>La alerta sísmica de algunas ciudades da unos segundos para protegerte antes de que llegue la sacudida.</li>
        <li>En las zonas que tiemblan, los edificios se construyen para mecerse sin caerse.</li>
        <li>Las tierras cerca de los volcanes suelen ser muy fértiles por la ceniza que las cubre.</li>
        <li>El calor de las zonas volcánicas da aguas termales y, en algunos lugares, electricidad.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una placa avanza 3 cm al año. ¿Cuántos kilómetros recorre en 2 millones de años?</p>', respuesta: 3 * 2e6 / 1e5,
        pista: '<p>Multiplica y luego divide entre 100 000, los centímetros que tiene un kilómetro.</p>',
        solucion: '<p>3 × 2 000 000 = 6 000 000 cm, y 6 000 000 ÷ 100 000 = <strong>60 km</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si cada grado de magnitud libera 32 veces más energía, ¿cuántas veces más energía libera un sismo de magnitud 8 que uno de magnitud 6?</p>', respuesta: 32 * 32, tolerancia: 30,
        pista: '<p>Son dos grados de diferencia: multiplica por 32 dos veces.</p>',
        solucion: '<p>32 × 32 = <strong>1 024 veces</strong>, es decir, unas mil veces más.</p>' },
      { tipo: 'opciones', enunciado: '<p>Dos placas chocan y levantan la cordillera del Himalaya. ¿Qué tipo de borde es?</p>',
        opciones: ['Divergente', 'Transformante', 'Convergente'], correcta: 2,
        pista: '<p>Revisa la tabla: ¿en cuál chocan?</p>',
        solucion: '<p><strong>Convergente</strong>, porque las placas chocan.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es el epicentro de un sismo?</p>',
        opciones: ['El punto bajo tierra donde se rompe la roca', 'El punto de la superficie justo encima de donde se rompe la roca', 'La ciudad donde hubo más daños'], correcta: 1,
        pista: '<p>"Epi" quiere decir "encima".</p>',
        solucion: '<p>Es <strong>el punto de la superficie justo encima</strong> de donde se rompe la roca. El punto bajo tierra se llama hipocentro.</p>' },
      { tipo: 'numero', enunciado: '<p>Las ondas S viajan a unos 4 km por segundo. ¿Cuántos segundos tardan en llegar a una ciudad a 200 km del epicentro?</p>', respuesta: 200 / 4,
        pista: '<p>Tiempo = distancia ÷ rapidez.</p>',
        solucion: '<p>200 ÷ 4 = <strong>50 segundos</strong>. Por eso una alerta puede avisar antes de la sacudida fuerte.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué sube el magma hacia la superficie?</p>',
        opciones: ['Porque es menos denso que la roca que lo rodea', 'Porque lo empuja el viento', 'Porque es más pesado que la roca'], correcta: 0,
        pista: '<p>Piensa en el aceite que sube en el agua.</p>',
        solucion: '<p>Porque <strong>es menos denso</strong> que la roca sólida que lo rodea.</p>' },
    ],
    fuentes: [
      USGS('understanding', 'Understanding plate motions'),
      USGS('slabs', 'Plate tectonics'),
      SGM('Riesgos-geologicos/Introduccion-tectonica', 'Introducción a la tectónica'),
      SGM('Riesgos-geologicos/Sismologia-de-Mexico', 'Sismología de México'),
      SGM('Riesgos-geologicos/Riesgo-volcanico', 'Riesgo volcánico'),
      NASA('earthquakes', '¿Qué es un terremoto?'),
      NASA('volcanoes', 'Volcanes'),
      WIKI('Tectónica_de_placas', 'Tectónica de placas'),
      WIKI('Cinturón_de_Fuego_del_Pacífico', 'Cinturón de Fuego del Pacífico'),
      WIKI('Magnitud_de_momento', 'Magnitud de momento'),
      PHET('plate-tectonics', 'Tectónica de placas'),
    ],
  });

  // ------------------------------------------------------------------
  const CICLO_ROCAS = diagrama([-1.6, 12], [-0.9, 5.4], [
    caja(3.2, 4, 6.8, 5), txt(5, 4.5, 'roca ígnea'),
    caja(-0.6, 0, 3.8, 1), txt(1.6, 0.5, 'roca sedimentaria'),
    caja(6.2, 0, 10.6, 1), txt(8.4, 0.5, 'roca metamórfica'),
    ...flecha([3.4, 4], [1.6, 1], 0, 0.8), txt(0.4, 3.05, 'erosión y'), txt(0.4, 2.55, 'compactación'),
    ...flecha([3.8, 0.5], [6.2, 0.5], 0, 0.8), txt(5, -0.4, 'calor y presión'),
    ...flecha([8.4, 1], [6.6, 4], 0, 0.8), txt(10.2, 3.05, 'se funde'), txt(10.2, 2.55, 'y se enfría'),
  ], 'Ciclo de las rocas simplificado, con tres cajas y tres flechas. De la roca ígnea baja una flecha rotulada erosión y compactación hasta la roca sedimentaria. De la sedimentaria, una flecha rotulada calor y presión va a la roca metamórfica. De la metamórfica sube una flecha rotulada se funde y se enfría hasta la roca ígnea.');

  L('Rocas y minerales', {
    objetivo: 'Distinguir los minerales de las rocas, reconocer los tres tipos de roca y entender cómo una se convierte en otra.',
    explicacion: `
      <p>Mira a tu alrededor: el cemento de las paredes, el vidrio de la ventana, la sal de la mesa y los metales de tu celular salieron del suelo. Casi todo lo sólido del planeta está hecho de rocas, y las rocas, de minerales.</p>
      <h3>Minerales: los ingredientes</h3>
      <p>Un <strong>mineral</strong> es un sólido natural, que no viene de seres vivos, con una composición química fija y con sus átomos acomodados en un orden que se repite, como en los cristales de sal que viste en Química. La sal de mesa es un mineral, la halita, y el cuarzo de la arena es otro. Se conocen miles.</p>
      <p>Para reconocerlos se miran su color, su brillo y, sobre todo, su dureza: qué tan difícil es rayarlos. La escala de Mohs ordena los minerales del 1 al 10. Un mineral raya a los de número menor, y lo rayan los de número mayor.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Dureza</th><th>Mineral</th><th>Cómo reconocerlo</th></tr>
        <tr><th>1</th><td>Talco</td><td>Se raya con la uña</td></tr>
        <tr><th>2</th><td>Yeso</td><td>También se raya con la uña</td></tr>
        <tr><th>5</th><td>Apatito</td><td>Lo raya una navaja de acero</td></tr>
        <tr><th>7</th><td>Cuarzo</td><td>Raya el vidrio</td></tr>
        <tr><th>10</th><td>Diamante</td><td>Raya a todos los demás</td></tr>
      </table></div>
      <h3>Rocas: las mezclas</h3>
      <p>Una <strong>roca</strong> es un material sólido natural formado por uno o varios minerales juntos. El granito de muchas cocinas, por ejemplo, tiene granos de cuarzo, feldespato y mica que se ven a simple vista. Según cómo se formaron, las rocas son de tres tipos:</p>
      <ul>
        <li>Las ígneas se forman cuando el magma o la lava se enfrían y se endurecen. Si se enfrían despacio, bajo tierra, quedan cristales grandes, como en el granito. Si se enfrían rápido, al salir del volcán, quedan cristales diminutos o ninguno, como en el basalto o en la obsidiana, que parece vidrio.</li>
        <li>Las sedimentarias se forman con pedacitos de otras rocas, arena, lodo o conchas que se acumulan en capas, casi siempre en el fondo del agua, y que con el peso se compactan y se pegan. Son las que guardan fósiles. La arenisca y la caliza son de este tipo.</li>
        <li>Las metamórficas son rocas que se transformaron por el calor y la presión de las profundidades, sin llegar a derretirse. La caliza se convierte en mármol, y el lodo endurecido, en pizarra.</li>
      </ul>
      <h3>El ciclo de las rocas</h3>
      <p>Las rocas no son eternas. El <strong>ciclo de las rocas</strong> es el camino lento por el que una roca se convierte en otra a lo largo de millones de años:</p>
      ${CICLO_ROCAS}
      <p>El viento, el agua y el hielo desgastan las rocas en pedacitos; a eso se le llama erosión. Los pedacitos se acumulan y forman roca sedimentaria. Si queda enterrada muy profundo, el calor y la presión la vuelven metamórfica. Y si se calienta todavía más, se funde en magma, que al enfriarse forma roca ígnea. Ese es el camino más común, pero hay atajos: cualquier roca puede desgastarse, transformarse o fundirse. Lo mueven el calor de adentro de la Tierra y el Sol, que impulsa el viento y la lluvia.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir roca y mineral. Un mineral es una sola sustancia con una composición fija; una roca es una mezcla de minerales, como una ensalada es una mezcla de ingredientes.</p>`,
    ejemplo: `
      <p>Una cubierta de cocina de granito mide 200 cm de largo, 60 cm de ancho y 2 cm de grosor. El granito tiene una densidad de unos 2.7 g/cm³. ¿Cuánto pesa la cubierta?</p>
      <ol class="pasos-ej">
        <li>Primero calcula el volumen multiplicando las tres medidas: 200 × 60 × 2 = 24 000 cm³.</li>
        <li>En Física viste que masa = densidad × volumen: 2.7 × 24 000 = 64 800 g.</li>
        <li>Pásalo a kilogramos dividiendo entre 1 000: 64.8 kg.</li>
        <li>Comprueba por otro camino: 24 000 cm³ son 24 litros, y si cada litro de granito pesa 2.7 kg, 24 × 2.7 = 64.8 kg.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 64.8 kg</span>, lo que pesa una persona adulta. Por eso se necesitan dos o tres personas para cargarla.</p>
      <p class="nota"><strong>Error común:</strong> olvidar una de las tres medidas al calcular el volumen. Un objeto con largo, ancho y grosor necesita las tres.</p>`,
    vidaReal: `
      <p>Lo que sale del suelo está en todas partes:</p>
      <ul>
        <li>El cemento, el vidrio y la cal de las construcciones se fabrican con materiales que se sacan del suelo.</li>
        <li>Los fósiles que a veces se ven en la piedra caliza cuentan la historia de mares muy antiguos.</li>
        <li>Quienes trabajan con piedras preciosas las reconocen por su brillo y por lo difíciles que son de rayar.</li>
        <li>La arena de la playa es roca desgastada por el agua durante miles de años.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos minerales puede rayar al cuarzo, que tiene dureza 7?</p>',
        opciones: ['El talco', 'El diamante', 'El yeso'], correcta: 1,
        pista: '<p>Solo lo rayan los de número mayor.</p>',
        solucion: '<p>El <strong>diamante</strong>, con dureza 10. El talco y el yeso son más blandos.</p>' },
      { tipo: 'numero', enunciado: '<p>Un cubo de granito mide 10 cm por lado, y el granito tiene una densidad de 2.7 g/cm³. ¿Cuántos gramos pesa?</p>', respuesta: 10 * 10 * 10 * 2.7, tolerancia: 0.1,
        pista: '<p>Calcula el volumen y multiplícalo por la densidad.</p>',
        solucion: '<p>El volumen es 10 × 10 × 10 = 1 000 cm³, y 1 000 × 2.7 = <strong>2 700 g</strong>, es decir, 2.7 kg.</p>' },
      { tipo: 'opciones', enunciado: '<p>La lava de un volcán se enfría rápido al salir y forma una roca negra y brillante. ¿Qué tipo de roca es?</p>',
        opciones: ['Sedimentaria', 'Metamórfica', 'Ígnea'], correcta: 2,
        pista: '<p>Se formó al enfriarse la roca fundida.</p>',
        solucion: '<p><strong>Ígnea</strong>. Como se enfrió rápido, sus cristales son diminutos o no tiene, como la obsidiana.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿En qué tipo de roca es más probable encontrar fósiles?</p>',
        opciones: ['En las sedimentarias', 'En las ígneas', 'En el magma'], correcta: 0,
        pista: '<p>Se forman con capas de lodo y conchas que se acumulan.</p>',
        solucion: '<p>En las <strong>sedimentarias</strong>. En las ígneas, el calor del magma habría destruido los restos.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el sólido natural con una composición química fija y los átomos ordenados, como la sal o el cuarzo?</p>', respuestas: ['mineral', 'un mineral', 'minerales'],
        pista: '<p>Las rocas están hechas de ellos.</p>',
        solucion: '<p>Un <strong>mineral</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una montaña de caliza pierde por erosión unos 0.1 mm al año. ¿Cuántos metros pierde en un millón de años?</p>', respuesta: 0.1 * 1e6 / 1000, tolerancia: 0.01,
        pista: '<p>Multiplica y luego pasa los milímetros a metros: 1 m = 1 000 mm.</p>',
        solucion: '<p>0.1 × 1 000 000 = 100 000 mm, que son <strong>100 m</strong>.</p>' },
    ],
    fuentes: [
      SGM('Rocas/Introduccion-rocas', 'Introducción a las rocas'),
      SGM('Minerales/Los-minerales', 'Los minerales'),
      WIKI('Mineral', 'Mineral'),
      WIKI('Escala_de_Mohs', 'Escala de Mohs'),
      WIKI('Roca', 'Roca'),
      WIKI('Ciclo_litológico', 'Ciclo litológico'),
    ],
  });

  // ------------------------------------------------------------------
  L('Atmósfera, clima y tiempo', {
    objetivo: 'Describir las capas de la atmósfera, explicar por qué hace más frío y hay menos aire a mayor altura, y entender cómo se forman el viento y la lluvia.',
    explicacion: `
      <p>En un avión que vuela a 10 km de altura, afuera de la ventana hace unos 50 grados bajo cero, aunque abajo sea un día de calor. Y si subes a una montaña muy alta, te falta el aire. ¿No debería hacer más calor cerca del Sol?</p>
      <p>La <strong>atmósfera</strong> es la capa de gases que envuelve a la Tierra y que la gravedad mantiene pegada al planeta. En Ecología viste de qué está hecho el aire: sobre todo nitrógeno y oxígeno, más un poco de otros gases, como el vapor de agua y el CO₂. La atmósfera nos da el aire que respiramos, quema muchos de los meteoritos antes de que lleguen al suelo y guarda el calor como una cobija.</p>
      <h3>Las capas del aire</h3>
      <ul>
        <li>La <strong>troposfera</strong> es la capa más baja, desde el suelo hasta unos 12 km de altura. Tiene la mayor parte del aire y casi todo el vapor de agua, y en ella se forman las nubes, la lluvia y el viento.</li>
        <li>La estratosfera llega hasta unos 50 km. Ahí está la capa de ozono que viste en Química, la que nos protege de la luz ultravioleta.</li>
        <li>La mesosfera llega hasta unos 80 km, y en ella se queman la mayoría de los meteoritos, que vemos como estrellas fugaces.</li>
        <li>La termosfera está más arriba, con un aire tan escaso que casi es espacio. Ahí giran muchos satélites y se forman las auroras.</li>
      </ul>
      <h3>¿Por qué hace frío arriba?</h3>
      <p>El Sol casi no calienta el aire directamente: primero calienta el suelo y el mar, y ellos calientan el aire que tienen encima. Por eso, en la troposfera, la temperatura baja en promedio unos 6.5 °C por cada kilómetro que subes:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Altura</th><th>Temperatura aproximada, si abajo hay 15 °C</th></tr>
        <tr><th>0 km</th><td>15 °C</td></tr>
        <tr><th>2 km</th><td>2 °C</td></tr>
        <tr><th>4 km</th><td>−11 °C</td></tr>
        <tr><th>8 km</th><td>−37 °C</td></tr>
        <tr><th>10 km</th><td>−50 °C</td></tr>
      </table></div>
      <h3>El peso del aire</h3>
      <p>El aire pesa. La <strong>presión atmosférica</strong> es la fuerza con que el peso de todo el aire de arriba empuja sobre cada pedazo de superficie, como viste con la presión en Física. Al nivel del mar, sobre cada centímetro cuadrado de tu piel hay tanto aire como para pesar un kilogramo. No te aplasta porque el aire y los líquidos de tu cuerpo empujan igual hacia afuera. Mientras más subes, menos aire queda encima y menor es la presión. Por eso en la cima de una montaña muy alta cada respiración trae menos oxígeno.</p>
      <h3>Viento, nubes y lluvia</h3>
      <p>El suelo no se calienta igual en todas partes. Donde el aire se calienta, se vuelve menos denso y sube, como el humo de una fogata: es la convección que viste en Física. El aire más frío de los alrededores llega a ocupar su lugar, y ese movimiento es el viento. Al subir, el aire se enfría, su vapor se condensa y forma nubes, y si las gotas crecen, llueve, como viste en el ciclo del agua.</p>
      <p>Para describir el tiempo de cada día se usan cinco datos: la temperatura, la presión, la humedad, que es cuánto vapor de agua hay en el aire, el viento y las nubes. En la lección de cambio climático viste la diferencia entre el tiempo de hoy y el clima de muchos años.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que arriba debería hacer más calor por estar más cerca del Sol. Unos kilómetros no cambian casi nada la distancia al Sol, que está a 150 millones de kilómetros. Lo que importa es que el aire de arriba está lejos del suelo que lo calienta.</p>`,
    ejemplo: `
      <p>En la playa hay 28 °C. ¿Qué temperatura habrá, más o menos, en la cima de una montaña de 4 km de altura?</p>
      <ol class="pasos-ej">
        <li>En la troposfera, la temperatura baja unos 6.5 °C por cada kilómetro. Calcula cuánto baja en 4 km: 6.5 × 4 = 26 °C.</li>
        <li>Réstalo a la temperatura de abajo: 28 − 26 = 2 °C.</li>
        <li>Comprueba subiendo de kilómetro en kilómetro: 28 − 6.5 = 21.5; luego 15; luego 8.5; y al cuarto kilómetro, 2 °C.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 2 °C en la cima</span>. Es un promedio: el viento, la hora o las nubes pueden cambiarlo. Aun así, explica por qué algunas montañas altas tienen nieve aunque estén en tierras calurosas.</p>
      <p class="nota"><strong>Error común:</strong> restar 6.5 una sola vez. La temperatura baja 6.5 °C por cada kilómetro, así que hay que multiplicar por los kilómetros que subes.</p>`,
    vidaReal: `
      <p>El aire que te rodea cambia con la altura y con el día:</p>
      <ul>
        <li>Al subir a una montaña conviene llevar abrigo, aunque abajo haga calor.</li>
        <li>Los oídos se te tapan en un avión o en una carretera de montaña porque cambia el empuje del aire.</li>
        <li>Los avisos del tiempo usan datos de temperatura, viento y humedad para saber si va a llover.</li>
        <li>Las brisas de la playa soplan porque la tierra y el mar se calientan distinto durante el día.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Abajo hay 20 °C. Si la temperatura baja 6.5 °C por kilómetro, ¿cuántos grados habrá a 3 km de altura?</p>', respuesta: 20 - 6.5 * 3, tolerancia: 0.01,
        pista: '<p>Calcula cuánto baja en 3 km y réstalo.</p>',
        solucion: '<p>Baja 6.5 × 3 = 19.5 °C, así que quedan 20 − 19.5 = <strong>0.5 °C</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>La troposfera llega a unos 12 km de altura y la estratosfera, a unos 50 km. ¿Cuántos kilómetros de grosor tiene la estratosfera?</p>', respuesta: 50 - 12,
        pista: '<p>La estratosfera empieza donde termina la troposfera.</p>',
        solucion: '<p>50 − 12 = <strong>38 km</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿En qué capa de la atmósfera está la capa de ozono?</p>',
        opciones: ['En la troposfera', 'En la estratosfera', 'En la mesosfera'], correcta: 1,
        pista: '<p>Está por encima de la capa donde se forman las nubes.</p>',
        solucion: '<p>En la <strong>estratosfera</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cómo se forma el viento?</p>',
        opciones: ['El aire caliente sube y el aire más frío llega a ocupar su lugar', 'Los árboles mueven el aire con sus ramas', 'La Luna jala el aire'], correcta: 0,
        pista: '<p>Piensa en la convección.</p>',
        solucion: '<p><strong>El aire caliente sube y el frío ocupa su lugar</strong>. Ese movimiento es el viento.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué baja la presión atmosférica al subir una montaña?</p>',
        opciones: ['Porque hace más frío', 'Porque estás más cerca del Sol', 'Porque queda menos aire encima empujando'], correcta: 2,
        pista: '<p>La presión es el peso del aire de arriba.</p>',
        solucion: '<p>Porque <strong>queda menos aire encima</strong>, así que pesa menos sobre ti.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la capa más baja de la atmósfera, donde se forman las nubes y la lluvia?</p>', respuestas: ['troposfera', 'la troposfera'],
        pista: '<p>Es la capa donde vivimos.</p>',
        solucion: '<p>La <strong>troposfera</strong>.</p>' },
    ],
    fuentes: [
      NASA('atmosphere', 'La atmósfera de la Tierra'),
      WIKI('Atmósfera_terrestre', 'Atmósfera terrestre'),
      WIKI('Presión_atmosférica', 'Presión atmosférica'),
      WIKI('Tiempo_atmosférico', 'Tiempo atmosférico'),
      PHET('gas-properties', 'Propiedades de los gases'),
    ],
  });

  // ------------------------------------------------------------------
  const PASOS_SISMO = [['agáchate', 'sobre manos', 'y rodillas'], ['cúbrete', 'la cabeza', 'y el cuello'], ['agárrate', 'hasta que', 'pase']];
  const SISMO = diagrama([-0.5, 10.1], [-1.3, 1.3], PASOS_SISMO.flatMap(([paso, l1, l2], i) => {
    const x = 3.5 * i;
    return [
      caja(x, 0, x + 2.6, 0.8), txt(x + 1.3, 0.4, `${i + 1}. ${paso}`),
      txt(x + 1.3, -0.4, l1), txt(x + 1.3, -0.9, l2),
      ...(i < 2 ? flecha([x + 2.6, 0.4], [x + 3.5, 0.4], 0, 0.8) : []),
    ];
  }), 'Tres cajas unidas por flechas de izquierda a derecha, con lo que hay que hacer durante un sismo. 1. Agáchate: sobre manos y rodillas. 2. Cúbrete: la cabeza y el cuello. 3. Agárrate: hasta que pase.');

  L('Qué hacer ante desastres naturales', {
    objetivo: 'Saber cómo prepararte y qué hacer antes, durante y después de un sismo, una inundación, un huracán, un tsunami o una erupción.',
    explicacion: `
      <p>Suena la alerta sísmica, o las noticias avisan que se acerca un huracán. En ese momento no hay tiempo de pensar qué hacer: lo que ayuda es haberlo pensado antes. Por eso, prepararse es la parte más importante.</p>
      <h3>Amenaza y riesgo</h3>
      <p>Una <strong>amenaza</strong> es un fenómeno que puede causar daño, como un sismo, un huracán o una erupción. No podemos evitar que la Tierra tiemble o que llueva fuerte. El <strong>riesgo</strong> es la posibilidad de que esa amenaza cause daños, y depende también de qué tan preparados estamos: una casa bien construida, en una zona segura, con una familia que sabe qué hacer, corre mucho menos riesgo. Por eso la preparación cambia el resultado.</p>
      <h3>Antes: el plan</h3>
      <p>Un <strong>plan de emergencia</strong> es lo que tu familia acuerda antes de que pase algo: por dónde salir de casa, dónde reunirse si se separan, a quién llamar y qué llevar. Incluye una mochila con lo básico. Ready.gov, el sitio de preparación del gobierno de Estados Unidos, recomienda tener agua para varios días, unos 4 litros por persona al día para beber y asearse, además de comida que no se eche a perder, linterna, radio de pilas, botiquín, medicinas y copias de documentos. Apréndete también el número de emergencias de tu país.</p>
      <h3>Durante un sismo</h3>
      ${SISMO}
      <p>Si estás bajo techo, quédate adentro: muchas personas se lastiman al intentar salir corriendo mientras el suelo se mueve. Agáchate sobre manos y rodillas, cúbrete la cabeza y el cuello con los brazos o métete bajo una mesa firme, y agárrate hasta que pase. Aléjate de ventanas y de cosas que puedan caer. Si estás en la cama, ponte boca abajo y cúbrete la cabeza y el cuello con la almohada. Si estás afuera, aléjate de edificios, postes y cables. Sigue además los protocolos de tu escuela y de tu ciudad, que practicas en los simulacros.</p>
      <p>Después, revisa si hay personas lastimadas, prepárate para las réplicas, que son temblores más pequeños que siguen al grande, y si el edificio está dañado, sal con cuidado.</p>
      <h3>Agua, viento y fuego</h3>
      <ul>
        <li>En una inundación, nunca camines ni manejes por el agua, aunque parezca tranquila. Según Ready.gov, 15 centímetros de agua que corre pueden derribarte, y 30 centímetros pueden arrastrar un coche. Busca un lugar alto.</li>
        <li>Ante un huracán, conoce tu zona y tu ruta de evacuación, y si las autoridades piden salir, hazlo.</li>
        <li>Si estás en la costa y sientes un sismo fuerte, agáchate, cúbrete y agárrate hasta que pase; en cuanto termine la sacudida, no esperes ninguna alarma: aléjate hacia un terreno alto, lo más lejos posible del mar, porque puede venir un tsunami.</li>
        <li>Si cae ceniza de un volcán, quédate bajo techo, y si tienes que salir, cúbrete la nariz y la boca con una mascarilla, de preferencia del tipo N95.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> pensar que el marco de una puerta es el lugar más seguro durante un sismo. En las casas actuales no es más fuerte que el resto, y la puerta puede golpearte. Es mejor agacharte, cubrirte y agarrarte. En cualquier emergencia, sigue las indicaciones de las autoridades y, si hay personas lastimadas o peligro inmediato, llama al número de emergencias.</p>`,
    ejemplo: `
      <p>Tu familia es de 4 personas y quiere guardar agua para 3 días, a unos 4 litros por persona al día. ¿Cuántos garrafones de 20 litros necesita?</p>
      <ol class="pasos-ej">
        <li>Calcula el agua de un día para toda la familia: 4 personas × 4 litros = 16 litros.</li>
        <li>Multiplica por los días: 16 × 3 = 48 litros.</li>
        <li>Divide entre lo que cabe en un garrafón: 48 ÷ 20 = 2.4 garrafones.</li>
        <li>Como no puedes comprar 0.4 de garrafón y no te debe faltar agua, redondea hacia arriba: 3 garrafones.</li>
        <li>Comprueba: 3 garrafones son 60 litros, y alcanzan para los 48 que necesitas.</li>
      </ol>
      <p>Resultado: <span class="resultado">3 garrafones de 20 litros</span>. Guárdalos en un lugar fresco y revisa de vez en cuando que el agua siga en buen estado.</p>
      <p class="nota"><strong>Error común:</strong> redondear hacia abajo a 2 garrafones. Serían 40 litros, y faltarían 8.</p>`,
    vidaReal: `
      <p>Prepararte con calma hace la diferencia cuando algo pasa:</p>
      <ul>
        <li>Saber por dónde salir de tu casa o tu escuela te ahorra segundos valiosos.</li>
        <li>Tener agua guardada y una linterna con pilas ayuda si se va la luz varios días.</li>
        <li>Acordar con tu familia un lugar de reunión evita angustias si se separan.</li>
        <li>Participar en los simulacros de la escuela te enseña a actuar sin pánico.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una familia de 5 personas quiere guardar agua para 3 días, a 4 litros por persona al día. ¿Cuántos litros necesita?</p>', respuesta: 5 * 3 * 4,
        pista: '<p>Multiplica las personas, los días y los litros.</p>',
        solucion: '<p>5 × 3 × 4 = <strong>60 litros</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos garrafones de 20 litros hacen falta para guardar 60 litros?</p>', respuesta: 60 / 20,
        pista: '<p>Divide los litros entre lo que cabe en un garrafón.</p>',
        solucion: '<p>60 ÷ 20 = <strong>3 garrafones</strong>, justos.</p>' },
      { tipo: 'opciones', enunciado: '<p>Estás en tu salón y empieza un sismo fuerte. ¿Qué haces?</p>',
        opciones: ['Salir corriendo por las escaleras', 'Agacharte, cubrirte la cabeza y el cuello, y agarrarte', 'Pararte junto a la ventana para ver qué pasa'], correcta: 1,
        pista: '<p>Revisa los tres pasos del diagrama.</p>',
        solucion: '<p><strong>Agacharte, cubrirte y agarrarte</strong> hasta que pase. Correr durante el sismo y acercarte a las ventanas aumenta el peligro.</p>' },
      { tipo: 'opciones', enunciado: '<p>Vas caminando y la calle está cubierta de agua que corre. ¿Qué haces?</p>',
        opciones: ['Cruzarla con cuidado si el agua te llega a las rodillas', 'Cruzarla en coche, porque el coche pesa mucho', 'Darte la vuelta y buscar un camino por lo alto'], correcta: 2,
        pista: '<p>15 cm de agua que corre pueden derribarte.</p>',
        solucion: '<p><strong>Darte la vuelta y buscar otro camino</strong>. El agua que corre derriba a una persona con apenas 15 cm y arrastra un coche con 30 cm.</p>' },
      { tipo: 'opciones', enunciado: '<p>Estás en la playa y sientes un sismo muy fuerte. ¿Qué haces?</p>',
        opciones: ['Cuando pase la sacudida, alejarte hacia un terreno alto sin esperar ninguna alarma', 'Acercarte a la orilla para ver el mar', 'Esperar en la arena a que haya noticias'], correcta: 0,
        pista: '<p>Después del sismo puede llegar una ola gigante.</p>',
        solucion: '<p><strong>Alejarte hacia un terreno alto en cuanto pase la sacudida</strong>, porque puede venir un tsunami y no siempre hay tiempo para una alarma.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llaman los temblores más pequeños que siguen a un sismo grande?</p>', respuestas: ['replica', 'replicas', 'las replicas', 'una replica'],
        pista: '<p>Por ellas conviene seguir alerta después del sismo.</p>',
        solucion: '<p>Las <strong>réplicas</strong>.</p>' },
    ],
    fuentes: [
      READY('terremotos', 'Terremotos'),
      READY('inundaciones', 'Inundaciones'),
      READY('huracanes', 'Huracanes'),
      READY('tsunamis', 'Tsunamis'),
      READY('volcanes', 'Volcanes'),
      READY('kit', 'Prepare un kit de suministros'),
      OMS('earthquakes', 'Terremotos'),
      OMS('floods', 'Inundaciones'),
      { nombre: 'Oficina de las Naciones Unidas para la Reducción del Riesgo de Desastres (UNDRR)', url: 'https://www.undrr.org/es' },
    ],
  });
})();
