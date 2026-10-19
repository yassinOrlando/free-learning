// Mandarín · Unidad 15: HSK 5 · Cultura y lectura.
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
  const MOE = (n, id) => ({ nombre: `Ministerio de Educación de Taiwán, 《成語典》2020: ${n} (en chino; diccionario oficial)`, url: `https://dict.idioms.moe.edu.tw/idiomView.jsp?ID=${id}&webMd=1&la=0` });
  const MOE_HUA = MOE('畫蛇添足', 23), MOE_SHOU = MOE('守株待兔', 39), MOE_DUI = MOE('對牛彈琴', 47), MOE_ZI = MOE('自相矛盾', 89);
  const ALLSET = (n, url) => ({ nombre: 'Chinese Grammar Wiki (AllSet Learning), fuente de apoyo no universitaria: ' + n + ' (en inglés)', url: 'https://resources.allsetlearning.com/chinese/grammar/' + url });
  const ALLSET_LAIQU = ALLSET('Using "lai" and "qu" when "verbing around"', 'Using_%22lai%22_and_%22qu%22_when_%22verbing_around%22');
  const MIT_U7 = { nombre: 'Instituto Tecnológico de Massachusetts (EE. UU.), MIT OpenCourseWare, Learning Chinese: A Foundation Course in Mandarin, Unit 7 (Wheatley), 2011 (en inglés)', url: 'https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/9ac5a3ef1007db50644516dee9a1d249_MITRES_21G_003S11_unit07.pdf' };
  const WIKT_MEIWAN = { nombre: 'Wikcionario en inglés (fuente de apoyo): 沒完沒了 / 没完没了', url: 'https://en.wiktionary.org/wiki/%E6%B2%92%E5%AE%8C%E6%B2%92%E4%BA%86' };

  // ------------------------------------------------------------------
  L('Modismos de cuatro caracteres: 成语', {
    objetivo: `Leer cuatro ${zh("成语", "chéngyǔ")} con su historia de origen y armar frases con ${zh("A来A去", "A lái A qù")}, ${zh("没A没B", "méi A méi B")} y ${zh("说A就A", "shuō A jiù A")}.`,
    explicacion: `
      <p>Esta unidad cierra HSK 5 con cultura y lectura. Cada lección trae una selección de 15 palabras, no toda la lista; la lista completa está en el <a href="${encodeURI(SILABO.url)}">sílabo</a>. Las frases de ejemplo son de la lección. La voz depende de tu dispositivo: si suena rara, el pinyin manda. Y ${zh("不", "bù")} y ${zh("一", "yī")} se escriben con su tono original; al hablar cambian, como viste en "Cambios de tono: el tercer tono, ${zh("不")} y ${zh("一")}" (unidad 1).</p>
      <p>Imagina que alguien te dice «no le pongas patas a la serpiente» justo cuando ibas a añadir algo que sobra. En chino, cuatro caracteres bastan para contar esa historia. Eso es un ${zh("成语", "chéngyǔ")}. En "Refranes y frases célebres" (unidad 12) viste qué son; aquí los usamos para leer, porque cada uno viene de una historia antigua que lo explica.</p>
      ${tabla([
        ['词汇', 'cíhuì', 'vocabulario, conjunto de palabras'], ['来源', 'láiyuán', 'origen, fuente'], ['出自', 'chūzì', 'provenir de (un libro o relato)'], ['古代', 'gǔdài', 'época antigua'], ['意义', 'yìyì', 'significado, sentido'],
        ['表达', 'biǎodá', 'expresar'], ['概括', 'gàikuò', 'resumir'], ['讲述', 'jiǎngshù', 'contar, narrar'], ['流传', 'liúchuán', 'circular, transmitirse de generación en generación'], ['经典', 'jīngdiǎn', 'clásico, obra clásica'],
        ['记载', 'jìzǎi', 'registrar por escrito; registro'], ['道理', 'dàolǐ', 'razón, lección, lo razonable'], ['用法', 'yòngfǎ', 'forma de usarse'], ['文学', 'wénxué', 'literatura'], ['语气', 'yǔqì', 'tono, modo de decir algo'],
      ])}
      <p>Un ${zh("成语", "chéngyǔ")} resume una historia en cuatro caracteres. Por eso se dice que ${zh("概括", "gàikuò")} un relato: ${zh("成语概括了一个古代故事", "chéngyǔ gàikuò le yī gè gǔdài gùshi")}, «el ${zh("成语", "chéngyǔ")} resume una historia antigua». Y para decir de dónde viene: ${zh("这个成语出自古代的故事", "zhège chéngyǔ chūzì gǔdài de gùshi")}.</p>
      <h3>¿De dónde sale cada uno?</h3>
      <p>El diccionario oficial del Ministerio de Educación de Taiwán (2020) da el significado y el libro de origen de cada ${zh("成语", "chéngyǔ")}. Está en caracteres tradicionales; aquí los ves en simplificados.</p>
      ${cuadro(['Expresión', 'Qué quiere decir', 'Origen según el diccionario'], [
        [zh('画蛇添足', 'huà shé tiān zú'), 'Hacer algo de más que estropea el asunto.', zh('《战国策》', 'Zhànguó Cè') + ', capítulo del reino de Qi.'],
        [zh('守株待兔', 'shǒu zhū dài tù'), 'Aferrarse a un método viejo o esperar ganar sin trabajar.', zh('《韩非子》', 'Hán Fēizǐ') + ', capítulo «Los cinco parásitos».'],
        [zh('对牛弹琴', 'duì niú tán qín'), 'Hablar o actuar sin fijarse en quién escucha.', zh('《弘明集》', 'Hóngmíng jí') + '.'],
        [zh('自相矛盾', 'zì xiāng máo dùn'), 'Que lo dicho o hecho se contradice entre sí.', zh('《韩非子》', 'Hán Fēizǐ') + ', capítulo de las objeciones.'],
      ])}
      <p>En la primera, quien le puso patas a la serpiente que había dibujado perdió el vino que le pertenecía. En la segunda, un campesino del reino de Song esperó junto a un árbol a que otra liebre chocara contra el tronco, y no consiguió más. En la tercera, un músico toca para un buey, que sigue comiendo con la cabeza baja. En la cuarta, un vendedor de lanzas y escudos de Chu se quedó sin palabras cuando le preguntaron qué pasaría si usaba su lanza contra su escudo.</p>
      <h3>Tres moldes de cuatro caracteres</h3>
      <p>El sílabo de nivel 5 lista como ${zh("四字格", "sìzìgé")}, «forma de cuatro caracteres», los moldes ${zh("没A没B", "méi A méi B")} y ${zh("说A就A", "shuō A jiù A")}, y aparte el molde ${zh("A来A去", "A lái A qù")}. AllSet explica que ${zh("A来A去", "A lái A qù")} repite el mismo verbo, casi siempre de una sílaba, para decir que algo se hace sin dirección clara, «de aquí para allá»: ${zh("走来走去", "zǒu lái zǒu qù")}. Su ejemplo: estudiantes nerviosos que caminan de un lado a otro fuera del examen.</p>
      <p>Para ${zh("没A没B", "méi A méi B")} tienes ${zh("没完没了", "méi wán méi liǎo")}: MIT lo glosa literalmente como «no terminado, no completo», y Wikcionario (apoyo) como «ser interminable». Por último, ${zh("说A就A", "shuō A jiù A")} no tiene regla en las fuentes; como simplificación de la lección, ${zh("说走就走", "shuō zǒu jiù zǒu")} es «decir que vas y ya ir»: algo que se hace en cuanto se decide.</p>
      <p class="nota"><strong>Trampa común:</strong> traducir un ${zh("成语", "chéngyǔ")} palabra por palabra. Sirve para recordar la imagen, pero el significado es el de la historia.</p>`,
    ejemplo: `
      <p>Quieres decir: «Este ${zh("成语", "chéngyǔ")} viene de una historia antigua». Vamos por partes.</p>
      <ol class="pasos-ej">
        <li>Empieza por lo que hablas: ${zh("这个成语", "zhège chéngyǔ")}, «este ${zh("成语", "chéngyǔ")}». Es el sujeto.</li>
        <li>Añade el verbo de origen, ${zh("出自", "chūzì")}, justo después: ${zh("这个成语出自", "zhège chéngyǔ chūzì")}.</li>
        <li>Di de dónde sale con ${zh("古代的故事", "gǔdài de gùshi")}. La ${zh("的", "de")} une «antigua» con «historia».</li>
      </ol>
      <p>Para comprobar, lee en voz alta: sujeto, verbo y origen, el mismo orden que en español. Si falta la ${zh("的", "de")}, la frase se corta en dos ideas sueltas. Resultado: <span class="resultado">${zh("这个成语出自古代的故事", "zhège chéngyǔ chūzì gǔdài de gùshi")} = «este ${zh("成语", "chéngyǔ")} viene de una historia antigua»</span>.</p>
      <p class="nota"><strong>Error común:</strong> repetir mal el verbo en ${zh("A来A去", "A lái A qù")}. Si dices ${zh("走来跑去", "zǒu lái pǎo qù")}, ya no es el molde: el verbo debe ser el mismo.</p>`,
    vidaReal: `
      <p>Estas frases de cuatro caracteres aparecen en muchos lugares:</p>
      <ul>
        <li>Entender por qué alguien dice una frase breve y todos asienten, porque resume una historia que conocen.</li>
        <li>Reconocer en un libro o en un artículo de dónde viene una expresión.</li>
        <li>Contar a otra persona, con tus palabras, el relato que hay detrás.</li>
        <li>Decir que alguien va y viene sin rumbo, o que algo no termina nunca.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «este modismo viene de una historia antigua».</p>',
        respuesta: ['这个', '成语', '出自', '古代', '的', '故事'], pinyin: ['zhège', 'chéngyǔ', 'chūzì', 'gǔdài', 'de', 'gùshi'], lang: 'zh-Hans',
        pista: `<p>Primero el sujeto, luego ${zh("出自", "chūzì")} y al final el origen.</p>`,
        solucion: `<p>${zh("这个成语出自古代的故事", "zhège chéngyǔ chūzì gǔdài de gùshi")}: sujeto, verbo de origen y ${zh("古代的故事", "gǔdài de gùshi")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según el diccionario del Ministerio de Educación de Taiwán, ¿qué quiere decir ${zh("画蛇添足", "huà shé tiān zú")}?</p>`,
        opciones: ['Esperar sin trabajar', 'Hacer algo de más que estropea el asunto', 'Hablar sin fijarse en quién escucha', 'Dejar algo a medias'], correcta: 1,
        pista: '<p>Piensa en quien le puso patas a la serpiente.</p>',
        solucion: `<p>${zh("画蛇添足", "huà shé tiān zú")} es hacer de más y estropear: quien dibujó patas perdió el vino.</p>` },
      { tipo: 'opciones', enunciado: `<p>Un vendedor de lanzas y escudos se queda sin palabras al preguntarle qué pasaría si usara su lanza contra su escudo. ¿Qué ${zh("成语", "chéngyǔ")} resume la historia?</p>`,
        opciones: [zh('守株待兔', 'shǒu zhū dài tù'), zh('对牛弹琴', 'duì niú tán qín'), zh('画蛇添足', 'huà shé tiān zú'), zh('自相矛盾', 'zì xiāng máo dùn')], correcta: 3,
        pista: `<p>Lanza y escudo se contradicen.</p>`,
        solucion: `<p>${zh("自相矛盾", "zì xiāng máo dùn")}: lo que dices se contradice con lo que dices.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según AllSet, ¿qué dice ${zh("他在门口走来走去", "tā zài ménkǒu zǒu lái zǒu qù")}?</p>`,
        opciones: ['Que va de un lado a otro sin rumbo claro', 'Que llegó a la puerta', 'Que se fue y no volvió', 'Que corre muy rápido'], correcta: 0,
        pista: `<p>${zh("A来A去", "A lái A qù")} repite el verbo: «de aquí para allá».</p>`,
        solucion: `<p>${zh("走来走去", "zǒu lái zǒu qù")} es «andar de un lado a otro», sin dirección clara.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("来源")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['lái yuán'],
        pista: '<p>Las dos sílabas son de segundo tono: empiezan bajo y suben.</p>',
        solucion: `<p>${zh("来源", "láiyuán")}: <strong>lái yuán</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("古代", "gǔdài")}.</p>`,
        respuestas: ['epoca antigua', 'la epoca antigua', 'antiguedad', 'la antiguedad', 'tiempos antiguos', 'los tiempos antiguos', 'edad antigua', 'antiguo', 'antigua', 'antiguo tiempo'],
        pista: '<p>Es el tiempo de hace muchísimos años.</p>',
        solucion: `<p>${zh("古代", "gǔdài")} es «época antigua».</p>` },
    ],
    fuentes: [SILABO, MOE_HUA, MOE_SHOU, MOE_DUI, MOE_ZI, ALLSET_LAIQU, MIT_U7, WIKT_MEIWAN],
  });

  const ALLSET_BAI = ALLSET('Expressing wasted efforts with "bai"', 'Expressing_wasted_efforts_with_%22bai%22');
  const ALLSET_ZHE = ALLSET('Using "zhe" when "verbing away"', 'Using_%22zhe%22_when_%22verbing_away%22');
  const MIT_U8 = { nombre: 'Instituto Tecnológico de Massachusetts (EE. UU.), MIT OpenCourseWare, Learning Chinese: A Foundation Course in Mandarin, Unit 8 (Wheatley), 2011 (en inglés)', url: 'https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/3fb7ed18b72df30602aba28f4e94abe6_MITRES_21G_003S11_unit08.pdf' };
  const WIKT_ZAOWAN = { nombre: 'Wikcionario en inglés (fuente de apoyo): 早晚 (en inglés)', url: 'https://en.wiktionary.org/wiki/%E6%97%A9%E6%99%9A' };
  const WIKT_GANGHAO = { nombre: 'Wikcionario en inglés (fuente de apoyo): 剛好 / 刚好 (en inglés)', url: 'https://en.wiktionary.org/wiki/%E5%89%9B%E5%A5%BD' };
  const UCSD = { nombre: 'Universidad de California en San Diego (EE. UU.), David K. Jordan, Chinese folktales: The Cowherd and the Weaving Maid (en inglés)', url: 'https://pages.ucsd.edu/~dkjordan/chin/chtales/story211.html' };
  const EMB_OTONO = { nombre: 'Embajada de China en Nepal (gobierno de China), «The Mid-Autumn Festival: A Time for Reunion», 2005 (en inglés)', url: 'https://np.china-embassy.gov.cn/eng/Culture/jr/200509/t20050915_1997804.htm' };

  // ------------------------------------------------------------------
  L('Leyendas populares', {
    objetivo: `Contar con tus palabras dos leyendas chinas y usar ${zh("A着A着", "A zhe A zhe")}, ${zh("白", "bái")}, ${zh("早晚", "zǎowǎn")}, ${zh("刚好", "gānghǎo")} y el clasificador ${zh("匹", "pǐ")}.`,
    explicacion: `
      <p>¿Por qué la Luna parece tener una figura? ¿Por qué hay una franja de estrellas en el cielo? Todos los pueblos inventaron historias para responder. En chino, una historia que pasa de boca en boca es una ${zh("传说", "chuánshuō")}, «leyenda»; si trata de dioses, es una ${zh("神话", "shénhuà")}, «mito». Dos leyendas chinas conocidas dan nombre a fiestas. Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['传说', 'chuánshuō', 'leyenda; se dice que'], ['神话', 'shénhuà', 'mito'], ['龙', 'lóng', 'dragón'], ['敌人', 'dírén', 'enemigo'], ['救', 'jiù', 'salvar, rescatar'],
        ['命运', 'mìngyùn', 'destino'], ['天上', 'tiānshàng', 'en el cielo'], ['匹', 'pǐ', 'clasificador de caballos'], ['早晚', 'zǎowǎn', 'mañana y tarde; tarde o temprano'], ['刚好', 'gānghǎo', 'justo, exactamente'],
        ['白', 'bái', 'en vano; también «blanco»'], ['消失', 'xiāoshī', 'desaparecer'], ['守', 'shǒu', 'vigilar, cuidar'], ['追', 'zhuī', 'perseguir'], ['时代', 'shídài', 'época, tiempos'],
      ])}
      <h3>Dos leyendas</h3>
      <p>La primera es ${zh("牛郎织女", "Niúláng Zhīnǚ")}. Según la versión de la Universidad de California en San Diego, la Tejedora era una doncella del palacio celestial de la Reina Madre del Oeste; el Pastor era un joven huérfano que vivía con su hermano mayor, quien lo trataba como a un sirviente. Ella se quedó en el mundo de los mortales, se casaron y tuvieron dos hijos. La Reina Madre mandó llevarse a la Tejedora y, con una horquilla, creó un río celeste: la Vía Láctea. Les permitió verse una noche al año, el séptimo día del séptimo mes lunar, y ese día se llama ${zh("七夕节", "qīxījié")}. Algunos dicen que ella es la estrella Vega y él la estrella Altair.</p>
      <p>La segunda es ${zh("嫦娥奔月", "Cháng’é bēn yuè")}, «Chang E vuela a la Luna». La embajada de China (2005) cuenta que el arquero Hou Yi derribó nueve de los diez soles que abrasaban la Tierra. Una diosa le dio un elixir de inmortalidad y él se lo confió a su esposa Chang E. Cuando alguien quiso quitárselo, ella lo bebió, empezó a elevarse y se quedó en la Luna. Hou Yi puso en el jardín las frutas favoritas de ella, y la gente hizo lo mismo: de ahí viene la costumbre del Medio Otoño, el día 15 del octavo mes lunar. Más de esa fiesta, en "Festividades y cultura china" (unidad 8).</p>
      <h3>Gramática para contar</h3>
      <p>Para contar, AllSet explica ${zh("A着A着", "A zhe A zhe")}: un verbo repetido con ${zh("着", "zhe")} muestra que una acción duró un rato y de ahí salió algo nuevo. Un ejemplo con su molde: ${zh("走着走着，我就走丢了", "zǒu zhe zǒu zhe, wǒ jiù zǒu diū le")}, «de tanto caminar, me perdí». Sigue el patrón verbo, ${zh("着", "zhe")}, verbo, ${zh("着", "zhe")}, ${zh("就", "jiù")}, comentario y ${zh("了", "le")}.</p>
      <p>${zh("白", "bái")} antes de un verbo significa «en vano», según AllSet, y se usa sobre todo con verbos de una sílaba: ${zh("他白跑了", "tā bái pǎo le")}, «corrió en vano». ${zh("早晚", "zǎowǎn")} es, según Wikcionario (apoyo), «mañana y tarde» como sustantivo y «tarde o temprano» como adverbio; el sílabo lo lista entre los adverbios de tiempo: ${zh("他们早晚会见面", "tāmen zǎowǎn huì jiànmiàn")}. ${zh("刚好", "gānghǎo")} es «justo»: ${zh("他刚好准时到学校", "tā gānghǎo zhǔnshí dào xuéxiào")}, «llegó a la escuela justo a tiempo». Y MIT lista ${zh("匹", "pǐ")} para caballos: ${zh("一匹马", "yī pǐ mǎ")}.</p>
      <p class="nota"><strong>Trampa común:</strong> ${zh("白", "bái")} es «blanco» como color, pero antes de un verbo es «en vano». El verbo te dice cuál.</p>`,
    ejemplo: `
      <p>Quieres decir: «Caminando y caminando, vimos un caballo». Por partes.</p>
      <ol class="pasos-ej">
        <li>Repite el verbo con ${zh("着", "zhe")}: ${zh("走着走着", "zǒu zhe zǒu zhe")}. Dice que caminaron un rato.</li>
        <li>Añade ${zh("就", "jiù")} y lo que pasó: ${zh("就看见了", "jiù kànjiàn le")}.</li>
        <li>Pon el clasificador entre el número y lo contado: ${zh("一匹马", "yī pǐ mǎ")}.</li>
      </ol>
      <p>Comprueba que la acción nueva va después de ${zh("就", "jiù")}: primero el rato de caminar y después lo que apareció. Si lo lees en voz alta, la frase cuenta el camino en el mismo orden en que ocurrió, igual que en español, y el clasificador queda pegado al caballo. Resultado: <span class="resultado">${zh("我们走着走着，就看见了一匹马", "wǒmen zǒu zhe zǒu zhe, jiù kànjiàn le yī pǐ mǎ")} = «caminando y caminando, vimos un caballo»</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar ${zh("匹", "pǐ")} con cualquier animal. En el curso de MIT es para caballos.</p>`,
    vidaReal: `
      <p>Conocer estas historias te sirve en varias situaciones:</p>
      <ul>
        <li>Entender por qué en ciertas fechas la gente mira la Luna o las estrellas.</li>
        <li>Contar una leyenda en pocas frases, con un principio, un problema y un final.</li>
        <li>Reconocer el nombre de una fiesta en un calendario.</li>
        <li>Seguir un relato en el que alguien cuenta cómo, caminando, llegó a un lugar inesperado.</li>
        <li>Contar a tu familia por qué se cuenta una historia en cada fiesta.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «caminando y caminando, vimos un caballo».</p>',
        respuesta: ['我们', '走着', '走着', '就', '看见了', '一匹', '马'], alternativas: [['走着', '走着', '我们', '就', '看见了', '一匹', '马']], pinyin: ['wǒmen', 'zǒu zhe', 'zǒu zhe', 'jiù', 'kànjiàn le', 'yī pǐ', 'mǎ'], lang: 'zh-Hans',
        pista: `<p>El verbo repetido va antes de ${zh("就", "jiù")}.</p>`,
        solucion: `<p>${zh("我们走着走着，就看见了一匹马", "wǒmen zǒu zhe zǒu zhe, jiù kànjiàn le yī pǐ mǎ")}: sujeto, verbo repetido, ${zh("就", "jiù")} y lo nuevo.</p>` },
      { tipo: 'opciones', enunciado: `<p>En ${zh("他白跑了", "tā bái pǎo le")}, ¿qué quiere decir ${zh("白", "bái")}?</p>`,
        opciones: ['Blanco', 'Muy rápido', 'En vano', 'Otra vez'], correcta: 2,
        pista: `<p>Está justo antes de un verbo.</p>`,
        solucion: `<p>Antes de un verbo, ${zh("白", "bái")} es «en vano»: corrió y no sirvió de nada.</p>` },
      { tipo: 'opciones', enunciado: '<p>Según la versión de la Universidad de California en San Diego, ¿cuándo pueden verse el Pastor y la Tejedora?</p>',
        opciones: ['Cada día al amanecer', 'Una noche al año, el séptimo día del séptimo mes lunar', 'Nunca más', 'En el Medio Otoño'], correcta: 1,
        pista: '<p>Es una fecha con dos sietes.</p>',
        solucion: `<p>La Reina Madre les permite verse una noche al año; ese día es ${zh("七夕节", "qīxījié")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Con cuál de estas palabras usarías el clasificador ${zh("匹", "pǐ")}, según MIT?</p>`,
        opciones: [zh('马', 'mǎ'), zh('书', 'shū'), zh('笔', 'bǐ'), zh('飞机', 'fēijī')], correcta: 0,
        pista: '<p>Es un animal que se monta.</p>',
        solucion: `<p>${zh("一匹马", "yī pǐ mǎ")}: ${zh("匹", "pǐ")} va con caballos.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("消失")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['xiāo shī'],
        pista: '<p>Las dos sílabas empiezan altas y se mantienen.</p>',
        solucion: `<p>${zh("消失", "xiāoshī")}: <strong>xiāo shī</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("命运", "mìngyùn")}.</p>`,
        respuestas: ['destino', 'el destino', 'suerte', 'la suerte', 'fortuna', 'sino'],
        pista: '<p>Es lo que, según se cree, le espera a una persona.</p>',
        solucion: `<p>${zh("命运", "mìngyùn")} es «destino».</p>` },
    ],
    fuentes: [SILABO, ALLSET_BAI, ALLSET_ZHE, MIT_U8, WIKT_ZAOWAN, WIKT_GANGHAO, UCSD, EMB_OTONO],
  });

  const SEP_CONF = { nombre: 'Stanford Encyclopedia of Philosophy (Universidad de Stanford, EE. UU.), «Confucius», 2024 (en inglés)', url: 'https://plato.stanford.edu/entries/confucius/' };
  const SEP_LAOZI = { nombre: 'Stanford Encyclopedia of Philosophy (Universidad de Stanford, EE. UU.), «Laozi», 2025 (en inglés)', url: 'https://plato.stanford.edu/entries/laozi/' };
  const ENO_ANA = { nombre: 'Robert Eno (Universidad de Indiana, EE. UU.), «The Analects of Confucius: An Online Teaching Translation», 2015 (en inglés)', url: 'https://scholarworks.iu.edu/dspace/bitstreams/d1f62d31-9082-41d0-999f-4c3efa0c8857/download' };
  const ENO_DAO = { nombre: 'Robert Eno (Universidad de Indiana, EE. UU.), «Daodejing», traducción abierta, 2025 (en inglés)', url: 'https://scholarworks.iu.edu/dspace/bitstreams/7031cb99-72c3-4e59-8ced-9d9783638945/download' };
  const WS_WEI = { nombre: 'Wikisource en chino, 論語/衛靈公第十五 (texto chino; fuente de apoyo)', url: 'https://zh.wikisource.org/wiki/論語/衛靈公第十五' };
  const WS_LIREN = { nombre: 'Wikisource en chino, 論語/里仁第四 (texto chino; fuente de apoyo)', url: 'https://zh.wikisource.org/wiki/論語/里仁第四' };
  const WS_DAO = { nombre: 'Wikisource en chino, 道德經 (王弼本) (texto chino; fuente de apoyo)', url: 'https://zh.wikisource.org/wiki/道德經_(王弼本)' };
  const MIT_CURSO = { nombre: 'Julian K. Wheatley (MIT OpenCourseWare, EE. UU.), «Learning Chinese: A Foundation Course in Mandarin», 2011 (en inglés)', url: 'https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/res21g_003_s_11.pdf' };
  const ALLSET_JIU = ALLSET('Expressing "as one likes" with "jiu"', 'Expressing_%22as_one_likes%22_with_%22jiu%22');
  const ALLSET_BEN = ALLSET('Expressing "your side" with "ben"', 'Expressing_%22your_side%22_with_%22ben%22');
  const CG_SHENME = { nombre: 'Universidad Palacký de Olomouc (Chequia), ChinGram: Interrogative pronoun shénme (en inglés)', url: 'https://chingram.upol.cz/grammar/interrogative-pronoun-shenme-%e4%bb%80%e4%b9%88-%e4%bb%80%e9%ba%bc-what-something-anything-any-every' };
  const CG_MEDIDA = { nombre: 'Universidad Palacký de Olomouc (Chequia), ChinGram: Measure words - nouns (en inglés)', url: 'https://chingram.upol.cz/grammar/measure-words-nouns' };

  // ------------------------------------------------------------------
  L('Pensamiento tradicional: Confucio y Laozi', {
    objetivo: `Saber quiénes fueron Confucio y Laozi, leer una frase de cada obra con su significado y usar ${zh("本", "běn")} y ${zh("动词+什么(就)是什么", "dòngcí + shénme (jiù) shì shénme")}.`,
    explicacion: `
      <p>Algunas frases se dicen desde hace más de dos mil años y todavía se citan en clase. Dos de las voces más conocidas son Confucio y Laozi. Aquí no se juzga ninguna idea: se cuenta quiénes son, qué obras llevan su nombre y cómo se leen sus frases. Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['思想', 'sīxiǎng', 'pensamiento, ideas'], ['哲学', 'zhéxué', 'filosofía'], ['观念', 'guānniàn', 'idea, concepción'], ['原则', 'yuánzé', 'principio'], ['尊敬', 'zūnjìng', 'respetar, admirar'],
        ['善良', 'shànliáng', 'bondadoso'], ['本质', 'běnzhì', 'esencia'], ['本人', 'běnrén', 'uno mismo, esta persona'], ['思考', 'sīkǎo', 'reflexionar'], ['理论', 'lǐlùn', 'teoría'],
        ['智慧', 'zhìhuì', 'sabiduría'], ['人类', 'rénlèi', 'humanidad'], ['伟大', 'wěidà', 'grandioso'], ['学者', 'xuézhě', 'erudito, estudioso'], ['精神', 'jīngshen', 'espíritu, ánimo'],
      ])}
      <h3>¿Quiénes fueron?</h3>
      <p>Según la Enciclopedia de Filosofía de Stanford (2024), Confucio vivió, según la tradición, de 551 a 479 a. C. Se le asocia el ${zh("论语", "Lúnyǔ")}, las «Analectas»: Robert Eno, de la Universidad de Indiana, explica que el título significa «conversaciones recopiladas» y que es una antología de frases breves de Confucio y de sus discípulos; la tradición dice que la reunieron discípulos suyos.</p>
      <p>De Laozi, la misma enciclopedia (2025) dice que la tradición lo presenta como un contemporáneo mayor de Confucio, pero que su época se discute: los dichos que se le atribuyen circulaban en el siglo IV a. C. Su libro es el ${zh("道德经", "Dàodéjīng")}, con 81 capítulos; se le llama el texto «de cinco mil caracteres» por su longitud aproximada.</p>
      ${cuadro(['Frase', 'De qué obra', 'Qué dice'], [
        [zh('己所不欲，勿施于人', 'jǐ suǒ bù yù, wù shī yú rén'), 'Analectas 15.24', 'Lo que no deseas para ti, no lo hagas a otros.'],
        [zh('见贤思齐焉，见不贤而内自省也', 'jiàn xián sī qí yān, jiàn bù xián ér nèi zì xǐng yě'), 'Analectas 4.17', 'Ante una persona digna, piensa en igualarla; ante una indigna, examínate por dentro.'],
        [zh('知人者智，自知者明', 'zhī rén zhě zhì, zì zhī zhě míng'), 'Daodejing 33', 'Quien conoce a los demás es sabio; quien se conoce a sí mismo está iluminado.'],
        [zh('千里之行，始于足下', 'qiān lǐ zhī xíng, shǐ yú zú xià'), 'Daodejing 64', 'Un viaje de mil li empieza con el primer paso.'],
      ])}
      <p>Los significados siguen las traducciones de Eno, redactadas aquí en español. Los textos de Wikisource (apoyo) están en caracteres tradicionales; aquí los ves en simplificados. Son lenguaje clásico: se leen como cultura, no como vocabulario.</p>
      <h3>Dos piezas de gramática</h3>
      <p>El pronombre ${zh("本", "běn")} significa «este» y se refiere al lado de quien habla. AllSet dice que se usa en chino escrito formal, con casi siempre un sustantivo de una sílaba; ${zh("本人", "běnrén")} es «esta persona», una forma elegante de decir ${zh("我", "wǒ")}: ${zh("本人是学生", "běnrén shì xuésheng")}. No lo confundas con el clasificador de libros, que ChinGram ilustra con ${zh("三本书", "sān běn shū")} y ${zh("这本书", "zhè běn shū")}.</p>
      <p>El segundo molde es ${zh("动词+什么(就)是什么", "dòngcí + shénme (jiù) shì shénme")}. AllSet dice que el pronombre interrogativo no apunta a nada concreto, como «lo que sea». MIT lo muestra en una invitación a cenar: ${zh("喜欢吃什么就点什么", "xǐhuan chī shénme jiù diǎn shénme")}, «pide lo que te guste». Una frase de la lección: ${zh("想读什么就读什么", "xiǎng dú shénme jiù dú shénme")}, «lee lo que quieras».</p>
      <p>Por último, ${zh("不管怎样说", "bùguǎn zěnyàng shuō")} no tiene regla en las fuentes. Como simplificación de la lección, sirve para cerrar una idea, como «sea como sea»: ${zh("不管怎样说，思考是好事", "bùguǎn zěnyàng shuō, sīkǎo shì hǎoshì")}.</p>
      <p class="nota"><strong>Trampa común:</strong> ${zh("本", "běn")} pronombre va antes del sustantivo; ${zh("本", "běn")} clasificador va después del número o de ${zh("这", "zhè")}.</p>`,
    ejemplo: `
      <p>Quieres decir: «Respeto a esa estudiosa; tiene mucha sabiduría». Por partes.</p>
      <ol class="pasos-ej">
        <li>Empieza con quien respeta: ${zh("我尊敬", "wǒ zūnjìng")}, sujeto y verbo.</li>
        <li>Di a quién: ${zh("那位学者", "nà wèi xuézhě")}. ${zh("位", "wèi")} es el clasificador cortés de personas.</li>
        <li>Añade un segundo comentario: ${zh("她很有智慧", "tā hěn yǒu zhìhuì")}, «tiene mucha sabiduría».</li>
      </ol>
      <p>Comprueba que el verbo va antes de la persona respetada, como en español, y que ${zh("那位", "nà wèi")} hace de «esa» y señala a una sola persona. Después, la coma separa dos ideas completas, cada una con su sujeto, y cada idea se entiende sola. Resultado: <span class="resultado">${zh("我尊敬那位学者，她很有智慧", "wǒ zūnjìng nà wèi xuézhě, tā hěn yǒu zhìhuì")} = «respeto a esa estudiosa; tiene mucha sabiduría»</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir ${zh("本", "běn")} antes de ${zh("书", "shū")} para decir «este libro». Es ${zh("这本书", "zhè běn shū")}.</p>`,
    vidaReal: `
      <p>Estas ideas se citan mucho:</p>
      <ul>
        <li>Entender una cita famosa que alguien escribe en una tarjeta, un cuaderno o un cartel.</li>
        <li>Saber de qué libro viene una frase y quién se supone que la dijo.</li>
        <li>Hablar de una persona que admiras con palabras como respeto y sabiduría.</li>
        <li>Leer una invitación en la que te dicen que elijas lo que quieras.</li>
        <li>Pensar en una frase antigua y ver si todavía sirve hoy.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «lee lo que quieras».</p>',
        respuesta: ['想', '读', '什么', '就', '读', '什么'], pinyin: ['xiǎng', 'dú', 'shénme', 'jiù', 'dú', 'shénme'], lang: 'zh-Hans',
        pista: `<p>El verbo y ${zh("什么", "shénme")} se repiten, unidos por ${zh("就", "jiù")}.</p>`,
        solucion: `<p>${zh("想读什么就读什么", "xiǎng dú shénme jiù dú shénme")}: ${zh("想", "xiǎng")}, verbo, ${zh("什么", "shénme")}, ${zh("就", "jiù")}, verbo y ${zh("什么", "shénme")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según Eno y Stanford, ¿qué es el ${zh("《论语》", "Lúnyǔ")}?</p>`,
        opciones: ['Un libro de recetas', 'Un libro con 81 capítulos', 'Lo escribió Laozi', 'Una antología de frases de Confucio y sus discípulos, que según la tradición reunieron sus seguidores'], correcta: 3,
        pista: '<p>El título significa «conversaciones recopiladas».</p>',
        solucion: `<p>Es una antología de frases breves de Confucio y sus discípulos; Eno traduce el título como «conversaciones recopiladas».</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("千里之行，始于足下", "qiān lǐ zhī xíng, shǐ yú zú xià")}?</p>`,
        opciones: ['Hay que quedarse en casa', 'El camino es muy corto', 'Los viajeros llegan tarde', 'Un viaje de mil li empieza con el primer paso'], correcta: 3,
        pista: `<p>${zh("足下", "zú xià")} es «bajo el pie».</p>`,
        solucion: `<p>Es del ${zh("道德经", "Dàodéjīng")}, capítulo 64: el viaje largo empieza con un paso.</p>` },
      { tipo: 'opciones', enunciado: `<p>En ${zh("本人是学生", "běnrén shì xuésheng")}, ¿quién habla?</p>`,
        opciones: ['Otra persona', 'Un maestro', 'Quien habla, de forma formal', 'Todos los estudiantes'], correcta: 2,
        pista: `<p>AllSet dice que ${zh("本人", "běnrén")} es una forma elegante de decir ${zh("我", "wǒ")}.</p>`,
        solucion: `<p>${zh("本人", "běnrén")} es «esta persona»: quien habla.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("智慧")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['zhì huì'],
        pista: '<p>Las dos sílabas son de cuarto tono: caen de golpe.</p>',
        solucion: `<p>${zh("智慧", "zhìhuì")}: <strong>zhì huì</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("哲学", "zhéxué")}.</p>`,
        respuestas: ['filosofia', 'la filosofia'],
        pista: '<p>Es el estudio de las grandes preguntas sobre la vida.</p>',
        solucion: `<p>${zh("哲学", "zhéxué")} es «filosofía».</p>` },
    ],
    fuentes: [SILABO, SEP_CONF, SEP_LAOZI, ENO_ANA, ENO_DAO, WS_WEI, WS_LIREN, WS_DAO, MIT_CURSO, ALLSET_JIU, ALLSET_BEN, CG_SHENME, CG_MEDIDA],
  });

  const UNESCO_CALI = { nombre: 'UNESCO, Patrimonio Cultural Inmaterial: «Chinese calligraphy», 2009 (en inglés)', url: 'https://ich.unesco.org/en/RL/chinese-calligraphy-00216' };
  const UNESCO_SELLOS = { nombre: 'UNESCO, Patrimonio Cultural Inmaterial: «Chinese seal engraving», 2009 (en inglés)', url: 'https://ich.unesco.org/en/RL/chinese-paper-cutting-00217' };
  const FULLERTON = { nombre: 'Universidad Estatal de California en Fullerton (EE. UU.), «Atrium Gallery Presents First Showing of Chinese Paintings», 2004 (en inglés)', url: 'https://calstate.fullerton.edu/News/arts/2004/80_chinese_paintings.html' };
  const MUSEO_SF = { nombre: 'Museo de Arte Asiático de San Francisco (EE. UU.), «An Introduction to Chinese Brushpainting Techniques», 2019 (en inglés)', url: 'https://education.asianart.org/resources/an-introduction-to-chinese-brushpainting-techniques' };
  const ALLSET_CONTAR = ALLSET('Measure words for counting', 'Measure_words_for_counting');
  const STJOHNS = { nombre: 'Universidad de St. John\'s (EE. UU.), «List of Chinese measure words» (en inglés; copia de Wikipedia, fuente de apoyo)', url: 'https://employees.csbsju.edu/hjakubowski/classes/ChinaStudyAbroad/list_of_chinese_measure_words.htm' };

  // ------------------------------------------------------------------
  L('Artes tradicionales', {
    objetivo: `Conocer tres artes tradicionales de China con sus fechas, y usar los clasificadores ${zh("册", "cè")}, ${zh("副", "fù")} y ${zh("支", "zhī")} y las expresiones ${zh("A的A，B的B", "A de A, B de B")} y ${zh("真有你的", "zhēn yǒu nǐ de")}.`,
    explicacion: `
      <p>Un pincel, un poco de tinta y una hoja: con eso se hace un cuadro o una frase. Hay artes que en China se transmiten desde hace siglos y que hoy se enseñan en la escuela y se exponen en museos. Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['书法', 'shūfǎ', 'caligrafía'], ['国画', 'guóhuà', 'pintura tradicional china'], ['戏剧', 'xìjù', 'teatro, drama'], ['舞蹈', 'wǔdǎo', 'danza'], ['武术', 'wǔshù', 'artes marciales'],
        ['美术', 'měishù', 'bellas artes'], ['毛笔', 'máobǐ', 'pincel de escritura'], ['欣赏', 'xīnshǎng', 'apreciar, disfrutar de'], ['工艺', 'gōngyì', 'artesanía, técnica de fabricación'], ['手工', 'shǒugōng', 'trabajo hecho a mano'],
        ['风格', 'fēnggé', 'estilo'], ['舞台', 'wǔtái', 'escenario'], ['册', 'cè', 'clasificador de volúmenes de libros'], ['副', 'fù', 'clasificador de pares y juegos'], ['支', 'zhī', 'clasificador de objetos alargados'],
      ])}
      <h3>Tres artes, tres fechas</h3>
      ${cuadro(['Arte', 'Qué dice la fuente'], [
        [zh('书法', 'shūfǎ') + ' (caligrafía)', 'Según la UNESCO, el pincel traza cinco estilos de escritura: sello, oficial, cursivo, corrido y regular. Entró en la Lista Representativa del Patrimonio Cultural Inmaterial de la Humanidad en 2009. Hoy, además del maestro y el aprendiz, también se enseña en la escuela.'],
        ['Grabado de sellos', 'También entró en la Lista de la UNESCO en 2009. Primero se dibuja el diseño en papel y luego se graba en piedra, al revés, con un cuchillo.'],
        [zh('国画', 'guóhuà') + ' (pintura)', 'La Universidad Estatal de California en Fullerton (2004) dice que, desde la dinastía Song (siglos X a XIII), casi no ha cambiado; se relaciona con la poesía, la caligrafía y los sellos. El Museo de Arte Asiático de San Francisco enseña a sostener el pincel y a probar distinta presión, velocidad y humedad.'],
      ])}
      <p>Por eso ${zh("毛笔", "máobǐ")} es la herramienta de la caligrafía y de la pintura; el sello se graba con cuchillo. Y ${zh("国画", "guóhuà")} se entiende como «pintura nacional». Para hablar de ellas: ${zh("我欣赏这个风格", "wǒ xīnshǎng zhège fēnggé")}, «me gusta este estilo».</p>
      <h3>Contar con ${zh("册", "cè")}, ${zh("副", "fù")} y ${zh("支", "zhī")}</h3>
      <p>El clasificador va entre el número y el sustantivo. Según MIT, ${zh("副", "fù")} sirve para cosas que vienen en pares o juegos, como ${zh("一副眼镜", "yī fù yǎnjìng")}, «unas gafas». ${zh("支", "zhī")} se usa para objetos alargados: MIT lo da con plumas, AllSet con flores (${zh("九支玫瑰", "jiǔ zhī méiguī")}) y ${zh("一支毛笔", "yī zhī máobǐ")} sigue la misma idea. ${zh("册", "cè")} aparece en una lista de apoyo de la Universidad de St. John's, copia de Wikipedia, como clasificador de volúmenes: ${zh("两册书", "liǎng cè shū")} es «dos volúmenes».</p>
      <h3>Dos expresiones del sílabo</h3>
      <p>El sílabo de nivel 5 lista ${zh("A的A，B的B", "A de A, B de B")} y ${zh("真有你的", "zhēn yǒu nǐ de")}. Las fuentes no traen regla para ellas; son simplificación de la lección. El primero reparte tareas: ${zh("唱歌的唱歌，跳舞的跳舞", "chàng gē de chàng gē, tiào wǔ de tiào wǔ")}, «unos cantan y otros bailan». El segundo reconoce lo que hizo alguien, a veces con humor: ${zh("你一个人做了这个手工？真有你的", "nǐ yī gè rén zuò le zhège shǒugōng? zhēn yǒu nǐ de")}, «¿lo hiciste tú solo? eres increíble».</p>
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("个", "gè")} para todo. Con pares, plumas y volúmenes se prefiere el clasificador propio.</p>`,
    ejemplo: `
      <p>Quieres decir: «Compré dos pinceles y un volumen». Por partes.</p>
      <ol class="pasos-ej">
        <li>Empieza con el verbo: ${zh("我买了", "wǒ mǎi le")}, «compré».</li>
        <li>Pinceles, que son alargados: ${zh("两支毛笔", "liǎng zhī máobǐ")}. Número, clasificador y sustantivo, en ese orden.</li>
        <li>Une con ${zh("和", "hé")} un volumen de libro: ${zh("一册书", "yī cè shū")}.</li>
      </ol>
      <p>Comprueba que cada sustantivo tiene su clasificador justo antes: ${zh("支", "zhī")} para los pinceles, que son alargados, y ${zh("册", "cè")} para el volumen del libro. Si cambias el número, el clasificador no cambia: ${zh("三支毛笔", "sān zhī máobǐ")} es «tres pinceles». Lo que sí cambia es la cantidad. Resultado: <span class="resultado">${zh("我买了两支毛笔和一册书", "wǒ mǎi le liǎng zhī máobǐ hé yī cè shū")} = «compré dos pinceles y un volumen»</span>.</p>
      <p class="nota"><strong>Error común:</strong> decir ${zh("两毛笔", "liǎng máobǐ")}, sin clasificador. Siempre va entre el número y la cosa.</p>`,
    vidaReal: `
      <p>Conocer estas artes te ayuda en situaciones cotidianas:</p>
      <ul>
        <li>Entender un cartel de museo o de exposición.</li>
        <li>Contar objetos en una tienda: unas gafas, un pincel, un libro de varios tomos.</li>
        <li>Hablar de lo que te gusta ver, un baile, una obra o un cuadro.</li>
        <li>Elogiar con una frase corta a quien hizo algo difícil.</li>
        <li>Leer en una tarjeta de museo en qué año se reconoció un arte como patrimonio.</li>
        <li>Imaginar cómo se sostiene un pincel y cuánta presión conviene probar al pintar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «compré dos pinceles y un volumen».</p>',
        respuesta: ['我', '买了', '两支', '毛笔', '和', '一册', '书'], alternativas: [['我', '买了', '一册', '书', '和', '两支', '毛笔']], pinyin: ['wǒ', 'mǎi le', 'liǎng zhī', 'máobǐ', 'hé', 'yī cè', 'shū'], lang: 'zh-Hans',
        pista: '<p>El clasificador va después del número y antes del sustantivo.</p>',
        solucion: `<p>${zh("我买了两支毛笔和一册书", "wǒ mǎi le liǎng zhī máobǐ hé yī cè shū")}: dos grupos de número, clasificador y cosa.</p>` },
      { tipo: 'opciones', enunciado: `<p>Según MIT, ¿para qué cosas sirve ${zh("副", "fù")}?</p>`,
        opciones: ['Para caballos', 'Para cosas que vienen en pares o juegos', 'Para aviones', 'Para flores'], correcta: 1,
        pista: '<p>Piensa en unas gafas.</p>',
        solucion: `<p>${zh("一副眼镜", "yī fù yǎnjìng")}: ${zh("副", "fù")} va con pares o juegos.</p>` },
      { tipo: 'opciones', enunciado: '<p>Según la UNESCO, ¿cuántos estilos de escritura traza el pincel en la caligrafía china?</p>',
        opciones: ['Dos', 'Tres', 'Cuatro', 'Cinco'], correcta: 3,
        pista: '<p>Son sello, oficial, cursivo, corrido y regular.</p>',
        solucion: '<p>Son cinco estilos; la caligrafía china entró en la Lista de la UNESCO en 2009.</p>' },
      { tipo: 'opciones', enunciado: `<p>Un amigo hizo solo una escultura enorme y le dices ${zh("真有你的", "zhēn yǒu nǐ de")}. ¿Qué le quieres decir?</p>`,
        opciones: ['Que es hora de irse', 'Que lo hizo muy mal', 'Que eres increíble', 'Que no entiendes nada'], correcta: 2,
        pista: '<p>Es un elogio, a veces con humor.</p>',
        solucion: `<p>Como simplificación de la lección, ${zh("真有你的", "zhēn yǒu nǐ de")} reconoce lo que hizo alguien: «eres increíble».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("舞台")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['wǔ tái'],
        pista: '<p>La primera sílaba baja y sube; la segunda sube.</p>',
        solucion: `<p>${zh("舞台", "wǔtái")}: <strong>wǔ tái</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("风格", "fēnggé")}.</p>`,
        respuestas: ['estilo', 'el estilo', 'manera', 'modo'],
        pista: '<p>Es lo que hace que un cuadro parezca de un artista y no de otro.</p>',
        solucion: `<p>${zh("风格", "fēnggé")} es «estilo».</p>` },
    ],
    fuentes: [SILABO, UNESCO_CALI, UNESCO_SELLOS, FULLERTON, MUSEO_SF, MIT_CURSO, ALLSET_CONTAR, STJOHNS],
  });

  const SCIO = { nombre: 'Oficina de Información del Consejo de Estado (China), «Four Great Inventions», Academia de China Contemporánea y Estudios Mundiales, 2024 (en inglés)', url: 'https://english.scio.gov.cn/m/featured/chinakeywords/2024-08/30/content_117397321.htm' };
  const EMB_SUDAFRICA = { nombre: 'Embajada de China en Sudáfrica, «Four Great Inventions of Ancient China», 2024 (en inglés)', url: 'https://za.china-embassy.gov.cn/eng/zngx_1/ChinaSARelations2004/202401/t20240104_11216991.htm' };
  const COLUMBIA = { nombre: 'Universidad de Columbia (EE. UU.), Asia for Educators: «China\'s Gifts to the West», de Derk Bodde, reedición de 2004 (en inglés)', url: 'https://afe.easia.columbia.edu/chinawh/web/s10/gifts.pdf' };
  const DART_3 = { nombre: 'Dartmouth College (EE. UU.), Snapshots of China: Lección 3, notas de gramática (en inglés)', url: 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e4%b8%80%e8%af%be-lesson-3/' };
  const ALLSET_KE = ALLSET('Emphatic adverb "ke"', 'Emphatic_adverb_%22ke%22');
  const OX_MEDIDA = { nombre: 'Universidad de Oxford (Reino Unido), CTCFL: Measure words, ejercicios (en inglés)', url: 'https://www.ctcfl.ox.ac.uk/materials_grammar-exercises_measure-words/' };

  // ------------------------------------------------------------------
  L('Inventos de la China antigua', {
    objetivo: `Contar cuándo aparecieron los cuatro grandes inventos de la China antigua y usar ${zh("用不着", "yòngbuzháo")}, ${zh("可", "kě")} enfático, el sufijo ${zh("-头", "-tou")} y el clasificador ${zh("架", "jià")}.`,
    explicacion: `
      <p>Escribes en un cuaderno, miras un mapa, usas una brújula en una excursión. Detrás de cada cosa hay alguien que la inventó. Según la Oficina de Información del Consejo de Estado de China (2024), los cuatro grandes inventos de la China antigua son la brújula, el papel, la imprenta y la pólvora. Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['发明', 'fāmíng', 'inventar; invento'], ['印刷', 'yìnshuā', 'imprimir'], ['创造', 'chuàngzào', 'crear'], ['古老', 'gǔlǎo', 'milenario, muy antiguo'], ['改进', 'gǎijìn', 'mejorar'],
        ['传播', 'chuánbō', 'difundir'], ['贡献', 'gòngxiàn', 'aportar; aporte'], ['价值', 'jiàzhí', 'valor'], ['制造', 'zhìzào', 'fabricar'], ['工具', 'gōngjù', 'herramienta'],
        ['木头', 'mùtou', 'madera'], ['石头', 'shítou', 'piedra'], ['实用', 'shíyòng', 'práctico, útil'], ['架', 'jià', 'clasificador de máquinas y vehículos'], ['至今', 'zhìjīn', 'hasta hoy'],
      ])}
      <h3>Cuatro inventos, con fechas</h3>
      ${cuadro(['Invento', 'Qué dicen las fuentes'], [
        ['Papel', 'Se inventó a comienzos de la dinastía Han Occidental (206 a. C.–25 d. C.), según la Oficina de Información (2024). En la Han Oriental, el funcionario Cai Lun lo mejoró; la Universidad de Columbia fecha su invención formal en el año 105. Antes se escribía en tiras de bambú o de madera, según la embajada de China en Sudáfrica (2024).'],
        ['Imprenta', 'Según la Oficina de Información, la xilografía, con bloques de madera tallados, apareció en la dinastía Tang (618–907). En la Song del Norte (960–1127), Bi Sheng hizo tipos móviles de arcilla; Columbia lo sitúa entre 1041 y 1049.'],
        ['Brújula', 'Según la Oficina de Información, el «sinan» es del período de los Reinos Combatientes (475–221 a. C.) y en la dinastía Song hubo agujas de hierro imantadas; el primer relato claro de su uso en navegación está en un libro escrito poco antes de 1125 (Columbia).'],
        ['Pólvora', 'Según la Oficina de Información, nació de la alquimia en las dinastías Sui y Tang (581–907). Columbia cuenta que ya en la Tang había «árboles de fuego» y «flores de plata», fuegos artificiales. A fines de la Tang se usó también en la guerra.'],
      ])}
      <p>Fíjate en algo: las fuentes no coinciden del todo con el papel. La Oficina de Información habla de un origen en la Han Occidental y de una mejora de Cai Lun, y Columbia llama al año 105 la invención formal; por eso se citan por separado. ${zh("发明", "fāmíng")} y ${zh("改进", "gǎijìn")} son dos pasos distintos: uno es crear algo nuevo y el otro es hacer mejor lo que ya existe.</p>
      <h3>Cuatro piezas de gramática</h3>
      <p>Dartmouth explica que, para contestar «no» a una pregunta con ${zh("得", "děi")}, «deber», se usa ${zh("不用", "búyòng")} o ${zh("用不着", "yòngbuzháo")}. Una frase de la lección: ${zh("我得去吗？用不着", "wǒ děi qù ma? yòngbuzháo")}, «¿tengo que ir? no hace falta».</p>
      <p>AllSet dice que ${zh("可", "kě")} intensifica un adjetivo o enfatiza un verbo, compara lo que esperabas con lo real y es coloquial. Con adjetivo lleva ${zh("了", "le")}: ${zh("这个工具可实用了", "zhège gōngjù kě shíyòng le")}. Con ${zh("别", "bié")} suena a «ni se te ocurra»: ${zh("你可别忘了", "nǐ kě bié wàng le")}.</p>
      <p>Oxford dice que ${zh("架", "jià")} cuenta máquinas y vehículos: ${zh("一架飞机", "yī jià fēijī")} y ${zh("十架钢琴", "shí jià gāngqín")}. Y el sufijo ${zh("-头", "-tou")}, que el sílabo lista, se pega a una raíz y se escribe con tono neutro en el sílabo, como en ${zh("木头", "mùtou")} y ${zh("石头", "shítou")}. Como simplificación de la lección, es solo una forma de armar palabras.</p>
      <p class="nota"><strong>Trampa común:</strong> ${zh("可", "kě")} aquí no es «poder»; es un adverbio que refuerza. Mira si hay un adjetivo o ${zh("别", "bié")} cerca.</p>`,
    ejemplo: `
      <p>Quieres decir: «Esta herramienta de madera es muy práctica». Por partes.</p>
      <ol class="pasos-ej">
        <li>Di qué cosa: ${zh("这个木头工具", "zhège mùtou gōngjù")}, «esta herramienta de madera».</li>
        <li>Añade el adjetivo ${zh("实用", "shíyòng")}, «práctico».</li>
        <li>Refuérzalo con ${zh("可", "kě")} delante y ${zh("了", "le")} al final: ${zh("可实用了", "kě shíyòng le")}.</li>
      </ol>
      <p>Comprueba que ${zh("可", "kě")} está antes del adjetivo y ${zh("了", "le")} cierra la frase. Fíjate también en que ${zh("木头", "mùtou")} va antes de ${zh("工具", "gōngjù")}: el material describe a la herramienta, así que aparece primero. Además, ${zh("这个", "zhège")} abre la frase señalando de qué objeto se habla. Según AllSet, ${zh("可", "kě")} es coloquial, así que suena natural al conversar. Resultado: <span class="resultado">${zh("这个木头工具可实用了", "zhège mùtou gōngjù kě shíyòng le")} = «esta herramienta de madera es muy práctica»</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar ${zh("了", "le")} al final con ${zh("可", "kě")} y un adjetivo. AllSet dice que casi siempre está.</p>`,
    vidaReal: `
      <p>Saber esto te sirve en situaciones cotidianas:</p>
      <ul>
        <li>Entender una sala de museo sobre historia de la escritura o de la navegación.</li>
        <li>Saber decir «no hace falta» cuando alguien te pregunta si tiene que ir.</li>
        <li>Contar máquinas, como aviones o pianos, con el clasificador correcto.</li>
        <li>Ver que lo que usas todos los días, como el papel, tiene una historia con fechas.</li>
        <li>Leer en un cartel de museo cuándo se inventó algo y quién lo mejoró.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «esta herramienta de madera es muy práctica».</p>',
        respuesta: ['这个', '木头', '工具', '可', '实用', '了'], pinyin: ['zhège', 'mùtou', 'gōngjù', 'kě', 'shíyòng', 'le'], lang: 'zh-Hans',
        pista: `<p>${zh("可", "kě")} va antes del adjetivo y ${zh("了", "le")} al final.</p>`,
        solucion: `<p>${zh("这个木头工具可实用了", "zhège mùtou gōngjù kě shíyòng le")}: cosa, ${zh("可", "kě")}, adjetivo y ${zh("了", "le")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>Según Columbia, ¿entre qué años hizo Bi Sheng su juego de tipos móviles de arcilla?</p>',
        opciones: ['Entre 105 y 110', 'Entre 618 y 907', 'Entre 1041 y 1049', 'Entre 1125 y 1130'], correcta: 2,
        pista: '<p>Fue en la dinastía Song del Norte.</p>',
        solucion: '<p>Columbia dice que fue entre 1041 y 1049, en la Song del Norte (960–1127).</p>' },
      { tipo: 'opciones', enunciado: `<p>Te preguntan ${zh("我得去吗？", "wǒ děi qù ma?")} y quieres decir «no hace falta». ¿Qué respondes?</p>`,
        opciones: [zh('不得', 'bù děi'), zh('用不着', 'yòngbuzháo'), zh('不要', 'búyào'), zh('白', 'bái')], correcta: 1,
        pista: '<p>Dartmouth dice que no sirve responder con «no deber».</p>',
        solucion: `<p>Para negar ${zh("得", "děi")} se usa ${zh("不用", "búyòng")} o ${zh("用不着", "yòngbuzháo")}, nunca ${zh("不得", "bù děi")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Con cuál de estas cosas se usa el clasificador ${zh("架", "jià")}, según Oxford?</p>`,
        opciones: [zh('飞机', 'fēijī'), zh('书', 'shū'), zh('玫瑰', 'méiguī'), zh('马', 'mǎ')], correcta: 0,
        pista: '<p>Va con máquinas y vehículos.</p>',
        solucion: `<p>${zh("一架飞机", "yī jià fēijī")}: ${zh("架", "jià")} cuenta máquinas y vehículos.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("贡献")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['gòng xiàn'],
        pista: '<p>Las dos sílabas son de cuarto tono.</p>',
        solucion: `<p>${zh("贡献", "gòngxiàn")}: <strong>gòng xiàn</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("工具", "gōngjù")}.</p>`,
        respuestas: ['herramienta', 'la herramienta', 'instrumento', 'utensilio'],
        pista: '<p>Es lo que usas para hacer un trabajo.</p>',
        solucion: `<p>${zh("工具", "gōngjù")} es «herramienta».</p>` },
    ],
    fuentes: [SILABO, SCIO, EMB_SUDAFRICA, COLUMBIA, DART_3, ALLSET_KE, OX_MEDIDA],
  });

  const DART_28 = { nombre: 'Dartmouth College (EE. UU.), Snapshots of China: Lección 28, diálogo (en inglés)', url: 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e4%ba%8c%e5%8d%81%e5%85%ab%e8%af%be-lesson-28/' };
  const DART_11 = { nombre: 'Dartmouth College (EE. UU.), Snapshots of China: Lección 11, diálogo (en inglés)', url: 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e5%8d%81%e4%b8%80%e8%af%be-lesson-11/' };
  const ILLINOIS = { nombre: 'Universidad de Illinois en Urbana-Champaign (EE. UU.), iSchool Writing Resources: How to Structure an Argument (en inglés)', url: 'https://publish.illinois.edu/ischoolwritingresources/how-to-structure-an-argument/' };
  const TAMU = { nombre: 'Texas A&M University (EE. UU.), Open Publishing: Informed Arguments, 4.4 Basic Structure and Content of Argument, 2023 (en inglés)', url: 'https://odp.library.tamu.edu/informedarguments/chapter/basic-structure-and-content-of-argument' };

  // ------------------------------------------------------------------
  L('Leer textos de opinión', {
    objetivo: `Encontrar la tesis, las razones y la conclusión de un texto de opinión, y reconocer ${zh("X也不是，Y也不是", "X yě bù shì, Y yě bù shì")}, ${zh("不X白不X", "bù X bái bù X")}, ${zh("X什么X", "X shénme X")} y otros moldes de HSK 5.`,
    explicacion: `
      <p>Lees: «yo creo que los celulares deberían quedarse en casa». ¿Es un hecho o una opinión? ¿Por qué lo cree quien lo escribe? Un texto de opinión es un texto que defiende una idea con razones. Aprender a leerlo te sirve en cualquier idioma. Las frases de ejemplo son de la lección.</p>
      ${tabla([
        ['观点', 'guāndiǎn', 'punto de vista, opinión'], ['角度', 'jiǎodù', 'ángulo, perspectiva'], ['评价', 'píngjià', 'valorar; valoración'], ['否定', 'fǒudìng', 'negar, rechazar'], ['赞成', 'zànchéng', 'estar de acuerdo con'],
        ['理由', 'lǐyóu', 'razón, motivo'], ['客观', 'kèguān', 'objetivo'], ['主观', 'zhǔguān', 'subjetivo'], ['事实', 'shìshí', 'hecho'], ['时刻', 'shíkè', 'momento'],
        ['说服', 'shuōfú', 'convencer'], ['强调', 'qiángdiào', 'destacar, subrayar'], ['逻辑', 'luójí', 'lógica'], ['现实', 'xiànshí', 'realidad'], ['相对', 'xiāngduì', 'relativo; en comparación'],
      ])}
      <h3>Las partes de un texto de opinión</h3>
      <p>Según la Universidad de Illinois, un argumento tiene una tesis, transiciones entre la introducción, el cuerpo y la conclusión, y párrafos con pruebas. Cada párrafo trata una idea y explica por qué la prueba apoya la tesis; la conclusión no repite la tesis, la retoma a la luz de las pruebas. Texas A&M añade que la tesis se llama a menudo afirmación, que toma postura sobre un tema discutible y que una afirmación sólida tiene al menos un contraargumento válido.</p>
      <p>Aquí tienes un texto de ejemplo, inventado, con sus partes marcadas:</p>
      <ul>
        <li><strong>Tesis:</strong> «Creo que leer en papel ayuda a concentrarse mejor.»</li>
        <li>Razón: «Un libro no te manda avisos mientras lees.»</li>
        <li>Contraargumento: «Hay quien dice que la pantalla es más cómoda, y es verdad que cabe en el bolsillo.»</li>
        <li>Conclusión: «Aun así, para estudiar con calma, yo elegiría el papel.»</li>
      </ul>
      <p>Las razones son de ejemplo. Lo importante es la forma. Para practicar con más detalle, mira en Lectura las lecciones "Hechos y opiniones" y "Cómo se construye un argumento".</p>
      <h3>Moldes que aparecen en los textos</h3>
      <p>Para decir lo que piensas: ${zh("我赞成这个观点", "wǒ zànchéng zhège guāndiǎn")}, «estoy de acuerdo con esta opinión». Para dar peso a una prueba: ${zh("事实说服了我", "shìshí shuōfú le wǒ")}, «los hechos me convencieron».</p>
      <p>Dartmouth muestra ${zh("既不是…也不是…", "jì bù shì … yě bù shì …")} en un diálogo, y el sílabo lista ${zh("X也不是，Y也不是", "X yě bù shì, Y yě bù shì")}: ${zh("这也不是，那也不是", "zhè yě bù shì, nà yě bù shì")}, «esto no es, aquello tampoco». Dartmouth también usa ${zh("也不是", "yě bù shì")} al empezar una réplica para matizar. Una frase de la lección: ${zh("也不是大家都赞成", "yě bù shì dàjiā dōu zànchéng")}, «no es que todos estén de acuerdo». AllSet trae ${zh("想来想去", "xiǎng lái xiǎng qù")} («pensando y pensando»), con el mismo molde ${zh("A来A去", "A lái A qù")} de "Modismos de cuatro caracteres: ${zh("成语")}"; el sílabo añade el molde ${zh("X来X去，都是/就是…", "X lái X qù, dōu shì / jiùshì …")}: ${zh("说来说去，就是这个理由", "shuō lái shuō qù, jiù shì zhège lǐyóu")}.</p>
      <p>Los demás moldes no tienen regla en las fuentes; sus significados son simplificación de la lección. ${zh("不X白不X", "bù X bái bù X")} se apoya en ${zh("白", "bái")}, que viste en "Leyendas populares"; AllSet añade que con verbos como comer o beber es «gratis»: ${zh("不吃白不吃", "bù chī bái bù chī")}, «si no lo aprovechas, pierdes la ocasión». ${zh("X什么X", "X shénme X")} rechaza: ${zh("吃什么吃", "chī shénme chī")}, «¿para qué comer?». ${zh("什么X不X的", "shénme X bù X de")} quita importancia: ${zh("什么累不累的", "shénme lèi bù lèi de")}, «cansado ni qué nada». ${zh("X着也是X着", "X zhe yě shì X zhe")} dice «ya que estoy así»: ${zh("坐着也是坐着", "zuò zhe yě shì zuò zhe")}. El sílabo lista además ${zh("X是它，Y也是它", "X shì tā, Y yě shì tā")} y ${zh("X也X不得，Y也Y不得", "X yě X bu dé, Y yě Y bu dé")}; aquí solo se mencionan.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir opinión con hecho. Pregúntate: ¿se puede comprobar, o es lo que alguien piensa?</p>`,
    ejemplo: `
      <p>Lees el texto de ejemplo y quieres decir en chino: «Estoy de acuerdo, porque las razones son objetivas». Por partes.</p>
      <ol class="pasos-ej">
        <li>Tu postura: ${zh("我赞成", "wǒ zànchéng")}, «estoy de acuerdo».</li>
        <li>Tu motivo con ${zh("因为", "yīnwèi")}: ${zh("因为理由很客观", "yīnwèi lǐyóu hěn kèguān")}.</li>
        <li>Une las dos ideas con una coma.</li>
      </ol>
      <p>Para comprobar, mira que la postura va primero y la razón después, como en la tesis y las razones del texto. Resultado: <span class="resultado">${zh("我赞成，因为理由很客观", "wǒ zànchéng, yīnwèi lǐyóu hěn kèguān")} = «estoy de acuerdo, porque las razones son objetivas»</span>.</p>
      <p class="nota"><strong>Error común:</strong> dar solo la postura. Un texto de opinión sin razones no convence.</p>
      <h3>Qué sabes hacer al cerrar HSK 5</h3>
      <p>Ya puedes leer cultura y textos de opinión, y reconocer los moldes de HSK 5. Las 90 palabras de esta unidad fueron una selección; la lista completa está en el <a href="${encodeURI(SILABO.url)}">sílabo</a>.</p>`,
    vidaReal: `
      <p>Leer opiniones con atención te sirve todos los días:</p>
      <ul>
        <li>Saber si un comentario defiende una idea o solo cuenta un hecho.</li>
        <li>Encontrar la razón principal de quien escribe antes de decidir si estás de acuerdo.</li>
        <li>Notar cuándo un texto ignora otras opiniones.</li>
        <li>Explicar a otra persona por qué un texto te convenció, o por qué no.</li>
        <li>Leer con calma una noticia o un mensaje que pide tu opinión.</li>
        <li>Preparar tu propia opinión con una postura, una razón y un cierre.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «los hechos me convencieron».</p>',
        respuesta: ['事实', '说服', '了', '我'], pinyin: ['shìshí', 'shuōfú', 'le', 'wǒ'], lang: 'zh-Hans',
        pista: `<p>Lo que convence va primero, y ${zh("了", "le")} va después del verbo.</p>`,
        solucion: `<p>${zh("事实说服了我", "shìshí shuōfú le wǒ")}: quien convence, verbo, ${zh("了", "le")} y a quién.</p>` },
      { tipo: 'opciones', enunciado: '<p>En el texto de ejemplo, «Hay quien dice que la pantalla es más cómoda» ¿qué parte es?</p>',
        opciones: ['La tesis', 'El contraargumento', 'La conclusión', 'Una prueba que apoya la tesis'], correcta: 1,
        pista: '<p>Presenta la postura contraria.</p>',
        solucion: '<p>Es un contraargumento: otra postura razonable, que Texas A&M dice que toda afirmación sólida debe tener.</p>' },
      { tipo: 'opciones', enunciado: `<p>Como simplificación de la lección, ¿qué quiere decir ${zh("不吃白不吃", "bù chī bái bù chī")}?</p>`,
        opciones: ['No comas nunca', 'Comer es caro', 'Si no lo aprovechas, pierdes la ocasión', 'Come en silencio'], correcta: 2,
        pista: `<p>${zh("白", "bái")} con comer es «gratis».</p>`,
        solucion: `<p>Si es gratis y no lo aprovechas, pierdes la ocasión: ${zh("不X白不X", "bù X bái bù X")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué dice ${zh("这也不是，那也不是", "zhè yě bù shì, nà yě bù shì")}?</p>`,
        opciones: ['Esto no es, aquello tampoco', 'Esto y aquello son iguales', 'Esto es y aquello también', 'No sé dónde está'], correcta: 0,
        pista: `<p>Mira la negación ${zh("不是", "bù shì")} en las dos mitades.</p>`,
        solucion: `<p>${zh("X也不是，Y也不是", "X yě bù shì, Y yě bù shì")} niega las dos cosas: «ni esto ni aquello».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("观点")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['guān diǎn'],
        pista: '<p>La primera sílaba empieza alta y se mantiene; la segunda baja y sube.</p>',
        solucion: `<p>${zh("观点", "guāndiǎn")}: <strong>guān diǎn</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("客观", "kèguān")}.</p>`,
        respuestas: ['objetivo', 'objetiva', 'imparcial', 'lo objetivo'],
        pista: '<p>Es lo contrario de lo que depende solo de lo que piensa cada quien.</p>',
        solucion: `<p>${zh("客观", "kèguān")} es «objetivo»; ${zh("主观", "zhǔguān")} es «subjetivo».</p>` },
    ],
    fuentes: [SILABO, DART_28, DART_11, ALLSET_LAIQU, ALLSET_BAI, ILLINOIS, TAMU],
  });

})();
