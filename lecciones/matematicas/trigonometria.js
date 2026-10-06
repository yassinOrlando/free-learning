// Matemáticas · Unidad 5: Trigonometría.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const F = window.fraccion;
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('matematicas', titulo, datos);
  const fig = (x, y, figuras, descripcion, extra = {}) => G({ x, y, figuras, descripcion, proporcional: true, ejes: false, ...extra });
  const raya = (...puntos) => ({ tipo: 'poligono', puntos, abierto: true });
  const oculta = (desde, hasta) => ({ tipo: 'linea', desde, hasta, punteada: true });
  const txt = (x, y, texto) => ({ tipo: 'texto', x, y, texto });
  const recto = (x, y, dx = -0.35, dy = 0.35) => raya([x + dx, y], [x + dx, y + dy], [x, y + dy]); // marca de ángulo recto

  // Trigonometría en grados (las respuestas se escriben como operación con estas funciones).
  const rad = (g) => (g * Math.PI) / 180;
  const sen = (g) => Math.sin(rad(g)), cos = (g) => Math.cos(rad(g)), tan = (g) => Math.tan(rad(g));
  const grados = (r) => (r * 180) / Math.PI;
  const tol2 = 0.006; // "redondea a dos decimales"
  const tol1 = 0.06; // "redondea a un decimal"
  const DEG = '<p class="nota"><strong>Antes de usar la calculadora:</strong> revisa que esté en modo <strong>grados</strong> (DEG o D en la pantalla), no en radianes (RAD). Es el error más común en trigonometría.</p>';

  const AT = (pagina, nombre) => ({ nombre: `OpenStax, Algebra and Trigonometry 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/algebra-and-trigonometry-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = { nombre: 'Khan Academy en español: Trigonometría', url: 'https://es.khanacademy.org/math/trigonometry' };

  // Triángulo 3-4-5 con el ángulo θ en el origen.
  const TRI_345 = fig([-0.6, 6.4], [-0.7, 3.6], [
    { tipo: 'poligono', puntos: [[0, 0], [4, 0], [4, 3]], relleno: true }, recto(4, 0),
    { tipo: 'angulo', x: 0, y: 0, desde: 0, hasta: 36.87, r: 0.9, etiqueta: 'θ' },
    txt(2, -0.4, 'adyacente = 4'), txt(5.25, 1.5, 'opuesto = 3'), txt(1.3, 1.95, 'hipotenusa = 5'),
  ], 'Triángulo rectángulo con el ángulo theta en el vértice izquierdo: cateto adyacente 4 abajo, cateto opuesto 3 a la derecha e hipotenusa 5.');

  // ------------------------------------------------------------------
  L('Razones trigonométricas: seno, coseno y tangente', {
    objetivo: 'Identificar los lados de un triángulo rectángulo respecto de un ángulo y calcular su seno, coseno y tangente.',
    explicacion: `
      <p>Imagina una rampa que sube 3 metros por cada 4 metros que avanza. Ahora imagina otra rampa más larga que sube 6 metros por cada 8 que avanza. Las dos tienen exactamente la misma inclinación: forman el mismo ángulo con el suelo. Fíjate que en ambas la subida dividida entre el avance da lo mismo: 3 ÷ 4 = 0.75 y 6 ÷ 8 = 0.75. Esa es la idea de toda esta lección: <strong>el ángulo decide la proporción entre los lados</strong>, sin importar el tamaño.</p>
      <p>La <strong>trigonometría</strong> es la parte de las matemáticas que estudia esa relación entre los ángulos y los lados de los triángulos. Empieza con el triángulo rectángulo, el que tiene una esquina de 90°, como la esquina de una hoja.</p>
      <h3>¿Cómo se llama cada lado?</h3>
      <p>Elige uno de los dos ángulos que no son rectos (los agudos, de menos de 90°) y llámalo <strong>θ</strong>, una letra griega que se lee "theta". Lo usamos como nombre para "el ángulo que estoy mirando". Desde ese ángulo, cada lado tiene un nombre:</p>
      <ul>
        <li>La <strong>hipotenusa</strong> es el lado que está enfrente del ángulo recto. Siempre es el más largo.</li>
        <li>El <strong>cateto opuesto</strong> es el lado que está enfrente de θ, el que θ "mira" desde lejos.</li>
        <li>El <strong>cateto adyacente</strong> es el otro lado que toca a θ y que no es la hipotenusa. "Adyacente" quiere decir "que está al lado".</li>
      </ul>
      ${TRI_345}
      <p>Fíjate que opuesto y adyacente dependen del ángulo que elijas. Si te paras en la otra esquina aguda, los dos catetos cambian de nombre. La hipotenusa, en cambio, es siempre la misma.</p>
      <h3>¿Qué son seno, coseno y tangente?</h3>
      <p>Con tres lados puedes hacer varias divisiones. Tres de ellas son tan útiles que tienen nombre propio. Se llaman <strong>razones trigonométricas</strong>, porque una razón es una división entre dos cantidades:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Seno</th><td>sen θ = ${F('opuesto', 'hipotenusa')}</td></tr>
        <tr><th>Coseno</th><td>cos θ = ${F('adyacente', 'hipotenusa')}</td></tr>
        <tr><th>Tangente</th><td>tan θ = ${F('opuesto', 'adyacente')}</td></tr>
      </table></div>
      <p>Léelas en voz alta. El <strong>seno</strong> dice qué parte de la hipotenusa mide el lado de enfrente. El <strong>coseno</strong> dice qué parte de la hipotenusa mide el lado pegado al ángulo. La <strong>tangente</strong> dice cuánto sube por cada paso que avanza, igual que en las rampas del principio. En la calculadora aparecen como <em>sin</em>, <em>cos</em> y <em>tan</em>.</p>
      <p>Una forma de recordarlas es la palabra <strong>SOH-CAH-TOA</strong>: Seno = Opuesto / Hipotenusa, Coseno = Adyacente / Hipotenusa, Tangente = Opuesto / Adyacente.</p>
      <h3>¿Por qué no importa el tamaño del triángulo?</h3>
      <p>Si dos triángulos rectángulos tienen el mismo ángulo θ, uno es una copia agrandada o achicada del otro. A eso se le llama triángulos <strong>semejantes</strong>: sus lados crecen todos en la misma proporción, como una foto que amplías. Si todos los lados se duplican, la división entre dos de ellos no cambia. Por eso cada ángulo tiene un solo seno, un solo coseno y una sola tangente.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir el cateto opuesto con el adyacente. Antes de dividir, ponle el dedo al ángulo θ: el lado que no toca es el opuesto, y el cateto que sí toca es el adyacente.</p>
      <h3>Valores que conviene conocer</h3>
      <p>Algunos ángulos aparecen tanto que vale la pena tener sus valores a la mano:</p>
      <div class="tabla-wrap"><table>
        <tr><th>θ</th><th>sen θ</th><th>cos θ</th><th>tan θ</th></tr>
        <tr><td>30°</td><td>${F(1, 2)} = 0.5</td><td>${F('√3', 2)} ≈ 0.866</td><td>${F('√3', 3)} ≈ 0.577</td></tr>
        <tr><td>45°</td><td>${F('√2', 2)} ≈ 0.707</td><td>${F('√2', 2)} ≈ 0.707</td><td>1</td></tr>
        <tr><td>60°</td><td>${F('√3', 2)} ≈ 0.866</td><td>${F(1, 2)} = 0.5</td><td>√3 ≈ 1.732</td></tr>
      </table></div>
      ${DEG}`,
    ejemplo: `
      <p>En el triángulo 3-4-5 de la figura, calcula las tres razones de θ.</p>
      <ol class="pasos-ej">
        <li>Primero ponle nombre a cada lado desde θ. El lado más largo, enfrente del ángulo recto, es la hipotenusa: 5. El lado que θ no toca es el opuesto: 3. El cateto que sí toca a θ es el adyacente: 4.</li>
        <li>Ahora divide según cada razón. Seno es opuesto entre hipotenusa: sen θ = ${F(3, 5)} = 0.6. Coseno es adyacente entre hipotenusa: cos θ = ${F(4, 5)} = 0.8. Tangente es opuesto entre adyacente: tan θ = ${F(3, 4)} = 0.75.</li>
        <li>Comprueba. El seno y el coseno deben ser menores que 1, porque la hipotenusa es el lado más largo, y lo son. Además, sen θ ÷ cos θ = 0.6 ÷ 0.8 = 0.75, que es justo la tangente.</li>
      </ol>
      <p>Resultado: <span class="resultado">sen θ = 0.6, cos θ = 0.8, tan θ = 0.75</span>.</p>
      <p class="nota"><strong>Error común:</strong> dividir al revés, como 5 ÷ 3. Si un seno o un coseno te da más de 1, pusiste la hipotenusa arriba, y en esas dos razones va siempre abajo.</p>`,
    vidaReal: `
      <p>Saber cómo se relacionan los ángulos con los lados te deja medir cosas sin tocarlas:</p>
      <ul>
        <li>Calcular la altura de un edificio o de un árbol sin subirte, o el ancho de un río sin cruzarlo.</li>
        <li>Decidir qué tan inclinado debe ir un techo, una escalera o una rampa para silla de ruedas.</li>
        <li>En videojuegos, animaciones y mapas del teléfono, girar objetos y ubicar posiciones en la pantalla.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un triángulo rectángulo tiene cateto opuesto a θ de 5, cateto adyacente de 12 e hipotenusa de 13. ¿Cuánto vale sen θ? (Fracción o decimal con dos decimales).</p>', respuesta: 5 / 13, tolerancia: tol2,
        pista: '<p>El seno divide el lado de enfrente de θ entre la hipotenusa (el lado más largo).</p>',
        solucion: `<p>El opuesto mide 5 y la hipotenusa 13, así que sen θ = <strong>${F(5, 13)}</strong> ≈ 0.38.</p>` },
      { tipo: 'numero', enunciado: '<p>En el mismo triángulo (5, 12, 13), ¿cuánto vale cos θ?</p>', respuesta: 12 / 13, tolerancia: tol2,
        pista: '<p>El coseno divide el cateto que toca a θ entre la hipotenusa.</p>',
        solucion: `<p>El adyacente mide 12 y la hipotenusa 13, así que cos θ = <strong>${F(12, 13)}</strong> ≈ 0.92.</p>` },
      { tipo: 'numero', enunciado: '<p>En el mismo triángulo (5, 12, 13), ¿cuánto vale tan θ?</p>', respuesta: 5 / 12, tolerancia: tol2,
        pista: '<p>La tangente no usa la hipotenusa: divide un cateto entre el otro.</p>',
        solucion: `<p>La tangente es opuesto entre adyacente: tan θ = <strong>${F(5, 12)}</strong> ≈ 0.42.</p>` },
      { tipo: 'numero', enunciado: '<p>Sin calculadora: ¿cuánto vale sen 30°?</p>', respuesta: 0.5,
        pista: '<p>Revisa la tabla de valores que conviene conocer.</p>',
        solucion: `<p>sen 30° = <strong>${F(1, 2)}</strong> = 0.5.</p>` },
      { tipo: 'numero', enunciado: '<p>Con calculadora (en grados): ¿cuánto vale sen 40°? Redondea a dos decimales.</p>', respuesta: sen(40), tolerancia: tol2,
        pista: '<p>Revisa que la calculadora diga DEG antes de presionar sin 40.</p>',
        solucion: '<p>sen 40° ≈ <strong>0.64</strong>. Si te salió 0.75, tu calculadora está en radianes.</p>' },
      { tipo: 'opciones', enunciado: `<p>¿Qué razón es ${F('cateto adyacente', 'hipotenusa')}?</p>`, opciones: ['Seno', 'Coseno', 'Tangente'], correcta: 1,
        pista: '<p>Seno usa el opuesto; tangente no usa la hipotenusa.</p>',
        solucion: '<p>Es el <strong>coseno</strong>: divide el cateto que toca al ángulo entre la hipotenusa. El seno usaría el opuesto y la tangente no usa la hipotenusa.</p>' },
    ],
    fuentes: [AT('7-2-right-triangle-trigonometry', 'Right Triangle Trigonometry'), WIKI('Trigonometría', 'Trigonometría'), KHAN],
  });

  // ------------------------------------------------------------------
  L('Resolver triángulos rectángulos', {
    objetivo: 'Encontrar lados y ángulos desconocidos de un triángulo rectángulo con seno, coseno, tangente y sus funciones inversas.',
    explicacion: `
      <p>Imagina que quieres saber cuánto mide un árbol, pero no puedes subirte a él. Lo que sí puedes hacer es caminar hasta cierta distancia, medirla en el suelo y medir qué tan inclinada va tu mirada al ver la punta. Con esos dos datos, un lado y un ángulo, la trigonometría te da la altura. A esto se le llama <strong>resolver un triángulo</strong>: encontrar los lados y ángulos que faltan a partir de los que conoces.</p>
      <p>En la lección anterior viste que sen θ, cos θ y tan θ son divisiones entre dos lados. Aquí las usarás al revés: en lugar de calcular la división, la usarás para encontrar un lado o un ángulo que no conoces.</p>
      <h3>¿Cómo encuentro un lado?</h3>
      <p>Si conoces un ángulo agudo y un lado, sigue tres pasos:</p>
      <ol>
        <li>Ponle nombre a los lados desde el ángulo que conoces: opuesto, adyacente e hipotenusa.</li>
        <li>Elige la razón que usa el lado que tienes y el lado que buscas. Por ejemplo, si tienes la hipotenusa y buscas el opuesto, la razón que junta esos dos es el seno.</li>
        <li>Escribe la igualdad y despeja el lado que falta, como en cualquier ecuación.</li>
      </ol>
      <p>Por ejemplo, la hipotenusa mide 12 y el ángulo es de 30°. Como sen 30° = ${F('opuesto', 12)}, al multiplicar los dos lados por 12 queda: opuesto = 12 × sen 30° = 12 × 0.5 = 6. Tiene sentido: el seno te dice qué parte de la hipotenusa mide el opuesto, y aquí es la mitad.</p>
      <h3>¿Cómo encuentro un ángulo?</h3>
      <p>Ahora al revés: conoces dos lados y quieres el ángulo. Primero calculas la división, por ejemplo tan θ = ${F(2, 5)} = 0.4. Pero lo que quieres es θ, no su tangente. Necesitas una operación que deshaga la tangente, igual que la resta deshace la suma.</p>
      <p>Esa operación se llama <strong>función inversa</strong>. Hay una para cada razón: sen<sup>−1</sup>, cos<sup>−1</sup> y tan<sup>−1</sup>. Se leen "seno inverso", "coseno inverso" y "tangente inversa". Les das la división y te devuelven el ángulo. En la calculadora suelen estar como <em>SHIFT + sin</em>, <em>SHIFT + cos</em> y <em>SHIFT + tan</em>.</p>
      <p>Así, si tan θ = 0.4, entonces θ = tan<sup>−1</sup>(0.4) ≈ 21.8°. Puedes comprobarlo: tan 21.8° da casi 0.4.</p>
      <p class="nota"><strong>Trampa común:</strong> el −1 de sen<sup>−1</sup> no es un exponente. sen<sup>−1</sup>(0.5) no es 1 ÷ sen(0.5): es "el ángulo cuyo seno es 0.5", que es 30°.</p>
      <h3>Ángulos de elevación y de depresión</h3>
      <p>En los problemas de la vida real, el ángulo casi siempre se mide desde una línea horizontal, como el suelo o el horizonte del mar.</p>
      <p>El <strong>ángulo de elevación</strong> es el que formas cuando levantas la mirada desde la horizontal hacia arriba, por ejemplo para ver la punta de un árbol. El <strong>ángulo de depresión</strong> es el que formas cuando bajas la mirada desde la horizontal hacia abajo, por ejemplo cuando desde lo alto de un faro miras un barco. Los dos ángulos son iguales: el de depresión desde el faro mide lo mismo que el de elevación desde el barco hacia el faro.</p>
      <p>Fíjate que, en el dibujo, el suelo y el árbol forman el ángulo recto. Tu distancia al árbol es el cateto adyacente al ángulo de elevación, y la altura del árbol es el cateto opuesto.</p>
      ${fig([-0.6, 11.6], [-0.9, 7.8], [
        raya([-0.5, 0], [11.5, 0]), { ...raya([10, 0], [10, 7.0]), serie: 2 }, oculta([0, 0], [10, 7.0]), recto(10, 0, -0.45, 0.45),
        { tipo: 'angulo', x: 0, y: 0, desde: 0, hasta: 35, r: 1.4, etiqueta: '35°' },
        txt(5, -0.5, '10 m'), txt(10.9, 3.5, 'h'),
      ], 'Una persona en el suelo mira la punta de un árbol que está a 10 metros, con un ángulo de elevación de 35 grados. La altura del árbol es h.')}
      ${DEG}`,
    ejemplo: `
      <p>Estás a 10 m de un árbol y ves su punta con un ángulo de elevación de 35°. ¿Cuánto mide el árbol (desde el suelo)?</p>
      <ol class="pasos-ej">
        <li>Primero ponle nombre a los lados desde el ángulo de 35°. Los 10 m del suelo tocan el ángulo, así que son el cateto adyacente. La altura h está enfrente, así que es el opuesto.</li>
        <li>Elige la razón que junta opuesto y adyacente: la tangente. Escribe tan 35° = ${F('h', 10)}.</li>
        <li>Despeja h multiplicando ambos lados por 10: h = 10 × tan 35°. Con la calculadora en grados, tan 35° ≈ 0.700, así que h ≈ 10 × 0.700 = 7.0.</li>
        <li>Comprueba al revés: tan<sup>−1</sup>(7 ÷ 10) = tan<sup>−1</sup>(0.7) ≈ 35°, el ángulo con el que empezaste.</li>
      </ol>
      <p>Resultado: <span class="resultado">el árbol mide unos 7 m</span>. (Si mides el ángulo desde tus ojos, súmale la altura de tus ojos al suelo).</p>
      <p class="nota"><strong>Error común:</strong> usar el seno porque es la primera razón que viene a la mente. El seno usa la hipotenusa, y aquí no la conoces ni la buscas.</p>`,
    vidaReal: `
      <p>Con una distancia y un ángulo puedes calcular medidas a las que no llegas:</p>
      <ul>
        <li>Saber cuánto mide un edificio, un árbol o un cerro sin subirte.</li>
        <li>Construir una rampa para silla de ruedas: muchas normas piden que no suba más de 8 cm por cada metro que avanza (unos 4.6° de inclinación).</li>
        <li>Apoyar una escalera de mano con una inclinación segura, de unos 75° con el suelo.</li>
        <li>Calcular dónde empieza a bajar un avión, que aterriza descendiendo con unos 3° de inclinación.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>La hipotenusa mide 10 cm y uno de los ángulos agudos mide 30°. ¿Cuánto mide el cateto opuesto a ese ángulo?</p>', respuesta: 10 * sen(30), tolerancia: 1e-9,
        pista: '<p>Tienes la hipotenusa y buscas el opuesto: ¿qué razón junta esos dos lados?</p>',
        solucion: '<p>El seno junta opuesto e hipotenusa: opuesto = 10 × sen 30° = 10 × 0.5 = <strong>5 cm</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una escalera de 6 m se apoya en una pared formando un ángulo de 70° con el suelo. ¿A qué altura llega? Redondea a dos decimales.</p>', respuesta: 6 * sen(70), tolerancia: tol2,
        pista: '<p>La escalera es la hipotenusa y la altura es el cateto opuesto al ángulo de 70°.</p>',
        solucion: '<p>Con hipotenusa y opuesto se usa el seno: altura = 6 × sen 70° ≈ 6 × 0.9397 ≈ <strong>5.64 m</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un edificio proyecta una sombra de 20 m cuando el sol está a 50° de elevación. ¿Cuánto mide el edificio? Redondea a un decimal.</p>', respuesta: 20 * tan(50), tolerancia: tol1,
        pista: '<p>La sombra es el cateto adyacente; la altura, el opuesto.</p>',
        solucion: '<p>La tangente junta opuesto y adyacente: tan 50° = altura ÷ 20, así que altura = 20 × tan 50° ≈ 20 × 1.1918 ≈ <strong>23.8 m</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Los catetos de un triángulo rectángulo miden 3 (opuesto a θ) y 4 (adyacente). ¿Cuánto mide θ? Redondea a un decimal.</p>', respuesta: grados(Math.atan(3 / 4)), tolerancia: tol1,
        pista: '<p>Con los dos catetos calcula la tangente, y luego usa la tangente inversa para obtener el ángulo.</p>',
        solucion: '<p>tan θ = 3 ÷ 4 = 0.75. La tangente inversa devuelve el ángulo: tan<sup>−1</sup>(0.75) ≈ <strong>36.9°</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una rampa sube 0.5 m a lo largo de 6 m de distancia horizontal. ¿Qué ángulo forma con el suelo? Redondea a un decimal.</p>', respuesta: grados(Math.atan(0.5 / 6)), tolerancia: tol1,
        pista: '<p>Subida = opuesto, distancia horizontal = adyacente. Usa tan<sup>−1</sup>.</p>',
        solucion: '<p>La tangente del ángulo es 0.5 ÷ 6, y la tangente inversa da tan<sup>−1</sup>(0.5 ÷ 6) ≈ <strong>4.8°</strong>, un poco más inclinada que la rampa de 8 cm por metro (unos 4.6°) que piden muchas normas.</p>' },
      { tipo: 'numero', enunciado: '<p>Desde lo alto de un faro de 40 m ves un barco con un ángulo de depresión de 12°. ¿A qué distancia horizontal está el barco? Redondea al metro.</p>', respuesta: 40 / tan(12), tolerancia: 0.6,
        pista: '<p>El ángulo de depresión es igual al ángulo de elevación desde el barco hacia el faro. tan 12° = 40 ÷ distancia.</p>',
        solucion: '<p>La altura del faro es el opuesto y la distancia el adyacente, así que tan 12° = 40 ÷ distancia. Despejando: distancia = 40 ÷ tan 12° ≈ 40 ÷ 0.2126 ≈ <strong>188 m</strong>.</p>' },
    ],
    fuentes: [AT('7-2-right-triangle-trigonometry', 'Right Triangle Trigonometry'), WIKI('Función_trigonométrica', 'Función trigonométrica'), KHAN],
  });

  // ------------------------------------------------------------------
  const CX = 5 * cos(40), CY = 5 * sen(40); // vértice C del triángulo de ejemplo
  L('Ley de senos y ley de cosenos', {
    objetivo: 'Resolver triángulos que no son rectángulos usando la ley de senos y la ley de cosenos, y saber cuál conviene en cada caso.',
    explicacion: `
      <p>Imagina que quieres saber qué tan largo es un lago. No puedes medirlo con cinta porque hay agua en medio. Pero sí puedes pararte en la orilla, medir la distancia a cada punta del lago y el ángulo entre esas dos direcciones. Se forma un triángulo, pero casi nunca tiene una esquina de 90°.</p>
      <p>Hasta ahora, seno, coseno y tangente eran divisiones entre lados de un triángulo <strong>rectángulo</strong>. Sin ángulo recto no hay hipotenusa, así que esas divisiones ya no aplican directamente. Para <strong>cualquier</strong> triángulo existen dos reglas que sí funcionan: la <strong>ley de senos</strong> y la <strong>ley de cosenos</strong>.</p>
      <h3>¿Cómo se nombran los lados?</h3>
      <p>Se usa una costumbre muy práctica: los ángulos se nombran con mayúsculas, <strong>A, B, C</strong>, y cada lado lleva la minúscula del ángulo que tiene enfrente. Así, el lado <strong>a</strong> está enfrente del ángulo A, el lado <strong>b</strong> enfrente de B y el lado <strong>c</strong> enfrente de C.</p>
      ${fig([-0.8, 7.8], [-0.8, 3.9], [
        { tipo: 'poligono', puntos: [[0, 0], [7, 0], [CX, CY]], relleno: true },
        { tipo: 'angulo', x: 0, y: 0, desde: 0, hasta: 40, r: 1, etiqueta: '40°' },
        txt(-0.35, -0.35, 'A'), txt(7.35, -0.35, 'B'), txt(CX, CY + 0.4, 'C'),
        txt(3.5, -0.45, 'c = 7'), txt(1.45, 2.2, 'b = 5'), txt(5.9, 1.9, 'a'),
      ], 'Triángulo con vértices A, B y C. El ángulo A mide 40 grados, el lado b, de A a C, mide 5, y el lado c, de A a B, mide 7. El lado a, opuesto a A, es desconocido.')}
      <h3>Ley de senos</h3>
      <p class="resultado">${F('a', 'sen A')} = ${F('b', 'sen B')} = ${F('c', 'sen C')}</p>
      <p>Se lee: "a entre seno de A es igual a b entre seno de B, y es igual a c entre seno de C". Dice que <strong>cada lado, dividido entre el seno del ángulo que tiene enfrente, da siempre el mismo número</strong>. No la demostraremos aquí, pero sí puedes ver por qué es razonable. Un ángulo más abierto deja más espacio enfrente, así que el lado que lo mira es más largo, y el seno es la medida exacta de ese crecimiento. En un triángulo rectángulo se ve claro: sen A = a ÷ c, luego a ÷ sen A = c. Y el ángulo recto tiene enfrente a c, por lo que su seno es c ÷ c = 1 y c ÷ 1 también da c.</p>
      <p>Úsala cuando conoces <strong>dos ángulos y un lado</strong>. También sirve con dos lados y el ángulo de enfrente de uno de ellos, aunque ahí a veces hay dos triángulos posibles, y no lo veremos. En la práctica tomas solo dos de las tres fracciones: una con todo conocido y otra con el dato que buscas.</p>
      <h3>Ley de cosenos</h3>
      <p class="resultado">a² = b² + c² − 2bc · cos A</p>
      <p>Se lee: "a al cuadrado es igual a b al cuadrado más c al cuadrado, menos dos por b por c por el coseno de A". Aquí <strong>a</strong> es el lado que buscas, <strong>b</strong> y <strong>c</strong> son los dos lados que conoces, y <strong>A</strong> es el ángulo que queda entre b y c, justo enfrente de a.</p>
      <p>Úsala cuando conoces <strong>dos lados y el ángulo entre ellos</strong>, o cuando conoces <strong>los tres lados</strong> y buscas un ángulo. En ese segundo caso despejas cos A y luego usas cos<sup>−1</sup>.</p>
      <p>¿Por qué se parece tanto a Pitágoras? Porque es Pitágoras con una corrección. Si A = 90°, entonces cos A = 0, el último término desaparece y queda a² = b² + c². Si A es menor que 90°, el lado a queda más corto que en el triángulo rectángulo, y el término −2bc · cos A le resta justo lo necesario.</p>
      <h3>¿Cuál ley uso?</h3>
      <p>Si tienes un ángulo y el lado que tiene enfrente, la pareja completa, la ley de senos es más rápida. Si tienes dos lados y el ángulo que forman entre ellos, o los tres lados, no tienes ninguna pareja completa, así que usa la ley de cosenos.</p>
      <p class="nota"><strong>Trampa común:</strong> en la ley de cosenos, el ángulo tiene que ser el que está entre los dos lados conocidos. Si usas otro ángulo, el resultado sale mal aunque las cuentas estén bien hechas.</p>
      ${DEG}`,
    ejemplo: `
      <p>En el triángulo de la figura, b = 5, c = 7 y A = 40°. ¿Cuánto mide a?</p>
      <ol class="pasos-ej">
        <li>Primero decide qué ley usar. Conoces dos lados, b y c, y el ángulo A que forman entre ellos. No tienes ninguna pareja de ángulo con su lado de enfrente, así que va la ley de cosenos.</li>
        <li>Sustituye los datos: a² = 5² + 7² − 2(5)(7) cos 40°. Los cuadrados suman 25 + 49 = 74, y 2 × 5 × 7 = 70.</li>
        <li>Con la calculadora en grados, cos 40° ≈ 0.766. Entonces a² ≈ 74 − 70 × 0.766 ≈ 74 − 53.62 = 20.38.</li>
        <li>Ese número es a², no a. Saca raíz cuadrada: a = √20.38 ≈ 4.5.</li>
        <li>Comprueba que sea razonable. Si el ángulo fuera de 90°, Pitágoras daría a = √74 ≈ 8.6. Como 40° es mucho más cerrado, a tiene que ser más corto, y 4.5 lo es.</li>
      </ol>
      <p>Resultado: <span class="resultado">a ≈ 4.5</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar la raíz cuadrada al final y responder 20.38.</p>`,
    vidaReal: `
      <p>Muchas veces necesitas una distancia que no puedes medir directamente y el triángulo que se forma no tiene esquina recta:</p>
      <ul>
        <li>Medir el largo de un lago o la distancia entre dos puntos con un cerro en medio.</li>
        <li>Saber qué tan lejos queda un puerto cuando un barco cambia de dirección a mitad del viaje.</li>
        <li>Ubicar un incendio en el bosque cuando dos torres de vigilancia miden el ángulo hacia él.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En un triángulo, A = 30°, B = 45° y a = 10. ¿Cuánto mide b? Redondea a dos decimales.</p>', respuesta: (10 * sen(45)) / sen(30), tolerancia: tol2,
        pista: `<p>Ley de senos: ${F('b', 'sen 45°')} = ${F(10, 'sen 30°')}.</p>`,
        solucion: '<p>Tienes la pareja completa A y a, así que usa la ley de senos y despeja b multiplicando por sen 45°: b = 10 × sen 45° ÷ sen 30° = 10 × 0.7071 ÷ 0.5 ≈ <strong>14.14</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En el mismo triángulo (A = 30°, B = 45°), ¿cuánto mide el ángulo C?</p>', respuesta: 180 - 30 - 45,
        pista: '<p>Los tres ángulos suman 180°.</p>',
        solucion: '<p>180° − 30° − 45° = <strong>105°</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Dos lados de un triángulo miden 8 y 5, y el ángulo entre ellos es de 60°. ¿Cuánto mide el tercer lado?</p>', respuesta: Math.sqrt(8 ** 2 + 5 ** 2 - 2 * 8 * 5 * cos(60)), tolerancia: 1e-6,
        pista: '<p>Ley de cosenos, con cos 60° = 0.5.</p>',
        solucion: '<p>Son dos lados y el ángulo entre ellos, así que va la ley de cosenos: c² = 64 + 25 − 2 × 8 × 5 × 0.5 = 89 − 40 = 49, y la raíz da c = <strong>7</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un triángulo tiene lados de 5, 6 y 7. ¿Cuánto mide el ángulo opuesto al lado de 7? Redondea a un decimal.</p>', respuesta: grados(Math.acos((25 + 36 - 49) / (2 * 5 * 6))), tolerancia: tol1,
        pista: '<p>Despeja de la ley de cosenos: cos C = (5² + 6² − 7²) ÷ (2 · 5 · 6).</p>',
        solucion: '<p>Con los tres lados, despejas el coseno: cos C = (25 + 36 − 49) ÷ 60 = 12 ÷ 60 = 0.2. El coseno inverso da el ángulo: C = cos<sup>−1</sup>(0.2) ≈ <strong>78.5°</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Conoces dos lados de un triángulo y el ángulo que forman entre ellos. ¿Qué ley usas para encontrar el tercer lado?</p>', opciones: ['Ley de senos', 'Ley de cosenos', 'Ninguna, falta información'], correcta: 1,
        pista: '<p>¿Tienes algún ángulo junto con el lado que tiene enfrente?</p>',
        solucion: '<p><strong>Ley de cosenos</strong>. No tienes ninguna pareja de ángulo y lado de enfrente, que es lo que pide la ley de senos; "dos lados y el ángulo entre ellos" es justo el caso de la ley de cosenos.</p>' },
      { tipo: 'numero', enunciado: '<p>Dos barcos salen del mismo puerto. Uno navega 12 km y el otro 15 km, y sus rutas forman un ángulo de 50°. ¿Qué distancia los separa? Redondea a un decimal.</p>', respuesta: Math.sqrt(144 + 225 - 2 * 12 * 15 * cos(50)), tolerancia: tol1,
        pista: '<p>Dos lados (12 y 15) y el ángulo entre ellos (50°): ley de cosenos.</p>',
        solucion: '<p>d² = 144 + 225 − 360 × cos 50° ≈ 369 − 231.4 = 137.6, así que d ≈ <strong>11.7 km</strong>.</p>' },
    ],
    fuentes: [AT('10-1-non-right-triangles-law-of-sines', 'Non-right Triangles: Law of Sines'), AT('10-2-non-right-triangles-law-of-cosines', 'Non-right Triangles: Law of Cosines'), WIKI('Teorema_del_coseno', 'Teorema del coseno')],
  });

  // ------------------------------------------------------------------
  const PX = cos(50), PY = sen(50);
  L('El círculo unitario', {
    objetivo: 'Usar el círculo unitario para extender seno y coseno a cualquier ángulo, conocer sus signos por cuadrante y convertir entre grados y radianes.',
    explicacion: `
      <p>Piensa en una rueda de la fortuna: tu canastilla sube, baja y vuelve a empezar, dando vueltas de 360°. En un triángulo rectángulo, en cambio, los ángulos agudos miden menos de 90°. ¿Tiene sentido hablar del seno de 120°? Sí, y esta lección te muestra cómo.</p>
      <p>El truco es dibujar un círculo de radio 1 con el centro en el origen del plano cartesiano, donde se cruzan los ejes x y y. Se llama <strong>círculo unitario</strong>, porque "unitario" quiere decir "de tamaño uno".</p>
      <h3>¿Dónde están el seno y el coseno?</h3>
      <p>Empieza en el punto (1, 0), a la derecha del centro, y gira un ángulo θ en contra de las manecillas del reloj. Llegas a un punto P del círculo. Desde P baja una línea recta hasta el eje x: se forma un triángulo rectángulo cuya hipotenusa es el radio, que mide 1.</p>
      <p>En ese triángulo, cos θ = ${F('adyacente', 1)} y sen θ = ${F('opuesto', 1)}. Dividir entre 1 no cambia nada, así que el coseno es el lado horizontal y el seno es el lado vertical. Las coordenadas del punto son:</p>
      <p class="resultado">P = (cos θ, sen θ)</p>
      <p>Se lee: "la x de P es el coseno de θ, y la y de P es el seno de θ". El coseno dice <strong>qué tan a la derecha o a la izquierda</strong> está el punto, y el seno <strong>qué tan arriba o abajo</strong>.</p>
      ${G({ x: [-1.4, 1.4], y: [-1.3, 1.3], proporcional: true, descripcion: 'Círculo de radio 1 con un punto P a 50 grados. La distancia horizontal desde el origen hasta debajo de P es cos theta y la altura de P es sen theta.', figuras: [
        { tipo: 'circulo', x: 0, y: 0, r: 1 },
        { tipo: 'linea', desde: [0, 0], hasta: [PX, PY], serie: 1 },
        oculta([PX, 0], [PX, PY]), { ...raya([0, 0], [PX, 0]), serie: 2 },
        { tipo: 'angulo', x: 0, y: 0, desde: 0, hasta: 50, r: 0.25, etiqueta: 'θ' },
        txt(PX / 2, -0.13, 'cos θ'), txt(PX + 0.53, PY / 2, 'sen θ'),
      ], puntos: [{ x: PX, y: PY, etiqueta: 'P' }] })}
      <p>La ventaja es que el punto puede seguir girando más allá de 90°. Ya no hay triángulo con ese ángulo, pero el punto siempre tiene coordenadas. Así, seno y coseno existen para <strong>cualquier</strong> ángulo.</p>
      <h3>¿Cuándo son positivos o negativos?</h3>
      <p>Los ejes parten el plano en cuatro zonas llamadas <strong>cuadrantes</strong>, numerados I, II, III y IV en el orden en que gira el punto. A la izquierda del eje y, la x es negativa; abajo del eje x, la y es negativa. Como el coseno es la x y el seno es la y, sus signos quedan así:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Cuadrante</th><th>Ángulos</th><th>cos θ (x)</th><th>sen θ (y)</th></tr>
        <tr><td>I</td><td>0° a 90°</td><td>+</td><td>+</td></tr>
        <tr><td>II</td><td>90° a 180°</td><td>−</td><td>+</td></tr>
        <tr><td>III</td><td>180° a 270°</td><td>−</td><td>−</td></tr>
        <tr><td>IV</td><td>270° a 360°</td><td>+</td><td>−</td></tr>
      </table></div>
      <p>Para ángulos que no están en el cuadrante I sirve el <strong>ángulo de referencia</strong>: lo que le falta o le sobra al ángulo para llegar al eje x más cercano. El punto queda igual de alto y de lejos del centro que el de ese ángulo, así que el seno y el coseno valen lo mismo, salvo por el signo que marca la tabla.</p>
      <h3>¿Qué es un radián?</h3>
      <p>Los grados son una forma de medir ángulos, pero hay otra: medir <strong>cuánto camino recorres sobre el círculo unitario</strong>. Esa medida se llama <strong>radián</strong>. La circunferencia completa de un círculo es 2π por el radio; con radio 1, la vuelta completa mide 2π. Media vuelta, que son 180°, mide π. Por eso:</p>
      <p class="resultado">180° = π radianes</p>
      <p>Para pasar de grados a radianes multiplica por ${F('π', 180)}; para pasar de radianes a grados, multiplica por ${F(180, 'π')}. Las dos fracciones valen 1, porque arriba y abajo hay lo mismo. Por ejemplo, 45° es la cuarta parte de 180°, así que 45° = ${F('π', 4)}.</p>
      <p class="nota"><strong>Trampa común:</strong> la calculadora no sabe si le das grados o radianes. Si está en RAD y escribes sen 30, calcula el seno de 30 radianes, que es casi cinco vueltas, y da otro número.</p>
      <h3>¿Por qué el seno y el coseno son ondas?</h3>
      <p>Si sigues girando, después de una vuelta completa el punto vuelve a pasar por el mismo lugar. Por eso los valores se repiten cada 360°, igual que tu canastilla en la rueda de la fortuna. Si dibujas la altura del punto (el seno) mientras gira, sube y baja entre −1 y 1 y forma una <strong>onda</strong>:</p>
      ${G({ x: [0, 360], y: [-1.5, 1.5], pasos: [90, 0.5], descripcion: 'Gráfica de seno y coseno de 0 a 360 grados: dos ondas que suben y bajan entre menos 1 y 1; el coseno va 90 grados adelantado al seno.', funciones: [
        { f: (x) => sen(x), etiqueta: 'y = sen x' }, { f: (x) => cos(x), etiqueta: 'y = cos x' }] })}`,
    ejemplo: `
      <p>¿Cuáles son las coordenadas del punto del círculo unitario a 120°?</p>
      <ol class="pasos-ej">
        <li>Primero ubica el ángulo. 120° es más que 90° y menos que 180°, así que el punto está en el cuadrante II, arriba a la izquierda. Ahí la x es negativa y la y es positiva.</li>
        <li>Busca el ángulo de referencia. A 120° le faltan 60° para llegar a 180°, el eje x de la izquierda. Ese 60° es su <strong>ángulo de referencia</strong>: el punto está igual de alto y igual de lejos del centro que el de 60°, pero del otro lado.</li>
        <li>Toma los valores de 60° y ponles el signo del cuadrante: cos 120° = −cos 60° = −0.5 y sen 120° = sen 60° ≈ 0.866.</li>
        <li>Comprueba con la calculadora en grados: cos 120 da −0.5 y sen 120 da 0.866.</li>
      </ol>
      <p>Resultado: <span class="resultado">P ≈ (−0.5, 0.866)</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar el signo y escribir (0.5, 0.866), que es el punto de 60°.</p>`,
    vidaReal: `
      <p>Todo lo que gira o se repite en ciclos se describe con las ideas de esta lección:</p>
      <ul>
        <li>La altura de tu canastilla en una rueda de la fortuna mientras da vueltas.</li>
        <li>Las mareas que suben y bajan, o las horas de luz que cambian a lo largo del año.</li>
        <li>El sonido, la luz y la corriente eléctrica de tu casa, que sube y baja su valor 50 o 60 veces por segundo.</li>
        <li>Los programas que mueven objetos en círculo, como las manecillas de un reloj en la pantalla.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: `<p>90° equivale a ${F('π', 'n')} radianes. ¿Cuánto vale n?</p>`, respuesta: 2,
        pista: '<p>180° = π, y 90° es la mitad.</p>',
        solucion: `<p>Media vuelta, 180°, mide π. Como 90° es la mitad de 180°, mide la mitad de π: 90° = ${F('π', 2)}, así que <strong>n = 2</strong>.</p>` },
      { tipo: 'numero', enunciado: `<p>¿Cuántos grados son ${F('π', 3)} radianes?</p>`, respuesta: 180 / 3,
        pista: '<p>Sustituye π por 180°.</p>',
        solucion: '<p>Como π radianes son 180°, la tercera parte de π es la tercera parte de 180°: 180° ÷ 3 = <strong>60°</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuánto vale cos 180°? (Piensa en el punto del círculo unitario).</p>', respuesta: -1,
        pista: '<p>A 180° el punto está en el extremo izquierdo del círculo.</p>',
        solucion: '<p>El punto es (−1, 0), así que cos 180° = <strong>−1</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué signo tiene sen 210°?</p>', opciones: ['Positivo', 'Negativo', 'Es cero'], correcta: 1,
        pista: '<p>¿En qué cuadrante está 210°? ¿El punto está arriba o abajo del eje x?</p>',
        solucion: '<p>210° está en el cuadrante III, abajo del eje x: el seno es negativo (sen 210° = −0.5).</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la coordenada y del punto del círculo unitario a 90°?</p>', respuesta: 1,
        pista: '<p>A 90° el punto está arriba de todo.</p>',
        solucion: '<p>El punto es (0, 1), así que sen 90° = <strong>1</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Sin calculadora, usando el ángulo de referencia: ¿cuánto vale sen 150°?</p>', respuesta: sen(150), tolerancia: 1e-9,
        pista: '<p>A 150° le faltan 30° para llegar a 180°, y en el cuadrante II el seno es positivo.</p>',
        solucion: `<p>sen 150° = sen 30° = <strong>${F(1, 2)}</strong>.</p>` },
    ],
    fuentes: [AT('7-3-unit-circle', 'Unit Circle'), AT('8-1-graphs-of-the-sine-and-cosine-functions', 'Graphs of the Sine and Cosine Functions'), WIKI('Radián', 'Radián')],
  });

  // ------------------------------------------------------------------
  L('Identidades trigonométricas básicas', {
    objetivo: 'Conocer las identidades trigonométricas fundamentales y usarlas para encontrar razones a partir de una sola.',
    explicacion: `
      <p>Piensa en la igualdad x + x = 2x. No importa qué número pongas en lugar de x: con 3, con 10 o con −7, siempre se cumple. Compárala con x + 1 = 5, que solo es cierta si x vale 4. La primera es una regla que nunca falla; la segunda es una ecuación que hay que resolver.</p>
      <p>En trigonometría también hay reglas que nunca fallan. Una igualdad que se cumple para <em>todos</em> los ángulos, no solo para algunos, se llama <strong>identidad trigonométrica</strong>. Sirven como atajos: si conoces una razón de un ángulo, te ayudan a encontrar las demás sin dibujar el triángulo.</p>
      <h3>La identidad pitagórica</h3>
      <p class="resultado">sen²θ + cos²θ = 1</p>
      <p>Se lee: "seno cuadrado de θ más coseno cuadrado de θ es igual a 1". La escritura sen²θ es una abreviatura de (sen θ)²: primero sacas el seno y después lo elevas al cuadrado.</p>
      <p>¿De dónde sale? Del círculo unitario. El punto (cos θ, sen θ) está a distancia 1 del centro, porque el radio mide 1. Con ese radio como hipotenusa, el coseno como lado horizontal y el seno como lado vertical, Pitágoras dice que cos²θ + sen²θ = 1². Como cualquier ángulo da un punto del círculo, la regla vale para todos.</p>
      <p>Pruébalo con un triángulo de lados 7, 24 y 25: sen θ = 7 ÷ 25 = 0.28 y cos θ = 24 ÷ 25 = 0.96. Entonces 0.0784 + 0.9216 = 1. Funciona.</p>
      <h3>Identidad del cociente</h3>
      <p class="resultado">tan θ = ${F('sen θ', 'cos θ')}</p>
      <p>Dice que la tangente es el seno dividido entre el coseno. La razón: en el círculo unitario, el seno es la subida y el coseno es el avance, y la tangente es subida entre avance. En el triángulo 7-24-25, 0.28 ÷ 0.96 ≈ 0.29, que es justo 7 ÷ 24, la tangente.</p>
      <h3>¿Qué son las razones recíprocas?</h3>
      <p>Si volteas una fracción, obtienes su <strong>recíproco</strong>: el recíproco de ${F(3, 5)} es ${F(5, 3)}. Las tres razones también se pueden voltear, y cada versión volteada tiene nombre propio:</p>
      <ul>
        <li>La <strong>cosecante</strong> es el seno volteado: csc θ = ${F(1, 'sen θ')}.</li>
        <li>La <strong>secante</strong> es el coseno volteado: sec θ = ${F(1, 'cos θ')}.</li>
        <li>La <strong>cotangente</strong> es la tangente volteada: cot θ = ${F(1, 'tan θ')}.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> pensar que la secante es el recíproco del seno porque las dos empiezan con "se". Es al revés: la secante va con el coseno y la cosecante con el seno.</p>
      <h3>Ángulos complementarios</h3>
      <p>Dos ángulos son complementarios si suman 90°, como 30° y 60°. En un triángulo rectángulo, los dos ángulos agudos siempre lo son.</p>
      <p class="resultado">sen(90° − θ) = cos θ y cos(90° − θ) = sen θ</p>
      <p>¿Por qué? Si te cambias a la otra esquina aguda, el cateto que antes era opuesto ahora es adyacente, y al revés. Así, el seno de un ángulo es el coseno del otro. De ahí viene el nombre <em>co</em>-seno: el seno del complemento.</p>`,
    ejemplo: `
      <p>Si sen θ = ${F(8, 17)} y θ está en el cuadrante II, encuentra cos θ y tan θ.</p>
      <ol class="pasos-ej">
        <li>Primero usa la identidad pitagórica para encontrar el coseno. Despeja: cos²θ = 1 − sen²θ. El seno al cuadrado es ${F(64, 289)}, así que cos²θ = 1 − ${F(64, 289)} = ${F(225, 289)}.</li>
        <li>Saca raíz cuadrada. Un número y su negativo tienen el mismo cuadrado, así que cos θ = ${F(15, 17)} o cos θ = −${F(15, 17)}.</li>
        <li>Elige el signo con el cuadrante. En el cuadrante II el punto está a la izquierda, y ahí el coseno es negativo: cos θ = −${F(15, 17)}.</li>
        <li>Ahora usa la identidad del cociente: tan θ = ${F('sen θ', 'cos θ')} = ${F(8, 17)} ÷ (−${F(15, 17)}) = −${F(8, 15)}.</li>
        <li>Comprueba: ${F(64, 289)} + ${F(225, 289)} = ${F(289, 289)} = 1.</li>
      </ol>
      <p>Resultado: <span class="resultado">cos θ = −${F(15, 17)} y tan θ = −${F(8, 15)}</span>.</p>
      <p class="nota"><strong>Error común:</strong> quedarse con la raíz positiva sin mirar el cuadrante.</p>`,
    vidaReal: `
      <p>Las reglas que siempre se cumplen sirven como atajos y como forma de revisar tus cuentas:</p>
      <ul>
        <li>En física e ingeniería, para acortar fórmulas largas sobre ondas, rampas o circuitos eléctricos.</li>
        <li>En los videojuegos y programas en 3D, para que un objeto que gira no se estire ni se encoja.</li>
        <li>Para detectar errores: si una de estas reglas no se cumple con tus resultados, sabes que algo salió mal.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Si sen θ = 0.6 y θ está en el primer cuadrante, ¿cuánto vale cos θ?</p>', respuesta: Math.sqrt(1 - 0.36), tolerancia: 1e-9,
        pista: '<p>cos²θ = 1 − 0.6².</p>',
        solucion: '<p>cos²θ = 1 − 0.36 = 0.64, así que cos θ = <strong>0.8</strong> (positivo en el cuadrante I).</p>' },
      { tipo: 'numero', enunciado: '<p>Con el mismo ángulo (sen θ = 0.6, cos θ = 0.8), ¿cuánto vale tan θ?</p>', respuesta: 0.6 / 0.8, tolerancia: 1e-9,
        pista: `<p>tan θ = ${F('sen θ', 'cos θ')}.</p>`,
        solucion: '<p>La tangente es el seno entre el coseno: 0.6 ÷ 0.8 = <strong>0.75</strong>.</p>' },
      { tipo: 'numero', enunciado: `<p>Si cos θ = ${F(5, 13)} y θ está en el cuadrante IV, ¿cuánto vale sen θ? (Fracción o decimal con dos decimales).</p>`, respuesta: -12 / 13, tolerancia: tol2,
        pista: '<p>sen²θ = 1 − (5/13)². En el cuadrante IV el seno es negativo.</p>',
        solucion: `<p>sen²θ = 1 − ${F(25, 169)} = ${F(144, 169)} → sen θ = <strong>−${F(12, 13)}</strong> ≈ −0.92.</p>` },
      { tipo: 'numero', enunciado: '<p>Sin calculadora: ¿cuánto vale sen²(37°) + cos²(37°)?</p>', respuesta: sen(37) ** 2 + cos(37) ** 2, tolerancia: 1e-9,
        pista: '<p>Es la identidad pitagórica.</p>',
        solucion: '<p>Para cualquier ángulo, sen²θ + cos²θ = <strong>1</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>sen(90° − 25°) es igual a…</p>', opciones: ['cos 25°', 'sen 25°', '−cos 25°', 'tan 25°'], correcta: 0,
        pista: '<p>Usa la identidad de los ángulos complementarios.</p>',
        solucion: '<p>25° y 65° suman 90°, así que son complementarios. Como sen(90° − θ) = cos θ, sen 65° = <strong>cos 25°</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas igualdades es una identidad (verdadera para todo ángulo donde esté definida)?</p>',
        opciones: ['sen θ + cos θ = 1', 'tan θ = sen θ ÷ cos θ', 'sen(2θ) = 2 · sen θ'], correcta: 1,
        pista: '<p>Prueba las otras con θ = 30°: ¿se cumplen?</p>',
        solucion: '<p>tan θ = sen θ ÷ cos θ siempre se cumple. Con 30°: sen + cos ≈ 1.37 (no 1), y sen 60° ≈ 0.87 mientras que 2 · sen 30° = 1.</p>' },
    ],
    fuentes: [AT('9-1-verifying-trigonometric-identities-and-using-trigonometric-identities-to-simplify-trigonometric-expressions', 'Verifying Trigonometric Identities'), WIKI('Identidades_trigonométricas', 'Identidades trigonométricas'), KHAN],
  });
})();
