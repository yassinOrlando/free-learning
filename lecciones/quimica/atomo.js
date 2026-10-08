// Química · Unidad 2: El átomo.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const F = window.fraccion;
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('quimica', titulo, datos);
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
  const caja = (x0, y0, x1, y1) => ({ tipo: 'poligono', puntos: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], relleno: true });
  const diagrama = (x, y, figuras, descripcion) => G({ x, y, figuras, descripcion, proporcional: true, ejes: false });
  const bolita = ([x, y]) => ({ tipo: 'circulo', x, y, r: 0.27, relleno: true });
  const punto = (x, y, r = 0.12) => ({ tipo: 'circulo', x, y, r, solido: true });
  const orbita = (x, y, r) => ({ tipo: 'circulo', x, y, r });
  // Partícula del núcleo con su letra: p (protón) o n (neutrón), para no depender del color.
  const nucleon = (x, y, letra) => [bolita([x, y]), txt(x, y - 0.02, letra)];

  const OSC = (pagina, nombre) => ({ nombre: `OpenStax, Chemistry 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/chemistry-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = { nombre: 'Khan Academy en español: Estructura atómica', url: 'https://es.khanacademy.org/science/chemistry/atomic-structure-and-properties' };
  const PHET = (sim, nombre) => ({ nombre: `PhET, Universidad de Colorado: ${nombre}`, url: `https://phet.colorado.edu/es/simulations/${sim}` });

  // ------------------------------------------------------------------
  const MODELOS = diagrama([-0.2, 10.4], [-0.9, 2.7], [
    { tipo: 'circulo', x: 1.2, y: 1.5, r: 1, relleno: true },
    { tipo: 'circulo', x: 3.8, y: 1.5, r: 1, relleno: true },
    txt(3.4, 1.95, '−'), txt(4.2, 1.85, '−'), txt(3.8, 1.45, '−'), txt(3.3, 1.05, '−'), txt(4.25, 1.05, '−'),
    punto(6.4, 1.5, 0.1), punto(5.75, 1.95), punto(7.1, 1.75), punto(6.55, 0.7),
    punto(9, 1.5, 0.1), orbita(9, 1.5, 0.5), orbita(9, 1.5, 0.95), punto(9.5, 1.5), punto(8.5, 1.5), punto(9, 2.45),
    txt(1.2, -0.05, 'Dalton'), txt(3.8, -0.05, 'Thomson'), txt(6.4, -0.05, 'Rutherford'), txt(9, -0.05, 'Bohr'),
    txt(1.2, -0.6, '1808'), txt(3.8, -0.6, '1904'), txt(6.4, -0.6, '1911'), txt(9, -0.6, '1913'),
  ], 'Cuatro modelos del átomo en fila, de izquierda a derecha. Dalton, 1808: una esfera maciza. Thomson, 1904: una esfera con carga positiva y cinco signos menos repartidos por dentro, que son los electrones. Rutherford, 1911: un punto diminuto en el centro, el núcleo, y tres electrones sueltos lejos de él, con mucho espacio vacío. Bohr, 1913: un núcleo en el centro con dos órbitas circulares alrededor; dos electrones en la órbita de adentro y uno en la de afuera.');

  L('Modelos atómicos a través de la historia', {
    objetivo: 'Conocer cómo cambió la idea del átomo, de Dalton al modelo actual, y qué experimento llevó a cada cambio.',
    explicacion: `
      <p>Imagina que te regalan una caja cerrada que no puedes abrir. La agitas y suena algo suelto. La inclinas y sientes que algo pesado rueda. Sin verlo, ya puedes dibujar lo que crees que hay adentro. Así estudiaron los científicos el átomo, que es demasiado pequeño para verlo.</p>
      <h3>La idea de lo que no se corta</h3>
      <p>Hace unos 2 400 años, el griego Demócrito se preguntó qué pasaría si partieras una piedra a la mitad, y luego otra vez, y otra. Pensó que al final llegarías a un pedacito que ya no se puede partir. Lo llamó átomo, que en griego quiere decir "sin cortar". Hoy se le llama <strong>átomo</strong> a la partícula más pequeña de un elemento que todavía es ese elemento, como viste en la unidad anterior.</p>
      <p>Como nadie podía ver un átomo, los científicos fueron proponiendo dibujos de cómo podría ser. A cada uno de esos dibujos, que explica lo que se sabe hasta ese momento, se le llama <strong>modelo atómico</strong>. Un modelo se cambia cuando un experimento muestra algo que no puede explicar.</p>
      ${MODELOS}
      <h3>Dalton: bolitas macizas</h3>
      <p>En 1808, John Dalton propuso que cada elemento está hecho de átomos iguales entre sí, como bolitas macizas, y que los compuestos se forman al unirse átomos de distintos elementos. Con esto explicó por qué el agua siempre tiene la misma proporción de hidrógeno y oxígeno.</p>
      <h3>Thomson: un pan con pasas</h3>
      <p>En 1897, J. J. Thomson descubrió que de los átomos podían salir partículas con carga negativa, mucho más ligeras que ellos: los electrones. Entonces el átomo no era macizo; tenía partes. En 1904, Thomson propuso un modelo: una esfera con carga positiva y los electrones incrustados, como las pasas en un pan.</p>
      <h3>Rutherford: casi todo es vacío</h3>
      <p>En 1911, Ernest Rutherford y su equipo lanzaron partículas alfa, las de la radiactividad que viste en física, contra una hoja de oro finísima. Casi todas la atravesaron sin desviarse. Pero de cada 8 000, más o menos una rebotaba hacia atrás, como si hubiera chocado contra algo pequeño y muy pesado. Con el pan con pasas eso era imposible.</p>
      <p>Rutherford concluyó que casi toda la masa y toda la carga positiva están en un centro diminuto, el <strong>núcleo</strong>, y que los electrones se mueven lejos de él. Casi todo el átomo es espacio vacío: el átomo es unas 100 000 veces más ancho que su núcleo.</p>
      <h3>Bohr y el modelo actual</h3>
      <p>En 1913, Niels Bohr propuso que los electrones solo pueden girar en ciertas órbitas fijas, como los carriles de una pista de atletismo. Así explicó los colores muy precisos de la luz que emite el hidrógeno.</p>
      <p>Hoy se sabe que no se puede decir exactamente por dónde va un electrón. El modelo actual habla de una "nube": zonas alrededor del núcleo donde es más probable encontrarlo. Pero la idea de Bohr, de que los electrones se acomodan en niveles, sigue siendo muy útil, y la usarás en esta unidad.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que los modelos viejos eran "errores". Cada uno explicaba bien lo que se sabía en su época, y cada experimento nuevo lo mejoró. Así avanza la ciencia.</p>`,
    ejemplo: `
      <p>Si el átomo fuera como el pan con pasas de Thomson, ¿qué debió ver Rutherford? ¿Y por qué lo que vio cambió el modelo?</p>
      <ol class="pasos-ej">
        <li>En el pan con pasas, la carga y la masa están repartidas por toda la esfera, sin ningún punto duro. Las partículas alfa son pesadas y rápidas, así que deberían atravesar todo, apenas desviándose un poco.</li>
        <li>Lo que vio: casi todas pasaron derecho. Hasta ahí, coincide.</li>
        <li>Pero algunas rebotaron hacia atrás. Para regresar una partícula tan pesada hace falta algo pequeño, muy pesado y con carga positiva que la empuje.</li>
        <li>Conclusión: la masa está concentrada en un núcleo diminuto. Como casi todas pasan, el resto del átomo es casi vacío.</li>
        <li>Comprueba con una comparación: lanza canicas a una cancha con un solo poste en medio. Casi todas pasan; muy pocas pegan en el poste y rebotan.</li>
      </ol>
      <p>Resultado: <span class="resultado">un núcleo pequeño y pesado, rodeado de espacio vacío</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que Rutherford vio el núcleo. Nadie lo vio: lo dedujo de cómo rebotaban las partículas.</p>`,
    vidaReal: `
      <p>Averiguar cómo es algo que no puedes ver es una habilidad que usas más de lo que crees:</p>
      <ul>
        <li>Adivinas qué regalo hay en una caja agitándola y sintiendo cuánto pesa.</li>
        <li>Un médico mira dentro de tu cuerpo con un ultrasonido, sin abrirlo.</li>
        <li>Un mecánico sabe qué falla en un motor por el ruido que hace.</li>
        <li>Te ayuda a entender por qué la ciencia cambia sus explicaciones cuando aparecen datos nuevos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿En qué orden aparecieron estos modelos atómicos, del más antiguo al más reciente?</p>',
        opciones: ['Thomson, Dalton, Bohr, Rutherford', 'Dalton, Thomson, Rutherford, Bohr', 'Dalton, Rutherford, Thomson, Bohr', 'Rutherford, Thomson, Dalton, Bohr'], correcta: 1,
        pista: '<p>Primero el átomo fue una bolita maciza; después se descubrió el electrón; luego el núcleo; al final, las órbitas.</p>',
        solucion: '<p><strong>Dalton (1808), Thomson (1904), Rutherford (1911), Bohr (1913).</strong> Cada modelo corrigió al anterior con un experimento nuevo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué experimento mostró que el átomo tiene un núcleo?</p>',
        opciones: ['Lanzar partículas alfa contra una hoja de oro', 'Medir la proporción de hidrógeno y oxígeno en el agua', 'Ver los colores de la luz que emite cada elemento'], correcta: 0,
        pista: '<p>Fue el experimento en el que algunas partículas rebotaron hacia atrás.</p>',
        solucion: '<p>El de <strong>la hoja de oro</strong>, del equipo de Rutherford. Que unas pocas partículas rebotaran mostró que había un centro pequeño y pesado.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué partícula con carga negativa descubrió Thomson en 1897?</p>', respuestas: ['electrón', 'el electrón', 'electrones', 'los electrones'],
        pista: '<p>Son las "pasas" de su modelo.</p>',
        solucion: '<p>El <strong>electrón</strong>. Al descubrirlo, quedó claro que el átomo tenía partes y no era macizo.</p>' },
      { tipo: 'numero', enunciado: '<p>El átomo es unas 100 000 veces más ancho que su núcleo. Si el núcleo midiera 1 cm, como una canica chica, ¿cuántos metros mediría el átomo?</p>',
        respuesta: 1 * 100000 / 100,
        pista: '<p>Multiplica 1 cm por 100 000 y pasa el resultado a metros: 100 cm son 1 m.</p>',
        solucion: '<p>1 cm × 100 000 = 100 000 cm, que son 100 000 ÷ 100 = <strong>1 000 m</strong>, un kilómetro. La canica quedaría sola en medio de un espacio enorme.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué casi todas las partículas alfa atravesaron la hoja de oro sin desviarse?</p>',
        opciones: ['Porque el átomo es casi todo espacio vacío', 'Porque los átomos de oro son macizos', 'Porque las partículas alfa no tienen masa'], correcta: 0,
        pista: '<p>Recuerda la cancha con un solo poste en medio.</p>',
        solucion: '<p>Porque <strong>el átomo es casi todo espacio vacío</strong>: el núcleo es tan pequeño que muy pocas partículas pegan en él.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué modelo propuso que los electrones giran en órbitas fijas alrededor del núcleo, como carriles?</p>',
        opciones: ['El de Dalton', 'El de Thomson', 'El de Bohr'], correcta: 2,
        pista: '<p>Es el más reciente de los cuatro del dibujo.</p>',
        solucion: '<p>El de <strong>Bohr</strong>, de 1913. Con él explicó los colores de la luz que emite el hidrógeno.</p>' },
    ],
    fuentes: [
      OSC('2-1-early-ideas-in-atomic-theory', 'Early Ideas in Atomic Theory'),
      OSC('2-2-evolution-of-atomic-theory', 'Evolution of Atomic Theory'),
      WIKI('Modelo_atómico', 'Modelo atómico'),
      WIKI('Modelo_atómico_de_Rutherford', 'Modelo atómico de Rutherford'),
      PHET('rutherford-scattering', 'Dispersión de Rutherford'),
    ],
  });

  // ------------------------------------------------------------------
  const LITIO = diagrama([-3, 7], [-2.9, 2.9], [
    orbita(0, 0, 1.3), orbita(0, 0, 2.3),
    ...nucleon(-0.27, 0.25, 'p'), ...nucleon(0.27, 0.25, 'n'), ...nucleon(0.54, -0.2, 'p'),
    ...nucleon(0, -0.2, 'n'), ...nucleon(-0.54, -0.2, 'n'), ...nucleon(-0.27, -0.65, 'p'), ...nucleon(0.27, -0.65, 'n'),
    punto(0, 1.3, 0.14), punto(0, -1.3, 0.14), punto(1.15, 1.95, 0.14),
    { tipo: 'linea', desde: [1.35, 1.95], hasta: [3.4, 1.95] }, txt(4.6, 1.95, 'electrón'),
    { tipo: 'linea', desde: [0.85, 0], hasta: [3.4, 0] }, txt(5, 0, 'núcleo: 3 p y 4 n'),
    txt(5, -1.2, 'p = protón'), txt(5, -1.8, 'n = neutrón'),
  ], 'Un átomo de litio. En el centro, el núcleo: siete bolitas juntas, tres marcadas con p de protón y cuatro con n de neutrón. Alrededor hay dos órbitas circulares: la de adentro tiene dos electrones y la de afuera tiene uno. Un rótulo señala un electrón y otro señala el núcleo, con 3 protones y 4 neutrones.');

  L('Protones, neutrones y electrones', {
    objetivo: 'Conocer la carga y la masa de las partículas del átomo, y calcular la carga de un ion a partir de sus protones y electrones.',
    explicacion: `
      <p>Cuando frotas un globo contra tu pelo, algunos electrones pasan del pelo al globo, como viste en la lección de carga eléctrica de física. Eso quiere decir que los átomos pueden perder o ganar electrones. Para entender qué les pasa, hay que conocer las piezas de las que están hechos.</p>
      <h3>Las tres piezas del átomo</h3>
      <p>Los átomos están formados por partículas todavía más pequeñas. Como están dentro del átomo, se llaman <strong>partículas subatómicas</strong> ("sub" quiere decir debajo). Son tres:</p>
      <ul>
        <li>Los protones están en el núcleo y tienen carga positiva.</li>
        <li>Los neutrones también están en el núcleo y no tienen carga: son neutros, de ahí su nombre.</li>
        <li>Los electrones se mueven alrededor del núcleo y tienen carga negativa.</li>
      </ul>
      ${LITIO}
      <h3>¿Cuánto pesan?</h3>
      <p>Las partículas son tan ligeras que pesarlas en gramos daría números con más de veinte ceros después del punto. Por eso se usa una unidad especial, la <strong>unidad de masa atómica</strong>, que se escribe u. Está pensada para que un protón tenga casi exactamente 1 u.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Partícula</th><th>Dónde está</th><th>Carga</th><th>Masa</th></tr>
        <tr><th>Protón</th><td>Núcleo</td><td>+1</td><td>1 u</td></tr>
        <tr><th>Neutrón</th><td>Núcleo</td><td>0</td><td>1 u</td></tr>
        <tr><th>Electrón</th><td>Alrededor del núcleo</td><td>−1</td><td>Unas 1 836 veces menos que un protón</td></tr>
      </table></div>
      <p>Fíjate en la última fila. Hacen falta unos 1 836 electrones para igualar la masa de un solo protón. Por eso casi toda la masa del átomo está en el núcleo, y para calcularla basta con contar protones y neutrones.</p>
      <h3>Átomos neutros e iones</h3>
      <p>Un protón y un electrón tienen la misma cantidad de carga, pero de signo contrario, así que se cancelan. Un átomo con tantos electrones como protones tiene carga total cero: es neutro. El litio del dibujo tiene 3 protones y 3 electrones, así que es neutro.</p>
      <p>Pero un átomo puede ganar o perder electrones. Los protones no se mueven, porque están bien sujetos en el núcleo. Cuando cambia el número de electrones, el átomo queda con carga, y se le llama <strong>ion</strong>. Su carga se calcula así:</p>
      <p>carga = protones − electrones</p>
      <p>Se lee "la carga es el número de protones menos el número de electrones". Hay dos tipos de iones:</p>
      <ul>
        <li>Un catión tiene carga positiva, porque perdió electrones. El sodio tiene 11 protones; si pierde un electrón, le quedan 10, y su carga es 11 − 10 = +1. Se escribe Na⁺.</li>
        <li>Un anión tiene carga negativa, porque ganó electrones. El cloro tiene 17 protones; si gana uno, tiene 18 electrones, y su carga es 17 − 18 = −1. Se escribe Cl⁻.</li>
      </ul>
      <p>El numerito de arriba dice cuánta carga tiene: Mg²⁺ perdió dos electrones y O²⁻ ganó dos.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que al perder electrones el átomo queda negativo. Es al revés: los electrones son lo negativo, así que si se van, sobra carga positiva.</p>`,
    ejemplo: `
      <p>El aluminio, el metal del papel aluminio de tu cocina, tiene 13 protones y puede formar el ion Al³⁺. ¿Cuántos electrones tiene ese ion?</p>
      <ol class="pasos-ej">
        <li>Primero lee la carga: el 3⁺ dice que el ion tiene carga +3, es decir, tres cargas positivas de más.</li>
        <li>Piensa qué la causó. Los protones no cambian, porque están bien sujetos en el núcleo; si cambiaran, el átomo dejaría de ser aluminio. Así que siguen siendo 13, y la carga positiva aparece porque se fueron electrones: tres.</li>
        <li>El aluminio neutro tiene 13 electrones, uno por cada protón. Si pierde 3, le quedan 13 − 3 = 10.</li>
        <li>Comprueba con la fórmula: carga = protones − electrones = 13 − 10 = +3. Coincide con Al³⁺.</li>
      </ol>
      <p>Resultado: <span class="resultado">10 electrones</span>.</p>
      <p class="nota"><strong>Error común:</strong> sumar la carga, 13 + 3 = 16. Una carga positiva significa que faltan electrones, así que se resta.</p>`,
    vidaReal: `
      <p>Que las partículas de la materia puedan tener carga explica cosas de todos los días:</p>
      <ul>
        <li>Las bebidas para deportistas reponen el sodio y el potasio que pierdes al sudar, que en tu cuerpo andan con carga eléctrica.</li>
        <li>Las pilas de tu control remoto funcionan moviendo partículas con carga de un lado a otro.</li>
        <li>Los toques que sientes al tocar una perilla en un día seco son electrones que saltan.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un ion tiene 11 protones y 10 electrones. ¿Cuál es su carga?</p>', respuesta: 11 - 10,
        pista: '<p>Carga = protones − electrones.</p>',
        solucion: '<p>11 − 10 = <strong>+1</strong>. Es un catión: perdió un electrón. Es el ion Na⁺.</p>' },
      { tipo: 'numero', enunciado: '<p>El oxígeno tiene 8 protones. ¿Cuántos electrones tiene el ion O²⁻?</p>', respuesta: 8 + 2,
        pista: '<p>La carga 2⁻ dice que ganó electrones. ¿Cuántos?</p>',
        solucion: '<p>Neutro tendría 8 electrones; ganó 2, así que tiene 8 + 2 = <strong>10</strong>. Comprueba: 8 − 10 = −2.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué partícula del átomo no tiene carga eléctrica?</p>',
        opciones: ['El protón', 'El neutrón', 'El electrón'], correcta: 1,
        pista: '<p>Su nombre lo dice.</p>',
        solucion: '<p>El <strong>neutrón</strong> es neutro: no tiene carga. El protón es positivo y el electrón, negativo.</p>' },
      { tipo: 'numero', enunciado: '<p>El magnesio tiene 12 protones. ¿Cuántos electrones tiene el ion Mg²⁺?</p>', respuesta: 12 - 2,
        pista: '<p>Una carga positiva quiere decir que se fueron electrones.</p>',
        solucion: '<p>Perdió 2 electrones: 12 − 2 = <strong>10</strong>. Comprueba: 12 − 10 = +2.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un átomo de azufre gana dos electrones y queda como S²⁻. ¿Qué es?</p>',
        opciones: ['Un catión', 'Un anión', 'Un átomo neutro'], correcta: 1,
        pista: '<p>Si gana electrones, ¿su carga queda positiva o negativa?</p>',
        solucion: '<p>Es un <strong>anión</strong>: ganó electrones, que son negativos, así que su carga es negativa.</p>' },
      { tipo: 'numero', enunciado: '<p>Según la tabla, ¿cuántos electrones hacen falta, más o menos, para igualar la masa de un protón?</p>', respuesta: 1836, tolerancia: 1,
        pista: '<p>Busca la masa del electrón en la tabla.</p>',
        solucion: '<p>Unos <strong>1 836</strong>. Por eso los electrones casi no cuentan en la masa del átomo.</p>' },
    ],
    fuentes: [
      OSC('2-3-atomic-structure-and-symbolism', 'Atomic Structure and Symbolism'),
      WIKI('Partícula_subatómica', 'Partícula subatómica'),
      WIKI('Ion', 'Ion'),
      PHET('build-an-atom', 'Construye un átomo'),
    ],
  });

  // ------------------------------------------------------------------
  const CASILLA = diagrama([-0.4, 7.8], [-0.3, 3.9], [
    caja(0, 0, 3, 3.6),
    txt(1.5, 3.1, '6'), txt(1.5, 2.2, 'C'), txt(1.5, 1.3, 'Carbono'), txt(1.5, 0.45, '12.011'),
    { tipo: 'linea', desde: [3.1, 3.1], hasta: [4, 3.1] }, txt(5.7, 3.1, 'número atómico'),
    { tipo: 'linea', desde: [3.1, 2.2], hasta: [4, 2.2] }, txt(5.2, 2.2, 'símbolo'),
    { tipo: 'linea', desde: [3.1, 1.3], hasta: [4, 1.3] }, txt(5.1, 1.3, 'nombre'),
    { tipo: 'linea', desde: [3.1, 0.45], hasta: [4, 0.45] }, txt(5.5, 0.45, 'masa atómica'),
  ], 'La casilla del carbono en una tabla periódica. De arriba abajo dice: 6, rotulado "número atómico"; C, rotulado "símbolo"; Carbono, rotulado "nombre"; y 12.011, rotulado "masa atómica".');

  L('Número atómico y masa atómica', {
    objetivo: 'Leer el número atómico y la masa atómica de un elemento, y calcular cuántos protones, neutrones y electrones tiene un átomo.',
    explicacion: `
      <p>En cualquier tabla periódica, la casilla del carbono trae dos números: un 6 arriba y un 12.011 abajo. No son decoración. Con ellos puedes saber cuántas partículas tiene cada átomo de carbono.</p>
      ${CASILLA}
      <h3>El número que da identidad</h3>
      <p>Lo que hace que un átomo sea carbono, y no oxígeno ni oro, es su número de protones. Todo átomo con 6 protones es carbono; si tuviera 7, sería nitrógeno. Al número de protones se le llama <strong>número atómico</strong>, y se escribe con la letra Z. Es como el número de cédula de cada elemento: no hay dos elementos con el mismo.</p>
      <p>Si el átomo es neutro, tiene tantos electrones como protones. Por eso el número atómico también te dice cuántos electrones tiene un átomo neutro. El carbono, con Z = 6, tiene 6 protones y 6 electrones.</p>
      <h3>Contar lo que pesa</h3>
      <p>En la lección anterior viste que casi toda la masa del átomo está en el núcleo, y que protones y neutrones pesan 1 u cada uno. Por eso, para saber cuánto pesa un átomo, basta con sumarlos. Al total de protones y neutrones se le llama <strong>número másico</strong>, y se escribe con la letra A.</p>
      <p>Si conoces A y Z, sacas los neutrones con una resta:</p>
      <p>neutrones = A − Z</p>
      <p>Se lee "los neutrones son el número másico menos el número atómico". Funciona porque A cuenta protones y neutrones juntos; si le quitas los protones, quedan los neutrones.</p>
      <p>Para decir el número másico, se escribe el nombre del elemento con un guion y A: un átomo de carbono con 6 protones y 6 neutrones es el carbono-12. También se escribe ¹²C, con el número másico arriba a la izquierda del símbolo.</p>
      <h3>El número con decimales</h3>
      <p>El 12.011 de la casilla se llama <strong>masa atómica</strong>: es lo que pesa, en promedio, un átomo de ese elemento, en unidades de masa atómica. Tiene decimales porque no todos los átomos de carbono pesan igual; en la siguiente lección verás por qué. Por ahora, fíjate que, en el carbono, al redondearlo obtienes el número másico del átomo más común: 12.011 se redondea a 12.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Elemento</th><th>Símbolo</th><th>Número atómico (Z)</th><th>Masa atómica (u)</th></tr>
        <tr><th>Hidrógeno</th><td>H</td><td>1</td><td>1.008</td></tr>
        <tr><th>Carbono</th><td>C</td><td>6</td><td>12.011</td></tr>
        <tr><th>Nitrógeno</th><td>N</td><td>7</td><td>14.007</td></tr>
        <tr><th>Oxígeno</th><td>O</td><td>8</td><td>15.999</td></tr>
        <tr><th>Sodio</th><td>Na</td><td>11</td><td>22.990</td></tr>
        <tr><th>Cloro</th><td>Cl</td><td>17</td><td>35.45</td></tr>
        <tr><th>Hierro</th><td>Fe</td><td>26</td><td>55.845</td></tr>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> confundir el número másico con la masa atómica. El número másico es un número entero, porque cuenta partículas de un átomo concreto. La masa atómica es un promedio de muchos átomos y por eso lleva decimales.</p>`,
    ejemplo: `
      <p>¿Cuántos protones, neutrones y electrones tiene un átomo neutro de cloro-37?</p>
      <ol class="pasos-ej">
        <li>Busca el número atómico del cloro en la tabla: Z = 17. Entonces tiene 17 protones, porque Z cuenta los protones.</li>
        <li>El nombre "cloro-37" te da el número másico: A = 37, la suma de protones y neutrones.</li>
        <li>Resta para sacar los neutrones: 37 − 17 = 20.</li>
        <li>Como el átomo es neutro, tiene tantos electrones como protones, para que sus cargas se cancelen: 17.</li>
        <li>Comprueba: 17 protones + 20 neutrones = 37, justo el número másico.</li>
      </ol>
      <p>Resultado: <span class="resultado">17 protones, 20 neutrones y 17 electrones</span>. Si fuera cloro-35, solo cambiarían los neutrones: 35 − 17 = 18.</p>
      <p class="nota"><strong>Error común:</strong> usar la masa atómica de la tabla, 35.45, como si fuera A. Para un átomo concreto, usa el número que viene en su nombre.</p>`,
    vidaReal: `
      <p>Saber leer los números de cada elemento te sirve fuera del salón:</p>
      <ul>
        <li>Puedes leer cualquier tabla periódica, la herramienta más usada de la química.</li>
        <li>Las etiquetas de comida dicen cuánto sodio tiene un producto; ahora sabes qué es ese sodio.</li>
        <li>Los químicos calculan cuánto pesa una cucharada de sal o de azúcar a partir de lo que pesa cada partícula.</li>
        <li>Entiendes por qué el oro y el plomo son elementos distintos, aunque los dos sean metales pesados.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>El sodio tiene Z = 11. ¿Cuántos neutrones tiene un átomo de sodio-23?</p>', respuesta: 23 - 11,
        pista: '<p>Neutrones = A − Z.</p>',
        solucion: '<p>23 − 11 = <strong>12 neutrones</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un átomo tiene 17 protones y 18 neutrones. ¿Cuál es su número másico?</p>', respuesta: 17 + 18,
        pista: '<p>El número másico suma protones y neutrones.</p>',
        solucion: '<p>A = 17 + 18 = <strong>35</strong>. Como tiene 17 protones, es cloro-35.</p>' },
      { tipo: 'numero', enunciado: '<p>Según la tabla, ¿cuántos electrones tiene un átomo neutro de hierro?</p>', respuesta: 26,
        pista: '<p>En un átomo neutro, los electrones son tantos como los protones.</p>',
        solucion: '<p>El hierro tiene Z = 26: 26 protones y, como es neutro, <strong>26 electrones</strong>.</p>' },
      { tipo: 'texto', enunciado: '<p>Según la tabla, ¿qué elemento tiene número atómico 8?</p>', respuestas: ['oxígeno', 'el oxígeno', 'O'],
        pista: '<p>Busca el 8 en la columna del número atómico.</p>',
        solucion: '<p>El <strong>oxígeno</strong>. Todo átomo con 8 protones es oxígeno.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué decide de qué elemento es un átomo?</p>',
        opciones: ['Su número de neutrones', 'Su número de protones', 'Su número de electrones', 'Su masa'], correcta: 1,
        pista: '<p>Es lo que cuenta el número atómico.</p>',
        solucion: '<p><strong>Su número de protones.</strong> Los neutrones y los electrones pueden cambiar sin que cambie el elemento.</p>' },
      { tipo: 'numero', enunciado: '<p>El magnesio tiene Z = 12. ¿Cuántos protones tiene el ion Mg²⁺?</p>', respuesta: 12,
        pista: '<p>Al formar un ion, ¿cambian los protones o los electrones?</p>',
        solucion: '<p><strong>12 protones</strong>. El ion perdió electrones, pero los protones no cambian: si cambiaran, ya no sería magnesio.</p>' },
    ],
    fuentes: [
      OSC('2-3-atomic-structure-and-symbolism', 'Atomic Structure and Symbolism'),
      WIKI('Número_atómico', 'Número atómico'),
      WIKI('Número_másico', 'Número másico'),
      WIKI('Masa_atómica', 'Masa atómica'),
      KHAN,
    ],
  });

  // ------------------------------------------------------------------
  const HIDROGENOS = diagrama([-0.2, 10.2], [-0.8, 2.4], [
    ...nucleon(1.5, 1.5, 'p'),
    ...nucleon(4.73, 1.5, 'p'), ...nucleon(5.27, 1.5, 'n'),
    ...nucleon(8.5, 1.75, 'p'), ...nucleon(8.23, 1.28, 'n'), ...nucleon(8.77, 1.28, 'n'),
    txt(1.5, 0.4, 'hidrógeno-1'), txt(5, 0.4, 'hidrógeno-2'), txt(8.5, 0.4, 'hidrógeno-3'),
    txt(1.5, -0.2, '1 p y 0 n'), txt(5, -0.2, '1 p y 1 n'), txt(8.5, -0.2, '1 p y 2 n'),
  ], 'Los núcleos de los tres isótopos del hidrógeno, lado a lado. Hidrógeno-1: una sola bolita marcada p, un protón y ningún neutrón. Hidrógeno-2: una bolita p y una bolita n, un protón y un neutrón. Hidrógeno-3: una bolita p y dos bolitas n, un protón y dos neutrones.');

  L('Isótopos', {
    objetivo: 'Reconocer los isótopos de un elemento y calcular la masa atómica promedio a partir de sus abundancias.',
    explicacion: `
      <p>Imagina dos gemelos idénticos, con la misma cara y la misma voz. Uno lleva una mochila con libros y el otro no. Siguen siendo las mismas personas, pero en la báscula no pesan igual. Con los átomos de un mismo elemento pasa algo parecido.</p>
      <h3>Mismo elemento, distinto peso</h3>
      <p>Ya sabes que el número de protones decide el elemento. Pero el número de neutrones puede cambiar. A los átomos de un mismo elemento con distinto número de neutrones se les llama <strong>isótopos</strong>. "Iso" quiere decir igual y "topo", lugar: ocupan el mismo lugar en la tabla periódica.</p>
      <p>El hidrógeno es el ejemplo más sencillo. Casi todo el hidrógeno tiene un protón y ningún neutrón. Pero existe uno con un neutrón, llamado deuterio, y otro con dos, llamado tritio:</p>
      ${HIDROGENOS}
      <p>Los tres tienen 1 protón, así que los tres son hidrógeno, y también tienen 1 electrón. Como las reacciones químicas dependen de los electrones, los isótopos de un elemento se comportan casi igual en química. Lo que cambia es la masa. En física viste que algunos isótopos, como el carbono-14, son radiactivos; muchos otros, como el carbono-12, son estables.</p>
      <h3>¿Cuál es el más común?</h3>
      <p>En la naturaleza, los isótopos de un elemento vienen revueltos, pero no en partes iguales. Al porcentaje de átomos de un elemento que son de cierto isótopo se le llama <strong>abundancia</strong>. Por ejemplo, en el cloro, unos 75 de cada 100 átomos son cloro-35 y unos 25 son cloro-37.</p>
      <h3>¿Por qué la masa atómica tiene decimales?</h3>
      <p>Si mezclas 75 átomos que pesan 35 u con 25 que pesan 37 u, ¿cuánto pesa cada uno en promedio? No puedes sacar el punto medio entre 35 y 37, que es 36, porque hay muchos más átomos de 35. El promedio tiene que quedar más cerca de 35.</p>
      <p>Para eso se usa un <strong>promedio ponderado</strong>: un promedio en el que cada valor cuenta según cuántas veces aparece. Se multiplica cada masa por su abundancia, se suma todo y se divide entre 100:</p>
      <p>masa atómica = ${F('masa₁ × abundancia₁ + masa₂ × abundancia₂', '100')}</p>
      <p>Se lee "la masa de cada isótopo por su porcentaje, sumadas, entre cien". Para el cloro:</p>
      <p>${F('35 × 75 + 37 × 25', '100')} = ${F('2 625 + 925', '100')} = 35.5 u</p>
      <p>Es casi el 35.45 de la tabla periódica. Fíjate que quedó más cerca de 35, el isótopo más abundante. Por eso la masa atómica casi nunca es un número entero.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que un isótopo es otro elemento. Si el número de protones es el mismo, es el mismo elemento, aunque tenga más neutrones.</p>`,
    ejemplo: `
      <p>El litio tiene dos isótopos: litio-6, con 7.5% de abundancia, y litio-7, con 92.5%. ¿Cuál es su masa atómica?</p>
      <ol class="pasos-ej">
        <li>Multiplica cada masa por su abundancia, porque cada isótopo debe contar según cuántos átomos hay de él: 6 × 7.5 = 45 y 7 × 92.5 = 647.5.</li>
        <li>Suma los dos resultados: 45 + 647.5 = 692.5.</li>
        <li>Divide entre 100, porque las abundancias son porcentajes, partes de cada cien: 692.5 ÷ 100 = 6.925 u. Dividir entre 100 es recorrer el punto dos lugares a la izquierda.</li>
        <li>Comprueba que tenga sentido: el resultado debe quedar entre 6 y 7, y más cerca de 7, porque el litio-7 es mucho más abundante. 6.925 cumple las dos cosas. La tabla periódica da 6.94.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 6.93 u</span>.</p>
      <p class="nota"><strong>Error común:</strong> promediar sin las abundancias: (6 + 7) ÷ 2 = 6.5. Eso solo valdría si hubiera la misma cantidad de cada isótopo.</p>`,
    vidaReal: `
      <p>Que un mismo elemento venga en versiones de distinto peso tiene usos muy concretos:</p>
      <ul>
        <li>Los arqueólogos calculan la edad de huesos y maderas antiguas.</li>
        <li>En los hospitales se usan versiones especiales del yodo para estudiar y tratar la tiroides.</li>
        <li>Los científicos del clima saben qué temperatura hacía hace miles de años midiendo el hielo de los polos.</li>
        <li>Explica por qué los números de la tabla periódica llevan decimales.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>El carbono tiene Z = 6. ¿Cuántos neutrones tiene el carbono-14?</p>', respuesta: 14 - 6,
        pista: '<p>Neutrones = A − Z.</p>',
        solucion: '<p>14 − 6 = <strong>8 neutrones</strong>, dos más que el carbono-12.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas parejas son isótopos del mismo elemento?</p>',
        opciones: ['Carbono-12 y carbono-14', 'Carbono-14 y nitrógeno-14', 'Oxígeno-16 y azufre-32', 'Sodio-23 y magnesio-24'], correcta: 0,
        pista: '<p>Los isótopos son el mismo elemento, es decir, tienen el mismo número de protones.</p>',
        solucion: '<p><strong>Carbono-12 y carbono-14</strong>: los dos tienen 6 protones. El carbono-14 y el nitrógeno-14 tienen el mismo número másico, pero son elementos distintos.</p>' },
      { tipo: 'numero', enunciado: '<p>El boro tiene dos isótopos: boro-10, con 20% de abundancia, y boro-11, con 80%. ¿Cuál es su masa atómica, en u?</p>',
        respuesta: (10 * 20 + 11 * 80) / 100,
        pista: '<p>Multiplica cada masa por su abundancia, suma y divide entre 100.</p>',
        solucion: '<p>(10 × 20 + 11 × 80) ÷ 100 = (200 + 880) ÷ 100 = <strong>10.8 u</strong>, más cerca de 11 porque el boro-11 abunda más.</p>' },
      { tipo: 'numero', enunciado: '<p>El cobre tiene dos isótopos: cobre-63, con 69% de abundancia, y cobre-65, con 31%. ¿Cuál es su masa atómica, en u?</p>',
        respuesta: (63 * 69 + 65 * 31) / 100, tolerancia: 0.01,
        pista: '<p>Usa la fórmula del promedio ponderado: masa por abundancia, suma, entre 100.</p>',
        solucion: '<p>(63 × 69 + 65 × 31) ÷ 100 = (4 347 + 2 015) ÷ 100 = <strong>63.62 u</strong>. La tabla periódica da 63.55, porque aquí redondeamos las abundancias y las masas.</p>' },
      { tipo: 'opciones', enunciado: '<p>La masa atómica del cobre, 63.55 u, ¿a cuál de sus isótopos se parece más, y por qué?</p>',
        opciones: ['Al cobre-63, porque es el más abundante', 'Al cobre-65, porque es el más pesado', 'A ninguno: queda justo a la mitad'], correcta: 0,
        pista: '<p>En un promedio ponderado, el valor que más aparece jala el resultado hacia él.</p>',
        solucion: '<p>Al <strong>cobre-63</strong>, porque 69 de cada 100 átomos son de ese isótopo. Si los dos abundaran igual, el promedio sería 64.</p>' },
      { tipo: 'numero', enunciado: '<p>El uranio-238 tiene 92 protones. ¿Cuántos protones tiene el uranio-235?</p>', respuesta: 92,
        pista: '<p>Los dos son uranio.</p>',
        solucion: '<p><strong>92</strong>. Son isótopos del mismo elemento: cambia el número de neutrones (146 y 143), no el de protones.</p>' },
    ],
    fuentes: [
      OSC('2-3-atomic-structure-and-symbolism', 'Atomic Structure and Symbolism'),
      WIKI('Isótopo', 'Isótopo'),
      WIKI('Masa_atómica', 'Masa atómica'),
      PHET('isotopes-and-atomic-mass', 'Isótopos y masa atómica'),
    ],
  });

  // ------------------------------------------------------------------
  // Diagrama de diagonales: subnivel (n, l) en x = 2·l, y = 1.6·(5 − n). Las flechas van de un subnivel al siguiente
  // de la misma diagonal (n + l constante), recortadas para no tapar los rótulos.
  const SUB = 'spdf';
  const pos = (n, l) => [2 * l, 1.6 * (5 - n)];
  const celdas = [];
  for (let n = 1; n <= 5; n++) for (let l = 0; l < Math.min(n, 4); l++) celdas.push([n, l]);
  const existe = (n, l) => n >= 1 && n <= 5 && l >= 0 && l < Math.min(n, 4);
  const pasos = celdas.filter(([n, l]) => existe(n + 1, l - 1)).flatMap(([n, l]) => {
    const [a, b] = [pos(n, l), pos(n + 1, l - 1)];
    const k = 0.4 / Math.hypot(b[0] - a[0], b[1] - a[1]);
    return flecha([a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k], [b[0] - (b[0] - a[0]) * k, b[1] - (b[1] - a[1]) * k]);
  });
  const MOELLER = diagrama([-0.8, 6.8], [-0.7, 7.1], [
    ...celdas.map(([n, l]) => txt(...pos(n, l), `${n}${SUB[l]}`)),
    ...pasos,
  ], 'Diagrama de diagonales. Los subniveles están en filas: 1s; 2s 2p; 3s 3p 3d; 4s 4p 4d 4f; 5s 5p 5d 5f. Unas flechas inclinadas unen los subniveles de cada diagonal, de arriba a la derecha hacia abajo a la izquierda: 2p a 3s, 3p a 4s, 3d a 4p, 4p a 5s, 4d a 5p, 4f a 5d. Leídas en orden, dan el orden de llenado: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p.');

  L('Configuración electrónica', {
    objetivo: 'Acomodar los electrones de un átomo en niveles y subniveles, escribir su configuración electrónica y contar sus electrones de valencia.',
    explicacion: `
      <p>Piensa en un edificio de departamentos sin elevador. Los primeros inquilinos eligen los pisos de abajo, porque cuesta menos subir las escaleras. Los pisos de arriba se ocupan solo cuando los de abajo ya están llenos. Los electrones de un átomo se acomodan de una forma parecida.</p>
      <h3>Los pisos del átomo</h3>
      <p>Los electrones no se mueven en cualquier lugar alrededor del núcleo. Ocupan capas, a distintas distancias de él, que se numeran 1, 2, 3 y así sucesivamente. A cada capa se le llama <strong>nivel de energía</strong>. Es la idea de Bohr: entre más lejos del núcleo, más energía tiene el electrón. Por eso los electrones llenan primero los niveles cercanos, como los inquilinos que prefieren no subir.</p>
      <p>Cada nivel tiene un cupo máximo, que se calcula con 2n². Se lee "dos por el número del nivel al cuadrado". El nivel 1 admite 2 × 1² = 2 electrones; el nivel 2, 2 × 2² = 8; el nivel 3, 2 × 3² = 18.</p>
      <h3>Los cuartos de cada piso</h3>
      <p>Dentro de cada nivel hay espacios más pequeños, como los cuartos de cada piso. Se llaman <strong>subniveles</strong> y se nombran con las letras s, p, d y f. Cada uno tiene su propio cupo:</p>
      <ul>
        <li>El subnivel s admite 2 electrones.</li>
        <li>El subnivel p admite 6.</li>
        <li>El subnivel d admite 10.</li>
        <li>El subnivel f admite 14.</li>
      </ul>
      <p>El nivel 1 solo tiene un subnivel s. El nivel 2 tiene s y p, así que admite 2 + 6 = 8, como dice la fórmula. El nivel 3 tiene s, p y d: 2 + 6 + 10 = 18.</p>
      <h3>¿En qué orden se llenan?</h3>
      <p>Los subniveles se llenan del de menor energía al de mayor. El orden no es del todo el de los números: el 4s tiene un poco menos de energía que el 3d, así que se llena antes. Para recordar el orden, se usa este diagrama de diagonales. Sigue cada flecha y empieza la siguiente diagonal arriba:</p>
      ${MOELLER}
      <p>El orden queda así: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s…</p>
      <h3>Cómo se escribe</h3>
      <p>A la lista de cómo están acomodados los electrones de un átomo se le llama <strong>configuración electrónica</strong>. Se escribe cada subnivel con el número de electrones que tiene, en pequeño y arriba. El oxígeno, con 8 electrones, queda así: 1s² 2s² 2p⁴. Se lee "uno ese dos, dos ese dos, dos pe cuatro": 2 electrones en el 1s, 2 en el 2s y 4 en el 2p. Si sumas los numeritos, te da 8.</p>
      <p>A los electrones del último nivel se les llama electrones de valencia. El oxígeno tiene 2 + 4 = 6 en el nivel 2. Son los que participan en las reacciones, y en la siguiente unidad verás que deciden en qué lugar de la tabla periódica va cada elemento.</p>
      <p class="nota"><strong>Trampa común:</strong> llenar el 3d antes que el 4s porque 3 es menor que 4. El diagrama de diagonales muestra que el 4s va primero.</p>`,
    ejemplo: `
      <p>Escribe la configuración electrónica del sodio, que tiene Z = 11.</p>
      <ol class="pasos-ej">
        <li>Primero cuenta los electrones: un átomo neutro tiene tantos como protones, así que son 11, y hay que acomodarlos todos.</li>
        <li>Llena el 1s, que admite 2: 1s². Llevas 2 y faltan 9.</li>
        <li>Sigue el 2s, que también admite 2: 2s². Llevas 4 y faltan 7.</li>
        <li>Luego el 2p, que admite 6: 2p⁶. Llevas 10 y falta 1.</li>
        <li>El electrón que sobra va al siguiente subnivel, el 3s: 3s¹.</li>
        <li>Comprueba sumando los numeritos: 2 + 2 + 6 + 1 = 11. Coincide con Z.</li>
      </ol>
      <p>Resultado: <span class="resultado">1s² 2s² 2p⁶ 3s¹</span>. El sodio tiene 1 electrón de valencia, solito en el nivel 3, y lo suelta con mucha facilidad.</p>
      <p class="nota"><strong>Error común:</strong> poner más electrones de los que caben, como 2p⁷. Si un subnivel se llena, el resto pasa al siguiente.</p>`,
    vidaReal: `
      <p>Cómo se acomodan las partículas negativas alrededor del centro del átomo explica cosas que ves:</p>
      <ul>
        <li>Los fuegos artificiales tienen colores distintos según el metal que lleven: rojo, verde o amarillo.</li>
        <li>Los letreros luminosos brillan con un color propio para cada gas que tienen dentro.</li>
        <li>Explica por qué algunos metales, como el sodio, reaccionan con el agua y otros, como el oro, casi con nada.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un átomo neutro tiene la configuración 1s² 2s² 2p⁶ 3s² 3p⁴. ¿Cuántos electrones tiene?</p>', respuesta: 2 + 2 + 6 + 2 + 4,
        pista: '<p>Suma los numeritos de arriba.</p>',
        solucion: '<p>2 + 2 + 6 + 2 + 4 = <strong>16 electrones</strong>. Como es neutro, tiene 16 protones: es azufre.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos electrones caben, como máximo, en el nivel 3?</p>', respuesta: 2 * 3 ** 2,
        pista: '<p>Usa 2n² con n = 3.</p>',
        solucion: '<p>2 × 3² = 2 × 9 = <strong>18</strong>. Coincide con sus subniveles: s, p y d, que admiten 2 + 6 + 10.</p>' },
      { tipo: 'opciones', enunciado: '<p>El magnesio tiene Z = 12. ¿Cuál es su configuración electrónica?</p>',
        opciones: ['1s² 2s² 2p⁶ 3s²', '1s² 2s² 2p⁸', '1s² 2s² 2p⁶ 3p²', '1s² 2s⁶ 2p⁴'], correcta: 0,
        pista: '<p>Sigue el orden 1s, 2s, 2p, 3s y revisa el cupo de cada subnivel.</p>',
        solucion: '<p><strong>1s² 2s² 2p⁶ 3s²</strong>. En el 2p solo caben 6 y en el 2s solo 2, y después del 2p sigue el 3s, no el 3p.</p>' },
      { tipo: 'numero', enunciado: '<p>El oxígeno tiene la configuración 1s² 2s² 2p⁴. ¿Cuántos electrones de valencia tiene?</p>', respuesta: 2 + 4,
        pista: '<p>Cuenta los electrones del último nivel, el 2.</p>',
        solucion: '<p>En el nivel 2 tiene 2s² y 2p⁴: 2 + 4 = <strong>6 electrones de valencia</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>El nitrógeno tiene Z = 7. ¿Cuántos electrones tiene en el subnivel 2p?</p>', respuesta: 7 - 2 - 2,
        pista: '<p>Llena primero el 1s y el 2s, que admiten 2 cada uno.</p>',
        solucion: '<p>1s² y 2s² ya usan 4 electrones; quedan 7 − 4 = <strong>3</strong> para el 2p: 1s² 2s² 2p³.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según el diagrama de diagonales, ¿qué subnivel se llena justo después del 3p?</p>',
        opciones: ['El 3d', 'El 4s', 'El 4p'], correcta: 1,
        pista: '<p>Sigue la flecha que sale del 3p.</p>',
        solucion: '<p>El <strong>4s</strong>, porque tiene un poco menos de energía que el 3d. Después del 4s viene el 3d.</p>' },
    ],
    fuentes: [
      OSC('6-4-electronic-structure-of-atoms-electron-configurations', 'Electronic Structure of Atoms (Electron Configurations)'),
      WIKI('Configuración_electrónica', 'Configuración electrónica'),
      WIKI('Principio_de_Aufbau', 'Principio de Aufbau'),
      WIKI('Modelo_atómico_de_Bohr', 'Modelo atómico de Bohr'),
    ],
  });
})();
