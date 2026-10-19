// Mandarín · Unidad 13: HSK 5 · Gramática.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Todo carácter chino sale de zh(). Las frases de ejemplo («…») son de la lección; solo las palabras vienen del sílabo.
// Sin grabaciones: ningún `audio:`; solo la voz del sistema.
(function () {
  const zh = window.zh;
  const L = (titulo, datos) => window.registrarLeccion('mandarin', titulo, datos);
  // Tabla de vocabulario: palabra con su botón y significado.
  const tabla = (filas) => `<div class="tabla-wrap"><table class="vocabulario"><tr><th scope="col">Palabra</th><th scope="col">Significado</th></tr>${filas.map(([h, p, es]) => `<tr><td>${zh(h, p)}</td><td>${es}</td></tr>`).join('')}</table></div>`;
  // Tabla de comparación: encabezados y filas ya armadas con zh().
  const cuadro = (cab, filas) => `<div class="tabla-wrap"><table><tr>${cab.map((c) => `<th scope="col">${c}</th>`).join('')}</tr>${filas.map((f) => `<tr>${f.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>`;

  // Fuentes. Los números F# son los de la ficha de la unidad.
  const SILABO = { nombre: 'Centro de Educación y Cooperación Lingüística (China), «HSK 考试大纲», sílabo del HSK 3.0 (2025)', url: 'https://hsk.cn-bj.ufileos.com/3.0/新版HSK考试大纲1219.pdf' };
  const DART = (nombre, slug) => ({ nombre: `Dartmouth College (EE. UU.), Snapshots of China: ${nombre} (en inglés)`, url: `https://sites.dartmouth.edu/snapshotsofchina/${slug}/` });
  const ALLSET = (n, url) => ({ nombre: 'Chinese Grammar Wiki (AllSet Learning), fuente de apoyo no universitaria: ' + n + ' (en inglés)', url: 'https://resources.allsetlearning.com/chinese/grammar/' + url });
  const CHINGRAM = (n, url) => ({ nombre: 'Universidad Palacký de Olomouc (Chequia), ChinGram: ' + n + ' (en inglés)', url: 'https://chingram.upol.cz/grammar/' + url });
  // F2 a F7 (Dartmouth)
  const DART_6 = DART('Lesson 6, notas de gramática', '%e7%ac%ac%e5%85%ad%e8%af%be-lesson-6');
  const DART_23 = DART('Lesson 23, ejemplos de 假如', '%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%b8%89%e8%af%be-lesson-23');
  const DART_13 = DART('Lesson 13, ejemplos de 万一', '%e7%ac%ac%e5%8d%81%e4%b8%89%e8%af%be-lesson-13');
  const DART_14 = DART('Lesson 14, nota sobre 否则', '%e7%ac%ac%e5%8d%81%e5%9b%9b%e8%af%be-lesson-14');
  const DART_10 = DART('Lesson 10, nota sobre 即使', '%e7%ac%ac%e5%8d%81%e8%af%be-lesson-10');
  const DART_25 = DART('Lesson 25, nota sobre una conjunción', 'new');
  // F8, F9, F34 (ChinGram)
  const CHINGRAM_YIJIU = CHINGRAM('Sentence with yī... jiù... 一...... 就...... \'as soon as..., then...; whenever...\'', 'pattern-yi-jiu-%e4%b8%80-%e5%b0%b1-as-soon-as-then-whenever');
  const CHINGRAM_RUGUO = CHINGRAM('Sentences with rúguǒ…, jiù… 如果……，就…… \'if…, then…\'', 'hypothetical-sentences-with-ruguo-jiu-%e5%a6%82%e6%9e%9c%ef%bc%8c%e5%b0%b1-if-then-and');
  const CHINGRAM_BUDAN = { nombre: 'ChinGram (Universidad Palacký de Olomouc, República Checa): construcción 不但……，而且(也)…… (en inglés)', url: 'https://chingram.upol.cz/grammar/the-construction-budanerqie-ye-%e4%b8%8d%e4%bd%86%ef%bc%8c%e8%80%8c%e4%b8%94%e4%b9%9f-not-only-but-also' };
  // F10 (Oxford)
  const OXFORD_VISUAL = { nombre: 'Universidad de Oxford (Reino Unido), CTCFL: Learning through visual materials, notas de lectura de una reseña sobre Edward Yang (en inglés)', url: 'https://www.ctcfl.ox.ac.uk/materials_learning-through-visual-materials/' };
  // F11 a F16, F31 a F33, F35 a F38 (AllSet)
  const ALLSET_YIDAN = ALLSET('Expressing "once...then..." with "yidan...jiu..."', 'Expressing_%22once...then...%22_with_%22yidan...jiu...%22');
  const ALLSET_WANYI = ALLSET('Expressing "what if" with "wanyi"', 'Expressing_%22what_if%22_with_%22wanyi%22');
  const ALLSET_JIARU = ALLSET('Expressing "if…then…" with "jiaru"', 'Expressing_%22if%E2%80%A6_then%E2%80%A6%22_with_%22jiaru%22');
  const ALLSET_YAOBU = ALLSET('Expressing "how about" with "yaobu"', 'Expressing_%22how_about%22_with_%22yaobu%22');
  const ALLSET_NAPA = ALLSET('Expressing "even if…" with "napa"', 'Expressing_%22even_if%E2%80%A6%22_with_%22napa%22');
  const ALLSET_JISHI = ALLSET('Expressing "even if…" with "jishi"', 'Expressing_%22even_if%E2%80%A6%22_with_%22jishi%22');
  const ALLSET_FANER = ALLSET('Expressing "on the contrary" with "fan\'er"', 'ASGX5QTV');
  const ALLSET_JURAN_FANER = ALLSET('Comparing "juran" and "fan\'er"', 'ASGCZ37R');
  const ALLSET_FANER_XIANGFAN = ALLSET('Comparing "fan\'er" and "xiangfan"', 'ASGFNS52');
  const ALLSET_CONGER = ALLSET('Expressing "thus" with "cong\'er"', 'Expressing_%22thus%22_with_%22cong%27er%22');
  const ALLSET_ZONGZHI = ALLSET('Expressing "in short" with "zongzhi"', 'Expressing_%22in_short%22_with_%22zongzhi%22');
  const ALLSET_YINCI = ALLSET('Expressing "therefore" with "yinci"', 'Expressing_%22therefore%22_with_%22yinci%22');
  const ALLSET_SUBORD = ALLSET('Subordinate Complex Sentences', 'Subordinate_Complex_Sentences');

  // ------------------------------------------------------------------
  L('En cuanto pase: 一旦…就…', {
    objetivo: `Decir qué pasa si algo llega a ocurrir con ${zh("一旦", "yídàn")}…${zh("就", "jiù")}…, y distinguirlo de ${zh("一", "yī")}…${zh("就", "jiù")}… y de la forma escrita ${zh("便", "biàn")}.`,
    explicacion: `
      <p>Empiezas HSK 5, el quinto nivel del sílabo oficial. Cada lección trae una selección de 15 palabras, no toda la lista; la lista completa está en el <a href="${encodeURI(SILABO.url)}">sílabo</a>. Las frases de ejemplo son de la lección. La voz depende de tu dispositivo: si suena rara, el pinyin manda.</p>
      <p>Piensa en el cartel de un edificio: «si alguna vez hay un temblor, sal enseguida». No dice que vaya a pasar hoy; dice qué hacer si pasa. El chino tiene una palabra para eso, ${zh("一旦", "yídàn")}:</p>
      <ul>
        <li>${zh("一旦发生地震，我们就立即出去", "yídàn fāshēng dìzhèn, wǒmen jiù lìjí chūqù")}: «si llega a haber un temblor, salimos de inmediato».</li>
        <li>${zh("一旦发生车祸，要立即报警", "yídàn fāshēng chēhuò, yào lìjí bàojǐng")}: «si hay un choque, hay que avisar de inmediato a la policía».</li>
        <li>${zh("一旦出了事故，救护车就会来", "yídàn chūle shìgù, jiùhùchē jiù huì lái")}: «si ocurre un accidente, vendrá la ambulancia».</li>
      </ul>
      ${tabla([
        ['一旦', 'yídàn', 'una vez que, en cuanto (si llega a pasar)'], ['便', 'biàn', `entonces (forma escrita de ${zh("就", "jiù")})`], ['地震', 'dìzhèn', 'terremoto, temblor'], ['报警', 'bàojǐng', 'avisar a la policía'], ['救护车', 'jiùhùchē', 'ambulancia'],
        ['急诊', 'jízhěn', 'urgencias, consulta de urgencia'], ['事故', 'shìgù', 'accidente'], ['车祸', 'chēhuò', 'accidente de tráfico'], ['安全带', 'ānquándài', 'cinturón de seguridad'], ['紧急', 'jǐnjí', 'urgente'],
        ['立即', 'lìjí', 'de inmediato'], ['抢救', 'qiǎngjiù', 'rescatar, atender de urgencia'], ['后果', 'hòuguǒ', 'consecuencia, resultado'], ['措施', 'cuòshī', 'medida, acción que se toma'], ['防止', 'fángzhǐ', 'evitar, impedir'],
      ])}
      <h3>¿Cómo se arma ${zh("一旦", "yídàn")}…${zh("就", "jiù")}…?</h3>
      <p>Según Chinese Grammar Wiki (AllSet), ${zh("一旦", "yídàn")} sirve para decir qué pasará cuando se cumple cierta condición, y casi siempre va con ${zh("就", "jiù")}: una vez que ocurre una cosa, ocurre la otra. La estructura que da es ${zh("一旦", "yídàn")} + <strong>condición</strong>, sujeto + ${zh("就", "jiù")} + <strong>consecuencia</strong>. En la primera frase, la condición es ${zh("发生地震", "fāshēng dìzhèn")} y la consecuencia es ${zh("我们就立即出去", "wǒmen jiù lìjí chūqù")}.</p>
      <p>Fíjate en dos detalles. Primero, ${zh("就", "jiù")} va después del sujeto y antes del verbo, no al principio de la segunda parte. Segundo, AllSet avisa de que a veces ${zh("就", "jiù")} falta y el sentido sigue claro, como en la segunda frase de arriba. Sus ejemplos hablan sobre todo de situaciones que nadie quiere, por eso esta palabra se oye tanto en avisos de seguridad.</p>
      <h3>¿En qué se parece a ${zh("一", "yī")}…${zh("就", "jiù")}… y en qué no?</h3>
      <p>Quizá recuerdes ${zh("一", "yī")}…${zh("就", "jiù")}…. ChinGram dice que muestra una acción que ocurre justo después de otra, y que en un hábito significa «cada vez que». Dartmouth la define igual: dos acciones que suceden en rápida sucesión. Un ejemplo propio: ${zh("弟弟一回家就做作业", "dìdi yī huí jiā jiù zuò zuòyè")}, «en cuanto mi hermano llega a casa, hace la tarea».</p>
      <p>La diferencia: en ${zh("一", "yī")}…${zh("就", "jiù")}… el ${zh("一", "yī")} va pegado al verbo y cuenta dos hechos muy seguidos. Con ${zh("一旦", "yídàn")} pones una condición completa y dices qué trae si se cumple.</p>
      <h3>Una forma escrita: ${zh("便", "biàn")}</h3>
      <p>El sílabo de nivel 5 incluye el molde ${zh("……，便……", "……, biàn……")} entre las oraciones de secuencia y pone ${zh("便", "biàn")} junto a ${zh("一旦", "yídàn")} entre los adverbios que enlazan. Dartmouth lista ${zh("就", "jiù")}, ${zh("便", "biàn")}, ${zh("那", "nà")} y ${zh("那么", "nàme")} como palabras que aparecen en la segunda parte. Como simplificación de la lección, piensa en ${zh("便", "biàn")} como una forma escrita de ${zh("就", "jiù")}: ${zh("他下了车，便立即报警", "tā xiàle chē, biàn lìjí bàojǐng")}, «se bajó del coche y de inmediato avisó a la policía».</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("就", "jiù")} delante del sujeto, como en ${zh("就我们立即出去", "jiù wǒmen lìjí chūqù")}. Va después del sujeto.</p>`,
    ejemplo: `
      <p>Quieres decir: «Si llega a haber un temblor, salimos de inmediato». Vamos por partes.</p>
      <ol class="pasos-ej">
        <li>Empieza por lo que haces: ${zh("我们立即出去", "wǒmen lìjí chūqù")}, «salimos de inmediato». Es la consecuencia.</li>
        <li>Escribe la condición: ${zh("发生地震", "fāshēng dìzhèn")}, «hay un temblor».</li>
        <li>Pon ${zh("一旦", "yídàn")} al principio de la condición: ${zh("一旦发生地震", "yídàn fāshēng dìzhèn")}.</li>
        <li>Añade ${zh("就", "jiù")} después del sujeto de la consecuencia, antes de ${zh("立即", "lìjí")}: ${zh("我们就立即出去", "wǒmen jiù lìjí chūqù")}.</li>
        <li>Une las dos partes con una coma.</li>
      </ol>
      <p>Para comprobar, mira que la condición vaya primero y que ${zh("就", "jiù")} quede entre el sujeto y el verbo. Si quieres un tono más escrito, cambia ${zh("就", "jiù")} por ${zh("便", "biàn")}. Resultado: <span class="resultado">${zh("一旦发生地震，我们就立即出去", "yídàn fāshēng dìzhèn, wǒmen jiù lìjí chūqù")} = «si llega a haber un temblor, salimos de inmediato»</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar ${zh("一旦", "yídàn")} para dos acciones normales de cada día. Ahí va mejor ${zh("一", "yī")}…${zh("就", "jiù")}….</p>`,
    vidaReal: `
      <p>Con esta estructura entiendes cómo se habla de lo que podría pasar:</p>
      <ul>
        <li>Leer avisos de seguridad en un edificio, un tren o un aeropuerto.</li>
        <li>Entender qué hacer en una emergencia durante un viaje.</li>
        <li>Seguir una noticia sobre un accidente.</li>
        <li>Explicar a alguien un plan de «si pasa esto, hacemos aquello».</li>
        <li>Notar palabras más propias de un texto escrito que de una charla entre amigos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «si llega a haber un temblor, salimos de inmediato».</p>',
        respuesta: ['一旦', '发生地震', '我们', '就', '立即', '出去'], pinyin: ['yídàn', 'fāshēng dìzhèn', 'wǒmen', 'jiù', 'lìjí', 'chūqù'], lang: 'zh-Hans',
        pista: `<p>La condición va primero, con ${zh("一旦", "yídàn")} al principio.</p>`,
        solucion: `<p>${zh("一旦发生地震，我们就立即出去", "yídàn fāshēng dìzhèn, wǒmen jiù lìjí chūqù")}: condición, sujeto, ${zh("就", "jiù")} y consecuencia.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «si llega a haber un choque, nosotros avisamos a la policía». ¿Qué frase está bien?</p>',
        opciones: [zh('一旦发生车祸，就我们报警', 'yídàn fāshēng chēhuò, jiù wǒmen bàojǐng'), zh('一旦发生车祸，我们就报警', 'yídàn fāshēng chēhuò, wǒmen jiù bàojǐng'), zh('发生车祸一旦，我们报警就', 'fāshēng chēhuò yídàn, wǒmen bàojǐng jiù'), zh('我们一旦就发生车祸，报警', 'wǒmen yídàn jiù fāshēng chēhuò, bàojǐng')], correcta: 1,
        pista: `<p>${zh("就", "jiù")} va después del sujeto y antes del verbo.</p>`,
        solucion: `<p>${zh("我们就报警", "wǒmen jiù bàojǐng")} pone ${zh("就", "jiù")} entre el sujeto y el verbo, y la condición con ${zh("一旦", "yídàn")} va primero.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según ChinGram y Dartmouth, ¿para qué sirve ${zh("一", "yī")}…${zh("就", "jiù")}…?</p>`,
        opciones: ['Para dos acciones que ocurren una justo después de la otra', 'Para decir «aunque»', 'Para preguntar algo', 'Para decir «sin»'], correcta: 0,
        pista: '<p>Piensa en «en cuanto llega a casa, hace la tarea».</p>',
        solucion: `<p>${zh("一", "yī")}…${zh("就", "jiù")}… muestra una acción que sigue de inmediato a otra, o «cada vez que» en un hábito.</p>` },
      { tipo: 'opciones', enunciado: `<p>En ${zh("他下了车，便立即报警", "tā xiàle chē, biàn lìjí bàojǐng")}, ¿qué papel hace ${zh("便", "biàn")} según la lección?</p>`,
        opciones: ['Es una forma negativa', 'Es una forma escrita de ' + zh('就', 'jiù'), 'Quiere decir «mañana»', 'Hace una pregunta'], correcta: 1,
        pista: '<p>Está en el mismo lugar donde podrías poner otra palabra de la segunda parte.</p>',
        solucion: `<p>Como simplificación de la lección, ${zh("便", "biàn")} es una forma escrita de ${zh("就", "jiù")}: «se bajó y de inmediato avisó».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("救护车")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['jiù hù chē'],
        pista: '<p>La primera sílaba baja de golpe; la segunda también; la tercera empieza alta y se mantiene.</p>',
        solucion: `<p>${zh("救护车", "jiùhùchē")}: <strong>jiù hù chē</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("事故", "shìgù")}.</p>`,
        respuestas: ['accidente', 'un accidente', 'siniestro', 'percance'],
        pista: '<p>Es algo que no quieres que pase en la calle o en el trabajo.</p>',
        solucion: `<p>${zh("事故", "shìgù")} es «accidente».</p>` },
    ],
    fuentes: [SILABO, DART_6, CHINGRAM_YIJIU, ALLSET_YIDAN],
  });

  // ------------------------------------------------------------------
  L('Suponer: 假如 y 万一', {
    objetivo: `Plantear una suposición con ${zh("假如", "jiǎrú")}, hablar de lo poco probable con ${zh("万一", "wànyī")} y advertir con ${zh("要不然", "yàobùrán")} y ${zh("不然", "bùrán")}.`,
    explicacion: `
      <p>Al preparar un viaje haces dos tipos de preguntas: «si llueve, ¿qué hacemos?» y «¿y si nos perdemos?». La primera es una suposición normal; la segunda habla de algo que no quieres que pase. Las frases de ejemplo son de la lección:</p>
      <ul>
        <li>${zh("假如明天下雨，我们就不去山上", "jiǎrú míngtiān xià yǔ, wǒmen jiù bù qù shān shàng")}: «si mañana llueve, no iremos a la montaña».</li>
        <li>${zh("万一迷路了，我就看地图", "wànyī mílù le, wǒ jiù kàn dìtú")}: «por si me pierdo, miro el mapa».</li>
        <li>${zh("你事先预订，不然可能没有房间", "nǐ shìxiān yùdìng, bùrán kěnéng méiyǒu fángjiān")}: «reserva de antemano; si no, quizá no haya habitación».</li>
      </ul>
      ${tabla([
        ['假如', 'jiǎrú', 'si, suponiendo que'], ['万一', 'wànyī', 'por si acaso, si llegara a pasar'], ['不然', 'bùrán', 'si no, de lo contrario'], ['要不', 'yàobù', `si no (forma corta de ${zh("要不然", "yàobùrán")})`], ['风险', 'fēngxiǎn', 'riesgo'],
        ['保险', 'bǎoxiǎn', 'seguro'], ['预订', 'yùdìng', 'reservar'], ['行程', 'xíngchéng', 'itinerario, plan del viaje'], ['往返', 'wǎngfǎn', 'ida y vuelta'], ['迷路', 'mílù', 'perderse, extraviarse en el camino'],
        ['丢失', 'diūshī', 'perder, extraviarse (un objeto)'], ['押金', 'yājīn', 'depósito, fianza'], ['退还', 'tuìhuán', 'devolver (dinero)'], ['事先', 'shìxiān', 'de antemano'], ['确认', 'quèrèn', 'confirmar'],
      ])}
      <h3>¿Cómo dices «si» de forma más formal?</h3>
      <p>Del ${zh("如果", "rúguǒ")} ya sabes cómo funciona: lo viste en «Si…entonces: ${zh("如果…就…")}». ChinGram recuerda que ${zh("就", "jiù")} va siempre antes del verbo de la segunda parte. ${zh("假如", "jiǎrú")} se arma igual. Según AllSet, es otra manera de decir «si…, entonces…», pero mucho más formal que ${zh("要是", "yàoshi")} o ${zh("如果", "rúguǒ")}, y su estructura es ${zh("假如", "jiǎrú")} + frase + ${zh("就", "jiù")} + resultado. El sílabo la pone entre las conjunciones que unen frases y da el molde ${zh("假如……，(就)……", "jiǎrú……, (jiù)……")}, donde el paréntesis dice que ${zh("就", "jiù")} puede faltar. Dartmouth la muestra en frases como ${zh("假如我是你，我就不去那里", "jiǎrú wǒ shì nǐ, wǒ jiù bù qù nàli")}: «si yo fuera tú, no iría allí».</p>
      <h3>¿Cómo hablas de lo que quizá no pase?</h3>
      <p>Para algo poco probable y que no quieres, el chino tiene ${zh("万一", "wànyī")}. AllSet explica que significa literalmente «uno entre diez mil», y que se usa casi siempre para situaciones no deseadas que quien habla ve muy improbables. Esa es la gran diferencia con ${zh("假如", "jiǎrú")}: con ${zh("假如", "jiǎrú")} puedes imaginar cualquier <strong>suposición</strong>, buena o mala; con ${zh("万一", "wànyī")} piensas «ojalá no, pero por si acaso».</p>
      <p>AllSet añade que ${zh("万一", "wànyī")} puede ir antes o después del sujeto: ${zh("万一我们迷路了", "wànyī wǒmen mílù le")} y ${zh("我们万一迷路了", "wǒmen wànyī mílù le")} valen los dos. También da dos formas de pregunta: ${zh("万一……怎么办", "wànyī…… zěnme bàn")} y ${zh("万一……呢", "wànyī…… ne")}. Por ejemplo, ${zh("万一丢失了行李怎么办", "wànyī diūshīle xíngli zěnme bàn")}, «¿y si se pierde el equipaje?».</p>
      <h3>¿Cómo adviertes «si no»?</h3>
      <p>Muchas veces quieres decir qué pasará si <em>no</em> haces algo. Para eso el sílabo da ${zh("……，要不然……", "……, yàobùrán……")} y ${zh("……，不然……", "……, bùrán……")} en las oraciones de causa y efecto. AllSet explica que ${zh("要不", "yàobù")}, cuando significa «de lo contrario», es la forma corta de ${zh("要不然", "yàobùrán")}, que literalmente es «si no es así». Primero dices lo que conviene, y después de la coma ponen ${zh("不然", "bùrán")} para anunciar la consecuencia de no hacerlo. Es una <strong>advertencia</strong>. Una palabra de la unidad anterior, ${zh("否则", "fǒuzé")}, que viste en «Si no: ${zh("要是")} y ${zh("否则")}», también significa «si no».</p>
      <p class="nota"><strong>Trampa común:</strong> empezar la frase con ${zh("不然", "bùrán")} sin haber dicho antes lo que conviene hacer. Necesita una primera parte: ${zh("你事先确认行程，不然会很麻烦", "nǐ shìxiān quèrèn xíngchéng, bùrán huì hěn máfan")}.</p>`,
    ejemplo: `
      <p>Quieres decir: «Reservemos de antemano; si no, quizá no haya habitación». Vamos por partes.</p>
      <ol class="pasos-ej">
        <li>Escribe lo que conviene hacer: ${zh("我们事先预订", "wǒmen shìxiān yùdìng")}, «reservamos de antemano».</li>
        <li>Escribe qué pasará si no lo haces: ${zh("可能没有房间", "kěnéng méiyǒu fángjiān")}, «quizá no haya habitación».</li>
        <li>Pon ${zh("要不然", "yàobùrán")} al principio de la segunda parte: ${zh("要不然可能没有房间", "yàobùrán kěnéng méiyǒu fángjiān")}. Dice «si no».</li>
        <li>Une las dos partes con una coma.</li>
      </ol>
      <p>Para comprobar, mira que la primera parte diga lo que conviene hacer y que la segunda traiga lo malo. Puedes cambiar ${zh("要不然", "yàobùrán")} por ${zh("不然", "bùrán")} sin cambiar el sentido. Resultado: <span class="resultado">${zh("我们事先预订，要不然可能没有房间", "wǒmen shìxiān yùdìng, yàobùrán kěnéng méiyǒu fángjiān")} = «reservemos de antemano; si no, quizá no haya habitación»</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar ${zh("万一", "wànyī")} para algo que sí esperas, como ${zh("万一明天放假", "wànyī míngtiān fàngjià")}. ${zh("万一", "wànyī")} es para lo malo y poco probable.</p>`,
    vidaReal: `
      <p>Con estas palabras puedes hablar de planes y de precauciones:</p>
      <ul>
        <li>Preparar un viaje y pensar en lo que podría salir mal.</li>
        <li>Entender las condiciones de una reserva o de un depósito.</li>
        <li>Dar un consejo con su razón: «hazlo así; si no, pasará esto».</li>
        <li>Leer folletos que hablan de seguros y de riesgos.</li>
        <li>Notar cuándo alguien usa una forma de «si» más cuidada.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «¿y si nos perdemos?».</p>',
        respuesta: ['万一', '我们', '迷路了', '怎么办'], pinyin: ['wànyī', 'wǒmen', 'mílù le', 'zěnme bàn'], lang: 'zh-Hans',
        alternativas: [['我们', '万一', '迷路了', '怎么办']],
        pista: `<p>${zh("万一", "wànyī")} puede ir antes o después del sujeto; la pregunta cierra con ${zh("怎么办", "zěnme bàn")}.</p>`,
        solucion: `<p>${zh("万一我们迷路了怎么办", "wànyī wǒmen mílù le zěnme bàn")} o ${zh("我们万一迷路了怎么办", "wǒmen wànyī mílù le zěnme bàn")}: las dos valen.</p>` },
      { tipo: 'opciones', enunciado: '<p>Según AllSet, ¿qué palabra se usa para una posibilidad que quien habla ve muy improbable y que no desea?</p>',
        opciones: [zh('便', 'biàn'), zh('假如', 'jiǎrú'), zh('万一', 'wànyī'), zh('要不', 'yàobù')], correcta: 2,
        pista: `<p>Su significado literal es «uno entre diez mil».</p>`,
        solucion: `<p>${zh("万一", "wànyī")} es para lo poco probable y no deseado: «por si acaso».</p>` },
      { tipo: 'opciones', enunciado: `<p>Completa: ${zh("你事先预订，____可能没有房间", "nǐ shìxiān yùdìng, ____ kěnéng méiyǒu fángjiān")}.</p>`,
        opciones: [zh('要不然', 'yàobùrán'), zh('假如', 'jiǎrú'), zh('一旦', 'yídàn'), zh('万一', 'wànyī')], correcta: 0,
        pista: '<p>La segunda parte dice qué pasará si no reservas.</p>',
        solucion: `<p>${zh("要不然", "yàobùrán")} abre la segunda parte con el sentido de «si no».</p>` },
      { tipo: 'opciones', enunciado: `<p>Según AllSet, ¿de qué es forma corta ${zh("要不", "yàobù")} cuando significa «de lo contrario»?</p>`,
        opciones: [zh('如果', 'rúguǒ'), zh('万一', 'wànyī'), zh('假如', 'jiǎrú'), zh('要不然', 'yàobùrán')], correcta: 3,
        pista: '<p>Mira la palabra más larga que lleva los mismos dos primeros caracteres.</p>',
        solucion: `<p>${zh("要不", "yàobù")} es la forma corta de ${zh("要不然", "yàobùrán")}, «si no es así».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("预订")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['yù dìng'],
        pista: '<p>Las dos sílabas bajan de golpe.</p>',
        solucion: `<p>${zh("预订", "yùdìng")}: <strong>yù dìng</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("风险", "fēngxiǎn")}.</p>`,
        respuestas: ['riesgo', 'el riesgo', 'un riesgo', 'peligro'],
        pista: '<p>Es la posibilidad de que algo salga mal.</p>',
        solucion: `<p>${zh("风险", "fēngxiǎn")} es «riesgo».</p>` },
    ],
    fuentes: [SILABO, DART_23, CHINGRAM_RUGUO, ALLSET_JIARU, ALLSET_WANYI, ALLSET_YAOBU],
  });

  // ------------------------------------------------------------------
  L('Aunque sea: 哪怕…也…', {
    objetivo: `Decir «aunque sea así, igual lo hago» con ${zh("哪怕", "nǎpà")}…${zh("也", "yě")}…, reforzarlo con ${zh("再", "zài")} y reconocer la frase corta ${zh("再", "zài")}…${zh("也", "yě")}….`,
    explicacion: `
      <p>Una corredora dice: «aunque mañana llueva, saldré a entrenar». No importa lo que pase, su plan no cambia. El chino lo dice con ${zh("哪怕", "nǎpà")} para el «aunque» y ${zh("也", "yě")} para el «igual». Las frases de ejemplo son de la lección:</p>
      <ul>
        <li>${zh("哪怕明天下雨，我也要去跑步", "nǎpà míngtiān xià yǔ, wǒ yě yào qù pǎobù")}: «aunque mañana llueva, igual iré a correr».</li>
        <li>${zh("哪怕工作很艰苦，他也不放弃", "nǎpà gōngzuò hěn jiānkǔ, tā yě bù fàngqì")}: «aunque el trabajo sea muy duro, él no se rinde».</li>
        <li>${zh("路再远，我也要去", "lù zài yuǎn, wǒ yě yào qù")}: «por más lejos que esté el camino, iré».</li>
      </ul>
      ${tabla([
        ['哪怕', 'nǎpà', 'aunque, aun si'], ['坚强', 'jiānqiáng', 'fuerte (de carácter), firme'], ['奋斗', 'fèndòu', 'luchar, esforzarse por una meta'], ['付出', 'fùchū', 'dar, invertir (esfuerzo, tiempo)'], ['勇气', 'yǒngqì', 'valor, coraje'],
        ['决心', 'juéxīn', 'determinación, decisión firme'], ['尽力', 'jìnlì', 'hacer todo lo posible'], ['尽量', 'jǐnliàng', 'en lo posible, tanto como se pueda'], ['艰苦', 'jiānkǔ', 'duro, difícil (vida, condiciones)'], ['承受', 'chéngshòu', 'soportar, aguantar'],
        ['挑战', 'tiǎozhàn', 'reto, desafío'], ['失误', 'shīwù', 'error, descuido'], ['实现', 'shíxiàn', 'hacer realidad, lograr'], ['追求', 'zhuīqiú', 'buscar, perseguir (una meta)'], ['珍惜', 'zhēnxī', 'valorar, cuidar lo que se tiene'],
      ])}
      <h3>¿Cómo se arma ${zh("哪怕", "nǎpà")}…${zh("也", "yě")}…?</h3>
      <p>Según AllSet, ${zh("哪怕", "nǎpà")} significa «aunque» o «aun si», y su estructura es ${zh("哪怕", "nǎpà")} + caso, ${zh("也", "yě")} + resultado. El sílabo lo llama una oración de <strong>concesión</strong>: aceptas un caso, aunque sea malo, y dices que no cambia nada. Primero va el caso con ${zh("哪怕", "nǎpà")}, y en la segunda parte ${zh("也", "yě")} va antes del verbo, como cualquier adverbio.</p>
      <h3>¿En qué se diferencia de ${zh("即使", "jíshǐ")}?</h3>
      <p>Seguro recuerdas ${zh("即使", "jíshǐ")} de «Aunque pasara: ${zh("即使…也…")}». Dartmouth explica que ${zh("即使", "jíshǐ")} marca una concesión hipotética y que suele ir seguida de ${zh("也", "yě")} o ${zh("还", "hái")}. AllSet dice que ${zh("哪怕", "nǎpà")} tiene un tono un poco más fuerte que ${zh("即使", "jíshǐ")}, y por eso se usa a menudo para dejar de lado casos hipotéticos más serios. Además, AllSet avisa de que lo que va después de ${zh("即使", "jíshǐ")} tiene que ser hipotético; si es un hecho real, se usa ${zh("虽然", "suīrán")}.</p>
      <h3>Con un sustantivo: ${zh("哪怕是", "nǎpà shì")}</h3>
      <p>Oxford glosa ${zh("哪怕", "nǎpà")} como «incluso en el caso de» y explica que, en ${zh("哪怕是", "nǎpà shì")}, el ${zh("是", "shì")} forma parte de la expresión: significa «aunque sea». Sirve cuando lo que sigue es una cosa o una persona, no una frase completa: ${zh("哪怕是最难的挑战，我也不放弃", "nǎpà shì zuì nán de tiǎozhàn, wǒ yě bù fàngqì")} sería «aunque sea el reto más difícil, no me rindo». Esta frase es de la lección.</p>
      <h3>Para decir «por más que»: ${zh("再", "zài")}</h3>
      <p>AllSet señala que después de ${zh("哪怕", "nǎpà")} aparece a menudo ${zh("再", "zài")}, para recalcar que lo que sigue no hará ninguna diferencia, casi como «no importa cuánto». Se parece a ${zh("不管", "bùguǎn")}, de «Sea como sea: ${zh("不管")} y ${zh("无论")}». Dartmouth muestra el mismo ${zh("再", "zài")} con ${zh("即使", "jíshǐ")}, y dice que ${zh("再", "zài")} puede añadirse a ${zh("即使", "jíshǐ")} o ocupar su lugar. Por eso ${zh("哪怕路再远，我也要去", "nǎpà lù zài yuǎn, wǒ yě yào qù")} dice «aunque el camino esté lejísimos, iré».</p>
      <p>El sílabo también lista ${zh("再……也……", "zài…… yě……")} como oración comprimida, sin ${zh("哪怕", "nǎpà")} delante. Como simplificación de la lección: son las mismas dos ideas, pero apretadas en una frase corta. Dartmouth muestra ${zh("再聪明也", "zài cōngmíng yě")}…, «por más listo que seas…», y la tercera frase de arriba, ${zh("路再远，我也要去", "lù zài yuǎn, wǒ yě yào qù")}, tiene la misma forma.</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("也", "yě")} antes del sujeto, como ${zh("哪怕很累，也我要去", "nǎpà hěn lèi, yě wǒ yào qù")}. Va después del sujeto y antes del verbo.</p>`,
    ejemplo: `
      <p>Quieres decir: «Aunque el trabajo sea muy duro, igual voy a estudiar con esfuerzo». Vamos por partes.</p>
      <ol class="pasos-ej">
        <li>Escribe el caso: ${zh("工作艰苦", "gōngzuò jiānkǔ")}, «el trabajo es duro».</li>
        <li>Pon ${zh("哪怕", "nǎpà")} al principio: ${zh("哪怕工作艰苦", "nǎpà gōngzuò jiānkǔ")}, «aunque el trabajo sea duro».</li>
        <li>Recalca con ${zh("再", "zài")} antes del adjetivo: ${zh("哪怕工作再艰苦", "nǎpà gōngzuò zài jiānkǔ")}, «por más duro que sea».</li>
        <li>Escribe el resultado, con ${zh("也", "yě")} antes del verbo: ${zh("我也要努力学习", "wǒ yě yào nǔlì xuéxí")}.</li>
        <li>Une las dos partes con una coma.</li>
      </ol>
      <p>Para comprobar, mira que ${zh("哪怕", "nǎpà")} abra la primera parte y que ${zh("也", "yě")} esté entre el sujeto y el verbo. Resultado: <span class="resultado">${zh("哪怕工作再艰苦，我也要努力学习", "nǎpà gōngzuò zài jiānkǔ, wǒ yě yào nǔlì xuéxí")} = «aunque el trabajo sea durísimo, igual voy a estudiar con esfuerzo»</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar ${zh("哪怕", "nǎpà")} para un hecho que ya pasó. Sirve para casos que imaginas.</p>`,
    vidaReal: `
      <p>Con esta estructura puedes hablar de metas y de esfuerzo:</p>
      <ul>
        <li>Decir que no cambiarás un plan pase lo que pase.</li>
        <li>Entender discursos o textos que animan a no rendirse.</li>
        <li>Leer la historia de alguien que logró algo con mucho esfuerzo.</li>
        <li>Contar qué retos aceptarías para llegar a una meta.</li>
        <li>Notar cuándo una frase suena más fuerte que otra, aunque diga casi lo mismo.</li>
        <li>Animar a un amigo que está a punto de rendirse.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «aunque el camino esté lejos, iré».</p>',
        respuesta: ['哪怕', '路', '再', '远', '我', '也', '要', '去'], pinyin: ['nǎpà', 'lù', 'zài', 'yuǎn', 'wǒ', 'yě', 'yào', 'qù'], lang: 'zh-Hans',
        pista: `<p>${zh("再", "zài")} va antes del adjetivo y ${zh("也", "yě")} antes del verbo.</p>`,
        solucion: `<p>${zh("哪怕路再远，我也要去", "nǎpà lù zài yuǎn, wǒ yě yào qù")}: ${zh("哪怕", "nǎpà")} abre el caso, ${zh("再", "zài")} recalca y ${zh("也", "yě")} va antes de ${zh("要去", "yào qù")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «aunque esté cansado, igual iré». ¿Qué frase está bien?</p>',
        opciones: [zh('哪怕很累，也我要去', 'nǎpà hěn lèi, yě wǒ yào qù'), zh('哪怕很累，我也要去', 'nǎpà hěn lèi, wǒ yě yào qù'), zh('我要去哪怕，很累也', 'wǒ yào qù nǎpà, hěn lèi yě'), zh('也哪怕很累，我要去', 'yě nǎpà hěn lèi, wǒ yào qù')], correcta: 1,
        pista: `<p>${zh("也", "yě")} va después del sujeto, justo antes del verbo.</p>`,
        solucion: `<p>${zh("我也要去", "wǒ yě yào qù")} pone ${zh("也", "yě")} entre el sujeto y el verbo, y el caso con ${zh("哪怕", "nǎpà")} va primero.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según AllSet, ¿para qué se añade ${zh("再", "zài")} después de ${zh("哪怕", "nǎpà")}?</p>`,
        opciones: ['Para decir que algo ya terminó', 'Para preguntar', 'Para recalcar que lo que sigue no cambia nada', 'Para decir «otra vez mañana»'], correcta: 2,
        pista: `<p>Se parece a ${zh("不管", "bùguǎn")}: «no importa cuánto».</p>`,
        solucion: `<p>${zh("再", "zài")} refuerza que, por más que sea así, el resultado no cambia.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según AllSet, ¿cómo es el tono de ${zh("哪怕", "nǎpà")} frente a ${zh("即使", "jíshǐ")}?</p>`,
        opciones: ['Un poco más fuerte', 'Más suave', 'Igual, y no se pueden usar juntas', 'Solo sirve para el futuro'], correcta: 0,
        pista: '<p>Por eso se usa para casos hipotéticos más serios.</p>',
        solucion: `<p>${zh("哪怕", "nǎpà")} tiene un tono un poco más fuerte que ${zh("即使", "jíshǐ")}.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("勇气")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['yǒng qì'],
        pista: '<p>La primera sílaba baja y sube; la segunda baja de golpe.</p>',
        solucion: `<p>${zh("勇气", "yǒngqì")}: <strong>yǒng qì</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("决心", "juéxīn")}.</p>`,
        respuestas: ['determinacion', 'la determinacion', 'decision firme', 'resolucion', 'empeno', 'firmeza', 'voluntad', 'decision'],
        pista: '<p>Es la fuerza de querer algo y no cambiar de idea.</p>',
        solucion: `<p>${zh("决心", "juéxīn")} es «determinación» o «decisión firme».</p>` },
    ],
    fuentes: [SILABO, DART_10, DART_25, OXFORD_VISUAL, ALLSET_NAPA, ALLSET_JISHI],
  });

  // ------------------------------------------------------------------
  L('Al contrario: 不但不…反而…', {
    objetivo: `Decir que pasó lo contrario de lo esperado con ${zh("不但不", "búdàn bù")}/${zh("不但没有", "búdàn méiyǒu")}…${zh("反而", "fǎn\u0027ér")}…, ponerlo en su lugar y compararlo con ${zh("不但", "búdàn")}…${zh("而且", "érqiě")}….`,
    explicacion: `
      <p>Tu amigo duerme diez horas para recuperarse, y al despertar está más cansado que antes. Esperabas una cosa y pasó la contraria. El chino marca ese giro con ${zh("反而", "fǎn\u0027ér")}. Las frases de ejemplo son de la lección:</p>
      <ul>
        <li>${zh("他睡了十个小时，不但没有恢复，反而更累了", "tā shuìle shí ge xiǎoshí, búdàn méiyǒu huīfù, fǎn\u0027ér gèng lèi le")}: «durmió diez horas; no solo no se recuperó, sino que está más cansado».</li>
        <li>${zh("我们沟通以后，矛盾不但没有改善，反而更糟糕了", "wǒmen gōutōng yǐhòu, máodùn búdàn méiyǒu gǎishàn, fǎn\u0027ér gèng zāogāo le")}: «después de hablar, el conflicto no solo no mejoró, sino que empeoró».</li>
        <li>${zh("他不但不承认，反而抱怨别人", "tā búdàn bù chéngrèn, fǎn\u0027ér bàoyuàn biérén")}: «no solo no lo admite, sino que se queja de los demás».</li>
      </ul>
      ${tabla([
        ['反而', "fǎn\u0027ér", 'al contrario, en vez de eso'], ['导致', 'dǎozhì', 'causar, llevar a (algo malo)'], ['造成', 'zàochéng', 'provocar, causar'], ['损失', 'sǔnshī', 'pérdida; perder'], ['伤害', 'shānghài', 'herir, hacer daño'],
        ['否认', 'fǒurèn', 'negar, no admitir'], ['承认', 'chéngrèn', 'admitir, reconocer'], ['抱怨', 'bàoyuàn', 'quejarse'], ['矛盾', 'máodùn', 'conflicto, desacuerdo'], ['沟通', 'gōutōng', 'comunicarse, hablar para entenderse'],
        ['改善', 'gǎishàn', 'mejorar'], ['恢复', 'huīfù', 'recuperarse, volver al estado normal'], ['情绪', 'qíngxù', 'estado de ánimo, emoción'], ['缓解', 'huǎnjiě', 'aliviar, calmar'], ['糟糕', 'zāogāo', 'malo, terrible'],
      ])}
      <h3>¿Qué quiere decir ${zh("反而", "fǎn\u0027ér")}?</h3>
      <p>Según AllSet, ${zh("反而", "fǎn\u0027ér")} significa «al contrario» o «en contraste», y aparece en la segunda parte de la frase. Normalmente la primera parte afirma algo y la segunda trae lo opuesto a lo que esperabas. Por eso quien habla se queda con una sorpresa: pasó lo contrario de lo lógico.</p>
      <p>Lo importante es el lugar. AllSet explica que ${zh("反而", "fǎn\u0027ér")} es un <strong>adverbio</strong>, y que va después del sujeto (si lo hay) y antes del verbo. Eso lo distingue de una conjunción como ${zh("但是", "dànshì")}, que va antes del sujeto. Otro detalle: como adverbio, ${zh("反而", "fǎn\u0027ér")} no se separa con coma del resto de la frase. En la tercera frase, el sujeto de la segunda parte se omite, y ${zh("反而", "fǎn\u0027ér")} queda pegado al verbo.</p>
      <h3>¿Cómo se arma con ${zh("不但不", "búdàn bù")} y ${zh("不但没有", "búdàn méiyǒu")}?</h3>
      <p>AllSet dice que ${zh("反而", "fǎn\u0027ér")} se usa a menudo con ${zh("不但没有", "búdàn méiyǒu")} o ${zh("不但不", "búdàn bù")}, y que el patrón significa «no solo no…, sino que, al contrario…». El sílabo lo lista entre las oraciones de suma, con ${zh("不但不/不但没有……，反而……", "búdàn bù/búdàn méiyǒu……, fǎn\u0027ér……")}. La primera parte niega lo que esperabas, y la segunda dice lo que pasó en su lugar. Así, en la primera frase, esperabas que se recuperara (${zh("恢复", "huīfù")}); no pasó, y en su lugar estaba más cansado.</p>
      <h3>¿En qué se diferencia de ${zh("不但", "búdàn")}…${zh("而且", "érqiě")}…?</h3>
      <p>Viste ${zh("不但", "búdàn")}…${zh("而且", "érqiě")}… en «No solo…sino también: ${zh("不但…而且…")}». ChinGram dice que esa estructura no solo enumera dos hechos: expresa un grado creciente, porque la segunda parte refuerza o amplía la primera. La nueva hace otra cosa: la segunda parte no suma, sino que da la vuelta.</p>
      ${cuadro(['Patrón', 'Qué hace la segunda parte', 'Ejemplo de la lección'], [
        [zh('不但', 'búdàn') + '…' + zh('而且', 'érqiě') + '…', 'Suma algo más fuerte', zh('他不但会做饭，而且做得很好吃', 'tā búdàn huì zuòfàn, érqiě zuò de hěn hǎochī')],
        [zh('不但不', 'búdàn bù') + '…' + zh('反而', 'fǎn\u0027ér') + '…', 'Da el resultado contrario', zh('他不但不承认，反而抱怨别人', 'tā búdàn bù chéngrèn, fǎn\u0027ér bàoyuàn biérén')],
      ])}
      <p>Una última mención: el sílabo lista en el mismo grupo el molde ${zh("不是……，还/还是……", "búshì……, hái/háishi……")}. Las fuentes de la lección no lo explican, así que aquí solo lo reconoces.</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("反而", "fǎn\u0027ér")} antes del sujeto o con coma detrás, como ${zh("反而，他更累了", "fǎn\u0027ér, tā gèng lèi le")}. Va pegado al verbo y sin coma.</p>`,
    ejemplo: `
      <p>Quieres decir: «Durmió diez horas; no solo no se recuperó, sino que está más cansado». Vamos por partes.</p>
      <ol class="pasos-ej">
        <li>Empieza con lo que se esperaba que ayudara: ${zh("他睡了十个小时", "tā shuìle shí ge xiǎoshí")}, «durmió diez horas».</li>
        <li>Niega lo que se esperaba, con ${zh("没有", "méiyǒu")} porque ya pasó: ${zh("不但没有恢复", "búdàn méiyǒu huīfù")}, «no solo no se recuperó».</li>
        <li>Escribe lo que pasó en su lugar, con ${zh("反而", "fǎn\u0027ér")} antes del verbo y sin coma detrás: ${zh("反而更累了", "fǎn\u0027ér gèng lèi le")}.</li>
        <li>Une las partes con comas.</li>
      </ol>
      <p>Para comprobar, mira que la segunda parte sea de verdad lo contrario de lo esperado. Si solo suma algo más, usa ${zh("而且", "érqiě")}. Resultado: <span class="resultado">${zh("他睡了十个小时，不但没有恢复，反而更累了", "tā shuìle shí ge xiǎoshí, búdàn méiyǒu huīfù, fǎn\u0027ér gèng lèi le")} = «durmió diez horas; no solo no se recuperó, sino que está más cansado»</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar ${zh("反而", "fǎn\u0027ér")} cuando el resultado no es lo contrario, sino solo algo extra. Ahí va ${zh("而且", "érqiě")}.</p>`,
    vidaReal: `
      <p>Con este giro cuentas cuando las cosas salen al revés:</p>
      <ul>
        <li>Contar que un remedio o un descanso no ayudó, sino que empeoró.</li>
        <li>Hablar de un conflicto que no mejora después de una charla.</li>
        <li>Entender noticias que explican consecuencias que nadie esperaba.</li>
        <li>Relatar una historia con un giro de sorpresa.</li>
        <li>Distinguir entre sumar un dato y dar la vuelta a una expectativa.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «no solo no se recuperó, sino que está más cansado».</p>',
        respuesta: ['他', '不但', '没有', '恢复', '反而', '更累了'], pinyin: ['tā', 'búdàn', 'méiyǒu', 'huīfù', 'fǎn\u0027ér', 'gèng lèi le'], lang: 'zh-Hans',
        pista: `<p>El sujeto va primero; ${zh("不但", "búdàn")} va después de él y ${zh("反而", "fǎn\u0027ér")} antes del verbo de la segunda parte.</p>`,
        solucion: `<p>${zh("他不但没有恢复，反而更累了", "tā búdàn méiyǒu huīfù, fǎn\u0027ér gèng lèi le")}: sujeto, la negación, y la vuelta con ${zh("反而", "fǎn\u0027ér")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «no solo no lo admite, sino que se queja de los demás». ¿Qué frase está bien?</p>',
        opciones: [zh('他不但不承认，反而，抱怨别人', 'tā búdàn bù chéngrèn, fǎn\u0027ér, bàoyuàn biérén'), zh('反而他不但不承认抱怨别人', 'fǎn\u0027ér tā búdàn bù chéngrèn bàoyuàn biérén'), zh('他不但不承认，反而抱怨别人', 'tā búdàn bù chéngrèn, fǎn\u0027ér bàoyuàn biérén'), zh('他反而不但不承认，抱怨别人', 'tā fǎn\u0027ér búdàn bù chéngrèn, bàoyuàn biérén')], correcta: 2,
        pista: `<p>${zh("反而", "fǎn\u0027ér")} va antes del verbo y sin coma detrás.</p>`,
        solucion: `<p>${zh("反而抱怨别人", "fǎn\u0027ér bàoyuàn biérén")} deja ${zh("反而", "fǎn\u0027ér")} pegado al verbo, sin coma.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿En cuál de estas situaciones usarías ${zh("反而", "fǎn\u0027ér")}?</p>`,
        opciones: ['Tomó la medicina y se sintió peor', 'Estudió mucho y sacó buena nota', 'Cocinó y luego comió', 'Llegó a casa y saludó'], correcta: 0,
        pista: '<p>Busca la situación en la que pasa lo contrario de lo que esperabas.</p>',
        solucion: `<p>${zh("反而", "fǎn\u0027ér")} marca que el resultado es lo opuesto a lo esperado: tomar la medicina debería ayudar, y empeoró.</p>` },
      { tipo: 'opciones', enunciado: '<p>Según ChinGram, ¿qué patrón suma un segundo punto más fuerte que el primero?</p>',
        opciones: [zh('不但不……反而……', 'búdàn bù…… fǎn\u0027ér……'), zh('不但……而且……', 'búdàn…… érqiě……'), zh('哪怕……也……', 'nǎpà…… yě……'), zh('一旦……就……', 'yídàn…… jiù……')], correcta: 1,
        pista: `<p>Es el que viste en «No solo…sino también: ${zh("不但…而且…")}».</p>`,
        solucion: `<p>${zh("不但……而且……", "búdàn…… érqiě……")} expresa un grado creciente; ${zh("不但不……反而……", "búdàn bù…… fǎn\u0027ér……")} da la vuelta.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("否认")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['fǒu rèn'],
        pista: '<p>La primera sílaba baja y sube; la segunda baja de golpe.</p>',
        solucion: `<p>${zh("否认", "fǒurèn")}: <strong>fǒu rèn</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("损失", "sǔnshī")}.</p>`,
        respuestas: ['perdida', 'la perdida', 'una perdida', 'perdidas', 'perder'],
        pista: '<p>Es lo que pasa cuando se pierde dinero, tiempo o algo valioso.</p>',
        solucion: `<p>${zh("损失", "sǔnshī")} es «pérdida» (y también «perder»).</p>` },
    ],
    fuentes: [SILABO, ALLSET_FANER, ALLSET_JURAN_FANER, ALLSET_FANER_XIANGFAN, CHINGRAM_BUDAN],
  });

  // ------------------------------------------------------------------
  L('Sacar conclusiones: 因而, 可见 y 从而', {
    objetivo: `Escribir una conclusión corta con ${zh("从而", "cóng\u0027ér")}, ${zh("因而", "yīn\u0027ér")}, ${zh("可见", "kějiàn")} y ${zh("总之", "zǒngzhī")}, y poner cada conector en su lugar de la frase.`,
    explicacion: `
      <p>Una encuesta no termina con los números: termina con una conclusión. Alguien pregunta a cien personas qué piensan, junta las respuestas y escribe: «por eso pasa esto», «se ve que…», «en resumen…». El chino tiene conectores para cada paso. Las frases de ejemplo son de la lección y los números son de ejemplo:</p>
      <ul>
        <li>${zh("老师做了问卷，从而了解同学的想法", "lǎoshī zuòle wènjuàn, cóng\u0027ér liǎojiě tóngxué de xiǎngfǎ")}: «la maestra hizo un cuestionario y así conoció lo que piensan los alumnos».</li>
        <li>${zh("这个月每天都下雨，因而去公园的人很少", "zhège yuè měi tiān dōu xià yǔ, yīn\u0027ér qù gōngyuán de rén hěn shǎo")}: «este mes llovió todos los días, por eso fue poca gente al parque».</li>
        <li>${zh("这么多人回答了问卷，可见大家很关心这个问题", "zhème duō rén huídále wènjuàn, kějiàn dàjiā hěn guānxīn zhège wèntí")}: «tanta gente respondió el cuestionario; se ve que a todos les importa el tema».</li>
      </ul>
      ${tabla([
        ['因而', "yīn\u0027ér", 'por eso, de modo que'], ['可见', 'kějiàn', 'se ve que, por lo tanto se nota'], ['从而', "cóng\u0027ér", 'así, de ese modo'], ['总之', 'zǒngzhī', 'en resumen, en fin'], ['数据', 'shùjù', 'datos'],
        ['调研', 'diàoyán', 'investigar, hacer un estudio de campo'], ['分析', 'fēnxī', 'analizar'], ['结论', 'jiélùn', 'conclusión'], ['统计', 'tǒngjì', 'hacer estadísticas, contar y sumar'], ['问卷', 'wènjuàn', 'cuestionario, encuesta'],
        ['现象', 'xiànxiàng', 'fenómeno, lo que se observa'], ['趋势', 'qūshì', 'tendencia'], ['因素', 'yīnsù', 'factor, elemento que influye'], ['显然', 'xiǎnrán', 'claramente, es evidente'], ['表明', 'biǎomíng', 'mostrar, dejar claro'],
      ])}
      <h3>¿Cómo dices «así, de ese modo»?</h3>
      <p>Según AllSet, ${zh("从而", "cóng\u0027ér")} se traduce más o menos como «así» o «de ese modo», y expresa el resultado que sigue a una acción. En la primera frase, la acción es hacer el cuestionario y el resultado es conocer lo que piensan los alumnos. AllSet da dos moldes: un medio seguido de ${zh("从而", "cóng\u0027ér")} y el resultado, y una frase completa, coma y ${zh("从而", "cóng\u0027ér")} para añadir lo que se logró. El sílabo lo incluye entre las conjunciones que unen frases.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que ${zh("从而", "cóng\u0027ér")} da la causa. Da el resultado de lo que hiciste, no el motivo.</p>
      <h3>¿Cómo dices «por eso» y «se ve que»?</h3>
      <p>El sílabo trae dos moldes en las oraciones de causa y efecto: ${zh("……，因而……", "……, yīn\u0027ér……")} y ${zh("……，可见……", "……, kějiàn……")}. No encontramos una explicación de uso para ellas en fuentes universitarias, así que esto es una simplificación de la lección: ${zh("因而", "yīn\u0027ér")} abre la <strong>consecuencia</strong> de lo que acabas de decir, como en la segunda frase, y ${zh("可见", "kějiàn")} abre lo que se nota o se deduce, como en la tercera. Las dos van después de una coma. En AllSet puedes ver otra palabra de consecuencia, ${zh("因此", "yīncǐ")}, que viste en «Por eso: ${zh("由于…因此…")}» y que ese sitio describe como propia de la escritura formal.</p>
      <h3>¿Cómo cierras un texto?</h3>
      <p>AllSet explica que ${zh("总之", "zǒngzhī")} resume o concluye lo dicho antes, y que el molde es una o varias frases, y luego ${zh("总之", "zǒngzhī")} con coma y el resumen. Por ejemplo, tras una lista: ${zh("有人喜欢跑步，有人喜欢游泳，总之，大家都爱运动", "yǒu rén xǐhuan pǎobù, yǒu rén xǐhuan yóuyǒng, zǒngzhī, dàjiā dōu ài yùndòng")}, «a unos les gusta correr y a otros nadar; en fin, a todos nos gusta el deporte».</p>
      <p>Un dato más: el sílabo lista el molde ${zh("……，为的是……", "……, wèi de shì……")}. AllSet lo agrupa en su tabla con las frases de propósito, es decir, las que dicen «para qué» se hace algo. No hay regla ni ejemplo en las fuentes, así que aquí solo lo reconoces.</p>
      <h3>El orden de un informe corto</h3>
      <p>Un informe de encuesta suele ir en este orden: primero el dato, luego lo que muestra (${zh("表明", "biǎomíng")}), después la conclusión con ${zh("可见", "kějiàn")} y al final el resumen con ${zh("总之", "zǒngzhī")}. Como simplificación de la lección, ${zh("因而", "yīn\u0027ér")} y ${zh("从而", "cóng\u0027ér")} van entre medio, cuando hay que decir qué trae un dato.</p>`,
    ejemplo: `
      <p>Escribes el informe de una encuesta. Los números son de ejemplo: «De cien alumnos, ochenta duermen poco». Vamos por partes.</p>
      <ol class="pasos-ej">
        <li>Escribe el dato: ${zh("一百个同学回答了问卷，八十个同学睡得很少", "yī bǎi ge tóngxué huídále wènjuàn, bāshí ge tóngxué shuì de hěn shǎo")}.</li>
        <li>Di qué muestra, con ${zh("表明", "biǎomíng")}: ${zh("数据表明，很多同学睡得很少", "shùjù biǎomíng, hěn duō tóngxué shuì de hěn shǎo")}.</li>
        <li>Saca la conclusión con ${zh("可见", "kějiàn")} después de una coma: ${zh("可见这是一个大问题", "kějiàn zhè shì yī gè dà wèntí")}.</li>
        <li>Cierra con ${zh("总之", "zǒngzhī")} y un resumen: ${zh("总之，同学们要早一点睡觉", "zǒngzhī, tóngxuémen yào zǎo yī diǎn shuìjiào")}.</li>
      </ol>
      <p>Para comprobar, mira que la última frase solo resuma. Resultado: <span class="resultado">${zh("数据表明，很多同学睡得很少，可见这是一个大问题。总之，同学们要早一点睡觉", "shùjù biǎomíng, hěn duō tóngxué shuì de hěn shǎo, kějiàn zhè shì yī gè dà wèntí. Zǒngzhī, tóngxuémen yào zǎo yī diǎn shuìjiào")} = «los datos muestran que muchos duermen poco; se ve que es un gran problema. En fin, hay que dormir más temprano»</span>.</p>
      <p class="nota"><strong>Error común:</strong> meter en la frase de ${zh("总之", "zǒngzhī")} un dato nuevo. Esa frase solo resume lo que ya dijiste.</p>`,
    vidaReal: `
      <p>Con estos conectores entiendes cómo se cierra un estudio o un informe:</p>
      <ul>
        <li>Leer los resultados de una encuesta en un artículo o en la escuela.</li>
        <li>Explicar a tu clase qué mostraron los datos que juntaste.</li>
        <li>Escribir una conclusión corta para un trabajo.</li>
        <li>Reconocer cuándo un texto ya está resumiendo.</li>
        <li>Distinguir entre el resultado de una acción y su motivo.</li>
        <li>Preparar un trabajo de clase con tus propias preguntas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «la maestra hizo un cuestionario y así conoció lo que piensan los alumnos».</p>',
        respuesta: ['老师', '做了问卷', '从而', '了解同学的想法'], pinyin: ['lǎoshī', 'zuòle wènjuàn', 'cóng\u0027ér', 'liǎojiě tóngxué de xiǎngfǎ'], lang: 'zh-Hans',
        pista: `<p>Primero la acción; ${zh("从而", "cóng\u0027ér")} abre el resultado.</p>`,
        solucion: `<p>${zh("老师做了问卷，从而了解同学的想法", "lǎoshī zuòle wènjuàn, cóng\u0027ér liǎojiě tóngxué de xiǎngfǎ")}: la acción va antes y el resultado, después de ${zh("从而", "cóng\u0027ér")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según AllSet, ¿qué expresa ${zh("从而", "cóng\u0027ér")}?</p>`,
        opciones: ['La causa de algo', 'El resultado que sigue a una acción', 'Una pregunta', 'Una lista de cosas'], correcta: 1,
        pista: '<p>Se traduce como «así» o «de ese modo».</p>',
        solucion: `<p>${zh("从而", "cóng\u0027ér")} expresa el resultado de lo que se hizo, no el motivo.</p>` },
      { tipo: 'opciones', enunciado: `<p>Completa: ${zh("有人喜欢跑步，有人喜欢游泳，____，大家都爱运动", "yǒu rén xǐhuan pǎobù, yǒu rén xǐhuan yóuyǒng, ____, dàjiā dōu ài yùndòng")}.</p>`,
        opciones: [zh('总之', 'zǒngzhī'), zh('从而', 'cóng\u0027ér'), zh('反而', 'fǎn\u0027ér'), zh('一旦', 'yídàn')], correcta: 0,
        pista: '<p>La última parte resume lo que dijeron las dos anteriores.</p>',
        solucion: `<p>${zh("总之", "zǒngzhī")} resume la lista: a unos les gusta correr, a otros nadar, y en fin, a todos el deporte.</p>` },
      { tipo: 'opciones', enunciado: `<p>En la lección, ¿qué quiere decir ${zh("可见", "kějiàn")} en ${zh("这么多人回答了问卷，可见大家很关心这个问题", "zhème duō rén huídále wènjuàn, kějiàn dàjiā hěn guānxīn zhège wèntí")}?</p>`,
        opciones: ['Aunque', 'Si llega a pasar', 'Se ve que', 'Al contrario'], correcta: 2,
        pista: '<p>La segunda parte es lo que se nota a partir de la primera.</p>',
        solucion: `<p>Como simplificación de la lección, ${zh("可见", "kějiàn")} abre lo que se nota: «se ve que a todos les importa».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("结论")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['jié lùn'],
        pista: '<p>La primera sílaba sube; la segunda baja de golpe.</p>',
        solucion: `<p>${zh("结论", "jiélùn")}: <strong>jié lùn</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("数据", "shùjù")}.</p>`,
        respuestas: ['datos', 'los datos', 'dato', 'cifras', 'las cifras'],
        pista: '<p>Son los números y hechos que se juntan en una encuesta.</p>',
        solucion: `<p>${zh("数据", "shùjù")} es «datos».</p>` },
    ],
    fuentes: [SILABO, ALLSET_CONGER, ALLSET_ZONGZHI, ALLSET_YINCI, ALLSET_SUBORD],
  });

  // F39 a F45 (lección 6)
  const CHINGRAM_DE = CHINGRAM('partícula estructural 得', 'structural-particle-de-%e5%be%97');
  const DART_8 = DART('Lesson 8, nota sobre 得 + 要命', '%e7%ac%ac%e5%85%ab%e8%af%be-lesson-8');
  const OXFORD_18 = { nombre: 'Universidad de Oxford (Reino Unido), CTCFL: notas de gramática de la lección 18 (en inglés)', url: 'https://www.ctcfl.ox.ac.uk/materials_chinese_lessons_18_grammar_notes/' };
  const MIT_DE = { nombre: 'MIT OpenCourseWare (EE. UU.), Wheatley, «Learning Chinese: A Foundation Course in Mandarin»: 8.3.1 Non-comparatives (en inglés)', url: 'https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/res21g_003_s_11.pdf' };
  const ALLSET_BUDELIAO = ALLSET('Adjectival complement "de budeliao"', 'Adjectival_complement_%22de_budeliao%22');
  const ALLSET_GRADO = ALLSET('Advanced degree complements', 'Advanced_degree_complements');

  // ------------------------------------------------------------------
  L('Describir cómo quedó algo: 得 con frases largas', {
    objetivo: `Describir cómo quedó una persona o una escena poniendo una frase entera después de ${zh("得", "de")}, y exagerar con ${zh("得不得了", "de bùdéliǎo")}.`,
    explicacion: `
      <p>Si alguien te dice «mi hermano jugó tanto que se cansó», quieres saber cuánto jugó. En chino ese «tanto que» lo hace la partícula ${zh("得", "de")}: lo que pasó va antes, y el resultado, después. Las frases de ejemplo son de la lección:</p>
      <ul>
        <li>${zh("他生气得大叫", "tā shēngqì de dà jiào")}: «se enojó tanto que gritó».</li>
        <li>${zh("今天热得谁都不想出去", "jīntiān rè de shéi dōu bù xiǎng chūqù")}: «hace tanto calor que nadie quiere salir».</li>
        <li>${zh("房间打扫得很干净", "fángjiān dǎsǎo de hěn gānjìng")}: «el cuarto quedó muy limpio».</li>
      </ul>
      ${tabla([
        ['不得了', 'bùdéliǎo', 'muchísimo, tremendo'], ['表情', 'biǎoqíng', 'expresión de la cara'], ['脸色', 'liǎnsè', 'color de la cara, aspecto'], ['眼泪', 'yǎnlèi', 'lágrimas'], ['微笑', 'wēixiào', 'sonreír; sonrisa'],
        ['身材', 'shēncái', 'figura, complexión'], ['打扮', 'dǎban', 'arreglarse, vestirse con cuidado'], ['整齐', 'zhěngqí', 'ordenado, en fila'], ['激烈', 'jīliè', 'intenso, reñido'], ['热烈', 'rèliè', 'caluroso, entusiasta'],
        ['平静', 'píngjìng', 'tranquilo, en calma'], ['疯狂', 'fēngkuáng', 'loco, desenfrenado'], ['吵', 'chǎo', 'ruidoso; discutir'], ['鼓掌', 'gǔzhǎng', 'aplaudir'], ['掌声', 'zhǎngshēng', 'aplausos'],
      ])}
      <h3>¿Qué puede ir después de ${zh("得", "de")}?</h3>
      <p>Según ChinGram, ${zh("得", "de")} no se traduce: es la marca que une un verbo o un adjetivo con lo que lo completa. Lo que sigue puede ser un adjetivo, un verbo o una frase verbal, una oración completa o una expresión hecha. En la primera frase de arriba va una frase verbal (${zh("大叫", "dà jiào")}) y en la segunda, una oración con su sujeto (${zh("谁都不想出去", "shéi dōu bù xiǎng chūqù")}). El sílabo de nivel 5 las ordena como una sola estructura, con tres formas: ${zh("得", "de")} más frase verbal, más sujeto y predicado, o más expresión fija. MIT dice lo mismo con un adjetivo: puede seguir ${zh("很", "hěn")} o hasta una oración entera. Y Oxford muestra que lo que va después de ${zh("得", "de")} es el resultado de la acción: el cuarto quedó limpio.</p>
      <h3>¿Y si el verbo lleva objeto?</h3>
      <p>ChinGram explica que entonces el verbo se repite: verbo, objeto, otra vez el verbo y luego ${zh("得", "de")} con el complemento. Su ejemplo es ${zh("弟弟打篮球打得很累", "dìdi dǎ lánqiú dǎ de hěn lèi")}, «mi hermano jugó tanto baloncesto que se cansó». A veces se omite el primer verbo: ${zh("弟弟篮球打得很累", "dìdi lánqiú dǎ de hěn lèi")}. La razón es que ${zh("得", "de")} necesita ir pegado al verbo, y el objeto estorba.</p>
      <h3>¿Cómo se niega?</h3>
      <p>Según ChinGram, para negar se pone ${zh("不", "bù")} delante del complemento, no delante del verbo: ${zh("孩子们站得不整齐", "háizimen zhàn de bù zhěngqí")}, «los niños no se pararon en fila». ChinGram añade que a este verbo no se le pegan ${zh("了", "le")}, ${zh("着", "zhe")} ni ${zh("过", "guo")}.</p>
      <h3>Cuando es «muchísimo»: ${zh("得不得了", "de bùdéliǎo")}</h3>
      <p>El sílabo define ${zh("形容词/心理动词+得+不得了", "xíngróngcí / xīnlǐ dòngcí + de + bùdéliǎo")} para un adjetivo o un verbo de sentimiento. AllSet dice que sugiere algo grave, aunque también puede ser positivo: ${zh("她高兴得不得了", "tā gāoxìng de bùdéliǎo")}, «está contentísima». También va con verbos de sentimiento, como ${zh("喜欢", "xǐhuan")}. En «Sentimientos y opiniones» viste ${zh("死了", "sǐ le")}, otra forma de exagerar; AllSet recuerda que tras un adjetivo hay pocas opciones de grado. Dartmouth da otras dos: ${zh("得要命", "de yàomìng")}, ${zh("得很", "de hěn")}. Aquí solo las reconoces.</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("不", "bù")} antes del verbo, como en ${zh("孩子们不站得整齐", "háizimen bù zhàn de zhěngqí")}. La negación va antes de lo que sigue a ${zh("得", "de")}.</p>`,
    ejemplo: `
      <p>Quieres decir: «El salón estaba tan ruidoso que nadie oía al maestro». Vamos por partes.</p>
      <ol class="pasos-ej">
        <li>Empieza por cómo estaba el salón: ${zh("教室很吵", "jiàoshì hěn chǎo")}, «el salón es ruidoso».</li>
        <li>Quita ${zh("很", "hěn")} y pon ${zh("得", "de")} justo detrás del adjetivo: ${zh("教室吵得", "jiàoshì chǎo de")}.</li>
        <li>Escribe el resultado como una oración completa: ${zh("谁都听不见老师说话", "shéi dōu tīngbujiàn lǎoshī shuōhuà")}, «nadie oye al maestro».</li>
        <li>Pega las dos partes, sin coma entre ellas, porque el resultado es parte de la misma frase.</li>
      </ol>
      <p>Para comprobar, mira que ${zh("得", "de")} quede pegado al adjetivo y que lo último sea el resultado, no la causa. Resultado: <span class="resultado">${zh("教室吵得谁都听不见老师说话", "jiàoshì chǎo de shéi dōu tīngbujiàn lǎoshī shuōhuà")} = «el salón está tan ruidoso que nadie oye al maestro»</span>.</p>
      <p class="nota"><strong>Error común:</strong> dejar ${zh("很", "hěn")} y ${zh("得", "de")} juntos. En esta estructura ${zh("得", "de")} reemplaza a ${zh("很", "hěn")}.</p>`,
    vidaReal: `
      <p>Con esta estructura puedes contar cómo quedó o cómo estaba algo:</p>
      <ul>
        <li>Describir una foto o un video a un amigo.</li>
        <li>Entender una reseña que dice cómo estaba un restaurante o una sala.</li>
        <li>Contar cómo te sentiste en un partido o en un concierto.</li>
        <li>Leer un cuento donde alguien llora, ríe o grita de emoción.</li>
        <li>Pasar de una palabra suelta a una frase con un resultado.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «el salón está tan ruidoso que nadie oye al maestro».</p>',
        respuesta: ['教室', '吵', '得', '谁都听不见老师说话'], pinyin: ['jiàoshì', 'chǎo', 'de', 'shéi dōu tīngbujiàn lǎoshī shuōhuà'], lang: 'zh-Hans',
        pista: '<p>Primero el sujeto, luego el adjetivo, luego la partícula y al final el resultado.</p>',
        solucion: `<p>${zh("教室吵得谁都听不见老师说话", "jiàoshì chǎo de shéi dōu tīngbujiàn lǎoshī shuōhuà")}: ${zh("得", "de")} va pegado al adjetivo y el resultado, después.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("他生气得大叫", "tā shēngqì de dà jiào")}?</p>`,
        opciones: ['Se enojó tanto que gritó', 'Gritó y por eso se enojó', 'No se enojó, solo gritó', 'Le gusta gritar'], correcta: 0,
        pista: '<p>Lo que va después de la partícula es el resultado.</p>',
        solucion: `<p>${zh("大叫", "dà jiào")} es lo que pasó por el enojo: «se enojó tanto que gritó».</p>` },
      { tipo: 'opciones', enunciado: `<p>En ${zh("弟弟打篮球打得很累", "dìdi dǎ lánqiú dǎ de hěn lèi")}, ¿por qué aparece dos veces ${zh("打", "dǎ")}?</p>`,
        opciones: ['Para decir que jugó dos veces', 'Porque el verbo lleva objeto y se repite antes de la partícula', 'Es un error de escritura', 'Para negar la frase'], correcta: 1,
        pista: '<p>ChinGram da la forma verbo, objeto, verbo, partícula, complemento.</p>',
        solucion: `<p>Según ChinGram, si el verbo lleva objeto (${zh("篮球", "lánqiú")}), el verbo se repite antes de ${zh("得", "de")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>¿Cuál dice «los niños no se pararon en fila»?</p>',
        opciones: [zh('孩子们不站得整齐', 'háizimen bù zhàn de zhěngqí'), zh('孩子们站得整齐不', 'háizimen zhàn de zhěngqí bù'), zh('孩子们站得不整齐', 'háizimen zhàn de bù zhěngqí'), zh('孩子们站整齐得不', 'háizimen zhàn zhěngqí de bù')], correcta: 2,
        pista: '<p>La negación va delante del complemento.</p>',
        solucion: `<p>${zh("孩子们站得不整齐", "háizimen zhàn de bù zhěngqí")}: ${zh("不", "bù")} se pone delante de lo que sigue a ${zh("得", "de")}.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("表情")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['biǎo qíng'],
        pista: '<p>La primera sílaba baja y sube; la segunda sube.</p>',
        solucion: `<p>${zh("表情", "biǎoqíng")}: <strong>biǎo qíng</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("微笑", "wēixiào")}.</p>`,
        respuestas: ['sonreir', 'sonrisa', 'una sonrisa', 'la sonrisa', 'sonreir con suavidad'],
        pista: '<p>Es lo que haces con la cara cuando estás contento, sin reír fuerte.</p>',
        solucion: `<p>${zh("微笑", "wēixiào")} es «sonreír» o «sonrisa».</p>` },
    ],
    fuentes: [SILABO, CHINGRAM_DE, DART_8, DART_6, OXFORD_18, MIT_DE, ALLSET_BUDELIAO, ALLSET_GRADO],
  });

  // F61 a F67 (lección 7)
  const DART_12 = DART('Lesson 12, nota sobre 下去', '%e7%ac%ac%e5%8d%81%e4%ba%8c%e8%af%be-lesson-12');
  const DART_30 = DART('Lesson 30, nota sobre 下来', '%e7%ac%ac%e4%b8%89%e5%8d%81%e8%af%be-lesson-30');
  const ALLSET_QILAI = ALLSET('Direction complement "-qilai"', 'Direction_complement_%22-qilai%22');
  const ALLSET_XIAQU = ALLSET('Result complement "-xiaqu"', 'Result_complement_%22-xiaqu%22');

  // ------------------------------------------------------------------
  L('Cambios de estado: 起来, 下来 y 下去', {
    objetivo: `Contar que algo empieza, sigue o queda fijo con ${zh("起来", "qǐlái")}, ${zh("下去", "xiàqù")} y ${zh("下来", "xiàlái")} después de un adjetivo o un verbo.`,
    explicacion: `
      <p>En el pronóstico del clima se oyen frases como «poco a poco empieza a hacer frío» o «la lluvia va a seguir». Cada una dice un cambio o una continuación. Las frases de ejemplo son de la lección:</p>
      <ul>
        <li>${zh("天气渐渐热起来了", "tiānqì jiànjiàn rè qǐlái le")}: «poco a poco empieza a hacer calor».</li>
        <li>${zh("这样的天气不会维持下去", "zhèyàng de tiānqì bú huì wéichí xiàqù")}: «este clima no se va a mantener».</li>
        <li>${zh("我要把你的电话号码记下来", "wǒ yào bǎ nǐ de diànhuà hàomǎ jì xiàlái")}: «voy a anotar tu número de teléfono».</li>
      </ul>
      ${tabla([
        ['渐渐', 'jiànjiàn', 'poco a poco'], ['逐渐', 'zhújiàn', 'poco a poco, gradualmente'], ['持续', 'chíxù', 'continuar, durar'], ['降水', 'jiàngshuǐ', 'precipitación, llover o nevar'], ['升温', 'shēngwēn', 'subir la temperatura'],
        ['暴雨', 'bàoyǔ', 'lluvia fuerte'], ['雾', 'wù', 'niebla'], ['湿', 'shī', 'húmedo, mojado'], ['冻', 'dòng', 'congelar, helar'], ['好转', 'hǎozhuǎn', 'mejorar'],
        ['缓慢', 'huǎnmàn', 'lento'], ['逐步', 'zhúbù', 'paso a paso'], ['维持', 'wéichí', 'mantener'], ['稳定', 'wěndìng', 'estable'], ['状态', 'zhuàngtài', 'estado, condición'],
      ])}
      <p>Ya viste estas palabras de dirección en «Dirección con sentido figurado: ${zh("起来")} y ${zh("下去")}». Ahora van después de adjetivos y de más verbos. Los nombres de los complementos son del sílabo, que en nivel 5 los reúne como uso de «estado»: ${zh("起来", "qǐlái")}, ${zh("下来", "xiàlái")}, ${zh("下去", "xiàqù")}, ${zh("过来", "guòlái")} y ${zh("过去", "guòqù")}.</p>
      <h3>Algo empieza: ${zh("起来", "qǐlái")}</h3>
      <p>AllSet dice que ${zh("起来", "qǐlái")}, con verbo o adjetivo y ${zh("了", "le")}, muestra que una acción o un estado empezó y sigue. Sus ejemplos son ${zh("天气热起来了", "tiānqì rè qǐlái le")} y ${zh("爷爷的身体好起来了", "yéye de shēntǐ hǎo qǐlái le")}, «la salud del abuelo va mejorando». Avisa de una condición: solo va con acciones espontáneas (cantar, saltar, conversar) o con estados (calor, frío, bueno), no con acciones planeadas. La forma ${zh("看起来", "kàn qǐlái")}, «parece», la viste en «Leer textos cortos».</p>
      <h3>Algo sigue: ${zh("下去", "xiàqù")}</h3>
      <p>Según Dartmouth, ${zh("下去", "xiàqù")} va después del verbo e indica que la acción sigue desde ahora hacia el futuro, y detrás no va objeto. Su ejemplo es ${zh("请说下去", "qǐng shuō xiàqù")}, «sigue hablando, por favor». También puede ir tras un adjetivo o verbo de estado con sentido negativo. AllSet agrega la negación ${zh("不下去", "bu xiàqù")}, «ya no puedo seguir», como en ${zh("这本书太难了，我读不下去了", "zhè běn shū tài nán le, wǒ dú bu xiàqù le")}. Si antes del verbo está ${zh("再", "zài")}, AllSet dice que se sugiere que, si todo sigue igual, algo malo va a pasar: ${zh("天气再热下去，我们就别出去了", "tiānqì zài rè xiàqù, wǒmen jiù bié chūqù le")}.</p>
      <h3>Algo queda fijo: ${zh("下来", "xiàlái")}</h3>
      <p>Dartmouth explica que ${zh("下来", "xiàlái")} marca que una acción se completó y que algo queda «fijado» o «establecido»: ${zh("记下来", "jì xiàlái")}: lo que anotas queda fijo en el papel. El mismo sitio da otro sentido, el de separar algo de un lugar: ${zh("请把我的书拿下来", "qǐng bǎ wǒ de shū ná xiàlái")}, «por favor, bájame mi libro».</p>
      <h3>«Al hacerlo»: otro ${zh("起来", "qǐlái")}</h3>
      <p>Dartmouth y MIT dan un ${zh("起来", "qǐlái")} distinto, que significa «cuando se trata de hacerlo» y va al inicio de la frase: ${zh("这件事说起来容易，做起来难", "zhè jiàn shì shuō qǐlái róngyì, zuò qǐlái nán")}, «decirlo es fácil, hacerlo es difícil».</p>
      <p>Las palabras ${zh("渐渐", "jiànjiàn")} y ${zh("逐渐", "zhújiàn")} significan «poco a poco» y se usan antes del adjetivo o verbo, como cualquier adverbio. Como simplificación de la lección, ${zh("渐渐", "jiànjiàn")} va bien con ${zh("起来", "qǐlái")}.</p>
      <p class="nota"><strong>Trampa común:</strong> usar el ${zh("起来", "qǐlái")} de «empezar» con una acción planeada. Con ${zh("起来", "qǐlái")} van acciones espontáneas o estados.</p>`,
    ejemplo: `
      <p>Quieres decir: «Poco a poco empieza a hacer frío». Vamos por partes.</p>
      <ol class="pasos-ej">
        <li>Empieza con el estado: ${zh("天气冷", "tiānqì lěng")}, «hace frío».</li>
        <li>Pon ${zh("起来", "qǐlái")} justo después del adjetivo, porque el frío empieza: ${zh("天气冷起来", "tiānqì lěng qǐlái")}.</li>
        <li>Añade ${zh("了", "le")} al final, porque algo cambió: ${zh("天气冷起来了", "tiānqì lěng qǐlái le")}.</li>
        <li>Pon ${zh("渐渐", "jiànjiàn")} antes del adjetivo, para decir «poco a poco»: ${zh("天气渐渐冷起来了", "tiānqì jiànjiàn lěng qǐlái le")}.</li>
      </ol>
      <p>Para comprobar, lee en voz alta y busca este orden: sujeto, «poco a poco», adjetivo, ${zh("起来", "qǐlái")} y ${zh("了", "le")}. Si falta alguna pieza, la frase suena incompleta. Resultado: <span class="resultado">${zh("天气渐渐冷起来了", "tiānqì jiànjiàn lěng qǐlái le")} = «poco a poco empieza a hacer frío»</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner ${zh("起来", "qǐlái")} antes del adjetivo, como en ${zh("天气起来冷了", "tiānqì qǐlái lěng le")}. Va después.</p>`,
    vidaReal: `
      <p>Con estas palabras puedes seguir cómo cambian las cosas:</p>
      <ul>
        <li>Entender un pronóstico que anuncia frío, calor o lluvia.</li>
        <li>Decir que alguien se está recuperando poco a poco.</li>
        <li>Pedir a una persona que siga contando su historia.</li>
        <li>Explicar que una fecha o un plan ya quedó decidido.</li>
        <li>Avisar que no puedes seguir con algo que te cansa.</li>
        <li>Leer noticias del tiempo sin perder el hilo.</li>
        <li>Entender cuándo una cosa cambia y cuándo se queda igual.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «poco a poco empieza a hacer frío».</p>',
        respuesta: ['天气', '渐渐', '冷', '起来', '了'], pinyin: ['tiānqì', 'jiànjiàn', 'lěng', 'qǐlái', 'le'], lang: 'zh-Hans',
        pista: '<p>El adjetivo va antes de la palabra de dirección.</p>',
        solucion: `<p>${zh("天气渐渐冷起来了", "tiānqì jiànjiàn lěng qǐlái le")}: ${zh("渐渐", "jiànjiàn")} antes del adjetivo, y ${zh("起来", "qǐlái")} y ${zh("了", "le")} después.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("请说下去", "qǐng shuō xiàqù")}?</p>`,
        opciones: ['Empieza a hablar', 'Sigue hablando', 'Deja de hablar', 'Habla más bajo'], correcta: 1,
        pista: '<p>Según Dartmouth, la palabra de dirección indica que la acción sigue.</p>',
        solucion: `<p>${zh("下去", "xiàqù")} indica que la acción continúa: «sigue hablando, por favor».</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("我要把你的电话号码记下来", "wǒ yào bǎ nǐ de diànhuà hàomǎ jì xiàlái")}?</p>`,
        opciones: ['Voy a borrar tu número', 'Voy a anotar tu número de teléfono', 'Voy a llamarte ahora', 'Voy a perder tu número'], correcta: 1,
        pista: '<p>Dartmouth dice que esta palabra marca algo «fijado» o «establecido».</p>',
        solucion: `<p>${zh("记下来", "jì xiàlái")} indica que lo anotado queda fijo en el papel.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué significa ${zh("这件事说起来容易，做起来难", "zhè jiàn shì shuō qǐlái róngyì, zuò qǐlái nán")}?</p>`,
        opciones: ['Esto es fácil de hacer', 'Esto es difícil de decir', 'Decirlo es fácil, hacerlo es difícil', 'Nadie lo dijo'], correcta: 2,
        pista: '<p>Aquí la palabra de dirección significa «cuando se trata de hacerlo».</p>',
        solucion: `<p>${zh("说起来", "shuō qǐlái")} es «al decirlo» y ${zh("做起来", "zuò qǐlái")}, «al hacerlo»: decirlo es fácil, hacerlo es difícil.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("渐渐")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['jiàn jiàn'],
        pista: '<p>Las dos sílabas bajan de golpe.</p>',
        solucion: `<p>${zh("渐渐", "jiànjiàn")}: <strong>jiàn jiàn</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("湿", "shī")}.</p>`,
        respuestas: ['humedo', 'mojado', 'mojada', 'humeda', 'humedad'],
        pista: '<p>Es lo contrario de seco.</p>',
        solucion: `<p>${zh("湿", "shī")} es «húmedo» o «mojado».</p>` },
    ],
    fuentes: [SILABO, ALLSET_QILAI, ALLSET_XIAQU, DART_12, DART_30, DART_13, DART_23, MIT_DE],
  });

  // F68 a F79 (lección 8)
  const DART_15 = DART('Lesson 15, notas sobre 毕竟 y 绝对', '%e7%ac%ac%e5%8d%81%e4%ba%94%e8%af%be-lesson-15');
  const DART_28 = DART('Lesson 28, nota sobre 居然', '%e7%ac%ac%e4%ba%8c%e5%8d%81%e5%85%ab%e8%af%be-lesson-28');
  const DART_7 = DART('Lesson 7, nota sobre 简直', '%e7%ac%ac%e4%b8%83%e8%af%be-lesson-7');
  const DART_17 = DART('Lesson 17, ejemplos de 的确', '%e7%ac%ac%e5%8d%81%e4%b8%83%e8%af%be-lesson-17');
  const DART_3 = DART('Lesson 3, ejemplos de 根本', '%e7%ac%ac%e4%b8%80%e8%af%be-lesson-3');
  const ALLSET_BIJING = ALLSET('Expressing "after all" with "bijing"', 'Expressing_%22after_all%22_with_%22bijing%22');
  const ALLSET_FANZHENG = ALLSET('Expressing "anyway" with "fanzheng"', 'Expressing_%22anyway%22_with_%22fanzheng%22');
  const ALLSET_GUORAN = ALLSET('Expressing "as expected" with "guoran"', 'Expressing_%22as_expected%22_with_%22guoran%22');
  const ALLSET_JINGRAN = ALLSET('Expressing the unexpected with "jingran"', 'Expressing_the_unexpected_with_%22jingran%22');
  const ALLSET_GENBEN = ALLSET('Comparing "genben" and "daodi"', 'Comparing_%22genben%22_and_%22daodi%22');
  const ALLSET_JIANZHI = ALLSET('Expressing "simply" with "jianzhi"', 'Expressing_%22simply%22_with_%22jianzhi%22');

  // ------------------------------------------------------------------
  L('Decir lo que piensas: 毕竟, 居然, 反正 y 简直', {
    objetivo: `Dar tu actitud sobre un hecho con ${zh("毕竟", "bìjìng")}, ${zh("居然", "jūrán")}, ${zh("反正", "fǎnzhèng")} y ${zh("简直", "jiǎnzhí")}, y reconocer ${zh("果然", "guǒrán")}, ${zh("根本", "gēnběn")}, ${zh("的确", "díquè")} y ${zh("绝对", "juéduì")}.`,
    explicacion: `
      <p>Al hablar no solo cuentas hechos: también dices qué piensas de ellos. «Después de todo», «qué sorpresa», «de todos modos», «es una exageración». En chino esas actitudes van en pequeñas palabras. Las frases de ejemplo son de la lección:</p>
      <ul>
        <li>${zh("弟弟毕竟还小，别生气", "dìdi bìjìng hái xiǎo, bié shēngqì")}: «mi hermano, después de todo, es pequeño; no te enojes».</li>
        <li>${zh("他才八岁，居然会做饭", "tā cái bā suì, jūrán huì zuòfàn")}: «tiene solo ocho años y, sorprendentemente, cocina».</li>
        <li>${zh("反正我要去", "fǎnzhèng wǒ yào qù")}: «de todos modos, yo voy».</li>
        <li>${zh("今天简直太热了", "jīntiān jiǎnzhí tài rè le")}: «hoy hace un calor exagerado».</li>
      </ul>
      ${tabla([
        ['毕竟', 'bìjìng', 'después de todo'], ['居然', 'jūrán', 'sorprendentemente'], ['反正', 'fǎnzhèng', 'de todos modos'], ['简直', 'jiǎnzhí', 'realmente, nada menos que'], ['果然', 'guǒrán', 'tal como se esperaba'],
        ['根本', 'gēnběn', 'para nada, de raíz'], ['的确', 'díquè', 'en efecto, de verdad'], ['绝对', 'juéduì', 'absolutamente'], ['难得', 'nándé', 'raro, difícil de conseguir'], ['意外', 'yìwài', 'inesperado; accidente'],
        ['偶然', 'ǒurán', 'por casualidad'], ['了不起', 'liǎobuqǐ', 'admirable, extraordinario'], ['难以', 'nányǐ', 'difícil de'], ['无奈', 'wúnài', 'sin remedio'], ['遗憾', 'yíhàn', 'lástima; lamentable'],
      ])}
      <h3>«Después de todo»: ${zh("毕竟", "bìjìng")}</h3>
      <p>Según Dartmouth, ${zh("毕竟", "bìjìng")} va al principio o en medio de la frase, y no se usa en preguntas. AllSet añade que sirve para subrayar una razón o una característica, como en «es solo un niño, después de todo». También se arma con ${zh("虽然", "suīrán")}…${zh("但", "dàn")}: ${zh("他虽然很吵，但毕竟是孩子", "tā suīrán hěn chǎo, dàn bìjìng shì háizi")}.</p>
      <h3>«Qué sorpresa»: ${zh("居然", "jūrán")}</h3>
      <p>Dartmouth dice que ${zh("居然", "jūrán")} va después del sujeto y marca algo inesperado. Puede ser casi un elogio, cuando algo se logró contra todo pronóstico, o una queja, cuando algo no debería haber pasado. AllSet explica que ${zh("竟然", "jìngrán")}, que viste en «Incluso: ${zh("连…也/都…")}», significa lo mismo pero es menos intenso. En cambio ${zh("果然", "guǒrán")} es casi lo opuesto: dice que algo pasó tal como se esperaba. Y si la frase es ${zh("不但不", "búdàn bù")}…, como en «Al contrario: ${zh("不但不…反而…")}», AllSet pide ${zh("反而", "fǎn'ér")}; ahí no va ${zh("居然", "jūrán")}.</p>
      <h3>«De todos modos»: ${zh("反正", "fǎnzhèng")}</h3>
      <p>AllSet explica que ${zh("反正", "fǎnzhèng")} deja de lado lo anterior y va tras una coma o una pausa. También presenta la razón de una decisión, antes o después de ella, y puede ir con ${zh("不管", "bùguǎn")}: ${zh("不管他去不去，反正我要去", "bùguǎn tā qù bu qù, fǎnzhèng wǒ yào qù")}.</p>
      <h3>«Es una exageración»: ${zh("简直", "jiǎnzhí")}</h3>
      <p>Dartmouth explica que ${zh("简直", "jiǎnzhí")} subraya que algo es extremo y suena a exageración. Va con ${zh("是", "shì")} y ${zh("像", "xiàng")}, y se usa mucho en frases negativas. Con un adjetivo, AllSet avisa de que no va seguido de un adjetivo solo ni de ${zh("很", "hěn")}; se usa ${zh("太", "tài")}…${zh("了", "le")} o …${zh("极了", "jí le")}. Un ejemplo de Dartmouth es ${zh("这里的风景简直太漂亮了", "zhèlǐ de fēngjǐng jiǎnzhí tài piàoliang le")}.</p>
      <h3>Cuatro más para reconocer</h3>
      <p>${zh("根本", "gēnběn")} refuerza una negación y va antes de ${zh("不", "bù")} o ${zh("没", "méi")}: ${zh("他根本没去过中国", "tā gēnběn méi qùguo Zhōngguó")}. ${zh("的确", "díquè")} confirma algo: ${zh("她的确是个好学生", "tā díquè shì ge hǎo xuésheng")}. ${zh("绝对", "juéduì")} va antes de ${zh("不", "bù")}: ${zh("我绝对不相信他说的话", "wǒ juéduì bù xiāngxìn tā shuō de huà")}. Esos tres son ejemplos de Dartmouth, y ${zh("果然", "guǒrán")} es regla de AllSet.</p>
      <p class="nota"><strong>Trampa común:</strong> decir ${zh("简直很热", "jiǎnzhí hěn rè")}. Con ${zh("简直", "jiǎnzhí")} se dice ${zh("简直太热了", "jiǎnzhí tài rè le")}.</p>`,
    ejemplo: `
      <p>Quieres decir: «Mi hermano tiene ocho años y, sorprendentemente, cocina; es admirable». Vamos por partes.</p>
      <ol class="pasos-ej">
        <li>Escribe el hecho: ${zh("弟弟会做饭", "dìdi huì zuòfàn")}, «mi hermano cocina».</li>
        <li>Añade la edad como contexto: ${zh("弟弟才八岁", "dìdi cái bā suì")}, «apenas tiene ocho años».</li>
        <li>Pon ${zh("居然", "jūrán")} después del sujeto y antes del verbo: ${zh("弟弟才八岁，居然会做饭", "dìdi cái bā suì, jūrán huì zuòfàn")}.</li>
        <li>Cierra con tu comentario, que ${zh("居然", "jūrán")} permite: ${zh("真了不起", "zhēn liǎobuqǐ")}.</li>
      </ol>
      <p>Para comprobar, mira que ${zh("居然", "jūrán")} quede justo antes de lo sorprendente y que tu comentario venga al final, separado por una coma. Resultado: <span class="resultado">${zh("弟弟才八岁，居然会做饭，真了不起", "dìdi cái bā suì, jūrán huì zuòfàn, zhēn liǎobuqǐ")} = «mi hermano tiene solo ocho años y, sorprendentemente, cocina; es admirable»</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner ${zh("居然", "jūrán")} al inicio de la frase, antes del sujeto. Va después del sujeto.</p>`,
    vidaReal: `
      <p>Estas palabras sirven para opinar, no solo para contar:</p>
      <ul>
        <li>Mostrar sorpresa ante algo que no esperabas.</li>
        <li>Defender a alguien recordando una razón.</li>
        <li>Decidir algo sin que importen las demás opciones.</li>
        <li>Exagerar para hacer reír, como en una conversación con amigos.</li>
        <li>Entender el tono de un comentario o de una reseña.</li>
        <li>Notar cuándo alguien exagera a propósito para dar énfasis.</li>
        <li>Leer subtítulos o mensajes sabiendo qué actitud muestra quien escribe.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «mi hermano tiene solo ocho años y, sorprendentemente, cocina».</p>',
        respuesta: ['弟弟', '才八岁', '居然', '会做饭'], pinyin: ['dìdi', 'cái bā suì', 'jūrán', 'huì zuòfàn'], lang: 'zh-Hans',
        pista: '<p>La palabra de sorpresa va antes de lo sorprendente.</p>',
        solucion: `<p>${zh("弟弟才八岁，居然会做饭", "dìdi cái bā suì, jūrán huì zuòfàn")}: ${zh("居然", "jūrán")} va antes del verbo que sorprende.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según AllSet, ¿cuál es casi lo opuesto de ${zh("居然", "jūrán")}, porque dice que algo pasó como se esperaba?</p>`,
        opciones: [zh('反正', 'fǎnzhèng'), zh('果然', 'guǒrán'), zh('毕竟', 'bìjìng'), zh('简直', 'jiǎnzhí')], correcta: 1,
        pista: '<p>Se traduce como «tal como se esperaba».</p>',
        solucion: `<p>${zh("果然", "guǒrán")} dice que algo salió como se pensaba; ${zh("居然", "jūrán")} dice que fue una sorpresa.</p>` },
      { tipo: 'opciones', enunciado: `<p>Completa: ${zh("不管他去不去，____我要去", "bùguǎn tā qù bu qù, ____ wǒ yào qù")}.</p>`,
        opciones: [zh('居然', 'jūrán'), zh('反正', 'fǎnzhèng'), zh('果然', 'guǒrán'), zh('毕竟', 'bìjìng')], correcta: 1,
        pista: '<p>La frase dice: sea como sea, voy.</p>',
        solucion: `<p>${zh("反正", "fǎnzhèng")} deja de lado lo anterior («de todos modos») y va muy bien con ${zh("不管", "bùguǎn")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>¿Cuál dice «hoy hace un calor exagerado»?</p>',
        opciones: [zh('今天简直很热', 'jīntiān jiǎnzhí hěn rè'), zh('今天简直热', 'jīntiān jiǎnzhí rè'), zh('今天简直太热了', 'jīntiān jiǎnzhí tài rè le'), zh('今天很简直热', 'jīntiān hěn jiǎnzhí rè')], correcta: 2,
        pista: `<p>AllSet avisa de que ${zh("简直", "jiǎnzhí")} no va con ${zh("很", "hěn")}.</p>`,
        solucion: `<p>Con ${zh("简直", "jiǎnzhí")} un adjetivo necesita ${zh("太", "tài")}…${zh("了", "le")}, no ${zh("很", "hěn")}.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("毕竟")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['bì jìng'],
        pista: '<p>Las dos sílabas bajan de golpe.</p>',
        solucion: `<p>${zh("毕竟", "bìjìng")}: <strong>bì jìng</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("遗憾", "yíhàn")}.</p>`,
        respuestas: ['lastima', 'una lastima', 'es una lastima', 'pena', 'lamentable', 'lamentar', 'lamento', 'pesar', 'arrepentimiento'],
        pista: '<p>Es lo que sientes cuando algo no salió como querías.</p>',
        solucion: `<p>${zh("遗憾", "yíhàn")} es «lástima» o «lamentable».</p>` },
    ],
    fuentes: [SILABO, DART_15, DART_28, DART_7, DART_17, DART_3, ALLSET_BIJING, ALLSET_FANZHENG, ALLSET_GUORAN, ALLSET_JINGRAN, ALLSET_JURAN_FANER, ALLSET_GENBEN, ALLSET_JIANZHI],
  });

  // F60, F79 a F81 (lección 9)
  const ALLSET_SHIDE = ALLSET('Expressing "similar to" with "gen... shide"', 'Expressing_%22similar_to%22_with_%22gen...shide%22');
  const ALLSET_SIHU = ALLSET('Expressing "as if" with "sihu"', 'Expressing_%22as_if%22_with_%22sihu%22');

  // ------------------------------------------------------------------
  L('Como si: 似的 y 仿佛', {
    objetivo: `Describir con imágenes usando ${zh("似的", "shìde")}, ${zh("仿佛", "fǎngfú")}, ${zh("似乎", "sìhū")} y ${zh("如同", "rútóng")}, y leer un texto corto que reúne varios conectores de la unidad.`,
    explicacion: `
      <p>¿Cómo describes a alguien muy rápido o la luz de una tarde? Comparando: «corre como el viento», «como si nada hubiera pasado». El chino tiene palabras para eso. Las frases de ejemplo son de la lección:</p>
      <ul>
        <li>${zh("他跑得像风似的", "tā pǎo de xiàng fēng shìde")}: «corre como el viento».</li>
        <li>${zh("他笑了，仿佛什么都没发生", "tā xiào le, fǎngfú shénme dōu méi fāshēng")}: «sonrió, como si no hubiera pasado nada».</li>
        <li>${zh("掌声如同暴雨", "zhǎngshēng rútóng bàoyǔ")}: «los aplausos fueron como una lluvia fuerte».</li>
        <li>${zh("他今天似乎不太高兴", "tā jīntiān sìhū bú tài gāoxìng")}: «hoy parece que no está muy contento».</li>
      </ul>
      ${tabla([
        ['似的', 'shìde', 'como, parecido a'], ['仿佛', 'fǎngfú', 'como si'], ['似乎', 'sìhū', 'parece que'], ['如同', 'rútóng', 'como, igual que'], ['形容', 'xíngróng', 'describir'],
        ['比喻', 'bǐyù', 'comparación, metáfora'], ['想象', 'xiǎngxiàng', 'imaginar'], ['神秘', 'shénmì', 'misterioso'], ['天空', 'tiānkōng', 'cielo'], ['光线', 'guāngxiàn', 'luz, rayos'],
        ['色彩', 'sècǎi', 'color, colorido'], ['五颜六色', 'wǔyán-liùsè', 'de mil colores'], ['生动', 'shēngdòng', 'vivo, expresivo'], ['描述', 'miáoshù', 'describir, relatar'], ['画面', 'huàmiàn', 'imagen, escena'],
      ])}
      <h3>Parecido a algo: ${zh("似的", "shìde")}</h3>
      <p>Según AllSet, ${zh("跟", "gēn")}…${zh("似的", "shìde")} equivale a ${zh("像", "xiàng")}…${zh("一样", "yíyàng")}. ${zh("似的", "shìde")} es una partícula que va después de un sustantivo, un pronombre o un adjetivo, y marca parecido; se usa mucho en comparaciones y en textos descriptivos. AllSet avisa de que el primer carácter de ${zh("似的", "shìde")} puede leerse «shì» o «sì», y el sílabo da «shìde». El sílabo solo lista ${zh("似的", "shìde")} como partícula. El molde ${zh("像", "xiàng")}…${zh("似的", "shìde")} de la primera frase es una simplificación de la lección: la comparación va entre las dos piezas.</p>
      <h3>«Parece que»: ${zh("似乎", "sìhū")}</h3>
      <p>AllSet, en una página breve, dice que ${zh("似乎", "sìhū")} es un adverbio que va después del sujeto, para juicios que no son del todo seguros: ${zh("他今天似乎不太高兴", "tā jīntiān sìhū bú tài gāoxìng")}, «hoy parece algo molesto». También sirve cuando algo parece de una manera pero es distinto.</p>
      <h3>«Como si»: ${zh("仿佛", "fǎngfú")} y ${zh("如同", "rútóng")}</h3>
      <p>No encontramos una explicación de uso de ${zh("仿佛", "fǎngfú")} ni de ${zh("如同", "rútóng")} en fuentes universitarias. El sílabo las lista: ${zh("仿佛", "fǎngfú")} junto a ${zh("似乎", "sìhū")} como adverbio de manera, y ${zh("如同", "rútóng")} como verbo. Como simplificación de la lección, ${zh("仿佛", "fǎngfú")} abre una imagen con «como si», como en la segunda frase, y ${zh("如同", "rútóng")} une dos cosas parecidas, como en la tercera.</p>
      <h3>Una comparación exagerada</h3>
      <p>En «Decir lo que piensas» viste ${zh("简直", "jiǎnzhí")}. AllSet lo une con ${zh("像", "xiàng")} para una comparación exagerada. Con eso armas: ${zh("这里的色彩简直像一幅画", "zhèlǐ de sècǎi jiǎnzhí xiàng yì fú huà")}, «aquí los colores son casi un cuadro».</p>
      <p>Estas comparaciones se llaman figuras retóricas; tienes más en la lección «Figuras retóricas», de Lectura.</p>
      <h3>Un texto para cerrar la unidad</h3>
      <p>Lee este texto de ejemplo, con datos inventados, y busca los conectores de la unidad: ${zh("一百个同学回答了问卷。数据表明，很多同学一旦有时间就看书，有的同学居然每天都看。可见大家很爱看书。总之，书毕竟对大家很重要", "yì bǎi ge tóngxué huídále wènjuàn. Shùjù biǎomíng, hěn duō tóngxué yídàn yǒu shíjiān jiù kàn shū, yǒu de tóngxué jūrán měi tiān dōu kàn. Kějiàn dàjiā hěn ài kàn shū. Zǒngzhī, shū bìjìng duì dàjiā hěn zhòngyào")}.</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("似的", "shìde")} al principio. Va al final de la comparación.</p>`,
    ejemplo: `
      <p>Quieres decir: «El cielo está de mil colores, como un cuadro». Vamos por partes.</p>
      <ol class="pasos-ej">
        <li>Escribe lo que describes: ${zh("天空五颜六色", "tiānkōng wǔyán-liùsè")}, «el cielo es de mil colores».</li>
        <li>Elige con qué lo comparas: ${zh("一幅画", "yì fú huà")}, «un cuadro».</li>
        <li>Une las dos ideas con ${zh("如同", "rútóng")}, que significa «como»: ${zh("天空如同一幅画", "tiānkōng rútóng yì fú huà")}.</li>
        <li>Si prefieres «como si», pon ${zh("仿佛", "fǎngfú")} antes de la imagen: ${zh("天空五颜六色，仿佛一幅画", "tiānkōng wǔyán-liùsè, fǎngfú yì fú huà")}.</li>
      </ol>
      <p>Para comprobar, pregúntate si lo primero se parece a lo segundo y si la imagen te ayuda a ver la escena. Resultado: <span class="resultado">${zh("天空五颜六色，仿佛一幅画", "tiānkōng wǔyán-liùsè, fǎngfú yì fú huà")} = «el cielo es de mil colores, como si fuera un cuadro»</span>.</p>
      <p class="nota"><strong>Error común:</strong> comparar cosas que no se parecen. Una buena imagen une dos cosas que sí comparten algo.</p>`,
    vidaReal: `
      <p>Con estas palabras entiendes y haces descripciones vivas:</p>
      <ul>
        <li>Leer cuentos y poemas con imágenes y comparaciones.</li>
        <li>Describir un paisaje, una comida o una persona con más color.</li>
        <li>Entender reseñas que dicen cómo se veía o se sentía un lugar.</li>
        <li>Expresar que algo no es seguro con «parece que».</li>
        <li>Practicar la imaginación al contar una escena.</li>
        <li>Entender cómo una cosa se parece a otra en un anuncio.</li>
        <li>Escribir una descripción corta para un trabajo de clase.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «corre como el viento».</p>',
        respuesta: ['他', '跑得', '像', '风', '似的'], pinyin: ['tā', 'pǎo de', 'xiàng', 'fēng', 'shìde'], lang: 'zh-Hans',
        pista: '<p>La comparación va entre la palabra «como» y la partícula final.</p>',
        solucion: `<p>${zh("他跑得像风似的", "tā pǎo de xiàng fēng shìde")}: ${zh("似的", "shìde")} cierra la comparación.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según AllSet, ¿a qué equivale ${zh("跟", "gēn")}…${zh("似的", "shìde")}?</p>`,
        opciones: [zh('像…一样', 'xiàng… yíyàng'), zh('一旦…就…', 'yídàn… jiù…'), zh('哪怕…也…', 'nǎpà… yě…'), zh('不但…而且…', 'búdàn… érqiě…')], correcta: 0,
        pista: '<p>Las dos expresan parecido.</p>',
        solucion: `<p>AllSet dice que ${zh("跟", "gēn")}…${zh("似的", "shìde")} es casi lo mismo que ${zh("像", "xiàng")}…${zh("一样", "yíyàng")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Completa para decir «sonrió, como si no hubiera pasado nada»: ${zh("他笑了，____什么都没发生", "tā xiào le, ____ shénme dōu méi fāshēng")}.</p>`,
        opciones: [zh('从而', 'cóng\u0027ér'), zh('毕竟', 'bìjìng'), zh('仿佛', 'fǎngfú'), zh('反而', 'fǎn\u0027ér')], correcta: 2,
        pista: '<p>La frase pide «como si».</p>',
        solucion: `<p>Como simplificación de la lección, ${zh("仿佛", "fǎngfú")} abre una imagen de «como si».</p>` },
      { tipo: 'opciones', enunciado: `<p>En el texto de cierre, ${zh("数据表明，很多同学一旦有时间就看书。可见大家很爱看书", "shùjù biǎomíng, hěn duō tóngxué yídàn yǒu shíjiān jiù kàn shū. Kějiàn dàjiā hěn ài kàn shū")}, ¿qué palabra introduce la conclusión?</p>`,
        opciones: [zh('一旦', 'yídàn'), zh('表明', 'biǎomíng'), zh('可见', 'kějiàn'), zh('就', 'jiù')], correcta: 2,
        pista: '<p>Es la frase que dice «se ve que…».</p>',
        solucion: `<p>${zh("可见", "kějiàn")} abre lo que se saca de los datos: a todos les gusta leer.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("想象")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['xiǎng xiàng'],
        pista: '<p>La primera sílaba baja y sube; la segunda baja de golpe.</p>',
        solucion: `<p>${zh("想象", "xiǎngxiàng")}: <strong>xiǎng xiàng</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("比喻", "bǐyù")}.</p>`,
        respuestas: ['metafora', 'una metafora', 'comparacion', 'una comparacion', 'simil', 'comparar'],
        pista: '<p>Es una forma de decir una cosa comparándola con otra.</p>',
        solucion: `<p>${zh("比喻", "bǐyù")} es «metáfora» o «comparación».</p>` },
    ],
    fuentes: [SILABO, ALLSET_SHIDE, ALLSET_SIHU, ALLSET_JIANZHI],
  });

})();
