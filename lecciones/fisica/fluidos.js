// Física · Unidad 5: Fluidos.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const F = window.fraccion;
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('fisica', titulo, datos);
  // Flecha de un vector: línea hasta la base de la punta + triángulo sólido como punta.
  const flecha = (desde, hasta, serie = 0) => {
    const dx = hasta[0] - desde[0], dy = hasta[1] - desde[1], largo = Math.hypot(dx, dy);
    const ux = dx / largo, uy = dy / largo, h = 0.35, w = 0.17;
    const base = [hasta[0] - h * ux, hasta[1] - h * uy];
    return [
      { tipo: 'linea', desde, hasta: base, serie },
      { tipo: 'poligono', puntos: [hasta, [base[0] - w * uy, base[1] + w * ux], [base[0] + w * uy, base[1] - w * ux]], solido: true, serie },
    ];
  };
  const txt = (x, y, texto) => ({ tipo: 'texto', x, y, texto });
  const raya = (...puntos) => ({ tipo: 'poligono', puntos, abierto: true });
  const caja = (x0, y0, x1, y1) => ({ tipo: 'poligono', puntos: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], relleno: true });
  const diagrama = (x, y, figuras, descripcion) => G({ x, y, figuras, descripcion, proporcional: true, ejes: false });

  const OSC = (pagina, nombre) => ({ nombre: `OpenStax, College Physics 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/college-physics-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = { nombre: 'Khan Academy en español: Fluidos', url: 'https://es.khanacademy.org/science/physics/fluids' };
  const PHET = (sim, nombre) => ({ nombre: `PhET, Universidad de Colorado: ${nombre}`, url: `https://phet.colorado.edu/es/simulations/${sim}` });

  // ------------------------------------------------------------------
  L('Densidad', {
    objetivo: 'Calcular la densidad de un material con ρ = m/V y usarla para predecir qué flota y qué se hunde.',
    explicacion: `
      <p>¿Qué pesa más, un kilo de algodón o un kilo de hierro? Ninguno: los dos tienen un kilo. Pero el kilo de algodón llena una bolsa enorme, y el de hierro cabe en tu mano. Lo que cambia es qué tan apretada está la materia en cada uno.</p>
      <h3>¿Qué tan apretada está la materia?</h3>
      <p>Para comparar materiales, se mide cuánta masa cabe en cada pedacito de espacio. Al espacio que ocupa algo se le llama volumen, y se mide en centímetros cúbicos (cm³) o metros cúbicos (m³). Un centímetro cúbico es un cubito de 1 cm por lado, más o menos el tamaño de un dado chico, y equivale a 1 mililitro.</p>
      <p>A la masa que hay en cada unidad de volumen se le llama <strong>densidad</strong>. Se calcula dividiendo la masa entre el volumen:</p>
      <p>ρ = ${F('m', 'V')}</p>
      <p>Se lee "la densidad es la masa entre el volumen". La letra griega ρ se lee "ro". m es <strong>cuánta masa tiene</strong> y V es <strong>cuánto espacio ocupa</strong>. Dividir reparte la masa entre los centímetros cúbicos, así que la densidad dice cuántos gramos hay en cada uno.</p>
      <p>Por ejemplo, un litro de agua, que son 1 000 cm³, tiene una masa de 1 000 g. Su densidad es 1 000 ÷ 1 000 = 1 g/cm³: cada centímetro cúbico de agua tiene 1 gramo. En el SI, eso es 1 000 kg/m³, porque un metro cúbico de agua tiene una tonelada.</p>
      <h3>Densidades de algunos materiales</h3>
      <div class="tabla-wrap"><table>
        <tr><th>Material</th><th>Densidad (g/cm³)</th></tr>
        <tr><th>Aire</th><td>0.0012</td></tr>
        <tr><th>Corcho</th><td>0.24</td></tr>
        <tr><th>Aceite de cocina</th><td>0.92</td></tr>
        <tr><th>Hielo</th><td>0.92</td></tr>
        <tr><th>Agua</th><td>1</td></tr>
        <tr><th>Aluminio</th><td>2.7</td></tr>
        <tr><th>Hierro</th><td>7.9</td></tr>
        <tr><th>Oro</th><td>19.3</td></tr>
      </table></div>
      <p>La densidad no depende del tamaño del objeto: una cuchara de aluminio y una olla de aluminio tienen la misma densidad, 2.7 g/cm³. Por eso sirve para reconocer de qué material está hecho algo.</p>
      <h3>¿Qué flota y qué se hunde?</h3>
      <p>Mira la tabla junto al agua. Lo que es menos denso que el agua flota en ella, como el corcho, el aceite o el hielo. Lo que es más denso se hunde, como el hierro. Por eso el aceite queda encima del agua en un frasco, y por eso los cubos de hielo flotan en tu vaso. En la lección de Arquímedes verás por qué pasa esto.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que lo pesado se hunde y lo ligero flota. Un tronco enorme pesa mucho y flota; un clavo pesa casi nada y se hunde. Lo que importa es la densidad, no el peso.</p>`,
    ejemplo: `
      <p>Te venden un anillo "de oro puro". Su masa es de 38.6 g. Al meterlo en un vaso medidor con agua, el nivel sube 2 mL. ¿Es de oro?</p>
      <ol class="pasos-ej">
        <li>Primero encuentra el volumen del anillo. Al hundirse, empuja hacia arriba tanta agua como espacio ocupa: 2 mL, que son 2 cm³.</li>
        <li>Calcula la densidad: ρ = 38.6 ÷ 2 = 19.3 g/cm³.</li>
        <li>Compara con la tabla: el oro tiene 19.3 g/cm³. Coincide.</li>
        <li>Comprueba al revés: 2 cm³ de oro deberían tener 2 × 19.3 = 38.6 g, justo la masa del anillo.</li>
      </ol>
      <p>Resultado: <span class="resultado">19.3 g/cm³, la densidad del oro</span>. Si fuera de latón, con 8.5 g/cm³, el mismo anillo de 38.6 g ocuparía más del doble de volumen.</p>
      <p class="nota"><strong>Error común:</strong> dividir el volumen entre la masa, 2 ÷ 38.6. La densidad es masa entre volumen: gramos en cada centímetro cúbico.</p>`,
    vidaReal: `
      <p>Saber qué tan apretada está la materia de algo te ayuda a entender lo que ves:</p>
      <ul>
        <li>En la cocina, el aceite queda arriba en un aderezo porque es más ligero que el vinagre a igual volumen.</li>
        <li>Los joyeros comprueban si una pieza es de oro midiendo su masa y su tamaño.</li>
        <li>Los chalecos salvavidas están hechos de materiales muy ligeros para mantenerte a flote.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una piedra tiene una masa de 600 g y un volumen de 200 cm³. ¿Cuál es su densidad, en g/cm³?</p>', respuesta: 600 / 200,
        pista: '<p>Divide la masa entre el volumen.</p>',
        solucion: '<p>ρ = 600 ÷ 200 = <strong>3 g/cm³</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la masa de 2 litros de agua, en kg? Recuerda que el agua tiene 1 g/cm³ y que 1 L = 1 000 cm³.</p>', respuesta: 2,
        pista: '<p>Pasa los litros a centímetros cúbicos y multiplica por la densidad.</p>',
        solucion: '<p>2 L son 2 000 cm³, y con 1 g en cada uno tienen 2 000 g, que son <strong>2 kg</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una pieza de aluminio, con densidad de 2.7 g/cm³, tiene una masa de 54 g. ¿Cuál es su volumen, en cm³?</p>', respuesta: 54 / 2.7,
        pista: '<p>¿Cuántas veces caben 2.7 g en 54 g? Cada vez es un centímetro cúbico.</p>',
        solucion: '<p>V = m ÷ ρ = 54 ÷ 2.7 = <strong>20 cm³</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un tapón de corcho tiene una densidad de 0.24 g/cm³. ¿Qué pasa si lo pones en agua?</p>',
        opciones: ['Se hunde', 'Flota', 'Se queda a media altura', 'Depende de su tamaño'], correcta: 1,
        pista: '<p>Compara su densidad con la del agua, 1 g/cm³.</p>',
        solucion: '<p>El corcho es menos denso que el agua (0.24 es menor que 1), así que <strong>flota</strong>, sin importar su tamaño.</p>' },
      { tipo: 'numero', enunciado: '<p>Un líquido tiene una densidad de 0.8 g/cm³. ¿Cuánto es en kg/m³?</p>', respuesta: 0.8 * 1000,
        pista: '<p>El agua tiene 1 g/cm³, que equivale a 1 000 kg/m³.</p>',
        solucion: '<p>1 g/cm³ equivale a 1 000 kg/m³, así que 0.8 g/cm³ son 0.8 × 1 000 = <strong>800 kg/m³</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Dos cubos tienen la misma masa, pero el cubo A es más grande que el B. ¿Cuál es más denso?</p>',
        opciones: ['El A', 'El B', 'Son igual de densos', 'No se puede saber'], correcta: 1,
        pista: '<p>La misma masa repartida en más volumen da menos gramos por centímetro cúbico.</p>',
        solucion: '<p>El B tiene la misma masa en menos espacio, así que su materia está más apretada: <strong>el B es más denso</strong>.</p>' },
    ],
    fuentes: [OSC('11-2-density', 'Density'), PHET('density', 'Densidad'), WIKI('Densidad', 'Densidad')],
  });

  // ------------------------------------------------------------------
  L('Presión', {
    objetivo: 'Calcular la presión como fuerza entre área y entender por qué aumenta con la profundidad en un líquido.',
    explicacion: `
      <p>Si aprietas una chinche entre los dedos, la punta se te encaja en un dedo, pero la cabeza plana casi no la sientes en el otro. Los dos dedos reciben la misma fuerza. La diferencia está en el área sobre la que se reparte esa fuerza.</p>
      <h3>¿Qué es la presión?</h3>
      <p>A la fuerza repartida en cada unidad de área se le llama <strong>presión</strong>. Se calcula dividiendo la fuerza entre el área donde se apoya:</p>
      <p>P = ${F('F', 'A')}</p>
      <p>Se lee "la presión es la fuerza entre el área". F es <strong>con cuánta fuerza se empuja</strong>, en newtons, y A es <strong>sobre cuánta superficie</strong>, en metros cuadrados. Si la misma fuerza se reparte en un área pequeña, cada pedacito recibe mucho; si se reparte en un área grande, cada pedacito recibe poco.</p>
      <p>Su unidad es el N/m², que se llama <strong>pascal</strong> (Pa), en honor al científico francés Blaise Pascal. Un pascal es una presión muy pequeña: más o menos la de una hoja de papel acostada sobre la mesa.</p>
      <h3>Más área, menos presión</h3>
      <p>Por eso un cuchillo afilado corta mejor: su filo es tan delgado que la fuerza de tu mano se concentra en un área diminuta. Por eso los tractores tienen llantas anchas para no hundirse en el lodo, y por eso es más fácil caminar sobre la nieve con raquetas que con zapatos.</p>
      <h3>¿Por qué duelen los oídos al bucear?</h3>
      <p>Cuando bajas en una alberca, el agua que tienes encima pesa sobre ti. Mientras más hondo estás, más agua hay arriba, y más presión sientes. La presión que hace un líquido por su profundidad es:</p>
      <p>P = ρ·g·h</p>
      <p>Se lee "la presión es la densidad del líquido por g por la profundidad". Sale de pensar en una columna de agua de altura h sobre un cuadrito de área A: su masa es ρ·A·h, su peso es ρ·A·h·g, y al dividir ese peso entre el área A queda ρ·g·h. Fíjate que el área se cancela: la presión solo depende de qué tan hondo estás, no de qué tan ancho es el recipiente.</p>
      <p>En agua, a 10 m de profundidad, la presión del agua es 1 000 × 9.8 × 10 = 98 000 Pa.</p>
      <h3>El aire también empuja</h3>
      <p>Nosotros vivimos en el fondo de un "océano" de aire de muchos kilómetros de alto. Ese aire hace una presión sobre todo lo que toca, llamada presión atmosférica, de unos 101 000 Pa al nivel del mar. No la sentimos porque nuestro cuerpo empuja hacia afuera con la misma presión. Fíjate que 10 m de agua hacen casi lo mismo que toda la atmósfera.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que más fuerza siempre significa más presión. Una persona de pie sobre unos esquís aprieta la nieve con la misma fuerza que con zapatos, pero con mucho menos presión.</p>`,
    ejemplo: `
      <p>Una persona que pesa 600 N camina sobre la nieve. Con zapatos se apoya en 0.05 m²; con raquetas para nieve, en 0.25 m². ¿Qué presión hace en cada caso?</p>
      <ol class="pasos-ej">
        <li>Primero fíjate qué no cambia: la fuerza es el peso de la persona, 600 N, en los dos casos.</li>
        <li>Con zapatos, reparte esa fuerza en 0.05 m²: P = 600 ÷ 0.05 = 12 000 Pa.</li>
        <li>Con raquetas, en 0.25 m²: P = 600 ÷ 0.25 = 2 400 Pa.</li>
        <li>Comprueba la relación: el área de las raquetas es 5 veces mayor (0.25 ÷ 0.05 = 5), así que la presión es 5 veces menor: 12 000 ÷ 5 = 2 400.</li>
      </ol>
      <p>Resultado: <span class="resultado">12 000 Pa con zapatos y 2 400 Pa con raquetas</span>. Por eso con raquetas no te hundes.</p>
      <p class="nota"><strong>Error común:</strong> usar el área en centímetros cuadrados. Para obtener pascales, la fuerza va en newtons y el área en metros cuadrados.</p>`,
    vidaReal: `
      <p>Repartir o concentrar una fuerza es algo que aprovechas sin darte cuenta:</p>
      <ul>
        <li>Afilar un cuchillo o unas tijeras hace que corten con menos esfuerzo.</li>
        <li>Los camiones pesados tienen muchas llantas para no dañar el pavimento.</li>
        <li>Al bucear, sientes los oídos apretados porque el agua empuja más mientras más bajas.</li>
        <li>Las presas son más gruesas abajo que arriba, porque ahí el agua empuja más fuerte.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una caja de 200 N está apoyada sobre una base de 0.5 m². ¿Qué presión hace sobre el piso, en Pa?</p>', respuesta: 200 / 0.5,
        pista: '<p>Divide la fuerza entre el área.</p>',
        solucion: '<p>P = 200 ÷ 0.5 = <strong>400 Pa</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una persona de 600 N está de pie y sus dos zapatos juntos se apoyan en 0.04 m². ¿Qué presión hace sobre el piso, en Pa?</p>', respuesta: 600 / 0.04,
        pista: '<p>Usa P = F ÷ A con el área de los dos zapatos.</p>',
        solucion: '<p>P = 600 ÷ 0.04 = <strong>15 000 Pa</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Qué presión hace el agua a 5 m de profundidad, en Pa? Usa ρ = 1 000 kg/m³ y g = 9.8 m/s². No cuentes la presión del aire.</p>', respuesta: 1000 * 9.8 * 5,
        pista: '<p>Usa P = ρ·g·h.</p>',
        solucion: '<p>P = 1 000 × 9.8 × 5 = <strong>49 000 Pa</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué un cuchillo afilado corta mejor que uno sin filo?</p>',
        opciones: ['Porque pesa más', 'Porque su filo tiene menos área, y la misma fuerza hace más presión', 'Porque está más frío', 'Porque tiene más área'], correcta: 1,
        pista: '<p>En P = F ÷ A, ¿qué pasa si A se hace muy pequeña?</p>',
        solucion: '<p>El filo es muy delgado: su <strong>área es diminuta</strong>, así que la fuerza de tu mano produce una presión enorme.</p>' },
      { tipo: 'numero', enunciado: '<p>Sobre una superficie de 3 m² actúa una presión de 2 000 Pa. ¿Cuál es la fuerza total, en N?</p>', respuesta: 2000 * 3,
        pista: '<p>Cada metro cuadrado recibe 2 000 N. ¿Cuántos metros cuadrados hay?</p>',
        solucion: '<p>F = P × A = 2 000 × 3 = <strong>6 000 N</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué las paredes de una presa son más gruesas abajo que arriba?</p>',
        opciones: ['Porque abajo el agua está más fría', 'Porque la presión del agua aumenta con la profundidad', 'Porque arriba hay más agua', 'Por estética'], correcta: 1,
        pista: '<p>Piensa en P = ρ·g·h. ¿Dónde es mayor h?</p>',
        solucion: '<p>Abajo hay más agua encima: <strong>la presión aumenta con la profundidad</strong>, así que la pared debe aguantar más.</p>' },
    ],
    fuentes: [OSC('11-3-pressure', 'Pressure'), OSC('11-4-variation-of-pressure-with-depth-in-a-fluid', 'Variation of Pressure with Depth in a Fluid'), PHET('under-pressure', 'Bajo presión'), WIKI('Presión', 'Presión')],
  });

  // ------------------------------------------------------------------
  const PRENSA = diagrama([-1.5, 8.5], [-1.4, 7], [
    raya([0, 4.6], [0, 0], [7, 0], [7, 4.6]), raya([1, 4.6], [1, 1], [3, 1], [3, 4.6]),
    caja(0, 3, 1, 3.4), caja(3, 3, 7, 3.4),
    ...flecha([0.5, 5.8], [0.5, 3.45]), txt(0.5, 6.3, '200 N'),
    ...flecha([5, 3.45], [5, 5.8]), txt(5, 6.3, '10 000 N'),
    txt(0.5, -0.6, 'pistón chico: 10 cm²'), txt(5, -0.6, 'pistón grande: 500 cm²'),
    txt(4, 0.5, 'líquido'),
  ], 'Una prensa hidráulica: un tubo angosto a la izquierda y uno ancho a la derecha, unidos por abajo y llenos de líquido. Sobre el pistón chico, de 10 cm², una flecha de 200 N empuja hacia abajo. El pistón grande, de 500 cm², empuja hacia arriba con una flecha de 10 000 N. El dibujo es un esquema: no está a escala.');

  L('Principio de Pascal', {
    objetivo: 'Entender cómo un líquido encerrado transmite la presión y calcular la fuerza que produce una prensa hidráulica.',
    explicacion: `
      <p>Aprieta un tubo de pasta de dientes en la parte de abajo. La pasta sale por la boca, del otro lado. Si le haces un agujerito a un globo con agua y lo aprietas, el agua sale por todos los agujeros, no solo cerca de tu mano. Lo que empujas en un punto se siente en todo el líquido.</p>
      <h3>¿Qué dice el principio de Pascal?</h3>
      <p>Cuando un líquido está encerrado y le aplicas presión en un punto, esa presión aumenta lo mismo en todos los puntos del líquido y en todas las paredes del recipiente. A esto se le llama <strong>principio de Pascal</strong>, por Blaise Pascal, el mismo de la unidad de presión.</p>
      <p>Funciona porque los líquidos casi no se pueden apretar. Si empujas el agua en un lado, no puede comprimirse para ocupar menos espacio, así que empuja hacia todos lados a la vez.</p>
      <h3>¿Cómo se multiplica una fuerza?</h3>
      <p>Imagina dos tubos unidos por abajo y llenos de aceite, cada uno con un tapón que se desliza, llamado pistón. Uno es angosto y el otro ancho. Esto se llama <strong>prensa hidráulica</strong>.</p>
      ${PRENSA}
      <p>Si empujas el pistón chico, creas una presión P = F ÷ A en el aceite. Por el principio de Pascal, esa misma presión llega al pistón grande. Pero ahí actúa sobre un área mucho mayor, y como F = P × A, la fuerza también es mucho mayor:</p>
      <p>${F('F₁', 'A₁')} = ${F('F₂', 'A₂')}</p>
      <p>Se lee "la fuerza entre el área en el pistón chico es igual a la fuerza entre el área en el pistón grande". Las dos fracciones son la misma presión. En el dibujo, el pistón grande tiene 50 veces el área del chico (500 ÷ 10 = 50), así que la fuerza sale 50 veces mayor: 200 N se convierten en 10 000 N.</p>
      <h3>¿Dónde está el truco?</h3>
      <p>Como en las máquinas simples de la Unidad 4, nadie regala trabajo. El aceite que empujas en el tubo chico se reparte en el tubo grande, cuya sección tiene 50 veces más área, así que ahí sube 50 veces menos. Para subir un coche 1 cm, tienes que bajar el pistón chico 50 cm. El trabajo es el mismo en los dos lados: menos fuerza a cambio de más distancia.</p>
      <h3>Pascal en la vida diaria</h3>
      <p>Los gatos hidráulicos de los talleres levantan coches con la fuerza de un brazo. Los frenos de los coches también funcionan así: al pisar el pedal empujas un líquido, y esa presión llega a las cuatro ruedas por igual, donde unos pistones más grandes aprietan los frenos con mucha más fuerza. Las excavadoras y las sillas de los dentistas usan el mismo principio.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que la prensa hidráulica crea energía o trabajo. Multiplica la fuerza, pero el pistón grande se mueve mucho menos que el chico. El trabajo de entrada y el de salida son iguales, o el de salida un poco menor por la fricción.</p>`,
    ejemplo: `
      <p>Un gato hidráulico tiene un pistón chico de 10 cm² y uno grande de 500 cm². ¿Con cuánta fuerza hay que empujar para levantar un coche de 10 000 N? ¿Cuánto baja el pistón chico para subir el coche 1 cm?</p>
      <ol class="pasos-ej">
        <li>Primero compara las áreas, porque dicen cuántas veces se multiplica la fuerza: 500 ÷ 10 = 50.</li>
        <li>La fuerza en el pistón chico es 50 veces menor que la del coche: 10 000 ÷ 50 = 200 N.</li>
        <li>Ahora la distancia: lo que se gana en fuerza se paga en camino. El pistón chico baja 50 veces más: 1 × 50 = 50 cm.</li>
        <li>Comprueba con el trabajo: tú haces 200 N × 0.5 m = 100 J, y el coche recibe 10 000 N × 0.01 m = 100 J. Son iguales.</li>
      </ol>
      <p>Resultado: <span class="resultado">200 N, bajando el pistón chico 50 cm</span>.</p>
      <p class="nota"><strong>Error común:</strong> invertir la proporción y pensar que hay que empujar 50 veces más fuerte. El pistón chico es el que necesita menos fuerza.</p>`,
    vidaReal: `
      <p>Empujar un líquido encerrado para lograr fuerzas enormes es muy común:</p>
      <ul>
        <li>En los talleres, un mecánico levanta un coche con un gato y la fuerza de un brazo.</li>
        <li>Al pisar el freno, tu pie logra detener un coche de más de una tonelada.</li>
        <li>Las excavadoras y los camiones de basura usan líquidos a presión para mover sus brazos.</li>
        <li>La silla del dentista sube y baja con un mecanismo parecido.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En un líquido encerrado, aumentas la presión en 2 000 Pa en un punto. ¿Cuánto aumenta la presión en otro punto del mismo líquido, en Pa?</p>', respuesta: 2000,
        pista: '<p>El principio de Pascal dice que el aumento se transmite igual a todo el líquido.</p>',
        solucion: '<p>Por el principio de Pascal, la presión aumenta lo mismo en todo el líquido: <strong>2 000 Pa</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una prensa tiene un pistón chico de 2 cm² y uno grande de 40 cm². Si empujas el chico con 50 N, ¿con cuánta fuerza empuja el grande, en N?</p>', respuesta: 50 * 40 / 2,
        pista: '<p>¿Cuántas veces es más grande el área del pistón grande?</p>',
        solucion: '<p>El área grande es 40 ÷ 2 = 20 veces mayor, así que la fuerza es 50 × 20 = <strong>1 000 N</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En una prensa, el pistón grande tiene 100 veces el área del chico. ¿Con cuánta fuerza hay que empujar el chico para levantar 20 000 N, en N?</p>', respuesta: 20000 / 100,
        pista: '<p>La fuerza en el pistón chico es tantas veces menor como su área.</p>',
        solucion: '<p>F₁ = 20 000 ÷ 100 = <strong>200 N</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En una prensa, el pistón grande tiene 30 veces el área del chico. Si bajas el pistón chico 30 cm, ¿cuántos centímetros sube el grande?</p>', respuesta: 30 / 30,
        pista: '<p>El líquido que empujas se reparte en un tubo 30 veces más ancho.</p>',
        solucion: '<p>El pistón grande se mueve 30 veces menos: 30 ÷ 30 = <strong>1 cm</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué al pisar el pedal del freno se frenan las cuatro ruedas?</p>',
        opciones: ['Porque cada rueda tiene su propio pedal', 'Porque la presión del líquido de frenos se transmite igual a todas las ruedas', 'Porque el motor se apaga', 'Porque el aire empuja las ruedas'], correcta: 1,
        pista: '<p>Los frenos usan un líquido encerrado en tubos que llegan a cada rueda.</p>',
        solucion: '<p>Por el principio de Pascal, <strong>la presión que haces en el pedal llega igual a todas las ruedas</strong> a través del líquido de frenos.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una prensa hidráulica multiplica tu fuerza por 50. ¿Qué pasa con el trabajo?</p>',
        opciones: ['También se multiplica por 50', 'Es el mismo, porque el pistón grande se mueve 50 veces menos', 'Se divide entre 50', 'Desaparece'], correcta: 1,
        pista: '<p>Recuerda lo que pasa con las máquinas simples.</p>',
        solucion: '<p>El trabajo <strong>es el mismo</strong>: ganas 50 veces la fuerza, pero el pistón grande recorre 50 veces menos distancia.</p>' },
    ],
    fuentes: [OSC('11-5-pascals-principle', "Pascal's Principle"), WIKI('Principio_de_Pascal', 'Principio de Pascal'), KHAN],
  });

  // ------------------------------------------------------------------
  const FLOTA = diagrama([-3, 3], [-3.2, 3], [
    { tipo: 'linea', desde: [-3, 0], hasta: [-1, 0] }, { tipo: 'linea', desde: [1, 0], hasta: [3, 0] }, txt(-2.2, 0.3, 'agua'),
    caja(-1, -1, 1, 0.6), txt(0, -0.35, 'bloque'),
    ...flecha([0, 0.6], [0, 2.4]), txt(0.9, 2, 'empuje'),
    ...flecha([0, -1], [0, -2.8]), txt(0.8, -2.5, 'peso'),
  ], 'Un bloque flotando con una parte bajo la línea del agua y otra encima. Una flecha de empuje apunta hacia arriba y una flecha de peso apunta hacia abajo; las dos miden lo mismo, porque el bloque flota en equilibrio.');

  L('Principio de Arquímedes: por qué flotan los barcos', {
    objetivo: 'Calcular la fuerza con la que un líquido empuja hacia arriba a un objeto y predecir si flota o se hunde.',
    explicacion: `
      <p>En una alberca puedes cargar a un amigo con un solo brazo, cosa imposible fuera del agua. Y si intentas hundir una pelota inflable, el agua la empuja de vuelta hacia arriba con fuerza. El agua empuja hacia arriba a todo lo que se mete en ella.</p>
      <h3>¿De dónde sale ese empuje?</h3>
      <p>En la lección de presión viste que el agua empuja más mientras más hondo. Un objeto sumergido tiene la parte de abajo más honda que la de arriba, así que el agua lo empuja más fuerte desde abajo que desde arriba. La diferencia es una fuerza hacia arriba llamada <strong>empuje</strong>.</p>
      <h3>¿Cuánto empuja el agua?</h3>
      <p>Hace más de 2 000 años, el griego Arquímedes encontró la respuesta. Cuando metes algo en el agua, el objeto aparta un poco de agua para hacerse lugar. Al agua apartada se le llama agua desalojada. El <strong>principio de Arquímedes</strong> dice que:</p>
      <p>El empuje es igual al peso del líquido desalojado.</p>
      <p>Tiene sentido: antes de meter el objeto, ese mismo lugar lo ocupaba agua, y el agua de alrededor la sostenía sin que subiera ni bajara. Es decir, la empujaba hacia arriba justo con su peso. Al poner el objeto en su lugar, el agua de alrededor lo empuja exactamente igual.</p>
      <p>Como el peso del agua desalojada es su masa por g, y su masa es su densidad por su volumen:</p>
      <p>E = ρ·g·V</p>
      <p>Se lee "el empuje es la densidad del líquido por g por el volumen sumergido". Aquí ρ es <strong>la densidad del líquido</strong>, no la del objeto, y V es <strong>cuánto volumen del objeto está bajo el líquido</strong>.</p>
      <h3>¿Flota o se hunde?</h3>
      <p>Sobre un objeto en el agua actúan dos fuerzas: su peso hacia abajo y el empuje hacia arriba. Si se sumerge por completo y el empuje sigue siendo menor que su peso, se hunde. Si el empuje alcanza a igualar el peso antes de que se sumerja por completo, flota, con una parte afuera.</p>
      ${FLOTA}
      <p>Por eso un objeto flota cuando su densidad es menor que la del líquido. Y la parte que queda sumergida es la proporción entre las dos densidades. La razón es que, al flotar, el empuje iguala al peso: ρ del líquido · g · V sumergido = ρ del objeto · g · V total, y al cancelar g queda que V sumergido ÷ V total = ρ del objeto ÷ ρ del líquido. Por ejemplo, el hielo, con 0.92 g/cm³, flota con el 92% bajo el agua. Por eso de un iceberg solo se ve la punta.</p>
      <h3>¿Y los barcos de acero?</h3>
      <p>El acero es casi 8 veces más denso que el agua, y aun así los barcos flotan. El truco es la forma: un barco es un casco hueco lleno de aire. Lo que cuenta es su densidad promedio, contando el acero y todo el aire de adentro, y esa es menor que la del agua. Una bola de acero maciza se hunde; el mismo acero en forma de barco desaloja muchísima agua y flota.</p>
      <p class="nota"><strong>Trampa común:</strong> usar la densidad del objeto para calcular el empuje. El empuje depende de la densidad del líquido y del volumen sumergido, no de qué está hecho el objeto.</p>`,
    ejemplo: `
      <p>Una piedra de 2 kg tiene un volumen de 0.0008 m³ (800 cm³). ¿Cuánto empuje recibe dentro del agua, y cuánto parece pesar ahí? Usa g = 9.8 m/s².</p>
      <ol class="pasos-ej">
        <li>Primero calcula el empuje con la densidad del agua, 1 000 kg/m³, porque es el agua la que empuja: E = 1 000 × 9.8 × 0.0008 = 7.84 N.</li>
        <li>Calcula el peso de la piedra: P = 2 × 9.8 = 19.6 N.</li>
        <li>Compara: el empuje (7.84 N) es menor que el peso (19.6 N), así que la piedra se hunde.</li>
        <li>Dentro del agua, la fuerza que sientes al sostenerla es el peso menos el empuje: 19.6 − 7.84 = 11.76 N. Por eso las cosas se sienten más ligeras en el agua.</li>
      </ol>
      <p>Resultado: <span class="resultado">empuje de 7.84 N; dentro del agua parece pesar 11.76 N</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar la masa de la piedra para calcular el empuje. El empuje es el peso del agua desalojada, no el de la piedra.</p>`,
    vidaReal: `
      <p>Que el agua empuje hacia arriba lo que se mete en ella explica muchas cosas que ves en el mar y en la alberca:</p>
      <ul>
        <li>Los barcos de acero enormes flotan porque son huecos y apartan muchísima agua.</li>
        <li>En el mar flotas más fácil que en un río, porque el agua salada es más densa.</li>
        <li>Los submarinos se hunden o suben llenando o vaciando tanques con agua.</li>
        <li>Los globos de aire caliente suben porque el aire también empuja hacia arriba.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un objeto de 0.002 m³ está completamente sumergido en agua. ¿Qué empuje recibe, en N? Usa ρ = 1 000 kg/m³ y g = 9.8 m/s².</p>', respuesta: 1000 * 9.8 * 0.002,
        pista: '<p>Usa E = ρ·g·V con la densidad del agua.</p>',
        solucion: '<p>E = 1 000 × 9.8 × 0.002 = <strong>19.6 N</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una piedra pesa 30 N fuera del agua y recibe un empuje de 10 N dentro de ella. ¿Cuánto parece pesar dentro del agua, en N?</p>', respuesta: 30 - 10,
        pista: '<p>El empuje va hacia arriba, en contra del peso.</p>',
        solucion: '<p>Peso aparente = 30 − 10 = <strong>20 N</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un trozo de madera tiene una densidad de 0.6 g/cm³ y flota en agua. ¿Qué porcentaje de su volumen queda bajo el agua?</p>', respuesta: 0.6 / 1 * 100,
        pista: '<p>La parte sumergida es la densidad del objeto entre la del agua.</p>',
        solucion: '<p>0.6 ÷ 1 = 0.6, es decir, el <strong>60%</strong> queda bajo el agua.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué flota un barco de acero, si el acero es más denso que el agua?</p>',
        opciones: ['Porque el acero de los barcos es especial y ligero', 'Porque es hueco: contando el aire, su densidad promedio es menor que la del agua', 'Porque el motor lo mantiene arriba', 'Porque el agua de mar no tiene peso'], correcta: 1,
        pista: '<p>Piensa en qué hay dentro del casco.</p>',
        solucion: '<p>El barco es <strong>hueco y lleno de aire</strong>: su densidad promedio es menor que la del agua, y desaloja suficiente agua para igualar su peso.</p>' },
      { tipo: 'numero', enunciado: '<p>Una lancha de 500 kg flota en agua dulce. ¿Cuántos metros cúbicos de agua desaloja? Recuerda que 1 m³ de agua tiene 1 000 kg.</p>', respuesta: 500 / 1000,
        pista: '<p>Si flota, el agua desalojada pesa lo mismo que la lancha.</p>',
        solucion: '<p>Desaloja 500 kg de agua, que ocupan 500 ÷ 1 000 = <strong>0.5 m³</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué es más fácil flotar en el mar que en un lago de agua dulce?</p>',
        opciones: ['Porque las olas te empujan', 'Porque el agua salada es más densa y empuja más', 'Porque el agua de mar es más caliente', 'Porque en el mar pesas menos'], correcta: 1,
        pista: '<p>En E = ρ·g·V, ¿qué cambia entre agua dulce y salada?</p>',
        solucion: '<p>El agua salada tiene <strong>más densidad</strong>, así que el mismo volumen sumergido produce más empuje.</p>' },
    ],
    fuentes: [OSC('11-7-archimedes-principle', "Archimedes' Principle"), PHET('buoyancy', 'Flotabilidad'), WIKI('Principio_de_Arquímedes', 'Principio de Arquímedes')],
  });

  // ------------------------------------------------------------------
  L('Fluidos en movimiento: principio de Bernoulli', {
    objetivo: 'Calcular cómo cambia la rapidez de un fluido cuando el tubo se angosta y explicar por qué baja la presión donde el fluido va más rápido.',
    explicacion: `
      <p>Cuando riegas con una manguera y tapas la mitad de la boca con el dedo, el agua sale disparada mucho más lejos. No abriste más la llave: sale la misma agua, pero más rápido. ¿Por qué?</p>
      <h3>¿Cuánta agua pasa cada segundo?</h3>
      <p>Un <strong>fluido</strong> es todo lo que fluye, como un líquido o un gas. A la cantidad de fluido que pasa por un tubo en cada segundo se le llama <strong>caudal</strong>. Se mide, por ejemplo, en litros por segundo o en m³/s. Si el agua avanza con rapidez v por un tubo de área A, en cada segundo pasa un "cilindro" de agua de base A y largo v. Por eso:</p>
      <p>Q = A·v</p>
      <p>Se lee "el caudal es el área del tubo por la rapidez del agua". Q es <strong>cuánta agua pasa cada segundo</strong>, A es <strong>qué tan ancho es el tubo</strong> por dentro, y v es <strong>qué tan rápido va el agua</strong>.</p>
      <h3>¿Por qué el agua acelera en lo angosto?</h3>
      <p>El agua casi no se puede apretar, así que toda la que entra a un tubo tiene que salir por el otro lado: el caudal es el mismo en todas partes. Si el tubo se angosta, la misma agua tiene que pasar por un hueco más chico, y la única forma es ir más rápido:</p>
      <p>A₁·v₁ = A₂·v₂</p>
      <p>Se lee "área por rapidez en una parte del tubo es igual a área por rapidez en la otra". Si el área se reduce a la mitad, la rapidez se duplica. Es lo mismo que pasa en un río: en las partes anchas el agua va despacio, y en los estrechos corre rápido. También pasa con la gente que sale de un estadio: al llegar a una puerta angosta, tiene que avanzar más rápido para que no se acumule.</p>
      <h3>Más rápido, menos presión</h3>
      <p>Para que el agua acelere al entrar a la parte angosta, algo tiene que empujarla hacia adelante. Ese empuje viene de que la presión atrás, en la parte ancha, es mayor que adelante, en la parte angosta. Así que donde el fluido va más rápido, su presión es menor. A esto se le llama <strong>principio de Bernoulli</strong>, por el científico suizo Daniel Bernoulli. Es otra forma de la conservación de la energía de la Unidad 4: el fluido gana energía de movimiento a costa de su presión.</p>
      <p>Haz la prueba: sostén una hoja de papel por un extremo, debajo de tu boca, y sopla por encima. La hoja sube. El aire que soplas va rápido y tiene menos presión que el aire quieto de abajo, que la empuja hacia arriba.</p>
      <p>Las alas de un avión también tienen que ver con esto, pero la historia completa tiene dos partes. El ala está inclinada y curva, así que empuja el aire hacia abajo, y por la tercera ley de Newton el aire empuja el ala hacia arriba. Al mismo tiempo, el aire pasa más rápido por arriba del ala y con menos presión que por abajo. Son dos maneras de describir la misma fuerza, no dos fuerzas distintas. No es cierto que el aire de arriba vaya más rápido porque tenga que alcanzar al de abajo.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que un fluido rápido empuja más fuerte hacia los lados. Es al revés: donde el fluido va más rápido, la presión es menor. Por eso un viento fuerte sobre un techo puede levantarlo hacia arriba.</p>`,
    ejemplo: `
      <p>El agua sale por una manguera de 2 cm² de área a 1 m/s. Si tapas la boca con el dedo y dejas un hueco de 0.5 cm², ¿a qué rapidez sale el agua?</p>
      <ol class="pasos-ej">
        <li>Primero piensa qué no cambia: la llave sigue igual de abierta, así que el caudal es el mismo.</li>
        <li>Compara las áreas: 2 ÷ 0.5 = 4. El hueco es 4 veces más chico que la boca de la manguera.</li>
        <li>Como el área es 4 veces menor, la rapidez es 4 veces mayor: 1 × 4 = 4 m/s.</li>
        <li>Comprueba con A₁·v₁ = A₂·v₂: 2 × 1 = 2, y 0.5 × 4 = 2. Coinciden.</li>
      </ol>
      <p>Resultado: <span class="resultado">4 m/s</span>, por eso el chorro llega mucho más lejos.</p>
      <p class="nota"><strong>Error común:</strong> pensar que tapar la manguera hace salir más agua. Sale la misma agua por segundo, pero más rápido.</p>`,
    vidaReal: `
      <p>Los fluidos que se mueven están presentes en muchas situaciones diarias:</p>
      <ul>
        <li>Al tapar la boca de una manguera con el dedo, logras que el agua llegue más lejos.</li>
        <li>Un viento fuerte puede levantar techos ligeros, porque el aire rápido de arriba empuja menos que el aire quieto de abajo.</li>
        <li>Las regaderas y los atomizadores aprovechan huecos pequeños para lanzar el agua con fuerza.</li>
        <li>Cuando pasa un tren rápido cerca de ti en el andén, sientes que te jala hacia él.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Por un tubo de 0.01 m² de área, el agua avanza a 2 m/s. ¿Cuál es el caudal, en m³/s?</p>', respuesta: 0.01 * 2,
        pista: '<p>Usa Q = A·v.</p>',
        solucion: '<p>Q = 0.01 × 2 = <strong>0.02 m³/s</strong>, que son 20 litros cada segundo.</p>' },
      { tipo: 'numero', enunciado: '<p>Un tubo pasa de 6 cm² a 2 cm² de área. En la parte ancha el agua va a 2 m/s. ¿A qué rapidez va en la parte angosta, en m/s?</p>', respuesta: 6 * 2 / 2,
        pista: '<p>El área se reduce a la tercera parte. ¿Qué pasa con la rapidez?</p>',
        solucion: '<p>A₁·v₁ = 6 × 2 = 12, y 2 × v₂ = 12, así que v₂ = <strong>6 m/s</strong>: el triple, porque el área es la tercera parte.</p>' },
      { tipo: 'numero', enunciado: '<p>Una llave da un caudal de 0.5 litros por segundo. ¿Cuántos segundos tarda en llenar una cubeta de 20 litros?</p>', respuesta: 20 / 0.5,
        pista: '<p>¿Cuántas veces caben 0.5 litros en 20 litros?</p>',
        solucion: '<p>20 ÷ 0.5 = <strong>40 s</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un río tiene una sección de 10 m² donde el agua va a 1 m/s. Más adelante se estrecha a una sección de 4 m². ¿A qué rapidez va ahí, en m/s?</p>', respuesta: 10 * 1 / 4,
        pista: '<p>El caudal es el mismo en las dos partes del río.</p>',
        solucion: '<p>Q = 10 × 1 = 10 m³/s, y en la parte estrecha v = 10 ÷ 4 = <strong>2.5 m/s</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Cuelgas dos hojas de papel paralelas, a unos centímetros una de otra, y soplas entre ellas. ¿Qué pasa?</p>',
        opciones: ['Se separan', 'Se juntan', 'No se mueven', 'Una sube y la otra baja'], correcta: 1,
        pista: '<p>Entre las hojas el aire va rápido. ¿Qué pasa con su presión?</p>',
        solucion: '<p>El aire rápido entre las hojas tiene menos presión que el aire quieto de afuera, que las empuja hacia el centro: <strong>se juntan</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un tubo tiene una parte ancha y una angosta. ¿Dónde es menor la presión del agua que corre por él?</p>',
        opciones: ['En la parte ancha', 'En la parte angosta', 'Es igual en las dos', 'Depende del color del tubo'], correcta: 1,
        pista: '<p>Primero piensa dónde va más rápido el agua.</p>',
        solucion: '<p>En la <strong>parte angosta</strong> el agua va más rápido, y por el principio de Bernoulli ahí su presión es menor.</p>' },
    ],
    fuentes: [OSC('12-1-flow-rate-and-its-relation-to-velocity', 'Flow Rate and Its Relation to Velocity'), OSC('12-2-bernoullis-equation', "Bernoulli's Equation"), PHET('fluid-pressure-and-flow', 'Presión del fluido y flujo'), WIKI('Principio_de_Bernoulli', 'Principio de Bernoulli')],
  });
})();
