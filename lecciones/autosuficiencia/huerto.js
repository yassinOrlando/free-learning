// Autosuficiencia · Unidad 3: El suelo y el huerto.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Plagas: nada de recetas de venenos caseros; solo productos comerciales menos tóxicos y según la etiqueta (UC IPM, NPIC).
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

  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const OSU = { nombre: 'Servicio de Extensión de la Universidad Estatal de Oregon: Su propio cultivo (EM 9027-S, PDF)', url: 'https://extension.oregonstate.edu/sites/default/files/documents/57811/su-propio-cultivo-edsmall.pdf' };
  const EPA = { nombre: 'Agencia de Protección Ambiental de EE. UU. (EPA): Composting At Home (en inglés)', url: 'https://www.epa.gov/recycle/composting-home' };
  const TAMU = { nombre: 'Extensión AgriLife de Texas A&M: Fertilización del huerto (EHT-070S, PDF)', url: 'https://aggie-horticulture.tamu.edu/vegetable/files/2013/09/EHT-070S-fertilizing.pdf' };
  const SARE = { nombre: 'SARE, Programa de Investigación y Educación en Agricultura Sostenible: Cultivos de cobertura para rotaciones de cultivos (PDF)', url: 'https://www.sare.org/wp-content/uploads/Cultivos-de-Cobertura-para-Rotaciones-de-Cultivos.pdf' };
  const UCIPM = { nombre: 'Programa de Manejo Integrado de Plagas de la Universidad de California (UC IPM): Áfidos o pulgones', url: 'https://ipm.ucanr.edu/QT/aphidscardsp.html' };
  const NPIC = { nombre: 'Centro Nacional de Información de Pesticidas (NPIC): Productos pesticidas caseros', url: 'https://npic.orst.edu/pest/home-remedies.es.html' };
  const MSU = { nombre: 'Extensión de la Universidad Estatal de Misisipi: Companion Planting: Myth or Truth? (en inglés)', url: 'https://extension.msstate.edu/blogs/extension-for-real-life/companion-planting-myth-or-truth' };
  const WISC = { nombre: 'Extensión de la Universidad de Wisconsin: Growing Vegetables in Containers (en inglés)', url: 'https://hort.extension.wisc.edu/articles/growing-vegetables-containers/' };
  const OLLAS = { nombre: 'Extensión de la Universidad de Arizona: Riego con ollas', url: 'https://extension.arizona.edu/es/publication/riego-con-ollas' };
  const GOTEO = { nombre: 'Universidad de California, Agricultura y Recursos Naturales: Drip Irrigation in the Food Garden (en inglés, PDF)', url: 'https://innovate.ucanr.edu/sites/default/files/2025-11/Drip-irrigation-in-the-food-garden-204865.pdf' };

  // ------------------------------------------------------------------
  L('Qué necesitan las plantas: luz, agua, aire y nutrientes', {
    objetivo: 'Reconocer las cuatro cosas que necesita una planta para crecer, leer la etiqueta de un fertilizante y relacionar algunas señales de las hojas con lo que le falta.',
    explicacion: `
      <p>Piensa en una maceta olvidada en un rincón oscuro: los tallos se estiran, flacos y pálidos, buscando la ventana. Ahora piensa en otra que se riega todos los días sin falta y aun así se pone amarilla y se pudre. A las dos les falta algo distinto. Antes de sembrar, conviene saber qué necesita una planta y cómo te avisa cuando algo anda mal.</p>
      <h3>Luz</h3>
      <p>En Ciencias naturales, en "Célula animal y célula vegetal", viste que las plantas fabrican su propio alimento con la luz del sol mediante la fotosíntesis. Sin luz suficiente, no hay comida para la planta. La guía "Su propio cultivo" de la Universidad Estatal de Oregon indica que todas las verduras necesitan un mínimo de 6 horas de sol directo al día, y que crecen mejor con 8 a 10 horas. Con menos, las plantas quedan débiles y flacuchas, sin importar cuánto las cuides. Por eso, lo primero que se elige al planear un huerto es el lugar más soleado.</p>
      <h3>Agua y aire</h3>
      <p>El agua lleva los nutrientes del suelo hasta las hojas y mantiene firme a la planta; por eso una planta con sed se ve marchita, con las hojas caídas. Pero las raíces también respiran: necesitan aire entre los granos de tierra. Si el suelo está siempre encharcado, el agua ocupa todos los huecos, las raíces se ahogan y se pudren. Fíjate que el exceso de agua puede verse igual que la falta, con una planta caída, pero con la tierra mojada. Por eso un buen suelo de huerto guarda agua y, al mismo tiempo, deja pasar el aire.</p>
      <h3>Nutrientes</h3>
      <p>Un <strong>nutriente</strong> es una sustancia del suelo que la planta absorbe por sus raíces y necesita para formar sus hojas, raíces y frutos. Las plantas necesitan muchos, pero tres se gastan en mayor cantidad. La Extensión AgriLife de Texas A&M explica lo que hace cada uno:</p>
      <ul>
        <li>El nitrógeno, que se escribe N, lo necesitan todas las partes de la planta para crecer. Le da el color verde y sirve para formar proteínas. Cuando falta, las hojas de abajo, las más viejas, se ponen amarillas y toda la planta se ve verde pálido.</li>
        <li>El fósforo, P, ayuda a formar raíces, flores y frutos. Cuando falta, la planta crece poco y da pocas flores y frutos.</li>
        <li>El potasio, K, participa en muchos procesos que permiten la vida y el crecimiento. Cuando falta, la planta suele crecer poco y amarillear en las hojas de abajo.</li>
      </ul>
      <h3>Leer la etiqueta</h3>
      <p>Por eso los fertilizantes, que son productos que se agregan al suelo para darle nutrientes, traen tres números, como 10-20-10. Es el <strong>N-P-K</strong>: el porcentaje de nitrógeno, fósforo y potasio, siempre en ese orden. Un costal de 100 libras de 10-20-10 trae 10 libras de nitrógeno, 20 de fósforo y 10 de potasio; el resto es relleno, como arena. Para calcular cuánto trae de cada uno, usas los porcentajes, como viste en Matemáticas.</p>
      <p>Los nutrientes también llegan con la composta y el estiércol bien descompuesto, que verás en la siguiente lección. Texas A&M advierte dos cosas importantes. Primero, un exceso de nitrógeno mata a las plantas; más fertilizante no es mejor. Segundo, el fertilizante solo ayuda si lo que falta son nutrientes: si la planta está en sombra, en suelo encharcado o compitiendo con las raíces de un árbol, no va a mejorar. Por eso recomienda hacer un análisis de suelo cada 2 años, que en muchos lugares ofrecen las universidades o las oficinas agrícolas.</p>
      <h3>Cómo leer las señales</h3>
      <p>Antes de agregar algo, observa. Tallos largos y pálidos que se inclinan hacia un lado: falta luz. Planta marchita con tierra seca: falta agua. Planta marchita con tierra encharcada: sobra agua. Hojas de abajo amarillas en una planta pálida: puede faltar nitrógeno. Ojo: algunas plagas y enfermedades también amarillean las hojas, como verás al final de esta unidad.</p>
      <p class="nota"><strong>Trampa común:</strong> echar fertilizante a toda planta que se ve mal. Si el problema es la sombra o el exceso de agua, el fertilizante no ayuda, y en exceso puede quemar las raíces.</p>`,
    ejemplo: `
      <p>Compras un costal de 20 kg de fertilizante 15-15-15. ¿Cuántos kilos de nitrógeno trae y cuántos kilos son relleno?</p>
      <ol class="pasos-ej">
        <li>Primero lee la etiqueta en orden: 15% de nitrógeno, 15% de fósforo y 15% de potasio.</li>
        <li>Calcula el nitrógeno: el 15% de 20 kg. El 10% de 20 es 2 y el 5% es 1, así que el 15% es 2 + 1 = 3 kg.</li>
        <li>Como los tres números son iguales, también hay 3 kg de fósforo y 3 kg de potasio. En total, 3 + 3 + 3 = 9 kg de nutrientes.</li>
        <li>El relleno es lo que sobra: 20 − 9 = 11 kg.</li>
        <li>Comprueba con porcentajes: los nutrientes son 15 + 15 + 15 = 45% del costal, y el 45% de 20 es 9 kg.</li>
      </ol>
      <p>Resultado: <span class="resultado">3 kg de nitrógeno y 11 kg de relleno</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que el costal es todo nutriente. Más de la mitad puede ser relleno.</p>`,
    vidaReal: `
      <p>Entender qué necesita una planta te ahorra dinero y frustraciones:</p>
      <ul>
        <li>Eliges el lugar más soleado de tu casa para las plantas que dan fruto.</li>
        <li>Dejas de regar de más una maceta que se pudre por exceso de agua.</li>
        <li>Puedes comparar dos costales de fertilizante y saber cuál te conviene.</li>
        <li>Al ver una hoja amarilla, sabes qué revisar primero antes de comprar algo.</li>
        <li>Puedes explicarle a alguien de tu familia por qué su planta favorita se está secando.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un costal de 50 kg dice 10-20-10. ¿Cuántos kilos de nitrógeno trae?</p>', respuesta: 50 * 10 / 100,
        pista: '<p>El primer número es el porcentaje de nitrógeno.</p>',
        solucion: '<p>El 10% de 50 kg es <strong>5 kg</strong> de nitrógeno.</p>' },
      { tipo: 'numero', enunciado: '<p>En ese mismo costal de 50 kg de 10-20-10, ¿cuántos kilos son relleno?</p>', respuesta: 50 - 50 * (10 + 20 + 10) / 100,
        pista: '<p>Suma los tres porcentajes para saber cuánto es nutriente, y réstalo del total.</p>',
        solucion: '<p>Los nutrientes son 10 + 20 + 10 = 40% del costal, o sea 20 kg. El relleno es 50 − 20 = <strong>30 kg</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un rincón de tu patio recibe sol desde las 11 hasta las 15 horas. ¿Cuántas horas le faltan para llegar al mínimo de 6 que necesitan las verduras?</p>', respuesta: 6 - (15 - 11),
        pista: '<p>Calcula primero cuántas horas de sol recibe.</p>',
        solucion: '<p>Recibe 15 − 11 = 4 horas, así que le faltan 6 − 4 = <strong>2 horas</strong>. Ese rincón no es buen lugar para un huerto.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una planta está marchita, pero la tierra de su maceta está empapada. ¿Qué es lo más probable?</p>',
        opciones: ['Le falta agua', 'Le sobra agua y sus raíces no tienen aire', 'Le falta fertilizante'], correcta: 1,
        pista: '<p>Recuerda que las raíces también respiran.</p>',
        solucion: '<p><strong>Le sobra agua.</strong> Los huecos del suelo están llenos de agua, las raíces se ahogan y la planta se marchita aunque esté mojada.</p>' },
      { tipo: 'opciones', enunciado: '<p>Las hojas de abajo de tu planta se ponen amarillas y toda la planta se ve verde pálido. Según Texas A&M, ¿qué nutriente puede faltar?</p>',
        opciones: ['Nitrógeno', 'Fósforo', 'Ninguno, es normal'], correcta: 0,
        pista: '<p>Es el nutriente que le da el color verde a la planta.</p>',
        solucion: '<p><strong>Nitrógeno.</strong> Aun así, revisa también la luz, el riego y si hay plagas, porque pueden causar señales parecidas.</p>' },
      { tipo: 'opciones', enunciado: '<p>En la etiqueta 5-10-5, ¿qué indica el 10?</p>',
        opciones: ['El porcentaje de nitrógeno', 'El porcentaje de potasio', 'El porcentaje de fósforo'], correcta: 2,
        pista: '<p>El orden siempre es N-P-K.</p>',
        solucion: '<p><strong>El porcentaje de fósforo</strong>, que es el segundo número.</p>' },
    ],
    fuentes: [OSU, TAMU, WIKI('Fertilizante', 'Fertilizante')],
  });

  // ------------------------------------------------------------------
  const PILA = diagrama([0, 12], [0, 8], [
    caja(2, 0.5, 8, 1.5), txt(5, 1, 'ramas y varitas'),
    caja(2, 1.5, 8, 2.5), txt(5, 2, 'verdes: restos de cocina'),
    caja(2, 2.5, 8, 4.5), txt(5, 3.5, 'secos: hojas, cartón'),
    caja(2, 4.5, 8, 5.5), txt(5, 5, 'verdes'),
    caja(2, 5.5, 8, 7.5), txt(5, 6.5, 'secos que tapan'),
    txt(10.2, 4.9, 'más secos'), txt(10.2, 4.3, 'que verdes'),
  ], 'Una pila de composta vista de lado, en capas de abajo hacia arriba: ramas y varitas; verdes, que son restos de cocina; secos, como hojas y cartón; otra capa de verdes; y arriba, secos que tapan. Las capas de secos son el doble de gruesas que las de verdes. A un lado dice "más secos que verdes".');

  L('El suelo y la composta', {
    objetivo: 'Distinguir los tipos de suelo, entender para qué sirve la materia orgánica y preparar una composta con la proporción y la humedad correctas.',
    explicacion: `
      <p>Toma un puñado de tierra húmeda y apriétalo. Si se deshace en cuanto abres la mano, tiene mucha arena. Si queda una bola pegajosa que se puede moldear como plastilina, tiene mucha arcilla. Esa sencilla prueba te dice mucho de cómo se va a comportar tu huerto.</p>
      <h3>De qué está hecho el suelo</h3>
      <p>El suelo es una mezcla de pedacitos de roca, aire, agua, seres vivos y restos de plantas y animales. Los pedacitos de roca tienen tres tamaños: la arena, que se siente áspera; el limo, que se siente como talco; y la arcilla, la más fina, que se pega. La proporción de cada uno se llama <strong>textura del suelo</strong>.</p>
      <ul>
        <li>Un suelo con mucha arena deja pasar el agua y el aire muy rápido, pero se seca pronto y no guarda nutrientes.</li>
        <li>Un suelo con mucha arcilla guarda agua y nutrientes, pero se encharca, le falta aire y se pone duro al secarse.</li>
        <li>Un suelo con una mezcla equilibrada, con algo de cada uno, es el mejor para un huerto.</li>
      </ul>
      <p>La textura no se puede cambiar mucho, pero hay algo que mejora cualquier suelo: la <strong>materia orgánica</strong>, que son los restos de plantas y animales en descomposición. La guía de la Universidad Estatal de Oregon explica que agregarla a un suelo arcilloso mejora el drenaje y la entrada de aire, y en uno arenoso ayuda a guardar agua y nutrientes. Funciona como una esponja que, a la vez, deja huecos para respirar.</p>
      <h3>La composta</h3>
      <p>En Ciencias naturales, en "Consumo responsable y reciclaje", viste que la composta es un abono que fabrican los descomponedores, como bacterias y hongos, con los restos orgánicos. Aquí verás cómo hacerla bien. Según la Agencia de Protección Ambiental de Estados Unidos (EPA), una pila de composta necesita cuatro ingredientes:</p>
      <ul>
        <li>Secos, ricos en carbono: hojas secas, ramas, cartón y papel sin brillo en pedazos.</li>
        <li>Verdes, ricos en nitrógeno: cáscaras de fruta y verdura, pasto recién cortado y posos de café.</li>
        <li>Agua: la mezcla debe sentirse como una esponja exprimida, húmeda pero sin escurrir.</li>
        <li>Aire: los microbios que hacen la composta lo necesitan; por eso se voltea la pila de vez en cuando.</li>
      </ul>
      ${PILA}
      <p>La EPA recomienda poner al menos de 2 a 3 veces más volumen de secos que de verdes, y tapar siempre los restos de comida con una capa de 10 a 20 cm de secos. Así no huele mal y no atrae moscas. En la base conviene una capa de ramas que deje circular el aire.</p>
      <h3>Lo que no va</h3>
      <p>La EPA y la guía de Oregon coinciden en no echar a una composta casera carne, pescado, huesos, lácteos, grasas ni aceites, porque atraen animales y una pila casera no siempre se calienta lo suficiente para descomponerlos bien. Tampoco plantas enfermas o con plaga, hierbas con semillas, madera pintada o tratada, ni excremento de perro o gato, que puede llevar microbios que enferman a las personas.</p>
      <h3>Señales de cómo va</h3>
      <p>Una pila bien cuidada se calienta por dentro, porque los microbios trabajan; la EPA indica que puede llegar a entre 54 y 71 °C, y ese calor ayuda a reducir las semillas de hierbas y los microbios dañinos. Si huele a podrido, le falta aire o le sobran verdes: voltéala y agrega secos. Si no pasa nada y está seca, agrégale agua. Con cuidados, la composta está lista en unos 3 a 5 meses; abandonada, puede tardar un año. Está lista cuando es oscura, suelta y huele a tierra de bosque.</p>
      <p class="nota"><strong>Trampa común:</strong> llenar la composta solo con restos de cocina. Sin suficientes secos, se vuelve una masa húmeda que huele mal.</p>`,
    ejemplo: `
      <p>En una semana juntas una cubeta de 10 litros de restos de cocina. ¿Cuántos litros de hojas secas necesitas, como mínimo, para mezclarlos según la EPA?</p>
      <ol class="pasos-ej">
        <li>Primero identifica qué es cada cosa: los restos de cocina son verdes y las hojas secas son secos.</li>
        <li>La EPA pide de 2 a 3 veces más volumen de secos que de verdes. El mínimo es 2 veces.</li>
        <li>Multiplica: 10 litros × 2 = 20 litros de hojas secas como mínimo. Con 3 veces serían 30 litros.</li>
        <li>Comprueba la proporción: 20 ÷ 10 = 2, es decir, dos partes de secos por cada parte de verdes.</li>
      </ol>
      <p>Resultado: <span class="resultado">entre 20 y 30 litros de hojas secas</span>, unas dos o tres cubetas.</p>
      <p class="nota"><strong>Error común:</strong> medir por peso en lugar de por volumen. Las hojas secas pesan muy poco, pero ocupan mucho; la proporción de la EPA es por volumen.</p>`,
    vidaReal: `
      <p>Hacer composta tiene ventajas desde la primera semana:</p>
      <ul>
        <li>Sacas menos basura de tu casa, porque los restos de cocina ya no van al bote.</li>
        <li>Obtienes abono gratis para tus macetas y tu huerto.</li>
        <li>Tus plantas crecen en una tierra que guarda mejor el agua, así que riegas menos.</li>
        <li>Aprovechas las hojas secas del patio en lugar de quemarlas o tirarlas.</li>
        <li>Tu bote de basura huele menos, porque los restos que se pudren ya no van ahí.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tienes 15 litros de restos de cocina. Usando la proporción de 3 partes de secos por cada parte de verdes, ¿cuántos litros de secos necesitas?</p>', respuesta: 15 * 3,
        pista: '<p>Multiplica los verdes por 3.</p>',
        solucion: '<p>15 × 3 = <strong>45 litros</strong> de secos.</p>' },
      { tipo: 'numero', enunciado: '<p>Al terminar, una pila de composta se reduce a un tercio de su tamaño. Si empezaste con 900 litros, ¿cuántos litros de composta te quedan?</p>', respuesta: 900 / 3,
        pista: '<p>Un tercio es dividir entre 3.</p>',
        solucion: '<p>900 ÷ 3 = <strong>300 litros</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos materiales NO debe ir a una composta casera?</p>',
        opciones: ['Hojas secas', 'Cáscaras de papa', 'Restos de pollo con hueso'], correcta: 2,
        pista: '<p>Piensa en lo que atrae animales y no se descompone bien en una pila casera.</p>',
        solucion: '<p><strong>Los restos de pollo con hueso.</strong> La carne y los huesos atraen animales y una pila casera no siempre se calienta lo suficiente para descomponerlos.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tu composta huele a podrido y está muy mojada. ¿Qué haces?</p>',
        opciones: ['Le agregas más restos de cocina', 'La volteas y le agregas secos, como hojas o cartón', 'La tapas con plástico para que no entre aire'], correcta: 1,
        pista: '<p>El mal olor indica falta de aire o exceso de verdes.</p>',
        solucion: '<p><strong>Voltearla y agregar secos.</strong> Así entra aire y se equilibra la proporción.</p>' },
      { tipo: 'opciones', enunciado: '<p>Aprietas un puñado de tierra húmeda y queda una bola pegajosa que puedes moldear. ¿Qué tiene en abundancia?</p>',
        opciones: ['Arcilla', 'Arena', 'Grava'], correcta: 0,
        pista: '<p>Es la partícula más fina, la que se pega.</p>',
        solucion: '<p><strong>Arcilla.</strong> Guarda agua y nutrientes, pero se encharca; la materia orgánica la mejora.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la proporción de arena, limo y arcilla que tiene un suelo?</p>',
        respuestas: ['textura', 'la textura', 'textura del suelo', 'la textura del suelo'],
        pista: '<p>Es la misma palabra que usas para describir si algo se siente liso o áspero.</p>',
        solucion: '<p>La <strong>textura del suelo</strong>.</p>' },
    ],
    fuentes: [EPA, OSU, WIKI('Compostaje', 'Compost'), WIKI('Textura_del_suelo', 'Textura del suelo')],
  });

  // ------------------------------------------------------------------
  L('Lombricomposta y abonos verdes', {
    objetivo: 'Preparar y cuidar una lombricomposta, y entender cómo un abono verde alimenta el suelo, sobre todo con plantas como el frijol.',
    explicacion: `
      <p>Si vives en un departamento, quizás no tienes espacio para una pila de composta. Pero en una caja del tamaño de una maleta, debajo del fregadero o en el balcón, unas lombrices pueden convertir tus cáscaras en uno de los mejores abonos que existen.</p>
      <h3>Lombricomposta</h3>
      <p>La <strong>lombricomposta</strong> es el abono que producen las lombrices al comerse los restos orgánicos: lo que sale de ellas es una tierra oscura y fina, muy rica en nutrientes. Según la EPA, la agencia ambiental de Estados Unidos, estos son los pasos:</p>
      <ul>
        <li>Las lombrices. De las miles de especies de lombriz de tierra, solo unas pocas sirven. La más usada es la lombriz roja, cuyo nombre científico es <span lang="la">Eisenia fetida</span>. No sirven las que encuentras en el jardín ni las de carnada. Para empezar, la EPA sugiere una libra, unos 450 gramos, que son más o menos 1 000 lombrices.</li>
        <li>La cama. Papel periódico sin brillo, cartón u hojas secas, en tiras y remojados 10 minutos. Se exprimen hasta que se sientan como una esponja húmeda, se esponjan dentro de la caja hasta casi la mitad y se agrega un puñado de tierra.</li>
        <li>La comida. Restos de fruta y verdura en pedacitos, posos de café y cáscaras de huevo molidas. Cada vez que agregas comida, la tapas con unos 5 cm de cama.</li>
        <li>El lugar. Dentro de la casa o a la sombra. La EPA indica una temperatura de 15 a 25 °C; las lombrices aguantan más frío o más calor si tienen suficiente cama.</li>
      </ul>
      <p>Las lombrices comen cerca de la cuarta parte de su peso al día, así que no hay que llenarlas de comida: espera a que terminen lo anterior antes de agregar más. No les des cítricos, cebolla ni ajo, por su olor y su acidez, ni carne, lácteos, grasa, huesos o excremento de mascotas. A los 3 a 6 meses puedes cosechar la lombricomposta del fondo de la caja.</p>
      <p>Las señales de que algo va mal son claras. Si huele mal, hay demasiada comida o está muy mojada: deja de alimentar y agrega cama seca. Si las lombrices se juntan en la tapa o intentan salir, algo no les gusta: revisa la humedad y la temperatura.</p>
      <h3>Abonos verdes</h3>
      <p>Hay otra forma de alimentar el suelo sin cargar nada: sembrar plantas para devolverlas a la tierra. A un cultivo que se siembra para proteger y mejorar el suelo, y no para cosecharlo, se le llama cultivo de cobertura. Cuando ese cultivo se corta y se mezcla con la tierra antes de sembrar lo siguiente, se le llama <strong>abono verde</strong>, según la guía de cultivos de cobertura del programa SARE.</p>
      <p>Las mejores son las leguminosas: frijol, chícharo, haba, garbanzo, lenteja o cacahuate. En Ciencias naturales, en "Ciclos del agua, el carbono y el nitrógeno", viste que sus raíces viven junto con bacterias que fijan el nitrógeno del aire. Al mezclar esas plantas con el suelo, ese nitrógeno queda para el siguiente cultivo, y hace falta menos fertilizante. Otras plantas, como la avena, el trigo o el centeno, no fijan nitrógeno, pero cubren el suelo contra la lluvia y el viento, frenan las hierbas y aportan mucha materia orgánica.</p>
      <p>Un abono verde se siembra cuando la tierra va a quedar vacía, por ejemplo entre una cosecha y la siguiente. Se corta antes de que dé semilla, para que no se vuelva hierba, se deja secar un poco y se mezcla con la tierra, o se deja encima como cubierta.</p>
      <p class="nota"><strong>Trampa común:</strong> dar demasiada comida a las lombrices al principio. Lo que no comen se pudre, atrae moscas y huele mal.</p>`,
    ejemplo: `
      <p>Empiezas tu lombricomposta con 1 libra de lombrices, unos 450 gramos. Si comen la cuarta parte de su peso al día, ¿cuánta comida procesan en una semana?</p>
      <ol class="pasos-ej">
        <li>Primero calcula lo que comen en un día. La cuarta parte es el 25%: 450 ÷ 4 = 112.5 gramos al día.</li>
        <li>Multiplica por los 7 días de la semana: 112.5 × 7 = 787.5 gramos.</li>
        <li>Redondea para que sea práctico: unos 800 gramos por semana, un poco menos de un kilo.</li>
        <li>Comprueba de otra forma: en una semana comen 7 cuartos de su peso, es decir, 1.75 veces su peso. Y 450 × 1.75 = 787.5 gramos.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 800 gramos de restos por semana</span>. Si tu casa produce más, no los fuerces: lleva el resto a otra composta.</p>
      <p class="nota"><strong>Error común:</strong> usar el peso de la caja o de la cama. Lo que cuenta es el peso de las lombrices.</p>`,
    vidaReal: `
      <p>Las lombrices y las plantas que alimentan el suelo te ayudan aunque tengas poco espacio:</p>
      <ul>
        <li>En un departamento puedes convertir tus cáscaras en abono sin malos olores.</li>
        <li>Obtienes un abono muy rico para tus macetas sin comprarlo.</li>
        <li>Entre una cosecha y otra, la tierra no queda desnuda ni pierde fuerza.</li>
        <li>Sembrar frijol o haba entre temporadas te ahorra fertilizante y además puede darte una cosecha.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tienes 2 libras de lombrices, unos 900 gramos. Si comen la cuarta parte de su peso al día, ¿cuántos gramos de comida procesan en un día?</p>', respuesta: 900 / 4,
        pista: '<p>La cuarta parte es dividir entre 4.</p>',
        solucion: '<p>900 ÷ 4 = <strong>225 gramos</strong> al día.</p>' },
      { tipo: 'numero', enunciado: '<p>Si 1 libra de lombrices son unas 1 000 lombrices, ¿cuántas lombrices hay, más o menos, en 3 libras?</p>', respuesta: 3 * 1000,
        pista: '<p>Multiplica las libras por 1 000.</p>',
        solucion: '<p>3 × 1 000 = <strong>3 000 lombrices</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos restos NO debes darle a tus lombrices?</p>',
        opciones: ['Cáscaras de naranja y de limón', 'Cáscaras de pepino', 'Posos de café'], correcta: 0,
        pista: '<p>La EPA pide evitar los cítricos.</p>',
        solucion: '<p><strong>Las cáscaras de naranja y de limón</strong>, porque son cítricos. El pepino y los posos de café sí les sirven.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué las leguminosas, como el frijol, son buenas como abono verde?</p>',
        opciones: ['Porque crecen sin agua', 'Porque sus raíces, con ayuda de bacterias, fijan nitrógeno del aire que queda en el suelo', 'Porque espantan a todas las plagas'], correcta: 1,
        pista: '<p>Recuerda el ciclo del nitrógeno de Ciencias naturales.</p>',
        solucion: '<p><strong>Porque fijan nitrógeno</strong> con ayuda de bacterias, y al mezclarlas con la tierra ese nitrógeno queda para el siguiente cultivo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuándo conviene cortar un abono verde?</p>',
        opciones: ['Después de que tire sus semillas', 'Nunca, se deja crecer para siempre', 'Antes de que dé semilla, para mezclarlo con la tierra'], correcta: 2,
        pista: '<p>Si da semilla, se vuelve una hierba más en tu huerto.</p>',
        solucion: '<p><strong>Antes de que dé semilla.</strong> Así no se vuelve hierba y se aprovecha en la tierra.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama un cultivo que se siembra para mezclarlo con la tierra y alimentarla, en lugar de cosecharlo?</p>',
        respuestas: ['abono verde', 'un abono verde', 'el abono verde', 'abonos verdes'],
        pista: '<p>Son dos palabras: una significa fertilizante y la otra es un color.</p>',
        solucion: '<p>Un <strong>abono verde</strong>.</p>' },
    ],
    fuentes: [EPA, SARE, WIKI('Lombricultura', 'Lombricultura'), WIKI('Abono_verde', 'Abono verde')],
  });

  // ------------------------------------------------------------------
  const PLANO = diagrama([-1.2, 10.6], [-1.8, 7.6], [
    caja(0, 0, 2.4, 6), caja(3.2, 0, 5.6, 6), caja(6.4, 0, 8.8, 6),
    txt(1.2, 3, 'cama'), txt(4.4, 3, 'cama'), txt(7.6, 3, 'cama'),
    txt(2.8, -0.6, 'pasillo'),
    ...flecha([1.2, 6.5], [0, 6.5], 0, 1.2), ...flecha([1.2, 6.5], [2.4, 6.5], 0, 1.2),
    txt(1.2, 7.1, '1.2 m'),
    txt(-0.6, 3, '3 m'),
    ...flecha([9.9, 4.4], [9.9, 6.2], 0, 1.2), txt(9.9, 3.8, 'N'),
  ], 'Plano de un huerto visto desde arriba: tres camas rectangulares de 1.2 m de ancho y 3 m de largo, una junto a otra, separadas por pasillos. Sobre la primera cama, una línea con flechas en las dos puntas marca su ancho de 1.2 m, y a su lado se indica el largo de 3 m. Debajo, entre las camas, dice pasillo. Una flecha a la derecha apunta al norte.');

  L('Diseñar tu huerto: sol, espacio y camas de cultivo', {
    objetivo: 'Elegir el mejor lugar para un huerto y diseñar camas de cultivo con medidas que te permitan trabajarlas sin pisar la tierra.',
    explicacion: `
      <p>Antes de mover una sola palada de tierra, pasa un día observando tu patio o terreno. ¿Dónde da el sol en la mañana, al mediodía y en la tarde? ¿Dónde se encharca cuando llueve? ¿Dónde está la llave del agua? Un huerto bien ubicado te ahorra la mitad del trabajo.</p>
      <h3>Elegir el lugar</h3>
      <p>La guía "Su propio cultivo" de la Universidad Estatal de Oregon da estas recomendaciones para escoger el sitio:</p>
      <ul>
        <li>Que reciba al menos 6 horas de sol directo al día, de preferencia de 8 a 10, como viste en la primera lección de esta unidad.</li>
        <li>Que esté lejos de árboles y arbustos grandes, porque dan sombra y sus raíces le roban agua y nutrientes a las verduras.</li>
        <li>Que tenga el agua cerca. Si para regar tienes que arrastrar una manguera larga, regar se vuelve una carga.</li>
        <li>Que tenga buen drenaje y algo de aire en movimiento. El aire caliente, húmedo y quieto favorece las enfermedades de las hojas.</li>
        <li>Que no esté en un hoyo o al pie de una pendiente cerrada, donde se junta el aire frío y caen más heladas.</li>
      </ul>
      <p>Para encontrar el sol, anota cada dos horas qué partes del patio están soleadas. Recuerda que el sol cambia de altura con las estaciones, como viste en "Movimientos de la Tierra: días, años y estaciones"; en invierno, las sombras son más largas.</p>
      <h3>Camas de cultivo</h3>
      <p>Una <strong>cama de cultivo</strong> es una franja de tierra preparada para sembrar, separada por pasillos por donde caminas. La idea clave es que nunca pises la tierra donde crecen las plantas. Cada vez que pisas, aplastas el suelo, cierras los huecos donde van el aire y el agua, y a las raíces les cuesta más crecer.</p>
      <p>Por eso el ancho importa. Desde un lado, con el brazo estirado, alcanzas cómodamente unos 60 cm, aunque varía de una persona a otra. Si la cama tiene pasillo en los dos lados, puedes llegar al centro desde cualquiera, así que el ancho ideal es el doble: unos 1.2 m. La guía de Oregon recomienda camas de 48 pulgadas, que son justo 1.2 m, con pasillos de 14 a 16 pulgadas, unos 35 a 40 cm. Si la cama está pegada a una pared, solo alcanzas desde un lado, y conviene que mida la mitad: unos 60 cm.</p>
      <p>El largo depende de tu espacio. Camas muy largas te obligan a rodearlas para cruzar; de 3 a 4 metros suele ser cómodo.</p>
      ${PLANO}
      <h3>Camas elevadas</h3>
      <p>Una cama elevada es una cama más alta que el pasillo, con o sin bordes de madera, block o piedra. Según la guía de Oregon, mejoran el drenaje, la tierra se calienta antes en primavera y se cultiva más en menos espacio. A cambio, se secan más rápido y necesitan riego más seguido. Si usas madera, que no esté pintada ni tratada con químicos.</p>
      <h3>Empezar pequeño</h3>
      <p>Como viste en la primera unidad, es mejor una cama bien cuidada que tres abandonadas. Empieza con una de 1.2 m × 3 m; son 3.6 m², espacio suficiente para varias hierbas, lechugas y un par de matas de jitomate. Cuando la domines, agrega otra.</p>
      <p class="nota"><strong>Trampa común:</strong> hacer camas muy anchas para aprovechar el espacio. Terminas pisándolas para llegar al centro, y la tierra se aprieta.</p>`,
    ejemplo: `
      <p>Tienes un patio de 4 m de ancho. Quieres camas de 1.2 m de ancho, con un pasillo de 40 cm entre una y otra y también en los dos extremos. ¿Cuántas camas caben?</p>
      <ol class="pasos-ej">
        <li>Primero pasa todo a la misma unidad: 40 cm son 0.4 m.</li>
        <li>Prueba con 2 camas. Necesitas 3 pasillos (uno a cada lado y uno en medio): 2 × 1.2 + 3 × 0.4 = 2.4 + 1.2 = 3.6 m. Sí caben en 4 m.</li>
        <li>Prueba con 3 camas. Necesitas 4 pasillos: 3 × 1.2 + 4 × 0.4 = 3.6 + 1.6 = 5.2 m. No caben.</li>
        <li>Comprueba lo que sobra con 2 camas: 4 − 3.6 = 0.4 m, que puedes repartir para hacer los pasillos un poco más anchos.</li>
      </ol>
      <p>Resultado: <span class="resultado">caben 2 camas</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar los pasillos de las orillas. Sin ellos no puedes llegar al centro desde ese lado.</p>`,
    vidaReal: `
      <p>Planear antes de sembrar evita trabajo y gastos inútiles:</p>
      <ul>
        <li>Pones las plantas donde de verdad les da el sol, y no tienes que moverlas después.</li>
        <li>No pisas la tierra que tanto te costó preparar.</li>
        <li>Riegas en menos tiempo porque el agua está cerca.</li>
        <li>Puedes calcular cuánta tierra, composta y madera comprar antes de empezar.</li>
        <li>Aprovechas mejor un patio pequeño, porque cada metro tiene un uso pensado.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una cama mide 1.2 m de ancho y 4 m de largo. ¿Cuántos metros cuadrados tiene?</p>', respuesta: 1.2 * 4,
        pista: '<p>El área de un rectángulo es largo por ancho.</p>',
        solucion: '<p>1.2 × 4 = <strong>4.8 m²</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Quieres llenar una cama de 1.2 m × 3 m con 20 cm de tierra con composta. ¿Cuántos metros cúbicos necesitas?</p>', respuesta: 1.2 * 3 * 0.2,
        pista: '<p>Pasa los 20 cm a metros y multiplica largo por ancho por alto.</p>',
        solucion: '<p>20 cm son 0.2 m, así que 1.2 × 3 × 0.2 = <strong>0.72 m³</strong>, es decir, 720 litros.</p>' },
      { tipo: 'numero', enunciado: '<p>Una cama está pegada a una pared, así que solo puedes alcanzarla desde un lado. Si con el brazo alcanzas 60 cm, ¿cuántos centímetros de ancho debe tener como máximo?</p>', respuesta: 60,
        pista: '<p>Desde un solo lado no puedes alcanzar más allá de tu brazo.</p>',
        solucion: '<p><strong>60 cm</strong>. Con pasillo en los dos lados podría medir el doble, 1.2 m.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué no se debe pisar la tierra de una cama de cultivo?</p>',
        opciones: ['Porque se apelmaza y pierde los huecos para el aire y el agua', 'Porque se pone más ácida y las plantas no la toleran', 'Porque se seca y se convierte en polvo'], correcta: 0,
        pista: '<p>Piensa en lo que necesitan las raíces además del agua.</p>',
        solucion: '<p><strong>Porque se apelmaza.</strong> Al aplastarla se cierran los huecos y a las raíces les falta aire y les cuesta crecer.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos lugares es el mejor para un huerto?</p>',
        opciones: ['Bajo un árbol grande, para que las plantas tengan sombra', 'En un hoyo donde se junta el agua', 'Un lugar con 8 horas de sol, con la llave del agua cerca'], correcta: 2,
        pista: '<p>Recuerda las recomendaciones de la guía de Oregon.</p>',
        solucion: '<p><strong>El lugar con 8 horas de sol y agua cerca.</strong> Bajo un árbol falta luz y sobran raíces, y en un hoyo se encharca y caen heladas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la franja de tierra preparada para sembrar, separada por pasillos, que nunca se pisa?</p>',
        respuestas: ['cama de cultivo', 'cama', 'camas de cultivo', 'una cama de cultivo', 'la cama de cultivo', 'bancal', 'cantero', 'arriate'],
        pista: '<p>Se llama igual que el mueble donde duermes, más "de cultivo".</p>',
        solucion: '<p>Una <strong>cama de cultivo</strong>; en algunos lugares le dicen bancal o cantero.</p>' },
    ],
    fuentes: [OSU, WIKI('Huerto', 'Huerta')],
  });

  // ------------------------------------------------------------------
  L('Huerto en macetas y balcones', {
    objetivo: 'Elegir macetas del tamaño correcto, prepararlas con un buen sustrato y cuidar un huerto en un balcón o una azotea.',
    explicacion: `
      <p>No hace falta un terreno para cultivar comida. Una cubeta vieja con agujeros, un huacal forrado o una caja de madera en una ventana soleada pueden darte hierbas, lechugas y hasta jitomates. Pero una maceta no es un pedazo de jardín: es un espacio pequeño y cerrado, y eso cambia las reglas.</p>
      <h3>El tamaño importa</h3>
      <p>En una maceta, las raíces solo tienen la tierra que les das. Si es muy chica, la planta se queda pequeña y se seca en un día de calor. La Extensión de la Universidad de Wisconsin da estas medidas mínimas:</p>
      <ul>
        <li>Las plantas pequeñas, como lechuga, espinaca, rábano, cilantro y cebollín, necesitan macetas de al menos 2 galones, unos 7.5 litros, y de 10 a 15 cm de profundidad.</li>
        <li>Las plantas grandes, como jitomate, chile, pepino, calabacita o berenjena, necesitan al menos 5 galones, unos 19 litros, y de 30 a 45 cm de profundidad.</li>
      </ul>
      <p>La guía de Oregon añade que, para casi cualquier planta, la maceta debe tener al menos 15 cm de profundidad. Una cubeta de 19 litros que antes tuvo comida, bien lavada, sirve para un jitomate. No uses recipientes que tuvieron pintura, solventes u otros químicos tóxicos.</p>
      <h3>Drenaje</h3>
      <p>El <strong>drenaje</strong> es la salida del agua que sobra. Toda maceta necesita agujeros en el fondo; si no, el agua se acumula abajo, las raíces se ahogan y se pudren, como viste en la primera lección de esta unidad. Si reutilizas una cubeta, hazle varios agujeros en la base.</p>
      <p>Mucha gente pone piedras o pedazos de barro en el fondo "para que drene". La Extensión de Wisconsin explica que las investigaciones muestran lo contrario: esas capas estorban el paso del agua, porque el agua se mueve mejor por una columna continua de tierra. Llena toda la maceta con la misma mezcla.</p>
      <h3>El sustrato</h3>
      <p>A la mezcla en la que crecen las plantas en maceta se le llama <strong>sustrato</strong>. Según la guía de Oregon, la tierra del jardín es demasiado pesada para una maceta: se aprieta, se encharca y deja sin aire a las raíces. Un buen sustrato es ligero y esponjoso. Se compra hecho, o se mezcla tierra con composta y algún material que dé aire, como fibra de coco o perlita.</p>
      <h3>Riego y abono</h3>
      <p>Las macetas se secan mucho más rápido que el suelo, sobre todo las de barro, las pequeñas y las que reciben viento. En días calurosos, una maceta puede necesitar agua todos los días. Mete el dedo: si los primeros centímetros están secos, riega. La guía de Oregon indica regar hasta que el agua empiece a salir por los agujeros, para mojar todo el sustrato.</p>
      <p>Como el agua que sale por abajo se lleva nutrientes, las plantas en maceta necesitan abono más seguido que las del suelo. Agrega un poco de composta o lombricomposta cada mes.</p>
      <h3>Balcones y azoteas</h3>
      <p>Busca la parte con más sol. Junta las macetas para que se den sombra entre sí en los días de calor, y protégelas del viento fuerte. Y no olvides el peso: como viste en "Empezar poco a poco", la tierra mojada pesa mucho más de lo que parece, y varias macetas grandes juntas suman mucho peso. Reparte el peso, ponlo cerca de los muros o columnas y, ante la duda, pregunta si la estructura lo aguanta. Amarra o asegura las macetas altas para que el viento no las tire a la calle.</p>
      <p class="nota"><strong>Trampa común:</strong> llenar la maceta con tierra del jardín y piedras en el fondo. La tierra se aprieta y las piedras estorban el drenaje.</p>`,
    ejemplo: `
      <p>Tienes una cubeta cilíndrica de 30 cm de diámetro y 30 cm de alto. ¿Cuántos litros de sustrato le caben? ¿Sirve para un jitomate?</p>
      <ol class="pasos-ej">
        <li>Primero saca el radio, que es la mitad del diámetro: 30 ÷ 2 = 15 cm.</li>
        <li>El volumen de un cilindro es el área del círculo por la altura. El área es π × 15² ≈ 3.14 × 225 = 706.5 cm².</li>
        <li>Multiplica por la altura: 706.5 × 30 = 21 195 cm³. Como 1 litro son 1 000 cm³, son unos 21 litros.</li>
        <li>Compara con la medida de Wisconsin: un jitomate necesita al menos 19 litros y de 30 a 45 cm de profundidad. Con 21 litros y 30 cm, cumple justo.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 21 litros; sirve para un jitomate</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar el diámetro en lugar del radio en la fórmula del círculo. El resultado saldría cuatro veces más grande.</p>`,
    vidaReal: `
      <p>Un huerto en macetas hace posible cultivar casi en cualquier lugar:</p>
      <ul>
        <li>Si rentas, puedes llevarte tus plantas cuando te mudes.</li>
        <li>Puedes tener hierbas frescas junto a la cocina, aunque vivas en un piso alto.</li>
        <li>Reutilizas cubetas y cajas en lugar de tirarlas.</li>
        <li>Puedes mover las macetas para seguir al sol o protegerlas de una tormenta.</li>
        <li>Una escuela, una oficina o un edificio sin patio también pueden tener su huerto.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una maceta rectangular mide 40 cm de largo, 20 cm de ancho y 20 cm de alto. ¿Cuántos litros de sustrato le caben?</p>', respuesta: 40 * 20 * 20 / 1000,
        pista: '<p>Multiplica las tres medidas para obtener centímetros cúbicos, y divide entre 1 000 para pasar a litros.</p>',
        solucion: '<p>40 × 20 × 20 = 16 000 cm³, que son <strong>16 litros</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>La Extensión de Wisconsin pide al menos 5 galones para un jitomate. Si un galón son 3.8 litros, ¿cuántos litros son?</p>', respuesta: 5 * 3.8,
        pista: '<p>Multiplica los galones por 3.8.</p>',
        solucion: '<p>5 × 3.8 = <strong>19 litros</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Quieres sembrar lechugas, que necesitan macetas de al menos 7.5 litros. Tienes un costal de 50 litros de sustrato. ¿Cuántas macetas completas de 7.5 litros puedes llenar?</p>', respuesta: Math.floor(50 / 7.5),
        pista: '<p>Divide 50 entre 7.5 y quédate solo con las macetas completas.</p>',
        solucion: '<p>50 ÷ 7.5 ≈ 6.7, así que puedes llenar <strong>6 macetas</strong> completas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué conviene poner en el fondo de una maceta para que drene bien?</p>',
        opciones: ['Una capa de piedras', 'Nada: agujeros en la base y el mismo sustrato hasta abajo', 'Un plástico para que no se salga la tierra'], correcta: 1,
        pista: '<p>Recuerda lo que dicen las investigaciones que cita la Extensión de Wisconsin.</p>',
        solucion: '<p><strong>Agujeros en la base y el mismo sustrato hasta abajo.</strong> Las capas de piedra estorban el paso del agua, y el plástico la atrapa.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué no conviene usar tierra del jardín en una maceta?</p>',
        opciones: ['Porque es demasiado pesada: se aprieta, se encharca y deja sin aire a las raíces', 'Porque no tiene nutrientes', 'Porque trae demasiados nutrientes y quema las plantas'], correcta: 0,
        pista: '<p>Piensa en lo que pasa con la tierra en un espacio cerrado que se riega seguido.</p>',
        solucion: '<p><strong>Porque es demasiado pesada.</strong> En la maceta se compacta y les quita el aire a las raíces.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la mezcla ligera en la que crecen las plantas en maceta?</p>',
        respuestas: ['sustrato', 'el sustrato', 'un sustrato', 'tierra para macetas', 'sustrato para macetas'],
        pista: '<p>Empieza con "sus".</p>',
        solucion: '<p>El <strong>sustrato</strong>.</p>' },
    ],
    fuentes: [WISC, OSU],
  });

  // ------------------------------------------------------------------
  L('Riego eficiente', {
    objetivo: 'Saber cuándo y cuánto regar según el suelo, la planta y el clima, y usar el riego profundo y el mantillo para gastar menos agua.',
    explicacion: `
      <p>Mucha gente riega un poquito todos los días, a la hora que se acuerda, con la manguera en la mano. Parece cuidadoso, pero es una de las formas más comunes de desperdiciar agua y de tener plantas débiles. Regar bien tiene más que ver con observar que con regar seguido.</p>
      <h3>Riego profundo</h3>
      <p>Si mojas solo los primeros centímetros de tierra, las raíces se quedan arriba, donde el suelo se seca en pocas horas. Si mojas hondo, las raíces bajan a buscar el agua, y una planta con raíces profundas aguanta mejor el calor y los días sin riego. Por eso se recomienda el <strong>riego profundo</strong>: regar mucho, pero pocas veces.</p>
      <p>La guía "Su propio cultivo" de la Universidad Estatal de Oregon lo explica así: las plantas que ya crecieron se riegan hasta mojar por lo menos 15 cm de profundidad, y luego se deja secar la superficie, de 2.5 a 5 cm, antes de volver a regar. Las semillas y las plantitas recién nacidas son la excepción: tienen raíces cortas, así que se mantienen húmedas con un rocío suave todos los días o cada tercer día, sin que el chorro las arrastre.</p>
      <h3>No hay un calendario fijo</h3>
      <p>La misma guía advierte que es mejor observar el huerto que seguir un horario, porque la necesidad de agua cambia con:</p>
      <ul>
        <li>El suelo. La tierra arenosa absorbe y suelta el agua unas dos veces más rápido que la arcillosa, así que se riega más seguido, con menos agua cada vez.</li>
        <li>La planta. Las grandes consumen más que las pequeñas. Las de raíz corta, como la lechuga, toman agua de los primeros 30 cm; las de raíz honda, como el maíz y el jitomate, de hasta 60 cm.</li>
        <li>El clima. El calor y el viento secan la tierra mucho más rápido.</li>
      </ul>
      <p>Para saber si toca regar, haz la prueba del dedo: mételo en la tierra hasta el segundo nudillo. Si se siente seca a esa profundidad, riega. Las plantas también avisan: según la guía de Oregon, cuando necesitan agua se ponen de un verde azulado oscuro o se marchitan en la hora más caliente del día.</p>
      <h3>Cuándo y dónde</h3>
      <p>Riega temprano en la mañana. Hace menos calor, así que se evapora menos agua, y las hojas que se mojan tienen todo el día para secarse; la guía de Oregon explica que las hojas mojadas durante la noche favorecen las enfermedades. Dirige el agua a la base de la planta, a la tierra, y no a las hojas.</p>
      <h3>Mantillo</h3>
      <p>El <strong>mantillo</strong>, también llamado acolchado, es una capa de material que cubre la tierra alrededor de las plantas: paja, hojas secas, pasto seco o composta. Funciona como una cobija: el sol no le pega directo a la tierra, se evapora menos agua, la tierra se mantiene más fresca y crecen menos hierbas. La EPA, la agencia ambiental de Estados Unidos, sugiere usar composta como mantillo en una capa de unos 7.5 cm, dejando libres unos centímetros alrededor de los tallos para que no se pudran.</p>
      <p>Si juntas agua de lluvia, como viste en la unidad Agua, el riego profundo y el mantillo hacen que esa reserva te dure mucho más.</p>
      <p class="nota"><strong>Trampa común:</strong> regar de noche para "no desperdiciar". Se evapora poco, sí, pero las hojas quedan mojadas muchas horas, y eso ayuda a los hongos.</p>`,
    ejemplo: `
      <p>Tienes dos camas: una de suelo arenoso y otra de suelo arcilloso. La arcillosa la riegas cada 6 días. Si la tierra arenosa suelta el agua unas dos veces más rápido, ¿cada cuántos días riegas la arenosa?</p>
      <ol class="pasos-ej">
        <li>Primero piensa qué significa "dos veces más rápido": la arenosa se seca en la mitad del tiempo.</li>
        <li>Divide: 6 ÷ 2 = 3 días.</li>
        <li>Como guarda menos agua, cada riego puede ser más corto; si le echaras la misma cantidad que a la arcillosa, el agua se iría hacia abajo, lejos de las raíces.</li>
        <li>Comprueba con la prueba del dedo: al tercer día, mete el dedo en la cama arenosa. Si está seca a la profundidad del segundo nudillo, tu cálculo fue correcto.</li>
      </ol>
      <p>Resultado: <span class="resultado">cada 3 días, con riegos más cortos</span>.</p>
      <p class="nota"><strong>Error común:</strong> seguir el cálculo aunque llueva o haga mucho calor. El cálculo es una guía; la tierra te dice la verdad.</p>`,
    vidaReal: `
      <p>Regar con inteligencia se nota en tu huerto y en tu recibo:</p>
      <ul>
        <li>Usas menos agua y tus plantas aguantan mejor una ola de calor.</li>
        <li>Pasas menos tiempo regando cada semana.</li>
        <li>Tus plantas se enferman menos porque sus hojas no pasan la noche mojadas.</li>
        <li>Con una capa de hojas secas, casi no tienes que arrancar hierbas.</li>
        <li>En temporada seca, el agua que guardaste te alcanza para más semanas de riego.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>La guía de Oregon pide mojar al menos 6 pulgadas de profundidad. Si una pulgada son 2.54 cm, ¿cuántos centímetros son? Redondea a un decimal.</p>', respuesta: 6 * 2.54, tolerancia: 0.06,
        pista: '<p>Multiplica 6 por 2.54.</p>',
        solucion: '<p>6 × 2.54 = 15.24, unos <strong>15.2 cm</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una cama de arcilla la riegas cada 8 días. Si la arenosa se seca dos veces más rápido, ¿cada cuántos días riegas la arenosa?</p>', respuesta: 8 / 2,
        pista: '<p>Dos veces más rápido es en la mitad del tiempo.</p>',
        solucion: '<p>8 ÷ 2 = <strong>cada 4 días</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Quieres cubrir con mantillo una cama de 1.2 m × 3 m con una capa de 7.5 cm. ¿Cuántos litros de material necesitas?</p>', respuesta: 120 * 300 * 7.5 / 1000,
        pista: '<p>Pasa todo a centímetros, multiplica y divide entre 1 000 para obtener litros.</p>',
        solucion: '<p>120 × 300 × 7.5 = 270 000 cm³, que son <strong>270 litros</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es la mejor hora para regar?</p>',
        opciones: ['Al mediodía, con el sol más fuerte', 'Temprano en la mañana', 'A media noche'], correcta: 1,
        pista: '<p>Busca la hora en que se evapora poca agua y las hojas tienen tiempo de secarse.</p>',
        solucion: '<p><strong>Temprano en la mañana.</strong> Se evapora menos y las hojas se secan antes de la noche.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el riego profundo hace a las plantas más resistentes?</p>',
        opciones: ['Porque las hojas absorben más agua', 'Porque el agua profunda es más fría', 'Porque las raíces bajan a buscar el agua y aguantan más días secos'], correcta: 2,
        pista: '<p>Piensa en hacia dónde crecen las raíces.</p>',
        solucion: '<p><strong>Porque las raíces crecen hacia abajo</strong>, donde la tierra tarda más en secarse.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la capa de paja, hojas secas o composta que cubre la tierra para que se evapore menos agua?</p>',
        respuestas: ['mantillo', 'el mantillo', 'acolchado', 'el acolchado', 'acolchonado', 'cobertura'],
        pista: '<p>Viene de "manta".</p>',
        solucion: '<p>El <strong>mantillo</strong>, también llamado acolchado.</p>' },
    ],
    fuentes: [OSU, EPA, WIKI('Acolchado', 'Acolchado')],
  });

  // ------------------------------------------------------------------
  const OLLA = diagrama([-5, 5], [-4.6, 2.4], [
    { tipo: 'linea', desde: [-5, 0], hasta: [5, 0] },
    { tipo: 'poligono', puntos: [[-0.4, 0.3], [-0.4, -0.3], [-1.2, -1], [-1.3, -2], [-0.9, -2.8], [0.9, -2.8], [1.3, -2], [1.2, -1], [0.4, -0.3], [0.4, 0.3]] },
    { tipo: 'linea', desde: [-0.7, 0.45], hasta: [0.7, 0.45] },
    { tipo: 'poligono', abierto: true, puntos: Array.from({ length: 25 }, (_, i) => { const a = Math.PI * (1 + i / 24); return [2.6 * Math.cos(a), -1.6 + 2.2 * Math.sin(a) * 0.9]; }), punteada: true },
    { tipo: 'linea', desde: [-2.6, -1.6], hasta: [-2.6, 0], punteada: true }, { tipo: 'linea', desde: [2.6, -1.6], hasta: [2.6, 0], punteada: true },
    { tipo: 'linea', desde: [-2, 0], hasta: [-2, 1.4] }, { tipo: 'linea', desde: [2, 0], hasta: [2, 1.4] },
    txt(-2, 1.9, 'planta'), txt(2, 1.9, 'planta'), txt(0, 1, 'tapa'),
    txt(0, -1.6, 'olla'),
    txt(3.6, -2.9, 'tierra'), txt(3.6, -3.4, 'húmeda'),
  ], 'Corte del suelo. Una olla de barro está enterrada hasta el cuello, con una tapa encima. Alrededor de la olla, una línea curva marca la zona de tierra húmeda, que es más o menos el doble de ancha que la olla. Una planta crece a cada lado de la olla, dentro de esa zona.');

  L('Riego por goteo casero', {
    objetivo: 'Entender cómo funciona el riego por goteo, regar con ollas de barro y con goteros, y calcular cuánta agua entrega un sistema que armes con tus manos.',
    explicacion: `
      <p>Con una manguera, buena parte del agua cae entre las plantas, en los pasillos o sobre las hojas, y otra parte se evapora. El riego por goteo hace lo contrario: entrega el agua poco a poco, justo donde están las raíces. Es como darle a cada planta su propio vaso en lugar de mojar todo el patio.</p>
      <h3>Por qué gasta menos</h3>
      <p>Cuando el agua sale despacio, la tierra la absorbe toda y no escurre. Como cae en la base de la planta, no se mojan las hojas ni los pasillos, y crecen menos hierbas. La guía "Su propio cultivo" de la Universidad Estatal de Oregon explica que el goteo cuesta tiempo y dinero al principio, pero después ahorra agua y trabajo. Un sistema típico funciona de 1 a 2 horas, una o dos veces por semana, siguiendo la idea del riego profundo que viste en la lección anterior.</p>
      <p>La misma guía da una advertencia: con el goteo es fácil regar de más, porque la superficie puede verse seca mientras abajo, donde están las raíces, la tierra sigue húmeda. Ante la duda, escarba un poco y revisa.</p>
      <h3>Ollas de barro</h3>
      <p>Es una técnica muy antigua. Una <strong>olla de riego</strong> es una vasija de barro sin esmaltar que se entierra junto a las plantas, con la boca afuera y tapada, y se llena de agua. Según la Extensión de la Universidad de Arizona, el barro sin esmaltar tiene poros diminutos: el agua sale despacio por sus paredes y humedece la tierra de alrededor, y las raíces crecen hacia la olla para tomarla. Puede ahorrar del 60 al 70% del agua comparado con regar con regadera.</p>
      ${OLLA}
      <ul>
        <li>El barro debe ser sin esmaltar; si está barnizado, el agua no sale.</li>
        <li>Se puede hacer con una maceta de barro, tapando su agujero con un pedazo de teja pegado con silicón de grado alimenticio.</li>
        <li>La olla se tapa, para que no entren tierra ni mosquitos y se evapore menos agua.</li>
        <li>Según la Extensión de Arizona, la olla moja más o menos un círculo del doble de su diámetro, así que las plantas se siembran cerca de ella.</li>
        <li>Se rellena cuando baja el nivel; qué tan seguido depende del suelo, del clima y de las plantas.</li>
      </ul>
      <h3>Botella enterrada</h3>
      <p>Una versión con material reciclado es una botella de plástico con algunos agujeros pequeños, enterrada junto a la planta y llena de agua. Usa solo botellas que tuvieron agua o refresco, nunca de químicos. Como cada botella gotea distinto según sus agujeros y la tierra, mide tú cuánto tarda en vaciarse y ajusta.</p>
      <h3>Manguera con goteros</h3>
      <p>Un <strong>gotero</strong> es una pieza pequeña que deja salir el agua gota a gota, a un ritmo fijo. Se venden mangueras con goteros ya integrados cada 15 a 30 cm. La Universidad de California recomienda no enterrar la manguera, para poder ver si funciona y repararla, y cubrirla con mantillo para que el sol no la dañe. También recomienda goteros autocompensados, que dan la misma agua al principio y al final de la línea.</p>
      <h3>Calcular cuánta agua das</h3>
      <p>Para saber cuánto entrega un gotero o una botella, pon un vaso medidor debajo durante unos minutos:</p>
      <p><strong>litros por hora = mililitros medidos × (60 ÷ minutos medidos) ÷ 1 000</strong></p>
      <p>Es decir, primero calculas cuántos mililitros saldrían en una hora completa, y luego los pasas a litros. Con eso decides cuánto tiempo dejar abierto el sistema.</p>
      <p class="nota"><strong>Trampa común:</strong> fiarse de la superficie seca. Con goteo, la tierra de arriba puede verse seca aunque abajo esté húmeda; revisa a la altura de las raíces antes de volver a regar.</p>`,
    ejemplo: `
      <p>Pones un vaso medidor bajo un gotero y en 5 minutos junta 150 mL. Tu cama tiene 10 goteros iguales. ¿Cuánta agua entrega la cama en una hora y media?</p>
      <ol class="pasos-ej">
        <li>Primero calcula lo que da un gotero en una hora. Una hora tiene 60 minutos, que son 12 veces 5 minutos: 150 × 12 = 1 800 mL, o sea 1.8 litros por hora.</li>
        <li>Multiplica por los 10 goteros: 1.8 × 10 = 18 litros por hora en toda la cama.</li>
        <li>Multiplica por el tiempo: 18 × 1.5 = 27 litros en una hora y media.</li>
        <li>Comprueba por minuto: un gotero da 150 ÷ 5 = 30 mL por minuto; 10 goteros, 300 mL por minuto; en 90 minutos, 300 × 90 = 27 000 mL, que son 27 litros.</li>
      </ol>
      <p>Resultado: <span class="resultado">27 litros por riego</span>.</p>
      <p class="nota"><strong>Error común:</strong> medir solo unos segundos. Mide al menos 5 minutos para que el resultado sea confiable.</p>`,
    vidaReal: `
      <p>Regar gota a gota te da más tiempo libre y más agua para otras cosas:</p>
      <ul>
        <li>Puedes salir unos días y tus plantas siguen recibiendo agua de las ollas.</li>
        <li>Si juntas agua de lluvia, te dura mucho más.</li>
        <li>Reutilizas botellas y macetas viejas en lugar de comprar equipo.</li>
        <li>Tus plantas reciben agua pareja y crecen mejor, aun en los días de más calor.</li>
        <li>Aprendes a medir y ajustar un sistema con tus propias manos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un gotero junta 100 mL en 5 minutos. ¿Cuántos litros entrega en una hora?</p>', respuesta: 100 * 12 / 1000,
        pista: '<p>Una hora tiene 12 veces 5 minutos.</p>',
        solucion: '<p>100 × 12 = 1 200 mL, que son <strong>1.2 litros</strong> por hora.</p>' },
      { tipo: 'numero', enunciado: '<p>Una línea tiene 8 goteros de 2 litros por hora. ¿Cuántos litros entrega en 1.5 horas?</p>', respuesta: 8 * 2 * 1.5,
        pista: '<p>Calcula primero cuánto dan los 8 goteros en una hora.</p>',
        solucion: '<p>8 × 2 = 16 litros por hora, y 16 × 1.5 = <strong>24 litros</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una olla de 20 cm de diámetro moja un círculo de más o menos el doble de su diámetro. ¿Cuántos centímetros de diámetro mide la zona húmeda?</p>', respuesta: 20 * 2,
        pista: '<p>El doble es multiplicar por 2.</p>',
        solucion: '<p>20 × 2 = <strong>40 cm</strong>. Las plantas deben estar dentro de ese círculo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué la olla de riego debe ser de barro sin esmaltar?</p>',
        opciones: ['Porque es más barata', 'Porque el esmalte tapa los poros y el agua no saldría', 'Porque el barro esmaltado se rompe al enterrarlo'], correcta: 1,
        pista: '<p>Piensa en por dónde sale el agua de la olla.</p>',
        solucion: '<p><strong>Porque el esmalte tapa los poros.</strong> El agua sale a través de las paredes del barro.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la Universidad de California, ¿qué conviene hacer con la manguera de goteo?</p>',
        opciones: ['Dejarla sobre la tierra y cubrirla con mantillo', 'Enterrarla a 30 cm', 'Dejarla al sol para que se caliente el agua'], correcta: 0,
        pista: '<p>Quieres poder ver si funciona y protegerla del sol.</p>',
        solucion: '<p><strong>Dejarla sobre la tierra y cubrirla con mantillo.</strong> Así la revisas fácil y el sol no la daña.</p>' },
      { tipo: 'opciones', enunciado: '<p>Riegas con goteo y la superficie se ve seca. ¿Qué haces antes de regar otra vez?</p>',
        opciones: ['Riego de inmediato', 'Riego el doble de tiempo', 'Escarbo un poco y reviso si la tierra está húmeda a la altura de las raíces'], correcta: 2,
        pista: '<p>La guía de Oregon advierte que con goteo es fácil regar de más.</p>',
        solucion: '<p><strong>Escarbo y reviso.</strong> Con goteo, abajo puede seguir húmedo aunque arriba se vea seco.</p>' },
    ],
    fuentes: [OLLAS, OSU, GOTEO, WIKI('Riego_por_goteo', 'Riego por goteo')],
  });

  // ------------------------------------------------------------------
  const ROTACION = diagrama([-4.4, 4.4], [-4, 4], [
    caja(-3.6, 0.6, -0.6, 3.2), txt(-2.1, 2.2, 'raíz'), txt(-2.1, 1.5, 'año 1'),
    caja(0.6, 0.6, 3.6, 3.2), txt(2.1, 2.2, 'hoja o semilla'), txt(2.1, 1.5, 'año 2'),
    caja(0.6, -3.2, 3.6, -0.6), txt(2.1, -1.6, 'familia de la col'), txt(2.1, -2.3, 'año 3'),
    caja(-3.6, -3.2, -0.6, -0.6), txt(-2.1, -1.6, 'leguminosa'), txt(-2.1, -2.3, 'año 4'),
    ...flecha([-0.5, 1.9], [0.5, 1.9], 0, 0.9), ...flecha([2.1, 0.5], [2.1, -0.5], 0, 0.9),
    ...flecha([0.5, -1.9], [-0.5, -1.9], 0, 0.9), ...flecha([-2.1, -0.5], [-2.1, 0.5], 0, 0.9),
  ], 'Cuatro cajas en cuadro unidas por flechas que giran como las manecillas del reloj. Arriba a la izquierda: raíz, año 1. Arriba a la derecha: hoja o semilla, año 2. Abajo a la derecha: familia de la col, año 3. Abajo a la izquierda: leguminosa, año 4. Después del año 4 se vuelve a empezar.');

  L('Calendario de siembra y rotación de cultivos', {
    objetivo: 'Decidir cuándo sembrar cada cultivo según el clima de tu zona y organizar una rotación de cuatro años para que el suelo no se canse ni se acumulen enfermedades.',
    explicacion: `
      <p>Si siembras jitomate en pleno invierno en un lugar donde hiela, se muere en una noche. Si siembras lechuga en lo más caliente del verano, se pone amarga y se espiga antes de que la cortes. Cada cultivo tiene su época, y sembrar a tiempo es la mitad de la cosecha.</p>
      <h3>Cultivos de temporada fría y de temporada cálida</h3>
      <p>Las verduras se dividen en dos grandes grupos según el clima que prefieren. Las de temporada fría, como la lechuga, la espinaca, la col, el brócoli, el chícharo, la zanahoria y el rábano, crecen bien con días frescos y aguantan algo de frío. Las de temporada cálida, como el jitomate, el chile, el maíz, el frijol, la calabaza y el pepino, necesitan calor y se dañan con las heladas.</p>
      <p>La guía "Su propio cultivo" de la Universidad Estatal de Oregon advierte que sembrar demasiado pronto, con la tierra y el aire todavía fríos, hace que las plantas tarden más en producir y den menos. Por eso los cultivos de temporada cálida se siembran cuando ya pasó el riesgo de heladas.</p>
      <h3>Tu calendario</h3>
      <p>Lo que marca el calendario depende de dónde vives:</p>
      <ul>
        <li>En lugares con inviernos fríos, la fecha clave es la de la última helada de primavera y la primera de otoño. Entre ellas está tu temporada de cultivo.</li>
        <li>En muchos lugares cálidos de América Latina casi nunca hiela, y lo que manda es la temporada de lluvias: lo que necesita mucha agua se siembra al empezar las lluvias, y en la temporada seca se riega o se siembra lo que aguanta mejor.</li>
      </ul>
      <p>Pregunta a personas que cultivan en tu zona y a la oficina agrícola local; ellas conocen las fechas mejor que cualquier libro. Anótalas en un calendario.</p>
      <h3>Contar hacia atrás</h3>
      <p>Los sobres de semilla dicen cuántos días tarda la planta desde la siembra hasta la cosecha. La guía de Oregon propone usar ese dato, junto con la fecha de la primera helada, para no sembrar tarde: si sabes cuándo llega la primera helada o cuándo terminan las lluvias, cuentas hacia atrás los días que necesita el cultivo, más un margen para imprevistos, y esa es tu fecha límite de siembra.</p>
      <h3>Rotación de cultivos</h3>
      <p>Si siembras lo mismo en el mismo lugar año tras año, se acumulan en ese suelo las plagas y los microbios que atacan a esa planta, y se agotan los nutrientes que más consume. La solución es la <strong>rotación</strong>: cambiar de lugar los cultivos cada temporada.</p>
      <p>Lo que se rota no es cada verdura, sino cada <strong>familia de plantas</strong>, porque las plantas de una misma familia comparten plagas y enfermedades. Por ejemplo, el jitomate, el chile, la papa y la berenjena son de la misma familia; la col, el brócoli, la coliflor y el rábano, de otra; el frijol, el chícharo y el haba, de otra más.</p>
      ${ROTACION}
      <p>La guía de Oregon recomienda una rotación de cuatro años: un cultivo de raíz, luego uno de hoja o de semilla, luego uno de la familia de la col y al final una leguminosa, que ayuda a devolver nitrógeno al suelo, como viste en "Lombricomposta y abonos verdes". La forma más fácil es tener cuatro camas y mover cada grupo a la siguiente cada año. Así, una familia vuelve al mismo lugar solo cada cuatro años.</p>
      <p class="nota"><strong>Trampa común:</strong> rotar verduras de la misma familia, por ejemplo, poner chile donde estuvo el jitomate. Para el suelo es como no haber rotado.</p>`,
    ejemplo: `
      <p>En tu zona, la primera helada llega alrededor del 1 de noviembre. Quieres sembrar un frijol que tarda 60 días hasta la cosecha, y dejas 14 días de margen. ¿Cuál es la última fecha para sembrarlo?</p>
      <ol class="pasos-ej">
        <li>Primero suma lo que necesitas: 60 días del cultivo más 14 de margen = 74 días.</li>
        <li>Ahora cuenta hacia atrás desde el 1 de noviembre. Octubre tiene 31 días: retroceder 31 te lleva al 1 de octubre. Te faltan 74 − 31 = 43 días.</li>
        <li>Septiembre tiene 30 días: retroceder 30 te lleva al 1 de septiembre. Te faltan 43 − 30 = 13 días.</li>
        <li>Retrocede 13 días desde el 1 de septiembre: 19 de agosto.</li>
        <li>Comprueba hacia adelante: del 19 de agosto al 1 de septiembre hay 13 días, más 30 de septiembre y 31 de octubre: 13 + 30 + 31 = 74.</li>
      </ol>
      <p>Resultado: <span class="resultado">sembrar a más tardar el 19 de agosto</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar el margen. Un cultivo puede tardar más de lo que dice el sobre si hace fresco o nublado.</p>`,
    vidaReal: `
      <p>Sembrar a tiempo y cambiar de lugar los cultivos se nota en la cosecha:</p>
      <ul>
        <li>No pierdes semillas ni trabajo por una helada o por el calor.</li>
        <li>Puedes tener algo que cosechar en casi todos los meses del año.</li>
        <li>Tus plantas se enferman menos de un año a otro.</li>
        <li>Gastas menos en fertilizante porque el suelo no se agota.</li>
        <li>Sabes qué semillas comprar en cada época, sin dejarte llevar por las ofertas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una lechuga tarda 50 días en estar lista y quieres dejar 10 días de margen. ¿Cuántos días antes de la primera helada debes sembrarla, como mínimo?</p>', respuesta: 50 + 10,
        pista: '<p>Suma los días del cultivo y el margen.</p>',
        solucion: '<p>50 + 10 = <strong>60 días</strong> antes de la helada.</p>' },
      { tipo: 'numero', enunciado: '<p>Con una rotación de 4 años, sembraste jitomate en la cama 1 en 2026. ¿En qué año vuelve esa familia a la cama 1?</p>', respuesta: 2026 + 4,
        pista: '<p>Cada familia vuelve al mismo lugar cada 4 años.</p>',
        solucion: '<p>2026 + 4 = <strong>2030</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos cultivos es de temporada cálida y se daña con las heladas?</p>',
        opciones: ['Lechuga', 'Chícharo', 'Calabaza'], correcta: 2,
        pista: '<p>Busca el que necesita calor.</p>',
        solucion: '<p><strong>La calabaza.</strong> La lechuga y el chícharo prefieren días frescos.</p>' },
      { tipo: 'opciones', enunciado: '<p>El año pasado sembraste jitomate en una cama. ¿Qué es mejor sembrar ahí este año?</p>',
        opciones: ['Chile, porque se parece al jitomate', 'Frijol, que es de otra familia', 'Papa'], correcta: 1,
        pista: '<p>El chile y la papa son de la misma familia que el jitomate.</p>',
        solucion: '<p><strong>Frijol.</strong> Es de otra familia y además ayuda a devolver nitrógeno al suelo. El chile y la papa comparten plagas con el jitomate.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué se rotan los cultivos?</p>',
        opciones: ['Para que no se acumulen las plagas y enfermedades de una familia ni se agoten los mismos nutrientes', 'Para que las plantas reciban más sol', 'Para que las semillas germinen solo en tierra nueva'], correcta: 0,
        pista: '<p>Piensa en lo que pasa en un suelo donde siempre crece lo mismo.</p>',
        solucion: '<p><strong>Para que no se acumulen plagas y enfermedades</strong> y para que el suelo no se agote de los mismos nutrientes.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la práctica de cambiar de lugar los cultivos cada temporada?</p>',
        respuestas: ['rotacion', 'rotacion de cultivos', 'la rotacion', 'la rotacion de cultivos'],
        pista: '<p>Viene del verbo "rotar", girar.</p>',
        solucion: '<p>La <strong>rotación de cultivos</strong>.</p>' },
    ],
    fuentes: [OSU, SARE, WIKI('Rotaci%C3%B3n_de_cultivos', 'Rotación de cultivos')],
  });

  // ------------------------------------------------------------------
  L('Asociación de cultivos: plantas que se ayudan', {
    objetivo: 'Distinguir las combinaciones de plantas que tienen respaldo de las que son solo tradición, y usar flores, plantas trampa y la diversidad para proteger tu huerto.',
    explicacion: `
      <p>Seguro has escuchado consejos como "siembra albahaca junto al jitomate" o "el cempasúchil espanta todas las plagas". Algunos de estos consejos tienen buenas razones y otros son solo costumbre. Aquí verás cómo distinguirlos.</p>
      <h3>¿Qué es la asociación de cultivos?</h3>
      <p>Sembrar plantas distintas juntas para que se beneficien entre sí se llama asociación de cultivos. La Extensión de la Universidad Estatal de Misisipi explica que algunas combinaciones se han pasado de generación en generación y otras se han estudiado y probado, pero muchas otras no tienen ninguna prueba de que funcionen. Por eso pide desconfiar de lo que se lee en internet si no dice en qué se basa.</p>
      <h3>Lo que sí tiene buenas razones</h3>
      <p>Estas formas de asociar plantas se apoyan en ideas que puedes comprobar:</p>
      <ul>
        <li>Usar mejor el espacio: una planta alta junto a una baja, o una de raíz honda junto a una de raíz corta, se estorban menos.</li>
        <li>Cubrir el suelo: plantas rastreras entre otras más altas tapan la tierra y frenan las hierbas.</li>
        <li>Aportar nitrógeno: las leguminosas, como el frijol, ayudan a sus vecinas, como viste en "Lombricomposta y abonos verdes".</li>
        <li>Atraer ayuda: las flores dan néctar y polen a los <strong>insectos benéficos</strong>, que son los que se comen a las plagas o las parasitan, como las catarinas y las crisopas, y a los polinizadores, como las abejas.</li>
      </ul>
      <p>La milpa, la combinación de maíz, frijol y calabaza que verás en la unidad Cultivos básicos, es el ejemplo más famoso y estudiado de asociación.</p>
      <h3>Cultivos trampa</h3>
      <p>Un <strong>cultivo trampa</strong> es una planta que a una plaga le gusta más que tu cultivo. Se siembra cerca para que la plaga se concentre en ella y deje en paz a las demás; luego se revisa y se retira la plaga de ahí. Funciona solo si se vigila: si no, la planta trampa se vuelve una fábrica de plagas.</p>
      <h3>Lo que tiene pruebas a medias</h3>
      <p>La Extensión de Misisipi pone un ejemplo honesto: el cempasúchil y otras flores de su familia. Se siembran mucho para "espantar insectos", pero quizás no protegen tanto como se cree. Un estudio encontró que sustancias de estas plantas matan a unos gusanitos microscópicos del suelo que dañan raíces, pero solo después de mezclar las plantas secas con la tierra. Otros estudios mostraron que la albahaca junto con el cempasúchil redujo los trips, unos insectos diminutos, en jitomates, y que el cempasúchil, la capuchina y la cebolla redujeron algunos gusanos de la col. Es decir, sirven en casos concretos, no contra "todas las plagas".</p>
      <h3>La diversidad ayuda</h3>
      <p>Aunque una combinación no esté probada, la misma fuente señala que mezclar plantas de distintas alturas, formas de hoja y colores puede confundir a algunos insectos, y que la diversidad en sí es un beneficio. Un huerto con muchas especies distintas y algunas flores suele tener menos problemas que una fila larga de una sola planta.</p>
      <h3>Cómo decidir</h3>
      <p>Ante un consejo nuevo, hazte tres preguntas: ¿por qué funcionaría?, ¿quién lo dice y en qué se basa?, y ¿lo puedo comprobar en mi huerto? Puedes probarlo tú: siembra una cama con la combinación y otra sin ella, y anota lo que pasa.</p>
      <p class="nota"><strong>Trampa común:</strong> confiar en que una flor "espanta todas las plagas" y dejar de revisar las plantas. Ninguna combinación reemplaza la vigilancia.</p>`,
    ejemplo: `
      <p>Quieres comprobar si sembrar cempasúchil junto a tus coles reduce los gusanos. ¿Cómo lo haces de forma justa?</p>
      <ol class="pasos-ej">
        <li>Primero prepara dos camas iguales, con el mismo sol, la misma tierra y el mismo riego, para que lo único distinto sea el cempasúchil.</li>
        <li>Siembra 10 coles en cada una. En una agrega cempasúchil alrededor; la otra se queda sin flores.</li>
        <li>Cada semana cuenta los gusanos en cada col y anótalos. Supón que al final tienes 120 gusanos en la cama sin flores y 90 en la cama con flores.</li>
        <li>Calcula la diferencia en porcentaje: 120 − 90 = 30 gusanos menos, y 30 ÷ 120 = 0.25, es decir, 25% menos.</li>
        <li>Comprueba: el 25% de 120 es 30, y 120 − 30 = 90.</li>
      </ol>
      <p>Resultado: <span class="resultado">25% menos gusanos en esa prueba</span>. Para tener más certeza, repítela otra temporada.</p>
      <p class="nota"><strong>Error común:</strong> comparar camas distintas en sol o riego. Así no sabes si la diferencia fue por las flores.</p>`,
    vidaReal: `
      <p>Saber qué combinaciones funcionan te protege de consejos falsos:</p>
      <ul>
        <li>No gastas espacio en plantas que no ayudan.</li>
        <li>Llenas tu huerto de flores que atraen a los insectos que se comen las plagas.</li>
        <li>Aprovechas mejor cada metro de tierra.</li>
        <li>Aprendes a poner a prueba lo que lees, en el huerto y en la vida.</li>
        <li>Tu huerto se llena de flores, abejas y mariposas, y se vuelve un lugar más agradable.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según la Extensión de Misisipi, ¿qué es verdad sobre la asociación de cultivos?</p>',
        opciones: ['Todas las combinaciones están probadas por la ciencia', 'Algunas están probadas, pero muchas no tienen pruebas', 'Ninguna funciona'], correcta: 1,
        pista: '<p>La fuente pide desconfiar de lo que se lee en internet.</p>',
        solucion: '<p><strong>Algunas están probadas, pero muchas no.</strong> Por eso conviene preguntar en qué se basa cada consejo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirven las flores en un huerto?</p>',
        opciones: ['Para dar néctar y polen a los insectos benéficos y a los polinizadores', 'Para espantar a todas las plagas', 'Solo para adornar'], correcta: 0,
        pista: '<p>Piensa en quién visita las flores.</p>',
        solucion: '<p><strong>Para alimentar a los insectos benéficos y a los polinizadores</strong>, que se comen las plagas o polinizan tus cultivos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es un cultivo trampa?</p>',
        opciones: ['Una planta venenosa', 'Una planta que tapa la tierra', 'Una planta que a la plaga le gusta más que tu cultivo, para concentrarla ahí'], correcta: 2,
        pista: '<p>La "trampa" es para la plaga.</p>',
        solucion: '<p><strong>Una planta que atrae a la plaga</strong> para que se concentre ahí y puedas retirarla.</p>' },
      { tipo: 'numero', enunciado: '<p>En una prueba, una cama sin flores tuvo 80 pulgones y otra con flores tuvo 60. ¿En qué porcentaje bajaron los pulgones?</p>', respuesta: (80 - 60) / 80 * 100,
        pista: '<p>Calcula la diferencia y divídela entre lo que había sin flores.</p>',
        solucion: '<p>80 − 60 = 20, y 20 ÷ 80 = 0.25, es decir, <strong>25%</strong> menos.</p>' },
      { tipo: 'opciones', enunciado: '<p>Lees que el cempasúchil "espanta todas las plagas". Según la Extensión de Misisipi, ¿qué es lo más correcto?</p>',
        opciones: ['Es verdad para todas las plagas', 'Ayuda en algunos casos concretos, pero no protege tanto como se cree', 'Atrae más plagas que cualquier otra planta'], correcta: 1,
        pista: '<p>Recuerda los estudios que menciona la fuente.</p>',
        solucion: '<p><strong>Ayuda en algunos casos concretos.</strong> No reemplaza la vigilancia de las plantas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llaman los insectos que se comen a las plagas o las parasitan, como las catarinas?</p>',
        respuestas: ['insectos beneficos', 'insecto benefico', 'beneficos', 'insectos beneficiosos', 'insectos utiles', 'enemigos naturales'],
        pista: '<p>Son insectos que te hacen un "beneficio".</p>',
        solucion: '<p>Los <strong>insectos benéficos</strong>, también llamados enemigos naturales de las plagas.</p>' },
    ],
    fuentes: [MSU, UCIPM, WIKI('Asociaci%C3%B3n_de_cultivos', 'Asociación de cultivos')],
  });

  // ------------------------------------------------------------------
  L('Plagas: control sin venenos peligrosos', {
    objetivo: 'Controlar las plagas del huerto con pasos que empiezan por la prevención, y entender por qué las recetas caseras de venenos son un riesgo.',
    explicacion: `
      <p>Una mañana encuentras las hojas de tus coles llenas de agujeros, o los brotes de una planta cubiertos de bichitos verdes. El primer impulso es rociar algo fuerte. Pero muchas veces eso mata también a los insectos que te estaban ayudando, y la plaga regresa más fuerte.</p>
      <h3>Una plaga es cuestión de cantidad</h3>
      <p>Una plaga es un animal, casi siempre un insecto, que daña tus cultivos en una cantidad que te importa. Unos cuantos pulgones no son una plaga; miles sí. El Programa de Manejo Integrado de Plagas de la Universidad de California (UC IPM) explica que la mayoría de las plantas ya establecidas aguantan a los pulgones y se recuperan del daño. La guía "Su propio cultivo" de Oregon sugiere empezar por decidir cuánto daño es aceptable y sembrar un poco de más para compensar las pérdidas.</p>
      <h3>Manejo integrado de plagas</h3>
      <p>El <strong>manejo integrado de plagas</strong> es una forma de controlar las plagas que combina varias medidas, empezando por las más seguras, y deja los productos químicos como último recurso. Funciona en pasos:</p>
      <ol>
        <li>Prevenir: plantas sanas, sin exceso de abono, en el lugar correcto y con riego adecuado. UC IPM señala que los pulgones prefieren los brotes tiernos que salen cuando se abona de más.</li>
        <li>Vigilar: revisa tus plantas seguido, por encima y por debajo de las hojas. Una plaga que se detecta temprano se controla fácil.</li>
        <li>Identificar: antes de actuar, averigua qué bicho es. Puede ser un insecto benéfico.</li>
        <li>Actuar con lo más sencillo: barreras, quitar a mano, agua.</li>
        <li>Solo si nada de eso basta, un producto comercial de baja toxicidad, siguiendo la etiqueta.</li>
      </ol>
      <h3>Métodos sin venenos</h3>
      <ul>
        <li>Quitar a mano: gusanos, caracoles y escarabajos se recogen y se retiran. La guía de Oregon lo menciona como un control eficaz.</li>
        <li>Chorro de agua: según UC IPM, un chorro fuerte de agua tumba a los pulgones de las plantas resistentes. También conviene cortar las hojas y tallos más infestados.</li>
        <li>Barreras: las telas ligeras llamadas cubiertas flotantes protegen a las plantas de los insectos. La guía de Oregon advierte retirarlas de las calabazas, pepinos y melones cuando florecen, para que las abejas puedan polinizarlas.</li>
        <li>Quitar escondites: las babosas buscan lugares oscuros y húmedos; limpiar esos rincones reduce su número.</li>
        <li>Ayudar a los enemigos naturales: catarinas, crisopas, larvas de mosca sírfida y avispitas que parasitan a los pulgones. UC IPM recomienda sembrar flores que les den néctar y polen, y mantener a las hormigas lejos de las plantas, porque protegen a los pulgones de sus enemigos.</li>
      </ul>
      <h3>¿Y las recetas caseras?</h3>
      <p>En internet abundan las "recetas naturales" con jabón de trastes, vinagre, chile, ajo o tabaco. El Centro Nacional de Información de Pesticidas (NPIC) advierte que no son tan inofensivas como parecen:</p>
      <ul>
        <li>No traen etiqueta: no dicen cuánto usar, con qué protección ni qué hacer si alguien se intoxica.</li>
        <li>El jabón de trastes puede tener aditivos que dañan las plantas.</li>
        <li>Preparar extractos o concentrados aumenta la toxicidad, y cocinarlos en ollas de la cocina puede contaminar la comida.</li>
        <li>Muchas no se han probado y pueden no funcionar, o empeorar el problema.</li>
      </ul>
      <p>Un "natural" no es lo mismo que inofensivo: el tabaco, por ejemplo, contiene nicotina, que es muy tóxica para las personas y las mascotas.</p>
      <h3>Si hace falta un producto</h3>
      <p>UC IPM recomienda elegir productos de baja toxicidad que se venden ya preparados, como los jabones y aceites insecticidas, que ahogan a los pulgones y casi no dañan a sus enemigos naturales. La guía de Oregon pide identificar primero la plaga, seguir siempre las instrucciones de la etiqueta, rociar solo donde está la plaga y nunca sobre plantas en flor, para no dañar a las abejas. Guarda cualquier producto en su envase original, cerrado y fuera del alcance de niños y animales, nunca en botellas de refresco ni de comida. Rocía con la protección que indique la etiqueta, y respeta el tiempo que pide entre rociar y cosechar. Si alguien lo traga, lo respira, le cae en los ojos o en la piel, o se siente mal después de usarlo, llama de inmediato al número de emergencias o al centro de toxicología de tu país, con la etiqueta a la mano.</p>
      <p class="nota"><strong>Trampa común:</strong> rociar todo el huerto "por si acaso". Matas a los insectos que te ayudaban y la plaga vuelve con menos enemigos.</p>`,
    ejemplo: `
      <p>Encuentras pulgones en los brotes de tus chiles. ¿Qué haces, paso por paso?</p>
      <ol class="pasos-ej">
        <li>Primero mide el problema. Cuentas las plantas: 3 de 12 tienen pulgones, es decir, 3 ÷ 12 = 0.25, el 25%.</li>
        <li>Busca enemigos naturales. Si ves catarinas, larvas o pulgones hinchados y dorados, que son pulgones parasitados, la ayuda ya llegó.</li>
        <li>Actúa con lo sencillo: tumba los pulgones con un chorro de agua y corta los brotes más infestados.</li>
        <li>Revisa la causa: si abonaste mucho hace poco, deja de hacerlo, porque los brotes tiernos los atraen.</li>
        <li>Comprueba en una semana: si ahora solo 1 de 12 plantas tiene pulgones, bajaste a 1 ÷ 12 ≈ 8%. Si el problema creciera, considera un jabón insecticida comercial, siguiendo la etiqueta.</li>
      </ol>
      <p>Resultado: <span class="resultado">agua, poda y paciencia antes que cualquier producto</span>.</p>
      <p class="nota"><strong>Error común:</strong> preparar una mezcla con jabón de trastes. Puede quemar las hojas y no trae instrucciones de uso.</p>`,
    vidaReal: `
      <p>Controlar plagas sin venenos protege a tu familia y a tu huerto:</p>
      <ul>
        <li>Comes verduras sin residuos de productos tóxicos.</li>
        <li>No pones en riesgo a niños, mascotas ni abejas.</li>
        <li>Gastas menos, porque la mayoría de los métodos son gratis.</li>
        <li>Con el tiempo, tu huerto tiene más insectos que te ayudan y menos problemas.</li>
        <li>Puedes compartir tu cosecha con más tranquilidad, sabiendo que cuidaste lo que le echaste.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Revisas 20 plantas y 5 tienen gusanos. ¿Qué porcentaje de las plantas tiene la plaga?</p>', respuesta: 5 / 20 * 100,
        pista: '<p>Divide las plantas con plaga entre el total y multiplica por 100.</p>',
        solucion: '<p>5 ÷ 20 = 0.25, es decir, <strong>25%</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según UC IPM, ¿qué es lo primero que puedes hacer contra los pulgones en una planta resistente?</p>',
        opciones: ['Rociar un veneno fuerte', 'Tumbarlos con un chorro fuerte de agua', 'Arrancar la planta'], correcta: 1,
        pista: '<p>Busca lo más sencillo y sin químicos.</p>',
        solucion: '<p><strong>Un chorro fuerte de agua.</strong> Si hace falta, también puedes cortar las partes más infestadas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué es riesgoso usar una receta casera de veneno con tabaco?</p>',
        opciones: ['Porque es muy cara', 'Porque no funciona contra ningún insecto', 'Porque no trae instrucciones y el tabaco concentrado es muy tóxico para personas y mascotas'], correcta: 2,
        pista: '<p>Piensa en la etiqueta y en la nicotina.</p>',
        solucion: '<p><strong>No trae instrucciones y es muy tóxico.</strong> "Natural" no quiere decir inofensivo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuándo NO se debe rociar ningún producto?</p>',
        opciones: ['Cuando las plantas están en flor', 'Cuando hay pulgones', 'Cuando ya identificaste la plaga'], correcta: 0,
        pista: '<p>Piensa en quién visita las flores.</p>',
        solucion: '<p><strong>Cuando las plantas están en flor</strong>, para no dañar a las abejas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Dónde se debe guardar un producto contra plagas?</p>',
        opciones: ['En una botella de refresco bien cerrada', 'En su envase original, cerrado y fuera del alcance de niños y animales', 'Junto a la comida, para tenerlo a la mano'], correcta: 1,
        pista: '<p>Imagina que alguien lo confunde con una bebida.</p>',
        solucion: '<p><strong>En su envase original, fuera del alcance.</strong> En una botella de refresco alguien podría tomárselo.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la forma de controlar plagas que combina varias medidas y deja los químicos como último recurso?</p>',
        respuestas: ['manejo integrado de plagas', 'manejo integrado', 'mip', 'control integrado de plagas', 'el manejo integrado de plagas'],
        pista: '<p>Son cuatro palabras; sus siglas son MIP.</p>',
        solucion: '<p>El <strong>manejo integrado de plagas</strong>.</p>' },
    ],
    fuentes: [UCIPM, NPIC, OSU, WIKI('Manejo_integrado_de_plagas', 'Manejo integrado de plagas'), WIKI('Nicotina', 'Nicotina')],
  });

  // ------------------------------------------------------------------
  L('Enfermedades de las plantas: prevenirlas y reconocerlas', {
    objetivo: 'Reconocer las señales más comunes de enfermedad en las plantas, distinguirlas de una plaga o de la falta de nutrientes, y prevenirlas con buenas prácticas.',
    explicacion: `
      <p>Una calabacita amanece con las hojas cubiertas de un polvo blanco, como si les hubieran echado harina. Otra planta tiene manchas cafés que crecen cada día. No hay bichos a la vista. Lo más probable es que estén enfermas, y en las plantas, igual que en las personas, prevenir es mucho más fácil que curar.</p>
      <h3>¿Qué causa las enfermedades?</h3>
      <p>En Ciencias naturales, en "Microorganismos: bacterias, virus y hongos", viste estos seres diminutos. Los tres pueden enfermar a las plantas, pero los más comunes en un huerto son los <strong>hongos</strong>. Producen esporas, que son como semillas microscópicas que viajan con el viento, el agua que salpica, las herramientas y las manos. Necesitan humedad para germinar sobre una hoja. Por eso, según la guía "Su propio cultivo" de la Universidad Estatal de Oregon, las hojas mojadas y el aire húmedo y quieto favorecen enfermedades como el moho.</p>
      <p>Los virus de las plantas, en cambio, suelen llegar con insectos. La misma guía explica que los pulgones y las chicharritas debilitan a las plantas y pueden llevar virus de una planta enferma a una sana.</p>
      <h3>Enfermedad, plaga o falta de nutrientes</h3>
      <p>Antes de actuar, distingue qué le pasa a la planta, porque cada cosa se trata distinto:</p>
      <ul>
        <li>Una plaga deja huellas de animal: agujeros mordidos, baba, excremento o los propios bichos.</li>
        <li>Una falta de nutrientes suele ser pareja y sigue un patrón, como las hojas de abajo amarillas en toda la planta, como viste en la primera lección de esta unidad.</li>
        <li>Una <strong>enfermedad</strong> suele aparecer en manchas que crecen y se extienden de una hoja a otra, o de una planta a otra.</li>
      </ul>
      <h3>Señales comunes</h3>
      <ul>
        <li>Polvo blanco o grisáceo sobre las hojas: es típico de un hongo llamado oídio, frecuente en calabazas y pepinos.</li>
        <li>Manchas cafés o negras, a veces con un borde amarillo, que crecen: muchas son de hongos o bacterias.</li>
        <li>Moho gris y algodonoso sobre frutos o flores, sobre todo con tiempo húmedo.</li>
        <li>Plantas que se marchitan aunque la tierra esté húmeda: puede ser una enfermedad de la raíz o del tallo.</li>
        <li>Hojas arrugadas o con manchas como mosaico de colores: puede ser un virus.</li>
      </ul>
      <h3>Prevenir</h3>
      <p>La guía de Oregon recomienda estas prácticas:</p>
      <ul>
        <li>Elegir variedades resistentes; los sobres y catálogos de semillas lo indican.</li>
        <li>Comprar o recibir solo plantas sanas; una planta enferma en oferta no es una ganga, porque contagia a las demás.</li>
        <li>Aclarar, es decir, quitar algunas plantas cuando están muy juntas, para que circule el aire.</li>
        <li>Regar en la mañana y en la base de la planta, para que las hojas no pasen la noche mojadas.</li>
        <li>Controlar los insectos que transmiten virus.</li>
        <li>Rotar los cultivos, como viste en "Calendario de siembra y rotación de cultivos", para que los hongos del suelo no se acumulen.</li>
        <li>Quitar las hierbas, que también guardan insectos y enfermedades.</li>
      </ul>
      <h3>Qué hacer con una planta enferma</h3>
      <p>Según la guía de Oregon, retira las plantas o las partes enfermas en cuanto las veas, para que la enfermedad no se extienda. Tíralas a la basura en una bolsa cerrada y no las eches a la composta, porque algunas enfermedades sobreviven ahí. Lávate las manos y limpia las herramientas después de tocarlas. Si no sabes qué tiene tu planta, toma fotos claras de las hojas por los dos lados y consulta a la oficina agrícola o a un servicio de extensión de tu zona.</p>
      <p class="nota"><strong>Trampa común:</strong> echar las hojas enfermas a la composta para "aprovecharlas". Una pila casera no siempre se calienta lo suficiente y la enfermedad puede volver al huerto con el abono.</p>`,
    ejemplo: `
      <p>Tienes 12 calabacitas y 3 amanecen con polvo blanco en algunas hojas. Están muy juntas y las riegas en la noche. ¿Qué haces?</p>
      <ol class="pasos-ej">
        <li>Primero calcula qué tan extendido está: 3 ÷ 12 = 0.25, el 25% de las plantas.</li>
        <li>Identifica: es polvo blanco, sin bichos ni mordidas, así que no es plaga; parece oídio, un hongo.</li>
        <li>Retira las hojas afectadas en una bolsa, sin echarlas a la composta, y lávate las manos.</li>
        <li>Corrige las causas: aclara las plantas más amontonadas para que circule el aire y cambia el riego a la mañana, en la base.</li>
        <li>Comprueba en una semana si aparecen hojas nuevas con polvo. Si siguen 3 de 12, el 25%, al menos no se extendió; si suben, considera retirar las plantas más enfermas.</li>
      </ol>
      <p>Resultado: <span class="resultado">retirar hojas enfermas, dar aire y regar en la mañana</span>.</p>
      <p class="nota"><strong>Error común:</strong> seguir mojando las hojas al regar. Es justo lo que el hongo necesita.</p>`,
    vidaReal: `
      <p>Saber reconocer y prevenir enfermedades salva tu cosecha:</p>
      <ul>
        <li>Detectas un problema a tiempo, antes de que pase a todo el huerto.</li>
        <li>No gastas en productos que no sirven para lo que tiene tu planta.</li>
        <li>Tus cosechas son más parejas de un año a otro.</li>
        <li>Puedes ayudar a tus vecinos a identificar lo que le pasa a sus plantas.</li>
        <li>Evitas tirar plantas sanas por confundir una mancha con una enfermedad.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Las hojas de tus calabazas tienen un polvo blanco y no hay bichos. ¿Qué es lo más probable?</p>',
        opciones: ['Falta de agua', 'Una plaga de gusanos', 'Un hongo, como el oídio'], correcta: 2,
        pista: '<p>No hay huellas de animal y la señal se parece a harina.</p>',
        solucion: '<p><strong>Un hongo, como el oídio.</strong> Es frecuente en calabazas y pepinos, sobre todo con humedad.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué haces con las hojas enfermas que retiras?</p>',
        opciones: ['Las echas a la composta', 'Las sacas en una bolsa y no las compostas', 'Las dejas en el suelo como mantillo'], correcta: 1,
        pista: '<p>La guía de Oregon advierte que algunas enfermedades sobreviven en la composta.</p>',
        solucion: '<p><strong>Las sacas en una bolsa y no las compostas.</strong> En la composta o en el suelo podrían contagiar de nuevo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas prácticas ayuda a prevenir enfermedades de hongos?</p>',
        opciones: ['Regar en la mañana y en la base de la planta', 'Regar las hojas en la noche', 'Sembrar las plantas muy juntas'], correcta: 0,
        pista: '<p>Los hongos necesitan humedad sobre las hojas.</p>',
        solucion: '<p><strong>Regar en la mañana y en la base.</strong> Las hojas se mantienen secas y el hongo no germina.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cómo suelen llegar los virus a las plantas del huerto?</p>',
        opciones: ['Con la luz del sol', 'Con insectos como los pulgones', 'Con el fertilizante'], correcta: 1,
        pista: '<p>La guía de Oregon menciona a los pulgones y las chicharritas.</p>',
        solucion: '<p><strong>Con insectos como los pulgones</strong>, que los llevan de una planta enferma a una sana.</p>' },
      { tipo: 'numero', enunciado: '<p>De 16 matas de jitomate, 4 tienen manchas cafés que crecen. ¿Qué porcentaje está afectado?</p>', respuesta: 4 / 16 * 100,
        pista: '<p>Divide las plantas enfermas entre el total y multiplica por 100.</p>',
        solucion: '<p>4 ÷ 16 = 0.25, es decir, <strong>25%</strong>.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llaman los seres vivos que producen esporas y causan la mayoría de las enfermedades de las plantas del huerto?</p>',
        respuestas: ['hongos', 'los hongos', 'hongo', 'un hongo'],
        pista: '<p>Entre ellos están los champiñones y el moho del pan.</p>',
        solucion: '<p>Los <strong>hongos</strong>.</p>' },
    ],
    fuentes: [OSU, UCIPM, WIKI('Fitopatolog%C3%ADa', 'Fitopatología'), WIKI('O%C3%ADdio', 'Oídio')],
  });
})();
