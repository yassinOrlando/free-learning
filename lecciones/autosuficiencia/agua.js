// Autosuficiencia · Unidad 2: Agua.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Temas de salud y seguridad: solo fuentes oficiales; las cantidades de cloro y los tiempos se copian tal cual de la EPA y de SODIS.
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
  // Gráfica de barras de una sola serie (como en matematicas/estadistica.js): etiquetas abajo, valor encima.
  function barras({ etiquetas, valores, max, paso, descripcion }) {
    const n = valores.length;
    const figuras = valores.flatMap((v, i) => [
      { tipo: 'poligono', puntos: [[i + 0.15, 0], [i + 0.85, 0], [i + 0.85, v], [i + 0.15, v]], solido: true },
      txt(i + 0.5, -max * 0.07, etiquetas[i]),
      txt(i + 0.5, v + max * 0.05, String(v)),
    ]);
    return G({ x: [0, n], y: [-max * 0.12, max * 1.1], pasos: [1e9, paso], nombres: false, figuras, descripcion });
  }

  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const MEDLINE = (ruta, nombre) => ({ nombre: `MedlinePlus en español: ${nombre}`, url: `https://medlineplus.gov/spanish/${ruta}` });
  const OMS = (ficha, nombre) => ({ nombre: `Organización Mundial de la Salud: ${nombre}`, url: `https://www.who.int/es/news-room/fact-sheets/detail/${ficha}` });
  const READY = (ruta, nombre) => ({ nombre: `Ready.gov en español: ${nombre}`, url: `https://www.ready.gov/es/${ruta}` });
  const EPAES = { nombre: 'Agencia de Protección Ambiental de EE. UU. (EPA): Desinfección de agua potable en situaciones de emergencia', url: 'https://espanol.epa.gov/espanol/desinfeccion-de-agua-potable-en-situaciones-de-emergencia' };
  const EPA = (ruta, nombre) => ({ nombre: `Agencia de Protección Ambiental de EE. UU. (EPA): ${nombre} (en inglés)`, url: `https://www.epa.gov/${ruta}` });
  const OPS = { nombre: 'Organización Panamericana de la Salud: Almacenamiento domiciliario/familiar de agua en emergencias (nota técnica 8, PDF)', url: 'https://paho.org/sites/default/files/2019-12/Nota-tecnica-sobre-agua-saneamiento-higiene-08.pdf' };
  const ONU = { nombre: 'Naciones Unidas: Agua', url: 'https://www.un.org/es/global-issues/water' };
  const SODIS = { nombre: 'SODIS (Eawag, Instituto Federal Suizo de Ciencia y Tecnología Acuáticas): How does it work? (en inglés)', url: 'https://www.sodis.ch/methode/anwendung/index_EN.html' };
  const TWDB = { nombre: 'Junta de Desarrollo Hídrico de Texas (TWDB): Rainwater Harvesting FAQ (en inglés)', url: 'https://www.twdb.texas.gov/innovativewater/rainwater/faq.asp' };
  const CSU = { nombre: 'Extensión de la Universidad Estatal de Colorado: Guide to Treating Water in the Backcountry (en inglés)', url: 'https://extension.colostate.edu/resource/guide-to-treating-water-in-the-backcountry' };

  // ------------------------------------------------------------------
  const CONSUMOS = barras({
    etiquetas: ['beber', 'sobrevivir', 'derecho ONU', 'EE. UU.'], valores: [3, 15, 100, 310], max: 310, paso: 1e9,
    descripcion: 'Gráfica de barras de litros por persona al día. Beber: 3. Sobrevivir en una emergencia: 15, el valor alto de la OPS. Derecho al agua según la ONU: hasta 100. Promedio en las casas de Estados Unidos: 310.',
  });

  L('Cuánta agua necesitas', {
    objetivo: 'Calcular cuánta agua usa cada persona de tu casa al día a partir del recibo o del medidor, y compararla con lo que se necesita para sobrevivir y para vivir con dignidad.',
    explicacion: `
      <p>Saca el último recibo del agua de tu casa. En algún lugar dice cuánta agua se usó en el mes, y casi nunca viene en litros, sino en metros cúbicos. ¿Es mucho o es poco? Para saberlo, primero hay que traducir ese número a algo que puedas imaginar.</p>
      <h3>Del metro cúbico al litro</h3>
      <p>Imagina una caja de un metro de largo, un metro de ancho y un metro de alto. Lo que cabe dentro es un <strong>metro cúbico</strong>, que se escribe 1 m³. Como viste en Matemáticas, en Cuerpos geométricos y volumen, en esa caja caben 1 000 litros, es decir, unos 50 garrafones de 20 litros. Por eso, para pasar de metros cúbicos a litros basta con multiplicar por 1 000: 12 m³ son 12 000 litros.</p>
      <h3>Litros por persona al día</h3>
      <p>Un total del mes no se puede comparar entre casas, porque no es lo mismo una persona que viva sola que una familia de seis. Por eso se usa el <strong>consumo por persona</strong>: los litros que usa cada persona en un día. Se calcula así:</p>
      <p><strong>consumo por persona = litros del periodo ÷ días ÷ personas</strong></p>
      <p>Es decir, repartes toda el agua entre los días que duró el periodo y luego entre las personas de la casa. Si en 30 días tu casa de 4 personas usó 12 000 litros, cada persona usó 12 000 ÷ 30 ÷ 4 = 100 litros al día.</p>
      <p>Si no tienes recibo, puedes leer el medidor. Anota el número un día a la misma hora, vuelve a leerlo una semana después y resta. La diferencia es lo que se usó en esos 7 días.</p>
      <h3>Tres niveles de necesidad</h3>
      ${CONSUMOS}
      <p>No toda el agua es igual de urgente. La Organización Panamericana de la Salud (OPS), basada en las normas internacionales de ayuda humanitaria, separa así lo mínimo para sobrevivir en una emergencia:</p>
      <ul>
        <li>Para beber y para la comida, de 2.5 a 3 litros por persona al día, según el clima y el cuerpo de cada quien.</li>
        <li>Para la higiene básica, de 2 a 6 litros.</li>
        <li>Para cocinar, de 3 a 6 litros.</li>
      </ul>
      <p>En total, de 7.5 a 15 litros por persona al día. Es lo que permite pasar unos días difíciles sin enfermarse, pero no es una forma digna de vivir siempre. Para una reserva de emergencia, en "Necesidades básicas" viste la recomendación de Ready.gov de unos 4 litros por persona al día, que cubre lo más urgente.</p>
      <p>Para la vida normal, la ONU reconoce el derecho al agua: cada persona debería tener de 50 a 100 litros al día para su uso personal y doméstico, que no cueste más del 3% de los ingresos de la casa y que la fuente esté a menos de 1 000 metros, o a menos de 30 minutos de ir y volver. En el otro extremo, según la Agencia de Protección Ambiental de Estados Unidos (EPA), en ese país cada persona usa en promedio unos 82 galones al día en casa, más o menos 310 litros.</p>
      <h3>Lo que cambia la cuenta</h3>
      <p>Estos números son un punto de partida, no una regla fija. Ready.gov explica que la necesidad cambia con la edad, la salud, la actividad y el clima: con mucho calor puede llegar al doble. Los niños, las personas que están amamantando y las personas enfermas también pueden necesitar más. Por eso, cuando calcules una reserva, usa el valor alto de cada rango.</p>
      <h3>Para qué sirve saber tu número</h3>
      <p>Conocer tu consumo te ayuda en tres cosas. Primero, a planear: sabes cuánta agua guardar o captar. Segundo, a detectar problemas: si un mes el número sube mucho sin razón, puede haber una fuga, como verás en "Ahorrar y reutilizar agua en casa". Y tercero, a ahorrar dinero, porque el agua que no se usa no se paga.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir metros cúbicos con litros. Si tu recibo dice 15 y piensas que son 15 litros, creerás que tu casa casi no usa agua. Son 15 m³, es decir, 15 000 litros.</p>`,
    ejemplo: `
      <p>Un recibo de dos meses, de 60 días, marca 18 m³. En la casa viven 4 personas. ¿Cuántos litros usa cada persona al día? ¿Está dentro del rango de la ONU?</p>
      <ol class="pasos-ej">
        <li>Primero pasa a litros, porque los metros cúbicos son difíciles de imaginar: 18 × 1 000 = 18 000 litros.</li>
        <li>Reparte entre los días del periodo para saber cuánto usa la casa en un día: 18 000 ÷ 60 = 300 litros al día.</li>
        <li>Reparte entre las personas: 300 ÷ 4 = 75 litros por persona al día.</li>
        <li>Compara: 75 está entre 50 y 100, así que está dentro del rango de la ONU.</li>
        <li>Comprueba al revés: 75 litros × 4 personas × 60 días = 18 000 litros, que son los 18 m³ del recibo.</li>
      </ol>
      <p>Resultado: <span class="resultado">75 litros por persona al día</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar dividir entre los días. Un recibo puede ser de uno o de dos meses; revisa siempre las fechas que cubre.</p>`,
    vidaReal: `
      <p>Saber cuánta agua usas tiene beneficios muy concretos:</p>
      <ul>
        <li>Puedes revisar si tu recibo tiene sentido o si te están cobrando de más.</li>
        <li>Si el gasto sube de golpe, sabes que algo anda mal en tu casa.</li>
        <li>Te ayuda a decidir cuánta agua guardar para una emergencia.</li>
        <li>Si quieres juntar agua de lluvia, sabes cuánta te hace falta y qué tan grande debe ser el tanque.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un recibo de 30 días marca 15 m³. En la casa viven 5 personas. ¿Cuántos litros usa cada persona al día?</p>', respuesta: 15 * 1000 / 30 / 5,
        pista: '<p>Pasa los metros cúbicos a litros y luego reparte entre los días y entre las personas.</p>',
        solucion: '<p>15 m³ son 15 000 litros. Entre 30 días dan 500 litros al día, y entre 5 personas, <strong>100 litros</strong> por persona.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos litros son 3.5 m³?</p>', respuesta: 3.5 * 1000,
        pista: '<p>En un metro cúbico caben 1 000 litros.</p>',
        solucion: '<p>3.5 × 1 000 = <strong>3 500 litros</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Según la ONU, el agua no debería costar más del 3% de los ingresos de la casa. Si en tu casa entran $8 000 al mes, ¿cuál es el máximo que debería costar el agua al mes?</p>', respuesta: 8000 * 3 / 100,
        pista: '<p>Saca el 1% de 8 000 y multiplícalo por 3.</p>',
        solucion: '<p>El 1% de 8 000 es 80, así que el 3% es 3 × 80 = <strong>$240</strong> al mes.</p>' },
      { tipo: 'numero', enunciado: '<p>Quieres guardar agua para que tu familia de 4 personas sobreviva 7 días, usando el valor alto de la OPS: 15 litros por persona al día. ¿Cuántos litros necesitas?</p>', respuesta: 4 * 15 * 7,
        pista: '<p>Calcula primero cuánto usa la familia en un día.</p>',
        solucion: '<p>En un día, 4 × 15 = 60 litros; en 7 días, 60 × 7 = <strong>420 litros</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Hace mucho calor. Según Ready.gov, ¿qué pasa con el agua que necesita una persona?</p>',
        opciones: ['Sigue siendo la misma', 'Puede llegar al doble', 'Baja a la mitad'], correcta: 1,
        pista: '<p>Piensa en cuánto sudas en un día de calor.</p>',
        solucion: '<p><strong>Puede llegar al doble.</strong> Con el calor pierdes más agua al sudar, y hay que reponerla.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas casas cumple con el derecho al agua que reconoce la ONU?</p>',
        opciones: ['Cada persona tiene 30 litros al día de un pozo que está a 2 km', 'Cada persona tiene 80 litros al día, pero el agua cuesta el 10% de los ingresos', 'Cada persona tiene 70 litros al día, la fuente está a 500 m y cuesta el 2% de los ingresos'], correcta: 2,
        pista: '<p>Revisa las tres condiciones: de 50 a 100 litros, menos del 3% de los ingresos y menos de 1 000 m.</p>',
        solucion: '<p><strong>La de 70 litros, a 500 m y con el 2% de los ingresos.</strong> Las otras fallan en la cantidad y la distancia, o en el precio.</p>' },
    ],
    fuentes: [OPS, ONU, READY('agua', 'Agua'), EPA('watersense/statistics-and-facts', 'WaterSense, Statistics and Facts'), WIKI('Derecho_al_agua', 'Derecho al agua')],
  });

  // ------------------------------------------------------------------
  const TERRENO = diagrama([0, 16], [1.6, 9.4], [
    { tipo: 'poligono', abierto: true, puntos: [[0, 6], [3.6, 6], [4, 5.1], [5.6, 5.1], [6, 6], [10, 6], [12, 8], [16, 8.5]] },
    { tipo: 'poligono', puntos: [[3.85, 5.5], [4, 5.1], [5.6, 5.1], [5.75, 5.5]], relleno: true },
    txt(4.8, 6.6, 'río'),
    { tipo: 'linea', desde: [0, 4.3], hasta: [9, 4.8], punteada: true },
    { tipo: 'linea', desde: [9, 4.8], hasta: [11, 7], punteada: true },
    txt(6.4, 3.6, 'acuífero: agua bajo tierra'),
    { tipo: 'linea', desde: [1.4, 6.6], hasta: [1.4, 3.4] }, { tipo: 'linea', desde: [2.2, 6.6], hasta: [2.2, 3.4] },
    txt(1.8, 7.2, 'pozo'),
    txt(13.6, 6.2, 'manantial'), ...flecha([12.6, 6.3], [11.15, 6.95], 0, 1.3),
  ], 'Corte del terreno. A la izquierda, un pozo: dos líneas verticales que bajan desde la superficie hasta debajo de una línea punteada. La línea punteada marca el nivel del agua subterránea; debajo de ella está el acuífero, rotulado "acuífero: agua bajo tierra". En una hondonada de la superficie corre un río. A la derecha el terreno sube en una ladera, y donde la línea punteada toca la ladera sale el agua: está rotulado "manantial".');

  L('Fuentes de agua: lluvia, pozos, ríos y manantiales', {
    objetivo: 'Distinguir el agua superficial de la subterránea, conocer las ventajas y los riesgos de la lluvia, los ríos, los manantiales y los pozos, y saber qué hace más segura una fuente.',
    explicacion: `
      <p>¿De dónde sale el agua de tu llave? Antes de llegar a tu casa por un tubo, estuvo en algún lugar: en un río, en una presa o muy por debajo del suelo. Saber de dónde viene te ayuda a entender qué riesgos tiene y qué hacer si un día tienes que conseguirla tú.</p>
      <h3>Agua que se ve y agua escondida</h3>
      <p>En Ciencias naturales, en el ciclo del agua, viste que la lluvia corre por el suelo o se mete en la tierra. Por eso hay dos grandes tipos de agua dulce. El <strong>agua superficial</strong> es la que está a la vista: ríos, arroyos, lagos y presas. El <strong>agua subterránea</strong> es la que se filtró en la tierra y quedó guardada debajo, entre la arena, la grava y las grietas de las rocas.</p>
      <p>Una capa de suelo o de roca empapada de agua, de donde se puede sacar, se llama <strong>acuífero</strong>. No es un lago escondido. Se parece más a una esponja enorme: el agua llena los huecos pequeños entre los granos.</p>
      ${TERRENO}
      <h3>Lluvia</h3>
      <p>El agua de lluvia cae bastante limpia, pero al correr por el techo arrastra polvo, hojas y excremento de pájaros. Su gran ventaja es que cae justo donde vives. Su desventaja es que no llueve todo el año. En "Captar agua de lluvia" verás cómo juntarla y guardarla.</p>
      <h3>Ríos, arroyos y lagos</h3>
      <p>El agua superficial es fácil de encontrar y de sacar, pero es la más expuesta. Todo lo que se tira río arriba, de un pueblo, de un corral o de un campo de cultivo, viaja con la corriente. Por eso el agua de río siempre se debe tratar antes de beberla, aunque se vea clara. Según la Organización Mundial de la Salud, en 2022 unos 115 millones de personas todavía bebían agua superficial sin tratar.</p>
      <h3>Manantiales</h3>
      <p>Un manantial es un lugar donde el agua subterránea sale sola a la superficie, muchas veces en una ladera, como en el dibujo. Como el agua pasó un tiempo filtrándose por la tierra, suele estar más limpia que la de un río. Pero el punto donde brota se ensucia con facilidad si llegan animales, basura o el agua que escurre cuando llueve. Un manantial está protegido cuando se cubre con una caja o un muro que impide que entre lo de afuera, y el agua sale por un tubo.</p>
      <h3>Pozos</h3>
      <p>Un pozo es un agujero que llega hasta el acuífero para sacar el agua subterránea. Igual que con el manantial, el pozo debe estar protegido: con tapa, con un borde alto alrededor y sin charcos junto a la boca, para que no caiga nada ni escurra agua sucia desde arriba. La OMS calcula que en 2022 unos 296 millones de personas usaban pozos o manantiales sin proteger.</p>
      <p>Lo que más amenaza a un pozo es lo que hay cerca. La EPA, la agencia ambiental de Estados Unidos, menciona las fosas sépticas, los fertilizantes, el estiércol y los desechos de animales. Por eso conviene que el pozo quede lo más lejos posible de letrinas, corrales y basureros, y nunca más abajo que ellos en una pendiente, porque el agua sucia escurre cuesta abajo.</p>
      <p>La EPA recomienda analizar un pozo propio una vez al año, buscando bacterias que vienen de las heces, nitratos (que llegan de fertilizantes y estiércol), sólidos disueltos y pH, y también cuando algo cambia cerca: una inundación, un nuevo corral o un sabor raro. En muchos lugares la oficina de salud o la de agua del municipio hacen estos análisis.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que el agua de manantial o de pozo es pura por salir de la tierra. Es más limpia que la de un río, pero puede contaminarse en la boca del pozo o desde una letrina cercana. Ante la duda, trátala también antes de beberla.</p>`,
    ejemplo: `
      <p>Una familia tiene tres opciones: un río a 200 m, un manantial protegido a 900 m y un pozo sin tapa junto al corral. ¿Cuál conviene, y cuánto tardarían en ir y volver al manantial caminando a unos 4 km por hora?</p>
      <ol class="pasos-ej">
        <li>Primero descarta lo más riesgoso. El pozo sin tapa junto al corral puede recibir estiércol, y el río recibe todo lo que se tira río arriba.</li>
        <li>El manantial está protegido, así que es la mejor fuente, aunque quede más lejos.</li>
        <li>Calcula el camino de ida y vuelta: 900 m × 2 = 1 800 m, que son 1.8 km.</li>
        <li>Divide la distancia entre la velocidad: 1.8 ÷ 4 = 0.45 horas. Una hora tiene 60 minutos, así que 0.45 × 60 = 27 minutos.</li>
        <li>Comprueba: a 4 km por hora recorres 1 km en 15 minutos, y 1.8 km en 1.8 × 15 = 27 minutos.</li>
      </ol>
      <p>Resultado: <span class="resultado">el manantial, a 27 minutos de ida y vuelta</span>, menos de los 30 minutos que pide la ONU.</p>
      <p class="nota"><strong>Error común:</strong> elegir la fuente más cercana sin pensar en lo que la rodea.</p>`,
    vidaReal: `
      <p>Saber de dónde viene el agua te sirve en muchas situaciones:</p>
      <ul>
        <li>Si vas de campamento, sabes qué agua conviene recoger y cuál evitar.</li>
        <li>Si en tu comunidad hay un pozo, sabes cómo cuidarlo.</li>
        <li>Si se corta el servicio, sabes qué otras fuentes hay cerca y cuáles son más seguras.</li>
        <li>Entiendes por qué no se debe tirar basura ni desechos cerca de un río.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas fuentes es de agua subterránea?</p>',
        opciones: ['Un río', 'Un pozo', 'Un lago'], correcta: 1,
        pista: '<p>Busca la que saca agua de debajo del suelo.</p>',
        solucion: '<p><strong>Un pozo</strong>, porque llega hasta el acuífero. El río y el lago son agua superficial.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos pozos corre más riesgo de contaminarse?</p>',
        opciones: ['Un pozo con tapa, lejos de corrales y analizado cada año', 'Un pozo con tapa en lo alto de un terreno', 'Un pozo sin tapa, a pocos metros de una fosa séptica y más abajo que ella'], correcta: 2,
        pista: '<p>Piensa en qué puede caer dentro y hacia dónde escurre el agua sucia.</p>',
        solucion: '<p><strong>El pozo sin tapa, cerca de la fosa séptica y más abajo.</strong> Le puede caer suciedad por arriba, y el agua de la fosa escurre hacia él.</p>' },
      { tipo: 'numero', enunciado: '<p>Una fuente está a 1.2 km de tu casa. Si caminas a 4 km por hora, ¿cuántos minutos tardas en ir y volver?</p>', respuesta: 1.2 * 2 / 4 * 60,
        pista: '<p>Calcula la distancia de ida y vuelta, divídela entre 4 y pasa las horas a minutos.</p>',
        solucion: '<p>Ida y vuelta son 2.4 km. 2.4 ÷ 4 = 0.6 horas, y 0.6 × 60 = <strong>36 minutos</strong>. Pasa de los 30 minutos que pide la ONU.</p>' },
      { tipo: 'numero', enunciado: '<p>Según la OMS, en 2022 unos 296 millones de personas usaban pozos o manantiales sin proteger y 115 millones bebían agua superficial sin tratar. ¿Cuántos millones de personas son en total?</p>', respuesta: 296 + 115,
        pista: '<p>Suma los dos grupos.</p>',
        solucion: '<p>296 + 115 = <strong>411 millones</strong> de personas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la capa de suelo o de roca empapada de agua de donde se saca el agua de un pozo?</p>',
        respuestas: ['acuifero', 'el acuifero', 'un acuifero', 'acuiferos'],
        pista: '<p>Se parece a una esponja enorme bajo tierra.</p>',
        solucion: '<p>Un <strong>acuífero</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el agua de un río se debe tratar aunque se vea clara?</p>',
        opciones: ['Porque recibe lo que se tira río arriba, como heces de personas y animales', 'Porque el agua de río siempre tiene sal', 'Porque el agua que corre se calienta demasiado'], correcta: 0,
        pista: '<p>Piensa en todo lo que hay a lo largo del río antes de llegar a ti.</p>',
        solucion: '<p><strong>Porque recibe lo que se tira río arriba.</strong> Los microbios de las heces no se ven, aunque el agua parezca limpia.</p>' },
    ],
    fuentes: [
      MEDLINE('drinkingwater.html', 'Agua potable'),
      OMS('drinking-water', 'Agua para consumo humano'),
      EPA('privatewells/protect-your-homes-water', "Protect Your Home's Water"),
      EPA('privatewells/potential-well-water-contaminants-and-their-impacts', 'Potential Well Water Contaminants and Their Impacts'),
      WIKI('Manantial', 'Manantial'),
      WIKI('Pozo_de_agua', 'Pozo de agua'),
    ],
  });

  // ------------------------------------------------------------------
  L('Cómo saber si el agua puede estar contaminada', {
    objetivo: 'Reconocer las señales y las situaciones que indican que el agua puede estar contaminada, saber qué no se puede ver a simple vista y cuándo buscar atención médica.',
    explicacion: `
      <p>Imagina que vas por el campo con mucha sed y encuentras un arroyo de agua transparente y fresca. Se ve limpísima. ¿La tomarías? Muchas personas lo harían, y muchas se enferman así. El problema es que lo más peligroso del agua casi nunca se ve.</p>
      <h3>Lo que no se ve</h3>
      <p>En Ciencias naturales viste que las bacterias son seres vivos tan pequeños que solo se ven con microscopio. En el agua también puede haber virus, todavía más pequeños, y parásitos. Muchos de ellos llegan al agua con las heces de personas o de animales. Cuando eso pasa se habla de <strong>contaminación fecal</strong>.</p>
      <p>Según la Organización Mundial de la Salud, la contaminación del agua por heces es el mayor riesgo para la salud que tiene el agua de beber. En 2022, al menos 1 700 millones de personas bebían de fuentes contaminadas con heces. Esta agua puede transmitir diarreas, cólera, disentería, fiebre tifoidea y poliomielitis, y la OMS calcula que causa unas 505 000 muertes al año por diarrea.</p>
      <p>Además de los microbios, el agua puede tener químicos disueltos, como metales que vienen de las rocas o de tuberías viejas, o restos de fertilizantes. Tampoco se ven, y muchas veces no cambian el sabor. Solo un análisis de laboratorio los detecta. Si vives cerca de minas, fábricas o campos con muchos fertilizantes, pregunta a la oficina de salud o de agua de tu zona si el agua se ha analizado.</p>
      <h3>Lo que sí puedes ver, oler y probar</h3>
      <p>Hay señales que te avisan que el agua está muy mal. La EPA, la agencia ambiental de Estados Unidos, indica no usar agua que tenga cosas flotando, color oscuro u olor dudoso, ni siquiera tratándola. Esa agua se desecha y se busca otra fuente.</p>
      <p>Otra señal es la <strong>turbidez</strong>: qué tan turbia está el agua, o sea, cuánta tierra o partículas lleva suspendidas. El agua turbia no siempre es peligrosa por sí misma, pero esas partículas pueden esconder microbios y hacen que los tratamientos funcionen peor. Una prueba sencilla, que usa el método de desinfección solar: llena una botella transparente y ponla sobre el titular de un periódico. Si no puedes leer las letras a través del agua, está demasiado turbia y hay que dejarla asentar y filtrarla antes de tratarla.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Lo que puedes notar</th><th>Lo que no puedes notar</th></tr>
        <tr><td>Cosas flotando, color oscuro, mal olor, agua turbia</td><td>Bacterias, virus, parásitos y la mayoría de los químicos disueltos</td></tr>
      </table></div>
      <h3>Situaciones de riesgo</h3>
      <p>Como lo más peligroso no se ve, conviene fijarse en el lugar y en lo que acaba de pasar. Desconfía del agua en estos casos:</p>
      <ul>
        <li>Después de una inundación, porque el agua de la calle y de los drenajes pudo meterse en pozos, tanques y tuberías.</li>
        <li>Cuando la fuente está cerca de letrinas, fosas sépticas, corrales o basureros.</li>
        <li>Cuando se rompe una tubería o se corta el servicio por varios días.</li>
        <li>Cuando el agua viene de un río, un lago o un manantial sin proteger.</li>
        <li>Cuando el recipiente donde se guarda estuvo destapado o se sacó agua con las manos.</li>
      </ul>
      <p>En cualquiera de estos casos, trata el agua antes de beberla, de cocinar, de lavarte los dientes o de hacer hielo, como verás en "Purificar agua: hervir, cloro y desinfección solar".</p>
      <h3>Cuándo buscar atención médica</h3>
      <p>Si alguien bebió agua dudosa y le da diarrea, lo más importante es que no se deshidrate; las señales las viste en "Necesidades básicas". Según MedlinePlus, un adulto debe buscar atención médica si tiene señales de deshidratación, diarrea por más de dos días, dolor fuerte en el abdomen, fiebre de 38.8 °C o más, o heces con sangre, con pus o negras. En los niños, si la diarrea dura más de 24 horas. Si la persona se desmaya, se confunde o tiene convulsiones, llama al número de emergencias. En la unidad Salud y primeros auxilios verás cómo preparar suero oral.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que el agua fría, transparente y sin olor es segura. Los microbios no cambian el color ni el olor del agua.</p>`,
    ejemplo: `
      <p>Después de una inundación en tu colonia, el agua de la llave sale un poco turbia, sin cosas flotando y sin mal olor. ¿Qué haces antes de usarla para beber?</p>
      <ol class="pasos-ej">
        <li>Primero revisa las señales graves. No hay cosas flotando, color oscuro ni olor dudoso, así que no hay que desecharla de inmediato.</li>
        <li>Después piensa en la situación. Hubo una inundación, así que el agua pudo mezclarse con la de los drenajes. Aunque se vea casi limpia, hay que tratarla.</li>
        <li>Como está turbia, primero déjala reposar para que la tierra se vaya al fondo y pásala por un trapo limpio o un filtro de café.</li>
        <li>Luego desinféctala. Si usas cloro, recuerda que con agua turbia la dosis es el doble, como verás en la lección de purificar.</li>
        <li>Comprueba con la prueba del periódico: si ya lees el titular a través de la botella, la turbidez bajó lo suficiente.</li>
      </ol>
      <p>Resultado: <span class="resultado">asentar, filtrar y desinfectar antes de usarla</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar el agua sin tratar porque "ya casi se ve normal".</p>`,
    vidaReal: `
      <p>Saber cuándo desconfiar del agua te protege en muchos momentos:</p>
      <ul>
        <li>En un viaje o una excursión, sabes cuándo hace falta tratar el agua antes de tomarla.</li>
        <li>Después de una tormenta fuerte, sabes que el agua de la llave puede no ser segura.</li>
        <li>Si alguien de tu familia se enferma del estómago, puedes revisar de dónde vino el agua.</li>
        <li>Puedes avisar a tus vecinos si notas algo raro en el agua de la zona.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Encuentras agua cristalina y fresca en un arroyo que pasa junto a un potrero con vacas. ¿Qué es lo correcto?</p>',
        opciones: ['Beberla, porque se ve limpia', 'Tratarla antes de beberla, porque puede tener microbios de las heces de los animales', 'Beberla solo si no huele mal'], correcta: 1,
        pista: '<p>¿Los microbios cambian el color o el olor del agua?</p>',
        solucion: '<p><strong>Tratarla antes de beberla.</strong> Las heces de los animales pueden llevar microbios que no se ven ni se huelen.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la EPA, ¿qué agua no se debe usar ni siquiera tratándola?</p>',
        opciones: ['Agua con cosas flotando, color oscuro u olor dudoso', 'Agua un poco turbia', 'Agua de lluvia recién juntada'], correcta: 0,
        pista: '<p>Busca la que muestra señales graves que se ven y se huelen.</p>',
        solucion: '<p><strong>El agua con cosas flotando, color oscuro u olor dudoso.</strong> El agua un poco turbia y la de lluvia se pueden asentar, filtrar y desinfectar.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama qué tan turbia está el agua por la tierra y las partículas que lleva suspendidas?</p>',
        respuestas: ['turbidez', 'la turbidez', 'turbiedad', 'la turbiedad'],
        pista: '<p>Viene de la palabra "turbia".</p>',
        solucion: '<p>La <strong>turbidez</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos contaminantes no puedes notar a simple vista ni por el olor?</p>',
        opciones: ['Hojas flotando', 'Un color café oscuro', 'Metales disueltos que vienen de tuberías viejas'], correcta: 2,
        pista: '<p>Piensa en lo que solo detecta un análisis de laboratorio.</p>',
        solucion: '<p><strong>Los metales disueltos.</strong> No se ven y muchas veces no cambian el sabor; solo un análisis los detecta.</p>' },
      { tipo: 'numero', enunciado: '<p>La OMS calcula unas 505 000 muertes al año por diarrea causada por agua contaminada. ¿Cuántas son, más o menos, cada día? Redondea al entero.</p>', respuesta: 505000 / 365, tolerancia: 1,
        pista: '<p>Divide entre los 365 días del año.</p>',
        solucion: '<p>505 000 ÷ 365 ≈ <strong>1 384</strong> muertes al día, que el agua segura ayudaría a evitar.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un adulto tiene diarrea después de beber agua de un río. Según MedlinePlus, ¿en cuál de estos casos debe buscar atención médica?</p>',
        opciones: ['Si la diarrea dura más de dos días o hay sangre en las heces', 'Solo si dura más de dos semanas', 'Nunca, la diarrea siempre se quita sola'], correcta: 0,
        pista: '<p>Recuerda la lista de señales de alarma de la explicación.</p>',
        solucion: '<p><strong>Si dura más de dos días o hay sangre en las heces.</strong> También si hay señales de deshidratación, dolor fuerte o fiebre de 38.8 °C o más.</p>' },
    ],
    fuentes: [
      OMS('drinking-water', 'Agua para consumo humano'),
      EPAES,
      MEDLINE('diarrhea.html', 'Diarrea'),
      MEDLINE('ency/article/000982.htm', 'Deshidratación (enciclopedia médica)'),
      READY('agua', 'Agua'),
      SODIS,
      WIKI('Turbidez', 'Turbidez'),
    ],
  });

  // ------------------------------------------------------------------
  const LLUVIA = diagrama([0, 15], [-1.4, 9.6], [
    ...[2.4, 3.8, 5.2, 6.6].map((x) => ({ tipo: 'linea', desde: [x, 9.4], hasta: [x - 0.3, 8.6], punteada: true })),
    txt(0.9, 9.2, 'lluvia'),
    { tipo: 'poligono', puntos: [[0.5, 6], [4, 8.2], [7.5, 6]] },
    caja(1, 0.5, 7, 6),
    txt(4, 6.7, 'techo'),
    { tipo: 'poligono', abierto: true, puntos: [[7.5, 6], [8.3, 6], [8.3, 5.2]] },
    txt(8.6, 6.6, 'canaleta'),
    caja(7.9, 2.6, 8.7, 5.2),
    txt(8.3, -0.3, 'desviador de'), txt(8.3, -0.9, 'primeras aguas'), ...flecha([8.3, 0.1], [8.3, 2.5], 0, 1.4),
    { tipo: 'linea', desde: [8.7, 4.8], hasta: [9.8, 4.8] },
    caja(9.8, 0.5, 13.8, 5.2),
    { tipo: 'linea', desde: [9.6, 5.4], hasta: [14, 5.4] },
    txt(11.8, 3.2, 'tanque'), txt(11.8, 2.6, 'con tapa'),
    { tipo: 'linea', desde: [13.8, 1.2], hasta: [14.5, 1.2] }, txt(14.2, 0.5, 'llave'),
  ], 'Una casa con techo de dos aguas bajo la lluvia. El agua baja del techo a una canaleta. De la canaleta pasa a un tubo vertical rotulado "desviador de primeras aguas" y de ahí, por un tubo corto, a un tanque rotulado "tanque con tapa", que tiene una llave abajo.');

  L('Captar agua de lluvia', {
    objetivo: 'Calcular cuánta agua de lluvia puede juntar un techo y conocer las partes y los cuidados de un sistema para captarla y usarla con seguridad.',
    explicacion: `
      <p>Si alguna vez pusiste una cubeta debajo del chorro de una canaleta durante un aguacero, viste que se llena en pocos minutos. Un techo es una superficie enorme que junta la lluvia y la manda a un solo lugar. Bien aprovechada, puede darte miles de litros al año.</p>
      <h3>¿Cuánta agua cae?</h3>
      <p>La lluvia se mide en milímetros. Que caigan 10 mm de lluvia quiere decir que, si el agua no escurriera ni se evaporara, en el suelo plano se formaría una capa de 10 milímetros de alto. Con eso puedes calcular cuánta agua cae sobre tu techo.</p>
      <p>Piensa en un cuadro de 1 metro por 1 metro, es decir, de 1 m². Si cae 1 mm de lluvia, sobre ese cuadro queda una capa de agua de 1 m × 1 m × 0.001 m = 0.001 m³. Como 1 m³ son 1 000 litros, 0.001 m³ es justo 1 litro. Por eso hay una regla muy cómoda: <strong>1 mm de lluvia sobre 1 m² da 1 litro</strong>.</p>
      <p>La superficie que junta el agua, casi siempre el techo, se llama <strong>área de captación</strong>. Para medirla no importa la inclinación del techo; mides el largo y el ancho de la casa vista desde arriba, porque la lluvia cae de arriba hacia abajo.</p>
      <h3>La fórmula</h3>
      <p><strong>litros = área del techo (m²) × lluvia (mm) × aprovechamiento</strong></p>
      <p>Se lee así: multiplicas los metros cuadrados del techo por los milímetros de lluvia, y eso te da los litros que caen. Luego lo multiplicas por el aprovechamiento, que es la parte que de verdad llega al tanque. Nunca llega toda: algo se evapora, algo salpica fuera de la canaleta y algo se pierde en fugas o se desvía a propósito al principio de cada lluvia. Según la Junta de Desarrollo Hídrico de Texas, quienes instalan estos sistemas calculan que se aprovecha del 75 al 85% del agua, es decir, que multiplican por 0.75 a 0.85.</p>
      <p>Para saber cuánta lluvia cae al año donde vives, busca el promedio anual en el servicio meteorológico de tu país. Fíjate también en qué meses llueve, porque el tanque debe guardar agua para los meses secos.</p>
      <h3>Las partes de un sistema</h3>
      ${LLUVIA}
      <ul>
        <li>El techo, que debe estar limpio y sin ramas encima.</li>
        <li>Las canaletas, con una malla que detenga las hojas.</li>
        <li>El <strong>desviador de primeras aguas</strong>, un tubo que se llena con el agua de los primeros minutos de lluvia, que es la más sucia porque lava el polvo y el excremento de pájaros del techo. Cuando se llena, el agua más limpia sigue hacia el tanque. Después de cada lluvia se vacía.</li>
        <li>El tanque, siempre con tapa y con las entradas cubiertas con malla, para que no entren luz, basura ni mosquitos. La OMS recuerda que los recipientes de agua destapados son criaderos del mosquito que transmite el dengue.</li>
        <li>Una llave, para sacar el agua sin meter cubetas ni manos.</li>
      </ul>
      <h3>¿Se puede beber?</h3>
      <p>Sin tratar, el agua de lluvia sirve muy bien para regar, lavar ropa y pisos, y descargar el inodoro. Para beber o cocinar, primero hay que desinfectarla. Y como desinfectar no quita los químicos que el agua pudo recoger en el techo, si tienes dudas sobre el material de tu techo, usa esa agua solo para regar y limpiar. La Junta de Desarrollo Hídrico de Texas explica que, al caer y al pasar por el techo, la lluvia puede recoger microbios y otras sustancias. En "Purificar agua" verás cómo hacerlo, y en "Almacenar agua de forma segura", cómo cuidar el tanque.</p>
      <p class="nota"><strong>Trampa común:</strong> medir el techo por su lado inclinado. La lluvia cae vertical, así que solo cuenta el área vista desde arriba.</p>`,
    ejemplo: `
      <p>Una casa mide 8 m por 6 m vista desde arriba. Donde está, caen 700 mm de lluvia al año. Con un aprovechamiento de 0.8, ¿cuántos litros puede juntar en un año?</p>
      <ol class="pasos-ej">
        <li>Primero calcula el área de captación, porque es la superficie que junta la lluvia: 8 × 6 = 48 m².</li>
        <li>Multiplica por la lluvia, porque cada milímetro sobre cada metro cuadrado da un litro: 48 × 700 = 33 600 litros. Esa es el agua que cae sobre el techo.</li>
        <li>Multiplica por el aprovechamiento, porque no toda llega al tanque: 33 600 × 0.8 = 26 880 litros.</li>
        <li>Comprueba con lo que se pierde: el 20% de 33 600 es 6 720, y 33 600 − 6 720 = 26 880.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 26 880 litros al año</span>, suficiente para regar un huerto pequeño en temporada seca o para descargar el inodoro muchos meses.</p>
      <p class="nota"><strong>Error común:</strong> olvidar el aprovechamiento y planear con toda el agua que cae. El tanque nunca recibe el 100%.</p>`,
    vidaReal: `
      <p>Juntar la lluvia es una de las formas más sencillas de tener agua propia:</p>
      <ul>
        <li>Puedes regar tus plantas sin pagar por el agua.</li>
        <li>En temporada de lluvias, ahorras agua de la red para el inodoro y la limpieza.</li>
        <li>Si se corta el servicio, tienes una reserva cerca.</li>
        <li>En el campo, puede ser la fuente principal de agua de una casa.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un techo de 40 m² recibe una tormenta de 10 mm. Sin contar las pérdidas, ¿cuántos litros caen sobre él?</p>', respuesta: 40 * 10,
        pista: '<p>Recuerda: 1 mm sobre 1 m² da 1 litro.</p>',
        solucion: '<p>40 × 10 = <strong>400 litros</strong> en una sola tormenta.</p>' },
      { tipo: 'numero', enunciado: '<p>Un techo de 60 m² recibe 500 mm de lluvia al año. Con un aprovechamiento de 0.8, ¿cuántos litros llegan al tanque en un año?</p>', respuesta: 60 * 500 * 0.8,
        pista: '<p>Multiplica el área por la lluvia y luego por 0.8.</p>',
        solucion: '<p>60 × 500 = 30 000 litros caen, y 30 000 × 0.8 = <strong>24 000 litros</strong> llegan al tanque.</p>' },
      { tipo: 'numero', enunciado: '<p>Tienes un tanque de 1 100 litros y un techo de 50 m² con aprovechamiento de 0.8. ¿Cuántos milímetros de lluvia hacen falta para llenarlo?</p>', respuesta: 1100 / (50 * 0.8),
        pista: '<p>Calcula cuántos litros llegan al tanque por cada milímetro de lluvia y divide 1 100 entre eso.</p>',
        solucion: '<p>Por cada milímetro llegan 50 × 0.8 = 40 litros. Entonces 1 100 ÷ 40 = <strong>27.5 mm</strong>, una sola lluvia fuerte.</p>' },
      { tipo: 'numero', enunciado: '<p>Usas 40 litros al día de agua de lluvia para regar y para el inodoro. Si tu tanque tiene 2 000 litros, ¿para cuántos días alcanza?</p>', respuesta: 2000 / 40,
        pista: '<p>Divide lo que cabe en el tanque entre lo que usas cada día.</p>',
        solucion: '<p>2 000 ÷ 40 = <strong>50 días</strong>, casi dos meses.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve el desviador de primeras aguas?</p>',
        opciones: ['Para aumentar la cantidad de lluvia que cae', 'Para hacer que el agua sea segura para beber', 'Para separar el agua más sucia de los primeros minutos de lluvia'], correcta: 2,
        pista: '<p>Piensa en qué arrastra la lluvia al empezar a caer sobre un techo seco.</p>',
        solucion: '<p><strong>Para separar el agua más sucia del principio</strong>, la que lava el polvo y el excremento de pájaros. No vuelve el agua potable; para beberla todavía hay que desinfectarla.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué puedes usar el agua de lluvia sin tratarla?</p>',
        opciones: ['Para beber', 'Para regar y descargar el inodoro', 'Para preparar la leche de un bebé'], correcta: 1,
        pista: '<p>Sin desinfectar, solo sirve para usos donde no te la tomas.</p>',
        solucion: '<p><strong>Para regar y descargar el inodoro.</strong> Para beber o cocinar, primero hay que desinfectarla.</p>' },
    ],
    fuentes: [
      TWDB,
      OMS('dengue-and-severe-dengue', 'Dengue y dengue grave'),
      WIKI('Captaci%C3%B3n_de_agua_de_lluvia', 'Captación de agua de lluvia'),
    ],
  });

  // ------------------------------------------------------------------
  L('Purificar agua: hervir, cloro y desinfección solar', {
    objetivo: 'Desinfectar agua de forma segura hirviéndola, con cloro o con la luz del sol, usando las cantidades y los tiempos de fuentes oficiales, y saber qué no quita ninguno de estos métodos.',
    explicacion: `
      <p>Cuando hierves agua para el café, sin pensarlo estás haciendo algo que salva millones de vidas: matar los microbios. En las lecciones anteriores viste que el agua puede tener microbios invisibles. Ahora verás tres formas de acabar con ellos en casa.</p>
      <p><strong>Desinfectar</strong> el agua es matar o inactivar los microbios que causan enfermedades. Ojo: desinfectar no es limpiar. El agua desinfectada puede seguir teniendo tierra o químicos; lo que ya no tiene son microbios vivos que te enfermen.</p>
      <h3>Antes de empezar: agua clara</h3>
      <p>Los tres métodos funcionan mejor con agua clara, porque la tierra protege a los microbios. Por eso, si el agua está turbia, la EPA recomienda primero dejarla reposar para que la tierra se vaya al fondo y luego pasarla por un paño limpio, una servilleta de papel o un filtro de café.</p>
      <h3>Hervir</h3>
      <p>El calor mata a los microbios, y Ready.gov dice que hervir es el método más seguro. La EPA indica dejar que el agua hierva con burbujas grandes y constantes por lo menos 1 minuto. En lugares a más de 1 000 metros sobre el nivel del mar, hay que hervirla 3 minutos, porque en las alturas el agua hierve a menos temperatura. Después, deja que se enfríe tapada. Si te sabe "plana", pásala varias veces de un recipiente limpio a otro para que le entre aire.</p>
      <h3>Cloro</h3>
      <p>Si no puedes hervir, puedes usar cloro de uso doméstico, al que también se le llama lejía. Debe ser cloro sin aroma, que en la etiqueta diga que sirve para desinfectar. No uses cloro con perfume, del que es para ropa de color ni el que trae otros limpiadores. Estas son las cantidades de la EPA:</p>
      <ul>
        <li>Con cloro al 6%: 2 gotas por cada litro de agua, u 8 gotas por galón.</li>
        <li>Con cloro al 8.25%: 2 gotas por litro, o 6 gotas por galón.</li>
        <li>Si el agua está turbia, tiene color o está muy fría, usa el doble.</li>
      </ul>
      <p>Después, revuelve y deja reposar 30 minutos, porque el cloro necesita tiempo para actuar. El agua debe quedar con un olor suave a cloro, y esa es la señal de que alcanzó. Si no huele, repite la dosis y espera otros 15 minutos antes de usarla.</p>
      <p>Usa un gotero limpio que solo sirva para esto, y guarda el cloro fuera del alcance de los niños. Nunca lo mezcles con otros productos de limpieza: en Química, en "Productos de limpieza: cuáles nunca mezclar", viste que algunas mezclas sueltan gases tóxicos.</p>
      <h3>Desinfección solar</h3>
      <p>La luz del sol también mata microbios. El método <strong>SODIS</strong>, que viene de las siglas en inglés de "desinfección solar", lo desarrolló un instituto suizo de investigación del agua. Según sus instrucciones:</p>
      <ul>
        <li>Usa botellas de plástico PET transparentes, lavadas con jabón, de 3 litros o menos.</li>
        <li>Llénalas con agua clara: si al poner la botella sobre el titular de un periódico no puedes leerlo, primero hay que filtrar el agua.</li>
        <li>Déjalas a pleno sol por lo menos 6 horas.</li>
        <li>Si más de la mitad del cielo está nublado, déjalas 2 días seguidos. En días de lluvia el método no funciona bien.</li>
      </ul>
      <h3>Comparación</h3>
      <div class="tabla-wrap"><table>
        <tr><th>Método</th><th>Tiempo</th><th>Lo bueno</th><th>Lo que hay que cuidar</th></tr>
        <tr><th>Hervir</th><td>1 minuto de hervor (3 a más de 1 000 m)</td><td>Es el más seguro contra los microbios</td><td>Gasta combustible y hay que esperar a que se enfríe</td></tr>
        <tr><th>Cloro</th><td>30 minutos de reposo</td><td>Barato y rápido de preparar</td><td>La dosis exacta y un sabor a cloro</td></tr>
        <tr><th>SODIS</th><td>6 horas de sol, o 2 días nublados</td><td>Gratis, solo necesita sol</td><td>Botellas pequeñas, agua clara y días soleados</td></tr>
      </table></div>
      <h3>Lo que ninguno quita</h3>
      <p>La EPA aclara que hervir o clorar no quita metales, sales ni la mayoría de los químicos. Además, la Extensión de la Universidad Estatal de Colorado explica que un parásito llamado Cryptosporidium resiste al cloro común, mientras que hervir sí lo elimina. Por eso, si puedes elegir, hervir es la mejor opción.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que si un poco de cloro es bueno, mucho es mejor. Usa la dosis de la lista: el exceso no te protege más y le da mal sabor al agua.</p>`,
    ejemplo: `
      <p>Tienes 10 litros de agua turbia de un tanque y cloro al 6%. No puedes hervirla. ¿Cuántas gotas pones y cuánto esperas?</p>
      <ol class="pasos-ej">
        <li>Primero aclara el agua: déjala reposar y pásala por un paño limpio, porque la tierra protege a los microbios.</li>
        <li>Calcula la dosis normal. Son 2 gotas por litro, así que 2 × 10 = 20 gotas.</li>
        <li>Como el agua estaba turbia, la EPA indica usar el doble: 20 × 2 = 40 gotas.</li>
        <li>Revuelve y espera 30 minutos. Después huele el agua: si tiene un olor suave a cloro, ya se puede usar. Si no, repite la dosis y espera 15 minutos más.</li>
        <li>Comprueba con la medida en galones: 10 litros son unos 2.6 galones, y 2.6 × 8 gotas ≈ 21 gotas de dosis normal, casi lo mismo que las 20 que calculaste.</li>
      </ol>
      <p>Resultado: <span class="resultado">40 gotas y 30 minutos de espera</span>.</p>
      <p class="nota"><strong>Error común:</strong> beber el agua en cuanto se agrega el cloro. Sin los 30 minutos de espera, todavía no ha hecho efecto.</p>`,
    vidaReal: `
      <p>Saber hacer el agua segura te protege a ti y a tu familia:</p>
      <ul>
        <li>Si se corta el servicio o hay una inundación, puedes volver bebible el agua que tengas.</li>
        <li>En el campo o de excursión, no dependes de comprar agua embotellada.</li>
        <li>Ahorras dinero y botellas de plástico.</li>
        <li>Puedes enseñarlo a tus vecinos en una emergencia, cuando más falta hace.</li>
        <li>Sabes qué método usar según lo que tengas a la mano: estufa, cloro o sol.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Quieres desinfectar 5 litros de agua clara con cloro al 6%. ¿Cuántas gotas pones?</p>', respuesta: 2 * 5,
        pista: '<p>La dosis de la EPA es de 2 gotas por litro.</p>',
        solucion: '<p>2 × 5 = <strong>10 gotas</strong>, y luego esperas 30 minutos.</p>' },
      { tipo: 'numero', enunciado: '<p>Tienes 3 litros de agua turbia y cloro al 6%. ¿Cuántas gotas pones?</p>', respuesta: 2 * 3 * 2,
        pista: '<p>Calcula la dosis normal y recuerda qué pasa cuando el agua está turbia.</p>',
        solucion: '<p>La dosis normal es 2 × 3 = 6 gotas; como el agua está turbia se duplica: <strong>12 gotas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Pusiste cloro y esperaste 30 minutos, pero el agua no huele a cloro. Repites la dosis como indica la EPA. ¿Cuántos minutos esperaste en total desde la primera dosis hasta poder usarla?</p>', respuesta: 30 + 15,
        pista: '<p>Después de la segunda dosis hay que esperar otros 15 minutos.</p>',
        solucion: '<p>30 + 15 = <strong>45 minutos</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con el método SODIS, ¿cuántos días seguidos deben estar las botellas al sol si más de la mitad del cielo está nublado?</p>', respuesta: 2,
        pista: '<p>Con cielo despejado bastan 6 horas, pero con nubes hace falta más.</p>',
        solucion: '<p><strong>2 días seguidos</strong>. Con lluvia el método no funciona bien.</p>' },
      { tipo: 'opciones', enunciado: '<p>Vives a 2 400 metros sobre el nivel del mar. ¿Cuánto tiempo debe hervir el agua?</p>',
        opciones: ['1 minuto', '3 minutos', '10 segundos'], correcta: 1,
        pista: '<p>La EPA da un tiempo distinto para lugares a más de 1 000 metros.</p>',
        solucion: '<p><strong>3 minutos</strong>, porque en las alturas el agua hierve a menos temperatura.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué no quita del agua ninguno de los tres métodos: hervir, cloro o SODIS?</p>',
        opciones: ['Las bacterias', 'Los virus', 'Los metales y la mayoría de los químicos'], correcta: 2,
        pista: '<p>Los tres métodos atacan a los seres vivos del agua.</p>',
        solucion: '<p><strong>Los metales y la mayoría de los químicos.</strong> Los tres métodos matan microbios, pero no sacan lo que está disuelto.</p>' },
    ],
    fuentes: [EPAES, READY('agua', 'Agua'), SODIS, CSU, WIKI('Desinfecci%C3%B3n_solar_del_agua', 'Desinfección solar del agua')],
  });

  // ------------------------------------------------------------------
  const CAPAS = [['tela', 7.1], ['arena fina', 5.9], ['carbón', 4.7], ['arena gruesa', 3.5], ['grava', 2.3]];
  const FILTRO = diagrama([0, 14], [-0.2, 9.4], [
    caja(2, 1.4, 6.4, 7.7),
    ...[6.5, 5.3, 4.1, 2.9].map((y) => ({ tipo: 'linea', desde: [2, y], hasta: [6.4, y] })),
    ...CAPAS.map(([nombre, y]) => txt(4.2, y - 0.1, nombre)),
    ...flecha([4.2, 9.2], [4.2, 7.9], 0, 1.4), txt(6.3, 8.7, 'agua turbia'),
    { tipo: 'linea', desde: [4.2, 1.4], hasta: [4.2, 0.6] },
    ...flecha([4.2, 0.6], [8, 0.6], 0, 1.4),
    txt(10.7, 1.3, 'después:'), txt(10.7, 0.6, 'hervir o clorar'),
  ], 'Un recipiente con cinco capas. De arriba hacia abajo: tela, arena fina, carbón, arena gruesa y grava. Una flecha rotulada "agua turbia" entra por arriba. Por abajo sale un tubo con una flecha hacia el rótulo "después: hervir o clorar".');

  L('Filtros caseros: qué quitan y qué no', {
    objetivo: 'Entender cómo funciona un filtro, saber qué quitan los filtros caseros y los comerciales, y por qué después de un filtro casero siempre hay que desinfectar el agua.',
    explicacion: `
      <p>Cuando cuelas café, la tela o el papel detienen los granos molidos, pero dejan pasar el líquido con su color y su sabor. Un filtro de agua funciona igual: detiene lo que es más grande que sus huecos y deja pasar todo lo demás. Saber qué tan grandes son esos huecos te dice qué quita un filtro y qué no.</p>
      <h3>¿Qué es un filtro?</h3>
      <p>Un <strong>filtro</strong> es una barrera con huecos por donde pasa el agua: una tela, una capa de arena o una pieza de cerámica. Lo que es más grande que los huecos se queda atrás. Lo que es más pequeño, o lo que está disuelto en el agua, como la sal o el azúcar, pasa de largo.</p>
      <p>Ahora piensa en los tamaños. La tierra y las hojas se ven a simple vista. Las bacterias miden alrededor de una milésima de milímetro, una medida que se llama micra, y muchos parásitos miden unas pocas micras. Los virus son todavía decenas de veces más pequeños que una bacteria. Por eso un filtro que detiene la tierra puede dejar pasar a todos los microbios.</p>
      <h3>Tela, arena y grava</h3>
      <p>Pasar el agua por un paño limpio o un filtro de café es el primer paso que recomienda la EPA cuando el agua está turbia. Un filtro casero de capas, como el del dibujo, hace lo mismo pero mejor: la grava y la arena gruesa detienen lo más grande y la arena fina detiene partículas más pequeñas. El agua sale mucho más clara.</p>
      ${FILTRO}
      <p>Pero más clara no quiere decir segura. Los huecos entre los granos de arena son mucho más grandes que una bacteria, así que la mayoría de los microbios pasan. Por eso este filtro sirve para preparar el agua, no para volverla bebible.</p>
      <h3>El carbón</h3>
      <p>El <strong>carbón activado</strong> es un carbón tratado para que quede lleno de poros diminutos, como una esponja. Por eso tiene muchísima superficie, y en ella se quedan pegadas muchas sustancias. Según la Extensión de la Universidad Estatal de Colorado, mejora el sabor y el olor del agua y quita algunos químicos. No mata microbios.</p>
      <p>Fíjate que el carbón de la parrilla o del fogón no es carbón activado: tiene muchos menos poros y quita mucho menos. Si un filtro casero lleva carbón común, ayuda un poco con el sabor, pero no hay que esperar más. Las briquetas de parrilla pueden traer aditivos, así que no las uses en un filtro.</p>
      <h3>Filtros comerciales</h3>
      <p>Hay filtros de cerámica o de membranas, hechos en fábrica, con huecos mucho más finos. La misma guía de Colorado explica que los filtros con poros lo bastante finos, de fracciones de micra, detienen a los parásitos y a las bacterias. Los virus pasan por casi todos, salvo algunos filtros especiales; contra ellos hay que hervir o clorar. Si compras uno, revisa en la caja qué microbios elimina y cámbialo o límpialo cuando lo indique el fabricante, porque un filtro sucio o gastado deja de funcionar.</p>
      <h3>El orden correcto</h3>
      <p>Por todo esto, el orden es siempre el mismo: primero dejar reposar y filtrar, para que el agua quede clara, y después desinfectar, como viste en "Purificar agua". El filtro ayuda a que la desinfección funcione mejor, pero no la reemplaza.</p>
      <p class="nota"><strong>Trampa común:</strong> beber el agua en cuanto sale clara del filtro casero. Que se vea transparente solo quiere decir que ya no tiene tierra; los microbios siguen ahí.</p>`,
    ejemplo: `
      <p>Tienes agua turbia de un río, un filtro casero que entrega 2 litros cada 10 minutos y una estufa. Necesitas 12 litros para el día. ¿Qué haces y cuánto tardas en filtrar?</p>
      <ol class="pasos-ej">
        <li>Primero deja reposar el agua, para que la tierra más pesada se vaya al fondo y el filtro no se tape tan rápido.</li>
        <li>Calcula cuántas tandas de 2 litros necesitas: 12 ÷ 2 = 6 tandas.</li>
        <li>Cada tanda tarda 10 minutos, así que 6 × 10 = 60 minutos de filtrado.</li>
        <li>Después hierve el agua filtrada al menos 1 minuto (3 minutos si estás a más de 1 000 metros de altura), porque el filtro casero no quita los microbios.</li>
        <li>Comprueba con la velocidad: el filtro da 2 litros en 10 minutos, o sea, 0.2 litros por minuto, y 12 ÷ 0.2 = 60 minutos.</li>
      </ol>
      <p>Resultado: <span class="resultado">una hora de filtrado y después hervir</span>.</p>
      <p class="nota"><strong>Error común:</strong> saltarse el hervor porque el agua ya se ve limpia.</p>`,
    vidaReal: `
      <p>Saber qué hace un filtro te ayuda a no gastar de más ni confiarte:</p>
      <ul>
        <li>Puedes elegir un filtro comercial sabiendo qué buscar en la caja.</li>
        <li>En una emergencia, puedes aclarar agua turbia con tela y arena.</li>
        <li>Entiendes por qué una jarra con filtro mejora el sabor del agua de la llave, pero no vuelve segura el agua de un río.</li>
        <li>Puedes explicar a otros por qué el agua clara no siempre es segura.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué quita bien un filtro casero de arena y grava?</p>',
        opciones: ['La tierra y las partículas que enturbian el agua', 'Los virus', 'La sal disuelta'], correcta: 0,
        pista: '<p>Piensa en el tamaño de los huecos entre los granos de arena.</p>',
        solucion: '<p><strong>La tierra y las partículas.</strong> Los virus son muchísimo más pequeños que los huecos, y la sal está disuelta.</p>' },
      { tipo: 'opciones', enunciado: '<p>El agua salió clara de tu filtro casero. ¿Qué sigue antes de beberla?</p>',
        opciones: ['Nada, ya se puede beber', 'Hervirla o clorarla', 'Dejarla al sol 10 minutos'], correcta: 1,
        pista: '<p>¿El filtro casero detiene a los microbios?</p>',
        solucion: '<p><strong>Hervirla o clorarla.</strong> El filtro casero no quita los microbios, y 10 minutos de sol no bastan; SODIS necesita al menos 6 horas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué hace el carbón activado en un filtro?</p>',
        opciones: ['Mata los virus', 'Convierte el agua salada en agua dulce', 'Mejora el sabor y el olor y quita algunos químicos'], correcta: 2,
        pista: '<p>Recuerda que funciona como una esponja donde se pegan sustancias.</p>',
        solucion: '<p><strong>Mejora el sabor y el olor y quita algunos químicos.</strong> No mata microbios ni quita la sal.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu filtro entrega 3 litros cada 15 minutos. ¿Cuántos minutos tardas en filtrar 9 litros?</p>', respuesta: 9 / 3 * 15,
        pista: '<p>Calcula cuántas tandas de 3 litros necesitas.</p>',
        solucion: '<p>Son 9 ÷ 3 = 3 tandas, y 3 × 15 = <strong>45 minutos</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una micra es la milésima parte de un milímetro. ¿Cuántas micras caben en un milímetro?</p>', respuesta: 1000,
        pista: '<p>"Milésima parte" quiere decir que el milímetro se divide en mil partes iguales.</p>',
        solucion: '<p><strong>1 000 micras</strong>. Por eso las bacterias, de alrededor de una micra, no se ven a simple vista.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el carbón tratado para quedar lleno de poros diminutos, que mejora el sabor y el olor del agua?</p>',
        respuestas: ['carbon activado', 'el carbon activado', 'un carbon activado', 'carbon activo'],
        pista: '<p>Son dos palabras: "carbón" y otra que indica que fue tratado.</p>',
        solucion: '<p>El <strong>carbón activado</strong>.</p>' },
    ],
    fuentes: [CSU, EPAES, WIKI('Carb%C3%B3n_activado', 'Carbón activado'), WIKI('Filtro_de_agua', 'Filtro de agua')],
  });

  // ------------------------------------------------------------------
  L('Almacenar agua de forma segura', {
    objetivo: 'Elegir, limpiar y cuidar recipientes para guardar agua sin que se vuelva a contaminar, y saber cada cuánto renovarla.',
    explicacion: `
      <p>Puedes hervir el agua con todo cuidado y, aun así, enfermarte por cómo la guardaste. Basta con dejar el recipiente destapado o meter un vaso sucio para sacarla. El agua limpia se puede volver a ensuciar, y por eso guardarla bien es tan importante como purificarla. Si el agua viene de lluvia, de un pozo o de un río, trátala antes de beberla, aunque la hayas guardado bien. Y si el agua guardada se ve turbia o huele raro, no la bebas.</p>
      <h3>El recipiente correcto</h3>
      <p>Lo más sencillo, según Ready.gov, es comprar agua embotellada y guardarla en su envase original sellado. Si vas a llenar tus propios recipientes, usa envases de <strong>grado alimenticio</strong>, es decir, hechos para guardar comida o bebida. Nunca uses bidones que tuvieron cloro, aceite, pintura, gasolina o cualquier químico, aunque los laves: el plástico puede quedarse con restos.</p>
      <p>La Organización Panamericana de la Salud (OPS) da estas recomendaciones para los recipientes:</p>
      <ul>
        <li>Que tengan una boca lo bastante ancha para poder lavarlos por dentro.</li>
        <li>Que estén siempre tapados, y de preferencia que tengan llave.</li>
        <li>Si no tienen llave, saca el agua con un cucharón o una taza limpios, sin meter las manos.</li>
        <li>Que estén en un lugar fresco, de preferencia sobre una base, lejos de animales y de basura.</li>
        <li>Que se laven con frecuencia con agua y cloro.</li>
      </ul>
      <h3>Limpiar el recipiente</h3>
      <p>Antes de llenarlo, Ready.gov indica lavarlo bien con agua y jabón para trastes y luego enjuagarlo con una solución de 1 cucharadita de cloro doméstico sin aroma en un cuarto de galón de agua. Un cuarto de galón es casi un litro. El jabón quita la grasa y la suciedad; el cloro mata los microbios que quedaron en las paredes.</p>
      <h3>Dónde y por cuánto tiempo</h3>
      <p>Guarda el agua en un lugar fresco y oscuro, porque la luz y el calor ayudan a que crezcan algas y microbios. Ready.gov recomienda cambiar cada 6 meses el agua que tú envasaste. Para no olvidarlo, escribe en cada recipiente la fecha en que lo llenaste. El agua que sacas para renovar no se tira: úsala para regar o para limpiar.</p>
      <h3>Agua sin mosquitos</h3>
      <p>Un tambo, una pileta o una cubeta destapados son el lugar favorito de los mosquitos para poner sus huevos. La Organización Mundial de la Salud recomienda, para prevenir el dengue, cubrir, vaciar y limpiar cada semana los recipientes donde se guarda agua en casa. Si ves larvas, unos gusanitos que se mueven en el agua, vacía y lava el recipiente.</p>
      <h3>Una reserva que de verdad sirva</h3>
      <p>En "Necesidades básicas" calculaste cuánta agua guardar para varios días. Repártela en varios recipientes en lugar de uno solo: si uno se rompe o se contamina, no pierdes toda la reserva. Y elige tamaños que puedas cargar: un garrafón de 20 litros pesa unos 20 kilos.</p>
      <p class="nota"><strong>Trampa común:</strong> rellenar un garrafón sin lavarlo. Por dentro se forma una capa resbalosa de microbios que contamina el agua nueva.</p>`,
    ejemplo: `
      <p>El 15 de marzo llenaste 3 bidones de 4 litros con agua de la llave para tu reserva. ¿Cuánta solución de cloro necesitas para enjuagarlos y cuándo debes cambiar el agua?</p>
      <ol class="pasos-ej">
        <li>Primero calcula la solución. Ready.gov indica 1 cucharadita de cloro por cada cuarto de galón de agua. Preparas 1 litro, casi un cuarto de galón, con 1 cucharadita, y con eso enjuagas los tres bidones uno tras otro, agitando bien.</li>
        <li>Antes de enjuagar con la solución, lava cada bidón con agua y jabón, porque el cloro funciona mejor sobre una superficie limpia.</li>
        <li>Para la fecha de cambio, suma 6 meses a marzo: abril, mayo, junio, julio, agosto y septiembre. Toca el 15 de septiembre.</li>
        <li>Comprueba contando al revés: de septiembre a marzo hay 6 meses.</li>
      </ol>
      <p>Resultado: <span class="resultado">1 cucharadita en un litro para enjuagar, y cambiar el agua el 15 de septiembre</span>.</p>
      <p class="nota"><strong>Error común:</strong> no anotar la fecha. Escríbela en cada recipiente con un marcador.</p>`,
    vidaReal: `
      <p>Guardar bien el agua evita enfermedades y desperdicio:</p>
      <ul>
        <li>Tu reserva de emergencia estará en buen estado cuando la necesites.</li>
        <li>Evitas criaderos de mosquitos en el patio o en la azotea.</li>
        <li>No tiras agua que se echó a perder por un recipiente sucio.</li>
        <li>En lugares donde el agua llega solo algunos días a la semana, la que guardas sigue siendo segura hasta que vuelva a llegar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Llenaste tus recipientes en enero, que es el mes 1. Si el agua se cambia cada 6 meses, ¿en qué número de mes toca cambiarla?</p>', respuesta: 1 + 6,
        pista: '<p>Suma 6 al número del mes.</p>',
        solucion: '<p>1 + 6 = <strong>7</strong>, es decir, en julio.</p>' },
      { tipo: 'numero', enunciado: '<p>Para enjuagar recipientes, Ready.gov indica 1 cucharadita de cloro por cada cuarto de galón de agua. ¿Cuántas cucharaditas necesitas para preparar 2 cuartos de galón de solución?</p>', respuesta: 2 * 1,
        pista: '<p>Por cada cuarto de galón va una cucharadita.</p>',
        solucion: '<p>2 × 1 = <strong>2 cucharaditas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es el mejor recipiente para guardar agua de beber?</p>',
        opciones: ['Un bidón de anticongelante bien lavado', 'Un garrafón de grado alimenticio, con tapa y llave', 'Una cubeta sin tapa'], correcta: 1,
        pista: '<p>Busca el que está hecho para bebidas y que impide que entre suciedad.</p>',
        solucion: '<p><strong>El garrafón de grado alimenticio con tapa y llave.</strong> El bidón tuvo un químico y la cubeta deja entrar polvo y mosquitos.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la OMS, ¿cada cuánto conviene vaciar y limpiar los recipientes de agua de la casa para prevenir el dengue?</p>',
        opciones: ['Cada semana', 'Cada año', 'Nunca, si el agua se ve limpia'], correcta: 0,
        pista: '<p>Piensa en cuánto tardan los huevos del mosquito en volverse adultos: poco tiempo.</p>',
        solucion: '<p><strong>Cada semana</strong>, además de mantenerlos tapados.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Dónde conviene guardar los recipientes con agua?</p>',
        opciones: ['Junto a los botes de basura', 'En la azotea, al sol todo el día', 'En un lugar fresco y oscuro, sobre una base'], correcta: 2,
        pista: '<p>La luz y el calor ayudan a que crezcan algas y microbios.</p>',
        solucion: '<p><strong>En un lugar fresco y oscuro, sobre una base</strong>, lejos de animales y de basura.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llaman los envases hechos para guardar comida o bebida? Se dice que son de grado...</p>',
        respuestas: ['alimenticio', 'grado alimenticio', 'de grado alimenticio', 'alimentario', 'grado alimentario'],
        pista: '<p>Viene de la palabra "alimento".</p>',
        solucion: '<p>De grado <strong>alimenticio</strong>.</p>' },
    ],
    fuentes: [READY('agua', 'Agua'), OPS, OMS('dengue-and-severe-dengue', 'Dengue y dengue grave')],
  });

  // ------------------------------------------------------------------
  L('Ahorrar y reutilizar agua en casa', {
    objetivo: 'Detectar fugas, calcular cuánta agua se pierde por ellas y aprovechar dos veces el agua que ya usaste en casa.',
    explicacion: `
      <p>Una llave que gotea parece poca cosa: una gota, luego otra. Pero gotea de día y de noche, todos los días. Al cabo de un año, esas gotas pueden llenar decenas de garrafones. Ahorrar agua empieza por no perder la que ya pagaste.</p>
      <h3>Fugas: el gasto que no ves</h3>
      <p>Una <strong>fuga</strong> es agua que se escapa sin que nadie la use: una llave que gotea, un tubo roto o un inodoro que deja correr el agua todo el tiempo. Según la EPA, en Estados Unidos las fugas de una casa promedio desperdician unos 9 400 galones al año, más de 35 000 litros. Y una sola llave que gotea una vez por segundo puede tirar más de 3 000 galones al año, unos 11 000 litros.</p>
      <p>Para pasar de galones a litros, multiplica por 3.8, porque un galón son unos 3.8 litros.</p>
      <h3>Cómo encontrarlas</h3>
      <ul>
        <li>Con el medidor: cierra todas las llaves y no uses agua por un par de horas. Anota el número del medidor antes y después. Si cambió, hay una fuga en algún lugar.</li>
        <li>En el inodoro: la EPA sugiere poner unas gotas de colorante de comida en el tanque, sin jalar la palanca. Si a los 10 minutos aparece color en la taza, el tanque tiene una fuga, casi siempre por la pieza de hule del fondo que ya no cierra bien. Al terminar, jala la palanca para que el colorante no manche el tanque.</li>
        <li>En las llaves y tubos: busca gotas, manchas de humedad, moho o charcos que no se secan.</li>
      </ul>
      <p>Muchas fugas se arreglan cambiando una pieza barata, como el empaque de una llave o el hule del tanque. En la unidad Habilidades y comunidad verás herramientas básicas para reparaciones.</p>
      <h3>Hábitos que suman</h3>
      <p>La EPA calcula que cerrar la llave mientras te cepillas los dientes ahorra unos 8 galones al día, unos 30 litros. Otros hábitos funcionan por la misma razón: el agua que corre sin usarse se va directo al drenaje.</p>
      <ul>
        <li>Lava los trastes en una tina con agua y jabón, y enjuágalos al final, en lugar de dejar la llave abierta.</li>
        <li>Usa la lavadora solo con carga completa.</li>
        <li>Riega las plantas temprano o al atardecer, cuando el sol evapora menos agua.</li>
      </ul>
      <h3>Usar el agua dos veces</h3>
      <p>Mucha agua sale de la llave limpia y se va al drenaje casi igual. Por ejemplo, el agua fría que dejas correr mientras se calienta la regadera: si pones una cubeta, puedes usarla para regar, trapear o descargar el inodoro. El agua con la que lavas frutas y verduras también sirve para las plantas.</p>
      <p>El agua que ya se usó para bañarse, lavar ropa o lavar las manos, sin contar la del inodoro, se llama <strong>aguas grises</strong>. Tiene jabón y algo de suciedad, pero se puede aprovechar para el inodoro o para regar plantas que no se comen crudas. Úsala pronto, porque guardada se pudre y huele mal, y nunca para beber ni para cocinar. En la unidad Vivienda digna y autosuficiente verás cómo hacer un sistema para aprovecharla.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que una fuga pequeña no importa. Una gota por segundo son 86 400 gotas al día, y al año se convierten en miles de litros.</p>`,
    ejemplo: `
      <p>Según la EPA, una llave que gotea una vez por segundo tira más de 3 000 galones al año. ¿Cuántos litros son al día, más o menos?</p>
      <ol class="pasos-ej">
        <li>Primero pasa los galones a litros, porque es la medida que usas en casa: 3 000 × 3.8 = 11 400 litros al año.</li>
        <li>Ahora reparte entre los días del año: 11 400 ÷ 365 ≈ 31 litros al día.</li>
        <li>Compara con lo que viste en "Cuánta agua necesitas": en una emergencia, una persona sobrevive con 7.5 a 15 litros al día. Esa sola llave tira el agua de dos personas.</li>
        <li>Comprueba al revés: 31 × 365 = 11 315 litros, muy cerca de los 11 400 del principio.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 31 litros al día</span>, que se arreglan cambiando un empaque.</p>
      <p class="nota"><strong>Error común:</strong> olvidar convertir galones a litros y comparar números en unidades distintas.</p>`,
    vidaReal: `
      <p>Cuidar el agua en casa se nota pronto:</p>
      <ul>
        <li>Tu recibo baja cuando arreglas una fuga o cambias un hábito.</li>
        <li>En temporadas de escasez, el agua te alcanza para más días.</li>
        <li>Tus plantas pueden regarse con agua que antes se iba al drenaje.</li>
        <li>Aprendes a revisar tu casa y a arreglar cosas sencillas sin llamar a nadie.</li>
        <li>Cuidas un recurso que en muchos lugares escasea cada vez más.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Según la EPA, cerrar la llave al cepillarte los dientes ahorra 8 galones al día. Si un galón son 3.8 litros, ¿cuántos litros ahorras al día?</p>', respuesta: 8 * 3.8, tolerancia: 0.5,
        pista: '<p>Multiplica los galones por 3.8.</p>',
        solucion: '<p>8 × 3.8 = <strong>30.4 litros</strong> al día.</p>' },
      { tipo: 'numero', enunciado: '<p>Si ahorras 30 litros al día, ¿cuántos litros ahorras en un año de 365 días?</p>', respuesta: 30 * 365,
        pista: '<p>Multiplica el ahorro diario por los días del año.</p>',
        solucion: '<p>30 × 365 = <strong>10 950 litros</strong>, más de 500 garrafones de 20 litros.</p>' },
      { tipo: 'numero', enunciado: '<p>Las fugas de una casa promedio en Estados Unidos desperdician 9 400 galones al año. Con 3.8 litros por galón, ¿cuántos litros son?</p>', respuesta: 9400 * 3.8,
        pista: '<p>Multiplica 9 400 por 3.8.</p>',
        solucion: '<p>9 400 × 3.8 = <strong>35 720 litros</strong> al año, el consumo de una persona durante más de un año con 75 litros al día.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cómo se revisa si el tanque del inodoro tiene una fuga?</p>',
        opciones: ['Se pone colorante en la taza y se jala la palanca', 'Se ponen gotas de colorante en el tanque y, si a los 10 minutos hay color en la taza, hay fuga', 'Se huele el agua del tanque'], correcta: 1,
        pista: '<p>La prueba busca agua que pase del tanque a la taza sin que nadie jale la palanca.</p>',
        solucion: '<p><strong>Colorante en el tanque y esperar 10 minutos</strong>, sin jalar la palanca. Si el color llega a la taza, el agua se está escapando.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas es agua gris?</p>',
        opciones: ['La del inodoro', 'La de lluvia que todavía no se ha usado', 'La de la regadera y el lavabo'], correcta: 2,
        pista: '<p>Son aguas que ya se usaron, pero sin heces.</p>',
        solucion: '<p><strong>La de la regadera y el lavabo.</strong> La del inodoro lleva heces, y la de lluvia aún no se ha usado.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el agua que se escapa sin que nadie la use, por ejemplo de una llave que gotea?</p>',
        respuestas: ['fuga', 'una fuga', 'fugas', 'goteo', 'fuga de agua'],
        pista: '<p>Es la misma palabra que se usa cuando alguien se escapa.</p>',
        solucion: '<p>Una <strong>fuga</strong>.</p>' },
    ],
    fuentes: [
      EPA('watersense/fix-leak-week', 'WaterSense, Fix a Leak Week'),
      EPA('watersense/statistics-and-facts', 'WaterSense, Statistics and Facts'),
      WIKI('Aguas_grises', 'Aguas grises'),
    ],
  });
})();
