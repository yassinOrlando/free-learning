// Autosuficiencia · Unidad 4: Semillas y germinación.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Traslapes: polinización y guardar semillas (Unidad 6), cultivo de papa, camote y ajo (Unidad 5), germinados para comer (Unidad 7).
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
  const elipse = (cx, cy, rx, ry, relleno = false) => ({ tipo: 'poligono', relleno, puntos: Array.from({ length: 36 }, (_, i) => [cx + rx * Math.cos((i * Math.PI) / 18), cy + ry * Math.sin((i * Math.PI) / 18)]) });
  // Gráfica de barras de una sola serie (como en matematicas/estadistica.js): etiquetas abajo, valor encima.
  function barras({ etiquetas, valores, max, paso, descripcion, sufijo = '' }) {
    const n = valores.length;
    const figuras = valores.flatMap((v, i) => [
      { tipo: 'poligono', puntos: [[i + 0.15, 0], [i + 0.85, 0], [i + 0.85, v], [i + 0.15, v]], solido: true },
      txt(i + 0.5, -max * 0.07, etiquetas[i]),
      txt(i + 0.5, v + max * 0.05, `${v}${sufijo}`),
    ]);
    return G({ x: [0, n], y: [-max * 0.12, max * 1.1], pasos: [1e9, paso], nombres: false, figuras, descripcion });
  }

  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const OSU = { nombre: 'Servicio de Extensión de la Universidad Estatal de Oregon: Su propio cultivo (EM 9027-S, PDF)', url: 'https://extension.oregonstate.edu/sites/default/files/documents/57811/su-propio-cultivo-edsmall.pdf' };
  const OSUPRUEBA = { nombre: 'Servicio de Extensión de la Universidad Estatal de Oregon: Will Your Seeds Grow Plants? (en inglés)', url: 'https://extension.oregonstate.edu/node/236201' };
  const ILLGERM = { nombre: 'Extensión de la Universidad de Illinois: Are my seeds still good? Testing seed germination (en inglés)', url: 'https://extension.illinois.edu/blogs/good-growing/2023-01-20-are-my-seeds-still-good-testing-seed-germination' };
  const ILLTIPOS = { nombre: 'Extensión de la Universidad de Illinois: Grow confidence when choosing seed packets for your garden (en inglés)', url: 'https://extension.illinois.edu/news-releases/grow-confidence-when-choosing-seed-packets-your-garden' };
  const CONABIO = (ruta, nombre) => ({ nombre: `CONABIO, Biodiversidad Mexicana: ${nombre}`, url: `https://www.biodiversidad.gob.mx/diversidad/alimentos/${ruta}` });
  const AZSIEMBRA = { nombre: 'Extensión de la Universidad de Arizona: Vegetable Seed Sowing & Planting (en inglés, PDF)', url: 'https://extension.arizona.edu/sites/extension.arizona.edu/files/attachment/sowingandplantingseeds.pdf' };
  const AZRAICES = { nombre: 'Extensión de la Universidad de Arizona: Roots, Tubers and Bulbs (en inglés, PDF)', url: 'https://extension.arizona.edu/sites/default/files/attachment/RootsTubersandBulbsPresentationFactSheet.pdf' };
  const UF = { nombre: 'Universidad de Florida, IFAS: Advanced Seed Starting (en inglés)', url: 'https://gardeningsolutions.ifas.ufl.edu/care/planting/advanced-seed-starting/' };
  const USU = { nombre: 'Extensión de la Universidad Estatal de Utah: Starting Vegetable Seeds Indoors IV, Seedling Culture and Transplanting (en inglés)', url: 'https://extension.usu.edu/yardandgarden/research/starting-vegetable-seeds-indoors-seeding-culture-and-transplanting' };
  const IOWA = (ruta, nombre) => ({ nombre: `Extensión de la Universidad Estatal de Iowa: ${nombre} (en inglés)`, url: `https://yardandgarden.extension.iastate.edu/${ruta}` });
  const CORNELL = { nombre: 'Universidad Cornell: Transplants or Direct Seeding, What’s best? (en inglés)', url: 'https://cals.cornell.edu/school-integrative-plant-science/school-sections/horticulture-section/outreach-and-extension/pandemic-vegetable-gardening/pandemic-vegetable-gardening-2021-archive/transplants-or-direct-seeding-whats-best' };

  // ------------------------------------------------------------------
  const FRIJOL = diagrama([-6, 6], [-3.4, 3.4], [
    elipse(0, 0, 3.4, 2.2),
    elipse(0, 0, 3.05, 1.85, true),
    { tipo: 'poligono', puntos: [[-2.7, 0.2], [-1.6, 0.6], [-1.2, 0.3], [-1.6, -0.1], [-2.6, -0.5]], solido: true },
    txt(-4.6, 2.4, 'cubierta'), ...flecha([-4.2, 2], [-2.6, 1.55], 0, 1),
    txt(4.4, 2.4, 'cotiledón:'), txt(4.4, 1.9, 'la reserva'), ...flecha([4.1, 1.5], [1.6, 0.6], 0, 1),
    txt(-4.4, -2.5, 'embrión'), ...flecha([-4, -2.1], [-2.2, -0.4], 0, 1),
  ], 'Un frijol abierto visto de lado. La línea de afuera es la cubierta. Casi todo el interior, sombreado, es el cotiledón, que guarda la reserva de alimento. En un extremo hay una figura pequeña y oscura: el embrión, la plantita en miniatura.');

  L('Qué es una semilla y qué necesita para germinar', {
    objetivo: 'Reconocer las partes de una semilla, explicar qué necesita para germinar y entender por qué algunas semillas esperan antes de brotar.',
    explicacion: `
      <p>Deja un frijol remojando toda la noche y, en la mañana, quítale con cuidado la cáscara y ábrelo en dos. En una orilla vas a ver algo diminuto: una plantita en miniatura, con su raíz y sus primeras hojitas dobladas. Una semilla no es un grano cualquiera: es una planta bebé dormida, con su comida para el viaje.</p>
      <h3>Las partes de una semilla</h3>
      ${FRIJOL}
      <ul>
        <li>La cubierta es la piel de la semilla. La protege de los golpes, de la sequedad y de los microbios mientras espera.</li>
        <li>El <strong>embrión</strong> es la planta en miniatura: tiene el inicio de la raíz, del tallo y de las primeras hojas.</li>
        <li>La reserva es la comida que la plantita usará al nacer, antes de poder fabricar la suya. En el frijol está en los cotiledones, las dos mitades gruesas; en el maíz, en una parte harinosa.</li>
      </ul>
      <p>¿Por qué necesita reserva? En Ciencias naturales, en "Célula animal y célula vegetal", viste que las plantas fabrican su alimento con la luz por medio de la fotosíntesis. Pero bajo tierra no hay luz, y la plantita todavía no tiene hojas verdes. Hasta que asome a la superficie, vive de lo que su madre le guardó.</p>
      <h3>Despertar: la germinación</h3>
      <p>La <strong>germinación</strong> es el momento en que la semilla despierta: absorbe agua, se hincha, rompe la cubierta y deja salir la raíz. Según la Extensión de la Universidad de Arizona, para germinar una semilla necesita cuatro cosas:</p>
      <ul>
        <li>Agua, para hincharse y poner en marcha la vida que tiene dormida.</li>
        <li>Oxígeno, porque el embrión respira. Por eso una semilla en tierra encharcada se pudre en lugar de brotar.</li>
        <li>La temperatura adecuada, que cambia según la planta: unas prefieren tierra fresca y otras, tierra tibia.</li>
        <li>Luz u oscuridad, según la especie. Algunas semillas necesitan luz y se tapan muy poco o nada; otras germinan mejor en la oscuridad.</li>
      </ul>
      <p>Fíjate que muchas semillas no necesitan luz para germinar, aunque la planta sí la necesita en cuanto sale. Por eso lo que más importa al principio es la humedad, el aire y la temperatura. El sobre de semillas suele decir cuál prefiere cada una.</p>
      <h3>Semillas que esperan</h3>
      <p>A veces das a una semilla agua, aire y calor, y aun así no brota. No está muerta: está en <strong>latencia</strong>, un estado de espera que la protege de germinar en un mal momento. Imagina una semilla que cae al suelo en otoño: si brotara con la primera lluvia, la plantita moriría con las heladas del invierno. La latencia la hace esperar a que pasen ciertas señales.</p>
      <p>La Extensión de Arizona menciona tres causas comunes de latencia: una cubierta tan dura que no deja pasar el agua, un embrión que todavía no termina de madurar y sustancias químicas en la semilla que frenan la germinación. En "Remojar, escarificar y otros trucos para germinar" verás cómo ayudarles a despertar.</p>
      <p>La mayoría de las semillas de hortalizas que compras no tiene latencia fuerte: con humedad y la temperatura adecuada, brotan en días. Las de muchos árboles, flores silvestres y algunas leguminosas de cubierta dura son las que más se hacen esperar.</p>
      <p class="nota"><strong>Trampa común:</strong> regar tanto las semillas que la tierra queda encharcada. Sin oxígeno, el embrión se ahoga y la semilla se pudre.</p>`,
    ejemplo: `
      <p>Haces un experimento con 4 vasos de 10 semillas de frijol cada uno: el vaso A, en algodón seco; el B, en algodón húmedo y en un lugar tibio; el C, con las semillas cubiertas de agua; y el D, en algodón húmedo dentro del congelador. Después de una semana, en el B germinan 9. ¿Qué porcentaje es, y qué esperas de los demás?</p>
      <ol class="pasos-ej">
        <li>Primero calcula el porcentaje del vaso B: 9 ÷ 10 = 0.9, es decir, 90%.</li>
        <li>Ahora piensa qué le falta a cada vaso. Al A le falta agua; al C le falta oxígeno, porque el agua lo cubre todo; al D le falta la temperatura adecuada.</li>
        <li>Por eso esperas muy poca o ninguna germinación en A, C y D.</li>
        <li>Comprueba que el experimento es justo: los cuatro vasos tienen el mismo tipo y número de semillas, y solo cambia una condición en cada uno.</li>
      </ol>
      <p>Resultado: <span class="resultado">90% en el vaso B</span>; los demás muestran qué pasa cuando falta cada condición.</p>
      <p class="nota"><strong>Error común:</strong> pensar que el vaso C germina mejor "porque tiene más agua". Sin aire, la semilla no respira.</p>`,
    vidaReal: `
      <p>Entender cómo despierta una semilla te ayuda a no desperdiciarlas:</p>
      <ul>
        <li>Sabes por qué no conviene encharcar un semillero recién sembrado.</li>
        <li>Puedes elegir el mejor momento del año para sembrar cada cosa.</li>
        <li>Si unas semillas no brotan, sabes qué revisar antes de tirarlas.</li>
        <li>Puedes hacer experimentos sencillos en casa con niñas y niños.</li>
        <li>Entiendes por qué un frijol de la despensa todavía puede convertirse en planta.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Pones 20 semillas en algodón húmedo y germinan 15. ¿Qué porcentaje germinó?</p>', respuesta: 15 / 20 * 100,
        pista: '<p>Divide las que germinaron entre el total y multiplica por 100.</p>',
        solucion: '<p>15 ÷ 20 = 0.75, es decir, <strong>75%</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué parte de la semilla es la planta en miniatura?</p>',
        opciones: ['La cubierta', 'El embrión', 'La reserva'], correcta: 1,
        pista: '<p>Es la que tiene el inicio de la raíz, del tallo y de las hojas.</p>',
        solucion: '<p><strong>El embrión.</strong> La cubierta la protege y la reserva la alimenta.</p>' },
      { tipo: 'opciones', enunciado: '<p>Unas semillas quedaron cubiertas de agua varios días y se pudrieron. ¿Qué les faltó?</p>',
        opciones: ['Oxígeno', 'Agua', 'Luz'], correcta: 0,
        pista: '<p>El embrión respira.</p>',
        solucion: '<p><strong>Oxígeno.</strong> El agua ocupó todo el espacio y el embrión no pudo respirar.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve la reserva de la semilla?</p>',
        opciones: ['Para atraer a los insectos', 'Para que la semilla pese más', 'Para alimentar a la plantita hasta que pueda hacer fotosíntesis'], correcta: 2,
        pista: '<p>Bajo tierra no hay luz.</p>',
        solucion: '<p><strong>Para alimentar a la plantita</strong> hasta que tenga hojas verdes y luz para fabricar su comida.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una semilla sana tiene agua, aire y calor, pero no brota. ¿Qué es lo más probable?</p>',
        opciones: ['Está muerta', 'Está en latencia, esperando una señal para germinar', 'Le falta fertilizante'], correcta: 1,
        pista: '<p>Algunas semillas esperan a propósito.</p>',
        solucion: '<p><strong>Está en latencia.</strong> Puede tener una cubierta dura o necesitar una señal, como un periodo de frío.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el momento en que la semilla absorbe agua, rompe su cubierta y deja salir la raíz?</p>',
        respuestas: ['germinacion', 'la germinacion', 'germinar'],
        pista: '<p>Viene del verbo "germinar".</p>',
        solucion: '<p>La <strong>germinación</strong>.</p>' },
    ],
    fuentes: [AZSIEMBRA, WIKI('Semilla', 'Semilla'), WIKI('Germinaci%C3%B3n', 'Germinación')],
  });

  // ------------------------------------------------------------------
  L('Tipos de semilla: criollas, híbridas y de polinización abierta', {
    objetivo: 'Distinguir las semillas criollas, las de polinización abierta y las híbridas, saber cuáles puedes volver a sembrar con tu propia semilla y elegir según lo que necesitas.',
    explicacion: `
      <p>En la tienda encuentras dos sobres de semilla de jitomate. Uno dice "híbrido F1" y cuesta el doble. El otro dice "de polinización abierta". En el pueblo, una vecina te regala semillas de un maíz azul que su familia siembra desde hace generaciones. ¿Qué diferencia hay entre estas tres semillas, y por qué importa si quieres volverlas a sembrar el año siguiente?</p>
      <h3>Polinización abierta</h3>
      <p>Las plantas forman sus semillas cuando el polen de una flor llega a otra flor de la misma especie, o a la misma flor; en Ciencias naturales lo viste como polinización. Una variedad de <strong>polinización abierta</strong> es la que se reproduce así, de forma natural, por el viento, los insectos o la propia flor. La Extensión de la Universidad de Illinois explica que, mientras no se cruce con otra variedad de la misma especie, sus semillas dan plantas iguales a sus padres año tras año. Por eso se dice que salen "fieles a su tipo".</p>
      <p>Aun así, no todas las plantas son idénticas: tienen diversidad genética, así que unas aguantan mejor la sequía y otras dan más. Esa variedad es una ventaja, porque puedes elegir las mejores para sacar semilla.</p>
      <h3>Criollas</h3>
      <p>Una semilla <strong>criolla</strong>, también llamada nativa o local, es una variedad de polinización abierta que una comunidad ha sembrado, seleccionado e intercambiado durante muchas generaciones, hasta adaptarla a su clima y a sus gustos. En inglés se les dice <span lang="en">heirloom</span>, que quiere decir "de herencia"; Illinois habla de variedades que han pasado de jardinero en jardinero por más de 50 años.</p>
      <p>El mejor ejemplo es el maíz. La CONABIO, la comisión mexicana que estudia la biodiversidad, explica que México es el centro de origen del maíz, que se domesticó hace unos 10 000 años, y que los agricultores y sus familias siguen seleccionando cada año sus maíces nativos o criollos. En México se reportan 64 razas de maíz, de las cuales 59 se consideran nativas. Cada una se adaptó a un lugar: unas a la montaña fría, otras a la costa caliente, otras a la tierra seca. Las familias intercambian semilla con sus vecinos, y así el maíz sigue cambiando y adaptándose.</p>
      <h3>Híbridas</h3>
      <p>Un <strong>híbrido F1</strong> es la cruza de dos variedades distintas, hecha a propósito por fitomejoradores, que son especialistas en mejorar plantas. Según Illinois, se buscan rasgos como resistencia a enfermedades, más producción o que el fruto dure más. F1 quiere decir "primera generación" de esa cruza. Las plantas F1 suelen ser muy parejas y productivas.</p>
      <p>El problema aparece si guardas su semilla. Illinois advierte que la semilla de un híbrido no da la misma planta de la que salió, por eso hay que comprarla cada año. En Ciencias naturales, en "Herencia: las leyes de Mendel", viste por qué: al cruzar dos plantas distintas, sus hijas reciben una mezcla de rasgos, y en la siguiente generación esos rasgos se separan de muchas formas. Las plantas que nazcan de esa semilla saldrán muy distintas entre sí.</p>
      <h3>¿Cuál elegir?</h3>
      <div class="tabla-wrap"><table>
        <tr><th>Tipo</th><th>¿Puedes guardar tu semilla?</th><th>Lo bueno</th><th>Lo que hay que considerar</th></tr>
        <tr><th>Criolla</th><td>Sí</td><td>Adaptada a tu zona, diversa y gratis una vez que la tienes</td><td>Puede producir menos y ser menos pareja</td></tr>
        <tr><th>Polinización abierta</th><td>Sí</td><td>Sale fiel a su tipo y la puedes ir adaptando</td><td>Hay que evitar que se cruce con otras variedades</td></tr>
        <tr><th>Híbrida F1</th><td>No sale igual</td><td>Pareja, productiva y a veces resistente a enfermedades</td><td>Hay que comprarla cada año</td></tr>
      </table></div>
      <p>Para la autosuficiencia, las criollas y las de polinización abierta tienen una gran ventaja: puedes producir tu propia semilla. Cómo evitar que se crucen y cómo guardarlas lo verás en la unidad Guardar tus propias semillas.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que "híbrido" quiere decir "transgénico". Un híbrido se obtiene cruzando dos plantas, como se ha hecho por siglos; no se le inserta ningún gen de otro ser vivo en un laboratorio.</p>`,
    ejemplo: `
      <p>Un sobre de jitomate híbrido cuesta $60 y hay que comprarlo cada año. Uno de polinización abierta cuesta $40 y, después, guardas tu propia semilla. ¿Cuánto gastas en semilla en 5 años con cada uno?</p>
      <ol class="pasos-ej">
        <li>Primero el híbrido: como su semilla no sale igual, compras un sobre cada año: 60 × 5 = $300.</li>
        <li>Luego el de polinización abierta: lo compras una sola vez, $40, y los otros años usas tu semilla.</li>
        <li>Calcula la diferencia: 300 − 40 = $260 de ahorro.</li>
        <li>Comprueba año por año: el híbrido suma 60, 120, 180, 240 y 300; el otro se queda en 40 desde el primer año.</li>
      </ol>
      <p>Resultado: <span class="resultado">$300 contra $40; ahorras $260</span>, aunque el híbrido podría producir más.</p>
      <p class="nota"><strong>Error común:</strong> decidir solo por el precio. Si una enfermedad acaba con tu jitomate cada año, un híbrido resistente puede valer la pena.</p>`,
    vidaReal: `
      <p>Saber qué semilla tienes te da más libertad y más control:</p>
      <ul>
        <li>Puedes dejar de comprar semilla cada año para algunos cultivos.</li>
        <li>Ayudas a conservar variedades de tu región que podrían perderse.</li>
        <li>Entiendes lo que dicen los sobres en la tienda y eliges con calma.</li>
        <li>Puedes intercambiar semillas con tus vecinos y con tu comunidad.</li>
        <li>Sabes por qué la semilla de un jitomate comprado no siempre da lo que esperabas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Según la CONABIO, en México se reportan 64 razas de maíz, de las cuales 59 son nativas. ¿Qué porcentaje son nativas? Redondea al entero.</p>', respuesta: 59 / 64 * 100, tolerancia: 0.6,
        pista: '<p>Divide 59 entre 64 y multiplica por 100.</p>',
        solucion: '<p>59 ÷ 64 ≈ 0.92, es decir, unas <strong>92%</strong> de las razas.</p>' },
      { tipo: 'numero', enunciado: '<p>Un sobre híbrido cuesta $55 y hay que comprarlo cada año. ¿Cuánto gastas en 4 años?</p>', respuesta: 55 * 4,
        pista: '<p>Multiplica el precio por los años.</p>',
        solucion: '<p>55 × 4 = <strong>$220</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Guardas la semilla de un jitomate híbrido F1 y la siembras. ¿Qué pasa?</p>',
        opciones: ['Las plantas salen idénticas a la madre', 'Las plantas salen distintas entre sí y no iguales a la madre', 'La semilla nunca germina'], correcta: 1,
        pista: '<p>Recuerda lo que pasa con los rasgos en la segunda generación.</p>',
        solucion: '<p><strong>Salen distintas entre sí.</strong> Por eso la semilla híbrida se compra cada año.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué caracteriza a una semilla criolla?</p>',
        opciones: ['Es una variedad local que una comunidad ha seleccionado e intercambiado por generaciones', 'Se fabricó en un laboratorio cambiando su ADN', 'Solo se puede sembrar una vez'], correcta: 0,
        pista: '<p>Piensa en el maíz que una familia siembra desde hace generaciones.</p>',
        solucion: '<p><strong>Es una variedad local seleccionada por generaciones</strong>, adaptada a su clima.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué quiere decir que una variedad de polinización abierta sale "fiel a su tipo"?</p>',
        opciones: ['Que nunca se enferma', 'Que siempre da el doble', 'Que sus semillas dan plantas parecidas a sus padres, si no se cruza con otra variedad'], correcta: 2,
        pista: '<p>Tiene que ver con lo que pasa al sembrar su semilla.</p>',
        solucion: '<p><strong>Sus semillas dan plantas parecidas a sus padres</strong>, siempre que no se crucen con otra variedad.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la semilla que sale de cruzar a propósito dos variedades distintas, y que hay que comprar cada año? Escribe su nombre con la letra y el número.</p>',
        respuestas: ['hibrido f1', 'hibrida f1', 'f1', 'hibrido', 'hibrida', 'semilla hibrida', 'un hibrido f1'],
        pista: '<p>Es "híbrido" más una letra y un número que significan "primera generación".</p>',
        solucion: '<p>Un <strong>híbrido F1</strong>.</p>' },
    ],
    fuentes: [ILLTIPOS, CONABIO('maices', 'Maíces'), CONABIO('maices/razas-de-maiz', 'Razas de maíz de México'), WIKI('H%C3%ADbrido_F1', 'Híbrido F1'), WIKI('Polinizaci%C3%B3n_abierta', 'Polinización libre')],
  });

  // ------------------------------------------------------------------
  const SOBRES = barras({
    etiquetas: ['sobre A', 'sobre B', 'sobre C'], valores: [90, 70, 40], max: 100, paso: 1e9, sufijo: '%',
    descripcion: 'Gráfica de barras del porcentaje de germinación de tres sobres de semillas. Sobre A: 90%. Sobre B: 70%. Sobre C: 40%.',
  });

  L('Prueba de germinación: cuántas de tus semillas sirven', {
    objetivo: 'Hacer una prueba de germinación con una toalla de papel, calcular el porcentaje de germinación y decidir cuántas semillas sembrar.',
    explicacion: `
      <p>Encuentras en un cajón un sobre de semillas de calabaza de hace tres años. ¿Las siembras? Si no brotan, pierdes semanas de temporada esperando. Si sirven, te ahorras comprar otras. Hay una forma barata de saberlo en pocos días, sin gastar tierra ni espacio.</p>
      <h3>Las semillas también envejecen</h3>
      <p>Una semilla está viva, aunque dormida, y con el tiempo gasta su reserva y pierde fuerza. La Extensión de la Universidad Estatal de Oregon explica que, bien guardadas, la mayoría de las semillas sirven por lo menos un año después de la temporada para la que se empacaron, y algunas duran tres años o más. Pero con los años baja la proporción de semillas que brotan. Cuánto duran y cómo guardarlas lo verás en la unidad Guardar tus propias semillas.</p>
      <h3>La prueba de la toalla</h3>
      <p>Necesitas 10 semillas del sobre, una toalla de papel, agua y una bolsa de plástico que cierre. Según Oregon e Illinois, los pasos son:</p>
      <ol>
        <li>Moja la toalla de papel y exprímela para que quede húmeda, sin escurrir.</li>
        <li>Pon las 10 semillas sobre la toalla, separadas entre sí, y dóblala o enróllala con cuidado.</li>
        <li>Métela en la bolsa y ciérrala, para que no se seque. Escribe en la bolsa el nombre de la semilla y la fecha.</li>
        <li>Déjala en un lugar tibio, por ejemplo encima del refrigerador. Illinois indica que unos 21 °C aceleran la germinación.</li>
        <li>Revisa cada dos o tres días que la toalla siga húmeda; si se secó, rocíala un poco.</li>
        <li>Entre los 5 y los 10 días, cuenta cuántas semillas tienen ya su raíz afuera. El sobre suele decir en cuántos días germina cada planta.</li>
      </ol>
      <p>Se usan 10 semillas porque así la cuenta es muy fácil: cada semilla vale 10%.</p>
      <h3>El porcentaje de germinación</h3>
      <p>El <strong>porcentaje de germinación</strong> te dice cuántas de cada cien semillas brotan:</p>
      <p><strong>porcentaje de germinación = semillas que germinaron ÷ semillas que probaste × 100</strong></p>
      <p>Es lo mismo que viste en Porcentajes: la parte entre el total, por cien. Si de 10 semillas germinan 8, el porcentaje es 8 ÷ 10 × 100 = 80%.</p>
      ${SOBRES}
      <h3>Qué hacer con el resultado</h3>
      <p>Oregon e Illinois dan una guía parecida:</p>
      <ul>
        <li>Si germinaron todas o casi todas, siembra normal.</li>
        <li>Si germinaron de 7 a 9 de cada 10, la semilla todavía sirve, pero conviene sembrar un poco más tupido o poner más semillas en cada hoyo, y luego dejar solo la planta más fuerte.</li>
        <li>Si germinaron 6 o menos de cada 10, según Oregon, o menos de 50 a 60%, según Illinois, es mejor conseguir semilla nueva.</li>
      </ul>
      <p>Las semillas que ya germinaron en la toalla no se desperdician: Oregon explica que puedes sembrarlas con cuidado, con la raíz hacia abajo, y si la raíz se pegó al papel, cortas el papel alrededor y lo siembras junto con ella.</p>
      <p class="nota"><strong>Trampa común:</strong> descartar una semilla porque no brotó en la prueba sin revisar si necesitaba frío o un tratamiento especial. Illinois advierte que algunas flores necesitan pasar un periodo de frío húmedo antes de germinar.</p>`,
    ejemplo: `
      <p>Hiciste la prueba con un sobre viejo de lechuga y germinaron 7 de 10. Quieres terminar con 21 plantas. ¿Cuántas semillas siembras, y cuántas por hoyo?</p>
      <ol class="pasos-ej">
        <li>Primero calcula el porcentaje: 7 ÷ 10 = 0.7, es decir, 70%.</li>
        <li>Si solo brota el 70%, necesitas más semillas que plantas. Divide las plantas que quieres entre la proporción que brota: 21 ÷ 0.7 = 30 semillas.</li>
        <li>Para repartirlas, siembra 2 semillas en cada uno de 15 hoyos. Con 70%, la mayoría de los hoyos tendrá al menos una planta, y dejas la más fuerte.</li>
        <li>Comprueba: el 70% de 30 es 30 × 0.7 = 21 plantas.</li>
      </ol>
      <p>Resultado: <span class="resultado">unas 30 semillas para obtener 21 plantas</span>.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar 21 × 0.7 en lugar de dividir. Así sembrarías menos semillas, no más.</p>`,
    vidaReal: `
      <p>Probar tus semillas antes de sembrarlas te ahorra tiempo y dinero:</p>
      <ul>
        <li>No pierdes semanas esperando a que broten unas semillas que ya no sirven.</li>
        <li>Aprovechas los sobres viejos que encuentras en casa.</li>
        <li>Sabes cuántas semillas poner en cada hoyo para no quedarte corto.</li>
        <li>Si intercambias semillas con tus vecinos, puedes decirles qué tan buenas son.</li>
        <li>Puedes decidir con datos si vale la pena comprar un sobre nuevo o seguir con el viejo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>De 10 semillas de frijol, germinaron 9. ¿Cuál es el porcentaje de germinación?</p>', respuesta: 9 / 10 * 100,
        pista: '<p>Con 10 semillas, cada una vale 10%.</p>',
        solucion: '<p>9 ÷ 10 × 100 = <strong>90%</strong>. Siembra normal.</p>' },
      { tipo: 'numero', enunciado: '<p>Probaste 25 semillas de chile y germinaron 20. ¿Cuál es el porcentaje de germinación?</p>', respuesta: 20 / 25 * 100,
        pista: '<p>Divide las que germinaron entre las que probaste y multiplica por 100.</p>',
        solucion: '<p>20 ÷ 25 = 0.8, es decir, <strong>80%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu semilla tiene 80% de germinación y quieres 40 plantas. ¿Cuántas semillas debes sembrar?</p>', respuesta: 40 / 0.8,
        pista: '<p>Divide las plantas que quieres entre la proporción que germina.</p>',
        solucion: '<p>40 ÷ 0.8 = <strong>50 semillas</strong>. Comprueba: el 80% de 50 es 40.</p>' },
      { tipo: 'opciones', enunciado: '<p>En la prueba germinaron 3 de 10 semillas. Según Oregon e Illinois, ¿qué conviene hacer?</p>',
        opciones: ['Sembrar normal', 'Poner una semilla por hoyo', 'Conseguir semilla nueva'], correcta: 2,
        pista: '<p>3 de 10 es mucho menos de la mitad.</p>',
        solucion: '<p><strong>Conseguir semilla nueva.</strong> Con 30% perderías mucho tiempo y espacio.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué se mete la toalla con las semillas en una bolsa cerrada?</p>',
        opciones: ['Para que no se seque la toalla', 'Para que no les dé luz', 'Para que no respiren'], correcta: 0,
        pista: '<p>Las semillas necesitan humedad todo el tiempo.</p>',
        solucion: '<p><strong>Para que no se seque.</strong> La bolsa guarda la humedad y deja algo de aire.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el número que dice cuántas de cada cien semillas brotan?</p>',
        respuestas: ['porcentaje de germinacion', 'el porcentaje de germinacion', 'tasa de germinacion', 'poder germinativo', 'germinacion'],
        pista: '<p>Son tres palabras: un tipo de número, "de", y lo que hace la semilla al brotar.</p>',
        solucion: '<p>El <strong>porcentaje de germinación</strong>.</p>' },
    ],
    fuentes: [OSUPRUEBA, ILLGERM, WIKI('Germinaci%C3%B3n', 'Germinación')],
  });

  // ------------------------------------------------------------------
  L('Remojar, escarificar y otros trucos para germinar', {
    objetivo: 'Ayudar a germinar a las semillas que tardan, remojándolas, lijando su cubierta o dándoles un periodo de frío, y saber cuándo hace falta cada técnica.',
    explicacion: `
      <p>Siembras unas semillas de chícharo de olor junto con unas de rábano. A los cinco días, los rábanos ya asoman y los chícharos siguen escondidos, duros como piedritas. No es que estén muertos: su cubierta es tan dura que el agua apenas entra. Con un poco de ayuda, pueden brotar mucho antes.</p>
      <h3>Por qué algunas semillas se tardan</h3>
      <p>En "Qué es una semilla" viste que la latencia es una espera que protege a la semilla de brotar en mal momento. La Extensión de la Universidad de Arizona menciona tres causas: una cubierta dura que no deja pasar el agua, un embrión que no ha terminado de madurar y sustancias químicas que frenan la germinación. Para cada causa hay un truco: el remojo, la escarificación y la estratificación.</p>
      <p>Antes de aplicar cualquiera, lee el sobre o busca qué necesita tu semilla. La mayoría de las hortalizas comunes no necesita ningún truco, y algunos pueden dañarla si no hacen falta.</p>
      <h3>Remojar</h3>
      <p>Para germinar, la semilla primero tiene que absorber agua. La Universidad de Florida explica que remojarla antes de sembrar acelera ese paso: hasta una hora para las semillas pequeñas, y varias horas o toda la noche para las grandes, como el garbanzo o el frijol negro. Usa agua a temperatura ambiente y siembra en cuanto termines, porque una semilla hinchada ya despertó y se puede secar o pudrir si la dejas esperando.</p>
      <h3>Escarificar</h3>
      <p><strong>Escarificar</strong> es raspar o romper un poquito la cubierta dura de una semilla para que entre el agua. Según la Universidad de Florida, la mayoría de las personas lo hace a mano con una lima o una lija. La idea es adelgazar la cubierta en un punto, sin llegar al embrión.</p>
      <ul>
        <li>Sostén la semilla con los dedos o con unas pinzas y frótala contra una lija o una lima de uñas hasta que veas un color más claro debajo de la cubierta.</li>
        <li>Raspa del lado contrario al ojo de la semilla, que es la marca por donde estuvo pegada a la vaina; en muchas semillas el embrión está cerca del ojo, y así lo proteges.</li>
        <li>Después de escarificarla, remójala unas horas y siémbrala.</li>
      </ul>
      <p>Hazlo despacio y sin cuchillos ni navajas: una semilla resbala con facilidad y es fácil cortarse. La Universidad de Florida también menciona el agua muy caliente para ablandar cubiertas, pero aquí no la recomendamos, porque es fácil quemarse y cocer la semilla.</p>
      <h3>Estratificar</h3>
      <p>Algunas semillas de árboles y flores de clima frío no germinan hasta que "sienten" que pasó el invierno. <strong>Estratificar</strong> es darles ese invierno de mentira: un periodo de frío y humedad. La Universidad de Florida explica que se puede hacer en el refrigerador, con las semillas en arena, toalla de papel u otro material húmedo dentro de un recipiente o bolsa cerrada, durante el tiempo que necesite cada especie, que puede ser de varias semanas. Otra opción es sembrarlas afuera en otoño y dejar que el invierno haga el trabajo.</p>
      <p>Una pista que da la misma universidad: piensa en lo que pasa en la naturaleza. Si las semillas caen en otoño y pasan el invierno en la hojarasca húmeda antes de brotar en primavera, seguramente necesitan frío.</p>
      <p class="nota"><strong>Trampa común:</strong> remojar las semillas por días "para que germinen más rápido". Demasiado tiempo en agua las deja sin oxígeno y se pudren.</p>`,
    ejemplo: `
      <p>Quieres sembrar garbanzos el sábado a las 8 de la mañana y dejarlos remojando toda la noche. Si quieres que el remojo dure 10 horas, ¿a qué hora los pones en agua?</p>
      <ol class="pasos-ej">
        <li>Primero identifica la hora de llegada: las 8 de la mañana del sábado.</li>
        <li>Resta las 10 horas del remojo. Desde las 8 de la mañana, retroceder 8 horas te lleva a la medianoche; te faltan 2 horas más.</li>
        <li>Dos horas antes de la medianoche son las 10 de la noche del viernes.</li>
        <li>Comprueba contando hacia adelante: de las 10 de la noche a la medianoche hay 2 horas, y de la medianoche a las 8 de la mañana hay 8. En total, 2 + 8 = 10 horas.</li>
      </ol>
      <p>Resultado: <span class="resultado">a las 10 de la noche del viernes</span>; a las 8 de la mañana los siembras sin dejarlos secar.</p>
      <p class="nota"><strong>Error común:</strong> remojarlos y olvidarlos un día más en el agua. Siémbralos en cuanto termine el remojo.</p>`,
    vidaReal: `
      <p>Estos trucos te ayudan con las semillas más tercas:</p>
      <ul>
        <li>Los frijoles y garbanzos brotan antes y de forma más pareja.</li>
        <li>Puedes sembrar flores y árboles de tu región que se resisten a germinar.</li>
        <li>No tiras semillas que solo necesitaban un poco de ayuda.</li>
        <li>Planeas mejor tus siembras, porque sabes cuánto tiempo toma cada paso.</li>
        <li>Entiendes por qué algunas plantas silvestres solo brotan después del invierno.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Pones unos frijoles a remojar a las 9 de la noche y los siembras a las 7 de la mañana siguiente. ¿Cuántas horas estuvieron en agua?</p>', respuesta: 3 + 7,
        pista: '<p>Cuenta las horas hasta la medianoche y súmales las de la mañana.</p>',
        solucion: '<p>De las 9 a la medianoche son 3 horas, y de la medianoche a las 7 son 7. En total, <strong>10 horas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Unas semillas necesitan 6 semanas de frío en el refrigerador. ¿Cuántos días son?</p>', respuesta: 6 * 7,
        pista: '<p>Cada semana tiene 7 días.</p>',
        solucion: '<p>6 × 7 = <strong>42 días</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es escarificar una semilla?</p>',
        opciones: ['Ponerla en el refrigerador', 'Raspar un poco su cubierta dura para que entre el agua', 'Sembrarla muy profundo'], correcta: 1,
        pista: '<p>Se hace con una lija o una lima.</p>',
        solucion: '<p><strong>Raspar un poco su cubierta</strong>, sin llegar al embrión, para que el agua entre.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿De qué lado conviene raspar la semilla al escarificarla?</p>',
        opciones: ['Del lado contrario al ojo de la semilla', 'Justo sobre el ojo', 'De todos lados hasta quitarle toda la cubierta'], correcta: 0,
        pista: '<p>Cerca del ojo está el embrión.</p>',
        solucion: '<p><strong>Del lado contrario al ojo</strong>, para no dañar el embrión.</p>' },
      { tipo: 'opciones', enunciado: '<p>Unas semillas de un árbol de clima frío no brotan aunque tienen agua y calor. ¿Qué técnica conviene probar?</p>',
        opciones: ['Remojarlas una semana', 'Lijarlas hasta quitarles toda la cubierta', 'Estratificarlas: un periodo de frío y humedad en el refrigerador'], correcta: 2,
        pista: '<p>Piensa en lo que les pasa en la naturaleza durante el invierno.</p>',
        solucion: '<p><strong>Estratificarlas.</strong> Muchas semillas de clima frío necesitan sentir que pasó el invierno.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama darle a una semilla un periodo de frío y humedad, como un invierno de mentira, para que germine?</p>',
        respuestas: ['estratificar', 'estratificacion', 'la estratificacion', 'estratificarla'],
        pista: '<p>Empieza con "estrat".</p>',
        solucion: '<p><strong>Estratificar</strong>.</p>' },
    ],
    fuentes: [UF, AZSIEMBRA, ILLGERM, WIKI('Germinaci%C3%B3n', 'Germinación')],
  });

  // ------------------------------------------------------------------
  const ETAPAS = ['semilla seca', 'se hincha con agua', 'sale la radícula', 'salen los cotiledones', 'hojas verdaderas'];
  const ETAPASFIG = diagrama([0, 10], [0, 11.4], [
    ...ETAPAS.flatMap((e, i) => [caja(1, 9.6 - 2.2 * i, 9, 11 - 2.2 * i), txt(5, 10.3 - 2.2 * i, e)]),
    ...[0, 1, 2, 3].flatMap((i) => flecha([5, 9.55 - 2.2 * i], [5, 8.85 - 2.2 * i], 0, 1.2)),
  ], 'Cinco cajas en columna, de arriba hacia abajo, unidas por flechas: semilla seca; se hincha con agua; sale la radícula; salen los cotiledones; hojas verdaderas.');

  L('Germinar semillas paso a paso', {
    objetivo: 'Seguir las etapas de la germinación, sembrar a la profundidad correcta, mantener las condiciones adecuadas y saber qué revisar si las semillas no brotan.',
    explicacion: `
      <p>Siembras unas semillas y durante días no ves nada. Parece que no pasa nada, pero bajo la tierra está ocurriendo una de las cosas más asombrosas de la naturaleza. Saber qué pasa en cada etapa te ayuda a darle a la semilla lo que necesita en cada momento.</p>
      <h3>Las etapas</h3>
      ${ETAPASFIG}
      <ol>
        <li>La semilla seca absorbe agua y se hincha. Por eso las primeras horas la humedad es lo más importante.</li>
        <li>La cubierta se rompe y sale la <strong>radícula</strong>, que es la primera raíz. Siempre sale primero la raíz, porque la plantita necesita agarrarse y tomar agua antes de crecer hacia arriba.</li>
        <li>El tallito sube y saca a la superficie las primeras hojas. Muchas plantas sacan primero los <strong>cotiledones</strong>, unas hojas de semilla que guardan o usan la reserva de alimento. Suelen ser redondeadas y distintas a las de la planta adulta.</li>
        <li>Después aparecen las <strong>hojas verdaderas</strong>, que ya tienen la forma de las hojas de esa planta. Desde aquí, la planta fabrica su alimento con la luz.</li>
      </ol>
      <h3>Sembrar a la profundidad correcta</h3>
      <p>Una semilla tiene una reserva limitada. Si la siembras muy hondo, se le acaba antes de llegar a la luz; si la dejas en la superficie, se seca o la lava el agua. La guía "Su propio cultivo" de la Universidad Estatal de Oregon da estas profundidades:</p>
      <ul>
        <li>Semillas pequeñas, como las de col, zanahoria, rábano y lechuga: a ½ pulgada, más o menos 1.3 cm.</li>
        <li>Semillas medianas, como las de betabel y acelga: a ¾ de pulgada, unos 1.9 cm.</li>
        <li>Semillas grandes, como las de frijol, maíz y calabaza: de 1 a 1½ pulgadas, unos 2.5 a 4 cm.</li>
      </ul>
      <p>Fíjate en el patrón: entre más grande la semilla, más reserva tiene y más hondo puede ir. Las semillas diminutas que necesitan luz casi no se tapan, como viste en "Qué es una semilla".</p>
      <h3>Humedad y temperatura</h3>
      <p>Desde que siembras hasta que brotan, la tierra debe estar húmeda todo el tiempo, sin encharcarse. Riega con un rocío fino o una regadera de agujeros pequeños, para no desenterrar las semillas. Una semilla que empezó a germinar y se seca, muere.</p>
      <p>La temperatura cambia mucho el tiempo de espera. La Universidad Cornell da un ejemplo con la lechuga: en tierra fría puede tardar dos semanas en germinar, y en verano, de 3 a 4 días. La Extensión de Illinois señala que unos 21 °C aceleran la germinación de muchas semillas, y que muchas brotan en 7 a 10 días.</p>
      <h3>Semillas pregerminadas</h3>
      <p>Si hiciste la prueba de la toalla, como viste en la lección anterior, puedes sembrar las semillas que ya sacaron raíz. La Extensión de Oregon recomienda tomarlas con cuidado del lado contrario a la raíz y sembrarlas con la raíz hacia abajo. Así solo siembras semillas que seguro están vivas.</p>
      <h3>Si no brotan</h3>
      <p>Pasado el tiempo que indica el sobre, si no ves nada, revisa en orden: ¿la tierra se secó en algún momento?, ¿se encharcó?, ¿hizo mucho frío?, ¿sembraste muy hondo?, ¿la semilla era vieja? Escarba con cuidado en una orilla: si la semilla está dura y entera, todavía puede brotar; si está blanda y huele mal, se pudrió.</p>
      <p class="nota"><strong>Trampa común:</strong> sembrar todas las semillas a la misma profundidad. Una semilla de lechuga enterrada como un frijol casi nunca llega a la superficie.</p>`,
    ejemplo: `
      <p>Vas a sembrar frijol. La guía de Oregon dice que las semillas grandes van de 1 a 1½ pulgadas de profundidad, y tu regla solo marca centímetros. ¿Entre qué profundidades lo siembras, si una pulgada son 2.54 cm?</p>
      <ol class="pasos-ej">
        <li>Primero convierte la profundidad menor: 1 pulgada son 1 × 2.54 = 2.54 cm, unos 2.5 cm.</li>
        <li>Luego la mayor: 1½ pulgadas son 1.5 × 2.54 = 3.81 cm, unos 3.8 cm.</li>
        <li>Así, el frijol va entre unos 2.5 y 3.8 cm de profundidad. Con el dedo, es más o menos hasta el primer nudillo.</li>
        <li>Comprueba que tiene sentido: las semillas pequeñas van a ½ pulgada, unos 1.3 cm, y el frijol, que es mucho más grande, va de dos a tres veces más hondo.</li>
      </ol>
      <p>Resultado: <span class="resultado">entre unos 2.5 y 3.8 cm de profundidad</span>.</p>
      <p class="nota"><strong>Error común:</strong> confundir pulgadas con centímetros. Una pulgada son unos 2.5 cm, no 1.</p>`,
    vidaReal: `
      <p>Saber cómo germina una semilla te da mejores resultados desde el primer intento:</p>
      <ul>
        <li>Siembras cada semilla a la profundidad que necesita.</li>
        <li>Sabes cuántos días esperar antes de preocuparte.</li>
        <li>Reconoces las primeras hojas y no arrancas tus plantitas pensando que son hierbas.</li>
        <li>Si algo falla, tienes una lista de qué revisar.</li>
        <li>Puedes sembrar solo las semillas que ya germinaron y no desperdiciar espacio.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Según la guía de Oregon, las semillas medianas van a ¾ de pulgada. Si una pulgada son 2.54 cm, ¿cuántos centímetros son? Redondea a un decimal.</p>', respuesta: 0.75 * 2.54, tolerancia: 0.06,
        pista: '<p>Tres cuartos es 0.75. Multiplica por 2.54.</p>',
        solucion: '<p>0.75 × 2.54 ≈ 1.9, unos <strong>1.9 cm</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Según Cornell, la lechuga tarda unas 2 semanas en germinar en tierra fría y de 3 a 4 días en verano. Si usas 4 días para el verano, ¿cuántos días más tarda en tierra fría?</p>', respuesta: 14 - 4,
        pista: '<p>Pasa las 2 semanas a días y resta.</p>',
        solucion: '<p>2 semanas son 14 días; 14 − 4 = <strong>10 días</strong> más.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué sale primero de una semilla al germinar?</p>',
        opciones: ['Las hojas verdaderas', 'La radícula, la primera raíz', 'La flor'], correcta: 1,
        pista: '<p>La plantita necesita agarrarse y tomar agua antes de crecer hacia arriba.</p>',
        solucion: '<p><strong>La radícula.</strong> Siempre sale primero la raíz.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas semillas se siembra más profundo?</p>',
        opciones: ['Lechuga', 'Zanahoria', 'Calabaza'], correcta: 2,
        pista: '<p>Entre más grande, más reserva tiene y más hondo puede ir.</p>',
        solucion: '<p><strong>Calabaza</strong>, que es una semilla grande: de 2.5 a 4 cm. La lechuga y la zanahoria van a 1.3 cm.</p>' },
      { tipo: 'opciones', enunciado: '<p>Escarbas y encuentras la semilla blanda y con mal olor. ¿Qué pasó?</p>',
        opciones: ['Se pudrió, probablemente por exceso de agua', 'Todavía está germinando', 'Le faltó luz'], correcta: 0,
        pista: '<p>Una semilla dura y entera aún puede brotar.</p>',
        solucion: '<p><strong>Se pudrió.</strong> Suele pasar cuando la tierra se encharca y falta oxígeno.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llaman las hojas de semilla, redondeadas, que muchas plantas sacan primero y que son distintas a las de la planta adulta?</p>',
        respuestas: ['cotiledones', 'cotiledon', 'los cotiledones'],
        pista: '<p>En el frijol son las dos mitades gruesas de la semilla.</p>',
        solucion: '<p>Los <strong>cotiledones</strong>.</p>' },
    ],
    fuentes: [OSU, OSUPRUEBA, CORNELL, ILLGERM, WIKI('Germinaci%C3%B3n', 'Germinación')],
  });

  // ------------------------------------------------------------------
  L('Semilleros y almácigos', {
    objetivo: 'Preparar un almácigo para que las semillas germinen protegidas, cuidar las plántulas los primeros días y evitar que se enfermen.',
    explicacion: `
      <p>Una plantita de jitomate recién nacida es tan frágil que un aguacero, un caracol o una tarde de sol fuerte pueden acabar con ella. Por eso muchas plantas no se siembran directo en el huerto, sino en un lugar protegido donde puedes cuidarlas de cerca durante sus primeras semanas.</p>
      <h3>¿Qué es un almácigo?</h3>
      <p>Un <strong>almácigo</strong>, también llamado semillero, es un recipiente o un pedazo de tierra donde se siembran semillas muy juntas para cuidarlas mientras germinan y crecen un poco; después se trasplantan a su lugar definitivo. Así ahorras espacio en el huerto, aprovechas mejor las semillas y puedes empezar antes de que la temporada sea buena afuera.</p>
      <h3>Los recipientes</h3>
      <p>Sirven charolas de germinación con celdas, vasos de yogur o cajas de huevo de cartón, siempre con agujeros para que salga el agua. Las charolas con celdas tienen una ventaja: cada planta queda con su propio bloque de tierra y sus raíces no se enredan con las de sus vecinas, lo que facilita el trasplante.</p>
      <h3>El sustrato</h3>
      <p>Como viste en "Huerto en macetas y balcones", la tierra del jardín es demasiado pesada para un recipiente. Para un almácigo, la Extensión de la Universidad de Arizona recomienda una mezcla que guarde agua, sea ligera y aireada, drene con facilidad y esté libre de enfermedades. Humedécela antes de sembrar, para que quede pareja.</p>
      <h3>Los primeros días</h3>
      <p>Mientras las semillas germinan, conviene cubrir la charola con una tapa transparente o una bolsa, para guardar la humedad. Pero la humedad encerrada también favorece a los hongos. La Extensión de la Universidad Estatal de Utah recomienda quitar la tapa cuando ha germinado más o menos la mitad de las semillas, y poner un ventilador pequeño para que circule el aire. Un poco de viento suave, además, ayuda a que los tallos crezcan más fuertes.</p>
      <h3>Luz</h3>
      <p>En cuanto brotan, las plántulas necesitan mucha luz. Si les falta, se estiran, se ponen pálidas y se doblan buscándola. Pon el almácigo en el lugar más luminoso que tengas o, en interiores, bajo una lámpara cerca de las plantas (cuida que el agua no la salpique), y gíralo cada día si la luz llega de un solo lado.</p>
      <h3>Riego</h3>
      <p>Utah propone un truco sencillo: levanta la charola recién regada y fíjate cuánto pesa. Cuando se sienta mucho más ligera, toca regar. También puedes ver el color: el sustrato mojado es casi negro y el seco, café claro. Deja que se seque un poco entre riegos, pero nunca tanto que las plantas se marchiten.</p>
      <h3>Abono</h3>
      <p>Al principio, la plantita vive de la reserva de la semilla. La Extensión de Arizona indica abonar solo después de que salen las primeras hojas verdaderas, y con una solución diluida; un abono fuerte puede quemar las raíces tiernas.</p>
      <h3>La secadera</h3>
      <p>A veces, de un día para otro, las plántulas se doblan desde la base, como si se hubieran cortado, y mueren. Es la <strong>secadera</strong>, que en inglés se llama <span lang="en">damping-off</span>. Utah explica que la causan varios hongos y que la favorecen el frío y la humedad. Si aparece, saca las plántulas enfermas junto con su sustrato, revisa las vecinas, usa sustrato nuevo y limpio y recipientes nuevos o desinfectados, deja secar un poco entre riegos y separa más las plantas para que les llegue aire.</p>
      <p class="nota"><strong>Trampa común:</strong> dejar la tapa puesta después de que brotan las semillas. El aire húmedo y quieto es justo lo que necesita la secadera.</p>`,
    ejemplo: `
      <p>Quieres 30 plantas de chile. Tu semilla tiene 80% de germinación y usarás una charola con celdas, una semilla por celda. ¿Cuántas celdas siembras?</p>
      <ol class="pasos-ej">
        <li>Primero recuerda lo que viste en "Prueba de germinación": si solo brota el 80%, necesitas más semillas que plantas.</li>
        <li>Divide las plantas que quieres entre la proporción que germina: 30 ÷ 0.8 = 37.5.</li>
        <li>No se puede sembrar media semilla, así que redondeas hacia arriba: 38 celdas.</li>
        <li>Comprueba: el 80% de 38 es 38 × 0.8 = 30.4, es decir, unas 30 plantas.</li>
      </ol>
      <p>Resultado: <span class="resultado">38 celdas, una semilla en cada una</span>. Si germinan más de las que necesitas, las plántulas que sobren las regalas o las siembras en otro lugar.</p>
      <p class="nota"><strong>Error común:</strong> redondear hacia abajo, a 37. Así es probable que te quedes con 29 plantas.</p>`,
    vidaReal: `
      <p>Un buen almácigo te da plantas fuertes y te ahorra dinero:</p>
      <ul>
        <li>Producir tus propias plántulas cuesta mucho menos que comprarlas.</li>
        <li>Puedes empezar a sembrar semanas antes de que el clima sea bueno afuera.</li>
        <li>Eliges las variedades que quieres, no solo las que vende el vivero.</li>
        <li>Las cajas de huevo y los vasos de yogur encuentran un nuevo uso.</li>
        <li>Tus plántulas crecen sanas porque sabes cómo evitar la secadera.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Quieres 24 plantas de jitomate y tu semilla tiene 75% de germinación. ¿Cuántas semillas siembras, una por celda?</p>', respuesta: 24 / 0.75,
        pista: '<p>Divide las plantas que quieres entre la proporción que germina.</p>',
        solucion: '<p>24 ÷ 0.75 = <strong>32 semillas</strong>. Comprueba: el 75% de 32 es 24.</p>' },
      { tipo: 'numero', enunciado: '<p>Una charola tiene 6 filas de 12 celdas. ¿Cuántas celdas tiene?</p>', respuesta: 6 * 12,
        pista: '<p>Multiplica las filas por las celdas de cada fila.</p>',
        solucion: '<p>6 × 12 = <strong>72 celdas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la Extensión de Utah, ¿cuándo se quita la tapa transparente del almácigo?</p>',
        opciones: ['Cuando ha germinado más o menos la mitad de las semillas', 'Apenas siembras, antes de que broten', 'Nunca'], correcta: 0,
        pista: '<p>La humedad encerrada favorece a los hongos.</p>',
        solucion: '<p><strong>Cuando ha germinado más o menos la mitad.</strong> Así entra aire y se evita la secadera.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tus plántulas están largas, pálidas y dobladas hacia la ventana. ¿Qué les falta?</p>',
        opciones: ['Agua', 'Luz', 'Abono'], correcta: 1,
        pista: '<p>Se están estirando para buscar algo.</p>',
        solucion: '<p><strong>Luz.</strong> Ponlas en un lugar más luminoso o más cerca de la lámpara.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuándo conviene empezar a abonar las plántulas?</p>',
        opciones: ['El mismo día que siembras', 'Antes de que germinen', 'Después de que salen las primeras hojas verdaderas, con una solución diluida'], correcta: 2,
        pista: '<p>Al principio la plantita vive de la reserva de la semilla.</p>',
        solucion: '<p><strong>Después de las primeras hojas verdaderas</strong>, con abono diluido para no quemar las raíces.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la enfermedad causada por hongos que hace que las plántulas se doblen desde la base y mueran?</p>',
        respuestas: ['secadera', 'la secadera', 'damping off', 'damping-off', 'mal del talluelo', 'ahogamiento'],
        pista: '<p>En inglés se llama <span lang="en">damping-off</span>.</p>',
        solucion: '<p>La <strong>secadera</strong>, también llamada mal del talluelo.</p>' },
    ],
    fuentes: [USU, AZSIEMBRA, WIKI('Alm%C3%A1cigo', 'Almácigo')],
  });

  // ------------------------------------------------------------------
  L('Trasplantar sin dañar las raíces', {
    objetivo: 'Saber cuándo una plántula está lista para trasplantarse, prepararla poco a poco para el exterior y moverla a su lugar definitivo sin dañar sus raíces.',
    explicacion: `
      <p>Imagina que vives toda tu vida en un cuarto tibio, sin viento y con la luz suave de una ventana, y de pronto te dejan afuera, al sol del mediodía y con viento. Eso le pasa a una plántula que sale del almácigo directo al huerto. Muchas se queman, se marchitan o se detienen por semanas. Con unos días de preparación y un buen trasplante, siguen creciendo sin pausa.</p>
      <h3>¿Cuándo está lista?</h3>
      <p>La Extensión de la Universidad de Arizona indica que muchas plantas están listas para trasplantarse cuando ya tienen su primer par de hojas verdaderas, y que las pequeñas o delicadas conviene esperar al segundo par. Recuerda que las hojas verdaderas son las que ya tienen la forma de las de esa planta, no los cotiledones redondeados del principio.</p>
      <h3>Endurecer</h3>
      <p><strong>Endurecer</strong> una plántula es acostumbrarla poco a poco al sol, al viento y a los cambios de temperatura de afuera. La Extensión de la Universidad Estatal de Utah recomienda empezar por lo menos dos semanas antes del trasplante:</p>
      <ol>
        <li>Los primeros días, saca las plántulas solo unas horas y déjalas a la sombra.</li>
        <li>Cada día déjalas más tiempo afuera y dales un poco más de sol.</li>
        <li>Al final deben aguantar el sol pleno todo el día.</li>
      </ol>
      <p>Utah advierte no exponer a temperaturas de menos de 7 a 10 °C las plantas de temporada cálida, como el jitomate, el chile, la calabaza y el melón. También aclara que es normal que algunas hojas se pongan amarillas o secas en el proceso; lo importante es que salgan hojas nuevas acostumbradas a la luz de afuera.</p>
      <h3>Sacar la planta sin romper sus raíces</h3>
      <p>El <strong>cepellón</strong> es el bloque de tierra que rodea las raíces de una planta en su recipiente. La clave del trasplante es moverlo entero: si se desmorona, se rompen las raíces finas que absorben el agua y la planta se marchita. Por eso Utah recomienda empujar el cepellón desde abajo, por ejemplo con un lápiz por el agujero de la celda, en lugar de jalar la planta por el tallo. Si tienes que sujetarla, tómala de una hoja, que puede reponer, nunca del tallo.</p>
      <p>Si las raíces dieron vueltas alrededor del cepellón formando una maraña, Utah sugiere aflojarlas un poco con los dedos o hacer unos cortes poco profundos, para que crezcan hacia afuera.</p>
      <h3>Plantar</h3>
      <p>Según Utah:</p>
      <ul>
        <li>Haz un hoyo del doble de ancho que el cepellón, pero solo de su misma profundidad, para que la planta quede a la misma altura que tenía en su recipiente.</li>
        <li>El jitomate es la excepción: puede echar raíces a lo largo del tallo, así que se puede plantar más hondo.</li>
        <li>Riega en cuanto termines, para que la tierra se asiente alrededor de las raíces.</li>
        <li>De preferencia, trasplanta en la mañana o en un día nublado, cuando el sol es más suave.</li>
        <li>Mantén húmedo el cepellón los primeros días; puede hacer falta regar a diario.</li>
      </ul>
      <p>Si la plántula creció en una maceta de turba, se planta sin sacarla, pero hay que abrirle cortes a los lados y taparla toda con tierra.</p>
      <p class="nota"><strong>Trampa común:</strong> jalar la plántula por el tallo para sacarla. Un tallo aplastado no se recupera, mientras que una hoja dañada sí se repone.</p>`,
    ejemplo: `
      <p>Vas a endurecer tus plántulas. El primer día las sacas 2 horas y cada día aumentas 1 hora. ¿En qué día llegan a 10 horas afuera, y te alcanza si trasplantas en 14 días?</p>
      <ol class="pasos-ej">
        <li>Primero piensa cuánto falta: de 2 a 10 horas hay 8 horas de diferencia.</li>
        <li>Como aumentas 1 hora por día, necesitas 8 días más después del primero: el día 1 + 8 = día 9.</li>
        <li>Revisa la lista: día 1, 2 horas; día 2, 3 horas; y así hasta el día 9, con 10 horas.</li>
        <li>Comprueba con el plazo de Utah: empezar al menos dos semanas antes son 14 días. Llegas a 10 horas el día 9 y te quedan 5 días para acostumbrarlas al sol pleno.</li>
      </ol>
      <p>Resultado: <span class="resultado">el día 9 llegan a 10 horas; sí alcanza</span>.</p>
      <p class="nota"><strong>Error común:</strong> dejarlas todo el día al sol desde el primer día. Sus hojas se queman.</p>`,
    vidaReal: `
      <p>Un buen trasplante evita que pierdas las plantas que tanto cuidaste:</p>
      <ul>
        <li>Tus plántulas siguen creciendo sin detenerse después del cambio.</li>
        <li>No se te queman las hojas el primer día al sol.</li>
        <li>Puedes mover plantas de una maceta a otra más grande sin miedo.</li>
        <li>Sabes por qué conviene trasplantar en la mañana o en un día nublado.</li>
        <li>Puedes regalar o vender plántulas fuertes que sí sobreviven al cambio.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>El cepellón de tu plántula mide 5 cm de ancho y 6 cm de alto. Según Utah, ¿de cuántos centímetros de ancho haces el hoyo?</p>', respuesta: 5 * 2,
        pista: '<p>El hoyo es del doble de ancho que el cepellón.</p>',
        solucion: '<p>5 × 2 = <strong>10 cm</strong> de ancho, y 6 cm de profundidad.</p>' },
      { tipo: 'numero', enunciado: '<p>Quieres trasplantar el 20 de mayo y empezar a endurecer dos semanas antes. ¿Qué día de mayo empiezas?</p>', respuesta: 20 - 14,
        pista: '<p>Dos semanas son 14 días.</p>',
        solucion: '<p>20 − 14 = <strong>6</strong>, es decir, el 6 de mayo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cómo se saca una plántula de su celda sin dañarla?</p>',
        opciones: ['Jalándola del tallo', 'Empujando el cepellón desde abajo', 'Sacudiendo la charola boca abajo con fuerza'], correcta: 1,
        pista: '<p>La idea es que el bloque de tierra salga entero.</p>',
        solucion: '<p><strong>Empujando el cepellón desde abajo</strong>, por ejemplo con un lápiz por el agujero.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué planta se puede trasplantar más hondo de lo que estaba en su maceta?</p>',
        opciones: ['El jitomate', 'La lechuga', 'El betabel'], correcta: 0,
        pista: '<p>Es una planta que echa raíces a lo largo del tallo.</p>',
        solucion: '<p><strong>El jitomate.</strong> Las demás se plantan a la misma altura que tenían.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es el mejor momento para trasplantar?</p>',
        opciones: ['Al mediodía de un día caluroso', 'Justo antes de una helada', 'En la mañana o en un día nublado'], correcta: 2,
        pista: '<p>Busca el momento en que el sol es más suave.</p>',
        solucion: '<p><strong>En la mañana o en un día nublado</strong>, para que la planta no pierda tanta agua mientras se acomoda.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama acostumbrar poco a poco una plántula al sol, al viento y a la temperatura de afuera antes de trasplantarla?</p>',
        respuestas: ['endurecer', 'endurecimiento', 'el endurecimiento', 'endurecerla', 'aclimatar', 'aclimatacion'],
        pista: '<p>Viene de "duro".</p>',
        solucion: '<p><strong>Endurecer</strong> la plántula.</p>' },
    ],
    fuentes: [USU, AZSIEMBRA, IOWA('faq/do-annual-flowers-and-vegetable-plants-need-any-special-care-planting', 'Do annual flowers and vegetable plants need any special care before planting?')],
  });

  // ------------------------------------------------------------------
  L('Siembra directa: qué semillas van directo a la tierra', {
    objetivo: 'Reconocer qué cultivos conviene sembrar directo en el huerto, prepararles la tierra y aclarar las plántulas para que crezcan bien.',
    explicacion: `
      <p>Has visto que muchas plantas se empiezan en un almácigo. Pero si intentas trasplantar una zanahoria, lo más probable es que salga torcida, partida o con muchas raíces delgadas en lugar de una gruesa. Hay plantas que prefieren nacer donde van a vivir toda su vida.</p>
      <h3>¿Qué es la siembra directa?</h3>
      <p>La <strong>siembra directa</strong> es sembrar la semilla en el lugar definitivo, en el huerto o en la maceta donde crecerá, sin pasar por un almácigo. La Extensión de la Universidad Estatal de Iowa explica que es más barata que comprar plántulas, toma menos tiempo que criarlas dentro de casa y funciona muy bien en dos casos: los cultivos que crecen rápido, como el rábano, y los que no se trasplantan bien.</p>
      <h3>¿Por qué algunas no aguantan el trasplante?</h3>
      <p>La Universidad Cornell da dos razones:</p>
      <ul>
        <li>Las plantas que cultivamos por su raíz, como la zanahoria, el betabel y el nabo, tienen una raíz principal gruesa. Al trasplantarlas, esa raíz suele dañarse y la planta forma muchas raíces delgadas. A la planta no le importa, pero a ti sí, porque esa raíz gruesa es justo lo que vas a comer.</li>
        <li>El frijol y el chícharo suelen sufrir mucho con el trasplante; los que sobreviven quedan débiles y producen poco.</li>
      </ul>
      <p>Iowa y Cornell coinciden en sembrar directo, entre otros, el frijol, el chícharo, el maíz, la zanahoria, el betabel, el nabo y el rábano. Otros cultivos, como el pepino, la calabaza y la lechuga, se pueden sembrar de las dos formas, según la temporada y tus necesidades.</p>
      <h3>Preparar la cama</h3>
      <p>Una semilla pequeña necesita tierra fina, suelta y sin terrones, para que su raíz avance y su tallito salga sin estorbos. Afloja la tierra, quita piedras y raíces, y empareja la superficie. Después siembra a la profundidad que viste en "Germinar semillas paso a paso": entre más pequeña la semilla, más cerca de la superficie. Iowa señala que la profundidad viene en el sobre y que algunas semillas casi no se tapan.</p>
      <h3>Mantener la humedad</h3>
      <p>Iowa insiste en mantener húmeda la cama hasta que brote todo. Sembradas directo, las semillas están más expuestas al sol y al viento que en un almácigo, y la superficie se seca rápido. Riega con rocío fino, con frecuencia y poca agua, y cubre la cama con una capa muy ligera de paja o una tela delgada si hace mucho calor, retirándola en cuanto brotan.</p>
      <h3>Aclarar</h3>
      <p>Como no sabes cuáles semillas germinarán, se siembran más de las necesarias. Cuando brotan, quedan demasiado juntas y compiten por la luz, el agua y los nutrientes. El <strong>aclareo</strong> es quitar algunas plántulas para dejar a cada una el espacio que necesita. Iowa recomienda aclarar después de la germinación hasta la distancia que indica el sobre. La guía de Oregon explica por qué importa: si las plantas quedan demasiado cerca, no crecen tan grandes como deberían; en las zanahorias y los rábanos, se forman muchas hojas y raíces pequeñas.</p>
      <p>Para aclarar sin dañar a las vecinas, corta con tijeras las plántulas que sobran, a ras de suelo, en lugar de arrancarlas. Algunas, como la lechuga o el betabel, puedes comerlas en ensalada.</p>
      <p class="nota"><strong>Trampa común:</strong> no aclarar "para no desperdiciar". Diez zanahorias apretadas en el espacio de tres dan diez zanahorias diminutas.</p>`,
    ejemplo: `
      <p>Siembras zanahoria en una fila de 1 metro, más o menos una semilla por centímetro. El sobre dice dejar una planta cada 5 cm. Si brotan todas, ¿cuántas plantas dejas y cuántas quitas?</p>
      <ol class="pasos-ej">
        <li>Primero calcula cuántas semillas sembraste: 1 metro son 100 cm, y con una por centímetro son 100 semillas.</li>
        <li>Ahora calcula cuántas plantas caben con 5 cm entre una y otra: 100 ÷ 5 = 20 plantas.</li>
        <li>Las que quitas son las que sobran: 100 − 20 = 80 plántulas.</li>
        <li>Comprueba: 20 plantas separadas 5 cm ocupan 20 × 5 = 100 cm, justo el metro de la fila.</li>
      </ol>
      <p>Resultado: <span class="resultado">dejas 20 plantas y quitas 80</span>. En la práctica no brotan todas, así que quitarás menos; lo importante es que las que se quedan tengan sus 5 cm.</p>
      <p class="nota"><strong>Error común:</strong> aclarar demasiado tarde, cuando las raíces ya se enredaron. Aclara cuando las plántulas son pequeñas.</p>`,
    vidaReal: `
      <p>Sembrar directo es la forma más sencilla de empezar un huerto:</p>
      <ul>
        <li>No necesitas charolas, lámparas ni espacio dentro de casa.</li>
        <li>Tus zanahorias y rábanos salen rectos y grandes.</li>
        <li>Ahorras el trabajo y el riesgo del trasplante.</li>
        <li>Las plántulas que aclaras se pueden comer en una ensalada.</li>
        <li>Sabes cuántas semillas comprar para llenar una cama sin que sobren demasiadas.</li>
        <li>Puedes enseñar a otras personas a empezar un huerto con muy poco equipo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una fila mide 2 metros y el sobre dice dejar una planta de betabel cada 10 cm. ¿Cuántas plantas caben?</p>', respuesta: 200 / 10,
        pista: '<p>Pasa los metros a centímetros y divide entre la distancia.</p>',
        solucion: '<p>2 metros son 200 cm, y 200 ÷ 10 = <strong>20 plantas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Sembraste 60 semillas de rábano y al aclarar dejas 15 plantas. ¿Cuántas plántulas quitas?</p>', respuesta: 60 - 15,
        pista: '<p>Resta las que dejas de las que sembraste.</p>',
        solucion: '<p>60 − 15 = <strong>45 plántulas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos cultivos conviene sembrar directo porque no aguanta bien el trasplante?</p>',
        opciones: ['Jitomate', 'Zanahoria', 'Chile'], correcta: 1,
        pista: '<p>Piensa en la que cultivamos por su raíz principal.</p>',
        solucion: '<p><strong>La zanahoria.</strong> Al trasplantarla se daña su raíz principal, que es lo que comemos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué se aclaran las plántulas?</p>',
        opciones: ['Para que cada planta tenga espacio, luz y nutrientes suficientes', 'Para que el huerto se vea ordenado', 'Para que germinen más rápido'], correcta: 0,
        pista: '<p>Piensa en lo que pasa cuando crecen muy juntas.</p>',
        solucion: '<p><strong>Para que cada planta tenga lo que necesita.</strong> Apretadas, crecen pequeñas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es la mejor forma de quitar las plántulas que sobran?</p>',
        opciones: ['Arrancarlas de un tirón', 'Dejarlas y regar más', 'Cortarlas con tijeras a ras de suelo'], correcta: 2,
        pista: '<p>Quieres que las raíces de las vecinas no se muevan.</p>',
        solucion: '<p><strong>Cortarlas con tijeras a ras de suelo</strong>, para no mover las raíces de las que se quedan.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama quitar algunas plántulas para dejar a cada una el espacio que necesita?</p>',
        respuestas: ['aclareo', 'aclarar', 'el aclareo', 'raleo', 'ralear', 'entresacar'],
        pista: '<p>Viene del verbo "aclarar".</p>',
        solucion: '<p>El <strong>aclareo</strong>.</p>' },
    ],
    fuentes: [IOWA('how-to/direct-seeding-vegetables-and-annuals-preparation-and-care', 'Direct Seeding Vegetables and Annuals'), CORNELL, OSU],
  });

  // ------------------------------------------------------------------
  L('Esquejes, tubérculos y otras formas de multiplicar plantas', {
    objetivo: 'Multiplicar plantas sin semilla, con esquejes, trozos de tubérculo, brotes y bulbos, y entender por qué las plantas nuevas son iguales a la madre.',
    explicacion: `
      <p>Una ramita de hierbabuena olvidada en un vaso de agua echa raíces en pocos días. Una papa guardada en la alacena saca brotes. Un diente de ajo enterrado se vuelve una cabeza entera. Muchas plantas no necesitan semillas para multiplicarse: un pedazo de ellas basta para formar una planta nueva.</p>
      <h3>Reproducción sin semilla</h3>
      <p>Cuando una planta nueva nace de una parte de otra planta, sin flores ni semillas, se habla de <strong>reproducción vegetativa</strong>. Como no hay mezcla de dos padres, la planta nueva tiene la misma información genética que la madre: es una copia, un clon. En Ciencias naturales, en "ADN, genes y cromosomas", viste que los rasgos vienen de esa información. Por eso, si tienes una hierbabuena con un sabor que te encanta, sus esquejes saldrán iguales.</p>
      <p>La ventaja es que conservas exactamente lo que te gusta y llegas a cosecha más rápido. La desventaja es que todas las plantas son iguales: si una enfermedad ataca a una, puede atacar a todas.</p>
      <h3>Esquejes</h3>
      <p>Un <strong>esqueje</strong> es un pedazo de tallo que se corta de una planta para que eche raíces. Funciona muy bien con hierbas como la hierbabuena, el romero, el orégano y la albahaca. La Extensión de la Universidad Estatal de Iowa da estos pasos:</p>
      <ol>
        <li>Corta la punta de un tallo sano, de 5 a 10 cm, con un cuchillo o tijeras limpias y afiladas.</li>
        <li>Quita con cuidado las hojas de la mitad de abajo.</li>
        <li>Entierra la parte cortada en un recipiente con perlita húmeda; caben varios esquejes en una maceta.</li>
        <li>Cubre el recipiente con una bolsa transparente, como una tienda de campaña, para guardar la humedad.</li>
        <li>Ponlo con luz indirecta y revisa que la perlita siga húmeda. Retira las hojas o esquejes que se pongan negros o con moho.</li>
        <li>La mayoría echa raíces en 4 a 6 semanas. Para saber si ya tienen, jala la punta con mucha suavidad: si sientes resistencia, ya enraizó.</li>
      </ol>
      <h3>Tubérculos</h3>
      <p>Un <strong>tubérculo</strong> es un tallo subterráneo engrosado que guarda alimento, como la papa. Sus "ojos" son yemas: de cada uno puede salir un brote. Por eso la papa se siembra con pedazos de papa. La Extensión de Iowa explica que las papas pequeñas se siembran enteras y las grandes se cortan en trozos de unos 40 a 60 gramos con uno o dos ojos cada uno. Después se dejan uno o dos días en un lugar húmedo y templado para que el corte cicatrice, porque un corte fresco se pudre con facilidad en tierra fría y mojada. Las papas para sembrar no son para comer: según MedlinePlus, comer los brotes o las partes verdes de una papa puede intoxicar.</p>
      <h3>Brotes de camote</h3>
      <p>El camote se multiplica con sus brotes. La Extensión de la Universidad de Arizona explica que se pone un camote acostado en tierra, en un lugar tibio, húmedo y soleado, y se esperan los brotes. Advierte que, si lo compras en el mercado, conviene que sea orgánico, porque los demás suelen tratarse con productos que impiden que broten.</p>
      <h3>Bulbos y dientes</h3>
      <p>Una cabeza de ajo es un conjunto de dientes, y cada diente puede formar una planta nueva. Se separan y se siembran con la punta hacia arriba.</p>
      <p>Cómo cultivar la papa, el camote, el ajo y la cebolla hasta la cosecha lo verás en la unidad Cultivos básicos, y cómo guardar esos tubérculos y dientes para la siguiente siembra, en Guardar tus propias semillas.</p>
      <p class="nota"><strong>Trampa común:</strong> sembrar trozos de papa recién cortados en tierra fría y mojada. Sin dejar que cicatricen, se pudren antes de brotar.</p>`,
    ejemplo: `
      <p>Tienes 1 kg de papas grandes para sembrar. Si cortas trozos de unos 50 gramos, cada uno con uno o dos ojos, ¿cuántos trozos obtienes?</p>
      <ol class="pasos-ej">
        <li>Primero pasa todo a la misma unidad: 1 kg son 1 000 gramos.</li>
        <li>Divide entre el peso de cada trozo: 1 000 ÷ 50 = 20 trozos.</li>
        <li>Revisa los ojos: si una parte de una papa no tiene ningún ojo, no la cuentes como trozo para sembrar, porque no puede brotar.</li>
        <li>Comprueba: 20 trozos de 50 gramos pesan 20 × 50 = 1 000 gramos, es decir, 1 kg.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 20 trozos</span>, que dejarás cicatrizar uno o dos días antes de sembrar.</p>
      <p class="nota"><strong>Error común:</strong> cortar trozos muy pequeños para que salgan más. Con poca reserva, la planta nace débil.</p>`,
    vidaReal: `
      <p>Multiplicar plantas sin semilla te da plantas gratis y rápido:</p>
      <ul>
        <li>Una sola mata de hierbabuena o romero puede llenarte de macetas.</li>
        <li>Puedes compartir plantas con tus vecinos a partir de un pedazo.</li>
        <li>Conservas exactamente la variedad que te gusta.</li>
        <li>Aprovechas las papas y los ajos que empiezan a brotar en tu cocina.</li>
        <li>Llegas a la cosecha más rápido que si empezaras desde semilla.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tienes 1.5 kg de papa y cortas trozos de 50 gramos. ¿Cuántos trozos obtienes?</p>', respuesta: 1500 / 50,
        pista: '<p>Pasa los kilos a gramos y divide.</p>',
        solucion: '<p>1.5 kg son 1 500 gramos, y 1 500 ÷ 50 = <strong>30 trozos</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una cabeza de ajo tiene 12 dientes. Si siembras 4 cabezas, ¿cuántas plantas nuevas puedes obtener?</p>', respuesta: 12 * 4,
        pista: '<p>Cada diente puede ser una planta.</p>',
        solucion: '<p>12 × 4 = <strong>48 plantas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué una planta que sale de un esqueje es igual a la planta madre?</p>',
        opciones: ['Porque recibió agua de la misma llave', 'Porque tiene la misma información genética: es un clon', 'Porque creció en la misma maceta'], correcta: 1,
        pista: '<p>En la reproducción vegetativa no hay mezcla de dos padres.</p>',
        solucion: '<p><strong>Porque es un clon</strong>: tiene la misma información genética que su madre.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué se dejan cicatrizar los trozos de papa antes de sembrarlos?</p>',
        opciones: ['Para que el corte sane y no se pudran en la tierra', 'Para que pesen menos', 'Para que les salgan flores'], correcta: 0,
        pista: '<p>Un corte fresco es una herida abierta.</p>',
        solucion: '<p><strong>Para que el corte sane</strong> y no se pudra en tierra fría y mojada.</p>' },
      { tipo: 'opciones', enunciado: '<p>Al preparar un esqueje de romero, ¿qué hojas quitas?</p>',
        opciones: ['Todas', 'Las de la punta', 'Las de la mitad de abajo'], correcta: 2,
        pista: '<p>Es la parte que vas a enterrar.</p>',
        solucion: '<p><strong>Las de la mitad de abajo</strong>, que quedarían enterradas y se pudrirían.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el pedazo de tallo que se corta de una planta para que eche raíces?</p>',
        respuestas: ['esqueje', 'un esqueje', 'el esqueje', 'esquejes', 'gajo', 'estaca'],
        pista: '<p>Empieza con "esq".</p>',
        solucion: '<p>Un <strong>esqueje</strong>.</p>' },
    ],
    fuentes: [
      IOWA('how-to/propagating-herbaceous-plants-stem-cuttings', 'Propagating Herbaceous Plants from Stem Cuttings'),
      IOWA('faq/when-cutting-potato-tubers-pieces-prior-planting-what-proper-size-sections', 'When cutting potato tubers into pieces prior to planting, what is the proper size?'),
      AZRAICES,
      { nombre: 'MedlinePlus en español: Intoxicación con los brotes y tubérculos verdes de la papa', url: 'https://medlineplus.gov/spanish/ency/article/002875.htm' },
      WIKI('Esqueje', 'Esqueje'),
      WIKI('Reproducci%C3%B3n_vegetativa', 'Reproducción asexual'),
    ],
  });
})();
