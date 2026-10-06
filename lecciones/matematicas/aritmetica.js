// Matemáticas · Unidad 1: Aritmética.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección"). Revisar con: node verificar.js
(function () {
  const F = window.fraccion;
  const L = (titulo, datos) => window.registrarLeccion('matematicas', titulo, datos);

  const OS = (pagina, nombre) => ({ nombre: `OpenStax, Prealgebra 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/prealgebra-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = { nombre: 'Khan Academy en español: Aritmética', url: 'https://es.khanacademy.org/math/arithmetic' };
  const KHAN_PRE = { nombre: 'Khan Academy en español: Preálgebra', url: 'https://es.khanacademy.org/math/pre-algebra' };

  // ------------------------------------------------------------------
  L('Números naturales y valor posicional', {
    objetivo: 'Leer, escribir y comparar números grandes sabiendo cuánto vale cada cifra según el lugar que ocupa.',
    explicacion: `
      <p>Piensa en cómo cuentas a las personas de una fila: 1, 2, 3, 4… Esos números, los que usamos para contar, se llaman <strong>números naturales</strong>. Nunca se acaban, porque siempre puedes sumar uno más. Algunos libros también incluyen el 0 entre ellos.</p>
      <p>Lo curioso es que, para escribir cualquiera de ellos, por grande que sea, solo necesitamos diez símbolos: 0, 1, 2, 3, 4, 5, 6, 7, 8 y 9. A cada uno se le llama <strong>dígito</strong> o cifra. ¿Cómo alcanzan diez símbolos para escribir millones de números? Gracias al lugar que ocupa cada uno.</p>
      <h3>¿Cuánto vale cada cifra?</h3>
      <p>Imagina que pagas con billetes de 100, billetes de 10 y monedas de 1. Si tienes 2 billetes de 100, 2 de 10 y 2 monedas, tienes 222 pesos. Fíjate que el 2 aparece tres veces, pero cada vez vale distinto: el primero vale 200, el segundo 20 y el último 2. A esto se le llama <strong>valor posicional</strong>: lo que vale una cifra depende de la posición en la que está.</p>
      <p>Cada posición tiene un nombre, y cada una vale diez veces más que la que tiene a su derecha. Diez unidades forman una decena, diez decenas forman una centena, diez centenas forman una unidad de millar, y así sigue:</p>
      <div class="tabla-wrap"><table>
      <tr><th>Millones</th><th>Centenas de millar</th><th>Decenas de millar</th><th>Unidades de millar</th><th>Centenas</th><th>Decenas</th><th>Unidades</th></tr>
      <tr><td>3</td><td>4</td><td>8</td><td>2</td><td>1</td><td>0</td><td>5</td></tr>
      </table></div>
      <p>Ese número se escribe <strong>3 482 105</strong> y se lee "tres millones cuatrocientos ochenta y dos mil ciento cinco". Fíjate que separamos las cifras en grupos de tres, contando de derecha a izquierda. Así el ojo encuentra rápido los miles y los millones, sin tener que contar cifra por cifra.</p>
      <h3>El trabajo del cero</h3>
      <p>El <strong>0</strong> parece que no vale nada, pero hace un trabajo enorme: guarda un lugar vacío. En 105 no hay decenas, y el 0 lo avisa. Sin él escribiríamos 15, que es un número muy distinto. Es como un asiento apartado en el cine: aunque esté vacío, evita que los demás se recorran.</p>
      <h3>Descomponer un número</h3>
      <p><strong>Descomponer</strong> un número es escribirlo como la suma de lo que vale cada cifra. Sirve para ver de un vistazo qué hay en cada posición:</p>
      <p>3 482 105 = 3 000 000 + 400 000 + 80 000 + 2 000 + 100 + 5</p>
      <p>Las decenas no aparecen en la suma porque en esa posición hay un 0.</p>
      <h3>¿Cuál es mayor?</h3>
      <p>Para comparar dos números, primero cuenta sus cifras. El que tiene más cifras es mayor, porque llega a una posición más alta: cualquier número de cuatro cifras, como 1 000, es mayor que cualquiera de tres, como 999.</p>
      <p>Si tienen las mismas cifras, compáralos de izquierda a derecha, como cuando buscas una palabra en el diccionario. La primera cifra distinta decide. En 52 718 y 52 690, las dos primeras cifras son iguales, pero en la tercera el 7 es más que el 6, así que 52 718 es mayor.</p>
      <p class="nota"><strong>Trampa común:</strong> en español, <strong>un billón es un millón de millones</strong> (1 000 000 000 000). En inglés, <em>billion</em> significa solo mil millones (1 000 000 000). Muchas noticias traducidas confunden las dos palabras, y la diferencia es de mil veces.</p>`,
    ejemplo: `
      <p>Escribe con cifras: <em>"dos millones cincuenta mil setecientos ocho"</em>.</p>
      <ol class="pasos-ej">
      <li>Empieza por lo más grande. "Dos millones" pone un 2 en la posición de los millones, y después de él quedan seis lugares por llenar: <strong>2</strong> _ _ _ _ _ _.</li>
      <li>Sigue con los miles. "Cincuenta mil" son 0 centenas de millar, 5 decenas de millar y 0 unidades de millar. Por eso ese grupo queda 050: 2 <strong>050</strong> _ _ _.</li>
      <li>Termina con el último grupo. "Setecientos ocho" son 7 centenas, 0 decenas y 8 unidades, o sea 708: 2 050 <strong>708</strong>.</li>
      <li>Comprueba leyéndolo en voz alta por grupos: "dos millones", "cincuenta mil", "setecientos ocho". Coincide con lo que te pidieron.</li>
      </ol>
      <p>Resultado: <span class="resultado">2 050 708</span>. Fíjate en cómo los ceros guardan los lugares vacíos.</p>
      <p class="nota"><strong>Error común:</strong> escribir 250 708, olvidando los ceros. Después de los millones, cada grupo debe tener exactamente tres cifras, aunque algunas sean 0.</p>`,
    vidaReal: `
      <p>Leer bien los números grandes te evita errores caros en situaciones de todos los días:</p>
      <ul>
      <li>Al revisar un contrato, una factura o el precio de una casa, donde confundir 150 000 con 15 000 cambia todo.</li>
      <li>Al leer noticias sobre la población de un país o sobre lo que gasta un gobierno, que hablan de millones.</li>
      <li>Al llenar un cheque o un formulario, donde la cantidad se escribe con número y también con letra.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuánto vale el dígito <strong>7</strong> en el número 4 708 213?</p>', respuesta: 700000,
        pista: '<p>Cuenta las posiciones desde la derecha: unidades, decenas, centenas, unidades de millar…</p>',
        solucion: '<p>El 7 está en las centenas de millar, así que vale <strong>700 000</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Escribe con cifras: <em>"doce mil cuarenta"</em>.</p>', respuesta: 12040,
        pista: '<p>"Doce mil" ocupa los millares; "cuarenta" son 0 centenas, 4 decenas y 0 unidades.</p>',
        solucion: '<p>"Doce mil" pone un 12 en el grupo de los miles. "Cuarenta" llena el último grupo con 0 centenas, 4 decenas y 0 unidades, o sea 040. Juntos forman <strong>12 040</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos números es el mayor?</p>', opciones: ['98 999', '100 001', '99 900', '89 999'], correcta: 1,
        pista: '<p>Primero cuenta cuántas cifras tiene cada uno.</p>',
        solucion: '<p>100 001 tiene seis cifras y los demás solo cinco, así que es el mayor.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Qué número es 5 000 000 + 30 000 + 400 + 9?</p>', respuesta: 5030409,
        pista: '<p>Acomoda cada sumando en su posición y pon 0 donde no haya nada.</p>',
        solucion: '<p>5 millones, 0 centenas de millar, 3 decenas de millar, 0 unidades de millar, 4 centenas, 0 decenas y 9 unidades: <strong>5 030 409</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>En español, "un billón" es…</p>', opciones: ['Mil millones', 'Un millón de millones', 'Cien millones'], correcta: 1,
        pista: '<p>Revisa la nota al final de la explicación.</p>',
        solucion: '<p>En español, un billón = 1 000 000 000 000, es decir, un millón de millones.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas <strong>decenas</strong> hay en total en el número 350?</p>', respuesta: 35,
        pista: '<p>Una decena son 10 unidades. ¿Cuántos grupos de 10 caben en 350?</p>',
        solucion: '<p>Cada decena son 10 unidades, así que cuentas cuántos grupos de 10 caben en 350: 350 ÷ 10 = <strong>35</strong> decenas.</p>' },
    ],
    fuentes: [OS('1-1-introduction-to-whole-numbers', 'Introduction to Whole Numbers'), WIKI('Notación_posicional', 'Notación posicional'), KHAN],
  });

  // ------------------------------------------------------------------
  L('Suma y resta', {
    objetivo: 'Sumar y restar números de varias cifras, comprobar tus resultados y hacer cálculos mentales rápidos.',
    explicacion: `
      <p>Imagina que en tu alcancía tienes 35 pesos y alguien te regala 20 más. Para saber cuánto tienes ahora, juntas las dos cantidades: 35 + 20 = 55. Eso es <strong>sumar</strong>: juntar cantidades. Los números que juntas se llaman <strong>sumandos</strong>, y el resultado se llama <strong>suma</strong> o total.</p>
      <h3>Reglas que siempre se cumplen al sumar</h3>
      <p>Estas reglas te dejan acomodar una suma de la forma que más te convenga:</p>
      <ul>
      <li>El orden no cambia el resultado: 8 + 5 = 5 + 8 = 13. Da igual si primero metes 8 manzanas a la bolsa y luego 5, o al revés. Se llama <strong>propiedad conmutativa</strong>.</li>
      <li>Puedes agrupar como quieras: (7 + 3) + 6 = 7 + (3 + 6) = 16. Los paréntesis solo indican qué juntas primero. Se llama <strong>propiedad asociativa</strong>, y te deja buscar parejas fáciles, como 7 + 3 = 10.</li>
      <li>Sumar 0 no cambia nada: 9 + 0 = 9, porque no agregas nada.</li>
      </ul>
      <h3>Sumar en columna</h3>
      <p>Con números grandes conviene escribirlos uno debajo del otro, alineados por la derecha: unidades con unidades y decenas con decenas. Así sumas cosas del mismo tipo, como cuando juntas monedas de 1 con monedas de 1 y billetes de 10 con billetes de 10. Empiezas por la columna de la derecha y avanzas hacia la izquierda.</p>
      <p>Si una columna da 10 o más, escribes solo las unidades y <strong>llevas</strong> 1 a la columna siguiente. En 47 + 38, las unidades dan 7 + 8 = 15. Esas 15 unidades son 1 decena y 5 unidades, así que escribes 5 y llevas la decena. En las decenas sumas 4 + 3 + 1 = 8, y el total es 85. Llevar es como cambiar diez monedas de 1 por un billete de 10.</p>
      <h3>Restar: quitar o ver cuánto falta</h3>
      <p><strong>Restar</strong> sirve para quitar (tenías 50 y gastas 20), para comparar (cuánto más alto es uno que otro) y para saber cuánto falta (cuánto te falta para llegar a 100). Sus partes tienen nombre: el <strong>minuendo</strong> es el número del que quitas, el <strong>sustraendo</strong> es lo que quitas y la <strong>diferencia</strong> es lo que queda. En 10 − 3 = 7, el minuendo es 10, el sustraendo es 3 y la diferencia es 7. Aquí el orden sí importa: quitar 3 de 10 no es lo mismo que quitar 10 de 3.</p>
      <p>Al restar en columna, a veces la cifra de arriba es menor que la de abajo. Entonces <strong>pides prestado</strong>: tomas 1 de la columna de la izquierda, que en tu columna vale 10. En 52 − 17 no puedes quitar 7 de 2, así que cambias una decena por diez unidades: 12 − 7 = 5. En las decenas quedan 4 − 1 = 3, y el resultado es 35. Es como cambiar un billete de 10 por diez monedas para poder pagar.</p>
      <p class="nota"><strong>Trampa común:</strong> olvidar que la columna que prestó ahora tiene uno menos. Para descubrirlo, comprueba cada resta con una suma: la diferencia más el sustraendo debe dar el minuendo. En el ejemplo, 35 + 17 = 52. Funciona porque sumar devuelve lo que la resta quitó.</p>
      <h3>Un truco para hacer cuentas de cabeza</h3>
      <p>Algunos números están muy cerca de uno redondo. Para 398 + 45, piensa en 400 + 45 = 445. Como agregaste 2 de más al cambiar 398 por 400, ahora los quitas: 445 − 2 = 443. Este truco se llama <strong>redondear y compensar</strong>.</p>`,
    ejemplo: `
      <p>Calcula 4 382 − 1 765.</p>
      <ol class="pasos-ej">
      <li>Escribe 1 765 debajo de 4 382, alineados por la derecha, y empieza por las unidades. No puedes quitar 5 de 2, así que pides prestada una decena: el 2 se vuelve 12 y las decenas bajan de 8 a 7. Ahora 12 − 5 = <strong>7</strong>.</li>
      <li>Decenas: te quedaron 7, y 7 − 6 = <strong>1</strong>.</li>
      <li>Centenas: no puedes quitar 7 de 3. Pides prestado a los millares: el 3 se vuelve 13 y los millares bajan de 4 a 3. Ahora 13 − 7 = <strong>6</strong>.</li>
      <li>Millares: 3 − 1 = <strong>2</strong>.</li>
      <li>Comprueba sumando: 2 617 + 1 765 = 4 382. Da el número de arriba, así que la resta está bien.</li>
      </ol>
      <p>Resultado: <span class="resultado">2 617</span>.</p>
      <p class="nota"><strong>Error común:</strong> restar en cada columna la cifra menor de la mayor, sin pedir prestado (por ejemplo, 5 − 2 = 3 en las unidades). Así sale 3 423, que no pasa la comprobación.</p>`,
    vidaReal: `
      <p>Sumas y restas todos los días, muchas veces sin darte cuenta:</p>
      <ul>
      <li>En una tienda, para revisar que te den bien el cambio cuando pagas con un billete grande.</li>
      <li>Con tu dinero, para llevar la cuenta de lo que entra, lo que sale y lo que te queda al final del mes.</li>
      <li>Con tus metas, para saber cuánto falta: kilómetros de un viaje, dinero para una compra o días para una fecha importante.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Calcula 2 457 + 3 896.</p>', respuesta: 2457 + 3896,
        pista: '<p>Empieza por las unidades: 7 + 6 = 13. Escribe 3 y lleva 1.</p>',
        solucion: '<p>Unidades 13 (llevo 1), decenas 5 + 9 + 1 = 15 (llevo 1), centenas 4 + 8 + 1 = 13 (llevo 1), millares 2 + 3 + 1 = 6. Resultado: <strong>6 353</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula 5 000 − 1 237.</p>', respuesta: 5000 - 1237,
        pista: '<p>Con tantos ceros, piensa: 5 000 = 4 999 + 1. Resta primero 4 999 − 1 237 y luego suma 1.</p>',
        solucion: '<p>4 999 − 1 237 = 3 762, y 3 762 + 1 = <strong>3 763</strong>. Comprobación: 3 763 + 1 237 = 5 000 ✓</p>' },
      { tipo: 'numero', enunciado: '<p>Pagas una compra de $347 con un billete de $500. ¿Cuánto cambio te deben dar?</p>', respuesta: 500 - 347,
        pista: '<p>Cuenta hacia arriba: de 347 a 350, de 350 a 400 y de 400 a 500.</p>',
        solucion: '<p>Desde 347 faltan 3 para llegar a 350, luego 50 para llegar a 400 y luego 100 para llegar a 500. En total te deben 3 + 50 + 100 = <strong>$153</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es una forma rápida y correcta de calcular 198 + 57 de cabeza?</p>',
        opciones: ['200 + 57 − 2', '200 + 57 + 2', '198 + 60 + 3', '190 + 50 + 8'], correcta: 0,
        pista: '<p>Si redondeas 198 a 200, agregaste 2 de más. ¿Qué debes hacer con ellos?</p>',
        solucion: '<p>200 + 57 = 257 y le quitas los 2 que agregaste: 255.</p>' },
      { tipo: 'numero', enunciado: '<p>Empiezas el mes con $8 450. Pagas $2 300 de renta y $1 875 de comida, y te pagan $600 por un trabajo extra. ¿Cuánto tienes al final?</p>', respuesta: 8450 - 2300 - 1875 + 600,
        pista: '<p>Resta los gastos uno por uno y al final suma lo que entró.</p>',
        solucion: '<p>8 450 − 2 300 = 6 150; 6 150 − 1 875 = 4 275; 4 275 + 600 = <strong>$4 875</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Llevas ahorrados $1 250 y quieres juntar $4 000. ¿Cuánto te falta?</p>', respuesta: 4000 - 1250,
        pista: '<p>"Cuánto falta" se resuelve con una resta: meta − lo que tienes.</p>',
        solucion: '<p>4 000 − 1 250 = <strong>$2 750</strong>.</p>' },
    ],
    fuentes: [OS('1-2-add-whole-numbers', 'Add Whole Numbers'), OS('1-3-subtract-whole-numbers', 'Subtract Whole Numbers'), KHAN],
  });

  // ------------------------------------------------------------------
  L('Multiplicación y división', {
    objetivo: 'Multiplicar y dividir números enteros, interpretar el residuo y decidir qué operación usar en un problema.',
    explicacion: `
      <p>Imagina que compras 4 paquetes de jugos y cada paquete trae 3. Para saber cuántos jugos tienes, podrías sumar 3 + 3 + 3 + 3 = 12. Pero es más rápido decir "4 veces 3": 4 × 3 = 12. Eso es <strong>multiplicar</strong>: sumar el mismo número varias veces. Los números que se multiplican se llaman <strong>factores</strong>, y el resultado se llama <strong>producto</strong>.</p>
      <h3>Reglas que ahorran trabajo</h3>
      <ul>
      <li>El orden no cambia el resultado: 6 × 7 = 7 × 6 = 42. Seis filas de siete sillas son las mismas sillas que siete filas de seis. Igual que en la suma, se llama <strong>propiedad conmutativa</strong>.</li>
      <li>Puedes partir un número en pedazos fáciles. Para 9 × 14, parte el 14 en 10 + 4: 9 × 10 = 90 y 9 × 4 = 36, y juntos dan 126. Funciona porque 9 paquetes de 14 son lo mismo que 9 paquetes de 10 más 9 paquetes de 4. Se llama <strong>propiedad distributiva</strong>.</li>
      <li>Multiplicar por 1 deja el número igual, porque una vez 9 es 9. Multiplicar por 0 siempre da 0, porque cero paquetes no traen nada.</li>
      <li>Para multiplicar por 10, 100 o 1 000, agrega uno, dos o tres ceros: 45 × 100 = 4 500. Cada cero recorre las cifras una posición a la izquierda, donde valen diez veces más.</li>
      </ul>
      <h3>Dividir: repartir en partes iguales</h3>
      <p>Ahora imagina que tienes 17 galletas y quieres repartirlas entre 5 amigos, todos con la misma cantidad. A cada uno le tocan 3 (porque 5 × 3 = 15) y sobran 2, que ya no alcanzan para dar otra vuelta. Eso es <strong>dividir</strong>: repartir en partes iguales, o averiguar cuántas veces cabe un número en otro. En 17 ÷ 5, cada parte tiene nombre:</p>
      <ul>
      <li>El <strong>dividendo</strong> es lo que repartes: 17. El <strong>divisor</strong> es entre cuántos repartes: 5.</li>
      <li>El <strong>cociente</strong> es cuánto le toca a cada uno: 3. El <strong>residuo</strong> es lo que sobra: 2. Siempre es menor que el divisor; si no, alcanzaría para repartir otra vez.</li>
      </ul>
      <p>Dividir deshace la multiplicación. Por eso, para calcular 56 ÷ 8 puedes preguntarte "¿qué número por 8 da 56?". La respuesta es 7.</p>
      <p class="nota">Siempre se cumple: <strong>dividendo = divisor × cociente + residuo</strong>. Dicho con palabras: lo que repartiste más lo que sobró es todo lo que tenías. Con las galletas, 5 × 3 + 2 = 17. Úsalo para comprobar cualquier división.</p>
      <h3>¿Qué hago con el residuo?</h3>
      <p>Depende de la pregunta. Si 17 personas viajan en coches de 5 lugares, 3 coches no bastan: las 2 personas que sobran también necesitan lugar, así que hacen falta 4 coches. En cambio, si tienes $17 y cada cuaderno cuesta $5, solo te alcanza para 3. Antes de contestar, piensa qué significa lo que sobró.</p>
      <h3>¿Por qué no se puede dividir entre 0?</h3>
      <p>Dividir 8 entre 0 sería buscar un número que, multiplicado por 0, dé 8. Pero cualquier número por 0 da 0, nunca 8. Como esa respuesta no existe, la división entre 0 no se puede hacer.</p>`,
    ejemplo: `
      <p>Calcula 1 274 ÷ 7 con división larga, que reparte el número poco a poco, de izquierda a derecha.</p>
      <ol class="pasos-ej">
      <li>El 7 no cabe en 1, así que toma las dos primeras cifras: 12. El 7 cabe <strong>1</strong> vez en 12 (7 × 1 = 7) y sobran 12 − 7 = 5.</li>
      <li>Baja la siguiente cifra, el 7, y ponla junto al 5 que sobró: tienes 57. El 7 cabe <strong>8</strong> veces (7 × 8 = 56) y sobra 1.</li>
      <li>Baja el 4 junto al 1: tienes 14. El 7 cabe <strong>2</strong> veces (7 × 2 = 14) y no sobra nada.</li>
      <li>Las cifras que fuiste anotando, en orden, forman el cociente: 182, con residuo 0.</li>
      <li>Comprueba con la regla del recuadro: 7 × 182 + 0 = 1 274. Da el dividendo, así que la división está bien.</li>
      </ol>
      <p>Resultado: <span class="resultado">182</span>, sin residuo.</p>
      <p class="nota"><strong>Error común:</strong> olvidar anotar un 0 en el cociente cuando el divisor no cabe en el número que formaste al bajar una cifra. El resultado sale diez veces más chico y la comprobación no coincide.</p>`,
    vidaReal: `
      <p>Multiplicas y divides cada vez que algo se repite o se reparte:</p>
      <ul>
      <li>Para saber cuánto pagas por varias cosas iguales, como 6 refrescos de $18 cada uno.</li>
      <li>Para dividir la cuenta del restaurante entre tus amigos, de modo que todos paguen lo mismo.</li>
      <li>Para saber cuántas cajas, viajes o autobuses necesitas. Aquí importa lo que sobra: si queda gente sin lugar, hace falta un autobús más.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Calcula 36 × 25.</p>', respuesta: 36 * 25,
        pista: '<p>Truco: 25 es la cuarta parte de 100. También puedes hacer 36 × 20 + 36 × 5.</p>',
        solucion: '<p>36 × 20 = 720 y 36 × 5 = 180. 720 + 180 = <strong>900</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula 2 856 ÷ 8.</p>', respuesta: 2856 / 8,
        pista: '<p>8 no cabe en 2; empieza con 28.</p>',
        solucion: '<p>28 ÷ 8 = 3, sobran 4. Bajas el 5: 45 ÷ 8 = 5, sobran 5. Bajas el 6: 56 ÷ 8 = 7. Resultado: <strong>357</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Al dividir 100 entre 7, ¿cuál es el <strong>residuo</strong>?</p>', respuesta: 2,
        pista: '<p>Busca el múltiplo de 7 más grande que no pase de 100.</p>',
        solucion: '<p>7 × 14 = 98 y 100 − 98 = <strong>2</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una cena cuesta $1 380 y la pagan 4 personas en partes iguales. ¿Cuánto paga cada una?</p>', respuesta: 1380 / 4,
        pista: '<p>Divide el total entre el número de personas.</p>',
        solucion: '<p>1 380 ÷ 4 = <strong>$345</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas formas de calcular 7 × 12 usa la propiedad distributiva correctamente?</p>',
        opciones: ['7 × 10 + 7 × 2', '7 × 10 + 2', '7 + 12 × 10', '7 × 10 × 2'], correcta: 0,
        pista: '<p>12 = 10 + 2, y el 7 debe multiplicar a <em>ambas</em> partes.</p>',
        solucion: '<p>7 × 12 = 7 × (10 + 2) = 7 × 10 + 7 × 2 = 70 + 14 = 84.</p>' },
      { tipo: 'numero', enunciado: '<p>Van 53 personas de excursión y cada camioneta lleva 12. ¿Cuántas camionetas necesitan como mínimo?</p>', respuesta: 5,
        pista: '<p>Divide y piensa qué hacer con las personas que sobran.</p>',
        solucion: '<p>53 ÷ 12 = 4 con residuo 5. Cuatro camionetas llevan 48 personas y quedan 5 sin lugar, así que necesitan <strong>5</strong>.</p>' },
    ],
    fuentes: [OS('1-4-multiply-whole-numbers', 'Multiply Whole Numbers'), OS('1-5-divide-whole-numbers', 'Divide Whole Numbers'), WIKI('División_(matemática)', 'División')],
  });

  // ------------------------------------------------------------------
  L('Jerarquía de operaciones', {
    objetivo: 'Resolver expresiones con varias operaciones en el orden correcto, para que siempre obtengas el mismo resultado que una calculadora.',
    explicacion: `
      <p>Pregúntale a dos amigos cuánto es 2 + 3 × 4. Uno suma primero: 2 + 3 = 5, y 5 × 4 = 20. El otro multiplica primero: 3 × 4 = 12, y 2 + 12 = 14. Los dos hicieron bien las cuentas, pero llegaron a resultados distintos. En matemáticas eso no puede pasar: una misma cuenta debe tener un solo resultado.</p>
      <p>Por eso existe un orden que todo el mundo acordó seguir, igual que todos acordamos de qué lado de la calle se maneja. Se llama <strong>jerarquía de operaciones</strong>. La palabra jerarquía quiere decir "quién va primero".</p>
      <h3>¿En qué orden se resuelve?</h3>
      <ol>
      <li><strong>Paréntesis</strong> (y corchetes): lo que está adentro se resuelve primero. Los paréntesis son la forma de decir "esto va antes que todo".</li>
      <li><strong>Potencias y raíces</strong>. Las verás en otra lección; por ahora basta saber que 3² quiere decir 3 × 3.</li>
      <li><strong>Multiplicaciones y divisiones</strong>, de izquierda a derecha.</li>
      <li><strong>Sumas y restas</strong>, de izquierda a derecha.</li>
      </ol>
      <p>Con este orden, en 2 + 3 × 4 se multiplica primero: 2 + 12 = <strong>14</strong>. Ese es el resultado correcto, y es el que da cualquier calculadora científica.</p>
      <h3>¿Por qué la multiplicación va antes que la suma?</h3>
      <p>Recuerda que multiplicar es una suma repetida que se agrupa en un solo paquete: 3 × 4 quiere decir "tres veces 4", que es 12. Piensa en una compra: un dulce de 2 pesos y 3 cuadernos de 4 pesos. Para saber cuánto pagas, primero calculas lo que cuestan los cuadernos (3 × 4 = 12) y después le sumas el dulce. Nadie suma 2 + 3 antes de multiplicar por el precio de los cuadernos.</p>
      <h3>¿Y si dos operaciones están en el mismo nivel?</h3>
      <p>La multiplicación y la división están en el mismo escalón. Ninguna va antes que la otra: se resuelven en el orden en que aparecen, de izquierda a derecha, como cuando lees un libro. Lo mismo pasa con la suma y la resta.</p>
      <p>Por ejemplo, en 12 ÷ 3 × 2 primero divides, porque la división aparece primero: 12 ÷ 3 = 4, y luego 4 × 2 = 8. En 10 − 4 + 3 primero restas: 10 − 4 = 6, y luego 6 + 3 = 9.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que la multiplicación siempre va antes que la división, o la suma antes que la resta. Si en 12 ÷ 3 × 2 multiplicas primero, haces 12 ÷ 6 = 2, que está mal; el resultado correcto es 8. Del mismo modo, en 10 − 4 + 3, sumar primero daría 10 − 7 = 3 en lugar de 9.</p>
      <h3>Usa paréntesis para cambiar el orden</h3>
      <p>Si quieres que la suma vaya primero, enciérrala en paréntesis: (2 + 3) × 4 = 5 × 4 = 20. Dentro de un paréntesis también se respeta el orden. En (20 − 2 × 6), primero haces 2 × 6 = 12 y después 20 − 12 = 8.</p>
      <p>Los paréntesis también sirven para que una cuenta sea más fácil de leer, aunque no cambien el resultado. Escribir 2 + (3 × 4) da lo mismo que 2 + 3 × 4, pero deja más claro qué se hace primero. Cuando tengas duda, ponlos: nunca estorban.</p>`,
    ejemplo: `
      <p>Resuelve 20 − 3 × (2 + 4) ÷ 9.</p>
      <ol class="pasos-ej">
      <li>Busca primero los paréntesis. Adentro hay 2 + 4 = 6, así que la cuenta queda 20 − 3 × 6 ÷ 9.</li>
      <li>No hay potencias, así que sigue con multiplicaciones y divisiones, de izquierda a derecha. La primera que aparece es 3 × 6 = 18, y queda 20 − 18 ÷ 9.</li>
      <li>Ahora la división: 18 ÷ 9 = 2. Queda 20 − 2.</li>
      <li>Por último, la resta: 20 − 2 = 18.</li>
      <li>Comprueba escribiendo la cuenta completa, tal como está, en una calculadora científica o en una hoja de cálculo. También da 18.</li>
      </ol>
      <p>Resultado: <span class="resultado">18</span>.</p>
      <p class="nota"><strong>Error común:</strong> ir de izquierda a derecha sin fijarse en el orden: 20 − 3 = 17, luego 17 × 6 = 102, y 102 ÷ 9 ni siquiera da exacto. Cuando algo así pasa, es señal de que te saltaste la jerarquía.</p>`,
    vidaReal: `
      <p>El orden de las operaciones no es solo cosa de la escuela: lo siguen las máquinas y las cuentas de todos los días.</p>
      <ul>
      <li>Las calculadoras, las hojas de cálculo y los programas de computadora lo usan siempre. Si escribes una cuenta sin pensar en ese orden, te darán un resultado distinto al que esperabas.</li>
      <li>Al pagar 3 camisas de $150 y 2 pantalones de $300, cada producto se multiplica por su precio antes de juntar todo.</li>
      <li>En redes sociales circulan acertijos de cuentas que confunden a mucha gente.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Calcula 8 + 2 × 5.</p>', respuesta: 8 + 2 * 5,
        pista: '<p>La multiplicación va antes que la suma.</p>',
        solucion: '<p>2 × 5 = 10; 8 + 10 = <strong>18</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula (8 + 2) × 5.</p>', respuesta: (8 + 2) * 5,
        pista: '<p>Los paréntesis van primero.</p>',
        solucion: '<p>8 + 2 = 10; 10 × 5 = <strong>50</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula 48 ÷ 6 × 2.</p>', respuesta: 48 / 6 * 2,
        pista: '<p>División y multiplicación tienen el mismo nivel: ve de izquierda a derecha.</p>',
        solucion: '<p>48 ÷ 6 = 8; 8 × 2 = <strong>16</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula 30 − 12 ÷ 4 + 1.</p>', respuesta: 30 - 12 / 4 + 1,
        pista: '<p>Primero la división; luego resta y suma de izquierda a derecha.</p>',
        solucion: '<p>12 ÷ 4 = 3; 30 − 3 = 27; 27 + 1 = <strong>28</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Compras 4 cuadernos de $35 y una mochila de $280. ¿Qué expresión da el total?</p>',
        opciones: ['4 × (35 + 280)', '4 × 35 + 280', '(4 + 35) × 280', '4 + 35 × 280'], correcta: 1,
        pista: '<p>Solo los cuadernos se multiplican por 4; la mochila es una sola.</p>',
        solucion: '<p>4 × 35 + 280 = 140 + 280 = $420. La multiplicación se hace primero sin necesidad de paréntesis.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula 2 × (15 − 3 × 4) + 6.</p>', respuesta: 2 * (15 - 3 * 4) + 6,
        pista: '<p>Dentro del paréntesis también se respeta la jerarquía: primero 3 × 4.</p>',
        solucion: '<p>3 × 4 = 12; 15 − 12 = 3; 2 × 3 = 6; 6 + 6 = <strong>12</strong>.</p>' },
    ],
    fuentes: [OS('2-2-evaluate-simplify-and-translate-expressions', 'Evaluate, Simplify, and Translate Expressions'), KHAN],
  });

  // ------------------------------------------------------------------
  L('Divisibilidad, números primos, MCD y mcm', {
    objetivo: 'Reconocer múltiplos, divisores y números primos, y calcular el máximo común divisor (MCD) y el mínimo común múltiplo (mcm).',
    explicacion: `
      <p>Imagina que tienes 12 galletas y quieres acomodarlas en filas iguales, sin que sobre ninguna. Puedes hacer 1 fila de 12, 2 de 6, 3 de 4, 4 de 3, 6 de 2 o 12 de 1. Con 5 filas no se puede, porque sobrarían 2. Los números que reparten el 12 sin que sobre nada (1, 2, 3, 4, 6 y 12) se llaman <strong>divisores</strong> de 12.</p>
      <p>Los <strong>múltiplos</strong> de un número son los que obtienes al multiplicarlo por 1, 2, 3, 4… Son su tabla de multiplicar: los múltiplos de 4 son 4, 8, 12, 16, 20… Fíjate que 12 es múltiplo de 4 y, a la vez, 4 es divisor de 12. Es la misma relación vista desde los dos lados.</p>
      <h3>¿Se puede dividir sin que sobre nada?</h3>
      <p>Hay atajos para saberlo sin hacer la división. Se llaman <strong>criterios de divisibilidad</strong>:</p>
      <ul>
      <li><strong>Entre 2:</strong> si termina en cifra par (0, 2, 4, 6 u 8).</li>
      <li><strong>Entre 3:</strong> si la suma de sus cifras es múltiplo de 3. En 471, 4 + 7 + 1 = 12, que es múltiplo de 3, así que 471 sí se divide entre 3.</li>
      <li><strong>Entre 5:</strong> si termina en 0 o en 5.</li>
      <li><strong>Entre 9:</strong> si la suma de sus cifras es múltiplo de 9.</li>
      <li><strong>Entre 10:</strong> si termina en 0.</li>
      </ul>
      <p>Los criterios del 2, del 5 y del 10 solo miran la última cifra por una razón: las decenas, centenas y demás posiciones ya son múltiplos de 10, y por eso también de 2 y de 5. Solo las unidades pueden dejar algo sobrando.</p>
      <h3>Números primos: los que no se pueden partir</h3>
      <p>Algunos números, como el 7, solo se pueden acomodar en una fila larga: sus únicos divisores son el 1 y él mismo. A esos se les llama <strong>números primos</strong>. Los primeros son 2, 3, 5, 7, 11, 13, 17 y 19, y la lista sigue sin fin. El 1 no es primo, porque tiene un solo divisor. El 2 es el único primo par, ya que todos los demás pares se dividen entre 2.</p>
      <p>Los primos son como los ladrillos de los números: todo número mayor que 1 se puede escribir como una multiplicación de primos. A eso se le llama <strong>factorización prima</strong>. Para encontrarla, divide entre el primo más pequeño que puedas, una y otra vez. Con 60: 60 ÷ 2 = 30, 30 ÷ 2 = 15, 15 ÷ 3 = 5, y 5 ya es primo. Entonces 60 = 2 × 2 × 3 × 5.</p>
      <h3>MCD: el divisor más grande que comparten</h3>
      <p>El <strong>máximo común divisor</strong> (MCD) de dos números es el número más grande que divide a los dos. Con sus factorizaciones se encuentra fácil: multiplica los primos que tienen <em>en común</em>. Como 12 = 2 × 2 × 3 y 18 = 2 × 3 × 3, los dos comparten un 2 y un 3. Por eso MCD = 2 × 3 = 6. Sirve para repartir cosas en grupos iguales lo más grandes posible.</p>
      <h3>mcm: el múltiplo más chico que comparten</h3>
      <p>El <strong>mínimo común múltiplo</strong> (mcm) es el múltiplo más pequeño que tienen en común. Multiplica <em>todos</em> los primos que aparecen, cada uno las veces que más se repite en alguno de los dos. El 12 tiene dos veces el 2 y el 18 tiene dos veces el 3, así que mcm = 2 × 2 × 3 × 3 = 36. Sirve para saber cuándo coinciden dos cosas que se repiten.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir los dos. El MCD nunca es mayor que el número más chico, y el mcm nunca es menor que el número más grande. Si te sale al revés, revisa.</p>`,
    ejemplo: `
      <p>Tienes 24 galletas de chocolate y 36 de vainilla. Quieres armar el mayor número posible de bolsas iguales, sin que sobre ninguna galleta. ¿Cuántas bolsas armas?</p>
      <ol class="pasos-ej">
      <li>Decide qué buscas. La cantidad de bolsas debe dividir a 24 y a 36 sin que sobre nada, y debe ser la más grande posible. Eso es el MCD.</li>
      <li>Factoriza cada número dividiendo entre primos: 24 = 2 × 2 × 2 × 3 y 36 = 2 × 2 × 3 × 3.</li>
      <li>Toma lo que tienen en común: dos veces el 2 y una vez el 3. Entonces MCD = 2 × 2 × 3 = 12.</li>
      <li>Comprueba repartiendo: 24 ÷ 12 = 2 galletas de chocolate por bolsa y 36 ÷ 12 = 3 de vainilla. No sobra ninguna.</li>
      </ol>
      <p>Resultado: <span class="resultado">12 bolsas</span>, cada una con 2 galletas de chocolate y 3 de vainilla.</p>
      <p class="nota"><strong>Error común:</strong> usar el mcm, que es 72. No alcanzan las galletas para 72 bolsas: aquí buscabas un número que divida a los dos, no uno que sea múltiplo de los dos.</p>`,
    vidaReal: `
      <p>Saber qué números se dividen entre cuáles te ayuda a repartir y a organizar:</p>
      <ul>
      <li>Para cortar telas, tablas o terrenos en pedazos iguales lo más grandes posible, sin que sobre nada.</li>
      <li>Para saber cuándo vuelven a coincidir dos cosas que se repiten, como dos autobuses que pasan cada 12 y cada 18 minutos.</li>
      <li>Para sumar fracciones, algo que verás pronto.</li>
      <li>Para proteger tus compras en internet, que usan números enormes muy difíciles de partir.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos números es primo?</p>', opciones: ['21', '27', '29', '33'], correcta: 2,
        pista: '<p>Usa el criterio del 3: tres de ellos son múltiplos de 3. Al que quede, pruébale el 2, el 3, el 5 y el 7.</p>',
        solucion: '<p>21 = 3 × 7, 27 = 3 × 9 y 33 = 3 × 11, así que ninguno es primo. El 29 no es par, no termina en 0 ni en 5, sus cifras suman 11 (no es múltiplo de 3) y 7 × 4 = 28 se queda corto. Solo se divide entre 1 y 29: es primo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Es 1 236 divisible entre 3?</p>',
        opciones: ['Sí, porque sus cifras suman 12', 'No, porque termina en 6', 'Sí, porque es par', 'No se puede saber sin dividir'], correcta: 0,
        pista: '<p>Usa el criterio del 3: suma las cifras.</p>',
        solucion: '<p>1 + 2 + 3 + 6 = 12, que es múltiplo de 3. Por eso 1 236 sí es divisible entre 3 (1 236 ÷ 3 = 412).</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula el MCD de 18 y 30.</p>', respuesta: 6,
        pista: '<p>18 = 2 × 3 × 3 y 30 = 2 × 3 × 5. ¿Qué tienen en común?</p>',
        solucion: '<p>En común tienen un 2 y un 3: MCD = 2 × 3 = <strong>6</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula el mcm de 4 y 6.</p>', respuesta: 12,
        pista: '<p>Escribe los múltiplos de cada uno: 4, 8, 12… y 6, 12… ¿Cuál es el primero que se repite?</p>',
        solucion: '<p>El primer múltiplo común es <strong>12</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una luz parpadea cada 8 segundos y otra cada 12. Acaban de parpadear juntas. ¿En cuántos segundos volverán a coincidir?</p>', respuesta: 24,
        pista: '<p>Buscas el primer momento que es múltiplo de 8 y de 12 a la vez.</p>',
        solucion: '<p>Múltiplos de 8: 8, 16, 24… Múltiplos de 12: 12, 24… Coinciden a los <strong>24</strong> segundos (el mcm).</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es el factor primo más grande de 84?</p>', respuesta: 7,
        pista: '<p>Divide 84 entre 2 tantas veces como puedas, luego entre 3, y así.</p>',
        solucion: '<p>84 = 2 × 2 × 3 × 7. El primo más grande es <strong>7</strong>.</p>' },
    ],
    fuentes: [OS('2-4-find-multiples-and-factors', 'Find Multiples and Factors'), OS('2-5-prime-factorization-and-the-least-common-multiple', 'Prime Factorization and the Least Common Multiple'), WIKI('Número_primo', 'Número primo'), WIKI('Máximo_común_divisor', 'Máximo común divisor')],
  });

  // ------------------------------------------------------------------
  L('Números enteros: los negativos', {
    objetivo: 'Entender qué son los números negativos y sumar, restar, multiplicar y dividir con ellos sin equivocarte de signo.',
    explicacion: `
      <p>Piensa en un termómetro en un día de invierno. Cuando hace mucho frío, la temperatura baja de 0 y marca, por ejemplo, 3 grados bajo cero. Para escribirlo usamos un signo menos: −3 °C. Ese es un <strong>número negativo</strong>: un número que está por debajo del cero.</p>
      <p>Los negativos aparecen siempre que hay un punto de partida y se puede ir hacia los dos lados: grados bajo cero, deudas, pisos de sótano. Los números naturales, sus opuestos negativos y el cero forman juntos los <strong>números enteros</strong>: … −3, −2, −1, 0, 1, 2, 3 …</p>
      <h3>La recta numérica</h3>
      <p>Imagina el termómetro acostado. El cero queda en medio, los positivos a la derecha y los negativos a la izquierda. A esa línea se le llama <strong>recta numérica</strong>, y en ella los números siempre crecen hacia la derecha.</p>
      <p>Por eso −10 es <em>menor</em> que −3: está más a la izquierda. Tiene sentido, porque a −10 °C hace más frío que a −3 °C. Entre dos negativos, el que sin el signo parece más grande es en realidad el menor.</p>
      <p>La distancia de un número al cero, sin importar hacia qué lado, se llama <strong>valor absoluto</strong>. Se escribe entre dos barras: |−5| = 5 y |5| = 5, porque los dos están a 5 pasos del cero.</p>
      <h3>Sumar enteros</h3>
      <p>Piensa en dinero: los positivos son lo que tienes y los negativos, lo que debes.</p>
      <ul>
      <li><strong>Si tienen el mismo signo</strong>, suma sus valores absolutos y conserva el signo. Si debes 4 y luego debes 6 más, debes 10: −4 + (−6) = −10.</li>
      <li><strong>Si tienen signos distintos</strong>, resta el valor absoluto menor al mayor, y usa el signo del que tiene mayor valor absoluto. Si debes 9 y pagas 4, sigues debiendo 5: −9 + 4 = −5. Gana el signo del 9 porque la deuda era más grande que el pago.</li>
      </ul>
      <h3>Restar enteros</h3>
      <p>Restar un número es lo mismo que sumar su opuesto, que es el número a la misma distancia del cero pero del otro lado. Si a y b son dos números cualesquiera, a − b = a + (−b). Así, 5 − 7 se puede pensar como 5 + (−7) = −2.</p>
      <p>De aquí sale una regla que sorprende: <strong>restar un negativo es sumar</strong>. 3 − (−4) = 3 + 4 = 7. Imagínalo así: si alguien te quita una deuda de 4 pesos, quedas 4 pesos mejor que antes.</p>
      <h3>Multiplicar y dividir enteros</h3>
      <p>Primero multiplica o divide sin fijarte en los signos. Después decide el signo con esta tabla:</p>
      <div class="tabla-wrap"><table>
      <tr><th>Signos</th><th>Resultado</th><th>Ejemplo</th></tr>
      <tr><td>iguales (+ y +, − y −)</td><td>positivo</td><td>(−3) × (−5) = 15</td></tr>
      <tr><td>distintos (+ y −)</td><td>negativo</td><td>(−12) ÷ 4 = −3</td></tr>
      </table></div>
      <p>¿Por qué? Juntar tres deudas de 5 es deber 15: 3 × (−5) = −15. ¿Y dos negativos? Mira el patrón. 3 × (−5) = −15, 2 × (−5) = −10, 1 × (−5) = −5 y 0 × (−5) = 0. Cada vez que el primer número baja uno, el resultado sube 5. Si el patrón sigue, el siguiente es (−1) × (−5) = 5, y después (−2) × (−5) = 10. Por eso dos signos menos dan positivo.</p>
      <p class="nota"><strong>Trampa común:</strong> usar la tabla al sumar. La tabla es solo para multiplicar y dividir: −4 + (−6) es −10, no 10.</p>`,
    ejemplo: `
      <p>A las 6 de la mañana la temperatura era de −4 °C. Al mediodía subió 9 grados y en la noche bajó 7. ¿Qué temperatura hizo en la noche?</p>
      <ol class="pasos-ej">
      <li>Subir 9 grados es sumar 9: −4 + 9. Los signos son distintos, así que restas los valores absolutos: 9 − 4 = 5. Gana el signo del 9, que es positivo, porque subió más de lo que estaba bajo cero. Al mediodía hacía 5 °C.</li>
      <li>Bajar 7 grados es restar 7: 5 − 7, que es lo mismo que 5 + (−7). Otra vez hay signos distintos: 7 − 5 = 2, y gana el signo del 7, que es negativo. En la noche hacía −2 °C.</li>
      <li>Comprueba en la recta numérica: desde −4 avanzas 9 pasos a la derecha y llegas a 5. Desde ahí retrocedes 7 y llegas a −2.</li>
      </ol>
      <p>Resultado: <span class="resultado">−2 °C</span>.</p>
      <p class="nota"><strong>Error común:</strong> responder 2 °C. Si la temperatura bajó más grados (7) de los que había sobre cero (5), tiene que quedar bajo cero.</p>`,
    vidaReal: `
      <p>Los números que están por debajo de cero aparecen más de lo que crees:</p>
      <ul>
      <li>En el pronóstico del clima, cuando la temperatura baja de cero grados en invierno.</li>
      <li>En tu cuenta del banco cuando gastas más de lo que tienes, o en un negocio que pierde dinero en lugar de ganarlo.</li>
      <li>En lugares bajo el nivel del mar, en los pisos de un estacionamiento subterráneo y en los años antes de nuestra era.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Calcula −7 + 12.</p>', respuesta: -7 + 12,
        pista: '<p>Signos distintos: resta 12 − 7 y usa el signo del 12.</p>',
        solucion: '<p>12 − 7 = 5, positivo: <strong>5</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula −5 − 8.</p>', respuesta: -5 - 8,
        pista: '<p>Es lo mismo que −5 + (−8): los dos son negativos.</p>',
        solucion: '<p>Mismo signo: 5 + 8 = 13, negativo: <strong>−13</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula 6 − (−9).</p>', respuesta: 6 - (-9),
        pista: '<p>Restar un negativo es sumar.</p>',
        solucion: '<p>6 − (−9) = 6 + 9 = <strong>15</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula (−4) × 6.</p>', respuesta: -4 * 6,
        pista: '<p>Signos distintos dan resultado negativo.</p>',
        solucion: '<p>4 × 6 = 24, negativo: <strong>−24</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos números es el <strong>menor</strong>?</p>', opciones: ['−3', '0', '−10', '2'], correcta: 2,
        pista: '<p>Imagina la recta numérica: el menor es el que está más a la izquierda.</p>',
        solucion: '<p>−10 está más a la izquierda que todos los demás, así que es el menor.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu cuenta tiene un saldo de −$350 (debes dinero). Depositas $500 y luego pagas $230. ¿Cuál es tu saldo final?</p>', respuesta: -350 + 500 - 230,
        pista: '<p>Calcula −350 + 500 y al resultado réstale 230.</p>',
        solucion: '<p>−350 + 500 = 150; 150 − 230 = <strong>−80</strong>. Sigues debiendo $80.</p>' },
    ],
    fuentes: [OS('3-1-introduction-to-integers', 'Introduction to Integers'), WIKI('Número_entero', 'Número entero'), KHAN_PRE],
  });

  // ------------------------------------------------------------------
  L('Fracciones: qué son y cómo compararlas', {
    objetivo: 'Entender qué representa una fracción, encontrar fracciones equivalentes, simplificarlas y decidir cuál es mayor.',
    explicacion: `
      <p>Imagina una pizza cortada en 4 rebanadas iguales. Si te comes 3, te comiste "3 de 4 rebanadas". Eso se escribe ${F(3, 4)} y se lee "tres cuartos". Es una <strong>fracción</strong>: una forma de decir qué parte de algo tomas cuando ese algo está cortado en partes <em>iguales</em>.</p>
      <p>Cada número de la fracción cuenta algo distinto:</p>
      <ul>
      <li>El número de abajo dice <strong>en cuántas partes iguales se cortó</strong> el todo. Se llama <strong>denominador</strong>. En la pizza, es 4.</li>
      <li>El número de arriba dice <strong>cuántas de esas partes tomas</strong>. Se llama <strong>numerador</strong>. En la pizza, es 3.</li>
      </ul>
      <h3>Una fracción también es una división</h3>
      <p>La raya de en medio significa "dividido entre". Por eso ${F(3, 4)} = 3 ÷ 4 = 0.75, un número con punto decimal que verás con detalle en otra lección. Piénsalo así: si repartes 3 pizzas entre 4 personas, a cada una le tocan tres cuartos de pizza.</p>
      <h3>Fracciones mayores que un entero</h3>
      <p>Si el numerador es mayor que el denominador, como en ${F(7, 4)}, tomas más rebanadas de las que tiene una pizza: necesitas una pizza completa y un poco de otra. Para ver cuántas pizzas completas hay, divide: 7 ÷ 4 = 1 y sobran 3. Entonces ${F(7, 4)} = 1 ${F(3, 4)}, que se lee "uno y tres cuartos". Esta forma se llama <strong>número mixto</strong>: un número entero junto con una fracción.</p>
      <h3>Fracciones que valen lo mismo</h3>
      <p>Media pizza es media pizza, la cortes en 2 o en 8. Si la cortas en 2, tomas 1 rebanada: ${F(1, 2)}. Si la cortas en 4, tomas 2: ${F(2, 4)}. Si la cortas en 8, tomas 4: ${F(4, 8)}. Comes lo mismo en los tres casos, así que ${F(1, 2)} = ${F(2, 4)} = ${F(4, 8)}. A estas se les llama <strong>fracciones equivalentes</strong>.</p>
      <p>Fíjate en el patrón: si multiplicas el numerador y el denominador por el mismo número, la fracción vale lo mismo. Cortar cada rebanada en 2 duplica las rebanadas que tienes y también las que tiene la pizza, así que tu porción no cambia.</p>
      <h3>Simplificar</h3>
      <p><strong>Simplificar</strong> es hacer lo contrario: dividir arriba y abajo entre el mismo número, para escribir la fracción con números más chicos. Lo más rápido es dividir entre el MCD, el divisor más grande que comparten. Con ${F(18, 24)}, el MCD de 18 y 24 es 6: 18 ÷ 6 = 3 y 24 ÷ 6 = 4, así que ${F(18, 24)} = ${F(3, 4)}.</p>
      <h3>¿Cuál es mayor?</h3>
      <p>Si las dos fracciones tienen el mismo denominador, las rebanadas son del mismo tamaño, así que gana la que tiene más: ${F(5, 8)} &gt; ${F(3, 8)}. El signo &gt; se lee "es mayor que".</p>
      <p>Si los denominadores son distintos, las rebanadas miden distinto y no se pueden comparar así nada más. Primero conviértelas en fracciones equivalentes con el mismo denominador, que puede ser el mcm de los dos. Luego compara los numeradores.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que ${F(1, 8)} es mayor que ${F(1, 4)} porque 8 es mayor que 4. Es al revés: entre más partes cortas, más chica es cada una.</p>`,
    ejemplo: `
      <p>¿Qué es mayor, ${F(3, 5)} o ${F(5, 8)}?</p>
      <ol class="pasos-ej">
      <li>Los denominadores son distintos, así que las partes no miden lo mismo. Busca un denominador común: un múltiplo de 5 y de 8. El más chico es 40, su mcm.</li>
      <li>Para pasar de 5 a 40 multiplicas por 8. Haz lo mismo arriba: ${F(3, 5)} = ${F(24, 40)}.</li>
      <li>Para pasar de 8 a 40 multiplicas por 5, también arriba: ${F(5, 8)} = ${F(25, 40)}.</li>
      <li>Ahora las dos están en cuarentavos, partes del mismo tamaño. Compara los numeradores: 25 &gt; 24.</li>
      <li>Comprueba dividiendo: 3 ÷ 5 = 0.6 y 5 ÷ 8 = 0.625. El segundo es mayor, como esperabas.</li>
      </ol>
      <p>Resultado: <span class="resultado">${F(5, 8)} es mayor</span>, aunque por muy poco.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar solo el denominador. Si cambias el número de abajo, el de arriba debe multiplicarse por lo mismo; si no, la fracción cambia de valor.</p>`,
    vidaReal: `
      <p>Las partes de un todo aparecen en la cocina, en el reloj y en la ferretería:</p>
      <ul>
      <li>En las recetas, cuando piden media taza de leche o tres cuartos de cucharadita de sal.</li>
      <li>Con el tiempo: media hora son 30 minutos.</li>
      <li>Con herramientas medidas en pulgadas, donde hay que saber qué llave es más chica.</li>
      <li>En ofertas como "un tercio de descuento", o al repartir un terreno o una herencia en partes.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: `<p>Simplifica ${F(12, 18)} lo más posible. ¿Cuál es el <strong>numerador</strong> de la fracción simplificada?</p>`, respuesta: 2,
        pista: '<p>El MCD de 12 y 18 es 6. Divide arriba y abajo entre 6.</p>',
        solucion: `<p>12 ÷ 6 = 2 y 18 ÷ 6 = 3, así que ${F(12, 18)} = ${F(2, 3)}. El numerador es <strong>2</strong>.</p>` },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas fracciones es la <strong>mayor</strong>?</p>', opciones: [F(3, 5), F(7, 12), F(2, 3), F(1, 2)], correcta: 2,
        pista: '<p>Conviértelas todas a denominador 60, o compara sus valores decimales.</p>',
        solucion: `<p>Con denominador 60: ${F(36, 60)}, ${F(35, 60)}, ${F(40, 60)} y ${F(30, 60)}. La mayor es ${F(2, 3)}.</p>` },
      { tipo: 'numero', enunciado: `<p>¿Cuántos minutos son ${F(3, 4)} de hora?</p>`, respuesta: 45,
        pista: '<p>Divide los 60 minutos en 4 partes iguales y toma 3.</p>',
        solucion: '<p>60 ÷ 4 = 15 y 15 × 3 = <strong>45</strong> minutos.</p>' },
      { tipo: 'numero', enunciado: `<p>Escribe ${F(15, 4)} como número mixto. ¿Cuál es la parte <strong>entera</strong>?</p>`, respuesta: 3,
        pista: '<p>¿Cuántas veces cabe 4 en 15?</p>',
        solucion: `<p>15 ÷ 4 = 3 y sobran 3. ${F(15, 4)} = 3 ${F(3, 4)}. La parte entera es <strong>3</strong>.</p>` },
      { tipo: 'numero', enunciado: `<p>¿Qué número va en el lugar del signo de interrogación? ${F(3, 7)} = ${F('?', 28)}</p>`, respuesta: 12,
        pista: '<p>¿Por cuánto multiplicaste el 7 para llegar a 28? Haz lo mismo con el 3.</p>',
        solucion: '<p>7 × 4 = 28, así que 3 × 4 = <strong>12</strong>.</p>' },
      { tipo: 'opciones', enunciado: `<p>Tú te comes ${F(2, 8)} de una pizza y tu amigo ${F(1, 4)} de otra pizza del mismo tamaño. ¿Quién comió más?</p>`,
        opciones: ['Tú', 'Tu amigo', 'Los dos comieron lo mismo'], correcta: 2,
        pista: `<p>Simplifica ${F(2, 8)}.</p>`,
        solucion: `<p>${F(2, 8)} = ${F(1, 4)}: comieron exactamente lo mismo.</p>` },
    ],
    fuentes: [OS('4-1-visualize-fractions', 'Visualize Fractions'), WIKI('Fracción', 'Fracción'), KHAN],
  });

  // ------------------------------------------------------------------
  L('Operaciones con fracciones', {
    objetivo: 'Sumar, restar, multiplicar y dividir fracciones, y usarlas para resolver problemas cotidianos.',
    explicacion: `
      <p>Imagina una pizza cortada en 7 rebanadas iguales. Tú te comes 2 y tu hermano 3. Entre los dos se comieron 5 rebanadas de 7, o sea, ${F(5, 7)}. Fíjate que las rebanadas siguen siendo séptimos: cambió cuántas tomaron, no su tamaño.</p>
      <h3>Sumar y restar con el mismo denominador</h3>
      <p>Por eso, cuando las fracciones tienen el mismo denominador, sumas o restas los numeradores y dejas el denominador igual: ${F(2, 7)} + ${F(3, 7)} = ${F(5, 7)}. Para restar es igual: ${F(5, 7)} − ${F(2, 7)} = ${F(3, 7)}.</p>
      <p class="nota"><strong>Trampa común:</strong> sumar también los denominadores. Media pizza más media pizza es una pizza entera: ${F(1, 2)} + ${F(1, 2)} = ${F(2, 2)} = 1. Si sumaras los de abajo saldría ${F(2, 4)}, que otra vez es media pizza. El denominador dice el tamaño de las rebanadas, y ese tamaño no cambia al juntarlas.</p>
      <h3>Sumar y restar con distinto denominador</h3>
      <p>Si tienes medios y cuartos, las rebanadas no miden lo mismo y no puedes contarlas juntas, igual que no puedes sumar pesos con dólares sin convertirlos. Primero convierte las dos fracciones a un mismo denominador, usando fracciones equivalentes. Conviene usar el mcm de los denominadores, porque es el número más chico que sirve. Luego suma o resta los numeradores como antes.</p>
      <p>Por ejemplo, para ${F(1, 2)} + ${F(1, 4)}, el mcm de 2 y 4 es 4. Como ${F(1, 2)} = ${F(2, 4)}, la suma es ${F(2, 4)} + ${F(1, 4)} = ${F(3, 4)}.</p>
      <h3>Multiplicar</h3>
      <p>Para multiplicar fracciones, multiplica numerador por numerador y denominador por denominador: ${F(2, 3)} × ${F(4, 5)} = ${F(8, 15)}. Aquí no hace falta un denominador común. Si el resultado se puede simplificar, simplifícalo.</p>
      <p>¿Por qué funciona? Multiplicar por una fracción es tomar una parte de algo. ${F(1, 2)} × ${F(1, 3)} es la mitad de un tercio. Si cortas un tercio de pizza a la mitad, cada pedazo es ${F(1, 6)} de la pizza, y eso es justo lo que da la regla: 1 × 1 = 1 arriba y 2 × 3 = 6 abajo.</p>
      <p>Por eso la palabra <strong>"de"</strong> significa multiplicar: ${F(2, 3)} de 30 = ${F(2, 3)} × 30 = 20. Para hacerlo de cabeza, divide 30 en 3 partes (10 cada una) y toma 2 de ellas.</p>
      <h3>Dividir</h3>
      <p>Dividir es preguntar cuántas veces cabe una cosa en otra. ¿Cuántas rebanadas de ${F(1, 4)} caben en media pizza? Como ${F(1, 2)} = ${F(2, 4)}, caben 2.</p>
      <p>Hay un atajo que siempre funciona: dividir entre una fracción es multiplicar por su <strong>recíproco</strong>, que es la misma fracción volteada. El recíproco de ${F(1, 4)} es ${F(4, 1)}, o sea, 4. Tiene sentido: en cada pizza entera caben 4 cuartos, así que dividir entre ${F(1, 4)} es multiplicar por 4. Entonces ${F(1, 2)} ÷ ${F(1, 4)} = ${F(1, 2)} × ${F(4, 1)} = ${F(4, 2)} = 2, igual que antes.</p>
      <h3>Números mixtos</h3>
      <p>Antes de operar con un número mixto, conviértelo en fracción. En 2 ${F(1, 3)} hay 2 enteros, y cada entero tiene 3 tercios: son 2 × 3 = 6 tercios. Con el tercio que ya tenías, son 7. Entonces 2 ${F(1, 3)} = ${F(7, 3)}.</p>`,
    ejemplo: `
      <p>Calcula ${F(2, 3)} + ${F(1, 4)}.</p>
      <ol class="pasos-ej">
      <li>Los denominadores son distintos, así que primero busca uno común. El mcm de 3 y 4 es 12.</li>
      <li>Convierte cada fracción. Para pasar de 3 a 12 multiplicas por 4, también arriba: ${F(2, 3)} = ${F(8, 12)}. Para pasar de 4 a 12 multiplicas por 3: ${F(1, 4)} = ${F(3, 12)}.</li>
      <li>Ahora las partes miden lo mismo. Suma los numeradores y deja el denominador: ${F(8, 12)} + ${F(3, 12)} = ${F(11, 12)}.</li>
      <li>Comprueba que tenga sentido: a ${F(2, 3)} le falta ${F(1, 3)} para el entero, y agregaste ${F(1, 4)}, que es menos. El resultado debe quedar un poco abajo de 1, y así es.</li>
      </ol>
      <p>Resultado: <span class="resultado">${F(11, 12)}</span>.</p>
      <p>Otro: ¿cuántos vasos de ${F(1, 8)} de litro llenas con ${F(3, 4)} de litro? Multiplica por el recíproco: ${F(3, 4)} × 8 = ${F(24, 4)} = <span class="resultado">6 vasos</span>.</p>
      <p class="nota"><strong>Error común:</strong> responder ${F(3, 7)}, sumando arriba con arriba y abajo con abajo.</p>`,
    vidaReal: `
      <p>Juntar, quitar o repartir partes de algo es muy común:</p>
      <ul>
      <li>En la cocina, al hacer el doble o la mitad de una receta, o al ajustarla para más personas.</li>
      <li>En carpintería y costura, al juntar o restar medidas en pulgadas que llevan pedazos de pulgada.</li>
      <li>Con tu dinero, para saber cuánto son dos tercios de tu sueldo o para repartir algo en porciones iguales.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: `<p>Calcula ${F(1, 2)} + ${F(1, 3)}. Escribe el resultado como fracción (por ejemplo, 4/9).</p>`, respuesta: 5 / 6,
        pista: '<p>El denominador común de 2 y 3 es 6.</p>',
        solucion: `<p>Pasa las dos a sextos: ${F(1, 2)} = ${F(3, 6)} y ${F(1, 3)} = ${F(2, 6)}. Ahora suma los numeradores: ${F(3, 6)} + ${F(2, 6)} = <strong>${F(5, 6)}</strong>.</p>` },
      { tipo: 'numero', enunciado: `<p>Calcula ${F(5, 6)} − ${F(1, 4)}. Escribe el resultado como fracción.</p>`, respuesta: 7 / 12,
        pista: '<p>El mcm de 6 y 4 es 12.</p>',
        solucion: `<p>Pasa las dos a doceavos: ${F(5, 6)} = ${F(10, 12)} y ${F(1, 4)} = ${F(3, 12)}. Luego resta los numeradores: ${F(10, 12)} − ${F(3, 12)} = <strong>${F(7, 12)}</strong>.</p>` },
      { tipo: 'numero', enunciado: `<p>Calcula ${F(2, 3)} × ${F(9, 10)}. Escribe el resultado como fracción.</p>`, respuesta: 3 / 5,
        pista: '<p>Multiplica arriba con arriba y abajo con abajo, y simplifica.</p>',
        solucion: `<p>Arriba 2 × 9 = 18 y abajo 3 × 10 = 30, así que da ${F(18, 30)}. Al dividir arriba y abajo entre 6, su MCD, queda <strong>${F(3, 5)}</strong>.</p>` },
      { tipo: 'numero', enunciado: `<p>¿Cuánto es ${F(3, 4)} de 200?</p>`, respuesta: 150,
        pista: '<p>"De" significa multiplicar. Primero divide 200 entre 4.</p>',
        solucion: '<p>200 ÷ 4 = 50 y 50 × 3 = <strong>150</strong>.</p>' },
      { tipo: 'numero', enunciado: `<p>Calcula ${F(2, 5)} ÷ ${F(4, 15)}. Escribe el resultado como fracción o número mixto.</p>`, respuesta: 3 / 2,
        pista: `<p>Multiplica por el recíproco: ${F(2, 5)} × ${F(15, 4)}.</p>`,
        solucion: `<p>${F(2, 5)} × ${F(15, 4)} = ${F(30, 20)} = <strong>${F(3, 2)}</strong> = 1 ${F(1, 2)}.</p>` },
      { tipo: 'numero', enunciado: `<p>Una receta para 4 personas pide ${F(3, 4)} de taza de azúcar. ¿Cuántas tazas necesitas para 6 personas?</p>`, respuesta: 9 / 8,
        pista: `<p>Pasar de 4 a 6 personas es multiplicar por ${F(6, 4)}.</p>`,
        solucion: `<p>${F(3, 4)} × ${F(6, 4)} = ${F(18, 16)} = <strong>${F(9, 8)}</strong>, es decir, 1 ${F(1, 8)} tazas.</p>` },
    ],
    fuentes: [OS('4-2-multiply-and-divide-fractions', 'Multiply and Divide Fractions'), OS('4-5-add-and-subtract-fractions-with-different-denominators', 'Add and Subtract Fractions with Different Denominators'), KHAN],
  });

  // ------------------------------------------------------------------
  L('Números decimales', {
    objetivo: 'Leer, comparar, redondear y operar con números decimales, y convertir fracciones a decimales.',
    explicacion: `
      <p>Mira el precio de algo en la tienda: $12.50. Son 12 pesos y medio, porque 50 centavos son la mitad de un peso. Los números con punto, como 12.50, se llaman <strong>números decimales</strong> y sirven para escribir partes de un entero.</p>
      <h3>Las posiciones después del punto</h3>
      <p>Funcionan igual que el valor posicional de los números naturales. Antes del punto, cada posición vale diez veces más que la de su derecha. Después del punto el patrón sigue hacia abajo: cada posición vale diez veces menos que la de su izquierda.</p>
      <ul>
      <li>La primera cifra después del punto son los <strong>décimos</strong>: el entero partido en 10.</li>
      <li>La segunda son los <strong>centésimos</strong>: el entero partido en 100. Un centavo es un centésimo de peso.</li>
      <li>La tercera son los <strong>milésimos</strong>: el entero partido en 1 000.</li>
      </ul>
      <div class="tabla-wrap"><table>
      <tr><th>Unidades</th><th>.</th><th>Décimos</th><th>Centésimos</th><th>Milésimos</th></tr>
      <tr><td>2</td><td>.</td><td>3</td><td>7</td><td>5</td></tr>
      </table></div>
      <p>Ese número, 2.375, se lee "dos enteros, trescientos setenta y cinco milésimos". Como cada posición es una fracción, un decimal se puede escribir como fracción: 0.25 son 25 centésimos, o sea ${F(25, 100)}, que simplificado es ${F(1, 4)}. Un cuarto de peso son 25 centavos.</p>
      <p class="nota">En muchos países se usa coma decimal (2,375) y en otros, punto (2.375). Este sitio acepta ambos en tus respuestas.</p>
      <h3>¿Cuál es mayor?</h3>
      <p>Compara cifra por cifra, de izquierda a derecha, empezando por los enteros. Si te confunde que tengan distinta cantidad de decimales, agrega ceros al final: no cambian el valor, igual que $0.5 y $0.50 son los mismos 50 centavos. Así, 0.5 = 0.50, que es mayor que 0.45.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que 0.45 es mayor que 0.5 porque 45 es mayor que 5. Lo que cuenta es la posición: 5 décimos son más que 4 décimos.</p>
      <h3>Sumar y restar</h3>
      <p>Escribe los números uno debajo del otro con los <strong>puntos alineados</strong>, para sumar décimos con décimos y centésimos con centésimos. Después opera como con números naturales y pon el punto del resultado en la misma columna. Si a uno le faltan cifras, rellénalo con ceros: 5 − 1.25 se hace como 5.00 − 1.25 = 3.75.</p>
      <h3>Multiplicar</h3>
      <p>Multiplica como si no hubiera punto. Luego cuenta cuántas cifras decimales tienen los dos números juntos y deja esa cantidad en el resultado. Con 1.2 × 0.3, primero haces 12 × 3 = 36. Hay un decimal en 1.2 y otro en 0.3, dos en total, así que el resultado es 0.36. ¿Por qué? Porque 1.2 son 12 décimos y 0.3 son 3 décimos, y décimos por décimos dan centésimos, igual que ${F(1, 10)} × ${F(1, 10)} = ${F(1, 100)}.</p>
      <h3>De fracción a decimal</h3>
      <p>Una fracción es una división, así que divide el numerador entre el denominador: ${F(3, 4)} = 3 ÷ 4 = 0.75.</p>
      <h3>Redondear</h3>
      <p>A veces no necesitas tantos decimales; con dinero, por ejemplo, bastan dos. <strong>Redondear</strong> es quedarte con menos cifras y acercarte lo más posible al número original. Mira la cifra que sigue a la última que conservas: si es 5 o más, súbele uno; si es menor que 5, déjala igual. Así, 3.62 redondeado a un decimal es 3.6, porque la cifra que sigue, 2, es menor que 5. En cambio, 3.67 queda en 3.7, porque está más cerca de 3.7 que de 3.6.</p>`,
    ejemplo: `
      <p>Compras 2.75 kg de manzanas a $38.40 el kilo. ¿Cuánto pagas?</p>
      <ol class="pasos-ej">
      <li>Pagas el precio de un kilo tantas veces como kilos compras: 38.40 × 2.75. Para hacerlo más fácil, parte los 2.75 kg en 2 kg y 0.75 kg.</li>
      <li>Los 2 kg cuestan 38.40 × 2 = 76.80.</li>
      <li>0.75 son tres cuartos. Un cuarto de 38.40 es 38.40 ÷ 4 = 9.60, así que tres cuartos son 9.60 × 3 = 28.80.</li>
      <li>Junta las dos partes con los puntos alineados: 76.80 + 28.80 = 105.60.</li>
      <li>Comprueba con una estimación: unos 3 kg a unos $40 serían $120. Compraste un poco menos de eso, así que $105.60 es razonable.</li>
      </ol>
      <p>Resultado: <span class="resultado">$105.60</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner mal el punto y responder $1 056 o $10.56. La estimación rápida te avisa del error.</p>`,
    vidaReal: `
      <p>Los números con punto aparecen cada vez que un número entero no alcanza para decir la cantidad exacta:</p>
      <ul>
      <li>En el dinero, porque los centavos son partes de un peso, un dólar o un sol.</li>
      <li>Al pesar fruta, cargar gasolina por litros o leer un termómetro que marca 37.5 grados.</li>
      <li>En calificaciones, estaturas y cualquier otra medición que necesita ser precisa.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Calcula 12.5 + 3.75.</p>', respuesta: 12.5 + 3.75,
        pista: '<p>Alinea los puntos: 12.50 + 3.75.</p>',
        solucion: '<p>12.50 + 3.75 = <strong>16.25</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula 10 − 2.36.</p>', respuesta: 7.64,
        pista: '<p>Escribe 10 como 10.00 y resta en columna.</p>',
        solucion: '<p>10.00 − 2.36 = <strong>7.64</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula 4.2 × 0.3.</p>', respuesta: 1.26,
        pista: '<p>42 × 3 = 126. ¿Cuántos decimales hay en total en los factores?</p>',
        solucion: '<p>42 × 3 = 126 y hay dos decimales en total: <strong>1.26</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es el número <strong>mayor</strong>?</p>', opciones: ['0.7', '0.68', '0.705', '0.69'], correcta: 2,
        pista: '<p>Escríbelos todos con tres decimales: 0.700, 0.680…</p>',
        solucion: '<p>0.700, 0.680, 0.705 y 0.690. El mayor es 0.705.</p>' },
      { tipo: 'numero', enunciado: `<p>Escribe ${F(3, 8)} como número decimal.</p>`, respuesta: 0.375,
        pista: '<p>Divide 3 entre 8.</p>',
        solucion: '<p>Una fracción es una división del numerador entre el denominador: 3 ÷ 8 = <strong>0.375</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Redondea 7.468 a <strong>un</strong> decimal.</p>', respuesta: 7.5,
        pista: '<p>Mira la cifra de los centésimos (la segunda después del punto).</p>',
        solucion: '<p>La cifra siguiente es 6, que es 5 o más, así que el 4 sube a 5: <strong>7.5</strong>.</p>' },
    ],
    fuentes: [OS('5-1-decimals', 'Decimals'), WIKI('Número_decimal', 'Número decimal'), KHAN],
  });

  // ------------------------------------------------------------------
  L('Porcentajes', {
    objetivo: 'Calcular porcentajes, descuentos y aumentos, y saber qué porcentaje representa una cantidad de otra.',
    explicacion: `
      <p>Imagina una barra de chocolate dividida en 100 cuadritos iguales. Si te comes 25 cuadritos, te comiste "25 de cada 100". Eso es justo lo que significa <strong>25 por ciento</strong>, que se escribe <strong>25%</strong>. La palabra "ciento" quiere decir cien, así que "por ciento" significa "de cada cien".</p>
      <p>Un <strong>porcentaje</strong> sirve para decir qué parte de algo estás tomando, usando siempre el 100 como referencia. Así es fácil comparar: 50% siempre es la mitad, sin importar si hablamos de un chocolate, de un sueldo o de un salón de clases.</p>
      <h3>Tres formas de escribir lo mismo</h3>
      <p>Como 25% son 25 partes de 100, también lo puedes escribir como fracción o como número decimal. Las tres formas valen exactamente lo mismo:</p>
      <p>25% = ${F(25, 100)} = 0.25 = ${F(1, 4)}</p>
      <p>Fíjate en la última: 25 cuadritos de 100 son la cuarta parte del chocolate. Pensar así ayuda mucho a hacer cuentas de cabeza. Para pasar un porcentaje a decimal, divide entre 100: 25% es 0.25, 8% es 0.08 y 100% es 1, es decir, el total completo.</p>
      <h3>Sacar el porcentaje de una cantidad</h3>
      <p>Supón que quieres saber cuánto es el 15% de 300. Primero convierte el porcentaje a decimal dividiendo entre 100: 15% = 0.15. Después multiplica: 0.15 × 300 = 45. Esto funciona porque "15% de 300" quiere decir "toma 15 de cada 100 partes de 300".</p>
      <p>Muchas veces no necesitas calculadora. Estos atajos salen de la misma idea:</p>
      <ul>
        <li><strong>10%</strong> es dividir entre 10. Por eso basta con recorrer el punto decimal un lugar a la izquierda: el 10% de 340 es 34.</li>
        <li><strong>5%</strong> es la mitad del 10%. Si el 10% de 340 es 34, el 5% es 17.</li>
        <li><strong>50%</strong> es la mitad, <strong>25%</strong> es la cuarta parte y <strong>1%</strong> es dividir entre 100.</li>
      </ul>
      <p>Juntándolos sacas casi cualquier porcentaje. Por ejemplo, 15% = 10% + 5%, y 20% es dos veces 10%.</p>
      <h3>¿Qué porcentaje es?</h3>
      <p>A veces la pregunta es al revés: sabes cuánto tienes y cuánto hay en total, y quieres saber qué porcentaje es. Divide la parte entre el total; eso te dice qué pedazo del total tienes. Luego multiplica por 100 para decirlo "de cada cien". Si en un examen acertaste 18 de 24 preguntas: 18 ÷ 24 = 0.75, y 0.75 × 100 = 75%. Acertaste tres de cada cuatro.</p>
      <h3>Descuentos y aumentos</h3>
      <p>Un descuento del 30% quiere decir que te quitan 30 de cada 100 pesos. No pagas el 30%: pagas lo que queda, que es el 70%. Por eso puedes multiplicar directo por 0.70.</p>
      <p>Con un aumento pasa lo contrario. Si algo sube 16%, pagas el precio completo (el 100%) más ese 16%. En total pagas el 116%, así que multiplicas por 1.16.</p>
      <p class="nota"><strong>Trampa común:</strong> subir 10% y después bajar 10% <em>no</em> te regresa al precio de antes. Si algo cuesta 200 y sube 10%, queda en 220. Al bajar, el 10% se calcula sobre 220, que es 22, así que queda en 198. Cada porcentaje se calcula sobre la cantidad que hay en ese momento.</p>`,
    ejemplo: `
      <p>Unos tenis cuestan $1 200 y tienen 30% de descuento. ¿Cuánto pagas?</p>
      <ol class="pasos-ej">
        <li>Primero calcula cuánto te descuentan. El 10% de 1 200 es 120, porque recorres el punto un lugar. Como 30% son tres veces 10%, el descuento es 3 × 120 = 360 pesos.</li>
        <li>Ahora réstalo del precio original para saber cuánto pagas: 1 200 − 360 = 840.</li>
        <li>Comprueba con la forma directa. Si te quitan el 30%, pagas el 70% restante: 1 200 × 0.70 = 840. Las dos formas dan lo mismo, así que el resultado es confiable.</li>
      </ol>
      <p>Resultado: <span class="resultado">$840</span>.</p>
      <p class="nota"><strong>Error común:</strong> contestar $360. Ese es el dinero que te ahorras, no lo que pagas. Antes de responder, vuelve a leer con calma qué te preguntan.</p>`,
    vidaReal: `
      <p>Los porcentajes aparecen casi cada vez que hay dinero de por medio:</p>
      <ul>
        <li>En las tiendas, para saber cuánto pagarás de verdad en una oferta, o cuánto dejar de propina en un restaurante.</li>
        <li>En tu trabajo, para entender un aumento de sueldo o cuánto te descuentan de impuestos.</li>
        <li>En el banco, para comparar cuánto cobra de más un préstamo o una tarjeta de crédito.</li>
        <li>En las noticias, para entender frases como "los precios subieron 5%" o "la venta aumentó 200%".</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Calcula el 15% de 240.</p>', respuesta: 36,
        pista: '<p>Parte el 15% en 10% + 5%. Empieza por el 10% de 240.</p>',
        solucion: '<p>El 10% de 240 es 24, y el 5% es la mitad de eso, 12. Juntos dan 24 + 12 = <strong>36</strong>. También puedes hacer 0.15 × 240 = 36.</p>' },
      { tipo: 'numero', enunciado: '<p>En un examen contestaste bien 18 de 24 preguntas. ¿Qué porcentaje es?</p>', respuesta: 75,
        pista: '<p>Divide la parte (las preguntas correctas) entre el total.</p>',
        solucion: '<p>18 ÷ 24 = 0.75, es decir, acertaste tres cuartas partes. Multiplicado por 100 da <strong>75%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una chamarra de $850 tiene 20% de descuento. ¿Cuánto pagas?</p>', respuesta: 680,
        pista: '<p>Si te descuentan el 20%, ¿qué porcentaje del precio sí pagas?</p>',
        solucion: '<p>Si te quitan el 20%, pagas el 80% restante: 850 × 0.80 = <strong>$680</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Ganas $12 000 al mes y te dan un aumento del 5%. ¿Cuál es tu nuevo sueldo?</p>', respuesta: 12600,
        pista: '<p>Calcula el 5% (la mitad del 10%) y no olvides sumarlo a tu sueldo.</p>',
        solucion: '<p>El 10% de 12 000 es 1 200, así que el 5% es 600. Ese es el aumento, y tu nuevo sueldo es 12 000 + 600 = <strong>$12 600</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un producto de $100 sube 10% y luego baja 10%. ¿Cuánto cuesta al final?</p>', opciones: ['$100', '$99', '$101', '$90'], correcta: 1,
        pista: '<p>Calcula paso a paso: primero el aumento y después el descuento sobre el nuevo precio.</p>',
        solucion: '<p>Al subir 10%, el precio queda en 110. El descuento se calcula sobre 110, no sobre 100: el 10% de 110 es 11, y 110 − 11 = <strong>$99</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>La cuenta del restaurante es de $456 y quieres dejar 10% de propina. ¿Cuánto dejas?</p>', respuesta: 45.6,
        pista: '<p>Sacar el 10% es dividir entre 10.</p>',
        solucion: '<p>Dividir entre 10 equivale a recorrer el punto decimal un lugar a la izquierda: 456 se vuelve <strong>$45.60</strong>.</p>' },
    ],
    fuentes: [OS('6-1-understand-percent', 'Understand Percent'), WIKI('Porcentaje', 'Porcentaje'), KHAN],
  });

  // ------------------------------------------------------------------
  L('Razones y proporciones', {
    objetivo: 'Comparar cantidades con razones, usar precios unitarios para elegir la mejor compra y resolver proporciones.',
    explicacion: `
      <p>Imagina que preparas agua de limón: por cada 2 vasos de jugo pones 3 vasos de agua. Si quieres hacer más, puedes poner 4 de jugo y 6 de agua, y sabrá igual. Lo que importa no son las cantidades exactas, sino la relación entre ellas: "2 de jugo por cada 3 de agua".</p>
      <p>A esa comparación se le llama <strong>razón</strong>. Una razón compara dos cantidades dividiéndolas, y se escribe con dos puntos, 2 : 3, o como fracción, ${F(2, 3)}. Se lee "2 a 3".</p>
      <h3>Simplificar una razón</h3>
      <p>Si en un grupo hay 10 mujeres y 15 hombres, la razón de mujeres a hombres es 10 : 15. Igual que una fracción, se simplifica dividiendo los dos números entre el mismo, de preferencia su MCD. El MCD de 10 y 15 es 5, así que la razón queda 2 : 3. Quiere decir "por cada 2 mujeres hay 3 hombres": el grupo se podría acomodar en 5 equipos, cada uno con 2 mujeres y 3 hombres.</p>
      <p class="nota"><strong>Trampa común:</strong> cambiar el orden. La razón de mujeres a hombres (2 : 3) no es lo mismo que la de hombres a mujeres (3 : 2). El primer número corresponde a lo que nombras primero.</p>
      <h3>Tasas: comparar cosas distintas</h3>
      <p>A veces comparas cantidades de distinto tipo: kilómetros con horas, pesos con kilos, kilómetros con litros de gasolina. A esa razón se le llama <strong>tasa</strong>, y casi siempre se dice con la palabra "por": 80 kilómetros por hora, 25 pesos por kilo.</p>
      <p>Una tasa muy útil es el <strong>precio unitario</strong>, lo que cuesta una sola unidad. Se calcula dividiendo el precio entre la cantidad. Si 4 kilos de naranja cuestan $60, el precio unitario es 60 ÷ 4 = $15 por kilo. Sirve para comparar paquetes de distinto tamaño, porque el paquete grande no siempre es el más barato.</p>
      <h3>Proporciones: dos razones iguales</h3>
      <p>Volvamos al agua de limón. Las mezclas 2 : 3 y 4 : 6 saben igual porque son razones equivalentes: ${F(2, 3)} = ${F(4, 6)}. Una igualdad entre dos razones se llama <strong>proporción</strong>.</p>
      <p>Las proporciones tienen una propiedad muy útil: sus <strong>productos cruzados</strong> son iguales. Multiplica el numerador de cada una por el denominador de la otra, en forma de cruz: 2 × 6 = 12 y 3 × 4 = 12. Siempre coinciden cuando las dos razones son iguales, y nunca cuando son distintas. Así puedes revisar si dos razones forman una proporción sin simplificarlas.</p>
      <h3>Encontrar el dato que falta</h3>
      <p>Los productos cruzados también sirven para encontrar un número desconocido. Supón que ${F(3, 5)} = ${F(9, 'x')}, donde x es el número que no conoces. Los productos cruzados deben ser iguales: 3 × x = 5 × 9 = 45. ¿Qué número por 3 da 45? Lo encuentras dividiendo: x = 45 ÷ 3 = 15. Para comprobar, simplifica ${F(9, 15)} dividiendo entre 3: queda ${F(3, 5)}.</p>`,
    ejemplo: `
      <p>Un café de 500 g cuesta $42 y uno de 750 g cuesta $60. ¿Cuál conviene más?</p>
      <ol class="pasos-ej">
      <li>Los paquetes son de distinto tamaño, así que comparar $42 con $60 no dice nada. Calcula cuánto cuesta un gramo de cada uno, es decir, su precio unitario.</li>
      <li>Paquete chico: 42 ÷ 500 = $0.084 por gramo.</li>
      <li>Paquete grande: 60 ÷ 750 = $0.080 por gramo.</li>
      <li>Compara: 0.080 es menor que 0.084, así que el grande es más barato por gramo.</li>
      <li>Comprueba por otro camino. Con tres paquetes chicos tendrías 1 500 g por 3 × 42 = $126. Con dos grandes tendrías los mismos 1 500 g por 2 × 60 = $120. El grande vuelve a ganar.</li>
      </ol>
      <p>Resultado: <span class="resultado">el de 750 g es más barato por gramo</span>. Ahorras 4 centavos por cada 10 gramos.</p>
      <p class="nota"><strong>Error común:</strong> elegir el de $42 porque cuesta menos. Ese paquete trae menos café; lo justo es comparar el precio de la misma cantidad.</p>`,
    vidaReal: `
      <p>Comparar cantidades "por cada" algo te ayuda a decidir y a mezclar bien:</p>
      <ul>
      <li>En el supermercado, para saber qué paquete conviene cuando tienen tamaños distintos.</li>
      <li>Al preparar pintura, concreto, fertilizante o fórmula para bebé, donde cada ingrediente va en su medida.</li>
      <li>Al leer un mapa, para saber cuántos kilómetros reales representa cada centímetro.</li>
      <li>Al calcular cuántos kilómetros recorre tu auto con un litro de gasolina.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En un salón hay 12 mujeres y 18 hombres. Simplificada, la razón de mujeres a hombres es 2 : ?. ¿Qué número va en lugar del signo de interrogación?</p>', respuesta: 3,
        pista: '<p>Divide 12 y 18 entre su MCD, que es 6.</p>',
        solucion: '<p>12 ÷ 6 = 2 y 18 ÷ 6 = 3. La razón es 2 : <strong>3</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un auto recorre 360 km con 30 litros de gasolina. ¿Cuántos kilómetros recorre por litro?</p>', respuesta: 12,
        pista: '<p>Divide los kilómetros entre los litros.</p>',
        solucion: '<p>360 ÷ 30 = <strong>12</strong> km por litro.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué presentación de leche tiene el mejor precio por litro?</p>',
        opciones: ['1 litro a $28', '1.5 litros a $39', '2 litros a $54'], correcta: 1,
        pista: '<p>Divide cada precio entre los litros.</p>',
        solucion: '<p>$28, 39 ÷ 1.5 = $26 y 54 ÷ 2 = $27 por litro. La de 1.5 litros es la más barata por litro.</p>' },
      { tipo: 'numero', enunciado: `<p>Encuentra x: ${F(4, 10)} = ${F(6, 'x')}</p>`, respuesta: 15,
        pista: '<p>Productos cruzados: 4 × x = 10 × 6.</p>',
        solucion: '<p>4x = 60, así que x = 60 ÷ 4 = <strong>15</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un mapa tiene escala 1 : 50 000, es decir, 1 cm en el mapa son 50 000 cm reales (0.5 km). Dos pueblos están a 6 cm en el mapa. ¿Cuántos kilómetros los separan?</p>', respuesta: 3,
        pista: '<p>Cada centímetro del mapa equivale a medio kilómetro.</p>',
        solucion: '<p>6 × 0.5 = <strong>3</strong> km.</p>' },
      { tipo: 'opciones', enunciado: `<p>¿Forman una proporción ${F(3, 4)} y ${F(9, 12)}?</p>`, opciones: ['Sí', 'No'], correcta: 0,
        pista: '<p>Compara los productos cruzados: 3 × 12 y 4 × 9.</p>',
        solucion: `<p>3 × 12 = 36 y 4 × 9 = 36. Son iguales, así que sí: ${F(3, 4)} = ${F(9, 12)}.</p>` },
    ],
    fuentes: [OS('5-6-ratios-and-rate', 'Ratios and Rate'), WIKI('Razón_(matemática)', 'Razón'), KHAN],
  });

  // ------------------------------------------------------------------
  L('Regla de tres', {
    objetivo: 'Resolver problemas de proporcionalidad directa e inversa con la regla de tres, y saber cuál usar.',
    explicacion: `
      <p>Imagina que 3 kilos de tomate cuestan $87 y quieres comprar 5 kilos. No sabes el precio de 5 kilos, pero conoces tres datos: 3 kilos, $87 y 5 kilos. Con ellos puedes encontrar el cuarto. La técnica para hacerlo se llama <strong>regla de tres</strong>, justamente porque usa tres datos para hallar uno que falta.</p>
      <p>Antes de calcular, hazte una pregunta: si una cantidad crece, ¿la otra crece o se hace más chica? La respuesta decide qué tipo de regla de tres usas.</p>
      <h3>Regla de tres directa: a más, más</h3>
      <p>Con los tomates, si compras más kilos, pagas más; si compras el doble, pagas el doble. Cuando dos cantidades crecen juntas de esa forma, se dice que son <strong>directamente proporcionales</strong>. Acomoda los datos en una tabla, con los que van juntos en la misma fila:</p>
      <div class="tabla-wrap"><table>
      <tr><td>3 kg</td><td>→</td><td>$87</td></tr>
      <tr><td>5 kg</td><td>→</td><td>x</td></tr>
      </table></div>
      <p>La letra x representa el dato que no conoces. Para encontrarlo, multiplica en cruz los dos números que están en diagonal (5 y 87) y divide entre el que queda (3):</p>
      <p>x = 5 × 87 ÷ 3 = 435 ÷ 3 = 145</p>
      <p>¿Por qué funciona? Si divides 87 ÷ 3, sabes cuánto cuesta un kilo: $29. Luego lo multiplicas por los 5 kilos que quieres: 29 × 5 = 145. La regla de tres hace lo mismo en otro orden. En el fondo es la proporción ${F(3, 87)} = ${F(5, 'x')} resuelta con productos cruzados.</p>
      <h3>Regla de tres inversa: a más, menos</h3>
      <p>Ahora imagina que 4 pintores tardan 6 días en pintar una casa. Si solo hay 3 pintores, ¿tardarán más o menos? Más, porque hay menos manos trabajando. Aquí, cuando una cantidad baja, la otra sube. Se dice que son <strong>inversamente proporcionales</strong>.</p>
      <div class="tabla-wrap"><table>
      <tr><td>4 pintores</td><td>→</td><td>6 días</td></tr>
      <tr><td>3 pintores</td><td>→</td><td>x</td></tr>
      </table></div>
      <p>En este caso multiplica en línea, es decir, los dos números de la fila completa (4 y 6), y divide entre el que queda (3):</p>
      <p>x = 4 × 6 ÷ 3 = 24 ÷ 3 = 8 días</p>
      <p>¿Por qué? Porque 4 pintores durante 6 días hacen 4 × 6 = 24 días de trabajo de un pintor. El trabajo total es el mismo, así que ahora esos 24 días de trabajo se reparten entre 3 pintores, y a cada uno le tocan 8.</p>
      <p class="nota"><strong>Trampa común:</strong> usar la regla directa en un caso inverso. Con los pintores te saldría 3 × 6 ÷ 4 = 4.5 días: menos pintores tardando menos, lo cual no tiene sentido. Pregúntate siempre primero "a más, ¿más o menos?" y, al final, revisa que el resultado tenga sentido.</p>`,
    ejemplo: `
      <p>Con 2 litros de pintura cubres 18 m² de pared (m² se lee "metros cuadrados"). ¿Cuántos litros necesitas para 45 m²?</p>
      <ol class="pasos-ej">
      <li>Decide el tipo: si hay más pared que pintar, necesitas más pintura. A más, más: es directa.</li>
      <li>Acomoda los datos con los que van juntos en la misma fila: 2 L → 18 m² y x → 45 m².</li>
      <li>Multiplica en cruz los números en diagonal y divide entre el que queda: x = 2 × 45 ÷ 18 = 90 ÷ 18 = 5.</li>
      <li>Comprueba por otro camino. Si 2 litros cubren 18 m², un litro cubre 9 m². Para 45 m² necesitas 45 ÷ 9 = 5 litros. Coincide.</li>
      </ol>
      <p>Resultado: <span class="resultado">5 litros</span>.</p>
      <p class="nota"><strong>Error común:</strong> mezclar los datos de las filas. Cada fila debe juntar dos datos que van juntos: "estos litros cubren estos metros".</p>`,
    vidaReal: `
      <p>Cuando sabes cuánto rinde una cantidad y quieres saber cuánto rinde otra, esta lección te ayuda:</p>
      <ul>
      <li>Al convertir dinero de otro país, unidades de medida o las cantidades de una receta.</li>
      <li>Al calcular cuánta pintura, piso o tela comprar para un espacio más grande o más chico.</li>
      <li>Al estimar cuánto tardará un trabajo si lo hacen más o menos personas.</li>
      <li>Al calcular la dosis de un medicamento para una mascota según su peso, siempre siguiendo la indicación del veterinario.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>5 cuadernos cuestan $120. ¿Cuánto cuestan 8 cuadernos?</p>', respuesta: 8 * 120 / 5,
        pista: '<p>Es directa: x = 8 × 120 ÷ 5.</p>',
        solucion: '<p>8 × 120 = 960 y 960 ÷ 5 = <strong>$192</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si 1 unidad de una moneda extranjera equivale a 18 unidades de tu moneda, ¿cuánto equivalen 250 unidades extranjeras?</p>', respuesta: 250 * 18,
        pista: '<p>Es directa, y como la primera cantidad es 1, basta con multiplicar.</p>',
        solucion: '<p>Cada unidad extranjera vale 18 de las tuyas, así que 250 valen 250 × 18 = <strong>4 500</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>6 llaves de agua llenan un tanque en 4 horas. ¿Cuántas horas tardan 8 llaves iguales?</p>', respuesta: 6 * 4 / 8,
        pista: '<p>Más llaves → menos tiempo: es inversa. Multiplica en línea: 6 × 4.</p>',
        solucion: '<p>6 × 4 = 24 y 24 ÷ 8 = <strong>3</strong> horas.</p>' },
      { tipo: 'opciones', enunciado: '<p>La velocidad de un auto y el tiempo que tarda en recorrer una misma distancia son…</p>',
        opciones: ['Directamente proporcionales', 'Inversamente proporcionales', 'No tienen relación'], correcta: 1,
        pista: '<p>Si vas más rápido, ¿tardas más o menos?</p>',
        solucion: '<p>A más velocidad, menos tiempo: son inversamente proporcionales.</p>' },
      { tipo: 'numero', enunciado: '<p>Una impresora imprime 450 hojas en 15 minutos. ¿Cuántas imprime en 40 minutos?</p>', respuesta: 450 * 40 / 15,
        pista: '<p>Más tiempo → más hojas: directa.</p>',
        solucion: '<p>450 × 40 = 18 000 y 18 000 ÷ 15 = <strong>1 200</strong> hojas.</p>' },
      { tipo: 'numero', enunciado: '<p>Con 120 g de harina salen 8 galletas. ¿Cuántos gramos necesitas para 30 galletas?</p>', respuesta: 30 * 120 / 8,
        pista: '<p>Directa: x = 30 × 120 ÷ 8.</p>',
        solucion: '<p>30 × 120 = 3 600 y 3 600 ÷ 8 = <strong>450</strong> g.</p>' },
    ],
    fuentes: [OS('6-5-solve-proportions-and-their-applications', 'Solve Proportions and their Applications'), WIKI('Regla_de_tres', 'Regla de tres'), WIKI('Proporcionalidad', 'Proporcionalidad')],
  });

  // ------------------------------------------------------------------
  L('Potencias y raíces', {
    objetivo: 'Calcular potencias y raíces, aplicar sus reglas básicas y usarlas para trabajar con áreas y volúmenes.',
    explicacion: `
      <p>Imagina que doblas una hoja de papel por la mitad. Ahora tiene 2 capas. Si la doblas otra vez, tiene 4; otra vez, 8; otra vez, 16. Cada doblez multiplica las capas por 2, así que después de 4 dobleces tienes 2 × 2 × 2 × 2 = 16 capas.</p>
      <p>Escribir tantos "× 2" es largo, así que hay una forma corta: 2<sup>4</sup>. A esto se le llama <strong>potencia</strong>: una multiplicación repetida del mismo número. Se lee "dos a la cuarta" y tiene dos partes:</p>
      <ul>
      <li>El número grande, 2, es <strong>el número que se multiplica</strong>. Se llama <strong>base</strong>.</li>
      <li>El número chiquito de arriba, 4, dice <strong>cuántas veces aparece la base</strong> en la multiplicación. Se llama <strong>exponente</strong>.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> 3<sup>2</sup> no es 3 × 2 = 6. Es 3 × 3 = 9. El exponente no multiplica a la base: cuenta cuántas veces la escribes.</p>
      <h3>Casos que conviene conocer</h3>
      <ul>
      <li>El exponente 2 se lee "al cuadrado", porque un cuadrado de 3 cuadritos por lado tiene 3 × 3 = 9 cuadritos. El exponente 3 se lee "al cubo", porque un cubo de 3 por lado tiene 3 × 3 × 3 = 27 cubitos.</li>
      <li>Cualquier número a la 1 es él mismo: 7<sup>1</sup> = 7, porque aparece una sola vez.</li>
      <li>Cualquier número, excepto el 0, a la 0 da 1: 7<sup>0</sup> = 1. Mira el patrón: 7<sup>2</sup> = 49 y 7<sup>1</sup> = 7. Cada vez que el exponente baja uno, divides entre 7. Si divides 7 entre 7 una vez más, llegas a 1.</li>
      <li>En las potencias de 10, el exponente dice cuántos ceros lleva: 10<sup>3</sup> = 10 × 10 × 10 = 1 000.</li>
      <li>Con negativos importan los paréntesis. (−2)<sup>2</sup> = (−2) × (−2) = 4, porque se eleva el −2 completo. En cambio, −2<sup>2</sup> = −(2 × 2) = −4, porque el exponente solo toca al 2.</li>
      </ul>
      <h3>Reglas cuando la base es la misma</h3>
      <ul>
      <li>Al multiplicar, se suman los exponentes: 2<sup>2</sup> × 2<sup>3</sup> = 2<sup>5</sup>. Dos doses multiplicados por tres doses son cinco doses: 4 × 8 = 32.</li>
      <li>Al dividir, se restan: 5<sup>6</sup> ÷ 5<sup>2</sup> = 5<sup>4</sup>. Los dos cincos de abajo se cancelan con dos de los seis de arriba, y quedan cuatro.</li>
      <li>Al elevar una potencia a otra, se multiplican: (3<sup>2</sup>)<sup>3</sup> = 3<sup>6</sup>. Es 3<sup>2</sup> escrito tres veces, y cada uno trae dos treses: 3 × 2 = 6.</li>
      </ul>
      <h3>Raíces: el camino de regreso</h3>
      <p>Ahora la pregunta al revés: un cuadrado tiene 49 cuadritos, ¿cuántos tiene por lado? Buscas un número que, multiplicado por sí mismo, dé 49. Es 7, porque 7 × 7 = 49. A esa operación se le llama <strong>raíz cuadrada</strong> y se escribe √49 = 7. La raíz cuadrada deshace el cuadrado, como restar deshace sumar.</p>
      <p>Los números como 1, 4, 9, 16, 25 y 36 tienen raíz exacta, porque son el cuadrado de un número entero. Se llaman <strong>cuadrados perfectos</strong>. Otros no la tienen: √2 ≈ 1.414, donde ≈ significa "aproximadamente igual a".</p>
      <p>La <strong>raíz cúbica</strong> deshace el cubo: busca un número que, escrito tres veces en una multiplicación, dé el resultado. Se escribe con un 3 pequeño: ∛27 = 3, porque 3 × 3 × 3 = 27.</p>`,
    ejemplo: `
      <p>Un terreno cuadrado mide 144 m². ¿Cuántos metros de cerca necesitas para rodearlo?</p>
      <ol class="pasos-ej">
      <li>La cerca va por el borde, así que necesitas saber cuánto mide cada lado. Lo que te dan es el área, el espacio que ocupa el terreno.</li>
      <li>El área de un cuadrado es lado × lado, es decir, lado<sup>2</sup>. Para regresar del área al lado, saca la raíz cuadrada: lado = √144 = 12 m, porque 12 × 12 = 144.</li>
      <li>Un cuadrado tiene 4 lados iguales, así que la cerca mide 4 × 12 = 48 m.</li>
      <li>Comprueba: un cuadrado de 12 m de lado tiene 12 × 12 = 144 m² de área, justo lo que decía el problema.</li>
      </ol>
      <p>Resultado: <span class="resultado">48 metros de cerca</span>.</p>
      <p class="nota"><strong>Error común:</strong> dividir 144 entre 4 y responder 36. El área y el borde son cosas distintas: primero necesitas el lado.</p>`,
    vidaReal: `
      <p>Las multiplicaciones repetidas, y el camino para deshacerlas, aparecen en muchos lugares:</p>
      <ul>
      <li>Al calcular cuánto piso necesita un cuarto o cuánta agua cabe en un tinaco.</li>
      <li>En cosas que se duplican una y otra vez, como las bacterias, un rumor en redes o tus ahorros cuando ganan intereses.</li>
      <li>En las computadoras, que trabajan con doses: por eso las memorias son de 8, 16, 32, 64 o 128 GB.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Calcula 2<sup>5</sup>.</p>', respuesta: 2 ** 5,
        pista: '<p>Multiplica 2 por sí mismo cinco veces.</p>',
        solucion: '<p>2 × 2 × 2 × 2 × 2 = <strong>32</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula 5<sup>3</sup>.</p>', respuesta: 5 ** 3,
        pista: '<p>El exponente 3 dice que el 5 se multiplica por sí mismo: 5 × 5 × 5.</p>',
        solucion: '<p>5 × 5 = 25 y 25 × 5 = <strong>125</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula √81.</p>', respuesta: 9,
        pista: '<p>¿Qué número multiplicado por sí mismo da 81?</p>',
        solucion: '<p>9 × 9 = 81, así que √81 = <strong>9</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula 10<sup>4</sup>.</p>', respuesta: 10 ** 4,
        pista: '<p>El exponente te dice cuántos ceros lleva.</p>',
        solucion: '<p>Un 1 seguido de cuatro ceros: <strong>10 000</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿A qué es igual 2<sup>3</sup> × 2<sup>4</sup>?</p>',
        opciones: ['2<sup>7</sup>', '2<sup>12</sup>', '4<sup>7</sup>', '4<sup>12</sup>'], correcta: 0,
        pista: '<p>Misma base al multiplicar: la base se queda igual y los exponentes se suman.</p>',
        solucion: '<p>2<sup>3 + 4</sup> = 2<sup>7</sup> = 128. Compruébalo: 8 × 16 = 128.</p>' },
      { tipo: 'numero', enunciado: '<p>Una caja con forma de cubo tiene un volumen de 125 cm³. ¿Cuánto mide cada arista (lado)?</p>', respuesta: 5,
        pista: '<p>El volumen de un cubo es lado<sup>3</sup>. Busca la raíz cúbica de 125.</p>',
        solucion: '<p>5 × 5 × 5 = 125, así que cada arista mide <strong>5</strong> cm.</p>' },
    ],
    fuentes: [WIKI('Potenciación', 'Potenciación'), WIKI('Raíz_cuadrada', 'Raíz cuadrada'), OS('5-7-simplify-and-use-square-roots', 'Simplify and Use Square Roots')],
  });

  // ------------------------------------------------------------------
  L('Notación científica', {
    objetivo: 'Escribir y leer números muy grandes o muy pequeños en notación científica, y multiplicar con ella.',
    explicacion: `
      <p>En el mundo vivimos unas 8 100 000 000 de personas, y algunas bacterias miden 0.000002 m. Escribir tantos ceros es incómodo, y es muy fácil equivocarse al contarlos. Por eso los científicos usan una forma más corta llamada <strong>notación científica</strong>.</p>
      <h3>La idea: un número chico por una potencia de 10</h3>
      <p>Recuerda que 10<sup>9</sup> es un 1 seguido de nueve ceros: 1 000 000 000. Entonces 8 100 000 000 es lo mismo que 8.1 × 1 000 000 000, o sea, 8.1 × 10<sup>9</sup>. En lugar de contar ceros, el exponente los cuenta por ti. Todo número en notación científica tiene esta forma:</p>
      <p><strong>a × 10<sup>n</sup></strong></p>
      <ul>
      <li><strong>a</strong> es <strong>el número de adelante</strong>, con las cifras importantes. Debe ser 1 o mayor, pero menor que 10; así queda una sola cifra antes del punto.</li>
      <li><strong>n</strong> es <strong>cuántos lugares se movió el punto</strong>. Es un número entero, positivo o negativo.</li>
      </ul>
      <p>En la población del mundo, a = 8.1 y n = 9.</p>
      <h3>Números grandes: n positivo</h3>
      <p>Mueve el punto decimal hacia la izquierda hasta que quede una sola cifra antes de él, y cuenta cuántos lugares lo moviste: ese es n. En un número sin decimales, el punto está escondido al final.</p>
      <p>8 100 000 000 → 8.1 (moviste el punto 9 lugares) → <strong>8.1 × 10<sup>9</sup></strong></p>
      <p>Para regresar al número normal, haz lo contrario: mueve el punto n lugares a la derecha y rellena con ceros.</p>
      <h3>Números pequeños: n negativo</h3>
      <p>Para un número menor que 1, mueve el punto a la derecha hasta pasar la primera cifra que no sea cero. Los lugares que lo moviste, con signo negativo, son n.</p>
      <p>0.000002 → 2 (moviste el punto 6 lugares) → <strong>2 × 10<sup>−6</sup></strong></p>
      <p>¿Qué significa un exponente negativo? Que en lugar de multiplicar por 10, divides. Mira el patrón: 10<sup>2</sup> = 100, 10<sup>1</sup> = 10 y 10<sup>0</sup> = 1. Cada vez que el exponente baja uno, divides entre 10. Si sigues bajando, 10<sup>−1</sup> = 0.1, 10<sup>−2</sup> = 0.01 y 10<sup>−3</sup> = ${F(1, 1000)} = 0.001.</p>
      <p class="nota"><strong>Trampa común:</strong> equivocarte de signo. Un exponente positivo da un número grande, y uno negativo da un número menor que 1. Si 0.0005 te sale con exponente positivo, algo está mal.</p>
      <h3>Multiplicar</h3>
      <p>Multiplica los números de adelante entre sí y suma los exponentes, como en las reglas de las potencias: (3 × 10<sup>4</sup>) × (2 × 10<sup>5</sup>) = 6 × 10<sup>9</sup>, porque 3 × 2 = 6 y 4 + 5 = 9.</p>
      <p>Si el número de adelante queda en 10 o más, ajústalo: 20 × 10<sup>5</sup> = 2 × 10 × 10<sup>5</sup> = 2 × 10<sup>6</sup>. Al dividir el número de adelante entre 10, sumas 1 al exponente para compensar, y el valor no cambia.</p>
      <p class="nota">En calculadoras y hojas de cálculo verás <strong>1.5E8</strong>: significa 1.5 × 10<sup>8</sup>. Aquí puedes responder así o como 1.5×10^8.</p>`,
    ejemplo: `
      <p>Una bacteria mide 0.000004 m y la distancia de la Tierra a la Luna es de unos 384 000 000 m. Escríbelas en notación científica.</p>
      <ol class="pasos-ej">
      <li>La bacteria mide menos de 1 m, así que el exponente será negativo. Mueve el punto a la derecha hasta pasar el 4, la primera cifra que no es cero. Lo mueves 6 lugares: 4 × 10<sup>−6</sup> m.</li>
      <li>La distancia a la Luna es grande, así que el exponente será positivo. Mueve el punto a la izquierda hasta que quede una sola cifra antes de él: 3.84. Lo moviste 8 lugares: 3.84 × 10<sup>8</sup> m.</li>
      <li>Comprueba regresando. En 3.84 × 10<sup>8</sup>, mueve el punto 8 lugares a la derecha: 384 000 000. En 4 × 10<sup>−6</sup>, muévelo 6 a la izquierda: 0.000004. Los dos coinciden.</li>
      </ol>
      <p>Resultado: <span class="resultado">4 × 10<sup>−6</sup> m</span> y <span class="resultado">3.84 × 10<sup>8</sup> m</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir 384 × 10<sup>6</sup>. Vale lo mismo, pero no es notación científica, porque el número de adelante debe ser menor que 10.</p>`,
    vidaReal: `
      <p>Hay cantidades tan grandes o tan pequeñas que escribirlas completas es casi imposible:</p>
      <ul>
      <li>En ciencia, para hablar de la distancia entre planetas o del tamaño de una célula, un virus o un átomo.</li>
      <li>Para entender lo que muestra tu calculadora cuando un resultado no cabe en la pantalla.</li>
      <li>Para comparar cifras enormes de las noticias, como la población del mundo o lo que debe un país.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>45 000 000 = 4.5 × 10<sup>n</sup>. ¿Cuánto vale n?</p>', respuesta: 7,
        pista: '<p>Cuenta cuántos lugares mueves el punto para pasar de 45 000 000 a 4.5.</p>',
        solucion: '<p>Para pasar de 45 000 000 a 4.5, el punto se mueve 7 lugares a la izquierda, así que <strong>n = 7</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Escribe 3.2 × 10<sup>5</sup> como número normal.</p>', respuesta: 320000,
        pista: '<p>Mueve el punto 5 lugares a la derecha, rellenando con ceros.</p>',
        solucion: '<p>Mueves el punto 5 lugares a la derecha: el primero lo pasa detrás del 2 (32) y los otros cuatro se rellenan con ceros. Queda <strong>320 000</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>0.0007 = 7 × 10<sup>n</sup>. ¿Cuánto vale n?</p>', respuesta: -4,
        pista: '<p>Es un número pequeño, así que n es negativo. ¿Cuántos lugares mueves el punto para llegar al 7?</p>',
        solucion: '<p>Mueves el punto 4 lugares a la derecha: <strong>n = −4</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calcula (2 × 10<sup>3</sup>) × (4 × 10<sup>6</sup>). Puedes responder con el formato a×10^n (por ejemplo, 6×10^4) o con todos los ceros.</p>', respuesta: 8e9,
        pista: '<p>Multiplica 2 × 4 y suma los exponentes 3 + 6.</p>',
        solucion: '<p>Multiplica los números de adelante, 2 × 4 = 8, y suma los exponentes, 3 + 6 = 9. Queda <strong>8 × 10<sup>9</sup></strong> = 8 000 000 000.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál está escrito correctamente en notación científica?</p>',
        opciones: ['12 × 10<sup>4</sup>', '1.2 × 10<sup>5</sup>', '0.12 × 10<sup>6</sup>'], correcta: 1,
        pista: '<p>El número de adelante debe estar entre 1 y 10.</p>',
        solucion: '<p>Los tres valen 120 000, pero solo 1.2 × 10<sup>5</sup> tiene el número de adelante entre 1 y 10.</p>' },
      { tipo: 'numero', enunciado: '<p>La luz viaja unos 3 × 10<sup>5</sup> km cada segundo. La luz del Sol tarda unos 500 segundos en llegar a la Tierra. ¿Aproximadamente a cuántos km está el Sol?</p>', respuesta: 1.5e8,
        pista: '<p>Multiplica 3 × 10<sup>5</sup> por 500 (que es 5 × 10<sup>2</sup>).</p>',
        solucion: '<p>3 × 5 = 15 y 10<sup>5 + 2</sup> = 10<sup>7</sup>, así que 15 × 10<sup>7</sup> = <strong>1.5 × 10<sup>8</sup> km</strong> (150 millones de km).</p>' },
    ],
    fuentes: [OS('10-5-integer-exponents-and-scientific-notation', 'Integer Exponents and Scientific Notation'), WIKI('Notación_científica', 'Notación científica'), KHAN_PRE],
  });
})();
