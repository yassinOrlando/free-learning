// Autosuficiencia · Unidad 8: Fuego y calor.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Seguridad: fogatas (Smokey Bear), humo y monóxido (OMS, MedlinePlus), incendios y extintores (Ready.gov, NFPA, USFA).
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('autosuficiencia', titulo, datos);
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
  const linea = (desde, hasta) => ({ tipo: 'linea', desde, hasta });

  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const MEDLINE = (ruta, nombre) => ({ nombre: `MedlinePlus en español: ${nombre}`, url: `https://medlineplus.gov/spanish/${ruta}` });
  const READY = { nombre: 'Ready.gov en español: Incendios en el hogar', url: 'https://www.ready.gov/es/incendios-en-el-hogar' };
  const SMOKEY = (ruta, nombre) => ({ nombre: `Smokey Bear, Servicio Forestal de EE. UU.: ${nombre}`, url: `https://smokeybear.com/es/${ruta}` });
  const NFPA = (ruta, nombre) => ({ nombre: `Asociación Nacional de Protección contra el Fuego (NFPA): ${nombre}`, url: `https://www.nfpa.org/es/education-and-research/home-fire-safety/${ruta}` });
  const USFA = (ruta, nombre) => ({ nombre: `Administración de Bomberos de EE. UU. (USFA, FEMA): ${nombre} (en inglés)`, url: `https://www.usfa.fema.gov/prevention/home-fires/${ruta}` });
  const OMS = { nombre: 'Organización Mundial de la Salud: Contaminación del aire doméstico', url: 'https://www.who.int/es/news-room/fact-sheets/detail/household-air-pollution-and-health' };
  const UNAM = { nombre: 'Díaz, Berrueta y Masera, UNAM y Red Mexicana de Bioenergía: Estufas de leña, Cuaderno temático 3 (PDF)', url: 'https://ecotec.unam.mx/wp-content/uploads/D--az-Jimenez-R.-Berrueta-V.-y-Masera-O.-2011.-Estufas-de-le--a.-Cuaderno-tem--tico-No.-3.-Red-Mexicana-de-Bioenerg--a.-.pdf' };

  // ------------------------------------------------------------------
  const TRIANGULO = diagrama([-3, 13], [-0.6, 8.6], [
    { tipo: 'poligono', puntos: [[1, 1], [9, 1], [5, 7.9]] },
    txt(5, 3.4, 'fuego'),
    txt(0, 5.1, 'calor'), txt(-0.2, 4.3, 'se quita con agua'),
    txt(10.2, 5.1, 'oxígeno'), txt(10.6, 4.3, 'se quita con tapa o tierra'),
    txt(5, 0.3, 'combustible: se quita cerrando el gas o retirando la leña'),
  ], 'Un triángulo con la palabra fuego en el centro. El lado izquierdo es el calor, que se quita con agua. El lado derecho es el oxígeno, que se quita con una tapa o con tierra. La base es el combustible, que se quita cerrando el gas o retirando la leña.');

  L('Cómo funciona el fuego: el triángulo del fuego', {
    objetivo: 'Explicar qué tres cosas necesita el fuego y usar esa idea para entender cómo se apaga.',
    explicacion: `
      <p>Si soplas un cerillo, se apaga. Si pones un vaso boca abajo sobre una vela, la llama se va haciendo pequeña hasta desaparecer. Y si a una fogata no le pones más leña, poco a poco se queda en cenizas. Son tres formas distintas de apagar un fuego, y las tres tienen la misma explicación.</p>
      <h3>¿Qué es el fuego?</h3>
      <p>En Química, en "Tipos de reacciones", viste que una combustión es una reacción rápida de una sustancia con el oxígeno del aire, que suelta calor y luz. El fuego que ves en una vela o en un fogón es eso: una combustión. La llama es el gas caliente que brilla mientras la reacción ocurre.</p>
      <h3>Las tres cosas que necesita</h3>
      <p>El Servicio Forestal de Estados Unidos, en su campaña Smokey Bear, explica el fuego con una figura sencilla: el <strong>triángulo del fuego</strong>. Cada lado es una de las tres cosas que el fuego necesita al mismo tiempo:</p>
      <ul>
        <li>El calor, que lo enciende y lo hace crecer. Puede venir de un cerillo, de una chispa o de otra llama.</li>
        <li>El <strong>combustible</strong>, que es cualquier material que se puede quemar: leña, papel, tela, gas, gasolina o aceite.</li>
        <li>El oxígeno, que está en el aire y reacciona con el combustible.</li>
      </ul>
      ${TRIANGULO}
      <p>Fíjate que un triángulo sin uno de sus lados ya no es triángulo. Con el fuego pasa lo mismo: si le quitas cualquiera de las tres cosas, se apaga. Por eso todas las formas de apagar un fuego hacen una de estas tres cosas.</p>
      <h3>Quitar el calor</h3>
      <p>El agua enfría lo que se está quemando. Cuando la leña baja de cierta temperatura, deja de arder. Por eso la manera de apagar una fogata es echarle mucha agua, como verás en la siguiente lección. Soplar un cerillo funciona igual: el aire de tu boca se lleva el calor de una llama tan pequeña.</p>
      <h3>Quitar el oxígeno</h3>
      <p>Si tapas el fuego, deja de llegarle aire. Eso pasa con el vaso sobre la vela: la llama gasta el oxígeno que quedó adentro y se apaga. Por eso, si se prende el aceite de una sartén, se tapa con una tapa, y por eso la tierra o la arena ayudan a apagar brasas, que son los trozos de leña que siguen calientes y al rojo vivo aunque ya no tengan llama. En la lección "Prevenir y apagar incendios" verás por qué nunca hay que echarle agua a un sartén con aceite en llamas.</p>
      <h3>Quitar el combustible</h3>
      <p>Si al fuego ya no le queda qué quemar, se termina. Cerrar la llave del gas apaga la estufa al instante. Una fogata sin leña nueva se acaba sola. Los bomberos usan esta idea en los incendios del campo: abren franjas sin plantas para que el fuego no tenga por dónde avanzar.</p>
      <h3>Cuando falta oxígeno: humo y monóxido</h3>
      <p>Si el fuego tiene poco aire, no se apaga de golpe: arde mal. Viste en Química que, cuando falta oxígeno, además de dióxido de carbono se forma monóxido de carbono. Y viste en la primera unidad, en "Necesidades básicas: agua, comida, refugio y energía", que ese gas es venenoso y no se ve ni se huele. Un fuego que arde mal también suelta más humo. Por eso los fuegos dentro de casa necesitan buena ventilación, como verás en "Estufas eficientes y el peligro del humo dentro de casa".</p>
      <h3>El calor sube</h3>
      <p>En Física, en "Conducción, convección y radiación", viste que el aire caliente sube porque es menos denso. Por eso las llamas y el humo van hacia arriba, el fuego avanza más rápido hacia arriba que hacia los lados, y en un incendio el aire más limpio queda cerca del piso.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que una fogata sin llamas ya está apagada. Las brasas siguen teniendo calor, combustible y oxígeno, y con un poco de viento vuelven a encenderse.</p>`,
    ejemplo: `
      <p>Se prende el aceite de una sartén en la estufa de gas. Usa el triángulo del fuego para decidir qué hacer.</p>
      <ol class="pasos-ej">
        <li>Primero identifica los lados: el calor viene de la flama, el combustible es el aceite y el oxígeno viene del aire.</li>
        <li>Quitar el oxígeno: deslizas una tapa sobre la sartén. Así deja de llegar aire y la llama se apaga.</li>
        <li>Quitar el calor y el combustible a la vez: apagas la perilla de la estufa, y con eso se cierra el gas.</li>
        <li>No quitas la tapa hasta que todo se enfríe, porque el aceite sigue caliente y podría volver a encenderse al llegarle aire.</li>
        <li>Comprueba con el triángulo: quitaste el oxígeno con la tapa y el combustible con la perilla. Con un solo lado basta.</li>
      </ol>
      <p>Resultado: <span class="resultado">tapa la sartén y apaga la estufa</span>. Si el fuego no se apaga, sal de la casa con todos y llama al número de emergencias de tu país (en muchos, el 911).</p>
      <p class="nota"><strong>Error común:</strong> echar agua al aceite. En la última lección de esta unidad verás por qué es tan peligroso.</p>`,
    vidaReal: `
      <p>Entender el triángulo del fuego te ayuda en tu día a día:</p>
      <ul>
        <li>Sabes por qué una tapa apaga una sartén con fuego.</li>
        <li>Entiendes por qué una fogata debe apagarse con mucha agua y no dejarse con brasas.</li>
        <li>Puedes encender un fuego que arda bien y con menos humo.</li>
        <li>Reaccionas con calma, porque sabes qué le hace falta al fuego para seguir y cómo quitárselo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En la combustión del gas metano, CH₄ + 2O₂ → CO₂ + 2H₂O, cada molécula de metano usa 2 de oxígeno. ¿Cuántas moléculas de oxígeno usan 5 de metano?</p>', respuesta: 5 * 2,
        pista: '<p>Multiplica las moléculas de metano por 2.</p>',
        solucion: '<p>5 × 2 = <strong>10 moléculas de oxígeno</strong>. Sin ese oxígeno, el gas no puede arder.</p>' },
      { tipo: 'numero', enunciado: '<p>Un triángulo del fuego tiene 3 lados. ¿Cuántos tienes que quitar, como mínimo, para que el fuego se apague?</p>', respuesta: 1,
        pista: '<p>El fuego necesita las tres cosas al mismo tiempo.</p>',
        solucion: '<p>Basta con quitar <strong>1</strong>: sin cualquiera de las tres cosas, el fuego se apaga.</p>' },
      { tipo: 'opciones', enunciado: '<p>Pones un vaso boca abajo sobre una vela y se apaga. ¿Qué lado del triángulo le quitaste?</p>',
        opciones: ['El oxígeno', 'El combustible', 'El calor'], correcta: 0,
        pista: '<p>¿Qué deja de llegar a la llama cuando la tapas?</p>',
        solucion: '<p><strong>El oxígeno</strong>: la llama gasta el aire del vaso y no le llega más.</p>' },
      { tipo: 'opciones', enunciado: '<p>Cerrar la llave del gas apaga la estufa. ¿Qué lado del triángulo quitas?</p>',
        opciones: ['El oxígeno', 'El combustible', 'El calor'], correcta: 1,
        pista: '<p>El gas es lo que se quema.</p>',
        solucion: '<p><strong>El combustible</strong>: sin gas, no hay nada que quemar.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué un fuego dentro de casa necesita buena ventilación?</p>',
        opciones: ['Para que el fuego sea más grande', 'Porque el humo hace que la comida sepa mejor', 'Porque con poco aire arde mal y forma más humo y monóxido de carbono'], correcta: 2,
        pista: '<p>Recuerda qué se forma cuando falta oxígeno.</p>',
        solucion: '<p><strong>Con poco aire se forma monóxido de carbono</strong>, un gas venenoso, y más humo.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama cualquier material que se puede quemar, como la leña, el papel o el gas?</p>',
        respuestas: ['combustible', 'el combustible', 'combustibles'],
        pista: '<p>Es uno de los lados del triángulo.</p>',
        solucion: '<p>Un <strong>combustible</strong>.</p>' },
    ],
    fuentes: [SMOKEY('about-wildland-fire/fire-science', 'Ciencia del fuego'), NFPA('cooking', 'Seguridad con equipos de cocina'), WIKI('Tri%C3%A1ngulo_del_fuego', 'Triángulo del fuego'), MEDLINE('carbonmonoxidepoisoning.html', 'Envenenamiento con monóxido de carbono')],
  });

  // ------------------------------------------------------------------
  const FORMAS = diagrama([0, 14], [-1.2, 6], [
    // Tipi: palos inclinados que se juntan arriba.
    ...[1, 2, 3, 4, 5].map((x) => linea([x, 0.5], [3, 5])),
    { tipo: 'circulo', x: 3, y: 1.2, r: 0.6 },
    txt(3, -0.6, 'tipi'),
    // Cabaña: troncos cruzados en capas.
    ...[0.6, 1.8, 3, 4.2].flatMap((y, i) => (i % 2 === 0
      ? [caja(8.2, y, 13, y + 0.5)]
      : [caja(8.2, y, 8.8, y + 0.5), caja(12.4, y, 13, y + 0.5)])),
    { tipo: 'circulo', x: 10.6, y: 2.4, r: 0.6 },
    txt(10.6, -0.6, 'cabaña'),
  ], 'Dos formas de acomodar la leña, vistas de lado. A la izquierda, el tipi: varios palos inclinados que se juntan arriba, como una tienda de campaña, con la yesca en el centro. A la derecha, la cabaña: troncos apilados en capas que se cruzan; en una capa se ven a lo largo y en la siguiente se ven de punta, como cuadritos. La yesca queda en el centro.');

  L('Encender y mantener un fuego con seguridad', {
    objetivo: 'Elegir el lugar, preparar la leña, encender una fogata y apagarla por completo, siguiendo los pasos de una fuente oficial.',
    explicacion: `
      <p>Cocinar a la leña o hacer una fogata en el campo parece fácil: juntas palos y les acercas un cerillo. Pero muchos incendios del campo empiezan así, con una fogata mal cuidada o mal apagada. La campaña Smokey Bear, del Servicio Forestal de Estados Unidos, da pasos claros para hacerlo con seguridad.</p>
      <h3>Antes de empezar</h3>
      <ul>
        <li>Revisa si en tu zona está permitido hacer fuego. Muchas veces se prohíbe en temporada seca.</li>
        <li>No enciendas fuego si hace viento o si todo está muy seco: una chispa puede volar y prender el pasto.</li>
        <li>Ten a la mano una cubeta llena de agua y una pala, antes de encender.</li>
        <li>Lleva un teléfono para llamar a emergencias si el fuego se sale.</li>
      </ul>
      <h3>El lugar</h3>
      <p>Smokey Bear pide un lugar plano, despejado y sin mucho viento, al menos a 15 pies, unos 4.5 metros, de tiendas de campaña, plantas y ramas bajas. Alrededor del fuego deben quedar unos 10 pies, unos 3 metros, sin nada que pueda arder, y arriba debe haber un espacio libre de por lo menos tres veces la altura de las llamas. Si ya hay un hoyo para fogata, úsalo. Si no, cava uno de más o menos un pie, unos 30 centímetros, de hondo, y rodéalo con un aro de metal o de piedras para que las brasas no se salgan.</p>
      <h3>La leña: de lo más fino a lo más grueso</h3>
      <p>Un fuego no puede prender un tronco grueso directamente, porque un tronco necesita mucho calor para empezar a arder. Por eso se empieza con lo más delgado y se va subiendo:</p>
      <ol>
        <li>La <strong>yesca</strong> es lo que prende primero: ramitas muy finas, hojas secas, pasto seco o agujas de pino.</li>
        <li>La leña menuda: palitos de menos de una pulgada, unos 2.5 centímetros, de grueso.</li>
        <li>Los troncos: trozos más grandes, que se agregan cuando el fuego ya está fuerte.</li>
      </ol>
      <p>Usa solo leña seca, recogida del suelo. Smokey Bear pide no cortar ramas ni árboles, vivos o muertos: la madera verde casi no arde, y los árboles muertos en pie son la casa de aves y otros animales. La leña húmeda, además, hace mucho humo.</p>
      ${FORMAS}
      <h3>Acomodar y encender</h3>
      <p>Pon la yesca en el centro y acomoda la leña menuda encima. Smokey Bear describe dos formas. En el tipi, los palos se apoyan unos en otros sobre la yesca, como una tienda de campaña; es buena para cocinar. En la cabaña, los palos se apilan en capas que se cruzan alrededor de la yesca; da un fuego más duradero.</p>
      <p>Enciende la yesca con un cerillo o un encendedor y sopla suavemente en la base: así le llega más oxígeno, como viste con el triángulo del fuego. Nunca uses gasolina, alcohol ni otros líquidos inflamables para encender o avivar el fuego, porque sus vapores pueden prenderse de golpe y quemarte.</p>
      <h3>Mientras arde</h3>
      <ul>
        <li>Nunca dejes el fuego solo, ni un momento.</li>
        <li>Mantén lejos a los niños y a los animales, y no juegues cerca.</li>
        <li>No quemes basura, latas de aerosol, envases a presión, pilas, vidrio ni aluminio: pueden explotar o soltar humo tóxico.</li>
      </ul>
      <h3>Apagar: ahogar, revolver, ahogar, sentir</h3>
      <p>Las <strong>brasas</strong> son los pedazos de leña que siguen al rojo vivo, o calientes, aunque ya no tengan llama. Son las que vuelven a encender un fuego que parecía apagado. Por eso Smokey Bear da cuatro pasos:</p>
      <ol>
        <li>Ahoga: echa mucha agua sobre todas las brasas, hasta que dejen de chisporrotear. No lo apagues solo con tierra o arena.</li>
        <li>Revuelve: mezcla con la pala las brasas, el agua y la tierra, y raspa los troncos para que no quede nada humeante.</li>
        <li>Ahoga otra vez: sigue echando agua hasta que todo esté frío.</li>
        <li>Siente: pasa el dorso de la mano cerca de las brasas, sin tocarlas. Si sientes calor, repite. No te vayas hasta que todo esté frío.</li>
      </ol>
      <p>Si el fuego salta a las plantas de alrededor o las brasas salen volando y no lo puedes controlar, aléjate y llama de inmediato al número de emergencias de tu país (en muchos, el 911).</p>
      <p class="nota"><strong>Trampa común:</strong> cubrir la fogata con tierra y dar por terminado. La tierra puede guardar brasas calientes durante horas, y el viento las vuelve a encender.</p>`,
    ejemplo: `
      <p>Vas a hacer una fogata para cocinar. Smokey Bear pide estar al menos a 15 pies de tu tienda de campaña. Si un pie mide 0.3048 metros, ¿a cuántos metros es eso, y qué haces si tu tienda está a 3 metros?</p>
      <ol class="pasos-ej">
        <li>Primero convierte los pies a metros: 15 × 0.3048 = 4.572 metros, unos 4.6 metros.</li>
        <li>Compara: tu tienda está a 3 metros, menos de los 4.6 que pide la guía.</li>
        <li>Por eso tienes que mover la fogata o la tienda, para que queden a más de 4.6 metros.</li>
        <li>Comprueba de otra forma: un metro son unos 3.3 pies, así que 3 metros son unos 3 × 3.3 = 9.9 pies, menos de 15.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 4.6 metros; a 3 metros estás demasiado cerca</span>. Antes de encender, ten lista la cubeta con agua y la pala.</p>
      <p class="nota"><strong>Error común:</strong> confundir pies con metros y poner la fogata a 15 metros pensando que sobra, o a 1.5 pensando que basta.</p>`,
    vidaReal: `
      <p>Saber encender y apagar bien un fuego te sirve en muchos momentos:</p>
      <ul>
        <li>Puedes cocinar a la leña si un día falta el gas o la luz.</li>
        <li>Haces fogatas en el campo sin poner en riesgo el bosque.</li>
        <li>Enciendes el fuego más rápido y con menos humo.</li>
        <li>Te vas con calma, porque sabes comprobar que todo quedó frío.</li><li>Puedes enseñar a otras personas a hacer y apagar una fogata sin riesgos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Smokey Bear pide 10 pies sin nada que arda alrededor del fuego. Si un pie mide 0.3048 metros, ¿cuántos metros son? Redondea a un decimal.</p>', respuesta: 10 * 0.3048, tolerancia: 0.05,
        pista: '<p>Multiplica los pies por 0.3048.</p>',
        solucion: '<p>10 × 0.3048 = 3.048, unos <strong>3 metros</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Las llamas de tu fogata miden medio metro. Si arriba debe haber un espacio libre de por lo menos tres veces la altura de las llamas, ¿cuántos metros libres necesitas?</p>', respuesta: 0.5 * 3,
        pista: '<p>Multiplica la altura de las llamas por 3.</p>',
        solucion: '<p>0.5 × 3 = <strong>1.5 metros</strong> libres hacia arriba, sin ramas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Con qué se empieza a encender una fogata?</p>',
        opciones: ['Con los troncos más gruesos', 'Con la yesca: ramitas finas, hojas y pasto secos', 'Con leña verde recién cortada'], correcta: 1,
        pista: '<p>Se va de lo más delgado a lo más grueso.</p>',
        solucion: '<p><strong>Con la yesca</strong>, que prende con poco calor.</p>' },
      { tipo: 'opciones', enunciado: '<p>El fuego no prende bien. ¿Qué haces?</p>',
        opciones: ['Echarle un poco de gasolina', 'Echarle alcohol', 'Soplar suavemente en la base y agregar más yesca seca'], correcta: 2,
        pista: '<p>Los líquidos inflamables pueden prenderse de golpe.</p>',
        solucion: '<p><strong>Soplar y agregar yesca seca</strong>. Nunca uses líquidos inflamables.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es la forma correcta de apagar una fogata según Smokey Bear?</p>',
        opciones: ['Ahogar con agua, revolver, ahogar otra vez y sentir que esté fría', 'Taparla con tierra y irte', 'Dejar que se apague sola'], correcta: 0,
        pista: '<p>Son cuatro pasos.</p>',
        solucion: '<p><strong>Ahogar, revolver, ahogar y sentir</strong>, hasta que todo esté frío.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llaman los pedazos de leña que siguen calientes o al rojo vivo, aunque ya no tengan llama?</p>',
        respuestas: ['brasas', 'las brasas', 'brasa', 'ascuas', 'rescoldo', 'rescoldos'],
        pista: '<p>Son las que vuelven a encender un fuego que parecía apagado.</p>',
        solucion: '<p>Las <strong>brasas</strong>.</p>' },
    ],
    fuentes: [SMOKEY('prevention-how-tos/campfire-safety', 'Cómo apagar una fogata'), WIKI('Hoguera', 'Hoguera')],
  });

  // ------------------------------------------------------------------
  const CASAS = diagrama([0, 15], [-1.4, 9], [
    // Casa con fogón abierto: el humo se queda adentro.
    caja(0.5, 0.5, 6.5, 5), { tipo: 'poligono', puntos: [[0.2, 5], [3.5, 7], [6.8, 5]], abierto: true },
    caja(2.6, 0.5, 4.4, 1),
    ...flecha([3.5, 1.2], [3.5, 4.6]), ...flecha([3.5, 4.6], [1.4, 3.4]), ...flecha([3.5, 4.6], [5.6, 3.4]),
    txt(3.5, -0.6, 'fogón abierto'),
    // Casa con estufa y chimenea: el humo sale.
    caja(8.5, 0.5, 14.5, 5), { tipo: 'poligono', puntos: [[8.2, 5], [11.5, 7], [14.8, 5]], abierto: true },
    caja(10, 0.5, 12.4, 2, true), caja(11.9, 2, 12.4, 7.8),
    ...flecha([12.15, 7.9], [12.15, 8.9]),
    txt(11.5, -0.6, 'estufa con chimenea'),
  ], 'Dos casas vistas de lado. En la de la izquierda, con fogón abierto en el piso, las flechas del humo suben al techo y se reparten dentro del cuarto. En la de la derecha, una estufa cerrada tiene un tubo de chimenea que atraviesa el techo, y la flecha del humo sale por arriba, fuera de la casa.');

  L('Estufas eficientes y el peligro del humo dentro de casa', {
    objetivo: 'Entender por qué el humo de leña dentro de casa daña la salud, cómo ayuda una estufa eficiente con chimenea y cuándo pedir ayuda por el monóxido de carbono.',
    explicacion: `
      <p>En muchas cocinas del campo se guisa en un fogón de tres piedras, en el piso, dentro de la casa. El humo llena el cuarto, ennegrece el techo y hace llorar los ojos. Quien cocina ahí lo respira varias horas al día, todos los días. Ese humo es mucho más que una molestia.</p>
      <h3>Lo que dice la OMS</h3>
      <p>Según la Organización Mundial de la Salud (OMS), unos 2 100 millones de personas, cerca de la cuarta parte del mundo, cocinan con fuego abierto o fogones poco eficientes, quemando leña, carbón, estiércol, restos de cosecha o queroseno. La OMS calcula que en 2021 el humo dentro de las casas causó 2.9 millones de muertes, de las cuales más de 309 000 fueron de niñas y niños menores de 5 años.</p>
      <p>¿Por qué hace tanto daño? El humo tiene partículas tan pequeñas que llegan hasta el fondo de los pulmones y pasan a la sangre. La OMS explica que en casas mal ventiladas el humo puede tener 100 veces más partículas finas de lo aceptable. Con los años, causa enfermedades de los pulmones, cáncer de pulmón, infartos al corazón y al cerebro. Las mujeres y los niños son los más afectados, porque pasan más tiempo cerca del fogón.</p>
      <h3>Por qué el fogón abierto desperdicia</h3>
      <p>Piensa en el triángulo del fuego. En un fogón abierto, el aire entra por todos lados sin control y gran parte del calor se escapa por los lados de la olla en lugar de calentarla. Por eso se necesita mucha leña para cocinar poco, y por eso el fuego arde de forma irregular, con más humo.</p>
      <h3>¿Qué es una estufa eficiente?</h3>
      <p>Una <strong>estufa eficiente</strong>, también llamada estufa ahorradora o mejorada, es una estufa de leña diseñada para quemar mejor y aprovechar más el calor. Las hay de barro, de ladrillo, de cemento o de metal, como la Patsari, desarrollada en México por la UNAM y la organización GIRA, o la llamada estufa cohete. Casi todas tienen tres cosas en común:</p>
      <ul>
        <li>Una cámara cerrada donde arde la leña, que guarda el calor y lo dirige hacia la olla o el comal.</li>
        <li>Una entrada de aire pequeña, para que el fuego reciba el aire que necesita y arda parejo.</li>
        <li>Una <strong>chimenea</strong>, que es un tubo que saca el humo fuera de la casa. Funciona porque el humo caliente sube, como viste en Física con la convección.</li>
      </ul>
      ${CASAS}
      <p>¿Cuánto ayudan? Un cuaderno de la UNAM y la Red Mexicana de Bioenergía reporta que las estufas de leña eficientes ahorran entre el 30% y el 60% de la leña, medido en las casas, y reducen las emisiones entre el 80% y el 90% comparadas con el fogón tradicional. También reporta que las mujeres que cocinan en fogón abierto tienen un 23% más de molestias de los pulmones y la respiración que las que usan estufa de leña.</p>
      <h3>Cuidar la estufa y la ventilación</h3>
      <ul>
        <li>Usa leña seca, que arde mejor y da menos humo, como viste en la lección anterior.</li>
        <li>Revisa la chimenea. Ready.gov pide inspeccionar y limpiar cada año los tubos de las estufas de leña y las chimeneas, y revisar cada mes que no estén dañados ni tapados. Un tubo tapado regresa el humo a la casa.</li>
        <li>Aunque tengas chimenea, deja entrar aire fresco a la cocina.</li>
        <li>Apaga bien el fuego antes de dormir o salir de casa.</li>
        <li>Nunca uses la estufa de gas ni el horno para calentar la casa, ni metas un anafre o un brasero de carbón a un cuarto cerrado. Producen monóxido de carbono.</li>
      </ul>
      <h3>Señales de alarma: el monóxido</h3>
      <p>Viste en la primera unidad que el monóxido de carbono es un gas venenoso que no se ve ni se huele. MedlinePlus explica que sus síntomas más comunes son dolor de cabeza, mareo, debilidad, náusea, vómito, dolor en el pecho y confusión, y que una persona dormida puede morir sin llegar a sentirlos. Un detector de monóxido de carbono avisa si el gas se acumula.</p>
      <p>Si alguien en la casa tiene esos síntomas mientras arde un fuego o funciona un aparato de gas, salgan todos de inmediato al aire libre y llamen al número de emergencias de tu país (en muchos, el 911). No regresen hasta que alguien con experiencia revise el lugar.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que, como ya no hay humo visible, no hay peligro. El monóxido de carbono no se ve: un brasero con carbón casi sin humo en un cuarto cerrado puede ser mortal.</p>`,
    ejemplo: `
      <p>Una familia usa 10 kg de leña al día en su fogón abierto. Si cambia a una estufa eficiente que ahorra el 40% de la leña, dentro del rango que reporta la UNAM, ¿cuánta leña usará al día y cuánta ahorra en un mes de 30 días?</p>
      <ol class="pasos-ej">
        <li>Primero calcula la leña que ahorra al día: el 40% de 10 kg es 10 × 0.40 = 4 kg.</li>
        <li>Luego resta: 10 − 4 = 6 kg de leña al día con la estufa eficiente.</li>
        <li>Para el mes, multiplica el ahorro diario por 30: 4 × 30 = 120 kg.</li>
        <li>Comprueba de otra forma: antes usaba 10 × 30 = 300 kg al mes y ahora 6 × 30 = 180 kg. La diferencia es 300 − 180 = 120 kg.</li>
      </ol>
      <p>Resultado: <span class="resultado">6 kg al día y 120 kg menos al mes</span>. Además, el humo sale por la chimenea y no se queda en la cocina.</p>
      <p class="nota"><strong>Error común:</strong> restar 40 kg en lugar del 40%. Un porcentaje es una parte de lo que usas, no una cantidad fija.</p>`,
    vidaReal: `
      <p>Conocer el peligro del humo protege a tu familia todos los días:</p>
      <ul>
        <li>Respiras mejor y cuidas los pulmones de quien cocina y de los niños.</li>
        <li>Gastas menos leña o menos dinero en combustible.</li>
        <li>Sabes por qué una chimenea tapada es peligrosa y la revisas a tiempo.</li>
        <li>Reconoces las señales del monóxido de carbono y sabes cuándo salir y llamar a emergencias.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Según la OMS, en 2021 el humo dentro de las casas causó 2.9 millones de muertes, y unas 309 000 fueron de menores de 5 años. ¿Qué porcentaje fueron niñas y niños? Redondea al entero.</p>', respuesta: 309000 / 2900000 * 100, tolerancia: 0.6,
        pista: '<p>Divide 309 000 entre 2 900 000 y multiplica por 100.</p>',
        solucion: '<p>309 000 ÷ 2 900 000 ≈ 0.107, es decir, unos <strong>11%</strong>: más o menos 1 de cada 9 muertes.</p>' },
      { tipo: 'numero', enunciado: '<p>Usas 8 kg de leña al día. Con una estufa que ahorra el 50%, ¿cuántos kilos usarás al día?</p>', respuesta: 8 * 0.5,
        pista: '<p>Calcula el 50% de 8 y réstalo.</p>',
        solucion: '<p>El 50% de 8 es 4, y 8 − 4 = <strong>4 kg</strong> al día.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve la chimenea de una estufa de leña?</p>',
        opciones: ['Para sacar el humo fuera de la casa', 'Para que entre más leña', 'Para que la estufa se vea más grande'], correcta: 0,
        pista: '<p>El humo caliente sube.</p>',
        solucion: '<p><strong>Para sacar el humo fuera de la casa</strong>, en lugar de que se quede en la cocina.</p>' },
      { tipo: 'opciones', enunciado: '<p>Hace frío y alguien propone meter un brasero con carbón al cuarto cerrado para dormir calientes. ¿Qué haces?</p>',
        opciones: ['Lo metes si ya no echa humo', 'No lo metes: el monóxido de carbono no se ve y puede matar a quien duerme', 'Lo metes y abres la puerta un rato al despertar'], correcta: 1,
        pista: '<p>Una persona dormida puede no sentir los síntomas.</p>',
        solucion: '<p><strong>No lo metes.</strong> El monóxido no se ve ni se huele, y quien duerme puede morir sin darse cuenta.</p>' },
      { tipo: 'opciones', enunciado: '<p>Mientras arde la estufa, dos personas de la casa sienten dolor de cabeza, mareo y náusea. ¿Qué hacen?</p>',
        opciones: ['Se acuestan a descansar', 'Toman algo para el dolor de cabeza y siguen cocinando', 'Salen todos al aire libre y llaman al número de emergencias'], correcta: 2,
        pista: '<p>Son síntomas de envenenamiento por monóxido de carbono.</p>',
        solucion: '<p><strong>Salir al aire libre y llamar a emergencias.</strong> Pueden ser síntomas de monóxido de carbono.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el tubo que saca el humo de una estufa fuera de la casa?</p>',
        respuestas: ['chimenea', 'la chimenea', 'tubo de chimenea'],
        pista: '<p>Lo tienen las estufas eficientes y muchas casas antiguas.</p>',
        solucion: '<p>La <strong>chimenea</strong>.</p>' },
    ],
    fuentes: [OMS, UNAM, READY, MEDLINE('carbonmonoxidepoisoning.html', 'Envenenamiento con monóxido de carbono'), WIKI('Estufa_cohete', 'Estufa cohete')],
  });

  // ------------------------------------------------------------------
  L('Prevenir y apagar incendios', {
    objetivo: 'Prevenir los incendios más comunes en casa, preparar un plan de escape y saber qué hacer si empieza un fuego, incluido cuándo usar un extintor y cuándo salir.',
    explicacion: `
      <p>Un incendio en casa casi siempre empieza con algo pequeño: una sartén olvidada, una vela cerca de la cortina, un cable dañado. Lo que lo vuelve peligroso es lo rápido que crece. Saber prevenirlo y saber qué hacer en los primeros segundos puede salvar vidas.</p>
      <h3>El fuego es rápido, caliente y oscuro</h3>
      <p>Ready.gov, el sitio de emergencias del Gobierno de Estados Unidos, lo explica así:</p>
      <ul>
        <li>Es rápido: en menos de 30 segundos, una llama pequeña puede convertirse en un gran incendio. En 2 minutos puede volverse mortal, y en 5 minutos una casa puede quedar envuelta en llamas.</li>
        <li>Es caliente: el calor es más peligroso que las llamas. En un cuarto incendiado puede haber 38 °C a la altura del piso y 315 °C a la altura de los ojos, porque el aire caliente sube.</li>
        <li>Es oscuro: el humo negro llena la casa y no deja ver nada.</li>
        <li>Es mortal: el humo y los gases tóxicos matan a más personas que las llamas, porque causan confusión y sueño.</li>
      </ul>
      <p>Por eso la regla número uno es salir pronto. Las cosas se recuperan; las personas, no.</p>
      <h3>Prevenir en la cocina</h3>
      <p>La Administración de Bomberos de Estados Unidos (USFA) reporta que la causa principal de los incendios de cocina es dejar la estufa encendida sin vigilar.</p>
      <ul>
        <li>Quédate en la cocina mientras fríes o asas. Si sales, apaga la estufa.</li>
        <li>Si ves humo o el aceite empieza a hervir, apaga el fuego.</li>
        <li>Voltea los mangos de las ollas hacia atrás, para que nadie las tire.</li>
        <li>Usa mangas cortas o bien recogidas.</li>
        <li>Ten una tapa cerca de la sartén cuando cocinas.</li>
      </ul>
      <h3>Prevenir en el resto de la casa</h3>
      <ul>
        <li>Guarda los cerillos y los encendedores fuera del alcance y de la vista de los niños, y nunca los dejes solos cerca de la estufa o de una vela.</li>
        <li>Pon las velas al menos a 12 pulgadas, unos 30 centímetros, de lo que pueda arder, y apágalas al salir del cuarto.</li>
        <li>Deja un metro libre alrededor de los calentadores.</li>
        <li>Cambia los cables gastados o dañados, no los pongas debajo de tapetes y no sobrecargues las extensiones.</li>
      </ul>
      <h3>Detectores de humo y plan de escape</h3>
      <p>Un detector de humo es un aparato que suena cuando detecta humo, a veces antes de que lo notes tú. Ready.gov pide uno en cada piso de la casa, cambiar sus pilas dos veces al año (salvo que sean pilas de litio de 10 años) y cambiar el aparato completo cada 10 años. Nunca lo desconectes para cocinar.</p>
      <p>Un <strong>plan de escape</strong> es un plan, que toda la familia conoce, para salir de la casa si hay un incendio. Ready.gov recomienda:</p>
      <ul>
        <li>Buscar dos salidas de cada cuarto, por si una se bloquea.</li>
        <li>Revisar que las ventanas y las rejas se puedan abrir rápido.</li>
        <li>Elegir un lugar de encuentro seguro afuera, a buena distancia de la casa.</li>
        <li>Practicarlo dos veces al año, también a oscuras o con los ojos cerrados.</li>
        <li>Enseñar a los niños a no esconderse de los bomberos.</li>
      </ul>
      <h3>Si hay fuego</h3>
      <ul>
        <li>Sartén con fuego: desliza la tapa encima y apaga el fogón. No quites la tapa hasta que todo se enfríe. La NFPA advierte: nunca le eches agua. El agua hace saltar el aceite en llamas y el fuego se extiende por la cocina.</li>
        <li>Fuego en el horno: apágalo y deja la puerta cerrada, para que se quede sin oxígeno.</li>
        <li>Humo en la casa: tírate al piso y gatea por debajo del humo hasta la salida, porque el aire más limpio queda abajo.</li>
        <li>Antes de abrir una puerta, toca la puerta y la manija con el dorso de la mano. Si están calientes, o sale humo por las orillas, no la abras y usa tu otra salida.</li>
        <li>Si no puedes salir, cierra la puerta, tapa las rendijas con ropa y pide ayuda por la ventana.</li>
        <li>Si se te prende la ropa: detente, tírate al piso, cúbrete la cara con las manos y rueda hasta que se apague.</li>
      </ul>
      <p>Una vez fuera, no regreses por nada. Llama desde afuera al número de emergencias de tu país (en muchos, el 911) y avisa si alguien se quedó adentro. Si alguien se quemó, enfría la quemadura con agua y busca atención médica; lo verás con detalle en la unidad Salud y primeros auxilios.</p>
      <h3>El extintor: solo para fuegos pequeños</h3>
      <p>Un <strong>extintor</strong> es un tanque que lanza una sustancia para apagar el fuego. Para casa, la NFPA recomienda uno de uso múltiple, marcado A-B-C. La USFA dice que solo lo uses si todas estas respuestas son sí: ya avisaste a los demás, alguien ya llamó a los bomberos, el fuego es pequeño y está en un solo objeto, como una sartén o un bote de basura, estás a salvo del humo y tienes una salida despejada. Las niñas y los niños pequeños y las personas mayores no deben usarlo. Si dudas, sal y llama.</p>
      <p>La NFPA lo resume en cuatro pasos, que se recuerdan como JAAB: Jala el pasador, Apunta a la base del fuego, Aprieta la palanca despacio y Barre de un lado a otro.</p>
      <p class="nota"><strong>Trampa común:</strong> quedarse a combatir un fuego que ya creció, o regresar por algo. En un par de minutos el humo puede impedir que salgas.</p>`,
    ejemplo: `
      <p>Haz el plan de escape de una casa con dos recámaras, una sala y una cocina. ¿Cuántas salidas debes identificar, y cuántas veces lo practican en dos años?</p>
      <ol class="pasos-ej">
        <li>Primero cuenta los cuartos: 2 recámaras + 1 sala + 1 cocina = 4 cuartos.</li>
        <li>Ready.gov pide dos salidas de cada cuarto, por ejemplo la puerta y una ventana: 4 × 2 = 8 salidas.</li>
        <li>Para la práctica, Ready.gov pide hacerlo dos veces al año: en 2 años son 2 × 2 = 4 prácticas.</li>
        <li>Elige un punto de reunión afuera, para saber de inmediato si falta alguien.</li>
        <li>Comprueba recorriendo la casa: en cada cuarto, señala en voz alta sus dos salidas y revisa que las ventanas se abran.</li>
      </ol>
      <p>Resultado: <span class="resultado">8 salidas y 4 prácticas en 2 años</span>.</p>
      <p class="nota"><strong>Error común:</strong> planear solo la puerta principal. Si el fuego empieza ahí, nadie tendría por dónde salir.</p>`,
    vidaReal: `
      <p>Prevenir y saber reaccionar ante un incendio protege lo más valioso que tienes:</p>
      <ul>
        <li>Tu familia sabe por dónde salir y dónde reunirse.</li>
        <li>Apagas una sartén en llamas sin lastimarte.</li>
        <li>Sabes cuándo usar un extintor y cuándo es mejor salir y llamar.</li>
        <li>Evitas los descuidos que causan la mayoría de los incendios en casa.</li><li>Tus detectores de humo funcionan porque revisas sus pilas a tiempo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Según Ready.gov, en un incendio puede haber 38 °C al nivel del piso y 315 °C a la altura de los ojos. ¿Cuántos grados de diferencia hay?</p>', respuesta: 315 - 38,
        pista: '<p>Resta las dos temperaturas.</p>',
        solucion: '<p>315 − 38 = <strong>277 °C</strong> de diferencia. Por eso hay que gatear por debajo del humo.</p>' },
      { tipo: 'numero', enunciado: '<p>Ready.gov pide cambiar las pilas del detector de humo dos veces al año. ¿Cuántas veces las cambias en 5 años?</p>', respuesta: 2 * 5,
        pista: '<p>Multiplica las veces por año por los años.</p>',
        solucion: '<p>2 × 5 = <strong>10 veces</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Se prende el aceite de una sartén. ¿Qué haces?</p>',
        opciones: ['Le echas un vaso de agua', 'Deslizas una tapa encima y apagas el fogón', 'Llevas la sartén corriendo al patio'], correcta: 1,
        pista: '<p>Quita el oxígeno y el calor.</p>',
        solucion: '<p><strong>Tapa y apaga el fogón.</strong> Nunca le eches agua al aceite en llamas.</p>' },
      { tipo: 'opciones', enunciado: '<p>Vas a salir de un cuarto y la manija de la puerta está caliente. ¿Qué haces?</p>',
        opciones: ['No abres y usas tu otra salida', 'La abres rápido y corres', 'Esperas a que se enfríe'], correcta: 0,
        pista: '<p>Una puerta caliente puede tener fuego del otro lado.</p>',
        solucion: '<p><strong>No la abres y usas tu otra salida.</strong> Por eso cada cuarto necesita dos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué significa la J de la regla JAAB para usar un extintor?</p>',
        opciones: ['Junta agua', 'Juega con la boquilla', 'Jala el pasador'], correcta: 2,
        pista: '<p>Es lo primero que se hace para poder usarlo.</p>',
        solucion: '<p><strong>Jala el pasador</strong>; luego apunta a la base, aprieta despacio y barre.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el plan que toda la familia conoce para salir de la casa si hay un incendio?</p>',
        respuestas: ['plan de escape', 'un plan de escape', 'el plan de escape', 'plan de evacuacion', 'plan de salida'],
        pista: '<p>Incluye dos salidas por cuarto y un punto de reunión.</p>',
        solucion: '<p>El <strong>plan de escape</strong>.</p>' },
    ],
    fuentes: [READY, { nombre: 'Ready.gov en español: Plan de escape en caso de incendio en el hogar', url: 'https://www.ready.gov/es/home-fire-escape-plan' }, NFPA('cooking', 'Seguridad con equipos de cocina'), NFPA('fire-extinguishers', 'Extintores contra incendios'), USFA('prepare-for-fire/fire-extinguishers/', 'Choosing and Using Fire Extinguishers'), USFA('prevent-fires/cooking/', 'Cooking Fire Safety'), WIKI('Extintor', 'Extintor')],
  });
})();
