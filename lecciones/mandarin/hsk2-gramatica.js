// Mandarín · Unidad 5: HSK 2 · Gramática.
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

  const SILABO = { nombre: 'Centro de Educación y Cooperación Lingüística (China), «HSK 考试大纲», sílabo del HSK 3.0 (2025)', url: 'https://hsk.cn-bj.ufileos.com/3.0/新版HSK考试大纲1219.pdf' };
  // Página de ChinGram: `ruta` es lo que sigue a /grammar/ en la URL de la ficha.
  const CHINGRAM = (ruta, nombre) => ({ nombre: `Universidad Palacký de Olomouc (Chequia) y socios, ChinGram: ${nombre} (en inglés)`, url: `https://chingram.upol.cz/grammar/${ruta}` });
  const CHIN_GUO = CHINGRAM('aspectual-particle-guo-%e8%bf%87', 'Aspectual particle guo 过/過');
  const CHIN_GUO_LE = CHINGRAM('comparison-aspectual-particles-guo-%e8%bf%87-and-le-%e4%ba%86-1', 'Comparison between the aspectual particles guo 过/過 and le 了1');
  const CHIN_ZHE = CHINGRAM('aspectual-particle-zhe-%e7%9d%80', 'Aspectual particle zhe 着/著');
  const CHIN_ZAI = CHINGRAM('the-progressive-marker-zai-%e5%9c%a8', 'Progressive aspect marker zài 在');
  const CHIN_BI = CHINGRAM('unequal-comparisons-the-comparative-preposition-bi-%e6%af%94-to-compare-with-to', 'Unequal comparisons: the comparative preposition bǐ 比');
  const CHIN_MEIYOU = CHINGRAM('comparison-with-mei-you-%e6%b2%a1%e6%9c%89-%e6%b2%92%e6%9c%89-not-as-as', 'Comparison with méi yǒu 没有/沒有 not as… as');
  const CHIN_ZUI = CHINGRAM('degree-adverb-zui-%e6%9c%80-the-most', 'Degree adverb zuì 最 the most');
  const CHIN_HAISHI = CHINGRAM('conjunction-haishi-%e8%bf%98%e6%98%af-or', 'Conjunction háishi 还是/還是 ‘or’');
  const CHIN_HUOZHE = CHINGRAM('comparison-conjunctions-huozhe-%e6%88%96%e8%80%85-and-haishi-%e8%bf%98%e6%98%af-or', 'Comparison between the conjunctions huòzhě 或者 and háishi 还是/還是 ‘or’');

  // ------------------------------------------------------------------
  L('Experiencias: 过', {
    objetivo: `Decir que ya viviste algo con ${zh("过", "guo")}, negarlo con ${zh("没", "méi")} y no confundirlo con ${zh("了", "le")}.`,
    explicacion: `
      <p>«¿Has estado en otro país?» «¿Has probado el pescado?» Para contar o preguntar lo que has vivido, el chino usa una palabrita pegada al verbo. Primero, las doce palabras de la lección. La voz de tu dispositivo puede sonar distinta de un hablante nativo; si dudas, manda el pinyin.</p>
      ${tabla([
        ['过', 'guo', 'marca que viviste la acción'], ['次', 'cì', 'vez (para contar veces)'], ['旅游', 'lǚyóu', 'viajar de turismo'], ['出国', 'chūguó', 'salir del país'],
        ['外国', 'wàiguó', 'país extranjero'], ['机场', 'jīchǎng', 'aeropuerto'], ['机票', 'jīpiào', 'boleto de avión'], ['酒店', 'jiǔdiàn', 'hotel'],
        ['咖啡', 'kāfēi', 'café'], ['肉', 'ròu', 'carne'], ['鱼', 'yú', 'pescado'], ['已经', 'yǐjīng', 'ya'],
      ])}
      <h3>¿Cómo digo que ya lo viví?</h3>
      <p>Se pone ${zh("过", "guo")} justo después del verbo. Según ChinGram, de la Universidad Palacký, ${zh("过", "guo")} siempre sigue al verbo e indica que una acción se vivió al menos una vez en el pasado. A eso lo llamamos una <strong>experiencia</strong>. Las frases de ejemplo de la lección son nuestras.</p>
      <p>El molde es: quien lo vivió, el verbo, ${zh("过", "guo")} y lo demás. ${zh("我喝过咖啡", "wǒ hē guo kāfēi")} es «he tomado café». Para contar cuántas veces se usa ${zh("次", "cì")} detrás del número: ${zh("她去过中国两次", "tā qù guo Zhōngguó liǎng cì")}, «ha estado en China dos veces». Con ${zh("已经", "yǐjīng")}, «ya», antes del verbo: ${zh("我已经去过外国", "wǒ yǐjīng qù guo wàiguó")}, «ya he estado en el extranjero».</p>
      <p>Fíjate en que la frase no dice cuándo pasó, solo que pasó alguna vez. Es una simplificación de la lección, y en español «he tomado café» tampoco lo dice. Las demás palabras de viaje se combinan igual que en español: ${zh("我想出国旅游", "wǒ xiǎng chūguó lǚyóu")}, «quiero viajar al extranjero», ${zh("我买了机票", "wǒ mǎi le jīpiào")}, «compré el boleto de avión», y ${zh("酒店在机场前边", "jiǔdiàn zài jīchǎng qiánbiān")}, «el hotel está delante del aeropuerto».</p>
      <h3>¿En qué se diferencia de ${zh("了", "le")}?</h3>
      <p>${zh("了", "le")} ya la conoces de "Acción terminada: ${zh("了")}". Según ChinGram, ${zh("过", "guo")} aparece en frases que dicen que viviste una acción al menos una vez, y ${zh("了", "le")} en frases que dicen que la acción ocurrió o se completó. Mira el mismo par de frases:</p>
      ${cuadro(['Frase', 'Qué dice'], [
        [zh("她去过中国两次", "tā qù guo Zhōngguó liǎng cì"), '«ha estado en China dos veces»: una experiencia suya'],
        [zh("她去了中国两次", "tā qù le Zhōngguó liǎng cì"), '«fue a China dos veces»: la acción ocurrió'],
      ])}
      <h3>¿Y si nunca lo viví?</h3>
      <p>Se pone ${zh("没", "méi")} antes del verbo, y ${zh("过", "guo")} se queda. ChinGram explica que, como ${zh("过", "guo")} habla de algo ya vivido, se niega con ${zh("没", "méi")} (o ${zh("没有", "méiyǒu")} para dar más fuerza), y la respuesta negativa es ${zh("没", "méi")} más verbo más ${zh("过", "guo")}: ${zh("我没去过", "wǒ méi qù guo")}, «nunca he ido».</p>
      <p class="nota"><strong>Trampa común:</strong> quitar ${zh("过", "guo")} al negar. El molde de la fuente es ${zh("没", "méi")} + verbo + ${zh("过", "guo")}: ${zh("我没吃过鱼", "wǒ méi chī guo yú")}, «nunca he comido pescado».</p>
      <h3>¿Y si pregunto?</h3>
      <p>Se añade ${zh("吗", "ma")} al final, como en "Preguntas con ${zh("吗")}": ${zh("你吃过肉吗", "nǐ chī guo ròu ma")}, «¿has comido carne?». Se responde con el verbo y ${zh("过", "guo")}, ${zh("吃过", "chī guo")}, o con ${zh("没吃过", "méi chī guo")}.</p>`,
    ejemplo: `
      <p>Ana y Luis hablan de viajes. Seguimos la conversación paso a paso.</p>
      <ol class="pasos-ej">
        <li>Luis pregunta: ${zh("你去过中国吗", "nǐ qù guo Zhōngguó ma")}. Pone ${zh("过", "guo")} detrás de ${zh("去", "qù")} porque quiere saber si Ana lo ha vivido alguna vez.</li>
        <li>Ana responde: ${zh("我去过两次", "wǒ qù guo liǎng cì")}. No repite «China»; ${zh("两次", "liǎng cì")} cuenta las veces y va al final.</li>
        <li>Luis sigue: ${zh("你吃过鱼吗", "nǐ chī guo yú ma")}. Ana contesta: ${zh("我没吃过鱼", "wǒ méi chī guo yú")}. Pone ${zh("没", "méi")} antes del verbo y deja ${zh("过", "guo")}.</li>
        <li>Ana añade lo que sí vivió: ${zh("我吃过肉", "wǒ chī guo ròu")}.</li>
      </ol>
      <p>Comprueba: cada frase tiene un verbo seguido de ${zh("过", "guo")}, y la negativa lleva ${zh("没", "méi")} delante. Resultado: <span class="resultado">${zh("我没吃过鱼", "wǒ méi chī guo yú")} = «nunca he comido pescado»</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que ${zh("过", "guo")} y ${zh("了", "le")} son lo mismo. ${zh("她去过中国两次", "tā qù guo Zhōngguó liǎng cì")} cuenta lo que ella ha vivido; ${zh("她去了中国两次", "tā qù le Zhōngguó liǎng cì")} cuenta que fue dos veces.</p>`,
    vidaReal: `
      <p>Hablar de lo que ya has vivido sirve mucho:</p>
      <ul>
        <li>Contarle a una amiga a qué países has viajado y cuántas veces has ido a cada uno durante tus vacaciones.</li>
        <li>Preguntarle a un compañero si ya probó el pescado o el café.</li>
        <li>Contestar con honestidad cuando nunca has hecho algo que te preguntan.</li>
        <li>Entender una charla de viajes sin confundir «he ido alguna vez» con «fui ayer».</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «¿has estado en China?».</p>',
        respuesta: ['你', '去', '过', '中国', '吗'], pinyin: ['nǐ', 'qù', 'guo', 'Zhōngguó', 'ma'], lang: 'zh-Hans',
        pista: '<p>' + zh("过", "guo") + ' va justo después del verbo y la pregunta termina con ' + zh("吗", "ma") + '.</p>',
        solucion: `<p>${zh("你去过中国吗", "nǐ qù guo Zhōngguó ma")}: verbo, ${zh("过", "guo")}, lugar y ${zh("吗", "ma")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «ella ha estado en China dos veces».</p>',
        respuesta: ['她', '去', '过', '中国', '两次'], alternativas: [['她', '去', '过', '两次', '中国']], pinyin: ['tā', 'qù', 'guo', 'Zhōngguó', 'liǎng cì'], lang: 'zh-Hans',
        pista: '<p>Las veces van al final de la frase.</p>',
        solucion: `<p>${zh("她去过中国两次", "tā qù guo Zhōngguó liǎng cì")}: ${zh("两次", "liǎng cì")} cierra la frase.</p>` },
      { tipo: 'opciones', enunciado: '<p>Elige la frase correcta para «nunca he comido pescado».</p>',
        opciones: [zh('我吃没过鱼', 'wǒ chī méi guo yú'), zh('我没过吃鱼', 'wǒ méi guo chī yú'), zh('我没吃过鱼', 'wǒ méi chī guo yú'), zh('我没吃鱼过', 'wǒ méi chī yú guo')], correcta: 2,
        pista: '<p>' + zh("没", "méi") + ' va antes del verbo y ' + zh("过", "guo") + ' se queda pegada a él.</p>',
        solucion: `<p>${zh("我没吃过鱼", "wǒ méi chī guo yú")}: ${zh("没", "méi")} + verbo + ${zh("过", "guo")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Te preguntan ${zh("你去过中国吗", "nǐ qù guo Zhōngguó ma")} y quieres decir «no, nunca he estado». ¿Cuál eliges?</p>`,
        opciones: [zh('我没去了', 'wǒ méi qù le'), zh('我不去过', 'wǒ bù qù guo'), zh('我去没过', 'wǒ qù méi guo'), zh('我没去过', 'wǒ méi qù guo')], correcta: 3,
        pista: '<p>Para negar algo vivido se usa ' + zh("没", "méi") + ', no ' + zh("不", "bù") + '.</p>',
        solucion: `<p>${zh("我没去过", "wǒ méi qù guo")}: es el molde ${zh("没", "méi")} + verbo + ${zh("过", "guo")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '我吃过鱼' },
        sinAudio: '<p>Se dice <strong>wǒ chī guo yú</strong>: wǒ baja y sube; chī empieza alto y se mantiene; guo es breve y sin tono; yú sube.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice?</p>',
        opciones: ['No he comido pescado', 'He comido pescado alguna vez', '¿Has comido pescado?', 'Quiero comer pescado'], correcta: 1,
        pista: '<p>Fíjate en si oyes ' + zh("没", "méi") + ' o ' + zh("吗", "ma") + '.</p>',
        solucion: `<p>Se oye ${zh("我吃过鱼", "wǒ chī guo yú")}: hay ${zh("过", "guo")} y no hay ${zh("没", "méi")} ni ${zh("吗", "ma")}.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("机场", "jīchǎng")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['jī chǎng'],
        pista: '<p>La primera sílaba es alta y plana; la segunda baja y sube.</p>',
        solucion: `<p>${zh("机场", "jīchǎng")}: <strong>jī chǎng</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_GUO, CHIN_GUO_LE],
  });

  // ------------------------------------------------------------------
  L('Un estado que sigue: 着', {
    objetivo: `Describir cómo se quedó algo o alguien con ${zh("着", "zhe")} tras el verbo, y distinguirlo de ${zh("在", "zài")} + verbo.`,
    explicacion: `
      <p>Imagina una foto de tu cuarto: la puerta está abierta, hay una mochila sobre la cama y tu hermano está de pie. Nada se mueve; todo se quedó así. Para describir esa foto el chino también usa una palabrita pegada al verbo. Primero, las doce palabras de la lección. La voz de tu dispositivo puede sonar distinta de un hablante nativo; si dudas, manda el pinyin.</p>
      ${tabla([
        ['着', 'zhe', 'marca un estado que sigue'], ['门', 'mén', 'puerta'], ['开', 'kāi', 'abrir'], ['站', 'zhàn', 'estar de pie'],
        ['拿', 'ná', 'tomar, llevar en la mano'], ['穿', 'chuān', 'ponerse, llevar puesta (ropa)'], ['笑', 'xiào', 'reír, sonreír'], ['等', 'děng', 'esperar'],
        ['床', 'chuáng', 'cama'], ['手', 'shǒu', 'mano'], ['书包', 'shūbāo', 'mochila'], ['裤子', 'kùzi', 'pantalón'],
      ])}
      <h3>¿Cómo digo cómo se quedó algo?</h3>
      <p>Se pone ${zh("着", "zhe")} después del verbo. Según ChinGram, ${zh("着", "zhe")} sigue al verbo y describe un <strong>estado</strong> persistente que resulta de la acción: la acción ya pasó y lo que queda es el resultado. Por eso ${zh("门开着", "mén kāi zhe")} es «la puerta está abierta», no «alguien la está abriendo». Las frases de ejemplo de la lección son nuestras.</p>
      ${G({
        x: [0, 10], y: [-1, 5], ejes: false,
        descripcion: 'Dibujo de un cuarto visto de frente. A la izquierda, una puerta con la hoja abierta, dibujada en diagonal. A la derecha, una persona de pie, hecha de líneas, con una mochila en la mano. Bajo cada cosa hay una etiqueta con la frase en pinyin.',
        figuras: [
          lin([0, 0], [10, 0]),
          lin([1, 0], [1, 4]), lin([3, 0], [3, 4]), lin([1, 4], [3, 4]), lin([1, 4], [0.3, 3.4]), lin([0.3, 3.4], [0.3, 0.2]), lin([0.3, 0.2], [1, 0]),
          txt(1.8, -0.6, 'mén kāi zhe'),
          caja(7, 1.5, 8, 3), lin([7.5, 3], [7.5, 3.6]), lin([7.2, 1.5], [7.2, 0]), lin([7.8, 1.5], [7.8, 0]), lin([8, 2.6], [8.6, 2]), caja(8.4, 1.4, 9.2, 2),
          txt(7.9, -0.6, 'tā zhàn zhe'),
        ],
      })}
      <p>Verbos como ${zh("站", "zhàn")}, ${zh("拿", "ná")}, ${zh("穿", "chuān")} y ${zh("开", "kāi")} funcionan así. ChinGram dice que ${zh("站", "zhàn")} y ${zh("拿", "ná")}, entre otros, pasan de acción a estado. ${zh("他站着", "tā zhàn zhe")} es «está de pie». ${zh("她手里拿着书包", "tā shǒu lǐ ná zhe shūbāo")} es «tiene la mochila en la mano». Con la ropa, ${zh("她穿着新衣服", "tā chuān zhe xīn yīfu")} es «lleva ropa nueva puesta», no «se la está poniendo».</p>
      <p>También sirve para decir qué hay en un lugar (lugar + verbo + ${zh("着", "zhe")} + cantidad + persona o cosa): ${zh("床上坐着两个孩子", "chuáng shàng zuò zhe liǎng gè háizi")}, «en la cama hay dos niños sentados».</p>
      <h3>¿En qué se diferencia de ${zh("在", "zài")}?</h3>
      <p>Según ChinGram, ${zh("在", "zài")} es un adverbio que va antes del verbo e indica que la acción está en marcha. Lo viste en "Acción en curso: ${zh("在")} y ${zh("正在")}". ${zh("着", "zhe")} sola, detrás del verbo, describe lo que quedó. Piensa en ${zh("在", "zài")} como un video y en ${zh("着", "zhe")} como una foto (es una imagen de la lección).</p>
      ${cuadro(['Acción en marcha: ' + zh("在", "zài") + ' + verbo', 'Estado que sigue: verbo + ' + zh("着", "zhe")], [
        [zh("他在开门", "tā zài kāi mén") + ' «está abriendo la puerta»', zh("门开着", "mén kāi zhe") + ' «la puerta está abierta»'],
        [zh("他在穿衣服", "tā zài chuān yīfu") + ' «se está poniendo la ropa»', zh("他穿着新裤子", "tā chuān zhe xīn kùzi") + ' «lleva pantalón nuevo»'],
      ])}
      <p>Un aviso: ChinGram añade que ${zh("着", "zhe")} también puede acompañar una acción en marcha, pero entonces va siempre junto a ${zh("在", "zài")}, ${zh("正", "zhèng")} o ${zh("正在", "zhèngzài")}. En esta lección usamos ${zh("着", "zhe")} sola, para estados. Con ${zh("笑", "xiào")} y ${zh("等", "děng")} la acción en marcha se dice con ${zh("在", "zài")}: ${zh("她在笑", "tā zài xiào")}, «está riendo», y ${zh("我在等你", "wǒ zài děng nǐ")}, «te estoy esperando».</p>
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("着", "zhe")} con ${zh("是", "shì")}. ChinGram dice que ${zh("着", "zhe")} no va con verbos que no indican duración. Se dice ${zh("他是老师", "tā shì lǎoshī")}, nunca ${zh("他是着老师", "tā shì zhe lǎoshī")}.</p>`,
    ejemplo: `
      <p>Ana describe a Luis una foto de su cuarto. Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Ve la puerta y dice ${zh("门开着", "mén kāi zhe")}. Pone ${zh("着", "zhe")} detrás de ${zh("开", "kāi")} porque la puerta quedó abierta.</li>
        <li>Luego dice ${zh("床上有书包", "chuáng shàng yǒu shūbāo")}, «hay una mochila en la cama». Aquí no hace falta ${zh("着", "zhe")}.</li>
        <li>Después alguien la toma: ${zh("她手里拿着书包", "tā shǒu lǐ ná zhe shūbāo")}. ${zh("拿", "ná")} pasó de acción a estado y por eso lleva ${zh("着", "zhe")}.</li>
        <li>Por último, contrasta: ${zh("他在穿裤子", "tā zài chuān kùzi")} es que se lo está poniendo; ${zh("他穿着新裤子", "tā chuān zhe xīn kùzi")} es que ya lo lleva puesto.</li>
      </ol>
      <p>Comprueba: cada estado tiene verbo + ${zh("着", "zhe")}, y la acción en marcha lleva ${zh("在", "zài")} delante. Resultado: <span class="resultado">${zh("她手里拿着书包", "tā shǒu lǐ ná zhe shūbāo")} = «tiene la mochila en la mano»</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que ${zh("着", "zhe")} es lo mismo que ${zh("在", "zài")}. Una es la foto del resultado y la otra es la acción pasando.</p>`,
    vidaReal: `
      <p>Describir cómo se queda algo sirve para:</p>
      <ul>
        <li>Describir una foto de tu familia en una reunión: quién está de pie y quién está sentado.</li>
        <li>Avisar a alguien de que una puerta quedó abierta.</li>
        <li>Decir qué ropa lleva puesta una persona que ves a lo lejos.</li>
        <li>Mostrar que tienes algo en la mano mientras hablas con un compañero.</li>
        <li>Contar que alguien sigue esperando afuera, sin moverse de su sitio.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «la puerta está abierta».</p>',
        respuesta: ['门', '开', '着'], pinyin: ['mén', 'kāi', 'zhe'], lang: 'zh-Hans',
        pista: '<p>' + zh("着", "zhe") + ' va pegada al verbo.</p>',
        solucion: `<p>${zh("门开着", "mén kāi zhe")}: ${zh("着", "zhe")} sigue a ${zh("开", "kāi")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «ella tiene la mochila en la mano».</p>',
        respuesta: ['她', '手里', '拿', '着', '书包'], pinyin: ['tā', 'shǒu lǐ', 'ná', 'zhe', 'shūbāo'], lang: 'zh-Hans',
        pista: '<p>El lugar, «en la mano», va antes del verbo.</p>',
        solucion: `<p>${zh("她手里拿着书包", "tā shǒu lǐ ná zhe shūbāo")}: lugar, verbo, ${zh("着", "zhe")} y lo que se tiene.</p>` },
      { tipo: 'opciones', enunciado: '<p>Elige la frase correcta para «lleva ropa nueva puesta».</p>',
        opciones: [zh('他穿着新衣服', 'tā chuān zhe xīn yīfu'), zh('他着穿新衣服', 'tā zhe chuān xīn yīfu'), zh('他穿新着衣服', 'tā chuān xīn zhe yīfu'), zh('着他穿新衣服', 'zhe tā chuān xīn yīfu')], correcta: 0,
        pista: '<p>Busca el verbo y pon ' + zh("着", "zhe") + ' justo detrás.</p>',
        solucion: `<p>${zh("他穿着新衣服", "tā chuān zhe xīn yīfu")}: ${zh("着", "zhe")} va detrás de ${zh("穿", "chuān")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué significa ${zh("他在开门", "tā zài kāi mén")}?</p>`,
        opciones: ['La puerta está abierta y sigue así', 'Ya cerró la puerta', 'Está abriendo la puerta ahora', 'No quiere abrir la puerta'], correcta: 2,
        pista: '<p>' + zh("在", "zài") + ' va antes del verbo y dice que la acción está en marcha.</p>',
        solucion: `<p>${zh("他在开门", "tā zài kāi mén")} es «está abriendo la puerta». Para «la puerta está abierta» se diría ${zh("门开着", "mén kāi zhe")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '他站着' },
        sinAudio: '<p>Se dice <strong>tā zhàn zhe</strong>: tā es alto y plano; zhàn cae; zhe es breve y sin tono.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice?</p>',
        opciones: ['Está sentado', 'Está esperando', 'Está sonriendo', 'Está de pie'], correcta: 3,
        pista: '<p>Fíjate en el verbo que oyes antes de la sílaba breve del final.</p>',
        solucion: `<p>Se oye ${zh("他站着", "tā zhàn zhe")}: ${zh("站", "zhàn")} es «estar de pie» y ${zh("着", "zhe")} dice que sigue así.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("书包", "shūbāo")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['shū bāo'],
        pista: '<p>Las dos sílabas son altas y planas.</p>',
        solucion: `<p>${zh("书包", "shūbāo")}: <strong>shū bāo</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_ZHE, CHIN_ZAI],
  });

  // ------------------------------------------------------------------
  L('Comparar con 比', {
    objetivo: `Comparar dos cosas con ${zh("比", "bǐ")}, decir «no tan… como» con ${zh("没有", "méiyǒu")} y señalar el más… con ${zh("最", "zuì")}.`,
    explicacion: `
      <p>En español comparas con «más… que»: «mi hermano es más alto que yo». En chino no hay una palabra «más»; el trabajo lo hace ${zh("比", "bǐ")}. Primero, las doce palabras de la lección. La voz de tu dispositivo puede sonar distinta de un hablante nativo; si dudas, manda el pinyin.</p>
      ${tabla([
        ['比', 'bǐ', 'comparar con, más que'], ['高', 'gāo', 'alto'], ['长', 'cháng', 'largo'], ['快', 'kuài', 'rápido'],
        ['慢', 'màn', 'lento'], ['近', 'jìn', 'cerca'], ['远', 'yuǎn', 'lejos'], ['累', 'lèi', 'cansado'],
        ['个子', 'gèzi', 'estatura'], ['最', 'zuì', 'el más, lo más'], ['这么', 'zhème', 'tan (así, como esto)'], ['那么', 'nàme', 'tan (así, como eso)'],
      ])}
      <h3>¿Cómo comparo dos cosas?</h3>
      <p>Esta <strong>comparación</strong> tiene tres piezas. Según ChinGram, ${zh("比", "bǐ")} va entre A y B, y el adjetivo, que es la cualidad que se compara, va después de B. La fuente da ${zh("弟弟比哥哥高", "dìdi bǐ gēge gāo")}, «el hermano menor es más alto que el mayor». Nuestro ejemplo: ${zh("哥哥比我高", "gēge bǐ wǒ gāo")}, «mi hermano es más alto que yo». Las frases de ejemplo de la lección son nuestras.</p>
      ${G({
        x: [0, 10], y: [-1, 8], ejes: false,
        descripcion: 'Gráfica de tres barras verticales de distinta altura, de izquierda a derecha: la primera, la más baja, es «yo»; la segunda, de altura media, es el hermano; la tercera, la más alta, es el papá. Bajo cada barra hay su etiqueta.',
        figuras: [
          lin([0, 0], [10, 0]),
          caja(1, 0, 2.5, 5), txt(1.75, -0.6, 'wǒ'),
          caja(4, 0, 5.5, 6), txt(4.75, -0.6, 'gēge'),
          caja(7, 0, 8.5, 7), txt(7.75, -0.6, 'bàba'),
        ],
      })}
      <p>Con ${zh("比", "bǐ")} el adjetivo va solo. ChinGram avisa de que no se usan ${zh("很", "hěn")}, ${zh("非常", "fēicháng")} ni ${zh("太", "tài")} en una frase con ${zh("比", "bǐ")}. Sin comparar, ${zh("很", "hěn")} sí vale: ${zh("我的个子很高", "wǒ de gèzi hěn gāo")}, «soy de estatura alta». Otros ejemplos: ${zh("学校比医院近", "xuéxiào bǐ yīyuàn jìn")}, ${zh("咖啡比茶贵", "kāfēi bǐ chá guì")} y ${zh("我比哥哥累", "wǒ bǐ gēge lèi")}.</p>
      <p>Los demás adjetivos de la tabla se usan igual: ${zh("快", "kuài")} y ${zh("慢", "màn")} para la rapidez, ${zh("近", "jìn")} y ${zh("远", "yuǎn")} para la distancia. ${zh("这个电影比那个长", "zhège diànyǐng bǐ nàge cháng")} es «esta película es más larga que aquella», y ${zh("车比我快", "chē bǐ wǒ kuài")} es «el coche es más rápido que yo».</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("很", "hěn")} antes del adjetivo: ${zh("哥哥比我很高", "gēge bǐ wǒ hěn gāo")}. Lo correcto es ${zh("哥哥比我高", "gēge bǐ wǒ gāo")}.</p>
      <h3>¿Cómo digo «no tan… como»?</h3>
      <p>Se cambia ${zh("比", "bǐ")} por ${zh("没有", "méiyǒu")}. Según ChinGram, A ${zh("没有", "méiyǒu")} B + adjetivo significa «A no es tan… como B», y es lo opuesto de ${zh("比", "bǐ")}: sirve para negar esa comparación. Se suele añadir ${zh("这么", "zhème")} o ${zh("那么", "nàme")}, «tan», delante del adjetivo, lo que da a entender que B ya tiene mucho de esa cualidad. ChinGram los explica como «así, como esto» y «así, como eso»; en esta lección usamos ${zh("那么", "nàme")}. Así, ${zh("我没有哥哥那么高", "wǒ méiyǒu gēge nàme gāo")} es «no soy tan alto como mi hermano».</p>
      <h3>¿Y el más de todos?</h3>
      <p>Para tres o más cosas se usa ${zh("最", "zuì")}, «el más». Según ChinGram, marca el grado más alto de una cualidad, va antes del adjetivo y no admite ${zh("很", "hěn")} ni ${zh("是", "shì")}: ${zh("爸爸最高", "bàba zuì gāo")}, «papá es el más alto».</p>
      ${cuadro(['Molde', 'Ejemplo', 'Sentido'], [
        ['A ' + zh("比", "bǐ") + ' B + adjetivo', zh("哥哥比我高", "gēge bǐ wǒ gāo"), 'mi hermano es más alto que yo'],
        ['A ' + zh("没有", "méiyǒu") + ' B ' + zh("那么", "nàme") + ' + adjetivo', zh("我没有哥哥那么高", "wǒ méiyǒu gēge nàme gāo"), 'no soy tan alto como mi hermano'],
        [zh("最", "zuì") + ' + adjetivo', zh("爸爸最高", "bàba zuì gāo"), 'papá es el más alto'],
      ])}`,
    ejemplo: `
      <p>Ana compara la estatura de su familia. Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Compara a su hermano con ella: ${zh("哥哥比我高", "gēge bǐ wǒ gāo")}. Pone ${zh("比", "bǐ")} entre los dos y ${zh("高", "gāo")} al final, sin ${zh("很", "hěn")}.</li>
        <li>Ahora habla de sí misma: ${zh("我没有哥哥那么高", "wǒ méiyǒu gēge nàme gāo")}. Cambia ${zh("比", "bǐ")} por ${zh("没有", "méiyǒu")} y añade ${zh("那么", "nàme")}.</li>
        <li>Con el papá hay tres personas, así que usa ${zh("最", "zuì")}: ${zh("爸爸最高", "bàba zuì gāo")}.</li>
        <li>Para la escuela dice ${zh("学校比我家远", "xuéxiào bǐ wǒ jiā yuǎn")}, «la escuela está más lejos que mi casa».</li>
      </ol>
      <p>Comprueba: ninguna frase lleva ${zh("很", "hěn")} junto a ${zh("比", "bǐ")} o ${zh("最", "zuì")}. Resultado: <span class="resultado">${zh("爸爸最高", "bàba zuì gāo")} = «papá es el más alto»</span>.</p>
      <p class="nota"><strong>Error común:</strong> traducir «más» palabra por palabra. En chino no hace falta una palabra «más»: ${zh("比", "bǐ")} y el adjetivo ya lo dicen.</p>`,
    vidaReal: `
      <p>Comparar sirve cada día:</p>
      <ul>
        <li>Decir quién de tu familia es más alto y quién es el más alto de todos.</li>
        <li>Comparar qué lugar queda más cerca de tu casa, si la escuela o el parque.</li>
        <li>Elegir cuál de dos bebidas es más cara.</li>
        <li>Decir con cortesía que no eres tan rápido como un amigo.</li>
        <li>Entender a alguien que compara dos películas o dos libros y dice cuál es más larga.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «mi hermano es más alto que yo».</p>',
        respuesta: ['哥哥', '比', '我', '高'], pinyin: ['gēge', 'bǐ', 'wǒ', 'gāo'], lang: 'zh-Hans',
        pista: '<p>' + zh("比", "bǐ") + ' va entre las dos personas.</p>',
        solucion: `<p>${zh("哥哥比我高", "gēge bǐ wǒ gāo")}: A, ${zh("比", "bǐ")}, B y el adjetivo.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «no soy tan alto como mi hermano».</p>',
        respuesta: ['我', '没有', '哥哥', '那么', '高'], pinyin: ['wǒ', 'méiyǒu', 'gēge', 'nàme', 'gāo'], lang: 'zh-Hans',
        pista: '<p>' + zh("没有", "méiyǒu") + ' ocupa el lugar de ' + zh("比", "bǐ") + '.</p>',
        solucion: `<p>${zh("我没有哥哥那么高", "wǒ méiyǒu gēge nàme gāo")}: ${zh("那么", "nàme")} va justo antes del adjetivo.</p>` },
      { tipo: 'opciones', enunciado: '<p>Elige la frase correcta para «la escuela está más cerca que el hospital».</p>',
        opciones: [zh('学校比医院很近', 'xuéxiào bǐ yīyuàn hěn jìn'), zh('学校比医院近', 'xuéxiào bǐ yīyuàn jìn'), zh('学校医院比近', 'xuéxiào yīyuàn bǐ jìn'), zh('比学校医院近', 'bǐ xuéxiào yīyuàn jìn')], correcta: 1,
        pista: '<p>Con ' + zh("比", "bǐ") + ' el adjetivo va solo, sin ' + zh("很", "hěn") + '.</p>',
        solucion: `<p>${zh("学校比医院近", "xuéxiào bǐ yīyuàn jìn")}: A, ${zh("比", "bǐ")}, B y ${zh("近", "jìn")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>En una familia de tres personas, ¿qué significa ${zh("爸爸最高", "bàba zuì gāo")}?</p>`,
        opciones: ['Papá no es muy alto', 'Papá es más bajo que yo', 'Papá es tan alto como yo', 'Papá es el más alto de todos'], correcta: 3,
        pista: '<p>' + zh("最", "zuì") + ' señala el grado más alto entre tres o más.</p>',
        solucion: `<p>${zh("爸爸最高", "bàba zuì gāo")} es «papá es el más alto de todos».</p>` },
      { tipo: 'opciones', escucha: { voz: '我比哥哥慢' },
        sinAudio: '<p>Se dice <strong>wǒ bǐ gēge màn</strong>: wǒ baja y sube; bǐ baja y sube; gē es alto y plano y ge es breve; màn cae.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice?</p>',
        opciones: ['Soy más lento que mi hermano', 'Soy más rápido que mi hermano', 'Mi hermano es más alto que yo', 'No soy tan lento como mi hermano'], correcta: 0,
        pista: '<p>Fíjate en la última palabra: ¿lenta o rápida?</p>',
        solucion: `<p>Se oye ${zh("我比哥哥慢", "wǒ bǐ gēge màn")}: ${zh("慢", "màn")} es «lento».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("个子", "gèzi")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['gè zi'],
        pista: '<p>La primera sílaba cae; la segunda es breve y sin tono.</p>',
        solucion: `<p>${zh("个子", "gèzi")}: <strong>gè zi</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_BI, CHIN_MEIYOU, CHIN_ZUI],
  });

  // ------------------------------------------------------------------
  L('Elegir en una pregunta: 还是', {
    objetivo: `Preguntar «¿esto o aquello?» con ${zh("还是", "háishi")}, sin ${zh("吗", "ma")}, y responder eligiendo una opción.`,
    explicacion: `
      <p>«¿Té o agua?» En español usas «o» y listo. En chino hay dos «o» distintas, y para las preguntas se usa una especial. Primero, las doce palabras de la lección. La voz de tu dispositivo puede sonar distinta de un hablante nativo; si dudas, manda el pinyin.</p>
      ${tabla([
        ['还是', 'háishi', 'o (en preguntas)'], ['红茶', 'hóngchá', 'té negro'], ['绿茶', 'lǜchá', 'té verde'], ['奶茶', 'nǎichá', 'té con leche'],
        ['颜色', 'yánsè', 'color'], ['红色', 'hóngsè', 'rojo'], ['白色', 'báisè', 'blanco'], ['黑色', 'hēisè', 'negro'],
        ['绿色', 'lǜsè', 'verde'], ['球', 'qiú', 'pelota, balón'], ['足球', 'zúqiú', 'fútbol'], ['篮球', 'lánqiú', 'baloncesto'],
      ])}
      <h3>¿Cómo ofrezco opciones?</h3>
      <p>Según ChinGram, ${zh("还是", "háishi")} se usa en preguntas para ofrecer dos o más opciones, y quien pregunta espera que la otra persona elija solo una. A esto lo llamamos una <strong>pregunta de elección</strong>. El molde es opción A, ${zh("还是", "háishi")}, opción B: ${zh("你喝茶还是喝水", "nǐ hē chá háishi hē shuǐ")}, «¿bebes té o agua?». Las frases de ejemplo de la lección son nuestras.</p>
      <p>Dos detalles. Primero, en estas preguntas no se pone ${zh("吗", "ma")} al final. Segundo, ChinGram dice que con un verbo de una sílaba, como ${zh("喝", "hē")}, el verbo no se omite en la segunda opción: se repite. Por eso nuestros ejemplos con ${zh("喝", "hē")} y ${zh("要", "yào")} repiten el verbo: ${zh("你要红茶还是要绿茶", "nǐ yào hóngchá háishi yào lǜchá")}. ${zh("喜欢", "xǐhuan")} tiene dos sílabas, así que en nuestros ejemplos aparece una vez (simplificación de la lección): ${zh("你喜欢红色还是黑色", "nǐ xǐhuan hóngsè háishi hēisè")}, «¿te gusta el rojo o el negro?».</p>
      ${cuadro(['Pregunta', 'Ejemplo', 'Qué se espera'], [
        [zh("吗", "ma"), zh("你喝茶吗", "nǐ hē chá ma"), 'sí o no'],
        ['verbo + ' + zh("不", "bù") + ' + verbo', zh("你喝不喝茶", "nǐ hē bu hē chá"), 'sí o no'],
        [zh("还是", "háishi"), zh("你喝茶还是喝水", "nǐ hē chá háishi hē shuǐ"), 'elegir una opción'],
      ])}
      <p>Las dos primeras ya las conoces de "Preguntas con ${zh("吗")}". La tercera es la nueva: no se contesta «sí» o «no», sino con la opción elegida.</p>
      <p>Las palabras de la tabla sirven de opciones: ${zh("你要奶茶还是要红茶", "nǐ yào nǎichá háishi yào hóngchá")}, «¿quieres té con leche o té negro?». En cambio ${zh("你喜欢什么颜色", "nǐ xǐhuan shénme yánsè")}, «¿qué color te gusta?», no ofrece opciones y no lleva ${zh("还是", "háishi")}.</p>
      <h3>¿Cómo respondo?</h3>
      <p>Repites la opción que eliges: ${zh("我喝绿茶", "wǒ hē lǜchá")}, «bebo té verde». Según ChinGram, también puedes aceptar o rechazar las dos con ${zh("都", "dōu")}. Con ${zh("你喜欢白色还是红色", "nǐ xǐhuan báisè háishi hóngsè")}, la respuesta ${zh("我都不喜欢", "wǒ dōu bù xǐhuan")} es «no me gusta ninguno», y ${zh("我都喜欢", "wǒ dōu xǐhuan")} es «me gustan los dos».</p>
      <p class="nota"><strong>Trampa común:</strong> cerrar con ${zh("吗", "ma")}, como en ${zh("你喝茶还是喝水吗", "nǐ hē chá háishi hē shuǐ ma")}. ChinGram dice que en estas preguntas ${zh("吗", "ma")} no puede ir al final.</p>
      <h3>Dos avisos más</h3>
      <p>El «o» de las afirmaciones es ${zh("或者", "huòzhě")}: ChinGram dice que ${zh("或者", "huòzhě")} es para afirmaciones y ${zh("还是", "háishi")} para preguntas. ${zh("或者", "huòzhě")} es del nivel 3, así que aquí solo la nombramos. Y para sugerir «mejor…», ${zh("还是", "háishi")} se junta con ${zh("吧", "ba")} al final: ${zh("咖啡太贵了，我们还是喝茶吧", "kāfēi tài guì le, wǒmen háishi hē chá ba")}, «el café es muy caro; mejor bebamos té».</p>`,
    ejemplo: `
      <p>Ana y Luis están en una cafetería. Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Luis ofrece dos tés: ${zh("你喝红茶还是喝绿茶", "nǐ hē hóngchá háishi hē lǜchá")}. Pone ${zh("还是", "háishi")} entre las opciones, repite ${zh("喝", "hē")} y no usa ${zh("吗", "ma")}.</li>
        <li>Ana elige una de las dos y repite solo la opción que quiere: ${zh("我喝绿茶", "wǒ hē lǜchá")}.</li>
        <li>Ana pregunta por colores: ${zh("你喜欢红色还是黑色", "nǐ xǐhuan hóngsè háishi hēisè")}. Luis rechaza los dos: ${zh("我都不喜欢", "wǒ dōu bù xǐhuan")}.</li>
        <li>Luego Ana pregunta ${zh("你喜欢足球还是篮球", "nǐ xǐhuan zúqiú háishi lánqiú")}, y Luis responde ${zh("我喜欢足球", "wǒ xǐhuan zúqiú")}.</li>
      </ol>
      <p>Comprueba: cada pregunta tiene ${zh("还是", "háishi")} en medio y ninguna termina en ${zh("吗", "ma")}. Resultado: <span class="resultado">${zh("你喝红茶还是喝绿茶", "nǐ hē hóngchá háishi hē lǜchá")} = «¿bebes té negro o té verde?»</span>.</p>
      <p class="nota"><strong>Error común:</strong> contestar «sí» o «no». Quien pregunta con ${zh("还是", "háishi")} espera que elijas una opción.</p>`,
    vidaReal: `
      <p>Saber elegir en una pregunta sirve cada día:</p>
      <ul>
        <li>Preguntarle a un amigo qué prefiere entre dos bebidas calientes.</li>
        <li>Preguntarle a tu hermano si prefiere ir al parque o al cine.</li>
        <li>Preguntar si le gusta más el fútbol o el baloncesto a un compañero nuevo.</li>
        <li>Contestar «los dos» o «ninguno» cuando ninguna opción te convence del todo.</li>
        <li>Entender una pregunta de un camarero en un menú sin responder «sí» por error.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «¿te gusta el rojo o el negro?».</p>',
        respuesta: ['你', '喜欢', '红色', '还是', '黑色'], pinyin: ['nǐ', 'xǐhuan', 'hóngsè', 'háishi', 'hēisè'], lang: 'zh-Hans',
        pista: '<p>' + zh("还是", "háishi") + ' va entre las dos opciones.</p>',
        solucion: `<p>${zh("你喜欢红色还是黑色", "nǐ xǐhuan hóngsè háishi hēisè")}: opción A, ${zh("还是", "háishi")}, opción B.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «no me gusta ninguno».</p>',
        respuesta: ['我', '都', '不', '喜欢'], pinyin: ['wǒ', 'dōu', 'bù', 'xǐhuan'], lang: 'zh-Hans',
        pista: '<p>' + zh("都", "dōu") + ' va antes de ' + zh("不", "bù") + '. Se dice bú, pero se escribe bù.</p>',
        solucion: `<p>${zh("我都不喜欢", "wǒ dōu bù xǐhuan")}: ${zh("都", "dōu")} abarca las dos opciones y ${zh("不", "bù")} las rechaza.</p>` },
      { tipo: 'opciones', enunciado: '<p>Elige la pregunta correcta para «¿bebes té o agua?».</p>',
        opciones: [zh('你喝茶还是喝水吗', 'nǐ hē chá háishi hē shuǐ ma'), zh('你吗喝茶还是喝水', 'nǐ ma hē chá háishi hē shuǐ'), zh('你喝茶还是喝水', 'nǐ hē chá háishi hē shuǐ'), zh('还是你喝茶喝水', 'háishi nǐ hē chá hē shuǐ')], correcta: 2,
        pista: '<p>En una pregunta de elección no se pone ' + zh("吗", "ma") + '.</p>',
        solucion: `<p>${zh("你喝茶还是喝水", "nǐ hē chá háishi hē shuǐ")}: ${zh("还是", "háishi")} en medio y sin ${zh("吗", "ma")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Te preguntan ${zh("你喜欢白色还是红色", "nǐ xǐhuan báisè háishi hóngsè")} y respondes ${zh("我都不喜欢", "wǒ dōu bù xǐhuan")}. ¿Qué dijiste?</p>`,
        opciones: ['No me gusta ninguno', 'Me gustan los dos', 'Me gusta el blanco', 'Me gusta el rojo'], correcta: 0,
        pista: '<p>' + zh("都", "dōu") + ' junto a ' + zh("不", "bù") + ' rechaza todas las opciones.</p>',
        solucion: `<p>${zh("我都不喜欢", "wǒ dōu bù xǐhuan")} es «no me gusta ninguno».</p>` },
      { tipo: 'opciones', escucha: { voz: '你喜欢红色还是黑色' },
        sinAudio: '<p>Se dice <strong>nǐ xǐhuan hóngsè háishi hēisè</strong>: nǐ y xǐ bajan y suben; huan es breve; hóng sube; sè cae; hái sube; shi es breve; hēi es alto y plano; sè cae.</p>',
        enunciado: '<p>Escucha la pregunta. ¿Qué dice?</p>',
        opciones: ['¿Te gusta el rojo o el blanco?', '¿Te gusta el verde o el negro?', '¿Te gusta el rojo o el negro?', '¿Qué color te gusta?'], correcta: 2,
        pista: '<p>Fíjate en las dos palabras que rodean a ' + zh("还是", "háishi") + '.</p>',
        solucion: `<p>Se oye ${zh("你喜欢红色还是黑色", "nǐ xǐhuan hóngsè háishi hēisè")}: ${zh("红色", "hóngsè")} es «rojo» y ${zh("黑色", "hēisè")} es «negro».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("足球", "zúqiú")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['zú qiú'],
        pista: '<p>Las dos sílabas suben.</p>',
        solucion: `<p>${zh("足球", "zúqiú")}: <strong>zú qiú</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_HAISHI, CHIN_HUOZHE],
  });

  // ------------------------------------------------------------------
  const CHIN_YINWEI = CHINGRAM('conjunctions-yinwei-%e5%9b%a0%e4%b8%ba-%e5%9b%a0%e7%82%ba-because-since-and-suoyi-%e6%89%80%e4%bb%a5-so-therefore-and-construction-yinweisuoyi-%e5%9b%a0', 'Sentence with yīnwèi 因为 ‘because, since’ and suǒyǐ 所以 ‘so, therefore’');
  const CHIN_WEISHENME = CHINGRAM('interrogative-expression-wei-shenme-%e4%b8%ba%e4%bb%80%e4%b9%88-%e7%82%ba%e4%bb%80%e9%ba%bc-why', 'Interrogative expression wèi shénme 为什么 ‘why’');

  L('Causa y efecto: 因为…所以…', {
    objetivo: `Unir una causa con su consecuencia usando ${zh("因为", "yīnwèi")} y ${zh("所以", "suǒyǐ")}, y preguntar la causa con ${zh("为什么", "wèi shénme")}.`,
    explicacion: `
      <p>«¿Por qué no viniste?» «Porque me dolía la cabeza, así que me quedé en casa.» Dar y pedir razones es algo que haces todos los días. Primero, las doce palabras de la lección. La voz de tu dispositivo puede sonar distinta de un hablante nativo; si dudas, manda el pinyin.</p>
      ${tabla([
        ['因为', 'yīnwèi', 'porque'], ['所以', 'suǒyǐ', 'por eso, así que'], ['为什么', 'wèi shénme', 'por qué'], ['身体', 'shēntǐ', 'cuerpo, salud'],
        ['舒服', 'shūfu', 'cómodo, a gusto'], ['疼', 'téng', 'doler, que duele'], ['头', 'tóu', 'cabeza'], ['药', 'yào', 'medicina'],
        ['药店', 'yàodiàn', 'farmacia'], ['考试', 'kǎoshì', 'examen, presentar un examen'], ['准备', 'zhǔnbèi', 'preparar, prepararse'], ['忘', 'wàng', 'olvidar'],
      ])}
      <h3>¿Cómo uno una causa con su consecuencia?</h3>
      <p>Cada frase tiene dos mitades: la <strong>causa</strong>, que es el motivo, y la <strong>consecuencia</strong>, que es lo que resulta. Según ChinGram, de la Universidad Palacký, ${zh("因为", "yīnwèi")} normalmente introduce la causa y ${zh("所以", "suǒyǐ")} introduce el resultado. Se pueden usar juntos o por separado. Las frases de ejemplo de la lección son nuestras.</p>
      ${G({
        x: [0, 10], y: [-1, 5], ejes: false,
        descripcion: 'Esquema de dos cajas unidas por una flecha que va de izquierda a derecha. La caja izquierda lleva la etiqueta de la causa, con la palabra para «porque» en pinyin. La caja derecha lleva la etiqueta de la consecuencia, con la palabra para «por eso» en pinyin.',
        figuras: [
          caja(0.3, 1, 4, 3.5), caja(6, 1, 9.7, 3.5), lin([4, 2.25], [6, 2.25]), lin([5.6, 2.6], [6, 2.25]), lin([5.6, 1.9], [6, 2.25]),
          txt(2.1, 2.7, 'yīnwèi'), txt(2.1, 1.7, 'causa'), txt(7.85, 2.7, 'suǒyǐ'), txt(7.85, 1.7, 'consecuencia'),
        ],
      })}
      <p>El molde completo es ${zh("因为", "yīnwèi")} + causa, ${zh("所以", "suǒyǐ")} + consecuencia: ${zh("因为我头疼，所以我不去", "yīnwèi wǒ tóu téng, suǒyǐ wǒ bù qù")}, «como me duele la cabeza, no voy». ChinGram señala que ${zh("所以", "suǒyǐ")} siempre abre la segunda cláusula. En español sonaría repetido decir «porque… por eso…»; en chino es normal.</p>
      <p>Puedes usar solo una de las dos: ${zh("明天有考试，所以我要准备", "míngtiān yǒu kǎoshì, suǒyǐ wǒ yào zhǔnbèi")}, «mañana hay examen, así que me preparo», o ${zh("我不去，因为我身体不舒服", "wǒ bù qù, yīnwèi wǒ shēntǐ bù shūfu")}, «no voy porque no me siento bien». Según la fuente, al hablar a veces se omiten las dos palabras y queda ${zh("我头疼，不去", "wǒ tóu téng, bù qù")}.</p>
      <p>Una nota de pronunciación, simplificación de la lección: ${zh("不", "bù")} se escribe con su tono original, pero delante de otro sonido que cae suele decirse <em>bú</em>.</p>
      <h3>¿Cómo pregunto el motivo?</h3>
      <p>${zh("为什么", "wèi shénme")} pregunta por una causa o razón, y la respuesta suele empezar con ${zh("因为", "yīnwèi")}. Según ChinGram, puede ir al inicio de la frase, antes del sujeto, o entre el sujeto y el verbo.</p>
      ${cuadro(['Pregunta', 'Respuesta'], [
        [zh("你为什么不去", "nǐ wèi shénme bù qù") + ' «¿por qué no vas?»', zh("因为我头疼", "yīnwèi wǒ tóu téng") + ' «porque me duele la cabeza»'],
        [zh("为什么你不去", "wèi shénme nǐ bù qù") + ' «¿por qué no vas?»', zh("因为我忘了", "yīnwèi wǒ wàng le") + ' «porque se me olvidó»'],
      ])}
      <p>Las palabras de la tabla te dan muchas causas para practicar. ${zh("我身体不舒服", "wǒ shēntǐ bù shūfu")} es «no me siento bien». ${zh("我头疼", "wǒ tóu téng")} es «me duele la cabeza», y de ahí viene ${zh("我要去药店买药", "wǒ yào qù yàodiàn mǎi yào")}, «voy a la farmacia a comprar medicina». ${zh("我忘了", "wǒ wàng le")} es «se me olvidó». Con cualquiera de ellas puedes armar una causa y, detrás, su consecuencia.</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("所以", "suǒyǐ")} en la mitad de la causa. ${zh("所以", "suǒyǐ")} siempre va al inicio de la consecuencia: ${zh("因为我头疼，所以我想去药店", "yīnwèi wǒ tóu téng, suǒyǐ wǒ xiǎng qù yàodiàn")}, «me duele la cabeza, por eso quiero ir a la farmacia».</p>`,
    ejemplo: `
      <p>Luis nota que Ana no fue a la escuela. Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Luis pregunta: ${zh("你为什么不去学校", "nǐ wèi shénme bù qù xuéxiào")}. Pone ${zh("为什么", "wèi shénme")} entre el sujeto y el verbo.</li>
        <li>Ana contesta con la causa: ${zh("因为我头疼", "yīnwèi wǒ tóu téng")}.</li>
        <li>Luis sugiere: ${zh("你去药店买药吧", "nǐ qù yàodiàn mǎi yào ba")}. Ana añade la consecuencia: ${zh("所以我想去药店", "suǒyǐ wǒ xiǎng qù yàodiàn")}.</li>
        <li>Ana junta las dos mitades en una sola frase, la causa primero y la consecuencia después.</li>
      </ol>
      <p>Comprueba: ${zh("因为", "yīnwèi")} abre la causa, ${zh("所以", "suǒyǐ")} abre la consecuencia y entre las dos hay una coma. Resultado: <span class="resultado">${zh("因为我头疼，所以我不去学校", "yīnwèi wǒ tóu téng, suǒyǐ wǒ bù qù xuéxiào")} = «me duele la cabeza, por eso no voy a la escuela»</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que siempre hacen falta las dos palabras. Con una sola ya se entiende la relación, y al hablar a veces no se dice ninguna.</p>`,
    vidaReal: `
      <p>Explicar motivos sirve en muchas situaciones:</p>
      <ul>
        <li>Decirle a tu profesora por qué no hiciste la tarea.</li>
        <li>Preguntarle a un amigo por qué está triste o contento.</li>
        <li>Avisar en casa de que no te sientes bien y por eso no vas a salir.</li>
        <li>Explicar que estudias mucho porque dentro de pocos días tienes un examen.</li>
        <li>Pedir en una farmacia lo que necesitas y contar por qué lo necesitas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «¿por qué no vas?».</p>',
        respuesta: ['你', '为什么', '不', '去'], pinyin: ['nǐ', 'wèi shénme', 'bù', 'qù'], lang: 'zh-Hans',
        alternativas: [['为什么', '你', '不', '去']],
        pista: '<p>' + zh("为什么", "wèi shénme") + ' puede ir entre el sujeto y el verbo.</p>',
        solucion: `<p>${zh("你为什么不去", "nǐ wèi shénme bù qù")}; también vale ${zh("为什么你不去", "wèi shénme nǐ bù qù")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «mañana hay examen, así que me preparo».</p>',
        respuesta: ['明天', '有', '考试', '所以', '我', '要', '准备'], pinyin: ['míngtiān', 'yǒu', 'kǎoshì', 'suǒyǐ', 'wǒ', 'yào', 'zhǔnbèi'], lang: 'zh-Hans',
        pista: '<p>La causa va primero; ' + zh("所以", "suǒyǐ") + ' abre la consecuencia.</p>',
        solucion: `<p>${zh("明天有考试，所以我要准备", "míngtiān yǒu kǎoshì, suǒyǐ wǒ yào zhǔnbèi")}: causa, ${zh("所以", "suǒyǐ")} y consecuencia.</p>` },
      { tipo: 'opciones', enunciado: `<p>Te preguntan ${zh("你为什么不去", "nǐ wèi shénme bù qù")} y no te sientes bien. ¿Qué respuesta eliges?</p>`,
        opciones: [zh('因为我身体不舒服', 'yīnwèi wǒ shēntǐ bù shūfu'), zh('所以我身体不舒服', 'suǒyǐ wǒ shēntǐ bù shūfu'), zh('为什么我身体不舒服', 'wèi shénme wǒ shēntǐ bù shūfu'), zh('我身体不舒服吗', 'wǒ shēntǐ bù shūfu ma')], correcta: 0,
        pista: '<p>La respuesta a ' + zh("为什么", "wèi shénme") + ' suele empezar con la palabra que abre la causa.</p>',
        solucion: `<p>${zh("因为我身体不舒服", "yīnwèi wǒ shēntǐ bù shūfu")}: ${zh("因为", "yīnwèi")} da el motivo.</p>` },
      { tipo: 'opciones', enunciado: `<p>En ${zh("因为我忘了，____我不去", "yīnwèi wǒ wàng le, ____ wǒ bù qù")} falta la palabra que abre la consecuencia. ¿Cuál es?</p>`,
        opciones: [zh('因为', 'yīnwèi'), zh('为什么', 'wèi shénme'), zh('所以', 'suǒyǐ'), zh('药', 'yào')], correcta: 2,
        pista: '<p>Esa palabra siempre abre la segunda mitad.</p>',
        solucion: `<p>${zh("所以", "suǒyǐ")}: ${zh("因为我忘了，所以我不去", "yīnwèi wǒ wàng le, suǒyǐ wǒ bù qù")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '因为我头疼，所以我不去' },
        sinAudio: '<p>Se dice <strong>yīnwèi wǒ tóu téng, suǒyǐ wǒ bù qù</strong>: yīn es alto y plano; wèi cae; wǒ baja y sube; tóu y téng suben; suǒ baja y sube; yǐ baja y sube; bù se dice bú y sube; qù cae.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice?</p>',
        opciones: ['Me duele la cabeza, por eso no voy', 'Me duele la cabeza, por eso voy a la farmacia', 'No voy porque olvidé la medicina', '¿Por qué no vas?'], correcta: 0,
        pista: '<p>Fíjate en lo que duele y en lo que resulta de ello.</p>',
        solucion: `<p>Se oye ${zh("因为我头疼，所以我不去", "yīnwèi wǒ tóu téng, suǒyǐ wǒ bù qù")}: causa «me duele la cabeza», consecuencia «no voy».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("药店", "yàodiàn")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['yào diàn'],
        pista: '<p>Las dos sílabas caen.</p>',
        solucion: `<p>${zh("药店", "yàodiàn")}: <strong>yào diàn</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_YINWEI, CHIN_WEISHENME],
  });

  // ------------------------------------------------------------------
  const CHIN_SUIRAN = CHINGRAM('conjunctions-danshi-%e4%bd%86%e6%98%af-keshi-%e5%8f%af%e6%98%af-and-buguo-%e4%b8%8d%e8%bf%87-%e4%b8%8d%e9%81%8e-but-however-and-the-construction-suirandanshi-%e8%99%bd', 'Sentence with suīrán 虽然, dànshì 但是, kěshì 可是 and búguò 不过');

  L('Aunque: 虽然…但是…', {
    objetivo: `Admitir algo y decir lo que pesa más con ${zh("虽然", "suīrán")} y ${zh("但是", "dànshì")}, y dar tu opinión con ${zh("觉得", "juéde")}.`,
    explicacion: `
      <p>«Aunque está caro, está muy rico.» «Aunque llueve, quiero salir.» Todos admitimos algo y enseguida decimos lo que importa más. Primero, las doce palabras de la lección. La voz de tu dispositivo puede sonar distinta de un hablante nativo; si dudas, manda el pinyin.</p>
      ${tabla([
        ['虽然', 'suīrán', 'aunque'], ['但是', 'dànshì', 'pero, sin embargo'], ['但', 'dàn', `pero (forma corta de ${zh("但是", "dànshì")})`], ['意思', 'yìsi', 'sentido, significado'],
        ['有意思', 'yǒu yìsi', 'interesante, divertido'], ['没意思', 'méi yìsi', 'aburrido, sin gracia'], ['不错', 'búcuò', 'bastante bueno'], ['希望', 'xīwàng', 'esperar, desear que pase'],
        ['可能', 'kěnéng', 'posible, quizá'], ['觉得', 'juéde', 'sentir, opinar'], ['自己', 'zìjǐ', 'uno mismo'], ['事情', 'shìqing', 'asunto, cosa que pasa'],
      ])}
      <h3>¿Cómo admito algo y digo lo que pesa más?</h3>
      <p>Cada frase tiene dos mitades. En la primera, ${zh("虽然", "suīrán")} abre un hecho que se admite, y en la segunda, ${zh("但是", "dànshì")} abre lo que pesa más. A ese choque entre las dos mitades lo llamamos <strong>contraste</strong>. Según ChinGram, de la Universidad Palacký, ${zh("虽然", "suīrán")} va siempre en la primera cláusula para conceder un hecho conocido. Las frases de ejemplo de la lección son nuestras.</p>
      <p>Aquí el chino se separa del español. ChinGram avisa de que en inglés, con «although», la segunda cláusula no lleva «but»; en chino, en cambio, la segunda cláusula sí lleva ${zh("但是", "dànshì")}. En español no solemos decir «aunque… pero…»; en chino se ponen los dos (esto último es una simplificación de la lección).</p>
      ${cuadro(['Molde', 'Ejemplo'], [
        [zh("虽然", "suīrán") + ' + lo que admito, ' + zh("但是", "dànshì") + ' + lo que pesa más', zh("虽然这个包子很贵，但是很好吃", "suīrán zhège bāozi hěn guì, dànshì hěn hǎochī") + '<br>«aunque este baozi es caro, está muy rico»'],
        [zh("因为", "yīnwèi") + ' + causa, ' + zh("所以", "suǒyǐ") + ' + consecuencia (lección anterior)', zh("因为很贵，所以我不买", "yīnwèi hěn guì, suǒyǐ wǒ bù mǎi") + '<br>«es caro, por eso no lo compro»'],
      ])}
      <p>Fíjate en la diferencia: ${zh("因为", "yīnwèi")} y ${zh("所以", "suǒyǐ")} unen una razón con su resultado; ${zh("虽然", "suīrán")} y ${zh("但是", "dànshì")} unen dos cosas que parecen chocar. En "Causa y efecto: ${zh("因为")}…${zh("所以")}…" viste el primer par.</p>
      <h3>¿Qué más puedo decir?</h3>
      <p>ChinGram dice que ${zh("但是", "dànshì")} es más formal y sirve al hablar y al escribir. Su forma corta es ${zh("但", "dàn")}: ${zh("虽然下雨，但我想去学校", "suīrán xià yǔ, dàn wǒ xiǎng qù xuéxiào")}, «aunque llueve, quiero ir a la escuela». Según la fuente, si el contexto es claro se puede omitir ${zh("虽然", "suīrán")} y dejar ${zh("但是", "dànshì")} en la segunda cláusula: ${zh("天气不错，但是我有点儿忙", "tiānqì búcuò, dànshì wǒ yǒudiǎnr máng")}, «hace buen tiempo, pero estoy un poco ocupado».</p>
      <p>Las demás palabras sirven para opinar. ${zh("我觉得这个电影很有意思", "wǒ juéde zhège diànyǐng hěn yǒu yìsi")} es «me parece que esta película es interesante»; la opuesta es ${zh("没意思", "méi yìsi")}: ${zh("这本书没意思", "zhè běn shū méi yìsi")}. Con ${zh("希望", "xīwàng")} dices lo que esperas: ${zh("我希望明天天气不错", "wǒ xīwàng míngtiān tiānqì búcuò")}. Con ${zh("可能", "kěnéng")}, lo que quizá pase: ${zh("明天可能下雨", "míngtiān kěnéng xià yǔ")}. ${zh("自己", "zìjǐ")} refuerza «uno mismo»: ${zh("我自己做饭", "wǒ zìjǐ zuò fàn")}, «lo cocino yo». Y ${zh("事情", "shìqing")} nombra lo que pasa: ${zh("我有很多事情", "wǒ yǒu hěn duō shìqing")}.</p>
      <p class="nota"><strong>Trampa común:</strong> copiar el español y dejar la segunda mitad sin ${zh("但是", "dànshì")}. En chino se dice ${zh("虽然很贵，但是很好吃", "suīrán hěn guì, dànshì hěn hǎochī")}: según la fuente, la segunda mitad lleva ${zh("但是", "dànshì")}.</p>`,
    ejemplo: `
      <p>Ana y Luis hablan de una película. Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Luis opina: ${zh("我觉得这个电影很有意思", "wǒ juéde zhège diànyǐng hěn yǒu yìsi")}. Usa ${zh("觉得", "juéde")} para dar su parecer.</li>
        <li>Ana admite un punto a favor: ${zh("虽然很有意思", "suīrán hěn yǒu yìsi")}, y no lo cierra todavía, porque falta la segunda mitad.</li>
        <li>Ana completa con lo que pesa más: ${zh("但是时间太晚了", "dànshì shíjiān tài wǎn le")}, «pero es demasiado tarde».</li>
        <li>Luis responde con una esperanza: ${zh("我希望明天可以看", "wǒ xīwàng míngtiān kěyǐ kàn")}.</li>
      </ol>
      <p>Comprueba: ${zh("虽然", "suīrán")} abre la primera mitad, ${zh("但是", "dànshì")} abre la segunda y las dos están en la misma frase. Resultado: <span class="resultado">${zh("虽然很有意思，但是时间太晚了", "suīrán hěn yǒu yìsi, dànshì shíjiān tài wǎn le")} = «aunque es interesante, es demasiado tarde»</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar ${zh("因为", "yīnwèi")} en lugar de ${zh("虽然", "suīrán")} porque «las dos unen frases». Una da el motivo; la otra admite algo que choca.</p>`,
    vidaReal: `
      <p>Admitir y contrastar sirve a diario:</p>
      <ul>
        <li>Reconocer que un plato es caro y, aun así, decir que vale la pena comprarlo.</li>
        <li>Contar que tienes sueño pero quieres jugar con tus amigos.</li>
        <li>Dar tu opinión sobre una película con la frase «me parece que».</li>
        <li>Decir lo que esperas que pase mañana y lo que quizá no pase.</li>
        <li>Quejarte de que una tarea es aburrida, pero reconocer que de todos modos la vas a terminar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «aunque está caro, está muy rico».</p>',
        respuesta: ['虽然', '很', '贵', '但是', '很', '好吃'], pinyin: ['suīrán', 'hěn', 'guì', 'dànshì', 'hěn', 'hǎochī'], lang: 'zh-Hans',
        pista: '<p>' + zh("虽然", "suīrán") + ' abre lo que admites y ' + zh("但是", "dànshì") + ' lo que pesa más.</p>',
        solucion: `<p>${zh("虽然很贵，但是很好吃", "suīrán hěn guì, dànshì hěn hǎochī")}: admites el precio y dices lo que pesa más.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «me parece que este libro es aburrido».</p>',
        respuesta: ['我', '觉得', '这', '本', '书', '没意思'], pinyin: ['wǒ', 'juéde', 'zhè', 'běn', 'shū', 'méi yìsi'], lang: 'zh-Hans',
        alternativas: [['这', '本', '书', '我', '觉得', '没意思']],
        pista: '<p>Primero quién opina, luego la palabra para opinar y al final la valoración.</p>',
        solucion: `<p>${zh("我觉得这本书没意思", "wǒ juéde zhè běn shū méi yìsi")}: ${zh("觉得", "juéde")} introduce tu opinión.</p>` },
      { tipo: 'opciones', enunciado: `<p>En ${zh("____很贵，但是很好吃", "____ hěn guì, dànshì hěn hǎochī")} falta la palabra que abre la primera mitad. ¿Cuál es?</p>`,
        opciones: [zh('所以', 'suǒyǐ'), zh('虽然', 'suīrán'), zh('为什么', 'wèi shénme'), zh('希望', 'xīwàng')], correcta: 1,
        pista: '<p>Va con ' + zh("但是", "dànshì") + ' en la segunda mitad.</p>',
        solucion: `<p>${zh("虽然", "suīrán")}: ${zh("虽然很贵，但是很好吃", "suīrán hěn guì, dànshì hěn hǎochī")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Quieres decir «aunque hace buen tiempo, estoy muy ocupado». ¿Qué frase elige alguien que sigue el molde de la lección?</p>`,
        opciones: [zh('虽然天气不错，但是我很忙', 'suīrán tiānqì búcuò, dànshì wǒ hěn máng'), zh('虽然天气不错，所以我很忙', 'suīrán tiānqì búcuò, suǒyǐ wǒ hěn máng'), zh('因为天气不错，但是我很忙', 'yīnwèi tiānqì búcuò, dànshì wǒ hěn máng'), zh('但是天气不错，虽然我很忙', 'dànshì tiānqì búcuò, suīrán wǒ hěn máng')], correcta: 0,
        pista: '<p>Cada mitad lleva su palabra: ' + zh("虽然", "suīrán") + ' con ' + zh("但是", "dànshì") + '.</p>',
        solucion: `<p>${zh("虽然天气不错，但是我很忙", "suīrán tiānqì búcuò, dànshì wǒ hěn máng")}: el par completo.</p>` },
      { tipo: 'opciones', escucha: { voz: '虽然下雨，但是我想去' },
        sinAudio: '<p>Se dice <strong>suīrán xià yǔ, dànshì wǒ xiǎng qù</strong>: suī es alto y plano; rán sube; xià cae; yǔ baja y sube; dàn cae; shì cae; wǒ y xiǎng bajan y suben; qù cae.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice?</p>',
        opciones: ['Llueve, por eso no quiero ir', 'Aunque llueve, quiero ir', 'Quiero ir porque no llueve', '¿Por qué llueve?'], correcta: 1,
        pista: '<p>Fíjate en la palabra que oyes en la segunda mitad.</p>',
        solucion: `<p>Se oye ${zh("虽然下雨，但是我想去", "suīrán xià yǔ, dànshì wǒ xiǎng qù")}: admite la lluvia y dice lo que pesa más.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("不错", "búcuò")} con sus marcas de tono (separa las sílabas con un espacio). Es el pinyin del sílabo.</p>`,
        respuestas: ['bú cuò'],
        pista: '<p>La primera sube y la segunda cae; la primera ya trae el cambio de tono.</p>',
        solucion: `<p>${zh("不错", "búcuò")}: <strong>bú cuò</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_SUIRAN, CHIN_YINWEI],
  });

  // ------------------------------------------------------------------
  const CHIN_YAOLE = CHINGRAM('jiuyaole-%e5%b0%b1%e8%a6%81%e4%ba%86and-kuaiyaole-%e5%bf%ab%e8%a6%81%e4%ba%86-about-to', 'Construction (jiù)yào…le 快要……了 «about to…»');

  L('Algo está por pasar: 要…了', {
    objetivo: `Decir que algo va a pasar muy pronto con ${zh("要", "yào")}…${zh("了", "le")}, y elegir entre ${zh("快要", "kuàiyào")} y ${zh("就要", "jiù yào")}.`,
    explicacion: `
      <p>Oyes el silbato: el tren ya casi llega. Faltan unos minutos para que empiece la película. «Ya va a empezar», «ya me voy». Para ese momento justo antes, el chino tiene un molde. Primero, las doce palabras de la lección. La voz de tu dispositivo puede sonar distinta de un hablante nativo; si dudas, manda el pinyin.</p>
      ${tabla([
        ['快要', 'kuàiyào', 'estar a punto de'], ['就', 'jiù', 'justamente, enseguida'], ['开始', 'kāishǐ', 'empezar, comenzar'], ['开学', 'kāixué', 'empezar las clases'],
        ['过年', 'guònián', 'celebrar el Año Nuevo'], ['生日', 'shēngrì', 'cumpleaños'], ['快乐', 'kuàilè', 'feliz, alegre'], ['走', 'zǒu', 'irse, caminar'],
        ['出门', 'chūmén', 'salir de casa'], ['一会儿', 'yíhuìr', 'un rato, enseguida'], ['火车', 'huǒchē', 'tren'], ['飞机', 'fēijī', 'avión'],
      ])}
      <h3>¿Cómo digo que algo está por pasar?</h3>
      <p>Se pone ${zh("要", "yào")} antes del verbo y ${zh("了", "le")} al final de la frase. Según ChinGram, de la Universidad Palacký, el molde ${zh("(就)要…了", "(jiù)yào…le")} indica un hecho que va a ocurrir pronto. A eso lo llamamos <strong>futuro cercano</strong>. Las frases de ejemplo de la lección son nuestras.</p>
      <p>${zh("火车要来了", "huǒchē yào lái le")} es «el tren ya va a llegar». ${zh("电影要开始了", "diànyǐng yào kāishǐ le")} es «la película ya va a empezar». ${zh("我们要走了", "wǒmen yào zǒu le")} es «ya nos vamos». Ya conoces ${zh("了", "le")} al final de la frase por "Algo cambió: ${zh("了")} al final de la frase": aquí cierra el molde y dice que el momento está encima.</p>
      ${G({
        x: [0, 10], y: [-1, 5], ejes: false,
        descripcion: 'Línea de tiempo horizontal con una flecha hacia la derecha. Sobre la línea hay tres marcas verticales. La primera, a la izquierda, dice «ahora» y la segunda, no muy lejos, dice «muy pronto». Sobre el tramo entre esos dos puntos hay un corchete corto con la etiqueta «yào…le», y más a la derecha hay un tercer punto marcado como «más tarde», que queda lejos.',
        figuras: [
          lin([0.5, 2], [9.5, 2]), lin([9, 2.3], [9.5, 2]), lin([9, 1.7], [9.5, 2]),
          lin([1.5, 1.6], [1.5, 2.4]), lin([4, 1.6], [4, 2.4]), lin([6, 1.6], [6, 2.4]),
          lin([1.5, 3], [4, 3]), lin([1.5, 2.8], [1.5, 3.2]), lin([4, 2.8], [4, 3.2]),
          txt(1.5, 1, 'ahora'), txt(4, 1, 'muy pronto'), txt(6.5, 1, 'más tarde'), txt(2.75, 3.7, 'yào…le'),
        ],
      })}
      <h3>¿Qué variantes hay?</h3>
      <p>Hay tres formas: ${zh("要…了", "yào…le")}, ${zh("就要…了", "jiù yào…le")} y ${zh("快要…了", "kuàiyào…le")}. Con ${zh("快要…了", "kuàiyào…le")} se dice ${zh("快要开学了", "kuàiyào kāixué le")}, «ya casi empiezan las clases», y ${zh("快要过年了", "kuàiyào guònián le")}, «ya casi es Año Nuevo».</p>
      ${cuadro(['Molde', 'Ejemplo'], [
        [zh("要…了", "yào…le"), zh("火车要来了", "huǒchē yào lái le") + ' «el tren ya va a llegar»'],
        [zh("就要…了", "jiù yào…le"), zh("明天就要考试了", "míngtiān jiù yào kǎoshì le") + ' «mañana ya hay examen»'],
        [zh("快要…了", "kuàiyào…le"), zh("快要开学了", "kuàiyào kāixué le") + ' «ya casi empiezan las clases»'],
      ])}
      <p>Una regla útil: ChinGram dice que las palabras de tiempo o de inmediatez, como ${zh("一会儿", "yíhuìr")}, suelen ir con ${zh("要…了", "yào…le")} o ${zh("就要…了", "jiù yào…le")}, pero normalmente no con ${zh("快要…了", "kuàiyào…le")}. Por eso: ${zh("明天就要考试了", "míngtiān jiù yào kǎoshì le")} y ${zh("我一会儿就要出门了", "wǒ yíhuìr jiù yào chūmén le")}, «dentro de un rato salgo de casa».</p>
      <p>Otras palabras de la lección: ${zh("生日快乐", "shēngrì kuàilè")} es «feliz cumpleaños», y ${zh("飞机", "fēijī")} sirve igual que el tren: ${zh("飞机要走了", "fēijī yào zǒu le")}.</p>
      <p>Con el vocabulario de la lección puedes avisar de muchas cosas: ${zh("我们快要出门了", "wǒmen kuàiyào chūmén le")}, «ya casi salimos de casa»; ${zh("飞机就要走了", "fēijī jiù yào zǒu le")}, «el avión sale enseguida»; o ${zh("电影快要开始了", "diànyǐng kuàiyào kāishǐ le")}, «la película está por empezar». En todas el verbo va entre ${zh("要", "yào")} y ${zh("了", "le")}.</p>
      <p class="nota"><strong>Trampa común:</strong> olvidar el ${zh("了", "le")} final. Sin él, ${zh("要", "yào")} suele leerse como «querer», como en "Comida y bebida: ${zh("想")} y ${zh("要")}" (simplificación de la lección): ${zh("我要吃饭", "wǒ yào chīfàn")} es «quiero comer», y ${zh("我要吃饭了", "wǒ yào chīfàn le")} es «ya voy a comer».</p>`,
    ejemplo: `
      <p>Ana espera a Luis en la estación. Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Ve a lo lejos el tren y dice ${zh("火车要来了", "huǒchē yào lái le")}. Pone ${zh("要", "yào")} antes del verbo y ${zh("了", "le")} al final.</li>
        <li>Luis pregunta si hay prisa. Ana contesta con una palabra de inmediatez: ${zh("火车一会儿就要走了", "huǒchē yíhuìr jiù yào zǒu le")}. Con ${zh("一会儿", "yíhuìr")} elige ${zh("就要", "jiù yào")}, no ${zh("快要", "kuàiyào")}.</li>
        <li>Luego habla de otra fecha: ${zh("快要过年了", "kuàiyào guònián le")}. Aquí no hay palabra de hora, así que ${zh("快要", "kuàiyào")} va bien.</li>
        <li>Para cerrar, Luis recuerda un cumpleaños: ${zh("我的生日快要到了", "wǒ de shēngrì kuàiyào dào le")}.</li>
      </ol>
      <p>Comprueba: cada frase tiene ${zh("要", "yào")} antes del verbo y ${zh("了", "le")} al final. Resultado: <span class="resultado">${zh("我一会儿就要出门了", "wǒ yíhuìr jiù yào chūmén le")} = «dentro de un rato salgo de casa»</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que ${zh("要", "yào")} siempre es «querer». Con ${zh("了", "le")} al final dice que el momento está encima.</p>`,
    vidaReal: `
      <p>Avisar de lo que está por pasar es muy común:</p>
      <ul>
        <li>Avisar a tu familia de que ya sales de casa para ir a la escuela.</li>
        <li>Decirle a un amigo que la película está por empezar.</li>
        <li>Contar que se acerca tu cumpleaños o una fiesta con tu familia.</li>
        <li>Anunciar en la estación que el tren llega en un momento.</li>
        <li>Avisar a tu hermano de que el desayuno ya casi está listo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «el tren ya va a llegar».</p>',
        respuesta: ['火车', '要', '来', '了'], pinyin: ['huǒchē', 'yào', 'lái', 'le'], lang: 'zh-Hans',
        pista: '<p>' + zh("要", "yào") + ' va antes del verbo y ' + zh("了", "le") + ' cierra la frase.</p>',
        solucion: `<p>${zh("火车要来了", "huǒchē yào lái le")}: ${zh("要", "yào")} + verbo + ${zh("了", "le")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «mañana ya hay examen».</p>',
        respuesta: ['明天', '就要', '考试', '了'], pinyin: ['míngtiān', 'jiù yào', 'kǎoshì', 'le'], lang: 'zh-Hans',
        pista: '<p>Con una palabra de tiempo se usa ' + zh("就要", "jiù yào") + '.</p>',
        solucion: `<p>${zh("明天就要考试了", "míngtiān jiù yào kǎoshì le")}: la fecha va primero y ${zh("就要", "jiù yào")} antes del verbo.</p>` },
      { tipo: 'opciones', enunciado: `<p>Quieres decir «ya casi empiezan las clases». ¿Qué frase eliges?</p>`,
        opciones: [zh('快要开学了', 'kuàiyào kāixué le'), zh('快要开学', 'kuàiyào kāixué'), zh('开学快要', 'kāixué kuàiyào'), zh('了快要开学', 'le kuàiyào kāixué')], correcta: 0,
        pista: '<p>No olvides la palabra que cierra el molde.</p>',
        solucion: `<p>${zh("快要开学了", "kuàiyào kāixué le")}: ${zh("快要", "kuàiyào")} antes del verbo y ${zh("了", "le")} al final.</p>` },
      { tipo: 'opciones', enunciado: `<p>Quieres decir «dentro de un rato salgo de casa» con el molde de «estar por pasar» y la palabra ${zh("一会儿", "yíhuìr")}. ¿Qué frase sigue el consejo de la fuente?</p>`,
        opciones: [zh('我一会儿快要出门了', 'wǒ yíhuìr kuàiyào chūmén le'), zh('我一会儿就要出门了', 'wǒ yíhuìr jiù yào chūmén le'), zh('我一会儿出门', 'wǒ yíhuìr chūmén'), zh('我一会儿出门要了', 'wǒ yíhuìr chūmén yào le')], correcta: 1,
        pista: '<p>Con palabras de inmediatez suele usarse ' + zh("就要", "jiù yào") + '; ' + zh("快要", "kuàiyào") + ' normalmente no las acompaña.</p>',
        solucion: `<p>${zh("我一会儿就要出门了", "wǒ yíhuìr jiù yào chūmén le")}: ${zh("一会儿", "yíhuìr")} va con ${zh("就要…了", "jiù yào…le")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '电影要开始了' },
        sinAudio: '<p>Se dice <strong>diànyǐng yào kāishǐ le</strong>: dian cae; yǐng baja y sube; yào cae; kāi es alto y plano; shǐ baja y sube; le es breve y sin tono.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice?</p>',
        opciones: ['La película ya terminó', 'La película ya va a empezar', 'Quiero ver una película', 'Mañana hay película'], correcta: 1,
        pista: '<p>Fíjate en la sílaba breve del final.</p>',
        solucion: `<p>Se oye ${zh("电影要开始了", "diànyǐng yào kāishǐ le")}: ${zh("要", "yào")} + ${zh("开始", "kāishǐ")} + ${zh("了", "le")}.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("生日", "shēngrì")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['shēng rì'],
        pista: '<p>La primera es alta y plana; la segunda cae.</p>',
        solucion: `<p>${zh("生日", "shēngrì")}: <strong>shēng rì</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_YAOLE],
  });

  // ------------------------------------------------------------------
  const CHIN_DE = CHINGRAM('structural-particle-de-%e5%be%97', 'Structural particle de 得');

  L('Complemento de grado: 得', {
    objetivo: `Valorar cómo se hace una acción con ${zh("得", "de")} tras el verbo, y repetir el verbo cuando hay objeto.`,
    explicacion: `
      <p>«Mi hermano canta muy bien.» «Ella dibuja fatal.» Cuando hablas de deporte, de música o de baile no solo dices qué hace alguien, sino también cómo lo hace. Primero, las doce palabras de la lección. La voz de tu dispositivo puede sonar distinta de un hablante nativo; si dudas, manda el pinyin.</p>
      ${tabla([
        ['得', 'de', 'partícula que enlaza el verbo con su valoración'], ['跑', 'pǎo', 'correr'], ['跑步', 'pǎobù', 'correr, hacer footing'], ['游泳', 'yóuyǒng', 'nadar'],
        ['跳舞', 'tiàowǔ', 'bailar'], ['画', 'huà', 'dibujar, pintar'], ['运动', 'yùndòng', 'deporte, hacer deporte'], ['踢', 'tī', 'patear, jugar (fútbol)'],
        ['打', 'dǎ', 'golpear, jugar (baloncesto)'], ['真', 'zhēn', 'de verdad, muy'], ['好听', 'hǎotīng', 'agradable de oír'], ['经常', 'jīngcháng', 'a menudo'],
      ])}
      <h3>¿Cómo digo qué tan bien se hace algo?</h3>
      <p>Se pone ${zh("得", "de")} justo después del verbo y, detrás, la valoración. A esa valoración la llamamos <strong>complemento</strong>. Según ChinGram, de la Universidad Palacký, la posición de «${zh("得", "de")} + complemento» es después del verbo o adjetivo que modifica, y ese complemento describe cómo se hace la acción, ahora o en el pasado. Las frases de ejemplo de la lección son nuestras.</p>
      ${G({
        x: [0, 10], y: [-1, 5], ejes: false,
        descripcion: 'Esquema de tres cajas en fila, unidas por flechas de izquierda a derecha. La primera caja dice «verbo», con la palabra pǎo. La segunda caja dice «partícula», con la palabra de. La tercera caja dice «cómo», con las palabras hěn hǎo.',
        figuras: [
          caja(0.3, 1.5, 2.8, 3.5), caja(3.8, 1.5, 6.2, 3.5), caja(7.2, 1.5, 9.7, 3.5),
          lin([2.8, 2.5], [3.8, 2.5]), lin([3.5, 2.7], [3.8, 2.5]), lin([3.5, 2.3], [3.8, 2.5]),
          lin([6.2, 2.5], [7.2, 2.5]), lin([6.9, 2.7], [7.2, 2.5]), lin([6.9, 2.3], [7.2, 2.5]),
          txt(1.55, 2.9, 'pǎo'), txt(1.55, 2, 'verbo'), txt(5, 2.9, 'de'), txt(5, 2, 'partícula'), txt(8.45, 2.9, 'hěn hǎo'), txt(8.45, 2, 'cómo'),
        ],
      })}
      <p>${zh("他跑得很好", "tā pǎo de hěn hǎo")} es «corre muy bien»: el verbo ${zh("跑", "pǎo")}, luego ${zh("得", "de")} y por último ${zh("很好", "hěn hǎo")}. Igual: ${zh("你唱得真好听", "nǐ chàng de zhēn hǎotīng")}, «cantas de verdad bonito», ${zh("她跳舞跳得真好", "tā tiàowǔ tiào de zhēn hǎo")}, «baila de verdad bien». El ejemplo de la fuente es ${zh("哥哥唱得很好听", "gēge chàng de hěn hǎotīng")}: «mi hermano canta muy bonito».</p>
      <h3>¿Y si hay un objeto?</h3>
      <p>ChinGram explica que, si el verbo tiene objeto, el verbo se repite después del objeto y luego van ${zh("得", "de")} y el complemento: verbo + objeto + verbo + ${zh("得", "de")} + complemento. Compara:</p>
      ${cuadro(['Sin objeto', 'Con objeto'], [
        [zh("他跑得很好", "tā pǎo de hěn hǎo") + '<br>«corre muy bien»', zh("她说中文说得很好", "tā shuō Zhōngwén shuō de hěn hǎo") + '<br>«habla chino muy bien»'],
        [zh("你唱得真好听", "nǐ chàng de zhēn hǎotīng") + '<br>«cantas muy bonito»', zh("我弟弟踢足球踢得很好", "wǒ dìdi tī zúqiú tī de hěn hǎo") + '<br>«mi hermano menor juega muy bien al fútbol»'],
      ])}
      <p>Otras frases del mismo molde: ${zh("她游泳游得不错", "tā yóuyǒng yóu de búcuò")}, «nada bastante bien», y ${zh("他画得很好", "tā huà de hěn hǎo")}, «dibuja muy bien», sin nombrar el objeto. Para lo que haces a menudo, ${zh("经常", "jīngcháng")} va antes del verbo: ${zh("我经常跑步", "wǒ jīngcháng pǎobù")}, «corro a menudo». Para una valoración negativa se usa ${zh("不", "bù")} antes del adjetivo, simplificación de la lección: ${zh("他跑得不好", "tā pǎo de bù hǎo")}, «no corre bien».</p>
      <p>Con ${zh("运动", "yùndòng")} hablas del deporte en general: ${zh("我经常运动", "wǒ jīngcháng yùndòng")}, «hago deporte a menudo». Con ${zh("打", "dǎ")} se juega a baloncesto: ${zh("他打篮球打得不错", "tā dǎ lánqiú dǎ de búcuò")}, «juega bastante bien al baloncesto».</p>
      <p>Una aclaración rápida sobre el sonido de la partícula: ${zh("得", "de")} suena igual que ${zh("的", "de")}, la de "Posesión con ${zh("的")}" (simplificación de la lección). Se distinguen por su lugar: ${zh("得", "de")} va tras el verbo y la valoración la sigue.</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("得", "de")} tras el objeto, sin repetir el verbo. ${zh("他说中文得很好", "tā shuō Zhōngwén de hěn hǎo")} está mal; se dice ${zh("他说中文说得很好", "tā shuō Zhōngwén shuō de hěn hǎo")}.</p>`,
    ejemplo: `
      <p>Ana habla de deportes con Luis. Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Ana dice ${zh("我弟弟经常跑步", "wǒ dìdi jīngcháng pǎobù")}. ${zh("经常", "jīngcháng")} va antes del verbo.</li>
        <li>Quiere valorarlo: ${zh("他跑得很好", "tā pǎo de hěn hǎo")}. Pone ${zh("得", "de")} detrás de ${zh("跑", "pǎo")} y la valoración al final.</li>
        <li>Luego habla de fútbol, que lleva objeto: ${zh("他踢足球踢得真好", "tā tī zúqiú tī de zhēn hǎo")}. Repite ${zh("踢", "tī")} antes de ${zh("得", "de")}.</li>
        <li>Luis añade: ${zh("你唱得真好听", "nǐ chàng de zhēn hǎotīng")}, y Ana ríe y contesta ${zh("我唱得不好", "wǒ chàng de bù hǎo")}.</li>
      </ol>
      <p>Comprueba: con objeto, el verbo sale dos veces; sin objeto, una. Resultado: <span class="resultado">${zh("他踢足球踢得真好", "tā tī zúqiú tī de zhēn hǎo")} = «juega de verdad muy bien al fútbol»</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir ${zh("的", "de")} en lugar de ${zh("得", "de")}. Suenan igual, pero ${zh("得", "de")} es la que sigue al verbo.</p>`,
    vidaReal: `
      <p>Valorar cómo se hacen las cosas sirve en muchas conversaciones:</p>
      <ul>
        <li>Felicitar a una amiga porque nada o baila muy bien.</li>
        <li>Contarle a alguien lo bien que juega tu hermano al fútbol.</li>
        <li>Decir con modestia que cantas regular, sin presumir.</li>
        <li>Hablar de qué deporte haces a menudo y cómo te sale cada vez que lo practicas.</li>
        <li>Contarle a un entrenador cómo te fue en una carrera, por ejemplo si corriste bien o no tan bien.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «corre muy bien».</p>',
        respuesta: ['他', '跑', '得', '很', '好'], pinyin: ['tā', 'pǎo', 'de', 'hěn', 'hǎo'], lang: 'zh-Hans',
        pista: '<p>' + zh("得", "de") + ' va justo después del verbo.</p>',
        solucion: `<p>${zh("他跑得很好", "tā pǎo de hěn hǎo")}: verbo, ${zh("得", "de")} y valoración.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «mi hermano menor juega muy bien al fútbol».</p>',
        respuesta: ['我弟弟', '踢', '足球', '踢', '得', '很好'], pinyin: ['wǒ dìdi', 'tī', 'zúqiú', 'tī', 'de', 'hěn hǎo'], lang: 'zh-Hans',
        pista: '<p>Hay objeto: el verbo se repite.</p>',
        solucion: `<p>${zh("我弟弟踢足球踢得很好", "wǒ dìdi tī zúqiú tī de hěn hǎo")}: verbo, objeto, verbo otra vez, ${zh("得", "de")} y valoración.</p>` },
      { tipo: 'opciones', enunciado: '<p>Elige la frase correcta para «ella habla muy bien chino».</p>',
        opciones: [zh('她说中文得很好', 'tā shuō Zhōngwén de hěn hǎo'), zh('她说中文说得很好', 'tā shuō Zhōngwén shuō de hěn hǎo'), zh('她得说中文很好', 'tā de shuō Zhōngwén hěn hǎo'), zh('她说得中文很好', 'tā shuō de Zhōngwén hěn hǎo')], correcta: 1,
        pista: '<p>' + zh("中文", "Zhōngwén") + ' es el objeto: ¿qué pasa con el verbo?</p>',
        solucion: `<p>${zh("她说中文说得很好", "tā shuō Zhōngwén shuō de hěn hǎo")}: se repite ${zh("说", "shuō")} y luego va ${zh("得", "de")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Quieres decir «no canta bien». ¿Qué frase eliges?</p>`,
        opciones: [zh('她不唱得好', 'tā bù chàng de hǎo'), zh('她唱得不好', 'tā chàng de bù hǎo'), zh('她唱不得好', 'tā chàng bù de hǎo'), zh('她得唱不好', 'tā de chàng bù hǎo')], correcta: 1,
        pista: '<p>La negación va antes de la valoración, después de ' + zh("得", "de") + '.</p>',
        solucion: `<p>${zh("她唱得不好", "tā chàng de bù hǎo")}: ${zh("不", "bù")} niega la valoración (simplificación de la lección).</p>` },
      { tipo: 'opciones', escucha: { voz: '你唱得真好听' },
        sinAudio: '<p>Se dice <strong>nǐ chàng de zhēn hǎotīng</strong>: nǐ baja y sube; chàng cae; de es breve y sin tono; zhēn es alto y plano; hǎo baja y sube; tīng es alto y plano.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice?</p>',
        opciones: ['Cantas de verdad bonito', 'No cantas bien', '¿Quieres cantar?', 'Corres de verdad bien'], correcta: 0,
        pista: '<p>Fíjate en el verbo y en la última palabra.</p>',
        solucion: `<p>Se oye ${zh("你唱得真好听", "nǐ chàng de zhēn hǎotīng")}: ${zh("唱", "chàng")} + ${zh("得", "de")} + valoración.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("游泳", "yóuyǒng")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['yóu yǒng'],
        pista: '<p>La primera sube; la segunda baja y sube.</p>',
        solucion: `<p>${zh("游泳", "yóuyǒng")}: <strong>yóu yǒng</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_DE],
  });

  // --- Lecciones 5 a 8: segundo constructor ---

  // --- Lecciones 9 a 12: tercer constructor ---

  // ------------------------------------------------------------------
  const CHIN_RESULTADO = CHINGRAM('resultative-complement', 'Resultative complement');

  L('Resultado de una acción: 完, 好, 懂 y 错', {
    objetivo: `Decir cómo terminó una acción con ${zh("完", "wán")}, ${zh("好", "hǎo")}, ${zh("懂", "dǒng")} o ${zh("错", "cuò")} pegados al verbo, y negarla con ${zh("没", "méi")}.`,
    explicacion: `
      <p>«Ya terminé la tarea.» «No entendí la palabra.» «Escribí mal tu nombre.» En español estas ideas necesitan una frase aparte, pero en chino basta una palabrita pegada al verbo que cuenta cómo salió la acción. Primero, las doce palabras de la lección. La voz de tu dispositivo puede sonar distinta de un hablante nativo; si dudas, manda el pinyin.</p>
      ${tabla([
        ['完', 'wán', 'terminar (resultado)'], ['懂', 'dǒng', 'entender'], ['错', 'cuò', 'equivocado, mal'], ['题', 'tí', 'pregunta, ejercicio'],
        ['词', 'cí', 'palabra'], ['考', 'kǎo', 'examinar, tener examen'], ['洗', 'xǐ', 'lavar'], ['打开', 'dǎkāi', 'abrir'],
        ['听见', 'tīngjiàn', 'oír, percibir un sonido'], ['告诉', 'gàosu', 'decir a alguien, avisar'], ['记得', 'jìde', 'acordarse, recordar'], ['教', 'jiāo', 'enseñar'],
      ])}
      <h3>¿Cómo digo cómo terminó la acción?</h3>
      <p>Según ChinGram, de la Universidad Palacký, el complemento de resultado es un elemento pegado al verbo que indica el resultado de la acción. A eso lo llamamos <strong>resultado</strong>. Entre el verbo y el resultado no cabe nada: ${zh("做", "zuò")} + ${zh("完", "wán")} se lee como una sola palabra (simplificación de la lección). Las frases de ejemplo de la lección son nuestras.</p>
      <p>ChinGram da, entre otros, estos cuatro resultados:</p>
      ${cuadro(['Verbo + resultado', 'Qué dice'], [
        [zh("看完", "kàn wán"), '«terminar de ver o de leer»: ' + zh("完", "wán") + ' marca el fin de la actividad'],
        [zh("听懂", "tīng dǒng"), '«entender lo que oyes»: ' + zh("懂", "dǒng") + ' marca la comprensión'],
        [zh("写错", "xiě cuò"), '«escribir mal»: ' + zh("错", "cuò") + ' marca un resultado incorrecto'],
        [zh("做好", "zuò hǎo"), '«dejar hecho»: ' + zh("好", "hǎo") + ' marca que la acción quedó completa'],
      ])}
      <p>Con esas piezas armas frases enteras: ${zh("我做完题了", "wǒ zuò wán tí le")}, «terminé los ejercicios»; ${zh("这个字你写错了", "zhège zì nǐ xiě cuò le")}, «escribiste mal este carácter»; ${zh("饭做好了", "fàn zuò hǎo le")}, «la comida ya está lista». Con ${zh("准备", "zhǔnbèi")} también sirve: ${zh("我准备好了", "wǒ zhǔnbèi hǎo le")}, «ya estoy listo». El ${zh("了", "le")} del final es el de "Acción terminada: ${zh("了")}".</p>
      <p>Ya habías visto un caso en la unidad anterior: ${zh("看见", "kànjiàn")} es mirar y llegar a ver. ${zh("听见", "tīngjiàn")} funciona igual con el oído: oír y llegar a percibir el sonido (simplificación de la lección). Y ${zh("打开", "dǎkāi")} también junta una acción y su resultado (simplificación de la lección): ${zh("他打开了门", "tā dǎkāi le mén")}, «abrió la puerta».</p>
      <h3>¿Y si no lo logré?</h3>
      <p>Se pone ${zh("没", "méi")} (o ${zh("没有", "méiyǒu")}) antes del verbo. ChinGram aclara que en la negación se omite ${zh("了", "le")}. Así, ${zh("我听懂了", "wǒ tīng dǒng le")} es «entendí» y ${zh("我没听懂", "wǒ méi tīng dǒng")} es «no entendí». La fuente pone un matiz útil: con ${zh("没听懂", "méi tīng dǒng")} la persona sí oyó, pero no captó el sentido. Otro ejemplo: ${zh("我没看完", "wǒ méi kàn wán")}, «no terminé de verlo».</p>
      <p class="nota"><strong>Trampa común:</strong> separar el resultado del verbo o dejar el ${zh("了", "le")} al negar. No se dice ${zh("我听没懂", "wǒ tīng méi dǒng")} ni ${zh("我没听懂了", "wǒ méi tīng dǒng le")}; el orden es ${zh("没", "méi")} + verbo + resultado.</p>
      <h3>¿Y si pregunto?</h3>
      <p>Se añade ${zh("吗", "ma")} al final: ${zh("你听懂了吗", "nǐ tīng dǒng le ma")}, «¿entendiste?». La respuesta corta repite verbo y resultado: ${zh("听懂了", "tīng dǒng le")} o ${zh("没听懂", "méi tīng dǒng")}. Con el resto del vocabulario puedes decir ${zh("老师教我们汉语", "lǎoshī jiāo wǒmen hànyǔ")}, «la maestra nos enseña chino», ${zh("我记得这个词", "wǒ jìde zhège cí")}, «me acuerdo de esta palabra», o ${zh("我告诉妈妈了", "wǒ gàosu māma le")}, «ya se lo dije a mamá».</p>`,
    ejemplo: `
      <p>Luis estudia para el examen y habla con Ana. Seguimos la conversación.</p>
      <ol class="pasos-ej">
        <li>Ana pregunta: ${zh("你做完题了吗", "nǐ zuò wán tí le ma")}. Pone ${zh("完", "wán")} pegado a ${zh("做", "zuò")} para saber si la tarea terminó.</li>
        <li>Luis contesta: ${zh("我做完了", "wǒ zuò wán le")}. Repite verbo y resultado, y cierra con ${zh("了", "le")}.</li>
        <li>Luego Ana pregunta por el profesor: ${zh("你听懂了吗", "nǐ tīng dǒng le ma")}. Luis dice: ${zh("我没听懂这个词", "wǒ méi tīng dǒng zhège cí")}. Pone ${zh("没", "méi")} antes del verbo y quita ${zh("了", "le")}.</li>
        <li>Ana revisa su hoja y avisa: ${zh("这个字你写错了", "zhège zì nǐ xiě cuò le")}.</li>
      </ol>
      <p>Comprueba: cada resultado va pegado al verbo, y la negación lleva ${zh("没", "méi")} sin ${zh("了", "le")}. Resultado: <span class="resultado">${zh("我没听懂这个词", "wǒ méi tīng dǒng zhège cí")} = «no entendí esta palabra»</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que ${zh("完", "wán")} y ${zh("好", "hǎo")} son lo mismo. ${zh("看完", "kàn wán")} dice que terminaste; ${zh("做好", "zuò hǎo")} dice que quedó listo.</p>`,
    vidaReal: `
      <p>Hablar del resultado de lo que haces sirve para:</p>
      <ul>
        <li>Avisar a tu familia de que ya terminaste la tarea y puedes salir a jugar.</li>
        <li>Decirle con calma a un profesor que no entendiste una palabra.</li>
        <li>Señalar a un amigo que se equivocó al escribir tu nombre.</li>
        <li>Avisar en casa de que la comida ya quedó lista.</li>
        <li>Preguntar a un compañero si entendió la explicación antes del examen.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «terminé los ejercicios».</p>',
        respuesta: ['我', '做', '完', '题', '了'], pinyin: ['wǒ', 'zuò', 'wán', 'tí', 'le'], lang: 'zh-Hans',
        alternativas: [['题', '我', '做', '完', '了']],
        pista: '<p>' + zh("完", "wán") + ' va pegado al verbo y ' + zh("了", "le") + ' cierra la frase.</p>',
        solucion: `<p>${zh("我做完题了", "wǒ zuò wán tí le")}: verbo, resultado, objeto y ${zh("了", "le")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «no entendí esta palabra».</p>',
        respuesta: ['我', '没', '听', '懂', '这个词'], pinyin: ['wǒ', 'méi', 'tīng', 'dǒng', 'zhège cí'], lang: 'zh-Hans',
        alternativas: [['这个词', '我', '没', '听', '懂']],
        pista: '<p>' + zh("没", "méi") + ' va antes del verbo y no hay ' + zh("了", "le") + '.</p>',
        solucion: `<p>${zh("我没听懂这个词", "wǒ méi tīng dǒng zhège cí")}: ${zh("没", "méi")} + verbo + resultado.</p>` },
      { tipo: 'opciones', enunciado: '<p>Elige la frase correcta para «escribiste mal este carácter».</p>',
        opciones: [zh('这个字你写错了', 'zhège zì nǐ xiě cuò le'), zh('这个字你写了错', 'zhège zì nǐ xiě le cuò'), zh('这个字你错写了', 'zhège zì nǐ cuò xiě le'), zh('这个字错你写了', 'zhège zì cuò nǐ xiě le')], correcta: 0,
        pista: '<p>El resultado va justo después del verbo.</p>',
        solucion: `<p>${zh("这个字你写错了", "zhège zì nǐ xiě cuò le")}: ${zh("写", "xiě")} + ${zh("错", "cuò")} van pegados.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «no terminé de ver la película». ¿Qué frase eliges?</p>',
        opciones: [zh('我看完没电影', 'wǒ kàn wán méi diànyǐng'), zh('我没看电影完', 'wǒ méi kàn diànyǐng wán'), zh('我没看完电影', 'wǒ méi kàn wán diànyǐng'), zh('我没完看电影', 'wǒ méi wán kàn diànyǐng')], correcta: 2,
        pista: '<p>La negación va antes del verbo y el resultado se queda pegado a él.</p>',
        solucion: `<p>${zh("我没看完电影", "wǒ méi kàn wán diànyǐng")}: ${zh("没", "méi")} + ${zh("看完", "kàn wán")} + objeto.</p>` },
      { tipo: 'opciones', escucha: { voz: '我听懂了' },
        sinAudio: '<p>Se dice <strong>wǒ tīng dǒng le</strong>: wǒ baja y sube; tīng empieza alto y se mantiene; dǒng baja y sube; le es breve y sin tono.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice?</p>',
        opciones: ['Entendí lo que oí', 'No entendí lo que oí', 'Terminé de ver la película', 'Escribí mal el carácter'], correcta: 0,
        pista: '<p>Fíjate en si oyes ' + zh("没", "méi") + ' y en cuál es el resultado.</p>',
        solucion: `<p>Se oye ${zh("我听懂了", "wǒ tīng dǒng le")}: hay ${zh("懂", "dǒng")} y no hay ${zh("没", "méi")}.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("告诉", "gàosu")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['gào su'],
        pista: '<p>La primera sílaba cae; la segunda es breve y sin tono.</p>',
        solucion: `<p>${zh("告诉", "gàosu")}: <strong>gào su</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_RESULTADO],
  });

  // ------------------------------------------------------------------
  const CHIN_SIMPLE = CHINGRAM('simple-directional-complement', 'Simple directional complement');
  const CHIN_COMPUESTO = CHINGRAM('compound-directional-complement', 'Compound directional complement');

  L('Ir y venir tras el verbo: 来 y 去', {
    objetivo: `Decir si un movimiento se acerca o se aleja de quien habla con ${zh("来", "lái")} y ${zh("去", "qù")} pegados a ${zh("进", "jìn")}, ${zh("出", "chū")}, ${zh("回", "huí")}, ${zh("上", "shàng")}, ${zh("下", "xià")} o ${zh("过", "guò")}.`,
    explicacion: `
      <p>Imagina que estás en tu cuarto y alguien llama a la puerta. Si le dices «pasa», esa persona viene hacia ti. Si en cambio estás en el pasillo y le dices «pasa» a tu hermano, él se aleja de ti. En español usamos el mismo verbo; en chino, una palabrita final avisa hacia dónde va el movimiento respecto a quien habla. Primero, las doce palabras de la lección. La voz de tu dispositivo puede sonar distinta de un hablante nativo; si dudas, manda el pinyin.</p>
      ${tabla([
        ['进', 'jìn', 'entrar'], ['出', 'chū', 'salir'], ['进来', 'jìnlái', 'entrar (hacia quien habla)'], ['进去', 'jìnqù', 'entrar (alejándose de quien habla)'],
        ['出来', 'chūlái', 'salir (hacia quien habla)'], ['出去', 'chūqù', 'salir (alejándose de quien habla)'], ['回来', 'huílái', 'volver (hacia quien habla)'], ['回去', 'huíqù', 'volver (alejándose de quien habla)'],
        ['上来', 'shànglái', 'subir (hacia quien habla)'], ['下去', 'xiàqù', 'bajar (alejándose de quien habla)'], ['过来', 'guòlái', 'venir hacia acá'], ['楼', 'lóu', 'edificio, piso'],
      ])}
      <h3>¿Qué hacen ${zh("来", "lái")} y ${zh("去", "qù")} después de otro verbo?</h3>
      <p>Ya los conoces como verbos: ${zh("来", "lái")} es «venir» y ${zh("去", "qù")} es «ir». Según ChinGram, de la Universidad Palacký, cuando van detrás de otro verbo dejan de ser el verbo principal y se vuelven un complemento de <strong>dirección</strong>: ${zh("来", "lái")} marca un movimiento que se acerca a quien habla y ${zh("去", "qù")} uno que se aleja de ahí. Las frases de ejemplo de la lección son nuestras.</p>
      ${G({
        x: [0, 10], y: [-1, 5], ejes: false,
        descripcion: 'Dibujo de una persona de pie en el centro, hecha de líneas, con la etiqueta «tú, quien habla». A su izquierda, una flecha que apunta hacia ella con la etiqueta «lái, se acerca». A su derecha, una flecha que sale de ella hacia el borde con la etiqueta «qù, se aleja».',
        figuras: [
          { tipo: 'circulo', x: 5, y: 3.2, r: 0.4 }, lin([5, 2.8], [5, 1.6]), lin([4.4, 2.4], [5.6, 2.4]), lin([5, 1.6], [4.5, 0.8]), lin([5, 1.6], [5.5, 0.8]),
          lin([0.5, 2.2], [4, 2.2]), lin([3.6, 2.5], [4, 2.2]), lin([3.6, 1.9], [4, 2.2]),
          lin([6, 2.2], [9.5, 2.2]), lin([9.1, 2.5], [9.5, 2.2]), lin([9.1, 1.9], [9.5, 2.2]),
          txt(2.2, 3, 'lái, se acerca'), txt(7.8, 3, 'qù, se aleja'), txt(5, -0.5, 'tú, quien habla'),
        ],
      })}
      <h3>¿Qué verbos van delante?</h3>
      <p>ChinGram da la lista: ${zh("上", "shàng")} «arriba», ${zh("下", "xià")} «abajo», ${zh("进", "jìn")} «adentro», ${zh("出", "chū")} «afuera» y ${zh("回", "huí")} «de vuelta». Con ${zh("来", "lái")} o ${zh("去", "qù")} forman parejas: ${zh("进来", "jìnlái")} y ${zh("进去", "jìnqù")}, ${zh("出来", "chūlái")} y ${zh("出去", "chūqù")}, ${zh("回来", "huílái")} y ${zh("回去", "huíqù")}. La fuente añade ${zh("过来", "guòlái")}, «venir hacia acá». Esas parejas dicen la dirección y también si el movimiento se acerca o se aleja.</p>
      ${cuadro(['Quien habla está…', 'Dice', 'Significa'], [
        ['dentro del cuarto', zh("请进来", "qǐng jìnlái"), '«pasa» (se acerca a mí)'],
        ['fuera del cuarto', zh("你进去吧", "nǐ jìnqù ba"), '«pasa tú» (se aleja de mí)'],
        ['en casa', zh("他回来了", "tā huílái le"), '«ya volvió» (llega donde estoy)'],
        ['en la escuela', zh("我回去了", "wǒ huíqù le"), '«me voy de vuelta» (me alejo)'],
      ])}
      <p>Un aviso, que es una simplificación de la lección: según ChinGram, ${zh("来", "lái")} y ${zh("去", "qù")} en este uso suenan normalmente en tono neutro, así que al hablar la segunda sílaba suele sonar breve. Aquí dejamos el pinyin completo del sílabo.</p>
      <h3>¿Dónde va el lugar?</h3>
      <p>Si dices a dónde, el lugar va entre el verbo y ${zh("来", "lái")} o ${zh("去", "qù")}. ChinGram lo muestra con ${zh("回家去", "huí jiā qù")}, «volver a casa». Así: ${zh("她下楼来了", "tā xià lóu lái le")}, «ella baja hacia acá», y ${zh("他上楼去了", "tā shàng lóu qù le")}, «él subió, alejándose». Con el compuesto, el lugar se mete en medio de las dos partes.</p>
      <p class="nota"><strong>Trampa común:</strong> poner el lugar al final, como en español. No se dice ${zh("他回来家了", "tā huílái jiā le")}; se dice ${zh("他回家来了", "tā huí jiā lái le")}. Otra trampa es olvidar que cuenta quién habla: la misma salida es ${zh("出去", "chūqù")} si hablas desde dentro y ${zh("出来", "chūlái")} si hablas desde fuera.</p>
      <p>Para preguntar se usa ${zh("吗", "ma")}: ${zh("你明天回来吗", "nǐ míngtiān huílái ma")}, «¿vuelves mañana?». Para negar, mira "Negar con ${zh("不")}".</p>`,
    ejemplo: `
      <p>Ana llega a casa de Luis, que la espera dentro del cuarto. Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Ana toca y se queda en la puerta. Luis la quiere cerca de él y dice ${zh("请进来", "qǐng jìnlái")}. Usa ${zh("来", "lái")} porque Ana se acerca a quien habla.</li>
        <li>Luego Luis, que se queda en el cuarto, le pide a Ana que espere fuera: ${zh("你出去吧", "nǐ chūqù ba")}. Ana se aleja de quien habla, así que usa ${zh("去", "qù")}.</li>
        <li>Ana dice que se va a casa: ${zh("我回家去了", "wǒ huí jiā qù le")}. El lugar ${zh("家", "jiā")} va entre ${zh("回", "huí")} y ${zh("去", "qù")}.</li>
        <li>Al día siguiente promete: ${zh("我明天回来", "wǒ míngtiān huílái")}.</li>
      </ol>
      <p>Comprueba: ${zh("来", "lái")} cuando el movimiento llega hacia quien habla, ${zh("去", "qù")} cuando sale, y el lugar en medio. Resultado: <span class="resultado">${zh("我回家去了", "wǒ huí jiā qù le")} = «me voy de vuelta a casa»</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que ${zh("来", "lái")} y ${zh("去", "qù")} dependen del lugar y no de quién habla. Lo decide la posición de quien habla.</p>`,
    vidaReal: `
      <p>Indicar hacia dónde va un movimiento sirve para:</p>
      <ul>
        <li>Invitar a un amigo a pasar a tu casa cuando llama a la puerta.</li>
        <li>Pedirle a tu hermano que baje del piso de arriba a cenar.</li>
        <li>Avisar en la escuela de que ya te vas de vuelta a casa.</li>
        <li>Prometerle a alguien que regresas mañana.</li>
        <li>Entender si una persona se acerca o se aleja cuando alguien lo cuenta.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «él volvió a casa» (se aleja de quien habla).</p>',
        respuesta: ['他', '回', '家', '去', '了'], pinyin: ['tā', 'huí', 'jiā', 'qù', 'le'], lang: 'zh-Hans',
        pista: '<p>El lugar va entre ' + zh("回", "huí") + ' y ' + zh("去", "qù") + '.</p>',
        solucion: `<p>${zh("他回家去了", "tā huí jiā qù le")}: verbo, lugar, ${zh("去", "qù")} y ${zh("了", "le")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «ella baja hacia acá».</p>',
        respuesta: ['她', '下', '楼', '来', '了'], pinyin: ['tā', 'xià', 'lóu', 'lái', 'le'], lang: 'zh-Hans',
        pista: '<p>' + zh("来", "lái") + ' va después del lugar.</p>',
        solucion: `<p>${zh("她下楼来了", "tā xià lóu lái le")}: ${zh("下", "xià")}, lugar y ${zh("来", "lái")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>Estás dentro de una habitación y quieres invitar a Luis, que está en la puerta, a pasar. ¿Qué dices?</p>',
        opciones: [zh('请进来', 'qǐng jìnlái'), zh('请进去', 'qǐng jìnqù'), zh('请出来', 'qǐng chūlái'), zh('请出去', 'qǐng chūqù')], correcta: 0,
        pista: '<p>Luis entra y se acerca a ti, que hablas.</p>',
        solucion: `<p>${zh("请进来", "qǐng jìnlái")}: ${zh("进", "jìn")} es entrar y ${zh("来", "lái")} lo acerca a quien habla.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «subió, alejándose de mí». ¿Qué frase eliges?</p>',
        opciones: [zh('他上去楼了', 'tā shàngqù lóu le'), zh('他楼上去了', 'tā lóu shàng qù le'), zh('他上楼去了', 'tā shàng lóu qù le'), zh('他去上楼了', 'tā qù shàng lóu le')], correcta: 2,
        pista: '<p>El lugar se mete entre el verbo y ' + zh("去", "qù") + '.</p>',
        solucion: `<p>${zh("他上楼去了", "tā shàng lóu qù le")}: ${zh("上", "shàng")}, lugar y ${zh("去", "qù")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '你进去吧' },
        sinAudio: '<p>Se dice <strong>nǐ jìnqù ba</strong>: nǐ baja y sube; jìn cae; qù cae (al hablar suele sonar breve); ba es breve y sin tono.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice quien habla?</p>',
        opciones: ['Entra tú, yo me quedo aquí', 'Pasa, ven hacia mí', 'Sal tú, yo me quedo aquí', 'Mañana vuelvo'], correcta: 0,
        pista: '<p>Fíjate en la última sílaba del verbo y en si es entrar o salir.</p>',
        solucion: `<p>Se oye ${zh("你进去吧", "nǐ jìnqù ba")}: ${zh("进去", "jìnqù")} es entrar alejándose de quien habla.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("出去", "chūqù")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['chū qù'],
        pista: '<p>La primera sílaba es alta y plana; la segunda cae.</p>',
        solucion: `<p>${zh("出去", "chūqù")}: <strong>chū qù</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_SIMPLE, CHIN_COMPUESTO],
  });

  // ------------------------------------------------------------------
  const CHIN_SHIDE = CHINGRAM('emphasising-specific-detailswith-shi-de-%e6%98%af%e7%9a%84', 'Emphasising specific details with shì … de 是……的');

  L('Destacar cuándo, dónde y cómo: 是…的', {
    objetivo: `Preguntar y decir cuándo, cómo, dónde o con quién ocurrió algo ya sabido, enmarcando el dato con ${zh("是", "shì")} y ${zh("的", "de")}.`,
    explicacion: `
      <p>Un amigo te dice «llegué ayer». Ya sabes que llegó; lo que quieres saber es cómo: ¿en metro, en autobús, a pie? Cuando lo importante no es la acción sino un detalle, el chino marca ese detalle con una pareja de palabras. Primero, las doce palabras de la lección. La voz de tu dispositivo puede sonar distinta de un hablante nativo; si dudas, manda el pinyin.</p>
      ${tabla([
        ['从', 'cóng', 'desde (tiempo o lugar de origen)'], ['跟', 'gēn', 'con (la persona que acompaña)'], ['一起', 'yìqǐ', 'juntos'], ['地铁', 'dìtiě', 'metro'],
        ['公交车', 'gōngjiāochē', 'autobús urbano'], ['打车', 'dǎchē', 'tomar un taxi'], ['走路', 'zǒulù', 'caminar, ir a pie'], ['出租车', 'chūzūchē', 'taxi'],
        ['车站', 'chēzhàn', 'estación, parada'], ['怎么', 'zěnme', 'cómo, de qué manera'], ['往', 'wǎng', 'hacia (una dirección)'], ['教室', 'jiàoshì', 'salón de clases'],
      ])}
      <h3>¿Cómo se destaca un detalle?</h3>
      <p>Según ChinGram, de la Universidad Palacký, la estructura ${zh("是…的", "shì…de")} permite destacar información como cuándo, dónde, cómo o con quién ocurrió la acción. A eso lo llamamos <strong>énfasis</strong>. ${zh("是", "shì")} va antes de lo que quieres destacar y ${zh("的", "de")} suele ir al final de la frase. Las frases de ejemplo de la lección son nuestras.</p>
      <p>Fíjate en el molde con una pregunta y su respuesta: ${zh("你是怎么来的", "nǐ shì zěnme lái de")}, «¿cómo viniste?», y ${zh("我是坐地铁来的", "wǒ shì zuò dìtiě lái de")}, «vine en metro». Lo destacado, ${zh("坐地铁", "zuò dìtiě")}, queda justo después de ${zh("是", "shì")}. Según la fuente, se usa sobre todo con acciones ya ocurridas o conocidas, cuando quien habla quiere resaltar o preguntar una circunstancia.</p>
      ${cuadro(['Qué destacas', 'Pregunta', 'Respuesta'], [
        ['cuándo', zh("你是什么时候来的", "nǐ shì shénme shíhou lái de"), zh("我是昨天来的", "wǒ shì zuótiān lái de") + ' «vine ayer»'],
        ['cómo', zh("你是怎么来的", "nǐ shì zěnme lái de"), zh("我是走路来的", "wǒ shì zǒulù lái de") + ' «vine a pie»'],
        ['con quién', zh("你是跟谁一起来的", "nǐ shì gēn shéi yìqǐ lái de"), zh("我是跟朋友一起来的", "wǒ shì gēn péngyou yìqǐ lái de") + ' «vine con un amigo»'],
        ['desde dónde', zh("你是从哪儿来的", "nǐ shì cóng nǎr lái de"), zh("我是从学校来的", "wǒ shì cóng xuéxiào lái de") + ' «vine desde la escuela»'],
      ])}
      <p>El sílabo explica que ${zh("从", "cóng")} introduce el tiempo o el lugar, que ${zh("跟", "gēn")} introduce a la otra persona implicada y que ${zh("往", "wǎng")} introduce una dirección o un trayecto, como en ${zh("往前走", "wǎng qián zǒu")}, «sigue hacia adelante». Para el medio de transporte sirven ${zh("公交车", "gōngjiāochē")}, ${zh("出租车", "chūzūchē")} y ${zh("打车", "dǎchē")}: ${zh("她是打车来的", "tā shì dǎchē lái de")}, «ella vino en taxi», y ${zh("他是在车站等我的", "tā shì zài chēzhàn děng wǒ de")}, «me esperó en la estación». El lugar se marca con ${zh("在", "zài")} (simplificación de la lección).</p>
      <h3>¿Siempre hace falta ${zh("是", "shì")}?</h3>
      <p>No. ChinGram dice que en una frase afirmativa se puede omitir ${zh("是", "shì")}, sobre todo al hablar o cuando el contexto aclara el énfasis. Así, ${zh("我坐地铁来的", "wǒ zuò dìtiě lái de")} también es «vine en metro». En cambio, ${zh("的", "de")} se queda. Este ${zh("的", "de")} es distinto del de "Posesión con ${zh("的")}" (simplificación de la lección).</p>
      <h3>¿Y para negar?</h3>
      <p>Se pone ${zh("不", "bù")} antes de ${zh("是", "shì")}, como en "Negar con ${zh("不")}". La fuente aclara que esa negación niega el detalle destacado y no el hecho entero. ${zh("我不是坐公交车来的", "wǒ bù shì zuò gōngjiāochē lái de")} dice que viniste, pero no en autobús. Se escribe ${zh("不", "bù")}, pero ante ${zh("是", "shì")} se dice bú, como en "Cambios de tono: el tercer tono, ${zh("不")} y ${zh("一")}".</p>
      <p class="nota"><strong>Trampa común:</strong> dejar ${zh("的", "de")} fuera o poner ${zh("是", "shì")} en el lugar equivocado. Sin ${zh("的", "de")}, ${zh("我是坐地铁来", "wǒ shì zuò dìtiě lái")} suena incompleta (simplificación de la lección). Y ${zh("是", "shì")} va antes del detalle, no antes del verbo: ${zh("我坐是地铁来的", "wǒ zuò shì dìtiě lái de")} está mal.</p>`,
    ejemplo: `
      <p>Ana llega a la escuela y Luis le hace preguntas. Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Luis ya sabe que Ana llegó. Lo que quiere saber es el medio, así que pregunta ${zh("你是怎么来的", "nǐ shì zěnme lái de")}. Pone ${zh("怎么", "zěnme")} después de ${zh("是", "shì")}.</li>
        <li>Ana contesta: ${zh("我是坐地铁来的", "wǒ shì zuò dìtiě lái de")}. Lo destacado, ${zh("坐地铁", "zuò dìtiě")}, va entre ${zh("是", "shì")} y ${zh("的", "de")}.</li>
        <li>Luis sigue: ${zh("你是跟谁一起来的", "nǐ shì gēn shéi yìqǐ lái de")}. Ana: ${zh("我是跟妈妈一起来的", "wǒ shì gēn māma yìqǐ lái de")}.</li>
        <li>Luis cree que vino en autobús y Ana lo corrige: ${zh("我不是坐公交车来的", "wǒ bù shì zuò gōngjiāochē lái de")}.</li>
      </ol>
      <p>Comprueba: ${zh("是", "shì")} abre el detalle, ${zh("的", "de")} cierra la frase y la negación va antes de ${zh("是", "shì")}. Resultado: <span class="resultado">${zh("我是坐地铁来的", "wǒ shì zuò dìtiě lái de")} = «vine en metro»</span>.</p>
      <p class="nota"><strong>Error común:</strong> traducir la frase como «yo soy metro». Aquí ${zh("是", "shì")} no es «ser»: solo señala qué parte es la importante.</p>`,
    vidaReal: `
      <p>Preguntar por los detalles de algo que ya pasó sirve para:</p>
      <ul>
        <li>Saber cómo llegó un compañero a la escuela esta mañana.</li>
        <li>Preguntar con quién fue tu amiga a la fiesta de cumpleaños.</li>
        <li>Averiguar cuándo se compró alguien su teléfono nuevo, si ya lo trae.</li>
        <li>Aclarar que viniste en transporte público y no en coche.</li>
        <li>Contar de dónde sales cuando llegas tarde a una cita con tus amigos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «vine en metro».</p>',
        respuesta: ['我', '是', '坐', '地铁', '来', '的'], pinyin: ['wǒ', 'shì', 'zuò', 'dìtiě', 'lái', 'de'], lang: 'zh-Hans',
        pista: '<p>' + zh("是", "shì") + ' va antes del medio de transporte y ' + zh("的", "de") + ' al final.</p>',
        solucion: `<p>${zh("我是坐地铁来的", "wǒ shì zuò dìtiě lái de")}: el detalle queda entre ${zh("是", "shì")} y ${zh("的", "de")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «¿con quién viniste?».</p>',
        respuesta: ['你', '是', '跟', '谁', '一起', '来', '的'], pinyin: ['nǐ', 'shì', 'gēn', 'shéi', 'yìqǐ', 'lái', 'de'], lang: 'zh-Hans',
        pista: '<p>' + zh("跟", "gēn") + ' lleva a la persona, y ' + zh("一起", "yìqǐ") + ' va después, antes del verbo.</p>',
        solucion: `<p>${zh("你是跟谁一起来的", "nǐ shì gēn shéi yìqǐ lái de")}: ${zh("是", "shì")} abre el detalle y ${zh("的", "de")} cierra.</p>` },
      { tipo: 'opciones', enunciado: '<p>Elige la pregunta correcta para «¿cómo viniste?».</p>',
        opciones: [zh('你是怎么来的', 'nǐ shì zěnme lái de'), zh('你怎么是来的', 'nǐ zěnme shì lái de'), zh('你是来怎么的', 'nǐ shì lái zěnme de'), zh('是你怎么来', 'shì nǐ zěnme lái')], correcta: 0,
        pista: '<p>' + zh("是", "shì") + ' va antes de lo que preguntas, y ' + zh("的", "de") + ' cierra la frase.</p>',
        solucion: `<p>${zh("你是怎么来的", "nǐ shì zěnme lái de")}: ${zh("怎么", "zěnme")} queda justo después de ${zh("是", "shì")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «no vine en autobús». ¿Qué frase eliges?</p>',
        opciones: [zh('我没是坐公交车来的', 'wǒ méi shì zuò gōngjiāochē lái de'), zh('我不坐是公交车来的', 'wǒ bù zuò shì gōngjiāochē lái de'), zh('我不是坐公交车来的', 'wǒ bù shì zuò gōngjiāochē lái de'), zh('我是不坐公交车的来', 'wǒ shì bù zuò gōngjiāochē de lái')], correcta: 2,
        pista: '<p>La negación va justo antes de ' + zh("是", "shì") + '.</p>',
        solucion: `<p>${zh("我不是坐公交车来的", "wǒ bù shì zuò gōngjiāochē lái de")}: niega el detalle, no que hayas venido.</p>` },
      { tipo: 'opciones', escucha: { voz: '我是跟朋友一起来的' },
        sinAudio: '<p>Se dice <strong>wǒ shì gēn péngyou yìqǐ lái de</strong>: wǒ baja y sube; shì cae; gēn es alto y plano; péngyou sube y termina breve; yìqǐ cae y luego baja y sube; lái sube; de es breve y sin tono.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice?</p>',
        opciones: ['Vine con un amigo', 'Vine en metro', 'No vine con nadie', '¿Con quién viniste?'], correcta: 0,
        pista: '<p>Fíjate en la persona que se nombra.</p>',
        solucion: `<p>Se oye ${zh("我是跟朋友一起来的", "wǒ shì gēn péngyou yìqǐ lái de")}: ${zh("跟朋友", "gēn péngyou")} es el detalle destacado.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("车站", "chēzhàn")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['chē zhàn'],
        pista: '<p>La primera sílaba es alta y plana; la segunda cae.</p>',
        solucion: `<p>${zh("车站", "chēzhàn")}: <strong>chē zhàn</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_SHIDE],
  });

  // ------------------------------------------------------------------
  const CHIN_YIJIU = CHINGRAM('pattern-yi-jiu-%e4%b8%80-%e5%b0%b1-as-soon-as-then-whenever', 'Sentence with yī…… jiù…… 一……就……');

  L('En cuanto: 一…就…', {
    objetivo: `Decir que una acción sigue de inmediato a otra con ${zh("一", "yī")} antes de la primera y ${zh("就", "jiù")} antes de la segunda, y contar costumbres con ellas.`,
    explicacion: `
      <p>«En cuanto salgo de clase, me voy a casa.» «Cada vez que llueve, me duele la cabeza.» En español usamos «en cuanto» o «cada vez que». En chino se hace con dos palabras cortas que abren cada acción. Primero, las doce palabras de la lección. La voz de tu dispositivo puede sonar distinta de un hablante nativo; si dudas, manda el pinyin.</p>
      ${tabla([
        ['每', 'měi', 'cada'], ['有时', 'yǒushí', 'a veces'], ['上网', 'shàngwǎng', 'conectarse a internet'], ['网上', 'wǎngshang', 'en internet'],
        ['帮', 'bāng', 'ayudar'], ['帮忙', 'bāngmáng', 'echar una mano'], ['送', 'sòng', 'regalar, acompañar'], ['介绍', 'jièshào', 'presentar, explicar'],
        ['高中', 'gāozhōng', 'preparatoria, bachillerato'], ['班', 'bān', 'clase, grupo de alumnos'], ['小时候', 'xiǎoshíhou', 'cuando era niño'], ['从小', 'cóngxiǎo', 'desde pequeño'],
      ])}
      <h3>¿Cómo se pegan dos acciones?</h3>
      <p>Según ChinGram, de la Universidad Palacký, el molde ${zh("一…就…", "yī…jiù…")} muestra que una acción ocurre inmediatamente después de otra: «en cuanto…, entonces…». A eso lo llamamos <strong>dos acciones seguidas</strong>. ${zh("一", "yī")} abre la primera acción y ${zh("就", "jiù")} la segunda, cada una antes de su verbo. Las frases de ejemplo de la lección son nuestras.</p>
      <p>${zh("我一下课就回家", "wǒ yī xiàkè jiù huí jiā")} es «en cuanto termina la clase, me voy a casa». Y ${zh("他一到家就上网", "tā yī dào jiā jiù shàngwǎng")} es «en cuanto llega a casa, se conecta a internet». Un aviso, que es una simplificación de la lección: ${zh("一", "yī")} aquí se escribe con su tono original, pero ante un cuarto tono, como ${zh("下", "xià")} o ${zh("到", "dào")}, se dice yí y ante los otros tres tonos, yì, como en "Cambios de tono: el tercer tono, ${zh("不")} y ${zh("一")}".</p>
      ${G({
        x: [0, 10], y: [-1, 5], ejes: false,
        descripcion: 'Línea de tiempo horizontal con una flecha hacia la derecha. Hay dos marcas verticales cercanas: la primera marcada como «yī, primera acción» y la segunda, a su derecha, marcada como «jiù, segunda acción». Sobre ellas hay un corchete corto con la etiqueta «casi sin pausa».',
        figuras: [
          lin([0.5, 2], [9.5, 2]), lin([9, 2.3], [9.5, 2]), lin([9, 1.7], [9.5, 2]),
          lin([3, 1.5], [3, 2.5]), lin([5, 1.5], [5, 2.5]),
          lin([3, 3], [5, 3]), lin([3, 2.8], [3, 3.2]), lin([5, 2.8], [5, 3.2]),
          txt(3, 0.8, 'yī, primera acción'), txt(5.4, 0.1, 'jiù, segunda acción'), txt(4, 3.7, 'casi sin pausa'),
        ],
      })}
      <h3>¿Y si cambia quién actúa?</h3>
      <p>Pueden actuar la misma persona o dos distintas. ChinGram dice que, con dos sujetos, el segundo va inmediatamente antes de ${zh("就", "jiù")}: ${zh("我一回家，妈妈就做饭", "wǒ yī huí jiā, māma jiù zuò fàn")}, «en cuanto llego a casa, mamá cocina». Cada ${zh("一", "yī")} y cada ${zh("就", "jiù")} se queda pegado a su verbo (o adjetivo): ${zh("他一累就睡觉", "tā yī lèi jiù shuìjiào")}, «en cuanto se cansa, se duerme».</p>
      <h3>¿Y si es una costumbre?</h3>
      <p>La fuente dice que en una situación habitual el sentido es «cada vez que». ${zh("我小时候一下雨就生病", "wǒ xiǎoshíhou yī xià yǔ jiù shēngbìng")} es «de niño, cada vez que llovía me enfermaba». ${zh("小时候", "xiǎoshíhou")} es «cuando era niño», y ${zh("从小", "cóngxiǎo")} es «desde pequeño»: ${zh("他从小爱唱歌", "tā cóngxiǎo ài chàng gē")}.</p>
      ${cuadro(['Frecuencia', 'Significado', 'Ejemplo'], [
        [zh("每天", "měitiān"), 'todos los días', zh("我每天上网", "wǒ měitiān shàngwǎng")],
        [zh("经常", "jīngcháng"), 'a menudo', zh("她经常帮忙", "tā jīngcháng bāngmáng")],
        [zh("有时", "yǒushí"), 'a veces', zh("我有时在网上看电影", "wǒ yǒushí zài wǎngshang kàn diànyǐng")],
      ])}
      <p>Otras palabras de la lección sirven igual: ${zh("我们班的同学", "wǒmen bān de tóngxué")} son «los compañeros de nuestro grupo»; ${zh("请你介绍一下", "qǐng nǐ jièshào yíxià")} es «preséntate, por favor»; ${zh("我生日，朋友送我一本书", "wǒ shēngrì, péngyou sòng wǒ yī běn shū")} es «en mi cumpleaños, mi amigo me regaló un libro».</p>
      <p class="nota"><strong>Trampa común:</strong> olvidar ${zh("就", "jiù")} o poner ${zh("一", "yī")} antes del sujeto. Se dice ${zh("我一下课就回家", "wǒ yī xiàkè jiù huí jiā")}, no ${zh("一我下课回家", "yī wǒ xiàkè huí jiā")}.</p>
      <h3>Cierre de la unidad</h3>
      <p>Con esta lección terminas «HSK 2 · Gramática». Mira cuántos puntos caben en pocas frases:</p>
      <ul>
        <li>${zh("虽然今天很冷，但是我是走路来的", "suīrán jīntiān hěn lěng, dànshì wǒ shì zǒulù lái de")}: «aunque hoy hace frío, vine a pie».</li>
        <li>${zh("我一到教室，老师就告诉我们明天就要考试了", "wǒ yī dào jiàoshì, lǎoshī jiù gàosu wǒmen míngtiān jiù yào kǎoshì le")}: «en cuanto llego al salón, la maestra nos avisa que mañana hay examen».</li>
        <li>${zh("因为我准备好了，所以我考得很好", "yīnwèi wǒ zhǔnbèi hǎo le, suǒyǐ wǒ kǎo de hěn hǎo")}: «como me preparé, me fue muy bien».</li>
        <li>${zh("这个比那个便宜，你要这个还是那个", "zhège bǐ nàge piányi, nǐ yào zhège háishi nàge")}: «este es más barato que aquel, ¿cuál quieres?».</li>
        <li>${zh("门开着，请进来", "mén kāi zhe, qǐng jìnlái")}: «la puerta está abierta, pasa».</li>
      </ul>
      <p>La lista de palabras de nivel 2 se completa en «HSK 2 · Situaciones».</p>`,
    ejemplo: `
      <p>Ana cuenta su rutina a Luis. Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Ana dice cuál es su primera acción del día: ${zh("我一起床就喝水", "wǒ yī qǐchuáng jiù hē shuǐ")}. Pone ${zh("一", "yī")} antes de ${zh("起床", "qǐchuáng")} y ${zh("就", "jiù")} antes de ${zh("喝", "hē")}.</li>
        <li>Habla de su hermano, con otro sujeto: ${zh("我弟弟一回家就看电视", "wǒ dìdi yī huí jiā jiù kàn diànshì")}.</li>
        <li>Luis quiere decir que cuando Ana habla, él se ríe: ${zh("我一说话，他就笑", "wǒ yī shuōhuà, tā jiù xiào")}. Aquí cambia el sujeto y va justo antes de ${zh("就", "jiù")}.</li>
        <li>Por último, Ana cuenta una costumbre: ${zh("我一累就睡觉", "wǒ yī lèi jiù shuìjiào")}, «cada vez que me canso, duermo».</li>
      </ol>
      <p>Comprueba: ${zh("一", "yī")} abre la primera acción, ${zh("就", "jiù")} la segunda, y la segunda sigue enseguida. Resultado: <span class="resultado">${zh("我一起床就喝水", "wǒ yī qǐchuáng jiù hē shuǐ")} = «en cuanto me levanto, tomo agua»</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que ${zh("就", "jiù")} solo significa «entonces» y ponerlo al final. Va antes del segundo verbo.</p>`,
    vidaReal: `
      <p>Contar lo que pasa «en cuanto» otra cosa sirve para:</p>
      <ul>
        <li>Explicar tu rutina de la mañana a un amigo de otro país.</li>
        <li>Decir que en cuanto llegas a casa, haces la tarea o juegas.</li>
        <li>Contar qué te pasa cada vez que te sientes cansado o llueve.</li>
        <li>Prometer a tu familia que los llamas en cuanto llegues a un lugar.</li>
        <li>Contar que, en cuanto suena el timbre de la escuela, todos salen corriendo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «en cuanto termino la clase, me voy a casa».</p>',
        respuesta: ['我', '一', '下课', '就', '回家'], pinyin: ['wǒ', 'yī', 'xiàkè', 'jiù', 'huí jiā'], lang: 'zh-Hans',
        alternativas: [['一', '下课', '我', '就', '回家']],
        pista: '<p>' + zh("一", "yī") + ' va antes del primer verbo y ' + zh("就", "jiù") + ' antes del segundo.</p>',
        solucion: `<p>${zh("我一下课就回家", "wǒ yī xiàkè jiù huí jiā")}: sujeto, ${zh("一", "yī")}, verbo, ${zh("就", "jiù")} y verbo.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «en cuanto llego a casa, mamá cocina».</p>',
        respuesta: ['我', '一', '回家', '妈妈', '就', '做饭'], pinyin: ['wǒ', 'yī', 'huí jiā', 'māma', 'jiù', 'zuò fàn'], lang: 'zh-Hans',
        pista: '<p>El segundo sujeto va justo antes de ' + zh("就", "jiù") + '.</p>',
        solucion: `<p>${zh("我一回家，妈妈就做饭", "wǒ yī huí jiā, māma jiù zuò fàn")}: ${zh("妈妈", "māma")} queda antes de ${zh("就", "jiù")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>Elige la frase correcta para «en cuanto llega a casa, se conecta a internet».</p>',
        opciones: [zh('他到家一就上网', 'tā dào jiā yī jiù shàngwǎng'), zh('一他到家就上网', 'yī tā dào jiā jiù shàngwǎng'), zh('他一到家就上网', 'tā yī dào jiā jiù shàngwǎng'), zh('他一就到家上网', 'tā yī jiù dào jiā shàngwǎng')], correcta: 2,
        pista: '<p>Cada palabra va justo antes de su verbo.</p>',
        solucion: `<p>${zh("他一到家就上网", "tā yī dào jiā jiù shàngwǎng")}: ${zh("一", "yī")} antes de ${zh("到", "dào")} y ${zh("就", "jiù")} antes de ${zh("上网", "shàngwǎng")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «de niño, cada vez que llovía me enfermaba». ¿Qué frase eliges?</p>',
        opciones: [zh('我小时候一下雨生病', 'wǒ xiǎoshíhou yī xià yǔ shēngbìng'), zh('我一小时候下雨就生病', 'wǒ yī xiǎoshíhou xià yǔ jiù shēngbìng'), zh('我小时候下雨一就生病', 'wǒ xiǎoshíhou xià yǔ yī jiù shēngbìng'), zh('我小时候一下雨就生病', 'wǒ xiǎoshíhou yī xià yǔ jiù shēngbìng')], correcta: 3,
        pista: '<p>La palabra de tiempo va al inicio, y luego ' + zh("一", "yī") + ' y ' + zh("就", "jiù") + ' van pegados a sus verbos.</p>',
        solucion: `<p>${zh("我小时候一下雨就生病", "wǒ xiǎoshíhou yī xià yǔ jiù shēngbìng")}: en una costumbre, significa «cada vez que».</p>` },
      { tipo: 'opciones', escucha: { voz: '他一累就睡觉' },
        sinAudio: '<p>Se dice <strong>tā yī lèi jiù shuìjiào</strong>: tā es alto y plano; yī suena yí, sube; lèi cae; jiù cae; shuì cae; jiào cae.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice?</p>',
        opciones: ['En cuanto se cansa, se duerme', 'Duerme todos los días', 'Está cansado y no duerme', 'A veces se duerme'], correcta: 0,
        pista: '<p>Fíjate en las dos palabras que unen las acciones.</p>',
        solucion: `<p>Se oye ${zh("他一累就睡觉", "tā yī lèi jiù shuìjiào")}: ${zh("一", "yī")} ... ${zh("就", "jiù")} pega «cansarse» y «dormir».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("帮忙", "bāngmáng")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['bāng máng'],
        pista: '<p>La primera sílaba es alta y plana; la segunda sube.</p>',
        solucion: `<p>${zh("帮忙", "bāngmáng")}: <strong>bāng máng</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_YIJIU],
  });
})();
