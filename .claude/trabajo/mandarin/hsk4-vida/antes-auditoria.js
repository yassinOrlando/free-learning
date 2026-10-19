// Mandarín · Unidad 11: HSK 4 · Vida y sociedad.
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
  const MIT = { nombre: 'MIT OpenCourseWare (EE. UU.), J. K. Wheatley, Learning Chinese: A Foundation Course in Mandarin (2011, en inglés)', url: 'https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/res21g_003_s_11.pdf' };
  const DART = (n, slug, nota) => ({ nombre: `Dartmouth College (EE. UU.), Snapshots of China, lección ${n}: ${nota} (en inglés)`, url: `https://sites.dartmouth.edu/snapshotsofchina/${slug}/` });
  const DART_30 = DART(30, '%e7%ac%ac%e4%b8%89%e5%8d%81%e8%af%be-lesson-30', 'nota sobre 按照');
  const DART_14 = DART(14, '%e7%ac%ac%e5%8d%81%e5%9b%9b%e8%af%be-lesson-14', 'nota sobre 千万');
  const DART_6 = DART(6, '%e7%ac%ac%e5%85%ad%e8%af%be-lesson-6', 'nota sobre el complemento de frecuencia y glosas');
  const DART_18 = DART(18, '%e7%ac%ac%e5%8d%81%e5%85%ab%e8%af%be-lesson-18', 'nota sobre 又 en preguntas retóricas');
  const DART_16 = DART(16, '%e7%ac%ac%e5%8d%81%e5%85%ad%e8%af%be-lesson-16', 'glosa de 赶快 y nota sobre 多么');
  const DART_2 = DART(2, '%e7%ac%ac%e4%ba%8c%e8%af%be-lesson-2', 'nota sobre 地, 得 y ejemplo de 赶快');
  const ALLSET = (n, url) => ({ nombre: 'Chinese Grammar Wiki (AllSet Learning), fuente de apoyo no universitaria: ' + n + ' (en inglés)', url: 'https://resources.allsetlearning.com/chinese/grammar/' + url });

  const DART_7 = DART(7, '%e7%ac%ac%e4%b8%83%e8%af%be-lesson-7', 'ejemplos de 恐怕');
  const DART_19 = DART(19, '%e7%ac%ac%e5%8d%81%e4%b9%9d%e8%af%be-lesson-19', 'notas sobre 恐怕');
  const DART_17 = DART(17, '%e7%ac%ac%e5%8d%81%e4%b8%83%e8%af%be-lesson-17', 'nota sobre 吧 con adverbios de conjetura');
  const DART_9 = DART(9, '%e7%ac%ac%e4%b9%9d%e8%af%be-lesson-9', 'ejemplos y glosas');
  const DART_8 = DART(8, '%e7%ac%ac%e5%85%ab%e8%af%be-lesson-8', 'ejemplo de 死了 y nota sobre 从来');
  const DART_13 = DART(13, '%e7%ac%ac%e5%8d%81%e4%b8%89%e8%af%be-lesson-13', 'ejemplo con 厉害 y nota sobre 往往');
  const DART_22 = DART(22, '%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%ba%8c%e8%af%be-lesson-22', 'ejemplo con 对于');
  const DART_11 = DART(11, '%e7%ac%ac%e5%8d%81%e4%b8%80%e8%af%be-lesson-11', 'nota sobre 又 en preguntas retóricas y ejemplos de 互相');
  const ALLSET_SI = ALLSET('Negative adjectives with "-si le"', 'Negative_adjectives_with_%22-si_le%22');
  const ALLSET_DUIYU = ALLSET('Comparing "dui" and "duiyu"', 'Comparing_%22dui%22_and_%22duiyu%22');
  const ALLSET_KONGPA = ALLSET('Expressing concern with "kongpa"', 'Expressing_concern_with_%22kongpa%22');
  const CHINGRAM_GRADO = { nombre: 'ChinGram, Universidad Palacký de Olomouc (Chequia), Degree adverbs hěn, fēicháng, tài, zhēn, duō(me), hǎo (en inglés)', url: 'https://chingram.upol.cz/grammar/degree-adverbs-hen-%e5%be%88-feichang-%e9%9d%9e%e5%b8%b8-tai-%e5%a4%aa-zhen-%e7%9c%9f-duome-%e5%a4%9a%e4%b9%88-hao-%e5%a5%bd' };
  const CHINGRAM_DUI = { nombre: 'ChinGram, Universidad Palacký de Olomouc (Chequia), Preposition duì ‘towards, to’ (en inglés)', url: 'https://chingram.upol.cz/grammar/preposition-dui-%e5%af%b9-towards-to' };
  const CHINGRAM_SHENME = { nombre: 'ChinGram, Universidad Palacký de Olomouc (Chequia), Interrogative pronoun shénme (en inglés)', url: 'https://chingram.upol.cz/grammar/interrogative-pronoun-shenme-%e4%bb%80%e4%b9%88-%e4%bb%80%e9%ba%bc-what-something-anything-any-every' };
  const OXFORD_DE = { nombre: 'Centre for Teaching Chinese as a Foreign Language, Universidad de Oxford (Reino Unido), The 得 Construction (en inglés)', url: 'https://www.ctcfl.ox.ac.uk/materials_grammar-exercises_verb-de/' };

  const DART_29 = DART(29, '%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%b9%9d%e8%af%be-lesson-29', 'ejemplo con 各种');
  const DART_20 = DART(20, '%e7%ac%ac%e4%ba%8c%e5%8d%81%e8%af%be-lesson-20', 'texto con 各种');
  const DART_10 = DART(10, '%e7%ac%ac%e5%8d%81%e8%af%be-lesson-10', 'nota con un ejemplo de 台');
  const DART_21 = DART(21, '%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%b8%80%e8%af%be-lesson-21', 'ejemplo de un cuarto lleno y nota sobre otro adverbio');
  const DART_24 = DART(24, '%e7%ac%ac%e4%ba%8c%e5%8d%81%e5%9b%9b%e8%af%be-lesson-24', 'texto con 任何');
  const DART_26 = DART(26, 'new-2', 'ejemplo de 互相');
  const DART_5 = DART(5, '%e7%ac%ac%e4%ba%94%e8%af%be-lesson-5', 'glosa de 互相 y otra nota');
  const ALLSET_RENHE = ALLSET('Expressing "any" with "renhe"', 'Expressing_%22any%22_with_%22renhe%22');
  const ALLSET_HUXIANG = ALLSET('Expressing "each other" with "huxiang"', 'Expressing_%22each_other%22_with_%22huxiang%22');
  const ALLSET_MW = ALLSET('Measure word', 'Measure_word');
  const CSB = { nombre: 'College of Saint Benedict y Saint John\'s University (EE. UU.), List of Chinese measure words (en inglés; copia de contenido de Wikipedia, solo apoyo)', url: 'https://employees.csbsju.edu/hjakubowski/classes/ChinaStudyAbroad/list_of_chinese_measure_words.htm' };
  const CHINGRAM_MW = { nombre: 'ChinGram, Universidad Palacký de Olomouc (Chequia), Measure words – nouns (en inglés)', url: 'https://chingram.upol.cz/grammar/measure-words-nouns' };

  const OXFORD_PRENSA = { nombre: 'Centre for Teaching Chinese as a Foreign Language, Universidad de Oxford (Reino Unido), Sentence pattern and function word index (en inglés)', url: 'https://www.ctcfl.ox.ac.uk/materials_grammar-exercises_newspaperreadinggrammarnotes/' };
  const ALLSET_NUNCA = ALLSET('Expressing "never again" with "zai ye bu"', '%22Never_again%22_with_%22zai_ye_bu%22');
  const ALLSET_UNO = ALLSET('Expressing "one by one" with "yi"', 'Expressing_%22one_by_one%22_with_%22yi%22');

  const DART_27 = DART(27, '%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%b8%83%e8%af%be-lesson-27', 'nota sobre 一方面…另一方面…');
  const DART_12 = DART(12, '%e7%ac%ac%e5%8d%81%e4%ba%8c%e8%af%be-lesson-12', 'ejemplos de 为了');
  const DART_16_GAN = DART(16, '%e7%ac%ac%e5%8d%81%e5%85%ad%e8%af%be-lesson-16', 'texto con glosa de 敢');
  const DART_23 = DART(23, '%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%b8%89%e8%af%be-lesson-23', 'ejemplo con 却');
  const DART_5_YOUQI = DART(5, '%e7%ac%ac%e4%ba%94%e8%af%be-lesson-5', 'nota sobre 尤其');
  const DART_1 = DART(1, '%e7%ac%ac%e4%b8%80%e8%af%be-lesson-1', 'nota sobre 虽然 con 却');
  const DART_13_ZS = DART(13, '%e7%ac%ac%e5%8d%81%e4%b8%89%e8%af%be-lesson-13', 'glosa de 至少');
  const DART_15 = DART(15, '%e7%ac%ac%e5%8d%81%e4%ba%94%e8%af%be-lesson-15', 'glosa de 确实');
  const DART_9_ZW = DART(9, '%e7%ac%ac%e4%b9%9d%e8%af%be-lesson-9', 'glosa de 作为');
  const ALLSET_WEI = ALLSET('Explaining purpose with "wei... er..."', 'Explaining_purpose_with_%22wei..._er...%22');
  const ALLSET_HAO = ALLSET('Expressing purpose with "hao"', 'Expressing_purpose_with_%22hao%22');
  const ALLSET_JI = ALLSET('Expressing "both… and…" with "ji...you"', '%22Both%E2%80%A6_and%E2%80%A6%22_with_%22ji...you%22');
  const ALLSET_JIANG = ALLSET('Expressing future with "jiang"', 'ASGIQPUJ');
  const ALLSET_ERYI = ALLSET('Expressing "that\'s all" with "eryi"', 'ASG6TB4J');
  const ALLSET_CHADIAN = ALLSET('Expressing "almost" using "chadian"', 'ASG6ESWW');
  const ALLSET_CHADIAN_MEI = ALLSET('Expressing "almost" using "chadian mei"', 'ASGGOUJB');
  const ALLSET_YOUDESHI = ALLSET('Saying "a lot" with "youdeshi"', 'ASGVACYB');
  const CHINGRAM_YOUYOU = { nombre: 'ChinGram, Universidad Palacký de Olomouc (Chequia), Sentence with yòu… yòu… «both… and…» (en inglés)', url: 'https://chingram.upol.cz/grammar/coordinative-structure-with-you-you-%e5%8f%88%e5%8f%88-both-and' };
  const DART_9_INT = DART(9, '%e7%ac%ac%e4%b9%9d%e8%af%be-lesson-9', 'glosas de 几乎 y 再');

  // Gráfica de barras de una serie (copiada de hsk4-estructuras.js).
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
  // Datos de ejemplo, no reales: bolsas de plástico que usa una familia por semana.
  const BOLSAS = () => barras({ etiquetas: ['Semana 1', 'Semana 2', 'Semana 3'], valores: [12, 8, 5], min: 0, max: 15, paso: 5,
    descripcion: 'Gráfica de barras con datos de ejemplo: bolsas de plástico que usa una familia en tres semanas. Semana 1: 12 bolsas, semana 2: 8 bolsas y semana 3: 5 bolsas. Las barras bajan de una semana a la siguiente.' });

  // ------------------------------------------------------------------
  L('Trámites y pedir ayuda', {
    objetivo: `Pedir ayuda y hacer gestiones con ${zh("按照", "ànzhào")}, ${zh("千万", "qiānwàn")} y ${zh("趟", "tàng")}, y reconocer ${zh("赶快", "gǎnkuài")} y ${zh("赶紧", "gǎnjǐn")} cuando alguien te apura.`,
    explicacion: `
      <p>Esta unidad trata de la vida diaria y la sociedad. El sílabo oficial de HSK 4 tiene muchas más palabras; aquí hay una selección y la lista completa está en el <a href="${encodeURI(SILABO.url)}">sílabo</a>. Las frases de ejemplo son de la lección. La voz depende de tu dispositivo: si suena rara, el pinyin manda.</p>
      <p>Imagina que llegas a una oficina para hacer una gestión. Un diálogo corto:</p>
      <ul>
        <li>${zh("你好，我想办事", "nǐ hǎo, wǒ xiǎng bànshì")}: «Hola, quiero hacer una gestión».</li>
        <li>${zh("请先填写表格", "qǐng xiān tiánxiě biǎogé")}: «Primero rellene el formulario».</li>
        <li>${zh("地址写在哪儿", "dìzhǐ xiě zài nǎr")}: «¿Dónde se escribe la dirección?».</li>
      </ul>
      ${tabla([
        ['办理', 'bànlǐ', 'tramitar, gestionar'], ['办事', 'bànshì', 'hacer una gestión, ocuparse de un asunto'], ['表格', 'biǎogé', 'formulario, tabla'], ['填写', 'tiánxiě', 'rellenar (un formulario)'], ['麻烦', 'máfan', 'molesto, complicado; molestar'],
        ['地址', 'dìzhǐ', 'dirección (de un lugar)'], ['使馆', 'shǐguǎn', 'embajada'], ['说明', 'shuōmíng', 'explicar; explicación'], ['说明书', 'shuōmíngshū', 'manual de instrucciones'], ['按照', 'ànzhào', 'según, de acuerdo con'],
        ['赶紧', 'gǎnjǐn', 'sin perder tiempo, enseguida'], ['赶快', 'gǎnkuài', 'cuanto antes, rápidamente'], ['千万', 'qiānwàn', 'sin falta, por favor no dejes de'], ['顺便', 'shùnbiàn', 'de paso, aprovechando'], ['趟', 'tàng', 'vez, viaje (clasificador de viajes)'],
      ])}
      <h3>¿Cómo dices «según las instrucciones»?</h3>
      <p>Cuando haces algo siguiendo un papel o una regla, necesitas decir en qué te basas. Para eso está ${zh("按照", "ànzhào")}. Dartmouth la presenta como una <strong>preposición</strong>: significa «según» o «con base en», y forma un grupo con lo que sigue que va antes del verbo. Por eso se dice ${zh("请按照说明书做", "qǐng ànzhào shuōmíngshū zuò")}, «por favor, hazlo según el manual». Puede ir al inicio de la oración o después del sujeto: ${zh("按照这个地址，你可以找到使馆", "ànzhào zhège dìzhǐ, nǐ kěyǐ zhǎodào shǐguǎn")}, «según esta dirección, puedes encontrar la embajada». El sílabo lista también ${zh("按", "àn")}; aquí solo ${zh("按照", "ànzhào")}.</p>
      <h3>¿Cómo insistes en un aviso importante?</h3>
      <p>A veces quieres que alguien no falle en algo. Dartmouth explica que ${zh("千万", "qiānwàn")} significa «sin falta, por favor no dejes de…» y se usa para pedir o avisar con insistencia. En la forma negativa va con ${zh("别", "bié")} o ${zh("不要", "bú yào")}: ${zh("你千万别忘了地址", "nǐ qiānwàn bié wàng le dìzhǐ")}, «no olvides la dirección, por favor». En la afirmativa suele ir con ${zh("要", "yào")}: ${zh("你千万要带表格", "nǐ qiānwàn yào dài biǎogé")}, «lleva el formulario sin falta». Va después del sujeto, antes de esas palabras.</p>
      <h3>¿Cómo cuentas las idas a un lugar?</h3>
      <p>${zh("趟", "tàng")} es un <strong>clasificador verbal</strong>: una palabra que cuenta cuántas veces ocurre una acción o un viaje. Dartmouth da la forma: verbo, número y ${zh("趟", "tàng")}. Si el objeto es un lugar, puede ir antes o después: ${zh("我想去一趟使馆", "wǒ xiǎng qù yī tàng shǐguǎn")} y ${zh("我想去使馆一趟", "wǒ xiǎng qù shǐguǎn yī tàng")} dicen lo mismo, «quiero ir una vez a la embajada».</p>
      <h3>Para pedir rapidez</h3>
      <p>Dartmouth glosa ${zh("赶快", "gǎnkuài")} como «rápidamente» y lo muestra al inicio de una orden: ${zh("赶快填写表格", "gǎnkuài tiánxiě biǎogé")}, «rellena el formulario cuanto antes». El sílabo pone ${zh("赶紧", "gǎnjǐn")} junto a ${zh("赶快", "gǎnkuài")}; como simplificación de la lección, los tratamos como equivalentes: ${zh("时间不早了，我们赶紧去吧", "shíjiān bù zǎo le, wǒmen gǎnjǐn qù ba")}, «ya es tarde, vamos enseguida». Y ${zh("顺便", "shùnbiàn")} se usa para «de paso»: ${zh("你去使馆，顺便问一下地址", "nǐ qù shǐguǎn, shùnbiàn wèn yíxià dìzhǐ")}, «ya que vas a la embajada, pregunta de paso la dirección».</p>
      <p class="nota"><strong>Trampa común:</strong> poner la expresión de viaje antes del verbo, como ${zh("我一趟去使馆", "wǒ yī tàng qù shǐguǎn")}. ${zh("趟", "tàng")} cuenta la acción, así que va después del verbo. ${zh("不", "bù")} y ${zh("一", "yī")} se escriben con su tono original; al hablar cambian (unidad 9).</p>`,
    ejemplo: `
      <p>Marta debe escribir un mensaje a su prima, que irá a una embajada a hacer un trámite. Quiere decirle: «sin falta, rellena el formulario según el manual, y ve una vez a la embajada».</p>
      <ol class="pasos-ej">
        <li>Piensa en la acción principal: rellenar un formulario. Eso es ${zh("填写表格", "tiánxiě biǎogé")}.</li>
        <li>Añade en qué te basas. ${zh("按照说明书", "ànzhào shuōmíngshū")} va antes del verbo: ${zh("按照说明书填写表格", "ànzhào shuōmíngshū tiánxiě biǎogé")}.</li>
        <li>Para insistir, pon el sujeto, ${zh("千万", "qiānwàn")} y ${zh("要", "yào")}: ${zh("你千万要按照说明书填写表格", "nǐ qiānwàn yào ànzhào shuōmíngshū tiánxiě biǎogé")}.</li>
        <li>Para el viaje, escribe el verbo y después la cuenta: ${zh("去一趟使馆", "qù yī tàng shǐguǎn")}.</li>
      </ol>
      <p>Para comprobar, busca que ${zh("按照", "ànzhào")} esté antes del verbo y que ${zh("趟", "tàng")} esté después. Resultado: <span class="resultado">${zh("你千万要按照说明书填写表格", "nǐ qiānwàn yào ànzhào shuōmíngshū tiánxiě biǎogé")} = «sin falta, rellena el formulario según el manual»</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner ${zh("按照说明书", "ànzhào shuōmíngshū")} después del verbo, como ${zh("填写表格按照说明书", "tiánxiě biǎogé ànzhào shuōmíngshū")}. El grupo con ${zh("按照", "ànzhào")} va antes del verbo.</p>`,
    vidaReal: `
      <p>Estas formas aparecen cuando alguien te ayuda con un papel o te explica un trámite:</p>
      <ul>
        <li>Entender un aviso que te pide algo sin falta.</li>
        <li>Seguir un manual de instrucciones con la preposición correcta.</li>
        <li>Contar cuántas veces fuiste a una oficina o a una embajada.</li>
        <li>Pedir con cortesía una dirección o una explicación.</li>
        <li>Reconocer una orden urgente cuando te dicen que te apures.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «por favor, rellena el formulario según el manual».</p>',
        respuesta: ['请', '按照', '说明书', '填写', '表格'], alternativas: [['按照', '说明书', '请', '填写', '表格']], pinyin: ['qǐng', 'ànzhào', 'shuōmíngshū', 'tiánxiě', 'biǎogé'], lang: 'zh-Hans',
        pista: `<p>El grupo con ${zh("按照", "ànzhào")} va antes del verbo ${zh("填写", "tiánxiě")}.</p>`,
        solucion: `<p>${zh("请按照说明书填写表格", "qǐng ànzhào shuōmíngshū tiánxiě biǎogé")}: primero la petición, luego en qué te basas y al final el verbo con su objeto. También vale empezar por ${zh("按照说明书", "ànzhào shuōmíngshū")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Quieres decir «quiero ir una vez a la embajada». ¿Qué frase está bien armada?</p>`,
        opciones: [zh('我想一趟去使馆', 'wǒ xiǎng yī tàng qù shǐguǎn'), zh('我想去一趟使馆', 'wǒ xiǎng qù yī tàng shǐguǎn'), zh('我想去趟一使馆', 'wǒ xiǎng qù tàng yī shǐguǎn'), zh('我想去使馆趟一', 'wǒ xiǎng qù shǐguǎn tàng yī')], correcta: 1,
        pista: `<p>La forma es verbo, número y ${zh("趟", "tàng")}.</p>`,
        solucion: `<p>${zh("去一趟使馆", "qù yī tàng shǐguǎn")}: el verbo va primero y ${zh("一趟", "yī tàng")} cuenta el viaje. También se dice ${zh("去使馆一趟", "qù shǐguǎn yī tàng")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «por favor, no olvides la dirección». ¿Qué frase está bien?</p>',
        opciones: [zh('你千万忘了地址', 'nǐ qiānwàn wàng le dìzhǐ'), zh('你别千万忘了地址', 'nǐ bié qiānwàn wàng le dìzhǐ'), zh('千万你要忘地址', 'qiānwàn nǐ yào wàng dìzhǐ'), zh('你千万别忘了地址', 'nǐ qiānwàn bié wàng le dìzhǐ')], correcta: 3,
        pista: `<p>En una petición negativa, ${zh("千万", "qiānwàn")} va antes de ${zh("别", "bié")}.</p>`,
        solucion: `<p>${zh("你千万别忘了地址", "nǐ qiānwàn bié wàng le dìzhǐ")}: sujeto, ${zh("千万", "qiānwàn")}, ${zh("别", "bié")} y el verbo.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("请按照说明书做", "qǐng ànzhào shuōmíngshū zuò")}?</p>`,
        opciones: ['Por favor, lee el manual en voz alta', 'Por favor, hazlo según el manual', 'Por favor, escribe un manual nuevo', 'Por favor, pregunta al maestro'], correcta: 1,
        pista: `<p>Piensa en la traducción de ${zh("按照", "ànzhào")}: «según».</p>`,
        solucion: `<p>${zh("按照说明书", "ànzhào shuōmíngshū")} es «según el manual», y ${zh("做", "zuò")} es «hacer».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("表格")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['biǎo gé'],
        pista: '<p>La primera sílaba baja y sube; la segunda sube.</p>',
        solucion: `<p>${zh("表格", "biǎogé")}: <strong>biǎo gé</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("地址", "dìzhǐ")}.</p>`,
        respuestas: ['direccion', 'la direccion', 'una direccion', 'domicilio', 'address'],
        pista: '<p>Es lo que escribes en un sobre para saber adónde va.</p>',
        solucion: `<p>${zh("地址", "dìzhǐ")} es «dirección», el lugar donde vive alguien o donde está un sitio.</p>` },
    ],
    fuentes: [SILABO, DART_30, DART_14, DART_6, DART_18, DART_16, DART_2, MIT],
  });

  L('Sentimientos y opiniones', {
    objetivo: `Exagerar un sentimiento con ${zh("死了", "sǐ le")}, exclamar con ${zh("多么", "duōme")}, suavizar una mala noticia con ${zh("恐怕", "kǒngpà")} y dar tu opinión con ${zh("对于", "duìyú")}.`,
    explicacion: `
      <p>Dos amigos hablan un día difícil. Las frases de ejemplo son de la lección.</p>
      <ul>
        <li>${zh("你怎么了", "nǐ zěnme le")}: «¿Qué te pasa?».</li>
        <li>${zh("我烦死了，我的朋友对我不高兴", "wǒ fán sǐ le, wǒ de péngyou duì wǒ bù gāoxìng")}: «Estoy fastidiadísimo; mi amigo no está contento conmigo».</li>
        <li>${zh("这有什么好烦的", "zhè yǒu shénme hǎo fán de")}: «¿Qué hay aquí para fastidiarse tanto?».</li>
      </ul>
      ${tabla([
        ['多么', 'duōme', 'qué…, cuán (grado alto)'], ['恐怕', 'kǒngpà', 'me temo que, tal vez'], ['也许', 'yěxǔ', 'quizá, tal vez'], ['对于', 'duìyú', 'sobre, respecto a'], ['讨厌', 'tǎoyàn', 'detestable; detestar'],
        ['烦', 'fán', 'fastidiado; fastidiar'], ['得意', 'déyì', 'orgulloso, satisfecho de sí mismo'], ['感受', 'gǎnshòu', 'sensación; sentir'], ['感情', 'gǎnqíng', 'sentimiento, cariño'], ['冷静', 'lěngjìng', 'sereno, tranquilo'],
        ['脾气', 'píqi', 'genio, carácter'], ['性格', 'xìnggé', 'personalidad'], ['幽默', 'yōumò', 'con sentido del humor'], ['活泼', 'huópō', 'vivaz, animado'], ['死', 'sǐ', 'morir; (grado extremo)'],
      ])}
      <h3>¿Cómo exageras un sentimiento?</h3>
      <p>Cuando algo te molesta mucho, en español dices «estoy fastidiadísimo». En chino se pone ${zh("死了", "sǐ le")} después del adjetivo. AllSet explica que ${zh("死了", "sǐ le")} intensifica un adjetivo de matiz desagradable: es un <strong>complemento de grado</strong>, una palabra detrás del adjetivo que dice cuánto. No habla de morir de verdad: ${zh("我累死了", "wǒ lèi sǐ le")} es «estoy agotado». La fuente añade que antes solo se usaba con adjetivos negativos y que hoy aparece también con algunos positivos. Hay otra forma con ${zh("得", "de")}: Dartmouth da ${zh("他病得很厉害", "tā bìng de hěn lìhai")}, «está muy enfermo». Como simplificación de la lección, la tratamos como otra manera de decir «mucho»; las fuentes la muestran solo con ejemplos.</p>
      <h3>¿Cómo dices «qué…»?</h3>
      <p>Para admirar o quejarte usas ${zh("多么", "duōme")}, un adverbio de grado alto con carga emocional. ChinGram dice que va antes de adjetivos o de verbos de sentimiento, no de verbos de acción como ${zh("去", "qù")}, y que la exclamación termina con ${zh("啊", "a")}: ${zh("她多么活泼啊", "tā duōme huópō a")}, «qué vivaz es». Normalmente no se usa en oraciones negativas.</p>
      <h3>¿Cómo suavizas una mala noticia?</h3>
      <p>AllSet dice que ${zh("恐怕", "kǒngpà")} es «me temo que…» y no hace falta que haya miedo de verdad. Va al inicio, mejor antes del sujeto, o después del sujeto, y suele llevar ${zh("会", "huì")} o ${zh("要", "yào")}: ${zh("恐怕他不会来了", "kǒngpà tā bù huì lái le")} y ${zh("他恐怕不会来了", "tā kǒngpà bù huì lái le")} dicen «me temo que no vendrá». Para una conjetura más suave, Dartmouth cita ${zh("也许", "yěxǔ")}, «quizá», antes del verbo: ${zh("他也许很忙", "tā yěxǔ hěn máng")}, «quizá está ocupado».</p>
      <h3>¿Cómo hablas de un tema?</h3>
      <p>${zh("对于", "duìyú")} presenta el tema: ${zh("对于这件事，你有什么感受", "duìyú zhè jiàn shì, nǐ yǒu shénme gǎnshòu")}, «sobre esto, ¿qué sientes?». AllSet dice que es casi igual a ${zh("对", "duì")}, pero más formal, y que ambas pueden ir al inicio o después del sujeto. Cuando señalas hacia quién va una emoción, se usa solo ${zh("对", "duì")}: ${zh("妈妈对我不高兴", "māma duì wǒ bù gāoxìng")}, «mamá no está contenta conmigo».</p>
      <h3>Una pregunta que no espera respuesta</h3>
      <p>Dartmouth explica que una pregunta con ${zh("什么", "shénme")} sirve para enfatizar. Con ${zh("有什么好", "yǒu shénme hǎo")} y un verbo, quiere decir que no hay motivo: ${zh("这有什么好烦的", "zhè yǒu shénme hǎo fán de")}. En una frase negativa, ${zh("什么", "shénme")} significa «ningún»: ${zh("这里没有什么问题", "zhèlǐ méi yǒu shénme wèntí")}.</p>
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("对于", "duìyú")} con una emoción hacia una persona: ${zh("妈妈对于我不高兴", "māma duìyú wǒ bù gāoxìng")} está mal.</p>`,
    ejemplo: `
      <p>Luis quiere decir: «Sobre esta cosa, me temo que mi hermano no estará contento».</p>
      <ol class="pasos-ej">
        <li>Parte de lo central: ${zh("哥哥不高兴", "gēge bù gāoxìng")}, «mi hermano no está contento».</li>
        <li>Para suavizar, pon ${zh("恐怕", "kǒngpà")} después del sujeto: ${zh("哥哥恐怕不高兴", "gēge kǒngpà bù gāoxìng")}.</li>
        <li>Para dar el tema, abre con ${zh("对于", "duìyú")} y una coma: ${zh("对于这件事，哥哥恐怕不高兴", "duìyú zhè jiàn shì, gēge kǒngpà bù gāoxìng")}.</li>
        <li>Si quisieras decir hacia quién, cambia a ${zh("对", "duì")}: ${zh("哥哥对我不高兴", "gēge duì wǒ bù gāoxìng")}.</li>
      </ol>
      <p>Para comprobar, mira que el tema sea una cosa y que la persona vaya con ${zh("对", "duì")}. Resultado: <span class="resultado">${zh("对于这件事，哥哥恐怕不高兴", "duìyú zhè jiàn shì, gēge kǒngpà bù gāoxìng")} = «sobre esto, me temo que mi hermano no estará contento»</span>.</p>
      <p class="nota"><strong>Error común:</strong> cambiar ${zh("对", "duì")} por ${zh("对于", "duìyú")} en ${zh("哥哥对我不高兴", "gēge duì wǒ bù gāoxìng")}. Con una emoción hacia una persona, solo vale ${zh("对", "duì")}.</p>`,
    vidaReal: `
      <p>Estas formas sirven cuando hablas de lo que sientes y piensas:</p>
      <ul>
        <li>Contar que estás muy cansado o fastidiado con una sola palabra.</li>
        <li>Dar una mala noticia con delicadeza.</li>
        <li>Opinar sobre un tema en la escuela o en una charla.</li>
        <li>Describir cómo es un amigo: vivaz, con humor o de buen genio.</li>
        <li>Entender cuando alguien te dice que algo no es para tanto.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("我烦死了", "wǒ fán sǐ le")}?</p>`,
        opciones: ['Me morí', 'Estoy fastidiadísimo', 'Voy a morir pronto', 'No me molesta'], correcta: 1,
        pista: `<p>${zh("死了", "sǐ le")} después de un adjetivo exagera; no habla de morir de verdad.</p>`,
        solucion: `<p>${zh("烦", "fán")} es «fastidiado» y ${zh("死了", "sǐ le")} lo intensifica: «estoy fastidiadísimo».</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «me temo que no vendrá».</p>',
        respuesta: ['恐怕', '他', '不会', '来', '了'], alternativas: [['他', '恐怕', '不会', '来', '了']], pinyin: ['kǒngpà', 'tā', 'bù huì', 'lái', 'le'], lang: 'zh-Hans',
        pista: `<p>${zh("恐怕", "kǒngpà")} puede ir antes del sujeto o justo después.</p>`,
        solucion: `<p>${zh("恐怕他不会来了", "kǒngpà tā bù huì lái le")} o ${zh("他恐怕不会来了", "tā kǒngpà bù huì lái le")}: las dos sirven.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «sobre esto, ¿qué sientes?».</p>',
        respuesta: ['对于', '这件事', '你', '有什么', '感受'], alternativas: [['你', '对于', '这件事', '有什么', '感受']], pinyin: ['duìyú', 'zhè jiàn shì', 'nǐ', 'yǒu shénme', 'gǎnshòu'], lang: 'zh-Hans',
        pista: `<p>${zh("对于", "duìyú")} puede abrir la oración o ir después del sujeto.</p>`,
        solucion: `<p>${zh("对于这件事，你有什么感受", "duìyú zhè jiàn shì, nǐ yǒu shénme gǎnshòu")}, o ${zh("你对于这件事有什么感受", "nǐ duìyú zhè jiàn shì yǒu shénme gǎnshòu")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «mamá no está contenta conmigo». ¿Qué frase está bien?</p>',
        opciones: [zh('妈妈对于我不高兴', 'māma duìyú wǒ bù gāoxìng'), zh('妈妈我对不高兴', 'māma wǒ duì bù gāoxìng'), zh('妈妈对我不高兴', 'māma duì wǒ bù gāoxìng'), zh('对妈妈我不高兴', 'duì māma wǒ bù gāoxìng')], correcta: 2,
        pista: `<p>Es una emoción hacia una persona: ahí solo se usa ${zh("对", "duì")}.</p>`,
        solucion: `<p>${zh("妈妈对我不高兴", "māma duì wǒ bù gāoxìng")}: con una emoción hacia alguien, ${zh("对于", "duìyú")} no vale.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «qué vivaz es». ¿Qué frase está bien?</p>',
        opciones: [zh('她多么去啊', 'tā duōme qù a'), zh('她多么活泼啊', 'tā duōme huópō a'), zh('她不多么活泼', 'tā bù duōme huópō'), zh('她多么吃饭啊', 'tā duōme chīfàn a')], correcta: 1,
        pista: `<p>${zh("多么", "duōme")} va antes de un adjetivo, no de un verbo de acción.</p>`,
        solucion: `<p>${zh("她多么活泼啊", "tā duōme huópō a")}: ${zh("多么", "duōme")} + adjetivo y ${zh("啊", "a")} al final de la exclamación.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("性格", "xìnggé")}.</p>`,
        respuestas: ['personalidad', 'la personalidad', 'caracter', 'el caracter', 'temperamento'],
        pista: '<p>Es cómo es una persona por dentro, por ejemplo vivaz o tranquila.</p>',
        solucion: `<p>${zh("性格", "xìnggé")} es «personalidad» o «carácter».</p>` },
    ],
    fuentes: [SILABO, ALLSET_SI, ALLSET_DUIYU, ALLSET_KONGPA, DART_16, DART_7, DART_19, DART_17, DART_9, DART_8, DART_13, DART_22, DART_18, DART_11, CHINGRAM_GRADO, CHINGRAM_DUI, CHINGRAM_SHENME, OXFORD_DE, MIT],
  });

  L('Casa y vecindario', {
    objetivo: `Contar los objetos de una casa con los clasificadores ${zh("台", "tái")}, ${zh("棵", "kē")} y ${zh("幅", "fú")}, y usar ${zh("各种", "gèzhǒng")}, ${zh("任何", "rènhé")} y ${zh("互相", "hùxiāng")} para hablar de la casa y de los vecinos.`,
    explicacion: `
      <p>Una familia visita un cuarto que quiere alquilar. Las frases de ejemplo son de la lección.</p>
      <ul>
        <li>${zh("我想租这个房间，请问房东在吗", "wǒ xiǎng zū zhège fángjiān, qǐngwèn fángdōng zài ma")}: «Quiero alquilar este cuarto; ¿está el casero?».</li>
        <li>${zh("客厅里有各种家具", "kètīng li yǒu gèzhǒng jiājù")}: «En la sala hay toda clase de muebles».</li>
        <li>${zh("周围怎么样", "zhōuwéi zěnmeyàng")}: «¿Cómo son los alrededores?».</li>
      </ul>
      ${tabla([
        ['家具', 'jiājù', 'muebles'], ['厨房', 'chúfáng', 'cocina'], ['客厅', 'kètīng', 'sala, sala de estar'], ['院子', 'yuànzi', 'patio, jardín'], ['房东', 'fángdōng', 'casero, dueño de la casa'],
        ['房租', 'fángzū', 'alquiler (dinero)'], ['租', 'zū', 'alquilar, rentar'], ['台', 'tái', 'clasificador de aparatos'], ['棵', 'kē', 'clasificador de árboles y plantas'], ['幅', 'fú', 'clasificador de cuadros'],
        ['袋子', 'dàizi', 'bolsa'], ['各种', 'gèzhǒng', 'toda clase de'], ['任何', 'rènhé', 'cualquier'], ['互相', 'hùxiāng', 'uno al otro, mutuamente'], ['周围', 'zhōuwéi', 'alrededores'],
      ])}
      <h3>¿Cómo cuentas las cosas de la casa?</h3>
      <p>En español dices «un televisor» y «un árbol». En chino, entre el número y el objeto va un <strong>clasificador</strong>, una palabra que depende del tipo de cosa. ChinGram dice que tras un número o tras ${zh("这", "zhè")} el clasificador es obligatorio, y que tras ${zh("这", "zhè")} se omite el ${zh("一", "yī")}. Según la lista de CSB, ${zh("台", "tái")} cuenta aparatos pesados, como televisores y computadoras; ${zh("棵", "kē")} cuenta árboles y otras plantas; ${zh("幅", "fú")} cuenta cuadros. Por eso: ${zh("客厅里有一台电视", "kètīng li yǒu yī tái diànshì")}, ${zh("院子里有一棵树", "yuànzi li yǒu yī kē shù")} y ${zh("房间里有一幅画", "fángjiān li yǒu yī fú huà")}. Con ${zh("袋子", "dàizi")} puedes decir ${zh("桌子上有一袋水果", "zhuōzi shang yǒu yī dài shuǐguǒ")}, «hay una bolsa de fruta»; aquí ${zh("袋", "dài")} solo es un ejemplo de la lección. Y si repites el clasificador, ChinGram dice que significa «cada»: ${zh("个个孩子都很活泼", "gègè háizi dōu hěn huópō")}.</p>
      <h3>¿Y cuando algo llena el lugar?</h3>
      <p>El sílabo también lista clasificadores prestados: nombres de lugares o muebles que sirven para medir. Dartmouth muestra ${zh("屋子", "wūzi")} como medida del espacio entero. Como simplificación de la lección: ${zh("他家来了一屋子人", "tā jiā lái le yī wūzi rén")}, «a su casa llegó un cuarto lleno de gente», y ${zh("他们做了一桌子菜", "tāmen zuò le yī zhuōzi cài")}, «hicieron una mesa llena de comida».</p>
      <h3>¿Cómo dices «toda clase de» y «cualquier»?</h3>
      <p>Dartmouth glosa ${zh("各种", "gèzhǒng")} como «toda clase de» y lo muestra antes del sustantivo: ${zh("这里有各种家具", "zhèlǐ yǒu gèzhǒng jiājù")}. Para «cualquier» usa ${zh("任何", "rènhé")}. AllSet dice que no suele llevar ${zh("的", "de")} y que se combina a menudo con ${zh("都", "dōu")} o ${zh("也", "yě")}: ${zh("任何人都可以租这个房间", "rènhé rén dōu kěyǐ zū zhège fángjiān")}, «cualquiera puede alquilar este cuarto».</p>
      <h3>¿Cómo dices «uno al otro»?</h3>
      <p>Para una acción que va en los dos sentidos usa ${zh("互相", "hùxiāng")}, antes del verbo: ${zh("我和房东互相帮助", "wǒ hé fángdōng hùxiāng bāngzhù")}, «el casero y yo nos ayudamos». AllSet dice que va con verbos de dos sílabas y que, con uno de una sílaba, hay que añadir algo detrás.</p>
      <p class="nota"><strong>Trampa común:</strong> poner un verbo de una sílaba sin nada más, como ${zh("他们互相看", "tāmen hùxiāng kàn")}. Falta algo después: ${zh("他们互相看了看", "tāmen hùxiāng kàn le kàn")}. Y ${zh("一", "yī")} se escribe con su tono original; al hablar cambia (unidad 9).</p>`,
    ejemplo: `
      <p>Ana escribe un mensaje a su prima para contarle cómo es su casa nueva.</p>
      <ol class="pasos-ej">
        <li>Empieza por el lugar y ${zh("有", "yǒu")}: ${zh("客厅里有", "kètīng li yǒu")}, «en la sala hay».</li>
        <li>Elige el clasificador por el tipo de cosa. Un televisor es un aparato, así que va ${zh("台", "tái")}: ${zh("客厅里有一台电视", "kètīng li yǒu yī tái diànshì")}.</li>
        <li>Haz lo mismo con el patio. Un árbol lleva ${zh("棵", "kē")}: ${zh("院子里有一棵树", "yuànzi li yǒu yī kē shù")}.</li>
        <li>Si quieres decir que hay muchos tipos, usa ${zh("各种", "gèzhǒng")} antes del sustantivo: ${zh("客厅里有各种家具", "kètīng li yǒu gèzhǒng jiājù")}.</li>
      </ol>
      <p>Para comprobar, busca que cada número vaya seguido de su clasificador y que ${zh("各种", "gèzhǒng")} no lleve ${zh("一", "yī")}. Resultado: <span class="resultado">${zh("客厅里有一台电视，院子里有一棵树", "kètīng li yǒu yī tái diànshì, yuànzi li yǒu yī kē shù")} = «en la sala hay un televisor y en el patio hay un árbol»</span>.</p>
      <p class="nota"><strong>Error común:</strong> quitar el clasificador, como ${zh("院子里有一树", "yuànzi li yǒu yī shù")}. Entre el número y el sustantivo siempre va el clasificador.</p>`,
    vidaReal: `
      <p>Estas formas sirven cuando hablas de dónde vives:</p>
      <ul>
        <li>Describir los muebles y las cosas de una casa nueva a un amigo.</li>
        <li>Preguntar por el alquiler o hablar con el casero.</li>
        <li>Contar cuántos árboles, televisores o cuadros hay en un lugar.</li>
        <li>Decir que cualquier persona puede entrar o participar en algo.</li>
        <li>Hablar de cómo se ayudan los vecinos entre sí cada día.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Quieres decir «en el patio hay un árbol». ¿Qué frase está bien?</p>',
        opciones: [zh('院子里有一台树', 'yuànzi li yǒu yī tái shù'), zh('院子里有一幅树', 'yuànzi li yǒu yī fú shù'), zh('院子里有一棵树', 'yuànzi li yǒu yī kē shù'), zh('院子里有一袋树', 'yuànzi li yǒu yī dài shù')], correcta: 2,
        pista: `<p>Piensa en el clasificador de árboles y plantas.</p>`,
        solucion: `<p>${zh("棵", "kē")} cuenta árboles y otras plantas: ${zh("一棵树", "yī kē shù")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «en la sala hay un televisor».</p>',
        respuesta: ['客厅里', '有', '一', '台', '电视'], pinyin: ['kètīng li', 'yǒu', 'yī', 'tái', 'diànshì'], lang: 'zh-Hans',
        pista: `<p>Primero el lugar, luego ${zh("有", "yǒu")}, y el número va con su clasificador.</p>`,
        solucion: `<p>${zh("客厅里有一台电视", "kètīng li yǒu yī tái diànshì")}: lugar, ${zh("有", "yǒu")}, número, ${zh("台", "tái")} y el objeto.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «cualquiera puede alquilar este cuarto». ¿Qué frase está bien?</p>',
        opciones: [zh('任何人都可以租这个房间', 'rènhé rén dōu kěyǐ zū zhège fángjiān'), zh('任何的人都可以租这个房间', 'rènhé de rén dōu kěyǐ zū zhège fángjiān'), zh('都任何人可以租这个房间', 'dōu rènhé rén kěyǐ zū zhège fángjiān'), zh('任何人租都可以这个房间', 'rènhé rén zū dōu kěyǐ zhège fángjiān')], correcta: 0,
        pista: `<p>${zh("任何", "rènhé")} no suele llevar ${zh("的", "de")} y se combina con ${zh("都", "dōu")}.</p>`,
        solucion: `<p>${zh("任何人都可以租这个房间", "rènhé rén dōu kěyǐ zū zhège fángjiān")}: ${zh("任何", "rènhé")} + sustantivo + ${zh("都", "dōu")} + el resto.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «el casero y yo nos ayudamos».</p>',
        respuesta: ['我', '和', '房东', '互相', '帮助'], alternativas: [['房东', '和', '我', '互相', '帮助']], pinyin: ['wǒ', 'hé', 'fángdōng', 'hùxiāng', 'bāngzhù'], lang: 'zh-Hans',
        pista: `<p>${zh("互相", "hùxiāng")} va justo antes del verbo.</p>`,
        solucion: `<p>${zh("我和房东互相帮助", "wǒ hé fángdōng hùxiāng bāngzhù")}: los dos sujetos, ${zh("互相", "hùxiāng")} y el verbo. También vale empezar por ${zh("房东", "fángdōng")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("这里有各种家具", "zhèlǐ yǒu gèzhǒng jiājù")}?</p>`,
        opciones: ['Aquí hay un solo mueble', 'Aquí no hay muebles', 'Aquí cualquiera puede comprar muebles', 'Aquí hay toda clase de muebles'], correcta: 3,
        pista: `<p>Piensa en ${zh("各种", "gèzhǒng")}: «toda clase de».</p>`,
        solucion: `<p>${zh("各种", "gèzhǒng")} va antes del sustantivo y significa «toda clase de»: ${zh("各种家具", "gèzhǒng jiājù")}.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("租", "zū")}.</p>`,
        respuestas: ['alquilar', 'rentar', 'arrendar', 'alquiler'],
        pista: '<p>Es lo que haces con una casa que no es tuya y por la que pagas cada mes.</p>',
        solucion: `<p>${zh("租", "zū")} es «alquilar» o «rentar»; ${zh("房租", "fángzū")} es el dinero que se paga.</p>` },
    ],
    fuentes: [SILABO, CSB, CHINGRAM_MW, ALLSET_MW, DART_10, DART_21, DART_9, DART_29, DART_20, DART_24, ALLSET_RENHE, DART_11, DART_26, DART_5, ALLSET_HUXIANG],
  });

  L('Familia y crecer', {
    objetivo: `Hablar de la familia y de cómo cambian las cosas con el tiempo: ${zh("从来", "cónglái")}, ${zh("往往", "wǎngwǎng")}, ${zh("随着", "suízhe")}, ${zh("一天比一天", "yī tiān bǐ yī tiān")} y ${zh("再也不", "zài yě bù")}.`,
    explicacion: `
      <p>Una niña muestra una foto de su familia. Las frases de ejemplo son de la lección.</p>
      <ul>
        <li>${zh("这是我的家庭，有父亲、母亲和弟弟", "zhè shì wǒ de jiātíng, yǒu fùqīn, mǔqīn hé dìdi")}: «Esta es mi familia: mi padre, mi madre y mi hermano menor».</li>
        <li>${zh("我的童年很快乐", "wǒ de tóngnián hěn kuàilè")}: «Mi infancia fue feliz».</li>
        <li>${zh("我偶尔给亲戚打电话", "wǒ ǒu'ěr gěi qīnqi dǎ diànhuà")}: «De vez en cuando llamo a mis parientes».</li>
      </ul>
      ${tabla([
        ['随着', 'suízhe', 'a medida que, junto con'], ['从来', 'cónglái', 'siempre (hasta ahora); con negación, nunca'], ['往往', 'wǎngwǎng', 'a menudo, por lo general'], ['偶尔', 'ǒu\'ěr', 'de vez en cuando'], ['父母', 'fùmǔ', 'padres (padre y madre)'],
        ['父亲', 'fùqīn', 'padre'], ['母亲', 'mǔqīn', 'madre'], ['亲戚', 'qīnqi', 'pariente'], ['兄弟', 'xiōngdì', 'hermanos'], ['孙子', 'sūnzi', 'nieto (hijo del hijo)'],
        ['童年', 'tóngnián', 'infancia'], ['年龄', 'niánlíng', 'edad'], ['家庭', 'jiātíng', 'familia, hogar'], ['家长', 'jiāzhǎng', 'padre o tutor de un alumno'], ['成为', 'chéngwéi', 'llegar a ser, convertirse en'],
      ])}
      <p>Con ${zh("成为", "chéngwéi")} puedes hablar de lo que quieres ser: ${zh("他想成为老师", "tā xiǎng chéngwéi lǎoshī")}, «quiere llegar a ser maestro».</p>
      <h3>¿Cómo dices «nunca»?</h3>
      <p>Dartmouth explica que ${zh("从来", "cónglái")} expresa «hasta el presente» y se usa sobre todo en oraciones negativas, con ${zh("不", "bù")} o ${zh("没", "méi")}: ${zh("哥哥从来不生气", "gēge cónglái bù shēngqì")}, «mi hermano nunca se enoja». Con ${zh("没", "méi")} y un verbo de una sílaba, suele añadirse ${zh("过", "guo")}: ${zh("我从来没见过这个亲戚", "wǒ cónglái méi jiàn guo zhège qīnqi")}, «nunca he visto a este pariente». MIT dice lo mismo: solo en negativas. En afirmativas aparece poco y necesita más palabras en la oración.</p>
      <h3>¿Cómo dices «por lo general»?</h3>
      <p>Dartmouth presenta ${zh("往往", "wǎngwǎng")} como un <strong>adverbio de frecuencia</strong> que se parece a ${zh("常常", "chángcháng")}: indica que, según la experiencia, algo suele pasar bajo ciertas condiciones. Por eso necesita decir cuáles: ${zh("周末，我的父母往往在家", "zhōumò, wǒ de fùmǔ wǎngwǎng zài jiā")}, «los fines de semana mis padres suelen estar en casa». Y a diferencia de ${zh("常常", "chángcháng")}, no sirve para lo que aún no ocurrió.</p>
      <h3>¿Cómo dices «a medida que»?</h3>
      <p>Según Oxford, ${zh("随着", "suízhe")} va al principio de una cláusula, y después viene la oración principal: ${zh("随着年龄变大，他更冷静", "suízhe niánlíng biàn dà, tā gèng lěngjìng")}, «a medida que crece, es más sereno». MIT la glosa como «siguiendo; junto con».</p>
      <h3>¿Cómo dices «cada día más»?</h3>
      <p>MIT muestra un patrón con ${zh("比", "bǐ")} que repite una unidad de tiempo, como en ${zh("一年比一年", "yī nián bǐ yī nián")}. Como simplificación de la lección: ${zh("弟弟一天比一天高", "dìdi yī tiān bǐ yī tiān gāo")}, «mi hermano está cada día más alto». AllSet enseña otra forma sin ${zh("比", "bǐ")}, ${zh("一天一天", "yī tiān yī tiān")}, «día a día».</p>
      <h3>¿Cómo dices «nunca más»?</h3>
      <p>AllSet dice que ${zh("再也不", "zài yě bù")} expresa que algo no volverá a hacerse, y suele cerrar con ${zh("了", "le")}: ${zh("他再也不住在这里了", "tā zài yě bù zhù zài zhèlǐ le")}, «ya no vive aquí». Para el pasado se usa ${zh("再也没", "zài yě méi")} con ${zh("过", "guo")}: ${zh("我再也没见过他", "wǒ zài yě méi jiàn guo tā")}, «no lo he vuelto a ver».</p>
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("往往", "wǎngwǎng")} para el futuro, como ${zh("明天我往往在家", "míngtiān wǒ wǎngwǎng zài jiā")}. Y ${zh("不", "bù")} y ${zh("一", "yī")} se escriben con su tono original; al hablar cambian (unidad 9).</p>`,
    ejemplo: `
      <p>Sofía quiere contar: «Cuando era pequeña, un pariente venía a menudo los fines de semana; ahora ya no viene».</p>
      <ol class="pasos-ej">
        <li>Para la costumbre, pon la condición y ${zh("往往", "wǎngwǎng")}: ${zh("周末，亲戚往往来我家", "zhōumò, qīnqi wǎngwǎng lái wǒ jiā")}.</li>
        <li>Para el cambio, usa ${zh("再也不", "zài yě bù")} y cierra con ${zh("了", "le")}: ${zh("他再也不来了", "tā zài yě bù lái le")}.</li>
        <li>Si quieres decir que nunca lo has visto después, cambia a ${zh("再也没", "zài yě méi")} con ${zh("过", "guo")}: ${zh("我再也没见过他", "wǒ zài yě méi jiàn guo tā")}.</li>
      </ol>
      <p>Para comprobar, mira que ${zh("往往", "wǎngwǎng")} tenga una condición y que ${zh("再也不", "zài yě bù")} termine en ${zh("了", "le")}. Resultado: <span class="resultado">${zh("他再也不来了", "tā zài yě bù lái le")} = «ya no viene más»</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir ${zh("我从来见过他", "wǒ cónglái jiàn guo tā")}. ${zh("从来", "cónglái")} pide una negación: ${zh("我从来没见过他", "wǒ cónglái méi jiàn guo tā")}.</p>`,
    vidaReal: `
      <p>Estas formas sirven cuando cuentas tu historia y la de tu familia:</p>
      <ul>
        <li>Decir que algo nunca ha pasado en tu casa.</li>
        <li>Contar lo que suele pasar en ciertos días.</li>
        <li>Explicar cómo cambia algo mientras alguien crece.</li>
        <li>Decir que ya no haces algo o que no lo has vuelto a hacer.</li>
        <li>Hablar de tu familia y tus parientes con más detalle.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Quieres decir «nunca he visto a este pariente». ¿Qué frase está bien?</p>',
        opciones: [zh('我从来见过这个亲戚', 'wǒ cónglái jiàn guo zhège qīnqi'), zh('我从来没见过这个亲戚', 'wǒ cónglái méi jiàn guo zhège qīnqi'), zh('我没从来见过这个亲戚', 'wǒ méi cónglái jiàn guo zhège qīnqi'), zh('我从来没见这个亲戚', 'wǒ cónglái méi jiàn zhège qīnqi')], correcta: 1,
        pista: `<p>${zh("从来", "cónglái")} pide una negación, y con ${zh("没", "méi")} se añade ${zh("过", "guo")}.</p>`,
        solucion: `<p>${zh("我从来没见过这个亲戚", "wǒ cónglái méi jiàn guo zhège qīnqi")}: ${zh("从来", "cónglái")}, ${zh("没", "méi")}, verbo y ${zh("过", "guo")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «a medida que crece, es más sereno».</p>',
        respuesta: ['随着', '年龄', '变大', '他', '更', '冷静'], pinyin: ['suízhe', 'niánlíng', 'biàn dà', 'tā', 'gèng', 'lěngjìng'], lang: 'zh-Hans',
        pista: `<p>${zh("随着", "suízhe")} abre la primera parte; después va la oración principal.</p>`,
        solucion: `<p>${zh("随着年龄变大，他更冷静", "suízhe niánlíng biàn dà, tā gèng lěngjìng")}: primero ${zh("随着", "suízhe")} con el cambio y luego la oración principal.</p>` },
      { tipo: 'opciones', enunciado: `<p>${zh("往往", "wǎngwǎng")} sirve para costumbres, no para planes. ¿Cuál de estas frases está mal?</p>`,
        opciones: [zh('周末，我往往在家', 'zhōumò, wǒ wǎngwǎng zài jiā'), zh('下雨的时候，他往往不出去', 'xià yǔ de shíhou, tā wǎngwǎng bù chūqù'), zh('明天我往往在家', 'míngtiān wǒ wǎngwǎng zài jiā'), zh('周末，父母往往在家', 'zhōumò, fùmǔ wǎngwǎng zài jiā')], correcta: 2,
        pista: `<p>Busca la frase que habla de algo que todavía no ocurrió.</p>`,
        solucion: `<p>${zh("明天我往往在家", "míngtiān wǒ wǎngwǎng zài jiā")} habla de mañana, y ${zh("往往", "wǎngwǎng")} no sirve para lo que aún no ocurrió.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «no lo he vuelto a ver». ¿Qué frase está bien?</p>',
        opciones: [zh('我再也不见过他', 'wǒ zài yě bù jiàn guo tā'), zh('我没再也见过他', 'wǒ méi zài yě jiàn guo tā'), zh('再也我没见过他', 'zài yě wǒ méi jiàn guo tā'), zh('我再也没见过他', 'wǒ zài yě méi jiàn guo tā')], correcta: 3,
        pista: `<p>Es algo del pasado: usa ${zh("没", "méi")} y ${zh("过", "guo")}.</p>`,
        solucion: `<p>${zh("我再也没见过他", "wǒ zài yě méi jiàn guo tā")}: sujeto, ${zh("再也没", "zài yě méi")}, verbo y ${zh("过", "guo")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("弟弟一天比一天高", "dìdi yī tiān bǐ yī tiān gāo")}?</p>`,
        opciones: ['Mi hermano está cada día más alto', 'Mi hermano es más alto que yo', 'Mi hermano es alto solo un día', 'Mi hermano ya no crece'], correcta: 0,
        pista: `<p>Piensa en la idea de «día a día».</p>`,
        solucion: `<p>${zh("一天比一天", "yī tiān bǐ yī tiān")} repite el día y dice que algo aumenta con el tiempo: «cada día más».</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("年龄", "niánlíng")}.</p>`,
        respuestas: ['edad', 'la edad', 'edades'],
        pista: '<p>Es el número de años que tiene una persona.</p>',
        solucion: `<p>${zh("年龄", "niánlíng")} es «edad».</p>` },
    ],
    fuentes: [SILABO, DART_8, DART_13, DART_21, DART_6, MIT, OXFORD_PRENSA, ALLSET_NUNCA, ALLSET_UNO],
  });

  L('Estudios y trabajo', {
    objetivo: `Ordenar tus razones con ${zh("首先", "shǒuxiān")}…${zh("其次", "qícì")}…, mostrar dos lados de un asunto con ${zh("一方面", "yī fāngmiàn")}…${zh("另一方面", "lìng yī fāngmiàn")}… y decir para qué haces algo con ${zh("为了", "wèile")}.`,
    explicacion: `
      <p>Dos estudiantes hablan del próximo periodo. Las frases de ejemplo son de la lección.</p>
      <ul>
        <li>${zh("这个课程很有意思，我想报名", "zhège kèchéng hěn yǒu yìsi, wǒ xiǎng bàomíng")}: «Este curso es muy interesante; quiero inscribirme».</li>
        <li>${zh("期末以前，我首先要预习", "qīmò yǐqián, wǒ shǒuxiān yào yùxí")}: «Antes del fin del periodo, primero tengo que repasar de antemano».</li>
        <li>${zh("你敢一个人去打工吗", "nǐ gǎn yī gè rén qù dǎgōng ma")}: «¿Te atreves a ir a trabajar por tu cuenta?».</li>
      </ul>
      ${tabla([
        ['首先', 'shǒuxiān', 'primero, en primer lugar'], ['其次', 'qícì', 'en segundo lugar, luego'], ['敢', 'gǎn', 'atreverse a'], ['报名', 'bàomíng', 'inscribirse'], ['报考', 'bàokǎo', 'inscribirse a un examen de ingreso'],
        ['课程', 'kèchéng', 'curso, materia'], ['期末', 'qīmò', 'fin del periodo escolar'], ['预习', 'yùxí', 'repasar la lección antes de verla en clase'], ['打工', 'dǎgōng', 'hacer un trabajo temporal o por horas'], ['单位', 'dānwèi', 'lugar de trabajo, oficina, institución'],
        ['部门', 'bùmén', 'departamento, área'], ['经历', 'jīnglì', 'experiencia vivida; vivir, pasar por'], ['竞争', 'jìngzhēng', 'competir; competencia'], ['积累', 'jīlěi', 'acumular, ir juntando'], ['优秀', 'yōuxiù', 'sobresaliente, excelente'],
      ])}
      <h3>¿Cómo pones tus razones en orden?</h3>
      <p>Cuando quieres explicar varios pasos, ayuda numerarlos. Dartmouth dice que en chino es común enumerar por secuencia, por orden o por importancia con tres cláusulas que empiezan con ${zh("首先", "shǒuxiān")} («primero»), ${zh("其次", "qícì")} («en segundo lugar») y ${zh("最后", "zuìhòu")} («por último»). Por ejemplo, ${zh("想学好汉语，首先要预习，其次要多听，最后要多说", "xiǎng xuéhǎo Hànyǔ, shǒuxiān yào yùxí, qícì yào duō tīng, zuìhòu yào duō shuō")} quiere decir «para aprender bien chino, primero hay que repasar de antemano, luego escuchar mucho y por último hablar mucho». Dartmouth muestra que ${zh("首先", "shǒuxiān")} y ${zh("其次", "qícì")} pueden ir seguidos de ${zh("是", "shì")} y un nombre o un grupo verbal: ${zh("我的工作有两件事，首先是回复短信，其次是打印表格", "wǒ de gōngzuò yǒu liǎng jiàn shì, shǒuxiān shì huífù duǎnxìn, qícì shì dǎyìn biǎogé")}, «mi trabajo tiene dos cosas: primero, responder mensajes y, luego, imprimir formularios».</p>
      <h3>¿Cómo muestras los dos lados de algo?</h3>
      <p>Casi todo tiene una cara y otra. Dartmouth explica que ${zh("一方面", "yī fāngmiàn")}…${zh("另一方面", "lìng yī fāngmiàn")}… une dos oraciones paralelas y presenta dos asuntos, dos situaciones o dos aspectos de una misma cosa: ${zh("打工一方面可以积累经历，另一方面可以认识新朋友", "dǎgōng yī fāngmiàn kěyǐ jīlěi jīnglì, lìng yī fāngmiàn kěyǐ rènshi xīn péngyou")}, «trabajar por horas, por un lado, deja acumular experiencia y, por otro, permite conocer gente nueva».</p>
      <h3>¿Cómo dices para qué lo haces?</h3>
      <p>Para dar el propósito se usa ${zh("为了", "wèile")}. Dartmouth lo muestra al inicio de la oración, como en ${zh("为了考试，我每天都预习", "wèile kǎoshì, wǒ měitiān dōu yùxí")}, «para el examen, repaso todos los días», y también después del sujeto: ${zh("我为了考试每天都预习", "wǒ wèile kǎoshì měitiān dōu yùxí")}. MIT aclara que ${zh("为了", "wèile")} va seguido de un propósito o una razón, mientras que ${zh("为", "wèi")} suele ir con una persona. AllSet, una fuente de apoyo que no es universitaria, añade un patrón más formal: sujeto, ${zh("为", "wèi")}, la meta, ${zh("而", "ér")} y el esfuerzo; ${zh("为", "wèi")} puede cambiarse por ${zh("为了", "wèile")}, y para negar se pone ${zh("不", "bù")} antes de ${zh("为", "wèi")}. Así: ${zh("他为了报考这个学校而学习汉语", "tā wèile bàokǎo zhège xuéxiào ér xuéxí Hànyǔ")}, «él estudia chino para inscribirse al examen de ingreso de esta escuela».</p>
      <h3>¿Cómo dices «atreverse»?</h3>
      <p>Cuando algo da miedo o vergüenza usas ${zh("敢", "gǎn")}, «atreverse». Dartmouth lo glosa como verbo y MIT lo muestra con ${zh("不", "bù")}, en una frase sobre alguien que no se atrevió ni a probar un bocado. Como simplificación de la lección, va antes del verbo: ${zh("你敢报名吗", "nǐ gǎn bàomíng ma")}, «¿te atreves a inscribirte?», y ${zh("我不敢一个人去单位", "wǒ bù gǎn yī gè rén qù dānwèi")}, «no me atrevo a ir a la oficina por mi cuenta». Las fuentes solo traen ejemplos, no una regla.</p>
      <p>El sílabo lista además ${zh("拿", "ná")}…${zh("来说", "láishuō")}, una estructura fija de nivel 4. Aquí solo la mencionamos.</p>
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("为", "wèi")} cuando lo que sigue es una meta. MIT dice que ${zh("为", "wèi")} suele ir con una persona; para un propósito, ${zh("为了", "wèile")}. Y ${zh("不", "bù")} y ${zh("一", "yī")} se escriben con su tono original; al hablar cambian (unidad 9).</p>`,
    ejemplo: `
      <p>Lucía quiere decir: «Para inscribirme, primero relleno el formulario y después llamo al departamento».</p>
      <ol class="pasos-ej">
        <li>Piensa en el propósito: inscribirse. Con ${zh("为了", "wèile")} y una coma abres la oración: ${zh("为了报名", "wèile bàomíng")}.</li>
        <li>Pon el primer paso con ${zh("首先", "shǒuxiān")} después del sujeto: ${zh("我首先填写表格", "wǒ shǒuxiān tiánxiě biǎogé")}.</li>
        <li>Pon el segundo paso con ${zh("其次", "qícì")}: ${zh("其次给部门打电话", "qícì gěi bùmén dǎ diànhuà")}.</li>
        <li>Junta las partes con comas y cuida que el orden sea el mismo que el de las acciones.</li>
      </ol>
      <p>Para comprobar, lee los pasos de seguido y mira que ${zh("首先", "shǒuxiān")} aparezca antes que ${zh("其次", "qícì")}. Resultado: <span class="resultado">${zh("为了报名，我首先填写表格，其次给部门打电话", "wèile bàomíng, wǒ shǒuxiān tiánxiě biǎogé, qícì gěi bùmén dǎ diànhuà")} = «para inscribirme, primero relleno el formulario y después llamo al departamento»</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir ${zh("其次", "qícì")} antes de ${zh("首先", "shǒuxiān")}. Los dos marcan un orden, así que ${zh("首先", "shǒuxiān")} abre la lista.</p>`,
    vidaReal: `
      <p>Estas formas aparecen cuando hablas de estudiar y de trabajar:</p>
      <ul>
        <li>Explicar en orden qué harás para inscribirte en un curso.</li>
        <li>Contar los dos lados de un trabajo por horas: lo que ganas y lo que cuesta.</li>
        <li>Decir para qué estudias algo sin repetir la misma palabra una y otra vez.</li>
        <li>Contar con naturalidad algo que te da miedo y no te atreves a hacer.</li>
        <li>Leer anuncios de cursos y de empleos con más facilidad.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «primero rellena el formulario, después llama al departamento».</p>',
        respuesta: ['首先', '填写表格', '其次', '给部门', '打电话'], pinyin: ['shǒuxiān', 'tiánxiě biǎogé', 'qícì', 'gěi bùmén', 'dǎ diànhuà'], lang: 'zh-Hans',
        pista: `<p>${zh("首先", "shǒuxiān")} abre la lista y ${zh("其次", "qícì")} sigue.</p>`,
        solucion: `<p>${zh("首先填写表格，其次给部门打电话", "shǒuxiān tiánxiě biǎogé, qícì gěi bùmén dǎ diànhuà")}: cada paso va en el orden en que se hace.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «trabajar por horas, por un lado, deja acumular experiencia y, por otro, permite conocer gente nueva».</p>',
        respuesta: ['打工', '一方面', '可以积累经历', '另一方面', '可以认识新朋友'], pinyin: ['dǎgōng', 'yī fāngmiàn', 'kěyǐ jīlěi jīnglì', 'lìng yī fāngmiàn', 'kěyǐ rènshi xīn péngyou'], lang: 'zh-Hans',
        pista: `<p>Primero el tema, luego un lado con ${zh("一方面", "yī fāngmiàn")} y después el otro con ${zh("另一方面", "lìng yī fāngmiàn")}.</p>`,
        solucion: `<p>${zh("打工一方面可以积累经历，另一方面可以认识新朋友", "dǎgōng yī fāngmiàn kěyǐ jīlěi jīnglì, lìng yī fāngmiàn kěyǐ rènshi xīn péngyou")}: el tema y dos lados paralelos.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «él estudia chino para poder ir a China». ¿Qué frase está bien?</p>',
        opciones: [zh('他而为了去中国学习汉语', 'tā ér wèile qù Zhōngguó xuéxí Hànyǔ'), zh('他为了学习汉语而去中国', 'tā wèile xuéxí Hànyǔ ér qù Zhōngguó'), zh('他为了去中国而学习汉语', 'tā wèile qù Zhōngguó ér xuéxí Hànyǔ'), zh('为了他去中国而汉语学习', 'wèile tā qù Zhōngguó ér Hànyǔ xuéxí')], correcta: 2,
        pista: `<p>Después de ${zh("为了", "wèile")} va la meta, y después de ${zh("而", "ér")} va lo que haces para lograrla.</p>`,
        solucion: `<p>${zh("他为了去中国而学习汉语", "tā wèile qù Zhōngguó ér xuéxí Hànyǔ")}: la meta es ir a China y el esfuerzo es estudiar. La segunda opción dice lo contrario: va a China para estudiar chino.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("我不敢一个人去单位", "wǒ bù gǎn yī gè rén qù dānwèi")}?</p>`,
        opciones: ['No quiero ir a la oficina con nadie', 'No me atrevo a ir a la oficina por mi cuenta', 'Voy a la oficina cada día', 'No sé dónde está la oficina'], correcta: 1,
        pista: `<p>Piensa en ${zh("敢", "gǎn")}: «atreverse».</p>`,
        solucion: `<p>${zh("不敢", "bù gǎn")} es «no atreverse», y ${zh("一个人", "yī gè rén")} es «una sola persona», es decir, por tu cuenta.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("经历")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['jīng lì'],
        pista: '<p>La primera sílaba empieza alta y se mantiene; la segunda baja.</p>',
        solucion: `<p>${zh("经历", "jīnglì")}: <strong>jīng lì</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("报名", "bàomíng")}.</p>`,
        respuestas: ['inscribirse', 'inscripcion', 'inscribir', 'registrarse', 'apuntarse', 'matricularse'],
        pista: '<p>Es lo que haces para entrar a un curso o a una actividad.</p>',
        solucion: `<p>${zh("报名", "bàomíng")} es «inscribirse».</p>` },
    ],
    fuentes: [SILABO, DART_30, DART_27, DART_12, MIT, ALLSET_WEI, DART_16_GAN],
  });

  L('Naturaleza y medio ambiente', {
    objetivo: `Hablar del campo y del cuidado del ambiente con ${zh("既", "jì")}…${zh("也", "yě")}…, ${zh("好", "hǎo")} (para que), ${zh("至少", "zhìshǎo")}, ${zh("尤其", "yóuqí")} y ${zh("却", "què")}.`,
    explicacion: `
      <p>Dos amigas pasean por un bosque pequeño. Las frases de ejemplo son de la lección.</p>
      <ul>
        <li>${zh("这个树林的空气真好", "zhège shùlín de kōngqì zhēn hǎo")}: «El aire de este bosque es muy bueno».</li>
        <li>${zh("叶子很漂亮，风景也不错", "yèzi hěn piàoliang, fēngjǐng yě búcuò")}: «Las hojas son bonitas y el paisaje tampoco está mal».</li>
        <li>${zh("大自然真大", "dàzìrán zhēn dà")}: «La naturaleza es enorme».</li>
      </ul>
      ${tabla([
        ['大自然', 'dàzìrán', 'naturaleza'], ['环保', 'huánbǎo', 'protección del ambiente; ecológico'], ['空气', 'kōngqì', 'aire'], ['树林', 'shùlín', 'bosque pequeño, arboleda'], ['叶子', 'yèzi', 'hoja (de planta)'],
        ['风景', 'fēngjǐng', 'paisaje'], ['塑料', 'sùliào', 'plástico'], ['节约', 'jiéyuē', 'ahorrar, economizar'], ['至少', 'zhìshǎo', 'al menos'], ['尤其', 'yóuqí', 'sobre todo, especialmente'],
        ['却', 'què', 'sin embargo (marca un contraste)'], ['既', 'jì', 'tanto… como… (la segunda parte lleva otra palabra)'], ['大量', 'dàliàng', 'gran cantidad de'], ['产生', 'chǎnshēng', 'producir, generar'], ['减轻', 'jiǎnqīng', 'reducir, aliviar'],
      ])}
      <h3>¿Cómo dices «tanto… como…»?</h3>
      <p>Oxford explica que ${zh("既", "jì")}…${zh("也", "yě")}… significa «tanto… como…», que las dos partes suelen ser paralelas y que ${zh("既", "jì")} y ${zh("也", "yě")} van antes de verbos o de verbos de estado: ${zh("在树林里，我们既能休息，也能运动", "zài shùlín lǐ, wǒmen jì néng xiūxi, yě néng yùndòng")}, «en el bosque podemos tanto descansar como hacer deporte». También se puede negar dos veces: ${zh("既不", "jì bù")}…${zh("也不", "yě bù")}…. AllSet, una fuente de apoyo no universitaria, muestra que ${zh("既", "jì")} también se combina con ${zh("又", "yòu")}: ${zh("这个树林既大又漂亮", "zhège shùlín jì dà yòu piàoliang")}, «este bosque es grande y bonito». Con ${zh("也", "yě")} se usa sobre todo con verbos. Y ${zh("又", "yòu")}…${zh("又", "yòu")}…, como viste en «Escribir mensajes cortos en caracteres», juntaba dos adjetivos y no admitía ${zh("很", "hěn")}.</p>
      <h3>¿Cómo dices «para que»?</h3>
      <p>AllSet explica que ${zh("好", "hǎo")} delante de un grupo verbal puede significar «para; a fin de» y expresa propósito. La forma es: una acción, una coma, ${zh("好", "hǎo")} y el propósito: ${zh("请你早点来，好一起去树林", "qǐng nǐ zǎo diǎn lái, hǎo yìqǐ qù shùlín")}, «ven un poco más temprano, para que vayamos juntos al bosque».</p>
      <h3>¿Cómo dices «al menos»?</h3>
      <p>Dartmouth y MIT glosan ${zh("至少", "zhìshǎo")} como adverbio, «al menos» o «como mínimo». MIT lo muestra antes del grupo con ${zh("在", "zài")} y antes del verbo negado. Como simplificación de la lección: ${zh("我家每个星期至少使用五个塑料袋子", "wǒ jiā měi gè xīngqī zhìshǎo shǐyòng wǔ gè sùliào dàizi")}, «en mi casa usamos al menos cinco bolsas de plástico cada semana». Esta gráfica tiene datos de ejemplo, no reales:</p>
      ${BOLSAS()}
      <p>Fíjate en que la familia pasó de 12 a 5 bolsas. Palabras como ${zh("减轻", "jiǎnqīng")}, «reducir», sirven para hablar de una cantidad que baja; aquí solo aparece en la tabla.</p>
      <h3>¿Cómo destacas una cosa del grupo?</h3>
      <p>Dartmouth dice que ${zh("尤其", "yóuqí")} es un adverbio que significa «particularmente» o «especialmente», y que destaca una parte de un grupo. Va delante de un verbo, o con ${zh("是", "shì")} delante de un nombre: ${zh("她喜欢大自然，尤其喜欢树林", "tā xǐhuan dàzìrán, yóuqí xǐhuan shùlín")}, «le gusta la naturaleza, sobre todo el bosque», y ${zh("这里的空气很好，尤其是早上", "zhèlǐ de kōngqì hěn hǎo, yóuqí shì zǎoshang")}, «aquí el aire es bueno, sobre todo por la mañana».</p>
      <h3>¿Cómo marcas un contraste?</h3>
      <p>Dartmouth muestra que ${zh("却", "què")} aparece en la segunda parte de una oración, después del sujeto, y que suele acompañar a ${zh("虽然", "suīrán")}: ${zh("这个树林虽然不大，风景却很漂亮", "zhège shùlín suīrán bú dà, fēngjǐng què hěn piàoliang")}, «aunque este bosque no es grande, el paisaje es muy bonito».</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("却", "què")} antes del sujeto de la segunda parte, como ${zh("却风景很漂亮", "què fēngjǐng hěn piàoliang")}. Va justo antes del verbo o adjetivo, después del sujeto.</p>`,
    ejemplo: `
      <p>Ana quiere decir: «Este bosque no es grande, pero el paisaje es muy bonito, y aquí podemos descansar y hacer deporte».</p>
      <ol class="pasos-ej">
        <li>Empieza por el contraste. Con ${zh("虽然", "suīrán")} dices lo que no es: ${zh("这个树林虽然不大", "zhège shùlín suīrán bú dà")}.</li>
        <li>Añade la segunda parte con ${zh("却", "què")} después del sujeto: ${zh("风景却很漂亮", "fēngjǐng què hěn piàoliang")}.</li>
        <li>Para las dos cosas que puedes hacer, usa ${zh("既", "jì")}…${zh("也", "yě")}…: ${zh("我们既能休息，也能运动", "wǒmen jì néng xiūxi, yě néng yùndòng")}.</li>
        <li>Junta todo con comas.</li>
      </ol>
      <p>Para comprobar, mira que ${zh("却", "què")} esté después del sujeto y que ${zh("既", "jì")} y ${zh("也", "yě")} lleven verbos del mismo tipo. Resultado: <span class="resultado">${zh("这个树林虽然不大，风景却很漂亮，我们既能休息，也能运动", "zhège shùlín suīrán bú dà, fēngjǐng què hěn piàoliang, wǒmen jì néng xiūxi, yě néng yùndòng")} = «aunque el bosque no es grande, el paisaje es muy bonito; podemos tanto descansar como hacer deporte»</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir ${zh("我们既能休息，能运动", "wǒmen jì néng xiūxi, néng yùndòng")}. Falta ${zh("也", "yě")} o ${zh("又", "yòu")} en la segunda parte.</p>`,
    vidaReal: `
      <p>Estas formas sirven cuando hablas de la naturaleza y de cuidar el lugar donde vives:</p>
      <ul>
        <li>Describir un paseo diciendo qué te gustó sobre todo.</li>
        <li>Decir cuántas bolsas de plástico usas al menos en una semana.</li>
        <li>Explicar para qué haces algo, por ejemplo traer tu propia bolsa.</li>
        <li>Contrastar algo pequeño con algo muy bonito.</li>
        <li>Entender un cartel o un aviso sobre cuidar el aire y el agua.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Quieres decir «en el bosque podemos tanto descansar como hacer deporte». ¿Qué frase está bien?</p>',
        opciones: [zh('我们既休息，运动', 'wǒmen jì xiūxi, yùndòng'), zh('我们休息既，运动也', 'wǒmen xiūxi jì, yùndòng yě'), zh('我们也能休息，既能运动', 'wǒmen yě néng xiūxi, jì néng yùndòng'), zh('我们既能休息，也能运动', 'wǒmen jì néng xiūxi, yě néng yùndòng')], correcta: 3,
        pista: `<p>${zh("既", "jì")} abre la primera parte y ${zh("也", "yě")} abre la segunda, las dos antes del verbo.</p>`,
        solucion: `<p>${zh("我们既能休息，也能运动", "wǒmen jì néng xiūxi, yě néng yùndòng")}: dos partes paralelas, una con ${zh("既", "jì")} y otra con ${zh("也", "yě")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «aunque este bosque no es grande, el paisaje es muy bonito».</p>',
        respuesta: ['这个树林', '虽然', '不大', '风景', '却', '很漂亮'], alternativas: [['虽然', '这个树林', '不大', '风景', '却', '很漂亮']], pinyin: ['zhège shùlín', 'suīrán', 'bú dà', 'fēngjǐng', 'què', 'hěn piàoliang'], lang: 'zh-Hans',
        pista: `<p>${zh("却", "què")} va en la segunda parte, después de ${zh("风景", "fēngjǐng")}.</p>`,
        solucion: `<p>${zh("这个树林虽然不大，风景却很漂亮", "zhège shùlín suīrán bú dà, fēngjǐng què hěn piàoliang")}: ${zh("虽然", "suīrán")} en la primera parte y ${zh("却", "què")} después del sujeto de la segunda.</p>` },
      { tipo: 'opciones', enunciado: `<p>Mira la gráfica de ejemplo. ¿En qué semana usó menos bolsas la familia?</p>${BOLSAS()}`,
        opciones: ['En la semana 1', 'En la semana 2', 'En la semana 3', 'En las tres usó lo mismo'], correcta: 2,
        pista: '<p>Busca la barra más baja.</p>',
        solucion: '<p>La semana 3 tiene la barra más baja, con 5 bolsas. Son datos de ejemplo, no reales.</p>' },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("请你早点来，好一起去树林", "qǐng nǐ zǎo diǎn lái, hǎo yìqǐ qù shùlín")}?</p>`,
        opciones: ['Ven temprano, para que vayamos juntos al bosque', 'Ven tarde, porque el bosque está lejos', 'No vengas, iré solo al bosque', 'El bosque está bien porque llegaste temprano'], correcta: 0,
        pista: `<p>Después de la coma, ${zh("好", "hǎo")} introduce el propósito.</p>`,
        solucion: `<p>${zh("好一起去树林", "hǎo yìqǐ qù shùlín")} es el propósito: «para que vayamos juntos al bosque».</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("她喜欢大自然，尤其喜欢树林", "tā xǐhuan dàzìrán, yóuqí xǐhuan shùlín")}?</p>`,
        opciones: ['No le gusta la naturaleza ni el bosque', 'Le gusta el bosque, pero no la naturaleza', 'Le gusta la naturaleza, sobre todo el bosque', 'Le gusta la naturaleza al menos una vez'], correcta: 2,
        pista: `<p>${zh("尤其", "yóuqí")} destaca una parte del grupo: «sobre todo».</p>`,
        solucion: `<p>${zh("尤其", "yóuqí")} marca lo que más le gusta dentro de la naturaleza: el bosque.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("塑料", "sùliào")}.</p>`,
        respuestas: ['plastico', 'el plastico', 'plasticos'],
        pista: '<p>Con este material se hacen muchas bolsas y botellas.</p>',
        solucion: `<p>${zh("塑料", "sùliào")} es «plástico».</p>` },
    ],
    fuentes: [SILABO, OXFORD_PRENSA, ALLSET_JI, CHINGRAM_YOUYOU, ALLSET_HAO, DART_13_ZS, MIT, DART_5_YOUQI, DART_1, DART_23],
  });

  L('Ciencia y tecnología', {
    objetivo: `Hablar del futuro con ${zh("将", "jiāng")} y ${zh("将要", "jiāngyào")}, decir «solo» con ${zh("仅仅", "jǐnjǐn")} y reconocer ${zh("作为", "zuòwéi")} y ${zh("确实", "quèshí")} al leer sobre ciencia.`,
    explicacion: `
      <p>Dos compañeros miran un cartel sobre un proyecto de la escuela. Las frases de ejemplo son de la lección.</p>
      <ul>
        <li>${zh("这个科学研究很有意思", "zhège kēxué yánjiū hěn yǒu yìsi")}: «Este estudio científico es muy interesante».</li>
        <li>${zh("我们将要进行一个新的研究", "wǒmen jiāngyào jìnxíng yī gè xīn de yánjiū")}: «Vamos a llevar a cabo un estudio nuevo».</li>
        <li>${zh("老师提供了很多知识", "lǎoshī tígōng le hěn duō zhīshi")}: «El maestro ofreció muchos conocimientos».</li>
      </ul>
      ${tabla([
        ['科学', 'kēxué', 'ciencia; científico'], ['研究', 'yánjiū', 'investigar; estudio'], ['作为', 'zuòwéi', 'como (en calidad de); actuar como'], ['将来', 'jiānglái', 'futuro, en el futuro'], ['将要', 'jiāngyào', 'estar por, ir a (formal)'],
        ['仅仅', 'jǐnjǐn', 'solo, nada más que'], ['确实', 'quèshí', 'de verdad, en efecto'], ['使用', 'shǐyòng', 'usar, emplear'], ['提供', 'tígōng', 'ofrecer, proporcionar'], ['方式', 'fāngshì', 'manera, forma'],
        ['过程', 'guòchéng', 'proceso'], ['进行', 'jìnxíng', 'llevar a cabo, realizar'], ['作用', 'zuòyòng', 'función, efecto'], ['基础', 'jīchǔ', 'base, fundamento'], ['知识', 'zhīshi', 'conocimiento'],
      ])}
      <h3>¿Cómo hablas de algo que va a pasar?</h3>
      <p>Para el futuro ya conoces ${zh("会", "huì")} y ${zh("要", "yào")}. AllSet, una fuente de apoyo no universitaria, explica que ${zh("将", "jiāng")} denota algo que ocurrirá pronto, parecido a ${zh("会", "huì")}, y que se usa sobre todo en contextos formales, como un aviso o una noticia. La forma es sujeto, ${zh("将", "jiāng")}, ${zh("将要", "jiāngyào")} o ${zh("将会", "jiānghuì")}, y el verbo; juntarlo con ${zh("会", "huì")} o ${zh("要", "yào")} casi no cambia el sentido. Por ejemplo, ${zh("新的科学课程将在下个星期开始", "xīn de kēxué kèchéng jiāng zài xià gè xīngqī kāishǐ")} es «el nuevo curso de ciencia comenzará la próxima semana», y ${zh("新课程将要开始了", "xīn kèchéng jiāngyào kāishǐ le")} es «el nuevo curso está por comenzar». Ojo con ${zh("将来", "jiānglái")}: según el sílabo es un nombre, «el futuro», y no un adverbio como ${zh("将", "jiāng")}. Se dice ${zh("我将来想研究科学", "wǒ jiānglái xiǎng yánjiū kēxué")}, «en el futuro quiero estudiar ciencia».</p>
      <h3>¿Cómo dices «solo»?</h3>
      <p>Cuando quieres decir que algo es poco o que no hay más, el sílabo ofrece ${zh("仅仅", "jǐnjǐn")}. AllSet la muestra antes de ${zh("是", "shì")} o antes del verbo, y cierra su ejemplo con otra palabra que aquí no estudiamos. Como simplificación de la lección, sirven estas dos frases: ${zh("这仅仅是一个小研究", "zhè jǐnjǐn shì yī gè xiǎo yánjiū")}, «esto es solo un pequeño estudio», y ${zh("我仅仅知道一点儿", "wǒ jǐnjǐn zhīdào yīdiǎnr")}, «solo sé un poquito». La fuente trae ejemplos, no una regla.</p>
      <h3>Dos palabras para reconocer</h3>
      <p>El sílabo pone ${zh("作为", "zuòwéi")} entre las preposiciones y ${zh("确实", "quèshí")} entre los adverbios. Dartmouth glosa ${zh("作为", "zuòwéi")} como «como» y la usa al inicio de la frase: ${zh("作为老师，她知道很多知识", "zuòwéi lǎoshī, tā zhīdào hěn duō zhīshi")}, «como docente, sabe mucho». Dartmouth glosa ${zh("确实", "quèshí")} como adverbio «de verdad» y lo muestra antes de ${zh("是", "shì")}. Una frase nuestra: ${zh("这个研究确实很有意思", "zhège yánjiū quèshí hěn yǒu yìsi")}, «este estudio de verdad es muy interesante». Son dos palabras para reconocer, sin más reglas.</p>
      <h3>Palabras de la ciencia en acción</h3>
      <p>Las demás palabras de la tabla se aprenden con una frase. Mira cómo suenan: ${zh("他们使用新的方式学习科学", "tāmen shǐyòng xīn de fāngshì xuéxí kēxué")}, «usan una forma nueva de estudiar ciencia»; ${zh("这个过程很长", "zhège guòchéng hěn cháng")}, «este proceso es largo»; ${zh("想学好科学要有好的基础", "xiǎng xuéhǎo kēxué yào yǒu hǎo de jīchǔ")}, «para aprender bien ciencia hace falta una buena base»; y ${zh("手机的作用很大", "shǒujī de zuòyòng hěn dà")}, «el teléfono tiene una gran función». Son solo ejemplos de uso, sin una regla extra.</p>
      <p>El sílabo lista también oraciones condensadas, dos partes pegadas sin conector, como ${zh("不", "bù")}…${zh("也", "yě")}…. Una frase nuestra: ${zh("不说也知道", "bù shuō yě zhīdào")}, «aunque no lo digas, se sabe». Aquí solo la mencionamos.</p>
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("将", "jiāng")} en una charla muy casual. AllSet dice que es de contexto formal, parecido a ${zh("会", "huì")}; entre amigos suena más natural ${zh("会", "huì")}. Y ${zh("不", "bù")} y ${zh("一", "yī")} se escriben con su tono original; al hablar cambian (unidad 9).</p>`,
    ejemplo: `
      <p>Tomás lee un aviso y quiere contarle a un amigo: «El nuevo curso de ciencia comenzará la próxima semana y yo solo sé un poquito».</p>
      <ol class="pasos-ej">
        <li>Parte de la idea sencilla: ${zh("新的科学课程开始", "xīn de kēxué kèchéng kāishǐ")}, «el nuevo curso de ciencia empieza».</li>
        <li>Como es algo que pasará pronto, pon ${zh("将", "jiāng")} antes del verbo, con el momento en medio: ${zh("新的科学课程将在下个星期开始", "xīn de kēxué kèchéng jiāng zài xià gè xīngqī kāishǐ")}.</li>
        <li>Ahora la segunda parte. «Solo sé un poquito» lleva ${zh("仅仅", "jǐnjǐn")} antes del verbo: ${zh("我仅仅知道一点儿", "wǒ jǐnjǐn zhīdào yīdiǎnr")}.</li>
        <li>Junta las dos partes con una coma.</li>
      </ol>
      <p>Para comprobar, mira que ${zh("将", "jiāng")} esté antes del verbo ${zh("开始", "kāishǐ")} y que ${zh("仅仅", "jǐnjǐn")} esté antes de ${zh("知道", "zhīdào")}. Resultado: <span class="resultado">${zh("新的科学课程将在下个星期开始，我仅仅知道一点儿", "xīn de kēxué kèchéng jiāng zài xià gè xīngqī kāishǐ, wǒ jǐnjǐn zhīdào yīdiǎnr")} = «el nuevo curso de ciencia comenzará la próxima semana; yo solo sé un poquito»</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner ${zh("将", "jiāng")} después del verbo, como ${zh("开始将", "kāishǐ jiāng")}. Va antes: sujeto, ${zh("将", "jiāng")} y verbo.</p>`,
    vidaReal: `
      <p>Estas formas aparecen cuando lees o hablas de ciencia y de aparatos:</p>
      <ul>
        <li>Entender un aviso formal que dice que algo ocurrirá pronto.</li>
        <li>Decir que sabes poco de un tema, con una sola palabra.</li>
        <li>Leer una noticia sobre un estudio científico y reconocer sus palabras clave.</li>
        <li>Hablar de qué manera se usa un aparato y para qué sirve.</li>
        <li>Contar lo que quieres estudiar en el futuro.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("新课程将要开始了", "xīn kèchéng jiāngyào kāishǐ le")}?</p>`,
        opciones: ['El nuevo curso ya terminó', 'El nuevo curso está por comenzar', 'El nuevo curso es muy difícil', 'El nuevo curso ya no se ofrece'], correcta: 1,
        pista: `<p>${zh("将要", "jiāngyào")} habla de algo que va a pasar pronto.</p>`,
        solucion: `<p>${zh("将要", "jiāngyào")} + verbo es «estar por…»: el curso todavía no empezó, pero falta poco.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «solo sé un poquito».</p>',
        respuesta: ['我', '仅仅', '知道', '一点儿'], pinyin: ['wǒ', 'jǐnjǐn', 'zhīdào', 'yīdiǎnr'], lang: 'zh-Hans',
        pista: `<p>${zh("仅仅", "jǐnjǐn")} va antes del verbo.</p>`,
        solucion: `<p>${zh("我仅仅知道一点儿", "wǒ jǐnjǐn zhīdào yīdiǎnr")}: sujeto, ${zh("仅仅", "jǐnjǐn")}, verbo y la cantidad.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("作为老师，她知道很多知识", "zuòwéi lǎoshī, tā zhīdào hěn duō zhīshi")}?</p>`,
        opciones: ['Como docente, ella sabe mucho', 'Ella quiere ser docente', 'Ella aprende de su docente', 'Su docente sabe muy poco'], correcta: 0,
        pista: `<p>${zh("作为", "zuòwéi")} al inicio se lee «como».</p>`,
        solucion: `<p>${zh("作为老师", "zuòwéi lǎoshī")} es «como docente», y luego viene lo que ella sabe: ${zh("很多知识", "hěn duō zhīshi")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("这个研究确实很有意思", "zhège yánjiū quèshí hěn yǒu yìsi")}?</p>`,
        opciones: ['Este estudio tal vez es interesante', 'Este estudio fue muy corto', 'Este estudio es solo para maestros', 'Este estudio de verdad es muy interesante'], correcta: 3,
        pista: `<p>${zh("确实", "quèshí")} confirma lo que dices: «de verdad».</p>`,
        solucion: `<p>${zh("确实", "quèshí")} va antes de ${zh("很有意思", "hěn yǒu yìsi")} y subraya que es verdad: «de verdad es muy interesante».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("知识")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['zhī shi'],
        pista: '<p>La primera sílaba empieza alta y se mantiene; la segunda es muy corta y ligera.</p>',
        solucion: `<p>${zh("知识", "zhīshi")}: <strong>zhī shi</strong>, con la segunda sílaba en tono neutro.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("提供", "tígōng")}.</p>`,
        respuestas: ['ofrecer', 'proporcionar', 'dar', 'brindar', 'suministrar', 'aportar'],
        pista: '<p>Es poner algo a disposición de otra persona.</p>',
        solucion: `<p>${zh("提供", "tígōng")} es «ofrecer» o «proporcionar».</p>` },
    ],
    fuentes: [SILABO, ALLSET_JIANG, ALLSET_ERYI, DART_9_ZW, DART_15],
  });

  // Texto de repaso de la unidad: mezcla puntos de las lecciones 1, 4, 6 y 8. Con `trad` lleva la traducción al español.
  const TEXTO_FINAL = (trad) => {
    const filas = [
      ['我的网友给了我一个网址。', 'Wǒ de wǎngyǒu gěi le wǒ yī gè wǎngzhǐ.', 'Mi amigo de internet me dio una dirección web.'],
      ['按照这个网址，我找到了一个线上课程。', 'Ànzhào zhège wǎngzhǐ, wǒ zhǎodào le yī gè xiànshàng kèchéng.', 'Siguiendo esa dirección, encontré un curso en línea.'],
      ['我差点儿忘了报名，老师让我千万别忘了回复短信。', 'Wǒ chàdiǎnr wàng le bàomíng, lǎoshī ràng wǒ qiānwàn bié wàng le huífù duǎnxìn.', 'Casi olvido inscribirme, y el maestro me pidió que no olvidara, por favor, responder el mensaje.'],
      ['随着课程的进行，我的汉语一天比一天好。', 'Suízhe kèchéng de jìnxíng, wǒ de Hànyǔ yī tiān bǐ yī tiān hǎo.', 'A medida que avanza el curso, mi chino mejora cada día.'],
      ['我既喜欢线上的课，也喜欢线下的朋友。', 'Wǒ jì xǐhuan xiànshàng de kè, yě xǐhuan xiànxià de péngyou.', 'Me gustan tanto las clases en línea como los amigos en persona.'],
    ];
    return `<ul>${filas.map(([h, p, es]) => `<li>${zh(h, p)}${trad ? `: «${es}»` : ''}</li>`).join('')}</ul>`;
  };

  L('Internet y vida moderna', {
    objetivo: `Decir «casi» con ${zh("差点儿", "chàdiǎnr")}, «de sobra» con ${zh("有的是", "yǒudeshì")} y «no muy» con ${zh("不怎么", "bù zěnme")}, y repasar la unidad con un texto corto.`,
    explicacion: `
      <p>Dos amigos hablan de clases y mensajes. Las frases de ejemplo son de la lección.</p>
      <ul>
        <li>${zh("你是线上上课，还是线下上课", "nǐ shì xiànshàng shàngkè, háishi xiànxià shàngkè")}: «¿Tomas clases en línea o en persona?».</li>
        <li>${zh("你扫码就能看到网址", "nǐ sǎomǎ jiù néng kàndào wǎngzhǐ")}: «Escaneas el código y ves la dirección web».</li>
        <li>${zh("我会回复你的短信", "wǒ huì huífù nǐ de duǎnxìn")}: «Responderé tu mensaje».</li>
      </ul>
      ${tabla([
        ['差点儿', 'chàdiǎnr', 'casi'], ['重新', 'chóngxīn', 'de nuevo, desde el principio'], ['再次', 'zàicì', 'una vez más'], ['网友', 'wǎngyǒu', 'amigo de internet'], ['网址', 'wǎngzhǐ', 'dirección web'],
        ['线上', 'xiànshàng', 'en línea'], ['线下', 'xiànxià', 'fuera de línea, en persona'], ['扫码', 'sǎomǎ', 'escanear un código'], ['短信', 'duǎnxìn', 'mensaje de texto'], ['回复', 'huífù', 'responder'],
        ['转发', 'zhuǎnfā', 'reenviar'], ['广告', 'guǎnggào', 'anuncio'], ['播放', 'bōfàng', 'reproducir'], ['查找', 'cházhǎo', 'buscar'], ['打印', 'dǎyìn', 'imprimir'],
      ])}
      <h3>¿Cómo dices «casi»?</h3>
      <p>AllSet, una fuente de apoyo no universitaria, explica que para decir que algo malo casi ocurrió, pero no ocurrió, se pone ${zh("差点", "chàdiǎn")} antes del verbo, y que ${zh("差点", "chàdiǎn")} y ${zh("差点儿", "chàdiǎnr")} significan lo mismo. Al final puede ir ${zh("了", "le")}: ${zh("我差点儿忘了回复短信", "wǒ chàdiǎnr wàng le huífù duǎnxìn")}, «casi olvido responder el mensaje». Si el resultado es algo que deseas, ${zh("差点儿没", "chàdiǎnr méi")} quiere decir «casi no»: ${zh("我差点儿没看到你的短信", "wǒ chàdiǎnr méi kàndào nǐ de duǎnxìn")}, «casi no vi tu mensaje». Y con un resultado que no deseas, ${zh("差点", "chàdiǎn")} y ${zh("差点没", "chàdiǎn méi")} dicen lo mismo.</p>
      <h3>¿Cómo dices «de sobra»?</h3>
      <p>AllSet dice que ${zh("有的是", "yǒudeshì")}, como frase única, indica una cantidad muy grande y a veces exagera. La forma es sujeto, ${zh("有的是", "yǒudeshì")} y un nombre, y el nombre puede ir al principio: ${zh("我有的是时间", "wǒ yǒudeshì shíjiān")}, «tengo tiempo de sobra», y ${zh("这样的广告，线上有的是", "zhèyàng de guǎnggào, xiànshàng yǒudeshì")}, «anuncios así, en línea hay de sobra». No se puede negar directamente: para decir lo contrario se usa ${zh("没有很多", "méiyǒu hěn duō")}.</p>
      <h3>¿Cómo dices «no muy»?</h3>
      <p>MIT lo muestra con ${zh("不怎么冷", "bù zěnme lěng")}, «no tan frío», y también después de ${zh("也", "yě")} en un ejemplo sobre comida. Va antes del adjetivo. Como simplificación de la lección: ${zh("这个广告不怎么好看", "zhège guǎnggào bù zěnme hǎokàn")}, «este anuncio no es muy bonito». Las fuentes traen ejemplos, no una regla.</p>
      <h3>«De nuevo» y «una vez más»</h3>
      <p>MIT glosa ${zh("重新", "chóngxīn")} como adverbio, «de nuevo, desde el principio», y lo pone antes del verbo, después del sujeto: ${zh("我重新打印了表格", "wǒ chóngxīn dǎyìn le biǎogé")}, «volví a imprimir el formulario». El sílabo lista ${zh("再次", "zàicì")} junto a ${zh("重新", "chóngxīn")}; la ficha no trae una regla que los distinga, así que aquí solo se dan sus significados. El sílabo lista además ${zh("说不定", "shuōbudìng")} y ${zh("就是说", "jiùshì shuō")}, que solo mencionamos.</p>
      <h3>Un texto para repasar la unidad</h3>
      <p>Este texto corto mezcla puntos de varias lecciones: ${zh("按照", "ànzhào")} y ${zh("千万", "qiānwàn")} (trámites), ${zh("随着", "suízhe")} y ${zh("一天比一天", "yī tiān bǐ yī tiān")} (familia y crecer), ${zh("既", "jì")}…${zh("也", "yě")}… (naturaleza) y ${zh("差点儿", "chàdiǎnr")} (esta lección). Léelo y responde las preguntas de abajo.</p>
      ${TEXTO_FINAL(true)}
      <p class="nota"><strong>Trampa común:</strong> creer que ${zh("没", "méi")} siempre cambia el sentido de ${zh("差点儿", "chàdiǎnr")}. Con un resultado que no deseas, ${zh("差点", "chàdiǎn")} y ${zh("差点没", "chàdiǎn méi")} dicen lo mismo.</p>`,
    ejemplo: `
      <p>Mei quiere decir: «Casi no vi tu mensaje; tengo tiempo de sobra para responder».</p>
      <ol class="pasos-ej">
        <li>Piensa en lo principal: ${zh("看到你的短信", "kàndào nǐ de duǎnxìn")}, «ver tu mensaje».</li>
        <li>Ver el mensaje era lo que ella quería. Por eso lleva ${zh("差点儿没", "chàdiǎnr méi")} antes del verbo: ${zh("我差点儿没看到你的短信", "wǒ chàdiǎnr méi kàndào nǐ de duǎnxìn")}.</li>
        <li>Para la segunda parte, usa ${zh("有的是", "yǒudeshì")} con el nombre detrás: ${zh("我有的是时间", "wǒ yǒudeshì shíjiān")}.</li>
        <li>Junta las dos partes con una coma.</li>
      </ol>
      <p>Para comprobar, mira que ${zh("差点儿没", "chàdiǎnr méi")} esté antes del verbo y que ${zh("有的是", "yǒudeshì")} no lleve negación. Resultado: <span class="resultado">${zh("我差点儿没看到你的短信，我有的是时间", "wǒ chàdiǎnr méi kàndào nǐ de duǎnxìn, wǒ yǒudeshì shíjiān")} = «casi no vi tu mensaje; tengo tiempo de sobra»</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar ${zh("没", "méi")} cuando el resultado es lo que deseabas. ${zh("我差点儿看到你的短信", "wǒ chàdiǎnr kàndào nǐ de duǎnxìn")} no dice «casi no la vi»; para eso va ${zh("没", "méi")}.</p>`,
    vidaReal: `
      <p>Estas formas aparecen cuando hablas de internet y de mensajes:</p>
      <ul>
        <li>Contar que casi olvidaste responder un mensaje.</li>
        <li>Decir que hay muchísimos anuncios o videos de un tipo.</li>
        <li>Opinar que algo en línea no te gusta mucho.</li>
        <li>Entender una dirección web o un código que te mandan.</li>
        <li>Leer un texto breve sobre un curso en línea y responder preguntas sobre él.</li>
        <li>Pedir que te reenvíen o impriman un documento que necesitas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Lee el texto y responde: ¿cómo encontró el curso quien escribe?</p>${TEXTO_FINAL(false)}`,
        opciones: ['Se lo contó el maestro en persona', 'Lo vio en un anuncio de la calle', 'Siguió la dirección web que le dio un amigo de internet', 'Lo encontró en un libro'], correcta: 2,
        pista: `<p>Busca la frase con ${zh("按照", "ànzhào")}: ¿según qué lo encontró?</p>`,
        solucion: `<p>${zh("按照这个网址，我找到了一个线上课程", "ànzhào zhège wǎngzhǐ, wǒ zhǎodào le yī gè xiànshàng kèchéng")}: siguió la dirección web que le dio su amigo.</p>` },
      { tipo: 'opciones', enunciado: `<p>Lee el texto y responde: ¿qué casi pasó?</p>${TEXTO_FINAL(false)}`,
        opciones: ['Casi se olvida de inscribirse', 'Casi llega tarde a clase', 'Casi pierde su teléfono', 'Casi no encuentra la dirección'], correcta: 0,
        pista: `<p>Busca ${zh("差点儿", "chàdiǎnr")} en el texto.</p>`,
        solucion: `<p>${zh("我差点儿忘了报名", "wǒ chàdiǎnr wàng le bàomíng")}: casi olvidó inscribirse, pero no lo olvidó.</p>` },
      { tipo: 'opciones', enunciado: `<p>Lee el texto y responde: ¿qué pasó mientras avanzaba el curso?</p>${TEXTO_FINAL(false)}`,
        opciones: ['Dejó el curso', 'El curso se hizo más corto', 'Cambió de maestro', 'Su chino mejoró cada día'], correcta: 3,
        pista: `<p>Busca ${zh("随着", "suízhe")} al inicio de una frase.</p>`,
        solucion: `<p>${zh("随着课程的进行，我的汉语一天比一天好", "suízhe kèchéng de jìnxíng, wǒ de Hànyǔ yī tiān bǐ yī tiān hǎo")}: su chino mejora cada día.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «casi olvido responder el mensaje».</p>',
        respuesta: ['我', '差点儿', '忘了', '回复', '短信'], pinyin: ['wǒ', 'chàdiǎnr', 'wàng le', 'huífù', 'duǎnxìn'], lang: 'zh-Hans',
        pista: `<p>${zh("差点儿", "chàdiǎnr")} va antes del verbo ${zh("忘了", "wàng le")}.</p>`,
        solucion: `<p>${zh("我差点儿忘了回复短信", "wǒ chàdiǎnr wàng le huífù duǎnxìn")}: sujeto, ${zh("差点儿", "chàdiǎnr")}, verbo y lo que olvidaste.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("今天不怎么冷", "jīntiān bù zěnme lěng")}?</p>`,
        opciones: ['Hoy hace mucho frío', 'Hoy no hace mucho frío', 'Hoy hace frío solo por la tarde', 'Hoy no sé qué tiempo hace'], correcta: 1,
        pista: `<p>${zh("不怎么", "bù zěnme")} va antes del adjetivo y lo suaviza.</p>`,
        solucion: `<p>${zh("不怎么冷", "bù zěnme lěng")} es «no tan frío»: hay frío, pero poco.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("广告", "guǎnggào")}.</p>`,
        respuestas: ['anuncio', 'publicidad', 'propaganda', 'un anuncio', 'el anuncio', 'aviso'],
        pista: '<p>Es lo que aparece entre videos o en la calle para vender algo.</p>',
        solucion: `<p>${zh("广告", "guǎnggào")} es «anuncio» o «publicidad».</p>` },
    ],
    fuentes: [SILABO, ALLSET_CHADIAN, ALLSET_CHADIAN_MEI, ALLSET_YOUDESHI, MIT],
  });
})();
