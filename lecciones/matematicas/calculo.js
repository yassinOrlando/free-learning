// Matemáticas · Unidad 8: Introducción al cálculo.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const F = window.fraccion;
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('matematicas', titulo, datos);
  const oculta = (desde, hasta) => ({ tipo: 'linea', desde, hasta, punteada: true });

  const CV = (pagina, nombre) => ({ nombre: `OpenStax, Calculus Volume 1: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/calculus-volume-1/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN_D = { nombre: 'Khan Academy en español: Cálculo diferencial', url: 'https://es.khanacademy.org/math/differential-calculus' };
  const KHAN_I = { nombre: 'Khan Academy en español: Cálculo integral', url: 'https://es.khanacademy.org/math/integral-calculus' };

  // ------------------------------------------------------------------
  L('Límites: acercarse sin llegar', {
    objetivo: 'Entender la idea de límite, calcular límites sencillos por sustitución o factorización, y reconocer límites al infinito.',
    explicacion: `
      <p>Imagina que caminas hacia una pared, y en cada paso recorres la mitad de lo que te falta. Si estás a 1 metro, avanzas medio metro; luego un cuarto; luego un octavo. Nunca llegas a tocarla, pero cada vez estás más cerca. Esa idea de "hacia dónde se dirige algo, aunque no llegue" es la base de todo el cálculo.</p>
      <p>Recuerda que una <strong>función</strong> es una regla: le das un número x y te devuelve otro, que se escribe f(x). A veces no nos interesa lo que vale la función justo en un número, sino a qué valor se va acercando cuando x se acerca a ese número. Ese valor se llama <strong>límite</strong>.</p>
      <p>Se escribe así: <strong>lím<sub>x→a</sub> f(x) = L</strong>. Se lee "el límite de f de x, cuando x tiende a a, es L". La flecha x→a quiere decir <strong>x se acerca cada vez más al número a</strong>, por la izquierda y por la derecha. La letra L es <strong>el valor al que se acerca la función</strong>. Fíjate que no dice nada sobre lo que pasa exactamente en a; solo mira lo que pasa <strong>cerca</strong>.</p>
      <h3>¿Qué pasa cerca de un hueco?</h3>
      <p>Mira la función f(x) = ${F('x² − 1', 'x − 1')}. Si pones x = 1, abajo queda 1 − 1 = 0, y no se puede dividir entre cero. Así que f(1) no existe. Pero puedes probar con números muy cercanos a 1, un poco más chicos y un poco más grandes:</p>
      <div class="tabla-wrap"><table>
        <tr><th>x</th><td>0.9</td><td>0.99</td><td>0.999</td><td>1</td><td>1.001</td><td>1.01</td><td>1.1</td></tr>
        <tr><th>f(x)</th><td>1.9</td><td>1.99</td><td>1.999</td><td>no existe</td><td>2.001</td><td>2.01</td><td>2.1</td></tr>
      </table></div>
      <p>Lee la fila de abajo de izquierda a derecha. Desde el lado izquierdo, los resultados son 1.9, 1.99, 1.999: cada vez más cerca de 2. Desde el lado derecho, 2.1, 2.01, 2.001: también se acercan a 2. Como los dos lados coinciden, el límite es 2, aunque f(1) no exista. En la gráfica, la función es una recta con un "hueco" justo en el punto (1, 2), como un camino al que le falta una sola baldosa:</p>
      ${G({ x: [-2, 4], y: [-1, 5], proporcional: true, descripcion: 'Recta y igual a x más 1 con un hueco (círculo vacío) en el punto (1, 2), donde la función no existe.', funciones: [{ f: (x) => (Math.abs(x - 1) < 0.02 ? NaN : x + 1), etiqueta: 'y = (x² − 1)/(x − 1)' }], figuras: [{ tipo: 'circulo', x: 1, y: 2, r: 0.12, serie: 1 }, { tipo: 'texto', x: 1.85, y: 1.6, texto: 'hueco en (1, 2)' }] })}
      <h3>¿Cómo se calcula un límite sin hacer tablas?</h3>
      <p>Las tablas sirven para entender la idea, pero son lentas. Hay dos caminos más rápidos.</p>
      <p>El primero es la <strong>sustitución directa</strong>: pones el número en la función y ya. Funciona cuando la función no tiene huecos ni saltos en ese punto, como pasa con los polinomios (sumas de potencias de x, como x² + 1). Por ejemplo, lím<sub>x→3</sub> (x² + 1) = 10, porque 3² + 1 = 10.</p>
      <p>El segundo es <strong>factorizar</strong>. Si al sustituir te sale ${F(0, 0)}, eso no es una respuesta: es una señal de que hay un hueco escondido. Entonces factoriza y tacha lo que se repite arriba y abajo. Aquí sirve la diferencia de cuadrados que ya viste: x² − 1 = (x + 1)(x − 1). Así, ${F('x² − 1', 'x − 1')} = ${F('(x + 1)(x − 1)', 'x − 1')} = x + 1, que en x = 1 vale 2. Puedes tachar x − 1 porque, cerca de 1, x − 1 es un número muy pequeño pero no es cero.</p>
      <h3>¿Qué pasa cuando x crece sin parar?</h3>
      <p>También puedes preguntar hacia dónde va una función cuando x se vuelve enorme. Eso se escribe x→∞, y el símbolo ∞ se lee "infinito". Piensa en repartir 1 pizza entre x personas: con 10 personas, a cada una le toca 0.1; con 100, le toca 0.01; con 1 000, 0.001. Mientras más gente, más se acerca a nada. Por eso lím<sub>x→∞</sub> ${F(1, 'x')} = 0.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que ${F(0, 0)} vale 0 o vale 1. No vale nada en particular: solo te avisa que debes simplificar antes de sustituir.</p>`,
    ejemplo: `
      <p>Calcula lím<sub>x→2</sub> ${F('x² − 4', 'x − 2')}.</p>
      <ol class="pasos-ej">
        <li>Primero intenta sustituir x = 2. Arriba queda 4 − 4 = 0 y abajo 2 − 2 = 0. Sale ${F(0, 0)}, así que hay un hueco y hay que simplificar.</li>
        <li>Factoriza el numerador como diferencia de cuadrados: x² − 4 = (x + 2)(x − 2). La fracción queda ${F('(x + 2)(x − 2)', 'x − 2')}. Como x se acerca a 2 sin llegar, x − 2 no es cero y puedes tacharlo arriba y abajo. Queda x + 2.</li>
        <li>Ahora sí sustituye: 2 + 2 = 4.</li>
        <li>Comprueba con un número cercano. Con x = 2.01, arriba da 4.0401 − 4 = 0.0401 y abajo 0.01. Al dividir sale 4.01, muy cerca de 4.</li>
      </ol>
      <p>Resultado: <span class="resultado">el límite es 4</span>.</p>
      <p class="nota"><strong>Error común:</strong> decir que el límite no existe porque salió ${F(0, 0)}. Esa división solo indica un hueco; el límite casi siempre se encuentra al simplificar.</p>`,
    vidaReal: `
      <p>Muchas preguntas de todos los días son del tipo "¿hacia dónde va esto?", aunque nunca llegue del todo:</p>
      <ul>
        <li>Saber qué tan rápido va un auto justo en un instante, y no solo en todo el viaje.</li>
        <li>Calcular cuánto crece el dinero en el banco si los intereses se suman cada vez más seguido.</li>
        <li>Predecir que un café caliente se irá enfriando hasta quedar a la temperatura del cuarto.</li>
        <li>Saber que un medicamento va desapareciendo del cuerpo con el paso de las horas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Calcula lím<sub>x→3</sub> (2x + 1).</p>', respuesta: 2 * 3 + 1,
        pista: '<p>Es un polinomio: sustituye directamente.</p>',
        solucion: '<p>Una recta no tiene huecos, así que lo que vale cerca de 3 es lo mismo que vale en 3: 2(3) + 1 = <strong>7</strong>.</p>' },
      { tipo: 'numero', enunciado: `<p>Calcula lím<sub>x→5</sub> ${F('x² − 25', 'x − 5')}.</p>`, respuesta: 5 + 5,
        pista: '<p>Si sustituyes, sale 0/0. Escribe x² − 25 como diferencia de cuadrados.</p>',
        solucion: '<p>x² − 25 = (x + 5)(x − 5). Al tachar x − 5 arriba y abajo queda x + 5, y al sustituir sale 5 + 5 = <strong>10</strong>.</p>' },
      { tipo: 'numero', enunciado: `<p>Calcula lím<sub>x→∞</sub> ${F(1, 'x')}.</p>`, respuesta: 0,
        pista: '<p>Divide 1 entre números cada vez más grandes.</p>',
        solucion: '<p>Con x = 10, 100 y 1 000, 1/x vale 0.1, 0.01 y 0.001. Se acerca a cero tanto como quieras, así que el límite es <strong>0</strong>.</p>' },
      { tipo: 'numero', enunciado: `<p>Calcula lím<sub>x→∞</sub> (3 + ${F(1, 'x')}).</p>`, respuesta: 3,
        pista: '<p>¿A qué se acerca 1/x?</p>',
        solucion: '<p>Cuando x crece sin parar, 1/x se acerca a 0 y el 3 no cambia. Por eso el límite es 3 + 0 = <strong>3</strong>.</p>' },
      { tipo: 'numero', enunciado: `<p>Para f(x) = x²: f(1.9) = 3.61, f(1.99) = 3.9601, f(2.01) = 4.0401 y f(2.1) = 4.41. Según la tabla, ¿a qué valor se acerca f(x) cuando x se acerca a 2?</p>`, respuesta: 4,
        pista: '<p>Mira qué pasa por los dos lados de 2.</p>',
        solucion: '<p>Por ambos lados se acerca a <strong>4</strong> (y en efecto, 2² = 4).</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Puede existir el límite de una función en x = a aunque f(a) no exista?</p>', opciones: ['Sí', 'No'], correcta: 0,
        pista: '<p>Recuerda el ejemplo del hueco.</p>',
        solucion: '<p>Sí: el límite depende de lo que pasa cerca de a, no en a. En el ejemplo, f(1) no existe pero el límite es 2.</p>' },
    ],
    fuentes: [CV('2-2-the-limit-of-a-function', 'The Limit of a Function'), CV('2-3-the-limit-laws', 'The Limit Laws'), WIKI('Límite_de_una_función', 'Límite de una función')],
  });

  // ------------------------------------------------------------------
  L('La derivada como razón de cambio', {
    objetivo: 'Entender la derivada como la pendiente de la tangente y como la razón de cambio instantánea, y estimarla con secantes.',
    explicacion: `
      <p>Piensa en un viaje en auto de 200 km que dura 4 horas. Si divides, te sale 50 km/h. Pero eso no quiere decir que el auto fue siempre a 50: hubo semáforos, curvas y tramos de carretera libre. El número que marca el velocímetro cambia a cada momento. En esta lección vas a ver cómo se calcula ese número "de cada momento", que se llama <strong>derivada</strong>.</p>
      <h3>¿Cuánto cambió, en promedio?</h3>
      <p>Recuerda que la <strong>pendiente</strong> de una recta dice cuánto sube por cada paso que avanza: la subida entre el avance. Con una curva puedes hacer lo mismo entre dos de sus puntos. Une los dos puntos con una recta; esa recta se llama <strong>secante</strong>. Su pendiente es el cambio promedio entre esos puntos:</p>
      <p class="resultado">${F('f(b) − f(a)', 'b − a')}</p>
      <p>Léelo así: arriba va <strong>cuánto cambió el resultado</strong> de la función, y abajo <strong>cuánto cambió x</strong>, del número a al número b. Si f(x) es la distancia que lleva recorrida un auto y x es el tiempo, esta división es distancia entre tiempo: la <strong>velocidad media</strong>, como los 50 km/h del viaje.</p>
      <h3>¿Y en un solo instante?</h3>
      <p>El problema es que para un solo instante no hay "dos puntos": el tiempo no avanza y la división quedaría ${F(0, 0)}. La salida es la idea de la lección anterior, el límite. Toma el segundo punto cada vez más cerca del primero. A la distancia entre los dos la llamamos <strong>h</strong>: h es <strong>qué tanto te separas del punto a</strong>. Si h es 1 segundo, ves el promedio de un segundo; si es 0.01, el de una centésima. Mientras más pequeño h, más se parece el promedio a lo que pasa justo en el instante a.</p>
      <p>Mira lo que le pasa a la secante en la gráfica de y = x². Cuando el segundo punto se acerca a (1, 1), la secante gira poco a poco hasta quedar como la <strong>tangente</strong>: la recta que solo roza la curva en ese punto, como una regla apoyada en una pelota.</p>
      ${G({ x: [-1, 3], y: [-1, 6], proporcional: true, descripcion: 'Curva y igual a x cuadrada. La secante que une (1, 1) y (2, 4) tiene pendiente 3; la tangente en (1, 1) tiene pendiente 2 y solo toca la curva en ese punto.',
        funciones: [{ f: (x) => x * x, etiqueta: 'y = x²' }, { f: (x) => 3 * x - 2, etiqueta: 'secante (pendiente 3)', serie: 1 }, { f: (x) => 2 * x - 1, etiqueta: 'tangente (pendiente 2)', serie: 2 }],
        puntos: [{ x: 1, y: 1, etiqueta: '(1, 1)' }, { x: 2, y: 4, etiqueta: '(2, 4)' }] })}
      <p>La secante de la figura, de (1, 1) a (2, 4), tiene pendiente 3. La tangente en (1, 1) tiene pendiente 2. La pendiente de esa tangente es la derivada, y se escribe <strong>f′(a)</strong>, que se lee "f prima de a":</p>
      <p class="resultado">f′(a) = lím<sub>h→0</sub> ${F('f(a + h) − f(a)', 'h')}</p>
      <p>En palabras: calcula el cambio promedio entre a y un punto que está h más adelante, y mira a qué número se acerca cuando h se hace casi cero. Ese número dice <strong>qué tan rápido cambia la función justo en a</strong>. Por eso a la derivada también se le llama <strong>razón de cambio instantánea</strong>: "razón" quiere decir división, y "instantánea", en un solo instante.</p>
      <p>Si f es la distancia recorrida, f′ es la velocidad que marca el velocímetro. Si la derivada es grande, la curva está muy empinada y cambia rápido. Si es cero, en ese punto la curva está plana por un momento.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir el valor de la función con su derivada. f(1) = 1 dice <em>dónde</em> está la curva; f′(1) = 2 dice <em>qué tan rápido sube</em> en ese punto.</p>`,
    ejemplo: `
      <p>Estima la pendiente de f(x) = x² en x = 1 con secantes cada vez más cortas.</p>
      <p>La idea es calcular el cambio promedio entre x = 1 y un punto un poco más adelante, y ver a qué número se acercan los resultados. Por ejemplo, con h = 0.1, el segundo punto es x = 1.1, y f(1.1) = 1.1 × 1.1 = 1.21. Como f(1) = 1, la división es ${F('1.21 − 1', 0.1)} = ${F('0.21', '0.1')} = 2.1. Repite lo mismo con h cada vez más pequeño:</p>
      <div class="tabla-wrap"><table>
        <tr><th>h</th><th>${F('f(1 + h) − f(1)', 'h')}</th></tr>
        <tr><td>1</td><td>${F('4 − 1', 1)} = 3</td></tr>
        <tr><td>0.1</td><td>${F('1.21 − 1', 0.1)} = 2.1</td></tr>
        <tr><td>0.01</td><td>${F('1.0201 − 1', 0.01)} = 2.01</td></tr>
        <tr><td>0.001</td><td>2.001</td></tr>
      </table></div>
      <p>Fíjate en el patrón: 3, 2.1, 2.01, 2.001. Cada vez se pega más al 2. La primera fila es la secante de la figura.</p>
      <p>Resultado: <span class="resultado">f′(1) = 2</span>, la pendiente de la tangente de la figura.</p>
      <p class="nota"><strong>Error común:</strong> poner h = 0 desde el principio. Eso da ${F(0, 0)}; hay que ver hacia dónde van los resultados.</p>`,
    vidaReal: `
      <p>Siempre que importa qué tan rápido cambia algo en este preciso momento, aparece la idea de esta lección:</p>
      <ul>
        <li>El velocímetro de un auto o de una bicicleta te dice tu rapidez en cada instante, no la del viaje completo.</li>
        <li>Una fábrica quiere saber cuánto le cuesta hacer una pieza más.</li>
        <li>Los médicos vigilan qué tan rápido sube la fiebre o se propaga una enfermedad.</li>
        <li>Un pronóstico del clima mide qué tan rápido baja la temperatura en la noche.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Para f(x) = x², ¿cuál es la pendiente de la secante entre x = 1 y x = 3?</p>', respuesta: (9 - 1) / (3 - 1),
        pista: `<p>Calcula f(3) y f(1), y usa ${F('f(3) − f(1)', '3 − 1')}.</p>`,
        solucion: `<p>f(3) = 9 y f(1) = 1, así que el resultado cambia 8 mientras x avanza 2: ${F('9 − 1', 2)} = <strong>4</strong>.</p>` },
      { tipo: 'numero', enunciado: '<p>La posición de una pelota que cae es s(t) = 5t² metros. ¿Cuál es su velocidad media entre t = 1 s y t = 3 s, en m/s?</p>', respuesta: (5 * 9 - 5 * 1) / (3 - 1),
        pista: '<p>Calcula dónde está la pelota en t = 3 y en t = 1, y divide la distancia entre el tiempo.</p>',
        solucion: `<p>s(3) = 5 × 9 = 45 m y s(1) = 5 m. Recorre 40 m en 2 s: ${F('45 − 5', '3 − 1')} = <strong>20 m/s</strong>.</p>` },
      { tipo: 'numero', enunciado: '<p>Un auto recorre 150 km en 2 horas. ¿Cuál fue su velocidad media en km/h?</p>', respuesta: 150 / 2,
        pista: '<p>La velocidad media es la distancia entre el tiempo.</p>',
        solucion: '<p><strong>75 km/h</strong>. En algunos momentos fue más rápido y en otros más lento.</p>' },
      { tipo: 'numero', enunciado: `<p>Para f(x) = x³ se calculó ${F('f(2 + h) − f(2)', 'h')} con h cada vez más pequeño: 12.61 (h = 0.1), 12.0601 (h = 0.01) y 12.006 (h = 0.001). ¿Cuál es f′(2)?</p>`, respuesta: 12,
        pista: '<p>¿A qué número se acercan esos valores?</p>',
        solucion: '<p>Los valores 12.61, 12.0601 y 12.006 se pegan cada vez más a 12 cuando h se acerca a 0. Ese número es la derivada: f′(2) = <strong>12</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Gráficamente, f′(a) es…</p>', opciones: ['El valor de la función en a', 'La pendiente de la recta tangente en a', 'El área bajo la curva hasta a'], correcta: 1,
        pista: '<p>Recuerda la figura de la secante que se convierte en tangente.</p>',
        solucion: '<p>Es la pendiente de la recta tangente: la secante se convierte en tangente cuando los dos puntos se juntan. El valor en a es solo la altura de la curva.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la derivada de f(x) = 3x + 5 en cualquier punto?</p>', respuesta: 3,
        pista: '<p>Es una recta: su tangente es ella misma.</p>',
        solucion: '<p>La pendiente de la recta es siempre <strong>3</strong>: cambia al mismo ritmo en todas partes.</p>' },
    ],
    fuentes: [CV('2-1-a-preview-of-calculus', 'A Preview of Calculus'), CV('3-1-defining-the-derivative', 'Defining the Derivative'), WIKI('Derivada', 'Derivada')],
  });

  // ------------------------------------------------------------------
  L('Reglas básicas de derivación', {
    objetivo: 'Derivar polinomios con las reglas de la constante, la potencia, la constante por función y la suma, y usar la derivada para calcular pendientes y velocidades.',
    explicacion: `
      <p>En la lección anterior encontraste que la pendiente de y = x² en x = 1 es 2. Para eso hiciste una tabla entera de secantes. Imagina repetir esa tabla para cada punto y para cada función: sería como sumar 25 + 25 + 25 + 25 a mano en lugar de multiplicar 4 × 25. Por suerte, al hacer muchas de esas tablas aparecen patrones, y esos patrones se convierten en reglas cortas.</p>
      <p>Recuerda que la <strong>derivada</strong> f′(x) dice qué tan rápido cambia f en cada punto: es la pendiente de la tangente. Ahora la vas a ver como una nueva función, que te da esa pendiente para cualquier x.</p>
      <h3>¿Cuál es el patrón de las potencias?</h3>
      <p>Mira lo que ya sabes. La derivada de x² en x = 1 dio 2. Si haces la misma tabla en x = 3, sale 6; en x = 5, sale 10. Siempre sale el doble de x, así que (x²)′ = 2x. Con x³ en x = 2 salió 12, que es 3 × 2². Fíjate que el exponente "bajó" a multiplicar, y la potencia quedó con un exponente menos.</p>
      <p>Eso pasa con cualquier potencia, y se llama <strong>regla de la potencia</strong>:</p>
      <p class="resultado">(xⁿ)′ = n·xⁿ⁻¹</p>
      <p>Aquí n es <strong>el exponente</strong>, un número entero positivo como 2, 3 o 4. En palabras: <strong>baja el exponente a multiplicar y réstale uno</strong>. Así, (x⁴)′ = 4x³. Como x es lo mismo que x¹, su derivada es 1·x⁰ = 1, porque cualquier número (distinto de cero) elevado a 0 vale 1. Tiene sentido: y = x es una recta que sube 1 en cada paso.</p>
      <h3>Las otras tres reglas</h3>
      <p>Cada una tiene una razón que puedes imaginar:</p>
      <ul>
        <li><strong>Constante.</strong> Una función que siempre vale lo mismo, como f(x) = 7, no cambia nunca. Su gráfica es una recta acostada, con pendiente 0. Por eso su derivada es 0.</li>
        <li><strong>Constante por función.</strong> Si multiplicas una función por 5, todas sus alturas se vuelven 5 veces más grandes, y también lo que sube en cada paso. Por eso la derivada se multiplica por el mismo número: (5x²)′ = 5 · 2x = 10x.</li>
        <li><strong>Suma y resta.</strong> Si dos cosas cambian al mismo tiempo, el cambio total es la suma de los cambios. Es como tu ahorro cuando recibes sueldo y además vendes algo: crece por las dos razones. Con una resta pasa igual, pero restando. Por eso puedes derivar término por término.</li>
      </ul>
      <p>Esta tabla junta las cuatro reglas. La letra c es <strong>un número fijo</strong>, y f y g son dos funciones cualquiera:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Regla</th><th>Fórmula</th><th>Ejemplo</th></tr>
        <tr><td>Constante</td><td>(c)′ = 0</td><td>(7)′ = 0</td></tr>
        <tr><td>Potencia</td><td>(xⁿ)′ = n·xⁿ⁻¹</td><td>(x⁴)′ = 4x³</td></tr>
        <tr><td>Constante por función</td><td>(c·f)′ = c·f′</td><td>(5x²)′ = 5 · 2x = 10x</td></tr>
        <tr><td>Suma (y resta)</td><td>(f + g)′ = f′ + g′</td><td>(x² + x)′ = 2x + 1</td></tr>
      </table></div>
      <h3>Pendiente en un punto</h3>
      <p>Con las reglas obtienes la derivada para cualquier x. Si quieres la pendiente en un punto concreto, primero deriva y después sustituye ese valor de x. Por ejemplo, si f(x) = x², entonces f′(x) = 2x, y en x = 1 da 2, lo mismo que encontraste con la tabla.</p>
      <p class="nota"><strong>Trampa común:</strong> derivar un número suelto como si fuera x. La derivada de 7 es 0, no 7 ni 1.</p>`,
    ejemplo: `
      <p>Deriva f(x) = 4x³ − 5x² + 7x − 2 y calcula la pendiente en x = 1.</p>
      <ol class="pasos-ej">
        <li>Por la regla de la suma, deriva cada término por separado. En 4x³, el 4 se queda y x³ se vuelve 3x², así que (4x³)′ = 4 · 3x² = 12x². En −5x², el −5 se queda y x² se vuelve 2x: (−5x²)′ = −10x. En 7x, x se vuelve 1: (7x)′ = 7. El −2 no cambia nunca: (−2)′ = 0.</li>
        <li>Junta los resultados: f′(x) = 12x² − 10x + 7.</li>
        <li>Para la pendiente en x = 1, sustituye: f′(1) = 12(1) − 10(1) + 7 = 9.</li>
        <li>Comprueba con una secante muy corta: f(1) = 4 y f(1.001) ≈ 4.009, así que el cambio promedio es cerca de ${F('0.009', '0.001')} = 9.</li>
      </ol>
      <p>Resultado: <span class="resultado">f′(x) = 12x² − 10x + 7 y la pendiente en x = 1 es 9</span>.</p>
      <p class="nota"><strong>Error común:</strong> sustituir x = 1 en f en vez de en f′. Eso da la altura, 4, no la pendiente.</p>`,
    vidaReal: `
      <p>Hay un atajo para saber qué tan rápido cambia algo sin hacer tablas largas, y es lo que vas a aprender aquí. Mucha gente lo usa:</p>
      <ul>
        <li>En deportes y en física, para pasar de la posición de una pelota a su velocidad.</li>
        <li>En un negocio, para saber cuánto cambia la ganancia al vender una pieza más.</li>
        <li>En los programas de inteligencia artificial, que "aprenden" corrigiendo sus errores poco a poco con estos cálculos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'expresion', simplificar: true, enunciado: '<p>Deriva f(x) = x⁵. Escribe f′(x).</p>', respuesta: '5x^4',
        pista: '<p>Baja el 5 y réstale 1 al exponente.</p>',
        solucion: '<p>Por la regla de la potencia, el 5 baja a multiplicar y el exponente queda en 5 − 1 = 4: f′(x) = <strong>5x⁴</strong>.</p>' },
      { tipo: 'expresion', simplificar: true, enunciado: '<p>Deriva f(x) = 3x² + 4x − 7.</p>', respuesta: '6x + 4',
        pista: '<p>Término a término: (3x²)′, (4x)′ y (−7)′.</p>',
        solucion: '<p>Deriva cada término: (3x²)′ = 3 · 2x = 6x, (4x)′ = 4 y (−7)′ = 0, porque un número solo no cambia. Queda <strong>6x + 4</strong>.</p>' },
      { tipo: 'expresion', simplificar: true, enunciado: '<p>Deriva f(x) = x³ − 6x² + 2.</p>', respuesta: '3x^2 - 12x',
        pista: '<p>Deriva término por término. ¿Qué le pasa al 2, que va solo?</p>',
        solucion: '<p>(x³)′ = 3x², (−6x²)′ = −6 · 2x = −12x y (2)′ = 0. Queda <strong>3x² − 12x</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si f(x) = x² + 3x, ¿cuánto vale la pendiente de la tangente en x = 2?</p>', respuesta: 2 * 2 + 3,
        pista: '<p>Primero deriva f(x) y después sustituye x = 2 en la derivada.</p>',
        solucion: '<p>La derivada es f′(x) = 2x + 3. En x = 2 vale f′(2) = 4 + 3 = <strong>7</strong>: ahí la curva sube 7 por cada paso.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la derivada de f(x) = 10?</p>', respuesta: 0,
        pista: '<p>¿Cambia una constante?</p>',
        solucion: '<p>f(x) = 10 vale lo mismo para cualquier x: su gráfica es una recta horizontal, con pendiente <strong>0</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>La posición de un objeto es s(t) = 4t² + 2t metros. ¿Cuál es su velocidad en t = 3 segundos (en m/s)?</p>', respuesta: 8 * 3 + 2,
        pista: '<p>La velocidad es la derivada de la posición. Deriva s(t) y sustituye t = 3.</p>',
        solucion: '<p>s′(t) = 4 · 2t + 2 = 8t + 2. En t = 3, s′(3) = 24 + 2 = <strong>26 m/s</strong>.</p>' },
    ],
    fuentes: [CV('3-3-differentiation-rules', 'Differentiation Rules'), WIKI('Derivada', 'Derivada'), KHAN_D],
  });

  // ------------------------------------------------------------------
  L('Máximos y mínimos: optimizar', {
    objetivo: 'Usar la derivada para encontrar máximos y mínimos y resolver problemas de optimización de la vida real.',
    explicacion: `
      <p>Imagina que caminas por un cerro. Mientras subes, el camino se inclina hacia arriba. Cuando bajas, se inclina hacia abajo. Justo en la cima hay un instante en el que no subes ni bajas: el piso está plano bajo tus pies. Lo mismo pasa en el fondo de un valle. Esa observación tan sencilla es la herramienta más útil del cálculo para encontrar "lo mejor": la mayor ganancia, el menor gasto, el área más grande.</p>
      <p>El punto más alto de una curva en una zona se llama <strong>máximo</strong>, y el más bajo, <strong>mínimo</strong>. Buscar un máximo o un mínimo se llama <strong>optimizar</strong>.</p>
      <h3>¿Qué dice la derivada en la cima?</h3>
      <p>Recuerda que la derivada f′(x) es la pendiente de la tangente: cuánto sube la curva por cada paso en ese punto. En la cima el camino está plano, así que la tangente es horizontal y su pendiente es cero. Por eso, en un máximo o un mínimo de una curva suave (sin picos) se cumple:</p>
      <p class="resultado">f′(x) = 0</p>
      <p>En palabras: <strong>en la cima o en el fondo, la curva no sube ni baja</strong>. Mira la línea punteada de la gráfica, que es la tangente en la cima:</p>
      ${G({ x: [-1, 5], y: [-1, 5.5], proporcional: true, descripcion: 'Parábola y igual a menos x cuadrada más 4x con máximo en (2, 4), donde la tangente es horizontal (línea punteada y igual a 4).',
        funciones: [{ f: (x) => -x * x + 4 * x, etiqueta: 'y = −x² + 4x' }], figuras: [oculta([0.3, 4], [3.7, 4])],
        puntos: [{ x: 2, y: 4, etiqueta: 'máximo (2, 4): f′ = 0' }] })}
      <h3>¿Cómo sé si es cima o fondo?</h3>
      <p>El signo de la derivada te dice hacia dónde va la curva en un tramo (un intervalo), leyendo de izquierda a derecha:</p>
      <ul>
        <li>Si f′(x) &gt; 0, la pendiente es positiva y la función <strong>crece</strong>: va de subida.</li>
        <li>Si f′(x) &lt; 0, la pendiente es negativa y la función <strong>decrece</strong>: va de bajada.</li>
      </ul>
      <p>Ahora piensa en el cerro. Si antes del punto ibas subiendo y después bajando, estás en una cima: es un <strong>máximo</strong>. Si antes bajabas y después subes, estás en un valle: es un <strong>mínimo</strong>. Dicho con la derivada: si f′ pasa de positiva a negativa, hay un máximo; si pasa de negativa a positiva, hay un mínimo.</p>
      <p>En la figura, f(x) = −x² + 4x. Con las reglas de la lección anterior, f′(x) = −2x + 4. Esa derivada vale 0 cuando 2x = 4, o sea, en x = 2. Prueba un número a cada lado: f′(1) = 2, positiva, así que antes de 2 la curva sube; f′(3) = −2, negativa, así que después baja. Es un máximo, y su altura es f(2) = −4 + 8 = 4.</p>
      <h3>Pasos para optimizar</h3>
      <p>En los problemas reales nadie te da la función: tienes que armarla. Estos pasos te guían:</p>
      <ol>
        <li>Identifica qué quieres maximizar o minimizar y escríbelo como función de una sola variable, una sola letra que puedas cambiar.</li>
        <li>Deriva e iguala a cero, para encontrar dónde la curva queda plana.</li>
        <li>Resuelve y comprueba que sea máximo o mínimo, revisando el signo de la derivada a cada lado. Revisa también que tenga sentido: una longitud no puede ser negativa.</li>
      </ol>
      <p class="nota"><strong>Trampa común:</strong> quedarte con el valor de x y olvidar la pregunta. Si te piden la ganancia máxima, aún falta sustituir esa x en la función.</p>`,
    ejemplo: `
      <p>Tienes 100 m de cerca para un corral rectangular. ¿Qué medidas dan la mayor área?</p>
      <ol class="pasos-ej">
        <li>Arma la función. Si un lado mide x, los dos lados iguales usan 2x. Quedan 100 − 2x metros para los otros dos lados, así que cada uno mide la mitad: 50 − x. Comprueba: 2x + 2(50 − x) = 100.</li>
        <li>El área de un rectángulo es largo por ancho: A(x) = x(50 − x) = 50x − x².</li>
        <li>Deriva e iguala a cero: A′(x) = 50 − 2x = 0, así que 2x = 50 y x = 25.</li>
        <li>El otro lado mide 50 − 25 = 25. Antes de 25, A′ es positiva (el área crece) y después es negativa (decrece): es un máximo.</li>
        <li>Comprueba con medidas vecinas: 24 × 26 = 624 m², menos que 25 × 25 = 625 m².</li>
      </ol>
      <p>Resultado: <span class="resultado">un cuadrado de 25 × 25 m, con 625 m²</span>.</p>`,
    vidaReal: `
      <p>Casi todos los días alguien busca la mejor opción posible, y esta lección enseña a encontrarla con cuentas:</p>
      <ul>
        <li>Una tienda busca el precio que le deja más ganancia: ni tan caro que nadie compre, ni tan barato que no gane.</li>
        <li>Una fábrica de latas busca la forma que guarda más bebida con menos metal.</li>
        <li>Una empresa de envíos busca la ruta que gasta menos gasolina y tiempo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿En qué valor de x tiene su mínimo f(x) = x² − 6x + 5?</p>', respuesta: 6 / 2,
        pista: '<p>Deriva f(x) e iguala la derivada a cero.</p>',
        solucion: '<p>f′(x) = 2x − 6 vale 0 cuando 2x = 6, o sea, en x = <strong>3</strong>. Antes de 3 la derivada es negativa y después positiva: es un mínimo.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es el valor máximo de f(x) = −2x² + 8x + 1?</p>', respuesta: -2 * 4 + 8 * 2 + 1,
        pista: '<p>Deriva, iguala a cero para hallar x, y después sustituye esa x en f, no en f′.</p>',
        solucion: '<p>f′(x) = −4x + 8 vale 0 en x = 2. El valor máximo es la altura en ese punto: f(2) = −8 + 16 + 1 = <strong>9</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>La ganancia de un negocio según el precio p es G(p) = −10p² + 400p − 1000. ¿Qué precio da la ganancia máxima?</p>', respuesta: 400 / 20,
        pista: '<p>Deriva G(p) respecto de p e iguala a cero.</p>',
        solucion: '<p>G′(p) = −20p + 400 vale 0 cuando 20p = 400, o sea, p = <strong>20</strong>. Es un máximo: G′(15) = 100 es positiva y G′(25) = −100 es negativa, así que la ganancia sube y luego baja.</p>' },
      { tipo: 'numero', enunciado: '<p>Con la misma función G(p) = −10p² + 400p − 1000, ¿cuál es la ganancia máxima?</p>', respuesta: -10 * 400 + 400 * 20 - 1000,
        pista: '<p>Ya sabes que el mejor precio es 20. Sustitúyelo en G(p).</p>',
        solucion: '<p>G(20) = −10(400) + 400(20) − 1 000 = −4 000 + 8 000 − 1 000 = <strong>3 000</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Si f′(x) &gt; 0 en todo un intervalo, entonces en ese intervalo f es…</p>', opciones: ['Creciente', 'Decreciente', 'Constante'], correcta: 0,
        pista: '<p>Una derivada positiva es una pendiente positiva. ¿Qué hace la curva?</p>',
        solucion: '<p>Creciente: si la pendiente es positiva en todo el intervalo, la gráfica va de subida de izquierda a derecha.</p>' },
      { tipo: 'numero', enunciado: '<p>Vas a cercar un terreno rectangular junto a un río (el lado del río no se cerca) con 60 m de cerca. ¿Cuál es el área máxima que puedes encerrar, en m²?</p>', respuesta: 15 * (60 - 2 * 15),
        pista: '<p>Si los dos lados perpendiculares al río miden x, el lado paralelo mide 60 − 2x. A(x) = x(60 − 2x).</p>',
        solucion: '<p>A(x) = 60x − 2x², así que A′(x) = 60 − 4x vale 0 en x = 15. El lado paralelo mide 60 − 30 = 30, y el área es 15 × 30 = <strong>450 m²</strong>.</p>' },
    ],
    fuentes: [CV('4-3-maxima-and-minima', 'Maxima and Minima'), CV('4-7-applied-optimization-problems', 'Applied Optimization Problems'), KHAN_D],
  });

  // ------------------------------------------------------------------
  const RECT = [0.5, 1, 1.5, 2].map((d) => ({ tipo: 'poligono', puntos: [[d - 0.5, 0], [d, 0], [d, d * d], [d - 0.5, d * d]], relleno: true, serie: 1 }));
  L('La integral como área', {
    objetivo: 'Entender la integral como el área bajo una curva, aproximarla con rectángulos y calcular integrales sencillas de polinomios.',
    explicacion: `
      <p>Si un auto va a 80 km/h durante 2 horas, recorre 80 × 2 = 160 km. Ahora dibuja esa velocidad en una gráfica: el tiempo va en la línea horizontal y la velocidad en la vertical. Como la velocidad no cambia, queda una línea plana a la altura 80. El espacio que queda debajo, entre las horas 0 y 2, es un rectángulo de base 2 y altura 80. Su área es 80 × 2 = 160, justo la distancia recorrida.</p>
      <h3>¿Y si la velocidad cambia?</h3>
      <p>Eso no es casualidad: <strong>la distancia recorrida es el área bajo la gráfica de la velocidad</strong>, aunque la velocidad cambie. El problema es que, si cambia, la gráfica ya no es plana sino una curva, y la zona de abajo deja de ser un rectángulo. Para curvas no tienes una fórmula de área como las de las figuras planas.</p>
      <p>La idea para resolverlo es la misma que usarías para medir un piso irregular con losetas: llenas el espacio con muchos rectángulos delgados, calculas el área de cada uno (base por altura) y las sumas. A esa suma se le llama <strong>suma de Riemann</strong>, por el matemático que la estudió.</p>
      ${G({ x: [-0.3, 2.5], y: [-0.4, 4.5], descripcion: 'Curva y igual a x cuadrada entre 0 y 2, con 4 rectángulos de ancho 0.5 cuya esquina superior derecha toca la curva. Sus alturas son 0.25, 1, 2.25 y 4, y juntos cubren más que el área real.', funciones: [{ f: (x) => x * x, etiqueta: 'y = x²' }], figuras: RECT })}
      <p>En la figura, el área bajo y = x² entre 0 y 2 se llenó con 4 rectángulos de ancho 0.5. La altura de cada uno es el valor de la curva en su lado derecho: 0.25, 1, 2.25 y 4. La suma es 0.5 × (0.25 + 1 + 2.25 + 4) = 3.75. Pero fíjate que solo la esquina superior derecha de cada rectángulo toca la curva; el resto de su tapa queda por encima, así que se pasan bastante: el área real es menor.</p>
      <h3>De la aproximación al área exacta</h3>
      <p>Si usas rectángulos más delgados, sobresalen menos y la suma se acerca más al área real. Con rectángulos cada vez más delgados, la suma se acerca a un número fijo. Ese límite, la idea que viste al principio de la unidad, es el área exacta, y se llama <strong>integral</strong>. Se escribe así:</p>
      <p class="resultado">∫<sub>a</sub><sup>b</sup> f(x) dx = área bajo f entre a y b</p>
      <p>Léelo por partes. El símbolo ∫ es una S alargada, de "suma", porque eso es: una suma de muchísimos rectángulos. Los números a y b son <strong>dónde empieza y dónde termina</strong> la zona que mides. f(x) es <strong>la altura</strong> de cada rectángulo, y dx representa <strong>su ancho, que es pequeñísimo</strong>; también indica que la variable es x. Para y = x² entre 0 y 2, el área exacta es ${F(8, 3)} ≈ 2.67, un poco menos que los 3.75 de los rectángulos.</p>
      <h3>Un atajo: deshacer la derivada</h3>
      <p>Sumar infinitos rectángulos a mano es imposible, pero hay un atajo. Una <strong>antiderivada</strong> de f es una función F cuya derivada es f: es como deshacer la derivada. Para las potencias, invierte la regla que ya conoces. Al derivar, bajabas el exponente y le restabas uno; ahora <strong>sube el exponente en uno y divide entre el nuevo exponente</strong>. Así, la antiderivada de xⁿ es ${F('xⁿ⁺¹', 'n + 1')}. Puedes comprobarlo: si derivas ${F('x³', 3)}, el 3 baja, se cancela con el 3 de abajo y queda x². Si la función trae un número multiplicando, ese número se queda: la antiderivada de 6x² es 6 · ${F('x³', 3)} = 2x³.</p>
      <p>El <strong>teorema fundamental del cálculo</strong> une las dos mitades de la unidad: dice que integrar y derivar son operaciones inversas, como sumar y restar. Gracias a eso, el área se calcula restando:</p>
      <p class="resultado">∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) − F(a)</p>
      <p>En palabras: busca la antiderivada F, mide cuánto vale al final (en b) y réstale lo que vale al principio (en a).</p>`,
    ejemplo: `
      <p>Calcula el área exacta bajo y = x² entre 0 y 2.</p>
      <ol class="pasos-ej">
        <li>Busca la antiderivada de x². El exponente 2 sube a 3 y divides entre ese 3: F(x) = ${F('x³', 3)}. Para comprobar, deriva: el 3 baja, se cancela con el 3 de abajo y vuelves a x².</li>
        <li>Evalúa al final y al principio. En x = 2: F(2) = ${F(8, 3)}, porque 2³ = 8. En x = 0: F(0) = 0.</li>
        <li>Resta: F(2) − F(0) = ${F(8, 3)} − 0 = ${F(8, 3)} ≈ 2.67.</li>
        <li>Compara con la figura. Los 4 rectángulos daban 3.75, y ya sabías que se pasaban porque sus tapas quedan por encima de la curva. Un área real menor tiene sentido.</li>
      </ol>
      <p>Resultado: <span class="resultado">${F(8, 3)}</span>, menos que la aproximación de 3.75 con 4 rectángulos.</p>
      <p class="nota"><strong>Error común:</strong> restar al revés, F(0) − F(2). Siempre va lo del final menos lo del principio.</p>`,
    vidaReal: `
      <p>Cada vez que algo se va acumulando poco a poco, alguien necesita saber cuánto se juntó en total:</p>
      <ul>
        <li>Un reloj deportivo calcula cuántos kilómetros corriste, aunque cambiaste de ritmo muchas veces.</li>
        <li>Tu recibo de luz cobra toda la energía que usaste en el mes, aunque cada aparato se prendió a horas distintas.</li>
        <li>Los ingenieros calculan cuánta agua de lluvia se junta en una presa o cuánto mide un terreno de forma irregular.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un auto va a 60 km/h constantes durante 3 horas. ¿Cuál es el área bajo la gráfica de velocidad (es decir, la distancia recorrida en km)?</p>', respuesta: 60 * 3,
        pista: '<p>Es un rectángulo de altura 60 y base 3.</p>',
        solucion: '<p>La velocidad no cambia, así que el área es un rectángulo: base por altura, 60 × 3 = <strong>180 km</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es el área bajo la recta y = 2x entre x = 0 y x = 4?</p>', respuesta: (4 * 8) / 2,
        pista: '<p>Es un triángulo de base 4 y altura 2 × 4 = 8.</p>',
        solucion: '<p>La zona bajo la recta es un triángulo de base 4 y altura 8. Su área es base por altura entre 2: (4 × 8) ÷ 2 = <strong>16</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es el área bajo la recta y = x + 1 entre x = 0 y x = 2?</p>', respuesta: ((1 + 3) / 2) * 2,
        pista: '<p>Es un trapecio con alturas laterales f(0) = 1 y f(2) = 3, y base 2.</p>',
        solucion: '<p>El área de un trapecio es el promedio de los lados paralelos por la distancia entre ellos: (1 + 3) ÷ 2 × 2 = <strong>4</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Aproxima el área bajo y = x entre 0 y 2 con 2 rectángulos de ancho 1, usando como altura el valor de la función en el extremo derecho de cada uno.</p>', respuesta: 1 * 1 + 1 * 2,
        pista: '<p>Los rectángulos van de 0 a 1 y de 1 a 2. Su altura es f en el lado derecho: f(1) y f(2).</p>',
        solucion: '<p>1 × 1 + 1 × 2 = <strong>3</strong>. (El área exacta es 2: los rectángulos se pasan).</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula ∫<sub>0</sub><sup>3</sup> x² dx.</p>', respuesta: 27 / 3,
        pista: '<p>Busca la antiderivada de x² (sube el exponente y divide entre el nuevo). Luego evalúala en 3 y en 0, y resta.</p>',
        solucion: `<p>La antiderivada es F(x) = ${F('x³', 3)}. Entonces F(3) − F(0) = ${F(27, 3)} − 0 = <strong>9</strong>.</p>` },
      { tipo: 'numero', enunciado: '<p>Calcula ∫<sub>1</sub><sup>2</sup> 3x² dx.</p>', respuesta: 2 ** 3 - 1 ** 3,
        pista: '<p>Busca una función cuya derivada sea 3x². Luego evalúala en 2 y en 1, y resta.</p>',
        solucion: '<p>La derivada de x³ es 3x², así que F(x) = x³. Entonces F(2) − F(1) = 2³ − 1³ = 8 − 1 = <strong>7</strong>.</p>' },
    ],
    fuentes: [CV('5-1-approximating-areas', 'Approximating Areas'), CV('5-3-the-fundamental-theorem-of-calculus', 'The Fundamental Theorem of Calculus'), WIKI('Suma_de_Riemann', 'Suma de Riemann')],
  });
})();
