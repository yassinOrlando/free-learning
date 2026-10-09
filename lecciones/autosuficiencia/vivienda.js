// Autosuficiencia · Unidad 10: Vivienda digna y autosuficiente.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Seguridad: adobe y sismos (Kuroiwa/MVCS Perú, PUCP), excretas (EcoSanRes, SSWM), quema de basura (OMS, Ecología de Washington).
// No se dan recetas de construcción: solo principios, y se remite a asesoría técnica y al reglamento local.
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
  const FS21 = { nombre: 'Naciones Unidas (ACNUDH y ONU-Hábitat): El derecho a una vivienda adecuada, Folleto informativo 21 (PDF)', url: 'https://www.ohchr.org/sites/default/files/Documents/Publications/FS21_rev_1_Housing_sp.pdf' };
  const CONEVAL = { nombre: 'Consejo Nacional de Evaluación de la Política de Desarrollo Social (CONEVAL, México): Carencia por calidad y espacios de la vivienda (PDF)', url: 'https://www.coneval.org.mx/Evaluacion/IEPSM/Documents/CPP_2022/Carencia_espacios_vivienda.pdf' };
  const OMSVIV = { nombre: 'Organización Mundial de la Salud: WHO Housing and health guidelines (en inglés)', url: 'https://www.who.int/publications/i/item/9789241550376' };
  const LEVEL = (ruta, nombre) => ({ nombre: `BRANZ, Level: ${nombre} (en inglés)`, url: `https://www.level.org.nz/passive-design/${ruta}` });
  const BRANZ = { nombre: 'BRANZ (Nueva Zelanda): Passive solar design, ficha técnica (en inglés, PDF)', url: 'https://www.branz.co.nz/documents/3949/BRANZ_FACTS_passive_solar_design_v2.pdf' };
  const IDAE = { nombre: 'IDAE, Ministerio de Industria de España, y ANDIMAT: Guía práctica de la energía para la rehabilitación de edificios. El aislamiento, la mejor solución (PDF)', url: 'https://static.construible.es/media/2016/12/guiaaislamientotermico_andimat_idae.pdf' };
  const KUROIWA = { nombre: 'Ministerio de Vivienda, Construcción y Saneamiento del Perú: Manual para la reducción del riesgo sísmico de viviendas en el Perú, J. Kuroiwa (PDF)', url: 'https://sigrid.cenepred.gob.pe/sigridv3/documento/1934/descargar' };
  const PUCP_ADOBE = { nombre: 'Pontificia Universidad Católica del Perú: Vivienda antisísmica de adobe, manual de construcción, M. Hadzich (PDF)', url: 'https://repositorio.pucp.edu.pe/bitstreams/761c2ee0-3fed-4914-8b9b-1963233eec6c/download' };
  const SSWM = { nombre: 'SSWM (Eawag y socios): Sistema sin agua con separación de orina', url: 'https://sswm.info/es/gass-perspective-es/sistemas-de/sistemas-de-saneamiento/sistema-sin-agua-con-separaci%C3%B3n-de-orina' };
  const MITECO = { nombre: 'Ministerio para la Transición Ecológica de España (CENEAM): Baños secos (PDF)', url: 'https://www.miteco.gob.es/content/dam/miteco/es/ceneam/grupos-de-trabajo-y-seminarios/huertos-ecologicos/5-baubab-banos-secos_tcm30-478276.pdf' };
  const ECOSAN = { nombre: 'Instituto Sueco de Control de Enfermedades Infecciosas y EcoSanRes: Lineamientos para el uso seguro de la orina y de las heces (PDF)', url: 'https://Sswm.info/sites/default/files/reference_attachments/ECOSANRES_IAE%202004.%20Lineamientos%20para%20el%20uso%20seguro%20de%20la%20orina%20y%20las%20heces.pdf' };
  const OMSSAN = { nombre: 'Organización Mundial de la Salud: Saneamiento', url: 'https://www.who.int/es/news-room/fact-sheets/detail/sanitation' };
  const EPAHHW = { nombre: 'Agencia de Protección Ambiental de EE. UU. (EPA): Household Hazardous Waste (en inglés)', url: 'https://www.epa.gov/hw/household-hazardous-waste-hhw' };
  const QUEMA = { nombre: 'Departamento de Ecología del Estado de Washington: Barriles para quemar, un problema para la salud (PDF)', url: 'https://apps.ecology.wa.gov/publications/documents/0202001es.pdf' };
  const DIOXINAS = { nombre: 'Organización Mundial de la Salud: Las dioxinas y sus efectos en la salud humana', url: 'https://www.who.int/es/news-room/fact-sheets/detail/dioxins-and-their-effects-on-human-health' };
  const READYPLAN = { nombre: 'Ready.gov en español: Haga un plan', url: 'https://www.ready.gov/es/haga-un-plan' };
  const PUCP_CARE = { nombre: 'PUCP y CARE Perú: El enfoque de desarrollo humano para la construcción de casas de adobe seguras y saludables en áreas sísmicas (PDF)', url: 'https://repositorio.pucp.edu.pe/bitstreams/59f87740-775e-4581-9b91-8cf65d3bc676/download' };

  // ------------------------------------------------------------------
  L('Qué hace digna a una vivienda', {
    objetivo: 'Reconocer qué condiciones hacen que una vivienda sea adecuada, según las Naciones Unidas, y medir si en una casa hay hacinamiento.',
    explicacion: `
      <p>Una casa no es solo un techo y cuatro paredes. Una casa con goteras, piso de tierra que se enloda, una sola habitación para ocho personas o sin agua cerca puede protegerte de la lluvia, pero no te deja vivir bien. ¿Qué le hace falta a una casa para ser digna?</p>
      <h3>Un derecho, no un lujo</h3>
      <p>Las Naciones Unidas reconocen el derecho de toda persona a una vivienda adecuada. En su folleto sobre este derecho explican que no se trata de tener un lugar cualquiera, sino de vivir "en seguridad, paz y dignidad en alguna parte", y que una vivienda adecuada debe brindar más que cuatro paredes y un techo.</p>
      <h3>Los siete elementos</h3>
      <p>Según ese folleto, una <strong>vivienda adecuada</strong> es la que reúne, como mínimo, estas siete condiciones:</p>
      <ol>
        <li>Seguridad de la tenencia: quien vive ahí tiene protección legal para no ser desalojado a la fuerza ni amenazado.</li>
        <li>Servicios: tiene agua potable, instalaciones sanitarias, energía para cocinar, calentar y alumbrar, y forma de guardar alimentos y deshacerse de la basura.</li>
        <li>Asequibilidad: su costo no impide pagar otras necesidades básicas, como comida, salud o escuela.</li>
        <li>Habitabilidad: es segura, tiene espacio suficiente y protege del frío, la humedad, el calor, la lluvia, el viento y los peligros de que se caiga.</li>
        <li>Accesibilidad: toma en cuenta a quienes tienen necesidades especiales, como las personas con discapacidad o las personas mayores.</li>
        <li>Ubicación: está cerca del trabajo, la escuela y los servicios de salud, y no en una zona contaminada o peligrosa.</li>
        <li>Adecuación cultural: respeta la forma de vivir y la identidad de quienes la habitan.</li>
      </ol>
      <p>Fíjate que solo una de las siete, la habitabilidad, habla de la construcción misma. Las demás hablan de los servicios, del dinero, de los derechos y del lugar. Esta materia te ayuda sobre todo con dos: los servicios, que viste en las unidades de agua, alimentos y energía, y la habitabilidad, que verás en esta unidad.</p>
      <h3>Una forma de medirlo</h3>
      <p>Algunos países miden con números si una vivienda tiene carencias. En México, el Consejo Nacional de Evaluación de la Política de Desarrollo Social (CONEVAL) considera que una persona tiene carencia por calidad y espacios de la vivienda si en su casa ocurre al menos una de estas cosas:</p>
      <ul>
        <li>El piso es de tierra.</li>
        <li>El techo es de lámina de cartón o de desechos.</li>
        <li>Los muros son de embarro o bajareque; de carrizo, bambú o palma; de lámina de cartón, metálica o de asbesto, o de desechos.</li>
        <li>Hay más de 2.5 personas por cuarto.</li>
      </ul>
      <p>CONEVAL explica la razón: los techos, los muros y los pisos deben proteger del clima y no dañar la salud, y los espacios deben dar privacidad. Otros países usan criterios parecidos.</p>
      <h3>El hacinamiento</h3>
      <p>El último punto tiene nombre propio. El <strong>hacinamiento</strong> es cuando vive demasiada gente en muy poco espacio. Para CONEVAL, se mide dividiendo el número de personas entre el número de cuartos; si el resultado pasa de 2.5, hay hacinamiento. La Organización Mundial de la Salud (OMS) incluye el hacinamiento entre los problemas de vivienda que afectan la salud, junto con las temperaturas muy frías o muy calientes dentro de la casa, los riesgos de accidentes y la falta de accesibilidad.</p>
      <h3>Mejorar paso a paso</h3>
      <p>Muchas mejoras se pueden hacer poco a poco: un piso firme en lugar de tierra, un techo que no gotee, un cuarto más, una ventana para ventilar. En las siguientes lecciones verás cómo orientar, ventilar y aislar una casa, qué materiales locales se pueden usar con seguridad y cómo resolver el baño y la basura.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que una casa es digna solo porque está bien construida. Si no tiene agua, si cuesta tanto que no alcanza para comer o si está en una zona que se inunda, todavía le falta.</p>`,
    ejemplo: `
      <p>Una familia de 7 personas vive en una casa con 2 cuartos. ¿Hay hacinamiento según el criterio de CONEVAL? ¿Cuántos cuartos necesitarían como mínimo para que no lo haya?</p>
      <ol class="pasos-ej">
        <li>Primero divide las personas entre los cuartos: 7 ÷ 2 = 3.5 personas por cuarto.</li>
        <li>Compara con el límite: 3.5 es mayor que 2.5, así que sí hay hacinamiento.</li>
        <li>Prueba con 3 cuartos: 7 ÷ 3 ≈ 2.33, que ya no pasa de 2.5.</li>
        <li>Comprueba que con 2 no alcanzaba y con 3 sí: 2.5 × 2 = 5 personas como máximo en 2 cuartos, y 2.5 × 3 = 7.5 en 3 cuartos.</li>
      </ol>
      <p>Resultado: <span class="resultado">sí hay hacinamiento; con 3 cuartos ya no lo habría</span>.</p>
      <p class="nota"><strong>Error común:</strong> dividir los cuartos entre las personas. Se divide al revés: personas entre cuartos.</p>`,
    vidaReal: `
      <p>Saber qué hace digna a una vivienda te ayuda a decidir qué mejorar primero:</p>
      <ul>
        <li>Puedes revisar tu casa con los siete elementos y ver qué le falta.</li>
        <li>Sabes medir si en tu casa hay hacinamiento.</li>
        <li>Entiendes por qué el agua, el baño y la energía también son parte de una vivienda digna.</li>
        <li>Conoces tus derechos si alguien amenaza con sacarte de tu casa.</li>
        <li>Puedes planear mejoras poco a poco, empezando por lo que más afecta la salud.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En una casa viven 5 personas en 2 cuartos. ¿Cuántas personas hay por cuarto?</p>', respuesta: 5 / 2,
        pista: '<p>Divide las personas entre los cuartos.</p>',
        solucion: '<p>5 ÷ 2 = <strong>2.5</strong> personas por cuarto. Justo en el límite: todavía no pasa de 2.5.</p>' },
      { tipo: 'numero', enunciado: '<p>Con el límite de CONEVAL de 2.5 personas por cuarto, ¿cuántas personas pueden vivir como máximo en 4 cuartos sin hacinamiento?</p>', respuesta: 2.5 * 4,
        pista: '<p>Multiplica el límite por los cuartos.</p>',
        solucion: '<p>2.5 × 4 = <strong>10 personas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una casa está bien construida, pero en una zona que se inunda cada año. ¿Qué elemento de la vivienda adecuada le falta?</p>',
        opciones: ['La ubicación', 'La adecuación cultural', 'La asequibilidad'], correcta: 0,
        pista: '<p>Tiene que ver con el lugar donde está la casa.</p>',
        solucion: '<p><strong>La ubicación</strong>: no debe estar en una zona peligrosa.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según CONEVAL, ¿cuál de estas características indica una carencia por calidad de la vivienda?</p>',
        opciones: ['Que tenga ventanas grandes', 'Que el piso sea de tierra', 'Que tenga dos cuartos'], correcta: 1,
        pista: '<p>Revisa la lista de pisos, techos y muros.</p>',
        solucion: '<p><strong>Que el piso sea de tierra.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Una familia paga tanto de renta que no le alcanza para comer bien. ¿Qué elemento falla?</p>',
        opciones: ['La habitabilidad', 'La seguridad de la tenencia', 'La asequibilidad'], correcta: 2,
        pista: '<p>Tiene que ver con el costo.</p>',
        solucion: '<p><strong>La asequibilidad</strong>: el costo no debe impedir cubrir otras necesidades.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama cuando vive demasiada gente en muy poco espacio?</p>',
        respuestas: ['hacinamiento', 'el hacinamiento'],
        pista: '<p>Empieza con "h".</p>',
        solucion: '<p><strong>Hacinamiento</strong>.</p>' },
    ],
    fuentes: [FS21, CONEVAL, OMSVIV],
  });

  // ------------------------------------------------------------------
  const ALERO = diagrama([-3.5, 13], [-0.6, 11.4], [
    caja(5, 0, 12, 5), { tipo: 'poligono', puntos: [[3, 5], [12, 5]], abierto: true },
    { tipo: 'linea', desde: [3, 5.05], hasta: [5, 5.05] },
    caja(5, 1.6, 5.25, 4.2, true), txt(8.5, 2.5, 'cuarto'),
    ...flecha([1, 10.2], [4.6, 4.6], 1), txt(2.2, 10.8, 'sol de verano: alto'),
    ...flecha([-1.6, 5.6], [5.1, 2.9], 0), txt(-1.2, 6.3, 'sol de invierno: bajo'),
    txt(4, 5.7, 'alero'), txt(3, 1.2, 'ventana'),
  ], 'Corte de una casa con una ventana a la izquierda y un alero que sale del techo sobre ella. Una flecha empinada, el sol alto de verano, choca con el alero y no llega a la ventana. Otra flecha más baja, el sol de invierno, pasa por debajo del alero y entra por la ventana al cuarto.');

  L('Orientación, sol y ventilación', {
    objetivo: 'Usar la posición del sol, los aleros, la masa térmica y la ventilación para que una casa sea más fresca en verano y más tibia en invierno sin gastar energía.',
    explicacion: `
      <p>Hay casas en las que, sin aire acondicionado, se está fresco en las tardes de calor, y otras que se vuelven un horno. Muchas veces la diferencia no está en los aparatos, sino en cómo se acomodó la casa respecto al sol y al viento. A eso se le llama diseño pasivo: aprovechar el clima en lugar de pelearse con él.</p>
      <h3>El camino del sol</h3>
      <p>En la unidad Energía viste que en el hemisferio norte, como en México o Centroamérica, el sol del mediodía pasa por el sur, y en el hemisferio sur, como en Chile o Argentina, pasa por el norte. Además, el sol no va igual de alto todo el año: en verano pasa muy alto, casi encima de tu cabeza, y en invierno pasa más bajo e inclinado.</p>
      <p>La <strong>orientación</strong> de una casa es hacia dónde miran sus paredes y sus ventanas. La guía de BRANZ, el instituto de investigación de la construcción de Nueva Zelanda, recomienda poner la mayor parte de las ventanas hacia el lado por donde pasa el sol del mediodía, que allá es el norte porque están en el hemisferio sur. En México sería el sur.</p>
      <h3>El alero: sombra en verano, sol en invierno</h3>
      <p>Un <strong>alero</strong> es la parte del techo que sobresale de la pared, sobre las ventanas. BRANZ explica que los aleros se calculan según la altura del sol en verano. Como en verano el sol va alto, el alero le hace sombra a la ventana y el calor no entra. En invierno el sol va bajo, pasa por debajo del alero y entra a calentar la casa. Fíjate que el mismo alero sirve para las dos cosas.</p>
      ${ALERO}
      <h3>El sol bajo de la mañana y la tarde</h3>
      <p>El sol del amanecer y del atardecer llega muy inclinado, casi horizontal, por el este y el oeste. Level, la guía de BRANZ sobre diseño pasivo, explica que esas paredes son más difíciles de sombrear con un alero. BRANZ recomienda que las ventanas hacia el este y el oeste sean pequeñas, por ejemplo que las del este sumen menos del 5% del área del piso, y que se protejan con persianas, pantallas, toldos o pérgolas. Un árbol que dé sombra a la pared del oeste en la tarde también ayuda.</p>
      <h3>Masa térmica: paredes que guardan calor</h3>
      <p>Level explica que la masa térmica es la capacidad de un material de guardar calor. Los materiales pesados y densos, como la piedra, el concreto o el adobe, absorben calor cuando el aire está más caliente que ellos y lo sueltan cuando el aire se enfría. Como viste en Física, en "Calor y calor específico", hay materiales que tardan en calentarse y en enfriarse. Por eso una casa de muros gruesos cambia de temperatura más despacio.</p>
      <p>Para calentar, el sol del invierno da sobre un piso o un muro pesado, que guarda el calor de día y lo suelta en la noche. Para enfriar, Level explica que la masa térmica se combina con ventilación: el muro absorbe el calor del día y, en la noche, se abren las ventanas para sacar ese calor.</p>
      <h3>Ventilación</h3>
      <p>Level explica que ventilar sirve para dos cosas: refrescar y sacar del aire la humedad, el dióxido de carbono y los humos de cocinar y calentar. Por eso nunca se debe tapar toda entrada de aire, como viste en la unidad Fuego y calor con el monóxido de carbono.</p>
      <p>BRANZ recomienda que el aire pueda cruzar la casa de lado a lado sin muchos obstáculos. A eso se le llama <strong>ventilación cruzada</strong>: abrir ventanas o puertas en paredes opuestas para que el viento entre por un lado y salga por el otro. Además, como viste en "Conducción, convección y radiación", el aire caliente sube; una abertura alta deja salir el aire caliente y una baja deja entrar el fresco.</p>
      <p class="nota"><strong>Trampa común:</strong> poner ventanas grandes hacia el oeste sin sombra. El sol de la tarde entra casi horizontal y calienta la casa justo en la hora más caliente.</p>`,
    ejemplo: `
      <p>Vas a construir un cuarto en Chihuahua, México, en el hemisferio norte. Tienes una ventana grande y una pequeña. ¿Hacia dónde pones cada una y qué agregas para el verano?</p>
      <ol class="pasos-ej">
        <li>Primero ubica el sol: en el hemisferio norte, el sol del mediodía pasa por el sur.</li>
        <li>Pon la ventana grande hacia el sur, como recomienda BRANZ para el lado del sol del mediodía, con un alero encima.</li>
        <li>El alero da sombra en verano, cuando el sol va alto, y deja entrar el sol bajo del invierno.</li>
        <li>Pon la ventana pequeña en la pared opuesta, la del norte, para que el aire cruce el cuarto.</li>
        <li>Evita ventanas grandes al oeste, o ponles persiana o un árbol.</li>
        <li>Comprueba: la ventana grande recibe sol en invierno y sombra en verano, y hay dos aberturas opuestas para ventilar.</li>
      </ol>
      <p>Resultado: <span class="resultado">ventana grande al sur con alero, pequeña al norte</span>.</p>
      <p class="nota"><strong>Error común:</strong> copiar una guía del hemisferio sur sin voltearla.</p>`,
    vidaReal: `
      <p>Acomodar bien la casa respecto al sol y al viento te ayuda todos los días:</p>
      <ul>
        <li>Tu casa se mantiene más fresca en verano sin gastar en ventiladores.</li>
        <li>En invierno el sol entra a calentar los cuartos.</li>
        <li>Sacas la humedad y el humo de la cocina con buena ventilación.</li>
        <li>Sabes dónde poner las ventanas y para qué sirve un alero.</li>
        <li>Puedes mejorar tu casa actual con un toldo, una persiana o un árbol bien colocado.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Level dice que, en Nueva Zelanda, las ventanas que se pueden abrir deben sumar al menos el 5% del área del piso. Si un cuarto mide 20 m², ¿cuántos m² de ventana que abre necesita como mínimo?</p>', respuesta: 20 * 0.05,
        pista: '<p>Calcula el 5% de 20.</p>',
        solucion: '<p>20 × 0.05 = <strong>1 m²</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>BRANZ recomienda que las ventanas hacia el este sumen menos del 5% del área del piso. Si la casa tiene 80 m² de piso, ¿cuántos m² de ventana al este como máximo?</p>', respuesta: 80 * 0.05,
        pista: '<p>Calcula el 5% de 80.</p>',
        solucion: '<p>80 × 0.05 = <strong>4 m²</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Vives en el hemisferio norte. ¿Hacia dónde conviene poner las ventanas grandes?</p>',
        opciones: ['Hacia el oeste', 'Hacia el sur', 'Hacia el norte'], correcta: 1,
        pista: '<p>Por ahí pasa el sol del mediodía.</p>',
        solucion: '<p><strong>Hacia el sur</strong>, con alero para el verano.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué un alero da sombra en verano pero deja pasar el sol en invierno?</p>',
        opciones: ['Porque en invierno se quita', 'Porque en invierno hay más nubes', 'Porque el sol de verano va alto y el de invierno va bajo'], correcta: 2,
        pista: '<p>Piensa en la altura del sol.</p>',
        solucion: '<p><strong>El sol de invierno va bajo</strong> y pasa por debajo del alero.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es la ventilación cruzada?</p>',
        opciones: ['Abrir ventanas en paredes opuestas para que el aire atraviese la casa', 'Cerrar todas las ventanas en la noche', 'Poner un ventilador en cada cuarto'], correcta: 0,
        pista: '<p>El aire entra por un lado y sale por otro.</p>',
        solucion: '<p><strong>Abrir ventanas en paredes opuestas.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la parte del techo que sobresale de la pared y da sombra a las ventanas?</p>',
        respuestas: ['alero', 'el alero', 'aleros', 'volado', 'voladizo', 'tejadillo'],
        pista: '<p>Empieza con "a".</p>',
        solucion: '<p>El <strong>alero</strong>.</p>' },
    ],
    fuentes: [BRANZ, LEVEL('shading/', 'Shading'), LEVEL('thermal-mass/', 'Thermal mass'), LEVEL('ventilation/', 'Ventilation')],
  });

  // ------------------------------------------------------------------
  L('Aislamiento térmico: fresca en verano y tibia en invierno', {
    objetivo: 'Entender cómo el aislamiento frena el paso del calor, dónde conviene ponerlo en una casa y por qué no hay que tapar la ventilación.',
    explicacion: `
      <p>En una noche fría, una cobija no te da calor: frena el calor de tu cuerpo para que no se escape. Y una hielera no enfría las bebidas: frena el calor de afuera para que no entre. El aislamiento de una casa hace las dos cosas: en invierno guarda el calor adentro y en verano lo deja afuera.</p>
      <h3>El calor siempre se escapa hacia lo frío</h3>
      <p>En Física, en "Conducción, convección y radiación", viste que el calor pasa siempre de lo caliente a lo frío. En invierno, el calor de la casa se escapa hacia afuera por el techo, las paredes, el piso, las ventanas y las rendijas. En verano pasa al revés: el calor de afuera entra. No se puede detener del todo, pero sí se puede frenar.</p>
      <h3>¿Qué es el aislamiento?</h3>
      <p>El <strong>aislamiento térmico</strong> es poner materiales que frenan el paso del calor. La guía del Instituto para la Diversificación y Ahorro de la Energía (IDAE), del Gobierno de España, lo explica así: aislar consiste en lograr que las partes de la casa en contacto con el exterior resistan más el paso del calor, agregando materiales aislantes en los muros, el techo, el suelo y las ventanas.</p>
      <p>Level menciona aislantes como la fibra de vidrio, la lana o el poliéster. Fíjate que son materiales ligeros, con mucho aire atrapado: el aire quieto conduce muy mal el calor. Por eso la guía del IDAE explica que en una ventana de doble vidrio el aire seco y encerrado entre los dos vidrios trabaja como aislante.</p>
      <p>La guía Level de BRANZ explica que el aislamiento hace falta en el techo, las paredes y el piso, y que cada material se elige por qué tanto frena el calor. A esa capacidad de frenar el calor se le llama <strong>resistencia térmica</strong>: mientras más alta, mejor aísla.</p>
      <h3>Lo que gana la casa</h3>
      <p>La guía del IDAE explica que una casa bien aislada:</p>
      <ul>
        <li>Necesita menos energía para calentarse o enfriarse, así que se paga menos.</li>
        <li>Mantiene una temperatura más agradable tanto en invierno como en verano.</li>
        <li>Tiene menos condensación, es decir, menos agua que se forma en paredes y vidrios fríos, y por eso menos humedad y moho.</li>
        <li>Deja pasar menos ruido de afuera.</li>
      </ul>
      <h3>Por dónde empezar</h3>
      <p>Piensa en el techo: en verano recibe de lleno el sol del mediodía y, como el aire caliente sube, en invierno es por donde busca salir el calor. Por eso, en casas con techo de lámina o de losa delgada, suele convenir empezar por ahí. Algunas formas sencillas de mejorar una casa:</p>
      <ul>
        <li>Poner un plafón o falso techo con una capa de aislante encima.</li>
        <li>Pintar de blanco el techo por fuera, para que refleje el sol en climas calurosos.</li>
        <li>Poner cortinas gruesas en las ventanas en las noches frías.</li>
        <li>Tapar las rendijas de puertas y ventanas por donde entra el aire frío.</li>
      </ul>
      <h3>Aislar no es tapar todo</h3>
      <p>Aquí hay un cuidado importante. En la lección anterior viste que la casa necesita ventilación para sacar la humedad y los humos de cocinar y calentar. Y en la unidad Fuego y calor viste que un fuego dentro de una casa cerrada produce monóxido de carbono. Por eso:</p>
      <ul>
        <li>Tapa las rendijas que dejan entrar el frío, pero deja ventilación controlada, como una ventana que se pueda abrir.</li>
        <li>Nunca tapes la ventilación de un cuarto donde hay una estufa de leña, un brasero o un calentador de gas.</li>
        <li>Abre las ventanas un rato cada día para renovar el aire.</li>
      </ul>
      <h3>El aislamiento y la masa térmica juntos</h3>
      <p>En la lección anterior viste que un muro pesado guarda calor. Si además la casa está aislada, ese calor tarda mucho más en escaparse. Por eso las guías de diseño pasivo, como la de BRANZ, piden pensar el aislamiento junto con la orientación, las ventanas, la sombra y la masa térmica.</p>
      <p class="nota"><strong>Trampa común:</strong> sellar la casa por completo para que no entre el frío. Sin ventilación se acumulan la humedad, el moho y, si hay un fuego adentro, el monóxido de carbono.</p>`,
    ejemplo: `
      <p>Una familia gasta 600 pesos al mes en gas para calentar la casa durante los 4 meses de frío. Si aislar el techo les ahorrara la cuarta parte de ese gasto, y el aislante cuesta 2 400 pesos, ¿en cuántos inviernos lo recuperan?</p>
      <ol class="pasos-ej">
        <li>Primero calcula el ahorro de un mes: la cuarta parte de 600 es 600 ÷ 4 = 150 pesos.</li>
        <li>Luego el ahorro de un invierno de 4 meses: 150 × 4 = 600 pesos.</li>
        <li>Divide el costo del aislante entre el ahorro de cada invierno: 2 400 ÷ 600 = 4 inviernos.</li>
        <li>Comprueba: 600 pesos de ahorro × 4 inviernos = 2 400 pesos, lo que costó el aislante.</li>
      </ol>
      <p>Resultado: <span class="resultado">lo recuperan en 4 inviernos</span>, y después todo es ahorro. El ahorro real depende del clima, de la casa y del material.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar por los 12 meses del año cuando la calefacción solo se usa 4.</p>`,
    vidaReal: `
      <p>Aislar bien tu casa se nota en tu comodidad y en tu bolsillo:</p>
      <ul>
        <li>Duermes más tibio en invierno y más fresco en verano.</li>
        <li>Gastas menos gas, leña o electricidad para calentar o enfriar.</li>
        <li>Hay menos humedad y moho en paredes y ventanas.</li>
        <li>Sabes dónde conviene aislar primero.</li>
        <li>Aíslas sin tapar la ventilación que protege a tu familia del monóxido de carbono.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un aislante cuesta 3 000 pesos y te ahorra 750 pesos cada invierno. ¿En cuántos inviernos lo recuperas?</p>', respuesta: 3000 / 750,
        pista: '<p>Divide el costo entre el ahorro de cada invierno.</p>',
        solucion: '<p>3 000 ÷ 750 = <strong>4 inviernos</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Gastas 800 pesos al mes en calefacción durante 3 meses. Si aislar te ahorra el 30%, ¿cuánto ahorras en esos 3 meses?</p>', respuesta: 800 * 3 * 0.3,
        pista: '<p>Calcula el gasto de los 3 meses y luego el 30%.</p>',
        solucion: '<p>800 × 3 = 2 400 pesos, y el 30% es 2 400 × 0.3 = <strong>720 pesos</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el doble vidrio aísla mejor que un vidrio sencillo?</p>',
        opciones: ['Porque es más pesado', 'Porque el aire seco y encerrado entre los vidrios frena el calor', 'Porque refleja todo el sol'], correcta: 1,
        pista: '<p>Piensa en lo que hay entre los dos vidrios.</p>',
        solucion: '<p><strong>El aire encerrado trabaja como aislante.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Hay una estufa de leña en el cuarto y entra mucho frío por una ventana. ¿Qué haces?</p>',
        opciones: ['Sellas todas las ventanas y rendijas', 'Apagas la estufa', 'Tapas las rendijas del frío pero dejas una ventilación que se pueda abrir'], correcta: 2,
        pista: '<p>Un fuego en un cuarto cerrado produce monóxido.</p>',
        solucion: '<p><strong>Tapar rendijas sin quitar toda la ventilación.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Según el IDAE, además de ahorrar energía, ¿qué gana una casa bien aislada?</p>',
        opciones: ['Menos condensación y moho', 'Más ruido de la calle', 'Más humedad'], correcta: 0,
        pista: '<p>Piensa en el agua que se forma en las paredes frías.</p>',
        solucion: '<p><strong>Menos condensación y moho</strong>, y menos ruido.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama poner materiales que frenan el paso del calor en una casa?</p>',
        respuestas: ['aislamiento termico', 'aislamiento', 'el aislamiento termico', 'aislar'],
        pista: '<p>Son dos palabras; la primera empieza con "a".</p>',
        solucion: '<p><strong>Aislamiento térmico</strong>.</p>' },
    ],
    fuentes: [IDAE, LEVEL('insulation/', 'Insulation'), BRANZ],
  });

  // ------------------------------------------------------------------
  L('Materiales locales: adobe, bambú y tierra', {
    objetivo: 'Conocer las ventajas del adobe, la tierra y la caña o el bambú como materiales de construcción, y sus riesgos, sobre todo en zonas de sismos.',
    explicacion: `
      <p>Durante miles de años, la gente construyó sus casas con lo que tenía cerca: tierra, piedra, madera, caña y paja. Muchas de esas casas siguen en pie. Otras se cayeron en el primer terremoto fuerte. La diferencia no está solo en el material, sino en cómo se usa.</p>
      <h3>Lo bueno de los materiales locales</h3>
      <p>La tierra está en casi todas partes, no hay que transportarla de lejos y se puede trabajar en familia. Un manual de la Pontificia Universidad Católica del Perú (PUCP) sobre la vivienda de adobe explica que muchas familias del campo prefieren las casas de ladrillo y concreto, aunque son mucho más caras, más frías y usan materiales difíciles de transportar. Como viste en "Orientación, sol y ventilación", los muros gruesos de tierra tienen mucha masa térmica: guardan el calor del día y lo sueltan en la noche.</p>
      <h3>El adobe</h3>
      <p>El <strong>adobe</strong> es un bloque de barro mezclado con paja que se seca al sol. El manual de la PUCP explica que el barro se hace con arcilla, arena y agua, que no cualquier tierra sirve y que hay que probarla antes de usarla.</p>
      <h3>El gran riesgo: los sismos</h3>
      <p>Aquí está el problema. Un estudio de la PUCP y CARE Perú explica que la mayoría de las casas de adobe del Perú se construyen de manera informal, sin supervisión técnica y con materiales de baja calidad, y por eso tienen muros pesados, débiles y frágiles. En el terremoto de Pisco de 2007 murieron 593 personas, según el Instituto Nacional de Estadística del Perú, y muchas casas de adobe se derrumbaron.</p>
      <p>El manual del Ministerio de Vivienda del Perú, escrito por el ingeniero Julio Kuroiwa, va más allá:</p>
      <ul>
        <li>Las casas de tapial, que es tierra húmeda apisonada entre moldes, de dos pisos y con paredes muy separadas, son muy vulnerables. En el terremoto de Áncash de 1970 murieron más de 9 000 personas en Huaraz, aplastadas por los altos muros de tapial.</li>
        <li>La humedad debilita las paredes de adobe con los años.</li>
        <li>Hay formas de reforzar el adobe que dieron buenos resultados en pruebas, como una viga de madera que abraza el muro por ambos lados a la altura de las puertas y ventanas.</li>
        <li>Aun así, el manual indica que el adobe solo debe permitirse en zonas de peligro sísmico bajo, en zonas de peligro medio solo con estudios del suelo, y nunca en zonas de peligro alto.</li>
      </ul>
      <h3>Cómo se refuerza</h3>
      <p>Las universidades peruanas han investigado varios refuerzos. La casa de adobe del manual de la PUCP lleva cañas: horizontales, partidas y formando parrillas cada tres o cuatro hileras de adobes, y verticales, desde la base del muro hasta la viga de arriba. El estudio de la PUCP y CARE Perú describe otro refuerzo: una malla de plástico, llamada geomalla, que envuelve los muros. En un terremoto fuerte las paredes se agrietan, pero la malla las mantiene unidas para que no caigan encima de la gente y haya tiempo de salir.</p>
      <h3>La caña y el bambú: la quincha</h3>
      <p>La caña y el bambú son ligeros, resistentes y crecen rápido. Kuroiwa llama a la madera y a la caña brava excelentes materiales de construcción en las zonas donde abundan. Con ellos se hace la <strong>quincha</strong>: un entramado de caña o bambú y madera, cubierto con barro. Por ser ligera y elástica, se ha usado desde hace siglos en zonas de sismos. Pero necesita una protección adecuada contra la humedad y contra los insectos, que pudren o se comen el material vegetal.</p>
      <p>Fíjate en algo: CONEVAL, en México, cuenta como carencia los muros de carrizo, bambú o palma, porque muchas veces son delgados y no protegen bien del clima. Lo que hace digna una casa no es el material, sino que esté bien diseñada, reforzada y protegida.</p>
      <h3>Antes de construir</h3>
      <ul>
        <li>Averigua si tu zona tiene peligro de sismos y qué dice el reglamento de construcción local.</li>
        <li>Busca asesoría técnica: municipios, universidades y organizaciones capacitan en construcción segura con tierra.</li>
        <li>Fíjate que las casas de adobe de los manuales de la PUCP son de un solo piso, y protege los muros de la humedad, que, como explica Kuroiwa, los debilita.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> pensar que un muro grueso y pesado es más seguro en un sismo. Sin refuerzo, el peso lo vuelve más peligroso.</p>`,
    ejemplo: `
      <p>Vas a levantar un muro de adobe de 24 hileras con el refuerzo de caña del manual de la PUCP, que pone una parrilla de caña cada tres o cuatro hileras. ¿Cuántas parrillas necesitas como mínimo y como máximo?</p>
      <ol class="pasos-ej">
        <li>Primero calcula con una parrilla cada 4 hileras, la separación mayor: 24 ÷ 4 = 6 parrillas.</li>
        <li>Luego con una cada 3 hileras, la separación menor: 24 ÷ 3 = 8 parrillas.</li>
        <li>Fíjate que, mientras más juntas, más parrillas necesitas: de 6 a 8.</li>
        <li>Comprueba: 6 parrillas × 4 hileras = 24 hileras, y 8 × 3 = 24 hileras.</li>
      </ol>
      <p>Resultado: <span class="resultado">entre 6 y 8 parrillas de caña</span>. Esto es solo una cuenta para practicar: el diseño del refuerzo de una casa real lo debe revisar alguien con preparación técnica.</p>
      <p class="nota"><strong>Error común:</strong> confundir la separación con el número de parrillas. Separarlas más quiere decir usar menos, no más.</p>`,
    vidaReal: `
      <p>Conocer los materiales locales te ayuda a construir mejor y con más seguridad:</p>
      <ul>
        <li>Puedes construir con lo que tienes cerca y gastar menos.</li>
        <li>Tu casa de tierra puede ser fresca en verano y tibia en invierno.</li>
        <li>Sabes por qué una casa de adobe sin refuerzo es peligrosa en un sismo.</li>
        <li>Entiendes que la caña y el bambú necesitan protegerse de la humedad y los insectos.</li>
        <li>Sabes que antes de construir conviene pedir asesoría técnica.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Solo como práctica de cálculo, no como diseño: un muro tiene 30 hileras de adobe y se pone una parrilla de caña cada 3 hileras. ¿Cuántas parrillas son?</p>', respuesta: 30 / 3,
        pista: '<p>Divide las hileras entre la separación.</p>',
        solucion: '<p>30 ÷ 3 = <strong>10 parrillas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Kuroiwa cuenta que una casa de adobe reforzada resistió en pruebas sacudidas de más de 0.5 g, donde g = 9.81 m/s². ¿Cuántos m/s² son 0.5 g? Redondea a un decimal.</p>', respuesta: 0.5 * 9.81, tolerancia: 0.06,
        pista: '<p>Multiplica 0.5 por 9.81.</p>',
        solucion: '<p>0.5 × 9.81 = 4.905, unos <strong>4.9 m/s²</strong>: la mitad de la aceleración con que caen las cosas.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según el manual de Kuroiwa, ¿dónde no debe construirse nunca con adobe?</p>',
        opciones: ['En zonas de peligro sísmico bajo', 'En zonas de peligro sísmico alto', 'En el campo'], correcta: 1,
        pista: '<p>El adobe sin refuerzo es frágil en los sismos.</p>',
        solucion: '<p><strong>En zonas de peligro sísmico alto.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve la geomalla en una casa de adobe?</p>',
        opciones: ['Para que la casa sea más fresca', 'Para pintar los muros', 'Para mantener unidos los muros agrietados en un sismo y dar tiempo de salir'], correcta: 2,
        pista: '<p>Envuelve los muros.</p>',
        solucion: '<p><strong>Mantiene unidos los muros</strong> para que no caigan sobre la gente.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿De qué hay que proteger una casa de quincha?</p>',
        opciones: ['De la humedad y de los insectos', 'Del sol de invierno', 'Del viento fresco'], correcta: 0,
        pista: '<p>La caña y el bambú son materiales vegetales.</p>',
        solucion: '<p><strong>De la humedad y de los insectos</strong>, que pudren o se comen el material.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el bloque de barro con paja secado al sol?</p>',
        respuestas: ['adobe', 'el adobe', 'adobes'],
        pista: '<p>Empieza con "a".</p>',
        solucion: '<p>El <strong>adobe</strong>.</p>' },
    ],
    fuentes: [KUROIWA, PUCP_ADOBE, PUCP_CARE, CONEVAL, WIKI('Quincha', 'Quincha'), WIKI('Adobe', 'Adobe')],
  });

  // ------------------------------------------------------------------
  const BANO = diagrama([0, 14], [-1, 8.6], [
    caja(0.5, 0, 13.5, 2.6), { tipo: 'linea', desde: [7, 0], hasta: [7, 2.6] },
    txt(3.75, 1.3, 'cámara 1: en uso'), txt(10.25, 1.3, 'cámara 2: secando'),
    caja(2.6, 2.6, 5, 4), txt(3.8, 4.6, 'asiento'),
    ...flecha([5.2, 3.4], [6.6, 5.6]), txt(9.2, 6.1, 'orina: va aparte'),
    ...flecha([3.8, 7.6], [3.8, 4.9]), txt(3.8, 8.1, 'material secante'),
    txt(7, -0.6, 'las cámaras se usan por turnos'),
  ], 'Corte de un baño seco con dos cámaras abajo. La cámara 1 está en uso, debajo del asiento; la cámara 2 se está secando. Una flecha saca la orina aparte desde el asiento. Otra flecha, desde arriba, indica que se agrega material secante. Abajo dice que las cámaras se usan por turnos.');

  L('Baño seco y aprovechamiento de aguas grises', {
    objetivo: 'Entender cómo funciona un baño seco con separación de orina, qué cuidados necesita para ser seguro y cómo encaja con el aprovechamiento de las aguas grises.',
    explicacion: `
      <p>Cada vez que jalas la cadena de un inodoro común se van varios litros de agua limpia, a veces agua potable, solo para llevarse los desechos. En lugares donde el agua escasea o no hay drenaje, eso no es posible. El baño seco resuelve el problema sin agua, y bien hecho es higiénico y no huele mal.</p>
      <h3>Por qué importa el saneamiento</h3>
      <p>La Organización Mundial de la Salud (OMS) informa que en 2022 más de 1 500 millones de personas no tenían un servicio básico de saneamiento, como un retrete o una letrina propios, y que 419 millones todavía defecaban al aire libre. Explica que un saneamiento deficiente transmite enfermedades como el cólera, la disentería y la fiebre tifoidea. Por eso, como viste en "Qué hace digna a una vivienda", las instalaciones sanitarias son parte de una vivienda adecuada.</p>
      <h3>¿Qué es un baño seco?</h3>
      <p>Un <strong>baño seco</strong> es un sanitario que no usa agua: los desechos caen en una cámara donde se secan poco a poco. El Ministerio para la Transición Ecológica de España explica en una guía que, bien diseñados, no producen malos olores, son baratos porque se pueden construir en casa y no contaminan el agua del subsuelo.</p>
      <h3>La separación de orina</h3>
      <p>La red SSWM, que reúne a especialistas en saneamiento, explica el tipo más usado en América Latina: el sanitario seco con <strong>separación de orina</strong>. Su asiento tiene dos partes: la de adelante recoge la orina y la manda aparte por un tubo, y la de atrás deja caer las heces a una cámara. ¿Por qué separar? Porque las heces se secan mucho más rápido si no se mojan, y al secarse mueren los microbios y no hay olor.</p>
      ${BANO}
      <h3>Cómo se usa</h3>
      <p>SSWM explica estos cuidados:</p>
      <ul>
        <li>Después de cada uso se agrega un material secante: tierra o aserrín con un poco de ceniza o cal. Absorbe la humedad, reduce el olor y forma una barrera contra las moscas.</li>
        <li>Las cámaras deben mantenerse secas: no debe entrar agua, ni orina, ni el agua jabonosa de lavarse las manos, que se maneja aparte.</li>
        <li>Casi siempre hay dos cámaras que se usan por turnos: mientras una se llena, la otra se seca.</li>
      </ul>
      <h3>Antes de usar lo que sale</h3>
      <p>Las heces y la orina pueden convertirse en abono, pero solo con tiempo y cuidado. Los lineamientos del Instituto Sueco de Control de Enfermedades Infecciosas, publicados por el programa EcoSanRes, explican:</p>
      <ul>
        <li>Las heces guardadas a temperatura ambiente necesitan al menos un año de almacenamiento. En clima tropical, de 28 a 30 °C, se considera suficiente un año; en climas más templados, de 17 a 20 °C, se necesitan 18 meses.</li>
        <li>Las heces que no se han higienizado bien nunca deben usarse en verduras, frutas o tubérculos que se comen crudos.</li>
        <li>La orina se guarda en un recipiente cerrado. Guardada 6 meses a unos 20 °C, se puede usar en todos los cultivos. Si se usa en cultivos que se comen crudos, debe aplicarse al menos un mes antes de la cosecha.</li>
        <li>Para manejar estos materiales hay que usar guantes y lavarse muy bien las manos.</li>
      </ul>
      <h3>Las aguas grises</h3>
      <p>En la unidad Agua, en "Ahorrar y reutilizar agua en casa", viste que las aguas grises son las del baño, la ropa y el lavado de manos, sin las del inodoro, y que se usan pronto, nunca para beber ni cocinar, y solo para plantas que no se comen crudas. Un baño seco y el aprovechamiento de las aguas grises se complementan: el baño no usa agua, y el agua que sí usas para bañarte y lavar riega tus plantas. La OMS advierte que regar alimentos con aguas residuales es un riesgo para la salud; por eso no se mezclan las aguas del inodoro con las grises, y las grises no van a lo que se come crudo.</p>
      <p>Construir un baño seco o un sistema de aguas grises conviene hacerlo con asesoría técnica y revisando las reglas de tu municipio.</p>
      <p class="nota"><strong>Trampa común:</strong> echar agua o la orina a la cámara de las heces. Se moja, huele mal y los microbios no mueren.</p>`,
    ejemplo: `
      <p>Una familia vive en un clima templado, de unos 18 °C. Llenó la cámara 1 de su baño seco en marzo de 2026 y empieza a usar la cámara 2. ¿Desde cuándo podrían usar el contenido de la cámara 1 como abono, según EcoSanRes, y en qué cultivos?</p>
      <ol class="pasos-ej">
        <li>Primero busca el tiempo para su clima: de 17 a 20 °C, los lineamientos piden 18 meses.</li>
        <li>Cuenta 18 meses desde marzo de 2026: 12 meses llevan a marzo de 2027 y 6 más a septiembre de 2027.</li>
        <li>Antes de esa fecha la cámara 1 no se toca; siguen usando la 2.</li>
        <li>Aun después, mejor no usarlo en verduras que se comen crudas, salvo que esté bien higienizado; sirve para árboles frutales o cultivos que se cuecen.</li>
        <li>Comprueba: de marzo de 2026 a septiembre de 2027 hay 12 + 6 = 18 meses.</li>
      </ol>
      <p>Resultado: <span class="resultado">a partir de septiembre de 2027, en cultivos que no se comen crudos</span>.</p>`,
    vidaReal: `
      <p>Un baño seco bien manejado mejora tu casa y tu salud:</p>
      <ul>
        <li>Ahorras el agua que se iría en el inodoro.</li>
        <li>Tienes un sanitario digno aunque no haya drenaje.</li>
        <li>No contaminas el agua del subsuelo ni los ríos.</li>
        <li>Con tiempo y cuidado, obtienes abono para árboles y cultivos que se cuecen.</li>
        <li>Sabes por qué nunca se usa en verduras crudas sin higienizar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En clima tropical, de 28 a 30 °C, EcoSanRes considera suficiente un año de almacenamiento de las heces. ¿Cuántos meses son?</p>', respuesta: 12,
        pista: '<p>Un año tiene 12 meses.</p>',
        solucion: '<p><strong>12 meses</strong>. En climas de 17 a 20 °C se necesitan 18.</p>' },
      { tipo: 'numero', enunciado: '<p>Un inodoro común usa 6 litros por descarga. Si en tu casa se usa 15 veces al día, ¿cuántos litros ahorra al día un baño seco?</p>', respuesta: 6 * 15,
        pista: '<p>Multiplica los litros por las veces.</p>',
        solucion: '<p>6 × 15 = <strong>90 litros</strong> al día.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué se agrega tierra o aserrín con un poco de ceniza después de usar el baño seco?</p>',
        opciones: ['Para absorber la humedad, reducir el olor y alejar las moscas', 'Para que pese más', 'Para que se llene más rápido'], correcta: 0,
        pista: '<p>Es el material secante.</p>',
        solucion: '<p><strong>Absorbe la humedad, reduce el olor y forma una barrera contra las moscas.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el baño seco separa la orina de las heces?</p>',
        opciones: ['Para que huela más', 'Porque las heces se secan más rápido si no se mojan', 'Para usar más agua'], correcta: 1,
        pista: '<p>Al secarse, mueren los microbios.</p>',
        solucion: '<p><strong>Porque las heces secas se higienizan más rápido</strong> y no huelen.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según EcoSanRes, ¿en qué no se deben usar las heces que no se han higienizado bien?</p>',
        opciones: ['En árboles frutales', 'En pastos', 'En verduras, frutas o tubérculos que se comen crudos'], correcta: 2,
        pista: '<p>Piensa en lo que llega a tu boca sin cocerse.</p>',
        solucion: '<p><strong>En lo que se come crudo.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama un sanitario que no usa agua y en el que los desechos se secan en una cámara?</p>',
        respuestas: ['bano seco', 'el bano seco', 'sanitario seco', 'inodoro seco', 'sanitario ecologico seco', 'letrina seca'],
        pista: '<p>Son dos palabras; la segunda es lo contrario de "mojado".</p>',
        solucion: '<p>Un <strong>baño seco</strong>.</p>' },
    ],
    fuentes: [SSWM, ECOSAN, MITECO, OMSSAN],
  });

  // ------------------------------------------------------------------
  L('Manejo de residuos en casa', {
    objetivo: 'Organizar los residuos de tu casa, reconocer los residuos peligrosos y entender por qué no se debe quemar la basura.',
    explicacion: `
      <p>En el campo y en muchas colonias donde no pasa el camión de la basura, es común juntarla y quemarla en el patio. Parece la solución más rápida: el montón desaparece en una tarde. Pero el humo de esa basura no desaparece; se va a los pulmones de tu familia y de tus vecinos.</p>
      <h3>Lo que ya sabes</h3>
      <p>En Ciencias naturales, en "Consumo responsable y reciclaje", viste que lo mejor es generar menos residuos: rechazar, reducir, reutilizar, reparar y, al final, reciclar. También viste que los residuos orgánicos, como cáscaras y restos de comida, se convierten en composta, y en "El suelo y la composta" y "Lombricomposta y abonos verdes" aprendiste a hacerla. Aquí vas a organizar todo eso en casa y a conocer dos peligros: los residuos peligrosos y la quema.</p>
      <h3>Un sistema sencillo</h3>
      <p>Muchas familias separan en cuatro grupos, cada uno con su recipiente:</p>
      <ol>
        <li>Orgánicos, para la composta, la lombricomposta o las gallinas.</li>
        <li>Reciclables limpios y secos, como papel, cartón, vidrio, latas y los plásticos que reciban en tu localidad.</li>
        <li>Residuos peligrosos, que se guardan aparte.</li>
        <li>Lo demás, que va a la basura.</li>
      </ol>
      <p>Fíjate que, si separas bien los orgánicos, la bolsa de basura que queda es mucho más pequeña y casi no huele.</p>
      <h3>Los residuos peligrosos</h3>
      <p>La Agencia de Protección Ambiental de Estados Unidos (EPA) llama <strong>residuos peligrosos</strong> del hogar a los restos de productos que pueden incendiarse, reaccionar o explotar, o que son corrosivos o tóxicos. Pone como ejemplos las pinturas, los productos de limpieza, los aceites, las pilas y baterías y los plaguicidas.</p>
      <p>La EPA explica que tirarlos por el drenaje, en el suelo, en las alcantarillas o, a veces, con la basura común puede contaminar el ambiente y dañar la salud. Por eso:</p>
      <ul>
        <li>Guárdalos en su envase original, cerrados, con su etiqueta y fuera del alcance de los niños.</li>
        <li>Compra solo lo que vas a usar, para que no sobre.</li>
        <li>Pregunta en tu municipio si hay un centro o una jornada de acopio. La EPA explica que muchas comunidades los recogen.</li>
        <li>Recuerda lo que viste en la unidad Energía: las baterías de litio no van a la basura.</li>
      </ul>
      <h3>¿Por qué no quemar la basura?</h3>
      <p>El Departamento de Ecología del estado de Washington explica que la basura de hoy ya no es como la de antes: además de papel, madera y comida, tiene plástico, metal, hule, telas sintéticas y químicos. Al quemarla en un barril o en el suelo, el fuego arde a baja temperatura y con poco oxígeno, y produce mucho humo con sustancias tóxicas, como las <strong>dioxinas</strong> y el benceno. Ese humo se queda cerca del suelo, donde se respira con facilidad.</p>
      <p>La misma guía enumera sus efectos: de inmediato, irritación de ojos, nariz, garganta y pulmones, dolor de cabeza y malestar de estómago; a largo plazo, más riesgo de cáncer, asma y defectos al nacer. Los más afectados son los niños, los adolescentes, las mujeres embarazadas y las personas mayores.</p>
      <p>La Organización Mundial de la Salud explica que las dioxinas son muy tóxicas, que pueden causar cáncer y problemas en la reproducción y en las defensas del cuerpo, y que la quema de desechos sin control es la causa más grave de su emisión al ambiente. Además, se acumulan en las cadenas alimentarias: más del 90% de lo que entra al cuerpo humano llega por los alimentos, sobre todo la carne y los lácteos. Si quemas basura cerca de tu huerto o de tus animales, las dioxinas pueden terminar en tu comida.</p>
      <p>Como viste en la unidad Fuego y calor, las fogatas tampoco son lugar para basura, aerosoles ni pilas.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que quemar la basura la elimina. Solo la convierte en humo tóxico y en cenizas contaminadas.</p>`,
    ejemplo: `
      <p>Una familia tira 1.2 kg de basura al día. Al separar, descubre que la mitad son orgánicos y una cuarta parte son reciclables. ¿Cuántos kilos al día quedan para la basura común?</p>
      <ol class="pasos-ej">
        <li>Primero calcula los orgánicos: la mitad de 1.2 es 1.2 ÷ 2 = 0.6 kg, que van a la composta.</li>
        <li>Luego los reciclables: la cuarta parte de 1.2 es 1.2 ÷ 4 = 0.3 kg.</li>
        <li>Resta los dos al total: 1.2 − 0.6 − 0.3 = 0.3 kg.</li>
        <li>Comprueba con fracciones: 1/2 + 1/4 = 3/4, así que queda 1/4, y 1.2 × 1/4 = 0.3 kg.</li>
      </ol>
      <p>Resultado: <span class="resultado">0.3 kg al día</span>, apenas la cuarta parte de lo que tiraban antes de separar. Los residuos peligrosos, aunque sean pocos, se guardan aparte.</p>
      <p class="nota"><strong>Error común:</strong> restar solo los orgánicos y olvidar los reciclables.</p>`,
    vidaReal: `
      <p>Manejar bien tus residuos protege a tu familia y a tu tierra:</p>
      <ul>
        <li>Tu bolsa de basura se hace mucho más pequeña.</li>
        <li>Los restos de comida se vuelven abono para tu huerto.</li>
        <li>Guardas lejos de los niños las pinturas, los plaguicidas y los químicos.</li>
        <li>Evitas el humo tóxico de quemar basura cerca de tu casa y de tus animales.</li>
        <li>Sabes que en tu municipio puede haber un lugar para llevar los residuos peligrosos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tiras 2 kg de basura al día y el 60% es orgánico. ¿Cuántos kilos puedes llevar a la composta al día?</p>', respuesta: 2 * 0.6,
        pista: '<p>Calcula el 60% de 2.</p>',
        solucion: '<p>2 × 0.6 = <strong>1.2 kg</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Según la OMS, más del 90% de la exposición humana a las dioxinas llega por los alimentos. De cada 100 partes, ¿cuántas llegan por otras vías, como máximo?</p>', respuesta: 100 - 90,
        pista: '<p>Resta 90 a 100.</p>',
        solucion: '<p>100 − 90 = <strong>10 partes</strong> como máximo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Te sobró medio bote de pintura y un plaguicida. ¿Qué haces?</p>',
        opciones: ['Los tiras al drenaje', 'Los guardas cerrados, con etiqueta y lejos de los niños, y preguntas por un centro de acopio', 'Los quemas en el patio'], correcta: 1,
        pista: '<p>Son residuos peligrosos.</p>',
        solucion: '<p><strong>Guardarlos bien y llevarlos a un centro de acopio.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el humo de quemar basura en un barril es tan dañino?</p>',
        opciones: ['Porque huele a leña', 'Porque calienta mucho el patio', 'Porque arde a baja temperatura, con poco oxígeno, y suelta sustancias tóxicas como las dioxinas'], correcta: 2,
        pista: '<p>Piensa en el triángulo del fuego y en lo que tiene la basura de hoy.</p>',
        solucion: '<p><strong>Arde mal y suelta sustancias tóxicas</strong> que se quedan cerca del suelo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la EPA, ¿cuál de estos es un residuo peligroso del hogar?</p>',
        opciones: ['Las pilas', 'Las cáscaras de fruta', 'El papel periódico'], correcta: 0,
        pista: '<p>Puede contener sustancias tóxicas o corrosivas.</p>',
        solucion: '<p><strong>Las pilas.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llaman las sustancias muy tóxicas que se producen al quemar basura sin control y se acumulan en los alimentos?</p>',
        respuestas: ['dioxinas', 'las dioxinas', 'dioxina'],
        pista: '<p>Empieza con "d".</p>',
        solucion: '<p>Las <strong>dioxinas</strong>.</p>' },
    ],
    fuentes: [EPAHHW, QUEMA, DIOXINAS],
  });

  // ------------------------------------------------------------------
  L('Vivienda autosuficiente en la ciudad', {
    objetivo: 'Armar un plan para hacer más autosuficiente una casa o un departamento en la ciudad, ordenando lo aprendido en la materia por sistemas y por prioridad.',
    explicacion: `
      <p>En la primera unidad, en "Empezar poco a poco: autosuficiencia en la ciudad y en el campo", viste que en la ciudad suele faltar espacio y sobrar prisa, y que conviene subir un escalón a la vez. Ahora que recorriste toda la materia, puedes armar un plan completo para tu casa. No se trata de hacerlo todo, sino de saber qué hacer primero.</p>
      <h3>Un plan por sistemas</h3>
      <p>Un <strong>plan por sistemas</strong> es revisar tu casa por partes, como un médico revisa el cuerpo: el agua, la comida, la energía, los residuos y la vivienda misma. Para cada sistema te preguntas qué tienes, qué te falta y cuál es el siguiente paso pequeño. Esta es una guía para un departamento o una casa sin patio, con la lección donde aprendiste cada cosa.</p>
      <h3>Agua</h3>
      <ul>
        <li>Ten guardada agua para emergencias, como viste en "Almacenar agua de forma segura".</li>
        <li>Arregla las fugas y reutiliza el agua de la regadera mientras sale fría, como viste en "Ahorrar y reutilizar agua en casa".</li>
        <li>Si tu techo o balcón lo permite, capta un poco de agua de lluvia para regar, como viste en "Captar agua de lluvia".</li>
      </ul>
      <h3>Comida</h3>
      <ul>
        <li>Cultiva hierbas, hojas y jitomates en macetas, como viste en "Huerto en macetas y balcones".</li>
        <li>Planea las comidas y aprovecha las sobras, como viste en "Evitar el desperdicio de comida".</li>
        <li>Ten una despensa básica y aprende a conservar lo que compras barato en temporada, como viste en la unidad Alimentos.</li>
      </ul>
      <h3>Energía</h3>
      <ul>
        <li>Haz tu inventario de consumo y cambia a focos LED, como viste en las dos primeras lecciones de la unidad Energía.</li>
        <li>Si tu edificio lo permite, un panel pequeño con batería puede darte luz y cargar teléfonos durante un apagón.</li>
        <li>Revisa contactos y extensiones con la lista de "Seguridad eléctrica en instalaciones caseras".</li>
      </ul>
      <h3>Residuos</h3>
      <ul>
        <li>Separa orgánicos y haz lombricomposta en una caja, que casi no ocupa espacio, como viste en "Lombricomposta y abonos verdes".</li>
        <li>Guarda aparte los residuos peligrosos, como viste en "Manejo de residuos en casa".</li>
      </ul>
      <h3>Vivienda y seguridad</h3>
      <ul>
        <li>Aprovecha la ventilación cruzada y pon cortinas gruesas o toldos según la estación, como viste en "Orientación, sol y ventilación" y en "Aislamiento térmico: fresca en verano y tibia en invierno".</li>
        <li>Instala detectores de humo y haz un plan de escape, como viste en "Prevenir y apagar incendios".</li>
        <li>Ten un plan familiar para emergencias. Ready.gov, el sitio de emergencias del Gobierno de Estados Unidos, recomienda hacer un plan con tu familia antes de que ocurra una emergencia.</li>
      </ul>
      <h3>Cómo decidir qué va primero</h3>
      <p>Ordena los pasos con tres preguntas:</p>
      <ol>
        <li>¿Protege la vida o la salud? Lo que evita un incendio, una intoxicación o quedarte sin agua va primero.</li>
        <li>¿Cuesta poco y ahorra mucho? Cambiar focos o arreglar una fuga se paga solo en poco tiempo.</li>
        <li>¿Lo vas a mantener? Una maceta que riegas vale más que diez que se secan.</li>
      </ol>
      <h3>Pide permiso</h3>
      <p>En la ciudad muchas cosas dependen de otros. Si rentas, pide permiso al dueño antes de instalar algo. Si vives en un edificio, revisa las reglas sobre la azotea, los balcones y el peso de las macetas. Y recuerda lo que viste en la unidad Energía: los trabajos eléctricos los hace un electricista calificado.</p>
      <p class="nota"><strong>Trampa común:</strong> querer hacerlo todo en un mes. Es mejor un paso al mes que se mantiene durante años.</p>`,
    ejemplo: `
      <p>Tienes 1 000 pesos este mes para mejorar tu departamento. Las opciones son: detector de humo, 300 pesos; 5 focos LED, 250 pesos; macetas y tierra, 400 pesos; panel solar pequeño, 900 pesos. ¿Qué eliges con las tres preguntas?</p>
      <ol class="pasos-ej">
        <li>Primero lo que protege la vida: el detector de humo, 300 pesos.</li>
        <li>Luego lo barato que ahorra mucho: los focos LED, 250 pesos. Llevas 300 + 250 = 550 pesos.</li>
        <li>Te quedan 1 000 − 550 = 450 pesos. Las macetas, 400 pesos, sí caben si las vas a cuidar.</li>
        <li>El panel, 900 pesos, ya no cabe; queda para otro mes.</li>
        <li>Comprueba: 300 + 250 + 400 = 950 pesos, menos de 1 000.</li>
      </ol>
      <p>Resultado: <span class="resultado">detector, focos LED y macetas; el panel, después</span>. Los precios son solo un ejemplo.</p>`,
    vidaReal: `
      <p>Tener un plan para tu casa en la ciudad te da tranquilidad:</p>
      <ul>
        <li>Sabes qué mejorar primero y por qué.</li>
        <li>Gastas poco a poco en lo que de verdad te ayuda.</li>
        <li>Tu familia está mejor preparada para un apagón, un incendio o un corte de agua.</li>
        <li>Aprovechas hasta un balcón o una ventana para producir algo de comida.</li>
        <li>Respetas las reglas de tu edificio y de tu arrendador.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tienes 800 pesos. Compras un detector de humo de 300 pesos y 4 focos LED de 50 pesos cada uno. ¿Cuánto te queda?</p>', respuesta: 800 - 300 - 4 * 50,
        pista: '<p>Calcula el costo de los focos y resta todo de 800.</p>',
        solucion: '<p>4 × 50 = 200, y 800 − 300 − 200 = <strong>300 pesos</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si das un paso de tu plan cada mes, ¿cuántos pasos habrás dado en 2 años?</p>', respuesta: 24,
        pista: '<p>Un año tiene 12 meses.</p>',
        solucion: '<p>12 × 2 = <strong>24 pasos</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Con las tres preguntas, ¿qué conviene hacer primero?</p>',
        opciones: ['Comprar un panel solar grande', 'Instalar un detector de humo', 'Sembrar diez macetas'], correcta: 1,
        pista: '<p>Lo que protege la vida va primero.</p>',
        solucion: '<p><strong>El detector de humo</strong>, porque protege la vida.</p>' },
      { tipo: 'opciones', enunciado: '<p>Rentas un departamento y quieres poner un panel en la azotea. ¿Qué haces antes?</p>',
        opciones: ['Lo instalas tú sin avisar', 'Lo pones en la ventana sin fijarlo', 'Pides permiso al dueño y revisas las reglas del edificio'], correcta: 2,
        pista: '<p>En la ciudad muchas cosas dependen de otros.</p>',
        solucion: '<p><strong>Pedir permiso y revisar las reglas.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué opción de residuos ocupa muy poco espacio en un departamento?</p>',
        opciones: ['La lombricomposta en una caja', 'Un biodigestor', 'Quemar la basura en la azotea'], correcta: 0,
        pista: '<p>La viste en la unidad El suelo y el huerto.</p>',
        solucion: '<p><strong>La lombricomposta</strong> cabe en una caja.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama revisar tu casa por partes, como el agua, la comida, la energía, los residuos y la vivienda?</p>',
        respuestas: ['plan por sistemas', 'un plan por sistemas', 'el plan por sistemas'],
        pista: '<p>Son tres palabras; la última es "sistemas".</p>',
        solucion: '<p>Un <strong>plan por sistemas</strong>.</p>' },
    ],
    fuentes: [READYPLAN, FS21, EPAHHW],
  });

  // ------------------------------------------------------------------
  L('Vivienda autosuficiente en el campo', {
    objetivo: 'Planear una casa autosuficiente en el campo, conectando agua, saneamiento, comida, energía y residuos para que unos sistemas alimenten a otros.',
    explicacion: `
      <p>En el campo hay espacio para casi todo lo que viste en esta materia: captar lluvia, sembrar milpa, criar gallinas, poner paneles o un biodigestor. Pero también hay más trabajo y menos servicios cerca. La clave es empezar por lo más importante y hacer que los sistemas se ayuden entre sí.</p>
      <h3>Primero, agua y saneamiento</h3>
      <p>En "Qué hace digna a una vivienda" viste que el agua potable y las instalaciones sanitarias son parte de una vivienda adecuada. Y en "Baño seco y aprovechamiento de aguas grises" viste que, según la OMS, un saneamiento deficiente transmite enfermedades como el cólera y la fiebre tifoidea. Por eso, antes del huerto o los paneles, conviene asegurar:</p>
      <ul>
        <li>Una fuente de agua segura, como viste en "Fuentes de agua: lluvia, pozos, ríos y manantiales", y la forma de purificarla, como en "Purificar agua: hervir, cloro y desinfección solar".</li>
        <li>Agua guardada para la temporada seca, con un sistema de captación de lluvia, como en "Captar agua de lluvia".</li>
        <li>Un baño seco o una letrina bien hecha, para que las heces no lleguen al agua que bebes.</li>
      </ul>
      <h3>Que unos sistemas alimenten a otros</h3>
      <p>En la naturaleza no hay basura: lo que sobra de un ser vivo es alimento para otro, como viste en Ciencias naturales con el ciclo de la materia. Una casa en el campo puede funcionar parecido. A eso le llamaremos <strong>diseño integrado</strong>: acomodar los sistemas para que el desecho de uno sea el recurso de otro. Algunos ejemplos que ya conoces:</p>
      <ul>
        <li>Los restos de la cocina alimentan a las gallinas o van a la composta, y la composta alimenta el huerto, como viste en "Gallinas y animales pequeños" y "El suelo y la composta".</li>
        <li>El estiércol de los animales entra al biodigestor, que da gas para cocinar y abono para la milpa, como viste en "Biodigestor: gas a partir de residuos".</li>
        <li>Las aguas grises de la regadera riegan plantas que no se comen crudas, como viste en "Ahorrar y reutilizar agua en casa".</li>
        <li>Las semillas que guardas de tu cosecha son la siembra del año siguiente, como viste en la unidad Guardar tus propias semillas.</li>
        <li>Los árboles para leña y sombra protegen la casa del sol de la tarde y dan combustible, como viste en "Leña y carbón: usarlos sin acabar con el bosque".</li>
      </ul>
      <h3>Acomodar en el terreno</h3>
      <p>El orden en el terreno también importa. Lo que visitas a diario, como el huerto de hortalizas y las gallinas, conviene cerca de la casa. Los frutales, la milpa y la leña pueden ir más lejos. El baño seco y los corrales van lejos del pozo y de donde se junta el agua para beber. La casa se orienta con su lado largo y sus ventanas hacia el sol del mediodía, con aleros, como viste en "Orientación, sol y ventilación". Y si hay sismos en tu zona, recuerda lo que viste en "Materiales locales: adobe, bambú y tierra".</p>
      <h3>Energía</h3>
      <p>Empieza con el inventario de consumo y el ahorro. Después decide qué fuente conviene en tu terreno: paneles si hay mucho sol, un arroyo con caída si lo tienes y te dan permiso, una estufa eficiente para la leña y un calentador solar para el agua. Todo eso lo viste en la unidad Energía.</p>
      <h3>Un plan por etapas</h3>
      <p>Una forma de ordenar los primeros años:</p>
      <ol>
        <li>Primer año: agua segura, baño, huerto pequeño y composta.</li>
        <li>Segundo año: captación de lluvia más grande, gallinas, frutales y estufa eficiente.</li>
        <li>Después: paneles, calentador solar, biodigestor y mejoras a la casa.</li>
      </ol>
      <p>Ajusta el orden a tu lugar, tu dinero y tu tiempo. Y recuerda lo que viste en la primera unidad: ser autosuficiente no es producirlo todo ni vivir aislado. Tus vecinos, el intercambio de semillas y la ayuda mutua son parte del plan, como verás en la unidad Habilidades y comunidad.</p>
      <p class="nota"><strong>Trampa común:</strong> empezar por lo más vistoso, como los paneles, antes de tener agua segura y un baño digno.</p>`,
    ejemplo: `
      <p>En tu terreno tienes un pozo. Quieres poner el baño seco, el corral de las gallinas, el huerto y los frutales. ¿Cómo acomodas cada uno respecto a la casa y al pozo?</p>
      <ol class="pasos-ej">
        <li>Primero protege el agua: el baño seco y el corral van lejos del pozo, para que nada contamine el agua que bebes.</li>
        <li>Luego lo que visitas a diario: el huerto, cerca de la casa, para regarlo y cosechar fácil.</li>
        <li>Las gallinas, cerca del huerto, para llevarles los restos de cocina y sacar su estiércol para la composta, pero con el corral lejos del pozo.</li>
        <li>Los frutales, más lejos, porque los visitas menos y dan sombra.</li>
        <li>Comprueba con el diseño integrado: restos de cocina, gallinas, composta, huerto. Cada paso queda cerca del siguiente.</li>
      </ol>
      <p>Resultado: <span class="resultado">huerto y gallinas cerca de la casa; baño y corral lejos del pozo; frutales más lejos</span>.</p>`,
    vidaReal: `
      <p>Planear tu casa en el campo como un sistema te ahorra trabajo y dinero:</p>
      <ul>
        <li>Sabes qué hacer primero para proteger la salud de tu familia.</li>
        <li>Lo que antes era basura se vuelve comida, abono o gas.</li>
        <li>Caminas menos porque cada cosa está donde la necesitas.</li>
        <li>Proteges tu pozo de la contaminación.</li>
        <li>Avanzas por etapas, sin endeudarte ni agotarte en el intento.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tu plan tiene 12 mejoras y haces 4 cada año. ¿En cuántos años lo terminas?</p>', respuesta: 12 / 4,
        pista: '<p>Divide las mejoras entre las que haces por año.</p>',
        solucion: '<p>12 ÷ 4 = <strong>3 años</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tus gallinas comen 1.5 kg de restos de cocina a la semana. ¿Cuántos kilos dejan de ir a la basura en un año de 52 semanas?</p>', respuesta: 1.5 * 52,
        pista: '<p>Multiplica por 52.</p>',
        solucion: '<p>1.5 × 52 = <strong>78 kg</strong> al año.</p>' },
      { tipo: 'opciones', enunciado: '<p>Acabas de llegar a un terreno. ¿Qué conviene asegurar primero?</p>',
        opciones: ['Los paneles solares', 'El biodigestor', 'El agua segura y un baño digno'], correcta: 2,
        pista: '<p>Lo que protege la salud va primero.</p>',
        solucion: '<p><strong>Agua segura y baño.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Dónde conviene poner el baño seco y el corral?</p>',
        opciones: ['Lejos del pozo y del agua para beber', 'Junto al pozo, para tener agua cerca', 'Dentro de la cocina'], correcta: 0,
        pista: '<p>Protege el agua que bebes.</p>',
        solucion: '<p><strong>Lejos del pozo.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es un ejemplo de diseño integrado?</p>',
        opciones: ['Comprar abono y tirar los restos de cocina', 'Llevar el estiércol al biodigestor y usar su abono en la milpa', 'Quemar las hojas secas del huerto'], correcta: 1,
        pista: '<p>El desecho de uno es el recurso de otro.</p>',
        solucion: '<p><strong>Estiércol al biodigestor y abono a la milpa.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo llamamos a acomodar los sistemas para que el desecho de uno sea el recurso de otro?</p>',
        respuestas: ['diseno integrado', 'el diseno integrado', 'diseno integral'],
        pista: '<p>Son dos palabras; la primera es "diseño".</p>',
        solucion: '<p><strong>Diseño integrado</strong>.</p>' },
    ],
    fuentes: [FS21, OMSSAN, READYPLAN],
  });
})();
