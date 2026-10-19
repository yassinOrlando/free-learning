// Mandarín · Unidad 9: HSK 4 · Frases complejas.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Todo carácter chino sale de zh(). Las frases de ejemplo («…») son de la lección; solo las palabras vienen del sílabo.
// Sin grabaciones: ningún `audio:`; solo la voz del sistema.
(function () {
  const zh = window.zh;
  const RANER = "rán'ér"; // el apóstrofo del sílabo, fuera de las líneas con comillas simples
  const L = (titulo, datos) => window.registrarLeccion('mandarin', titulo, datos);
  // Tabla de vocabulario: palabra con su botón y significado.
  const tabla = (filas) => `<div class="tabla-wrap"><table class="vocabulario"><tr><th scope="col">Palabra</th><th scope="col">Significado</th></tr>${filas.map(([h, p, es]) => `<tr><td>${zh(h, p)}</td><td>${es}</td></tr>`).join('')}</table></div>`;
  // Tabla de comparación: encabezados y filas ya armadas con zh().
  const cuadro = (cab, filas) => `<div class="tabla-wrap"><table><tr>${cab.map((c) => `<th scope="col">${c}</th>`).join('')}</tr>${filas.map((f) => `<tr>${f.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>`;

  // Fuentes. Los números F# son los de la ficha de la unidad.
  const SILABO = { nombre: 'Centro de Educación y Cooperación Lingüística (China), «HSK 考试大纲», sílabo del HSK 3.0 (2025)', url: 'https://hsk.cn-bj.ufileos.com/3.0/新版HSK考试大纲1219.pdf' };
  const OXFORD = { nombre: 'Centre for Teaching Chinese as a Foreign Language, Universidad de Oxford (Reino Unido), Elementary Chinese Grammar 基础汉语语法, base de gramática en línea (2011, en inglés)', url: 'https://www.ctcfl.ox.ac.uk/materials_lang-work_grammar-database_grammar-database1/' };
  const MIT = { nombre: 'MIT OpenCourseWare (EE. UU.), J. K. Wheatley, Learning Chinese: A Foundation Course in Mandarin (2011, en inglés)', url: 'https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/res21g_003_s_11.pdf' };
  const DART = (n, url, nota) => ({ nombre: `Dartmouth College (EE. UU.), Snapshots of China, lección ${n}: ${nota} (2023, en inglés)`, url });
  const DART_13 = DART(13, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e5%8d%81%e4%b8%89%e8%af%be-lesson-13/', 'glosa y ejemplos de 甚至 y notas de 无论');
  const DART_18 = DART(18, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e5%8d%81%e5%85%ab%e8%af%be-lesson-18/', 'ejemplos de 不是…而是…');
  const DART_24 = DART(24, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e4%ba%8c%e5%8d%81%e5%9b%9b%e8%af%be-lesson-24/', 'notas de gramática de 不仅');
  const DART_28 = DART(28, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e4%ba%8c%e5%8d%81%e5%85%ab%e8%af%be-lesson-28/', 'ejemplos de 不仅…而且…');
  const DART_22 = DART(22, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%ba%8c%e8%af%be-lesson-22/', 'notas de gramática de 然而');
  const DART_26 = DART(26, 'https://sites.dartmouth.edu/snapshotsofchina/new-2/', 'notas de gramática de 尽管');
  const DART_29 = DART(29, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%b9%9d%e8%af%be-lesson-29/', 'notas de gramática de 不管');
  const DART_16 = DART(16, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e5%8d%81%e5%85%ad%e8%af%be-lesson-16/', 'ejemplos de 不论');
  const DART_21 = DART(21, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%b8%80%e8%af%be-lesson-21/', 'notas de gramática del pronombre 谁');
  const YALE_JISHI = { nombre: 'Universidad de Yale (EE. UU.), Chinese Exchange: «即使 y 尽管» (2019, en chino)', url: 'https://campuspress.yale.edu/exchange/2019/11/26/%e5%8d%b3%e4%bd%bf/' };
  const CHINGRAM_BUDAN = { nombre: 'Universidad Palacký de Olomouc (Chequia), ChinGram: Construction búdàn…érqiě (yě) 不但……，而且(也)…… «not only…, but also…» (en inglés)', url: 'https://chingram.upol.cz/grammar/the-construction-budanerqie-ye-%e4%b8%8d%e4%bd%86%ef%bc%8c%e8%80%8c%e4%b8%94%e4%b9%9f-not-only-but-also' };
  const KAPIOLANI = { nombre: 'Kapiolani Community College (EE. UU.), CHN101 Elementary Mandarin I: Lesson 3 Grammar, Expressing «and also» with 还 (hái) (2020, en inglés)', url: 'https://human.libretexts.org/Bookshelves/Languages/Chinese/CHN101_Elementary_Mandarin_I_Textbook/04:_Family/4.06:_Lesson_3_Grammar_-_Expressing_and_also_with__(hai)' };
  const ALLSET_ER = { nombre: 'Chinese Grammar Wiki (AllSet Learning), fuente de apoyo no universitaria: Using «er» to explain contrasting ideas (2026, en inglés)', url: 'https://resources.allsetlearning.com/chinese/grammar/Expressing_%22not%E2%80%A6_but%E2%80%A6%22_with_%22er_shi%22' };
  const ALLSET_JIU = { nombre: 'Chinese Grammar Wiki (AllSet Learning), fuente de apoyo no universitaria: Expressing the only two possibilities (2026, en inglés)', url: 'https://resources.allsetlearning.com/chinese/grammar/Expressing_the_only_two_possibilities' };

  // ------------------------------------------------------------------
  L('Incluso: 连…也/都…', {
    objetivo: `Decir «hasta» o «ni siquiera» con ${zh("连", "lián")}…${zh("也", "yě")}/${zh("都", "dōu")}…, poner cada pieza en su lugar y nombrar emociones de HSK 4 como ${zh("激动", "jīdòng")} o ${zh("紧张", "jǐnzhāng")}.`,
    explicacion: `
      <p>Desde esta lección empieza HSK 4. La unidad enseña toda la gramática de frases complejas que le toca a este nivel, pero solo una selección de sus palabras: la lista completa está en el <a href="${encodeURI(SILABO.url)}">sílabo oficial</a>. Las frases de ejemplo son de la lección. La voz depende de tu dispositivo; si suena rara, el pinyin manda.</p>
      ${tabla([
        ['连', 'lián', 'incluso, hasta'], ['甚至', 'shènzhì', 'incluso, hasta el punto de'], ['竟然', 'jìngrán', 'inesperadamente'], ['吃惊', 'chījīng', 'asombrarse'], ['激动', 'jīdòng', 'emocionado'],
        ['兴奋', 'xīngfèn', 'muy animado'], ['伤心', 'shāngxīn', 'triste, con el corazón dolido'], ['失望', 'shīwàng', 'decepcionarse; decepcionado'], ['难受', 'nánshòu', 'sentirse mal'], ['感动', 'gǎndòng', 'conmovido'],
        ['羡慕', 'xiànmù', 'envidiar con admiración'], ['害羞', 'hàixiū', 'tímido, con vergüenza'], ['心情', 'xīnqíng', 'estado de ánimo'], ['紧张', 'jǐnzhāng', 'nervioso, tenso'], ['骄傲', "jiāo'ào", 'orgulloso'],
      ])}
      <h3>¿Cómo se dice «hasta»?</h3>
      <p>Imagina que antes de un examen estabas tan nervioso que hasta olvidaste tu propio nombre. «Hasta» sirve para señalar lo más exagerado de la situación. En chino se hace con ${zh("连", "lián")} y ${zh("也", "yě")} o ${zh("都", "dōu")}. Según el curso de MIT de Wheatley, ${zh("连", "lián")} significa en el fondo «unir» o «conectar», pero junto a ${zh("都", "dōu")} o ${zh("也", "yě")} equivale a «incluso».</p>
      <p>Una frase de ejemplo de la lección: ${zh("他太紧张了，连自己的名字也忘了", "tā tài jǐnzhāng le, lián zìjǐ de míngzi yě wàng le")}, «estaba tan nervioso que hasta olvidó su propio nombre».</p>
      <h3>¿Dónde va cada pieza?</h3>
      <p>Según Oxford, lo enfatizado puede ser el sujeto o el objeto, y va después de ${zh("连", "lián")}. El adverbio ${zh("都", "dōu")} o ${zh("也", "yě")} se coloca antes del verbo principal. Con un sujeto enfatizado, la fuente de MIT da el ejemplo ${zh("连老师也不认识这个字", "lián lǎoshī yě bù rènshi zhège zì")}, «ni siquiera el maestro conoce este carácter». Con un objeto enfatizado, Oxford da ${zh("我连他的名字也忘了", "wǒ lián tā de míngzi yě wàng le")}, «hasta olvidé su nombre».</p>
      <h3>¿${zh("都", "dōu")} o ${zh("也", "yě")}?</h3>
      <p>Oxford marca una diferencia: ${zh("都", "dōu")} sirve en frases afirmativas y negativas, mientras que ${zh("也", "yě")} se usa normalmente antes de una negación o de un verbo de sentido negativo. Además, aunque la frase sea afirmativa, ${zh("也", "yě")} sugiere que lo que pasa es algo indeseable, como olvidar un nombre. Una frase de la lección: ${zh("我连饭都不想吃", "wǒ lián fàn dōu bù xiǎng chī")}, «no quiero ni comer».</p>
      <h3>¿Y para decir «ni una»?</h3>
      <p>MIT muestra otra estrategia para excluir algo del todo: citar una cantidad pequeña y negar incluso eso, con ${zh("一", "yī")} más un clasificador y ${zh("都", "dōu")} o ${zh("也", "yě")}. En su ejemplo, ${zh("他一本也没看过", "tā yī běn yě méi kànguo")} es «no ha leído ni uno». Una frase de la lección: ${zh("他一个字也没说", "tā yī gè zì yě méi shuō")}, «no dijo ni una palabra». Aquí no hace falta ${zh("连", "lián")}.</p>
      <h3>${zh("甚至", "shènzhì")} y ${zh("竟然", "jìngrán")}</h3>
      <p>El glosario de MIT traduce ${zh("甚至", "shènzhì")} como «hasta el punto de» y Dartmouth da ejemplos, uno de ellos con ${zh("连", "lián")}: ${zh("她没有上过学，甚至连自己的名字都不会写", "tā méiyǒu shàngguo xué, shènzhì lián zìjǐ de míngzi dōu bù huì xiě")}, «nunca fue a la escuela, ni siquiera sabe escribir su nombre». ${zh("竟然", "jìngrán")} solo aparece en el sílabo: significa «inesperadamente» y muestra sorpresa. Frase de ejemplo: ${zh("他竟然哭了", "tā jìngrán kū le")}, «inesperadamente se puso a llorar».</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("也", "yě")} o ${zh("都", "dōu")} justo detrás de ${zh("连", "lián")}, antes de lo enfatizado. Primero va lo extremo, y solo después ${zh("也", "yě")} o ${zh("都", "dōu")}, ya pegado al verbo.</p>
      <p>Una nota de pronunciación: ${zh("不", "bù")} suelto se escribe aquí con su tono original (${zh("不认识", "bù rènshi")}), pero al hablar delante de un cuarto tono suena <strong>bú</strong>. Con ${zh("一", "yī")} pasa algo parecido: se escribe con su tono original, pero ${zh("一个", "yī gè")} se dice <strong>yí gè</strong> y ${zh("一本", "yī běn")} se dice <strong>yì běn</strong>.</p>`,
    ejemplo: `
      <p>María está tan emocionada por su viaje que hasta se olvidó de comer. Vamos a decirlo en chino.</p>
      <ol class="pasos-ej">
        <li>Empieza con una frase sencilla: ${zh("她忘了吃饭", "tā wàng le chīfàn")}, «se olvidó de comer».</li>
        <li>Elige lo que quieres destacar como extremo. Aquí es ${zh("饭", "fàn")}, porque olvidar la comida es lo sorprendente.</li>
        <li>Sácalo delante del verbo y ponle ${zh("连", "lián")} delante: ${zh("连饭", "lián fàn")}.</li>
        <li>Pon ${zh("也", "yě")} antes del verbo, porque olvidar es algo que no se desea: ${zh("她连饭也忘了吃", "tā lián fàn yě wàng le chī")}.</li>
        <li>Añade la emoción al inicio: ${zh("她太激动了，连饭也忘了吃", "tā tài jīdòng le, lián fàn yě wàng le chī")}.</li>
      </ol>
      <p>Para comprobar, busca el orden: sujeto, ${zh("连", "lián")} con lo enfatizado, ${zh("也", "yě")} o ${zh("都", "dōu")}, y por último el verbo. Resultado: <span class="resultado">${zh("她太激动了，连饭也忘了吃", "tā tài jīdòng le, lián fàn yě wàng le chī")} = «estaba tan emocionada que hasta se olvidó de comer»</span>.</p>
      <p class="nota"><strong>Error común:</strong> dejar ${zh("饭", "fàn")} detrás del verbo y poner solo ${zh("连", "lián")}. Con ${zh("连", "lián")}, lo destacado sube antes del verbo.</p>`,
    vidaReal: `
      <p>Esta forma de exagerar aparece cuando hablas de emociones:</p>
      <ul>
        <li>Contar que estabas tan nervioso que hasta olvidaste tu propio nombre.</li>
        <li>Decir que algo te sorprendió tanto que ni siquiera pudiste hablar.</li>
        <li>Explicar que un día ocupado fue tan intenso que hasta se te olvidó comer.</li>
        <li>Contar que alguien no hizo ni una cosa, con la idea de «ni una sola».</li>
        <li>Hablar de cómo te sentías ese día, con palabras como nervioso, orgulloso o decepcionado.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «hasta olvidé su nombre».</p>',
        respuesta: ['我', '连', '他的', '名字', '也', '忘了'], pinyin: ['wǒ', 'lián', 'tā de', 'míngzi', 'yě', 'wàng le'], lang: 'zh-Hans',
        alternativas: [['连', '他的', '名字', '我', '也', '忘了']],
        pista: '<p>Lo extremo va justo después de ' + zh("连", "lián") + ' y ' + zh("也", "yě") + ' queda pegado al verbo.</p>',
        solucion: `<p>${zh("我连他的名字也忘了", "wǒ lián tā de míngzi yě wàng le")}: sujeto, ${zh("连", "lián")} con lo enfatizado, ${zh("也", "yě")} y el verbo. También vale poner el sujeto después del nombre, porque lo enfatizado puede ir primero.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «ni siquiera el maestro conoce este carácter». ¿Qué frase está bien armada?</p>',
        opciones: [zh('也连老师不认识这个字', 'yě lián lǎoshī bù rènshi zhège zì'), zh('老师不认识连这个字也', 'lǎoshī bù rènshi lián zhège zì yě'), zh('连也老师不认识这个字', 'lián yě lǎoshī bù rènshi zhège zì'), zh('连老师也不认识这个字', 'lián lǎoshī yě bù rènshi zhège zì')], correcta: 3,
        pista: '<p>Lo extremo va justo detrás de ' + zh("连", "lián") + ', y ' + zh("也", "yě") + ' va antes del verbo.</p>',
        solucion: `<p>${zh("连老师也不认识这个字", "lián lǎoshī yě bù rènshi zhège zì")}: ${zh("连", "lián")}, el maestro, ${zh("也", "yě")} y el verbo negado.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("他一个字也没说", "tā yī gè zì yě méi shuō")}?</p>`,
        opciones: ['No dijo ni una palabra', 'Dijo una sola palabra', 'Dijo muchas palabras', 'Dijo otra vez la misma palabra'], correcta: 0,
        pista: '<p>Con ' + zh("一", "yī") + ' más clasificador y una negación, la frase excluye hasta lo más pequeño.</p>',
        solucion: `<p>Citar una cantidad mínima y negarla da «ni una»: ${zh("他一个字也没说", "tā yī gè zì yě méi shuō")} es «no dijo ni una palabra».</p>` },
      { tipo: 'opciones', escucha: { voz: '她连饭都不想吃' },
        sinAudio: '<p>Se dice <strong>tā lián fàn dōu bù xiǎng chī</strong>: tā es alto y plano; lián sube; fàn baja; dōu es alto y plano; bù baja; xiǎng baja y sube; chī es alto y plano.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice la persona?</p>',
        opciones: ['Que quiere comer mucho', 'Que ya terminó de comer', 'Que ni siquiera quiere comer', 'Que comió con una amiga'], correcta: 2,
        pista: '<p>Fíjate en la estructura de «hasta» y en ' + zh("不", "bù") + '.</p>',
        solucion: `<p>Se oye ${zh("她连饭都不想吃", "tā lián fàn dōu bù xiǎng chī")}: «ni siquiera quiere comer».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("紧张")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['jǐn zhāng'],
        pista: '<p>La primera sílaba baja y sube; la segunda es alta y plana.</p>',
        solucion: `<p>${zh("紧张", "jǐnzhāng")}: <strong>jǐn zhāng</strong>.</p>` },
      { tipo: 'opciones', enunciado: `<p>Su equipo perdió el partido y ella dice ${zh("我很失望", "wǒ hěn shīwàng")}. ¿Cómo se siente?</p>`,
        opciones: ['Orgullosa', 'Decepcionada', 'Tímida', 'Conmovida'], correcta: 1,
        pista: '<p>La tabla de la lección traduce ' + zh("失望", "shīwàng") + '.</p>',
        solucion: `<p>${zh("失望", "shīwàng")} es «decepcionado»: ${zh("我很失望", "wǒ hěn shīwàng")} es «estoy muy decepcionada».</p>` },
    ],
    fuentes: [SILABO, OXFORD, MIT, DART_13],
  });

  L('No es…sino: 不是…而是…', {
    objetivo: `Corregir una idea equivocada con ${zh("不是", "bù shì")}…${zh("而是", "ér shì")}…, distinguirla de ${zh("不是", "bù shì")}…${zh("就是", "jiù shì")}… («o… o…») y hablar de opiniones y malentendidos.`,
    explicacion: `
      <p>Alguien llega tarde y el maestro piensa que no le importa la clase. Pero la verdad es otra: perdió el autobús. Para corregir una idea así, en español dices «no es que…, sino que…». El chino lo hace con ${zh("不是", "bù shì")} y ${zh("而是", "ér shì")}.</p>
      ${tabla([
        ['而', 'ér', 'y, en cambio (une dos partes y marca contraste)'], ['误会', 'wùhuì', 'malentendido; entender mal'], ['解释', 'jiěshì', 'explicar'], ['原因', 'yuányīn', 'causa, razón'], ['看法', 'kànfǎ', 'opinión, punto de vista'],
        ['想法', 'xiǎngfǎ', 'idea, lo que se piensa'], ['意见', 'yìjiàn', 'opinión, sugerencia'], ['判断', 'pànduàn', 'juzgar, decidir'], ['正确', 'zhèngquè', 'correcto'], ['错误', 'cuòwù', 'equivocado; error'],
        ['区别', 'qūbié', 'diferencia; distinguir'], ['相反', 'xiāngfǎn', 'contrario, opuesto'], ['怀疑', 'huáiyí', 'dudar, sospechar'], ['理解', 'lǐjiě', 'comprender'], ['说法', 'shuōfǎ', 'forma de decir; versión'],
      ])}
      <h3>¿Cómo se corrige una idea?</h3>
      <p>Según Chinese Grammar Wiki, una fuente de apoyo que no es universitaria, ${zh("而", "ér")} une dos oraciones relacionadas y marca el contraste entre las dos partes. Se traduce como «sino» o «más bien». El patrón completo es ${zh("不是", "bù shì")} A, ${zh("而是", "ér shì")} B: primero niegas la idea equivocada y luego pones la correcta. Una frase de ejemplo de la lección: ${zh("他不是老师，而是学生", "tā bù shì lǎoshī, ér shì xuéshēng")}, «no es maestro, sino estudiante».</p>
      <p>La misma fuente señala que el patrón también aparece al revés, ${zh("是", "shì")} A, ${zh("而不是", "ér bù shì")} B, donde primero va lo cierto. Una frase de la lección: ${zh("我要的是水，而不是茶", "wǒ yào de shì shuǐ, ér bù shì chá")}, «lo que quiero es agua, no té». Además, ${zh("而", "ér")} no es obligatorio, pero deja clarísimo el contraste. Suena algo formal, pero también se oye en el habla diaria.</p>
      <h3>«No es que…, sino que…»</h3>
      <p>Lo más útil de este patrón es corregir una razón equivocada. Dartmouth da el ejemplo «no es que no quiera volver a casa, sino que no se atreve», y Chinese Grammar Wiki da otro parecido con «no es que no quiera ayudarte, sino que no puedo». Frase de ejemplo de la lección: ${zh("我不是不想帮你，而是没有时间", "wǒ bù shì bù xiǎng bāng nǐ, ér shì méiyǒu shíjiān")}, «no es que no quiera ayudarte, sino que no tengo tiempo». Tras ${zh("不是", "bù shì")} va la razón que niegas, y tras ${zh("而是", "ér shì")}, la verdadera. Con sujetos distintos: ${zh("忘了作业的不是他，而是我", "wàng le zuòyè de bù shì tā, ér shì wǒ")}, «quien olvidó la tarea no es él, sino yo».</p>
      <h3>Una pareja parecida: ${zh("不是", "bù shì")}…${zh("就是", "jiù shì")}…</h3>
      <p>Las dos parejas empiezan con ${zh("不是", "bù shì")}, pero dicen cosas distintas. Según Chinese Grammar Wiki, ${zh("不是", "bù shì")} A ${zh("就是", "jiù shì")} B describe una situación con solo dos posibilidades; literalmente es «si no es A, es B», y A y B pueden ser verbos, adjetivos o sustantivos. Frases de la lección: con verbos, ${zh("他不是在看书，就是在睡觉", "tā bù shì zài kàn shū, jiù shì zài shuìjiào")}, «o está leyendo o está durmiendo»; con adjetivos, ${zh("这件衣服不是太大，就是太小", "zhè jiàn yīfu bù shì tài dà, jiù shì tài xiǎo")}, «esta ropa es o demasiado grande o demasiado pequeña»; con sustantivos, ${zh("不是你，就是他", "bù shì nǐ, jiù shì tā")}, «o tú o él».</p>
      ${cuadro(['Patrón', 'Qué hace', 'Frase de la lección'], [
        [`${zh("不是", "bù shì")} A, ${zh("而是", "ér shì")} B`, 'Niega A y pone B en su lugar (corrige).', zh('他不是老师，而是学生', 'tā bù shì lǎoshī, ér shì xuéshēng')],
        [`${zh("不是", "bù shì")} A, ${zh("就是", "jiù shì")} B`, 'Una de solo dos posibilidades: A o B.', zh('不是你，就是他', 'bù shì nǐ, jiù shì tā')],
      ])}
      <p>Esa diferencia, «corrige» frente a «una de dos», es una simplificación de la lección: ninguna fuente compara las dos parejas.</p>
      <p class="nota"><strong>Trampa común:</strong> cambiar ${zh("而是", "ér shì")} por ${zh("就是", "jiù shì")}. La primera niega algo para dejar la verdad; la segunda ofrece dos opciones sin negar ninguna. Y recuerda que ${zh("不", "bù")} suelto va aquí con su tono original; al hablar, delante de ${zh("是", "shì")} suena <strong>bú</strong>.</p>`,
    ejemplo: `
      <p>El maestro cree que Ana no hizo la tarea porque no quiere estudiar. Ana quiere aclararlo.</p>
      <ol class="pasos-ej">
        <li>Piensa en la idea equivocada: «no quería hacer la tarea». Es el ${zh("误会", "wùhuì")}.</li>
        <li>Niégala con ${zh("不是", "bù shì")}: ${zh("我不是不想做作业", "wǒ bù shì bù xiǎng zuò zuòyè")}, «no es que no quisiera hacer la tarea».</li>
        <li>Pon la razón verdadera después de ${zh("而是", "ér shì")}: ${zh("而是生病了", "ér shì shēngbìng le")}, «sino que me enfermé».</li>
        <li>Une las dos partes: ${zh("我不是不想做作业，而是生病了", "wǒ bù shì bù xiǎng zuò zuòyè, ér shì shēngbìng le")}.</li>
      </ol>
      <p>Para comprobar, lee la frase en español con «no es que…, sino que…»; si queda natural, el patrón está bien. Resultado: <span class="resultado">${zh("我不是不想做作业，而是生病了", "wǒ bù shì bù xiǎng zuò zuòyè, ér shì shēngbìng le")} = «no es que no quisiera hacer la tarea, sino que me enfermé»</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar ${zh("不是", "bù shì")}…${zh("就是", "jiù shì")}… aquí. Eso diría «o no quería o me enfermé», y Ana no está dando dos opciones.</p>`,
    vidaReal: `
      <p>Este patrón te sirve para aclarar lo que otros piensan de ti:</p>
      <ul>
        <li>Explicar que llegaste tarde por una razón real y no por falta de interés.</li>
        <li>Decir que lo que quieres es una cosa y no la otra, sin que nadie se confunda.</li>
        <li>Corregir a un amigo que entendió mal un mensaje.</li>
        <li>Describir un hábito de dos posibilidades, como alguien que siempre está leyendo o durmiendo.</li>
        <li>Decir cuál es tu opinión y cuál no es.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «no es maestro, sino estudiante».</p>',
        respuesta: ['他', '不是', '老师', '而是', '学生'], pinyin: ['tā', 'bù shì', 'lǎoshī', 'ér shì', 'xuéshēng'], lang: 'zh-Hans',
        pista: '<p>Primero niegas con ' + zh("不是", "bù shì") + ' y luego pones lo cierto con ' + zh("而是", "ér shì") + '.</p>',
        solucion: `<p>${zh("他不是老师，而是学生", "tā bù shì lǎoshī, ér shì xuéshēng")}: se niega A y se pone B.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «no es que no quiera ayudarte, sino que no tengo tiempo». ¿Qué frase usas?</p>',
        opciones: [zh('我不是不想帮你，而是没有时间', 'wǒ bù shì bù xiǎng bāng nǐ, ér shì méiyǒu shíjiān'), zh('我不是不想帮你，就是没有时间', 'wǒ bù shì bù xiǎng bāng nǐ, jiù shì méiyǒu shíjiān'), zh('我不是帮你，也是没有时间', 'wǒ bù shì bāng nǐ, yě shì méiyǒu shíjiān'), zh('我是不想帮你，而不是没有时间', 'wǒ shì bù xiǎng bāng nǐ, ér bù shì méiyǒu shíjiān')], correcta: 0,
        pista: '<p>Estás corrigiendo una razón, no ofreciendo dos opciones.</p>',
        solucion: `<p>${zh("而是", "ér shì")} niega la razón equivocada y pone la verdadera. Con ${zh("就是", "jiù shì")} la frase ofrecería dos opciones.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("他不是在看书，就是在睡觉", "tā bù shì zài kàn shū, jiù shì zài shuìjiào")}?</p>`,
        opciones: ['No está leyendo, sino durmiendo', 'Está leyendo y durmiendo a la vez', 'Está leyendo o está durmiendo', 'No sabe si leer o dormir'], correcta: 2,
        pista: '<p>' + zh("就是", "jiù shì") + ' ofrece dos posibilidades.</p>',
        solucion: `<p>${zh("不是", "bù shì")} A, ${zh("就是", "jiù shì")} B es «o A o B»: o está leyendo o está durmiendo.</p>` },
      { tipo: 'opciones', escucha: { voz: '不是我，而是你' },
        sinAudio: '<p>Se dice <strong>bù shì wǒ, ér shì nǐ</strong>: bù baja; shì baja; wǒ baja y sube; ér sube; shì baja; nǐ baja y sube.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué quiere decir?</p>',
        opciones: ['O yo o tú, no importa', 'No soy yo, eres tú', 'Tú y yo juntos', 'Ni tú ni yo'], correcta: 1,
        pista: '<p>La segunda parte empieza con ' + zh("而是", "ér shì") + '.</p>',
        solucion: `<p>Se oye ${zh("不是我，而是你", "bù shì wǒ, ér shì nǐ")}: se niega «yo» y se pone «tú» en su lugar.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("误会")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['wù huì'],
        pista: '<p>Las dos sílabas bajan de golpe.</p>',
        solucion: `<p>${zh("误会", "wùhuì")}: <strong>wù huì</strong>.</p>` },
      { tipo: 'opciones', enunciado: `<p>Dos amigos piensan lo contrario: ${zh("我们的看法相反", "wǒmen de kànfǎ xiāngfǎn")}. ¿Qué pasa?</p>`,
        opciones: ['Sus opiniones son opuestas', 'Sus opiniones son iguales', 'Los dos tienen miedo', 'Los dos se equivocaron'], correcta: 0,
        pista: '<p>La tabla de la lección traduce ' + zh("看法", "kànfǎ") + ' y ' + zh("相反", "xiāngfǎn") + '.</p>',
        solucion: `<p>${zh("看法", "kànfǎ")} es «opinión» y ${zh("相反", "xiāngfǎn")} es «opuesto»: las opiniones son opuestas.</p>` },
    ],
    fuentes: [SILABO, ALLSET_ER, ALLSET_JIU, DART_18],
  });

  L('Además: 不仅…还…', {
    objetivo: `Sumar una idea a otra con ${zh("不仅", "bùjǐn")}…${zh("还", "hái")}/${zh("而且", "érqiě")}/${zh("也", "yě")}…, saber dónde poner ${zh("不仅", "bùjǐn")} según los sujetos y hablar de tu ciudad y tu barrio.`,
    explicacion: `
      <p>Piensa en cómo cuentas tu barrio: «es tranquilo, y además está limpio». Esa idea de «y no solo eso» se dice en chino con ${zh("不仅", "bùjǐn")}. La lección usa el vocabulario de la ciudad, el tráfico y el barrio, y la estructura te suena porque en "No solo…sino también: ${zh("不但…而且…")}" ya viste una casi igual.</p>
      ${tabla([
        ['不仅', 'bùjǐn', 'no solo'], ['不光', 'bùguāng', 'no solo (igual que la palabra anterior)'], ['并且', 'bìngqiě', 'y además'], ['此外', 'cǐwài', 'además, aparte de esto'], ['交通', 'jiāotōng', 'tráfico, transporte'],
        ['堵车', 'dǔchē', 'haber un atasco'], ['污染', 'wūrǎn', 'contaminar; contaminación'], ['公共', 'gōnggòng', 'público, de todos'], ['社会', 'shèhuì', 'sociedad'], ['郊区', 'jiāoqū', 'afueras de la ciudad'],
        ['热闹', 'rènao', 'animado, lleno de vida'], ['街道', 'jiēdào', 'calle, calles de un barrio'], ['停车场', 'tíngchēchǎng', 'estacionamiento'], ['垃圾', 'lājī', 'basura'], ['卫生', 'wèishēng', 'higiene; limpio'],
      ])}
      <h3>¿Cómo se dice «no solo… sino también…»?</h3>
      <p>Según Dartmouth, ${zh("不仅", "bùjǐn")} es una conjunción que va en la primera de dos cláusulas paralelas. En la segunda suele aparecer ${zh("并且", "bìngqiě")}, ${zh("而且", "érqiě")}, ${zh("也", "yě")} o ${zh("还", "hái")}, con el sentido de «además». ChinGram explica, a propósito de ${zh("不但", "búdàn")}…${zh("而且", "érqiě")}…, que este tipo de frase no solo enumera dos hechos, sino que expresa un grado mayor: lo segundo pesa más. Una frase de ejemplo de la lección: ${zh("这个郊区不仅很安静，而且很干净", "zhège jiāoqū bùjǐn hěn ānjìng, érqiě hěn gānjìng")}, «este barrio de las afueras no solo es muy tranquilo, sino también muy limpio».</p>
      <h3>¿Dónde va ${zh("不仅", "bùjǐn")}?</h3>
      <p>Aquí hay una regla que depende de los sujetos. Dartmouth la resume así: si las dos cláusulas tienen el mismo sujeto, ${zh("不仅", "bùjǐn")} suele ir después del sujeto; si no, suele ir antes del sujeto. ChinGram da lo mismo para ${zh("不但", "búdàn")}, y Oxford, para ${zh("不但", "búdàn")}, añade que va antes del sujeto si lo que se destaca es el sujeto, y antes del verbo si se destaca la acción.</p>
      <p>Con un solo sujeto: ${zh("他不仅会说汉语，还会做饭", "tā bùjǐn huì shuō Hànyǔ, hái huì zuòfàn")}, «no solo habla chino, además sabe cocinar». El sujeto ${zh("他", "tā")} va primero y ${zh("不仅", "bùjǐn")} le sigue. Con dos sujetos: ${zh("不仅我喜欢这条路，我的朋友也喜欢", "bùjǐn wǒ xǐhuan zhè tiáo lù, wǒ de péngyou yě xǐhuan")}, «no solo a mí me gusta esta calle, a mi amigo también». Ahora ${zh("不仅", "bùjǐn")} abre la frase, antes de ${zh("我", "wǒ")}.</p>
      <h3>¿${zh("还", "hái")} o ${zh("也", "yě")}?</h3>
      <p>Kapiolani, una universidad de EE. UU., ofrece una pista útil: con ${zh("还", "hái")}, un mismo sujeto hace dos cosas distintas; con ${zh("也", "yě")}, dos sujetos hacen una misma cosa. En la frase de la cocina, ${zh("他", "tā")} hace dos cosas (hablar y cocinar), por eso va ${zh("还", "hái")}. En la de la calle, dos personas comparten el gusto, por eso va ${zh("也", "yě")}.</p>
      <h3>${zh("不光", "bùguāng")}, ${zh("并且", "bìngqiě")} y ${zh("此外", "cǐwài")}</h3>
      <p>${zh("不光", "bùguāng")} solo aparece en el sílabo, sin reglas de universidad. Es una simplificación de la lección: se usa como ${zh("不仅", "bùjǐn")}, en el mismo patrón. ${zh("并且", "bìngqiě")}, según Dartmouth, es una de las palabras posibles de la segunda parte. ${zh("此外", "cǐwài")} es una conjunción del sílabo y también tiene solo esa fuente. Una frase de ejemplo de la lección: ${zh("这个郊区很安静，此外还很干净", "zhège jiāoqū hěn ānjìng, cǐwài hái hěn gānjìng")}, «este barrio es tranquilo; además, es muy limpio».</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("不仅", "bùjǐn")} después del segundo sujeto cuando los sujetos son distintos. Con sujetos distintos, ${zh("不仅", "bùjǐn")} va al principio.</p>`,
    ejemplo: `
      <p>Quieres contarle a un amigo cómo es tu calle. Vamos a armar la frase.</p>
      <ol class="pasos-ej">
        <li>Piensa en dos cosas buenas: la calle es ${zh("热闹", "rènao")} y es ${zh("干净", "gānjìng")}.</li>
        <li>El sujeto es el mismo, ${zh("这条街道", "zhè tiáo jiēdào")}, así que ${zh("不仅", "bùjǐn")} va después de él.</li>
        <li>Escribe la primera parte: ${zh("这条街道不仅很热闹", "zhè tiáo jiēdào bùjǐn hěn rènao")}.</li>
        <li>Elige la palabra de la segunda parte. Como es el mismo sujeto con una cosa más, sirve ${zh("而且", "érqiě")} o ${zh("还", "hái")}: ${zh("而且很干净", "érqiě hěn gānjìng")}.</li>
      </ol>
      <p>Para comprobar, pregúntate si las dos partes tienen el mismo sujeto. Si es así, ${zh("不仅", "bùjǐn")} va detrás de él. Resultado: <span class="resultado">${zh("这条街道不仅很热闹，而且很干净", "zhè tiáo jiēdào bùjǐn hěn rènao, érqiě hěn gānjìng")} = «esta calle no solo es animada, también es limpia»</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir solo ${zh("不仅", "bùjǐn")} y no poner nada en la segunda parte. Casi siempre hace falta ${zh("而且", "érqiě")}, ${zh("还", "hái")} o ${zh("也", "yě")}.</p>`,
    vidaReal: `
      <p>Esta forma de sumar ideas aparece cuando describes lugares:</p>
      <ul>
        <li>Explicar por qué te gusta tu barrio, con más de una razón.</li>
        <li>Contar que en tu ciudad el tráfico es pesado y, además, hay contaminación.</li>
        <li>Comparar dos zonas: el centro animado y las afueras tranquilas.</li>
        <li>Hablar de la limpieza de las calles y de la basura.</li>
        <li>Comentar que algo bueno les gusta a ti y también a tus amigos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «no solo habla chino, además sabe cocinar».</p>',
        respuesta: ['他', '不仅', '会说汉语', '还', '会做饭'], pinyin: ['tā', 'bùjǐn', 'huì shuō Hànyǔ', 'hái', 'huì zuòfàn'], lang: 'zh-Hans',
        alternativas: [['不仅', '他', '会说汉语', '还', '会做饭']],
        pista: '<p>Es un solo sujeto: ' + zh("不仅", "bùjǐn") + ' va justo después de él.</p>',
        solucion: `<p>${zh("他不仅会说汉语，还会做饭", "tā bùjǐn huì shuō Hànyǔ, hái huì zuòfàn")}: sujeto, ${zh("不仅", "bùjǐn")}, primera cosa, ${zh("还", "hái")} y segunda cosa.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «no solo a mí me gusta esta calle, a mi amigo también». ¿Qué frase está bien armada?</p>',
        opciones: [zh('我不仅喜欢这条路，我的朋友也喜欢', 'wǒ bùjǐn xǐhuan zhè tiáo lù, wǒ de péngyou yě xǐhuan'), zh('我喜欢这条路不仅，我的朋友也喜欢', 'wǒ xǐhuan zhè tiáo lù bùjǐn, wǒ de péngyou yě xǐhuan'), zh('我喜欢这条路，也不仅我的朋友喜欢', 'wǒ xǐhuan zhè tiáo lù, yě bùjǐn wǒ de péngyou xǐhuan'), zh('不仅我喜欢这条路，我的朋友也喜欢', 'bùjǐn wǒ xǐhuan zhè tiáo lù, wǒ de péngyou yě xǐhuan')], correcta: 3,
        pista: '<p>Los sujetos son distintos: «yo» y «mi amigo».</p>',
        solucion: `<p>Con sujetos distintos, ${zh("不仅", "bùjǐn")} va antes del primer sujeto: ${zh("不仅我喜欢这条路，我的朋友也喜欢", "bùjǐn wǒ xǐhuan zhè tiáo lù, wǒ de péngyou yě xǐhuan")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Completa la frase ${zh("他不仅会说汉语，___会做饭", "tā bùjǐn huì shuō Hànyǔ, ___ huì zuòfàn")}. ¿Qué palabra encaja?</p>`,
        opciones: [zh('但是', 'dànshì'), zh('因为', 'yīnwèi'), zh('还', 'hái'), zh('所以', 'suǒyǐ')], correcta: 2,
        pista: '<p>La segunda parte añade algo, no lo contradice ni da una razón.</p>',
        solucion: `<p>${zh("还", "hái")} añade una segunda cosa del mismo sujeto. ${zh("但是", "dànshì")} contradice, ${zh("因为", "yīnwèi")} y ${zh("所以", "suǒyǐ")} dan causa y consecuencia.</p>` },
      { tipo: 'opciones', escucha: { voz: '不光我喜欢，他也喜欢' },
        sinAudio: '<p>Se dice <strong>bùguāng wǒ xǐhuan, tā yě xǐhuan</strong>: bù baja; guāng es alto y plano; wǒ baja y sube; xǐ baja y sube y huan es ligera; tā es alto y plano; yě baja y sube; xǐhuan como antes.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice la persona?</p>',
        opciones: ['A mí me gusta y a él también', 'A mí me gusta pero a él no', 'A él le gusta pero a mí no', 'A nadie le gusta'], correcta: 0,
        pista: '<p>' + zh("不光", "bùguāng") + ' se usa como ' + zh("不仅", "bùjǐn") + ', y ' + zh("也", "yě") + ' une a dos personas.</p>',
        solucion: `<p>Se oye ${zh("不光我喜欢，他也喜欢", "bùguāng wǒ xǐhuan, tā yě xǐhuan")}: «no solo a mí me gusta, a él también».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("堵车")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['dǔ chē'],
        pista: '<p>La primera sílaba baja y sube; la segunda es alta y plana.</p>',
        solucion: `<p>${zh("堵车", "dǔchē")}: <strong>dǔ chē</strong>.</p>` },
      { tipo: 'opciones', enunciado: `<p>Alguien dice ${zh("这条街道很热闹", "zhè tiáo jiēdào hěn rènao")}. ¿Cómo es la calle?</p>`,
        opciones: ['Vacía y silenciosa', 'Animada y con mucha vida', 'Muy sucia', 'Cerrada por obras'], correcta: 1,
        pista: '<p>La tabla de la lección traduce ' + zh("热闹", "rènao") + '.</p>',
        solucion: `<p>${zh("热闹", "rènao")} es «animado, lleno de vida»: ${zh("这条街道很热闹", "zhè tiáo jiēdào hěn rènao")} es «esta calle está muy animada».</p>` },
    ],
    fuentes: [SILABO, DART_24, DART_28, CHINGRAM_BUDAN, OXFORD, KAPIOLANI],
  });

  L('A pesar de: 尽管…但是…', {
    objetivo: `Contar algo que pasó a pesar de una dificultad con ${zh("尽管", "jǐnguǎn")}…${zh("但是", "dànshì")}…, usar ${zh("然而", RANER)} en la segunda parte y hablar de estudios y exámenes.`,
    explicacion: `
      <p>Hay estudiantes que están muy cansados y aun así van a clase. En español dices «a pesar de que estaba cansado, fue». El chino tiene ${zh("尽管", "jǐnguǎn")} para esa idea, y la segunda parte suele llevar una palabra de contraste. Esta lección usa el vocabulario de estudios y exámenes. Si ya viste "Aunque: ${zh("虽然…但是…")}", muchas cosas te van a sonar conocidas.</p>
      ${tabla([
        ['尽管', 'jǐnguǎn', 'a pesar de que, aunque (un hecho real)'], ['然而', RANER, 'sin embargo (más escrito)'], ['毕业', 'bìyè', 'graduarse'], ['高考', 'gāokǎo', 'examen nacional de ingreso a la universidad (China)'], ['考生', 'kǎoshēng', 'persona que presenta un examen'],
        ['成功', 'chénggōng', 'tener éxito; exitoso'], ['失败', 'shībài', 'fracasar; fracaso'], ['压力', 'yālì', 'presión, estrés'], ['困难', 'kùnnan', 'difícil; dificultad'], ['放弃', 'fàngqì', 'rendirse, abandonar'],
        ['继续', 'jìxù', 'continuar'], ['获得', 'huòdé', 'obtener, recibir'], ['奖学金', 'jiǎngxuéjīn', 'beca'], ['申请', 'shēnqǐng', 'solicitar, pedir con un trámite'], ['专业', 'zhuānyè', 'carrera, especialidad'],
      ])}
      <h3>¿Cómo se dice «a pesar de que»?</h3>
      <p>Según Dartmouth, ${zh("尽管", "jǐnguǎn")} es una conjunción de concesión, parecida a ${zh("虽然", "suīrán")} en significado, y va en la primera cláusula. Concesión quiere decir que aceptas un hecho difícil y, aun así, algo pasa. La segunda cláusula suele llevar ${zh("但是", "dànshì")} o ${zh("然而", RANER)}. Una frase de ejemplo de la lección: ${zh("尽管压力很大，但是她没有放弃", "jǐnguǎn yālì hěn dà, dànshì tā méiyǒu fàngqì")}, «a pesar de que la presión es grande, ella no se rindió».</p>
      <p>Dartmouth da ejemplos del mismo estilo con estas piezas: ${zh("尽管", "jǐnguǎn")} en la primera parte y, en la segunda, ${zh("但是", "dànshì")} o ${zh("还是", "háishi")} («todavía, aun así»). Otra frase de la lección: ${zh("尽管很累，他还是去上课了", "jǐnguǎn hěn lèi, tā háishi qù shàngkè le")}, «a pesar de estar cansado, aun así fue a clase».</p>
      <h3>¿Y si ${zh("尽管", "jǐnguǎn")} va al final?</h3>
      <p>Dartmouth añade que ${zh("尽管", "jǐnguǎn")} también puede aparecer en la segunda cláusula, y que esto se ve en textos escritos. Es como cuando en español dices «fue, a pesar de que hacía frío». Una frase de la lección: ${zh("他还是去了，尽管天气很冷", "tā háishi qù le, jǐnguǎn tiānqì hěn lěng")}.</p>
      <h3>${zh("然而", RANER)}: el contraste más escrito</h3>
      <p>Según Dartmouth, ${zh("然而", RANER)} es una conjunción que une frases u oraciones y abre la parte principal, de sentido opuesto a la anterior. Se parece a ${zh("但是", "dànshì")} en significado y uso, pero se ve más en textos escritos. Va al inicio de la segunda parte, después de la coma. Una frase de la lección, adaptada de un ejemplo de Dartmouth: ${zh("他不聪明，然而他很努力", "tā bù cōngmíng, rán'ér tā hěn nǔlì")}, «no es listo, sin embargo se esfuerza mucho».</p>
      <h3>¿Qué hecho cuenta ${zh("尽管", "jǐnguǎn")}?</h3>
      <p>La Universidad de Yale explica que ${zh("尽管", "jǐnguǎn")} expresa contraste y se refiere a un hecho real, algo que ya ocurrió, a diferencia de ${zh("即使", "jíshǐ")}, que supone algo hipotético y verás en "Aunque pasara: ${zh("即使…也…")}". Por eso lo usas cuando hablas de lo que de verdad pasó: el examen ya fue difícil, la presión ya existía.</p>
      ${cuadro(['Palabra', 'Dónde va', 'Qué dicen las fuentes'], [
        [zh('虽然', 'suīrán'), 'Primera parte', 'Concesión; la lección «Aunque» ya la explica.'],
        [zh('尽管', 'jǐnguǎn'), 'Primera parte (a veces la segunda)', `Parecida a ${zh("虽然")} en significado; hecho real; también se ve en textos escritos.`],
        [zh('但是', 'dànshì'), 'Inicio de la segunda parte', 'Palabra de contraste habitual.'],
        [zh('然而', RANER), 'Inicio de la segunda parte', `Parecida a ${zh("但是")}, pero más de texto escrito.`],
      ])}
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("尽管", "jǐnguǎn")} con algo que solo imaginas. Si es una suposición, necesitas otra palabra (la verás más adelante). ${zh("尽管", "jǐnguǎn")} es para hechos reales.</p>`,
    ejemplo: `
      <p>Un estudiante tuvo un examen muy difícil, pero no se rindió. Cuéntalo con ${zh("尽管", "jǐnguǎn")}.</p>
      <ol class="pasos-ej">
        <li>Piensa en el hecho real y difícil: ${zh("考试很难", "kǎoshì hěn nán")}. Ya pasó, así que ${zh("尽管", "jǐnguǎn")} sirve.</li>
        <li>Ponle ${zh("尽管", "jǐnguǎn")} al inicio: ${zh("尽管考试很难", "jǐnguǎn kǎoshì hěn nán")}.</li>
        <li>Piensa en lo que pasó a pesar de eso: ${zh("他没有放弃", "tā méiyǒu fàngqì")}, «no se rindió».</li>
        <li>Une las partes con ${zh("但是", "dànshì")} al inicio de la segunda: ${zh("但是他没有放弃", "dànshì tā méiyǒu fàngqì")}.</li>
        <li>Si lo quieres más escrito, cambia ${zh("但是", "dànshì")} por ${zh("然而", RANER)}.</li>
      </ol>
      <p>Para comprobar, lee la frase en español con «a pesar de que…, no se rindió»; debe sonar natural. Resultado: <span class="resultado">${zh("尽管考试很难，但是他没有放弃", "jǐnguǎn kǎoshì hěn nán, dànshì tā méiyǒu fàngqì")} = «a pesar de que el examen es difícil, él no se rindió»</span>.</p>
      <p class="nota"><strong>Error común:</strong> añadir ${zh("所以", "suǒyǐ")} en la segunda parte. Aquí hay contraste, no causa y consecuencia.</p>`,
    vidaReal: `
      <p>Con esta estructura puedes hablar de esfuerzo y de metas:</p>
      <ul>
        <li>Contar que un amigo siguió estudiando a pesar de una mala nota.</li>
        <li>Hablar de alguien que se esforzó mucho en una prueba muy difícil.</li>
        <li>Explicar que fuiste a clase a pesar del cansancio o del clima.</li>
        <li>Platicar de una beca y de lo que cuesta conseguirla.</li>
        <li>Leer textos escritos que unen una dificultad con lo que pasó después.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «a pesar de que la presión es grande, ella no se rindió».</p>',
        respuesta: ['尽管', '压力', '很大', '但是', '她', '没有', '放弃'], pinyin: ['jǐnguǎn', 'yālì', 'hěn dà', 'dànshì', 'tā', 'méiyǒu', 'fàngqì'], lang: 'zh-Hans',
        pista: '<p>' + zh("尽管", "jǐnguǎn") + ' abre la primera parte y ' + zh("但是", "dànshì") + ' abre la segunda.</p>',
        solucion: `<p>${zh("尽管压力很大，但是她没有放弃", "jǐnguǎn yālì hěn dà, dànshì tā méiyǒu fàngqì")}: primero el hecho difícil y luego lo que pasó a pesar de él.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «a pesar de estar cansado, aun así fue a clase». ¿Qué frase usas?</p>',
        opciones: [zh('尽管很累，他还是去上课了', 'jǐnguǎn hěn lèi, tā háishi qù shàngkè le'), zh('尽管很累，所以他去上课了', 'jǐnguǎn hěn lèi, suǒyǐ tā qù shàngkè le'), zh('因为很累，但是他去上课了', 'yīnwèi hěn lèi, dànshì tā qù shàngkè le'), zh('很累尽管，他去上课还是了', 'hěn lèi jǐnguǎn, tā qù shàngkè háishi le')], correcta: 0,
        pista: '<p>Hay contraste: no puedes usar palabras de causa.</p>',
        solucion: `<p>${zh("尽管很累，他还是去上课了", "jǐnguǎn hěn lèi, tā háishi qù shàngkè le")}: ${zh("尽管", "jǐnguǎn")} al inicio y ${zh("还是", "háishi")} para marcar el contraste. ${zh("所以", "suǒyǐ")} y ${zh("因为", "yīnwèi")} hablan de causa.</p>` },
      { tipo: 'opciones', enunciado: '<p>Según Dartmouth, ¿qué palabra de la segunda parte se ve más en los textos escritos?</p>',
        opciones: [zh('但是', 'dànshì'), zh('然而', RANER), zh('所以', 'suǒyǐ'), zh('因为', 'yīnwèi')], correcta: 1,
        pista: '<p>Dos de las palabras no expresan contraste.</p>',
        solucion: `<p>${zh("然而", RANER)} se parece a ${zh("但是", "dànshì")} en significado y uso, pero se ve más en textos escritos.</p>` },
      { tipo: 'opciones', escucha: { voz: '尽管天气很冷，他还是来了' },
        sinAudio: '<p>Se dice <strong>jǐnguǎn tiānqì hěn lěng, tā háishi lái le</strong>: jǐn baja y sube; guǎn baja y sube; tiān es alto y plano; qì baja; hěn baja y sube; lěng baja y sube; tā es alto y plano; hái sube; shi es ligera; lái sube.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué cuenta la persona?</p>',
        opciones: ['Que hacía calor y no vino', 'Que hacía frío y aun así vino', 'Que hacía frío y por eso no vino', 'Que vino porque hacía calor'], correcta: 1,
        pista: '<p>La frase empieza con ' + zh("尽管", "jǐnguǎn") + ': algo difícil, pero igual pasó.</p>',
        solucion: `<p>Se oye ${zh("尽管天气很冷，他还是来了", "jǐnguǎn tiānqì hěn lěng, tā háishi lái le")}: «a pesar del frío, aun así vino».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("放弃")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['fàng qì'],
        pista: '<p>Las dos sílabas bajan.</p>',
        solucion: `<p>${zh("放弃", "fàngqì")}: <strong>fàng qì</strong>.</p>` },
      { tipo: 'opciones', enunciado: `<p>Una estudiante cuenta ${zh("她获得了奖学金", "tā huòdé le jiǎngxuéjīn")}. ¿Qué pasó?</p>`,
        opciones: ['Perdió el examen', 'Se graduó de la escuela', 'Cambió de carrera', 'Recibió una beca'], correcta: 3,
        pista: '<p>La tabla traduce ' + zh("获得", "huòdé") + ' y ' + zh("奖学金", "jiǎngxuéjīn") + '.</p>',
        solucion: `<p>${zh("获得", "huòdé")} es «obtener» y ${zh("奖学金", "jiǎngxuéjīn")} es «beca»: recibió una beca.</p>` },
    ],
    fuentes: [SILABO, DART_26, DART_22, YALE_JISHI],
  });

  L('Sea como sea: 不管 y 无论', {
    objetivo: `Decir que algo no cambia pase lo que pase con ${zh("不管", "bùguǎn")}/${zh("无论", "wúlùn")}/${zh("不论", "búlùn")} + ${zh("都", "dōu")}/${zh("也", "yě")}, saber qué puede ir después de esas palabras y hablar del trabajo.`,
    explicacion: `
      <p>Un chico dice en una entrevista: «no importa si es difícil, no importa si es de noche, yo voy a trabajar». Sea cual sea la situación, el resultado es el mismo. En español usas «no importa si…» o «sea como sea». En chino se usa ${zh("不管", "bùguǎn")}, ${zh("无论", "wúlùn")} o ${zh("不论", "búlùn")} en la primera parte y ${zh("都", "dōu")} o ${zh("也", "yě")} en la segunda. La lección usa vocabulario del trabajo.</p>
      ${tabla([
        ['不管', 'bùguǎn', 'no importa, sea como sea'], ['无论', 'wúlùn', 'no importa, sea como sea'], ['不论', 'búlùn', 'no importa, sea como sea'], ['工资', 'gōngzī', 'sueldo'], ['加班', 'jiābān', 'trabajar horas extra'],
        ['出差', 'chūchāi', 'ir de viaje de trabajo'], ['招聘', 'zhāopìn', 'contratar, buscar personal'], ['面试', 'miànshì', 'entrevista de trabajo'], ['应聘', 'yìngpìn', 'postularse a un empleo'], ['经验', 'jīngyàn', 'experiencia'],
        ['能力', 'nénglì', 'capacidad, habilidad'], ['负责', 'fùzé', 'encargarse de; responsable'], ['任务', 'rènwu', 'tarea, encargo'], ['职业', 'zhíyè', 'profesión, oficio'], ['收入', 'shōurù', 'ingresos; ganar'],
      ])}
      <h3>¿Cómo se dice «sea cual sea»?</h3>
      <p>Según Dartmouth, ${zh("无论", "wúlùn")} es una conjunción que expresa que, en ninguna circunstancia, el resultado cambia. Y la segunda parte suele llevar el adverbio ${zh("都", "dōu")} o ${zh("也", "yě")}. El glosario de MIT traduce ${zh("不管", "bùguǎn")} como «no matter…», es decir, «no importa…». Para Dartmouth, la parte con ${zh("不管", "bùguǎn")} indica que, dentro de un ámbito amplio, no hay excepción. Una frase de ejemplo de la lección: ${zh("无论工作有多累，他也不放弃", "wúlùn gōngzuò yǒu duō lèi, tā yě bù fàngqì")}, «sin importar cuánto cansa el trabajo, él no se rinde».</p>
      <h3>¿Qué va después de ${zh("不管", "bùguǎn")} o ${zh("无论", "wúlùn")}?</h3>
      <p>Aquí está lo más importante. Wheatley, de MIT, señala que la frase que sigue a ${zh("不管", "bùguǎn")} siempre tiene forma de pregunta, y los ejemplos de Dartmouth para ${zh("无论", "wúlùn")} muestran cuatro formas. Cada una tiene un ejemplo de la lección:</p>
      <ul>
        <li>Una palabra interrogativa, como ${zh("哪里", "nǎlǐ")} («dónde»): ${zh("不管你去哪里，我都会给你打电话", "bùguǎn nǐ qù nǎlǐ, wǒ dōu huì gěi nǐ dǎ diànhuà")}, «no importa adónde vayas, te llamaré».</li>
        <li>Una pregunta «X no X», que repite un adjetivo con su negación: ${zh("无论这个任务难不难，他都要做", "wúlùn zhège rènwu nán bù nán, tā dōu yào zuò")}, «sea difícil o no esta tarea, él la hará».</li>
        <li>Una opción con ${zh("还是", "háishi")} («o»): ${zh("无论是白天还是晚上，他都在工作", "wúlùn shì báitiān háishi wǎnshang, tā dōu zài gōngzuò")}, «sea de día o de noche, él trabaja».</li>
        <li>Una pregunta con ${zh("多", "duō")} («qué tan»), como ${zh("有多累", "yǒu duō lèi")} en la primera frase de ejemplo, «qué tan cansado».</li>
      </ul>
      <p>Dartmouth añade el pronombre ${zh("谁", "shéi")}: va después de ${zh("无论", "wúlùn")} o ${zh("不管", "bùguǎn")} y expresa «todos, sin excepción». Una frase de la lección: ${zh("无论谁都不能迟到", "wúlùn shéi dōu bù néng chídào")}, «sea quien sea, nadie puede llegar tarde».</p>
      <h3>${zh("不论", "búlùn")}, ${zh("只要", "zhǐyào")} y el orden</h3>
      <p>Dartmouth trae ejemplos de ${zh("不论", "búlùn")} sin explicación. En la lección se presenta como ${zh("不管", "bùguǎn")} y ${zh("无论", "wúlùn")}: se usa igual (simplificación de la lección). Los tres son intercambiables en estos ejemplos. Una frase de la lección: ${zh("不论天气好不好，他都去上班", "búlùn tiānqì hǎo bù hǎo, tā dōu qù shàngbān")}, «haga buen tiempo o no, él va a trabajar». Dartmouth también muestra que la parte con la pregunta puede ir al final de la frase: ${zh("我一定要去，不论天气好不好", "wǒ yídìng yào qù, búlùn tiānqì hǎo bù hǎo")}, «iré sin falta, haga buen tiempo o no».</p>
      <p>Otra pareja útil es ${zh("不管", "bùguǎn")} con ${zh("只要", "zhǐyào")}…${zh("就", "jiù")}…, que ya viste en "Solo si y con tal de: ${zh("只有 y 只要")}". Dartmouth lo explica así: la parte con ${zh("不管", "bùguǎn")} dice que no hay excepción y ${zh("只要", "zhǐyào")}…${zh("就", "jiù")}… dice «si A, entonces B». Una frase de la lección: ${zh("不管天气怎么样，只要有时间，我就去", "bùguǎn tiānqì zěnmeyàng, zhǐyào yǒu shíjiān, wǒ jiù qù")}, «sea como sea el tiempo, con tal de tener tiempo, voy».</p>
      <p class="nota"><strong>Trampa común:</strong> poner un hecho simple después de ${zh("不管", "bùguǎn")}, como ${zh("不管天气很好", "bùguǎn tiānqì hěn hǎo")}. Necesita una pregunta o una alternativa, para que quede claro que «cualquier respuesta» da el mismo resultado.</p>`,
    ejemplo: `
      <p>Una persona va a una entrevista de trabajo. Quiere decir que acepta tanto el trabajo extra como los viajes.</p>
      <ol class="pasos-ej">
        <li>Escribe las dos opciones con ${zh("还是", "háishi")}: ${zh("加班还是出差", "jiābān háishi chūchāi")}, «horas extra o viaje».</li>
        <li>Añade ${zh("不管是", "bùguǎn shì")} al inicio: ${zh("不管是加班还是出差", "bùguǎn shì jiābān háishi chūchāi")}, «sea horas extra o viaje».</li>
        <li>Escribe el resultado, que no cambia, con ${zh("都", "dōu")} antes del verbo: ${zh("我都可以", "wǒ dōu kěyǐ")}, «de las dos formas puedo».</li>
        <li>Une las dos partes con una coma.</li>
      </ol>
      <p>Para comprobar, lee la primera parte: debe ser una alternativa o una pregunta, y la segunda debe llevar ${zh("都", "dōu")} o ${zh("也", "yě")}. Resultado: <span class="resultado">${zh("不管是加班还是出差，我都可以", "bùguǎn shì jiābān háishi chūchāi, wǒ dōu kěyǐ")} = «sea horas extra o viaje, yo puedo»</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar ${zh("都", "dōu")} o ${zh("也", "yě")} en la segunda parte. Sin ellos, la frase queda sin el «en todos los casos».</p>`,
    vidaReal: `
      <p>Esta forma sirve para hablar de decisiones firmes:</p>
      <ul>
        <li>Decir en una entrevista de trabajo que aceptas cualquier horario.</li>
        <li>Prometer a un amigo que le responderás el teléfono, esté donde esté.</li>
        <li>Contar que el trabajo es duro y que aun así alguien sigue adelante.</li>
        <li>Hablar de reglas que valen para todos, como que nadie puede llegar tarde.</li>
        <li>Decir que quieres una profesión sin importar cuánto te pagan.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «no importa adónde vayas, te llamaré».</p>',
        respuesta: ['不管', '你', '去哪里', '我', '都', '会', '打电话'], pinyin: ['bùguǎn', 'nǐ', 'qù nǎlǐ', 'wǒ', 'dōu', 'huì', 'dǎ diànhuà'], lang: 'zh-Hans',
        alternativas: [['我', '都', '会', '打电话', '不管', '你', '去哪里']],
        pista: '<p>La primera parte tiene una palabra interrogativa; ' + zh("都", "dōu") + ' va antes del verbo de la segunda.</p>',
        solucion: `<p>${zh("不管你去哪里，我都会打电话", "bùguǎn nǐ qù nǎlǐ, wǒ dōu huì dǎ diànhuà")}: ${zh("不管", "bùguǎn")}, la pregunta, el sujeto de la segunda parte y ${zh("都", "dōu")}. También vale poner la parte con ${zh("不管", "bùguǎn")} al final de la frase.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «sea quien sea, nadie puede llegar tarde». ¿Qué frase usas?</p>',
        opciones: [zh('无论谁都不能迟到', 'wúlùn shéi dōu bù néng chídào'), zh('无论谁就不能迟到', 'wúlùn shéi jiù bù néng chídào'), zh('无论谁但是不能迟到', 'wúlùn shéi dànshì bù néng chídào'), zh('无论谁所以不能迟到', 'wúlùn shéi suǒyǐ bù néng chídào')], correcta: 0,
        pista: '<p>La segunda parte suele llevar ' + zh("都", "dōu") + ' o ' + zh("也", "yě") + '.</p>',
        solucion: `<p>${zh("无论谁都不能迟到", "wúlùn shéi dōu bù néng chídào")}: ${zh("谁", "shéi")} expresa «todos, sin excepción» y ${zh("都", "dōu")} cierra la frase.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según MIT, lo que sigue a ${zh("不管", "bùguǎn")} tiene forma de pregunta. ¿Cuál de estas primeras partes está bien?</p>`,
        opciones: [zh('不管天气很好', 'bùguǎn tiānqì hěn hǎo'), zh('不管天气好', 'bùguǎn tiānqì hǎo'), zh('不管天气', 'bùguǎn tiānqì'), zh('不管天气怎么样', 'bùguǎn tiānqì zěnmeyàng')], correcta: 3,
        pista: '<p>' + zh("怎么样", "zěnmeyàng") + ' es una palabra interrogativa.</p>',
        solucion: `<p>${zh("不管天气怎么样", "bùguǎn tiānqì zěnmeyàng")} tiene forma de pregunta («sea como esté el tiempo»). Las otras son hechos simples.</p>` },
      { tipo: 'opciones', escucha: { voz: '无论是白天还是晚上，他都在工作' },
        sinAudio: '<p>Se dice <strong>wúlùn shì báitiān háishi wǎnshang, tā dōu zài gōngzuò</strong>: wú sube; lùn baja; shì baja; bái sube; tiān es alto y plano; hái sube; wǎn baja y sube; tā es alto y plano; dōu es alto y plano; zài baja; gōng es alto y plano; zuò baja.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice la persona?</p>',
        opciones: ['Que trabaja solo de día', 'Que trabaja solo de noche', 'Que trabaja tanto de día como de noche', 'Que no trabaja'], correcta: 2,
        pista: '<p>Fíjate en ' + zh("还是", "háishi") + ' y en ' + zh("都", "dōu") + '.</p>',
        solucion: `<p>Se oye ${zh("无论是白天还是晚上，他都在工作", "wúlùn shì báitiān háishi wǎnshang, tā dōu zài gōngzuò")}: «sea de día o de noche, él trabaja».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("面试")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['miàn shì'],
        pista: '<p>Las dos sílabas bajan.</p>',
        solucion: `<p>${zh("面试", "miànshì")}: <strong>miàn shì</strong>.</p>` },
      { tipo: 'opciones', enunciado: `<p>Una persona dice ${zh("我今天要加班", "wǒ jīntiān yào jiābān")}. ¿Qué va a hacer?</p>`,
        opciones: ['Viajar por trabajo', 'Trabajar horas extra', 'Pedir un aumento', 'Hacer una entrevista'], correcta: 1,
        pista: '<p>La tabla traduce ' + zh("加班", "jiābān") + '.</p>',
        solucion: `<p>${zh("加班", "jiābān")} es «trabajar horas extra»: ${zh("我今天要加班", "wǒ jīntiān yào jiābān")} es «hoy tengo que trabajar horas extra».</p>` },
    ],
    fuentes: [SILABO, DART_13, DART_29, DART_16, DART_21, MIT],
  });

  // Gráfica de barras de una serie (admite valores negativos). Etiqueta abajo, valor encima o debajo de cada barra.
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
  const TEMPERATURAS = () => barras({ etiquetas: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'], valores: [-6, -2, 3, 8, 12], min: -8, max: 14, paso: 4,
    descripcion: 'Gráfica de barras con la temperatura de ejemplo de cinco días, en grados: lunes menos 6, martes menos 2, miércoles 3, jueves 8 y viernes 12. Son dos días bajo cero y tres por encima de cero.' });

  // ------------------------------------------------------------------
  L('Aunque pasara: 即使…也…', {
    objetivo: `Decir «aunque pasara tal cosa, igual…» con ${zh("即使", "jíshǐ")}…${zh("也", "yě")}…, distinguirlo de ${zh("尽管", "jǐnguǎn")} y hablar del clima y la naturaleza.`,
    explicacion: `
      <p>¿Saldrías a correr si afuera hace mucho frío? Alguien puede decir: «aunque hiciera frío, saldría igual». No dice que hoy haga frío: imagina un caso y asegura que el resultado no cambia. En chino se hace con ${zh("即使", "jíshǐ")} en la primera parte y ${zh("也", "yě")} en la segunda. La lección usa vocabulario de la naturaleza y el clima.</p>
      ${tabla([
        ['即使', 'jíshǐ', 'aunque, incluso si (algo supuesto)'], ['气候', 'qìhòu', 'clima (de una región)'], ['气温', 'qìwēn', 'temperatura del aire'], ['温度', 'wēndù', 'temperatura'], ['零下', 'líng xià', 'bajo cero'],
        ['寒冷', 'hánlěng', 'muy frío'], ['暖和', 'nuǎnhuo', 'tibio, agradable de temperatura'], ['森林', 'sēnlín', 'bosque'], ['地球', 'dìqiú', 'la Tierra, el planeta'], ['海洋', 'hǎiyáng', 'océano'],
        ['保护', 'bǎohù', 'proteger'], ['植物', 'zhíwù', 'planta'], ['阳光', 'yángguāng', 'luz del sol'], ['云', 'yún', 'nube'], ['危险', 'wēixiǎn', 'peligroso; peligro'],
      ])}
      <h3>¿Cómo se dice «aunque pasara»?</h3>
      <p>Según Dartmouth, ${zh("即使", "jíshǐ")} («even if») es una conjunción de concesión que forma una construcción de dos cláusulas, y en la segunda suele ir ${zh("也", "yě")} o ${zh("还", "hái")}. Concesión quiere decir que aceptas una posibilidad incómoda y, aun así, el resultado es el mismo. La primera parte plantea la situación supuesta y la segunda dice lo que no cambia. Una frase de ejemplo de la lección (las frases de ejemplo son de la lección): ${zh("即使天气不好，我们也要出去玩", "jíshǐ tiānqì bù hǎo, wǒmen yě yào chūqù wán")}, «aunque el tiempo esté mal, saldremos a jugar».</p>
      <h3>¿Dónde va ${zh("即使", "jíshǐ")}?</h3>
      <p>Dartmouth muestra ${zh("即使", "jíshǐ")} al inicio de la frase y también después de otra cláusula. En ese segundo caso, la frase primero da una idea y luego añade la situación supuesta: ${zh("你要多说话，即使说错了，也没关系", "nǐ yào duō shuōhuà, jíshǐ shuōcuò le, yě méi guānxi")}, «habla mucho; aunque te equivoques, no importa». Fíjate en que ${zh("也", "yě")} va justo antes del verbo o de la expresión que dice el resultado.</p>
      <h3>Una estimación y un caso extremo</h3>
      <p>Dartmouth añade que el patrón sirve también para conceder una estimación o un cálculo, y para destacar una situación extrema. Una estimación sería: ${zh("这个星期可能不下雨，即使下，也不会很大", "zhège xīngqī kěnéng bù xiàyǔ, jíshǐ xià, yě bù huì hěn dà")}, «esta semana quizá no llueva; aunque llueva, no será mucho». Un caso extremo sería: ${zh("即使气温在零下，他也每天跑步", "jíshǐ qìwēn zài líng xià, tā yě měitiān pǎobù")}, «aunque la temperatura esté bajo cero, él corre todos los días».</p>
      <p>Mira estos cinco días de ejemplo. Los datos de la gráfica son de la lección, no son mediciones reales:</p>
      ${TEMPERATURAS()}
      <p>Dos días están bajo cero (${zh("零下", "líng xià")}). Imagina que es domingo y esos días todavía no han pasado: para decir que correrás igual el lunes y el martes, usarías ${zh("即使", "jíshǐ")}.</p>
      <h3>${zh("即使", "jíshǐ")} frente a ${zh("尽管", "jǐnguǎn")}</h3>
      <p>La Universidad de Yale explica que ${zh("尽管", "jǐnguǎn")} se refiere a un hecho real, algo que ya ocurrió, mientras que ${zh("即使", "jíshǐ")} supone algo. En palabras de la lección: ${zh("即使", "jíshǐ")} imagina, ${zh("尽管", "jǐnguǎn")} cuenta. Por eso, si ayer ya hizo frío, dices ${zh("尽管", "jǐnguǎn")}; si solo piensas en mañana, dices ${zh("即使", "jíshǐ")}. Ya viste ${zh("尽管", "jǐnguǎn")} en "A pesar de: ${zh("尽管…但是…")}".</p>
      ${cuadro(['Palabra', 'Qué plantea', 'Frase de la lección'], [
        [zh('尽管', 'jǐnguǎn'), 'Un hecho real, que ya pasó', zh('尽管今天很冷，他还是来了', 'jǐnguǎn jīntiān hěn lěng, tā háishi lái le')],
        [zh('即使', 'jíshǐ'), 'Una situación supuesta', zh('即使明天很冷，他也会来', 'jíshǐ míngtiān hěn lěng, tā yě huì lái')],
      ])}
      <p>El sílabo también lista ${zh("就是…也", "jiùshì…yě")} en este mismo grupo de frases; en esta lección solo se menciona.</p>
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("即使", "jíshǐ")} para algo que ya ocurrió. Si es un hecho de verdad, usa ${zh("尽管", "jǐnguǎn")}.</p>`,
    ejemplo: `
      <p>Una chica quiere decir que, aunque la temperatura esté bajo cero, irá a ver el bosque.</p>
      <ol class="pasos-ej">
        <li>Escribe la situación supuesta: ${zh("气温在零下", "qìwēn zài líng xià")}, «la temperatura está bajo cero». Es algo que imaginas, así que sirve ${zh("即使", "jíshǐ")}.</li>
        <li>Ponle ${zh("即使", "jíshǐ")} al inicio: ${zh("即使气温在零下", "jíshǐ qìwēn zài líng xià")}.</li>
        <li>Escribe el resultado que no cambia: ${zh("她要去森林", "tā yào qù sēnlín")}, «ella irá al bosque».</li>
        <li>Pon ${zh("也", "yě")} antes del verbo: ${zh("她也要去森林", "tā yě yào qù sēnlín")}.</li>
        <li>Une las dos partes con una coma.</li>
      </ol>
      <p>Para comprobar, lee en español «aunque la temperatura esté bajo cero, igual irá»; debe sonar natural. Resultado: <span class="resultado">${zh("即使气温在零下，她也要去森林", "jíshǐ qìwēn zài líng xià, tā yě yào qù sēnlín")} = «aunque la temperatura esté bajo cero, ella irá al bosque»</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar ${zh("也", "yě")} en la segunda parte. Dartmouth dice que suele ir ahí, y sin él se pierde el «igual».</p>`,
    vidaReal: `
      <p>Con esta forma puedes hablar de cosas que quizá pasen:</p>
      <ul>
        <li>Decir que irás a un paseo aunque el tiempo esté mal.</li>
        <li>Animar a un amigo a hablar un idioma aunque se equivoque.</li>
        <li>Comentar que alguien corre todos los días aunque haga mucho frío.</li>
        <li>Platicar sobre cuidar el bosque, el mar y las plantas del planeta.</li>
        <li>Leer avisos del clima que hablan de temperaturas bajo cero.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «aunque la temperatura esté bajo cero, ella irá al bosque».</p>',
        respuesta: ['即使', '气温在零下', '她', '也', '要', '去森林'], pinyin: ['jíshǐ', 'qìwēn zài líng xià', 'tā', 'yě', 'yào', 'qù sēnlín'], lang: 'zh-Hans',
        pista: '<p>La situación supuesta va primero, con ' + zh("即使", "jíshǐ") + '; ' + zh("也", "yě") + ' va antes del verbo de la segunda parte.</p>',
        solucion: `<p>${zh("即使气温在零下，她也要去森林", "jíshǐ qìwēn zài líng xià, tā yě yào qù sēnlín")}: la suposición, el sujeto, ${zh("也", "yě")} y el resultado.</p>` },
      { tipo: 'opciones', enunciado: '<p>Mañana quizá haga mucho frío. ¿Qué frase dice «aunque mañana haga frío, iré»?</p>',
        opciones: [zh('即使明天很冷，我但是去', 'jíshǐ míngtiān hěn lěng, wǒ dànshì qù'), zh('因为明天很冷，我也去', 'yīnwèi míngtiān hěn lěng, wǒ yě qù'), zh('即使明天很冷，我也去', 'jíshǐ míngtiān hěn lěng, wǒ yě qù'), zh('明天很冷即使，我去也', 'míngtiān hěn lěng jíshǐ, wǒ qù yě')], correcta: 2,
        pista: '<p>Es una suposición, y la segunda parte lleva ' + zh("也", "yě") + '.</p>',
        solucion: `<p>${zh("即使明天很冷，我也去", "jíshǐ míngtiān hěn lěng, wǒ yě qù")}: ${zh("即使", "jíshǐ")} al inicio y ${zh("也", "yě")} antes del verbo. ${zh("因为", "yīnwèi")} habla de causa.</p>` },
      { tipo: 'opciones', enunciado: '<p>Ayer ya hizo mucho frío y, aun así, ella salió. Según Yale, ¿qué palabra cuenta ese hecho que ya pasó?</p>',
        opciones: [zh('即使', 'jíshǐ'), zh('尽管', 'jǐnguǎn'), zh('所以', 'suǒyǐ'), zh('因为', 'yīnwèi')], correcta: 1,
        pista: '<p>Un hecho que ya pasó pide la palabra de «A pesar de», no la de las suposiciones.</p>',
        solucion: `<p>${zh("尽管", "jǐnguǎn")} se refiere a un hecho real que ya ocurrió; ${zh("即使", "jíshǐ")} supone algo.</p>` },
      { tipo: 'opciones', escucha: { voz: '你要多说话，即使说错了，也没关系' },
        sinAudio: '<p>Se dice <strong>nǐ yào duō shuōhuà, jíshǐ shuōcuò le, yě méi guānxi</strong>: nǐ baja y sube; yào baja; duō es alto y plano; shuō es alto y plano; huà baja; jí sube; shǐ baja y sube; shuō es alto y plano; cuò baja; le es ligera; yě baja y sube; méi sube; guān es alto y plano; xi es ligera.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice?</p>',
        opciones: ['Que hay que callarse si uno se equivoca', 'Que ayer alguien se equivocó', 'Que hablar mucho está bien aunque haya errores', 'Que nadie debe hablar'], correcta: 2,
        pista: '<p>Fíjate en ' + zh("即使", "jíshǐ") + ' y en ' + zh("没关系", "méi guānxi") + ' («no importa»).</p>',
        solucion: `<p>Se oye ${zh("你要多说话，即使说错了，也没关系", "nǐ yào duō shuōhuà, jíshǐ shuōcuò le, yě méi guānxi")}: «habla mucho; aunque te equivoques, no importa».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("气候")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['qì hòu'],
        pista: '<p>Las dos sílabas bajan.</p>',
        solucion: `<p>${zh("气候", "qìhòu")}: <strong>qì hòu</strong>.</p>` },
      { tipo: 'numero', enunciado: `<p>Mira la gráfica de temperaturas de ejemplo de la lección. ¿Cuántos días están ${zh("零下", "líng xià")} (bajo cero)?</p>${TEMPERATURAS()}`,
        respuesta: 2,
        pista: '<p>Cuenta las barras que bajan del cero.</p>',
        solucion: '<p>Son 2: el lunes (menos 6) y el martes (menos 2). Los otros tres días están por encima de cero.</p>' },
    ],
    fuentes: [SILABO, DART('10', 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e5%8d%81%e8%af%be-lesson-10/', 'notas de gramática de 即使'), YALE_JISHI],
  });

  L('Ya que: 既然…就…', {
    objetivo: `Responder a algo ya dicho con ${zh("既然", "jìrán")}…${zh("就", "jiù")}…, dar consejos con él y hablar de compras y servicios.`,
    explicacion: `
      <p>Un amigo te dice: «este abrigo es carísimo». Tú contestas: «ya que es tan caro, no lo compres». Fíjate en que tu frase parte de lo que el otro acaba de decir. En español usas «ya que» o «puesto que». En chino se hace con ${zh("既然", "jìrán")} en la primera parte y ${zh("就", "jiù")} en la segunda. La lección usa vocabulario de compras y servicios.</p>
      ${tabla([
        ['既然', 'jìrán', 'ya que, puesto que'], ['购物', 'gòuwù', 'ir de compras'], ['网购', 'wǎnggòu', 'comprar por internet'], ['快递', 'kuàidì', 'envío, mensajería'], ['打折', 'dǎzhé', 'hacer descuento'],
        ['价格', 'jiàgé', 'precio'], ['顾客', 'gùkè', 'cliente'], ['质量', 'zhìliàng', 'calidad'], ['免费', 'miǎnfèi', 'gratis'], ['现金', 'xiànjīn', 'dinero en efectivo'],
        ['支付', 'zhīfù', 'pagar'], ['商品', 'shāngpǐn', 'producto, mercancía'], ['符合', 'fúhé', 'ajustarse a, cumplir con'], ['取消', 'qǔxiāo', 'cancelar'], ['收费', 'shōufèi', 'cobrar'],
      ])}
      <h3>¿Para qué se usa ${zh("既然", "jìrán")}?</h3>
      <p>La Universidad de Yale explica, en chino, que ${zh("既然", "jìrán")} se usa sobre todo para dar un consejo o en preguntas que expresan duda. Con una frase de ejemplo de la lección (las frases de ejemplo son de la lección): ${zh("既然你不喜欢，就别买了", "jìrán nǐ bù xǐhuan, jiù bié mǎi le")}, «ya que no te gusta, no lo compres». Primero aceptas algo que ya se dijo o se sabe, y luego dices qué conviene hacer.</p>
      <h3>¿Cómo suena la segunda parte?</h3>
      <p>Yale nombra cuatro estructuras habituales. En la primera, la segunda parte termina con ${zh("吧", "ba")}, una palabra suave que vuelve la frase una sugerencia. Cada una tiene un ejemplo de la lección:</p>
      ${cuadro(['Estructura', 'Frase de la lección'], [
        [`${zh("既然…，…就…吧", "jìrán…, …jiù…ba")} (consejo)`, `${zh("既然网购有打折，我们就网购吧", "jìrán wǎnggòu yǒu dǎzhé, wǒmen jiù wǎnggòu ba")}, «ya que comprar por internet tiene descuento, compremos por internet».`],
        [`${zh("既然…，…还是…吧", "jìrán…, …háishi…ba")} (mejor así)`, `${zh("既然价格这么高，我们还是明天再买吧", "jìrán jiàgé zhème gāo, wǒmen háishi míngtiān zài mǎi ba")}, «ya que el precio es tan alto, mejor compremos mañana».`],
        [`${zh("既然…，…就不/别…了", "jìrán…, …jiù bù/bié…le")} (no hacerlo)`, `${zh("既然太贵了，就别买了", "jìrán tài guì le, jiù bié mǎi le")}, «ya que es demasiado caro, no lo compres».`],
        [`${zh("既然…，为什么…", "jìrán…, wèishénme…")} (pregunta)`, `${zh("既然这个商品这么贵，你为什么还要买呢", "jìrán zhège shāngpǐn zhème guì, nǐ wèishénme hái yào mǎi ne")}, «ya que este producto es tan caro, ¿por qué todavía quieres comprarlo?».`],
      ])}
      <p>La última es una pregunta que duda: no busca información, muestra que algo no cuadra.</p>
      <h3>${zh("既然", "jìrán")} frente a ${zh("因为", "yīnwèi")}</h3>
      <p>Yale marca la diferencia con ${zh("因为", "yīnwèi")}: al usar ${zh("既然", "jìrán")}, siempre hay algo antes a lo que respondes; ${zh("因为", "yīnwèi")} no necesita nada previo. Por eso puedes empezar una conversación con ${zh("因为下雨，所以我不去", "yīnwèi xiàyǔ, suǒyǐ wǒ bù qù")}, «como llueve, no voy», pero ${zh("既然", "jìrán")} suena raro si nadie dijo nada antes. Ya viste ${zh("因为", "yīnwèi")} en "Causa y efecto: ${zh("因为…所以…")}".</p>
      <p>Para recordarlo, imagina una pregunta que oyes: ${zh("既然", "jìrán")} es como contestar «bueno, si eso es así…», y ${zh("因为", "yīnwèi")} es como dar tú el motivo desde cero.</p>
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("既然", "jìrán")} para dar una razón nueva, que nadie mencionó. Para eso sirve ${zh("因为", "yīnwèi")}.</p>`,
    ejemplo: `
      <p>Una amiga te dice que el envío cobra dinero. Quieres sugerir ir a la tienda.</p>
      <ol class="pasos-ej">
        <li>Toma lo que ya se dijo: ${zh("快递收费", "kuàidì shōufèi")}, «el envío cobra».</li>
        <li>Ponle ${zh("既然", "jìrán")} al inicio: ${zh("既然快递收费", "jìrán kuàidì shōufèi")}, «ya que el envío cobra».</li>
        <li>Escribe tu consejo con ${zh("就", "jiù")} antes del verbo: ${zh("我们就去商店购物", "wǒmen jiù qù shāngdiàn gòuwù")}.</li>
        <li>Suavízalo con ${zh("吧", "ba")} al final, como una sugerencia.</li>
        <li>Une las dos partes con una coma.</li>
      </ol>
      <p>Para comprobar, pregúntate si alguien ya dijo la primera parte; si no, quizá necesitas ${zh("因为", "yīnwèi")}. Resultado: <span class="resultado">${zh("既然快递收费，我们就去商店购物吧", "jìrán kuàidì shōufèi, wǒmen jiù qù shāngdiàn gòuwù ba")} = «ya que el envío cobra, vayamos a comprar a la tienda»</span>.</p>
      <p class="nota"><strong>Error común:</strong> empezar con ${zh("既然", "jìrán")} una idea que nadie mencionó. Ahí usa ${zh("因为", "yīnwèi")}.</p>`,
    vidaReal: `
      <p>Con esta forma respondes a lo que otros dicen:</p>
      <ul>
        <li>Aconsejar a un amigo que no compre algo que ya dijo que no le gusta.</li>
        <li>Proponer comprar por internet cuando alguien comenta que hay descuento.</li>
        <li>Preguntar con duda por qué alguien paga más cuando ya sabe que es caro.</li>
        <li>Decidir cómo pagar cuando la tienda avisa que cobra por el envío.</li>
        <li>Entender el tono de un consejo cuando alguien empieza con «ya que».</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «ya que es demasiado caro, no lo compres».</p>',
        respuesta: ['既然', '太贵了', '就', '别', '买', '了'], pinyin: ['jìrán', 'tài guì le', 'jiù', 'bié', 'mǎi', 'le'], lang: 'zh-Hans',
        pista: '<p>' + zh("既然", "jìrán") + ' abre la frase; ' + zh("就", "jiù") + ' va antes del verbo del consejo.</p>',
        solucion: `<p>${zh("既然太贵了，就别买了", "jìrán tài guì le, jiù bié mǎi le")}: lo ya sabido va con ${zh("既然", "jìrán")} y el consejo con ${zh("就别…了", "jiù bié…le")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>Según Yale, ¿qué palabra siempre responde a algo dicho antes?</p>',
        opciones: [zh('因为', 'yīnwèi'), zh('既然', 'jìrán'), zh('所以', 'suǒyǐ'), zh('但是', 'dànshì')], correcta: 1,
        pista: '<p>Es la palabra de «ya que».</p>',
        solucion: `<p>${zh("既然", "jìrán")} siempre tiene un contexto previo; ${zh("因为", "yīnwèi")} no lo necesita.</p>` },
      { tipo: 'opciones', enunciado: `<p>Completa: ${zh("既然你有现金，___别网购了", "jìrán nǐ yǒu xiànjīn, ___ bié wǎnggòu le")} («ya que tienes efectivo, no compres por internet»).</p>`,
        opciones: [zh('但是', 'dànshì'), zh('不管', 'bùguǎn'), zh('虽然', 'suīrán'), zh('就', 'jiù')], correcta: 3,
        pista: '<p>Es la pareja de ' + zh("既然", "jìrán") + ' en «' + zh("就别…了", "jiù bié…le") + '».</p>',
        solucion: `<p>${zh("既然你有现金，就别网购了", "jìrán nǐ yǒu xiànjīn, jiù bié wǎnggòu le")}: ${zh("就", "jiù")} abre el consejo.</p>` },
      { tipo: 'opciones', escucha: { voz: '既然价格这么高，我们就不买了' },
        sinAudio: '<p>Se dice <strong>jìrán jiàgé zhème gāo, wǒmen jiù bù mǎi le</strong>: jì baja; rán sube; jià baja; gé sube; zhè baja; me es ligera; gāo es alto y plano; wǒ baja y sube; men es ligera; jiù baja; bù baja (delante de otro tono baja, aquí suena bú y sube); mǎi baja y sube; le es ligera.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué deciden?</p>',
        opciones: ['Comprar por internet', 'No comprar porque el precio es alto', 'Pedir un descuento', 'Pagar en efectivo'], correcta: 1,
        pista: '<p>Fíjate en ' + zh("价格", "jiàgé") + ' y en ' + zh("不买了", "bù mǎi le") + '.</p>',
        solucion: `<p>Se oye ${zh("既然价格这么高，我们就不买了", "jìrán jiàgé zhème gāo, wǒmen jiù bù mǎi le")}: «ya que el precio es tan alto, no compramos».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("购物")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['gòu wù'],
        pista: '<p>Las dos sílabas bajan.</p>',
        solucion: `<p>${zh("购物", "gòuwù")}: <strong>gòu wù</strong>.</p>` },
      { tipo: 'opciones', enunciado: `<p>Un cartel dice ${zh("今天打折", "jīntiān dǎzhé")}. ¿Qué anuncia?</p>`,
        opciones: ['Que hoy no se cobra', 'Que la tienda está cerrada', 'Que hoy hay descuento', 'Que solo se acepta efectivo'], correcta: 2,
        pista: '<p>La tabla traduce ' + zh("打折", "dǎzhé") + '.</p>',
        solucion: `<p>${zh("打折", "dǎzhé")} es «hacer descuento»: hoy hay descuento.</p>` },
    ],
    fuentes: [SILABO, { nombre: 'Universidad de Yale (EE. UU.), Chinese Exchange: «既然 和 因为» (2026, en chino)', url: 'https://campuspress.yale.edu/exchange/%E6%97%A2%E7%84%B6-%E5%92%8C-%E5%9B%A0%E4%B8%BA/' }],
  });

  L('Si no: 要是 y 否则', {
    objetivo: `Decir «si…» con ${zh("要是", "yàoshi")}…${zh("就", "jiù")}…, decir «si no, de lo contrario» con ${zh("否则", "fǒuzé")} y hablar de salud y seguridad.`,
    explicacion: `
      <p>Tu amigo tose mucho. Le dices: «si te sientes mal, descansa; si no, vas a empeorar». Son dos ideas: una condición («si…») y un aviso de lo que pasa en caso contrario («si no…»). En chino, la primera se dice con ${zh("要是", "yàoshi")} y ${zh("就", "jiù")}, y la segunda con ${zh("否则", "fǒuzé")}. La lección usa vocabulario de salud y seguridad.</p>
      ${tabla([
        ['要是', 'yàoshi', 'si (una condición)'], ['否则', 'fǒuzé', 'si no, de lo contrario'], ['咳嗽', 'késou', 'toser; tos'], ['打针', 'dǎzhēn', 'poner una inyección'], ['体检', 'tǐjiǎn', 'chequeo médico'],
        ['体温', 'tǐwēn', 'temperatura del cuerpo'], ['受伤', 'shòushāng', 'lastimarse, resultar herido'], ['严重', 'yánzhòng', 'grave'], ['提醒', 'tíxǐng', 'recordar, avisar'], ['禁止', 'jìnzhǐ', 'prohibir'],
        ['警察', 'jǐngchá', 'policía'], ['着火', 'zháohuǒ', 'incendiarse'], ['及时', 'jíshí', 'a tiempo'], ['健身', 'jiànshēn', 'hacer ejercicio en gimnasio'], ['头痛', 'tóutòng', 'dolor de cabeza'],
      ])}
      <h3>¿Cómo se dice «si…, entonces…»?</h3>
      <p>Según Dartmouth, ${zh("要是", "yàoshi")} se parece a ${zh("如果", "rúguǒ")} en significado y uso: va en la primera cláusula para suponer una condición. La segunda cláusula suele llevar ${zh("就", "jiù")}. Michigan State dice que ${zh("要是", "yàoshi")} se usa mucho en el chino hablado. Una frase de ejemplo de la lección (las frases de ejemplo son de la lección): ${zh("要是你咳嗽，就在家休息吧", "yàoshi nǐ késou, jiù zài jiā xiūxi ba")}, «si toses, descansa en casa».</p>
      <h3>¿Dónde van ${zh("要是", "yàoshi")} y ${zh("就", "jiù")}?</h3>
      <p>Dartmouth dice que ${zh("要是", "yàoshi")} puede ir antes o después del sujeto. Así, ${zh("要是你受伤了", "yàoshi nǐ shòushāng le")} y ${zh("你要是受伤了", "nǐ yàoshi shòushāng le")} significan lo mismo: «si te lastimas». En cambio, el MIT de Wheatley explica que ${zh("就", "jiù")} es un adverbio y va justo antes de un verbo u otro adverbio; ChinGram añade, para ${zh("如果", "rúguǒ")}, que ${zh("就", "jiù")} nunca va antes del sujeto. Por eso, en tu frase, ${zh("就", "jiù")} se pega al verbo del resultado.</p>
      <p>Wheatley añade que ${zh("要是", "yàoshi")} (o ${zh("如果", "rúguǒ")}) puede reforzarse con ${zh("的话", "dehuà")} al final de la primera parte, como en ${zh("要是你头痛的话，就别健身了", "yàoshi nǐ tóutòng dehuà, jiù bié jiànshēn le")}, «si te duele la cabeza, no hagas ejercicio». Es opcional: sin ${zh("的话", "dehuà")} la frase sigue bien.</p>
      <p>Cuando en la segunda parte hay una petición o una instrucción, Yale dice que se usa ${zh("要是…就", "yàoshi…jiù")}. Es el caso de los consejos, como el de arriba.</p>
      <h3>¿Y ${zh("否则", "fǒuzé")}?</h3>
      <p>Según Dartmouth, ${zh("否则", "fǒuzé")} es una conjunción que significa «otherwise», es decir, «si no, de lo contrario», y se coloca al inicio de la segunda cláusula. Avisa de lo que pasaría si no se cumple la primera parte. Una frase de la lección: ${zh("请你及时去医院，否则会很严重", "qǐng nǐ jíshí qù yīyuàn, fǒuzé huì hěn yánzhòng")}, «ve al hospital a tiempo; si no, será grave». Dartmouth añade que la cláusula con ${zh("否则", "fǒuzé")} también puede dar una alternativa, como en ${zh("我们今天去体检，否则就明天去", "wǒmen jīntiān qù tǐjiǎn, fǒuzé jiù míngtiān qù")}, «hoy vamos al chequeo; si no, mañana».</p>
      ${cuadro(['Palabra', 'Qué dicen las fuentes', 'Frase de la lección'], [
        [zh('如果', 'rúguǒ'), `Algo más formal que ${zh("要是", "yàoshi")} (MIT); ya la viste en "Si…entonces: ${zh("如果…就…")}"`, zh('如果你累了，就休息吧', 'rúguǒ nǐ lèi le, jiù xiūxi ba')],
        [zh('要是', 'yàoshi'), 'Muy hablada (Michigan State); va antes o después del sujeto', zh('要是你累了，就休息吧', 'yàoshi nǐ lèi le, jiù xiūxi ba')],
        [zh('否则', 'fǒuzé'), 'Al inicio de la segunda parte; «si no»', zh('你要休息，否则会很累', 'nǐ yào xiūxi, fǒuzé huì hěn lèi')],
      ])}
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("就", "jiù")} antes del sujeto de la segunda parte. Va antes del verbo.</p>`,
    ejemplo: `
      <p>Un entrenador quiere decirle a una alumna: «si te lastimas, ve al médico; si no, será grave». Vamos a armarlo.</p>
      <ol class="pasos-ej">
        <li>Escribe la condición con ${zh("要是", "yàoshi")}: ${zh("要是你受伤了", "yàoshi nǐ shòushāng le")}, «si te lastimas».</li>
        <li>Escribe el consejo con ${zh("就", "jiù")} antes del verbo: ${zh("就去看医生", "jiù qù kàn yīshēng")}, «ve al médico».</li>
        <li>Une las dos partes: ${zh("要是你受伤了，就去看医生", "yàoshi nǐ shòushāng le, jiù qù kàn yīshēng")}.</li>
        <li>Añade el aviso con ${zh("否则", "fǒuzé")} al inicio de otra parte: ${zh("否则会很严重", "fǒuzé huì hěn yánzhòng")}, «si no, será grave».</li>
      </ol>
      <p>Para comprobar, lee en español «si te lastimas, ve al médico; si no, será grave»; debe tener sentido completo. Resultado: <span class="resultado">${zh("要是你受伤了，就去看医生，否则会很严重", "yàoshi nǐ shòushāng le, jiù qù kàn yīshēng, fǒuzé huì hěn yánzhòng")} = «si te lastimas, ve al médico; si no, será grave»</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner ${zh("否则", "fǒuzé")} al final o en la primera parte. Va al inicio de la segunda.</p>`,
    vidaReal: `
      <p>Estas formas sirven para avisos y consejos:</p>
      <ul>
        <li>Decirle a alguien con tos o dolor de cabeza que descanse en casa.</li>
        <li>Avisar a un amigo que debe ir a tiempo a un chequeo médico.</li>
        <li>Contar qué pasó cuando alguien se lastimó y fue al médico.</li>
        <li>Entender un cartel que prohíbe algo y avisa de que, si no, es peligroso.</li>
        <li>Proponer un plan de respaldo, como ir hoy y, si no, mañana.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «si te lastimas, ve al médico».</p>',
        respuesta: ['要是', '你', '受伤了', '就', '去', '看医生'], pinyin: ['yàoshi', 'nǐ', 'shòushāng le', 'jiù', 'qù', 'kàn yīshēng'], lang: 'zh-Hans',
        alternativas: [['你', '要是', '受伤了', '就', '去', '看医生']],
        pista: '<p>' + zh("要是", "yàoshi") + ' puede ir antes o después de ' + zh("你", "nǐ") + '; ' + zh("就", "jiù") + ' va antes del verbo.</p>',
        solucion: `<p>${zh("要是你受伤了，就去看医生", "yàoshi nǐ shòushāng le, jiù qù kàn yīshēng")}. También vale ${zh("你要是受伤了，就去看医生", "nǐ yàoshi shòushāng le, jiù qù kàn yīshēng")}, porque ${zh("要是", "yàoshi")} puede ir antes o después del sujeto.</p>` },
      { tipo: 'opciones', enunciado: '<p>¿Qué frase significa «ve al hospital a tiempo; si no, será grave»?</p>',
        opciones: [zh('请你及时去医院，否则会很严重', 'qǐng nǐ jíshí qù yīyuàn, fǒuzé huì hěn yánzhòng'), zh('请你及时去医院，要是会很严重', 'qǐng nǐ jíshí qù yīyuàn, yàoshi huì hěn yánzhòng'), zh('否则请你及时去医院，会很严重', 'fǒuzé qǐng nǐ jíshí qù yīyuàn, huì hěn yánzhòng'), zh('请你及时去医院，就会很严重', 'qǐng nǐ jíshí qù yīyuàn, jiù huì hěn yánzhòng')], correcta: 0,
        pista: '<p>' + zh("否则", "fǒuzé") + ' va al inicio de la segunda parte.</p>',
        solucion: `<p>${zh("否则", "fǒuzé")} abre la segunda parte: «si no, será grave». Las demás ponen la palabra en un lugar equivocado o cambian el sentido.</p>` },
      { tipo: 'opciones', enunciado: '<p>Según Michigan State, ¿cuál de estas palabras para «si» se usa mucho en el chino hablado?</p>',
        opciones: [zh('否则', 'fǒuzé'), zh('因此', 'yīncǐ'), zh('要是', 'yàoshi'), zh('然而', RANER)], correcta: 2,
        pista: '<p>Una de las cuatro significa «si».</p>',
        solucion: `<p>${zh("要是", "yàoshi")} se usa mucho en el chino hablado; ${zh("如果", "rúguǒ")} es algo más formal.</p>` },
      { tipo: 'opciones', escucha: { voz: '要是你头痛，就别健身了' },
        sinAudio: '<p>Se dice <strong>yàoshi nǐ tóutòng, jiù bié jiànshēn le</strong>: yào baja; shi es ligera; nǐ baja y sube; tóu sube; tòng baja; jiù baja; bié sube; jiàn baja; shēn es alto y plano; le es ligera.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué consejo da?</p>',
        opciones: ['Que haga ejercicio con más fuerza', 'Que vaya al hospital hoy', 'Que no haga ejercicio si le duele la cabeza', 'Que llame a la policía'], correcta: 2,
        pista: '<p>Fíjate en ' + zh("头痛", "tóutòng") + ' y en ' + zh("别", "bié") + '.</p>',
        solucion: `<p>Se oye ${zh("要是你头痛，就别健身了", "yàoshi nǐ tóutòng, jiù bié jiànshēn le")}: «si te duele la cabeza, no hagas ejercicio».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("严重")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['yán zhòng'],
        pista: '<p>La primera sube y la segunda baja.</p>',
        solucion: `<p>${zh("严重", "yánzhòng")}: <strong>yán zhòng</strong>.</p>` },
      { tipo: 'opciones', enunciado: `<p>Un cartel dice ${zh("这里禁止玩手机", "zhèlǐ jìnzhǐ wán shǒujī")}. ¿Qué dice?</p>`,
        opciones: ['Que aquí se puede usar el teléfono', 'Que aquí está prohibido usar el teléfono', 'Que aquí hay un chequeo médico', 'Que aquí hay que llamar a la policía'], correcta: 1,
        pista: '<p>La tabla traduce ' + zh("禁止", "jìnzhǐ") + '.</p>',
        solucion: `<p>${zh("禁止", "jìnzhǐ")} es «prohibir»: aquí está prohibido usar el teléfono.</p>` },
    ],
    fuentes: [SILABO, DART(7, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e4%b8%83%e8%af%be-lesson-7/', 'notas de gramática de 要是'), DART(14, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e5%8d%81%e5%9b%9b%e8%af%be-lesson-14/', 'notas de gramática de 否则'),
      { nombre: 'Michigan State University (EE. UU.), Elementary Chinese I, Lesson 6 Dialogue 1: Leaving a message (2021, en inglés)', url: 'https://openbooks.lib.msu.edu/chs101/chapter/lesson-6-dialogue-1-call-a-friend/' },
      { nombre: 'Michigan State University (EE. UU.), Elementary Chinese II, Lesson 8 Dialogue 2 (2022, en inglés)', url: 'https://openbooks.lib.msu.edu/chs102/chapter/lesson-8-dialogue-2/' },
      { nombre: 'ChinGram, Universidad Palacký de Olomouc (Chequia), Sentences with rúguǒ…, jiù… 如果……，就…… (2025, en inglés)', url: 'https://chingram.upol.cz/grammar/hypothetical-sentences-with-ruguo-jiu-%e5%a6%82%e6%9e%9c%ef%bc%8c%e5%b0%b1-if-then-and' },
      { nombre: 'Universidad de Yale (EE. UU.), Chinese Exchange: «要是…就 y 要是…会» (2019, en chino)', url: 'https://campuspress.yale.edu/exchange/2019/11/26/%e8%a6%81%e6%98%af/' }, MIT],
  });

  const CIERRE = () => `<p>${zh("小明的学校互联网速度很慢。", "Xiǎo Míng de xuéxiào hùliánwǎng sùdù hěn màn.")} ${zh("由于很多同学都在看视频，信号不好，因此发送信息也很慢。", "Yóuyú hěn duō tóngxué dōu zài kàn shìpín, xìnhào bù hǎo, yīncǐ fāsòng xìnxī yě hěn màn.")} ${zh("于是老师说，上课的时候不要看视频。", "Yúshì lǎoshī shuō, shàngkè de shíhou bù yào kàn shìpín.")} ${zh("现在看视频的人减少了，速度快多了。", "Xiànzài kàn shìpín de rén jiǎnshǎo le, sùdù kuài duō le.")}</p>`;
  const MENSAJES = () => barras({ etiquetas: ['Sem. 1', 'Sem. 2', 'Sem. 3', 'Sem. 4'], valores: [20, 30, 45, 60], min: 0, max: 60, paso: 20,
    descripcion: 'Gráfica de barras con los mensajes de ejemplo que envía un club cada semana: 20 en la semana 1, 30 en la 2, 45 en la 3 y 60 en la 4. Los números suben cada semana.' });

  L('Por eso: 由于…因此…', {
    objetivo: `Decir causa y consecuencia con ${zh("由于", "yóuyú")}…${zh("因此", "yīncǐ")}/${zh("所以", "suǒyǐ")}…, contar lo que sigue con ${zh("于是", "yúshì")} y hablar de tecnología e internet.`,
    explicacion: `
      <p>Imagina que se va la señal del celular en un tren. Podrías decir: «como no hay señal, no puedo enviar el mensaje». Una causa y una consecuencia. Ya viste esa idea con ${zh("因为", "yīnwèi")} y ${zh("所以", "suǒyǐ")}. En chino también se puede decir con ${zh("由于", "yóuyú")} en la primera parte y ${zh("因此", "yīncǐ")} o ${zh("所以", "suǒyǐ")} en la segunda. La lección usa vocabulario de tecnología.</p>
      ${tabla([
        ['由于', 'yóuyú', 'debido a, como (causa)'], ['因此', 'yīncǐ', 'por eso, por esta razón'], ['于是', 'yúshì', 'así que, entonces'], ['互联网', 'hùliánwǎng', 'internet'], ['信息', 'xìnxī', 'información, mensaje'],
        ['技术', 'jìshù', 'técnica, tecnología'], ['科技', 'kējì', 'ciencia y tecnología'], ['视频', 'shìpín', 'video'], ['网页', 'wǎngyè', 'página web'], ['密码', 'mìmǎ', 'contraseña'],
        ['信号', 'xìnhào', 'señal'], ['发送', 'fāsòng', 'enviar'], ['增加', 'zēngjiā', 'aumentar'], ['减少', 'jiǎnshǎo', 'disminuir'], ['速度', 'sùdù', 'velocidad'],
      ])}
      <h3>¿Cómo se dice «debido a…, por eso…»?</h3>
      <p>Según Dartmouth, ${zh("由于", "yóuyú")} es una conjunción que marca la causa, y la cláusula siguiente suele llevar ${zh("所以", "suǒyǐ")} o ${zh("因此", "yīncǐ")}. El curso de MIT traduce ${zh("因此", "yīncǐ")} como «por esta razón, así que». Una frase de ejemplo de la lección (las frases de ejemplo son de la lección): ${zh("由于信号不好，因此视频很慢", "yóuyú xìnhào bù hǎo, yīncǐ shìpín hěn màn")}, «debido a que la señal es mala, el video va lento». También sirve ${zh("由于密码错了，所以我不能看视频", "yóuyú mìmǎ cuò le, suǒyǐ wǒ bù néng kàn shìpín")}.</p>
      <p>Dartmouth da un ejemplo parecido: ${zh("由于天气不好，飞机晚点了", "yóuyú tiānqì bù hǎo, fēijī wǎndiǎn le")}, que no lleva ninguna palabra en la segunda parte. En este ejemplo la segunda parte queda sin palabra y la causa se entiende igual; no es una regla general.</p>
      <h3>${zh("由于", "yóuyú")} frente a ${zh("因为", "yīnwèi")}</h3>
      <p>Dartmouth da dos diferencias. Primera: ${zh("由于", "yóuyú")} puede ir seguida de ${zh("因此", "yīncǐ")}, y ${zh("因为", "yīnwèi")} no. Segunda: ${zh("因为", "yīnwèi")} puede aparecer en la segunda cláusula, y ${zh("由于", "yóuyú")} no. Por eso, si cuentas primero el resultado, usas ${zh("因为", "yīnwèi")}: ${zh("视频很慢，因为信号不好", "shìpín hěn màn, yīnwèi xìnhào bù hǎo")}.</p>
      ${cuadro(['Palabra', 'Dónde va', 'Qué dicen las fuentes'], [
        [zh('因为', 'yīnwèi'), 'Primera o segunda parte', `Puede estar en la segunda cláusula; no va con ${zh("因此")}.`],
        [zh('由于', 'yóuyú'), 'Primera parte', `Puede ir con ${zh("因此")} o con ${zh("所以")}; no va en la segunda cláusula.`],
        [zh('因此', 'yīncǐ'), 'Segunda parte', 'Significa «por esta razón, así que».'],
      ])}
      <h3>${zh("由于", "yóuyú")} con un sustantivo</h3>
      <p>En un texto de Dartmouth, ${zh("由于", "yóuyú")} va seguido de un sustantivo («debido al aumento de…»). Una frase de la lección en ese molde: ${zh("由于视频的增加，互联网速度很慢", "yóuyú shìpín de zēngjiā, hùliánwǎng sùdù hěn màn")}. Aquí es solo un ejemplo, sin más regla.</p>
      <h3>${zh("于是", "yúshì")}: lo que sigue después</h3>
      <p>Los ejemplos de Dartmouth muestran que ${zh("于是", "yúshì")} («así que, entonces») introduce un hecho que sigue a otro. Una frase de la lección: ${zh("我忘了密码，于是我问老师", "wǒ wàng le mìmǎ, yúshì wǒ wèn lǎoshī")}, «olvidé la contraseña, así que le pregunté al maestro». No hay más regla que esa.</p>
      <p>Para contar cómo cambian las cosas: ${zh("增加", "zēngjiā")} es «aumentar» y ${zh("减少", "jiǎnshǎo")} es «disminuir». Esta gráfica es de ejemplo de la lección: los mensajes que envía un club cada semana, inventados.</p>
      ${MENSAJES()}
      <p>Los mensajes ${zh("增加", "zēngjiā")} cada semana: de 20 a 60.</p>
      <h3>Texto de cierre</h3>
      <p>Lee este texto corto de la lección: junta los tres conectores de esta lección.</p>
      ${CIERRE()}
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("由于", "yóuyú")} en la segunda parte. Ahí va ${zh("因为", "yīnwèi")}.</p>`,
    ejemplo: `
      <p>Quieres decir que la señal del celular es mala y por eso no puedes enviar un video.</p>
      <ol class="pasos-ej">
        <li>Escribe la causa: ${zh("信号不好", "xìnhào bù hǎo")}, «la señal es mala». Ponle ${zh("由于", "yóuyú")} al inicio: ${zh("由于信号不好", "yóuyú xìnhào bù hǎo")}.</li>
        <li>Escribe la consecuencia: ${zh("我不能发送视频", "wǒ bù néng fāsòng shìpín")}, «no puedo enviar el video».</li>
        <li>Pon ${zh("因此", "yīncǐ")} al inicio de la segunda parte: ${zh("因此我不能发送视频", "yīncǐ wǒ bù néng fāsòng shìpín")}.</li>
        <li>Une las dos partes con una coma.</li>
      </ol>
      <p>Para comprobar, lee primero la causa y luego la consecuencia en español con «por eso». Resultado: <span class="resultado">${zh("由于信号不好，因此我不能发送视频", "yóuyú xìnhào bù hǎo, yīncǐ wǒ bù néng fāsòng shìpín")} = «debido a que la señal es mala, por eso no puedo enviar el video»</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir ${zh("因为", "yīnwèi")} y ${zh("因此", "yīncǐ")} juntos. Según Dartmouth, ${zh("因为", "yīnwèi")} no va con ${zh("因此", "yīncǐ")}; usa ${zh("由于", "yóuyú")}.</p>`,
    vidaReal: `
      <p>Con estos conectores explicas por qué pasan las cosas:</p>
      <ul>
        <li>Explicar que un video va lento porque la señal es mala.</li>
        <li>Contar qué hiciste después de olvidar una contraseña.</li>
        <li>Leer noticias de tecnología que dicen por qué algo aumentó o disminuyó.</li>
        <li>Escribir un mensaje a un maestro que da una razón y su consecuencia.</li>
        <li>Seguir una explicación en la que un hecho lleva al siguiente, como en un texto escolar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «debido a que la señal es mala, por eso el video va lento».</p>',
        respuesta: ['由于', '信号不好', '因此', '视频很慢'], pinyin: ['yóuyú', 'xìnhào bù hǎo', 'yīncǐ', 'shìpín hěn màn'], lang: 'zh-Hans',
        pista: '<p>La causa va primero, con ' + zh("由于", "yóuyú") + '; ' + zh("因此", "yīncǐ") + ' abre la consecuencia.</p>',
        solucion: `<p>${zh("由于信号不好，因此视频很慢", "yóuyú xìnhào bù hǎo, yīncǐ shìpín hěn màn")}: primero la causa y después la consecuencia.</p>` },
      { tipo: 'opciones', enunciado: `<p>Lee el texto de cierre y responde: ¿por qué internet y los mensajes iban lentos en la escuela?</p>${CIERRE()}`,
        opciones: ['Porque la contraseña estaba mal', 'Porque los maestros no usaban internet', 'Porque las páginas web eran nuevas', 'Porque muchos compañeros veían videos y la señal no era buena'], correcta: 3,
        pista: '<p>Busca la frase que empieza con ' + zh("由于", "yóuyú") + '.</p>',
        solucion: `<p>${zh("由于很多同学都在看视频，信号不好", "yóuyú hěn duō tóngxué dōu zài kàn shìpín, xìnhào bù hǎo")}: muchos veían videos y la señal era mala.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según el mismo texto, ¿qué dijo el maestro y qué pasó después?</p>${CIERRE()}`,
        opciones: ['Dijo que no vieran videos en clase, y la velocidad mejoró', 'Dijo que vieran más videos, y la velocidad bajó', 'Dijo que cambiaran la contraseña, y nadie la usó', 'Dijo que se enviaran más mensajes'], correcta: 0,
        pista: '<p>Fíjate en ' + zh("于是", "yúshì") + ' y en ' + zh("减少", "jiǎnshǎo") + '.</p>',
        solucion: `<p>Tras ${zh("于是", "yúshì")}, el maestro pide no ver videos; luego quienes ven videos ${zh("减少了", "jiǎnshǎo le")} y la velocidad sube.</p>` },
      { tipo: 'opciones', escucha: { voz: '由于密码错了，因此我不能看视频' },
        sinAudio: '<p>Se dice <strong>yóuyú mìmǎ cuò le, yīncǐ wǒ bù néng kàn shìpín</strong>: yóu sube; yú sube; mì baja; mǎ baja y sube; cuò baja; le es ligera; yīn es alto y plano; cǐ baja y sube; wǒ baja y sube; bù baja; néng sube; kàn baja; shì baja; pín sube.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué pasa?</p>',
        opciones: ['La persona olvidó la señal', 'La persona no puede ver videos porque la contraseña está mal', 'La persona envió un video', 'La persona cambió la velocidad'], correcta: 1,
        pista: '<p>Fíjate en ' + zh("密码", "mìmǎ") + ' y en ' + zh("不能看视频", "bù néng kàn shìpín") + '.</p>',
        solucion: `<p>Se oye ${zh("由于密码错了，因此我不能看视频", "yóuyú mìmǎ cuò le, yīncǐ wǒ bù néng kàn shìpín")}: «como la contraseña está mal, no puedo ver videos».</p>` },
      { tipo: 'opciones', enunciado: `<p>Según Dartmouth, ¿cuál de estas palabras puede ir con ${zh("因此", "yīncǐ")}?</p>`,
        opciones: [zh('因为', 'yīnwèi'), zh('由于', 'yóuyú'), zh('虽然', 'suīrán'), zh('即使', 'jíshǐ')], correcta: 1,
        pista: '<p>Una de las cuatro marca la causa y se lleva bien con ' + zh("因此", "yīncǐ") + '.</p>',
        solucion: `<p>${zh("由于", "yóuyú")} puede ir seguida de ${zh("因此", "yīncǐ")}; ${zh("因为", "yīnwèi")} no.</p>` },
      { tipo: 'numero', enunciado: `<p>Mira la gráfica de mensajes de ejemplo de la lección. ¿Cuántos mensajes más se enviaron en la semana 4 que en la semana 1?</p>${MENSAJES()}`,
        respuesta: 60 - 20,
        pista: '<p>Resta el valor de la semana 1 al de la semana 4.</p>',
        solucion: '<p>60 menos 20 son 40 mensajes más: los mensajes aumentaron cada semana.</p>' },
    ],
    fuentes: [SILABO, DART(20, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e4%ba%8c%e5%8d%81%e8%af%be-lesson-20/', 'notas de gramática de 由于'), DART(21, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%b8%80%e8%af%be-lesson-21/', 'texto con 由于 y un sustantivo'),
      DART(12, 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e5%8d%81%e4%ba%8c%e8%af%be-lesson-12/', 'ejemplos de 于是'), MIT],
  });

})();
