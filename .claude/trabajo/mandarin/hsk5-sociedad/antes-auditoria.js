// Mandarín · Unidad 14: HSK 5 · Sociedad.
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
  const OXFORD = (n, url) => ({ nombre: 'Universidad de Oxford (Reino Unido), CTCFL: ' + n + ' (en inglés)', url: 'https://www.ctcfl.ox.ac.uk/' + url });
  // Dartmouth (F2 a F8, F18, F19, F31 a F34)
  const DART_26 = DART('Lección 26, notas de gramática', 'new-2');
  const DART_4 = DART('Lección 4, notas de gramática y glosas', '%e7%ac%ac%e5%9b%9b%e8%af%be-lesson-4');
  const DART_13 = DART('Lección 13, texto con 通常', '%e7%ac%ac%e5%8d%81%e4%b8%89%e8%af%be-lesson-13');
  const DART_14 = DART('Lección 14, texto con 通常', '%e7%ac%ac%e5%8d%81%e5%9b%9b%e8%af%be-lesson-14');
  const DART_7 = DART('Lección 7, ejemplo de 老是', '%e7%ac%ac%e4%b8%83%e8%af%be-lesson-7');
  const DART_15 = DART('Lección 15, glosa de 舍不得', '%e7%ac%ac%e5%8d%81%e4%ba%94%e8%af%be-lesson-15');
  const DART_5 = DART('Lección 5, complemento potencial y 过', '%e7%ac%ac%e4%ba%94%e8%af%be-lesson-5');
  const DART_9 = DART('Lección 9, nota de gramática sobre 把', '%e7%ac%ac%e4%b9%9d%e8%af%be-lesson-9');
  const DART_16 = DART('Lección 16, nota de gramática sobre 被', '%e7%ac%ac%e5%8d%81%e5%85%ad%e8%af%be-lesson-16');
  const DART_1 = DART('Lección 1, glosa y ejemplos de 曾经', '%e7%ac%ac%e4%b8%80%e8%af%be-lesson-1');
  const DART_3 = DART('Lección 3, texto con glosas', '%e7%ac%ac%e4%b8%80%e8%af%be-lesson-3');
  const DART_8 = DART('Lección 8, texto con glosas', '%e7%ac%ac%e5%85%ab%e8%af%be-lesson-8');
  // AllSet (apoyo)
  const ALLSET_LAOSHI = ALLSET('Using "always" as a complaint with "laoshi"', 'Using_%22always%22_as_a_complaint_with_%22laoshi%22');
  const ALLSET_GEWAI = ALLSET('Expressing "especially" with "gewai"', 'Expressing_%22especially%22_with_%22gewai%22');
  const ALLSET_BA = ALLSET('Using "ba" sentences', 'Using_%22ba%22_sentences');
  const ALLSET_CENGJING = ALLSET('Expressing "once" with "cengjing"', 'Expressing_%22once%22_with_%22cengjing%22');
  const ALLSET_FILAS = ALLSET('Actions in a row', 'Actions_in_a_row');
  const ALLSET_LAI = ALLSET('Using "lai" to connect two verb phrases', 'Using_%22lai%22_to_connect_two_verb_phrases');
  const ALLSET_ORDEN = ALLSET('Chinese word order', 'Chinese_word_order');
  const ALLSET_BICI = ALLSET('Expressing "each other" with "bici"', 'Expressing_%22each_other%22_with_%22bici%22');
  // Oxford, ChinGram, MIT, Wikcionario
  const OX_POTENCIAL = OXFORD('Potential verb complement', 'materials_grammar-exercises_pvc/');
  const OX_BA = OXFORD('la construcción 把', 'materials_grammar-exercises_ba/');
  const OX_BEI = OXFORD('la pasiva con 被, 让, 叫 y 给', 'materials_grammar-exercises_bei/');
  const OX_PRENSA = OXFORD('textos de lectura de prensa 1, glosario (2011)', 'media/pages/pdf/fdtl_2nd-yr-newspaper_reading-texts-1.pdf');
  const CG_BI = CHINGRAM('Unequal comparisons, la preposición 比', 'unequal-comparisons-the-comparative-preposition-bi-%e6%af%94-to-compare-with-to');
  const CG_MASHANG = CHINGRAM('Adverbs of time mǎshàng, xiān, yǒushí', 'adverbs-of-time-mashang-%e9%a9%ac%e4%b8%8a-%e9%a6%ac%e4%b8%8a-immediately-right-away-at-once-xian-%e5%85%88-first-and-youshi-%e6%9c%89%e6%97%b6-%e6%9c%89');
  const CG_GEN = CHINGRAM('Preposition gēn 跟 "with"', 'preposition-gen-%e8%b7%9fwith');
  const MIT = { nombre: 'MIT OpenCourseWare (EE. UU.), J. K. Wheatley, Learning Chinese: A Foundation Course in Mandarin (2011, en inglés)', url: 'https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/res21g_003_s_11.pdf' };
  const WIKT = { nombre: 'Wikcionario en inglés (apoyo, no universitario), entrada 較 / 较 (en inglés)', url: 'https://en.wiktionary.org/wiki/%E8%BC%83' };

  // Unidades 5 a 7 (ciudad, economía, naturaleza).
  const DART_30 = DART('Lección 30, texto con glosas', '%e7%ac%ac%e4%b8%89%e5%8d%81%e8%af%be-lesson-30');
  const DART_29 = DART('Lección 29, nota sobre 始终', '%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%b9%9d%e8%af%be-lesson-29');
  const DART_27 = DART('Lección 27, texto con 或是', '%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%b8%83%e8%af%be-lesson-27');
  const ALLSET_CHAO = ALLSET('Comparing "chao", "xiang" and "wang"', 'Comparing_%22chao%22_%22xiang%22_and_%22wang%22');
  const ALLSET_YILAI = ALLSET('Expressing "ever since" with "yilai"', 'Expressing_%22ever_since%22_with_%22yilai%22');
  const ALLSET_PING = ALLSET('Expressing "on the basis of" with "ping"', 'Expressing_%22on_the_basis_of%22_with_%22ping%22');
  const ALLSET_JU = ALLSET('Comparing "genju" and "ju"', 'Comparing_%22genju%22_and_%22ju%22');
  const ALLSET_YIJI = ALLSET('Expressing "as well as" with "yiji"', 'Expressing_%22as_well_as%22_with_%22yiji%22');
  const ALLSET_MEIYOU = ALLSET('Expressing "if not..., then..." using "meiyou...jiu..."', 'Expressing_%22if_not...,_then...%22_using_%22meiyou%E2%80%A6%E2%80%A6jiu%E2%80%A6%E2%80%A6%22');
  const OX_PRENSA_NOTAS = OXFORD('notas de gramática para leer periódicos (2011)', 'materials_grammar-exercises_newspaperreadinggrammarnotes/');
  const OX_CLASIF = OXFORD('Measure words', 'materials_grammar-exercises_measure-words/');
  const CG_CLASIF = CHINGRAM('Measure words - nouns', 'measure-words-nouns');
  const CG_HE = CHINGRAM('conjunción 和 «y»', 'conjunction-he-%e5%92%8c-and-2');
  const CG_YAOLE = CHINGRAM('(就)要…了 y 快要…了 «a punto de»', 'jiuyaole-%e5%b0%b1%e8%a6%81%e4%ba%86and-kuaiyaole-%e5%bf%ab%e8%a6%81%e4%ba%86-about-to');
  const CG_HUOZHE = CHINGRAM('conjunción 或者 «o»', 'conjunction-huozhe-%e6%88%96%e8%80%85-or');
  const CG_YIZHI = CHINGRAM('adverbio de tiempo 一直', 'the-time-adverb-yizhi-%e4%b8%80%e7%9b%b4continuously');

  // Gráfica de barras de una serie (copiada de hsk4-vida.js).
  const G = window.grafica;
  const txt = (x, y, texto) => ({ tipo: 'texto', x, y, texto });
  const barras = ({ etiquetas, valores, min, max, paso, descripcion }) => {
    const alto = max - min;
    const figuras = valores.flatMap((v, i) => [
      { tipo: 'poligono', puntos: [[i + 0.15, 0], [i + 0.85, 0], [i + 0.85, v], [i + 0.15, v]], solido: true },
      txt(i + 0.5, min - alto * 0.06, etiquetas[i]),
      txt(i + 0.5, v >= 0 ? v + alto * 0.05 : v - alto * 0.05, String(v)),
    ]);
    return G({ x: [0, valores.length], y: [min - alto * 0.14, max + alto * 0.1], pasos: [1e9, paso], nombres: false, figuras, descripcion });
  };
  // Datos de ejemplo, no reales: ganancia mensual de una tienda inventada, en miles de monedas.
  const GANANCIA = () => barras({ etiquetas: ['Mes 1', 'Mes 2', 'Mes 3'], valores: [10, 15, 25], min: 0, max: 30, paso: 10,
    descripcion: 'Gráfica de barras con datos de ejemplo: ganancia mensual de una tienda inventada, en miles de monedas. Mes 1: 10, mes 2: 15 y mes 3: 25. Las barras suben de un mes al siguiente.' });

  // ------------------------------------------------------------------
  L('Salud y bienestar emocional', {
    objetivo: `Decir con qué grado y con qué frecuencia pasa algo con ${zh("相当", "xiāngdāng")}, ${zh("格外", "géwài")}, ${zh("通常", "tōngcháng")} y ${zh("老是", "lǎoshì")}, y reconocer ${zh("吃不得", "chī bu dé")}.`,
    explicacion: `
      <p>Esta unidad toma temas de la vida diaria. Cada lección trae una selección de 15 palabras, no toda la lista; la lista completa está en el <a href="${encodeURI(SILABO.url)}">sílabo</a>. Las frases de ejemplo son de la lección. La voz depende de tu dispositivo: si suena rara, el pinyin manda. Y ${zh("不", "bù")} y ${zh("一", "yī")} se escriben con su tono original; al hablar cambian (unidad 9).</p>
      <p>Un amigo te dice «estoy cansado» y tú preguntas: ¿cuánto? En español puedes decir bastante, especialmente, demasiado o sumamente. El chino también tiene palabras para subir el grado antes de un adjetivo. Aquí las usas para hablar del cuerpo y del ánimo. Solo describes; no das consejos de salud:</p>
      <ul>
        <li>${zh("妈妈今天相当累", "māma jīntiān xiāngdāng lèi")}: «mamá hoy está bastante cansada».</li>
        <li>${zh("考试前，他格外忙", "kǎoshì qián, tā géwài máng")}: «antes del examen, él está especialmente ocupado».</li>
        <li>${zh("她时常失眠", "tā shícháng shīmián")}: «ella a menudo no puede dormir».</li>
      </ul>
      ${tabla([
        ['过于', 'guòyú', 'demasiado, en exceso'], ['相当', 'xiāngdāng', 'bastante'], ['极其', 'jíqí', 'sumamente, en extremo'], ['格外', 'géwài', 'especialmente'], ['通常', 'tōngcháng', 'por lo general'],
        ['时常', 'shícháng', 'a menudo'], ['心理', 'xīnlǐ', 'la mente, lo psicológico'], ['心态', 'xīntài', 'actitud, estado de ánimo'], ['失眠', 'shīmián', 'no poder dormir, tener insomnio'], ['疾病', 'jíbìng', 'enfermedad'],
        ['过敏', 'guòmǐn', 'tener alergia'], ['治疗', 'zhìliáo', 'tratar, tratamiento'], ['营养', 'yíngyǎng', 'nutrición, alimento que nutre'], ['睡眠', 'shuìmián', 'sueño (el dormir)'], ['中医', 'zhōngyī', 'medicina tradicional china'],
      ])}
      <h3>¿Qué tan alto es el grado?</h3>
      <p>Según Dartmouth, ${zh("相当", "xiāngdāng")} va antes de un adjetivo y marca un grado «alto», un poco menos que ${zh("很", "hěn")}. También puede ir antes de un verbo de actividad mental, como ${zh("喜欢", "xǐhuan")}, o antes de ${zh("有", "yǒu")}. AllSet dice que ${zh("格外", "géwài")} es solo un adverbio, «especialmente»: va antes de un adjetivo o de un verbo psicológico, y a veces lleva ${zh("地", "de")} detrás. No puede hacer de adjetivo.</p>
      <p>El sílabo reúne estos adverbios de grado en una lista. Como simplificación de la lección, ${zh("过于", "guòyú")} y ${zh("极其", "jíqí")} también van antes del adjetivo, igual que ${zh("相当", "xiāngdāng")}: ${zh("这里极其安静", "zhèlǐ jíqí ānjìng")}, «aquí está sumamente tranquilo». La lección no explica en qué se distinguen entre sí.</p>
      <h3>¿Cada cuánto pasa?</h3>
      <p>Dartmouth da ${zh("通常", "tōngcháng")} como adverbio, «por lo general», antes del verbo o de la frase verbal: ${zh("我通常十点睡觉", "wǒ tōngcháng shí diǎn shuìjiào")}, «por lo general me acuesto a las diez». Un texto de esa fuente lo escribe con negación: ${zh("通常不能", "tōngcháng bù néng")}, y ahí ${zh("不", "bù")} va después de ${zh("通常", "tōngcháng")}.</p>
      <p>${zh("老是", "lǎoshì")} es «siempre», pero AllSet avisa de que se usa sobre todo en quejas. Dartmouth trae un ejemplo con alguien que «siempre me está controlando». Por eso ${zh("弟弟老是很晚睡觉", "dìdi lǎoshì hěn wǎn shuìjiào")} suena a queja: «mi hermano siempre se acuesta tarde». Además, el sílabo pone ${zh("时常", "shícháng")} en la misma lista de frecuencia. Como simplificación de la lección, úsalo como «a menudo», antes del verbo.</p>
      <h3>Un verbo con ${zh("不得", "bu dé")}</h3>
      <p>El sílabo de nivel 5 lista el complemento potencial «${zh("动词+得/不得", "dòngcí+de/bu dé")}». Dartmouth explica que el complemento potencial indica si algo puede o no suceder, y que se usa sobre todo en negativo. Oxford añade que hay formas fijas que no se separan. Dartmouth también trae ${zh("舍不得", "shěbude")}, «no soportar separarse de algo».</p>
      <p>Como simplificación de la lección, ${zh("吃不得", "chī bu dé")} quiere decir «no se debe comer» o «no se puede comer». Describe una situación, no da un consejo: ${zh("他对鱼过敏，所以鱼吃不得", "tā duì yú guòmǐn, suǒyǐ yú chī bu dé")}, «es alérgico al pescado, así que el pescado no se puede comer».</p>
      <p class="nota"><strong>Trampa común:</strong> poner el grado después del adjetivo. Primero va ${zh("相当", "xiāngdāng")} o ${zh("格外", "géwài")}, y después el adjetivo.</p>`,
    ejemplo: `
      <p>Quieres decir: «Antes del examen, ella está especialmente cansada». Vamos por partes, y en cada paso verás por qué la palabra va donde va.</p>
      <ol class="pasos-ej">
        <li>Di quién y cómo está: ${zh("她累", "tā lèi")}, «ella está cansada». Es la frase más simple, sin grado.</li>
        <li>Sube el grado con ${zh("格外", "géwài")}, justo antes del adjetivo: ${zh("她格外累", "tā géwài lèi")}.</li>
        <li>Añade cuándo: ${zh("考试前", "kǎoshì qián")}, «antes del examen». Es una palabra de tiempo: por eso va al principio, antes de decir quién y cómo está.</li>
        <li>Une las partes con una coma.</li>
      </ol>
      <p>Para comprobar, cambia ${zh("格外", "géwài")} por ${zh("相当", "xiāngdāng")}: ${zh("考试前，她相当累", "kǎoshì qián, tā xiāngdāng lèi")} dice «bastante cansada», y la frase sigue bien armada. Resultado: <span class="resultado">${zh("考试前，她格外累", "kǎoshì qián, tā géwài lèi")} = «antes del examen, ella está especialmente cansada»</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir ${zh("她累格外", "tā lèi géwài")}. El grado nunca va detrás del adjetivo.</p>`,
    vidaReal: `
      <p>Con estas palabras puedes entender y decir más que «muy»:</p>
      <ul>
        <li>Contar cómo duermes o cómo te sientes, con más matices que «muy».</li>
        <li>Entender una charla en la que alguien describe su semana y dice cuánto descansó.</li>
        <li>Entender a un compañero que está bastante cansado o especialmente nervioso.</li>
        <li>Leer una nota sobre hábitos, donde aparece «por lo general».</li>
        <li>Notar cuándo alguien se queja con «siempre».</li>
        <li>Reconocer palabras de un cartel en un centro de salud.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «antes del examen, ella está especialmente cansada».</p>',
        respuesta: ['考试前', '她', '格外', '累'], alternativas: [['她', '考试前', '格外', '累']], pinyin: ['kǎoshì qián', 'tā', 'géwài', 'lèi'], lang: 'zh-Hans',
        pista: `<p>El grado va justo antes del adjetivo. La palabra de tiempo va al principio o después del sujeto.</p>`,
        solucion: `<p>${zh("考试前，她格外累", "kǎoshì qián, tā géwài lèi")}: tiempo, sujeto, grado y adjetivo. ${zh("她考试前格外累", "tā kǎoshì qián géwài lèi")} también vale.</p>` },
      { tipo: 'opciones', enunciado: `<p>Quieres decir «su letra es bastante bonita». ¿Qué frase pone bien ${zh("相当", "xiāngdāng")}?</p>`,
        opciones: [zh('他的字漂亮相当', 'tā de zì piàoliang xiāngdāng'), zh('相当他的字漂亮', 'xiāngdāng tā de zì piàoliang'), zh('他的字相当漂亮', 'tā de zì xiāngdāng piàoliang'), zh('他的相当字漂亮', 'tā de xiāngdāng zì piàoliang')], correcta: 2,
        pista: `<p>${zh("相当", "xiāngdāng")} va antes de un adjetivo.</p>`,
        solucion: `<p>${zh("他的字相当漂亮", "tā de zì xiāngdāng piàoliang")} pone ${zh("相当", "xiāngdāng")} justo antes del adjetivo ${zh("漂亮", "piàoliang")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según AllSet, ¿en qué tipo de situación se usa sobre todo ${zh("老是", "lǎoshì")}?</p>`,
        opciones: ['En una queja', 'En una pregunta de cortesía', 'En una despedida', 'En un número de teléfono'], correcta: 0,
        pista: '<p>Piensa en alguien que siempre ocupa el baño.</p>',
        solucion: `<p>${zh("老是", "lǎoshì")} es «siempre» con matiz de queja, como en ${zh("弟弟老是很晚睡觉", "dìdi lǎoshì hěn wǎn shuìjiào")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>En ${zh("他对鱼过敏，所以鱼吃不得", "tā duì yú guòmǐn, suǒyǐ yú chī bu dé")}, ¿qué quiere decir ${zh("吃不得", "chī bu dé")} según la lección?</p>`,
        opciones: ['Que tiene mucha hambre', 'Que no se puede comer', 'Que ya terminó de comer', 'Que está muy rico'], correcta: 1,
        pista: `<p>Mira la parte de antes: ${zh("过敏", "guòmǐn")}.</p>`,
        solucion: `<p>Como simplificación de la lección, ${zh("吃不得", "chī bu dé")} es «no se debe o no se puede comer»: describe la situación de quien es alérgico.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("失眠")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['shī mián'],
        pista: '<p>La primera sílaba empieza alta y se mantiene; la segunda sube.</p>',
        solucion: `<p>${zh("失眠", "shīmián")}: <strong>shī mián</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("疾病", "jíbìng")}.</p>`,
        respuestas: ['enfermedad', 'la enfermedad', 'una enfermedad', 'enfermedades', 'dolencia'],
        pista: '<p>Es lo contrario de estar sano.</p>',
        solucion: `<p>${zh("疾病", "jíbìng")} es «enfermedad».</p>` },
    ],
    fuentes: [SILABO, DART_26, DART_4, DART_13, DART_14, DART_7, DART_15, DART_5, ALLSET_LAOSHI, ALLSET_GEWAI, OX_POTENCIAL],
  });

  // ------------------------------------------------------------------
  L('Consumo y compras', {
    objetivo: `Decir cuánto más o menos cuesta algo con ${zh("比", "bǐ")} y una cantidad, armar frases con ${zh("把", "bǎ")} para dar y pedir cosas, y reconocer ${zh("较", "jiào")} en textos escritos.`,
    explicacion: `
      <p>Estás en una tienda y ves dos camisetas: una cuesta 50 y la otra 55. Quieres decir cuánto más cuesta la segunda. En chino la diferencia se pone al final de la comparación. Además, cuando hay que pasar una cosa de una persona a otra, el chino usa ${zh("把", "bǎ")}. Las frases de ejemplo son de la lección:</p>
      <ul>
        <li>${zh("这件比那件贵五块", "zhè jiàn bǐ nà jiàn guì wǔ kuài")}: «esta cuesta cinco más que aquella».</li>
        <li>${zh("我把书送给朋友", "wǒ bǎ shū sòng gěi péngyou")}: «le regalo el libro a mi amigo».</li>
        <li>${zh("这家店的售价较那家便宜", "zhè jiā diàn de shòujià jiào nà jiā piányi")}: «el precio de venta de esta tienda es más barato que el de aquella».</li>
      </ul>
      ${tabla([
        ['较', 'jiào', 'más que (escrito); bastante'], ['消费', 'xiāofèi', 'consumir, gastar'], ['消费者', 'xiāofèizhě', 'consumidor'], ['优惠', 'yōuhuì', 'ventajoso, con descuento'], ['折扣', 'zhékòu', 'descuento'],
        ['促销', 'cùxiāo', 'promocionar las ventas'], ['品牌', 'pǐnpái', 'marca'], ['售价', 'shòujià', 'precio de venta'], ['涨价', 'zhǎngjià', 'subir de precio'], ['商家', 'shāngjiā', 'comercio, vendedor'],
        ['名牌', 'míngpái', 'marca famosa'], ['二手', 'èrshǒu', 'de segunda mano'], ['物价', 'wùjià', 'los precios (en general)'], ['日用品', 'rìyòngpǐn', 'artículos de uso diario'], ['赠送', 'zèngsòng', 'regalar, dar de obsequio'],
      ])}
      <h3>¿Cuánto más?</h3>
      <p>ChinGram explica que, con ${zh("比", "bǐ")}, el adjetivo puede llevar una cantidad detrás. Para una diferencia exacta, pones un número y su clasificador después del adjetivo: ${zh("你比我大三岁", "nǐ bǐ wǒ dà sān suì")}, «tienes tres años más que yo», y ${zh("我的电脑比你的贵五百元", "wǒ de diànnǎo bǐ nǐ de guì wǔ bǎi yuán")}, «mi ordenador cuesta 500 más que el tuyo». El molde es A + ${zh("比", "bǐ")} + B + adjetivo + cantidad. Si la diferencia es vaga, la fuente pone ${zh("一点儿", "yìdiǎnr")}, ${zh("一些", "yìxiē")}, ${zh("多了", "duō le")} o ${zh("得多", "de duō")} en lugar del número.</p>
      <p>El sílabo de nivel 5 trae también la forma sin ${zh("比", "bǐ")}: «A + adjetivo + B + cantidad». Como simplificación de la lección, se usa con edades y diferencias: ${zh("他大我两岁", "tā dà wǒ liǎng suì")}, «él es dos años mayor que yo». La cantidad sigue al final.</p>
      <p class="nota"><strong>Trampa común:</strong> poner la negación delante del adjetivo. ChinGram dice que va delante de ${zh("比", "bǐ")}.</p>
      <h3>¿Cómo se pasa una cosa a otra persona?</h3>
      <p>Dartmouth dice que ${zh("把", "bǎ")} va con un objeto conocido y que el verbo no queda solo, sino con algo más. El sílabo de nivel 5 trae dos moldes. El primero es ${zh("把", "bǎ")} + objeto + verbo con ${zh("一", "yī")}. Oxford da ${zh("一下", "yíxià")} después del verbo, y la petición ${zh("请你把碗洗一洗", "qǐng nǐ bǎ wǎn xǐ yi xǐ")}, «lava los platos, por favor», con el verbo repetido. Dartmouth confirma que el verbo puede repetirse. Una frase propia: ${zh("请你把门关一下", "qǐng nǐ bǎ mén guān yíxià")}, «cierra la puerta un momento». Como simplificación de la lección, ${zh("他把门一关", "tā bǎ mén yī guān")} es «cerró la puerta de un golpe».</p>
      <p>El segundo molde tiene dos objetos: sujeto + ${zh("把", "bǎ")} + objeto 1 + verbo + ${zh("给", "gěi")} + objeto 2. AllSet lista verbos como ${zh("送", "sòng")}, ${zh("借", "jiè")} y ${zh("卖", "mài")}, y Dartmouth trae un ejemplo en que alguien entrega su tarea a la profesora. Como simplificación de la lección, con ${zh("告诉", "gàosu")} no hace falta ${zh("给", "gěi")}: ${zh("我把售价告诉妈妈", "wǒ bǎ shòujià gàosu māma")}, «le digo a mamá el precio de venta».</p>
      <h3>Una palabra para textos escritos: ${zh("较", "jiào")}</h3>
      <p>El sílabo pone ${zh("较", "jiào")} entre los adverbios de grado y también entre las preposiciones que presentan con qué se compara, junto a ${zh("替", "tì")} y ${zh("同", "tóng")}. Wikcionario la explica como «más que», igual que ${zh("比", "bǐ")}, y la usa en una frase escrita. Como simplificación de la lección, en una tienda lo verás en ${zh("这家店的东西较便宜", "zhè jiā diàn de dōngxi jiào piányi")}, «las cosas de esta tienda son bastante baratas». Para hablar, ${zh("比", "bǐ")} es lo normal.</p>`,
    ejemplo: `
      <p>Quieres decir: «Esta camiseta cuesta cinco más que aquella». Vamos por partes.</p>
      <ol class="pasos-ej">
        <li>Empieza con lo que comparas: ${zh("这件", "zhè jiàn")} y ${zh("那件", "nà jiàn")}, «esta» y «aquella».</li>
        <li>Une las dos con ${zh("比", "bǐ")}, que va entre ellas: ${zh("这件比那件", "zhè jiàn bǐ nà jiàn")}.</li>
        <li>Di cómo es la primera: ${zh("贵", "guì")}, «cara». El adjetivo va después de lo que comparas.</li>
        <li>Pon la diferencia al final, con su clasificador: ${zh("五块", "wǔ kuài")}.</li>
      </ol>
      <p>Para comprobar, da la vuelta: ${zh("那件比这件便宜五块", "nà jiàn bǐ zhè jiàn piányi wǔ kuài")} dice «aquella cuesta cinco menos que esta», y el número es el mismo. Resultado: <span class="resultado">${zh("这件比那件贵五块", "zhè jiàn bǐ nà jiàn guì wǔ kuài")} = «esta cuesta cinco más que aquella»</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir ${zh("这件比那件五块贵", "zhè jiàn bǐ nà jiàn wǔ kuài guì")}. La cantidad va detrás del adjetivo, no delante.</p>`,
    vidaReal: `
      <p>Con estas estructuras puedes seguir una conversación de compras:</p>
      <ul>
        <li>Entender cuánto más cuesta un producto que otro.</li>
        <li>Leer un cartel de una tienda con descuento o promoción.</li>
        <li>Pedir que alguien te pase o te entregue algo.</li>
        <li>Notar en un anuncio una palabra que se usa más al escribir que al hablar.</li>
        <li>Hablar de si los precios suben o bajan.</li>
        <li>Explicar quién le pasa algo a quién, sin enredarte con el orden de las palabras.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «esta cuesta cinco más que aquella».</p>',
        respuesta: ['这件', '比', '那件', '贵', '五块'], pinyin: ['zhè jiàn', 'bǐ', 'nà jiàn', 'guì', 'wǔ kuài'], lang: 'zh-Hans',
        pista: `<p>${zh("比", "bǐ")} va entre lo que comparas; la cantidad va al final.</p>`,
        solucion: `<p>${zh("这件比那件贵五块", "zhè jiàn bǐ nà jiàn guì wǔ kuài")}: A, ${zh("比", "bǐ")}, B, adjetivo y cantidad.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «le regalo el libro a mi amigo». ¿Qué frase está bien?</p>',
        opciones: [zh('我送把书给朋友', 'wǒ sòng bǎ shū gěi péngyou'), zh('我书把送给朋友', 'wǒ shū bǎ sòng gěi péngyou'), zh('我把书送给朋友', 'wǒ bǎ shū sòng gěi péngyou'), zh('把我书送给朋友', 'bǎ wǒ shū sòng gěi péngyou')], correcta: 2,
        pista: `<p>El molde es sujeto + ${zh("把", "bǎ")} + objeto + verbo + ${zh("给", "gěi")} + persona.</p>`,
        solucion: `<p>${zh("我把书送给朋友", "wǒ bǎ shū sòng gěi péngyou")} sigue el molde: ${zh("把", "bǎ")} antes del libro, y ${zh("给", "gěi")} antes de la persona.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según ChinGram, en una comparación con ${zh("比", "bǐ")}, ¿dónde va la negación ${zh("不", "bù")}?</p>`,
        opciones: ['Después del adjetivo', 'Delante del número', 'Al final de la frase', zh('Delante de 比', 'bǐ')], correcta: 3,
        pista: '<p>La fuente dice que va antes de la palabra de comparar.</p>',
        solucion: `<p>La negación va delante de ${zh("比", "bǐ")}, no delante del adjetivo.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según la lección, ¿qué dice ${zh("他大我两岁", "tā dà wǒ liǎng suì")}?</p>`,
        opciones: ['Él tiene dos hermanos', 'Él es dos años mayor que yo', 'Yo soy dos años mayor que él', 'Él me dio dos regalos'], correcta: 1,
        pista: `<p>${zh("大", "dà")} va seguido de ${zh("我", "wǒ")} y de la cantidad.</p>`,
        solucion: `<p>El molde sin ${zh("比", "bǐ")} es A + adjetivo + B + cantidad: él es dos años mayor que yo.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("折扣")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['zhé kòu'],
        pista: '<p>La primera sube; la segunda baja de golpe.</p>',
        solucion: `<p>${zh("折扣", "zhékòu")}: <strong>zhé kòu</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("二手", "èrshǒu")} (por ejemplo, ${zh("二手", "èrshǒu")} de una bicicleta).</p>`,
        respuestas: ['de segunda mano', 'segunda mano', 'usado', 'usada', 'de segunda'],
        pista: '<p>Es una bicicleta que ya tuvo otro dueño.</p>',
        solucion: `<p>${zh("二手", "èrshǒu")} es «de segunda mano».</p>` },
    ],
    fuentes: [SILABO, CG_BI, OX_BA, OX_BEI, DART_9, ALLSET_BA, WIKT],
  });

  // ------------------------------------------------------------------
  L('Hablar de educación', {
    objetivo: `Contar qué le pasó a algo con ${zh("被", "bèi")}, ${zh("叫", "jiào")} o ${zh("让", "ràng")} más ${zh("给", "gěi")}, y situar los hechos en el tiempo con ${zh("曾经", "céngjīng")} y ${zh("早已", "zǎoyǐ")}.`,
    explicacion: `
      <p>Un compañero te cuenta: «mi libro se lo llevó un amigo». Fíjate en que el protagonista de su frase es el libro, no el amigo. En chino eso se hace con una estructura llamada pasiva. En unidades anteriores ya viste ${zh("被", "bèi")}; aquí ves sus hermanas ${zh("叫", "jiào")} y ${zh("让", "ràng")}, y el ${zh("给", "gěi")} que a veces las acompaña. Las frases de ejemplo son de la lección:</p>
      <ul>
        <li>${zh("书被朋友给借走了", "shū bèi péngyou gěi jièzǒu le")}: «mi libro se lo llevó prestado un amigo».</li>
        <li>${zh("我曾经学过游泳", "wǒ céngjīng xuéguo yóuyǒng")}: «una vez aprendí a nadar».</li>
        <li>${zh("作业我早已做完了", "zuòyè wǒ zǎoyǐ zuòwán le")}: «la tarea la terminé hace tiempo».</li>
      </ul>
      ${tabla([
        ['曾经', 'céngjīng', 'una vez, alguna vez'], ['早已', 'zǎoyǐ', 'desde hace tiempo, ya'], ['亲自', 'qīnzì', 'en persona'], ['届', 'jiè', 'clasificador de ediciones o promociones'], ['教材', 'jiàocái', 'material de estudio, libro de texto'],
        ['学科', 'xuékē', 'materia, disciplina'], ['学历', 'xuélì', 'nivel de estudios'], ['学分', 'xuéfēn', 'crédito académico'], ['学术', 'xuéshù', 'académico, de investigación'], ['培养', 'péiyǎng', 'formar, cultivar'],
        ['培训', 'péixùn', 'capacitar, curso de capacitación'], ['讲座', 'jiǎngzuò', 'conferencia, charla'], ['论文', 'lùnwén', 'tesis, artículo académico'], ['录取', 'lùqǔ', 'admitir, aceptar a un estudiante'], ['幼儿园', "yòu'éryuán", 'jardín de niños'],
      ])}
      <h3>¿Cómo se dice «a mi libro le pasó algo»?</h3>
      <p>El sílabo de nivel 5 da el molde: sujeto + ${zh("被", "bèi")} / ${zh("叫", "jiào")} / ${zh("让", "ràng")} + quien hace la acción + ${zh("给", "gěi")} + verbo + algo más. En la frase del libro, el sujeto es ${zh("书", "shū")}, quien actúa es ${zh("朋友", "péngyou")} y el verbo es ${zh("借走了", "jièzǒu le")}. Oxford explica que estas frases cuentan qué hace alguien con un objeto, y que el verbo lleva algo añadido, como ${zh("了", "le")}. Por eso nunca va solo. Dartmouth dice lo mismo de ${zh("被", "bèi")}: introduce a quien hace la acción.</p>
      <p>Oxford avisa de varias cosas útiles. Primero, ${zh("被", "bèi")} es solo una preposición, pero ${zh("给", "gěi")}, ${zh("让", "ràng")} y ${zh("叫", "jiào")} también pueden ser verbos normales, así que a veces la frase es ambigua. Segundo, quien actúa puede omitirse con ${zh("被", "bèi")} y con ${zh("给", "gěi")}. Tercero, no todas las frases con ${zh("被", "bèi")} son negativas: en uno de sus ejemplos, alguien arregla bien el televisor de otra persona, y es una buena noticia. Cuarto, los verbos modales, los adverbios (también ${zh("曾经", "céngjīng")}) y la negación van <strong>antes</strong> de ${zh("被", "bèi")}, ${zh("让", "ràng")}, ${zh("叫", "jiào")} y ${zh("给", "gěi")}: ${zh("书已经被朋友给借走了", "shū yǐjīng bèi péngyou gěi jièzǒu le")}.</p>
      <h3>¿Cómo se habla del pasado?</h3>
      <p>AllSet explica que ${zh("曾经", "céngjīng")} es un adverbio: va antes del verbo y da el sentido de «una vez». Con verbos de acción suele llevar ${zh("过", "guo")} después: ${zh("我曾经学过游泳", "wǒ céngjīng xuéguo yóuyǒng")}. Con ${zh("是", "shì")}, ${zh("在", "zài")} y ${zh("有", "yǒu")} normalmente no se usa ${zh("过", "guo")}. Dartmouth da el mismo patrón, ${zh("曾经", "céngjīng")} + verbo + ${zh("过", "guo")}.</p>
      <p>Ojo con la negación. AllSet dice que no se usa ${zh("没", "méi")} ni ${zh("不", "bù")} para negar ${zh("曾经", "céngjīng")}; se niega con ${zh("没", "méi")}…${zh("过", "guo")}: ${zh("我没去过中国", "wǒ méi qùguo Zhōngguó")}, «nunca he estado en China». Dartmouth confirma que ${zh("没有", "méiyǒu")} va antes del verbo con ${zh("过", "guo")}.</p>
      <p>${zh("早已", "zǎoyǐ")} es otro adverbio de tiempo y va también antes del verbo. Dartmouth trae ${zh("考试我早已准备好了", "kǎoshì wǒ zǎoyǐ zhǔnbèi hǎo le")}, «el examen lo tenía preparado desde hace tiempo». Para ${zh("亲自", "qīnzì")}, Oxford da «en persona» y lo pone antes del verbo: ${zh("老师亲自来了", "lǎoshī qīnzì lái le")}, «la maestra vino en persona».</p>
      <h3>Un clasificador para ediciones: ${zh("届", "jiè")}</h3>
      <p>Como simplificación de la lección, ${zh("届", "jiè")} cuenta ediciones o promociones, y va con un número: ${zh("这是第五届讲座", "zhè shì dì wǔ jiè jiǎngzuò")}, «esta es la quinta edición de la charla».</p>
      <p class="nota"><strong>Trampa común:</strong> negar ${zh("曾经", "céngjīng")} con ${zh("没", "méi")} o ${zh("不", "bù")}. Para decir «nunca», usa ${zh("没", "méi")} + verbo + ${zh("过", "guo")}.</p>`,
    ejemplo: `
      <p>Quieres decir: «Mi libro ya se lo llevó prestado un amigo». Vamos por partes.</p>
      <ol class="pasos-ej">
        <li>Empieza por lo que le pasó a alguien: el libro, ${zh("书", "shū")}. Es el sujeto.</li>
        <li>Pon ${zh("被", "bèi")} y después quien actúa: ${zh("被朋友", "bèi péngyou")}, «por un amigo».</li>
        <li>Añade ${zh("给", "gěi")} antes del verbo, como pide el molde del sílabo: ${zh("给借走了", "gěi jièzǒu le")}. El verbo lleva ${zh("走", "zǒu")} y ${zh("了", "le")}, porque no puede ir solo.</li>
        <li>Para decir «ya», pon ${zh("已经", "yǐjīng")} antes de ${zh("被", "bèi")}: así lo manda Oxford.</li>
      </ol>
      <p>Para comprobar, quita el agente, que con ${zh("被", "bèi")} se puede: ${zh("书已经被借走了", "shū yǐjīng bèi jièzǒu le")} sigue siendo una frase completa. Resultado: <span class="resultado">${zh("书已经被朋友给借走了", "shū yǐjīng bèi péngyou gěi jièzǒu le")} = «el libro ya se lo llevó prestado un amigo»</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir ${zh("书被已经朋友给借走了", "shū bèi yǐjīng péngyou gěi jièzǒu le")}. El adverbio va antes de ${zh("被", "bèi")}.</p>`,
    vidaReal: `
      <p>Con esto puedes seguir conversaciones sobre la escuela y el estudio:</p>
      <ul>
        <li>Entender qué le pasó a un libro, una tarea o un papel.</li>
        <li>Contar qué estudiaste alguna vez.</li>
        <li>Decir que algo ya estaba hecho desde hace tiempo.</li>
        <li>Leer el anuncio de una charla o de una nueva edición.</li>
        <li>Notar cuando alguien hizo algo en persona, sin mandar a otra persona.</li>
        <li>Reconocer palabras de una escuela o de un curso.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «el libro se lo llevó prestado un amigo».</p>',
        respuesta: ['书', '被', '朋友', '给', '借走了'], pinyin: ['shū', 'bèi', 'péngyou', 'gěi', 'jièzǒu le'], lang: 'zh-Hans',
        pista: `<p>Primero el sujeto, luego ${zh("被", "bèi")} y quien actúa.</p>`,
        solucion: `<p>${zh("书被朋友给借走了", "shū bèi péngyou gěi jièzǒu le")}: sujeto, ${zh("被", "bèi")}, quien actúa, ${zh("给", "gěi")} y el verbo con algo más.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «nunca he estado en China». ¿Qué frase está bien según AllSet?</p>',
        opciones: [zh('我不去过中国', 'wǒ bù qùguo Zhōngguó'), zh('我没曾经去过中国', 'wǒ méi céngjīng qùguo Zhōngguó'), zh('我去过没中国', 'wǒ qùguo méi Zhōngguó'), zh('我没去过中国', 'wǒ méi qùguo Zhōngguó')], correcta: 3,
        pista: `<p>No se usa ${zh("没", "méi")} ni ${zh("不", "bù")} con ${zh("曾经", "céngjīng")}.</p>`,
        solucion: `<p>${zh("我没去过中国", "wǒ méi qùguo Zhōngguó")} usa ${zh("没", "méi")} + verbo + ${zh("过", "guo")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según Oxford, ¿dónde van los adverbios, como ${zh("已经", "yǐjīng")}, y la negación en una frase con ${zh("被", "bèi")}?</p>`,
        opciones: ['Al final de la frase', zh('Antes de 被', 'bèi'), 'Después del verbo', 'Entre el agente y el verbo'], correcta: 1,
        pista: `<p>Mira la frase ${zh("书已经被朋友给借走了", "shū yǐjīng bèi péngyou gěi jièzǒu le")}.</p>`,
        solucion: `<p>Los adverbios, los modales y la negación van antes de ${zh("被", "bèi")}, ${zh("让", "ràng")}, ${zh("叫", "jiào")} y ${zh("给", "gěi")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("作业我早已做完了", "zuòyè wǒ zǎoyǐ zuòwán le")}?</p>`,
        opciones: ['Todavía no hago la tarea', 'Haré la tarea mañana', 'La tarea la terminé hace tiempo', 'La tarea se perdió'], correcta: 2,
        pista: `<p>${zh("早已", "zǎoyǐ")} es un adverbio de tiempo.</p>`,
        solucion: `<p>${zh("早已", "zǎoyǐ")} indica que algo ocurrió desde hace tiempo: la tarea ya estaba terminada.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("录取")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['lù qǔ'],
        pista: '<p>La primera baja de golpe; la segunda baja y vuelve a subir.</p>',
        solucion: `<p>${zh("录取", "lùqǔ")}: <strong>lù qǔ</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("论文", "lùnwén")}.</p>`,
        respuestas: ['tesis', 'la tesis', 'artículo académico', 'ensayo académico', 'trabajo académico', 'trabajo de investigación', 'artículo científico', 'ensayo'],
        pista: '<p>Es un texto largo que escribe un estudiante o un investigador.</p>',
        solucion: `<p>${zh("论文", "lùnwén")} es una tesis o un artículo académico.</p>` },
    ],
    fuentes: [SILABO, OX_BEI, DART_16, DART_1, DART_4, DART_5, ALLSET_CENGJING, OX_PRENSA],
  });

  // ------------------------------------------------------------------
  L('Empresa y trabajo en equipo', {
    objetivo: `Ordenar en una frase cuándo, dónde, para quién y con quién se hace algo, usar ${zh("替", "tì")}, ${zh("同", "tóng")} y ${zh("彼此", "bǐcǐ")}, y encadenar dos verbos.`,
    explicacion: `
      <p>Imagina que dices en español: «mañana, en la oficina, hablo con el cliente en lugar de mi compañera». Puedes mover casi todas las partes de sitio. El chino es más estricto: cada parte tiene su lugar antes del verbo. Las frases de ejemplo son de la lección:</p>
      <ul>
        <li>${zh("我们明天在公司跟客户开会", "wǒmen míngtiān zài gōngsī gēn kèhù kāihuì")}: «mañana tenemos una reunión con el cliente en la empresa».</li>
        <li>${zh("她替我给客户打电话", "tā tì wǒ gěi kèhù dǎ diànhuà")}: «ella llama al cliente en mi lugar».</li>
        <li>${zh("大家彼此都很高兴", "dàjiā bǐcǐ dōu hěn gāoxìng")}: «todos están contentos, unos con otros».</li>
      </ul>
      ${tabla([
        ['替', 'tì', 'por, en lugar de; para'], ['彼此', 'bǐcǐ', 'uno a otro, ambas partes'], ['立刻', 'lìkè', 'enseguida, de inmediato'], ['连忙', 'liánmáng', 'apresuradamente'], ['急忙', 'jímáng', 'con prisa'],
        ['尽快', 'jǐnkuài', 'lo antes posible'], ['团队', 'tuánduì', 'equipo'], ['合作', 'hézuò', 'colaborar, cooperar'], ['配合', 'pèihé', 'coordinarse, ajustarse con otros'], ['员工', 'yuángōng', 'empleado, personal'],
        ['领导', 'lǐngdǎo', 'dirigente, jefe; dirigir'], ['企业', 'qǐyè', 'empresa'], ['客户', 'kèhù', 'cliente'], ['效率', 'xiàolǜ', 'eficiencia, rendimiento'], ['承担', 'chéngdān', 'asumir, hacerse cargo de'],
      ])}
      <h3>¿Qué va antes del verbo?</h3>
      <p>El sílabo de nivel 5 trae el punto de varios modificadores seguidos antes del verbo. MIT explica que los modificadores van justo antes del verbo, y que las palabras de tiempo y de lugar van después del sujeto. AllSet da el orden completo: sujeto, tiempo, manera, lugar, instrumento, destinatario y verbo. Su truco es que sigue el orden de los hechos: primero pasa el tiempo, luego estás en un lugar y luego haces algo. ChinGram añade que los adverbios, como ${zh("都", "dōu")} o ${zh("已经", "yǐjīng")}, van antes de la frase con ${zh("跟", "gēn")}, «con», y que la negación va antes del verbo modal. En la primera frase de arriba: ${zh("明天", "míngtiān")} es el tiempo, ${zh("在公司", "zài gōngsī")} el lugar, ${zh("跟客户", "gēn kèhù")} el destinatario y ${zh("开会", "kāihuì")} el verbo.</p>
      <h3>¿Por quién y con quién?</h3>
      <p>Dartmouth da ${zh("替", "tì")} como preposición, «por, en nombre de», y va antes del verbo: uno de sus ejemplos es «¿puedes tomarme una foto?». MIT lo glosa como «en mi lugar». Puede haber dos frases antes del verbo, como ${zh("替我", "tì wǒ")} y ${zh("给客户", "gěi kèhù")} en la segunda frase de arriba. El sílabo pone ${zh("同", "tóng")} junto a ${zh("替", "tì")} entre las preposiciones que presentan a la otra persona. Como simplificación de la lección, ${zh("同", "tóng")} es «con», paralelo a ${zh("跟", "gēn")}: ${zh("我同领导一起开会", "wǒ tóng lǐngdǎo yìqǐ kāihuì")}.</p>
      <h3>¿Cómo se encadenan dos verbos?</h3>
      <p>MIT llama «serialización» a poner dos verbos en secuencia, como «comprar y dar». AllSet dice que no hace falta ninguna palabra de enlace, y que unir verbos con ${zh("和", "hé")} es un error, porque ${zh("和", "hé")} une sustantivos. Con ${zh("来", "lái")} entre los dos verbos se expresa finalidad: ${zh("大家合作来提高效率", "dàjiā hézuò lái tígāo xiàolǜ")}, «todos colaboran para mejorar la eficiencia». El sílabo del nivel 5 añade que los dos verbos pueden tener una relación de causa, contraste o condición. Como simplificación de la lección: ${zh("有事找我", "yǒu shì zhǎo wǒ")}, «si hay algo, búscame».</p>
      <h3>Ambas partes y rapidez</h3>
      <p>Dartmouth explica que ${zh("彼此", "bǐcǐ")} significa «ambas partes» y puede ser sujeto, objeto o modificador con ${zh("的", "de")}: ${zh("我们都知道彼此的名字", "wǒmen dōu zhīdào bǐcǐ de míngzi")}. MIT cuenta que viene de «aquello» y «esto». MIT presenta ${zh("立刻", "lìkè")} como sinónimo de otra palabra para «de inmediato», y ChinGram dice que esa otra palabra va entre el sujeto y el verbo. Como simplificación de la lección, ${zh("立刻", "lìkè")} va igual: ${zh("我立刻给客户打电话", "wǒ lìkè gěi kèhù dǎ diànhuà")}. Dartmouth glosa ${zh("急忙", "jímáng")} como «con prisa», antes del verbo: ${zh("他看到领导，就急忙走过去", "tā kàndào lǐngdǎo, jiù jímáng zǒu guòqù")}. Con ${zh("连忙", "liánmáng")} y ${zh("尽快", "jǐnkuài")} basta con su significado de la tabla; la lección no explica diferencias entre estas cuatro.</p>
      <p class="nota"><strong>Trampa común:</strong> unir dos verbos con ${zh("和", "hé")}. Basta con ponerlos seguidos.</p>`,
    ejemplo: `
      <p>Quieres decir: «Mañana, en la empresa, me reúno con el cliente en lugar de ella». Vamos por partes.</p>
      <ol class="pasos-ej">
        <li>Empieza por quién hace qué: ${zh("我开会", "wǒ kāihuì")}, «tengo una reunión».</li>
        <li>Añade con quién y por quién, justo antes del verbo: ${zh("替她", "tì tā")} y ${zh("跟客户", "gēn kèhù")}. Como en el ejemplo de Dartmouth, ${zh("替", "tì")} va primero.</li>
        <li>Añade el lugar antes de esas frases: ${zh("在公司", "zài gōngsī")}.</li>
        <li>Añade el tiempo después del sujeto, antes del lugar: ${zh("明天", "míngtiān")}.</li>
      </ol>
      <p>Para comprobar, lee la frase de izquierda a derecha: cuándo, dónde, por quién, con quién y qué se hace, igual que pasan los hechos. Resultado: <span class="resultado">${zh("我明天在公司替她跟客户开会", "wǒ míngtiān zài gōngsī tì tā gēn kèhù kāihuì")} = «mañana, en la empresa, me reúno con el cliente en lugar de ella»</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner el lugar después del verbo, como ${zh("我开会在公司", "wǒ kāihuì zài gōngsī")}. En esta frase el lugar va antes del verbo.</p>`,
    vidaReal: `
      <p>Con esto puedes entender cómo se habla de un equipo de trabajo:</p>
      <ul>
        <li>Seguir un aviso de una reunión con hora y lugar.</li>
        <li>Entender quién hace algo en lugar de otra persona.</li>
        <li>Ver cuándo dos compañeros hablan de lo que se hacen mutuamente.</li>
        <li>Leer una nota de un jefe que pide algo enseguida.</li>
        <li>Describir cómo trabaja tu grupo en un proyecto de la escuela, con quién y para quién.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «mañana tenemos una reunión con el cliente en la empresa».</p>',
        respuesta: ['我们', '明天', '在公司', '跟客户', '开会'], alternativas: [['明天', '我们', '在公司', '跟客户', '开会']], pinyin: ['wǒmen', 'míngtiān', 'zài gōngsī', 'gēn kèhù', 'kāihuì'], lang: 'zh-Hans',
        pista: '<p>Tiempo, lugar, con quién y, al final, el verbo.</p>',
        solucion: `<p>${zh("我们明天在公司跟客户开会", "wǒmen míngtiān zài gōngsī gēn kèhù kāihuì")}: todo lo que modifica va antes de ${zh("开会", "kāihuì")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("她替我给客户打电话", "tā tì wǒ gěi kèhù dǎ diànhuà")}?</p>`,
        opciones: ['Ella me llama a mí', 'Yo llamo al cliente por ella', 'Ella llama al cliente en mi lugar', 'El cliente llama a los dos'], correcta: 2,
        pista: `<p>${zh("替我", "tì wǒ")} quiere decir «en mi lugar».</p>`,
        solucion: `<p>${zh("替我", "tì wǒ")} es «por mí, en mi lugar», y ${zh("给客户打电话", "gěi kèhù dǎ diànhuà")} es «llamar al cliente».</p>` },
      { tipo: 'opciones', enunciado: '<p>Según AllSet, ¿cómo se unen dos verbos que se hacen uno detrás del otro?</p>',
        opciones: ['Sin ninguna palabra de enlace', zh('Con 和', 'hé'), zh('Con 吗', 'ma'), zh('Con 的', 'de')], correcta: 0,
        pista: `<p>${zh("和", "hé")} sirve para otra cosa.</p>`,
        solucion: `<p>No hace falta enlace: se ponen los dos verbos seguidos. ${zh("和", "hé")} une sustantivos.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según Dartmouth, ¿qué significa ${zh("彼此", "bǐcǐ")}?</p>`,
        opciones: ['Ninguna de las partes', 'Mañana por la mañana', 'Otra empresa', 'Ambas partes, uno al otro'], correcta: 3,
        pista: `<p>Viene de «aquello» y «esto».</p>`,
        solucion: `<p>${zh("彼此", "bǐcǐ")} es «ambas partes»: ${zh("大家彼此都很高兴", "dàjiā bǐcǐ dōu hěn gāoxìng")}.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("效率")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['xiào lǜ'],
        pista: '<p>Las dos sílabas bajan de golpe.</p>',
        solucion: `<p>${zh("效率", "xiàolǜ")}: <strong>xiào lǜ</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("员工", "yuángōng")}.</p>`,
        respuestas: ['empleado', 'empleados', 'el empleado', 'trabajador', 'trabajadores', 'personal', 'el personal'],
        pista: '<p>Es quien trabaja en una empresa.</p>',
        solucion: `<p>${zh("员工", "yuángōng")} es «empleado» o «personal» de una empresa.</p>` },
    ],
    fuentes: [SILABO, DART_26, DART_4, DART_3, DART_8, MIT, CG_MASHANG, CG_GEN, ALLSET_FILAS, ALLSET_LAI, ALLSET_ORDEN, ALLSET_BICI],
  });

  L('Ciudad y campo', {
    objetivo: `Decir hacia dónde y por dónde se va con ${zh("朝", "cháo")} y ${zh("沿着", "yánzhe")}, desde cuándo pasa algo con ${zh("以来", "yǐlái")}, y de qué está formado un lugar con ${zh("由…组成", "yóu…zǔchéng")}.`,
    explicacion: `
      <p>Para hablar de un barrio o de un pueblo haces siempre las mismas preguntas: ¿hacia dónde vas?, ¿desde cuándo vives ahí?, ¿de qué está formado el lugar? Esta lección trae las palabras para contestarlas, con una selección de 15 del nivel 5. Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['朝', 'cháo', 'hacia; mirar hacia'], ['沿', 'yán', 'a lo largo de'], ['以来', 'yǐlái', 'desde entonces, hasta ahora'], ['组成', 'zǔchéng', 'formar, componer'], ['群', 'qún', 'grupo (clasificador)'],
        ['居民', 'jūmín', 'habitante, vecino'], ['社区', 'shèqū', 'barrio, comunidad'], ['乡村', 'xiāngcūn', 'pueblo, campo'], ['农民', 'nóngmín', 'campesino'], ['农业', 'nóngyè', 'agricultura'],
        ['土地', 'tǔdì', 'tierra, terreno'], ['胡同', 'hútòng', 'callejón'], ['广场', 'guǎngchǎng', 'plaza'], ['建筑', 'jiànzhù', 'edificio; construcción'], ['人口', 'rénkǒu', 'población, número de habitantes'],
      ])}
      <h3>¿Hacia dónde y por dónde?</h3>
      <p>Según AllSet, ${zh("朝", "cháo")}, ${zh("向", "xiàng")} y ${zh("往", "wǎng")} indican dirección. Cuando solo hay una dirección, como «camina cien metros al norte», los tres sirven. Con ${zh("朝", "cháo")} dices: ${zh("他朝广场走去", "tā cháo guǎngchǎng zǒu qù")}, «él camina hacia la plaza». AllSet añade dos diferencias. Si la acción tiene un blanco concreto y no un destino, sirven ${zh("朝", "cháo")} y ${zh("向", "xiàng")}, pero ${zh("往", "wǎng")} no. Y detrás de un verbo, como en ${zh("开往", "kāi wǎng")}, se usa ${zh("往", "wǎng")}; ${zh("朝", "cháo")} no.</p>
      <p>El sílabo pone ${zh("沿(着)", "yán(zhe)")} junto a ${zh("朝", "cháo")} entre las palabras que introducen dirección y camino. MIT traduce ${zh("沿着", "yánzhe")} como «a lo largo de». Como simplificación de la lección, ${zh("朝", "cháo")} dice hacia dónde vas y ${zh("沿着", "yánzhe")} dice por dónde sigues el camino: ${zh("沿着胡同走", "yánzhe hútòng zǒu")}, «camina a lo largo del callejón». Las dos frases van antes del verbo.</p>
      <h3>¿Desde cuándo?</h3>
      <p>AllSet explica que ${zh("以来", "yǐlái")} se pone después de un hecho o de una fecha, y cuenta lo que ha pasado desde entonces hasta hoy. La frase con ${zh("以来", "yǐlái")} abre la oración y lleva una coma: ${zh("来到这个社区以来，我认识了很多朋友", "láidào zhège shèqū yǐlái, wǒ rènshi le hěn duō péngyou")}, «desde que llegué a este barrio he conocido a muchos amigos». En textos formales se le puede poner ${zh("自", "zì")} o ${zh("从", "cóng")} delante, y queda como un sándwich: ${zh("(自)…以来", "(zì)…yǐlái")}.</p>
      <h3>¿Qué tiene el lugar?</h3>
      <p>El sílabo da dos usos de ${zh("有", "yǒu")} en este nivel. El primero es ${zh("有着", "yǒuzhe")}, «tener», y va con un objeto: ${zh("这个城市有着很多漂亮的建筑", "zhège chéngshì yǒuzhe hěn duō piàoliang de jiànzhù")}, «esta ciudad tiene muchos edificios bonitos». El segundo es verbo más ${zh("有", "yǒu")}, para algo que queda puesto o escrito en un sitio: ${zh("门上写有他的名字", "mén shang xiě yǒu tā de míngzi")}, «en la puerta está escrito su nombre». Esa frase es simplificación de la lección: el sílabo da la forma, sin más reglas.</p>
      <h3>Formado por, un grupo de</h3>
      <p>El sílabo también lista la fórmula ${zh("由…组成", "yóu…zǔchéng")}. Como simplificación de la lección, pones lo que forma el lugar entre las dos piezas: ${zh("这个社区由很多家庭组成", "zhège shèqū yóu hěn duō jiātíng zǔchéng")}, «este barrio está formado por muchas familias». Y ${zh("群", "qún")} es un clasificador de grupos, según el sílabo. ChinGram dice que el clasificador va entre el número y el sustantivo: ${zh("一群孩子", "yì qún háizi")}, «un grupo de niños».</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("朝", "cháo")} detrás de un verbo como ${zh("开", "kāi")}. Después de ese verbo va ${zh("往", "wǎng")}.</p>`,
    ejemplo: `
      <p>Quieres decir: «Desde que llegó a este barrio, él camina cada día por el callejón hacia la plaza». Se arma por capas.</p>
      <ol class="pasos-ej">
        <li>Empieza por quién hace qué: ${zh("他走", "tā zǒu")}, «él camina».</li>
        <li>Di por dónde, justo antes del verbo: ${zh("他沿着胡同走", "tā yánzhe hútòng zǒu")}.</li>
        <li>Di hacia dónde, también antes del verbo: ${zh("他沿着胡同朝广场走", "tā yánzhe hútòng cháo guǎngchǎng zǒu")}.</li>
        <li>Añade cada cuánto, tras el sujeto: ${zh("他每天沿着胡同朝广场走", "tā měitiān yánzhe hútòng cháo guǎngchǎng zǒu")}.</li>
        <li>Abre con el momento de partida: ${zh("来到这个社区以来", "láidào zhège shèqū yǐlái")}, y una coma. Esa parte va al principio.</li>
      </ol>
      <p>Para comprobar, lee de izquierda a derecha: desde cuándo, quién, cada cuánto, por dónde, hacia dónde y qué hace. Resultado: <span class="resultado">${zh("来到这个社区以来，他每天沿着胡同朝广场走", "láidào zhège shèqū yǐlái, tā měitiān yánzhe hútòng cháo guǎngchǎng zǒu")} = «desde que llegó a este barrio, cada día camina por el callejón hacia la plaza»</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner el lugar después del verbo, como ${zh("他走朝广场", "tā zǒu cháo guǎngchǎng")}. Aquí la dirección va antes del verbo.</p>`,
    vidaReal: `
      <p>Estas palabras salen cuando alguien cuenta dónde vive o cómo llegar a un sitio. Te sirven para entender indicaciones como «camina hacia la plaza», para leer un texto sobre un barrio o un pueblo que explica de quién o de qué está formado, y para contar desde cuándo cambió algo. También ayudan a hablar del campo y de la ciudad: quién trabaja la tierra, qué edificios hay y cómo se llaman las calles estrechas.</p>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «un grupo de niños camina hacia la plaza».</p>',
        respuesta: ['一群孩子', '朝广场', '走去'], pinyin: ['yì qún háizi', 'cháo guǎngchǎng', 'zǒu qù'], lang: 'zh-Hans',
        pista: '<p>Quién va primero, luego la dirección y al final el verbo.</p>',
        solucion: `<p>${zh("一群孩子朝广场走去", "yì qún háizi cháo guǎngchǎng zǒu qù")}: el grupo, la dirección con ${zh("朝", "cháo")} y, al final, el verbo.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «él camina a lo largo del callejón». ¿Qué frase está bien armada?</p>',
        opciones: [zh('他走沿着胡同', 'tā zǒu yánzhe hútòng'), zh('他胡同沿着走', 'tā hútòng yánzhe zǒu'), zh('他沿着胡同走', 'tā yánzhe hútòng zǒu'), zh('沿着他胡同走', 'yánzhe tā hútòng zǒu')], correcta: 2,
        pista: `<p>${zh("沿着", "yánzhe")} y su lugar van juntos, antes del verbo.</p>`,
        solucion: `<p>${zh("他沿着胡同走", "tā yánzhe hútòng zǒu")}: sujeto, ${zh("沿着胡同", "yánzhe hútòng")} y verbo.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("这个社区由很多家庭组成", "zhège shèqū yóu hěn duō jiātíng zǔchéng")}?</p>`,
        opciones: ['Este barrio está formado por muchas familias', 'Este barrio tiene un solo edificio', 'Muchas familias se mudaron ayer', 'A este barrio le gusta la plaza'], correcta: 0,
        pista: `<p>Mira lo que va entre ${zh("由", "yóu")} y ${zh("组成", "zǔchéng")}.</p>`,
        solucion: `<p>${zh("由…组成", "yóu…zǔchéng")} pone lo que forma algo entre sus dos piezas: aquí, ${zh("很多家庭", "hěn duō jiātíng")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según AllSet, ¿qué dice ${zh("来到这个社区以来，我认识了很多朋友", "láidào zhège shèqū yǐlái, wǒ rènshi le hěn duō péngyou")}?</p>`,
        opciones: ['Que dejé el barrio hace tiempo', 'Que quiero conocer amigos mañana', 'Que no tengo amigos', 'Que desde que llegué al barrio he conocido a muchos amigos'], correcta: 3,
        pista: `<p>${zh("以来", "yǐlái")} cuenta lo que pasó desde un momento hasta hoy.</p>`,
        solucion: `<p>${zh("来到这个社区以来", "láidào zhège shèqū yǐlái")} es «desde que llegué a este barrio», y lo que sigue pasó después.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("居民")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['jū mín'],
        pista: '<p>La primera sílaba empieza alta y se mantiene; la segunda sube.</p>',
        solucion: `<p>${zh("居民", "jūmín")}: <strong>jū mín</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("农业", "nóngyè")}.</p>`,
        respuestas: ['agricultura', 'la agricultura', 'agropecuaria', 'cultivo', 'el campo'],
        pista: '<p>Tiene que ver con cultivar la tierra.</p>',
        solucion: `<p>${zh("农业", "nóngyè")} es «agricultura».</p>` },
    ],
    fuentes: [SILABO, ALLSET_CHAO, ALLSET_YILAI, MIT, CG_CLASIF, DART_30],
  });

  L('Economía y comercio', {
    objetivo: `Decir de dónde sale una información con ${zh("据", "jù")} y ${zh("凭", "píng")}, unir cosas con ${zh("以及", "yǐjí")}, anunciar algo con ${zh("即将", "jíjiāng")} y leer una gráfica sencilla de ganancias con ${zh("从…来看", "cóng…láikàn")}.`,
    explicacion: `
      <p>En una noticia de negocios, en un contrato o en el cartel de una tienda, el chino se vuelve un poco más formal. Esta lección trae 15 palabras de ese mundo, de la selección del nivel 5, y las piezas de frase que más se repiten ahí. Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['凭', 'píng', 'con base en, apoyándose en'], ['据', 'jù', 'según'], ['依据', 'yījù', 'con base en; base'], ['以及', 'yǐjí', 'y también (escrito)'], ['即将', 'jíjiāng', 'pronto, a punto de'],
        ['批', 'pī', 'lote, tanda (clasificador)'], ['产业', 'chǎnyè', 'sector económico'], ['行业', 'hángyè', 'ramo, sector de trabajo'], ['利润', 'lìrùn', 'ganancia'], ['成本', 'chéngběn', 'costo'],
        ['进口', 'jìnkǒu', 'importar'], ['合同', 'hétóng', 'contrato'], ['交易', 'jiāoyì', 'trato, operación'], ['资金', 'zījīn', 'fondos, dinero para invertir'], ['商业', 'shāngyè', 'comercio, negocios'],
      ])}
      <h3>¿Según quién? ¿Con base en qué?</h3>
      <p>Según Dartmouth, ${zh("据", "jù")} es una preposición que significa «según» o «con base en». Su frase va al principio, con una coma, y es de lengua escrita. Oxford la muestra en ${zh("据说", "jù shuō")}, «se dice que», que abre muchas noticias. AllSet añade que ${zh("据", "jù")} se junta con palabras de un solo carácter, como en ${zh("据他说", "jù tā shuō")}, «según él». Con palabras de dos o más caracteres se usa ${zh("根据", "gēnjù")}.</p>
      <p>${zh("凭", "píng")} también es una preposición, «con base en» o «gracias a». AllSet dice que la persona suele ser el sujeto y que después va un sustantivo, concreto o abstracto: ${zh("凭这个合同，他们可以进口东西", "píng zhège hétóng, tāmen kěyǐ jìnkǒu dōngxi")}, «con este contrato pueden importar cosas». El sílabo pone ${zh("依据", "yījù")} en el mismo grupo que ${zh("据", "jù")} y ${zh("凭", "píng")}: preposiciones de base o apoyo. La lección no explica en qué se distinguen.</p>
      <h3>¿Y además? ¿Pronto?</h3>
      <p>AllSet explica que ${zh("以及", "yǐjí")} se usa sobre todo al escribir, y que une palabras, frases y hasta oraciones. Lo principal va antes: ${zh("这家店卖水果、牛奶以及日用品", "zhè jiā diàn mài shuǐguǒ, niúnǎi yǐjí rìyòngpǐn")}, «esta tienda vende fruta, leche y también artículos de uso diario». Según ChinGram, ${zh("和", "hé")} solo une sustantivos; no sirve para unir oraciones.</p>
      <p>${zh("即将", "jíjiāng")} es un adverbio de tiempo del sílabo. Como simplificación de la lección, quiere decir «pronto» o «a punto de» y va antes del verbo: ${zh("公司即将有一个新合同", "gōngsī jíjiāng yǒu yí gè xīn hétóng")}, «la empresa pronto tendrá un contrato nuevo». ChinGram trae el patrón hablado ${zh("我们快要放假了", "wǒmen kuàiyào fàng jià le")}, «estamos por tener vacaciones», con la misma idea de cosa cercana. Y ${zh("批", "pī")} cuenta lotes, según el sílabo: ${zh("这批水果", "zhè pī shuǐguǒ")}, «este lote de frutas».</p>
      <h3>Visto desde los datos</h3>
      <p>Dartmouth explica que ${zh("从", "cóng")} más un sustantivo significa «con base en». Con ${zh("来看", "láikàn")} al final queda la fórmula del sílabo ${zh("从…来看", "cóng…láikàn")}, «visto desde…»: ${zh("从利润来看，这个行业不错", "cóng lìrùn láikàn, zhège hángyè búcuò")}, «a juzgar por la ganancia, este ramo va bien». Mira la gráfica, con datos de ejemplo:</p>
      ${GANANCIA()}
      <p>Podrías decir ${zh("从利润来看，第三个月的利润很多", "cóng lìrùn láikàn, dì sān gè yuè de lìrùn hěn duō")}, «a juzgar por la ganancia, el mes 3 tiene mucha ganancia».</p>
      <p>Por último, ${zh("没有…就没有…", "méiyǒu…jiù méiyǒu…")} es del sílabo. AllSet explica un pariente cercano: si no tienes algo, no puedes tener o hacer algo. Como simplificación de la lección: ${zh("没有合同，就没有交易", "méiyǒu hétóng, jiù méiyǒu jiāoyì")}, «sin contrato, no hay trato».</p>
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("和", "hé")} para unir dos oraciones. Para eso ${zh("和", "hé")} no sirve.</p>`,
    ejemplo: `
      <p>Quieres decir: «Según él, este lote de frutas y la leche llegan pronto». Se arma por capas.</p>
      <ol class="pasos-ej">
        <li>Empieza por lo que llega: ${zh("这批水果到", "zhè pī shuǐguǒ dào")}. Con ${zh("批", "pī")} cuentas el lote.</li>
        <li>Añade ${zh("以及", "yǐjí")} y lo otro que llega: ${zh("这批水果以及牛奶到", "zhè pī shuǐguǒ yǐjí niúnǎi dào")}. Lo principal queda antes.</li>
        <li>Pon ${zh("即将", "jíjiāng")} justo antes del verbo: ${zh("这批水果以及牛奶即将到", "zhè pī shuǐguǒ yǐjí niúnǎi jíjiāng dào")}.</li>
        <li>Abre con la fuente y una coma: ${zh("据他说", "jù tā shuō")}. Es lengua escrita, así que va al principio.</li>
      </ol>
      <p>Para comprobar, lee la frase como noticia: primero quién lo dice, luego qué llega y cuándo. Resultado: <span class="resultado">${zh("据他说，这批水果以及牛奶即将到", "jù tā shuō, zhè pī shuǐguǒ yǐjí niúnǎi jíjiāng dào")} = «según él, este lote de frutas y la leche llegan pronto»</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner ${zh("即将", "jíjiāng")} antes de ${zh("据他说", "jù tā shuō")} o después del verbo. La fuente abre la frase y el adverbio va pegado al verbo.</p>`,
    vidaReal: `
      <p>Este vocabulario aparece en noticias de negocios, en carteles de tiendas y en contratos. Te sirve para entender de dónde viene una información, por ejemplo cuando una nota dice «según...», para seguir una lista de productos y para leer una gráfica sencilla de ganancias. También ayuda a entender cuando alguien dice que algo va a pasar pronto, o que sin una cosa no puede haber otra.</p>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «según él, este lote de frutas llega pronto».</p>',
        respuesta: ['据他说', '这批水果', '即将', '到'], alternativas: [['这批水果', '据他说', '即将', '到']], pinyin: ['jù tā shuō', 'zhè pī shuǐguǒ', 'jíjiāng', 'dào'], lang: 'zh-Hans',
        pista: '<p>La fuente va al principio o junto al sujeto, y el adverbio justo antes del verbo.</p>',
        solucion: `<p>${zh("据他说，这批水果即将到", "jù tā shuō, zhè pī shuǐguǒ jíjiāng dào")}: la fuente, lo que llega, ${zh("即将", "jíjiāng")} y el verbo.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según ChinGram, ¿qué une ${zh("和", "hé")}?</p>`,
        opciones: ['Oraciones completas', 'Sustantivos o frases con sustantivo', 'Solo números', 'Solo verbos'], correcta: 1,
        pista: `<p>Por eso ${zh("以及", "yǐjí")} puede hacer más cosas.</p>`,
        solucion: `<p>${zh("和", "hé")} une sustantivos o frases nominales; para unir oraciones se usa otra palabra.</p>` },
      { tipo: 'opciones', enunciado: `<p>Mira la gráfica de ejemplo. ¿En qué mes ganó más la tienda?</p>${GANANCIA()}`,
        opciones: ['Mes 1', 'Mes 2', 'Mes 3', 'Los tres meses igual'], correcta: 2,
        pista: '<p>Busca la barra más alta.</p>',
        solucion: `<p>La barra del mes 3 llega a 25, más que las de 10 y 15. Se podría decir ${zh("从利润来看，第三个月的利润很多", "cóng lìrùn láikàn, dì sān gè yuè de lìrùn hěn duō")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("没有合同，就没有交易", "méiyǒu hétóng, jiù méiyǒu jiāoyì")}?</p>`,
        opciones: ['Con contrato hay muchos tratos', 'Sin contrato, no hay trato', 'El trato es más caro que el contrato', 'Hay contrato y trato a la vez'], correcta: 1,
        pista: `<p>${zh("没有", "méiyǒu")} es «no haber».</p>`,
        solucion: `<p>Falta el contrato, y por eso falta el trato: «sin contrato, no hay trato».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("利润")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['lì rùn'],
        pista: '<p>Las dos sílabas bajan de golpe.</p>',
        solucion: `<p>${zh("利润", "lìrùn")}: <strong>lì rùn</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("成本", "chéngběn")}.</p>`,
        respuestas: ['costo', 'el costo', 'coste', 'el coste', 'costos', 'costes', 'gasto', 'precio de costo'],
        pista: '<p>Es lo que cuesta producir algo, lo contrario de la ganancia.</p>',
        solucion: `<p>${zh("成本", "chéngběn")} es «costo».</p>` },
    ],
    fuentes: [SILABO, DART_26, DART_15, ALLSET_PING, ALLSET_JU, ALLSET_YIJI, ALLSET_MEIYOU, OX_PRENSA_NOTAS, CG_HE, CG_YAOLE],
  });

  L('Naturaleza y recursos', {
    objetivo: `Decir que algo pasa siempre con ${zh("始终", "shǐzhōng")}, dar dos opciones con ${zh("或是", "huòshì")}, contar flores y cosas largas con ${zh("朵", "duǒ")}, ${zh("束", "shù")}, ${zh("根", "gēn")} y ${zh("颗", "kē")}, y leer un texto que cierra la unidad.`,
    explicacion: `
      <p>Un río, un desierto, un campo de cultivo: la naturaleza da mucho que contar. Esta lección trae 15 palabras de ese tema, de la selección del nivel 5, y cierra la unidad con un texto que junta ideas de las lecciones anteriores. Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['如此', 'rúcǐ', 'así, de esta manera'], ['或是', 'huòshì', 'o'], ['始终', 'shǐzhōng', 'siempre, de principio a fin'], ['颗', 'kē', 'clasificador de cosas pequeñas y redondas'], ['朵', 'duǒ', 'clasificador de flores'],
        ['根', 'gēn', 'clasificador de cosas largas y delgadas'], ['束', 'shù', 'clasificador de ramos'], ['资源', 'zīyuán', 'recurso'], ['沙漠', 'shāmò', 'desierto'], ['河流', 'héliú', 'río'],
        ['陆地', 'lùdì', 'tierra firme'], ['粮食', 'liángshi', 'cereales, alimento básico'], ['种植', 'zhòngzhí', 'cultivar, plantar'], ['生物', 'shēngwù', 'ser vivo'], ['危害', 'wēihài', 'dañar; daño'],
      ])}
      <h3>¿Siempre?</h3>
      <p>Según Dartmouth, ${zh("始终", "shǐzhōng")} es un adverbio que va antes de un verbo o de un adjetivo y quiere decir «siempre así, de principio a fin»: ${zh("这个乡村始终种植粮食", "zhège xiāngcūn shǐzhōng zhòngzhí liángshi")}, «este pueblo siempre ha cultivado cereales». Se usa sobre todo en frases afirmativas. Dartmouth lo compara con ${zh("一直", "yìzhí")}: a veces se pueden cambiar, pero si el verbo lleva una palabra de tiempo, solo vale ${zh("一直", "yìzhí")}. Y ChinGram aclara que ${zh("一直", "yìzhí")} habla de algo continuo, no de «todos los días».</p>
      <h3>¿Esto o aquello?</h3>
      <p>ChinGram dice que ${zh("或者", "huòzhě")}, «o», presenta dos o más opciones en frases afirmativas. El sílabo lista ${zh("或是…，或是…", "huòshì…, huòshì…")} entre las frases de elección. Como simplificación de la lección, funciona igual, con ${zh("或是", "huòshì")} delante de cada opción: ${zh("这块土地或是种植粮食，或是种植花", "zhè kuài tǔdì huòshì zhòngzhí liángshi, huòshì zhòngzhí huā")}, «este terreno, o se cultivan cereales, o se plantan flores».</p>
      <p>${zh("如此", "rúcǐ")} es, según MIT, una expresión de estilo clásico: «así». Oxford la trae en ${zh("如此看来", "rúcǐ kànlái")}, «visto esto». Como simplificación de la lección, también va antes de un adjetivo: ${zh("这条河流如此长", "zhè tiáo héliú rúcǐ cháng")}, «este río es tan largo».</p>
      <h3>Contar flores y cosas pequeñas</h3>
      <p>Oxford explica que un clasificador hace falta cuando hay un número delante del sustantivo. ChinGram añade que va entre el número y el sustantivo, y que cada sustantivo suele tener el suyo, según cómo es la cosa. Oxford da estos:</p>
      <ul>
        <li>${zh("朵", "duǒ")} sirve para cosas con forma de flor: ${zh("一朵花", "yì duǒ huā")}, «una flor».</li>
        <li>${zh("束", "shù")} cuenta ramos: ${zh("一束花", "yí shù huā")}, «un ramo de flores».</li>
        <li>${zh("根", "gēn")} cuenta cosas delgadas y flexibles, como cabellos, hilos o cuerdas.</li>
        <li>${zh("颗", "kē")} cuenta, según MIT, cuentas, frijoles y perlas.</li>
      </ul>
      <p>El sílabo también lista ${zh("不…不…", "bù…bù…")} como frase compacta. Como simplificación de la lección, un ejemplo es ${zh("不见不散", "bù jiàn bù sàn")}, «hasta que nos veamos».</p>
      <h3>Lee el texto de cierre</h3>
      <p>Este texto junta ideas de la unidad. Léelo con calma; los ejercicios se contestan con él.</p>
      <p>${zh("来到这个乡村以来，小林始终很忙。", "láidào zhège xiāngcūn yǐlái, Xiǎolín shǐzhōng hěn máng.")}</p>
      <p>${zh("每天他沿着河流朝农民的土地走去。", "měitiān tā yánzhe héliú cháo nóngmín de tǔdì zǒu qù.")}</p>
      <p>${zh("据他说，这个乡村由三十多家组成。", "jù tā shuō, zhège xiāngcūn yóu sānshí duō jiā zǔchéng.")}</p>
      <p>${zh("他说，没有河流，就没有粮食。", "tā shuō, méiyǒu héliú, jiù méiyǒu liángshi.")}</p>
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("始终", "shǐzhōng")} con una palabra de tiempo en el verbo. En ese caso va ${zh("一直", "yìzhí")}.</p>`,
    ejemplo: `
      <p>Quieres decir: «En la mesa hay dos flores sueltas y también un ramo». Se arma por piezas.</p>
      <ol class="pasos-ej">
        <li>Cuenta las flores sueltas: ${zh("两朵花", "liǎng duǒ huā")}. El clasificador ${zh("朵", "duǒ")} va entre el número y ${zh("花", "huā")}.</li>
        <li>Cuenta el ramo: ${zh("一束花", "yí shù huā")}. Aquí ${zh("束", "shù")} dice que van juntas.</li>
        <li>Di dónde están: ${zh("桌子上有两朵花", "zhuōzi shang yǒu liǎng duǒ huā")}.</li>
        <li>Añade lo demás con ${zh("还有", "hái yǒu")}: ${zh("桌子上有两朵花，还有一束花", "zhuōzi shang yǒu liǎng duǒ huā, hái yǒu yí shù huā")}.</li>
      </ol>
      <p>Para comprobar, mira que cada número tenga su clasificador antes de la palabra ${zh("花", "huā")}. Resultado: <span class="resultado">${zh("桌子上有两朵花，还有一束花", "zhuōzi shang yǒu liǎng duǒ huā, hái yǒu yí shù huā")} = «en la mesa hay dos flores y también un ramo»</span>.</p>
      <p class="nota"><strong>Error común:</strong> dejar el número pegado al sustantivo, como ${zh("两花", "liǎng huā")}. Con un número hace falta el clasificador.</p>`,
    vidaReal: `
      <p>Con esto puedes leer un texto sobre el campo, los ríos o los cultivos y entender qué dice. Te sirve para contar cosas con la palabra correcta, como un ramo de flores o una cuerda, para notar cuándo algo pasa siempre y cuándo hay dos opciones, y para seguir textos escolares sobre recursos de la naturaleza. Al final lees un texto que usa ideas de toda la unidad.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Según el texto de cierre, ¿qué dice la primera frase de Xiaolin?</p>`,
        opciones: ['Que se fue del pueblo', 'Que siempre ha estado ocupado desde que llegó al pueblo', 'Que ya no tiene trabajo', 'Que llegará mañana al pueblo'], correcta: 1,
        pista: `<p>Busca ${zh("以来", "yǐlái")} y ${zh("始终", "shǐzhōng")}.</p>`,
        solucion: `<p>${zh("来到这个乡村以来，小林始终很忙", "láidào zhège xiāngcūn yǐlái, Xiǎolín shǐzhōng hěn máng")}: desde que llegó, siempre ha estado ocupado.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según el texto, ¿de cuántas familias está formado el pueblo?</p>`,
        opciones: ['De menos de diez', 'De más de treinta', 'De cien exactas', 'De una sola'], correcta: 1,
        pista: `<p>Busca ${zh("由…组成", "yóu…zǔchéng")}.</p>`,
        solucion: `<p>${zh("三十多家", "sānshí duō jiā")} es «más de treinta familias».</p>` },
      { tipo: 'opciones', enunciado: `<p>Según el texto, ¿qué dice Xiaolin del río?</p>`,
        opciones: ['Que sin río no hay cereales', 'Que el río es muy corto', 'Que el río está lejos', 'Que hay flores en el río'], correcta: 0,
        pista: `<p>Mira la última frase.</p>`,
        solucion: `<p>${zh("没有河流，就没有粮食", "méiyǒu héliú, jiù méiyǒu liángshi")}: sin río, no hay cereales.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «en la mesa hay dos flores».</p>',
        respuesta: ['桌子上', '有', '两朵花'], pinyin: ['zhuōzi shang', 'yǒu', 'liǎng duǒ huā'], lang: 'zh-Hans',
        pista: '<p>Primero el lugar, luego ' + zh('有', 'yǒu') + ' y al final lo que hay.</p>',
        solucion: `<p>${zh("桌子上有两朵花", "zhuōzi shang yǒu liǎng duǒ huā")}: lugar, ${zh("有", "yǒu")} y el número con su clasificador.</p>` },
      { tipo: 'opciones', enunciado: `<p>Quieres decir «un ramo de flores». ¿Qué clasificador va delante de ${zh("花", "huā")}?</p>`,
        opciones: [zh('根', 'gēn'), zh('颗', 'kē'), zh('朵', 'duǒ'), zh('束', 'shù')], correcta: 3,
        pista: '<p>Piensa en flores atadas juntas.</p>',
        solucion: `<p>${zh("束", "shù")} cuenta ramos: ${zh("一束花", "yí shù huā")}. ${zh("朵", "duǒ")} cuenta flores sueltas.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("沙漠", "shāmò")}.</p>`,
        respuestas: ['desierto', 'el desierto', 'desiertos'],
        pista: '<p>Es un lugar muy seco y con poca agua.</p>',
        solucion: `<p>${zh("沙漠", "shāmò")} es «desierto».</p>` },
    ],
    fuentes: [SILABO, DART_29, DART_27, CG_YIZHI, CG_HUOZHE, OX_PRENSA_NOTAS, OX_CLASIF, CG_CLASIF, MIT],
  });

})();
