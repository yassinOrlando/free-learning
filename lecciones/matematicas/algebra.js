// Matemáticas · Unidad 2: Álgebra.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const F = window.fraccion;
  const L = (titulo, datos) => window.registrarLeccion('matematicas', titulo, datos);

  const OS = (pagina, nombre) => ({ nombre: `OpenStax, Elementary Algebra 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/elementary-algebra-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = { nombre: 'Khan Academy en español: Álgebra 1', url: 'https://es.khanacademy.org/math/algebra' };
  const KHAN_BASE = { nombre: 'Khan Academy en español: Fundamentos de álgebra', url: 'https://es.khanacademy.org/math/algebra-basics' };

  // ------------------------------------------------------------------
  L('Lenguaje algebraico: de palabras a símbolos', {
    objetivo: 'Traducir frases cotidianas a expresiones con letras, y calcular su valor cuando sabes cuánto vale la letra.',
    explicacion: `
      <p>Imagina que en la papelería cada cuaderno cuesta $15. Si compras 2, pagas 15 × 2 = 30. Si compras 5, pagas 15 × 5 = 75. Si alguien te pregunta cuánto pagas por <em>cualquier</em> cantidad de cuadernos, no puedes darle un solo número, porque depende de cuántos compres. Lo que sí puedes darle es la regla: "15 por la cantidad de cuadernos".</p>
      <p>En álgebra, esa "cantidad de cuadernos" se escribe con una letra, por ejemplo <em>c</em>, y la regla queda como 15 × c. Una letra que representa un número que no conoces, o que puede cambiar, se llama <strong>variable</strong>. Cuando es un número que estás buscando, también se le dice <strong>incógnita</strong>. La letra más usada es la <em>x</em>, pero puede ser cualquiera. Conviene elegir una que te recuerde qué significa: <em>m</em> para meses o <em>k</em> para kilómetros.</p>
      <h3>¿Cómo se escribe una multiplicación con letras?</h3>
      <p>Cuando un número va pegado a una letra, se están multiplicando. Así, <strong>3x</strong> quiere decir 3 × x, o sea, "tres veces x". El signo × se omite porque se confundiría con la letra x. El número que va adelante se llama <strong>coeficiente</strong> y te dice cuántas veces se toma la variable. En 15c, el coeficiente es 15, porque cada cuaderno suma 15 pesos.</p>
      <h3>¿Cómo paso una frase a símbolos?</h3>
      <p>Traducir al álgebra es como pasar de un idioma a otro. Lee la frase con calma, fíjate qué le pasa al número y escribe esas operaciones en orden. En esta tabla, <em>x</em> significa "un número":</p>
      <div class="tabla-wrap"><table>
        <tr><th>En palabras</th><th>En álgebra</th></tr>
        <tr><td>el doble de un número</td><td>2x</td></tr>
        <tr><td>un número aumentado en 5</td><td>x + 5</td></tr>
        <tr><td>la mitad de un número</td><td>${F('x', 2)}</td></tr>
        <tr><td>el triple de un número, disminuido en 4</td><td>3x − 4</td></tr>
        <tr><td>el cuadrado de un número</td><td>x<sup>2</sup></td></tr>
        <tr><td>dos números consecutivos</td><td>x y x + 1</td></tr>
      </table></div>
      <p>Fíjate en la última fila. "Consecutivos" quiere decir que van uno detrás de otro, como 7 y 8. Si el primero es x, el que sigue es una unidad más: x + 1.</p>
      <p>Algunas palabras te avisan qué operación usar. "Aumentado en", "más" y "la suma de" indican que se suma. "Disminuido en", "menos" y "la diferencia" indican que se resta. "El doble", "el triple" y "veces" indican que se multiplica. "La mitad" y "la tercera parte" indican que se divide.</p>
      <p class="nota"><strong>Trampa común:</strong> el orden de las palabras importa. "El doble de un número más 3" es 2x + 3: primero duplicas el número y luego sumas 3. En cambio, "el doble de la suma de un número y 3" es 2(x + 3): primero sumas y después duplicas todo. Los paréntesis indican qué se hace primero. Con x = 4, la primera da 11 y la segunda da 14.</p>
      <h3>¿Cuánto vale la expresión?</h3>
      <p>Una vez que tienes la regla, puedes usarla con cualquier número. A eso se le llama <strong>evaluar</strong>: cambias la letra por un número y haces la cuenta respetando la jerarquía de operaciones, es decir, primero multiplicaciones y divisiones, y después sumas y restas. Si x = 5, entonces 3x − 4 = 3 × 5 − 4 = 15 − 4 = 11. En la papelería, con c = 6 cuadernos, 15c = 15 × 6 = 90 pesos.</p>
      <p>Por eso las letras son tan útiles: una sola expresión resume todos los casos posibles. En lugar de una tabla enorme con el precio de 1, 2, 3, 4 o 50 cuadernos, te basta con escribir 15c.</p>`,
    ejemplo: `
      <p>Un taxi cobra $30 al subirte (a eso se le llama banderazo) y $12 por cada kilómetro. Escribe el costo de un viaje de <em>k</em> kilómetros y calcula cuánto pagas por 8 km.</p>
      <ol class="pasos-ej">
        <li>Separa lo que no cambia de lo que sí cambia. Los $30 del banderazo los pagas siempre, aunque el viaje sea muy corto. Los $12, en cambio, se pagan una vez por cada kilómetro.</li>
        <li>Escribe la parte que cambia. Si recorres k kilómetros, pagas 12 veces k, es decir, 12k.</li>
        <li>Junta las dos partes: costo = <strong>30 + 12k</strong>.</li>
        <li>Ahora evalúa con k = 8. Por la jerarquía de operaciones, primero multiplica: 12 × 8 = 96. Después suma: 30 + 96 = 126.</li>
        <li>Comprueba de otra forma: 8 km a $12 son $96 de recorrido, y con el banderazo suman $126. Coincide.</li>
      </ol>
      <p>Resultado: <span class="resultado">30 + 12k, y $126 por 8 km</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir 42k, juntando el 30 y el 12. No se pueden sumar, porque el 30 se paga una sola vez y el 12 se paga por cada kilómetro.</p>`,
    vidaReal: `
      <p>Muchas cuentas de todos los días tienen una parte que ya conoces y otra que cambia. Escribirlas con una letra te deja calcular cualquier caso de una sola vez:</p>
      <ul>
        <li>Las tarifas de taxi, celular, gimnasio o luz, que suelen tener un cobro fijo más algo que depende de cuánto uses.</li>
        <li>Las fórmulas de una hoja de cálculo, que en lugar de letras usan celdas como B2.</li>
        <li>Cualquier problema con un dato que todavía no sabes: escribirlo es el primer paso para resolverlo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'expresion', enunciado: '<p>Escribe con <em>x</em>: "el triple de un número, disminuido en 7".</p>', respuesta: '3x - 7',
        pista: '<p>Primero el triple (3x) y luego quítale 7.</p>',
        solucion: '<p>"El triple de un número" es 3x, y "disminuido en 7" significa que le quitas 7: <strong>3x − 7</strong>.</p>' },
      { tipo: 'expresion', enunciado: '<p>Escribe con <em>x</em>: "la mitad de un número, aumentada en 4".</p>', respuesta: 'x/2 + 4',
        pista: '<p>La mitad de x se escribe x/2.</p>',
        solucion: '<p>La mitad de un número es x/2, y "aumentada en 4" significa que le sumas 4: <strong>x/2 + 4</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál expresión representa "el doble de la suma de un número y 5"?</p>',
        opciones: ['2x + 5', '2(x + 5)', 'x<sup>2</sup> + 5', '2 + x + 5'], correcta: 1,
        pista: '<p>Primero se suma (x + 5) y después se duplica todo.</p>',
        solucion: '<p>Primero se suma, así que x + 5 va entre paréntesis, y luego se duplica todo: 2(x + 5). En 2x + 5 solo se duplica el número, no la suma.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula el valor de 4x − 3 cuando x = 5.</p>', respuesta: 4 * 5 - 3,
        pista: '<p>Sustituye x por 5: 4 × 5 − 3.</p>',
        solucion: '<p>4 × 5 − 3 = 20 − 3 = <strong>17</strong>.</p>' },
      { tipo: 'expresion', variables: ['m'], enunciado: '<p>Un gimnasio cobra $350 de inscripción y $400 por mes. Escribe el costo total de <em>m</em> meses (usa la letra m).</p>', respuesta: '350 + 400m',
        pista: '<p>Una parte fija (la inscripción) más una parte que se multiplica por los meses.</p>',
        solucion: '<p>La inscripción se paga una sola vez (350) y la mensualidad se paga m veces (400m). Juntas dan <strong>350 + 400m</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con la fórmula del taxi, 30 + 12k, ¿cuánto pagas por un viaje de 15 km?</p>', respuesta: 30 + 12 * 15,
        pista: '<p>Sustituye k por 15.</p>',
        solucion: '<p>30 + 12 × 15 = 30 + 180 = <strong>$210</strong>.</p>' },
    ],
    fuentes: [OS('1-2-use-the-language-of-algebra', 'Use the Language of Algebra'), WIKI('Expresión_algebraica', 'Expresión algebraica'), KHAN_BASE],
  });

  // ------------------------------------------------------------------
  L('Expresiones algebraicas y términos semejantes', {
    objetivo: 'Identificar las partes de una expresión algebraica, juntar términos semejantes para simplificarla y evaluarla.',
    explicacion: `
      <p>Imagina que vacías tu mochila sobre la mesa: 3 lápices, 2 plumas, otros 4 lápices y 1 pluma más. Para contar, juntas los lápices con los lápices (7) y las plumas con las plumas (3). Nunca dirías que tienes "10 lápices-plumas", porque son cosas distintas. En álgebra se hace exactamente lo mismo, pero con letras.</p>
      <p>Una <strong>expresión algebraica</strong> es una combinación de números, letras y operaciones, como 5x<sup>2</sup> − 3x + 8. Cada pedazo separado por un signo + o − se llama <strong>término</strong>. Esa expresión tiene tres términos: 5x<sup>2</sup>, −3x y 8.</p>
      <h3>¿Qué partes tiene un término?</h3>
      <p>Mira el término −3x<sup>2</sup>. Tiene tres partes, y cada una cuenta algo distinto:</p>
      <ul>
        <li>El número −3 es el <strong>coeficiente</strong>: cuántas veces tienes lo que viene después. Se toma con todo y su signo.</li>
        <li>La letra x es la <strong>parte literal</strong>, es decir, la parte de letras. Es como el nombre de lo que estás contando: "lápices" o "plumas".</li>
        <li>El 2 pequeño de arriba es el <strong>exponente</strong>: te dice cuántas veces se multiplica la letra por sí misma. Así, x<sup>2</sup> es x · x.</li>
      </ul>
      <p>Cuando una letra no tiene número adelante, su coeficiente es 1, porque x es "una x". Y cuando no tiene exponente, el exponente es 1.</p>
      <h3>¿Cómo se llaman según su tamaño?</h3>
      <p>Una expresión con un solo término es un <strong>monomio</strong> ("mono" quiere decir uno). Con dos términos es un <strong>binomio</strong> y con tres, un <strong>trinomio</strong>. En general, a cualquier suma de términos de este tipo se le llama <strong>polinomio</strong> ("poli" quiere decir muchos). El <strong>grado</strong> de un polinomio con una sola letra es el exponente más grande que aparece. Por ejemplo, 5x<sup>2</sup> − 3x + 8 es de grado 2.</p>
      <h3>¿Cuáles términos se pueden juntar?</h3>
      <p>Solo se juntan los <strong>términos semejantes</strong>: los que tienen <em>exactamente</em> la misma parte literal, con las mismas letras elevadas a los mismos exponentes. El coeficiente puede ser distinto.</p>
      <ul>
        <li>3x<sup>2</sup> y −5x<sup>2</sup> son semejantes: los dos tienen x<sup>2</sup>.</li>
        <li>3x y 3x<sup>2</sup> <strong>no</strong> lo son, porque los exponentes son distintos. Aunque se parezcan, x y x<sup>2</sup> son cosas diferentes, como un lápiz y una caja de lápices.</li>
        <li>4ab y 2ba sí lo son, porque el orden al multiplicar no importa: ab = ba.</li>
      </ul>
      <p><strong>Reducir</strong> términos semejantes es sumar sus coeficientes y dejar igual la parte literal: 7x + 2x = 9x. Funciona porque 7 veces x más 2 veces x son 9 veces x, igual que 7 manzanas más 2 manzanas son 9 manzanas. En cambio, 7 manzanas más 2 peras se quedan así, y lo mismo pasa con 7x + 2y.</p>
      <p>Una cosa más, que necesitarás en los ejercicios. Cuando un número está pegado a un paréntesis, multiplica a <em>cada</em> término de adentro: 3(x + 4) = 3x + 12, porque son tres grupos de (x + 4). Después ya puedes juntar los términos semejantes. A esto se le llama propiedad distributiva, y la verás con calma en la siguiente lección.</p>
      <p class="nota"><strong>Trampa común:</strong> al evaluar con un número negativo, olvidar los paréntesis. Si x = −2, entonces x<sup>2</sup> = (−2)<sup>2</sup> = (−2) · (−2) = 4, que es positivo. Si escribes −2<sup>2</sup> sin paréntesis, solo se eleva el 2 y obtienes −4.</p>`,
    ejemplo: `
      <p>Simplifica 5x + 3y − 2x + 7 − y + 4.</p>
      <ol class="pasos-ej">
        <li>Primero agrupa por "tipo". Hay términos con x (5x y −2x), términos con y (3y y −y) y números solos (7 y 4). Cada término se lleva el signo que tiene adelante.</li>
        <li>Junta los términos con x sumando sus coeficientes: 5 − 2 = 3, así que quedan 3x.</li>
        <li>Junta los términos con y. Recuerda que −y es lo mismo que −1y: 3 − 1 = 2, así que quedan 2y.</li>
        <li>Junta los números solos: 7 + 4 = 11.</li>
        <li>Comprueba con un valor cualquiera, por ejemplo x = 1 y y = 1. La expresión original da 5 + 3 − 2 + 7 − 1 + 4 = 16, y la simplificada da 3 + 2 + 11 = 16. Coinciden.</li>
      </ol>
      <p>Resultado: <span class="resultado">3x + 2y + 11</span>.</p>
      <p class="nota"><strong>Error común:</strong> seguir sumando y escribir 16xy. Los términos con x, con y y los números solos no son semejantes, así que se quedan separados.</p>`,
    vidaReal: `
      <p>Juntar lo que es igual y separar lo que es distinto es algo que haces muy seguido sin darte cuenta:</p>
      <ul>
        <li>Al contar la mercancía de una tienda, sumas las latas con las latas y las botellas con las botellas.</li>
        <li>Al ordenar una fórmula larga antes de usarla, para tener menos cuentas y cometer menos errores.</li>
        <li>Al calcular cuánta cerca o cuánto dinero necesitas cuando una medida o un precio todavía no se conoce.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'expresion', simplificar: true, enunciado: '<p>Simplifica: 7x + 4 − 3x + 9</p>', respuesta: '4x + 13',
        pista: '<p>Junta las x por un lado y los números por otro.</p>',
        solucion: '<p>7x − 3x = 4x y 4 + 9 = 13: <strong>4x + 13</strong>.</p>' },
      { tipo: 'expresion', simplificar: true, variables: ['x', 'y'], enunciado: '<p>Simplifica: 5x + 2y − x + 6y</p>', respuesta: '4x + 8y',
        pista: '<p>Recuerda que x es lo mismo que 1x.</p>',
        solucion: '<p>5x − x = 4x y 2y + 6y = 8y: <strong>4x + 8y</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál par está formado por términos semejantes?</p>',
        opciones: ['4x<sup>2</sup> y 4x', '−3ab y 5ba', '2x y 2y', '7 y 7x'], correcta: 1,
        pista: '<p>Fíjate solo en las letras y sus exponentes, no en los coeficientes.</p>',
        solucion: '<p>−3ab y 5ba tienen las mismas letras con el mismo exponente (ab = ba). Los demás pares tienen partes literales distintas.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula el valor de 2x<sup>2</sup> − 3x + 1 cuando x = −2.</p>', respuesta: 2 * (-2) ** 2 - 3 * -2 + 1,
        pista: '<p>Sustituye con paréntesis: 2(−2)<sup>2</sup> − 3(−2) + 1.</p>',
        solucion: '<p>(−2)<sup>2</sup> = 4, así que 2 · 4 = 8. Además, −3 · (−2) = 6, porque menos por menos da más. En total: 8 + 6 + 1 = <strong>15</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es el grado del polinomio 3x<sup>4</sup> − x<sup>2</sup> + 8?</p>', respuesta: 4,
        pista: '<p>Busca el exponente más grande de x.</p>',
        solucion: '<p>Los exponentes de x son 4 y 2 (el 8 no tiene x). El mayor es <strong>4</strong>, así que es un polinomio de grado 4.</p>' },
      { tipo: 'expresion', simplificar: true, enunciado: '<p>Un rectángulo mide (2x + 1) de largo y (x + 3) de ancho. Escribe su perímetro simplificado.</p>', respuesta: '6x + 8',
        pista: '<p>El perímetro es lo que mide todo el borde: dos largos más dos anchos.</p>',
        solucion: '<p>Dos largos son 2(2x + 1) = 4x + 2 y dos anchos son 2(x + 3) = 2x + 6. Al juntar términos semejantes: 4x + 2x = 6x y 2 + 6 = 8, así que el perímetro es <strong>6x + 8</strong>.</p>' },
    ],
    fuentes: [WIKI('Expresión_algebraica', 'Expresión algebraica'), WIKI('Monomio', 'Monomio'), KHAN_BASE],
  });

  // ------------------------------------------------------------------
  L('Operaciones con polinomios', {
    objetivo: 'Sumar, restar y multiplicar polinomios aplicando la ley de los signos y las reglas de los exponentes.',
    explicacion: `
      <p>Imagina dos bolsas de fruta. La primera tiene 3 naranjas y 2 manzanas; la segunda, 1 naranja y 5 manzanas. Si vacías las dos en una canasta, tienes 4 naranjas y 7 manzanas. Sumar polinomios es eso mismo: juntar lo que es del mismo tipo. Recuerda que un <strong>polinomio</strong> es una suma de términos, como 3x<sup>2</sup> + 2x.</p>
      <h3>¿Cómo se suman?</h3>
      <p>Quita los paréntesis y reduce los términos semejantes, es decir, junta los que tienen la misma letra con el mismo exponente:</p>
      <p>(3x<sup>2</sup> + 2x) + (x<sup>2</sup> − 5x) = 3x<sup>2</sup> + x<sup>2</sup> + 2x − 5x = 4x<sup>2</sup> − 3x</p>
      <p>Las x<sup>2</sup> se juntan con las x<sup>2</sup> (3 + 1 = 4) y las x con las x (2 − 5 = −3).</p>
      <h3>¿Cómo se restan?</h3>
      <p>Restar un paréntesis completo es quitar <em>todo</em> lo que hay adentro. Por eso el signo menos delante de un paréntesis <strong>cambia el signo de todos</strong> los términos de adentro:</p>
      <p>(5x + 1) − (2x − 6) = 5x + 1 − 2x + 6 = 3x + 7</p>
      <p>¿Por qué el −6 se vuelve +6? Piensa en dinero: si alguien te quita una deuda de 6 pesos, quedas 6 pesos mejor. Quitar algo negativo equivale a sumar.</p>
      <p class="nota"><strong>Trampa común:</strong> cambiar solo el primer signo. −(2x − 6) es −2x <strong>+</strong> 6, no −2x − 6. El menos afecta a todo el paréntesis.</p>
      <h3>¿Cómo se multiplican?</h3>
      <p>Para multiplicar necesitas dos reglas. La primera es la <strong>ley de los signos</strong>: si los dos signos son iguales, el resultado es positivo; si son distintos, es negativo. Así, (−2)(−3) = 6 y (−2)(3) = −6.</p>
      <p>La segunda es sobre los exponentes: <strong>al multiplicar la misma letra, los exponentes se suman</strong>. La razón es que x<sup>2</sup> es x · x y x<sup>3</sup> es x · x · x. Juntos son cinco x multiplicadas: x<sup>2</sup> · x<sup>3</sup> = x<sup>5</sup>.</p>
      <p>Para multiplicar un término solo (un monomio) por un polinomio, el término de afuera multiplica a <em>cada</em> término de adentro. Esto se llama <strong>propiedad distributiva</strong>: es como repartir un volante a cada casa de la calle, sin saltarte ninguna.</p>
      <p>3x(x − 5) = 3x · x + 3x · (−5) = 3x<sup>2</sup> − 15x</p>
      <p>Si los dos son polinomios, cada término del primero multiplica a cada término del segundo, y al final se reducen los términos semejantes. Puedes imaginarlo como un rectángulo de (x + 2) de largo por (x + 1) de ancho, partido en cuatro rectángulos chicos: x · x, x · 1, 2 · x y 2 · 1. El área total es la suma de las cuatro piezas: x<sup>2</sup> + x + 2x + 2 = x<sup>2</sup> + 3x + 2.</p>`,
    ejemplo: `
      <p>Multiplica (2x + 3)(x − 4).</p>
      <ol class="pasos-ej">
        <li>Multiplica el primer término, 2x, por cada término del segundo paréntesis: 2x · x = 2x<sup>2</sup> (los exponentes de x se suman: 1 + 1 = 2) y 2x · (−4) = −8x (signos distintos, resultado negativo).</li>
        <li>Haz lo mismo con el segundo término, 3: 3 · x = 3x y 3 · (−4) = −12.</li>
        <li>Escribe los cuatro productos juntos: 2x<sup>2</sup> − 8x + 3x − 12.</li>
        <li>Reduce los términos semejantes. Solo −8x y 3x tienen la misma letra: −8 + 3 = −5. Queda 2x<sup>2</sup> − 5x − 12.</li>
        <li>Comprueba con x = 1. El original da (2 + 3)(1 − 4) = 5 · (−3) = −15. El resultado da 2 − 5 − 12 = −15. Coinciden.</li>
      </ol>
      <p>Resultado: <span class="resultado">2x<sup>2</sup> − 5x − 12</span>.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar solo primero con primero y último con último, y obtener 2x<sup>2</sup> − 12. Faltan los dos productos de en medio: deben salir cuatro productos.</p>`,
    vidaReal: `
      <p>Sumar, restar y multiplicar con letras sirve cuando una medida o un precio todavía no está decidido:</p>
      <ul>
        <li>Si amplías un cuarto unos metros por cada lado, puedes saber de antemano cuánto piso extra necesitarás.</li>
        <li>En un negocio, lo que ganas es el precio por la cantidad vendida, y si subes el precio sueles vender menos.</li>
        <li>Es la base de las lecciones que siguen, donde aprenderás a resolver problemas más difíciles.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'expresion', simplificar: true, enunciado: '<p>Suma: (3x<sup>2</sup> + 2x − 5) + (x<sup>2</sup> − 6x + 1)</p>', respuesta: '4x^2 - 4x - 4',
        pista: '<p>Junta x<sup>2</sup> con x<sup>2</sup>, x con x y números con números.</p>',
        solucion: '<p>Las x<sup>2</sup>: 3 + 1 = 4. Las x: 2 − 6 = −4. Los números: −5 + 1 = −4. El resultado es <strong>4x<sup>2</sup> − 4x − 4</strong>.</p>' },
      { tipo: 'expresion', simplificar: true, enunciado: '<p>Resta: (5x − 3) − (2x − 7)</p>', respuesta: '3x + 4',
        pista: '<p>Cambia el signo de los dos términos del segundo paréntesis.</p>',
        solucion: '<p>El menos cambia los dos signos del segundo paréntesis: 5x − 3 − 2x + 7. Luego 5x − 2x = 3x y −3 + 7 = 4: <strong>3x + 4</strong>.</p>' },
      { tipo: 'expresion', simplificar: true, enunciado: '<p>Multiplica: 4x(2x − 3)</p>', respuesta: '8x^2 - 12x',
        pista: '<p>4x multiplica a 2x y también a −3.</p>',
        solucion: '<p>4x · 2x = 8x<sup>2</sup> y 4x · (−3) = −12x: <strong>8x<sup>2</sup> − 12x</strong>.</p>' },
      { tipo: 'expresion', simplificar: true, enunciado: '<p>Multiplica: (x + 5)(x − 2)</p>', respuesta: 'x^2 + 3x - 10',
        pista: '<p>Cuatro productos: x·x, x·(−2), 5·x y 5·(−2).</p>',
        solucion: '<p>Los cuatro productos son x<sup>2</sup>, −2x, 5x y −10. Al juntar −2x + 5x = 3x, queda <strong>x<sup>2</sup> + 3x − 10</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuánto es (−2x<sup>3</sup>)(3x<sup>2</sup>)?</p>',
        opciones: ['−6x<sup>5</sup>', '−6x<sup>6</sup>', '6x<sup>5</sup>', 'x<sup>5</sup>'], correcta: 0,
        pista: '<p>Multiplica coeficientes (con signo) y suma exponentes.</p>',
        solucion: '<p>(−2)(3) = −6 y x<sup>3</sup> · x<sup>2</sup> = x<sup>5</sup>: −6x<sup>5</sup>.</p>' },
      { tipo: 'expresion', simplificar: true, enunciado: '<p>Un terreno mide (x + 4) metros de ancho y (2x + 1) de largo. Escribe su área como polinomio.</p>', respuesta: '2x^2 + 9x + 4',
        pista: '<p>Área = ancho × largo. Multiplica los dos binomios.</p>',
        solucion: '<p>(x + 4)(2x + 1) da cuatro productos: 2x<sup>2</sup>, x, 8x y 4. Al juntar x + 8x = 9x, el área es <strong>2x<sup>2</sup> + 9x + 4</strong>.</p>' },
    ],
    fuentes: [OS('6-1-add-and-subtract-polynomials', 'Add and Subtract Polynomials'), OS('6-3-multiply-polynomials', 'Multiply Polynomials'), WIKI('Polinomio', 'Polinomio')],
  });

  // ------------------------------------------------------------------
  L('Productos notables (incluye el trinomio cuadrado perfecto)', {
    objetivo: 'Reconocer y desarrollar los productos notables, en especial el trinomio cuadrado perfecto, para multiplicar más rápido y hacer cálculos mentales.',
    explicacion: `
      <p>Imagina un jardín cuadrado de 10 metros por lado. Su área es 10 × 10 = 100 metros cuadrados. Ahora le agregas una franja de 3 metros por dos lados, así que el nuevo lado mide 10 + 3 = 13 y el área es 13 × 13 = 169. ¿De dónde salen esos 69 metros cuadrados extra? Si dibujas el jardín grande y lo partes, ves cuatro piezas:</p>
      <div class="tabla-wrap"><table>
        <tr><td></td><th>10</th><th>3</th></tr>
        <tr><th>10</th><td>100</td><td>30</td></tr>
        <tr><th>3</th><td>30</td><td>9</td></tr>
      </table></div>
      <p>Está el jardín original (100), un cuadrito en la esquina de 3 × 3 = 9 y <em>dos</em> franjas de 10 × 3 = 30. En total, 100 + 30 + 30 + 9 = 169. Fíjate que las franjas son dos, y por eso el 30 aparece dos veces.</p>
      <p>Algunas multiplicaciones aparecen tan seguido que conviene saberse el resultado de memoria, para no hacer todos los productos cada vez. Se llaman <strong>productos notables</strong>, que quiere decir "productos que vale la pena notar".</p>
      <h3>¿Cuánto da un binomio al cuadrado?</h3>
      <p>Si cambias el 10 por una letra <em>a</em> y el 3 por una letra <em>b</em>, el cuadrado de lado a + b se parte igual que el jardín:</p>
      <div class="tabla-wrap"><table>
        <tr><td></td><th>a</th><th>b</th></tr>
        <tr><th>a</th><td>a<sup>2</sup></td><td>ab</td></tr>
        <tr><th>b</th><td>ab</td><td>b<sup>2</sup></td></tr>
      </table></div>
      <p><strong>(a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup></strong></p>
      <p>Léelo así: <strong>el cuadrado del primero</strong> (a<sup>2</sup>), <strong>más el doble del primero por el segundo</strong> (2ab, las dos franjas), <strong>más el cuadrado del segundo</strong> (b<sup>2</sup>, la esquina). Al resultado, que tiene tres términos, se le llama <strong>trinomio cuadrado perfecto</strong>, porque es lo que da un binomio (dos términos) elevado al cuadrado.</p>
      <p>Con resta pasa algo parecido, pero el término de en medio queda negativo, porque aparecen dos productos a · (−b): <strong>(a − b)<sup>2</sup> = a<sup>2</sup> − 2ab + b<sup>2</sup></strong>. El último sigue siendo positivo, porque (−b) · (−b) da positivo.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que (a + b)<sup>2</sup> es a<sup>2</sup> + b<sup>2</sup>. Compruébalo con números: (3 + 4)<sup>2</sup> = 7<sup>2</sup> = 49, pero 3<sup>2</sup> + 4<sup>2</sup> = 9 + 16 = 25. Faltan las dos franjas: 2 · 3 · 4 = 24.</p>
      <h3>¿Qué pasa al multiplicar una suma por una resta?</h3>
      <p>Cuando multiplicas dos binomios que solo se distinguen por el signo de en medio, como (a + b) y (a − b), se llaman <strong>binomios conjugados</strong>. Al hacer los cuatro productos sale a<sup>2</sup> − ab + ab − b<sup>2</sup>. Los dos términos de en medio se cancelan, porque uno suma lo que el otro resta:</p>
      <p><strong>(a + b)(a − b) = a<sup>2</sup> − b<sup>2</sup></strong></p>
      <h3>¿Y si los dos binomios empiezan igual?</h3>
      <p>Si los dos binomios tienen la misma x al principio, el resultado sigue un patrón: <strong>(x + a)(x + b) = x<sup>2</sup> + (a + b)x + ab</strong>. En palabras, el número de en medio es la suma de los dos números, y el del final es su producto. Por ejemplo, (x + 2)(x + 5) = x<sup>2</sup> + 7x + 10, porque 2 + 5 = 7 y 2 × 5 = 10.</p>`,
    ejemplo: `
      <p>Desarrolla (3x + 5)<sup>2</sup>.</p>
      <ol class="pasos-ej">
        <li>Reconoce el caso: es un binomio al cuadrado, con primero 3x y segundo 5. Vas a usar el cuadrado del primero, más el doble del primero por el segundo, más el cuadrado del segundo.</li>
        <li>Cuadrado del primero: (3x)<sup>2</sup> = 3x · 3x = 9x<sup>2</sup>. Ojo: se eleva también el 3, no solo la x.</li>
        <li>Doble del primero por el segundo: 2 · 3x · 5 = 30x. Son las dos "franjas".</li>
        <li>Cuadrado del segundo: 5<sup>2</sup> = 25.</li>
        <li>Comprueba con x = 1. El original da (3 + 5)<sup>2</sup> = 8<sup>2</sup> = 64, y el resultado da 9 + 30 + 25 = 64. Coinciden.</li>
      </ol>
      <p>Resultado: <span class="resultado">9x<sup>2</sup> + 30x + 25</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir 3x<sup>2</sup> en el primer paso. El cuadrado afecta a todo el 3x, así que el 3 también se eleva: 3<sup>2</sup> = 9.</p>`,
    vidaReal: `
      <p>Estos atajos sirven para hacer cuentas grandes de cabeza y para planear espacios. Por ejemplo:</p>
      <ul>
        <li>Calcular sin calculadora cuánto es 51 por 51, o 47 por 53, partiendo los números en pedazos fáciles como 50 y 1.</li>
        <li>Saber cuánto pasto o piso extra comprar si agrandas un jardín o un cuarto cuadrado.</li>
        <li>Preparar el camino para resolver problemas de áreas, trayectorias de una pelota y ganancias, que verás en lecciones más adelante.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'expresion', simplificar: true, enunciado: '<p>Desarrolla (x + 3)<sup>2</sup>.</p>', respuesta: 'x^2 + 6x + 9',
        pista: '<p>x<sup>2</sup> + 2 · x · 3 + 3<sup>2</sup>.</p>',
        solucion: '<p>El cuadrado del primero es x<sup>2</sup>, el doble del primero por el segundo es 2 · x · 3 = 6x y el cuadrado del segundo es 9: <strong>x<sup>2</sup> + 6x + 9</strong>.</p>' },
      { tipo: 'expresion', simplificar: true, enunciado: '<p>Desarrolla (2x − 5)<sup>2</sup>.</p>', respuesta: '4x^2 - 20x + 25',
        pista: '<p>(2x)<sup>2</sup> − 2 · 2x · 5 + 5<sup>2</sup>.</p>',
        solucion: '<p>(2x)<sup>2</sup> = 4x<sup>2</sup>; el doble del primero por el segundo es 2 · 2x · 5 = 20x, y va con signo menos porque es una resta; 5<sup>2</sup> = 25. Resultado: <strong>4x<sup>2</sup> − 20x + 25</strong>.</p>' },
      { tipo: 'expresion', simplificar: true, enunciado: '<p>Desarrolla (x + 7)(x − 7).</p>', respuesta: 'x^2 - 49',
        pista: '<p>Son conjugados: cuadrado del primero menos cuadrado del segundo.</p>',
        solucion: '<p>Solo cambia el signo de en medio, así que son conjugados: los términos de en medio se cancelan y queda x<sup>2</sup> − 7<sup>2</sup> = <strong>x<sup>2</sup> − 49</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Usa (a − b)<sup>2</sup> para calcular 99<sup>2</sup> de cabeza. ¿Cuánto da?</p>', respuesta: 99 ** 2,
        pista: '<p>99 = 100 − 1. Calcula 100<sup>2</sup> − 2 · 100 · 1 + 1<sup>2</sup>.</p>',
        solucion: '<p>Con 99 = 100 − 1: el cuadrado de 100 es 10 000, el doble producto es 200 (se resta) y el cuadrado de 1 es 1. Total: 10 000 − 200 + 1 = <strong>9 801</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Usa binomios conjugados para calcular 52 × 48.</p>', respuesta: 52 * 48,
        pista: '<p>52 = 50 + 2 y 48 = 50 − 2.</p>',
        solucion: '<p>52 × 48 = (50 + 2)(50 − 2), que son conjugados. Da 50<sup>2</sup> − 2<sup>2</sup> = 2 500 − 4 = <strong>2 496</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es el desarrollo correcto de (x + 4)<sup>2</sup>?</p>',
        opciones: ['x<sup>2</sup> + 16', 'x<sup>2</sup> + 8x + 16', 'x<sup>2</sup> + 4x + 16', '2x + 8'], correcta: 1,
        pista: '<p>No olvides el doble del primero por el segundo.</p>',
        solucion: '<p>x<sup>2</sup> + 2 · 4 · x + 16 = x<sup>2</sup> + 8x + 16. La opción x<sup>2</sup> + 16 es el error más común.</p>' },
    ],
    fuentes: [OS('6-4-special-products', 'Special Products'), WIKI('Producto_notable', 'Producto notable'), WIKI('Trinomio_cuadrado_perfecto', 'Trinomio cuadrado perfecto')],
  });

  // ------------------------------------------------------------------
  L('Factorización', {
    objetivo: 'Escribir un polinomio como multiplicación de factores usando factor común, diferencia de cuadrados, trinomio cuadrado perfecto y trinomios de la forma x² + bx + c.',
    explicacion: `
      <p>Imagina que tienes 12 galletas y quieres acomodarlas en una charola formando un rectángulo. Puedes hacer 3 filas de 4, 2 filas de 6 o 1 fila de 12. Cada acomodo es una forma de escribir 12 como una multiplicación: 3 × 4, 2 × 6 o 1 × 12. Los números que se multiplican se llaman <strong>factores</strong>.</p>
      <p><strong>Factorizar</strong> es hacer el camino contrario a multiplicar: tienes el resultado y buscas qué se multiplicó para obtenerlo. En la lección anterior viste que (x + 2)(x + 5) = x<sup>2</sup> + 7x + 10. Factorizar es partir de x<sup>2</sup> + 7x + 10 y llegar a (x + 2)(x + 5). ¿Para qué? Porque una multiplicación suele ser más fácil de analizar que una suma larga, igual que 3 × 4 dice más sobre la charola que el número 12.</p>
      <p>Hay varios casos. Conviene revisarlos <strong>en este orden</strong>, del más sencillo al más elaborado.</p>
      <h3>¿Todos los términos tienen algo en común?</h3>
      <p>Busca el número más grande que divide a todos los coeficientes (el MCD, que viste en aritmética) y las letras que se repiten en todos los términos, con su menor exponente. Eso se llama <strong>factor común</strong>, y se saca afuera de un paréntesis:</p>
      <p>6x<sup>3</sup> − 9x<sup>2</sup> = <strong>3x<sup>2</sup>(2x − 3)</strong></p>
      <p>Aquí el MCD de 6 y 9 es 3, y los dos términos tienen al menos x<sup>2</sup>. Adentro queda lo que sobra de cada término: 6x<sup>3</sup> entre 3x<sup>2</sup> da 2x, y 9x<sup>2</sup> entre 3x<sup>2</sup> da 3. Es la propiedad distributiva al revés.</p>
      <h3>¿Es una resta de dos cuadrados?</h3>
      <p>Si tienes un cuadrado menos otro cuadrado, recuerda los binomios conjugados: (a + b)(a − b) = a<sup>2</sup> − b<sup>2</sup>. Leído al revés, eso se llama <strong>diferencia de cuadrados</strong>:</p>
      <p>a<sup>2</sup> − b<sup>2</sup> = <strong>(a + b)(a − b)</strong></p>
      <p>Por ejemplo, x<sup>2</sup> − 64 = (x + 8)(x − 8), porque 64 = 8<sup>2</sup>.</p>
      <h3>¿Es un trinomio cuadrado perfecto?</h3>
      <p>Revisa tres cosas: el primer término es un cuadrado, el último también, y el de en medio es el doble del producto de sus raíces. Si se cumplen, el trinomio viene de un binomio al cuadrado:</p>
      <p>x<sup>2</sup> + 14x + 49 = <strong>(x + 7)<sup>2</sup></strong>, porque x<sup>2</sup> es el cuadrado de x, 49 es el cuadrado de 7 y 2 · x · 7 = 14x.</p>
      <h3>¿Cómo factorizo x<sup>2</sup> + bx + c?</h3>
      <p>Viste que (x + 2)(x + 5) da x<sup>2</sup> + 7x + 10: el 7 es la <em>suma</em> de 2 y 5, y el 10 es su <em>producto</em>. Por eso, para factorizar, busca <strong>dos números que multiplicados den c y sumados den b</strong>. Para x<sup>2</sup> + 11x + 28, prueba parejas que multiplicadas den 28: 1 y 28 suman 29, 2 y 14 suman 16, y 4 y 7 suman 11. Esa es. Resultado: (x + 4)(x + 7).</p>
      <p class="nota"><strong>Trampa común:</strong> descuidar los signos. Para x<sup>2</sup> + 3x − 18 buscas dos números que multiplicados den −18 y sumados den 3. Como el producto es negativo, uno es positivo y otro negativo: son 6 y −3. Resultado: (x + 6)(x − 3). Siempre comprueba multiplicando.</p>`,
    ejemplo: `
      <p>Factoriza x<sup>2</sup> + 5x + 6.</p>
      <ol class="pasos-ej">
        <li>Primero revisa si hay factor común. El 6 no tiene x y 1, 5 y 6 no comparten ningún divisor mayor que 1, así que no hay.</li>
        <li>Después revisa los casos especiales. No es una resta de dos cuadrados, y no es trinomio cuadrado perfecto porque 6 no es el cuadrado de un número entero.</li>
        <li>Entonces es un trinomio x<sup>2</sup> + bx + c, con b = 5 y c = 6. Busca dos números que multiplicados den 6: pueden ser 1 y 6 (suman 7) o 2 y 3 (suman 5). Los que suman 5 son 2 y 3.</li>
        <li>Escribe los factores: (x + 2)(x + 3).</li>
        <li>Comprueba multiplicando: x<sup>2</sup> + 3x + 2x + 6 = x<sup>2</sup> + 5x + 6. Es la expresión original.</li>
      </ol>
      <p>Resultado: <span class="resultado">(x + 2)(x + 3)</span>.</p>
      <p class="nota"><strong>Error común:</strong> elegir 1 y 6 porque multiplicados dan 6, sin revisar la suma. Los dos números tienen que cumplir las dos condiciones a la vez.</p>`,
    vidaReal: `
      <p>Partir algo grande en piezas que se multiplican te ayuda a entenderlo mejor y a encontrar datos escondidos:</p>
      <ul>
        <li>Acomodar sillas, cajas o mosaicos en filas iguales, sabiendo de antemano qué formas de rectángulo son posibles.</li>
        <li>Encontrar cuánto mide de largo y de ancho un terreno cuando solo conoces su área.</li>
        <li>Prepararte para resolver problemas de áreas, trayectorias y ganancias, y para simplificar fracciones con letras.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Factoriza 12x + 18 sacando el mayor factor común numérico. ¿Qué número queda afuera del paréntesis?</p>', respuesta: 6,
        pista: '<p>Busca el MCD de 12 y 18.</p>',
        solucion: '<p>El número más grande que divide a 12 y a 18 es 6. Al sacarlo queda 12x + 18 = <strong>6</strong>(2x + 3), y puedes comprobarlo multiplicando.</p>' },
      { tipo: 'numero', enunciado: '<p>x<sup>2</sup> + 7x + 12 = (x + 3)(x + ?). ¿Qué número falta?</p>', respuesta: 4,
        pista: '<p>3 por ese número debe dar 12.</p>',
        solucion: '<p>Buscas un número que multiplicado por 3 dé 12 y sumado con 3 dé 7. Es el <strong>4</strong>: 3 × 4 = 12 y 3 + 4 = 7.</p>' },
      { tipo: 'numero', enunciado: '<p>x<sup>2</sup> − x − 20 = (x − 5)(x + ?). ¿Qué número falta?</p>', respuesta: 4,
        pista: '<p>−5 por ese número debe dar −20, y −5 más ese número debe dar −1.</p>',
        solucion: '<p>(−5)(4) = −20 y −5 + 4 = −1. Falta el <strong>4</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>x<sup>2</sup> − 81 = (x + 9)(x − ?). ¿Qué número falta?</p>', respuesta: 9,
        pista: '<p>Es una diferencia de cuadrados: 81 = 9<sup>2</sup>.</p>',
        solucion: '<p>Es x<sup>2</sup> − 9<sup>2</sup>, una diferencia de cuadrados, que se factoriza como (x + 9)(x − <strong>9</strong>). Al multiplicar, los términos de en medio se cancelan.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos es un trinomio cuadrado perfecto?</p>',
        opciones: ['x<sup>2</sup> + 10x + 25', 'x<sup>2</sup> + 10x + 20', 'x<sup>2</sup> + 5x + 25', 'x<sup>2</sup> + 25'], correcta: 0,
        pista: '<p>El término de en medio debe ser el doble del producto de las raíces del primero y del último.</p>',
        solucion: '<p>x<sup>2</sup> es el cuadrado de x y 25 es el cuadrado de 5. El de en medio debe ser 2 · x · 5 = 10x, y así es en x<sup>2</sup> + 10x + 25, que es (x + 5)<sup>2</sup>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un rectángulo tiene área x<sup>2</sup> + 8x + 15. Uno de sus lados mide x + 3. El otro mide x + ?. ¿Qué número falta?</p>', respuesta: 5,
        pista: '<p>Factoriza: dos números que multiplicados den 15 y sumados den 8.</p>',
        solucion: '<p>3 × 5 = 15 y 3 + 5 = 8, así que el otro lado mide x + <strong>5</strong>.</p>' },
    ],
    fuentes: [OS('7-1-greatest-common-factor-and-factor-by-grouping', 'Greatest Common Factor'), OS('7-2-factor-trinomials-of-the-form-x2-bx-c', 'Factor Trinomials'), OS('7-4-factor-special-products', 'Factor Special Products'), WIKI('Factorización', 'Factorización')],
  });

  // ------------------------------------------------------------------
  L('Ecuaciones de primer grado', {
    objetivo: 'Resolver ecuaciones de primer grado paso a paso y usarlas para resolver problemas de la vida diaria.',
    explicacion: `
      <p>Imagina este acertijo: "Pienso un número, lo multiplico por 2, le sumo 3 y me da 11. ¿Qué número pensé?". Puedes ir hacia atrás: si al final hay 11 y antes sumaste 3, antes había 8. Si 8 es el doble del número, el número es 4. Acabas de resolver una ecuación sin escribirla.</p>
      <p>En álgebra, ese acertijo se escribe <strong>2x + 3 = 11</strong>. Una <strong>ecuación</strong> es una igualdad, es decir, dos expresiones unidas por un signo =, en la que hay un valor desconocido. <strong>Resolverla</strong> es encontrar el valor de la letra que hace que la igualdad sea cierta. Aquí la solución es x = 4, porque 2 · 4 + 3 = 8 + 3 = 11.</p>
      <p>Esta es de <strong>primer grado</strong> porque la x aparece sin exponente, o sea, con exponente 1. No hay x<sup>2</sup> ni potencias más grandes.</p>
      <h3>¿Por qué se puede hacer lo mismo en los dos lados?</h3>
      <p>Piensa en una <strong>balanza en equilibrio</strong>. De un lado hay una bolsa con x canicas y 3 canicas sueltas; del otro, 11 canicas sueltas. Si quitas 3 canicas de un lado, la balanza se inclina. Pero si quitas 3 de <em>los dos</em> lados, sigue equilibrada. Ahora tienes x de un lado y 8 del otro.</p>
      <p>Lo mismo vale para una ecuación. Puedes sumar, restar, multiplicar o dividir los dos lados por el mismo número, y la igualdad se conserva. La excepción es el cero: no puedes dividir entre cero y, si multiplicas por cero, todo se vuelve 0 = 0 y pierdes la información. La meta es ir quitando lo que estorba hasta que la x quede sola de un lado.</p>
      <p>Para quitar algo, haz la operación contraria. Si un número está sumando, réstalo en los dos lados. Si está restando, súmalo. Si multiplica a la x, divide los dos lados entre él. Si la divide, multiplica.</p>
      <h3>¿Qué pasos sigo?</h3>
      <p>Con ecuaciones más largas, este orden funciona casi siempre:</p>
      <ol>
        <li>Quita los paréntesis con la propiedad distributiva: el número de afuera multiplica a cada término de adentro.</li>
        <li>Si hay fracciones, multiplica toda la ecuación por el mcm de los denominadores para que desaparezcan.</li>
        <li>Pasa los términos con x a un lado y los números solos al otro, sumando o restando en los dos lados.</li>
        <li>Junta los términos semejantes y divide entre el número que acompaña a la x.</li>
        <li><strong>Comprueba</strong> poniendo tu resultado en la ecuación original. Si los dos lados dan lo mismo, está bien.</li>
      </ol>
      <p class="nota"><strong>Trampa común:</strong> hacer una operación solo en un lado. Si en 2x + 3 = 11 restas 3 solo a la izquierda, te queda 2x = 11, y la balanza ya no está equilibrada. Lo que hagas de un lado, hazlo del otro.</p>
      <p>Al contestar los ejercicios puedes escribir solo el número, como "7", o con la letra, como "x = 7". Las dos formas se aceptan.</p>`,
    ejemplo: `
      <p>Resuelve 3(x − 2) + 4 = x + 10.</p>
      <ol class="pasos-ej">
        <li>Quita el paréntesis: el 3 multiplica a x y a −2, y queda 3x − 6 + 4 = x + 10. Junta los números de la izquierda: 3x − 2 = x + 10.</li>
        <li>Hay x en los dos lados. Para juntarlas, resta x en ambos lados: 2x − 2 = 10.</li>
        <li>El −2 estorba. Para quitarlo, suma 2 en ambos lados: 2x = 12.</li>
        <li>La x está multiplicada por 2, así que divide los dos lados entre 2: x = 6.</li>
        <li>Comprueba en la ecuación original. Lado izquierdo: 3(6 − 2) + 4 = 3 · 4 + 4 = 16. Lado derecho: 6 + 10 = 16. Los dos lados dan lo mismo.</li>
      </ol>
      <p>Resultado: <span class="resultado">x = 6</span>.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar el 3 solo por la x y escribir 3x − 2 + 4. El número de afuera multiplica a todo lo que está dentro del paréntesis.</p>`,
    vidaReal: `
      <p>Siempre que conoces el resultado final pero te falta un dato, puedes plantear una igualdad y encontrarlo. Por ejemplo:</p>
      <ul>
        <li>Saber en cuántas semanas juntarás el dinero para algo que quieres comprar.</li>
        <li>Comparar dos planes de celular, internet o gimnasio, y saber desde cuándo conviene uno u otro.</li>
        <li>Resolver problemas de edades, repartos y precios, en la vida diaria y en los exámenes de admisión.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Resuelve: 5x + 8 = 43</p>', respuesta: (43 - 8) / 5,
        pista: '<p>Resta 8 en ambos lados y luego divide entre 5.</p>',
        solucion: '<p>Al restar 8 en los dos lados queda 5x = 35. Como la x está multiplicada por 5, divides entre 5: <strong>x = 7</strong>. Comprueba: 5 · 7 + 8 = 43.</p>' },
      { tipo: 'numero', enunciado: '<p>Resuelve: 4(x − 3) = 2x + 6</p>', respuesta: 9,
        pista: '<p>Quita el paréntesis: 4x − 12 = 2x + 6.</p>',
        solucion: '<p>Sin paréntesis queda 4x − 12 = 2x + 6. Resta 2x y suma 12 en los dos lados: 2x = 18. Al dividir entre 2, <strong>x = 9</strong>.</p>' },
      { tipo: 'numero', enunciado: `<p>Resuelve: ${F('x', 3)} + 2 = 7</p>`, respuesta: (7 - 2) * 3,
        pista: '<p>Resta 2 y después multiplica por 3.</p>',
        solucion: `<p>Al restar 2 en los dos lados queda ${F('x', 3)} = 5. La x está dividida entre 3, así que multiplicas los dos lados por 3: <strong>x = 15</strong>.</p>` },
      { tipo: 'numero', enunciado: '<p>Ya tienes $600 ahorrados y guardas $150 cada semana. ¿En cuántas semanas llegarás a $2 400?</p>', respuesta: (2400 - 600) / 150,
        pista: '<p>Plantea 600 + 150s = 2 400.</p>',
        solucion: '<p>Si s son las semanas, 600 + 150s = 2 400. Al restar 600 queda 150s = 1 800, y al dividir entre 150, <strong>s = 12</strong> semanas.</p>' },
      { tipo: 'numero', enunciado: '<p>El plan A de celular cuesta $150 al mes más $2 por minuto. El plan B cuesta $250 más $1 por minuto. ¿Con cuántos minutos cuestan lo mismo?</p>', respuesta: 100,
        pista: '<p>Iguala los costos: 150 + 2m = 250 + m.</p>',
        solucion: '<p>De 150 + 2m = 250 + m, resta m y resta 150 en los dos lados: <strong>m = 100</strong> minutos. Con más minutos conviene el plan B, porque cada minuto extra le cuesta menos.</p>' },
      { tipo: 'numero', enunciado: '<p>Ana tiene el triple de la edad de su hijo, y entre los dos suman 48 años. ¿Cuántos años tiene el hijo?</p>', respuesta: 48 / 4,
        pista: '<p>Si el hijo tiene x años, Ana tiene 3x. Entonces x + 3x = 48.</p>',
        solucion: '<p>x + 3x son 4x, así que 4x = 48 y, al dividir entre 4, <strong>x = 12</strong>. Ana tiene 36, y 12 + 36 = 48.</p>' },
    ],
    fuentes: [OS('2-1-solve-equations-using-the-subtraction-and-addition-properties-of-equality', 'Solve Equations Using the Subtraction and Addition Properties of Equality'), OS('2-3-solve-equations-with-variables-and-constants-on-both-sides', 'Solve Equations with Variables and Constants on Both Sides'), WIKI('Ecuación_de_primer_grado', 'Ecuación de primer grado')],
  });

  // ------------------------------------------------------------------
  L('Desigualdades', {
    objetivo: 'Resolver desigualdades de primer grado, saber cuándo se invierte el signo e interpretar el resultado como un rango de valores.',
    explicacion: `
      <p>Imagina que un juego de la feria tiene un letrero: "Solo para mayores de 12 años". No dice que debas tener exactamente 13. Puedes tener 13, 15 o 40, y todos esos valores sirven. Del mismo modo, un elevador que "soporta hasta 800 kg" acepta 300, 650 o justo 800 kg, pero no 801. En la vida diaria muchas reglas no piden un número exacto, sino un límite.</p>
      <p>En matemáticas, una comparación de este tipo se llama <strong>desigualdad</strong> (también se le dice inecuación). Es como una ecuación, pero en lugar del signo = usa uno de estos símbolos:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Símbolo</th><th>Significa</th><th>Ejemplo</th></tr>
        <tr><td>&lt;</td><td>menor que</td><td>x &lt; 5</td></tr>
        <tr><td>&gt;</td><td>mayor que</td><td>x &gt; −2</td></tr>
        <tr><td>≤</td><td>menor o igual que</td><td>x ≤ 10</td></tr>
        <tr><td>≥</td><td>mayor o igual que</td><td>x ≥ 18</td></tr>
      </table></div>
      <p>Un truco para no confundir &lt; y &gt;: la parte abierta del símbolo siempre mira hacia el número más grande, como una boca que quiere comerse lo que hay más. En 3 &lt; 5, la boca mira al 5. La rayita de abajo en ≤ y ≥ es como media rayita de un =: indica que el límite también cuenta.</p>
      <h3>¿Qué tiene de distinto su solución?</h3>
      <p>Una ecuación como x + 2 = 7 tiene una sola respuesta: x = 5. En cambio, la desigualdad x &lt; 5 tiene muchísimas: 4, 3, 0, −100, 4.99… Cualquier número menor que 5 funciona. Por eso la solución de una desigualdad no es un número, sino un <strong>rango</strong>, es decir, un tramo de valores.</p>
      <p>Ese tramo se dibuja en la recta numérica. Se marca el límite con un círculo y se pinta la parte que cumple. El círculo va <strong>abierto</strong> (vacío) si el límite no se incluye, como en &lt; y &gt;, y <strong>cerrado</strong> (relleno) si sí se incluye, como en ≤ y ≥.</p>
      <h3>¿Cómo se resuelven?</h3>
      <p>Casi <strong>igual que una ecuación</strong>. Puedes sumar o restar el mismo número en los dos lados, y la desigualdad se conserva. Si tienes 3 &lt; 5 y sumas 10 a los dos lados, sigue siendo cierto: 13 &lt; 15. También puedes multiplicar o dividir entre un número positivo: 3 · 2 &lt; 5 · 2, porque 6 &lt; 10.</p>
      <p>Pero hay una regla extra. Mira qué pasa si multiplicas 3 &lt; 5 por −1: obtienes −3 y −5. ¿Cuál es menor? En la recta, −5 está más a la izquierda, así que −5 es menor y lo correcto es −3 &gt; −5. El orden se dio la vuelta. Es como un espejo: al pasar a los negativos, lo que estaba más a la derecha queda más a la izquierda.</p>
      <p class="nota"><strong>Trampa común: si multiplicas o divides ambos lados por un número negativo, el símbolo se voltea.</strong> Por ejemplo, en −2x &lt; 6 divides entre −2 y obtienes x &gt; −3, no x &lt; −3. Compruébalo con x = 0: cumple −2(0) &lt; 6, porque 0 &lt; 6, y también cumple 0 &gt; −3.</p>
      <p>Para revisar tu respuesta, elige un número que esté dentro del rango y otro que esté fuera, y ponlos en la desigualdad original. El de adentro debe cumplirla y el de afuera, no.</p>`,
    ejemplo: `
      <p>Tienes $500 para ir a la feria. Ya gastaste $120 en comida y cada juego cuesta $45. ¿Cuántos juegos puedes pagar como máximo?</p>
      <ol class="pasos-ej">
        <li>Llama j al número de juegos. Lo que gastas en total es 120 + 45j, y eso no puede pasar de 500. Se escribe 120 + 45j ≤ 500.</li>
        <li>Resta 120 en los dos lados, igual que en una ecuación: 45j ≤ 380.</li>
        <li>Divide entre 45. Como 45 es positivo, el símbolo no se voltea: j ≤ 8.44…</li>
        <li>No puedes pagar un pedazo de juego, así que buscas el mayor número entero que no pase de 8.44: es 8.</li>
        <li>Comprueba: 8 juegos cuestan 360, y 120 + 360 = 480, que no pasa de 500. Con 9 juegos serían 120 + 405 = 525, que sí se pasa.</li>
      </ol>
      <p>Resultado: <span class="resultado">máximo 8 juegos</span>.</p>
      <p class="nota"><strong>Error común:</strong> redondear 8.44 hacia arriba y contestar 9. Aquí hay un máximo, así que redondear hacia arriba te deja sin dinero suficiente.</p>`,
    vidaReal: `
      <p>Muchas decisiones no dependen de un número exacto, sino de no pasarte de un límite o de llegar a un mínimo:</p>
      <ul>
        <li>Saber cuánto puedes gastar en una salida sin pasarte de tu presupuesto.</li>
        <li>Respetar límites como el peso máximo de un elevador, la velocidad máxima en una calle o la edad mínima para un trámite.</li>
        <li>Calcular qué calificación necesitas en el último examen para aprobar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Resuelve 3x + 4 &lt; 19. El resultado es x &lt; ?. Escribe el número.</p>', respuesta: (19 - 4) / 3,
        pista: '<p>Resta 4 y divide entre 3, como en una ecuación.</p>',
        solucion: '<p>Al restar 4 en los dos lados queda 3x &lt; 15. Al dividir entre 3, que es positivo, el símbolo no cambia: x &lt; <strong>5</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Resuelve −4x ≥ 12.</p>', opciones: ['x ≥ −3', 'x ≤ −3', 'x ≥ 3', 'x ≤ 3'], correcta: 1,
        pista: '<p>Vas a dividir entre −4: el símbolo se voltea.</p>',
        solucion: '<p>Al dividir entre −4: x ≤ −3. Comprueba con x = −4: −4(−4) = 16 ≥ 12 ✓</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es el mayor número <strong>entero</strong> que cumple 2x − 7 ≤ 10?</p>', respuesta: 8,
        pista: '<p>Resuelve: 2x ≤ 17, y busca el mayor entero que no pase de ese valor.</p>',
        solucion: '<p>Al sumar 7 queda 2x ≤ 17, y al dividir entre 2, x ≤ 8.5. El mayor entero que no pasa de 8.5 es <strong>8</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un elevador soporta hasta 800 kg. El operador pesa 75 kg y cada caja pesa 25 kg. ¿Cuántas cajas puede subir como máximo en un viaje?</p>', respuesta: (800 - 75) / 25,
        pista: '<p>Plantea 75 + 25c ≤ 800.</p>',
        solucion: '<p>Al restar el peso del operador queda 25c ≤ 725, y al dividir entre 25, c ≤ 29. Puede subir como máximo <strong>29</strong> cajas.</p>' },
      { tipo: 'numero', enunciado: '<p>Para aprobar necesitas un promedio de al menos 8 en tres exámenes. Llevas 7 y 8.5. ¿Cuál es la calificación mínima que necesitas en el tercero?</p>', respuesta: 8 * 3 - 7 - 8.5,
        pista: `<p>Plantea ${F('7 + 8.5 + x', 3)} ≥ 8 y multiplica ambos lados por 3.</p>`,
        solucion: '<p>Al multiplicar por 3, los tres exámenes deben sumar al menos 24: 15.5 + x ≥ 24. Al restar 15.5, x ≥ <strong>8.5</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos números es solución de x − 5 &gt; 2?</p>', opciones: ['7', '6', '8', '0'], correcta: 2,
        pista: '<p>Resuelve primero la desigualdad y fíjate si el límite está incluido o no.</p>',
        solucion: '<p>x &gt; 7, así que solo el 8 cumple (8 − 5 = 3 &gt; 2). Con 7 da 2, que no es mayor que 2.</p>' },
    ],
    fuentes: [OS('2-7-solve-linear-inequalities', 'Solve Linear Inequalities'), WIKI('Inecuación', 'Inecuación'), KHAN],
  });

  // ------------------------------------------------------------------
  L('Sistemas de ecuaciones 2×2', {
    objetivo: 'Resolver dos ecuaciones con dos incógnitas por sustitución o por reducción, y plantear problemas con dos datos desconocidos.',
    explicacion: `
      <p>Imagina este acertijo: "Pienso dos números. Juntos suman 12, y uno le gana al otro por 4. ¿Cuáles son?". Con una sola pista no basta: 12 puede ser 6 + 6, 9 + 3, 10 + 2 y muchas parejas más. Pero si revisas cuáles de esas parejas tienen una diferencia de 4, solo queda una: 8 y 4.</p>
      <p>Si llamas x al número mayor y y al menor, las dos pistas se escriben así:</p>
      <p>x + y = 12<br>x − y = 4</p>
      <p>Dos ecuaciones con dos incógnitas que se deben cumplir juntas forman un <strong>sistema de ecuaciones 2×2</strong> (el "2×2" se lee "dos por dos" y quiere decir dos ecuaciones y dos letras). La solución es la pareja de valores que cumple <strong>las dos a la vez</strong>: aquí x = 8 y y = 4. Cada ecuación sola tiene muchas soluciones; el sistema busca la que comparten.</p>
      <p>Más adelante, en la unidad de Funciones, aprenderás a dibujar una ecuación como esta en forma de línea. Por ahora no lo necesitas: te lo cuento solo para que entiendas la idea. Si cada ecuación fuera una línea, la solución sería el punto donde las dos se cruzan, porque es el único punto que está en ambas.</p>
      <h3>¿Cómo lo resuelvo por sustitución?</h3>
      <p>La idea es convertir dos ecuaciones con dos letras en una sola ecuación con una letra, que ya sabes resolver. Se le llama <strong>sustitución</strong> porque cambias una letra por lo que vale:</p>
      <ol>
        <li>Despeja una incógnita en una de las ecuaciones, es decir, déjala sola de un lado del igual. De x − y = 4 sale x = y + 4.</li>
        <li>Sustitúyela en la otra ecuación. Donde decía x, escribe y + 4: (y + 4) + y = 12. Ahora solo hay una letra.</li>
        <li>Resuélvela: 2y + 4 = 12, 2y = 8, y = 4. Después regresa a calcular la otra: x = 4 + 4 = 8.</li>
      </ol>
      <h3>¿Cómo lo resuelvo por reducción?</h3>
      <p>El método de <strong>reducción</strong> (también llamado eliminación) suma o resta las dos ecuaciones completas para que una letra desaparezca. Se vale porque sumas cantidades iguales a los dos lados, como en la balanza. En el ejemplo, la primera ecuación tiene +y y la segunda −y. Al sumarlas, las y se cancelan: 2x = 16, así que x = 8, y luego y = 4. Si ninguna letra se cancela de inmediato, primero multiplica una ecuación completa por algún número para que sí ocurra.</p>
      <h3>¿Siempre hay solución?</h3>
      <p>No siempre. Pueden pasar tres cosas:</p>
      <ul>
        <li>Hay <strong>una solución</strong> cuando solo una pareja de valores cumple las dos ecuaciones, como en el acertijo. Es el caso más común. En el dibujo, las dos líneas se cruzan en un punto.</li>
        <li>No hay <strong>ninguna</strong> cuando las ecuaciones se contradicen. Por ejemplo, x + y = 6 y x + y = 9: la misma suma no puede valer 6 y 9. En el dibujo serían líneas paralelas, como los rieles del tren, que nunca se tocan.</li>
        <li>Hay <strong>infinitas</strong> cuando las dos ecuaciones dicen lo mismo, como x + y = 5 y 2x + 2y = 10. En el dibujo serían la misma línea.</li>
      </ul>`,
    ejemplo: `
      <p>2 cafés y 1 pan cuestan $85. 1 café y 3 panes cuestan $80. ¿Cuánto cuesta cada cosa?</p>
      <ol class="pasos-ej">
        <li>Ponle letra a lo que no sabes: c es el precio del café y p el del pan. Cada ticket da una ecuación: 2c + p = 85 y c + 3p = 80.</li>
        <li>Despeja la letra que esté más fácil. En la segunda, c no tiene número adelante, así que es fácil dejarla sola: c = 80 − 3p.</li>
        <li>Sustituye en la primera: 2(80 − 3p) + p = 85. Quita el paréntesis: 160 − 6p + p = 85, o sea, 160 − 5p = 85. Resta 160: −5p = −75. Divide entre −5: p = 15.</li>
        <li>Regresa a la expresión del paso 2: c = 80 − 3 · 15 = 80 − 45 = 35.</li>
        <li>Comprueba en los dos tickets: 2 · 35 + 15 = 85 y 35 + 3 · 15 = 80. Los dos coinciden.</li>
      </ol>
      <p>Resultado: <span class="resultado">café $35, pan $15</span>.</p>
      <p class="nota"><strong>Error común:</strong> comprobar solo en una ecuación. La solución debe cumplir las dos.</p>`,
    vidaReal: `
      <p>Cuando hay dos datos desconocidos y tienes dos pistas sobre ellos, puedes averiguar los dos a la vez:</p>
      <ul>
        <li>Descubrir cuánto cuesta cada producto a partir de dos tickets con distintas combinaciones.</li>
        <li>Saber cuánto usar de cada ingrediente en una mezcla para lograr un sabor o un costo.</li>
        <li>Decidir cuántas piezas de dos productos debe vender un negocio para cubrir sus gastos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Sistema: x + y = 10 y x − y = 4. ¿Cuánto vale <strong>x</strong>?</p>', respuesta: (10 + 4) / 2,
        pista: '<p>Suma las dos ecuaciones: la y desaparece.</p>',
        solucion: '<p>Al sumar las ecuaciones, +y y −y se cancelan: 2x = 14. Al dividir entre 2, <strong>x = 7</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En el mismo sistema (x + y = 10, x − y = 4), ¿cuánto vale <strong>y</strong>?</p>', respuesta: 10 - 7,
        pista: '<p>Usa x = 7 en x + y = 10.</p>',
        solucion: '<p>Con x = 7, la primera ecuación queda 7 + y = 10. Al restar 7, <strong>y = 3</strong>. Comprueba en la otra: 7 − 3 = 4.</p>' },
      { tipo: 'numero', enunciado: '<p>Sistema: 3x + 2y = 16 y x − y = 2. ¿Cuánto vale <strong>x</strong>?</p>', respuesta: 4,
        pista: '<p>Despeja x = y + 2 de la segunda y sustitúyela en la primera.</p>',
        solucion: '<p>Al sustituir x = y + 2 queda 3(y + 2) + 2y = 16, o sea, 5y + 6 = 16. Así 5y = 10 y y = 2, y entonces x = 2 + 2 = <strong>4</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En el mismo sistema (3x + 2y = 16, x − y = 2), ¿cuánto vale <strong>y</strong>?</p>', respuesta: 2,
        pista: '<p>Usa x = y + 2 en la primera ecuación, o pon x = 4 en x − y = 2.</p>',
        solucion: '<p><strong>y = 2</strong>. Comprueba: 3(4) + 2(2) = 16 ✓ y 4 − 2 = 2 ✓</p>' },
      { tipo: 'numero', enunciado: '<p>En el cine, 3 boletos de adulto y 2 de niño cuestan $410. 2 de adulto y 4 de niño cuestan $420. ¿Cuánto cuesta un boleto de niño?</p>', respuesta: 55,
        pista: '<p>3a + 2n = 410 y 2a + 4n = 420. Divide la segunda entre 2 (a + 2n = 210) y despeja a.</p>',
        solucion: '<p>De a + 2n = 210 sale a = 210 − 2n. Al sustituir en la primera: 3(210 − 2n) + 2n = 410, o sea, 630 − 4n = 410, así que 4n = 220 y <strong>n = 55</strong>. El de adulto cuesta 210 − 110 = $100.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuántas soluciones tiene el sistema x + y = 5 y x + y = 8?</p>',
        opciones: ['Una', 'Ninguna', 'Infinitas'], correcta: 1,
        pista: '<p>¿Puede la misma suma valer 5 y 8 a la vez?</p>',
        solucion: '<p>Ninguna: las ecuaciones se contradicen. Si las dibujaras, serían dos líneas paralelas que nunca se cruzan.</p>' },
    ],
    fuentes: [OS('5-2-solving-systems-of-equations-by-substitution', 'Solving Systems of Equations by Substitution'), OS('5-3-solve-systems-of-equations-by-elimination', 'Solve Systems of Equations by Elimination'), WIKI('Sistema_de_ecuaciones_lineales', 'Sistema de ecuaciones lineales')],
  });

  // ------------------------------------------------------------------
  L('Ecuaciones de segundo grado', {
    objetivo: 'Resolver ecuaciones de segundo grado por factorización y con la fórmula general, y predecir cuántas soluciones tienen.',
    explicacion: `
      <p>Imagina que quieres poner pasto en un patio cuadrado y te venden justo 25 metros cuadrados. ¿Cuánto debe medir cada lado? Buscas un número que multiplicado por sí mismo dé 25, es decir, x<sup>2</sup> = 25. La respuesta es 5, porque 5 × 5 = 25.</p>
      <p>Aquí la x aparece elevada al cuadrado, y eso cambia las cosas. Una ecuación en la que el exponente más grande de la x es 2 se llama de <strong>segundo grado</strong> o <strong>cuadrática</strong>. Siempre se puede acomodar así:</p>
      <p><strong>ax<sup>2</sup> + bx + c = 0</strong></p>
      <p>Léelo así: a es el número que acompaña a x<sup>2</sup>, b es el que acompaña a x y c es el número solo. La a no puede ser 0, porque entonces desaparecería el x<sup>2</sup> y ya no sería de segundo grado. A diferencia de las de primer grado, estas ecuaciones pueden tener <strong>dos, una o ninguna</strong> solución.</p>
      <h3>¿Hay casos rápidos?</h3>
      <p>Sí, dos. Si no hay término con x, como en x<sup>2</sup> = 25, piensa qué números al cuadrado dan 25. Son dos: x = 5 y x = −5, porque (−5) · (−5) también da 25. En el patio solo sirve el 5, porque una medida no es negativa, pero la ecuación tiene las dos.</p>
      <p>Si no hay número solo, como en x<sup>2</sup> − 3x = 0, saca la x como factor común: x(x − 3) = 0. Entonces x = 0 o x = 3.</p>
      <h3>¿Por qué sirve factorizar?</h3>
      <p>Por una idea muy útil: <strong>si dos números multiplicados dan cero, al menos uno de ellos es cero</strong>. No hay otra forma de obtener cero al multiplicar. Por eso, si factorizas, cada factor te da una solución:</p>
      <p>x<sup>2</sup> + 7x + 12 = 0 se convierte en (x + 3)(x + 4) = 0. Entonces x + 3 = 0, que da x = −3, o x + 4 = 0, que da x = −4.</p>
      <h3>¿Y si no puedo factorizar?</h3>
      <p>Usa la <strong>fórmula general</strong>, que funciona siempre:</p>
      <p><strong>x = ${F('−b ± √(b² − 4ac)', '2a')}</strong></p>
      <p>Solo tienes que identificar a, b y c, y sustituirlos. El signo ± se lee "más o menos": significa que haces la cuenta dos veces, una sumando y otra restando, y por eso pueden salir dos soluciones. Esta fórmula no sale de la nada: viene de convertir la ecuación en un trinomio cuadrado perfecto, el producto notable que ya conoces. Mira un caso con números, x<sup>2</sup> + 6x + 5 = 0. Pasa el 5 al otro lado: x<sup>2</sup> + 6x = −5. Para que la izquierda sea un trinomio cuadrado perfecto, falta un 9, que es la mitad de 6 elevada al cuadrado. Si lo sumas en los dos lados, queda (x + 3)<sup>2</sup> = 4. Entonces x + 3 puede ser 2 o −2, y por eso x = −1 o x = −5. Hacer el mismo recorrido con las letras a, b y c lleva a la fórmula.</p>
      <h3>¿Cuántas soluciones tendrá?</h3>
      <p>Lo que está dentro de la raíz, <strong>b<sup>2</sup> − 4ac</strong>, se llama <strong>discriminante</strong>, porque "discrimina", o sea, distingue entre los casos. Calcúlalo primero:</p>
      <ul>
        <li>Si es positivo, hay dos soluciones, porque sumar y restar su raíz da dos resultados distintos.</li>
        <li>Si es cero, hay una sola solución (repetida), porque sumar o restar cero da lo mismo.</li>
        <li>Si es negativo, no hay solución real (es decir, entre los números que conoces), porque ningún número multiplicado por sí mismo da negativo.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> olvidar la solución negativa. En x<sup>2</sup> = 25, tanto 5 como −5 cumplen la ecuación.</p>`,
    ejemplo: `
      <p>Resuelve x<sup>2</sup> − 2x − 15 = 0 con la fórmula general.</p>
      <ol class="pasos-ej">
        <li>Identifica los números, con todo y signo: a = 1 (la x<sup>2</sup> no tiene número, así que es 1), b = −2 y c = −15.</li>
        <li>Calcula el discriminante: (−2)<sup>2</sup> − 4(1)(−15) = 4 + 60 = 64. Como es positivo, habrá dos soluciones. Su raíz es √64 = 8.</li>
        <li>Sustituye en la fórmula. Arriba, −b es −(−2) = 2: x = ${F('2 ± 8', 2)}.</li>
        <li>Haz la cuenta dos veces. Sumando: x = ${F(10, 2)} = 5. Restando: x = ${F(-6, 2)} = −3.</li>
        <li>Comprueba con 5: 25 − 10 − 15 = 0. Con −3: 9 + 6 − 15 = 0. Las dos funcionan.</li>
      </ol>
      <p>Resultado: <span class="resultado">x = 5 o x = −3</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir −b como −2 cuando b ya es negativo. Si b = −2, entonces −b = 2.</p>`,
    vidaReal: `
      <p>Este tipo de problemas aparece cuando algo se multiplica por sí mismo, como el lado de un cuadrado o el tiempo de una caída:</p>
      <ul>
        <li>Saber en qué momento toca el suelo una pelota lanzada al aire o un chorro de agua.</li>
        <li>Encontrar las medidas de un terreno, una caja o un marco cuando ya conoces su área.</li>
        <li>Calcular qué precio le conviene poner a un negocio para ganar lo más posible.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Resuelve x<sup>2</sup> = 49. Escribe la solución <strong>positiva</strong>.</p>', respuesta: 7,
        pista: '<p>¿Qué número al cuadrado da 49?</p>',
        solucion: '<p>Tanto 7 · 7 como (−7) · (−7) dan 49, así que x = 7 o x = −7. La positiva es <strong>7</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Resuelve x<sup>2</sup> + 5x + 6 = 0. Escribe la solución <strong>mayor</strong>.</p>', respuesta: -2,
        pista: '<p>Factoriza: (x + 2)(x + 3) = 0.</p>',
        solucion: '<p>Si (x + 2)(x + 3) = 0, uno de los factores es cero: x = −2 o x = −3. La mayor es <strong>−2</strong>, porque está más a la derecha en la recta numérica.</p>' },
      { tipo: 'numero', enunciado: '<p>Resuelve x<sup>2</sup> − 6x + 9 = 0.</p>', respuesta: 3,
        pista: '<p>Es un trinomio cuadrado perfecto: (x − 3)<sup>2</sup>.</p>',
        solucion: '<p>La ecuación es (x − 3)(x − 3) = 0, y los dos factores se hacen cero con el mismo valor: <strong>x = 3</strong>. Es una solución única, y por eso el discriminante da 0.</p>' },
      { tipo: 'numero', enunciado: '<p>Resuelve 2x<sup>2</sup> − 7x + 3 = 0 con la fórmula general. Escribe la solución <strong>menor</strong>.</p>', respuesta: (7 - Math.sqrt(49 - 24)) / 4,
        pista: '<p>a = 2, b = −7, c = 3. Discriminante: 49 − 24 = 25.</p>',
        solucion: `<p>Como b = −7, arriba va −b = 7, y la raíz de 25 es 5: x = ${F('7 ± 5', 4)}. Sumando da 3 y restando da ${F(1, 2)}. La menor es <strong>0.5</strong>.</p>` },
      { tipo: 'opciones', enunciado: '<p>¿Cuántas soluciones reales tiene x<sup>2</sup> + 2x + 5 = 0?</p>', opciones: ['Dos', 'Una', 'Ninguna'], correcta: 2,
        pista: '<p>Calcula el discriminante b<sup>2</sup> − 4ac.</p>',
        solucion: '<p>Con a = 1, b = 2 y c = 5, el discriminante es 4 − 20 = −16. Es negativo, y ningún número al cuadrado da negativo: no tiene soluciones reales.</p>' },
      { tipo: 'numero', enunciado: '<p>Un terreno rectangular mide 3 m más de largo que de ancho, y su área es 40 m². ¿Cuánto mide de ancho?</p>', respuesta: 5,
        pista: '<p>Si el ancho es x: x(x + 3) = 40 → x<sup>2</sup> + 3x − 40 = 0.</p>',
        solucion: '<p>Dos números que multiplicados den −40 y sumados den 3 son 8 y −5, así que (x + 8)(x − 5) = 0 y x = 5 o x = −8. Una medida no puede ser negativa: <strong>5 m</strong>.</p>' },
    ],
    fuentes: [OS('7-6-quadratic-equations', 'Quadratic Equations'), OS('10-3-solve-quadratic-equations-using-the-quadratic-formula', 'Solve Quadratic Equations Using the Quadratic Formula'), WIKI('Ecuación_de_segundo_grado', 'Ecuación de segundo grado')],
  });

  // ------------------------------------------------------------------
  L('Leyes de los exponentes y radicales', {
    objetivo: 'Simplificar expresiones con exponentes enteros, negativos y fraccionarios, y simplificar raíces.',
    explicacion: `
      <p>Imagina una caja con 2 bolsas, cada bolsa con 2 paquetes y cada paquete con 2 dulces. Hay 2 × 2 × 2 = 8 dulces. Escribir tantos "por 2" cansa, por eso se usa una <strong>potencia</strong>: 2<sup>3</sup>. El número de abajo, la <strong>base</strong>, es lo que se multiplica; el pequeño de arriba, el <strong>exponente</strong>, dice cuántas veces aparece.</p>
      <p>Si piensas siempre en "cuántas veces se repite la base", las reglas de las potencias salen solas. Mira:</p>
      <ul>
        <li>2<sup>3</sup> · 2<sup>2</sup> es (2 · 2 · 2) · (2 · 2): cinco doses. Por eso, al multiplicar, <strong>los exponentes se suman</strong>: 2<sup>5</sup>.</li>
        <li>${F('2<sup>5</sup>', '2<sup>2</sup>')} es cinco doses arriba y dos abajo. Al simplificar, se cancelan dos, y quedan tres. Por eso, al dividir, <strong>los exponentes se restan</strong>.</li>
        <li>(2<sup>3</sup>)<sup>2</sup> es 2<sup>3</sup> · 2<sup>3</sup>: dos grupos de tres doses, seis en total. Por eso, en una potencia de potencia, <strong>los exponentes se multiplican</strong>.</li>
      </ul>
      <p>Con un producto adentro del paréntesis, el exponente afecta a cada factor. Por ejemplo, (2x)<sup>3</sup> es 2x · 2x · 2x, que son tres doses y tres x: 2<sup>3</sup> · x<sup>3</sup> = 8x<sup>3</sup>.</p>
      <p>Esta tabla reúne todas las leyes, con letras en lugar de números. Las letras a y b son cualquier número distinto de cero, y m y n son exponentes:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Ley</th><th>Ejemplo</th></tr>
        <tr><td>a<sup>m</sup> · a<sup>n</sup> = a<sup>m+n</sup></td><td>x<sup>2</sup> · x<sup>5</sup> = x<sup>7</sup></td></tr>
        <tr><td>a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m−n</sup></td><td>x<sup>6</sup> ÷ x<sup>2</sup> = x<sup>4</sup></td></tr>
        <tr><td>(a<sup>m</sup>)<sup>n</sup> = a<sup>m·n</sup></td><td>(x<sup>3</sup>)<sup>2</sup> = x<sup>6</sup></td></tr>
        <tr><td>(ab)<sup>n</sup> = a<sup>n</sup>b<sup>n</sup></td><td>(2x)<sup>3</sup> = 8x<sup>3</sup></td></tr>
        <tr><td>a<sup>0</sup> = 1</td><td>7<sup>0</sup> = 1</td></tr>
        <tr><td>a<sup>−n</sup> = ${F(1, 'a<sup>n</sup>')}</td><td>3<sup>−2</sup> = ${F(1, 9)}</td></tr>
        <tr><td>a<sup>m/n</sup> = (<sup>n</sup>√a)<sup>m</sup></td><td>8<sup>2/3</sup> = (∛8)<sup>2</sup> = 4</td></tr>
      </table></div>
      <h3>¿Qué significan el exponente cero y el negativo?</h3>
      <p>Mira esta escalera: 2<sup>3</sup> = 8, 2<sup>2</sup> = 4, 2<sup>1</sup> = 2. Cada vez que el exponente baja uno, el resultado se divide entre 2. Si sigues bajando: 2<sup>0</sup> = 1, 2<sup>−1</sup> = ${F(1, 2)}, 2<sup>−2</sup> = ${F(1, 4)}. Por eso cualquier número (distinto de cero) elevado a 0 da 1.</p>
      <p>Fíjate también que un <strong>exponente negativo</strong> no hace negativo al número: lo manda al denominador de una fracción. Así, 3<sup>−2</sup> es ${F(1, 9)}, una cantidad pequeña pero positiva.</p>
      <h3>¿Y un exponente con fracción?</h3>
      <p>Un <strong>exponente fraccionario</strong> es otra forma de escribir una raíz. El número de abajo de la fracción dice qué raíz sacar (2 es raíz cuadrada, 3 es raíz cúbica) y el de arriba, a qué potencia elevar. En 8<sup>2/3</sup>, primero sacas la raíz cúbica de 8, que es 2, porque 2 · 2 · 2 = 8. Luego elevas al cuadrado: 2<sup>2</sup> = 4.</p>
      <h3>¿Cómo simplifico una raíz?</h3>
      <p>Una raíz cuadrada se puede partir en una multiplicación: √(a · b) = √a · √b. Esto sirve para sacar de la raíz los <strong>cuadrados perfectos</strong>, que son los números como 4, 9, 25 o 36, cuya raíz es exacta. Por ejemplo, 50 = 25 · 2, así que √50 = √25 · √2 = 5√2. Se lee "cinco raíz de dos".</p>
      <p class="nota"><strong>Trampa común:</strong> la raíz <em>no</em> se reparte en una suma. √(36 + 64) = √100 = 10, no 6 + 8 = 14. Solo se puede partir cuando adentro hay una multiplicación.</p>`,
    ejemplo: `
      <p>Simplifica (2x<sup>3</sup>)<sup>2</sup> · x<sup>−4</sup>.</p>
      <ol class="pasos-ej">
        <li>Empieza por el paréntesis. Elevar al cuadrado es multiplicarlo dos veces por sí mismo, así que el cuadrado afecta al 2 y a la x<sup>3</sup>: (2x<sup>3</sup>)<sup>2</sup> = 2<sup>2</sup> · (x<sup>3</sup>)<sup>2</sup>.</li>
        <li>Calcula cada parte: 2<sup>2</sup> = 4 y, en la potencia de potencia, los exponentes se multiplican: 3 · 2 = 6. Queda 4x<sup>6</sup>.</li>
        <li>Ahora multiplica por x<sup>−4</sup>. Es la misma letra, así que sumas exponentes: 6 + (−4) = 2. Queda 4x<sup>2</sup>.</li>
        <li>Comprueba con x = 1, donde toda potencia de x vale 1: el original da (2)<sup>2</sup> · 1 = 4, y el resultado da 4 · 1 = 4. Con x = 2 también: (16)<sup>2</sup> · ${F(1, 16)} = 16, y 4 · 4 = 16.</li>
      </ol>
      <p>Resultado: <span class="resultado">4x<sup>2</sup></span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir 2x<sup>6</sup> en el primer paso. El exponente de afuera afecta a todo lo que está dentro del paréntesis, también al 2.</p>`,
    vidaReal: `
      <p>Las potencias y las raíces aparecen cuando algo se multiplica una y otra vez, o cuando cambias el tamaño de algo:</p>
      <ul>
        <li>Calcular cuánto crece tu ahorro cuando el banco te paga intereses año tras año sobre lo que ya ganaste.</li>
        <li>Saber que si duplicas el lado de un cuadrado necesitas cuatro veces más piso, y si duplicas una caja cabe ocho veces más.</li>
        <li>Usar fórmulas de ciencia y dinero que tienen raíces.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'expresion', simplificar: true, enunciado: `<p>Simplifica ${F('x<sup>5</sup> · x<sup>3</sup>', 'x<sup>2</sup>')}.</p>`, respuesta: 'x^6',
        pista: '<p>Arriba suma exponentes; luego resta el de abajo.</p>',
        solucion: '<p>Arriba, x<sup>5</sup> · x<sup>3</sup> = x<sup>8</sup>, porque se suman los exponentes. Al dividir entre x<sup>2</sup> se restan: 8 − 2 = 6, y queda <strong>x<sup>6</sup></strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula 2<sup>−3</sup>. Puedes responder como fracción o decimal.</p>', respuesta: 2 ** -3,
        pista: '<p>El exponente negativo manda la potencia al denominador.</p>',
        solucion: `<p>${F(1, '2<sup>3</sup>')} = <strong>${F(1, 8)}</strong> = 0.125.</p>` },
      { tipo: 'numero', enunciado: '<p>Calcula 27<sup>2/3</sup>.</p>', respuesta: 9,
        pista: '<p>Primero la raíz cúbica de 27; después eleva al cuadrado.</p>',
        solucion: '<p>El 3 de abajo pide la raíz cúbica: ∛27 = 3, porque 3 · 3 · 3 = 27. El 2 de arriba pide elevar al cuadrado: 3<sup>2</sup> = <strong>9</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Simplifica √72 = a√2. ¿Cuánto vale a?</p>', respuesta: 6,
        pista: '<p>72 = 36 · 2, y 36 es un cuadrado perfecto.</p>',
        solucion: '<p>Como 72 = 36 · 2, la raíz se parte en √36 · √2. La raíz de 36 es exacta, 6, así que √72 = <strong>6</strong>√2.</p>' },
      { tipo: 'expresion', simplificar: true, enunciado: '<p>Simplifica (3x<sup>2</sup>)<sup>3</sup>.</p>', respuesta: '27x^6',
        pista: '<p>Eleva el 3 al cubo y multiplica los exponentes de x.</p>',
        solucion: '<p>El cubo afecta al 3 y a la x<sup>2</sup>. 3<sup>3</sup> = 27, y en la potencia de potencia los exponentes se multiplican: 2 · 3 = 6. Resultado: <strong>27x<sup>6</sup></strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuánto es √(9 + 16)?</p>', opciones: ['7', '5', '25', '√7'], correcta: 1,
        pista: '<p>Primero resuelve lo de adentro de la raíz.</p>',
        solucion: '<p>√(9 + 16) = √25 = 5. La respuesta 7 sale de repartir la raíz, que es un error.</p>' },
    ],
    fuentes: [OS('6-2-use-multiplication-properties-of-exponents', 'Use Multiplication Properties of Exponents'), OS('9-8-rational-exponents', 'Rational Exponents'), WIKI('Radicación', 'Radicación')],
  });

  // ------------------------------------------------------------------
  L('Fracciones algebraicas', {
    objetivo: 'Simplificar y operar fracciones con polinomios, y reconocer los valores que no están permitidos.',
    explicacion: `
      <p>Imagina que tú y tus amigos compran una pizza de $300 y la pagan entre todos. Si son x personas, a cada uno le toca ${F(300, 'x')}. Con 3 personas son $100; con 5, $60. Esa división tiene una letra abajo, y eso la vuelve una fracción algebraica.</p>
      <p>Una <strong>fracción algebraica</strong> es una fracción con polinomios arriba, abajo o en los dos lados, como ${F('x + 1', 'x − 3')}. Funciona igual que las fracciones con números que viste en aritmética: se simplifica, se multiplica y se suma con las mismas reglas. La única diferencia es que ahora hay letras.</p>
      <h3>¿Qué valores no puede tomar la letra?</h3>
      <p>No se puede dividir entre cero. Si repartes la pizza entre 0 personas, la pregunta "¿cuánto le toca a cada uno?" no tiene respuesta. Por eso hay que excluir los valores de la letra que hacen cero el denominador, que es la parte de abajo. Se llaman <strong>restricciones</strong> y se escriben con el signo ≠, que significa "distinto de".</p>
      <p>En ${F('x + 1', 'x − 3')}, si x vale 3, abajo queda 3 − 3 = 0. Por eso se escribe x ≠ 3. Cualquier otro valor está permitido.</p>
      <h3>¿Cómo se simplifica?</h3>
      <p>Recuerda cómo simplificas ${F(12, 18)}: escribes 12 = 6 · 2 y 18 = 6 · 3, y tachas el 6 de arriba con el de abajo, porque ${F(6, 6)} = 1. Queda ${F(2, 3)}. Con letras es igual: <strong>factoriza</strong> arriba y abajo, y cancela los <em>factores</em> que se repiten. Aquí te sirve todo lo que aprendiste en la lección de factorización.</p>
      <p class="nota"><strong>Trampa común: solo se cancelan factores, nunca términos sueltos.</strong> En ${F('x + 4', 4)} no puedes tachar los 4, porque el 4 de arriba está sumando, no multiplicando. Pruébalo con x = 4: ${F('4 + 4', 4)} = 2, pero si tacharas los 4 obtendrías 4. Lo correcto es repartir: ${F('x + 4', 4)} = ${F('x', 4)} + 1.</p>
      <h3>¿Cómo se multiplica y se suma?</h3>
      <p>Para <strong>multiplicar</strong> o <strong>dividir</strong>, sigue las mismas reglas que con fracciones de números: arriba por arriba y abajo por abajo. Conviene factorizar primero, porque así ves qué factores se cancelan antes de hacer cuentas largas.</p>
      <p>Para <strong>sumar</strong> o <strong>restar</strong>, necesitas un denominador común, igual que con ${F(1, 2)} + ${F(1, 4)}. Si ya tienen el mismo denominador, sumas los de arriba y dejas el de abajo. Si no, conviertes una de ellas. Por ejemplo, para sumar ${F(1, 'x')} + ${F(1, '3x')}, multiplicas arriba y abajo de la primera por 3, lo que no cambia su valor:</p>
      <p>${F(1, 'x')} + ${F(1, '3x')} = ${F(3, '3x')} + ${F(1, '3x')} = ${F(4, '3x')}</p>`,
    ejemplo: `
      <p>Simplifica ${F('x² − 9', 'x² + 5x + 6')}.</p>
      <ol class="pasos-ej">
        <li>Antes de cancelar nada, factoriza arriba. x² − 9 es una diferencia de cuadrados, porque 9 = 3<sup>2</sup>: queda (x + 3)(x − 3).</li>
        <li>Factoriza abajo. Busca dos números que multiplicados den 6 y sumados den 5: son 2 y 3. Queda (x + 2)(x + 3).</li>
        <li>Ahora el factor (x + 3) aparece arriba y abajo, multiplicando. Se cancela, como el 6 en ${F(12, 18)}. Queda ${F('x − 3', 'x + 2')}.</li>
        <li>Anota las restricciones, que se sacan del denominador original: x + 2 = 0 cuando x = −2, y x + 3 = 0 cuando x = −3. Entonces x ≠ −2 y x ≠ −3.</li>
        <li>Comprueba con x = 0: el original da ${F(-9, 6)} = −1.5 y el resultado da ${F(-3, 2)} = −1.5. Coinciden.</li>
      </ol>
      <p>Resultado: <span class="resultado">${F('x − 3', 'x + 2')}</span>.</p>`,
    vidaReal: `
      <p>Repartir algo entre una cantidad que todavía no conoces es muy común. Estas fracciones te ayudan a calcularlo de una vez:</p>
      <ul>
        <li>Saber cuánto tardan dos llaves abiertas a la vez en llenar un tinaco, si sabes cuánto tarda cada una sola.</li>
        <li>Ver cómo baja el costo de cada pieza cuando un taller fabrica más piezas.</li>
        <li>Calcular cuánto dura un viaje según la distancia y la velocidad a la que vas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: `<p>¿Qué valor de x <strong>no</strong> está permitido en ${F(5, 'x − 4')}?</p>`, respuesta: 4,
        pista: '<p>¿Qué valor hace cero el denominador?</p>',
        solucion: '<p>El denominador x − 4 vale cero cuando <strong>x = 4</strong>, y no se puede dividir entre cero.</p>' },
      { tipo: 'expresion', simplificar: true, enunciado: `<p>Simplifica ${F('x² − 25', 'x + 5')}.</p>`, respuesta: 'x - 5',
        pista: '<p>Factoriza el numerador como diferencia de cuadrados.</p>',
        solucion: `<p>x² − 25 = (x + 5)(x − 5), así que queda ${F('(x + 5)(x − 5)', 'x + 5')}. El factor (x + 5) se cancela y queda <strong>x − 5</strong>, con x ≠ −5.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿A qué es igual ${F('x + 6', 6)}?</p>`, opciones: ['x', 'x + 1', `${F('x', 6)} + 1`, '7x'], correcta: 2,
        pista: '<p>Reparte el denominador: cada término de arriba se divide entre 6.</p>',
        solucion: `<p>${F('x', 6)} + ${F(6, 6)} = ${F('x', 6)} + 1. Tachar los 6 para obtener x es el error más común.</p>` },
      { tipo: 'expresion', simplificar: true, enunciado: `<p>Suma ${F(2, 'x')} + ${F(3, 'x')}. Escribe el resultado como una sola fracción (por ejemplo, 4/x).</p>`, respuesta: '5/x',
        pista: '<p>Mismo denominador: suma los numeradores.</p>',
        solucion: `<p>Las dos tienen el mismo denominador, x, así que sumas los de arriba (2 + 3 = 5) y dejas el de abajo: <strong>${F(5, 'x')}</strong>.</p>` },
      { tipo: 'expresion', simplificar: true, enunciado: `<p>Suma ${F(1, 'x')} + ${F(1, '2x')}. Escribe el resultado como una sola fracción (usa paréntesis en el denominador, por ejemplo 7/(3x)).</p>`, respuesta: '3/(2x)',
        pista: `<p>Convierte ${F(1, 'x')} a ${F(2, '2x')}.</p>`,
        solucion: `<p>Multiplica arriba y abajo de ${F(1, 'x')} por 2 para tener el mismo denominador: ${F(2, '2x')} + ${F(1, '2x')} = <strong>${F(3, '2x')}</strong>.</p>` },
      { tipo: 'numero', enunciado: '<p>Una llave llena un tinaco en 3 horas y otra en 6 horas. Si abres las dos, ¿en cuántas horas se llena?</p>', respuesta: 1 / (1 / 3 + 1 / 6),
        pista: `<p>Por hora llenan ${F(1, 3)} + ${F(1, 6)} del tinaco. ¿Cuántas horas tarda en llenarse uno completo?</p>`,
        solucion: `<p>${F(2, 6)} + ${F(1, 6)} = ${F(3, 6)} = ${F(1, 2)} por hora, así que tardan <strong>2 horas</strong>.</p>` },
    ],
    fuentes: [OS('8-1-simplify-rational-expressions', 'Simplify Rational Expressions'), OS('8-4-add-and-subtract-rational-expressions-with-unlike-denominators', 'Add and Subtract Rational Expressions'), WIKI('Fracción_algebraica', 'Fracción algebraica')],
  });
})();
