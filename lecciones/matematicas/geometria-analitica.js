// Matemáticas · Unidad 6: Geometría analítica.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const F = window.fraccion;
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('matematicas', titulo, datos);
  // Plano cartesiano con misma escala en x e y (los círculos se ven redondos).
  const plano = (x, y, opciones) => G({ x, y, proporcional: true, ...opciones });
  const oculta = (desde, hasta) => ({ tipo: 'linea', desde, hasta, punteada: true });
  const txt = (x, y, texto) => ({ tipo: 'texto', x, y, texto });
  const tol2 = 0.006; // "redondea a dos decimales"

  const CA = (pagina, nombre) => ({ nombre: `OpenStax, College Algebra 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/college-algebra-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = { nombre: 'Khan Academy en español: Geometría analítica', url: 'https://es.khanacademy.org/math/geometry/xff63fac4:hs-geo-analytic-geometry' };
  const KHAN_CONICAS = { nombre: 'Khan Academy en español: Secciones cónicas', url: 'https://es.khanacademy.org/math/algebra2/intro-to-conics-alg2' };

  // ------------------------------------------------------------------
  L('Distancia y punto medio', {
    objetivo: 'Calcular la distancia entre dos puntos del plano y el punto que está exactamente a la mitad entre ellos.',
    explicacion: `
      <p>Imagina una ciudad con calles en cuadrícula. Tu casa está en una esquina y la de tu amiga está 4 cuadras a la derecha y 3 cuadras hacia arriba. Caminando por las calles recorres 4 + 3 = 7 cuadras. Pero un pájaro que vuela en línea recta recorre menos. ¿Cuánto exactamente?</p>
      <p>Para responder preguntas así existe la <strong>geometría analítica</strong>: la parte de las matemáticas que describe las figuras con números. Cada punto se nombra con sus <strong>coordenadas</strong> (x, y), es decir, cuánto está a la derecha y cuánto hacia arriba, y con esos números calculamos longitudes, centros y formas sin necesidad de una regla.</p>
      <h3>¿Qué tan lejos están dos puntos?</h3>
      <p>Pon tu casa en A(1, 1) y la de tu amiga en B(5, 4). Si unes A con B, y además trazas el camino "por las calles" (primero a la derecha, luego hacia arriba), se forma un triángulo rectángulo:</p>
      <ul>
        <li>El lado acostado mide lo que avanzas en x: 5 − 1 = 4.</li>
        <li>El lado parado mide lo que subes en y: 4 − 1 = 3.</li>
        <li>El lado inclinado, el del pájaro, es la distancia que buscas.</li>
      </ul>
      <p>Ese lado inclinado es la hipotenusa, y en Geometría viste que el <strong>teorema de Pitágoras</strong> la calcula: el cuadrado de la hipotenusa es la suma de los cuadrados de los otros dos lados (los catetos). Así que d² = 4² + 3² = 16 + 9 = 25, y d = √25 = 5. El pájaro vuela 5 cuadras, no 7.</p>
      ${plano([-1, 7], [-1, 6], {
        descripcion: 'Puntos A(1, 1) y B(5, 4) unidos por un segmento de longitud 5. Con líneas punteadas se forma un triángulo rectángulo de catetos 4 horizontal y 3 vertical. El punto medio M(3, 2.5) está a la mitad del segmento.',
        figuras: [{ tipo: 'linea', desde: [1, 1], hasta: [5, 4] }, oculta([1, 1], [5, 1]), oculta([5, 1], [5, 4]), txt(3, 0.6, '4'), txt(5.4, 2.5, '3'), txt(2.6, 3.1, 'd = 5')],
        puntos: [{ x: 1, y: 1, etiqueta: 'A' }, { x: 5, y: 4, etiqueta: 'B' }, { x: 3, y: 2.5, etiqueta: 'M' }],
      })}
      <p>Lo mismo sirve para cualquier par de puntos. Si llamamos A(x₁, y₁) y B(x₂, y₂) a los dos puntos (el numerito de abajo solo dice "del primero" o "del segundo"), la distancia es:</p>
      <p class="resultado">d = √((x₂ − x₁)² + (y₂ − y₁)²)</p>
      <p>Léela así: <strong>x₂ − x₁ es cuánto avanzas a lo ancho</strong>, <strong>y₂ − y₁ es cuánto subes o bajas</strong>, y d es <strong>la distancia en línea recta</strong>. Elevas cada diferencia al cuadrado, las sumas y sacas raíz. Es Pitágoras escrito con coordenadas, y por eso se llama <strong>fórmula de distancia</strong>.</p>
      <h3>¿Dónde está la mitad del camino?</h3>
      <p>Ahora quieren encontrarse justo a la mitad. Piensa primero en una sola dirección: si una persona está en x = 1 y otra en x = 5, la mitad está en 3, que es el promedio (1 + 5) ÷ 2. Con la altura pasa igual: entre y = 1 y y = 4, la mitad es (1 + 4) ÷ 2 = 2.5. Juntas, esas dos mitades dan el <strong>punto medio</strong>, el punto que está a la misma distancia de A y de B:</p>
      <p class="resultado">M = (${F('x₁ + x₂', 2)}, ${F('y₁ + y₂', 2)})</p>
      <p>En palabras: la x del punto medio es <strong>el promedio de las dos x</strong>, y su y es <strong>el promedio de las dos y</strong>. En la figura: M = (${F('1 + 5', 2)}, ${F('1 + 4', 2)}) = (3, 2.5).</p>
      <p class="nota"><strong>Trampa común:</strong> preocuparte por el orden o por un resultado negativo al restar. Si haces 1 − 5 en lugar de 5 − 1 obtienes −4, pero al elevarlo al cuadrado da 16 igual que 4². Por eso el orden de los puntos no cambia la distancia. Lo que sí debes cuidar es restar los signos con calma, por ejemplo 4 − (−2) = 6.</p>`,
    ejemplo: `
      <p>Encuentra la distancia y el punto medio entre A(−2, 3) y B(4, −5).</p>
      <ol class="pasos-ej">
        <li>Primero calcula cuánto avanzas a lo ancho: 4 − (−2) = 4 + 2 = 6. Luego cuánto cambias de altura: −5 − 3 = −8. Es negativo porque B está más abajo que A, y no importa, porque se va a elevar al cuadrado.</li>
        <li>Aplica Pitágoras: d = √(6² + (−8)²) = √(36 + 64) = √100 = 10.</li>
        <li>Para el punto medio, promedia las x y luego las y: M = (${F('−2 + 4', 2)}, ${F('3 + (−5)', 2)}) = (${F(2, 2)}, ${F('−2', 2)}) = (1, −1).</li>
        <li>Comprueba que M está a la mitad: de A(−2, 3) a M(1, −1) avanzas 3 y bajas 4, así que la distancia es √(9 + 16) = 5, justo la mitad de 10.</li>
      </ol>
      <p>Resultado: <span class="resultado">d = 10 y M = (1, −1)</span>.</p>
      <p class="nota"><strong>Error común:</strong> restar en vez de sumar en el punto medio. El punto medio es un promedio: se suman las coordenadas y se divide entre 2.</p>`,
    vidaReal: `
      <p>Saber qué tan lejos están dos lugares, y dónde queda la mitad del camino, es algo que haces más seguido de lo que crees:</p>
      <ul>
        <li>Un mapa en el teléfono te dice a cuántos kilómetros "en línea recta" está un lugar.</li>
        <li>En un videojuego, el programa revisa si un personaje está lo bastante cerca de otro para hablarle.</li>
        <li>Dos amigos que viven lejos buscan un café que les quede a la misma distancia a los dos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuál es la distancia entre (0, 0) y (6, 8)?</p>', respuesta: Math.hypot(6, 8),
        pista: '<p>Desde (0, 0) avanzas 6 a lo ancho y subes 8. Usa esos dos números como catetos.</p>',
        solucion: '<p>Los catetos miden 6 y 8, así que d = √(6² + 8²) = √(36 + 64) = √100 = <strong>10</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la distancia entre (−2, 1) y (3, 13)?</p>', respuesta: Math.hypot(3 - -2, 13 - 1),
        pista: '<p>Calcula cuánto cambia x, 3 − (−2), y cuánto cambia y, 13 − 1.</p>',
        solucion: '<p>x cambia 3 − (−2) = 5 y y cambia 13 − 1 = 12. Con Pitágoras: √(25 + 144) = √169 = <strong>13</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la distancia entre (1, 1) y (4, 3)? Redondea a dos decimales.</p>', respuesta: Math.hypot(3, 2), tolerancia: tol2,
        pista: '<p>x cambia 3 y y cambia 2. Eleva al cuadrado, suma y saca raíz con calculadora.</p>',
        solucion: '<p>d = √(3² + 2²) = √(9 + 4) = √13. Como 13 no es un cuadrado exacto, se redondea: √13 ≈ <strong>3.61</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la coordenada <strong>x</strong> del punto medio entre (2, 7) y (8, −1)?</p>', respuesta: (2 + 8) / 2,
        pista: '<p>La x del punto medio es el promedio de las dos x: súmalas y divide entre 2.</p>',
        solucion: '<p>La mitad entre 2 y 8 es su promedio: (2 + 8) ÷ 2 = <strong>5</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la coordenada <strong>y</strong> del punto medio entre (2, 7) y (8, −1)?</p>', respuesta: (7 + -1) / 2,
        pista: '<p>Promedia las dos y, 7 y −1. Cuidado con el signo al sumar.</p>',
        solucion: '<p>(7 + (−1)) ÷ 2 = 6 ÷ 2 = <strong>3</strong>. Junto con el ejercicio anterior, el punto medio es (5, 3).</p>' },
      { tipo: 'numero', enunciado: '<p>Un triángulo tiene vértices A(0, 0), B(8, 0) y C(8, 15). ¿Cuál es su perímetro?</p>', respuesta: 8 + 15 + Math.hypot(8, 15),
        pista: '<p>AB y BC se ven en la cuadrícula; AC se calcula con la fórmula de distancia.</p>',
        solucion: '<p>AB es horizontal y mide 8; BC es vertical y mide 15. AC es la hipotenusa: √(64 + 225) = √289 = 17. El perímetro es la suma de los tres lados: 8 + 15 + 17 = <strong>40</strong>.</p>' },
    ],
    fuentes: [CA('2-1-the-rectangular-coordinate-systems-and-graphs', 'The Rectangular Coordinate Systems and Graphs'), WIKI('Distancia_euclidiana', 'Distancia euclidiana'), WIKI('Punto_medio', 'Punto medio')],
  });

  // ------------------------------------------------------------------
  L('La recta y su ecuación', {
    objetivo: 'Escribir la ecuación de una recta en distintas formas, reconocer rectas paralelas y perpendiculares, y encontrar dónde se cruzan dos rectas.',
    explicacion: `
      <p>En la lección de función lineal escribiste rectas como y = mx + b. Ahí <strong>m es cuánto sube la recta por cada paso a la derecha</strong> (la pendiente) y <strong>b es la altura donde cruza el eje y</strong> (la ordenada al origen). Esa forma se llama <strong>pendiente-ordenada</strong>. Pero no siempre te dan b; a veces solo sabes cuánto sube la recta y un punto por donde pasa. Aquí verás otras formas de escribirla y cómo se relacionan dos rectas.</p>
      <h3>Escribir la recta si conoces un punto y la pendiente</h3>
      <p>Supón que la recta pasa por el punto (3, 7) y tiene pendiente 2. Toma cualquier otro punto (x, y) de la recta. Como viste, la pendiente es la subida entre el avance, así que entre (3, 7) y (x, y) se cumple ${F('y − 7', 'x − 3')} = 2. Si multiplicas ambos lados por (x − 3) para quitar la fracción, queda y − 7 = 2(x − 3). En general:</p>
      <p class="resultado">y − y₁ = m(x − x₁)</p>
      <p>Aquí <strong>(x₁, y₁) es el punto que conoces</strong> y <strong>m es la pendiente</strong>. Se llama <strong>forma punto-pendiente</strong>, porque solo necesita esos dos datos. Si luego quitas el paréntesis y despejas y, regresas a la forma y = mx + b.</p>
      <h3>Pasar de la forma general a la que ya conoces</h3>
      <p>A veces la recta aparece con todo de un solo lado del igual, como 6x + 2y − 8 = 0. A esto se le llama <strong>forma general</strong>: Ax + By + C = 0, donde A, B y C son números. Para leer su pendiente, despeja y: pasa 6x y −8 al otro lado, 2y = −6x + 8, y divide todo entre 2, y = −3x + 4. Ahora sí se ve que la pendiente es −3 y que cruza el eje y en 4.</p>
      <h3>¿Cuándo dos rectas son paralelas?</h3>
      <p>Dos rectas <strong>paralelas</strong> nunca se tocan, como los rieles del tren. Eso pasa cuando tienen la <strong>misma pendiente</strong>: las dos suben lo mismo en cada paso, así que la distancia entre ellas nunca cambia. En la figura, y = 2x − 1 y y = 2x + 3 son paralelas; solo empiezan a distinta altura.</p>
      <h3>¿Cuándo forman una esquina recta?</h3>
      <p>Dos rectas son <strong>perpendiculares</strong> si se cruzan formando una esquina perfecta, como las orillas de una hoja. Mira la recta y = 2x − 1: por cada paso a la derecha sube 2. Si giras ese camino un cuarto de vuelta, lo que era "subir 2" se vuelve "ir 2 a la izquierda", y lo que era "avanzar 1" se vuelve "subir 1". Ahora subes 1 mientras retrocedes 2, así que la pendiente es −${F(1, 2)}. Fíjate que el 2 quedó volteado (${F(1, 2)}) y con el signo cambiado. Por eso la regla es:</p>
      <p class="resultado">m₁ · m₂ = −1</p>
      <p>Es decir, si multiplicas las dos pendientes debe dar −1: 2 × (−${F(1, 2)}) = −1.</p>
      ${plano([-3, 6], [-3, 7], {
        descripcion: 'Tres rectas: y igual a 2x menos 1, la paralela y igual a 2x más 3, y la perpendicular y igual a menos un medio de x más 4, que corta a la primera en el punto (2, 3).',
        funciones: [{ f: (x) => 2 * x - 1, etiqueta: 'y = 2x − 1' }, { f: (x) => 2 * x + 3, etiqueta: 'paralela: y = 2x + 3', serie: 2 }, { f: (x) => -x / 2 + 4, etiqueta: 'perpendicular: y = −x/2 + 4', serie: 1 }],
        puntos: [{ x: 2, y: 3, etiqueta: '(2, 3)' }],
      })}
      <h3>¿Dónde se cruzan dos rectas?</h3>
      <p>El punto donde se cruzan está en las dos rectas a la vez, así que cumple las dos ecuaciones. Encontrarlo es resolver un <strong>sistema de dos ecuaciones</strong>, como en Álgebra. Con y = 2x − 1 y y = −${F('x', 2)} + 4, iguala los lados derechos: 2x − 1 = −${F('x', 2)} + 4. Multiplica todo por 2 para quitar la fracción: 4x − 2 = −x + 8. Luego junta las x: 5x = 10, así que x = 2. Sustituyendo, y = 2(2) − 1 = 3. El cruce es (2, 3), el punto marcado en la figura.</p>
      <p class="nota"><strong>Trampa común:</strong> para la perpendicular, cambiar solo el signo (de 2 a −2) o solo voltear (de 2 a ${F(1, 2)}). Hay que hacer las dos cosas. Compruébalo multiplicando: si no da −1, no son perpendiculares.</p>`,
    ejemplo: `
      <p>Encuentra la recta que pasa por (2, 3) con pendiente −4.</p>
      <ol class="pasos-ej">
        <li>Como conoces un punto y la pendiente, usa la forma punto-pendiente con x₁ = 2, y₁ = 3 y m = −4: y − 3 = −4(x − 2).</li>
        <li>Quita el paréntesis multiplicando −4 por cada término: −4 · x = −4x y −4 · (−2) = +8. Queda y − 3 = −4x + 8.</li>
        <li>Despeja y sumando 3 a ambos lados: y = −4x + 11. Ya está en la forma pendiente-ordenada: baja 4 por cada paso y cruza el eje y en 11.</li>
        <li>Comprueba que el punto (2, 3) está en la recta: con x = 2, −4(2) + 11 = −8 + 11 = 3 ✓</li>
      </ol>
      <p>Resultado: <span class="resultado">y = −4x + 11</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar que −4 · (−2) da +8 y escribir −8. Revisa siempre el signo al quitar el paréntesis.</p>`,
    vidaReal: `
      <p>Las líneas rectas, y la forma en que se cruzan, están por todas partes:</p>
      <ul>
        <li>En muchas ciudades las avenidas van paralelas y las calles las cruzan formando esquinas rectas.</li>
        <li>Los programas de dibujo para planos de casas trazan paredes paralelas y esquinas perfectas con estas reglas.</li>
        <li>Si tus ahorros y los de un amigo crecen cada mes a distinto ritmo, puedes saber en qué mes tendrán la misma cantidad.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'expresion', simplificar: true, enunciado: '<p>Escribe la ecuación de la recta que pasa por (1, 5) con pendiente 3, en la forma y = … (escribe solo lo que va después del igual).</p>', respuesta: '3x + 2',
        pista: '<p>Usa la forma punto-pendiente con el punto (1, 5) y m = 3, y luego despeja y.</p>',
        solucion: '<p>Con punto-pendiente: y − 5 = 3(x − 1). Al quitar el paréntesis, y − 5 = 3x − 3, y al sumar 5 a ambos lados, y = <strong>3x + 2</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la pendiente de la recta 4x + 2y − 6 = 0?</p>', respuesta: -4 / 2,
        pista: '<p>Despeja y para que quede y = mx + b.</p>',
        solucion: '<p>Pasa 4x y −6 al otro lado: 2y = −4x + 6. Divide entre 2: y = −2x + 3. El número que multiplica a x es la pendiente, m = <strong>−2</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Qué pendiente tiene una recta perpendicular a y = 3x − 1? Escríbela como fracción.</p>', respuesta: -1 / 3,
        pista: '<p>La pendiente de y = 3x − 1 es 3. Voltéala y cámbiale el signo.</p>',
        solucion: `<p>Al voltear 3 queda ${F(1, 3)}, y al cambiarle el signo, <strong>−${F(1, 3)}</strong>. Se comprueba porque 3 × (−${F(1, 3)}) = −1.</p>` },
      { tipo: 'expresion', simplificar: true, enunciado: '<p>Escribe la recta paralela a y = −2x + 5 que pasa por (1, 1), en la forma y = … (solo lo que va después del igual).</p>', respuesta: '-2x + 3',
        pista: '<p>Una paralela tiene la misma pendiente, −2. Úsala con el punto (1, 1) en la forma punto-pendiente.</p>',
        solucion: '<p>Al ser paralela, m = −2. Entonces y − 1 = −2(x − 1) = −2x + 2, y al sumar 1, y = <strong>−2x + 3</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Las rectas y = x + 2 y y = −x + 8 se cruzan en un punto. ¿Cuál es su coordenada x?</p>', respuesta: (8 - 2) / 2,
        pista: '<p>En el cruce las dos y valen lo mismo, así que iguala los lados derechos: x + 2 = −x + 8.</p>',
        solucion: '<p>De x + 2 = −x + 8, suma x y resta 2 a ambos lados: 2x = 6, así que <strong>x = 3</strong>. Con y = 3 + 2 = 5, el punto de cruce es (3, 5).</p>' },
      { tipo: 'opciones', enunciado: `<p>Las rectas y = 4x + 1 y y = −${F('x', 4)} + 3 son…</p>`, opciones: ['Paralelas', 'Perpendiculares', 'Ni paralelas ni perpendiculares'], correcta: 1,
        pista: '<p>Identifica las dos pendientes. ¿Son iguales? ¿Su producto da −1?</p>',
        solucion: `<p>Las pendientes son 4 y −${F(1, 4)}. No son iguales, pero 4 × (−${F(1, 4)}) = −1, así que son perpendiculares.</p>` },
    ],
    fuentes: [CA('4-1-linear-functions', 'Linear Functions'), WIKI('Recta', 'Recta'), KHAN],
  });

  // ------------------------------------------------------------------
  L('La circunferencia', {
    objetivo: 'Escribir e interpretar la ecuación de una circunferencia, encontrar su centro y su radio, y decidir si un punto está dentro, sobre o fuera.',
    explicacion: `
      <p>Imagina una cabra atada con una cuerda de 4 metros a una estaca. Si camina con la cuerda siempre estirada, deja marcado en el pasto un círculo perfecto. Cada punto de esa marca está a 4 metros de la estaca, ni más ni menos.</p>
      <p>Esa es justo la idea de <strong>circunferencia</strong>: todos los puntos que están a la misma distancia de un punto fijo. El punto fijo (la estaca) se llama <strong>centro</strong>, y la distancia (la cuerda) se llama <strong>radio</strong>. Ojo: la circunferencia es solo la orilla; lo de adentro es el círculo.</p>
      <h3>¿Qué ecuación tiene?</h3>
      <p>Pon la estaca en el origen (0, 0) y la cuerda de 5. Un punto (x, y) está en la orilla si su distancia al centro es 5. Con la fórmula de distancia de la primera lección, eso es √(x² + y²) = 5. Para quitar la raíz, eleva ambos lados al cuadrado: x² + y² = 25. Por ejemplo, el punto (3, 4) cumple, porque 9 + 16 = 25.</p>
      <p>Si el centro está en otro lugar, en el punto (h, k), la distancia se mide desde ahí y la ecuación queda:</p>
      <p class="resultado">(x − h)² + (y − k)² = r²</p>
      <p>Léela así: <strong>h es la x del centro</strong>, <strong>k es la y del centro</strong> y <strong>r es el radio</strong>. A la izquierda está la distancia al centro elevada al cuadrado; a la derecha, el radio también al cuadrado. Si el centro es el origen, h y k valen 0 y queda x² + y² = r².</p>
      <p class="nota"><strong>Trampa común:</strong> leer mal los signos o el radio. En (x − 3)² + (y + 2)² = 16, el centro es (3, <strong>−2</strong>), porque y + 2 es lo mismo que y − (−2): la fórmula siempre resta, así que el centro lleva el signo contrario al que ves. Y el radio es √16 = 4, no 16, porque a la derecha está el radio al cuadrado.</p>
      ${plano([-2, 8], [-7, 3], {
        descripcion: 'Circunferencia con centro en (3, −2) y radio 4. Se marca el radio hasta el punto (3, 2).',
        figuras: [{ tipo: 'circulo', x: 3, y: -2, r: 4, relleno: true }, { tipo: 'linea', desde: [3, -2], hasta: [3, 2], serie: 1 }, txt(3.75, 0.9, 'r = 4')],
        puntos: [{ x: 3, y: -2, etiqueta: 'centro (3, −2)' }, { x: 3, y: 2, etiqueta: '(3, 2)' }],
      })}
      <h3>¿Qué hacer si la ecuación viene "desarrollada"?</h3>
      <p>A veces alguien ya quitó los paréntesis y la ecuación se ve así: x² + y² − 6x + 4y − 3 = 0. Ahí no se ven ni el centro ni el radio. Para encontrarlos hay que regresar a la forma con paréntesis. En productos notables viste que (x − 3)² = x² − 6x + 9, un trinomio cuadrado perfecto. Fíjate que el 9 sale de tomar la mitad de −6 y elevarla al cuadrado: (−3)² = 9. Eso siempre funciona, porque en (x − m)² el término del medio es −2m·x, así que m es la mitad del número que acompaña a x. Así que a x² − 6x solo le falta un 9 para ser un cuadrado. Sumarle lo que falta se llama <strong>completar el cuadrado</strong>. Se hace lo mismo con las y, y se suma lo mismo del otro lado del igual para no cambiar la ecuación. El ejemplo resuelto lo muestra paso a paso.</p>
      <h3>¿El punto está dentro, sobre o fuera?</h3>
      <p>Vuelve a la cabra. Si un arbusto está a 3 metros de la estaca, la cabra lo alcanza: está dentro. Si está a 4, queda justo en la orilla. Si está a 6, nunca llega: está fuera. Con números es igual: calcula la distancia del punto al centro y compárala con el radio. Si es menor, el punto está dentro; si es igual, está sobre la circunferencia; si es mayor, está fuera.</p>`,
    ejemplo: `
      <p>Encuentra el centro y el radio de x² + y² − 6x + 4y − 3 = 0.</p>
      <ol class="pasos-ej">
        <li>Agrupa las x y las y, y pasa el número suelto al otro lado: (x² − 6x) + (y² + 4y) = 3.</li>
        <li>Completa cada cuadrado. Para las x, la mitad de −6 es −3, y (−3)² = 9. Para las y, la mitad de 4 es 2, y 2² = 4. Suma 9 y 4 a <em>ambos</em> lados: (x² − 6x + 9) + (y² + 4y + 4) = 3 + 9 + 4.</li>
        <li>Escribe cada grupo como cuadrado: (x − 3)² + (y + 2)² = 16.</li>
        <li>El centro lleva el signo contrario, (3, −2), y el radio es √16 = 4.</li>
        <li>Comprueba con el punto (3, 2), que está en la orilla: 9 + 4 − 18 + 8 − 3 = 0 ✓</li>
      </ol>
      <p>Resultado: <span class="resultado">centro (3, −2) y radio 4</span> (la circunferencia de la figura).</p>
      <p class="nota"><strong>Error común:</strong> sumar el 9 y el 4 solo del lado izquierdo. Lo que agregas de un lado también va del otro.</p>`,
    vidaReal: `
      <p>Muchas cosas alcanzan hasta cierta distancia en todas direcciones, y eso dibuja un círculo:</p>
      <ul>
        <li>Una antena de celular da señal a las casas que están a cierta distancia de ella, y a las demás no.</li>
        <li>Un restaurante solo hace entregas a domicilio hasta cierto número de kilómetros a la redonda.</li>
        <li>Un aspersor riega el pasto hasta donde llega su chorro al girar.</li>
        <li>Para ubicar un sismo, se cruzan los círculos que marcan qué tan lejos ocurrió según varias estaciones.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuál es el radio de x² + y² = 49?</p>', respuesta: Math.sqrt(49),
        pista: '<p>El número de la derecha es el radio al cuadrado. ¿Qué número multiplicado por sí mismo da 49?</p>',
        solucion: '<p>La ecuación es x² + y² = r², así que r² = 49. Como 7 × 7 = 49, el radio es <strong>7</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la coordenada <strong>x</strong> del centro de (x − 5)² + (y + 1)² = 9?</p>', respuesta: 5,
        pista: '<p>Compara (x − 5) con (x − h). El centro lleva el signo contrario al que ves.</p>',
        solucion: '<p>(x − 5) tiene la forma (x − h) con h = 5, así que la x del centro es <strong>5</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la coordenada <strong>y</strong> del centro de (x − 5)² + (y + 1)² = 9?</p>', respuesta: -1,
        pista: '<p>Escribe y + 1 como una resta: y + 1 = y − (−1).</p>',
        solucion: '<p>Como y + 1 = y − (−1), k = <strong>−1</strong>. El centro es (5, −1).</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es el radio de (x + 2)² + (y − 3)² = 20? Redondea a dos decimales.</p>', respuesta: Math.sqrt(20), tolerancia: tol2,
        pista: '<p>El 20 de la derecha es el radio al cuadrado. Saca su raíz con calculadora.</p>',
        solucion: '<p>r² = 20, así que r = √20. Como 20 no es un cuadrado exacto, se redondea: √20 ≈ <strong>4.47</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una antena en el punto (0, 0) tiene un alcance de 10 km. ¿Recibe señal una casa ubicada en (6, 9) (en km)?</p>', opciones: ['Sí, está dentro del alcance', 'Justo en el límite', 'No, está fuera del alcance'], correcta: 2,
        pista: '<p>Calcula la distancia de la casa a la antena: √(6² + 9²).</p>',
        solucion: '<p>La distancia de la casa a la antena es √(36 + 81) = √117 ≈ 10.8 km. Es mayor que el alcance de 10 km, así que la casa está fuera.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es el radio de x² + y² + 4x − 6y − 12 = 0?</p>', respuesta: Math.sqrt(12 + 4 + 9),
        pista: '<p>Completa cuadrados: (x² + 4x + 4) + (y² − 6y + 9) = 12 + 4 + 9.</p>',
        solucion: '<p>Pasa el −12 al otro lado y completa los cuadrados, sumando 4 y 9 a ambos lados: (x + 2)² + (y − 3)² = 25. El radio es √25 = <strong>5</strong>.</p>' },
    ],
    fuentes: [CA('2-1-the-rectangular-coordinate-systems-and-graphs', 'The Distance Formula'), WIKI('Circunferencia', 'Circunferencia'), KHAN_CONICAS],
  });

  // ------------------------------------------------------------------
  L('La parábola', {
    objetivo: 'Entender la parábola como lugar geométrico con foco y directriz, y encontrar su vértice, su foco y hacia dónde abre a partir de su ecuación.',
    explicacion: `
      <p>Piensa en una antena de televisión satelital, ese plato curvo que se pone en los techos. Frente a él, sostenido por un brazo, hay un aparato pequeño que recibe la señal. No está ahí por casualidad: la curva del plato hace que toda la señal que llega rebote justo hacia ese punto. Esa curva es una <strong>parábola</strong>, y en esta lección verás qué la hace tan especial.</p>
      <p>En Funciones conociste la parábola como la gráfica de una función cuadrática, con su vértice (el punto más bajo o más alto). Ahora la verás de otra manera, como una figura definida por distancias, igual que la circunferencia.</p>
      <h3>¿Qué tienen en común todos sus puntos?</h3>
      <p>Toma un punto fijo, llamado <strong>foco</strong>, y una recta fija, llamada <strong>directriz</strong>. La parábola está formada por todos los puntos que están <strong>a la misma distancia del foco que de la directriz</strong>. La distancia a una recta se mide en línea recta y en ángulo recto, como cuando mides tu altura desde el piso.</p>
      ${plano([-5, 5], [-2, 6], {
        descripcion: 'Parábola x cuadrada igual a 4y, con vértice en el origen, foco en (0, 1) y directriz y igual a menos 1. El punto P(2, 1) está a distancia 2 del foco y a distancia 2 de la directriz.',
        funciones: [{ f: (x) => (x * x) / 4, etiqueta: 'x² = 4y' }],
        figuras: [oculta([-5, -1], [5, -1]), { tipo: 'linea', desde: [2, 1], hasta: [0, 1], serie: 1 }, { tipo: 'linea', desde: [2, 1], hasta: [2, -1], serie: 1 }, txt(3.4, -1.45, 'directriz y = −1')],
        puntos: [{ x: 0, y: 1, etiqueta: 'foco' }, { x: 2, y: 1, etiqueta: 'P' }, { x: 0, y: 0 }],
      })}
      <p>En la figura, el foco está en (0, 1) y la directriz es la recta y = −1. Revisa algunos puntos de la curva:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Punto</th><th>Distancia al foco</th><th>Distancia a la directriz</th></tr>
        <tr><td>(0, 0)</td><td>1</td><td>1</td></tr>
        <tr><td>(2, 1)</td><td>2</td><td>2</td></tr>
        <tr><td>(4, 4)</td><td>√(16 + 9) = 5</td><td>5</td></tr>
      </table></div>
      <p>En cada fila las dos distancias son iguales. El punto (0, 0), a la mitad entre el foco y la directriz, es el <strong>vértice</strong>.</p>
      <h3>¿Qué ecuación tiene?</h3>
      <p>Si el vértice está en el origen y la parábola abre hacia arriba o hacia abajo, pon el foco en (0, p) y la directriz en y = −p. Un punto (x, y) de la curva está a la misma distancia de los dos. Su distancia al foco, con la fórmula de distancia, es √(x² + (y − p)²). Su distancia a la directriz es la diferencia de alturas, y + p. Igualas y elevas al cuadrado: x² + (y − p)² = (y + p)². Al quitar los paréntesis queda x² + y² − 2py + p² = y² + 2py + p². Los y² y los p² se cancelan, y al pasar −2py al otro lado resulta:</p>
      <p class="resultado">x² = 4py</p>
      <p>Aquí <strong>p es la distancia del vértice al foco</strong>. El foco está en (0, p) y la directriz es la recta y = −p, a la misma distancia pero del otro lado. En la figura, x² = 4y, así que 4p = 4 y p = 1: foco en (0, 1) y directriz y = −1, como en la tabla.</p>
      <p>El signo de p te dice hacia dónde abre. Si p es positivo, el foco está arriba y la parábola abre hacia arriba, como un tazón. Si p es negativo, el foco está abajo y abre hacia abajo.</p>
      <p>Si en la ecuación se intercambian x y y, y² = 4px, la parábola queda acostada. Abre hacia la derecha si p es positivo y hacia la izquierda si es negativo. Su foco está en (p, 0) y su directriz es la recta x = −p.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que el foco está en el número que ves. En x² = 12y el foco no está en 12: primero divide entre 4, porque la ecuación dice 4p. Así p = 3 y el foco está en (0, 3).</p>
      <h3>¿Y si el vértice no está en el origen?</h3>
      <p>La forma <strong>y = a(x − h)² + k</strong> es la misma parábola movida para que su vértice quede en (h, k). Funciona como en la circunferencia: h lleva el signo contrario al que ves y k se lee tal cual. El número a se relaciona con p así: si despejas y en x² = 4py, queda y = ${F(1, '4p')}x², de modo que a = ${F(1, '4p')}.</p>`,
    ejemplo: `
      <p>Una antena parabólica tiene la forma x² = 8y (en decímetros; 1 dm = 10 cm). ¿Dónde debe ir el receptor?</p>
      <ol class="pasos-ej">
        <li>El receptor debe ir en el foco, porque ahí se juntan todas las señales que rebotan en el plato.</li>
        <li>Compara x² = 8y con x² = 4py. El número que acompaña a y es 8, así que 4p = 8. Divide entre 4: p = 2.</li>
        <li>Como p es positivo, el foco está arriba del vértice, en (0, 2). El vértice es el fondo del plato.</li>
        <li>Comprueba con un punto del plato, por ejemplo (4, 2), porque 4² = 16 = 8 × 2. Su distancia al foco (0, 2) es 4, y su distancia a la directriz y = −2 también es 2 − (−2) = 4. Son iguales ✓</li>
      </ol>
      <p>Resultado: <span class="resultado">el receptor va 2 dm arriba del fondo de la antena</span>.</p>
      <p class="nota"><strong>Error común:</strong> contestar 8 dm. El 8 es 4p, no p.</p>`,
    vidaReal: `
      <p>Esta curva aparece cuando algo se lanza, se cuelga o tiene que juntar luz o señal en un punto:</p>
      <ul>
        <li>Las antenas satelitales y algunas estufas solares juntan las señales o el calor del sol en un solo lugar.</li>
        <li>Los faros de un auto y las linternas hacen lo contrario: lanzan la luz derechita hacia adelante.</li>
        <li>El chorro de una fuente y el camino de un balón pateado dibujan esta misma curva.</li>
        <li>Los cables de algunos puentes colgantes también la siguen.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En la parábola x² = 12y, ¿cuál es la coordenada y del foco?</p>', respuesta: 12 / 4,
        pista: '<p>Compara con x² = 4py: ¿cuánto vale 4p? Luego divide entre 4.</p>',
        solucion: '<p>4p = 12, así que p = 3. El foco está en (0, p), es decir, en (0, <strong>3</strong>).</p>' },
      { tipo: 'numero', enunciado: '<p>En la misma parábola x² = 12y, la directriz es la recta y = ?</p>', respuesta: -3,
        pista: '<p>La directriz está a la misma distancia del vértice que el foco, pero del otro lado: y = −p.</p>',
        solucion: '<p>Del ejercicio anterior, p = 3. La directriz es y = −p, o sea, y = <strong>−3</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la coordenada x del vértice de y = 2(x − 3)² + 5?</p>', respuesta: 3,
        pista: '<p>En y = a(x − h)² + k, el vértice es (h, k).</p>',
        solucion: '<p>(x − 3) tiene la forma (x − h) con h = 3, así que la x del vértice es <strong>3</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la coordenada y del vértice de y = 2(x − 3)² + 5?</p>', respuesta: 5,
        pista: '<p>En y = a(x − h)² + k, k es el número que se suma al final.</p>',
        solucion: '<p>El número que se suma al final es k = <strong>5</strong>. El vértice es (3, 5).</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Hacia dónde abre la parábola x² = −8y?</p>', opciones: ['Hacia arriba', 'Hacia abajo', 'Hacia la derecha', 'Hacia la izquierda'], correcta: 1,
        pista: '<p>Es de la forma x² = 4py. ¿p es positivo o negativo?</p>',
        solucion: '<p>4p = −8, así que p = −2. Como p es negativo, el foco queda abajo del vértice y la parábola abre hacia abajo.</p>' },
      { tipo: 'numero', enunciado: '<p>El reflector de un horno solar tiene la forma x² = 16y, en decímetros. ¿A cuántos decímetros del fondo debe ir la olla para recibir todo el calor?</p>', respuesta: 16 / 4,
        pista: '<p>La olla va en el foco: 4p = 16.</p>',
        solucion: '<p>La olla va en el foco, a p del fondo. Como 4p = 16, p = <strong>4 dm</strong>.</p>' },
    ],
    fuentes: [CA('8-3-the-parabola', 'The Parabola'), WIKI('Parábola_(matemática)', 'Parábola'), KHAN_CONICAS],
  });

  // ------------------------------------------------------------------
  const elipse = (x) => 3 * Math.sqrt(1 - (x * x) / 25);
  // Ramas de la hipérbola x²/9 − y²/16 = 1 en forma paramétrica (x = ±3·cosh t, y = 4·senh t), para que lleguen hasta los vértices.
  const rama = (signo) => ({ tipo: 'poligono', abierto: true, serie: 1, puntos: Array.from({ length: 81 }, (_, i) => {
    const t = -1.7 + (3.4 * i) / 80;
    return [signo * 3 * Math.cosh(t), 4 * Math.sinh(t)];
  }) });
  L('Elipse e hipérbola', {
    objetivo: 'Reconocer la elipse y la hipérbola por su definición y su ecuación, y encontrar sus vértices y sus focos.',
    explicacion: `
      <p>Toma un cono de helado de papel y córtalo con unas tijeras. Si cortas derecho, de lado a lado, la orilla es una circunferencia. Si inclinas un poco el corte, sale un óvalo. Inclinándolo más salen otras curvas. Por eso la circunferencia, la parábola, la elipse y la hipérbola se llaman <strong>cónicas</strong>: todas salen de cortar un cono.</p>
      <h3>¿Cómo se dibuja una elipse?</h3>
      <p>Clava dos tachuelas en un cartón y amarra a ellas los extremos de un hilo flojo. Estira el hilo con la punta de un lápiz y muévelo dando la vuelta, con el hilo siempre tenso. Lo que dibujas es una <strong>elipse</strong>, un óvalo. Las tachuelas son los <strong>focos</strong>. Como el hilo siempre mide lo mismo, la distancia del lápiz a un foco más la distancia al otro <strong>suma siempre lo mismo</strong>. Esa es la definición de elipse.</p>
      <p>Con el centro en el origen, su ecuación es:</p>
      <p class="resultado">${F('x²', 'a²')} + ${F('y²', 'b²')} = 1</p>
      <p>Aquí <strong>a es la mitad del ancho</strong> (el semieje mayor) y <strong>b es la mitad del alto</strong> (el semieje menor), si a es mayor que b. Entonces la elipse es horizontal: sus puntas, llamadas <strong>vértices</strong>, están en (a, 0) y (−a, 0), lo que se abrevia (±a, 0); arriba y abajo llega hasta (0, ±b). Si el número mayor está debajo de y², la elipse es vertical, más alta que ancha.</p>
      <p>¿Cuánto mide el hilo? Pon el lápiz en el vértice (a, 0): está cerca de un foco y lejos del otro, y al sumar ambas distancias sale 2a. Así que la suma constante es <strong>2a</strong>, el ancho completo.</p>
      <p>¿Dónde van los focos? En (±c, 0), con</p>
      <p class="resultado">c² = a² − b²</p>
      <p>La razón: pon el lápiz arriba, en (0, b). Ahí está a la misma distancia de los dos focos, así que cada mitad del hilo mide a. Se forma un triángulo rectángulo con catetos b y c e hipotenusa a, y Pitágoras dice a² = b² + c².</p>
      <h3>¿Y la hipérbola?</h3>
      <p>La <strong>hipérbola</strong> cambia una sola palabra: son los puntos cuya <strong>diferencia</strong> de distancias a los dos focos es constante. El resultado son dos curvas separadas, llamadas ramas, que se abren hacia afuera. Su ecuación también cambia un solo signo, una resta en lugar de una suma:</p>
      <p class="resultado">${F('x²', 'a²')} − ${F('y²', 'b²')} = 1</p>
      <p>Sus vértices también están en (±a, 0). Lejos del centro, cada rama se acerca cada vez más a una recta sin tocarla nunca. Esas rectas se llaman <strong>asíntotas</strong> y son y = ±${F('b', 'a')}x. Para ver dónde van los focos, dibuja un rectángulo centrado en el origen, con medio ancho a y medio alto b: sus diagonales son justo las asíntotas. Los focos quedan más lejos del centro que los vértices, a la misma distancia que las esquinas del rectángulo. Esa distancia es la diagonal, y por Pitágoras vale <strong>c² = a² + b²</strong>, así que aquí se suma. (Demostrarlo por completo pide más álgebra; aquí lo damos como dato.)</p>
      <div class="dos-graficas">
        ${plano([-6, 6], [-4, 4], {
          descripcion: 'Elipse horizontal x cuadrada sobre 25 más y cuadrada sobre 9 igual a 1, con vértices en más y menos 5 y focos en (−4, 0) y (4, 0).',
          funciones: [{ f: elipse, etiqueta: 'elipse' }, { f: (x) => -elipse(x), serie: 0 }],
          puntos: [{ x: -4, y: 0, etiqueta: 'F₁' }, { x: 4, y: 0, etiqueta: 'F₂' }],
        })}
        ${plano([-7, 7], [-6, 6], {
          descripcion: 'Hipérbola x cuadrada sobre 9 menos y cuadrada sobre 16 igual a 1, con dos ramas que abren a izquierda y derecha desde los vértices en más y menos 3, focos en (−5, 0) y (5, 0), y asíntotas punteadas y igual a más y menos cuatro tercios de x.',
          figuras: [rama(1), rama(-1), oculta([-4.5, -6], [4.5, 6]), oculta([-4.5, 6], [4.5, -6])],
          puntos: [{ x: -5, y: 0, etiqueta: 'F₁' }, { x: 5, y: 0, etiqueta: 'F₂' }],
        })}
      </div>
      <p class="nota"><strong>Trampa común:</strong> confundir las dos fórmulas de c. En la elipse los focos están adentro, más cerca del centro que los vértices, así que c es menor que a y se resta. En la hipérbola están afuera, así que c es mayor y se suma.</p>`,
    ejemplo: `
      <p>Encuentra los vértices y los focos de ${F('x²', 25)} + ${F('y²', 9)} = 1 (la elipse de la figura).</p>
      <ol class="pasos-ej">
        <li>Es una suma, así que es una elipse. Bajo x² está 25, así que a² = 25 y a = 5. Bajo y² está 9, así que b² = 9 y b = 3. Como el número mayor está bajo x², es horizontal.</li>
        <li>Los vértices están en (±a, 0) = (±5, 0), y arriba y abajo llega hasta (0, ±3).</li>
        <li>Para los focos, en la elipse se resta: c² = 25 − 9 = 16, así que c = 4. Están en (±4, 0).</li>
        <li>Comprueba que el punto más alto, (0, 3), sí está en la elipse. Al sustituirlo, ${F('0²', 25)} + ${F('3²', 9)} = 0 + 1 = 1, así que cumple la ecuación ✓</li>
      </ol>
      <p>Resultado: <span class="resultado">mide 10 de ancho y 6 de alto, con focos en (±4, 0)</span>.</p>
      <p class="nota"><strong>Error común:</strong> tomar 25 como el semiancho. Ese es a²; el semiancho es su raíz, 5.</p>`,
    vidaReal: `
      <p>Estas curvas están en el cielo, en algunos edificios y hasta en los hospitales:</p>
      <ul>
        <li>La Tierra y los demás planetas giran alrededor del Sol siguiendo óvalos, no círculos perfectos.</li>
        <li>En algunas salas con techo ovalado, lo que alguien susurra en un punto se oye clarito en otro punto lejano.</li>
        <li>Los médicos pueden romper piedras del riñón sin cirugía, con ondas que se concentran en un punto exacto.</li>
        <li>Las torres de enfriamiento de las plantas de energía tienen forma de cintura curva.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: `<p>En la elipse ${F('x²', 36)} + ${F('y²', 16)} = 1, ¿cuánto mide el semieje mayor a?</p>`, respuesta: Math.sqrt(36),
        pista: '<p>a² es el número mayor de abajo. El semieje es su raíz.</p>',
        solucion: '<p>El denominador mayor es 36, así que a² = 36. Como 6 × 6 = 36, a = <strong>6</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En la misma elipse, ¿a qué distancia del centro están los focos (c)? Redondea a dos decimales.</p>', respuesta: Math.sqrt(36 - 16), tolerancia: tol2,
        pista: '<p>En la elipse los focos están adentro, así que se resta: c² = a² − b².</p>',
        solucion: '<p>c² = 36 − 16 = 20, así que c = √20. Como 20 no es un cuadrado exacto, se redondea: c ≈ <strong>4.47</strong>.</p>' },
      { tipo: 'numero', enunciado: `<p>En la hipérbola ${F('x²', 36)} − ${F('y²', 64)} = 1, ¿cuánto vale c?</p>`, respuesta: Math.sqrt(36 + 64),
        pista: '<p>En la hipérbola los focos están afuera de los vértices, así que se suma: c² = a² + b².</p>',
        solucion: '<p>c² = 36 + 64 = 100, así que c = <strong>10</strong>. Los focos están en (±10, 0).</p>' },
      { tipo: 'numero', enunciado: '<p>En la misma hipérbola, ¿cuál es la coordenada x del vértice de la rama derecha?</p>', respuesta: Math.sqrt(36),
        pista: '<p>Los vértices están en (±a, 0).</p>',
        solucion: '<p>Bajo x² está 36, así que a² = 36 y a = 6. El vértice de la rama derecha es (6, 0), así que su x es <strong>6</strong>.</p>' },
      { tipo: 'opciones', enunciado: `<p>¿Qué cónica es ${F('x²', 4)} + ${F('y²', 9)} = 1?</p>`, opciones: ['Elipse horizontal', 'Elipse vertical', 'Hipérbola', 'Circunferencia'], correcta: 1,
        pista: '<p>Es una suma (no una resta) y los denominadores son distintos. ¿Cuál es mayor?</p>',
        solucion: '<p>Suma con denominadores distintos: elipse. El mayor (9) está bajo y², así que es vertical.</p>' },
      { tipo: 'numero', enunciado: `<p>En la elipse ${F('x²', 49)} + ${F('y²', 16)} = 1, ¿cuánto suman las distancias de cualquier punto de la elipse a los dos focos?</p>`, respuesta: 2 * 7,
        pista: '<p>La suma es el largo del hilo, que es igual al ancho completo: 2a.</p>',
        solucion: '<p>a² = 49, así que a = 7. La suma de distancias a los focos es 2a = <strong>14</strong>.</p>' },
    ],
    fuentes: [CA('8-1-the-ellipse', 'The Ellipse'), CA('8-2-the-hyperbola', 'The Hyperbola'), WIKI('Sección_cónica', 'Sección cónica')],
  });
})();
