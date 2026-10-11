// Mandarín · Unidad 4: HSK 1 · Acciones y lugares.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Todo carácter chino sale de zh(). Las frases de ejemplo («…») son de la lección; solo las palabras vienen del sílabo.
// Sin grabaciones: ningún `audio:`; solo la voz del sistema.
(function () {
  const G = window.grafica;
  const zh = window.zh;
  const L = (titulo, datos) => window.registrarLeccion('mandarin', titulo, datos);
  // Tabla de vocabulario: palabra con su botón y significado.
  const tabla = (filas) => `<div class="tabla-wrap"><table><tr><th scope="col">Palabra</th><th scope="col">Significado</th></tr>${filas.map(([h, p, es]) => `<tr><td>${zh(h, p)}</td><td>${es}</td></tr>`).join('')}</table></div>`;
  const txt = (x, y, texto) => ({ tipo: 'texto', x, y, texto });
  const lin = (desde, hasta) => ({ tipo: 'linea', desde, hasta });
  const caja = (x1, y1, x2, y2) => ({ tipo: 'poligono', puntos: [[x1, y1], [x2, y1], [x2, y2], [x1, y2]] });

  const SILABO = { nombre: 'Centro de Educación y Cooperación Lingüística (China), «HSK 考试大纲», sílabo del HSK 3.0 (2025)', url: 'https://hsk.cn-bj.ufileos.com/3.0/新版HSK考试大纲1219.pdf' };
  const CHINGRAM = (ruta, nombre) => ({ nombre: `Universidad Palacký de Olomouc (Chequia) y socios, ChinGram: ${nombre} (en inglés)`, url: `https://chingram.upol.cz/grammar/${ruta}` });
  const CHIN_LE1 = CHINGRAM('aspectual-particle-le%e4%ba%86-1', 'Aspectual particle le 了1');
  const CHIN_LE2 = CHINGRAM('modal-particle-le-%e4%ba%862', 'Modal particle le 了2');
  const CHIN_YOUDIAN = CHINGRAM('adverb-you-yi-dianr-%e6%9c%89-%e4%b8%80%e7%82%b9%e5%84%bf-%e6%9c%89-%e4%b8%80%e9%bb%9e%e5%85%92-a-little-a-bit', 'Adverb yǒu (yì) diǎn(r) 有(一)点(儿)');
  const CHIN_ZAI = CHINGRAM('the-progressive-marker-zai-%e5%9c%a8', 'Progressive aspect marker zài 在');
  const CHIN_NENG = CHINGRAM('comparison%ef%bc%9amodal-verb-neng-%e8%83%bd-can-hui-%e4%bc%9a-can-know-how-to-and-keyi-%e5%8f%af%e4%bb%a5-may-can-be-al', 'Comparison, modal verbs néng 能, huì 会 and kěyǐ 可以');
  const CHIN_HUI = CHINGRAM('modal-verb-hui-%e4%bc%9a-%e6%9c%83-can-know-how-to-or-will', 'Modal verb huì 会');
  const CHIN_DIAN = CHINGRAM('comparison-yidianr-%e4%b8%80%e7%82%b9%e5%84%bf-and-yixiar-%e4%b8%80%e4%b8%8b%e5%84%bf', 'Comparison, yìdiǎn(r) 一点(儿) and yíxià(r) 一下(儿)');
  const CHIN_XIA = CHINGRAM('verbal-measure-word-yixiar-%e4%b8%80%e4%b8%8b%e5%84%bf', 'Verbal measure word yíxià(r) 一下(儿)');
  const CHIN_POS = CHINGRAM('location-words', 'Location words');
  const CHIN_HAY = CHINGRAM('verb-you-%e6%9c%89-there-is-there-are', 'Verb yǒu 有 (there is, there are)');
  const CHIN_ORD = CHINGRAM('ordinal-number', 'Ordinal number');
  const CHIN_PREP = CHINGRAM('preposition-zai-%e5%9c%a8-%ef%bc%88%e5%a4%84%e6%89%80%ef%bc%89', 'Preposition zài 在');
  const MSU_UBIC = { nombre: 'Wenying Zhou, Universidad Estatal de Míchigan (EE. UU.), Elementary Chinese II: Lesson 13 Dialogue 1 (en inglés)', url: 'https://openbooks.lib.msu.edu/chs102/chapter/lesson-13-dialogue-1-%e9%97%ae%e8%b7%af/' };
  const MSU_FAM = { nombre: 'Wenying Zhou, Universidad Estatal de Míchigan (EE. UU.), Elementary Chinese I: Lesson 2 Dialogue 2, Talking About Family Members (en inglés)', url: 'https://openbooks.lib.msu.edu/chs101/chapter/lesson-3b-talking-about-a-family-photo/' };
  const MSU_AMIGO = { nombre: 'Wenying Zhou, Universidad Estatal de Míchigan (EE. UU.), Elementary Chinese I: Lesson 6 Dialogue 2, Calling a Friend (en inglés)', url: 'https://openbooks.lib.msu.edu/chs101/chapter/lesson-6-dialogue-2-2/' };
  const MSU_CLASE = { nombre: 'Wenying Zhou, Universidad Estatal de Míchigan (EE. UU.), Elementary Chinese I: Chinese Characters (en inglés)', url: 'https://openbooks.lib.msu.edu/chs101/chapter/chinese-characters/' };

  // Escena de la lección 5: una mesa con un objeto encima o debajo (y, opcionalmente, una caja con objetos dentro y fuera).
  const mesa = (objeto) => [
    lin([0.5, 2], [4.5, 2]), lin([0.8, 2], [0.8, 0]), lin([4.2, 2], [4.2, 0]),
    ...(objeto === 'encima' ? [caja(2, 2, 3, 2.7)] : objeto === 'debajo' ? [caja(2, 0, 3, 0.7)] : []),
  ];

  // ------------------------------------------------------------------
  L('Acción terminada: 了', {
    objetivo: `Decir que una acción ya se completó con ${zh("了", "le")}, negarla con ${zh("没", "méi")} y preguntarla con ${zh("吗", "ma")}.`,
    explicacion: `
      <p>Cuando cuentas lo que hiciste ayer, en español cambias el verbo: «veo» pasa a «vi». En chino el verbo no cambia de forma. Para decir que algo ya quedó hecho se le pone una palabrita detrás. Primero, las doce palabras de la lección. La voz de tu dispositivo puede sonar distinta de un hablante nativo; si dudas, manda el pinyin.</p>
      ${tabla([
        ['了', 'le', 'marca que la acción quedó hecha'], ['看', 'kàn', 'ver, mirar'], ['听', 'tīng', 'escuchar'], ['写', 'xiě', 'escribir'],
        ['读', 'dú', 'leer en voz alta, leer'], ['说', 'shuō', 'decir, hablar'], ['学习', 'xuéxí', 'estudiar'], ['做', 'zuò', 'hacer'],
        ['去年', 'qùnián', 'el año pasado'], ['电影', 'diànyǐng', 'película'], ['电视', 'diànshì', 'televisión'], ['字', 'zì', 'carácter, letra'],
      ])}
      <h3>¿Cómo digo que algo ya se hizo?</h3>
      <p>Se pone ${zh("了", "le")} justo después del verbo. Con ella dices que la acción se completó, y a eso lo llamamos una <strong>acción terminada</strong>. Fíjate en que ${zh("了", "le")} no significa «pasado». Según ChinGram, de la Universidad Palacký, marca que la acción ocurrió o se completó, y esa acción puede estar en el pasado, en el presente o en el futuro. En esta lección los ejemplos van en pasado, porque son cosas que ya hiciste. Las frases de ejemplo de la lección son nuestras.</p>
      <p>El molde es: quien hace la acción, el verbo, ${zh("了", "le")} y lo que se hizo. ${zh("我昨天看了电影", "wǒ zuótiān kàn le diànyǐng")} es «ayer vi una película». ${zh("昨天", "zuótiān")} lo conoces de "Fechas y días de la semana".</p>
      ${G({
        x: [0, 10], y: [0, 3.6], ejes: false,
        descripcion: 'Línea de tiempo de izquierda a derecha. Una barra ancha representa la acción de ver: empieza en un punto marcado como «empieza» y termina en otro marcado como «se completa». Sobre el final de la barra, una raya señala el lugar donde se pone la palabra le.',
        figuras: [
          lin([0, 0.5], [10, 0.5]), txt(9.2, 0.15, 'tiempo'),
          caja(2, 1.4, 7, 2.2), txt(4.5, 1.8, 'kàn (ver)'),
          txt(2, 1.0, 'empieza'), txt(7, 1.0, 'se completa'),
          lin([7, 2.2], [7, 2.8]), txt(7, 3.2, 'le'),
        ],
      })}
      <p>Piensa en la acción como una barra: empieza, dura un rato y llega a su fin (es una imagen de la lección, no una regla de la fuente). ${zh("了", "le")} se coloca en ese fin, el momento en que la acción queda completa. Funciona con los verbos de la tabla: ${zh("听了", "tīng le")}, ${zh("写了", "xiě le")}, ${zh("读了", "dú le")}, ${zh("做了", "zuò le")}. Por ejemplo, ${zh("她去年读了这本书", "tā qùnián dú le zhè běn shū")}, «el año pasado leyó este libro», y ${zh("我写了三个字", "wǒ xiě le sān gè zì")}, «escribí tres caracteres».</p>
      <p>Compara con el español: en «leí» el pasado ya viene dentro del verbo. Por eso, en la lección decimos que el chino deja el verbo igual y deja que palabras como ${zh("昨天", "zuótiān")} o ${zh("去年", "qùnián")} digan cuándo fue. Así, en la frase del libro, ${zh("去年", "qùnián")} dice el cuándo y ${zh("了", "le")} dice que la acción quedó completa. Esta comparación es una simplificación de la lección.</p>
      <h3>¿Y si no lo hice?</h3>
      <p>Para decir que la acción no se hizo, se pone ${zh("没", "méi")} antes del verbo y ${zh("了", "le")} desaparece: ${zh("我没看电视", "wǒ méi kàn diànshì")}, «no vi la televisión». Es la misma ${zh("没", "méi")} de "Tener: ${zh("有")} y ${zh("没有")}". El porqué es sencillo: sin acción completada no hay nada que marcar.</p>
      <p class="nota"><strong>Trampa común:</strong> decir ${zh("我没看了", "wǒ méi kàn le")}. Si hay ${zh("没", "méi")}, no hay ${zh("了", "le")}. Lo correcto es ${zh("我没看", "wǒ méi kàn")}.</p>
      <h3>¿Y si pregunto?</h3>
      <p>Para preguntar se añade ${zh("吗", "ma")} al final de la frase con ${zh("了", "le")}: ${zh("你看了吗", "nǐ kàn le ma")}, «¿lo viste?». Se contesta repitiendo el verbo con ${zh("了", "le")}, ${zh("看了", "kàn le")}, o con ${zh("没", "méi")}, ${zh("没看", "méi kàn")}.</p>
      <p>Un último detalle: hay verbos formados por dos partes que se pueden separar. En esos casos ${zh("了", "le")} va después del verbo y antes del objeto. Lo verás en la próxima lección.</p>`,
    ejemplo: `
      <p>Ana le cuenta a Luis su día de ayer, y Luis le hace preguntas. Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Ana dice que vio una película: ${zh("我昨天看了电影", "wǒ zuótiān kàn le diànyǐng")}. Pone ${zh("了", "le")} después de ${zh("看", "kàn")} porque ya la terminó.</li>
        <li>Luis pregunta: ${zh("你看了吗", "nǐ kàn le ma")}. Es la misma frase corta más ${zh("吗", "ma")}.</li>
        <li>Para negar, Ana cambia de historia: ${zh("我没看电视", "wǒ méi kàn diànshì")}. Pone ${zh("没", "méi")} delante del verbo y quita ${zh("了", "le")}.</li>
        <li>Luego Ana dice qué más hizo: ${zh("我写了三个字", "wǒ xiě le sān gè zì")}.</li>
      </ol>
      <p>Comprueba: en cada frase afirmativa hay un verbo seguido de ${zh("了", "le")}, y en la negativa hay ${zh("没", "méi")} y ninguna ${zh("了", "le")}. Resultado: <span class="resultado">${zh("我没看电视", "wǒ méi kàn diànshì")} = «no vi la televisión»</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que ${zh("了", "le")} quiere decir «ayer». La palabra de tiempo es ${zh("昨天", "zuótiān")}; ${zh("了", "le")} solo dice que la acción quedó completa.</p>`,
    vidaReal: `
      <p>Decir qué ya hiciste sirve cada día:</p>
      <ul>
        <li>Contarle a un amigo qué película viste ayer.</li>
        <li>Responder si ya leíste un libro.</li>
        <li>Decir que ya hiciste la tarea.</li>
        <li>Preguntarle a alguien si ya escribió su nombre.</li>
        <li>Explicar que algo todavía no lo has hecho.</li>
        <li>Entender a quien cuenta su día sin confundirte con el tiempo del verbo.</li>
        <li>Escribir un mensaje corto para decir qué hiciste hoy.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «ayer vi una película».</p>',
        respuesta: ['我', '昨天', '看', '了', '电影'], pinyin: ['wǒ', 'zuótiān', 'kàn', 'le', 'diànyǐng'], lang: 'zh-Hans',
        alternativas: [['昨天', '我', '看', '了', '电影']],
        pista: '<p>' + zh("了", "le") + ' va justo después del verbo.</p>',
        solucion: `<p>${zh("我昨天看了电影", "wǒ zuótiān kàn le diànyǐng")}: ${zh("了", "le")} sigue a ${zh("看", "kàn")} porque la acción quedó completa.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «¿viste la película?».</p>',
        respuesta: ['你', '看', '了', '电影', '吗'], pinyin: ['nǐ', 'kàn', 'le', 'diànyǐng', 'ma'], lang: 'zh-Hans',
        pista: '<p>La pregunta termina con ' + zh("吗", "ma") + '.</p>',
        solucion: `<p>${zh("你看了电影吗", "nǐ kàn le diànyǐng ma")}: verbo, ${zh("了", "le")}, objeto y ${zh("吗", "ma")} al final.</p>` },
      { tipo: 'opciones', enunciado: '<p>Elige la frase correcta para «escribí tres caracteres».</p>',
        opciones: [zh('我了写三个字', 'wǒ le xiě sān gè zì'), zh('我写三了个字', 'wǒ xiě sān le gè zì'), zh('我写了三个字', 'wǒ xiě le sān gè zì'), zh('我写三个了字', 'wǒ xiě sān gè le zì')], correcta: 2,
        pista: '<p>Busca el verbo y pon ' + zh("了", "le") + ' pegada a él.</p>',
        solucion: `<p>${zh("我写了三个字", "wǒ xiě le sān gè zì")}: ${zh("了", "le")} va justo detrás de ${zh("写", "xiě")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>Elige la frase correcta para «ayer no vi la televisión».</p>',
        opciones: [zh('昨天我没看电视', 'zuótiān wǒ méi kàn diànshì'), zh('昨天我没看了电视', 'zuótiān wǒ méi kàn le diànshì'), zh('昨天我看没电视', 'zuótiān wǒ kàn méi diànshì'), zh('昨天我没了看电视', 'zuótiān wǒ méi le kàn diànshì')], correcta: 0,
        pista: '<p>Con ' + zh("没", "méi") + ' la acción no se hizo, así que no hay nada que marcar.</p>',
        solucion: `<p>${zh("昨天我没看电视", "zuótiān wǒ méi kàn diànshì")}: ${zh("没", "méi")} antes del verbo y sin ${zh("了", "le")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '我看了电视' },
        sinAudio: '<p>Se dice <strong>wǒ kàn le diànshì</strong>: wǒ baja y sube; kàn cae; le es breve y sin tono; diàn cae y shì cae.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice?</p>',
        opciones: ['No vi la televisión', 'Vi la televisión', '¿Viste la televisión?', 'Quiero ver la televisión'], correcta: 1,
        pista: '<p>Fíjate si oyes ' + zh("没", "méi") + ' o ' + zh("吗", "ma") + ' en la frase.</p>',
        solucion: `<p>Se oye ${zh("我看了电视", "wǒ kàn le diànshì")}: hay ${zh("了", "le")} y no hay ${zh("没", "méi")} ni ${zh("吗", "ma")}.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("电影", "diànyǐng")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['diàn yǐng'],
        pista: '<p>La primera sílaba cae; la segunda baja y sube.</p>',
        solucion: `<p>${zh("电影", "diànyǐng")}: <strong>diàn yǐng</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_LE1],
  });

  // ------------------------------------------------------------------
  L('Algo cambió: 了 al final de la frase', {
    objetivo: `Decir que una situación es nueva con ${zh("了", "le")} al final de la frase, y usarla con el clima, la edad y ${zh("太", "tài")}.`,
    explicacion: `
      <p>Mira por la ventana: hace un minuto había sol y ahora cae agua. Quieres avisar de que algo cambió. En chino también se usa ${zh("了", "le")}, pero en otro sitio. Antes, las doce palabras de la lección.</p>
      ${tabla([
        ['下雨', 'xià yǔ', 'llover'], ['雨', 'yǔ', 'lluvia'], ['雪', 'xuě', 'nieve'], ['天气', 'tiānqì', 'el tiempo, el clima'],
        ['病', 'bìng', 'enfermedad'], ['生病', 'shēngbìng', 'enfermarse'], ['晚', 'wǎn', 'tarde, tardío'], ['睡觉', 'shuìjiào', 'dormir'],
        ['休息', 'xiūxi', 'descansar'], ['回', 'huí', 'volver, regresar'], ['非常', 'fēicháng', 'muy, extremadamente'], ['有点儿', 'yǒudiǎnr', 'un poco (algo molesto)'],
      ])}
      <h3>¿Cómo aviso de que algo es nuevo?</h3>
      <p>En la lección anterior, ${zh("了", "le")} iba después del verbo. Ahora va al final de la frase y hace otra cosa: avisa de un <strong>cambio de situación</strong>, algo que antes no era así y ahora sí. Según ChinGram, esa ${zh("了", "le")} marca el paso de un estado a otro, una situación nueva. Por eso ${zh("下雨了", "xià yǔ le")} es «se puso a llover», y no «llovió».</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Antes</th><th scope="col">Ahora</th></tr>
        <tr><td>${zh("不下雨", "bù xià yǔ")}, no llueve</td><td>${zh("下雨了", "xià yǔ le")}, ya llueve</td></tr>
        <tr><td>${zh("她六岁", "tā liù suì")}, tiene seis años</td><td>${zh("她七岁了", "tā qī suì le")}, ya tiene siete</td></tr>
        <tr><td>${zh("天气不冷", "tiānqì bù lěng")}, no hace frío</td><td>${zh("天气冷了", "tiānqì lěng le")}, ya hace frío</td></tr>
      </table></div>
      <p>Con la edad ChinGram da ejemplos como ${zh("她八岁了", "tā bā suì le")}, «ya tiene ocho años»: cumplió años y la situación cambió. Es el ejemplo que dejó pendiente "Preguntar cantidades: ${zh("几")} y ${zh("多少")}".</p>
      <h3>Dos lugares, dos trabajos</h3>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Dónde va ${zh("了", "le")}</th><th scope="col">Qué dice</th><th scope="col">Ejemplo</th></tr>
        <tr><td>Después del verbo</td><td>La acción se completó</td><td>${zh("我看了电影", "wǒ kàn le diànyǐng")}</td></tr>
        <tr><td>Al final de la frase</td><td>La situación cambió</td><td>${zh("下雨了", "xià yǔ le")}</td></tr>
      </table></div>
      <p>Los verbos formados por dos partes, como ${zh("睡觉", "shuìjiào")}, se pueden separar: la ${zh("了", "le")} de acción terminada se pone tras el verbo y antes del objeto, ${zh("睡了觉", "shuì le jiào")}. Con el clima funciona igual que con la edad: ${zh("了", "le")} al final avisa de que el tiempo cambió, como en ${zh("下雨了", "xià yǔ le")}.</p>
      <p>Con las palabras de la tabla armas más avisos: ${zh("下雪了", "xià xuě le")}, «ya nieva»; ${zh("我回家了", "wǒ huí jiā le")}, «ya volví a casa»; y ${zh("我想休息了", "wǒ xiǎng xiūxi le")}, «ya quiero descansar». En los tres, antes la situación era otra.</p>
      <h3>Dos moldes útiles: ${zh("太")}…${zh("了")} y ${zh("不")}…${zh("了")}</h3>
      <p>Con ${zh("太", "tài")} y un adjetivo, ${zh("了", "le")} cierra la frase y dice que algo es excesivo, es decir, que se pasa de lo normal: ${zh("太晚了", "tài wǎn le")}, «ya es demasiado tarde». Con ${zh("不", "bù")} dice «ya no»: ${zh("我不去了", "wǒ bù qù le")}, «ya no voy», porque antes pensabas ir y ahora cambiaste de idea.</p>
      <p>Además, ${zh("非常", "fēicháng")} y ${zh("有点儿", "yǒudiǎnr")} van antes del adjetivo: ${zh("非常冷", "fēicháng lěng")}, «muy frío», y ${zh("有点儿冷", "yǒudiǎnr lěng")}, «un poco frío». Según ChinGram, ${zh("有点儿", "yǒudiǎnr")} suele expresar algo que no te gusta, por eso se usa más para quejarse.</p>
      <p class="nota"><strong>Trampa común:</strong> poner ${zh("了", "le")} en toda frase sobre el clima. ${zh("今天天气非常好", "jīntiān tiānqì fēicháng hǎo")} es «hoy el tiempo está muy bien» y no lleva ${zh("了", "le")}, porque no avisa de ningún cambio.</p>`,
    ejemplo: `
      <p>Una tarde de lluvia Luis y Ana se escriben. Ana cuenta tres cambios, uno tras otro.</p>
      <ol class="pasos-ej">
        <li>Ana mira la calle: ${zh("下雨了", "xià yǔ le")}. Antes no llovía y ahora sí, por eso lleva ${zh("了", "le")} al final.</li>
        <li>Luego decide quedarse: ${zh("我不去了", "wǒ bù qù le")}. Ya no va; cambió el plan.</li>
        <li>Mira el reloj: ${zh("太晚了", "tài wǎn le")}. Con ${zh("太", "tài")}, ${zh("了", "le")} cierra la frase.</li>
        <li>Y termina: ${zh("我想睡觉了", "wǒ xiǎng shuìjiào le")}. Antes no tenía sueño y ahora sí.</li>
        <li>Luis cuenta que su hermana creció: ${zh("她八岁了", "tā bā suì le")}.</li>
      </ol>
      <p>Comprueba: cada ${zh("了", "le")} está al final y avisa de algo nuevo. Resultado: <span class="resultado">${zh("下雨了", "xià yǔ le")} = «ya llueve»</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que ${zh("下雨了", "xià yǔ le")} cuenta algo del pasado. Dice que ahora la situación es distinta de antes.</p>`,
    vidaReal: `
      <p>Avisar de un cambio sirve todo el tiempo:</p>
      <ul>
        <li>Decir que empezó a llover o a nevar.</li>
        <li>Contar que ahora alguien tiene un año más.</li>
        <li>Avisar de que ya es tarde y quieres dormir.</li>
        <li>Decir que cambiaste de idea y ya no irás.</li>
        <li>Contar que un familiar se enfermó.</li>
        <li>Entender el pronóstico del tiempo.</li>
        <li>Decir que ya estás cansado y que vas a descansar un rato.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>En la frase ${zh("下雨了", "xià yǔ le")}, ¿qué dice ${zh("了", "le")}?</p>`,
        opciones: ['Que la lluvia terminó', 'Que ahora la situación es nueva: llueve', 'Que va a llover mañana', 'Que no llueve'], correcta: 1,
        pista: '<p>Piensa en lo que pasaba un minuto antes de la frase.</p>',
        solucion: `<p>${zh("了", "le")} al final avisa de un cambio: antes no llovía y ahora sí.</p>` },
      { tipo: 'opciones', enunciado: '<p>¿En cuál de estas frases ' + zh("了", "le") + ' avisa de un cambio de situación?</p>',
        opciones: [zh('我看了电视', 'wǒ kàn le diànshì'), zh('我写了字', 'wǒ xiě le zì'), zh('太晚了', 'tài wǎn le'), zh('我没看电视', 'wǒ méi kàn diànshì')], correcta: 2,
        pista: '<p>Busca la frase donde ' + zh("了", "le") + ' va al final.</p>',
        solucion: `<p>${zh("太晚了", "tài wǎn le")} termina con ${zh("了", "le")}; en las otras, ${zh("了", "le")} va tras el verbo o no hay.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «ya no voy».</p>',
        respuesta: ['我', '不', '去', '了'], pinyin: ['wǒ', 'bù', 'qù', 'le'], lang: 'zh-Hans',
        pista: '<p>' + zh("不", "bù") + ' va antes del verbo y ' + zh("了", "le") + ' cierra la frase.</p>',
        solucion: `<p>${zh("我不去了", "wǒ bù qù le")}: ${zh("不", "bù")} más ${zh("了", "le")} dice «ya no».</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «mi mamá se enfermó».</p>',
        respuesta: ['妈妈', '生病', '了'], pinyin: ['māma', 'shēngbìng', 'le'], lang: 'zh-Hans',
        pista: '<p>Quién, qué le pasó y, al final, la marca del cambio.</p>',
        solucion: `<p>${zh("妈妈生病了", "māma shēngbìng le")}: antes estaba bien y ahora no.</p>` },
      { tipo: 'opciones', escucha: { voz: '下雨了' },
        sinAudio: '<p>Se dice <strong>xià yǔ le</strong>: xià cae; yǔ baja y sube; le es breve y sin tono.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué avisa?</p>',
        opciones: ['Que hace sol', 'Que ya empezó a llover', 'Que quieres dormir', 'Que ya es tarde'], correcta: 1,
        pista: '<p>La primera palabra es «llover».</p>',
        solucion: `<p>Se oye ${zh("下雨了", "xià yǔ le")}, «ya llueve».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("天气", "tiānqì")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['tiān qì'],
        pista: '<p>La primera sílaba es alta y plana; la segunda cae.</p>',
        solucion: `<p>${zh("天气", "tiānqì")}: <strong>tiān qì</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_LE1, CHIN_LE2, CHIN_YOUDIAN],
  });

  // ------------------------------------------------------------------
  L('Acción en curso: 在 y 正在', {
    objetivo: `Decir lo que alguien está haciendo ahora con ${zh("在", "zài")} y ${zh("正在", "zhèngzài")}, y no confundirlo con ${zh("在", "zài")} de lugar.`,
    explicacion: `
      <p>Suena el teléfono y preguntas «¿qué haces?». Contestas «estoy comiendo» o «estoy haciendo la tarea». Esa acción está pasando en este momento. Estas son las once palabras de la lección.</p>
      ${tabla([
        ['正在', 'zhèngzài', 'justo ahora, en este momento'], ['做饭', 'zuò fàn', 'cocinar, preparar la comida'], ['打电话', 'dǎ diànhuà', 'hacer una llamada'], ['开车', 'kāichē', 'conducir'],
        ['上课', 'shàngkè', 'tener clase, empezar la clase'], ['上班', 'shàngbān', 'ir al trabajo'], ['唱', 'chàng', 'cantar'], ['歌', 'gē', 'canción'],
        ['玩', 'wán', 'jugar, divertirse'], ['工作', 'gōngzuò', 'trabajar'], ['说话', 'shuōhuà', 'hablar'],
      ])}
      <h3>Una palabra para «estar haciendo»</h3>
      <p>Ya conoces ${zh("在", "zài")} como «estar en» un lugar, en "Dónde está algo: ${zh("在")}". Ahora aparece delante de un verbo, y entonces dice que la acción está en marcha. A eso lo llamamos una <strong>acción en curso</strong>. Según ChinGram, es la forma más común de hablar de lo que pasa ahora. La frase de ejemplo ${zh("我在看电视", "wǒ zài kàn diànshì")} es «estoy viendo la televisión».</p>
      <p>Fíjate en la diferencia. En ${zh("我在家", "wǒ zài jiā")} hay un lugar detrás de ${zh("在", "zài")}; en ${zh("我在做饭", "wǒ zài zuò fàn")} hay un verbo. Es la misma palabra, y por eso conviene mirar qué viene después.</p>
      <p>Con las palabras nuevas armas más frases: ${zh("爸爸在开车", "bàba zài kāichē")}, «papá está conduciendo»; ${zh("我在唱歌", "wǒ zài chàng gē")}, «estoy cantando»; ${zh("哥哥在玩", "gēge zài wán")}, «mi hermano está jugando»; y ${zh("姐姐在上班", "jiějie zài shàngbān")}, «mi hermana está en el trabajo».</p>
      <h3>Tres maneras de decirlo</h3>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Molde</th><th scope="col">Ejemplo</th><th scope="col">Idea</th></tr>
        <tr><td>${zh("在", "zài")} + verbo</td><td>${zh("他在工作", "tā zài gōngzuò")}</td><td>Está trabajando.</td></tr>
        <tr><td>${zh("正在", "zhèngzài")} + verbo</td><td>${zh("妈妈正在打电话", "māma zhèngzài dǎ diànhuà")}</td><td>Está llamando justo ahora.</td></tr>
        <tr><td>… ${zh("呢", "ne")} al final</td><td>${zh("他在上课呢", "tā zài shàngkè ne")}</td><td>Sigue en clase.</td></tr>
      </table></div>
      <p>Según ChinGram, ${zh("正", "zhèng")} insiste en que es «ahora mismo». Y ${zh("呢", "ne")} al final es opcional: resalta que la acción continúa. Es la misma ${zh("呢", "ne")} de "Presentarte: ${zh("我叫")}…", aunque aquí hace otro trabajo.</p>
      <h3>Preguntar y negar</h3>
      <p>Para preguntar qué hace alguien, la palabra de pregunta ocupa el lugar de la respuesta: ${zh("你在做什么", "nǐ zài zuò shénme")}, «¿qué estás haciendo?». Se contesta ${zh("我在做饭", "wǒ zài zuò fàn")}. Para decir que no, la fuente pone ${zh("没", "méi")} delante de ${zh("在", "zài")}: ${zh("我没在看电视", "wǒ méi zài kàn diànshì")}, «no estoy viendo la televisión».</p>
      <h3>Qué verbos sí y cuáles no</h3>
      <p>El molde solo funciona con verbos de acción que duran un rato: ${zh("唱", "chàng")}, ${zh("玩", "wán")}, ${zh("开车", "kāichē")}. No se usa con ${zh("是", "shì")} ni con ${zh("喜欢", "xǐhuan")} ni con adjetivos, según ChinGram. Nadie «está siendo estudiante»: eso no es una acción que pase ahora. Algunas palabras de la tabla, como ${zh("上课", "shàngkè")}, ${zh("上班", "shàngbān")} y ${zh("说话", "shuōhuà")}, se arman con dos piezas, pero en este molde se usan completas: ${zh("他在上课", "tā zài shàngkè")} es «él está en clase», y la frase no necesita nada más para entenderse.</p>
      <p class="nota"><strong>Trampa común:</strong> repetir ${zh("在", "zài")} cuando la frase ya tiene un lugar. Se dice ${zh("我在家看电视", "wǒ zài jiā kàn diànshì")}, «veo la televisión en casa», y no ${zh("我在家在看电视", "wǒ zài jiā zài kàn diànshì")}. Una sola ${zh("在", "zài")} basta.</p>`,
    ejemplo: `
      <p>Luis llama a Ana por teléfono para saber qué hace cada persona de su casa.</p>
      <ol class="pasos-ej">
        <li>Luis pregunta: ${zh("你在做什么", "nǐ zài zuò shénme")}. Es ${zh("在", "zài")} más el verbo ${zh("做", "zuò")} y la palabra de pregunta.</li>
        <li>Ana responde con el mismo molde: ${zh("我在做饭", "wǒ zài zuò fàn")}.</li>
        <li>Luis pregunta por la mamá. Ana lo dice con más fuerza: ${zh("妈妈正在打电话", "māma zhèngzài dǎ diànhuà")}.</li>
        <li>Luis pregunta por su hermano, y Ana añade ${zh("呢", "ne")}: ${zh("他在上课呢", "tā zài shàngkè ne")}.</li>
        <li>Por último, Ana dice que ella no está viendo la tele: ${zh("我没在看电视", "wǒ méi zài kàn diànshì")}.</li>
      </ol>
      <p>Comprueba: en cada frase hay un verbo justo después de ${zh("在", "zài")} o ${zh("正在", "zhèngzài")}, y ningún lugar. Resultado: <span class="resultado">${zh("我在做饭", "wǒ zài zuò fàn")} = «estoy cocinando»</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar ${zh("在", "zài")} con ${zh("喜欢", "xǐhuan")} para decir «me está gustando». Ese verbo no describe una acción que dure, así que no lleva este molde.</p>`,
    vidaReal: `
      <p>Decir qué estás haciendo ahora sirve a diario:</p>
      <ul>
        <li>Contestar cuando alguien te llama y pregunta qué haces.</li>
        <li>Avisar de que no puedes hablar porque estás en clase.</li>
        <li>Decir que tu mamá está cocinando.</li>
        <li>Contar que alguien conduce o trabaja en este momento.</li>
        <li>Preguntarle a un amigo qué hace ahora.</li>
        <li>Entender a quien describe una escena.</li>
        <li>Explicar a tu familia qué estás haciendo para que no te interrumpan.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «mi mamá está cocinando».</p>',
        respuesta: ['妈妈', '在', '做饭'], pinyin: ['māma', 'zài', 'zuò fàn'], lang: 'zh-Hans',
        pista: '<p>Quién, ' + zh("在", "zài") + ' y la acción.</p>',
        solucion: `<p>${zh("妈妈在做饭", "māma zài zuò fàn")}: ${zh("在", "zài")} va delante del verbo.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «mi papá está llamando por teléfono justo ahora».</p>',
        respuesta: ['爸爸', '正在', '打电话'], pinyin: ['bàba', 'zhèngzài', 'dǎ diànhuà'], lang: 'zh-Hans',
        pista: '<p>' + zh("正在", "zhèngzài") + ' sustituye a ' + zh("在", "zài") + ' y también va antes del verbo.</p>',
        solucion: `<p>${zh("爸爸正在打电话", "bàba zhèngzài dǎ diànhuà")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>¿En cuál de estas frases ' + zh("在", "zài") + ' va delante de un verbo, y no de un lugar?</p>',
        opciones: [zh('我哥哥在学校', 'wǒ gēge zài xuéxiào'), zh('他在做饭', 'tā zài zuò fàn'), zh('我爸爸在医院', 'wǒ bàba zài yīyuàn'), zh('手机在这里', 'shǒujī zài zhèlǐ')], correcta: 1,
        pista: '<p>Mira la palabra que viene justo después de ' + zh("在", "zài") + ': ¿es un sitio o una acción?</p>',
        solucion: `<p>En ${zh("他在做饭", "tā zài zuò fàn")} viene ${zh("做饭", "zuò fàn")}, una acción. En las demás viene un lugar.</p>` },
      { tipo: 'opciones', escucha: { voz: '他在上课呢' },
        sinAudio: '<p>Se dice <strong>tā zài shàngkè ne</strong>: tā es alto y plano; zài cae; shàng cae y kè cae; ne es breve y sin tono.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice?</p>',
        opciones: ['Él está en clase ahora', 'Hoy no hay clase', '¿Él va a clase?', 'Él quiere ir a clase'], correcta: 0,
        pista: '<p>Reconoce el molde ' + zh("在", "zài") + ' + verbo.</p>',
        solucion: `<p>Se oye ${zh("他在上课呢", "tā zài shàngkè ne")}, «él está en clase».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("打电话", "dǎ diànhuà")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['dǎ diàn huà'],
        pista: '<p>La primera sílaba baja y sube; las otras dos caen.</p>',
        solucion: `<p>${zh("打电话", "dǎ diànhuà")}: <strong>dǎ diàn huà</strong>.</p>` },
      { tipo: 'opciones', enunciado: '<p>Elige la frase correcta para «veo la televisión en casa».</p>',
        opciones: [zh('我在家在看电视', 'wǒ zài jiā zài kàn diànshì'), zh('我看在家电视', 'wǒ kàn zài jiā diànshì'), zh('我在看电视在家', 'wǒ zài kàn diànshì zài jiā'), zh('我在家看电视', 'wǒ zài jiā kàn diànshì')], correcta: 3,
        pista: '<p>Si la frase ya tiene un lugar con ' + zh("在", "zài") + ', no se repite.</p>',
        solucion: `<p>${zh("我在家看电视", "wǒ zài jiā kàn diànshì")}: una sola ${zh("在", "zài")}, con el lugar antes del verbo.</p>` },
    ],
    fuentes: [SILABO, CHIN_ZAI, CHIN_PREP],
  });

  // ------------------------------------------------------------------
  L('Poder y saber: 会, 能 y 可以', {
    objetivo: `Distinguir tres maneras de «poder» en chino, ${zh("会", "huì")}, ${zh("能", "néng")} y ${zh("可以", "kěyǐ")}, y usarlas antes de un verbo.`,
    explicacion: `
      <p>En español «puedo» sirve para muchas cosas: puedo nadar, puedo ir hoy, puedo sentarme. El chino separa esas ideas en tres palabras. Aquí van las once palabras de la lección.</p>
      ${tabla([
        ['会', 'huì', 'saber hacer algo (se aprendió)'], ['能', 'néng', 'poder (estar en condiciones)'], ['可以', 'kěyǐ', 'poder (tener permiso)'], ['汉语', 'hànyǔ', 'idioma chino'],
        ['中文', 'zhōngwén', 'idioma chino'], ['汉字', 'hànzì', 'carácter chino'], ['一点儿', 'yìdiǎnr', 'un poco'], ['问', 'wèn', 'preguntar'],
        ['请', 'qǐng', 'por favor, invitar a'], ['一下', 'yíxià', 'un momento, un poco (suaviza)'], ['坐', 'zuò', 'sentarse'],
      ])}
      <h3>Tres ideas, tres palabras</h3>
      <p>Según ChinGram, ${zh("会", "huì")} habla de una habilidad que se aprendió, como conducir o hablar un idioma. ${zh("能", "néng")} habla de la capacidad o de la posibilidad según las circunstancias: estás en condiciones de hacerlo, o algo te lo impide. ${zh("可以", "kěyǐ")} habla del <strong>permiso</strong>: alguien te deja hacerlo. Los tres van antes del verbo.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Palabra</th><th scope="col">Idea</th><th scope="col">Ejemplo</th></tr>
        <tr><td>${zh("会", "huì")}</td><td>Lo aprendí</td><td>${zh("我会说中文", "wǒ huì shuō zhōngwén")}</td></tr>
        <tr><td>${zh("能", "néng")}</td><td>Estoy en condiciones</td><td>${zh("我今天能去", "wǒ jīntiān néng qù")}</td></tr>
        <tr><td>${zh("可以", "kěyǐ")}</td><td>Me dejan</td><td>${zh("我可以坐这儿", "wǒ kěyǐ zuò zhèr")}</td></tr>
      </table></div>
      <p>Mira la diferencia con un ejemplo. Si estás enfermo, no puedes hablar aunque sepas hacerlo muy bien. La fuente usa una idea parecida («estoy enfermo, no puedo hablar»), y nosotros la rehacemos así: ${zh("我生病了，不能说话", "wǒ shēngbìng le, bù néng shuōhuà")}. Sabes hacerlo, pero hoy no estás en condiciones. Por eso es ${zh("能", "néng")} y no ${zh("会", "huì")}.</p>
      <h3>Pedir permiso, prohibir y preguntar</h3>
      <p>Para pedir permiso se usa ${zh("可以", "kěyǐ")}: ${zh("我可以问一下吗", "wǒ kěyǐ wèn yíxià ma")}. ChinGram aclara que ${zh("能", "néng")} y ${zh("可以", "kěyǐ")} sirven ambos para pedir permiso, así que también oirás ${zh("能", "néng")} en esa situación. Para responder en este nivel usa ${zh("可以", "kěyǐ")} o ${zh("不可以", "bù kěyǐ")}.</p>
      <p>Los tres se niegan poniendo ${zh("不", "bù")} delante: ${zh("不会", "bù huì")}, ${zh("不能", "bù néng")} y ${zh("不可以", "bù kěyǐ")}. Para prohibir algo, ChinGram da ${zh("不能", "bù néng")} o ${zh("不可以", "bù kěyǐ")}. Y para preguntar sin ${zh("吗", "ma")} se repite la palabra con ${zh("不", "bù")}: ${zh("你会不会说中文", "nǐ huì bù huì shuō zhōngwén")}, ${zh("能不能", "néng bù néng")} y ${zh("可以不可以", "kěyǐ bù kěyǐ")}. Al hablar, ${zh("不", "bù")} puede cambiar de tono según la sílaba que sigue (se dice bú ante cuarto tono, como en ${zh("不会", "bù huì")}), como viste en "Cambios de tono: el tercer tono, ${zh("不")} y ${zh("一")}"; aquí el pinyin escribe siempre el tono original, bù.</p>
      <h3>Un poco y un momento</h3>
      <p>En "Qué es el mandarín y cómo se escribe" viste cómo se llama el idioma. Aquí ${zh("汉语", "hànyǔ")} y ${zh("中文", "zhōngwén")} son dos nombres del chino, y ${zh("汉字", "hànzì")} son sus caracteres. ${zh("一点儿", "yìdiǎnr")} se usa con sustantivos y adjetivos y significa una cantidad pequeña: ${zh("一点儿中文", "yìdiǎnr zhōngwén")} es «un poco de chino». ${zh("一下", "yíxià")}, en cambio, va después del verbo y dice que la acción es breve. También suaviza una petición: ${zh("请问一下", "qǐng wèn yíxià")}. Y ${zh("请", "qǐng")}, antes del verbo, vuelve amable una invitación: ${zh("请坐", "qǐng zuò")}, «siéntate, por favor».</p>
      <p class="nota"><strong>Trampa común:</strong> elegir ${zh("能", "néng")} cuando quieres decir que aprendiste algo. ${zh("我会说中文", "wǒ huì shuō zhōngwén")} dice que lo aprendiste; con ${zh("能", "néng")} el foco estaría en si las circunstancias te lo permiten.</p>`,
    ejemplo: `
      <p>Ana llega a una clase de chino y habla con una compañera que ya está sentada.</p>
      <ol class="pasos-ej">
        <li>La compañera pregunta si Ana habla chino: ${zh("你会说中文吗", "nǐ huì shuō zhōngwén ma")}. Usa ${zh("会", "huì")} porque pregunta por algo aprendido.</li>
        <li>Ana responde con una cantidad pequeña: ${zh("我会说一点儿", "wǒ huì shuō yìdiǎnr")}.</li>
        <li>Ana quiere sentarse y pide permiso: ${zh("我可以坐这儿吗", "wǒ kěyǐ zuò zhèr ma")}.</li>
        <li>La compañera dice que sí: ${zh("可以，请坐", "kěyǐ, qǐng zuò")}.</li>
        <li>Más tarde la invitan a una fiesta, pero ese día tiene que estudiar: ${zh("我今天不能去", "wǒ jīntiān bù néng qù")}.</li>
      </ol>
      <p>Comprueba: cada palabra de «poder» va antes del verbo y la negación ${zh("不", "bù")} va antes de ella. Resultado: <span class="resultado">${zh("我可以坐这儿吗", "wǒ kěyǐ zuò zhèr ma")} = «¿puedo sentarme aquí?»</span>.</p>
      <p class="nota"><strong>Error común:</strong> responder ${zh("不会", "bù huì")} a quien pide permiso. ${zh("会", "huì")} habla de saber hacer algo, no de que te dejen.</p>`,
    vidaReal: `
      <p>Estas tres palabras aparecen en situaciones de todos los días:</p>
      <ul>
        <li>Decir que sabes hablar otro idioma.</li>
        <li>Explicar que hoy no puedes ir a un lugar y dar la razón.</li>
        <li>Pedir permiso con amabilidad para sentarte o para preguntar algo.</li>
        <li>Entender cuándo algo está prohibido.</li>
        <li>Preguntar a un amigo si sabe hacer algo, como cantar o escribir caracteres.</li>
        <li>Responder con cortesía cuando te piden algo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Elige la palabra que falta para decir que aprendiste a escribir caracteres: ${zh("我___写汉字", "wǒ ___ xiě hànzì")}.</p>`,
        opciones: [zh('可以', 'kěyǐ'), zh('请', 'qǐng'), zh('问', 'wèn'), zh('会', 'huì')], correcta: 3,
        pista: '<p>Es una habilidad que se aprende.</p>',
        solucion: `<p>${zh("我会写汉字", "wǒ huì xiě hànzì")}: ${zh("会", "huì")} es saber hacer algo aprendido.</p>` },
      { tipo: 'opciones', enunciado: `<p>Tienes gripe y no puedes ir hoy a la escuela. Elige la palabra que falta: ${zh("我今天不___去", "wǒ jīntiān bù ___ qù")}.</p>`,
        opciones: [zh('能', 'néng'), zh('可以', 'kěyǐ'), zh('请', 'qǐng'), zh('坐', 'zuò')], correcta: 0,
        pista: '<p>No es que te prohíban ir: hoy no estás en condiciones.</p>',
        solucion: `<p>${zh("我今天不能去", "wǒ jīntiān bù néng qù")}: ${zh("能", "néng")} habla de las circunstancias.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «¿sabes hablar chino?».</p>',
        respuesta: ['你', '会', '说', '中文', '吗'], pinyin: ['nǐ', 'huì', 'shuō', 'zhōngwén', 'ma'], lang: 'zh-Hans',
        pista: '<p>La palabra de «saber» va antes del verbo.</p>',
        solucion: `<p>${zh("你会说中文吗", "nǐ huì shuō zhōngwén ma")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «hoy no puedo ir».</p>',
        respuesta: ['我', '今天', '不能', '去'], pinyin: ['wǒ', 'jīntiān', 'bù néng', 'qù'], lang: 'zh-Hans',
        alternativas: [['今天', '我', '不能', '去']],
        pista: '<p>' + zh("不", "bù") + ' va antes de la palabra de «poder».</p>',
        solucion: `<p>${zh("我今天不能去", "wǒ jīntiān bù néng qù")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '我可以坐这儿吗' },
        sinAudio: '<p>Se dice <strong>wǒ kěyǐ zuò zhèr ma</strong>: wǒ y kěyǐ bajan y suben; zuò cae; zhèr cae; ma es breve y sin tono.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué pregunta?</p>',
        opciones: ['Si sabe hablar chino', 'Si hoy puede ir', 'Si puede sentarse aquí', 'Dónde está su casa'], correcta: 2,
        pista: '<p>La frase termina con ' + zh("吗", "ma") + ', así que es una pregunta.</p>',
        solucion: `<p>Se oye ${zh("我可以坐这儿吗", "wǒ kěyǐ zuò zhèr ma")}, «¿puedo sentarme aquí?».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("汉语", "hànyǔ")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['hàn yǔ'],
        pista: '<p>La primera sílaba cae; la segunda baja y sube.</p>',
        solucion: `<p>${zh("汉语", "hànyǔ")}: <strong>hàn yǔ</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_NENG, CHIN_HUI, CHIN_DIAN, CHIN_XIA],
  });

  // ------------------------------------------------------------------
  L('Arriba, abajo, dentro y fuera: 上, 下, 里 y 外', {
    objetivo: `Decir dónde está una cosa con las palabras de posición ${zh("上", "shàng")}, ${zh("下", "xià")}, ${zh("里", "lǐ")}, ${zh("外", "wài")}, ${zh("前", "qián")} y ${zh("后", "hòu")}, y distinguir ${zh("在", "zài")} de ${zh("有", "yǒu")}.`,
    explicacion: `
      <p>Imagina que no encuentras tu teléfono y preguntas dónde está. Te contestan «encima de la mesa» o «dentro de la mochila». Para eso hay palabras que dicen la posición. Aquí van las doce de la lección.</p>
      ${tabla([
        ['上', 'shàng', 'encima, arriba'], ['下', 'xià', 'debajo, abajo'], ['里', 'lǐ', 'dentro'], ['外', 'wài', 'fuera'],
        ['前', 'qián', 'delante'], ['后', 'hòu', 'detrás'], ['边', 'biān', 'lado'], ['外边', 'wàibian', 'afuera, el lado de fuera'],
        ['这边', 'zhèbiān', 'este lado'], ['那边', 'nàbiān', 'aquel lado'], ['找', 'zhǎo', 'buscar'], ['看见', 'kànjiàn', 'ver (llegar a ver)'],
      ])}
      ${G({
        x: [-0.5, 11.5], y: [-0.7, 4.4], proporcional: true, ejes: false,
        descripcion: 'Dibujo de una mesa a la izquierda y una caja a la derecha. Sobre la mesa hay un objeto pequeño, rotulado shàng, encima. Debajo de la mesa hay otro objeto, rotulado xià, debajo. Dentro de la caja hay un círculo, rotulado lǐ, dentro, y a su lado, fuera de la caja, hay otro círculo, rotulado wài, fuera.',
        figuras: [
          ...mesa('encima'), caja(2, 0, 3, 0.7),
          txt(2.5, 3.3, 'shàng: encima'), txt(2.5, -0.3, 'xià: debajo'),
          caja(6, 0, 9, 1.6), { tipo: 'circulo', x: 7.5, y: 0.5, r: 0.35 }, txt(7.5, 2.2, 'lǐ: dentro'),
          { tipo: 'circulo', x: 10.4, y: 0.35, r: 0.35 }, txt(10.4, 1.1, 'wài: fuera'),
        ],
      })}
      <h3>Primero la cosa, después la posición</h3>
      <p>Aquí el orden es al revés que en español. En español dices «encima de la mesa»; en chino dices «mesa-encima»: ${zh("桌子上", "zhuōzi shàng")}. ChinGram explica que la palabra de posición se pega detrás de otro sustantivo, que sirve de punto de referencia: un lugar, una persona o un objeto. Una <strong>palabra de posición</strong> es la que dice dónde queda algo respecto a otra cosa. Mira estas seis: ${zh("桌子上", "zhuōzi shàng")}, encima de la mesa; ${zh("椅子下", "yǐzi xià")}, debajo de la silla; ${zh("房间里", "fángjiān lǐ")}, dentro del cuarto; ${zh("房间外", "fángjiān wài")}, fuera del cuarto; ${zh("学校前边", "xuéxiào qiánbiān")}, delante de la escuela; y ${zh("商店后边", "shāngdiàn hòubiān")}, detrás de la tienda.</p>
      <p>ChinGram dice que esas palabras casi siempre llevan ${zh("边", "biān")} detrás para formar dos sílabas: ${zh("上边", "shàngbiān")}, ${zh("外边", "wàibian")}. Pero ${zh("上", "shàng")}, ${zh("下", "xià")}, ${zh("里", "lǐ")} y ${zh("外", "wài")} pueden pegarse solas al sustantivo, como en ${zh("桌子上", "zhuōzi shang")}. Tras un sustantivo suenan breves, sin tono; en la lección dejamos el pinyin del sílabo, ${zh("上", "shàng")}, como simplificación de la lección. Con ${zh("这边", "zhèbiān")} y ${zh("那边", "nàbiān")} señalas el lado de aquí o el de allá. Con ellas dices, por ejemplo, ${zh("商店在学校前边", "shāngdiàn zài xuéxiào qiánbiān")}, «la tienda está delante de la escuela».</p>
      <h3>¿Está en un lugar o hay algo en él?</h3>
      <p>Hay dos moldes. Con ${zh("在", "zài")} dices dónde está una cosa: ${zh("手机在桌子上", "shǒujī zài zhuōzi shàng")}, «el teléfono está sobre la mesa». Con ${zh("有", "yǒu")} dices qué hay en un sitio: ${zh("桌子上有一本书", "zhuōzi shàng yǒu yī běn shū")}, «sobre la mesa hay un libro». ChinGram explica que en la frase con ${zh("有", "yǒu")} el lugar va primero y el objeto es información nueva. Que lo ya conocido va con ${zh("在", "zài")} es una simplificación de la lección. Para negar «hay», se usa ${zh("没", "méi")}: ${zh("桌子上没有书", "zhuōzi shàng méi yǒu shū")}.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Molde</th><th scope="col">Ejemplo</th><th scope="col">Cuándo</th></tr>
        <tr><td>Cosa + ${zh("在", "zài")} + lugar</td><td>${zh("手机在桌子上", "shǒujī zài zhuōzi shàng")}</td><td>Sabes qué buscas.</td></tr>
        <tr><td>Lugar + ${zh("有", "yǒu")} + cosa</td><td>${zh("桌子上有一本书", "zhuōzi shàng yǒu yī běn shū")}</td><td>Dices qué hay.</td></tr>
      </table></div>
      <p>Y si lo que hace la acción pasa en un sitio, ${zh("在", "zài")} y el lugar van antes del verbo: ${zh("我在房间里看书", "wǒ zài fángjiān lǐ kàn shū")}, «leo en el cuarto».</p>
      <p class="nota"><strong>Trampa común:</strong> poner la posición antes de la cosa, como en español. No se dice ${zh("上桌子", "shàng zhuōzi")} para «encima de la mesa»; la posición va detrás: ${zh("桌子上", "zhuōzi shàng")}.</p>`,
    ejemplo: `
      <p>Luis no encuentra su teléfono, y Ana lo ayuda a buscarlo. Las frases de ejemplo son nuestras.</p>
      <ol class="pasos-ej">
        <li>Luis pregunta: ${zh("我的手机在哪儿", "wǒ de shǒujī zài nǎr")}.</li>
        <li>Ana mira y responde: ${zh("手机在桌子上", "shǒujī zài zhuōzi shàng")}. Es algo que Luis ya conoce, por eso usa ${zh("在", "zài")}.</li>
        <li>Otra frase de la misma escena: ${zh("桌子上有一本书", "zhuōzi shàng yǒu yī běn shū")}. Aquí el libro es algo nuevo, por eso ${zh("有", "yǒu")}.</li>
        <li>Luis dice que está buscando: ${zh("我在找手机", "wǒ zài zhǎo shǒujī")}.</li>
        <li>Al final, Luis lo encuentra: ${zh("我看见手机了", "wǒ kànjiàn shǒujī le")}.</li>
      </ol>
      <p>Comprueba: en cada frase de posición, ${zh("上", "shàng")} va detrás de ${zh("桌子", "zhuōzi")}. Resultado: <span class="resultado">${zh("手机在桌子上", "shǒujī zài zhuōzi shàng")} = «el teléfono está sobre la mesa»</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar ${zh("在", "zài")} para decir «hay un libro». Si presentas algo nuevo en un lugar, usa ${zh("有", "yǒu")}.</p>`,
    vidaReal: `
      <p>Las palabras de posición se usan a cada rato:</p>
      <ul>
        <li>Decir dónde dejaste tus cosas cuando alguien te ayuda a buscar un objeto perdido.</li>
        <li>Pedirle a alguien que busque algo encima o debajo de un mueble.</li>
        <li>Explicar que algo está dentro o fuera de un lugar.</li>
        <li>Describir un cuarto: qué hay sobre la mesa y qué hay dentro.</li>
        <li>Entender dónde te piden dejar tu mochila.</li>
        <li>Entender o dar indicaciones para encontrarse, por ejemplo «espérame delante de la escuela».</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «el teléfono está sobre la mesa».</p>',
        respuesta: ['手机', '在', '桌子上'], pinyin: ['shǒujī', 'zài', 'zhuōzi shàng'], lang: 'zh-Hans',
        pista: '<p>La cosa, ' + zh("在", "zài") + ' y el lugar con su posición.</p>',
        solucion: `<p>${zh("手机在桌子上", "shǒujī zài zhuōzi shàng")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «sobre la mesa hay un libro».</p>',
        respuesta: ['桌子上', '有', '一本', '书'], pinyin: ['zhuōzi shàng', 'yǒu', 'yī běn', 'shū'], lang: 'zh-Hans',
        pista: '<p>Primero el lugar, después ' + zh("有", "yǒu") + ' y la cosa.</p>',
        solucion: `<p>${zh("桌子上有一本书", "zhuōzi shàng yǒu yī běn shū")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Mira el dibujo, donde se ve un teléfono y una mesa.</p>${G({
          x: [0, 5], y: [-0.8, 3], proporcional: true, ejes: false,
          descripcion: 'Una mesa con un cuadrito pequeño, que representa un teléfono, debajo de ella.',
          figuras: [...mesa('debajo'), txt(2.5, -0.4, 'teléfono')],
        })}<p>¿Qué frase dice dónde está el teléfono?</p>`,
        opciones: [zh('手机在桌子上', 'shǒujī zài zhuōzi shàng'), zh('手机在桌子下', 'shǒujī zài zhuōzi xià'), zh('手机在桌子里', 'shǒujī zài zhuōzi lǐ'), zh('手机在桌子外', 'shǒujī zài zhuōzi wài')], correcta: 1,
        pista: '<p>El teléfono está debajo, no encima.</p>',
        solucion: `<p>${zh("手机在桌子下", "shǒujī zài zhuōzi xià")}: ${zh("下", "xià")} significa «debajo».</p>` },
      { tipo: 'opciones', enunciado: `<p>Alguien pregunta ${zh("我的手机在哪儿", "wǒ de shǒujī zài nǎr")}. Elige la respuesta correcta.</p>`,
        opciones: [zh('手机有桌子上', 'shǒujī yǒu zhuōzi shàng'), zh('手机在桌子上', 'shǒujī zài zhuōzi shàng'), zh('手机桌子上在', 'shǒujī zhuōzi shàng zài'), zh('桌子上手机有', 'zhuōzi shàng shǒujī yǒu')], correcta: 1,
        pista: '<p>Es una cosa conocida: ' + zh("在", "zài") + ' va entre la cosa y el lugar.</p>',
        solucion: `<p>${zh("手机在桌子上", "shǒujī zài zhuōzi shàng")}: cosa, ${zh("在", "zài")} y lugar.</p>` },
      { tipo: 'opciones', escucha: { voz: '我在找手机' },
        sinAudio: '<p>Se dice <strong>wǒ zài zhǎo shǒujī</strong>: wǒ baja y sube; zài cae; zhǎo baja y sube; shǒu baja y sube y jī es alto y plano.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué dice?</p>',
        opciones: ['Estoy buscando mi teléfono', 'Mi teléfono está dentro', 'Veo mi teléfono', 'Mi teléfono no está aquí'], correcta: 0,
        pista: '<p>Se repite el molde de acción en curso de la lección anterior.</p>',
        solucion: `<p>Se oye ${zh("我在找手机", "wǒ zài zhǎo shǒujī")}, «estoy buscando mi teléfono».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("外边", "wàibian")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['wài bian'],
        pista: '<p>La primera sílaba cae; la segunda es breve y no lleva tono.</p>',
        solucion: `<p>${zh("外边", "wàibian")}: <strong>wài bian</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_POS, CHIN_HAY, CHIN_PREP, MSU_UBIC],
  });

  // ------------------------------------------------------------------
  L('En la escuela', {
    objetivo: `Hablar de la escuela con los niveles ${zh("小学", "xiǎoxué")}, ${zh("中学", "zhōngxué")} y ${zh("大学", "dàxué")}, ordenar con ${zh("第", "dì")} y contar un día de clase con lo aprendido en HSK 1.`,
    explicacion: `
      <p>Pasas muchas horas en la escuela, así que conviene saber hablar de ella. La buena noticia es que muchas palabras de esta lección se arman con piezas que ya conoces. Estas son las doce.</p>
      ${tabla([
        ['上学', 'shàngxué', 'ir a la escuela'], ['下课', 'xiàkè', 'terminar la clase'], ['小学', 'xiǎoxué', 'escuela primaria'], ['小学生', 'xiǎoxuéshēng', 'alumno de primaria'],
        ['中学', 'zhōngxué', 'escuela secundaria'], ['中学生', 'zhōngxuéshēng', 'alumno de secundaria'], ['大学', 'dàxué', 'universidad'], ['大学生', 'dàxuéshēng', 'estudiante universitario'],
        ['读书', 'dúshū', 'estudiar; leer'], ['第', 'dì', 'marca el orden: primero, segundo…'], ['午饭', 'wǔfàn', 'comida del mediodía'], ['好玩儿', 'hǎowánr', 'divertido'],
      ])}
      <h3>Armar los niveles con piezas</h3>
      <p>Mira el patrón. ${zh("学", "xué")} es «estudiar». Con ${zh("小", "xiǎo")}, ${zh("中", "zhōng")} o ${zh("大", "dà")} delante, indica el nivel; y con ${zh("生", "shēng")} detrás, nombra a la persona. Que se arme así es algo que vemos en las palabras del sílabo y no una regla de una fuente: es una simplificación de la lección. Una universidad de EE. UU. (Míchigan) da los significados: ${zh("小学", "xiǎoxué")} es primaria, ${zh("中学", "zhōngxué")} es secundaria (en inglés, «middle school») y ${zh("大学", "dàxué")} es universidad.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Nivel</th><th scope="col">Escuela</th><th scope="col">Alumno</th></tr>
        <tr><th scope="row">Primaria</th><td>${zh("小学", "xiǎoxué")}</td><td>${zh("小学生", "xiǎoxuéshēng")}</td></tr>
        <tr><th scope="row">Secundaria</th><td>${zh("中学", "zhōngxué")}</td><td>${zh("中学生", "zhōngxuéshēng")}</td></tr>
        <tr><th scope="row">Universidad</th><td>${zh("大学", "dàxué")}</td><td>${zh("大学生", "dàxuéshēng")}</td></tr>
      </table></div>
      <p>Cada escuela corresponde a un <strong>nivel escolar</strong>, y con esto puedes presentarte: ${zh("我是中学生", "wǒ shì zhōngxuéshēng")}, «soy alumno de secundaria». La estructura es la de "El verbo ${zh("是")}".</p>
      <h3>Ir a clase: ${zh("上", "shàng")} y ${zh("下", "xià")} como verbos</h3>
      <p>En la lección anterior, ${zh("上", "shàng")} y ${zh("下", "xià")} decían encima y debajo. Aquí son verbos. Según la misma universidad, ${zh("上", "shàng")} como verbo es «ir a» o «asistir», y por eso ${zh("上学", "shàngxué")} es ir a la escuela y ${zh("上班", "shàngbān")}, ir al trabajo. ${zh("上课", "shàngkè")} es empezar la clase, y ${zh("下课", "xiàkè")} es terminarla. Para decir «terminó la clase», aprovecha ${zh("了", "le")} de cambio: ${zh("下课了", "xiàkè le")}.</p>
      <h3>Poner en orden con ${zh("第", "dì")}</h3>
      <p>Para el orden, ChinGram dice que ${zh("第", "dì")} va delante de un número y lo convierte en ordinal: ${zh("第一", "dì yī")}, «primero»; ${zh("第二", "dì èr")}, «segundo». Con ${zh("课", "kè")} no hace falta clasificador: ${zh("第四课", "dì sì kè")} es «la lección cuatro». Y tras ${zh("第", "dì")} se usa ${zh("二", "èr")}, nunca ${zh("两", "liǎng")}, así que se dice ${zh("第二课", "dì èr kè")}.</p>
      <h3>Un día en la escuela</h3>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Hora</th><th scope="col">Qué pasa</th></tr>
        <tr><td>${zh("七点", "qī diǎn")}</td><td>${zh("我起床", "wǒ qǐchuáng")}, me levanto.</td></tr>
        <tr><td>${zh("八点", "bā diǎn")}</td><td>${zh("我上课", "wǒ shàngkè")}, empieza mi clase.</td></tr>
        <tr><td>${zh("十二点", "shí'èr diǎn")}</td><td>${zh("我吃午饭", "wǒ chī wǔfàn")}, almuerzo.</td></tr>
        <tr><td>${zh("三点半", "sān diǎn bàn")}</td><td>${zh("下课了", "xiàkè le")}, terminó la clase.</td></tr>
      </table></div>
      <p>La hora va antes del verbo, como en "La hora". Y con ${zh("好玩儿", "hǎowánr")} puedes decir que algo es divertido: ${zh("学校很好玩儿", "xuéxiào hěn hǎowánr")}.</p>
      <h3>Cierre de HSK 1</h3>
      <p>Con esta lección terminas HSK 1. Ya puedes saludar, presentarte, hablar de tu familia, de la hora, de lo que compras, de lo que haces y de dónde están las cosas. Quedan palabras de nivel 1 que aún no vimos, como las del transporte, el clima y las opiniones; llegan en las unidades «HSK 2», y el sílabo está en las fuentes.</p>
      <p class="nota"><strong>Trampa común:</strong> decir ${zh("第两课", "dì liǎng kè")}. Después de ${zh("第", "dì")} va ${zh("二", "èr")}, aunque para contar se use ${zh("两", "liǎng")}.</p>`,
    ejemplo: `
      <p>Ana cuenta un día de escuela a un amigo nuevo. Las frases de ejemplo son nuestras.</p>
      <ol class="pasos-ej">
        <li>Primero dice quién es: ${zh("我是中学生", "wǒ shì zhōngxuéshēng")}.</li>
        <li>Luego, qué hace a las ocho: ${zh("我八点上课", "wǒ bā diǎn shàngkè")}. La hora va antes del verbo.</li>
        <li>Mientras tanto, explica qué hace en este momento: ${zh("我在读书", "wǒ zài dúshū")}.</li>
        <li>También cuenta lo que sabe: ${zh("我会写汉字", "wǒ huì xiě hànzì")}.</li>
        <li>Al final del día, cuando el maestro termina, dice que ya acabó: ${zh("下课了", "xiàkè le")}. Ana sale contenta, porque la escuela le parece ${zh("好玩儿", "hǎowánr")}.</li>
      </ol>
      <p>Comprueba: cada frase usa algo que aprendiste en HSK 1, desde ${zh("是", "shì")} hasta ${zh("了", "le")}. Resultado: <span class="resultado">${zh("我是中学生", "wǒ shì zhōngxuéshēng")} = «soy alumno de secundaria»</span>.</p>
      <p class="nota"><strong>Error común:</strong> añadir ${zh("很", "hěn")} a ${zh("我是中学生", "wǒ shì zhōngxuéshēng")}. Esa frase dice qué eres y no necesita ${zh("很", "hěn")}.</p>`,
    vidaReal: `
      <p>Hablar de la escuela te sirve para conocer gente:</p>
      <ul>
        <li>Presentarte diciendo si estudias en primaria, secundaria o universidad.</li>
        <li>Preguntarle a alguien qué estudia.</li>
        <li>Contar a qué hora empieza tu clase.</li>
        <li>Decir en qué lección vas del libro.</li>
        <li>Entender a un maestro que avisa del fin de la clase y dice cuándo salir.</li>
        <li>Contar tu día a un amigo.</li>
        <li>Entender cuando otra persona te cuenta en qué escuela estudia.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «soy alumno de secundaria».</p>',
        respuesta: ['我', '是', '中学生'], pinyin: ['wǒ', 'shì', 'zhōngxuéshēng'], lang: 'zh-Hans',
        pista: '<p>Quién eres: ' + zh("是", "shì") + ' y el nivel con ' + zh("生", "shēng") + '.</p>',
        solucion: `<p>${zh("我是中学生", "wǒ shì zhōngxuéshēng")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «empiezo la clase a las ocho».</p>',
        respuesta: ['我', '八点', '上课'], pinyin: ['wǒ', 'bā diǎn', 'shàngkè'], lang: 'zh-Hans',
        alternativas: [['八点', '我', '上课']],
        pista: '<p>La hora va antes del verbo.</p>',
        solucion: `<p>${zh("我八点上课", "wǒ bā diǎn shàngkè")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>Elige cómo se dice «la lección dos».</p>',
        opciones: [zh('第两课', 'dì liǎng kè'), zh('第二课', 'dì èr kè'), zh('二第课', 'èr dì kè'), zh('两课第', 'liǎng kè dì')], correcta: 1,
        pista: '<p>' + zh("第", "dì") + ' va primero y después de ella se usa ' + zh("二", "èr") + '.</p>',
        solucion: `<p>${zh("第二课", "dì èr kè")}: tras ${zh("第", "dì")} va ${zh("二", "èr")}, nunca ${zh("两", "liǎng")}.</p>` },
      { tipo: 'numero', enunciado: `<p>En el horario de la lección, la clase empieza a las ${zh("八点", "bā diǎn")} y el almuerzo es a las ${zh("十二点", "shí'èr diǎn")}. ¿Cuántas horas pasan entre una cosa y la otra?</p>`,
        respuesta: 12 - 8,
        pista: '<p>Resta la hora de inicio a la hora del almuerzo.</p>',
        solucion: '<p>12 − 8 = 4 horas.</p>' },
      { tipo: 'opciones', escucha: { voz: '下课了' },
        sinAudio: '<p>Se dice <strong>xiàkè le</strong>: xià cae; kè cae; le es breve y sin tono.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué avisa?</p>',
        opciones: ['Que empieza la clase', 'Que ya terminó la clase', 'Que es la hora de almorzar', 'Que no hay escuela'], correcta: 1,
        pista: '<p>Recuerda cómo se dicen empezar la clase y terminarla.</p>',
        solucion: `<p>Se oye ${zh("下课了", "xiàkè le")}, «terminó la clase».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("大学生", "dàxuéshēng")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['dà xué shēng'],
        pista: '<p>La primera sílaba cae, la segunda sube y la tercera es alta y plana.</p>',
        solucion: `<p>${zh("大学生", "dàxuéshēng")}: <strong>dà xué shēng</strong>.</p>` },
    ],
    fuentes: [SILABO, CHIN_ORD, MSU_FAM, MSU_AMIGO, MSU_CLASE],
  });
})();
