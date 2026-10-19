// Mandarín · Unidad 8: HSK 3 · Comunicación.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Todo carácter chino sale de zh(). Las frases de ejemplo («…») son de la lección; solo las palabras vienen del sílabo.
// Sin grabaciones: ningún `audio:`; solo la voz del sistema.
(function () {
  const G = window.grafica;
  const zh = window.zh;
  const L = (titulo, datos) => window.registrarLeccion('mandarin', titulo, datos);
  // Tabla de vocabulario: palabra con su botón y significado.
  const tabla = (filas) => `<div class="tabla-wrap"><table class="vocabulario"><tr><th scope="col">Palabra</th><th scope="col">Significado</th></tr>${filas.map(([h, p, es]) => `<tr><td>${zh(h, p)}</td><td>${es}</td></tr>`).join('')}</table></div>`;
  // Tabla de comparación: encabezados y filas ya armadas con zh().
  const cuadro = (cab, filas) => `<div class="tabla-wrap"><table><tr>${cab.map((c) => `<th scope="col">${c}</th>`).join('')}</tr>${filas.map((f) => `<tr>${f.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
  const txt = (x, y, texto) => ({ tipo: 'texto', x, y, texto });
  const lin = (desde, hasta) => ({ tipo: 'linea', desde, hasta });
  // Flecha: línea hasta la base de la punta + triángulo sólido como punta.
  const flecha = (desde, hasta, serie = 0) => {
    const dx = hasta[0] - desde[0], dy = hasta[1] - desde[1], largo = Math.hypot(dx, dy);
    const ux = dx / largo, uy = dy / largo, h = 0.35, w = 0.17;
    const base = [hasta[0] - h * ux, hasta[1] - h * uy];
    return [
      { tipo: 'linea', desde, hasta: base, serie },
      { tipo: 'poligono', puntos: [hasta, [base[0] - w * uy, base[1] + w * ux], [base[0] + w * uy, base[1] - w * ux]], solido: true, serie },
    ];
  };

  // Fuentes. Sílabo = F1, F20 y F40 (misma URL). Los números F# son los de la ficha de la unidad.
  const SILABO = { nombre: 'Centro de Educación y Cooperación Lingüística (China), «HSK 考试大纲», sílabo del HSK 3.0 (2025)', url: 'https://hsk.cn-bj.ufileos.com/3.0/新版HSK考试大纲1219.pdf' };
  const CHINGRAM = (ruta, nombre) => ({ nombre: `Universidad Palacký de Olomouc (Chequia), ChinGram: ${nombre} (en inglés)`, url: `https://chingram.upol.cz/grammar/${ruta}` });
  const CHIN_XIAN = CHINGRAM('sequential-structure-with-xian-zai-ranhou-%e5%85%88-%e5%86%8d-%e7%84%b6%e5%90%8e-%e7%84%b6%e5%be%8c-first-then', 'Sentence with xiān… zài/ránhòu… 先…… 再/然后…… «first… then…»');
  const CHIN_GANG = CHINGRAM('time-adverb-gang%e5%88%9a-ganggang-%e5%88%9a%e5%88%9a-gangcai-%e5%88%9a%e6%89%8d-just', 'Time adverb gāng 刚, gānggāng 刚刚, gāngcái 刚才 «just»');
  const CHIN_YOU = CHINGRAM('adverb-you-%e5%8f%88-again', 'Adverb yòu 又 «again»');
  const CHIN_YOU_ZAI = CHINGRAM('comparison-among-the-adverbs-you-%e5%8f%88-zai-%e5%86%8d-and-hai-%e8%bf%98-%e9%82%84', 'Comparison between the adverbs yòu 又, zài 再 and hái 还');
  const CHIN_RANHOU = CHINGRAM('comparison-among-ranhou-%e7%84%b6%e5%90%8e-%e7%84%b6%e5%be%8c-yihou-%e4%bb%a5%e5%90%8e-%e4%bb%a5%e5%be%8c-and-houlai-%e5%90%8e%e6%9d%a5-%e5%be%8c%e4%be%86', 'Comparison between ránhòu 然后, yǐhòu 以后 and hòulái 后来');
  const CHIN_GEN = CHINGRAM('equal-comparisons-with-gen-%e8%b7%9f-with-as-compared-with-yiyang-%e4%b8%80%e6%a0%b7-%e4%b8%80%e6%a8%a3-the-same-identical-alike', 'Equal comparisons with gēn 跟 … yíyàng 一样');
  const CHIN_BI = CHINGRAM('unequal-comparisons-the-comparative-preposition-bi-%e6%af%94-to-compare-with-to', 'Unequal comparisons: the comparative preposition bǐ 比');
  const CHIN_LUGAR = CHINGRAM('location-words', 'Location words');
  const CHIN_YOUYOU = CHINGRAM('coordinative-structure-with-you-you-%e5%8f%88%e5%8f%88-both-and', 'Sentence with yòu… yòu… 又……又…… «both… and…»');
  const CHIN_YIDIANR = CHINGRAM('the-modifier-yidianr-%e4%b8%80%e7%82%b9%e5%84%bf', 'Modifier yìdiǎn(r) 一点(儿) «a bit»');
  const CHIN_ZENYANG = CHINGRAM('interrogative-pronouns-zenmeyang-%e6%80%8e%e4%b9%88%e6%a0%b7-%e6%80%8e%e9%ba%bc%e6%a8%a3-zenyang-%e6%80%8e%e6%a0%b7-%e6%80%8e%e6%a8%a3-how-what-kind-of', 'Interrogative pronouns zěnmeyàng 怎么样 / zěnyàng 怎样');
  const OXFORD_GRAMATICA = { nombre: 'Centre for Teaching Chinese as a Foreign Language, Universidad de Oxford (Reino Unido), Elementary Chinese Grammar 基础汉语语法 (2011, en inglés)', url: 'https://www.ctcfl.ox.ac.uk/media/pages/pdf/lang-work_grammar-database_grammar-database-for-hard-copy.pdf' };
  const MIT_CURSO = { nombre: 'MIT OpenCourseWare (EE. UU.), J. K. Wheatley, Learning Chinese: A Foundation Course in Mandarin (2011, en inglés)', url: 'https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/res21g_003_s_11.pdf' };
  const MSU_CORREO = { nombre: 'Universidad Estatal de Míchigan (EE. UU.), Elementary Chinese II: Lesson 11 Dialogue 2 (en inglés)', url: 'https://openbooks.lib.msu.edu/chs102/chapter/lesson-11-dialogue-2-%e4%b8%80%e5%b0%81%e4%bf%a1/' };
  const MSU_CARTA = { nombre: 'Universidad Estatal de Míchigan (EE. UU.), Elementary Chinese II: Lesson 8 Dialogue 2 (en inglés)', url: 'https://openbooks.lib.msu.edu/chs102/chapter/lesson-8-dialogue-2/' };
  const MSU_RUTA = { nombre: 'Universidad Estatal de Míchigan (EE. UU.), Elementary Chinese II: Lesson 9 Dialogue 1 (en inglés)', url: 'https://openbooks.lib.msu.edu/chs102/chapter/lesson-10-dialogue-1-%e9%97%ae%e8%b7%af/' };
  const LAM_HISTORIA = { nombre: 'Museo Lam de Antropología, Universidad Wake Forest (EE. UU.), History of Chinese New Year (en inglés)', url: 'https://lammuseum.wfu.edu/education/teachers/chinese-new-year/history-of-chinese-new-year/' };
  const LAM_CELEBRAR = { nombre: 'Museo Lam de Antropología, Universidad Wake Forest (EE. UU.), China: Celebrate the New Year (2021, en inglés)', url: 'https://lammuseum.wfu.edu/2021/02/china-celebrate-the-new-year/' };
  const CASE_NUEVO = { nombre: 'Universidad Case Western Reserve (EE. UU.), Research Guides: Lunar New Year (en inglés)', url: 'https://researchguides.case.edu/lunar-new-year' };
  const GOV_OTONO = { nombre: 'Gobierno de China (english.www.gov.cn), Full moon shines on night of Mid-Autumn Festival in China (2024, en inglés)', url: 'https://english.www.gov.cn/news/202409/18/content_WS66ea3067c6d0868f4e8eb0db.html' };
  const CASE_OTONO = { nombre: 'Universidad Case Western Reserve (EE. UU.), Research Guides: Asian Mid-Autumn Festival (en inglés)', url: 'https://researchguides.case.edu/mid-autumn-festival' };
  const ARIZONA_OTONO = { nombre: 'Universidad de Arizona (EE. UU.), Departamento de Estudios de Asia Oriental, Mid-Autumn Festival (2025, en inglés)', url: 'https://eas.arizona.edu/mid-autumn-festival' };
  const MIAMI_PINYIN = { nombre: 'Universidad de Miami (EE. UU.), Interactive Language Resource Center: Chinese keyboard entry (en inglés)', url: 'https://miamioh.edu/cas/academics/centers/ilrc/technical-support/chi-mac-keyboard-entry/index.html' };

  // ------------------------------------------------------------------
  L('La escuela y el trabajo', {
    objetivo: `Contar una rutina de clase o de oficina en orden con ${zh("先", "xiān")}…${zh("再", "zài")}/${zh("然后", "ránhòu")}…, decir que algo acaba de pasar con ${zh("刚", "gāng")} y ${zh("刚才", "gāngcái")}, y usar ${zh("又", "yòu")} para algo que se repitió.`,
    explicacion: `
      <p>Cuando cuentas tu día, casi siempre pones los hechos en fila: primero llegué a clase, después hicimos un ejercicio, al final salí. El chino tiene palabras para ese orden. Esta unidad cierra HSK 3 y enseña una selección de las palabras de nivel 3, no todas; el sílabo completo está en las fuentes. La voz del dispositivo cambia de un aparato a otro, y el pinyin manda.</p>
      ${tabla([
        ['班级', 'bānjí', 'clase, grupo de alumnos'], ['年级', 'niánjí', 'grado escolar'], ['学期', 'xuéqī', 'semestre, periodo escolar'], ['校长', 'xiàozhǎng', 'director de la escuela'],
        ['作业', 'zuòyè', 'tarea'], ['数学', 'shùxué', 'matemáticas'], ['课本', 'kèběn', 'libro de texto'], ['笔记', 'bǐjì', 'apuntes'],
        ['练习', 'liànxí', 'practicar; ejercicio'], ['迟到', 'chídào', 'llegar tarde'], ['办公室', 'bàngōngshì', 'oficina'], ['经理', 'jīnglǐ', 'gerente'],
        ['同事', 'tóngshì', 'compañero de trabajo'], ['开会', 'kāihuì', 'tener una reunión'], ['请假', 'qǐngjià', 'pedir permiso para faltar'], ['刚才', 'gāngcái', 'hace un momento'],
      ])}
      <h3>Contar un día en orden: ${zh("先", "xiān")}…${zh("再", "zài")}…</h3>
      <p>Según ChinGram, de la Universidad Palacký, el patrón ${zh("先", "xiān")}…${zh("再", "zài")}/${zh("然后", "ránhòu")}… sirve para dar una secuencia en orden cronológico: la acción de la primera parte ocurre antes que la de la segunda. ${zh("先", "xiān")} significa «primero» y va antes del primer verbo; ${zh("再", "zài")} o ${zh("然后", "ránhòu")} abren la segunda parte. El ejemplo de ChinGram sirve tal cual: ${zh("妈妈先做午饭，再去休息", "māma xiān zuò wǔfàn, zài qù xiūxi")}, «mamá primero hace el almuerzo y luego va a descansar».</p>
      <p>ChinGram dice que ${zh("再", "zài")} se usa sobre todo para costumbres o para planes que todavía no pasaron, y que ${zh("然后", "ránhòu")} sirve también para hechos ya ocurridos. Frases de ejemplo de la lección: ${zh("我先做作业，再看书", "wǒ xiān zuò zuòyè, zài kàn shū")}, «primero hago la tarea y luego leo», y ${zh("昨天我先上课，然后做作业", "zuótiān wǒ xiān shàngkè, ránhòu zuò zuòyè")}, «ayer primero tuve clase y luego hice la tarea».</p>
      <h3>¿Acaba de pasar? ${zh("刚", "gāng")} y ${zh("刚才", "gāngcái")}</h3>
      <p>ChinGram explica que ${zh("刚", "gāng")} marca un hecho del pasado reciente y que admite un lapso de «reciente» más amplio que ${zh("刚才", "gāngcái")}, que señala un momento muy cercano y suena más coloquial. ${zh("刚", "gāng")} es un adverbio: va justo antes del verbo, como en una frase adaptada de Oxford, ${zh("我刚吃了午饭", "wǒ gāng chī le wǔfàn")}, «acabo de almorzar».</p>
      <p>${zh("刚才", "gāngcái")}, en cambio, es una palabra de tiempo del vocabulario del sílabo, «hace un momento». Por eso ChinGram dice que puede ir al principio de la oración y ${zh("刚", "gāng")} no: ${zh("刚才我没接电话", "gāngcái wǒ méi jiē diànhuà")}, «hace un momento no contesté el teléfono». Para negar algo de hace un momento se usa ${zh("没", "méi")} con ${zh("刚才", "gāngcái")}, no con ${zh("刚", "gāng")} solo. Y con ${zh("就", "jiù")} se subraya que una acción vino enseguida de otra: ${zh("我刚坐下，他就来了", "wǒ gāng zuò xià, tā jiù lái le")}, «apenas me senté, él llegó».</p>
      <h3>Otra vez, y ya pasó: ${zh("又", "yòu")}</h3>
      <p>Para decir «otra vez» hay dos palabras. Según ChinGram, ${zh("又", "yòu")} indica que una acción se repite y que tanto la primera vez como la repetición ya ocurrieron. Si la repetición todavía no ha pasado, se usa ${zh("再", "zài")}, como viste en "Hablar por teléfono". Frases de ejemplo de la lección: ${zh("昨天他迟到了，今天他又迟到了", "zuótiān tā chídào le, jīntiān tā yòu chídào le")}, «ayer llegó tarde y hoy otra vez»; y ${zh("明天我再来", "míngtiān wǒ zài lái")}, «mañana vengo otra vez». Para negar, ${zh("没", "méi")} va detrás de ${zh("又", "yòu")}: ${zh("他昨天没来，今天又没来", "tā zuótiān méi lái, jīntiān yòu méi lái")}.</p>
      <p class="nota"><strong>Trampa común:</strong> decir ${zh("明天我又来", "míngtiān wǒ yòu lái")}. Mañana todavía no pasó, así que va ${zh("再", "zài")}.</p>`,
    ejemplo: `
      <p>Un compañero de oficina quiere contar su mañana. Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Primero ordena lo que hizo: ${zh("我先去办公室，然后开会", "wǒ xiān qù bàngōngshì, ránhòu kāihuì")}. Como ya pasó, usa ${zh("然后", "ránhòu")}.</li>
        <li>Luego explica dónde estaba el jefe hace un momento: ${zh("经理刚才在办公室", "jīnglǐ gāngcái zài bàngōngshì")}. ${zh("刚才", "gāngcái")} abre la frase de tiempo.</li>
        <li>Por último, cuenta que hubo otra reunión igual: ${zh("他昨天开会，今天又开会", "tā zuótiān kāihuì, jīntiān yòu kāihuì")}. Las dos reuniones ya ocurrieron, así que va ${zh("又", "yòu")}.</li>
        <li>Si quisiera hablar de la próxima, diría ${zh("明天再开会", "míngtiān zài kāihuì")}.</li>
      </ol>
      <p>Comprueba: cada ${zh("先", "xiān")} tiene su ${zh("然后", "ránhòu")} o ${zh("再", "zài")}, y ${zh("又", "yòu")} solo aparece cuando las dos veces ya pasaron. Resultado: <span class="resultado">${zh("我先去办公室，然后开会", "wǒ xiān qù bàngōngshì, ránhòu kāihuì")} = «primero fui a la oficina y luego tuve la reunión»</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner ${zh("先", "xiān")} al final de la frase. Va delante del primer verbo.</p>`,
    vidaReal: `
      <p>Estas ideas aparecen todos los días en una escuela o en una oficina:</p>
      <ul>
        <li>Contarle a un amigo, en orden, lo que hiciste en la escuela.</li>
        <li>Decirle a un compañero que acabas de llegar o que acabas de hablar con alguien.</li>
        <li>Avisar a un profesor o a un jefe que necesitas faltar un día.</li>
        <li>Explicar que algo volvió a ocurrir, como una reunión que otra vez empezó tarde.</li>
        <li>Planear lo que harás mañana: primero una cosa y después otra.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «mamá primero hace el almuerzo y luego va a descansar».</p>',
        respuesta: ['妈妈', '先', '做', '午饭', '再', '去', '休息'], pinyin: ['māma', 'xiān', 'zuò', 'wǔfàn', 'zài', 'qù', 'xiūxi'], lang: 'zh-Hans',
        pista: '<p>El sujeto va antes de ' + zh("先", "xiān") + ', y ' + zh("再", "zài") + ' abre la segunda acción.</p>',
        solucion: `<p>${zh("妈妈先做午饭，再去休息", "māma xiān zuò wǔfàn, zài qù xiūxi")}: sujeto, ${zh("先", "xiān")} y la primera acción, ${zh("再", "zài")} y la segunda.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «hoy otra vez llegó tarde» (ayer también llegó tarde). ¿Qué frase usas?</p>',
        opciones: [zh('他今天再迟到', 'tā jīntiān zài chídào'), zh('他今天刚迟到', 'tā jīntiān gāng chídào'), zh('他今天又迟到了', 'tā jīntiān yòu chídào le'), zh('他先今天迟到', 'tā xiān jīntiān chídào')], correcta: 2,
        pista: '<p>Las dos veces ya ocurrieron.</p>',
        solucion: `<p>${zh("他今天又迟到了", "tā jīntiān yòu chídào le")}: ${zh("又", "yòu")} es para una repetición que ya pasó.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «mañana vengo otra vez». ¿Qué frase usas?</p>',
        opciones: [zh('明天我再来', 'míngtiān wǒ zài lái'), zh('明天我又来', 'míngtiān wǒ yòu lái'), zh('明天我刚来', 'míngtiān wǒ gāng lái'), zh('明天我没来', 'míngtiān wǒ méi lái')], correcta: 0,
        pista: '<p>Mañana todavía no ocurrió.</p>',
        solucion: `<p>${zh("明天我再来", "míngtiān wǒ zài lái")}: para una repetición futura, ChinGram indica ${zh("再", "zài")} y no ${zh("又", "yòu")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '刚才我没接电话' },
        sinAudio: '<p>Se dice <strong>gāngcái wǒ méi jiē diànhuà</strong>: gāng es alto y plano; cái sube; wǒ baja y sube; méi sube; jiē es alto y plano; diàn baja; huà baja.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué cuenta la persona?</p>',
        opciones: ['Que contestó el teléfono hace un momento', 'Que no contestó el teléfono hace un momento', 'Que no contestará el teléfono mañana', 'Que llamó a su jefe'], correcta: 1,
        pista: '<p>Fíjate en la palabra de tiempo del principio y en ' + zh("没", "méi") + '.</p>',
        solucion: `<p>Se oye ${zh("刚才我没接电话", "gāngcái wǒ méi jiē diànhuà")}: «hace un momento no contesté el teléfono».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("迟到")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['chí dào'],
        pista: '<p>La primera sílaba sube y la segunda baja.</p>',
        solucion: `<p>${zh("迟到", "chídào")}: <strong>chí dào</strong>.</p>` },
      { tipo: 'opciones', enunciado: `<p>Un empleado le dice a su jefe ${zh("我想请假", "wǒ xiǎng qǐngjià")}. ¿Qué quiere?</p>`,
        opciones: ['Empezar una reunión', 'Hacer una pregunta', 'Llegar más temprano', 'Pedir permiso para faltar'], correcta: 3,
        pista: '<p>La tabla de la lección traduce ' + zh("请假", "qǐngjià") + '.</p>',
        solucion: `<p>${zh("请假", "qǐngjià")} es «pedir permiso para faltar»; ${zh("我想请假", "wǒ xiǎng qǐngjià")} es «quiero pedir permiso para faltar».</p>` },
    ],
    fuentes: [SILABO, CHIN_XIAN, CHIN_GANG, CHIN_YOU, CHIN_YOU_ZAI, OXFORD_GRAMATICA],
  });

  // ------------------------------------------------------------------
  // Rosa de los vientos de la lección 2: cuatro flechas desde el centro y cuatro direcciones compuestas.
  const ROSA = G({
    x: [0, 10], y: [0, 10], proporcional: true, ejes: false,
    descripcion: 'Rosa de los vientos con cuatro flechas que salen de un punto central. La flecha de arriba apunta al norte y lleva el pinyin «běi». La de la derecha apunta al este y lleva «dōng». La de abajo apunta al sur y lleva «nán». La de la izquierda apunta al oeste y lleva «xī». En las cuatro esquinas están las direcciones compuestas: arriba a la derecha «dōngběi», noreste; arriba a la izquierda «xīběi», noroeste; abajo a la derecha «dōngnán», sureste; abajo a la izquierda «xīnán», suroeste.',
    figuras: [
      ...flecha([5, 5], [5, 7.8], 0), ...flecha([5, 5], [7.8, 5], 1), ...flecha([5, 5], [5, 2.2], 2), ...flecha([5, 5], [2.2, 5], 1),
      txt(5, 9.3, 'běi'), txt(5, 8.5, 'norte'),
      txt(9.0, 5.5, 'dōng'), txt(9.0, 4.7, 'este'),
      txt(5, 1.3, 'nán'), txt(5, 0.5, 'sur'),
      txt(1.0, 5.5, 'xī'), txt(1.0, 4.7, 'oeste'),
      txt(8.2, 8.8, 'dōngběi'), txt(8.2, 8.0, 'noreste'),
      txt(1.8, 8.8, 'xīběi'), txt(1.8, 8.0, 'noroeste'),
      txt(8.2, 2.0, 'dōngnán'), txt(8.2, 1.2, 'sureste'),
      txt(1.8, 2.0, 'xīnán'), txt(1.8, 1.2, 'suroeste'),
    ],
  });

  L('Planear un viaje', {
    objetivo: `Pedir y dar direcciones con ${zh("东", "dōng")}, ${zh("南", "nán")}, ${zh("西", "xī")} y ${zh("北", "běi")}, comparar dos opciones de viaje con ${zh("跟", "gēn")}…${zh("一样", "yíyàng")} y ${zh("比", "bǐ")}…${zh("更", "gèng")}, y decir «además» o «excepto» con ${zh("除了", "chúle")}…${zh("以外", "yǐwài")}.`,
    explicacion: `
      <p>Antes de un viaje te haces muchas preguntas: ¿qué hotel conviene?, ¿hacia dónde queda la estación?, ¿a qué hora sale el tren? Esta lección junta palabras de viaje con tres herramientas: los puntos cardinales, dos formas de comparar y una manera de decir «además» o «excepto».</p>
      ${tabla([
        ['行李', 'xíngli', 'equipaje'], ['地图', 'dìtú', 'mapa'], ['附近', 'fùjìn', 'cerca, alrededores'], ['宾馆', 'bīnguǎn', 'hotel'],
        ['高铁', 'gāotiě', 'tren de alta velocidad'], ['起飞', 'qǐfēi', 'despegar'], ['检票', 'jiǎnpiào', 'revisar el boleto'], ['方向', 'fāngxiàng', 'dirección'],
        ['东', 'dōng', 'este'], ['南', 'nán', 'sur'], ['西', 'xī', 'oeste'], ['北', 'běi', 'norte'],
        ['路口', 'lùkǒu', 'cruce de calles'], ['游客', 'yóukè', 'turista'], ['晚点', 'wǎndiǎn', 'llegar con retraso'],
      ])}
      <h3>Los cuatro puntos cardinales</h3>
      <p>Mira la rosa de los vientos. ChinGram, de la Universidad Palacký, lista ${zh("东", "dōng")}, ${zh("南", "nán")}, ${zh("西", "xī")} y ${zh("北", "běi")} como palabras de lugar, y avisa de que casi no se usan solas al hablar: llevan detrás ${zh("边", "biān")} o ${zh("面", "miàn")}, como ${zh("东边", "dōngbiān")}, «el lado este». En una dirección compuesta va primero el eje este-oeste y después el norte-sur: ${zh("东北", "dōngběi")} es «noreste» y ${zh("西南", "xīnán")} es «suroeste». Como simplificación de la lección, es el orden contrario al del español, donde el norte va primero. Frases de ejemplo de la lección: ${zh("宾馆在地图的北边", "bīnguǎn zài dìtú de běibiān")}, «el hotel está al norte en el mapa», y ${zh("这儿附近有宾馆吗", "zhèr fùjìn yǒu bīnguǎn ma")}, «¿hay un hotel cerca de aquí?».</p>
      ${ROSA}
      <h3>Decir que dos cosas son iguales: ${zh("跟", "gēn")}…${zh("一样", "yíyàng")}</h3>
      <p>Según ChinGram, la estructura A ${zh("跟", "gēn")} B ${zh("一样", "yíyàng")} dice que A es igual que B. Si quieres decir en qué se parecen, pones un adjetivo después de ${zh("一样", "yíyàng")}. Los ejemplos de ChinGram sirven tal cual: ${zh("你的书跟我的一样", "nǐ de shū gēn wǒ de yíyàng")}, «tu libro es igual que el mío», y ${zh("弟弟跟哥哥一样高", "dìdi gēn gēge yíyàng gāo")}, «el hermano menor es tan alto como el mayor». Se niega con ${zh("不", "bù")} antes de ${zh("一样", "yíyàng")}: ${zh("今天跟昨天不一样", "jīntiān gēn zuótiān bù yíyàng")}. Aquí no caben ${zh("很", "hěn")}, ${zh("非常", "fēicháng")} ni ${zh("太", "tài")}.</p>
      <h3>Decir que uno es todavía más: ${zh("比", "bǐ")}…${zh("更", "gèng")}</h3>
      <p>Para decir que A tiene más de algo que B, ChinGram pone ${zh("比", "bǐ")} entre A y B, y el adjetivo después de B. Con ${zh("比", "bǐ")} tampoco se usan ${zh("很", "hěn")}, ${zh("非常", "fēicháng")} ni ${zh("太", "tài")}; sí ${zh("更", "gèng")} (o ${zh("还", "hái")}), que dice «todavía más» como un dato neutro. El ejemplo de ChinGram es ${zh("弟弟比哥哥更高", "dìdi bǐ gēge gèng gāo")}. Una frase de la lección: ${zh("那家宾馆比这家更近", "nà jiā bīnguǎn bǐ zhè jiā gèng jìn")}, «ese hotel queda más cerca que este».</p>
      <h3>Además o excepto: ${zh("除了", "chúle")}…${zh("以外", "yǐwài")}</h3>
      <p>La guía de Oxford, la única fuente que consultamos para este punto, dice que después de la parte con ${zh("除了", "chúle")}…${zh("以外", "yǐwài")} pueden ir ${zh("还", "hái")}, ${zh("也", "yě")} o ${zh("都", "dōu")}. Con ${zh("还", "hái")} o ${zh("也", "yě")} significa «además»; con ${zh("都", "dōu")}, «excepto». Frases de ejemplo de la lección: ${zh("除了汉语以外，我还学数学", "chúle hànyǔ yǐwài, wǒ hái xué shùxué")}, «además del chino, también estudio matemáticas», y ${zh("除了他以外，大家都来了", "chúle tā yǐwài, dàjiā dōu lái le")}, «todos vinieron menos él». Para saber cuál es, mira el adverbio que va después de la coma.</p>
      <p>Un repaso rápido: como en "Transporte y direcciones", ${zh("离", "lí")} va entre dos lugares: ${zh("宾馆离机场很近", "bīnguǎn lí jīchǎng hěn jìn")}.</p>
      <p class="nota"><strong>Trampa común:</strong> decir ${zh("这家比那家很贵", "zhè jiā bǐ nà jiā hěn guì")}. Con ${zh("比", "bǐ")} no va ${zh("很", "hěn")}; se dice ${zh("这家比那家更贵", "zhè jiā bǐ nà jiā gèng guì")}.</p>`,
    ejemplo: `
      <p>Ana elige un hotel para un viaje y mira el mapa. Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Mira qué tan lejos está del aeropuerto: ${zh("这家宾馆离机场很近", "zhè jiā bīnguǎn lí jīchǎng hěn jìn")}.</li>
        <li>Dice dónde queda el otro hotel: ${zh("那家在这家的东边", "nà jiā zài zhè jiā de dōngbiān")}. Usa ${zh("边", "biān")} detrás de ${zh("东", "dōng")}.</li>
        <li>Compara el precio: ${zh("这家跟那家一样贵", "zhè jiā gēn nà jiā yíyàng guì")}. Como cuestan igual, no usa ${zh("很", "hěn")}.</li>
        <li>Compara la distancia: ${zh("那家比这家更近", "nà jiā bǐ zhè jiā gèng jìn")}. El adjetivo va después de B.</li>
        <li>Anota qué más hará: ${zh("除了宾馆以外，我还买高铁票", "chúle bīnguǎn yǐwài, wǒ hái mǎi gāotiě piào")}, con ${zh("还", "hái")}, que significa «además».</li>
      </ol>
      <p>Comprueba: el adjetivo está siempre al final y ninguna comparación lleva ${zh("很", "hěn")}. Resultado: <span class="resultado">${zh("那家比这家更近", "nà jiā bǐ zhè jiā gèng jìn")} = «el otro hotel queda más cerca»</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner el adjetivo antes de B, como ${zh("那家比更近这家", "nà jiā bǐ gèng jìn zhè jiā")}. Va al final.</p>`,
    vidaReal: `
      <p>Al planear un viaje a un lugar donde se habla chino, estas ideas sirven mucho:</p>
      <ul>
        <li>Preguntar si hay un hotel cerca y entender en qué dirección queda.</li>
        <li>Decir que dos boletos cuestan lo mismo, o que uno es más barato que otro.</li>
        <li>Leer un aviso que dice que un tren sale con retraso.</li>
        <li>Contar qué llevas además de la maleta, o decir que todos viajan menos una persona.</li>
        <li>Seguir en un mapa una indicación como «al noreste de la estación».</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál frase dice «tu libro es igual que el mío»?</p>',
        opciones: [zh('你的书比我的一样', 'nǐ de shū bǐ wǒ de yíyàng'), zh('你的书跟我的一样', 'nǐ de shū gēn wǒ de yíyàng'), zh('你的书很跟我的一样', 'nǐ de shū hěn gēn wǒ de yíyàng'), zh('你的书我的跟一样', 'nǐ de shū wǒ de gēn yíyàng')], correcta: 1,
        pista: '<p>La estructura es A ' + zh("跟", "gēn") + ' B ' + zh("一样", "yíyàng") + '.</p>',
        solucion: `<p>${zh("你的书跟我的一样", "nǐ de shū gēn wǒ de yíyàng")}: ${zh("跟", "gēn")} va entre A y B, y ${zh("一样", "yíyàng")} cierra.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «el hermano menor es tan alto como el mayor».</p>',
        respuesta: ['弟弟', '跟', '哥哥', '一样', '高'], pinyin: ['dìdi', 'gēn', 'gēge', 'yíyàng', 'gāo'], lang: 'zh-Hans',
        pista: '<p>El adjetivo va después de ' + zh("一样", "yíyàng") + '.</p>',
        solucion: `<p>${zh("弟弟跟哥哥一样高", "dìdi gēn gēge yíyàng gāo")}: A, ${zh("跟", "gēn")}, B, ${zh("一样", "yíyàng")} y el adjetivo.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «hoy hace más frío que ayer».</p>',
        respuesta: ['今天', '比', '昨天', '更', '冷'], pinyin: ['jīntiān', 'bǐ', 'zuótiān', 'gèng', 'lěng'], lang: 'zh-Hans',
        pista: '<p>' + zh("比", "bǐ") + ' va entre A y B; ' + zh("更", "gèng") + ' va antes del adjetivo.</p>',
        solucion: `<p>${zh("今天比昨天更冷", "jīntiān bǐ zuótiān gèng lěng")}: A, ${zh("比", "bǐ")}, B, ${zh("更", "gèng")} y el adjetivo.</p>` },
      { tipo: 'opciones', escucha: { voz: '除了他以外，大家都来了' },
        sinAudio: '<p>Se dice <strong>chúle tā yǐwài, dàjiā dōu lái le</strong>: chú sube; le es neutro; tā es alto y plano; yǐ baja y sube; wài baja; dà baja; jiā es alto y plano; dōu es alto y plano; lái sube; le es neutro.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué cuenta la persona?</p>',
        opciones: ['Que todos vinieron menos él', 'Que él vino además de los demás', 'Que nadie vino', 'Que solo él vino'], correcta: 0,
        pista: '<p>Fíjate en la palabra que va después de la coma.</p>',
        solucion: `<p>Se oye ${zh("除了他以外，大家都来了", "chúle tā yǐwài, dàjiā dōu lái le")}: con ${zh("都", "dōu")} significa «excepto», es decir, todos vinieron menos él.</p>` },
      { tipo: 'opciones', enunciado: `<p>Mira la rosa de los vientos. ¿Qué dirección es ${zh("东北", "dōngběi")}?</p>`,
        opciones: ['Sureste', 'Noroeste', 'Noreste', 'Suroeste'], correcta: 2,
        pista: '<p>Primero va el eje este-oeste y después el norte-sur.</p>',
        solucion: `<p>${zh("东北", "dōngběi")} junta ${zh("东", "dōng")}, este, y ${zh("北", "běi")}, norte: es el noreste.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("高铁")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['gāo tiě'],
        pista: '<p>La primera sílaba es alta y plana; la segunda baja y sube.</p>',
        solucion: `<p>${zh("高铁", "gāotiě")}: <strong>gāo tiě</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_GEN, CHIN_BI, CHIN_LUGAR, OXFORD_GRAMATICA],
  });

  // ------------------------------------------------------------------
  L('Festividades y cultura china', {
    objetivo: `Contar los datos básicos del Año Nuevo chino y de la Fiesta de Medio Otoño, recibir y ser recibido como invitado, dar una opinión con ${zh("对", "duì")}…${zh("来说", "lái shuō")} y subir el grado de un adjetivo con ${zh("极了", "jíle")}.`,
    explicacion: `
      <p>Imagina que una amiga china te invita a su casa en una fiesta. Querrías saber qué se celebra, cómo agradecer la invitación y cómo decir que algo te parece estupendo. Esta lección trae dos fiestas tradicionales, con datos de fuentes, y dos estructuras para opinar y para subir el grado de un adjetivo.</p>
      ${tabla([
        ['节日', 'jiérì', 'día de fiesta'], ['过节', 'guòjié', 'celebrar una fiesta'], ['新年', 'xīnnián', 'año nuevo'], ['文化', 'wénhuà', 'cultura'],
        ['习惯', 'xíguàn', 'costumbre; acostumbrarse'], ['欢迎', 'huānyíng', 'dar la bienvenida'], ['客人', 'kèrén', 'invitado, visitante'], ['请客', 'qǐngkè', 'invitar, convidar'],
        ['做客', 'zuòkè', 'ir de visita como invitado'], ['月亮', 'yuèliang', 'luna'], ['糖', 'táng', 'azúcar, dulce'], ['世界', 'shìjiè', 'mundo'],
        ['国家', 'guójiā', 'país'], ['语言', 'yǔyán', 'idioma'], ['关系', 'guānxì', 'relación'],
      ])}
      <h3>Dos fiestas tradicionales</h3>
      <p>El tema «cultura y tradición» del sílabo de nivel 3 incluye las fiestas tradicionales y sus costumbres. Estos son los datos de dos de ellas.</p>
      ${cuadro(['Fiesta', 'Cuándo', 'Costumbres'], [
        ['Año Nuevo chino', 'Primer día del primer mes lunar; entre el 21 de enero y el 20 de febrero, según el Museo Lam', 'Lanzar petardos, visitar a familiares y amigos, comer dumplings (' + zh("饺子", "jiǎozi") + ') y dar sobres rojos'],
        ['Fiesta de Medio Otoño', 'Día 15 del octavo mes lunar; en 2024 fue el 17 de septiembre', 'Reunir a la familia, mirar la luna llena (' + zh("月亮", "yuèliang") + ') y compartir pasteles de luna'],
      ])}
      <p>Las fechas siguen el calendario chino, no el gregoriano, y por eso cambian cada año. Según el Museo Lam, el Año Nuevo cae en la segunda luna nueva después del solsticio de invierno; allí también se le llama Festival de Primavera, aunque sea invierno. Según Case Western Reserve, los mayores dan sobres rojos con «dinero de la suerte». Sobre Medio Otoño, el gobierno de China dice que las familias se reúnen para marcar la cosecha, y la Universidad de Arizona añade que la luna está en su punto más lleno. Frase de ejemplo de la lección: ${zh("我们一起看月亮", "wǒmen yìqǐ kàn yuèliang")}, «miramos juntos la luna».</p>
      <h3>Dar una opinión: ${zh("对", "duì")}…${zh("来说", "lái shuō")}</h3>
      <p>Una misma cosa puede ser fácil para uno y difícil para otro. MIT glosa ${zh("对", "duì")} + persona + ${zh("来说", "lái shuō")} como «en tu caso; para ti». Lo usa en un diálogo sobre un precio: para unos son solo unas comidas, pero para quien habla es muy importante. La persona va entre ${zh("对", "duì")} y ${zh("来说", "lái shuō")}, y después viene la opinión. Frases de ejemplo de la lección: ${zh("对孩子来说，糖很好吃", "duì háizi lái shuō, táng hěn hǎochī")}, «para los niños, el dulce es muy rico», y ${zh("对我来说，数学不难", "duì wǒ lái shuō, shùxué bù nán")}, «para mí, las matemáticas no son difíciles».</p>
      <p>El sílabo lista también ${zh("在", "zài")}…${zh("看来", "kànlái")}, otra forma fija para opinar. No tenemos una fuente que la explique, así que aquí solo la mencionamos.</p>
      <h3>Subir el grado: ${zh("极了", "jíle")}</h3>
      <p>Para decir «extremadamente», MIT presenta ${zh("极了", "jíle")} como un sufijo que va directamente después del adjetivo y puede seguir a casi cualquiera. MSU da la estructura: sujeto + adjetivo + ${zh("极了", "jíle")}. Ejemplos de MSU: ${zh("夏天热极了", "xiàtiān rè jíle")}, «el verano es calurosísimo», y ${zh("秋天凉快极了", "qiūtiān liángkuai jíle")}, «el otoño es fresquísimo». MIT añade ${zh("好极了", "hǎo jíle")}, «excelente». Como simplificación de la lección, ${zh("极了", "jíle")} ya trae el grado y no lo combinamos con ${zh("很", "hěn")}.</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("极了", "jíle")} antes del adjetivo, como ${zh("极了热", "jíle rè")}. Va siempre después.</p>`,
    ejemplo: `
      <p>Una amiga invita a Ana a su casa por la Fiesta de Medio Otoño. Veamos qué dicen, paso a paso.</p>
      <ol class="pasos-ej">
        <li>Al llegar, la amiga la recibe: ${zh("欢迎你来我家做客", "huānyíng nǐ lái wǒ jiā zuòkè")}. Con ${zh("做客", "zuòkè")} dice que Ana viene como invitada.</li>
        <li>Salen al patio y miran el cielo: ${zh("我们一起看月亮", "wǒmen yìqǐ kàn yuèliang")}.</li>
        <li>Ana da su opinión: ${zh("对我来说，月亮好看极了", "duì wǒ lái shuō, yuèliang hǎokàn jíle")}. Primero va la persona entre ${zh("对", "duì")} y ${zh("来说", "lái shuō")}, y luego la opinión.</li>
        <li>Para terminar, la amiga dice que hoy invita ella: ${zh("今天我请客", "jīntiān wǒ qǐngkè")}.</li>
      </ol>
      <p>Comprueba: ${zh("极了", "jíle")} está pegado al final del adjetivo ${zh("好看", "hǎokàn")}. Resultado: <span class="resultado">${zh("月亮好看极了", "yuèliang hǎokàn jíle")} = «la luna se ve hermosísima»</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir ${zh("对来说我", "duì lái shuō wǒ")}. La persona va en medio.</p>`,
    vidaReal: `
      <p>Estas ideas sirven cuando conoces gente de otros países y otras culturas:</p>
      <ul>
        <li>Agradecer una invitación a casa de alguien y entender que te dan la bienvenida.</li>
        <li>Preguntar a un compañero qué se celebra en su país y qué se come ese día.</li>
        <li>Decir cómo ve algo cada persona: lo que es fácil para ti puede ser difícil para otra.</li>
        <li>Contar que algo te parece excelente o carísimo con una sola palabra al final.</li>
        <li>Entender por qué una fiesta cambia de fecha cada año.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("对孩子来说，糖很好吃", "duì háizi lái shuō, táng hěn hǎochī")}?</p>`,
        opciones: ['Los niños no comen dulces', 'El dulce es caro para los niños', 'Para los niños, el dulce es muy rico', 'Los niños hacen dulces'], correcta: 2,
        pista: '<p>La persona entre ' + zh("对", "duì") + ' y ' + zh("来说", "lái shuō") + ' es de quien es la opinión.</p>',
        solucion: `<p>${zh("对孩子来说", "duì háizi lái shuō")} es «para los niños»; la opinión es que el dulce es muy rico.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «para mí, las matemáticas son difíciles».</p>',
        respuesta: ['对', '我', '来', '说', '数学', '很', '难'], pinyin: ['duì', 'wǒ', 'lái', 'shuō', 'shùxué', 'hěn', 'nán'], lang: 'zh-Hans',
        alternativas: [['数学', '对', '我', '来', '说', '很', '难']],
        pista: '<p>Primero va ' + zh("对", "duì") + ', luego la persona, y después ' + zh("来说", "lái shuō") + '.</p>',
        solucion: `<p>${zh("对我来说，数学很难", "duì wǒ lái shuō, shùxué hěn nán")}: la persona va entre ${zh("对", "duì")} y ${zh("来说", "lái shuō")}, y después la opinión.</p>` },
      { tipo: 'opciones', enunciado: '<p>¿Cuál frase dice «el verano es calurosísimo»?</p>',
        opciones: [zh('夏天极了热', 'xiàtiān jíle rè'), zh('夏天很极了热', 'xiàtiān hěn jíle rè'), zh('夏天热了极', 'xiàtiān rè le jí'), zh('夏天热极了', 'xiàtiān rè jíle')], correcta: 3,
        pista: '<p>MSU: sujeto + adjetivo + ' + zh("极了", "jíle") + '.</p>',
        solucion: `<p>${zh("夏天热极了", "xiàtiān rè jíle")}: ${zh("极了", "jíle")} va después del adjetivo ${zh("热", "rè")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>Según el gobierno de China y las guías de las universidades, ¿cuándo se celebra la Fiesta de Medio Otoño?</p>',
        opciones: ['El primer día del primer mes lunar', 'El día 15 del octavo mes lunar', 'El día 15 del primer mes lunar', 'El 21 de diciembre'], correcta: 1,
        pista: '<p>Mira la tabla de fiestas de la lección.</p>',
        solucion: '<p>Se celebra el día 15 del octavo mes lunar. En 2024 fue el 17 de septiembre.</p>' },
      { tipo: 'opciones', escucha: { voz: '欢迎你来我家做客' },
        sinAudio: '<p>Se dice <strong>huānyíng nǐ lái wǒ jiā zuòkè</strong>: huān es alto y plano; yíng sube; nǐ baja y sube; lái sube; wǒ baja y sube; jiā es alto y plano; zuò baja; kè baja.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué te dicen?</p>',
        opciones: ['Te dan la bienvenida a su casa como invitado', 'Te piden que pagues la cuenta', 'Se despiden de ti', 'Te preguntan dónde vives'], correcta: 0,
        pista: '<p>La primera palabra es de la tabla y la última también.</p>',
        solucion: `<p>Se oye ${zh("欢迎你来我家做客", "huānyíng nǐ lái wǒ jiā zuòkè")}: «bienvenido a mi casa como invitado».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("月亮")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['yuè liang'],
        pista: '<p>La primera sílaba baja; la segunda es neutra y no lleva marca.</p>',
        solucion: `<p>${zh("月亮", "yuèliang")}: <strong>yuè liang</strong>.</p>` },
    ],
    fuentes: [SILABO, LAM_HISTORIA, LAM_CELEBRAR, CASE_NUEVO, GOV_OTONO, CASE_OTONO, ARIZONA_OTONO, MIT_CURSO, MSU_CORREO],
  });

  // ------------------------------------------------------------------
  // Texto de lectura de la lección 4 (propio, con palabras permitidas): una frase por línea.
  const TEXTO_LECTURA = [
    ['这个周末，学校有晚会。', 'zhège zhōumò, xuéxiào yǒu wǎnhuì.'],
    ['晚会在体育馆，晚上七点开始。', 'wǎnhuì zài tǐyùguǎn, wǎnshang qī diǎn kāishǐ.'],
    ['三年级的学生先表演，然后五年级的学生表演。', 'sān niánjí de xuéshēng xiān biǎoyǎn, ránhòu wǔ niánjí de xuéshēng biǎoyǎn.'],
    ['最后，校长跟大家一起唱歌。', 'zuìhòu, xiàozhǎng gēn dàjiā yìqǐ chànggē.'],
    ['校长说：欢迎大家来参加。', 'xiàozhǎng shuō: huānyíng dàjiā lái cānjiā.'],
  ];
  const LECTURA_HTML = `<ol class="pasos-ej">${TEXTO_LECTURA.map(([h, p]) => `<li>${zh(h, p)}</li>`).join('')}</ol>`;

  L('Leer textos cortos', {
    objetivo: `Leer un texto corto en chino buscando quién, cuándo, dónde y qué; seguir el orden de un relato con ${zh("先", "xiān")}, ${zh("然后", "ránhòu")}, ${zh("后来", "hòulái")} y ${zh("最后", "zuìhòu")}; y distinguir ${zh("认为", "rènwéi")} de ${zh("以为", "yǐwéi")}.`,
    explicacion: `
      <p>Cuando lees una noticia no entiendes todo de golpe: buscas quién, cuándo, dónde y qué pasó. Con un texto en chino pasa igual, y las palabras de la tabla te ayudan a reconocer las partes. Para leer mejor en general, mira en Lectura la lección "Idea principal e ideas secundarias".</p>
      ${tabla([
        ['新闻', 'xīnwén', 'noticia'], ['报纸', 'bàozhǐ', 'periódico'], ['段', 'duàn', 'párrafo (clasificador)'], ['页', 'yè', 'página (clasificador)'],
        ['了解', 'liǎojiě', 'conocer, entender bien'], ['主要', 'zhǔyào', 'principal'], ['重要', 'zhòngyào', 'importante'], ['回答', 'huídá', 'responder'],
        ['选择', 'xuǎnzé', 'elegir'], ['认为', 'rènwéi', 'opinar que'], ['以为', 'yǐwéi', 'creer (y equivocarse)'], ['后来', 'hòulái', 'más tarde, después'],
        ['最后', 'zuìhòu', 'al final'], ['然后', 'ránhòu', 'y luego'], ['先', 'xiān', 'primero'],
      ])}
      <h3>Un texto para leer</h3>
      <p>Este texto es de la lección y usa solo palabras que ya conoces: una noticia sencilla de la escuela. Léelo y busca los cuatro datos.</p>
      ${LECTURA_HTML}
      <h3>Palabras que ordenan un relato</h3>
      <p>Ya viste ${zh("先", "xiān")} en "La escuela y el trabajo". Según ChinGram, ${zh("然后", "ránhòu")} une dos acciones en una secuencia clara, va al principio de la segunda parte y sirve para el pasado, el presente y el futuro. ${zh("后来", "hòulái")} dice que la segunda acción ocurrió más tarde, a menudo tras un tiempo, y solo vale para hechos ya pasados; MIT dice lo mismo: solo al contar el pasado. Frases de ejemplo de la lección: ${zh("我先去图书馆，然后去教室", "wǒ xiān qù túshūguǎn, ránhòu qù jiàoshì")}, y ${zh("我先去图书馆，后来去教室", "wǒ xiān qù túshūguǎn, hòulái qù jiàoshì")}, donde ya pasó un rato. MSU da un ejemplo del pasado: ${zh("开始他不高兴，后来他听了一点儿音乐，就高兴了", "kāishǐ tā bù gāoxìng, hòulái tā tīng le yìdiǎnr yīnyuè, jiù gāoxìng le")}, «al principio estaba triste y después, al escuchar música, se alegró».</p>
      <p>Para ${zh("最后", "zuìhòu")} solo encontramos un diálogo de MSU que da indicaciones en orden. Con esa idea, una frase de la lección: ${zh("你先坐火车，然后坐地铁，最后走五分钟就到了", "nǐ xiān zuò huǒchē, ránhòu zuò dìtiě, zuìhòu zǒu wǔ fēnzhōng jiù dào le")}.</p>
      <h3>Cómo se ve algo: ${zh("看起来", "kàn qǐlái")}</h3>
      <p>MIT usa ${zh("看起来", "kàn qǐlái")} para describir una apariencia: una ruta que «parece corta» resulta lejana al recorrerla. Frase de ejemplo: ${zh("这个宾馆在地图上看起来很近", "zhège bīnguǎn zài dìtú shàng kàn qǐlái hěn jìn")}, «en el mapa, este hotel parece cerca». El sílabo lista también ${zh("看上去", "kàn shàngqù")}; aquí solo lo mencionamos.</p>
      <h3>Pensar y creer: ${zh("认为", "rènwéi")} y ${zh("以为", "yǐwéi")}</h3>
      <p>MIT glosa ${zh("认为", "rènwéi")} como «pensar que, opinar que». ${zh("以为", "yǐwéi")}, en cambio, es creer algo que luego resulta falso. Frases de ejemplo: ${zh("我认为这个新闻很重要", "wǒ rènwéi zhège xīnwén hěn zhòngyào")}, «opino que esta noticia es importante», y, adaptada de MIT, ${zh("对不起，我以为你是我的同学", "duìbuqǐ, wǒ yǐwéi nǐ shì wǒ de tóngxué")}, «perdón, creí que eras mi compañero».</p>
      <h3>Pedir que te confirmen: ${zh("不是", "bù shì")}…${zh("吗", "ma")}</h3>
      <p>MIT da la pregunta negativa ${zh("那不是你的护照吗", "nà bù shì nǐ de hùzhào ma")}, «¿ese no es tu pasaporte?». Como simplificación de la lección, sirve para pedir que el otro confirme lo que tú ya sospechas. En el pinyin de la unidad, ${zh("不", "bù")} se escribe con su tono de diccionario; ante ${zh("是", "shì")} suena ${zh("", "bú", { voz: '不' })}.</p>
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("后来", "hòulái")} para un plan de mañana. Para el futuro va ${zh("然后", "ránhòu")}.</p>`,
    ejemplo: `
      <p>Ana lee la noticia de arriba y quiere responder: «¿quién se presenta primero?». Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Lee la primera frase y saca qué y cuándo: hay una fiesta en la escuela este fin de semana.</li>
        <li>Busca dónde en la segunda: ${zh("在体育馆", "zài tǐyùguǎn")}, en el gimnasio, y la hora es ${zh("晚上七点", "wǎnshang qī diǎn")}.</li>
        <li>La pregunta habla de orden, así que busca ${zh("先", "xiān")}: en la tercera frase, ${zh("三年级的学生先表演", "sān niánjí de xuéshēng xiān biǎoyǎn")}.</li>
        <li>Después viene ${zh("然后", "ránhòu")}, que abre a los de quinto grado, y al final ${zh("最后", "zuìhòu")} canta el director con todos.</li>
      </ol>
      <p>Comprueba: la respuesta sale del texto, no de lo que Ana supone. Resultado: <span class="resultado">primero se presentan los alumnos de tercer grado, ${zh("三年级", "sān niánjí")}</span>.</p>
      <p class="nota"><strong>Error común:</strong> responder con lo que uno cree y no con lo que dice el texto.</p>`,
    vidaReal: `
      <p>Leer en otro idioma pide estas habilidades:</p>
      <ul>
        <li>Entender el aviso de una escuela sobre cuándo y dónde es un evento.</li>
        <li>Hojear un periódico o una página de noticias y quedarte con lo más importante.</li>
        <li>Contar una historia siguiendo el orden: primero, luego, más tarde y al final.</li>
        <li>Decir si crees algo o si te habías equivocado al pensarlo.</li>
        <li>Preguntar a alguien si estás en lo cierto antes de actuar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según el texto de la lección, ¿a qué hora empieza la fiesta?</p>',
        opciones: ['A las siete de la mañana', 'A las cinco de la tarde', 'A las siete de la noche', 'A las tres de la tarde'], correcta: 2,
        pista: '<p>Busca la frase que dice dónde es la fiesta: ahí también está la hora.</p>',
        solucion: `<p>La segunda frase dice ${zh("晚上七点开始", "wǎnshang qī diǎn kāishǐ")}: empieza a las siete de la noche.</p>` },
      { tipo: 'opciones', enunciado: '<p>Según el texto, ¿quién canta con todos al final?</p>',
        opciones: ['El director de la escuela', 'Los alumnos de tercer grado', 'Los alumnos de quinto grado', 'Un periodista'], correcta: 0,
        pista: '<p>Busca la palabra que significa «al final».</p>',
        solucion: `<p>La cuarta frase dice ${zh("最后，校长跟大家一起唱歌", "zuìhòu, xiàozhǎng gēn dàjiā yìqǐ chànggē")}: al final, el director canta con todos.</p>` },
      { tipo: 'opciones', enunciado: '<p>Cuentas un plan para mañana: primero la tarea y luego un libro. ¿Cuál frase está bien?</p>',
        opciones: [zh('明天我先做作业，后来看书', 'míngtiān wǒ xiān zuò zuòyè, hòulái kàn shū'), zh('明天我先做作业，然后看书', 'míngtiān wǒ xiān zuò zuòyè, ránhòu kàn shū'), zh('明天我最后做作业，先看书', 'míngtiān wǒ zuìhòu zuò zuòyè, xiān kàn shū'), zh('明天我做作业先，看书然后', 'míngtiān wǒ zuò zuòyè xiān, kàn shū ránhòu')], correcta: 1,
        pista: '<p>' + zh("后来", "hòulái") + ' solo vale para hechos que ya pasaron.</p>',
        solucion: `<p>${zh("然后", "ránhòu")} sirve para el futuro; ${zh("后来", "hòulái")} solo para el pasado.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «opino que esta noticia es importante».</p>',
        respuesta: ['我', '认为', '这个', '新闻', '很', '重要'], pinyin: ['wǒ', 'rènwéi', 'zhège', 'xīnwén', 'hěn', 'zhòngyào'], lang: 'zh-Hans',
        alternativas: [['这个', '新闻', '我', '认为', '很', '重要']],
        pista: '<p>' + zh("认为", "rènwéi") + ' va después del sujeto y abre la opinión.</p>',
        solucion: `<p>${zh("我认为这个新闻很重要", "wǒ rènwéi zhège xīnwén hěn zhòngyào")}: sujeto, ${zh("认为", "rènwéi")} y la opinión.</p>` },
      { tipo: 'opciones', escucha: { voz: '对不起，我以为你是我的同学' },
        sinAudio: '<p>Se dice <strong>duìbuqǐ, wǒ yǐwéi nǐ shì wǒ de tóngxué</strong>: duì baja; bu es neutro; qǐ baja y sube; wǒ baja y sube; yǐ baja y sube; wéi sube; nǐ baja y sube; shì baja; wǒ baja y sube; de es neutro; tóng sube; xué sube.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué cuenta la persona?</p>',
        opciones: ['Que llegó tarde a clase', 'Que es compañero de la otra persona', 'Que pregunta si la otra persona es compañera suya', 'Que pide perdón porque creyó que la otra persona era compañera suya'], correcta: 3,
        pista: '<p>Fíjate en cómo empieza la frase y en la palabra que va después de «wǒ».</p>',
        solucion: `<p>Se oye ${zh("对不起，我以为你是我的同学", "duìbuqǐ, wǒ yǐwéi nǐ shì wǒ de tóngxué")}: «perdón, creí que eras mi compañero».</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué pregunta ${zh("那不是你的护照吗", "nà bù shì nǐ de hùzhào ma")}?</p>`,
        opciones: ['¿Dónde pusiste tu pasaporte?', '¿Quieres mi pasaporte?', '¿Ese no es tu pasaporte?', '¿Ya recibiste tu pasaporte?'], correcta: 2,
        pista: '<p>Mira la forma ' + zh("不是", "bù shì") + '…' + zh("吗", "ma") + '.</p>',
        solucion: `<p>${zh("不是", "bù shì")}…${zh("吗", "ma")} es una pregunta negativa: «¿ese no es tu pasaporte?».</p>` },
    ],
    fuentes: [SILABO, CHIN_XIAN, CHIN_RANHOU, MIT_CURSO, MSU_CARTA, MSU_RUTA],
  });

  // ------------------------------------------------------------------
  L('Escribir mensajes cortos en caracteres', {
    objetivo: `Reconocer y ordenar las partes de un mensaje corto, describir dos cualidades a la vez con ${zh("又", "yòu")}…${zh("又", "yòu")}…, decir «nada» con ${zh("一点儿也不", "yìdiǎnr yě bù")} y saludar con ${zh("好久不见", "hǎojiǔ bújiàn")}.`,
    explicacion: `
      <p>Cuando le escribes a un amigo, el mensaje tiene un orden: saludas, cuentas algo y te despides. En chino pasa igual, con palabras que ya conoces y con las de la tabla.</p>
      ${tabla([
        ['邮件', 'yóujiàn', 'correo electrónico'], ['邮箱', 'yóuxiāng', 'buzón de correo electrónico'], ['网站', 'wǎngzhàn', 'sitio web'], ['信', 'xìn', 'carta'],
        ['封', 'fēng', 'clasificador de cartas'], ['发', 'fā', 'enviar'], ['收', 'shōu', 'recibir'], ['号码', 'hàomǎ', 'número'],
        ['关机', 'guānjī', 'apagar un aparato'], ['开机', 'kāijī', 'encender un aparato'], ['最近', 'zuìjìn', 'últimamente'], ['好久', 'hǎojiǔ', 'mucho tiempo'],
        ['不见', 'bújiàn', 'no ver'], ['以后', 'yǐhòu', 'después, en adelante'], ['以前', 'yǐqián', 'antes'],
      ])}
      <h3>¿Cómo se escriben los caracteres?</h3>
      <p>Una computadora o un teléfono no tienen miles de teclas. Según el Centro de Recursos de Idiomas de la Universidad de Miami, se escribe el sonido en pinyin y aparece una ventana de candidatos con varios caracteres posibles; tú eliges el que quieres. En esta lección no tecleas: practicas leyendo y ordenando.</p>
      <h3>Las partes de un mensaje</h3>
      <p>MSU ofrece una carta y un correo como modelos. De ellos tomamos solo la estructura, porque sus fórmulas de cortesía no son de los niveles 1 a 3. La carta empieza con el nombre de quien la recibe y un saludo, sigue con el cuerpo y cierra con una despedida, el nombre de quien escribe y la fecha. El correo añade un encabezado con remitente, destinatario y asunto. Con palabras de la unidad, un mensaje de la lección queda así.</p>
      ${cuadro(['Parte', 'Mensaje de ejemplo'], [
        ['Saludo', zh("朋友，你好。", "péngyou, nǐ hǎo.")],
        ['Cuerpo', zh("好久不见。最近你忙吗？我最近一点儿也不忙。谢谢你的邮件。", "hǎojiǔ bújiàn. zuìjìn nǐ máng ma? wǒ zuìjìn yìdiǎnr yě bù máng. xièxie nǐ de yóujiàn.")],
        ['Despedida', zh("再见。", "zàijiàn.")],
        ['Firma y fecha', zh("你的朋友，十月十六号", "nǐ de péngyou, shí yuè shíliù hào")],
      ])}
      <h3>Dos cualidades a la vez: ${zh("又", "yòu")}…${zh("又", "yòu")}…</h3>
      <p>Según ChinGram, ${zh("又", "yòu")}…${zh("又", "yòu")}… une dos cualidades, o dos acciones, del mismo sujeto. Cada ${zh("又", "yòu")} va seguido de un adjetivo, y los dos deben ser ambos positivos o ambos negativos. El ejemplo de ChinGram sirve tal cual: ${zh("这里的东西又好又便宜", "zhèlǐ de dōngxi yòu hǎo yòu piányi")}, «las cosas de aquí son buenas y baratas». Si las dos partes se niegan en paralelo, suele ser «ni… ni…». Frase de ejemplo de la lección: ${zh("这本书又不难又不长", "zhè běn shū yòu bù nán yòu bù cháng")}, «este libro ni es difícil ni es largo».</p>
      <h3>Nada en absoluto: ${zh("一点儿也不", "yìdiǎnr yě bù")}</h3>
      <p>ChinGram explica que ${zh("一点儿", "yìdiǎnr")} con ${zh("也", "yě")} o ${zh("都", "dōu")} y una negación significa «nada» o «en absoluto». Con un adjetivo, su ejemplo es «no estoy nada cansado»; frase de la lección: ${zh("我一点儿也不忙", "wǒ yìdiǎnr yě bù máng")}, «no estoy nada ocupado». Con un verbo, ChinGram da «no quiero beber nada de agua»: ${zh("我一点儿水都不想喝", "wǒ yìdiǎnr shuǐ dōu bù xiǎng hē")}.</p>
      <h3>Saludar tras mucho tiempo</h3>
      <p>En un diálogo de ChinGram, una persona saluda con ${zh("好久不见了", "hǎojiǔ bújiàn le")} y pregunta cómo está el otro, y MSU lo usa en un correo. Para hablar del tiempo, ${zh("以前", "yǐqián")} es «antes» y ${zh("以后", "yǐhòu")} es «después»: ${zh("我以前写信，现在发邮件", "wǒ yǐqián xiě xìn, xiànzài fā yóujiàn")}, «antes escribía cartas, ahora mando correos».</p>
      <h3>Lo que lograste en HSK 3</h3>
      <p>Con esta lección terminas HSK 3. Ahora puedes contar una rutina en orden, planear un viaje y comparar opciones, hablar de dos fiestas, leer un texto corto y escribir un mensaje sencillo. HSK 3 fue una selección: viste parte de las palabras del nivel, no todas. El sílabo completo está en las fuentes.</p>
      <p class="nota"><strong>Trampa común:</strong> mezclar un adjetivo bueno con uno malo en ${zh("又", "yòu")}…${zh("又", "yòu")}…. Los dos deben ir en el mismo sentido.</p>`,
    ejemplo: `
      <p>Luis le escribe a una amiga a la que no ve hace tiempo. Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Empieza por el saludo: ${zh("朋友，你好", "péngyou, nǐ hǎo")}.</li>
        <li>Menciona el tiempo que pasó y pregunta por ella: ${zh("好久不见。最近你忙吗", "hǎojiǔ bújiàn. zuìjìn nǐ máng ma")}.</li>
        <li>Cuenta cómo está, con la negación después de ${zh("也", "yě")}: ${zh("我最近一点儿也不忙", "wǒ zuìjìn yìdiǎnr yě bù máng")}.</li>
        <li>Describe un lugar con dos cualidades del mismo tipo: ${zh("这里的东西又好又便宜", "zhèlǐ de dōngxi yòu hǎo yòu piányi")}.</li>
        <li>Cierra con la despedida y la firma: ${zh("再见。你的朋友，十月十六号", "zàijiàn. nǐ de péngyou, shí yuè shíliù hào")}.</li>
      </ol>
      <p>Comprueba: el mensaje tiene saludo, cuerpo, despedida, firma y fecha, en ese orden. Resultado: <span class="resultado">${zh("我最近一点儿也不忙", "wǒ zuìjìn yìdiǎnr yě bù máng")} = «últimamente no estoy nada ocupado»</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar la negación, como ${zh("我一点儿也忙", "wǒ yìdiǎnr yě máng")}. Para decir «nada» hace falta ${zh("不", "bù")}.</p>`,
    vidaReal: `
      <p>Escribir un mensaje corto sirve en muchas situaciones:</p>
      <ul>
        <li>Saludar a un amigo al que no ves desde hace mucho y preguntarle cómo está.</li>
        <li>Dar tu dirección de correo electrónico o tu número de teléfono a alguien nuevo.</li>
        <li>Avisar a una compañera que recibiste su carta o su mensaje.</li>
        <li>Contar que un lugar te gustó porque era bueno y barato a la vez.</li>
        <li>Cerrar un mensaje con una despedida, tu nombre y la fecha.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «las cosas de aquí son buenas y baratas».</p>',
        respuesta: ['这里', '的', '东西', '又', '好', '又', '便宜'], pinyin: ['zhèlǐ', 'de', 'dōngxi', 'yòu', 'hǎo', 'yòu', 'piányi'], lang: 'zh-Hans',
        pista: '<p>Cada ' + zh("又", "yòu") + ' va justo antes de un adjetivo.</p>',
        solucion: `<p>${zh("这里的东西又好又便宜", "zhèlǐ de dōngxi yòu hǎo yòu piányi")}: sujeto y luego dos adjetivos, cada uno con su ${zh("又", "yòu")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>¿Cuál frase dice «no estoy nada ocupado»?</p>',
        opciones: [zh('我不一点儿也忙', 'wǒ bù yìdiǎnr yě máng'), zh('我也一点儿不忙', 'wǒ yě yìdiǎnr bù máng'), zh('我一点儿也不忙', 'wǒ yìdiǎnr yě bù máng'), zh('我一点儿也忙不', 'wǒ yìdiǎnr yě máng bù')], correcta: 2,
        pista: '<p>La estructura es ' + zh("一点儿", "yìdiǎnr") + ' + ' + zh("也", "yě") + ' + ' + zh("不", "bù") + ' + adjetivo.</p>',
        solucion: `<p>${zh("我一点儿也不忙", "wǒ yìdiǎnr yě bù máng")}: ${zh("不", "bù")} va justo delante del adjetivo.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("这本书又不难又不长", "zhè běn shū yòu bù nán yòu bù cháng")}?</p>`,
        opciones: ['Este libro es difícil y largo', 'Este libro ni es difícil ni es largo', 'Este libro es difícil pero corto', 'Yo no tengo este libro'], correcta: 1,
        pista: '<p>ChinGram: con las dos partes negadas, la frase suele equivaler a «ni… ni…».</p>',
        solucion: `<p>${zh("又不难又不长", "yòu bù nán yòu bù cháng")} es «ni difícil ni largo».</p>` },
      { tipo: 'opciones', escucha: { voz: '好久不见，最近你忙吗' },
        sinAudio: '<p>Se dice <strong>hǎojiǔ bújiàn, zuìjìn nǐ máng ma</strong>: hǎo baja y sube; jiǔ baja y sube; bú sube; jiàn baja; zuì baja; jìn baja; nǐ baja y sube; máng sube; ma es neutro.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué te dicen?</p>',
        opciones: ['Que te vas de viaje', 'Que apagues el teléfono', 'Que mandes una carta', 'Te saludan tras mucho tiempo y preguntan si estás ocupado'], correcta: 3,
        pista: '<p>La primera parte es el saludo de la lección.</p>',
        solucion: `<p>Se oye ${zh("好久不见，最近你忙吗", "hǎojiǔ bújiàn, zuìjìn nǐ máng ma")}: «tanto tiempo sin vernos, ¿estás ocupado últimamente?».</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las partes de este mensaje corto: saludo, cuerpo y despedida.</p>',
        respuesta: ['朋友，你好。', '好久不见。', '谢谢你的邮件。', '再见。'], pinyin: ['péngyou, nǐ hǎo.', 'hǎojiǔ bújiàn.', 'xièxie nǐ de yóujiàn.', 'zàijiàn.'], lang: 'zh-Hans',
        alternativas: [['朋友，你好。', '谢谢你的邮件。', '好久不见。', '再见。']],
        pista: '<p>Un mensaje empieza con un saludo y termina con una despedida.</p>',
        solucion: `<p>El saludo ${zh("朋友，你好", "péngyou, nǐ hǎo")} va primero, el cuerpo en medio y ${zh("再见", "zàijiàn")} al final.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("邮件")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['yóu jiàn'],
        pista: '<p>La primera sílaba sube; la segunda baja.</p>',
        solucion: `<p>${zh("邮件", "yóujiàn")}: <strong>yóu jiàn</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_YOUYOU, CHIN_YIDIANR, CHIN_ZENYANG, MSU_CARTA, MSU_CORREO, MIAMI_PINYIN],
  });

  // FIN
})();
