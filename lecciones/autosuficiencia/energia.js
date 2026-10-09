// Autosuficiencia · Unidad 9: Energía.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Seguridad: baterías (NFPA, guía del Pacífico), biogás (CARE Perú, Penn State), electricidad (MedlinePlus, NFPA, Ready.gov).
// Las instalaciones eléctricas las hace un electricista calificado: aquí solo se explican principios.
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
  const MEDLINE = (ruta, nombre) => ({ nombre: `MedlinePlus en español: ${nombre}`, url: `https://medlineplus.gov/spanish/${ruta}` });
  const EIA = (ruta, nombre) => ({ nombre: `Administración de Información Energética de EE. UU. (EIA): ${nombre} (en inglés)`, url: `https://www.eia.gov/${ruta}` });
  const DOEGUIA = { nombre: 'Departamento de Energía de EE. UU. (DOE): Consumer Guide to Residential Renewable Energy (en inglés, PDF)', url: 'https://www.energy.gov/sites/default/files/2022-08/ES-ConsumerGuide-Residential-Renewable-Energy.pdf' };
  const DOELUZ = { nombre: 'Departamento de Energía de EE. UU. (DOE): Energy-Efficient Lighting (en inglés, PDF)', url: 'https://www.energy.gov/sites/default/files/2021-08/ES-EE%20Lighting_080921.pdf' };
  const DOESOL = { nombre: 'Departamento de Energía de EE. UU. (DOE): How Does Solar Work? (en inglés)', url: 'https://www.energy.gov/eere/solar/how-does-solar-work' };
  const ESTAR = (ruta, nombre) => ({ nombre: `ENERGY STAR (Agencia de Protección Ambiental de EE. UU.): ${nombre} (en inglés)`, url: `https://www.energystar.gov/products/${ruta}` });
  const READYAP = { nombre: 'Ready.gov en español: Apagones', url: 'https://www.ready.gov/es/apagones' };
  const WYO = { nombre: 'Extensión de la Universidad de Wyoming: Micro-hydropower for the Home, Farm, or Ranch, B-1285 (en inglés, PDF)', url: 'https://www.wyoextension.org/agpubs/pubs/B-1285.pdf' };
  const PACIFICO = { nombre: 'Asociación de la Industria de Energía Sostenible de las Islas del Pacífico: Off Grid PV Power Systems, System Install Guidelines (en inglés, PDF)', url: 'https://policy.asiapacificenergy.org/sites/default/files/Off%20Grid%20PV%20Power%20Systems-%20System%20Install%20Guidelines%20for%20the%20Pacific%20Islands.pdf' };
  const NFPALITIO = { nombre: 'Asociación Nacional de Protección contra el Fuego (NFPA): Baterías de iones de litio', url: 'https://www.nfpa.org/es/education-and-research/home-fire-safety/lithium-ion-batteries' };
  const BSESC = { nombre: 'Departamento de Energía de EE. UU. (DOE), Building Science Education: Water Heaters, Solar (en inglés)', url: 'https://bsesc.energy.gov/energy-basics/water-heaters-solar' };
  const UFIFAS = { nombre: 'Extensión de la Universidad de Florida (UF/IFAS): Energy Efficient Homes: Water Heaters (en inglés)', url: 'https://edis.ifas.ufl.edu/publication/FY1025' };
  const EERE = { nombre: 'Departamento de Energía de EE. UU. (DOE, EERE): Build a Pizza Box Solar Oven (en inglés, PDF)', url: 'https://www1.eere.energy.gov/education/pdfs/solar_pizza_oven_box.pdf' };
  const PSU = (ruta, nombre) => ({ nombre: `Extensión de la Universidad Estatal de Pensilvania: Vamos a conservar alimentos, ${nombre}`, url: `https://extension.psu.edu/vamos-a-conservar-alimentos-${ruta}` });
  const EPA_AD = { nombre: 'Agencia de Protección Ambiental de EE. UU. (EPA): Anaerobic Digestion (en inglés)', url: 'https://www.epa.gov/anaerobic-digestion' };
  const CARE = { nombre: 'CARE Perú (proyecto con apoyo de USAID): Manual técnico de instalación y uso de biogás, Ganadería Puneña (PDF)', url: 'https://sswm.info/sites/default/files/reference_attachments/TAPIA%202016.%20Manual%20de%20Instalaci%C3%B3n%20y%20Uso%20de%20Biog%C3%A1s.pdf' };
  const PSUGAS = { nombre: 'Extensión de la Universidad Estatal de Pensilvania: Confined Space Manure Storage Hazards (en inglés)', url: 'https://extension.psu.edu/confined-space-manure-storage-hazards' };
  const CONAFOR = { nombre: 'Comisión Nacional Forestal (CONAFOR): Manual de construcción y manejo de hornos de ladrillo para fabricar carbón (PDF)', url: 'https://www.uv.mx/apps/agronomia/dendro_2011/Inicio_files/manualhornos.pdf' };
  const UNAM = { nombre: 'Díaz, Berrueta y Masera, UNAM y Red Mexicana de Bioenergía: Estufas de leña, Cuaderno temático 3 (PDF)', url: 'https://ecotec.unam.mx/wp-content/uploads/D--az-Jimenez-R.-Berrueta-V.-y-Masera-O.-2011.-Estufas-de-le--a.-Cuaderno-tem--tico-No.-3.-Red-Mexicana-de-Bioenerg--a.-.pdf' };
  const OMS = { nombre: 'Organización Mundial de la Salud: Contaminación del aire doméstico', url: 'https://www.who.int/es/news-room/fact-sheets/detail/household-air-pollution-and-health' };
  const SMOKEY = { nombre: 'Smokey Bear, Servicio Forestal de EE. UU.: Cómo apagar una fogata', url: 'https://smokeybear.com/es/prevention-how-tos/campfire-safety' };
  const NFPAELEC = { nombre: 'Asociación Nacional de Protección contra el Fuego (NFPA): Seguridad eléctrica en casa', url: 'https://www.nfpa.org/es/education-and-research/home-fire-safety/electrical-safety-in-the-home' };
  const NFPALITIOPDF = { nombre: 'NFPA: Seguridad de las baterías de ion de litio, hoja en español (PDF)', url: 'https://www.Sandiego.Gov/sites/default/files/2023-11/lithium-ion-battery-safety-nfpa-spanish.pdf' };

  // ------------------------------------------------------------------
  L('Cuánta electricidad usas', {
    objetivo: 'Hacer el inventario de consumo de tu casa: qué aparatos usas, cuántos watts gastan, cuántas horas al día y cuánta energía suman.',
    explicacion: `
      <p>Imagina que quieres poner paneles solares, o comprar una batería para los apagones. La primera pregunta del vendedor será: ¿cuánta electricidad usas? Si no lo sabes, puedes comprar un sistema que no alcanza, o uno mucho más caro de lo que necesitas. Por eso, antes de producir energía, hay que medir cuánta gastas.</p>
      <h3>Lo que ya sabes</h3>
      <p>En Física, en "Potencia eléctrica y cómo leer tu recibo de luz", viste que la potencia de un aparato se mide en watts (W), que la energía se mide en kilowatts-hora (kWh) y que algunos aparatos gastan aunque estén "apagados". Aquí vas a usar esas ideas para hacer una lista de toda tu casa.</p>
      <h3>El inventario de consumo</h3>
      <p>Ready.gov, el sitio de emergencias del Gobierno de Estados Unidos, recomienda hacer un inventario de lo que en tu casa depende de la electricidad, para prepararte ante un apagón. Para producir tu propia energía se hace lo mismo, pero con números. Un <strong>inventario de consumo</strong> es una lista de tus aparatos con tres datos de cada uno:</p>
      <ol>
        <li>Su potencia en watts. Viene en la etiqueta del aparato o en su cargador; busca un número seguido de "W".</li>
        <li>Cuántas horas al día lo usas, en promedio.</li>
        <li>La energía que gasta al día, que se calcula multiplicando los dos datos anteriores.</li>
      </ol>
      <p>La regla es: watts × horas = watts-hora (Wh). Por ejemplo, un foco de 10 W prendido 5 horas gasta 10 × 5 = 50 Wh al día. Si sumas los Wh de todos los aparatos, obtienes cuánta energía usa tu casa en un día. A todo lo que consume electricidad se le llama la <strong>carga</strong>.</p>
      <h3>Un inventario de ejemplo</h3>
      <p>Esta tabla es solo un ejemplo para practicar; tus aparatos tendrán otros números.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th scope="col">Aparato</th><th scope="col">Potencia</th><th scope="col">Horas al día</th><th scope="col">Energía al día</th></tr></thead>
        <tbody>
          <tr><th scope="row">4 focos LED</th><td>4 × 9 W = 36 W</td><td>5</td><td>180 Wh</td></tr>
          <tr><th scope="row">Televisión</th><td>80 W</td><td>3</td><td>240 Wh</td></tr>
          <tr><th scope="row">Cargador de teléfono</th><td>10 W</td><td>2</td><td>20 Wh</td></tr>
          <tr><th scope="row">Ventilador</th><td>50 W</td><td>6</td><td>300 Wh</td></tr>
        </tbody>
      </table></div>
      <p>Sumando: 180 + 240 + 20 + 300 = 740 Wh al día. Como 1 kWh son 1 000 Wh, esta casa usa 0.74 kWh al día con estos aparatos.</p>
      <h3>Aparatos que no están prendidos todo el tiempo</h3>
      <p>El refrigerador está conectado todo el día, pero su motor se prende y se apaga solo. Si multiplicas sus watts por 24 horas, te saldría mucho más de lo que gasta. Por eso, para el refrigerador conviene usar la etiqueta de energía, que suele decir cuántos kWh gasta al año. Divide entre 365 y tendrás su gasto de un día.</p>
      <h3>¿Qué gasta más en una casa?</h3>
      <p>La Administración de Información Energética de Estados Unidos (EIA) reporta que, en las casas de ese país, en 2020 lo que más electricidad usó fue el aire acondicionado, con el 19%, seguido de la calefacción y el calentador de agua, con el 12% cada uno. Después vienen la iluminación y el refrigerador. Fíjate que los aparatos que más gastan son los que calientan o enfrían. En tu casa puede ser distinto según el clima, pero esta lista te dice dónde buscar primero.</p>
      <h3>¿Para qué sirve el total?</h3>
      <p>El total de Wh al día es el número más importante de esta unidad. Con él calcularás cuántos paneles necesitas, en "Paneles solares: cómo funcionan", y qué tan grande debe ser tu batería, en "Baterías y almacenamiento". También te dice dónde ahorrar, como verás en la siguiente lección.</p>
      <p class="nota"><strong>Trampa común:</strong> olvidar los aparatos pequeños que están conectados todo el día. Cada uno gasta poco, pero 24 horas al día suman.</p>`,
    ejemplo: `
      <p>Quieres saber cuánto gasta al día una casa con un refrigerador cuya etiqueta dice 365 kWh al año, una licuadora de 400 W que se usa un cuarto de hora y 3 focos de 9 W prendidos 4 horas.</p>
      <ol class="pasos-ej">
        <li>Primero el refrigerador: 365 kWh ÷ 365 días = 1 kWh al día, es decir, 1 000 Wh.</li>
        <li>Luego la licuadora: un cuarto de hora es 0.25 h, así que 400 × 0.25 = 100 Wh.</li>
        <li>Después los focos: 3 × 9 = 27 W, y 27 × 4 = 108 Wh.</li>
        <li>Suma todo: 1 000 + 100 + 108 = 1 208 Wh al día.</li>
        <li>Comprueba en kWh: 1 + 0.1 + 0.108 = 1.208 kWh, lo mismo.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 1 208 Wh, o 1.2 kWh, al día</span>. Fíjate que el refrigerador es casi todo el gasto.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar los watts del refrigerador por 24 horas. Su motor no está prendido todo el tiempo.</p>`,
    vidaReal: `
      <p>Saber cuánta electricidad usas te ayuda a decidir mejor:</p>
      <ul>
        <li>Sabes qué aparatos se llevan la mayor parte de tu recibo de luz.</li>
        <li>Puedes pedir un sistema solar del tamaño correcto, sin pagar de más.</li>
        <li>Sabes qué aparatos puedes mantener prendidos durante un apagón.</li>
        <li>Puedes comprobar si un cambio, como un foco nuevo, de verdad te ahorra energía.</li><li>Con el total del día, ya tienes el primer dato para planear paneles o baterías.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una televisión de 100 W se usa 4 horas al día. ¿Cuántos Wh gasta al día?</p>', respuesta: 100 * 4,
        pista: '<p>Multiplica los watts por las horas.</p>',
        solucion: '<p>100 × 4 = <strong>400 Wh</strong> al día.</p>' },
      { tipo: 'numero', enunciado: '<p>Un refrigerador gasta 438 kWh al año según su etiqueta. ¿Cuántos kWh gasta al día?</p>', respuesta: 438 / 365,
        pista: '<p>Divide entre los 365 días del año.</p>',
        solucion: '<p>438 ÷ 365 = <strong>1.2 kWh</strong> al día.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu inventario suma 2 500 Wh al día. ¿Cuántos kWh son?</p>', respuesta: 2500 / 1000,
        pista: '<p>Un kWh son 1 000 Wh.</p>',
        solucion: '<p>2 500 ÷ 1 000 = <strong>2.5 kWh</strong> al día.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la EIA, ¿qué usó más electricidad en las casas de Estados Unidos en 2020?</p>',
        opciones: ['La iluminación', 'El aire acondicionado', 'Los cargadores de teléfono'], correcta: 1,
        pista: '<p>Los aparatos que más gastan calientan o enfrían.</p>',
        solucion: '<p><strong>El aire acondicionado</strong>, con el 19%.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Dónde encuentras los watts de un aparato?</p>',
        opciones: ['En su etiqueta o en su cargador', 'Adivinando por su tamaño', 'En el recibo de luz'], correcta: 0,
        pista: '<p>Busca un número seguido de "W".</p>',
        solucion: '<p><strong>En su etiqueta o en su cargador.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la lista de tus aparatos con sus watts, sus horas de uso y la energía que gastan al día?</p>',
        respuestas: ['inventario de consumo', 'el inventario de consumo', 'inventario', 'inventario de energia', 'inventario electrico'],
        pista: '<p>Es como hacer el inventario de una tienda, pero de energía.</p>',
        solucion: '<p>El <strong>inventario de consumo</strong>.</p>' },
    ],
    fuentes: [EIA('energyexplained/use-of-energy/electricity-use-in-homes.php', 'Electricity use in homes'), READYAP, DOELUZ],
  });

  // ------------------------------------------------------------------
  L('Ahorrar energía en casa', {
    objetivo: 'Reducir el consumo de tu casa con focos LED, aparatos eficientes y buenos hábitos, y entender por qué ahorrar va antes que producir.',
    explicacion: `
      <p>Si tu cubeta tiene un agujero, no basta con echarle más agua: primero tapas el agujero. Con la energía pasa lo mismo. Antes de comprar paneles o baterías, conviene gastar menos, porque cada watt que ahorras es un watt que ya no tienes que producir ni guardar.</p>
      <h3>Primero ahorrar, después producir</h3>
      <p>El Departamento de Energía de Estados Unidos (DOE) lo dice así en su guía sobre energía renovable para el hogar: antes de instalar paneles o un aerogenerador, hay que hacer la casa eficiente, porque así se ahorra en el recibo y el sistema que necesitas es más pequeño y más barato.</p>
      <p>La <strong>eficiencia energética</strong> es hacer lo mismo gastando menos energía: tener la misma luz, el mismo frío en el refrigerador o la misma comodidad, pero con menos watts.</p>
      <h3>Focos: el cambio más fácil</h3>
      <p>El DOE explica que la iluminación es cerca del 15% del consumo eléctrico de una casa promedio. Los focos incandescentes, los de filamento, convertían el 90% de su energía en calor y solo el 10% en luz. Por eso se calentaban tanto. Los focos LED, en cambio, usan hasta 90% menos energía y duran hasta 25 veces más que los incandescentes, y casi no se calientan.</p>
      <p>El DOE recomienda empezar por los focos que están prendidos tres horas o más al día, porque ahí se nota más el ahorro.</p>
      <h3>Aparatos eficientes</h3>
      <p>Cuando compres un aparato, fíjate en su etiqueta de energía. En Estados Unidos, el sello ENERGY STAR marca los aparatos que gastan menos que el mínimo que exige la ley. Por ejemplo, la agencia que lo administra dice que un refrigerador con ese sello es cerca de 9% más eficiente que uno que apenas cumple la norma. En otros países hay etiquetas parecidas: busca la que compara el consumo en kWh al año y elige el número más bajo entre aparatos del mismo tamaño.</p>
      <p>Para el refrigerador, que está conectado todo el día, también ayudan unos hábitos sencillos:</p>
      <ul>
        <li>Abre la puerta lo menos posible y ciérrala bien.</li>
        <li>No metas comida caliente; deja que se enfríe un poco antes.</li>
        <li>Déjale espacio atrás para que el aire circule.</li>
      </ul>
      <h3>Lo que no se ve: el consumo en espera</h3>
      <p>En Física viste el consumo en espera: aparatos que gastan aunque estén "apagados". Desconéctalos o usa una regleta con interruptor para apagar varios a la vez cuando no los uses, sobre todo por la noche o cuando sales varios días.</p>
      <h3>Aprovechar el sol y la sombra</h3>
      <p>El DOE también menciona aprovechar la luz del día y las plantas alrededor de la casa. Abrir cortinas de día es luz gratis. Un árbol que da sombra en la tarde puede mantener la casa más fresca y reducir el uso del ventilador o del aire acondicionado, que, como viste en la lección anterior, son de lo que más gasta. Cómo aislar y ventilar la casa lo verás en la unidad Vivienda digna y autosuficiente.</p>
      <h3>¿Por dónde empezar?</h3>
      <p>Usa tu inventario de consumo. Los aparatos con más Wh al día son los que más ahorro pueden dar. Cambiar un foco que casi no usas ahorra poco; usar menos el aparato que más gasta ahorra mucho.</p>
      <p class="nota"><strong>Trampa común:</strong> comprar más paneles para mantener aparatos viejos que gastan mucho. Muchas veces sale más barato cambiar el aparato.</p>`,
    ejemplo: `
      <p>Tienes un foco incandescente de 60 W prendido 5 horas al día. Lo cambias por un LED que, según el máximo que da el DOE, usa 90% menos energía. ¿Cuánto ahorras al día y en un año?</p>
      <ol class="pasos-ej">
        <li>Primero calcula lo que gasta el foco viejo: 60 × 5 = 300 Wh al día.</li>
        <li>Si el LED usa 90% menos, gasta el 10%: 300 × 0.10 = 30 Wh al día.</li>
        <li>El ahorro diario es 300 − 30 = 270 Wh.</li>
        <li>En un año: 270 × 365 = 98 550 Wh, que son unos 98.6 kWh.</li>
        <li>Comprueba de otra forma: el 90% de 300 es 300 × 0.9 = 270 Wh, igual que en el paso 3.</li>
      </ol>
      <p>Resultado: <span class="resultado">270 Wh al día, unos 98.6 kWh al año</span>, con un solo foco.</p>
      <p class="nota"><strong>Error común:</strong> pensar que el LED gasta 90% y no 10%. "90% menos" quiere decir que te queda el 10%.</p>`,
    vidaReal: `
      <p>Ahorrar energía se nota en tu bolsillo y en tu casa:</p>
      <ul>
        <li>Pagas menos de luz cada mes sin dejar de usar lo que necesitas.</li>
        <li>Si pones paneles solares, necesitas menos y te cuestan menos.</li>
        <li>Tus focos duran mucho más y casi no se calientan.</li>
        <li>Durante un apagón, tu batería o tu planta te alcanzan para más horas.</li><li>Aprendes a elegir aparatos por su etiqueta de energía y no solo por su precio.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un foco gasta 400 Wh al día. Si lo cambias por uno que usa 75% menos, ¿cuántos Wh gastará al día?</p>', respuesta: 400 * 0.25,
        pista: '<p>Si usa 75% menos, te queda el 25%.</p>',
        solucion: '<p>400 × 0.25 = <strong>100 Wh</strong> al día.</p>' },
      { tipo: 'numero', enunciado: '<p>Un foco incandescente de 100 W convierte el 90% de su energía en calor. ¿Cuántos watts se van en calor?</p>', respuesta: 100 * 0.9,
        pista: '<p>Calcula el 90% de 100.</p>',
        solucion: '<p>100 × 0.9 = <strong>90 W</strong> en calor; solo 10 W se vuelven luz.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según el DOE, ¿qué conviene hacer antes de instalar paneles solares?</p>',
        opciones: ['Comprar más aparatos', 'Hacer la casa más eficiente para gastar menos', 'Dejar los focos prendidos'], correcta: 1,
        pista: '<p>Primero tapa el agujero de la cubeta.</p>',
        solucion: '<p><strong>Hacer la casa más eficiente</strong>: así el sistema que necesitas es más pequeño.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué focos conviene cambiar primero por LED, según el DOE?</p>',
        opciones: ['Los que casi nunca prendes', 'Los del clóset', 'Los que están prendidos tres horas o más al día'], correcta: 2,
        pista: '<p>Donde más horas hay, más se ahorra.</p>',
        solucion: '<p><strong>Los que se usan tres horas o más al día.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Dos refrigeradores del mismo tamaño gastan 350 y 450 kWh al año. ¿Cuál es más eficiente?</p>',
        opciones: ['El de 350 kWh al año', 'El de 450 kWh al año', 'Los dos son iguales'], correcta: 0,
        pista: '<p>Más eficiente es el que hace lo mismo con menos energía.</p>',
        solucion: '<p><strong>El de 350 kWh</strong>: enfría lo mismo gastando 100 kWh menos al año.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama hacer lo mismo gastando menos energía?</p>',
        respuestas: ['eficiencia energetica', 'la eficiencia energetica', 'eficiencia', 'ahorro de energia'],
        pista: '<p>Son dos palabras; la primera empieza con "e".</p>',
        solucion: '<p><strong>Eficiencia energética</strong>.</p>' },
    ],
    fuentes: [DOEGUIA, DOELUZ, ESTAR('refrigerators', 'Refrigerators')],
  });

  // ------------------------------------------------------------------
  const SISTEMA = diagrama([0, 14], [0, 13], [
    ...['panel', 'controlador', 'batería', 'inversor', 'aparatos'].flatMap((t, k) => [caja(2, 11 - 2.5 * k, 8.5, 12.4 - 2.5 * k), txt(5.25, 11.7 - 2.5 * k, t)]),
    ...[0, 1, 2, 3].flatMap((k) => flecha([5.25, 10.95 - 2.5 * k], [5.25, 9.95 - 2.5 * k], 0, 1.2)),
    txt(11.2, 9.2, 'corriente directa'), txt(11.2, 1.7, 'corriente alterna'),
  ], 'Cinco cajas en columna, de arriba hacia abajo, unidas por flechas: panel, controlador, batería, inversor y aparatos. Junto al controlador y la batería dice corriente directa; junto a los aparatos, después del inversor, dice corriente alterna.');

  L('Paneles solares: cómo funcionan', {
    objetivo: 'Explicar cómo un panel solar convierte la luz en electricidad, qué hace el inversor y estimar cuántos paneles necesitas para tu consumo.',
    explicacion: `
      <p>Una calculadora con una tirita oscura funciona sin pilas mientras haya luz. Esa tirita es un pequeño panel solar. Los paneles de los techos hacen lo mismo, en grande: convierten la luz del sol en electricidad, sin ruido, sin humo y sin piezas que se muevan.</p>
      <h3>La celda fotovoltaica</h3>
      <p>La EIA explica que una <strong>celda fotovoltaica</strong>, o celda solar, es un aparato que convierte la luz del sol directamente en electricidad. La luz está hecha de partículas de energía llamadas fotones. Cuando los fotones llegan a la celda, empujan a los electrones del material y los ponen en movimiento. Como viste en Física, en "Corriente, voltaje y resistencia", electrones en movimiento son una corriente eléctrica.</p>
      <p>Una sola celda da muy poca electricidad, así que se juntan muchas en un panel. El DOE dice que los paneles van de 10 a 400 watts, que aguantan tormentas y granizo, y que necesitan poco mantenimiento. Varios paneles juntos forman un arreglo.</p>
      <h3>Corriente directa y corriente alterna</h3>
      <p>La EIA explica que las celdas producen <em>corriente directa</em>: los electrones van siempre en el mismo sentido, como en las pilas y las baterías. Pero la electricidad de la red, la que llega a los contactos de tu casa, es <em>corriente alterna</em>: cambia de sentido muchas veces por segundo. Por eso los sistemas solares usan un <strong>inversor</strong>, un aparato que convierte la corriente directa en alterna para que puedas usar tus aparatos normales.</p>
      ${SISTEMA}
      <p>En un sistema con batería, el orden es el del dibujo. El controlador de carga cuida que la batería no se cargue de más, como verás en la siguiente lección. Hay sistemas sin batería, conectados a la red: lo que sobra de día se manda a la red y de noche se toma de ella. El DOE explica que en muchos lugares un medidor que gira en ambos sentidos cuenta las dos cosas, y la compañía de luz te lo descuenta.</p>
      <h3>Hacia dónde apuntar</h3>
      <p>La EIA explica que los paneles producen más cuando miran de frente al sol. Los seguidores que giran con el sol son caros, así que la mayoría de los paneles se fijan mirando al sur si vives en el hemisferio norte, como México, o al norte si vives en el hemisferio sur, como Chile o Argentina, con una inclinación que depende del lugar. Evita las sombras de árboles, tanques de agua o edificios.</p>
      <h3>¿Cuánta energía da un panel?</h3>
      <p>Depende del tamaño del panel y de cuánto sol hay donde vives. El DOE da un ejemplo: un sistema de 7 kW produce de 20 a 35 kWh al día, según el clima. Si divides, cada kW de paneles da entre 20 ÷ 7 ≈ 2.9 y 35 ÷ 7 = 5 kWh al día. Ese número cambia con el lugar y la temporada: en invierno o en temporada de lluvias hay menos sol.</p>
      <h3>Calcular cuántos paneles necesitas</h3>
      <p>Con tu inventario de consumo de la primera lección puedes estimarlo:</p>
      <ol>
        <li>Toma tu consumo diario en kWh.</li>
        <li>Divídelo entre los kWh que da cada kW de paneles en tu lugar. Si no lo sabes, usa el número más bajo, 2.9, para no quedarte corto.</li>
        <li>El resultado son los kW de paneles. Para saber cuántos paneles son, divide entre los kW de cada panel.</li>
      </ol>
      <p>Este cálculo es solo para darte una idea. Un instalador calificado lo afina con los datos de sol de tu región y las pérdidas de los cables, el controlador y el inversor. La instalación debe hacerla un electricista calificado, porque los paneles producen electricidad en cuanto les da la luz.</p>
      <p class="nota"><strong>Trampa común:</strong> calcular con el día más soleado del año. En los días nublados el sistema produce menos, y si lo diseñas al límite, te quedarás sin energía.</p>`,
    ejemplo: `
      <p>Tu inventario dice que usas 1.5 kWh al día. Con el dato más bajo del DOE, 2.9 kWh por cada kW de paneles, ¿cuántos kW de paneles necesitas, y cuántos paneles de 300 W son?</p>
      <ol class="pasos-ej">
        <li>Primero divide tu consumo entre lo que da cada kW: 1.5 ÷ 2.9 ≈ 0.52 kW.</li>
        <li>Pasa a watts: 0.52 kW son unos 520 W.</li>
        <li>Divide entre los watts de cada panel: 520 ÷ 300 ≈ 1.7.</li>
        <li>No puedes poner 1.7 paneles, así que redondeas hacia arriba: 2 paneles.</li>
        <li>Comprueba: 2 paneles de 300 W son 0.6 kW, y 0.6 × 2.9 = 1.74 kWh al día, un poco más de los 1.5 que usas.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 0.52 kW, es decir, 2 paneles de 300 W</span>, como primera estimación.</p>
      <p class="nota"><strong>Error común:</strong> redondear hacia abajo. Con 1 panel solo tendrías 0.3 × 2.9 = 0.87 kWh al día.</p>`,
    vidaReal: `
      <p>Entender los paneles solares te ayuda a tomar buenas decisiones:</p>
      <ul>
        <li>Puedes estimar cuántos paneles necesitas antes de pedir una cotización.</li>
        <li>Sabes por qué un sistema necesita inversor y para qué sirve cada parte.</li>
        <li>Eliges un lugar sin sombras y bien orientado para tus paneles.</li>
        <li>Entiendes por qué el sistema produce menos en temporada nublada.</li><li>Puedes revisar si la cotización de un instalador tiene sentido para tu consumo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Según el DOE, un sistema de 7 kW produce hasta 35 kWh al día en un clima soleado. ¿Cuántos kWh da cada kW?</p>', respuesta: 35 / 7,
        pista: '<p>Divide la energía entre los kW.</p>',
        solucion: '<p>35 ÷ 7 = <strong>5 kWh</strong> por cada kW al día.</p>' },
      { tipo: 'numero', enunciado: '<p>Necesitas 0.9 kW de paneles y cada panel es de 300 W. ¿Cuántos paneles necesitas?</p>', respuesta: 3,
        pista: '<p>Pasa los kW a watts y divide entre 300.</p>',
        solucion: '<p>0.9 kW son 900 W, y 900 ÷ 300 = <strong>3 paneles</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué hace el inversor?</p>',
        opciones: ['Guarda la energía para la noche', 'Convierte la corriente directa en corriente alterna', 'Limpia los paneles'], correcta: 1,
        pista: '<p>Los paneles dan corriente directa y tus aparatos usan alterna.</p>',
        solucion: '<p><strong>Convierte la corriente directa en alterna</strong>, la que usan tus aparatos.</p>' },
      { tipo: 'opciones', enunciado: '<p>Vives en México, en el hemisferio norte. ¿Hacia dónde conviene que miren los paneles fijos?</p>',
        opciones: ['Hacia el norte', 'Hacia el piso', 'Hacia el sur'], correcta: 2,
        pista: '<p>En el hemisferio norte, el sol pasa por el sur.</p>',
        solucion: '<p><strong>Hacia el sur</strong>, según la EIA.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué conviene calcular los paneles con el dato más bajo de sol?</p>',
        opciones: ['Para no quedarte sin energía en los días nublados', 'Para gastar más dinero', 'Porque los paneles funcionan mejor de noche'], correcta: 0,
        pista: '<p>No todos los días son soleados.</p>',
        solucion: '<p><strong>Para no quedarte corto</strong> en los días con menos sol.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la pieza que convierte la luz del sol directamente en electricidad?</p>',
        respuestas: ['celda fotovoltaica', 'celda solar', 'la celda fotovoltaica', 'la celda solar', 'celula fotovoltaica', 'celula solar'],
        pista: '<p>Muchas de ellas forman un panel.</p>',
        solucion: '<p>La <strong>celda fotovoltaica</strong>, o celda solar.</p>' },
    ],
    fuentes: [EIA('energyexplained/solar/photovoltaics-and-electricity.php', 'Photovoltaics and electricity'), DOESOL, DOEGUIA],
  });

  // ------------------------------------------------------------------
  L('Baterías y almacenamiento', {
    objetivo: 'Calcular cuánta energía guarda una batería, entender la profundidad de descarga y cuidar las baterías para evitar incendios y explosiones.',
    explicacion: `
      <p>El sol sale de día, pero los focos se prenden de noche. Si quieres usar de noche la energía de tus paneles, o tener luz durante un apagón, necesitas guardarla. Para eso sirven las baterías: son como un tanque de agua, pero de electricidad.</p>
      <h3>Cuánta energía guarda</h3>
      <p>La <strong>capacidad</strong> de una batería es cuánta energía puede guardar. Muchas baterías la marcan en amperes-hora (Ah) junto con su voltaje (V). En Física viste que la potencia es voltaje por corriente. Por eso, para pasar a watts-hora, que es lo que usaste en tu inventario, se multiplica:</p>
      <p>Wh = V × Ah</p>
      <p>Se lee: la energía en watts-hora es el voltaje por los amperes-hora. Por ejemplo, una batería de 12 V y 100 Ah guarda 12 × 100 = 1 200 Wh, es decir, 1.2 kWh.</p>
      <h3>No toda la energía se puede usar</h3>
      <p>Una batería se daña si la vacías por completo, y muchas duran menos si la vacías mucho cada día. Por eso el fabricante indica cuánto de su capacidad se puede usar. A eso se le llama <strong>profundidad de descarga</strong>: el porcentaje de la capacidad que puedes sacar sin dañarla. Si una batería de 1 200 Wh admite una profundidad de descarga del 50%, solo puedes usar 1 200 × 0.5 = 600 Wh. Revisa siempre ese dato en la ficha del fabricante, porque cambia según el tipo y el modelo.</p>
      <h3>Días sin sol</h3>
      <p>Si hay varios días nublados seguidos, tus paneles casi no cargan. Por eso, al calcular una batería, se decide cuántos días quieres que aguante sin sol. Así, la energía útil que necesitas es tu consumo diario por esos días, y la capacidad total sale de dividir esa energía útil entre la profundidad de descarga.</p>
      <h3>El controlador de carga</h3>
      <p>Entre los paneles y la batería va el controlador de carga, que viste en el dibujo de la lección anterior. Su trabajo es dejar de cargar cuando la batería está llena y, en muchos modelos, cortar el consumo cuando está demasiado vacía. Así la batería dura más.</p>
      <h3>Dos tipos comunes</h3>
      <ul>
        <li>Las de plomo-ácido, como las de los coches, son baratas y pesadas. Muchas sueltan gas hidrógeno al cargarse.</li>
        <li>Las de iones de litio, como las de los teléfonos, son más ligeras y caras. Guardan mucha energía en poco espacio.</li>
      </ul>
      <h3>Seguridad con baterías de plomo-ácido</h3>
      <p>El hidrógeno arde con facilidad. Una guía de instalación de sistemas solares de las islas del Pacífico pide ponerlas en un lugar ventilado, con una entrada de aire abajo y una salida arriba del lado contrario, para que el hidrógeno no se acumule, y no poner equipo eléctrico encima de ellas, porque una chispa podría encenderlo. Por eso no se guardan en un cuarto cerrado. Conectar un banco de baterías al resto de la instalación debe hacerlo un electricista calificado.</p>
      <h3>Seguridad con baterías de litio</h3>
      <p>La Asociación Nacional de Protección contra el Fuego (NFPA) explica que, si están dañadas o se usan mal, pueden sobrecalentarse, incendiarse o explotar. Sus consejos:</p>
      <ul>
        <li>Compra aparatos y baterías probados por un laboratorio reconocido y sigue las instrucciones del fabricante.</li>
        <li>Usa solo la batería y el cable de carga hechos para ese aparato.</li>
        <li>No cargues nada debajo de una almohada, en la cama o en un sillón, ni lo sigas cargando cuando ya se llenó.</li>
        <li>No empieces a cargar a menos de 0 °C ni a más de 40 °C, y guárdalas lejos de lo que pueda arder.</li>
        <li>No las tires a la basura: llévalas a un lugar de reciclaje.</li>
      </ul>
      <p>La NFPA pide dejar de usar la batería si notas olor, cambio de color, demasiado calor, que se deforma o se hincha, que gotea o que hace ruidos raros. Si es seguro, aléjala de lo que pueda arder y llama al número de emergencias de tu país (en muchos, el 911).</p>
      <p class="nota"><strong>Trampa común:</strong> calcular la batería con su capacidad total. Si solo puedes usar la mitad, tendrás la mitad de las horas de luz que esperabas.</p>`,
    ejemplo: `
      <p>Tu casa usa 1.2 kWh al día y quieres que la batería aguante 2 días sin sol. Si tus baterías admiten una profundidad de descarga del 50%, ¿qué capacidad total necesitas, y cuántas baterías de 12 V y 100 Ah son?</p>
      <ol class="pasos-ej">
        <li>Primero calcula la energía útil para 2 días: 1.2 × 2 = 2.4 kWh, es decir, 2 400 Wh.</li>
        <li>Como solo puedes usar el 50%, divide entre 0.5: 2 400 ÷ 0.5 = 4 800 Wh de capacidad total.</li>
        <li>Cada batería guarda 12 × 100 = 1 200 Wh.</li>
        <li>Divide: 4 800 ÷ 1 200 = 4 baterías.</li>
        <li>Comprueba: 4 baterías guardan 4 800 Wh; la mitad, 2 400 Wh, alcanza para 2 días de 1 200 Wh.</li>
      </ol>
      <p>Resultado: <span class="resultado">4 800 Wh, es decir, 4 baterías de 12 V y 100 Ah</span>.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar por 0.5 en lugar de dividir. Así te saldrían 1 200 Wh, la cuarta parte de lo que necesitas.</p>`,
    vidaReal: `
      <p>Entender las baterías te ayuda a tener energía cuando más la necesitas:</p>
      <ul>
        <li>Puedes calcular cuántas horas de luz te dará una batería en un apagón.</li>
        <li>Compras la batería del tamaño correcto, sin quedarte corto ni pagar de más.</li>
        <li>Haces que tus baterías duren más años.</li>
        <li>Evitas incendios por cargar mal un teléfono, una bicicleta eléctrica o una batería grande.</li><li>Sabes qué señales indican que una batería puede incendiarse.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una batería es de 12 V y 200 Ah. ¿Cuántos Wh guarda?</p>', respuesta: 12 * 200,
        pista: '<p>Multiplica el voltaje por los amperes-hora.</p>',
        solucion: '<p>12 × 200 = <strong>2 400 Wh</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una batería de 2 000 Wh admite una profundidad de descarga del 80%. ¿Cuántos Wh puedes usar?</p>', respuesta: 2000 * 0.8,
        pista: '<p>Calcula el 80% de 2 000.</p>',
        solucion: '<p>2 000 × 0.8 = <strong>1 600 Wh</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Dónde conviene poner las baterías de plomo-ácido?</p>',
        opciones: ['En un lugar ventilado, sin equipo eléctrico encima', 'En la recámara, para cuidarlas', 'En un clóset cerrado'], correcta: 0,
        pista: '<p>Sueltan hidrógeno al cargarse.</p>',
        solucion: '<p><strong>En un lugar ventilado</strong>, para que el hidrógeno no se acumule y sin chispas cerca.</p>' },
      { tipo: 'opciones', enunciado: '<p>La batería de tu bicicleta eléctrica se hinchó y huele raro. Según la NFPA, ¿qué haces?</p>',
        opciones: ['La sigues usando con cuidado', 'La cargas para ver si se arregla', 'Dejas de usarla, la alejas de lo que arde si es seguro y llamas a emergencias'], correcta: 2,
        pista: '<p>Son señales de que puede incendiarse.</p>',
        solucion: '<p><strong>Dejar de usarla y llamar a emergencias.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué hace el controlador de carga?</p>',
        opciones: ['Convierte la corriente directa en alterna', 'Evita que la batería se cargue de más y, en muchos modelos, que se vacíe demasiado', 'Produce electricidad con el sol'], correcta: 1,
        pista: '<p>Va entre los paneles y la batería.</p>',
        solucion: '<p><strong>Cuida la carga de la batería</strong> para que dure más.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el porcentaje de la capacidad de una batería que puedes usar sin dañarla?</p>',
        respuestas: ['profundidad de descarga', 'la profundidad de descarga'],
        pista: '<p>Dice qué tan "hondo" puedes vaciarla.</p>',
        solucion: '<p>La <strong>profundidad de descarga</strong>.</p>' },
    ],
    fuentes: [NFPALITIO, NFPALITIOPDF, PACIFICO, DOEGUIA],
  });

  // ------------------------------------------------------------------
  L('Energía eólica e hidráulica a pequeña escala', {
    objetivo: 'Entender cómo el viento y el agua que cae pueden producir electricidad en una casa o un rancho, y qué condiciones hacen falta antes de invertir.',
    explicacion: `
      <p>En muchos ranchos, un molino de viento sube el agua del pozo, y desde hace siglos los molinos de agua muelen grano. La idea es la misma que se usa hoy para producir electricidad: el viento o el agua hacen girar algo, y ese giro se convierte en energía.</p>
      <h3>Del giro a la electricidad</h3>
      <p>En Física, en "Electromagnetismo e inducción", viste que un imán en movimiento cerca de un alambre produce electricidad. Un generador hace justo eso: tiene imanes y bobinas de alambre que giran. Lo que cambia es qué lo hace girar. El DOE explica que en una turbina de viento el viento mueve unas aspas, las aspas giran un eje, y el eje mueve el generador.</p>
      <h3>Aerogeneradores pequeños</h3>
      <p>Un <strong>aerogenerador</strong> es una turbina que produce electricidad con el viento. El DOE explica que la cantidad de electricidad depende del tamaño de la turbina y de la velocidad del viento. Los de casa suelen ser de 5 a 30 kW. Pero no cualquier lugar sirve. El DOE da estas condiciones para que valga la pena:</p>
      <ul>
        <li>Tener al menos un acre de terreno, unos 4 000 metros cuadrados.</li>
        <li>Vivir donde el viento promedio del año sea de al menos 10 millas por hora, unos 16 km/h.</li>
        <li>Poner la turbina en una torre más alta que los obstáculos cercanos, como edificios y árboles. Las torres suelen medir de 60 a 140 pies, unos 18 a 43 metros.</li>
      </ul>
      <p>Fíjate en la torre. Cerca del suelo, los árboles y las casas frenan y revuelven el viento. Por eso un aerogenerador en el techo de una casa casi nunca produce lo que promete.</p>
      <p>Antes de comprar uno, conviene medir el viento de tu terreno durante un tiempo, o buscar los datos de viento de tu región. Además, un aerogenerador es una estructura alta con piezas que giran: su instalación debe hacerla gente con experiencia, con los permisos de tu localidad.</p>
      <h3>Microhidráulica</h3>
      <p>La <strong>microhidráulica</strong> es producir electricidad con un pequeño arroyo o canal que pasa por tu terreno. La EIA explica que la energía disponible depende de dos cosas: cuánta agua pasa, el caudal, y cuánto baja el agua de un punto a otro, que se llama la caída. Mientras más agua y más caída, más electricidad.</p>
      <p>La Extensión de la Universidad de Wyoming explica que se puede aprovechar una caída de apenas tres pies, menos de un metro, pero que en general hace falta mucha agua o una caída de al menos diez pies, unos 3 metros, para que el sistema valga la pena. El agua se desvía por un tubo desde arriba, mueve una turbina y regresa al arroyo más abajo.</p>
      <p>Una ventaja grande: el agua corre de día y de noche. Por eso un buen arroyo puede dar energía todo el día, cosa que el sol no puede.</p>
      <h3>El agua no es solo tuya</h3>
      <p>Wyoming insiste en un punto: que el agua pase por tu terreno no siempre te da derecho a usarla, ni siquiera para devolverla al arroyo. En muchos lugares hace falta un permiso, y el trámite puede tardar de 3 a 24 meses o más. También explica que los sistemas que solo desvían una parte del agua del río afectan mucho menos a los peces y a la calidad del agua que las presas. Deja siempre agua suficiente en el arroyo para los animales, las plantas y tus vecinos de río abajo.</p>
      <h3>¿Cuál conviene?</h3>
      <p>Depende de tu lugar. Si tienes mucho sol, los paneles suelen ser lo más sencillo. Si tienes un arroyo con buena caída, la microhidráulica puede ser excelente. Si tienes viento fuerte y constante y terreno amplio, un aerogenerador. Muchas veces se combinan: el DOE menciona que el viento puede integrarse con paneles y baterías.</p>
      <p class="nota"><strong>Trampa común:</strong> poner un aerogenerador pequeño en el techo, entre casas y árboles. Ahí el viento es débil y revuelto, y produce muy poco.</p>`,
    ejemplo: `
      <p>Quieres saber si tu terreno sirve para un aerogenerador. Mide unos 3 000 metros cuadrados, el viento promedio es de unos 20 km/h y los árboles más altos miden 15 metros. Compáralo con las condiciones del DOE.</p>
      <ol class="pasos-ej">
        <li>Primero el terreno: el DOE pide al menos un acre, unos 4 000 m². Tu terreno tiene 3 000 m², menos de lo recomendado.</li>
        <li>Luego el viento: el DOE pide al menos 16 km/h de promedio. Tus 20 km/h sí cumplen.</li>
        <li>Después la torre: debe ser más alta que los obstáculos. Con árboles de 15 m, una torre de 18 m o más, dentro del rango de 18 a 43 m, quedaría por encima.</li>
        <li>Comprueba contando: cumples 2 de las 3 condiciones; falta terreno.</li>
      </ol>
      <p>Resultado: <span class="resultado">el viento alcanza, pero el terreno es pequeño</span>. Conviene consultar a un instalador o pensar en paneles solares.</p>
      <p class="nota"><strong>Error común:</strong> fijarse solo en el viento y olvidar el espacio para la torre y su seguridad.</p>`,
    vidaReal: `
      <p>Conocer estas opciones te ayuda a aprovechar lo que tiene tu terreno:</p>
      <ul>
        <li>Sabes si tu viento o tu arroyo pueden darte electricidad.</li>
        <li>Evitas comprar un aerogenerador que en tu casa no produciría casi nada.</li>
        <li>Puedes tener energía también de noche con un buen arroyo.</li>
        <li>Respetas el agua de tus vecinos y de los animales del río.</li><li>Sabes qué datos pedir antes de gastar dinero en un sistema así.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>El DOE pide un viento promedio de al menos 10 millas por hora. Si una milla son 1.6 km, ¿cuántos km/h son?</p>', respuesta: 10 * 1.6,
        pista: '<p>Multiplica las millas por 1.6.</p>',
        solucion: '<p>10 × 1.6 = <strong>16 km/h</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Wyoming dice que en general hace falta una caída de al menos 10 pies. Si un pie mide 0.3 metros, ¿cuántos metros son?</p>', respuesta: 10 * 0.3,
        pista: '<p>Multiplica los pies por 0.3.</p>',
        solucion: '<p>10 × 0.3 = <strong>3 metros</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la EIA, ¿de qué dos cosas depende la energía de un arroyo?</p>',
        opciones: ['Del color y la temperatura del agua', 'De cuánta agua pasa y de cuánto baja', 'De los peces y las piedras'], correcta: 1,
        pista: '<p>Son el caudal y la caída.</p>',
        solucion: '<p><strong>Del caudal y de la caída</strong>: más agua y más caída dan más electricidad.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el aerogenerador va en una torre alta?</p>',
        opciones: ['Para que se vea de lejos', 'Para que no lo alcancen los niños', 'Porque arriba de los árboles y las casas el viento es más fuerte y parejo'], correcta: 2,
        pista: '<p>Cerca del suelo, los obstáculos frenan el viento.</p>',
        solucion: '<p><strong>Arriba de los obstáculos el viento es mejor.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Por tu terreno pasa un arroyo. Según Wyoming, ¿puedes usarlo para producir electricidad sin más?</p>',
        opciones: ['No siempre: en muchos lugares hace falta un permiso', 'Sí, porque pasa por tu terreno', 'Sí, si lo usas solo de noche'], correcta: 0,
        pista: '<p>Que el agua pase por tu terreno no te da derecho a usarla.</p>',
        solucion: '<p><strong>No siempre</strong>: muchas veces hace falta un permiso de agua.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama una turbina que produce electricidad con el viento?</p>',
        respuestas: ['aerogenerador', 'un aerogenerador', 'turbina eolica', 'aerogeneradores'],
        pista: '<p>"Aero" tiene que ver con el aire.</p>',
        solucion: '<p>Un <strong>aerogenerador</strong>.</p>' },
    ],
    fuentes: [DOEGUIA, WYO, EIA('energyexplained/hydropower/', 'Hydropower explained'), EIA('energyexplained/wind/', 'Wind explained')],
  });

  // ------------------------------------------------------------------
  const CALENTADOR = diagrama([0, 13], [-0.6, 8.6], [
    { tipo: 'poligono', puntos: [[0.8, 0.8], [1.8, 0.4], [5.6, 4.2], [4.6, 4.6]], relleno: true },
    txt(2.2, -0.2, 'colector'),
    caja(8, 5, 12, 8), txt(10, 6.5, 'tanque'),
    ...flecha([5.2, 4.7], [8, 7.2], 1), txt(4.8, 6.6, 'agua caliente sube'),
    ...flecha([8, 5.4], [2.3, 0.75], 0), txt(8.6, 2.6, 'agua fría baja'),
  ], 'Un colector inclinado abajo a la izquierda y un tanque más arriba a la derecha. Una flecha lleva el agua caliente desde la parte alta del colector hacia arriba, al tanque. Otra flecha regresa el agua fría desde el fondo del tanque hacia abajo, a la parte baja del colector.');

  L('Calentador solar de agua', {
    objetivo: 'Entender cómo un calentador solar calienta el agua sin bomba, cuánto puede ahorrar y qué cuidados necesita.',
    explicacion: `
      <p>Una manguera que se queda al sol en el patio da agua caliente durante los primeros segundos. El sol calentó el agua que había adentro. Un calentador solar aprovecha esa misma idea, pero de forma ordenada: atrapa el calor del sol y guarda el agua caliente para cuando la necesitas.</p>
      <h3>Por qué vale la pena</h3>
      <p>En la primera lección viste que, según la EIA, calentar agua fue el 12% de la electricidad de las casas de Estados Unidos en 2020. En muchas casas de América Latina el agua se calienta con gas o leña, y también es un gasto grande. El DOE explica que un calentador solar puede cubrir el 50% del agua caliente de una familia de cuatro personas, y que una casa típica reduce al menos a la mitad lo que gasta en calentar agua, y mucho más en lugares con mucho sol.</p>
      <h3>Las dos partes</h3>
      <p>El DOE explica que un calentador solar tiene dos partes principales:</p>
      <ul>
        <li>El <strong>colector solar</strong>, que es la parte que recibe el sol. Suele ser una caja oscura con tapa de vidrio, o una fila de tubos de vidrio, por donde pasa el agua o un líquido que se calienta.</li>
        <li>El tanque, que guarda el agua caliente. Está aislado, como un termo, para que no se enfríe.</li>
      </ul>
      ${CALENTADOR}
      <h3>Sin bomba: el termosifón</h3>
      <p>En Física, en "Conducción, convección y radiación", viste que el agua caliente pesa menos que la fría y por eso sube. Muchos calentadores solares aprovechan eso. El colector se pone más abajo que el tanque. Cuando el sol calienta el agua del colector, esa agua sube sola al tanque, y el agua fría del fondo del tanque baja al colector para calentarse. Así el agua da vueltas sin bomba ni electricidad. A ese movimiento se le llama <strong>termosifón</strong>. Fíjate en el dibujo: si el tanque quedara más abajo que el colector, el agua caliente no podría subir y el sistema no funcionaría.</p>
      <h3>Dónde ponerlo</h3>
      <p>El DOE explica que, en el hemisferio norte, la mejor orientación para el colector es hacia el sur, igual que los paneles solares. Debe quedar donde no le den sombras durante el día.</p>
      <h3>Los días nublados</h3>
      <p>El DOE indica que los calentadores solares necesitan un respaldo, como un calentador de gas o eléctrico, para cuando no hay suficiente sol. Muchos sistemas ya lo traen integrado.</p>
      <h3>Cuidados</h3>
      <ul>
        <li>Heladas: si el agua se congela dentro del colector, lo puede reventar. ENERGY STAR explica que, si es probable que la temperatura baje de unos 5.6 °C (42 °F), conviene un sistema que use anticongelante en un circuito cerrado o que se vacíe solo cuando hace frío.</li>
        <li>Quemaduras: en días de mucho sol el agua puede salir muy caliente. La Extensión de la Universidad de Florida indica que unos 49 °C (120 °F) es la temperatura ideal del agua caliente de una casa, y que más caliente aumenta el riesgo de quemaduras. Prueba el agua antes de meter las manos, y más si bañas a niñas o niños pequeños. Si alguien se quema, enfría la quemadura con agua y busca atención médica; lo verás en la unidad Salud y primeros auxilios.</li>
        <li>Mantenimiento: el DOE indica que en los sistemas sencillos puede bastar con revisarlos cada 3 a 5 años, de preferencia con un técnico.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> poner el tanque de un sistema de termosifón más abajo que el colector. El agua caliente necesita poder subir.</p>`,
    ejemplo: `
      <p>Una familia gasta 400 pesos al mes en gas para calentar agua. Si un calentador solar reduce ese gasto a la mitad, como estima el DOE para una casa típica, ¿cuánto ahorran en un año?</p>
      <ol class="pasos-ej">
        <li>Primero calcula el ahorro de un mes: la mitad de 400 es 400 ÷ 2 = 200 pesos.</li>
        <li>Luego multiplica por los 12 meses: 200 × 12 = 2 400 pesos al año.</li>
        <li>Comprueba de otra forma: al año gastan 400 × 12 = 4 800 pesos, y la mitad es 2 400.</li>
        <li>Recuerda que en temporada nublada el respaldo de gas trabajará más, así que algunos meses ahorrarán menos y otros más.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 2 400 pesos al año</span>. El ahorro real depende del sol de tu región y de cuánta agua caliente usen.</p>
      <p class="nota"><strong>Error común:</strong> esperar que el respaldo de gas nunca se use. El DOE indica que siempre hace falta uno para los días sin sol.</p>`,
    vidaReal: `
      <p>Un calentador solar es de los cambios que más se notan en casa:</p>
      <ul>
        <li>Gastas mucho menos gas, leña o electricidad para bañarte.</li>
        <li>Tienes agua caliente aunque falle la luz, si tu sistema funciona sin bomba.</li>
        <li>Sabes cómo protegerlo de las heladas y cuándo darle mantenimiento.</li>
        <li>Evitas quemaduras cuidando la temperatura del agua.</li><li>Puedes revisar si el lugar de tu casa sirve para un sistema sin bomba.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una familia usa 160 litros de agua caliente al día. Si el calentador solar cubre el 50%, ¿cuántos litros calienta el sol?</p>', respuesta: 160 * 0.5,
        pista: '<p>Calcula la mitad.</p>',
        solucion: '<p>160 × 0.5 = <strong>80 litros</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>La Extensión de la Universidad de Florida da 120 °F como temperatura ideal del agua. Si °C = (°F − 32) ÷ 1.8, ¿cuántos °C son? Redondea al entero.</p>', respuesta: (120 - 32) / 1.8, tolerancia: 0.6,
        pista: '<p>Resta 32 y divide entre 1.8.</p>',
        solucion: '<p>(120 − 32) ÷ 1.8 = 88 ÷ 1.8 ≈ <strong>49 °C</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>En un sistema de termosifón, ¿dónde va el tanque?</p>',
        opciones: ['Más arriba que el colector', 'Más abajo que el colector', 'Dentro del colector'], correcta: 0,
        pista: '<p>El agua caliente sube.</p>',
        solucion: '<p><strong>Más arriba que el colector</strong>, para que el agua caliente suba sola.</p>' },
      { tipo: 'opciones', enunciado: '<p>Vives donde a veces hiela. Según ENERGY STAR, ¿qué tipo de sistema conviene?</p>',
        opciones: ['Cualquiera, el sol lo protege', 'Uno sin tanque', 'Uno con anticongelante en circuito cerrado, o que se vacíe solo con el frío'], correcta: 2,
        pista: '<p>El agua congelada puede reventar el colector.</p>',
        solucion: '<p><strong>Con anticongelante o que se vacíe solo</strong>, para que no se congele el agua.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué un calentador solar necesita un respaldo de gas o eléctrico?</p>',
        opciones: ['Para que el agua salga fría', 'Para los días en que no hay suficiente sol', 'Porque el sol daña el tanque'], correcta: 1,
        pista: '<p>Piensa en los días nublados.</p>',
        solucion: '<p><strong>Para los días sin suficiente sol.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la parte del calentador que recibe el sol y calienta el agua?</p>',
        respuestas: ['colector solar', 'colector', 'el colector', 'el colector solar', 'captador solar', 'captador'],
        pista: '<p>"Colecta" el calor del sol.</p>',
        solucion: '<p>El <strong>colector solar</strong>.</p>' },
    ],
    fuentes: [DOEGUIA, BSESC, ESTAR('solar_water_heaters', 'Solar Water Heaters'), UFIFAS, WIKI('Termosif%C3%B3n', 'Termosifón')],
  });

  // ------------------------------------------------------------------
  L('Cocina y deshidratador solar', {
    objetivo: 'Entender cómo un horno solar atrapa el calor del sol, usarlo sin dejar la comida en temperaturas peligrosas y secar alimentos con el sol.',
    explicacion: `
      <p>Un coche cerrado al sol se pone muy caliente por dentro, aunque afuera haga fresco. La luz entra por los vidrios, calienta los asientos y el calor ya no sale. Un horno solar es una caja que hace eso a propósito, para cocinar.</p>
      <h3>Tres ideas: reflejar, absorber y atrapar</h3>
      <p>El Departamento de Energía de Estados Unidos tiene una guía para construir un horno solar sencillo con una caja de pizza. Muestra las tres ideas que usa cualquier horno solar:</p>
      <ul>
        <li>Reflejar: una tapa forrada de papel aluminio manda más luz del sol hacia adentro de la caja.</li>
        <li>Absorber: el fondo se cubre de papel negro, porque lo negro absorbe la luz y se calienta. Como viste en Física, en "Conducción, convección y radiación", el sol calienta por radiación.</li>
        <li>Atrapar: una ventana de plástico transparente bien estirada deja entrar la luz, y el periódico enrollado en las orillas sirve de aislante, para que el calor no se escape. La guía pone dos capas de plástico, porque el aire entre ellas también aísla.</li>
      </ul>
      <p>Así funciona un <strong>horno solar</strong>: una caja que refleja, absorbe y atrapa el calor del sol para calentar o cocinar. Para usarlo, se pone al sol del mediodía, con la tapa de aluminio acomodada para que la luz entre a la caja, y se va girando para seguir al sol.</p>
      <h3>Lo que puede y lo que no</h3>
      <p>La misma guía es honesta: su caja de pizza calienta galletas o malvaviscos, pero no se pone lo bastante caliente para hornear. Hay hornos solares mejor aislados y con más reflectores que sí cocinan frijoles, arroz o guisos, pero tardan más que una estufa y dependen del sol.</p>
      <h3>La comida no puede quedarse tibia</h3>
      <p>Aquí está el riesgo. En "Cocinar con poca energía" viste que, según Penn State, entre 4 y 60 °C los microbios crecen activamente. Un horno solar que no calienta lo suficiente, o una nube que tapa el sol a medio cocinar, puede dejar la comida horas en esa zona. Por eso:</p>
      <ul>
        <li>Empieza temprano, con el sol fuerte, y no cocines carne ni pollo en un horno que no conoces.</li>
        <li>Usa un termómetro de cocina: la comida debe estar humeante y pasar de 60 °C.</li>
        <li>Si se nubla y la comida se queda tibia, termínala en la estufa hasta que hierva.</li>
        <li>Usa agarraderas: la olla y el interior del horno queman. No mires de frente el reflejo del aluminio.</li>
      </ul>
      <h3>El deshidratador solar</h3>
      <p>En "Conservar alimentos: secado, fermentado y encurtido" viste que, según Penn State, para secar hacen falta calor y aire que se mueva, y que el secado al sol funciona en climas calurosos y secos. Un <strong>deshidratador solar</strong> es una caja que junta las dos cosas: tiene una parte oscura y tapada con plástico o vidrio que calienta el aire, y unas rejillas con la fruta o la verdura por donde ese aire caliente pasa y sale, llevándose la humedad.</p>
      <p>Comparado con dejar la fruta al aire libre, el deshidratador la protege del polvo, la lluvia y los insectos, y calienta más el aire. Las rejillas de entrada y salida deben llevar tela mosquitera. Como en el secado al sol, la fruta seca se guarda en frascos herméticos en un lugar fresco y oscuro.</p>
      <p class="nota"><strong>Trampa común:</strong> dejar el guiso en el horno solar toda la tarde aunque ya se fue el sol. La comida se enfría y pasa horas en la zona peligrosa.</p>`,
    ejemplo: `
      <p>Metes un guiso al horno solar a las 10 de la mañana. A las 12 el termómetro marca 75 °C, a las 2 de la tarde se nubla y a las 3 marca 50 °C. ¿Qué haces?</p>
      <ol class="pasos-ej">
        <li>Primero revisa las 12: 75 °C está por encima de los 60 °C de Penn State, así que la comida está fuera de la zona peligrosa.</li>
        <li>Luego revisa las 3: 50 °C está entre 4 y 60 °C, dentro de la zona donde crecen los microbios.</li>
        <li>No sabes cuánto tiempo lleva tibio desde que se nubló, así que no conviene servirlo así.</li>
        <li>Pásalo a la estufa y caliéntalo hasta que hierva antes de comer.</li>
        <li>Comprueba con el termómetro: humeante y por encima de 60 °C.</li>
      </ol>
      <p>Resultado: <span class="resultado">recalentarlo en la estufa hasta que hierva</span>.</p>
      <p class="nota"><strong>Error común:</strong> confiar en que "estuvo caliente un rato". Lo que cuenta es la temperatura cuando lo vas a comer.</p>`,
    vidaReal: `
      <p>Usar el sol para cocinar y secar alimentos te da opciones:</p>
      <ul>
        <li>Calientas comida sin gastar gas ni leña en los días soleados.</li>
        <li>Puedes hacer un horno sencillo con una caja de cartón y aluminio.</li>
        <li>Secas la fruta de tu huerto protegida del polvo y los insectos.</li>
        <li>Sabes cuándo la comida está segura y cuándo hay que terminarla en la estufa.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>La guía del DOE pide un aislante de periódico de 1 a 1½ pulgadas de grueso. Si una pulgada son 2.5 cm, ¿cuántos centímetros son 1½ pulgadas?</p>', respuesta: 1.5 * 2.5,
        pista: '<p>Multiplica 1.5 por 2.5.</p>',
        solucion: '<p>1.5 × 2.5 = <strong>3.75 cm</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu guiso marca 48 °C. ¿Cuántos grados le faltan para pasar de los 60 °C?</p>', respuesta: 60 - 48,
        pista: '<p>Resta.</p>',
        solucion: '<p>60 − 48 = <strong>12 °C</strong>. Mientras tanto, está en la zona peligrosa.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el fondo del horno solar se pinta o se cubre de negro?</p>',
        opciones: ['Porque lo negro absorbe la luz y se calienta', 'Para que no se ensucie', 'Porque refleja la luz'], correcta: 0,
        pista: '<p>Piensa en una camiseta negra al sol.</p>',
        solucion: '<p><strong>Lo negro absorbe la luz</strong> y la convierte en calor.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve el plástico transparente en la ventana del horno?</p>',
        opciones: ['Para que no entre la luz', 'Para que entre la luz y el calor no se escape', 'Para que la caja pese menos'], correcta: 1,
        pista: '<p>Es como el vidrio del coche cerrado al sol.</p>',
        solucion: '<p><strong>Deja entrar la luz y atrapa el calor.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué dos cosas necesita un deshidratador solar para secar, según Penn State?</p>',
        opciones: ['Agua y sal', 'Frío y oscuridad', 'Calor y aire que se mueva'], correcta: 2,
        pista: '<p>El calor saca el agua y el aire se la lleva.</p>',
        solucion: '<p><strong>Calor y aire en movimiento.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama una caja que refleja, absorbe y atrapa el calor del sol para cocinar?</p>',
        respuestas: ['horno solar', 'un horno solar', 'cocina solar', 'una cocina solar', 'estufa solar'],
        pista: '<p>Es un horno que funciona con el sol.</p>',
        solucion: '<p>Un <strong>horno solar</strong>.</p>' },
    ],
    fuentes: [EERE, PSU('el-secado-de-frutas-y-vegetales-deshidratacion', 'El secado de frutas y vegetales'), PSU('aspectos-basicos-de-la-preparacion-de-conservas-en-casa', 'Aspectos básicos de la preparación de conservas en casa'), WIKI('Cocina_solar', 'Cocina solar')],
  });

  // ------------------------------------------------------------------
  const BIODIGESTOR = diagrama([0, 16], [-1.4, 7.4], [
    caja(0.4, 3, 2.8, 4.6), txt(1.6, 5.2, 'estiércol y agua'),
    ...flecha([2.9, 3.8], [4.2, 2.6]),
    { tipo: 'poligono', puntos: Array.from({ length: 36 }, (_, i) => [8 + 3.6 * Math.cos((i * Math.PI) / 18), 2.2 + 1.6 * Math.sin((i * Math.PI) / 18)]), relleno: true },
    txt(8, 2.2, 'biodigestor'),
    ...flecha([8, 3.9], [8, 5.6]), txt(8, 6.3, 'biogás a la cocina'),
    ...flecha([11.7, 1.6], [13, 0.6]), txt(13.6, -0.6, 'digestato: abono'),
  ], 'A la izquierda, una pileta con estiércol y agua; una flecha la lleva a una bolsa alargada, el biodigestor. Del biodigestor sale una flecha hacia arriba, el biogás que va a la cocina, y otra hacia abajo a la derecha, el digestato, que se usa como abono.');

  L('Biodigestor: gas a partir de residuos', {
    objetivo: 'Entender cómo un biodigestor convierte el estiércol en gas para cocinar y en abono, y conocer los peligros de sus gases.',
    explicacion: `
      <p>Si alguna vez pasaste junto a un charco de estiércol o un drenaje tapado, habrás notado burbujas y olor a huevo podrido. Son gases que producen unos microbios cuando comen materia orgánica sin aire. Un biodigestor encierra ese proceso para aprovechar el gas y no dejarlo escapar.</p>
      <h3>Microbios que trabajan sin aire</h3>
      <p>La Agencia de Protección Ambiental de Estados Unidos (EPA) explica que la digestión anaerobia, que quiere decir "sin aire", es el proceso en que los microorganismos descomponen la materia orgánica, como el estiércol o los restos de comida, en ausencia de oxígeno. Ese proceso produce dos cosas útiles: un gas que arde, y un residuo que sirve de abono, llamado <strong>digestato</strong>.</p>
      <p>En la composta que viste en "El suelo y la composta" pasa algo distinto: ahí los microbios trabajan con aire, y por eso hay que voltearla. En el biodigestor es al revés: todo va cerrado.</p>
      <h3>El biogás</h3>
      <p>El <strong>biogás</strong> es el gas que sale del biodigestor. Un manual de CARE Perú, hecho para familias del altiplano de Puno, explica que tiene entre 60 y 70% de metano, el mismo gas del gas natural, entre 30 y 40% de dióxido de carbono y cerca de 1% de sulfuro de hidrógeno, que es el que le da el olor a huevo podrido. El metano es lo que arde, y con él se cocina en una estufa especial para biogás.</p>
      ${BIODIGESTOR}
      <h3>Cómo funciona</h3>
      <p>Un <strong>biodigestor</strong> es un tanque o una bolsa grande y cerrada donde se mete estiércol con agua para que los microbios produzcan biogás. El de CARE Perú es una bolsa larga de plástico enterrada en una zanja:</p>
      <ol>
        <li>Por un tubo se carga la mezcla: CARE Perú usa una parte de estiércol por tres de agua.</li>
        <li>Adentro, los microbios trabajan durante semanas. Con calor trabajan más rápido: el manual da unos 20 días a 30 °C, 30 días a 20 °C y 60 días a 10 °C.</li>
        <li>El biogás se junta arriba y sale por una manguera hacia la cocina.</li>
        <li>Por otro tubo sale el digestato. En Perú le llaman biol a la parte líquida, que se usa como abono para las hojas, y biosol a la parte sólida, que mejora el suelo.</li>
      </ol>
      <p>Por eso, en lugares fríos, el manual de CARE Perú pone el biodigestor bajo un pequeño invernadero, para que se mantenga tibio.</p>
      <h3>Los peligros</h3>
      <p>El biogás es útil, pero sus gases son peligrosos. La Extensión de la Universidad Estatal de Pensilvania (Penn State) explica, para los depósitos de estiércol:</p>
      <ul>
        <li>El sulfuro de hidrógeno huele a huevo podrido en poca cantidad, pero en mucha cantidad apaga el olfato: deja de olerse justo cuando es más peligroso. Es más pesado que el aire y se junta en el fondo.</li>
        <li>El metano no huele, es más ligero que el aire y puede explotar. Penn State pide no tener flamas ni hacer soldaduras cerca.</li>
        <li>Nunca hay que meterse a un tanque o un depósito de estiércol. Penn State reporta 65 muertes en Estados Unidos entre 1975 y 2004 de personas que entraron, entre ellas rescatistas que intentaban sacar a otra persona.</li>
      </ul>
      <p>Si alguien cae o se desmaya dentro de un tanque o un pozo de estiércol, no entres a sacarlo: llama al número de emergencias de tu país (en muchos, el 911). Los gases que lo desmayaron también te desmayarían a ti.</p>
      <p>El manual de CARE Perú también pide poner en la manguera una válvula de seguridad y una trampa para el agua que se junta, y revisar que no haya fugas antes de usar el gas. Construir un biodigestor es un proyecto que conviene hacer con asesoría de alguien con experiencia.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que, si ya no huele a huevo podrido, ya no hay gas. El sulfuro de hidrógeno apaga el olfato cuando hay mucho.</p>`,
    ejemplo: `
      <p>Vas a cargar el biodigestor con 20 kg de estiércol. Con la proporción de CARE Perú, una parte de estiércol por tres de agua, ¿cuánta agua agregas, y cuánto tardará si la temperatura es de unos 20 °C?</p>
      <ol class="pasos-ej">
        <li>Primero calcula el agua: tres partes por cada parte de estiércol, así que 20 × 3 = 60 kg de agua, unos 60 litros.</li>
        <li>Suma la mezcla total: 20 + 60 = 80 kg.</li>
        <li>Luego busca el tiempo en el manual: a 20 °C, unos 30 días.</li>
        <li>Comprueba la proporción: 60 ÷ 20 = 3, es decir, tres de agua por una de estiércol.</li>
      </ol>
      <p>Resultado: <span class="resultado">60 litros de agua y unos 30 días a 20 °C</span>. En la sierra fría tardaría el doble.</p>
      <p class="nota"><strong>Error común:</strong> poner tres partes de estiércol por una de agua. La mezcla queda muy espesa y no fluye por los tubos.</p>`,
    vidaReal: `
      <p>Un biodigestor convierte un problema en un recurso:</p>
      <ul>
        <li>El estiércol de tus animales se vuelve gas para cocinar.</li>
        <li>Obtienes abono líquido y sólido para tu huerto.</li>
        <li>Aprovechas un residuo que antes se desperdiciaba en el corral.</li>
        <li>Sabes por qué nunca hay que entrar a un tanque de estiércol y qué hacer si alguien cae dentro.</li><li>Entiendes por qué conviene pedir asesoría antes de construir uno.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Con la proporción de CARE Perú, una parte de estiércol por tres de agua, ¿cuántos litros de agua necesitas para 15 kg de estiércol?</p>', respuesta: 15 * 3,
        pista: '<p>Multiplica por 3.</p>',
        solucion: '<p>15 × 3 = <strong>45 litros</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Según el manual, a 10 °C tarda 60 días y a 30 °C, 20 días. ¿Cuántas veces más tarda con frío?</p>', respuesta: 60 / 20,
        pista: '<p>Divide los dos tiempos.</p>',
        solucion: '<p>60 ÷ 20 = <strong>3 veces</strong> más.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué gas del biogás es el que arde y sirve para cocinar?</p>',
        opciones: ['El metano', 'El dióxido de carbono', 'El sulfuro de hidrógeno'], correcta: 0,
        pista: '<p>Es el mismo gas del gas natural.</p>',
        solucion: '<p><strong>El metano</strong>, que es entre 60 y 70% del biogás.</p>' },
      { tipo: 'opciones', enunciado: '<p>Alguien se desmaya dentro de un tanque de estiércol. ¿Qué haces?</p>',
        opciones: ['Entras rápido a sacarlo', 'No entras y llamas al número de emergencias', 'Le echas agua desde arriba'], correcta: 1,
        pista: '<p>Los gases que lo desmayaron también te afectarían a ti.</p>',
        solucion: '<p><strong>No entras y llamas a emergencias.</strong> Entre las víctimas hubo rescatistas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el sulfuro de hidrógeno es tan engañoso?</p>',
        opciones: ['Porque es de color rojo', 'Porque solo aparece de noche', 'Porque en mucha cantidad apaga el olfato y deja de olerse'], correcta: 2,
        pista: '<p>Penn State explica qué pasa con el olor.</p>',
        solucion: '<p><strong>Apaga el olfato</strong> justo cuando hay más.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el gas que sale de un biodigestor?</p>',
        respuestas: ['biogas', 'el biogas'],
        pista: '<p>"Bio" más "gas".</p>',
        solucion: '<p>El <strong>biogás</strong>.</p>' },
    ],
    fuentes: [EPA_AD, CARE, PSUGAS, WIKI('Biodigestor', 'Biodigestor')],
  });

  // ------------------------------------------------------------------
  L('Leña y carbón: usarlos sin acabar con el bosque', {
    objetivo: 'Usar la leña y el carbón vegetal de forma que el bosque se mantenga, y saber por qué hacer carbón gasta mucha más madera de la que parece.',
    explicacion: `
      <p>Una familia que cocina con leña puede quemar varios kilos al día. Multiplicado por todas las familias de un pueblo y por todos los días del año, es mucha madera. Si se saca más de la que el bosque produce, cada año hay que caminar más lejos para encontrar leña. La leña puede ser una energía que se renueva, pero solo si se usa bien.</p>
      <h3>Una energía que puede renovarse</h3>
      <p>El cuaderno de la UNAM sobre estufas de leña explica que la leña tiene ventajas: está cerca, es accesible y puede renovarse, porque los árboles vuelven a crecer. Pero también advierte que, quemada en fogones abiertos, daña la salud, como viste en "Estufas eficientes y el peligro del humo dentro de casa", y que su uso contribuye a la deforestación y a la degradación del bosque cuando se saca más de lo que crece.</p>
      <p>El <strong>uso sustentable</strong> de un recurso es usarlo sin agotarlo: tomar como mucho lo que se repone, para que también haya mañana y para las siguientes generaciones.</p>
      <h3>Gastar menos leña</h3>
      <p>La forma más directa de cuidar el bosque es necesitar menos leña:</p>
      <ul>
        <li>Usar una estufa eficiente. En la unidad Fuego y calor viste que, según la UNAM, ahorran entre el 30% y el 60% de la leña.</li>
        <li>Usar leña seca. La leña húmeda gasta parte de su energía en evaporar el agua y hace más humo. La Comisión Nacional Forestal de México (CONAFOR), en su manual para hacer carbón, recomienda dejar secar la leña cinco o seis semanas antes de usarla.</li>
        <li>Tapar las ollas, remojar los granos y usar la caja de calor, como viste en "Cocinar con poca energía".</li>
      </ul>
      <h3>Qué madera usar</h3>
      <p>El manual de CONAFOR explica que se pueden aprovechar ramas, trozos y residuos de la tala, lo que queda de aclarar un bosque, y árboles que no sirven para madera, partes que normalmente se desperdician. En el campo, Smokey Bear pide usar leña seca recogida del suelo y no cortar ramas ni árboles, vivos o muertos, porque los árboles muertos en pie son la casa de aves y otros animales.</p>
      <p>Si necesitas cortar árboles, infórmate antes en la oficina forestal de tu región: en muchos países hace falta un permiso, y te pueden orientar sobre qué cortar y cómo replantar.</p>
      <h3>El carbón vegetal</h3>
      <p>El carbón vegetal se hace quemando leña con muy poco aire, para que no se convierta en ceniza sino en carbón. Arde más parejo y casi sin humo, y pesa menos que la leña, así que es más fácil de transportar y vender. Pero tiene un costo escondido.</p>
      <p>El manual de CONAFOR lo explica con números. En los hornos tradicionales de tierra, el rendimiento casi siempre es menor al 20%: hacen falta cinco o seis toneladas de leña para obtener una tonelada de carbón. En los hornos de ladrillo, el rendimiento suele pasar del 25% y puede llegar al 30%, así que bastan tres o cuatro toneladas de leña. Fíjate que, en cualquier caso, cada kilo de carbón cuesta varios kilos de madera.</p>
      <h3>El carbón también es peligroso</h3>
      <p>Que el carbón casi no haga humo no lo vuelve seguro. Como viste en la unidad Fuego y calor, un brasero con carbón produce monóxido de carbono, un gas que no se ve ni se huele. Nunca lo uses en un cuarto cerrado. Si alguien tiene dolor de cabeza, mareo o náusea cerca de un brasero, salgan al aire libre y llamen al número de emergencias de tu país (en muchos, el 911).</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que el carbón ahorra madera porque pesa menos que la leña. Para hacerlo se quemaron varias veces su peso en madera.</p>`,
    ejemplo: `
      <p>Compras 50 kg de carbón al mes. Si se hizo en un horno de tierra, con un rendimiento del 20%, ¿cuánta leña se usó para hacerlo? ¿Y si se hizo en un horno de ladrillo con 30%?</p>
      <ol class="pasos-ej">
        <li>Primero entiende el rendimiento: 20% quiere decir que de cada 100 kg de leña salen 20 kg de carbón.</li>
        <li>Para el horno de tierra, divide el carbón entre el rendimiento: 50 ÷ 0.20 = 250 kg de leña.</li>
        <li>Para el horno de ladrillo: 50 ÷ 0.30 ≈ 167 kg de leña.</li>
        <li>La diferencia es 250 − 167 = 83 kg de leña al mes.</li>
        <li>Comprueba el primero: el 20% de 250 es 250 × 0.20 = 50 kg de carbón.</li>
      </ol>
      <p>Resultado: <span class="resultado">250 kg de leña con horno de tierra y unos 167 kg con horno de ladrillo</span>.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar 50 × 0.20 = 10. Eso sería el carbón que sale de 50 kg de leña, no la leña que se necesita.</p>`,
    vidaReal: `
      <p>Usar bien la leña y el carbón cuida tu bosque y tu salud:</p>
      <ul>
        <li>Gastas menos leña y caminas menos para conseguirla.</li>
        <li>Tu bosque sigue dando leña, sombra y agua por muchos años.</li>
        <li>Sabes cuánta madera hay detrás de cada costal de carbón.</li>
        <li>Evitas el monóxido de carbono usando el brasero solo al aire libre.</li><li>Puedes comparar cuánta madera gasta cada forma de cocinar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En un horno de ladrillo con rendimiento del 25%, ¿cuántos kg de carbón salen de 400 kg de leña?</p>', respuesta: 400 * 0.25,
        pista: '<p>Calcula el 25% de 400.</p>',
        solucion: '<p>400 × 0.25 = <strong>100 kg</strong> de carbón.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu familia usa 12 kg de leña al día. Con una estufa eficiente que ahorra el 40%, ¿cuántos kg ahorran en 30 días?</p>', respuesta: 12 * 0.4 * 30,
        pista: '<p>Calcula el ahorro de un día y multiplícalo por 30.</p>',
        solucion: '<p>12 × 0.4 = 4.8 kg al día, y 4.8 × 30 = <strong>144 kg</strong> en un mes.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según CONAFOR, ¿cuánta leña hace falta en un horno de tierra para hacer una tonelada de carbón?</p>',
        opciones: ['Media tonelada', 'Una tonelada', 'Cinco o seis toneladas'], correcta: 2,
        pista: '<p>El rendimiento es menor al 20%.</p>',
        solucion: '<p><strong>Cinco o seis toneladas.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué conviene usar leña seca?</p>',
        opciones: ['Porque la húmeda gasta energía en evaporar el agua y hace más humo', 'Porque pesa más', 'Porque arde más lento y da más humo'], correcta: 0,
        pista: '<p>El agua de la leña también hay que calentarla.</p>',
        solucion: '<p><strong>La leña húmeda desperdicia energía y hace más humo.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué significa usar el bosque de forma sustentable?</p>',
        opciones: ['Cortar todo lo que se pueda este año', 'Tomar como mucho lo que el bosque repone', 'No usar nunca leña'], correcta: 1,
        pista: '<p>Que también haya mañana.</p>',
        solucion: '<p><strong>Tomar como mucho lo que se repone.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama usar un recurso sin agotarlo, para que también haya en el futuro?</p>',
        respuestas: ['uso sustentable', 'uso sostenible', 'sustentable', 'sostenible', 'el uso sustentable', 'sustentabilidad', 'sostenibilidad'],
        pista: '<p>Son dos palabras; la segunda empieza con "s".</p>',
        solucion: '<p><strong>Uso sustentable</strong>, o sostenible.</p>' },
    ],
    fuentes: [CONAFOR, UNAM, OMS, SMOKEY, WIKI('Carb%C3%B3n_vegetal', 'Carbón vegetal')],
  });

  // ------------------------------------------------------------------
  L('Seguridad eléctrica en instalaciones caseras', {
    objetivo: 'Reconocer las señales de peligro en una instalación eléctrica, usar extensiones y generadores con seguridad y saber qué hacer si alguien recibe una descarga.',
    explicacion: `
      <p>La electricidad no se ve, no se oye y no huele, hasta que algo sale mal. Un contacto que se calienta, un cable pelado o un generador mojado pueden causar un incendio o una descarga que mata. Por eso, si vas a producir tu propia energía, la seguridad es tan importante como los paneles.</p>
      <h3>Qué le hace la electricidad al cuerpo</h3>
      <p>Una <strong>descarga eléctrica</strong> ocurre cuando la corriente pasa por tu cuerpo. MedlinePlus explica que puede causar quemaduras en la piel y también daños por dentro, en órganos, músculos y nervios, y que puede alterar el ritmo del corazón o detenerlo. Por eso, quien recibe una descarga debe ver a un médico aunque se sienta bien: puede tener daños internos sin darse cuenta.</p>
      <h3>La regla número uno</h3>
      <p>La Asociación Nacional de Protección contra el Fuego (NFPA) lo dice claro: encarga todos los trabajos eléctricos a un electricista calificado. Eso incluye conectar paneles solares, baterías o un generador a la instalación de la casa. Los paneles producen electricidad en cuanto les da la luz, y las baterías guardan mucha energía aunque todo esté apagado.</p>
      <h3>Contactos y extensiones</h3>
      <p>La NFPA da estos consejos:</p>
      <ul>
        <li>Conecta solo un aparato que produzca calor, como una cafetera, una plancha o un calefactor, a cada contacto a la vez.</li>
        <li>Conecta los aparatos grandes, como el refrigerador o la lavadora, directo a la pared, sin extensiones ni multicontactos.</li>
        <li>No pases cables por debajo de puertas o tapetes, donde se maltratan sin que lo veas.</li>
        <li>Usa las extensiones solo de forma temporal.</li>
      </ul>
      <h3>Señales de alarma</h3>
      <p>Según la NFPA, llama a un electricista calificado si notas:</p>
      <ul>
        <li>Que los fusibles se funden o los interruptores se botan seguido.</li>
        <li>Un cosquilleo al tocar un aparato.</li>
        <li>Contactos calientes o con manchas de color.</li>
        <li>Olor a quemado o a hule en un aparato.</li>
        <li>Luces que parpadean o bajan de intensidad.</li>
        <li>Chispas al conectar algo.</li>
      </ul>
      <p>La NFPA también explica que existen <strong>interruptores de falla a tierra</strong>, que cortan la electricidad muy rápido si detectan que la corriente se está escapando, por ejemplo hacia una persona. Se usan para reducir el riesgo de descargas. Pregunta a tu electricista dónde conviene ponerlos.</p>
      <h3>Agua, niños y electricidad</h3>
      <p>MedlinePlus recomienda no usar aparatos eléctricos mientras te bañas o estás mojado, mantener a los niños lejos de los aparatos conectados y poner los cables fuera de su alcance. Entre las causas de descargas, menciona a niños pequeños que muerden cables o meten objetos en los contactos.</p>
      <h3>Generadores</h3>
      <p>En la primera unidad viste que el generador va afuera por el monóxido de carbono. Ready.gov agrega: mantenlo seco y protegido de la lluvia, porque tocar un generador mojado o lo que está conectado a él puede electrocutarte; conecta los aparatos con extensiones resistentes, y deja que se enfríe antes de echarle combustible.</p>
      <h3>Si alguien recibe una descarga</h3>
      <p>MedlinePlus da estos pasos:</p>
      <ol>
        <li>No toques a la persona con las manos si sigue en contacto con la electricidad.</li>
        <li>Si puedes hacerlo de forma segura, corta la corriente: desconecta el cable, quita el fusible o baja el interruptor. Apagar el aparato puede no bastar.</li>
        <li>Llama al número de emergencias de tu país (en muchos, el 911).</li>
        <li>Si no puedes cortar la corriente, separa a la persona con algo seco que no conduzca, como una escoba de madera, una silla o un tapete de hule, parado sobre algo seco. Nunca uses algo mojado o de metal.</li>
        <li>Si son cables de alta tensión, no te acerques a menos de 20 pies, unos 6 metros, hasta que corten la corriente.</li>
      </ol>
      <p>Después, quédate con la persona hasta que llegue la ayuda. Si no respira o no tiene pulso, hacen falta primeros auxilios como la reanimación, que viste en Ciencias naturales, en "Primeros auxilios básicos".</p>
      <p class="nota"><strong>Trampa común:</strong> jalar con las manos a alguien que se está electrocutando. La corriente pasa también a ti, y en lugar de una persona herida habría dos.</p>`,
    ejemplo: `
      <p>En la cocina tienes un multicontacto en una extensión con el refrigerador, la cafetera y el microondas conectados, y el cable pasa debajo del tapete. Según la NFPA, ¿cuántas cosas hay que cambiar?</p>
      <ol class="pasos-ej">
        <li>Primero el refrigerador: es un aparato grande y debe ir directo a la pared, sin extensión. Es un cambio.</li>
        <li>Luego la cafetera y el microondas: los dos producen calor y la NFPA pide uno solo a la vez por contacto. Es otro cambio: cada uno a un contacto distinto, o usarlos por turnos.</li>
        <li>Después el cable bajo el tapete: ahí se maltrata sin que lo veas. Es el tercer cambio.</li>
        <li>Por último, la extensión: la NFPA dice que son para uso temporal, no fijo. Es el cuarto cambio.</li>
        <li>Comprueba revisando la lista de la NFPA punto por punto: cuatro reglas, cuatro cambios.</li>
      </ol>
      <p>Resultado: <span class="resultado">4 cambios</span>. Si el contacto se calienta o tiene manchas, llama a un electricista.</p>`,
    vidaReal: `
      <p>Conocer estas reglas protege a tu familia y a tu casa:</p>
      <ul>
        <li>Detectas a tiempo un contacto o un cable que puede causar un incendio.</li>
        <li>Usas el generador durante un apagón sin riesgo de descargas ni de monóxido.</li>
        <li>Sabes qué hacer, y qué no hacer, si alguien recibe una descarga.</li>
        <li>Sabes cuándo un trabajo eléctrico debe hacerlo un electricista calificado.</li><li>Proteges a los niños de los cables y los contactos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>MedlinePlus pide no acercarse a menos de 20 pies de alguien electrocutado por cables de alta tensión. Si un pie mide 0.3 metros, ¿cuántos metros son?</p>', respuesta: 20 * 0.3,
        pista: '<p>Multiplica los pies por 0.3.</p>',
        solucion: '<p>20 × 0.3 = <strong>6 metros</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tienes 3 aparatos que producen calor y la NFPA pide uno a la vez por contacto. ¿Cuántos contactos necesitas para usarlos al mismo tiempo?</p>', respuesta: 3,
        pista: '<p>Uno por aparato.</p>',
        solucion: '<p><strong>3 contactos</strong>, uno para cada uno.</p>' },
      { tipo: 'opciones', enunciado: '<p>Alguien se quedó pegado a un aparato y está recibiendo una descarga. ¿Qué haces primero?</p>',
        opciones: ['Lo jalas de la ropa con las manos', 'Le echas agua', 'Cortas la corriente si puedes hacerlo de forma segura, sin tocarlo'], correcta: 2,
        pista: '<p>Si lo tocas, la corriente pasa a ti.</p>',
        solucion: '<p><strong>Cortar la corriente sin tocarlo</strong>, y llamar a emergencias.</p>' },
      { tipo: 'opciones', enunciado: '<p>Al tocar la lavadora sientes un cosquilleo. Según la NFPA, ¿qué haces?</p>',
        opciones: ['Llamas a un electricista calificado', 'Te pones guantes y sigues', 'No le das importancia'], correcta: 0,
        pista: '<p>Es una de las señales de alarma.</p>',
        solucion: '<p><strong>Llamar a un electricista</strong>: el cosquilleo es señal de una falla.</p>' },
      { tipo: 'opciones', enunciado: '<p>Está lloviendo y necesitas usar el generador. Según Ready.gov, ¿qué haces?</p>',
        opciones: ['Lo metes a la cocina para que no se moje', 'Lo usas afuera, seco y protegido de la lluvia, lejos de las ventanas', 'Lo usas en la lluvia, no pasa nada'], correcta: 1,
        pista: '<p>Afuera por el monóxido, y seco por las descargas.</p>',
        solucion: '<p><strong>Afuera, seco y protegido de la lluvia.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama lo que ocurre cuando la corriente eléctrica pasa por tu cuerpo?</p>',
        respuestas: ['descarga electrica', 'una descarga electrica', 'descarga', 'choque electrico', 'electrocucion', 'toque', 'un toque'],
        pista: '<p>Son dos palabras; la primera empieza con "d".</p>',
        solucion: '<p>Una <strong>descarga eléctrica</strong>.</p>' },
    ],
    fuentes: [MEDLINE('electricalinjuries.html', 'Lesiones por electricidad'), MEDLINE('ency/article/000053.htm', 'Lesión eléctrica'), NFPAELEC, READYAP],
  });
})();
