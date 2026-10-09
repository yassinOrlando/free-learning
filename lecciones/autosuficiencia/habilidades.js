// Autosuficiencia · Unidad 12: Habilidades y comunidad.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Fuentes oficiales o institucionales: Ready.gov, EPA, MedlinePlus, NPS, NOAA, extensiones universitarias, SEDEMA (CDMX).
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

  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const MEDLINE = (ruta, nombre) => ({ nombre: `MedlinePlus en español: ${nombre}`, url: `https://medlineplus.gov/spanish/${ruta}` });
  const READY = (ruta, nombre) => ({ nombre: `Ready.gov en español: ${nombre}`, url: `https://www.ready.gov/es/${ruta}` });
  const EPAFUGAS = { nombre: 'Agencia de Protección Ambiental de EE. UU. (EPA), WaterSense: Fix a Leak Week (en inglés)', url: 'https://www.epa.gov/watersense/fix-leak-week' };
  const EPATEXTIL = { nombre: 'Agencia de Protección Ambiental de EE. UU. (EPA): Textiles, Material-Specific Data (en inglés)', url: 'https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/textiles-material-specific-data' };
  const UFBOTON = { nombre: 'Extensión de la Universidad de Florida (UF/IFAS): Life Skills in a Minute, Sewing on a Button (en inglés)', url: 'https://edis.ifas.ufl.edu/publication/4H414' };
  const TNROPA = { nombre: 'Extensión de la Universidad de Tennessee, 4-H: Repair Your Clothes (en inglés, PDF)', url: 'https://4h.tennessee.edu/wp-content/uploads/sites/47/2022/08/Activity-10.pdf' };
  const NPS = { nombre: 'Servicio de Parques Nacionales de EE. UU. (NPS): Ten Essentials (en inglés)', url: 'https://www.nps.gov/articles/10essentials.htm' };
  const NOAA = { nombre: 'Administración Nacional Oceánica y Atmosférica de EE. UU. (NOAA): Magnetic Declination (en inglés)', url: 'https://www.ngdc.noaa.gov/geomag/declination.shtml' };
  const SEDEMA = { nombre: 'Secretaría del Medio Ambiente de la Ciudad de México (SEDEMA): Mercado de Trueque', url: 'https://www.sedema.cdmx.gob.mx/programas/programa/mercado-de-trueque' };

  // ------------------------------------------------------------------
  L('Herramientas básicas y reparaciones', {
    objetivo: 'Conocer las herramientas básicas de una casa, usarlas con seguridad, saber cerrar el agua y reconocer qué reparaciones no debes hacer tú.',
    explicacion: `
      <p>Una llave que gotea, una puerta que no cierra o una silla floja parecen problemas pequeños. Pero si nadie los arregla, la gota se vuelve charco, la puerta se rompe y la silla tira a alguien. Saber hacer reparaciones sencillas ahorra dinero y evita accidentes, y es una de las habilidades más útiles para ser más autosuficiente.</p>
      <h3>Una caja con lo básico</h3>
      <p>No necesitas un taller. Con unas cuantas herramientas puedes hacer la mayoría de los arreglos de una casa. Piensa en ellas por lo que hacen:</p>
      <ul>
        <li>Para apretar y aflojar: desarmadores de punta plana y de cruz, unas pinzas y una llave ajustable, que se abre o se cierra para tomar tuercas de distintos tamaños.</li>
        <li>Para clavar y quitar clavos: un martillo.</li>
        <li>Para medir y marcar: una cinta métrica y un lápiz.</li>
        <li>Para cortar: tijeras y una navaja o cúter.</li>
        <li>Para sujetar y sellar: cinta adhesiva gruesa.</li>
        <li>Para protegerte: lentes de seguridad y guantes.</li>
      </ul>
      <p>Ready.gov, el sitio de emergencias del Gobierno de Estados Unidos, incluye en su lista del kit de emergencia unas llaves o pinzas para cerrar los servicios de la casa, además de linterna, silbato, tijeras y cinta adhesiva. Así, tu caja de herramientas también sirve en una emergencia.</p>
      <h3>Seguridad primero</h3>
      <p>MedlinePlus explica que la mayoría de las lesiones de los ojos se pueden prevenir, y que algunos pasatiempos, como la carpintería, aumentan el riesgo. Por eso los lentes de seguridad no son un lujo: úsalos cuando martilles, cortes, lijes o taladres. Si te cae una sustancia química en un ojo, MedlinePlus pide lavarlo de inmediato mientras esperas ayuda médica. Y si te cortas, recuerda lo que viste en "Primeros auxilios: heridas, quemaduras y torceduras".</p>
      <h3>Saber cerrar el agua</h3>
      <p>Una <strong>llave de paso</strong> es la válvula que corta el agua de toda la casa o de un solo aparato, como el inodoro o el lavabo. Si un tubo revienta, cerrarla a tiempo evita una inundación. Busca hoy dónde está la de tu casa y la de cada aparato, y enséñaselo a tu familia.</p>
      <h3>Las fugas: el arreglo más común</h3>
      <p>La Agencia de Protección Ambiental de Estados Unidos (EPA) explica que las fugas más comunes en una casa son el tapón de hule del tanque del inodoro, que se gasta, las llaves que gotean y otras válvulas. Dice que muchas se arreglan fácil, con pocas herramientas y piezas que se pagan solas con el agua que ahorras, y que arreglarlas puede ahorrar cerca del 10% del recibo del agua. En la unidad Agua, en "Ahorrar y reutilizar agua en casa", viste cuánta agua tira una gota. Antes de arreglar una llave, cierra su llave de paso.</p>
      <h3>Arreglar antes de que se rompa</h3>
      <p>El <strong>mantenimiento preventivo</strong> es revisar y cuidar las cosas antes de que fallen: apretar un tornillo flojo, cambiar un empaque gastado, limpiar una canaleta. Cuesta mucho menos que la reparación de algo roto. Una buena costumbre es recorrer la casa cada pocos meses buscando lo que gotea, se mueve o rechina.</p>
      <h3>Lo que no te toca</h3>
      <p>Algunas reparaciones son peligrosas para quien no está capacitado:</p>
      <ul>
        <li>La electricidad: como viste en "Seguridad eléctrica en instalaciones caseras", los trabajos eléctricos los hace un electricista calificado.</li>
        <li>El gas: Ready.gov pide no entrar a una casa dañada si huele a gas, y no reconectar los servicios por tu cuenta después de un incendio.</li>
        <li>La estructura: si una pared tiene grietas grandes o el techo se hunde, consulta a alguien con preparación técnica, como viste en la unidad Vivienda.</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> desarmar una llave sin cerrar antes el agua. El agua sale con fuerza y moja todo.</p>`,
    ejemplo: `
      <p>Tu recibo de agua es de 300 pesos al mes. La EPA dice que arreglar las fugas comunes puede ahorrar cerca del 10% del recibo. Si el tapón nuevo del inodoro cuesta 90 pesos, ¿en cuántos meses lo recuperas?</p>
      <ol class="pasos-ej">
        <li>Primero calcula el ahorro de un mes: el 10% de 300 es 300 × 0.10 = 30 pesos.</li>
        <li>Luego divide el costo de la pieza entre el ahorro: 90 ÷ 30 = 3 meses.</li>
        <li>Desde el cuarto mes, todo es ahorro.</li>
        <li>Comprueba: 30 pesos × 3 meses = 90 pesos, lo que costó el tapón.</li>
      </ol>
      <p>Resultado: <span class="resultado">en unos 3 meses</span>. Antes de cambiarlo, cierra la llave de paso del inodoro y vacía el tanque jalando la palanca.</p>
      <p class="nota"><strong>Error común:</strong> calcular el 10% de lo que cuesta la pieza en lugar del recibo.</p>`,
    vidaReal: `
      <p>Saber hacer reparaciones sencillas te da independencia:</p>
      <ul>
        <li>Arreglas una fuga sin esperar ni pagar a alguien.</li>
        <li>Cierras el agua a tiempo si revienta un tubo.</li>
        <li>Te proteges los ojos y las manos al trabajar.</li>
        <li>Cuidas tu casa antes de que las cosas se rompan.</li>
        <li>Sabes qué trabajos, como la electricidad y el gas, le tocan a un profesional.</li><li>Tu caja de herramientas también te sirve en una emergencia.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tu recibo de agua es de 450 pesos. Si arreglar las fugas ahorra el 10%, ¿cuántos pesos ahorras al mes?</p>', respuesta: 450 * 0.1,
        pista: '<p>Calcula el 10% de 450.</p>',
        solucion: '<p>450 × 0.10 = <strong>45 pesos</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una pieza cuesta 120 pesos y te ahorra 40 pesos al mes. ¿En cuántos meses la recuperas?</p>', respuesta: 120 / 40,
        pista: '<p>Divide el costo entre el ahorro.</p>',
        solucion: '<p>120 ÷ 40 = <strong>3 meses</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Revienta un tubo debajo del lavabo. ¿Qué haces primero?</p>',
        opciones: ['Llamas a un vecino', 'Cierras la llave de paso', 'Pones una cubeta y esperas'], correcta: 1,
        pista: '<p>Corta el agua antes que nada.</p>',
        solucion: '<p><strong>Cerrar la llave de paso.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Vas a lijar y taladrar una tabla. ¿Qué te pones?</p>',
        opciones: ['Lentes de seguridad', 'Lentes de sol', 'Nada, es rápido'], correcta: 0,
        pista: '<p>MedlinePlus dice que la carpintería aumenta el riesgo de lesiones en los ojos.</p>',
        solucion: '<p><strong>Lentes de seguridad.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Un contacto se calienta y huele a quemado. ¿Quién lo arregla?</p>',
        opciones: ['Tú, con cinta aislante', 'Cualquier vecino', 'Un electricista calificado'], correcta: 2,
        pista: '<p>Lo viste en la unidad Energía.</p>',
        solucion: '<p><strong>Un electricista calificado.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la válvula que corta el agua de la casa o de un aparato?</p>',
        respuestas: ['llave de paso', 'la llave de paso', 'valvula de paso', 'llave de corte'],
        pista: '<p>Son tres palabras; la primera es "llave".</p>',
        solucion: '<p>La <strong>llave de paso</strong>.</p>' },
    ],
    fuentes: [READY('kit', 'Prepare un kit de suministros'), EPAFUGAS, MEDLINE('eyeinjuries.html', 'Lesiones del ojo'), READY('incendios-en-el-hogar', 'Incendios en el hogar'), READY('recuperarse-de-un-desastre', 'Recuperarse de un desastre')],
  });

  // ------------------------------------------------------------------
  L('Coser y remendar ropa', {
    objetivo: 'Armar un costurero básico, pegar un botón y reparar una costura descosida a mano, para que tu ropa dure más.',
    explicacion: `
      <p>Un botón que se cae o una costura que se abre son razones muy comunes para dejar de usar una prenda que, por lo demás, está bien. Con una aguja, hilo y diez minutos, esa prenda vuelve a servir. Remendar es ahorrar dinero y también tirar menos.</p>
      <h3>Por qué remendar</h3>
      <p>La Agencia de Protección Ambiental de Estados Unidos (EPA) estimó que en 2018 se generaron en ese país 17 millones de toneladas de residuos textiles, el 5.8% de toda su basura. Cada prenda que reparas es una menos en esa cuenta y una que no tienes que comprar. La Extensión de la Universidad de Tennessee explica que reparar la ropa lo antes posible, en cuanto ves el daño, hace que dure más.</p>
      <h3>El costurero básico</h3>
      <p>Tennessee propone un costurero sencillo:</p>
      <ul>
        <li>Una caja o canasta.</li>
        <li>Agujas de mano de varios tamaños.</li>
        <li>Alfileres y seguros.</li>
        <li>Tijeras.</li>
        <li>Hilo en cinco colores básicos: blanco o beige, azul marino, café, negro y gris.</li>
      </ul>
      <p>Después puedes agregar botones, broches, un descosedor y un enhebrador, que es un alambrito que ayuda a pasar el hilo por la aguja.</p>
      <h3>Antes de reparar</h3>
      <p>Tennessee sugiere hacerte unas preguntas: ¿qué tan grande es el daño?, ¿sé repararlo o necesito ayuda?, ¿vale la pena?, ¿cuánto tiempo me llevará? y ¿la usaré después de arreglarla?</p>
      <h3>Pegar un botón</h3>
      <p>La Extensión de la Universidad de Florida explica los pasos para un botón plano de dos agujeros:</p>
      <ol>
        <li>Corta unas 16 pulgadas de hilo, unos 40 cm. Pásalo por el ojo de la aguja, junta las dos puntas y hazles un nudo: el hilo doble es más fuerte.</li>
        <li>Desde el revés de la tela, es decir, desde adentro de la prenda, saca la aguja hacia el derecho, justo donde va el botón.</li>
        <li>Pasa la aguja por un agujero del botón y bájala por el otro.</li>
        <li>Pon un palillo encima del botón y cose por encima de él varias veces. El palillo deja el hilo un poco flojo.</li>
        <li>Quita el palillo, saca la aguja entre el botón y la tela, y enrolla el hilo varias veces alrededor de las puntadas. Eso forma un "cuello" que separa el botón de la tela.</li>
        <li>Pasa la aguja al revés de la prenda y haz un nudo.</li>
      </ol>
      <p>Tennessee explica para qué sirve ese cuello: levanta el botón para dejar espacio al grosor del ojal, y así la prenda cierra bien. En un botón de cuatro agujeros, Florida explica que se cose en diagonal, formando una X.</p>
      <h3>Reparar una costura abierta</h3>
      <p>Una <strong>puntada</strong> es cada vez que la aguja entra y sale de la tela. Para una costura que se abrió, Tennessee recomienda el <strong>pespunte</strong>, una de las puntadas a mano más fuertes, que por el derecho se ve como la de una máquina de coser:</p>
      <ol>
        <li>Empieza media pulgada, más o menos 1.25 cm, antes de donde se rompió el hilo, para que la reparación quede bien sujeta.</li>
        <li>Saca la aguja al derecho de la tela y da una puntada hacia atrás, de unos 2 o 3 milímetros.</li>
        <li>Saca la aguja otra vez una puntada más adelante.</li>
        <li>Sigue así, entrando siempre al final de la puntada anterior, hasta pasar media pulgada después de la parte rota.</li>
      </ol>
      <p>Para un roto grande, Tennessee explica que se puede poner un parche, que debe ser al menos una pulgada, unos 2.5 cm, más grande que el área dañada.</p>
      <p class="nota"><strong>Trampa común:</strong> coser el botón muy pegado a la tela. Sin el cuello de hilo, la prenda no cierra bien y el botón se arranca pronto.</p>`,
    ejemplo: `
      <p>Una camisa tiene una costura abierta de 6 cm. Con el consejo de Tennessee de empezar y terminar media pulgada, unos 1.25 cm, más allá de la parte rota, ¿cuántos centímetros vas a coser, y cuántas puntadas son si cada una mide 0.25 cm?</p>
      <ol class="pasos-ej">
        <li>Primero suma lo que agregas en los dos extremos: 1.25 + 1.25 = 2.5 cm.</li>
        <li>Luego suma la parte rota: 6 + 2.5 = 8.5 cm de costura.</li>
        <li>Divide entre el largo de cada puntada: 8.5 ÷ 0.25 = 34 puntadas.</li>
        <li>Comprueba: 34 × 0.25 = 8.5 cm.</li>
      </ol>
      <p>Resultado: <span class="resultado">8.5 cm, unas 34 puntadas</span>. Usa hilo del mismo color y, si puedes, del mismo tipo de fibra que la tela.</p>
      <p class="nota"><strong>Error común:</strong> coser solo la parte abierta. Sin el margen de los extremos, la costura vuelve a abrirse justo en las orillas.</p>`,
    vidaReal: `
      <p>Saber coser lo básico hace que tu ropa dure mucho más:</p>
      <ul>
        <li>Pegas un botón en diez minutos, en lugar de dejar la prenda guardada.</li>
        <li>Reparas una costura abierta con una puntada fuerte.</li>
        <li>Gastas menos en ropa nueva.</li>
        <li>Tiras menos ropa a la basura.</li>
        <li>Puedes enseñar a otras personas de tu familia o intercambiar arreglos con tus vecinos.</li><li>Tu ropa favorita te dura años en lugar de meses.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Florida pide cortar unas 16 pulgadas de hilo. Si una pulgada mide 2.54 cm, ¿cuántos centímetros son? Redondea al entero.</p>', respuesta: 16 * 2.54, tolerancia: 0.6,
        pista: '<p>Multiplica 16 por 2.54.</p>',
        solucion: '<p>16 × 2.54 = 40.64, unos <strong>41 cm</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un roto mide 3 cm de ancho. Para que el parche sea más grande que el roto, como pide Tennessee, decides dejarle 2.5 cm de sobra por cada lado. ¿Cuánto mide de ancho el parche?</p>', respuesta: 3 + 2.5 * 2,
        pista: '<p>Suma 2.5 cm de cada lado.</p>',
        solucion: '<p>3 + 2.5 + 2.5 = <strong>8 cm</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve el "cuello" de hilo que se forma debajo del botón?</p>',
        opciones: ['Para dejar espacio al grosor del ojal y que la prenda cierre bien', 'Para que el botón brille', 'Para gastar menos hilo'], correcta: 0,
        pista: '<p>Separa el botón de la tela.</p>',
        solucion: '<p><strong>Deja espacio al grosor del ojal.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué puntada recomienda Tennessee para reparar a mano una costura abierta?</p>',
        opciones: ['Un nudo', 'El pespunte', 'Ninguna, mejor pegamento'], correcta: 1,
        pista: '<p>Es una de las más fuertes y se ve como de máquina.</p>',
        solucion: '<p><strong>El pespunte.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cómo se cose un botón de cuatro agujeros, según Florida?</p>',
        opciones: ['Solo por dos agujeros', 'Con pegamento', 'En diagonal, formando una X'], correcta: 2,
        pista: '<p>Une agujeros opuestos.</p>',
        solucion: '<p><strong>En diagonal, formando una X.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama cada vez que la aguja entra y sale de la tela?</p>',
        respuestas: ['puntada', 'una puntada', 'puntadas'],
        pista: '<p>Empieza con "p".</p>',
        solucion: '<p>Una <strong>puntada</strong>.</p>' },
    ],
    fuentes: [UFBOTON, TNROPA, EPATEXTIL],
  });

  // ------------------------------------------------------------------
  const ROSA = diagrama([-7, 7], [-6.4, 6.4], [
    ...flecha([0, 0], [0, 4.2]), ...flecha([0, 0], [0, -4.2]), ...flecha([0, 0], [4.2, 0]), ...flecha([0, 0], [-4.2, 0]),
    txt(0, 4.9, 'N'), txt(0, -4.9, 'S'), txt(4.9, 0, 'E'), txt(-4.9, 0, 'O'),
    txt(4.9, -1, 'sale el sol'), txt(-4.9, -1, 'se pone'),
    txt(0, -5.9, 'mediodía: sol al sur (hemisferio norte)'),
  ], 'Una cruz de cuatro flechas con los puntos cardinales: norte arriba, sur abajo, este a la derecha y oeste a la izquierda. Junto al este dice que ahí sale el sol; junto al oeste, que ahí se pone. Abajo dice que al mediodía el sol está al sur en el hemisferio norte.');

  L('Orientarse sin GPS', {
    objetivo: 'Encontrar los puntos cardinales con el sol, las estrellas y una brújula, y prepararte para no depender del teléfono en el campo.',
    explicacion: `
      <p>El teléfono te dice dónde estás y por dónde ir, hasta que se queda sin batería o sin señal. En el campo, en la montaña o después de un desastre, eso pasa muy seguido. Saber orientarte con lo que te rodea es una habilidad antigua que sigue siendo útil.</p>
      <h3>No depender de una sola cosa</h3>
      <p>El Servicio de Parques Nacionales de Estados Unidos (NPS) pone la navegación entre las diez cosas esenciales para salir al campo: un mapa, una brújula y un GPS. Recomienda saber usarlos antes de salir, llevar un mapa en papel por si falla el teléfono y una batería extra. Y da un consejo que no cuesta nada: decirle a alguien a dónde vas y cuándo piensas volver.</p>
      <h3>Los puntos cardinales</h3>
      <p>Los <strong>puntos cardinales</strong> son las cuatro direcciones principales: norte, sur, este y oeste. Si sabes dónde está una, sabes dónde están las demás: si miras al norte, el sur queda a tu espalda, el este a tu derecha y el oeste a tu izquierda.</p>
      ${ROSA}
      <h3>Con el sol</h3>
      <p>El sol sale por el este y se pone por el oeste. No exactamente en el mismo punto todo el año, pero sí de ese lado. Además, como viste en la unidad Energía y en "Orientación, sol y ventilación", al mediodía el sol pasa por el sur si vives en el hemisferio norte, como en el norte de México, y por el norte si vives en el hemisferio sur, como en Chile o Argentina. Cerca del ecuador pasa casi por encima de tu cabeza, y así cuesta más usarlo.</p>
      <p>Una forma práctica: por la mañana, si miras hacia donde salió el sol, estás mirando al este; tu izquierda es el norte y tu derecha el sur.</p>
      <h3>Con las estrellas</h3>
      <p>En el hemisferio norte, la Estrella Polar está casi exactamente sobre el norte, y a lo largo de la noche parece quedarse quieta mientras las demás giran a su alrededor. Se encuentra siguiendo las dos estrellas del borde de la Osa Mayor. En el hemisferio sur no hay una estrella así, pero la Cruz del Sur ayuda a encontrar el sur.</p>
      <h3>Con la brújula</h3>
      <p>Una brújula tiene una aguja imantada que apunta al norte magnético, que no es exactamente el mismo que el norte de los mapas. La Administración Nacional Oceánica y Atmosférica de Estados Unidos (NOAA) explica que la diferencia entre los dos se llama <strong>declinación magnética</strong>: el ángulo entre el norte magnético y el norte verdadero. Cambia según el lugar y con el tiempo, y la NOAA tiene calculadoras para saber cuánto vale donde estás. En muchos lugares es pequeña; donde es grande, hay que corregirla para no desviarte.</p>
      <p>Mantén la brújula lejos de objetos de metal e imanes, como el teléfono o una navaja, porque pueden mover la aguja.</p>
      <h3>Si te pierdes</h3>
      <p>El NPS recomienda llevar ropa de colores brillantes para que los equipos de búsqueda te vean más fácil, y una linterna, que sirve también para pedir ayuda. Ready.gov incluye en su kit de emergencia un silbato para pedir ayuda. Lo más importante se hace antes de salir: avisar a alguien a dónde vas y cuándo vuelves, para que te busquen si no regresas.</p>
      <p class="nota"><strong>Trampa común:</strong> confiar solo en el teléfono. Sin batería ni señal, no tienes mapa.</p>`,
    ejemplo: `
      <p>Son las 7 de la mañana y estás en el campo, en el norte de México. Ves salir el sol detrás de un cerro. Tu casa está al norte. ¿Hacia dónde caminas?</p>
      <ol class="pasos-ej">
        <li>Primero ubica el este: el sol sale por el este, así que el cerro está al este.</li>
        <li>Mira hacia el cerro: estás mirando al este.</li>
        <li>Cuando miras al este, el norte queda a tu izquierda.</li>
        <li>Gira a tu izquierda y camina en esa dirección: vas hacia el norte, hacia tu casa.</li>
        <li>Comprueba al mediodía: en el norte de México el sol del mediodía pasa por el sur, así que debería quedar a tu espalda mientras caminas hacia el norte.</li>
      </ol>
      <p>Resultado: <span class="resultado">camina con el sol de la mañana a tu derecha: vas al norte</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que el sol sale siempre exactamente en el mismo punto. Sale del lado del este, pero su punto de salida cambia con las estaciones del año.</p>`,
    vidaReal: `
      <p>Orientarte sin GPS te da seguridad cuando la tecnología falla:</p>
      <ul>
        <li>Encuentras el norte con el sol o las estrellas.</li>
        <li>Usas una brújula y un mapa de papel.</li>
        <li>Avisas a alguien a dónde vas antes de salir al campo.</li>
        <li>Llevas silbato, linterna y ropa de colores visibles.</li>
        <li>Puedes enseñar a otras personas a ubicarse sin teléfono.</li><li>Te orientas mejor también en una ciudad que no conoces.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Miras al norte. ¿Cuántos grados tienes que girar a la derecha para mirar al este?</p>', respuesta: 90,
        pista: '<p>Una vuelta completa son 360 grados y hay cuatro puntos cardinales.</p>',
        solucion: '<p>360 ÷ 4 = <strong>90 grados</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Miras al este. ¿Cuántos grados giras para mirar al oeste?</p>', respuesta: 180,
        pista: '<p>El oeste está justo a tu espalda.</p>',
        solucion: '<p>Media vuelta: <strong>180 grados</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Por la mañana miras hacia donde salió el sol. ¿Qué tienes a tu izquierda?</p>',
        opciones: ['El sur', 'El norte', 'El oeste'], correcta: 1,
        pista: '<p>Estás mirando al este.</p>',
        solucion: '<p><strong>El norte.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Según la NOAA, ¿qué es la declinación magnética?</p>',
        opciones: ['El ángulo entre el norte magnético y el norte verdadero', 'La altura del sol', 'El peso de la brújula'], correcta: 0,
        pista: '<p>La brújula no apunta exactamente al norte de los mapas.</p>',
        solucion: '<p><strong>El ángulo entre el norte magnético y el verdadero.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Según el NPS, ¿qué conviene hacer antes de salir al campo?</p>',
        opciones: ['Dejar el mapa en casa', 'No decirle a nadie', 'Avisar a alguien a dónde vas y cuándo vuelves'], correcta: 2,
        pista: '<p>Así te buscarán si no regresas.</p>',
        solucion: '<p><strong>Avisar a dónde vas y cuándo vuelves.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llaman las cuatro direcciones principales: norte, sur, este y oeste?</p>',
        respuestas: ['puntos cardinales', 'los puntos cardinales', 'cardinales'],
        pista: '<p>Son dos palabras; la segunda es "cardinales".</p>',
        solucion: '<p>Los <strong>puntos cardinales</strong>.</p>' },
    ],
    fuentes: [NPS, NOAA, READY('kit', 'Prepare un kit de suministros'), WIKI('Estrella_Polar', 'Estrella Polar'), WIKI('Br%C3%BAjula', 'Brújula'), WIKI('Cruz_del_Sur', 'Cruz del Sur')],
  });

  // ------------------------------------------------------------------
  L('Plan familiar de emergencias', {
    objetivo: 'Hacer con tu familia un plan para emergencias: cómo se van a avisar, dónde se van a encontrar y qué necesita cada persona.',
    explicacion: `
      <p>Un sismo puede llegar cuando los niños están en la escuela, un adulto en el trabajo y otro en el mercado. Si se cae la señal del teléfono, ¿cómo se van a encontrar? Las familias que lo hablaron antes se reúnen más rápido y con menos angustia.</p>
      <h3>Un plan escrito</h3>
      <p>Ready.gov explica que tu familia puede no estar junta cuando ocurra un desastre, y que por eso hay que saber cómo se van a comunicar y cómo se van a reunir. Propone cuatro pasos:</p>
      <ol>
        <li>Reúnete con tu familia y respondan juntos: ¿cómo recibiremos las alertas de emergencia?, ¿dónde nos refugiaremos?, ¿cuál es nuestra ruta para salir?, ¿cómo nos comunicaremos?, ¿hay que actualizar el kit?</li>
        <li>Piensen en las necesidades de cada quien.</li>
        <li>Escriban el plan.</li>
        <li>Practíquenlo.</li>
      </ol>
      <h3>El plan de comunicación</h3>
      <p>Un <strong>plan de comunicación</strong> es la parte del plan que dice cómo se van a localizar y a reunir. El formulario de Ready.gov pide anotar:</p>
      <ul>
        <li>Los teléfonos y datos de contacto de cada persona de la familia.</li>
        <li>Los datos de la escuela, la guardería y los trabajos, y quién puede recoger a los niños.</li>
        <li>Un contacto de emergencia, alguien a quien todos llamen para avisar que están bien.</li>
        <li>Los lugares de encuentro.</li>
        <li>La información médica, incluido el número del centro de toxicología y los datos del médico.</li>
      </ul>
      <p>Ready.gov también pide establecer un lugar de encuentro de la familia que sea conocido y fácil de encontrar. En "Prevenir y apagar incendios" viste el lugar de encuentro fuera de la casa; este es otro, para cuando la familia está dispersa por la ciudad.</p>
      <h3>Las necesidades de cada quien</h3>
      <p>Ready.gov pide adaptar el plan a tu familia y pensar en:</p>
      <ul>
        <li>Las edades de cada persona y quién ayuda a quién.</li>
        <li>Las dietas especiales y las necesidades médicas, como medicinas y aparatos.</li>
        <li>Las discapacidades y lo que cada persona necesita para moverse o comunicarse.</li>
        <li>Los idiomas que hablan.</li>
        <li>Las mascotas y los animales de servicio.</li>
        <li>Los niños en edad escolar.</li>
      </ul>
      <h3>El kit</h3>
      <p>El plan va junto con un kit de emergencia. En la primera unidad, en "Necesidades básicas: agua, comida, refugio y energía", viste lo básico. La lista de Ready.gov incluye, entre otras cosas, agua, comida que no se eche a perder para al menos tres días, un radio de pilas o de manivela, linterna, botiquín, pilas de repuesto, un silbato, mapas de la zona, cargador del teléfono y copias de los documentos importantes. En "Botiquín básico" viste qué lleva el botiquín.</p>
      <h3>Practicar</h3>
      <p>Un plan que nadie recuerda no sirve. Ready.gov pide practicarlo con la familia. Hagan un simulacro: cada quien dice qué haría y a quién llamaría. Revisen el plan cuando cambie algo, como una nueva escuela o un nuevo trabajo.</p>
      <p class="nota"><strong>Trampa común:</strong> tener los teléfonos solo en el celular. Si se descarga o se pierde, nadie se los sabe. Escríbelos en papel.</p>`,
    ejemplo: `
      <p>Una familia de 4 personas quiere tener agua para el kit. Ready.gov recomienda un galón por persona al día, unos 3.8 litros, durante varios días. ¿Cuántos litros necesitan para 3 días?</p>
      <ol class="pasos-ej">
        <li>Primero calcula lo de un día para toda la familia: 3.8 × 4 = 15.2 litros.</li>
        <li>Luego multiplica por 3 días: 15.2 × 3 = 45.6 litros.</li>
        <li>Comprueba de otra forma: una persona en 3 días necesita 3.8 × 3 = 11.4 litros, y 11.4 × 4 = 45.6 litros.</li>
        <li>Recuerda guardarla como viste en "Almacenar agua de forma segura".</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 45.6 litros, casi 46</span>. Ready.gov explica que ese galón diario es para beber y para la higiene. Si tienen mascotas, agreguen agua para ellas, y si alguien toma medicinas, incluyan en el kit lo que necesite para esos días.</p>
      <p class="nota"><strong>Error común:</strong> calcular solo para un día. Una emergencia puede durar varios.</p>`,
    vidaReal: `
      <p>Un plan familiar le da calma a todos cuando algo pasa:</p>
      <ul>
        <li>Saben cómo avisarse que están bien.</li>
        <li>Tienen un lugar de encuentro que todos conocen.</li>
        <li>Saben quién recoge a los niños de la escuela.</li>
        <li>Toman en cuenta a los abuelos, a quien usa medicinas y a las mascotas.</li>
        <li>Tienen el kit listo y los teléfonos anotados en papel.</li><li>Los niños saben qué hacer aunque no haya un adulto cerca.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Ready.gov recomienda un galón, unos 3.8 litros, por persona al día. ¿Cuántos litros necesitan 2 personas para 3 días?</p>', respuesta: 3.8 * 2 * 3,
        pista: '<p>Multiplica por personas y por días.</p>',
        solucion: '<p>3.8 × 2 × 3 = <strong>22.8 litros</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Si practican el plan dos veces al año, ¿cuántas veces lo practican en 3 años?</p>', respuesta: 2 * 3,
        pista: '<p>Multiplica.</p>',
        solucion: '<p>2 × 3 = <strong>6 veces</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué sirve el contacto de emergencia?</p>',
        opciones: ['Para que todos le llamen y avisen que están bien', 'Para pedir comida', 'Para cuidar la casa'], correcta: 0,
        pista: '<p>Es parte del plan de comunicación.</p>',
        solucion: '<p><strong>Para que todos avisen que están bien.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Dónde conviene tener anotados los teléfonos de la familia?</p>',
        opciones: ['Solo en el celular', 'En ningún lado, se los saben', 'En papel, además del celular'], correcta: 2,
        pista: '<p>El celular se puede descargar.</p>',
        solucion: '<p><strong>En papel, además del celular.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>Según Ready.gov, ¿qué conviene hacer con el plan una vez escrito?</p>',
        opciones: ['Guardarlo y olvidarlo', 'Practicarlo con la familia', 'Tirarlo'], correcta: 1,
        pista: '<p>Es el cuarto paso.</p>',
        solucion: '<p><strong>Practicarlo.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la parte del plan que dice cómo se van a localizar y reunir?</p>',
        respuestas: ['plan de comunicacion', 'el plan de comunicacion', 'plan de comunicacion familiar'],
        pista: '<p>Son tres palabras.</p>',
        solucion: '<p>El <strong>plan de comunicación</strong>.</p>' },
    ],
    fuentes: [READY('haga-un-plan', 'Haga un plan'), READY('plan-form', 'Plan de comunicación familiar en emergencias'), READY('kit', 'Prepare un kit de suministros')],
  });

  // ------------------------------------------------------------------
  L('Trueque y ayuda mutua', {
    objetivo: 'Entender cómo funciona el trueque y la ayuda mutua, y por qué la autosuficiencia se construye en comunidad.',
    explicacion: `
      <p>Tú tienes jitomates de sobra y tu vecina tiene huevos; tú sabes coser y tu vecino sabe arreglar bicicletas. Ninguno tiene todo, pero juntos tienen mucho. Así funcionaron los pueblos durante siglos, y sigue siendo una de las mejores formas de vivir mejor con menos dinero.</p>
      <h3>El trueque</h3>
      <p>El <strong>trueque</strong> es cambiar una cosa o un servicio por otro, sin usar dinero. Funciona cuando cada parte tiene algo que la otra necesita y los dos acuerdan que el cambio es justo. Puedes intercambiar cosas, como semillas, verduras o ropa, y también habilidades, como una reparación a cambio de una clase.</p>
      <h3>Un ejemplo: el Mercado de Trueque</h3>
      <p>La Secretaría del Medio Ambiente de la Ciudad de México organiza el Mercado de Trueque. Es un programa de educación ambiental en el que la gente lleva sus residuos reciclables limpios y separados, y a cambio recibe "puntos verdes" que puede canjear por artículos de primera necesidad, plantas y hortalizas. Sus reglas:</p>
      <ul>
        <li>Se aceptan de 1 a 10 kg por persona, separados y no revueltos, por ejemplo 4 kg de vidrio y 6 kg de PET.</li>
        <li>Se puede llevar cartón, papel, PET, latas de aluminio y de fierro, envases de cartón para bebidas y botellas de vidrio, que no sean de perfume ni de medicamentos, limpios y aplastados.</li>
        <li>También se recibe el aceite de cocinar usado, para que no se tire al drenaje.</li>
      </ul>
      <p>Fíjate que une dos cosas que viste en esta materia: separar los residuos, como en "Manejo de residuos en casa", y conseguir comida y plantas.</p>
      <h3>La ayuda mutua</h3>
      <p>La <strong>ayuda mutua</strong> es cuando las personas de una comunidad se apoyan entre sí, sin esperar un pago, sabiendo que mañana ellas pueden necesitar ayuda. No es caridad de uno hacia otro: es un ir y venir. Ready.gov lo recoge en su plan para emergencias, cuando pide hablar sobre cómo las personas de tu red se pueden ayudar entre sí con la comunicación, el cuidado de los niños o las mascotas.</p>
      <p>Algunas formas de ayuda mutua:</p>
      <ul>
        <li>Turnarse para cuidar a los niños o a los abuelos.</li>
        <li>Prestar herramientas entre vecinos, en lugar de que cada casa compre las suyas.</li>
        <li>Compartir semillas, como viste en "Bancos e intercambio comunitario de semillas".</li>
        <li>Revisar a los vecinos mayores o que viven solos durante una emergencia.</li>
        <li>Enseñar lo que sabes: coser, reparar, sembrar, cocinar.</li>
      </ul>
      <h3>Prepararse en comunidad</h3>
      <p>Ready.gov explica que, durante un desastre, las comunidades dependen mucho de voluntarios capacitados. Propone tomar cursos gratuitos de preparación y de primeros auxilios, y hacer voluntariado en organizaciones reconocidas. También explica que, si quieres donar después de un desastre, el dinero en efectivo a una organización reconocida suele ser lo más rápido y útil.</p>
      <h3>El cierre de la materia</h3>
      <p>En la primera lección de esta materia, "Qué es ser autosuficiente (y qué no)", viste que la autosuficiencia no es producirlo todo ni vivir aislado. Después de doce unidades, sabes captar agua, cultivar, guardar semillas, conservar alimentos, cocinar con poca energía, cuidar tu salud y tu casa. Todo eso vale todavía más cuando lo compartes: una comunidad que sabe hacer muchas cosas y se ayuda es mucho más fuerte que cualquier persona sola.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que pedir ayuda es fracasar. En una comunidad, dar y recibir es parte del mismo sistema.</p>`,
    ejemplo: `
      <p>Vas a llevar al Mercado de Trueque 3 kg de cartón, 2.5 kg de PET y 1.5 kg de latas. ¿Cumples con el mínimo y el máximo por persona?</p>
      <ol class="pasos-ej">
        <li>Primero suma todo: 3 + 2.5 + 1.5 = 7 kg.</li>
        <li>Compara con el mínimo: 7 kg es más que 1 kg, así que lo cumples.</li>
        <li>Compara con el máximo: 7 kg es menos que 10 kg, así que no te pasas.</li>
        <li>Revisa la otra regla: los materiales deben ir separados, limpios y aplastados, no revueltos.</li>
        <li>Comprueba: 10 − 7 = 3 kg, lo que todavía podrías agregar.</li>
      </ol>
      <p>Resultado: <span class="resultado">sí: 7 kg, entre 1 y 10 kg</span>. Lleva cada material en su bolsa.</p>
      <p class="nota"><strong>Error común:</strong> llevar todo revuelto en una sola bolsa. El programa pide los residuos separados.</p>`,
    vidaReal: `
      <p>El trueque y la ayuda mutua hacen más fuerte a tu comunidad:</p>
      <ul>
        <li>Consigues lo que necesitas sin gastar dinero.</li>
        <li>Aprovechas lo que te sobra del huerto o de tu casa.</li>
        <li>Compartes herramientas y semillas con tus vecinos.</li>
        <li>Tu colonia se organiza mejor ante una emergencia.</li>
        <li>Enseñas y aprendes habilidades que nadie te podría vender.</li><li>Sabes que no tienes que hacerlo todo por tu cuenta para ser más autosuficiente.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Llevas 4 kg de vidrio y 3 kg de PET al Mercado de Trueque. ¿Cuántos kg más podrías llevar antes de llegar al máximo de 10 kg?</p>', respuesta: 10 - 4 - 3,
        pista: '<p>Resta lo que ya llevas de 10.</p>',
        solucion: '<p>10 − 4 − 3 = <strong>3 kg</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En tu calle, 6 familias comparten una escalera en lugar de comprar cada una la suya. Si una escalera cuesta 1 200 pesos, ¿cuánto ahorran entre todas?</p>', respuesta: 1200 * 5,
        pista: '<p>Sin compartir habrían comprado 6; compartiendo, 1.</p>',
        solucion: '<p>Se ahorran 5 escaleras: 1 200 × 5 = <strong>6 000 pesos</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es el trueque?</p>',
        opciones: ['Comprar a crédito', 'Cambiar una cosa o un servicio por otro, sin dinero', 'Regalar todo lo que tienes'], correcta: 1,
        pista: '<p>No se usa dinero.</p>',
        solucion: '<p><strong>Cambiar sin usar dinero.</strong></p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué recibes en el Mercado de Trueque de la Ciudad de México a cambio de tus reciclables?</p>',
        opciones: ['Dinero en efectivo', 'Nada', 'Puntos verdes canjeables por artículos, plantas y hortalizas'], correcta: 2,
        pista: '<p>Se llaman puntos.</p>',
        solucion: '<p><strong>Puntos verdes</strong> para canjear.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Ready.gov, ¿qué suele ser lo más útil si quieres donar después de un desastre?</p>',
        opciones: ['Dinero en efectivo a una organización reconocida', 'Ropa usada sin avisar', 'Comida casera enviada por paquetería'], correcta: 0,
        pista: '<p>Es lo más rápido y flexible.</p>',
        solucion: '<p><strong>Dinero a una organización reconocida.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama cuando las personas de una comunidad se apoyan entre sí, sabiendo que mañana ellas pueden necesitar ayuda?</p>',
        respuestas: ['ayuda mutua', 'la ayuda mutua', 'apoyo mutuo', 'el apoyo mutuo'],
        pista: '<p>Son dos palabras; la segunda es "mutua".</p>',
        solucion: '<p><strong>Ayuda mutua</strong>.</p>' },
    ],
    fuentes: [SEDEMA, READY('participar-activamente', 'Participar activamente'), READY('haga-un-plan', 'Haga un plan'), WIKI('Trueque', 'Trueque')],
  });
})();
