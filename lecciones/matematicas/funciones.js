// Matemáticas · Unidad 3: Funciones.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const F = window.fraccion;
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('matematicas', titulo, datos);

  const CA = (pagina, nombre) => ({ nombre: `OpenStax, College Algebra 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/college-algebra-2e/pages/${pagina}` });
  const EA = (pagina, nombre) => ({ nombre: `OpenStax, Elementary Algebra 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/elementary-algebra-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = { nombre: 'Khan Academy en español: Álgebra 2', url: 'https://es.khanacademy.org/math/algebra2' };

  // Gráficas pequeñas para opciones de ejercicios
  const mini = (funciones, descripcion, x = [-4, 4], y = [-4, 4]) => G({ x, y, funciones, descripcion });
  const circulo = [{ f: (x) => Math.sqrt(9 - x * x) }, { f: (x) => -Math.sqrt(9 - x * x), serie: 0 }];

  // ------------------------------------------------------------------
  L('Qué es una función', {
    objetivo: 'Entender qué es una función, usar la notación f(x), calcular valores y reconocer cuándo una relación no es función.',
    explicacion: `
      <p>Piensa en una máquina de golosinas. Aprietas el botón 12 y sale una bolsa de papas. Si mañana vuelves y aprietas otra vez el 12, sale otra vez la misma bolsa. La máquina no adivina ni cambia de opinión: cada botón da siempre lo mismo.</p>
      <p>Con los números puede pasar algo parecido. Imagina una "máquina" que recibe un número, lo multiplica por 2 y luego le suma 3. Mira lo que hace con algunos números:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Entra</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
        <tr><th>Sale</th><td>3</td><td>5</td><td>7</td><td>9</td><td>11</td></tr>
      </table></div>
      <p>Fíjate que no hay sorpresas: si entra 4, siempre sale 11. Una regla así se llama <strong>función</strong>. El número que metes se llama <strong>entrada</strong>, y el que obtienes se llama <strong>salida</strong>.</p>
      <h3>¿Cómo se escribe una función?</h3>
      <p>Para no repetir "la máquina que multiplica por 2 y suma 3", se usa una forma corta: <strong>f(x) = 2x + 3</strong>. Se lee "f de x es igual a 2x más 3". Cada parte tiene su papel:</p>
      <ul>
        <li><strong>f</strong> es el nombre de la máquina. Podría llamarse g, h o p; se usa f porque es la inicial de "función".</li>
        <li><strong>x</strong> es el lugar donde va la entrada, el número que tú eliges.</li>
        <li><strong>f(x)</strong> es la salida: lo que obtienes después de aplicar la regla.</li>
      </ul>
      <p>Para usar la función, cambia cada x por el número que quieras. Si quieres saber qué sale con 4, escribes f(4) y calculas: f(4) = 2(4) + 3 = 8 + 3 = 11. De la misma forma, f(0) = 0 + 3 = 3, y f(−1) = −2 + 3 = 1.</p>
      <p class="nota"><strong>Trampa común:</strong> leer f(x) como "f por x". Aquí los paréntesis no indican una multiplicación. f(4) quiere decir "lo que sale de la máquina f cuando entra 4".</p>
      <h3>¿Cuándo una regla es función?</h3>
      <p>Hay una sola condición: <strong>cada entrada tiene exactamente una salida</strong>. Volviendo a la máquina, sería muy raro que el botón 12 a veces diera papas y a veces chocolate. Si eso pasara, ya no podrías saber qué te va a tocar.</p>
      <p>Con personas se ve claro. "Cada persona → su fecha de nacimiento" es función, porque nadie nació en dos fechas distintas. En cambio, "cada persona → sus hermanos" no es función, porque alguien puede tener dos hermanos: una entrada con dos salidas. Eso sí, que dos entradas compartan la misma salida está permitido: dos amigos pueden haber nacido el mismo día.</p>
      <h3>¿Cómo se revisa en una gráfica?</h3>
      <p>Una función también se puede dibujar. En la próxima lección verás cómo; por ahora basta saber que la posición de izquierda a derecha marca la entrada, y la altura de la curva marca la salida.</p>
      <p>Para revisar si un dibujo es función, imagina que pasas una regla en posición vertical, de izquierda a derecha, por toda la gráfica. Si en algún lugar la regla toca la curva en dos puntos, a esa entrada le tocan dos salidas, y no es función. A esto se le llama <strong>prueba de la recta vertical</strong>.</p>
      <div class="dos-graficas">
        ${G({ x: [-4, 4], y: [-2, 6], funciones: [{ f: (x) => x * x / 2, etiqueta: 'Sí es función' }], descripcion: 'Parábola: cada x tiene una sola altura, así que es función.' })}
        ${G({ x: [-4, 4], y: [-4, 4], funciones: [{ f: circulo[0].f, etiqueta: 'No es función' }, circulo[1]], puntos: [{ x: 1, y: Math.sqrt(8), etiqueta: '(1, 2.8)' }, { x: 1, y: -Math.sqrt(8), etiqueta: '(1, −2.8)' }], descripcion: 'Círculo: para x igual a 1 hay dos puntos, así que no es función.' })}
      </div>
      <p>La parábola de la izquierda pasa la prueba: cualquier línea vertical la toca una sola vez. El círculo de la derecha no la pasa: en x = 1 hay un punto arriba y otro abajo, así que esa entrada tendría dos salidas.</p>
      <h3>¿Qué números puedes meter?</h3>
      <p>No toda máquina acepta cualquier cosa: una máquina de monedas no acepta billetes. El conjunto de entradas permitidas se llama <strong>dominio</strong>, y el conjunto de todas las salidas que pueden salir se llama <strong>rango</strong>. Por ejemplo, en f(x) = ${F(1, 'x − 5')} no puedes meter el 5, porque abajo quedaría 5 − 5 = 0, y no se puede dividir entre cero. Por eso el 5 no está en el dominio.</p>`,
    ejemplo: `
      <p>Las tortillas cuestan $22 el kilo. Escribe el precio como función de los kilos y calcula cuánto pagas por 2.5 kg.</p>
      <ol class="pasos-ej">
        <li>Primero decide qué entra y qué sale. Lo que tú eliges es cuántos kilos compras, así que esa es la entrada; llámala k. Lo que resulta es el precio: la salida.</li>
        <li>Busca la regla. Cada kilo cuesta 22, así que el precio es 22 veces los kilos. La función queda p(k) = 22k, con p de "precio".</li>
        <li>Prueba la regla con números fáciles: p(1) = 22, p(2) = 44 y p(3) = 66. Cada kilo de más suma 22 pesos, como debe ser.</li>
        <li>Ahora cambia k por 2.5: p(2.5) = 22 × 2.5 = 55.</li>
        <li>Comprueba por otro camino: 2 kilos cuestan 44, y medio kilo cuesta la mitad de 22, que es 11. En total, 44 + 11 = 55.</li>
      </ol>
      <p>Resultado: <span class="resultado">p(k) = 22k y p(2.5) = $55</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir p(k) = k + 22. Esa regla suma 22 una sola vez, sin importar cuántos kilos compres.</p>`,
    vidaReal: `
      <p>Muchas cosas dependen de otra. Cuando sabes la regla que las une, puedes predecir el resultado antes de que pase:</p>
      <ul>
        <li>Lo que pagas en la tortillería depende de cuántos kilos pides.</li>
        <li>El recibo de luz depende de cuánta electricidad usaste en el mes.</li>
        <li>Lo que tardas en llegar a un lugar depende de qué tan rápido vas.</li>
        <li>Las apps del clima pasan de grados Celsius a Fahrenheit siempre con la misma regla.</li>
        <li>En una hoja de cálculo, escribes un dato en una celda y otra celda te da el resultado.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Si f(x) = 3x − 5, ¿cuánto vale f(4)?</p>', respuesta: 3 * 4 - 5,
        pista: '<p>Cambia la x por 4 y haz las cuentas.</p>',
        solucion: '<p>Al cambiar x por 4 queda 3(4) − 5 = 12 − 5 = <strong>7</strong>. La entrada 4 produce la salida 7.</p>' },
      { tipo: 'numero', enunciado: '<p>Si g(x) = x<sup>2</sup> + 1, ¿cuánto vale g(−3)?</p>', respuesta: (-3) ** 2 + 1,
        pista: '<p>Cambia x por (−3), con paréntesis: (−3)<sup>2</sup> + 1.</p>',
        solucion: '<p>(−3)<sup>2</sup> = (−3)(−3) = 9, porque menos por menos da más. Luego 9 + 1 = <strong>10</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas relaciones <strong>no</strong> es una función?</p>',
        opciones: ['Cada persona → su fecha de nacimiento', 'Cada número → su doble', 'Cada persona → los números de teléfono que tiene', 'Cada producto de una tienda → su precio'], correcta: 2,
        pista: '<p>Busca la relación en la que una entrada puede tener más de una salida.</p>',
        solucion: '<p>Una persona puede tener varios teléfonos: una entrada con dos salidas. Por eso no es función.</p>' },
      { tipo: 'numero', enunciado: '<p>La función F(C) = 1.8C + 32 convierte grados Celsius a Fahrenheit. ¿Cuántos °F son 25 °C?</p>', respuesta: 1.8 * 25 + 32,
        pista: '<p>Calcula 1.8 × 25 y súmale 32.</p>',
        solucion: '<p>Primero la multiplicación: 1.8 × 25 = 45. Luego se suma: 45 + 32 = <strong>77 °F</strong>.</p>' },
      { tipo: 'numero', enunciado: `<p>¿Qué número <strong>no</strong> está en el dominio de f(x) = ${F(1, 'x − 2')}?</p>`, respuesta: 2,
        pista: '<p>¿Qué valor de x haría cero el denominador?</p>',
        solucion: '<p>Con x = <strong>2</strong> el denominador vale 0, y no se puede dividir entre cero.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas gráficas representa una función?</p>',
        opciones: [
          mini(circulo, 'Círculo'),
          mini([{ f: (x) => x * x - 2 }], 'Parábola que abre hacia arriba'),
          mini([{ f: (x) => Math.sqrt(x + 2) }, { f: (x) => -Math.sqrt(x + 2), serie: 0 }], 'Parábola acostada, abre hacia la derecha'),
        ], correcta: 1,
        pista: '<p>Imagina líneas verticales. ¿En cuál gráfica ninguna línea vertical toca dos puntos?</p>',
        solucion: '<p>La parábola que abre hacia arriba: cada x tiene una sola altura. El círculo y la parábola acostada tienen dos puntos para una misma x.</p>' },
    ],
    fuentes: [CA('3-1-functions-and-function-notation', 'Functions and Function Notation'), CA('3-2-domain-and-range', 'Domain and Range'), WIKI('Función_(matemática)', 'Función')],
  });

  // ------------------------------------------------------------------
  const PUNTOS_PLANO = [{ x: 4, y: 1, etiqueta: 'P' }, { x: -3, y: 2, etiqueta: 'Q' }, { x: -2, y: -4, etiqueta: 'R' }, { x: 0, y: 3, etiqueta: 'S' }];
  L('El plano cartesiano y las gráficas', {
    objetivo: 'Ubicar y leer puntos en el plano cartesiano, identificar cuadrantes y graficar una función a partir de una tabla.',
    explicacion: `
      <p>Imagina que quedas con un amigo en una ciudad de calles en cuadrícula. Si le dices "camina 3 cuadras hacia la derecha y luego 2 hacia arriba", llegará justo donde estás, sin perderse. Con dos números basta para señalar un lugar.</p>
      <p>El <strong>plano cartesiano</strong> usa esa misma idea para ubicar puntos en una hoja. Se forma con dos rectas numéricas que se cruzan en ángulo recto, como una cruz:</p>
      <ul>
        <li>El <strong>eje x</strong> es la recta horizontal. Los números positivos van a la derecha y los negativos, a la izquierda.</li>
        <li>El <strong>eje y</strong> es la recta vertical. Los positivos van hacia arriba y los negativos, hacia abajo.</li>
        <li>Los dos ejes se cruzan en el <strong>origen</strong>, el punto de partida, que se escribe (0, 0).</li>
      </ul>
      <h3>¿Cómo se ubica un punto?</h3>
      <p>Cada punto se escribe con dos números entre paréntesis, <strong>(x, y)</strong>, que se llaman sus <strong>coordenadas</strong>. Para llegar a él, sal siempre del origen. El primer número dice cuánto caminas a la derecha (si es positivo) o a la izquierda (si es negativo). El segundo dice cuánto subes (si es positivo) o bajas (si es negativo).</p>
      <p>Para el punto A(3, 2), caminas 3 a la derecha y subes 2. Para C(−4, −3), caminas 4 a la izquierda y bajas 3. Búscalos en la gráfica:</p>
      ${G({ x: [-5, 5], y: [-5, 5], puntos: [{ x: 3, y: 2, etiqueta: 'A(3, 2)' }, { x: -2, y: 4, etiqueta: 'B(−2, 4)' }, { x: -4, y: -3, etiqueta: 'C(−4, −3)' }, { x: 2, y: -1, etiqueta: 'D(2, −1)' }], descripcion: 'Plano con los puntos A(3, 2) en el cuadrante uno, B(−2, 4) en el dos, C(−4, −3) en el tres y D(2, −1) en el cuatro.' })}
      <p class="nota"><strong>Trampa común:</strong> cambiar el orden de los números. (3, 2) y (2, 3) son puntos distintos: uno está 3 a la derecha y 2 arriba; el otro, 2 a la derecha y 3 arriba. Para recordarlo, piensa que primero caminas por el piso y después subes la escalera: primero lo horizontal, luego lo vertical.</p>
      <h3>¿En qué zona está un punto?</h3>
      <p>Los dos ejes parten el plano en cuatro zonas llamadas <strong>cuadrantes</strong>. Se numeran con números romanos, empezando arriba a la derecha y girando al revés de las manecillas del reloj. Para saber en cuál está un punto, basta con mirar los signos de sus coordenadas:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Cuadrante</th><th>Signo de x</th><th>Signo de y</th><th>Ejemplo</th></tr>
        <tr><td>I</td><td>+</td><td>+</td><td>A(3, 2)</td></tr>
        <tr><td>II</td><td>−</td><td>+</td><td>B(−2, 4)</td></tr>
        <tr><td>III</td><td>−</td><td>−</td><td>C(−4, −3)</td></tr>
        <tr><td>IV</td><td>+</td><td>−</td><td>D(2, −1)</td></tr>
      </table></div>
      <p>La tabla tiene lógica: x positiva quiere decir "a la derecha" y y positiva quiere decir "arriba". Por eso el cuadrante I, arriba a la derecha, tiene los dos signos positivos. Los puntos que están justo sobre un eje, como (0, 3), no pertenecen a ningún cuadrante, porque están en la frontera.</p>
      <h3>¿Cómo se dibuja una función?</h3>
      <p>En la lección anterior viste que una función recibe una entrada x y entrega una salida. Si a esa salida la llamas y, cada pareja de entrada y salida forma un punto (x, y) que puedes dibujar. Así se hace:</p>
      <ol>
        <li>Elige algunas entradas fáciles, como −1, 0, 1 y 2.</li>
        <li>Calcula con la regla la salida de cada una. Esa es su y.</li>
        <li>Ubica cada punto (x, y) en el plano.</li>
        <li>Une los puntos con una línea.</li>
      </ol>
      <p>El dibujo que resulta se llama <strong>gráfica</strong> de la función. Para <strong>leer</strong> una gráfica, haz el camino al revés: busca la entrada en el eje x, sube o baja en línea recta hasta tocar la curva y fíjate a qué altura quedaste. Esa altura es la salida.</p>`,
    ejemplo: `
      <p>Dibuja la gráfica de y = 2x − 1.</p>
      <ol class="pasos-ej">
        <li>Elige entradas pequeñas, porque son fáciles de calcular y caben en el dibujo: x = −1, 0, 1 y 2.</li>
        <li>Calcula cada salida multiplicando por 2 y restando 1. Por ejemplo, con x = 2 sale 2(2) − 1 = 3, y con x = −1 sale −2 − 1 = −3. Anota todo en una tabla:</li>
      </ol>
      <div class="tabla-wrap"><table>
        <tr><th>x</th><td>−1</td><td>0</td><td>1</td><td>2</td></tr>
        <tr><th>y = 2x − 1</th><td>−3</td><td>−1</td><td>1</td><td>3</td></tr>
      </table></div>
      <ol class="pasos-ej" start="3">
        <li>Ubica los puntos. Para (2, 3), camina 2 a la derecha y sube 3. Para (−1, −3), camina 1 a la izquierda y baja 3.</li>
        <li>Únelos y comprueba leyendo la gráfica: en x = 1 la línea está a la altura 1, y la regla da 2(1) − 1 = 1. Coincide.</li>
      </ol>
      ${G({ x: [-4, 4], y: [-5, 5], funciones: [{ f: (x) => 2 * x - 1, etiqueta: 'y = 2x − 1' }], puntos: [{ x: -1, y: -3 }, { x: 0, y: -1 }, { x: 1, y: 1 }, { x: 2, y: 3, etiqueta: '(2, 3)' }], descripcion: 'Recta y igual a 2x menos 1 que pasa por los puntos de la tabla.' })}
      <p>Resultado: <span class="resultado">los puntos quedan alineados; la gráfica es una recta</span>.</p>
      <p class="nota"><strong>Error común:</strong> ubicar (−1, −3) como (−3, −1). Primero va siempre la x, lo horizontal.</p>`,
    vidaReal: `
      <p>Ubicar algo con dos datos, uno horizontal y otro vertical, es algo que haces más seguido de lo que crees:</p>
      <ul>
        <li>En un mapa o en el GPS del teléfono, cada lugar se marca con dos números.</li>
        <li>En el cine, tu boleto dice la fila y el número de asiento.</li>
        <li>En una hoja de cálculo, cada celda se nombra por su columna y su fila.</li>
        <li>En las noticias, las gráficas de precios o del clima ponen el tiempo de lado y el dato hacia arriba.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: `<p>Observa la gráfica.</p>${G({ x: [-5, 5], y: [-5, 5], puntos: PUNTOS_PLANO, descripcion: 'Puntos P, Q, R y S en el plano.' })}<p>¿Cuál es la coordenada <strong>x</strong> del punto P?</p>`, respuesta: 4,
        pista: '<p>Desde P, baja en línea recta hasta el eje horizontal.</p>',
        solucion: '<p>P = (4, 1): su coordenada x es <strong>4</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En la misma gráfica, ¿cuál es la coordenada <strong>y</strong> del punto R?</p>', respuesta: -4,
        pista: '<p>Desde R, ve en línea recta hasta el eje vertical.</p>',
        solucion: '<p>R = (−2, −4): su coordenada y es <strong>−4</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>En la misma gráfica, ¿en qué cuadrante está el punto Q?</p>', opciones: ['I', 'II', 'III', 'IV'], correcta: 1,
        pista: '<p>Q está a la izquierda (x negativa) y arriba (y positiva).</p>',
        solucion: '<p>Q = (−3, 2). La x negativa lo pone a la izquierda y la y positiva, arriba. Arriba a la izquierda está el cuadrante <strong>II</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿En qué cuadrante está el punto (5, −2)?</p>', opciones: ['I', 'II', 'III', 'IV'], correcta: 3,
        pista: '<p>Mira los signos: ¿la x te lleva a la derecha o a la izquierda? ¿La y te lleva arriba o abajo?</p>',
        solucion: '<p>La x positiva lleva a la derecha y la y negativa, abajo. Abajo a la derecha está el cuadrante <strong>IV</strong>.</p>' },
      { tipo: 'numero', enunciado: `<p>Observa la gráfica de la función.</p>${G({ x: [-4, 4], y: [-3, 6], funciones: [{ f: (x) => x * x / 2 - 1 }], descripcion: 'Parábola con vértice en (0, −1).' })}<p>¿Cuánto vale y cuando x = 2?</p>`, respuesta: 2 * 2 / 2 - 1,
        pista: '<p>Busca x = 2 en el eje horizontal y sube hasta la curva.</p>',
        solucion: '<p>Al subir desde x = 2 tocas la curva a la altura <strong>1</strong>. Esa altura es el valor de y.</p>' },
      { tipo: 'numero', enunciado: '<p>En la gráfica del ejercicio 1, el punto S está sobre el eje y. ¿Cuál es la coordenada x de cualquier punto que esté sobre el eje y?</p>', respuesta: 0,
        pista: '<p>Sobre el eje y no te mueves nada a la izquierda ni a la derecha.</p>',
        solucion: '<p>Todos los puntos del eje y tienen x = <strong>0</strong>. Por ejemplo, S = (0, 3).</p>' },
    ],
    fuentes: [EA('4-1-use-the-rectangular-coordinate-system', 'Use the Rectangular Coordinate System'), WIKI('Coordenadas_cartesianas', 'Coordenadas cartesianas'), KHAN],
  });

  // ------------------------------------------------------------------
  L('Función lineal y pendiente', {
    objetivo: 'Interpretar la pendiente y la ordenada al origen de una función lineal, calcular la pendiente entre dos puntos y escribir la ecuación de una recta.',
    explicacion: `
      <p>Imagina que tomas un taxi. Apenas te subes, el taxímetro ya marca $10; a eso se le llama <strong>banderazo</strong>. Después, por cada kilómetro que avanzas, se suman $5. Mira cómo crece lo que debes:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Kilómetros</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
        <tr><th>Pagas</th><td>$10</td><td>$15</td><td>$20</td><td>$25</td><td>$30</td></tr>
      </table></div>
      <p>Fíjate en dos cosas. Empiezas con 10, aunque no hayas avanzado nada. Y cada vez que avanzas un kilómetro, lo que pagas sube siempre lo mismo: 5. Por eso, si recorres x kilómetros, pagas 5 veces x más 10, o sea, <strong>5x + 10</strong>.</p>
      <p>Una regla así, que empieza en un número y luego sube (o baja) siempre la misma cantidad en cada paso, se llama <strong>función lineal</strong>. Todas se pueden escribir de esta forma:</p>
      <p><strong>f(x) = mx + b</strong></p>
      <p>Se lee "f de x es igual a m por x más b". Aquí x es lo que tú cambias (los kilómetros) y f(x), que también se escribe y, es el resultado (lo que pagas). Las letras m y b son dos números fijos, y cada uno cuenta algo distinto:</p>
      <ul>
        <li><strong>b</strong> es <strong>con cuánto empiezas</strong>: lo que vale y cuando x es 0. Se llama <strong>ordenada al origen</strong>. En el taxi, b = 10.</li>
        <li><strong>m</strong> es <strong>cuánto sube y en cada paso</strong>, es decir, cada vez que x aumenta 1. Se llama <strong>pendiente</strong>. En el taxi, m = 5, porque cada kilómetro suma $5.</li>
      </ul>
      <h3>Cómo se ve en una gráfica</h3>
      <p>Si dibujas los puntos de la tabla, quedan perfectamente alineados, porque entre uno y otro se sube siempre lo mismo. Por eso la gráfica de una función lineal es una <strong>línea recta</strong>, y de ahí viene su nombre.</p>
      ${G({ x: [-4, 4], y: [-4, 6], funciones: [{ f: (x) => 2 * x + 1, etiqueta: 'y = 2x + 1' }, { f: (x) => -x + 3, etiqueta: 'y = −x + 3' }], puntos: [{ x: 0, y: 1, etiqueta: '(0, 1)' }, { x: 0, y: 3, etiqueta: '(0, 3)' }], descripcion: 'Dos rectas: y igual a 2x más 1, que sube, y y igual a menos x más 3, que baja.' })}
      <p>El número b se ve fácil: es la altura donde la recta cruza la línea vertical (el eje y). En la gráfica, la recta y = 2x + 1 cruza en 1, y la recta y = −x + 3 cruza en 3.</p>
      <p>La pendiente m te dice hacia dónde va la recta, leyendo siempre de izquierda a derecha, como cuando lees un libro:</p>
      <ul>
        <li>Si m es positiva, y crece cuando x crece, y la recta <strong>sube</strong>. Así es y = 2x + 1.</li>
        <li>Si m es negativa, y se hace más chica cuando x crece, y la recta <strong>baja</strong>. Así es y = −x + 3.</li>
        <li>Si m es 0, y nunca cambia, y la recta queda <strong>acostada</strong> (horizontal).</li>
      </ul>
      <p>También te dice qué tan empinada es: una pendiente de 5 sube más rápido que una de 2.</p>
      <h3>Pendiente a partir de dos puntos</h3>
      <p>A veces no tienes la regla, pero sí dos puntos de la recta. Entonces calculas la pendiente viendo cuánto subió y entre cuánto avanzó:</p>
      <p>m = ${F('subida', 'avance')} = ${F('y₂ − y₁', 'x₂ − x₁')}</p>
      <p>Arriba va cuánto cambió y (la y del segundo punto menos la del primero). Abajo va cuánto cambió x, restando en el mismo orden. Al dividir, sabes cuánto sube por cada paso, que es justo la pendiente.</p>
      <p>Por último, dos rectas con la misma pendiente tienen la misma inclinación, así que nunca se tocan, como los rieles del tren. Se llaman <strong>paralelas</strong>.</p>`,
    ejemplo: `
      <p>Encuentra la regla de la recta que pasa por los puntos (1, 3) y (4, 9).</p>
      <ol class="pasos-ej">
        <li>Calcula la pendiente. Del primer punto al segundo, y sube de 3 a 9 (sube 6) y x avanza de 1 a 4 (avanza 3): m = ${F('9 − 3', '4 − 1')} = ${F(6, 3)} = 2. Sube 2 por cada paso.</li>
        <li>Ya sabes que la regla es y = 2x + b; solo falta b. Como el punto (1, 3) está en la recta, con x = 1 debe salir y = 3: 3 = 2(1) + b, o sea, 3 = 2 + b. Entonces b = 1.</li>
        <li>Comprueba con el otro punto. Con x = 4 debería salir 9: 2(4) + 1 = 8 + 1 = 9. Coincide, así que la regla es correcta.</li>
      </ol>
      <p>Resultado: <span class="resultado">y = 2x + 1</span>.</p>
      <p class="nota"><strong>Error común:</strong> restar en distinto orden arriba y abajo, como ${F('9 − 3', '1 − 4')}. Eso cambia el signo de la pendiente. Si arriba empiezas por el segundo punto, abajo también.</p>`,
    vidaReal: `
      <p>Muchas cosas empiezan en un número y luego cambian siempre lo mismo, y esta lección te enseña a describirlas y predecirlas:</p>
      <ul>
        <li>Lo que pagas en un taxi: un cobro inicial y luego lo mismo por cada kilómetro.</li>
        <li>La distancia que recorres si vas siempre a la misma velocidad.</li>
        <li>Lo que vale un auto que pierde la misma cantidad de dinero cada año.</li>
        <li>Qué tan empinada es una rampa, un techo o una carretera, como cuando un letrero dice "pendiente del 8%".</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuál es la pendiente de y = −3x + 7?</p>', respuesta: -3,
        pista: '<p>Compara con y = mx + b: ¿qué número ocupa el lugar de m?</p>',
        solucion: '<p>La pendiente es el número que multiplica a x, así que m = <strong>−3</strong>. Como es negativa, la recta baja.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la ordenada al origen de y = 4x − 2? (Escribe solo el valor de y donde la recta cruza el eje y).</p>', respuesta: -2,
        pista: '<p>Es el término que no lleva x. También puedes calcular y cuando x = 0.</p>',
        solucion: '<p>b = <strong>−2</strong>: la recta cruza el eje y en (0, −2).</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula la pendiente de la recta que pasa por (2, 5) y (6, 13).</p>', respuesta: (13 - 5) / (6 - 2),
        pista: '<p>Pon arriba el cambio en y y abajo el cambio en x, restando en el mismo orden.</p>',
        solucion: `<p>y sube de 5 a 13 (8 unidades) mientras x avanza de 2 a 6 (4 unidades): m = ${F('13 − 5', '6 − 2')} = ${F(8, 4)} = <strong>2</strong>. Sube 2 por cada 1 que avanza.</p>` },
      { tipo: 'expresion', simplificar: true, enunciado: '<p>Una recta tiene pendiente −2 y cruza el eje y en (0, 3). Escribe su ecuación: y = … (escribe solo lo que va después del igual).</p>', respuesta: '-2x + 3',
        pista: '<p>Usa y = mx + b con m = −2 y b = 3.</p>',
        solucion: '<p>La pendiente ocupa el lugar de m y el cruce con el eje y el de b: y = <strong>−2x + 3</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas rectas tiene pendiente <strong>negativa</strong>?</p>',
        opciones: [
          mini([{ f: (x) => 2 * x + 1 }], 'Recta que sube'),
          mini([{ f: () => 2 }], 'Recta horizontal'),
          mini([{ f: (x) => -x + 2 }], 'Recta que baja'),
        ], correcta: 2,
        pista: '<p>Lee de izquierda a derecha: ¿cuál baja?</p>',
        solucion: '<p>La tercera baja al avanzar a la derecha, así que su pendiente es negativa. La horizontal tiene pendiente 0.</p>' },
      { tipo: 'numero', enunciado: '<p>Un auto vale $300 000 y pierde $25 000 de valor cada año: v(t) = 300 000 − 25 000t. ¿En cuántos años valdrá $100 000?</p>', respuesta: (300000 - 100000) / 25000,
        pista: '<p>Resuelve 300 000 − 25 000t = 100 000.</p>',
        solucion: '<p>El auto debe perder 300 000 − 100 000 = 200 000 pesos. A 25 000 por año, tarda 200 000 ÷ 25 000 = <strong>8</strong> años.</p>' },
    ],
    fuentes: [EA('4-4-understand-slope-of-a-line', 'Understand Slope of a Line'), CA('4-1-linear-functions', 'Linear Functions'), WIKI('Pendiente_(matemáticas)', 'Pendiente')],
  });

  // ------------------------------------------------------------------
  L('Función cuadrática', {
    objetivo: 'Reconocer la gráfica de una función cuadrática y encontrar su vértice, su eje de simetría y sus cruces con los ejes.',
    explicacion: `
      <p>Lanza una pelota hacia arriba y hacia adelante. Primero sube rápido, luego se va frenando, llega a un punto más alto y empieza a caer. El camino que dibuja en el aire es un arco. Esa forma aparece cada vez que una regla tiene x multiplicada por sí misma, es decir, x<sup>2</sup>.</p>
      <p>Mira la regla más sencilla de este tipo, y = x<sup>2</sup>, con algunos números:</p>
      <div class="tabla-wrap"><table>
        <tr><th>x</th><td>−3</td><td>−2</td><td>−1</td><td>0</td><td>1</td><td>2</td><td>3</td></tr>
        <tr><th>y = x<sup>2</sup></th><td>9</td><td>4</td><td>1</td><td>0</td><td>1</td><td>4</td><td>9</td></tr>
      </table></div>
      <p>Fíjate en dos cosas. La salida más pequeña es 0, justo en x = 0. Y los números se repiten a los dos lados: −2 y 2 dan 4; −3 y 3 dan 9. Pasa porque un número negativo multiplicado por sí mismo da positivo, igual que su pareja positiva. Por eso la curva es igual de los dos lados, como un objeto frente a un espejo.</p>
      <h3>¿Cómo se escribe?</h3>
      <p>Una <strong>función cuadrática</strong> es toda regla de la forma <strong>f(x) = ax<sup>2</sup> + bx + c</strong>, donde a, b y c son números fijos y a no puede ser 0. Si a fuera 0, el x<sup>2</sup> desaparecería y te quedaría una función lineal. Su gráfica es una curva llamada <strong>parábola</strong>. Cada letra cuenta algo:</p>
      <ul>
        <li><strong>a</strong>, el número que multiplica a x<sup>2</sup>, dice <strong>hacia dónde abre</strong> la parábola.</li>
        <li><strong>c</strong>, el número que va solo, dice <strong>dónde cruza la línea vertical</strong>, el eje y.</li>
        <li><strong>b</strong>, junto con a, ayuda a encontrar el punto más alto o más bajo, como verás enseguida.</li>
      </ul>
      <h3>¿Hacia dónde abre?</h3>
      <p>Cuando x es un número grande, positivo o negativo, x<sup>2</sup> es enorme y pesa más que todo lo demás. Si a es positiva (a &gt; 0), ese número enorme es positivo y la curva se va hacia arriba por los dos lados: la parábola <strong>abre hacia arriba</strong>, como una taza, y tiene un punto más bajo, llamado <strong>mínimo</strong>. Si a es negativa (a &lt; 0), pasa al revés: <strong>abre hacia abajo</strong>, como el arco de la pelota, y tiene un punto más alto, llamado <strong>máximo</strong>.</p>
      <h3>¿Dónde está el punto más alto o más bajo?</h3>
      <p>Ese punto se llama <strong>vértice</strong>. Su posición horizontal se calcula así:</p>
      <p><strong>x<sub>v</sub> = ${F('−b', '2a')}</strong></p>
      <p>Se lee "x del vértice es igual a menos b entre dos a". ¿De dónde sale? Como la parábola es un espejo, el vértice queda justo a la mitad entre los dos puntos donde cruza el eje x, cuando los tiene. Si sacas el punto medio de las dos soluciones de la fórmula general, la parte de la raíz cuadrada se cancela y queda −b entre 2a. Para la altura del vértice, mete ese valor en la función: f(x<sub>v</sub>).</p>
      <p>La línea vertical que pasa por el vértice parte la parábola en dos mitades iguales. Se llama <strong>eje de simetría</strong> y se escribe x = x<sub>v</sub>.</p>
      <h3>¿Dónde cruza los ejes?</h3>
      <p>Para el cruce con el eje y, pon x = 0: los términos ax<sup>2</sup> y bx se vuelven 0 y solo queda c. Por eso la parábola cruza el eje y en el punto (0, c). Los cruces con el eje x se llaman <strong>raíces</strong>: son los valores de x donde la altura es 0. Los encuentras resolviendo ax<sup>2</sup> + bx + c = 0, como en la lección de ecuaciones de segundo grado.</p>
      ${G({ x: [-3, 5], y: [-5, 6], funciones: [{ f: (x) => x * x - 2 * x - 3, etiqueta: 'y = x² − 2x − 3' }], puntos: [{ x: 1, y: -4, etiqueta: 'vértice (1, −4)' }, { x: -1, y: 0, etiqueta: '(−1, 0)' }, { x: 3, y: 0, etiqueta: '(3, 0)' }, { x: 0, y: -3, etiqueta: '(0, −3)' }], descripcion: 'Parábola y igual a x cuadrada menos 2x menos 3, con vértice en (1, −4), raíces en −1 y 3 y cruce con el eje y en −3.' })}
      <p>En esta gráfica ves todo junto: el vértice abajo, en (1, −4); el cruce con el eje y en (0, −3), y las raíces en −1 y 3. El vértice queda justo a la mitad entre −1 y 3.</p>`,
    ejemplo: `
      <p>Analiza f(x) = x<sup>2</sup> − 2x − 3 (la de la gráfica).</p>
      <ol class="pasos-ej">
        <li>Mira el signo de a. Aquí a = 1, que es positivo: la parábola abre hacia arriba y su vértice es un mínimo.</li>
        <li>Calcula el vértice. Aquí a = 1 y b = −2, así que x<sub>v</sub> = ${F('−(−2)', '2(1)')} = ${F(2, 2)} = 1. Para su altura, mete 1 en la función: f(1) = 1 − 2 − 3 = −4. El vértice es (1, −4).</li>
        <li>El cruce con el eje y es el número que va solo, c = −3: el punto (0, −3).</li>
        <li>Busca las raíces. Factoriza: (x − 3)(x + 1) = 0. Un producto da 0 solo si un factor es 0, así que x = 3 o x = −1.</li>
        <li>Comprueba: el punto medio entre −1 y 3 es (−1 + 3) ÷ 2 = 1, la x del vértice.</li>
      </ol>
      <p>Resultado: <span class="resultado">mínimo en (1, −4); cruza el eje x en −1 y 3</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar el signo de b. Si b = −2, entonces −b es +2.</p>`,
    vidaReal: `
      <p>Muchas cosas siguen un arco o tienen un punto ideal en medio. Esta lección te ayuda a encontrarlo:</p>
      <ul>
        <li>Una pelota, un chorro de agua o un balón suben, se frenan y bajan en curva. Puedes calcular qué tan alto llegan y dónde caen.</li>
        <li>Las antenas satelitales y los faros de los autos tienen esa forma porque así juntan la señal o la luz en un punto.</li>
        <li>En un negocio, con un precio muy bajo ganas poco y con uno muy alto nadie compra. En medio está el mejor precio.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>La parábola y = −2x<sup>2</sup> + 3, ¿hacia dónde abre?</p>', opciones: ['Hacia arriba', 'Hacia abajo'], correcta: 1,
        pista: '<p>Fíjate en el signo de a, el número que multiplica a x<sup>2</sup>.</p>',
        solucion: '<p>a = −2 es negativo. Para x grandes, −2x<sup>2</sup> es muy negativo, así que la curva baja por los dos lados: abre hacia abajo y tiene un máximo.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la coordenada x del vértice de y = x<sup>2</sup> − 6x + 5?</p>', respuesta: 6 / 2,
        pista: `<p>x<sub>v</sub> = ${F('−b', '2a')} con a = 1 y b = −6.</p>`,
        solucion: `<p>Con a = 1 y b = −6: x<sub>v</sub> = ${F('−(−6)', '2(1)')} = ${F(6, 2)} = <strong>3</strong>.</p>` },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la coordenada y del vértice de y = x<sup>2</sup> − 6x + 5?</p>', respuesta: 3 ** 2 - 6 * 3 + 5,
        pista: '<p>Sustituye x = 3 en la función.</p>',
        solucion: '<p>Al meter x = 3: 3<sup>2</sup> − 6(3) + 5 = 9 − 18 + 5 = <strong>−4</strong>. El vértice es (3, −4).</p>' },
      { tipo: 'numero', enunciado: '<p>¿En qué valor de y cruza el eje y la parábola y = 2x<sup>2</sup> + 3x − 7?</p>', respuesta: -7,
        pista: '<p>En el eje y, x vale 0.</p>',
        solucion: '<p>Con x = 0, los términos 2x<sup>2</sup> y 3x valen 0 y solo queda c = <strong>−7</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Lanzas una pelota hacia arriba desde 1 m de altura. Su altura en metros después de t segundos es h(t) = −5t<sup>2</sup> + 20t + 1. ¿Cuál es la altura máxima?</p>', respuesta: -5 * 2 ** 2 + 20 * 2 + 1,
        pista: `<p>El máximo está en el vértice: t = ${F('−20', '2(−5)')} = 2. Luego calcula h(2).</p>`,
        solucion: '<p>h(2) = −5(4) + 20(2) + 1 = −20 + 40 + 1 = <strong>21 m</strong>. A los 2 segundos la pelota llega a su punto más alto.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál gráfica corresponde a y = (x − 2)<sup>2</sup>?</p>',
        opciones: [
          mini([{ f: (x) => (x + 2) ** 2 }], 'Parábola con vértice en (−2, 0)', [-5, 5], [-1, 7]),
          mini([{ f: (x) => (x - 2) ** 2 }], 'Parábola con vértice en (2, 0)', [-5, 5], [-1, 7]),
          mini([{ f: (x) => x * x - 2 }], 'Parábola con vértice en (0, −2)', [-5, 5], [-3, 5]),
        ], correcta: 1,
        pista: '<p>¿Para qué valor de x se hace cero (x − 2)<sup>2</sup>? Ese es el vértice.</p>',
        solucion: '<p>(x − 2)<sup>2</sup> = 0 cuando x = 2: el vértice está en (2, 0). Ojo: el "− 2" mueve la parábola a la derecha.</p>' },
    ],
    fuentes: [CA('5-1-quadratic-functions', 'Quadratic Functions'), WIKI('Función_cuadrática', 'Función cuadrática'), KHAN],
  });

  // ------------------------------------------------------------------
  L('Función exponencial: crecimiento y decaimiento', {
    objetivo: 'Reconocer el crecimiento y el decaimiento exponencial, calcular valores con f(x) = a·bˣ y distinguirlo del crecimiento lineal.',
    explicacion: `
      <p>Imagina que doblas una hoja de papel por la mitad. Ahora tiene 2 capas. Si la vuelves a doblar, tiene 4. Otra vez, y tiene 8. Cada doblez no suma capas: las multiplica por 2. Mira cómo crece:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Dobleces</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>
        <tr><th>Capas</th><td>1</td><td>2</td><td>4</td><td>8</td><td>16</td><td>32</td></tr>
      </table></div>
      <p>Fíjate que el número de capas es 2 multiplicado por sí mismo tantas veces como dobleces hiciste: con 3 dobleces, 2 × 2 × 2 = 2<sup>3</sup> = 8. El número de dobleces termina arriba, en el <em>exponente</em>, que es el número pequeño que dice cuántas veces se multiplica.</p>
      <h3>¿Cómo se escribe?</h3>
      <p>Una regla en la que la x está en el exponente se llama <strong>función exponencial</strong>. Se escribe <strong>f(x) = a · b<sup>x</sup></strong> y se lee "f de x es igual a a por b a la x". Aquí x es el número de pasos: dobleces, horas o años. Las letras a y b son números fijos:</p>
      <ul>
        <li><strong>a</strong> es <strong>con cuánto empiezas</strong>: lo que vale todo cuando x = 0. Se llama <strong>valor inicial</strong>. En el papel, a = 1, una sola capa.</li>
        <li><strong>b</strong> es <strong>por cuánto se multiplica en cada paso</strong>. Se llama <strong>base</strong> o factor. En el papel, b = 2.</li>
      </ul>
      <p>¿Por qué a es el valor inicial? Porque cualquier número elevado a 0 vale 1. Con x = 0 queda a · 1, que es a.</p>
      <h3>¿Crece o decrece?</h3>
      <p>Todo depende de b. Si b es mayor que 1 (b &gt; 1), cada paso multiplica por algo más grande que 1 y la cantidad <strong>crece</strong>. Si b está entre 0 y 1 (0 &lt; b &lt; 1), cada paso multiplica por algo menor que 1, y la cantidad se hace más chica. A eso se le llama <strong>decaimiento</strong>. Multiplicar por 0.5, por ejemplo, es quedarte con la mitad. Piensa en un pastel del que cada día te comes la mitad de lo que queda: cada vez queda menos, pero nunca llega a cero.</p>
      ${G({ x: [-3, 4], y: [-1, 9], funciones: [{ f: (x) => 2 ** x, etiqueta: 'y = 2ˣ (crece)' }, { f: (x) => 0.5 ** x, etiqueta: 'y = 0.5ˣ (decrece)' }], puntos: [{ x: 0, y: 1, etiqueta: '(0, 1)' }], descripcion: 'Dos curvas exponenciales: 2 a la x que crece muy rápido hacia la derecha, y 0.5 a la x que decrece; ambas pasan por (0, 1).' })}
      <p>Las dos curvas pasan por (0, 1), porque las dos empiezan con a = 1. Una sube cada vez más empinada; la otra baja y se acerca a cero sin tocarlo.</p>
      <h3>¿En qué se diferencia de una función lineal?</h3>
      <p>En la función lineal, cada paso <strong>suma</strong> lo mismo: +3, +3, +3. En la exponencial, cada paso <strong>multiplica</strong> por lo mismo: ×2, ×2, ×2. Al principio pueden parecer parecidas, y la lineal incluso puede ir adelante. Pero la exponencial siempre termina ganando, y por mucho, porque cada vez multiplica una cantidad más grande.</p>
      ${G({ x: [0, 6], y: [0, 40], funciones: [{ f: (x) => 2 ** x, etiqueta: 'exponencial: 2ˣ' }, { f: (x) => 3 * x + 5, etiqueta: 'lineal: 3x + 5' }], descripcion: 'Comparación: la recta 3x más 5 empieza arriba, pero la curva 2 a la x la alcanza cerca de x igual a 4 y después crece mucho más rápido.' })}
      <p>Compara: con x = 3, la recta 3x + 5 vale 14 y la curva 2<sup>x</sup> vale 8. Se cruzan un poco después de x = 4, donde las dos valen cerca de 17. Con x = 6, la recta vale 23 y la curva ya vale 64.</p>
      <h3>¿Y si te dan un porcentaje?</h3>
      <p>Muchas veces no te dicen "se multiplica por 1.05", sino "crece 5% cada año". En la lección de porcentajes viste que un aumento del 5% es el 100% más el 5%, o sea, multiplicar por 1.05. Aquí funciona igual:</p>
      <ul>
        <li>Si algo crece un porcentaje r cada periodo, b = 1 + r, con r escrito como decimal. Crecer 5% es multiplicar por 1.05.</li>
        <li>Si algo pierde un porcentaje r cada periodo, b = 1 − r. Perder 20% es quedarte con el 80%, es decir, multiplicar por 0.80.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> confundir a con b. En y = 0.2 · 4<sup>x</sup>, el 0.2 es con cuánto empiezas. La que decide si crece o decrece es la base, 4, que es mayor que 1: crece.</p>`,
    ejemplo: `
      <p>Un cultivo empieza con 100 bacterias y se duplica cada hora. ¿Cuántas habrá en 5 horas?</p>
      <ol class="pasos-ej">
        <li>Identifica con cuánto empiezas: 100 bacterias, así que a = 100.</li>
        <li>Identifica por cuánto se multiplica cada hora. "Se duplica" quiere decir que se multiplica por 2, así que b = 2. La regla queda N(t) = 100 · 2<sup>t</sup>, donde t son las horas.</li>
        <li>Pon t = 5. Primero la potencia, por la jerarquía de operaciones: 2<sup>5</sup> = 2 · 2 · 2 · 2 · 2 = 32. Luego, 100 · 32 = 3 200.</li>
        <li>Comprueba hora por hora: 100 → 200 → 400 → 800 → 1 600 → 3 200. Son 5 duplicaciones y llegas al mismo número.</li>
      </ol>
      <p>Resultado: <span class="resultado">3 200 bacterias</span>.</p>
      <p class="nota"><strong>Error común:</strong> calcular 100 · 2 · 5 = 1 000. Eso sería duplicar una sola vez y luego multiplicar por 5; aquí se duplica cinco veces seguidas.</p>`,
    vidaReal: `
      <p>Algunas cosas no crecen sumando lo mismo, sino multiplicándose. Al principio parecen poca cosa y de pronto se disparan:</p>
      <ul>
        <li>Tus ahorros en el banco, cuando los intereses también generan intereses. Lo mismo pasa con una deuda que no pagas.</li>
        <li>Un video viral o una enfermedad contagiosa: cada persona se lo pasa a varias más.</li>
        <li>También hay cosas que se reducen así, como el valor de un auto con los años o un medicamento que tu cuerpo va eliminando.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Si f(x) = 3 · 2<sup>x</sup>, ¿cuánto vale f(4)?</p>', respuesta: 3 * 2 ** 4,
        pista: '<p>Primero la potencia: 2<sup>4</sup> = 16.</p>',
        solucion: '<p>Primero la potencia: 2<sup>4</sup> = 16. Después la multiplicación: 3 · 16 = <strong>48</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas funciones <strong>decrece</strong>?</p>',
        opciones: ['y = 5 · (1.2)<sup>x</sup>', 'y = 2 · (0.7)<sup>x</sup>', 'y = 0.5 · 3<sup>x</sup>'], correcta: 1,
        pista: '<p>Fíjate solo en la base b: ¿es mayor o menor que 1?</p>',
        solucion: '<p>La base 0.7 es menor que 1, así que cada paso deja un poco menos: decrece. En la tercera, el 0.5 es el valor inicial, no la base; su base es 3, así que crece.</p>' },
      { tipo: 'numero', enunciado: '<p>Inviertes $10 000 al 10% anual con interés compuesto (cada año el interés se calcula sobre todo lo que ya tienes, incluidos los intereses anteriores). ¿Cuánto tendrás después de 2 años?</p>', respuesta: 10000 * 1.1 ** 2, tolerancia: 0.005,
        pista: '<p>Cada año se multiplica por 1.10: 10 000 · 1.1<sup>2</sup>.</p>',
        solucion: '<p>Cada año se multiplica por 1.10: 10 000 → 11 000 → 12 100. En una sola cuenta, 10 000 · 1.1<sup>2</sup> = 10 000 · 1.21 = <strong>$12 100</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un auto de $200 000 pierde el 20% de su valor cada año. ¿Cuánto valdrá en 2 años?</p>', respuesta: 200000 * 0.8 ** 2, tolerancia: 0.005,
        pista: '<p>Cada año conserva el 80%: multiplica por 0.8 dos veces.</p>',
        solucion: '<p>Perder 20% es conservar el 80%, o sea, multiplicar por 0.8 cada año: 200 000 · 0.8 · 0.8 = 200 000 · 0.64 = <strong>$128 000</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tomas 400 mg de un medicamento y cada 6 horas tu cuerpo elimina la mitad. ¿Cuántos mg quedan después de 18 horas?</p>', respuesta: 400 * 0.5 ** 3,
        pista: '<p>18 horas son 3 periodos de 6 horas.</p>',
        solucion: '<p>18 ÷ 6 = 3 periodos, y en cada uno queda la mitad: 400 → 200 → 100 → <strong>50 mg</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Te ofrecen dos premios por 30 días. A: $1 000 cada día. B: 1 centavo el primer día, y cada día el doble que el anterior. ¿Cuál te da más dinero en total?</p>',
        opciones: ['A', 'B', 'Dan lo mismo'], correcta: 1,
        pista: '<p>Calcula cuánto te darían solo el día 30 con la opción B: 0.01 · 2<sup>29</sup>.</p>',
        solucion: '<p>A suma $30 000. B solo el día 30 ya da 0.01 · 2<sup>29</sup> ≈ $5.4 millones, y en total ≈ $10.7 millones. Así de poderoso es lo exponencial.</p>' },
    ],
    fuentes: [CA('6-1-exponential-functions', 'Exponential Functions'), WIKI('Función_exponencial', 'Función exponencial'), KHAN],
  });

  // ------------------------------------------------------------------
  L('Logaritmos', {
    objetivo: 'Entender el logaritmo como el exponente que buscas, calcular logaritmos sencillos, usar sus propiedades y despejar exponentes.',
    explicacion: `
      <p>En la lección anterior, una hoja de papel duplicaba sus capas con cada doblez. Ahora piensa la pregunta al revés: ¿cuántas veces tienes que doblarla para tener 8 capas? Cuentas: 2, 4, 8. Tres dobleces. Esa pregunta, "¿cuántas veces tengo que multiplicar?", es la que responde un logaritmo.</p>
      <p>Dicho con exponentes: ¿a qué número debo elevar el 2 para obtener 8? La respuesta es 3, porque 2<sup>3</sup> = 8. Se escribe así:</p>
      <p><strong>log<sub>2</sub>(8) = 3</strong></p>
      <p>Se lee "logaritmo en base 2 de 8 es igual a 3". El 2 pequeño de abajo es la <strong>base</strong>, el número que se multiplica, igual que en la función exponencial. El 8 es el número al que quieres llegar. Y el 3 es la respuesta: el exponente que buscabas.</p>
      <p>En general, <strong>log<sub>b</sub>(x) = y</strong> significa lo mismo que <strong>b<sup>y</sup> = x</strong>. Son dos formas de decir la misma relación, como "Ana es la mamá de Luis" y "Luis es el hijo de Ana". El <strong>logaritmo</strong> es la operación contraria a elevar a una potencia, igual que la resta es la contraria de la suma.</p>
      <h3>¿Cómo se calcula uno sencillo?</h3>
      <p>Pregúntate cuántas veces tienes que multiplicar la base para llegar al número:</p>
      <ul>
        <li>log<sub>2</sub>(8) = 3, porque 2<sup>3</sup> = 8.</li>
        <li>log<sub>10</sub>(1 000) = 3, porque 10<sup>3</sup> = 1 000. Con base 10 basta contar los ceros.</li>
        <li>log<sub>10</sub>(0.01) = −2, porque 10<sup>−2</sup> = ${F(1, 100)}. Un exponente negativo quiere decir dividir: 10<sup>−2</sup> es 1 entre 10<sup>2</sup>.</li>
        <li>Siempre: log<sub>b</sub>(1) = 0, porque todo número elevado a 0 vale 1, y log<sub>b</sub>(b) = 1, porque elevar a 1 deja el número igual.</li>
      </ul>
      <p>Las calculadoras tienen dos teclas para esto. La tecla <strong>log</strong> usa base 10; cuando alguien escribe log sin base, se refiere a base 10. La tecla <strong>ln</strong> usa una base especial llamada <em>e</em>, que vale más o menos 2.718 y se usa mucho en ciencias.</p>
      <h3>¿Cómo se ve su gráfica?</h3>
      ${G({ x: [-1, 9], y: [-3, 4], funciones: [{ f: (x) => Math.log2(x), etiqueta: 'y = log₂(x)' }], puntos: [{ x: 1, y: 0, etiqueta: '(1, 0)' }, { x: 2, y: 1 }, { x: 4, y: 2, etiqueta: '(4, 2)' }, { x: 8, y: 3, etiqueta: '(8, 3)' }], descripcion: 'Curva del logaritmo base 2: pasa por (1, 0), (2, 1), (4, 2) y (8, 3); crece cada vez más despacio y no existe para x menor o igual a cero.' })}
      <p>La curva crece, pero cada vez más despacio. En base 2, para que la altura suba 1, la x tiene que duplicarse: de 1 a 2, de 2 a 4, de 4 a 8. Además, la curva no existe para x igual a 0 ni para números negativos (x ≤ 0), porque ninguna potencia de 2 da 0 o un número negativo.</p>
      <h3>¿Qué reglas cumplen?</h3>
      <p>Como los logaritmos son exponentes, siguen las leyes de los exponentes. Por ejemplo, al multiplicar potencias de la misma base se suman los exponentes, y de ahí sale la primera regla:</p>
      <ul>
        <li>log(x · y) = log(x) + log(y). El logaritmo de una multiplicación es la suma de los logaritmos.</li>
        <li>log(${F('x', 'y')}) = log(x) − log(y). El de una división es la resta, porque al dividir potencias se restan los exponentes.</li>
        <li>log(x<sup>n</sup>) = n · log(x). El exponente "baja" y queda multiplicando, porque x<sup>n</sup> es x multiplicada n veces y cada una aporta un log(x).</li>
      </ul>
      <p>La última es la más útil: te deja sacar una incógnita del exponente para despejarla, como verás en el ejemplo.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que log(x + y) es log(x) + log(y). La regla de la suma solo vale cuando adentro hay una multiplicación.</p>`,
    ejemplo: `
      <p>Inviertes al 8% anual. ¿En cuántos años se duplica tu dinero?</p>
      <ol class="pasos-ej">
        <li>Plantea la ecuación. Crecer 8% es multiplicar por 1.08 cada año, y duplicar es multiplicar por 2. Así que buscas t en 1.08<sup>t</sup> = 2. No importa cuánto inviertes: el doble de cualquier cantidad es multiplicarla por 2.</li>
        <li>La t está en el exponente, así que saca logaritmo a ambos lados. Si dos cosas son iguales, sus logaritmos también: log(1.08<sup>t</sup>) = log(2).</li>
        <li>Baja el exponente con la tercera regla: t · log(1.08) = log(2).</li>
        <li>Despeja t dividiendo entre log(1.08): t = ${F('log(2)', 'log(1.08)')} ≈ ${F('0.3010', '0.0334')} ≈ 9.0 (son valores redondeados que te da la calculadora).</li>
        <li>Comprueba con la calculadora: 1.08<sup>9</sup> ≈ 2.0, el doble.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 9 años</span>.</p>
      <p class="nota"><strong>Error común:</strong> dividir 2 entre 1.08. Como t está en el exponente, primero hay que bajarla con logaritmos.</p>`,
    vidaReal: `
      <p>Cuando algo puede ser diminuto o enorme, se mide con escalas que avanzan multiplicando en vez de sumando. Las encuentras en:</p>
      <ul>
        <li>Los sismos: cada punto más de magnitud significa ondas 10 veces más grandes y unas 32 veces más energía.</li>
        <li>El ruido: 20 decibeles más es un sonido 100 veces más intenso.</li>
        <li>La acidez de un líquido: un pH de 3 es 10 veces más ácido que uno de 4.</li>
        <li>Tu dinero: saber cuántos años tarda en duplicarse una inversión o una deuda.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Calcula log<sub>2</sub>(32).</p>', respuesta: Math.log2(32),
        pista: '<p>¿2 a qué potencia da 32?</p>',
        solucion: '<p>2<sup>5</sup> = 32, así que log<sub>2</sub>(32) = <strong>5</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula log<sub>10</sub>(10 000).</p>', respuesta: 4,
        pista: '<p>Cuenta los ceros.</p>',
        solucion: '<p>10 000 es un 1 con cuatro ceros, porque 10<sup>4</sup> = 10 000. Por eso log<sub>10</sub>(10 000) = <strong>4</strong>.</p>' },
      { tipo: 'numero', enunciado: `<p>Calcula log<sub>3</sub>(${F(1, 9)}).</p>`, respuesta: -2,
        pista: `<p>9 = 3<sup>2</sup>, y ${F(1, 9)} es 3 con exponente negativo.</p>`,
        solucion: `<p>3<sup>−2</sup> = ${F(1, 9)}, así que el resultado es <strong>−2</strong>.</p>` },
      { tipo: 'numero', enunciado: '<p>Calcula log(2) + log(50), en base 10, sin calculadora.</p>', respuesta: 2,
        pista: '<p>Usa la propiedad del producto: log(2) + log(50) = log(2 · 50).</p>',
        solucion: '<p>Por la regla de la multiplicación, log(2) + log(50) = log(2 · 50) = log(100). Como 10<sup>2</sup> = 100, el resultado es <strong>2</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una inversión crece 6% al año. ¿En cuántos años se duplica? Usa calculadora y redondea a un decimal.</p>', respuesta: Math.log(2) / Math.log(1.06), tolerancia: 0.06,
        pista: `<p>Resuelve 1.06<sup>t</sup> = 2: t = ${F('log(2)', 'log(1.06)')}.</p>`,
        solucion: `<p>Crecer 6% es multiplicar por 1.06 cada año. Al bajar el exponente con logaritmos queda t = ${F('0.30103', '0.02531')} ≈ <strong>11.9 años</strong>.</p>` },
      { tipo: 'numero', enunciado: '<p>¿Cuántas veces más grandes son las ondas de un sismo de magnitud 7 que las de uno de magnitud 5?</p>', respuesta: 10 ** 2,
        pista: '<p>Cada punto de magnitud multiplica el tamaño de las ondas por 10.</p>',
        solucion: '<p>Son 2 puntos de diferencia: 10 × 10 = <strong>100</strong> veces.</p>' },
    ],
    fuentes: [CA('6-3-logarithmic-functions', 'Logarithmic Functions'), CA('6-5-logarithmic-properties', 'Logarithmic Properties'), WIKI('Logaritmo', 'Logaritmo')],
  });
})();
