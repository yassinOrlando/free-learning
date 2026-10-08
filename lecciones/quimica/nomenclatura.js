// Química · Unidad 5: Nomenclatura inorgánica.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('quimica', titulo, datos);
  // Flecha de un vector: línea hasta la base de la punta + triángulo sólido como punta.
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

  const OSC = (pagina, nombre) => ({ nombre: `OpenStax, Chemistry 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/chemistry-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = { nombre: 'Khan Academy en español: Nombres y fórmulas de compuestos iónicos', url: 'https://es.khanacademy.org/science/chemistry/atomic-structure-and-properties/names-and-formulas-of-ionic-compounds' };
  const PHET = (sim, nombre) => ({ nombre: `PhET, Universidad de Colorado: ${nombre}`, url: `https://phet.colorado.edu/es/simulations/${sim}` });

  // Mapa de las cuatro familias de compuestos (se usa en Óxidos y en Sales).
  const FAMILIAS = diagrama([-1, 11], [-0.9, 4.6], [
    txt(1.5, 4.2, 'metal'), txt(8.5, 4.2, 'no metal'),
    ...flecha([1.5, 3.85], [1.5, 2.95]), txt(3, 3.4, '+ oxígeno'),
    ...flecha([8.5, 3.85], [8.5, 2.95]), txt(7, 3.4, '+ oxígeno'),
    txt(1.5, 2.6, 'óxido básico'), txt(8.5, 2.6, 'óxido ácido'),
    ...flecha([1.5, 2.25], [1.5, 1.35]), txt(2.8, 1.8, '+ agua'),
    ...flecha([8.5, 2.25], [8.5, 1.35]), txt(7.2, 1.8, '+ agua'),
    txt(1.5, 1, 'hidróxido'), txt(8.5, 1, 'oxácido'),
    ...flecha([2.3, 0.65], [4.1, -0.15]), ...flecha([7.7, 0.65], [5.9, -0.15]),
    txt(5, -0.5, 'sal + agua'),
  ], 'Un mapa de cómo se forman las familias de compuestos. A la izquierda: un metal, más oxígeno, forma un óxido básico; el óxido básico, más agua, forma un hidróxido. A la derecha: un no metal, más oxígeno, forma un óxido ácido; el óxido ácido, más agua, forma un oxácido. Abajo, en medio, dos flechas que salen del hidróxido y del oxácido llegan a "sal + agua": al juntarse un hidróxido y un ácido se forman una sal y agua. Los ácidos sin oxígeno, que no salen en el mapa, también forman sales.');

  // ------------------------------------------------------------------
  L('Óxidos', {
    objetivo: 'Reconocer los óxidos, usar el número de oxidación para escribir su fórmula y nombrarlos con la nomenclatura de Stock y con prefijos.',
    explicacion: `
      <p>Una reja de hierro que se queda a la intemperie se cubre de una capa café que se desmorona. En la Unidad 1 viste que es un cambio químico: el hierro se combinó con el oxígeno del aire. Lo que se formó tiene nombre y fórmula, y en esta unidad vas a aprender a leer y a escribir los dos.</p>
      <h3>Un elemento con oxígeno</h3>
      <p>A un compuesto formado por un elemento y oxígeno se le llama <strong>óxido</strong>. Hay dos tipos, según con quién se junte el oxígeno:</p>
      <ul>
        <li>Con un metal forma un óxido básico, como la cal (óxido de calcio, CaO) o el óxido de la reja.</li>
        <li>Con un no metal forma un óxido ácido, como el dióxido de carbono (CO₂) que exhalas.</li>
      </ul>
      <p>Sus nombres vienen de lo que forman con agua, como muestra este mapa de la unidad:</p>
      ${FAMILIAS}
      <h3>La carga que tendría</h3>
      <p>Para escribir fórmulas se usa el <strong>número de oxidación</strong>: la carga que tendría un átomo si fuera un ion. En los óxidos de metal coincide con la carga del ion, que viste en la Unidad 4. El oxígeno casi siempre tiene −2, porque le faltan 2 electrones para el octeto.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Elemento</th><th>Número de oxidación</th></tr>
        <tr><th>Sodio (Na), potasio (K)</th><td>+1</td></tr>
        <tr><th>Magnesio (Mg), calcio (Ca)</th><td>+2</td></tr>
        <tr><th>Aluminio (Al)</th><td>+3</td></tr>
        <tr><th>Hierro (Fe)</th><td>+2 o +3</td></tr>
        <tr><th>Cobre (Cu)</th><td>+1 o +2</td></tr>
        <tr><th>Oxígeno (O)</th><td>−2</td></tr>
      </table></div>
      <p>Como en los compuestos iónicos, los números tienen que sumar cero. El sodio tiene +1 y el oxígeno −2, así que hacen falta dos sodios: Na₂O. El calcio tiene +2 y el oxígeno −2: se cancelan uno a uno, CaO. No se escribe Ca₂O₂, porque la fórmula da la proporción más simple.</p>
      <h3>Cómo se nombran</h3>
      <p>Para los óxidos de metal se usa la <strong>nomenclatura de Stock</strong>: "óxido de" más el nombre del metal. Si el metal tiene un solo número de oxidación, no hace falta más: óxido de sodio, óxido de calcio. Si tiene dos, como el hierro, se escribe cuál usa con un número romano entre paréntesis:</p>
      <ul>
        <li>FeO es óxido de hierro (II), porque el hierro usa +2.</li>
        <li>Fe₂O₃ es óxido de hierro (III), porque usa +3. Es el óxido café de la reja.</li>
      </ul>
      <p>En libros antiguos verás los nombres óxido ferroso y óxido férrico: "-oso" para el número menor e "-ico" para el mayor.</p>
      <p>Los óxidos de no metal se nombran con prefijos que cuentan los átomos: mono- (1), di- (2), tri- (3), tetra- (4) y penta- (5).</p>
      <ul>
        <li>El CO es el monóxido de carbono, un gas venenoso que sale de los motores.</li>
        <li>El CO₂ es el dióxido de carbono: dos oxígenos.</li>
        <li>El SO₃ es el trióxido de azufre, y el N₂O₅, el pentóxido de dinitrógeno.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> leer el número romano como el número de átomos. En el óxido de hierro (III), el III es el número de oxidación del hierro, no cuántos hierros hay: la fórmula tiene 2.</p>`,
    ejemplo: `
      <p>Escribe la fórmula del óxido de hierro (III).</p>
      <ol class="pasos-ej">
        <li>Primero lee el nombre: el (III) dice que el hierro tiene número de oxidación +3. El oxígeno tiene −2.</li>
        <li>Busca el número más pequeño al que lleguen 3 y 2: el 6.</li>
        <li>Para llegar a +6 hacen falta 2 hierros (2 × 3), y para llegar a −6, 3 oxígenos (3 × 2).</li>
        <li>Escribe primero el metal y luego el oxígeno, con esas cantidades como subíndices: Fe₂O₃.</li>
        <li>Comprueba que sume cero: 2 × (+3) + 3 × (−2) = 6 − 6 = 0.</li>
      </ol>
      <p>Resultado: <span class="resultado">Fe₂O₃</span>. Es la herrumbre café de las rejas y los clavos viejos.</p>
      <p class="nota"><strong>Error común:</strong> escribir FeO₃, poniendo el III como subíndice del oxígeno. El romano es la carga del hierro; los subíndices salen de cruzar las cargas.</p>`,
    vidaReal: `
      <p>Los compuestos del oxígeno con otros elementos están por todas partes:</p>
      <ul>
        <li>La herrumbre café de las rejas y los clavos viejos es uno de ellos.</li>
        <li>La cal con la que se pintan bardas y se prepara la mezcla para construir es otro.</li>
        <li>El gas que exhalas es el mismo que hace burbujas en los refrescos.</li>
        <li>Del escape de los coches sale uno venenoso; por eso nunca hay que dejar un motor encendido en un cuarto cerrado.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuántos átomos en total tiene la fórmula Fe₂O₃?</p>', respuesta: 2 + 3,
        pista: '<p>Suma los subíndices: los del hierro y los del oxígeno.</p>',
        solucion: '<p>2 hierros + 3 oxígenos = <strong>5 átomos</strong>.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el óxido CO₂, el gas que exhalas? Usa prefijos.</p>',
        respuestas: ['dióxido de carbono', 'el dióxido de carbono'],
        pista: '<p>Tiene 2 oxígenos y 1 carbono. ¿Qué prefijo quiere decir 2?</p>',
        solucion: '<p>Es el <strong>dióxido de carbono</strong>: "di" por sus dos oxígenos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es el nombre de Stock del FeO?</p>',
        opciones: ['Óxido de hierro (III)', 'Óxido de hierro (II)', 'Dióxido de hierro'], correcta: 1,
        pista: '<p>El oxígeno tiene −2. ¿Qué número de oxidación necesita un solo hierro para cancelarlo?</p>',
        solucion: '<p>Un hierro cancela un oxígeno (−2), así que tiene +2: es el <strong>óxido de hierro (II)</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>El calcio tiene número de oxidación +2. ¿Cuál es la fórmula del óxido de calcio?</p>',
        opciones: ['Ca₂O₂', 'CaO₂', 'CaO', 'Ca₂O'], correcta: 2,
        pista: '<p>+2 y −2 se cancelan uno a uno. Escribe la proporción más simple.</p>',
        solucion: '<p><strong>CaO</strong>: un calcio (+2) y un oxígeno (−2) suman cero. Ca₂O₂ tiene la misma proporción, pero no está simplificada.</p>' },
      { tipo: 'numero', enunciado: '<p>En el óxido CuO, ¿qué número de oxidación tiene el cobre?</p>', respuesta: 2,
        pista: '<p>El oxígeno tiene −2, y los números tienen que sumar cero.</p>',
        solucion: '<p>Cobre + (−2) = 0, así que el cobre tiene <strong>+2</strong>. Su nombre es óxido de cobre (II).</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos es el óxido de un no metal?</p>',
        opciones: ['SO₂', 'Na₂O', 'CaO', 'MgO'], correcta: 0,
        pista: '<p>Busca el que no tenga un metal junto al oxígeno.</p>',
        solucion: '<p>El <strong>SO₂</strong>, dióxido de azufre: el azufre es un no metal. Los otros tres son óxidos de metales.</p>' },
    ],
    fuentes: [
      OSC('2-7-chemical-nomenclature', 'Chemical Nomenclature'),
      WIKI('Óxido', 'Óxido'),
      WIKI('Número_de_oxidación', 'Número de oxidación'),
      WIKI('Nomenclatura_química_de_los_compuestos_inorgánicos', 'Nomenclatura química de los compuestos inorgánicos'),
    ],
  });

  // ------------------------------------------------------------------
  L('Hidróxidos', {
    objetivo: 'Reconocer los hidróxidos, escribir su fórmula con el ion OH⁻ y nombrarlos.',
    explicacion: `
      <p>El líquido para destapar caños deshace el pelo y la grasa atorados. La leche de magnesia calma el ardor de estómago. Los dos tienen algo en común: un grupito de un oxígeno y un hidrógeno que viaja junto, con carga negativa.</p>
      <h3>Un ion de dos átomos</h3>
      <p>Hasta ahora, cada ion era un solo átomo con carga, como Na⁺ o Cl⁻. Pero también hay grupos de átomos que viajan juntos y tienen carga. El más común es el <strong>ion hidróxido</strong>, OH⁻: un oxígeno y un hidrógeno unidos, con una carga negativa en total. Fíjate por qué: el oxígeno aporta −2 y el hidrógeno +1, y juntos dan −1.</p>
      <p>A un compuesto formado por un metal y iones hidróxido se le llama <strong>hidróxido</strong>. El destapacaños es hidróxido de sodio, NaOH, también llamado sosa cáustica. La leche de magnesia es hidróxido de magnesio.</p>
      <h3>Cómo se forman</h3>
      <p>Si echas agua a un óxido de metal, se forma un hidróxido. Los albañiles lo hacen con la cal: a la cal viva, que es óxido de calcio, le echan agua y se convierte en cal apagada, hidróxido de calcio. La reacción suelta tanto calor que el agua burbujea.</p>
      <p>CaO + H₂O → Ca(OH)₂</p>
      <p>Se lee "óxido de calcio más agua da hidróxido de calcio".</p>
      <h3>Cómo se escribe la fórmula</h3>
      <p>Se usa la misma regla de siempre: las cargas suman cero. Como el OH⁻ tiene −1, hacen falta tantos OH⁻ como la carga del metal:</p>
      <ul>
        <li>El sodio tiene +1, así que lleva un OH⁻: NaOH.</li>
        <li>El calcio tiene +2, así que lleva dos OH⁻: Ca(OH)₂.</li>
        <li>El hierro con +3 lleva tres OH⁻: Fe(OH)₃.</li>
      </ul>
      <p>Cuando hay más de un OH, va entre paréntesis y el número va afuera. El paréntesis dice que el 2 multiplica a todo el grupo: Ca(OH)₂ tiene 1 calcio, 2 oxígenos y 2 hidrógenos. Sin paréntesis, CaOH₂ querría decir algo distinto, con 2 hidrógenos y un solo oxígeno.</p>
      <h3>Cómo se nombran</h3>
      <p>Se dice "hidróxido de" más el nombre del metal: hidróxido de sodio, hidróxido de calcio. Si el metal tiene dos números de oxidación, se agrega el romano, como en los óxidos: Fe(OH)₃ es hidróxido de hierro (III).</p>
      <h3>Una familia con carácter</h3>
      <p>Los hidróxidos pertenecen a una familia de sustancias llamadas <strong>bases</strong>, que se sienten resbalosas y pueden quemar la piel. Son lo contrario de los ácidos: los neutralizan. Por eso la leche de magnesia calma el ácido del estómago. Las bases se estudian a fondo en la Unidad 8.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que se pueden probar o tocar porque algunas son medicinas. La sosa cáustica quema la piel y los ojos. Nunca se prueba una sustancia para saber qué es.</p>`,
    ejemplo: `
      <p>Escribe la fórmula del hidróxido de aluminio y cuenta cuántos átomos tiene.</p>
      <ol class="pasos-ej">
        <li>Primero busca la carga del aluminio: tiene +3, porque está en el grupo 13 y suelta sus 3 electrones de valencia. Por eso necesita compañeros negativos que sumen −3.</li>
        <li>Cada OH⁻ aporta −1. Para cancelar +3 hacen falta tres: Al(OH)₃.</li>
        <li>Pon el paréntesis, porque el 3 multiplica al grupo completo, al oxígeno y al hidrógeno.</li>
        <li>Cuenta los átomos: 1 aluminio, 3 oxígenos y 3 hidrógenos. En total, 1 + 3 + 3 = 7.</li>
        <li>Comprueba las cargas: +3 + 3 × (−1) = 0.</li>
      </ol>
      <p>Resultado: <span class="resultado">Al(OH)₃, con 7 átomos</span>. Es uno de los ingredientes de algunos antiácidos, junto con el hidróxido de magnesio.</p>
      <p class="nota"><strong>Error común:</strong> escribir AlOH₃, sin paréntesis. Así el 3 solo multiplicaría al hidrógeno, y la fórmula tendría un solo oxígeno.</p>`,
    vidaReal: `
      <p>Hay sustancias de tu casa que son lo contrario del limón y del vinagre:</p>
      <ul>
        <li>El destapacaños deshace el pelo y la grasa atorados en la tubería.</li>
        <li>La leche de magnesia y otros antiácidos calman el ardor de estómago.</li>
        <li>La cal que usan los albañiles se prepara echándole agua, y se calienta.</li>
        <li>Muchos jabones se fabrican con grasa y una de estas sustancias.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuántos grupos OH tiene la fórmula Mg(OH)₂?</p>', respuesta: 2,
        pista: '<p>El número que va afuera del paréntesis cuenta los grupos.</p>',
        solucion: '<p>Tiene <strong>2 grupos OH</strong>, porque el magnesio tiene +2 y cada OH⁻ aporta −1.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos átomos en total tiene la fórmula Ca(OH)₂?</p>', respuesta: 1 + 2 + 2,
        pista: '<p>El 2 multiplica al oxígeno y al hidrógeno.</p>',
        solucion: '<p>1 calcio + 2 oxígenos + 2 hidrógenos = <strong>5 átomos</strong>.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el compuesto NaOH, el del destapacaños?</p>',
        respuestas: ['hidróxido de sodio', 'el hidróxido de sodio', 'sosa cáustica', 'la sosa cáustica', 'soda cáustica'],
        pista: '<p>"Hidróxido de" más el nombre del metal.</p>',
        solucion: '<p>Es el <strong>hidróxido de sodio</strong>, también llamado sosa cáustica.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es la fórmula del hidróxido de hierro (III)?</p>',
        opciones: ['FeOH₃', 'Fe(OH)₂', 'Fe₃OH', 'Fe(OH)₃'], correcta: 3,
        pista: '<p>El III dice que el hierro tiene +3. ¿Cuántos OH⁻ cancelan esa carga? No olvides el paréntesis.</p>',
        solucion: '<p><strong>Fe(OH)₃</strong>: tres OH⁻ cancelan el +3. Sin paréntesis, el 3 solo afectaría al hidrógeno.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué se forma si le echas agua al óxido de calcio, la cal viva?</p>',
        opciones: ['Un ácido', 'Un hidróxido, Ca(OH)₂', 'Una sal', 'Un óxido de no metal'], correcta: 1,
        pista: '<p>Revisa el mapa de la lección de óxidos: óxido básico más agua.</p>',
        solucion: '<p>Se forma <strong>hidróxido de calcio</strong>, la cal apagada. Un óxido de metal con agua forma un hidróxido.</p>' },
      { tipo: 'numero', enunciado: '<p>En el Cu(OH)₂, ¿qué número de oxidación tiene el cobre?</p>', respuesta: 2,
        pista: '<p>Hay dos OH⁻, cada uno con −1. ¿Qué carga los cancela?</p>',
        solucion: '<p>Cobre + 2 × (−1) = 0, así que tiene <strong>+2</strong>. Es el hidróxido de cobre (II).</p>' },
    ],
    fuentes: [
      OSC('2-7-chemical-nomenclature', 'Chemical Nomenclature'),
      WIKI('Hidróxido', 'Hidróxido'),
      WIKI('Nomenclatura_química_de_los_compuestos_inorgánicos', 'Nomenclatura química de los compuestos inorgánicos'),
      KHAN,
    ],
  });

  // ------------------------------------------------------------------
  L('Ácidos', {
    objetivo: 'Distinguir los hidrácidos de los oxácidos, nombrar los más comunes y calcular el número de oxidación de un átomo dentro de un ácido.',
    explicacion: `
      <p>El limón, el vinagre y el jugo de tu estómago tienen algo en común: son agrios, y algunos hasta pican. Son ácidos. Los hay débiles, que te comes en la ensalada, y fuertes, como el de la batería del coche, que quema la piel.</p>
      <h3>¿Qué es un ácido?</h3>
      <p>Un <strong>ácido</strong> es una sustancia que, disuelta en agua, suelta iones H⁺. Casi todos tienen fórmulas que empiezan con H. Ese H⁺ es el responsable de su sabor agrio y de que reaccionen con muchos metales. En la Unidad 8 verás cómo se mide qué tan ácido es algo. Por ahora, vas a aprender a leer sus nombres. Hay dos familias.</p>
      <h3>Ácidos sin oxígeno</h3>
      <p>Un <strong>hidrácido</strong> está formado por hidrógeno y un no metal, sin oxígeno. Su nombre se arma así: "ácido", la raíz del no metal y la terminación "-hídrico".</p>
      <ul>
        <li>El HCl es el ácido clorhídrico. Tu estómago lo produce para digerir la comida.</li>
        <li>El HF es el ácido fluorhídrico, tan corrosivo que se usa para grabar vidrio.</li>
        <li>El H₂S es el ácido sulfhídrico, que huele a huevo podrido.</li>
      </ul>
      <p>Estos nombres valen cuando están disueltos en agua. El HCl como gas seco se llama cloruro de hidrógeno.</p>
      <h3>Ácidos con oxígeno</h3>
      <p>Un <strong>oxácido</strong> tiene hidrógeno, un no metal y oxígeno. Se forma al juntar un óxido de no metal con agua, como muestra el mapa de la lección de óxidos. El refresco es el ejemplo de todos los días: el dióxido de carbono que lo hace burbujear se disuelve en el agua y forma ácido carbónico.</p>
      <p>CO₂ + H₂O → H₂CO₃</p>
      <div class="tabla-wrap"><table>
        <tr><th>Fórmula</th><th>Nombre</th><th>Dónde lo encuentras</th></tr>
        <tr><th>H₂CO₃</th><td>Ácido carbónico</td><td>Refrescos con gas</td></tr>
        <tr><th>H₂SO₄</th><td>Ácido sulfúrico</td><td>Baterías de coche</td></tr>
        <tr><th>HNO₃</th><td>Ácido nítrico</td><td>Fertilizantes</td></tr>
        <tr><th>H₃PO₄</th><td>Ácido fosfórico</td><td>Refrescos de cola</td></tr>
      </table></div>
      <p>Algunos no metales forman dos oxácidos, con más o menos oxígeno. El de más oxígeno termina en "-ico" y el de menos, en "-oso". El H₂SO₄ es el ácido sulfúrico y el H₂SO₃, con un oxígeno menos, el ácido sulfuroso.</p>
      <h3>El número de oxidación del no metal</h3>
      <p>En un compuesto, los números de oxidación de todos los átomos suman cero. El hidrógeno tiene +1 y el oxígeno −2, así que puedes despejar el del no metal. En el H₂CO₃: 2 × (+1) + carbono + 3 × (−2) = 0. Eso da 2 + carbono − 6 = 0, así que el carbono tiene +4.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir el ácido clorhídrico, HCl, con un oxácido porque empieza con H. Si no tiene oxígeno en la fórmula, es un hidrácido y termina en "-hídrico".</p>`,
    ejemplo: `
      <p>¿Qué número de oxidación tiene el azufre en el ácido sulfúrico, H₂SO₄?</p>
      <ol class="pasos-ej">
        <li>Primero escribe lo que ya sabes: cada hidrógeno tiene +1 y cada oxígeno −2. El azufre es el único que no conoces, así que es la incógnita que vas a despejar.</li>
        <li>Multiplica por cuántos hay de cada uno: 2 hidrógenos aportan 2 × (+1) = +2, y 4 oxígenos aportan 4 × (−2) = −8.</li>
        <li>Todo tiene que sumar cero: +2 + azufre − 8 = 0.</li>
        <li>Despeja: pasa el +2 y el −8 al otro lado, y queda azufre = 8 − 2 = +6.</li>
        <li>Comprueba sumando todo: +2 + 6 − 8 = 0.</li>
      </ol>
      <p>Resultado: <span class="resultado">+6</span>. En el ácido sulfuroso, H₂SO₃, con un oxígeno menos, el azufre tiene +4: el "-ico" va con el número mayor.</p>
      <p class="nota"><strong>Error común:</strong> olvidar multiplicar por los subíndices y sumar +1 − 2 una sola vez. Cada átomo cuenta.</p>`,
    vidaReal: `
      <p>Los sabores agrios y algunas sustancias peligrosas tienen el mismo origen:</p>
      <ul>
        <li>El limón, el vinagre y el yogur son agrios por lo mismo.</li>
        <li>Tu estómago fabrica un líquido tan fuerte que deshace la comida.</li>
        <li>Las baterías de los coches llevan un líquido que quema la piel y la ropa.</li>
        <li>La lluvia se vuelve dañina para los bosques y los edificios cuando el humo de las fábricas se disuelve en ella.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Qué número de oxidación tiene el azufre en el ácido sulfuroso, H₂SO₃?</p>', respuesta: 3 * 2 - 2 * 1,
        pista: '<p>El hidrógeno tiene +1 y el oxígeno −2. Todo tiene que sumar cero.</p>',
        solucion: '<p>2 × (+1) + azufre + 3 × (−2) = 0, o sea 2 + azufre − 6 = 0. El azufre tiene <strong>+4</strong>.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el ácido HCl, el que produce tu estómago?</p>',
        respuestas: ['ácido clorhídrico', 'el ácido clorhídrico', 'ácido muriático', 'el ácido muriático'],
        pista: '<p>No tiene oxígeno: "ácido", la raíz de cloro y "-hídrico".</p>',
        solucion: '<p>Es el <strong>ácido clorhídrico</strong>, un hidrácido.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos ácidos es un hidrácido?</p>',
        opciones: ['HNO₃', 'H₂SO₄', 'HCl', 'H₃PO₄'], correcta: 2,
        pista: '<p>Busca el que no tenga oxígeno.</p>',
        solucion: '<p>El <strong>HCl</strong>: solo tiene hidrógeno y cloro. Los otros tres tienen oxígeno, así que son oxácidos.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos átomos en total tiene una molécula de ácido nítrico, HNO₃?</p>', respuesta: 1 + 1 + 3,
        pista: '<p>Suma 1 hidrógeno, 1 nitrógeno y los oxígenos.</p>',
        solucion: '<p>1 + 1 + 3 = <strong>5 átomos</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué ácido se forma cuando el gas de un refresco se disuelve en el agua?</p>',
        opciones: ['Ácido carbónico', 'Ácido sulfúrico', 'Ácido clorhídrico'], correcta: 0,
        pista: '<p>El gas de los refrescos es dióxido de carbono.</p>',
        solucion: '<p>El <strong>ácido carbónico</strong>, H₂CO₃: CO₂ + H₂O → H₂CO₃.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál tiene más átomos de oxígeno, el ácido sulfuroso o el ácido sulfúrico?</p>',
        opciones: ['El ácido sulfuroso', 'El ácido sulfúrico', 'Los dos tienen los mismos'], correcta: 1,
        pista: '<p>El que termina en "-ico" tiene más oxígeno.</p>',
        solucion: '<p>El <strong>ácido sulfúrico</strong>, H₂SO₄, tiene 4; el sulfuroso, H₂SO₃, tiene 3.</p>' },
    ],
    fuentes: [
      OSC('2-7-chemical-nomenclature', 'Chemical Nomenclature'),
      WIKI('Ácido', 'Ácido'),
      WIKI('Hidrácido', 'Hidrácido'),
      WIKI('Oxoácido', 'Oxoácido'),
      PHET('acid-base-solutions', 'Soluciones ácido-base'),
    ],
  });

  // ------------------------------------------------------------------
  L('Sales', {
    objetivo: 'Entender cómo se forma una sal por neutralización y nombrar y escribir sales binarias y oxisales.',
    explicacion: `
      <p>Cuando oyes "sal", piensas en la del salero. Pero el gis del pizarrón, el mármol, el yeso de una pared y el polvo para hornear también son sales. En química, "sal" es el nombre de toda una familia.</p>
      <h3>Lo que queda cuando un ácido y una base se juntan</h3>
      <p>Si mezclas un ácido con un hidróxido, los dos se anulan. El H⁺ del ácido y el OH⁻ del hidróxido se juntan y forman agua, H₂O. Los iones que sobran, el metal del hidróxido y el resto del ácido, quedan unidos formando una sal. A esta reacción se le llama <strong>neutralización</strong>:</p>
      <p>HCl + NaOH → NaCl + H₂O</p>
      <p>Se lee "ácido clorhídrico más hidróxido de sodio da cloruro de sodio más agua". En la Unidad 6 verás cómo se escriben y se balancean estas ecuaciones. Por eso un antiácido calma el ardor: neutraliza parte del ácido de tu estómago.</p>
      ${FAMILIAS}
      <p>Entonces, una <strong>sal</strong> es un compuesto iónico formado por un ion positivo, casi siempre un metal, y el ion negativo que queda de un ácido.</p>
      <h3>Sales sin oxígeno</h3>
      <p>Las sales que vienen de un hidrácido no tienen oxígeno. Su nombre cambia la terminación "-hídrico" por "-uro", y luego va el metal:</p>
      <ul>
        <li>Del ácido clorhídrico sale el cloruro de sodio, NaCl.</li>
        <li>Del ácido fluorhídrico sale el fluoruro de calcio, CaF₂.</li>
        <li>Del ácido sulfhídrico sale el sulfuro de hierro (II), FeS.</li>
      </ul>
      <h3>Sales con oxígeno</h3>
      <p>A una sal que viene de un oxácido, y por eso tiene oxígeno, se le llama <strong>oxisal</strong>. El ion negativo es un grupo de átomos, como el OH⁻. Su nombre cambia la terminación del ácido: "-ico" pasa a "-ato" y "-oso" pasa a "-ito".</p>
      <div class="tabla-wrap"><table>
        <tr><th>Ácido</th><th>Ion</th><th>Nombre del ion</th></tr>
        <tr><th>Sulfúrico, H₂SO₄</th><td>SO₄²⁻</td><td>Sulfato</td></tr>
        <tr><th>Sulfuroso, H₂SO₃</th><td>SO₃²⁻</td><td>Sulfito</td></tr>
        <tr><th>Nítrico, HNO₃</th><td>NO₃⁻</td><td>Nitrato</td></tr>
        <tr><th>Carbónico, H₂CO₃</th><td>CO₃²⁻</td><td>Carbonato</td></tr>
        <tr><th>Fosfórico, H₃PO₄</th><td>PO₄³⁻</td><td>Fosfato</td></tr>
      </table></div>
      <p>Fíjate en la carga del ion: es igual al número de hidrógenos que tenía el ácido, porque cada H⁺ que se fue dejó una carga negativa. El H₂SO₄ pierde 2 H⁺ y deja SO₄²⁻.</p>
      <p>La fórmula se arma con la regla de siempre, que las cargas sumen cero. El calcio (Ca²⁺) con el carbonato (CO₃²⁻) se cancelan uno a uno: CaCO₃, el carbonato de calcio del gis y del mármol. El sodio (Na⁺) con el sulfato (SO₄²⁻) necesita dos: Na₂SO₄, el sulfato de sodio. El potasio con el nitrato forma KNO₃, el salitre.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir sulfuro con sulfato. El sulfuro (S²⁻) no tiene oxígeno; el sulfato (SO₄²⁻) sí. La terminación te lo dice.</p>`,
    ejemplo: `
      <p>Escribe la fórmula del sulfato de aluminio, que se usa para limpiar el agua potable, y cuenta sus átomos.</p>
      <ol class="pasos-ej">
        <li>Primero identifica los iones. El aluminio forma Al³⁺. El sulfato viene del ácido sulfúrico, que pierde 2 H⁺: SO₄²⁻.</li>
        <li>Busca el número más pequeño al que lleguen 3 y 2: el 6. Hacen falta 2 aluminios (2 × 3 = 6) y 3 sulfatos (3 × 2 = 6).</li>
        <li>Como hay más de un sulfato, el grupo va entre paréntesis: Al₂(SO₄)₃.</li>
        <li>Cuenta los átomos. Hay 2 aluminios. El 3 multiplica todo el paréntesis: 3 azufres y 3 × 4 = 12 oxígenos. En total, 2 + 3 + 12 = 17.</li>
        <li>Comprueba las cargas: 2 × (+3) + 3 × (−2) = 6 − 6 = 0.</li>
      </ol>
      <p>Resultado: <span class="resultado">Al₂(SO₄)₃, con 17 átomos</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir Al₂SO₄₃. Sin paréntesis no se sabe que el 3 cuenta grupos sulfato completos.</p>`,
    vidaReal: `
      <p>La familia de la sal de mesa es mucho más grande de lo que crees:</p>
      <ul>
        <li>El gis del pizarrón y el mármol de los pisos están hechos de la misma sustancia.</li>
        <li>Los fertilizantes de las plantas son una mezcla de varias de ellas.</li>
        <li>Las plantas potabilizadoras usan una para que la tierra del agua se junte y se asiente.</li>
        <li>Al tomar un antiácido, el ácido de tu estómago se convierte en una sal y agua.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la sal KCl, que sale del ácido clorhídrico y el potasio?</p>',
        respuestas: ['cloruro de potasio', 'el cloruro de potasio'],
        pista: '<p>"-hídrico" cambia a "-uro", y luego va el metal.</p>',
        solucion: '<p>Es el <strong>cloruro de potasio</strong>. Se usa como sustituto de la sal de mesa.</p>' },
      { tipo: 'numero', enunciado: '<p>El sodio forma Na⁺ y el sulfato es SO₄²⁻. ¿Cuántos iones sodio hay por cada sulfato en el sulfato de sodio?</p>', respuesta: 2,
        pista: '<p>¿Cuántas cargas +1 cancelan una carga −2?</p>',
        solucion: '<p>Hacen falta <strong>2</strong>: la fórmula es Na₂SO₄.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cómo se llama el CaCO₃, la sustancia del gis y del mármol?</p>',
        opciones: ['Carburo de calcio', 'Sulfato de calcio', 'Carbonato de calcio', 'Calcio carbónico'], correcta: 2,
        pista: '<p>El ion CO₃²⁻ viene del ácido carbónico. "-ico" cambia a "-ato".</p>',
        solucion: '<p>Es el <strong>carbonato de calcio</strong>: Ca²⁺ y el ion carbonato, CO₃²⁻.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué tipo de sales forma el ácido nítrico, HNO₃?</p>',
        opciones: ['Nitratos', 'Sulfatos', 'Carbonatos', 'Nitruros'], correcta: 0,
        pista: '<p>Termina en "-ico", que se cambia por "-ato".</p>',
        solucion: '<p><strong>Nitratos</strong>, con el ion NO₃⁻, como el salitre, KNO₃.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos átomos en total tiene la fórmula CaCO₃?</p>', respuesta: 1 + 1 + 3,
        pista: '<p>Suma el calcio, el carbono y los oxígenos.</p>',
        solucion: '<p>1 calcio + 1 carbono + 3 oxígenos = <strong>5 átomos</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué se forma cuando un ácido neutraliza a un hidróxido?</p>',
        opciones: ['Un óxido y un ácido', 'Un metal y oxígeno', 'Una sal y agua'], correcta: 2,
        pista: '<p>El H⁺ y el OH⁻ forman algo que bebes todos los días.</p>',
        solucion: '<p><strong>Una sal y agua</strong>: el H⁺ y el OH⁻ forman H₂O, y los iones que sobran forman la sal.</p>' },
    ],
    fuentes: [
      OSC('2-7-chemical-nomenclature', 'Chemical Nomenclature'),
      WIKI('Sal_(química)', 'Sal (química)'),
      WIKI('Oxisal', 'Oxisal'),
      KHAN,
    ],
  });
})();
