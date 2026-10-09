// Autosuficiencia · Unidad 1: Bases de la autosuficiencia.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Temas de salud y seguridad: solo fuentes oficiales (OMS, MedlinePlus, Ready.gov); sin diagnósticos ni dosis; siempre cuándo pedir ayuda.
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('autosuficiencia', titulo, datos);
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
  const caja = (x0, y0, x1, y1, relleno = false) => ({ tipo: 'poligono', puntos: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], relleno });

  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const MEDLINE = (ruta, nombre) => ({ nombre: `MedlinePlus en español: ${nombre}`, url: `https://medlineplus.gov/spanish/${ruta}` });
  const OMS = (ficha, nombre) => ({ nombre: `Organización Mundial de la Salud: ${nombre}`, url: `https://www.who.int/es/news-room/fact-sheets/detail/${ficha}` });
  const READY = (ruta, nombre) => ({ nombre: `Ready.gov en español: ${nombre}`, url: `https://www.ready.gov/es/${ruta}` });

  // ------------------------------------------------------------------
  const ESPECTRO = diagrama([0, 12], [0, 3.4], [
    caja(4, 1.25, 8, 1.75, true),
    ...flecha([6, 1.5], [0.4, 1.5], 0, 1.4),
    ...flecha([6, 1.5], [11.6, 1.5], 0, 1.4),
    txt(1.8, 0.9, 'dependes'), txt(1.8, 0.45, 'de todo'),
    txt(10.2, 0.9, 'lo haces todo'), txt(10.2, 0.45, 'tú solo'),
    txt(6, 2.7, 'autosuficiencia realista:'), txt(6, 2.25, 'la zona sombreada'),
  ], 'Una línea horizontal con una flecha en cada punta. La punta izquierda dice "dependes de todo" y la derecha "lo haces todo tú solo". En el centro hay una franja sombreada con el rótulo "autosuficiencia realista": está lejos de los dos extremos.');

  L('Qué es ser autosuficiente (y qué no)', {
    objetivo: 'Explicar qué significa ser autosuficiente, distinguirlo de las ideas falsas más comunes y medir qué parte de algo que usas ya produces tú.',
    explicacion: `
      <p>Imagina que un día se corta el agua en tu calle y, al mismo tiempo, se va la luz. ¿Cuántas cosas de tu día dependen de que el agua salga de la llave y de que haya corriente en el enchufe? Cocinar, lavarte, cargar el teléfono, guardar la comida fría. Casi todo llega a tu casa gracias al trabajo de otras personas que no ves.</p>
      <p>Eso no es malo. Vivir en sociedad significa que cada quien hace una parte y todos nos beneficiamos. El problema aparece cuando algo falla y no tienes ningún plan ni ninguna habilidad para resolverlo, aunque sea por unos días.</p>
      <h3>¿Qué significa ser autosuficiente?</h3>
      <p>Cuando necesitas a alguien o a algo para cubrir una necesidad, tienes una <strong>dependencia</strong>. Dependes de la tienda para comer, de la red de agua para beber y de la compañía de luz para alumbrarte. Algunas dependencias son inofensivas: si un día no hay tu cereal favorito, comes otra cosa. Otras son delicadas, porque cubren algo que no puede faltar, como el agua.</p>
      <p>La <strong>autosuficiencia</strong> es la capacidad de cubrir por tu cuenta una parte de tus necesidades: producir algo de lo que comes, guardar agua, saber reparar cosas o cocinar con lo que tienes. No es un todo o nada. Es más bien una línea que va de un extremo a otro:</p>
      ${ESPECTRO}
      <p>En un extremo está quien depende de otros para absolutamente todo. En el otro, alguien que intentara hacerlo todo solo, desde sembrar el trigo hasta fabricar su ropa y sus medicinas. Ese segundo extremo no es realista: nadie sabe hacerlo todo, y además sería agotador. La meta sensata está en medio, en la zona sombreada: depender menos en lo que más importa y saber qué hacer cuando algo falla.</p>
      <h3>Aguantar el golpe</h3>
      <p>Piensa en una rama de bambú con viento fuerte. Se dobla mucho, pero no se rompe, y cuando pasa el viento vuelve a su lugar. A esa capacidad de aguantar un golpe y recuperarse se le llama <strong>resiliencia</strong>. Una familia resiliente no es la que nunca tiene problemas, sino la que, cuando se corta el agua o sube el precio de la comida, tiene un respaldo y sabe qué hacer.</p>
      <p>Por eso la autosuficiencia y la resiliencia van juntas. Cada habilidad que aprendes y cada cosa que produces o guardas es una pequeña reserva para los días difíciles.</p>
      <h3>Lo que no es</h3>
      <p>Hay varias ideas equivocadas que conviene descartar desde el principio:</p>
      <ul>
        <li>No es aislarse del mundo. Las personas más autosuficientes suelen tener una comunidad fuerte, porque comparten herramientas, semillas y saberes. En la unidad Habilidades y comunidad verás cómo funciona la ayuda mutua.</li>
        <li>No es comprar mucho. Llenar la casa de aparatos y provisiones que no sabes usar o que se echan a perder no te da más seguridad. Lo que cuenta es lo que sabes hacer.</li>
        <li>No es rechazar la medicina ni la tecnología. Un huerto no reemplaza a un médico, y un panel solar es tecnología. Se trata de usar bien lo que existe, no de volver atrás.</li>
        <li>No es tener miedo al futuro. Se parece más a llevar un paraguas cuando el cielo está nublado: no esperas lo peor, solo te preparas.</li>
      </ul>
      <h3>¿Cuánto de algo produces tú?</h3>
      <p>Una forma práctica de ver dónde estás en la línea es medir. Elige una cosa que uses, por ejemplo las verduras que come tu familia en un mes, y compara cuánto produces tú con cuánto usas en total. Como viste en Porcentajes, divides la parte entre el total y multiplicas por 100:</p>
      <p><strong>porcentaje propio = lo que produces ÷ lo que usas × 100</strong></p>
      <p>Si tu familia come 10 kg de verdura al mes y tus macetas dan 1 kg, produces el 10%. Parece poco, pero ese 10% es un 10% que no depende de nadie más. Fíjate que el número sirve para compararte con tu propio punto de partida: si el próximo año llegas al 20%, sabes que avanzaste.</p>
      <h3>Por dónde no empezar</h3>
      <p>El error más común es querer hacerlo todo al mismo tiempo: un gran huerto, gallinas, paneles solares y conservas, todo el mismo mes. Casi siempre termina en cansancio, gastos y plantas secas. Avanzar con un paso pequeño que de verdad mantienes funciona mucho mejor. En la lección "Empezar poco a poco" verás cómo elegir ese primer paso.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que ser autosuficiente significa no necesitar a nadie. La meta no es dejar de depender de otros, sino que tus necesidades más importantes no dependan de una sola cosa que puede fallar.</p>`,
    ejemplo: `
      <p>En tu casa se comen 12 kg de verduras al mes. Este mes, tus macetas y tu pequeño huerto dieron 1.8 kg. ¿Qué porcentaje de las verduras produjiste tú?</p>
      <ol class="pasos-ej">
        <li>Primero identifica la parte y el total. La parte es lo que produjiste, 1.8 kg, y el total es lo que se come, 12 kg.</li>
        <li>Divide la parte entre el total para saber qué pedazo del total cubriste: 1.8 ÷ 12 = 0.15.</li>
        <li>Multiplica por 100 para decirlo "de cada cien": 0.15 × 100 = 15%.</li>
        <li>Comprueba al revés: el 10% de 12 kg es 1.2 kg y el 5% es la mitad, 0.6 kg. Juntos dan 1.2 + 0.6 = 1.8 kg, justo lo que produjiste.</li>
      </ol>
      <p>Resultado: <span class="resultado">produces el 15% de tus verduras</span>, y el otro 85% todavía lo compras.</p>
      <p class="nota"><strong>Error común:</strong> dividir al revés, 12 ÷ 1.8. Siempre va la parte arriba y el total abajo; si el resultado pasa de 100%, revisa el orden.</p>`,
    vidaReal: `
      <p>Saber resolver por tu cuenta se nota en días normales y en días difíciles:</p>
      <ul>
        <li>Si se corta el agua o la luz, tu familia sabe qué hacer y no entra en pánico.</li>
        <li>Cuando sube el precio de la comida, lo que cultivas o sabes cocinar te ayuda a gastar menos.</li>
        <li>Saber reparar algo te ahorra dinero y tiempo de espera.</li>
        <li>Puedes ayudar a tus vecinos, y ellos a ti.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tu familia come 25 kg de fruta y verdura al mes, y tu huerto da 5 kg. ¿Qué porcentaje produces tú?</p>', respuesta: 5 / 25 * 100,
        pista: '<p>Divide lo que produces entre lo que comen en total, y luego multiplica por 100.</p>',
        solucion: '<p>5 ÷ 25 = 0.2, y 0.2 × 100 = <strong>20%</strong>. Produces una de cada cinco partes.</p>' },
      { tipo: 'numero', enunciado: '<p>En tu casa se usan 20 kg de verdura al mes. Quieres producir el 30%. ¿Cuántos kilos tendrías que cosechar al mes?</p>', respuesta: 20 * 30 / 100,
        pista: '<p>Saca el 30% de 20 kg: tres veces el 10%.</p>',
        solucion: '<p>El 10% de 20 es 2, así que el 30% es 3 × 2 = <strong>6 kg</strong> al mes.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas frases describe mejor la autosuficiencia?</p>',
        opciones: ['Producir absolutamente todo lo que usas, sin ayuda de nadie', 'Cubrir por tu cuenta una parte de tus necesidades y saber qué hacer cuando algo falla', 'Comprar muchas provisiones y aparatos por si acaso'], correcta: 1,
        pista: '<p>Recuerda la línea de la explicación: ¿dónde está la meta sensata?</p>',
        solucion: '<p><strong>Cubrir una parte de tus necesidades y saber qué hacer.</strong> Hacerlo todo solo no es realista, y comprar mucho no sirve si no sabes usarlo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Se corta el agua en tu colonia durante dos días. ¿Qué familia muestra más resiliencia?</p>',
        opciones: ['La que tiene agua guardada y sabe cuánta usa al día', 'La que compró una bomba cara que nunca ha probado', 'La que espera a ver qué pasa sin ningún plan'], correcta: 0,
        pista: '<p>Resiliencia es aguantar el golpe y recuperarse. ¿Quién tiene un respaldo que de verdad funciona?</p>',
        solucion: '<p><strong>La que tiene agua guardada y sabe cuánta usa.</strong> Tiene un respaldo y una habilidad. Un aparato que no sabes usar no es un respaldo seguro.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas acciones reduce una dependencia importante sin gastar mucho?</p>',
        opciones: ['Llenar la despensa con comida que se echa a perder en una semana', 'Comprar un generador grande sin saber cuánta luz usas', 'Guardar agua y aprender a cocinar con lo que tienes en casa'], correcta: 2,
        pista: '<p>Busca la opción que combina una reserva útil con una habilidad.</p>',
        solucion: '<p><strong>Guardar agua y aprender a cocinar con lo que tienes.</strong> Cubre algo que no puede faltar y no depende de aparatos caros. La comida que se echa a perder no sirve como respaldo.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la capacidad de aguantar un golpe, como un corte de agua, y recuperarse después?</p>',
        respuestas: ['resiliencia', 'la resiliencia'],
        pista: '<p>Piensa en la rama de bambú que se dobla con el viento sin romperse.</p>',
        solucion: '<p>La <strong>resiliencia</strong>.</p>' },
    ],
    fuentes: [
      WIKI('Autoabastecimiento', 'Autoabastecimiento'),
      WIKI('Resiliencia_(psicología)', 'Resiliencia (psicología)'),
      READY('plan', 'Haga un plan'),
      READY('kit', 'Prepare un kit de suministros'),
    ],
  });

  // ------------------------------------------------------------------
  const CUATRO = diagrama([0, 12], [0, 7.4], [
    caja(0.3, 4.6, 4.7, 7.1), txt(2.5, 6.3, 'agua'), txt(2.5, 5.4, '4 L por persona al día'),
    caja(7.3, 4.6, 11.7, 7.1), txt(9.5, 6.3, 'comida'), txt(9.5, 5.4, 'que dure sin frío'),
    caja(0.3, 0.3, 4.7, 2.8), txt(2.5, 2, 'refugio'), txt(2.5, 1.1, 'techo, abrigo, cobijas'),
    caja(7.3, 0.3, 11.7, 2.8), txt(9.5, 2, 'energía'), txt(9.5, 1.1, 'linterna, pilas, radio'),
    caja(4.6, 3.1, 7.4, 4.3, true), txt(6, 3.7, 'tu hogar'),
    ...flecha([4.7, 4.9], [5.3, 4.35], 0, 1.4), ...flecha([7.3, 4.9], [6.7, 4.35], 0, 1.4),
    ...flecha([4.7, 2.5], [5.3, 3.05], 0, 1.4), ...flecha([7.3, 2.5], [6.7, 3.05], 0, 1.4),
  ], 'Cuatro cajas alrededor de una caja central sombreada que dice "tu hogar", con una flecha de cada caja hacia el centro. Arriba a la izquierda: agua, 4 litros por persona al día. Arriba a la derecha: comida que dure sin frío. Abajo a la izquierda: refugio, techo, abrigo y cobijas. Abajo a la derecha: energía, linterna, pilas y radio.');

  L('Necesidades básicas: agua, comida, refugio y energía', {
    objetivo: 'Reconocer las cuatro necesidades básicas, saber por qué el agua va primero y calcular cuánta agua y comida guardar para varios días.',
    explicacion: `
      <p>Imagina que te avisan que mañana habrá un corte de agua y de luz de tres días. Tienes una tarde para prepararte. ¿Qué consigues primero: comida, agua, velas o cobijas? Para decidir bien, conviene saber qué necesita tu cuerpo para estar a salvo y qué tan rápido lo necesita.</p>
      <p>Una <strong>necesidad básica</strong> es algo sin lo cual tu salud corre peligro en poco tiempo. Hay muchas cosas importantes, como la escuela o el trabajo, pero las básicas son cuatro: agua, comida, refugio y energía. Para cada una conviene tener una <strong>reserva</strong>, que es una cantidad guardada para usar solo cuando lo normal falla.</p>
      ${CUATRO}
      <h3>Primero, el agua</h3>
      <p>Tu cuerpo pierde agua todo el tiempo: al sudar, al orinar y hasta al respirar. Tu cuerpo tiene energía guardada para los días en que comes poco, pero no tiene agua de sobra: lo que pierdes hay que reponerlo pronto, o te deshidratas, es decir, te quedas sin el agua que tu cuerpo necesita. Por eso el agua va primero en cualquier plan.</p>
      <p>Ready.gov, el sitio de preparación del gobierno de Estados Unidos, recomienda guardar al menos un galón de agua por persona al día durante varios días. Un galón son unos 3.8 litros, así que en la práctica se redondea a 4 litros, como viste en Ciencias naturales en "Qué hacer ante desastres naturales". De esos 4 litros, unos tres cuartos de galón, casi 3 litros, son para beber; el resto es para cocinar y asearte. Es una cantidad mínima: según Ready.gov, los niños, las personas que están amamantando y las personas enfermas pueden necesitar más. Guarda el agua en envases limpios y bien cerrados.</p>
      <p>No en todo el mundo es fácil conseguirla. Según la Organización Mundial de la Salud, en 2022 unos 2 200 millones de personas todavía no tenían en casa agua para beber segura y disponible cuando la necesitan. En la unidad Agua verás cómo captarla, purificarla y guardarla.</p>
      <p>Aprende también a reconocer cuándo alguien ya necesita más líquido. Según MedlinePlus, en adultos las señales de deshidratación son mucha sed, boca seca, orinar menos de lo normal, orina de color oscuro, cansancio y mareos. Esto no sustituye la opinión de un médico. Si una persona se desmaya, se confunde, tiene convulsiones o no mejora aunque beba, llama de inmediato al número de emergencias.</p>
      <h3>Comida que aguante</h3>
      <p>Para una reserva no sirve cualquier comida. Lo ideal es la comida que no se echa a perder sin refrigerador, como latas, granos secos, frutas secas o cereales, porque en un corte de luz el refrigerador deja de enfriar. Ready.gov recomienda comida para al menos tres días, que no necesite frío, agua ni cocción. Si guardas latas, guarda también un abrelatas manual.</p>
      <p>Fíjate en qué pasa con la comida fría. Si se va la luz, mantén el refrigerador cerrado. Según Ready.gov, la carne, el pollo, el pescado, los huevos y las sobras que pasen dos horas o más a más de unos 4 °C se deben tirar, aunque se vean bien. Ante la duda, tírala, y no la pruebes para comprobar. En Química, en "La química de los alimentos", viste por qué el frío frena a los microbios.</p>
      <h3>Refugio: protegerte del clima</h3>
      <p>El refugio es lo que te protege del frío, del calor, de la lluvia y del viento: una casa, pero también la ropa y las cobijas. Como viste en Física, el calor siempre pasa de lo caliente a lo frío, así que en una noche helada tu cuerpo pierde calor sin parar si no lo cubres. Una cobija no da calor; solo frena esa pérdida. En la unidad Vivienda digna y autosuficiente verás cómo lograr una casa fresca en verano y tibia en invierno.</p>
      <h3>Energía: luz, calor y comunicación</h3>
      <p>La energía te sirve para alumbrarte, cocinar, calentarte y comunicarte. Para una emergencia, Ready.gov recomienda linterna, pilas de repuesto y una radio de pilas o de manivela, para enterarte de las noticias aunque no haya luz ni señal de teléfono.</p>
      <p>Aquí hay un peligro serio. Los generadores, las estufas de campamento y las parrillas de carbón producen monóxido de carbono, un gas venenoso que no se ve ni se huele. Ready.gov indica usarlos siempre al aire libre y a por lo menos 20 pies, unos 6 metros, de las ventanas. Nunca los uses dentro de la casa ni en la cochera, y nunca uses la estufa o el horno de la cocina para calentar la casa. Si alguien se siente mareado, débil o con dolor de cabeza mientras funciona alguno de estos aparatos, salgan de inmediato al aire libre y llamen al número de emergencias. En las unidades Fuego y calor y Energía lo verás con detalle.</p>
      <p class="nota"><strong>Trampa común:</strong> guardar mucha comida y poca agua. La comida enlatada aguanta meses, pero sin agua para beber tu reserva no sirve de mucho. Calcula primero el agua.</p>`,
    ejemplo: `
      <p>En tu casa viven 4 personas. Quieres guardar agua para 3 días con la recomendación de 4 litros por persona al día. ¿Cuántos litros necesitas?</p>
      <ol class="pasos-ej">
        <li>Primero calcula cuánta agua usa toda la familia en un día. Cada persona necesita 4 litros, así que 4 personas × 4 litros = 16 litros al día.</li>
        <li>Ahora multiplica por los días, porque cada día se vuelve a gastar lo mismo: 16 litros × 3 días = 48 litros.</li>
        <li>Comprueba por otro camino: cada persona necesita 4 × 3 = 12 litros para los tres días, y 12 × 4 personas = 48 litros.</li>
        <li>Si usas garrafones de 20 litros, 48 ÷ 20 = 2.4. No puedes llevar 0.4 de garrafón, así que necesitas 3.</li>
      </ol>
      <p>Resultado: <span class="resultado">48 litros, unos 3 garrafones de 20 litros</span>.</p>
      <p class="nota"><strong>Error común:</strong> contar solo el agua para beber, unos 3 litros por persona. Así te quedas sin agua para cocinar y asearte.</p>`,
    vidaReal: `
      <p>Saber qué necesitas primero te ayuda a actuar con calma:</p>
      <ul>
        <li>Si avisan de un corte de agua, sabes cuánta llenar antes de que se vaya.</li>
        <li>Cuando se va la luz, ya tienes linterna y pilas a la mano.</li>
        <li>En un viaje o una salida al campo, llevas lo necesario sin cargar de más.</li>
        <li>Si llega una tormenta, tu familia no tiene que salir corriendo a comprar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En una casa viven 5 personas. ¿Cuántos litros de agua necesitan guardar para 3 días, a 4 litros por persona al día?</p>', respuesta: 5 * 4 * 3,
        pista: '<p>Calcula primero cuánta agua usa toda la familia en un día.</p>',
        solucion: '<p>En un día usan 5 × 4 = 20 litros, y en tres días, 20 × 3 = <strong>60 litros</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tienes un garrafón de 20 litros y en tu casa viven 2 personas. A 4 litros por persona al día, ¿para cuántos días alcanza?</p>', respuesta: 20 / (2 * 4),
        pista: '<p>Calcula cuánta agua usan las dos personas en un día y divide el garrafón entre eso.</p>',
        solucion: '<p>Las dos personas usan 2 × 4 = 8 litros al día, y 20 ÷ 8 = <strong>2.5 días</strong>, es decir, dos días y medio.</p>' },
      { tipo: 'numero', enunciado: '<p>Ready.gov dice que una persona activa bebe unos tres cuartos de galón al día. Si un galón son 3.8 litros, ¿cuántos litros son? Redondea a un decimal.</p>', respuesta: 0.75 * 3.8, tolerancia: 0.06,
        pista: '<p>Tres cuartos es 0.75. Multiplica 0.75 por 3.8.</p>',
        solucion: '<p>0.75 × 3.8 = 2.85, que redondeado da unos <strong>2.9 litros</strong>, casi 3 litros al día solo para beber.</p>' },
      { tipo: 'opciones', enunciado: '<p>Te avisan de un corte de agua y luz de tres días. Solo te da tiempo de conseguir una cosa. ¿Cuál eliges primero?</p>',
        opciones: ['Una linterna', 'Comida enlatada', 'Agua para beber'], correcta: 2,
        pista: '<p>¿Sin cuál de las tres te pones en peligro más rápido?</p>',
        solucion: '<p><strong>Agua para beber.</strong> Tu cuerpo la pierde todo el tiempo y sin ella te deshidratas mucho antes que sin comida. La linterna es útil, pero no te mantiene sano.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos alimentos es mejor para una reserva de emergencia?</p>',
        opciones: ['Pollo crudo', 'Frijoles enlatados, con un abrelatas manual', 'Leche fresca del refrigerador'], correcta: 1,
        pista: '<p>Piensa en qué pasa con la comida si se va la luz y el refrigerador deja de enfriar.</p>',
        solucion: '<p><strong>Los frijoles enlatados con abrelatas manual.</strong> Aguantan sin frío y se pueden comer sin cocinar. El pollo crudo y la leche fresca se echan a perder sin refrigerador.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la cantidad de agua, comida u otra cosa que guardas para usarla solo cuando lo normal falla?</p>',
        respuestas: ['reserva', 'una reserva', 'la reserva', 'reservas', 'provision', 'provisiones'],
        pista: '<p>Empieza con "re" y también se usa para hablar de agua guardada en una presa.</p>',
        solucion: '<p>Una <strong>reserva</strong>.</p>' },
    ],
    fuentes: [
      READY('kit', 'Prepare un kit de suministros'),
      READY('agua', 'Agua'),
      READY('alimentos', 'Alimentos'),
      READY('apagones', 'Apagones'),
      MEDLINE('dehydration.html', 'Deshidratación'),
      MEDLINE('carbonmonoxidepoisoning.html', 'Envenenamiento con monóxido de carbono'),
      OMS('drinking-water', 'Agua para consumo humano'),
    ],
  });

  // ------------------------------------------------------------------
  const PELDANOS = ['reserva', 'hierbas', 'composta', 'huerto', 'semillas'];
  const ESCALERA = diagrama([0, 16], [-0.4, 7.6], [
    { tipo: 'poligono', abierto: true, puntos: [[0.3, 0.2], ...PELDANOS.flatMap((_, i) => [[0.3 + 3 * i, 0.2 + 1.1 * (i + 1)], [0.3 + 3 * (i + 1), 0.2 + 1.1 * (i + 1)]]), [15.3, 0.2]] },
    { tipo: 'linea', desde: [0.3, 0.2], hasta: [15.3, 0.2] },
    ...PELDANOS.map((p, i) => txt(1.65 + 3 * i, 0.75 + 1.1 * (i + 1), `${i + 1}. ${p}`)),
    ...flecha([1, 4.2], [7, 7.2], 0, 1.4),
    txt(1.6, 3.6, 'con el tiempo'),
  ], 'Una escalera de cinco peldaños que sube de izquierda a derecha. En cada peldaño hay un paso: 1, reserva de agua y comida; 2, hierbas en maceta; 3, composta; 4, huerto; 5, semillas propias. Una flecha con el rótulo "con el tiempo" sube junto a la escalera.');

  L('Empezar poco a poco: autosuficiencia en la ciudad y en el campo', {
    objetivo: 'Elegir un primer paso realista según lo que usas y el espacio que tienes, en la ciudad o en el campo, y calcular cuánto te ahorra.',
    explicacion: `
      <p>Piensa en un manojo de cilantro. Lo compras cada semana, usas la mitad y el resto se marchita en el refrigerador. Ahora imagina una maceta en la ventana con cilantro creciendo: cortas solo lo que necesitas, cuando lo necesitas. Ese es un primer paso pequeño, y los primeros pasos pequeños son los que se sostienen.</p>
      <p>En la lección anterior viste que la autosuficiencia no es todo o nada. Aquí verás cómo empezar sin gastar de más ni abandonar a las pocas semanas.</p>
      <h3>Primero, mira lo que usas</h3>
      <p>Antes de sembrar o comprar algo, haz un <strong>inventario</strong>: una lista de lo que tu casa usa en una semana, con cuánto cuesta y de dónde viene. Por ejemplo: dos garrafones de agua, un manojo de cilantro, un kilo de jitomate, una lechuga. Anótalo durante una o dos semanas, porque de memoria siempre se olvidan cosas.</p>
      <p>Con la lista en la mano, busca algo que cumpla tres condiciones: que lo uses seguido, que sea fácil de producir o guardar en tu espacio y que te cueste dinero cada semana. Las hierbas de cocina, como el cilantro, la hierbabuena o el orégano, suelen cumplir las tres. Crecen en poco espacio, se cortan muchas veces y se compran seguido.</p>
      <h3>Una escalera, no un salto</h3>
      <p>Piensa en tu avance como subir una escalera. Cada peldaño se apoya en el anterior, y no hace falta subirlos todos ni en este orden exacto:</p>
      ${ESCALERA}
      <ol>
        <li>Guarda una reserva de agua y comida para unos días, como viste en "Necesidades básicas". Es de lo más barato y protege mucho.</li>
        <li>Siembra hierbas en macetas. Te enseñan a regar, a ver si una planta tiene demasiado sol o muy poco, y dan resultado en pocas semanas.</li>
        <li>Haz composta con las cáscaras y restos de la cocina. Así produces tu propia tierra fértil y tiras menos basura.</li>
        <li>Arma un huerto pequeño o capta agua de lluvia, según tu espacio.</li>
        <li>Guarda tus propias semillas, para no tener que comprarlas cada temporada.</li>
      </ol>
      <p>Cada uno de estos pasos tiene su unidad en esta materia. Ve a su ritmo: muchas plantas tardan meses en dar fruto, y lo que aprendes en una temporada lo aplicas mejor en la siguiente.</p>
      <h3>En la ciudad</h3>
      <p>Cultivar alimentos dentro de las ciudades tiene nombre: <strong>agricultura urbana</strong>. Incluye macetas en balcones, azoteas, huertos comunitarios y hasta paredes con plantas colgadas. En la ciudad lo que más falta suele ser espacio y sol directo, así que conviene medir cuántos metros cuadrados tienes y observar cuántas horas de sol reciben. Las ventajas son que tienes más cerca tiendas, vecinos y huertos comunitarios donde aprender.</p>
      <p>Antes de poner macetas pesadas en una azotea o un balcón, o de colgar algo hacia la calle, revisa que la estructura aguante el peso y pregunta las reglas de tu edificio. La tierra mojada pesa mucho más que la seca.</p>
      <h3>En el campo</h3>
      <p>En el campo suele sobrar espacio y es más fácil captar lluvia, hacer composta grande o tener animales pequeños. A cambio, puede haber menos agua de red, más distancia a las tiendas y menos ayuda cerca si algo sale mal. Ahí la reserva de agua y el saber reparar cosas pesan todavía más.</p>
      <p>Fíjate que en los dos lugares el método es el mismo: mirar lo que usas, elegir un paso, practicarlo hasta que salga bien y después subir al siguiente.</p>
      <h3>Señales de que vas demasiado rápido</h3>
      <p>Si compras herramientas que no usas, si las plantas se secan porque no te da tiempo de regarlas o si sientes que es una carga, baja el ritmo. Es mejor una maceta bien cuidada que diez abandonadas. Lleva una libreta con lo que siembras, cuándo y cómo te fue; esa libreta será tu mejor maestra.</p>
      <p class="nota"><strong>Trampa común:</strong> empezar por lo más caro de tu inventario. El jitomate puede costar más que el cilantro, pero necesita mucho sol, espacio y meses de cuidado. Empieza por lo fácil, y deja lo difícil para cuando tengas práctica.</p>`,
    ejemplo: `
      <p>Tu inventario de una semana dice que compras cilantro por $12, jitomate por $40 y una lechuga por $15. Tienes una ventana con sol por la mañana. ¿Qué eliges y cuánto ahorras en un año?</p>
      <ol class="pasos-ej">
        <li>Primero elige. El jitomate es lo más caro, pero necesita mucho sol y espacio. El cilantro se compra cada semana, crece en una maceta y se corta varias veces, así que es el mejor primer paso.</li>
        <li>Calcula el ahorro de un mes. Si dejas de comprar $12 cada semana durante unas 4 semanas, ahorras 12 × 4 = $48.</li>
        <li>Pasa al año: 48 × 12 meses = $576. Resta lo que gastas en semillas, unos $30: 576 − 30 = $546.</li>
        <li>Comprueba con semanas: un año tiene 52 semanas, y 12 × 52 = $624. Sale un poco más porque casi todos los meses tienen algo más de 4 semanas, así que $576 es un cálculo prudente.</li>
      </ol>
      <p>Resultado: <span class="resultado">empiezas con cilantro y ahorras unos $546 al año</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar restar lo que cuesta empezar. Las semillas, la tierra y la maceta también son gasto.</p>`,
    vidaReal: `
      <p>Dar un paso pequeño trae beneficios desde el principio:</p>
      <ul>
        <li>Una maceta de hierbas en la cocina te da sabor fresco y te ahorra compras.</li>
        <li>Anotar lo que gastas cada semana te muestra en qué se va el dinero.</li>
        <li>Cultivar algo en el balcón o en el patio te enseña paciencia y te relaja.</li>
        <li>Lo que aprendes puedes compartirlo con tu familia y tus vecinos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Cada semana compras un manojo de hierbabuena de $10. Si la cultivas en casa, ¿cuánto dejas de gastar en un año de 52 semanas?</p>', respuesta: 10 * 52,
        pista: '<p>Multiplica lo que gastas cada semana por el número de semanas.</p>',
        solucion: '<p>10 × 52 = <strong>$520</strong> al año, sin contar lo que cuestan las semillas.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu balcón mide 3 m de largo por 0.5 m de ancho. Cada maceta ocupa un cuadro de 0.5 m por 0.5 m. ¿Cuántas macetas caben en una sola fila?</p>', respuesta: 3 / 0.5,
        pista: '<p>Como el ancho del balcón es igual al de una maceta, solo cabe una fila. Divide el largo entre lo que mide cada maceta.</p>',
        solucion: '<p>3 ÷ 0.5 = <strong>6 macetas</strong>. Comprueba con áreas: el balcón mide 3 × 0.5 = 1.5 m², cada maceta 0.25 m², y 1.5 ÷ 0.25 = 6.</p>' },
      { tipo: 'opciones', enunciado: '<p>Quieres empezar a ser más autosuficiente. ¿Cuál es el primer paso más razonable?</p>',
        opciones: ['Anotar lo que tu casa usa cada semana y elegir una sola cosa fácil', 'Comprar todas las herramientas de un huerto grande', 'Sembrar diez cultivos distintos el mismo mes'], correcta: 0,
        pista: '<p>Antes de producir, necesitas saber qué usas.</p>',
        solucion: '<p><strong>Anotar lo que usas y elegir una cosa fácil.</strong> Así empiezas por algo que de verdad te sirve y que puedes mantener.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué diferencia entre la ciudad y el campo es correcta?</p>',
        opciones: ['En la ciudad no se puede cultivar nada', 'En el campo no hace falta planear nada', 'En la ciudad suele faltar espacio, así que se aprovechan macetas, balcones y azoteas'], correcta: 2,
        pista: '<p>Piensa en qué suele faltar en cada lugar y cómo se resuelve.</p>',
        solucion: '<p><strong>En la ciudad suele faltar espacio</strong>, y por eso se usan macetas, balcones, azoteas y huertos comunitarios. En los dos lugares hace falta planear.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas es una señal de que vas demasiado rápido?</p>',
        opciones: ['Llevas una libreta con lo que siembras', 'Tus plantas se secan porque no te da tiempo de regarlas', 'Cosechas cilantro cada semana de una sola maceta'], correcta: 1,
        pista: '<p>Busca la opción que muestra que el trabajo ya es más de lo que puedes atender.</p>',
        solucion: '<p><strong>Que las plantas se sequen por falta de tiempo.</strong> Es mejor cuidar bien pocas plantas que abandonar muchas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la lista de lo que tu casa usa en una semana, con cuánto cuesta y de dónde viene?</p>',
        respuestas: ['inventario', 'un inventario', 'el inventario'],
        pista: '<p>Es la misma palabra que usan las tiendas para contar lo que tienen en bodega.</p>',
        solucion: '<p>Un <strong>inventario</strong>.</p>' },
    ],
    fuentes: [
      WIKI('Agricultura_urbana', 'Agricultura urbana'),
      WIKI('Autoabastecimiento', 'Autoabastecimiento'),
      READY('kit', 'Prepare un kit de suministros'),
    ],
  });
})();
