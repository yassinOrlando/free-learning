// Ciencias naturales · Unidad 5: Ecología.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Traslapes: el efecto invernadero, el ozono y la lluvia ácida están en Química ("Química y medio ambiente"),
// y las tres erres en Química ("Polímeros y plásticos"). Aquí solo se retoman y se enfocan en los seres vivos.
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

  const OSB = (pagina, nombre) => ({ nombre: `OpenStax, Biology 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/biology-2e/pages/${pagina}` });
  const OCB = (pagina, nombre) => ({ nombre: `OpenStax, Concepts of Biology: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/concepts-biology/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const PHET = (sim, nombre) => ({ nombre: `PhET, Universidad de Colorado: ${nombre}`, url: `https://phet.colorado.edu/es/simulations/${sim}` });
  const OMS = (ficha, nombre) => ({ nombre: `Organización Mundial de la Salud: ${nombre}`, url: `https://www.who.int/es/news-room/fact-sheets/detail/${ficha}` });
  const NASA = (ruta, nombre) => ({ nombre: `NASA Ciencia: ${nombre}`, url: `https://ciencia.nasa.gov/${ruta}` });
  const ONU = (ruta, nombre) => ({ nombre: `Naciones Unidas: ${nombre}`, url: `https://www.un.org/es/${ruta}` });

  // ------------------------------------------------------------------
  const NIVELES = diagrama([-0.3, 11.3], [-0.3, 5.3], [
    caja(0, 0, 11, 5), caja(0.35, 0.35, 8.4, 4.3), caja(0.7, 0.7, 5.9, 3.6), caja(1.05, 1.05, 3.45, 2.9, true),
    txt(2.25, 2, 'individuo'),
    txt(4.7, 2.15, 'población'), txt(7.15, 2.3, 'comunidad'), txt(9.7, 2.5, 'ecosistema'),
  ], 'Cuatro rectángulos, uno dentro de otro. El más pequeño, sombreado, dice individuo. Lo rodea uno que dice población; a este, uno que dice comunidad; y al exterior, el más grande, dice ecosistema.');

  L('Ecosistemas', {
    objetivo: 'Reconocer las partes de un ecosistema, distinguir lo vivo de lo no vivo en él y entender cómo se relacionan las especies que lo forman.',
    explicacion: `
      <p>Asómate a un charco que lleva días en el parque. Hay larvas de mosquito, algas verdes, a veces una rana, y también agua, lodo, luz y piedras. Nada de eso está ahí por separado: cada cosa depende de las otras. Si el charco se seca, las larvas mueren, y si llega la rana, se las come.</p>
      <p>Un <strong>ecosistema</strong> es un lugar donde los seres vivos conviven entre sí y con las cosas sin vida que los rodean, como el agua, el suelo y el clima. Puede ser tan pequeño como un charco o tan grande como una selva o un océano.</p>
      <h3>Lo vivo y lo no vivo</h3>
      <p>Un ecosistema tiene dos tipos de componentes, llamados <strong>factores bióticos y abióticos</strong>. Los bióticos son los seres vivos: plantas, animales, hongos y bacterias, los reinos que viste en la Unidad 1. Los abióticos son lo que no está vivo pero influye en la vida: la luz, la temperatura, el agua, el aire y el suelo. "Bio" quiere decir vida, y la "a" del principio quiere decir "sin".</p>
      <p>Los dos se afectan entre sí. En el desierto llueve poco, y por eso viven ahí plantas que guardan agua, como los cactus. Pero los seres vivos también cambian lo no vivo: las raíces de los árboles sujetan el suelo, y sus hojas caídas lo vuelven fértil.</p>
      <h3>Del individuo a la biosfera</h3>
      <p>Para estudiar la naturaleza, los ecólogos la ordenan en niveles, como cajas dentro de cajas:</p>
      ${NIVELES}
      <ul>
        <li>Un individuo es un solo ser vivo, como una rana.</li>
        <li>Una población es el grupo de individuos de una misma especie que viven en un lugar, como todas las ranas del estanque.</li>
        <li>Una comunidad son todas las poblaciones de distintas especies que conviven ahí: ranas, peces, algas e insectos.</li>
        <li>El ecosistema es la comunidad junto con su agua, su suelo y su clima.</li>
        <li>La biosfera es el conjunto de todos los ecosistemas de la Tierra.</li>
      </ul>
      <p>Cada especie ocupa un <strong>hábitat</strong>: el lugar con las condiciones que necesita para vivir, como la orilla del estanque para la rana. Los ecosistemas grandes que comparten un clima parecido, como las selvas, los desiertos o los bosques templados, se llaman biomas.</p>
      <h3>Cómo se relacionan las especies</h3>
      <ul>
        <li>En la depredación, un ser vivo se come a otro, como la rana a los mosquitos.</li>
        <li>En la competencia, dos especies necesitan lo mismo, como luz o comida, y se estorban.</li>
        <li>En el mutualismo, las dos especies ganan: la abeja obtiene néctar y la flor queda polinizada.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> pensar que un ecosistema son solo sus animales y plantas. Sin el agua, la luz y el suelo no habría ninguno de ellos, y cambiar uno solo de esos factores puede transformar todo el ecosistema.</p>`,
    ejemplo: `
      <p>En un estanque de 200 m² viven 50 ranas. Tras una sequía, el estanque se reduce a 80 m² y quedan 40 ranas. ¿Cómo cambió la densidad de población, es decir, las ranas por cada metro cuadrado?</p>
      <ol class="pasos-ej">
        <li>La densidad se calcula dividiendo los individuos entre el área. Antes: 50 ÷ 200 = 0.25 ranas por m², una rana por cada 4 m².</li>
        <li>Después: 40 ÷ 80 = 0.5 ranas por m², una rana por cada 2 m².</li>
        <li>Compara: 0.5 ÷ 0.25 = 2. La densidad se duplicó, aunque haya menos ranas.</li>
        <li>Comprueba al revés: 0.25 × 200 = 50 y 0.5 × 80 = 40, las ranas de cada momento.</li>
      </ol>
      <p>Resultado: <span class="resultado">la densidad pasó de 0.25 a 0.5 ranas por m²</span>. Con el doble de apretadas, las ranas competirán más por la comida: un factor abiótico, el agua, cambió la vida de toda la población.</p>
      <p class="nota"><strong>Error común:</strong> dividir el área entre las ranas. Eso da los metros cuadrados por rana, que es otra forma de verlo, pero no es la densidad.</p>`,
    vidaReal: `
      <p>Esto te sirve en lo cotidiano:</p>
      <ul>
        <li>Al plantar un jardín, eliges las plantas según la luz y el agua que hay en ese lugar.</li>
        <li>Si se contamina un río, cambian todos los peces que viven en él, y los pescadores lo notan.</li>
        <li>Proteger a las abejas ayuda a que haya frutas y verduras, porque llevan el polen de una flor a otra.</li>
        <li>Si tienes una pecera, cuidas a la vez el agua, la luz y la comida para que los peces vivan bien.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos es un factor abiótico?</p>',
        opciones: ['Un hongo', 'La temperatura del agua', 'Una bacteria'], correcta: 1,
        pista: '<p>Busca lo que no está vivo.</p>',
        solucion: '<p>La <strong>temperatura del agua</strong>. El hongo y la bacteria son seres vivos, es decir, factores bióticos.</p>' },
      { tipo: 'numero', enunciado: '<p>En un bosque de 40 km² viven 120 venados. ¿Cuántos venados hay por cada km²?</p>', respuesta: 120 / 40,
        pista: '<p>Divide los individuos entre el área.</p>',
        solucion: '<p>120 ÷ 40 = <strong>3 venados por km²</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Todas las ranas de una misma especie que viven en un estanque forman...</p>',
        opciones: ['una comunidad', 'un ecosistema', 'una población'], correcta: 2,
        pista: '<p>Son individuos de una sola especie.</p>',
        solucion: '<p><strong>Una población</strong>. La comunidad incluye a todas las especies del estanque, y el ecosistema suma además el agua, el suelo y el clima.</p>' },
      { tipo: 'opciones', enunciado: '<p>La abeja obtiene néctar de la flor, y la flor queda polinizada. ¿Qué relación es?</p>',
        opciones: ['Mutualismo', 'Competencia', 'Depredación'], correcta: 0,
        pista: '<p>Las dos especies ganan.</p>',
        solucion: '<p><strong>Mutualismo</strong>, porque las dos especies salen beneficiadas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el lugar con las condiciones que una especie necesita para vivir?</p>', respuestas: ['habitat', 'el habitat', 'su habitat'],
        pista: '<p>Para la rana, es la orilla del estanque.</p>',
        solucion: '<p>El <strong>hábitat</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En un estanque hay 50 ranas. Una sequía elimina al 30% de ellas. ¿Cuántas quedan?</p>', respuesta: 50 * 70 / 100,
        pista: '<p>Si se pierde el 30%, queda el 70%.</p>',
        solucion: '<p>Queda el 70%: 50 × 0.7 = <strong>35 ranas</strong>.</p>' },
    ],
    fuentes: [
      OSB('46-1-ecology-of-ecosystems', 'Ecology of Ecosystems'),
      OCB('19-1-population-demographics-and-dynamics', 'Population Demographics and Dynamics'),
      OCB('20-3-terrestrial-biomes', 'Terrestrial Biomes'),
      WIKI('Ecosistema', 'Ecosistema'),
    ],
  });

  // ------------------------------------------------------------------
  const ESLABONES = [['pasto', 'productor'], ['saltamontes', 'consumidor 1'], ['rana', 'consumidor 2'], ['serpiente', 'consumidor 3'], ['águila', 'consumidor 4']];
  const CADENA = diagrama([0, 9.8], [-0.1, 5.7], ESLABONES.flatMap(([ser, papel], i) => {
    const y = 0.4 + 1.2 * i;
    return [
      caja(0.4, y - 0.35, 4.0, y + 0.35), txt(2.2, y, ser), txt(7.2, y, papel),
      ...(i < ESLABONES.length - 1 ? flecha([2.2, y + 0.35], [2.2, y + 0.85], 0, 0.8) : []),
    ];
  }), 'Cadena alimentaria dibujada como cinco cajas apiladas, unidas por flechas que apuntan hacia arriba, hacia quien come. De abajo arriba: pasto, productor; saltamontes, consumidor 1; rana, consumidor 2; serpiente, consumidor 3; águila, consumidor 4.');

  const PIRAMIDE = barras({ etiquetas: ['pasto', 'saltamontes', 'rana', 'serpiente'], valores: [10000, 1000, 100, 10], max: 11000, paso: 1e9,
    descripcion: 'Gráfica de barras de la energía que hay en cada nivel de la cadena, en unidades de energía. Pasto: 10 000. Saltamontes: 1 000. Rana: 100. Serpiente: 10. Cada barra es la décima parte de la anterior, y las dos últimas casi no se ven.' });

  L('Cadenas y redes alimentarias', {
    objetivo: 'Seguir el camino de la energía de un ser vivo a otro y explicar por qué cada nivel tiene mucha menos energía que el anterior.',
    explicacion: `
      <p>La energía de la torta que comiste vino del jamón y del pan. El jamón salió de un cerdo que comió maíz, y el pan, del trigo. El maíz y el trigo tomaron su energía del Sol. Si sigues cualquier comida hacia atrás, casi siempre llegas a una planta y, al final, al Sol.</p>
      <h3>Quién come a quién</h3>
      <p>En un ecosistema, cada ser vivo cumple un papel según cómo consigue su energía:</p>
      <ul>
        <li>Un <strong>productor</strong> fabrica su propio alimento, casi siempre con la luz del Sol, como viste en la fotosíntesis. Son las plantas, las algas y algunas bacterias.</li>
        <li>Un <strong>consumidor</strong> obtiene su energía comiéndose a otros seres vivos. Los herbívoros comen plantas, los carnívoros comen animales y los omnívoros, como tú, comen de los dos.</li>
        <li>Un <strong>descomponedor</strong>, como los hongos y muchas bacterias, se alimenta de restos y seres muertos, y los deshace hasta devolver sus materiales al suelo. Sin ellos, el planeta estaría cubierto de hojas y animales muertos.</li>
      </ul>
      <p>Una cadena alimentaria es una fila que muestra quién se come a quién. Las flechas apuntan hacia quien come, porque muestran hacia dónde viaja la energía:</p>
      ${CADENA}
      <p>Cada eslabón es un nivel trófico, porque "trófico" quiere decir "de la alimentación". En la naturaleza casi ningún animal come una sola cosa: la rana come saltamontes y moscas, y a ella se la comen serpientes y garzas. Por eso las cadenas se entrecruzan y forman una red alimentaria, que se parece más a una telaraña que a una fila.</p>
      <h3>La regla del 10%</h3>
      <p>Cuando un animal come, no toda la energía de su comida se queda en su cuerpo. La mayor parte la usa para moverse, respirar y mantenerse caliente, y termina como calor que se escapa al ambiente. En Física viste que la energía no se destruye; aquí solo sale de la cadena. En promedio, de un nivel al siguiente pasa alrededor del 10% de la energía.</p>
      ${PIRAMIDE}
      <p>Por eso hay muchas más plantas que herbívoros, y muchos más herbívoros que carnívoros. También por eso las cadenas rara vez tienen más de cuatro o cinco eslabones: arriba ya casi no queda energía. Y por la misma razón, alimentar a una persona con vegetales requiere mucha menos tierra que alimentarla con carne.</p>
      <p class="nota"><strong>Trampa común:</strong> dibujar las flechas al revés, desde quien come hacia lo que come. La flecha sigue a la energía: va del pasto al saltamontes, porque la energía del pasto pasa al saltamontes.</p>`,
    ejemplo: `
      <p>Las plantas de un prado captan 50 000 unidades de energía. Con la regla del 10%, ¿cuánta llega a una serpiente que come ranas que comen saltamontes que comen esas plantas?</p>
      <ol class="pasos-ej">
        <li>Ordena la cadena: plantas → saltamontes → rana → serpiente. Hay tres pasos de un nivel a otro.</li>
        <li>Primer paso: el 10% de 50 000 es 5 000, la energía que llega a los saltamontes.</li>
        <li>Segundo paso: el 10% de 5 000 es 500, la que llega a las ranas.</li>
        <li>Tercer paso: el 10% de 500 es 50, la que llega a la serpiente.</li>
        <li>Comprueba de un jalón: tres veces el 10% es multiplicar por 0.1 tres veces, 50 000 × 0.001 = 50.</li>
      </ol>
      <p>Resultado: <span class="resultado">50 unidades de energía</span>, apenas una milésima parte de lo que captaron las plantas.</p>
      <p class="nota"><strong>Error común:</strong> restar el 10% en cada paso, como si se perdiera solo un poco. Es al revés: pasa el 10% y se pierde el 90%.</p>`,
    vidaReal: `
      <p>Saber cómo viaja la energía entre los seres vivos explica cosas de todos los días:</p>
      <ul>
        <li>Producir comida a partir de vegetales necesita menos tierra y agua que producir la misma cantidad de carne.</li>
        <li>Los hongos y las lombrices convierten los restos de comida en tierra fértil.</li>
        <li>Cuando se cazan demasiados lobos o pumas, los animales que ellos comían se multiplican y acaban con las plantas.</li>
        <li>Si se acaban los peces pequeños de una zona, los grandes que se alimentan de ellos se quedan sin comida.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Las plantas de un campo tienen 20 000 unidades de energía. ¿Cuánta energía pasa a los herbívoros que se las comen?</p>', respuesta: 20000 * 10 / 100,
        pista: '<p>Pasa más o menos el 10%.</p>',
        solucion: '<p>El 10% de 20 000 es <strong>2 000 unidades</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un nivel de productores tiene 80 000 unidades de energía. ¿Cuánta energía llega tres niveles más arriba?</p>', respuesta: 80000 / 1000,
        pista: '<p>En cada paso queda el 10%, es decir, se divide entre 10.</p>',
        solucion: '<p>80 000 ÷ 10 ÷ 10 ÷ 10 = <strong>80 unidades</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>En la cadena "pasto → conejo", ¿qué indica la flecha?</p>',
        opciones: ['Que la energía pasa del pasto al conejo', 'Que el pasto se come al conejo', 'Que el conejo es más grande que el pasto'], correcta: 0,
        pista: '<p>La flecha sigue a la energía.</p>',
        solucion: '<p>Que <strong>la energía pasa del pasto al conejo</strong>, porque el conejo se come el pasto.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un hongo crece sobre un tronco caído y lo va deshaciendo. ¿Qué papel cumple?</p>',
        opciones: ['Productor', 'Descomponedor', 'Consumidor'], correcta: 1,
        pista: '<p>Se alimenta de restos de seres vivos.</p>',
        solucion: '<p>Es un <strong>descomponedor</strong>: devuelve al suelo los materiales del tronco.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué las cadenas alimentarias rara vez tienen más de cinco eslabones?</p>',
        opciones: ['Porque los animales grandes no tienen hambre', 'Porque ya no cabrían en el ecosistema', 'Porque en cada nivel se pierde cerca del 90% de la energía'], correcta: 2,
        pista: '<p>Revisa la gráfica de barras.</p>',
        solucion: '<p>Porque <strong>en cada nivel se pierde cerca del 90% de la energía</strong>, y arriba ya no queda suficiente para otro nivel.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el ser vivo que fabrica su propio alimento, casi siempre con la luz del Sol?</p>', respuestas: ['productor', 'un productor', 'productores', 'los productores'],
        pista: '<p>Las plantas y las algas lo son.</p>',
        solucion: '<p>Un <strong>productor</strong>.</p>' },
    ],
    fuentes: [
      OCB('20-1-energy-flow-through-ecosystems', 'Energy Flow through Ecosystems'),
      OSB('46-2-energy-flow-through-ecosystems', 'Energy Flow through Ecosystems'),
      WIKI('Cadena_trófica', 'Cadena trófica'),
      WIKI('Red_trófica', 'Red trófica'),
      WIKI('Pirámide_ecológica', 'Pirámide ecológica'),
    ],
  });

  // ------------------------------------------------------------------
  const CICLO_AGUA = diagrama([-0.8, 10.8], [-0.9, 5.4], [
    caja(3.5, 4, 6.5, 5), txt(5, 4.5, 'nubes'), txt(5, 3.5, 'condensación'),
    caja(0, 0, 3, 1), txt(1.5, 0.5, 'mar y lagos'),
    caja(7, 0, 10, 1), txt(8.5, 0.5, 'tierra'),
    ...flecha([2, 1], [3.6, 4], 0, 0.8), txt(1.2, 2.8, 'evaporación'),
    ...flecha([6.4, 4], [8, 1], 0, 0.8), txt(8.9, 2.8, 'precipitación'),
    ...flecha([7, 0.5], [3, 0.5], 0, 0.8), txt(5, -0.4, 'escurrimiento'),
  ], 'Ciclo del agua con tres cajas y tres flechas. De la caja mar y lagos sube una flecha rotulada evaporación hasta la caja nubes, donde dice condensación. De las nubes baja una flecha rotulada precipitación hasta la caja tierra. De la tierra, una flecha rotulada escurrimiento regresa al mar y los lagos.');

  L('Ciclos del agua, el carbono y el nitrógeno', {
    objetivo: 'Explicar cómo el agua, el carbono y el nitrógeno pasan una y otra vez entre los seres vivos, el aire, el agua y el suelo.',
    explicacion: `
      <p>El agua que tomaste hoy pudo caer como lluvia sobre un dinosaurio hace millones de años. No es una exageración: la Tierra casi no recibe materia nueva del espacio, así que el agua, el carbono y los demás materiales de la vida se usan una y otra vez. La energía llega del Sol y se va como calor, pero la materia da vueltas.</p>
      <p>Ese recorrido de un material entre los seres vivos ("bio"), las rocas y el suelo ("geo"), y el aire y el agua se llama <strong>ciclo biogeoquímico</strong>. Aquí verás los tres más importantes.</p>
      <h3>El ciclo del agua</h3>
      ${CICLO_AGUA}
      <p>El Sol calienta el mar, los lagos y el suelo, y parte del agua se evapora: pasa de líquido a gas, como viste en Física. Las plantas también sueltan vapor por sus hojas. Al subir, el vapor se enfría y se condensa en gotitas que forman las nubes. Cuando las gotas se juntan y pesan lo suficiente, caen como lluvia, granizo o nieve: es la precipitación. Esa agua escurre por los ríos de regreso al mar o se filtra en el suelo y forma depósitos subterráneos. Y todo vuelve a empezar.</p>
      <p>Alrededor del 97% del agua de la Tierra es salada. De la poca agua dulce, la mayor parte está congelada en los polos y los glaciares. Por eso el agua limpia que podemos usar es tan valiosa.</p>
      <h3>El ciclo del carbono</h3>
      <p>El carbono es la base de las moléculas de la vida, como viste en Química. Las plantas lo toman del aire como CO₂ en la fotosíntesis y lo guardan en azúcares. Los animales lo obtienen al comer, y todos los seres vivos lo regresan al aire como CO₂ con la respiración celular que viste en la Unidad 2. Los descomponedores también lo liberan de los restos. Una parte queda guardada durante millones de años en el carbón, el petróleo y el gas, y otra en los océanos.</p>
      <p>Al quemar carbón, petróleo y gas sacamos de golpe carbono que estaba guardado, más rápido de lo que las plantas y los océanos pueden absorberlo. Por eso aumenta el CO₂ del aire, como viste en Química.</p>
      <h3>El ciclo del nitrógeno</h3>
      <p>Tus proteínas y tu ADN necesitan nitrógeno, y el aire tiene muchísimo: cerca del 78%. Pero ni tú ni las plantas pueden usarlo directamente, porque sus dos átomos están unidos por un enlace triple muy fuerte, como viste en Química. La <strong>fijación de nitrógeno</strong> es el proceso que rompe ese enlace y convierte el nitrógeno del aire en sustancias que las plantas sí pueden absorber. La hacen sobre todo algunas bacterias del suelo, otras que viven en las raíces del frijol y plantas parecidas, y también los rayos. Después, el nitrógeno pasa a los animales que comen plantas, y los descomponedores lo regresan al suelo.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que la materia se gasta. La energía fluye en una sola dirección, del Sol hasta perderse como calor, pero los átomos de agua, carbono y nitrógeno no se acaban: solo cambian de lugar.</p>`,
    ejemplo: `
      <p>Un salón tiene 150 m³ de aire. El aire tiene cerca de 78% de nitrógeno, 21% de oxígeno y 1% de otros gases. ¿Cuántos metros cúbicos de nitrógeno hay en el salón?</p>
      <ol class="pasos-ej">
        <li>Pasa el porcentaje a decimal dividiendo entre 100: 78% = 0.78.</li>
        <li>Multiplica por el volumen del salón: 0.78 × 150 = 117 m³ de nitrógeno.</li>
        <li>Haz lo mismo con los otros gases para comprobar: 0.21 × 150 = 31.5 m³ de oxígeno, y 0.01 × 150 = 1.5 m³ de otros gases.</li>
        <li>Suma todo: 117 + 31.5 + 1.5 = 150 m³, el volumen del salón. Las cuentas cuadran.</li>
      </ol>
      <p>Resultado: <span class="resultado">117 m³ de nitrógeno</span>. Fíjate que respiras mucho más nitrógeno que oxígeno, pero tu cuerpo no lo usa: lo sacas igual que entró.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar por 78 en lugar de por 0.78. Daría 11 700 m³, mucho más aire del que cabe en el salón.</p>`,
    vidaReal: `
      <p>La materia que da vueltas por el planeta pasa por tu vida diaria:</p>
      <ul>
        <li>Sembrar frijol junto al maíz, como en la milpa, mejora el suelo, porque sus raíces ayudan a fertilizarlo.</li>
        <li>Cuidar los bosques ayuda a que el agua de lluvia se filtre al subsuelo y no se pierda.</li>
        <li>La ropa tendida se seca porque el agua se evapora y sube al aire.</li>
        <li>Plantar árboles ayuda a sacar del aire parte del CO₂ que calienta el planeta.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>El aire tiene cerca de 78% de nitrógeno. ¿Cuántos litros de nitrógeno hay en 500 litros de aire?</p>', respuesta: 500 * 78 / 100,
        pista: '<p>Calcula el 78% de 500.</p>',
        solucion: '<p>500 × 0.78 = <strong>390 litros</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>En el ciclo del agua, ¿qué pasa cuando el vapor sube y se enfría?</p>',
        opciones: ['Se condensa en gotitas y forma nubes', 'Cae como lluvia de inmediato', 'Se convierte en hielo en el suelo'], correcta: 0,
        pista: '<p>Piensa en el vaho de un vaso frío.</p>',
        solucion: '<p><strong>Se condensa en gotitas y forma nubes</strong>. Llueve después, cuando las gotas se juntan y pesan lo suficiente.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Quién convierte el nitrógeno del aire en sustancias que las plantas pueden usar?</p>',
        opciones: ['Las raíces del maíz, por sí solas', 'Algunas bacterias del suelo y de las raíces del frijol', 'Los animales, al respirar'], correcta: 1,
        pista: '<p>Es la fijación de nitrógeno.</p>',
        solucion: '<p><strong>Algunas bacterias</strong>, del suelo y de las raíces del frijol y plantas parecidas. Los rayos también fijan un poco.</p>' },
      { tipo: 'numero', enunciado: '<p>Si el 97% del agua de la Tierra es salada, ¿qué porcentaje es dulce?</p>', respuesta: 100 - 97,
        pista: '<p>Entre las dos deben sumar 100%.</p>',
        solucion: '<p>100 − 97 = <strong>3%</strong>, y la mayor parte de ese poco está congelada.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos procesos regresa carbono al aire?</p>',
        opciones: ['La fotosíntesis', 'La formación del petróleo', 'La respiración celular'], correcta: 2,
        pista: '<p>Busca el que suelta CO₂.</p>',
        solucion: '<p>La <strong>respiración celular</strong>, que suelta CO₂. La fotosíntesis y la formación del petróleo guardan carbono.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el paso del agua de líquido a gas, que la lleva hacia las nubes?</p>', respuestas: ['evaporacion', 'la evaporacion'],
        pista: '<p>Lo provoca el calor del Sol.</p>',
        solucion: '<p>La <strong>evaporación</strong>.</p>' },
    ],
    fuentes: [
      OCB('20-2-biogeochemical-cycles', 'Biogeochemical Cycles'),
      OSB('46-3-biogeochemical-cycles', 'Biogeochemical Cycles'),
      WIKI('Ciclo_hidrológico', 'Ciclo hidrológico'),
      WIKI('Ciclo_del_carbono', 'Ciclo del carbono'),
      WIKI('Ciclo_del_nitrógeno', 'Ciclo del nitrógeno'),
      WIKI('Fijación_de_nitrógeno', 'Fijación de nitrógeno'),
    ],
  });

  // ------------------------------------------------------------------
  L('Biodiversidad', {
    objetivo: 'Explicar qué es la biodiversidad, por qué es importante para la vida y para las personas, y qué la amenaza.',
    explicacion: `
      <p>Compara un bosque con un campo donde solo se siembra maíz. En el bosque hay árboles de muchas clases, hongos, aves, insectos y ranas. En el campo, casi todo es maíz. Si llega una plaga que ataca al maíz, el campo entero puede perderse. En el bosque, aunque una especie sufra, las demás siguen ahí.</p>
      <p>La <strong>biodiversidad</strong> es la variedad de la vida en un lugar. Se mide en tres niveles:</p>
      <ul>
        <li>La diversidad genética son las diferencias dentro de una misma especie, como las muchas variedades de maíz o de frijol. Es la variación que viste en la Unidad 4.</li>
        <li>La diversidad de especies es cuántas especies distintas hay y en qué cantidad.</li>
        <li>La diversidad de ecosistemas es la variedad de ambientes, como selvas, desiertos, arrecifes y manglares.</li>
      </ul>
      <h3>¿Por qué importa?</h3>
      <p>La biodiversidad no es solo bonita: nos sostiene. Casi todo lo que comes viene de plantas y animales, y muchas medicinas salieron de seres vivos, como la penicilina, que viene de un hongo. Las abejas y otros polinizadores hacen posible buena parte de las frutas y verduras. Los bosques ayudan a limpiar el aire y el agua, y los manglares protegen las costas de las tormentas.</p>
      <p>Además, los ecosistemas con muchas especies resisten mejor los cambios, como el bosque del principio. Cada especie cumple un papel en la red alimentaria, y si desaparece, otras lo resienten.</p>
      <h3>Especies de un solo lugar</h3>
      <p>Una <strong>especie endémica</strong> es la que vive de forma natural en una sola región del mundo, como el ajolote, que solo vive en los canales de Xochimilco, en México. Las especies endémicas son muy frágiles: si se pierde su hábitat, desaparecen del planeta. Diecisiete países, llamados megadiversos, reúnen buena parte de las especies del mundo; entre ellos están México, Colombia, Brasil, Perú y Ecuador.</p>
      <h3>¿Qué la amenaza?</h3>
      <p>Según la IPBES, el grupo internacional de científicos que estudia la biodiversidad, alrededor de un millón de especies de animales y plantas están en peligro de extinción. Las causas principales son:</p>
      <ul>
        <li>La pérdida del hábitat, cuando se talan bosques o se secan humedales para cultivos, ganado o ciudades.</li>
        <li>La sobreexplotación, que es cazar, pescar o talar más rápido de lo que las especies se recuperan.</li>
        <li>La contaminación y el cambio climático, que verás en las próximas lecciones.</li>
        <li>Las especies invasoras. Una <strong>especie invasora</strong> es la que llega, casi siempre llevada por las personas, a un lugar donde no vivía, y se multiplica tanto que desplaza a las especies de ahí, porque no tiene depredadores que la frenen.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> pensar que una especie más o menos no hace diferencia. En una red alimentaria todo está conectado: en algunos lugares donde se acabó con los lobos, los venados se multiplicaron y se comieron los árboles jóvenes de las orillas de los ríos.</p>`,
    ejemplo: `
      <p>La IPBES calcula que en la Tierra hay unos 8 millones de especies de animales y plantas, y que alrededor de 1 millón está en peligro de extinción. ¿Qué porcentaje es?</p>
      <ol class="pasos-ej">
        <li>Divide la parte entre el total: 1 millón ÷ 8 millones. Los "millones" se cancelan, así que queda 1 ÷ 8 = 0.125.</li>
        <li>Multiplica por 100 para pasarlo a porcentaje: 0.125 × 100 = 12.5%.</li>
        <li>Ponlo en palabras: es una de cada ocho especies.</li>
        <li>Comprueba al revés: el 12.5% de 8 millones es 0.125 × 8 = 1 millón.</li>
      </ol>
      <p>Resultado: <span class="resultado">alrededor del 12.5% de las especies</span>, una de cada ocho. Fíjate que la mayoría de esos 8 millones son insectos, y que muchas especies todavía no tienen nombre.</p>
      <p class="nota"><strong>Error común:</strong> dividir al revés, 8 ÷ 1 = 8, y decir "8%". El total siempre va abajo, en el divisor.</p>`,
    vidaReal: `
      <p>La variedad de la vida te beneficia más de lo que parece:</p>
      <ul>
        <li>Muchas medicinas, como la penicilina, se descubrieron en hongos y plantas.</li>
        <li>Sin abejas y otros insectos que llevan el polen de flor en flor, habría muchas menos frutas y verduras.</li>
        <li>Soltar una mascota de otro país en un río o un bosque puede dañar a los animales que ya vivían ahí.</li>
        <li>Comer variedades locales de maíz, frijol o chile ayuda a que no se pierdan.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En una región hay 2 000 especies de plantas, y 300 son endémicas. ¿Qué porcentaje son endémicas?</p>', respuesta: 300 / 2000 * 100,
        pista: '<p>Divide la parte entre el total y multiplica por 100.</p>',
        solucion: '<p>300 ÷ 2 000 = 0.15, es decir, el <strong>15%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En un muestreo se contaron 200 aves, y 120 eran gorriones. ¿Qué porcentaje eran gorriones?</p>', respuesta: 120 / 200 * 100,
        pista: '<p>Divide los gorriones entre el total de aves.</p>',
        solucion: '<p>120 ÷ 200 = 0.6, es decir, el <strong>60%</strong>. Si una sola especie es tan común, el lugar es menos diverso de lo que parece.</p>' },
      { tipo: 'opciones', enunciado: '<p>El ajolote vive de forma natural solo en los canales de Xochimilco. ¿Qué tipo de especie es?</p>',
        opciones: ['Una especie invasora', 'Una especie endémica', 'Una especie extinta'], correcta: 1,
        pista: '<p>Vive en un solo lugar del mundo.</p>',
        solucion: '<p>Una <strong>especie endémica</strong>, y por eso es tan frágil.</p>' },
      { tipo: 'opciones', enunciado: '<p>Talar una selva para sembrar pasto para el ganado es un ejemplo de...</p>',
        opciones: ['Pérdida de hábitat', 'Especie invasora', 'Diversidad genética'], correcta: 0,
        pista: '<p>Las especies de la selva se quedan sin el lugar donde viven.</p>',
        solucion: '<p><strong>Pérdida de hábitat</strong>, una de las principales amenazas para la biodiversidad.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué un bosque con muchas especies resiste mejor una plaga que un campo de un solo cultivo?</p>',
        opciones: ['Porque las plagas no entran a los bosques', 'Porque los árboles se curan solos', 'Porque si una especie sufre, las demás siguen cumpliendo su papel'], correcta: 2,
        pista: '<p>Una plaga casi siempre ataca a una sola especie.</p>',
        solucion: '<p>Porque <strong>si una especie sufre, las demás siguen</strong>. En el campo de un solo cultivo, la plaga lo alcanza todo.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la variedad de la vida en un lugar, en sus genes, sus especies y sus ecosistemas?</p>',
        respuestas: ['biodiversidad', 'la biodiversidad', 'diversidad biologica', 'la diversidad biologica'],
        pista: '<p>Es el título de esta lección.</p>',
        solucion: '<p>La <strong>biodiversidad</strong>.</p>' },
    ],
    fuentes: [
      OCB('21-1-importance-of-biodiversity', 'Importance of Biodiversity'),
      OCB('21-2-threats-to-biodiversity', 'Threats to Biodiversity'),
      OCB('21-3-preserving-biodiversity', 'Preserving Biodiversity'),
      WIKI('Biodiversidad', 'Biodiversidad'),
      WIKI('Megadiverso', 'Países megadiversos'),
      WIKI('Especie_invasora', 'Especie invasora'),
      { nombre: 'IPBES: Global Assessment Report on Biodiversity and Ecosystem Services', url: 'https://www.ipbes.net/global-assessment' },
    ],
  });

  // ------------------------------------------------------------------
  const DDT = barras({ etiquetas: ['agua', 'plancton', 'pez chico', 'pez grande', 'ave'], valores: [0.000003, 0.04, 0.5, 2, 25], max: 28, paso: 5,
    descripcion: 'Gráfica de barras de la concentración de DDT, en partes por millón, en cada nivel de una cadena alimentaria acuática. Son valores redondeados de un ejemplo clásico de libros de texto, de los años sesenta. Agua: 0.000003. Plancton: 0.04. Pez chico: 0.5. Pez grande: 2. Ave que come peces: 25. Las tres primeras barras casi no se ven.' });

  L('Contaminación', {
    objetivo: 'Reconocer los principales tipos de contaminación y entender cómo afectan a los ecosistemas y a la salud, sobre todo cuando un contaminante sube por la cadena alimentaria.',
    explicacion: `
      <p>Algunos ríos que cruzan las ciudades tienen espuma blanca y huelen mal, y ciertos días el cielo de la ciudad se ve gris. En los dos casos, algo que no debería estar ahí está dañando el agua o el aire, y con ellos a los seres vivos que dependen de ellos.</p>
      <p>Un <strong>contaminante</strong> es una sustancia, o una forma de energía como el ruido o el calor, que llega a un ecosistema en una cantidad que daña a los seres vivos. En Química viste dos casos del aire, la lluvia ácida y los gases que dañaron la capa de ozono. Aquí verás qué les pasa a los seres vivos.</p>
      <h3>El aire</h3>
      <p>El humo de los coches, las fábricas y la quema de basura o leña llena el aire de partículas muy finas que entran hasta lo más profundo de los pulmones. Según la OMS, en 2019 el 99% de la población mundial vivía en lugares donde el aire no cumplía sus recomendaciones, y la contaminación del aire, de fuera y de dentro de las casas, se asocia a unos 6.7 millones de muertes prematuras al año. Los días de aire muy contaminado conviene evitar el ejercicio intenso al aire libre, sobre todo si tienes asma, y consultar al personal de salud si te cuesta respirar.</p>
      <h3>El agua</h3>
      <p>Los ríos y lagos reciben aguas negras, basura y fertilizantes que la lluvia arrastra desde los campos. Los fertilizantes tienen mucho nitrógeno y fósforo, que alimentan a las algas. Las algas crecen sin control y cubren el agua de verde; cuando mueren, las bacterias que las descomponen gastan casi todo el oxígeno del agua, y los peces se asfixian. A este exceso de nutrientes se le llama <strong>eutrofización</strong>.</p>
      <h3>El suelo y el plástico</h3>
      <p>La basura mal tirada y algunos químicos del campo contaminan el suelo y, con la lluvia, el agua de debajo. El plástico es un caso difícil: tarda muchísimos años en degradarse, y mientras tanto se rompe en pedacitos diminutos, los microplásticos, que ya se encuentran en el mar, en los peces y hasta en el agua que bebemos.</p>
      <h3>Cuando el veneno sube por la cadena</h3>
      <p>Algunos contaminantes, como ciertos pesticidas y el mercurio, no se eliminan con facilidad del cuerpo y se van acumulando en él; a esto se le llama bioacumulación. Un pez chico come mucho plancton con un poquito de veneno cada uno, y lo va guardando. Un pez grande come muchos peces chicos, y guarda todavía más. A este aumento del contaminante en cada nivel de la cadena alimentaria se le llama <strong>biomagnificación</strong>.</p>
      ${DDT}
      <p>Por eso los animales de arriba de la cadena, como las aves que comen peces, son los más afectados. En los años sesenta, el pesticida DDT hizo que los cascarones de los huevos de águilas y pelícanos se volvieran tan delgados que se rompían. Cuando se prohibió, muchas de esas aves se recuperaron.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que si un contaminante está muy diluido ya no importa. Con la biomagnificación, una cantidad casi invisible en el agua puede volverse millones de veces mayor en el último eslabón.</p>`,
    ejemplo: `
      <p>Cada pez chico de un lago tiene 2 unidades de mercurio. Un pez grande se come 50 peces chicos a lo largo de su vida, y un ave se come 40 peces grandes. Si cada uno guarda todo el mercurio que come, ¿cuánto mercurio acumula el ave?</p>
      <ol class="pasos-ej">
        <li>Primero calcula el mercurio de un pez grande: 50 peces chicos × 2 unidades = 100 unidades.</li>
        <li>Luego el del ave: 40 peces grandes × 100 unidades = 4 000 unidades.</li>
        <li>Comprueba de un jalón: 2 × 50 × 40 = 4 000.</li>
        <li>Compara con el principio: 4 000 ÷ 2 = 2 000, el ave tiene 2 000 veces más que un pez chico.</li>
      </ol>
      <p>Resultado: <span class="resultado">4 000 unidades de mercurio</span>. En la realidad el cuerpo elimina una parte, pero el patrón es el mismo: el veneno se concentra al subir.</p>
      <p class="nota"><strong>Error común:</strong> sumar en lugar de multiplicar. El ave no come un pez de cada tipo, sino muchos, y cada uno trae su carga.</p>`,
    vidaReal: `
      <p>Lo que se tira al aire, al agua o al suelo termina regresando a ti:</p>
      <ul>
        <li>Los días de aire muy sucio conviene hacer ejercicio bajo techo.</li>
        <li>Usar menos fertilizante en el jardín evita que el exceso llegue a los ríos.</li>
        <li>Algunas guías de salud recomiendan comer con moderación peces grandes, como el pez espada, por el mercurio que guardan.</li>
        <li>Llevar tu propia botella y bolsa reduce el plástico que termina en el mar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un contaminante se multiplica por 10 en cada nivel de una cadena. Si el plancton tiene 2 unidades, ¿cuántas tiene el animal que está tres niveles más arriba?</p>', respuesta: 2 * 10 * 10 * 10,
        pista: '<p>Multiplica por 10 tres veces.</p>',
        solucion: '<p>2 × 10 × 10 × 10 = <strong>2 000 unidades</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En la gráfica, el pez grande tiene 2 ppm de DDT y el ave, 25 ppm. ¿Cuántas veces más tiene el ave?</p>', respuesta: 25 / 2, tolerancia: 0.01,
        pista: '<p>Divide la concentración del ave entre la del pez grande.</p>',
        solucion: '<p>25 ÷ 2 = <strong>12.5 veces</strong> más.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es la eutrofización?</p>',
        opciones: ['El exceso de nutrientes hace crecer algas que, al descomponerse, dejan el agua sin oxígeno', 'El agua se calienta y se evapora', 'Los peces se comen todas las algas del lago'], correcta: 0,
        pista: '<p>Empieza con los fertilizantes que llegan al agua.</p>',
        solucion: '<p>Es cuando <strong>el exceso de nutrientes hace crecer las algas</strong>; al descomponerse, gastan el oxígeno y los peces se asfixian.</p>' },
      { tipo: 'opciones', enunciado: '<p>En una cadena con DDT, ¿qué ser vivo acumula más?</p>',
        opciones: ['El plancton', 'El pez chico', 'El ave que come peces grandes'], correcta: 2,
        pista: '<p>El veneno se concentra al subir por la cadena.</p>',
        solucion: '<p><strong>El ave</strong>, que está arriba de la cadena y come muchos peces que ya traían DDT.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la OMS, en 2019, ¿qué parte de la población mundial vivía donde el aire no cumplía sus recomendaciones?</p>',
        opciones: ['Alrededor de la mitad', 'El 99%', 'El 10%'], correcta: 1,
        pista: '<p>Es casi todo el mundo.</p>',
        solucion: '<p>El <strong>99%</strong>, casi toda la población del planeta.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llaman los pedacitos diminutos en que se rompe el plástico?</p>', respuestas: ['microplasticos', 'microplastico', 'los microplasticos'],
        pista: '<p>"Micro" quiere decir muy pequeño.</p>',
        solucion: '<p>Los <strong>microplásticos</strong>.</p>' },
    ],
    fuentes: [
      OMS('ambient-(outdoor)-air-quality-and-health', 'Contaminación del aire ambiente (exterior)'),
      OMS('household-air-pollution-and-health', 'Contaminación del aire doméstico'),
      OCB('21-2-threats-to-biodiversity', 'Threats to Biodiversity'),
      WIKI('Contaminación', 'Contaminación'),
      WIKI('Eutrofización', 'Eutrofización'),
      WIKI('Microplástico', 'Microplástico'),
    ],
  });

  // ------------------------------------------------------------------
  L('Cambio climático', {
    objetivo: 'Distinguir el tiempo del clima, conocer las pruebas del cambio climático y sus efectos en los seres vivos, y saber qué se puede hacer.',
    explicacion: `
      <p>Tal vez tus abuelos cuentan que antes los veranos eran menos calurosos o que llovía en otras fechas. Un solo día de calor no prueba nada, pero cuando los científicos juntan millones de mediciones de todo el planeta durante más de un siglo, aparece un patrón claro.</p>
      <h3>Tiempo y clima</h3>
      <p>El tiempo es lo que pasa en la atmósfera hoy o esta semana: si llueve o si hace frío. El <strong>clima</strong> es el promedio del tiempo de un lugar durante muchos años, por lo general 30 o más. Dicho de forma sencilla, el tiempo es la ropa que te pones hoy, y el clima es toda la ropa que tienes en el armario.</p>
      <p>El <strong>cambio climático</strong> es el cambio del clima de toda la Tierra a lo largo de décadas. En la historia del planeta ha habido cambios naturales, pero el de ahora es mucho más rápido y lo causan sobre todo las personas.</p>
      <h3>¿Por qué está pasando?</h3>
      <p>En Química viste el efecto invernadero: el CO₂, el metano y otros gases atrapan calor como una cobija, y quemar carbón, petróleo y gas ha subido el CO₂ del aire de 280 a unas 420 ppm. La tala de bosques empeora el problema, porque quedan menos árboles que tomen el CO₂, como viste en el ciclo del carbono.</p>
      <h3>Las pruebas</h3>
      <ul>
        <li>Según la NASA, la temperatura promedio del planeta ha subido alrededor de 1 °C desde finales del siglo XIX.</li>
        <li>Los glaciares de las montañas y el hielo de Groenlandia y la Antártida se están derritiendo.</li>
        <li>El nivel del mar sube, porque se derrite hielo de tierra firme y porque el agua se dilata al calentarse, como viste en Física.</li>
        <li>Las olas de calor, las sequías y las lluvias muy intensas son cada vez más frecuentes.</li>
      </ul>
      <p>Un grado parece poco, pero es un promedio de todo el planeta. Igual que un grado de fiebre ya te hace sentir mal, el planeta lo resiente.</p>
      <h3>Efectos en los seres vivos</h3>
      <p>Muchas especies no pueden adaptarse tan rápido. Los arrecifes de coral se blanquean y mueren cuando el mar se calienta. Algunas plantas y animales suben a lugares más altos o se mueven hacia los polos buscando el frío que necesitan, y los que ya viven en la cima de una montaña no tienen a dónde ir. La OMS advierte que también afecta la salud de las personas, con más golpes de calor, menos agua limpia y más enfermedades que transmiten los mosquitos. Un golpe de calor, con la piel seca y muy caliente, mareo o confusión, pone en peligro la vida: si ves esas señales, llama de inmediato al número de emergencias.</p>
      <h3>¿Qué se puede hacer?</h3>
      <p>Hay dos tipos de respuesta. La <strong>mitigación</strong> es reducir los gases que calientan el planeta: usar energía solar y del viento, ahorrar electricidad, moverse en transporte público o en bici, desperdiciar menos comida y cuidar los bosques. La adaptación es prepararse para los cambios que ya llegaron, como cuidar el agua o construir pensando en las inundaciones. Las dos hacen falta. Las decisiones más grandes las toman gobiernos y empresas, pero la ONU recuerda que lo que hace cada persona también suma.</p>
      <p class="nota"><strong>Trampa común:</strong> decir "este invierno hizo mucho frío, así que el planeta no se está calentando". Un invierno frío es tiempo, no clima. Lo que importa es la tendencia de muchos años en todo el planeta.</p>`,
    ejemplo: `
      <p>Un informe dice que la temperatura de una región subió 1.5 °C. ¿Cuántos grados Fahrenheit de aumento son?</p>
      <ol class="pasos-ej">
        <li>En Física viste que cada grado Celsius equivale a 1.8 grados Fahrenheit, porque entre el agua que se congela y la que hierve hay 100 °C y 180 °F.</li>
        <li>Aquí no conviertes una temperatura, sino un aumento. Por eso solo multiplicas por 1.8, sin sumar 32: 1.5 × 1.8 = 2.7 °F.</li>
        <li>Comprueba con lo que dice la NASA: un aumento de 1 °C son unos 2 °F, y 1.5 °C debería dar un poco más, cerca de 3 °F. El 2.7 encaja.</li>
      </ol>
      <p>Resultado: <span class="resultado">un aumento de 2.7 °F</span>.</p>
      <p class="nota"><strong>Error común:</strong> sumar 32, como cuando conviertes una temperatura. Daría 34.7 °F de aumento, lo cual no tiene sentido. El 32 solo sirve para pasar de una lectura del termómetro a otra, no para una diferencia.</p>`,
    vidaReal: `
      <p>Lo que pasa con la temperatura del planeta se nota cerca de ti:</p>
      <ul>
        <li>Ahorrar electricidad en casa reduce los gases que se sueltan al producirla.</li>
        <li>Plantar y cuidar árboles da sombra en las olas de calor y saca CO₂ del aire.</li>
        <li>Muchos agricultores cambian sus fechas de siembra porque las lluvias ya no llegan cuando antes.</li>
        <li>Tomar agua y buscar sombra en los días muy calurosos evita los golpes de calor.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Si la temperatura de un lugar sube 2 °C, ¿cuántos grados Fahrenheit de aumento son?</p>', respuesta: 2 * 1.8, tolerancia: 0.01,
        pista: '<p>Es un aumento: multiplica por 1.8 y no sumes 32.</p>',
        solucion: '<p>2 × 1.8 = <strong>3.6 °F</strong> de aumento.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas frases habla del tiempo y no del clima?</p>',
        opciones: ['Mañana va a llover en tu ciudad', 'En el desierto llueve poco cada año', 'La selva es húmeda todo el año'], correcta: 0,
        pista: '<p>El tiempo es lo que pasa en un día o una semana.</p>',
        solucion: '<p><strong>Mañana va a llover</strong>. Las otras dos describen el promedio de muchos años: el clima.</p>' },
      { tipo: 'numero', enunciado: '<p>Un coche suelta unos 120 g de CO₂ por cada kilómetro. ¿Cuántos kilogramos suelta en un viaje de 50 km?</p>', respuesta: 120 * 50 / 1000,
        pista: '<p>Multiplica y luego pasa los gramos a kilogramos: 1 kg = 1 000 g.</p>',
        solucion: '<p>120 × 50 = 6 000 g, que son <strong>6 kg de CO₂</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas acciones es de mitigación?</p>',
        opciones: ['Construir muros contra las inundaciones', 'Usar paneles solares en lugar de quemar carbón', 'Comprar ventiladores para el calor'], correcta: 1,
        pista: '<p>La mitigación reduce los gases que calientan el planeta.</p>',
        solucion: '<p><strong>Usar paneles solares</strong>, porque evita gases. Los muros y los ventiladores son adaptación: ayudan a soportar los cambios.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué sube el nivel del mar?</p>',
        opciones: ['Porque llueve más sobre el océano', 'Porque los ríos traen más agua', 'Porque se derrite el hielo de tierra firme y el agua se dilata al calentarse'], correcta: 2,
        pista: '<p>Hay dos razones, y una la viste en Física.</p>',
        solucion: '<p>Porque <strong>se derrite el hielo de tierra firme y el agua se dilata</strong> al calentarse.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el promedio del tiempo de un lugar durante muchos años?</p>', respuestas: ['clima', 'el clima'],
        pista: '<p>Es toda la ropa del armario, no la de hoy.</p>',
        solucion: '<p>El <strong>clima</strong>.</p>' },
    ],
    fuentes: [
      NASA('cambio-climatico/', 'Cambio climático'),
      NASA('cambio-climatico/causas/', 'Causas del cambio climático'),
      NASA('cambio-climatico/evidencia/', 'Evidencia del cambio climático'),
      ONU('climatechange/what-is-climate-change', '¿Qué es el cambio climático?'),
      OMS('climate-change-and-health', 'Cambio climático y salud'),
      { nombre: 'MedlinePlus en español: Enfermedades causadas por el calor', url: 'https://medlineplus.gov/spanish/heatillness.html' },
      { nombre: 'IPCC: Sexto Informe de Evaluación, Informe de síntesis', url: 'https://www.ipcc.ch/report/ar6/syr/' },
      PHET('greenhouse-effect', 'El efecto invernadero'),
    ],
  });

  // ------------------------------------------------------------------
  L('Consumo responsable y reciclaje', {
    objetivo: 'Medir el impacto de lo que consumes y aplicar hábitos para generar menos residuos, aprovechar los restos orgánicos y desperdiciar menos.',
    explicacion: `
      <p>Piensa en la bolsa de basura que sale de tu casa cada pocos días y multiplícala por un año. Luego, por todas las casas de tu ciudad. Todo eso tiene que ir a algún lugar, y para producirlo se usaron agua, energía, tierra y materiales.</p>
      <h3>La huella de lo que consumes</h3>
      <p>La <strong>huella ecológica</strong> mide cuánta tierra y cuánto mar hacen falta para producir lo que una persona consume y para absorber sus desechos. Se mide en hectáreas: una hectárea es un cuadrado de 100 m por lado, más o menos un campo y medio de fútbol. Cuando la humanidad usa más de lo que el planeta renueva en un año, es como gastar los ahorros de la Tierra.</p>
      <p>Todo lo que compras tiene una huella escondida: el agua para cultivar el algodón de una playera, la energía para fabricar un celular o el combustible para traer una fruta desde otro país.</p>
      <h3>Antes de reciclar</h3>
      <p>En Química viste las tres erres y por qué conviene reciclar al final. A esas tres se pueden sumar otras dos: reparar lo que se descompone en lugar de tirarlo, y rechazar lo que no necesitas, como una bolsa de más.</p>
      <h3>La comida que se tira</h3>
      <p>Según la FAO, cada año se pierde o se desperdicia alrededor de un tercio de los alimentos que se producen en el mundo. Con ellos se pierden también el agua, la tierra y la energía que se usaron para producirlos. Además, en los basureros la comida se pudre sin aire y suelta metano, uno de los gases que calientan el planeta. Ayudan hábitos sencillos: planear las compras, guardar bien la comida, servirte lo que vas a comer y aprovechar las sobras.</p>
      <h3>Separar y aprovechar</h3>
      <p>Un <strong>residuo orgánico</strong> es el que viene de seres vivos y se descompone solo: cáscaras, restos de comida, hojas o pasto. Suele ser una parte grande de la basura de una casa. Si se separa del resto, se puede convertir en <strong>composta</strong>: un abono que preparan los descomponedores, como bacterias y hongos, con ayuda de lombrices, al transformar los restos en tierra fértil. Así cierras el ciclo de la materia que viste en esta unidad.</p>
      <p>Lo demás conviene separarlo en lo que se puede reciclar en tu ciudad, como papel, cartón, vidrio, latas y algunos plásticos, y lo que no. Separar bien es clave: un envase sucio de comida puede arruinar un lote entero de reciclaje.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que reciclar compensa cualquier consumo. Reciclar es la última opción, no la primera. Lo que más ayuda es necesitar menos cosas y hacer que duren.</p>`,
    ejemplo: `
      <p>Una familia tira 1.2 kg de basura al día, y la mitad es orgánica. ¿Cuántos kilos de restos podría convertir en composta en un año?</p>
      <ol class="pasos-ej">
        <li>Primero calcula la parte orgánica de un día: la mitad de 1.2 kg es 0.6 kg.</li>
        <li>Multiplica por los días del año: 0.6 × 365 = 219 kg.</li>
        <li>Comprueba por otro camino: la basura total del año es 1.2 × 365 = 438 kg, y la mitad de 438 es 219 kg.</li>
      </ol>
      <p>Resultado: <span class="resultado">219 kg de restos orgánicos al año</span>, que en lugar de ir al basurero podrían volverse abono para un huerto o un jardín. Es más o menos lo que pesan tres personas adultas.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar por 12 o por 30, como si el dato fuera por mes. El dato es por día, así que se multiplica por los 365 días del año.</p>`,
    vidaReal: `
      <p>Pequeñas decisiones de cada día cambian cuánto desechas:</p>
      <ul>
        <li>Planear las compras de la semana evita que se eche a perder comida en el refrigerador.</li>
        <li>Reparar un aparato o una prenda en lugar de tirarlo ahorra dinero y materiales.</li>
        <li>Con las cáscaras y los restos de comida puedes hacer abono para tus plantas.</li>
        <li>Llevar tu propia bolsa y tu botella reduce la basura que generas cada semana.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una persona tira 0.8 kg de basura al día. ¿Cuántos kilos tira en un año?</p>', respuesta: 0.8 * 365, tolerancia: 0.01,
        pista: '<p>Multiplica por los días del año.</p>',
        solucion: '<p>0.8 × 365 = <strong>292 kg</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>De 10 kg de basura de una casa, 4.5 kg son restos orgánicos. ¿Qué porcentaje es orgánico?</p>', respuesta: 4.5 / 10 * 100, tolerancia: 0.01,
        pista: '<p>Divide la parte orgánica entre el total y multiplica por 100.</p>',
        solucion: '<p>4.5 ÷ 10 = 0.45, es decir, el <strong>45%</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas acciones es "rechazar"?</p>',
        opciones: ['Separar la basura', 'Decir "no, gracias" a una bolsa que no necesitas', 'Llevar el vidrio a reciclar'], correcta: 1,
        pista: '<p>Rechazar es no aceptar algo que no necesitas.</p>',
        solucion: '<p><strong>Decir "no, gracias" a una bolsa que no necesitas</strong>. Así ese residuo nunca llega a existir. Separar y reciclar ayudan, pero vienen después.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos es un residuo orgánico?</p>',
        opciones: ['Una cáscara de plátano', 'Una lata', 'Una botella de vidrio'], correcta: 0,
        pista: '<p>Viene de un ser vivo y se descompone solo.</p>',
        solucion: '<p>La <strong>cáscara de plátano</strong>, que puede ir a la composta. La lata y el vidrio se reciclan.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la FAO, ¿qué parte de los alimentos que se producen en el mundo se pierde o se desperdicia?</p>',
        opciones: ['Una décima parte', 'La mitad', 'Alrededor de un tercio'], correcta: 2,
        pista: '<p>Es más de una cuarta parte y menos de la mitad.</p>',
        solucion: '<p><strong>Alrededor de un tercio</strong>, junto con el agua, la tierra y la energía que se usaron para producirlos.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el abono que se obtiene cuando bacterias, hongos y lombrices transforman los restos orgánicos?</p>',
        respuestas: ['composta', 'la composta', 'compost', 'el compost', 'composta casera'],
        pista: '<p>La puedes hacer en un rincón del patio o en una caja.</p>',
        solucion: '<p>La <strong>composta</strong>.</p>' },
    ],
    fuentes: [
      { nombre: 'FAO: Pérdida y desperdicio de alimentos', url: 'https://www.fao.org/food-loss-and-food-waste/es/' },
      ONU('actnow/ten-actions', 'Actúa ahora: diez acciones'),
      WIKI('Huella_ecológica', 'Huella ecológica'),
      WIKI('Regla_de_las_tres_erres', 'Regla de las tres erres'),
      WIKI('Reciclaje', 'Reciclaje'),
      WIKI('Desperdicio_de_alimentos', 'Desperdicio de alimentos'),
    ],
  });
})();
