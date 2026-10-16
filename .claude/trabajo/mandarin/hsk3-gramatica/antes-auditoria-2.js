// Mandarín · Unidad 7: HSK 3 · Gramática.
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
  const caja = (x1, y1, x2, y2) => ({ tipo: 'poligono', puntos: [[x1, y1], [x2, y1], [x2, y2], [x1, y2]] });
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
  // Barras de datos de ejemplo: etiquetas debajo y valor encima.
  function barras({ etiquetas, valores, max, paso, descripcion }) {
    const n = valores.length;
    const figuras = valores.flatMap((v, i) => [
      { tipo: 'poligono', puntos: [[i + 0.15, 0], [i + 0.85, 0], [i + 0.85, v], [i + 0.15, v]], solido: true },
      txt(i + 0.5, -max * 0.07, etiquetas[i]),
      txt(i + 0.5, v + max * 0.05, String(v)),
    ]);
    return G({ x: [0, n], y: [-max * 0.12, max * 1.1], pasos: [1e9, paso], nombres: false, figuras, descripcion });
  }

  // Fuentes. Sílabo = F1, F20, F40 y F60 (misma URL). Las páginas de universidades se declaran con su URL completa.
  // Los números F# entre paréntesis son los de la ficha de la unidad.
  const SILABO = { nombre: 'Centro de Educación y Cooperación Lingüística (China), «HSK 考试大纲», sílabo del HSK 3.0 (2025)', url: 'https://hsk.cn-bj.ufileos.com/3.0/新版HSK考试大纲1219.pdf' };
  const CHINGRAM = (ruta, nombre) => ({ nombre: `Universidad Palacký de Olomouc (Chequia) y socios, ChinGram: ${nombre} (en inglés)`, url: `https://chingram.upol.cz/grammar/${ruta}` });
  const MIT_UNIDAD = (n, hash) => ({ nombre: `MIT OpenCourseWare (EE. UU.), J. K. Wheatley, Learning Chinese: A Foundation Course in Mandarin, Unit ${n} (2007, en inglés)`, url: `https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/${hash}_MITRES_21G_003S11_unit${n}.pdf` });
  const MSU = (url, nombre) => ({ nombre: `Universidad Estatal de Míchigan (EE. UU.), ${nombre} (en inglés)`, url });
  const OXFORD_GRAMATICA = { nombre: 'Centre for Teaching Chinese as a Foreign Language, Universidad de Oxford (Reino Unido), Elementary Chinese Grammar 基础汉语语法 (2011, en inglés)', url: 'https://www.ctcfl.ox.ac.uk/media/pages/pdf/lang-work_grammar-database_grammar-database-for-hard-copy.pdf' };
  const OXFORD_NOTAS = (n, tema) => ({ nombre: `Centre for Teaching Chinese as a Foreign Language, Universidad de Oxford (Reino Unido), Chinese Multimedia: Grammar Notes for lesson ${n}, ${tema} (en inglés)`, url: `https://www.ctcfl.ox.ac.uk/materials_chinese_lessons_${n}_grammar_notes/` });
  const MIT_CURSO = { nombre: 'MIT OpenCourseWare (EE. UU.), J. K. Wheatley, Learning Chinese: A Foundation Course in Mandarin (2011, en inglés)', url: 'https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/res21g_003_s_11.pdf' };
  // Lecciones 1 a 4 (F2 a F10 y F21 a F24)
  const CHIN_RESULTADO = CHINGRAM('resultative-complement', 'Resultative complement');
  const CHIN_DIRECCION = CHINGRAM('compound-directional-complement', 'Compound directional complement');
  const KAPIOLANI_DIR = { nombre: 'Kapiolani Community College (EE. UU.), CHN101 Elementary Mandarin I, lección 6: Directional complements (2020, en inglés)', url: 'https://human.libretexts.org/Courses/Kapiolani_Community_College/CHN101%3A_Elementary_Mandarin_I_(Polley)/Elementary_Mandarin_I_Textbook/07%3A_At_the_Hotel/7.04%3A_Lesson_6_Grammar_-_Directional_complements' };
  const MIT_U5 = MIT_UNIDAD('05', '4b76c3d5e014f4833ef5efa2642b58ae');
  const MIT_U7 = MIT_UNIDAD('07', '9ac5a3ef1007db50644516dee9a1d249');
  const MIT_U8 = MIT_UNIDAD('08', '3fb7ed18b72df30602aba28f4e94abe6');
  const MIT_U9 = MIT_UNIDAD('09', '56eae0bfe4eb82d1e827bc1b19dff93d');
  const MIT_U10 = MIT_UNIDAD('10', 'd8ba98f52de3d20fe7096e9f1fb74839');
  const OXFORD_L21 = OXFORD_NOTAS(21, 'la construcción 把');
  const OXFORD_L22 = OXFORD_NOTAS(22, 'la construcción pasiva con 被');
  const USC_BA = { nombre: 'University of Southern California (EE. UU.), Yen-Hui Audrey Li, «Chinese Ba», en The Wiley Blackwell Companion to Syntax (2017, en inglés)', url: 'https://dornsife.usc.edu/ling/wp-content/uploads/sites/50/2023/10/2017-Chinese-ba-Blackwell.pdf' };
  // Lecciones 7 a 12: MSU, Princeton, Oxford, ChinGram y Kapiolani (F41 a F66)
  const MSU_BUDAN = MSU('https://openbooks.lib.msu.edu/chs102/chapter/lesson-11-dialogue-2-%e4%b8%80%e5%b0%81%e4%bf%a1/', 'Elementary Chinese II: Lesson 11 Dialogue 2');
  const MSU_YIBIAN = MSU('https://openbooks.lib.msu.edu/chs102/chapter/lesson-8-dialogue-1/', 'Elementary Chinese II: Lesson 8 Dialogue 1');
  const PRINCETON_ZHIYAO = { nombre: 'Universidad de Princeton (EE. UU.), Basic Chinese Characters of CHI 103 & 108: «只要 zhǐyào» (en inglés)', url: 'https://commons.princeton.edu/chinesecharacters/%E5%8F%AA%E8%A6%81%E5%B0%B1/' };
  const OXFORD_YUE = { nombre: 'Centre for Teaching Chinese as a Foreign Language, Universidad de Oxford (Reino Unido), Grammar notes: yuè lái yuè y yuè … yuè … (en inglés)', url: 'https://www.ctcfl.ox.ac.uk/materials_mcd_ttweek4_grammar-week4/' };
  const PRINCETON_YUE = { nombre: 'Universidad de Princeton (EE. UU.), Basic Chinese Characters of CHI 103 & 108: «越来越 yuè lái yuè» (en inglés)', url: 'https://commons.princeton.edu/chinesecharacters/%E8%B6%8A%E6%9D%A5%E8%B6%8A/' };
  const CHIN_HUOZHE = CHINGRAM('comparison-conjunctions-huozhe-%e6%88%96%e8%80%85-and-haishi-%e8%bf%98%e6%98%af-or', 'Comparison between the conjunctions huòzhě 或者 and háishi 还是');
  const KAPIOLANI_HUOZHE = { nombre: 'Kapiolani Community College (EE. UU.), CHN101 Elementary Mandarin I, lección 5: Expressing «or» in statements (en inglés)', url: 'https://human.libretexts.org/Courses/Kapiolani_Community_College/CHN101%3A_Elementary_Mandarin_I_(Polley)/Elementary_Mandarin_I_Textbook/06%3A_At_the_Restaurant/6.04%3A_Lesson_5_Grammar_-_Expressing_or_in_statements' };
  const CHIN_SHENME = CHINGRAM('interrogative-pronoun-shenme-%e4%bb%80%e4%b9%88-%e4%bb%80%e9%ba%bc-what-something-anything-any-every', 'Interrogative pronoun shénme 什么');
  const OXFORD_QW_DOU = { nombre: 'Centre for Teaching Chinese as a Foreign Language, Universidad de Oxford (Reino Unido), The uses of 什么 … 都 …, 哪儿都 … and 谁都 … (en inglés)', url: 'https://www.ctcfl.ox.ac.uk/materials_grammar-exercises_the-uses-of-qwdou/' };

  // ------------------------------------------------------------------
  L('Más resultados: 到, 住 y 上', {
    objetivo: `Añadir ${zh("到", "dào")}, ${zh("住", "zhù")} y ${zh("上", "shàng")} al verbo para decir que algo se consiguió, quedó fijo o se cerró, y negarlo con ${zh("没", "méi")}.`,
    explicacion: `
      <p>Le preguntas a un amigo: «¿ya recibiste mi regalo?». No te basta con saber que alguien lo mandó: quieres saber si el regalo llegó. En chino esa idea sale de pegar una palabrita al verbo. Esta unidad enseña una selección de las palabras de nivel 3 del HSK 3.0; el sílabo completo está enlazado en las fuentes, al final. La voz de tu dispositivo puede sonar distinta de un hablante nativo; si dudas, manda el pinyin.</p>
      ${tabla([
        ['收到', 'shōudào', 'recibir'], ['遇到', 'yùdào', 'encontrarse con, toparse con'], ['得到', 'dédào', 'obtener, conseguir'], ['受到', 'shòudào', 'recibir (un trato o una influencia)'],
        ['记', 'jì', 'anotar, memorizar'], ['接', 'jiē', 'recibir, contestar (el teléfono)'], ['关', 'guān', 'cerrar, apagar'], ['带', 'dài', 'llevar consigo'],
        ['借', 'jiè', 'pedir prestado'], ['放', 'fàng', 'poner, colocar'], ['护照', 'hùzhào', 'pasaporte'], ['礼物', 'lǐwù', 'regalo'],
      ])}
      <h3>¿Qué dice la palabra de resultado?</h3>
      <p>Según ChinGram, de la Universidad Palacký, el complemento de resultado es un elemento pegado al verbo que indica lo que resultó de la acción. Ya viste algunos en "Resultado de una acción: ${zh("完, 好, 懂")} y ${zh("错")}". Ahora llegan tres más. Compara: ${zh("他找老师", "tā zhǎo lǎoshī")} es «busca al profesor» y ${zh("他找到了老师", "tā zhǎodào le lǎoshī")} es «ya lo encontró». Con ${zh("到", "dào")}, la búsqueda terminó bien.</p>
      <h3>${zh("到", "dào")}: se alcanzó algo</h3>
      <p>La guía de Oxford dice que ${zh("到", "dào")} significa «obtener» con verbos como ${zh("买", "mǎi")}, «comprar», o ${zh("吃", "chī")}, «comer», y también «llegar a un punto»: ${zh("我们学到了第三课", "wǒmen xué dào le dì sān kè")} es «llegamos a la lección tres». MIT añade que, con verbos que no son de movimiento, ${zh("到", "dào")} equivale a «lograr». Por eso tres palabras de la tabla ya lo llevan dentro: ${zh("收到", "shōudào")}, ${zh("遇到", "yùdào")} y ${zh("得到", "dédào")}. Más frases de ejemplo de la lección: ${zh("我借到了一本书", "wǒ jièdào le yì běn shū")}, «conseguí que me prestaran un libro».</p>
      <h3>${zh("住", "zhù")}: algo queda fijo</h3>
      <p>ChinGram dice que ${zh("住", "zhù")} indica detenerse o quedar fijo en un lugar. Su ejemplo estrella es ${zh("记住", "jìzhù")}: fijar algo en la memoria. Oxford lo confirma con una frase parecida a ${zh("记住学过的词", "jìzhù xuéguo de cí")}, «recuerda las palabras que has aprendido». Una frase de ejemplo nuestra: ${zh("我记住了这个词", "wǒ jìzhù le zhège cí")}, «memoricé esta palabra».</p>
      <h3>${zh("上", "shàng")}: cerrar</h3>
      <p>MIT solo da un ejemplo, ${zh("关上", "guānshàng")}, y no explica el sentido de ${zh("上", "shàng")}. Como simplificación de la lección, aquí lo ves como «cerrar o unir»: ${zh("请关上门", "qǐng guānshàng mén")}, «cierra la puerta, por favor». No hay regla para otros verbos, así que no la inventamos.</p>
      <h3>Dónde van el objeto y la negación</h3>
      <p>Según ChinGram, el resultado va justo detrás del verbo y el objeto se coloca después del grupo verbo-resultado. El ${zh("了", "le")} también va detrás del grupo, como en ${zh("记住了", "jìzhù le")}. Para negar se pone ${zh("没", "méi")} delante del verbo, y lo que se niega es el resultado, no la acción. Adaptado de un ejemplo de Oxford (que usa otra palabra para «pero», de otro nivel): ${zh("我记了，但是没记住", "wǒ jì le, dànshì méi jìzhù")}, «lo intenté, pero no logré recordarlo». Y ${zh("我没买到票", "wǒ méi mǎidào piào")} es «no conseguí comprar el boleto».</p>
      <p class="nota"><strong>Trampa común:</strong> negar con ${zh("不", "bù")}. Para algo que ya pasó se usa ${zh("没", "méi")}: ${zh("没找到", "méi zhǎodào")}, no ${zh("不找到", "bù zhǎodào")}.</p>`,
    ejemplo: `
      <p>Antes de un viaje, Luis busca su pasaporte. Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Primero solo cuenta que busca: ${zh("我找护照", "wǒ zhǎo hùzhào")}. No dice si lo halló.</li>
        <li>Después de un rato lo encuentra y pega ${zh("到", "dào")} al verbo: ${zh("我找到了护照", "wǒ zhǎodào le hùzhào")}. El objeto va después de ${zh("找到了", "zhǎodào le")}.</li>
        <li>Si no lo hubiera hallado, diría ${zh("我没找到护照", "wǒ méi zhǎodào hùzhào")}: ${zh("没", "méi")} va delante del verbo.</li>
        <li>Para no olvidarlo, repite: ${zh("我记住了", "wǒ jìzhù le")}. Con ${zh("住", "zhù")}, la idea queda fija.</li>
      </ol>
      <p>Comprueba: el resultado ${zh("到", "dào")} está pegado a ${zh("找", "zhǎo")}, sin nada en medio. Resultado: <span class="resultado">${zh("我找到了护照", "wǒ zhǎodào le hùzhào")} = «encontré mi pasaporte»</span>.</p>
      <p class="nota"><strong>Error común:</strong> separar el verbo y el resultado, como ${zh("找护照到", "zhǎo hùzhào dào")}. Van pegados y el objeto va después.</p>`,
    vidaReal: `
      <p>Decir si una acción logró su resultado sirve en muchas situaciones:</p>
      <ul>
        <li>Contarle a una amiga que ya recibiste el regalo que te mandó por correo.</li>
        <li>Avisar en un viaje que conseguiste los boletos o que no los pudiste comprar.</li>
        <li>Explicar que memorizaste las palabras de la clase, o que lo intentaste y no te quedaron.</li>
        <li>Pedirle a alguien que cierre la puerta al salir de una habitación.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>¿Cuál frase dice que ya encontró al profesor?</p>`,
        opciones: [zh('他找老师', 'tā zhǎo lǎoshī'), zh('他找到了老师', 'tā zhǎodào le lǎoshī'), zh('他没找老师', 'tā méi zhǎo lǎoshī'), zh('他想找老师', 'tā xiǎng zhǎo lǎoshī')], correcta: 1,
        pista: '<p>Busca la frase que lleva el resultado pegado al verbo.</p>',
        solucion: `<p>${zh("他找到了老师", "tā zhǎodào le lǎoshī")}: ${zh("到", "dào")} indica que la búsqueda tuvo éxito.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «memoricé esta palabra».</p>',
        respuesta: ['我', '记住', '了', '这个', '词'], pinyin: ['wǒ', 'jìzhù', 'le', 'zhège', 'cí'], lang: 'zh-Hans',
        alternativas: [['我', '记住', '这个', '词', '了']],
        pista: '<p>El verbo y ' + zh("住", "zhù") + ' van pegados; el objeto va después.</p>',
        solucion: `<p>${zh("我记住了这个词", "wǒ jìzhù le zhège cí")}: sujeto, ${zh("记住", "jìzhù")}, ${zh("了", "le")} y el objeto. También sirve ${zh("我记住这个词了", "wǒ jìzhù zhège cí le")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Adaptada de un ejemplo de Oxford, ¿qué quiere decir ${zh("我记了，但是没记住", "wǒ jì le, dànshì méi jìzhù")}?</p>`,
        opciones: ['No lo anoté nunca', 'Lo intenté, pero no logré recordarlo', 'Lo recordé muy bien', 'Lo olvidé hace tiempo'], correcta: 1,
        pista: '<p>Fíjate en qué se niega con ' + zh("没", "méi") + ': el resultado, no el intento.</p>',
        solucion: `<p>${zh("没记住", "méi jìzhù")} niega el resultado: hubo intento, pero no quedó fijo en la memoria.</p>` },
      { tipo: 'opciones', escucha: { voz: '我收到了礼物' },
        sinAudio: '<p>Se dice <strong>wǒ shōudào le lǐwù</strong>: wǒ baja y sube; shōu es alto y plano; dào baja; lǐ baja y sube; wù baja.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué cuenta la persona?</p>',
        opciones: ['Que compró un regalo', 'Que perdió un regalo', 'Que recibió un regalo', 'Que buscó un regalo'], correcta: 2,
        pista: '<p>Piensa qué hace ' + zh("到", "dào") + ' en la primera palabra: indica que algo llegó.</p>',
        solucion: `<p>Se oye ${zh("我收到了礼物", "wǒ shōudào le lǐwù")}: «recibí el regalo».</p>` },
      { tipo: 'opciones', enunciado: '<p>¿Cuál frase dice bien «no conseguí comprar el boleto»?</p>',
        opciones: [zh('我买没到票', 'wǒ mǎi méi dào piào'), zh('我不买到票', 'wǒ bù mǎidào piào'), zh('我没买到票', 'wǒ méi mǎidào piào'), zh('我买到票没', 'wǒ mǎidào piào méi')], correcta: 2,
        pista: '<p>' + zh("没", "méi") + ' va delante del grupo verbo-resultado.</p>',
        solucion: `<p>${zh("我没买到票", "wǒ méi mǎidào piào")}: ${zh("没", "méi")} delante de ${zh("买到", "mǎidào")}.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("护照")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['hù zhào'],
        pista: '<p>Las dos sílabas son de tono cuatro: caen.</p>',
        solucion: `<p>${zh("护照", "hùzhào")}: <strong>hù zhào</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_RESULTADO, MIT_U7, OXFORD_GRAMATICA, MIT_U9],
  });

  // ------------------------------------------------------------------
  // Línea de tiempo de la lección 2: tres sentidos figurados sobre una flecha de tiempo.
  const LINEA_TIEMPO = G({
    x: [0, 10], y: [0, 4], proporcional: true, ejes: false,
    descripcion: 'Línea de tiempo horizontal con una flecha hacia la derecha. Cerca del inicio hay una marca con la etiqueta «empieza». En la parte central hay otra marca con la etiqueta «sigue». Cerca del final hay una tercera marca con la etiqueta «queda anotado». Encima de cada marca aparece el pinyin de la palabra de dirección que lleva ese sentido, y sobre el pinyin, la etiqueta del sentido. Debajo de la flecha dice «tiempo».',
    figuras: [
      ...flecha([0.4, 1.6], [9.7, 1.6], 1),
      lin([1.5, 1.3], [1.5, 1.9]), lin([5, 1.3], [5, 1.9]), lin([8.5, 1.3], [8.5, 1.9]),
      txt(1.5, 2.9, 'empieza'), txt(1.5, 2.3, 'qǐlái'),
      txt(5, 2.9, 'sigue'), txt(5, 2.3, 'xiàqù'),
      txt(8.5, 2.9, 'queda anotado'), txt(8.5, 2.3, 'xiàlái'),
      txt(5, 0.6, 'tiempo'),
    ],
  });

  L('Dirección con sentido figurado: 起来 y 下去', {
    objetivo: `Reconocer ${zh("起来", "qǐlái")}, ${zh("下去", "xiàqù")} y ${zh("下来", "xiàlái")} cuando ya no hablan de moverse sino de recordar, empezar, seguir o anotar.`,
    explicacion: `
      <p>Piensa en un nombre que no recordabas y que, de pronto, vuelve a tu cabeza. En español decimos «me vino a la mente», como si algo subiera. El chino también usa palabras de dirección para ideas que no son de movimiento. Primero, las doce palabras de la lección; las voces del dispositivo pueden variar, y el pinyin manda.</p>
      ${tabla([
        ['突然', 'tūrán', 'de repente'], ['哭', 'kū', 'llorar'], ['坚持', 'jiānchí', 'insistir, seguir adelante'], ['努力', 'nǔlì', 'esforzarse; con esfuerzo'],
        ['安静', 'ānjìng', 'tranquilo, en silencio'], ['爬', 'pá', 'trepar, gatear'], ['搬', 'bān', 'mover, mudar'], ['跳', 'tiào', 'saltar'],
        ['发现', 'fāxiàn', 'descubrir, darse cuenta'], ['声音', 'shēngyīn', 'sonido, voz'], ['故事', 'gùshi', 'historia, cuento'], ['历史', 'lìshǐ', 'historia (el pasado)'],
      ])}
      <h3>Primero el sentido literal</h3>
      <p>Según ChinGram, de la Universidad Palacký, ${zh("起来", "qǐlái")} es «levantarse» hacia quien habla y ${zh("下去", "xiàqù")} es «bajar» alejándose de quien habla; la forma ${zh("起去", "qǐqù")} no existe. Kapiolani CC lo resume: se usa ${zh("来", "lái")} si la acción se acerca a quien habla y ${zh("去", "qù")} si se aleja. El ejemplo de ChinGram es ${zh("爸爸站起来走出房间", "bàba zhàn qǐlái zǒuchū fángjiān")}, «papá se levantó y salió del cuarto». Frases de ejemplo de la lección: ${zh("他跳起来", "tā tiào qǐlái")}, «salta», y ${zh("他走下去了", "tā zǒu xiàqù le")}, «bajó alejándose de mí».</p>
      <h3>Del movimiento a la idea</h3>
      <p>Kapiolani añade que estos complementos tienen significados idiomáticos, además del literal, y MIT avisa de que muchos no se deducen de sus partes, así que se aprenden poco a poco. Estos tienen respaldo:</p>
      ${cuadro(['Frase', 'Qué significa', 'Fuente'], [
        [zh("想起来了", "xiǎng qǐlái le"), '«ya me acordé»', 'MIT: de levantarse a que un recuerdo «surja» en la mente'],
        [zh("写下来", "xiě xiàlái") + ' y ' + zh("记下来", "jì xiàlái"), '«ponerlo por escrito»', 'MIT: los verbos de anotar se completan con ' + zh("下来", "xiàlái")],
      ])}
      <p>Sobre la segunda fila, MIT da ${zh("请把它写下来", "qǐng bǎ tā xiě xiàlái")} como «¿podrías anotarlo?» (la palabra ${zh("把", "bǎ")} se explica en "La estructura ${zh("把")}"). En esta lección ${zh("下来", "xiàlái")} con ese sentido de «queda registrado» vale solo con ${zh("写", "xiě")} y ${zh("记", "jì")}. El sílabo del HSK, en nivel 3, lista tres sentidos ampliados: un resultado, el comienzo de una acción y su continuación.</p>
      ${LINEA_TIEMPO}
      <p>Como simplificación de la lección, se puede recordar así: ${zh("起来", "qǐlái")} marca que algo <strong>empieza</strong> y ${zh("下去", "xiàqù")} marca que <strong>sigue</strong>. Frases de ejemplo de la lección: ${zh("他突然哭起来了", "tā tūrán kū qǐlái le")}, «de repente se puso a llorar»; ${zh("天气热起来了", "tiānqì rè qǐlái le")}, «empieza a hacer calor»; ${zh("请说下去", "qǐng shuō xiàqù")}, «sigue hablando, por favor»; y ${zh("我会坚持学下去", "wǒ huì jiānchí xué xiàqù")}, «seguiré estudiando». La frase del calor sigue el modelo de MIT, que pone ${zh("起来", "qǐlái")} tras un adjetivo para decir que una discusión se intensificó. Como simplificación de la lección, ${zh("起来", "qǐlái")} no solo va con verbos: también puede ir tras una palabra que describe cómo está algo, y entonces dice que ese estado está comenzando.</p>
      <p class="nota"><strong>Trampa común:</strong> mezclar las direcciones. Para «empezar» no existe ${zh("起去", "qǐqù")}; se dice ${zh("起来", "qǐlái")}. Y no cambies ${zh("下来", "xiàlái")} por ${zh("下去", "xiàqù")} al anotar: ${zh("写下来", "xiě xiàlái")} es la forma con respaldo.</p>`,
    ejemplo: `
      <p>Ana no recordaba el nombre de un compañero y, al final de la clase de ${zh("历史", "lìshǐ")}, lo cuenta.</p>
      <ol class="pasos-ej">
        <li>Primero dice qué pasó: ${zh("我忘了他的名字", "wǒ wàng le tā de míngzi")}, «olvidé su nombre».</li>
        <li>Después de un rato, le vuelve a la mente: ${zh("我想起来了", "wǒ xiǎng qǐlái le")}. La idea de «subir» se convierte en «ya me acordé».</li>
        <li>Para no olvidarlo otra vez, lo pone por escrito: ${zh("我写下来", "wǒ xiě xiàlái")}. Con ${zh("写", "xiě")}, ${zh("下来", "xiàlái")} dice que quedó registrado.</li>
        <li>Su amigo quiere oír más sobre el cuento y le pide: ${zh("请说下去", "qǐng shuō xiàqù")}, «sigue». Aquí ${zh("下去", "xiàqù")} ya no baja nada: la conversación continúa.</li>
      </ol>
      <p>Comprueba: ${zh("想起来", "xiǎng qǐlái")} y ${zh("写下来", "xiě xiàlái")} llevan cada uno su verbo antes del complemento. Resultado: <span class="resultado">${zh("我想起来了，我写下来", "wǒ xiǎng qǐlái le, wǒ xiě xiàlái")} = «ya me acordé y lo anoté»</span>.</p>`,
    vidaReal: `
      <p>Estos complementos sirven en la conversación diaria:</p>
      <ul>
        <li>Decirle a un compañero que por fin te acordaste de algo que buscabas en tu memoria.</li>
        <li>Pedir a alguien que anote una dirección o un número de teléfono.</li>
        <li>Animar a un amigo a que siga contando su historia sin parar a la mitad.</li>
        <li>Avisar de que el clima o el ambiente de una reunión empieza a cambiar y que conviene prepararse.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Según ChinGram y MIT, ¿qué significa ${zh("站起来", "zhàn qǐlái")}?</p>`,
        opciones: ['Sentarse', 'Caminar despacio', 'Quedarse quieto', 'Ponerse de pie'], correcta: 3,
        pista: '<p>' + zh("起来", "qǐlái") + ' habla de subir, de levantarse.</p>',
        solucion: `<p>${zh("站起来", "zhàn qǐlái")} es «ponerse de pie»: es el sentido literal de ${zh("起来", "qǐlái")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según MIT, ¿qué dice una persona que exclama ${zh("想起来了", "xiǎng qǐlái le")}?</p>`,
        opciones: ['Ya me acordé', 'Voy a viajar', 'Me levanto ahora', 'No entiendo nada'], correcta: 0,
        pista: '<p>MIT habla de un recuerdo que «surge» en la mente.</p>',
        solucion: `<p>${zh("想起来了", "xiǎng qǐlái le")} = «ya me acordé»: el recuerdo sube a la mente.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «escríbelo, por favor» (poner por escrito).</p>',
        respuesta: ['请', '你', '写', '下来'], pinyin: ['qǐng', 'nǐ', 'xiě', 'xiàlái'], lang: 'zh-Hans',
        pista: '<p>' + zh("请", "qǐng") + ' abre la petición y ' + zh("下来", "xiàlái") + ' va pegado al verbo de escribir.</p>',
        solucion: `<p>${zh("请你写下来", "qǐng nǐ xiě xiàlái")}: petición, a quién, verbo y ${zh("下来", "xiàlái")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '请你写下来' },
        sinAudio: '<p>Se dice <strong>qǐng nǐ xiě xiàlái</strong>: qǐng, nǐ y xiě bajan y suben; xià baja; lái sube.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué te piden?</p>',
        opciones: ['Que lo leas en voz alta', 'Que lo anotes por escrito', 'Que lo borres', 'Que lo traigas mañana'], correcta: 1,
        pista: '<p>Escucha otra vez y fíjate en el verbo del medio y en la palabra que lo cierra.</p>',
        solucion: `<p>Se oye ${zh("请你写下来", "qǐng nǐ xiě xiàlái")}: «anótalo, por favor».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("下来")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['xià lái', 'xià lai'],
        pista: '<p>La primera sílaba baja; la segunda sube.</p>',
        solucion: `<p>${zh("下来", "xiàlái")}: <strong>xià lái</strong>.</p>` },
      { tipo: 'opciones', enunciado: '<p>Tú estás arriba de una escalera y tu amigo baja alejándose de ti. ¿Qué frase lo cuenta?</p>',
        opciones: [zh('他走下来了', 'tā zǒu xiàlái le'), zh('他走回来了', 'tā zǒu huílái le'), zh('他走下去了', 'tā zǒu xiàqù le'), zh('他走上去了', 'tā zǒu shàngqù le')], correcta: 2,
        pista: '<p>Kapiolani CC: si la acción se aleja de quien habla, se usa ' + zh("去", "qù") + '.</p>',
        solucion: `<p>${zh("他走下去了", "tā zǒu xiàqù le")}: ${zh("下", "xià")} es bajar y ${zh("去", "qù")} dice que se aleja.</p>` },
    ],
    fuentes: [SILABO, CHIN_DIRECCION, KAPIOLANI_DIR, MIT_U7, MIT_U8],
  });

  // ------------------------------------------------------------------
  L('Se puede o no se puede: 得 y 不 tras el verbo', {
    objetivo: `Decir que puedes o no puedes lograr algo metiendo ${zh("得", "de")} o ${zh("不", "bù")} entre el verbo y su resultado, y distinguirlo de ${zh("没", "méi")}.`,
    explicacion: `
      <p>Frente a un letrero en un idioma que no conoces, piensas «no puedo leerlo». No es lo mismo que «no quise leerlo»: habla de si te es posible. En chino, con una combinación verbo-resultado no hace falta un verbo aparte como «poder»; basta meter una palabrita dentro de la combinación verbo-resultado. Primero, las doce palabras de la lección. Si la voz de tu dispositivo suena rara, guíate por el pinyin.</p>
      ${tabla([
        ['清楚', 'qīngchu', 'claro, con claridad'], ['明白', 'míngbai', 'entender, estar claro'], ['黑板', 'hēibǎn', 'pizarra'], ['字典', 'zìdiǎn', 'diccionario de caracteres'],
        ['词典', 'cídiǎn', 'diccionario de palabras'], ['饱', 'bǎo', 'lleno, satisfecho de comer'], ['菜单', 'càidān', 'menú de un restaurante'], ['难', 'nán', 'difícil'],
        ['容易', 'róngyì', 'fácil'], ['简单', 'jiǎndān', 'sencillo'], ['不行', 'bùxíng', 'no se puede, no sirve'], ['句子', 'jùzi', 'oración, frase'],
      ])}
      <h3>La fórmula: verbo, ${zh("得", "de")} o ${zh("不", "bù")}, resultado</h3>
      <p>La guía de Oxford la escribe así: un verbo de acción, luego ${zh("得", "de")} (afirmativo) o ${zh("不", "bù")} (negativo) y por último un complemento de resultado o de dirección. MIT lo explica como insertar ${zh("得", "de")} o ${zh("不", "bù")} en una combinación acción-resultado para obtener la forma de posibilidad. Ya conoces las combinaciones, como ${zh("看懂", "kàndǒng")} o ${zh("听见", "tīngjiàn")}. Con ${zh("得", "de")} dicen «puedo»: ${zh("听得懂", "tīngdedǒng")}. Con ${zh("不", "bù")} dicen «no puedo»: ${zh("听不懂", "tīngbudǒng")}.</p>
      <p>Frases de ejemplo de la lección, con el modelo de MIT: ${zh("你听得懂中文吗", "nǐ tīngdedǒng zhōngwén ma")}, «¿entiendes el chino cuando lo oyes?», y ${zh("我听不懂", "wǒ tīngbudǒng")}, «no lo entiendo». Oxford da dos más: ${zh("我听不见你说的话", "wǒ tīngbujiàn nǐ shuō de huà")}, «no oigo lo que dices», y ${zh("我们做不完", "wǒmen zuòbuwán")}, «no podemos terminar». Con ${zh("清楚", "qīngchu")}, ChinGram da ${zh("听清楚", "tīng qīngchu")}, «oír con claridad»; de ahí sale, como frase de la lección, ${zh("看不清楚黑板", "kànbuqīngchu hēibǎn")}, «no veo bien la pizarra».</p>
      <p>Este ${zh("得", "de")} suena igual que el de "Complemento de grado: ${zh("得")}", pero trabaja distinto: allí va tras el verbo para valorarlo; aquí va dentro de la combinación, antes del resultado.</p>
      <h3>También con direcciones</h3>
      <p>Kapiolani CC explica que, si añades ${zh("得", "de")} a un complemento de dirección, obtienes la posibilidad afirmativa, y con ${zh("不", "bù")}, la negativa. Sus ejemplos: ${zh("回去", "huíqù")}, «volver»; ${zh("回得去", "huídeqù")}, «poder volver»; ${zh("回不去", "huíbuqù")}, «no poder volver». Igual con ${zh("站起来", "zhàn qǐlái")}: ${zh("站得起来", "zhàndeqǐlái")} y ${zh("站不起来", "zhànbuqǐlái")}. MIT suma ${zh("记不下来", "jìbuxiàlái")}, que aparece en la lección anterior con ${zh("下来", "xiàlái")}.</p>
      <h3>¿Posibilidad o hecho?</h3>
      <p>MIT señala que, con ${zh("得", "de")} o ${zh("不", "bù")} dentro, la construcción es de posibilidad y no de hecho; ${zh("看不懂", "kànbudǒng")} es «no lograr entender». Para un hecho se usa ${zh("没", "méi")}, que ChinGram pone antes del verbo. Con el par de ejemplos de las fuentes:</p>
      ${cuadro(['', 'Hecho (ya pasó)', 'Posibilidad'], [
        ['Sí', zh("听懂了", "tīngdǒng le") + '<br>«entendí»', zh("听得懂", "tīngdedǒng") + '<br>«puedo entender»'],
        ['No', zh("没听懂", "méi tīngdǒng") + '<br>«no entendí»', zh("听不懂", "tīngbudǒng") + '<br>«no puedo entender»'],
      ])}
      <p>ChinGram aclara que ${zh("没听懂", "méi tīngdǒng")} significa que la persona oyó, pero no captó el sentido. MIT añade que con un verbo solo se usa ${zh("能", "néng")}, como en ${zh("不能去", "bù néng qù")}, pero con combinaciones verbo-resultado se prefiere esta forma.</p>
      <p class="nota"><strong>Trampa común:</strong> usarla con cualquier resultado. Oxford deja fuera ${zh("在", "zài")}, ${zh("给", "gěi")} y ${zh("错", "cuò")}: con ellos no se forma esta posibilidad.</p>`,
    ejemplo: `
      <p>Luis está en clase, sentado al fondo, y el profesor escribe una oración en la pizarra.</p>
      <ol class="pasos-ej">
        <li>Quiere decir que no alcanza a verla: pega el resultado ${zh("清楚", "qīngchu")} al verbo ${zh("看", "kàn")} y mete ${zh("不", "bù")} en medio: ${zh("我看不清楚黑板", "wǒ kànbuqīngchu hēibǎn")}.</li>
        <li>Se acerca y ya puede leerla: cambia ${zh("不", "bù")} por ${zh("得", "de")}, ${zh("我看得清楚", "wǒ kàndeqīngchu")}.</li>
        <li>Lee el ${zh("句子", "jùzi")}, pero dice ${zh("我看不懂这个句子", "wǒ kànbudǒng zhège jùzi")}: ahora no puede entenderla.</li>
        <li>Más tarde la busca en el diccionario y cuenta qué pasó de verdad: ${zh("我没看懂", "wǒ méi kàndǒng")}, un hecho de ese momento, no una posibilidad.</li>
      </ol>
      <p>Comprueba: en cada caso, ${zh("得", "de")} o ${zh("不", "bù")} está entre el verbo y el resultado, y ${zh("没", "méi")} queda antes del verbo. Resultado: <span class="resultado">${zh("我看不懂这个句子", "wǒ kànbudǒng zhège jùzi")} = «no logro entender esta oración»</span>.</p>`,
    vidaReal: `
      <p>Decir si algo es posible o imposible sirve todos los días:</p>
      <ul>
        <li>Avisar en clase que desde tu lugar no ves bien lo que escribe el profesor.</li>
        <li>Decirle a un amigo que no alcanzas a oír lo que dice por el ruido de la calle.</li>
        <li>Explicar en un restaurante que no logras entender el menú escrito.</li>
        <li>Contar que hoy no vas a poder terminar todo el trabajo que te dejaron.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Según MIT, ¿qué quiere decir ${zh("听不懂", "tīngbudǒng")}?</p>`,
        opciones: ['Ya entendí lo que oí', 'No quise escuchar', 'No puedo entenderlo', 'Lo entenderé mañana'], correcta: 2,
        pista: '<p>' + zh("不", "bù") + ' dentro de la combinación habla de posibilidad.</p>',
        solucion: `<p>${zh("听不懂", "tīngbudǒng")} es «no logro entender lo que oigo».</p>` },
      { tipo: 'opciones', enunciado: `<p>Quieres decir, como un hecho que ya pasó, «no entendí lo que oí». ¿Qué frase eliges?</p>`,
        opciones: [zh('我没听懂', 'wǒ méi tīngdǒng'), zh('我听不懂', 'wǒ tīngbudǒng'), zh('我听得懂', 'wǒ tīngdedǒng'), zh('我听懂了', 'wǒ tīngdǒng le')], correcta: 0,
        pista: '<p>MIT: el hecho se niega con ' + zh("没", "méi") + ' antes del verbo.</p>',
        solucion: `<p>${zh("我没听懂", "wǒ méi tīngdǒng")}: ${zh("没", "méi")} niega que se haya logrado entender.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «no oigo lo que dices».</p>',
        respuesta: ['我', '听不见', '你', '说', '的', '话'], pinyin: ['wǒ', 'tīngbujiàn', 'nǐ', 'shuō', 'de', 'huà'], lang: 'zh-Hans',
        alternativas: [['你', '说', '的', '话', '我', '听不见']],
        pista: '<p>' + zh("不", "bù") + ' va dentro del grupo ' + zh("听见", "tīngjiàn") + '.</p>',
        solucion: `<p>${zh("我听不见你说的话", "wǒ tīngbujiàn nǐ shuō de huà")}. También vale poner primero lo que dices: ${zh("你说的话我听不见", "nǐ shuō de huà wǒ tīngbujiàn")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '我看不懂菜单' },
        sinAudio: '<p>Se dice <strong>wǒ kànbudǒng càidān</strong>: wǒ baja y sube; kàn baja; bu es ligero; dǒng baja y sube; cài baja; dān es alto y plano.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué problema cuenta la persona?</p>',
        opciones: ['No puede pagar la cuenta', 'No logra entender el menú', 'No tiene hambre', 'No encuentra el restaurante'], correcta: 1,
        pista: '<p>Escucha dos veces: el problema está en la combinación del medio, y lo que se mira es la última palabra.</p>',
        solucion: `<p>Se oye ${zh("我看不懂菜单", "wǒ kànbudǒng càidān")}: «no logro entender el menú».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("清楚")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['qīng chu'],
        pista: '<p>La primera sílaba es alta y plana; la segunda es ligera.</p>',
        solucion: `<p>${zh("清楚", "qīngchu")}: <strong>qīng chu</strong>.</p>` },
      { tipo: 'opciones', enunciado: `<p>Hoy hay demasiados ejercicios y no podemos terminarlos, como en el ejemplo de Oxford. ¿Qué frase lo dice?</p>`,
        opciones: [zh('今天的题太多了，我们做完不', 'jīntiān de tí tài duō le, wǒmen zuòwán bù'), zh('今天的题太多了，我们做不完', 'jīntiān de tí tài duō le, wǒmen zuòbuwán'), zh('今天的题太多了，我们不做完', 'jīntiān de tí tài duō le, wǒmen bú zuòwán'), zh('今天的题太多了，我们做得不完', 'jīntiān de tí tài duō le, wǒmen zuòdebùwán')], correcta: 1,
        pista: '<p>' + zh("不", "bù") + ' va entre ' + zh("做", "zuò") + ' y ' + zh("完", "wán") + '.</p>',
        solucion: `<p>${zh("做不完", "zuòbuwán")}: verbo, ${zh("不", "bù")} y resultado.</p>` },
    ],
    fuentes: [SILABO, CHIN_RESULTADO, KAPIOLANI_DIR, MIT_U7, MIT_U5, MIT_U8, OXFORD_GRAMATICA],
  });

  // ------------------------------------------------------------------
  // Esquema de la lección 4: la frase 把 como una fila de bloques.
  const BLOQUES_BA = G({
    x: [0, 10], y: [0, 4], proporcional: true, ejes: false,
    descripcion: 'Esquema de una frase con la estructura 把 como una fila de cinco bloques, de izquierda a derecha. El primero es el sujeto, con el pinyin «wǒ». El segundo es la palabra que destaca el objeto, con el pinyin «bǎ». El tercero es el objeto, con el pinyin «chènshān». El cuarto es el verbo, con el pinyin «xǐ». El quinto es el algo más que se añade al verbo, con el pinyin «gānjìng le». Debajo de los bloques, una flecha va del objeto hacia el último bloque, con el texto «qué le pasa al objeto».',
    figuras: [
      caja(0.1, 1.2, 1.7, 2.6), txt(0.9, 1.9, 'wǒ'), txt(0.9, 3.0, 'sujeto'),
      caja(2.0, 1.2, 3.6, 2.6), txt(2.8, 1.9, 'bǎ'), txt(2.8, 3.0, 'destaca'),
      caja(3.9, 1.2, 5.9, 2.6), txt(4.9, 1.9, 'chènshān'), txt(4.9, 3.0, 'objeto'),
      caja(6.2, 1.2, 7.4, 2.6), txt(6.8, 1.9, 'xǐ'), txt(6.8, 3.0, 'verbo'),
      caja(7.7, 1.2, 9.9, 2.6), txt(8.8, 1.9, 'gānjìng le'), txt(8.8, 3.0, 'algo más'),
      ...flecha([4.9, 0.9], [8.8, 0.9], 1), txt(6.85, 0.35, 'qué le pasa al objeto'),
    ],
  });

  L('La estructura 把', {
    objetivo: `Poner el objeto antes del verbo con ${zh("把", "bǎ")} para decir qué le pasa, y colocar bien el verbo, el resultado y la negación.`,
    explicacion: `
      <p>Imagina que dices: «lava esa camisa, la manchada». Quieres que la atención vaya a la camisa y a lo que le va a pasar. El chino tiene una estructura para eso, con la palabra ${zh("把", "bǎ")}. Primero, las doce palabras de la lección.</p>
      ${tabla([
        ['把', 'bǎ', 'palabra que destaca el objeto'], ['打扫', 'dǎsǎo', 'limpiar, barrer'], ['干净', 'gānjìng', 'limpio'], ['脏', 'zāng', 'sucio'],
        ['衬衫', 'chènshān', 'camisa'], ['箱子', 'xiāngzi', 'caja, maleta'], ['冰箱', 'bīngxiāng', 'refrigerador'], ['洗衣机', 'xǐyījī', 'lavadora'],
        ['盘子', 'pánzi', 'plato'], ['碗', 'wǎn', 'tazón'], ['筷子', 'kuàizi', 'palillos para comer'], ['换', 'huàn', 'cambiar, reemplazar'],
      ])}
      <h3>¿Qué hace ${zh("把", "bǎ")}?</h3>
      <p>Según MIT, ${zh("把", "bǎ")} viene de un verbo que significa «tomar» y sirve para destacar un objeto que se va a mover, romper, preparar o cambiar de algún modo. La guía de Oxford dice que indica lo que se hace a un objeto concreto o cómo se hace. El molde es: sujeto, ${zh("把", "bǎ")}, objeto, verbo y algo más.</p>
      ${BLOQUES_BA}
      <p>Una frase de ejemplo de la lección: ${zh("我把衬衫洗干净了", "wǒ bǎ chènshān xǐ gānjìng le")}, «lavé la camisa hasta dejarla limpia». Fíjate que el objeto ${zh("衬衫", "chènshān")} va antes del verbo, no después.</p>
      <h3>¿Por qué el verbo no va solo?</h3>
      <p>MIT explica que ${zh("把", "bǎ")} se asocia con una combinación verbo-resultado o, como mínimo, con un verbo más ${zh("了", "le")} o un verbo repetido. Oxford dice lo mismo: son verbos de acción con palabras de resultado, de dirección u otros elementos. La razón está en el sentido: ${zh("把", "bǎ")} habla de lo que le pasa al objeto, y por eso el verbo debe contar un cambio. Por eso verbos como ${zh("喜欢", "xǐhuan")} o ${zh("看", "kàn")} no piden ${zh("把", "bǎ")}, según MIT: no cambian a su objeto. Frases de ejemplo de la lección:</p>
      ${cuadro(['Lo que se añade al verbo', 'Frase de ejemplo'], [
        ['Resultado', zh("他把房间打扫干净了", "tā bǎ fángjiān dǎsǎo gānjìng le") + '<br>«dejó el cuarto limpio»'],
        ['Resultado de dirección', zh("我把衬衫放进洗衣机里", "wǒ bǎ chènshān fàngjìn xǐyījī lǐ") + '<br>«metí la camisa en la lavadora»'],
        ['Solo ' + zh("了", "le"), zh("他把脏衬衫换了", "tā bǎ zāng chènshān huàn le") + '<br>«cambió la camisa sucia»'],
      ])}
      <p>Un ejemplo de MIT que ya conoces: ${zh("请把它关上", "qǐng bǎ tā guānshàng")}, «ciérralo, por favor», con ${zh("关上", "guānshàng")} de "Más resultados: ${zh("到, 住")} y ${zh("上")}". Y ${zh("请把它写下来", "qǐng bǎ tā xiě xiàlái")}, «¿podrías anotarlo?», con ${zh("下来", "xiàlái")} de "Dirección con sentido figurado: ${zh("起来")} y ${zh("下去")}".</p>
      <h3>El objeto debe ser concreto</h3>
      <p>MIT da el ejemplo de una ventana: si el hablante quiere indicar una concreta, usa ${zh("把", "bǎ")}; sin ${zh("把", "bǎ")} sirve cualquiera. La instrucción sobre objetos particulares casi siempre lo pide. USC lo confirma: lo que se trata o afecta tiene que ser específico. Con la lección: ${zh("请把门打开", "qǐng bǎ mén dǎkāi")} se refiere a esa puerta.</p>
      <h3>Dónde va la negación</h3>
      <p>MIT y USC coinciden: ${zh("没", "méi")}, ${zh("别", "bié")} o un modal van <strong>antes</strong> de ${zh("把", "bǎ")}. MIT lo muestra con ${zh("没把", "méi bǎ")}. Frase de ejemplo: ${zh("我没把箱子搬下来", "wǒ méi bǎ xiāngzi bān xiàlái")}, «no bajé la caja».</p>
      <p class="nota"><strong>Trampa común:</strong> dejar el verbo solo, como ${zh("我把衬衫洗", "wǒ bǎ chènshān xǐ")}. Falta decir qué pasó con la camisa.</p>`,
    ejemplo: `
      <p>Después de cenar, Ana ayuda a su mamá a recoger la cocina. Sigamos la conversación paso a paso.</p>
      <ol class="pasos-ej">
        <li>Mira los ${zh("盘子", "pánzi")} y los ${zh("碗", "wǎn")} que quedaron en la mesa y ve que están manchados: ${zh("盘子和碗很脏", "pánzi hé wǎn hěn zāng")}.</li>
        <li>Su mamá le pide: ${zh("请把盘子洗干净", "qǐng bǎ pánzi xǐ gānjìng")}. Habla de esos platos, y el verbo lleva ${zh("干净", "gānjìng")} detrás.</li>
        <li>Ana termina y lo cuenta: ${zh("我把盘子洗干净了", "wǒ bǎ pánzi xǐ gānjìng le")}. El ${zh("了", "le")} va al final.</li>
        <li>No acomodó los palillos y lo niega con ${zh("没", "méi")} antes de ${zh("把", "bǎ")}: ${zh("我没把筷子放好", "wǒ méi bǎ kuàizi fàng hǎo")}.</li>
      </ol>
      <p>Comprueba: el objeto va entre ${zh("把", "bǎ")} y el verbo, y el verbo siempre lleva algo más. Resultado: <span class="resultado">${zh("我把盘子洗干净了", "wǒ bǎ pánzi xǐ gānjìng le")} = «dejé los platos limpios»</span>.</p>`,
    vidaReal: `
      <p>Esta estructura aparece cuando hablas de arreglar y mover cosas:</p>
      <ul>
        <li>Pedirle a alguien de tu casa que deje limpia la mesa después de comer.</li>
        <li>Contar que ya metiste la ropa sucia en la lavadora y que falta secarla.</li>
        <li>Pedir que cierren una puerta o ventana en particular, no cualquiera de la casa.</li>
        <li>Decir que todavía no guardaste algo en su lugar, como la leche en el refrigerador.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «lavé la camisa hasta dejarla limpia».</p>',
        respuesta: ['我', '把', '衬衫', '洗', '干净', '了'], pinyin: ['wǒ', 'bǎ', 'chènshān', 'xǐ', 'gānjìng', 'le'], lang: 'zh-Hans',
        pista: '<p>El objeto va entre ' + zh("把", "bǎ") + ' y el verbo.</p>',
        solucion: `<p>${zh("我把衬衫洗干净了", "wǒ bǎ chènshān xǐ gānjìng le")}: sujeto, ${zh("把", "bǎ")}, objeto, verbo, resultado y ${zh("了", "le")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>Según MIT, ¿con cuál verbo no se usa la estructura ' + zh("把", "bǎ") + ', porque no cambia a su objeto?</p>',
        opciones: [zh('洗', 'xǐ'), zh('打扫', 'dǎsǎo'), zh('喜欢', 'xǐhuan'), zh('换', 'huàn')], correcta: 2,
        pista: '<p>Piensa en qué verbo solo expresa un gusto, sin transformar nada.</p>',
        solucion: `<p>${zh("喜欢", "xǐhuan")} no cambia a su objeto; ${zh("洗", "xǐ")}, ${zh("打扫", "dǎsǎo")} y ${zh("换", "huàn")} sí.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «no bajé la caja».</p>',
        respuesta: ['我', '没', '把', '箱子', '搬', '下来'], pinyin: ['wǒ', 'méi', 'bǎ', 'xiāngzi', 'bān', 'xiàlái'], lang: 'zh-Hans',
        pista: '<p>La negación va antes de ' + zh("把", "bǎ") + '.</p>',
        solucion: `<p>${zh("我没把箱子搬下来", "wǒ méi bǎ xiāngzi bān xiàlái")}: ${zh("没", "méi")} delante de ${zh("把", "bǎ")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres pedir que abran una puerta concreta, la que señalas. ¿Qué frase usa la estructura?</p>',
        opciones: [zh('请开门', 'qǐng kāimén'), zh('请把门打开', 'qǐng bǎ mén dǎkāi'), zh('请门打开', 'qǐng mén dǎkāi'), zh('请打开把门', 'qǐng dǎkāi bǎ mén')], correcta: 1,
        pista: '<p>MIT: para algo específico, ' + zh("把", "bǎ") + ' va antes del objeto y el verbo lleva algo más.</p>',
        solucion: `<p>${zh("请把门打开", "qǐng bǎ mén dǎkāi")}: ${zh("把", "bǎ")}, el objeto y después ${zh("打开", "dǎkāi")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '我把箱子搬下来了' },
        sinAudio: '<p>Se dice <strong>wǒ bǎ xiāngzi bān xiàlái le</strong>: wǒ y bǎ bajan y suben; xiāng es alto y plano; zi es ligero; bān es alto y plano; xià baja; lái sube.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué cuenta la persona?</p>',
        opciones: ['Que compró una caja', 'Que perdió una caja', 'Que rompió una caja', 'Que bajó una caja'], correcta: 3,
        pista: '<p>Fíjate en la dirección que marca la última palabra.</p>',
        solucion: `<p>Se oye ${zh("我把箱子搬下来了", "wǒ bǎ xiāngzi bān xiàlái le")}: «bajé la caja».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("冰箱")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['bīng xiāng'],
        pista: '<p>Las dos sílabas son altas y planas.</p>',
        solucion: `<p>${zh("冰箱", "bīngxiāng")}: <strong>bīng xiāng</strong>.</p>` },
    ],
    fuentes: [SILABO, MIT_CURSO, OXFORD_L21, USC_BA, MIT_U9, MIT_U8],
  });

  // --- Lecciones 5 a 8: segundo constructor ---

  // ------------------------------------------------------------------
  // Esquema de la lección 5: la frase 被 como una fila de bloques.
  const BLOQUES_BEI = G({
    x: [0, 10], y: [0, 4], proporcional: true, ejes: false,
    descripcion: 'Esquema de una frase con la palabra de la voz pasiva como una fila de cuatro bloques, de izquierda a derecha. El primero es lo afectado, con el pinyin «zìxíngchē». El segundo es la palabra que marca la voz pasiva, con el pinyin «bèi». El tercero es quien hace la acción, con el pinyin «línjū». El cuarto es el verbo con su resultado, con el pinyin «qí zǒu le». Debajo, una flecha que va del primero al último con el texto «qué le pasó a lo afectado».',
    figuras: [
      caja(0.1, 1.2, 2.9, 2.6), txt(1.5, 1.9, 'zìxíngchē'), txt(1.5, 3.0, 'lo afectado'),
      caja(3.2, 1.2, 4.6, 2.6), txt(3.9, 1.9, 'bèi'), txt(3.9, 3.0, 'marca'),
      caja(4.9, 1.2, 6.9, 2.6), txt(5.9, 1.9, 'línjū'), txt(5.9, 3.0, 'quien lo hace'),
      caja(7.2, 1.2, 9.9, 2.6), txt(8.55, 1.9, 'qí zǒu le'), txt(8.55, 3.0, 'verbo + más'),
      ...flecha([1.5, 0.9], [8.55, 0.9], 1), txt(5.0, 0.35, 'qué le pasó a lo afectado'),
    ],
  });

  L('La voz pasiva con 被', {
    objetivo: `Decir qué le pasó a algo o a alguien con ${zh("被", "bèi")}, empezando por lo afectado, y reconocer cuándo se puede omitir quién lo hizo.`,
    explicacion: `
      <p>Si alguien se lleva tu bicicleta, en español puedes decir «mi bici fue llevada» o «se la llevaron». Te importa más la bicicleta que quien la tomó. El chino tiene una estructura para esto, con la palabra ${zh("被", "bèi")}. Primero, las doce palabras de la lección.</p>
      ${tabla([
        ['被', 'bèi', 'palabra de la voz pasiva'], ['丢', 'diū', 'perder, extraviar'], ['伞', 'sǎn', 'paraguas'], ['自行车', 'zìxíngchē', 'bicicleta'],
        ['骑', 'qí', 'montar, ir en bicicleta'], ['小心', 'xiǎoxīn', 'tener cuidado'], ['生气', 'shēngqì', 'enojarse'], ['发生', 'fāshēng', 'ocurrir, suceder'],
        ['着急', 'zháojí', 'preocuparse, impacientarse'], ['邻居', 'línjū', 'vecino'], ['汽车', 'qìchē', 'automóvil'], ['司机', 'sījī', 'conductor'],
      ])}
      <h3>Lo afectado va primero</h3>
      <p>MIT explica que en español y en chino se reordenan quien actúa y quien recibe la acción para que el que recibe sea el punto de partida. Oxford dice que ${zh("被", "bèi")} indica cómo alguien o algo trata o dispone de un objeto concreto. El sílabo del HSK, en nivel 3, da dos moldes: sujeto, ${zh("被", "bèi")}, quien lo hace, verbo y otros elementos; o lo mismo sin quien lo hace. Aquí el «sujeto» es lo que recibe la acción.</p>
      ${BLOQUES_BEI}
      <p>Una frase de ejemplo de la lección: ${zh("自行车被邻居骑走了", "zìxíngchē bèi línjū qí zǒu le")}, «el vecino se llevó la bicicleta». Primero va la bicicleta, que es lo afectado; después ${zh("被", "bèi")}; después el vecino, que hizo la acción; al final el verbo con su resultado.</p>
      <h3>Comparación con ${zh("把", "bǎ")}</h3>
      <p>Oxford y MIT comparan las dos estructuras con el mismo hecho. Con ${zh("把", "bǎ")} la frase empieza por quien actúa; con ${zh("被", "bèi")}, por lo afectado. Frases de ejemplo de la lección:</p>
      ${cuadro(['Estructura', 'Frase de ejemplo', 'Empieza por'], [
        [zh("把", "bǎ"), zh("邻居把自行车骑走了", "línjū bǎ zìxíngchē qí zǒu le"), 'quien actúa'],
        [zh("被", "bèi"), zh("自行车被邻居骑走了", "zìxíngchē bèi línjū qí zǒu le"), 'lo afectado'],
      ])}
      <h3>Quien lo hace puede faltar</h3>
      <p>Según MIT, ${zh("被", "bèi")} no se omite, pero la palabra que viene después, quien actúa, sí puede omitirse. Frase de ejemplo: ${zh("自行车被骑走了", "zìxíngchē bèi qí zǒu le")}, «se llevaron la bicicleta». Como simplificación de la lección, sirve cuando no sabes quién fue o no importa.</p>
      <h3>Casi siempre, algo malo</h3>
      <p>MIT avisa de que ${zh("被", "bèi")} aparece casi siempre, aunque no siempre, con acciones de efecto adverso: algo que se rompe, se pierde o se roba. También dice que estas frases suelen comentar desgracias. Dos palabras de hoy, ${zh("着急", "zháojí")} y ${zh("生气", "shēngqì")}, hablan de cómo se siente alguien ante algo así.</p>
      <h3>El verbo no va solo</h3>
      <p>Oxford observa que los elementos que acompañan al verbo en las frases con ${zh("被", "bèi")} se parecen a los de ${zh("把", "bǎ")}: resultados, direcciones y ${zh("了", "le")}. El sílabo pide «otros elementos» detrás del verbo. Por eso decimos ${zh("骑走了", "qí zǒu le")} y no solo ${zh("骑", "qí")}.</p>
      <p class="nota"><strong>Trampa común:</strong> poner a quien actúa antes de ${zh("被", "bèi")}, como si fuera español: ${zh("邻居被自行车骑走了", "línjū bèi zìxíngchē qí zǒu le")} diría que el vecino fue llevado por la bicicleta. Lo afectado va primero.</p>
      <p>Las fuentes de esta lección no explican cómo se niega una frase con ${zh("被", "bèi")}, así que aquí no la practicamos.</p>`,
    ejemplo: `
      <p>Ana sale de la escuela y no encuentra su bicicleta. Sigue estos pasos para contar lo que pasó.</p>
      <ol class="pasos-ej">
        <li>Mira el lugar donde la dejó y ve que está vacío. Dice: ${zh("我的自行车不在这儿", "wǒ de zìxíngchē bú zài zhèr")}.</li>
        <li>Un compañero le cuenta que vio a un ${zh("邻居", "línjū")} montarla. Ana piensa primero en la bicicleta, que es lo afectado.</li>
        <li>Entonces arma la frase: lo afectado, ${zh("被", "bèi")}, quien lo hizo y el verbo con resultado: ${zh("自行车被邻居骑走了", "zìxíngchē bèi línjū qí zǒu le")}.</li>
        <li>Como no sabe bien quién fue, también puede decir ${zh("自行车被骑走了", "zìxíngchē bèi qí zǒu le")}, sin el vecino.</li>
        <li>Se siente ${zh("着急", "zháojí")}, y la frase cuenta algo malo, como suele pasar con ${zh("被", "bèi")}.</li>
      </ol>
      <p>Comprueba: la bicicleta va primero, y el verbo lleva ${zh("走了", "zǒu le")} detrás. Resultado: <span class="resultado">${zh("自行车被邻居骑走了", "zìxíngchē bèi línjū qí zǒu le")} = «el vecino se llevó la bicicleta»</span>.</p>`,
    vidaReal: `
      <p>Esta estructura sirve cuando cuentas algo que le pasó a una cosa o a una persona:</p>
      <ul>
        <li>Avisar a tu familia de que un paraguas se quedó olvidado en el autobús y no se encuentra.</li>
        <li>Contar que a un amigo le llevaron la bicicleta de la entrada sin que nadie viera quién fue.</li>
        <li>Avisar a un vecino de que su automóvil ya no está, porque alguien se lo llevó.</li>
        <li>Entender a alguien que cuenta una desgracia en la que lo importante es lo que le pasó a la cosa.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «el vecino se llevó la bicicleta».</p>',
        respuesta: ['自行车', '被', '邻居', '骑', '走', '了'], pinyin: ['zìxíngchē', 'bèi', 'línjū', 'qí', 'zǒu', 'le'], lang: 'zh-Hans',
        pista: '<p>Lo afectado va primero.</p>',
        solucion: `<p>${zh("自行车被邻居骑走了", "zìxíngchē bèi línjū qí zǒu le")}: lo afectado, ${zh("被", "bèi")}, quien lo hace y el verbo con resultado.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según MIT, en una frase con ${zh("被", "bèi")}, ¿qué se puede omitir?</p>`,
        opciones: ['La palabra ' + zh("被", "bèi"), 'Quien hace la acción', 'Lo afectado', 'El verbo'], correcta: 1,
        pista: '<p>La palabra de la voz pasiva se queda.</p>',
        solucion: `<p>${zh("被", "bèi")} no se omite, pero quien actúa sí: ${zh("自行车被骑走了", "zìxíngchē bèi qí zǒu le")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «se llevaron la bicicleta», sin decir quién.</p>',
        respuesta: ['自行车', '被', '骑', '走', '了'], pinyin: ['zìxíngchē', 'bèi', 'qí', 'zǒu', 'le'], lang: 'zh-Hans',
        pista: '<p>' + zh("被", "bèi") + ' queda justo antes del verbo.</p>',
        solucion: `<p>${zh("自行车被骑走了", "zìxíngchē bèi qí zǒu le")}: sin quien actúa, ${zh("被", "bèi")} va pegado al verbo.</p>` },
      { tipo: 'opciones', enunciado: `<p>La frase ${zh("邻居把自行车骑走了", "línjū bǎ zìxíngchē qí zǒu le")} cuenta el mismo hecho que otra con ${zh("被", "bèi")}. ¿Cuál?</p>`,
        opciones: [zh('自行车被邻居骑走了', 'zìxíngchē bèi línjū qí zǒu le'), zh('邻居被自行车骑走了', 'línjū bèi zìxíngchē qí zǒu le'), zh('被自行车邻居骑走了', 'bèi zìxíngchē línjū qí zǒu le'), zh('自行车邻居被骑走了', 'zìxíngchē línjū bèi qí zǒu le')], correcta: 0,
        pista: '<p>Lo afectado primero, luego ' + zh("被", "bèi") + ' y quien actúa.</p>',
        solucion: `<p>${zh("自行车被邻居骑走了", "zìxíngchē bèi línjū qí zǒu le")}: la bicicleta, ${zh("被", "bèi")}, el vecino y el verbo.</p>` },
      { tipo: 'opciones', escucha: { voz: '汽车被司机开走了' },
        sinAudio: '<p>Se dice <strong>qìchē bèi sījī kāi zǒu le</strong>: qì baja; chē es alto y plano; bèi baja; sī y jī son altos y planos; kāi es alto y plano; zǒu baja y sube; le es ligero.</p>',
        enunciado: '<p>Alguien regresa al lugar donde dejó su vehículo y ya no está. Escucha lo que le cuentan. ¿Qué se llevaron?</p>',
        opciones: ['Una bicicleta', 'Un paraguas', 'Un automóvil', 'Una maleta'], correcta: 2,
        pista: '<p>La primera palabra es lo afectado.</p>',
        solucion: `<p>Se oye ${zh("汽车被司机开走了", "qìchē bèi sījī kāi zǒu le")}: «el conductor se llevó el automóvil».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("邻居")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['lín jū'],
        pista: '<p>La primera sílaba sube; la segunda es alta y plana.</p>',
        solucion: `<p>${zh("邻居", "línjū")}: <strong>lín jū</strong>.</p>` },
    ],
    fuentes: [SILABO, MIT_CURSO, OXFORD_L22],
  });

  L('Si…entonces: 如果…就…', {
    objetivo: `Armar planes con condición usando ${zh("如果", "rúguǒ")}…${zh("就", "jiù")}… y la variante …${zh("的话", "dehuà")}, y poner cada parte en su lugar.`,
    explicacion: `
      <p>Casi todos los planes tienen una condición: «si hay sol, vamos al parque; si llueve, nos quedamos en casa». El chino la dice con ${zh("如果", "rúguǒ")} para el «si» y ${zh("就", "jiù")} para el «entonces». Primero, las doce palabras de la lección.</p>
      ${tabla([
        ['如果', 'rúguǒ', 'si, en caso de que'], ['的话', 'dehuà', 'partícula al final de una condición'], ['打算', 'dǎsuàn', 'planear, tener la intención de'], ['放假', 'fàngjià', 'tener vacaciones'],
        ['假期', 'jiàqī', 'periodo de vacaciones'], ['出发', 'chūfā', 'salir, ponerse en camino'], ['公园', 'gōngyuán', 'parque'], ['动物园', 'dòngwùyuán', 'zoológico'],
        ['山', 'shān', 'montaña'], ['海', 'hǎi', 'mar'], ['太阳', 'tàiyáng', 'sol'], ['冬天', 'dōngtiān', 'invierno'],
      ])}
      <h3>Primero la condición, luego la consecuencia</h3>
      <p>El sílabo del HSK, en nivel 3, llama a esto una oración de hipótesis y da el molde ${zh("如果", "rúguǒ")}…, ${zh("就", "jiù")}…. MIT muestra el orden con ${zh("如果你不想去，那我也不想去", "rúguǒ nǐ bù xiǎng qù, nà wǒ yě bù xiǎng qù")}, «si tú no quieres ir, entonces yo tampoco». Primero va la condición y después lo que pasa. Frases de ejemplo de la lección:</p>
      ${cuadro(['Parte', 'Frase de ejemplo', 'Qué dice'], [
        ['Condición', zh("如果明天放假", "rúguǒ míngtiān fàngjià"), '«si mañana hay vacaciones»'],
        ['Consecuencia', zh("我们就去公园", "wǒmen jiù qù gōngyuán"), '«entonces iremos al parque»'],
      ])}
      <p>Juntas: ${zh("如果明天放假，我们就去公园", "rúguǒ míngtiān fàngjià, wǒmen jiù qù gōngyuán")}.</p>
      <h3>Dónde va ${zh("就", "jiù")}</h3>
      <p>Según MIT, ${zh("就", "jiù")} es un adverbio y debe ir justo antes de un verbo o de otro adverbio. En la práctica, va después del sujeto de la segunda parte: ${zh("我们就去", "wǒmen jiù qù")}, no ${zh("就我们去", "jiù wǒmen qù")}. Es una diferencia con otras palabras de enlace, que pueden ir al comienzo de la frase.</p>
      <h3>La variante con ${zh("的话", "dehuà")}</h3>
      <p>MIT dice que ${zh("如果", "rúguǒ")} puede reforzarse con ${zh("的话", "dehuà")}, que se pone al final de la parte de la condición. El sílabo también incluye el molde …${zh("的话", "dehuà")}, ${zh("就", "jiù")}…. MIT da este ejemplo: ${zh("不能去的话，就打个电话吧", "bù néng qù dehuà, jiù dǎ ge diànhuà ba")}, «si no puedes ir, llama por teléfono». Frases de ejemplo de la lección con las tres formas:</p>
      ${cuadro(['Forma', 'Frase de ejemplo'], [
        [zh("如果", "rúguǒ") + '…' + zh("就", "jiù") + '…', zh("如果下雨，我们就不去动物园", "rúguǒ xià yǔ, wǒmen jiù bú qù dòngwùyuán")],
        ['…' + zh("的话", "dehuà") + '，' + zh("就", "jiù") + '…', zh("下雨的话，我们就不去动物园", "xià yǔ dehuà, wǒmen jiù bú qù dòngwùyuán")],
        [zh("如果", "rúguǒ") + '…' + zh("的话", "dehuà") + '，' + zh("就", "jiù") + '…', zh("如果下雨的话，我们就不去动物园", "rúguǒ xià yǔ dehuà, wǒmen jiù bú qù dòngwùyuán")],
      ])}
      <p>Las tres significan «si llueve, no iremos al zoológico».</p>
      <h3>Qué se puede omitir</h3>
      <p>MIT añade que ${zh("就", "jiù")} se omite con más facilidad que ${zh("如果", "rúguǒ")}, con un ligero cambio de matiz, y que ${zh("如果", "rúguǒ")} puede omitirse cuando el patrón ya está claro. Esta lección practica la forma completa, con la condición primero y la consecuencia después, porque así se ve mejor cómo encajan las dos partes. MIT dice también que ${zh("如果", "rúguǒ")} es una alternativa algo más formal de otra palabra para «si», ${zh("要是", "yàoshi")}, que es de un nivel posterior del HSK; aquí solo la mencionamos.</p>
      <p class="nota"><strong>Trampa común:</strong> poner la consecuencia antes de la condición, o dejar la consecuencia sin verbo. Cada parte lleva su propio verbo, y ${zh("就", "jiù")} va justo antes del de la segunda parte.</p>`,
    ejemplo: `
      <p>Ana prepara con su familia el ${zh("假期", "jiàqī")} y quiere explicar el plan según el clima.</p>
      <ol class="pasos-ej">
        <li>Dice que ya tiene un plan: ${zh("我打算去山上", "wǒ dǎsuàn qù shān shàng")}, «planeo ir a la montaña».</li>
        <li>Pone la condición: ${zh("如果明天有太阳", "rúguǒ míngtiān yǒu tàiyáng")}, «si mañana hay sol».</li>
        <li>Añade la consecuencia con ${zh("就", "jiù")} antes del verbo: ${zh("我们就去", "wǒmen jiù qù")}, «entonces iremos».</li>
        <li>Para el otro caso usa la variante: ${zh("下雨的话，我们就在家", "xià yǔ dehuà, wǒmen jiù zài jiā")}.</li>
        <li>Por último avisa a qué hora salen: ${zh("我们早上八点出发", "wǒmen zǎoshang bā diǎn chūfā")}, «salimos a las ocho de la mañana».</li>
      </ol>
      <p>Comprueba: la condición va primero y ${zh("就", "jiù")} queda delante del verbo, después del sujeto. Resultado: <span class="resultado">${zh("如果明天有太阳，我们就去山上", "rúguǒ míngtiān yǒu tàiyáng, wǒmen jiù qù shān shàng")} = «si mañana hay sol, iremos a la montaña»</span>.</p>`,
    vidaReal: `
      <p>Esta estructura aparece cuando haces planes que dependen de algo:</p>
      <ul>
        <li>Decidir con tu familia qué hacer en un fin de semana según haga sol o llueva.</li>
        <li>Prometer a un amigo que lo llamas si no puedes ir a su fiesta.</li>
        <li>Armar un plan de vacaciones con una opción para el mar y otra para la montaña.</li>
        <li>Entender una invitación que dice «si tienes tiempo, ven con nosotros».</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «si mañana hay vacaciones, iremos al parque».</p>',
        respuesta: ['如果', '明天', '放假', '我们', '就', '去', '公园'], pinyin: ['rúguǒ', 'míngtiān', 'fàngjià', 'wǒmen', 'jiù', 'qù', 'gōngyuán'], lang: 'zh-Hans',
        alternativas: [['明天', '如果', '放假', '我们', '就', '去', '公园'], ['我们', '如果', '明天', '放假', '就', '去', '公园']],
        pista: '<p>Primero la condición; ' + zh("就", "jiù") + ' va antes del verbo de la segunda parte.</p>',
        solucion: `<p>${zh("如果明天放假，我们就去公园", "rúguǒ míngtiān fàngjià, wǒmen jiù qù gōngyuán")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según MIT, ¿dónde debe ir ${zh("就", "jiù")}?</p>`,
        opciones: ['Al final de la frase', 'Justo antes de un verbo', 'Antes de ' + zh("如果", "rúguǒ"), 'Después del objeto'], correcta: 1,
        pista: '<p>' + zh("就", "jiù") + ' es un adverbio.</p>',
        solucion: `<p>${zh("就", "jiù")} va directamente antes de un verbo (o de otro adverbio): ${zh("我们就去", "wǒmen jiù qù")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «si llueve, no iremos al zoológico», con la variante de la partícula final.</p>',
        respuesta: ['下雨', '的话', '我们', '就', '不', '去', '动物园'], pinyin: ['xià yǔ', 'dehuà', 'wǒmen', 'jiù', 'bú', 'qù', 'dòngwùyuán'], lang: 'zh-Hans',
        alternativas: [['我们', '下雨', '的话', '就', '不', '去', '动物园']],
        pista: '<p>' + zh("的话", "dehuà") + ' cierra la parte de la condición.</p>',
        solucion: `<p>${zh("下雨的话，我们就不去动物园", "xià yǔ dehuà, wǒmen jiù bú qù dòngwùyuán")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>¿Cuál frase significa «si mañana hay sol, iremos a la playa»?</p>',
        opciones: [zh('如果明天有太阳，我们就去海边', 'rúguǒ míngtiān yǒu tàiyáng, wǒmen jiù qù hǎibiān'), zh('我们就去海边，如果明天有太阳就', 'wǒmen jiù qù hǎibiān, rúguǒ míngtiān yǒu tàiyáng jiù'), zh('就如果明天有太阳，我们去海边', 'jiù rúguǒ míngtiān yǒu tàiyáng, wǒmen qù hǎibiān'), zh('如果我们就明天有太阳去海边', 'rúguǒ wǒmen jiù míngtiān yǒu tàiyáng qù hǎibiān')], correcta: 0,
        pista: '<p>Condición primero, después el sujeto, ' + zh("就", "jiù") + ' y el verbo.</p>',
        solucion: `<p>${zh("如果明天有太阳，我们就去海边", "rúguǒ míngtiān yǒu tàiyáng, wǒmen jiù qù hǎibiān")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '如果放假，我们就去山上' },
        sinAudio: '<p>Se dice <strong>rúguǒ fàngjià, wǒmen jiù qù shān shàng</strong>: rú sube; guǒ baja y sube; fàng baja; jià baja; wǒ baja y sube; men es ligero; jiù baja; qù baja; shān es alto y plano; shàng baja.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué condición pone la persona?</p>',
        opciones: ['Que haya vacaciones', 'Que llueva', 'Que haga frío', 'Que haya sol'], correcta: 0,
        pista: '<p>La condición es la primera parte, antes de la pausa.</p>',
        solucion: `<p>Se oye ${zh("如果放假，我们就去山上", "rúguǒ fàngjià, wǒmen jiù qù shān shàng")}: «si hay vacaciones, iremos a la montaña».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("出发")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['chū fā'],
        pista: '<p>Las dos sílabas son altas y planas.</p>',
        solucion: `<p>${zh("出发", "chūfā")}: <strong>chū fā</strong>.</p>` },
    ],
    fuentes: [SILABO, MIT_CURSO],
  });

  L('Solo si y con tal de: 只有 y 只要', {
    objetivo: `Elegir entre ${zh("只有", "zhǐyǒu")}…${zh("才", "cái")}… para una condición difícil de lograr y ${zh("只要", "zhǐyào")}…${zh("就", "jiù")}… para una condición fácil o mínima.`,
    explicacion: `
      <p>Imagina dos promesas de un adulto. Una dice: «con tal de que hagas la tarea, te dejo jugar». La otra: «solo si sacas la mejor nota, te regalo la bici». La primera pide poco; la segunda, mucho. El chino marca esa diferencia con dos pares de palabras. Primero, las doce palabras de la lección.</p>
      ${tabla([
        ['只有', 'zhǐyǒu', 'solo si, solo cuando'], ['只要', 'zhǐyào', 'con tal de que, siempre que'], ['才', 'cái', 'recién, apenas'], ['必须', 'bìxū', 'deber, tener que'],
        ['需要', 'xūyào', 'necesitar'], ['一定', 'yídìng', 'sin falta, seguro'], ['健康', 'jiànkāng', 'sano; salud'], ['锻炼', 'duànliàn', 'hacer ejercicio'],
        ['成绩', 'chéngjì', 'calificación, resultado'], ['提高', 'tígāo', 'mejorar, subir'], ['认真', 'rènzhēn', 'con seriedad, con atención'], ['复习', 'fùxí', 'repasar'],
      ])}
      <h3>Dos condiciones de distinto peso</h3>
      <p>La guía de Oxford lo formula así: la parte con ${zh("只有", "zhǐyǒu")} presenta una condición <strong>difícil de lograr</strong>, y la parte con ${zh("才", "cái")} da el resultado. En cambio, la parte con ${zh("只要", "zhǐyào")} presenta una condición <strong>fácil o un requisito mínimo</strong>, y la parte con ${zh("就", "jiù")} da el resultado. Princeton traduce ${zh("只要", "zhǐyào")} como «mientras» o «siempre que».</p>
      ${cuadro(['Molde', 'Condición', 'Resultado'], [
        [zh("只有", "zhǐyǒu") + '…' + zh("才", "cái") + '…', 'difícil de lograr', 'se da solo entonces'],
        [zh("只要", "zhǐyào") + '…' + zh("就", "jiù") + '…', 'fácil o mínima', 'se da en ese caso'],
      ])}
      <p>La última columna es una simplificación de la lección: ${zh("才", "cái")} es el mismo carácter que el sílabo da como «recién, apenas», y aquí se puede leer como «solo entonces». Para ${zh("就", "jiù")} sirve la idea de «ya» o «en ese caso».</p>
      <h3>Los ejemplos de Oxford</h3>
      <p>Oxford da un ejemplo de cada una. Con la condición fácil: ${zh("只要你学汉语，我就给你很多钱", "zhǐyào nǐ xué hànyǔ, wǒ jiù gěi nǐ hěn duō qián")}, «mientras estudies chino, te daré mucho dinero». Con la difícil: ${zh("只有你把汉语学好，我才给你钱", "zhǐyǒu nǐ bǎ hànyǔ xué hǎo, wǒ cái gěi nǐ qián")}, «solo cuando hayas aprendido bien el chino te daré dinero». Observa que en la segunda hay que aprender <em>bien</em>, y en la primera basta con estudiar.</p>
      <h3>Dónde van ${zh("才", "cái")} y ${zh("就", "jiù")}</h3>
      <p>Oxford explica que ${zh("才", "cái")} y ${zh("就", "jiù")} son adverbios y se colocan antes de verbos o de verbos de estado, es decir, de los adjetivos. Es la misma posición que la de ${zh("就", "jiù")} en la lección anterior: después del sujeto y justo antes del verbo. Frases de ejemplo de la lección:</p>
      ${cuadro(['Molde', 'Frase de ejemplo'], [
        [zh("只有", "zhǐyǒu") + '…' + zh("才", "cái") + '…', zh("只有认真复习，你才能提高成绩", "zhǐyǒu rènzhēn fùxí, nǐ cái néng tígāo chéngjì") + '<br>«solo si repasas con seriedad podrás mejorar tus notas»'],
        [zh("只要", "zhǐyào") + '…' + zh("就", "jiù") + '…', zh("只要每天锻炼，你就会健康", "zhǐyào měitiān duànliàn, nǐ jiù huì jiànkāng") + '<br>«con tal de que hagas ejercicio cada día, estarás sano»'],
      ])}
      <h3>Las palabras de obligación</h3>
      <p>El sílabo trae ${zh("必须", "bìxū")} y ${zh("需要", "xūyào")} en este nivel, y ${zh("一定", "yídìng")} como «sin falta». Aparecen junto a estas condiciones porque hablan de lo que hace falta: ${zh("你必须认真复习", "nǐ bìxū rènzhēn fùxí")}, «tienes que repasar con seriedad», es una frase de ejemplo de la lección.</p>
      <p class="nota"><strong>Trampa común:</strong> mezclar los pares, como ${zh("只要", "zhǐyào")}…${zh("才", "cái")}…. Las fuentes de la lección solo enseñan los pares ${zh("只有", "zhǐyǒu")}…${zh("才", "cái")}… y ${zh("只要", "zhǐyào")}…${zh("就", "jiù")}….</p>`,
    ejemplo: `
      <p>Ana y su hermano Luis hablan del examen de la semana próxima. Sigamos lo que dicen.</p>
      <ol class="pasos-ej">
        <li>Luis quiere una calificación alta. Ana le dice que hay una condición difícil: ${zh("只有认真复习，你才能提高成绩", "zhǐyǒu rènzhēn fùxí, nǐ cái néng tígāo chéngjì")}.</li>
        <li>Luis pregunta si basta con algo sencillo. Ana habla de una condición fácil, la salud: ${zh("只要每天锻炼，你就会健康", "zhǐyào měitiān duànliàn, nǐ jiù huì jiànkāng")}.</li>
        <li>Fíjate en cómo cambian los adverbios: ${zh("才", "cái")} en la difícil y ${zh("就", "jiù")} en la fácil, siempre después del sujeto.</li>
        <li>Luis resume lo que necesita: ${zh("我需要认真复习", "wǒ xūyào rènzhēn fùxí")}.</li>
      </ol>
      <p>Comprueba: ${zh("只有", "zhǐyǒu")} se junta con ${zh("才", "cái")}, y ${zh("只要", "zhǐyào")} con ${zh("就", "jiù")}. Resultado: <span class="resultado">${zh("只有认真复习，你才能提高成绩", "zhǐyǒu rènzhēn fùxí, nǐ cái néng tígāo chéngjì")} = «solo si repasas con seriedad podrás mejorar tus notas»</span>.</p>`,
    vidaReal: `
      <p>Estas estructuras sirven cuando pones o escuchas condiciones:</p>
      <ul>
        <li>Prometer a un amigo que lo ayudas con tal de que te avise con un poco de tiempo.</li>
        <li>Explicar que solo con mucha práctica se aprende a tocar bien un instrumento.</li>
        <li>Entender a un maestro que dice qué hace falta para subir una calificación.</li>
        <li>Distinguir entre un requisito mínimo y uno muy exigente cuando alguien te propone un trato.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «solo si repasas con seriedad podrás mejorar tus notas».</p>',
        respuesta: ['只有', '认真', '复习', '你', '才', '能', '提高', '成绩'], pinyin: ['zhǐyǒu', 'rènzhēn', 'fùxí', 'nǐ', 'cái', 'néng', 'tígāo', 'chéngjì'], lang: 'zh-Hans',
        pista: '<p>' + zh("才", "cái") + ' va antes del verbo de la segunda parte.</p>',
        solucion: `<p>${zh("只有认真复习，你才能提高成绩", "zhǐyǒu rènzhēn fùxí, nǐ cái néng tígāo chéngjì")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según Oxford, ¿qué presenta la parte de la frase con ${zh("只要", "zhǐyào")}?</p>`,
        opciones: ['Una condición difícil de lograr', 'Una condición fácil o un requisito mínimo', 'Una pregunta', 'Un resultado inesperado'], correcta: 1,
        pista: '<p>Princeton lo traduce como «siempre que».</p>',
        solucion: `<p>${zh("只要", "zhǐyào")} introduce una condición fácil o mínima, y ${zh("就", "jiù")} da el resultado.</p>` },
      { tipo: 'opciones', enunciado: '<p>Oxford da el ejemplo «mientras estudies chino, te daré mucho dinero». ¿Qué frase lo dice?</p>',
        opciones: [zh('只要你学汉语，我就给你很多钱', 'zhǐyào nǐ xué hànyǔ, wǒ jiù gěi nǐ hěn duō qián'), zh('只有你学汉语，我就给你很多钱', 'zhǐyǒu nǐ xué hànyǔ, wǒ jiù gěi nǐ hěn duō qián'), zh('只要你学汉语，我才给你很多钱', 'zhǐyào nǐ xué hànyǔ, wǒ cái gěi nǐ hěn duō qián'), zh('只有你学汉语，我才给你很多钱', 'zhǐyǒu nǐ xué hànyǔ, wǒ cái gěi nǐ hěn duō qián')], correcta: 0,
        pista: '<p>La condición es fácil, así que va con la pareja de ' + zh("就", "jiù") + '.</p>',
        solucion: `<p>${zh("只要", "zhǐyào")} se junta con ${zh("就", "jiù")}: ${zh("只要你学汉语，我就给你很多钱", "zhǐyào nǐ xué hànyǔ, wǒ jiù gěi nǐ hěn duō qián")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «con tal de que hagas ejercicio cada día, estarás sano».</p>',
        respuesta: ['只要', '每天', '锻炼', '你', '就', '会', '健康'], pinyin: ['zhǐyào', 'měitiān', 'duànliàn', 'nǐ', 'jiù', 'huì', 'jiànkāng'], lang: 'zh-Hans',
        pista: '<p>La pareja de ' + zh("只要", "zhǐyào") + ' es ' + zh("就", "jiù") + '.</p>',
        solucion: `<p>${zh("只要每天锻炼，你就会健康", "zhǐyào měitiān duànliàn, nǐ jiù huì jiànkāng")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '只有认真复习，才能提高成绩' },
        sinAudio: '<p>Se dice <strong>zhǐyǒu rènzhēn fùxí, cái néng tígāo chéngjì</strong>: zhǐ baja y sube; yǒu baja y sube; rèn baja; zhēn es alto y plano; fù baja; xí sube; cái sube; néng sube; tí sube; gāo es alto y plano; chéng sube; jì baja.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué hace falta, según la persona?</p>',
        opciones: ['Dormir más', 'Repasar con seriedad', 'Hacer ejercicio', 'Llegar temprano'], correcta: 1,
        pista: '<p>Lo que hace falta va en la primera parte, después de la primera palabra.</p>',
        solucion: `<p>Se oye ${zh("只有认真复习，才能提高成绩", "zhǐyǒu rènzhēn fùxí, cái néng tígāo chéngjì")}: hace falta repasar con seriedad.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("锻炼")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['duàn liàn'],
        pista: '<p>Las dos sílabas son de tono descendente.</p>',
        solucion: `<p>${zh("锻炼", "duànliàn")}: <strong>duàn liàn</strong>.</p>` },
    ],
    fuentes: [SILABO, OXFORD_GRAMATICA, PRINCETON_ZHIYAO],
  });

  L('No solo…sino también: 不但…而且…', {
    objetivo: `Sumar dos cualidades o dos hechos con ${zh("不但", "búdàn")}…${zh("而且", "érqiě")}…, con uno o con dos sujetos, y poner cada palabra antes del sujeto o del verbo.`,
    explicacion: `
      <p>Para hablar bien de alguien no basta con una sola palabra: «es lista y, además, muy cordial». El chino suma dos ideas con ${zh("不但", "búdàn")} y ${zh("而且", "érqiě")}. Primero, las doce palabras de la lección. Las que describen el cuerpo de otra persona (${zh("胖", "pàng")}, ${zh("瘦", "shòu")}, ${zh("矮", "ǎi")}) conviene usarlas con cuidado, porque pueden resultar descorteses; es una recomendación de la lección.</p>
      ${tabla([
        ['不但', 'búdàn', 'no solo'], ['而且', 'érqiě', 'sino también, además'], ['聪明', 'cōngmíng', 'listo, inteligente'], ['热情', 'rèqíng', 'cordial, afectuoso'],
        ['可爱', 'kě\'ài', 'adorable, lindo'], ['有名', 'yǒumíng', 'famoso'], ['年轻', 'niánqīng', 'joven'], ['胖', 'pàng', 'gordo'],
        ['瘦', 'shòu', 'delgado'], ['矮', 'ǎi', 'bajo de estatura'], ['头发', 'tóufa', 'cabello'], ['关心', 'guānxīn', 'preocuparse por, cuidar'],
      ])}
      <h3>Con un solo sujeto</h3>
      <p>MSU, de la Universidad Estatal de Míchigan, traduce ${zh("不但", "búdàn")}…, ${zh("而且", "érqiě")}… como «no solo…, sino también…». Si hay un solo sujeto, el molde es sujeto, ${zh("不但", "búdàn")}…, ${zh("而且", "érqiě")}…. Su ejemplo es ${zh("这个菜不但好看，而且好吃", "zhè ge cài búdàn hǎokàn, érqiě hǎochī")}, «este plato no solo se ve bien, sino que además está rico». Una frase de ejemplo de la lección: ${zh("她不但聪明，而且热情", "tā búdàn cōngmíng, érqiě rèqíng")}, «ella no solo es lista, sino también cordial». Las dos partes de la suma pueden ser cualidades, como aquí, o acciones, como verás más abajo; lo importante es que cada parte diga algo del mismo sujeto.</p>
      <h3>Con dos sujetos</h3>
      <p>Si los sujetos son distintos, MSU pone ${zh("不但", "búdàn")} antes del primero y ${zh("而且", "érqiě")} antes del segundo. También dice que ${zh("而且", "érqiě")} se puede omitir y reemplazar por ${zh("也", "yě")}. Frases de ejemplo de la lección:</p>
      ${cuadro(['Forma', 'Frase de ejemplo'], [
        [zh("不但", "búdàn") + ' + sujeto 1, ' + zh("而且", "érqiě") + ' + sujeto 2', zh("不但我关心她，而且我的朋友也关心她", "búdàn wǒ guānxīn tā, érqiě wǒ de péngyou yě guānxīn tā")],
        [zh("不但", "búdàn") + ' + sujeto 1, sujeto 2 + ' + zh("也", "yě"), zh("不但我关心她，我的朋友也关心她", "búdàn wǒ guānxīn tā, wǒ de péngyou yě guānxīn tā")],
      ])}
      <p>Las dos significan «no solo yo me preocupo por ella, sino también mis amigos».</p>
      <h3>Antes del sujeto o antes del verbo</h3>
      <p>Oxford añade que ${zh("不但", "búdàn")} y ${zh("而且", "érqiě")} pueden ir antes del sujeto o antes del verbo de su parte, según el énfasis. Si lo que se destaca es el sujeto, van antes del sujeto. Si lo que se destaca es la acción, van antes del verbo. Frases de ejemplo de la lección con el mismo hecho:</p>
      ${cuadro(['Énfasis', 'Frase de ejemplo'], [
        ['En el sujeto', zh("不但哥哥学了汉语，而且弟弟也学了汉语", "búdàn gēge xué le hànyǔ, érqiě dìdi yě xué le hànyǔ")],
        ['En la acción', zh("我不但学了汉语，而且得到了很多钱", "wǒ búdàn xué le hànyǔ, érqiě dédào le hěn duō qián")],
      ])}
      <p>La primera es «no solo mi hermano mayor estudió chino, sino que el menor también». La segunda, «no solo estudié chino, sino que además recibí mucho dinero». ${zh("得到", "dédào")} es la palabra de la primera lección de la unidad.</p>
      <p class="nota"><strong>Trampa común:</strong> con dos sujetos distintos, no pongas los dos en la primera parte. Cada parte lleva el suyo: ${zh("不但", "búdàn")} antes del primero, y ${zh("而且", "érqiě")} antes del segundo o, en su lugar, ${zh("也", "yě")} después de él.</p>`,
    ejemplo: `
      <p>Ana quiere contarle a su tía cómo es su nueva amiga Mei. Mira cómo suma las ideas.</p>
      <ol class="pasos-ej">
        <li>Piensa primero en dos cualidades por separado: ${zh("她很聪明", "tā hěn cōngmíng")} y ${zh("她很热情", "tā hěn rèqíng")}.</li>
        <li>Las une con un solo sujeto: ${zh("她不但聪明，而且热情", "tā búdàn cōngmíng, érqiě rèqíng")}.</li>
        <li>Quiere añadir que todos la quieren. Ahora hay dos sujetos, así que usa ${zh("不但", "búdàn")} antes del primero: ${zh("不但我关心她，而且我的朋友也关心她", "búdàn wǒ guānxīn tā, érqiě wǒ de péngyou yě guānxīn tā")}.</li>
        <li>Al hablar rápido, deja caer ${zh("而且", "érqiě")} y pone ${zh("也", "yě")}: ${zh("不但我关心她，我的朋友也关心她", "búdàn wǒ guānxīn tā, wǒ de péngyou yě guānxīn tā")}.</li>
      </ol>
      <p>Comprueba: con un sujeto, ${zh("不但", "búdàn")} va después de él; con dos, antes de cada sujeto. Resultado: <span class="resultado">${zh("她不但聪明，而且热情", "tā búdàn cōngmíng, érqiě rèqíng")} = «ella no solo es lista, sino también cordial»</span>.</p>`,
    vidaReal: `
      <p>Esta estructura sirve cuando quieres sumar dos buenas razones:</p>
      <ul>
        <li>Elogiar a un compañero que es buen estudiante y, además, ayuda a todos en la clase.</li>
        <li>Describir una mascota que es adorable y también muy lista.</li>
        <li>Contar de un artista que es famoso en su país y también querido en otros.</li>
        <li>Explicar por qué te gusta un lugar: es bonito y, además, muy tranquilo para leer o estudiar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «ella no solo es lista, sino también cordial».</p>',
        respuesta: ['她', '不但', '聪明', '而且', '热情'], pinyin: ['tā', 'búdàn', 'cōngmíng', 'érqiě', 'rèqíng'], lang: 'zh-Hans',
        pista: '<p>Con un solo sujeto, ' + zh("不但", "búdàn") + ' va después de él.</p>',
        solucion: `<p>${zh("她不但聪明，而且热情", "tā búdàn cōngmíng, érqiě rèqíng")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según MSU, ¿qué significa ${zh("不但", "búdàn")}…, ${zh("而且", "érqiě")}…?</p>`,
        opciones: ['Si…, entonces…', 'No solo…, sino también…', 'Primero…, después…', 'Aunque…, pero…'], correcta: 1,
        pista: '<p>Suma dos cosas.</p>',
        solucion: `<p>${zh("不但", "búdàn")}…, ${zh("而且", "érqiě")}… = «no solo…, sino también…».</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «no solo mi hermana mayor es lista, sino que mi hermano menor también es cordial».</p>',
        respuesta: ['不但', '姐姐', '聪明', '而且', '弟弟', '也', '热情'], pinyin: ['búdàn', 'jiějie', 'cōngmíng', 'érqiě', 'dìdi', 'yě', 'rèqíng'], lang: 'zh-Hans',
        pista: '<p>Con dos sujetos, ' + zh("不但", "búdàn") + ' va antes del primero y ' + zh("而且", "érqiě") + ' antes del segundo.</p>',
        solucion: `<p>${zh("不但姐姐聪明，而且弟弟也热情", "búdàn jiějie cōngmíng, érqiě dìdi yě rèqíng")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según Oxford, si quieres destacar la acción y no el sujeto, ¿dónde pones ${zh("不但", "búdàn")}?</p>`,
        opciones: ['Al final de la frase', 'Antes del verbo', 'Antes del sujeto', 'Después del objeto'], correcta: 1,
        pista: '<p>Piensa en la frase ' + zh("我不但学了汉语", "wǒ búdàn xué le hànyǔ") + '.</p>',
        solucion: `<p>Si el énfasis está en la acción, ${zh("不但", "búdàn")} y ${zh("而且", "érqiě")} van antes del verbo.</p>` },
      { tipo: 'opciones', escucha: { voz: '这只猫不但可爱，而且聪明' },
        sinAudio: '<p>Se dice <strong>zhè zhī māo búdàn kě\'ài, érqiě cōngmíng</strong>: zhè baja; zhī y māo son altos y planos; bú sube; dàn baja; kě baja y sube; ài baja; ér sube; qiě baja y sube; cōng es alto y plano; míng sube.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dos cualidades menciona?</p>',
        opciones: ['Es adorable e inteligente', 'Es alta y delgada', 'Es joven y famosa', 'Es bajita y cordial'], correcta: 0,
        pista: '<p>La primera cualidad va después de ' + zh("不但", "búdàn") + ' y la segunda después de ' + zh("而且", "érqiě") + '.</p>',
        solucion: `<p>Se oye ${zh("这只猫不但可爱，而且聪明", "zhè zhī māo búdàn kě'ài, érqiě cōngmíng")}: «este gato no solo es adorable, sino también listo».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("聪明")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['cōng míng'],
        pista: '<p>La primera sílaba es alta y plana; la segunda sube.</p>',
        solucion: `<p>${zh("聪明", "cōngmíng")}: <strong>cōng míng</strong>.</p>` },
    ],
    fuentes: [SILABO, MSU_BUDAN, OXFORD_GRAMATICA],
  });

  // --- Lecciones 9 a 12: tercer constructor ---
  L('Dos acciones a la vez: 一边…一边…', {
    objetivo: `Decir que haces dos cosas al mismo tiempo con ${zh("一边", "yìbiān")}…${zh("一边", "yìbiān")}…, y colocar cada ${zh("一边", "yìbiān")} justo antes de su verbo.`,
    explicacion: `
      <p>Haces la tarea con música de fondo, comes mientras ves un programa, caminas y charlas con un amigo. Casi todos hacemos dos cosas a la vez, y el chino tiene una estructura para contarlo. Primero, las doce palabras de la lección. Ojo con ${zh("聊天儿", "liáotiānr")}: la última sílaba, ${zh("儿", "r")}, se pronuncia pegada a la anterior y no es una sílaba aparte.</p>
      ${tabla([
        ['一边', 'yìbiān', 'a la vez, mientras'], ['聊天儿', 'liáotiānr', 'charlar'], ['音乐', 'yīnyuè', 'música'], ['饮料', 'yǐnliào', 'bebida'],
        ['西瓜', 'xīguā', 'sandía'], ['冰激凌', 'bīngjīlíng', 'helado'], ['蛋糕', 'dàngāo', 'pastel'], ['拍照', 'pāizhào', 'tomar fotos'],
        ['照片', 'zhàopiàn', 'foto'], ['游戏', 'yóuxì', 'juego'], ['沙发', 'shāfā', 'sofá'], ['节目', 'jiémù', 'programa (de televisión)'],
      ])}
      <h3>Dos acciones al mismo tiempo</h3>
      <p>Según el libro de la Universidad Estatal de Míchigan (MSU), ${zh("一边", "yìbiān")}…${zh("一边", "yìbiān")}… describe acciones simultáneas, equivalente a «hacer algo 1 mientras se hace algo 2». El sílabo del HSK lo clasifica como un adverbio de enlace: une dos partes de una misma frase.</p>
      <h3>La estructura</h3>
      <p>MSU la resume así: sujeto + ${zh("一边", "yìbiān")} + verbo 1 + ${zh("一边", "yìbiān")} + verbo 2. Cada ${zh("一边", "yìbiān")} va justo antes de su verbo. Su ejemplo es ${zh("妈妈一边吃饭一边看书", "māma yìbiān chīfàn yìbiān kànshū")}: «mamá lee mientras come». Fíjate en que el sujeto se dice una sola vez, al principio, y que los verbos llevan su objeto detrás: ${zh("吃饭", "chīfàn")} es «comer» y ${zh("看书", "kànshū")} es «leer». Si quieres otra combinación, solo cambia los verbos y deja el resto igual: la estructura es como un molde que se llena con cualquier par de acciones.</p>
      <p>MSU añade que la coma entre las dos partes es opcional. Una frase de ejemplo de la lección: ${zh("我一边听音乐，一边写字", "wǒ yìbiān tīng yīnyuè, yìbiān xiě zì")}, «escribo mientras escucho música». Con coma o sin ella, el significado es el mismo. Al leer en voz alta, la coma solo marca una pequeña pausa.</p>
      <h3>La forma corta</h3>
      <p>MSU explica que, al hablar, ${zh("一边", "yìbiān")} se acorta a ${zh("边", "biān")}, y da el ejemplo ${zh("我们边吃边说", "wǒmen biān chī biān shuō")}, «hablemos mientras comemos». Es la misma idea, más rápida: el verbo va justo después de cada ${zh("边", "biān")}.</p>
      <h3>¿Quién hace las dos acciones?</h3>
      <p>En los ejemplos de MSU, la misma persona hace las dos acciones. Como simplificación de la lección, úsalo así: un solo sujeto que hace las dos cosas. La estructura tampoco sirve para una acción que viene después de otra. Si primero comes y después lees, eso no es «a la vez», y por eso aquí no usamos ${zh("一边", "yìbiān")} (también es una simplificación de la lección).</p>
      <p>Una última cosa sobre el sonido: ${zh("一", "yī")} suelto es alto y plano, pero delante de una sílaba de tono bajante cambia a bajante. Por eso el sílabo escribe ${zh("一边", "yìbiān")}, con ese cambio ya hecho.</p>
      <p class="nota"><strong>Trampa común:</strong> decir ${zh("一边", "yìbiān")} una sola vez, como en ${zh("我一边吃饭看书", "wǒ yìbiān chīfàn kànshū")}. La estructura de MSU lleva ${zh("一边", "yìbiān")} dos veces, una antes de cada verbo.</p>`,
    ejemplo: `
      <p>Pablo describe el sábado de su familia en la sala de su casa. Vamos paso a paso, con un par de verbos distinto en cada caso.</p>
      <ol class="pasos-ej">
        <li>Mamá hace dos cosas: ${zh("妈妈吃西瓜", "māma chī xīguā")} y ${zh("妈妈看节目", "māma kàn jiémù")}.</li>
        <li>Las junta con un solo sujeto: ${zh("妈妈一边吃西瓜一边看节目", "māma yìbiān chī xīguā yìbiān kàn jiémù")}.</li>
        <li>Papá, con coma: ${zh("爸爸一边喝饮料，一边聊天儿", "bàba yìbiān hē yǐnliào, yìbiān liáotiānr")}.</li>
        <li>Su hermano menor: ${zh("弟弟一边玩游戏一边吃冰激凌", "dìdi yìbiān wán yóuxì yìbiān chī bīngjīlíng")}.</li>
        <li>Su hermana, con otro par de acciones: ${zh("姐姐一边拍照一边看照片", "jiějie yìbiān pāizhào yìbiān kàn zhàopiàn")}.</li>
        <li>Y todos juntos, en forma corta: ${zh("我们边吃边说", "wǒmen biān chī biān shuō")}.</li>
      </ol>
      <p>Comprueba: el sujeto aparece una vez y cada ${zh("一边", "yìbiān")} está pegado a su verbo. Resultado: <span class="resultado">${zh("妈妈一边吃西瓜一边看节目", "māma yìbiān chī xīguā yìbiān kàn jiémù")} = «mamá come sandía mientras ve un programa»</span>.</p>`,
    vidaReal: `
      <p>Esta estructura aparece cuando cuentas lo que haces en paralelo:</p>
      <ul>
        <li>Contar que estudias mientras escuchas música tranquila en tu cuarto.</li>
        <li>Decir que charlas con un amigo mientras caminas hacia la escuela.</li>
        <li>Explicar que ves un programa mientras comes con tu familia.</li>
        <li>Mostrar que tomas fotos mientras paseas por la ciudad.</li>
        <li>Pedir a alguien que no hable por teléfono mientras maneja, porque son dos tareas difíciles a la vez.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «mamá lee mientras come» (el ejemplo de MSU).</p>',
        respuesta: ['妈妈', '一边', '吃饭', '一边', '看书'], pinyin: ['māma', 'yìbiān', 'chīfàn', 'yìbiān', 'kànshū'], lang: 'zh-Hans',
        pista: '<p>El sujeto va primero, y cada ' + zh("一边", "yìbiān") + ' va antes de su verbo.</p>',
        solucion: `<p>${zh("妈妈一边吃饭一边看书", "māma yìbiān chīfàn yìbiān kànshū")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según MSU, ¿qué expresa ${zh("一边", "yìbiān")}…${zh("一边", "yìbiān")}…?</p>`,
        opciones: ['Que una acción pasó antes que otra', 'Que una acción es más importante', 'Que dos acciones ocurren al mismo tiempo', 'Que una acción no se hizo'], correcta: 2,
        pista: '<p>Piensa en «mientras».</p>',
        solucion: `<p>Describe acciones simultáneas: «hacer algo 1 mientras se hace algo 2».</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «charlamos mientras comemos sandía».</p>',
        respuesta: ['我们', '一边', '吃西瓜', '一边', '聊天儿'], pinyin: ['wǒmen', 'yìbiān', 'chī xīguā', 'yìbiān', 'liáotiānr'], lang: 'zh-Hans',
        pista: '<p>Las dos acciones pueden ir en cualquier orden; solo cuida que cada ' + zh("一边", "yìbiān") + ' vaya antes de su verbo.</p>',
        solucion: `<p>${zh("我们一边吃西瓜一边聊天儿", "wǒmen yìbiān chī xīguā yìbiān liáotiānr")}.</p>`,
        alternativas: [['我们', '一边', '聊天儿', '一边', '吃西瓜']] },
      { tipo: 'opciones', enunciado: '<p>¿Cuál frase sigue la estructura de MSU?</p>',
        opciones: [`${zh("我一边吃饭看书", "wǒ yìbiān chīfàn kànshū")}`, `${zh("我一边吃饭一边看书", "wǒ yìbiān chīfàn yìbiān kànshū")}`, `${zh("我吃饭一边看书一边", "wǒ chīfàn yìbiān kànshū yìbiān")}`, `${zh("一边一边我吃饭看书", "yìbiān yìbiān wǒ chīfàn kànshū")}`], correcta: 1,
        pista: '<p>Cada verbo lleva su propio ' + zh("一边", "yìbiān") + ' delante.</p>',
        solucion: `<p>Sujeto + ${zh("一边", "yìbiān")} + verbo 1 + ${zh("一边", "yìbiān")} + verbo 2.</p>` },
      { tipo: 'opciones', escucha: { voz: '弟弟一边玩游戏一边吃冰激凌' },
        sinAudio: '<p>Se dice <strong>dìdi yìbiān wán yóuxì yìbiān chī bīngjīlíng</strong>: dì baja y di es neutro; yì baja; biān es alto y plano; wán sube; yóu sube; xì baja; chī es alto y plano; bīng y jī son altos y planos; líng sube.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué hace el hermano menor?</p>',
        opciones: ['Ve un programa y charla', 'Toma fotos y bebe', 'Escucha música y escribe', 'Juega y come helado'], correcta: 3,
        pista: '<p>Fíjate en los dos verbos que van después de cada ' + zh("一边", "yìbiān") + '.</p>',
        solucion: `<p>Se oye ${zh("弟弟一边玩游戏一边吃冰激凌", "dìdi yìbiān wán yóuxì yìbiān chī bīngjīlíng")}: «mi hermano menor juega mientras come helado».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("照片")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['zhào piàn'],
        pista: '<p>Las dos sílabas bajan.</p>',
        solucion: `<p>${zh("照片", "zhàopiàn")}: <strong>zhào piàn</strong>.</p>` },
    ],
    fuentes: [SILABO, MSU_YIBIAN],
  });

  const VISITANTES = barras({
    etiquetas: ['año 1', 'año 2', 'año 3', 'año 4', 'año 5'], valores: [12, 18, 25, 33, 42], max: 50, paso: 10,
    descripcion: 'Gráfica de barras con cifras de ejemplo de los visitantes de un parque, en cientos, durante cinco años. Año 1, 12. Año 2, 18. Año 3, 25. Año 4, 33. Año 5, 42. Cada año hay más visitantes que el anterior.',
  });

  L('Cada vez más: 越来越', {
    objetivo: `Decir que algo aumenta con el tiempo con ${zh("越来越", "yuèláiyuè")} y relacionar dos cambios con ${zh("越", "yuè")}…${zh("越", "yuè")}….`,
    explicacion: `
      <p>Los días se alargan en primavera, tu ciudad se llena de gente, tu chino mejora poco a poco. Casi todo en la vida cambia de a poco, y en chino se dice «cada vez más» con una estructura muy corta, que no necesita más palabras que un adjetivo. También aprenderás a unir dos cambios que van de la mano, y los nombres de las cuatro estaciones. Primero, las doce palabras de la lección.</p>
      ${tabla([
        ['越', 'yuè', 'cada vez más (en las dos estructuras de la lección)'], ['更', 'gèng', 'todavía más'], ['变', 'biàn', 'cambiar, volverse'], ['变化', 'biànhuà', 'cambio'],
        ['城市', 'chéngshì', 'ciudad'], ['环境', 'huánjìng', 'entorno, medio ambiente'], ['春天', 'chūntiān', 'primavera'], ['夏天', 'xiàtiān', 'verano'],
        ['秋天', 'qiūtiān', 'otoño'], ['季节', 'jìjié', 'estación del año'], ['凉快', 'liángkuai', 'fresco, agradable'], ['风', 'fēng', 'viento'],
      ])}
      <h3>Cada vez más</h3>
      <p>La guía de la Universidad de Oxford dice que ${zh("越来越", "yuèláiyuè")} va siempre delante de un verbo de estado, es decir, un adjetivo, y delante del complemento de grado. Su primer ejemplo es ${zh("天气越来越冷了", "tiānqì yuèláiyuè lěng le")}, «hace cada vez más frío». El segundo es ${zh("火车开得越来越快了", "huǒchē kāi de yuèláiyuè kuài le")}, «el tren va cada vez más rápido». La Universidad de Princeton resume el patrón así: ${zh("越来越", "yuèláiyuè")} + adjetivo, «cada vez más».</p>
      <h3>Sin ${zh("很", "hěn")} y con ${zh("了", "le")}</h3>
      <p>En los ejemplos de Oxford y de Princeton no aparece ${zh("很", "hěn")} entre ${zh("越来越", "yuèláiyuè")} y el adjetivo. Como simplificación de la lección, no se lo pongas: ${zh("越来越", "yuèláiyuè")} ya trae la idea de «más». Los dos ejemplos de Oxford terminan en ${zh("了", "le")}; también como simplificación de la lección, ponlo cuando cuentes un cambio ya en marcha.</p>
      <h3>Dos cambios que van juntos</h3>
      <p>Oxford explica que ${zh("越", "yuè")}…${zh("越", "yuè")}… relaciona dos cosas: la primera parte muestra el grado del sentimiento, estado o acción, y la segunda muestra el resultado. Cada ${zh("越", "yuè")} va antes de un verbo, un adjetivo o un adverbio. Su ejemplo es ${zh("中文越学越难", "zhōngwén yuè xué yuè nán")}: «cuanto más estudias chino, más difícil se vuelve». Una frase de ejemplo de la lección: ${zh("雨越下越大", "yǔ yuè xià yuè dà")}, «cuanto más llueve, más fuerte llueve».</p>
      <h3>${zh("变", "biàn")} y ${zh("更", "gèng")}</h3>
      <p>Las dos palabras que se parecen a esta idea son ${zh("变", "biàn")}, «volverse», y ${zh("更", "gèng")}, «todavía más». Frases de ejemplo de la lección: ${zh("秋天天气变凉快了", "qiūtiān tiānqì biàn liángkuai le")}, «en otoño el tiempo se volvió fresco», y ${zh("秋天比夏天更凉快", "qiūtiān bǐ xiàtiān gèng liángkuai")}, «el otoño es todavía más fresco que el verano». Con ${zh("更", "gèng")} comparas dos cosas en un momento; con ${zh("越来越", "yuèláiyuè")} sigues una sola cosa a través del tiempo. Lo mismo vale para ${zh("变化", "biànhuà")}, el cambio: ${zh("城市的变化", "chéngshì de biànhuà")} es «el cambio de la ciudad», y ${zh("环境", "huánjìng")} es el entorno donde vives.</p>
      <p class="nota"><strong>Trampa común:</strong> poner un sustantivo después de ${zh("越来越", "yuèláiyuè")}, como en ${zh("越来越城市", "yuèláiyuè chéngshì")}. Oxford pide un verbo de estado, así que usa un adjetivo: ${zh("城市越来越大", "chéngshì yuèláiyuè dà")}, «la ciudad es cada vez más grande».</p>`,
    ejemplo: `
      <p>Mei vive en una ciudad y mira la gráfica de los visitantes de un parque cercano, en cientos de personas (cifras de ejemplo). Quiere contarle a su abuela, paso a paso, lo que ve.</p>
      ${VISITANTES}
      <ol class="pasos-ej">
        <li>Compara el año 1 y el año 5: pasó de 12 a 42 cientos. Mira cada barra: siempre es más alta que la anterior, nunca baja.</li>
        <li>Lo dice con un adjetivo: ${zh("公园里的人越来越多", "gōngyuán lǐ de rén yuèláiyuè duō")}.</li>
        <li>Para el tiempo de otoño: ${zh("天气越来越凉快了", "tiānqì yuèláiyuè liángkuai le")}.</li>
        <li>Para dos cambios que van juntos: ${zh("雨越下越大", "yǔ yuè xià yuè dà")}.</li>
      </ol>
      <p>Comprueba: tras ${zh("越来越", "yuèláiyuè")} va un adjetivo, sin ${zh("很", "hěn")}. Resultado: <span class="resultado">${zh("公园里的人越来越多", "gōngyuán lǐ de rén yuèláiyuè duō")} = «en el parque hay cada vez más gente»</span>.</p>`,
    vidaReal: `
      <p>Esta estructura sirve para hablar de lo que cambia poco a poco:</p>
      <ul>
        <li>Decir que los días se vuelven más cálidos al llegar el verano, semana tras semana.</li>
        <li>Contar que tu ciudad tiene cada vez más gente y más tráfico.</li>
        <li>Explicar que tu pronunciación mejora cuanto más practicas.</li>
        <li>Comentar que el viento sopla más fuerte antes de una tormenta y que conviene volver a casa.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «hace cada vez más frío» (el ejemplo de Oxford).</p>',
        respuesta: ['天气', '越来越', '冷', '了'], pinyin: ['tiānqì', 'yuèláiyuè', 'lěng', 'le'], lang: 'zh-Hans',
        pista: '<p>El adjetivo va justo detrás de ' + zh("越来越", "yuèláiyuè") + '.</p>',
        solucion: `<p>${zh("天气越来越冷了", "tiānqì yuèláiyuè lěng le")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según Oxford y Princeton, ¿qué va después de ${zh("越来越", "yuèláiyuè")}?</p>`,
        opciones: ['Un sustantivo', 'Un adjetivo', 'Un número', 'Un lugar'], correcta: 1,
        pista: '<p>Oxford habla de un verbo de estado.</p>',
        solucion: `<p>${zh("越来越", "yuèláiyuè")} + adjetivo = «cada vez más…».</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «en el parque hay cada vez más gente».</p>',
        respuesta: ['公园里', '的', '人', '越来越', '多'], pinyin: ['gōngyuán lǐ', 'de', 'rén', 'yuèláiyuè', 'duō'], lang: 'zh-Hans',
        pista: '<p>Primero el lugar y la gente; al final, el adjetivo.</p>',
        solucion: `<p>${zh("公园里的人越来越多", "gōngyuán lǐ de rén yuèláiyuè duō")}.</p>` },
      { tipo: 'numero', enunciado: `<p>Mira la gráfica de visitantes de ejemplo. ¿Cuántos cientos de visitantes más hay en el año 5 que en el año 1?</p>${VISITANTES}`,
        respuesta: 42 - 12,
        pista: '<p>Resta el valor del año 1 al del año 5.</p>',
        solucion: `<p>42 − 12 = 30 cientos. Cada año subió, así que ${zh("越来越多", "yuèláiyuè duō")} describe bien la gráfica.</p>` },
      { tipo: 'opciones', escucha: { voz: '雨越下越大' },
        sinAudio: '<p>Se dice <strong>yǔ yuè xià yuè dà</strong>: yǔ baja y sube; yuè baja; xià baja; yuè baja; dà baja.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice del clima?</p>',
        opciones: ['Cada vez llueve más fuerte', 'Cada vez hace más frío', 'Dejó de llover', 'Llueve menos que ayer'], correcta: 0,
        pista: '<p>Los dos verbos de la estructura son ' + zh("下", "xià") + ' y un adjetivo.</p>',
        solucion: `<p>Se oye ${zh("雨越下越大", "yǔ yuè xià yuè dà")}: «cuanto más llueve, más fuerte llueve».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("季节")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['jì jié'],
        pista: '<p>La primera sílaba baja; la segunda sube.</p>',
        solucion: `<p>${zh("季节", "jìjié")}: <strong>jì jié</strong>.</p>` },
    ],
    fuentes: [SILABO, OXFORD_YUE, PRINCETON_YUE],
  });

  L('Elegir al afirmar: 或者', {
    objetivo: `Ofrecer o contar alternativas en una afirmación con ${zh("或者", "huòzhě")}, y distinguirlo de ${zh("还是", "háishi")}, que se usa en las preguntas.`,
    explicacion: `
      <p>«El sábado voy a la biblioteca o al gimnasio.» Esa frase no pregunta nada: cuenta dos posibilidades. En español usamos «o» en ambos casos, pero el chino tiene dos palabras distintas, según sea una afirmación o una pregunta. Primero, las doce palabras de la lección.</p>
      ${tabla([
        ['或者', 'huòzhě', 'o (en afirmaciones)'], ['或', 'huò', 'o'], ['周末', 'zhōumò', 'fin de semana'], ['图书馆', 'túshūguǎn', 'biblioteca'],
        ['体育馆', 'tǐyùguǎn', 'gimnasio, recinto deportivo'], ['比赛', 'bǐsài', 'competencia, partido'], ['羽毛球', 'yǔmáoqiú', 'bádminton'], ['网球', 'wǎngqiú', 'tenis'],
        ['参加', 'cānjiā', 'participar en'], ['表演', 'biǎoyǎn', 'actuar; función'], ['晚会', 'wǎnhuì', 'velada, fiesta nocturna'], ['平时', 'píngshí', 'normalmente'],
      ])}
      <h3>Dos palabras para «o»</h3>
      <p>Kapiolani Community College lo explica así: ${zh("还是", "háishi")} es el «o» de las preguntas, y ${zh("或者", "huòzhě")} es el «o» de las afirmaciones. La Universidad Palacký (ChinGram) añade que ${zh("或者", "huòzhě")} presenta dos o más alternativas posibles a la vez, mientras que ${zh("还是", "háishi")} las presenta en una pregunta, donde por lo general solo se puede elegir una. De las preguntas ya hablaste en "Elegir en una pregunta: ${zh("还是")}".</p>
      <h3>La estructura</h3>
      <p>Kapiolani da la estructura: posibilidad 1 + ${zh("或者", "huòzhě")} + posibilidad 2. Su ejemplo habla de ir en avión o en tren de alta velocidad. Una frase de ejemplo de la lección, con palabras de este curso: ${zh("我们可以坐火车或者坐飞机去", "wǒmen kěyǐ zuò huǒchē huòzhě zuò fēijī qù")}, «podemos ir en tren o en avión».</p>
      <h3>La misma frase, afirmación y pregunta</h3>
      <p>ChinGram muestra la misma frase de las dos formas. Como afirmación, ${zh("他下午去打篮球或者去跑步", "tā xiàwǔ qù dǎ lánqiú huòzhě qù pǎobù")}: «por la tarde juega baloncesto o va a correr». Como pregunta, cambia ${zh("或者", "huòzhě")} por ${zh("还是", "háishi")}. Con palabras de la lección: ${zh("我周末去图书馆或者体育馆", "wǒ zhōumò qù túshūguǎn huòzhě tǐyùguǎn")} es «el fin de semana voy a la biblioteca o al gimnasio», y ${zh("你周末去图书馆还是体育馆", "nǐ zhōumò qù túshūguǎn háishi tǐyùguǎn")} es «¿el fin de semana vas a la biblioteca o al gimnasio?».</p>
      <h3>Una forma informal y abierta</h3>
      <p>Según ChinGram, ${zh("或者", "huòzhě")} presenta las alternativas de manera no excluyente e informal, y la oración afirmativa no implica una pregunta. Quiere decir que ambas opciones pueden ocurrir. ${zh("平时我想打网球或者羽毛球", "píngshí wǒ xiǎng dǎ wǎngqiú huòzhě yǔmáoqiú")}, por ejemplo, es «normalmente quiero jugar tenis o bádminton», y puedes hacer los dos.</p>
      <h3>Otras dos formas</h3>
      <p>El sílabo del HSK lista ${zh("或", "huò")} y ${zh("或者", "huòzhě")} como conjunciones que unen cláusulas, y añade el patrón ${zh("或者", "huòzhě")}…, ${zh("或者", "huòzhě")}…. Una frase de ejemplo de la lección: ${zh("或者你去，或者我去", "huòzhě nǐ qù, huòzhě wǒ qù")}, «o vas tú, o voy yo». Esa es toda la información que tenemos, así que no hay ejercicios con ella.</p>
      <p>Para practicar, piensa en tu propio fin de semana. Puedes ${zh("参加比赛", "cānjiā bǐsài")}, «participar en una competencia», o ir a ${zh("晚会", "wǎnhuì")} y hacer una ${zh("表演", "biǎoyǎn")}. Frase de ejemplo de la lección: ${zh("我想参加比赛或者晚会", "wǒ xiǎng cānjiā bǐsài huòzhě wǎnhuì")}, «quiero participar en una competencia o en una velada». Sigue siendo una afirmación, así que usas ${zh("或者", "huòzhě")}.</p>
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("还是", "háishi")} en una afirmación, como en ${zh("我想打网球还是羽毛球", "wǒ xiǎng dǎ wǎngqiú háishi yǔmáoqiú")}. Si no preguntas, usa ${zh("或者", "huòzhě")}.</p>`,
    ejemplo: `
      <p>Luis y su amiga Ana planean el fin de semana, y él quiere contarle sus ideas. Vamos paso a paso, y fíjate en qué palabra cambia cuando alguien pregunta.</p>
      <ol class="pasos-ej">
        <li>Luis tiene dos ideas: ${zh("去图书馆", "qù túshūguǎn")} y ${zh("去体育馆", "qù tǐyùguǎn")}.</li>
        <li>No pregunta, solo las cuenta: ${zh("周末我去图书馆或者去体育馆", "zhōumò wǒ qù túshūguǎn huòzhě qù tǐyùguǎn")}.</li>
        <li>Ana quiere saber cuál elige y lo convierte en pregunta: ${zh("周末你去图书馆还是去体育馆", "zhōumò nǐ qù túshūguǎn háishi qù tǐyùguǎn")}.</li>
        <li>Luis responde con otra afirmación, ahora sobre el deporte que le gusta: ${zh("我想打网球或者羽毛球", "wǒ xiǎng dǎ wǎngqiú huòzhě yǔmáoqiú")}.</li>
      </ol>
      <p>Comprueba: la oración que cuenta usa ${zh("或者", "huòzhě")}; la que pregunta usa ${zh("还是", "háishi")}. Resultado: <span class="resultado">${zh("周末我去图书馆或者去体育馆", "zhōumò wǒ qù túshūguǎn huòzhě qù tǐyùguǎn")} = «el fin de semana voy a la biblioteca o al gimnasio»</span>.</p>`,
    vidaReal: `
      <p>Esta estructura sirve cuando cuentas o propones opciones:</p>
      <ul>
        <li>Decirle a un amigo que puedes encontrarte con él el sábado o el domingo.</li>
        <li>Sugerir que pueden ir al cine o a comer algo después de clase.</li>
        <li>Contar que normalmente vas a la escuela en autobús o en bicicleta.</li>
        <li>Explicar que puedes practicar un deporte o participar en una función de la escuela.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Según Kapiolani, ¿cuál es el «o» de las afirmaciones?</p>`,
        opciones: [zh("还是", "háishi"), zh("或者", "huòzhě"), zh("和", "hé"), zh("也", "yě")], correcta: 1,
        pista: '<p>La otra palabra es para preguntas.</p>',
        solucion: `<p>${zh("或者", "huòzhě")} se usa en afirmaciones; ${zh("还是", "háishi")}, en preguntas.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «quiero jugar tenis o bádminton».</p>',
        respuesta: ['我', '想', '打', '网球', '或者', '羽毛球'], pinyin: ['wǒ', 'xiǎng', 'dǎ', 'wǎngqiú', 'huòzhě', 'yǔmáoqiú'], lang: 'zh-Hans',
        pista: '<p>' + zh("或者", "huòzhě") + ' va entre las dos posibilidades.</p>',
        solucion: `<p>${zh("我想打网球或者羽毛球", "wǒ xiǎng dǎ wǎngqiú huòzhě yǔmáoqiú")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Completa la pregunta «¿quieres té o café?»: ${zh("你想喝茶", "nǐ xiǎng hē chá")} ___ ${zh("咖啡", "kāfēi")}.</p>`,
        opciones: [zh("还是", "háishi"), zh("或者", "huòzhě"), zh("和", "hé"), zh("都", "dōu")], correcta: 0,
        pista: '<p>Es una pregunta.</p>',
        solucion: `<p>En una pregunta va ${zh("还是", "háishi")}: ${zh("你想喝茶还是咖啡", "nǐ xiǎng hē chá háishi kāfēi")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «el fin de semana voy a la biblioteca o al gimnasio».</p>',
        respuesta: ['周末', '我', '去', '图书馆', '或者', '体育馆'], pinyin: ['zhōumò', 'wǒ', 'qù', 'túshūguǎn', 'huòzhě', 'tǐyùguǎn'], lang: 'zh-Hans',
        alternativas: [['我', '周末', '去', '图书馆', '或者', '体育馆']],
        pista: '<p>La palabra de tiempo puede ir antes o después de ' + zh("我", "wǒ") + '.</p>',
        solucion: `<p>${zh("周末我去图书馆或者体育馆", "zhōumò wǒ qù túshūguǎn huòzhě tǐyùguǎn")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '平时我骑自行车或者坐汽车去学校' },
        sinAudio: '<p>Se dice <strong>píngshí wǒ qí zìxíngchē huòzhě zuò qìchē qù xuéxiào</strong>: píng y shí suben; wǒ baja y sube; qí sube; zì baja; xíng sube; chē es alto y plano; huò baja; zhě sube; zuò baja; qì baja; chē es alto y plano; qù baja; xué sube; xiào baja.</p>',
        enunciado: '<p>Escucha la frase. ¿Cómo va normalmente la persona a la escuela?</p>',
        opciones: ['A pie o en metro', 'En bicicleta o en coche', 'En taxi o en tren', 'En avión o en barco'], correcta: 1,
        pista: '<p>Escucha los dos verbos de transporte: uno es ' + zh("骑", "qí") + ' y el otro ' + zh("坐", "zuò") + '.</p>',
        solucion: `<p>Se oye ${zh("平时我骑自行车或者坐汽车去学校", "píngshí wǒ qí zìxíngchē huòzhě zuò qìchē qù xuéxiào")}: «normalmente voy a la escuela en bicicleta o en coche».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("周末")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['zhōu mò'],
        pista: '<p>La primera sílaba es alta y plana; la segunda baja.</p>',
        solucion: `<p>${zh("周末", "zhōumò")}: <strong>zhōu mò</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_HUOZHE, KAPIOLANI_HUOZHE],
  });

  L('Cualquiera y nadie: 谁都 y 什么都', {
    objetivo: `Usar una palabra de pregunta con ${zh("都", "dōu")} para decir «todo» o «todos», con ${zh("不", "bù")} o ${zh("没", "méi")} para decir «nada» o «ninguno», y leer un texto que junta varios puntos de la unidad.`,
    explicacion: `
      <p>Preguntar «¿quién viene?» es una cosa; decir «todos vienen» o «nadie viene» es otra, y el chino usa las mismas palabras de pregunta para las tres. Esta es la última lección de la unidad, y la cerramos con un texto corto. Primero, las doce palabras.</p>
      ${tabla([
        ['别人', 'biérén', 'los demás, otras personas'], ['咱们', 'zánmen', 'nosotros'], ['其他', 'qítā', 'otro, los demás'], ['别的', 'biéde', 'otro, lo demás'],
        ['到处', 'dàochù', 'por todas partes'], ['害怕', 'hàipà', 'tener miedo'], ['奇怪', 'qíguài', 'raro, extraño'], ['相信', 'xiāngxìn', 'creer, confiar en'],
        ['同意', 'tóngyì', 'estar de acuerdo'], ['当然', 'dāngrán', 'por supuesto'], ['其实', 'qíshí', 'en realidad'], ['一共', 'yígòng', 'en total'],
      ])}
      <h3>Una pregunta que no pregunta</h3>
      <p>Según ChinGram, ${zh("什么", "shénme")} + ${zh("都", "dōu")} forma una construcción de generalización, «todo». Su ejemplo es ${zh("什么都很好", "shénme dōu hěn hǎo")}: «todo está bien». Oxford añade que estas construcciones también describen a la gente en general, como ${zh("谁都喜欢吃中国菜", "shéi dōu xǐhuan chī zhōngguó cài")}, «a todo el mundo le gusta la comida china», y que sirven para una categorización general: ${zh("我什么菜都吃", "wǒ shénme cài dōu chī")}, «como de todo».</p>
      <h3>Dónde va ${zh("都", "dōu")}</h3>
      <p>Oxford dice que ${zh("都", "dōu")} va antes del verbo. ChinGram precisa que, cuando ${zh("什么", "shénme")} es el objeto, la construcción ${zh("什么都", "shénme dōu")} va entre el sujeto y el verbo, no al final. Por eso el objeto sale delante: ${zh("我什么都吃", "wǒ shénme dōu chī")}, no ${zh("我吃什么都", "wǒ chī shénme dōu")}.</p>
      <h3>Con negación: «nada», «ningún lado»</h3>
      <p>ChinGram explica que, en oraciones negativas, ${zh("什么", "shénme")} expresa generalización negativa: «nada». Con ${zh("什么", "shénme")} + ${zh("都", "dōu")} + ${zh("不", "bù")} o ${zh("没", "méi")} se enfatiza esa idea. Oxford dice que en las negativas se usa ${zh("也", "yě")} en lugar de ${zh("都", "dōu")}, con ${zh("不", "bù")} o ${zh("没", "méi")} antes del verbo, y que no hay diferencia real de significado: ${zh("也", "yě")} es más frecuente en negativas, y ${zh("都", "dōu")} sirve en afirmativas y negativas. Ejemplos: ${zh("他什么也不吃", "tā shénme yě bù chī")}, «no come nada» (ChinGram), y ${zh("我哪儿也不去", "wǒ nǎr yě bú qù")}, «no voy a ningún lado» (Oxford). Una frase de ejemplo de la lección: ${zh("我什么都没带", "wǒ shénme dōu méi dài")}, «no traje nada».</p>
      <p>La frase de Oxford con ${zh("谁都", "shéi dōu")} es afirmativa, y es la que practicamos con ${zh("谁", "shéi")}. ChinGram añade que, si hay un verbo modal, la negación va antes de él: ${zh("哪儿也不想去", "nǎr yě bù xiǎng qù")}, «no quiero ir a ningún lado».</p>
      <h3>Otros usos</h3>
      <p>ChinGram dice que ${zh("什么", "shénme")} en una afirmación sin ${zh("都", "dōu")} expresa algo indefinido, «algo». Ese uso solo se menciona aquí. Tampoco hay reglas aparte para ${zh("咱们", "zánmen")}, ${zh("别人", "biérén")}, ${zh("别的", "biéde")} y ${zh("其他", "qítā")}: son palabras que debes reconocer.</p>
      <p>Con las palabras de la tabla ya puedes responder. Si alguien pregunta ${zh("你同意吗", "nǐ tóngyì ma")}, «¿estás de acuerdo?», puedes decir ${zh("当然同意", "dāngrán tóngyì")}, «por supuesto que sí». Y ${zh("其实", "qíshí")} sirve para abrir una aclaración: «en realidad…». Son frases de ejemplo de la lección.</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("什么都", "shénme dōu")} después del verbo. Va entre el sujeto y el verbo.</p>`,
    ejemplo: `
      <p>Para cerrar la unidad, lee este texto de Mei (texto de ejemplo de la lección). Entre paréntesis ves el punto que usa cada línea.</p>
      <ol class="pasos-ej">
        <li>${zh("周末天气很好，只要不下雨，我们就去公园", "zhōumò tiānqì hěn hǎo, zhǐyào bú xiàyǔ, wǒmen jiù qù gōngyuán")}. (${zh("只要", "zhǐyào")}…${zh("就", "jiù")}…)</li>
        <li>${zh("妈妈带了西瓜和饮料", "māma dài le xīguā hé yǐnliào")}. (${zh("带", "dài")} y ${zh("了", "le")})</li>
        <li>${zh("我们一边吃西瓜，一边聊天儿", "wǒmen yìbiān chī xīguā, yìbiān liáotiānr")}. (${zh("一边", "yìbiān")}…${zh("一边", "yìbiān")}…)</li>
        <li>${zh("弟弟不但喜欢拍照，而且什么都想看", "dìdi búdàn xǐhuan pāizhào, érqiě shénme dōu xiǎng kàn")}. (${zh("不但", "búdàn")}…${zh("而且", "érqiě")}… y ${zh("什么都", "shénme dōu")})</li>
        <li>${zh("天气越来越热，我们哪儿也不想去了", "tiānqì yuèláiyuè rè, wǒmen nǎr yě bù xiǎng qù le")}. (${zh("越来越", "yuèláiyuè")} y ${zh("哪儿也不", "nǎr yě bù")})</li>
        <li>${zh("如果明天也很热，咱们就在家看节目", "rúguǒ míngtiān yě hěn rè, zánmen jiù zài jiā kàn jiémù")}. (${zh("如果", "rúguǒ")}…${zh("就", "jiù")}…)</li>
      </ol>
      <p>Resultado: <span class="resultado">${zh("弟弟什么都想看", "dìdi shénme dōu xiǎng kàn")} = «mi hermano menor quiere verlo todo»</span>.</p>`,
    vidaReal: `
      <p>Esta estructura aparece cuando hablas en general o niegas todo:</p>
      <ul>
        <li>Decir que a todo el mundo le gusta una comida típica de tu país.</li>
        <li>Contestar que comes de todo, para que nadie se preocupe por tu comida.</li>
        <li>Explicar que no tienes nada que declarar cuando alguien te pregunta qué llevas.</li>
        <li>Contar que hoy no quieres ir a ningún lado porque estás cansado.</li>
        <li>Asegurar que estás de acuerdo con todos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Según Oxford, ¿qué significa ${zh("谁都喜欢吃中国菜", "shéi dōu xǐhuan chī zhōngguó cài")}?</p>`,
        opciones: ['Nadie quiere comer comida china', 'Yo como de todo', 'A todo el mundo le gusta la comida china', 'Pregunto quién come comida china'], correcta: 2,
        pista: '<p>' + zh("谁", "shéi") + ' + ' + zh("都", "dōu") + ' = «todos».</p>',
        solucion: `<p>${zh("谁都", "shéi dōu")} describe a la gente en general: «a todo el mundo le gusta…».</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «como de todo» (el ejemplo de Oxford).</p>',
        respuesta: ['我', '什么', '菜', '都', '吃'], pinyin: ['wǒ', 'shénme', 'cài', 'dōu', 'chī'], lang: 'zh-Hans',
        pista: '<p>' + zh("都", "dōu") + ' va justo antes del verbo.</p>',
        solucion: `<p>${zh("我什么菜都吃", "wǒ shénme cài dōu chī")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «no come nada» (el ejemplo de ChinGram).</p>',
        respuesta: ['他', '什么', '也', '不', '吃'], pinyin: ['tā', 'shénme', 'yě', 'bù', 'chī'], lang: 'zh-Hans',
        pista: '<p>Primero la palabra de pregunta, luego ' + zh("也", "yě") + ', luego la negación y el verbo.</p>',
        solucion: `<p>${zh("他什么也不吃", "tā shénme yě bù chī")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según Oxford, ¿qué significa ${zh("我哪儿也不去", "wǒ nǎr yě bú qù")}?</p>`,
        opciones: ['Voy a todos lados', 'No voy a ningún lado', 'Pregunto adónde voy', 'Voy a algún lado'], correcta: 1,
        pista: '<p>Mira la negación ' + zh("不", "bù") + ' antes del verbo.</p>',
        solucion: `<p>${zh("哪儿", "nǎr")} + ${zh("也", "yě")} + ${zh("不", "bù")} + verbo = «no voy a ningún lado».</p>` },
      { tipo: 'opciones', enunciado: `<p>En el texto del ejemplo, ¿qué harán si mañana también hace calor?</p>`,
        opciones: ['Irán al parque otra vez', 'Comerán sandía', 'Tomarán fotos', 'Se quedarán en casa viendo un programa'], correcta: 3,
        pista: '<p>Busca la última línea, la que lleva ' + zh("如果", "rúguǒ") + '.</p>',
        solucion: `<p>${zh("如果明天也很热，咱们就在家看节目", "rúguǒ míngtiān yě hěn rè, zánmen jiù zài jiā kàn jiémù")}: se quedan en casa a ver un programa.</p>` },
      { tipo: 'opciones', escucha: { voz: '我什么都没带' },
        sinAudio: '<p>Se dice <strong>wǒ shénme dōu méi dài</strong>: wǒ baja y sube; shén sube; me es neutro; dōu es alto y plano; méi sube; dài baja.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice la persona?</p>',
        opciones: ['No llevó nada', 'Llevó de todo', 'No fue a ningún lado', 'Nadie vino'], correcta: 0,
        pista: '<p>Escucha la negación antes del verbo.</p>',
        solucion: `<p>Se oye ${zh("我什么都没带", "wǒ shénme dōu méi dài")}: «no traje nada».</p>` },
    ],
    fuentes: [SILABO, CHIN_SHENME, OXFORD_QW_DOU],
  });
})();
