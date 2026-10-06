// Matemáticas · Unidad 7: Estadística y probabilidad.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const F = window.fraccion;
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('matematicas', titulo, datos);
  const txt = (x, y, texto) => ({ tipo: 'texto', x, y, texto });
  const tol = 0.006; // fracción o decimal con dos decimales (o porcentaje con una cifra decimal cuando se indique)

  // Gráfica de barras de una sola serie. Etiquetas abajo, valor encima de cada barra.
  // min > 0 dibuja un eje "truncado" (solo para mostrar cómo engaña).
  function barras({ etiquetas, valores, max, paso, descripcion, min = 0 }) {
    const n = valores.length, alto = max - min;
    const figuras = valores.flatMap((v, i) => [
      { tipo: 'poligono', puntos: [[i + 0.15, min], [i + 0.85, min], [i + 0.85, v], [i + 0.15, v]], solido: true },
      txt(i + 0.5, min - alto * 0.07, etiquetas[i]),
      txt(i + 0.5, v + alto * 0.05, String(v)),
    ]);
    return G({ x: [0, n], y: [min - alto * 0.12, max + alto * 0.1], pasos: [1e9, paso], nombres: false, figuras, descripcion });
  }
  // Histograma: barras juntas sobre intervalos; los bordes se rotulan en el eje.
  function histograma({ bordes, frecuencias, max, paso, descripcion }) {
    const figuras = frecuencias.flatMap((f, i) => [
      { tipo: 'poligono', puntos: [[i, 0], [i + 1, 0], [i + 1, f], [i, f]], solido: true },
      txt(i + 0.5, f + max * 0.05, String(f)),
    ]).concat(bordes.map((b, i) => txt(i, -max * 0.07, String(b))));
    return G({ x: [-0.3, frecuencias.length + 0.3], y: [-max * 0.12, max * 1.1], pasos: [1e9, paso], nombres: false, figuras, descripcion });
  }
  // Gráfica de pastel (máximo 3 sectores, uno por color validado), con porcentaje dentro y nombre afuera.
  function pastel({ etiquetas, valores, descripcion }) {
    const total = valores.reduce((a, b) => a + b, 0);
    let inicio = 90; // empieza arriba y avanza en sentido de las manecillas
    const figuras = [];
    valores.forEach((v, i) => {
      const barrido = (v / total) * 360, fin = inicio - barrido, medio = ((inicio + fin) / 2) * Math.PI / 180;
      const arco = Array.from({ length: 41 }, (_, k) => {
        const g = (inicio - (barrido * k) / 40) * Math.PI / 180;
        return [Math.cos(g), Math.sin(g)];
      });
      figuras.push({ tipo: 'poligono', puntos: [[0, 0], ...arco], solido: true, serie: i });
      figuras.push(txt(0.6 * Math.cos(medio), 0.6 * Math.sin(medio), `${Math.round((v / total) * 100)}%`));
      figuras.push(txt((1.32 - 0.3 * Math.min(0, Math.cos(medio))) * Math.cos(medio), 1.22 * Math.sin(medio), etiquetas[i]));
      inicio = fin;
    });
    return G({ x: [-1.9, 1.9], y: [-1.45, 1.45], proporcional: true, ejes: false, figuras, descripcion });
  }

  const IS = (pagina, nombre) => ({ nombre: `OpenStax, Introductory Statistics 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/introductory-statistics-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = { nombre: 'Khan Academy en español: Estadística y probabilidad', url: 'https://es.khanacademy.org/math/statistics-probability' };
  const KHAN_P = { nombre: 'Khan Academy en español: Probabilidad', url: 'https://es.khanacademy.org/math/probability' };

  // Datos que se reutilizan entre lecciones
  const CALIF = { etiquetas: ['6', '7', '8', '9', '10'], valores: [2, 5, 7, 4, 2] }; // 20 alumnos
  const TABLA_CALIF = `
    <div class="tabla-wrap"><table>
      <tr><th>Calificación</th><th>Frecuencia</th><th>Frecuencia relativa</th><th>Frecuencia acumulada</th></tr>
      <tr><td>6</td><td>2</td><td>0.10 (10%)</td><td>2</td></tr>
      <tr><td>7</td><td>5</td><td>0.25 (25%)</td><td>7</td></tr>
      <tr><td>8</td><td>7</td><td>0.35 (35%)</td><td>14</td></tr>
      <tr><td>9</td><td>4</td><td>0.20 (20%)</td><td>18</td></tr>
      <tr><td>10</td><td>2</td><td>0.10 (10%)</td><td>20</td></tr>
      <tr><th>Total</th><th>20</th><th>1 (100%)</th><th></th></tr>
    </table></div>`;

  // ------------------------------------------------------------------
  L('Recolectar y organizar datos', {
    objetivo: 'Distinguir población y muestra, reconocer los tipos de datos y detectar cuándo una forma de recolectar datos da resultados engañosos.',
    explicacion: `
      <p>Imagina que quieres saber qué sabor de helado prefieren los niños de tu ciudad. No puedes ir casa por casa preguntándole a cada uno: tardarías meses. Lo que sí puedes hacer es preguntarle a un grupo más pequeño y usar sus respuestas para darte una idea de lo que piensan todos. Esa forma de trabajar es el corazón de la <strong>estadística</strong>: la parte de las matemáticas que recolecta, ordena y estudia <strong>datos</strong> (respuestas, medidas, conteos) para tomar decisiones con información y no con corazonadas.</p>
      <h3>¿A quién le preguntas?</h3>
      <p>En el ejemplo del helado hay dos grupos distintos. Al grupo completo que te interesa (todos los niños de la ciudad) se le llama <strong>población</strong>. Al grupo más pequeño al que de verdad le preguntas se le llama <strong>muestra</strong>. Casi nunca se puede estudiar a toda la población, porque cuesta mucho tiempo y dinero, así que se estudia una muestra.</p>
      <p>Piensa en cómo pruebas la sopa mientras cocinas. No te tomas toda la olla: revuelves y pruebas una cucharada. Si revolviste bien, esa cucharada sabe igual que el resto. Una buena muestra funciona igual: debe parecerse a la población, y a eso se le llama ser <strong>representativa</strong>.</p>
      <p>La mejor forma de lograrlo es elegir la muestra <strong>al azar</strong>, es decir, de modo que cada persona de la población tenga la misma oportunidad de ser elegida, como si sacaras nombres de una urna. Así no hay grupos que salgan de más ni grupos que se queden fuera.</p>
      <p class="nota"><strong>Trampa común:</strong> elegir la muestra donde te queda cómodo. Si preguntas en un gimnasio cuánto ejercicio hace la gente de la ciudad, la respuesta saldrá exagerada, porque ahí casi todos hacen ejercicio. Y una encuesta en internet que contesta quien quiere solo escucha a los más interesados en el tema. Cuando la muestra está inclinada hacia un lado se dice que tiene <strong>sesgo</strong>, y sus resultados salen torcidos aunque las cuentas estén bien hechas.</p>
      <h3>¿Qué tipo de dato tienes?</h3>
      <p>Lo que mides o preguntas se llama <strong>variable</strong>, porque cambia de una persona a otra. No todas las variables son iguales, y saber de qué tipo es cada una te dirá más adelante qué cuentas y qué gráficas puedes usar con ella:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Tipo</th><th>Qué es</th><th>Ejemplos</th></tr>
        <tr><td><strong>Cualitativa</strong></td><td>categorías, no números</td><td>color favorito, marca de celular, opinión</td></tr>
        <tr><td><strong>Cuantitativa discreta</strong></td><td>números que se <em>cuentan</em></td><td>número de hermanos, goles, mascotas</td></tr>
        <tr><td><strong>Cuantitativa continua</strong></td><td>números que se <em>miden</em> y pueden tener decimales</td><td>estatura, peso, tiempo, temperatura</td></tr>
      </table></div>
      <p>Para distinguirlas, hazte dos preguntas. Primero: ¿la respuesta es un número? Si es un nombre o una categoría, como "fresa" o "azul", la variable es cualitativa. Si es un número, pregúntate después: ¿lo cuento o lo mido? Las mascotas se cuentan una por una y no existe "media mascota", así que es discreta. La estatura se mide y puede valer 1.52 m, 1.523 m o cualquier valor intermedio, así que es continua.</p>
      <h3>¿Cómo se consiguen los datos?</h3>
      <p>Hay tres caminos principales. En una <strong>encuesta</strong> preguntas a las personas. En la <strong>observación</strong> registras lo que pasa sin intervenir, como contar cuántos autos cruzan una esquina. En un <strong>experimento</strong> cambias algo a propósito y mides qué efecto tiene, como regar dos plantas con distinta cantidad de agua. Una vez reunidos, los datos se ordenan en listas o tablas, que es justo lo que verás en la siguiente lección.</p>`,
    ejemplo: `
      <p>Quieres saber cuántas horas al día usan el celular los 1 200 estudiantes de tu escuela.</p>
      <ol class="pasos-ej">
        <li>Primero identifica la población, el grupo completo que te interesa: los 1 200 estudiantes.</li>
        <li>Como preguntarle a los 1 200 tomaría demasiado tiempo, elige una muestra. Por ejemplo, 100 estudiantes sacados al azar de la lista oficial. No sirve preguntarle solo a tus amigos o a un salón, porque podrían usar el celular más o menos que el resto.</li>
        <li>Ahora fíjate en la variable: horas de uso. Es un número que se mide y puede tener decimales (2.5 horas), así que es cuantitativa continua.</li>
        <li>Por último, decide el método. Puedes hacer una encuesta, pero la gente suele calcular mal su tiempo. Es mejor la observación: revisar el registro de tiempo de pantalla de cada celular.</li>
      </ol>
      <p>Resultado: <span class="resultado">una muestra aleatoria de 100 da una buena idea de los 1 200</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que una muestra más grande siempre es mejor. Mil respuestas de un solo salón valen menos que cien elegidas al azar de toda la escuela.</p>`,
    vidaReal: `
      <p>Casi todo lo que se sabe sobre grandes grupos de personas se averigua preguntándole solo a una parte:</p>
      <ul>
        <li>Antes de una elección, las encuestas preguntan a unas pocas miles de personas para adivinar quién va a ganar.</li>
        <li>Para saber si un medicamento funciona, se prueba en un grupo de voluntarios y no en todo el país.</li>
        <li>Una tienda revisa qué compran sus clientes para decidir qué productos traer.</li>
        <li>Un país cuenta a sus habitantes para planear cuántas escuelas y hospitales construir.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>"Número de mascotas en casa" es una variable…</p>', opciones: ['Cualitativa', 'Cuantitativa discreta', 'Cuantitativa continua'], correcta: 1,
        pista: '<p>La respuesta es un número. Ahora pregúntate: ¿se cuenta o se mide?</p>',
        solucion: '<p>Las mascotas se cuentan una por una (0, 1, 2…) y no existe "media mascota". Por eso es cuantitativa discreta.</p>' },
      { tipo: 'opciones', enunciado: '<p>"Estatura" es una variable…</p>', opciones: ['Cualitativa', 'Cuantitativa discreta', 'Cuantitativa continua'], correcta: 2,
        pista: '<p>¿Puede tener decimales, como 1.635 m?</p>',
        solucion: '<p>La estatura se mide con una cinta, no se cuenta, y puede tomar cualquier valor intermedio entre dos números. Por eso es cuantitativa continua.</p>' },
      { tipo: 'opciones', enunciado: '<p>"Marca de celular" es una variable…</p>', opciones: ['Cualitativa', 'Cuantitativa discreta', 'Cuantitativa continua'], correcta: 0,
        pista: '<p>¿Sus valores son números o categorías?</p>',
        solucion: '<p>Las respuestas son nombres de marcas, no números. Cuando los valores son categorías, la variable es cualitativa.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas formas de obtener datos da una muestra <strong>sesgada</strong> sobre cuánto ejercicio hacen los habitantes de una ciudad?</p>',
        opciones: ['Preguntar a 500 personas elegidas al azar del padrón de la ciudad', 'Preguntar a 500 personas a la salida de un gimnasio', 'Preguntar a 500 personas elegidas al azar en distintas colonias'], correcta: 1,
        pista: '<p>¿Qué grupo no representa a toda la ciudad?</p>',
        solucion: '<p>Quien sale de un gimnasio hace más ejercicio que el promedio: esa muestra exagera el resultado.</p>' },
      { tipo: 'numero', enunciado: '<p>Una escuela tiene 800 alumnos y vas a encuestar al 10% elegido al azar. ¿Cuántos alumnos tendrá tu muestra?</p>', respuesta: 800 * 0.1,
        pista: '<p>Necesitas el 10% de 800. Sacar el 10% es dividir entre 10.</p>',
        solucion: '<p>El 10% de 800 es 800 ÷ 10 = <strong>80</strong> alumnos.</p>' },
      { tipo: 'opciones', enunciado: '<p>Para conocer la opinión de todo un país se encuestó a 2 000 personas. Esas 2 000 personas son…</p>', opciones: ['La población', 'La muestra', 'La variable'], correcta: 1,
        pista: '<p>¿Son todas las personas del país o solo una parte?</p>',
        solucion: '<p>Las 2 000 personas son solo una parte del país, así que son la muestra. La población es todo el país.</p>' },
    ],
    fuentes: [IS('1-1-definitions-of-statistics-probability-and-key-terms', 'Definitions of Statistics, Probability, and Key Terms'), IS('1-2-data-sampling-and-variation-in-data-and-sampling', 'Data, Sampling, and Variation'), WIKI('Muestra_estadística', 'Muestra estadística')],
  });

  // ------------------------------------------------------------------
  L('Tablas de frecuencia', {
    objetivo: 'Organizar datos en tablas de frecuencia absoluta, relativa y acumulada, e interpretarlas.',
    explicacion: `
      <p>Imagina que tu maestra te entrega las calificaciones de los 20 alumnos del salón en una lista revuelta: 8, 7, 9, 6, 8, 10, 7, 8… Con tantos números sueltos es difícil responder preguntas sencillas, como cuál fue la calificación más común o cuántos sacaron 7 o menos. Para verlo de un vistazo conviene ordenar los datos en una tabla.</p>
      <h3>¿Cuántas veces aparece cada valor?</h3>
      <p>El primer paso es contar. Recorres la lista y, para cada calificación posible, anotas cuántos alumnos la sacaron. Puedes hacerlo con palitos, como cuando cuentas votos en un pizarrón. A ese número se le llama <strong>frecuencia</strong> (a veces, frecuencia absoluta): es <strong>cuántas veces aparece un valor</strong>. Una tabla que muestra la frecuencia de cada valor se llama <strong>tabla de frecuencias</strong>.</p>
      <p>Así quedan las calificaciones de los 20 alumnos, ya contadas. Por ahora fíjate en las dos primeras columnas; las otras dos se explican enseguida:</p>
      ${TABLA_CALIF}
      <h3>¿Qué parte del total es?</h3>
      <p>Saber que 5 alumnos sacaron 7 está bien, pero no dice si son muchos o pocos. Cinco de 20 es bastante; cinco de 500 sería casi nada. Por eso se agrega la <strong>frecuencia relativa</strong>, que dice <strong>qué parte del total representa cada valor</strong>. Se calcula dividiendo la frecuencia entre el total de datos:</p>
      <p>frecuencia relativa = frecuencia ÷ total</p>
      <p>Para el 7: 5 ÷ 20 = 0.25. Si lo multiplicas por 100, como haces con cualquier porcentaje, obtienes 25%. Es decir, el 25% del salón sacó 7. La frecuencia relativa permite comparar grupos de distinto tamaño, porque siempre habla "de cada cien".</p>
      <h3>¿Cuántos hay de ese valor o menos?</h3>
      <p>A veces la pregunta no es por un solo valor, sino por un grupo: ¿cuántos sacaron 7 o menos? Para eso sirve la <strong>frecuencia acumulada</strong>, que es <strong>cuántos datos hay de ese valor o menos</strong>. Se obtiene sumando las frecuencias desde arriba, como cuando vas juntando monedas en una alcancía. Para el 6 es 2; para el 7 es 2 + 5 = 7; para el 9 es 2 + 5 + 7 + 4 = 18; y así hasta llegar al final.</p>
      <p class="nota"><strong>Comprobaciones rápidas:</strong> las frecuencias deben sumar el total de datos (20). Las frecuencias relativas deben sumar 1, es decir, 100%, porque todas las partes juntas forman el grupo completo. Y la última frecuencia acumulada siempre es el total. Si algo no cuadra, te faltó o te sobró contar algún dato.</p>
      <h3>¿Y si casi no se repite ningún valor?</h3>
      <p>Con datos continuos, como estaturas o tiempos, es raro que dos personas midan exactamente lo mismo: 152.3 cm, 152.8 cm, 153.1 cm… Una tabla con un renglón por valor sería larguísima y casi todas las frecuencias valdrían 1. En ese caso se agrupan los datos en <strong>intervalos</strong>, también llamados clases, como 150–155 cm, 155–160 cm, etcétera, y se cuenta cuántos datos caen en cada uno.</p>`,
    ejemplo: `
      <p>Se preguntó a 12 personas cuántos hermanos tienen: 0, 1, 1, 2, 0, 3, 1, 2, 1, 0, 2, 1. Haz la tabla.</p>
      <ol class="pasos-ej">
        <li>Primero anota los valores distintos que aparecen, de menor a mayor: 0, 1, 2 y 3.</li>
        <li>Ahora cuenta cuántas veces sale cada uno. El 0 aparece 3 veces, el 1 aparece 5 veces, el 2 aparece 3 veces y el 3, una vez. Esas son las frecuencias.</li>
        <li>Para la frecuencia relativa, divide cada frecuencia entre el total, 12, y pásala a porcentaje.</li>
      </ol>
      <div class="tabla-wrap"><table>
        <tr><th>Hermanos</th><th>Frecuencia</th><th>Relativa</th></tr>
        <tr><td>0</td><td>3</td><td>${F(3, 12)} = 25%</td></tr>
        <tr><td>1</td><td>5</td><td>${F(5, 12)} ≈ 41.7%</td></tr>
        <tr><td>2</td><td>3</td><td>${F(3, 12)} = 25%</td></tr>
        <tr><td>3</td><td>1</td><td>${F(1, 12)} ≈ 8.3%</td></tr>
      </table></div>
      <p>Comprueba: 3 + 5 + 3 + 1 = 12, el total de personas, y los porcentajes suman 100%.</p>
      <p>Resultado: <span class="resultado">lo más común es tener 1 hermano (41.7%)</span>.</p>`,
    vidaReal: `
      <p>Contar cuántas veces se repite algo es una de las formas más útiles de ordenar información:</p>
      <ul>
        <li>Una tienda de ropa cuenta cuántas prendas vende de cada talla para saber cuántas pedir la próxima vez.</li>
        <li>Los resultados de una votación se publican diciendo cuántos votos y qué porcentaje recibió cada opción.</li>
        <li>En una hoja de cálculo puedes pedirle a la computadora que cuente por ti cuántas veces aparece cada valor en una lista.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En otro grupo de 40 alumnos, 14 sacaron 8. ¿Qué porcentaje del grupo sacó 8?</p>', respuesta: (14 / 40) * 100,
        pista: '<p>Divide cuántos sacaron 8 entre el total de alumnos. Luego pásalo a porcentaje.</p>',
        solucion: '<p>Catorce alumnos de 40 sacaron 8: 14 ÷ 40 = 0.35, que multiplicado por 100 da <strong>35%</strong>. Es su frecuencia relativa.</p>' },
      { tipo: 'numero', enunciado: '<p>En otro salón, las calificaciones quedaron así: 3 alumnos sacaron 6, 4 sacaron 7, 6 sacaron 8, 5 sacaron 9 y 2 sacaron 10. ¿Cuántos sacaron 8 <strong>o menos</strong>?</p>', respuesta: 3 + 4 + 6,
        pista: '<p>"8 o menos" incluye a los que sacaron 6, 7 y 8. Es la frecuencia acumulada del 8.</p>',
        solucion: '<p>Suma las frecuencias del 6, el 7 y el 8: 3 + 4 + 6 = <strong>13</strong>. Esa es la frecuencia acumulada del 8 en ese salón.</p>' },
      { tipo: 'numero', enunciado: '<p>En la tabla de calificaciones, ¿cuántos alumnos sacaron 9 <strong>o más</strong>?</p>', respuesta: 4 + 2,
        pista: '<p>Suma las frecuencias del 9 y del 10.</p>',
        solucion: '<p>Cuatro sacaron 9 y dos sacaron 10: 4 + 2 = <strong>6</strong>. También puedes restar del total a los que sacaron 8 o menos: 20 − 14 = 6.</p>' },
      { tipo: 'numero', enunciado: '<p>En una votación de 60 personas, la opción A recibió 18 votos. ¿Qué porcentaje es?</p>', respuesta: (18 / 60) * 100,
        pista: '<p>Divide los votos de A entre el total de personas y pásalo a porcentaje.</p>',
        solucion: '<p>18 ÷ 60 = 0.3, y 0.3 × 100 = <strong>30%</strong>. Es su frecuencia relativa.</p>' },
      { tipo: 'numero', enunciado: '<p>En el ejemplo de los hermanos, ¿cuántas personas tienen <strong>al menos</strong> 2 hermanos?</p>', respuesta: 3 + 1,
        pista: '<p>"Al menos 2" significa 2 o más.</p>',
        solucion: '<p>"Al menos 2" incluye a quienes tienen 2 y a quienes tienen 3: 3 + 1 = <strong>4</strong> personas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuánto suman todas las frecuencias relativas de una tabla?</p>', opciones: ['El total de datos', '1 (o 100%)', 'Depende de los datos'], correcta: 1,
        pista: '<p>Cada relativa es una parte del total.</p>',
        solucion: '<p>Cada frecuencia relativa es la parte del total que ocupa un valor. Todas las partes juntas forman el grupo completo: 1, es decir, 100%.</p>' },
    ],
    fuentes: [IS('1-3-frequency-frequency-tables-and-levels-of-measurement', 'Frequency, Frequency Tables, and Levels of Measurement'), WIKI('Frecuencia_estadística', 'Frecuencia estadística'), KHAN],
  });

  // ------------------------------------------------------------------
  const ESTATURAS = { bordes: [150, 155, 160, 165, 170, 175], frecuencias: [3, 7, 10, 6, 4] };
  L('Gráficas: barras, pastel e histogramas', {
    objetivo: 'Elegir la gráfica adecuada para cada tipo de datos y leer correctamente gráficas de barras, de pastel e histogramas.',
    explicacion: `
      <p>Una tabla de frecuencias ordena los datos, pero hay que leer número por número para compararlos. Un dibujo bien hecho lo dice en un segundo: basta ver qué barra es más alta o qué rebanada es más grande. Hay muchas gráficas, y cada una sirve para una pregunta distinta. Aquí verás las tres más usadas y cuándo conviene cada una.</p>
      <h3>¿Qué categoría tiene más? La gráfica de barras</h3>
      <p>Toma la tabla de calificaciones de la lección anterior. Por cada calificación se dibuja una barra, y su altura es la frecuencia: cuántos alumnos la sacaron. Así, de un vistazo, ves que el 8 fue la calificación más común porque su barra es la más alta.</p>
      ${barras({ ...CALIF, max: 8, paso: 2, descripcion: 'Gráfica de barras de calificaciones de 20 alumnos: 6 tiene 2 alumnos, 7 tiene 5, 8 tiene 7, 9 tiene 4 y 10 tiene 2.' })}
      <p>Una <strong>gráfica de barras</strong> sirve para <strong>comparar cantidades entre categorías</strong> (colores, marcas, materias) o entre valores que se cuentan, como las calificaciones. Para que sea justa, todas las barras tienen el mismo ancho, van separadas y <strong>empiezan en cero</strong>. Esto último importa porque lo que tu ojo compara es la altura: si una barra mide el doble, debe representar el doble.</p>
      <h3>¿Cómo se reparte un todo? La gráfica de pastel</h3>
      <p>Piensa en una pizza que se reparte entre varias personas. Quien recibe más porcentaje se lleva una rebanada más grande. Así funciona la <strong>gráfica de pastel</strong> (o circular): muestra <strong>cómo se divide un todo en partes</strong>. Este pastel muestra cómo llegan a la escuela los alumnos:</p>
      ${pastel({ etiquetas: ['caminando', 'transporte público', 'auto'], valores: [45, 35, 20], descripcion: 'Gráfica de pastel de cómo llegan los alumnos a la escuela: 45% caminando, 35% en transporte público y 20% en auto.' })}
      <p>¿Qué tan grande es cada rebanada? Una vuelta completa al círculo mide 360°, y esa vuelta es el 100%. Por eso cada parte ocupa la misma fracción de los 360° que la que tiene del total:</p>
      <p><strong>ángulo = (porcentaje ÷ 100) × 360°</strong></p>
      <p>Se lee: pasa el porcentaje a decimal y multiplícalo por la vuelta completa. Por ejemplo, el 50% es media vuelta, 0.5 × 360° = 180°.</p>
      <p class="nota"><strong>Trampa común:</strong> usar un pastel con muchas partes o con partes de tamaño parecido. Con más de cinco rebanadas, o con rebanadas casi iguales, el ojo ya no distingue cuál es mayor. En esos casos es mejor una gráfica de barras.</p>
      <h3>¿Cómo se reparten datos que se miden? El histograma</h3>
      <p>Cuando los datos son medidas, como estaturas, se agrupan en intervalos (150–155 cm, 155–160 cm…), como viste en la lección anterior. Para dibujarlos se usa un <strong>histograma</strong>: se parece a una gráfica de barras, pero las barras van <strong>pegadas</strong>. Están juntas porque los intervalos no dejan huecos entre sí: justo donde termina uno empieza el siguiente. Si un dato cae exactamente en el borde, como 155 cm, se cuenta en el intervalo que empieza ahí (155–160).</p>
      ${histograma({ ...ESTATURAS, max: 11, paso: 2, descripcion: 'Histograma de estaturas de 30 personas: de 150 a 155 cm hay 3, de 155 a 160 hay 7, de 160 a 165 hay 10, de 165 a 170 hay 6 y de 170 a 175 hay 4.' })}
      <p>Aquí ves que el grupo más grande, 10 de las 30 personas, mide entre 160 y 165 cm, y que hay pocas personas muy bajas o muy altas.</p>
      <p class="nota">Otra gráfica muy común es la <strong>de líneas</strong>, que une puntos para ver cómo cambia algo a lo largo del <em>tiempo</em>, como la temperatura de cada día o el precio de cada mes.</p>`,
    ejemplo: `
      <p>En la gráfica de pastel, ¿qué ángulo ocupa "transporte público"?</p>
      <ol class="pasos-ej">
        <li>Primero busca qué porcentaje le toca. La gráfica dice 35%: de cada 100 alumnos, 35 llegan en transporte público.</li>
        <li>Pásalo a decimal dividiendo entre 100: 35% = 0.35. Eso quiere decir que su rebanada ocupa 0.35 de todo el círculo.</li>
        <li>Como el círculo completo mide 360°, multiplica para saber cuántos grados son esa parte: 0.35 × 360° = 126°.</li>
        <li>Comprueba con las otras rebanadas. Caminando: 0.45 × 360° = 162°. Auto: 0.20 × 360° = 72°. Al sumar las tres, 126° + 162° + 72° = 360°, la vuelta completa. Todo cuadra.</li>
      </ol>
      <p>Resultado: <span class="resultado">126°</span>.</p>
      <p class="nota"><strong>Error común:</strong> contestar 35°. El porcentaje no es el ángulo; primero hay que convertirlo en una parte de 360°.</p>`,
    vidaReal: `
      <p>Los dibujos con datos están en todos lados, porque se entienden más rápido que una lista de números:</p>
      <ul>
        <li>Tu recibo de luz o de agua suele mostrar con barras cuánto gastaste en los últimos meses.</li>
        <li>Las noticias y las presentaciones del trabajo usan dibujos para resumir mucha información de un vistazo.</li>
        <li>Saber leerlos, y notar cuándo están mal hechos, te protege de sacar conclusiones equivocadas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En la gráfica de barras de calificaciones, ¿cuántos alumnos sacaron 7?</p>', respuesta: 5,
        pista: '<p>Busca la barra del 7 y lee su altura.</p>',
        solucion: '<p>La barra del 7 llega hasta el 5, así que <strong>5</strong> alumnos sacaron 7.</p>' },
      { tipo: 'numero', enunciado: '<p>En una gráfica de pastel, ¿cuántos grados ocupa un sector del 25%?</p>', respuesta: 0.25 * 360,
        pista: '<p>Pasa el porcentaje a decimal (÷ 100) y multiplica por 360°.</p>',
        solucion: `<p>0.25 × 360° = <strong>90°</strong> (un cuarto del círculo).</p>` },
      { tipo: 'numero', enunciado: '<p>Si la encuesta de la gráfica de pastel se hizo a 200 alumnos, ¿cuántos llegan caminando?</p>', respuesta: 0.45 * 200,
        pista: '<p>La gráfica dice que el 45% llega caminando. Calcula el 45% de 200.</p>',
        solucion: '<p>El 45% de 200 es 0.45 × 200 = <strong>90</strong> alumnos.</p>' },
      { tipo: 'opciones', enunciado: '<p>Mediste la estatura de 100 personas. ¿Qué gráfica conviene para mostrar cómo se distribuyen?</p>', opciones: ['Pastel', 'Histograma', 'Barras separadas por cada estatura exacta'], correcta: 1,
        pista: '<p>La estatura es una variable continua.</p>',
        solucion: '<p>Un histograma. Casi no habrá dos estaturas exactamente iguales, así que conviene agruparlas en intervalos y dibujar barras pegadas.</p>' },
      { tipo: 'numero', enunciado: '<p>En el histograma de estaturas, ¿cuántas personas miden entre 160 y 170 cm?</p>', respuesta: 10 + 6,
        pista: '<p>Suma los intervalos 160–165 y 165–170.</p>',
        solucion: '<p>De 160 a 170 cm hay dos intervalos: 160–165, con 10 personas, y 165–170, con 6. En total, 10 + 6 = <strong>16</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿En qué caso <strong>no</strong> conviene una gráfica de pastel?</p>', opciones: ['Mostrar qué porcentaje de un presupuesto va a renta, comida y ahorro', 'Comparar las ventas de los 12 meses del año', 'Mostrar qué parte de una clase aprobó y qué parte no'], correcta: 1,
        pista: '<p>El pastel funciona con pocas partes de un todo.</p>',
        solucion: '<p>Doce meses son demasiados sectores y además es un cambio en el tiempo: mejor una gráfica de barras o de líneas.</p>' },
    ],
    fuentes: [IS('2-1-stem-and-leaf-graphs-stemplots-line-graphs-and-bar-graphs', 'Line Graphs and Bar Graphs'), IS('2-2-histograms-frequency-polygons-and-time-series-graphs', 'Histograms'), WIKI('Histograma', 'Histograma')],
  });

  // ------------------------------------------------------------------
  L('Media, mediana y moda', {
    objetivo: 'Calcular la media, la mediana y la moda, y elegir cuál describe mejor un conjunto de datos.',
    explicacion: `
      <p>Si alguien te pregunta "¿cómo te fue este año en la escuela?", no le recitas todas tus calificaciones: le dices "saqué 8 de promedio". Con un solo número resumes muchos. En estadística hay tres formas de elegir ese número "típico", que representa al grupo. Se llaman <strong>medidas de tendencia central</strong>, porque buscan el centro de los datos.</p>
      <h3>¿Cuánto le tocaría a cada uno? La media</h3>
      <p>Imagina que cinco amigos juntan sus canicas: uno trae 5, otro 9, otro 6, otro 12 y otro 8. Si las juntan todas y las reparten en partes iguales, ¿cuántas le tocan a cada quien? Primero se suman: 5 + 9 + 6 + 12 + 8 = 40. Luego se reparten entre los 5: 40 ÷ 5 = 8.</p>
      <p>Ese reparto parejo es la <strong>media</strong>, el número que todo el mundo llama <strong>promedio</strong>:</p>
      <p>media = ${F('suma de todos los datos', 'cuántos datos hay')}</p>
      <p>En las canicas: ${F('5 + 9 + 6 + 12 + 8', 5)} = ${F(40, 5)} = 8. Arriba va todo lo que hay junto y abajo, entre cuántos se reparte.</p>
      <h3>¿Quién queda en medio? La mediana</h3>
      <p>Ahora imagina que formas a cinco niños del más bajo al más alto. El que queda justo a la mitad de la fila tiene tantos niños más bajos a un lado como más altos al otro. Esa es la idea de la <strong>mediana</strong>: <strong>el dato del centro</strong> cuando los ordenas de menor a mayor.</p>
      <ul>
        <li>Con 2, 5, 8, 11, 14, el del centro es el 8: hay dos datos antes y dos después. La mediana es 8.</li>
        <li>Con 3, 5, 9, 15 hay una cantidad par y no existe un solo dato central: quedan dos en medio, el 5 y el 9. En ese caso la mediana es el promedio de esos dos: ${F('5 + 9', 2)} = 7.</li>
      </ul>
      <p>Fíjate que primero hay que ordenar. Si tomas el de en medio de una lista revuelta, el resultado no significa nada.</p>
      <h3>¿Qué se repite más? La moda</h3>
      <p>La <strong>moda</strong> es el dato que <strong>más veces aparece</strong>, igual que "estar de moda" es lo que más gente usa. En 4, 6, 6, 1, 6, la moda es 6. Puede haber dos modas, si dos valores empatan, o ninguna, si nada se repite. Es la única de las tres que sirve con datos que no son números: el color de camisa más vendido es una moda, pero no puedes sumar colores para sacar una media.</p>
      <h3>¿Cuál conviene usar?</h3>
      <p>La media usa el valor de todos los datos, y eso es bueno, pero también es su debilidad: un solo dato muy alejado del resto la jala hacia él, como un niño muy pesado que inclina el subibaja. A esos datos que se salen del grupo se les llama <strong>valores atípicos</strong>. A la mediana no le pasa eso, porque solo le importa quién queda en medio, no qué tan lejos están los extremos.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que el promedio siempre dice lo "normal". Si en un grupo de amigos uno es millonario, el sueldo promedio sale altísimo aunque nadie más gane eso. Cuando hay valores atípicos, la mediana describe mejor lo típico.</p>`,
    ejemplo: `
      <p>Cinco personas ganan (en miles de pesos al mes): 8, 9, 10, 11 y 62. ¿Qué describe mejor lo que gana una persona típica del grupo?</p>
      <ol class="pasos-ej">
        <li>Calcula la media. Suma todos los sueldos, 8 + 9 + 10 + 11 + 62 = 100, y reparte entre las 5 personas: 100 ÷ 5 = 20.</li>
        <li>Calcula la mediana. Los datos ya están ordenados de menor a mayor, así que el del centro, el tercero, es 10.</li>
        <li>Compara con los datos. Cuatro de las cinco personas ganan 11 o menos, y solo una gana mucho más. La media de 20 no se parece al sueldo de nadie: la jaló hacia arriba el sueldo de 62, que es un valor atípico.</li>
        <li>Comprueba la mediana: hay dos personas que ganan menos de 10 y dos que ganan más. Queda justo en medio.</li>
      </ol>
      <p>Resultado: <span class="resultado">la mediana (10) describe mejor el sueldo típico</span>.</p>
      <p class="nota"><strong>Error común:</strong> sacar la mediana sin ordenar los datos primero.</p>`,
    vidaReal: `
      <p>Resumir muchos números con uno solo te ayuda a entender rápido cómo es un grupo:</p>
      <ul>
        <li>Tu promedio escolar resume en un número todas tus calificaciones del año.</li>
        <li>Cuando las noticias hablan del sueldo o del precio de las casas "típico", suelen fijarse en el valor que queda a la mitad, para que unos pocos millonarios no lo inflen.</li>
        <li>Una zapatería se fija en la talla que más se vende, porque es la que más le conviene tener.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Calcula la media de 4, 8, 6, 10 y 7.</p>', respuesta: (4 + 8 + 6 + 10 + 7) / 5,
        pista: '<p>Suma los cinco números y reparte el total entre cuántos datos hay.</p>',
        solucion: '<p>La suma es 4 + 8 + 6 + 10 + 7 = 35, y hay 5 datos: 35 ÷ 5 = <strong>7</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula la mediana de 3, 9, 1, 7 y 5.</p>', respuesta: 5,
        pista: '<p>Primero ordénalos de menor a mayor y luego busca el que queda en medio.</p>',
        solucion: '<p>Ordenados quedan 1, 3, <strong>5</strong>, 7, 9. El 5 tiene dos datos antes y dos después, así que la mediana es 5.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula la mediana de 2, 4, 6 y 8.</p>', respuesta: (4 + 6) / 2,
        pista: '<p>Son cuatro datos: promedia los dos del centro.</p>',
        solucion: '<p>Con cuatro datos, en medio quedan dos: el 4 y el 6. Su promedio es (4 + 6) ÷ 2 = <strong>5</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la moda de 3, 5, 5, 2, 7, 5, 3?</p>', respuesta: 5,
        pista: '<p>¿Qué número aparece más veces?</p>',
        solucion: '<p>El 5 aparece tres veces: moda = <strong>5</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Llevas 7, 8 y 9 en tres exámenes. ¿Cuánto necesitas en el cuarto para terminar con promedio de 8.5?</p>', respuesta: 8.5 * 4 - (7 + 8 + 9),
        pista: '<p>Para promediar 8.5 en cuatro exámenes, la suma debe ser 8.5 × 4.</p>',
        solucion: '<p>Para que el promedio de cuatro exámenes sea 8.5, la suma debe ser 8.5 × 4 = 34. Ya llevas 7 + 8 + 9 = 24, así que te faltan 34 − 24 = <strong>10</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>En una colonia, 99 familias ganan alrededor de $15 000 al mes y una gana $5 000 000. ¿Qué medida describe mejor el ingreso típico?</p>', opciones: ['La media', 'La mediana', 'Ninguna'], correcta: 1,
        pista: '<p>¿Qué medida se deja jalar por un valor extremo?</p>',
        solucion: '<p>La mediana, que queda en unos $15 000. La familia de $5 000 000 es un valor atípico que jala la media hasta unos $65 000, una cifra que no representa a casi nadie.</p>' },
    ],
    fuentes: [IS('2-5-measures-of-the-center-of-the-data', 'Measures of the Center of the Data'), WIKI('Mediana_(estadística)', 'Mediana'), WIKI('Media_aritmética', 'Media aritmética')],
  });

  // ------------------------------------------------------------------
  L('Rango, varianza y desviación estándar', {
    objetivo: 'Medir qué tan dispersos están los datos con el rango, la varianza y la desviación estándar, e interpretar qué significa.',
    explicacion: `
      <p>Imagina dos grupos de jugadores de básquetbol, y los puntos que anotó cada jugador en un partido:</p>
      <ul>
        <li>Grupo A: 7, 7, 8, 9, 9 (media 8)</li>
        <li>Grupo B: 4, 6, 8, 10, 12 (media 8)</li>
      </ul>
      <p>Los dos grupos tienen la misma media, 8 puntos, pero no se parecen nada. En A todos anotaron casi lo mismo, muy cerca de 8. En B hay quien anotó 4 y quien anotó 12. La media no ve esa diferencia, así que hace falta otro tipo de número: uno que diga <strong>qué tan desparramados</strong> están los datos. A eso se le llama <strong>dispersión</strong>, y los números que la miden son las <strong>medidas de dispersión</strong>.</p>
      <h3>¿Qué tan lejos están los extremos? El rango</h3>
      <p>La forma más rápida es restar el dato mayor menos el menor. A ese resultado se le llama <strong>rango</strong>. En A: 9 − 7 = 2. En B: 12 − 4 = 8. El rango de B es mucho mayor, así que sus datos están más repartidos. El problema es que solo mira dos datos, los extremos, e ignora todo lo que pasa en medio.</p>
      <h3>¿Qué tan lejos está cada dato del centro? La varianza</h3>
      <p>Para usar todos los datos, mide qué tan lejos está cada uno de la media. En B, el 4 está 4 abajo de 8, y el 12 está 4 arriba. Esas distancias se llaman diferencias: dato menos media. Para B son −4, −2, 0, 2 y 4.</p>
      <p>Lo natural sería promediarlas, pero hay un problema: suman cero, porque las negativas cancelan a las positivas. Siempre pasa, porque la media es justo el punto de equilibrio. La solución es elevar cada diferencia al cuadrado, es decir, multiplicarla por sí misma. Así, todas quedan positivas: (−4)<sup>2</sup> = 16, igual que 4<sup>2</sup> = 16. El promedio de esos cuadrados se llama <strong>varianza</strong>:</p>
      <ol>
        <li>Resta la media a cada dato.</li>
        <li>Eleva cada diferencia al cuadrado (para que las negativas no cancelen a las positivas).</li>
        <li>Promedia esos cuadrados.</li>
      </ol>
      <p>Mientras más grande la varianza, más lejos de la media están los datos.</p>
      <h3>Regresar a las unidades de los datos: la desviación estándar</h3>
      <p>La varianza tiene un detalle incómodo: al elevar al cuadrado, también se elevan las unidades. Si los datos son puntos, la varianza está en "puntos al cuadrado", algo que nadie sabe imaginar. Para deshacer el cuadrado se saca la raíz cuadrada, que ya viste en Aritmética: la operación contraria, que busca el número que, multiplicado por sí mismo, da el que tienes. El resultado es la <strong>desviación estándar</strong>:</p>
      <p><strong>desviación estándar = √varianza</strong></p>
      <p>Se lee como "qué tanto se alejan los datos de la media, más o menos, en promedio", y está en las mismas unidades que los datos.</p>
      <p class="nota">Cuando los datos son una <em>muestra</em> y no toda la población, en la varianza se divide entre n − 1 en lugar de n, donde n es cuántos datos hay. Las calculadoras y hojas de cálculo tienen ambas versiones (por ejemplo, DESVEST.P y DESVEST.M). En esta lección usamos la de población (dividir entre n).</p>
      <p>En muchos fenómenos (estaturas, errores de medición), cerca de <strong>dos de cada tres datos</strong> (alrededor de 68%) caen a menos de una desviación estándar de la media.</p>`,
    ejemplo: `
      <p>Calcula la desviación estándar del grupo B: 4, 6, 8, 10, 12.</p>
      <ol class="pasos-ej">
        <li>Primero necesitas la media: (4 + 6 + 8 + 10 + 12) ÷ 5 = 40 ÷ 5 = 8. Ahora resta 8 a cada dato para ver qué tan lejos está: −4, −2, 0, 2, 4.</li>
        <li>Eleva cada diferencia al cuadrado para que ninguna sea negativa: 16, 4, 0, 4, 16. Súmalos: 40.</li>
        <li>Promedia esos cuadrados dividiendo entre los 5 datos. Esa es la varianza: 40 ÷ 5 = 8.</li>
        <li>Saca la raíz cuadrada para volver a las unidades de los datos: √8 ≈ 2.83. Compruébalo: 2.83 × 2.83 ≈ 8.</li>
      </ol>
      <p>Resultado: <span class="resultado">≈ 2.83</span>. Para el grupo A sale ≈ 0.89: mucho menos disperso.</p>
      <p class="nota"><strong>Error común:</strong> olvidar la raíz y contestar 8, que es la varianza.</p>`,
    vidaReal: `
      <p>Muchas veces no basta con saber cuánto vale algo en promedio; también importa si cambia mucho o poco:</p>
      <ul>
        <li><strong>Constancia:</strong> dos repartidores tardan 30 minutos en promedio, pero uno a veces tarda 28 y otras 32, y el otro a veces 20 y otras 40. ¿A cuál le confías tu pedido?</li>
        <li><strong>Calidad:</strong> una fábrica revisa que todos sus paquetes de arroz pesen casi lo mismo.</li>
        <li><strong>Ahorros:</strong> una inversión cuyo valor sube y baja mucho es más arriesgada.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuál es el rango de 12, 5, 20 y 8?</p>', respuesta: 20 - 5,
        pista: '<p>Busca el dato mayor y el menor, y réstalos.</p>',
        solucion: '<p>El mayor es 20 y el menor es 5: 20 − 5 = <strong>15</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula la varianza (de población) de 2, 4 y 6. Escribe una fracción o un decimal con dos decimales.</p>', respuesta: ((2 - 4) ** 2 + 0 + (6 - 4) ** 2) / 3, tolerancia: tol,
        pista: '<p>La media es 4. Resta 4 a cada dato y eleva cada diferencia al cuadrado.</p>',
        solucion: `<p>Las diferencias son −2, 0 y 2, y sus cuadrados, 4, 0 y 4. Su promedio es (4 + 0 + 4) ÷ 3 = <strong>${F(8, 3)}</strong> ≈ 2.67.</p>` },
      { tipo: 'numero', enunciado: '<p>Calcula la desviación estándar (de población) de 2, 4, 4, 4, 5, 5, 7, 9.</p>', respuesta: Math.sqrt([2, 4, 4, 4, 5, 5, 7, 9].reduce((a, v) => a + (v - 5) ** 2, 0) / 8),
        pista: '<p>La media es 5. Suma los cuadrados de las diferencias y divide entre 8; luego saca raíz.</p>',
        solucion: '<p>Restando 5 a cada dato y elevando al cuadrado quedan 9, 1, 1, 1, 0, 0, 4 y 16, que suman 32. La varianza es 32 ÷ 8 = 4, y la desviación estándar es √4 = <strong>2</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos conjuntos tiene la mayor desviación estándar?</p>', opciones: ['10, 10, 10, 10', '9, 10, 11', '5, 10, 15'], correcta: 2,
        pista: '<p>Los tres tienen media 10. ¿Cuál está más disperso?</p>',
        solucion: '<p>5, 10, 15. Sus datos se alejan hasta 5 de la media, mientras que en 9, 10, 11 se alejan 1 y en 10, 10, 10, 10 no se alejan nada.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la desviación estándar de 7, 7, 7, 7?</p>', respuesta: 0,
        pista: '<p>¿Qué tan lejos de la media está cada dato?</p>',
        solucion: '<p>Todos son iguales a la media: no hay dispersión. Desviación = <strong>0</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Dos pizzerías entregan en 30 minutos en promedio. En A la desviación estándar es de 2 minutos; en B, de 10. ¿Cuál es más confiable?</p>', opciones: ['A', 'B', 'Son igual de confiables'], correcta: 0,
        pista: '<p>Menor desviación significa tiempos más parecidos entre sí.</p>',
        solucion: '<p>A. Con una desviación de 2 minutos, sus entregas casi siempre llegan entre 28 y 32 minutos. En B los tiempos varían mucho más: puede tardar 20 o 40.</p>' },
    ],
    fuentes: [IS('2-7-measures-of-the-spread-of-the-data', 'Measures of the Spread of the Data'), WIKI('Desviación_típica', 'Desviación típica'), WIKI('Varianza', 'Varianza')],
  });

  // ------------------------------------------------------------------
  L('Probabilidad: qué tan posible es algo', {
    objetivo: 'Calcular la probabilidad de un evento, usar el complemento y entender qué significa (y qué no) una probabilidad.',
    explicacion: `
      <p>Antes de salir de casa te preguntas si va a llover. No lo sabes con seguridad, pero no es lo mismo un cielo despejado que uno lleno de nubes negras. Todos los días haces cálculos así, a ojo: "seguro que sí", "puede ser", "ni de broma". La <strong>probabilidad</strong> convierte ese "qué tan posible es" en un número, para poder comparar y decidir mejor.</p>
      <h3>¿Qué tan posible es? Una escala de 0 a 1</h3>
      <p>La probabilidad se mide con un número entre 0 y 1, o, si lo pasas a porcentaje, entre 0% y 100%:</p>
      <ul>
        <li>0 quiere decir <strong>imposible</strong>, como sacar un 7 con un dado normal.</li>
        <li>1 quiere decir <strong>seguro</strong>, como que el sol salga mañana.</li>
        <li>0.5 (50%) quiere decir que es igual de posible que pase o que no pase, como que una moneda caiga águila.</li>
      </ul>
      <h3>Tres palabras que necesitas</h3>
      <p>Piensa en tirar un dado. No puedes saber qué va a salir antes de tirarlo: a algo así se le llama <strong>experimento aleatorio</strong>. La lista de todo lo que puede salir, {1, 2, 3, 4, 5, 6}, se llama <strong>espacio muestral</strong>. Y lo que a ti te interesa que pase, por ejemplo "que salga par", se llama <strong>evento</strong>.</p>
      <h3>¿Cómo se calcula?</h3>
      <p>Si todos los resultados son igual de posibles, como en un dado sin trampa, basta con contar. Hay 6 resultados posibles, y "sale par" se cumple con 3 de ellos: el 2, el 4 y el 6. Así que sale par 3 de cada 6 veces, es decir, la mitad de las veces. En general:</p>
      <p class="resultado">P(evento) = ${F('casos favorables', 'casos posibles')}</p>
      <p>P(evento) se lee "probabilidad del evento". Arriba van los <strong>casos favorables</strong>, los resultados en los que pasa lo que buscas. Abajo van los <strong>casos posibles</strong>, todos los que pueden salir. En el dado: P(sale par en un dado) = ${F(3, 6)} = ${F(1, 2)}.</p>
      <p>Fíjate que es lo mismo que la frecuencia relativa: qué parte del total cumple lo que buscas.</p>
      <h3>¿Y la probabilidad de que no pase?</h3>
      <p>Algo pasa o no pasa; no hay tercera opción. Por eso las dos probabilidades juntas suman 1, el 100%. Así que la probabilidad de que algo <strong>no</strong> pase es <strong>1 − P(que pase)</strong>. A esto se le llama <strong>complemento</strong>, porque es lo que le falta para completar el 1. Si la probabilidad de lluvia es 0.7, la de que no llueva es 1 − 0.7 = 0.3.</p>
      <h3>Lo que la probabilidad no dice</h3>
      <p class="nota"><strong>Trampa común:</strong> si una moneda cae águila 5 veces seguidas, mucha gente piensa que "ya le toca sol". Pero la moneda no tiene memoria: en el siguiente lanzamiento sigue habiendo 50% de que caiga águila. Ese error tiene nombre: la <strong>falacia del jugador</strong>.</p>
      <p>Lo que sí pasa es que, con <strong>muchísimos</strong> lanzamientos, la proporción de águilas se acerca cada vez más a 50%. Esto se llama <strong>ley de los grandes números</strong>. La probabilidad no te dice qué saldrá la próxima vez; te dice qué pasará a la larga.</p>`,
    ejemplo: `
      <p>Una caja tiene 4 lápices rojos, 3 azules y 5 verdes. Sacas uno sin ver.</p>
      <ol class="pasos-ej">
        <li>Primero cuenta los casos posibles, todos los lápices que podrías sacar: 4 + 3 + 5 = 12.</li>
        <li>Para la probabilidad de verde, los casos favorables son los 5 verdes: P(verde) = ${F(5, 12)} ≈ 0.42.</li>
        <li>Para la probabilidad de que no sea verde usa el complemento: P(no verde) = 1 − ${F(5, 12)} = ${F(7, 12)} ≈ 0.58.</li>
        <li>Comprueba contando directamente: los que no son verdes son 4 rojos y 3 azules, 7 de 12. Coincide.</li>
      </ol>
      <p>Resultado: <span class="resultado">P(verde) ≈ 42% y P(no verde) ≈ 58%</span>.</p>
      <p class="nota"><strong>Error común:</strong> dividir los verdes entre los que no son verdes, como ${F(5, 7)}. Abajo siempre va el total de lápices, incluidos los que buscas.</p>`,
    vidaReal: `
      <p>Saber qué tan posible es que algo pase te ayuda a tomar decisiones con calma:</p>
      <ul>
        <li>Si el pronóstico dice "70% de probabilidad de lluvia", sabes que conviene llevar paraguas.</li>
        <li>Las aseguradoras deciden cuánto cobrar según qué tan seguido ocurren los choques o las enfermedades.</li>
        <li>Saber lo difícil que es ganar la lotería es la mejor defensa para no gastar de más en boletos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuál es la probabilidad de sacar 5 al tirar un dado? (Fracción o decimal con dos decimales).</p>', respuesta: 1 / 6, tolerancia: tol,
        pista: '<p>Un caso favorable entre seis posibles.</p>',
        solucion: `<p>Solo una cara de las seis tiene el 5, así que la probabilidad es <strong>${F(1, 6)}</strong> ≈ 0.17.</p>` },
      { tipo: 'numero', enunciado: '<p>En la bolsa con 3 rojas, 5 azules y 2 verdes, ¿cuál es la probabilidad de sacar una azul?</p>', respuesta: 5 / 10,
        pista: '<p>Los casos favorables son las canicas azules. ¿Cuántas canicas hay en total?</p>',
        solucion: '<p>Hay 5 azules de 10 canicas: 5 ÷ 10 = <strong>0.5</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En la misma bolsa, ¿cuál es la probabilidad de que la canica <strong>no</strong> sea roja?</p>', respuesta: 1 - 3 / 10,
        pista: '<p>Usa el complemento: 1 − P(roja).</p>',
        solucion: '<p>La probabilidad de roja es 3 ÷ 10 = 0.3. La de que no sea roja es lo que falta para llegar a 1: 1 − 0.3 = <strong>0.7</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una baraja inglesa tiene 52 cartas, con 4 ases. ¿Cuál es la probabilidad de sacar un as? (Fracción o decimal con dos decimales).</p>', respuesta: 4 / 52, tolerancia: tol,
        pista: '<p>Los casos favorables son los ases y los casos posibles son todas las cartas.</p>',
        solucion: `<p>Hay 4 ases entre 52 cartas: ${F(4, 52)}. Al dividir arriba y abajo entre 4 queda <strong>${F(1, 13)}</strong> ≈ 0.08.</p>` },
      { tipo: 'opciones', enunciado: '<p>Una moneda normal cayó águila 5 veces seguidas. En el siguiente lanzamiento…</p>', opciones: ['Es más probable que caiga sol', 'Es más probable que caiga águila', 'Las dos tienen 50%'], correcta: 2,
        pista: '<p>¿La moneda recuerda lo que pasó antes?</p>',
        solucion: '<p>Cada lanzamiento es independiente: sigue siendo 50% y 50%. Pensar lo contrario es la falacia del jugador.</p>' },
      { tipo: 'numero', enunciado: '<p>Una lotería tiene 1 000 000 de números posibles y compras uno. ¿Cuál es tu probabilidad de ganar, como decimal?</p>', respuesta: 1 / 1000000,
        pista: '<p>Tienes un caso favorable entre un millón de casos posibles.</p>',
        solucion: `<p>${F(1, '1 000 000')} = <strong>0.000001</strong>: una oportunidad en un millón, apenas 0.0001%.</p>` },
    ],
    fuentes: [IS('3-1-terminology', 'Probability Terminology'), WIKI('Probabilidad', 'Probabilidad'), WIKI('Falacia_del_jugador', 'Falacia del jugador')],
  });

  // ------------------------------------------------------------------
  L('Técnicas de conteo: permutaciones y combinaciones', {
    objetivo: 'Contar posibilidades sin hacer listas, usando el principio multiplicativo, factoriales, permutaciones y combinaciones.',
    explicacion: `
      <p>Para calcular una probabilidad necesitas contar los casos posibles. Con un dado es fácil: son 6. Pero ¿cuántas contraseñas de 4 dígitos existen?, ¿de cuántas formas se puede repartir un podio? Hacer la lista completa tomaría horas. Las <strong>técnicas de conteo</strong> son atajos para contar sin escribir la lista.</p>
      <h3>Decisiones una tras otra: el principio multiplicativo</h3>
      <p>Tienes 3 camisas y 4 pantalones. ¿Cuántos atuendos distintos puedes armar? Piensa en la camisa roja: puedes ponértela con cualquiera de los 4 pantalones, así que te da 4 atuendos. Lo mismo pasa con la camisa azul y con la blanca. Son 3 grupos de 4: 3 × 4 = 12 atuendos.</p>
      <p>Esa idea se llama <strong>principio multiplicativo</strong>: si una decisión tiene <em>a</em> opciones y otra tiene <em>b</em>, juntas hay <strong>a × b</strong> combinaciones. Se multiplica porque cada opción de la primera decisión se junta con todas las de la segunda. Funciona igual con tres o más decisiones.</p>
      <h3>¿De cuántas formas puedo ordenar? El factorial</h3>
      <p>¿De cuántas formas se pueden formar 4 amigos en una fila? Para el primer lugar hay 4 candidatos. Una vez que alguien lo ocupa, para el segundo quedan 3. Para el tercero quedan 2, y para el último, 1. Con el principio multiplicativo: 4 × 3 × 2 × 1 = 24 filas distintas.</p>
      <p>Multiplicar un número por todos los que tiene debajo hasta llegar a 1 es tan común que tiene su propio símbolo: <strong>n!</strong>, que se lee "n factorial". Aquí n es <strong>cuántas cosas quieres ordenar</strong>. Así, 4! = 4 × 3 × 2 × 1 = 24. Por definición, 0! = 1, porque hay exactamente una forma de ordenar nada: no hacer nada.</p>
      <h3>¿Importa el orden?</h3>
      <p>Muchas veces no ordenas todo, sino que eliges solo unos cuantos. En las fórmulas, n es <strong>cuántas cosas hay para escoger</strong> y r es <strong>cuántas eliges</strong>. La pregunta clave es: si cambio el orden, ¿obtengo algo distinto?</p>
      <div class="tabla-wrap"><table>
        <tr><th></th><th>Permutaciones (sí importa el orden)</th><th>Combinaciones (no importa)</th></tr>
        <tr><td>Fórmula</td><td>P(n, r) = ${F('n!', '(n − r)!')}</td><td>C(n, r) = ${F('n!', 'r! (n − r)!')}</td></tr>
        <tr><td>Ejemplo</td><td>oro, plata y bronce entre 5 corredores</td><td>elegir 3 personas para un comité</td></tr>
      </table></div>
      <p>En un podio el orden sí importa: ganar oro no es lo mismo que ganar bronce. Hay 5 opciones para el oro, 4 para la plata y 3 para el bronce: 5 × 4 × 3. A cada una de estas listas ordenadas se le llama <strong>permutación</strong>. La fórmula hace lo mismo: 5! ÷ 2! deja solo 5 × 4 × 3, porque los demás números se cancelan arriba y abajo.</p>
      <p>En un comité, en cambio, Ana, Beto y Caro forman el mismo comité que Caro, Ana y Beto. A estos grupos, donde el orden no importa, se les llama <strong>combinaciones</strong>. Para contarlos, primero cuentas como si el orden importara y luego divides entre las formas de reacomodar a los elegidos, que son r!. Así quitas los grupos repetidos.</p>
      <p class="nota">C(n, r) = ${F('P(n, r)', 'r!')}: las combinaciones son las permutaciones sin contar los reacomodos de los mismos r elementos.</p>`,
    ejemplo: `
      <p>Un candado de maleta tiene 3 ruedas, cada una con los dígitos del 0 al 9. ¿Cuántas claves distintas puedes formar?</p>
      <ol class="pasos-ej">
        <li>Piensa en cada posición como una decisión. Para la primera rueda hay 10 opciones, del 0 al 9. Como los dígitos se pueden repetir, la segunda también tiene 10 opciones, y lo mismo la tercera.</li>
        <li>Usa el principio multiplicativo, porque cada opción de una rueda se junta con todas las de las demás: 10 × 10 × 10 = 1 000.</li>
        <li>Comprueba con otra idea: las claves van de 000 a 999, y de 0 a 999 hay justo 1 000 números.</li>
      </ol>
      <p>Resultado: <span class="resultado">1 000 claves</span>. Por cada rueda que agregas, las posibilidades se multiplican por 10, así que un candado con más ruedas es mucho más seguro.</p>
      <p class="nota"><strong>Error común:</strong> usar 10 × 9 × 8 × 7. Eso solo vale si los dígitos no se pueden repetir.</p>`,
    vidaReal: `
      <p>Contar todas las posibilidades sin hacer una lista larguísima sirve más de lo que parece:</p>
      <ul>
        <li><strong>Seguridad:</strong> entender por qué una contraseña larga y con letras, números y símbolos es mucho más difícil de adivinar.</li>
        <li><strong>Loterías:</strong> saber cuántas jugadas distintas existen y, con eso, lo difícil que es ganar.</li>
        <li><strong>Organización:</strong> saber cuántos horarios, menús o equipos distintos se pueden formar con lo que tienes.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Calcula 5!</p>', respuesta: 5 * 4 * 3 * 2 * 1,
        pista: '<p>Multiplica 5 por todos los números que tiene debajo, hasta llegar a 1.</p>',
        solucion: '<p>5! = 5 × 4 × 3 × 2 × 1 = <strong>120</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un menú ofrece 3 entradas, 4 platos fuertes y 2 postres. ¿Cuántas comidas distintas (una de cada cosa) puedes pedir?</p>', respuesta: 3 * 4 * 2,
        pista: '<p>Son tres decisiones, una tras otra. Usa el principio multiplicativo.</p>',
        solucion: '<p>Cada entrada se combina con cada plato fuerte, y cada una de esas parejas con cada postre: 3 × 4 × 2 = <strong>24</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En una carrera de 8 corredores, ¿de cuántas formas se pueden repartir oro, plata y bronce?</p>', respuesta: 8 * 7 * 6,
        pista: '<p>El orden importa: 8 opciones para oro, luego 7 para plata y 6 para bronce.</p>',
        solucion: '<p>Como el orden importa, es una permutación: P(8, 3) = 8 × 7 × 6 = <strong>336</strong>. Cada vez que alguien gana una medalla, queda un corredor menos para la siguiente.</p>' },
      { tipo: 'numero', enunciado: '<p>¿De cuántas formas se puede elegir un comité de 3 personas entre 10?</p>', respuesta: (10 * 9 * 8) / (3 * 2 * 1),
        pista: '<p>El orden no importa: C(10, 3) = (10 × 9 × 8) ÷ 3!.</p>',
        solucion: '<p>Si el orden importara habría 10 × 9 × 8 = 720 formas. Cada comité aparece repetido 3! = 6 veces en distinto orden, así que hay 720 ÷ 6 = <strong>120</strong> comités.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos PIN de 4 dígitos (del 0 al 9, con repetición) existen?</p>', respuesta: 10 ** 4,
        pista: '<p>10 opciones en cada una de las 4 posiciones.</p>',
        solucion: '<p>Cada posición tiene 10 opciones y se pueden repetir: 10 × 10 × 10 × 10 = 10<sup>4</sup> = <strong>10 000</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>En una lotería eliges 6 números de entre 56, y gana quien acierta los 6 sin importar el orden en que salgan. Para contar las jugadas posibles usas…</p>', opciones: ['Permutaciones', 'Combinaciones', 'El principio multiplicativo con repetición'], correcta: 1,
        pista: '<p>Si los mismos 6 números salen en otro orden, ¿cambia tu jugada?</p>',
        solucion: '<p>Combinaciones, porque el orden no importa: los mismos 6 números son la misma jugada. Hay C(56, 6) = 32 468 436 jugadas posibles.</p>' },
    ],
    fuentes: [WIKI('Permutación', 'Permutación'), WIKI('Combinación', 'Combinación'), KHAN_P],
  });

  // ------------------------------------------------------------------
  L('Probabilidad de eventos compuestos', {
    objetivo: 'Calcular probabilidades de eventos combinados con "o" y con "y", distinguiendo eventos independientes y dependientes.',
    explicacion: `
      <p>Hasta ahora has calculado la probabilidad de una sola cosa: que salga par, que la canica sea azul. Pero muchas preguntas juntan dos: ¿qué tan posible es sacar un 2 <em>o</em> un 5?, ¿qué tan posible es que mañana llueva <em>y</em> haya tráfico? A un evento formado por dos o más eventos se le llama <strong>evento compuesto</strong>. Para calcularlo hay dos reglas, una para la palabra "o" y otra para la palabra "y". En ellas, A y B son los nombres de los dos eventos.</p>
      <h3>"O": la regla de la suma</h3>
      <p>Tiras un dado y ganas si sale 2 o 5. Hay 2 casos favorables de 6, así que la probabilidad es ${F(2, 6)}. Fíjate que es lo mismo que sumar la probabilidad de cada uno: ${F(1, 6)} + ${F(1, 6)} = ${F(2, 6)}. Se puede sumar porque el 2 y el 5 nunca salen a la vez en el mismo tiro. Cuando dos eventos <strong>no pueden pasar a la vez</strong> se dice que son <strong>mutuamente excluyentes</strong>, y entonces P(A o B) = P(A) + P(B).</p>
      <p>Ahora bien, a veces sí pueden pasar a la vez. Tiras un dado y ganas si sale un número par o un número mayor que 4. Los pares son 2, 4 y 6, que dan ${F(3, 6)}. Los mayores que 4 son 5 y 6, que dan ${F(2, 6)}. Pero el 6 está en los dos grupos. Si sumas sin cuidado, ${F(3, 6)} + ${F(2, 6)} = ${F(5, 6)}, lo cuentas dos veces, y los casos reales son solo 2, 4, 5 y 6. Por eso, cuando los eventos <strong>sí pueden</strong> pasar a la vez, se resta lo que se contó de más:</p>
      <p class="resultado">P(A o B) = P(A) + P(B) − P(A y B)</p>
      <p>Se lee: la probabilidad de A, más la de B, menos la de que pasen las dos juntas.</p>
      <h3>"Y": la regla del producto</h3>
      <p>Lanzas dos monedas. ¿Qué tan posible es que las dos caigan águila? La primera cae águila la mitad de las veces. Y de esas veces, la segunda también cae águila la mitad. La mitad de la mitad es un cuarto: ${F(1, 2)} × ${F(1, 2)} = ${F(1, 4)}. Puedes comprobarlo contando: los resultados posibles son águila-águila, águila-sol, sol-águila y sol-sol, y solo uno de los 4 sirve.</p>
      <p>Las monedas no se influyen entre sí: lo que haga una no cambia lo que hará la otra. A dos eventos así se les llama <strong>independientes</strong>. Entonces:</p>
      <p class="resultado">P(A y B) = P(A) × P(B)</p>
      <p>Si son <strong>dependientes</strong> (sacar cartas sin regresarlas), la segunda probabilidad cambia: P(A y B) = P(A) × P(B, sabiendo que pasó A). Por ejemplo, si sacas un as y no lo regresas, la baraja ya tiene un as menos y una carta menos, y eso cambia la segunda cuenta.</p>
      <p class="nota"><strong>Trampa común:</strong> sumar cuando la pregunta dice "y". Si sumas probabilidades de "y", el resultado puede pasar de 1, y ninguna probabilidad es mayor que 1. Recuerda: que pasen dos cosas a la vez siempre es igual o menos probable que cada una por separado, por eso se multiplica.</p>
      <h3>Tabla de dos dados</h3>
      <p>Al tirar dos dados hay 6 × 6 = 36 resultados igual de posibles, por el principio multiplicativo. Esta tabla muestra la suma de cada pareja: el renglón es el primer dado y la columna, el segundo. Cuéntalos para responder preguntas como "¿qué tan probable es que sumen 5?".</p>
      <div class="tabla-wrap"><table>
        <tr><th>+</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr>
        <tr><th>1</th><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr>
        <tr><th>2</th><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr>
        <tr><th>3</th><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td></tr>
        <tr><th>4</th><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td></tr>
        <tr><th>5</th><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td></tr>
        <tr><th>6</th><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td></tr>
      </table></div>`,
    ejemplo: `
      <p>Sacas dos cartas de una baraja de 52 sin regresar la primera. ¿Cuál es la probabilidad de que ambas sean ases?</p>
      <ol class="pasos-ej">
        <li>Fíjate primero en la palabra clave: quieres que la primera <em>y</em> la segunda sean ases, así que vas a multiplicar.</li>
        <li>Para la primera carta hay 4 ases entre 52 cartas: ${F(4, 52)}.</li>
        <li>Para la segunda, piensa qué cambió. Si la primera fue as y no la regresaste, ahora quedan 3 ases entre 51 cartas: ${F(3, 51)}. Por eso los eventos son dependientes.</li>
        <li>Multiplica: ${F(4, 52)} × ${F(3, 51)} = ${F(12, 2652)} = ${F(1, 221)} ≈ 0.0045.</li>
        <li>Comprueba que tiene sentido: sacar un solo as ya es poco probable (${F(1, 13)}), y sacar dos seguidos debe serlo todavía más. Así es.</li>
      </ol>
      <p>Resultado: <span class="resultado">${F(1, 221)}, menos de medio por ciento</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar ${F(4, 52)} también para la segunda carta, olvidando que ya falta un as.</p>`,
    vidaReal: `
      <p>Muchas decisiones dependen de que pasen dos cosas a la vez, o de que pase una u otra:</p>
      <ul>
        <li><strong>Respaldos:</strong> si una alarma falla 1 de cada 20 veces, poner dos alarmas que no dependen una de otra hace que fallen juntas solo 1 vez de cada 400.</li>
        <li><strong>Juegos de mesa y deportes:</strong> calcular tus posibilidades antes de decidir una jugada.</li>
        <li><strong>Salud:</strong> los médicos combinan varios factores para saber qué tan posible es una enfermedad.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tiras un dado. ¿Cuál es la probabilidad de sacar 1 o 6? (Fracción o decimal con dos decimales).</p>', respuesta: 2 / 6, tolerancia: tol,
        pista: '<p>¿Pueden salir el 1 y el 6 en el mismo tiro? Si no, suma sus probabilidades.</p>',
        solucion: `<p>No pueden salir a la vez, así que se suman: ${F(1, 6)} + ${F(1, 6)} = ${F(2, 6)} = <strong>${F(1, 3)}</strong> ≈ 0.33.</p>` },
      { tipo: 'numero', enunciado: '<p>Tiras dos dados. ¿Cuál es la probabilidad de que sumen 7? (Fracción o decimal con dos decimales).</p>', respuesta: 6 / 36, tolerancia: tol,
        pista: '<p>Cuenta cuántas veces aparece el 7 en la tabla de dos dados y compáralo con los 36 resultados.</p>',
        solucion: `<p>El 7 aparece 6 veces entre 36 resultados: ${F(6, 36)} = <strong>${F(1, 6)}</strong> ≈ 0.17. Es la suma más probable.</p>` },
      { tipo: 'numero', enunciado: '<p>Lanzas tres monedas. ¿Cuál es la probabilidad de que las tres caigan águila?</p>', respuesta: 0.5 ** 3,
        pista: '<p>Una moneda no afecta a las otras, y quieres águila en la primera y en la segunda y en la tercera.</p>',
        solucion: `<p>Son independientes, así que se multiplica la probabilidad de cada una: ${F(1, 2)} × ${F(1, 2)} × ${F(1, 2)} = <strong>${F(1, 8)}</strong> = 0.125.</p>` },
      { tipo: 'numero', enunciado: '<p>Sacas una carta de una baraja de 52. ¿Cuál es la probabilidad de que sea rey o corazón? (Fracción o decimal con dos decimales).</p>', respuesta: (4 + 13 - 1) / 52, tolerancia: tol,
        pista: '<p>Hay 4 reyes y 13 corazones, pero el rey de corazones se contaría dos veces.</p>',
        solucion: `<p>Suma reyes y corazones, y resta el rey de corazones, que se contó dos veces: ${F(4, 52)} + ${F(13, 52)} − ${F(1, 52)} = ${F(16, 52)} = <strong>${F(4, 13)}</strong> ≈ 0.31.</p>` },
      { tipo: 'numero', enunciado: '<p>Una bolsa tiene 4 canicas rojas y 6 azules. Sacas dos sin regresar la primera. ¿Cuál es la probabilidad de que ambas sean rojas? (Fracción o decimal con dos decimales).</p>', respuesta: (4 / 10) * (3 / 9), tolerancia: tol,
        pista: '<p>Después de sacar una roja quedan 3 rojas de 9 canicas.</p>',
        solucion: `<p>La primera es roja con probabilidad ${F(4, 10)}. Después quedan 3 rojas de 9, así que la segunda es ${F(3, 9)}. Multiplica: ${F(4, 10)} × ${F(3, 9)} = ${F(12, 90)} = <strong>${F(2, 15)}</strong> ≈ 0.13.</p>` },
      { tipo: 'numero', enunciado: '<p>Una alarma falla el 1% de las veces. Si instalas dos alarmas independientes, ¿cuál es la probabilidad de que ambas fallen a la vez? Escríbela como decimal.</p>', respuesta: 0.01 * 0.01,
        pista: '<p>Pasa 1% a decimal. Como las alarmas son independientes y quieres que falle una y también la otra, multiplica.</p>',
        solucion: '<p>1% es 0.01, y 0.01 × 0.01 = <strong>0.0001</strong>, es decir, una vez de cada 10 000.</p>' },
    ],
    fuentes: [IS('3-2-independent-and-mutually-exclusive-events', 'Independent and Mutually Exclusive Events'), IS('3-3-two-basic-rules-of-probability', 'Two Basic Rules of Probability'), KHAN_P],
  });

  // ------------------------------------------------------------------
  L('Cómo leer estadísticas en las noticias sin que te engañen', {
    objetivo: 'Detectar las trampas más comunes en gráficas, porcentajes, promedios y encuestas, para leer las noticias con criterio.',
    explicacion: `
      <p>Un anuncio dice "9 de cada 10 dentistas lo recomiendan" y una noticia grita "el riesgo se duplica". Puede que ningún número sea falso y que aun así te estén <strong>engañando</strong>. La trampa casi nunca está en las cuentas, sino en cómo se presentan: qué se muestra, qué se calla y cómo se dibuja. Con lo que ya aprendiste en esta unidad puedes detectar las trampas más comunes. Aquí tienes seis preguntas para hacerte cada vez que veas una cifra.</p>
      <h3>1. ¿Dónde empieza el eje?</h3>
      <p>Recuerda que en una gráfica de barras tu ojo compara alturas, y por eso las barras deben empezar en cero. Las dos gráficas de abajo muestran exactamente los mismos datos, 50 y 52. La de la izquierda corta el eje en 49: le quita a cada barra sus primeras 49 unidades. Así, a la barra A le queda 1 y a la B le quedan 3, y parece que B es el triple que A. La de la derecha, que empieza en cero, muestra la verdad: son casi iguales.</p>
      <div class="dos-graficas">
        ${barras({ etiquetas: ['A', 'B'], valores: [50, 52], min: 49, max: 52.5, paso: 1, descripcion: 'Gráfica engañosa: eje que empieza en 49; la barra B parece el triple de alta que A.' })}
        ${barras({ etiquetas: ['A', 'B'], valores: [50, 52], max: 60, paso: 10, descripcion: 'Misma información con el eje desde cero: las barras A y B se ven casi iguales.' })}
      </div>
      <h3>2. ¿De cuánto a cuánto?</h3>
      <p>"Los casos aumentaron 100%" suena terrible, pero puede significar que pasaron de 1 a 2. Un porcentaje solo dice cuánto cambió algo comparado consigo mismo; a eso se le llama riesgo <strong>relativo</strong>. Lo que de verdad te afecta es cuántos casos hay en total de cada tanta gente, y eso se llama riesgo <strong>absoluto</strong>. Por eso, pregunta siempre: <em>¿de cuánto a cuánto?</em></p>
      <h3>3. ¿Una cosa causa la otra?</h3>
      <p>Que dos cosas suban juntas no significa que una cause la otra. Cuando dos datos se mueven juntos se dice que hay <strong>correlación</strong>, y <strong>correlación no es causa</strong>. En verano aumentan a la vez las ventas de helado y los ahogamientos, pero el helado no ahoga a nadie: la causa de ambos es el calor, que hace que más gente compre helado y que más gente vaya a nadar. Antes de creer que A causa B, busca una tercera cosa que pueda explicar las dos.</p>
      <h3>4. ¿A quién le preguntaron?</h3>
      <p>"9 de cada 10 lo recomiendan": ¿fueron 10 personas o 10 000? ¿Quién las eligió? Como viste al estudiar las muestras, si la muestra es muy pequeña o tiene sesgo, el resultado no vale para todos. Una encuesta en la página de una marca solo escucha a sus fans.</p>
      <h3>5. ¿Promedio o mediana?</h3>
      <p>Un "ingreso promedio" alto puede esconder que la mayoría gana mucho menos. Unos pocos sueldos enormes jalan la media hacia arriba, como viste con la mediana. Si una noticia habla de promedios de dinero, pregúntate cuánto gana la persona de en medio.</p>
      <h3>6. ¿Cuánto se puede equivocar?</h3>
      <p>Una encuesta pregunta solo a una muestra, así que su resultado es una aproximación. Por eso suele traer un <strong>margen de error</strong>: cuánto podría alejarse el número real del que se publica. Una encuesta que da 52% con un margen de ±3 (tres unidades de porcentaje hacia arriba o hacia abajo) significa que el valor real podría estar entre 49% y 55%. Si otro candidato tiene 50%, en realidad podrían estar <strong>empatados</strong>, aunque el titular diga que uno "va ganando".</p>
      <p class="nota"><strong>Trampa común:</strong> fijarte solo en el número grande del titular. Lee también la letra chica: de dónde salen los datos, a cuántos se preguntó y de cuánto a cuánto cambió.</p>`,
    ejemplo: `
      <p>Un titular dice: "¡Comer X duplica el riesgo de una enfermedad!". El estudio muestra que el riesgo pasa de 1 en 10 000 personas a 2 en 10 000.</p>
      <ol class="pasos-ej">
        <li>Mira primero el riesgo relativo, el que usa el titular. Pasar de 1 a 2 es "el doble", un aumento del 100%. Suena alarmante.</li>
        <li>Ahora calcula el riesgo absoluto, que es el que te afecta. 1 de 10 000 es 0.01%, y 2 de 10 000 es 0.02%. Subió de 0.01% a 0.02%, una diferencia diminuta.</li>
        <li>Tradúcelo a personas para imaginarlo: por cada 10 000 personas que comen X, hay <em>una</em> persona enferma más. Las otras 9 998 siguen sanas.</li>
        <li>Comprueba que las dos frases son ciertas a la vez: el riesgo sí se duplicó, pero partía de un número tan pequeño que sigue siendo pequeño.</li>
      </ol>
      <p>Resultado: <span class="resultado">es verdad que "se duplica", pero el riesgo sigue siendo muy bajo</span>.</p>
      <p class="nota"><strong>Error común:</strong> leer "el doble" y pensar que la mitad de la gente se enfermará.</p>`,
    vidaReal: `
      <p>Todos los días te encuentras con cifras que buscan convencerte de algo. Saber leerlas con cuidado te sirve para:</p>
      <ul>
        <li>No caer en noticias falsas o exageradas sobre salud, dinero o seguridad.</li>
        <li>Leer con calma las encuestas antes de una elección y la publicidad que dice "el 95% de los clientes está feliz".</li>
        <li>Tomar mejores decisiones personales sobre tratamientos médicos, ahorros o compras.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>En la gráfica engañosa, A = 50 y B = 52. ¿Cuánto mayor es B en realidad?</p>', opciones: ['El triple', 'El doble', 'Un 4% más'], correcta: 2,
        pista: '<p>Calcula cuánto más tiene B que A, y divídelo entre lo que tiene A.</p>',
        solucion: '<p>B tiene 2 más que A, y 2 ÷ 50 = 0.04: solo un 4% más. La gráfica que corta el eje exagera la diferencia.</p>' },
      { tipo: 'numero', enunciado: '<p>Un producto sube de $20 a $25. ¿En qué porcentaje aumentó?</p>', respuesta: ((25 - 20) / 20) * 100,
        pista: '<p>Calcula cuántos pesos subió y compáralo con el precio original, no con el nuevo.</p>',
        solucion: '<p>Subió 25 − 20 = 5 pesos. Comparado con el precio original: 5 ÷ 20 = 0.25, es decir, <strong>25%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un riesgo pasa de 2 casos por cada 1 000 personas a 3 por cada 1 000. ¿En qué porcentaje aumentó el riesgo <strong>relativo</strong>?</p>', respuesta: ((3 - 2) / 2) * 100,
        pista: '<p>¿Cuántos casos aumentó? Compara ese aumento con los 2 casos que había al principio.</p>',
        solucion: '<p>Aumentó 1 caso sobre los 2 que había: 1 ÷ 2 = 0.5, es decir, <strong>50%</strong> más. Aun así, en términos absolutos es solo 1 persona más de cada 1 000.</p>' },
      { tipo: 'opciones', enunciado: '<p>En verano suben a la vez las ventas de helado y los casos de ahogamiento. ¿Qué es lo más razonable concluir?</p>', opciones: ['El helado provoca ahogamientos', 'Ambos aumentan por una tercera causa: el calor', 'Los ahogamientos hacen que se venda más helado'], correcta: 1,
        pista: '<p>Correlación no es causa. ¿Qué pasa en verano?</p>',
        solucion: '<p>El calor hace que más gente compre helado y que más gente nade. Es una variable oculta que explica ambas.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una encuesta en la página web de una marca de autos dice que el 80% de la gente prefiere el auto al transporte público. ¿Cuál es el principal problema?</p>', opciones: ['La muestra está sesgada', 'El 80% está mal calculado', 'No hay ningún problema'], correcta: 0,
        pista: '<p>¿Quién visita la página de una marca de autos?</p>',
        solucion: '<p>Quien entra a esa página probablemente ya prefiere los autos: la muestra no representa a la población.</p>' },
      { tipo: 'numero', enunciado: '<p>Una encuesta da a un candidato 52% con un margen de error de ±3 puntos. ¿Cuál es el porcentaje más bajo que podría tener en realidad?</p>', respuesta: 52 - 3,
        pista: '<p>El margen dice cuánto podría estar el valor real por arriba o por abajo del 52%. Para el más bajo, ve hacia abajo.</p>',
        solucion: '<p>El valor real podría estar hasta 3 puntos abajo: 52 − 3 = <strong>49%</strong>. Así que podría incluso no tener la mayoría.</p>' },
    ],
    fuentes: [IS('1-4-experimental-design-and-ethics', 'Experimental Design and Ethics'), WIKI('Correlación_no_implica_causalidad', 'Correlación no implica causalidad'), WIKI('Sesgo_de_selección', 'Sesgo de selección')],
  });
})();
