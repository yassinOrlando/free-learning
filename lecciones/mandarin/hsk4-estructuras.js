// Mandarín · Unidad 10: HSK 4 · Estructuras.
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

  // Gráfica de barras de una serie (copiada de hsk4-frases.js).
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
  // Datos de ejemplo, no reales: actividad preferida de una clase, en porcentaje.
  const ENCUESTA = () => barras({ etiquetas: ['Fútbol', 'Baile', 'Natación'], valores: [40, 40, 20], min: 0, max: 50, paso: 10,
    descripcion: 'Gráfica de barras con una encuesta de ejemplo sobre la actividad preferida de una clase, en porcentaje: fútbol 40, baile 40 y natación 20. Fútbol y baile tienen la misma barra, y la natación tiene la mitad de alta.' });

  // Fuentes. Los números F# son los de la ficha de la unidad.
  const SILABO = { nombre: 'Centro de Educación y Cooperación Lingüística (China), «HSK 考试大纲», sílabo del HSK 3.0 (2025)', url: 'https://hsk.cn-bj.ufileos.com/3.0/新版HSK考试大纲1219.pdf' };
  const MIT = { nombre: 'MIT OpenCourseWare (EE. UU.), J. K. Wheatley, Learning Chinese: A Foundation Course in Mandarin (2011, en inglés)', url: 'https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/res21g_003_s_11.pdf' };
  const OXFORD_BA = { nombre: 'Centre for Teaching Chinese as a Foreign Language, Universidad de Oxford (Reino Unido), The 把 Construction (en inglés)', url: 'https://www.ctcfl.ox.ac.uk/materials_grammar-exercises_ba/' };
  const OXFORD_BEI = { nombre: 'Centre for Teaching Chinese as a Foreign Language, Universidad de Oxford (Reino Unido), Passive with 被 让 叫 给 (en inglés)', url: 'https://www.ctcfl.ox.ac.uk/materials_grammar-exercises_bei/' };
  const DART = (n, url, nota) => ({ nombre: `Dartmouth College (EE. UU.), Snapshots of China, lección ${n}: ${nota} (2023, en inglés)`, url });
  const DART_3 = DART(3, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e4%b8%80%e8%af%be-lesson-3/', 'nota sobre 让');
  const DART_7 = DART(7, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e4%b8%83%e8%af%be-lesson-7/', 'notas de gramática');
  const ALLSET = (n, url) => ({ nombre: 'Chinese Grammar Wiki (AllSet Learning), fuente de apoyo no universitaria: ' + n + ' (en inglés)', url: 'https://resources.allsetlearning.com/chinese/grammar/' + url });
  const ALLSET_NEG = ALLSET('Expressing "double negation"', 'Expressing_%22double_negation%22');
  const ALLSET_BUDEBU = ALLSET('Expressing "have to" with "budebu"', 'Expressing_%22have_to%22_with_%22budebu%22');
  const ALLSET_FEN = ALLSET('Expressing "fractions" with "fenzhi"', 'Expressing_Fractions_with_%22fenzhi%22');
  const ALLSET_BEI = ALLSET('Expressing "multiples" with "bei"', 'Expressing_%22multiples%22_with_%22bei%22');
  const ALLSET_NUM = ALLSET('Advanced numbers', 'Advanced_numbers');
  const CHINGRAM = { nombre: 'ChinGram, Universidad Palacký (Chequia), Approximate numbers (en inglés)', url: 'https://chingram.upol.cz/grammar/approximate-numbers' };
  const CHINADAILY = { nombre: 'China Daily, sección de idioma (medio estatal chino), fuente de apoyo no universitaria: How to talk about decimals, fractions, and percents in Chinese (2023, en inglés)', url: 'https://language.chinadaily.com.cn/a/202312/19/WS6581610aa31040ac301a8850.html' };
  const DART_8 = DART(8, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e5%85%ab%e8%af%be-lesson-8/', 'notas de gramática de 不如');
  const DART_9 = DART(9, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e4%b9%9d%e8%af%be-lesson-9/', 'nota sobre 把');
  const DART_11 = DART(11, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e5%8d%81%e4%b8%80%e8%af%be-lesson-11/', 'notas de gramática');
  const DART_22 = DART(22, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%ba%8c%e8%af%be-lesson-22/', 'glosario y ejemplos');
  const PRINCETON = { nombre: 'Universidad de Princeton (EE. UU.), Basic Chinese Characters of CHI 103 & 108: nándào (2024, en inglés)', url: 'https://commons.princeton.edu/chinesecharacters/%E9%9A%BE%E9%81%93/' };
  const DART_16 = DART(16, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e5%8d%81%e5%85%ad%e8%af%be-lesson-16/', 'nota sobre 被');
  const DART_20 = DART(20, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e4%ba%8c%e5%8d%81%e8%af%be-lesson-20/', 'notas de gramática de 相比');
  const OXFORD_PVC = { nombre: 'Centre for Teaching Chinese as a Foreign Language, Universidad de Oxford (Reino Unido), Potential verb complement (en inglés)', url: 'https://www.ctcfl.ox.ac.uk/materials_grammar-exercises_pvc/' };
  const DART_27 = DART(27, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%b8%83%e8%af%be-lesson-27/', 'nota sobre 使');

  // ------------------------------------------------------------------
  L('Más usos de 把', {
    objetivo: `Reconocer las cuatro formas de ${zh("把", "bǎ")} del sílabo de HSK 4, saber qué lleva el verbo y dónde va la negación, y nombrar objetos y acciones de la casa como ${zh("收拾", "shōushi")} o ${zh("钥匙", "yàoshi")}.`,
    explicacion: `
      <p>Esta unidad repasa y amplía estructuras de HSK 4 con una selección de palabras: la lista completa está en el <a href="${encodeURI(SILABO.url)}">sílabo oficial</a>. Las frases de ejemplo son de la lección. Si la voz de tu dispositivo suena rara, el pinyin manda.</p>
      ${tabla([
        ['整理', 'zhěnglǐ', 'ordenar, poner en orden'], ['收拾', 'shōushi', 'recoger, arreglar (un cuarto)'], ['弄', 'nòng', 'hacer, arreglárselas con algo'], ['擦', 'cā', 'limpiar frotando'], ['挂', 'guà', 'colgar'],
        ['抬', 'tái', 'levantar, alzar'], ['扔', 'rēng', 'tirar, lanzar'], ['装', 'zhuāng', 'meter, guardar dentro'], ['盒子', 'hézi', 'caja'], ['镜子', 'jìngzi', 'espejo'],
        ['窗户', 'chuānghu', 'ventana'], ['推', 'tuī', 'empujar'], ['拉', 'lā', 'jalar'], ['钥匙', 'yàoshi', 'llave'], ['抱', 'bào', 'abrazar, cargar en brazos'],
      ])}
      <h3>¿Por qué el verbo no va solo?</h3>
      <p>Piensa en tu cuarto desordenado. No dices solo «ordenar el libro»: dices qué le haces al libro y cómo queda. En la unidad 7 viste la estructura en «La estructura ${zh("把", "bǎ")}». Oxford explica que ${zh("把", "bǎ")} se usa para tratar un objeto concreto, cambiando su forma, su lugar o su situación. Por eso, un verbo sin nada más no puede usarse con ${zh("把", "bǎ")}. Según MIT, lo normal es un verbo con su resultado, o al menos un verbo con ${zh("了", "le")} o un verbo repetido.</p>
      <h3>Las cuatro formas del sílabo</h3>
      <p>El sílabo de HSK 4 lista cuatro formas. Todas siguen el orden sujeto, ${zh("把", "bǎ")}, objeto y verbo con algo más. Las frases de ejemplo son de la lección.</p>
      ${cuadro(['Forma', 'Qué lleva el verbo', 'Frase de ejemplo'], [
        ['1', 'El verbo repetido, o con ' + zh('一', 'yī') + ' en medio.', zh('请你把镜子擦一擦', 'qǐng nǐ bǎ jìngzi cā yī cā')],
        ['2', zh('了', 'le') + ' después del verbo.', zh('他把盒子扔了', 'tā bǎ hézi rēng le')],
        ['3', 'Un complemento de veces (cuántas) o de tiempo (cuánto).', zh('她把桌子擦了两次', 'tā bǎ zhuōzi cā le liǎng cì')],
        ['4', 'Un adverbio de manera antes del verbo.', zh('他把窗户慢慢地推开了', 'tā bǎ chuānghu mànmàn de tuīkāi le')],
      ])}
      <p>La forma 2 equivale a un resultado: Oxford dice que ${zh("了", "le")} se parece a un complemento de resultado como ${zh("完", "wán")}: marca que la acción terminó.</p>
      <h3>¿Qué va antes de ${zh("把", "bǎ")}?</h3>
      <p>Las palabras que niegan van antes de ${zh("把", "bǎ")}, no antes del verbo: ${zh("没", "méi")} o ${zh("别", "bié")}. Oxford añade que ${zh("不", "bù")} solo se usa en condiciones. Un ejemplo: ${zh("我没把窗户关好", "wǒ méi bǎ chuānghu guān hǎo")}, «no cerré bien la ventana». Los adverbios como ${zh("都", "dōu")} o ${zh("已经", "yǐjīng")} también van antes: ${zh("他已经把钥匙忘在家里了", "tā yǐjīng bǎ yàoshi wàng zài jiā li le")}, «ya dejó olvidada la llave en casa». Un adverbio de manera con ${zh("地", "de")}, según Oxford, puede ir antes de ${zh("把", "bǎ")} o antes del verbo principal: ${zh("他慢慢地把窗户推开了", "tā mànmàn de bǎ chuānghu tuīkāi le")} también es válida.</p>
      <h3>¿Qué objetos admite?</h3>
      <p>Dartmouth explica que lo que sigue a ${zh("把", "bǎ")} debe ser concreto, conocido o sobreentendido, no una cosa cualquiera. Por eso se dice ${zh("请把窗户打开", "qǐng bǎ chuānghu dǎkāi")}, «abre la ventana» (esa ventana en particular). La misma fuente avisa de que los verbos de sentimiento o actividad mental y los verbos ${zh("来", "lái")} y ${zh("去", "qù")} no se usan con ${zh("把", "bǎ")}.</p>
      <p class="nota"><strong>Trampa común:</strong> dejar el verbo solo, como ${zh("我把镜子擦", "wǒ bǎ jìngzi cā")}. La frase queda incompleta, porque falta decir qué le pasó al espejo: ${zh("擦了", "cā le")}, ${zh("擦一擦", "cā yī cā")} o ${zh("擦干净", "cā gānjìng")}.</p>
      <p>Una nota de pronunciación: ${zh("不", "bù")} y ${zh("一", "yī")} se escriben aquí con su tono original, pero al hablar cambian: ${zh("一擦", "yī cā")} suena <strong>yì cā</strong> y ${zh("不", "bù")} delante de un cuarto tono suena <strong>bú</strong>.</p>`,
    ejemplo: `
      <p>Luis quiere que su espejo quede colgado en la puerta del cuarto. Vamos a pedírselo a un amigo.</p>
      <ol class="pasos-ej">
        <li>Piensa en lo que quieres: tratar un objeto concreto, el espejo, y cambiarlo de lugar. Es un trabajo para ${zh("把", "bǎ")}.</li>
        <li>Empieza con el esqueleto: ${zh("你把镜子挂", "nǐ bǎ jìngzi guà")}. El verbo está solo, así que todavía falta algo.</li>
        <li>Añade a dónde va, con un resultado de lugar: ${zh("挂在门上", "guà zài mén shang")}.</li>
        <li>Pide con cortesía al inicio: ${zh("请你把镜子挂在门上", "qǐng nǐ bǎ jìngzi guà zài mén shang")}.</li>
        <li>Si ya lo hiciste, dilo en negativo, con ${zh("没", "méi")} antes de ${zh("把", "bǎ")}: ${zh("我没把镜子挂在门上", "wǒ méi bǎ jìngzi guà zài mén shang")}.</li>
      </ol>
      <p>Para comprobar, busca que el verbo tenga algo detrás y que la negación vaya antes de ${zh("把", "bǎ")}. Resultado: <span class="resultado">${zh("请你把镜子挂在门上", "qǐng nǐ bǎ jìngzi guà zài mén shang")} = «por favor, cuelga el espejo en la puerta»</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner la negación antes del verbo: ${zh("我把镜子没挂", "wǒ bǎ jìngzi méi guà")}. Con ${zh("把", "bǎ")}, la negación se coloca antes de ${zh("把", "bǎ")}.</p>`,
    vidaReal: `
      <p>Estas formas aparecen cada vez que hablas de lo que haces con las cosas de tu casa:</p>
      <ul>
        <li>Pedir que alguien cuelgue, empuje o levante un objeto concreto.</li>
        <li>Contar que ordenaste tu cuarto o que tiraste algo viejo.</li>
        <li>Decir que no cerraste una ventana o que olvidaste tu llave.</li>
        <li>Entender instrucciones cortas de limpieza o de mudanza, como guardar cosas en una caja.</li>
        <li>Explicar con claridad qué le pasó a un objeto, en vez de nombrar solo la acción.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «no cerré bien la ventana».</p>',
        respuesta: ['我', '没', '把', '窗户', '关好'], pinyin: ['wǒ', 'méi', 'bǎ', 'chuānghu', 'guān hǎo'], lang: 'zh-Hans',
        pista: `<p>La negación va justo antes de ${zh("把", "bǎ")}.</p>`,
        solucion: `<p>${zh("我没把窗户关好", "wǒ méi bǎ chuānghu guān hǎo")}: sujeto, ${zh("没", "méi")}, ${zh("把", "bǎ")}, objeto y verbo con resultado.</p>` },
      { tipo: 'opciones', enunciado: `<p>Quieres decir «limpié el espejo» con ${zh("把", "bǎ")}. ¿Qué frase está completa?</p>`,
        opciones: [zh('我把镜子擦', 'wǒ bǎ jìngzi cā'), zh('我把镜子擦了', 'wǒ bǎ jìngzi cā le'), zh('我擦把镜子了', 'wǒ cā bǎ jìngzi le'), zh('我把擦镜子了', 'wǒ bǎ cā jìngzi le')], correcta: 1,
        pista: `<p>Con ${zh("把", "bǎ")}, el verbo no puede quedar solo.</p>`,
        solucion: `<p>${zh("我把镜子擦了", "wǒ bǎ jìngzi cā le")} lleva ${zh("了", "le")} después del verbo. Sin él, el verbo queda solo.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «no colgué el espejo en la puerta». ¿Cuál frase está bien armada?</p>',
        opciones: [zh('我把镜子没挂在门上', 'wǒ bǎ jìngzi méi guà zài mén shang'), zh('我把没镜子挂在门上', 'wǒ bǎ méi jìngzi guà zài mén shang'), zh('我没把镜子挂在门上', 'wǒ méi bǎ jìngzi guà zài mén shang'), zh('没我把镜子挂在门上', 'méi wǒ bǎ jìngzi guà zài mén shang')], correcta: 2,
        pista: `<p>Piensa en dónde se coloca la palabra que niega: antes de ${zh("把", "bǎ")}.</p>`,
        solucion: `<p>${zh("我没把镜子挂在门上", "wǒ méi bǎ jìngzi guà zài mén shang")}: ${zh("没", "méi")} va antes de ${zh("把", "bǎ")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>En ${zh("她把桌子擦了两次", "tā bǎ zhuōzi cā le liǎng cì")}, ¿qué lleva el verbo ${zh("擦", "cā")}?</p>`,
        opciones: ['El verbo repetido', 'Solo una partícula de acción terminada', 'Un adverbio de manera', 'Un complemento de veces'], correcta: 3,
        pista: '<p>Mira lo que sigue al verbo: «dos veces».</p>',
        solucion: `<p>${zh("两次", "liǎng cì")} dice cuántas veces se limpió la mesa: es un complemento de veces, la forma 3 de la tabla.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("钥匙")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['yào shi'],
        pista: '<p>La primera sílaba baja con fuerza; la segunda es neutra.</p>',
        solucion: `<p>${zh("钥匙", "yàoshi")}: <strong>yào shi</strong>.</p>` },
      { tipo: 'opciones', enunciado: `<p>Tu hermano te dice ${zh("请把窗户打开", "qǐng bǎ chuānghu dǎkāi")}. ¿Qué te pide?</p>`,
        opciones: ['Que cierres la ventana', 'Que abras la ventana', 'Que limpies la ventana', 'Que cuelgues un espejo'], correcta: 1,
        pista: `<p>Busca el verbo después de ${zh("窗户", "chuānghu")}.</p>`,
        solucion: `<p>${zh("打开", "dǎkāi")} es «abrir»; con ${zh("把", "bǎ")}, la ventana es una en concreto.</p>` },
    ],
    fuentes: [SILABO, DART_9, OXFORD_BA, MIT],
  });

  L('La pasiva con 叫 y 让', {
    objetivo: `Armar la pasiva con ${zh("叫", "jiào")} y ${zh("让", "ràng")} como alternativas coloquiales de ${zh("被", "bèi")}, recordar que el agente es obligatorio y hablar de contratiempos con palabras como ${zh("批评", "pīpíng")} o ${zh("道歉", "dàoqiàn")}.`,
    explicacion: `
      ${tabla([
        ['批评', 'pīpíng', 'criticar, regañar'], ['表扬', 'biǎoyáng', 'elogiar'], ['打扰', 'dǎrǎo', 'molestar, interrumpir'], ['通知', 'tōngzhī', 'avisar; aviso'], ['浪费', 'làngfèi', 'desperdiciar'],
        ['粗心', 'cūxīn', 'descuidado'], ['文件', 'wénjiàn', 'documento, archivo'], ['资料', 'zīliào', 'material, datos'], ['记者', 'jìzhě', 'reportero, periodista'], ['吹', 'chuī', 'soplar'],
        ['破', 'pò', 'romperse; roto'], ['结果', 'jiéguǒ', 'resultado; al final'], ['准时', 'zhǔnshí', 'puntual, a la hora'], ['按时', 'ànshí', 'a tiempo, según el horario'], ['道歉', 'dàoqiàn', 'pedir disculpas'],
      ])}
      <h3>¿Qué pasa cuando algo te sucede por culpa de otro?</h3>
      <p>Tu hermano rompió tu documento sin querer. En español dices «mi documento fue roto por mi hermano» o, hablando, «mi hermano me rompió el documento». En «La voz pasiva con ${zh("被", "bèi")}» viste ${zh("被", "bèi")}, la forma habitual. Según MIT, ${zh("叫", "jiào")} y ${zh("让", "ràng")} son alternativas a ${zh("被", "bèi")}, y algunas son más coloquiales. Las frases de ejemplo son de la lección.</p>
      <h3>La estructura</h3>
      <p>El sílabo de HSK 4 la escribe así: sujeto, ${zh("叫", "jiào")} o ${zh("让", "ràng")}, quien hace la acción (el <strong>agente</strong>), verbo y algo más. El sujeto es quien recibe la acción, no quien la hace. Un ejemplo: ${zh("文件叫弟弟弄破了", "wénjiàn jiào dìdi nòngpò le")}, «el documento fue roto por mi hermano». Y con ${zh("让", "ràng")}: ${zh("窗户让风吹开了", "chuānghu ràng fēng chuīkāi le")}, «la ventana fue abierta por el viento».</p>
      <p>Oxford explica que lo que acompaña al verbo es lo mismo que con ${zh("把", "bǎ")}: un resultado, una dirección o ${zh("了", "le")}. Dartmouth añade que el verbo no va solo.</p>
      <h3>El agente es obligatorio</h3>
      <p>Aquí está la diferencia clave. Oxford dice que con ${zh("被", "bèi")} el agente se puede omitir, pero con ${zh("叫", "jiào")} y ${zh("让", "ràng")} no. Mira la tabla.</p>
      ${cuadro(['Palabra', 'Agente', 'Frase de ejemplo'], [
        [zh('被', 'bèi'), 'Se puede omitir.', zh('文件被弄破了', 'wénjiàn bèi nòngpò le')],
        [zh('叫', 'jiào') + ', ' + zh('让', 'ràng'), 'Siempre se dice.', zh('文件叫弟弟弄破了', 'wénjiàn jiào dìdi nòngpò le')],
      ])}
      <p>MIT explica que con ${zh("叫", "jiào")} o ${zh("让", "ràng")} hay que decir quién, aunque sea solo ${zh("人", "rén")}, «alguien».</p>
      <h3>¿Dónde van la negación y los adverbios?</h3>
      <p>Oxford dice que los adverbios y la negación (${zh("不", "bù")}, ${zh("没", "méi")}) van antes de ${zh("叫", "jiào")} y ${zh("让", "ràng")}: ${zh("窗户没让风吹开", "chuānghu méi ràng fēng chuīkāi")}, «el viento no abrió la ventana». Los adverbios de manera con ${zh("地", "de")}, en cambio, van antes del verbo principal.</p>
      <h3>Cuándo se usa y cuándo no</h3>
      <p>MIT señala que esta pasiva aparece en la mayoría de los casos, aunque no en todos, con efectos desfavorables, como romper, perder o dañar, y que se usa mucho menos que la pasiva del inglés. Por ejemplo: ${zh("我叫老师批评了", "wǒ jiào lǎoshī pīpíng le")}, «el maestro me regañó». Y Oxford añade que para órdenes o favores no se usa la pasiva, sino ${zh("把", "bǎ")}: ${zh("请把文件给我", "qǐng bǎ wénjiàn gěi wǒ")}, «dame el documento».</p>
      <p class="nota"><strong>Trampa común:</strong> ${zh("让", "ràng")} y ${zh("叫", "jiào")} también son verbos con significado propio, y la frase puede ser ambigua. Oxford muestra que la misma oración puede ser pasiva o «déjalo que…». Compara ${zh("文件让他弄破了", "wénjiàn ràng tā nòngpò le")}, pasiva, con ${zh("老师让我通知大家", "lǎoshī ràng wǒ tōngzhī dàjiā")}, donde ${zh("让", "ràng")} es «pedir»: «el maestro me pidió avisar a todos». Esa segunda forma la verás en la siguiente lección.</p>`,
    ejemplo: `
      <p>Ana trabajó en un documento y su hermano lo rompió sin querer. Ana lo cuenta con ${zh("叫", "jiào")}.</p>
      <ol class="pasos-ej">
        <li>Parte de la frase activa: ${zh("弟弟弄破了文件", "dìdi nòngpò le wénjiàn")}, «mi hermano rompió el documento».</li>
        <li>Mueve lo que sufrió la acción al inicio: ${zh("文件", "wénjiàn")}.</li>
        <li>Pon ${zh("叫", "jiào")} y después a quien lo hizo, ${zh("弟弟", "dìdi")}. Aquí el agente no se puede quitar.</li>
        <li>Deja el verbo con su resultado: ${zh("弄破了", "nòngpò le")}. Queda ${zh("文件叫弟弟弄破了", "wénjiàn jiào dìdi nòngpò le")}.</li>
        <li>Si sigues contando, une más frases: ${zh("弟弟太粗心了，文件叫他弄破了，他跟我道歉了", "dìdi tài cūxīn le, wénjiàn jiào tā nòngpò le, tā gēn wǒ dàoqiàn le")}, «mi hermano es muy descuidado, él rompió el documento y me pidió disculpas».</li>
      </ol>
      <p>Para comprobar, busca el agente después de ${zh("叫", "jiào")} y el verbo con algo detrás. Resultado: <span class="resultado">${zh("文件叫弟弟弄破了", "wénjiàn jiào dìdi nòngpò le")} = «el documento fue roto por mi hermano»</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir ${zh("文件叫弄破了", "wénjiàn jiào nòngpò le")}, sin agente. Con ${zh("叫", "jiào")} no se puede; si no hay agente, usa ${zh("被", "bèi")}.</p>`,
    vidaReal: `
      <p>Esta forma sirve cuando cuentas un contratiempo y quieres decir quién lo causó:</p>
      <ul>
        <li>Explicar que un papel de la escuela se rompió por culpa de otra persona.</li>
        <li>Contar que el maestro te regañó por un descuido.</li>
        <li>Contar que algo tuyo se dañó o se perdió por culpa de otra persona.</li>
        <li>Entender la diferencia entre una pasiva y una frase con «pedir» cuando aparece ${zh("让", "ràng")}.</li>
        <li>Leer avisos o noticias donde algo malo le pasó a alguien.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «mi documento fue roto por mi hermano».</p>',
        respuesta: ['我的', '文件', '叫', '弟弟', '弄破了'], pinyin: ['wǒ de', 'wénjiàn', 'jiào', 'dìdi', 'nòngpò le'], lang: 'zh-Hans',
        pista: `<p>Quien hace la acción va justo después de ${zh("叫", "jiào")}.</p>`,
        solucion: `<p>${zh("我的文件叫弟弟弄破了", "wǒ de wénjiàn jiào dìdi nòngpò le")}: lo que sufre la acción, ${zh("叫", "jiào")}, el agente y el verbo con resultado.</p>` },
      { tipo: 'opciones', enunciado: `<p>Quieres decir «el documento fue roto por él» con ${zh("让", "ràng")}. ¿Qué frase está bien?</p>`,
        opciones: [zh('文件让弄破了', 'wénjiàn ràng nòngpò le'), zh('文件让他弄破了', 'wénjiàn ràng tā nòngpò le'), zh('文件弄破让他了', 'wénjiàn nòngpò ràng tā le'), zh('让他文件弄破了', 'ràng tā wénjiàn nòngpò le')], correcta: 1,
        pista: `<p>Con ${zh("让", "ràng")} el agente no puede faltar.</p>`,
        solucion: `<p>${zh("文件让他弄破了", "wénjiàn ràng tā nòngpò le")}: el agente ${zh("他", "tā")} va entre ${zh("让", "ràng")} y el verbo.</p>` },
      { tipo: 'opciones', enunciado: `<p>Quieres decir «el viento no abrió la ventana». ¿Dónde va ${zh("没", "méi")}?</p>`,
        opciones: [zh('窗户让风没吹开', 'chuānghu ràng fēng méi chuīkāi'), zh('窗户让没风吹开', 'chuānghu ràng méi fēng chuīkāi'), zh('没窗户让风吹开', 'méi chuānghu ràng fēng chuīkāi'), zh('窗户没让风吹开', 'chuānghu méi ràng fēng chuīkāi')], correcta: 3,
        pista: `<p>La negación se coloca antes de ${zh("让", "ràng")}.</p>`,
        solucion: `<p>${zh("窗户没让风吹开", "chuānghu méi ràng fēng chuīkāi")}: ${zh("没", "méi")} va antes de ${zh("让", "ràng")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «el documento fue roto» sin decir por quién. ¿Qué palabra puedes usar?</p>',
        opciones: [zh('叫', 'jiào'), zh('让', 'ràng'), zh('被', 'bèi'), zh('把', 'bǎ')], correcta: 2,
        pista: '<p>Solo una de las tres pasivas deja omitir el agente.</p>',
        solucion: `<p>${zh("文件被弄破了", "wénjiàn bèi nòngpò le")}: con ${zh("被", "bèi")} el agente es opcional; con ${zh("叫", "jiào")} y ${zh("让", "ràng")} es obligatorio.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("道歉")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['dào qiàn'],
        pista: '<p>Las dos sílabas son de tono bajando.</p>',
        solucion: `<p>${zh("道歉", "dàoqiàn")}: <strong>dào qiàn</strong>.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("老师让我通知大家", "lǎoshī ràng wǒ tōngzhī dàjiā")}?</p>`,
        opciones: ['Todos me avisaron al maestro', 'El maestro me pidió que avisara a todos', 'El maestro fue avisado por todos', 'Yo fui regañado por el maestro'], correcta: 1,
        pista: `<p>Aquí ${zh("让", "ràng")} no marca una pasiva: mira quién hace el verbo ${zh("通知", "tōngzhī")}.</p>`,
        solucion: `<p>${zh("让", "ràng")} es «pedir»: el maestro pide y yo aviso. No es una pasiva.</p>` },
    ],
    fuentes: [SILABO, MIT, OXFORD_BEI, DART_16],
  });

  L('Hacer que alguien haga algo: 使 y 让', {
    objetivo: `Decir que algo o alguien hace que otra persona sienta o haga algo con ${zh("让", "ràng")} y ${zh("使", "shǐ")}, reconocer el «pivote» de la frase y hablar de sentimientos con palabras como ${zh("后悔", "hòuhuǐ")} o ${zh("自信", "zìxìn")}.`,
    explicacion: `
      ${tabla([
        ['使', 'shǐ', 'hacer que; causar'], ['后悔', 'hòuhuǐ', 'arrepentirse'], ['愉快', 'yúkuài', 'contento, agradable'], ['烦恼', 'fánnǎo', 'molesto, preocupado'], ['无聊', 'wúliáo', 'aburrido'],
        ['鼓励', 'gǔlì', 'animar; ánimo'], ['印象', 'yìnxiàng', 'impresión'], ['效果', 'xiàoguǒ', 'efecto'], ['尊重', 'zūnzhòng', 'respetar'], ['感觉', 'gǎnjué', 'sentir; sensación'],
        ['感谢', 'gǎnxiè', 'agradecer'], ['吸引', 'xīyǐn', 'atraer'], ['引起', 'yǐnqǐ', 'provocar, causar'], ['轻松', 'qīngsōng', 'relajado; fácil'], ['自信', 'zìxìn', 'seguro de sí; confianza en uno mismo'],
      ])}
      <h3>¿Cómo se dice «esto me hizo sentir…»?</h3>
      <p>Un amigo te anima antes de un examen y por eso te sientes seguro. En español dices «su ánimo me dio confianza» o «me hizo sentir seguro»: algo hace que otra persona sienta o haga algo. El chino lo expresa con ${zh("让", "ràng")}. Las frases de ejemplo son de la lección.</p>
      <h3>La estructura con ${zh("让", "ràng")}</h3>
      <p>Dartmouth explica que después de ${zh("让", "ràng")} va una cláusula con un <strong>pivote</strong>: la persona que va justo después de ${zh("让", "ràng")} es a la vez el objeto de ${zh("让", "ràng")} y el sujeto de lo que sigue. Esa cláusula puede terminar en un verbo o en un adjetivo. El sílabo de HSK 4 la escribe como sujeto, ${zh("使", "shǐ")} o ${zh("让", "ràng")}, un pronombre de persona y una frase verbal.</p>
      ${cuadro(['Causa', 'Pivote', 'Lo que sigue', 'Frase de ejemplo'], [
        ['Una cosa o hecho', 'La persona', 'Un sentimiento', zh('这件事让我很后悔', 'zhè jiàn shì ràng wǒ hěn hòuhuǐ')],
        ['Una persona', 'Otra persona', 'Un verbo', zh('妈妈让我准时回家', 'māma ràng wǒ zhǔnshí huí jiā')],
      ])}
      <p>En la primera frase, ${zh("我", "wǒ")} es el pivote: es lo que recibe el efecto de «esto» y, a la vez, es quien «se arrepiente». En la segunda, ${zh("我", "wǒ")} recibe la petición de mamá y a la vez es quien vuelve a casa. Otra frase de ejemplo: ${zh("朋友的鼓励让我很自信", "péngyou de gǔlì ràng wǒ hěn zìxìn")}, «el ánimo de mi amigo me da seguridad».</p>
      <h3>¿Y ${zh("使", "shǐ")}?</h3>
      <p>Dartmouth dice que ${zh("使", "shǐ")} significa «causar», «permitir» o «pedir» y exige también un pivote. La misma fuente señala que esta frase suele verse en textos escritos. MIT lo traduce como «hacer que alguien sienta algo». Así, ${zh("这件事使我很后悔", "zhè jiàn shì shǐ wǒ hěn hòuhuǐ")} se entiende como la frase con ${zh("让", "ràng")}, pero suena más escrita (simplificación de la lección). Recomendación de la lección: en una conversación, usa ${zh("让", "ràng")}.</p>
      <h3>«Dejar» y «hacer que»</h3>
      <p>MIT incluye ${zh("让", "ràng")} con sentido de «dejar»: ${zh("他不让我看电视", "tā bù ràng wǒ kàn diànshì")}, «no me deja ver televisión». Fíjate que la estructura es idéntica. Lo que cambia es el sentido: «dejar», «pedir» o «hacer que». El contexto te lo dice. Con una causa que no es una persona, como ${zh("这个电影", "zhège diànyǐng")} en ${zh("这个电影让我很无聊", "zhège diànyǐng ràng wǒ hěn wúliáo")}, lo natural es «hacer que» (simplificación de la lección).</p>
      <h3>Otras dos estructuras del sílabo</h3>
      <p>El sílabo agrupa en esta misma familia otros dos patrones: ${zh("表扬", "biǎoyáng")} o ${zh("批评", "pīpíng")} más una persona más un verbo, y ${zh("选", "xuǎn")} más una persona más ${zh("当", "dāng")} más un cargo. Aquí solo los mencionamos, porque el sílabo no da más detalle.</p>
      <p class="nota"><strong>Trampa común:</strong> repetir el pivote, como ${zh("这件事让我我很后悔", "zhè jiàn shì ràng wǒ wǒ hěn hòuhuǐ")}. La persona se escribe una sola vez: ya hace dos trabajos.</p>`,
    ejemplo: `
      <p>Carla no estudió y le fue mal en el examen. Quiere decir que eso le hizo arrepentirse.</p>
      <ol class="pasos-ej">
        <li>Elige la causa: «lo que pasó con el examen», ${zh("这件事", "zhè jiàn shì")}.</li>
        <li>Pon ${zh("让", "ràng")} después de la causa: ${zh("这件事让", "zhè jiàn shì ràng")}.</li>
        <li>Escribe una sola vez a la persona que lo siente, el pivote: ${zh("这件事让我", "zhè jiàn shì ràng wǒ")}.</li>
        <li>Termina con el sentimiento, un adjetivo o verbo: ${zh("很后悔", "hěn hòuhuǐ")}.</li>
        <li>Si la quieres más escrita, cambia ${zh("让", "ràng")} por ${zh("使", "shǐ")}: ${zh("这件事使我很后悔", "zhè jiàn shì shǐ wǒ hěn hòuhuǐ")}.</li>
      </ol>
      <p>Para comprobar, lee la frase en español: «esto hizo que yo me arrepintiera». Si tiene sentido, la estructura está bien. Resultado: <span class="resultado">${zh("这件事让我很后悔", "zhè jiàn shì ràng wǒ hěn hòuhuǐ")} = «esto me dio mucho arrepentimiento»</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner el sentimiento antes de la persona, como ${zh("这件事让很后悔我", "zhè jiàn shì ràng hěn hòuhuǐ wǒ")}. Primero va quien lo siente y después lo que siente.</p>`,
    vidaReal: `
      <p>Esta estructura sirve para hablar de causas y efectos en las personas:</p>
      <ul>
        <li>Decir que una noticia o una película te hizo sentir algo.</li>
        <li>Agradecer a alguien explicando cómo te ayudó a sentirte mejor.</li>
        <li>Entender una frase como «mamá me pidió volver a casa a tiempo».</li>
        <li>Leer textos escritos que explican qué provoca un cambio.</li>
        <li>Contar lo que te dejan o no te dejan hacer en casa.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «esto me dio mucho arrepentimiento».</p>',
        respuesta: ['这件事', '让', '我', '很', '后悔'], pinyin: ['zhè jiàn shì', 'ràng', 'wǒ', 'hěn', 'hòuhuǐ'], lang: 'zh-Hans',
        pista: `<p>La causa va primero; el pivote, justo después de ${zh("让", "ràng")}.</p>`,
        solucion: `<p>${zh("这件事让我很后悔", "zhè jiàn shì ràng wǒ hěn hòuhuǐ")}: causa, ${zh("让", "ràng")}, pivote y sentimiento.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir, en una conversación, «su ánimo me dio confianza». ¿Qué frase está bien armada?</p>',
        opciones: [zh('他的鼓励我让很自信', 'tā de gǔlì wǒ ràng hěn zìxìn'), zh('让他的鼓励我很自信', 'ràng tā de gǔlì wǒ hěn zìxìn'), zh('他的鼓励让我很自信', 'tā de gǔlì ràng wǒ hěn zìxìn'), zh('他的鼓励让很自信我', 'tā de gǔlì ràng hěn zìxìn wǒ')], correcta: 2,
        pista: `<p>La causa, luego ${zh("让", "ràng")}, luego quien recibe el efecto.</p>`,
        solucion: `<p>${zh("他的鼓励让我很自信", "tā de gǔlì ràng wǒ hěn zìxìn")}: ${zh("我", "wǒ")} va justo después de ${zh("让", "ràng")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué significa ${zh("他不让我看电视", "tā bù ràng wǒ kàn diànshì")}?</p>`,
        opciones: ['Me obliga a ver televisión', 'No me deja ver televisión', 'Él no quiere ver televisión', 'Yo no veo televisión con él'], correcta: 1,
        pista: `<p>Aquí ${zh("让", "ràng")} tiene el sentido de «dejar», y está negado.</p>`,
        solucion: `<p>${zh("不让", "bù ràng")} es «no dejar»: «no me deja ver televisión».</p>` },
      { tipo: 'opciones', enunciado: '<p>Según Dartmouth, ¿qué palabra se ve más en textos escritos?</p>',
        opciones: [zh('使', 'shǐ'), zh('让', 'ràng'), 'Las dos se usan igual de seguido en cualquier texto'], correcta: 0,
        pista: '<p>La fuente describe una de las dos como propia de textos escritos.</p>',
        solucion: `<p>${zh("使", "shǐ")} suele verse en textos escritos; en conversación se usa ${zh("让", "ràng")}.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("愉快")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['yú kuài'],
        pista: '<p>La primera sílaba sube; la segunda baja.</p>',
        solucion: `<p>${zh("愉快", "yúkuài")}: <strong>yú kuài</strong>.</p>` },
      { tipo: 'opciones', enunciado: `<p>En ${zh("这件事让我很后悔", "zhè jiàn shì ràng wǒ hěn hòuhuǐ")}, ¿cuál es el pivote?</p>`,
        opciones: [zh('这件事', 'zhè jiàn shì'), zh('让', 'ràng'), zh('我', 'wǒ'), zh('后悔', 'hòuhuǐ')], correcta: 2,
        pista: `<p>El pivote hace dos trabajos: es objeto de ${zh("让", "ràng")} y sujeto de lo que sigue.</p>`,
        solucion: `<p>${zh("我", "wǒ")} es objeto de ${zh("让", "ràng")} y sujeto de ${zh("后悔", "hòuhuǐ")}.</p>` },
    ],
    fuentes: [SILABO, DART_3, DART_27, MIT],
  });

  L('Comparar: 不如 y 跟…相比', {
    objetivo: `Comparar dos cosas con ${zh("不如", "bùrú")} («no es tan bueno como») y con ${zh("跟", "gēn")}…${zh("相比", "xiāngbǐ")} («comparado con…»), y hablar de ventajas y defectos con palabras como ${zh("优点", "yōudiǎn")} y ${zh("缺点", "quēdiǎn")}.`,
    explicacion: `
      ${tabla([
        ['不如', 'bùrú', 'no ser tan bueno como'], ['相比', 'xiāngbǐ', 'comparar(se)'], ['优点', 'yōudiǎn', 'ventaja, punto fuerte'], ['缺点', 'quēdiǎn', 'defecto, punto débil'], ['相同', 'xiāngtóng', 'igual, idéntico'],
        ['标准', 'biāozhǔn', 'criterio, estándar'], ['超过', 'chāoguò', 'superar, pasar de'], ['方面', 'fāngmiàn', 'aspecto, lado'], ['条件', 'tiáojiàn', 'condición'], ['好处', 'hǎochù', 'beneficio'],
        ['坏处', 'huàichù', 'perjuicio, desventaja'], ['特点', 'tèdiǎn', 'característica'], ['普通', 'pǔtōng', 'común, normal'], ['强', 'qiáng', 'fuerte; mejor'], ['更加', 'gèngjiā', 'todavía más'],
      ])}
      <h3>¿Cómo se dice «no es tan bueno como»?</h3>
      <p>Imagina que debes elegir entre dos escuelas o dos teléfonos. Casi siempre acabas diciendo cuál es mejor. En «Comparar con ${zh("比", "bǐ")}» viste cómo decir que algo es más grande o más alto. Ahora aprenderás dos formas más del sílabo de HSK 4: ${zh("不如", "bùrú")} y ${zh("跟", "gēn")}…${zh("相比", "xiāngbǐ")}. Las frases de ejemplo son de la lección.</p>
      <h3>A ${zh("不如", "bùrú")} B</h3>
      <p>Según Dartmouth, ${zh("不如", "bùrú")} es un verbo de comparación que indica inferioridad. Antes de él puede haber un sustantivo, un pronombre, un verbo o hasta una oración entera. Por ejemplo, ${zh("看书不如看电影", "kàn shū bùrú kàn diànyǐng")} compara dos acciones: «leer no es tan bueno como ver una película». La fuente dice que A ${zh("不如", "bùrú")} B puede ir solo, con el sentido de «A es inferior a B».</p>
      <h3>Añadir el aspecto</h3>
      <p>Si quieres decir en qué es inferior, el <strong>aspecto</strong> va después de B: ${zh("我不如我姐姐高", "wǒ bùrú wǒ jiějie gāo")}, «no soy tan alta como mi hermana». Dartmouth precisa que ese aspecto se dice con adjetivos de sentido positivo (como ${zh("漂亮", "piàoliang")} o ${zh("高", "gāo")}), no negativo.</p>
      ${cuadro(['Frase de ejemplo', '¿Está bien?', 'Por qué'], [
        [zh('我不如我姐姐高', 'wǒ bùrú wǒ jiějie gāo'), 'Sí', 'El adjetivo es positivo.'],
        [zh('我不如我姐姐难看', 'wǒ bùrú wǒ jiějie nánkàn'), 'No', 'La fuente marca como incorrecto un adjetivo negativo.'],
      ])}
      <h3>${zh("跟", "gēn")}… ${zh("相比", "xiāngbǐ")}</h3>
      <p>Cuando quieres presentar primero con qué comparas, usas ${zh("跟", "gēn")} más B y ${zh("相比", "xiāngbǐ")}. Dartmouth explica que ${zh("相比", "xiāngbǐ")} es un verbo que compara o contrasta dos cosas y que suele ir precedido de ${zh("跟", "gēn")} o ${zh("和", "hé")}. La frase empieza con lo que se compara y después va lo que dices de A. Un ejemplo: ${zh("跟去年相比，今年更加冷", "gēn qùnián xiāngbǐ, jīnnián gèngjiā lěng")}, «comparado con el año pasado, este año hace todavía más frío». Otro, con ventajas y defectos: ${zh("跟那个手机相比，这个手机的缺点是太贵了", "gēn nàge shǒujī xiāngbǐ, zhège shǒujī de quēdiǎn shì tài guì le")}, «comparado con ese teléfono, el defecto de este es que es muy caro».</p>
      <h3>Tres formas, tres significados</h3>
      <p>Ya conoces ${zh("比", "bǐ")} y ${zh("没有", "méiyǒu")}. Ninguna fuente compara las tres formas, así que esta tabla es una recomendación de la lección.</p>
      ${cuadro(['Forma', 'Qué dice', 'Frase de ejemplo'], [
        [zh('比', 'bǐ'), 'A supera a B.', zh('这个比那个高', 'zhège bǐ nàge gāo')],
        [zh('没有', 'méiyǒu'), 'A no llega a B en ese aspecto.', zh('这个没有那个高', 'zhège méiyǒu nàge gāo')],
        [zh('不如', 'bùrú'), 'A es inferior a B (puede ir sin aspecto).', zh('这个不如那个高', 'zhège bùrú nàge gāo')],
      ])}
      <p class="nota"><strong>Trampa común:</strong> terminar con un adjetivo negativo, como ${zh("难看", "nánkàn")}. Recomendación de la lección: si quieres hablar de algo malo, di el aspecto en positivo (por ejemplo, ${zh("好", "hǎo")}) y deja que ${zh("不如", "bùrú")} lo vuelva inferior.</p>`,
    ejemplo: `
      <p>Marta debe elegir entre dos teléfonos. El primero es más barato, pero el segundo es mejor. Va a explicarlo.</p>
      <ol class="pasos-ej">
        <li>Decide quién es A y quién es B. A es el teléfono que pierde: ${zh("这个手机", "zhège shǒujī")}. B es el que gana: ${zh("那个手机", "nàge shǒujī")}.</li>
        <li>Une las dos cosas con ${zh("不如", "bùrú")}: ${zh("这个手机不如那个手机", "zhège shǒujī bùrú nàge shǒujī")}. Esto ya es una frase completa.</li>
        <li>Añade el aspecto en positivo, al final: ${zh("这个手机不如那个手机好", "zhège shǒujī bùrú nàge shǒujī hǎo")}.</li>
        <li>Para dar una razón, empieza con ${zh("跟", "gēn")} y ${zh("相比", "xiāngbǐ")}: ${zh("跟那个手机相比，这个手机的缺点是太贵了", "gēn nàge shǒujī xiāngbǐ, zhège shǒujī de quēdiǎn shì tài guì le")}.</li>
      </ol>
      <p>Para comprobar, lee la frase en español: «A no es tan bueno como B». Resultado: <span class="resultado">${zh("这个手机不如那个手机好", "zhège shǒujī bùrú nàge shǒujī hǎo")} = «este teléfono no es tan bueno como ese»</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner el aspecto antes de B, como ${zh("这个手机好不如那个手机", "zhège shǒujī hǎo bùrú nàge shǒujī")}. El adjetivo va al final, después de B.</p>`,
    vidaReal: `
      <p>Estas formas sirven cada vez que tienes que elegir:</p>
      <ul>
        <li>Decir que una opción es peor que otra sin repetir todos los detalles.</li>
        <li>Presentar las ventajas y los defectos de dos productos o dos escuelas.</li>
        <li>Explicar por qué prefieres una cosa a otra.</li>
        <li>Leer reseñas y comparaciones sencillas, donde se habla de cada ${zh("方面", "fāngmiàn")} de un producto.</li>
        <li>Decir en qué aspecto una persona o una cosa es inferior a otra.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «no soy tan alta como mi hermana».</p>',
        respuesta: ['我', '不如', '我姐姐', '高'], pinyin: ['wǒ', 'bùrú', 'wǒ jiějie', 'gāo'], lang: 'zh-Hans',
        pista: `<p>El aspecto, ${zh("高", "gāo")}, va al final, después de B.</p>`,
        solucion: `<p>${zh("我不如我姐姐高", "wǒ bùrú wǒ jiějie gāo")}: A, ${zh("不如", "bùrú")}, B y el adjetivo.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «comparado con el año pasado, este año hace todavía más frío».</p>',
        respuesta: ['跟', '去年', '相比', '今年', '更加', '冷'], pinyin: ['gēn', 'qùnián', 'xiāngbǐ', 'jīnnián', 'gèngjiā', 'lěng'], lang: 'zh-Hans',
        alternativas: [['今年', '跟', '去年', '相比', '更加', '冷']],
        pista: `<p>Primero va con qué comparas, entre ${zh("跟", "gēn")} y ${zh("相比", "xiāngbǐ")}.</p>`,
        solucion: `<p>${zh("跟去年相比，今年更加冷", "gēn qùnián xiāngbǐ, jīnnián gèngjiā lěng")}: la comparación va al inicio y luego lo que dices de A.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «no soy tan bonita como mi hermana». ¿Cuál está bien?</p>',
        opciones: [zh('我不如我姐姐难看', 'wǒ bùrú wǒ jiějie nánkàn'), zh('我不如漂亮我姐姐', 'wǒ bùrú piàoliang wǒ jiějie'), zh('我不如我姐姐漂亮', 'wǒ bùrú wǒ jiějie piàoliang'), zh('我姐姐不如漂亮我', 'wǒ jiějie bùrú piàoliang wǒ')], correcta: 2,
        pista: '<p>El adjetivo va después de B y es de sentido positivo.</p>',
        solucion: `<p>${zh("我不如我姐姐漂亮", "wǒ bùrú wǒ jiějie piàoliang")}: B, ${zh("我姐姐", "wǒ jiějie")}, va antes del adjetivo positivo.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué significa ${zh("看书不如看电影", "kàn shū bùrú kàn diànyǐng")}?</p>`,
        opciones: ['Leer no es tan bueno como ver una película', 'Ver una película es peor que leer', 'Leer y ver películas es lo mismo', 'No leo ni veo películas'], correcta: 0,
        pista: `<p>${zh("不如", "bùrú")} dice que lo primero es inferior a lo segundo.</p>`,
        solucion: `<p>A ${zh("不如", "bùrú")} B: leer es inferior a ver una película, según quien habla.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("优点")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['yōu diǎn'],
        pista: '<p>La primera sílaba es alta y plana; la segunda baja y sube.</p>',
        solucion: `<p>${zh("优点", "yōudiǎn")}: <strong>yōu diǎn</strong>.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("跟姐姐相比，我的缺点是太粗心", "gēn jiějie xiāngbǐ, wǒ de quēdiǎn shì tài cūxīn")}?</p>`,
        opciones: ['Mi hermana y yo somos igual de descuidadas', 'Mi hermana tiene mucha más suerte que yo', 'Comparado conmigo, el defecto de mi hermana es la prisa', 'Comparada con mi hermana, mi defecto es ser demasiado descuidada'], correcta: 3,
        pista: `<p>Lo que va entre ${zh("跟", "gēn")} y ${zh("相比", "xiāngbǐ")} es con quien se compara.</p>`,
        solucion: `<p>Se compara con la hermana, y el defecto, ${zh("缺点", "quēdiǎn")}, es de quien habla: ${zh("太粗心", "tài cūxīn")}.</p>` },
    ],
    fuentes: [SILABO, DART_8, DART_20],
  });

  L('Lograrlo o no: 得了 y 不了', {
    objetivo: `Decir con ${zh("不了", "bu liǎo")} que algo no se puede hacer porque las condiciones no lo permiten, saber por qué casi siempre va en negativo y hablar de deporte y esfuerzo con palabras como ${zh("力气", "lìqi")} y ${zh("目标", "mùbiāo")}.`,
    explicacion: `
      <p>Las frases de ejemplo son de la lección. Un aviso sobre el pinyin: ${zh("不", "bù")} dentro de ${zh("不了", "bu liǎo")} se lee sin tono, igual que en ${zh("受不了", "shòubuliǎo")} del sílabo.</p>
      ${tabla([
        ['来得及', 'láidejí', 'dar tiempo, llegar a tiempo'], ['来不及', 'láibují', 'no dar tiempo'], ['受不了', 'shòubuliǎo', 'no aguantar, no soportar'], ['完全', 'wánquán', 'completamente, del todo'], ['力气', 'lìqi', 'fuerza física'],
        ['能够', 'nénggòu', 'poder, ser capaz de'], ['适应', 'shìyìng', 'adaptarse'], ['目标', 'mùbiāo', 'meta, objetivo'], ['实在', 'shízài', 'de verdad, en realidad'], ['达到', 'dádào', 'alcanzar, llegar a'],
        ['信心', 'xìnxīn', 'confianza (en que algo saldrá bien)'], ['厉害', 'lìhai', 'terrible; muy bueno, impresionante'], ['举', 'jǔ', 'levantar (algo hacia arriba)'], ['支持', 'zhīchí', 'apoyar'], ['千克', 'qiānkè', 'kilogramo'],
      ])}
      <h3>¿Cómo se dice «no puedo con esto»?</h3>
      <p>Alguien te pide cargar una caja enorme y tú contestas: «no puedo, pesa demasiado». No dices que no sepas hacerlo: dices que la situación no te lo permite. El sílabo de HSK 4 llama a esto <strong>complemento potencial</strong> y lo escribe verbo, ${zh("得", "de")} o ${zh("不", "bu")}, y ${zh("了", "liǎo")}. Dartmouth explica que indica si las condiciones, las de quien actúa o las de alrededor, permiten hacer la acción. Si el verbo tiene objeto, este va después del complemento: ${zh("这个盒子太大了，我一个人抬不了", "zhège hézi tài dà le, wǒ yī gè rén tái bu liǎo")}, «esta caja es muy grande, yo solo no puedo levantarla».</p>
      <h3>¿Qué quiere decir ese ${zh("了", "liǎo")}?</h3>
      <p>Aquí ${zh("了", "liǎo")} no es la partícula ${zh("了", "le")} de acción terminada, y por eso se lee distinto: <strong>liǎo</strong>. Dartmouth dice que a veces significa «terminar», como en ${zh("吃不了", "chī bu liǎo")}, que equivale a ${zh("吃不完", "chī bu wán")}, «no poder terminar de comer». Otras veces significa «quitar», como en ${zh("忘不了", "wàng bu liǎo")}, «no poder olvidar». Por eso ${zh("菜太多了，我们吃不了", "cài tài duō le, wǒmen chī bu liǎo")} quiere decir «hay demasiada comida, no podremos con ella».</p>
      <h3>¿Por qué casi siempre es negativo?</h3>
      <p>Dartmouth señala que esta forma suele aparecer en negativo, verbo+${zh("不", "bu")}+${zh("了", "liǎo")}, y que su pareja positiva suele ser ${zh("能", "néng")}, no el verbo con ${zh("得了", "de liǎo")}. Fíjate: para decir que sí puedes, se prefiere ${zh("他很有力气，能举二十千克", "tā hěn yǒu lìqi, néng jǔ èrshí qiānkè")}. En la lección «Poder y saber: ${zh("会", "huì")}, ${zh("能", "néng")} y ${zh("可以", "kěyǐ")}» viste ${zh("能", "néng")}. Oxford añade que la mayoría de los complementos potenciales se pueden cambiar por una oración con ${zh("能", "néng")} y un complemento de resultado: ${zh("吃不完", "chī bu wán")} es lo mismo que ${zh("不能吃完", "bù néng chī wán")}.</p>
      ${cuadro(['Forma', 'Qué dice', 'Frase de ejemplo'], [
        ['verbo + ' + zh('不', 'bu') + ' + ' + zh('了', 'liǎo'), 'No se puede: las condiciones no lo permiten.', zh('我举不了二十千克', 'wǒ jǔ bu liǎo èrshí qiānkè')],
        [zh('能', 'néng') + ' + verbo', 'Sí se puede (la forma habitual).', zh('我能举十千克', 'wǒ néng jǔ shí qiānkè')],
        [zh('受不了', 'shòubuliǎo'), 'No se aguanta; es una palabra fija.', zh('今天太热了，我实在受不了', 'jīntiān tài rè le, wǒ shízài shòubuliǎo')],
      ])}
      <p>Oxford avisa de algo más: en una frase con complemento potencial no se usa el ${zh("了", "le")} de acción terminada; si hay un ${zh("了", "le")} al final, solo marca un cambio de situación, como en ${zh("我们受不了了", "wǒmen shòubuliǎo le")}, «ya no aguantamos más». Aparte, la palabra ${zh("来不及", "láibují")} de la tabla se usa así en frases de ejemplo de la lección: ${zh("太晚了，来不及了", "tài wǎn le, láibují le")}, «es muy tarde, ya no hay tiempo»; su pareja ${zh("来得及", "láidejí")} se dice ${zh("现在去，还来得及", "xiànzài qù, hái láidejí")}, «si vas ahora, todavía das tiempo».</p>
      <p class="nota"><strong>Trampa común:</strong> confundirlo con el complemento de grado de la lección «Complemento de grado: ${zh("得", "de")}». Oxford explica que en ${zh("他跑得很快", "tā pǎo de hěn kuài")} aparece un adverbio como ${zh("很", "hěn")} antes del adjetivo; eso no es potencial. En el potencial, después del ${zh("得", "de")} va ${zh("了", "liǎo")} o un resultado, no un adjetivo con ${zh("很", "hěn")}.</p>`,
    ejemplo: `
      <p>Tomás empieza a hacer pesas. Su meta es levantar veinte kilos, pero hoy todavía no puede. Vamos a contarlo.</p>
      <ol class="pasos-ej">
        <li>Pregúntate si el problema son las condiciones: Tomás no tiene aún la fuerza. Por eso sirve el complemento potencial.</li>
        <li>Elige el verbo, ${zh("举", "jǔ")}, y ponle ${zh("不了", "bu liǎo")}: ${zh("举不了", "jǔ bu liǎo")}.</li>
        <li>Pon el objeto después del complemento: ${zh("举不了二十千克", "jǔ bu liǎo èrshí qiānkè")}.</li>
        <li>Añade quién es y por qué: ${zh("他现在力气不大，举不了二十千克", "tā xiànzài lìqi bù dà, jǔ bu liǎo èrshí qiānkè")}.</li>
        <li>Cierra con su meta, y aquí usa ${zh("能", "néng")} porque es positivo: ${zh("他很有信心，以后能达到目标", "tā hěn yǒu xìnxīn, yǐhòu néng dádào mùbiāo")}.</li>
      </ol>
      <p>Para comprobar, cambia la frase por ${zh("不能", "bù néng")} más el verbo: ${zh("他现在不能举二十千克", "tā xiànzài bù néng jǔ èrshí qiānkè")} dice casi lo mismo. Resultado: <span class="resultado">${zh("他现在力气不大，举不了二十千克", "tā xiànzài lìqi bù dà, jǔ bu liǎo èrshí qiānkè")} = «ahora tiene poca fuerza y no puede levantar veinte kilos»</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar el verbo con ${zh("得了", "de liǎo")} para decir que sí puedes, como ${zh("他举得了二十千克", "tā jǔ de liǎo èrshí qiānkè")}. Según Dartmouth, para lo positivo se prefiere ${zh("能", "néng")}.</p>`,
    vidaReal: `
      <p>Esta forma aparece cuando hablas de tus límites y de tus metas:</p>
      <ul>
        <li>Decir que no puedes ir a un lugar porque queda demasiado lejos.</li>
        <li>Explicar que hay tanta comida que no podrás terminarla.</li>
        <li>Contar que el calor, el ruido o el cansancio ya no se aguantan.</li>
        <li>Hablar de deporte: cuánto peso levantas hoy y qué meta quieres alcanzar.</li>
        <li>Entender mensajes de gente que dice «no me da tiempo» o «no puedo con esto».</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «no puedo levantar veinte kilos».</p>',
        respuesta: ['我', '举不了', '二十千克'], pinyin: ['wǒ', 'jǔ bu liǎo', 'èrshí qiānkè'], lang: 'zh-Hans',
        pista: `<p>El objeto, ${zh("二十千克", "èrshí qiānkè")}, va después del complemento.</p>`,
        solucion: `<p>${zh("我举不了二十千克", "wǒ jǔ bu liǎo èrshí qiānkè")}: sujeto, verbo con ${zh("不了", "bu liǎo")} y objeto.</p>` },
      { tipo: 'opciones', enunciado: '<p>Hay demasiada comida y no podrán terminarla. ¿Cuál frase lo dice?</p>',
        opciones: [zh('菜太多了，我们不吃了', 'cài tài duō le, wǒmen bù chī le'), zh('菜太多了，我们吃不了', 'cài tài duō le, wǒmen chī bu liǎo'), zh('菜太多了，我们吃得很快', 'cài tài duō le, wǒmen chī de hěn kuài'), zh('菜太多了，我们吃了不', 'cài tài duō le, wǒmen chī le bù')], correcta: 1,
        pista: `<p>Busca verbo, ${zh("不", "bu")} y ${zh("了", "liǎo")} juntos.</p>`,
        solucion: `<p>${zh("吃不了", "chī bu liǎo")} es «no poder con ello»; ${zh("不吃了", "bù chī le")} significa «ya no como» y ${zh("吃得很快", "chī de hěn kuài")} es «como rápido».</p>` },
      { tipo: 'opciones', enunciado: '<p>¿En cuál de estas frases el ' + zh('得', 'de') + ' forma un complemento de grado (cómo se hace la acción) y no un complemento potencial?</p>',
        opciones: [zh('我吃不了', 'wǒ chī bu liǎo'), zh('我们去不了', 'wǒmen qù bu liǎo'), zh('他跑得很快', 'tā pǎo de hěn kuài'), zh('我举不了', 'wǒ jǔ bu liǎo')], correcta: 2,
        pista: `<p>El de grado lleva un adverbio como ${zh("很", "hěn")} antes del adjetivo.</p>`,
        solucion: `<p>${zh("他跑得很快", "tā pǎo de hěn kuài")} dice cómo corre («corre muy rápido»). Las otras tres dicen que algo no se puede hacer.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("受不了")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['shòu bu liǎo'],
        pista: '<p>La primera sílaba baja de golpe; la segunda es neutra; la tercera baja y sube.</p>',
        solucion: `<p>${zh("受不了", "shòubuliǎo")}: <strong>shòu bu liǎo</strong>, «no aguantar».</p>` },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es la forma más habitual de decir «él puede levantar veinte kilos»?</p>',
        opciones: [zh('他举了二十千克', 'tā jǔ le èrshí qiānkè'), zh('他能举二十千克', 'tā néng jǔ èrshí qiānkè'), zh('他不举二十千克', 'tā bù jǔ èrshí qiānkè'), zh('他举不了二十千克', 'tā jǔ bu liǎo èrshí qiānkè')], correcta: 1,
        pista: `<p>Para lo positivo, Dartmouth prefiere ${zh("能", "néng")}.</p>`,
        solucion: `<p>${zh("他能举二十千克", "tā néng jǔ èrshí qiānkè")}. La última dice lo contrario, «no puede levantarlos».</p>` },
      { tipo: 'texto', enunciado: `<p>¿Qué significa ${zh("力气", "lìqi")} en español? Responde con una palabra.</p>`,
        respuestas: ['fuerza', 'la fuerza', 'fuerza fisica', 'la fuerza fisica'],
        pista: '<p>Es lo que necesitas para cargar una caja pesada.</p>',
        solucion: `<p>${zh("力气", "lìqi")} es «fuerza física»: ${zh("他很有力气", "tā hěn yǒu lìqi")}, «tiene mucha fuerza».</p>` },
    ],
    fuentes: [SILABO, DART_8, OXFORD_PVC, DART_16],
  });

  L('Preguntas que afirman: 难道…吗', {
    objetivo: `Reconocer y armar preguntas que no piden información sino que afirman lo contrario, con ${zh("难道", "nándào")}…${zh("吗", "ma")} y con palabras como ${zh("谁", "shéi")} o ${zh("哪儿", "nǎr")}, y hablar de actitudes y malentendidos.`,
    explicacion: `
      <p>Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['难道', 'nándào', '¿acaso…? (pregunta que enfatiza)'], ['本来', 'běnlái', 'en un principio, desde el comienzo'], ['责任', 'zérèn', 'responsabilidad'], ['态度', 'tàidù', 'actitud'], ['原谅', 'yuánliàng', 'perdonar, disculpar'],
        ['礼貌', 'lǐmào', 'cortesía; educado'], ['到底', 'dàodǐ', 'al final; en el fondo'], ['究竟', 'jiūjìng', 'en realidad (al preguntar)'], ['诚实', 'chéngshí', 'honesto'], ['故意', 'gùyì', 'a propósito, adrede'],
        ['耐心', 'nàixīn', 'paciencia; paciente'], ['仔细', 'zǐxì', 'con cuidado, con atención'], ['随便', 'suíbiàn', 'como sea, sin cuidado'], ['答应', 'dāying', 'prometer, aceptar'], ['拒绝', 'jùjué', 'rechazar'],
      ])}
      <h3>¿Qué pregunta no quiere respuesta?</h3>
      <p>Tu mamá te dice: «¿acaso crees que el dinero crece en los árboles?». No espera que contestes. Con esa pregunta te dice, en realidad, que el dinero no crece en los árboles. A esto se le llama <strong>pregunta retórica</strong>. Dartmouth explica que no necesita respuesta y que su fin principal es enfatizar: si la pregunta es negativa, enfatiza lo positivo; si es positiva, enfatiza lo negativo.</p>
      <h3>${zh("难道", "nándào")}… ${zh("吗", "ma")}</h3>
      <p>El sílabo de HSK 4 pone el patrón ${zh("难道", "nándào")}…${zh("吗", "ma")}. Dartmouth define ${zh("难道", "nándào")} como «no me digas que…», y Princeton lo glosa como «¿acaso el sujeto no…?». Dartmouth muestra ejemplos con ${zh("难道", "nándào")} antes del verbo, después del sujeto o antes del sujeto, y la pregunta termina en ${zh("吗", "ma")}. Por eso ${zh("难道你不知道吗", "nándào nǐ bù zhīdào ma")} y ${zh("你难道不知道吗", "nǐ nándào bù zhīdào ma")} son dos formas válidas de decir «¿acaso no lo sabes?».</p>
      <p>Mira cómo la pregunta afirma lo contrario de lo que parece:</p>
      ${cuadro(['Frase de ejemplo', 'Lo que dice de verdad'], [
        [zh('难道他不是你的朋友吗？', 'nándào tā bù shì nǐ de péngyou ma?'), 'Sí es tu amigo (pregunta negativa: afirma).'],
        [zh('难道我想这样吗？', 'nándào wǒ xiǎng zhèyàng ma?'), 'No quiero que sea así (pregunta positiva: niega).'],
      ])}
      <h3>Preguntas con palabra interrogativa</h3>
      <p>El sílabo también incluye en las preguntas retóricas las que llevan una palabra para preguntar, como ${zh("谁", "shéi")}, «quién», o ${zh("哪儿", "nǎr")}, «dónde». Dartmouth explica que una frase con un pronombre interrogativo se puede volver retórica y da ejemplos con ${zh("谁", "shéi")}, ${zh("什么", "shénme")} y ${zh("哪儿", "nǎr")}. Estas no llevan ${zh("难道", "nándào")} ni ${zh("吗", "ma")}, y casi siempre niegan:</p>
      <ul>
        <li>${zh("谁喜欢这样的态度呢？", "shéi xǐhuan zhèyàng de tàidù ne?")} significa «¿quién va a querer esa actitud?», es decir, nadie.</li>
        <li>${zh("我哪儿有时间呢？", "wǒ nǎr yǒu shíjiān ne?")} significa «¿de dónde voy a sacar tiempo?», es decir, no tengo tiempo.</li>
        <li>${zh("这又有什么难的？", "zhè yòu yǒu shénme nán de?")} significa «¿y qué tiene esto de difícil?», es decir, no es difícil. Dartmouth dice que con ${zh("又", "yòu")} la pregunta retórica se forma, en general, con ${zh("什么", "shénme")} o ${zh("谁", "shéi")}.</li>
      </ul>
      <p>Recuerda las preguntas con ${zh("不是", "bù shì")}…${zh("吗", "ma")} que viste en «Leer textos cortos»: ${zh("你不是学生吗？", "nǐ bù shì xuésheng ma?")} también es una pregunta que pide confirmar. Es un recuerdo de esa lección, no una regla de las fuentes.</p>
      <p class="nota"><strong>Trampa común:</strong> contestar como si fuera una pregunta normal. Si alguien te dice ${zh("难道你不知道吗？", "nándào nǐ bù zhīdào ma?")}, no necesita que expliques; ya piensa que sí lo sabías.</p>`,
    ejemplo: `
      <p>Ana le prometió a Pablo que lo ayudaría, pero no apareció. Pablo está molesto y quiere reclamarle con una pregunta retórica.</p>
      <ol class="pasos-ej">
        <li>Empieza con el hecho que los dos conocen: ${zh("你答应了我", "nǐ dāying le wǒ")}, «me lo prometiste».</li>
        <li>Piensa en una pregunta simple: ${zh("你忘了吗？", "nǐ wàng le ma?")}, «¿lo olvidaste?». Esta pide una respuesta.</li>
        <li>Añade ${zh("难道", "nándào")} antes del sujeto, para que ya no pida respuesta: ${zh("难道你忘了吗？", "nándào nǐ wàng le ma?")}.</li>
        <li>Une las dos partes: ${zh("你答应了我，难道你忘了吗？", "nǐ dāying le wǒ, nándào nǐ wàng le ma?")}.</li>
      </ol>
      <p>Para comprobar, pregúntate qué quiere que Ana entienda. No pregunta «¿lo olvidaste o no?», sino que dice «no deberías haberlo olvidado». Resultado: <span class="resultado">${zh("你答应了我，难道你忘了吗？", "nǐ dāying le wǒ, nándào nǐ wàng le ma?")} = «me lo prometiste, ¿acaso lo olvidaste?»</span>.</p>
      <p class="nota"><strong>Ojo:</strong> ${zh("难道你忘了？", "nándào nǐ wàng le?")} no trae el ${zh("吗", "ma")} final. El sílabo escribe el patrón completo, ${zh("难道", "nándào")}…${zh("吗", "ma")}, y en esta unidad lo practicamos así.</p>`,
    vidaReal: `
      <p>Las preguntas retóricas son muy comunes cuando la gente habla con emoción:</p>
      <ul>
        <li>Reclamar algo con firmeza sin levantar la voz.</li>
        <li>Entender que alguien está molesto aunque su frase parezca una duda.</li>
        <li>Responder bien a un malentendido, sin contestar «sí» o «no» por error.</li>
        <li>Distinguir una pregunta que de verdad pide un dato de otra que solo enfatiza.</li>
        <li>Leer diálogos y mensajes donde alguien se queja de una actitud o de una falta de cortesía.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «¿acaso no lo sabes?».</p>',
        respuesta: ['难道', '你', '不知道', '吗'], pinyin: ['nándào', 'nǐ', 'bù zhīdào', 'ma'], lang: 'zh-Hans',
        alternativas: [['你', '难道', '不知道', '吗']],
        pista: `<p>${zh("难道", "nándào")} va antes o después del sujeto, y la pregunta termina en ${zh("吗", "ma")}.</p>`,
        solucion: `<p>${zh("难道你不知道吗", "nándào nǐ bù zhīdào ma")} o ${zh("你难道不知道吗", "nǐ nándào bù zhīdào ma")}: las dos valen.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir de verdad ${zh("难道他不是你的朋友吗？", "nándào tā bù shì nǐ de péngyou ma?")}</p>`,
        opciones: ['No sé si es tu amigo.', 'Sí es tu amigo.', 'No es tu amigo.', 'Quiero ser su amigo.'], correcta: 1,
        pista: '<p>Una pregunta retórica negativa enfatiza lo positivo.</p>',
        solucion: `<p>Es una pregunta negativa, así que afirma: «¿acaso no es tu amigo?» quiere decir que sí lo es.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("我哪儿有时间呢？", "wǒ nǎr yǒu shíjiān ne?")}</p>`,
        opciones: ['Dime dónde está el tiempo.', 'Tengo mucho tiempo.', 'No tengo tiempo.', 'No sé la hora.'], correcta: 2,
        pista: `<p>Con ${zh("哪儿", "nǎr")} en una pregunta retórica casi siempre se niega.</p>`,
        solucion: `<p>«¿De dónde voy a sacar tiempo?» quiere decir que no tiene tiempo.</p>` },
      { tipo: 'opciones', enunciado: `<p>Si alguien dice ${zh("谁喜欢这样的态度呢？", "shéi xǐhuan zhèyàng de tàidù ne?")}, ¿qué opina?</p>`,
        opciones: ['A todos les gusta esa actitud.', 'Pregunta quién tiene esa actitud.', 'A nadie le gusta esa actitud.', 'No sabe qué es una actitud.'], correcta: 2,
        pista: `<p>Pregunta con ${zh("谁", "shéi")} sin querer saber un nombre.</p>`,
        solucion: `<p>Es una pregunta retórica que niega: «¿a quién le va a gustar?», o sea, a nadie.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("难道")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['nán dào'],
        pista: '<p>La primera sílaba sube; la segunda baja.</p>',
        solucion: `<p>${zh("难道", "nándào")}: <strong>nán dào</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>¿Qué significa ${zh("态度", "tàidù")} en español? Responde con una palabra.</p>`,
        respuestas: ['actitud', 'la actitud', 'postura'],
        pista: '<p>Es la forma en que alguien se comporta ante algo.</p>',
        solucion: `<p>${zh("态度", "tàidù")} es «actitud»: ${zh("你的态度很好", "nǐ de tàidù hěn hǎo")}, «tu actitud es muy buena».</p>` },
    ],
    fuentes: [SILABO, DART_11, DART_22, PRINCETON, DART_16],
  });

  L('La doble negación', {
    objetivo: `Reconocer y usar dos negaciones seguidas para afirmar con fuerza, como ${zh("不能不", "bù néng bù")}, ${zh("不得不", "bùdébù")} y ${zh("不是不", "bù shì bù")}, y hablar de reglas de un viaje en avión con palabras como ${zh("乘客", "chéngkè")} y ${zh("身份证", "shēnfènzhèng")}.`,
    explicacion: `
      <p>Las frases de ejemplo son de la lección. Para las formas con ${zh("不会不", "bù huì bù")} y ${zh("没有", "méiyǒu")} usamos como apoyo una wiki que no es universitaria (Chinese Grammar Wiki, de AllSet Learning); lo dice cada vez que aparece. El ${zh("不", "bù")} y el ${zh("一", "yī")} se escriben con su tono original, aunque al hablar cambien, como en la primera lección.</p>
      ${tabla([
        ['不得不', 'bùdébù', 'no tener más remedio que'], ['法律', 'fǎlǜ', 'ley'], ['合格', 'hégé', 'apto, que cumple lo pedido'], ['无法', 'wúfǎ', 'no poder, no haber manera de'], ['规定', 'guīdìng', 'norma, regla; establecer'],
        ['允许', 'yǔnxǔ', 'permitir'], ['乘客', 'chéngkè', 'pasajero'], ['排队', 'páiduì', 'hacer fila'], ['证件', 'zhèngjiàn', 'documento de identificación'], ['身份证', 'shēnfènzhèng', 'cédula o tarjeta de identidad'],
        ['签证', 'qiānzhèng', 'visa'], ['登机', 'dēngjī', 'abordar un avión'], ['航班', 'hángbān', 'vuelo'], ['保证', 'bǎozhèng', 'garantizar, asegurar'], ['证明', 'zhèngmíng', 'comprobar; comprobante'],
      ])}
      <h3>¿Qué pasa si niegas dos veces?</h3>
      <p>En español, «no puedes no ir» es casi lo mismo que «tienes que ir», pero con más fuerza. Esto se llama <strong>doble negación</strong>: dos negaciones se cancelan y dejan una afirmación enfática. El sílabo de HSK 4 lista este punto en su apartado de oraciones especiales y dice que se usa para dar énfasis. Un ejemplo de la lección: ${zh("乘客不能不排队", "chéngkè bù néng bù páiduì")}, «los pasajeros no pueden no hacer fila», o sea, deben hacerla.</p>
      <h3>${zh("不能不", "bù néng bù")}: no poder no hacerlo</h3>
      <p>MIT la glosa como «you can't not» (no puedes no) en un diálogo sobre el té. Inspirada en ese ejemplo, esta es una frase de ejemplo de la lección: ${zh("在中国不能不喝茶", "zài Zhōngguó bù néng bù hē chá")}, «en China no se puede no tomar té». Dartmouth añade una regla útil: ${zh("能", "néng")} admite la doble negación ${zh("不能不", "bù néng bù")}, pero ${zh("可以", "kěyǐ")} no tiene esa forma. Una frase con ${zh("不可以不", "bù kěyǐ bù")} está mal, y Dartmouth la marca con una cruz.</p>
      ${cuadro(['Frase de ejemplo', '¿Está bien?'], [
        [zh('我不能不早起', 'wǒ bù néng bù zǎo qǐ'), 'Sí, con ' + zh('能', 'néng') + '.'],
        [zh('我不可以不早起', 'wǒ bù kěyǐ bù zǎo qǐ'), 'No, ' + zh('可以', 'kěyǐ') + ' no tiene esta forma.'],
      ])}
      <h3>${zh("不得不", "bùdébù")}: no tener más remedio</h3>
      <p>La wiki de AllSet dice que ${zh("不得不", "bùdébù")} suena más fuerte que ${zh("必须", "bìxū")} y que significa «no poder evitar hacer algo». Su forma es sujeto, ${zh("不得不", "bùdébù")} y verbo. En los ejemplos de la wiki, ${zh("不得不", "bùdébù")} habla de algo que las circunstancias obligaron a hacer (simplificación de la lección). Por ejemplo, en esta frase de ejemplo: ${zh("他忘了带身份证，不得不回家拿", "tā wàng le dài shēnfènzhèng, bùdébù huí jiā ná")}, «olvidó su cédula y no tuvo más remedio que volver por ella».</p>
      <h3>Otras formas: ${zh("不会不", "bù huì bù")} y ${zh("不是不", "bù shì bù")}</h3>
      <p>La misma wiki explica que se pueden negar los verbos ${zh("会", "huì")}, ${zh("能", "néng")} o ${zh("可能", "kěnéng")} antes de un predicado negado. Con ${zh("不会不", "bù huì bù")} dices «no hay manera de que no»: ${zh("她不会不知道的", "tā bù huì bù zhīdào de")}, «seguro que lo sabe». Con ${zh("不是不", "bù shì bù")} aclaras un motivo, no das una orden: ${zh("我不是不想去，我没有时间", "wǒ bù shì bù xiǎng qù, wǒ méiyǒu shíjiān")} quiere decir «no es que no quiera ir; no tengo tiempo». Y con ${zh("没有", "méiyǒu")} más ${zh("一", "yī")}, un clasificador y un sustantivo, se dice «ni uno solo»: ${zh("没有一个乘客不排队的", "méiyǒu yī gè chéngkè bù páiduì de")}, «no hay un solo pasajero que no haga fila».</p>
      <p class="nota"><strong>Trampa común:</strong> leer ${zh("不能不", "bù néng bù")} como si fuera una prohibición. No dice «no puedes»; dice «tienes que». Para no equivocarte, tacha las dos negaciones y lee lo que queda: ${zh("能", "néng")} más el verbo, con mucha fuerza.</p>`,
    ejemplo: `
      <p>Rosa viaja en avión. En el aeropuerto hay una regla: todos deben llevar su identificación. Vamos a decirlo con doble negación.</p>
      <ol class="pasos-ej">
        <li>Parte de la idea sencilla, sin negar: ${zh("乘客要带身份证", "chéngkè yào dài shēnfènzhèng")}, «el pasajero debe llevar su cédula».</li>
        <li>Para darle fuerza, usa ${zh("不能不", "bù néng bù")} antes del verbo: ${zh("乘客不能不带身份证", "chéngkè bù néng bù dài shēnfènzhèng")}.</li>
        <li>Añade cuándo: ${zh("登机以前，乘客不能不带身份证", "dēngjī yǐqián, chéngkè bù néng bù dài shēnfènzhèng")}.</li>
        <li>Si alguien se olvidó, cuenta el apuro con ${zh("不得不", "bùdébù")}: ${zh("他忘了带身份证，不得不回家拿", "tā wàng le dài shēnfènzhèng, bùdébù huí jiā ná")}.</li>
      </ol>
      <p>Para comprobar, tacha las dos negaciones y lee lo que queda: ${zh("乘客要带身份证", "chéngkè yào dài shēnfènzhèng")}, la misma idea de antes pero con más fuerza. Resultado: <span class="resultado">${zh("登机以前，乘客不能不带身份证", "dēngjī yǐqián, chéngkè bù néng bù dài shēnfènzhèng")} = «antes de abordar, el pasajero tiene que llevar su cédula»</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir ${zh("乘客不可以不带身份证", "chéngkè bù kěyǐ bù dài shēnfènzhèng")}. Según Dartmouth, ${zh("可以", "kěyǐ")} no tiene la forma de doble negación; hay que usar ${zh("能", "néng")}.</p>`,
    vidaReal: `
      <p>La doble negación aparece en avisos y en conversaciones sobre obligaciones:</p>
      <ul>
        <li>Entender reglas de viaje, como llevar documentos, hacer fila o abordar a tiempo.</li>
        <li>Decir con fuerza que algo es obligatorio.</li>
        <li>Contar que no tuviste más remedio que cambiar tus planes.</li>
        <li>Aclarar un malentendido: «no es que no quiera, es que no puedo».</li>
        <li>Reconocer cuándo alguien te está pidiendo algo con mucha firmeza, aunque la frase parezca negativa.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «los pasajeros no pueden no hacer fila» (o sea, deben hacerla).</p>',
        respuesta: ['乘客', '不能不', '排队'], pinyin: ['chéngkè', 'bù néng bù', 'páiduì'], lang: 'zh-Hans',
        pista: `<p>${zh("不能不", "bù néng bù")} va entre quien actúa y el verbo.</p>`,
        solucion: `<p>${zh("乘客不能不排队", "chéngkè bù néng bù páiduì")}: sujeto, doble negación y verbo.</p>` },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas frases está bien? Quieres decir «no puedo no madrugar».</p>',
        opciones: [zh('我不可以不早起', 'wǒ bù kěyǐ bù zǎo qǐ'), zh('我不能不早起', 'wǒ bù néng bù zǎo qǐ'), zh('我不能早起不', 'wǒ bù néng zǎo qǐ bù'), zh('我能不不早起', 'wǒ néng bù bù zǎo qǐ')], correcta: 1,
        pista: `<p>Dartmouth dice que ${zh("能", "néng")} admite la doble negación y ${zh("可以", "kěyǐ")} no.</p>`,
        solucion: `<p>${zh("我不能不早起", "wǒ bù néng bù zǎo qǐ")}: las dos negaciones van seguidas, antes del verbo.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("他忘了带身份证，不得不回家拿", "tā wàng le dài shēnfènzhèng, bùdébù huí jiā ná")}?</p>`,
        opciones: ['No quiso volver a casa.', 'Pudo volver a casa si quería.', 'Olvidó su cédula y no tuvo más remedio que volver por ella.', 'Nunca volvió a casa.'], correcta: 2,
        pista: `<p>${zh("不得不", "bùdébù")} habla de algo que no se puede evitar.</p>`,
        solucion: `<p>Las circunstancias lo obligaron: la cédula estaba en casa y debía traerla.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("我不是不想去，我没有时间", "wǒ bù shì bù xiǎng qù, wǒ méiyǒu shíjiān")}?</p>`,
        opciones: ['No quiero ir y tampoco tengo tiempo.', 'No es que no quiera ir; no tengo tiempo.', 'Quiero ir y tengo mucho tiempo.', 'Tengo tiempo, pero no quiero ir.'], correcta: 1,
        pista: `<p>${zh("不是不", "bù shì bù")} aclara un motivo.</p>`,
        solucion: `<p>La persona quiere ir, pero el tiempo no se lo permite: la doble negación aclara la causa.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("登机")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['dēng jī'],
        pista: '<p>Las dos sílabas son altas y planas.</p>',
        solucion: `<p>${zh("登机", "dēngjī")}: <strong>dēng jī</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>¿Qué significa ${zh("乘客", "chéngkè")} en español? Responde con una palabra.</p>`,
        respuestas: ['pasajero', 'el pasajero', 'pasajera', 'viajero', 'pasajeros'],
        pista: '<p>Es quien viaja en un avión, un tren o un autobús.</p>',
        solucion: `<p>${zh("乘客", "chéngkè")} es «pasajero».</p>` },
    ],
    fuentes: [SILABO, MIT, DART_7, ALLSET_NEG, ALLSET_BUDEBU],
  });

  L('Decimales, fracciones y porcentajes en chino', {
    objetivo: `Leer en voz alta decimales, fracciones y porcentajes en chino, decir cuántas veces es una cantidad de otra y dar cifras aproximadas con ${zh("大约", "dàyuē")}, ${zh("左右", "zuǒyòu")} y ${zh("来", "lái")}.`,
    explicacion: `
      <p>Las frases de ejemplo y las cifras de las gráficas son de la lección: son datos de ejemplo, no datos reales. Para decimales, fracciones y veces (${zh("倍", "bèi")}) usamos como apoyo dos páginas que no son universitarias (Chinese Grammar Wiki, de AllSet Learning, y la sección de idioma de China Daily); el resto viene de universidades y del sílabo.</p>
      ${tabla([
        ['分数', 'fēnshù', 'nota, puntaje; también fracción'], ['倍', 'bèi', 'veces (multiplica)'], ['大约', 'dàyuē', 'aproximadamente'], ['左右', 'zuǒyòu', 'más o menos (va después)'], ['前后', 'qiánhòu', 'antes y después; alrededor de'],
        ['增长', 'zēngzhǎng', 'crecer, aumentar'], ['数量', 'shùliàng', 'cantidad'], ['数字', 'shùzì', 'cifra, número'], ['估计', 'gūjì', 'estimar, calcular a ojo'], ['约', 'yuē', 'aproximadamente (más formal)'],
        ['降低', 'jiàngdī', 'reducir, bajar'], ['下降', 'xiàjiàng', 'descender, caer'], ['公里', 'gōnglǐ', 'kilómetro'], ['算', 'suàn', 'calcular, contar'], ['实际', 'shíjì', 'real; en la práctica'],
      ])}
      <h3>¿Cómo se lee 3.5?</h3>
      <p>Los números enteros ya los sabes. Para los decimales, China Daily explica que el punto se dice ${zh("点", "diǎn")} y que cada cifra después del punto se lee sola, una por una. Así, 1.3 es ${zh("一点三", "yī diǎn sān")} y 3.5 es ${zh("三点五", "sān diǎn wǔ")}. Si el número empieza en el punto, se puede anteponer ${zh("零", "líng")}: 0.5 es ${zh("零点五", "líng diǎn wǔ")}. Fíjate que 0.56 no es «cincuenta y seis»: se lee ${zh("零点五六", "líng diǎn wǔ liù")}, cifra por cifra.</p>
      <h3>¿Y las fracciones?</h3>
      <p>En español dices «un tercio» o «dos de cinco». En chino se usa ${zh("分之", "fēn zhī")}, algo así como «de tantas partes, tantas». El <strong>denominador</strong> es el número de abajo y el <strong>numerador</strong> es el de arriba. Según MIT y AllSet, en chino el denominador se dice primero: 1/3 es ${zh("三分之一", "sān fēn zhī yī")} y 2/5 es ${zh("五分之二", "wǔ fēn zhī èr")}. Es al revés que en español, así que no digas ${zh("二分之五", "èr fēn zhī wǔ")} cuando quieras decir 2/5. La mitad, 1/2, es ${zh("二分之一", "èr fēn zhī yī")} y también ${zh("一半", "yíbàn")}.</p>
      <h3>¿Y los porcentajes?</h3>
      <p>Un porcentaje es una fracción de cien. Por eso MIT lee 20 % como ${zh("百分之二十", "bǎi fēn zhī èrshí")}: «de cien partes, veinte». Va primero ${zh("百分之", "bǎi fēn zhī")} y luego el número. Para ver cómo se usa, mira esta encuesta de ejemplo de una clase, con el porcentaje de alumnos que prefiere cada actividad. En «Porcentajes» y «Números decimales» de Matemáticas está la idea de fondo, sin chino.</p>
      ${ENCUESTA()}
      <h3>¿Cuántas veces es una cosa de otra?</h3>
      <p>La palabra ${zh("倍", "bèi")} es un clasificador que viene después de un número y significa «veces». La forma sencilla, según AllSet, es A ${zh("是", "shì")} B ${zh("的", "de")} número ${zh("倍", "bèi")}: ${zh("今年的数量是去年的两倍", "jīnnián de shùliàng shì qùnián de liǎng bèi")}, «la cantidad de este año es el doble que la del año pasado». Con ${zh("比", "bǐ")} hay una trampa que, según la wiki, confunde incluso a hablantes nativos: el número de ${zh("倍", "bèi")} se suma al original. Entonces ${zh("大一倍", "dà yī bèi")} es el doble y ${zh("大两倍", "dà liǎng bèi")} es el triple.</p>
      <h3>¿Cómo se dice «más o menos»?</h3>
      <p>Para un <strong>número aproximado</strong>, MIT dice que ${zh("大约", "dàyuē")} va antes de la cantidad y ${zh("左右", "zuǒyòu")} va después: ${zh("学校离这儿有五公里左右", "xuéxiào lí zhèr yǒu wǔ gōnglǐ zuǒyòu")}, «la escuela está a unos cinco kilómetros de aquí». Una tercera forma del sílabo es número, ${zh("来", "lái")} y clasificador: MIT explica que ${zh("来", "lái")} se pone entre un número redondo, de diez en diez, y el clasificador, y que ${zh("五十来岁", "wǔshí lái suì")} es «unos 50 años». ChinGram añade que dos números vecinos también aproximan: ${zh("三四个人", "sān sì gè rén")} es «tres o cuatro personas». El sílabo también lista ${zh("前后", "qiánhòu")} para aproximar, pero aquí no lo explicamos.</p>
      <p class="nota"><strong>Trampa común:</strong> leer ${zh("大两倍", "dà liǎng bèi")} como «dos veces». Según AllSet, con ${zh("比", "bǐ")} el aumento se suma: ${zh("大一倍", "dà yī bèi")} es el doble y ${zh("大两倍", "dà liǎng bèi")} es el triple.</p>`,
    ejemplo: `
      <p>Sara lee la gráfica de la encuesta de ejemplo y quiere explicar los resultados a su amigo. Toda la clase son 20 alumnos.</p>
      <ol class="pasos-ej">
        <li>Lee la barra del fútbol: 40. Un porcentaje se dice con ${zh("百分之", "bǎi fēn zhī")} y el número: ${zh("百分之四十", "bǎi fēn zhī sìshí")}.</li>
        <li>Úsalo en una frase: ${zh("百分之四十的同学喜欢踢足球", "bǎi fēn zhī sìshí de tóngxué xǐhuan tī zúqiú")}.</li>
        <li>Para decir lo mismo con una fracción, simplifica 40/100 a 2/5 y recuerda que el denominador va primero: ${zh("五分之二", "wǔ fēn zhī èr")}.</li>
        <li>La natación tiene 20, la mitad que el fútbol. Dilo con ${zh("倍", "bèi")}: ${zh("喜欢踢足球的同学是喜欢游泳的同学的两倍", "xǐhuan tī zúqiú de tóngxué shì xǐhuan yóuyǒng de tóngxué de liǎng bèi")}.</li>
      </ol>
      <p>Para comprobar, calcula: 40 % de 20 alumnos son 8, y 2/5 de 20 también son 8. Resultado: <span class="resultado">${zh("百分之四十", "bǎi fēn zhī sìshí")} = ${zh("五分之二", "wǔ fēn zhī èr")}</span>, y 40 es el doble de 20.</p>
      <p class="nota"><strong>Error común:</strong> decir ${zh("二分之五", "èr fēn zhī wǔ")} para 2/5. El denominador, el número de abajo, se dice primero.</p>`,
    vidaReal: `
      <p>Estas formas aparecen en noticias, encuestas y tareas en chino:</p>
      <ul>
        <li>Entender cuánta gente opina algo en una encuesta (porcentajes y fracciones).</li>
        <li>Leer precios, medidas y distancias con decimales.</li>
        <li>Decir cuántas veces creció una cantidad o cuánto bajó.</li>
        <li>Dar una cifra aproximada cuando no sabes el número exacto.</li>
        <li>Entender recetas y listas de compras que traen medidas como medio kilo o dos tercios de taza.</li>
        <li>Explicar una gráfica de barras a otra persona, con porcentajes en voz alta.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Mira la encuesta de ejemplo y elige cómo se dice el porcentaje de la natación.</p>${ENCUESTA()}`,
        opciones: [zh('二十分之一', 'èrshí fēn zhī yī'), zh('百分之十二', 'bǎi fēn zhī shí èr'), zh('百分之二十', 'bǎi fēn zhī èrshí'), zh('二十百分', 'èrshí bǎi fēn')], correcta: 2,
        pista: `<p>La barra de la natación llega a 20, y un porcentaje se dice con ${zh("百分之", "bǎi fēn zhī")} y el número.</p>`,
        solucion: `<p>${zh("百分之二十", "bǎi fēn zhī èrshí")}: primero ${zh("百分之", "bǎi fēn zhī")}, luego el número. ${zh("二十分之一", "èrshí fēn zhī yī")} sería 1/20, otra cosa.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «la escuela tiene unos trescientos alumnos».</p>',
        respuesta: ['学校', '有', '大约', '三百', '个', '学生'], pinyin: ['xuéxiào', 'yǒu', 'dàyuē', 'sān bǎi', 'gè', 'xuésheng'], lang: 'zh-Hans',
        alternativas: [['学校', '大约', '有', '三百', '个', '学生']],
        pista: `<p>${zh("大约", "dàyuē")} va antes de la cantidad.</p>`,
        solucion: `<p>${zh("学校有大约三百个学生", "xuéxiào yǒu dàyuē sān bǎi gè xuésheng")}; también vale ${zh("学校大约有三百个学生", "xuéxiào dàyuē yǒu sān bǎi gè xuésheng")}.</p>` },
      { tipo: 'numero', enunciado: `<p>¿Qué número es ${zh("三点五", "sān diǎn wǔ")}? Escríbelo en cifras.</p>`,
        respuesta: 3.5,
        pista: `<p>${zh("点", "diǎn")} es el punto decimal.</p>`,
        solucion: `<p>${zh("三点五", "sān diǎn wǔ")} es 3.5: la parte entera es ${zh("三", "sān")} y después del punto va ${zh("五", "wǔ")}.</p>` },
      { tipo: 'numero', enunciado: `<p>En una clase de 30 alumnos, ${zh("三分之二", "sān fēn zhī èr")} son niñas. ¿Cuántas niñas hay?</p>`,
        respuesta: 30 * 2 / 3,
        pista: `<p>El denominador se dice primero: ${zh("三分之二", "sān fēn zhī èr")} es 2/3.</p>`,
        solucion: `<p>2/3 de 30 es 30 ÷ 3 × 2 = 20 niñas.</p>` },
      { tipo: 'numero', enunciado: `<p>Con ${zh("比", "bǐ")}, ${zh("这个盒子比那个盒子大两倍", "zhège hézi bǐ nàge hézi dà liǎng bèi")}. Según AllSet, ¿cuántas veces el tamaño del segundo es el tamaño del primero?</p>`,
        respuesta: 3,
        pista: '<p>Con ' + zh("比", "bǐ") + ', el número de ' + zh("倍", "bèi") + ' se suma al original.</p>',
        solucion: `<p>El segundo es 1 y el primero es 1 + 2 = 3: el triple. ${zh("大一倍", "dà yī bèi")} sería el doble.</p>` },
      { tipo: 'texto', enunciado: `<p>¿Qué quiere decir ${zh("一半", "yíbàn")} en español? Responde con una o dos palabras.</p>`,
        respuestas: ['mitad', 'la mitad', 'una mitad', 'medio', 'un medio', '1/2', 'la mitad de'],
        pista: `<p>China Daily lo iguala a ${zh("二分之一", "èr fēn zhī yī")}.</p>`,
        solucion: `<p>${zh("一半", "yíbàn")} es «la mitad», lo mismo que ${zh("二分之一", "èr fēn zhī yī")}.</p>` },
    ],
    fuentes: [SILABO, MIT, CHINGRAM, ALLSET_FEN, ALLSET_BEI, ALLSET_NUM, CHINADAILY],
  });
})();
