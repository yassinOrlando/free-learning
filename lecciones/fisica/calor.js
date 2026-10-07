// Física · Unidad 6: Calor y temperatura.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const F = window.fraccion;
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('fisica', titulo, datos);

  const OSC = (pagina, nombre) => ({ nombre: `OpenStax, College Physics 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/college-physics-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = { nombre: 'Khan Academy en español: Termodinámica', url: 'https://es.khanacademy.org/science/physics/thermodynamics' };
  const PHET = (sim, nombre) => ({ nombre: `PhET, Universidad de Colorado: ${nombre}`, url: `https://phet.colorado.edu/es/simulations/${sim}` });

  // ------------------------------------------------------------------
  L('Temperatura y escalas', {
    objetivo: 'Entender qué mide la temperatura y convertir entre grados Celsius, Fahrenheit y kelvin.',
    explicacion: `
      <p>En un cuarto donde todo lleva horas, toca la pata metálica de una silla y luego la mesa de madera. El metal se siente más frío. Pero si pones un termómetro en los dos, marcan lo mismo. Tu mano no mide bien la temperatura; para eso necesitamos algo más confiable.</p>
      <h3>¿Qué mide la temperatura?</h3>
      <p>Todo está hecho de partículas diminutas que nunca están quietas: vibran, chocan y se mueven sin parar. Mientras más caliente está algo, más rápido se agitan sus partículas. La <strong>temperatura</strong> mide qué tan rápido se agitan, en promedio, las partículas de un objeto. Un café caliente tiene partículas muy agitadas; un helado, partículas mucho más lentas.</p>
      <p>Para medirla usamos un termómetro. Muchos aprovechan que los materiales se estiran un poco al calentarse: el líquido de adentro sube por un tubito delgado, y una escala marcada dice cuántos grados son.</p>
      <h3>Tres escalas distintas</h3>
      <p>Igual que la longitud se puede medir en metros o en pies, la temperatura se mide en varias escalas. Cada una elige dos puntos de referencia y los divide en partes:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Situación</th><th>Celsius (°C)</th><th>Fahrenheit (°F)</th><th>Kelvin (K)</th></tr>
        <tr><th>Cero absoluto</th><td>−273</td><td>−459</td><td>0</td></tr>
        <tr><th>El agua se congela</th><td>0</td><td>32</td><td>273</td></tr>
        <tr><th>Cuerpo humano</th><td>37</td><td>98.6</td><td>310</td></tr>
        <tr><th>El agua hierve</th><td>100</td><td>212</td><td>373</td></tr>
      </table></div>
      <p>La escala Celsius, la más usada en el mundo, pone el 0 donde el agua se congela y el 100 donde hierve, al nivel del mar. La escala Fahrenheit, usada en Estados Unidos, pone esos mismos puntos en 32 y 212.</p>
      <h3>¿Cómo paso de una a otra?</h3>
      <p>Entre que el agua se congela y hierve hay 100 grados Celsius, pero 180 grados Fahrenheit. Así que cada grado Celsius equivale a 180 ÷ 100 = 1.8 grados Fahrenheit. Además, la escala Fahrenheit empieza 32 grados más arriba. Por eso:</p>
      <p>°F = 1.8·°C + 32</p>
      <p>Se lee "los grados Fahrenheit son 1.8 por los grados Celsius, más 32". Para ir al revés, deshaces los pasos en orden contrario: primero restas 32 y luego divides entre 1.8.</p>
      <h3>El cero absoluto</h3>
      <p>Si enfrías algo, sus partículas se mueven cada vez más lento. Hay un límite: a −273.15 °C ya no se pueden frenar más. A esa temperatura se le llama <strong>cero absoluto</strong>, y nada puede estar más frío. La escala <strong>kelvin</strong>, la del Sistema Internacional, empieza justo ahí, así que no tiene números negativos. Sus grados miden lo mismo que los Celsius; lo único que cambia es dónde empieza la escala:</p>
      <p>K = °C + 273</p>
      <p>Se lee "los kelvin son los grados Celsius más 273". El valor exacto es 273.15, pero 273 basta para la vida diaria. Fíjate que se dice "kelvin", no "grados kelvin".</p>
      <p class="nota"><strong>Trampa común:</strong> al pasar de Fahrenheit a Celsius, dividir entre 1.8 antes de restar 32. Primero se resta, porque el 32 es el punto de partida de la escala.</p>`,
    ejemplo: `
      <p>Un termómetro de Estados Unidos marca 102 °F. ¿Cuántos grados Celsius son? ¿Es fiebre?</p>
      <ol class="pasos-ej">
        <li>Primero quita el punto de partida de la escala Fahrenheit: 102 − 32 = 70.</li>
        <li>Esos 70 grados Fahrenheit son más pequeños que los Celsius, así que divide entre 1.8: 70 ÷ 1.8 ≈ 38.9 °C.</li>
        <li>Compara con la temperatura normal del cuerpo, unos 37 °C: está casi 2 grados arriba, así que sí es fiebre.</li>
        <li>Comprueba al revés: 1.8 × 38.9 + 32 = 70.02 + 32 ≈ 102 °F.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 38.9 °C, es fiebre</span>.</p>
      <p class="nota"><strong>Error común:</strong> calcular 102 ÷ 1.8 − 32 ≈ 24.7 °C. Si el resultado dice que alguien con fiebre está más frío que un día de primavera, revisa el orden de los pasos.</p>`,
    vidaReal: `
      <p>Medir qué tan caliente o frío está algo te sirve todos los días:</p>
      <ul>
        <li>Para saber si alguien tiene fiebre y cuándo conviene ir al médico.</li>
        <li>Al cocinar, porque muchas recetas de otros países dan la temperatura del horno en otra escala.</li>
        <li>Al viajar, para entender el pronóstico del clima de otro lugar.</li>
        <li>Para guardar bien la comida, que se echa a perder más rápido fuera del refrigerador.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Hace 25 °C. ¿Cuántos grados Fahrenheit son?</p>', respuesta: 1.8 * 25 + 32,
        pista: '<p>Multiplica por 1.8 y después suma 32.</p>',
        solucion: '<p>1.8 × 25 = 45, y 45 + 32 = <strong>77 °F</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un pronóstico dice 86 °F. ¿Cuántos grados Celsius son?</p>', respuesta: (86 - 32) / 1.8,
        pista: '<p>Primero resta 32 y luego divide entre 1.8.</p>',
        solucion: '<p>86 − 32 = 54, y 54 ÷ 1.8 = <strong>30 °C</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un cuarto está a 20 °C. ¿Cuántos kelvin son? Usa K = °C + 273.</p>', respuesta: 20 + 273, tolerancia: 0.2,
        pista: '<p>Suma 273 a los grados Celsius.</p>',
        solucion: '<p>20 + 273 = <strong>293 K</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un gas está a 300 K. ¿Cuántos grados Celsius son? Usa K = °C + 273.</p>', respuesta: 300 - 273, tolerancia: 0.2,
        pista: '<p>Haz la operación al revés: resta 273.</p>',
        solucion: '<p>300 − 273 = <strong>27 °C</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>En un cuarto, una cuchara de metal y una de madera llevan horas juntas. ¿Cuál está más fría?</p>',
        opciones: ['La de metal', 'La de madera', 'Están a la misma temperatura', 'Depende de su tamaño'], correcta: 2,
        pista: '<p>Después de horas en el mismo cuarto, ¿qué marcaría un termómetro en cada una?</p>',
        solucion: '<p><strong>Están a la misma temperatura</strong>, la del cuarto. El metal solo se siente más frío porque le quita calor a tu mano más rápido; lo verás en la lección de conducción.</p>' },
      { tipo: 'numero', enunciado: '<p>Hay una temperatura en la que Celsius y Fahrenheit marcan el mismo número: −40 °C. ¿Cuántos °F son?</p>', respuesta: 1.8 * -40 + 32,
        pista: '<p>Usa °F = 1.8·°C + 32 con cuidado en el signo.</p>',
        solucion: '<p>1.8 × (−40) = −72, y −72 + 32 = <strong>−40 °F</strong>. Es el único punto en que las dos escalas coinciden.</p>' },
    ],
    fuentes: [OSC('13-1-temperature', 'Temperature'), WIKI('Temperatura', 'Temperatura'), KHAN],
  });

  // ------------------------------------------------------------------
  L('Calor y calor específico', {
    objetivo: 'Distinguir el calor de la temperatura y calcular cuánta energía hace falta para calentar algo con Q = m·c·ΔT.',
    explicacion: `
      <p>Sirves un café hirviendo y lo dejas en la mesa. Media hora después está tibio, y la taza también. Algo pasó del café al aire y a la taza hasta que todo quedó a la misma temperatura. Eso que pasó es energía.</p>
      <h3>¿Qué es el calor?</h3>
      <p>En la vida diaria decimos "tengo calor" o "este cuarto tiene mucho calor". En física, el <strong>calor</strong> es la energía que pasa de un objeto caliente a uno frío por su diferencia de temperatura. Un objeto no "tiene" calor: tiene energía en sus partículas agitadas, y el calor es la parte de esa energía que viaja de uno a otro. Como es energía, se mide en joules.</p>
      <p>El calor siempre viaja de lo caliente a lo frío, nunca al revés por sí solo. Las partículas agitadas del café chocan con las del aire, más lentas, y les pasan parte de su movimiento. Esto sigue hasta que los dos quedan a la misma temperatura. A ese punto se le llama <strong>equilibrio térmico</strong>.</p>
      <h3>¿Cuánta energía hace falta para calentar algo?</h3>
      <p>Pon en dos ollas iguales la misma cantidad de agua y de aceite, sobre la misma flama. El aceite se calienta mucho más rápido. Cada material necesita una cantidad distinta de energía para subir un grado. A la energía que necesita 1 kg de un material para subir 1 °C se le llama <strong>calor específico</strong>, y se escribe con la letra c:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Material</th><th>c en J/(kg·°C)</th></tr>
        <tr><th>Agua</th><td>4 186</td></tr>
        <tr><th>Aceite de cocina</th><td>unos 2 000</td></tr>
        <tr><th>Arena</th><td>unos 830</td></tr>
        <tr><th>Aluminio</th><td>900</td></tr>
        <tr><th>Hierro</th><td>450</td></tr>
      </table></div>
      <p>El agua tiene uno de los calores específicos más altos que existen: cuesta mucha energía calentarla, y tarda mucho en enfriarse. Por eso el mar suaviza el clima de las ciudades costeras.</p>
      <h3>La fórmula</h3>
      <p>Si 1 kg necesita c joules por cada grado, 2 kg necesitan el doble, y subir 10 grados cuesta 10 veces más. Juntando todo:</p>
      <p>Q = m·c·ΔT</p>
      <p>Se lee "el calor es la masa por el calor específico por el cambio de temperatura". Q es <strong>cuánta energía entra o sale</strong>, en joules; m es la masa, en kilogramos; c es el calor específico del material; y ΔT es <strong>cuántos grados sube o baja</strong>, la temperatura final menos la inicial.</p>
      <p>Por ejemplo, para subir 1 kg de agua de 20 °C a 30 °C hacen falta Q = 1 × 4 186 × 10 = 41 860 J. Para subir 1 kg de hierro esos mismos 10 grados, solo 1 × 450 × 10 = 4 500 J, casi diez veces menos.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir calor con temperatura. Una alberca tibia tiene muchísima más energía que una taza de café hirviendo, porque tiene mucha más agua, aunque su temperatura sea menor.</p>`,
    ejemplo: `
      <p>Quieres hervir 2 kg de agua (2 litros) para hacer pasta. El agua sale de la llave a 20 °C. ¿Cuánta energía necesitas para llevarla a 100 °C?</p>
      <ol class="pasos-ej">
        <li>Primero encuentra cuántos grados tiene que subir, porque eso es ΔT: 100 − 20 = 80 °C.</li>
        <li>Usa el calor específico del agua, 4 186 J/(kg·°C), y multiplica todo: Q = 2 × 4 186 × 80.</li>
        <li>Haz la cuenta por partes: 2 × 4 186 = 8 372, y 8 372 × 80 = 669 760 J.</li>
        <li>Comprueba con lo que significa c: cada kilo necesita 4 186 J por grado. Por 2 kilos y 80 grados son 2 × 80 = 160 "paquetes" de 4 186 J, y 160 × 4 186 = 669 760 J.</li>
      </ol>
      <p>Resultado: <span class="resultado">669 760 J, casi 670 000 joules</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar la temperatura final (100) en lugar del cambio (80). La fórmula pide cuántos grados sube, no a cuántos llega.</p>`,
    vidaReal: `
      <p>Que unos materiales cuesten más energía de calentar que otros se nota en muchas cosas:</p>
      <ul>
        <li>En la playa, a mediodía, la arena quema y el mar sigue fresco.</li>
        <li>Las bolsas de agua caliente guardan el calor por horas.</li>
        <li>Los radiadores de los coches usan agua para llevarse el calor del motor.</li>
        <li>Saber cuánta energía gasta calentar agua ayuda a ahorrar gas o luz en casa.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuánta energía hace falta para subir 10 °C la temperatura de 1 kg de agua, en J? Usa c = 4 186 J/(kg·°C).</p>', respuesta: 1 * 4186 * 10,
        pista: '<p>Usa Q = m·c·ΔT.</p>',
        solucion: '<p>Q = 1 × 4 186 × 10 = <strong>41 860 J</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Calientas 0.5 kg de agua de 20 °C a 60 °C. ¿Cuánta energía necesitas, en J? Usa c = 4 186 J/(kg·°C).</p>', respuesta: 0.5 * 4186 * (60 - 20),
        pista: '<p>Calcula primero cuántos grados sube.</p>',
        solucion: '<p>ΔT = 60 − 20 = 40 °C, y Q = 0.5 × 4 186 × 40 = <strong>83 720 J</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una olla de aluminio de 2 kg sube 10 °C. ¿Cuánta energía recibió, en J? Usa c = 900 J/(kg·°C).</p>', respuesta: 2 * 900 * 10,
        pista: '<p>Multiplica la masa, el calor específico y el cambio de temperatura.</p>',
        solucion: '<p>Q = 2 × 900 × 10 = <strong>18 000 J</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Le das 8 372 J a 1 kg de agua. ¿Cuántos grados sube su temperatura? Usa c = 4 186 J/(kg·°C).</p>', respuesta: 8372 / (1 * 4186),
        pista: '<p>Cada grado le cuesta 4 186 J a este kilo de agua. ¿Cuántas veces cabe 4 186 en 8 372?</p>',
        solucion: '<p>ΔT = 8 372 ÷ 4 186 = <strong>2 °C</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>A mediodía en la playa, la arena quema pero el mar está fresco, aunque los dos reciben el mismo sol. ¿Por qué?</p>',
        opciones: ['Porque la arena recibe más sol', 'Porque el agua tiene un calor específico mucho mayor que la arena', 'Porque el agua está más lejos del sol', 'Porque la arena es más densa'], correcta: 1,
        pista: '<p>Con la misma energía, ¿cuál sube más de temperatura?</p>',
        solucion: '<p>El agua tiene un <strong>calor específico</strong> unas cinco veces mayor que la arena: con la misma energía, la arena sube muchos más grados.</p>' },
      { tipo: 'opciones', enunciado: '<p>Dejas un vaso de agua fría en un cuarto caliente. ¿Qué pasa?</p>',
        opciones: ['El frío del agua pasa al aire', 'El calor pasa del aire al agua hasta que tienen la misma temperatura', 'El agua se enfría más', 'No pasa nada'], correcta: 1,
        pista: '<p>¿En qué dirección viaja siempre el calor?</p>',
        solucion: '<p>El calor viaja de lo caliente a lo frío: <strong>pasa del aire al agua</strong> hasta llegar al equilibrio térmico. El "frío" no viaja; lo que se mueve es energía.</p>' },
    ],
    fuentes: [OSC('14-1-heat', 'Heat'), OSC('14-2-temperature-change-and-heat-capacity', 'Temperature Change and Heat Capacity'), PHET('energy-forms-and-changes', 'Formas de energía y cambios'), WIKI('Calor_específico', 'Calor específico')],
  });

  // ------------------------------------------------------------------
  L('Conducción, convección y radiación', {
    objetivo: 'Reconocer las tres formas en que viaja el calor y explicar cómo se aprovechan o se evitan en casa.',
    explicacion: `
      <p>Metes una cuchara de metal en la sopa caliente, y al rato el mango quema. Pones las manos sobre una fogata y sientes el aire caliente que sube. Te sientas al sol y te calientas, aunque el aire esté fresco. En los tres casos viaja calor, pero de tres formas distintas.</p>
      <h3>De partícula en partícula</h3>
      <p>En la cuchara, las partículas de la punta se agitan con el calor de la sopa y chocan con sus vecinas, que chocan con las siguientes, y así hasta el mango. El metal no se mueve de lugar: solo se pasa la agitación de una partícula a otra, como una fila de personas que se pasan una cubeta de mano en mano. A esta forma de viajar se le llama <strong>conducción</strong>, y pasa sobre todo en los sólidos.</p>
      <p>Hay materiales que conducen el calor muy bien, como los metales, y se llaman conductores. Otros lo conducen muy mal, como la madera, el plástico, la lana o el aire atrapado, y se llaman aislantes. Por eso las ollas son de metal y sus mangos de plástico o madera.</p>
      <p>Esto explica lo que viste al inicio de la unidad: el metal se siente más frío que la madera a la misma temperatura porque, al ser buen conductor, le quita calor a tu mano mucho más rápido.</p>
      <h3>Con el fluido que se mueve</h3>
      <p>En los líquidos y los gases pasa algo más. Cuando el agua del fondo de una olla se calienta, se expande y se vuelve menos densa. Como viste en la unidad de fluidos, lo menos denso sube. El agua caliente sube, el agua fría de arriba baja a ocupar su lugar, se calienta y vuelve a subir. Se forma una corriente que reparte el calor por toda la olla. A esta forma de viajar, en la que el propio fluido se mueve y lleva el calor consigo, se le llama <strong>convección</strong>.</p>
      <p>La convección explica por qué el aire caliente se junta cerca del techo, por qué los calentadores se ponen abajo y los aires acondicionados arriba, y también muchos vientos.</p>
      <h3>Sin tocar nada</h3>
      <p>Entre el Sol y la Tierra no hay aire, y aun así su calor nos llega. Todo objeto caliente emite una luz, a veces invisible, que lleva energía y puede viajar por el vacío. Al llegar a algo, ese objeto la absorbe y se calienta. A esta forma de viajar se le llama <strong>radiación</strong>. Así sientes el calor de una fogata en la cara, aunque el aire caliente suba y no te toque.</p>
      <p>Los colores oscuros absorben más radiación y los claros la reflejan. Por eso una camiseta negra se calienta más al sol que una blanca.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que la ropa abrigadora "da calor". Un suéter no produce calor: es un aislante que atrapa aire y frena la salida del calor de tu propio cuerpo.</p>`,
    ejemplo: `
      <p>Un termo mantiene el café caliente durante horas. ¿Cómo logra frenar las tres formas de viajar del calor?</p>
      <ol class="pasos-ej">
        <li>Primero, la conducción. El termo tiene dos paredes con vacío entre ellas. Sin partículas en medio, la agitación no tiene cómo pasar de la pared de adentro a la de afuera.</li>
        <li>Después, la convección. En el vacío tampoco hay aire que pueda moverse y llevarse el calor. Además, la tapa impide que el aire caliente de arriba se escape.</li>
        <li>Por último, la radiación. Las paredes están plateadas por dentro, como un espejo, y reflejan de regreso la radiación del café.</li>
        <li>Comprueba la idea con lo contrario: un vaso de vidrio sin tapa deja pasar calor de las tres formas, y el café se enfría en minutos.</li>
      </ol>
      <p>Resultado: <span class="resultado">vacío contra conducción y convección, paredes de espejo contra radiación</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que el termo solo sirve para lo caliente. Funciona igual con una bebida fría: frena el calor que entraría desde afuera.</p>`,
    vidaReal: `
      <p>Controlar por dónde viaja el calor ayuda a cocinar, vestirte y ahorrar energía:</p>
      <ul>
        <li>Las ollas tienen mangos de plástico o madera para que no te quemes.</li>
        <li>En climas fríos se ponen ventanas dobles para que el calor no se escape de la casa.</li>
        <li>En días de sol conviene usar ropa clara para no calentarte tanto.</li>
        <li>Abrir una ventana arriba y otra abajo ayuda a que el aire caliente salga.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>El mango de una cuchara de metal se calienta cuando la punta está en la sopa. ¿Cómo llega el calor al mango?</p>',
        opciones: ['Por conducción', 'Por convección', 'Por radiación', 'No llega calor'], correcta: 0,
        pista: '<p>El metal no se mueve de lugar; la agitación pasa de partícula en partícula.</p>',
        solucion: '<p>Es <strong>conducción</strong>: las partículas de la punta pasan su agitación a sus vecinas, hasta llegar al mango.</p>' },
      { tipo: 'opciones', enunciado: '<p>En un cuarto, el aire cerca del techo está más caliente que cerca del piso. ¿Qué forma de viajar del calor lo explica?</p>',
        opciones: ['Conducción', 'Convección', 'Radiación', 'Ninguna'], correcta: 1,
        pista: '<p>El aire caliente es menos denso. ¿Qué hace?</p>',
        solucion: '<p>Es <strong>convección</strong>: el aire caliente, menos denso, sube y se acumula arriba, y el frío baja.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la forma de viajar del calor que permite que la energía del Sol llegue a la Tierra a través del vacío?</p>',
        respuestas: ['radiación', 'la radiación', 'por radiación'],
        pista: '<p>Es la única de las tres formas que no necesita partículas en medio.</p>',
        solucion: '<p>Es la <strong>radiación</strong>: el Sol emite luz, visible e invisible, que viaja por el vacío y calienta lo que la absorbe.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos materiales es mejor aislante?</p>',
        opciones: ['Cobre', 'Aluminio', 'Lana', 'Hierro'], correcta: 2,
        pista: '<p>Los metales son buenos conductores.</p>',
        solucion: '<p>La <strong>lana</strong> atrapa aire entre sus fibras y conduce muy mal el calor. Los otros tres son metales, buenos conductores.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué una camiseta negra se calienta más al sol que una blanca?</p>',
        opciones: ['Porque es más gruesa', 'Porque los colores oscuros absorben más radiación', 'Porque conduce mejor el calor del aire', 'Porque produce su propio calor'], correcta: 1,
        pista: '<p>El calor del sol llega por radiación. ¿Qué colores la absorben y cuáles la reflejan?</p>',
        solucion: '<p>Los colores oscuros <strong>absorben más radiación</strong> y los claros la reflejan, así que la camiseta negra recibe más energía.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué un suéter te mantiene caliente en invierno?</p>',
        opciones: ['Porque produce calor', 'Porque es un aislante que frena la salida del calor de tu cuerpo', 'Porque absorbe el frío', 'Porque conduce el calor del aire hacia ti'], correcta: 1,
        pista: '<p>¿De dónde sale el calor que sientes?</p>',
        solucion: '<p>El calor sale de tu propio cuerpo. El suéter <strong>es un aislante</strong>: atrapa aire y frena que ese calor se escape.</p>' },
    ],
    fuentes: [OSC('14-5-conduction', 'Conduction'), OSC('14-6-convection', 'Convection'), OSC('14-7-radiation', 'Radiation'), WIKI('Transmisión_de_calor', 'Transmisión de calor')],
  });

  // ------------------------------------------------------------------
  // Calentamiento de hielo a −20 °C hasta vapor: subidas y mesetas a 0 °C y 100 °C.
  const MESETAS = G({ x: [0, 10], y: [-30, 130], funciones: [{
    f: (t) => (t <= 1 ? -20 + 20 * t : t <= 3 ? 0 : t <= 6 ? (t - 3) * 100 / 3 : t <= 9 ? 100 : 100 + 20 * (t - 9)),
    etiqueta: 'temperatura del agua',
  }], puntos: [{ x: 2, y: 0, etiqueta: 'se derrite' }, { x: 7.5, y: 100, etiqueta: 'hierve' }],
  descripcion: 'Esquema de temperatura contra tiempo al calentar hielo con una flama pareja. El eje horizontal es el tiempo en minutos, de 0 a 10, y el vertical la temperatura, de −30 a 130 °C. La temperatura sube de −20 a 0 °C en el primer minuto. Luego se queda en 0 °C de 1 a 3 minutos mientras el hielo se derrite. Sube de 0 a 100 °C entre los minutos 3 y 6. Se queda en 100 °C de 6 a 9 minutos mientras el agua hierve, y después vuelve a subir.' });

  L('Cambios de estado', {
    objetivo: 'Nombrar los cambios de estado, entender por qué la temperatura no cambia mientras ocurren y calcular la energía que necesitan con Q = m·L.',
    explicacion: `
      <p>Saca un hielo del congelador y déjalo en un vaso. Se derrite poco a poco y queda agua. Si calientas esa agua, hierve y se vuelve vapor. Es la misma sustancia en tres formas: sólido, líquido y gas. Al paso de una forma a otra se le llama <strong>cambio de estado</strong>.</p>
      <h3>¿Cómo se llaman?</h3>
      <ul>
        <li>Fusión: de sólido a líquido, como el hielo que se derrite.</li>
        <li>Solidificación: de líquido a sólido, como el agua que se congela.</li>
        <li>Evaporación: de líquido a gas. Si ocurre en todo el líquido a la vez, con burbujas, se llama ebullición.</li>
        <li>Condensación: de gas a líquido, como las gotitas que se forman en un vaso frío.</li>
        <li>Sublimación: de sólido a gas sin pasar por líquido, como el hielo seco que echa humo.</li>
      </ul>
      <h3>Una sorpresa en el termómetro</h3>
      <p>Pon hielo a −20 °C en una olla al fuego, con un termómetro adentro, y anota la temperatura cada minuto:</p>
      ${MESETAS}
      <p>Al principio la temperatura sube. Pero al llegar a 0 °C se queda quieta, aunque la flama siga dándole energía, hasta que todo el hielo se derrite. Luego sube otra vez hasta 100 °C, y ahí vuelve a quedarse quieta mientras el agua hierve. Esos tramos planos se llaman mesetas. La gráfica es un esquema: en un experimento real, la meseta de la ebullición dura mucho más que la del hielo.</p>
      <h3>¿A dónde va la energía en las mesetas?</h3>
      <p>En el hielo, las partículas están amarradas unas con otras en una red ordenada. Para que se derrita, hay que soltar esas uniones. Mientras eso pasa, toda la energía se usa en soltar partículas, no en agitarlas más rápido. Como la temperatura mide la agitación, no sube. Algo parecido pasa al hervir: la energía se usa en separar por completo las partículas para que escapen como gas.</p>
      <p>A la energía que necesita cada kilogramo de una sustancia para cambiar de estado, sin cambiar de temperatura, se le llama <strong>calor latente</strong>, y se escribe con la letra L. "Latente" quiere decir escondido, porque el termómetro no la muestra. Para el agua:</p>
      <ul>
        <li>Para derretir 1 kg de hielo a 0 °C hacen falta 334 000 J.</li>
        <li>Para evaporar 1 kg de agua a 100 °C hacen falta 2 260 000 J, casi siete veces más.</li>
      </ul>
      <p>La energía total se calcula así:</p>
      <p>Q = m·L</p>
      <p>Se lee "el calor es la masa por el calor latente". m es cuántos kilogramos cambian de estado y L es la energía que necesita cada kilogramo.</p>
      <p>Al revés también funciona: cuando el agua se congela o el vapor se condensa, devuelven esa misma energía. Por eso una quemadura con vapor es peor que con agua hirviendo.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que subirle a la flama hace que el agua hirviendo llegue a más de 100 °C. Solo hierve más rápido; la temperatura se queda en 100 °C hasta que se evapora toda.</p>`,
    ejemplo: `
      <p>Tienes 2 kg de hielo a 0 °C. ¿Cuánta energía necesitas para derretirlo? Compárala con la que necesitarías para calentar esa agua de 0 °C a 80 °C.</p>
      <ol class="pasos-ej">
        <li>Primero, derretirlo. Es un cambio de estado, así que usa Q = m·L con el calor latente de fusión: Q = 2 × 334 000 = 668 000 J.</li>
        <li>Ahora, calentar el agua. Ya no cambia de estado, así que usa Q = m·c·ΔT de la lección anterior: Q = 2 × 4 186 × 80 = 669 760 J.</li>
        <li>Compara: las dos cantidades son casi iguales.</li>
        <li>Comprueba la idea por kilo: derretir 1 kg cuesta 334 000 J, y calentarlo 80 grados cuesta 4 186 × 80 = 334 880 J. Coinciden casi exacto.</li>
      </ol>
      <p>Resultado: <span class="resultado">668 000 J para derretirlo</span>, casi lo mismo que calentar esa agua de 0 °C a 80 °C.</p>
      <p class="nota"><strong>Error común:</strong> usar Q = m·c·ΔT para derretir el hielo. Como la temperatura no cambia, ΔT = 0 y daría 0 J, lo cual es falso.</p>`,
    vidaReal: `
      <p>Que el agua cambie de sólido a líquido a gas está detrás de muchas cosas cotidianas:</p>
      <ul>
        <li>Los hielos enfrían tu bebida porque, al derretirse, le quitan mucha energía.</li>
        <li>El sudor te refresca: al secarse sobre tu piel, se lleva energía de tu cuerpo.</li>
        <li>En la mañana aparece rocío en las plantas, porque el vapor del aire se vuelve gotitas.</li>
        <li>La ropa mojada se seca al sol aunque no llegue a hervir.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuánta energía hace falta para derretir 0.5 kg de hielo que ya está a 0 °C, en J? Usa L = 334 000 J/kg.</p>', respuesta: 0.5 * 334000,
        pista: '<p>Es un cambio de estado: usa Q = m·L.</p>',
        solucion: '<p>Q = 0.5 × 334 000 = <strong>167 000 J</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuánta energía hace falta para evaporar 1 kg de agua que ya está a 100 °C, en J? Usa L = 2 260 000 J/kg.</p>', respuesta: 1 * 2260000,
        pista: '<p>Usa Q = m·L con el calor latente de evaporación.</p>',
        solucion: '<p>Q = 1 × 2 260 000 = <strong>2 260 000 J</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Mientras un hielo se derrite en un vaso a 0 °C, ¿qué pasa con su temperatura?</p>',
        opciones: ['Sube poco a poco', 'Se queda en 0 °C hasta que se derrite todo', 'Baja', 'Sube de golpe a 100 °C'], correcta: 1,
        pista: '<p>Recuerda las mesetas de la gráfica.</p>',
        solucion: '<p>La temperatura <strong>se queda en 0 °C</strong>: la energía se usa en soltar las partículas del hielo, no en agitarlas más.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el cambio de estado de gas a líquido, como las gotitas que aparecen en un vaso con agua helada?</p>',
        respuestas: ['condensación', 'la condensación'],
        pista: '<p>Es el cambio contrario a la evaporación.</p>',
        solucion: '<p>Es la <strong>condensación</strong>: el vapor del aire toca el vaso frío, pierde energía y se vuelve líquido.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos es un ejemplo de sublimación?</p>',
        opciones: ['Un hielo que se derrite', 'Hielo seco que se vuelve gas sin hacerse líquido', 'Agua que hierve', 'Lluvia que se congela'], correcta: 1,
        pista: '<p>La sublimación se salta el estado líquido.</p>',
        solucion: '<p>El <strong>hielo seco</strong> pasa directo de sólido a gas, sin volverse líquido: es sublimación.</p>' },
      { tipo: 'numero', enunciado: '<p>Tienes 0.2 kg de hielo a 0 °C. ¿Cuánta energía necesitas para derretirlo y luego calentar el agua hasta 10 °C, en J? Usa L = 334 000 J/kg y c = 4 186 J/(kg·°C).</p>', respuesta: 0.2 * 334000 + 0.2 * 4186 * 10,
        pista: '<p>Son dos pasos: primero derretir (Q = m·L) y luego calentar (Q = m·c·ΔT). Suma los dos.</p>',
        solucion: '<p>Derretir: 0.2 × 334 000 = 66 800 J. Calentar: 0.2 × 4 186 × 10 = 8 372 J. Total: <strong>75 172 J</strong>.</p>' },
    ],
    fuentes: [OSC('14-3-phase-change-and-latent-heat', 'Phase Change and Latent Heat'), PHET('states-of-matter-basics', 'Estados de la materia: fundamentos'), WIKI('Cambio_de_estado', 'Cambio de estado'), WIKI('Calor_latente', 'Calor latente')],
  });

  // ------------------------------------------------------------------
  L('Dilatación térmica', {
    objetivo: 'Explicar por qué los materiales crecen al calentarse y calcular cuánto se alarga una barra con ΔL = α·L₀·ΔT.',
    explicacion: `
      <p>Si un frasco de vidrio tiene la tapa de metal muy apretada, un truco es ponerla un rato bajo el chorro de agua caliente. Después abre mucho más fácil. Y si te fijas en un puente, verás cada cierto tramo unas juntas con huecos, como dientes que encajan. Las dos cosas tienen la misma explicación.</p>
      <h3>¿Por qué crecen las cosas al calentarse?</h3>
      <p>Cuando algo se calienta, sus partículas se agitan más y se empujan unas a otras con más fuerza. Al moverse más, cada una necesita un poco más de espacio, y el objeto entero crece. A esto se le llama <strong>dilatación térmica</strong>. Al enfriarse pasa lo contrario: el objeto se encoge, o se contrae.</p>
      <p>El cambio es muy pequeño, casi invisible en un objeto chico. Pero en algo largo, como un puente o una vía de tren, se suma y se vuelve de varios centímetros.</p>
      <h3>¿Cuánto crece?</h3>
      <p>Una barra crece más si es más larga, porque cada pedacito crece un poco y hay más pedacitos. También crece más si se calienta más grados. Y depende del material: el aluminio crece el doble que el acero con el mismo calentamiento. Juntando todo:</p>
      <p>ΔL = α·L₀·ΔT</p>
      <p>Se lee "el cambio de largo es alfa por el largo inicial por el cambio de temperatura". ΔL es <strong>cuánto se alarga</strong>, L₀ es <strong>cuánto medía al principio</strong>, ΔT es cuántos grados se calentó, y α (alfa) es el <strong>coeficiente de dilatación</strong>: cuánto crece cada metro del material por cada grado.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Material</th><th>α (por cada °C)</th><th>Cada metro, al calentarse 10 °C, crece</th></tr>
        <tr><th>Vidrio común</th><td>0.000009</td><td>0.09 mm</td></tr>
        <tr><th>Acero</th><td>0.000012</td><td>0.12 mm</td></tr>
        <tr><th>Aluminio</th><td>0.000024</td><td>0.24 mm</td></tr>
      </table></div>
      <p>Esos números son diminutos; con notación científica, el del acero se escribe 1.2 × 10⁻⁵.</p>
      <h3>Para qué sirve saberlo</h3>
      <p>Las juntas de los puentes dejan espacio para que el concreto y el acero crezcan en verano sin romperse. En el truco del frasco, el metal de la tapa se dilata más que el vidrio, así que la tapa se afloja. Y los termómetros de líquido funcionan porque el líquido se dilata y sube por el tubo.</p>
      <h3>El agua, una excepción</h3>
      <p>El agua hace algo raro. Al enfriarse se contrae, como todo, pero solo hasta los 4 °C. De ahí hasta 0 °C empieza a crecer, y al congelarse crece todavía más, cerca de un 9%. Por eso el hielo es menos denso que el agua y flota, como viste en la unidad de fluidos, y por eso una botella llena de agua puede reventar en el congelador.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que un agujero en una placa de metal se hace más chico al calentarla. El metal crece en todas direcciones, y el agujero crece con él, como si fuera una foto ampliada.</p>`,
    ejemplo: `
      <p>Un riel de tren de acero mide 100 m en una mañana fría de 0 °C. En una tarde de verano llega a 40 °C. ¿Cuánto se alarga? Usa α = 0.000012 por °C.</p>
      <ol class="pasos-ej">
        <li>Primero encuentra cuántos grados se calentó: ΔT = 40 − 0 = 40 °C.</li>
        <li>Multiplica todo: ΔL = 0.000012 × 100 × 40.</li>
        <li>Hazlo por partes: 0.000012 × 100 = 0.0012, y 0.0012 × 40 = 0.048 m, que son 4.8 cm.</li>
        <li>Comprueba con la tabla: cada metro de acero crece 0.12 mm por cada 10 °C. Con 100 m y 40 °C son 0.12 × 100 × 4 = 48 mm, es decir, 4.8 cm.</li>
      </ol>
      <p>Resultado: <span class="resultado">4.8 cm</span>. Por eso los rieles llevan pequeños espacios entre tramo y tramo.</p>
      <p class="nota"><strong>Error común:</strong> usar la temperatura final (40) como si fuera el cambio. Aquí coinciden porque empieza en 0 °C, pero si empezara en 10 °C, el cambio sería 30 °C.</p>`,
    vidaReal: `
      <p>Que las cosas crezcan con el calor se toma en cuenta en muchas construcciones:</p>
      <ul>
        <li>Los puentes y las banquetas tienen juntas para que el material crezca en verano sin romperse.</li>
        <li>Los cables de luz cuelgan más en verano que en invierno.</li>
        <li>Un vaso de vidrio grueso puede romperse si le echas agua hirviendo de golpe.</li>
        <li>No conviene meter al congelador una botella de vidrio llena de agua.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una varilla de acero de 10 m se calienta 50 °C. ¿Cuántos milímetros se alarga? Usa α = 0.000012 por °C.</p>', respuesta: 0.000012 * 10 * 50 * 1000,
        pista: '<p>Calcula ΔL en metros con ΔL = α·L₀·ΔT y luego pásalo a milímetros.</p>',
        solucion: '<p>ΔL = 0.000012 × 10 × 50 = 0.006 m, que son <strong>6 mm</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un puente de acero mide 500 m. Entre invierno y verano su temperatura cambia 30 °C. ¿Cuántos centímetros cambia su largo? Usa α = 0.000012 por °C.</p>', respuesta: 0.000012 * 500 * 30 * 100,
        pista: '<p>Calcula ΔL en metros y multiplica por 100 para pasarlo a centímetros.</p>',
        solucion: '<p>ΔL = 0.000012 × 500 × 30 = 0.18 m, que son <strong>18 cm</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una barra de aluminio de 2 m se calienta 100 °C. ¿Cuántos milímetros se alarga? Usa α = 0.000024 por °C.</p>', respuesta: 0.000024 * 2 * 100 * 1000,
        pista: '<p>Usa ΔL = α·L₀·ΔT y pasa el resultado a milímetros.</p>',
        solucion: '<p>ΔL = 0.000024 × 2 × 100 = 0.0048 m, que son <strong>4.8 mm</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué se abre más fácil un frasco de vidrio con tapa de metal después de ponerla bajo agua caliente?</p>',
        opciones: ['Porque el vidrio se encoge', 'Porque el metal de la tapa se dilata más que el vidrio', 'Porque el agua lubrica la tapa', 'Porque el aire de adentro se enfría'], correcta: 1,
        pista: '<p>Compara cuánto crece el metal con cuánto crece el vidrio.</p>',
        solucion: '<p>El metal tiene un coeficiente de dilatación mayor que el vidrio: <strong>la tapa crece más que el frasco</strong> y se afloja.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el hielo flota en el agua?</p>',
        opciones: ['Porque está más frío', 'Porque el agua crece al congelarse, y el hielo queda menos denso que el agua', 'Porque tiene aire adentro siempre', 'Porque pesa más'], correcta: 1,
        pista: '<p>Recuerda la excepción del agua y lo que viste sobre densidad.</p>',
        solucion: '<p>Al congelarse, el agua <strong>crece cerca de un 9%</strong>. La misma masa en más volumen tiene menos densidad, así que el hielo flota.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirven las juntas con huecos que tienen los puentes cada cierto tramo?</p>',
        opciones: ['Para que el agua de lluvia escurra', 'Para dejar espacio a que el material crezca con el calor sin romperse', 'Para que suene al pasar los coches', 'Para ahorrar material'], correcta: 1,
        pista: '<p>¿Qué le pasa al largo del puente entre invierno y verano?</p>',
        solucion: '<p>El puente crece en verano y se encoge en invierno. Las juntas <strong>dejan espacio para esa dilatación</strong> sin que el material se doble o se rompa.</p>' },
    ],
    fuentes: [OSC('13-2-thermal-expansion-of-solids-and-liquids', 'Thermal Expansion of Solids and Liquids'), WIKI('Dilatación_térmica', 'Dilatación térmica'), KHAN],
  });

  // ------------------------------------------------------------------
  L('Leyes de la termodinámica', {
    objetivo: 'Conocer las leyes que gobiernan el calor y la energía, y calcular la eficiencia de una máquina.',
    explicacion: `
      <p>Un coche quema gasolina para moverse, pero su motor se calienta muchísimo. Un refrigerador enfría por dentro, pero su parte de atrás está tibia. Las reglas que explican estas cosas forman la <strong>termodinámica</strong>, la parte de la física que estudia el calor, el trabajo y la energía. Se resumen en unas pocas leyes.</p>
      <h3>Ley cero: el equilibrio</h3>
      <p>Si dos objetos están cada uno a la misma temperatura que un tercero, están a la misma temperatura entre sí. Parece obvio, pero es lo que hace funcionar a los termómetros: el termómetro llega al equilibrio térmico con tu cuerpo, y así marca tu temperatura. Se le llamó "cero" porque se formuló después de las otras, pero es la base de todas.</p>
      <h3>Primera ley: la energía no se crea ni se destruye</h3>
      <p>La energía de las partículas de un objeto, sumando toda su agitación, se llama <strong>energía interna</strong>. Si le das calor a algo, esa energía no desaparece: una parte aumenta su energía interna, y la otra puede salir como trabajo, por ejemplo empujando un pistón:</p>
      <p>Q = ΔU + W</p>
      <p>Se lee "el calor que entra es igual al aumento de energía interna más el trabajo que hace". Q es el calor que recibe, ΔU es cuánto aumenta su energía interna y W es el trabajo que hace hacia afuera. Es la misma conservación de la energía que viste en la unidad de energía, ahora incluyendo el calor.</p>
      <h3>Segunda ley: el calor tiene una dirección</h3>
      <p>Un café caliente se enfría en un cuarto, pero nunca un café tibio se calienta solo tomando calor del aire. La segunda ley dice que el calor pasa por sí solo de lo caliente a lo frío, nunca al revés.</p>
      <p>Un refrigerador sí lleva calor de adentro, que está frío, hacia afuera, que está más caliente. Pero no lo hace solo: usa un motor y gasta electricidad para lograrlo. Por eso su parte trasera se calienta.</p>
      <h3>Ninguna máquina es perfecta</h3>
      <p>De la segunda ley sale algo importante: ninguna máquina de calor, como un motor de gasolina, puede convertir todo el calor que recibe en trabajo. Siempre se pierde una parte como calor hacia el ambiente. Para medir qué tan bien aprovecha la energía una máquina se usa la <strong>eficiencia</strong>:</p>
      <p>eficiencia = ${F('trabajo útil', 'energía que recibe')} × 100</p>
      <p>Se lee "la eficiencia es el trabajo útil entre la energía que recibe, por 100". Dice qué porcentaje de la energía se aprovecha. El motor de un coche tiene una eficiencia de alrededor del 25 al 30%: de cada 100 J de la gasolina, solo unos 25 a 30 mueven el coche. El resto se va en calor por el escape y el radiador.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que con un buen diseño se puede lograr una máquina con 100% de eficiencia, o una que funcione para siempre sin recibir energía. La primera ley prohíbe sacar energía de la nada, y la segunda impide convertir todo el calor en trabajo.</p>`,
    ejemplo: `
      <p>Un motor recibe 2 000 J de energía de su combustible y hace 500 J de trabajo útil. ¿Cuál es su eficiencia y a dónde va el resto?</p>
      <ol class="pasos-ej">
        <li>Primero divide el trabajo útil entre la energía que recibe, porque así sabes qué parte se aprovecha: 500 ÷ 2 000 = 0.25.</li>
        <li>Pásalo a porcentaje multiplicando por 100: 0.25 × 100 = 25%.</li>
        <li>Para el resto, usa la primera ley: la energía no desaparece. Lo que no se volvió trabajo salió como calor: 2 000 − 500 = 1 500 J.</li>
        <li>Comprueba sumando: 500 J de trabajo más 1 500 J de calor dan los 2 000 J que entraron.</li>
      </ol>
      <p>Resultado: <span class="resultado">eficiencia del 25%; 1 500 J se van como calor</span>.</p>
      <p class="nota"><strong>Error común:</strong> dividir al revés, 2 000 ÷ 500 = 4, y decir 400%. La eficiencia nunca puede pasar del 100%.</p>`,
    vidaReal: `
      <p>Las reglas del calor y la energía están detrás de muchas decisiones:</p>
      <ul>
        <li>Al comprar un aparato, la etiqueta de ahorro de energía indica qué tanto aprovecha la electricidad.</li>
        <li>Los coches eléctricos aprovechan mucho mejor la energía que los de gasolina.</li>
        <li>No conviene dejar la puerta del refrigerador abierta: el motor trabaja más y gasta más luz.</li>
        <li>Desconfía de cualquier anuncio de una máquina que "produce energía gratis para siempre".</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una máquina recibe 1 600 J de energía y hace 400 J de trabajo útil. ¿Cuál es su eficiencia, en porcentaje?</p>', respuesta: 400 / 1600 * 100,
        pista: '<p>Divide el trabajo útil entre la energía que recibe y multiplica por 100.</p>',
        solucion: '<p>400 ÷ 1 600 = 0.25, que es una eficiencia del <strong>25%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un motor recibe 1 000 J y hace 300 J de trabajo útil. ¿Cuántos joules se pierden como calor?</p>', respuesta: 1000 - 300,
        pista: '<p>Por la primera ley, la energía que no se vuelve trabajo no desaparece.</p>',
        solucion: '<p>1 000 − 300 = <strong>700 J</strong> salen como calor hacia el ambiente.</p>' },
      { tipo: 'numero', enunciado: '<p>Un gas recibe 500 J de calor y hace 200 J de trabajo al empujar un pistón. ¿Cuánto aumenta su energía interna, en J?</p>', respuesta: 500 - 200,
        pista: '<p>Usa Q = ΔU + W y despeja ΔU.</p>',
        solucion: '<p>ΔU = Q − W = 500 − 200 = <strong>300 J</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué ley explica que un termómetro marque tu temperatura después de un rato en contacto contigo?</p>',
        opciones: ['La ley cero', 'La primera ley', 'La segunda ley', 'La ley de Newton'], correcta: 0,
        pista: '<p>¿Cuál habla de llegar a la misma temperatura?</p>',
        solucion: '<p>Es la <strong>ley cero</strong>: el termómetro y tu cuerpo llegan al equilibrio térmico, así que el termómetro queda a tu temperatura.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué dice la segunda ley sobre el calor?</p>',
        opciones: ['Que el calor pasa por sí solo de lo frío a lo caliente', 'Que el calor pasa por sí solo de lo caliente a lo frío', 'Que el calor se crea de la nada', 'Que el calor no existe'], correcta: 1,
        pista: '<p>Piensa en un café que se deja en la mesa.</p>',
        solucion: '<p>El calor pasa <strong>por sí solo de lo caliente a lo frío</strong>. Para llevarlo al revés, como hace un refrigerador, hay que gastar energía.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un inventor dice que su motor convierte el 100% del calor en trabajo. ¿Qué piensas?</p>',
        opciones: ['Es posible con buenos materiales', 'Es imposible: siempre se pierde algo de calor hacia el ambiente', 'Es posible si el motor es pequeño', 'Es posible si usa agua'], correcta: 1,
        pista: '<p>Recuerda lo que dice la segunda ley sobre las máquinas.</p>',
        solucion: '<p>Es <strong>imposible</strong>: la segunda ley dice que ninguna máquina convierte todo el calor en trabajo; siempre se va una parte al ambiente.</p>' },
    ],
    fuentes: [OSC('15-1-the-first-law-of-thermodynamics', 'The First Law of Thermodynamics'), OSC('15-3-introduction-to-the-second-law-of-thermodynamics-heat-engines-and-their-efficiency', 'Introduction to the Second Law of Thermodynamics'), WIKI('Termodinámica', 'Termodinámica'), KHAN],
  });
})();
