// Mandarín · Unidad 6: HSK 2 · Situaciones.
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

  // Fuentes. Sílabo = F1, F20 y F40 (misma URL). Las páginas de ChinGram y de universidades se declaran con su URL completa.
  const SILABO = { nombre: 'Centro de Educación y Cooperación Lingüística (China), «HSK 考试大纲», sílabo del HSK 3.0 (2025)', url: 'https://hsk.cn-bj.ufileos.com/3.0/新版HSK考试大纲1219.pdf' };
  const CHINGRAM = (ruta, nombre) => ({ nombre: `Universidad Palacký de Olomouc (Chequia) y socios, ChinGram: ${nombre} (en inglés)`, url: `https://chingram.upol.cz/grammar/${ruta}` });
  const MSU = (url, nombre) => ({ nombre: `Universidad Estatal de Míchigan (EE. UU.), ${nombre} (en inglés)`, url });
  // Lecciones 1 a 3 (F2 a F12)
  const CHIN_LI = CHINGRAM('preposition-li-%e7%a6%bb-from', "Preposition lí 离 'from'");
  const MSU_RUTA = MSU('https://openbooks.lib.msu.edu/chs102/chapter/lesson-13-dialogue-1-%E9%97%AE%E8%B7%AF/', 'Elementary Chinese II: Lesson 13 Dialogue 1');
  const CHIN_POS = CHINGRAM('location-words', 'Location words');
  const MSU_CAMINO = MSU('https://openbooks.lib.msu.edu/chs102/chapter/lesson-10-dialogue-1-%e9%97%ae%e8%b7%af/', 'Elementary Chinese II: Lesson 9 Dialogue 1, 怎么走');
  const CHIN_ZENME = CHINGRAM('interrogative-pronouns-zenmeyang-%e6%80%8e%e4%b9%88%e6%a0%b7-%e6%80%8e%e9%ba%bc%e6%a8%a3-zenyang-%e6%80%8e%e6%a0%b7-%e6%80%8e%e6%a8%a3-how-what-kind-of', 'Interrogative pronouns zěnmeyàng 怎么样');
  const CHIN_HAI = CHINGRAM('the-adverb-hai-%e8%bf%98-%e9%82%84-expressing-relation-and-time', 'Adverb hái 还 expressing relation and time');
  const MSU_CLIMA = MSU('https://openbooks.lib.msu.edu/chs102/chapter/lesson-11-dialogue-1/', 'Elementary Chinese II: Lesson 11 Dialogue 1, weather');
  const CHIN_GEI = CHINGRAM('preposition-gei-%e7%bb%99-to-for', "Preposition gěi 给 'to, for'");
  const CHIN_NUM = CHINGRAM('numerals', 'Numerals');
  const CHIN_MW = CHINGRAM('measure-words-nouns', 'Measure words – nouns');
  const MSU_TIENDA = MSU('https://openbooks.lib.msu.edu/chs102/chapter/lesson-9-dialogue-1/', 'Elementary Chinese II: Lesson 10 Dialogue 1, shopping');
  // Lecciones 4 a 6 (F21 a F35)
  const CHIN_BIE = CHINGRAM('the-negation-adverb-bie-%e5%88%a5-dont-expressing-negative-commands', 'Negation adverb bié 别 «don’t» expressing negative commands');
  const CHIN_NEG = CHINGRAM('comparison-the-negation-adverbs-bu-%e4%b8%8d-not-mei-%e6%b2%a1-%e6%b2%92%e3%80%81mei-you-%e6%b2%a1%e6%9c%89-%e6%b2%92%e6%9c%89-not-and-bie-%e5%88%a5-don', 'Comparison, the negation adverbs bù, méi and bié');
  const CHIN_IMP = CHINGRAM('imperatives', 'Imperatives');
  const CHIN_DUR = CHINGRAM('time-measure-complement', 'Time-measure complement');
  const MIT = { nombre: 'MIT OpenCourseWare (EE. UU.), J. K. Wheatley, Learning Chinese: A Foundation Course in Mandarin (2011, en inglés)', url: 'https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/res21g_003_s_11.pdf' };
  const MSU_PRESTAR = MSU('https://openbooks.lib.msu.edu/chs102/chapter/lesson-10-dialogue-2-%e5%80%9f%e8%bd%a6/', 'Elementary Chinese II: Lesson 9 Dialogue 2 借车');
  const MSU_FONDA = MSU('https://openbooks.lib.msu.edu/chs102/chapter/lesson-12-dialogue-1-%e5%9c%a8%e9%a5%ad%e9%a6%86%e5%90%83%e9%a5%ad/', 'Elementary Chinese II: Lesson 12 Dialogue 1 在饭馆点餐');
  const CHIN_YOUDE = CHINGRAM('indefinite-pronoun-youde-%e6%9c%89%e7%9a%84-some', 'Indefinite pronoun yǒude 有的 «some»');
  const CHIN_NA = CHINGRAM('interrogative-pronoun-na-%e5%93%aa-which', 'Interrogative pronoun nǎ 哪 «which»');
  const CHIN_YANG = CHINGRAM('demonstrative-pronouns-%e9%82%a3%e4%b9%88-%e9%82%a3%e9%ba%bc-%e9%82%a3%e6%a0%b7-%e9%82%a3%e6%a8%a3-%e8%bf%99%e4%b9%88-%e9%80%99%e9%ba%bc-%e8%bf%99%e6%a0%b7-%e9%80%99%e6%a8%a3', 'Demonstrative pronouns 那么, 那样, 这么, 这样');
  const CHIN_BA = CHINGRAM('final-particle-ba-%e5%90%a7', 'Final particle ba 吧');
  const CHIN_ZAI = CHINGRAM('adverb-zai-%e5%86%8d-again-some-more-another', 'Adverb zài 再 «again», «some more; another»');
  const MSU_MENSAJE = MSU('https://openbooks.lib.msu.edu/chs101/chapter/lesson-6-dialogue-1-call-a-friend/', 'Elementary Chinese I: Lesson 6 Dialogue 1, Leaving a message');
  const MSU_LLAMAR = MSU('https://openbooks.lib.msu.edu/chs101/chapter/lesson-6-dialogue-2-2/', 'Elementary Chinese I: Lesson 6 Dialogue 2, Calling a Friend');

  // Plano de la lección 1: dos calles que se cruzan; la escuela, la tienda y la estación quedan arriba de la calle horizontal.
  const PLANO = G({
    x: [0, 10], y: [0, 5.2], proporcional: true, ejes: false,
    descripcion: 'Plano sencillo visto desde arriba. Una calle vertical sube desde abajo, donde está «yo», hasta cruzarse con una calle horizontal. Sobre la calle horizontal, de izquierda a derecha, hay tres edificios: la escuela, la tienda y la estación. La tienda queda justo a la izquierda del cruce y la estación en el extremo derecho. Una flecha va hacia arriba por la calle vertical y otra gira a la derecha por la calle horizontal.',
    figuras: [
      lin([5, 0.3], [5, 3.2]), lin([0.2, 2.6], [9.8, 2.6]),
      ...flecha([5.45, 0.5], [5.45, 2.35], 1), ...flecha([5.6, 2.6], [8.1, 2.6], 1),
      txt(5, 0.12, 'wǒ (yo)'),
      caja(0.3, 3.0, 2.3, 4.2), txt(1.3, 3.8, 'xuéxiào'), txt(1.3, 3.35, 'escuela'),
      caja(2.8, 3.0, 4.8, 4.2), txt(3.8, 3.8, 'shāngdiàn'), txt(3.8, 3.35, 'tienda'),
      caja(7.6, 3.0, 9.7, 4.2), txt(8.65, 3.8, 'dìtiězhàn'), txt(8.65, 3.35, 'estación'),
    ],
  });

  // ------------------------------------------------------------------
  L('Transporte y direcciones', {
    objetivo: `Decir qué tan lejos queda un lugar con ${zh("离", "lí")}, indicar el camino con ${zh("往", "wǎng")} y ubicar cosas a la izquierda, a la derecha, delante y detrás.`,
    explicacion: `
      <p>Un turista se pierde y quiere llegar a la estación. En chino hay frases hechas para preguntar el camino y para entender la respuesta. Primero, las doce palabras de la lección. La voz de tu dispositivo puede sonar distinta de un hablante nativo; si dudas, manda el pinyin.</p>
      ${tabla([
        ['路', 'lù', 'camino, calle'], ['路上', 'lùshang', 'en el camino'], ['离', 'lí', 'a una distancia de, desde'], ['左', 'zuǒ', 'izquierda'],
        ['右', 'yòu', 'derecha'], ['左边', 'zuǒbian', 'lado izquierdo'], ['右边', 'yòubian', 'lado derecho'], ['旁边', 'pángbiān', 'al lado'],
        ['前面', 'qiánmiàn', 'delante'], ['后面', 'hòumiàn', 'detrás'], ['到', 'dào', 'llegar'], ['分钟', 'fēnzhōng', 'minutos'],
      ])}
      <h3>¿Qué tan lejos queda? La palabra ${zh("离", "lí")}</h3>
      <p>Para hablar de la <strong>distancia</strong> entre dos lugares se usa ${zh("离", "lí")}. Según ChinGram, de la Universidad Palacký, va entre los dos lugares, y la distancia se dice con ${zh("远", "yuǎn")}, «lejos», o ${zh("近", "jìn")}, «cerca». La Universidad Estatal de Míchigan da el mismo molde: lugar 1, ${zh("离", "lí")}, lugar 2 y ${zh("远", "yuǎn")} o ${zh("近", "jìn")}. Las frases de ejemplo de la lección son nuestras: ${zh("学校离我家很近", "xuéxiào lí wǒ jiā hěn jìn")}, «la escuela queda cerca de mi casa».</p>
      <p>Tres detalles que marca la fuente. El adverbio, como ${zh("很", "hěn")}, va antes de ${zh("近", "jìn")} o ${zh("远", "yuǎn")}, nunca antes de ${zh("离", "lí")}. La negación ${zh("不", "bù")} va delante de la palabra que dice la distancia: ${zh("学校离我家不远", "xuéxiào lí wǒ jiā bù yuǎn")}, «la escuela no queda lejos de mi casa». Y para preguntar cuánto, se pone ${zh("多远", "duō yuǎn")} después de ${zh("离", "lí")}: ${zh("你家离学校多远", "nǐ jiā lí xuéxiào duō yuǎn")}. Para decir cuánto se tarda sirve ${zh("分钟", "fēnzhōng")}: ${zh("走路十分钟", "zǒulù shí fēnzhōng")}.</p>
      <h3>¿Por dónde voy? La palabra ${zh("往", "wǎng")}</h3>
      <p>Para dar una <strong>dirección</strong> se usa ${zh("往", "wǎng")}, que el libro de Míchigan define como «hacia». El sílabo del HSK la agrupa con ${zh("从", "cóng")} entre las preposiciones que introducen una dirección o un trayecto. El diálogo de Míchigan la usa con un lado y el verbo ${zh("走", "zǒu")}, «caminar», pero no da una regla escrita, así que la lección tampoco la inventa: solo muestra frases de ejemplo, ${zh("往前走", "wǎng qián zǒu")} («camina hacia delante») y ${zh("往右走", "wǎng yòu zǒu")} («camina hacia la derecha»). Como simplificación de la lección, ${zh("到", "dào")}, «llegar», sirve para marcar el punto donde cambias de camino: ${zh("到商店往左走", "dào shāngdiàn wǎng zuǒ zǒu")}.</p>
      <p>Para preguntar el camino, la fuente de Míchigan pone el destino y después ${zh("怎么走", "zěnme zǒu")}, «cómo se va»: ${zh("地铁站怎么走", "dìtiězhàn zěnme zǒu")}. Los medios de transporte los viste en "Destacar cuándo, dónde y cómo: ${zh("是…的")}".</p>
      ${PLANO}
      <h3>Izquierda, derecha y demás posiciones</h3>
      <p>Según ChinGram, las palabras de posición sueltas casi no se usan al hablar; se combinan con ${zh("边", "biān")} o ${zh("面", "miàn")}. Por eso en la tabla están ${zh("左边", "zuǒbian")}, ${zh("右边", "yòubian")}, ${zh("前面", "qiánmiàn")} y ${zh("后面", "hòumiàn")}. Y ${zh("旁边", "pángbiān")} siempre se dice así. El molde, igual que en "Arriba, abajo, dentro y fuera: ${zh("上, 下, 里")} y ${zh("外")}", es: cosa, ${zh("在", "zài")}, lugar y palabra de posición. En el plano: ${zh("商店在学校右边", "shāngdiàn zài xuéxiào yòubian")}, «la tienda está a la derecha de la escuela».</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("很", "hěn")} antes de ${zh("离", "lí")}. Va antes de ${zh("近", "jìn")}: ${zh("离我家很近", "lí wǒ jiā hěn jìn")}.</p>`,
    ejemplo: `
      <p>Ana está en la escuela y un amigo le pregunta por la estación. Seguimos la conversación con el plano de arriba.</p>
      <ol class="pasos-ej">
        <li>El amigo pregunta: ${zh("请问，地铁站怎么走", "qǐngwèn, dìtiězhàn zěnme zǒu")}. Pone el destino primero y ${zh("怎么走", "zěnme zǒu")} al final.</li>
        <li>Ana responde: ${zh("往前走，到商店往右走", "wǎng qián zǒu, dào shāngdiàn wǎng yòu zǒu")}. Son dos pasos: seguir recto y, al llegar a la tienda, girar a la derecha.</li>
        <li>El amigo duda: ${zh("地铁站离这儿远吗", "dìtiězhàn lí zhèr yuǎn ma")}. Ana contesta: ${zh("不远，走路十分钟", "bù yuǎn, zǒulù shí fēnzhōng")}. La negación ${zh("不", "bù")} va delante de ${zh("远", "yuǎn")}.</li>
        <li>Ana añade dónde queda: ${zh("地铁站在商店右边", "dìtiězhàn zài shāngdiàn yòubian")}.</li>
      </ol>
      <p>Comprueba: en la pregunta, ${zh("离", "lí")} está entre los dos lugares y ${zh("远", "yuǎn")} va al final. Resultado: <span class="resultado">${zh("地铁站离这儿不远", "dìtiězhàn lí zhèr bù yuǎn")} = «la estación no queda lejos de aquí»</span>.</p>`,
    vidaReal: `
      <p>Pedir y dar direcciones sirve en muchas situaciones:</p>
      <ul>
        <li>Preguntarle a alguien en la calle cómo llegar a la estación de tren.</li>
        <li>Decirle a un amigo que viene de visita cuánto camina desde la parada hasta tu casa.</li>
        <li>Entender si un lugar queda a la izquierda o a la derecha de otro en un mapa.</li>
        <li>Explicar a un compañero nuevo dónde está la tienda de la escuela.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «la escuela queda cerca de mi casa».</p>',
        respuesta: ['学校', '离', '我家', '很', '近'], pinyin: ['xuéxiào', 'lí', 'wǒ jiā', 'hěn', 'jìn'], lang: 'zh-Hans',
        pista: '<p>' + zh("离", "lí") + ' va entre los dos lugares y ' + zh("很", "hěn") + ' antes de la palabra de distancia.</p>',
        solucion: `<p>${zh("学校离我家很近", "xuéxiào lí wǒ jiā hěn jìn")}: lugar, ${zh("离", "lí")}, lugar, ${zh("很", "hěn")} y ${zh("近", "jìn")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «por favor, ¿cómo se va a la estación?».</p>',
        respuesta: ['请问', '地铁站', '怎么', '走'], pinyin: ['qǐngwèn', 'dìtiězhàn', 'zěnme', 'zǒu'], lang: 'zh-Hans',
        pista: '<p>El destino va antes de ' + zh("怎么走", "zěnme zǒu") + '.</p>',
        solucion: `<p>${zh("请问，地铁站怎么走", "qǐngwèn, dìtiězhàn zěnme zǒu")}: destino y después ${zh("怎么走", "zěnme zǒu")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Mira el plano. ¿Qué frase dice bien dónde queda la estación?</p>${PLANO}`,
        opciones: [zh('地铁站在商店左边', 'dìtiězhàn zài shāngdiàn zuǒbian'), zh('地铁站在商店右边', 'dìtiězhàn zài shāngdiàn yòubian'), zh('地铁站在学校左边', 'dìtiězhàn zài xuéxiào zuǒbian'), zh('学校在商店右边', 'xuéxiào zài shāngdiàn yòubian')], correcta: 1,
        pista: '<p>En el plano, la estación está más a la derecha que la tienda.</p>',
        solucion: `<p>${zh("地铁站在商店右边", "dìtiězhàn zài shāngdiàn yòubian")}: la estación queda a la derecha de la tienda.</p>` },
      { tipo: 'numero', enunciado: `<p>Ana camina ${zh("十分钟", "shí fēnzhōng")} de su casa a la escuela y ${zh("五分钟", "wǔ fēnzhōng")} de la escuela a la estación (tiempos de ejemplo). ¿Cuántos minutos camina en total?</p>`,
        respuesta: 15,
        pista: '<p>Suma los dos tiempos.</p>',
        solucion: '<p>10 + 5 = 15 minutos.</p>' },
      { tipo: 'opciones', escucha: { voz: '往右走' },
        sinAudio: '<p>Se dice <strong>wǎng yòu zǒu</strong>: wǎng baja y sube; yòu cae; zǒu baja y sube.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué indicación es?</p>',
        opciones: ['Camina hacia la derecha', 'Camina hacia la izquierda', 'Camina hacia delante', 'Camina hacia atrás'], correcta: 0,
        pista: '<p>Fíjate en la palabra del medio, que dice el lado.</p>',
        solucion: `<p>Se oye ${zh("往右走", "wǎng yòu zǒu")}: ${zh("右", "yòu")} es la derecha.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("旁边", "pángbiān")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['páng biān'],
        pista: '<p>La primera sílaba sube; la segunda es alta y plana.</p>',
        solucion: `<p>${zh("旁边", "pángbiān")}: <strong>páng biān</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_LI, MSU_RUTA, CHIN_POS, MSU_CAMINO],
  });

  // ------------------------------------------------------------------
  const TEMPERATURAS = barras({
    etiquetas: ['zuótiān', 'jīntiān', 'míngtiān'], valores: [18, 22, 15], max: 25, paso: 5,
    descripcion: 'Gráfica de barras de temperaturas de ejemplo, en grados centígrados, de tres días. Ayer, 18 grados. Hoy, 22 grados. Mañana, 15 grados.',
  });

  L('El clima', {
    objetivo: `Preguntar y contar cómo está el tiempo con ${zh("怎么样", "zěnmeyàng")}, usar ${zh("还", "hái")} para «todavía» y «además», y comparar días con ${zh("比", "bǐ")}.`,
    explicacion: `
      <p>Hablar del clima es la forma más fácil de empezar una conversación con alguien. Primero, las doce palabras de la lección. Hay otra ${zh("花", "huā")}, la de «gastar», que verás en la lección de la tienda; aquí es la flor.</p>
      ${tabla([
        ['晴', 'qíng', 'despejado, de sol'], ['阴', 'yīn', 'nublado'], ['天', 'tiān', 'día; cielo'], ['白天', 'báitiān', 'de día'],
        ['怎么样', 'zěnmeyàng', '¿cómo?, ¿qué tal?'], ['还', 'hái', 'todavía; además'], ['外面', 'wàimiàn', 'afuera'], ['里面', 'lǐmiàn', 'adentro'],
        ['上面', 'shàngmiàn', 'encima'], ['下面', 'xiàmiàn', 'debajo'], ['花', 'huā', 'flor'], ['鸟', 'niǎo', 'pájaro'],
      ])}
      <h3>Los climas más comunes</h3>
      <p>El libro de la Universidad Estatal de Míchigan da ${zh("晴天", "qíngtiān")} como «día soleado» y ${zh("阴", "yīn")} como «nublado, sin sol». Además, ${zh("白天", "báitiān")} es la parte del día con luz: ${zh("白天很热", "báitiān hěn rè")}, «de día hace calor». Las frases de ejemplo de la lección son nuestras:</p>
      ${cuadro(['Clima', 'Frase de ejemplo', 'Significa'], [
        [zh("晴天", "qíngtiān"), zh("今天是晴天", "jīntiān shì qíngtiān"), 'hoy está despejado'],
        [zh("阴天", "yīntiān"), zh("今天是阴天", "jīntiān shì yīntiān"), 'hoy está nublado'],
        [zh("下雨", "xiàyǔ"), zh("外面在下雨", "wàimiàn zài xiàyǔ"), 'afuera llueve'],
        [zh("下雪", "xiàxuě"), zh("外面在下雪", "wàimiàn zài xiàxuě"), 'afuera nieva'],
      ])}
      <h3>¿Cómo está? La palabra ${zh("怎么样", "zěnmeyàng")}</h3>
      <p>Según ChinGram, de la Universidad Palacký, ${zh("怎么样", "zěnmeyàng")} pregunta por la naturaleza, el estado o la manera de algo. La palabra de tiempo va antes del sujeto o entre el sujeto y ${zh("怎么样", "zěnmeyàng")}: ${zh("今天天气怎么样", "jīntiān tiānqì zěnmeyàng")}. Se responde con un adjetivo, ${zh("很热", "hěn rè")}, o con lo que pasa, ${zh("外面下雨了", "wàimiàn xiàyǔ le")}; ese ${zh("了", "le")} es el cambio que viste en "Algo cambió: ${zh("了")} al final de la frase".</p>
      <p>La fuente añade dos usos. Al final de una sugerencia pide la opinión del otro: ${zh("我们去外面玩，怎么样", "wǒmen qù wàimiàn wán, zěnmeyàng")}, «vamos a jugar afuera, ¿qué tal?». Y ${zh("不怎么样", "bù zěnmeyàng")} significa «no muy bueno»: ${zh("今天天气不怎么样", "jīntiān tiānqì bù zěnmeyàng")}.</p>
      <h3>${zh("还", "hái")}: «todavía» y «además»</h3>
      <p>Para ChinGram, ${zh("还", "hái")} tiene dos usos. Con el primero añade información sobre el mismo sujeto: ${zh("今天是晴天，还很热", "jīntiān shì qíngtiān, hái hěn rè")}, «hoy está despejado y además hace calor». Con el segundo indica que algo sigue igual, y va antes del verbo o del adjetivo: ${zh("天气还很冷", "tiānqì hái hěn lěng")}, «todavía hace mucho frío». Para negar, el ${zh("不", "bù")} va después de ${zh("还", "hái")}: ${zh("现在还不热", "xiànzài hái bù rè")}, «todavía no hace calor». Si la acción está en curso, suele ir ${zh("还在", "hái zài")}: ${zh("外面还在下雨", "wàimiàn hái zài xiàyǔ")}, «afuera sigue lloviendo».</p>
      <h3>Comparar días y ubicar cosas</h3>
      <p>Para comparar sirve ${zh("比", "bǐ")}, que ya conoces de "Comparar con ${zh("比")}". El molde de Míchigan es: cosa 1, ${zh("比", "bǐ")}, cosa 2 y adjetivo, como ${zh("今天比昨天冷", "jīntiān bǐ zuótiān lěng")}. Aquí: ${zh("今天比昨天热", "jīntiān bǐ zuótiān rè")}. Mira las temperaturas de ejemplo:</p>
      ${TEMPERATURAS}
      <p>Y las palabras con ${zh("面", "miàn")} funcionan como ${zh("前面", "qiánmiàn")} en la lección anterior: ${zh("鸟在外面", "niǎo zài wàimiàn")}, ${zh("花在桌子上面", "huā zài zhuōzi shàngmiàn")}, ${zh("猫在桌子下面", "māo zài zhuōzi xiàmiàn")}.</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("不", "bù")} antes de ${zh("还", "hái")}. La fuente dice que el adverbio negativo va después: ${zh("还不热", "hái bù rè")}.</p>`,
    ejemplo: `
      <p>Ana llama a Luis antes de salir. Seguimos su charla paso a paso.</p>
      <ol class="pasos-ej">
        <li>Ana pregunta: ${zh("今天天气怎么样", "jīntiān tiānqì zěnmeyàng")}. Pone ${zh("怎么样", "zěnmeyàng")} donde iría el adjetivo.</li>
        <li>Luis responde: ${zh("今天是晴天，比昨天热", "jīntiān shì qíngtiān, bǐ zuótiān rè")}. Con la gráfica de arriba: 22 grados, 4 más que ayer.</li>
        <li>Ana sigue: ${zh("外面还在下雨吗", "wàimiàn hái zài xiàyǔ ma")}. Luis dice que ya no llueve: salió el sol. Si siguiera lloviendo, diría que sí, que la lluvia sigue.</li>
        <li>Ana propone: ${zh("我们去外面玩，怎么样", "wǒmen qù wàimiàn wán, zěnmeyàng")}. Termina con ${zh("怎么样", "zěnmeyàng")} porque quiere saber qué opina Luis.</li>
        <li>Luis acepta y pregunta: ${zh("明天天气怎么样", "míngtiān tiānqì zěnmeyàng")}. Ana mira la gráfica: 15 grados, más fresco que hoy.</li>
      </ol>
      <p>Comprueba: ${zh("还", "hái")} va siempre antes del verbo o adjetivo. Resultado: <span class="resultado">${zh("今天比昨天热", "jīntiān bǐ zuótiān rè")} = «hoy hace más calor que ayer»</span>.</p>`,
    vidaReal: `
      <p>El clima aparece en muchas charlas:</p>
      <ul>
        <li>Preguntarle a un amigo por videollamada cómo está el tiempo donde vive.</li>
        <li>Decidir si llevas paraguas o abrigo antes de salir de casa.</li>
        <li>Proponer un plan al aire libre y pedir la opinión de tu amiga.</li>
        <li>Entender el pronóstico del tiempo de un viaje y comparar un día con otro, por ejemplo hoy con mañana.</li>
        <li>Contarle a tu abuela que, aunque ya es primavera, todavía hace frío por las mañanas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Te preguntan ${zh("今天天气怎么样", "jīntiān tiānqì zěnmeyàng")}. ¿Qué respuesta sí contesta la pregunta?</p>`,
        opciones: [zh('他是我同学', 'tā shì wǒ tóngxué'), zh('今天是晴天', 'jīntiān shì qíngtiān'), zh('我在家', 'wǒ zài jiā'), zh('三十块', 'sānshí kuài')], correcta: 1,
        pista: '<p>La pregunta es sobre el clima.</p>',
        solucion: `<p>${zh("今天是晴天", "jīntiān shì qíngtiān")} dice cómo está el tiempo; las otras contestan quién, dónde o cuánto.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «hoy hace más calor que ayer».</p>',
        respuesta: ['今天', '比', '昨天', '热'], pinyin: ['jīntiān', 'bǐ', 'zuótiān', 'rè'], lang: 'zh-Hans',
        pista: '<p>' + zh("比", "bǐ") + ' va entre los dos días que se comparan.</p>',
        solucion: `<p>${zh("今天比昨天热", "jīntiān bǐ zuótiān rè")}: día, ${zh("比", "bǐ")}, día y adjetivo.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «afuera sigue lloviendo».</p>',
        respuesta: ['外面', '还', '在', '下雨'], pinyin: ['wàimiàn', 'hái', 'zài', 'xiàyǔ'], lang: 'zh-Hans',
        pista: '<p>' + zh("还", "hái") + ' va antes de ' + zh("在", "zài") + ', que va antes del verbo.</p>',
        solucion: `<p>${zh("外面还在下雨", "wàimiàn hái zài xiàyǔ")}: lugar, ${zh("还在", "hái zài")} y verbo.</p>` },
      { tipo: 'numero', enunciado: `<p>Mira la gráfica de temperaturas de ejemplo. ¿Cuántos grados más hace hoy (${zh("今天", "jīntiān")}) que ayer (${zh("昨天", "zuótiān")})?</p>${TEMPERATURAS}`,
        respuesta: 4,
        pista: '<p>Resta la barra de ayer a la barra de hoy.</p>',
        solucion: '<p>22 − 18 = 4 grados más.</p>' },
      { tipo: 'opciones', escucha: { voz: '天气还很冷' },
        sinAudio: '<p>Se dice <strong>tiānqì hái hěn lěng</strong>: tiān empieza alto y se mantiene; qì cae; hái sube; hěn y lěng son dos tonos que bajan y suben seguidos, y el primero suena como si subiera.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice?</p>',
        opciones: ['Todavía hace mucho frío', 'Hoy hace calor', '¿Cómo está el tiempo?', 'Mañana llueve'], correcta: 0,
        pista: '<p>Fíjate en la palabra que viene justo antes de ' + zh("冷", "lěng") + '.</p>',
        solucion: `<p>Se oye ${zh("天气还很冷", "tiānqì hái hěn lěng")}: ${zh("还", "hái")} dice que sigue igual y ${zh("冷", "lěng")} es frío.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("怎么样", "zěnmeyàng")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['zěn me yàng', 'zěnme yàng'],
        pista: '<p>La primera sílaba baja y sube; la tercera cae.</p>',
        solucion: `<p>${zh("怎么样", "zěnmeyàng")}: <strong>zěn me yàng</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_ZENME, CHIN_HAI, MSU_CLIMA],
  });

  // ------------------------------------------------------------------
  L('En la tienda', {
    objetivo: `Pedir ver algo con ${zh("给我看一下", "gěi wǒ kàn yíxià")}, opinar con ${zh("好看", "hǎokàn")} y ${zh("漂亮", "piàoliang")}, contar cosas largas con ${zh("条", "tiáo")} y leer números grandes con ${zh("万", "wàn")}.`,
    explicacion: `
      <p>En una tienda o en un centro comercial se pide, se opina, se pregunta el precio y a veces se regatea. El precio ya lo viste en "Comprar: ${zh("多少钱")}". Primero, las doce palabras de la lección. Los precios y las cifras de la lección son de ejemplo.</p>
      ${tabla([
        ['商场', 'shāngchǎng', 'centro comercial'], ['票', 'piào', 'boleto'], ['门票', 'ménpiào', 'entrada (a un lugar)'], ['花', 'huā', 'gastar (dinero)'],
        ['万', 'wàn', 'diez mil'], ['条', 'tiáo', 'clasificador de cosas largas y estrechas'], ['包', 'bāo', 'bolsa, bolso'], ['手表', 'shǒubiǎo', 'reloj de pulsera'],
        ['好看', 'hǎokàn', 'bonito'], ['漂亮', 'piàoliang', 'lindo, bonito'], ['给', 'gěi', 'dar; a, para alguien'], ['一半', 'yíbàn', 'la mitad'],
      ])}
      <h3>Pedir ver algo: ${zh("给", "gěi")}</h3>
      <p>Según ChinGram, de la Universidad Palacký, ${zh("给", "gěi")} es sobre todo una preposición: con un sustantivo o pronombre introduce a quien recibe o se beneficia de la acción, y esa frase va antes del verbo. Su ejemplo ${zh("给我看", "gěi wǒ kàn")} es justo lo que se dice en una tienda. Las frases de ejemplo de la lección son nuestras: ${zh("请给我看一下这个包", "qǐng gěi wǒ kàn yíxià zhège bāo")}, «por favor, muéstrame este bolso». La negación va antes de toda la frase con ${zh("给", "gěi")}: ${zh("他没给我买包", "tā méi gěi wǒ mǎi bāo")}, «no me compró el bolso». Como simplificación de la lección, ${zh("给", "gěi")} también vale como verbo suelto, «dar», como en ${zh("我给你钱", "wǒ gěi nǐ qián")}; el curso de MIT lo glosa así.</p>
      <h3>Opinar y contar: ${zh("好看", "hǎokàn")}, ${zh("漂亮", "piàoliang")} y ${zh("条", "tiáo")}</h3>
      <p>Para decir que algo es bonito sirven ${zh("好看", "hǎokàn")} y ${zh("漂亮", "piàoliang")}: ${zh("这个手表很漂亮", "zhège shǒubiǎo hěn piàoliang")}. El sílabo los pone como adjetivos y la ficha no marca diferencia de uso entre ellos.</p>
      <p>${zh("条", "tiáo")} es un clasificador. Según ChinGram y la Universidad Estatal de Míchigan, cuenta cosas largas, estrechas y delgadas, y la ropa de la parte baja del cuerpo: ${zh("一条裤子", "yī tiáo kùzi")}, ${zh("一条路", "yī tiáo lù")}. Va después del número y antes del sustantivo, y con ${zh("这", "zhè")} se omite el ${zh("一", "yī")}: ${zh("这条裤子", "zhè tiáo kùzi")}. El sílabo también lista ${zh("包", "bāo")} entre los clasificadores prestados, pero la lección no da más reglas de ese uso.</p>
      <h3>Números grandes: ${zh("万", "wàn")}</h3>
      <p>${zh("万", "wàn")} es diez mil, una unidad propia. ChinGram explica que el español agrupa las cifras de tres en tres (15 000) y el chino de cuatro en cuatro (1,5000); por eso 15 000 se lee ${zh("一万五千", "yī wàn wǔ qiān")}: un ${zh("万", "wàn")} y cinco ${zh("千", "qiān")}. Antes de ${zh("万", "wàn")}, el dos puede ser ${zh("两", "liǎng")} o ${zh("二", "èr")}.</p>
      ${cuadro(['Cifra', 'En chino'], [
        ['3 000', zh("三千", "sān qiān")], ['10 000', zh("一万", "yī wàn")], ['50 000', zh("五万", "wǔ wàn")], ['15 000', zh("一万五千", "yī wàn wǔ qiān")], ['21 200', zh("两万一千两百", "liǎng wàn yì qiān liǎng bǎi")],
      ])}
      <h3>Gastar, la mitad y regatear</h3>
      <p>${zh("花", "huā")} con dinero es «gastar»: ${zh("我花了一百块", "wǒ huā le yìbǎi kuài")}. ${zh("一半", "yíbàn")} es la mitad: la mitad de ${zh("一百块", "yìbǎi kuài")} es ${zh("五十块", "wǔshí kuài")}. Para regatear alcanza lo que ya sabes: ${zh("太贵了，能便宜一点儿吗", "tài guì le, néng piányi yìdiǎnr ma")}.</p>
      <p class="nota"><strong>Trampa común:</strong> leer ${zh("两万", "liǎng wàn")} como «dos mil». Es 20 000; los dos mil son ${zh("两千", "liǎng qiān")}.</p>`,
    ejemplo: `
      <p>Ana está en un centro comercial y quiere unos pantalones. Seguimos su compra con precios de ejemplo.</p>
      <ol class="pasos-ej">
        <li>Ana entra a la tienda y pide: ${zh("请给我看一下这条裤子", "qǐng gěi wǒ kàn yíxià zhè tiáo kùzi")}. La frase con ${zh("给我", "gěi wǒ")} va antes de ${zh("看", "kàn")}.</li>
        <li>Pregunta: ${zh("这条裤子多少钱", "zhè tiáo kùzi duōshao qián")}. La vendedora dice ${zh("三百块", "sān bǎi kuài")}.</li>
        <li>Ana opina: ${zh("很好看，但是太贵了", "hěn hǎokàn, dànshì tài guì le")}, y pide: ${zh("能便宜一点儿吗", "néng piányi yìdiǎnr ma")}.</li>
        <li>La vendedora acepta ${zh("一百五十块", "yìbǎi wǔshí kuài")}, que es ${zh("一半", "yíbàn")} del precio. Ana sonríe, compra los pantalones y cuenta: ${zh("我花了一百五十块", "wǒ huā le yìbǎi wǔshí kuài")}.</li>
      </ol>
      <p>Comprueba: ${zh("条", "tiáo")} va entre ${zh("这", "zhè")} y ${zh("裤子", "kùzi")}, y 150 es la mitad de 300. Resultado: <span class="resultado">${zh("我花了一百五十块", "wǒ huā le yìbǎi wǔshí kuài")} = «gasté 150 yuanes»</span>.</p>`,
    vidaReal: `
      <p>Estas frases sirven cuando compras:</p>
      <ul>
        <li>Pedirle a un vendedor que te muestre una prenda o un bolso antes de decidir.</li>
        <li>Decirle a una amiga que su reloj te parece muy bonito.</li>
        <li>Entender un precio grande, como un celular de veinte mil pesos, leyendo por grupos de cuatro cifras.</li>
        <li>Hacer cuentas rápidas, como calcular la mitad del precio de una entrada.</li>
        <li>Decirle a una vendedora que algo te parece caro y preguntar si puede bajar el precio.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: `<p>Escribe con cifras el número ${zh("三万", "sān wàn")}.</p>`,
        respuesta: 30000,
        pista: '<p>' + zh("万", "wàn") + ' es diez mil; tienes tres de ellos.</p>',
        solucion: `<p>${zh("三万", "sān wàn")} = 3 × 10 000 = 30 000.</p>` },
      { tipo: 'numero', enunciado: `<p>Un reloj de ejemplo cuesta ${zh("八十块", "bāshí kuài")}. ¿Cuántos yuanes es ${zh("一半", "yíbàn")} de ese precio?</p>`,
        respuesta: 40,
        pista: '<p>La mitad es dividir entre 2.</p>',
        solucion: '<p>80 ÷ 2 = 40 yuanes.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para pedir «por favor, muéstrame estos pantalones».</p>',
        respuesta: ['请', '给我', '看', '一下', '这条裤子'], pinyin: ['qǐng', 'gěi wǒ', 'kàn', 'yíxià', 'zhè tiáo kùzi'], lang: 'zh-Hans',
        pista: '<p>La frase con ' + zh("给", "gěi") + ' va antes del verbo ' + zh("看", "kàn") + '.</p>',
        solucion: `<p>${zh("请给我看一下这条裤子", "qǐng gěi wǒ kàn yíxià zhè tiáo kùzi")}: ${zh("给我", "gěi wǒ")} antes de ${zh("看", "kàn")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «gasté cien yuanes».</p>',
        respuesta: ['我', '花', '了', '一百块'], pinyin: ['wǒ', 'huā', 'le', 'yìbǎi kuài'], lang: 'zh-Hans',
        pista: '<p>' + zh("了", "le") + ' va justo después del verbo.</p>',
        solucion: `<p>${zh("我花了一百块", "wǒ huā le yìbǎi kuài")}: quién, verbo, ${zh("了", "le")} y la cantidad.</p>` },
      { tipo: 'opciones', enunciado: '<p>Elige la frase correcta para «un pantalón».</p>',
        opciones: [zh('一本裤子', 'yī běn kùzi'), zh('一口裤子', 'yī kǒu kùzi'), zh('一条裤子', 'yī tiáo kùzi'), zh('一只裤子', 'yī zhī kùzi')], correcta: 2,
        pista: '<p>Los pantalones son ropa de la parte baja del cuerpo.</p>',
        solucion: `<p>${zh("一条裤子", "yī tiáo kùzi")}: ${zh("条", "tiáo")} es el clasificador de esa ropa.</p>` },
      { tipo: 'opciones', escucha: { voz: '两万' },
        sinAudio: '<p>Se dice <strong>liǎng wàn</strong>: liǎng baja y sube; wàn cae.</p>',
        enunciado: '<p>Escucha el número. ¿Cuál es?</p>',
        opciones: ['2000', '20 000', '200', '12 000'], correcta: 1,
        pista: '<p>La segunda palabra es la unidad grande de cuatro cifras.</p>',
        solucion: `<p>Se oye ${zh("两万", "liǎng wàn")}: dos veces diez mil, 20 000.</p>` },
    ],
    fuentes: [SILABO, CHIN_GEI, CHIN_NUM, CHIN_MW, MSU_TIENDA, MIT],
  });

  // ------------------------------------------------------------------
  L('En el médico', {
    objetivo: `Decir qué te duele, entender un consejo con ${zh("别", "bié")} y ${zh("不要", "búyào")}, usar ${zh("让", "ràng")} para «dejar» y decir cuánto dura algo.`,
    explicacion: `
      <p>Cuando alguien se siente mal, necesita decir qué le pasa y entender lo que le indican. Un <strong>consejo</strong> es una frase que dice qué hacer o qué no hacer. Aviso importante: las frases de esta lección son de ejemplo para practicar chino, no son consejos médicos reales; si te sientes mal, díselo a un adulto o a tu médico. Primero, las doce palabras.</p>
      ${tabla([
        ['看病', 'kànbìng', 'ir al médico, consultar'], ['眼睛', 'yǎnjing', 'ojo, ojos'], ['坏', 'huài', 'malo, estropeado'], ['睡', 'shuì', 'dormir'],
        ['小时', 'xiǎoshí', 'hora (de duración)'], ['别', 'bié', 'no (pide no hacer)'], ['让', 'ràng', 'dejar que'], ['起来', 'qǐlái', 'levantarse'],
        ['动', 'dòng', 'moverse'], ['不要', 'búyào', 'no (pide no hacer)'], ['有些', 'yǒuxiē', 'algo, un poco'], ['周', 'zhōu', 'semana'],
      ])}
      <h3>Decir qué te pasa</h3>
      <p>El médico empieza con ${zh("你哪儿不舒服", "nǐ nǎr bù shūfu")} y tú respondes: ${zh("我头疼，眼睛也有些疼", "wǒ tóu téng, yǎnjing yě yǒuxiē téng")}. Como simplificación de la lección, ${zh("有些", "yǒuxiē")} va antes de la molestia y significa «algo, un poco». Las frases de ejemplo de la lección son nuestras. Para ir a consulta se dice ${zh("看病", "kànbìng")}: ${zh("我去医院看病", "wǒ qù yīyuàn kànbìng")}. Y ${zh("坏", "huài")} dice que algo está estropeado: ${zh("我的手机坏了", "wǒ de shǒujī huài le")}.</p>
      <h3>Qué no hacer: ${zh("别", "bié")} y ${zh("不要", "búyào")}</h3>
      <p>Según ChinGram, de la Universidad Palacký, ${zh("别", "bié")} dice a alguien que no haga algo, sobre todo en órdenes, pedidos y avisos. Va antes del verbo y, si la frase lleva sujeto, este va antes: ${zh("别看手机", "bié kàn shǒujī")}, ${zh("你别动", "nǐ bié dòng")}. ${zh("不要", "búyào")} hace lo mismo: es la forma completa y más formal, y ${zh("别", "bié")} la corta. Con ${zh("请", "qǐng")} delante suena más amable: ${zh("请别动", "qǐng bié dòng")}. ${zh("别", "bié")} no se usa en preguntas neutras de sí o no. No lo confundas con ${zh("不", "bù")}, que niega lo que haces o sueles hacer: ${zh("我不看电视", "wǒ bù kàn diànshì")}, «no veo televisión»; ${zh("别看电视", "bié kàn diànshì")} es un «no veas».</p>
      <h3>Dejar que alguien haga algo: ${zh("让", "ràng")}</h3>
      <p>Las fuentes de MIT y de Míchigan dan ${zh("让", "ràng")} como «dejar»: ${zh("让", "ràng")}, una persona y un verbo. Se niega con ${zh("不", "bù")} delante: ${zh("妈妈不让我看电视", "māma bú ràng wǒ kàn diànshì")}, «mamá no me deja ver televisión». El médico dice ${zh("让我看一下", "ràng wǒ kàn yíxià")}, «déjame ver». El sílabo agrupa ${zh("让", "ràng")} con ${zh("请", "qǐng")} en una misma estructura. Como simplificación de la lección, ${zh("动", "dòng")} es «moverse» y ${zh("起来", "qǐlái")} es «levantarse»: ${zh("请起来", "qǐng qǐlái")}. El sílabo pone ${zh("起来", "qǐlái")} entre los complementos de dirección.</p>
      <h3>Cuánto dura: la duración después del verbo</h3>
      <p>ChinGram explica que la duración se pone después del verbo, y si hay ${zh("了", "le")}, después de ella. Se arma con número, ${zh("个", "gè")} y palabra de tiempo. Con ${zh("天", "tiān")} y ${zh("年", "nián")} no se usa clasificador.</p>
      ${cuadro(['Verbo', 'Partícula', 'Duración', 'Significa'], [
        [zh("睡", "shuì"), zh("了", "le"), zh("八个小时", "bā gè xiǎoshí"), 'dormí ocho horas'],
        [zh("休息", "xiūxi"), zh("了", "le"), zh("两个星期", "liǎng gè xīngqī"), 'descansé dos semanas'],
        [zh("休息", "xiūxi"), zh("了", "le"), zh("三天", "sān tiān"), 'descansé tres días'],
      ])}
      <p>Para «semana» el sílabo da ${zh("周", "zhōu")} como sustantivo y, entre paréntesis, como clasificador; para contar semanas la lección usa ${zh("星期", "xīngqī")}.</p>
      <p class="nota"><strong>Trampa común:</strong> poner la duración antes del verbo, como en español «ocho horas dormí». En chino va después: ${zh("我睡了八个小时", "wǒ shuì le bā gè xiǎoshí")}.</p>`,
    ejemplo: `
      <p>Luis va al médico con un dolor. Seguimos la consulta, que es solo un ejemplo.</p>
      <ol class="pasos-ej">
        <li>El médico pregunta: ${zh("你哪儿不舒服", "nǐ nǎr bù shūfu")}. Luis responde: ${zh("我头疼，眼睛也有些疼", "wǒ tóu téng, yǎnjing yě yǒuxiē téng")}.</li>
        <li>El médico dice: ${zh("让我看一下", "ràng wǒ kàn yíxià")}. Es ${zh("让", "ràng")} con el sentido de «déjame».</li>
        <li>Pregunta: ${zh("你睡了几个小时", "nǐ shuì le jǐ gè xiǎoshí")}. Luis contesta: ${zh("我睡了五个小时", "wǒ shuì le wǔ gè xiǎoshí")}. La duración va después de ${zh("了", "le")}.</li>
        <li>Da un consejo de ejemplo: ${zh("请别看手机，休息两天", "qǐng bié kàn shǒujī, xiūxi liǎng tiān")}. Con ${zh("请", "qǐng")} el consejo suena amable, y ${zh("两天", "liǎng tiān")} no lleva clasificador.</li>
        <li>Luis se despide y dice ${zh("谢谢", "xièxie")}.</li>
      </ol>
      <p>Comprueba: ${zh("别", "bié")} va antes del verbo y la duración después. Resultado: <span class="resultado">${zh("请别看手机", "qǐng bié kàn shǒujī")} = «por favor, no mires el celular»</span>.</p>`,
    vidaReal: `
      <p>Estas frases ayudan en la vida diaria:</p>
      <ul>
        <li>Explicarle a un médico, con ayuda de un adulto, dónde te duele.</li>
        <li>Entender una indicación de «no te muevas» durante una revisión.</li>
        <li>Contar a un amigo cuántas horas dormiste anoche.</li>
        <li>Decir que tus padres no te dejan hacer algo, como ver televisión tarde.</li>
        <li>Contarle a tu profesora que faltaste a clase porque descansaste tres días en casa con gripe.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «dormí ocho horas».</p>',
        respuesta: ['我', '睡', '了', '八个小时'], pinyin: ['wǒ', 'shuì', 'le', 'bā gè xiǎoshí'], lang: 'zh-Hans',
        pista: '<p>La duración va después de ' + zh("了", "le") + '.</p>',
        solucion: `<p>${zh("我睡了八个小时", "wǒ shuì le bā gè xiǎoshí")}: verbo, ${zh("了", "le")} y duración.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «mamá no me deja ver televisión».</p>',
        respuesta: ['妈妈', '不', '让', '我', '看', '电视'], pinyin: ['māma', 'bù', 'ràng', 'wǒ', 'kàn', 'diànshì'], lang: 'zh-Hans',
        pista: '<p>' + zh("不", "bù") + ' va justo antes de ' + zh("让", "ràng") + '.</p>',
        solucion: `<p>${zh("妈妈不让我看电视", "māma bú ràng wǒ kàn diànshì")}: persona, ${zh("不让", "bú ràng")}, persona y verbo.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres pedirle a alguien que no mire el celular. ¿Qué frase eliges?</p>',
        opciones: [zh('我不看手机', 'wǒ bù kàn shǒujī'), zh('别看手机', 'bié kàn shǒujī'), zh('他不看手机', 'tā bù kàn shǒujī'), zh('你看手机吗', 'nǐ kàn shǒujī ma')], correcta: 1,
        pista: '<p>Solo una de las frases le pide algo a otra persona.</p>',
        solucion: `<p>${zh("别看手机", "bié kàn shǒujī")}: ${zh("别", "bié")} pide no hacer. Las otras cuentan lo que alguien hace o preguntan.</p>` },
      { tipo: 'numero', enunciado: `<p>Ana ${zh("晚上十一点睡", "wǎnshang shíyī diǎn shuì")} y ${zh("早上七点起床", "zǎoshang qī diǎn qǐchuáng")}. ¿Cuántas horas durmió (${zh("睡了几个小时", "shuì le jǐ gè xiǎoshí")})?</p>`,
        respuesta: 8,
        pista: '<p>De las 11 de la noche a las 7 de la mañana: cuenta hasta las 12 y luego hasta las 7.</p>',
        solucion: '<p>De las 11 a las 12 es 1 hora y de las 12 a las 7 son 7 horas: 8 horas.</p>' },
      { tipo: 'opciones', escucha: { voz: '请别动' },
        sinAudio: '<p>Se dice <strong>qǐng bié dòng</strong>: qǐng baja y sube; bié sube; dòng cae.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice?</p>',
        opciones: ['Por favor, no te muevas', 'Por favor, muévete', 'Déjame ver', 'Descansa dos horas'], correcta: 0,
        pista: '<p>Fíjate en la palabra del medio, que sube.</p>',
        solucion: `<p>Se oye ${zh("请别动", "qǐng bié dòng")}: ${zh("请", "qǐng")} suaviza y ${zh("别动", "bié dòng")} es «no te muevas».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("眼睛", "yǎnjing")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['yǎn jing'],
        pista: '<p>La primera sílaba baja y sube; la segunda es breve y sin tono.</p>',
        solucion: `<p>${zh("眼睛", "yǎnjing")}: <strong>yǎn jing</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_BIE, CHIN_NEG, CHIN_IMP, CHIN_DUR, MIT, MSU_PRESTAR],
  });

  // --- Lecciones 5 a 8: segundo constructor ---
  // ------------------------------------------------------------------
  L('Pasatiempos', {
    objetivo: `Contar tus aficiones y cada cuánto las haces, repartir un grupo con ${zh("有的", "yǒude")}…${zh("有的", "yǒude")}…, preguntar por varias cosas con ${zh("哪些", "nǎxiē")} y decir «así» con ${zh("这样", "zhèyàng")}.`,
    explicacion: `
      <p>¿Qué haces cuando tienes tiempo libre? Contarlo es una de las charlas más comunes entre personas que se conocen. Primero, las catorce palabras de la lección. De ${zh("啊", "a")} solo vemos la tabla: el sílabo la lista como partícula, pero la ficha no trae reglas de su uso y la lección no inventa ninguna.</p>
      ${tabla([
        ['爱好', 'àihào', 'afición'], ['饭馆', 'fànguǎn', 'restaurante'], ['早饭', 'zǎofàn', 'desayuno'], ['晚饭', 'wǎnfàn', 'cena'],
        ['面包', 'miànbāo', 'pan'], ['有的', 'yǒude', 'algunos, unos'], ['哪些', 'nǎxiē', '¿cuáles? (varios)'], ['哪个', 'nǎge', '¿cuál? (uno)'],
        ['这样', 'zhèyàng', 'así, de esta manera'], ['那样', 'nàyàng', 'así, de esa manera'], ['啊', 'a', 'partícula (sin regla de uso aquí)'], ['飞', 'fēi', 'volar'],
        ['电影院', 'diànyǐngyuàn', 'cine'], ['饭店', 'fàndiàn', 'hotel; restaurante grande'],
      ])}
      <h3>Tus aficiones y cada cuánto</h3>
      <p>Una <strong>afición</strong> es algo que haces por gusto en tu tiempo libre. ${zh("爱好", "àihào")} es un sustantivo, «afición»; el sílabo también lo lista como verbo. Las frases de ejemplo de la lección son nuestras. Se pregunta ${zh("你有什么爱好", "nǐ yǒu shénme àihào")} y se responde ${zh("我的爱好是游泳", "wǒ de àihào shì yóuyǒng")}. Con verbos que ya conoces armas tu lista:</p>
      ${cuadro(['Afición', 'Frase de ejemplo', 'Significa'], [
        [zh("唱歌", "chàng gē"), zh("我喜欢唱歌", "wǒ xǐhuan chàng gē"), 'me gusta cantar'],
        [zh("跳舞", "tiàowǔ"), zh("我喜欢跳舞", "wǒ xǐhuan tiàowǔ"), 'me gusta bailar'],
        [zh("游泳", "yóuyǒng"), zh("我喜欢游泳", "wǒ xǐhuan yóuyǒng"), 'me gusta nadar'],
        [zh("踢足球", "tī zúqiú"), zh("我喜欢踢足球", "wǒ xǐhuan tī zúqiú"), 'me gusta jugar fútbol'],
      ])}
      <p>Para decir cada cuánto, tres palabras que ya conoces van antes del verbo: ${zh("每天", "měitiān")}, «todos los días»; ${zh("经常", "jīngcháng")}, «con frecuencia»; ${zh("有时", "yǒushí")}, «a veces». Por ejemplo, ${zh("我经常跑步，有时游泳", "wǒ jīngcháng pǎobù, yǒushí yóuyǒng")}.</p>
      <h3>Unos… otros…: ${zh("有的", "yǒude")}</h3>
      <p>Según ChinGram, de la Universidad Palacký, ${zh("有的", "yǒude")} se refiere a algunos miembros de un grupo mayor. Suele ir en posición de sujeto y puede llevar o no un sustantivo detrás. Para repartir el grupo se repite dos veces: ${zh("我们班有的同学喜欢唱歌，有的同学喜欢跳舞", "wǒmen bān yǒude tóngxué xǐhuan chàng gē, yǒude tóngxué xǐhuan tiàowǔ")}, «en mi clase a unos les gusta cantar y a otros bailar». Si el contexto aclara quiénes son, el sustantivo se omite: ${zh("有的喜欢游泳，有的喜欢踢足球", "yǒude xǐhuan yóuyǒng, yǒude xǐhuan tī zúqiú")}.</p>
      <h3>Preguntar por varias cosas: ${zh("哪些", "nǎxiē")}</h3>
      <p>La fuente explica que ${zh("哪", "nǎ")}, «cuál», pregunta por cosas y destaca la elección entre pocas opciones. Se coloca donde iría la respuesta. Para una sola cosa se dice ${zh("哪个", "nǎge")}: ${zh("你要哪个", "nǐ yào nǎge")}. Con ${zh("些", "xiē")} se forma ${zh("哪些", "nǎxiē")}, «cuáles», que se usa sin numeral: ${zh("哪些菜好吃", "nǎxiē cài hǎochī")}, «¿qué platos están ricos?». Tu pregunta de aficiones: ${zh("你喜欢哪些运动", "nǐ xǐhuan nǎxiē yùndòng")}.</p>
      <h3>Así y de esa manera: ${zh("这样", "zhèyàng")} y ${zh("那样", "nàyàng")}</h3>
      <p>Según la misma universidad, ${zh("这样", "zhèyàng")} y ${zh("那样", "nàyàng")} expresan la manera de una acción o la intensidad de un adjetivo, y van antes del verbo o del adjetivo que modifican. Un bailarín dice ${zh("你可以这样跳舞", "nǐ kěyǐ zhèyàng tiàowǔ")}, «puedes bailar así», y también ${zh("不要那样跳", "búyào nàyàng tiào")}, «no bailes de esa manera».</p>
      <h3>Comidas y volar</h3>
      <p>Las comidas del día se nombran como ${zh("午饭", "wǔfàn")}, con ${zh("饭", "fàn")} al final: ${zh("我早饭吃面包", "wǒ zǎofàn chī miànbāo")} y ${zh("我们去饭馆吃晚饭", "wǒmen qù fànguǎn chī wǎnfàn")}. Y ${zh("飞", "fēi")} sirve para lo que vuela: ${zh("鸟会飞", "niǎo huì fēi")}, «los pájaros pueden volar». Dos lugares más: ${zh("电影院", "diànyǐngyuàn")} es el cine, como en ${zh("我们去电影院看电影", "wǒmen qù diànyǐngyuàn kàn diànyǐng")}. Como simplificación de la lección, ${zh("饭店", "fàndiàn")} es un hotel o un restaurante grande: ${zh("这个饭店很大", "zhège fàndiàn hěn dà")}.</p>
      <p class="nota"><strong>Trampa común:</strong> decir ${zh("有的", "yǒude")} una sola vez cuando quieres repartir un grupo. La fuente lo muestra repetido: ${zh("有的", "yǒude")} para un subgrupo y ${zh("有的", "yǒude")} para el otro.</p>`,
    ejemplo: `
      <p>Ana y Luis hablan de sus aficiones en el recreo. Seguimos su charla.</p>
      <ol class="pasos-ej">
        <li>Ana pregunta: ${zh("你有什么爱好", "nǐ yǒu shénme àihào")}. ${zh("什么", "shénme")} está donde irá la respuesta.</li>
        <li>Luis contesta: ${zh("我的爱好是游泳，我经常游泳", "wǒ de àihào shì yóuyǒng, wǒ jīngcháng yóuyǒng")}. ${zh("经常", "jīngcháng")} va antes del verbo.</li>
        <li>Ana sigue: ${zh("你的同学呢", "nǐ de tóngxué ne")}. Luis reparte el grupo: ${zh("我们班有的同学喜欢唱歌，有的同学喜欢跳舞", "wǒmen bān yǒude tóngxué xǐhuan chàng gē, yǒude tóngxué xǐhuan tiàowǔ")}.</li>
        <li>Ana quiere saber más: ${zh("你们喜欢哪些运动", "nǐmen xǐhuan nǎxiē yùndòng")}. Pregunta por varios deportes, así que usa ${zh("哪些", "nǎxiē")} y no ${zh("哪个", "nǎge")}.</li>
        <li>Ana pide ayuda para bailar y Luis le muestra: ${zh("你可以这样跳舞", "nǐ kěyǐ zhèyàng tiàowǔ")}.</li>
      </ol>
      <p>Comprueba: ${zh("有的", "yǒude")} aparece dos veces, una por subgrupo. Resultado: <span class="resultado">${zh("有的喜欢唱歌，有的喜欢跳舞", "yǒude xǐhuan chàng gē, yǒude xǐhuan tiàowǔ")} = «a unos les gusta cantar y a otros bailar»</span>.</p>`,
    vidaReal: `
      <p>Hablar de aficiones sirve para hacer amigos:</p>
      <ul>
        <li>Contarle a un compañero nuevo qué te gusta hacer después de la escuela.</li>
        <li>Preguntarle a alguien por internet cuáles son sus deportes o juegos favoritos.</li>
        <li>Decir que en tu grupo unos prefieren una actividad y otros otra, para proponer un plan que contente a todos.</li>
        <li>Explicar a un amigo cómo se hace un paso de baile o un truco, mostrándolo con un «así».</li>
        <li>Elegir con tu familia en qué restaurante cenar y preguntar qué platos recomiendan.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «mi afición es nadar».</p>',
        respuesta: ['我的', '爱好', '是', '游泳'], pinyin: ['wǒ de', 'àihào', 'shì', 'yóuyǒng'], lang: 'zh-Hans',
        pista: '<p>Primero quien posee, luego la afición, después ' + zh("是", "shì") + ' y la actividad.</p>',
        solucion: `<p>${zh("我的爱好是游泳", "wǒ de àihào shì yóuyǒng")}: «mi afición es nadar».</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «en nuestra clase, a algunos compañeros les gusta cantar».</p>',
        respuesta: ['我们班', '有的', '同学', '喜欢', '唱歌'], pinyin: ['wǒmen bān', 'yǒude', 'tóngxué', 'xǐhuan', 'chàng gē'], lang: 'zh-Hans',
        pista: '<p>' + zh("有的", "yǒude") + ' va justo antes del sustantivo del grupo.</p>',
        solucion: `<p>${zh("我们班有的同学喜欢唱歌", "wǒmen bān yǒude tóngxué xǐhuan chàng gē")}: grupo, ${zh("有的", "yǒude")}, sustantivo y verbo.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «a unos les gusta nadar y a otros correr». ¿Qué frase eliges?</p>',
        opciones: [zh('我喜欢游泳，也喜欢跑步', 'wǒ xǐhuan yóuyǒng, yě xǐhuan pǎobù'), zh('你喜欢游泳吗', 'nǐ xǐhuan yóuyǒng ma'), zh('有的喜欢游泳，有的喜欢跑步', 'yǒude xǐhuan yóuyǒng, yǒude xǐhuan pǎobù'), zh('哪些喜欢游泳', 'nǎxiē xǐhuan yóuyǒng')], correcta: 2,
        pista: '<p>Busca la palabra que se repite una vez por cada subgrupo.</p>',
        solucion: `<p>${zh("有的喜欢游泳，有的喜欢跑步", "yǒude xǐhuan yóuyǒng, yǒude xǐhuan pǎobù")} reparte el grupo. La segunda habla de una sola persona y la tercera es una pregunta.</p>` },
      { tipo: 'opciones', escucha: { voz: '你喜欢哪些运动' },
        sinAudio: '<p>Se dice <strong>nǐ xǐhuan nǎxiē yùndòng</strong>: nǐ suena como si subiera, porque va delante de otro tono que baja y sube; xǐ baja y sube; huan es breve; nǎ baja y sube; xiē es alto y plano; yùn y dòng caen.</p>',
        enunciado: '<p>Escucha la pregunta. ¿Qué te preguntan?</p>',
        opciones: ['Dónde juegas fútbol', 'Qué deportes te gustan', 'Quién nada contigo', 'Cuántas veces corres'], correcta: 1,
        pista: '<p>Fíjate en la palabra que pregunta, justo antes de la actividad.</p>',
        solucion: `<p>Se oye ${zh("你喜欢哪些运动", "nǐ xǐhuan nǎxiē yùndòng")}: ${zh("哪些", "nǎxiē")} pregunta «cuáles».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("面包", "miànbāo")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['miàn bāo'],
        pista: '<p>La primera sílaba cae; la segunda es alta y plana.</p>',
        solucion: `<p>${zh("面包", "miànbāo")}: <strong>miàn bāo</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>¿Qué significa ${zh("爱好", "àihào")} en español? Escribe una palabra.</p>`,
        respuestas: ['afición', 'aficion', 'aficiones', 'pasatiempo', 'hobby'],
        pista: '<p>Es algo que haces por gusto en tu tiempo libre.</p>',
        solucion: `<p>${zh("爱好", "àihào")} es «afición» (o «pasatiempo»).</p>` },
    ],
    fuentes: [SILABO, CHIN_YOUDE, CHIN_NA, CHIN_YANG],
  });

  // ------------------------------------------------------------------
  L('Hablar por teléfono', {
    objetivo: `Contestar y hacer una llamada con ${zh("喂", "wèi")}, contar personas con ${zh("位", "wèi")}, proponer con ${zh("吧", "ba")}, pedir que repitan con ${zh("再", "zài")} y quedar con alguien con ${zh("见", "jiàn")}.`,
    explicacion: `
      <p>Una llamada tiene frases casi fijas, y por eso es fácil de aprender. Primero, las doce palabras de la lección. Las frases de ejemplo de la lección son nuestras. La voz de tu dispositivo puede sonar distinta de un hablante nativo; si dudas, manda el pinyin.</p>
      ${tabla([
        ['喂', 'wèi', 'hola (al contestar el teléfono)'], ['先生', 'xiānsheng', 'señor'], ['女士', 'nǚshì', 'señora'], ['位', 'wèi', 'clasificador de personas, con respeto'],
        ['见', 'jiàn', 'ver, encontrarse'], ['再', 'zài', 'otra vez, de nuevo'], ['吧', 'ba', 'partícula que suaviza o propone'], ['不好意思', 'bù hǎoyìsi', 'disculpa; me da pena'],
        ['门口', 'ménkǒu', 'entrada, puerta'], ['过去', 'guòqù', 'ir hacia allá'], ['上去', 'shàngqù', 'subir (hacia allá)'], ['下来', 'xiàlái', 'bajar (hacia acá)'],
      ])}
      <h3>Las frases de una llamada</h3>
      <p>Según un diálogo de la Universidad Estatal de Míchigan, quien llama dice ${zh("喂，请问老师在吗", "wèi, qǐngwèn lǎoshī zài ma")}: ${zh("喂", "wèi")} para empezar y ${zh("请问", "qǐngwèn")} para preguntar por alguien. La respuesta pregunta quién llama con ${zh("您哪位", "nín nǎ wèi")}. El sílabo escribe ${zh("喂", "wèi")} con ese tono.</p>
      ${cuadro(['Situación', 'Frase de ejemplo', 'Significa'], [
        ['Contestar', zh("喂，您哪位", "wèi, nín nǎ wèi"), 'hola, ¿con quién hablo?'],
        ['Preguntar por alguien', zh("请问，老师在吗", "qǐngwèn, lǎoshī zài ma"), 'por favor, ¿está el maestro?'],
        ['Decir que no está', zh("对不起，他不在", "duìbuqǐ, tā bú zài"), 'perdón, no está'],
        ['Pedir que repitan', zh("不好意思，请再说一次", "bù hǎoyìsi, qǐng zài shuō yí cì"), 'disculpa, repite por favor'],
        ['Quedar', zh("我们在学校门口见吧", "wǒmen zài xuéxiào ménkǒu jiàn ba"), 'nos vemos en la entrada de la escuela'],
        ['Cerrar la llamada', zh("那你去忙吧", "nà nǐ qù máng ba"), 'entonces ve a lo tuyo'],
      ])}
      <p>${zh("不好意思", "bù hǎoyìsi")} aparece en un diálogo de Míchigan como ${zh("我不好意思让你去", "wǒ bù hǎoyìsi ràng nǐ qù")}: es la pena de molestar a alguien. Como simplificación de la lección, también sirve para disculparse al pedir algo.</p>
      <h3>Contar personas: ${zh("位", "wèi")}</h3>
      <p>Según ChinGram, ${zh("位", "wèi")} es el clasificador de personas con cortesía y respeto, y va entre el número y el sustantivo. Si hay ${zh("这", "zhè")}, ${zh("那", "nà")} o ${zh("哪", "nǎ")}, estas van antes del número. Míchigan lo muestra en un restaurante, donde el mesero pregunta cuántas personas son y le contestan con un número y ${zh("位", "wèi")}: ${zh("你们几位", "nǐmen jǐ wèi")}, ${zh("我们三位", "wǒmen sān wèi")}. Con ${zh("先生", "xiānsheng")} y ${zh("女士", "nǚshì")}: ${zh("这位先生", "zhè wèi xiānsheng")}, ${zh("那位女士", "nà wèi nǚshì")}. Como simplificación de la lección, ${zh("先生", "xiānsheng")} es «señor», ${zh("女士", "nǚshì")} es «señora» y ${zh("门口", "ménkǒu")} es «entrada».</p>
      <h3>Proponer y suavizar: ${zh("吧", "ba")}</h3>
      <p>ChinGram dice que ${zh("吧", "ba")} va siempre al final de la oración y suaviza el tono. En afirmaciones marca sugerencias suaves o invitaciones: ${zh("我们走吧", "wǒmen zǒu ba")}, «vámonos»; ${zh("我们休息一下吧", "wǒmen xiūxi yíxià ba")}, «descansemos un momento». También puede seguir a una frase con ${zh("别", "bié")} para una prohibición suave: ${zh("你别看手机吧", "nǐ bié kàn shǒujī ba")}. Con ${zh("见", "jiàn")} se quedan dos personas: ${zh("明天见", "míngtiān jiàn")}.</p>
      <h3>Otra vez: ${zh("再", "zài")}</h3>
      <p>Según ChinGram, ${zh("再", "zài")} indica que una acción se repetirá, sobre todo en el futuro, y va antes del verbo: ${zh("我们明天再来", "wǒmen míngtiān zài lái")}. Después de ${zh("不", "bù")} o de un verbo modal, va justo después: ${zh("我不再看电视", "wǒ bú zài kàn diànshì")}, ${zh("我可以再看一下吗", "wǒ kěyǐ zài kàn yíxià ma")}. Con una cantidad, «una vez más»: ${zh("请再说一次", "qǐng zài shuō yí cì")}. No lo confundas con ${zh("在", "zài")}, que se lee igual: ${zh("我在家", "wǒ zài jiā")} dice dónde estás.</p>
      <h3>Ir hacia allá, subir y bajar</h3>
      <p>El sílabo lista ${zh("过去", "guòqù")}, ${zh("上去", "shàngqù")} y ${zh("下来", "xiàlái")} entre los complementos de dirección. Sus significados son una simplificación de la lección: ${zh("去", "qù")} aleja de quien habla y ${zh("来", "lái")} acerca. ${zh("我一会儿过去", "wǒ yíhuìr guòqù")}, «voy para allá en un momento»; ${zh("你上去吧", "nǐ shàngqù ba")}, «sube»; ${zh("你下来吧", "nǐ xiàlái ba")}, «baja».</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("吧", "ba")} al principio. Siempre va al final de la frase.</p>`,
    ejemplo: `
      <p>Luis llama a Ana, pero Ana no tiene guardado su número. Seguimos la llamada.</p>
      <ol class="pasos-ej">
        <li>Ana contesta: ${zh("喂，您哪位", "wèi, nín nǎ wèi")}. Usa ${zh("您", "nín")}, la forma cortés, porque no sabe quién llama.</li>
        <li>Luis habla muy rápido: ${zh("我是你同学，我们现在在学校门口见吧", "wǒ shì nǐ tóngxué, wǒmen xiànzài zài xuéxiào ménkǒu jiàn ba")}. Ana no entiende bien.</li>
        <li>Ana dice: ${zh("不好意思，请再说一次", "bù hǎoyìsi, qǐng zài shuō yí cì")}. ${zh("再", "zài")} va antes de ${zh("说", "shuō")}, y ${zh("一次", "yī cì")} cuenta la repetición.</li>
        <li>Luis repite despacio: ${zh("我们在学校门口见吧", "wǒmen zài xuéxiào ménkǒu jiàn ba")}. Termina con ${zh("吧", "ba")} porque propone, no ordena.</li>
        <li>Ana acepta: ${zh("好，我一会儿过去", "hǎo, wǒ yíhuìr guòqù")}, y se despide con ${zh("再见", "zàijiàn")}.</li>
      </ol>
      <p>Comprueba: ${zh("吧", "ba")} está al final y ${zh("再", "zài")} antes del verbo. Resultado: <span class="resultado">${zh("我们在学校门口见吧", "wǒmen zài xuéxiào ménkǒu jiàn ba")} = «nos vemos en la entrada de la escuela»</span>.</p>`,
    vidaReal: `
      <p>Estas frases sirven cuando hablas por teléfono o por videollamada:</p>
      <ul>
        <li>Contestar una llamada de un número desconocido y preguntar quién habla.</li>
        <li>Pedir que repitan algo cuando la conexión es mala o la persona habla muy rápido.</li>
        <li>Quedar con un amigo en un punto de encuentro, como la entrada de la escuela o del cine.</li>
        <li>Avisar que ya vas en camino o que bajas en un momento.</li>
        <li>Llamar a casa de un compañero y preguntar si puede venir a la puerta.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para proponer «nos vemos en la entrada de la escuela».</p>',
        respuesta: ['我们', '在', '学校', '门口', '见', '吧'], pinyin: ['wǒmen', 'zài', 'xuéxiào', 'ménkǒu', 'jiàn', 'ba'], lang: 'zh-Hans',
        alternativas: [['在', '学校', '门口', '我们', '见', '吧']],
        pista: '<p>' + zh("吧", "ba") + ' cierra la frase.</p>',
        solucion: `<p>${zh("我们在学校门口见吧", "wǒmen zài xuéxiào ménkǒu jiàn ba")}: lugar, verbo y ${zh("吧", "ba")} al final.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para pedir «por favor, repite una vez más».</p>',
        respuesta: ['请', '再', '说', '一次'], pinyin: ['qǐng', 'zài', 'shuō', 'yī cì'], lang: 'zh-Hans',
        pista: '<p>' + zh("再", "zài") + ' va antes del verbo.</p>',
        solucion: `<p>${zh("请再说一次", "qǐng zài shuō yí cì")}: ${zh("请", "qǐng")}, ${zh("再", "zài")}, verbo y cantidad. ${zh("一", "yī")} cambia a <em>yí</em> delante de un tono que cae.</p>` },
      { tipo: 'opciones', enunciado: `<p>Contestas el teléfono y te dicen ${zh("喂，您哪位", "wèi, nín nǎ wèi")}. ¿Qué respuesta tiene sentido?</p>`,
        opciones: [zh('我在家', 'wǒ zài jiā'), zh('我是她的同学', 'wǒ shì tā de tóngxué'), zh('我们三位', 'wǒmen sān wèi'), zh('明天见', 'míngtiān jiàn')], correcta: 1,
        pista: '<p>La pregunta es quién eres.</p>',
        solucion: `<p>${zh("我是她的同学", "wǒ shì tā de tóngxué")} dice quién eres. Las otras dicen dónde estás, cuántos son o se despiden.</p>` },
      { tipo: 'opciones', enunciado: '<p>No entendiste lo que dijo tu amigo por teléfono. ¿Qué dices?</p>',
        opciones: [zh('我们走吧', 'wǒmen zǒu ba'), zh('请问老师在吗', 'qǐngwèn lǎoshī zài ma'), zh('不好意思，请再说一次', 'bù hǎoyìsi, qǐng zài shuō yí cì'), zh('我一会儿过去', 'wǒ yíhuìr guòqù')], correcta: 2,
        pista: '<p>Busca la frase que pide repetir.</p>',
        solucion: `<p>${zh("不好意思，请再说一次", "bù hǎoyìsi, qǐng zài shuō yí cì")} pide que repita. Las otras proponen irse, preguntan por alguien o avisan que vas.</p>` },
      { tipo: 'opciones', escucha: { voz: '我一会儿过去' },
        sinAudio: '<p>Se dice <strong>wǒ yíhuìr guòqù</strong>: wǒ baja y sube; yí sube; huìr cae; guò y qù caen.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice la persona?</p>',
        opciones: ['Bajo ahora mismo', 'Nos vemos mañana', 'Estoy en la entrada', 'Voy para allá en un momento'], correcta: 3,
        pista: '<p>Fíjate en las dos últimas palabras.</p>',
        solucion: `<p>Se oye ${zh("我一会儿过去", "wǒ yíhuìr guòqù")}: ${zh("过去", "guòqù")} es ir hacia allá.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("女士", "nǚshì")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['nǚ shì'],
        pista: '<p>La primera sílaba lleva ü y baja y sube; la segunda cae.</p>',
        solucion: `<p>${zh("女士", "nǚshì")}: <strong>nǚ shì</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_BA, CHIN_MW, CHIN_ZAI, MSU_MENSAJE, MSU_LLAMAR, MSU_FONDA, MSU_PRESTAR],
  });

  // ------------------------------------------------------------------
  // Fuentes de las lecciones 7 y 8 (F41 a F52)
  const KAP = (url, nombre) => ({ nombre: `Kapiolani Community College (EE. UU.), CHN101 Elementary Mandarin I: ${nombre} (en inglés)`, url });
  const KAP_XING = KAP('https://human.libretexts.org/Courses/Kapiolani_Community_College/CHN101%3A_Elementary_Mandarin_I_(Polley)/Elementary_Mandarin_I_Textbook/02%3A_First_Contact/2.12%3A_Lesson_1_Grammar_-_The_verb_(xing)', 'Lesson 1 Grammar, The verb 姓 (xìng)');
  const KAP_DE = KAP('https://human.libretexts.org/Courses/Kapiolani_Community_College/CHN101%3A_Elementary_Mandarin_I_(Polley)/Elementary_Mandarin_I_Textbook/04%3A_Family/4.07%3A_Lesson_3_Grammar_-_Expressing_close_possession_without__(de)', 'Lesson 3 Grammar, Expressing close possession without 的');
  const KAP_NOMBRE = KAP('https://human.libretexts.org/Courses/Kapiolani_Community_College/CHN101%3A_Elementary_Mandarin_I_(Polley)/Elementary_Mandarin_I_Textbook/01%3A_Introduction/1.09%3A_Choose_or_Request_a_Chinese_Name', 'Choose or Request a Chinese Name');
  const KAP_DIR = KAP('https://human.libretexts.org/Courses/Kapiolani_Community_College/CHN101%3A_Elementary_Mandarin_I_(Polley)/Elementary_Mandarin_I_Textbook/07%3A_At_the_Hotel/7.04%3A_Lesson_6_Grammar_-_Directional_complements', 'Lesson 6 Grammar, Directional complements');
  const KAP_QU = KAP('https://human.libretexts.org/Courses/Kapiolani_Community_College/CHN101%3A_Elementary_Mandarin_I_(Polley)/Elementary_Mandarin_I_Textbook/07%3A_At_the_Hotel/7.07%3A_Lesson_6_Grammar_-_Using_the_verb__(qu)', 'Lesson 6 Grammar, Using the verb 去');
  const MSU_NOMBRES = MSU('https://openbooks.lib.msu.edu/chs101/chapter/chapter-1/', 'Elementary Chinese I: Lesson 1 Dialogue 1, vocabulario');
  const MSU_FOTO = MSU('https://openbooks.lib.msu.edu/chs101/chapter/lesson-3a-talking-about-a-photo/', 'Elementary Chinese I: Lesson 2 Dialogue 1, Talking About a Photo');
  const SJU = { nombre: 'College of Saint Benedict y Saint John’s University (EE. UU.), List of Chinese measure words (en inglés; copia de la lista de Wikipedia, 2010)', url: 'https://employees.csbsju.edu/hjakubowski/classes/ChinaStudyAbroad/list_of_chinese_measure_words.htm' };
  const WIKI_CLAS = { nombre: 'Wikipedia (en inglés), List of Chinese classifiers (solo apoyo)', url: 'https://en.wikipedia.org/wiki/List_of_Chinese_classifiers' };
  const CHIN_ESTE = CHINGRAM('demonstrative-pronouns-%e8%bf%99-%e9%80%99-%e9%82%a3-%e8%bf%99%e4%ba%9b-%e9%80%99%e4%ba%9b-%e9%82%a3%e4%ba%9b', 'Demonstrative pronouns 这, 那, 这些, 那些');
  const CHIN_ZAI_PROG = CHINGRAM('the-progressive-marker-zai-%e5%9c%a8', 'The progressive marker 在');

  // Árbol familiar de la lección 7: tres generaciones, rótulos en pinyin y español.
  const nodo = (x1, y1, x2, y2, py, es) => [caja(x1, y1, x2, y2), txt((x1 + x2) / 2, y2 - 0.35, py), txt((x1 + x2) / 2, y1 + 0.3, es)];
  const ARBOL = G({
    x: [0, 10], y: [0, 6.2], proporcional: true, ejes: false,
    descripcion: 'Árbol familiar de tres generaciones. Arriba, una pareja unida por una línea: el abuelo y la abuela del lado del papá. De su unión baja una línea hasta el papá, en la fila del medio, que está unido por otra línea a la mamá. De la línea de los padres bajan líneas hasta la fila de abajo, donde están tres hijos: el hermano mayor, yo y la hermana menor. A la derecha, tres rótulos indican las generaciones: abuelos, padres e hijos.',
    figuras: [
      ...nodo(0.8, 4.9, 3.4, 5.9, 'yéye', 'abuelo'), ...nodo(4.0, 4.9, 6.6, 5.9, 'nǎinai', 'abuela'), lin([3.4, 5.4], [4.0, 5.4]),
      lin([3.7, 5.4], [3.7, 4.4]), lin([3.7, 4.4], [2.1, 4.4]), lin([2.1, 4.4], [2.1, 3.7]),
      ...nodo(0.8, 2.7, 3.4, 3.7, 'bàba', 'papá'), ...nodo(4.0, 2.7, 6.6, 3.7, 'māma', 'mamá'), lin([3.4, 3.2], [4.0, 3.2]),
      lin([3.7, 3.2], [3.7, 2.0]), lin([1.5, 2.0], [6.5, 2.0]), lin([1.5, 2.0], [1.5, 1.3]), lin([4.0, 2.0], [4.0, 1.3]), lin([6.5, 2.0], [6.5, 1.3]),
      ...nodo(0.1, 0.3, 2.9, 1.3, 'gēge', 'hermano mayor'), ...nodo(3.0, 0.3, 5.0, 1.3, 'wǒ', 'yo'), ...nodo(5.1, 0.3, 7.9, 1.3, 'mèimei', 'hermana menor'),
      txt(8.9, 5.4, 'abuelos'), txt(8.9, 3.2, 'padres'), txt(8.9, 0.8, 'hijos'),
    ],
  });

  // ------------------------------------------------------------------
  L('La gente: familia y nombres', {
    objetivo: `Preguntar y decir el apellido con ${zh("姓", "xìng")}, saber que el apellido va primero, armar palabras de persona con ${zh("男", "nán")} y ${zh("女", "nǚ")} y presentar a tus abuelos.`,
    explicacion: `
      <p>Presentarte y presentar a tu familia es de lo primero que se hace con gente nueva. En chino cambia el orden de los nombres y hay palabras para cada pariente. Primero, las doce palabras de la lección. Las frases de ejemplo de la lección son nuestras.</p>
      ${tabla([
        ['姓', 'xìng', 'apellido; tener por apellido'], ['姓名', 'xìngmíng', 'nombre completo'], ['爷爷', 'yéye', 'abuelo (lado del papá)'], ['奶奶', 'nǎinai', 'abuela (lado del papá)'],
        ['丈夫', 'zhàngfu', 'esposo'], ['妻子', 'qīzi', 'esposa'], ['男', 'nán', 'hombre, masculino'], ['女', 'nǚ', 'mujer, femenino'],
        ['男孩儿', 'nánháir', 'niño'], ['女孩儿', 'nǚháir', 'niña'], ['男朋友', 'nánpéngyou', 'novio'], ['女朋友', 'nǚpéngyou', 'novia'],
      ])}
      <h3>Primero el apellido</h3>
      <p>El <strong>apellido</strong> es el nombre de la familia. Según un curso del Kapiolani Community College, en chino el apellido va antes del nombre de pila, al revés que en español. Como simplificación de la lección, «Ana López» se diría «López Ana». Otra fuente de la misma universidad añade que casi todos los apellidos chinos tienen un solo carácter. Y el sílabo incluye entre los temas del nivel 2 los apellidos más comunes y los tratos formales.</p>
      <h3>Decir y preguntar el apellido: ${zh("姓", "xìng")}</h3>
      <p>${zh("姓", "xìng")} es un verbo: significa «tener por apellido». La estructura es sujeto, ${zh("姓", "xìng")} y apellido: ${zh("我姓…", "wǒ xìng …")}, donde los puntos suspensivos son tu apellido. Se pregunta ${zh("你姓什么", "nǐ xìng shénme")}. La Universidad Estatal de Míchigan da también la forma cortés ${zh("您贵姓", "nín guì xìng")}, y el curso de Kapiolani dice que es casi siempre la que se usa para preguntar. Como sustantivo, ${zh("姓", "xìng")} es «apellido» y ${zh("姓名", "xìngmíng")} es el nombre completo, apellido y nombre; el sílabo da ambos como sustantivos. Para el nombre de pila ya conoces ${zh("你叫什么名字", "nǐ jiào shénme míngzi")}.</p>
      <h3>${zh("男", "nán")} y ${zh("女", "nǚ")} delante de la palabra</h3>
      <p>Según Míchigan, ${zh("男", "nán")} es «masculino» y ${zh("女", "nǚ")} «femenino», y van delante de la palabra de persona: la fuente trae ${zh("女孩子", "nǚháizi")}, «niña», y ${zh("男孩", "nánhái")}, «chico». Las dos formas se oyen; la lección usa las del sílabo, con ${zh("儿", "ér")}. ${zh("男同学", "nán tóngxué")} y ${zh("女同学", "nǚ tóngxué")} son compuestos nuestros, de la lección.</p>
      ${cuadro(['Palabra', `Con ${zh("男", "nán")}`, `Con ${zh("女", "nǚ")}`], [
        [zh("孩儿", "háir"), zh("男孩儿", "nánháir"), zh("女孩儿", "nǚháir")],
        [zh("朋友", "péngyou"), zh("男朋友", "nánpéngyou"), zh("女朋友", "nǚpéngyou")],
        [zh("同学", "tóngxué"), zh("男同学", "nán tóngxué"), zh("女同学", "nǚ tóngxué")],
      ])}
      <p>Ojo: ${zh("朋友", "péngyou")} solo es «amigo»; con ${zh("男", "nán")} o ${zh("女", "nǚ")} delante pasa a ser «novio» o «novia», como en la frase de Kapiolani ${zh("这是我女朋友", "zhè shì wǒ nǚpéngyou")}.</p>
      <h3>La familia: abuelos, esposos e hijos</h3>
      <p>Míchigan explica que ${zh("爷爷", "yéye")} y ${zh("奶奶", "nǎinai")} son los abuelos del lado del papá. Mira el árbol; los rótulos están en pinyin y en español.</p>
      ${ARBOL}
      <p>En ese árbol, ${zh("妈妈", "māma")} es la ${zh("妻子", "qīzi")} de ${zh("爸爸", "bàba")}, y ${zh("爸爸", "bàba")} es el ${zh("丈夫", "zhàngfu")} de ${zh("妈妈", "māma")}. Las glosas «esposo» y «esposa» son nuestras y la lección no recoge más reglas de esas dos palabras. Para presentar: ${zh("这是我爷爷，那是我奶奶", "zhè shì wǒ yéye, nà shì wǒ nǎinai")}.</p>
      <p class="nota"><strong>Trampa común:</strong> poner el nombre de pila antes del apellido, como en español. En chino se dice primero el apellido.</p>`,
    ejemplo: `
      <p>Ana presenta a su familia a un maestro invitado. Seguimos la conversación.</p>
      <ol class="pasos-ej">
        <li>El maestro pregunta con cortesía: ${zh("您贵姓", "nín guì xìng")}. Es la forma formal.</li>
        <li>Ana pregunta lo mismo a una compañera, pero con confianza: ${zh("你姓什么", "nǐ xìng shénme")}. La compañera responde ${zh("我姓…", "wǒ xìng …")} y dice su apellido.</li>
        <li>Ana enseña el árbol familiar y dice: ${zh("这是我爷爷，那是我奶奶", "zhè shì wǒ yéye, nà shì wǒ nǎinai")}. ${zh("爷爷", "yéye")} y ${zh("奶奶", "nǎinai")} son los abuelos del lado de su papá.</li>
        <li>Señala a la hermana: ${zh("那个女孩儿是我妹妹", "nàge nǚháir shì wǒ mèimei")}. ${zh("女", "nǚ")} va delante de ${zh("孩儿", "háir")}.</li>
        <li>Y al hermano: ${zh("这个男孩儿是我哥哥", "zhège nánháir shì wǒ gēge")}.</li>
      </ol>
      <p>Comprueba: ${zh("姓", "xìng")} va entre el sujeto y el apellido, y ${zh("男", "nán")} y ${zh("女", "nǚ")} delante de la palabra de persona. Resultado: <span class="resultado">${zh("这是我爷爷，那是我奶奶", "zhè shì wǒ yéye, nà shì wǒ nǎinai")} = «este es mi abuelo y aquella es mi abuela»</span>.</p>`,
    vidaReal: `
      <p>Estas palabras sirven más de lo que parece:</p>
      <ul>
        <li>Leer una lista de clase china y saber que el primer nombre que aparece es el apellido.</li>
        <li>Presentarte en una videollamada con alguien de China diciendo tu apellido.</li>
        <li>Enseñar la foto de tu familia y nombrar a tus abuelos.</li>
        <li>Entender cuándo alguien habla de su abuelo o abuela del lado del papá.</li>
        <li>Preguntar con cortesía a un adulto cuál es su apellido, usando la forma formal.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Te preguntan ${zh("你姓什么", "nǐ xìng shénme")}. ¿Qué respuesta contesta la pregunta?</p>`,
        opciones: [zh('我是中国人', 'wǒ shì Zhōngguó rén'), zh('我在学校', 'wǒ zài xuéxiào'), zh('我姓…', 'wǒ xìng …'), zh('我十岁', 'wǒ shí suì')], correcta: 2,
        pista: '<p>Se pregunta por el apellido y ' + zh("姓", "xìng") + ' es el verbo de la respuesta.</p>',
        solucion: `<p>${zh("我姓…", "wǒ xìng …")} dice el apellido. Las otras dicen nacionalidad, lugar o edad.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «este es mi abuelo».</p>',
        respuesta: ['这', '是', '我', '爷爷'], pinyin: ['zhè', 'shì', 'wǒ', 'yéye'], lang: 'zh-Hans',
        pista: '<p>' + zh("这", "zhè") + ' abre la frase y el pariente va al final.</p>',
        solucion: `<p>${zh("这是我爷爷", "zhè shì wǒ yéye")}: «este es mi abuelo».</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «aquella niña es mi hermana menor».</p>',
        respuesta: ['那个', '女孩儿', '是', '我', '妹妹'], pinyin: ['nàge', 'nǚháir', 'shì', 'wǒ', 'mèimei'], lang: 'zh-Hans',
        pista: '<p>' + zh("那个", "nàge") + ' va antes de la palabra de persona.</p>',
        solucion: `<p>${zh("那个女孩儿是我妹妹", "nàge nǚháir shì wǒ mèimei")}: ${zh("那个", "nàge")}, ${zh("女孩儿", "nǚháir")}, ${zh("是", "shì")} y quién es.</p>` },
      { tipo: 'opciones', escucha: { voz: '您贵姓' },
        sinAudio: '<p>Se dice <strong>nín guì xìng</strong>: nín sube; guì y xìng caen.</p>',
        enunciado: '<p>Escucha la pregunta. ¿Qué te preguntan?</p>',
        opciones: ['La edad', 'Dónde vives', 'Cómo se llama tu abuela', 'El apellido, con cortesía'], correcta: 3,
        pista: '<p>Fíjate en la última palabra: es una de las nuevas de esta lección.</p>',
        solucion: `<p>Se oye ${zh("您贵姓", "nín guì xìng")}: la forma cortés de preguntar el apellido.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("爷爷", "yéye")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['yé ye', 'yéye'],
        pista: '<p>La primera sílaba sube; la segunda es breve y sin tono.</p>',
        solucion: `<p>${zh("爷爷", "yéye")}: <strong>yé ye</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>¿Qué significa ${zh("奶奶", "nǎinai")} en español? Escribe una palabra.</p>`,
        respuestas: ['abuela', 'la abuela', 'abuela paterna', 'abuela del lado del padre', 'abuela por parte del padre', 'abuelita'],
        pista: '<p>Es la mamá de tu papá.</p>',
        solucion: `<p>${zh("奶奶", "nǎinai")} es la abuela del lado del papá.</p>` },
    ],
    fuentes: [SILABO, KAP_XING, MSU_NOMBRES, MSU_FOTO, KAP_DE, KAP_NOMBRE],
  });

  // ------------------------------------------------------------------
  // Texto de la lección 8: tres bloques, cada oración con su pinyin.
  const parrafo = (oraciones) => `<p>${oraciones.map(([h, py]) => zh(h, py)).join(' ')}</p>`;
  const MANANA = [
    ['早上七点，我起床了。', 'zǎoshang qī diǎn, wǒ qǐchuáng le.'], ['我家有三间房间。', 'wǒ jiā yǒu sān jiān fángjiān.'],
    ['我去洗手间，妈妈正在做饭。', 'wǒ qù xǐshǒujiān, māma zhèngzài zuò fàn.'], ['我吃了早饭，有面包和牛奶。', 'wǒ chī le zǎofàn, yǒu miànbāo hé niúnǎi.'],
    ['八点，我去学校。', 'bā diǎn, wǒ qù xuéxiào.'],
  ];
  const TARDE = [
    ['中午，我们在学校吃午饭。', 'zhōngwǔ, wǒmen zài xuéxiào chī wǔfàn.'], ['下午上课，今天学校来了一名新老师。', 'xiàwǔ shàngkè, jīntiān xuéxiào lái le yì míng xīn lǎoshī.'],
    ['老师给我们一些本子和笔，这些小朋友都很高兴。', 'lǎoshī gěi wǒmen yìxiē běnzi hé bǐ, zhèxiē xiǎopéngyǒu dōu hěn gāoxìng.'], ['下课了，我和同学去跑步。', 'xiàkè le, wǒ hé tóngxué qù pǎobù.'],
  ];
  const NOCHE = [
    ['晚上六点，爸爸下班了，我们一家人去饭馆吃晚饭。', 'wǎnshang liù diǎn, bàba xiàbān le, wǒmen yì jiārén qù fànguǎn chī wǎnfàn.'], ['爷爷和奶奶也来了。', 'yéye hé nǎinai yě lái le.'],
    ['饭馆里人很多，有的人吃面条儿，有的人吃米饭。', 'fànguǎn lǐ rén hěn duō, yǒude rén chī miàntiáor, yǒude rén chī mǐfàn.'], ['我们回家了。', 'wǒmen huí jiā le.'],
    ['弟弟是小孩儿，八点就睡觉了。', 'dìdi shì xiǎoháir, bā diǎn jiù shuìjiào le.'], ['我九点睡觉。', 'wǒ jiǔ diǎn shuìjiào.'],
  ];

  L('Un día completo: repaso de HSK 2', {
    objetivo: `Leer un texto corto de un día entero identificando quién, cuándo y dónde, aprender las últimas palabras de la lista (${zh("间", "jiān")}, ${zh("名", "míng")}, ${zh("些", "xiē")}, ${zh("正", "zhèng")}…) y repasar lo que ya sabes de HSK 2.`,
    explicacion: `
      <p>Esta es la última lección de HSK 2. En vez de un tema nuevo, juntamos lo aprendido en un texto de un día completo. Primero, las trece palabras que faltaban. De ${zh("游", "yóu")}, ${zh("时", "shí")}, ${zh("过", "guò")}, ${zh("本子", "běnzi")} y ${zh("笔", "bǐ")} solo vemos la tabla: la ficha tiene su línea del sílabo, pero ningún dato de uso, así que la lección no les inventa reglas. Las frases de ejemplo de la lección son nuestras. Y ${zh("过", "guò")} no es ${zh("过", "guo")}, la partícula de experiencia.</p>
      ${tabla([
        ['本子', 'běnzi', 'cuaderno'], ['笔', 'bǐ', 'pluma, lápiz'], ['间', 'jiān', 'clasificador de cuartos'], ['洗手间', 'xǐshǒujiān', 'baño'],
        ['名', 'míng', 'clasificador de personas (formal)'], ['些', 'xiē', 'unos cuantos, varios'], ['小孩儿', 'xiǎoháir', 'niño pequeño'], ['小朋友', 'xiǎopéngyǒu', 'niño, niña (trato cariñoso)'],
        ['过', 'guò', 'pasar'], ['游', 'yóu', 'nadar'], ['时', 'shí', 'tiempo, momento'], ['正', 'zhèng', 'justo, en curso'],
        ['下班', 'xiàbān', 'salir del trabajo'],
      ])}
      <h3>Cómo leer un párrafo</h3>
      <p>Para entender un texto, primero busca <em>quién</em>, <em>cuándo</em> y <em>dónde</em>. Después mira <em>qué pasa</em>, en orden. Aquí tienes el día de un niño en tres bloques.</p>
      <p><strong>Mañana</strong></p>
      ${parrafo(MANANA)}
      <p><strong>Tarde</strong></p>
      ${parrafo(TARDE)}
      <p><strong>Noche</strong></p>
      ${parrafo(NOCHE)}
      <h3>Las últimas palabras en el texto</h3>
      <p>Según una lista de clasificadores de la Saint John’s University, ${zh("间", "jiān")} cuenta cuartos: ${zh("三间房间", "sān jiān fángjiān")}. Esa lista dice que ${zh("名", "míng")} es para personas de rango alto, como médicos; Wikipedia, como apoyo, añade que en situaciones formales sirve para cualquier persona. Como simplificación de la lección, ${zh("一名新老师", "yī míng xīn lǎoshī")} suena formal. ${zh("位", "wèi")}, en cambio, es para personas con respeto, según ChinGram.</p>
      <p>${zh("些", "xiē")} hace plural a ${zh("这", "zhè")} y ${zh("那", "nà")}: ${zh("这些", "zhèxiē")}, ${zh("那些", "nàxiē")}. En una frase de Kapiolani, ${zh("一些", "yìxiē")} se traduce «unos, algunos». Como simplificación de la lección, ${zh("小孩儿", "xiǎoháir")} y ${zh("小朋友", "xiǎopéngyǒu")} llevan ${zh("小", "xiǎo")}, «pequeño», y ${zh("小朋友", "xiǎopéngyǒu")} suena cariñoso. ${zh("洗手间", "xǐshǒujiān")} aparece en la fuente como ${zh("你去洗手间吗", "nǐ qù xǐshǒujiān ma")}. Como ya conoces ${zh("上班", "shàngbān")}, ${zh("下班", "xiàbān")} es «salir del trabajo»: ${zh("爸爸下班了", "bàba xiàbān le")}. Y ${zh("正", "zhèng")} se une a ${zh("在", "zài")}: ${zh("正在", "zhèngzài")} marca la acción que ocurre ahora.</p>
      <h3>La gramática de HSK 2 que aparece</h3>
      ${cuadro(['Gramática', 'En el texto', 'Qué expresa'], [
        [zh("正在", "zhèngzài"), zh("妈妈正在做饭", "māma zhèngzài zuò fàn"), 'acción en curso'],
        [zh("了", "le"), zh("我起床了", "wǒ qǐchuáng le"), 'algo ya ocurrió'],
        [zh("有的…有的…", "yǒude … yǒude …"), zh("有的人吃面条儿，有的人吃米饭", "yǒude rén chī miàntiáor, yǒude rén chī mǐfàn"), 'unos… otros…'],
        [zh("给", "gěi"), zh("老师给我们本子", "lǎoshī gěi wǒmen běnzi"), 'a quién se da'],
        [zh("就", "jiù"), zh("八点就睡觉了", "bā diǎn jiù shuìjiào le"), 'ya, tan temprano'],
      ])}
      <h3>Lo que ya sabes hacer</h3>
      <p>Con HSK 2 ya puedes saludar, presentarte, preguntar precios, pedir y dar direcciones, hablar del clima, de la salud y de tus aficiones, llamar por teléfono, hablar de tu familia y leer un texto corto como este. Un aviso honesto: tres palabras de nivel 2 no tuvieron tabla propia. Son ${zh("地", "de")} (línea 333 del sílabo), ${zh("点", "diǎn")} con el sentido «un poco» (línea 336) y ${zh("面", "miàn")} (línea 403).</p>
      <p class="nota"><strong>Trampa común:</strong> leer cada palabra por separado. Lee la oración entera y pregúntate quién hace qué.</p>`,
    ejemplo: `
      <p>Leemos juntos el primer bloque, la mañana, paso a paso.</p>
      <ol class="pasos-ej">
        <li>Quién: el narrador, ${zh("我", "wǒ")}, y su ${zh("妈妈", "māma")}.</li>
        <li>Cuándo: ${zh("早上七点", "zǎoshang qī diǎn")}, y más tarde ${zh("八点", "bā diǎn")}.</li>
        <li>Dónde: en casa, que tiene ${zh("三间房间", "sān jiān fángjiān")}, y después en ${zh("学校", "xuéxiào")}.</li>
        <li>Qué pasa: se levanta (${zh("起床了", "qǐchuáng le")}), va al baño (${zh("去洗手间", "qù xǐshǒujiān")}) y come (${zh("吃了早饭", "chī le zǎofàn")}). Mientras tanto, ${zh("妈妈正在做饭", "māma zhèngzài zuò fàn")}: ${zh("正在", "zhèngzài")} indica que la acción está en curso.</li>
        <li>Al final: ${zh("八点，我去学校", "bā diǎn, wǒ qù xuéxiào")}. Aquí la hora va antes de quien hace la acción; lo más común es que vaya justo después del sujeto, antes del verbo. Con ${zh("去", "qù")}, el lugar al que va aparece después del verbo.</li>
      </ol>
      <p>Comprueba: cada oración responde a quién, cuándo, dónde o qué pasa. Resultado: <span class="resultado">el niño se levanta a las 7, desayuna pan con leche y a las 8 va a la escuela</span>.</p>`,
    vidaReal: `
      <p>Saber leer un párrafo corto te sirve fuera de la clase:</p>
      <ul>
        <li>Entender el mensaje de un amigo que te cuenta cómo fue su día.</li>
        <li>Seguir un horario o una agenda escritos en chino, buscando primero las horas.</li>
        <li>Leer un cartel o un aviso largo sacando primero quién, cuándo y dónde.</li>
        <li>Practicar con textos sencillos antes de pasar a HSK 3.</li>
        <li>Contarle a un familiar, en pocas frases, qué hiciste en la mañana, en la tarde y en la noche.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Lee el bloque de la mañana. ¿Qué hace la mamá del niño?</p>${parrafo(MANANA)}`,
        opciones: ['Se levanta a las siete', 'Lleva al niño a la escuela', 'Está preparando la comida', 'Va al baño'], correcta: 2,
        pista: '<p>Busca la palabra que marca una acción en curso.</p>',
        solucion: `<p>${zh("妈妈正在做饭", "māma zhèngzài zuò fàn")}: ${zh("正在", "zhèngzài")} marca que ocurre ahora, y ${zh("做饭", "zuò fàn")} es cocinar.</p>` },
      { tipo: 'opciones', enunciado: `<p>Lee el bloque de la tarde. ¿Qué les da el nuevo maestro?</p>${parrafo(TARDE)}`,
        opciones: ['Pan y leche', 'Cuadernos y plumas', 'Entradas', 'Relojes'], correcta: 1,
        pista: '<p>Busca la oración con ' + zh("给", "gěi") + '.</p>',
        solucion: `<p>${zh("老师给我们一些本子和笔", "lǎoshī gěi wǒmen yìxiē běnzi hé bǐ")}: ${zh("本子", "běnzi")} son cuadernos y ${zh("笔", "bǐ")} plumas o lápices.</p>` },
      { tipo: 'opciones', enunciado: `<p>Lee el bloque de la noche. ¿Qué hace el hermano a las ocho?</p>${parrafo(NOCHE)}`,
        opciones: ['Cena en el restaurante', 'Va a la escuela', 'Corre con sus compañeros', 'Se duerme'], correcta: 3,
        pista: '<p>Busca ' + zh("八点", "bā diǎn") + ' y la palabra que sigue.</p>',
        solucion: `<p>${zh("弟弟是小孩儿，八点就睡觉了", "dìdi shì xiǎoháir, bā diǎn jiù shuìjiào le")}: el hermano pequeño se duerme a las 8.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «mamá está cocinando».</p>',
        respuesta: ['妈妈', '正在', '做饭'], pinyin: ['māma', 'zhèngzài', 'zuò fàn'], lang: 'zh-Hans',
        pista: '<p>' + zh("正在", "zhèngzài") + ' va antes del verbo.</p>',
        solucion: `<p>${zh("妈妈正在做饭", "māma zhèngzài zuò fàn")}: quién, ${zh("正在", "zhèngzài")} y la acción.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «todos estos niños están muy contentos».</p>',
        respuesta: ['这些', '小朋友', '都', '很', '高兴'], pinyin: ['zhèxiē', 'xiǎopéngyǒu', 'dōu', 'hěn', 'gāoxìng'], lang: 'zh-Hans',
        pista: '<p>' + zh("这些", "zhèxiē") + ' abre la frase; ' + zh("都", "dōu") + ' va antes de ' + zh("很", "hěn") + '.</p>',
        solucion: `<p>${zh("这些小朋友都很高兴", "zhèxiē xiǎopéngyǒu dōu hěn gāoxìng")}: sujeto, ${zh("都", "dōu")}, ${zh("很", "hěn")} y adjetivo.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("洗手间", "xǐshǒujiān")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['xǐ shǒu jiān'],
        pista: '<p>Las dos primeras sílabas bajan y suben; la última es alta y plana.</p>',
        solucion: `<p>${zh("洗手间", "xǐshǒujiān")}: <strong>xǐ shǒu jiān</strong>.</p>` },
    ],
    fuentes: [SILABO, SJU, WIKI_CLAS, CHIN_MW, CHIN_ESTE, KAP_DIR, KAP_QU, CHIN_ZAI_PROG],
  });
})();
