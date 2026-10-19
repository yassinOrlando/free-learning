// Mandarín · Unidad 12: HSK 4 · China y su cultura.
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
  const DART = (n, slug, nota) => ({ nombre: `Dartmouth College (EE. UU.), Snapshots of China, lección ${n}: ${nota} (en inglés)`, url: `https://sites.dartmouth.edu/snapshotsofchina/${slug}/` });
  const ALLSET = (n, url) => ({ nombre: 'Chinese Grammar Wiki (AllSet Learning), fuente de apoyo no universitaria: ' + n + ' (en inglés)', url: 'https://resources.allsetlearning.com/chinese/grammar/' + url });
  const DART_18 = DART(18, '%e7%ac%ac%e5%8d%81%e5%85%ab%e8%af%be-lesson-18', 'notas sobre las preposiciones de agente y los adverbios de totalidad');
  const DART_13 = DART(13, '%e7%ac%ac%e5%8d%81%e4%b8%89%e8%af%be-lesson-13', 'notas sobre expresiones de tiempo');
  const DART_26 = DART(26, 'new-2', 'glosario');
  const DART_12 = DART(12, '%e7%ac%ac%e5%8d%81%e4%ba%8c%e8%af%be-lesson-12', 'glosario de la lección 12');
  const DART_14 = DART(14, '%e7%ac%ac%e5%8d%81%e5%9b%9b%e8%af%be-lesson-14', 'glosario de la lección 14');
  const DART_9 = DART(9, '%e7%ac%ac%e4%b9%9d%e8%af%be-lesson-9', 'ejemplos y glosas');
  const DART_10 = DART(10, '%e7%ac%ac%e5%8d%81%e8%af%be-lesson-10', 'notas de gramática');
  const DART_23 = DART(23, '%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%b8%89%e8%af%be-lesson-23', 'ejemplo de una negación enfática');
  const DART_16 = DART(16, '%e7%ac%ac%e5%8d%81%e5%85%ad%e8%af%be-lesson-16', 'ejemplo de un adverbio de grado');
  const DART_29 = DART(29, '%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%b9%9d%e8%af%be-lesson-29', 'texto con un ejemplo de «uno de»');
  const ALLSET_QUAN = ALLSET('Indicating the whole with "quan"', 'Indicating_the_whole_with_%22quan%22');
  const ALLSET_ZICONG = ALLSET('Expressing "ever since" with "zicong"', 'Expressing_%22ever_since%22_with_%22zicong%22');
  const ALLSET_DANG = ALLSET('Expressing "when" using "dang"', 'ASG75EE1');
  const ALLSET_DENG = ALLSET('Non-exhaustive lists with "dengdeng"', 'ASGF763H');
  const ALLSET_UNO = ALLSET('Expressing "one by one" with "yi"', 'Expressing_%22one_by_one%22_with_%22yi%22');
  const ALLSET_BUGUO = ALLSET('A softer "but" with "buguo"', 'ASGA0S4T');
  const ALLSET_SHI = ALLSET('Conceding a point with "shi"', 'ASGT9Y8P');
  const ALLSET_GOU = ALLSET('Expressing "enough" with "gou"', 'ASG49BE6');
  const ALLSET_ZHIHAO = ALLSET('Declaring the only option with "zhihao"', 'ASG767A2');
  const ALLSET_ZHENGHAO = ALLSET('Coincidence with "zhenghao"', 'ASGUD25J');
  const ALLSET_BING = ALLSET('Emphasizing a negation with "bing"', 'ASGUQUPG');
  const ALLSET_LINGWAI = ALLSET('Expressing "in addition" with "lingwai"', 'ASG2KQZI');
  const ALLSET_HAI = ALLSET('Advanced uses of "hai"', 'ASG4807F');
  const ALLSET_DEI = ALLSET('Expressing "must" with "dei"', '%22Must%22_modal_%22dei%22');
  const ALLSET_A = ALLSET('Sentence-final interjection "a"', 'Sentence-final_interjection_%22a%22');
  const ALLSET_INTERJ = ALLSET('Interjection', 'Interjection');
  const ALLSET_ZHIYI = ALLSET('Expressing "one of" with "zhiyi"', '%22One_of%22_with_%22%E2%80%A6zhi_yi%22');
  const CHINGRAM_YIGONG = { nombre: 'ChinGram, Universidad Palacký de Olomouc (Chequia), Adverb yígòng «altogether, in total» (en inglés)', url: 'https://chingram.upol.cz/grammar/adverb-yigong-%e4%b8%80%e5%85%b1-altogether-in-total' };
  const OXFORD_MW = { nombre: 'Centre for Teaching Chinese as a Foreign Language, Universidad de Oxford (Reino Unido), Measure words, ejercicios (en inglés)', url: 'https://www.ctcfl.ox.ac.uk/materials_grammar-exercises_measure-words/' };
  const OXFORD_PRENSA = { nombre: 'Centre for Teaching Chinese as a Foreign Language, Universidad de Oxford (Reino Unido), Newspaper reading grammar notes (en inglés)', url: 'https://www.ctcfl.ox.ac.uk/materials_grammar-exercises_newspaperreadinggrammarnotes/' };
  const MIT = { nombre: 'MIT OpenCourseWare (EE. UU.), J. K. Wheatley, Learning Chinese: A Foundation Course in Mandarin (2011, en inglés)', url: 'https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/res21g_003_s_11.pdf' };
  const GOV_DIV = { nombre: 'Consejo de Estado de China (english.www.gov.cn), China ABC: Administrative Division (2014, en inglés)', url: 'https://english.www.gov.cn/archive/china_abc/2014/08/27/content_281474983873401.htm' };
  const EMB_RIOS = { nombre: 'Embajada de China en Nepal (Ministerio de Asuntos Exteriores), China ABC: Major Rivers (2004, en inglés)', url: 'https://np.china-embassy.gov.cn/eng/ChinaABC/dl/200410/t20041027_1998279.htm' };
  const EMB_CAPITAL = { nombre: 'Embajada de China en la India (Ministerio de Asuntos Exteriores), About China: National Capital (2010, en inglés)', url: 'https://in.china-embassy.gov.cn/eng/zggk/201010/t20101021_2234761.htm' };
  const GOV_LENGUA = { nombre: 'Gobierno de China (gov.cn), Gaceta del Consejo de Estado 2001: Ley de la Lengua y Escritura Comunes Nacionales (en chino)', url: 'https://www.gov.cn/gongbao/content/2001/content_61066.htm' };
  const GOV_FIESTAS = { nombre: 'Gobierno de China (gov.cn), Decisión del Consejo de Estado que modifica las Medidas de vacaciones de fiestas y conmemoraciones nacionales (2024, en chino)', url: 'https://www.gov.cn/zhengce/zhengceku/202411/content_6986381.htm' };
  const UNESCO_DRAGON = { nombre: 'UNESCO, Patrimonio Cultural Inmaterial: Dragon Boat festival (2009, en inglés)', url: 'https://ich.unesco.org/en/RL/dragon-boat-festival-00225' };
  const GOLD_QINGMING = { nombre: 'Instituto Confucio de Goldsmiths, Universidad de Londres, The Origin and Custom of Qingming Festival (2021, en inglés)', url: 'https://sites.gold.ac.uk/confucius-institute/the-origin-and-custom-of-qingming-festival/' };
  const BEIJING_CENTER = { nombre: 'The Beijing Center (programa universitario de estudios chinos), Lantern Festival (2022, en inglés; fuente de apoyo)', url: 'https://thebeijingcenter.org/cultural-dialogues/lantern-festival/' };
  const TEXAS = { nombre: 'Texas Tech University (EE. UU.), Chinese Culture (Pressbooks): 1. Chinese Culinary (en inglés)', url: 'https://raider.pressbooks.pub/chineseculture/chapter/235/' };
  const COLUMBIA = { nombre: 'Universidad de Columbia (EE. UU.), Asia for Educators: China\'s Food and Geography (en inglés)', url: 'https://afe.easia.columbia.edu/china/geog/food_ck.htm' };
  const UNESCO_OPERA = { nombre: 'UNESCO, Patrimonio Cultural Inmaterial: Peking opera (2010, en inglés)', url: 'https://ich.unesco.org/en/RL/peking-opera-00418' };
  const UNESCO_TAIJI = { nombre: 'UNESCO, Patrimonio Cultural Inmaterial: Taijiquan (2020, en inglés)', url: 'https://ich.unesco.org/en/RL/taijiquan-00424' };
  const STATE_DEPT = { nombre: 'Office of the Historian, Departamento de Estado de EE. UU., Milestones: Rapprochement with China, 1972 (en inglés)', url: 'https://history.state.gov/milestones/1969-1976/rapprochement-china' };
  const MTSU = { nombre: 'Jun Da, Middle Tennessee State University (EE. UU.), The distribution of four-character idioms in Chinese news texts (en inglés)', url: 'https://lingua.mtsu.edu/chinese-computing/newscorpus/chengyu/DaJun_6thPedagogy.pdf' };
  const WIKI_CHENGYU = { nombre: 'Wikipedia (fuente de apoyo): Chengyu (en inglés)', url: 'https://en.wikipedia.org/wiki/Chengyu' };
  const LSE = { nombre: 'London School of Economics (Reino Unido), Confucius Institute for Business: «论语十则», frase de la semana (en chino e inglés)', url: 'https://www.lse.ac.uk/cibl/assets/documents/resources/sentence-of-the-week/%E8%AE%BA%E8%AF%AD%E5%8D%81%E5%88%99.pdf' };
  const WIKI_ANALECTS = { nombre: 'Wikipedia (fuente de apoyo): Analects (en inglés)', url: 'https://en.wikipedia.org/wiki/Analects' };
  const MOE_YIXIN = { nombre: 'Ministerio de Educación de Taiwán, 《成語典》2020: 一心一意 (en chino; diccionario oficial)', url: 'https://dict.idioms.moe.edu.tw/idiomView.jsp?ID=1324&webMd=1&la=0' };
  const MOE_BANTU = { nombre: 'Ministerio de Educación de Taiwán, 《成語典》2020: 半途而廢 (en chino; diccionario oficial)', url: 'https://dict.idioms.moe.edu.tw/idiomView.jsp?ID=152&webMd=1&la=0' };
  const WIKT_WUYOU = { nombre: 'Wikcionario en inglés (fuente de apoyo): 無憂無慮 / 无忧无虑', url: 'https://en.wiktionary.org/wiki/%E7%84%A1%E6%86%82%E7%84%A1%E6%85%AE' };
  const WIKT_YOUSHUO = { nombre: 'Wikcionario en inglés (fuente de apoyo): 有說有笑 / 有说有笑', url: 'https://en.wiktionary.org/wiki/%E6%9C%89%E8%AA%AA%E6%9C%89%E7%AC%91' };
  const WIKT_SANXIN = { nombre: 'Wikcionario en inglés (fuente de apoyo): 三心二意', url: 'https://en.wiktionary.org/wiki/%E4%B8%89%E5%BF%83%E4%BA%8C%E6%84%8F' };

  // ------------------------------------------------------------------
  L('Geografía de China: capital y provincias', {
    objetivo: `Hablar de dónde está un lugar y de cuántos son con ${zh("全", "quán")}, ${zh("一共", "yígòng")}, ${zh("由", "yóu")}, ${zh("自", "zì")} y ${zh("此", "cǐ")}, y conocer datos básicos de la geografía de China.`,
    explicacion: `
      <p>Esta unidad cierra HSK 4 con cultura de China. El sílabo oficial de HSK 4 tiene muchas más palabras; aquí hay una selección y la lista completa está en el <a href="${encodeURI(SILABO.url)}">sílabo</a>. Las frases de ejemplo son de la lección. La voz depende de tu dispositivo: si suena rara, el pinyin manda.</p>
      <p>Imagina que miras un mapa con un amigo y cada uno dice algo:</p>
      <ul>
        <li>${zh("北京是中国的首都", "Běijīng shì Zhōngguó de shǒudū")}: «Pekín es la capital de China».</li>
        <li>${zh("我的家乡在北部", "wǒ de jiāxiāng zài běibù")}: «Mi tierra natal está en el norte».</li>
        <li>${zh("他家在农村，我家在市区", "tā jiā zài nóngcūn, wǒ jiā zài shìqū")}: «Su casa está en el campo; la mía, en la ciudad».</li>
      </ul>
      ${tabla([
        ['首都', 'shǒudū', 'capital (de un país)'], ['民族', 'mínzú', 'pueblo, grupo étnico'], ['江', 'jiāng', 'río grande'], ['西部', 'xībù', 'parte del oeste'], ['东部', 'dōngbù', 'parte del este'],
        ['南部', 'nánbù', 'parte del sur'], ['北部', 'běibù', 'parte del norte'], ['城', 'chéng', 'ciudad, muralla de una ciudad'], ['市区', 'shìqū', 'zona urbana, centro de la ciudad'], ['农村', 'nóngcūn', 'campo, zona rural'],
        ['家乡', 'jiāxiāng', 'tierra natal, lugar de donde eres'], ['亚洲', 'yàzhōu', 'Asia'], ['各地', 'gèdì', 'cada lugar, distintas partes del país'], ['省', 'shěng', 'provincia'], ['普通话', 'pǔtōnghuà', 'mandarín estándar, la lengua común'],
      ])}
      <h3>¿Qué hay en el mapa de China?</h3>
      <p>Según la embajada de China en la India (2010), Pekín es la capital de la República Popular China desde 1949. Según el gobierno chino (2014), el país tiene 34 divisiones de nivel provincial: provincias, regiones autónomas, municipios y regiones administrativas especiales. La palabra ${zh("省", "shěng")} nombra a una de esas divisiones, la provincia. Según la embajada de China en Nepal (2004), el río Yangtsé, ${zh("长江", "Cháng Jiāng")}, mide 6300 km y el río Amarillo, ${zh("黄河", "Huáng Hé")}, 5464 km. Como simplificación de la lección, ${zh("-部", "bù")} al final de una palabra significa «parte»: ${zh("东部", "dōngbù")} es la parte del este.</p>
      <p>Del idioma, la Ley de la Lengua y Escritura Comunes Nacionales (publicada en 2001, gov.cn) dice que el ${zh("普通话", "pǔtōnghuà")} y los caracteres normalizados son la lengua y la escritura comunes del país, y que cada pueblo, ${zh("民族", "mínzú")}, tiene libertad para usar y desarrollar su propia lengua y escritura.</p>
      <h3>¿Cómo dices «todo» y «en total»?</h3>
      <p>Para hablar de todo un grupo sin dejar a nadie, usas ${zh("全", "quán")}. Dartmouth lo presenta como un <strong>adverbio de totalidad</strong>: indica que no hay excepciones, y lo normal es que el grupo vaya antes y ${zh("都", "dōu")} después. AllSet añade que ${zh("全", "quán")} se pone justo delante del sustantivo y no admite ${zh("的", "de")}: ${zh("我们全家都住在农村", "wǒmen quán jiā dōu zhù zài nóngcūn")}, «toda nuestra familia vive en el campo». Para sumar, está ${zh("一共", "yígòng")}: ChinGram dice que da un total exacto, no aproximado, y que va delante de la cantidad: ${zh("我们班一共有二十个同学", "wǒmen bān yígòng yǒu èrshí ge tóngxué")}, «en nuestra clase somos veinte en total».</p>
      <h3>¿Cómo dices «por» y «desde»?</h3>
      <p>Dartmouth explica que ${zh("由", "yóu")} es una <strong>preposición</strong> que presenta a quien hace la acción, y que no se acentúa: lo que se destaca es el sustantivo que le sigue. Por eso ${zh("今天的饭由我来做", "jīntiān de fàn yóu wǒ lái zuò")} es «la comida de hoy la hago yo». Para «desde», AllSet dice que ${zh("自", "zì")} es la forma más formal de ${zh("从", "cóng")}, y que ${zh("自从", "zìcóng")} solo habla del tiempo: ${zh("自从我搬到市区，我就很少回家乡", "zìcóng wǒ bān dào shìqū, wǒ jiù hěn shǎo huí jiāxiāng")}, «desde que me mudé a la ciudad, vuelvo poco a mi tierra».</p>
      <h3>Una palabra escrita y de uso formal</h3>
      <p>El sílabo pone ${zh("此", "cǐ")} entre los <strong>pronombres demostrativos</strong>: significa «esto». Dartmouth la muestra dentro de ${zh("从此", "cóngcǐ")}, «desde este momento», que suele ir seguido de una frase con verbo.</p>
      <p class="nota"><strong>Trampa común:</strong> escribir ${zh("全的家", "quán de jiā")}. ${zh("全", "quán")} no admite ${zh("的", "de")}.</p>`,
    ejemplo: `
      <p>Sofía quiere decir: «Toda mi clase vive en el campo; somos ocho en total». Vamos por partes.</p>
      <ol class="pasos-ej">
        <li>Parte de lo básico: ${zh("我们住在农村", "wǒmen zhù zài nóngcūn")}, «vivimos en el campo».</li>
        <li>Para decir «toda la clase», pon ${zh("全", "quán")} delante de ${zh("班", "bān")} y ${zh("都", "dōu")} antes del verbo: ${zh("我们全班都住在农村", "wǒmen quán bān dōu zhù zài nóngcūn")}.</li>
        <li>Para dar el total, escribe ${zh("一共", "yígòng")} justo antes de la cantidad: ${zh("一共八个同学", "yígòng bā ge tóngxué")}.</li>
        <li>Une las dos ideas con una coma: ${zh("我们全班都住在农村，一共八个同学", "wǒmen quán bān dōu zhù zài nóngcūn, yígòng bā ge tóngxué")}.</li>
      </ol>
      <p>Para comprobar, verifica que ${zh("全", "quán")} no lleve ${zh("的", "de")} y que ${zh("一共", "yígòng")} esté pegado al número. Resultado: <span class="resultado">${zh("我们全班都住在农村，一共八个同学", "wǒmen quán bān dōu zhù zài nóngcūn, yígòng bā ge tóngxué")} = «toda nuestra clase vive en el campo; somos ocho en total»</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar ${zh("一共", "yígòng")} para una cifra aproximada. Es solo para totales exactos.</p>`,
    vidaReal: `
      <p>Con estas palabras entiendes cómo se habla de lugares y de cuántos son:</p>
      <ul>
        <li>Leer una noticia o un mapa que nombra la capital, el norte o el oeste de un país.</li>
        <li>Decir de dónde eres: de una ciudad o del campo.</li>
        <li>Contar a cuántos invitados esperas en total.</li>
        <li>Entender quién se encarga de qué en un grupo.</li>
        <li>Notar cuándo un texto usa una forma más formal de «desde».</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «hay ocho compañeros en total».</p>',
        respuesta: ['我们', '一共', '有', '八个同学'], pinyin: ['wǒmen', 'yígòng', 'yǒu', 'bā ge tóngxué'], lang: 'zh-Hans',
        pista: `<p>${zh("一共", "yígòng")} va delante de la cantidad.</p>`,
        solucion: `<p>${zh("我们一共有八个同学", "wǒmen yígòng yǒu bā ge tóngxué")}: sujeto, ${zh("一共", "yígòng")}, verbo y cantidad.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «toda mi familia vive en el campo». ¿Qué frase está bien?</p>',
        opciones: [zh('我全的家都住在农村', 'wǒ quán de jiā dōu zhù zài nóngcūn'), zh('我家都全住在农村', 'wǒ jiā dōu quán zhù zài nóngcūn'), zh('我全家都住在农村', 'wǒ quán jiā dōu zhù zài nóngcūn'), zh('全我家住在农村都', 'quán wǒ jiā zhù zài nóngcūn dōu')], correcta: 2,
        pista: `<p>${zh("全", "quán")} va pegado al sustantivo y sin ${zh("的", "de")}.</p>`,
        solucion: `<p>${zh("全家", "quán jiā")} es «toda la familia», y ${zh("都", "dōu")} va después, antes del verbo.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("今天的饭由我来做", "jīntiān de fàn yóu wǒ lái zuò")}?</p>`,
        opciones: ['La comida de hoy la hago yo', 'Hoy me hicieron la comida', 'Hoy no hay comida', 'Hoy comemos fuera'], correcta: 0,
        pista: `<p>${zh("由", "yóu")} presenta a quien hace la acción.</p>`,
        solucion: `<p>${zh("由我来做", "yóu wǒ lái zuò")} significa «lo hago yo»: ${zh("由", "yóu")} señala quién se encarga.</p>` },
      { tipo: 'opciones', enunciado: '<p>Según el gobierno chino (2014), ¿cuántas divisiones de nivel provincial tiene China?</p>',
        opciones: ['12', '34', '56', '90'], correcta: 1,
        pista: '<p>Son provincias, regiones autónomas, municipios y regiones administrativas especiales.</p>',
        solucion: '<p>Según el gobierno chino (2014), son 34 divisiones de nivel provincial. Revisa el dato vigente.</p>' },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("首都")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['shǒu dū'],
        pista: '<p>La primera sílaba baja y sube; la segunda empieza alta y se mantiene.</p>',
        solucion: `<p>${zh("首都", "shǒudū")}: <strong>shǒu dū</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("农村", "nóngcūn")}.</p>`,
        respuestas: ['campo', 'el campo', 'zona rural', 'la zona rural', 'area rural', 'pueblo', 'rural', 'campo rural'],
        pista: '<p>Es lo contrario de la ciudad.</p>',
        solucion: `<p>${zh("农村", "nóngcūn")} es «campo» o «zona rural».</p>` },
    ],
    fuentes: [SILABO, DART_18, DART_13, DART_12, DART_14, ALLSET_QUAN, ALLSET_ZICONG, CHINGRAM_YIGONG, GOV_DIV, EMB_RIOS, EMB_CAPITAL, GOV_LENGUA],
  });

  // ------------------------------------------------------------------
  L('Fiestas tradicionales y costumbres', {
    objetivo: `Hablar de una fiesta con ${zh("等", "děng")}, ${zh("当…的时候", "dāng… de shíhou")}, ${zh("场", "chǎng")}, ${zh("顿", "dùn")} y ${zh("一个一个", "yí gè yí gè")}, y conocer tres fiestas más de China.`,
    explicacion: `
      <p>En la lección «Festividades y cultura china» viste el Año Nuevo y el Festival de Medio Otoño; aquí no se repiten. Las frases de ejemplo son de la lección. Imagina que una amiga te cuenta cómo celebra:</p>
      <ul>
        <li>${zh("我们举行聚会，一起庆祝节日", "wǒmen jǔxíng jùhuì, yìqǐ qìngzhù jiérì")}: «Hacemos una reunión y celebramos juntos la fiesta».</li>
        <li>${zh("大家一起干杯", "dàjiā yìqǐ gānbēi")}: «Todos brindamos juntos».</li>
        <li>${zh("我喜欢回忆暑假的聚餐", "wǒ xǐhuan huíyì shǔjià de jùcān")}: «Me gusta recordar las cenas de las vacaciones de verano».</li>
      </ul>
      ${tabla([
        ['庆祝', 'qìngzhù', 'celebrar'], ['节假日', 'jiéjiàrì', 'días festivos y vacaciones'], ['红包', 'hóngbāo', 'sobre rojo (para regalar dinero)'], ['月饼', 'yuèbing', 'pastel de luna'], ['聚会', 'jùhuì', 'reunión, fiesta; reunirse'],
        ['聚餐', 'jùcān', 'comida o cena en grupo'], ['活动', 'huódòng', 'actividad; moverse'], ['举行', 'jǔxíng', 'realizar (una ceremonia o reunión)'], ['举办', 'jǔbàn', 'organizar, celebrar (un evento)'], ['祝贺', 'zhùhè', 'felicitar'],
        ['祝', 'zhù', 'desear'], ['干杯', 'gānbēi', 'brindar; salud'], ['寒假', 'hánjià', 'vacaciones de invierno'], ['暑假', 'shǔjià', 'vacaciones de verano'], ['回忆', 'huíyì', 'recordar; recuerdo'],
      ])}
      <h3>¿Qué otras fiestas hay?</h3>
      <p>El gobierno de China (2024) fijó, con efecto desde 2025, días de descanso para toda la población en la fiesta de Año Nuevo, el Festival de Qingming, el Festival del Barco Dragón y el de Medio Otoño, entre otros. Aquí van tres fiestas más, que aparecen en la tabla.</p>
      ${cuadro(['Fiesta', 'Cuándo', 'Qué se hace'], [
        ['Barco Dragón', 'Día 5 del quinto mes lunar (UNESCO, 2009).', 'Regatas de dragón y bolas de arroz envueltas.'],
        ['Qingming', 'Alrededor del 5 de abril; es un término solar, no una fecha lunar (Instituto Confucio de Goldsmiths, 2021).', 'Barrer las tumbas y honrar a los antepasados.'],
        ['Faroles', 'Día 15 del primer mes lunar (The Beijing Center, 2022, apoyo).', 'Acertijos en los faroles y bolitas de arroz glutinoso.'],
      ])}
      <p>La UNESCO inscribió el Barco Dragón en 2009 como patrimonio cultural inmaterial de la humanidad. Y Qingming, según el Instituto Confucio de Goldsmiths, es el único de los 24 términos solares que además es una fiesta.</p>
      <h3>¿Cómo dices «y otros»?</h3>
      <p>Para dar ejemplos sin nombrarlos todos, AllSet explica que ${zh("等", "děng")} cierra una lista y equivale a «etcétera», un poco más formal. Va al final: ${zh("苹果、西瓜等水果", "píngguǒ, xīguā děng shuǐguǒ")}, «manzanas, sandías y otras frutas». Si después viene una categoría, se usa solo ${zh("等", "děng")}. Ojo: Dartmouth muestra otro ${zh("等", "děng")}, «esperar a que», con ${zh("的时候", "de shíhou")} o ${zh("以后", "yǐhòu")}; es otra palabra.</p>
      <h3>¿Cómo dices «cuando»?</h3>
      <p>AllSet dice que ${zh("当", "dāng")} más una frase y ${zh("的时候", "de shíhou")} significa «cuando», casi igual que ${zh("时候", "shíhou")} solo: ${zh("当朋友们聚餐的时候，大家都很高兴", "dāng péngyoumen jùcān de shíhou, dàjiā dōu hěn gāoxìng")}, «cuando los amigos cenan juntos, todos están contentos». La parte con ${zh("当", "dāng")} va primero.</p>
      <h3>¿Cómo cuentas una lluvia o una comida?</h3>
      <p>Los <strong>clasificadores verbales</strong> cuentan cuántas veces ocurre algo. Oxford dice que ${zh("场", "chǎng")} se usa para lo que dura poco, como una lluvia o una función: ${zh("下了一场雨", "xià le yì chǎng yǔ")}; y ${zh("顿", "dùn")} para acciones breves, como una comida: ${zh("吃了一顿饭", "chī le yí dùn fàn")}.</p>
      <h3>¿Cómo dices «uno por uno»?</h3>
      <p>AllSet da la forma: ${zh("一", "yī")}, un clasificador, ${zh("一", "yī")} y el mismo clasificador. ${zh("一个一个", "yí gè yí gè")} es «uno por uno»; ${zh("一天一天", "yì tiān yì tiān")} es «día a día»; ${zh("一点一点", "yì diǎn yì diǎn")} es «poco a poco». Por ejemplo, ${zh("红包一个一个地发", "hóngbāo yí gè yí gè de fā")}, «los sobres se reparten uno por uno».</p>
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("顿", "dùn")} para una lluvia. Para lluvias y funciones va ${zh("场", "chǎng")}.</p>`,
    ejemplo: `
      <p>Lina quiere decir: «Cuando los amigos hacen una cena, comemos una buena comida, manzanas, sandías y otras frutas».</p>
      <ol class="pasos-ej">
        <li>Parte de la idea principal: ${zh("我们吃了一顿饭", "wǒmen chī le yí dùn fàn")}, «comimos una comida».</li>
        <li>Para dar frutas sin nombrarlas todas, escribe la lista y cierra con ${zh("等", "děng")}: ${zh("苹果、西瓜等水果", "píngguǒ, xīguā děng shuǐguǒ")}.</li>
        <li>Para decir «cuando», empieza con ${zh("当", "dāng")} y cierra la parte con ${zh("的时候", "de shíhou")}: ${zh("当朋友们聚餐的时候", "dāng péngyoumen jùcān de shíhou")}.</li>
        <li>Une todo: ${zh("当朋友们聚餐的时候，我们吃了一顿饭，还有苹果、西瓜等水果", "dāng péngyoumen jùcān de shíhou, wǒmen chī le yí dùn fàn, hái yǒu píngguǒ, xīguā děng shuǐguǒ")}.</li>
      </ol>
      <p>Para comprobar, busca que ${zh("当…的时候", "dāng… de shíhou")} vaya primero y que ${zh("等", "děng")} esté al final de la lista. Resultado: <span class="resultado">${zh("当朋友们聚餐的时候，我们吃了一顿饭，还有苹果、西瓜等水果", "dāng péngyoumen jùcān de shíhou, wǒmen chī le yí dùn fàn, hái yǒu píngguǒ, xīguā děng shuǐguǒ")} = «cuando los amigos cenan juntos, comemos y hay manzanas, sandías y otras frutas»</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner ${zh("等", "děng")} antes de la lista. Va después del último elemento.</p>`,
    vidaReal: `
      <p>Estas formas sirven cuando hablas de fiestas y reuniones:</p>
      <ul>
        <li>Contar cómo celebras una fecha especial y con quién.</li>
        <li>Dar ejemplos de comidas o costumbres sin enumerarlos todos.</li>
        <li>Decir cuándo ocurre algo: «cuando llegan los invitados».</li>
        <li>Entender un calendario de días festivos y vacaciones.</li>
        <li>Hablar de lo que se reparte o se hace de uno en uno, como los sobres rojos o los pasteles de luna.</li>
        <li>Recordar con alguien las vacaciones y las comidas en grupo de otros años.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «manzanas, sandías y otras frutas».</p>',
        respuesta: ['苹果', '西瓜', '等', '水果'], pinyin: ['píngguǒ', 'xīguā', 'děng', 'shuǐguǒ'], lang: 'zh-Hans',
        pista: `<p>${zh("等", "děng")} cierra la lista y va antes de la categoría.</p>`,
        solucion: `<p>${zh("苹果西瓜等水果", "píngguǒ xīguā děng shuǐguǒ")}: los elementos primero, luego ${zh("等", "děng")} y la categoría.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("当朋友们聚餐的时候，大家都很高兴", "dāng péngyoumen jùcān de shíhou, dàjiā dōu hěn gāoxìng")}?</p>`,
        opciones: ['Los amigos están contentos cuando cenan juntos', 'Los amigos cenaron y se fueron', 'Los amigos no quieren cenar', 'Los amigos cenan solo en verano'], correcta: 0,
        pista: `<p>${zh("当…的时候", "dāng… de shíhou")} significa «cuando».</p>`,
        solucion: `<p>${zh("当朋友们聚餐的时候", "dāng péngyoumen jùcān de shíhou")} es «cuando los amigos cenan juntos»; luego todos están contentos.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «hoy cayó una lluvia». ¿Qué clasificador va?</p>',
        opciones: [zh('今天下了一顿雨', 'jīntiān xià le yí dùn yǔ'), zh('今天下了一场雨', 'jīntiān xià le yì chǎng yǔ'), zh('今天下了一个雨', 'jīntiān xià le yí ge yǔ'), zh('今天下了一次雨', 'jīntiān xià le yí cì yǔ')], correcta: 1,
        pista: `<p>Oxford usa ${zh("场", "chǎng")} para lluvias y funciones.</p>`,
        solucion: `<p>${zh("下了一场雨", "xià le yì chǎng yǔ")}: ${zh("场", "chǎng")} cuenta algo que dura poco, como una lluvia.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("一点一点", "yì diǎn yì diǎn")}?</p>`,
        opciones: ['Uno por uno', 'Día a día', 'Poco a poco', 'Todos juntos'], correcta: 2,
        pista: `<p>${zh("点", "diǎn")} es una pequeña cantidad.</p>`,
        solucion: `<p>${zh("一点一点", "yì diǎn yì diǎn")} es «poco a poco»; ${zh("一个一个", "yí gè yí gè")} es «uno por uno».</p>` },
      { tipo: 'opciones', enunciado: '<p>Según el Instituto Confucio de Goldsmiths (2021), ¿qué tipo de fecha es Qingming?</p>',
        opciones: ['Un día fijo del calendario lunar', 'Un término solar, cerca del 5 de abril', 'El primer día del año', 'El día 15 del primer mes lunar'], correcta: 1,
        pista: '<p>Es el único término solar que también es fiesta.</p>',
        solucion: '<p>Qingming es un término solar y cae alrededor del 5 de abril. Revisa la fecha del año.</p>' },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("暑假", "shǔjià")}.</p>`,
        respuestas: ['vacaciones de verano', 'las vacaciones de verano', 'vacaciones del verano', 'verano vacaciones'],
        pista: `<p>Es la época más calurosa del año, cuando no hay clases.</p>`,
        solucion: `<p>${zh("暑假", "shǔjià")} son las «vacaciones de verano».</p>` },
    ],
    fuentes: [SILABO, DART_13, ALLSET_DANG, ALLSET_DENG, ALLSET_UNO, OXFORD_MW, GOV_FIESTAS, UNESCO_DRAGON, GOLD_QINGMING, BEIJING_CENTER],
  });

  // ------------------------------------------------------------------
  L('La comida de cada región', {
    objetivo: `Describir un sabor con ${zh("稍", "shāo")}, ${zh("够", "gòu")} y ${zh("X是X，就是…", "X shì X, jiùshì…")}, explicar un apuro con ${zh("只好", "zhǐhǎo")} y ${zh("正好", "zhènghǎo")}, y conocer cocinas regionales de China.`,
    explicacion: `
      <p>Imagina que comes con unos amigos en un restaurante y cada uno opina. Las frases de ejemplo son de la lección.</p>
      <ul>
        <li>${zh("这个汤味道很香", "zhège tāng wèidào hěn xiāng")}: «Esta sopa huele y sabe muy bien».</li>
        <li>${zh("这个菜辣是辣，就是很好吃", "zhège cài là shì là, jiùshì hěn hǎochī")}: «Este plato pica, sí, pero está muy rico».</li>
        <li>${zh("这个餐厅的小吃很有名", "zhège cāntīng de xiǎochī hěn yǒumíng")}: «Los bocadillos de este restaurante son famosos».</li>
      </ul>
      ${tabla([
        ['美食', 'měishí', 'comida deliciosa, gastronomía'], ['小吃', 'xiǎochī', 'bocadillo, comida ligera'], ['味道', 'wèidào', 'sabor'], ['辣', 'là', 'picante'], ['酸', 'suān', 'ácido, agrio'],
        ['咸', 'xián', 'salado'], ['香', 'xiāng', 'aromático, sabroso'], ['汤', 'tāng', 'sopa, caldo'], ['馒头', 'mántou', 'pan al vapor'], ['茶叶', 'cháyè', 'hojas de té'],
        ['白酒', 'báijiǔ', 'licor blanco'], ['烤', 'kǎo', 'asar, hornear'], ['厨师', 'chúshī', 'cocinero'], ['餐厅', 'cāntīng', 'restaurante, comedor'], ['食物', 'shíwù', 'alimento, comida'],
      ])}
      <h3>¿Cómo cocinan en cada región?</h3>
      <p>Según un libro de la Universidad Texas Tech (EE. UU.), las ocho cocinas regionales más conocidas son las de Shandong, Cantón, Sichuan, Hunan, Jiangsu, Zhejiang, Fujian y Anhui. El libro dice que el gusto por los condimentos y las técnicas depende de la historia y de los pueblos de cada región.</p>
      ${cuadro(['Cocina', 'Qué se destaca (Texas Tech, EE. UU.)'], [
        ['Shandong', `Conserva la frescura de los ingredientes y le gusta el sabor salado, ${zh("咸", "xián")}.`],
        ['Fujian', `Da mucha importancia a las sopas, ${zh("汤", "tāng")}.`],
        ['Sichuan', `Picante, ${zh("辣", "là")}, ácido, ${zh("酸", "suān")}, y adormecedor, por el ajo, el chile y la pimienta de Sichuan.`],
        ['Hunan', `Se fija en el sabor picante, ${zh("辣", "là")}, el aroma fresco y el color intenso.`],
      ])}
      <p>La Universidad de Columbia (EE. UU.) añade que el norte es conocido por sus fideos porque allí el producto agrícola principal es el trigo, y que el alimento principal del país es el arroz.</p>
      <h3>¿Cómo dices «un poquito» y «solo»?</h3>
      <p>${zh("稍", "shāo")} es un <strong>adverbio de grado</strong>: va delante de un adjetivo y suaviza. Dartmouth da ${zh("稍好一点儿", "shāo hǎo yìdiǎnr")}, «un poco mejor». Aquí, ${zh("这个汤稍咸一点儿", "zhège tāng shāo xián yìdiǎnr")} es «esta sopa está un poco salada». ${zh("稍微", "shāowēi")} se usa igual. ${zh("光", "guāng")} antes de un verbo es «solo»: ${zh("他光吃肉，不吃菜", "tā guāng chī ròu, bù chī cài")}, «él solo come carne, no verduras».</p>
      <h3>¿Cómo dices «ya basta»?</h3>
      <p>AllSet dice que ${zh("够", "gòu")} es «suficiente» y va antes de verbos y adjetivos. Con un adjetivo lleva ${zh("了", "le")} al final: ${zh("这个汤够香了", "zhège tāng gòu xiāng le")}, «esta sopa ya está suficientemente sabrosa». Dartmouth la muestra con verbos: ${zh("这些食物够吃了", "zhèxiē shíwù gòu chī le")}. Si niegas, no se usa ${zh("了", "le")}: ${zh("不够香", "bú gòu xiāng")}. Como simplificación de la lección, ${zh("够…的", "gòu… de")} se usa para «bastante»: ${zh("这个菜够辣的", "zhège cài gòu là de")}.</p>
      <h3>¿Cómo concedes un punto?</h3>
      <p>Una <strong>concesión</strong> es reconocer algo y poner un pero. AllSet dice que ${zh("X是X", "X shì X")} repite la palabra y luego añade una reserva con ${zh("就是", "jiùshì")} o ${zh("不过", "búguò")}: ${zh("好吃是好吃，就是不太健康", "hǎochī shì hǎochī, jiùshì bú tài jiànkāng")}. Con ${zh("就是", "jiùshì")}, lo que sigue debe ser algo negativo. ${zh("不过", "búguò")} es «pero» entre dos frases, igual que ${zh("但是", "dànshì")}.</p>
      <h3>¿Cómo dices «no hay remedio» y «justo»?</h3>
      <p>AllSet dice que ${zh("只好", "zhǐhǎo")} es «no tener más remedio que»: una opción que no te gusta. ${zh("餐厅关门了，我们只好回家做饭", "cāntīng guān mén le, wǒmen zhǐhǎo huí jiā zuò fàn")}. Y ${zh("正好", "zhènghǎo")} expresa coincidencia: ${zh("我正好在餐厅", "wǒ zhènghǎo zài cāntīng")}, «justo estaba en el restaurante». Por sí solo, quiere decir «justo a la medida»: ${zh("味道正好", "wèidào zhènghǎo")}.</p>
      <p class="nota"><strong>Trampa común:</strong> decir ${zh("这个汤够香", "zhège tāng gòu xiāng")} sin ${zh("了", "le")} para decir «ya está». Con adjetivo, necesita ${zh("了", "le")}.</p>`,
    ejemplo: `
      <p>Pablo quiere decir: «Este plato pica, sí, pero está muy rico; el restaurante cerró, así que no tuvimos más remedio que comerlo aquí».</p>
      <ol class="pasos-ej">
        <li>Parte del plato: ${zh("这个菜辣", "zhège cài là")}, «este plato pica».</li>
        <li>Para conceder, repite el adjetivo con ${zh("是", "shì")}: ${zh("辣是辣", "là shì là")}.</li>
        <li>Añade el pero con ${zh("不过", "búguò")}: ${zh("不过很好吃", "búguò hěn hǎochī")}.</li>
        <li>Para el apuro, pon ${zh("只好", "zhǐhǎo")} antes del verbo: ${zh("我们只好在这里吃", "wǒmen zhǐhǎo zài zhèlǐ chī")}.</li>
      </ol>
      <p>Para comprobar, mira que el adjetivo se repita a cada lado de ${zh("是", "shì")} y que ${zh("只好", "zhǐhǎo")} esté antes del verbo. Resultado: <span class="resultado">${zh("这个菜辣是辣，不过很好吃", "zhège cài là shì là, búguò hěn hǎochī")} = «este plato pica, pero está muy rico»</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner algo bueno después de ${zh("就是", "jiùshì")}, como ${zh("好吃是好吃，就是很香", "hǎochī shì hǎochī, jiùshì hěn xiāng")}. Después de ${zh("就是", "jiùshì")} va algo negativo; si es positivo, usa ${zh("不过", "búguò")}.</p>`,
    vidaReal: `
      <p>Estas formas sirven cuando hablas de comida con alguien:</p>
      <ul>
        <li>Decir que un plato está un poco picante, salado o ácido.</li>
        <li>Opinar sobre un restaurante con un «sí, pero».</li>
        <li>Explicar que no te quedó otra opción cuando algo salió mal.</li>
        <li>Entender por qué una región prepara ciertos platos.</li>
        <li>Pedir con cortesía algo que no pique demasiado.</li>
        <li>Conversar con un cocinero o un mesero sobre el sabor de un plato.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «está rico, pero pica demasiado».</p>',
        respuesta: ['好吃', '是', '好吃', '就是', '太', '辣'], pinyin: ['hǎochī', 'shì', 'hǎochī', 'jiùshì', 'tài', 'là'], lang: 'zh-Hans',
        pista: `<p>El adjetivo se repite a cada lado de ${zh("是", "shì")}.</p>`,
        solucion: `<p>${zh("好吃是好吃，就是太辣", "hǎochī shì hǎochī, jiùshì tài là")}: concedes que está rico y, con ${zh("就是", "jiùshì")}, añades algo negativo.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("餐厅关门了，我们只好回家做饭", "cāntīng guān mén le, wǒmen zhǐhǎo huí jiā zuò fàn")}?</p>`,
        opciones: ['Cerró el restaurante y fuimos a otro', 'El restaurante abrió y comimos allí', 'Cerró el restaurante y no hubo más remedio que cocinar en casa', 'Cocinamos en casa porque nos gusta más'], correcta: 2,
        pista: `<p>${zh("只好", "zhǐhǎo")} marca una opción que no te gusta.</p>`,
        solucion: `<p>${zh("只好", "zhǐhǎo")} es «no tener más remedio que»: como el restaurante cerró, la única opción es cocinar en casa.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «esta sopa ya está suficientemente sabrosa». ¿Qué frase está bien?</p>',
        opciones: [zh('这个汤够香了', 'zhège tāng gòu xiāng le'), zh('这个汤香够', 'zhège tāng xiāng gòu'), zh('这个汤够了香', 'zhège tāng gòu le xiāng'), zh('够这个汤香了', 'gòu zhège tāng xiāng le')], correcta: 0,
        pista: `<p>${zh("够", "gòu")} va antes del adjetivo y ${zh("了", "le")} al final.</p>`,
        solucion: `<p>${zh("这个汤够香了", "zhège tāng gòu xiāng le")}: sujeto, ${zh("够", "gòu")}, adjetivo y ${zh("了", "le")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>Según el libro de la Universidad Texas Tech (EE. UU.), ¿qué sabor le gusta a la cocina de Shandong?</p>',
        opciones: ['Muy dulce', 'Salado', 'Picante y adormecedor', 'Sin ningún condimento'], correcta: 1,
        pista: `<p>Mira la tabla de cocinas: busca ${zh("咸", "xián")}.</p>`,
        solucion: `<p>La cocina de Shandong prefiere conservar la frescura y le gusta el sabor salado, ${zh("咸", "xián")}. El picante es de Sichuan y Hunan.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("味道")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['wèi dào'],
        pista: '<p>Las dos sílabas bajan de forma rápida y firme.</p>',
        solucion: `<p>${zh("味道", "wèidào")}: <strong>wèi dào</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("汤", "tāng")}.</p>`,
        respuestas: ['sopa', 'la sopa', 'caldo', 'el caldo', 'sopa o caldo', 'soup'],
        pista: '<p>Se toma con cuchara y va caliente.</p>',
        solucion: `<p>${zh("汤", "tāng")} es «sopa» o «caldo».</p>` },
    ],
    fuentes: [SILABO, DART_9, DART_16, DART_10, MIT, ALLSET_BUGUO, ALLSET_SHI, ALLSET_GOU, ALLSET_ZHIHAO, ALLSET_ZHENGHAO, TEXAS, COLUMBIA],
  });

  // ------------------------------------------------------------------
  L('Arte y deporte', {
    objetivo: `Hablar de una obra o un partido con ${zh("在…方面", "zài… fāngmiàn")}, ${zh("并", "bìng")} más negación, ${zh("另外", "lìngwài")} y ${zh("与", "yǔ")}, y conocer tres tradiciones de China.`,
    explicacion: `
      <p>Imagina que sales de un teatro y de un partido, y cuentas qué viste. Las frases de ejemplo son de la lección.</p>
      <ul>
        <li>${zh("今天的演出很精彩", "jīntiān de yǎnchū hěn jīngcǎi")}: «La función de hoy fue estupenda».</li>
        <li>${zh("观众很多，球迷也很高兴", "guānzhòng hěn duō, qiúmí yě hěn gāoxìng")}: «Había mucho público y los aficionados estaban contentos».</li>
        <li>${zh("他并没有输", "tā bìng méiyǒu shū")}: «En realidad, él no perdió».</li>
      </ul>
      ${tabla([
        ['艺术', 'yìshù', 'arte'], ['京剧', 'jīngjù', 'ópera de Pekín'], ['话剧', 'huàjù', 'teatro hablado'], ['功夫', 'gōngfu', 'kung-fu; habilidad que se logra con práctica'], ['演出', 'yǎnchū', 'función, actuación; actuar'],
        ['演员', 'yǎnyuán', 'actor, actriz'], ['观众', 'guānzhòng', 'público, espectadores'], ['精彩', 'jīngcǎi', 'estupendo, brillante'], ['乒乓球', 'pīngpāngqiú', 'tenis de mesa'], ['球迷', 'qiúmí', 'aficionado a un deporte de pelota'],
        ['队员', 'duìyuán', 'integrante de un equipo'], ['教练', 'jiàoliàn', 'entrenador'], ['赢', 'yíng', 'ganar'], ['输', 'shū', 'perder'], ['作品', 'zuòpǐn', 'obra'],
      ])}
      <h3>¿Qué tradiciones hay?</h3>
      ${cuadro(['Tradición', 'Qué dice la fuente'], [
        ['Ópera de Pekín', `Es un arte escénico con canto, recitado, actuación y artes marciales. El vestuario es vistoso y el maquillaje usa símbolos, colores y dibujos para mostrar la personalidad de los personajes. La UNESCO la inscribió en 2010.`],
        ['Taijiquan', `Arte marcial tradicional que nació a mediados del siglo XVII en el condado de Wenxian, en Henan. Hoy lo practican personas de todas las edades. La UNESCO lo inscribió en 2020.`],
        ['Tenis de mesa', `En abril de 1971 China invitó al equipo estadounidense a jugar en su país, y en abril de 1972 el equipo chino visitó Estados Unidos, según el Departamento de Estado de EE. UU.`],
      ])}
      <p>La Ópera de Pekín, ${zh("京剧", "jīngjù")}, se centra en Pekín, Tianjin y Shanghái, aunque se practica en todo el país (UNESCO, 2010). Del ${zh("功夫", "gōngfu")} en general no hay un dato aquí, solo del taijiquan.</p>
      <h3>¿Cómo dices «en cuanto a…»?</h3>
      <p>Para decir en qué aspecto comparas algo, usas ${zh("在…方面", "zài… fāngmiàn")}. Dartmouth glosa ${zh("方面", "fāngmiàn")} como «aspecto» como parte de la fórmula. Aquí: ${zh("在唱歌方面，她比我好", "zài chànggē fāngmiàn, tā bǐ wǒ hǎo")}, «cantando, ella es mejor que yo». Oxford dice que ${zh("在", "zài")} puede omitirse.</p>
      <h3>¿Cómo niegas con fuerza?</h3>
      <p>AllSet dice que ${zh("并", "bìng")}, un <strong>adverbio de énfasis</strong>, enfatiza una negación y suele aparecer cuando no estás de acuerdo o señalas algo. Va antes de ${zh("不", "bù")} o ${zh("没(有)", "méi(yǒu)")}. Oxford añade que solo se usa en forma negativa, para decir que algo no es lo esperado: ${zh("这场演出并不长", "zhè chǎng yǎnchū bìng bù cháng")}, «en realidad, esta función no es larga». Y ${zh("他并没有输", "tā bìng méiyǒu shū")} es «en realidad, no perdió».</p>
      <h3>¿Cómo añades algo más?</h3>
      <p>${zh("另外", "lìngwài")} es «además». AllSet dice que suele ir seguido de ${zh("还", "hái")} o ${zh("也", "yě")}. Oxford la compara con ${zh("此外", "cǐwài")} y a ${zh("而且", "érqiě")}, pero ${zh("而且", "érqiě")} no puede abrir una oración. Por ejemplo: ${zh("他是教练。另外，他也是演员", "tā shì jiàoliàn. lìngwài, tā yě shì yǎnyuán")}, «él es entrenador; además, también es actor». ${zh("与", "yǔ")} une dos cosas, «y» o «con», más formal. Por ejemplo: ${zh("球迷与队员一起高兴", "qiúmí yǔ duìyuán yìqǐ gāoxìng")}, «aficionados y jugadores celebran juntos».</p>
      <h3>Dos estructuras más</h3>
      <p>El sílabo también lista ${zh("怎么都/也+不/没", "zěnme dōu/yě + bù/méi")}, que dice «hagas lo que hagas, no…», y ${zh("加上", "jiāshang")}, que suma una razón. No hay regla en las fuentes de esta unidad, así que son ejemplos de la lección: ${zh("我怎么都赢不了他", "wǒ zěnme dōu yíng bù liǎo tā")}, «no puedo ganarle de ninguna manera», y ${zh("他很努力，加上教练很好，所以赢了", "tā hěn nǔlì, jiāshang jiàoliàn hěn hǎo, suǒyǐ yíng le")}, «se esfuerza y, sumado a un buen entrenador, ganó».</p>
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("并", "bìng")} en una frase afirmativa. Solo va con negación.</p>`,
    ejemplo: `
      <p>Marta quiere decir: «En cuanto a actuar, él es muy bueno; en realidad, no está ocupado, y además es entrenador».</p>
      <ol class="pasos-ej">
        <li>Parte del aspecto: ${zh("在演出方面", "zài yǎnchū fāngmiàn")}, «en cuanto a actuar».</li>
        <li>Añade la idea: ${zh("在演出方面，他很好", "zài yǎnchū fāngmiàn, tā hěn hǎo")}.</li>
        <li>Para negar con fuerza, pon ${zh("并", "bìng")} antes de ${zh("不", "bù")}: ${zh("他并不忙", "tā bìng bù máng")}.</li>
        <li>Para sumar, abre con ${zh("另外", "lìngwài")} y ${zh("还", "hái")}: ${zh("另外，他还是教练", "lìngwài, tā hái shì jiàoliàn")}.</li>
      </ol>
      <p>Para comprobar, mira que ${zh("并", "bìng")} esté antes de la negación y que ${zh("另外", "lìngwài")} abra la última oración. Resultado: <span class="resultado">${zh("在演出方面，他很好。他并不忙。另外，他还是教练", "zài yǎnchū fāngmiàn, tā hěn hǎo. tā bìng bù máng. lìngwài, tā hái shì jiàoliàn")} = «en cuanto a actuar, es muy bueno; en realidad no está ocupado; además, es entrenador»</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner ${zh("并", "bìng")} después de la negación, como ${zh("他不并忙", "tā bù bìng máng")}. Va antes.</p>`,
    vidaReal: `
      <p>Estas formas aparecen cuando hablas de espectáculos y deportes:</p>
      <ul>
        <li>Comentar una obra de teatro, un concierto o una función con un amigo.</li>
        <li>Decir en qué aspecto alguien es mejor que otra persona.</li>
        <li>Corregir una idea con un «en realidad no es así».</li>
        <li>Añadir un dato más al contar quién es una persona.</li>
        <li>Entender noticias de deporte, de entrenadores y de aficionados.</li>
        <li>Hablar de una tradición de China que has visto en un video o en un museo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «cantando, ella es mejor que yo».</p>',
        respuesta: ['在', '唱歌', '方面', '她', '比', '我', '好'], alternativas: [['她', '在', '唱歌', '方面', '比', '我', '好']], pinyin: ['zài', 'chànggē', 'fāngmiàn', 'tā', 'bǐ', 'wǒ', 'hǎo'], lang: 'zh-Hans',
        pista: `<p>${zh("在…方面", "zài… fāngmiàn")} encierra el aspecto del que hablas.</p>`,
        solucion: `<p>${zh("在唱歌方面，她比我好", "zài chànggē fāngmiàn, tā bǐ wǒ hǎo")}: primero el aspecto y luego la comparación. También vale ${zh("她在唱歌方面比我好", "tā zài chànggē fāngmiàn bǐ wǒ hǎo")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("这场演出并不长", "zhè chǎng yǎnchū bìng bù cháng")}?</p>`,
        opciones: ['La función es muy larga', 'En realidad, la función no es larga', 'La función no se hizo', 'Hay dos funciones hoy'], correcta: 1,
        pista: `<p>${zh("并", "bìng")} más ${zh("不", "bù")} enfatiza la negación.</p>`,
        solucion: `<p>${zh("并不", "bìng bù")} es «en realidad no»: contradice la idea de que es larga.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «en realidad, él no perdió». ¿Qué frase está bien?</p>',
        opciones: [zh('他没有输并', 'tā méiyǒu shū bìng'), zh('并他没有输', 'bìng tā méiyǒu shū'), zh('他没有并输', 'tā méiyǒu bìng shū'), zh('他并没有输', 'tā bìng méiyǒu shū')], correcta: 3,
        pista: `<p>${zh("并", "bìng")} va antes de ${zh("没有", "méiyǒu")}.</p>`,
        solucion: `<p>${zh("他并没有输", "tā bìng méiyǒu shū")}: sujeto, ${zh("并", "bìng")}, ${zh("没有", "méiyǒu")} y el verbo.</p>` },
      { tipo: 'opciones', enunciado: '<p>Según la UNESCO, ¿en qué año se inscribió la Ópera de Pekín como patrimonio cultural inmaterial?</p>',
        opciones: ['2009', '2020', '1972', '2010'], correcta: 3,
        pista: '<p>La UNESCO la inscribió en 2010; 2009 es el Barco Dragón y 2020 es el taijiquan.</p>',
        solucion: '<p>La Ópera de Pekín se inscribió en 2010.</p>' },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("观众")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['guān zhòng'],
        pista: '<p>La primera sílaba empieza alta y se mantiene; la segunda baja.</p>',
        solucion: `<p>${zh("观众", "guānzhòng")}: <strong>guān zhòng</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("教练", "jiàoliàn")}.</p>`,
        respuestas: ['entrenador', 'el entrenador', 'entrenadora', 'la entrenadora', 'coach', 'instructor'],
        pista: '<p>Es quien dirige a un equipo en los partidos.</p>',
        solucion: `<p>${zh("教练", "jiàoliàn")} es «entrenador» o «entrenadora».</p>` },
    ],
    fuentes: [SILABO, DART_9, DART_23, DART_10, OXFORD_PRENSA, ALLSET_BING, ALLSET_LINGWAI, UNESCO_OPERA, UNESCO_TAIJI, STATE_DEPT],
  });

  // ------------------------------------------------------------------
  L('Refranes y frases célebres', {
    objetivo: `Entender qué es un ${zh("成语", "chéngyǔ")}, leer tres frases del ${zh("论语", "Lúnyǔ")} y reconocer ${zh("有A有B", "yǒu A yǒu B")}, ${zh("还X呢", "hái X ne")}, ${zh("也得", "yě děi")}, ${zh("之一", "zhī yī")} y ${zh("啊", "a")}.`,
    explicacion: `
      <p>Imagina que lees un texto y aparece una frase de cuatro caracteres que parece un refrán. Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['词语', 'cíyǔ', 'palabra, expresión'], ['例如', 'lìrú', 'por ejemplo'], ['著名', 'zhùmíng', 'famoso, célebre'], ['作家', 'zuòjiā', 'escritor, escritora'], ['作者', 'zuòzhě', 'autor, autora'],
        ['文章', 'wénzhāng', 'texto, artículo'], ['文字', 'wénzì', 'escritura, letras'], ['人生', 'rénshēng', 'vida (de una persona)'], ['一切', 'yíqiè', 'todo'], ['永远', 'yǒngyuǎn', 'siempre, para siempre'],
        ['真正', 'zhēnzhèng', 'verdadero, de verdad'], ['理想', 'lǐxiǎng', 'ideal; ideal de vida'], ['梦想', 'mèngxiǎng', 'sueño, ilusión'], ['勇敢', 'yǒnggǎn', 'valiente'], ['值得', 'zhídé', 'valer la pena, merecer'],
      ])}
      <h3>¿Qué es un chengyu?</h3>
      <p>Un ${zh("成语", "chéngyǔ")} es una expresión fija, casi siempre de cuatro caracteres, que la gente usa como un refrán. Según la Universidad Estatal de Tennessee Media, son un medio para relacionarse con la cultura, historia y tradición; hay decenas de miles; un diccionario de 1985 trae más de 18 000. Wikipedia (apoyo) dice que casi todos vienen de textos antiguos. El sílabo llama a esta forma ${zh("四字格", "sìzìgé")}, una <strong>frase fija de cuatro caracteres</strong>. Son cultura, no vocabulario: el pinyin lleva el tono original de ${zh("一", "yī")} y ${zh("不", "bù")} (al hablar cambia, como en la unidad 9).</p>
      ${cuadro(['Expresión', 'Qué quiere decir'], [
        [zh('一心一意', 'yī xīn yī yì'), 'Con la mente en una sola cosa (Ministerio de Educación de Taiwán, 2020).'],
        [zh('三心二意', 'sān xīn èr yì'), 'Vacilar; lo contrario del anterior.'],
        [zh('半途而废', 'bàn tú ér fèi'), 'Dejar algo a medias; el mismo diccionario cita como origen el ' + zh('礼记', 'Lǐjì') + '.'],
        [zh('有说有笑', 'yǒu shuō yǒu xiào'), 'Hablar y reír (Wikcionario, apoyo).'],
        [zh('无忧无虑', 'wú yōu wú lǜ'), 'Sin preocupaciones (Wikcionario, apoyo).'],
      ])}
      <p>Los dos últimos siguen el molde ${zh("有A有B", "yǒu A yǒu B")} y ${zh("无A无B", "wú A wú B")}.</p>
      <h3>¿Qué son las Analectas?</h3>
      <p>Las Analectas, ${zh("论语", "Lúnyǔ")}, son un texto filosófico antiguo con dichos atribuidos a Confucio, reunidos por sus seguidores (Wikipedia, apoyo). La London School of Economics trae: ${zh("三人行，必有我师焉", "sān rén xíng, bì yǒu wǒ shī yān")}, «cuando camino con otros hay alguien de quien aprender»; ${zh("温故而知新", "wēn gù ér zhī xīn")}, «repasar lo antiguo para conocer lo nuevo»; y ${zh("学而不厌，诲人不倦", "xué ér bù yàn, huì rén bù juàn")}, «aprender sin cansarse y enseñar sin fatigarse».</p>
      <h3>Estructuras del sílabo</h3>
      <p>AllSet dice que ${zh("还X呢", "hái X ne")} expresa que algo es irracional o inesperado: ${zh("还作家呢，他的文章一点儿也不精彩", "hái zuòjiā ne, tā de wénzhāng yìdiǎnr yě bù jīngcǎi")}, «vaya escritor: su texto no es nada brillante». AllSet dice que ${zh("得", "děi")} es «deber» y va antes del verbo: ${zh("想去也得去，不想去也得去", "xiǎng qù yě děi qù, bù xiǎng qù yě děi qù")}, «quieras o no, hay que ir». AllSet dice que ${zh("之一", "zhī yī")} es «uno de» y cierra la frase: ${zh("她是我的好朋友之一", "tā shì wǒ de hǎo péngyou zhī yī")}. Y ${zh("啊", "a")}, al final, añade exclamación: ${zh("这个作品真精彩啊", "zhège zuòpǐn zhēn jīngcǎi a")}. ${zh("嗯", "ng")} es una <strong>interjección</strong>: ${zh("嗯，我知道了", "ng, wǒ zhīdào le")}.</p>
      <p>Otras estructuras no tienen regla en las fuentes; van como ejemplos.</p>
      ${cuadro(['Estructura', 'Ejemplo de la lección'], [
        [zh('你X你的吧', 'nǐ X nǐ de ba'), zh('你说你的吧', 'nǐ shuō nǐ de ba') + ': a lo tuyo.'],
        [zh('X就X(点儿)吧', 'X jiù X (diǎnr) ba'), zh('输就输吧', 'shū jiù shū ba') + ': si hay que perder, así sea.'],
        [zh('说什么也得X', 'shuō shénme yě děi X'), zh('说什么我也得去', 'shuō shénme wǒ yě děi qù') + ': pase lo que pase, voy.'],
        [zh('让你X你就X', 'ràng nǐ X nǐ jiù X'), zh('让你去你就去', 'ràng nǐ qù nǐ jiù qù') + ': si piden ir, voy.'],
        [zh('X就是了', 'X jiùshì le'), zh('你去就是了', 'nǐ qù jiùshì le') + ': ve y ya.'],
        [zh('动词+一X是一X', 'dòngcí + yī X shì yī X'), zh('过一天是一天', 'guò yì tiān shì yì tiān') + ': al día.'],
      ])}
      <p>También el sílabo trae ${zh("X是X，Y是Y", "X shì X, Y shì Y")}, como ${zh("工作是工作，休息是休息", "gōngzuò shì gōngzuò, xiūxi shì xiūxi")}, y la partícula ${zh("者", "zhě")} de ${zh("作者", "zuòzhě")}, «quien escribe». Con esto terminas HSK 4: ya puedes hablar de trámites, opiniones y cultura. Fue una selección de vocabulario; la lista completa está en el <a href="${encodeURI(SILABO.url)}">sílabo</a>.</p>
      <p class="nota"><strong>Trampa común:</strong> leer este ${zh("得", "děi")} como de: aquí significa «deber».</p>`,
    ejemplo: `
      <p>Pedro quiere decir: «Quieras o no, hay que ir; y él, que es uno de los autores famosos, viene con nosotros».</p>
      <ol class="pasos-ej">
        <li>Parte de la obligación: ${zh("去", "qù")}. Para decir «tienes que», pon ${zh("得", "děi")} antes: ${zh("得去", "děi qù")}.</li>
        <li>Para «quieras o no», repite con ${zh("也", "yě")}: ${zh("想去也得去，不想去也得去", "xiǎng qù yě děi qù, bù xiǎng qù yě děi qù")}.</li>
        <li>Para «uno de los autores famosos», pon ${zh("之一", "zhī yī")} al final: ${zh("他是著名的作者之一", "tā shì zhùmíng de zuòzhě zhī yī")}.</li>
        <li>Une las ideas con una coma.</li>
      </ol>
      <p>Para comprobar, mira que ${zh("得", "děi")} esté antes del verbo y que ${zh("之一", "zhī yī")} cierre la frase del autor. Resultado: <span class="resultado">${zh("想去也得去，不想去也得去。他是著名的作者之一", "xiǎng qù yě děi qù, bù xiǎng qù yě děi qù. tā shì zhùmíng de zuòzhě zhī yī")} = «quieras o no, hay que ir; él es uno de los autores famosos»</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner ${zh("之一", "zhī yī")} antes del sustantivo, como ${zh("他是之一著名的作者", "tā shì zhī yī zhùmíng de zuòzhě")}. Va al final.</p>`,
    vidaReal: `
      <p>Estas expresiones aparecen en libros, noticias y conversaciones:</p>
      <ul>
        <li>Reconocer un refrán de cuatro caracteres en un texto.</li>
        <li>Entender una frase famosa que alguien cita en clase o en un discurso.</li>
        <li>Notar el sarcasmo cuando alguien dice «vaya...» con una frase de reproche.</li>
        <li>Decir que algo es «uno de» los mejores con una frase corta.</li>
        <li>Seguir una charla con exclamaciones y respuestas breves.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «quieras o no, hay que ir».</p>',
        respuesta: ['你', '不想', '去', '也', '得', '去'], pinyin: ['nǐ', 'bù xiǎng', 'qù', 'yě', 'děi', 'qù'], lang: 'zh-Hans',
        pista: `<p>La estructura es «no quieres ir, pero ${zh("也得", "yě děi")} ir».</p>`,
        solucion: `<p>${zh("你不想去也得去", "nǐ bù xiǎng qù yě děi qù")}: lo que no quieres, ${zh("也得", "yě děi")} y el verbo otra vez.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("有说有笑", "yǒu shuō yǒu xiào")}?</p>`,
        opciones: ['Sin preocupaciones', 'Dejar algo a medias', 'Hablar y reír', 'Con la mente en una sola cosa'], correcta: 2,
        pista: `<p>Mira los dos verbos: ${zh("说", "shuō")} y ${zh("笑", "xiào")}.</p>`,
        solucion: `<p>${zh("有说有笑", "yǒu shuō yǒu xiào")} es «hablar y reír». «Sin preocupaciones» es ${zh("无忧无虑", "wú yōu wú lǜ")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué idea expresa ${zh("还作家呢，他的文章一点儿也不精彩", "hái zuòjiā ne, tā de wénzhāng yìdiǎnr yě bù jīngcǎi")}?</p>`,
        opciones: ['Se reprocha con sarcasmo a quien se dice escritor', 'Se felicita a un gran escritor', 'Se pregunta quién es el escritor', 'Se ofrece una lectura'], correcta: 0,
        pista: `<p>${zh("还X呢", "hái X ne")} marca algo inesperado, a menudo con sarcasmo.</p>`,
        solucion: `<p>${zh("还作家呢", "hái zuòjiā ne")} es «vaya escritor»: una queja, porque el texto no es nada brillante.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según la London School of Economics, ¿qué dice ${zh("三人行，必有我师焉", "sān rén xíng, bì yǒu wǒ shī yān")}?</p>`,
        opciones: ['Tres personas son demasiadas', 'Cuando camino con otros, siempre hay alguien de quien aprender', 'Un maestro siempre camina solo', 'Aprender cansa mucho'], correcta: 1,
        pista: '<p>Habla de aprender de las personas que te rodean.</p>',
        solucion: `<p>La frase, atribuida a Confucio en el ${zh("论语", "Lúnyǔ")}, dice que al caminar con otros siempre hay alguien de quien aprender.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("值得")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['zhí dé'],
        pista: '<p>La primera sílaba sube; la segunda sube también.</p>',
        solucion: `<p>${zh("值得", "zhídé")}: <strong>zhí dé</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("勇敢", "yǒnggǎn")}.</p>`,
        respuestas: ['valiente', 'valeroso', 'audaz', 'animoso', 'con valor', 'bravo'],
        pista: '<p>Describe a quien enfrenta el miedo.</p>',
        solucion: `<p>${zh("勇敢", "yǒnggǎn")} es «valiente».</p>` },
    ],
    fuentes: [SILABO, ALLSET_SHI, ALLSET_HAI, ALLSET_DEI, ALLSET_A, ALLSET_INTERJ, ALLSET_ZHIYI, DART_10, DART_29, MTSU, WIKI_CHENGYU, LSE, WIKI_ANALECTS, MOE_YIXIN, MOE_BANTU, WIKT_WUYOU, WIKT_YOUSHUO, WIKT_SANXIN],
  });
})();
