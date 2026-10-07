// Física · Unidad 9: Física moderna.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const F = window.fraccion;
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('fisica', titulo, datos);

  const OSC = (pagina, nombre) => ({ nombre: `OpenStax, College Physics 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/college-physics-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const PHET = (sim, nombre) => ({ nombre: `PhET, Universidad de Colorado: ${nombre}`, url: `https://phet.colorado.edu/es/simulations/${sim}` });

  // ------------------------------------------------------------------
  const MITADES = G({ x: [0, 5], y: [0, 140], funciones: [{ f: (n) => 100 * 0.5 ** n, etiqueta: 'material que queda (%)' }],
    puntos: [{ x: 0, y: 100, etiqueta: '100%' }, { x: 1, y: 50, etiqueta: '50%' }, { x: 2, y: 25, etiqueta: '25%' }, { x: 3, y: 12.5, etiqueta: '12.5%' }],
    descripcion: 'Gráfica del material radiactivo que queda contra el número de vidas medias que pasan. El eje horizontal va de 0 a 5 vidas medias y el vertical de 0 a 140 por ciento. La curva empieza en 100% y baja cada vez más despacio: 50% tras una vida media, 25% tras dos y 12.5% tras tres, acercándose a cero sin tocarlo.' });

  L('El átomo y la radiactividad', {
    objetivo: 'Describir cómo está formado un átomo, entender qué es la radiactividad y calcular cuánto material queda después de varias vidas medias.',
    explicacion: `
      <p>Si un átomo fuera tan grande como un estadio de futbol, su centro sería del tamaño de una canica en medio de la cancha, y los electrones serían polvo dando vueltas por las gradas. Casi todo el átomo es espacio vacío, y casi toda su masa está en ese centro diminuto.</p>
      <h3>¿Cómo es un átomo por dentro?</h3>
      <p>En la Unidad 8 viste que los átomos tienen protones y electrones. En el centro del átomo, llamado <strong>núcleo</strong>, están los protones, con carga positiva, y los neutrones, que no tienen carga. Alrededor se mueven los electrones, con carga negativa. El número de protones decide qué elemento es: todo átomo con 6 protones es carbono, y todo átomo con 8 es oxígeno.</p>
      <p>Pero dos átomos del mismo elemento pueden tener distinto número de neutrones. A esas versiones se les llama isótopos. Por ejemplo, el carbono común tiene 6 neutrones, y el carbono 14 tiene 8.</p>
      <h3>Núcleos que se transforman</h3>
      <p>Los protones del núcleo se repelen, porque tienen la misma carga. Lo que los mantiene juntos es una fuerza nuclear muy intensa pero de muy corto alcance. En algunos núcleos el equilibrio no es estable, y tarde o temprano se transforman en otros, soltando energía en forma de radiación. A esto se le llama <strong>radiactividad</strong>. Hay tres tipos principales de radiación, que se distinguen por lo que hace falta para detenerlas:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Radiación</th><th>Qué es</th><th>Qué la detiene</th></tr>
        <tr><th>Alfa</th><td>2 protones y 2 neutrones juntos</td><td>Una hoja de papel o la piel</td></tr>
        <tr><th>Beta</th><td>Un electrón muy rápido</td><td>Una lámina de aluminio</td></tr>
        <tr><th>Gamma</th><td>Luz de muchísima energía</td><td>Plomo grueso o concreto</td></tr>
      </table></div>
      <h3>¿Cuánto tarda en desaparecer?</h3>
      <p>No se puede saber cuándo se transformará un núcleo en particular, igual que no sabes qué moneda caerá en sol. Pero con muchísimos núcleos, el comportamiento es muy predecible: en cierto tiempo, siempre se transforma la mitad. A ese tiempo se le llama <strong>vida media</strong>. Después de una vida media queda la mitad del material; después de otra, la mitad de la mitad, y así sucesivamente:</p>
      ${MITADES}
      <p>Fíjate que la curva nunca llega a cero: cada vez queda la mitad de lo que había. Es la misma forma de decaimiento exponencial que viste en Matemáticas. Después de n vidas medias, la parte que queda es ${F(1, '2ⁿ')}: tras 3 vidas medias, ${F(1, 8)}.</p>
      <p>Cada material tiene su propia vida media: algunos, fracciones de segundo; otros, miles de millones de años. El carbono 14 tiene una vida media de unos 5 730 años. Los seres vivos lo absorben mientras viven y, al morir, se deja de renovar. Midiendo cuánto queda en un hueso o en un trozo de madera, se calcula su edad.</p>
      <h3>Para qué sirve</h3>
      <p>La radiactividad se usa en medicina para diagnosticar y tratar el cáncer, en los detectores de humo y en las plantas nucleares, que obtienen energía partiendo núcleos grandes. También es peligrosa: la radiación puede dañar las células, por eso se maneja con protección y lejos de las personas.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que después de dos vidas medias ya no queda nada. Queda la cuarta parte: la primera vida media se lleva la mitad, y la segunda, la mitad de lo que quedaba.</p>`,
    ejemplo: `
      <p>En un hospital usan yodo 131, cuya vida media es de 8 días. Si reciben 100 mg, ¿cuánto queda después de 24 días?</p>
      <ol class="pasos-ej">
        <li>Primero cuenta cuántas vidas medias pasaron: 24 ÷ 8 = 3.</li>
        <li>Ahora parte a la mitad tres veces, porque en cada vida media se transforma la mitad de lo que hay: 100 → 50 → 25 → 12.5 mg.</li>
        <li>Comprueba con la fracción: tras 3 vidas medias queda ${F(1, 8)} del original, y 100 ÷ 8 = 12.5 mg.</li>
      </ol>
      <p>Resultado: <span class="resultado">12.5 mg</span>. Por eso este yodo se usa en tratamientos: actúa unos días y luego casi desaparece.</p>
      <p class="nota"><strong>Error común:</strong> restar la mitad del original en cada paso: 100 → 50 → 0. Cada vida media quita la mitad de lo que queda en ese momento, no la mitad de lo que había al principio.</p>`,
    vidaReal: `
      <p>Lo que pasa dentro del centro de los átomos tiene usos que te pueden tocar de cerca:</p>
      <ul>
        <li>Los hospitales usan material radiactivo para encontrar y tratar algunos tipos de cáncer.</li>
        <li>Los arqueólogos saben la edad de huesos y objetos antiguos.</li>
        <li>Muchos detectores de humo de las casas funcionan con una pizca de material radiactivo.</li>
        <li>Explica por qué se usa plomo grueso para proteger a las personas cuando hay radiación de mucha energía.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tienes 80 g de un material radiactivo. ¿Cuántos gramos quedan después de 2 vidas medias?</p>', respuesta: 80 / 2 ** 2,
        pista: '<p>Parte a la mitad dos veces.</p>',
        solucion: '<p>80 → 40 → <strong>20 g</strong>. Es la cuarta parte del original.</p>' },
      { tipo: 'numero', enunciado: '<p>Una muestra tiene 1 000 núcleos radiactivos. ¿Cuántos quedan sin transformarse después de 3 vidas medias?</p>', respuesta: 1000 / 2 ** 3,
        pista: '<p>Parte a la mitad tres veces, o divide entre 2³ = 8.</p>',
        solucion: '<p>1 000 → 500 → 250 → <strong>125</strong> núcleos.</p>' },
      { tipo: 'numero', enunciado: `<p>De una muestra radiactiva queda ${F(1, 8)} del material original. ¿Cuántas vidas medias han pasado?</p>`, respuesta: 3,
        pista: '<p>¿Cuántas veces hay que partir a la mitad para llegar a un octavo?</p>',
        solucion: `<p>1 → ${F(1, 2)} → ${F(1, 4)} → ${F(1, 8)}: pasaron <strong>3 vidas medias</strong>, porque 2³ = 8.</p>` },
      { tipo: 'numero', enunciado: '<p>A un hueso le queda el 25% del carbono 14 que tenía cuando el animal vivía. La vida media del carbono 14 es de 5 730 años. ¿Cuántos años tiene el hueso?</p>', respuesta: 2 * 5730,
        pista: '<p>Primero averigua cuántas vidas medias hacen falta para llegar al 25%.</p>',
        solucion: '<p>Del 100% al 50% y del 50% al 25% son 2 vidas medias: 2 × 5 730 = <strong>11 460 años</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué tipo de radiación se detiene con una simple hoja de papel?</p>',
        opciones: ['Alfa', 'Beta', 'Gamma', 'Ninguna'], correcta: 0,
        pista: '<p>Revisa la tabla: ¿cuál es la menos penetrante?</p>',
        solucion: '<p>La radiación <strong>alfa</strong>, formada por partículas pesadas, se detiene con papel o con la piel. La gamma necesita plomo o concreto.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué partículas hay en el núcleo de un átomo?</p>',
        opciones: ['Solo electrones', 'Protones y neutrones', 'Electrones y protones', 'Solo neutrones'], correcta: 1,
        pista: '<p>Los electrones se mueven alrededor del núcleo.</p>',
        solucion: '<p>El núcleo tiene <strong>protones y neutrones</strong>. Los electrones están afuera, alrededor de él.</p>' },
    ],
    fuentes: [OSC('31-3-substructure-of-the-nucleus', 'Substructure of the Nucleus'), OSC('31-1-nuclear-radioactivity', 'Nuclear Radioactivity'), OSC('31-5-half-life-and-activity', 'Half-Life and Activity'), PHET('build-an-atom', 'Construye un átomo'), WIKI('Radiactividad', 'Radiactividad')],
  });

  // ------------------------------------------------------------------
  L('Introducción a la relatividad', {
    objetivo: 'Conocer las ideas centrales de la relatividad de Einstein: la rapidez de la luz es la misma para todos, el tiempo puede pasar distinto y la masa es una forma de energía.',
    explicacion: `
      <p>Vas en un tren muy silencioso que avanza sin sacudidas, con las cortinas cerradas. ¿Cómo sabes si se está moviendo? Si sueltas una pelota, cae igual que en tu casa. Si sirves agua, cae derecha en el vaso. Mientras el tren no frene, no acelere ni dé vuelta, no hay ningún experimento dentro que te diga si te mueves.</p>
      <h3>Todo movimiento es relativo</h3>
      <p>Galileo ya lo había notado: el movimiento depende de con qué lo compares. Para ti, sentado en el tren, tu vaso está quieto; para alguien en el andén, va a 100 km/h. Los dos tienen razón. En 1905, Albert Einstein construyó la <strong>teoría de la relatividad</strong> sobre dos ideas:</p>
      <ul>
        <li>Las leyes de la física son las mismas para todos los que se mueven a velocidad constante, sin acelerar.</li>
        <li>La luz viaja siempre a la misma rapidez, c ≈ 300 000 km/s, para todos, sin importar cómo se muevan.</li>
      </ul>
      <p>La segunda idea es muy rara. Si vas en un coche a 100 km/h y lanzas una pelota hacia adelante a 20 km/h, alguien en la calle la ve ir a 120 km/h. Pero si en una nave que va a la mitad de c enciendes una linterna hacia adelante, quien te ve desde afuera no mide 1.5 veces c: mide exactamente c. Los experimentos lo han confirmado una y otra vez.</p>
      <h3>El tiempo no es igual para todos</h3>
      <p>Para que la luz tenga la misma rapidez para todos, algo más tiene que ceder: el tiempo. Un reloj que se mueve muy rápido respecto a ti avanza más lento, visto por ti. A esto se le llama <strong>dilatación del tiempo</strong>. A velocidades de la vida diaria el efecto es diminuto, pero a velocidades cercanas a la de la luz es enorme: a un 87% de c, el reloj de la nave avanza a la mitad de ritmo.</p>
      <p>No es un truco de los relojes: el tiempo mismo pasa distinto. Si una astronauta viajara así durante lo que en la Tierra son 10 años, al volver ella habría envejecido solo 5, y su gemelo, 10. Ella es la que se mueve y da la vuelta, por eso es la que envejece menos. Además, los objetos en movimiento se ven más cortos en la dirección en que se mueven. Y nada que tenga masa puede llegar a la rapidez de la luz: haría falta energía infinita.</p>
      <p>Los satélites del GPS se mueven rápido, y eso atrasa sus relojes. Pero además están lejos de la Tierra, donde la gravedad es más débil, y allí el tiempo corre un poco más rápido. Sumados los dos efectos, sus relojes se adelantan unas decenas de millonésimas de segundo cada día. Parece nada, pero la luz recorre unos 300 metros en una millonésima de segundo, así que sin corregirlo con la relatividad el GPS se equivocaría varios kilómetros por día.</p>
      <h3>La fórmula más famosa</h3>
      <p>De la relatividad sale también que la masa es una forma de energía:</p>
      <p>E = m·c²</p>
      <p>Se lee "la energía es la masa por la rapidez de la luz al cuadrado". m es la masa, en kilogramos; c = 3 × 10⁸ m/s; y E es la energía, en joules, que equivale a esa masa. Como c² es un número gigantesco, 9 × 10¹⁶, una masa pequeñísima equivale a muchísima energía. Así funciona el Sol, y así funcionan las plantas nucleares: convierten una pequeña parte de la masa en energía.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que la relatividad solo importa en la ciencia ficción. Los efectos son pequeños en la vida diaria, pero tu celular los necesita para que el GPS te diga dónde estás.</p>`,
    ejemplo: `
      <p>¿Cuánta energía equivale a 1 gramo de masa? ¿Para cuántas casas alcanzaría durante un año, si cada una gasta 2 500 kWh al año?</p>
      <ol class="pasos-ej">
        <li>Primero pasa la masa a kilogramos, porque la fórmula usa unidades del SI: 1 g = 0.001 kg = 10⁻³ kg.</li>
        <li>Calcula c²: (3 × 10⁸)² = 9 × 10¹⁶.</li>
        <li>Multiplica: E = 10⁻³ × 9 × 10¹⁶ = 9 × 10¹³ J.</li>
        <li>Pásalo a kWh, como en la lección de potencia: 1 kWh = 3.6 × 10⁶ J, así que 9 × 10¹³ ÷ 3.6 × 10⁶ = 2.5 × 10⁷ kWh, es decir, 25 millones de kWh.</li>
        <li>Divide entre el consumo de una casa: 25 000 000 ÷ 2 500 = 10 000 casas.</li>
      </ol>
      <p>Resultado: <span class="resultado">9 × 10¹³ J, suficiente para 10 000 casas durante un año</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar la masa en gramos. Daría mil veces más energía; la fórmula pide kilogramos.</p>`,
    vidaReal: `
      <p>Las ideas de Einstein parecen lejanas, pero están en tu bolsillo y en el cielo:</p>
      <ul>
        <li>El GPS de tu celular corrige los relojes de sus satélites con estas ideas, y así no te equivoca de calle.</li>
        <li>Explican de dónde saca el Sol la energía que nos llega como luz y calor: cada segundo convierte en energía millones de toneladas de su masa.</li>
        <li>Las plantas nucleares producen electricidad aprovechando que una pizca de materia guarda muchísima energía.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Una nave viaja a la mitad de la rapidez de la luz y enciende una linterna hacia adelante. ¿A qué rapidez ve viajar esa luz alguien que está quieto afuera?</p>',
        opciones: ['1.5 veces c', 'c', 'La mitad de c', 'Depende del color de la luz'], correcta: 1,
        pista: '<p>Recuerda la segunda idea de Einstein.</p>',
        solucion: '<p>La luz viaja a la misma rapidez para todos: la ve ir a <strong>c</strong>, no a 1.5 veces c.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuánta energía equivale a 1 kg de masa, en J? Usa c = 3 × 10⁸ m/s. Puedes escribir la respuesta con notación científica, por ejemplo 5×10^16.</p>', respuesta: 1 * (3e8) ** 2, tolerancia: 0.05e16,
        pista: '<p>Usa E = m·c². Primero calcula c².</p>',
        solucion: '<p>c² = 9 × 10¹⁶, y E = 1 × 9 × 10¹⁶ = <strong>9 × 10¹⁶ J</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuánta energía equivale a 2 g de masa, en J? Usa c = 3 × 10⁸ m/s y no olvides pasar a kilogramos.</p>', respuesta: 0.002 * (3e8) ** 2, tolerancia: 0.05e14,
        pista: '<p>2 g = 0.002 kg = 2 × 10⁻³ kg.</p>',
        solucion: '<p>E = 2 × 10⁻³ × 9 × 10¹⁶ = <strong>1.8 × 10¹⁴ J</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una astronauta viaja a un 87% de la rapidez de la luz, donde su reloj avanza a la mitad del ritmo de los relojes de la Tierra. Si su viaje dura 10 años medidos en la Tierra, ¿cuántos años envejece ella?</p>', respuesta: 10 / 2,
        pista: '<p>Su tiempo pasa a la mitad de ritmo.</p>',
        solucion: '<p>Ella envejece la mitad: 10 ÷ 2 = <strong>5 años</strong>, mientras en la Tierra pasan 10.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué los satélites del GPS necesitan correcciones de la relatividad?</p>',
        opciones: ['Porque sus relojes se adelantan o atrasan por su rapidez y su altura', 'Porque la luz no llega al espacio', 'Porque los satélites son muy pesados', 'No necesitan correcciones'], correcta: 0,
        pista: '<p>Piensa en lo que le pasa al tiempo con el movimiento y con la gravedad.</p>',
        solucion: '<p><strong>Sus relojes avanzan a otro ritmo</strong> por su rapidez y por estar lejos de la gravedad terrestre. Sin corregirlo, el GPS se equivocaría kilómetros cada día.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Puede una nave con motores muy potentes llegar a la rapidez de la luz?</p>',
        opciones: ['Sí, con suficiente combustible', 'No, porque haría falta energía infinita', 'Sí, si no tiene pasajeros', 'Solo en el vacío'], correcta: 1,
        pista: '<p>¿Qué pasa con algo que tiene masa al acercarse a c?</p>',
        solucion: '<p><strong>No</strong>: para que algo con masa llegue a c haría falta energía infinita. Puede acercarse, pero nunca alcanzarla.</p>' },
    ],
    fuentes: [OSC('28-1-einsteins-postulates', "Einstein's Postulates"), OSC('28-2-simultaneity-and-time-dilation', 'Simultaneity and Time Dilation'), OSC('28-6-relativistic-energy', 'Relativistic Energy'), WIKI('Teoría_de_la_relatividad_especial', 'Teoría de la relatividad especial'), WIKI('Dilatación_del_tiempo', 'Dilatación del tiempo')],
  });

  // ------------------------------------------------------------------
  L('Introducción a la física cuántica', {
    objetivo: 'Entender que la luz y la energía llegan en paquetes, calcular la energía de un fotón con E = h·f y reconocer usos cotidianos de la física cuántica.',
    explicacion: `
      <p>Un carbón de una parrilla brilla rojo. Si calientas más un metal, pasa del rojo al naranja y al amarillo, y las estrellas más calientes se ven azuladas. ¿Por qué el color cambia con la temperatura? Explicarlo llevó a los científicos, hace poco más de cien años, a descubrir una física nueva.</p>
      <h3>La luz llega en paquetes</h3>
      <p>En 1900, Max Planck encontró que los objetos calientes no sueltan su energía en cualquier cantidad, sino en paquetes. En la Unidad 7 viste que a esos paquetes de luz se les llama <strong>fotones</strong>. La energía de cada uno depende de su frecuencia:</p>
      <p>E = h·f</p>
      <p>Se lee "la energía de un fotón es h por la frecuencia". f es la frecuencia de la luz, en hertz, y h es un número fijo diminuto llamado constante de Planck: h = 6.63 × 10⁻³⁴ J·s. Como la luz azul tiene más frecuencia que la roja, cada fotón azul lleva más energía que uno rojo. Un objeto caliente suelta luz de muchos colores a la vez. Cuanto más caliente está, más energía hay disponible para formar fotones de mucha frecuencia, así que suelta más fotones azules y su brillo se corre del rojo hacia el azul.</p>
      <p>Que la energía venga en paquetes y no en cualquier cantidad es la idea central de la <strong>física cuántica</strong>. "Cuanto" quiere decir "cantidad", y se refiere a esos paquetes.</p>
      <h3>El efecto fotoeléctrico</h3>
      <p>Cuando la luz pega en ciertos metales, puede arrancarles electrones. Lo curioso es que una luz roja muy intensa no arranca ninguno, mientras que una luz ultravioleta débil sí lo logra. Einstein lo explicó en 1905: cada electrón recibe un solo fotón a la vez. Si cada fotón no trae suficiente energía, no importa cuántos lleguen. La luz roja trae muchos fotones flojos; la ultravioleta, pocos fotones fuertes. Algo parecido ocurre en los paneles solares: la luz mueve electrones y produce corriente.</p>
      <h3>Escaleras, no rampas</h3>
      <p>Los electrones de un átomo tampoco pueden tener cualquier energía. Solo pueden estar en ciertos escalones, llamados <strong>niveles de energía</strong>, como en una escalera y no como en una rampa. Cuando un electrón baja de un escalón a otro, suelta un fotón con la energía justa de esa diferencia. Como cada elemento tiene sus propios escalones, emite sus propios colores: el sodio da el amarillo de algunas lámparas de calle, el neón da el rojo de los letreros y el cobre da el verde y el azul en los fuegos artificiales.</p>
      <h3>Un mundo extraño</h3>
      <p>En lo muy pequeño, las cosas se comportan de forma muy distinta a lo que vemos. La luz se comporta como onda y como partícula, y los electrones también. Además, no se puede conocer al mismo tiempo, con total precisión, dónde está un electrón y qué tan rápido va. A pesar de lo raro que suena, esta física es muy exacta y está en todas partes: los láseres, los LED, los transistores de los celulares y las computadoras funcionan gracias a ella.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que una luz más intensa siempre tiene fotones con más energía. La intensidad dice cuántos fotones llegan; la energía de cada uno depende solo de su frecuencia, es decir, de su color.</p>`,
    ejemplo: `
      <p>Compara la energía de un fotón de luz roja, con frecuencia 4.3 × 10¹⁴ Hz, con la de uno de luz violeta, de 7.5 × 10¹⁴ Hz. Usa h = 6.63 × 10⁻³⁴ J·s.</p>
      <ol class="pasos-ej">
        <li>Primero el rojo. Multiplica los números y suma los exponentes: 6.63 × 4.3 ≈ 28.5, y 10⁻³⁴ × 10¹⁴ = 10⁻²⁰. Queda 28.5 × 10⁻²⁰ = 2.85 × 10⁻¹⁹ J.</li>
        <li>Ahora el violeta: 6.63 × 7.5 ≈ 49.7, así que E ≈ 49.7 × 10⁻²⁰ = 4.97 × 10⁻¹⁹ J.</li>
        <li>Compara: 4.97 ÷ 2.85 ≈ 1.7. El fotón violeta trae unas 1.7 veces la energía del rojo.</li>
        <li>Comprueba con las frecuencias: 7.5 ÷ 4.3 ≈ 1.7. Como E = h·f, la energía crece igual que la frecuencia.</li>
      </ol>
      <p>Resultado: <span class="resultado">rojo, 2.85 × 10⁻¹⁹ J; violeta, 4.97 × 10⁻¹⁹ J</span>.</p>
      <p class="nota"><strong>Error común:</strong> restar los exponentes al multiplicar potencias de 10. Al multiplicar, se suman: −34 + 14 = −20.</p>`,
    vidaReal: `
      <p>Que la energía llegue en paquetes está detrás de muchos aparatos que usas:</p>
      <ul>
        <li>Los paneles solares convierten la luz del sol en electricidad, porque cada fotón le da su energía a un electrón.</li>
        <li>Los focos LED y las pantallas producen colores precisos gastando poca energía.</li>
        <li>Los lectores de códigos de barras y los apuntadores usan láseres, que sueltan fotones de un solo color.</li>
        <li>Los chips de tu celular y tu computadora dependen de ella para funcionar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué fotón lleva más energía?</p>',
        opciones: ['Uno de luz roja', 'Uno de luz azul', 'Llevan la misma energía', 'Depende de lo brillante que sea la luz'], correcta: 1,
        pista: '<p>En E = h·f, ¿cuál color tiene mayor frecuencia?</p>',
        solucion: '<p>La luz azul tiene mayor frecuencia, así que cada <strong>fotón azul</strong> lleva más energía que uno rojo.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la energía de un fotón con frecuencia de 5 × 10¹⁴ Hz, en J? Usa h = 6.63 × 10⁻³⁴ J·s y escribe la respuesta con notación científica, por ejemplo 2.5×10^-19.</p>', respuesta: 6.63e-34 * 5e14, tolerancia: 0.02e-19,
        pista: '<p>Multiplica 6.63 × 5 y suma los exponentes −34 y 14.</p>',
        solucion: '<p>6.63 × 5 = 33.15 y 10⁻³⁴ × 10¹⁴ = 10⁻²⁰, así que E = 33.15 × 10⁻²⁰ = <strong>3.315 × 10⁻¹⁹ J</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si la frecuencia de la luz se duplica, ¿por cuánto se multiplica la energía de cada fotón?</p>', respuesta: 2,
        pista: '<p>La energía es proporcional a la frecuencia.</p>',
        solucion: '<p>Como E = h·f, al duplicar f la energía se multiplica por <strong>2</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una luz roja muy intensa no arranca electrones de un metal, pero una luz ultravioleta débil sí. ¿Por qué?</p>',
        opciones: ['Porque la luz roja es más lenta', 'Porque cada fotón ultravioleta trae más energía que cada fotón rojo', 'Porque la luz débil calienta más', 'Porque el metal prefiere el color morado'], correcta: 1,
        pista: '<p>Cada electrón recibe un fotón a la vez.</p>',
        solucion: '<p>Lo que importa es la energía de <strong>cada fotón</strong>, que depende de la frecuencia. Los fotones ultravioleta traen suficiente; los rojos no, aunque lleguen muchos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el neón de un letrero da un color distinto al del sodio de una lámpara de calle?</p>',
        opciones: ['Porque los focos están pintados', 'Porque cada elemento tiene sus propios niveles de energía y emite fotones de energías distintas', 'Porque uno está más caliente', 'Porque el vidrio cambia el color'], correcta: 1,
        pista: '<p>Piensa en la escalera de energía de los electrones.</p>',
        solucion: '<p>Cada elemento tiene <strong>sus propios escalones de energía</strong>. Al bajar de uno a otro, sus electrones sueltan fotones de energías, y por tanto colores, característicos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos aparatos funciona gracias a la física cuántica?</p>',
        opciones: ['Una palanca', 'Un foco LED', 'Una polea', 'Un termómetro de líquido'], correcta: 1,
        pista: '<p>Busca el que produce luz con electrones que saltan entre niveles de energía.</p>',
        solucion: '<p>El <strong>foco LED</strong> produce luz cuando sus electrones bajan de un nivel de energía a otro, una idea cuántica.</p>' },
    ],
    fuentes: [OSC('29-1-quantization-of-energy', 'Quantization of Energy'), OSC('29-2-the-photoelectric-effect', 'The Photoelectric Effect'), OSC('30-3-bohrs-theory-of-the-hydrogen-atom', "Bohr's Theory of the Hydrogen Atom"), PHET('photoelectric', 'Efecto fotoeléctrico'), WIKI('Efecto_fotoeléctrico', 'Efecto fotoeléctrico')],
  });
})();
