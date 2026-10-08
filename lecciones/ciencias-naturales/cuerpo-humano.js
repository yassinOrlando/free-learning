// Ciencias naturales · Unidad 2: El cuerpo humano.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('ciencias-naturales', titulo, datos);
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
  const diagrama = (x, y, figuras, descripcion) => G({ x, y, figuras, descripcion, proporcional: true, ejes: false });
  // Rótulo con una flecha que apunta a la parte del dibujo (lado: 1 = texto a la derecha, -1 = a la izquierda).
  const rotulo = (x, y, texto, hasta, lado = 1) => [txt(x, y, texto), ...flecha([x - lado * 1.4, y], hasta, 0, 0.8)];
  const caja = (x0, y0, x1, y1, relleno = false) => ({ tipo: 'poligono', puntos: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], relleno });
  // Interpola en línea recta entre puntos [[x, y], ...].
  const tramos = (datos) => (x) => {
    for (let i = 1; i < datos.length; i++) {
      const [x0, y0] = datos[i - 1], [x1, y1] = datos[i];
      if (x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    }
    return datos[datos.length - 1][1];
  };
  // Gráfica de barras de una sola serie (como en matematicas/estadistica.js): etiquetas abajo, valor encima.
  function barras({ etiquetas, valores, max, paso, descripcion }) {
    const n = valores.length;
    const figuras = valores.flatMap((v, i) => [
      { tipo: 'poligono', puntos: [[i + 0.15, 0], [i + 0.85, 0], [i + 0.85, v], [i + 0.15, v]], solido: true },
      txt(i + 0.5, -max * 0.07, etiquetas[i]),
      txt(i + 0.5, v + max * 0.05, String(v)),
    ]);
    return G({ x: [0, n], y: [-max * 0.12, max * 1.1], pasos: [1e9, paso], nombres: false, figuras, descripcion });
  }

  const OSB = (pagina, nombre) => ({ nombre: `OpenStax, Biology 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/biology-2e/pages/${pagina}` });
  const OCB = (pagina, nombre) => ({ nombre: `OpenStax, Concepts of Biology: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/concepts-biology/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const PHET = (sim, nombre) => ({ nombre: `PhET, Universidad de Colorado: ${nombre}`, url: `https://phet.colorado.edu/es/simulations/${sim}` });
  const MEDLINE = (ruta, nombre) => ({ nombre: `MedlinePlus en español: ${nombre}`, url: `https://medlineplus.gov/spanish/${ruta}` });
  const OMS = (ruta, nombre) => ({ nombre: `Organización Mundial de la Salud: ${nombre}`, url: `https://www.who.int/es/${ruta}` });

  // ------------------------------------------------------------------
  const ORGANOS = [['boca', 'muele y moja'], ['esófago', 'empuja'], ['estómago', 'revuelve con ácido'], ['intestino delgado', 'absorbe nutrientes'], ['intestino grueso', 'quita agua']];
  const DIGESTIVO = diagrama([0, 9.8], [0.7, 6.9], ORGANOS.flatMap(([organo, accion], i) => {
    const y = 6.2 - 1.2 * i;
    return [
      caja(0.4, y - 0.35, 4.6, y + 0.35), txt(2.5, y, organo), txt(7.4, y, accion),
      ...(i < ORGANOS.length - 1 ? flecha([2.5, y - 0.35], [2.5, y - 0.85], 0, 0.8) : []),
    ];
  }), 'Recorrido de la comida dibujado como cinco cajas unidas por flechas hacia abajo, cada una con lo que hace a su derecha. Boca: muele y moja. Esófago: empuja. Estómago: revuelve con ácido. Intestino delgado: absorbe nutrientes. Intestino grueso: quita agua.');

  L('Sistema digestivo', {
    objetivo: 'Seguir el viaje de la comida por tu cuerpo y explicar qué le pasa en cada parte.',
    explicacion: `
      <p>Te comes una torta de jamón. Unas horas después, parte de ese pan y ese jamón ya va en tu sangre, dándole energía a tus músculos. Pero un pedazo de pan no cabe en una célula. ¿Cómo llega hasta ahí?</p>
      <p>En Química viste que la comida está hecha de nutrientes: carbohidratos, proteínas y grasas. Muchos son moléculas grandes, como collares largos de cuentas. Tus células solo pueden recibir las cuentas sueltas, así que primero hay que desarmar los collares. A ese trabajo de partir la comida en pedazos tan pequeños que tu cuerpo pueda aprovecharlos se le llama <strong>digestión</strong>.</p>
      <h3>Dos formas de partir la comida</h3>
      <p>La digestión tiene dos partes. La primera es mecánica: los dientes cortan y muelen, y el estómago aprieta y revuelve, como cuando amasas. Así la comida queda en pedazos pequeños, pero sus moléculas siguen enteras.</p>
      <p>La segunda es química. Una <strong>enzima</strong> es una proteína que corta una molécula grande en partes pequeñas, como unas tijeras diminutas. Cada enzima corta un solo tipo de molécula: unas cortan almidón, otras proteínas y otras grasas. Si masticas un pedazo de pan durante un minuto, empieza a saber dulce, porque una enzima de tu saliva está cortando el almidón en azúcares.</p>
      <h3>El recorrido</h3>
      <p>La comida viaja por un tubo de varios metros de largo. Sigue su camino en el dibujo:</p>
      ${DIGESTIVO}
      <ul>
        <li>En la boca, los dientes muelen la comida, y la saliva la moja y empieza a cortar el almidón.</li>
        <li>El esófago es un tubo que lleva la comida al estómago apretándose por partes, como cuando exprimes un tubo de pasta de dientes. Por eso puedes tragar aunque estés de cabeza.</li>
        <li>El estómago revuelve la comida con un jugo muy ácido, de pH cercano a 2, como viste en Química. El ácido mata muchos microbios y ayuda a las enzimas que cortan proteínas.</li>
        <li>El intestino delgado es la parte más larga. Ahí se terminan de cortar los nutrientes, con ayuda de la bilis que fabrica el hígado, que separa la grasa en gotitas, y de las enzimas del páncreas.</li>
        <li>El intestino grueso recibe lo que no se pudo digerir, como la fibra, y le quita agua. Lo que queda sale como heces.</li>
      </ul>
      <h3>Del tubo a la sangre</h3>
      <p>La <strong>absorción</strong> es el paso de los nutrientes ya cortados desde el intestino hacia la sangre. Ocurre sobre todo en el intestino delgado. Su pared está llena de pliegues y de salientes diminutas, como los hilos de una toalla, que le dan muchísima superficie para absorber. Desde ahí, la sangre reparte los nutrientes a cada célula.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que la comida se digiere sobre todo en el estómago. El estómago revuelve y empieza a cortar las proteínas, pero la mayor parte de la digestión química y casi toda la absorción ocurren en el intestino delgado.</p>`,
    ejemplo: `
      <p>Supón que una comida pasa 3 horas en el estómago, 5 en el intestino delgado y 36 en el intestino grueso. ¿Qué porcentaje del tiempo total pasa en el intestino grueso?</p>
      <ol class="pasos-ej">
        <li>Primero suma los tiempos para tener el total: 3 + 5 + 36 = 44 horas.</li>
        <li>Divide la parte entre el total, como aprendiste en porcentajes: 36 ÷ 44 ≈ 0.82.</li>
        <li>Multiplica por 100 para decirlo "de cada cien": 0.82 × 100 = 82%.</li>
        <li>Comprueba sacando los otros dos porcentajes: 3 ÷ 44 ≈ 7% y 5 ÷ 44 ≈ 11%. Juntos, 82 + 7 + 11 = 100, así que las cuentas cuadran.</li>
      </ol>
      <p>Resultado: <span class="resultado">alrededor del 82% del tiempo</span>. Fíjate que la parte más lenta no es la que absorbe nutrientes, sino la que quita agua. Los tiempos reales cambian mucho según la persona y la comida.</p>
      <p class="nota"><strong>Error común:</strong> dividir entre 36 en lugar de entre 44. El porcentaje siempre se calcula sobre el total.</p>`,
    vidaReal: `
      <p>Entender cómo se procesa la comida te ayuda a cuidarte:</p>
      <ul>
        <li>Masticar bien le facilita el trabajo a tu estómago, porque le entrega la comida en pedazos más pequeños.</li>
        <li>Los alimentos con fibra, como frutas, verduras y frijoles, ayudan a que vayas al baño con regularidad.</li>
        <li>Algunas personas se sienten mal al tomar leche porque su cuerpo no logra partir el azúcar que contiene.</li>
        <li>Tomar suficiente agua ayuda a que la comida avance sin atorarse.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Dónde se absorbe la mayor parte de los nutrientes?</p>',
        opciones: ['En el estómago', 'En el intestino delgado', 'En el intestino grueso'], correcta: 1,
        pista: '<p>Busca la parte más larga, con la pared llena de pliegues.</p>',
        solucion: '<p>En el <strong>intestino delgado</strong>. Sus pliegues le dan mucha superficie para pasar los nutrientes a la sangre. El grueso sobre todo quita agua.</p>' },
      { tipo: 'numero', enunciado: '<p>Supón que una comida pasa 4 horas en el estómago, 6 en el intestino delgado y 30 en el intestino grueso. ¿Cuántas horas tarda en total?</p>', respuesta: 4 + 6 + 30,
        pista: '<p>Suma los tres tiempos.</p>',
        solucion: '<p>4 + 6 + 30 = <strong>40 horas</strong>, casi dos días. La mayor parte la pasa en el intestino grueso.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la proteína que corta una molécula grande de comida en partes pequeñas?</p>',
        respuestas: ['enzima', 'enzimas', 'una enzima', 'las enzimas', 'enzima digestiva', 'enzimas digestivas'],
        pista: '<p>Funciona como unas tijeras diminutas.</p>',
        solucion: '<p>Una <strong>enzima</strong>. Cada una corta un solo tipo de molécula, como el almidón o las proteínas.</p>' },
      { tipo: 'opciones', enunciado: '<p>Masticas un pedazo de pan durante un minuto y empieza a saber dulce. ¿Por qué?</p>',
        opciones: ['Una enzima de la saliva corta el almidón en azúcares', 'Los dientes convierten el pan en azúcar al molerlo', 'El ácido del estómago sube a la boca'], correcta: 0,
        pista: '<p>Moler cambia el tamaño de los pedazos, pero no las moléculas.</p>',
        solucion: '<p>Porque <strong>una enzima de la saliva corta el almidón en azúcares</strong>. Los dientes solo hacen la parte mecánica: dejan los pedazos más pequeños, pero las moléculas siguen siendo las mismas.</p>' },
      { tipo: 'numero', enunciado: '<p>Supón que el intestino delgado de una persona mide 4.5 m y el grueso mide 1.5 m. ¿Cuántas veces más largo es el delgado?</p>', respuesta: 4.5 / 1.5, tolerancia: 0.01,
        pista: '<p>Divide el largo del delgado entre el del grueso.</p>',
        solucion: '<p>4.5 ÷ 1.5 = <strong>3 veces</strong>. Se llama "delgado" por su grosor, no por su largo: es el más angosto, pero también el más largo.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué hace el intestino grueso?</p>',
        opciones: ['Corta las grasas con ayuda de la bilis', 'Absorbe la mayoría de los nutrientes', 'Le quita agua a lo que no se pudo digerir'], correcta: 2,
        pista: '<p>Recibe lo que queda al final del recorrido.</p>',
        solucion: '<p><strong>Le quita agua a lo que no se pudo digerir</strong>, como la fibra. Cortar las grasas y absorber los nutrientes ocurre antes, en el intestino delgado.</p>' },
    ],
    fuentes: [
      OCB('16-2-digestive-system', 'Digestive System'),
      OSB('34-1-digestive-systems', 'Digestive Systems'),
      WIKI('Aparato_digestivo', 'Aparato digestivo'),
      MEDLINE('digestivesystem.html', 'Sistema digestivo'),
    ],
  });

  // ------------------------------------------------------------------
  const AIRE = barras({ etiquetas: ['O₂ entra', 'O₂ sale', 'CO₂ entra', 'CO₂ sale'], valores: [21, 16, 0.04, 4], max: 25, paso: 5,
    descripcion: 'Gráfica de barras del porcentaje de cada gas en el aire que entra y en el que sale de los pulmones. Oxígeno: 21% al entrar y 16% al salir. Dióxido de carbono: 0.04% al entrar, una barra casi invisible, y 4% al salir.' });

  L('Sistema respiratorio', {
    objetivo: 'Explicar cómo entra el aire a tu cuerpo, cómo pasa el oxígeno a la sangre y para qué lo usan tus células.',
    explicacion: `
      <p>Intenta aguantar la respiración. Al poco tiempo, tu cuerpo te obliga a soltar el aire y tomar más. Puedes pasar semanas sin comer y días sin beber agua, pero solo unos minutos sin respirar. ¿Qué es tan urgente?</p>
      <p>En la lección anterior viste que los nutrientes llegan a cada célula. Pero para sacarles la energía, la célula necesita oxígeno, igual que una fogata no arde sin aire.</p>
      <h3>Por dónde entra el aire</h3>
      <p>El aire entra por la nariz, donde los pelitos y el moco atrapan el polvo, y ahí se calienta y se humedece. Baja por la garganta y por la tráquea, un tubo con anillos duros que no lo dejan cerrarse. La tráquea se divide en dos tubos, uno para cada lado, y estos se ramifican una y otra vez, como las ramas de un árbol de cabeza.</p>
      <p>Los <strong>pulmones</strong> son dos órganos esponjosos dentro del pecho, protegidos por las costillas. Al final de sus ramitas más finas están los <strong>alvéolos</strong>: bolsitas diminutas de aire, agrupadas como racimos de uvas y rodeadas de vasos sanguíneos muy delgados. Tienes cientos de millones. Su pared es tan delgada que el oxígeno la atraviesa y pasa a la sangre, mientras el CO₂ hace el camino contrario.</p>
      <h3>Cómo se mueve el aire</h3>
      <p>Los pulmones no tienen músculos propios para moverse. Debajo de ellos está el <strong>diafragma</strong>, un músculo en forma de cúpula. Cuando se contrae, baja y agranda el espacio del pecho, y el aire entra para llenarlo, como cuando abres un fuelle. Cuando se relaja, sube, y el aire sale. En reposo respiras entre 12 y 20 veces por minuto, y cada vez mueves alrededor de medio litro de aire.</p>
      <h3>El aire que entra y el que sale</h3>
      ${AIRE}
      <p>El aire que respiras tiene 21% de oxígeno, y el que sueltas todavía tiene unos 16%, porque no todo se aprovecha. En cambio, el CO₂ sube de 0.04% a unos 4%: cien veces más. Por eso un salón cerrado con mucha gente se siente cargado.</p>
      <h3>Respirar y la respiración celular</h3>
      <p>Dentro de cada célula, las mitocondrias que viste en la Unidad 1 usan ese oxígeno para sacar energía de la glucosa:</p>
      <p>C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O</p>
      <p>Se lee "una glucosa más seis oxígenos dan seis dióxidos de carbono y seis aguas", y en el camino se libera energía. Fíjate que es la fotosíntesis al revés. A esto se le llama respiración celular. El CO₂ y el vapor de agua que se forman salen en tu aliento; por eso empañas un vidrio frío cuando le soplas.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que al exhalar solo sale CO₂. El aire que sale sigue teniendo mucho oxígeno, y por eso dar respiración de boca a boca puede ayudar a una persona que dejó de respirar.</p>`,
    ejemplo: `
      <p>En reposo, una persona respira 15 veces por minuto y mueve medio litro de aire cada vez. ¿Cuántos litros de aire mueve en una hora?</p>
      <ol class="pasos-ej">
        <li>Primero calcula cuánto mueve en un minuto: 15 × 0.5 = 7.5 litros.</li>
        <li>Una hora tiene 60 minutos, así que multiplica: 7.5 × 60 = 450 litros.</li>
        <li>Comprueba por otro camino: cuenta las respiraciones de una hora, 15 × 60 = 900, y multiplícalas por medio litro: 900 × 0.5 = 450 litros. Las dos formas coinciden.</li>
      </ol>
      <p>Resultado: <span class="resultado">450 litros de aire en una hora</span>, más o menos lo que cabe en 450 botellas de un litro. Al hacer ejercicio, la cifra se multiplica varias veces.</p>
      <p class="nota"><strong>Error común:</strong> quedarse con los 7.5 litros. Ese es el aire de un minuto; la pregunta pide una hora. Antes de responder, revisa en qué unidad te preguntan.</p>`,
    vidaReal: `
      <p>Saber cómo respiras te ayuda a entender a tu cuerpo:</p>
      <ul>
        <li>Al hacer ejercicio respiras más rápido porque tus músculos piden más oxígeno.</li>
        <li>El humo del cigarro y la contaminación dañan las bolsitas donde el aire pasa a la sangre.</li>
        <li>Respirar por la nariz calienta y limpia el aire antes de que entre a tu cuerpo.</li>
        <li>Abrir una ventana renueva el aire cargado de un salón lleno de gente.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una persona respira 18 veces por minuto y mueve 0.5 litros de aire cada vez. ¿Cuántos litros mueve en un minuto?</p>', respuesta: 18 * 0.5, tolerancia: 0.01,
        pista: '<p>Multiplica las respiraciones por el aire de cada una.</p>',
        solucion: '<p>18 × 0.5 = <strong>9 litros</strong> por minuto.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿En qué parte pasa el oxígeno del aire a la sangre?</p>',
        opciones: ['En la tráquea', 'En los alvéolos', 'En el diafragma'], correcta: 1,
        pista: '<p>Busca las bolsitas de pared muy delgada rodeadas de vasos sanguíneos.</p>',
        solucion: '<p>En los <strong>alvéolos</strong>. La tráquea solo conduce el aire, y el diafragma es el músculo que lo hace entrar y salir.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué pasa cuando el diafragma se contrae?</p>',
        opciones: ['Baja, el pecho se agranda y el aire entra', 'Sube, el pecho se achica y el aire sale', 'Cierra la tráquea para guardar el aire'], correcta: 0,
        pista: '<p>Piensa en un fuelle que se abre.</p>',
        solucion: '<p><strong>Baja y el aire entra</strong>, porque el espacio del pecho se hace más grande. Cuando se relaja, sube y el aire sale.</p>' },
      { tipo: 'numero', enunciado: '<p>El aire que respiras tiene 21% de oxígeno. ¿Cuántos mililitros de oxígeno hay en 500 mL de aire?</p>', respuesta: 500 * 21 / 100,
        pista: '<p>Calcula el 21% de 500.</p>',
        solucion: '<p>500 × 0.21 = <strong>105 mL</strong> de oxígeno.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué gas sale de tus pulmones en mucha mayor cantidad de la que entra?</p>',
        opciones: ['Oxígeno', 'Nitrógeno', 'Dióxido de carbono (CO₂)'], correcta: 2,
        pista: '<p>Revisa la gráfica de barras.</p>',
        solucion: '<p>El <strong>dióxido de carbono</strong>: entra con 0.04% y sale con unos 4%, cien veces más. El oxígeno, en cambio, baja de 21% a 16%.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué usan el oxígeno tus células?</p>',
        opciones: ['Para enfriar el cuerpo', 'Para fabricar glucosa', 'Para sacar energía de la glucosa'], correcta: 2,
        pista: '<p>Piensa en la respiración celular, que es la fotosíntesis al revés.</p>',
        solucion: '<p>Para <strong>sacar energía de la glucosa</strong>, en las mitocondrias. Fabricar glucosa con luz es lo que hacen las plantas en la fotosíntesis.</p>' },
    ],
    fuentes: [
      OCB('16-3-circulatory-and-respiratory-systems', 'Circulatory and Respiratory Systems'),
      OSB('39-1-systems-of-gas-exchange', 'Systems of Gas Exchange'),
      WIKI('Aparato_respiratorio', 'Aparato respiratorio'),
      MEDLINE('lungdiseases.html', 'Enfermedades de los pulmones'),
    ],
  });

  // ------------------------------------------------------------------
  const CIRCULACION = diagrama([-1.4, 9.4], [-1.1, 6.1], [
    caja(2.6, 4.7, 5.4, 5.7), txt(4, 5.2, 'pulmones'),
    caja(2.6, 2, 5.4, 3.4, true), txt(4, 2.7, 'corazón'),
    caja(2, -0.6, 6, 0.4), txt(4, -0.1, 'resto del cuerpo'),
    ...flecha([3.1, 3.4], [3.1, 4.7], 0, 0.8), ...flecha([4.9, 4.7], [4.9, 3.4], 0, 0.8),
    ...flecha([4.9, 2], [4.9, 0.4], 0, 0.8), ...flecha([3.1, 0.4], [3.1, 2], 0, 0.8),
    txt(1.2, 4.25, 'sangre con'), txt(1.2, 3.8, 'poco O₂'),
    txt(6.8, 4.25, 'sangre con'), txt(6.8, 3.8, 'mucho O₂'),
    txt(1.2, 1.45, 'sangre con'), txt(1.2, 1.0, 'poco O₂'),
    txt(6.8, 1.45, 'sangre con'), txt(6.8, 1.0, 'mucho O₂'),
  ], 'Diagrama de la circulación con tres cajas: pulmones arriba, corazón en medio y resto del cuerpo abajo. Arriba, una flecha sube del corazón a los pulmones con sangre con poco oxígeno, y otra baja de los pulmones al corazón con sangre con mucho oxígeno. Abajo, una flecha baja del corazón al resto del cuerpo con sangre con mucho oxígeno, y otra sube del cuerpo al corazón con sangre con poco oxígeno.');

  L('Sistema circulatorio', {
    objetivo: 'Explicar cómo el corazón mueve la sangre por todo el cuerpo y qué diferencia hay entre arterias, venas y capilares.',
    explicacion: `
      <p>Pon dos dedos en tu muñeca, del lado del pulgar, y aprieta un poco. Sientes un golpecito que se repite: es tu pulso. Cada golpecito es tu corazón empujando sangre, que llega hasta la punta de tus dedos en un instante.</p>
      <p>La sangre es el servicio de reparto de tu cuerpo. Lleva a cada célula los nutrientes que absorbió el intestino y el oxígeno que tomaron los pulmones, y se lleva los desechos, como el CO₂. Un adulto tiene unos 5 litros de sangre.</p>
      <h3>El corazón, una bomba doble</h3>
      <p>El corazón es un músculo del tamaño de un puño, en el centro del pecho. Por dentro tiene cuatro cavidades: dos arriba, que reciben la sangre, y dos abajo, que la empujan hacia fuera. Unas compuertas llamadas válvulas solo se abren en un sentido, para que la sangre no se regrese. El "pum-pum" que oye el médico es el ruido de esas compuertas al cerrarse.</p>
      <p>En reposo, el corazón de un adulto late entre 60 y 100 veces por minuto. Con el ejercicio late más rápido, porque tus músculos piden más oxígeno.</p>
      <h3>Tres tipos de tubos</h3>
      <p>La sangre viaja por tubos llamados vasos sanguíneos, y hay de tres tipos:</p>
      <ul>
        <li>Las <strong>arterias</strong> llevan la sangre desde el corazón hacia el cuerpo. Tienen paredes gruesas y elásticas, porque la sangre sale con fuerza. Tu pulso es ese empujón que se siente en una arteria.</li>
        <li>Las <strong>venas</strong> regresan la sangre al corazón. Llevan menos presión, y muchas tienen válvulas para que la sangre no se regrese, sobre todo en las piernas.</li>
        <li>Los <strong>capilares</strong> son los tubos más delgados, tanto que los glóbulos rojos, las células que cargan el oxígeno, pasan en fila. Unen las arterias con las venas, y ahí ocurre el intercambio: el oxígeno y los nutrientes salen hacia las células, y el CO₂ y los desechos entran a la sangre.</li>
      </ul>
      <h3>Dos vueltas</h3>
      ${CIRCULACION}
      <p>La sangre da dos vueltas. En la vuelta corta, el lado derecho del corazón manda sangre con poco oxígeno a los pulmones; ahí se carga de oxígeno, suelta el CO₂ y regresa al lado izquierdo. En la vuelta larga, el lado izquierdo empuja esa sangre rica en oxígeno a todo el cuerpo, y las venas la regresan, ya con poco oxígeno, al lado derecho. Por eso la pared izquierda del corazón es más gruesa: tiene que empujar más lejos.</p>
      <p>Fíjate en un detalle. Lo que hace que un tubo sea arteria es que sale del corazón, no que lleve oxígeno: la arteria que va a los pulmones lleva sangre con poco oxígeno.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que la sangre de las venas es azul porque así se ven bajo la piel. La sangre siempre es roja: más oscura cuando lleva poco oxígeno y más brillante cuando lleva mucho. El tono azul se debe a cómo la piel deja pasar la luz.</p>`,
    ejemplo: `
      <p>Te tomas el pulso en reposo y cuentas 18 latidos en 15 segundos. ¿Cuántos latidos tienes por minuto? ¿Está dentro de lo normal para un adulto?</p>
      <ol class="pasos-ej">
        <li>Un minuto tiene 60 segundos, que son 4 veces 15 segundos. Por eso multiplicas por 4: 18 × 4 = 72 latidos por minuto.</li>
        <li>Compara con el rango normal en reposo, de 60 a 100. Como 72 queda entre los dos, está dentro de lo normal.</li>
        <li>Comprueba al revés: 72 latidos en 60 segundos son 72 ÷ 60 = 1.2 latidos por segundo, y en 15 segundos dan 1.2 × 15 = 18. Coincide con lo que contaste.</li>
      </ol>
      <p>Resultado: <span class="resultado">72 latidos por minuto, dentro de lo normal</span>. Si en reposo tu pulso es muy rápido o muy lento y además te sientes mal, consulta a un médico.</p>
      <p class="nota"><strong>Error común:</strong> olvidar multiplicar por 4 y pensar que 18 es el pulso por minuto, que sería alarmantemente lento.</p>`,
    vidaReal: `
      <p>Lo que hace tu corazón se nota todos los días:</p>
      <ul>
        <li>Tomarte el pulso te dice qué tan rápido late tu corazón, en reposo o al hacer ejercicio.</li>
        <li>El ejercicio regular fortalece el corazón, que también es un músculo.</li>
        <li>Al donar sangre, una persona puede salvar a alguien que perdió mucha en un accidente.</li>
        <li>En un viaje largo, caminar un poco cada cierto tiempo ayuda a que la sangre de tus piernas regrese al corazón.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Cuentas 20 latidos en 15 segundos. ¿Cuántos latidos son por minuto?</p>', respuesta: 20 * 4,
        pista: '<p>¿Cuántas veces cabe 15 segundos en un minuto?</p>',
        solucion: '<p>Un minuto son 4 veces 15 segundos: 20 × 4 = <strong>80 latidos por minuto</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué vasos sanguíneos llevan la sangre desde el corazón hacia el cuerpo?</p>',
        opciones: ['Las arterias', 'Las venas', 'Los capilares'], correcta: 0,
        pista: '<p>Son los de paredes gruesas, donde sientes el pulso.</p>',
        solucion: '<p>Las <strong>arterias</strong>. Las venas regresan la sangre al corazón, y los capilares unen a unas con otras.</p>' },
      { tipo: 'numero', enunciado: '<p>Un corazón late 70 veces por minuto. ¿Cuántas veces late en una hora?</p>', respuesta: 70 * 60,
        pista: '<p>Una hora tiene 60 minutos.</p>',
        solucion: '<p>70 × 60 = <strong>4 200 latidos</strong> en una hora, y más de cien mil en un día.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿En qué vasos pasa el oxígeno de la sangre a las células?</p>',
        opciones: ['En las arterias', 'En los capilares', 'En las venas'], correcta: 1,
        pista: '<p>Busca los tubos más delgados, con paredes muy finas.</p>',
        solucion: '<p>En los <strong>capilares</strong>. Sus paredes son tan delgadas que el oxígeno y los nutrientes las atraviesan.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué camino sigue la sangre en la vuelta corta?</p>',
        opciones: ['Pulmones → cuerpo → pulmones', 'Corazón → cuerpo → pulmones', 'Corazón → pulmones → corazón'], correcta: 2,
        pista: '<p>Revisa la parte de arriba del diagrama.</p>',
        solucion: '<p><strong>Corazón → pulmones → corazón</strong>. En esa vuelta la sangre se carga de oxígeno y suelta el CO₂.</p>' },
      { tipo: 'numero', enunciado: '<p>En cada latido, el corazón empuja unos 70 mL de sangre, y late 70 veces por minuto. ¿Cuántos litros de sangre bombea en un minuto?</p>', respuesta: 70 * 70 / 1000, tolerancia: 0.01,
        pista: '<p>Multiplica y luego pasa los mililitros a litros: 1 L = 1 000 mL.</p>',
        solucion: '<p>70 × 70 = 4 900 mL, que son <strong>4.9 litros</strong>. Es casi toda tu sangre: da una vuelta completa en más o menos un minuto.</p>' },
    ],
    fuentes: [
      OCB('16-3-circulatory-and-respiratory-systems', 'Circulatory and Respiratory Systems'),
      OSB('40-1-overview-of-the-circulatory-system', 'Overview of the Circulatory System'),
      WIKI('Aparato_circulatorio', 'Aparato circulatorio'),
      WIKI('Corazón', 'Corazón'),
      MEDLINE('heartdiseases.html', 'Enfermedades del corazón'),
    ],
  });

  // ------------------------------------------------------------------
  const REFLEJO = diagrama([-0.4, 10.4], [-1, 3.3], [
    caja(0, 0, 2.4, 0.8), txt(1.2, 0.4, 'piel'),
    caja(3.3, 0, 6.7, 0.8, true), txt(5, 0.4, 'médula espinal'),
    caja(7.6, 0, 10, 0.8), txt(8.8, 0.4, 'músculo'),
    caja(3.3, 2.1, 6.7, 2.9), txt(5, 2.5, 'cerebro'),
    ...flecha([2.4, 0.4], [3.3, 0.4], 0, 0.8), txt(2.85, -0.45, 'aviso'),
    ...flecha([6.7, 0.4], [7.6, 0.4], 0, 0.8), txt(7.15, -0.45, 'orden'),
    { tipo: 'linea', desde: [5, 0.8], hasta: [5, 1.75], punteada: true }, ...flecha([5, 1.7], [5, 2.1], 0, 0.8),
    txt(7.4, 1.45, 'llega después'),
  ], 'Diagrama del reflejo con cajas y flechas. De izquierda a derecha: piel, flecha rotulada aviso, médula espinal, flecha rotulada orden, músculo. De la médula espinal sale además una línea punteada hacia arriba, hasta una caja rotulada cerebro, con el texto llega después.');

  L('Sistema nervioso', {
    objetivo: 'Explicar cómo viajan los mensajes por tu cuerpo, qué hacen el encéfalo y la médula, y por qué algunos movimientos ocurren antes de pensarlos.',
    explicacion: `
      <p>Tocas sin querer una olla caliente y quitas la mano de golpe. Un instante después sientes el dolor y te das cuenta de que quemaba. Tu mano se movió antes de que lo pensaras. ¿Quién dio la orden?</p>
      <p>Tu cuerpo tiene una red de mensajería que conecta cada parte con un centro de control. Se llama sistema nervioso, y funciona como los cables de una casa: lleva avisos desde los sentidos y órdenes hacia los músculos.</p>
      <h3>Las neuronas</h3>
      <p>Una <strong>neurona</strong> es una célula especializada en llevar mensajes. Tiene un cuerpo con su núcleo, unas ramitas cortas que reciben mensajes y una prolongación larga, como un cable, que los envía. Algunas son larguísimas: las que van de tu espalda a los dedos del pie miden cerca de un metro.</p>
      <p>El mensaje que viaja por una neurona se llama <strong>impulso nervioso</strong>. Es una pequeña señal eléctrica. Las neuronas más rápidas lo llevan a unos 100 metros por segundo, y otras a apenas 1 metro por segundo. Cuando el impulso llega al final de una neurona, suelta unas sustancias que pasan el mensaje a la siguiente, como en una carrera de relevos.</p>
      <h3>El centro de control y los cables</h3>
      <ul>
        <li>El encéfalo, dentro del cráneo, interpreta lo que sientes, guarda recuerdos, piensa y decide. El cerebro es su parte más grande.</li>
        <li>La médula espinal es un cordón de neuronas que baja por dentro de la columna. Conecta el encéfalo con el resto del cuerpo, como un cable principal.</li>
        <li>Los nervios son haces de neuronas que van de la médula y del encéfalo a la piel, los músculos y los órganos.</li>
      </ul>
      <p>El encéfalo y la médula están protegidos por hueso, el cráneo y la columna, porque un golpe fuerte ahí puede cortar la comunicación. Por eso conviene usar casco en la bicicleta.</p>
      <h3>Los reflejos</h3>
      <p>Un <strong>reflejo</strong> es una respuesta automática y muy rápida que no espera a que el cerebro decida. En el caso de la olla, el aviso de la piel llega a la médula, y la médula manda directo la orden al músculo del brazo. El aviso también sube al cerebro, pero llega después; por eso sientes el dolor cuando la mano ya se movió.</p>
      ${REFLEJO}
      <p>¿Por qué funciona así? Porque un camino más corto tarda menos, y ante un peligro esa fracción de segundo protege tu piel. Parpadear cuando algo se acerca a tu ojo y la patadita cuando el médico golpea tu rodilla también son reflejos.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que todo lo que hace tu cuerpo lo decide el cerebro en el momento. Muchos reflejos se resuelven en la médula sin esperar al cerebro, y muchas tareas, como el latido del corazón o la digestión, funcionan solas sin que pienses en ellas.</p>`,
    ejemplo: `
      <p>Un impulso viaja a 100 metros por segundo por una neurona de 1 metro, del pie a la espalda. ¿Cuánto tarda en recorrerla?</p>
      <ol class="pasos-ej">
        <li>En Física viste que la rapidez es distancia entre tiempo. Si quieres el tiempo, despejas: tiempo = distancia ÷ rapidez.</li>
        <li>Sustituye los datos: 1 m ÷ 100 m/s = 0.01 segundos.</li>
        <li>Ponlo en palabras: es una centésima de segundo, mucho menos que un parpadeo.</li>
        <li>Comprueba al revés: en 0.01 segundos, a 100 m/s, recorre 100 × 0.01 = 1 metro, justo el largo de la neurona.</li>
      </ol>
      <p>Resultado: <span class="resultado">0.01 segundos</span>. Una neurona lenta, de 1 m/s, tardaría 1 segundo entero, cien veces más.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar la distancia por la rapidez. Eso da 100, que no tiene sentido como tiempo. Si la rapidez es grande, el tiempo debe salir pequeño.</p>`,
    vidaReal: `
      <p>Tu red de mensajes trabaja todo el tiempo, aunque no lo notes:</p>
      <ul>
        <li>Usar casco protege tu cabeza, donde está el centro de control de tu cuerpo.</li>
        <li>Dormir bien ayuda a tu cerebro a guardar lo que aprendiste durante el día.</li>
        <li>El médico golpea tu rodilla con un martillito para revisar que los mensajes de tu cuerpo viajen bien.</li>
        <li>Manejar con sueño o después de beber alcohol es peligroso porque reaccionas más lento.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un impulso viaja a 50 m/s por una neurona de 1 m. ¿Cuántos segundos tarda en recorrerla?</p>', respuesta: 1 / 50, tolerancia: 0.001,
        pista: '<p>Tiempo = distancia ÷ rapidez.</p>',
        solucion: '<p>1 ÷ 50 = <strong>0.02 segundos</strong>, dos centésimas de segundo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tocas una olla caliente. ¿Qué camino sigue el reflejo que retira tu mano?</p>',
        opciones: ['Piel → cerebro → músculo', 'Piel → médula espinal → músculo', 'Músculo → médula espinal → piel'], correcta: 1,
        pista: '<p>En un reflejo, el aviso no espera a que decida el cerebro.</p>',
        solucion: '<p><strong>Piel → médula espinal → músculo</strong>. La médula da la orden directo. El aviso llega al cerebro después, y por eso sientes el dolor cuando ya quitaste la mano.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la célula especializada en llevar mensajes?</p>', respuestas: ['neurona', 'neuronas', 'la neurona', 'las neuronas', 'celula nerviosa', 'una neurona'],
        pista: '<p>Tiene ramitas que reciben mensajes y un "cable" largo que los envía.</p>',
        solucion: '<p>La <strong>neurona</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué protege a la médula espinal?</p>',
        opciones: ['El cráneo', 'Las costillas', 'La columna vertebral'], correcta: 2,
        pista: '<p>La médula baja por dentro de un hueso de tu espalda.</p>',
        solucion: '<p>La <strong>columna vertebral</strong>. El cráneo protege al encéfalo, y las costillas al corazón y los pulmones.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas acciones es un reflejo?</p>',
        opciones: ['Parpadear cuando algo se acerca a tu ojo', 'Resolver un problema de matemáticas', 'Elegir qué ropa ponerte'], correcta: 0,
        pista: '<p>Busca la que ocurre sola, sin que la decidas.</p>',
        solucion: '<p><strong>Parpadear</strong> cuando algo se acerca. Pasa solo y muy rápido. Las otras dos las piensas y decides con el cerebro.</p>' },
      { tipo: 'numero', enunciado: '<p>Un impulso viaja a 100 m/s. ¿Cuántos metros recorre en 0.02 segundos?</p>', respuesta: 100 * 0.02, tolerancia: 0.001,
        pista: '<p>Distancia = rapidez × tiempo.</p>',
        solucion: '<p>100 × 0.02 = <strong>2 metros</strong>, más que la altura de una persona.</p>' },
    ],
    fuentes: [
      OCB('16-6-nervous-system', 'Nervous System'),
      OSB('35-1-neurons-and-glial-cells', 'Neurons and Glial Cells'),
      WIKI('Sistema_nervioso', 'Sistema nervioso'),
      WIKI('Neurona', 'Neurona'),
      PHET('neuron', 'Neurona'),
    ],
  });

  // ------------------------------------------------------------------
  const RESPUESTA = [[0, 0], [5, 0], [9, 0.3], [17, 3], [26, 1.4], [40, 1], [43, 3], [48, 9], [60, 8]];
  const ANTICUERPOS = G({
    x: [0, 60], y: [0, 11], pasos: [10, 1e9], nombres: false,
    funciones: [{ f: tramos(RESPUESTA), serie: 0 }],
    figuras: [
      { tipo: 'linea', desde: [5, 0], hasta: [5, 9.8], punteada: true }, txt(5, 10.4, 'contacto 1'),
      { tipo: 'linea', desde: [40, 0], hasta: [40, 9.8], punteada: true }, txt(40, 10.4, 'contacto 2'),
      txt(17, 3.8, 'primera vez'), txt(51, 9.5, 'segunda vez'),
    ],
    descripcion: 'Gráfica esquemática, sin valores reales, de la cantidad de anticuerpos según los días, de 0 a 60. Una línea punteada marca el primer contacto con un microbio, en el día 5: la curva sube despacio y llega a una altura baja, de 3, cerca del día 17, y luego baja. Otra línea punteada marca el segundo contacto, en el día 40: la curva sube rápido y llega a 9, el triple que la primera vez, en el día 48, y se mantiene alta.',
  });

  L('Sistema inmunológico y vacunas', {
    objetivo: 'Explicar cómo te defiende tu cuerpo de los microbios, cómo funcionan las vacunas y por qué protegen también a los demás.',
    explicacion: `
      <p>Si de niño te dio varicela, lo más probable es que no te vuelva a dar. Tu cuerpo "recuerda" al virus que la causa y lo detiene antes de que te enfermes. ¿Cómo puede recordar algo un cuerpo?</p>
      <p>En la Unidad 1 viste que estás rodeado de microbios, y que solo unos pocos causan enfermedades. El sistema inmunológico es el conjunto de defensas que los mantiene a raya. Trabaja en capas, como la seguridad de un edificio.</p>
      <h3>Primera capa: las barreras</h3>
      <p>La piel sana es una muralla que casi ningún microbio puede cruzar. El moco de la nariz atrapa partículas, las lágrimas y la saliva tienen sustancias que dañan a las bacterias, y el ácido del estómago mata a muchos de los microbios que tragas. Por eso es importante lavar una herida: es una puerta abierta en la muralla.</p>
      <h3>Segunda capa: los guardias</h3>
      <p>Si un microbio entra, lo enfrentan los glóbulos blancos, células de la sangre que patrullan el cuerpo. Algunos se comen a cualquier invasor. La zona se inflama, es decir, se pone roja, caliente e hinchada, porque llega más sangre con más defensas. La fiebre también ayuda, porque a muchos microbios les cuesta multiplicarse con más calor.</p>
      <h3>Tercera capa: defensas a la medida</h3>
      <p>Otros glóbulos blancos fabrican <strong>anticuerpos</strong>: proteínas con una forma que encaja con un solo microbio, como una llave en su cerradura. Se pegan a él, lo marcan para que lo destruyan y le impiden entrar a tus células. La primera vez, fabricarlos tarda una o dos semanas, y mientras tanto te enfermas.</p>
      <p>Al terminar, quedan unas células que recuerdan a ese microbio. A esto se le llama <strong>memoria inmunológica</strong>. Si el mismo microbio vuelve, la respuesta es mucho más rápida y fuerte, y casi siempre lo detiene antes de que lo notes. La gráfica lo muestra con un dibujo esquemático: abajo están los días y la altura de la curva es la cantidad de anticuerpos.</p>
      ${ANTICUERPOS}
      <h3>Las vacunas</h3>
      <p>Una <strong>vacuna</strong> le enseña a tu cuerpo a reconocer un microbio sin que tengas que enfermarte. Contiene el microbio debilitado o muerto, o solo una pieza de él, o las instrucciones para fabricar esa pieza. Tus defensas reaccionan y crean memoria, así que si después te encuentras con el microbio de verdad, ya estás preparado. Según la OMS, las vacunas son seguras, se revisan con mucho cuidado y salvan millones de vidas cada año.</p>
      <p>Además, protegen a quienes no pueden recibirlas, como los bebés muy pequeños o las personas con defensas débiles. Si casi todos a su alrededor están vacunados, el microbio no encuentra cómo pasar de persona en persona. A esto se le llama inmunidad de grupo. Para el sarampión, que se contagia con mucha facilidad, hace falta que unas 95 de cada 100 personas estén vacunadas.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que los antibióticos y las vacunas son lo mismo. El antibiótico ataca bacterias que ya te infectaron. La vacuna prepara tus defensas antes, y las hay contra virus y contra bacterias. Pregunta al personal de salud qué vacunas te tocan según tu edad. Después de una vacuna es normal tener dolor en el brazo o algo de fiebre uno o dos días. Si tienes dificultad para respirar, la cara hinchada o te sientes muy mal, pide ayuda médica de inmediato.</p>`,
    ejemplo: `
      <p>En una escuela hay 800 alumnos. Para frenar el sarampión, al menos el 95% debe estar vacunado. ¿Cuántos alumnos vacunados hacen falta como mínimo, y cuántos pueden quedar sin vacuna?</p>
      <ol class="pasos-ej">
        <li>Primero pasa el porcentaje a decimal, dividiendo entre 100: 95% = 0.95.</li>
        <li>Multiplica por el total de alumnos: 0.95 × 800 = 760 alumnos vacunados.</li>
        <li>Resta para saber cuántos pueden quedar sin vacuna: 800 − 760 = 40.</li>
        <li>Comprueba: 40 de 800 son 40 ÷ 800 = 0.05, es decir, 5%. Y 95% + 5% = 100%.</li>
      </ol>
      <p>Resultado: <span class="resultado">al menos 760 vacunados; como mucho 40 sin vacuna</span>. Entre esos 40 puede haber personas que no pueden vacunarse por su salud, y son justo las que la inmunidad de grupo protege.</p>
      <p class="nota"><strong>Error común:</strong> contestar 95 alumnos. El 95% no son 95 personas, sino 95 de cada 100.</p>`,
    vidaReal: `
      <p>Tus defensas trabajan cada día, y puedes ayudarlas:</p>
      <ul>
        <li>Lavar y cubrir una herida evita que los gérmenes entren por ella.</li>
        <li>La fiebre y la hinchazón son señales de que tu cuerpo se está defendiendo.</li>
        <li>La cartilla de salud de los niños registra las inyecciones que los protegen de enfermedades graves.</li>
        <li>Cuando casi todos en una comunidad se protegen, los bebés que aún son muy pequeños corren menos riesgo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En un pueblo viven 1 200 personas. ¿Cuántas deben estar vacunadas para llegar al 95%?</p>', respuesta: 1200 * 95 / 100,
        pista: '<p>Calcula el 95% de 1 200.</p>',
        solucion: '<p>0.95 × 1 200 = <strong>1 140 personas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué contiene una vacuna?</p>',
        opciones: ['Antibióticos que matan al microbio', 'El microbio debilitado o muerto, una pieza de él o las instrucciones para fabricarla', 'Glóbulos blancos de otra persona'], correcta: 1,
        pista: '<p>La vacuna enseña a tus defensas a reconocer al microbio sin enfermarte.</p>',
        solucion: '<p><strong>El microbio debilitado o muerto, una pieza de él o las instrucciones para fabricarla</strong>. Con eso tus defensas aprenden y crean memoria.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué la segunda vez que llega un mismo microbio la respuesta es más rápida?</p>',
        opciones: ['Porque quedan células que recuerdan al microbio', 'Porque el microbio se vuelve más débil', 'Porque la piel se hace más gruesa'], correcta: 0,
        pista: '<p>Revisa la gráfica y lo que pasa al terminar la primera vez.</p>',
        solucion: '<p>Porque <strong>quedan células que lo recuerdan</strong>: es la memoria inmunológica. Así fabrican anticuerpos mucho más rápido.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llaman las proteínas que encajan con un solo microbio, como una llave en su cerradura?</p>',
        respuestas: ['anticuerpo', 'anticuerpos', 'los anticuerpos'],
        pista: '<p>Los fabrican algunos glóbulos blancos.</p>',
        solucion: '<p>Los <strong>anticuerpos</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas defensas pertenece a la primera capa, las barreras?</p>',
        opciones: ['Los anticuerpos', 'La memoria inmunológica', 'La piel'], correcta: 2,
        pista: '<p>La primera capa impide que el microbio entre.</p>',
        solucion: '<p>La <strong>piel</strong>, que funciona como una muralla. Los anticuerpos y la memoria forman parte de la tercera capa.</p>' },
      { tipo: 'numero', enunciado: '<p>En una comunidad de 500 personas hay 440 vacunadas contra el sarampión. ¿Qué porcentaje es?</p>', respuesta: 440 / 500 * 100,
        pista: '<p>Divide la parte entre el total y multiplica por 100.</p>',
        solucion: '<p>440 ÷ 500 = 0.88, que es el <strong>88%</strong>. Todavía no llega al 95% que se necesita para frenar el sarampión.</p>' },
    ],
    fuentes: [
      OCB('17-2-innate-immunity', 'Innate Immunity'),
      OCB('17-3-adaptive-immunity', 'Adaptive Immunity'),
      WIKI('Sistema_inmunitario', 'Sistema inmunitario'),
      WIKI('Inmunidad_de_grupo', 'Inmunidad de grupo'),
      MEDLINE('immunization.html', 'Vacunación'),
      OMS('health-topics/vaccines-and-immunization', 'Vacunas e inmunización'),
      OMS('news-room/questions-and-answers/item/vaccines-and-immunization-what-is-vaccination', 'Vacunas e inmunización: ¿qué es la vacunación?'),
    ],
  });

  // ------------------------------------------------------------------
  const CICLO = G({
    x: [0, 29], y: [-1, 3.2], ejes: false, figuras: [
      caja(1, 1, 29, 2), caja(1, 1, 6, 2, true), caja(14, 1, 15, 2, true),
      txt(3.5, 2.5, 'regla'), txt(3.5, 0.4, 'días 1 a 5'),
      txt(14.5, 2.5, 'ovulación'), txt(14.5, 0.4, 'cerca del día 14'),
      txt(27, 0.4, 'día 28'),
    ],
    descripcion: 'Línea de tiempo de un ciclo menstrual típico de 28 días, dibujada como una barra larga. Los días 1 a 5 están sombreados y rotulados regla. Cerca del día 14 hay otra marca sombreada rotulada ovulación. Al final de la barra, abajo, dice día 28.',
  });

  L('Sistema reproductor y sexualidad responsable', {
    objetivo: 'Conocer las partes básicas del sistema reproductor, cómo empieza un embarazo y qué significa vivir la sexualidad de forma responsable.',
    explicacion: `
      <p>Cada persona que conoces empezó siendo una sola célula, más pequeña que el punto al final de esta frase. Esa célula se formó cuando se unieron dos células, una de cada progenitor. El sistema reproductor es el conjunto de órganos que fabrica esas células y que permite que se forme un bebé.</p>
      <h3>Las células que se unen</h3>
      <p>Un <strong>gameto</strong> es una célula especial para la reproducción, que lleva la mitad del ADN de una persona. Hay dos tipos. El óvulo es grande y redondo, y se forma en los ovarios, dos órganos del tamaño de una almendra en la parte baja del vientre. El espermatozoide es muy pequeño, tiene una cola para nadar y se forma en los testículos.</p>
      <p>La <strong>fecundación</strong> es la unión de un óvulo con un espermatozoide. Juntos forman la primera célula de un nuevo ser, con el ADN completo: la mitad de cada progenitor. Por eso te pareces en algunas cosas a cada uno. Esa célula se divide muchas veces y, si se instala en el útero, un órgano hueco de paredes musculares, crece ahí unas 40 semanas, unos nueve meses, hasta el nacimiento.</p>
      <h3>La pubertad y el ciclo menstrual</h3>
      <p>La <strong>pubertad</strong> es la etapa en que el cuerpo madura y se vuelve capaz de reproducirse. Suele empezar entre los 8 y los 14 años, y cada persona va a su propio ritmo. Unas sustancias llamadas hormonas provocan los cambios: el cuerpo crece rápido, aparece vello, cambia la voz y también cambian las emociones. Son cambios normales.</p>
      <p>En las personas con ovarios y útero, la pubertad trae el ciclo menstrual. Más o menos una vez al mes, un ovario suelta un óvulo, lo que se llama ovulación, y el útero prepara su pared por si hay un embarazo. Si no lo hay, esa pared se desprende y sale como sangrado: es la regla o menstruación, que suele durar de 3 a 7 días. El ciclo se cuenta desde el primer día de una regla hasta el primer día de la siguiente. Muchos duran unos 28 días, pero pueden ser más cortos o más largos y ser normales, y en los primeros años es común que sean irregulares.</p>
      ${CICLO}
      <h3>Sexualidad responsable</h3>
      <p>La sexualidad no es solo reproducción: incluye tus emociones, tus relaciones y el respeto por tu cuerpo y por el de los demás. Vivirla de forma responsable significa, entre otras cosas:</p>
      <ul>
        <li>Nadie debe tocarte ni presionarte sin tu permiso, y tú tampoco a nadie. Ese acuerdo libre se llama consentimiento: un "sí" dado con miedo o bajo presión no cuenta, y puedes cambiar de opinión en cualquier momento. Una persona dormida o bajo el efecto del alcohol o de drogas no puede dar su consentimiento, y un adulto nunca debe tener contacto sexual con un niño o una niña.</li>
        <li>Las relaciones sexuales pueden causar un embarazo y transmitir infecciones de transmisión sexual, como el VIH. Según la OMS, el condón, usado bien y siempre, protege de las dos cosas.</li>
        <li>Tienes derecho a informarte. Un adulto de confianza o el personal de salud pueden resolver tus dudas sin juzgarte.</li>
      </ul>
      <p class="nota"><strong>Cuándo buscar ayuda:</strong> si alguien te toca o te presiona sin tu permiso, cuéntaselo a un adulto de confianza aunque te hayan pedido guardar el secreto. Consulta también al personal de salud si tienes dolor muy fuerte, un sangrado muy abundante o grandes cambios en tu ciclo, o molestias en tus genitales. Si estás en peligro ahora mismo, llama al número de emergencias de tu país.</p>`,
    ejemplo: `
      <p>Una regla empezó el 3 de marzo y la siguiente empezó el 31 de marzo. ¿Cuántos días duró ese ciclo? ¿Está cerca del promedio?</p>
      <ol class="pasos-ej">
        <li>Recuerda cómo se cuenta: desde el primer día de una regla hasta el primer día de la siguiente, sin contar este último, que ya es el día 1 del ciclo nuevo.</li>
        <li>Como las dos fechas están en el mismo mes, resta: 31 − 3 = 28 días.</li>
        <li>Comprueba contando: del 3 al 30 de marzo hay 28 días, y el 31 empieza otro ciclo.</li>
        <li>Compara con el promedio. Muchos ciclos duran unos 28 días, así que este está justo en el promedio.</li>
      </ol>
      <p>Resultado: <span class="resultado">un ciclo de 28 días</span>. Anotar estas fechas cada mes ayuda a saber cuándo esperar la siguiente regla y a notar cambios.</p>
      <p class="nota"><strong>Error común:</strong> contar también el día 31 y obtener 29. Ese día ya pertenece al ciclo siguiente.</p>`,
    vidaReal: `
      <p>Conocer tu cuerpo te ayuda a cuidarte y a cuidar a otros:</p>
      <ul>
        <li>Entender los cambios de tu cuerpo al crecer te ayuda a vivirlos con calma y sin vergüenza.</li>
        <li>Si menstrúas, anotar el día en que empieza cada regla te ayuda a saber cuándo llegará la siguiente.</li>
        <li>Saber cómo se transmiten algunas infecciones te permite protegerte y cuidar a otras personas.</li>
        <li>Conocer tus derechos sobre tu cuerpo te ayuda a reconocer cuándo algo no está bien y a pedir ayuda.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una regla empezó el 5 de mayo y la siguiente el 2 de junio. Mayo tiene 31 días. ¿Cuántos días duró ese ciclo?</p>', respuesta: (31 - 5 + 1) + 1,
        pista: '<p>Cuenta los días que faltan para terminar mayo y súmales los de junio antes del día 2.</p>',
        solucion: '<p>Del 5 al 31 de mayo hay 31 − 5 + 1 = 27 días, y en junio se cuenta solo el día 1, porque el 2 ya empieza otro ciclo. En total, 27 + 1 = <strong>28 días</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un embarazo dura unas 40 semanas. ¿Cuántos días son?</p>', respuesta: 40 * 7,
        pista: '<p>Cada semana tiene 7 días.</p>',
        solucion: '<p>40 × 7 = <strong>280 días</strong>, un poco más de nueve meses.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Dónde se forman los óvulos?</p>',
        opciones: ['En el útero', 'En los ovarios', 'En los testículos'], correcta: 1,
        pista: '<p>Son dos órganos del tamaño de una almendra.</p>',
        solucion: '<p>En los <strong>ovarios</strong>. El útero es donde crece el bebé, y en los testículos se forman los espermatozoides.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es el consentimiento?</p>',
        opciones: ['Un acuerdo libre, sin miedo ni presión, que se puede cambiar en cualquier momento', 'Aceptar porque la otra persona insistió mucho', 'Un permiso que se da una vez y vale para siempre'], correcta: 0,
        pista: '<p>Un "sí" bajo presión no cuenta.</p>',
        solucion: '<p>Es <strong>un acuerdo libre, sin miedo ni presión</strong>, y puedes cambiar de opinión cuando quieras. Ceder porque alguien insiste no es consentir.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la OMS, ¿qué método protege a la vez del embarazo y de las infecciones de transmisión sexual?</p>',
        opciones: ['Lavarse después', 'Las pastillas anticonceptivas', 'El condón, usado bien y siempre'], correcta: 2,
        pista: '<p>Busca el que pone una barrera física.</p>',
        solucion: '<p><strong>El condón</strong>. Las pastillas ayudan a evitar el embarazo, pero no protegen de las infecciones, y lavarse después no protege de ninguna de las dos cosas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la unión de un óvulo con un espermatozoide?</p>',
        respuestas: ['fecundacion', 'la fecundacion', 'fertilizacion', 'la fertilizacion'],
        pista: '<p>Es el momento en que se forma la primera célula de un nuevo ser.</p>',
        solucion: '<p>La <strong>fecundación</strong>.</p>' },
    ],
    fuentes: [
      OCB('18-3-human-reproduction', 'Human Reproduction'),
      MEDLINE('puberty.html', 'Pubertad'),
      MEDLINE('menstruation.html', 'Menstruación'),
      MEDLINE('teensexualhealth.html', 'Salud sexual del adolescente'),
      OMS('news-room/fact-sheets/detail/sexually-transmitted-infections-(stis)', 'Infecciones de transmisión sexual'),
      OMS('news-room/fact-sheets/detail/family-planning-contraception', 'Planificación familiar y anticoncepción'),
    ],
  });

  // ------------------------------------------------------------------
  const BRAZO = diagrama([-3.8, 7.8], [0.3, 5], [
    caja(0.4, 1.4, 1.0, 4.6),
    caja(0.4, 0.8, 5, 1.4),
    { tipo: 'circulo', x: 0.7, y: 1.1, r: 0.35 },
    { tipo: 'poligono', puntos: [[1.0, 4.3], [1.6, 3.6], [1.8, 2.6], [1.6, 1.8], [1.4, 1.5], [1.0, 2.0]], relleno: true },
    { tipo: 'poligono', puntos: [[0.4, 4.3], [-0.2, 3.5], [-0.3, 2.4], [0, 1.4], [0.4, 1.7]], relleno: true },
    { tipo: 'linea', desde: [1.4, 1.6], hasta: [1.9, 1.4] },
    txt(3.3, 1.1, 'antebrazo'),
    ...rotulo(6.6, 3.8, 'bíceps', [1.75, 3.3]),
    ...rotulo(6.6, 2.4, 'tendón', [1.68, 1.52]),
    ...rotulo(-2.6, 4.5, 'húmero', [0.38, 4.45], -1),
    ...rotulo(-2.6, 2.8, 'tríceps', [-0.27, 2.8], -1),
    ...rotulo(-2.6, 1.1, 'codo', [0.33, 1.1], -1),
  ], 'Brazo doblado visto de lado, dibujado con formas simples. El hueso del brazo, rotulado húmero, va vertical; el antebrazo sale horizontal hacia la derecha desde el codo, un círculo rotulado codo. Pegado al frente del húmero hay un músculo sombreado rotulado bíceps, que se une al antebrazo por un tendón rotulado. Pegado atrás del húmero hay otro músculo sombreado rotulado tríceps.');

  L('Huesos y músculos', {
    objetivo: 'Explicar cómo trabajan juntos los huesos, las articulaciones y los músculos para que te muevas, y cómo cuidarlos.',
    explicacion: `
      <p>Dobla el brazo y pon la otra mano al frente, arriba del codo. Sientes que algo se pone duro y se abulta: es tu bíceps, un músculo, jalando el hueso del antebrazo. Ahora estira el brazo: el bíceps se afloja y algo se endurece atrás. ¿Por qué hacen falta dos músculos?</p>
      <h3>El esqueleto</h3>
      <p>Un adulto tiene 206 huesos. Un bebé nace con unos 300, más blandos, pero muchos se unen mientras crece. Por ejemplo, el cráneo de un bebé tiene partes separadas que se van cerrando.</p>
      <p>Los huesos hacen varios trabajos. Sostienen tu cuerpo, como las vigas de una casa. Protegen lo delicado: el cráneo guarda el encéfalo, y las costillas, el corazón y los pulmones. Guardan calcio, un mineral que tu cuerpo usa en muchas tareas. Y dentro de algunos, en la médula ósea, se fabrican las células de la sangre. Aunque parezcan piedras, los huesos están vivos: tienen células y vasos sanguíneos, y por eso una fractura puede soldar.</p>
      <h3>Donde se juntan los huesos</h3>
      <p>Una <strong>articulación</strong> es el lugar donde se juntan dos huesos. Algunas casi no se mueven, como las del cráneo de un adulto. Otras se doblan en una sola dirección, como una bisagra: el codo y la rodilla. Y otras giran hacia muchos lados, como el hombro y la cadera, que son una bola dentro de un hueco. Los huesos de una articulación se mantienen unidos con <strong>ligamentos</strong>, unas bandas fuertes, como ligas muy resistentes. Un esguince es un ligamento que se estiró de más o se rompió.</p>
      <h3>Los músculos solo jalan</h3>
      <p>Tienes más de 600 músculos. Los que mueven tus huesos se pegan a ellos con <strong>tendones</strong>, cordones duros como cuerdas. Puedes sentir uno, el tendón de Aquiles, en la parte de atrás de tu tobillo.</p>
      <p>Un músculo trabaja contrayéndose: se acorta y jala el hueso al que está pegado. Pero no puede empujar. Por eso los músculos trabajan en parejas que jalan en sentidos opuestos. El bíceps, al frente del brazo, jala el antebrazo hacia arriba y dobla el codo. El tríceps, atrás, jala para estirarlo. Cuando uno se contrae, el otro se relaja.</p>
      ${BRAZO}
      <p>El codo funciona como la palanca que viste en Física: la articulación es el punto de apoyo y el músculo pone la fuerza.</p>
      <p>No todos los músculos mueven huesos. El corazón es un músculo, y el estómago y los intestinos tienen músculos que empujan la comida. Esos trabajan solos, sin que tengas que decidirlo.</p>
      <p>Para cuidarlos, come alimentos con calcio, como leche, queso, frijoles o tortillas de maíz, y muévete todos los días: los huesos y los músculos se fortalecen con el uso.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que el bíceps empuja el brazo para estirarlo. Ningún músculo empuja. Para estirar el brazo trabaja el tríceps, que está atrás.</p>`,
    ejemplo: `
      <p>Cada mano tiene 27 huesos y cada pie tiene 26. ¿Qué porcentaje de los 206 huesos del cuerpo está en las manos y los pies?</p>
      <ol class="pasos-ej">
        <li>Primero cuenta los de las dos manos: 2 × 27 = 54.</li>
        <li>Luego los de los dos pies: 2 × 26 = 52.</li>
        <li>Súmalos: 54 + 52 = 106 huesos.</li>
        <li>Divide entre el total y multiplica por 100: 106 ÷ 206 ≈ 0.51, es decir, 51%.</li>
        <li>Comprueba con la mitad: la mitad de 206 es 103, y 106 es un poco más. Por eso el resultado debe salir un poco arriba del 50%.</li>
      </ol>
      <p>Resultado: <span class="resultado">alrededor del 51%</span>. Más de la mitad de tus huesos está en tus manos y tus pies, que necesitan moverse con mucha precisión.</p>
      <p class="nota"><strong>Error común:</strong> contar una sola mano y un solo pie: 27 + 26 = 53. Tienes dos de cada uno.</p>`,
    vidaReal: `
      <p>Tus huesos y músculos trabajan en cada cosa que haces:</p>
      <ul>
        <li>Calentar antes del ejercicio prepara tus músculos y reduce el riesgo de lastimarte.</li>
        <li>Comer alimentos con calcio y moverte todos los días mantiene fuertes tus huesos.</li>
        <li>Levantar cosas pesadas doblando las rodillas, y no la espalda, cuida tu columna.</li>
        <li>Cuando un hueso se rompe, el yeso lo mantiene quieto para que suelde bien.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Cada mano tiene 27 huesos. ¿Qué porcentaje de los 206 huesos del cuerpo está en las dos manos? Redondea a un decimal.</p>', respuesta: 2 * 27 / 206 * 100, tolerancia: 0.1,
        pista: '<p>Cuenta los huesos de las dos manos y divide entre 206.</p>',
        solucion: '<p>2 × 27 = 54, y 54 ÷ 206 ≈ 0.262, que es el <strong>26.2%</strong>, más de la cuarta parte de tus huesos.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué une un músculo con un hueso?</p>',
        opciones: ['El ligamento', 'El tendón', 'La articulación'], correcta: 1,
        pista: '<p>Es un cordón duro, como el que sientes atrás del tobillo.</p>',
        solucion: '<p>El <strong>tendón</strong>. El ligamento une un hueso con otro hueso, y la articulación es el lugar donde se juntan.</p>' },
      { tipo: 'opciones', enunciado: '<p>Para estirar el brazo, ¿qué músculo se contrae?</p>',
        opciones: ['El tríceps', 'El bíceps', 'Los dos a la vez'], correcta: 0,
        pista: '<p>Los músculos solo jalan. ¿Cuál jala desde atrás?</p>',
        solucion: '<p>El <strong>tríceps</strong>, que está atrás del brazo. Mientras tanto, el bíceps se relaja.</p>' },
      { tipo: 'numero', enunciado: '<p>Si un bebé nace con unos 300 huesos y un adulto tiene 206, ¿cuántos huesos menos tiene el adulto?</p>', respuesta: 300 - 206,
        pista: '<p>Resta los del adulto a los del bebé.</p>',
        solucion: '<p>300 − 206 = <strong>94 huesos menos</strong>. No se pierden: se unen unos con otros mientras creces.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el lugar donde se juntan dos huesos, como el codo o la rodilla?</p>',
        respuestas: ['articulacion', 'una articulacion', 'la articulacion', 'articulaciones'],
        pista: '<p>Algunas funcionan como una bisagra.</p>',
        solucion: '<p>Una <strong>articulación</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué los músculos que mueven los huesos trabajan en pares?</p>',
        opciones: ['Porque un músculo solo no tiene fuerza suficiente', 'Porque cada músculo se cansa muy rápido', 'Porque un músculo solo puede jalar, no empujar'], correcta: 2,
        pista: '<p>Piensa en qué pasa cuando un músculo se contrae.</p>',
        solucion: '<p>Porque <strong>un músculo solo puede jalar</strong>. Para regresar el hueso a su lugar hace falta otro que jale en sentido contrario, como el bíceps y el tríceps.</p>' },
    ],
    fuentes: [
      OCB('16-5-musculoskeletal-system', 'Musculoskeletal System'),
      OSB('38-1-types-of-skeletal-systems', 'Types of Skeletal Systems'),
      OSB('38-4-muscle-contraction-and-locomotion', 'Muscle Contraction and Locomotion'),
      WIKI('Sistema_esquelético', 'Sistema esquelético'),
      WIKI('Sistema_muscular', 'Sistema muscular'),
      MEDLINE('bonesjointsandmuscles.html', 'Huesos, articulaciones y músculos'),
    ],
  });
})();
