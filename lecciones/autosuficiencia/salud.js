// Autosuficiencia · Unidad 11: Salud y primeros auxilios.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Solo fuentes oficiales (OMS, MedlinePlus, NCCIH, departamentos de salud). Sin diagnósticos ni dosis de medicamentos.
// La receta del suero oral se copia tal cual del manual de la OMS "The treatment of diarrhoea" (2005).
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

  const MEDLINE = (ruta, nombre) => ({ nombre: `MedlinePlus en español: ${nombre}`, url: `https://medlineplus.gov/spanish/${ruta}` });
  const OMS = (ruta, nombre) => ({ nombre: `Organización Mundial de la Salud: ${nombre}`, url: `https://www.who.int/es/news-room/fact-sheets/detail/${ruta}` });
  const OMSDIARREA = { nombre: 'Organización Mundial de la Salud: The treatment of diarrhoea, manual para médicos y personal de salud, 4.ª revisión, 2005 (en inglés)', url: 'https://iris.who.int/server/api/core/bitstreams/df59ceab-2498-4a64-bd93-ad7566addb4e/content' };
  const CLAVES = { nombre: 'Organización Mundial de la Salud: Manual sobre las cinco claves para la inocuidad de los alimentos (PDF, copia del INTI de Argentina)', url: 'https://www.inti.gob.ar/assets/uploads/files/certificaciones/manipuladores-de-alimentos/manual_keys_es.pdf' };

  const NCCIH = (ruta, nombre) => ({ nombre: `Centro Nacional de Salud Complementaria e Integral de EE. UU. (NCCIH): ${nombre} (en inglés)`, url: `https://www.nccih.nih.gov/health/${ruta}` });
  const OMSTRAD = { nombre: 'Organización Mundial de la Salud: Medicina tradicional, preguntas y respuestas', url: 'https://www.who.int/es/news-room/questions-and-answers/item/traditional-medicine' };
  const TEXAS = { nombre: 'Departamento de Servicios Estatales de Salud de Texas: ¿Qué hay en su gabinete? Plomo en remedios caseros (PDF)', url: 'https://www.dshs.texas.gov/sites/default/files/CHI-BloodLead/Educational%20materials/DSHS/Lead-Whats-In-Your-Cabinet-Flyer-Spanish.pdf' };

  // ------------------------------------------------------------------
  const RUTA = diagrama([0, 18], [-0.6, 10.6], [
    caja(0.3, 4, 3.3, 6), txt(1.8, 5, 'heces'),
    caja(14.7, 4, 17.7, 6), txt(16.2, 5, 'boca'),
    ...[['manos', 8.6], ['agua', 6.2], ['comida', 3.8], ['moscas', 1.4]].flatMap(([t, y]) => [
      caja(6.5, y - 0.7, 11.5, y + 0.7), txt(9, y, t),
      ...flecha([3.4, 5], [6.4, y]), ...flecha([11.6, y], [14.6, 5]),
    ]),
    txt(9, 10, 'cuatro caminos'), txt(9, -0.2, 'las barreras cortan cada camino'),
  ], 'A la izquierda, una caja que dice heces; a la derecha, una que dice boca. Entre ellas, cuatro caminos: manos, agua, comida y moscas, cada uno con una flecha que viene de las heces y otra que va a la boca. Abajo dice que las barreras cortan cada camino.');

  L('Higiene y saneamiento para prevenir enfermedades', {
    objetivo: 'Entender cómo los microbios de las heces llegan a la boca y qué barreras sencillas cortan ese camino en casa.',
    explicacion: `
      <p>Nadie se come las heces a propósito. Y aun así, muchas de las enfermedades más comunes del mundo, como la diarrea, llegan justo así: con unos microbios que salen en las heces de una persona o un animal y, por caminos que no se ven, terminan en la boca de otra. Conocer esos caminos es la mejor forma de cerrarlos.</p>
      <h3>Por qué importa</h3>
      <p>La Organización Mundial de la Salud (OMS) informa que en 2022 más de 1 500 millones de personas no tenían un servicio básico de saneamiento, como un retrete o una letrina propios, y que 419 millones defecaban al aire libre. Explica que un saneamiento deficiente transmite enfermedades como el cólera, la disentería, la fiebre tifoidea y otras diarreas.</p>
      <h3>Los cuatro caminos</h3>
      <p>Al camino que siguen los microbios desde las heces hasta la boca se le llama <strong>ruta fecal-oral</strong>. "Fecal" viene de heces y "oral", de boca. Los microbios pueden viajar:</p>
      <ul>
        <li>En las manos que no se lavaron después de ir al baño o de limpiar a un bebé.</li>
        <li>En el agua, si las heces llegan a un pozo, un río o un tambo destapado.</li>
        <li>En la comida, si se prepara con manos o agua sucias, o si se riega con aguas sucias.</li>
        <li>En las moscas, que se paran en las heces y luego en la comida.</li>
      </ul>
      ${RUTA}
      <h3>Las barreras</h3>
      <p>Cada barrera corta uno o varios caminos. El manual de la OMS para tratar la diarrea las enumera, y muchas ya las conoces de esta materia:</p>
      <ul>
        <li>Un baño o una letrina limpia. La OMS explica que toda familia necesita una letrina que funcione. Si no la hay, hay que defecar en un lugar designado y enterrar las heces de inmediato. Las heces de los niños pequeños llevan especialmente muchos microbios: se recogen pronto y se echan a la letrina o se entierran. En la unidad Vivienda viste el baño seco.</li>
        <li>Agua segura. La OMS pide tomar el agua de la fuente más limpia, no bañarse, lavar ni defecar cerca de ella, poner las letrinas a más de 10 metros de la fuente y cuesta abajo, y mantener a los animales lejos. En la unidad Agua viste cómo purificarla y guardarla.</li>
        <li>Lavarse las manos con jabón en los momentos clave, como verás en la siguiente lección.</li>
        <li>Comida segura, cocinada y guardada como verás en esa misma lección.</li>
        <li>Basura bien manejada, para no atraer moscas, como viste en "Manejo de residuos en casa".</li>
      </ul>
      <p>La OMS agrega dos barreras más para los niños: la lactancia materna y la vacuna contra el sarampión, que reduce mucho la diarrea y su gravedad. En Ciencias naturales, en "Sistema inmunológico y vacunas", viste cómo funcionan las vacunas.</p>
      <h3>Guardar el agua sin ensuciarla</h3>
      <p>Aunque el agua llegue limpia a tu casa, se puede ensuciar al guardarla. El manual de la OMS da reglas sencillas:</p>
      <ul>
        <li>Usa recipientes limpios y tapados, y vacíalos y enjuágalos cada día.</li>
        <li>No dejes que los niños ni los animales beban directo del recipiente.</li>
        <li>Saca el agua con un cucharón de mango largo, que se usa solo para eso, para que las manos no toquen el agua.</li>
      </ul>
      <p>Si una persona de la casa tiene diarrea, estas barreras importan todavía más, para que no se contagien los demás. Si la diarrea es fuerte, lleva sangre o la persona no puede beber, busca atención médica, como verás en "Suero oral casero contra la deshidratación".</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que el agua se ve limpia y por eso es segura. Los microbios no se ven.</p>`,
    ejemplo: `
      <p>Una familia saca agua de un pozo y quiere hacer una letrina. El terreno baja desde la casa hacia el arroyo, y el pozo está a 6 metros de la casa, cuesta abajo. ¿Dónde conviene la letrina, según la OMS?</p>
      <ol class="pasos-ej">
        <li>Primero recuerda la regla: la letrina va a más de 10 metros de la fuente de agua y cuesta abajo de ella.</li>
        <li>El pozo está cuesta abajo de la casa, así que la letrina no puede ir entre la casa y el pozo: ahí quedaría cuesta arriba del pozo.</li>
        <li>Debe ir más abajo que el pozo y a más de 10 metros de él, por ejemplo hacia el arroyo, pero lejos de su orilla.</li>
        <li>Comprueba con la ruta fecal-oral: el agua de lluvia que pase por la letrina corre cuesta abajo, lejos del pozo, y no llega al agua que beben.</li>
      </ol>
      <p>Resultado: <span class="resultado">más de 10 metros del pozo y cuesta abajo de él</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner la letrina cerca de la casa por comodidad, sin fijarse dónde queda el pozo.</p>`,
    vidaReal: `
      <p>Conocer la ruta fecal-oral te ayuda a cuidar a tu familia todos los días:</p>
      <ul>
        <li>Sabes por qué lavarte las manos es tan importante.</li>
        <li>Guardas el agua de beber sin ensuciarla.</li>
        <li>Pones la letrina o el baño donde no contamina tu pozo.</li>
        <li>Cuando alguien tiene diarrea, evitas que se contagie el resto de la casa.</li>
        <li>Entiendes que la basura y las moscas también son parte del problema.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Según la OMS, en 2022 más de 1 500 millones de personas no tenían saneamiento básico, y de ellas 419 millones defecaban al aire libre. Usando 1 500, ¿cuántos millones de esas personas no defecaban al aire libre?</p>', respuesta: 1500 - 419,
        pista: '<p>Resta los que defecaban al aire libre.</p>',
        solucion: '<p>1 500 − 419 = <strong>1 081 millones</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>La OMS pide poner la letrina a más de 10 metros de la fuente de agua. Si hoy está a 7 metros, ¿cuántos metros más hay que alejarla como mínimo?</p>', respuesta: 10 - 7,
        pista: '<p>Resta lo que ya tienes.</p>',
        solucion: '<p>10 − 7 = <strong>3 metros</strong> como mínimo; mejor algo más, porque debe quedar a <em>más</em> de 10.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos NO es un camino de la ruta fecal-oral?</p>',
        opciones: ['Las manos sin lavar', 'Las moscas', 'El aire limpio de la montaña'], correcta: 2,
        pista: '<p>Piensa en lo que puede tocar las heces.</p>',
        solucion: '<p><strong>El aire limpio</strong> no lleva heces a la boca.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la OMS, ¿cómo conviene sacar el agua de un recipiente donde la guardas?</p>',
        opciones: ['Con un cucharón de mango largo que se usa solo para eso', 'Metiendo el vaso con la mano', 'Dejando que los niños beban directo'], correcta: 0,
        pista: '<p>Las manos no deben tocar el agua.</p>',
        solucion: '<p><strong>Con un cucharón de mango largo</strong>, para que las manos no toquen el agua.</p>' },
      { tipo: 'opciones', enunciado: '<p>No hay letrina cerca. Según la OMS, ¿qué se hace con las heces?</p>',
        opciones: ['Se dejan al sol', 'Se entierran de inmediato en un lugar designado', 'Se echan al río'], correcta: 1,
        pista: '<p>Hay que cortar el camino hacia las moscas y el agua.</p>',
        solucion: '<p><strong>Se entierran de inmediato</strong>, en un lugar designado.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el camino que siguen los microbios desde las heces hasta la boca?</p>',
        respuestas: ['ruta fecal-oral', 'ruta fecal oral', 'fecal-oral', 'fecal oral', 'via fecal-oral', 'via fecal oral', 'transmision fecal-oral'],
        pista: '<p>Une la palabra de las heces con la de la boca.</p>',
        solucion: '<p>La <strong>ruta fecal-oral</strong>.</p>' },
    ],
    fuentes: [OMS('sanitation', 'Saneamiento'), OMSDIARREA, OMS('diarrhoeal-disease', 'Enfermedades diarreicas')],
  });

  // ------------------------------------------------------------------
  L('Lavado de manos y manejo seguro de alimentos', {
    objetivo: 'Lavarte las manos en los momentos clave y aplicar las cinco claves de la OMS para que la comida no enferme a nadie.',
    explicacion: `
      <p>Tus manos tocan todo: la manija del baño, el dinero, la cara de un bebé, la carne cruda, la tortilla que te vas a comer. Por eso son el camino favorito de los microbios, como viste en la lección anterior. Y la comida, si se maneja mal, puede convertirse en el siguiente paso de ese camino.</p>
      <h3>Por qué importa</h3>
      <p>La OMS estima que cada año unos 866 millones de personas, casi una de cada nueve, se enferman por comer alimentos contaminados, y que 1.52 millones mueren por esa causa. Los niños menores de 5 años cargan el 29% de esas enfermedades.</p>
      <h3>Cuándo lavarte las manos</h3>
      <p>El manual de la OMS sobre las cinco claves para la inocuidad de los alimentos dice que hay que lavarse las manos:</p>
      <ul>
        <li>Antes de tocar los alimentos y varias veces mientras los preparas.</li>
        <li>Antes de comer.</li>
        <li>Después de ir al baño y después de cambiar el pañal a un bebé.</li>
        <li>Después de tocar carne o pollo crudos.</li>
        <li>Después de sonarte la nariz, tocar basura, usar productos de limpieza o jugar con animales.</li>
      </ul>
      <h3>Cómo lavarlas</h3>
      <p>El manual de las cinco claves de la OMS da los pasos:</p>
      <ol>
        <li>Mójate las manos con agua corriente.</li>
        <li>Enjabónalas durante al menos 20 segundos, sin olvidar las yemas de los dedos, las uñas, los pulgares, las muñecas y los espacios entre los dedos.</li>
        <li>Enjuágalas con agua corriente.</li>
        <li>Sécalas por completo con una toalla limpia y seca.</li>
      </ol>
      <p>El agua fría o tibia está bien si usas jabón. Si no hay agua corriente, la OMS sugiere una cubeta con llave. Y si no hay jabón, el manual de la OMS para tratar la diarrea menciona sustitutos como la ceniza o la tierra, con suficiente agua para enjuagar bien.</p>
      <h3>Las cinco claves de la OMS</h3>
      <p>La <strong>inocuidad</strong> de un alimento quiere decir que no hace daño a quien lo come. La OMS la resume en cinco claves:</p>
      <ol>
        <li>Mantén la limpieza: manos, trapos, tablas y superficies limpias, y la cocina sin insectos ni animales.</li>
        <li>Separa los alimentos crudos de los cocinados. La OMS pide separar la carne roja, el pollo y el pescado crudos del resto, usar cuchillos y tablas distintos para lo crudo y guardar todo en recipientes tapados.</li>
        <li>Cocina completamente, sobre todo la carne, el pollo, los huevos y el pescado. La OMS explica que hervir sopas y guisos asegura que lleguen a 70 °C, y que en la carne y el pollo los jugos deben salir claros, no rosados. También hay que recalentar bien lo que ya se cocinó.</li>
        <li>Mantén los alimentos a temperaturas seguras. La OMS llama zona de peligro al intervalo de 5 a 60 °C, donde los microbios se multiplican rápido. Es parecido a lo que viste en la unidad Alimentos con Penn State, de 4 a 60 °C. Enfría y guarda pronto las sobras, y no dejes comida cocinada fuera del refrigerador más de dos horas.</li>
        <li>Usa agua y materias primas seguras: lava frutas y verduras con agua segura, sobre todo si se comen crudas; no uses alimentos caducados, y tira las latas hinchadas, aplastadas u oxidadas.</li>
      </ol>
      <h3>Contaminación cruzada</h3>
      <p>La segunda clave tiene que ver con algo muy común. La <strong>contaminación cruzada</strong> es cuando los microbios de un alimento crudo pasan a otro que ya está listo para comer, por medio de un cuchillo, una tabla, un trapo o las manos. Por ejemplo, si picas pollo crudo y luego, con el mismo cuchillo y sin lavarlo, picas el jitomate de la ensalada. El pollo después se cocina y sus microbios mueren, pero la ensalada se come cruda.</p>
      <p>Recuerda también lo que viste en la unidad Alimentos sobre los germinados, los huevos de las gallinas y las conservas. Y si alguien se enferma con diarrea, vómito o fiebre después de comer, el manual de la OMS pide que, si los síntomas son graves, consulte a un médico de inmediato.</p>
      <p class="nota"><strong>Trampa común:</strong> lavarse solo las palmas, rápido y sin jabón. La OMS explica que mucha gente se lava mal las manos: sin jabón o solo una parte de ellas.</p>`,
    ejemplo: `
      <p>Vas a preparar tacos de pollo con ensalada. Tienes una sola tabla y un solo cuchillo. ¿En qué orden trabajas para evitar la contaminación cruzada?</p>
      <ol class="pasos-ej">
        <li>Primero lávate las manos, como pide la primera clave.</li>
        <li>Pica antes la verdura de la ensalada, que se come cruda, mientras la tabla y el cuchillo están limpios.</li>
        <li>Guarda la ensalada tapada y aparte.</li>
        <li>Después corta el pollo crudo. Lávate las manos de nuevo y lava la tabla y el cuchillo con agua y jabón.</li>
        <li>Cocina el pollo hasta que sus jugos salgan claros, como pide la tercera clave.</li>
        <li>Comprueba: la ensalada nunca tocó nada que haya tocado el pollo crudo.</li>
      </ol>
      <p>Resultado: <span class="resultado">primero lo que se come crudo, después lo crudo que se va a cocinar</span>.</p>
      <p class="nota"><strong>Error común:</strong> picar el pollo primero y luego la ensalada en la misma tabla sin lavarla.</p>`,
    vidaReal: `
      <p>Lavarte las manos y manejar bien la comida protege a toda tu familia:</p>
      <ul>
        <li>Evitas diarreas y otras enfermedades que se pasan por la comida.</li>
        <li>Sabes en qué momentos no puedes dejar de lavarte las manos.</li>
        <li>Preparas la comida sin pasar microbios de lo crudo a lo cocinado.</li>
        <li>Guardas las sobras de forma segura.</li>
        <li>Cuidas sobre todo a los niños pequeños, que son los que más se enferman.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>La zona de peligro de la OMS va de 5 a 60 °C. ¿Cuántos grados abarca?</p>', respuesta: 60 - 5,
        pista: '<p>Resta el extremo bajo al alto.</p>',
        solucion: '<p>60 − 5 = <strong>55 °C</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>La OMS dice que casi una de cada nueve personas se enferma cada año por comer alimentos contaminados. En un pueblo de 2 700 personas, ¿cuántas serían?</p>', respuesta: 2700 / 9,
        pista: '<p>Divide entre 9.</p>',
        solucion: '<p>2 700 ÷ 9 = <strong>300 personas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es la contaminación cruzada?</p>',
        opciones: ['Que los microbios pasen de un alimento crudo a uno listo para comer', 'Cocinar dos platillos a la vez', 'Mezclar agua fría y caliente'], correcta: 0,
        pista: '<p>Pasa por cuchillos, tablas, trapos o manos.</p>',
        solucion: '<p><strong>Que los microbios pasen de lo crudo a lo listo para comer.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Según la OMS, ¿a qué temperatura deben llegar las sopas y los guisos?</p>',
        opciones: ['A 40 °C', 'A 70 °C, y por eso conviene hervirlos', 'A 20 °C'], correcta: 1,
        pista: '<p>Es la tercera clave.</p>',
        solucion: '<p><strong>A 70 °C.</strong> Hervirlos lo asegura.</p>' },
      { tipo: 'opciones', enunciado: '<p>No tienes jabón. Según el manual de la OMS para la diarrea, ¿qué puedes usar para lavarte las manos?</p>',
        opciones: ['Solo agua estancada', 'Nada, mejor no lavarlas', 'Ceniza o tierra, y suficiente agua para enjuagar'], correcta: 2,
        pista: '<p>La OMS menciona sustitutos locales.</p>',
        solucion: '<p><strong>Ceniza o tierra</strong>, enjuagando bien con agua.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la cualidad de un alimento que no hace daño a quien lo come?</p>',
        respuestas: ['inocuidad', 'la inocuidad', 'inocuo', 'inocuidad alimentaria'],
        pista: '<p>Empieza con "i".</p>',
        solucion: '<p>La <strong>inocuidad</strong>.</p>' },
    ],
    fuentes: [CLAVES, OMS('food-safety', 'Inocuidad de los alimentos'), OMSDIARREA, MEDLINE('foodsafety.html', 'Seguridad con los alimentos')],
  });

  // ------------------------------------------------------------------
  L('Botiquín básico', {
    objetivo: 'Armar y mantener un botiquín de primeros auxilios para la casa, y tener a la mano los teléfonos de emergencia.',
    explicacion: `
      <p>Cuando alguien se corta o se quema, no hay tiempo de ir a la tienda. Lo que necesitas tiene que estar en casa, en un solo lugar, y alguien de la familia tiene que saber dónde. Para eso sirve el botiquín.</p>
      <h3>¿Qué es un botiquín?</h3>
      <p>Un <strong>botiquín</strong> es una caja o bolsa con lo necesario para dar primeros auxilios. MedlinePlus, el sitio de salud de la Biblioteca Nacional de Medicina de Estados Unidos, recomienda guardar todo en un solo lugar, para saber exactamente dónde está cuando haga falta, y explica que la mayoría de las cosas se consiguen en la farmacia o el supermercado.</p>
      <h3>Qué lleva</h3>
      <p>Esta es una selección de la lista de MedlinePlus, ordenada por para qué sirve:</p>
      <ul>
        <li>Para cubrir heridas: curitas de varios tamaños, gasas estériles, gasas que no se pegan a la herida y cinta adhesiva.</li>
        <li>Para torceduras y sostener: una venda elástica, para la muñeca, el tobillo, la rodilla o el codo, y una venda triangular, que sirve también para hacer un cabestrillo.</li>
        <li>Para protegerte: guantes, desinfectante de manos y una mascarilla.</li>
        <li>Instrumentos: un termómetro y unas pinzas para sacar astillas o garrapatas.</li>
        <li>Para limpiar: una solución antiséptica y una solución salina estéril para enjuagar.</li>
        <li>Para el golpe: bolsas de hielo instantáneo.</li>
        <li>Un manual de primeros auxilios.</li>
      </ul>
      <p>MedlinePlus explica que se pueden agregar otras cosas según dónde vivas o a dónde vayas, por ejemplo si trabajas en el campo o sales de excursión.</p>
      <h3>¿Y las medicinas?</h3>
      <p>Esta lección no da medicinas ni dosis, porque dependen de cada persona, de su edad, de su peso y de sus enfermedades. Si alguien de tu familia toma un medicamento, guarda en el botiquín lo que le indicó su médico, en su caja original, con sus instrucciones. Nunca le des a un niño una medicina para adultos.</p>
      <h3>Mantenerlo al día</h3>
      <p>MedlinePlus pide revisar el botiquín con regularidad y reponer lo que se esté acabando o haya caducado. Una buena costumbre es revisarlo en una fecha fija, por ejemplo cada vez que cambias la pila del detector de humo, como viste en la unidad Fuego y calor. Guárdalo donde los adultos lo encuentren rápido, pero donde los niños pequeños no lo alcancen.</p>
      <h3>Los teléfonos de emergencia</h3>
      <p>Un botiquín sirve poco si no sabes a quién llamar. MedlinePlus recomienda:</p>
      <ul>
        <li>Tener los números de emergencia en un lugar fácil de ver en la casa y guardados en el celular: bomberos, policía, ambulancia, el centro de toxicología, tu médico y algún vecino o familiar.</li>
        <li>Que todos en la casa, incluidos los niños, sepan cuándo y cómo llamar.</li>
        <li>Saber antes dónde queda la sala de urgencias más cercana y cuál es el camino más rápido.</li>
      </ul>
      <p>Pega una hoja con esos números dentro de la tapa del botiquín. En Ciencias naturales, en "Primeros auxilios básicos", viste cómo pedir ayuda por teléfono.</p>
      <p class="nota"><strong>Trampa común:</strong> armar el botiquín una vez y olvidarlo. Cuando lo necesitas, las curitas se acabaron o la solución ya caducó.</p>`,
    ejemplo: `
      <p>Revisas el botiquín el 1 de marzo. La solución antiséptica caduca en julio de ese año y la solución salina, en enero del siguiente. Si lo revisas cada 4 meses, ¿en qué revisión cambias cada una?</p>
      <ol class="pasos-ej">
        <li>Primero calcula las fechas de revisión: 1 de marzo, 1 de julio, 1 de noviembre y 1 de marzo del año siguiente.</li>
        <li>La antiséptica caduca en julio. En la revisión del 1 de julio todavía no ha caducado, pero caducará antes de la siguiente, en noviembre. Conviene cambiarla en julio.</li>
        <li>La salina caduca en enero. La revisión de noviembre es la última antes de enero, así que la cambias en noviembre.</li>
        <li>Comprueba: si esperaras a marzo, la salina pasaría dos meses caducada en el botiquín.</li>
      </ol>
      <p>Resultado: <span class="resultado">la antiséptica en julio y la salina en noviembre</span>. La regla: cambia lo que caducará antes de la siguiente revisión.</p>`,
    vidaReal: `
      <p>Un botiquín bien armado te da calma cuando algo pasa:</p>
      <ul>
        <li>Puedes atender una cortada, una quemadura pequeña o una torcedura en casa.</li>
        <li>Sabes dónde está todo y que nada ha caducado.</li>
        <li>Tienes a la mano los números de emergencia y el del centro de toxicología.</li>
        <li>Tu familia sabe a quién llamar y a qué hospital ir.</li>
        <li>Puedes llevar uno pequeño cuando sales de excursión o trabajas en el campo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Si revisas el botiquín cada 4 meses, ¿cuántas veces lo revisas en un año?</p>', respuesta: 12 / 4,
        pista: '<p>Divide los 12 meses entre 4.</p>',
        solucion: '<p>12 ÷ 4 = <strong>3 veces</strong> al año.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu botiquín tenía 20 curitas. Usaste 3 en enero, 5 en febrero y 4 en marzo. ¿Cuántas quedan?</p>', respuesta: 20 - 3 - 5 - 4,
        pista: '<p>Resta lo que usaste cada mes.</p>',
        solucion: '<p>20 − 3 − 5 − 4 = <strong>8 curitas</strong>. Es buen momento para reponer.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según MedlinePlus, ¿cada cuánto se revisa el botiquín?</p>',
        opciones: ['Solo cuando se usa', 'Con regularidad, reponiendo lo que se acaba o caduca', 'Nunca, si está cerrado'], correcta: 1,
        pista: '<p>Las cosas se acaban y caducan.</p>',
        solucion: '<p><strong>Con regularidad</strong>, reponiendo lo que falte o haya caducado.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tu hijo de 6 años tiene dolor y en el botiquín hay una medicina para adultos. ¿Qué haces?</p>',
        opciones: ['Le das media pastilla', 'Le das la dosis completa', 'No se la das y consultas a un médico o farmacéutico'], correcta: 2,
        pista: '<p>Las dosis dependen de la edad y el peso.</p>',
        solucion: '<p><strong>No se la das</strong> y preguntas a un profesional de la salud.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué número conviene tener a la mano, además de emergencias, según MedlinePlus?</p>',
        opciones: ['El del centro de toxicología', 'El de la pizzería', 'El del cine'], correcta: 0,
        pista: '<p>Sirve si alguien traga algo peligroso.</p>',
        solucion: '<p><strong>El del centro de toxicología.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la caja con lo necesario para dar primeros auxilios?</p>',
        respuestas: ['botiquin', 'el botiquin', 'botiquin de primeros auxilios', 'kit de primeros auxilios'],
        pista: '<p>Empieza con "b".</p>',
        solucion: '<p>El <strong>botiquín</strong>.</p>' },
    ],
    fuentes: [MEDLINE('ency/article/001958.htm', 'Botiquín de primeros auxilios'), MEDLINE('ency/article/001927.htm', 'Reconocimiento de emergencias médicas')],
  });

  // ------------------------------------------------------------------
  L('Primeros auxilios: heridas, quemaduras y torceduras', {
    objetivo: 'Atender en casa una cortada, una quemadura o una torcedura menores, y reconocer cuándo hay que llamar a emergencias o ir al médico.',
    explicacion: `
      <p>Un cuchillo que resbala, una olla que salpica, un mal paso en la escalera: son los accidentes más comunes de cualquier casa. En Ciencias naturales, en "Primeros auxilios básicos", viste cómo proteger, avisar y socorrer, y cómo detener una hemorragia apretando con un trapo. Aquí verás con más detalle qué hacer con las heridas, las quemaduras y las torceduras, siguiendo a MedlinePlus y a la OMS.</p>
      <h3>Cortadas</h3>
      <p>MedlinePlus explica que las cortadas pequeñas se pueden atender en casa:</p>
      <ol>
        <li>Lávate las manos con jabón.</li>
        <li>Lava muy bien la herida con agua y un jabón suave. Aunque no veas tierra, lávala siempre.</li>
        <li>Aprieta directamente sobre la herida para detener el sangrado.</li>
        <li>Cúbrela con una venda limpia que no se pegue.</li>
      </ol>
      <p>Si la herida es por un objeto puntiagudo, como un clavo, MedlinePlus pide enjuagarla al menos 5 minutos con agua corriente y luego lavarla con jabón. Si ves algo clavado, no lo saques: ve a urgencias.</p>
      <p>Llama a emergencias si la herida sangra mucho o no deja de sangrar después de 10 minutos de apretar, o si la persona no siente la zona o no la puede mover. Busca atención médica pronto si la herida es grande o profunda, de más de un cuarto de pulgada, unos 0.64 cm; si está en la cara o llega al hueso; si fue una mordida de persona o animal; si fue con un clavo o un objeto oxidado, o si se pone roja, caliente o con pus.</p>
      <h3>Quemaduras menores y graves</h3>
      <p>MedlinePlus explica que primero hay que saber qué tan grave es la quemadura, y que si no estás seguro la trates como grave. Una quemadura es <strong>grave</strong>, y hay que llamar a emergencias, si es del tamaño de la palma de la mano o mayor, si es profunda, si la causó un químico o la electricidad, si la persona respiró humo o si muestra señales de choque, como palidez y debilidad.</p>
      <p>Para una quemadura menor, sin la piel rota, MedlinePlus indica:</p>
      <ul>
        <li>Pon la zona bajo agua fría, no helada, de 5 a 30 minutos. En Ciencias naturales viste al menos 10 minutos: cabe en ese rango.</li>
        <li>Luego cúbrela con una venda estéril y seca o un paño limpio.</li>
        <li>No revientes las ampollas.</li>
      </ul>
      <p>Para una quemadura grave, llama a emergencias. Si la ropa de alguien se prende, que se detenga, se tire al suelo y ruede, como viste en "Prevenir y apagar incendios", y envuélvelo con una cobija gruesa de algodón o lana. No le quites la ropa pegada a la piel y cubre la quemadura con una tela limpia. MedlinePlus advierte que una quemadura grave no se mete en agua fría, porque puede causar choque, y la OMS advierte que enfriar demasiado tiempo puede bajar peligrosamente la temperatura del cuerpo.</p>
      <p>Lo que nunca hay que poner en una quemadura, según MedlinePlus y la OMS: mantequilla, aceite, hielo, pomadas ni remedios caseros. Lo verás más en "Remedios populares que no funcionan o son peligrosos".</p>
      <h3>Torceduras</h3>
      <p>Un <strong>esguince</strong> es una lesión de los ligamentos, las bandas que unen los huesos en una articulación, como el tobillo, cuando se estiran o se rompen por una torcedura. MedlinePlus indica:</p>
      <ul>
        <li>Pon hielo de inmediato para bajar la hinchazón, envuelto en una tela, nunca directo sobre la piel.</li>
        <li>Venda la zona firme, pero sin apretar.</li>
        <li>Mantén la articulación elevada por encima del nivel del corazón, incluso al dormir.</li>
        <li>Descánsala varios días y no le pongas peso.</li>
      </ul>
      <p>MedlinePlus explica que un esguince leve suele sanar en 7 a 10 días. Ve al hospital o llama a emergencias si crees que hay una fractura, si la articulación se ve fuera de lugar o si el dolor es muy fuerte.</p>
      <p class="nota"><strong>Trampa común:</strong> poner hielo directo sobre la piel o en una quemadura. El hielo directo puede lastimar la piel y, en una quemadura, empeorarla.</p>`,
    ejemplo: `
      <p>Al cortar leña, alguien se hace una herida en la mano con el hacha. Aprietas con una gasa y sigue sangrando mucho. ¿Qué haces, y cuándo llamas a emergencias según MedlinePlus?</p>
      <ol class="pasos-ej">
        <li>Primero protégete: ponte guantes si los tienes, y sigue apretando directamente sobre la herida.</li>
        <li>Mira el reloj. MedlinePlus pide llamar a emergencias si el sangrado no se detiene después de 10 minutos de presión.</li>
        <li>Si sangra muchísimo desde el principio, llama de inmediato, sin esperar los 10 minutos, o pide a otra persona que llame mientras tú aprietas.</li>
        <li>No intentes limpiar una herida grande que sangra mucho: eso lo hará el personal de salud.</li>
        <li>Comprueba que cubriste los dos casos: sangrado fuerte, llamar ya; sangrado que no para en 10 minutos, llamar.</li>
      </ol>
      <p>Resultado: <span class="resultado">aprieta sin soltar y llama a emergencias si no para en 10 minutos o si sangra mucho</span>.</p>`,
    vidaReal: `
      <p>Saber primeros auxilios te permite ayudar con calma y sin empeorar las cosas:</p>
      <ul>
        <li>Limpias y cubres una cortada sin que se infecte.</li>
        <li>Enfrías una quemadura pequeña de la forma correcta.</li>
        <li>Sabes cuándo una quemadura es grave y hay que llamar a emergencias.</li>
        <li>Atiendes una torcedura con hielo envuelto, venda y descanso.</li>
        <li>Reconoces cuándo una herida necesita puntadas o atención médica.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>MedlinePlus indica enfriar una quemadura menor de 5 a 30 minutos. ¿Cuántos minutos hay entre el mínimo y el máximo?</p>', respuesta: 30 - 5,
        pista: '<p>Resta el mínimo al máximo.</p>',
        solucion: '<p>30 − 5 = <strong>25 minutos</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una herida punzante se enjuaga al menos 5 minutos. Si tu llave da 6 litros por minuto, ¿cuántos litros usas como mínimo?</p>', respuesta: 6 * 5,
        pista: '<p>Multiplica los litros por minuto por los minutos.</p>',
        solucion: '<p>6 × 5 = <strong>30 litros</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una persona se quemó el antebrazo, y la quemadura es más grande que la palma de su mano. ¿Qué haces?</p>',
        opciones: ['Le pones mantequilla', 'Llamas a emergencias', 'Le revientas las ampollas'], correcta: 1,
        pista: '<p>Revisa cuándo una quemadura es grave.</p>',
        solucion: '<p><strong>Llamar a emergencias</strong>: del tamaño de la palma o mayor es grave.</p>' },
      { tipo: 'opciones', enunciado: '<p>Te torciste el tobillo. ¿Cómo pones el hielo?</p>',
        opciones: ['Envuelto en una tela, nunca directo sobre la piel', 'Directo sobre la piel, para que enfríe más', 'No se pone hielo'], correcta: 0,
        pista: '<p>El hielo directo puede lastimar la piel.</p>',
        solucion: '<p><strong>Envuelto en una tela.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Te clavaste un pedazo de vidrio y se ve dentro de la herida. ¿Qué haces?</p>',
        opciones: ['Lo sacas con unas pinzas sucias', 'Lo empujas hacia adentro', 'No lo sacas y vas a urgencias'], correcta: 2,
        pista: '<p>MedlinePlus pide no retirar objetos incrustados.</p>',
        solucion: '<p><strong>No lo sacas</strong> y buscas atención médica.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la lesión de los ligamentos de una articulación por una torcedura?</p>',
        respuestas: ['esguince', 'un esguince', 'torcedura'],
        pista: '<p>Empieza con "e".</p>',
        solucion: '<p>Un <strong>esguince</strong>.</p>' },
    ],
    fuentes: [MEDLINE('ency/article/000043.htm', 'Cortaduras y heridas penetrantes'), MEDLINE('ency/article/000030.htm', 'Quemaduras'), OMS('burns', 'Quemaduras'), MEDLINE('ency/article/000041.htm', 'Esguinces')],
  });

  // ------------------------------------------------------------------
  L('Suero oral casero contra la deshidratación', {
    objetivo: 'Usar la solución de rehidratación oral para evitar que una diarrea deshidrate, saber qué bebidas no dar y reconocer cuándo hay que ir al médico.',
    explicacion: `
      <p>Con la diarrea el cuerpo pierde mucha agua y sales. En un adulto sano, unos días de diarrea suelen ser una molestia. En un bebé o en una persona mayor pueden ser peligrosos, porque se deshidratan rápido. La buena noticia es que existe una bebida sencilla que ha salvado millones de vidas.</p>
      <h3>Qué es el suero oral</h3>
      <p>La OMS explica que las enfermedades diarreicas deben tratarse con una <strong>solución de rehidratación oral</strong>, que abrevia SRO: una mezcla de agua limpia, sal y azúcar. La sal repone lo que el cuerpo pierde. El azúcar no está para darle sabor: el manual de la OMS explica que, al absorberse, ayuda a que el intestino absorba también la sal y el agua, y que sin él la solución no funcionaría. Por eso no es lo mismo que dar agua sola.</p>
      <h3>Primero, los sobres</h3>
      <p>En farmacias y centros de salud se venden o se regalan sobres de SRO ya medidos. Son la mejor opción, porque traen la cantidad exacta. Prepáralos con agua segura, como viste en la unidad Agua, y siguiendo al pie de la letra lo que dice el sobre. Más concentrado no es mejor: puede hacer daño.</p>
      <h3>La receta casera de la OMS</h3>
      <p>El manual de la OMS para tratar la diarrea da una receta casera: <strong>1 litro de agua limpia, 3 gramos de sal de mesa, que es una cucharadita rasa, y 18 gramos de azúcar común</strong>. La OMS explica que es eficaz, pero que no la recomienda en general porque la gente olvida la receta, no siempre tiene los ingredientes o da muy poca. Por eso:</p>
      <ul>
        <li>Úsala solo si no tienes sobres de SRO.</li>
        <li>Mide con cuidado. Si tienes una báscula de cocina, pesa el azúcar.</li>
        <li>No le agregues más sal ni más azúcar "para que funcione mejor".</li>
        <li>Prepárala con agua segura.</li>
      </ul>
      <p>En internet circulan muchas recetas distintas, con otras cantidades, limón o bicarbonato. Esta lección usa solo la de la OMS. Ante la duda, pregunta en tu centro de salud.</p>
      <h3>Cuánto dar</h3>
      <p>La OMS da esta guía: dar tanto líquido como la persona quiera hasta que la diarrea pare. Después de cada evacuación líquida, como orientación:</p>
      <ul>
        <li>Niños menores de 2 años: de 50 a 100 mL, de un cuarto a media taza grande.</li>
        <li>Niños de 2 a 10 años: de 100 a 200 mL, de media a una taza grande.</li>
        <li>Niños mayores y adultos: todo lo que quieran.</li>
      </ul>
      <p>A los bebés y niños pequeños se les da con cucharita o vaso, no con biberón. A los menores de 2 años, una cucharadita cada 1 o 2 minutos. Si vomitan, la OMS pide esperar de 5 a 10 minutos y seguir, más despacio.</p>
      <h3>Seguir comiendo</h3>
      <p>La OMS insiste en seguir alimentando a la persona para que no se desnutra, y en dar pecho más seguido a los bebés que toman leche materna.</p>
      <h3>Lo que no se debe dar</h3>
      <p>La OMS advierte que algunas bebidas pueden empeorar la diarrea, sobre todo las muy azucaradas: los refrescos, los jugos comerciales y el té endulzado. También hay que evitar el café y algunos tés o infusiones que actúan como purgantes. MedlinePlus, por su parte, advierte que no se tomen pastillas de sal.</p>
      <h3>Cuándo ir al médico</h3>
      <p>La OMS pide llevar al niño con el personal de salud si:</p>
      <ul>
        <li>Empieza a hacer muchas evacuaciones líquidas.</li>
        <li>Vomita una y otra vez.</li>
        <li>Tiene mucha sed.</li>
        <li>Come o bebe mal.</li>
        <li>Tiene fiebre o sangre en las heces.</li>
        <li>No mejora en tres días.</li>
      </ul>
      <p>En los adultos, recuerda las señales de deshidratación de MedlinePlus que viste en la primera unidad, en "Necesidades básicas: agua, comida, refugio y energía". Si alguien se desmaya o se confunde, llama al número de emergencias de tu país (en muchos, el 911). El personal de salud puede indicar también otros tratamientos, como el zinc para los niños.</p>
      <p class="nota"><strong>Trampa común:</strong> dar refresco o jugo de caja porque "tiene azúcar y sales". Tienen demasiada azúcar y pueden empeorar la diarrea.</p>`,
    ejemplo: `
      <p>Vas a preparar 2 litros de suero con la receta de la OMS. ¿Cuánta sal y cuánta azúcar usas?</p>
      <ol class="pasos-ej">
        <li>Primero recuerda la receta para 1 litro: 3 g de sal, una cucharadita rasa, y 18 g de azúcar.</li>
        <li>Para 2 litros necesitas el doble de todo, porque la proporción no cambia.</li>
        <li>Sal: 3 × 2 = 6 g, es decir, dos cucharaditas rasas.</li>
        <li>Azúcar: 18 × 2 = 36 g. Pésala si puedes.</li>
        <li>Comprueba la proporción: 36 ÷ 6 = 6, y en la receta original 18 ÷ 3 = 6. Hay 6 veces más azúcar que sal en ambos casos.</li>
      </ol>
      <p>Resultado: <span class="resultado">2 litros de agua, 6 g de sal y 36 g de azúcar</span>. Si tienes sobres de SRO, úsalos en lugar de esta receta.</p>
      <p class="nota"><strong>Error común:</strong> doblar el azúcar pero no la sal, o al revés. Hay que doblar todo.</p>`,
    vidaReal: `
      <p>Saber usar el suero oral puede salvar una vida en casa:</p>
      <ul>
        <li>Evitas que una diarrea deshidrate a un bebé o a una persona mayor.</li>
        <li>Sabes que los sobres de farmacia son la mejor opción.</li>
        <li>Conoces la receta de la OMS si no tienes sobres.</li>
        <li>Evitas los refrescos y jugos que empeoran la diarrea.</li>
        <li>Reconoces las señales para llevar a alguien al médico.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Con la receta de la OMS, ¿cuántos gramos de azúcar necesitas para medio litro?</p>', respuesta: 18 / 2,
        pista: '<p>La receta de 1 litro lleva 18 g; divide entre 2.</p>',
        solucion: '<p>18 ÷ 2 = <strong>9 g</strong> de azúcar.</p>' },
      { tipo: 'numero', enunciado: '<p>Un niño de 1 año tuvo 4 evacuaciones líquidas hoy. Si después de cada una le das 100 mL, el máximo de la OMS para su edad, ¿cuántos mL le diste?</p>', respuesta: 4 * 100,
        pista: '<p>Multiplica las evacuaciones por los mL.</p>',
        solucion: '<p>4 × 100 = <strong>400 mL</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es la mejor opción para hacer suero oral?</p>',
        opciones: ['Un refresco', 'Los sobres de SRO, preparados como dice el sobre', 'Agua con mucha sal'], correcta: 1,
        pista: '<p>Traen la cantidad exacta.</p>',
        solucion: '<p><strong>Los sobres de SRO.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Según la OMS, ¿qué bebida NO conviene dar durante una diarrea?</p>',
        opciones: ['Agua limpia', 'Suero oral', 'Jugo de caja muy azucarado'], correcta: 2,
        pista: '<p>Las bebidas muy azucaradas la empeoran.</p>',
        solucion: '<p><strong>El jugo de caja azucarado.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Un niño con diarrea tiene sangre en las heces. ¿Qué haces?</p>',
        opciones: ['Lo llevas con el personal de salud', 'Esperas una semana', 'Le das solo agua'], correcta: 0,
        pista: '<p>Es una de las señales de la OMS.</p>',
        solucion: '<p><strong>Llevarlo con el personal de salud.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué significan las siglas SRO?</p>',
        respuestas: ['solucion de rehidratacion oral', 'sales de rehidratacion oral', 'suero de rehidratacion oral'],
        pista: '<p>Solución de ... oral.</p>',
        solucion: '<p><strong>Solución de rehidratación oral</strong>.</p>' },
    ],
    fuentes: [OMSDIARREA, OMS('diarrhoeal-disease', 'Enfermedades diarreicas'), MEDLINE('ency/article/000982.htm', 'Deshidratación')],
  });

  // ------------------------------------------------------------------
  L('Plantas medicinales: qué dice la evidencia', {
    objetivo: 'Entender qué es la evidencia científica, qué se sabe de algunas plantas medicinales comunes y por qué "natural" no quiere decir "seguro".',
    explicacion: `
      <p>Casi todas las familias tienen un té para algo: manzanilla para el estómago, jengibre para el mareo, sábila para las quemaduras. Algunos de esos remedios tienen respaldo de la ciencia, otros no se han estudiado bien y algunos pueden hacer daño. ¿Cómo saber cuál es cuál?</p>
      <h3>¿Qué es la evidencia científica?</h3>
      <p>Que mucha gente diga que algo funciona no basta. A veces una persona mejora porque la enfermedad se iba a quitar sola, o porque confía en el remedio. La <strong>evidencia científica</strong> es lo que se sabe gracias a estudios bien hechos. En los mejores, a un grupo de personas se le da el remedio y a otro grupo, sin que nadie sepa quién es quién, un <strong>placebo</strong>: algo que parece igual pero no tiene el ingrediente que se estudia. Si el grupo del remedio mejora claramente más que el del placebo, hay evidencia de que funciona.</p>
      <p>La OMS reconoce el valor de la medicina tradicional, pero insiste en que su uso debe basarse en la evidencia científica, aunque un remedio se use desde hace mucho tiempo, para garantizar que sea eficaz y seguro.</p>
      <h3>Lo que se sabe de cinco plantas</h3>
      <p>El Centro Nacional de Salud Complementaria e Integral de Estados Unidos (NCCIH), parte de los Institutos Nacionales de Salud, resume la investigación sobre muchas plantas. Algunos ejemplos:</p>
      <ul>
        <li>Manzanilla: los estudios no han dado suficiente evidencia confiable para saber si sirve para algo en concreto. Como té, en las cantidades de los alimentos, probablemente es segura. Puede dar alergia a quienes son alérgicos a plantas parecidas, como la margarita o el crisantemo.</li>
        <li>Jengibre: la investigación indica que puede ayudar con las náuseas y vómitos del embarazo; la mayoría de los estudios no ha encontrado que sirva para el mareo de los viajes. Durante el embarazo, el NCCIH pide consultar antes con el personal de salud.</li>
        <li>Sábila o aloe: el gel aplicado sobre la piel podría acelerar la curación de quemaduras y bajar el dolor. Pero tomado, los extractos de la hoja se han relacionado con casos de hepatitis, una inflamación del hígado. Para una quemadura reciente, primero sigue los pasos de "Primeros auxilios: heridas, quemaduras y torceduras".</li>
        <li>Aceite de menta: en cápsulas especiales podría mejorar el síndrome de intestino irritable en adultos. Una revisión de 2022 con 10 estudios y 1 030 personas encontró que funcionaba mejor que el placebo. No debe ponerse en la cara de bebés ni de niños pequeños.</li>
        <li>Ajo: comido es seguro para casi todos, pero en suplementos puede aumentar el riesgo de sangrado. El ajo crudo puesto sobre la piel puede causar quemaduras químicas.</li>
      </ul>
      <p>Fíjate que la misma planta puede ser segura de una forma y peligrosa de otra: la sábila sobre la piel no es lo mismo que tomada.</p>
      <h3>Natural no quiere decir seguro</h3>
      <p>Las plantas tienen sustancias activas: por eso algunas funcionan, y por eso mismo pueden hacer daño. Además, una hierba puede tener una <strong>interacción</strong> con un medicamento, es decir, cambiar su efecto, haciéndolo más fuerte, más débil o peligroso. El NCCIH explica que algunas hierbas y medicinas interactúan de forma dañina, y pide hablar con el personal de salud antes de usarlas si tomas cualquier medicamento. El ajo con medicinas que adelgazan la sangre es un ejemplo.</p>
      <h3>Cómo usar las plantas con cuidado</h3>
      <ul>
        <li>Dile a tu médico qué tés, hierbas o suplementos tomas.</li>
        <li>Ten más cuidado con niños pequeños, embarazadas, personas que dan pecho y quienes toman medicinas.</li>
        <li>Desconfía de lo que promete curarlo todo.</li>
        <li>Nunca dejes un tratamiento indicado por el médico para cambiarlo por una hierba.</li>
        <li>Si alguien se siente mal después de tomar una planta, busca atención médica.</li>
      </ul>
      <p>En la unidad Cultivos básicos, en "Cultivar hierbas aromáticas y medicinales", aprendiste a sembrarlas. Disfrutarlas en la comida y en un té suave es muy distinto de usarlas como medicina.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que, si algo es natural, no puede hacer daño. Muchos venenos también son naturales.</p>`,
    ejemplo: `
      <p>Una revisión del NCCIH sobre el aceite de menta reunió 10 estudios con 1 030 personas en total. ¿Cuántas personas tenía cada estudio en promedio, y por qué importa que se compare con un placebo?</p>
      <ol class="pasos-ej">
        <li>Primero divide el total entre los estudios: 1 030 ÷ 10 = 103 personas por estudio, en promedio.</li>
        <li>Fíjate en el tamaño: un estudio con más personas da resultados más confiables que uno con 5 o 10.</li>
        <li>Luego piensa en el placebo: algunas personas mejoran solo por creer que toman algo. Si el aceite funciona mejor que el placebo, el efecto no se explica solo por esa creencia.</li>
        <li>Comprueba la cuenta: 103 × 10 = 1 030.</li>
      </ol>
      <p>Resultado: <span class="resultado">unas 103 personas por estudio</span>. Muchas personas y la comparación con un placebo hacen que la evidencia sea más fuerte.</p>
      <p class="nota"><strong>Error común:</strong> creer que un remedio funciona porque "a mi tía le sirvió". Una sola persona no es evidencia.</p>`,
    vidaReal: `
      <p>Saber qué dice la evidencia te ayuda a usar las plantas con cabeza:</p>
      <ul>
        <li>Distingues lo que está probado de lo que solo se dice.</li>
        <li>Usas la sábila en la piel sin tomarla.</li>
        <li>Avisas a tu médico de las hierbas que tomas.</li>
        <li>Desconfías de los productos que prometen curarlo todo.</li>
        <li>Cuidas más a los niños, las embarazadas y a quienes toman medicinas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En un estudio, 60 de 100 personas mejoraron con un remedio y 40 de 100 con el placebo. ¿Cuántos puntos porcentuales más mejoraron con el remedio?</p>', respuesta: 60 - 40,
        pista: '<p>Resta los porcentajes.</p>',
        solucion: '<p>60% − 40% = <strong>20 puntos</strong> más.</p>' },
      { tipo: 'numero', enunciado: '<p>La revisión del aceite de menta reunió 1 030 personas en 10 estudios. Si la mitad de las personas recibió el placebo, ¿cuántas fueron?</p>', respuesta: 1030 / 2,
        pista: '<p>Divide entre 2.</p>',
        solucion: '<p>1 030 ÷ 2 = <strong>515 personas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según el NCCIH, ¿qué riesgo tiene tomar extractos de la hoja de sábila?</p>',
        opciones: ['Ninguno, es natural', 'Se han relacionado con casos de hepatitis', 'Solo da sueño'], correcta: 1,
        pista: '<p>No es lo mismo ponerla en la piel que tomarla.</p>',
        solucion: '<p><strong>Se han relacionado con hepatitis.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Tomas una medicina para adelgazar la sangre y quieres tomar suplementos de ajo. ¿Qué haces?</p>',
        opciones: ['Hablas antes con tu médico', 'Los tomas, el ajo es natural', 'Dejas la medicina y tomas solo ajo'], correcta: 0,
        pista: '<p>El ajo en suplementos puede aumentar el sangrado.</p>',
        solucion: '<p><strong>Hablar antes con el médico</strong>, por la posible interacción.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es un placebo?</p>',
        opciones: ['Una planta medicinal', 'Un tipo de vacuna', 'Algo que parece el remedio pero no tiene el ingrediente que se estudia'], correcta: 2,
        pista: '<p>Sirve para comparar.</p>',
        solucion: '<p><strong>Algo que parece igual pero no tiene el ingrediente.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama cuando una hierba cambia el efecto de un medicamento?</p>',
        respuestas: ['interaccion', 'una interaccion', 'interacciones', 'interaccion medicamentosa'],
        pista: '<p>Empieza con "i".</p>',
        solucion: '<p>Una <strong>interacción</strong>.</p>' },
    ],
    fuentes: [NCCIH('chamomile', 'Chamomile'), NCCIH('ginger', 'Ginger'), NCCIH('aloe-vera', 'Aloe Vera'), NCCIH('peppermint-oil', 'Peppermint Oil'), NCCIH('garlic', 'Garlic'), OMSTRAD],
  });

  // ------------------------------------------------------------------
  L('Remedios caseros con evidencia científica', {
    objetivo: 'Usar en casa los cuidados que recomiendan fuentes de salud confiables para molestias comunes, y saber cuándo dejan de bastar.',
    explicacion: `
      <p>No todo malestar necesita una visita al médico ni una medicina. Para muchas molestias comunes, como un resfriado o un dolor de garganta, hay cuidados sencillos que las fuentes de salud recomiendan. Lo importante es saber cuáles tienen respaldo y cuándo ya no son suficientes.</p>
      <h3>Qué es un remedio casero</h3>
      <p>Un <strong>remedio casero</strong> es un cuidado que puedes hacer en casa, sin receta, con cosas que tienes a la mano. Esta lección solo incluye los que recomiendan MedlinePlus o el NCCIH. En la lección anterior viste por qué no basta con que algo sea tradicional.</p>
      <h3>Resfriado</h3>
      <p>MedlinePlus explica que la mayoría de los resfriados se quitan en unos días, y que ayuda descansar mucho y beber muchos líquidos. Explica también que es normal que el moco se ponga amarillo o verde después de unos días, y que eso no quiere decir que hagan falta antibióticos: los antibióticos no sirven para el resfriado, porque lo causa un virus. Si después de 7 días sigues con síntomas, consulta al personal de salud.</p>
      <h3>Dolor de garganta</h3>
      <p>MedlinePlus recomienda:</p>
      <ul>
        <li>Hacer gárgaras varias veces al día con agua tibia con sal: media cucharadita, unos 3 gramos, en una taza de 240 mL de agua.</li>
        <li>Beber líquidos calientes, como té de limón con miel, o fríos, como agua helada.</li>
        <li>Chupar caramelos duros. MedlinePlus advierte que no se den a niños pequeños, porque se pueden ahogar; en su página sobre la tos dice que nunca a menores de tres años.</li>
        <li>Usar un humidificador o vaporizador para humedecer el aire, limpiándolo bien.</li>
      </ul>
      <p>Recuerda lo que viste en la unidad Alimentos: la miel nunca se le da a un bebé menor de 1 año.</p>
      <p>MedlinePlus pide consultar si el dolor de garganta no se quita en varios días, si hay fiebre alta, ganglios inflamados en el cuello o una erupción en la piel, y buscar atención de inmediato si además cuesta respirar.</p>
      <h3>Tos seca</h3>
      <p>MedlinePlus menciona que el vapor, por ejemplo de una ducha caliente, humedece el aire y alivia la garganta seca, y que beber muchos líquidos ayuda a aflojar el moco.</p>
      <h3>Náuseas del embarazo</h3>
      <p>En la lección anterior viste que, según el NCCIH, el jengibre puede ayudar con las náuseas y los vómitos del embarazo. El NCCIH pide hablar con el personal de salud antes de usarlo durante el embarazo.</p>
      <h3>Golpes y torceduras</h3>
      <p>El hielo envuelto en tela, el vendaje firme, la elevación y el reposo que viste en "Primeros auxilios: heridas, quemaduras y torceduras" son también remedios caseros con respaldo de MedlinePlus.</p>
      <h3>Fiebre</h3>
      <p>MedlinePlus explica que la fiebre es parte de las defensas del cuerpo contra las infecciones, y advierte que no se usen baños fríos, hielo ni fricciones con alcohol, porque causan escalofríos que suben la temperatura del cuerpo. MedlinePlus pide llamar enseguida al personal de salud si:</p>
      <ul>
        <li>Un bebé de 3 meses o menos tiene 38 °C o más.</li>
        <li>Un bebé de 3 a 12 meses tiene 39 °C o más.</li>
        <li>Un niño de 2 años o menos tiene fiebre por más de 24 a 48 horas, o uno mayor por más de 48 a 72 horas.</li>
        <li>La fiebre llega a 40.6 °C o más.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> pedir antibióticos para un resfriado. No sirven contra los virus, y usarlos sin necesidad, explica MedlinePlus, hace que después funcionen peor cuando sí hacen falta.</p>`,
    ejemplo: `
      <p>Quieres hacer gárgaras con la receta de MedlinePlus, media cucharadita de sal, unos 3 g, en una taza de 240 mL de agua tibia, pero solo tienes un vaso de 120 mL. ¿Cuánta sal pones?</p>
      <ol class="pasos-ej">
        <li>Primero compara los recipientes: 120 mL es la mitad de 240 mL, porque 240 ÷ 2 = 120.</li>
        <li>Si el agua es la mitad, la sal también debe ser la mitad, para que quede igual de salada.</li>
        <li>Calcula: 3 g ÷ 2 = 1.5 g, es decir, un cuarto de cucharadita.</li>
        <li>Comprueba la proporción: 3 ÷ 240 = 0.0125 y 1.5 ÷ 120 = 0.0125. Es la misma.</li>
      </ol>
      <p>Resultado: <span class="resultado">1.5 g, un cuarto de cucharadita</span>. Las gárgaras se escupen, no se tragan.</p>
      <p class="nota"><strong>Error común:</strong> poner la misma sal en menos agua. Queda el doble de salada.</p>`,
    vidaReal: `
      <p>Conocer los remedios caseros con respaldo te ayuda a cuidarte sin riesgos:</p>
      <ul>
        <li>Alivias un resfriado o un dolor de garganta con cosas que tienes en casa.</li>
        <li>No pides antibióticos que no sirven para un resfriado.</li>
        <li>Sabes cuándo una fiebre en un bebé necesita atención enseguida.</li>
        <li>Evitas los baños fríos y el alcohol para bajar la fiebre.</li>
        <li>Reconoces cuándo un remedio casero ya no basta.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Para gárgaras, MedlinePlus usa 3 g de sal en 240 mL de agua. ¿Cuántos gramos para 480 mL?</p>', respuesta: 3 * 2,
        pista: '<p>480 es el doble de 240.</p>',
        solucion: '<p>El doble: 3 × 2 = <strong>6 g</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>MedlinePlus pide consultar si el resfriado sigue después de 7 días. Si empezó un lunes, ¿cuántos días después de ese lunes se cumple la semana?</p>', respuesta: 7,
        pista: '<p>Una semana tiene 7 días.</p>',
        solucion: '<p><strong>7 días</strong>, el lunes siguiente.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según MedlinePlus, ¿sirven los antibióticos para el resfriado común?</p>',
        opciones: ['Sí, siempre', 'No, porque lo causa un virus', 'Solo si el moco es verde'], correcta: 1,
        pista: '<p>Los antibióticos actúan contra bacterias.</p>',
        solucion: '<p><strong>No</strong>: el resfriado lo causa un virus.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un bebé de 2 meses tiene 38.2 °C. Según MedlinePlus, ¿qué haces?</p>',
        opciones: ['Lo bañas con agua fría', 'Le pones alcohol', 'Llamas enseguida al personal de salud'], correcta: 2,
        pista: '<p>Revisa la regla para bebés de 3 meses o menos.</p>',
        solucion: '<p><strong>Llamar enseguida</strong>: 38 °C o más a esa edad.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿A partir de qué edad, según MedlinePlus, se pueden dar caramelos duros para la tos?</p>',
        opciones: ['Nunca a menores de tres años', 'Desde que nacen', 'Desde los 6 meses'], correcta: 0,
        pista: '<p>Se pueden ahogar.</p>',
        solucion: '<p><strong>Nunca a menores de tres años.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama un cuidado que puedes hacer en casa, sin receta, con cosas que tienes a la mano?</p>',
        respuestas: ['remedio casero', 'un remedio casero', 'remedios caseros'],
        pista: '<p>Son dos palabras.</p>',
        solucion: '<p>Un <strong>remedio casero</strong>.</p>' },
    ],
    fuentes: [MEDLINE('ency/article/000678.htm', 'Resfriado común'), MEDLINE('ency/article/000655.htm', 'Faringitis y dolor de garganta'), MEDLINE('ency/article/003072.htm', 'Tos'), MEDLINE('ency/article/003090.htm', 'Fiebre'), NCCIH('ginger', 'Ginger')],
  });

  // ------------------------------------------------------------------
  L('Remedios populares que no funcionan o son peligrosos', {
    objetivo: 'Reconocer remedios populares que hacen daño y cambiarlos por lo que recomiendan las fuentes de salud.',
    explicacion: `
      <p>Muchos remedios pasan de abuelas a nietos con la mejor intención. Algunos son inofensivos, otros no sirven y unos cuantos pueden lastimar gravemente, sobre todo a los niños. Saber cuáles son peligrosos es una forma de cuidar a tu familia sin pelearte con la tradición.</p>
      <h3>En las quemaduras</h3>
      <p>MedlinePlus pide no poner aceite, mantequilla, hielo, cremas ni ningún otro remedio casero en una quemadura grave. La OMS agrega no poner pomadas, aceite, cúrcuma ni algodón suelto, y no usar hielo, porque profundiza la lesión. Lo correcto es lo que viste en "Primeros auxilios: heridas, quemaduras y torceduras": agua fría, no helada, en las quemaduras menores, y llamar a emergencias en las graves.</p>
      <h3>En la mordedura de serpiente</h3>
      <p>MedlinePlus pide no hacer nada de esto:</p>
      <ul>
        <li>Poner un torniquete.</li>
        <li>Cortar la mordedura con un cuchillo o una navaja.</li>
        <li>Chupar el veneno con la boca.</li>
        <li>Poner hielo o compresas frías.</li>
        <li>Dar algo de comer o de beber a la persona.</li>
      </ul>
      <p>Lo que sí hay que hacer lo verás en la siguiente lección: mantener a la persona tranquila y quieta y llevarla de inmediato a recibir atención médica.</p>
      <h3>En la fiebre</h3>
      <p>Como viste en la lección anterior, MedlinePlus advierte que los baños fríos, el hielo y las fricciones con alcohol empeoran la situación, porque provocan escalofríos que suben la temperatura del cuerpo.</p>
      <h3>El plomo en algunos remedios</h3>
      <p>Una <strong>intoxicación</strong> es el daño que causa al cuerpo una sustancia tóxica. Uno de los casos más graves es el plomo. El Departamento de Salud de Texas advierte que muchos remedios caseros han dado positivo al plomo, entre ellos varios polvos que se usan en América Latina para el empacho, los cólicos, los vómitos o la falta de energía:</p>
      <ul>
        <li>El azarcón, también llamado alarcón, coral, luiga, maría luisa o rueda, que es un polvo naranja.</li>
        <li>La greta, un polvo amarillo.</li>
        <li>El albayalde, un polvo blanco.</li>
      </ul>
      <p>La OMS explica que no existe ningún nivel de exposición al plomo que sea seguro, que es especialmente dañino para los niños pequeños y para las mujeres en edad de tener hijos, y que se acumula en el cerebro, los riñones y los huesos. Si alguien en tu familia tomó uno de estos polvos, avisa a su médico o a tu centro de salud.</p>
      <h3>Los antibióticos para todo</h3>
      <p>Tomar antibióticos sobrantes o comprarlos para un resfriado es muy común. Como viste en la lección anterior, MedlinePlus explica que no sirven contra los virus, y que usarlos cuando no hacen falta hace que después funcionen peor. Los antibióticos solo se toman cuando los indica un profesional de la salud.</p>
      <h3>Otros que ya conoces</h3>
      <ul>
        <li>La miel en bebés menores de 1 año, que puede causar botulismo, como viste en "Envasado seguro y el riesgo del botulismo".</li>
        <li>Tomar extractos de la hoja de sábila, relacionados con hepatitis, como viste en "Plantas medicinales: qué dice la evidencia".</li>
        <li>Refrescos o jugos muy azucarados para la diarrea, que la empeoran, como viste en "Suero oral casero contra la deshidratación".</li>
      </ul>
      <h3>Cómo hablarlo en familia</h3>
      <p>No hace falta discutir. Puedes decir: "Leí que la mantequilla en una quemadura la empeora; mejor ponemos agua fría". Explicar el porqué convence más que decir que algo está mal.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que, si un remedio se usó siempre, es seguro. Algunos, como el azarcón, dañan poco a poco y sin que se note.</p>`,
    ejemplo: `
      <p>Una vecina te ofrece tres remedios: mantequilla para la quemadura de un niño de tu familia, azarcón para su empacho y un torniquete por si lo muerde una víbora en el campo. ¿Qué haces con cada uno?</p>
      <ol class="pasos-ej">
        <li>Primero la quemadura: MedlinePlus pide no poner mantequilla. Usa agua fría, no helada, de 5 a 30 minutos, y si es grande, llama a emergencias.</li>
        <li>Luego el empacho: el azarcón puede tener plomo, y según la OMS ningún nivel de plomo es seguro. Si el niño tiene vómitos o dolor de estómago, llévalo al centro de salud.</li>
        <li>Después la víbora: MedlinePlus pide no usar torniquete. Si lo muerde una, mantenlo quieto y llévalo de inmediato a recibir atención médica.</li>
        <li>Comprueba: rechazaste los tres y tienes una alternativa segura para cada caso.</li>
      </ol>
      <p>Resultado: <span class="resultado">ninguno de los tres; agua fría, centro de salud y atención médica inmediata</span>.</p>`,
    vidaReal: `
      <p>Reconocer los remedios peligrosos protege a los más vulnerables de tu casa:</p>
      <ul>
        <li>No empeoras una quemadura con mantequilla o hielo.</li>
        <li>Sabes qué no hacer ante una mordedura de serpiente.</li>
        <li>Evitas los polvos con plomo para el empacho.</li>
        <li>No tomas antibióticos que no necesitas.</li>
        <li>Puedes explicar a tu familia por qué cambiar un remedio, sin pelear.</li><li>Sabes que tu centro de salud puede orientarte si dudas de un remedio.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>De los 5 errores ante una mordedura de serpiente de la lista de MedlinePlus, una persona cometió 2. ¿Cuántos evitó?</p>', respuesta: 5 - 2,
        pista: '<p>Resta los errores que cometió.</p>',
        solucion: '<p>5 − 2 = <strong>3</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>La OMS dice que la exposición al plomo causó más de 3.5 millones de muertes en 2023. ¿Cuántos miles de muertes son?</p>', respuesta: 3500,
        pista: '<p>Un millón son 1 000 miles.</p>',
        solucion: '<p>3.5 × 1 000 = <strong>3 500 miles</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué se pone en una quemadura menor?</p>',
        opciones: ['Mantequilla', 'Agua fría, no helada', 'Hielo directo'], correcta: 1,
        pista: '<p>MedlinePlus pide no poner remedios caseros.</p>',
        solucion: '<p><strong>Agua fría, no helada.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué es peligroso el azarcón?</p>',
        opciones: ['Porque sabe mal', 'Porque es muy caro', 'Porque puede contener plomo, que es tóxico a cualquier nivel'], correcta: 2,
        pista: '<p>Lo advierte el Departamento de Salud de Texas.</p>',
        solucion: '<p><strong>Puede contener plomo</strong>, y ningún nivel es seguro.</p>' },
      { tipo: 'opciones', enunciado: '<p>A alguien lo mordió una serpiente. ¿Cuál de estas cosas NO debes hacer?</p>',
        opciones: ['Chupar el veneno con la boca', 'Mantenerlo tranquilo', 'Llevarlo de inmediato a recibir atención médica'], correcta: 0,
        pista: '<p>Es uno de los errores de la lista de MedlinePlus.</p>',
        solucion: '<p><strong>Chupar el veneno.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el daño que causa al cuerpo una sustancia tóxica?</p>',
        respuestas: ['intoxicacion', 'una intoxicacion', 'envenenamiento'],
        pista: '<p>Empieza con "i".</p>',
        solucion: '<p>Una <strong>intoxicación</strong>.</p>' },
    ],
    fuentes: [MEDLINE('ency/article/000030.htm', 'Quemaduras'), OMS('burns', 'Quemaduras'), MEDLINE('ency/article/000031.htm', 'Mordeduras de serpientes'), TEXAS, OMS('lead-poisoning-and-health', 'Intoxicación por plomo'), MEDLINE('ency/article/003090.htm', 'Fiebre')],
  });

  // ------------------------------------------------------------------
  L('Prevenir picaduras y mordeduras de animales', {
    objetivo: 'Prevenir las picaduras de mosquitos y chinches, y las mordeduras de serpientes y perros, y saber qué hacer si ocurren.',
    explicacion: `
      <p>En el campo, y también en la ciudad, convivimos con animales que pueden transmitir enfermedades o lastimar: mosquitos, chinches, serpientes y perros. La mayoría de las veces no pasa nada, pero conviene saber cómo evitar el problema y qué hacer si ocurre.</p>
      <h3>Los vectores</h3>
      <p>Un <strong>vector</strong> es un animal, casi siempre un insecto, que lleva un microbio de una persona a otra. No es él quien enferma, pero transporta la enfermedad. Los mosquitos y las chinches que transmiten el mal de Chagas son vectores.</p>
      <h3>Mosquitos y dengue</h3>
      <p>La OMS explica que cerca de la mitad de la población mundial corre riesgo de dengue, y que los mosquitos que lo transmiten pican de día. Para protegerte:</p>
      <ul>
        <li>Usa ropa que cubra la mayor parte del cuerpo.</li>
        <li>Pon mosquiteros en las ventanas y úsalos si duermes de día.</li>
        <li>Usa repelentes con DEET, icaridina o IR3535.</li>
        <li>Cubre, vacía y limpia cada semana los recipientes donde se junta agua, como viste en la unidad Agua.</li>
      </ul>
      <p>La OMS explica que las señales de dengue grave suelen aparecer cuando se quita la fiebre: dolor fuerte de estómago, vómito que no para, respiración rápida, sangrado de encías o nariz, vómito o heces con sangre, mucha sed, piel pálida y fría, o mucha debilidad. Quien las tenga necesita atención de inmediato.</p>
      <h3>Chinches y mal de Chagas</h3>
      <p>La OMS explica que el mal de Chagas lo causa un parásito que llevan unas chinches llamadas triatominos. En distintos lugares también se les conoce como vinchucas, chirimachas o chinches besuconas. Viven en las grietas de paredes y techos de las casas y en gallineros y corrales. De día se esconden y de noche pican, muchas veces en la cara. Dejan sus heces cerca de la picadura y, al rascarse, la persona mete el parásito en la herida. Una casa sin grietas, como viste en la unidad Vivienda, les deja menos lugares donde esconderse. La OMS explica que el mal de Chagas se puede curar si se trata pronto: si encuentras esas chinches en tu casa o crees que te picaron, avisa a tu centro de salud.</p>
      <h3>Serpientes</h3>
      <p>La OMS estima que cada año 5.4 millones de personas sufren mordeduras de serpiente, y que los más afectados son quienes trabajan en el campo y los niños. Para prevenirlas, MedlinePlus recomienda:</p>
      <ul>
        <li>Evitar los lugares donde se esconden, como debajo de piedras y troncos.</li>
        <li>No agarrarlas ni molestarlas, aunque parezcan muertas.</li>
        <li>Tantear con un palo antes de pasar por donde no ves tus pies.</li>
        <li>Usar pantalones largos y botas en zonas donde hay serpientes.</li>
      </ul>
      <p>Si alguien es mordido, MedlinePlus pide llamar al número de emergencias de tu país (en muchos, el 911), mantener a la persona tranquila y quieta, quitarle anillos y ropa apretada porque la zona se puede hinchar, y no levantar la mordedura por encima del corazón. Si puedes, toma una foto de la serpiente desde lejos. La OMS explica que el tratamiento más eficaz es el <strong>suero antiofídico</strong>, un medicamento que se aplica en los centros de salud y anula los efectos del veneno; por eso hay que llegar pronto.</p>
      <h3>Perros y rabia</h3>
      <p>La OMS explica que las mordeduras y los rasguños de perro causan el 99% de los casos de rabia en personas, y que una vez que aparecen los síntomas la rabia es siempre mortal. Pero se puede evitar:</p>
      <ul>
        <li>Vacuna a tus perros, como pide la OMS.</li>
        <li>Si un animal te muerde o te rasguña, lava la herida de inmediato con agua y jabón durante al menos 15 minutos, como pide la OMS, y busca atención médica, aunque la herida sea pequeña.</li>
      </ul>
      <h3>Abejas, avispas y arañas</h3>
      <p>MedlinePlus explica que algunas personas tienen una reacción alérgica grave a una picadura, que puede matar rápido. Si alguien tiene dificultad para respirar, hinchazón de la cara o la boca, mareo o desmayo después de una picadura, llama a emergencias.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que un rasguño pequeño de un perro no importa. La OMS pide lavar y buscar atención médica también en los rasguños.</p>`,
    ejemplo: `
      <p>Un perro callejero muerde a un niño en la pierna. La herida es pequeña. ¿Qué haces, según la OMS?</p>
      <ol class="pasos-ej">
        <li>Primero aleja al niño del perro y revisa si la herida sangra mucho; si es así, aprieta y llama a emergencias.</li>
        <li>Lava la herida de inmediato con agua y jabón durante al menos 15 minutos. Mira el reloj.</li>
        <li>Busca atención médica ese mismo día, aunque la herida sea pequeña: el personal de salud decidirá si necesita vacunas contra la rabia.</li>
        <li>Si es posible, averigua de quién es el perro y si está vacunado.</li>
        <li>Comprueba con la regla de la OMS: lavar 15 minutos y buscar atención médica.</li>
      </ol>
      <p>Resultado: <span class="resultado">lavar 15 minutos con agua y jabón y buscar atención médica ese día</span>.</p>`,
    vidaReal: `
      <p>Prevenir picaduras y mordeduras te protege en casa y en el campo:</p>
      <ul>
        <li>Evitas el dengue quitando el agua estancada y usando repelente.</li>
        <li>Reconoces las chinches del mal de Chagas y sabes a quién avisar.</li>
        <li>Caminas en el campo con botas y un palo, con menos riesgo de una mordedura de serpiente.</li>
        <li>Sabes qué hacer si un perro te muerde.</li>
        <li>Reconoces una reacción alérgica grave a una picadura.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>La OMS pide lavar una mordedura de perro al menos 15 minutos. Si empiezas a las 4:50, ¿a qué hora terminas como mínimo? Escribe solo los minutos después de las 5.</p>', respuesta: 50 + 15 - 60,
        pista: '<p>Suma 15 minutos a las 4:50.</p>',
        solucion: '<p>4:50 + 15 minutos = 5:05, es decir, <strong>5</strong> minutos después de las 5.</p>' },
      { tipo: 'numero', enunciado: '<p>La OMS dice que el 99% de los casos de rabia en personas vienen de perros. De cada 100 casos, ¿cuántos vienen de otros animales?</p>', respuesta: 100 - 99,
        pista: '<p>Resta 99 a 100.</p>',
        solucion: '<p>100 − 99 = <strong>1 caso</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuándo pican los mosquitos que transmiten el dengue, según la OMS?</p>',
        opciones: ['Solo de noche', 'De día', 'Solo en invierno'], correcta: 1,
        pista: '<p>Por eso la OMS recomienda mosquitero si duermes de día.</p>',
        solucion: '<p><strong>De día.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Una serpiente mordió a alguien en el tobillo. ¿Qué haces?</p>',
        opciones: ['Le pones un torniquete', 'Lo haces caminar rápido', 'Lo mantienes quieto y tranquilo y llamas a emergencias'], correcta: 2,
        pista: '<p>Revisa lo que pide MedlinePlus.</p>',
        solucion: '<p><strong>Quieto, tranquilo y a emergencias.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Dónde viven las chinches que transmiten el mal de Chagas, según la OMS?</p>',
        opciones: ['En las grietas de paredes y techos, y en gallineros y corrales', 'Solo en los ríos', 'Solo en las ciudades grandes'], correcta: 0,
        pista: '<p>De día se esconden.</p>',
        solucion: '<p><strong>En las grietas de paredes y techos</strong>, y en gallineros y corrales.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama un animal, como un mosquito, que lleva un microbio de una persona a otra?</p>',
        respuestas: ['vector', 'un vector', 'vectores'],
        pista: '<p>Empieza con "v".</p>',
        solucion: '<p>Un <strong>vector</strong>.</p>' },
    ],
    fuentes: [OMS('dengue-and-severe-dengue', 'Dengue y dengue grave'), OMS('chagas-disease-(american-trypanosomiasis)', 'Enfermedad de Chagas'), OMS('snakebite-envenoming', 'Envenenamiento por mordedura de serpiente'), MEDLINE('ency/article/000031.htm', 'Mordeduras de serpientes'), OMS('rabies', 'Rabia'), MEDLINE('ency/article/000033.htm', 'Mordeduras y picaduras de insectos')],
  });

  // ------------------------------------------------------------------
  L('Cuándo buscar ayuda médica sin demora', {
    objetivo: 'Reconocer las señales de alarma que indican una emergencia en adultos y en niños, y tener todo listo para pedir ayuda rápido.',
    explicacion: `
      <p>En esta materia aprendiste a cuidarte con lo que tienes en casa. Pero la autosuficiencia también es saber cuándo algo ya no se puede resolver en casa. En una emergencia médica, unos minutos pueden cambiarlo todo.</p>
      <h3>¿Qué es una señal de alarma?</h3>
      <p>Una <strong>señal de alarma</strong> es un síntoma que indica que la persona puede estar grave y necesita atención médica de inmediato. No hace falta saber qué enfermedad es: basta con reconocer la señal y pedir ayuda.</p>
      <h3>Señales de alarma en adultos</h3>
      <p>MedlinePlus, con información del Colegio Americano de Médicos de Emergencias, enumera entre otras:</p>
      <ul>
        <li>Sangrado que no para.</li>
        <li>Dificultad para respirar o falta de aire.</li>
        <li>Confusión, comportamiento raro o dificultad para despertar.</li>
        <li>Dolor o molestia en el pecho que dura dos minutos o más.</li>
        <li>Desmayo o pérdida del conocimiento.</li>
        <li>Toser o vomitar sangre.</li>
        <li>Golpe en la cabeza o en la columna.</li>
        <li>Dolor fuerte y repentino en cualquier parte del cuerpo, o dolor fuerte en el abdomen.</li>
        <li>Mareo, debilidad o cambio repentino en la vista.</li>
        <li>Haber tragado una sustancia tóxica.</li>
        <li>Hinchazón de la cara, los ojos o la lengua.</li>
        <li>Pensamientos de hacerse daño o de hacer daño a otros.</li>
      </ul>
      <h3>Señales de alarma en niños</h3>
      <p>Para los niños, MedlinePlus agrega:</p>
      <ul>
        <li>Piel azulada o grisácea.</li>
        <li>Fiebre con confusión o rigidez en el cuello o la espalda.</li>
        <li>Convulsiones.</li>
        <li>Más sueño de lo normal o respuestas lentas.</li>
        <li>No poder pararse o caminar.</li>
        <li>Dolor de cabeza fuerte o vómito después de un golpe en la cabeza.</li>
        <li>Problemas para comer.</li>
      </ul>
      <h3>El accidente cerebrovascular: RÁPIDO</h3>
      <p>MedlinePlus explica que en un accidente cerebrovascular, también llamado derrame o ataque cerebral, se detiene la sangre en una parte del cerebro y sus células empiezan a morir en minutos. Sus síntomas aparecen de repente: entumecimiento o debilidad de la cara, un brazo o una pierna, sobre todo de un lado; confusión o dificultad para hablar; problemas para ver; dificultad para caminar o pérdida del equilibrio, y un dolor de cabeza muy fuerte sin causa. MedlinePlus propone recordar la palabra inglesa <span lang="en">FAST</span>, que quiere decir "rápido": la cara caída de un lado al sonreír, un brazo que cae al levantar los dos, el habla rara y el tiempo, porque hay que llamar de inmediato.</p>
      <h3>Lo que ya viste en esta materia</h3>
      <ul>
        <li>Los síntomas del botulismo, en la unidad Alimentos.</li>
        <li>Los del monóxido de carbono, en la unidad Fuego y calor.</li>
        <li>Las señales de deshidratación, en "Suero oral casero contra la deshidratación".</li>
        <li>Las del dengue grave y las mordeduras, en la lección anterior.</li>
        <li>La fiebre en bebés, en "Remedios caseros con evidencia científica".</li>
      </ul>
      <h3>Prepárate antes</h3>
      <p>MedlinePlus recomienda saber antes dónde está la sala de urgencias más cercana y el camino más rápido, tener los números de emergencia a la vista y en el celular, y que todos en la casa, incluidos los niños, sepan cuándo y cómo llamar, como viste en "Botiquín básico". En Ciencias naturales, en "Primeros auxilios básicos", viste qué decir al llamar y qué hacer mientras llega la ayuda.</p>
      <p>Si dudas, llama. Es mejor una llamada de más que una de menos.</p>
      <p class="nota"><strong>Trampa común:</strong> esperar a ver si se pasa un dolor en el pecho o una debilidad de un lado del cuerpo. En un infarto o un derrame, cada minuto cuenta.</p>`,
    ejemplo: `
      <p>Tu abuelo está comiendo y de pronto no puede levantar el brazo derecho, la boca se le ve caída de un lado y habla raro. ¿Qué haces con la prueba RÁPIDO de MedlinePlus?</p>
      <ol class="pasos-ej">
        <li>Primero la cara: pídele que sonría. Un lado de la boca caído es una señal.</li>
        <li>Luego los brazos: pídele que levante los dos. Si uno cae, es otra señal.</li>
        <li>Después el habla: pídele que repita una frase sencilla. Si habla arrastrado o raro, es la tercera.</li>
        <li>Por último el tiempo: con una sola de estas señales basta. Llama de inmediato al número de emergencias de tu país (en muchos, el 911).</li>
        <li>Anota la hora en que empezaron los síntomas, para decírsela al personal de salud.</li>
      </ol>
      <p>Resultado: <span class="resultado">puede ser un accidente cerebrovascular: llama de inmediato a emergencias</span>.</p>`,
    vidaReal: `
      <p>Reconocer las señales de alarma puede salvar una vida:</p>
      <ul>
        <li>Sabes cuándo una molestia ya es una emergencia.</li>
        <li>Reconoces un posible derrame con la prueba RÁPIDO.</li>
        <li>Tienes listos los números de emergencia y el camino al hospital.</li>
        <li>Tu familia sabe cuándo y cómo pedir ayuda.</li>
        <li>No pierdes minutos valiosos esperando a ver si se pasa.</li><li>Anotas la hora en que empezaron los síntomas para decírsela al personal de salud.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>MedlinePlus señala como alarma un dolor de pecho que dura dos minutos o más. ¿Cuántos segundos son?</p>', respuesta: 2 * 60,
        pista: '<p>Un minuto tiene 60 segundos.</p>',
        solucion: '<p>2 × 60 = <strong>120 segundos</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>La prueba RÁPIDO revisa cara, brazos y habla. ¿Cuántas de esas tres señales tienen que aparecer para llamar a emergencias?</p>', respuesta: 1,
        pista: '<p>¿Hace falta esperar a tener todas?</p>',
        solucion: '<p>Basta con <strong>1</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas es una señal de alarma en un adulto, según MedlinePlus?</p>',
        opciones: ['Un estornudo', 'Dificultad para respirar', 'Hambre'], correcta: 1,
        pista: '<p>Piensa en lo que pone la vida en riesgo.</p>',
        solucion: '<p><strong>La dificultad para respirar.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Un niño tiene fiebre y el cuello rígido. ¿Qué haces?</p>',
        opciones: ['Esperas a mañana', 'Le das un té', 'Buscas atención médica de inmediato'], correcta: 2,
        pista: '<p>Es una señal de alarma en niños.</p>',
        solucion: '<p><strong>Atención médica de inmediato.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>No sabes con certeza si es una emergencia. ¿Qué conviene?</p>',
        opciones: ['Llamar: es mejor una llamada de más', 'Esperar a estar seguro', 'Buscar en redes sociales'], correcta: 0,
        pista: '<p>Cada minuto puede contar.</p>',
        solucion: '<p><strong>Llamar.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama un síntoma que indica que la persona puede estar grave y necesita atención de inmediato?</p>',
        respuestas: ['senal de alarma', 'una senal de alarma', 'senales de alarma', 'signo de alarma', 'senal de advertencia', 'signo de advertencia'],
        pista: '<p>Son tres palabras; la última es "alarma".</p>',
        solucion: '<p>Una <strong>señal de alarma</strong>.</p>' },
    ],
    fuentes: [MEDLINE('ency/article/001927.htm', 'Reconocimiento de emergencias médicas'), MEDLINE('stroke.html', 'Accidente cerebrovascular')],
  });
})();
