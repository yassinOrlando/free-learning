// Mandarín · Unidad 3: HSK 1 · Vida diaria.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Todo carácter chino sale de zh(). Las frases de ejemplo («…») son de la lección; solo las palabras vienen del sílabo.
// Máximo 6 grabaciones (audio/zh/) por lección, solo de palabras de la tabla; el resto usa la voz del sistema.
(function () {
  const G = window.grafica;
  const zh = window.zh;
  const L = (titulo, datos) => window.registrarLeccion('mandarin', titulo, datos);
  // Fila de vocabulario: palabra con su botón (y grabación si hay) y significado.
  const fila = (hanzi, pinyin, es, archivo) => `<tr><td>${zh(hanzi, pinyin, { audio: archivo ? 'audio/zh/' + archivo : undefined })}</td><td>${es}</td></tr>`;
  const tabla = (filas) => `<div class="tabla-wrap"><table><tr><th scope="col">Palabra</th><th scope="col">Significado</th></tr>${filas.map((f) => fila(...f)).join('')}</table></div>`;
  const a = (archivo) => 'audio/zh/' + archivo;
  const txt = (x, y, texto) => ({ tipo: 'texto', x, y, texto });
  const lin = (desde, hasta) => ({ tipo: 'linea', desde, hasta });

  const SILABO = { nombre: 'Centro de Educación y Cooperación Lingüística (China), «HSK 考试大纲», sílabo del HSK 3.0 (2025)', url: 'https://hsk.cn-bj.ufileos.com/3.0/新版HSK考试大纲1219.pdf' };
  const AUDIO = { nombre: 'Grabaciones: Wei Gao y Vion Nicolas, Proyecto Shtooka, en Wikimedia Commons (CC BY 2.0 FR)', url: 'https://commons.wikimedia.org/wiki/File:Zh-dà.ogg' };
  const YUE = { nombre: 'Grabaciones: Yue Tan, Proyecto Shtooka, en Wikimedia Commons (CC BY-SA 3.0 US)', url: 'https://commons.wikimedia.org/wiki/File:Zh-má.ogg' };
  const XUDONG = { nombre: 'Grabación: Xudong Yang, Proyecto Shtooka, en Wikimedia Commons (CC BY 2.0)', url: 'https://commons.wikimedia.org/wiki/File:Zh-zhī.ogg' };
  const CHINGRAM = (ruta, nombre) => ({ nombre: `Universidad Palacký de Olomouc (Chequia) y socios, ChinGram: ${nombre} (en inglés)`, url: `https://chingram.upol.cz/grammar/${ruta}` });
  const CHIN_FECHAS = CHINGRAM('dates-and-times', 'Dates and times');
  const CHIN_HE = CHINGRAM('conjunction-he-%e5%92%8c-and-2', "Conjunction hé 和 'and'");
  const CHIN_YOU = CHINGRAM('verb-you-%e6%9c%89-to-have', 'Verb yǒu 有 (to have)');
  const CHIN_YOU_HAY = CHINGRAM('verb-you-%e6%9c%89-there-is-there-are', 'Verb yǒu 有 (there is, there are)');
  const CHIN_MEI = CHINGRAM('the-negation-adverb-mei-%e6%b2%a1-%e6%b2%92%e3%80%81meiyou-%e6%b2%a1%e6%9c%89-%e6%b2%92%e6%9c%89-not', 'The negation adverb méi 没, méiyǒu 没有');
  const CHIN_CLAS = CHINGRAM('measure-words-nouns', 'Measure words - nouns');
  const CHIN_DEM = CHINGRAM('demonstrative-pronouns-%e8%bf%99-%e9%80%99-%e9%82%a3-%e8%bf%99%e4%ba%9b-%e9%80%99%e4%ba%9b-%e9%82%a3%e4%ba%9b', 'Demonstrative pronouns 这, 那, 这些, 那些');
  const KAP = (ruta, nombre) => ({ nombre: `Kapiolani Community College, Univ. de Hawái (EE. UU.), CHN101 Elementary Mandarin I Textbook: ${nombre} (en inglés)`, url: `https://human.libretexts.org/Courses/Kapiolani_Community_College/CHN101%3A_Elementary_Mandarin_I_(Polley)/Elementary_Mandarin_I_Textbook/${ruta}` });
  const KAP_FECHAS = KAP('05%3A_Ordering_Food_and_Drink/5.09%3A_Lesson_4_Grammar_-_Structure_of_dates', 'Lesson 4 Grammar, Structure of dates');
  const KAP_HORAS = KAP('05%3A_Ordering_Food_and_Drink/5.10%3A_Lesson_4_Grammar_-_Structure_of_times', 'Lesson 4 Grammar, Structure of times');
  const KAP_ORDEN = KAP('05%3A_Ordering_Food_and_Drink/5.06%3A_Lesson_4_Grammar_-_Chinese_word_order_with_time_place_and_attributives', 'Lesson 4 Grammar, Chinese word order with time, place, and attributives');
  const KAP_YOU = KAP('04%3A_Family/4.09%3A_Lesson_3_Grammar_-_Expressing_possession_with__(you)', 'Lesson 3 Grammar, Expressing possession with 有');
  const KAP_GE = KAP('04%3A_Family/4.10%3A_Lesson_3_Grammar_-_Measure_Word__(ge)', 'Lesson 3 Grammar, Measure Word 个');
  const KAP_CONTAR = KAP('05%3A_Ordering_Food_and_Drink/5.08%3A_Lesson_4_Grammar_-_Measure_words_for_counting', 'Lesson 4 Grammar, Measure words for counting');
  const MSU = { nombre: 'Wenying Zhou, Universidad Estatal de Míchigan (EE. UU.), Elementary Chinese I: Lesson 2 Dialogue 2, Talking About Family Members (en inglés)', url: 'https://openbooks.lib.msu.edu/chs101/chapter/lesson-3b-talking-about-a-family-photo/' };
  const WKU = { nombre: 'Western Kentucky University (EE. UU.), Chinese 101, Lesson 4 (en inglés)', url: 'https://people.wku.edu/shizhen.gao/Chinese101/Lesson4' };
  const MIT = { nombre: 'MIT OpenCourseWare (EE. UU.), Julian Wheatley, Learning Chinese: A Foundation Course in Mandarin (2011, en inglés)', url: 'https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/res21g_003_s_11.pdf' };

  // Reloj de manecillas: hora h (1 a 12) y minutos m; el pinyin de la hora va debajo (sin caracteres chinos dentro del dibujo).
  const reloj = (h, m, pinyin, descripcion) => {
    const polar = (grados, largo) => [Math.round(largo * Math.sin((grados * Math.PI) / 180) * 100) / 100, Math.round(largo * Math.cos((grados * Math.PI) / 180) * 100) / 100];
    return G({
      x: [-1.5, 1.5], y: [-1.75, 1.5], proporcional: true, ejes: false, descripcion,
      figuras: [
        { tipo: 'circulo', x: 0, y: 0, r: 1 },
        txt(0, 1.2, '12'), txt(1.2, -0.08, '3'), txt(0, -1.3, '6'), txt(-1.2, -0.08, '9'),
        lin([0, 0], polar(((h % 12) + m / 60) * 30, 0.55)),
        lin([0, 0], polar(m * 6, 0.85)),
        txt(0, -1.65, pinyin),
      ],
    });
  };

  // ------------------------------------------------------------------
  L('La familia', {
    objetivo: `Nombrar a los hermanos, hijos y demás miembros de tu familia, distinguir mayor y menor, y unir dos personas con ${zh("和", "hé")}.`,
    explicacion: `
      <p>Casi siempre que conoces a alguien le cuentas de tu familia: quién vive contigo, si tienes hermanos. En mandarín esas palabras tienen una sorpresa que el español no tiene. Primero, las once palabras nuevas; ya conoces ${zh("爸爸", "bàba")} y ${zh("妈妈", "māma")} de otra lección.</p>
      ${tabla([
        ['家', 'jiā', 'casa, hogar, familia', 'jia1.m4a'], ['家人', 'jiārén', 'familiares, los de la familia'], ['哥哥', 'gēge', 'hermano mayor', 'gege1.m4a'], ['姐姐', 'jiějie', 'hermana mayor', 'jiejie3.m4a'],
        ['弟弟', 'dìdi', 'hermano menor', 'didi4.m4a'], ['妹妹', 'mèimei', 'hermana menor', 'meimei4.m4a'], ['儿子', 'érzi', 'hijo (varón)'], ['女儿', "nǚ'ér", 'hija'],
        ['孩子', 'háizi', 'niño o niña, hijo o hija'], ['和', 'hé', 'y (une personas o cosas)', 'he2.m4a'], ['爱', 'ài', 'amar, querer mucho'],
      ])}
      <h3>Hermano mayor, hermano menor</h3>
      <p>En español «hermano» sirve para el mayor y para el menor. En chino no: hay una palabra para cada uno. Dos universidades de EE. UU. (Míchigan y Kentucky) enseñan cuatro: hermano mayor, hermano menor, hermana mayor y hermana menor. Como simplificación de la lección: la edad va dentro de la palabra. Esa clase de palabra, que dice qué relación hay entre dos personas de una familia, es un <strong>parentesco</strong>. Por eso, al hablar de tu hermano, primero decides si es mayor o menor que tú; en español puedes dejarlo sin decir. Fíjate también en que cada palabra repite la sílaba y la segunda es suave: el sílabo la escribe sin marca de tono, como en el tono neutro de la unidad 1.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col"></th><th scope="col">Hombre</th><th scope="col">Mujer</th></tr>
        <tr><th scope="row">Mayor que tú</th><td>${zh("哥哥", "gēge")}</td><td>${zh("姐姐", "jiějie")}</td></tr>
        <tr><th scope="row">Menor que tú</th><td>${zh("弟弟", "dìdi")}</td><td>${zh("妹妹", "mèimei")}</td></tr>
      </table></div>
      ${G({
        x: [-6, 6], y: [0.2, 3.9], proporcional: true, ejes: false,
        descripcion: 'Árbol familiar. Arriba están el papá y la mamá, unidos por una línea corta. De ellos baja una barra hasta cinco hijos, de izquierda a derecha: hermano mayor, hermana mayor, yo, hermano menor y hermana menor.',
        figuras: [
          txt(-1.6, 3.5, 'bàba'), txt(-1.6, 3.0, 'papá'), txt(1.6, 3.5, 'māma'), txt(1.6, 3.0, 'mamá'),
          lin([-0.7, 3.4], [0.7, 3.4]), lin([0, 3.4], [0, 2.5]), lin([-4.8, 2.5], [4.8, 2.5]),
          ...[-4.8, -2.4, 0, 2.4, 4.8].map((x) => lin([x, 2.5], [x, 2.0])),
          txt(-4.8, 1.5, 'gēge'), txt(-4.8, 1.0, 'hermano'), txt(-4.8, 0.6, 'mayor'),
          txt(-2.4, 1.5, 'jiějie'), txt(-2.4, 1.0, 'hermana'), txt(-2.4, 0.6, 'mayor'),
          txt(0, 1.5, 'wǒ'), txt(0, 1.0, 'yo'),
          txt(2.4, 1.5, 'dìdi'), txt(2.4, 1.0, 'hermano'), txt(2.4, 0.6, 'menor'),
          txt(4.8, 1.5, 'mèimei'), txt(4.8, 1.0, 'hermana'), txt(4.8, 0.6, 'menor'),
        ],
      })}
      <h3>Hijos y casa</h3>
      <p>${zh("儿子", "érzi")} es el hijo varón y ${zh("女儿", "nǚ'ér")} la hija.
      Para decir «hijo» sin precisar si es niño o niña, o «niño» a secas, se usa ${zh("孩子", "háizi")}. ${zh("家", "jiā")} es la casa, el hogar y también la familia, y ${zh("家人", "jiārén")} son las personas de esa familia. Con ellos se arma fácil: ${zh("他是我儿子", "tā shì wǒ érzi")}, «él es mi hijo», y ${zh("她是我女儿", "tā shì wǒ nǚ'ér")}, «ella es mi hija». Como con ${zh("爸爸", "bàba")}, se puede decir ${zh("我家人", "wǒ jiārén")} sin ${zh("的", "de")}; eso lo viste en "Posesión con ${zh("的")}".</p>
      <h3>${zh("和", "hé")}: unir dos personas</h3>
      <p>${zh("和", "hé")} se coloca entre dos sustantivos, o entre dos grupos de sustantivos, y significa «y»: ${zh("哥哥和姐姐", "gēge hé jiějie")}. Según ChinGram, de la Universidad Palacký de Chequia, sirve para enumerar sustantivos o grupos nominales, no para unir oraciones enteras. Sirve igual con otras parejas de la tabla: ${zh("爸爸和妈妈", "bàba hé māma")}, ${zh("弟弟和妹妹", "dìdi hé mèimei")}. Pide su sitio entre los dos: nunca al principio ni al final de la lista.</p>
      <h3>Todo junto</h3>
      <p>Con ${zh("爱", "ài")} dices lo que sientes: ${zh("我爱我家人", "wǒ ài wǒ jiārén")} es «amo a mi familia». Un diálogo corto de la lección, con lo que ya sabes:</p>
      <ul>
        <li>${zh("这是我哥哥和我姐姐", "zhè shì wǒ gēge hé wǒ jiějie")}</li>
        <li>${zh("他们都是学生", "tāmen dōu shì xuésheng")}</li>
        <li>${zh("这是我弟弟，她是我妹妹", "zhè shì wǒ dìdi, tā shì wǒ mèimei")}</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("和", "hé")} para pegar dos frases completas, como en español «llueve y hace frío». Aquí solo une personas o cosas.</p>`,
    ejemplo: `
      <p>Las frases de ejemplo de la lección son nuestras, hechas con palabras ya vistas. Ana le enseña una foto a un amigo y presenta a su familia.</p>
      <ol class="pasos-ej">
        <li>Señala a un chico mayor que ella: ${zh("这是我哥哥", "zhè shì wǒ gēge")}. Dice «mi hermano mayor» sin ${zh("的", "de")}.</li>
        <li>Añade qué hace: ${zh("他是学生", "tā shì xuésheng")}. Es otra frase, por eso va aparte.</li>
        <li>Muestra su cariño: ${zh("我爱我家人", "wǒ ài wǒ jiārén")}.</li>
        <li>Une a sus padres con ${zh("和", "hé")}: ${zh("我爸爸和我妈妈都是老师", "wǒ bàba hé wǒ māma dōu shì lǎoshī")}.</li>
      </ol>
      <p>Comprueba: en la última frase ${zh("和", "hé")} está entre ${zh("我爸爸", "wǒ bàba")} y ${zh("我妈妈", "wǒ māma")}, dos personas, y ${zh("都", "dōu")} cierra antes del verbo. Resultado: <span class="resultado">${zh("我爸爸和我妈妈", "wǒ bàba hé wǒ māma")} = «mi papá y mi mamá»</span>.</p>
      <p class="nota"><strong>Error común:</strong> decir ${zh("我的哥哥", "wǒ de gēge")} siempre. Se entiende, pero con la familia cercana lo normal es omitir ${zh("的", "de")}.</p>`,
    vidaReal: `
      <p>Hablar de la familia es de lo primero que se hace al conocer a alguien:</p>
      <ul>
        <li>Preguntar a un amigo si tiene hermanos y entender si son mayores o menores.</li>
        <li>Contar quién vive contigo en casa.</li>
        <li>Presentar a tu familia en una videollamada con un compañero de otro país.</li>
        <li>Reconocer en una serie quién es quién cuando alguien dice «mi hermano mayor».</li>
        <li>Contar cuántos son en tu casa y a quién quieres.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Tu hermana es menor que tú. ¿Qué palabra usas para hablar de ella?</p>',
        opciones: [zh('姐姐', 'jiějie'), zh('妹妹', 'mèimei'), zh('哥哥', 'gēge'), zh('弟弟', 'dìdi')], correcta: 1,
        pista: '<p>Busca la casilla de mujer y menor en la tabla.</p>',
        solucion: `<p>${zh("妹妹", "mèimei")} es la hermana menor. ${zh("姐姐", "jiějie")} es la mayor.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «este es mi hermano mayor».</p>',
        respuesta: ['这', '是', '我', '哥哥'], pinyin: ['zhè', 'shì', 'wǒ', 'gēge'], lang: 'zh-Hans',
        pista: '<p>Sin ' + zh("的") + ' porque es familia cercana.</p>',
        solucion: `<p>${zh("这是我哥哥", "zhè shì wǒ gēge")}: «esto es mi hermano mayor».</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «papá y mamá son profesores».</p>',
        respuesta: ['爸爸', '和', '妈妈', '都', '是', '老师'], pinyin: ['bàba', 'hé', 'māma', 'dōu', 'shì', 'lǎoshī'], lang: 'zh-Hans',
        pista: `<p>${zh("和", "hé")} va entre los dos sustantivos y ${zh("都", "dōu")} antes del verbo.</p>`,
        solucion: `<p>${zh("爸爸和妈妈都是老师", "bàba hé māma dōu shì lǎoshī")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '弟弟', audio: a('didi4.m4a') },
        sinAudio: '<p>Se dice <strong>dìdi</strong>: la primera sílaba cae de golpe (cuarto tono) y la segunda es corta y suave.</p>',
        enunciado: '<p>Escucha la palabra. ¿Qué significa?</p>',
        opciones: ['Hermano menor', 'Hermana mayor', 'Hijo', 'Hermano mayor'], correcta: 0,
        pista: '<p>La palabra se repite dos veces y la segunda sílaba es suave.</p>',
        solucion: `<p>Se oye ${zh("弟弟", "dìdi")}, «hermano menor». ${zh("哥哥", "gēge")} es el mayor.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("妹妹", "mèimei")} con su marca de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['mèi mei'],
        pista: '<p>La primera sílaba cae (cuarto tono); la segunda no lleva marca.</p>',
        solucion: `<p>${zh("妹妹", "mèimei")}: <strong>mèi mei</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>¿Qué significa ${zh("孩子", "háizi")}? Escribe una palabra en español.</p>`,
        respuestas: ['niño', 'nino', 'niña', 'nina', 'hijo', 'hija', 'niño o niña', 'hijo o hija'],
        pista: '<p>Sirve para hablar de un hijo sin decir si es niño o niña.</p>',
        solucion: `<p>${zh("孩子", "háizi")} es «niño» o «hijo».</p>` },
    ],
    fuentes: [SILABO, AUDIO, MSU, WKU, CHIN_HE],
  });

  // ------------------------------------------------------------------
  L('Fechas y días de la semana', {
    objetivo: 'Decir una fecha completa, nombrar los meses y los días de la semana, y preguntar qué día es.',
    explicacion: `
      <p>En español dices «10 de octubre de 2026»: primero el día y al final el año. En chino la fecha va al revés, y casi todo se arma con números que ya conoces. Estas son las doce palabras nuevas.</p>
      ${tabla([
        ['年', 'nián', 'año', 'nian2.m4a'], ['月', 'yuè', 'mes', 'yue4.m4a'], ['日', 'rì', 'día del mes (en lo escrito)'], ['号', 'hào', 'día del mes (al hablar)', 'hao4.m4a'],
        ['星期', 'xīngqī', 'semana', 'xingqi11.m4a'], ['星期天', 'xīngqītiān', 'domingo'], ['星期日', 'xīngqīrì', 'domingo (más formal)'], ['今天', 'jīntiān', 'hoy', 'jintian11.m4a'],
        ['明天', 'míngtiān', 'mañana', 'mingtian21.m4a'], ['昨天', 'zuótiān', 'ayer'], ['今年', 'jīnnián', 'este año'], ['明年', 'míngnián', 'el año que viene'],
      ])}
      <h3>De lo grande a lo pequeño</h3>
      <p>Una <strong>fecha</strong> es el nombre de un día del calendario: su año, su mes y su día. Según ChinGram y un colegio comunitario de Hawái, en chino van del año al mes y al día, de lo más grande a lo más pequeño. Los números van antes de ${zh("年", "nián")}, ${zh("月", "yuè")} y ${zh("日", "rì")}. El año se lee dígito por dígito: 2026 es ${zh("二零二六年", "èr líng èr liù nián")}.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Pieza</th><th scope="col">En chino</th></tr>
        <tr><td>Año 2026</td><td>${zh("二零二六年", "èr líng èr liù nián")}</td></tr>
        <tr><td>Mes 10</td><td>${zh("十月", "shí yuè")}</td></tr>
        <tr><td>Día 10</td><td>${zh("十号", "shí hào")}</td></tr>
      </table></div>
      <p>Todo junto: ${zh("二零二六年十月十号", "èr líng èr liù nián shí yuè shí hào")}. Los meses son número y ${zh("月", "yuè")}: ${zh("七月", "qī yuè")}, julio. Esa regla general es simplificación de la lección: así ${zh("一月", "yī yuè")} es enero y ${zh("十二月", "shí'èr yuè")} es diciembre. Para el día del mes, al hablar se usa ${zh("号", "hào")} y por escrito ${zh("日", "rì")}.</p>
      <h3>Los días de la semana</h3>
      <p>De lunes a sábado se pone el número del uno al seis después de ${zh("星期", "xīngqī")}. El domingo es ${zh("星期日", "xīngqīrì")}, más formal, o ${zh("星期天", "xīngqītiān")}.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Día</th><th scope="col">En chino</th></tr>
        <tr><td>lunes</td><td>${zh("星期一", "xīngqīyī")}</td></tr><tr><td>martes</td><td>${zh("星期二", "xīngqī'èr")}</td></tr>
        <tr><td>miércoles</td><td>${zh("星期三", "xīngqīsān")}</td></tr><tr><td>jueves</td><td>${zh("星期四", "xīngqīsì")}</td></tr>
        <tr><td>viernes</td><td>${zh("星期五", "xīngqīwǔ")}</td></tr><tr><td>sábado</td><td>${zh("星期六", "xīngqīliù")}</td></tr>
        <tr><td>domingo</td><td>${zh("星期天", "xīngqītiān")}</td></tr>
      </table></div>
      <h3>Hoy, mañana, ayer</h3>
      <p>${zh("今天", "jīntiān")} es hoy, ${zh("明天", "míngtiān")} mañana y ${zh("昨天", "zuótiān")} ayer. ${zh("今年", "jīnnián")} y ${zh("明年", "míngnián")} funcionan igual con años. Para preguntar el día se usa ${zh("几", "jǐ")}, una palabra que pregunta por un número; la verás con calma en "Preguntar cantidades: ${zh("几")} y ${zh("多少")}". Va donde iría el número de la respuesta: ${zh("今天星期几", "jīntiān xīngqī jǐ")} se contesta ${zh("今天星期六", "jīntiān xīngqīliù")}. Como simplificación de la lección, con días y fechas aquí no ponemos ${zh("是", "shì")}.</p>
      <p>Si necesitas repasar los números, mira "Números del 0 al 100". Un truco: en chino casi no hay nombres que memorizar. Si sabes contar hasta doce y hasta seis, ya sabes todos los meses y casi todos los días de la semana. Solo el domingo y las palabras de hoy, mañana y ayer son nuevas.</p>
      <p>En una frase, ${zh("今天", "jīntiān")} y los demás nombres de tiempo se colocan después del sujeto, antes del verbo; en "La hora" verás esa regla con calma. Para las fechas, la lección escribe los números en caracteres, como ${zh("十", "shí")} y ${zh("六", "liù")}.</p>
      <p class="nota"><strong>Trampa común:</strong> decir el día antes que el mes, como en español. En chino la fecha empieza por lo grande.</p>`,
    ejemplo: `
      <p>Las frases de ejemplo son de la lección. Hoy es sábado 10 de octubre de 2026 y vamos a decirlo.</p>
      <ol class="pasos-ej">
        <li>Empieza por el año: ${zh("二零二六年", "èr líng èr liù nián")}, dígito por dígito.</li>
        <li>Sigue con el mes, que es número y ${zh("月", "yuè")}: ${zh("十月", "shí yuè")}.</li>
        <li>Termina con el día y ${zh("号", "hào")}, porque hablas: ${zh("十号", "shí hào")}.</li>
        <li>Para el día de la semana, ${zh("星期", "xīngqī")} y el seis del sábado: ${zh("今天星期六", "jīntiān xīngqīliù")}.</li>
        <li>Pregunta lo mismo a un amigo: ${zh("明天星期几", "míngtiān xīngqī jǐ")}. Él responde ${zh("明天星期天", "míngtiān xīngqītiān")}, domingo.</li>
      </ol>
      <p>Comprueba: la fecha va de año a día, y ${zh("星期六", "xīngqīliù")} lleva el seis. Resultado: <span class="resultado">${zh("十月十号", "shí yuè shí hào")} = «10 de octubre»</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir ${zh("六星期", "liù xīngqī")}. El número va después de ${zh("星期", "xīngqī")}.</p>`,
    vidaReal: `
      <p>Las fechas aparecen en cualquier lugar donde se organice algo:</p>
      <ul>
        <li>Entender una invitación o una cita con día y mes.</li>
        <li>Leer un calendario escolar o el horario de una clase en línea.</li>
        <li>Quedar con un amigo de otro país y preguntar qué día le queda bien.</li>
        <li>Ver cuándo cae tu cumpleaños en un calendario escrito en chino.</li>
        <li>Saber si una tienda abre el sábado o el domingo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «10 de octubre de 2026» (año, mes, día).</p>',
        respuesta: ['二零二六年', '十月', '十号'], pinyin: ['èr líng èr liù nián', 'shí yuè', 'shí hào'], lang: 'zh-Hans',
        pista: '<p>De lo más grande a lo más pequeño.</p>',
        solucion: `<p>${zh("二零二六年十月十号", "èr líng èr liù nián shí yuè shí hào")}: año, mes y día.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «¿qué día de la semana es hoy?».</p>',
        respuesta: ['今天', '星期', '几'], pinyin: ['jīntiān', 'xīngqī', 'jǐ'], lang: 'zh-Hans',
        pista: '<p>La palabra que pregunta va donde iría el número.</p>',
        solucion: `<p>${zh("今天星期几", "jīntiān xīngqī jǐ")}: «hoy, semana, ¿qué número?».</p>` },
      { tipo: 'numero', enunciado: `<p>¿Qué número de mes es ${zh("十二月", "shí'èr yuè")}? Escribe la cifra.</p>`, respuesta: 12,
        pista: '<p>Los meses son número y ' + zh("月") + '.</p>',
        solucion: `<p>${zh("十二月", "shí'èr yuè")}: 12, diciembre.</p>` },
      { tipo: 'opciones', enunciado: `<p>Mañana es ${zh("星期六", "xīngqīliù")}. ¿Qué día es hoy?</p>`,
        opciones: [zh('星期四', 'xīngqīsì'), zh('星期五', 'xīngqīwǔ'), zh('星期天', 'xīngqītiān'), zh('星期一', 'xīngqīyī')], correcta: 1,
        pista: '<p>Sábado es el seis; hoy es el día anterior.</p>',
        solucion: `<p>Si mañana es sábado (${zh("六", "liù")}), hoy es viernes: ${zh("星期五", "xīngqīwǔ")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '明天', audio: a('mingtian21.m4a') },
        sinAudio: '<p>Se dice <strong>míngtiān</strong>: la primera sílaba sube (segundo tono) y la segunda es alta y plana (primer tono).</p>',
        enunciado: '<p>Escucha la palabra. ¿Qué significa?</p>',
        opciones: ['Hoy', 'Ayer', 'Mañana', 'Este año'], correcta: 2,
        pista: '<p>Empieza subiendo y sigue alta y plana.</p>',
        solucion: `<p>Se oye ${zh("明天", "míngtiān")}, «mañana».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("今天", "jīntiān")} con sus marcas (separa las sílabas con un espacio).</p>`,
        respuestas: ['jīn tiān'],
        pista: '<p>Las dos sílabas son altas y planas (primer tono).</p>',
        solucion: `<p>${zh("今天", "jīntiān")}: <strong>jīn tiān</strong>.</p>` },
    ],
    fuentes: [SILABO, AUDIO, CHIN_FECHAS, KAP_FECHAS],
  });

  // ------------------------------------------------------------------
  L('La hora', {
    objetivo: 'Decir qué hora es, nombrar las partes del día y colocar la hora dentro de la frase.',
    explicacion: `
      <p>Para quedar con un amigo o ir a clase hay que saber decir la hora. En mandarín es sencilla: número y una palabra de medida. Estas son las doce palabras de la lección.</p>
      ${tabla([
        ['点', 'diǎn', 'en punto, hora', 'dian3.m4a'], ['分', 'fēn', 'minuto', 'fen1.m4a'], ['半', 'bàn', 'medio, y media', 'ban4.m4a'], ['现在', 'xiànzài', 'ahora', 'xianzai44.m4a'],
        ['早上', 'zǎoshang', 'la mañana, temprano'], ['上午', 'shàngwǔ', 'antes del mediodía', 'shangwu43.m4a'], ['中午', 'zhōngwǔ', 'mediodía'], ['下午', 'xiàwǔ', 'la tarde'],
        ['晚上', 'wǎnshang', 'la noche', 'wanshang3.m4a'], ['时候', 'shíhou', 'momento, tiempo'], ['两', 'liǎng', 'dos (ante medida)'], ['起床', 'qǐchuáng', 'levantarse'],
      ])}
      <h3>Número y ${zh("点", "diǎn")}</h3>
      <p>La hora en punto lleva un número y después ${zh("点", "diǎn")}, según ChinGram y un colegio de Hawái: ${zh("三点", "sān diǎn")}, las tres. Para la media hora se pone ${zh("半", "bàn")} justo después: ${zh("七点半", "qī diǎn bàn")}. Los minutos llevan número y ${zh("分", "fēn")}; al hablar se puede omitir ${zh("分", "fēn")}.</p>
      <div class="dos-graficas">
        ${reloj(3, 0, 'sān diǎn', 'Un reloj con la manecilla corta en el 3 y la larga en el 12: las tres en punto.')}
        ${reloj(7, 30, 'qī diǎn bàn', 'Un reloj con la manecilla corta entre el 7 y el 8 y la larga en el 6: las siete y media.')}
      </div>
      <div class="dos-graficas">
        ${reloj(2, 0, 'liǎng diǎn', 'Un reloj con la manecilla corta en el 2 y la larga en el 12: las dos en punto.')}
        ${reloj(9, 10, 'jiǔ diǎn shí fēn', 'Un reloj con la manecilla corta casi en el 9 y la larga en el 2: las nueve y diez.')}
      </div>
      <p>Para las dos en punto solo vale ${zh("两点", "liǎng diǎn")}, no ${zh("二点", "èr diǎn")}. ${zh("两", "liǎng")} es el «dos» ante una palabra de medida; lo ampliarás en "Clasificadores: ${zh("个")} y otros". Los números los repasas en "Números del 0 al 100". Con media hora sigue igual: ${zh("两点半", "liǎng diǎn bàn")}, las dos y media. ${zh("现在", "xiànzài")} es «ahora» y también va al inicio de la frase. Para preguntar la hora se usa de nuevo ${zh("几", "jǐ")}, «¿qué número?»: ${zh("现在几点", "xiànzài jǐ diǎn")}.</p>
      <h3>Los minutos</h3>
      <p>Los minutos van después de ${zh("点", "diǎn")}: ${zh("九点十分", "jiǔ diǎn shí fēn")} son las nueve y diez, y ${zh("三点十五分", "sān diǎn shíwǔ fēn")} las tres y quince. Al hablar, ${zh("分", "fēn")} se puede omitir: ${zh("九点十", "jiǔ diǎn shí")}. Con ${zh("半", "bàn")} no hace falta decir minutos.</p>
      <h3>Las partes del día</h3>
      <p>Un <strong>momento del día</strong> es cada parte en que dividimos las veinticuatro horas. Este orden es la simplificación de la lección: ${zh("早上", "zǎoshang")}, ${zh("上午", "shàngwǔ")}, ${zh("中午", "zhōngwǔ")}, ${zh("下午", "xiàwǔ")} y ${zh("晚上", "wǎnshang")}. ${zh("时候", "shíhou")} es «momento»; con ${zh("什么", "shénme")} dices «cuándo»: ${zh("什么时候", "shénme shíhou")}.</p>
      <h3>Dónde va la hora en la frase</h3>
      <p>En español dices «me levanto a las siete» y la hora queda al final. En chino la palabra de tiempo va justo después del sujeto, antes del verbo, según ChinGram y Kapiolani; otra posición típica es antes del sujeto, pero nunca al final. Entre varias, va primero la parte del día y luego la hora: ${zh("我早上七点起床", "wǒ zǎoshang qī diǎn qǐchuáng")}.</p>
      <p>Prueba con la misma forma en la tarde: ${zh("我下午三点喝茶", "wǒ xiàwǔ sān diǎn hē chá")}. Y para preguntar cuándo, ${zh("你什么时候起床", "nǐ shénme shíhou qǐchuáng")}: la palabra de pregunta ocupa el sitio de la hora, igual que en "Presentarte: ${zh("我叫")}…". Fíjate en que ${zh("早上", "zǎoshang")} y ${zh("晚上", "wǎnshang")} terminan en una sílaba suave.</p>
      <p>Todo junto, una conversación de la lección:</p>
      <ul>
        <li>${zh("现在几点", "xiànzài jǐ diǎn")}</li>
        <li>${zh("现在九点十分", "xiànzài jiǔ diǎn shí fēn")}</li>
        <li>${zh("我下午三点半喝茶", "wǒ xiàwǔ sān diǎn bàn hē chá")}</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> poner la hora al final, como ${zh("我起床七点", "wǒ qǐchuáng qī diǎn")}. En chino no va ahí.</p>`,
    ejemplo: `
      <p>Las frases de ejemplo son de la lección. Luis y Ana hablan de su día.</p>
      <ol class="pasos-ej">
        <li>Luis pregunta la hora: ${zh("现在几点", "xiànzài jǐ diǎn")}. ${zh("几", "jǐ")} ocupa el lugar del número.</li>
        <li>Ana mira el reloj y pone el número en ese lugar: ${zh("现在七点半", "xiànzài qī diǎn bàn")}.</li>
        <li>Ella cuenta su rutina: ${zh("我早上七点起床", "wǒ zǎoshang qī diǎn qǐchuáng")}. La hora va entre ${zh("我", "wǒ")} y ${zh("起床", "qǐchuáng")}.</li>
        <li>Luis pregunta cuándo: ${zh("你什么时候起床", "nǐ shénme shíhou qǐchuáng")}.</li>
        <li>Luis responde con su tarde: ${zh("我下午三点喝茶", "wǒ xiàwǔ sān diǎn hē chá")}.</li>
      </ol>
      <p>Comprueba: en cada frase del día la hora está después del sujeto y antes del verbo. Resultado: <span class="resultado">${zh("七点半", "qī diǎn bàn")} = «las siete y media»</span>.</p>
      <p class="nota"><strong>Error común:</strong> decir ${zh("二点", "èr diǎn")} para las dos. Siempre ${zh("两点", "liǎng diǎn")}.</p>`,
    vidaReal: `
      <p>Saber la hora cambia cómo te mueves y te comunicas:</p>
      <ul>
        <li>Quedar con un amigo de otro país sin confundir la hora.</li>
        <li>Leer el horario de una clase en línea o de un tren.</li>
        <li>Entender cuándo empieza un programa o una película.</li>
        <li>Contar a qué hora te levantas y qué haces por la tarde.</li>
        <li>Entender un mensaje que dice «a las tres y media».</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «ahora son las tres».</p>',
        respuesta: ['现在', '三', '点'], pinyin: ['xiànzài', 'sān', 'diǎn'], lang: 'zh-Hans',
        pista: '<p>Número y luego ' + zh("点", "diǎn") + '.</p>',
        solucion: `<p>${zh("现在三点", "xiànzài sān diǎn")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «me levanto a las siete de la mañana».</p>',
        respuesta: ['我', '早上', '七点', '起床'], pinyin: ['wǒ', 'zǎoshang', 'qī diǎn', 'qǐchuáng'], lang: 'zh-Hans',
        alternativas: [['早上', '七点', '我', '起床']],
        pista: '<p>La hora va después del sujeto y antes del verbo.</p>',
        solucion: `<p>${zh("我早上七点起床", "wǒ zǎoshang qī diǎn qǐchuáng")}. También se admite poner la hora antes del sujeto, pero nunca al final.</p>` },
      { tipo: 'opciones', enunciado: `<p>Mira el reloj. ¿Qué hora marca?</p>${reloj(2, 0, 'dos en punto', 'Un reloj con la manecilla corta en el 2 y la larga en el 12.')}`,
        opciones: [zh('二点', 'èr diǎn'), zh('两点', 'liǎng diǎn'), zh('十二点', "shí'èr diǎn"), zh('两点半', 'liǎng diǎn bàn')], correcta: 1,
        pista: '<p>Para las dos en punto no se usa ' + zh("二") + '.</p>',
        solucion: `<p>${zh("两点", "liǎng diǎn")}: las dos en punto, con ${zh("两", "liǎng")}.</p>` },
      { tipo: 'numero', enunciado: `<p>Son las ${zh("九点半", "jiǔ diǎn bàn")}. ¿Cuántos minutos pasan de las nueve? Escribe la cifra.</p>`, respuesta: 30,
        pista: '<p>' + zh("半", "bàn") + ' es media hora.</p>',
        solucion: `<p>${zh("半", "bàn")} es media hora: 30 minutos.</p>` },
      { tipo: 'opciones', escucha: { voz: '晚上', audio: a('wanshang3.m4a') },
        sinAudio: '<p>Se dice <strong>wǎnshang</strong>: la primera sílaba baja y sube (tercer tono) y la segunda es corta y suave.</p>',
        enunciado: '<p>Escucha la palabra. ¿Qué parte del día es?</p>',
        opciones: ['La mañana', 'El mediodía', 'La tarde', 'La noche'], correcta: 3,
        pista: '<p>Es la última del orden de la lección.</p>',
        solucion: `<p>Se oye ${zh("晚上", "wǎnshang")}, «la noche».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("现在", "xiànzài")} con sus marcas (separa las sílabas con un espacio).</p>`,
        respuestas: ['xiàn zài'],
        pista: '<p>Las dos sílabas son de cuarto tono: caen.</p>',
        solucion: `<p>${zh("现在", "xiànzài")}: <strong>xiàn zài</strong>.</p>` },
    ],
    fuentes: [SILABO, AUDIO, CHIN_FECHAS, KAP_HORAS, KAP_ORDEN, MSU],
  });

  // ------------------------------------------------------------------
  L('Tener: 有 y 没有', {
    objetivo: `Decir qué tienes y qué no tienes con ${zh("有")} y ${zh("没有")}, y preguntar «¿tienes…?».`,
    explicacion: `
      <p>«Tengo un gato», «no tengo tiempo», «¿tienes hermanos?». Casi todo lo que se dice sobre lo que alguien tiene sale de un solo verbo. Estas son las diez palabras nuevas.</p>
      ${tabla([
        ['有', 'yǒu', 'tener, haber', 'you3.m4a'], ['没有', 'méiyǒu', 'no tener, no haber', 'meiyou23.m4a'], ['猫', 'māo', 'gato', 'mao1.m4a'], ['狗', 'gǒu', 'perro'],
        ['车', 'chē', 'carro, vehículo', 'che1.m4a'], ['钱', 'qián', 'dinero', 'qian2.m4a'], ['时间', 'shíjiān', 'tiempo'], ['问题', 'wèntí', 'pregunta, problema'],
        ['事', 'shì', 'asunto, cosa que pasa', 'shi4.m4a'], ['没事', 'méishì', 'no pasa nada, no importa'],
      ])}
      <h3>Tener y haber</h3>
      <p>La estructura básica, según la Universidad de Hawái, es sujeto, ${zh("有", "yǒu")} y objeto: ${zh("我有猫", "wǒ yǒu māo")}, «tengo un gato». ${zh("有", "yǒu")} también significa «hay», como ChinGram explica: ${zh("我家有狗", "wǒ jiā yǒu gǒu")} es «en mi casa hay un perro». El número y la palabra de medida que faltan, como «un», llegan en "Clasificadores: ${zh("个")} y otros".</p>
      <h3>La negación de ${zh("有", "yǒu")}</h3>
      <p>Ya sabes negar con ${zh("不", "bù")}, en "Negar con ${zh("不")}". Con ${zh("有", "yǒu")} no se puede: una oración con ${zh("有", "yǒu")} solo se niega con ${zh("没", "méi")}, y la forma completa es ${zh("没有", "méiyǒu")}. Kapiolani anota que puede acortarse a ${zh("没", "méi")} sin cambiar el significado. La <strong>negación</strong> es la parte de la frase que dice que algo no ocurre o no existe, y cada verbo tiene la suya.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Tipo</th><th scope="col">Con ${zh("有", "yǒu")}</th><th scope="col">Con ${zh("是", "shì")}</th></tr>
        <tr><td>Afirmar</td><td>${zh("我有钱", "wǒ yǒu qián")}</td><td>${zh("我是学生", "wǒ shì xuésheng")}</td></tr>
        <tr><td>Negar</td><td>${zh("我没有钱", "wǒ méiyǒu qián")}</td><td>${zh("我不是学生", "wǒ bú shì xuésheng")}</td></tr>
        <tr><td>Preguntar</td><td>${zh("你有钱吗", "nǐ yǒu qián ma")}</td><td>${zh("你是学生吗", "nǐ shì xuésheng ma")}</td></tr>
        <tr><td>Otra forma</td><td>${zh("你有没有钱", "nǐ yǒu méiyǒu qián")}</td><td></td></tr>
      </table></div>
      <h3>Dos formas de preguntar</h3>
      <p>ChinGram da dos maneras de hacer una pregunta de sí o no con ${zh("有", "yǒu")}: con ${zh("吗", "ma")}, como viste en "Preguntas con ${zh("吗")}", o juntando la forma afirmativa y la negativa, ${zh("有没有", "yǒu méi yǒu")}. Las dos significan lo mismo.</p>
      <h3>Cosas que se tienen</h3>
      <p>${zh("钱", "qián")}, ${zh("车", "chē")}, ${zh("猫", "māo")} y ${zh("狗", "gǒu")} son cosas que se tienen o no. Más abstractas son ${zh("时间", "shíjiān")}, «tiempo libre», ${zh("问题", "wèntí")}, «pregunta» o «problema», y ${zh("事", "shì")}, «asunto». ${zh("没事", "méishì")} es la frase de «no pasa nada».</p>
      <h3>Frases para usar hoy</h3>
      <p>Con las palabras de la tabla ya puedes armar frases útiles: ${zh("你有问题吗", "nǐ yǒu wèntí ma")}, «¿tienes alguna pregunta o problema?», y ${zh("我没有问题", "wǒ méiyǒu wèntí")}, «no tengo ninguno». También ${zh("我有事", "wǒ yǒu shì")}, «tengo un asunto» (por ejemplo, algo que hacer). Como simplificación de la lección, cada palabra cambia un poco de matiz según la frase; el sílabo solo da su sentido básico.</p>
      <p>Una última nota: la tabla de arriba pone ${zh("有", "yǒu")} junto a ${zh("是", "shì")} porque las dos se parecen en el orden, pero se niegan con palabras distintas. ${zh("是", "shì")} usa ${zh("不", "bù")}, como en "El verbo ${zh("是")}", y ${zh("有", "yǒu")} usa ${zh("没", "méi")}. Dos verbos, dos negaciones, y no se mezclan.</p>
      <p class="nota"><strong>Trampa común:</strong> decir ${zh("我不有钱", "wǒ bù yǒu qián")}. Es el error clásico de quienes empiezan; con ${zh("有", "yǒu")} siempre ${zh("没", "méi")}.</p>`,
    ejemplo: `
      <p>Las frases de ejemplo son de la lección. Luis le pregunta a Ana por su familia y su tiempo.</p>
      <ol class="pasos-ej">
        <li>Luis pregunta: ${zh("你有哥哥吗", "nǐ yǒu gēge ma")}. Es una pregunta con ${zh("吗", "ma")}.</li>
        <li>Ana niega con ${zh("没有", "méiyǒu")}: ${zh("我没有哥哥", "wǒ méiyǒu gēge")}.</li>
        <li>Luego dice lo que sí tiene: ${zh("我有姐姐", "wǒ yǒu jiějie")}.</li>
        <li>Luis cambia de forma: ${zh("你有没有时间", "nǐ yǒu méiyǒu shíjiān")}.</li>
        <li>Ana contesta con la negación completa: ${zh("我没有时间", "wǒ méiyǒu shíjiān")}. Y Luis cierra con ${zh("没事", "méishì")}.</li>
        <li>Ana añade lo que hay en su casa: ${zh("我家有狗", "wǒ jiā yǒu gǒu")}, «en mi casa hay un perro».</li>
      </ol>
      <p>Comprueba: cada negación usa ${zh("没有", "méiyǒu")} y ninguna ${zh("不", "bù")}. Resultado: <span class="resultado">${zh("我没有哥哥", "wǒ méiyǒu gēge")} = «no tengo hermano mayor»</span>.</p>
      <p class="nota"><strong>Error común:</strong> responder ${zh("不有", "bù yǒu")}. Se responde ${zh("没有", "méiyǒu")}.</p>`,
    vidaReal: `
      <p>Decir lo que tienes y lo que no tienes sirve a diario:</p>
      <ul>
        <li>Preguntar si alguien tiene hermanos, mascotas o tiempo para jugar.</li>
        <li>Decir que no tienes dinero o que no tienes algo cuando te lo piden.</li>
        <li>Responder «no pasa nada» cuando un amigo se disculpa.</li>
        <li>Entender, en una serie, quién tiene qué.</li>
        <li>Preguntar si hay tiempo para una pregunta o un problema.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «no tengo dinero».</p>',
        respuesta: ['我', '没有', '钱'], pinyin: ['wǒ', 'méiyǒu', 'qián'], lang: 'zh-Hans',
        pista: '<p>La negación de ' + zh("有") + ' es ' + zh("没有") + '.</p>',
        solucion: `<p>${zh("我没有钱", "wǒ méiyǒu qián")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «¿tienes un gato?» con la forma afirmativa-negativa.</p>',
        respuesta: ['你', '有', '没有', '猫'], pinyin: ['nǐ', 'yǒu', 'méiyǒu', 'māo'], lang: 'zh-Hans',
        pista: '<p>Primero la afirmativa y luego la negativa.</p>',
        solucion: `<p>${zh("你有没有猫", "nǐ yǒu méiyǒu māo")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Completa para decir «no tengo coche»: ${zh("我___有车", "wǒ ___ yǒu chē")}.</p>`,
        opciones: [zh('吗', 'ma'), zh('不', 'bù'), zh('是', 'shì'), zh('没', 'méi')], correcta: 3,
        pista: `<p>${zh("有", "yǒu")} no se niega con ${zh("不", "bù")}.</p>`,
        solucion: `<p>${zh("我没有车", "wǒ méiyǒu chē")}: ${zh("有", "yǒu")} se niega con ${zh("没", "méi")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>¿Qué frase significa «no tengo tiempo»?</p>',
        opciones: [zh('我不有时间', 'wǒ bù yǒu shíjiān'), zh('我有没时间', 'wǒ yǒu méi shíjiān'), zh('我是时间', 'wǒ shì shíjiān'), zh('我没有时间', 'wǒ méiyǒu shíjiān')], correcta: 3,
        pista: '<p>Con ' + zh("有") + ' no se usa ' + zh("不") + '.</p>',
        solucion: `<p>${zh("我没有时间", "wǒ méiyǒu shíjiān")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '没有', audio: a('meiyou23.m4a') },
        sinAudio: '<p>Se dice <strong>méiyǒu</strong>: la primera sílaba sube (segundo tono) y la segunda baja y sube (tercer tono).</p>',
        enunciado: '<p>Escucha la palabra. ¿Qué significa?</p>',
        opciones: ['Tener', 'No tener', 'Dinero', 'Gato'], correcta: 1,
        pista: '<p>Empieza con una sílaba que sube.</p>',
        solucion: `<p>Se oye ${zh("没有", "méiyǒu")}, «no tener».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("没有", "méiyǒu")} con sus marcas (separa las sílabas con un espacio).</p>`,
        respuestas: ['méi yǒu'],
        pista: '<p>Segundo tono y tercer tono.</p>',
        solucion: `<p>${zh("没有", "méiyǒu")}: <strong>méi yǒu</strong>.</p>` },
    ],
    fuentes: [SILABO, AUDIO, YUE, CHIN_YOU, CHIN_YOU_HAY, CHIN_MEI, KAP_YOU],
  });

  // ------------------------------------------------------------------
  L('Clasificadores: 个 y otros', {
    objetivo: 'Contar personas y cosas con número, clasificador y sustantivo, y señalar con «este» y «ese».',
    explicacion: `
      <p>En español dices «tres hojas de papel» o «dos vasos de agua»: entre el número y la cosa va una palabra de medida. En chino esa palabra aparece siempre, también con las personas. Estas son las doce palabras de la lección.</p>
      ${tabla([
        ['个', 'gè', 'clasificador general', 'ge4.m4a'], ['本', 'běn', 'clasificador de libros', 'ben3.m4a'], ['口', 'kǒu', 'clasificador de familiares', 'kou3.m4a'], ['只', 'zhī', 'clasificador de ciertos animales', 'zhi1.m4a'],
        ['件', 'jiàn', 'clasificador de ropa y asuntos', 'jian4.m4a'], ['这个', 'zhège', 'este, esta, esto', 'zhege4.m4a'], ['那个', 'nàge', 'ese, aquel'], ['这些', 'zhèxiē', 'estos, estas'],
        ['那些', 'nàxiē', 'esos, aquellos'], ['一些', 'yìxiē', 'algunos, unos cuantos'], ['椅子', 'yǐzi', 'silla'], ['桌子', 'zhuōzi', 'mesa'],
      ])}
      <h3>Número, clasificador y cosa</h3>
      <p>Un <strong>clasificador</strong> es la palabra de medida que va entre el número y el sustantivo. Es obligatorio cuando dices cuántas cosas hay, según ChinGram y Kapiolani. El orden es siempre número, clasificador, sustantivo: ${zh("三个人", "sān gè rén")}, «tres personas». En español pasa algo parecido con «tres cabezas de ganado» o «cinco hojas de papel», pero en chino ocurre con todo lo que se cuenta.</p>
      <p>El más usado es ${zh("个", "gè")}: sirve para personas y cosas, y casi para cualquier sustantivo si no conoces uno más preciso. Los otros son específicos:</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Clasificador</th><th scope="col">Cuenta</th><th scope="col">Ejemplo</th></tr>
        <tr><td>${zh("个", "gè")}</td><td>personas y cosas en general</td><td>${zh("三个人", "sān gè rén")}</td></tr>
        <tr><td>${zh("本", "běn")}</td><td>libros</td><td>${zh("两本书", "liǎng běn shū")}</td></tr>
        <tr><td>${zh("口", "kǒu")}</td><td>miembros de una familia</td><td>${zh("四口人", "sì kǒu rén")}</td></tr>
        <tr><td>${zh("只", "zhī")}</td><td>ciertos animales</td><td>${zh("一只猫", "yì zhī māo")}</td></tr>
        <tr><td>${zh("件", "jiàn")}</td><td>ropa y asuntos</td><td>${zh("一件衣服", "yí jiàn yīfu")}</td></tr>
      </table></div>
      <p>Avisos de sonido: ${zh("一", "yī")} cambia de tono, como viste en "Cambios de tono: el tercer tono, ${zh("不")} y ${zh("一")}". Ante cuarto tono se dice yí (${zh("一个", "yí gè")}) y ante los demás, yì (${zh("一本", "yì běn")}, ${zh("一只", "yì zhī")}). Para ${zh("椅子", "yǐzi")} y ${zh("桌子", "zhuōzi")} existen clasificadores más precisos; por ahora ${zh("个", "gè")} sirve.</p>
      <h3>Dos es ${zh("两", "liǎng")}</h3>
      <p>Con un clasificador, «dos» se dice ${zh("两", "liǎng")}, no ${zh("二", "èr")}: ${zh("两个人", "liǎng gè rén")}. Según MIT, los números que terminan en dos, como 12 o 22, siguen con ${zh("二", "èr")}. Sobre los números, mira "Números del 0 al 100". Con ${zh("十", "shí")} y los demás sigue igual: ${zh("三个", "sān gè")}, ${zh("四本", "sì běn")}, ${zh("五口", "wǔ kǒu")}. Por eso el orden de la tabla anterior no cambia al contar: solo cambian el número y la cosa.</p>
      <h3>Este, ese, estos, esos</h3>
      <p>Con ${zh("这", "zhè")} o ${zh("那", "nà")} el demostrativo va antes del número. Si es uno solo, el número se omite: ${zh("这个人", "zhè gè rén")}. Por eso ${zh("这个", "zhège")} y ${zh("那个", "nàge")} son «este» y «ese». Con más de uno: ${zh("那两本书", "nà liǎng běn shū")}, «esos dos libros». Para el plural, ${zh("这些", "zhèxiē")} y ${zh("那些", "nàxiē")} no llevan otro clasificador: ${zh("这些书", "zhèxiē shū")}. ${zh("一些", "yìxiē")} es «algunos».</p>
      <p class="nota"><strong>Trampa común:</strong> decir ${zh("二个人", "èr gè rén")} o ${zh("三书", "sān shū")}. El primero pide ${zh("两", "liǎng")} y el segundo se queda sin clasificador. Lo que usas para contar a tu familia está en "La familia".</p>`,
    ejemplo: `
      <p>Las frases de ejemplo son de la lección. Ana cuenta lo que hay en su casa.</p>
      <ol class="pasos-ej">
        <li>Cuenta a los suyos con ${zh("口", "kǒu")}: ${zh("我家有四口人", "wǒ jiā yǒu sì kǒu rén")}.</li>
        <li>Habla de sus libros: ${zh("我有两本书", "wǒ yǒu liǎng běn shū")}. Aquí «dos» es ${zh("两", "liǎng")}.</li>
        <li>Habla de su mascota: ${zh("我有一只猫", "wǒ yǒu yì zhī māo")}.</li>
        <li>Señala una sola cosa entre varias con ${zh("这个", "zhège")}: ${zh("这个是我的", "zhège shì wǒ de")}, «este es mío».</li>
        <li>Para varias a la vez, ${zh("这些书", "zhèxiē shū")}, sin otro clasificador.</li>
      </ol>
      <p>Comprueba: cada cantidad lleva número, clasificador y cosa, y ${zh("一", "yī")} cambia de tono según lo que sigue. Resultado: <span class="resultado">${zh("两本书", "liǎng běn shū")} = «dos libros»</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar ${zh("个", "gè")} para todo. Se entiende, pero con libros y animales suena mejor el clasificador propio.</p>`,
    vidaReal: `
      <p>Contar bien es parte de hablar de cualquier cosa:</p>
      <ul>
        <li>Decir cuántas personas hay en tu casa o en tu clase.</li>
        <li>Pedir dos cosas iguales en una tienda.</li>
        <li>Hablar de tus libros, de tu ropa o de tus mascotas.</li>
        <li>Señalar algo y decir «esto» o «esos» sin dudar.</li>
        <li>Entender cuántos hay en una lista de compras o en un menú.</li>
        <li>Decir cuántos hermanos o primos hay en una foto.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Elige el clasificador para «tres libros»: ${zh("三___书", "sān ___ shū")}.</p>`,
        opciones: [zh('只', 'zhī'), zh('件', 'jiàn'), zh('本', 'běn'), zh('口', 'kǒu')], correcta: 2,
        pista: '<p>Es el clasificador de los libros.</p>',
        solucion: `<p>${zh("三本书", "sān běn shū")}: ${zh("本", "běn")} cuenta libros.</p>` },
      { tipo: 'opciones', enunciado: `<p>Elige el clasificador para «un gato»: ${zh("一___猫", "yì ___ māo")}.</p>`,
        opciones: [zh('个', 'gè'), zh('本', 'běn'), zh('只', 'zhī'), zh('件', 'jiàn')], correcta: 2,
        pista: '<p>Sirve para ciertos animales.</p>',
        solucion: `<p>${zh("一只猫", "yì zhī māo")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «tengo dos libros».</p>',
        respuesta: ['我', '有', '两', '本', '书'], pinyin: ['wǒ', 'yǒu', 'liǎng', 'běn', 'shū'], lang: 'zh-Hans',
        pista: '<p>Número, clasificador y cosa.</p>',
        solucion: `<p>${zh("我有两本书", "wǒ yǒu liǎng běn shū")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «en mi casa somos cuatro» (literal: «mi casa tiene cuatro personas»).</p>',
        respuesta: ['我家', '有', '四', '口', '人'], pinyin: ['wǒ jiā', 'yǒu', 'sì', 'kǒu', 'rén'], lang: 'zh-Hans',
        pista: '<p>' + zh("口", "kǒu") + ' cuenta a los miembros de una familia.</p>',
        solucion: `<p>${zh("我家有四口人", "wǒ jiā yǒu sì kǒu rén")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '只', audio: a('zhi1.m4a') },
        sinAudio: '<p>Se dice <strong>zhī</strong>: una sola sílaba, alta y plana (primer tono).</p>',
        enunciado: '<p>Escucha el clasificador. ¿Qué se cuenta con él?</p>',
        opciones: ['Libros', 'Ciertos animales', 'Prendas de ropa', 'Personas en general'], correcta: 1,
        pista: '<p>Es el de ' + zh("一只猫", "yì zhī māo") + '.</p>',
        solucion: `<p>Se oye ${zh("只", "zhī")}, que cuenta ciertos animales.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("件", "jiàn")} con su marca de tono.</p>`,
        respuestas: ['jiàn'],
        pista: '<p>El tono cae, como una orden.</p>',
        solucion: `<p>${zh("件", "jiàn")}: <strong>jiàn</strong>, cuarto tono.</p>` },
    ],
    fuentes: [SILABO, AUDIO, XUDONG, CHIN_CLAS, CHIN_DEM, KAP_GE, KAP_CONTAR, MIT],
  });

  // --- Lecciones 6 a 9: segundo constructor ---
  const CHIN_JI = CHINGRAM('interrogative-pronouns-ji-%e5%87%a0-%e5%b9%be-and-duoshao-%e5%a4%9a%e5%b0%91-how-many', 'Interrogative pronouns jǐ 几 and duōshao 多少');
  const KAP_PREG = KAP('02%3A_First_Contact/2.09%3A_Lesson_1_Grammar_-_Question_Pronouns', 'Lesson 1 Grammar, Question Pronouns');
  const CHIN_NAR = CHINGRAM('interrogative-pronouns-nar-%e5%93%aa%e5%84%bf-%e5%93%aa%e5%85%92-and-nali-%e5%93%aa%e9%87%8c-%e5%93%aa%e8%a3%a1-where', 'Interrogative pronouns nǎr 哪儿 and nǎli 哪里 (where)');
  const CHIN_DINERO = CHINGRAM('amounts-of-money', 'Amounts of money');
  const CHIN_XIANG = CHINGRAM('uber%ef%bc%9acomparison-modal-verb-xiang-%e6%83%b3-and-yao-%e8%a6%81expressing-desire-or-willingness', 'Comparison: Modal verb xiǎng 想 and yào 要');
  const CHIN_YAO = CHINGRAM('uber%ef%bc%9amodal-verb-yao-%e8%a6%81-want-to-desire-to-need-to-have-to-will-have-to', 'Modal verb yào 要');
  const KAP_YAO = { nombre: "Kapi'olani Community College (EE. UU.), CHN102 Elementary Mandarin II, Carl Polley, LibreTexts: Lesson 4 Grammar, Auxiliary verb 要 (en inglés)", url: 'https://human.libretexts.org/Bookshelves/Languages/Chinese/CHN102_Elementary_Mandarin_II_Textbook/05:_Ordering_Food_and_Drink/5.05:_Lesson_4_Grammar_-_Auxiliary_verb__(yao)_and_its_multiple_meanings' };

  // ------------------------------------------------------------------
  L('Preguntar cantidades: 几 y 多少', {
    objetivo: `Preguntar cuántos hay, cuántos años tiene alguien y responder, eligiendo entre ${zh("几", "jǐ")} y ${zh("多少", "duōshao")}.`,
    explicacion: `
      <p>Al conocer a alguien preguntas cuántos son en su casa, cuántos años tiene o cuántos alumnos hay en su escuela. En mandarín hay dos palabras para «¿cuántos?» y elegir bien es lo difícil. Estas son las diez palabras de la lección.</p>
      ${tabla([
        ['几', 'jǐ', '¿cuántos? (números pequeños)', 'ji3.m4a'], ['多少', 'duōshao', '¿cuánto? ¿cuántos? (cualquier número)', 'duoshao1.m4a'], ['岁', 'suì', 'años de edad', 'sui4.m4a'], ['多', 'duō', 'mucho; «cuán» en la pregunta de edad', 'duo1.m4a'],
        ['少', 'shǎo', 'poco', 'shao3.m4a'], ['电话', 'diànhuà', 'teléfono, llamada', 'dianhua44.m4a'], ['千', 'qiān', 'mil'], ['房间', 'fángjiān', 'habitación'],
        ['学校', 'xuéxiào', 'escuela'], ['课', 'kè', 'clase'],
      ])}
      <h3>Dos palabras, dos tamaños</h3>
      <p>Según ChinGram, de la Universidad Palacký de Chequia, ${zh("几", "jǐ")} pregunta por números pequeños, por lo general menores que diez, y siempre lleva un clasificador detrás. ${zh("多少", "duōshao")} sirve para cualquier número: en la pregunta el clasificador puede faltar, pero en la respuesta es obligatorio. MIT dice lo mismo con otras palabras: si esperas un número bajo, usa ${zh("几", "jǐ")} más clasificador. Los clasificadores están en "Clasificadores: ${zh("个")} y otros".</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Pregunta</th><th scope="col">Respuesta</th></tr>
        <tr><td>${zh("你家有几口人", "nǐ jiā yǒu jǐ kǒu rén")}</td><td>${zh("我家有五口人", "wǒ jiā yǒu wǔ kǒu rén")}</td></tr>
        <tr><td>${zh("你们学校有多少老师", "nǐmen xuéxiào yǒu duōshao lǎoshī")}</td><td>${zh("我们学校有十六个老师", "wǒmen xuéxiào yǒu shíliù gè lǎoshī")}</td></tr>
      </table></div>
      <h3>Cómo elegir</h3>
      <p>Piensa en qué número esperas. En una familia casi siempre son menos de diez, así que usas ${zh("几", "jǐ")}. En una escuela, una ciudad o un precio puede ser cualquier cifra, así que usas ${zh("多少", "duōshao")}. Como simplificación de la lección: si dudas, ${zh("多少", "duōshao")} no falla en la pregunta, porque acepta cualquier tamaño. Con ${zh("电话", "diànhuà")} funciona igual: ${zh("你家有几个电话", "nǐ jiā yǒu jǐ gè diànhuà")} y la respuesta ${zh("我家有两个电话", "wǒ jiā yǒu liǎng gè diànhuà")}, con ${zh("两", "liǎng")} ante el clasificador.</p>
      <h3>La respuesta ocupa el mismo lugar</h3>
      <p>La palabra de pregunta no cambia el orden de la frase: va donde iría la información en la respuesta, según ChinGram y Kapiolani. Ya lo viste en "Presentarte: ${zh("我叫")}…" con ${zh("什么", "shénme")}. Aquí cambias ${zh("几", "jǐ")} por ${zh("五", "wǔ")} y la frase está lista.</p>
      <h3>La edad</h3>
      <p>${zh("岁", "suì")} cuenta los años de edad. ChinGram explica que ${zh("你几岁", "nǐ jǐ suì")} se usa con niños menores de diez años: ${zh("你妹妹几岁", "nǐ mèimei jǐ suì")}, y la respuesta es ${zh("她八岁", "tā bā suì")}. Su ejemplo termina con otra palabra que verás en la unidad 4; aquí la dejamos fuera. A los mayores se les pregunta ${zh("你多大", "nǐ duō dà")}, y se responde ${zh("我十一岁", "wǒ shíyī suì")}. En ${zh("多大", "duō dà")}, ${zh("多", "duō")} hace de «cuán» y ${zh("大", "dà")} es «grande».</p>
      <h3>Mil y otras cosas que contar</h3>
      <p>${zh("千", "qiān")} es «mil»: ${zh("一千", "yì qiān")} (${zh("一", "yī")} se dice yì ante primer tono). Como simplificación de la lección, ${zh("多", "duō")} y ${zh("少", "shǎo")}, «mucho» y «poco», son las dos mitades de ${zh("多少", "duōshao")}. Con ${zh("电话", "diànhuà")}, ${zh("房间", "fángjiān")} y ${zh("课", "kè")} ya puedes preguntar ${zh("你家有几个房间", "nǐ jiā yǒu jǐ gè fángjiān")} y decir ${zh("我今天有课", "wǒ jīntiān yǒu kè")}.</p>
      <p class="nota"><strong>Trampa común:</strong> decir ${zh("你有几书", "nǐ yǒu jǐ shū")}. ${zh("几", "jǐ")} nunca va sin clasificador: ${zh("你有几本书", "nǐ yǒu jǐ běn shū")}.</p>`,
    ejemplo: `
      <p>Las frases de ejemplo de la lección son nuestras, con palabras ya vistas. Ana conoce a Luis y quiere saber de su familia y su escuela.</p>
      <ol class="pasos-ej">
        <li>Pregunta por su hermana pequeña: ${zh("你妹妹几岁", "nǐ mèimei jǐ suì")}. Luis responde ${zh("她八岁", "tā bā suì")}.</li>
        <li>Pregunta cuántos son en su casa, con ${zh("几", "jǐ")} y ${zh("口", "kǒu")}: ${zh("你家有几口人", "nǐ jiā yǒu jǐ kǒu rén")}. Luis: ${zh("我家有五口人", "wǒ jiā yǒu wǔ kǒu rén")}.</li>
        <li>Para una escuela, el número puede ser grande: ${zh("你们学校有多少学生", "nǐmen xuéxiào yǒu duōshao xuésheng")}. Luis: ${zh("我们学校有一千个学生", "wǒmen xuéxiào yǒu yì qiān gè xuésheng")}, una cifra de ejemplo.</li>
        <li>Para terminar, Ana cuenta su semana: ${zh("我今天有课", "wǒ jīntiān yǒu kè")}.</li>
      </ol>
      <p>Comprueba: la palabra de pregunta ocupa el lugar del número en la respuesta, y la respuesta lleva clasificador. Resultado: <span class="resultado">${zh("几口人", "jǐ kǒu rén")} → ${zh("五口人", "wǔ kǒu rén")}</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar ${zh("你几岁", "nǐ jǐ suì")} con un adulto. Con los mayores se usa ${zh("你多大", "nǐ duō dà")}.</p>`,
    vidaReal: `
      <p>Preguntar cantidades sirve en muchas charlas con alguien nuevo:</p>
      <ul>
        <li>Saber cuántos años tiene un niño que conoces.</li>
        <li>Preguntar cuántos son en la familia de un amigo.</li>
        <li>Averiguar cuántos alumnos tiene su escuela.</li>
        <li>Entender cuántos cuartos tiene una casa.</li>
        <li>Responder con un número cuando te preguntan lo mismo a ti.</li>
        <li>Contar cuántos teléfonos o clases hay en casa o en tu día.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Quieres saber cuántos alumnos hay en una escuela enorme, de más de mil. ¿Qué palabra de pregunta usas?</p>',
        opciones: [zh('几', 'jǐ'), zh('多少', 'duōshao'), zh('什么', 'shénme'), zh('哪', 'nǎ')], correcta: 1,
        pista: '<p>Una de las dos sirve para cualquier número, no solo para los pequeños.</p>',
        solucion: `<p>${zh("多少", "duōshao")} sirve para números grandes. ${zh("几", "jǐ")} es para números pequeños.</p>` },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas palabras de pregunta nunca puede ir sin un clasificador detrás?</p>',
        opciones: [zh('几', 'jǐ'), zh('多少', 'duōshao')], correcta: 0,
        pista: '<p>La otra puede omitirlo en la pregunta.</p>',
        solucion: `<p>${zh("几", "jǐ")} siempre lleva clasificador: ${zh("几口人", "jǐ kǒu rén")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «¿cuántos son en tu casa?» (literal: «¿tu casa tiene cuántas personas?»).</p>',
        respuesta: ['你家', '有', '几', '口', '人'], pinyin: ['nǐ jiā', 'yǒu', 'jǐ', 'kǒu', 'rén'], lang: 'zh-Hans',
        pista: '<p>La palabra de pregunta va donde iría el número en la respuesta.</p>',
        solucion: `<p>${zh("你家有几口人", "nǐ jiā yǒu jǐ kǒu rén")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «¿cuántos alumnos hay en su escuela?» (a varias personas).</p>',
        respuesta: ['你们', '学校', '有', '多少', '学生'], pinyin: ['nǐmen', 'xuéxiào', 'yǒu', 'duōshao', 'xuésheng'], lang: 'zh-Hans',
        pista: '<p>' + zh("多少", "duōshao") + ' ocupa el sitio del número, igual que ' + zh("几", "jǐ") + '.</p>',
        solucion: `<p>${zh("你们学校有多少学生", "nǐmen xuéxiào yǒu duōshao xuésheng")}.</p>` },
      { tipo: 'numero', enunciado: `<p>Luis responde ${zh("我十二岁", "wǒ shí'èr suì")}. ¿Cuántos años tiene? Escribe la cifra.</p>`, respuesta: 12,
        pista: '<p>Diez y dos.</p>',
        solucion: `<p>${zh("十二", "shí'èr")} es 12: Luis tiene 12 años.</p>` },
      { tipo: 'opciones', escucha: { voz: '多少', audio: a('duoshao1.m4a') },
        sinAudio: '<p>Se dice <strong>duōshao</strong>: la primera sílaba es alta y plana (primer tono) y la segunda es corta y suave.</p>',
        enunciado: '<p>Escucha la palabra. ¿Qué significa?</p>',
        opciones: ['Dónde', 'Cuánto o cuántos (cualquier número)', 'Cuántos (solo números pequeños)', 'Quién'], correcta: 1,
        pista: '<p>Es la que sirve para números grandes.</p>',
        solucion: `<p>Se oye ${zh("多少", "duōshao")}, que pregunta por cualquier cantidad.</p>` },
    ],
    fuentes: [SILABO, AUDIO, CHIN_JI, KAP_PREG, MIT],
  });

  // ------------------------------------------------------------------
  L('Dónde está algo: 在', {
    objetivo: `Decir y preguntar dónde está una persona o una cosa con ${zh("在", "zài")}, ${zh("哪儿", "nǎr")} y las palabras para «aquí» y «allí».`,
    explicacion: `
      <p>Una de las preguntas más útiles es «¿dónde está?». Un <strong>lugar</strong> es el sitio donde está una persona o una cosa: la escuela, la tienda, aquí. Estas son las doce palabras de la lección.</p>
      ${tabla([
        ['在', 'zài', 'estar en', 'zai4.m4a'], ['哪儿', 'nǎr', 'dónde', 'nar3.m4a'], ['哪里', 'nǎlǐ', 'dónde (otra forma)', 'nali33.m4a'], ['这儿', 'zhèr', 'aquí'],
        ['这里', 'zhèlǐ', 'aquí (otra forma)', 'zheli43.m4a'], ['那儿', 'nàr', 'allí'], ['那里', 'nàlǐ', 'allí (otra forma)'], ['医院', 'yīyuàn', 'hospital', 'yiyuan14.m4a'],
        ['商店', 'shāngdiàn', 'tienda'], ['公司', 'gōngsī', 'empresa, oficina'], ['住', 'zhù', 'vivir (en un lugar)', 'zhu4.m4a'], ['超市', 'chāoshì', 'supermercado'],
      ])}
      <p>La grabación de ${zh("这里", "zhèlǐ")} dice «zhèli», con la segunda sílaba breve. Aquí mostramos el pinyin del sílabo; es una simplificación de la lección.</p>
      <h3>Estar en: sujeto, ${zh("在", "zài")}, lugar</h3>
      <p>${zh("在", "zài")} significa «estar en». El orden es persona o cosa, ${zh("在", "zài")} y lugar. ChinGram da el ejemplo ${zh("老师在哪儿", "lǎoshī zài nǎr")}, «¿dónde está el profesor?», con respuesta ${zh("老师在教室", "lǎoshī zài jiàoshì")}. Con la palabra de esta lección sería ${zh("老师在学校", "lǎoshī zài xuéxiào")}. Fíjate: no hay otro verbo. Como simplificación de la lección, para decir dónde está algo no se usa ${zh("是", "shì")}; con ${zh("是", "shì")} dices qué es algo, como en "El verbo ${zh("是")}".</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Sujeto</th><th scope="col"></th><th scope="col">Lugar</th></tr>
        <tr><td>${zh("我爸爸", "wǒ bàba")}</td><td>${zh("在", "zài")}</td><td>${zh("医院", "yīyuàn")}</td></tr>
        <tr><td>${zh("我妈妈", "wǒ māma")}</td><td>${zh("在", "zài")}</td><td>${zh("公司", "gōngsī")}</td></tr>
      </table></div>
      <h3>Aquí, allí, dónde</h3>
      <p>Cada una de estas tres palabras tiene dos formas con el mismo significado.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Significado</th><th scope="col">Una forma</th><th scope="col">Otra forma</th></tr>
        <tr><th scope="row">aquí</th><td>${zh("这儿", "zhèr")}</td><td>${zh("这里", "zhèlǐ")}</td></tr>
        <tr><th scope="row">allí</th><td>${zh("那儿", "nàr")}</td><td>${zh("那里", "nàlǐ")}</td></tr>
        <tr><th scope="row">dónde</th><td>${zh("哪儿", "nǎr")}</td><td>${zh("哪里", "nǎlǐ")}</td></tr>
      </table></div>
      <p>Según ChinGram, ${zh("哪里", "nǎlǐ")} es más típica de quienes hablan en el sur, y ${zh("哪儿", "nǎr")} de quienes hablan en el norte. ${zh("在哪儿", "zài nǎr")} se usa para preguntar por algo o alguien que ya conoces. Como la palabra de pregunta va en el lugar de la respuesta, ${zh("你在哪儿", "nǐ zài nǎr")} se contesta ${zh("我在这儿", "wǒ zài zhèr")}.</p>
      <p>Si algo está cerca de ti, dices ${zh("这儿", "zhèr")}; si está lejos, ${zh("那儿", "nàr")}: ${zh("书在这儿", "shū zài zhèr")}, ${zh("书在那儿", "shū zài nàr")}. Las dos formas de cada pareja significan lo mismo.</p>
      <h3>Más lugares</h3>
      <p>Con las palabras nuevas puedes armar muchas frases. ${zh("商店", "shāngdiàn")} y ${zh("超市", "chāoshì")} son sitios donde se compra: ${zh("我哥哥在超市", "wǒ gēge zài chāoshì")}. ${zh("公司", "gōngsī")} es donde trabaja una persona: ${zh("我妈妈在公司", "wǒ māma zài gōngsī")}. También puedes preguntar por cosas: ${zh("手机在哪里", "shǒujī zài nǎlǐ")}, con la respuesta ${zh("手机在那里", "shǒujī zài nàlǐ")}. Y si preguntas a varias personas a la vez, ${zh("你们在哪儿", "nǐmen zài nǎr")}. Siempre es el mismo molde: quién o qué, ${zh("在", "zài")}, y el sitio.</p>
      <h3>Vivir en un lugar</h3>
      <p>${zh("住", "zhù")} es «vivir» en un sitio. Como simplificación de la lección: se dice ${zh("你住在哪儿", "nǐ zhù zài nǎr")}, con ${zh("在", "zài")} después de ${zh("住", "zhù")}, y se responde ${zh("我住在这儿", "wǒ zhù zài zhèr")}.</p>
      <p class="nota"><strong>Trampa común:</strong> decir ${zh("我爸爸是医院", "wǒ bàba shì yīyuàn")} para «mi papá está en el hospital». Eso dice «mi papá es el hospital». Lo correcto es ${zh("我爸爸在医院", "wǒ bàba zài yīyuàn")}.</p>`,
    ejemplo: `
      <p>Las frases de ejemplo de la lección son nuestras. Ana y Luis hablan por teléfono y se cuentan dónde está cada uno.</p>
      <ol class="pasos-ej">
        <li>Luis pregunta: ${zh("你在哪儿", "nǐ zài nǎr")}.</li>
        <li>Ana contesta: ${zh("我在学校", "wǒ zài xuéxiào")}.</li>
        <li>Luego le pregunta por una cosa: ${zh("手机在哪里", "shǒujī zài nǎlǐ")}. Ana mira alrededor: ${zh("手机在那里", "shǒujī zài nàlǐ")}.</li>
        <li>Luis cuenta de su familia: ${zh("我爸爸在医院", "wǒ bàba zài yīyuàn")}, ${zh("我妈妈在公司", "wǒ māma zài gōngsī")}.</li>
        <li>Ana pregunta por la casa de Luis: ${zh("你住在哪儿", "nǐ zhù zài nǎr")}. Luis: ${zh("我住在这儿", "wǒ zhù zài zhèr")}.</li>
      </ol>
      <p>Comprueba: en cada respuesta el lugar ocupa el sitio de ${zh("哪儿", "nǎr")}, y no hay ${zh("是", "shì")}. Resultado: <span class="resultado">${zh("我在学校", "wǒ zài xuéxiào")} = «estoy en la escuela»</span>.</p>
      <p class="nota"><strong>Error común:</strong> ponerle ${zh("吗", "ma")} a ${zh("哪儿", "nǎr")}. La palabra de pregunta ya hace la pregunta; ${zh("吗", "ma")} sobra.</p>`,
    vidaReal: `
      <p>Saber decir dónde está algo resuelve situaciones de todos los días:</p>
      <ul>
        <li>Contarle a un amigo dónde estás para encontrarse.</li>
        <li>Preguntar dónde está alguien de la familia.</li>
        <li>Pedir ayuda cuando buscas una tienda o un hospital.</li>
        <li>Decir en qué sitio vives.</li>
        <li>Señalar «aquí» y «allí» al hablar de objetos.</li>
        <li>Preguntar dónde dejaste tu teléfono o tu mochila.</li>
        <li>Entender a alguien que te dice dónde trabaja su mamá.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «mi papá está en el hospital».</p>',
        respuesta: ['我爸爸', '在', '医院'], pinyin: ['wǒ bàba', 'zài', 'yīyuàn'], lang: 'zh-Hans',
        pista: '<p>Persona, ' + zh("在", "zài") + ' y lugar.</p>',
        solucion: `<p>${zh("我爸爸在医院", "wǒ bàba zài yīyuàn")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «¿dónde está tu casa?».</p>',
        respuesta: ['你家', '在', '哪儿'], pinyin: ['nǐ jiā', 'zài', 'nǎr'], lang: 'zh-Hans',
        pista: '<p>La palabra de pregunta va donde iría el lugar.</p>',
        solucion: `<p>${zh("你家在哪儿", "nǐ jiā zài nǎr")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Elige la palabra que falta para decir «mi mamá está en la tienda»: ${zh("我妈妈___商店", "wǒ māma ___ shāngdiàn")}.</p>`,
        opciones: [zh('是', 'shì'), zh('在', 'zài'), zh('吗', 'ma'), zh('也', 'yě')], correcta: 1,
        pista: '<p>' + zh("是", "shì") + ' dice qué es algo; la otra dice dónde está.</p>',
        solucion: `<p>${zh("我妈妈在商店", "wǒ māma zài shāngdiàn")}: ${zh("在", "zài")} es «estar en».</p>` },
      { tipo: 'opciones', escucha: { voz: '哪儿', audio: a('nar3.m4a') },
        sinAudio: '<p>Se dice <strong>nǎr</strong>: una sola sílaba que baja y sube (tercer tono) y termina con el sonido «r».</p>',
        enunciado: '<p>Escucha la palabra. ¿Qué significa?</p>',
        opciones: ['Aquí', 'Allí', 'Dónde', 'Quién'], correcta: 2,
        pista: '<p>Es la palabra de pregunta por el lugar.</p>',
        solucion: `<p>Se oye ${zh("哪儿", "nǎr")}, «dónde».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("医院", "yīyuàn")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['yī yuàn'],
        pista: '<p>La primera sílaba es alta y plana; la segunda cae.</p>',
        solucion: `<p>${zh("医院", "yīyuàn")}: <strong>yī yuàn</strong>.</p>` },
      { tipo: 'opciones', enunciado: '<p>Según ChinGram, ¿cuál de estas palabras para «dónde» es más típica de quienes hablan en el sur?</p>',
        opciones: [zh('哪儿', 'nǎr'), zh('哪里', 'nǎlǐ'), zh('这儿', 'zhèr'), zh('那里', 'nàlǐ')], correcta: 1,
        pista: '<p>Las dos primeras significan «dónde»; solo una es del sur.</p>',
        solucion: `<p>${zh("哪里", "nǎlǐ")} es más del sur; ${zh("哪儿", "nǎr")}, más del norte.</p>` },
    ],
    fuentes: [SILABO, AUDIO, CHIN_NAR],
  });

  // ------------------------------------------------------------------
  L('Comprar: 多少钱', {
    objetivo: `Preguntar cuánto cuesta algo con ${zh("多少钱", "duōshao qián")}, decir un precio con ${zh("块", "kuài")} y comentar si es caro o barato.`,
    explicacion: `
      <p>Ir de compras en chino necesita pocas palabras. El <strong>precio</strong> es la cantidad de dinero que cuesta algo. Estas son las diez palabras nuevas; ya conoces ${zh("钱", "qián")}, «dinero», de otra lección. Todos los precios de esta lección son de ejemplo.</p>
      ${tabla([
        ['买', 'mǎi', 'comprar', 'mai3.m4a'], ['卖', 'mài', 'vender'], ['块', 'kuài', 'unidad de dinero (al hablar)', 'kuai4.m4a'], ['元', 'yuán', 'unidad de dinero (por escrito)'],
        ['贵', 'guì', 'caro', 'gui4.m4a'], ['便宜', 'piányi', 'barato', 'pianyi2.m4a'], ['水果', 'shuǐguǒ', 'fruta', 'shuiguo33.m4a'], ['苹果', 'píngguǒ', 'manzana', 'pingguo23.m4a'],
        ['店', 'diàn', 'tienda'], ['书店', 'shūdiàn', 'librería'],
      ])}
      <h3>Preguntar el precio</h3>
      <p>El precio se pregunta con ${zh("多少钱", "duōshao qián")}, literalmente «¿cuánto dinero?». ChinGram da el ejemplo ${zh("那个多少钱", "nàge duōshao qián")}: ¿cuánto cuesta aquello? Pones lo que quieres saber y después ${zh("多少钱", "duōshao qián")}, y no hace falta ningún verbo. Como en "Preguntar cantidades: ${zh("几")} y ${zh("多少")}", la respuesta cambia solo la palabra de pregunta por el número.</p>
      <h3>Decir el precio</h3>
      <p>Se responde con número y ${zh("块", "kuài")}. Según el sílabo, ${zh("块", "kuài")} y ${zh("元", "yuán")} son clasificadores de dinero, como ${zh("个", "gè")} para personas y cosas, así que ${zh("六块", "liù kuài")} se arma como ${zh("六个", "liù gè")}. La frase del precio tampoco lleva verbo: es una simplificación de la lección. Con el sustantivo, el orden es el de siempre: ${zh("这个苹果六块", "zhège píngguǒ liù kuài")}.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Turno</th><th scope="col">Quién</th><th scope="col">Qué dice</th></tr>
        <tr><td>1</td><td>Ana pregunta</td><td>${zh("这个苹果多少钱", "zhège píngguǒ duōshao qián")}</td></tr>
        <tr><td>2</td><td>La vendedora</td><td>${zh("六块", "liù kuài")}</td></tr>
        <tr><td>3</td><td>Ana opina y decide</td><td>${zh("很便宜，我买两个", "hěn piányi, wǒ mǎi liǎng gè")}</td></tr>
        <tr><td>4</td><td>La vendedora</td><td>${zh("十二块", "shí'èr kuài")}</td></tr>
      </table></div>
      <h3>Con los números que ya conoces</h3>
      <p>Cualquier número del 0 al 100 sirve delante de ${zh("块", "kuài")}: ${zh("三块", "sān kuài")}, ${zh("十块", "shí kuài")}, ${zh("十五块", "shíwǔ kuài")}, ${zh("二十块", "èrshí kuài")}. Lo mismo vale para los precios de la tienda de enfrente: pregunta ${zh("多少钱", "duōshao qián")} y escucha el número antes de ${zh("块", "kuài")}. Como en "Números del 0 al 100", los números se arman con diez como base.</p>
      <h3>Lo que se dice y lo que se escribe</h3>
      <p>Según ChinGram, en lo escrito y en las etiquetas de precio se usa ${zh("元", "yuán")}; al hablar, ${zh("块", "kuài")}, la palabra de todos los días. Así, una etiqueta con 6 ${zh("元", "yuán")} se dice ${zh("六块", "liù kuài")}.</p>
      <h3>Caro, barato, comprar, vender</h3>
      <p>${zh("贵", "guì")} y ${zh("便宜", "piányi")} se usan con ${zh("很", "hěn")}, como cualquier adjetivo: ${zh("很贵", "hěn guì")}, ${zh("很便宜", "hěn piányi")}. Con ${zh("买", "mǎi")} y ${zh("卖", "mài")} hablas de comprar y vender: ${zh("我买水果", "wǒ mǎi shuǐguǒ")}, y ${zh("书店卖书", "shūdiàn mài shū")}. Una ${zh("书店", "shūdiàn")} es una ${zh("店", "diàn")} de ${zh("书", "shū")}. Cada lado de la compra tiene su verbo: ${zh("她卖苹果", "tā mài píngguǒ")}, la vendedora; ${zh("我买苹果", "wǒ mǎi píngguǒ")}, tú. Para preguntar qué compra alguien, ${zh("你买什么", "nǐ mǎi shénme")}, y se responde ${zh("我买水果", "wǒ mǎi shuǐguǒ")}.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir ${zh("买", "mǎi")} y ${zh("卖", "mài")}. Se escriben casi igual y suenan casi igual; solo cambia el tono: ${zh("买", "mǎi")} baja y sube, ${zh("卖", "mài")} cae de golpe.</p>`,
    ejemplo: `
      <p>Las frases de ejemplo de la lección son nuestras. Ana va a un puesto de fruta y compra manzanas.</p>
      <ol class="pasos-ej">
        <li>Señala una manzana y pregunta: ${zh("这个苹果多少钱", "zhège píngguǒ duōshao qián")}.</li>
        <li>La vendedora responde con número y ${zh("块", "kuài")}: ${zh("六块", "liù kuài")}.</li>
        <li>Ana opina: ${zh("很便宜", "hěn piányi")}. Luego decide: ${zh("我买两个", "wǒ mǎi liǎng gè")}, con ${zh("两", "liǎng")} ante el clasificador. Si fueran más caras, diría ${zh("太贵", "tài guì")}.</li>
        <li>Seis por dos son doce: ${zh("十二块", "shí'èr kuài")}.</li>
      </ol>
      <p>Comprueba: el precio lleva número y ${zh("块", "kuài")}, sin verbo, y ${zh("很", "hěn")} va delante de ${zh("便宜", "piányi")}. Resultado: <span class="resultado">${zh("六块", "liù kuài")} × 2 = ${zh("十二块", "shí'èr kuài")}</span>.</p>
      <p class="nota"><strong>Error común:</strong> añadir ${zh("是", "shì")} al precio, como ${zh("这个是六块", "zhège shì liù kuài")}. En la lección usamos la forma sin verbo.</p>`,
    vidaReal: `
      <p>Preguntar precios es de lo más útil al viajar o comprar:</p>
      <ul>
        <li>Saber cuánto cuesta algo en una tienda o en un mercado.</li>
        <li>Entender el precio que te dice una vendedora.</li>
        <li>Comentar si algo está caro o barato.</li>
        <li>Leer una etiqueta de precio.</li>
        <li>Decir qué quieres comprar y cuántos.</li>
        <li>Distinguir entre pedir algo en una tienda y venderlo tú.</li>
        <li>Reconocer una librería o una tienda de fruta por su letrero.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «¿cuánto cuesta esto?».</p>',
        respuesta: ['这个', '多少', '钱'], pinyin: ['zhège', 'duōshao', 'qián'], lang: 'zh-Hans',
        pista: '<p>Lo que quieres saber, y al final ' + zh("多少钱", "duōshao qián") + '.</p>',
        solucion: `<p>${zh("这个多少钱", "zhège duōshao qián")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «compro dos manzanas».</p>',
        respuesta: ['我', '买', '两', '个', '苹果'], pinyin: ['wǒ', 'mǎi', 'liǎng', 'gè', 'píngguǒ'], lang: 'zh-Hans',
        pista: '<p>Número, clasificador y cosa; «dos» es ' + zh("两", "liǎng") + '.</p>',
        solucion: `<p>${zh("我买两个苹果", "wǒ mǎi liǎng gè píngguǒ")}.</p>` },
      { tipo: 'numero', enunciado: `<p>Una manzana cuesta ${zh("六块", "liù kuài")} y compras dos. ¿Cuántos ${zh("块", "kuài")} pagas? Escribe la cifra.</p>`, respuesta: 6 * 2,
        pista: '<p>Seis veces dos.</p>',
        solucion: `<p>6 × 2 = 12, o sea ${zh("十二块", "shí'èr kuài")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>En una etiqueta de precio escrita, ¿qué palabra se usa para la unidad de dinero?</p>',
        opciones: [zh('块', 'kuài'), zh('元', 'yuán'), zh('个', 'gè'), zh('买', 'mǎi')], correcta: 1,
        pista: '<p>Al hablar se dice la otra.</p>',
        solucion: `<p>En lo escrito, ${zh("元", "yuán")}; al hablar, ${zh("块", "kuài")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '贵', audio: a('gui4.m4a') },
        sinAudio: '<p>Se dice <strong>guì</strong>: una sola sílaba que cae de golpe (cuarto tono).</p>',
        enunciado: '<p>Escucha la palabra. ¿Qué significa?</p>',
        opciones: ['Caro', 'Barato', 'Comprar', 'Vender'], correcta: 0,
        pista: '<p>Es lo contrario de ' + zh("便宜", "piányi") + '.</p>',
        solucion: `<p>Se oye ${zh("贵", "guì")}, «caro».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("便宜", "piányi")} con su marca de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['pián yi'],
        pista: '<p>La primera sílaba sube; la segunda es suave y no lleva marca.</p>',
        solucion: `<p>${zh("便宜", "piányi")}: <strong>pián yi</strong>.</p>` },
    ],
    fuentes: [SILABO, AUDIO, CHIN_DINERO],
  });

  // ------------------------------------------------------------------
  L('Comida y bebida: 想 y 要', {
    objetivo: `Decir qué quieres comer o beber, pedir en un comedor con ${zh("要", "yào")} y rechazar con cortesía con ${zh("不想", "bù xiǎng")}.`,
    explicacion: `
      <p>Con hambre o con sed, hay que saber pedir. Estas son las doce palabras de la lección; repasa ${zh("喝", "hē")}, ${zh("茶", "chá")} y ${zh("水", "shuǐ")}.</p>
      ${tabla([
        ['想', 'xiǎng', 'querer, tener ganas de', 'xiang3.m4a'], ['要', 'yào', 'querer, pedir', 'yao4.m4a'], ['吃', 'chī', 'comer', 'chi1.m4a'], ['饭', 'fàn', 'comida, arroz cocido', 'fan4.m4a'],
        ['米饭', 'mǐfàn', 'arroz cocido'], ['面条儿', 'miàntiáor', 'fideos'], ['饺子', 'jiǎozi', 'empanadillas rellenas', 'jiaozi3.m4a'], ['包子', 'bāozi', 'panecillo relleno al vapor'],
        ['鸡蛋', 'jīdàn', 'huevo'], ['牛奶', 'niúnǎi', 'leche', 'niunai23.m4a'], ['菜', 'cài', 'verdura, plato'], ['好吃', 'hǎochī', 'sabroso'],
      ])}
      <h3>${zh("想", "xiǎng")} y ${zh("要", "yào")}</h3>
      <p>Las dos significan «querer», pero no suenan igual. Según ChinGram, de la Universidad Palacký, ${zh("要", "yào")} suena más decidido y directo; ${zh("想", "xiǎng")} expresa una intención o un deseo pensado, y suena menos directo y más cortés. Por eso, en una tienda o un comedor, ${zh("要", "yào")} es lo que se usa para pedir.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Palabra</th><th scope="col">Con verbo</th><th scope="col">Con una cosa</th></tr>
        <tr><th scope="row">${zh("想", "xiǎng")}</th><td>${zh("我想吃饺子", "wǒ xiǎng chī jiǎozi")}</td><td></td></tr>
        <tr><th scope="row">${zh("要", "yào")}</th><td>${zh("我要吃饭", "wǒ yào chī fàn")}</td><td>${zh("我要一杯茶", "wǒ yào yì bēi chá")}</td></tr>
      </table></div>
      <h3>${zh("要", "yào")}: verbo o cosa</h3>
      <p>ChinGram dice que ${zh("要", "yào")} con otro verbo expresa un deseo fuerte. Kapiolani añade que ${zh("要", "yào")} con un sustantivo sirve para pedir comida en un restaurante o una tienda. Una frase para pedir: ${zh("我要饺子", "wǒ yào jiǎozi")}. Y si quieres dos cosas, ${zh("和", "hé")} las une: ${zh("我要饺子和牛奶", "wǒ yào jiǎozi hé niúnǎi")}.</p>
      <h3>Qué comer y qué beber</h3>
      <p>${zh("吃", "chī")} va con comida, y ${zh("喝", "hē")}, que ya conoces, con bebidas: ${zh("我想喝茶", "wǒ xiǎng hē chá")}, ${zh("你想喝什么", "nǐ xiǎng hē shénme")}. ${zh("饭", "fàn")} es la comida en general, y ${zh("米饭", "mǐfàn")} el arroz cocido. Con ${zh("鸡蛋", "jīdàn")} y ${zh("包子", "bāozi")} se puede contar: ${zh("我要一个鸡蛋", "wǒ yào yí gè jīdàn")}, ${zh("我要两个包子", "wǒ yào liǎng gè bāozi")}. Y ${zh("菜", "cài")} puede ser una verdura o un plato.</p>
      <h3>Medidas para beber</h3>
      <p>Con las bebidas se usa ${zh("杯", "bēi")}, «vaso» o «taza», un recipiente con líquido. El sílabo la llama medida prestada, y ChinGram da ${zh("一杯茶", "yì bēi chá")}. Es un clasificador como los de "Clasificadores: ${zh("个")} y otros": ${zh("我要一杯水", "wǒ yào yì bēi shuǐ")}. Con ${zh("一", "yī")} ante ${zh("杯", "bēi")} se dice yì.</p>
      <h3>Rechazar con cortesía</h3>
      <p>Para decir que no quieres, ChinGram recomienda ${zh("不想", "bù xiǎng")}: es la negativa habitual y más cortés que ${zh("不要", "búyào")}. Esa palabra existe, pero sobre todo para decir «no hagas»; solo anótala: ${zh("我不想吃米饭", "wǒ bù xiǎng chī mǐfàn")}. Se responde igual que se pregunta: ${zh("你想吃什么", "nǐ xiǎng chī shénme")} pide ${zh("我想吃面条儿", "wǒ xiǎng chī miàntiáor")}, y ${zh("你要什么", "nǐ yào shénme")} pide ${zh("我要牛奶", "wǒ yào niúnǎi")}. Para elogiar, ${zh("好吃", "hǎochī")}: ${zh("这个菜很好吃", "zhège cài hěn hǎochī")}.</p>
      <h3>Cierre de la unidad</h3>
      <p>Una conversación con familia, hora, lugar, precio y comida:</p>
      <ul>
        <li>Luis: ${zh("现在十二点半，你想吃什么", "xiànzài shí'èr diǎn bàn, nǐ xiǎng chī shénme")}</li>
        <li>Ana: ${zh("我想吃饺子。我哥哥在那儿，他也想吃饺子", "wǒ xiǎng chī jiǎozi. wǒ gēge zài nàr, tā yě xiǎng chī jiǎozi")}</li>
        <li>Luis: ${zh("饺子多少钱", "jiǎozi duōshao qián")}</li>
        <li>Ana: ${zh("十二块，很便宜", "shí'èr kuài, hěn piányi")}</li>
        <li>Luis: ${zh("好，我要饺子和牛奶。你要喝什么", "hǎo, wǒ yào jiǎozi hé niúnǎi. nǐ yào hē shénme")}</li>
        <li>Ana: ${zh("我要一杯茶", "wǒ yào yì bēi chá")}</li>
      </ul>`,
    ejemplo: `
      <p>Las frases de ejemplo de la lección son nuestras. Ana y su papá están en un comedor.</p>
      <ol class="pasos-ej">
        <li>El mesero pregunta: ${zh("你想吃什么", "nǐ xiǎng chī shénme")}.</li>
        <li>Ana responde con ${zh("想", "xiǎng")}: ${zh("我想吃饺子", "wǒ xiǎng chī jiǎozi")}.</li>
        <li>Para el huevo, usa ${zh("个", "gè")}: ${zh("我要一个鸡蛋", "wǒ yào yí gè jīdàn")}.</li>
        <li>Su papá prefiere fideos: ${zh("我爸爸想吃面条儿", "wǒ bàba xiǎng chī miàntiáor")}.</li>
        <li>Para pedir la bebida, Ana usa ${zh("要", "yào")}: ${zh("我要一杯茶", "wǒ yào yì bēi chá")}.</li>
      </ol>
      <p>Comprueba: ${zh("想", "xiǎng")} y ${zh("要", "yào")} van antes del verbo o de la cosa, y ${zh("杯", "bēi")} va entre el número y ${zh("茶", "chá")}. Resultado: <span class="resultado">${zh("我要一杯茶", "wǒ yào yì bēi chá")} = «quiero una taza de té»</span>.</p>
      <p class="nota"><strong>Error común:</strong> decir ${zh("我要一茶", "wǒ yào yì chá")}, sin medida. Entre el número y la bebida va ${zh("杯", "bēi")}.</p>`,
    vidaReal: `
      <p>Pedir comida es una de las primeras cosas que haces en otro país:</p>
      <ul>
        <li>Decir qué te gustaría comer cuando te preguntan.</li>
        <li>Pedir una bebida en un comedor.</li>
        <li>Rechazar con cortesía algo que no quieres.</li>
        <li>Entender lo que ofrece un menú sencillo.</li>
        <li>Decir que algo está sabroso.</li>
        <li>Pedir dos cosas a la vez sin confundirte.</li>
        <li>Preguntarle a un amigo qué quiere almorzar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «¿qué quieres comer?».</p>',
        respuesta: ['你', '想', '吃', '什么'], pinyin: ['nǐ', 'xiǎng', 'chī', 'shénme'], lang: 'zh-Hans',
        pista: '<p>' + zh("什么", "shénme") + ' ocupa el lugar de la comida.</p>',
        solucion: `<p>${zh("你想吃什么", "nǐ xiǎng chī shénme")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para pedir «quiero una taza de té».</p>',
        respuesta: ['我', '要', '一', '杯', '茶'], pinyin: ['wǒ', 'yào', 'yì', 'bēi', 'chá'], lang: 'zh-Hans',
        pista: '<p>' + zh("杯", "bēi") + ' va entre el número y la bebida.</p>',
        solucion: `<p>${zh("我要一杯茶", "wǒ yào yì bēi chá")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres pedir en un comedor, con decisión y de forma directa. ¿Qué palabra usas?</p>',
        opciones: [zh('想', 'xiǎng'), zh('要', 'yào'), zh('不想', 'bù xiǎng'), zh('不要', 'búyào')], correcta: 1,
        pista: '<p>Una suena más decidida y directa; otra, más suave.</p>',
        solucion: `<p>${zh("要", "yào")} suena más decidido y directo; ${zh("想", "xiǎng")}, más suave.</p>` },
      { tipo: 'opciones', escucha: { voz: '饺子', audio: a('jiaozi3.m4a') },
        sinAudio: '<p>Se dice <strong>jiǎozi</strong>: la primera sílaba baja y sube (tercer tono) y la segunda es corta y suave.</p>',
        enunciado: '<p>Escucha la palabra. ¿Qué es?</p>',
        opciones: ['Fideos', 'Empanadillas rellenas', 'Huevo', 'Leche'], correcta: 1,
        pista: '<p>Es lo que Ana pide en el diálogo.</p>',
        solucion: `<p>Se oye ${zh("饺子", "jiǎozi")}, empanadillas rellenas.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("饭", "fàn")} con su marca de tono.</p>`,
        respuestas: ['fàn'],
        pista: '<p>El tono cae de golpe.</p>',
        solucion: `<p>${zh("饭", "fàn")}: <strong>fàn</strong>, cuarto tono.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres rechazar con cortesía «no quiero comer arroz». ¿Cuál frase eliges?</p>',
        opciones: [zh('我不想吃米饭', 'wǒ bù xiǎng chī mǐfàn'), zh('我不要吃米饭', 'wǒ búyào chī mǐfàn'), zh('我没有米饭', 'wǒ méiyǒu mǐfàn'), zh('我是米饭', 'wǒ shì mǐfàn')], correcta: 0,
        pista: '<p>La negativa más cortés es la que lleva ' + zh("想", "xiǎng") + '.</p>',
        solucion: `<p>${zh("不想", "bù xiǎng")} es la negativa habitual y más cortés.</p>` },
    ],
    fuentes: [SILABO, AUDIO, CHIN_XIANG, CHIN_YAO, KAP_YAO, CHIN_CLAS],
  });
})();
