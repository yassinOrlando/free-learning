// Inteligencia artificial · Unidad 6: IA y sociedad.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Sin nombres de chatbots ni de empresas (solo organismos). Leyes con región, año y artículo, como ejemplo.
// Las cifras de los ejemplos y de los ejercicios son de ejemplo; las de las fuentes llevan "según" y su año.
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('ia', titulo, datos);
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
  const caja = (x, y, w, h, texto) => [
    { tipo: 'poligono', puntos: [[x - w / 2, y - h / 2], [x + w / 2, y - h / 2], [x + w / 2, y + h / 2], [x - w / 2, y + h / 2]] },
    txt(x, y, texto),
  ];
  function barras({ etiquetas, valores, max, paso, descripcion }) {
    const n = valores.length;
    const figuras = valores.flatMap((v, i) => [
      { tipo: 'poligono', puntos: [[i + 0.15, 0], [i + 0.85, 0], [i + 0.85, v], [i + 0.15, v]], solido: true },
      txt(i + 0.5, -max * 0.07, etiquetas[i]),
      txt(i + 0.5, v + max * 0.05, String(v)),
    ]);
    return G({ x: [0, n], y: [-max * 0.12, max * 1.1], pasos: [1e9, paso], nombres: false, figuras, descripcion });
  }
  const tabla = (encabezados, filas) => '<div class="tabla-wrap"><table><thead><tr>' + encabezados.map((h) => `<th>${h}</th>`).join('') + '</tr></thead><tbody>' +
    filas.map((f) => '<tr>' + f.map((c) => `<td>${c}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>';

  const F1 = { nombre: 'IBM Think, What Is AI Bias? (en inglés), 2024. Apoyo técnico', url: 'https://www.ibm.com/think/topics/ai-bias' };
  const F2 = { nombre: 'NIST (EE. UU.), NIST Study Evaluates Effects of Race, Age, Sex on Face Recognition Software, 2019 (en inglés)', url: 'https://www.nist.gov/news-events/news/2019/12/nist-study-evaluates-effects-race-age-sex-face-recognition-software' };
  const F3 = { nombre: 'NIST (EE. UU.), There’s More to AI Bias Than Biased Data, 2022 (en inglés)', url: 'https://www.nist.gov/news-events/news/2022/03/theres-more-ai-bias-biased-data-nist-report-highlights' };
  const F4 = { nombre: 'Unión Europea, Reglamento (UE) 2024/1689 (Ley de IA), en el BOE', url: 'https://www.boe.es/buscar/doc.php?id=DOUE-L-2024-81079' };
  const F5 = { nombre: 'Unión Europea, Reglamento (UE) 2016/679 (RGPD), en el BOE', url: 'https://www.boe.es/buscar/doc.php?id=DOUE-L-2016-80807' };
  const F6 = { nombre: 'AEPD (España), decálogo para proteger la privacidad al usar herramientas de IA, enero de 2026', url: 'https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/aepd-publica-decalogo-recomendaciones-proteger-privacidad-al-usar-ia' };
  const F7 = { nombre: 'AEPD (España), Recomendaciones para usuarios en la utilización de chatbots con inteligencia artificial (infografía)', url: 'https://www.aepd.es/infografias/info-recomendaciones-chatbots-ia.pdf' };
  const F8 = { nombre: 'FTC (EE. UU.), Scammers use AI to enhance their family emergency schemes, marzo de 2023 (en inglés)', url: 'https://consumer.ftc.gov/consumer-alerts/2023/03/scammers-use-ai-enhance-their-family-emergency-schemes' };
  const F9 = { nombre: 'AEPD (España), iniciativa sobre deepfakes, marzo de 2026', url: 'https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/aepd-promueve-uso-responsable-de-la-ia-con-iniciativa-sobre-deepfakes' };
  const F20 = { nombre: 'OMPI, Derecho de autor', url: 'https://www.wipo.int/copyright/es/' };
  const F21 = { nombre: 'OMPI, Principios básicos del derecho de autor y los derechos conexos, 2016', url: 'https://www.wipo.int/edocs/pubdocs/es/wipo_pub_909_2016.pdf' };
  const F22 = { nombre: 'Oficina de Derechos de Autor de EE. UU., Copyright and Artificial Intelligence, Part 2: Copyrightability, 2025 (en inglés)', url: 'https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf' };
  const F23 = { nombre: 'Unión Europea, Reglamento (UE) 2024/1689 (Ley de IA), Diario Oficial de la UE de 12.7.2024, en el BOE', url: 'https://www.boe.es/doue/2024/1689/L00001-00144.pdf' };
  const F24 = { nombre: 'OMPI, WIPO and Artificial Intelligence (en inglés)', url: 'https://www.wipo.int/about-ip/es/artificial_intelligence/' };
  const F25 = { nombre: 'Oficina de Derechos de Autor de EE. UU., Copyright and Artificial Intelligence, Part 3: Generative AI Training, versión previa, 2025 (en inglés)', url: 'https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-3-Generative-AI-Training-Report-Pre-Publication-Version.pdf' };
  const F26 = { nombre: 'OIT, Generative AI and Jobs: A global analysis of potential effects on job quantity and quality, 2023 (en inglés)', url: 'https://www.ilo.org/es/publications/generative-ai-and-jobs-global-analysis-potential-effects-job-quantity-and' };
  const F27 = { nombre: 'OIT, Documento de trabajo 96, 2023 (en inglés)', url: 'https://webapps.ilo.org/static/english/intserv/working-papers/wp096/index.html' };
  const F28 = { nombre: 'OIT, Uno de cada cuatro empleos en riesgo de transformarse por la IA generativa, mayo de 2025', url: 'https://www.ilo.org/es/resource/news/one-four-jobs-risk-being-transformed-genai-new-ilo-nask-global-index-shows' };
  const F29 = { nombre: 'AIE, Energy and AI, 2025: Energy demand from AI (en inglés)', url: 'https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai' };
  const F30 = { nombre: 'AIE, Energy and AI, 2025: Executive summary (en inglés)', url: 'https://www.iea.org/reports/energy-and-ai/executive-summary' };
  const F31 = { nombre: 'PNUMA, AI has an environmental problem. Here’s what the world can do about that, 2024 (en inglés)', url: 'https://www.unep.org/news-and-stories/story/ai-has-environmental-problem-heres-what-world-can-do-about' };
  const F32 = { nombre: 'Google Cloud Blog, Measuring the environmental impact of AI inference, agosto de 2025 (en inglés; cifras de la propia empresa)', url: 'https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference' };

  // ------------------------------------------------------------------
  L('Sesgos en la IA', {
    objetivo: 'Explicar qué es un sesgo en la IA y de dónde puede venir, calcular por grupo cuánto acierta un modelo de ejemplo y nombrar medidas que ayudan a reducirlo.',
    vidaReal: `
      <p>Cada vez más decisiones pasan por programas de IA: desbloquear el celular con tu cara, ordenar solicitudes de empleo o de préstamo, sugerir qué ver. Saber que un programa puede equivocarse más con unas personas que con otras evita creer que "si lo dice la máquina, es justo". También te enseña a hacer buenas preguntas cuando un resultado te parece raro, por ejemplo con qué datos aprendió ese programa.</p>`,
    explicacion: `
      <p>Imagina que aprendes a reconocer perros viendo solo fotos de labradores. Cuando aparece un chihuahua, dudas o te equivocas. No es que no sepas reconocer perros: solo viste pocos ejemplos de ese tipo. A una IA le puede pasar lo mismo.</p>
      <h3>¿Qué es un sesgo en la IA?</h3>
      <p>Según una guía técnica de apoyo (2024), el <strong>sesgo</strong> en la IA es cuando sesgos humanos distorsionan los datos de entrenamiento o el algoritmo, y los resultados salen distorsionados y posiblemente dañinos. Como viste en "Los datos", un modelo solo aprende lo que hay en sus datos. El programa no tiene intenciones: repite los patrones que recibió.</p>
      <h3>¿De dónde viene?</h3>
      <p>Una causa, según el NIST (EE. UU., 2022), es entrenar un programa con un conjunto de datos que subrepresenta a un género o a un grupo étnico. Por eso se habla de <strong>datos representativos</strong>: datos que incluyen a todos los grupos sobre los que el programa va a decidir. La guía de apoyo dice que los datos que se le dan a la IA deben ser completos y equilibrados para reflejar la composición real del grupo considerado.</p>
      <h3>Una evidencia: reconocimiento facial</h3>
      <p>En diciembre de 2019, el NIST publicó una evaluación de programas de reconocimiento facial. En la comparación uno a uno (¿estas dos fotos son de la misma persona?), vio más falsos positivos, es decir, decir "sí es la misma" cuando no lo era, con rostros asiáticos y afroamericanos que con rostros caucásicos. Las diferencias iban a menudo de 10 a 100 veces, según el algoritmo. Ojo: eso fue en esos programas, no en toda la IA, y el problema está en los datos y en cómo se evalúa el programa, no en las personas. Úsalo como prueba de que importa con qué datos se entrena un programa y de que hay que evaluarlo grupo por grupo.</p>
      <h3>Por qué importa</h3>
      <p>Si un programa así ayuda a decidir algo importante, como revisar solicitudes, un error que afecta más a un grupo podría terminar en un trato injusto, por ejemplo al revisar solicitudes de empleo o de préstamo. Esta es una explicación de la lección, no un dato de las fuentes.</p>
      <h3>¿Cómo se reduce?</h3>
      <p>Hay medidas. Una es examinar los datos buscando sesgos: la Ley de IA de la UE (2024, art. 10, apartado 2, letra f) lo pide en los sistemas de alto riesgo. Es un ejemplo; revisa la ley de tu país. Otra es la supervisión humana: la guía de apoyo menciona, como una capa más de control de calidad, un sistema de "humano en el circuito": la IA ofrece opciones o recomendaciones y las decisiones humanas pueden aprobarlas. Una tercera, como recomendación de la lección, es probar el modelo por separado con cada grupo. Los sesgos de las personas, que son otro tema, los verás en "Sesgos cognitivos", de Lectura.</p>
      <p class="nota"><strong>Trampa común:</strong> mirar solo el resultado promedio. Un promedio puede verse bueno aunque el modelo falle mucho con un grupo pequeño.</p>`,
    ejemplo: `
      <p>Un modelo de ejemplo reconoce rostros. Con el grupo A acertó 180 de 200 veces y con el grupo B, 30 de 50. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Aciertos del grupo A: 180 ÷ 200 = 0.90, o sea 90 %. Su error es 10 %.</li>
        <li>Aciertos del grupo B: 30 ÷ 50 = 0.60, o sea 60 %. Su error es 40 %.</li>
        <li>La diferencia es de 30 puntos porcentuales. La tasa de error del grupo B (40 %) es 4 veces la del A (10 %).</li>
        <li>El promedio general es 210 ÷ 250 = 0.84, o sea 84 %, y su error es 16 %. Se ve bien porque el grupo A pesa más: tiene 4 veces más casos.</li>
      </ol>
      ${barras({ etiquetas: ['Grupo A', 'Grupo B', 'Todos'], valores: [10, 40, 16], max: 50, paso: 10, descripcion: 'Gráfica de barras de ejemplo con el porcentaje de error de un modelo: grupo A 10, grupo B 40 y todos juntos 16.' })}
      <p>Resultado: <span class="resultado">el 84 % general esconde un 60 % de aciertos en el grupo B</span>.</p>
      <p class="nota"><strong>Error común:</strong> concluir que, con 84 %, el modelo funciona bien para todos. Para comprobarlo, calcula siempre cada grupo por separado.</p>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un modelo de ejemplo acertó 45 de 60 veces con un grupo. ¿Qué porcentaje de aciertos tuvo?</p>', respuesta: 45 / 60 * 100,
        pista: '<p>Divide los aciertos entre el total y multiplica por 100.</p>',
        solucion: '<p>45 ÷ 60 = 0.75, es decir, 75 %.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según el NIST (EE. UU., 2022), ¿cuál es una causa posible de sesgo?</p>', opciones: ['Que la computadora esté vieja', 'Entrenar con datos que subrepresentan a un grupo', 'Que el programa sea muy rápido', 'Que el usuario escriba con faltas'], correcta: 1,
        pista: '<p>Piensa en el ejemplo del perro: ¿qué le faltó a quien solo vio labradores?</p>',
        solucion: '<p>Si los datos de entrenamiento incluyen poco a un grupo, el modelo aprende menos sobre él y se equivoca más.</p>' },
      { tipo: 'numero', enunciado: '<p>En un modelo de ejemplo, el grupo A tuvo 90 % de aciertos y el grupo B, 50 %. ¿Cuántos puntos porcentuales de diferencia hay?</p>', respuesta: 90 - 50,
        pista: '<p>Resta un porcentaje del otro.</p>',
        solucion: '<p>90 − 50 = 40 puntos porcentuales.</p>' },
      { tipo: 'opciones', enunciado: '<p>El NIST (EE. UU., 2019) evaluó programas de reconocimiento facial. ¿Qué conclusión es correcta?</p>', opciones: ['Toda la IA falla igual con todas las personas', 'Los programas no se equivocan nunca', 'Los falsos positivos variaban según el grupo y el algoritmo, y a menudo de 10 a 100 veces', 'Solo importa el promedio general'], correcta: 2,
        pista: '<p>La cifra de 10 a 100 veces dependía del algoritmo, y no se aplica a toda la IA.</p>',
        solucion: '<p>El estudio vio diferencias por grupo, y a menudo de 10 a 100 veces según el algoritmo. Es evidencia de que los datos importan.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un modelo de ejemplo tiene 95 % de aciertos en general, pero solo 55 % con un grupo pequeño. ¿Qué conviene hacer?</p>', opciones: ['Probar el modelo por separado con cada grupo y revisar los datos', 'Nada: el promedio es alto', 'Borrar al grupo pequeño de los datos', 'Cambiar el color de la pantalla'], correcta: 0,
        pista: '<p>Recuerda la trampa común: el promedio puede esconder el problema.</p>',
        solucion: '<p>Hay que mirar cada grupo y revisar si los datos lo representan. Quitar al grupo pequeño empeoraría el problema.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una IA recomienda a quién contratar y una persona revisa y aprueba cada recomendación. ¿Qué medida es?</p>', opciones: ['Aumentar el tamaño de la letra', 'Entrenar con menos datos', 'Dar más velocidad al programa', 'Supervisión humana'], correcta: 3,
        pista: '<p>La guía de apoyo la llama "humano en el circuito".</p>',
        solucion: '<p>Es supervisión humana: la IA propone y una persona decide, lo que añade una capa de revisión.</p>' },
    ],
    fuentes: [F1, F2, F3, F4],
  });

  // ------------------------------------------------------------------
  L('Privacidad: qué no compartir', {
    objetivo: 'Distinguir los datos personales y los sensibles, decidir qué no escribir en una herramienta de IA y saber a quién acudir si tus datos se usan mal.',
    vidaReal: `
      <p>Cuando le escribes a una herramienta de IA, a veces cuentas más de lo que crees: tu nombre completo, dónde vives, una foto de un compañero o un problema de salud. Saber qué conviene dejar fuera te protege a ti y a las personas de tu familia y de tu escuela. Es como decidir qué dices en voz alta en un lugar lleno de gente: puedes hablar con libertad, pero eliges qué contar.</p>`,
    explicacion: `
      <p>Piensa en una conversación en la calle. Hablas del clima sin problema, pero no gritas tu dirección ni tu clave del banco. Con una herramienta de IA en internet es parecido, porque lo que escribes suele viajar a los servidores de quien la ofrece.</p>
      <h3>¿Qué son los datos personales?</h3>
      <p>El RGPD, la ley de protección de datos de la Unión Europea (2016, art. 4, punto 1), define los <strong>datos personales</strong> como toda información sobre una persona identificada o identificable. Un nombre es un dato personal. También lo es una dirección o una foto donde se te reconoce.</p>
      <h3>Datos sensibles</h3>
      <p>Algunos datos pesan más. El mismo RGPD (art. 9, apartado 1) llama categorías especiales, y las trata con más cuidado, a los datos de salud, los biométricos (como la huella o el rostro usados para identificar) y los genéticos, entre otros. En esta lección los llamamos <strong>datos sensibles</strong>.</p>
      <h3>¿Qué recomiendan las autoridades?</h3>
      <p>La AEPD, el organismo de protección de datos de España, aconsejó en enero de 2026 no compartir con la IA datos personales (nombre completo, dirección, teléfono, documento de identidad, imágenes de personas) ni información delicada o sensible. Sobre las herramientas en línea, la AEPD pide revisar si siguen aprendiendo de las conversaciones y qué hacen con esos datos. Cada servicio explica en sus políticas qué hace con lo que escribes; por eso conviene leerlas, y revisa la información vigente.</p>
      ${tabla(['Puedes compartir', 'Piénsalo dos veces', 'Nunca compartas'], [
        ['Una duda de matemáticas', 'Tu escuela o tu ciudad', 'Contraseñas y claves'],
        ['Un texto inventado por ti', 'Un dato que no sabes si es personal', 'Nombre completo, dirección y teléfono'],
        ['Una pregunta general', 'Un mensaje con datos de otras personas', 'Datos de salud o fotos de personas'],
      ])}
      <p>La tabla es una recomendación de la lección; la columna «Nunca compartas» se apoya en lo que dice la AEPD (salvo las contraseñas, que son un añadido de la lección). Si quieres que tus datos no salgan de tu equipo, existe la opción de un modelo local, que viste en "Qué es un LLM local y por qué usarlo". Para tus contraseñas, mira "Seguridad digital: contraseñas y fraudes en línea".</p>
      <h3>El consentimiento</h3>
      <p>El <strong>consentimiento</strong> es el permiso libre para que usen tus datos. El RGPD (art. 8, apartado 1) fija en 16 años la edad para darlo por ti mismo en servicios en línea, y permite que cada país la baje, sin ir por debajo de 13. Por debajo, lo da o autoriza quien tiene la patria potestad. Es un ejemplo de la UE: revisa la ley de tu país.</p>
      <h3>Si algo sale mal</h3>
      <p>Según el RGPD (art. 77), una persona puede presentar una reclamación ante la autoridad de protección de datos (en España, la AEPD). Dile a un adulto de confianza y acude al organismo de protección de datos o a la policía cibernética de tu país. Pedir ayuda está bien.</p>`,
    ejemplo: `
      <p>Vas a pedir ayuda a una herramienta de IA con tres mensajes de ejemplo. En cada uno, busca el dato que sobra.</p>
      <ol class="pasos-ej">
        <li>«Me llamo Ana Pérez, vivo en la calle Sol 12 y no entiendo las fracciones.» Sobran el nombre completo y la dirección. Seguro: «No entiendo las fracciones.»</li>
        <li>«Mi mamá tiene diabetes; ¿qué cocino hoy?» Sobra el dato de salud de otra persona. Seguro: «¿Qué cena sencilla puedo preparar con verduras?»</li>
        <li>«Mi clave es 4821 y quiero saber si es buena.» Sobra la clave. Seguro: «¿Qué hace buena a una contraseña?»</li>
      </ol>
      <p>Resultado: <span class="resultado">en cada mensaje, la pregunta se puede responder sin el dato personal</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que cambiar una sola letra del nombre basta. Si aún se puede reconocer a la persona, sigue siendo un dato personal. Para comprobarlo, pregunta: ¿podría alguien saber de quién hablo?</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según el RGPD de la UE (2016), ¿qué son datos personales?</p>', opciones: ['Solo las contraseñas', 'Toda información sobre una persona identificada o identificable', 'Únicamente las fotos', 'Los datos de las empresas'], correcta: 1,
        pista: '<p>La definición dice "identificada o identificable".</p>',
        solucion: '<p>Son toda información sobre una persona que se pueda identificar, directa o indirectamente.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos mensajes es el más seguro para una herramienta de IA?</p>', opciones: ['Soy Luis Ríos, vivo en Av. Norte 8 y necesito un resumen', 'Mi hermana tiene una enfermedad rara; ¿qué hago?', 'Resume este texto sobre los volcanes en 5 líneas', 'Mi clave del juego es 9902; ¿es buena?'], correcta: 2,
        pista: '<p>Busca el mensaje sin nombre, dirección, salud ni claves.</p>',
        solucion: '<p>El tercero no tiene ningún dato personal. Los demás incluyen nombre y dirección, salud de otra persona o una clave.</p>' },
      { tipo: 'opciones', enunciado: '<p>En la tabla de la lección, ¿en qué columna va una contraseña?</p>', opciones: ['Puedes compartir', 'Piénsalo dos veces', 'Nunca compartas', 'En ninguna'], correcta: 2,
        pista: '<p>Una contraseña da acceso a tus cuentas.</p>',
        solucion: '<p>Va en la columna «Nunca compartas»: quien la tenga puede entrar a tus cuentas.</p>' },
      { tipo: 'numero', enunciado: '<p>En el RGPD de la UE (art. 8), ¿cuál es la edad mínima general para dar consentimiento por ti mismo en servicios en línea?</p>', respuesta: 16,
        pista: '<p>Cada país puede bajarla, pero la regla general es otra cifra mayor que 13.</p>',
        solucion: '<p>Son 16 años. Los países pueden bajarla, sin ir por debajo de 13. Revisa la ley de tu país.</p>' },
      { tipo: 'opciones', enunciado: '<p>Alguien cree que usaron sus datos de forma indebida. ¿Qué puede hacer?</p>', opciones: ['Callar y no decir nada', 'Acudir al organismo de protección de datos o a la policía cibernética de su país', 'Publicar los datos de otra persona', 'Borrar su correo'], correcta: 1,
        pista: '<p>La lección dice a quién acudir y que pedir ayuda está bien.</p>',
        solucion: '<p>Puede acudir a la autoridad de protección de datos, por ejemplo con una reclamación, o a la policía cibernética de su país.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la AEPD, ¿qué conviene revisar de una herramienta en línea?</p>', opciones: ['Si el servicio sigue aprendiendo de las conversaciones y qué hace con esos datos', 'El color de la pantalla', 'Cuántos amigos la usan', 'Si el nombre es corto'], correcta: 0,
        pista: '<p>Está en las políticas de cada servicio.</p>',
        solucion: '<p>La AEPD pide revisar si el servicio sigue aprendiendo de las conversaciones y qué hace con esos datos.</p>' },
    ],
    fuentes: [F5, F6, F7],
  });

  // ------------------------------------------------------------------
  L('Deepfakes y contenido falso', {
    objetivo: 'Reconocer qué es una ultrasuplantación y una voz clonada, y seguir pasos seguros ante un mensaje, una llamada o un video que pide dinero o datos.',
    vidaReal: `
      <p>Hoy se pueden crear imágenes, videos y voces que parecen reales. Por eso es útil tener un método sencillo: ya no basta con "se oye igual" o "se ve igual". Te sirve cuando recibes una llamada urgente de un supuesto familiar, un video que te indigna o una foto que circula en el grupo de la escuela. Un método corto te da calma para decidir sin prisa y proteger a los tuyos.</p>`,
    explicacion: `
      <p>Imagina que te llega un mensaje de voz de tu tío: «Tuve un accidente, necesito dinero ya». Se oye como él. Pero ¿es él? La IA hoy puede imitar voces con muy poco material.</p>
      <h3>¿Qué es una ultrasuplantación?</h3>
      <p>La Ley de IA de la UE (2024, art. 3, punto 60) la define como un contenido de imagen, audio o video generado o manipulado por una IA que se parece a personas, lugares o sucesos reales y puede hacer creer que es auténtico. En la versión en español de esa ley, el término es <strong>ultrasuplantación</strong>; en inglés se dice <span lang="en">deepfake</span>. Es un ejemplo de definición legal: revisa la ley de tu país. En general, a lo que crea una IA se le puede llamar <strong>contenido sintético</strong> (simplificación de la lección).</p>
      <h3>Voces clonadas</h3>
      <p>La FTC, la agencia de protección al consumidor de EE. UU., avisó en marzo de 2023 que un estafador puede usar IA para clonar la <strong>voz</strong> de un ser querido con un audio corto sacado de contenido publicado en línea. Las estafas con voces clonadas se parecen a las que verás en "Fraudes comunes y cómo evitarlos".</p>
      <h3>¿Qué hacer ante una llamada o un video urgente?</h3>
      <p>La FTC recomienda no confiar en la voz: llama a la persona que supuestamente te contactó y verifica la historia con un número que sepas que es suyo. Esa es la base de un método de cuatro pasos de la lección. Si alguien te pide dinero o datos con urgencia, cuelga o deja de responder. Luego llama a un número que ya conocías. Confirma la historia. Y habla con un adulto de confianza. Como recomendación de la lección, una familia puede acordar de antemano una palabra clave que solo ella conozca.</p>
      ${diagrama([0, 12], [0, 15], [
        ...caja(6, 13, 7.5, 2, 'Llamada urgente'), ...caja(6, 9.5, 7.5, 2, 'Pide dinero o datos'), ...caja(6, 6, 7.5, 2, 'Cuelga'), ...caja(6, 2.5, 7.5, 2, 'Llama a número conocido'),
        ...flecha([6, 12], [6, 10.5]), ...flecha([6, 8.5], [6, 7]), ...flecha([6, 5], [6, 3.5]),
      ], 'Diagrama vertical con cuatro recuadros unidos por flechas: llamada urgente, pide dinero o datos, cuelga y llama a un número conocido para confirmar.')}
      <h3>La ley y las personas</h3>
      <p>Según la Ley de IA de la UE (2024, art. 50, apartado 4), quien usa un sistema que genera una ultrasuplantación debe hacer público que fue generada o manipulada, con algunas excepciones, como el uso legal para investigar delitos o las obras creativas o satíricas. Además, la AEPD (España, marzo de 2026) recomienda pedir consentimiento antes de usar imágenes o datos de otras personas y contrastar la información antes de difundir algo que pueda ser falso. No uses ni compartas la imagen o la voz de otra persona sin su consentimiento.</p>
      <h3>Si te pasa</h3>
      <p>Cuéntaselo a un adulto de confianza y denuncia ante el organismo de protección de datos o la policía cibernética de tu país. Para noticias dudosas, mira "Verificar noticias y detectar desinformación".</p>
      <p class="nota"><strong>Trampa común:</strong> creer que se nota a simple vista. Cada vez es más difícil, así que cuenta más la fuente que el aspecto.</p>`,
    ejemplo: `
      <p>Revisa cinco situaciones de ejemplo y decide la acción segura. Después cuenta cuántas tenían señal de alerta.</p>
      <ol class="pasos-ej">
        <li>Llama "tu prima" con voz rara y pide dinero ya. Es una señal de alerta: cuelga y llama a su número de siempre.</li>
        <li>Un video de un famoso regala dinero si envías tus datos. Es una señal de alerta: no envíes nada y avisa a un adulto.</li>
        <li>Tu abuela te llama por la tarde, como siempre, y pregunta cómo estás. No hay señal de alerta.</li>
        <li>Te llega una foto increíble sin fuente. No hay pedido de dinero, pero antes de difundirla hay que contrastar de dónde viene.</li>
        <li>Un número desconocido dice ser del banco y pide tu clave. Es una señal de alerta: cuelga y llama al número oficial.</li>
      </ol>
      <p>Resultado: <span class="resultado">3 de 5 situaciones tenían señal de alerta</span>.</p>
      <p class="nota"><strong>Error común:</strong> seguir hablando "para ver si cuelgan". Para comprobar, pregunta: ¿me pide dinero o datos con prisa? Si es así, corta y verifica por otro camino.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según la Ley de IA de la UE (2024), ¿cuál es el término oficial en español para <span lang="en">deepfake</span>?</p>', opciones: ['Ultrafalso', 'Ultrasuplantación', 'Fotocopia', 'Montaje simple'], correcta: 1,
        pista: '<p>Empieza con "ultra" y termina con una palabra que alude a suplantar.</p>',
        solucion: '<p>La ley usa "ultrasuplantación", con <span lang="en">deepfake</span> como término en inglés.</p>' },
      { tipo: 'opciones', enunciado: '<p>Recibes una llamada con la voz de un familiar que pide dinero con urgencia. Según la FTC (EE. UU., 2023), ¿qué haces?</p>', opciones: ['Envías el dinero rápido', 'Contestas con tus datos', 'Compartes el audio en el grupo', 'Llamas a esa persona con un número que sabes que es suyo'], correcta: 3,
        pista: '<p>La FTC dice que no confíes en la voz.</p>',
        solucion: '<p>Cuelgas y llamas a un número que sabes que es suyo para verificar la historia.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la AEPD (España, 2026), antes de difundir un contenido que podría ser falso, hay que...</p>', opciones: ['Reenviarlo rápido', 'Contrastar la información', 'Borrar la fuente', 'Esperar a que sea viral'], correcta: 1,
        pista: '<p>Piensa en comprobar antes de compartir.</p>',
        solucion: '<p>La AEPD recomienda contrastar la información antes de difundir.</p>' },
      { tipo: 'numero', enunciado: '<p>En el método de la lección hay una secuencia de pasos: cuelgas, llamas a un número conocido, confirmas la historia y hablas con un adulto. ¿Cuántos pasos son?</p>', respuesta: 4,
        pista: '<p>Cuenta cada acción del método.</p>',
        solucion: '<p>Son 4 pasos. Ninguno exige adivinar si el audio es real o falso.</p>' },
      { tipo: 'opciones', enunciado: '<p>Te llega un video donde sale una persona de tu escuela, y parece manipulado. ¿Qué es lo mejor?</p>', opciones: ['Compartirlo con todos', 'Hacer otro igual', 'No difundirlo, avisar a un adulto y reportarlo en el organismo de protección de datos o la policía cibernética de tu país', 'Comentar que es divertido'], correcta: 2,
        pista: '<p>Piensa en cuidar a la persona que aparece.</p>',
        solucion: '<p>No se difunde, se avisa a un adulto y se puede reportar al organismo de protección de datos o a la policía cibernética.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué dice la Ley de IA de la UE (2024, art. 50, apartado 4) sobre quien usa un sistema que genera una ultrasuplantación?</p>', opciones: ['Que debe hacer público que el contenido fue generado o manipulado, con excepciones', 'Que no tiene que decir nada', 'Que solo debe avisar a sus amigos', 'Que debe borrar su cuenta'], correcta: 0,
        pista: '<p>Es una regla de transparencia, con algunas excepciones.</p>',
        solucion: '<p>Debe hacer público que el contenido es artificial, con algunas excepciones (por ejemplo, obras creativas o satíricas, o el uso legal para investigar delitos). Revisa la ley de tu país.</p>' },
    ],
    fuentes: [F4, F8, F9],
  });

  // ------------------------------------------------------------------
  L('Derechos de autor', {
    objetivo: 'Explicar qué protege el derecho de autor, qué es el dominio público y qué se discute hoy sobre la IA y las obras, para decidir con criterio cuándo pedir permiso.',
    vidaReal: `
      <p>Cuando usas una canción en un video, copias un dibujo de internet o pides a una herramienta de IA una imagen, hay personas detrás de cada obra. Entender los derechos de autor te ayuda a saber cuándo puedes usar algo, cuándo conviene pedir permiso y cómo dar crédito. También te sirve para tus propios trabajos: lo que haces con tu esfuerzo también tiene un autor, tú.</p>`,
    explicacion: `
      <p>Imagina que un compañero dibuja un cómic y otro lo copia y lo presenta como suyo. Se siente injusto, porque el trabajo tuvo un creador. De eso trata el derecho de autor.</p>
      <h3>¿Qué es el derecho de autor?</h3>
      <p>Según la OMPI, el organismo de la ONU para la propiedad intelectual, la expresión <strong>derecho de autor</strong> describe los derechos de los creadores sobre sus <strong>obras</strong> literarias y artísticas. Como ejemplo de la lección, un libro, una canción o un dibujo son obras.</p>
      <h3>Cuando una obra se vuelve libre</h3>
      <p>Según la OMPI (2016), las obras que dejan de estar protegidas pasan al <strong>dominio público</strong>. Entonces cualquiera puede usarlas. Los plazos dependen de cada país: revisa el dato vigente en el tuyo. No confundas esto con una licencia, que es el permiso que da una persona autora sobre su obra, como viste en "Modelos abiertos: qué significa que se puedan descargar". Y copiar sin dar crédito es plagio, como viste en "Usar IA para estudiar sin hacer trampa".</p>
      <h3>¿De quién es lo que crea una IA?</h3>
      <p>La respuesta cambia según el país. La Oficina de Derechos de Autor de EE. UU. (2025) afirma que, en ese país, la protección exige autoría humana. Eso significa que, para recibir esa protección allí, debe haber una persona autora. Es un ejemplo de EE. UU., no una regla universal.</p>
      <h3>Y los datos con los que se entrena</h3>
      <p>Los modelos se entrenan con muchísimas obras. La Ley de IA de la UE (2024, art. 53, apartado 1, letras c y d) pide a los proveedores de modelos de uso general dos cosas: tener directrices para cumplir el derecho de autor y publicar un resumen suficientemente detallado del contenido usado para entrenar. Es un ejemplo de la UE; revisa la ley de tu país.</p>
      <h3>Un debate abierto</h3>
      <p>Según la OMPI, la IA plantea preguntas sobre autoría, titularidad y pago por entrenar modelos, y hay debates globales en curso. La Oficina de Derechos de Autor de EE. UU. (2025) señala que hay decenas de demandas pendientes en ese país sobre el uso de obras protegidas para entrenar IA. El tema sigue en discusión y aquí no tomamos partido.</p>
      ${tabla(['Situación', '¿Quién tiene derechos?', 'Qué hacer'], [
        ['Usar una canción en un video', 'La persona autora o quien tenga sus derechos', 'Pedir permiso o buscar una licencia que lo permita'],
        ['Imagen en dominio público', 'Nadie la controla ya', 'Usarla y dar crédito si puedes'],
        ['Dibujo de un compañero', 'Tu compañero', 'Pedirle permiso y citarlo'],
      ])}
      <p class="nota"><strong>Trampa común:</strong> creer que "está en internet" significa "es libre". Aparecer en internet no quita los derechos del autor.</p>`,
    ejemplo: `
      <p>Clasifica cuatro casos de ejemplo con los criterios de la lección. No es consejo legal: revisa las reglas de tu país.</p>
      <ol class="pasos-ej">
        <li>Quieres usar una canción famosa en tu video. Tiene autor y derechos: pide permiso o busca una licencia que lo permita.</li>
        <li>Un texto lo generó una IA con tu instrucción. En EE. UU. la protección exige autoría humana, y las reglas cambian por país: revisa las de tu país.</li>
        <li>Una imagen de un libro muy antiguo está en dominio público. Si en tu país lo está, puedes usarla.</li>
        <li>Un compañero hizo un dibujo. Es su obra: pídele permiso y cítalo.</li>
      </ol>
      <p>Resultado: <span class="resultado">en 3 de los 4 casos hay que pedir permiso o revisar las reglas antes de usar la obra; el dominio público es el que menos exige</span>.</p>
      <p class="nota"><strong>Error común:</strong> dar el crédito y creer que ya no hace falta el permiso. Dar crédito no reemplaza el permiso. Para comprobar, pregunta: ¿quién hizo esto y qué me permite hacer con ello?</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según la OMPI, ¿qué describe la expresión "derecho de autor"?</p>', opciones: ['Los impuestos de una empresa', 'Los derechos de los creadores sobre sus obras literarias y artísticas', 'El precio de un libro', 'La velocidad de internet'], correcta: 1,
        pista: '<p>Piensa en lo que protege a quien crea.</p>',
        solucion: '<p>Describe los derechos de los creadores sobre sus obras literarias y artísticas.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la OMPI (2016), ¿a dónde pasan las obras que dejan de estar protegidas?</p>', opciones: ['Al dominio público', 'A la basura', 'A los bancos', 'A un museo privado'], correcta: 0,
        pista: '<p>Es el nombre de lo que cualquiera puede usar.</p>',
        solucion: '<p>Pasan al dominio público. Revisa los plazos en tu país.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la Oficina de Derechos de Autor de EE. UU. (2025), ¿qué exige la protección en ese país?</p>', opciones: ['Tener muchos seguidores', 'Autoría humana', 'Usar un programa caro', 'Que la obra sea larga'], correcta: 1,
        pista: '<p>La palabra clave es "humana".</p>',
        solucion: '<p>Exige autoría humana. Es la regla de EE. UU.; otros países pueden tener otras.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la Ley de IA de la UE (2024, art. 53), ¿qué debe publicar un proveedor de un modelo de uso general?</p>', opciones: ['La contraseña de sus servidores', 'Los datos personales de sus usuarios', 'Un resumen suficientemente detallado del contenido usado para entrenar', 'El precio de todas sus obras'], correcta: 2,
        pista: '<p>Se refiere al contenido de entrenamiento.</p>',
        solucion: '<p>Debe publicar un resumen suficientemente detallado del contenido usado para entrenar, y tener directrices de derecho de autor.</p>' },
      { tipo: 'opciones', enunciado: '<p>Quieres usar el dibujo de un compañero en tu cartel. ¿Qué haces?</p>', opciones: ['Lo copias sin avisar', 'Dices que lo hiciste tú', 'Lo borras', 'Le pides permiso y lo citas'], correcta: 3,
        pista: '<p>Piensa en cómo se siente quien lo dibujó.</p>',
        solucion: '<p>Es su obra: se le pide permiso y se le da el crédito.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la OMPI, ¿en qué estado está hoy la relación entre la IA y la propiedad intelectual?</p>', opciones: ['Está resuelta en todo el mundo', 'Está prohibida', 'Hay debates globales en curso, con distintos enfoques', 'Solo importa en un país'], correcta: 2,
        pista: '<p>La lección habla de un debate abierto.</p>',
        solucion: '<p>La OMPI dice que hay debates globales en curso, con enfoques distintos. Por eso conviene revisar la ley de tu país.</p>' },
    ],
    fuentes: [F20, F21, F22, F23, F24, F25],
  });

  // ------------------------------------------------------------------
  L('IA y el futuro del trabajo', {
    objetivo: 'Diferenciar entre automatizar y complementar, leer las cifras de la OIT sobre exposición al trabajo con IA y clasificar las tareas de un empleo de ejemplo.',
    vidaReal: `
      <p>Piensa en lo que te gustaría hacer de grande. Quizá algún día quieras ser doctora, chef, programador o artista, y te preguntas si la IA cambiará ese trabajo. Entender cómo se mezclan las tareas de un empleo te permite pensar con calma y no con miedo. También te da ideas de qué aprender: usar la IA con criterio y practicar lo que solo hacen las personas, como pensar, hablar con otros y crear.</p>`,
    explicacion: `
      <p>Piensa en el trabajo de quien atiende la caja de un negocio de barrio. Cobra, saluda, ordena, resuelve dudas y cuenta el dinero. No es una sola cosa: es un conjunto de tareas. La IA suele tocar algunas de esas tareas, no todo el trabajo a la vez.</p>
      <h3>Automatizar o complementar</h3>
      <p>La <strong>automatización</strong> es que una máquina haga una tarea sin ayuda de una persona. En cambio, <strong>complementar</strong> es que la máquina ayude a la persona a hacer mejor su tarea. Según la OIT (Organización Internacional del Trabajo, 2023), el efecto principal de la IA generativa probablemente sea complementar empleos más que automatizarlos. Por eso en esta lección nos fijamos en las tareas dentro de un empleo.</p>
      <h3>¿Qué trabajos están más expuestos?</h3>
      <p>Estar expuesto significa que una parte del trabajo se puede hacer con IA; no significa que el empleo desaparezca ni que una persona vaya a ser reemplazada. Es una forma de medir cuánto podría cambiar el trabajo del día a día. Según un documento de la OIT (2023), solo el trabajo administrativo, o de oficina, está muy expuesto: el 24 % de sus tareas tiene exposición alta y otro 58 %, media. En los demás grupos de ocupaciones, la exposición alta va del 1 al 4 % de las tareas.</p>
      <h3>Una cifra más reciente</h3>
      <p>Según la OIT y NASK (mayo de 2025), el 25 % del empleo mundial está en ocupaciones potencialmente expuestas a la IA generativa, y en los países de ingresos altos sube a 34 %. La OIT (2023) también señaló que se espera un impacto mayor en los países de ingresos altos y entre las mujeres, por su presencia en el trabajo administrativo. Son estimaciones: revisa la información vigente.</p>
      ${barras({ etiquetas: ['Mundo', 'Ingresos altos'], valores: [25, 34], max: 40, paso: 10, descripcion: 'Gráfica de barras con el porcentaje del empleo en ocupaciones potencialmente expuestas a la IA generativa, según la OIT y NASK, 2025: mundo 25 y países de ingresos altos 34.' })}
      <h3>¿Cómo leer estas cifras?</h3>
      <p>Una cifra de exposición es una estimación, no una predicción. Dice qué parte del trabajo podría hacerse con IA generativa, no si se hará ni cuántos empleos cambiarán. Por eso la OIT habla de ocupaciones "potencialmente" expuestas. Aprende a leer estas cifras con calma, igual que otras estadísticas: en "Cómo leer estadísticas en las noticias sin que te engañen" verás qué preguntas hacer.</p>
      <h3>¿Qué puedes hacer?</h3>
      <p>Las fuentes de esta lección no listan habilidades. Como recomendación de la lección, ayuda aprender a usar la IA con criterio y desarrollar habilidades humanas: pensar, comunicarse y crear. No son promesas: nadie puede garantizar qué pasará con cada empleo. Para ver cómo se mueve el trabajo en la economía, mira "Empleo y desempleo".</p>
      <p class="nota"><strong>Trampa común:</strong> leer "expuesto" como "va a ser reemplazado". Expuesto es que una parte de las tareas puede cambiar.</p>`,
    ejemplo: `
      <p>Un empleo de ejemplo tiene 10 tareas. Clasifícalas en tres grupos y calcula porcentajes. Las cifras son de ejemplo.</p>
      <ol class="pasos-ej">
        <li>La IA puede ayudar con 4 tareas: preparar borradores, ordenar listas, traducir mensajes y resumir documentos.</li>
        <li>La IA podría hacer 2 tareas casi sola: pasar datos de un formulario a otro y archivar documentos.</li>
        <li>Necesitan a una persona 4 tareas: atender a una persona enojada, decidir un caso difícil, trabajar en equipo y explicar con paciencia.</li>
        <li>Porcentajes: 4 de 10 es 40 %, 2 de 10 es 20 % y otros 4 de 10 es 40 %.</li>
      </ol>
      <p>Resultado: <span class="resultado">60 % de las tareas podrían cambiar y 40 % siguen dependiendo de personas</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que "60 % de tareas" es "60 % del empleo perdido". Son tareas que pueden cambiar de forma, no un empleo que desaparece. Para comprobar, suma los tres porcentajes: deben dar 100 %.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según la OIT (2023), ¿qué efecto de la IA generativa es más probable?</p>', opciones: ['Complementar empleos más que automatizarlos', 'Eliminar todos los empleos', 'No cambiar ninguna tarea', 'Subir todos los sueldos'], correcta: 0,
        pista: '<p>La palabra de la lección que significa "ayudar" a la persona.</p>',
        solucion: '<p>Según la OIT, el efecto principal probablemente sea complementar más que automatizar.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la OIT (2023), ¿qué grupo de ocupaciones es el único muy expuesto?</p>', opciones: ['El trabajo agrícola', 'El trabajo administrativo o de oficina', 'El trabajo en la construcción', 'El trabajo artístico'], correcta: 1,
        pista: '<p>Piensa en tareas con papeles y formularios.</p>',
        solucion: '<p>El documento de la OIT dice que solo el trabajo administrativo está muy expuesto.</p>' },
      { tipo: 'numero', enunciado: '<p>Según el documento de la OIT (2023), 24 % de las tareas administrativas tiene exposición alta y 58 % tiene exposición media. ¿Qué porcentaje suma entre ambas?</p>', respuesta: 24 + 58,
        pista: '<p>Suma los dos porcentajes.</p>',
        solucion: '<p>24 + 58 = 82 %. Exposición no es lo mismo que reemplazo de un empleo.</p>' },
      { tipo: 'numero', enunciado: '<p>Según la OIT y NASK (2025), 34 % del empleo en países de ingresos altos y 25 % del empleo mundial están en ocupaciones potencialmente expuestas. ¿Cuántos puntos porcentuales más tiene el primero?</p>', respuesta: 34 - 25,
        pista: '<p>Resta el porcentaje mundial del de ingresos altos.</p>',
        solucion: '<p>34 − 25 = 9 puntos porcentuales.</p>' },
      { tipo: 'numero', enunciado: '<p>Un empleo de ejemplo tiene 20 tareas, y la IA puede ayudar con 5 de ellas. ¿Qué porcentaje es?</p>', respuesta: 5 / 20 * 100,
        pista: '<p>Divide las tareas entre el total y multiplica por 100.</p>',
        solucion: '<p>5 ÷ 20 = 0.25, o sea 25 %. Son cifras de ejemplo.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una persona usa la IA para preparar el borrador de un informe y luego lo corrige y decide qué incluir. ¿Qué es?</p>', opciones: ['Automatizar el trabajo', 'Sustituir a la persona', 'Complementar: la IA ayuda y la persona decide', 'Un error seguro'], correcta: 2,
        pista: '<p>La IA ayuda, pero la persona sigue a cargo.</p>',
        solucion: '<p>Es complementar: la IA ayuda en una tarea y la persona conserva el criterio.</p>' },
    ],
    fuentes: [F26, F27, F28],
  });

  // ------------------------------------------------------------------
  L('Impacto ambiental de la IA', {
    objetivo: 'Explicar por qué la IA usa energía y agua, leer las cifras de la AIE sobre los centros de datos y calcular cuánto crece su consumo.',
    vidaReal: `
      <p>Cada vez que usas un servicio en internet, hay máquinas encendidas en algún lugar, y eso cuesta electricidad. Saber que la IA gasta electricidad y agua no es para sentir culpa: es para tener datos claros. Así puedes usarla cuando de verdad aporta, entender noticias sobre su consumo y notar que también puede ayudar a ahorrar energía en otros sectores.</p>`,
    explicacion: `
      <p>Piensa en tu casa: si dejas muchas luces y aparatos encendidos, el recibo de luz sube. Con la IA pasa algo parecido, solo que a gran escala.</p>
      <h3>¿Dónde corre la IA?</h3>
      <p>Muchos programas de IA corren en un <strong>centro de datos</strong>: un edificio lleno de computadoras que funcionan sin parar. Esas máquinas necesitan electricidad. Además se calientan, y según el PNUMA (el programa de la ONU para el medio ambiente, 2024), los centros de datos usan agua durante su construcción y, ya en operación, para enfriar los componentes eléctricos.</p>
      <h3>¿Cuánta energía usan?</h3>
      <p>El <strong>consumo de energía</strong> se mide en TWh (terawatts hora). La AIE, la Agencia Internacional de la Energía, estimó en 2025 que los centros de datos consumieron unos 415 TWh en 2024, cerca del 1.5 % de la electricidad mundial. Es una parte pequeña del total, pero crece: la AIE proyecta que en 2030 llegarían a unos 945 TWh, es decir, más del doble. Son proyecciones, no certezas: dependen de cuánto se use la IA y de qué tan eficientes sean las máquinas. Revisa la información vigente. Para repasar watts y kWh, mira "Potencia eléctrica y cómo leer tu recibo de luz".</p>
      ${barras({ etiquetas: ['2024', '2030 (proyección)'], valores: [415, 945], max: 945, paso: 400, descripcion: 'Gráfica de barras con el consumo eléctrico de los centros de datos según la AIE, 2025: 415 TWh en 2024 y una proyección de 945 TWh en 2030.' })}
      <h3>¿Cuánto gasta cada consulta?</h3>
      <p>La cifra por consulta que usamos aquí es una estimación de una empresa, no una medición independiente. En 2025, esa empresa estimó que una consulta de texto mediana usa 0.24 Wh de energía y 0.26 mL de agua. Es solo una cifra de una empresa, con sus propios métodos: no la tomes como un promedio de toda la IA.</p>
      <p>Para sentir la escala, piensa que 1 TWh son mil millones de kWh. Un hogar de ejemplo gasta unos miles de kWh al año, así que 415 TWh equivalen al consumo de muchísimos hogares. Por eso la cifra parece enorme y, a la vez, es apenas 1.5 % del total mundial: el mundo entero gasta muchísima más electricidad.</p>
      <h3>También puede ayudar</h3>
      <p>Según la AIE (2025), la IA ya se usa en el sector energético y podría generar grandes mejoras de eficiencia. Entonces el efecto depende de cómo y para qué se use.</p>
      <h3>¿Qué puedes hacer?</h3>
      <p>Como recomendación de la lección: úsala cuando aporte algo, por ejemplo, no repitas la misma pregunta diez veces. Un modelo local, que viste en "Qué es un LLM local y por qué usarlo", gasta la energía de tu propio equipo, así que tampoco es gratis en energía. Para el panorama del clima, mira "Cambio climático".</p>
      <p class="nota"><strong>Trampa común:</strong> comparar TWh con Wh sin convertir. 1 TWh son mil millones de kWh, y 1 kWh son 1000 Wh.</p>`,
    ejemplo: `
      <p>Con las cifras de la AIE (2025), calcula cuánto crece el consumo de 2024 a 2030 y compáralo con un hogar de ejemplo.</p>
      <ol class="pasos-ej">
        <li>El aumento es 945 − 415 = 530 TWh.</li>
        <li>Para el porcentaje, divide el aumento entre el valor inicial: 530 ÷ 415 ≈ 1.28, o sea cerca de 128 %.</li>
        <li>Fíjate: un aumento de más de 100 % significa que más que se duplica, igual que dice la AIE.</li>
        <li>Para comparar, imagina un hogar de ejemplo que gasta 3000 kWh al año. Como 415 TWh son 415 mil millones de kWh, 415 000 000 000 ÷ 3000 ≈ 138 millones de hogares de ejemplo.</li>
      </ol>
      <p>Resultado: <span class="resultado">el consumo crecería cerca de 128 % entre 2024 y 2030</span>.</p>
      <p class="nota"><strong>Error común:</strong> dividir el aumento entre el valor final (530 ÷ 945). Para comprobar, aplica 415 × 2.28 ≈ 946, que coincide con 945.</p>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Según la AIE (2025), el consumo pasaría de 415 TWh en 2024 a 945 TWh en 2030. ¿Cuántos TWh aumenta?</p>', respuesta: 945 - 415,
        pista: '<p>Resta el valor inicial del final.</p>',
        solucion: '<p>945 − 415 = 530 TWh.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos por ciento crece el consumo de 415 a 945 TWh? Redondea a un entero.</p>', respuesta: (945 - 415) / 415 * 100, tolerancia: 0.5,
        pista: '<p>Divide el aumento entre el valor inicial y multiplica por 100.</p>',
        solucion: '<p>530 ÷ 415 ≈ 1.277, o sea cerca de 128 %.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según el PNUMA (2024), ¿para qué usan agua los centros de datos en operación?</p>', opciones: ['Para enfriar componentes eléctricos', 'Para decorar', 'Para lavar la ropa', 'Para regar jardines'], correcta: 0,
        pista: '<p>Las computadoras se calientan.</p>',
        solucion: '<p>El PNUMA dice que, ya en operación, usan agua para enfriar los componentes eléctricos.</p>' },
      { tipo: 'numero', enunciado: '<p>Según una empresa (2025), una consulta de texto mediana usa 0.24 Wh. Si se hacen 1000 consultas así, ¿cuántos Wh se usan?</p>', respuesta: 0.24 * 1000,
        pista: '<p>Multiplica la energía de una consulta por 1000.</p>',
        solucion: '<p>0.24 × 1000 = 240 Wh, o sea 0.24 kWh. Es una estimación de la empresa, no una medición independiente.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿De quién es la cifra de energía por consulta que usamos en la lección?</p>', opciones: ['De un tribunal', 'De un maestro', 'De nadie', 'De una empresa, como estimación propia'], correcta: 3,
        pista: '<p>Recuerda la sección «¿Cuánto gasta cada consulta?».</p>',
        solucion: '<p>Es una estimación de una empresa, no una medición independiente, así que conviene leerla con cuidado.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la AIE (2025), la IA también puede...</p>', opciones: ['Apagar todos los centros de datos', 'Hacer que el agua sobre', 'Generar grandes mejoras de eficiencia en el sector energético', 'Quitar la necesidad de electricidad'], correcta: 2,
        pista: '<p>Piensa en cómo se usa en el sector energético.</p>',
        solucion: '<p>La AIE dice que la IA ya se usa en el sector energético y podría generar grandes mejoras de eficiencia.</p>' },
    ],
    fuentes: [F29, F30, F31, F32],
  });
})();
