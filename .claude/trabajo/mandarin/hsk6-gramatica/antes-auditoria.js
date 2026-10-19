// Mandarín · Unidad 16: HSK 6 · Gramática y estilo.
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
  // F2 (Oxford)
  const OXFORD = { nombre: 'Universidad de Oxford (Reino Unido), CTCFL: Newspaper reading, grammar notes (en inglés)', url: 'https://www.ctcfl.ox.ac.uk/materials_grammar-exercises_newspaperreadinggrammarnotes/' };
  // F3 a F8 (Dartmouth)
  const DART_10 = DART('Lesson 10, notas de gramática', '%e7%ac%ac%e5%8d%81%e8%af%be-lesson-10');
  const DART_24 = DART('Lesson 24, notas de gramática', '%e7%ac%ac%e4%ba%8c%e5%8d%81%e5%9b%9b%e8%af%be-lesson-24');
  const DART_29 = DART('Lesson 29, glosario', '%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%b9%9d%e8%af%be-lesson-29');
  const DART_23 = DART('Lesson 23, glosario', '%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%b8%89%e8%af%be-lesson-23');
  const DART_20 = DART('Lesson 20, notas de gramática', '%e7%ac%ac%e4%ba%8c%e5%8d%81%e8%af%be-lesson-20');
  const DART_14 = DART('Lesson 14, notas de gramática', '%e7%ac%ac%e5%8d%81%e5%9b%9b%e8%af%be-lesson-14');
  // F9 a F13, F35 a F41 (AllSet)
  const ALLSET_HUA = ALLSET('Making "-ize" and "-ify" verbs with "hua"', 'Making_%22-ize%22_and_%22-ify%22_verbs_with_%22hua%22');
  const ALLSET_XING = ALLSET('Indicating a characteristic with "xing"', 'Indicating_a_characteristic_with_%22xing%22');
  const ALLSET_ZHISUOYI = ALLSET('Stating the effect before the cause', 'Stating_the_effect_before_the_cause');
  const ALLSET_RENJIA = ALLSET('Comparing "renjia" and "bieren"', 'Comparing_%22renjia%22_and_%22bieren%22');
  const ALLSET_ZHIYU = ALLSET('Expressing "with regards to" with "zhiyu"', 'Expressing_%22with_regards_to%22_with_%22zhiyu%22');
  const ALLSET_GANCUI = ALLSET('Expressing "just" do it with "gancui"', 'Expressing_%22just%22_do_it_with_%22gancui%22');
  const ALLSET_DAO = ALLSET('Expressing contrariness with "dao"', 'Expressing_contrariness_with_%22dao%22');
  const ALLSET_DAO2 = ALLSET('Advanced usages of the contrary "dao"', 'Advanced_usages_of_the_contrary_%22dao%22');
  const ALLSET_ZONGSUAN = ALLSET('Comparing "zongsuan" and "zhongyu"', 'Comparing_%22zongsuan%22_and_%E2%80%9Czhongyu%22');
  const ALLSET_YIXIANG = ALLSET('Expressing "since the beginning" with "yixiang"', 'Expressing_%22since_the_beginning%22_with_%22yixiang%22');
  const ALLSET_YIZHI = ALLSET('Comparing "yizhi" and "yixiang"', 'Comparing_%22yizhi%22_and_%22yixiang%22');
  const ALLSET_FORMAL = ALLSET('Formal and informal function words', 'Formal_and_informal_function_words');
  // F31, F33, F34 y F44 a F46
  const DART_19 = DART('Lesson 19, notas de gramática', '%e7%ac%ac%e5%8d%81%e4%b9%9d%e8%af%be-lesson-19');
  const DART_22 = DART('Lesson 22, notas de gramática', '%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%ba%8c%e8%af%be-lesson-22');
  const MIT = { nombre: 'MIT OpenCourseWare (EE. UU.), Learning Chinese: A Foundation Course in Mandarin (Wheatley), 2011 (en inglés)', url: 'https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/res21g_003_s_11.pdf' };
  const ALLSET_MA1 = ALLSET('Expressing the self-evident with "ma"', 'Expressing_the_self-evident_with_%22ma%22');
  const ALLSET_MA2 = ALLSET('Marking a topic with "ma"', 'Marking_a_topic_with_%22ma%22');
  const ALLSET_HAORONGYI = ALLSET('Expressing difficulty with "hao (bu) rongyi"', 'Expressing_difficulty_with_%22hao_(bu)_rongyi%22');

  // ------------------------------------------------------------------
  L('Formar palabras: 超, 反, 无, 化 y 性', {
    objetivo: `Armar y entender palabras nuevas con las piezas ${zh("超", "chāo")}, ${zh("化", "huà")} y ${zh("性", "xìng")}, y reconocer ${zh("反", "fǎn")}, ${zh("无", "wú")}, ${zh("多", "duō")} y ${zh("型", "xíng")} dentro de palabras del sílabo.`,
    explicacion: `
      <p>Empiezas HSK 6, el último nivel de esta materia. Cada lección trae una selección de 15 palabras, no toda la lista; la lista completa está en el <a href="${encodeURI(SILABO.url)}">sílabo</a>. Las frases de ejemplo son de la lección. La voz depende de tu dispositivo: si suena rara, el pinyin manda. Y ${zh("不", "bù")} y ${zh("一", "yī")} se escriben con su tono original; al hablar cambian (unidad 9).</p>
      <p>En español armamos palabras con piezas: «super» + «mercado», «simple» + «ificar», «importante» + «cia». En chino pasa igual. Una pieza que va <strong>al principio</strong> se llama prefijo; una que va <strong>al final</strong>, sufijo. Con pocas piezas lees palabras que nunca viste.</p>
      ${tabla([
        ['超越', 'chāoyuè', 'superar, ir más allá'], ['反思', 'fǎnsī', 'reflexionar sobre lo hecho'], ['反馈', 'fǎnkuì', 'respuesta, comentarios de vuelta'], ['强化', 'qiánghuà', 'reforzar'], ['简化', 'jiǎnhuà', 'simplificar'],
        ['绿化', 'lǜhuà', 'poner plantas, volver verde'], ['优化', 'yōuhuà', 'mejorar, dejar en su mejor forma'], ['多元', 'duōyuán', 'diverso, de muchos tipos'], ['型号', 'xínghào', 'modelo (de un aparato)'], ['特性', 'tèxìng', 'característica propia'],
        ['弹性', 'tánxìng', 'elasticidad, flexibilidad'], ['数字化', 'shùzìhuà', 'digitalizar'], ['新兴', 'xīnxīng', 'emergente, que acaba de surgir'], ['新颖', 'xīnyǐng', 'novedoso, original'], ['无所谓', 'wúsuǒwèi', 'da igual, no importa'],
      ])}
      <h3>¿Qué pone ${zh("超", "chāo")} al principio?</h3>
      <p>Dartmouth glosa ${zh("超", "chāo")} como «superar, exceder» y dice que en chino moderno suele ser el primer componente de una palabra, como «super-» en español. Sus ejemplos son ${zh("超人", "chāorén")}, ${zh("超级", "chāojí")} y ${zh("超自然", "chāozìrán")}. En la tabla, ${zh("超越", "chāoyuè")} es «superar».</p>
      <h3>¿Cómo se vuelve verbo algo con ${zh("化", "huà")}?</h3>
      <p>Oxford explica que ${zh("化", "huà")} convierte una situación o cosa en otra, y que va después de un sustantivo o de un adjetivo de una sola sílaba. Dartmouth lo llama terminación que forma verbos, y AllSet lo compara con «-izar» o «-ificar». AllSet añade que casi siempre se pega a palabras de dos caracteres.</p>
      <p>Mira estos casos: ${zh("绿", "lǜ")} («verde») más ${zh("化", "huà")} da ${zh("绿化", "lǜhuà")}, «volver verde», o sea, poner plantas; ${zh("数字", "shùzì")} («cifra, número») más ${zh("化", "huà")} da ${zh("数字化", "shùzìhuà")}, «digitalizar»; y Dartmouth da ${zh("简单", "jiǎndān")} más ${zh("化", "huà")}, es decir, ${zh("简单化", "jiǎndānhuà")}, «hacer sencillo». ${zh("强化", "qiánghuà")}, ${zh("简化", "jiǎnhuà")} y ${zh("优化", "yōuhuà")} siguen el mismo molde.</p>
      <h3>¿Y ${zh("性", "xìng")} al final?</h3>
      <p>Oxford dice que ${zh("性", "xìng")} se ve mucho en la escritura formal y que hace dos cosas: convierte un verbo de cualidad en sustantivo, y un sustantivo en adjetivo que va delante de otro sustantivo. Su ejemplo: ${zh("重要", "zhòngyào")} («ser importante») se vuelve ${zh("重要性", "zhòngyàoxìng")}, «importancia»; y ${zh("历史", "lìshǐ")} («historia») se vuelve ${zh("历史性", "lìshǐxìng")}, «histórico». Dartmouth lo describe como una terminación que forma un sustantivo abstracto o un adjetivo que indica una cualidad. AllSet lo compara con «-idad» o «-eza», pero avisa de que no hay una regla fija sobre qué palabras lo aceptan; solo hay tendencias. En la tabla, ${zh("特性", "tèxìng")} y ${zh("弹性", "tánxìng")} son dos ejemplos.</p>
      <h3>¿Y las demás piezas?</h3>
      <p>El sílabo de nivel 6 lista también los prefijos ${zh("反", "fǎn")}, ${zh("无", "wú")}, ${zh("多", "duō")}, ${zh("亚", "yà")} y ${zh("准", "zhǔn")}, y los sufijos ${zh("式", "shì")} y ${zh("型", "xíng")}. No hallé una regla universitaria para ellos. Como simplificación de la lección, aprende las palabras enteras de la tabla: ${zh("反思", "fǎnsī")}, ${zh("反馈", "fǎnkuì")}, ${zh("无所谓", "wúsuǒwèi")}, ${zh("多元", "duōyuán")} y ${zh("型号", "xínghào")}. ${zh("亚", "yà")}, ${zh("准", "zhǔn")} y ${zh("式", "shì")} solo se mencionan.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que puedes pegar ${zh("化", "huà")} o ${zh("性", "xìng")} a cualquier palabra. Aprende las que ves en textos; la regla solo orienta.</p>`,
    ejemplo: `
      <p>Quieres decir «digitalizamos las fotos», y no conoces el verbo. Armémoslo.</p>
      <ol class="pasos-ej">
        <li>Piensa en la idea: «volver algo digital», o sea, pasarlo a cifras, como cuando una foto de papel se guarda en un archivo del teléfono.</li>
        <li>Busca la raíz, un sustantivo: ${zh("数字", "shùzì")}, «cifra».</li>
        <li>Pega ${zh("化", "huà")} al final, porque convierte una cosa en otra: ${zh("数字化", "shùzìhuà")}.</li>
        <li>Úsalo como verbo, con ${zh("把", "bǎ")} y ${zh("了", "le")}, que ya conoces: ${zh("我们把照片数字化了", "wǒmen bǎ zhàopiàn shùzìhuà le")}.</li>
      </ol>
      <p>Para comprobar, lee la palabra por piezas: «cifra» más «volver», o sea «volver cifra». Mira también que la raíz tenga sentido sola y que la palabra final sea un verbo, porque lleva ${zh("化", "huà")} y recibe ${zh("了", "le")}. Resultado: <span class="resultado">${zh("我们把照片数字化了", "wǒmen bǎ zhàopiàn shùzìhuà le")} = «digitalizamos las fotos»</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar ${zh("性", "xìng")} para hacer un verbo. ${zh("性", "xìng")} da sustantivos y adjetivos; para el verbo usa ${zh("化", "huà")}.</p>`,
    vidaReal: `
      <p>Con estas piezas pierdes menos tiempo ante palabras que no conoces. Las ves en carteles y en textos de una escuela o un museo, que hablan de cosas digitales, más verdes o más sencillas. También te sirven al leer la ficha de un aparato, porque cada una dice si es un modelo, una cualidad o un cambio. Y entiendes mejor a quien comenta un trabajo escolar y pide que lo mejores.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Según Oxford, ¿qué hace ${zh("化", "huà")} al final de una palabra?</p>`,
        opciones: ['Pone la palabra en pasado', 'Convierte una situación o cosa en otra', 'Hace una pregunta', 'Quita el sentido de la palabra'], correcta: 1,
        pista: '<p>Piensa en «verde» que pasa a «volver verde».</p>',
        solucion: `<p>Oxford dice que ${zh("化", "huà")} convierte una situación o cosa en otra, por ejemplo ${zh("绿", "lǜ")} en ${zh("绿化", "lǜhuà")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Oxford contrasta ${zh("重要", "zhòngyào")} con ${zh("重要性", "zhòngyàoxìng")}. ¿Qué significa la segunda?</p>`,
        opciones: ['Importancia', 'Importar', 'Muy tarde', 'Pequeñez'], correcta: 0,
        pista: `<p>${zh("性", "xìng")} convierte un verbo de cualidad en sustantivo.</p>`,
        solucion: `<p>${zh("重要", "zhòngyào")} es «ser importante» y ${zh("重要性", "zhòngyàoxìng")}, el sustantivo, es «importancia».</p>` },
      { tipo: 'opciones', enunciado: `<p>Dartmouth dice que ${zh("超", "chāo")} se parece al «super-» del español. ¿Cuál de estas palabras lo lleva?</p>`,
        opciones: [zh('优化', 'yōuhuà'), zh('特性', 'tèxìng'), zh('超级', 'chāojí'), zh('型号', 'xínghào')], correcta: 2,
        pista: `<p>Busca la que empieza con ${zh("超", "chāo")}.</p>`,
        solucion: `<p>${zh("超级", "chāojí")} es uno de los ejemplos de Dartmouth y empieza con ${zh("超", "chāo")}. Las otras tres no.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «simplificamos esta tabla».</p>',
        respuesta: ['我们', '简化', '这个', '表格'], pinyin: ['wǒmen', 'jiǎnhuà', 'zhège', 'biǎogé'], lang: 'zh-Hans',
        pista: '<p>Sujeto, verbo y lo que se simplifica, con su clasificador.</p>',
        solucion: `<p>${zh("我们简化这个表格", "wǒmen jiǎnhuà zhège biǎogé")}: sujeto, verbo con ${zh("化", "huà")} y el objeto.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("数字化")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['shù zì huà'],
        pista: '<p>Las tres sílabas bajan de golpe.</p>',
        solucion: `<p>${zh("数字化", "shùzìhuà")}: <strong>shù zì huà</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("无所谓", "wúsuǒwèi")}.</p>`,
        respuestas: ['da igual', 'no importa', 'es igual', 'me da igual', 'no me importa', 'indiferente', 'es indiferente', 'no tiene importancia'],
        pista: '<p>Es lo que dices cuando te ofrecen dos opciones y las dos te sirven.</p>',
        solucion: `<p>${zh("无所谓", "wúsuǒwèi")} es «da igual, no importa».</p>` },
    ],
    fuentes: [SILABO, OXFORD, DART_10, DART_24, DART_29, ALLSET_HUA, ALLSET_XING],
  });

  // ------------------------------------------------------------------
  L('La partícula 所', {
    objetivo: `Usar ${zh("所", "suǒ")} antes de un verbo para señalar «lo que» alguien hace o piensa, leer ${zh("之所以", "zhīsuǒyǐ")} y ${zh("众所周知", "zhòngsuǒzhōuzhī")}, y entender los sentidos de ${zh("人家", "rénjia")}.`,
    explicacion: `
      <p>En español dices «lo que sé» o «la idea que valoro». En chino, a veces se pone una pieza pequeña antes del verbo para hacer lo mismo y dar más fuerza a lo que viene después. Es ${zh("所", "suǒ")}, que el sílabo de nivel 6 lista entre las <strong>partículas estructurales</strong>: palabras sin significado propio que sirven para armar la frase. Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['所', 'suǒ', 'partícula que va antes de un verbo'], ['人家', 'rénjia', 'los demás; yo; él o ella'], ['之所以', 'zhīsuǒyǐ', 'la razón por la que'], ['众所周知', 'zhòngsuǒzhōuzhī', 'como todos saben'], ['认同', 'rèntóng', 'estar de acuerdo, identificarse con algo'],
        ['认可', 'rènkě', 'aprobar, aceptar'], ['认知', 'rènzhī', 'conocer, tener idea de algo'], ['看待', 'kàndài', 'ver, tratar (una cosa) de cierta manera'], ['看重', 'kànzhòng', 'darle importancia a algo'], ['涉及', 'shèjí', 'tocar un tema, tener que ver con'],
        ['上述', 'shàngshù', 'lo dicho arriba'], ['前者', 'qiánzhě', 'el primero (de dos)'], ['后者', 'hòuzhě', 'el segundo (de dos)'], ['场合', 'chǎnghé', 'ocasión, situación'], ['理念', 'lǐniàn', 'idea de fondo, principio'],
      ])}
      <h3>¿Dónde va ${zh("所", "suǒ")}?</h3>
      <p>Oxford dice que cuando ${zh("所", "suǒ")} va antes de un verbo, y ese verbo lleva después ${zh("的", "de")} y un sustantivo, el énfasis cae en el sustantivo. Dartmouth lo glosa como un auxiliar que se coloca antes del verbo ${zh("面临", "miànlín")} («enfrentar») con fin enfático. Fíjate en la frase ${zh("这就是我所看重的理念", "zhè jiùshì wǒ suǒ kànzhòng de lǐniàn")}, «esta es la idea que valoro»: el sujeto es ${zh("我", "wǒ")}, luego viene ${zh("所", "suǒ")}, luego el verbo ${zh("看重", "kànzhòng")}, luego ${zh("的", "de")} y al final ${zh("理念", "lǐniàn")}, la idea de la que se habla.</p>
      <p>Otro ejemplo es ${zh("这是大家所认可的想法", "zhè shì dàjiā suǒ rènkě de xiǎngfǎ")}: «esta es la opinión que todos aceptan». Y un tercero, ${zh("我所认知的世界很小", "wǒ suǒ rènzhī de shìjiè hěn xiǎo")}: «el mundo que conozco es pequeño».</p>
      <h3>¿Qué es ${zh("之所以", "zhīsuǒyǐ")}?</h3>
      <p>Aquí también está ${zh("所", "suǒ")}. Chinese Grammar Wiki (AllSet) dice que ${zh("之所以", "zhīsuǒyǐ")}…${zh("是因为", "shì yīnwèi")}… se traduce «la razón por la que… es que…», que sirve para dar primero el efecto y la causa después, y que es de habla algo formal. Un ejemplo: ${zh("我之所以喜欢这里，是因为这里很安静", "wǒ zhīsuǒyǐ xǐhuan zhèlǐ, shì yīnwèi zhèlǐ hěn ānjìng")}, «la razón por la que me gusta este lugar es que es muy tranquilo».</p>
      <h3>¿Y ${zh("众所周知", "zhòngsuǒzhōuzhī")}?</h3>
      <p>El sílabo la lista como palabra completa. No hallé una regla universitaria; como simplificación de la lección, tradúcela «como todos saben» y úsala para abrir una frase: ${zh("众所周知，学习需要时间", "zhòngsuǒzhōuzhī, xuéxí xūyào shíjiān")}.</p>
      <h3>¿Quién es ${zh("人家", "rénjia")}?</h3>
      <p>AllSet explica que ${zh("人家", "rénjia")} y ${zh("别人", "biérén")} significan «los demás», pero ${zh("人家", "rénjia")} es más coloquial: ${zh("我不在乎人家怎么说", "wǒ bù zàihu rénjia zěnme shuō")}, «no me importa lo que diga la gente». También puede referirse a uno mismo, con un tono tierno y tímido, y a alguien ya mencionado o que ambos conocen. Con otro sentido, «hogares», se pronuncia ${zh("rénjiā")} y es el uso menos común al hablar.</p>
      <h3>¿Para qué sirven las demás palabras?</h3>
      <p>Muchas ayudan a citar o comparar. ${zh("前者", "qiánzhě")} y ${zh("后者", "hòuzhě")} señalan uno de dos: ${zh("咖啡和茶，前者很便宜，后者很贵", "kāfēi hé chá, qiánzhě hěn piányi, hòuzhě hěn guì")}. ${zh("上述", "shàngshù")} se refiere a lo ya dicho arriba. Aprende las demás como palabras enteras.</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("所", "suǒ")} después del verbo, como en ${zh("我看重所的理念", "wǒ kànzhòng suǒ de lǐniàn")}. Va siempre antes.</p>`,
    ejemplo: `
      <p>Quieres decir «esta es la idea que valoro». Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Empieza con una frase sencilla: ${zh("我看重这个理念", "wǒ kànzhòng zhège lǐniàn")}, «valoro esta idea».</li>
        <li>Pasa el verbo a una descripción con ${zh("的", "de")}: ${zh("我看重的理念", "wǒ kànzhòng de lǐniàn")}, «la idea que valoro».</li>
        <li>Pon ${zh("所", "suǒ")} justo antes del verbo para dar énfasis: ${zh("我所看重的理念", "wǒ suǒ kànzhòng de lǐniàn")}.</li>
        <li>Mete todo en una frase con ${zh("这就是", "zhè jiùshì")}, «esta es».</li>
      </ol>
      <p>Para comprobar, ubica las piezas en orden: sujeto, ${zh("所", "suǒ")}, verbo, ${zh("的", "de")}, sustantivo. Si el sustantivo no va al final, algo salió mal. Resultado: <span class="resultado">${zh("这就是我所看重的理念", "zhè jiùshì wǒ suǒ kànzhòng de lǐniàn")} = «esta es la idea que valoro»</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar ${zh("所", "suǒ")} cuando no hay verbo después. La partícula siempre acompaña a un verbo.</p>`,
    vidaReal: `
      <p>Ver ${zh("所", "suǒ")} te ayuda a leer con más calma textos escritos. Aparece en artículos, discursos y cartas formales, donde alguien explica en qué cree o qué le importa. Reconocerla evita que te pierdas a la mitad de una frase larga. Si oyes ${zh("人家", "rénjia")} en una charla, sabes que puede ser «los demás», «yo» o «ella». Y al terminar sabes citar una idea con más elegancia.</p>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «esta es la idea que valoro».</p>',
        respuesta: ['这', '就是', '我', '所', '看重', '的', '理念'], pinyin: ['zhè', 'jiùshì', 'wǒ', 'suǒ', 'kànzhòng', 'de', 'lǐniàn'], lang: 'zh-Hans',
        pista: `<p>${zh("所", "suǒ")} va justo antes del verbo, y el sustantivo cierra la frase.</p>`,
        solucion: `<p>${zh("这就是我所看重的理念", "zhè jiùshì wǒ suǒ kànzhòng de lǐniàn")}: sujeto, ${zh("所", "suǒ")}, verbo, ${zh("的", "de")} y el sustantivo.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «esta es la opinión que todos aceptan». ¿Qué frase está bien?</p>',
        opciones: [zh('这是大家认可所的想法', 'zhè shì dàjiā rènkě suǒ de xiǎngfǎ'), zh('这是所大家认可的想法', 'zhè shì suǒ dàjiā rènkě de xiǎngfǎ'), zh('这是大家所认可的想法', 'zhè shì dàjiā suǒ rènkě de xiǎngfǎ'), zh('这是大家认可的所想法', 'zhè shì dàjiā rènkě de suǒ xiǎngfǎ')], correcta: 2,
        pista: `<p>Busca el verbo ${zh("认可", "rènkě")} y pon ${zh("所", "suǒ")} justo antes.</p>`,
        solucion: `<p>${zh("所", "suǒ")} va entre el sujeto ${zh("大家", "dàjiā")} y el verbo ${zh("认可", "rènkě")}, seguido de ${zh("的", "de")} y el sustantivo.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según Oxford, en ${zh("所", "suǒ")} + verbo + ${zh("的", "de")} + sustantivo, ¿dónde cae el énfasis?</p>`,
        opciones: ['En el verbo', 'En el sustantivo', 'En el sujeto', 'En ninguna parte'], correcta: 1,
        pista: '<p>Es la palabra que cierra la frase.</p>',
        solucion: '<p>Oxford dice que el énfasis recae en el sustantivo, la idea de la que se habla.</p>' },
      { tipo: 'opciones', enunciado: `<p>En ${zh("我不在乎人家怎么说", "wǒ bù zàihu rénjia zěnme shuō")}, ¿qué quiere decir ${zh("人家", "rénjia")} según AllSet?</p>`,
        opciones: ['Mi casa', 'Yo mismo, con tono tierno', 'Un solo amigo', 'Los demás, la gente'], correcta: 3,
        pista: '<p>Piensa en lo que dice la gente de uno.</p>',
        solucion: `<p>AllSet traduce la frase como «no me importa lo que diga la gente»: ${zh("人家", "rénjia")} son los demás.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("之所以")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['zhī suǒ yǐ'],
        pista: '<p>La primera sílaba empieza alta y se mantiene; la segunda baja y sube; la tercera sube.</p>',
        solucion: `<p>${zh("之所以", "zhīsuǒyǐ")}: <strong>zhī suǒ yǐ</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("上述", "shàngshù")}.</p>`,
        respuestas: ['lo dicho arriba', 'mencionado arriba', 'lo anterior', 'arriba mencionado', 'lo mencionado', 'antes mencionado', 'mencionado', 'citado arriba', 'dicho arriba'],
        pista: '<p>Se usa para volver a algo que ya dijiste en el texto.</p>',
        solucion: `<p>${zh("上述", "shàngshù")} es «lo dicho arriba, lo mencionado antes».</p>` },
    ],
    fuentes: [SILABO, OXFORD, DART_23, ALLSET_ZHISUOYI, ALLSET_RENJIA],
  });

  // ------------------------------------------------------------------
  L('Preposiciones formales: 于 y 至于', {
    objetivo: `Reconocer y usar ${zh("于", "yú")} (lugar, tiempo y comparación), ${zh("至于", "zhìyú")} para pasar a otro tema, ${zh("因", "yīn")} y ${zh("除", "chú")}, en textos formales.`,
    explicacion: `
      <p>Al hablar dices «el partido es el sábado». En un aviso escrito dirían algo más serio: «el partido tendrá lugar el sábado». El chino también tiene dos registros, y ${zh("于", "yú")} es una pieza del escrito. Una <strong>preposición</strong> es una palabra corta que va delante de un lugar, un tiempo o un tema y dice cómo se relaciona con el verbo. Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['于', 'yú', 'en, a, que (preposición escrita)'], ['至于', 'zhìyú', 'en cuanto a'], ['因', 'yīn', 'por, a causa de'], ['除', 'chú', 'excepto, aparte de'], ['源于', 'yuányú', 'venir de, tener su origen en'],
        ['出于', 'chūyú', 'movido por, por motivo de'], ['限于', 'xiànyú', 'limitado a, por falta de'], ['易于', 'yìyú', 'fácil de'], ['公告', 'gōnggào', 'aviso público'], ['官方', 'guānfāng', 'oficial, de las autoridades'],
        ['截至', 'jiézhì', 'hasta (una fecha)'], ['截止', 'jiézhǐ', 'cerrar, terminar (un plazo)'], ['日前', 'rìqián', 'hace unos días'], ['为期', 'wéiqī', 'con una duración de'], ['事项', 'shìxiàng', 'asunto, punto a tratar'],
      ])}
      <h3>¿Qué hace ${zh("于", "yú")}?</h3>
      <p>Oxford dice que ${zh("于", "yú")} es de estilo formal escrito, que va antes de una palabra de tiempo o de lugar, y que se parece a ${zh("在", "zài")}. Su ejemplo es ${zh("大会于3月16日开始", "dàhuì yú sān yuè shíliù rì kāishǐ")}, «la reunión empieza el 16 de marzo». Una frase propia: ${zh("活动于五月五日开始", "huódòng yú wǔ yuè wǔ rì kāishǐ")}, «la actividad empieza el 5 de mayo».</p>
      <p>Dartmouth añade que ${zh("于", "yú")} también puede ir después del verbo para indicar lugar, origen, tiempo, dirección o finalidad, y que se usa mucho en textos escritos. Por ejemplo: ${zh("他生于北京", "tā shēngyú Běijīng")}, «nació en Beijing». Las palabras ${zh("源于", "yuányú")}, ${zh("限于", "xiànyú")} y ${zh("易于", "yìyú")} de la tabla siguen ese molde: verbo más ${zh("于", "yú")}.</p>
      <p>Oxford suma otro uso: un adjetivo seguido de ${zh("于", "yú")} compara, y lo llama una comparación de la lengua escrita. Su ejemplo: ${zh("中国人口多于英国人口", "Zhōngguó rénkǒu duōyú Yīngguó rénkǒu")}, «la población china es mayor que la británica». Propio: ${zh("这个月的雨多于上个月", "zhège yuè de yǔ duōyú shàng ge yuè")}, «este mes llovió más que el mes pasado».</p>
      <h3>¿Y ${zh("出于", "chūyú")}?</h3>
      <p>Oxford explica que ${zh("出于", "chūyú")} es la forma corta de ${zh("出自于", "chūzìyú")}, que suele ir después del sujeto y que se sigue de un sustantivo: ${zh("出于关心，他告诉了我", "chūyú guānxīn, tā gàosule wǒ")}, «movido por la preocupación, me lo dijo».</p>
      <h3>¿Cómo paso a otro tema con ${zh("至于", "zhìyú")}?</h3>
      <p>Oxford dice que ${zh("至于", "zhìyú")} es de estilo escrito, que equivale a ${zh("对……来说", "duì…… lái shuō")} hablado y que se pone al inicio del tema. Dartmouth precisa que presenta un tema relacionado con el que se acaba de tratar. AllSet avisa de que se usa después de otra conversación, no para empezar un tema nuevo sin contexto. Ejemplo propio: ${zh("他足球踢得很好，至于篮球，不太好", "tā zúqiú tī de hěn hǎo, zhìyú lánqiú, bù tài hǎo")}, «juega muy bien al fútbol; en cuanto al baloncesto, no tanto».</p>
      <h3>¿Y ${zh("因", "yīn")} y ${zh("除", "chú")}?</h3>
      <p>Según Oxford, ${zh("因", "yīn")} es la forma corta de ${zh("因为", "yīnwèi")}. El molde ${zh("因", "yīn")}…${zh("而", "ér")}… se usa en chino escrito: la causa va tras ${zh("因", "yīn")} y el resultado tras ${zh("而", "ér")}. Un ejemplo propio: ${zh("他因生病而没来", "tā yīn shēngbìng ér méi lái")}, «no vino porque se enfermó». En cuanto a ${zh("除", "chú")}, Oxford dice que lo excluido va entre ${zh("除了", "chúle")} y ${zh("以外", "yǐwài")}, y que al hablar suele omitirse ${zh("以", "yǐ")} o ${zh("以外", "yǐwài")}: ${zh("除了我以外，大家都会游泳", "chúle wǒ yǐwài, dàjiā dōu huì yóuyǒng")}, «todos saben nadar excepto yo».</p>
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("至于", "zhìyú")} para empezar una conversación. Necesita que ya se haya hablado de algo.</p>`,
    ejemplo: `
      <p>Quieres escribir un aviso formal: «La actividad empieza el 5 de mayo. En cuanto a la comida, lo informaremos después». Vamos por partes.</p>
      <ol class="pasos-ej">
        <li>Empieza con la frase hablada: ${zh("活动在五月五日开始", "huódòng zài wǔ yuè wǔ rì kāishǐ")}.</li>
        <li>Para el registro escrito, cambia ${zh("在", "zài")} por ${zh("于", "yú")}: ${zh("活动于五月五日开始", "huódòng yú wǔ yuè wǔ rì kāishǐ")}.</li>
        <li>Ya hablaste de la fecha, así que ahora toca otro tema: ${zh("至于", "zhìyú")} y el nuevo, ${zh("吃的", "chī de")}, «lo de comer».</li>
        <li>Cierra con lo que dirás: ${zh("以后再告诉你们", "yǐhòu zài gàosu nǐmen")}.</li>
      </ol>
      <p>Para comprobar, mira que ${zh("于", "yú")} vaya antes de la fecha y que ${zh("至于", "zhìyú")} abra la segunda parte. Resultado: <span class="resultado">${zh("活动于五月五日开始，至于吃的，以后再告诉你们", "huódòng yú wǔ yuè wǔ rì kāishǐ, zhìyú chī de, yǐhòu zài gàosu nǐmen")} = «la actividad empieza el 5 de mayo; en cuanto a la comida, se lo diremos después»</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar ${zh("于", "yú")} en una charla con amigos. Suena a aviso escrito; al hablar se dice ${zh("在", "zài")}.</p>`,
    vidaReal: `
      <p>Estas piezas aparecen donde el chino se pone serio. Verás ${zh("于", "yú")} en avisos de una escuela, en carteles de un museo y en comunicados de las autoridades. Con ${zh("公告", "gōnggào")} y ${zh("官方", "guānfāng")} sabrás si un texto es oficial. ${zh("至于", "zhìyú")} te ayuda a seguir un texto que pasa de un tema a otro, y ${zh("除", "chú")} a notar quién queda fuera. Así lees un aviso sin perder la fecha.</p>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «la actividad empieza el 5 de mayo» en estilo formal.</p>',
        respuesta: ['活动', '于', '五月五日', '开始'], pinyin: ['huódòng', 'yú', 'wǔ yuè wǔ rì', 'kāishǐ'], lang: 'zh-Hans',
        pista: `<p>${zh("于", "yú")} va antes de la fecha.</p>`,
        solucion: `<p>${zh("活动于五月五日开始", "huódòng yú wǔ yuè wǔ rì kāishǐ")}: sujeto, ${zh("于", "yú")}, tiempo y verbo.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según Oxford, ¿a qué palabra se parece ${zh("于", "yú")} cuando va antes de un tiempo o un lugar?</p>`,
        opciones: [zh('在', 'zài'), zh('不', 'bù'), zh('吗', 'ma'), zh('很', 'hěn')], correcta: 0,
        pista: '<p>Piensa en la preposición común para «en».</p>',
        solucion: `<p>Oxford dice que ${zh("于", "yú")} es formal y se parece a ${zh("在", "zài")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según AllSet, ¿cuándo se usa ${zh("至于", "zhìyú")}?</p>`,
        opciones: ['Para saludar al empezar', 'Para decir «no»', 'Después de otra conversación, para pasar a un tema relacionado', 'Para hacer una pregunta'], correcta: 2,
        pista: '<p>Necesita un contexto previo.</p>',
        solucion: `<p>${zh("至于", "zhìyú")} se usa después de otra conversación y no para abrir un tema nuevo sin contexto.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("这个月的雨多于上个月", "zhège yuè de yǔ duōyú shàng ge yuè")}?</p>`,
        opciones: ['Este mes llovió menos que el mes pasado', 'Este mes llovió más que el mes pasado', 'Este mes no llovió', 'El mes pasado no llovió'], correcta: 1,
        pista: `<p>Adjetivo más ${zh("于", "yú")} compara. ${zh("多", "duō")} es «mucho».</p>`,
        solucion: `<p>${zh("多于", "duōyú")} es «más que», una comparación de la lengua escrita.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("至于")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['zhì yú'],
        pista: '<p>La primera sílaba baja de golpe; la segunda sube.</p>',
        solucion: `<p>${zh("至于", "zhìyú")}: <strong>zhì yú</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("除", "chú")} en ${zh("除了我以外", "chúle wǒ yǐwài")}.</p>`,
        respuestas: ['excepto', 'aparte de', 'salvo', 'menos', 'a excepcion de', 'excepto yo', 'a excepción de'],
        pista: '<p>Dice quién queda fuera.</p>',
        solucion: `<p>${zh("除了我以外", "chúle wǒ yǐwài")} es «excepto yo, aparte de mí».</p>` },
    ],
    fuentes: [SILABO, OXFORD, DART_20, DART_14, ALLSET_ZHIYU],
  });

  // ------------------------------------------------------------------
  L('Matices: 明明, 干脆, 倒是 y 总算', {
    objetivo: `Dar un matiz de actitud a una frase con ${zh("明明", "míngmíng")}, ${zh("干脆", "gāncuì")}, ${zh("倒是", "dàoshì")} y ${zh("总算", "zǒngsuàn")}, y reconocer ${zh("恰好", "qiàhǎo")}, ${zh("一向", "yíxiàng")} y otros adverbios del sílabo.`,
    explicacion: `
      <p>Dos personas pueden decir lo mismo con distinta intención: «vino» no suena igual que «por fin vino». Esa diferencia la dan los <strong>adverbios de actitud</strong>, palabras que van junto al verbo y muestran lo que piensa quien habla. El sílabo de nivel 6 los lista como adverbios de modo y de actitud. Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['明明', 'míngmíng', 'claramente, a todas luces'], ['干脆', 'gāncuì', 'mejor directamente, más vale'], ['倒是', 'dàoshì', 'en cambio; sí (pero...)'], ['总算', 'zǒngsuàn', 'por fin, al fin'], ['恰好', 'qiàhǎo', 'justo, por casualidad'],
        ['不禁', 'bùjīn', 'sin poder evitarlo'], ['特地', 'tèdì', 'expresamente, a propósito'], ['特意', 'tèyì', 'expresamente, con intención'], ['偷偷', 'tōutōu', 'a escondidas'], ['赶忙', 'gǎnmáng', 'enseguida, a toda prisa'],
        ['一向', 'yíxiàng', 'siempre, de costumbre'], ['仍旧', 'réngjiù', 'todavía, igual que antes'], ['依旧', 'yījiù', 'todavía, como antes'], ['顿时', 'dùnshí', 'de pronto, al instante'], ['默默', 'mòmò', 'en silencio'],
      ])}
      <h3>¿Cómo propongo un camino directo con ${zh("干脆", "gāncuì")}?</h3>
      <p>Chinese Grammar Wiki (AllSet) dice que ${zh("干脆", "gāncuì")} la usa quien habla para proponer un camino directo en una situación difícil, algo como «mejor directamente». Va entre el sujeto y el verbo: ${zh("家里什么都没有，我们干脆出去吃吧", "jiālǐ shénme dōu méiyǒu, wǒmen gāncuì chūqù chī ba")}, «en casa no hay nada; mejor salgamos a comer». También puede ir con una negación: ${zh("这个太麻烦，干脆别做了", "zhège tài máfan, gāncuì bié zuò le")}, «esto es muy molesto; mejor no lo hagamos».</p>
      <h3>¿Qué aporta ${zh("倒是", "dàoshì")}?</h3>
      <p>AllSet explica que ${zh("倒", "dào")} expresa algo contrario a lo esperado y marca un giro. En ${zh("倒是", "dàoshì")} también concede algo («sí quiero, pero…»), y la frase siguiente suele empezar con ${zh("但是", "dànshì")}, ${zh("不过", "búguò")}, ${zh("就是", "jiùshì")} o ${zh("可是", "kěshì")}. Un ejemplo: ${zh("我倒是想去旅行，但是现在太忙了", "wǒ dàoshì xiǎng qù lǚxíng, dànshì xiànzài tài máng le")}, «sí quiero ir de viaje, pero ahora estoy muy ocupado». Con ${zh("你倒是", "nǐ dàoshì")} + verbo, apremias: ${zh("你倒是说话呀", "nǐ dàoshì shuōhuà ya")}, «dime algo, rápido».</p>
      <h3>¿Cómo digo «por fin» con ${zh("总算", "zǒngsuàn")}?</h3>
      <p>AllSet compara ${zh("总算", "zǒngsuàn")} con ${zh("终于", "zhōngyú")}: tienen la misma estructura, pero ${zh("总算", "zǒngsuàn")} casi no se pone antes del sujeto. Además implica una espera penosa y es más hablado; ${zh("终于", "zhōngyú")} es más formal y objetivo. Ejemplo propio: ${zh("等了一个小时，公共汽车总算来了", "děngle yí gè xiǎoshí, gōnggòng qìchē zǒngsuàn lái le")}, «después de esperar una hora, por fin llegó el autobús».</p>
      <h3>¿Y ${zh("一向", "yíxiàng")} y ${zh("恰好", "qiàhǎo")}?</h3>
      <p>Según AllSet, ${zh("一向", "yíxiàng")} expresa un hábito o una actitud que dura desde hace mucho hasta hoy. No tiene un punto de inicio, a diferencia de ${zh("一直", "yìzhí")}, y no se usa con verbos de cambio: ${zh("他一向很认真", "tā yíxiàng hěn rènzhēn")}, «él siempre ha sido serio». La misma página pone ${zh("恰好", "qiàhǎo")} como equivalente formal de ${zh("正好", "zhènghǎo")}: ${zh("我到的时候，恰好下雨了", "wǒ dào de shíhou, qiàhǎo xià yǔ le")}, «cuando llegué, justo se puso a llover».</p>
      <h3>¿Y ${zh("明明", "míngmíng")}?</h3>
      <p>El sílabo lo lista entre estos adverbios, y no hallé una fuente de uso. Como simplificación de la lección, tradúcelo «claramente, a todas luces»: ${zh("这明明是我的书", "zhè míngmíng shì wǒ de shū")}, «esto es claramente mi libro».</p>
      <h3>¿Y los demás adverbios?</h3>
      <p>No hallé reglas para ellos; aprende sus significados de la tabla. Ejemplos propios: ${zh("看到这个，我不禁笑了", "kàndào zhège, wǒ bùjīn xiào le")}; ${zh("妈妈特地给我做了蛋糕", "māma tèdì gěi wǒ zuòle dàngāo")}; ${zh("弟弟偷偷吃了一块蛋糕", "dìdi tōutōu chīle yí kuài dàngāo")}; ${zh("他赶忙站起来", "tā gǎnmáng zhàn qǐlai")}; ${zh("他依旧住在这里", "tā yījiù zhù zài zhèlǐ")}.</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("干脆", "gāncuì")} o ${zh("总算", "zǒngsuàn")} antes del sujeto. Van entre el sujeto y el verbo.</p>`,
    ejemplo: `
      <p>Quieres decir: «En casa no hay nada; mejor salgamos a comer». Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Di el problema: ${zh("家里什么都没有", "jiālǐ shénme dōu méiyǒu")}, «en casa no hay nada».</li>
        <li>Piensa en la propuesta: ${zh("我们出去吃", "wǒmen chūqù chī")}, «salimos a comer».</li>
        <li>Para dar el matiz de «mejor directamente», pon ${zh("干脆", "gāncuì")} entre el sujeto y el verbo: ${zh("我们干脆出去吃", "wǒmen gāncuì chūqù chī")}.</li>
        <li>Cierra con ${zh("吧", "ba")} para que suene a propuesta, no a orden.</li>
      </ol>
      <p>Para comprobar, mira que ${zh("干脆", "gāncuì")} quede justo antes del verbo y que haya un problema que justifique el camino directo. Resultado: <span class="resultado">${zh("家里什么都没有，我们干脆出去吃吧", "jiālǐ shénme dōu méiyǒu, wǒmen gāncuì chūqù chī ba")} = «en casa no hay nada; mejor salgamos a comer»</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar ${zh("干脆", "gāncuì")} sin ningún problema previo. Necesita una situación difícil que justifique el camino directo.</p>`,
    vidaReal: `
      <p>Estos matices te hacen sonar y leer como una persona real. Con ${zh("总算", "zǒngsuàn")} y ${zh("干脆", "gāncuì")} notas el cansancio o la decisión de quien habla. Con ${zh("倒是", "dàoshì")} entiendes cuando alguien dice «sí, pero…». Y con ${zh("特地", "tèdì")} o ${zh("偷偷", "tōutōu")} captas la intención detrás de un gesto. En una charla o un mensaje, estas palabras cambian el sentido sin cambiar los hechos, y por eso vale la pena fijarse en ellas.</p>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «mejor salgamos a comer».</p>',
        respuesta: ['我们', '干脆', '出去', '吃', '吧'], pinyin: ['wǒmen', 'gāncuì', 'chūqù', 'chī', 'ba'], lang: 'zh-Hans',
        pista: `<p>${zh("干脆", "gāncuì")} va entre el sujeto y el verbo.</p>`,
        solucion: `<p>${zh("我们干脆出去吃吧", "wǒmen gāncuì chūqù chī ba")}: sujeto, ${zh("干脆", "gāncuì")}, verbo y ${zh("吧", "ba")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según AllSet, ¿cuál es la diferencia entre ${zh("总算", "zǒngsuàn")} y ${zh("终于", "zhōngyú")}?</p>`,
        opciones: ['No hay diferencia', zh('终于', 'zhōngyú') + ' es más hablado y ' + zh('总算', 'zǒngsuàn') + ' más formal', zh('总算', 'zǒngsuàn') + ' implica una espera penosa y es más hablado', zh('总算', 'zǒngsuàn') + ' siempre va antes del sujeto'], correcta: 2,
        pista: '<p>Una de las dos suena a queja.</p>',
        solucion: `<p>${zh("总算", "zǒngsuàn")} implica una espera penosa y es más hablado; ${zh("终于", "zhōngyú")} es más formal y objetivo.</p>` },
      { tipo: 'opciones', enunciado: `<p>Completa: ${zh("我倒是想去旅行", "wǒ dàoshì xiǎng qù lǚxíng")}, ______.</p>`,
        opciones: [zh('所以我很高兴', 'suǒyǐ wǒ hěn gāoxìng'), zh('但是现在太忙了', 'dànshì xiànzài tài máng le'), zh('因为我去了', 'yīnwèi wǒ qù le'), zh('而且我很高', 'érqiě wǒ hěn gāo')], correcta: 1,
        pista: `<p>${zh("倒是", "dàoshì")} concede algo y después viene un giro.</p>`,
        solucion: `<p>Después de ${zh("倒是", "dàoshì")} suele venir ${zh("但是", "dànshì")}: «sí quiero, pero ahora estoy muy ocupado».</p>` },
      { tipo: 'opciones', enunciado: `<p>Según AllSet, ¿qué expresa ${zh("一向", "yíxiàng")}?</p>`,
        opciones: ['Un hábito o actitud que dura desde hace mucho', 'Algo que acaba de cambiar', 'Una pregunta', 'Algo que no pasó'], correcta: 0,
        pista: '<p>Piensa en «siempre ha sido así».</p>',
        solucion: `<p>${zh("一向", "yíxiàng")} expresa un hábito o actitud que dura desde hace mucho hasta hoy.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("总算")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['zǒng suàn'],
        pista: '<p>La primera sílaba baja y sube; la segunda baja de golpe.</p>',
        solucion: `<p>${zh("总算", "zǒngsuàn")}: <strong>zǒng suàn</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("偷偷", "tōutōu")}.</p>`,
        respuestas: ['a escondidas', 'a escondidas', 'en secreto', 'secretamente', 'a hurtadillas', 'a escondidas de otros', 'a escondidas.'],
        pista: '<p>Es como hacer algo sin que nadie te vea.</p>',
        solucion: `<p>${zh("偷偷", "tōutōu")} es «a escondidas, en secreto».</p>` },
    ],
    fuentes: [SILABO, ALLSET_GANCUI, ALLSET_DAO, ALLSET_DAO2, ALLSET_ZONGSUAN, ALLSET_YIXIANG, ALLSET_YIZHI, ALLSET_FORMAL],
  });

  // ------------------------------------------------------------------
  L('No necesariamente: 未必', {
    objetivo: `Decir «no necesariamente» con ${zh("未必", "wèibì")}, marcar repetición con ${zh("一再", "yízài")} y ${zh("再三", "zàisān")}, y reconocer ${zh("不料", "búliào")}, ${zh("较为", "jiàowéi")} y otras palabras formales.`,
    explicacion: `
      <p>Un amigo dice: «lo caro siempre es mejor». Tú dudas: a veces sí, a veces no. En español respondes «no necesariamente». El chino tiene una palabra para eso, ${zh("未必", "wèibì")}, y varias más que dan un tono escrito o serio. Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['未必', 'wèibì', 'no necesariamente'], ['不料', 'búliào', 'inesperadamente, pero resultó que'], ['一再', 'yízài', 'una y otra vez'], ['再三', 'zàisān', 'repetidamente, una y otra vez'], ['异常', 'yìcháng', 'muy, fuera de lo normal'],
        ['特', 'tè', 'muy, especialmente'], ['较为', 'jiàowéi', 'bastante, relativamente'], ['不至于', 'búzhìyú', 'no llegar al punto de'], ['难免', 'nánmiǎn', 'ser difícil de evitar'], ['无疑', 'wúyí', 'sin duda'],
        ['未', 'wèi', 'todavía no (escrito)'], ['从未', 'cóngwèi', 'nunca, hasta ahora no'], ['推测', 'tuīcè', 'suponer, deducir'], ['预料', 'yùliào', 'prever, esperar'], ['假设', 'jiǎshè', 'suponer, hipótesis'],
      ])}
      <h3>¿Cómo digo «no necesariamente»?</h3>
      <p>El sílabo de nivel 6 lista ${zh("未必", "wèibì")} como único adverbio de negación de su tipo. No hallé una fuente de uso; como simplificación de la lección, significa «no necesariamente» y va delante del verbo o del adjetivo: ${zh("贵的东西未必好", "guì de dōngxi wèibì hǎo")}, «lo caro no es necesariamente bueno», y ${zh("他未必知道", "tā wèibì zhīdào")}, «puede que él no lo sepa». Chinese Grammar Wiki (AllSet), fuente de apoyo, pone ${zh("不见得", "bù jiàndé")} y ${zh("不一定", "bù yīdìng")} como las formas habladas, y ${zh("未必", "wèibì")} como la formal. Por eso lo verás más en textos que en charlas.</p>
      <h3>¿Y la repetición?</h3>
      <p>AllSet dice que ${zh("一再", "yízài")} se puede oír en el habla, pero que delante de un verbo suele ir con verbos de dos sílabas, de registro escrito. Entre ${zh("一再", "yízài")} y el verbo puede ir ${zh("地", "de")}: ${zh("他一再地解释自己不是故意的", "tā yízài de jiěshì zìjǐ bù shì gùyì de")}, «explicó una y otra vez que no lo hizo a propósito». Sobre ${zh("再三", "zàisān")}, AllSet explica que es más formal, que va ante un verbo de dos sílabas y que, aunque habla del pasado, casi no lleva ${zh("了", "le")} ni ${zh("过", "guo")}: ${zh("老师再三强调这次考试对我们很重要", "lǎoshī zàisān qiángdiào zhè cì kǎoshì duì wǒmen hěn zhòngyào")}, «el maestro ha subrayado una y otra vez que este examen es muy importante».</p>
      <h3>¿Qué más trae el registro formal?</h3>
      <p>La misma página de AllSet empareja palabras habladas con formales: ${zh("没想到", "méi xiǎngdào")} se vuelve ${zh("不料", "búliào")}; ${zh("比较", "bǐjiào")}, ${zh("较为", "jiàowéi")}; y ${zh("从来没", "cónglái méi")}, ${zh("从未", "cóngwèi")}. Tres ejemplos propios: ${zh("我们想去公园，不料下雨了", "wǒmen xiǎng qù gōngyuán, búliào xià yǔ le")}, «queríamos ir al parque, pero resultó que llovió»; ${zh("这里较为安静", "zhèlǐ jiàowéi ānjìng")}, «aquí es bastante tranquilo»; y ${zh("我从未去过那里", "wǒ cóngwèi qùguo nàlǐ")}, «nunca he ido allí».</p>
      <h3>¿Y ${zh("特", "tè")} y ${zh("异常", "yìcháng")}?</h3>
      <p>Las dos suben el grado, como ${zh("很", "hěn")}. No hallé fuente de uso, solo el sílabo; aprende sus significados. Ejemplos propios: ${zh("今天异常冷", "jīntiān yìcháng lěng")}, «hoy hace un frío fuera de lo normal».</p>
      <p>Las demás de la tabla, como ${zh("难免", "nánmiǎn")}, ${zh("无疑", "wúyí")} o ${zh("推测", "tuīcè")}, se aprenden como palabras enteras; no hallé reglas para ellas.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que ${zh("未必", "wèibì")} es igual a ${zh("不", "bù")}. ${zh("不好", "bù hǎo")} dice «no es bueno»; ${zh("未必好", "wèibì hǎo")} solo dice «quizá no sea bueno».</p>`,
    ejemplo: `
      <p>Quieres decir: «lo caro no es necesariamente bueno». Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Empieza con la idea que dudas: ${zh("贵的东西好", "guì de dōngxi hǎo")}, «lo caro es bueno».</li>
        <li>Para negarla del todo dirías ${zh("不好", "bù hǎo")}, «no es bueno». Pero tú solo dudas, no lo afirmas.</li>
        <li>Pon ${zh("未必", "wèibì")} justo delante del adjetivo: ${zh("贵的东西未必好", "guì de dōngxi wèibì hǎo")}.</li>
      </ol>
      <p>Para comprobar, lee la frase y mira el sentido: deja abierta la posibilidad de que algo caro sí sea bueno. Si tu frase dice que nada caro es bueno, usaste ${zh("不", "bù")} y no ${zh("未必", "wèibì")}. Resultado: <span class="resultado">${zh("贵的东西未必好", "guì de dōngxi wèibì hǎo")} = «lo caro no es necesariamente bueno»</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner ${zh("未必", "wèibì")} al final de la frase. Va antes de lo que niegas, delante del verbo o del adjetivo.</p>`,
    vidaReal: `
      <p>Estas palabras te sirven para opinar con cuidado. Con ${zh("未必", "wèibì")} dudas sin pelear, algo útil cuando alguien afirma una cosa muy tajante. Con ${zh("不料", "búliào")} cuentas un imprevisto, y con ${zh("再三", "zàisān")} notas que alguien insistió. Además las verás en noticias, avisos y cartas, donde el chino suena más serio. Así puedes leerlas sin confundirlas con el habla de todos los días, y notar cuándo alguien duda en vez de negar.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>¿Qué significa ${zh("未必", "wèibì")}?</p>`,
        opciones: ['Nunca', 'No necesariamente', 'Seguramente', 'Todavía no'], correcta: 1,
        pista: '<p>Es una duda suave, no un «no» completo.</p>',
        solucion: `<p>${zh("未必", "wèibì")} significa «no necesariamente». ${zh("不", "bù")} es un «no» más firme.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «lo caro no es necesariamente bueno».</p>',
        respuesta: ['贵', '的', '东西', '未必', '好'], pinyin: ['guì', 'de', 'dōngxi', 'wèibì', 'hǎo'], lang: 'zh-Hans',
        pista: `<p>${zh("未必", "wèibì")} va justo antes del adjetivo.</p>`,
        solucion: `<p>${zh("贵的东西未必好", "guì de dōngxi wèibì hǎo")}: lo caro, ${zh("未必", "wèibì")} y ${zh("好", "hǎo")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según AllSet, de estas tres formas de decir «no necesariamente», ¿cuál es la formal?</p>`,
        opciones: [zh('不一定', 'bù yīdìng'), zh('不见得', 'bù jiàndé'), zh('未必', 'wèibì')], correcta: 2,
        pista: '<p>Es la que más verás en textos escritos.</p>',
        solucion: `<p>AllSet da ${zh("不一定", "bù yīdìng")} y ${zh("不见得", "bù jiàndé")} como informales y ${zh("未必", "wèibì")} como la formal.</p>` },
      { tipo: 'opciones', enunciado: `<p>Completa: ${zh("我们想去公园", "wǒmen xiǎng qù gōngyuán")}, ${zh("不料", "búliào")} ______.</p>`,
        opciones: [zh('下雨了', 'xià yǔ le'), zh('我们很高兴', 'wǒmen hěn gāoxìng'), zh('因为我去了', 'yīnwèi wǒ qù le'), zh('我想去', 'wǒ xiǎng qù')], correcta: 0,
        pista: `<p>${zh("不料", "búliào")} abre algo que no esperabas.</p>`,
        solucion: `<p>Después de ${zh("不料", "búliào")} va el imprevisto: ${zh("下雨了", "xià yǔ le")}, «llovió».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("未必")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['wèi bì'],
        pista: '<p>Las dos sílabas bajan de golpe.</p>',
        solucion: `<p>${zh("未必", "wèibì")}: <strong>wèi bì</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("再三", "zàisān")}.</p>`,
        respuestas: ['una y otra vez', 'repetidamente', 'varias veces', 'otra vez y otra', 'una y otra vez.', 'reiteradamente', 'muchas veces', 'insistentemente'],
        pista: '<p>El maestro la usa cuando subraya algo varias veces.</p>',
        solucion: `<p>${zh("再三", "zàisān")} es «repetidamente, una y otra vez», con tono formal.</p>` },
    ],
    fuentes: [SILABO, ALLSET_FORMAL, ALLSET('Expressing "again and again" with "yizai"', 'Expressing_%22again_and_again%22_with_%22yizai%22'), ALLSET('Expressing "over and over again" with "zaisan"', 'Expressing_%22over_and_over_again%22_with_%22zaisan%22')],
  });

  // ------------------------------------------------------------------
  L('El tono al hablar: 嘛 y 啦', {
    objetivo: `Entender y usar ${zh("啦", "la")} y ${zh("嘛", "ma")} al final de una frase, y reconocer fórmulas de charla como ${zh("算了", "suànle")}, ${zh("得了", "déle")}, ${zh("那倒也是", "nà dào yě shì")} y ${zh("好不容易", "hǎobù róngyì")}.`,
    explicacion: `
      <p>Cuando hablas con un amigo, no solo dices datos: también dejas ver si estás alegre, si algo te parece obvio o si ya te cansaste. En español lo haces con el tono de la voz. En chino, además, se añaden palabras pequeñas al final de la frase. Se llaman <strong>partículas de tono</strong>: no tienen significado propio, pero cambian cómo suena lo que dices. Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['嘛', 'ma', 'partícula: «es obvio» o marca el tema'], ['啦', 'la', 'partícula: unión de «le» y «a»'], ['也好', 'yěhǎo', 'partícula (sin regla en las fuentes)'], ['算了', 'suànle', 'déjalo, olvídalo'], ['得了', 'déle', 'ya está, basta'],
        ['好容易', 'hǎoróngyì', 'con mucha dificultad'], ['好不', 'hǎobù', 'qué…, muy (ante adjetivo)'], ['哇', 'wā', 'guau, vaya'], ['嘿', 'hēi', 'eh, oye'], ['瞧', 'qiáo', 'mirar, ver'],
        ['逗', 'dòu', 'gracioso; bromear'], ['尴尬', 'gāngà', 'incómodo, embarazoso'], ['委屈', 'wěiqu', 'sentirse tratado con injusticia'], ['痛快', 'tòngkuài', 'a gusto, muy contento'], ['不耐烦', 'bú nàifán', 'impaciente'],
      ])}
      <h3>¿Qué es ${zh("啦", "la")}?</h3>
      <p>Dartmouth explica que ${zh("啦", "la")} suena como la fusión de ${zh("了", "le")} y ${zh("啊", "a")}, y que reúne las funciones de ambas. Por eso se oye cuando algo ya pasó y lo dices con ganas. Con ${zh("我们到了", "wǒmen dào le")} avisas «ya llegamos»; con ${zh("我们到啦", "wǒmen dào la")} lo dices con alegría. Dartmouth añade que una serie de ${zh("啦", "la")} seguidos sirve para enumerar, y que una frase exclamativa con ${zh("可", "kě")} suele cerrar con una partícula como ${zh("啦", "la")}: ${zh("这次的考试可难啦", "zhè cì de kǎoshì kě nán la")}, «este examen sí que es difícil».</p>
      <h3>¿Qué hace ${zh("嘛", "ma")}?</h3>
      <p>Chinese Grammar Wiki (AllSet), fuente de apoyo, dice que ${zh("嘛", "ma")} al final se usa cuando quien habla siente que lo que dice es obvio: ${zh("开慢点，安全第一嘛", "kāi màn diǎn, ānquán dì-yī ma")}, «conduce despacio, la seguridad es lo primero». Otra página de AllSet cuenta que ${zh("嘛", "ma")} también marca el tema: nombras de qué hablas y te tomas un instante antes de comentar. Su ejemplo: ${zh("孩子嘛，不懂这些很正常", "háizi ma, bù dǒng zhèxiē hěn zhèngcháng")}, «son niños; es normal que no entiendan esto».</p>
      <h3>¿Y las fórmulas de charla?</h3>
      <p>MIT OpenCourseWare traduce ${zh("算了", "suànle")} como «olvídalo». Dartmouth trae el ejemplo ${zh("他不吃就算了", "tā bù chī jiù suàn le")}, «si no quiere comer, déjalo»; la lección no lo explica. MIT trae también un diálogo donde alguien dice ${zh("随便吃一点儿得了", "suíbiàn chī yìdiǎnr déle")}, «come un poco de lo que haya y ya está»; el libro no glosa ${zh("得了", "déle")}. Para ${zh("那倒也是", "nà dào yě shì")}, AllSet dice que sirve para admitir algo, como «supongo que sí, no lo había pensado». Y de ${zh("好不容易", "hǎobù róngyì")}, AllSet dice que ${zh("好容易", "hǎoróngyì")} significa lo mismo y se puede cambiar por él, aunque ${zh("好不容易", "hǎobù róngyì")} es más común. Suele seguirse de ${zh("才", "cái")} para subrayar que costó mucho: ${zh("我好不容易才找到这本书", "wǒ hǎobù róngyì cái zhǎodào zhè běn shū")}, «me costó mucho encontrar este libro».</p>
      <h3>¿Y ${zh("也好", "yěhǎo")}?</h3>
      <p>El sílabo la lista entre las otras partículas. No hallé regla ni ejemplo en las fuentes; aprende que existe y que es de la charla.</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("嘛", "ma")} o ${zh("啦", "la")} en una frase seria, como un aviso o una carta. Son del habla de todos los días.</p>`,
    ejemplo: `
      <p>Llegas con tu amigo a un lugar y quieres avisar con alegría: «ya llegamos, por fin». Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Empieza con el hecho: ${zh("我们到了", "wǒmen dào le")}, «ya llegamos». Aquí ${zh("了", "le")} dice que el cambio ya ocurrió.</li>
        <li>Quieres sonar contento. Recuerda que ${zh("啦", "la")} suena como ${zh("了", "le")} más ${zh("啊", "a")}.</li>
        <li>Cambia ${zh("了", "le")} por ${zh("啦", "la")}: ${zh("我们到啦", "wǒmen dào la")}.</li>
      </ol>
      <p>Para comprobar, mira que la frase termine en una sola partícula y que el sentido siga igual: ya llegaron. Si además suena como si lo dijeras sonriendo, la partícula cumplió su trabajo. Prueba también quitar la partícula y fíjate que la información no cambia, solo el ánimo. Resultado: <span class="resultado">${zh("我们到啦", "wǒmen dào la")} = «ya llegamos, por fin»</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir ${zh("了啦", "le la")} juntos. ${zh("啦", "la")} ya trae dentro a ${zh("了", "le")}, así que se pone uno solo.</p>`,
    vidaReal: `
      <p>En mensajes y charlas verás estas partículas todo el tiempo. Con ${zh("嘛", "ma")} notas cuando alguien dice «pero si es evidente», y con ${zh("啦", "la")} cuando algo se dice con ánimo. ${zh("算了", "suànle")} y ${zh("好不容易", "hǎobù róngyì")} te ayudan a entender cuando alguien se rinde o cuenta que le costó trabajo. Así lees el tono de una conversación, no solo las palabras. Y cuando tú hables, tus frases sonarán más naturales y menos como un libro de texto.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Según Dartmouth, ¿de qué dos palabras nace ${zh("啦", "la")}?</p>`,
        opciones: [zh('了 y 吗', 'le y ma'), zh('吧 y 呢', 'ba y ne'), zh('了 y 啊', 'le y a'), zh('的 y 了', 'de y le')], correcta: 2,
        pista: '<p>Una dice que algo ya pasó; la otra suena a exclamación.</p>',
        solucion: `<p>Dartmouth dice que ${zh("啦", "la")} es la fusión de ${zh("了", "le")} y ${zh("啊", "a")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «conduce despacio, la seguridad es lo primero».</p>',
        respuesta: ['开', '慢点', '安全', '第一', '嘛'], pinyin: ['kāi', 'màn diǎn', 'ānquán', 'dì-yī', 'ma'], lang: 'zh-Hans',
        pista: `<p>${zh("嘛", "ma")} cierra la frase.</p>`,
        solucion: `<p>${zh("开慢点，安全第一嘛", "kāi màn diǎn, ānquán dì-yī ma")}: la orden, la razón y ${zh("嘛", "ma")} al final.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según AllSet, ¿cuándo se usa ${zh("嘛", "ma")} al final de una frase?</p>`,
        opciones: ['Cuando quien habla siente que lo dicho es obvio', 'Para hacer una pregunta', 'Para decir que algo ya terminó', 'Para despedirse'], correcta: 0,
        pista: '<p>Piensa en «pero si es evidente».</p>',
        solucion: '<p>AllSet dice que ' + zh('嘛', 'ma') + ' se usa cuando el hablante siente que lo que dice es obvio.</p>' },
      { tipo: 'opciones', enunciado: `<p>MIT traduce ${zh("算了", "suànle")} como «Forget about it!». ¿Qué le dirías a alguien con eso?</p>`,
        opciones: ['Ven aquí', 'Olvídalo, déjalo', 'Muchas gracias', 'Más despacio'], correcta: 1,
        pista: '<p>La traducción en inglés lo dice casi literal.</p>',
        solucion: `<p>${zh("算了", "suànle")} es «olvídalo, déjalo».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("好容易")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['hǎo róng yì'],
        pista: '<p>La primera sílaba baja y sube; la segunda sube; la tercera baja de golpe.</p>',
        solucion: `<p>${zh("好容易", "hǎoróngyì")}: <strong>hǎo róng yì</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("尴尬", "gāngà")}.</p>`,
        respuestas: ['incomodo', 'embarazoso', 'vergonzoso', 'violento', 'incomoda', 'situacion incomoda', 'avergonzado', 'incomodidad'],
        pista: '<p>Es lo que sientes cuando todos te miran después de un error.</p>',
        solucion: `<p>${zh("尴尬", "gāngà")} es «incómodo, embarazoso».</p>` },
    ],
    fuentes: [SILABO, DART_19, DART_14, DART_22, MIT, ALLSET_MA1, ALLSET_MA2, ALLSET_HAORONGYI, ALLSET_DAO2, ALLSET_FORMAL],
  });

  // ------------------------------------------------------------------
  L('Hasta: 到…为止', {
    objetivo: `Poner un límite con ${zh("到……为止", "dào…… wéizhǐ")} y unir ideas con ${zh("要么……要么……", "yàome…… yàome……")}, ${zh("除非", "chúfēi")}, ${zh("凡是", "fánshì")}, ${zh("就算", "jiùsuàn")}, ${zh("以便", "yǐbiàn")}, ${zh("以免", "yǐmiǎn")} y ${zh("虽", "suī")}.`,
    explicacion: `
      <p>Las reglas de un juego, un plazo de entrega, un permiso con condiciones: todo eso pone límites y condiciones. Para decirlos, el chino usa pares de palabras que se reparten entre dos partes de la frase. Aquí verás varios. Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['为止', 'wéizhǐ', 'hasta (límite)'], ['要么', 'yàome', 'o bien'], ['除非', 'chúfēi', 'a menos que'], ['凡是', 'fánshì', 'todo lo que, todo el que'], ['就算', 'jiùsuàn', 'aunque, aun si'],
        ['以便', 'yǐbiàn', 'para, a fin de'], ['以免', 'yǐmiǎn', 'para evitar'], ['虽', 'suī', 'aunque (escrito)'], ['即便', 'jíbiàn', 'aunque, aun si'], ['期限', 'qīxiàn', 'plazo'],
        ['延期', 'yánqī', 'aplazar, prorrogar'], ['拖延', 'tuōyán', 'retrasar'], ['进度', 'jìndù', 'avance, ritmo del trabajo'], ['前提', 'qiántí', 'condición previa'], ['只得', 'zhǐdé', 'no tener más remedio que'],
      ])}
      <h3>¿Cómo pongo un límite con ${zh("到……为止", "dào…… wéizhǐ")}?</h3>
      <p>El sílabo de nivel 6 lista el patrón ${zh("到……为止", "dào…… wéizhǐ")}. No hallé una fuente de uso; como simplificación de la lección, entre las dos piezas va el momento o el punto donde algo termina. Wikcionario, fuente de apoyo, dice que ${zh("为止", "wéizhǐ")} es una posposición que significa «hasta» y lista ${zh("到……为止", "dào…… wéizhǐ")} como término derivado. Ejemplo propio: ${zh("报名到星期五为止", "bàomíng dào xīngqīwǔ wéizhǐ")}, «la inscripción es hasta el viernes».</p>
      <h3>¿Cómo elijo entre dos cosas?</h3>
      <p>Dartmouth dice que ${zh("要么", "yàome")} es una conjunción que indica elegir entre dos o más alternativas, y que a veces sugiere «negociación». Solo une cláusulas u oraciones, no palabras sueltas como sí hace ${zh("或者", "huòzhě")}. Su ejemplo: ${zh("早上的时候，我要么吃个苹果，要么喝杯果汁，我不吃面包", "zǎoshang de shíhou, wǒ yàome chī ge píngguǒ, yàome hē bēi guǒzhī, wǒ bù chī miànbāo")}, «por la mañana, o bien como una manzana o bien tomo un jugo; no como pan».</p>
      <h3>¿Y las condiciones?</h3>
      <p>AllSet, fuente de apoyo, explica ${zh("除非", "chúfēi")} como «a menos que»: ${zh("除非你是会员，否则不能进去", "chúfēi nǐ shì huìyuán, fǒuzé bù néng jìnqù")}, «a menos que seas socio, no puedes entrar». Con ${zh("才", "cái")} en la segunda parte significa «solo si»: ${zh("除非老板给我加薪，我才会留下来", "chúfēi lǎobǎn gěi wǒ jiā xīn, wǒ cái huì liú xiàlái")}. Para ${zh("凡是", "fánshì")}, AllSet da el molde ${zh("凡是", "fánshì")} + sustantivo + ${zh("都", "dōu")}: ${zh("凡是会员都有折扣", "fánshì huìyuán dōu yǒu zhékòu")}, «todos los socios tienen descuento». Y ${zh("就算", "jiùsuàn")} es un «aun si» informal, con la sensación de que quien habla duda de que la hipótesis sea razonable: ${zh("就算你不想听，我也要说", "jiùsuàn nǐ bù xiǎng tīng, wǒ yě yào shuō")}, «aunque no quieras escucharlo, tengo que decirlo».</p>
      <h3>¿Y para qué hago algo?</h3>
      <p>AllSet dice que ${zh("以便", "yǐbiàn")} es la forma formal de «para» o «a fin de»: ${zh("老师放慢了语速，以便学生能听懂", "lǎoshī fàngmànle yǔsù, yǐbiàn xuésheng néng tīngdǒng")}. Y ${zh("以免", "yǐmiǎn")} es la forma corta de «para evitar», del chino escrito; la primera parte trae un aviso y la segunda dice qué pasaría si lo ignoras. Pide una frase completa, no un verbo suelto.</p>
      <h3>¿Y ${zh("虽", "suī")}?</h3>
      <p>Dartmouth explica que ${zh("虽然", "suīrán")} admite el hecho de la primera parte y afirma también lo de la segunda, que suele empezar con ${zh("但是", "dànshì")}, ${zh("可是", "kěshì")}, ${zh("却", "què")}, ${zh("还是", "háishi")} o ${zh("仍然", "réngrán")}. Si ${zh("虽然", "suīrán")} abre la segunda cláusula, se omiten ${zh("但是", "dànshì")} y ${zh("可是", "kěshì")}. Ejemplo: ${zh("我虽然很喜欢看足球，却不会踢足球", "wǒ suīrán hěn xǐhuan kàn zúqiú, què bú huì tī zúqiú")}. El sílabo lista la forma corta ${zh("虽", "suī")}; en la lección siguiente la verás como par escrito de ${zh("虽然", "suīrán")}.</p>
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("以免", "yǐmiǎn")} con un solo verbo. Necesita una frase completa.</p>`,
    ejemplo: `
      <p>Quieres escribir en un cartel: «La inscripción es hasta el viernes». Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Piensa en la acción: ${zh("报名", "bàomíng")}, «inscribirse».</li>
        <li>Elige el momento donde termina: ${zh("星期五", "xīngqīwǔ")}, «el viernes».</li>
        <li>Pon ${zh("到", "dào")} antes de ese momento y ${zh("为止", "wéizhǐ")} después. Así el viernes queda dentro de las dos piezas: ${zh("到星期五为止", "dào xīngqīwǔ wéizhǐ")}.</li>
        <li>Junta la acción con el límite: ${zh("报名到星期五为止", "bàomíng dào xīngqīwǔ wéizhǐ")}.</li>
      </ol>
      <p>Para comprobar, mira que el momento quede entre ${zh("到", "dào")} y ${zh("为止", "wéizhǐ")}, como un sándwich. Prueba cambiar el día: con ${zh("星期三", "xīngqīsān")} la frase sigue igual y solo cambia el límite. Si el momento se sale de las dos piezas, la frase pierde su forma. Resultado: <span class="resultado">${zh("报名到星期五为止", "bàomíng dào xīngqīwǔ wéizhǐ")} = «la inscripción es hasta el viernes»</span>.</p>
      <p class="nota"><strong>Error común:</strong> dejar el momento fuera, después de ${zh("为止", "wéizhǐ")}. Va siempre en medio.</p>`,
    vidaReal: `
      <p>Los límites y las condiciones están por todos lados: en un cartel de inscripción, en las reglas de un club, en una promesa de ayuda. Con ${zh("为止", "wéizhǐ")} sabes hasta cuándo vale algo. Con ${zh("除非", "chúfēi")} y ${zh("就算", "jiùsuàn")} entiendes en qué casos cambia la regla. Y con ${zh("以便", "yǐbiàn")} y ${zh("以免", "yǐmiǎn")} sabes para qué se pide una cosa. Es una forma de entender las reglas antes de que alguien te las explique.</p>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «la inscripción es hasta el viernes».</p>',
        respuesta: ['报名', '到', '星期五', '为止'], pinyin: ['bàomíng', 'dào', 'xīngqīwǔ', 'wéizhǐ'], lang: 'zh-Hans',
        pista: `<p>El momento va entre ${zh("到", "dào")} y ${zh("为止", "wéizhǐ")}.</p>`,
        solucion: `<p>${zh("报名到星期五为止", "bàomíng dào xīngqīwǔ wéizhǐ")}: la acción, ${zh("到", "dào")}, el momento y ${zh("为止", "wéizhǐ")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según Dartmouth, ¿qué indica ${zh("要么", "yàome")}?</p>`,
        opciones: ['Que algo ya pasó', 'Una pregunta', 'Elegir entre dos o más alternativas', 'Un límite de tiempo'], correcta: 2,
        pista: '<p>Se usa dos veces: «o bien… o bien…».</p>',
        solucion: `<p>${zh("要么", "yàome")} indica una elección entre alternativas, a veces con tono de negociación.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según AllSet, ¿qué significa ${zh("除非", "chúfēi")} con ${zh("才", "cái")} en la segunda parte?</p>`,
        opciones: ['Aunque', 'Solo si', 'Para evitar', 'Hasta'], correcta: 1,
        pista: '<p>Piensa en «solo si el jefe me sube el sueldo, me quedo».</p>',
        solucion: `<p>Con ${zh("才", "cái")}, ${zh("除非", "chúfēi")} equivale a «solo si».</p>` },
      { tipo: 'opciones', enunciado: `<p>Según Dartmouth, si ${zh("虽然", "suīrán")} abre la segunda cláusula, ¿qué palabras se omiten?</p>`,
        opciones: [zh('但是 y 可是', 'dànshì y kěshì'), zh('我 y 你', 'wǒ y nǐ'), zh('的 y 了', 'de y le'), zh('不 y 没', 'bù y méi')], correcta: 0,
        pista: '<p>Son las palabras que significan «pero».</p>',
        solucion: `<p>Se omiten ${zh("但是", "dànshì")} y ${zh("可是", "kěshì")}.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("为止")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['wéi zhǐ'],
        pista: '<p>La primera sílaba sube; la segunda baja y sube.</p>',
        solucion: `<p>${zh("为止", "wéizhǐ")}: <strong>wéi zhǐ</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("以免", "yǐmiǎn")}.</p>`,
        respuestas: ['para evitar', 'a fin de evitar', 'con el fin de evitar', 'para que no', 'evitar', 'para no'],
        pista: '<p>La primera parte da un aviso; esta palabra dice qué evitar.</p>',
        solucion: `<p>${zh("以免", "yǐmiǎn")} es «para evitar», del chino escrito.</p>` },
    ],
    fuentes: [SILABO, DART_20, DART('Lesson 1, notas de gramática', '%e7%ac%ac%e4%b8%80%e8%af%be-lesson-1'), ALLSET('Expressing "unless" with "chufei"', 'Expressing_%22unless%22_with_%22chufei%22'), ALLSET('Expressing "all" with "fanshi"', 'Expressing_%22all%22_with_%22fanshi%22'), ALLSET('Expressing "even if…" with "jiusuan"', 'Expressing_%22even_if%E2%80%A6%22_with_%22jiusuan%22'), ALLSET('Facilitating an outcome with "yibian"', 'Facilitating_an_outcome_with_%22yibian%22'), ALLSET('"In order to avoid" with "yimian"', '%22In_order_to_avoid%22_with_%22yimian%22'), { nombre: 'Wikcionario en inglés (apoyo, no universitario): 為止 / 为止 (en inglés)', url: 'https://en.wiktionary.org/wiki/%E7%82%BA%E6%AD%A2' }],
  });

  // ------------------------------------------------------------------
  L('Lengua hablada y lengua escrita', {
    objetivo: `Reconocer pares de palabras habladas y escritas, pasar una frase de un registro a otro, y usar ${zh("透了", "tòu le")}, ${zh("一时", "yìshí")}, ${zh("串", "chuàn")}, ${zh("番", "fān")}, ${zh("滴", "dī")}, ${zh("净", "jìng")}, ${zh("一同", "yìtóng")}, ${zh("大都", "dàdū")} y ${zh("不时", "bùshí")}.`,
    explicacion: `
      <p>Cuando le cuentas algo a un amigo y cuando escribes una carta, no usas las mismas palabras. En español dices «porque» al hablar y «debido a» en un aviso. El chino también cambia de registro. MIT OpenCourseWare dice que el texto escrito siempre difiere del hablado, porque cumple otras funciones. Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['书面', 'shūmiàn', 'escrito, por escrito'], ['口头', 'kǒutóu', 'oral, de palabra'], ['言语', 'yányǔ', 'habla, palabras'], ['叙述', 'xùshù', 'narrar, contar'], ['描写', 'miáoxiě', 'describir'],
        ['稿子', 'gǎozi', 'borrador, texto preparado'], ['透', 'tòu', 'del todo, por completo'], ['一时', 'yìshí', 'por un momento'], ['不时', 'bùshí', 'de vez en cuando'], ['大都', 'dàdū', 'en su mayor parte'],
        ['净', 'jìng', 'solo, nada más que'], ['一同', 'yìtóng', 'juntos'], ['番', 'fān', 'clasificador de acciones'], ['串', 'chuàn', 'racimo, tira; clasificador'], ['滴', 'dī', 'gota; gotear; clasificador'],
      ])}
      <h3>¿Qué pares cambian entre hablar y escribir?</h3>
      <p>Las fuentes dan estos pares. Lee la columna del centro como lo que dirías en voz alta y la de la derecha como lo que verías en un texto.</p>
      ${cuadro(['Significado', 'Hablado', 'Escrito', 'Fuente'], [
        ['porque', zh('因为', 'yīnwèi'), zh('因', 'yīn'), 'Oxford'],
        ['todavía no', zh('还没有', 'hái méiyǒu'), zh('未', 'wèi'), 'Oxford'],
        ['pero', zh('但是', 'dànshì'), zh('然而', 'rán\'ér'), 'AllSet'],
        ['aunque', zh('虽然', 'suīrán'), zh('虽', 'suī'), 'AllSet'],
        ['(llevar algo)', zh('把', 'bǎ'), zh('将', 'jiāng'), 'Oxford y AllSet'],
        ['y (unir)', zh('跟', 'gēn'), zh('和', 'hé'), 'MIT'],
        ['en, a', zh('在', 'zài'), zh('于', 'yú'), 'MIT y Oxford'],
      ])}
      <p>Un detalle: Oxford dice que ${zh("将", "jiāng")} se usa mucho en lo escrito, mientras que ${zh("把", "bǎ")} sirve en los dos registros. Para ${zh("于", "yú")}, MIT la llama preposición literaria, y Oxford la compara con ${zh("在", "zài")}. MIT añade que al escribir se acorta ${zh("以前", "yǐqián")} a ${zh("前", "qián")}, y que ${zh("之前", "zhīqián")} es una versión más formal. Sobre ${zh("但是", "dànshì")}, ChinGram dice que vale en los dos registros, y que ${zh("可是", "kěshì")} y ${zh("不过", "búguò")} son más de habla.</p>
      <p>Oxford suma otra pista: en el chino escrito importa que la frase tenga sílabas equilibradas, y a veces se quita una sílaba de una palabra para lograrlo.</p>
      <h3>¿Qué más trae esta lección?</h3>
      <p>Dartmouth señala que, tras ${zh("简直", "jiǎnzhí")} + adjetivo, se puede añadir ${zh("透了", "tòu le")}: ${zh("今天的天气简直糟透了", "jīntiān de tiānqì jiǎnzhí zāo tòu le")}, «hoy el tiempo es pésimo del todo». AllSet explica que ${zh("一时", "yìshí")} va entre el sujeto y el verbo y expresa un lapso breve: ${zh("我一时想不起他是谁", "wǒ yìshí xiǎng bu qǐ tā shì shéi")}. El sílabo lista también ${zh("一时……一时……", "yìshí…… yìshí……")}; como simplificación de la lección, es «un rato… otro rato…»: ${zh("天气一时冷，一时热", "tiānqì yìshí lěng, yìshí rè")}.</p>
      <p>MIT usa ${zh("串", "chuàn")} para un racimo, como de plátanos. El sílabo lista ${zh("滴", "dī")} entre los clasificadores de cosas y ${zh("番", "fān")} entre los de acciones; no hallé regla para ellos. Wikcionario, fuente de apoyo, glosa ${zh("一同", "yìtóng")} como «juntos», ${zh("大都", "dàdū")} como «en su mayor parte» y ${zh("不时", "bùshí")} como «de vez en cuando»: ${zh("他不时来看我", "tā bùshí lái kàn wǒ")}. De ${zh("净", "jìng")} solo sé que el sílabo la pone entre los adverbios de alcance. Esto enlaza con «Comprensión lectora», de Lectura.</p>
      <p class="nota"><strong>Trampa común:</strong> usar palabras escritas al hablar con amigos. Suenan a libro.</p>`,
    ejemplo: `
      <p>Un cartel dice, en lengua hablada: «Por la lluvia, la actividad todavía no empieza. Pero empieza el viernes; trae el formulario». Vamos a pasarlo a lengua escrita.</p>
      <p>Versión hablada: ${zh("因为下雨，活动还没有开始。但是活动在星期五再开始，请你把表格带来。", "yīnwèi xià yǔ, huódòng hái méiyǒu kāishǐ. dànshì huódòng zài xīngqīwǔ zài kāishǐ, qǐng nǐ bǎ biǎogé dàilái.")}</p>
      <ol class="pasos-ej">
        <li>Cambia ${zh("因为", "yīnwèi")} por ${zh("因", "yīn")}, y ${zh("还没有", "hái méiyǒu")} por ${zh("未", "wèi")}.</li>
        <li>Cambia ${zh("但是", "dànshì")} por ${zh("然而", "rán'ér")}, y ${zh("在", "zài")} por ${zh("于", "yú")}.</li>
        <li>Cambia ${zh("把", "bǎ")} por ${zh("将", "jiāng")} y quita ${zh("你", "nǐ")}.</li>
      </ol>
      <p>Versión escrita: ${zh("因下雨，活动未开始。然而活动于星期五再开始，请将表格带来。", "yīn xià yǔ, huódòng wèi kāishǐ. rán'ér huódòng yú xīngqīwǔ zài kāishǐ, qǐng jiāng biǎogé dàilái.")}</p>
      <p>Para comprobar, cuenta que cada cambio viene de un par de la tabla y que el sentido no cambió. Quitar ${zh("你", "nǐ")} es decisión de la lección, no de las fuentes. Resultado: <span class="resultado">dos textos con la misma información y distinto tono</span>.</p>
      <p class="nota"><strong>Error común:</strong> cambiar solo una palabra y dejar el resto hablado. El texto queda mezclado.</p>`,
    vidaReal: `
      <p>Saber el registro te dice de qué tipo de texto se trata. Un cartel, una carta o un informe usan la columna escrita; un mensaje a un amigo, la hablada. Así no te confundes cuando una misma idea aparece con otras palabras. Si algún día escribes un aviso, sabrás elegir el tono correcto, y al leer una noticia notarás por qué suena más seria que una charla.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Según Oxford, ${zh("因", "yīn")} es la forma corta de otra palabra. ¿Cuál?</p>`,
        opciones: [zh('因为', 'yīnwèi'), zh('所以', 'suǒyǐ'), zh('但是', 'dànshì'), zh('如果', 'rúguǒ')], correcta: 0,
        pista: '<p>Significa «porque».</p>',
        solucion: `<p>Oxford dice que ${zh("因", "yīn")} es la forma corta de ${zh("因为", "yīnwèi")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según AllSet, ¿cuál es el par escrito de ${zh("但是", "dànshì")}?</p>`,
        opciones: [zh('可是', 'kěshì'), zh('不过', 'búguò'), zh('然而', 'rán\'ér'), zh('还是', 'háishi')], correcta: 2,
        pista: '<p>Es la palabra más formal de las cuatro.</p>',
        solucion: `<p>AllSet empareja ${zh("但是", "dànshì")} con ${zh("然而", "rán'ér")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir en estilo escrito «por la lluvia, la actividad todavía no empieza».</p>',
        respuesta: ['因', '下雨', '活动', '未', '开始'], pinyin: ['yīn', 'xià yǔ', 'huódòng', 'wèi', 'kāishǐ'], lang: 'zh-Hans',
        pista: `<p>${zh("因", "yīn")} abre la causa y ${zh("未", "wèi")} va antes del verbo.</p>`,
        solucion: `<p>${zh("因下雨，活动未开始", "yīn xià yǔ, huódòng wèi kāishǐ")}: causa, sujeto, ${zh("未", "wèi")} y verbo.</p>` },
      { tipo: 'opciones', enunciado: `<p>Dartmouth da ${zh("今天的天气简直糟透了", "jīntiān de tiānqì jiǎnzhí zāo tòu le")}. ¿Qué dice?</p>`,
        opciones: ['Hoy hace buen tiempo', 'Hoy el tiempo es pésimo del todo', 'Mañana lloverá', 'Hoy no hay clase'], correcta: 1,
        pista: `<p>${zh("透了", "tòu le")} refuerza un adjetivo negativo.</p>`,
        solucion: `<p>${zh("糟透了", "zāo tòu le")} es «pésimo del todo».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("书面")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['shū miàn'],
        pista: '<p>La primera sílaba empieza alta y se mantiene; la segunda baja de golpe.</p>',
        solucion: `<p>${zh("书面", "shūmiàn")}: <strong>shū miàn</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("口头", "kǒutóu")}.</p>`,
        respuestas: ['oral', 'de palabra', 'hablado', 'verbal', 'por voz', 'de viva voz'],
        pista: '<p>Es lo contrario de «por escrito».</p>',
        solucion: `<p>${zh("口头", "kǒutóu")} es «oral, de palabra».</p>` },
    ],
    fuentes: [SILABO, MIT, OXFORD, ALLSET_FORMAL, { nombre: 'ChinGram, Universidad Palacký de Olomouc (Chequia): 虽然, 但是, 可是 y 不过 (en inglés)', url: 'https://chingram.upol.cz/grammar/conjunctions-danshi-%e4%bd%86%e6%98%af-keshi-%e5%8f%af%e6%98%af-and-buguo-%e4%b8%8d%e8%bf%87-%e4%b8%8d%e9%81%8e-but-however-and-the-construction-suirandanshi-%e8%99%bd' }, DART('Lesson 7, notas de gramática', '%e7%ac%ac%e4%b8%83%e8%af%be-lesson-7'), ALLSET('Comparing "yishi" and "yidu"', 'Comparing_%22yishi%22_and_%22yidu%22'), { nombre: 'Wikcionario en inglés (apoyo, no universitario): 一同, 大都 y 不時 (en inglés)', url: 'https://en.wiktionary.org/wiki/%E4%B8%80%E5%90%8C' }],
  });

})();
