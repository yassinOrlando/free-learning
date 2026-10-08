// Ciencias naturales · Unidad 4: Herencia y evolución.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
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
  // Fila de letras de ADN centradas en x0, x0 + 0.8, ...
  const letras = (x0, y, sec) => [...sec].map((l, i) => txt(x0 + 0.8 * i, y, l));

  const OSB = (pagina, nombre) => ({ nombre: `OpenStax, Biology 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/biology-2e/pages/${pagina}` });
  const OCB = (pagina, nombre) => ({ nombre: `OpenStax, Concepts of Biology: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/concepts-biology/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const PHET = (sim, nombre) => ({ nombre: `PhET, Universidad de Colorado: ${nombre}`, url: `https://phet.colorado.edu/es/simulations/${sim}` });
  const MEDLINE = (ruta, nombre) => ({ nombre: `MedlinePlus en español: ${nombre}`, url: `https://medlineplus.gov/spanish/${ruta}` });

  // ------------------------------------------------------------------
  const PARES = [['A', 'T'], ['C', 'G'], ['G', 'C'], ['T', 'A'], ['A', 'T']];
  const ESCALERA = diagrama([-2.8, 8], [-1, 2.4], [
    { tipo: 'linea', desde: [0, 2], hasta: [7.2, 2] }, { tipo: 'linea', desde: [0, 0], hasta: [7.2, 0] },
    txt(-1.4, 2, 'hebra 1'), txt(-1.4, 0, 'hebra 2'),
    ...PARES.flatMap(([arriba, abajo], i) => {
      const x = 0.8 + 1.4 * i;
      return [
        { tipo: 'linea', desde: [x, 2], hasta: [x, 1.72] }, txt(x, 1.45, arriba),
        { tipo: 'linea', desde: [x, 1.18], hasta: [x, 0.82] }, txt(x, 0.55, abajo),
        { tipo: 'linea', desde: [x, 0.28], hasta: [x, 0] },
      ];
    }),
    txt(3.6, -0.6, 'cada peldaño es un par de bases'),
  ], 'Un tramo de ADN dibujado como una escalera sin torcer. Arriba, la línea de la hebra 1; abajo, la de la hebra 2. Entre ellas hay cinco peldaños, cada uno con dos letras unidas: A con T, C con G, G con C, T con A y A con T. Debajo dice: cada peldaño es un par de bases.');

  L('ADN, genes y cromosomas', {
    objetivo: 'Explicar qué es el ADN, cómo guarda la información con cuatro letras y cómo se organiza en genes y cromosomas.',
    explicacion: `
      <p>Tal vez tienes la nariz de tu mamá o la risa de tu abuelo. ¿Cómo pasa algo así de una persona a otra? La respuesta está en una molécula que hay dentro de casi todas tus células y que funciona como un recetario.</p>
      <p>En la Unidad 1 viste que el núcleo de la célula guarda las instrucciones para construir y hacer funcionar al ser vivo. Esas instrucciones están escritas en el <strong>ADN</strong>, que quiere decir ácido desoxirribonucleico. En Química viste que es un polímero: una cadena muy larga hecha de piezas que se repiten.</p>
      <h3>Un mensaje de cuatro letras</h3>
      <p>El ADN tiene forma de escalera torcida, como un tornillo; a esa forma se le llama doble hélice. Los dos lados de la escalera son dos hebras, y cada peldaño está formado por dos piezas llamadas bases. Solo hay cuatro bases, y se nombran con su inicial: A (adenina), T (timina), C (citosina) y G (guanina).</p>
      ${ESCALERA}
      <p>Las bases se emparejan siempre igual: A con T, y C con G, porque sus formas encajan y se unen con puentes de hidrógeno, como viste en Química. Por eso, si conoces una hebra, conoces la otra: frente a ATG siempre está TAC.</p>
      <p>El mensaje está en el orden de las letras, igual que "roma" y "amor" usan las mismas letras pero dicen cosas distintas. Cada célula guarda dos copias de tu ADN, una de cada progenitor, y cada copia tiene unos 3 000 millones de pares de bases. Si escribieras las letras de una copia, a 3 000 por página, llenarías un millón de páginas.</p>
      <h3>Genes: las recetas</h3>
      <p>Un <strong>gen</strong> es un tramo de ADN con las instrucciones para fabricar una proteína. Es como una receta dentro del recetario. Las proteínas hacen casi todo el trabajo del cuerpo: forman los músculos, llevan el oxígeno en la sangre o dan color a tus ojos. Los humanos tenemos alrededor de 20 000 genes. Fíjate en algo curioso: solo una parte pequeña del ADN son genes. Otra parte ayuda a decidir cuándo se usa cada receta, y de mucho todavía no se conoce bien su función.</p>
      <h3>Cromosomas: los tomos del recetario</h3>
      <p>El ADN de una sola célula, estirado, mediría unos 2 metros. Para caber en un núcleo diminuto, se enrolla muy apretado alrededor de proteínas, como hilo en carretes. Cada uno de esos pedazos enrollados se llama <strong>cromosoma</strong>.</p>
      <p>Las células de tu cuerpo tienen 46 cromosomas, en 23 pares. De cada par, un cromosoma vino del óvulo y el otro del espermatozoide; por eso te pareces a tus dos progenitores. Los gametos, que viste en la Unidad 2, tienen solo 23, uno de cada par, para que al unirse en la fecundación se vuelvan a juntar 46.</p>
      <p>Un par es especial: el de los cromosomas sexuales. La mayoría de las personas tiene XX o XY, y esa pareja influye en el desarrollo del cuerpo.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir gen y cromosoma. El cromosoma es el carrete entero, y un gen es solo un tramo del hilo. Cada cromosoma tiene desde decenas hasta miles de genes.</p>`,
    ejemplo: `
      <p>Una hebra de ADN dice ATTGCA. ¿Qué dice la hebra de enfrente?</p>
      <ol class="pasos-ej">
        <li>Recuerda la regla: A se une con T, y C con G. Funciona en los dos sentidos, así que T también se une con A, y G con C.</li>
        <li>Recorre la hebra letra por letra, de izquierda a derecha: A da T, T da A, la otra T da A, G da C, C da G y A da T.</li>
        <li>Junta las letras en el mismo orden: TAACGT.</li>
        <li>Comprueba al revés: si emparejas TAACGT, vuelves a obtener ATTGCA, la hebra original.</li>
      </ol>
      <p>Resultado: <span class="resultado">TAACGT</span>. Fíjate que la hebra original tiene dos A, y la nueva, dos T: siempre hay tantas A en una hebra como T en la otra.</p>
      <p class="nota"><strong>Error común:</strong> mezclar las parejas, como unir A con G o C con T. Las únicas parejas son A–T y C–G.</p>`,
    vidaReal: `
      <p>Las instrucciones que heredas se usan en muchas partes:</p>
      <ul>
        <li>Las pruebas de paternidad comparan las instrucciones de dos personas para saber si son familia.</li>
        <li>La policía puede identificar a una persona con una gota de sangre o un cabello.</li>
        <li>Los médicos pueden buscar cambios heredados que causan algunas enfermedades.</li>
        <li>Los agricultores eligen las plantas con características útiles, como más sabor o más resistencia, para sembrarlas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'texto', enunciado: '<p>Una hebra de ADN dice GATC. ¿Qué dice la hebra de enfrente? Escribe las cuatro letras.</p>', respuestas: ['ctag', 'c t a g', 'c-t-a-g', 'c,t,a,g', 'c, t, a, g'],
        pista: '<p>A se une con T, y C con G.</p>',
        solucion: '<p>G da C, A da T, T da A y C da G: <strong>CTAG</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Las células de tu cuerpo tienen 46 cromosomas. ¿Cuántos tiene un óvulo o un espermatozoide?</p>', respuesta: 46 / 2,
        pista: '<p>Los gametos llevan uno de cada par.</p>',
        solucion: '<p>46 ÷ 2 = <strong>23 cromosomas</strong>. Al unirse en la fecundación vuelven a ser 46.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Con qué base se empareja la C?</p>',
        opciones: ['Con la A', 'Con la G', 'Con la T'], correcta: 1,
        pista: '<p>Las parejas son siempre las mismas dos.</p>',
        solucion: '<p>Con la <strong>G</strong>. La A va con la T.</p>' },
      { tipo: 'numero', enunciado: '<p>Un tramo de ADN tiene 100 pares de bases. Si 30 de ellos son pares A–T, ¿cuántos pares C–G tiene?</p>', respuesta: 100 - 30,
        pista: '<p>Solo hay dos tipos de pares.</p>',
        solucion: '<p>100 − 30 = <strong>70 pares C–G</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es un gen?</p>',
        opciones: ['Un tramo de ADN con las instrucciones para fabricar una proteína', 'Un cromosoma completo', 'Una de las cuatro bases del ADN'], correcta: 0,
        pista: '<p>Piensa en la receta dentro del recetario.</p>',
        solucion: '<p><strong>Un tramo de ADN con las instrucciones para una proteína</strong>. El cromosoma es mucho más grande y tiene muchos genes.</p>' },
      { tipo: 'numero', enunciado: '<p>Una copia de tu ADN tiene unos 3 000 millones de letras. Si escribes 3 000 letras por página, ¿cuántas páginas llenas?</p>', respuesta: 3e9 / 3000,
        pista: '<p>Divide el total de letras entre las letras de una página.</p>',
        solucion: '<p>3 000 000 000 ÷ 3 000 = <strong>1 000 000 de páginas</strong>, es decir, 10⁶.</p>' },
    ],
    fuentes: [
      OCB('9-1-the-structure-of-dna', 'The Structure of DNA'),
      OCB('6-1-the-genome', 'The Genome'),
      WIKI('Ácido_desoxirribonucleico', 'Ácido desoxirribonucleico'),
      WIKI('Cromosoma', 'Cromosoma'),
      WIKI('Genoma_humano', 'Genoma humano'),
      MEDLINE('genesandgenetherapy.html', 'Genes y terapia genética'),
      PHET('gene-expression-essentials', 'Expresión génica: fundamentos'),
    ],
  });

  // ------------------------------------------------------------------
  const PUNNETT = `
      <div class="tabla-wrap"><table>
        <tr><th>Alelos</th><th>A</th><th>a</th></tr>
        <tr><th>A</th><td>AA, morada</td><td>Aa, morada</td></tr>
        <tr><th>a</th><td>Aa, morada</td><td>aa, blanca</td></tr>
      </table></div>`;

  L('Herencia: las leyes de Mendel', {
    objetivo: 'Usar las leyes de Mendel y el cuadro de Punnett para predecir con qué probabilidad pasa una característica a los hijos.',
    explicacion: `
      <p>Imagina que siembras semillas de dos plantas de chícharo de flores moradas, y una de las plantas nuevas da flores blancas. ¿De dónde salió el blanco, si ninguna lo tenía? Eso mismo se preguntó Gregor Mendel, un monje que hace más de 150 años cruzó miles de plantas de chícharo y contó con cuidado los resultados.</p>
      <h3>Dos copias de cada gen</h3>
      <p>En la lección anterior viste que los cromosomas vienen en pares, uno de cada progenitor. Por eso tienes dos copias de casi cada gen. Esas copias pueden ser iguales o un poco distintas. Cada versión de un gen se llama <strong>alelo</strong>. En los chícharos, el gen del color de la flor tiene un alelo para morado y otro para blanco.</p>
      <p>Cuando una planta tiene un alelo de cada tipo, no sale un color mezclado: sale morada. El alelo que se nota aunque solo haya una copia se llama <strong>dominante</strong>, y se escribe con mayúscula: A. El que solo se nota cuando hay dos copias se llama <strong>recesivo</strong>, y va con minúscula: a. Por eso hay tres combinaciones posibles:</p>
      <ul>
        <li>AA tiene dos alelos de morado, y la flor es morada.</li>
        <li>Aa tiene uno de cada uno, y la flor es morada, porque el morado domina.</li>
        <li>aa tiene dos alelos de blanco, y la flor es blanca.</li>
      </ul>
      <p>A la pareja de letras se le llama genotipo, y a lo que se ve, el color, fenotipo.</p>
      <h3>Las leyes de Mendel</h3>
      <p>Mendel cruzó plantas de flor morada que venían de familias solo moradas (AA) con plantas de flor blanca (aa). Todos los hijos salieron morados, porque todos eran Aa. Esta es su primera ley: al cruzar dos líneas puras distintas, todos los hijos salen iguales.</p>
      <p>Luego cruzó esos hijos Aa entre sí. Su segunda ley dice que cada progenitor pasa solo uno de sus dos alelos a cada hijo, al azar, porque el par se separa al formar los gametos. Para ver qué puede salir se usa un cuadro de Punnett: arriba van los alelos que puede dar una planta, a la izquierda los de la otra, y en cada casilla se juntan.</p>
      ${PUNNETT}
      <p>De las 4 casillas, 3 tienen al menos una A, y dan flores moradas, y 1 es aa, y da flores blancas. Cada casilla tiene la misma probabilidad, 1 de 4, es decir, 25%, como viste en Matemáticas. Por eso Mendel obtuvo unas 3 moradas por cada blanca: de 929 plantas, 705 moradas y 224 blancas. Ese es el blanco "escondido" del principio: las dos plantas moradas eran Aa.</p>
      <p>Su tercera ley dice que los genes de características distintas, como el color de la flor y la forma de la semilla, suelen heredarse por separado, como si lanzaras dos monedas distintas. Esto falla con los genes que están muy juntos en un mismo cromosoma, que tienden a heredarse en bloque.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que "dominante" significa "más común" o "mejor". Solo quiere decir que se nota con una copia. Además, muchas características humanas, como la estatura o el color de ojos, dependen de varios genes y no siguen proporciones tan simples.</p>`,
    ejemplo: `
      <p>Cruzas una planta morada Aa con una blanca aa. ¿Qué probabilidad hay de que una planta hija sea blanca?</p>
      <ol class="pasos-ej">
        <li>Escribe los alelos que puede dar cada planta. La Aa puede dar A o a; la aa solo puede dar a.</li>
        <li>Arma el cuadro: arriba A y a; a la izquierda a y a. Las casillas quedan Aa, aa, Aa y aa.</li>
        <li>Cuenta las blancas, que son las aa: hay 2 de 4 casillas.</li>
        <li>Pasa a probabilidad: 2 ÷ 4 = 0.5, es decir, 50%.</li>
        <li>Comprueba: las otras 2 casillas son Aa, moradas. 2 moradas más 2 blancas dan las 4 casillas.</li>
      </ol>
      <p>Resultado: <span class="resultado">50% de probabilidad de flor blanca</span>.</p>
      <p class="nota"><strong>Error común:</strong> responder 25% de memoria. Ese resultado es del cruce Aa × Aa. Cada cruce necesita su propio cuadro.</p>`,
    vidaReal: `
      <p>Predecir qué heredan los hijos tiene muchos usos:</p>
      <ul>
        <li>Los agricultores cruzan plantas para obtener maíz más resistente o frutas más dulces.</li>
        <li>Quienes crían animales pueden predecir cómo serán las crías.</li>
        <li>Algunas familias consultan al personal de salud para saber qué probabilidad hay de heredar una enfermedad.</li>
        <li>Entender por qué un rasgo puede saltarse una generación explica algunos parecidos con tus abuelos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Cruzas dos plantas Aa. ¿Qué porcentaje de las plantas hijas esperas que sean aa?</p>', respuesta: 100 / 4,
        pista: '<p>Arma el cuadro de Punnett y cuenta las casillas aa.</p>',
        solucion: '<p>Solo 1 de las 4 casillas es aa: 1 ÷ 4 = <strong>25%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Del cruce de dos plantas Aa nacen 400 plantas. ¿Cuántas esperas que tengan flores moradas?</p>', respuesta: 400 * 3 / 4,
        pista: '<p>3 de cada 4 casillas tienen al menos una A.</p>',
        solucion: '<p>Tres cuartos de 400: 400 × 3 ÷ 4 = <strong>300 plantas moradas</strong>. Las otras 100, más o menos, serán blancas.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una planta de chícharo es Aa. ¿De qué color es su flor?</p>',
        opciones: ['Blanca', 'Morada', 'Mitad morada y mitad blanca'], correcta: 1,
        pista: '<p>El alelo A es dominante.</p>',
        solucion: '<p><strong>Morada</strong>. Con una sola copia del alelo dominante basta para que se note. No sale un color mezclado.</p>' },
      { tipo: 'numero', enunciado: '<p>Cruzas una planta AA con una aa. ¿Qué porcentaje de las hijas esperas que tenga flores blancas?</p>', respuesta: 0,
        pista: '<p>¿Qué alelo da siempre la planta AA?</p>',
        solucion: '<p>La AA siempre da A, así que todas las hijas son Aa y moradas: <strong>0%</strong> blancas. Es la primera ley de Mendel.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué significa que un alelo sea recesivo?</p>',
        opciones: ['Que solo se nota cuando hay dos copias', 'Que es menos sano', 'Que aparece en la mayoría de la población'], correcta: 0,
        pista: '<p>Piensa en la flor blanca: ¿cuántas a necesita?</p>',
        solucion: '<p><strong>Que solo se nota cuando hay dos copias</strong>. No tiene que ver con ser sano ni con ser común.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la segunda ley de Mendel, ¿cuántos alelos del color de la flor pasa cada planta a cada hija?</p>',
        opciones: ['Los dos', 'Ninguno', 'Uno, al azar'], correcta: 2,
        pista: '<p>El par se separa al formar los gametos.</p>',
        solucion: '<p><strong>Uno, al azar</strong>. Así, cada hija recibe un alelo de cada progenitor y vuelve a tener dos.</p>' },
    ],
    fuentes: [
      OCB('8-1-mendels-experiments', "Mendel's Experiments"),
      OCB('8-2-laws-of-inheritance', 'Laws of Inheritance'),
      OSB('12-1-mendels-experiments-and-the-laws-of-probability', "Mendel's Experiments and the Laws of Probability"),
      WIKI('Leyes_de_Mendel', 'Leyes de Mendel'),
      WIKI('Cuadro_de_Punnett', 'Cuadro de Punnett'),
    ],
  });

  // ------------------------------------------------------------------
  const MUTACION = diagrama([-0.6, 7.6], [-1.1, 2.1], [
    txt(1, 1.6, 'original'), ...letras(3, 1.6, 'ATGCTA'),
    txt(1, 0.4, 'con mutación'), caja(5.1, 0.05, 5.7, 0.75, true), ...letras(3, 0.4, 'ATGATA'),
    ...flecha([5.4, -0.55], [5.4, 0.05], 0, 0.8), txt(5.4, -0.8, 'una letra cambió'),
  ], 'Dos filas de letras de ADN. Arriba, la secuencia original: A T G C T A. Abajo, la secuencia con mutación: A T G A T A. La cuarta letra de abajo está en un recuadro sombreado, con una flecha y el texto: una letra cambió. Donde decía C, ahora dice A.');

  L('Mutaciones', {
    objetivo: 'Explicar qué es una mutación, qué la causa y por qué algunas son dañinas, otras neutras y otras útiles.',
    explicacion: `
      <p>Si copias a mano una receta larga, es probable que cometas algún error, como una letra cambiada. Casi siempre no importa, pero a veces arruina el pastel: "una pizca de sal" copiada como "una taza de sal".</p>
      <p>Cada vez que una célula se divide, tiene que copiar unos 6 000 millones de letras de ADN, porque guarda dos copias. Lo hace con muchísimo cuidado y hasta corrige sus errores, pero aun así se le escapa alrededor de una letra por cada mil millones. Un cambio en el orden de las letras del ADN se llama <strong>mutación</strong>.</p>
      ${MUTACION}
      <h3>¿Qué causa las mutaciones?</h3>
      <p>Algunas aparecen por errores al copiar, por puro azar. Otras las provocan agentes de fuera. Un <strong>mutágeno</strong> es cualquier cosa que daña el ADN y hace que aparezcan más mutaciones. Algunos ejemplos:</p>
      <ul>
        <li>La luz ultravioleta del Sol, que viste en Física, daña el ADN de las células de la piel. Por eso conviene usar protector solar y no quemarse.</li>
        <li>El humo del tabaco tiene sustancias que dañan el ADN de las células de los pulmones.</li>
        <li>La radiación de mucha energía, como los rayos X, también puede dañarlo. Por eso las radiografías se toman solo cuando hacen falta.</li>
      </ul>
      <p>Tus células tienen sistemas de reparación que corrigen casi todo el daño. Los problemas aparecen cuando el daño es mucho o se repite durante años.</p>
      <h3>Buenas, malas o neutras</h3>
      <p>La mayoría de las mutaciones son neutras: caen en un tramo de ADN que no es receta, o cambian una letra sin cambiar la proteína. Algunas son dañinas. En la anemia falciforme, por ejemplo, cambia una sola letra del gen de la hemoglobina, la proteína que lleva el oxígeno en la sangre: donde debía decir GAG dice GTG. Con ese cambio, los glóbulos rojos pueden tomar forma de hoz y atorarse en los vasos.</p>
      <p>Y unas pocas son útiles. Una mutación puede hacer que una bacteria resista un antibiótico, o que una persona adulta pueda digerir la leche. Gracias a las mutaciones existe la <strong>variación</strong>: las pequeñas diferencias heredables entre los individuos de una misma especie, que hacen que no haya dos iguales. En la próxima lección verás que es la materia prima de la evolución.</p>
      <h3>¿Se heredan?</h3>
      <p>Depende de dónde ocurran. Una mutación en una célula de la piel solo afecta a esa célula y a las que nazcan de ella, y no pasa a los hijos. Solo se heredan las mutaciones de los gametos, porque son las células que forman al nuevo ser.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que una mutación siempre es algo malo, como en las películas. La mayoría no tiene ningún efecto, y sin mutaciones no existiría la variedad de seres vivos. Si a alguien le preocupa una enfermedad hereditaria en su familia, el personal de salud puede orientarle sobre las pruebas genéticas.</p>`,
    ejemplo: `
      <p>Al copiar su ADN, una célula se equivoca más o menos en una letra de cada mil millones. ¿Cuántos errores esperas al copiar una de sus dos copias de ADN, de unos 3 000 millones de letras?</p>
      <ol class="pasos-ej">
        <li>Escribe los números en notación científica, como viste en Matemáticas: mil millones es 10⁹, y 3 000 millones es 3 × 10⁹.</li>
        <li>Calcula cuántos tramos de mil millones caben en el total: 3 × 10⁹ ÷ 10⁹ = 3.</li>
        <li>Como hay más o menos un error por tramo, esperas unos 3 errores.</li>
        <li>Comprueba sin notación científica: 3 000 000 000 ÷ 1 000 000 000 = 3.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 3 errores por copia</span>. Parece poco, pero tu cuerpo hace muchísimas divisiones a lo largo de la vida, y por eso aparecen mutaciones nuevas todo el tiempo.</p>
      <p class="nota"><strong>Error común:</strong> confundir mil millones (10⁹) con un millón (10⁶). Con un millón saldrían 3 000 errores, mil veces más.</p>`,
    vidaReal: `
      <p>Cuidar tus instrucciones heredadas también es cuidar tu salud:</p>
      <ul>
        <li>Usar protector solar y no quemarte protege del daño del Sol a las células de tu piel.</li>
        <li>No fumar evita que el humo dañe las células de tus pulmones.</li>
        <li>Los médicos piden radiografías solo cuando hacen falta.</li>
        <li>Los científicos siguen los cambios del virus de la gripe para preparar la vacuna de cada año.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>La secuencia original es ATGCTA y la mutada es ATGATA. ¿En qué posición está la letra que cambió, contando desde la izquierda?</p>', respuesta: 4,
        pista: '<p>Compara las dos secuencias letra por letra.</p>',
        solucion: '<p>Las tres primeras son iguales; la <strong>cuarta</strong> cambió de C a A.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas mutaciones puede pasar a los hijos?</p>',
        opciones: ['Una en una célula de la piel quemada por el sol', 'Una en un gameto', 'Una en una célula del pulmón'], correcta: 1,
        pista: '<p>Piensa en qué células forman al nuevo ser.</p>',
        solucion: '<p><strong>La del gameto</strong>. Las de la piel o el pulmón se quedan en tu cuerpo y no pasan a los hijos.</p>' },
      { tipo: 'numero', enunciado: '<p>Con un error por cada mil millones de letras, ¿cuántos errores esperas al copiar 6 000 millones de letras?</p>', respuesta: 6e9 / 1e9,
        pista: '<p>Divide 6 × 10⁹ entre 10⁹.</p>',
        solucion: '<p>6 × 10⁹ ÷ 10⁹ = <strong>6 errores</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos es un mutágeno?</p>',
        opciones: ['La luz ultravioleta del Sol', 'El agua potable', 'El sonido de la música'], correcta: 0,
        pista: '<p>Un mutágeno daña el ADN.</p>',
        solucion: '<p>La <strong>luz ultravioleta</strong>, que daña el ADN de la piel. Por eso conviene protegerte del sol.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama un cambio en el orden de las letras del ADN?</p>', respuestas: ['mutacion', 'una mutacion', 'la mutacion', 'mutaciones'],
        pista: '<p>Puede ser neutro, dañino o útil.</p>',
        solucion: '<p>Una <strong>mutación</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué pasa en el ADN de una persona con anemia falciforme?</p>',
        opciones: ['Le falta un cromosoma entero', 'Tiene una bacteria en la sangre', 'Cambió una sola letra del gen de la hemoglobina'], correcta: 2,
        pista: '<p>Revisa el ejemplo de GAG y GTG.</p>',
        solucion: '<p><strong>Cambió una sola letra</strong> del gen de la hemoglobina: donde debía decir GAG dice GTG. Es una enfermedad heredada, no una infección.</p>' },
    ],
    fuentes: [
      OSB('14-6-dna-repair', 'DNA Repair'),
      OCB('9-2-dna-replication', 'DNA Replication'),
      WIKI('Mutación', 'Mutación'),
      MEDLINE('geneticdisorders.html', 'Trastornos genéticos'),
      MEDLINE('genetictesting.html', 'Pruebas genéticas'),
    ],
  });

  // ------------------------------------------------------------------
  const POLILLAS = barras({ etiquetas: ['1848', '1895'], valores: [2, 98], max: 100, paso: 20,
    descripcion: 'Gráfica de barras con el porcentaje de polillas del abedul oscuras en Mánchester, Inglaterra. En 1848, 2%. En 1895, después de décadas de hollín de las fábricas, 98%.' });

  L('Evolución y selección natural', {
    objetivo: 'Explicar cómo cambian las poblaciones de seres vivos con el tiempo por selección natural, y qué pruebas lo respaldan.',
    explicacion: `
      <p>En la Unidad 1 viste que, cuando se usan antibióticos de más, aparecen bacterias resistentes. No es que cada bacteria "aprendiera" a resistir. Las pocas que ya resistían sobrevivieron y se multiplicaron, y con el tiempo casi todas son así. Eso es evolución, y está pasando ahora mismo.</p>
      <p>La <strong>evolución</strong> es el cambio de las características heredadas de una población a lo largo de muchas generaciones. Una población es el grupo de seres de una misma especie que viven en un lugar. Fíjate: evoluciona la población, no cada individuo.</p>
      <h3>La idea de Darwin</h3>
      <p>Charles Darwin viajó cinco años alrededor del mundo observando animales y plantas, y en 1859 publicó su explicación, a la que también había llegado Alfred Russel Wallace. Hoy se llama <strong>selección natural</strong>, y funciona cuando se cumplen tres condiciones:</p>
      <ol>
        <li>Hay variación: los individuos de una población no son iguales, gracias a las mutaciones que viste en la lección anterior.</li>
        <li>Esas diferencias se heredan de progenitores a hijos.</li>
        <li>Algunas diferencias ayudan a sobrevivir y a tener más crías en ese ambiente.</li>
      </ol>
      <p>Si se cumplen las tres, quienes tienen las características útiles dejan más descendientes, y en cada generación esas características se vuelven más comunes. Nadie las elige: la "selección" la hace el ambiente.</p>
      <h3>Las polillas de Inglaterra</h3>
      <p>Un ejemplo famoso es la polilla del abedul. La mayoría era clara, con manchitas, y se camuflaba sobre los troncos cubiertos de líquenes. Unas pocas eran oscuras por una mutación, y las aves las veían con facilidad. Cuando el hollín de las fábricas ennegreció los troncos, todo cambió: ahora las claras se notaban y las oscuras se escondían. En unas décadas, en las zonas industriales, casi todas eran oscuras. Cuando el aire se limpió, en el siglo XX, las claras volvieron a ser mayoría.</p>
      ${POLILLAS}
      <p>Una característica heredada que ayuda a sobrevivir y reproducirse en un ambiente se llama <strong>adaptación</strong>. El color oscuro era una adaptación en los troncos negros, pero no en los claros: una adaptación siempre depende del ambiente.</p>
      <h3>Las pruebas</h3>
      <ul>
        <li>Los fósiles muestran seres que ya no existen y cambios graduales a lo largo de millones de años.</li>
        <li>El brazo humano, la aleta de una ballena y el ala de un murciélago tienen los mismos huesos acomodados de otra forma, porque vienen de un ancestro común.</li>
        <li>El ADN de las especies emparentadas se parece mucho: el de los humanos y los chimpancés es casi 99% igual.</li>
        <li>Hoy mismo vemos evolucionar a las bacterias, a los virus y a los insectos que resisten los insecticidas.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> pensar que los seres vivos cambian porque lo necesitan, como si la jirafa estirara el cuello y sus crías nacieran con él más largo. Lo que se estira en vida no se hereda. Además, evolucionar no significa mejorar ni avanzar hacia una meta: solo significa que la población cambió y encaja con su ambiente de ese momento.</p>`,
    ejemplo: `
      <p>En una población hay 1 000 polillas: 900 claras y 100 oscuras. Sobre troncos negros, las aves se comen la mitad de las claras y solo el 10% de las oscuras. ¿Qué porcentaje de las sobrevivientes es oscuro?</p>
      <ol class="pasos-ej">
        <li>Calcula las claras que sobreviven: la mitad de 900 es 450.</li>
        <li>Calcula las oscuras que sobreviven. Si se comen el 10%, queda el 90%: 0.9 × 100 = 90.</li>
        <li>Suma las sobrevivientes: 450 + 90 = 540.</li>
        <li>Saca el porcentaje de oscuras sobre las sobrevivientes: 90 ÷ 540 ≈ 0.167, es decir, cerca del 16.7%.</li>
        <li>Compara con el principio: antes eran 100 de 1 000, el 10%. Subieron en una sola generación.</li>
      </ol>
      <p>Resultado: <span class="resultado">alrededor del 16.7% de las sobrevivientes son oscuras</span>. Si esto se repite generación tras generación, las oscuras se vuelven mayoría.</p>
      <p class="nota"><strong>Error común:</strong> dividir 90 entre 1 000. El porcentaje se calcula sobre las que sobrevivieron, 540, porque son las que tendrán crías.</p>`,
    vidaReal: `
      <p>Los seres vivos siguen cambiando, y eso tiene consecuencias prácticas:</p>
      <ul>
        <li>Tomar los antibióticos solo como indica el médico ayuda a que no aparezcan bacterias resistentes.</li>
        <li>Los agricultores alternan los insecticidas para que las plagas no se vuelvan resistentes.</li>
        <li>La vacuna de la gripe se actualiza cada año porque el virus cambia.</li>
        <li>Los perros, tan distintos entre sí, vienen de lobos que las personas fueron eligiendo durante miles de años.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En un cultivo hay 500 bacterias, y el 2% resiste un antibiótico. Si el antibiótico mata a todas las demás, ¿cuántas sobreviven?</p>', respuesta: 500 * 2 / 100,
        pista: '<p>Calcula el 2% de 500.</p>',
        solucion: '<p>500 × 0.02 = <strong>10 bacterias</strong>, todas resistentes.</p>' },
      { tipo: 'numero', enunciado: '<p>Esas 10 bacterias resistentes se dividen cada 20 minutos, como viste en la Unidad 1. ¿Cuántas habrá después de 2 horas?</p>', respuesta: 10 * 2 ** 6,
        pista: '<p>En 2 horas caben 6 divisiones de 20 minutos, y cada una duplica el número.</p>',
        solucion: '<p>Son 6 divisiones: 10 × 2⁶ = 10 × 64 = <strong>640 bacterias</strong>, y todas resisten el antibiótico.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es lo que evoluciona?</p>',
        opciones: ['Cada individuo durante su vida', 'La población a lo largo de generaciones', 'Solo los animales grandes'], correcta: 1,
        pista: '<p>Un individuo no cambia sus genes durante su vida.</p>',
        solucion: '<p><strong>La población</strong>, a lo largo de generaciones. Lo que cambia es qué tan comunes son ciertas características.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál explicación del cuello largo de las jirafas sigue la selección natural?</p>',
        opciones: ['Las jirafas estiraban el cuello y sus crías lo heredaban', 'Las jirafas quisieron tener el cuello largo', 'Las de cuello más largo comían mejor, tenían más crías y les pasaban ese rasgo'], correcta: 2,
        pista: '<p>Lo que se estira en vida no se hereda.</p>',
        solucion: '<p><strong>Las de cuello más largo tenían más crías y les pasaban el rasgo</strong>. Ni el esfuerzo ni el deseo cambian los genes.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuándo era el color oscuro una adaptación para la polilla del abedul?</p>',
        opciones: ['Cuando los troncos estaban negros de hollín', 'Siempre, en cualquier ambiente', 'Nunca, porque venía de una mutación'], correcta: 0,
        pista: '<p>Una adaptación depende del ambiente.</p>',
        solucion: '<p><strong>Cuando los troncos estaban negros</strong>, porque ahí las oscuras se escondían de las aves. Sobre troncos claros, el color oscuro era una desventaja.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el proceso, propuesto por Darwin, en el que quienes tienen características útiles dejan más descendientes?</p>',
        respuestas: ['seleccion natural', 'la seleccion natural'],
        pista: '<p>La "selección" la hace el ambiente.</p>',
        solucion: '<p>La <strong>selección natural</strong>.</p>' },
    ],
    fuentes: [
      OCB('11-1-discovering-how-populations-change', 'Discovering How Populations Change'),
      OCB('11-2-mechanisms-of-evolution', 'Mechanisms of Evolution'),
      OCB('11-3-evidence-of-evolution', 'Evidence of Evolution'),
      OSB('18-1-understanding-evolution', 'Understanding Evolution'),
      WIKI('Selección_natural', 'Selección natural'),
      WIKI('Biston_betularia', 'Biston betularia'),
      PHET('natural-selection', 'Selección natural'),
    ],
  });
})();
