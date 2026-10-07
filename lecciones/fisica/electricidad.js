// Física · Unidad 8: Electricidad y magnetismo.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const F = window.fraccion;
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('fisica', titulo, datos);
  // Flecha de un vector: línea hasta la base de la punta + triángulo sólido como punta.
  const flecha = (desde, hasta, serie = 0) => {
    const dx = hasta[0] - desde[0], dy = hasta[1] - desde[1], largo = Math.hypot(dx, dy);
    const ux = dx / largo, uy = dy / largo, h = 0.3, w = 0.15;
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
  const KHAN_CARGA = { nombre: 'Khan Academy en español: Carga eléctrica, fuerza eléctrica y voltaje', url: 'https://es.khanacademy.org/science/physics/electric-charge-electric-force-and-voltage' };
  const KHAN_CIRCUITOS = { nombre: 'Khan Academy en español: Circuitos', url: 'https://es.khanacademy.org/science/physics/circuits-topic' };
  const KHAN_MAGNETISMO = { nombre: 'Khan Academy en español: Fuerzas y campos magnéticos', url: 'https://es.khanacademy.org/science/physics/magnetic-forces-and-magnetic-fields' };
  const PHET = (sim, nombre) => ({ nombre: `PhET, Universidad de Colorado: ${nombre}`, url: `https://phet.colorado.edu/es/simulations/${sim}` });

  // ------------------------------------------------------------------
  L('Carga eléctrica', {
    objetivo: 'Entender qué es la carga eléctrica, cómo se atraen y se repelen las cargas, y por qué al frotar algo queda cargado.',
    explicacion: `
      <p>Frota un globo inflado contra tu pelo y acércalo a la pared: se queda pegado. Tu pelo se levanta y persigue al globo. A veces, al tocar la manija de una puerta después de caminar sobre una alfombra, sientes un pequeño toque. Todo esto tiene la misma causa.</p>
      <h3>¿De qué está hecha la electricidad?</h3>
      <p>Toda la materia está hecha de átomos, y los átomos tienen partículas todavía más pequeñas. Los protones, en el centro del átomo, tienen una propiedad llamada <strong>carga eléctrica</strong> positiva. Los <strong>electrones</strong>, que se mueven alrededor del centro, tienen carga negativa. Un protón y un electrón tienen exactamente la misma cantidad de carga, pero de signo contrario.</p>
      <p>Normalmente un objeto tiene tantos protones como electrones, así que sus cargas se cancelan y se dice que es neutro. Cuando tiene electrones de más, queda cargado negativamente; cuando le faltan, queda cargado positivamente.</p>
      <h3>¿Se atraen o se repelen?</h3>
      <p>Las cargas siguen una regla sencilla:</p>
      <ul>
        <li>Cargas iguales se repelen: dos positivas se empujan, y dos negativas también.</li>
        <li>Cargas opuestas se atraen: una positiva y una negativa se jalan.</li>
      </ul>
      <p>Mientras más cerca están, más fuerte es el empujón o el jalón, como verás en la siguiente lección.</p>
      <h3>¿Qué pasa al frotar?</h3>
      <p>Al frotar el globo contra tu pelo, algunos electrones pasan del pelo al globo. Los protones no se mueven, porque están bien amarrados en el centro de los átomos. Así, el globo queda con electrones de más, negativo, y tu pelo con electrones de menos, positivo. Como son cargas opuestas, se atraen. Y cada pelo queda positivo como sus vecinos, así que se repelen entre sí y se paran.</p>
      <p>Fíjate en algo importante: frotar no crea carga, solo la cambia de lugar. Lo que el globo ganó, el pelo lo perdió. La carga total nunca cambia; a esto se le llama conservación de la carga.</p>
      <h3>Conductores y aislantes</h3>
      <p>En algunos materiales, como los metales, los electrones se mueven con facilidad de un lugar a otro: son conductores eléctricos. En otros, como el plástico, el vidrio o el hule, los electrones casi no se pueden mover: son aislantes. Por eso los cables son de cobre por dentro y de plástico por fuera.</p>
      <p>La carga se mide en <strong>coulombs</strong> (C), en honor al francés Charles de Coulomb. Un coulomb es muchísima carga: hacen falta unos 6 trillones de electrones (6.25 × 10¹⁸) para juntarlo, porque cada electrón tiene apenas 1.6 × 10⁻¹⁹ C.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que al frotar se crean cargas, o que lo que se mueve son las cargas positivas. Lo que pasa de un objeto a otro son los electrones, y la carga total se conserva.</p>`,
    ejemplo: `
      <p>Frotas un globo neutro contra tu pelo, también neutro, y 1 000 electrones pasan del pelo al globo. ¿Qué carga tiene cada uno, contada en electrones, y por qué se atraen?</p>
      <ol class="pasos-ej">
        <li>Primero piensa en el globo: estaba neutro y ganó 1 000 electrones. Ahora tiene 1 000 cargas negativas de más: su carga es de −1 000 electrones.</li>
        <li>Ahora el pelo: estaba neutro y perdió esos 1 000 electrones. Sus protones no se movieron, así que le sobran 1 000 cargas positivas: +1 000.</li>
        <li>Una carga es negativa y la otra positiva, así que se atraen.</li>
        <li>Comprueba la conservación: −1 000 + 1 000 = 0, igual que antes de frotar, cuando los dos eran neutros.</li>
      </ol>
      <p>Resultado: <span class="resultado">globo con −1 000 y pelo con +1 000; se atraen</span>.</p>
      <p class="nota"><strong>Error común:</strong> decir que el pelo quedó positivo porque "ganó protones". Los protones no se mueven; el pelo quedó positivo porque perdió electrones.</p>`,
    vidaReal: `
      <p>Las cargas que se pasan de un objeto a otro explican sorpresas cotidianas:</p>
      <ul>
        <li>Los toques que sientes al tocar una manija o a otra persona en días secos.</li>
        <li>La ropa que sale pegada de la secadora y chisporrotea al separarla.</li>
        <li>Las impresoras láser usan cargas para pegar la tinta en polvo sobre el papel.</li>
        <li>En las gasolineras se recomienda tocar algo metálico antes de cargar, para descargarte.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Dos objetos tienen carga negativa. ¿Qué pasa si los acercas?</p>',
        opciones: ['Se atraen', 'Se repelen', 'No pasa nada', 'Se vuelven neutros'], correcta: 1,
        pista: '<p>Recuerda la regla de las cargas iguales.</p>',
        solucion: '<p>Las cargas iguales <strong>se repelen</strong>, así que los objetos se empujan.</p>' },
      { tipo: 'opciones', enunciado: '<p>Al frotar un globo con tu pelo, el globo gana electrones. ¿Qué carga queda en el globo?</p>',
        opciones: ['Positiva', 'Negativa', 'Neutra', 'Depende del color del globo'], correcta: 1,
        pista: '<p>¿Qué carga tienen los electrones?</p>',
        solucion: '<p>Los electrones son negativos, así que el globo, con electrones de más, queda <strong>negativo</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un objeto tiene 5 protones y 8 electrones. ¿Cuál es su carga total, contada en unidades de la carga de un electrón? Usa signo negativo si es negativa.</p>', respuesta: 5 - 8,
        pista: '<p>Cada protón suma +1 y cada electrón suma −1.</p>',
        solucion: '<p>5 − 8 = <strong>−3</strong>: tiene 3 electrones de más, así que su carga es negativa.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un cable eléctrico es de cobre por dentro y de plástico por fuera. ¿Por qué?</p>',
        opciones: ['El cobre aísla y el plástico conduce', 'El cobre conduce la electricidad y el plástico la aísla', 'Los dos conducen', 'Es solo por estética'], correcta: 1,
        pista: '<p>¿En qué material se mueven fácilmente los electrones?</p>',
        solucion: '<p>El <strong>cobre conduce</strong>, porque sus electrones se mueven fácilmente, y el <strong>plástico aísla</strong> para que la corriente no pase a tu mano.</p>' },
      { tipo: 'numero', enunciado: '<p>Cada electrón tiene una carga de 1.6 × 10⁻¹⁹ C. ¿Cuántos electrones hacen falta para juntar 1 C? Puedes escribir la respuesta con notación científica, por ejemplo 2×10^18.</p>', respuesta: 1 / 1.6e-19, tolerancia: 0.05e18,
        pista: '<p>Divide 1 C entre la carga de un electrón.</p>',
        solucion: '<p>1 ÷ (1.6 × 10⁻¹⁹) = <strong>6.25 × 10¹⁸</strong> electrones, más de seis trillones.</p>' },
      { tipo: 'opciones', enunciado: '<p>Al frotar dos objetos neutros, ¿se crea carga eléctrica?</p>',
        opciones: ['Sí, se crea carga positiva en los dos', 'No, solo pasan electrones de uno al otro y la carga total sigue siendo cero', 'Sí, se crea carga negativa en los dos', 'Solo si los objetos son de metal'], correcta: 1,
        pista: '<p>Lo que uno gana, ¿de dónde sale?</p>',
        solucion: '<p><strong>No se crea carga</strong>: los electrones pasan de un objeto al otro, y la carga total sigue siendo cero.</p>' },
    ],
    fuentes: [OSC('18-1-static-electricity-and-charge-conservation-of-charge', 'Static Electricity and Charge'), OSC('18-2-conductors-and-insulators', 'Conductors and Insulators'), PHET('balloons-and-static-electricity', 'Globos y electricidad estática'), WIKI('Carga_eléctrica', 'Carga eléctrica')],
  });

  // ------------------------------------------------------------------
  L('Ley de Coulomb', {
    objetivo: 'Calcular la fuerza entre dos cargas con la ley de Coulomb y predecir cómo cambia con las cargas y con la distancia.',
    explicacion: `
      <p>Acerca un globo cargado a unos pedacitos de papel. Desde lejos no pasa nada; al acercarlo, de pronto saltan hacia él. La fuerza entre cargas existe siempre, pero crece muchísimo al acercarlas.</p>
      <h3>¿De qué depende la fuerza entre dos cargas?</h3>
      <p>En 1785, Charles de Coulomb midió con mucho cuidado cómo se empujan y se jalan dos esferas cargadas. Encontró dos cosas. Primero, que la fuerza es mayor mientras más carga tienen. Segundo, que disminuye muy rápido al alejarlas. Lo resumió en la <strong>ley de Coulomb</strong>:</p>
      <p>F = k · ${F('q₁ · q₂', 'r²')}</p>
      <p>Se lee "la fuerza es k por la primera carga por la segunda carga, entre la distancia al cuadrado". q₁ y q₂ son <strong>las cargas</strong>, en coulombs; r es <strong>la distancia entre ellas</strong>, en metros; y k es un número fijo llamado <strong>constante de Coulomb</strong>:</p>
      <p>k = 9 × 10⁹ N·m²/C²</p>
      <p>Es un número enorme: 9 000 millones. Si las cargas son del mismo signo, la fuerza las separa; si son de signo contrario, las junta.</p>
      <h3>Se parece a la gravedad</h3>
      <p>¿Te recuerda a algo? Es casi igual a la ley de gravitación universal de la Unidad 3, con cargas en lugar de masas. Por eso se comporta igual:</p>
      <ul>
        <li>Si una carga se duplica, la fuerza se duplica, porque las cargas multiplican arriba.</li>
        <li>Si la distancia se duplica, la fuerza baja a la cuarta parte, porque la distancia está al cuadrado abajo: 2² = 4. Al triple de distancia, a la novena parte.</li>
      </ul>
      <p>Con números pequeños se ve claro: si a 1 m de distancia dos cargas se empujan con una fuerza F, a 2 m se empujan con F ÷ 4, a 3 m con F ÷ 9 y a medio metro con 4 × F. Cada vez que acercas las cargas a la mitad de distancia, la fuerza se vuelve cuatro veces mayor.</p>
      <p>Pero hay dos diferencias importantes. La gravedad siempre atrae; la fuerza eléctrica puede atraer o repeler. Y la fuerza eléctrica es muchísimo más fuerte: entre un protón y un electrón, la atracción eléctrica es unas 10³⁹ veces mayor que la gravitacional. Si no lo notamos en la vida diaria es porque casi todo es neutro, con cargas positivas y negativas que se cancelan.</p>
      <h3>Cargas pequeñas</h3>
      <p>Como un coulomb es muchísima carga, en la vida diaria se usan cargas de millonésimas de coulomb, llamadas microcoulombs (μC): 1 μC = 1 × 10⁻⁶ C. Un globo frotado tiene apenas una fracción de microcoulomb, y aun así levanta papelitos.</p>
      <p class="nota"><strong>Trampa común:</strong> olvidar elevar la distancia al cuadrado. Al doble de distancia, la fuerza no baja a la mitad, sino a la cuarta parte.</p>`,
    ejemplo: `
      <p>Dos esferitas tienen cada una 2 μC (2 × 10⁻⁶ C) y están a 0.3 m de distancia. ¿Con qué fuerza se repelen?</p>
      <ol class="pasos-ej">
        <li>Primero multiplica las cargas, porque van arriba en la fórmula: (2 × 10⁻⁶) × (2 × 10⁻⁶) = 4 × 10⁻¹².</li>
        <li>Luego eleva la distancia al cuadrado: 0.3² = 0.09.</li>
        <li>Junta todo: F = 9 × 10⁹ × 4 × 10⁻¹² ÷ 0.09. Primero 9 × 4 = 36 y 10⁹ × 10⁻¹² = 10⁻³, así que arriba quedan 0.036. Luego 0.036 ÷ 0.09 = 0.4 N.</li>
        <li>Comprueba el tamaño: 0.4 N es el peso de unos 40 gramos. Para cargas tan pequeñas es bastante, porque k es enorme.</li>
      </ol>
      <p>Resultado: <span class="resultado">0.4 N de repulsión</span>, porque las dos cargas son del mismo signo.</p>
      <p class="nota"><strong>Error común:</strong> dividir entre 0.3 en lugar de entre 0.3² = 0.09. Daría una fuerza tres veces más chica.</p>`,
    vidaReal: `
      <p>El empujón y el jalón entre cargas está detrás de muchas cosas, aunque no lo veas:</p>
      <ul>
        <li>Mantiene unidos los átomos y las moléculas de todo lo que existe, incluido tu cuerpo.</li>
        <li>Los filtros de aire de algunas fábricas cargan el polvo para atraparlo.</li>
        <li>Explica por qué el plástico de cocina se pega solo a los recipientes.</li>
        <li>Las fotocopiadoras usan cargas para colocar el polvo de tinta exactamente donde va.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Dos cargas se atraen con cierta fuerza. Si una de ellas se duplica y la distancia no cambia, ¿por cuánto se multiplica la fuerza?</p>', respuesta: 2,
        pista: '<p>Las cargas multiplican arriba en la fórmula.</p>',
        solucion: '<p>La fuerza es proporcional a cada carga, así que se multiplica por <strong>2</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si la distancia entre dos cargas se triplica, ¿entre cuánto se divide la fuerza?</p>', respuesta: 3 ** 2,
        pista: '<p>La distancia está al cuadrado.</p>',
        solucion: '<p>3² = 9, así que la fuerza se divide entre <strong>9</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Las dos cargas se duplican y la distancia también se duplica. ¿Por cuánto se multiplica la fuerza?</p>', respuesta: 2 * 2 / 2 ** 2,
        pista: '<p>Calcula por separado lo que hacen las cargas arriba y la distancia abajo.</p>',
        solucion: '<p>Las cargas multiplican por 2 × 2 = 4 y la distancia divide entre 2² = 4: 4 ÷ 4 = <strong>1</strong>, la fuerza no cambia.</p>' },
      { tipo: 'numero', enunciado: '<p>Dos cargas de 1 × 10⁻⁶ C están a 1 m de distancia. ¿Con qué fuerza se repelen, en N? Usa k = 9 × 10⁹.</p>', respuesta: 9e9 * 1e-6 * 1e-6 / 1 ** 2, tolerancia: 0.00005,
        pista: '<p>Multiplica las cargas, divide entre 1² y multiplica por k.</p>',
        solucion: '<p>10⁻⁶ × 10⁻⁶ = 10⁻¹², y 9 × 10⁹ × 10⁻¹² = <strong>0.009 N</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una carga de 3 × 10⁻⁶ C y otra de 2 × 10⁻⁶ C están a 0.1 m. ¿Con qué fuerza se empujan o se jalan, en N? Usa k = 9 × 10⁹.</p>', respuesta: 9e9 * 3e-6 * 2e-6 / 0.1 ** 2, tolerancia: 0.005,
        pista: '<p>Multiplica las cargas, eleva 0.1 al cuadrado (0.01) y junta todo con k.</p>',
        solucion: '<p>Las cargas dan 6 × 10⁻¹²; por k da 0.054; entre 0.01 da <strong>5.4 N</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿En qué se diferencia la fuerza eléctrica de la gravedad?</p>',
        opciones: ['La eléctrica no depende de la distancia', 'La eléctrica puede atraer o repeler; la gravedad siempre atrae', 'La gravedad es mucho más fuerte', 'No hay ninguna diferencia'], correcta: 1,
        pista: '<p>Piensa en qué pasa con dos cargas del mismo signo.</p>',
        solucion: '<p>La fuerza eléctrica <strong>puede atraer o repeler</strong>, según los signos. La gravedad siempre atrae. Además, la eléctrica es muchísimo más fuerte.</p>' },
    ],
    fuentes: [OSC('18-3-coulombs-law', "Coulomb's Law"), PHET('coulombs-law', 'Ley de Coulomb'), WIKI('Ley_de_Coulomb', 'Ley de Coulomb'), KHAN_CARGA],
  });

  // ------------------------------------------------------------------
  const CIRCUITO = diagrama([-2, 6.4], [-0.8, 4.2], [
    raya([0, 1], [0, 0], [4, 0], [4, 1.2]), raya([4, 2], [4, 3], [2.4, 3]), raya([1.6, 3], [0, 3], [0, 2]),
    caja(-0.3, 1, 0.3, 2), txt(-1.1, 1.5, 'pila'),
    { tipo: 'circulo', x: 2, y: 3, r: 0.4 }, txt(2, 3.75, 'foco'),
    { tipo: 'linea', desde: [4, 1.2], hasta: [4.55, 1.9] }, txt(5.3, 1.1, 'interruptor'), txt(5.3, 0.65, 'abierto'),
  ], 'Un circuito sencillo: un cable forma un rectángulo que une una pila, a la izquierda, con un foco, arriba. En el lado derecho, el cable tiene un interruptor abierto: un tramo inclinado que no toca el otro extremo, así que el camino está cortado y el foco está apagado.');

  L('Corriente, voltaje y resistencia', {
    objetivo: 'Entender qué son la corriente, el voltaje y la resistencia, y qué necesita un circuito para funcionar.',
    explicacion: `
      <p>Presionas el interruptor y se enciende el foco. Parece instantáneo y mágico, pero adentro de los cables pasa algo muy parecido a lo que pasa con el agua en las tuberías de tu casa.</p>
      <h3>¿Qué es la corriente?</h3>
      <p>En un cable de cobre hay muchísimos electrones que se pueden mover. Cuando se les empuja, avanzan todos juntos por el cable, como el agua por una manguera. A ese flujo de carga se le llama <strong>corriente eléctrica</strong>, y se mide por cuánta carga pasa en cada segundo:</p>
      <p>I = ${F('Q', 't')}</p>
      <p>Se lee "la corriente es la carga entre el tiempo". I es <strong>cuánta carga pasa cada segundo</strong>, Q es la carga en coulombs y t el tiempo en segundos. Su unidad es el ampere (A): 1 A es 1 coulomb cada segundo. Un foco LED usa menos de 0.1 A; un horno de microondas, unos 10 A.</p>
      <h3>¿Qué empuja a los electrones?</h3>
      <p>El agua de un tinaco baja por las tuberías porque está más alta: hay una diferencia de altura que la empuja. En un circuito, lo que empuja a los electrones es el <strong>voltaje</strong>: la energía que recibe cada coulomb de carga para recorrer el circuito. Se mide en volts (V). Una pila AA da 1.5 V, la batería de un coche 12 V y un enchufe de casa en México, unos 127 V; en otros países, 220 o 240 V.</p>
      <p>Cuando pones pilas en fila, una detrás de otra, sus voltajes se suman: un control remoto con dos pilas de 1.5 V funciona con 3 V.</p>
      <h3>¿Qué se opone a la corriente?</h3>
      <p>Una manguera delgada deja pasar menos agua que una gruesa. En la electricidad, la <strong>resistencia</strong> mide qué tanto se opone un material al paso de la corriente. Se mide en ohms (Ω). Los cables de cobre tienen poquísima resistencia; el filamento de un foco antiguo o la resistencia de una plancha tienen mucha, y por eso se calientan.</p>
      <h3>¿Qué necesita un circuito?</h3>
      ${CIRCUITO}
      <p>Un circuito es un camino cerrado por donde circula la corriente: sale de la pila, pasa por el foco y regresa a la pila. Si el camino se corta en cualquier punto, por ejemplo al abrir un interruptor, la corriente se detiene en todo el circuito, y el foco se apaga. Un interruptor solo abre o cierra ese camino.</p>
      <p>La pila no "fabrica" electrones: los electrones ya están en los cables. La pila les da el empujón, la energía, para que circulen.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que la corriente "se gasta" en el foco y regresa menos a la pila. La corriente es la misma en todo el camino; lo que el foco aprovecha es la energía que traen las cargas, no las cargas mismas.</p>`,
    ejemplo: `
      <p>Un celular se carga con una corriente de 2 A durante una hora. ¿Cuánta carga recibió su batería?</p>
      <ol class="pasos-ej">
        <li>Primero pasa el tiempo a segundos, porque el ampere es coulombs por segundo: 1 hora = 60 × 60 = 3 600 s.</li>
        <li>Despeja la carga de I = Q ÷ t: si cada segundo pasan 2 C, en total pasan Q = I × t.</li>
        <li>Multiplica: Q = 2 × 3 600 = 7 200 C.</li>
        <li>Comprueba al revés: 7 200 C repartidos en 3 600 s dan 7 200 ÷ 3 600 = 2 C por segundo, es decir, 2 A.</li>
      </ol>
      <p>Resultado: <span class="resultado">7 200 C</span>.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar 2 × 1 = 2 C usando la hora sin convertir. El ampere cuenta coulombs por segundo, así que el tiempo va en segundos.</p>`,
    vidaReal: `
      <p>Entender cómo circula la electricidad te ayuda a usarla con cuidado:</p>
      <ul>
        <li>Al cambiar un foco, conviene apagar el interruptor para cortar el camino de la electricidad.</li>
        <li>Las etiquetas de los cargadores dicen cuántos volts y amperes entregan.</li>
        <li>Un aparato de otro país puede dañarse si lo conectas a un enchufe con otro voltaje.</li>
        <li>Al poner pilas, sumar varias da más empuje para aparatos que lo necesitan.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Por un cable pasan 10 C en 2 s. ¿Cuál es la corriente, en A?</p>', respuesta: 10 / 2,
        pista: '<p>Divide la carga entre el tiempo.</p>',
        solucion: '<p>I = 10 ÷ 2 = <strong>5 A</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un foco usa 0.5 A durante 60 s. ¿Cuánta carga pasó por él, en C?</p>', respuesta: 0.5 * 60,
        pista: '<p>Cada segundo pasan 0.5 C. ¿Cuántos segundos son?</p>',
        solucion: '<p>Q = 0.5 × 60 = <strong>30 C</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>En un circuito con una pila y un foco, abres el interruptor. ¿Qué pasa?</p>',
        opciones: ['El foco brilla más', 'El foco se apaga porque el camino se corta', 'La pila se descarga más rápido', 'El foco sigue igual'], correcta: 1,
        pista: '<p>¿Qué necesita la corriente para circular?</p>',
        solucion: '<p>Al abrir el interruptor, el camino ya no es cerrado y la corriente se detiene: <strong>el foco se apaga</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>En la comparación con el agua en las tuberías, ¿a qué se parece el voltaje?</p>',
        opciones: ['Al grosor del tubo', 'A la diferencia de altura que empuja el agua', 'A la cantidad de agua que pasa cada segundo', 'Al color del agua'], correcta: 1,
        pista: '<p>El voltaje es lo que empuja a las cargas.</p>',
        solucion: '<p>El voltaje es como <strong>la diferencia de altura</strong> que empuja el agua. La cantidad de agua por segundo sería la corriente, y el grosor del tubo, la resistencia.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas pilas de 1.5 V tienes que poner en fila para obtener 6 V?</p>', respuesta: 6 / 1.5,
        pista: '<p>En fila, los voltajes se suman.</p>',
        solucion: '<p>6 ÷ 1.5 = <strong>4 pilas</strong>: 1.5 + 1.5 + 1.5 + 1.5 = 6 V.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué material tiene menos resistencia?</p>',
        opciones: ['Hule', 'Plástico', 'Cobre', 'Madera seca'], correcta: 2,
        pista: '<p>¿Con qué material se hacen los cables por dentro?</p>',
        solucion: '<p>El <strong>cobre</strong>, un metal, deja pasar la corriente con muy poca resistencia. Los demás son aislantes.</p>' },
    ],
    fuentes: [OSC('20-1-current', 'Current'), PHET('circuit-construction-kit-dc', 'Kit de construcción de circuitos: CD'), WIKI('Corriente_eléctrica', 'Corriente eléctrica'), KHAN_CIRCUITOS],
  });

  // ------------------------------------------------------------------
  L('Ley de Ohm', {
    objetivo: 'Usar la ley de Ohm, V = I·R, para calcular el voltaje, la corriente o la resistencia de un circuito.',
    explicacion: `
      <p>Si abres más la llave de una manguera, sale más agua. Si pisas la manguera, sale menos. Con la electricidad pasa algo parecido: más voltaje empuja más corriente, y más resistencia la frena. Hay una regla muy sencilla que une las tres cosas.</p>
      <h3>¿Cómo se relacionan?</h3>
      <p>Imagina un foco conectado a una pila. Si duplicas el voltaje, poniendo dos pilas en fila, la corriente también se duplica. Si en cambio usas un foco con el doble de resistencia, la corriente baja a la mitad. El físico alemán Georg Ohm encontró esta relación en 1827, y se conoce como <strong>ley de Ohm</strong>:</p>
      <p>I = ${F('V', 'R')}</p>
      <p>Se lee "la corriente es el voltaje entre la resistencia". Tiene sentido: el voltaje empuja, así que va arriba, y la resistencia frena, así que va abajo. Casi siempre se escribe de esta otra forma:</p>
      <p>V = I·R</p>
      <p>Se lee "el voltaje es la corriente por la resistencia". V va en volts, I en amperes y R en ohms. Con esta fórmula, si conoces dos de los tres datos, encuentras el tercero.</p>
      <p>Para no confundirte, fíjate en lo que buscas. Si buscas el voltaje, multiplicas la corriente por la resistencia. Si buscas la corriente o la resistencia, divides: el voltaje siempre es el número de arriba, porque es el que empuja. Y revisa siempre las unidades: volts, amperes y ohms, no miliamperes ni kilohms, o el resultado saldrá mal.</p>
      <h3>Despejar con números pequeños</h3>
      <ul>
        <li>Una resistencia de 10 Ω con una corriente de 2 A necesita V = 2 × 10 = 20 V.</li>
        <li>Una pila de 12 V conectada a 4 Ω da I = 12 ÷ 4 = 3 A.</li>
        <li>Si 9 V producen 0.3 A, la resistencia es R = 9 ÷ 0.3 = 30 Ω.</li>
      </ul>
      <p>Un ohm es la resistencia que deja pasar 1 A cuando se le aplica 1 V. Por eso a veces se dice que un ohm es un volt por ampere.</p>
      <h3>¿Por qué importa para tu seguridad?</h3>
      <p>Lo que daña al cuerpo en un choque eléctrico es la corriente que pasa por él. Una corriente de apenas 0.1 A a través del pecho puede ser mortal. Con la piel seca, el cuerpo tiene una resistencia alta, de decenas de miles de ohms, y la corriente es pequeña. Pero con la piel mojada, la resistencia baja muchísimo, a unos pocos miles de ohms o menos. Con el mismo voltaje, la corriente se vuelve muchas veces mayor. Por eso nunca debes tocar aparatos eléctricos con las manos mojadas o dentro de la regadera.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que, si un foco tiene mucha resistencia, por él pasa mucha corriente porque "trabaja más". Es al revés: con el mismo voltaje, más resistencia significa menos corriente.</p>`,
    ejemplo: `
      <p>Un foco antiguo se conecta a un enchufe de 127 V y tiene una resistencia de 254 Ω. ¿Qué corriente pasa por él?</p>
      <ol class="pasos-ej">
        <li>Primero identifica qué conoces: el voltaje, V = 127 V, y la resistencia, R = 254 Ω. Buscas la corriente. Las unidades ya son volts y ohms, así que no hay que convertir nada.</li>
        <li>Despeja la corriente: el voltaje empuja y la resistencia frena, así que I = V ÷ R.</li>
        <li>Divide: I = 127 ÷ 254 = 0.5 A.</li>
        <li>Comprueba con V = I·R: 0.5 × 254 = 127 V, el voltaje del enchufe.</li>
      </ol>
      <p>Resultado: <span class="resultado">0.5 A</span>. Tiene sentido: es más o menos la corriente que usa un foco antiguo de unos 60 W.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar 127 × 254. Daría más de 32 000, un número absurdo para la corriente de un foco. Si el voltaje y la resistencia son datos, se divide.</p>`,
    vidaReal: `
      <p>Saber cómo se relacionan el empujón, el flujo y el freno de la electricidad te sirve para:</p>
      <ul>
        <li>Entender por qué es peligroso usar aparatos con las manos mojadas o cerca del agua.</li>
        <li>Elegir el cargador adecuado para un aparato y no dañarlo.</li>
        <li>Comprender por qué los cables muy delgados se calientan si pasa mucha corriente.</li>
        <li>Reparar o armar circuitos sencillos en proyectos de electrónica.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Por una resistencia de 10 Ω pasa una corriente de 2 A. ¿Qué voltaje tiene, en V?</p>', respuesta: 2 * 10,
        pista: '<p>Usa V = I·R.</p>',
        solucion: '<p>V = 2 × 10 = <strong>20 V</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una batería de 12 V se conecta a una resistencia de 4 Ω. ¿Qué corriente pasa, en A?</p>', respuesta: 12 / 4,
        pista: '<p>Divide el voltaje entre la resistencia.</p>',
        solucion: '<p>I = 12 ÷ 4 = <strong>3 A</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una pila de 9 V produce una corriente de 0.3 A en un aparato. ¿Cuál es la resistencia del aparato, en Ω?</p>', respuesta: 9 / 0.3,
        pista: '<p>Despeja R de V = I·R.</p>',
        solucion: '<p>R = 9 ÷ 0.3 = <strong>30 Ω</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una plancha conectada a 127 V usa una corriente de 12.7 A. ¿Cuál es su resistencia, en Ω?</p>', respuesta: 127 / 12.7,
        pista: '<p>R = V ÷ I.</p>',
        solucion: '<p>R = 127 ÷ 12.7 = <strong>10 Ω</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Si duplicas el voltaje y la resistencia no cambia, ¿qué pasa con la corriente?</p>',
        opciones: ['Se reduce a la mitad', 'Se duplica', 'No cambia', 'Se cuadruplica'], correcta: 1,
        pista: '<p>En I = V ÷ R, el voltaje va arriba.</p>',
        solucion: '<p>El voltaje está arriba en I = V ÷ R, así que si se duplica, la corriente <strong>se duplica</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con la piel mojada, la resistencia de una persona puede bajar a 1 000 Ω. Si toca un cable de 127 V, ¿qué corriente pasaría por su cuerpo, en A?</p>', respuesta: 127 / 1000, tolerancia: 0.003,
        pista: '<p>Usa I = V ÷ R.</p>',
        solucion: '<p>I = 127 ÷ 1 000 = <strong>0.127 A</strong>. Supera los 0.1 A que pueden ser mortales, por eso el agua y la electricidad no se mezclan.</p>' },
    ],
    fuentes: [OSC('20-2-ohms-law-resistance-and-simple-circuits', "Ohm's Law: Resistance and Simple Circuits"), PHET('ohms-law', 'Ley de Ohm'), WIKI('Ley_de_Ohm', 'Ley de Ohm'), KHAN_CIRCUITOS],
  });

  // ------------------------------------------------------------------
  const SERIE = diagrama([-2, 7], [-0.8, 4.4], [
    raya([0, 2], [0, 3], [0.8, 3]), raya([2.4, 3], [3.6, 3]), raya([5.2, 3], [6, 3], [6, 0], [0, 0], [0, 1]),
    caja(-0.3, 1, 0.3, 2), txt(-1.1, 1.5, 'pila: 12 V'),
    caja(0.8, 2.7, 2.4, 3.3), txt(1.6, 3.85, 'R₁ = 4 Ω'),
    caja(3.6, 2.7, 5.2, 3.3), txt(4.4, 3.85, 'R₂ = 6 Ω'),
  ], 'Circuito en serie: una pila de 12 V y dos resistencias, una de 4 Ω y otra de 6 Ω, conectadas una detrás de otra en un solo camino cerrado.');
  const PARALELO = diagrama([-2, 7], [-0.8, 4], [
    raya([0, 2], [0, 3], [5, 3], [5, 2.1]), raya([0, 1], [0, 0], [5, 0], [5, 0.9]),
    raya([2.5, 0], [2.5, 0.9]), raya([2.5, 2.1], [2.5, 3]),
    caja(-0.3, 1, 0.3, 2), txt(-1.1, 1.5, 'pila: 12 V'),
    caja(2.2, 0.9, 2.8, 2.1), txt(3.4, 1.5, '6 Ω'),
    caja(4.7, 0.9, 5.3, 2.1), txt(5.9, 1.5, '3 Ω'),
  ], 'Circuito en paralelo: una pila de 12 V, a la izquierda, con dos caminos separados. En el del centro hay una resistencia de 6 Ω y en el de la derecha una de 3 Ω. Cada resistencia está conectada directamente a los dos lados de la pila.');

  L('Circuitos en serie y en paralelo', {
    objetivo: 'Distinguir los circuitos en serie de los circuitos en paralelo y calcular su resistencia total y sus corrientes.',
    explicacion: `
      <p>Antes, en algunas series de foquitos navideños, si se fundía un solo foco se apagaba toda la serie, y había que probar foco por foco. En tu casa, en cambio, si se funde el foco de la cocina, el refrigerador y la televisión siguen funcionando. La diferencia está en cómo están conectados.</p>
      <h3>En serie: un solo camino</h3>
      ${SERIE}
      <p>En un circuito en <strong>serie</strong>, los aparatos se conectan uno detrás de otro, en un solo camino. La corriente que sale de la pila tiene que pasar por todos, así que es la misma en cada uno. Si uno se rompe, el camino se corta y todos se apagan, como los foquitos navideños antiguos.</p>
      <p>Como la corriente tiene que atravesar todas las resistencias, una tras otra, sus frenos se suman:</p>
      <p>R = R₁ + R₂</p>
      <p>Se lee "la resistencia total es la suma de las resistencias". En el dibujo, R = 4 + 6 = 10 Ω, y por la ley de Ohm la corriente es I = 12 ÷ 10 = 1.2 A.</p>
      <h3>En paralelo: varios caminos</h3>
      ${PARALELO}
      <p>En un circuito en <strong>paralelo</strong>, cada aparato tiene su propio camino conectado a los dos lados de la pila. Por eso todos reciben el mismo voltaje, y si uno se apaga, los demás siguen funcionando. Así está conectada tu casa: cada aparato recibe los 127 V del enchufe.</p>
      <p>Cada camino lleva su propia corriente, y la corriente total que sale de la pila es la suma de todas. En el dibujo: por la de 6 Ω pasan 12 ÷ 6 = 2 A, y por la de 3 Ω pasan 12 ÷ 3 = 4 A. En total, 6 A.</p>
      <p>Fíjate en algo curioso: al agregar un camino, pasa más corriente en total, así que la resistencia total baja. Es como abrir más cajas en el súper: la fila avanza más rápido. Para calcularla se usa:</p>
      <p>${F(1, 'R')} = ${F(1, 'R₁')} + ${F(1, 'R₂')}</p>
      <p>Se lee "uno entre la resistencia total es uno entre la primera más uno entre la segunda". En el dibujo: ${F(1, 6)} + ${F(1, 3)} = ${F(1, 6)} + ${F(2, 6)} = ${F(3, 6)} = ${F(1, 2)}, así que R = 2 Ω. Comprueba: 12 V ÷ 2 Ω = 6 A, igual que la suma de las corrientes. Un atajo útil: dos resistencias iguales en paralelo dan la mitad de una de ellas.</p>
      <p class="nota"><strong>Trampa común:</strong> sumar las resistencias en paralelo como si estuvieran en serie. En paralelo, la resistencia total siempre es menor que la más pequeña de ellas.</p>`,
    ejemplo: `
      <p>Una pila de 12 V alimenta dos resistencias de 6 Ω y 3 Ω. ¿Qué corriente total sale de la pila si están en serie? ¿Y si están en paralelo?</p>
      <ol class="pasos-ej">
        <li>Primero, en serie. Las resistencias se suman, porque la corriente atraviesa las dos: R = 6 + 3 = 9 Ω. La corriente es I = 12 ÷ 9 ≈ 1.33 A.</li>
        <li>Ahora, en paralelo. Cada resistencia recibe los 12 V completos: por la de 6 Ω pasan 2 A y por la de 3 Ω pasan 4 A. La pila entrega 2 + 4 = 6 A.</li>
        <li>Comprueba el paralelo con la fórmula: ${F(1, 6)} + ${F(1, 3)} = ${F(1, 2)}, así que R = 2 Ω, y 12 ÷ 2 = 6 A.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 1.33 A en serie y 6 A en paralelo</span>. En paralelo sale mucha más corriente, porque hay más caminos.</p>
      <p class="nota"><strong>Error común:</strong> pensar que en paralelo cada resistencia recibe la mitad del voltaje. En paralelo, cada camino recibe el voltaje completo de la pila.</p>`,
    vidaReal: `
      <p>Cómo se conectan los aparatos decide si funcionan juntos o por separado:</p>
      <ul>
        <li>En tu casa, los contactos están conectados de forma que cada aparato funciona aunque otro se apague.</li>
        <li>Conectar demasiados aparatos en una sola extensión puede calentarla, porque las corrientes se suman.</li>
        <li>Las linternas suelen poner las pilas una detrás de otra para sumar su empuje.</li>
        <li>Explica por qué ya casi no hay series navideñas que se apagan completas por un foco.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tres resistencias de 3 Ω, 5 Ω y 2 Ω están en serie. ¿Cuál es la resistencia total, en Ω?</p>', respuesta: 3 + 5 + 2,
        pista: '<p>En serie, las resistencias se suman.</p>',
        solucion: '<p>R = 3 + 5 + 2 = <strong>10 Ω</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un circuito en serie tiene una resistencia total de 10 Ω y una pila de 20 V. ¿Qué corriente pasa, en A?</p>', respuesta: 20 / 10,
        pista: '<p>Usa la ley de Ohm con la resistencia total.</p>',
        solucion: '<p>I = 20 ÷ 10 = <strong>2 A</strong>, la misma en cada resistencia.</p>' },
      { tipo: 'numero', enunciado: '<p>Dos resistencias de 8 Ω están en paralelo. ¿Cuál es la resistencia total, en Ω?</p>', respuesta: 1 / (1 / 8 + 1 / 8),
        pista: '<p>Dos resistencias iguales en paralelo dan la mitad de una.</p>',
        solucion: `<p>${F(1, 8)} + ${F(1, 8)} = ${F(2, 8)} = ${F(1, 4)}, así que R = <strong>4 Ω</strong>, la mitad de 8.</p>` },
      { tipo: 'numero', enunciado: '<p>Dos resistencias de 4 Ω y 12 Ω están en paralelo. ¿Cuál es la resistencia total, en Ω?</p>', respuesta: 1 / (1 / 4 + 1 / 12),
        pista: '<p>Usa 1 ÷ R = 1 ÷ 4 + 1 ÷ 12. Busca un denominador común.</p>',
        solucion: `<p>${F(1, 4)} + ${F(1, 12)} = ${F(3, 12)} + ${F(1, 12)} = ${F(4, 12)} = ${F(1, 3)}, así que R = <strong>3 Ω</strong>.</p>` },
      { tipo: 'numero', enunciado: '<p>Una pila de 12 V alimenta dos resistencias en paralelo, de 6 Ω y 4 Ω. ¿Qué corriente total sale de la pila, en A?</p>', respuesta: 12 / 6 + 12 / 4,
        pista: '<p>Calcula la corriente de cada camino con los 12 V completos y súmalas.</p>',
        solucion: '<p>Por la de 6 Ω pasan 12 ÷ 6 = 2 A, y por la de 4 Ω pasan 12 ÷ 4 = 3 A. En total, <strong>5 A</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué los aparatos de una casa se conectan en paralelo?</p>',
        opciones: ['Para que la corriente sea la misma en todos', 'Para que cada uno reciba el voltaje completo y funcione aunque otro se apague', 'Para que gasten menos energía', 'Para que la resistencia total sea mayor'], correcta: 1,
        pista: '<p>Piensa qué pasa en cada tipo de circuito cuando se apaga un aparato.</p>',
        solucion: '<p>En paralelo, <strong>cada aparato recibe el voltaje completo y tiene su propio camino</strong>: si uno se apaga, los demás siguen funcionando.</p>' },
    ],
    fuentes: [OSC('21-1-resistors-in-series-and-parallel', 'Resistors in Series and Parallel'), PHET('circuit-construction-kit-dc', 'Kit de construcción de circuitos: CD'), WIKI('Circuito_en_serie', 'Circuito en serie'), WIKI('Circuito_en_paralelo', 'Circuito en paralelo')],
  });

  // ------------------------------------------------------------------
  L('Potencia eléctrica y cómo leer tu recibo de luz', {
    objetivo: 'Calcular la potencia de un aparato con P = V·I, estimar su consumo en kilowatts-hora y entender cómo se calcula el recibo de luz.',
    explicacion: `
      <p>Cada cierto tiempo llega el recibo de luz con un número que a veces sorprende. ¿Qué aparatos de tu casa son los que más gastan? Con lo que ya sabes de potencia y de corriente puedes calcularlo tú mismo.</p>
      <h3>¿Cuánta energía usa un aparato cada segundo?</h3>
      <p>En la Unidad 4 viste que la potencia es la energía por segundo, medida en watts. En un aparato eléctrico, el voltaje es la energía que trae cada coulomb, y la corriente es cuántos coulombs pasan cada segundo. Al multiplicarlos, obtienes la energía que llega cada segundo:</p>
      <p>P = V·I</p>
      <p>Se lee "la potencia es el voltaje por la corriente". Una plancha conectada a 127 V que usa 10 A tiene una potencia de 127 × 10 = 1 270 W. Casi todos los aparatos traen escrita su potencia en una etiqueta, por detrás o por debajo.</p>
      <h3>De watts a kilowatts-hora</h3>
      <p>Como viste en la lección de potencia, la compañía de luz no cobra por watts, sino por energía, en kilowatts-hora (kWh): un kWh es la energía que usa un aparato de 1 kW en una hora. Para saber cuánto gasta un aparato, multiplica su potencia en kilowatts por las horas que lo usas:</p>
      <p>energía (kWh) = potencia (kW) × tiempo (h)</p>
      <p>Una televisión de 100 W (0.1 kW) encendida 5 horas al día usa 0.1 × 5 = 0.5 kWh al día, y 0.5 × 30 = 15 kWh al mes.</p>
      <h3>¿Cómo se lee el recibo?</h3>
      <p>Tu casa tiene un <strong>medidor</strong> que va sumando los kilowatts-hora que usas, como el odómetro de un coche. El recibo muestra la lectura anterior y la actual; tu consumo es la diferencia entre las dos. Si el medidor marcaba 12 450 y ahora marca 12 630, consumiste 180 kWh en ese periodo.</p>
      <p>Muchas compañías cobran con una <strong>tarifa escalonada</strong>: los primeros kilowatts-hora son más baratos y, si consumes más, los siguientes cuestan más. Por ejemplo, una tarifa podría cobrar los primeros 150 kWh a $1 cada uno y los demás a $1.50. Estos precios son solo un ejemplo; revisa los de tu recibo, que cambian según el país, la región y la temporada.</p>
      <h3>Los aparatos "vampiro"</h3>
      <p>Muchos aparatos siguen usando energía aunque estén "apagados": televisiones, cargadores y microondas con reloj. Gastan poco cada uno, unos cuantos watts, pero están conectados todo el día, todos los días. A ese gasto se le llama <strong>consumo en espera</strong>. Imagina un aparato que gasta 10 W en espera todo el mes: usa 10 × 24 × 30 = 7 200 Wh, es decir, 7.2 kWh.</p>
      <p class="nota"><strong>Trampa común:</strong> olvidar pasar los watts a kilowatts. Si multiplicas 100 W × 5 h, obtienes 500 Wh, que son 0.5 kWh, no 500 kWh.</p>`,
    ejemplo: `
      <p>Un mes, tu medidor pasa de 12 450 a 12 630 kWh. Tu compañía cobra los primeros 150 kWh a $1 y los demás a $1.50. ¿Cuánto pagas por la energía?</p>
      <ol class="pasos-ej">
        <li>Primero calcula tu consumo: la diferencia entre las lecturas, 12 630 − 12 450 = 180 kWh.</li>
        <li>Separa el consumo en escalones: los primeros 150 kWh van a la tarifa barata, y los 180 − 150 = 30 kWh restantes a la cara.</li>
        <li>Calcula cada parte: 150 × 1 = $150 y 30 × 1.50 = $45.</li>
        <li>Suma: 150 + 45 = $195. Comprueba que tenga sentido: si todo fuera a $1 serían $180; pagas un poco más porque te pasaste del primer escalón.</li>
      </ol>
      <p>Resultado: <span class="resultado">$195</span>, con esta tarifa de ejemplo.</p>
      <p class="nota"><strong>Error común:</strong> cobrar todo el consumo a la tarifa más cara, 180 × 1.50 = $270. Solo los kilowatts-hora que pasan del escalón se cobran al precio alto.</p>`,
    vidaReal: `
      <p>Saber cuánto gasta cada aparato te ayuda a cuidar tu dinero:</p>
      <ul>
        <li>Puedes revisar tu recibo y comprobar que el consumo cobrado coincida con tu medidor.</li>
        <li>Desconectar cargadores y aparatos que no usas reduce gastos escondidos.</li>
        <li>Al comprar un aparato nuevo, puedes comparar cuánto te costará usarlo cada mes.</li>
        <li>Evitar pasarte de cierto consumo puede mantenerte en la tarifa más barata.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un aparato conectado a 127 V usa una corriente de 2 A. ¿Cuál es su potencia, en W?</p>', respuesta: 127 * 2,
        pista: '<p>Usa P = V·I.</p>',
        solucion: '<p>P = 127 × 2 = <strong>254 W</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un calentador de 1 000 W se usa 3 horas. ¿Cuántos kWh consume?</p>', respuesta: 1 * 3,
        pista: '<p>Pasa los watts a kilowatts y multiplica por las horas.</p>',
        solucion: '<p>1 000 W = 1 kW, y 1 × 3 = <strong>3 kWh</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu medidor marcaba 12 450 kWh y ahora marca 12 630 kWh. ¿Cuántos kWh consumiste?</p>', respuesta: 12630 - 12450,
        pista: '<p>Resta la lectura anterior de la actual.</p>',
        solucion: '<p>12 630 − 12 450 = <strong>180 kWh</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con una tarifa de ejemplo que cobra los primeros 150 kWh a $1 y los demás a $2, ¿cuánto pagas por 200 kWh?</p>', respuesta: 150 * 1 + (200 - 150) * 2,
        pista: '<p>Separa los primeros 150 kWh del resto.</p>',
        solucion: '<p>150 × 1 = $150, y los 50 kWh restantes cuestan 50 × 2 = $100. En total, <strong>$250</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un aparato en espera usa 10 W las 24 horas durante 30 días. ¿Cuántos kWh consume en el mes?</p>', respuesta: 10 * 24 * 30 / 1000,
        pista: '<p>Calcula los watts-hora y divide entre 1 000 para pasarlos a kWh.</p>',
        solucion: '<p>10 × 24 × 30 = 7 200 Wh, que son <strong>7.2 kWh</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una plancha de 1 270 W se conecta a 127 V. ¿Qué corriente usa, en A?</p>', respuesta: 1270 / 127,
        pista: '<p>Despeja la corriente de P = V·I.</p>',
        solucion: '<p>I = P ÷ V = 1 270 ÷ 127 = <strong>10 A</strong>.</p>' },
    ],
    fuentes: [OSC('20-4-electric-power-and-energy', 'Electric Power and Energy'), WIKI('Potencia_eléctrica', 'Potencia eléctrica'), KHAN_CIRCUITOS],
  });

  // ------------------------------------------------------------------
  // Líneas de campo de un imán de barra: medias elipses de N (derecha) a S (izquierda).
  const lineaCampo = (a, b, arriba) => ({ tipo: 'poligono', abierto: true,
    puntos: Array.from({ length: 31 }, (_, i) => { const t = (Math.PI * i) / 30; return [a * Math.cos(t), (arriba ? 1 : -1) * b * Math.sin(t)]; }) });
  const IMAN = diagrama([-3.4, 3.4], [-2.6, 2.6], [
    lineaCampo(1.05, 0.9, true), lineaCampo(1.1, 1.7, true), lineaCampo(1.05, 0.9, false), lineaCampo(1.1, 1.7, false),
    ...flecha([0.3, 0.9], [-0.3, 0.9]), ...flecha([0.3, 1.7], [-0.3, 1.7]), ...flecha([0.3, -0.9], [-0.3, -0.9]), ...flecha([0.3, -1.7], [-0.3, -1.7]),
    caja(-1, -0.3, 0, 0.3), caja(0, -0.3, 1, 0.3), txt(-0.5, -0.1, 'S'), txt(0.5, -0.1, 'N'),
    txt(0, 2.2, 'líneas de campo'),
  ], 'Un imán de barra con el polo norte, N, a la derecha y el polo sur, S, a la izquierda. Alrededor hay cuatro líneas curvas, dos arriba y dos abajo, que salen del polo norte y entran al polo sur, con el texto "líneas de campo" encima. Unas flechas sobre las líneas indican que van de norte a sur por fuera del imán.');

  L('Imanes y magnetismo', {
    objetivo: 'Reconocer los polos de un imán, cómo se atraen y se repelen, qué es el campo magnético y por qué funciona una brújula.',
    explicacion: `
      <p>Los imanes del refrigerador sostienen tus fotos y recados sin pegamento. Una brújula apunta casi siempre hacia el norte, estés donde estés. Si juntas dos imanes, a veces se pegan con fuerza y otras veces se empujan y no hay forma de juntarlos. Todo esto se llama magnetismo.</p>
      <h3>Los polos de un imán</h3>
      <p>Todo imán tiene dos extremos donde su fuerza es más intensa, llamados <strong>polos</strong>: el polo norte y el polo sur. Se parecen a las cargas eléctricas en su regla:</p>
      <ul>
        <li>Polos iguales se repelen: norte con norte, o sur con sur, se empujan.</li>
        <li>Polos distintos se atraen: un norte y un sur se jalan.</li>
      </ul>
      <p>Pero hay una diferencia importante con las cargas. Si partes un imán por la mitad, no obtienes un norte por un lado y un sur por otro: obtienes dos imanes más chicos, cada uno con su propio norte y su propio sur. Por más que lo partas, nunca encontrarás un polo solo.</p>
      <h3>¿Qué atrae un imán?</h3>
      <p>Un imán atrae con fuerza al hierro, al níquel, al cobalto y a muchos aceros. No atrae al cobre, al aluminio, al plástico ni a la madera. Por eso un imán sirve para separar las latas de acero de las de aluminio en un centro de reciclaje.</p>
      <h3>El campo magnético</h3>
      <p>Un imán actúa sin tocar: atrae un clip a través de una hoja de papel. Alrededor de él hay una zona donde se sienten sus efectos, llamada <strong>campo magnético</strong>. Se puede ver espolvoreando limaduras de hierro sobre un papel encima del imán: se acomodan en líneas curvas que salen de un polo y llegan al otro.</p>
      ${IMAN}
      <p>Esas líneas se llaman líneas de campo. Por convención, por fuera del imán van del polo norte al polo sur. Donde están más juntas, cerca de los polos, el campo es más fuerte.</p>
      <h3>La Tierra es un imán</h3>
      <p>Dentro de la Tierra hay hierro fundido en movimiento que la convierte en un imán gigante. La aguja de una brújula es un imancito que gira libremente y se alinea con el campo de la Tierra: su polo norte apunta hacia el norte geográfico. Como los opuestos se atraen, eso significa que cerca del norte geográfico hay, en realidad, un polo sur magnético.</p>
      <p>El campo magnético de la Tierra también nos protege de partículas que llegan del Sol, y cerca de los polos esas partículas producen las auroras, luces de colores en el cielo nocturno.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que un imán atrae a cualquier metal. Una moneda de cobre o una lata de aluminio no se pegan a un imán; solo unos pocos metales, como el hierro, el níquel y el cobalto, son atraídos con fuerza.</p>`,
    ejemplo: `
      <p>Tienes dos imanes de barra iguales. Acercas el extremo izquierdo de uno al extremo derecho del otro y se atraen. Luego volteas el segundo imán. ¿Qué pasa ahora?</p>
      <ol class="pasos-ej">
        <li>Primero piensa qué significa que se atrajeran: los polos que se tocaban eran distintos, uno norte y uno sur.</li>
        <li>Al voltear el segundo imán, cambias el polo que queda enfrente: si antes era sur, ahora es norte, o al revés.</li>
        <li>Ahora quedan frente a frente dos polos iguales, así que se repelen.</li>
        <li>Comprueba: si vuelves a voltearlo, quedarán otra vez polos distintos y se atraerán de nuevo. Así puedes saber qué extremos son iguales sin ver las letras del imán: los que se empujan son iguales, los que se jalan son distintos.</li>
      </ol>
      <p>Resultado: <span class="resultado">ahora se repelen</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que un imán solo puede atraer. Dos imanes también pueden empujarse, cuando se enfrentan polos iguales.</p>`,
    vidaReal: `
      <p>Los imanes están en más lugares de los que imaginas:</p>
      <ul>
        <li>Una brújula te ayuda a orientarte en el campo cuando no hay señal de celular.</li>
        <li>Las puertas de muchos refrigeradores cierran bien gracias a una tira de imán.</li>
        <li>En los centros de reciclaje se separan las latas de acero con imanes enormes.</li>
        <li>Las bocinas y los audífonos usan imanes para producir sonido.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Acercas el polo norte de un imán al polo norte de otro. ¿Qué pasa?</p>',
        opciones: ['Se atraen', 'Se repelen', 'No pasa nada', 'Se vuelven un solo imán'], correcta: 1,
        pista: '<p>¿Los polos son iguales o distintos?</p>',
        solucion: '<p>Polos iguales <strong>se repelen</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Partes un imán de barra por la mitad. ¿Qué obtienes?</p>',
        opciones: ['Un polo norte solo y un polo sur solo', 'Dos imanes, cada uno con su norte y su sur', 'Dos pedazos sin magnetismo', 'Un imán y un pedazo de hierro'], correcta: 1,
        pista: '<p>Nunca se ha encontrado un polo solo.</p>',
        solucion: '<p>Obtienes <strong>dos imanes más chicos</strong>, cada uno con su polo norte y su polo sur.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos objetos atrae un imán?</p>',
        opciones: ['Una moneda de cobre', 'Una lata de aluminio', 'Un clip de acero', 'Una regla de plástico'], correcta: 2,
        pista: '<p>Solo algunos metales, como el hierro y muchos aceros, son atraídos.</p>',
        solucion: '<p>El <strong>clip de acero</strong>, que tiene hierro. El cobre, el aluminio y el plástico no son atraídos.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la zona alrededor de un imán donde se sienten sus efectos?</p>',
        respuestas: ['campo magnético', 'el campo magnético', 'campo'],
        pista: '<p>Se puede ver con limaduras de hierro.</p>',
        solucion: '<p>Es el <strong>campo magnético</strong>, que se dibuja con líneas que van del polo norte al polo sur.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué la aguja de una brújula apunta hacia el norte?</p>',
        opciones: ['Porque el norte es más frío', 'Porque es un imancito que se alinea con el campo magnético de la Tierra', 'Porque la jala la Luna', 'Porque el aire sopla hacia el norte'], correcta: 1,
        pista: '<p>La Tierra se comporta como un imán gigante.</p>',
        solucion: '<p>La aguja es <strong>un imancito que se alinea con el campo magnético de la Tierra</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>El polo norte de una brújula apunta hacia el norte geográfico. ¿Qué polo magnético hay entonces cerca del norte geográfico?</p>',
        opciones: ['Un polo norte magnético', 'Un polo sur magnético', 'Ninguno', 'Los dos'], correcta: 1,
        pista: '<p>Los polos distintos se atraen.</p>',
        solucion: '<p>Como el norte de la aguja es atraído hacia allá, cerca del norte geográfico hay <strong>un polo sur magnético</strong>.</p>' },
    ],
    fuentes: [OSC('22-1-magnets', 'Magnets'), PHET('magnets-and-electromagnets', 'Imanes y electroimanes'), WIKI('Magnetismo', 'Magnetismo'), KHAN_MAGNETISMO],
  });

  // ------------------------------------------------------------------
  L('Electromagnetismo e inducción', {
    objetivo: 'Entender que la electricidad produce magnetismo y que el magnetismo en movimiento produce electricidad, y cómo se usa en motores, generadores y transformadores.',
    explicacion: `
      <p>En 1820, durante una clase, el profesor danés Hans Christian Oersted notó algo inesperado: al hacer pasar corriente por un cable, la aguja de una brújula cercana se movió. La electricidad estaba produciendo magnetismo. Ese descubrimiento unió dos fenómenos que parecían distintos.</p>
      <h3>La corriente produce magnetismo</h3>
      <p>Todo cable con corriente crea un campo magnético a su alrededor. Si enrollas el cable en muchas vueltas, como un resorte, los campos de cada vuelta se suman y se forma un imán. Si además pones un clavo de hierro adentro, el efecto se multiplica. A este imán hecho con corriente se le llama <strong>electroimán</strong>.</p>
      <p>Su gran ventaja es que se puede encender y apagar: funciona solo mientras pasa la corriente. Por eso las grúas de los deshuesaderos levantan coches con un electroimán y los sueltan al cortar la corriente. Los timbres, las cerraduras eléctricas y las bocinas también usan electroimanes.</p>
      <h3>Motores eléctricos</h3>
      <p>Un motor eléctrico aprovecha que los imanes se atraen y se repelen. En un motor sencillo, dentro hay una bobina con corriente, que funciona como electroimán, entre imanes fijos. Los imanes la empujan y la hacen girar. Justo antes de que se quede quieta, un contacto invierte la corriente, los polos de la bobina se cambian y el empujón continúa. Así la bobina gira sin parar. Licuadoras, ventiladores y coches eléctricos usan el mismo principio, con distintos diseños: convierten energía eléctrica en movimiento.</p>
      <h3>El magnetismo en movimiento produce electricidad</h3>
      <p>Si la electricidad produce magnetismo, ¿se puede hacer al revés? En 1831, el inglés Michael Faraday descubrió que sí, con una condición: el campo magnético tiene que cambiar. Si metes y sacas un imán de una bobina de cable, aparece una corriente en la bobina. Si dejas el imán quieto adentro, no pasa nada. A esto se le llama <strong>inducción electromagnética</strong>.</p>
      <p>Así funcionan los generadores de las plantas eléctricas: el agua de una presa, el vapor o el viento hacen girar imanes junto a bobinas enormes, y se produce la electricidad que llega a tu casa. Es lo contrario de un motor: convierte movimiento en energía eléctrica. El dinamo que enciende la luz de una bicicleta al pedalear es un generador pequeño.</p>
      <h3>Transformadores</h3>
      <p>La corriente de tu casa es alterna: invierte su dirección más de cien veces por segundo, así que su campo magnético cambia sin parar. Por eso un transformador no funciona con una pila, cuya corriente siempre va en el mismo sentido. Un <strong>transformador</strong> aprovecha eso para cambiar el voltaje. Tiene dos bobinas en el mismo núcleo de hierro: la corriente de la primera induce corriente en la segunda. El voltaje cambia según el número de vueltas de cada una:</p>
      <p>${F('V₂', 'V₁')} = ${F('N₂', 'N₁')}</p>
      <p>Se lee "el voltaje de salida entre el de entrada es igual a las vueltas de salida entre las de entrada". Si la segunda bobina tiene la décima parte de vueltas, el voltaje baja a la décima parte. Los cargadores de celular tienen un transformador que baja los 127 V del enchufe a unos pocos volts.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que un imán quieto dentro de una bobina produce corriente. Solo hay corriente mientras el campo magnético cambia: al mover el imán, al moverse la bobina o al cambiar la corriente.</p>`,
    ejemplo: `
      <p>Un transformador tiene 1 270 vueltas en la bobina de entrada y 50 en la de salida. Si se conecta a 127 V, ¿qué voltaje entrega?</p>
      <ol class="pasos-ej">
        <li>Primero compara las vueltas, porque el voltaje cambia en la misma proporción: 50 ÷ 1 270 = ${F(50, 1270)} = ${F(5, 127)}.</li>
        <li>Multiplica el voltaje de entrada por esa fracción: V₂ = 127 × ${F(5, 127)} = 5 V.</li>
        <li>Comprueba la proporción al revés: 127 ÷ 5 = 25.4 y 1 270 ÷ 50 = 25.4. El voltaje y las vueltas se redujeron igual.</li>
      </ol>
      <p>Resultado: <span class="resultado">5 V</span>, el voltaje que usan muchos cargadores de celular.</p>
      <p class="nota"><strong>Error común:</strong> invertir la fracción y obtener un voltaje mayor. Si la bobina de salida tiene menos vueltas, el voltaje de salida debe ser menor.</p>`,
    vidaReal: `
      <p>Que la electricidad y el magnetismo se produzcan uno al otro mueve buena parte del mundo moderno:</p>
      <ul>
        <li>Casi toda la electricidad que usas se produce haciendo girar imanes junto a bobinas.</li>
        <li>Los motores de licuadoras, ventiladores, lavadoras y coches eléctricos funcionan con imanes y corriente.</li>
        <li>Los cargadores inalámbricos pasan energía al celular sin cables.</li>
        <li>Los postes de luz tienen aparatos que bajan el voltaje antes de que llegue a tu casa.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un transformador tiene 100 vueltas en la entrada y 1 000 en la salida. Si entran 12 V, ¿cuántos volts salen?</p>', respuesta: 12 * 1000 / 100,
        pista: '<p>El voltaje cambia en la misma proporción que las vueltas.</p>',
        solucion: '<p>La salida tiene 10 veces más vueltas, así que el voltaje es 10 veces mayor: 12 × 10 = <strong>120 V</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Quieres bajar 127 V a 12.7 V con un transformador que tiene 500 vueltas en la entrada. ¿Cuántas vueltas necesita la bobina de salida?</p>', respuesta: 500 * 12.7 / 127,
        pista: '<p>El voltaje baja a la décima parte. ¿Qué pasa con las vueltas?</p>',
        solucion: '<p>12.7 es la décima parte de 127, así que las vueltas también: 500 ÷ 10 = <strong>50 vueltas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tienes una bobina conectada a un medidor de corriente. ¿En qué caso aparece corriente?</p>',
        opciones: ['Con un imán quieto dentro de la bobina', 'Al meter o sacar un imán de la bobina', 'Sin ningún imán cerca', 'Con un pedazo de madera dentro'], correcta: 1,
        pista: '<p>La inducción necesita que el campo magnético cambie.</p>',
        solucion: '<p>Solo hay corriente <strong>mientras el imán se mueve</strong>, porque así cambia el campo magnético dentro de la bobina.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué ventaja tiene un electroimán sobre un imán común?</p>',
        opciones: ['Atrae plástico', 'Se puede encender y apagar', 'No necesita electricidad', 'Atrae cualquier metal'], correcta: 1,
        pista: '<p>Piensa en las grúas de los deshuesaderos.</p>',
        solucion: '<p>Un electroimán <strong>se puede encender y apagar</strong> con la corriente: así la grúa levanta el coche y luego lo suelta.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué hace un generador eléctrico?</p>',
        opciones: ['Convierte energía eléctrica en movimiento', 'Convierte movimiento en energía eléctrica', 'Crea energía de la nada', 'Almacena electricidad como una pila'], correcta: 1,
        pista: '<p>Es lo contrario de un motor.</p>',
        solucion: '<p>Un generador <strong>convierte movimiento en energía eléctrica</strong>, haciendo girar imanes junto a bobinas. Un motor hace lo contrario.</p>' },
      { tipo: 'opciones', enunciado: '<p>Oersted vio que una brújula se movía cerca de un cable con corriente. ¿Qué demostró?</p>',
        opciones: ['Que la brújula estaba rota', 'Que la corriente eléctrica produce magnetismo', 'Que los imanes producen calor', 'Que la Tierra no es un imán'], correcta: 1,
        pista: '<p>¿Qué movió a la aguja?</p>',
        solucion: '<p>Demostró que <strong>la corriente eléctrica produce un campo magnético</strong>, capaz de mover la aguja de una brújula.</p>' },
    ],
    fuentes: [OSC('22-2-ferromagnets-and-electromagnets', 'Ferromagnets and Electromagnets'), OSC('23-1-induced-emf-and-magnetic-flux', 'Induced Emf and Magnetic Flux'), OSC('23-7-transformers', 'Transformers'), PHET('faradays-electromagnetic-lab', 'Laboratorio electromagnético de Faraday'), WIKI('Inducción_electromagnética', 'Inducción electromagnética')],
  });
})();
