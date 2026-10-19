// Mandarín · Unidad 17: HSK 6 · Temas actuales.
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
  // F2 (Oxford, 把)
  const OXFORD_BA = { nombre: 'Universidad de Oxford (Reino Unido), CTCFL: The 把 Construction, notas de gramática (en inglés)', url: 'https://www.ctcfl.ox.ac.uk/materials_grammar-exercises_ba/' };
  // F3 (USC)
  const USC = { nombre: 'Yen-Hui Audrey Li, Universidad del Sur de California (EE. UU.), «Chinese Ba», The Blackwell Companion to Syntax, 2017 (en inglés)', url: 'https://dornsife.usc.edu/ling/wp-content/uploads/sites/50/2023/10/2017-Chinese-ba-Blackwell.pdf' };
  // F4 (Wake Forest)
  const WAKE = { nombre: 'Patrick Edwin Moran, Universidad Wake Forest (EE. UU.), Chinese Sentence Patterns, 2009 (en inglés)', url: 'https://users.wfu.edu/moran/ABACRA/Chinese%20Sentence%20Patterns.pdf' };
  // F5 a F8 (Dartmouth)
  const DART_24 = DART('Lesson 24, notas de gramática', '%e7%ac%ac%e4%ba%8c%e5%8d%81%e5%9b%9b%e8%af%be-lesson-24');
  const DART_19 = DART('Lesson 19, notas de gramática', '%e7%ac%ac%e5%8d%81%e4%b9%9d%e8%af%be-lesson-19');
  const DART_23 = DART('Lesson 23, glosario', '%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%b8%89%e8%af%be-lesson-23');
  const DART_30 = DART('Lesson 30, glosario', '%e7%ac%ac%e4%b8%89%e5%8d%81%e8%af%be-lesson-30');
  // F32 (AllSet)
  const ALLSET_YI = ALLSET('Expressing "one by one" with "yi"', 'Expressing_%22one_by_one%22_with_%22yi%22');

  // F31 (Oxford, 你看你), F61 (Oxford, clasificadores), F62 (Iowa)
  const OXFORD_MM = { nombre: 'Centro para la Enseñanza del Chino como Lengua Extranjera, Universidad de Oxford (Reino Unido), «Chinese Multimedia», lección 19, ejercicio de gramática (en inglés)', url: 'https://www.ctcfl.ox.ac.uk/materials_chinese_lessons_19_grammar_q4-state5/' };
  const OXFORD_MW = { nombre: 'Universidad de Oxford, Centre for Teaching Chinese as a Foreign Language (CTCFL), «Measure words» (en inglés)', url: 'https://www.ctcfl.ox.ac.uk/materials_grammar-exercises_measure-words' };
  const IOWA = { nombre: 'Universidad de Iowa (EE. UU.), Intermediate Chinese Reader: Lesson 5 Reading B (texto de 2008, en chino)', url: 'https://intermediatechinesereader.sites.uiowa.edu/lesson-5-reading-b' };

  // Gráfica de barras de una serie (copiada de hsk5-sociedad.js).
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

  // ------------------------------------------------------------------
  L('Noticias y temas de actualidad', {
    objetivo: `Leer y armar frases con ${zh("把", "bǎ")} cuando el sujeto es una cosa (la lluvia, el viento) o cuando el objeto de ${zh("把", "bǎ")} es la persona que queda afectada, y entender 15 palabras del mundo de las noticias.`,
    explicacion: `
      <p>Empiezas la unidad 17, de temas actuales. Cada lección trae una selección de 15 palabras, no toda la lista; la lista completa está en el <a href="${encodeURI(SILABO.url)}">sílabo</a>. Las frases de ejemplo son de la lección. La voz depende de tu dispositivo: si suena rara, el pinyin manda. Y ${zh("不", "bù")} y ${zh("一", "yī")} se escriben con su tono original; al hablar cambian, como viste en «Cambios de tono: el tercer tono, ${zh("不", "bù")} y ${zh("一", "yī")}» (unidad 1).</p>
      <p>Imagina un titular de periódico: «La tormenta dejó sin luz a todo el barrio». En español, el sujeto es una cosa, la tormenta, y aun así hace algo. El chino también puede hacerlo con ${zh("把", "bǎ")}. Antes de verlo, repasa la base y mira las palabras de hoy.</p>
      ${tabla([
        ['报刊', 'bàokān', 'periódicos y revistas'], ['报社', 'bàoshè', 'empresa o redacción de un periódico'], ['公众', 'gōngzhòng', 'el público, la gente en general'], ['热点', 'rèdiǎn', 'tema del momento'], ['热议', 'rèyì', 'comentar con interés entre muchos'],
        ['新媒体', 'xīnméitǐ', 'medios nuevos, como las redes y las apps'], ['频道', 'píndào', 'canal de televisión o de radio'], ['稿件', 'gǎojiàn', 'texto enviado para publicarse'], ['主播', 'zhǔbō', 'presentador o presentadora de un programa'], ['透露', 'tòulù', 'dejar saber, revelar'],
        ['焦点', 'jiāodiǎn', 'centro de atención'], ['真相', 'zhēnxiàng', 'cómo pasaron de verdad las cosas'], ['证实', 'zhèngshí', 'confirmar con pruebas'], ['评论', 'pínglùn', 'comentar; comentario'], ['民众', 'mínzhòng', 'la gente, el pueblo'],
      ])}
      <h3>¿Para qué sirve ${zh("把", "bǎ")}? (repaso)</h3>
      <p>Lo viste en «La estructura ${zh("把", "bǎ")}» y «Más usos de ${zh("把", "bǎ")}». Oxford dice que ${zh("把", "bǎ")} se usa para «disponer» de un objeto concreto, es decir, decir qué se hace con él. Primero va el objeto, justo después de ${zh("把", "bǎ")}, y detrás se dice cómo se dispone de él. El verbo nunca va solo: lleva otros elementos, como ${zh("在", "zài")} más un lugar o ${zh("了", "le")}. Wake Forest añade que lo que va después de ${zh("把", "bǎ")} es siempre algo específico, conocido por quien habla. Dartmouth da este ejemplo: ${zh("请把书放在桌子上", "qǐng bǎ shū fàng zài zhuōzi shàng")}, «por favor, pon el libro sobre la mesa».</p>
      <h3>¿Y si el sujeto no es una persona?</h3>
      <p>La ${zh("把", "bǎ")} más común, la que USC llama «canónica», tiene un sujeto vivo que hace la acción. El sílabo de nivel 6 añade dos tipos más, que Dartmouth y USC ilustran. El primero tiene un sujeto no vivo: la forma es sujeto, ${zh("把", "bǎ")}, objeto, verbo y otros elementos. Dartmouth muestra una frase donde el sujeto son unos gastos médicos, no una persona; aquí solo tomamos la forma. Una frase de la lección: ${zh("大雨把路弄湿了", "dàyǔ bǎ lù nòngshī le")}, «la lluvia fuerte mojó la calle». Quien hace «mojar» es la lluvia, y la calle es lo que cambia.</p>
      <h3>¿Y si el objeto de ${zh("把", "bǎ")} es quien hace la acción?</h3>
      <p>El segundo tipo del sílabo se escribe así: sujeto, ${zh("把", "bǎ")}, objeto que es quien hace la acción, verbo y otros elementos. USC trae este ejemplo: ${zh("他把我们哭得都烦死了", "tā bǎ wǒmen kū de dōu fánsǐ le")}, «lloró tanto que todos acabamos muy molestos». En la frase, quien cambia es ${zh("我们", "wǒmen")}: la persona que queda afectada. Una frase de la lección con el mismo molde: ${zh("老师把我们说得都笑了", "lǎoshī bǎ wǒmen shuō de dōu xiào le")}, «lo que dijo el maestro nos hizo reír a todos». Como simplificación de la lección, léelo así: alguien hace algo, y por eso otra persona acaba en cierto estado.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que el sujeto de ${zh("把", "bǎ")} siempre es una persona. Si ves una cosa o un fenómeno al principio, como la lluvia, sigue el mismo orden: sujeto, ${zh("把", "bǎ")}, objeto, verbo y resultado.</p>`,
    ejemplo: `
      <p>Eres redactor de un periódico escolar y quieres escribir un titular: «el viento abrió la ventana del salón». Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Busca el sujeto: es una cosa, ${zh("风", "fēng")}, «el viento». Está bien, porque el sílabo permite un sujeto no vivo.</li>
        <li>Pon ${zh("把", "bǎ")} después y luego el objeto, que es lo que cambia: ${zh("把窗户", "bǎ chuānghu")}, «la ventana».</li>
        <li>Agrega el verbo con su resultado, porque con ${zh("把", "bǎ")} el verbo no va solo: ${zh("吹开", "chuīkāi")}, «soplar hasta abrir».</li>
        <li>Cierra con ${zh("了", "le")}, porque ya pasó: ${zh("风把窗户吹开了", "fēng bǎ chuānghu chuīkāi le")}.</li>
      </ol>
      <p>Para comprobar, lee el orden: sujeto, ${zh("把", "bǎ")}, objeto y verbo con resultado. Mira también que el objeto sea algo concreto, como esa ventana, y que el verbo tenga un extra (${zh("开", "kāi")} y ${zh("了", "le")}). Resultado: <span class="resultado">${zh("风把窗户吹开了", "fēng bǎ chuānghu chuīkāi le")} = «el viento abrió la ventana»</span>.</p>
      <p class="nota"><strong>Error común:</strong> dejar el verbo sin nada más, como ${zh("风把窗户吹", "fēng bǎ chuānghu chuī")}. Con ${zh("把", "bǎ")} hace falta un resultado o ${zh("了", "le")}.</p>`,
    vidaReal: `
      <p>Los titulares y las notas de ${zh("报刊", "bàokān")} usan mucho ${zh("把", "bǎ")} para contar qué hizo un fenómeno: una lluvia, un viento o una noticia. Con lo que aprendiste, entiendes quién hace y qué cambia. Y con las 15 palabras puedes seguir a un ${zh("主播", "zhǔbō")} que cuenta cuál es el ${zh("热点", "rèdiǎn")} del día, o leer en el sitio de un ${zh("报社", "bàoshè")} qué temas comenta el ${zh("公众", "gōngzhòng")}.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según Oxford, ¿qué se hace con un objeto en una frase con <em>bǎ</em>?</p>',
        opciones: ['Se pregunta por él', 'Se niega que exista', 'Se dispone de él: se dice qué se hace con ese objeto concreto', 'Se cuenta cuántos hay'], correcta: 2,
        pista: '<p>Piensa en «pon el libro sobre la mesa»: ¿qué pasa con el libro?</p>',
        solucion: `<p>Oxford dice que ${zh("把", "bǎ")} sirve para «disponer» de un objeto concreto, o sea, decir qué se hace con él.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Cuál de estas frases tiene una cosa, no una persona, como sujeto de ${zh("把", "bǎ")}?</p>`,
        opciones: [zh('我把报纸放在桌子上了', 'wǒ bǎ bàozhǐ fàng zài zhuōzi shàng le'), zh('风把窗户吹开了', 'fēng bǎ chuānghu chuīkāi le'), zh('老师把我们说得都笑了', 'lǎoshī bǎ wǒmen shuō de dōu xiào le'), zh('请把书放在桌子上', 'qǐng bǎ shū fàng zài zhuōzi shàng')], correcta: 1,
        pista: '<p>Mira quién o qué está antes de la partícula.</p>',
        solucion: `<p>${zh("风", "fēng")}, «el viento», es una cosa. En las otras, el sujeto es una persona o hay una orden dirigida a alguien.</p>` },
      { tipo: 'opciones', enunciado: `<p>En ${zh("他把我们哭得都烦死了", "tā bǎ wǒmen kū de dōu fánsǐ le")} (el ejemplo de USC), ¿quién queda molesto?</p>`,
        opciones: ['Nosotros, el objeto de bǎ', 'Él, que lloró', 'Nadie', 'El maestro'], correcta: 0,
        pista: `<p>Mira la palabra que va justo después de ${zh("把", "bǎ")}.</p>`,
        solucion: `<p>${zh("我们", "wǒmen")}, «nosotros», va después de ${zh("把", "bǎ")} y es quien acaba muy molesto: «él lloró tanto que todos acabamos molestos».</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «la lluvia fuerte mojó la calle».</p>',
        respuesta: ['大雨', '把', '路', '弄湿了'], pinyin: ['dàyǔ', 'bǎ', 'lù', 'nòngshī le'], lang: 'zh-Hans',
        pista: '<p>Sujeto, ¿qué sigue siempre al sujeto en este molde?, objeto y verbo con resultado.</p>',
        solucion: `<p>${zh("大雨把路弄湿了", "dàyǔ bǎ lù nòngshī le")}: sujeto no vivo, ${zh("把", "bǎ")}, objeto, verbo con resultado y ${zh("了", "le")}.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("真相")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['zhēn xiàng'],
        pista: '<p>La primera sílaba empieza alta y se mantiene; la segunda baja de golpe.</p>',
        solucion: `<p>${zh("真相", "zhēnxiàng")}: <strong>zhēn xiàng</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("焦点", "jiāodiǎn")}.</p>`,
        respuestas: ['centro de atencion', 'foco', 'el foco', 'foco de atencion', 'punto central', 'centro de atención'],
        pista: '<p>Es hacia donde mira todo el mundo.</p>',
        solucion: `<p>${zh("焦点", "jiāodiǎn")} es «centro de atención, foco».</p>` },
    ],
    fuentes: [SILABO, OXFORD_BA, USC, WAKE, DART_24, DART_19],
  });

  // ------------------------------------------------------------------
  L('Dinero: ahorro, inversión y consumo en chino', {
    objetivo: `Entender 15 palabras del dinero en chino y usar los moldes ${zh("X归X，Y归Y", "X guī X, Y guī Y")} y ${zh("放着X不Y", "fàngzhe X bù Y")}.`,
    explicacion: `
      <p>En una conversación sobre dinero se oyen palabras como «saldo», «interés» o «préstamo». Esta lección te enseña cómo se dicen en chino. Es solo lenguaje: no te dice qué hacer con tu dinero ni qué conviene. Si quieres entender cómo funcionan el ahorro y la inversión, está en las unidades «Ahorro» e «Inversión» de Finanzas personales. Las frases de ejemplo son de la lección y no traen cifras reales.</p>
      ${tabla([
        ['理财', 'lǐcái', 'manejar el dinero propio'], ['储蓄', 'chǔxù', 'ahorros; ahorrar'], ['贷款', 'dàikuǎn', 'préstamo; pedir un préstamo'], ['利息', 'lìxī', 'intereses'], ['投资', 'tóuzī', 'inversión; invertir'],
        ['股票', 'gǔpiào', 'acción de una empresa'], ['基金', 'jījīn', 'fondo, dinero reunido para un fin'], ['收益', 'shōuyì', 'ganancia que se obtiene'], ['金融', 'jīnróng', 'finanzas'], ['货币', 'huòbì', 'moneda'],
        ['汇款', 'huìkuǎn', 'enviar dinero; dinero enviado'], ['余额', "yú'é", 'saldo, lo que queda en una cuenta'], ['账单', 'zhàngdān', 'cuenta por pagar, factura'], ['财产', 'cáichǎn', 'bienes, lo que alguien posee'], ['诚信', 'chéngxìn', 'honesto y que cumple lo que promete'],
      ])}
      <h3>¿Qué dicen las fuentes de estas palabras?</h3>
      <p>Dartmouth da dos glosas útiles. Dice que ${zh("储蓄", "chǔxù")} es «ahorros; ahorrar», o sea, guardar algo para usarlo más adelante, y que ${zh("投资", "tóuzī")} es «inversión; invertir». Ambas pueden ser sustantivo o verbo. El sílabo marca igual a ${zh("贷款", "dàikuǎn")} y ${zh("汇款", "huìkuǎn")}: verbo y sustantivo a la vez. Sobre ${zh("股票", "gǔpiào")}, Dartmouth explica sus dos piezas: la primera, ${zh("股", "gǔ")}, es «acción» y la segunda, ${zh("票", "piào")}, es «certificado». Entonces ${zh("股票", "gǔpiào")} es el certificado de una acción.</p>
      <p>Las demás las ves en la tabla. Un truco para recordarlas: ${zh("金融", "jīnróng")} abarca todo lo del dinero y los bancos; ${zh("货币", "huòbì")} es la moneda de un país; y ${zh("诚信", "chéngxìn")} no es una cosa que se compra, sino una cualidad de las personas.</p>
      <h3>¿Qué es ${zh("X归X，Y归Y", "X guī X, Y guī Y")}?</h3>
      <p>El sílabo de nivel 6 lista este molde entre los <strong>formatos fijos</strong>: frases con un esqueleto que no cambia y huecos para llenar. No hallé una explicación universitaria; lo que sigue es una simplificación de la lección. Se repite la misma palabra a cada lado de ${zh("归", "guī")}, y se separan dos cosas: «X es X, Y es Y». Ejemplo: ${zh("朋友归朋友，钱归钱", "péngyou guī péngyou, qián guī qián")}, «los amigos son los amigos y el dinero es el dinero»; es decir, no mezclo una cosa con la otra. Otro: ${zh("工作归工作，休息归休息", "gōngzuò guī gōngzuò, xiūxi guī xiūxi")}.</p>
      <h3>¿Qué es ${zh("放着X不Y", "fàngzhe X bù Y")}?</h3>
      <p>Es otro formato fijo del sílabo, y también va con una simplificación de la lección. ${zh("放着", "fàngzhe")} significa «tener algo puesto ahí, a la mano». X es esa cosa; Y es lo que no se hace con ella. Piénsalo como: «teniendo X ahí, no la Y». Ejemplo: ${zh("你放着好书不看", "nǐ fàngzhe hǎo shū bù kàn")}, «tienes buenos libros ahí y no los lees». Se usa para comentar que alguien deja sin usar algo que tiene a su alcance.</p>
      <p class="nota"><strong>Trampa común:</strong> cambiar la palabra del segundo lado, como ${zh("朋友归钱", "péngyou guī qián")}. En ${zh("X归X", "X guī X")} se repite la misma palabra a ambos lados de ${zh("归", "guī")}.</p>`,
    ejemplo: `
      <p>Quieres decir: «con mi amigo todo bien, pero el dinero se cuenta aparte». Armemos la frase.</p>
      <ol class="pasos-ej">
        <li>Elige las dos cosas que quieres separar: ${zh("朋友", "péngyou")} y ${zh("钱", "qián")}.</li>
        <li>Repite la primera a ambos lados de ${zh("归", "guī")}: ${zh("朋友归朋友", "péngyou guī péngyou")}, porque el molde pide la misma palabra.</li>
        <li>Pon una coma, porque son dos mitades, y repite el molde con la segunda cosa: ${zh("钱归钱", "qián guī qián")}.</li>
        <li>Une las dos mitades: ${zh("朋友归朋友，钱归钱", "péngyou guī péngyou, qián guī qián")}.</li>
      </ol>
      <p>Para comprobar, mira que cada mitad tenga la misma palabra a ambos lados de ${zh("归", "guī")} y que haya dos cosas distintas, una por mitad. Resultado: <span class="resultado">${zh("朋友归朋友，钱归钱", "péngyou guī péngyou, qián guī qián")} = «los amigos son los amigos y el dinero es el dinero»</span>.</p>
      <p class="nota"><strong>Error común:</strong> traducirlo palabra por palabra y pensar que ${zh("归", "guī")} significa «volver». En este molde solo marca «X es X».</p>`,
    vidaReal: `
      <p>Estas palabras aparecen en mensajes de bancos, en cuentas y en noticias de ${zh("金融", "jīnróng")}. Con ellas entiendes qué dice una ${zh("账单", "zhàngdān")}, dónde ves tu ${zh("余额", "yú'é")} y qué es una ${zh("汇款", "huìkuǎn")}. Y los moldes te sirven en la charla diaria: separar dos temas con ${zh("归", "guī")} o comentar con ${zh("放着", "fàngzhe")} algo que alguien no usa. Esta lección no da consejos sobre qué hacer con el dinero.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Según Dartmouth, la primera pieza de ${zh("股票", "gǔpiào")} (${zh("股", "gǔ")}) es «acción» y la segunda (${zh("票", "piào")}) es «certificado». ¿Qué es ${zh("股票", "gǔpiào")}?</p>`,
        opciones: ['Un tipo de moneda', 'Una cuenta por pagar', 'Un préstamo', 'El certificado de una acción'], correcta: 3,
        pista: '<p>Junta el significado de las dos piezas.</p>',
        solucion: `<p>«Acción» más «certificado» da ${zh("股票", "gǔpiào")}, el certificado de una acción de una empresa.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué dice ${zh("朋友归朋友，钱归钱", "péngyou guī péngyou, qián guī qián")}?</p>`,
        opciones: ['Los amigos regresan con dinero', 'Los amigos son los amigos y el dinero es el dinero', 'Quiero más amigos y más dinero', 'El dinero no me importa'], correcta: 1,
        pista: `<p>Mira que la misma palabra se repite a ambos lados de ${zh("归", "guī")}.</p>`,
        solucion: `<p>El molde ${zh("X归X，Y归Y", "X guī X, Y guī Y")} separa dos cosas: «X es X, Y es Y».</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué significa ${zh("你放着好书不看", "nǐ fàngzhe hǎo shū bù kàn")}?</p>`,
        opciones: ['Tienes buenos libros a la mano y no los lees', 'Lees buenos libros todos los días', 'Quieres comprar un libro', 'No tienes libros'], correcta: 0,
        pista: `<p>${zh("放着", "fàngzhe")} indica que X está ahí, a la mano.</p>`,
        solucion: `<p>X es ${zh("好书", "hǎo shū")}, «buenos libros», que están a la mano, y Y es ${zh("看", "kàn")}, «leer», que no se hace.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «tienes buenos libros a la mano y no los lees».</p>',
        respuesta: ['你', '放着', '好书', '不', '看'], pinyin: ['nǐ', 'fàngzhe', 'hǎo shū', 'bù', 'kàn'], lang: 'zh-Hans',
        pista: `<p>Sujeto, ${zh("放着", "fàngzhe")} y X, luego la negación y el verbo Y.</p>`,
        solucion: `<p>${zh("你放着好书不看", "nǐ fàngzhe hǎo shū bù kàn")}: sujeto, ${zh("放着", "fàngzhe")}, la cosa X, ${zh("不", "bù")} y el verbo Y.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("储蓄")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['chǔ xù'],
        pista: '<p>La primera sílaba baja y vuelve a subir; la segunda baja de golpe.</p>',
        solucion: `<p>${zh("储蓄", "chǔxù")}: <strong>chǔ xù</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("利息", "lìxī")}.</p>`,
        respuestas: ['interes', 'intereses', 'el interes', 'los intereses', 'interés'],
        pista: '<p>Es el pago extra que se agrega a un préstamo o a un dinero guardado.</p>',
        solucion: `<p>${zh("利息", "lìxī")} es «interés, intereses».</p>` },
    ],
    fuentes: [SILABO, DART_23, DART_30],
  });

  // ------------------------------------------------------------------
  L('Ciencia y tecnología de la información', {
    objetivo: `Entender 15 palabras de la tecnología de la información y usar los moldes ${zh("早(也)不X，晚(也)不X", "zǎo (yě) bù X, wǎn (yě) bù X")} y ${zh("X了就X了，(没)有…", "X le jiù X le, (méi) yǒu…")}.`,
    explicacion: `
      <p>Piensa en lo que haces con un teléfono o una computadora en un día cualquiera: abres una página, haces clic en un enlace, guardas un documento. Hoy aprendes cómo se dicen esas acciones en chino, y dos moldes para hablar de ellas con naturalidad. Las frases de ejemplo son de la lección y no son consejos de seguridad.</p>
      ${tabla([
        ['人工智能', 'réngōng zhìnéng', 'inteligencia artificial'], ['病毒', 'bìngdú', 'virus; también un virus de computadora'], ['点击', 'diǎnjī', 'hacer clic'], ['链接', 'liànjiē', 'enlace; conectar'], ['联网', 'liánwǎng', 'conectarse a internet'],
        ['浏览器', 'liúlǎnqì', 'navegador, programa para ver páginas web'], ['扫描', 'sǎomiáo', 'escanear'], ['文档', 'wéndàng', 'documento en un archivo'], ['多媒体', 'duōméitǐ', 'multimedia: texto, imagen y sonido juntos'], ['存储', 'cúnchǔ', 'almacenar, guardar datos'],
        ['输出', 'shūchū', 'sacar, dar como salida'], ['识别', 'shíbié', 'reconocer, identificar'], ['远程', 'yuǎnchéng', 'a distancia, remoto'], ['隐私', 'yǐnsī', 'privacidad, lo que es personal'], ['漏洞', 'lòudòng', 'falla, hueco, por ejemplo en un programa'],
      ])}
      <h3>¿Cómo se usan estas palabras?</h3>
      <p>El sílabo las lista como palabras de nivel 6 y marca el tipo de cada una. ${zh("点击", "diǎnjī")}, ${zh("扫描", "sǎomiáo")}, ${zh("存储", "cúnchǔ")}, ${zh("输出", "shūchū")} y ${zh("识别", "shíbié")} son verbos: dicen qué hace una persona o un aparato. ${zh("浏览器", "liúlǎnqì")}, ${zh("文档", "wéndàng")}, ${zh("病毒", "bìngdú")}, ${zh("隐私", "yǐnsī")} y ${zh("漏洞", "lòudòng")} son sustantivos: nombran cosas. ${zh("远程", "yuǎnchéng")} es un adjetivo y va delante de lo que describe. ${zh("联网", "liánwǎng")} se arma con dos piezas, «unir» y «red», y por eso se entiende solo. ${zh("人工智能", "réngōng zhìnéng")} es la inteligencia artificial, de la que hablas más a fondo en la materia de Inteligencia artificial.</p>
      <p>No hallé una fuente universitaria sobre cómo se usan estas palabras en un texto; las frases de la lección son una guía de cómo suenan.</p>
      <h3>¿Qué es ${zh("早(也)不X，晚(也)不X", "zǎo (yě) bù X, wǎn (yě) bù X")}?</h3>
      <p>El sílabo de nivel 6 lo lista como <strong>formato fijo</strong>: frases con un esqueleto que no cambia. No hallé una explicación universitaria, así que lo que sigue es una simplificación de la lección. Se repite el mismo verbo, una vez con ${zh("早", "zǎo")} («temprano») y otra con ${zh("晚", "wǎn")} («tarde»). Dices «no pasó antes, no pasó después», y luego el momento en que sí pasó. Casi siempre suena a queja: lo malo llegó en el peor momento. La palabra ${zh("也", "yě")} va entre paréntesis en el sílabo porque se puede quitar. Ejemplo: ${zh("手机早不坏，晚不坏，现在坏了", "shǒujī zǎo bù huài, wǎn bù huài, xiànzài huài le")}, «el teléfono no se dañó antes ni después, se dañó justo ahora».</p>
      <h3>¿Qué es ${zh("X了就X了，(没)有…", "X le jiù X le, (méi) yǒu…")}?</h3>
      <p>Es otro formato fijo del sílabo y también va con una simplificación de la lección. Se repite el mismo verbo con ${zh("了", "le")}, y entre ellos va ${zh("就", "jiù")}: «si ya pasó, pasó». Es una forma de aceptar algo que no se puede deshacer. Después de la coma va un comentario, a menudo con ${zh("有", "yǒu")} o ${zh("没有", "méiyǒu")} más algo. Ejemplo: ${zh("错了就错了，没有关系", "cuò le jiù cuò le, méiyǒu guānxi")}, «si ya me equivoqué, ya está, no importa». El paréntesis del sílabo indica que puedes decir ${zh("有", "yǒu")} o ${zh("没有", "méiyǒu")}.</p>
      <p class="nota"><strong>Trampa común:</strong> cambiar el verbo del segundo lado, como ${zh("错了就坏了", "cuò le jiù huài le")}. En ${zh("X了就X了", "X le jiù X le")} el verbo se repite igual.</p>`,
    ejemplo: `
      <p>Quieres quejarte: «mi computadora no se dañó antes ni después, se dañó justo antes del examen». Armemos la frase.</p>
      <ol class="pasos-ej">
        <li>Elige el verbo que se repite: ${zh("坏", "huài")}, «dañarse».</li>
        <li>Pon la primera mitad con ${zh("早", "zǎo")}: ${zh("早不坏", "zǎo bù huài")}, «no se dañó temprano».</li>
        <li>Pon la segunda mitad con ${zh("晚", "wǎn")}: ${zh("晚不坏", "wǎn bù huài")}, «no se dañó tarde».</li>
        <li>Di el momento en que sí pasó, después de una coma: ${zh("考试前坏了", "kǎoshì qián huài le")}.</li>
        <li>Pon el sujeto al principio: ${zh("电脑早不坏，晚不坏，考试前坏了", "diànnǎo zǎo bù huài, wǎn bù huài, kǎoshì qián huài le")}.</li>
      </ol>
      <p>Para comprobar, fíjate en que el mismo verbo, ${zh("坏", "huài")}, aparece en las dos mitades y en la parte final. Resultado: <span class="resultado">${zh("电脑早不坏，晚不坏，考试前坏了", "diànnǎo zǎo bù huài, wǎn bù huài, kǎoshì qián huài le")} = «la computadora no se dañó antes ni después, se dañó justo antes del examen»</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar el molde para algo bueno que llegó a tiempo. Suena a queja; para contentarte, usa otra forma.</p>`,
    vidaReal: `
      <p>Estas palabras están en tu teléfono y en tu computadora: el ${zh("浏览器", "liúlǎnqì")} que usas para ver páginas, el ${zh("链接", "liànjiē")} que abres, el ${zh("文档", "wéndàng")} que guardas. Con ellas puedes seguir una guía en chino sobre un aparato y entender cuando alguien habla de ${zh("隐私", "yǐnsī")} o de ${zh("人工智能", "réngōng zhìnéng")}. Y con los moldes puedes quejarte de un mal momento o aceptar un error sin dramatismo.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>El sílabo marca ${zh("点击", "diǎnjī")} como verbo. ¿Qué haces cuando lo haces?</p>`,
        opciones: ['Guardas un documento', 'Haces clic', 'Escaneas una hoja', 'Te conectas a internet'], correcta: 1,
        pista: '<p>Piensa en lo que haces con el ratón sobre un enlace.</p>',
        solucion: `<p>${zh("点击", "diǎnjī")} es «hacer clic».</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué dice ${zh("手机早不坏，晚不坏，现在坏了", "shǒujī zǎo bù huài, wǎn bù huài, xiànzài huài le")}?</p>`,
        opciones: ['El teléfono se dañó antes', 'El teléfono se dañará mañana', 'El teléfono se dañó justo ahora, ni antes ni después', 'El teléfono no se daña'], correcta: 2,
        pista: `<p>Las dos primeras mitades dicen «no pasó» y la última dice cuándo sí pasó.</p>`,
        solucion: `<p>El molde dice «ni antes ni después» y luego marca el momento: ${zh("现在", "xiànzài")}, «ahora».</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("错了就错了，没有关系", "cuò le jiù cuò le, méiyǒu guānxi")}?</p>`,
        opciones: ['Nunca me equivoco', 'Nadie se equivocó', 'Me equivoqué, qué pena y no puedo hacer nada', 'Si ya me equivoqué, ya está, no importa'], correcta: 3,
        pista: `<p>El molde repite el verbo con ${zh("了", "le")} y acepta lo que ya pasó.</p>`,
        solucion: `<p>${zh("错了就错了", "cuò le jiù cuò le")} es «si ya me equivoqué, ya está» y ${zh("没有关系", "méiyǒu guānxi")} es «no importa».</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «la computadora no se dañó antes ni después, se dañó ahora».</p>',
        respuesta: ['电脑', '早不坏', '晚不坏', '现在坏了'], pinyin: ['diànnǎo', 'zǎo bù huài', 'wǎn bù huài', 'xiànzài huài le'], lang: 'zh-Hans',
        pista: `<p>Primero el sujeto, luego ${zh("早", "zǎo")}, después ${zh("晚", "wǎn")} y al final el momento real.</p>`,
        solucion: `<p>${zh("电脑早不坏，晚不坏，现在坏了", "diànnǎo zǎo bù huài, wǎn bù huài, xiànzài huài le")}: sujeto, mitad con ${zh("早", "zǎo")}, mitad con ${zh("晚", "wǎn")} y el momento en que pasó.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("隐私")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['yǐn sī'],
        pista: '<p>La primera sílaba baja y vuelve a subir; la segunda empieza alta y se mantiene.</p>',
        solucion: `<p>${zh("隐私", "yǐnsī")}: <strong>yǐn sī</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("漏洞", "lòudòng")} (en un programa).</p>`,
        respuestas: ['falla', 'hueco', 'agujero', 'falla de seguridad', 'una falla', 'brecha', 'vulnerabilidad', 'error'],
        pista: '<p>Es un hueco por el que algo se escapa o se cuela.</p>',
        solucion: `<p>${zh("漏洞", "lòudòng")} es «falla, hueco».</p>` },
    ],
    fuentes: [SILABO],
  });

  // ------------------------------------------------------------------
  // Datos de ejemplo, no reales: electricidad de una ciudad inventada, por fuente, en unidades de ejemplo.
  const ENERGIA = () => barras({ etiquetas: ['Gas', 'Solar', 'Petróleo'], valores: [45, 30, 25], min: 0, max: 50, paso: 10,
    descripcion: 'Gráfica de barras con datos de ejemplo: electricidad que produce una ciudad inventada según su fuente, en unidades de ejemplo. Gas: 45, solar: 30 y petróleo: 25. El gas es la barra más alta y el petróleo la más baja.' });

  L('Energía y desastres naturales', {
    objetivo: `Entender 15 palabras de energía y desastres naturales, leer una gráfica sencilla y usar los moldes ${zh("东一A，西一A", "dōng yī A, xī yī A")} y ${zh("A一…，B一…", "A yī…, B yī…")} (con clasificador).`,
    explicacion: `
      <p>Cuando se va la luz en tu casa o llega una tormenta fuerte, hay palabras que aparecen en cualquier noticia: «energía», «inundación», «rescate». Esta lección trae 15 en chino y dos moldes para describir cómo quedan las cosas. Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['能源', 'néngyuán', 'fuente de energía'], ['新能源', 'xīnnéngyuán', 'energía nueva, como la solar'], ['太阳能', 'tàiyángnéng', 'energía solar'], ['石油', 'shíyóu', 'petróleo'], ['天然气', 'tiānránqì', 'gas natural'],
        ['发电', 'fādiàn', 'generar electricidad'], ['电力', 'diànlì', 'energía eléctrica'], ['洪水', 'hóngshuǐ', 'inundación'], ['旱灾', 'hànzāi', 'desastre por sequía'], ['台风', 'táifēng', 'tifón'],
        ['灾害', 'zāihài', 'desastre'], ['救援', 'jiùyuán', 'rescate, ayuda en una emergencia'], ['排放', 'páifàng', 'emitir, soltar al ambiente'], ['低碳', 'dītàn', 'de bajo carbono, que emite poco'], ['节能', 'jiénéng', 'ahorrar energía'],
      ])}
      <h3>¿Cómo se leen estas palabras?</h3>
      <p>Fíjate en que varias se arman con piezas que ya conoces. ${zh("新能源", "xīnnéngyuán")} es ${zh("新", "xīn")} («nuevo») más ${zh("能源", "néngyuán")}. ${zh("太阳能", "tàiyángnéng")} junta ${zh("太阳", "tàiyáng")} («sol») y ${zh("能", "néng")} («energía»). ${zh("旱灾", "hànzāi")} y ${zh("灾害", "zāihài")} comparten la pieza de «desastre». Así, con dos piezas puedes adivinar palabras nuevas. El sílabo marca ${zh("发电", "fādiàn")}, ${zh("救援", "jiùyuán")}, ${zh("排放", "páifàng")} y ${zh("节能", "jiénéng")} como verbos, y ${zh("低碳", "dītàn")} como adjetivo.</p>
      <h3>¿Cómo se lee una gráfica de ejemplo?</h3>
      <p>Imagina una ciudad inventada que produce electricidad con gas, con el sol y con petróleo. Las cifras son de ejemplo y no son reales. Cada barra muestra cuánto produce una fuente: mientras más alta, más produce. La de ${zh("天然气", "tiānránqì")} es la más alta; la de ${zh("石油", "shíyóu")}, la más baja.</p>
      ${ENERGIA()}
      <h3>¿Qué es ${zh("东一A，西一A", "dōng yī A, xī yī A")}?</h3>
      <p>El sílabo de nivel 6 lista este molde entre los <strong>formatos fijos</strong>: frases con un esqueleto que no cambia y huecos para llenar. No hallé una explicación universitaria, así que lo que sigue es una simplificación de la lección. ${zh("东", "dōng")} es «este» y ${zh("西", "xī")} es «oeste». Se repite la misma cosa A, una al este y otra al oeste: «uno aquí, otro allá». Describe cosas regadas por varios lugares. Ejemplo: ${zh("地上东一本书，西一本书", "dìshang dōng yī běn shū, xī yī běn shū")}, «hay un libro en un lado del suelo y otro en el otro».</p>
      <h3>¿Qué es ${zh("A一…，B一…", "A yī…, B yī…")} (con clasificador)?</h3>
      <p>Es otro formato fijo del sílabo, también con una simplificación de la lección. A y B son dos personas o cosas distintas; cada una va con ${zh("一", "yī")} y un clasificador, como ${zh("个", "gè")}. Reparte algo entre dos: ${zh("苹果你一个，我一个", "píngguǒ nǐ yī gè, wǒ yī gè")}, «de las manzanas, tú una y yo una». Un pariente cercano, de Chinese Grammar Wiki (AllSet), es ${zh("一个一个", "yī gè yī gè")}, «uno por uno»; AllSet dice que ${zh("个", "gè")} es el clasificador más probable y que otros pueden ocupar su lugar. Su ejemplo: ${zh("别吵，一个一个说", "bié chǎo, yī gè yī gè shuō")}, «no discutan, hablen uno por uno».</p>
      <p class="nota"><strong>Trampa común:</strong> escribir ${zh("东一本书，西一个书", "dōng yī běn shū, xī yī gè shū")}. En ${zh("东一A，西一A", "dōng yī A, xī yī A")} la cosa se repite igual, con el mismo clasificador.</p>`,
    ejemplo: `
      <p>Quieres decir: «después de la tormenta, en el suelo hay un libro aquí y otro allá». Armemos la frase.</p>
      <ol class="pasos-ej">
        <li>Empieza con el lugar: ${zh("地上", "dìshang")}, «en el suelo».</li>
        <li>Elige lo que está regado: ${zh("书", "shū")}, «libro», con su clasificador ${zh("本", "běn")}. Será la A del molde.</li>
        <li>Pon la primera mitad con ${zh("东", "dōng")}: ${zh("东一本书", "dōng yī běn shū")}, «un libro en un lado».</li>
        <li>Pon la segunda mitad con ${zh("西", "xī")}, repitiendo lo mismo: ${zh("西一本书", "xī yī běn shū")}, «un libro en el otro».</li>
        <li>Une las dos mitades: ${zh("地上东一本书，西一本书", "dìshang dōng yī běn shū, xī yī běn shū")}.</li>
      </ol>
      <p>Para comprobar, mira que las dos mitades sean iguales salvo ${zh("东", "dōng")} y ${zh("西", "xī")}. Resultado: <span class="resultado">${zh("地上东一本书，西一本书", "dìshang dōng yī běn shū, xī yī běn shū")} = «en el suelo hay libros regados, uno aquí y otro allá»</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que ${zh("东", "dōng")} y ${zh("西", "xī")} son direcciones de un mapa. En el molde solo marcan «aquí» y «allá», y A es la misma cosa en ambas mitades.</p>`,
    vidaReal: `
      <p>Los noticieros usan ${zh("灾害", "zāihài")}, ${zh("救援", "jiùyuán")} y ${zh("台风", "táifēng")} cuando pasa una tormenta fuerte, y hablan de ${zh("能源", "néngyuán")} y de ${zh("低碳", "dītàn")} cuando se trata de producir luz. Con la tabla entiendes los titulares, y con la gráfica de ejemplo aprendes a comparar fuentes por la altura de las barras. Los moldes te sirven para describir un cuarto desordenado o para repartir algo entre dos.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Una de estas palabras nombra un desastre por falta de lluvia. ¿Cuál?</p>',
        opciones: [zh('洪水', 'hóngshuǐ'), zh('旱灾', 'hànzāi'), zh('台风', 'táifēng'), zh('排放', 'páifàng')], correcta: 1,
        pista: '<p>Las otras nombran agua de más, un viento fuerte y soltar algo al aire.</p>',
        solucion: `<p>${zh("旱灾", "hànzāi")} es «desastre por sequía». ${zh("洪水", "hóngshuǐ")} es la inundación, ${zh("台风", "táifēng")} el tifón y ${zh("排放", "páifàng")}, emitir.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué describe ${zh("地上东一本书，西一本书", "dìshang dōng yī běn shū, xī yī běn shū")}?</p>`,
        opciones: ['Hay un solo libro en el suelo', 'Los libros están en orden en un estante', 'Hay libros regados por el suelo, uno aquí y otro allá', 'Todos los libros están en el este'], correcta: 2,
        pista: `<p>${zh("东", "dōng")} y ${zh("西", "xī")} marcan dos lugares distintos, con la misma cosa en cada uno.</p>`,
        solucion: `<p>El molde repite A en dos lugares y da la idea de «uno aquí, otro allá»: cosas regadas.</p>` },
      { tipo: 'opciones', enunciado: `<p>Mira la gráfica de ejemplo. ¿Qué fuente produce menos?</p>${ENERGIA()}`,
        opciones: [zh('石油', 'shíyóu'), zh('天然气', 'tiānránqì'), zh('太阳能', 'tàiyángnéng')], correcta: 0,
        pista: '<p>Busca la barra más baja y lee su nombre.</p>',
        solucion: `<p>La barra de petróleo, ${zh("石油", "shíyóu")}, vale 25, la más baja. El gas vale 45 y la solar, 30. Son cifras de ejemplo.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «en el suelo hay libros regados, uno aquí y otro allá».</p>',
        respuesta: ['地上', '东一本书', '西一本书'], pinyin: ['dìshang', 'dōng yī běn shū', 'xī yī běn shū'], lang: 'zh-Hans',
        pista: '<p>Primero el lugar, luego la mitad del este y al final la del oeste.</p>',
        solucion: `<p>${zh("地上东一本书，西一本书", "dìshang dōng yī běn shū, xī yī běn shū")}: lugar, mitad con ${zh("东", "dōng")} y mitad con ${zh("西", "xī")}.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("能源")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['néng yuán'],
        pista: '<p>Las dos sílabas suben.</p>',
        solucion: `<p>${zh("能源", "néngyuán")}: <strong>néng yuán</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("排放", "páifàng")} (por ejemplo, de gases).</p>`,
        respuestas: ['emitir', 'emision', 'emisiones', 'soltar', 'liberar', 'descargar', 'emisión', 'expulsar'],
        pista: '<p>Es lo que hace un tubo de escape con el humo.</p>',
        solucion: `<p>${zh("排放", "páifàng")} es «emitir, soltar al ambiente».</p>` },
    ],
    fuentes: [SILABO, ALLSET_YI],
  });

  L('Seguridad de los alimentos y salud', {
    objetivo: `Entender 15 palabras sobre la seguridad de los alimentos y la salud, y usar los moldes ${zh("看你X的", "kàn nǐ X de")}, ${zh("瞧他X的", "qiáo tā X de")} y ${zh("这也不X，那也不Y", "zhè yě bù X, nà yě bù Y")}.`,
    explicacion: `
      <p>Cuando compras comida, la etiqueta dice cosas como «orgánico», «sin aditivos» o «con vitaminas». Esta lección te enseña cómo se dicen esas palabras en chino y tres moldes para comentar lo que ves y oyes. Es solo lenguaje: no es una guía de salud ni de dieta, y para cualquier duda sobre tu cuerpo o tu comida le preguntas a una persona profesional de la salud. Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['添加', 'tiānjiā', 'añadir, agregar'], ['消毒', 'xiāodú', 'desinfectar'], ['细菌', 'xìjūn', 'bacteria'], ['中毒', 'zhòngdú', 'intoxicarse'], ['农产品', 'nóngchǎnpǐn', 'productos del campo'],
        ['有机', 'yǒujī', 'orgánico'], ['维生素', 'wéishēngsù', 'vitamina'], ['蛋白质', 'dànbáizhì', 'proteína'], ['脂肪', 'zhīfáng', 'grasa'], ['食欲', 'shíyù', 'ganas de comer'],
        ['检测', 'jiǎncè', 'analizar, comprobar con un aparato o una prueba'], ['监督', 'jiāndū', 'vigilar que se cumplan las reglas'], ['违规', 'wéiguī', 'no cumplir una regla'], ['症状', 'zhèngzhuàng', 'síntoma'], ['免疫', 'miǎnyì', 'inmunidad'],
      ])}
      <h3>¿Cómo se usan estas palabras?</h3>
      <p>No hallé una fuente universitaria sobre cómo se usan en un texto, así que me apoyo en el sílabo, que marca el tipo de cada una. ${zh("添加", "tiānjiā")}, ${zh("消毒", "xiāodú")}, ${zh("中毒", "zhòngdú")}, ${zh("检测", "jiǎncè")}, ${zh("监督", "jiāndū")}, ${zh("违规", "wéiguī")} y ${zh("免疫", "miǎnyì")} son verbos: dicen qué se hace o qué pasa. ${zh("细菌", "xìjūn")}, ${zh("农产品", "nóngchǎnpǐn")}, ${zh("维生素", "wéishēngsù")}, ${zh("蛋白质", "dànbáizhì")}, ${zh("脂肪", "zhīfáng")}, ${zh("食欲", "shíyù")} y ${zh("症状", "zhèngzhuàng")} son sustantivos: nombran cosas. ${zh("有机", "yǒujī")} es un adjetivo y va delante de lo que describe, como en una etiqueta.</p>
      <h3>¿Qué es ${zh("看你X的", "kàn nǐ X de")}?</h3>
      <p>A veces ves a alguien en un estado llamativo y quieres comentarlo con un poco de queja o de broma. En español dices «mira cómo estás». Oxford explica que la expresión ${zh("你看你", "nǐ kàn nǐ")} tiene un tono de reproche y va seguida de aquello que se reprocha. Su ejercicio también pide combinarla con la construcción ${zh("V得", "V de")}, el complemento que describe el resultado, que viste en la unidad de complementos. El molde del sílabo es ${zh("看你X的", "kàn nǐ X de")}: X es una palabra que describe cómo está la persona, y ${zh("的", "de")} cierra la frase. Ejemplo propio: ${zh("看你高兴的", "kàn nǐ gāoxìng de")}, «mira lo contento que estás». Es una simplificación de la lección: el tono depende de la voz y del momento, y puede ser de broma o de queja. Del ejemplo de Oxford solo tomo la regla, no su frase.</p>
      <h3>¿Qué es ${zh("瞧他X的", "qiáo tā X de")}?</h3>
      <p>El sílabo lo lista junto al anterior, como pareja: ${zh("看你X的/瞧他X的", "kàn nǐ X de / qiáo tā X de")}. ${zh("瞧", "qiáo")} es otra forma de decir «mirar», y aquí se comenta a una tercera persona, ${zh("他", "tā")}. No hallé una fuente de uso; lo que sigue es una simplificación de la lección. La forma es la misma, y solo cambia a quién miras. Ejemplo: ${zh("瞧他累的", "qiáo tā lèi de")}, «mira lo cansado que está».</p>
      <h3>¿Qué es ${zh("这也不X，那也不Y", "zhè yě bù X, nà yě bù Y")}?</h3>
      <p>Es un <strong>formato fijo</strong> del sílabo de nivel 6: frases con un esqueleto que no cambia y huecos para llenar. Tampoco hallé una explicación universitaria; es una simplificación de la lección. Dice «esto no, aquello tampoco», y se usa para describir a quien rechaza todo lo que se le ofrece. X y Y pueden ser el mismo verbo o dos distintos. Ejemplo: ${zh("他这也不吃，那也不吃", "tā zhè yě bù chī, nà yě bù chī")}, «ni esto ni aquello come». El sílabo lo muestra también al revés, ${zh("那/这也不Y", "nà / zhè yě bù Y")}, porque ${zh("这", "zhè")} y ${zh("那", "nà")} se pueden intercambiar.</p>
      <p class="nota"><strong>Trampa común:</strong> olvidar ${zh("也", "yě")}. Sin ${zh("也", "yě")}, la frase se queda en «esto no» y se pierde el «aquello tampoco».</p>`,
    ejemplo: `
      <p>Un amigo anda de un lado a otro con mil tareas y quieres comentarlo con cariño: «mira lo ocupado que estás». Armemos la frase.</p>
      <ol class="pasos-ej">
        <li>Elige la palabra que describe cómo está: ${zh("忙", "máng")}, «ocupado».</li>
        <li>Pon el comienzo del molde, que dirige la mirada a la persona: ${zh("看你", "kàn nǐ")}, «mira cómo estás».</li>
        <li>Agrega la palabra de estado en el hueco de X: ${zh("看你忙", "kàn nǐ máng")}.</li>
        <li>Cierra con ${zh("的", "de")}, porque el molde lo pide: ${zh("看你忙的", "kàn nǐ máng de")}.</li>
      </ol>
      <p>Si el comentario es sobre otra persona, cambias ${zh("看你", "kàn nǐ")} por ${zh("瞧他", "qiáo tā")} y listo. Para comprobar, mira que haya una sola palabra de estado entre el comienzo y ${zh("的", "de")}. Resultado: <span class="resultado">${zh("看你忙的", "kàn nǐ máng de")} = «mira lo ocupado que estás»</span> y ${zh("瞧他忙的", "qiáo tā máng de")} = «mira lo ocupado que está».</p>
      <p class="nota"><strong>Error común:</strong> añadir un verbo antes de la palabra de estado. En ${zh("看你X的", "kàn nǐ X de")} el hueco X es una palabra que describe, como ${zh("忙", "máng")} o ${zh("累", "lèi")}.</p>`,
    vidaReal: `
      <p>Las noticias sobre comida hablan de ${zh("检测", "jiǎncè")}, de ${zh("监督", "jiāndū")} y de quien ${zh("违规", "wéiguī")}, y las etiquetas dicen ${zh("有机", "yǒujī")} o ${zh("维生素", "wéishēngsù")}. Con la tabla entiendes esos carteles, etiquetas y titulares sin traducirlos palabra por palabra. Y con los moldes puedes comentar, entre amigos, cómo está alguien o quejarte de quien rechaza todo en la mesa. Para tu salud, no te guíes por esta lección.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Según Oxford, ¿qué tono tiene la expresión ${zh("你看你", "nǐ kàn nǐ")}?</p>`,
        opciones: ['Un tono de alegría', 'Un tono de reproche', 'Un tono de pregunta', 'Un tono de orden'], correcta: 1,
        pista: '<p>Oxford dice que va seguida de aquello que se reprocha.</p>',
        solucion: `<p>Oxford explica que ${zh("你看你", "nǐ kàn nǐ")} tiene un tono de reproche y que después va aquello que se reprocha.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué dice ${zh("瞧他累的", "qiáo tā lèi de")}?</p>`,
        opciones: ['Mira lo cansado que está', 'Mira lo cansado que estás', 'Él no quiere descansar', 'Quiero verlo mañana'], correcta: 0,
        pista: `<p>${zh("瞧他", "qiáo tā")} se refiere a una tercera persona, no a ti.</p>`,
        solucion: `<p>${zh("瞧他", "qiáo tā")} dirige la mirada a «él» y ${zh("累", "lèi")} es «cansado»: «mira lo cansado que está».</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué describe ${zh("他这也不吃，那也不吃", "tā zhè yě bù chī, nà yě bù chī")}?</p>`,
        opciones: ['Alguien que lo come todo', 'Alguien que cocina para otros', 'Alguien que compra comida', 'Alguien que rechaza esto y aquello'], correcta: 3,
        pista: `<p>Fíjate en ${zh("不", "bù")} en cada mitad.</p>`,
        solucion: `<p>El molde dice «esto no, aquello tampoco»: describe a quien rechaza todo lo que le ofrecen.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «mira lo ocupado que estás».</p>',
        respuesta: ['看你', '忙', '的'], pinyin: ['kàn nǐ', 'máng', 'de'], lang: 'zh-Hans',
        pista: '<p>Primero la mirada, luego la palabra de estado y al final la partícula de cierre.</p>',
        solucion: `<p>${zh("看你忙的", "kàn nǐ máng de")}: ${zh("看你", "kàn nǐ")}, el estado ${zh("忙", "máng")} y ${zh("的", "de")} al cierre.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("细菌")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['xì jūn'],
        pista: '<p>La primera sílaba baja de golpe; la segunda empieza alta y se mantiene.</p>',
        solucion: `<p>${zh("细菌", "xìjūn")}: <strong>xì jūn</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("免疫", "miǎnyì")}.</p>`,
        respuestas: ['inmunidad', 'inmunizar', 'inmune', 'la inmunidad', 'inmunización'],
        pista: '<p>Es la defensa del cuerpo; la palabra en español empieza con «inm».</p>',
        solucion: `<p>${zh("免疫", "miǎnyì")} es «inmunidad».</p>` },
    ],
    fuentes: [SILABO, OXFORD_MM],
  });

  L('Voluntariado y vida en comunidad', {
    objetivo: `Entender 15 palabras del voluntariado y de la vida en comunidad, contar con los clasificadores ${zh("扇", "shàn")}, ${zh("枝", "zhī")} y ${zh("卷", "juǎn")}, y usar ${zh("不X不…，一X…", "bù X bù…, yī X…")} y ${zh("好你个X", "hǎo nǐ gè X")}.`,
    explicacion: `
      <p>Piensa en un fin de semana en que un grupo de vecinos ayuda en un hogar de ancianos: unos pintan una puerta, otros reparten cartas, otros juntan donaciones. Hoy aprendes cómo se dicen esas ideas en chino, tres clasificadores nuevos y dos moldes para comentar lo que pasa. Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['公益', 'gōngyì', 'bien común, causa social'], ['捐款', 'juānkuǎn', 'donar dinero; donación'], ['捐赠', 'juānzèng', 'donar cosas'], ['互助', 'hùzhù', 'ayudarse entre todos'], ['关爱', "guān'ài", 'cuidar con cariño'],
        ['奉献', 'fèngxiàn', 'dar algo de uno mismo por los demás'], ['救助', 'jiùzhù', 'ayudar a quien está en apuros'], ['养老院', 'yǎnglǎoyuàn', 'hogar de ancianos'], ['残疾', 'cánjí', 'discapacidad'], ['福利', 'fúlì', 'beneficio, bienestar'],
        ['团结', 'tuánjié', 'unirse; unido'], ['协助', 'xiézhù', 'ayudar, apoyar'], ['扇', 'shàn', 'clasificador de puertas y ventanas'], ['枝', 'zhī', 'clasificador de objetos largos, como bolígrafos; rama'], ['卷', 'juǎn', 'enrollar; rollo; clasificador de rollos'],
      ])}
      <h3>¿Cómo se leen estas palabras?</h3>
      <p>El sílabo marca ${zh("捐款", "juānkuǎn")} como verbo y sustantivo a la vez, igual que ${zh("福利", "fúlì")} y ${zh("团结", "tuánjié")} (esta última también es adjetivo). ${zh("捐赠", "juānzèng")}, ${zh("互助", "hùzhù")}, ${zh("关爱", "guān'ài")}, ${zh("奉献", "fèngxiàn")}, ${zh("救助", "jiùzhù")} y ${zh("协助", "xiézhù")} son verbos. ${zh("公益", "gōngyì")}, ${zh("养老院", "yǎnglǎoyuàn")} y ${zh("残疾", "cánjí")} son sustantivos. Una pista: ${zh("捐款", "juānkuǎn")} y ${zh("捐赠", "juānzèng")} empiezan igual y las dos hablan de donar; en la primera se dona dinero y en la segunda, cosas.</p>
      <h3>¿Cómo se cuenta con ${zh("扇", "shàn")} y ${zh("枝", "zhī")}?</h3>
      <p>Para decir «dos puertas» no basta el número: el chino pone un clasificador entre el número y la cosa. Oxford lo explica así: hace falta cuando hay una cantidad, por ejemplo un número delante del sustantivo. Para ${zh("扇", "shàn")}, Oxford dice «algo vertical con una superficie plana», como puertas y ventanas, con los ejemplos ${zh("三扇门", "sān shàn mén")} y ${zh("一扇窗", "yī shàn chuāng")}. Para ${zh("枝", "zhī")}, dice «objetos como una ramita», con el ejemplo de los bolígrafos, ${zh("一枝钢笔", "yī zhī gāngbǐ")}. Oxford aclara que ${zh("只", "zhī")}, para animales y para uno de un par, suena igual que ${zh("枝", "zhī")} pero se escribe distinto.</p>
      <h3>¿Y ${zh("卷", "juǎn")}?</h3>
      <p>El sílabo lo lista como verbo («enrollar»), como sustantivo y como clasificador, y en la gramática lo anota dos veces, como ${zh("卷1", "juǎn 1")} y ${zh("卷2", "juǎn 2")}. No hallé una fuente de uso; lo que sigue es una simplificación de la lección: como clasificador sirve para cosas enrolladas, como un rollo de papel.</p>
      <h3>¿Qué es ${zh("不X不…，一X…", "bù X bù…, yī X…")}?</h3>
      <p>Es un <strong>formato fijo</strong> del sílabo de nivel 6: frases con un esqueleto que no cambia y huecos para llenar. No hay regla universitaria; hay un ejemplo en un texto de la Universidad de Iowa (original de China, 2008): ${zh("不看不知道，一看…", "bù kàn bù zhīdào, yī kàn…")}, con el que la autora cuenta su sorpresa al informarse sobre comida. El resto de esa frase lo dejo fuera. Como simplificación de la lección, se lee «si no lo miras, no lo sabes; en cuanto lo miras, ya cambia»: primero la ignorancia, luego el descubrimiento. Ejemplo propio: ${zh("不去不知道，一去就喜欢", "bù qù bù zhīdào, yī qù jiù xǐhuan")}, «si no vas, no sabes; en cuanto vas, te gusta».</p>
      <h3>¿Qué es ${zh("好你个X", "hǎo nǐ gè X")}?</h3>
      <p>Es otro formato fijo del sílabo, también con una simplificación de la lección. Se dice con sorpresa y un poco de reproche o de broma, a alguien a quien llamas por su nombre: «vaya, así que eres tú». Ejemplo propio: ${zh("好你个小李，你也来了", "hǎo nǐ gè xiǎo Lǐ, nǐ yě lái le")}, «vaya, Li, así que tú también viniste». El tono depende de la voz, y entre amigos suele ser de broma.</p>
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("扇", "shàn")} para cualquier cosa plana. Oxford lo da para cosas verticales con superficie plana, como puertas y ventanas; un papel o una mesa no entran.</p>`,
    ejemplo: `
      <p>Quieres decir: «el hogar de ancianos tiene dos puertas». Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Empieza por el lugar: ${zh("养老院", "yǎnglǎoyuàn")}, «hogar de ancianos».</li>
        <li>Pon el verbo ${zh("有", "yǒu")}, «tener», porque dices lo que hay.</li>
        <li>Elige el número: ${zh("两", "liǎng")}, «dos». Con la cantidad, hace falta el clasificador.</li>
        <li>Busca el clasificador de lo que cuentas: las puertas son verticales y planas, así que va ${zh("扇", "shàn")}.</li>
        <li>Cierra con la cosa: ${zh("门", "mén")}, «puerta». Queda ${zh("养老院有两扇门", "yǎnglǎoyuàn yǒu liǎng shàn mén")}.</li>
      </ol>
      <p>Para comprobar, mira que entre el número y la cosa haya un clasificador y que sea el que sirve para puertas. Resultado: <span class="resultado">${zh("养老院有两扇门", "yǎnglǎoyuàn yǒu liǎng shàn mén")} = «el hogar de ancianos tiene dos puertas»</span>.</p>
      <p class="nota"><strong>Error común:</strong> decir ${zh("两门", "liǎng mén")} sin clasificador. Con un número delante, el clasificador siempre va en medio.</p>`,
    vidaReal: `
      <p>En los carteles de un barrio y en las noticias de ${zh("公益", "gōngyì")} verás ${zh("捐款", "juānkuǎn")}, ${zh("捐赠", "juānzèng")} y ${zh("互助", "hùzhù")}. Con la tabla puedes leer la invitación de un cartel a ayudar en un ${zh("养老院", "yǎnglǎoyuàn")} o entender qué se junta en una colecta. Y con los clasificadores sabes contar una ${zh("扇", "shàn")} de puerta, un ${zh("枝", "zhī")} de bolígrafos o un ${zh("卷", "juǎn")} de papel.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Según Oxford, ¿con qué clasificador cuentas ventanas y puertas?</p>`,
        opciones: [zh('枝', 'zhī'), zh('扇', 'shàn'), zh('卷', 'juǎn'), zh('只', 'zhī')], correcta: 1,
        pista: '<p>Oxford habla de algo vertical con una superficie plana.</p>',
        solucion: `<p>${zh("扇", "shàn")} es el clasificador de cosas verticales y planas: ${zh("一扇窗", "yī shàn chuāng")}, ${zh("三扇门", "sān shàn mén")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Cuál es la frase correcta para «un bolígrafo», con el ejemplo de Oxford?</p>`,
        opciones: [zh('一扇钢笔', 'yī shàn gāngbǐ'), zh('一卷钢笔', 'yī juǎn gāngbǐ'), zh('一枝钢笔', 'yī zhī gāngbǐ')], correcta: 2,
        pista: '<p>Oxford da este clasificador para objetos como una ramita.</p>',
        solucion: `<p>${zh("一枝钢笔", "yī zhī gāngbǐ")} es el ejemplo de Oxford: ${zh("枝", "zhī")} cuenta objetos largos y finos como los bolígrafos.</p>` },
      { tipo: 'opciones', enunciado: `<p>El texto de Iowa usa ${zh("不看不知道，一看…", "bù kàn bù zhīdào, yī kàn…")}. ¿Qué idea tiene el molde?</p>`,
        opciones: ['Primero no sabes y, en cuanto miras, descubres algo', 'Siempre sabes todo de antemano', 'Nunca miras lo que pasa', 'Miras primero y olvidas después'], correcta: 0,
        pista: '<p>Mira cómo se oponen «no ver» y «en cuanto ver».</p>',
        solucion: `<p>La primera mitad dice «si no lo miras, no lo sabes» y la segunda marca el descubrimiento «en cuanto lo miras».</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «el hogar de ancianos tiene dos puertas».</p>',
        respuesta: ['养老院', '有', '两', '扇', '门'], pinyin: ['yǎnglǎoyuàn', 'yǒu', 'liǎng', 'shàn', 'mén'], lang: 'zh-Hans',
        pista: '<p>El lugar va primero; el número y el clasificador van juntos, antes de la cosa.</p>',
        solucion: `<p>${zh("养老院有两扇门", "yǎnglǎoyuàn yǒu liǎng shàn mén")}: lugar, ${zh("有", "yǒu")}, número, clasificador y cosa.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("捐赠")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['juān zèng'],
        pista: '<p>La primera sílaba empieza alta y se mantiene; la segunda baja de golpe.</p>',
        solucion: `<p>${zh("捐赠", "juānzèng")}: <strong>juān zèng</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("团结", "tuánjié")}.</p>`,
        respuestas: ['unirse', 'unido', 'unidad', 'union', 'unión', 'unir', 'unirse en grupo', 'unidos'],
        pista: '<p>Es lo que hace un grupo cuando se junta con un mismo fin.</p>',
        solucion: `<p>${zh("团结", "tuánjié")} es «unirse; unido».</p>` },
    ],
    fuentes: [SILABO, OXFORD_MW, IOWA],
  });

  L('Debates sobre educación', {
    objetivo: `Entender 15 palabras sobre educación, usar los moldes ${zh("X到Y头上来了", "X dào Y tóu shang lái le")} y ${zh("看/瞧 + 把 + O + X得", "kàn / qiáo + bǎ + O + X de")}, y leer un pequeño debate distinguiendo hechos de opiniones.`,
    explicacion: `
      <p>En casi todas las familias y escuelas hay una charla parecida: ¿hacen falta clases extra o es mejor tener tiempo libre? Los debates sobre educación usan palabras como «curso obligatorio», «optativo» o «título». Esta lección trae 15 en chino, dos moldes para comentar y un texto de debate para leer. Las frases de ejemplo y el texto son de la lección.</p>
      ${tabla([
        ['必修', 'bìxiū', 'obligatorio, que hay que cursar'], ['选修', 'xuǎnxiū', 'cursar como optativa'], ['补习', 'bǔxí', 'tomar clases extra'], ['辅导', 'fǔdǎo', 'dar clases de apoyo'], ['升学', 'shēngxué', 'pasar a un nivel superior de estudios'],
        ['招生', 'zhāoshēng', 'admitir alumnos nuevos'], ['学位', 'xuéwèi', 'título académico'], ['素质', 'sùzhì', 'cualidades de una persona'], ['导师', 'dǎoshī', 'tutor o tutora'], ['文科', 'wénkē', 'letras, humanidades'],
        ['理科', 'lǐkē', 'ciencias'], ['考核', 'kǎohé', 'evaluar con pruebas'], ['评估', 'pínggū', 'valorar, calcular un resultado'], ['竞赛', 'jìngsài', 'competir; competencia'], ['学问', 'xuéwen', 'conocimiento, saber'],
      ])}
      <h3>¿Cómo se usan estas palabras?</h3>
      <p>No hallé una fuente universitaria de uso; me apoyo en el sílabo. ${zh("选修", "xuǎnxiū")}, ${zh("补习", "bǔxí")}, ${zh("辅导", "fǔdǎo")}, ${zh("升学", "shēngxué")}, ${zh("招生", "zhāoshēng")}, ${zh("考核", "kǎohé")}, ${zh("评估", "pínggū")} y ${zh("竞赛", "jìngsài")} son verbos. ${zh("必修", "bìxiū")} es un adjetivo. ${zh("学位", "xuéwèi")}, ${zh("素质", "sùzhì")}, ${zh("导师", "dǎoshī")}, ${zh("文科", "wénkē")}, ${zh("理科", "lǐkē")} y ${zh("学问", "xuéwen")} son sustantivos. Una pareja útil: ${zh("必修", "bìxiū")} es lo que hay que cursar y ${zh("选修", "xuǎnxiū")} lo que eliges tú.</p>
      <h3>¿Qué es ${zh("X到Y头上来了", "X dào Y tóu shang lái le")}?</h3>
      <p>Es un <strong>formato fijo</strong> del sílabo de nivel 6: frases con un esqueleto que no cambia y huecos para llenar. No hallé una explicación universitaria, así que lo que sigue es una simplificación de la lección. Literalmente dice «X llegó hasta la cabeza de Y», y se usa cuando algo que se esperaba lejos de ti de pronto te toca, casi siempre con molestia. X es lo que llega y Y es quien lo recibe. Ejemplo: ${zh("他说到我头上来了", "tā shuō dào wǒ tóu shang lái le")}, «ahora hasta a mí me toca oír sus sermones». Aquí X es ${zh("说", "shuō")}, «decir, regañar», y Y es ${zh("我", "wǒ")}.</p>
      <h3>¿Qué es ${zh("看/瞧 + 把 + O + X得", "kàn / qiáo + bǎ + O + X de")}?</h3>
      <p>Este molde mezcla lo que viste en «Noticias y temas de actualidad». El sílabo anota que O, el objeto de ${zh("把", "bǎ")}, es el «agente» del resultado: quien acaba haciendo o sintiendo algo, como ${zh("我们", "wǒmen")} en aquella lección. ${zh("看", "kàn")} o ${zh("瞧", "qiáo")}, «mirar», abren el comentario, y ${zh("X得", "X de")} dice cómo termina O. No hallé una fuente de uso; es una simplificación de la lección. Ejemplo: ${zh("瞧他把老师问得笑了", "qiáo tā bǎ lǎoshī wèn de xiào le")}, «mira, con sus preguntas hizo reír al maestro». Quien ríe es ${zh("老师", "lǎoshī")}, el objeto de ${zh("把", "bǎ")}.</p>
      <h3>Un debate para leer</h3>
      <p>Lee este debate corto entre dos estudiantes. Las dos voces son inventadas para esta lección, y el tema es neutro: ni una postura ni la otra es «la correcta».</p>
      <p>${zh("小李：我觉得补习很好。老师辅导学生，学生就能考得更好。", "Xiǎo Lǐ: Wǒ juéde bǔxí hěn hǎo. Lǎoshī fǔdǎo xuésheng, xuésheng jiù néng kǎo de gèng hǎo.")}</p>
      <p>${zh("小张：我觉得补习不好。学生需要时间休息，也要选修自己喜欢的课。", "Xiǎo Zhāng: Wǒ juéde bǔxí bù hǎo. Xuésheng xūyào shíjiān xiūxi, yě yào xuǎnxiū zìjǐ xǐhuan de kè.")}</p>
      <p>En español: Li cree que las clases extra son buenas, porque si una maestra o un maestro apoya, los alumnos sacan mejores notas. Zhang cree que no son buenas: los alumnos necesitan tiempo para descansar y para elegir las optativas que les gustan.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que O es siempre quien recibe la acción. En este molde, O es quien acaba en cierto estado, como el maestro que se ríe.</p>`,
    ejemplo: `
      <p>Para leer un debate, hay que separar. En «Hechos y opiniones» (Lectura) viste que un hecho se puede comprobar y una opinión dice lo que alguien piensa. Aquí, ${zh("我觉得", "wǒ juéde")}, «yo creo», avisa que viene una opinión. Y en «Cómo se construye un argumento» viste que una postura se apoya en una razón. Li da su razón con ${zh("就", "jiù")}: «si pasa esto, entonces pasa aquello». Zhang da dos razones, unidas con ${zh("也", "yě")}.</p>
      <p>Para comprobar, busca en cada voz dos cosas: qué piensa y por qué. Resultado: <span class="resultado">Li: las clases extra ayudan a sacar mejores notas. Zhang: los alumnos necesitan tiempo libre y optativas.</span></p>
      <h3>Cierre de la unidad</h3>
      <p>Con esta lección terminas «HSK 6 · Temas actuales». Pasaste por noticias, dinero, tecnología, energía, alimentos, voluntariado y educación, y usaste moldes fijos del nivel 6. Lo que sigue es la unidad «HSK 6 · Cultura y textos».</p>
      <p class="nota"><strong>Error común:</strong> pensar que las dos posturas no pueden tener algo de razón. Un buen debate se lee entendiendo ambas, aunque no estés de acuerdo con una.</p>`,
    vidaReal: `
      <p>Cuando alguien en una escuela habla de ${zh("必修", "bìxiū")}, de ${zh("选修", "xuǎnxiū")} o de ${zh("补习", "bǔxí")}, ahora entiendes de qué trata. Con las palabras de la tabla puedes seguir una noticia sobre ${zh("招生", "zhāoshēng")} o un ${zh("竞赛", "jìngsài")}. Y con el texto de debate practicas algo que sirve en cualquier idioma: separar lo que alguien piensa de las razones que da, sin tomar partido todavía.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>En el debate, ¿qué razón da Zhang para no tomar clases extra?</p>',
        opciones: ['Que los maestros no saben enseñar', 'Que los alumnos necesitan tiempo para descansar y elegir optativas', 'Que las clases cuestan mucho', 'Que no hay competencias'], correcta: 1,
        pista: '<p>Relee lo que dice Zhang después de «no hace falta».</p>',
        solucion: `<p>Zhang dice que los alumnos necesitan tiempo para descansar y también ${zh("选修", "xuǎnxiū")}, o sea, elegir las optativas que les gustan.</p>` },
      { tipo: 'opciones', enunciado: `<p>${zh("我觉得补习很好", "wǒ juéde bǔxí hěn hǎo")} es...</p>`,
        opciones: ['Un hecho que se puede comprobar con una prueba', 'Una opinión de Li', 'Una pregunta', 'Un título del colegio'], correcta: 1,
        pista: `<p>${zh("我觉得", "wǒ juéde")} significa «yo creo».</p>`,
        solucion: `<p>Es una opinión: dice lo que Li piensa. Como viste en «Hechos y opiniones», un hecho se puede comprobar.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("他说到我头上来了", "tā shuō dào wǒ tóu shang lái le")}?</p>`,
        opciones: ['Él se fue lejos de mí', 'Él me ayudó con mi tarea', 'Ahora hasta a mí me toca oír sus sermones', 'Él no sabe qué hacer'], correcta: 2,
        pista: `<p>Piensa en «llegó hasta mi cabeza»: algo que estaba lejos te toca a ti.</p>`,
        solucion: `<p>El molde ${zh("X到Y头上来了", "X dào Y tóu shang lái le")} dice que algo llegó hasta Y, con molestia: aquí, «ahora hasta a mí me toca oír sus sermones».</p>` },
      { tipo: 'opciones', enunciado: `<p>En ${zh("瞧他把老师问得笑了", "qiáo tā bǎ lǎoshī wèn de xiào le")}, ¿quién se ríe?</p>`,
        opciones: ['El que pregunta', 'Quien lo cuenta', 'Los demás alumnos', 'El maestro, el objeto de bǎ'], correcta: 3,
        pista: `<p>Mira quién va justo después de ${zh("把", "bǎ")}.</p>`,
        solucion: `<p>${zh("老师", "lǎoshī")}, «el maestro», va después de ${zh("把", "bǎ")} y es quien acaba riendo, por las preguntas de «él».</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «mira, con sus preguntas hizo reír al maestro».</p>',
        respuesta: ['瞧他', '把', '老师', '问得', '笑了'], pinyin: ['qiáo tā', 'bǎ', 'lǎoshī', 'wèn de', 'xiào le'], lang: 'zh-Hans',
        pista: `<p>Primero la mirada, después ${zh("把", "bǎ")} con su objeto y al final el verbo con su resultado.</p>`,
        solucion: `<p>${zh("瞧他把老师问得笑了", "qiáo tā bǎ lǎoshī wèn de xiào le")}: ${zh("瞧他", "qiáo tā")}, ${zh("把", "bǎ")}, el objeto, ${zh("问得", "wèn de")} y el resultado ${zh("笑了", "xiào le")}.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("选修")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['xuǎn xiū'],
        pista: '<p>La primera sílaba baja y vuelve a subir; la segunda empieza alta y se mantiene.</p>',
        solucion: `<p>${zh("选修", "xuǎnxiū")}: <strong>xuǎn xiū</strong>.</p>` },
    ],
    fuentes: [SILABO],
  });
})();
