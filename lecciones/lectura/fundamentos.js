// Lectura · Unidad 1: Fundamentos.
// Formato de cada lección: ver .claude/docs/formato-leccion.md. Revisar con: node verificar.js
// Los datos de las fuentes van con su país y su año; las cifras de los ejemplos son de ejemplo.
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('lectura', titulo, datos);
  // Flecha: línea hasta la base de la punta + triángulo sólido como punta.
  const flecha = (desde, hasta, serie = 0, escala = 1) => {
    const dx = hasta[0] - desde[0], dy = hasta[1] - desde[1], largo = Math.hypot(dx, dy);
    const ux = dx / largo, uy = dy / largo, h = 0.35 * escala, w = 0.17 * escala;
    const base = [hasta[0] - h * ux, hasta[1] - h * uy];
    return [
      { tipo: 'linea', desde, hasta: base, serie },
      { tipo: 'poligono', puntos: [hasta, [base[0] - w * uy, base[1] + w * ux], [base[0] + w * uy, base[1] - w * ux]], solido: true, serie },
    ];
  };
  const txt = (x, y, texto) => ({ tipo: 'texto', x, y, texto });
  const caja = (x0, y0, x1, y1) => ({ tipo: 'poligono', puntos: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], relleno: true });
  const diagrama = (x, y, figuras, descripcion) => G({ x, y, figuras, descripcion, proporcional: true, ejes: false });

  const NLT = { nombre: 'National Literacy Trust (Inglaterra): Children and young people’s reading in 2026 (en inglés)', url: 'https://literacytrust.org.uk/documents/7740/Children_and_young_peoples_reading_in_2026_z2Ft1gt.pdf' };
  const BOOKTRUST = { nombre: 'BookTrust (Reino Unido): Getting children reading (en inglés)', url: 'https://booktrust.org.uk/' };
  const ALA = { nombre: 'American Library Association (Estados Unidos): Literacy (en inglés)', url: 'https://www.ala.org/advocacy/literacy' };
  const CBC = { nombre: 'Ministerio de Educación de la Nación (Argentina): CBC, Educación General Básica, Lengua', url: 'https://cfe.educacion.gob.ar/documentos/cbc/egb/lengua.pdf' };

  // Ciclo del hábito: señal → rato de lectura → recompensa → vuelta a la señal.
  const CICLO = diagrama([0, 12], [0, 8], [
    caja(0.4, 5.8, 5.4, 7.6), txt(2.9, 7.0, '1. Señal'), txt(2.9, 6.3, 'la misma hora cada día'),
    caja(6.6, 5.8, 11.6, 7.6), txt(9.1, 7.0, '2. Lectura'), txt(9.1, 6.3, '15 o 20 minutos'),
    caja(6.6, 0.4, 11.6, 2.2), txt(9.1, 1.6, '3. Recompensa'), txt(9.1, 0.9, 'algo que te apetezca'),
    caja(0.4, 0.4, 5.4, 2.2), txt(2.9, 1.6, '4. Otra vez'), txt(2.9, 0.9, 'marca la casilla'),
    ...flecha([5.4, 6.7], [6.6, 6.7], 0, 1.2),
    ...flecha([9.1, 5.8], [9.1, 2.2], 0, 1.2),
    ...flecha([6.6, 1.3], [5.4, 1.3], 0, 1.2),
    ...flecha([2.9, 2.2], [2.9, 5.8], 0, 1.2),
  ], 'Diagrama de un ciclo de cuatro pasos. Arriba a la izquierda, la caja 1, Señal: la misma hora cada día. Arriba a la derecha, la caja 2, Lectura: quince o veinte minutos. Abajo a la derecha, la caja 3, Recompensa: algo que te apetezca. Abajo a la izquierda, la caja 4, Otra vez: marca la casilla. Las flechas van en ese orden y vuelven de la cuarta caja a la primera.');

  // ------------------------------------------------------------------
  L('Por qué leer', {
    objetivo: 'Saber para qué sirve leer: para aprender cosas que no sabrías de otro modo, para tener palabras exactas y para entender mejor a la gente.',
    explicacion: `
      <p>Empieza por una pregunta. Dime algo que sabes y que nunca vas a ver con tus ojos: cómo se aparea una ballena o cómo era una ciudad hace mil años. Si sabes la respuesta, la leíste. Leer es la única forma de meterte en la cabeza de otra persona sin hablar con ella.</p>
      <p>¿Para qué sirve leer? Para tres cosas muy concretas.</p>
      <p>La primera es saber cosas que de otro modo no sabrías. Un libro te lleva a un país, a un siglo o a un oficio al que nunca llegarás. En Inglaterra (2026), el National Literacy Trust preguntó a jóvenes de 8 a 18 años y el 85,2 % de quienes leían por gusto y al menos una vez por semana dijeron que leer les ayudaba a aprender cosas nuevas, y el 64,6 % que les ayudaba a ir mejor en el colegio. La American Library Association (Estados Unidos) coincide: leer y usar la información es esencial en una sociedad global.</p>
      <p>La segunda es tener palabras exactas para lo que piensas y lo que sientes. A eso se le llama <strong>vocabulario</strong> (<span lang="en">vocabulary</span>): las palabras que entiendes y que usas. Cuando te enredas al explicar algo, falta la palabra exacta, no la idea, y leer te la da. En el mismo sondeo de Inglaterra (2026), el 74,1 % de quienes leían al menos una vez por semana sin disfrutarlo dijo que leer les ayudaba a aprender. Leer importa incluso cuando no te apetece.</p>
      <p>La tercera es entender mejor a la gente. A eso se le llama <strong>empatía</strong> (<span lang="en">empathy</span>): entender lo que siente o piensa otra persona. En la misma encuesta de Inglaterra (2026), el 63,5 % de quienes leían por gusto dijo que leer le ayudaba a entender el punto de vista de otras personas, el 38,0 % a entenderse mejor a sí mismo y el 64,4 % a relajarse. BookTrust (Reino Unido) lo resume: leer y compartir historias trae beneficios duraderos a cualquier edad.</p>
      <h3>El motor: la lectura por gusto</h3>
      <p>De las tres cosas, una depende de ti: el gusto. Leer porque te gusta, y no porque alguien te lo pide, se llama <strong>lectura por gusto</strong> (<span lang="en">reading for pleasure</span>): es lo que hace que un hábito aguante o se caiga. En Inglaterra (2026), 1 de cada 5 jóvenes de 8 a 18 años lee todos los días en su tiempo libre. Pero entre quienes disfrutan de la lectura, el 49,8 % lee a diario, y entre quienes no la disfrutan, solo el 4,5 %.</p>
      <p>Fíjate en lo que significa eso: el gusto no es un extra, es la diferencia entre leer el primer mes o leer medio año.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que leer solo sirve si te entretiene. El sondeo de Inglaterra (2026) matiza esa idea: el disfrute importa, pero no explica por sí solo por qué leer importa. Quien lee a diario sin disfrutar también aprende.</p>
      <h3>¿Qué te da leer?</h3>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Lo que buscas</th><th>Lo que te da</th><th>Un ejemplo</th></tr></thead>
        <tbody>
          <tr><td>Saber más</td><td>Conocimientos que tu vida no te da</td><td>Un libro de animales explica cómo se aparea una ballena</td></tr>
          <tr><td>Explicarte mejor</td><td>Palabras exactas para lo que piensas</td><td>Encuentras la palabra para «me siento fuera de lugar»</td></tr>
          <tr><td>Entender a la gente</td><td>Entender por qué alguien piensa distinto</td><td>Una novela te muestra una vida distinta a la tuya</td></tr>
        </tbody>
      </table></div>
      <p>Los contenidos básicos comunes de Lengua del Ministerio de Educación de la Nación (Argentina, documento sin fecha de publicación) lo dicen con otras palabras: la lectura sirve para informarse, para recrearse y para buscar datos, y el repertorio de palabras se desarrolla sobre todo leyendo. Y desde los primeros cursos, leer es una apropiación activa del significado con textos completos y conectados: no es pasar páginas, es entender.</p>
      <p>Y hay un caso donde esto se nota enseguida: leer a tiempo un documento que te importa. En la lección "Cómo leer tu recibo de sueldo" (Finanzas personales) verás que un papel con números, leído con calma, evita disgustos.</p>`,
    ejemplo: `
      <p>Nico dice: «Yo no leo, eso es para el colegio». La respuesta no es un sermón, sino una prueba de dos semanas: cada día, quince minutos de algo que le gusta.</p>
      <ol class="pasos-ej">
        <li>El primer día elige un libro de fútbol, que es lo que le gusta. Nadie se lo impone: se lo elige.</li>
        <li>Cada día marca una casilla en un calendario. Si un día no puede, no pasa nada. El objetivo son quince minutos, no terminar el libro.</li>
        <li>Al final de la primera semana ya sabe tres cosas que antes no sabía y usa dos palabras nuevas: frenar, que en el fútbol es cortar al rival, y diferencia, la que hay entre dos marcadores.</li>
      </ol>
      <p>Resultado: dos semanas después, Nico lee quince minutos al día porque le gusta, y no porque se lo digan.</p>
      <p class="nota"><strong>Error común:</strong> creerse que leer empieza con un libro de trescientas páginas. Empieza con quince minutos de algo que te guste: un libro, una revista o las etiquetas de un producto que compras. Cómo convertir eso en un hábito es lo que viene en la lección siguiente.</p>`,
    vidaReal: `
      <p>Leer no es solo una tarea del colegio, y se nota en cosas del día a día:</p>
      <ul>
        <li>Cuando algo no lo entiendes en clase, un libro puede explicártelo con otras palabras.</li>
        <li>Cuando quieres contar cómo te sentiste, buscar la palabra exacta te evita decir «estaba raro» y ya.</li>
        <li>Cuando no sabes cómo es el trabajo de otra persona, un libro te acerca a esa vida mejor que una explicación.</li>
        <li>Y cuando necesitas una idea para un trabajo, un texto bien elegido te ahorra horas de buscar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas situaciones es leer por gusto?</p>',
        opciones: ['Leer una novela porque te engancha', 'Consultar un manual porque lo necesitas para un trabajo', 'Hacer un examen porque toca', 'Leer el correo que te manda el banco'],
        correcta: 0,
        pista: '<p>¿En cuál de las cuatro no hay nadie que te lo pida?</p>',
        solucion: '<p>Leer por gusto es leer porque te apetece, no porque alguien te lo exige. Una novela que te engancha entra sola: eso es leer por gusto. Las otras tres opciones son tareas que hay que hacer.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué significa la palabra «empatía»?</p>',
        respuestas: ['entender lo que siente o piensa otra persona', 'entender lo que sienten o piensan otras personas', 'comprender lo que siente o piensa otra persona'],
        pista: '<p>Empieza por lo que hace el libro cuando te mete en la cabeza de alguien.</p>',
        solucion: '<p>Empatía es entender lo que siente o piensa otra persona. No es sentir lo mismo, sino comprenderlo, que es justo lo que pasa cuando lees la vida de alguien que no es como la tuya.</p>' },
      { tipo: 'numero', enunciado: '<p>En Inglaterra (2026), 1 de cada 5 jóvenes de 8 a 18 años lee todos los días en su tiempo libre. ¿Qué porcentaje de los jóvenes lee a diario?</p>', respuesta: 1 / 5 * 100,
        pista: '<p>Una de cada cinco partes del total. Multiplica por 100 para pasarlo a porcentaje.</p>',
        solucion: '<p>1 de cada 5 es una quinta parte: 1 ÷ 5 = 0,2. Y 0,2 × 100 = <strong>20 %</strong>. Es uno de cada cinco jóvenes.</p>' },
      { tipo: 'numero', enunciado: '<p>En Inglaterra (2026), el 49,8 % de quienes disfrutan de la lectura lee a diario y el 4,5 % de quienes no la disfrutan también. ¿Cuántos puntos porcentuales de diferencia hay entre los dos grupos?</p>', respuesta: 49.8 - 4.5,
        pista: '<p>Resta el porcentaje más pequeño del más grande.</p>',
        solucion: '<p>49,8 − 4,5 = <strong>45,3 puntos porcentuales</strong>. Quien disfruta de la lectura lee a diario once veces más a menudo. El gusto no es un detalle: pesa.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según el sondeo de Inglaterra (2026), ¿por qué importa leer aunque no te apetezca?</p>',
        opciones: ['Porque leer siempre entretiene, te guste o no', 'Porque leer es una obligación que no se puede discutir', 'Porque leer les ayuda a aprender y a ir mejor en el colegio, aunque no lo disfruten', 'Porque solo quienes disfrutan de la lectura aprenden palabras nuevas'],
        correcta: 2,
        pista: '<p>Piensa en el 74,1 % de quienes leían sin disfrutar y en lo que dijeron de leer.</p>',
        solucion: '<p>El 74,1 % de quienes leían al menos una vez por semana sin disfrutar dijo que leer les ayudaba a aprender palabras o cosas nuevas, y el 52,9 % que les ayudaba a ir mejor en el colegio. Leer sin gusto sigue sirviendo, aunque cueste más empezar.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena las tres cosas que te da leer, en el orden en que las presenta la lección.</p>',
        respuesta: ['Saber cosas que de otro modo no sabrías', 'Tener palabras exactas para lo que piensas y sientes', 'Entender mejor a la gente'],
        pista: '<p>La primera tiene que ver con lo que sabes, la segunda con cómo te explicas y la tercera con los demás.</p>',
        solucion: '<p>El orden es: primero saber cosas que de otro modo no sabrías, después tener palabras exactas para lo que piensas y sientes, y por último entender mejor a la gente. La última es la que se llama empatía.</p>' },
    ],
    fuentes: [NLT, BOOKTRUST, ALA, CBC],
  });

  // ------------------------------------------------------------------
  L('Cómo crear el hábito de la lectura', {
    objetivo: 'Montar un plan de lectura que aguante: una señal fija, un rato corto cada día y algo que te apetezca al terminar.',
    explicacion: `
      <p>Hay una situación que te va a sonar: llevas tres semanas con un libro sin terminar. No es que no te guste leer: es que doscientas páginas de golpe son muchas. La solución no es tener más ganas, porque las ganas no se entrenan. La solución es tener un plan.</p>
      <h3>Un hábito se hace con tres piezas</h3>
      <p>La costumbre estable de leer un rato cada día, sin que nadie te lo pida, se llama <strong>hábito de lectura</strong> (<span lang="en">reading habit</span>). BookTrust (Reino Unido) dice que el hábito de leer desde la primera infancia tiene efectos a corto plazo y también en la vida adulta, y que leer y compartir historias trae beneficios profundos y duraderos. Ese hábito se construye con tres piezas, no con una.</p>
      <p>La primera es la <strong>señal</strong> (<span lang="en">cue</span>): el aviso que te dice «ahora toca leer». La señal más fuerte es siempre la misma: la misma hora y el mismo sitio, con el libro a la vista. Si el libro vive en la mesita de luz y lees siempre a las nueve de la noche, no tienes que decidir nada, porque la decisión ya está tomada.</p>
      <p>La segunda es un rato corto y con final. Quince o veinte minutos, no «el resto de la noche». Un rato que se acaba te deja con ganas de volver; una sesión interminable te deja con la sensación de tarea pendiente.</p>
      <p>La tercera es algo que te apetezca al terminar. Leer veinte minutos de algo que te gusta es un premio; leer veinte minutos de algo a lo que te obligan es un castigo.</p>
      <p>Estas tres piezas se repiten en bucle, y al repetirse se convierten en costumbre:</p>
      ${CICLO}
      <h3>La constancia le gana a la cantidad</h3>
      <p>Aquí va la parte que casi nadie pone: quince minutos todos los días valen más que tres horas el domingo. ¿Por qué? Porque lo que se pierde no es el tiempo, es el hilo. El domingo, después de tres horas, ya no sabes por dónde ibas; al día siguiente, con veinte minutos, retomas donde lo dejaste. Esa <strong>constancia</strong> (<span lang="en">steadiness</span>), seguir con lo mismo aunque un día te salga mal, es lo que convierte un rato de lectura en un hábito de verdad.</p>
      <p>Y también se nota en los números. Como viste en "Por qué leer", en Inglaterra (2026) el National Literacy Trust preguntó a jóvenes de 8 a 18 años: 1 de cada 5 lee todos los días en su tiempo libre. Entre quienes disfrutan de la lectura, el 49,8 % lee a diario, y entre quienes no la disfrutan, solo el 4,5 %. Leer por gusto y leer cada día van juntos, y por eso el gusto decide si lo demás del plan se sostiene.</p>
      <h3>Las cuatro barreras, y su truco</h3>
      <p>El plan casi siempre funciona, pero siempre aparece una barrera. No son fallos tuyos: son las cuatro que más se repiten, y cada una tiene un truco.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>La barrera</th><th>El truco</th></tr></thead>
        <tbody>
          <tr><td>No tengo tiempo</td><td>Quince minutos al día, no dos horas. El rato corto cabe en cualquier hueco</td></tr>
          <tr><td>No me concentro</td><td>Cambia a un formato más fácil, como un tebeo, un audiolibro o un libro corto</td></tr>
          <tr><td>El libro no me gusta</td><td>Se cambia sin culpa, porque no es un castigo sino una elección que se corrige</td></tr>
          <tr><td>Se me olvida</td><td>Deja el libro en la almohada, donde ya estás cada noche, y ponlo a la vista</td></tr>
        </tbody>
      </table></div>
      <p>Un aviso sobre la tercera barrera: cambiar de libro no es rendirse. Leer por obligación también enseña, aunque cuesta más arrancar; en "Por qué leer" viste las cifras que lo demuestran.</p>
      <p>Y si te preguntas por qué insistir tanto en el gusto, la respuesta está en la lección anterior: leer por gusto es lo que hace que el plan sobreviva a la primera semana difícil.</p>`,
    ejemplo: `
      <p>Sara dice: «No tengo tiempo». La respuesta no es «entonces no leas», sino un plan con números. Ojo: las cifras de este plan son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Elige la hora: veinte minutos después de cenar, todos los días, en el mismo sitio.</li>
        <li>Deja el libro en la mesita, a la vista, y el teléfono en otra habitación. La señal tiene que estar delante de ti.</li>
        <li>En una hoja, dibuja catorce casillas, una por día. Al terminar cada rato marcas la suya.</li>
        <li>Lee veinte minutos. Si el libro está bueno, sigues un poco más, pero la casilla se marca igual.</li>
      </ol>
      <p>Resultado: catorce días por veinte minutos son 280 minutos, casi cinco horas. Y como el plan era de veinte páginas al día, Sara termina su primer libro de 220 páginas el undécimo día.</p>
      <p class="nota"><strong>Error común:</strong> terminar un libro a la fuerza aunque no te guste. Si un libro no te gusta, se deja y se empieza otro: eso no es perder el tiempo, es elegir. Un hábito apoyado en algo que te disgusta no tarda en romperse.</p>`,
    vidaReal: `
      <p>Un plan así no vale solo para los libros. Sirve para cualquier cosa que quieras hacer todos los días:</p>
      <ul>
        <li>El deporte: la misma ropa, la misma hora y las zapatillas a la vista quitan la pereza.</li>
        <li>El instrumento: veinte minutos de escalas valen más que dos horas de una vez.</li>
        <li>Los deberes: un rato corto con el móvil lejos rinde más que una hora con el móvil al lado.</li>
        <li>Y, claro, la lectura: el mismo libro en el mismo sitio, a la misma hora.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas opciones ayuda más a crear el hábito de lectura?</p>',
        opciones: ['Leer tres horas el domingo', 'Veinte minutos cada día a la misma hora', 'Leer solo en el colegio', 'Cambiar de libro cada día'],
        correcta: 1,
        pista: '<p>El hábito se sostiene con un rato corto que se repite, no con un día largo.</p>',
        solucion: '<p>Veinte minutos cada día a la misma hora es lo que construye un hábito, porque la señal se repite y el hilo no se pierde. Tres horas el domingo dejan tarea pendiente, y leer solo en el colegio no se sostiene fuera del aula.</p>' },
      { tipo: 'numero', enunciado: '<p>Sara lee veinte minutos cada día durante catorce días. ¿Cuántos minutos lee en total?</p>', respuesta: 20 * 14,
        pista: '<p>Multiplica los minutos de un día por los días del plan.</p>',
        solucion: '<p>20 minutos × 14 días = <strong>280 minutos</strong>. Y 280 minutos son 4 horas y 40 minutos, casi cinco horas repartidas en ratos pequeños.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos para montar tu plan de lectura.</p>',
        respuesta: ['Elige la hora', 'Deja el libro a la vista', 'Pon el móvil lejos', 'Lee veinte minutos', 'Marca la casilla'],
        pista: '<p>Primero se decide, después se prepara el sitio y al final se lee y se anota.</p>',
        solucion: '<p>El orden es: elige la hora, deja el libro a la vista, pon el móvil lejos, lee veinte minutos y marca la casilla. Las tres primeras cosas son la señal; las dos últimas son el rato y el registro.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Qué se llama la costumbre de leer un rato cada día sin que nadie te lo pida?</p>',
        respuestas: ['hábito de lectura', 'habito de lectura', 'hábito lector'],
        pista: '<p>Son dos palabras: la primera es sinónimo de costumbre y la segunda nombra la actividad.</p>',
        solucion: '<p>Se llama <strong>hábito de lectura</strong>. Es una costumbre estable: leer un rato cada día sin que nadie te obligue a hacerlo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Empezaste un libro y no te gusta. ¿Qué haces?</p>',
        opciones: ['Lo terminas a la fuerza hasta el final', 'Lo cambias sin culpa y empiezas otro', 'Lo escondes para no verlo más', 'Lo regalas para quitarte de encima'],
        correcta: 1,
        pista: '<p>Piensa en lo que dijo la lección sobre un hábito que se apoya en algo que te disgusta.</p>',
        solucion: '<p>Se cambia sin culpa. Un libro que no te gusta no es un castigo, es una elección que se corrige, y un hábito apoyado en algo que te disgusta no tarda en romperse.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es el truco para la barrera «no tengo tiempo»?</p>',
        opciones: ['Quince minutos al día, en vez de una hora el domingo', 'Leer más rápido para terminar antes', 'Esperar a tener un fin de semana libre', 'Renunciar a leer hasta el próximo curso'],
        correcta: 0,
        pista: '<p>El rato corto cabe en cualquier hueco. Piensa en el plan de Sara.</p>',
        solucion: '<p>El truco es un rato corto: quince o veinte minutos al día. Veinte minutos después de cenar, todos los días, dan más resultado que una hora el domingo, porque el hilo de la lectura no se rompe entre un día y otro.</p>' },
    ],
    fuentes: [NLT, BOOKTRUST],
  });

  // ------------------------------------------------------------------
  L('Tipos de texto: narrativo, expositivo, argumentativo e instructivo', {
    objetivo: 'Reconocer el tipo de un texto por lo que su autor quiere conseguir: que te cuente algo, que lo entiendas, que estés de acuerdo o que lo hagas.',
    explicacion: `
      <p>Empieza por cuatro mensajes de móvil. Uno cuenta lo que pasó en el recreo, otro explica cómo funciona una brújula, otro intenta convencerte de algo y el cuarto te da los pasos para instalar una aplicación. Los cuatro son textos y se leen sin problema. La diferencia no está en el tema, sino en la intención: qué quiere el autor que hagas o pienses.</p>
      <p>Para nombrar esa intención hay dos palabras que te van a servir. La primera es <strong>propósito</strong> (<span lang="en">purpose</span>): lo que el autor quiere conseguir con el texto, que sepas algo, que hagas algo o que pienses una cosa. La segunda es <strong>secuencia</strong> (<span lang="en">sequence</span>): el orden en que el texto presenta la información, en el tiempo, por partes, por causas o por pasos.</p>
      <p>Un texto se clasifica por su propósito y por su secuencia, y de ahí salen cuatro tipos.</p>
      <div class="tabla-wrap"><table>
        <thead><tr><th>Tipo</th><th>Para qué sirve</th><th>Cómo lo reconoces</th><th>Un ejemplo de la vida real</th></tr></thead>
        <tbody>
          <tr><th scope="row">Narrativo</th><td>Cuenta hechos</td><td>Hay personajes y los hechos van en orden</td><td>El relato de un viaje</td></tr>
          <tr><th scope="row">Expositivo</th><td>Informa sin convencer</td><td>Presenta los hechos de forma neutral y objetiva</td><td>La explicación de un museo</td></tr>
          <tr><th scope="row">Argumentativo</th><td>Convence con razones</td><td>Da razones a favor o en contra de una posición</td><td>Un cartel que pide no tirar basura</td></tr>
          <tr><th scope="row">Instructivo</th><td>Indica cómo hacer algo</td><td>Trae pasos ordenados y verbos en imperativo</td><td>Una receta de cocina</td></tr>
        </tbody>
      </table></div>
      <p>El truco para reconocerlos es una sola pregunta: ¿qué quiere el autor que haga yo con esto? Si quiere contarme algo, el texto es narrativo. Si quiere que entienda cómo funciona algo, es expositivo. Si quiere que esté de acuerdo con él, es argumentativo. Si quiere que lo haga, es instructivo.</p>
      <h3>El par que más se confunde</h3>
      <p>El expositivo y el argumentativo son los que más se confunden, porque los dos hablan del mismo tema y los dos dan datos. La diferencia está en la intención: el expositivo presenta los hechos de forma neutral y objetiva, sin intentar convencer a nadie, sino mostrar e informar. El argumentativo, en cambio, presenta razones a favor o en contra de una posición para convencerte.</p>
      <h3>Dos textos que parecen parecidos</h3>
      <p>Mira estos dos. El autor del primero quiere que entiendas cómo funciona la biblioteca del colegio: te da datos y nada más.</p>
      <div class="nota texto-muestra"><p>La biblioteca del colegio abre de 8 a 14 horas y de 16 a 18 horas los martes. Los préstamos duran dos semanas y se pueden renovar por internet. En la sala de lectura hay treinta puestos.</p></div>
      <p>El autor del segundo, en cambio, sí quiere convencerte: te da razones para que estés de acuerdo con una postura, ampliar la biblioteca.</p>
      <div class="nota texto-muestra"><p>Deberíamos ampliar la biblioteca del colegio: con treinta puestos para una escuela entera, cada estudiante lee menos de una hora a la semana allí, y con más libros y más puestos todos leerían mucho más.</p></div>
      <p>Los dos mencionan los mismos treinta puestos, así que parecen iguales. Pero el primero informa y el segundo convence: solo uno quiere cambiar lo que pienses.</p>
      <p>Reconocer el tipo de un texto no es un juego. Los contenidos básicos comunes de Lengua del Ministerio de Educación de la Nación (Argentina, documento sin fecha de publicación) explican que reconocer las estructuras textuales, como la narrativa, la descriptiva, la expositiva, la instructiva y la argumentativa, contribuye a la comprensión lectora: saber qué tipo de texto tienes delante te ayuda a entenderlo.</p>
      <p class="nota"><strong>Trampa común:</strong> en otros libros la lista tiene un quinto tipo, el descriptivo, que sirve para decir cómo es algo: un paisaje, una persona, un objeto. Aquí no lo usamos porque esta unidad trabaja con estos cuatro. Fíjate, eso sí, en que un texto puede ser de más de un tipo: una receta trae pasos y además cuenta de dónde viene esa receta.</p>
      <p>En la primera lección, "Por qué leer", viste para qué sirve leer. Aquí aprendes a mirar lo que hace el texto delante.</p>`,
    ejemplo: `
      <p>El padre de Martina le manda un mensaje: «Sal del colegio a la una y media, camina por la calle Mayor, entra por la puerta azul y da el recado en la ventanilla 2». Parece un relato, pero no lo es.</p>
      <ol class="pasos-ej">
        <li>Aplica la pregunta: ¿qué quiere el autor que haga yo con esto? El padre no quiere contar una historia: quiere que Martina haga un recado. El texto no cuenta, indica.</li>
        <li>Busca la estructura: hay pasos ordenados, verbos en imperativo (sal, camina, entra, da) y un resultado claro, hacer el recado.</li>
        <li>Concluye: es instructivo, aunque parezca narrativo porque menciona un lugar y una hora.</li>
      </ol>
      <p>Compruébalo por otro camino: reescribe el mensaje como relato («salió del colegio, caminó por la calle Mayor y dejó el recado») y así sí cuenta una historia. La versión en pasos no cuenta nada: no dice qué pasó ni cómo se sintió nadie.</p>
      <p class="nota"><strong>Error común:</strong> clasificar por el tema y no por la intención. Un texto puede hablar del colegio y ser expositivo, narrativo o instructivo, según lo que quiera hacer su autor.</p>`,
    vidaReal: `
      <p>Mirar qué quiere el autor de un texto te ahorra sorpresas:</p>
      <ul>
        <li>En un trabajo del colegio, si el texto te dice paso a paso qué hacer, puedes seguirlo sin más; si trae razones, conviene leer con atención para decidir si estás de acuerdo.</li>
        <li>En un cartel del parque, casi siempre hay una razón detrás: quieren que cambies un hábito.</li>
        <li>En el folleto de un aparato, casi siempre te dicen cómo usarlo sin romperlo.</li>
        <li>Y en una receta o en un libro de viajes, ya sabes qué te vas a encontrar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>El comienzo de una novela dice: «El tren salió a las ocho de la mañana y, al llegar al puerto, el mar estaba en calma». ¿De qué tipo es ese texto?</p>',
        opciones: ['Expositivo', 'Narrativo', 'Instructivo', 'Argumentativo'], correcta: 1,
        pista: '<p>Pregúntate qué quiere el autor del texto: ¿contarte algo que pasó o explicarte cómo funciona algo?</p>',
        solucion: '<p>Es <strong>narrativo</strong>: relata hechos que ocurren en un tiempo y un lugar, con personajes reales o imaginarios, y sigue un orden. No informa sobre un tema, no da pasos y tampoco intenta convencerte de nada.</p>' },
      { tipo: 'opciones', enunciado: '<p>En un museo, un cartel explica que el agua de los ríos se evapora con el calor, sube hasta las nubes y vuelve a la tierra en forma de lluvia. ¿De qué tipo es?</p>',
        opciones: ['Expositivo', 'Argumentativo', 'Instructivo', 'Narrativo'], correcta: 0,
        pista: '<p>¿El cartel quiere que hagas algo, que creas algo, o solo que entiendas cómo funciona?</p>',
        solucion: '<p>Es <strong>expositivo</strong>: presenta los hechos de forma neutral y objetiva, sin intentar convencerte, sino mostrar e informar. Si el cartel dijera «deberíamos evitar que el agua se evapore» y diera razones, ya sería argumentativo.</p>' },
      { tipo: 'opciones', enunciado: '<p>En la entrada del parque hay un cartel: «Cada persona que tira su basura al suelo hace el parque más feo para todos. Entre todos podemos dejarlo limpio». ¿De qué tipo es?</p>',
        opciones: ['Narrativo', 'Instructivo', 'Expositivo', 'Argumentativo'], correcta: 3,
        pista: '<p>¿El cartel te da razones para estar de acuerdo con algo?</p>',
        solucion: '<p>Es <strong>argumentativo</strong>: presenta razones a favor de una postura, dejar el parque limpio, para convencerte. No cuenta una historia, no indica pasos y tampoco se limita a informar.</p>' },
      { tipo: 'texto', enunciado: '<p>Una receta dice: «Mezcla los huevos con la harina, bate la mezcla y hornea el bizcocho 40 minutos». ¿Qué tipo de texto dice cómo se hace algo? Escribe el nombre del tipo.</p>',
        respuestas: ['instructivo', 'texto instructivo', 'instructiva'],
        pista: '<p>Es el tipo de texto que muestra pasos a seguir, materiales y cómo hacer una actividad.</p>',
        solucion: '<p>Es <strong>instructivo</strong>: su propósito es dirigir tus acciones, así que muestra pasos a seguir y materiales. En la receta, además, hay un resultado: el bizcocho.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena los pasos de un texto instructivo que explica cómo preparar un vaso de limonada.</p>',
        respuesta: ['Exprime los limones y echa el zumo en el vaso', 'Añade agua fría y una cucharada de azúcar', 'Remueve hasta que el azúcar se disuelva', 'Añade hielo y sirve'],
        pista: '<p>Primero se saca el zumo, después se mezcla con el agua y el azúcar, y al final se remueve y se sirve.</p>',
        solucion: '<p>El orden es: exprime los limones y echa el zumo en el vaso, añade agua fría y una cucharada de azúcar, remueve hasta que el azúcar se disuelva y, por último, añade hielo y sirve. Un texto instructivo presenta los pasos en orden, porque si los cambias el resultado no sale.</p>' },
      { tipo: 'opciones', enunciado: '<p>Lee estos dos textos de ejemplo. El primero: «La biblioteca del colegio abre de 8 a 14 horas y de 16 a 18 horas los martes; los préstamos duran dos semanas y se pueden renovar por internet». El segundo: «Deberíamos ampliar la biblioteca del colegio: con treinta puestos para una escuela entera, cada estudiante lee menos de una hora a la semana allí, y con más libros y más puestos todos leerían mucho más». ¿Cuál de los dos quiere convencerte?</p>',
        opciones: ['El primero, porque solo da datos', 'El segundo, porque presenta razones para cambiar de opinión', 'Los dos quieren convencerte igual', 'Ninguno de los dos quiere convencerte'], correcta: 1,
        pista: '<p>Uno informa de manera neutral; el otro da razones a favor de una postura.</p>',
        solucion: '<p>El segundo es <strong>argumentativo</strong>, porque presenta razones a favor de ampliar la biblioteca y quiere que cambies de opinión. El primero es <strong>expositivo</strong>: da datos sobre cómo funciona la biblioteca sin intentar convencerte de nada.</p>' },
    ],
    fuentes: [
      CBC,
      { nombre: 'Wikipedia en español: Anexo:Tipos de texto (apoyo)', url: 'https://es.wikipedia.org/wiki/Anexo:Tipos_de_texto' },
      { nombre: 'Wikipedia en español: Texto instructivo (apoyo)', url: 'https://es.wikipedia.org/wiki/Texto_instructivo' },
    ],
  });
})();
