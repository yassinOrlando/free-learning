// Mandarín · Unidad 2: HSK 1 · Primeras frases.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Todo carácter chino sale de zh(). Las frases de ejemplo («…») son de la lección; solo las palabras vienen del sílabo.
// La primera aparición de cada palabra en una tabla de vocabulario lleva su grabación (audio/zh/); el resto usa la voz del sistema.
(function () {
  const zh = window.zh;
  const L = (titulo, datos) => window.registrarLeccion('mandarin', titulo, datos);
  // Fila de vocabulario: palabra con su botón (y grabación si hay) y significado.
  const fila = (hanzi, pinyin, es, archivo) => `<tr><td>${zh(hanzi, pinyin, { audio: archivo ? 'audio/zh/' + archivo : undefined })}</td><td>${es}</td></tr>`;
  const tabla = (filas) => `<div class="tabla-wrap"><table class="vocabulario"><tr><th scope="col">Palabra</th><th scope="col">Significado</th></tr>${filas.map((f) => fila(...f)).join('')}</table></div>`;
  const a = (archivo) => 'audio/zh/' + archivo;

  const SILABO = { nombre: 'Centro de Educación y Cooperación Lingüística (China), «HSK 考试大纲», sílabo del HSK 3.0 (2025)', url: 'https://hsk.cn-bj.ufileos.com/3.0/新版HSK考试大纲1219.pdf' };
  const AUDIO = { nombre: 'Grabaciones: Wei Gao y Vion Nicolas, Proyecto Shtooka, en Wikimedia Commons (CC BY 2.0 FR)', url: 'https://commons.wikimedia.org/wiki/File:Zh-dà.ogg' };
  const CANONNI = { nombre: 'Grabaciones: CanonNi, Lingua Libre, en Wikimedia Commons (CC0)', url: 'https://commons.wikimedia.org/wiki/File:LL-Q9192_(cmn)-CanonNi-%E4%B8%8D%E5%AE%A2%E6%B0%94.wav' };
  const CHINGRAM = (ruta, nombre) => ({ nombre: `Universidad Palacký de Olomouc (Chequia) y socios, ChinGram: ${nombre} (en inglés)`, url: `https://chingram.upol.cz/grammar/${ruta}` });
  const HAWAI_SHI = { nombre: 'Kapiolani Community College, Univ. de Hawái (EE. UU.), CHN101 Elementary Mandarin I Textbook: Lesson 1 Grammar, Connecting Nouns with the Verb 是 (en inglés)', url: 'https://human.libretexts.org/Courses/Kapiolani_Community_College/CHN101%3A_Elementary_Mandarin_I_(Polley)/Elementary_Mandarin_I_Textbook/02%3A_First_Contact/2.06%3A_Lesson_1_Grammar_-_Connecting_Nouns_with_the_Verb__(shi)' };

  // ------------------------------------------------------------------
  L('Saludar: 你好', {
    objetivo: 'Saludar, despedirte, dar las gracias y pedir perdón en mandarín, y saber cuándo usar «tú» y cuándo la forma de respeto.',
    explicacion: `
      <p>Imagina que entras a un salón de clases en China. Antes de decir cualquier otra cosa, lo normal es saludar. Con una docena de palabras ya puedes saludar, despedirte, agradecer y disculparte. La primera pregunta es siempre la misma: ¿a quién le hablo y qué tan formal debo ser? Aquí están las palabras, con su botón de audio, antes de verlas en acción. Cuando no hay grabación, el botón usa la voz de tu dispositivo, y esa voz depende del dispositivo: si suena rara o no suena, manda el pinyin.</p>
      ${tabla([
        ['你好', 'nǐ hǎo', 'hola'], ['你', 'nǐ', 'tú', 'ni3.m4a'], ['好', 'hǎo', 'bien, bueno', 'hao3.m4a'], ['您', 'nín', 'usted', 'nin2.m4a'],
        ['大家', 'dàjiā', 'todos, todo el mundo', 'dajia41.m4a'], ['老师', 'lǎoshī', 'profesor, profesora', 'laoshi31.m4a'], ['再见', 'zàijiàn', 'adiós, hasta luego', 'zaijian44.m4a'],
        ['谢谢', 'xièxie', 'gracias', 'xiexie4.m4a'], ['不客气', 'bú kèqi', 'de nada', 'bukeqi24.m4a'], ['对不起', 'duìbuqǐ', 'lo siento, perdón', 'duibuqi43.m4a'],
        ['没关系', 'méi guānxi', 'no importa, no pasa nada', 'meiguanxi21.m4a'], ['早', 'zǎo', 'temprano', 'zao3.m4a'],
      ])}
      <p>La palabra ${zh("你好", "nǐ hǎo")} se arma con dos piezas que ya están en la tabla: ${zh("你", "nǐ")} es «tú» y ${zh("好", "hǎo")} es «bien». Dicho al pie de la letra sería «tú, bien», parecido a preguntar cómo estás. Es el <strong>saludo</strong> más común: una palabra o frase fija que se dice al encontrarte con alguien.</p>
      <h3>¿Tú o usted?</h3>
      <p>En español cambias entre «tú» y «usted» según con quién hablas. En mandarín también. ${zh("您", "nín")} es la <strong>forma de respeto</strong> de ${zh("你", "nǐ")}: se usa para mostrar respeto con desconocidos, personas mayores, profesores o superiores, según una universidad de Chequia y un colegio comunitario de Oregón (EE. UU.). Con tus amigos y compañeros basta ${zh("你", "nǐ")}.</p>
      <h3>Saludar a una persona y a un grupo</h3>
      <p>Para saludar a quien tienes delante, dices ${zh("你好", "nǐ hǎo")}. Si quieres nombrar a la persona, pones su nombre antes de ${zh("好", "hǎo")}: ${zh("老师好", "lǎoshī hǎo")} es «hola, profesor». Para un grupo usas ${zh("大家好", "dàjiā hǎo")}, «hola a todos». En las mañanas también se oye ${zh("早", "zǎo")}, que significa «temprano» y se usa como «buenos días» (esto último es simplificación de la lección). Para despedirte dices ${zh("再见", "zàijiàn")}.</p>
      <h3>Gracias y perdón</h3>
      <p>Algunas frases se dicen en pareja: alguien habla y tú contestas con la frase que suele acompañarla. Es lo habitual en los diálogos de curso, no una ley.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Alguien dice</th><th scope="col">Tú respondes</th></tr>
        <tr><td>${zh("谢谢", "xièxie", { es: "gracias" })}</td><td>${zh("不客气", "bú kèqi", { es: "de nada" })}</td></tr>
        <tr><td>${zh("对不起", "duìbuqǐ", { es: "perdón" })}</td><td>${zh("没关系", "méi guānxi", { es: "no importa" })}</td></tr>
      </table></div>
      <p>Dos avisos sobre cómo se escribe el sonido. El sílabo escribe ${zh("不客气", "bú kèqi")} con el tono ya cambiado: ${zh("不", "bù")} suena «bú» delante de otro tono cuarto. Y ${zh("你好", "nǐ hǎo")} se dice «ní hǎo» al hablar, porque dos terceros tonos seguidos cambian el primero. Eso lo viste en "Cambios de tono: el tercer tono, ${zh("不")} y ${zh("一")}". En ${zh("谢谢", "xièxie")} la segunda sílaba es tan suave que el sílabo no le pone marca.</p>
      <p>Fíjate en algo útil: ${zh("好", "hǎo")} aparece en ${zh("你好", "nǐ hǎo")}, en ${zh("老师好", "lǎoshī hǎo")} y en ${zh("大家好", "dàjiā hǎo")}. La pieza ${zh("好", "hǎo")} es la misma y solo cambia a quién saludas. Así, con aprender una vez la estructura, ya sabes saludar a muchas personas distintas.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que ${zh("不客气", "bú kèqi")} y ${zh("没关系", "méi guānxi")} se pueden cambiar. Cada una responde a una situación distinta: una a las gracias, la otra a una disculpa.</p>`,
    ejemplo: `
      <p>Las frases de ejemplo de la lección son nuestras: están hechas con las palabras de la tabla. Vamos a llegar a clase y a despedirnos.</p>
      <ol class="pasos-ej">
        <li>Ves a tu profesora y quieres mostrar respeto: dices ${zh("老师好", "lǎoshī hǎo")}. Pones primero a quién saludas y después ${zh("好", "hǎo")}.</li>
        <li>Entra el resto del grupo y saludas a todos a la vez: ${zh("大家好", "dàjiā hǎo")}.</li>
        <li>Te presta un cuaderno. Le dices ${zh("谢谢", "xièxie")} y ella contesta ${zh("不客气", "bú kèqi")}.</li>
        <li>Chocas con un compañero. Dices ${zh("对不起", "duìbuqǐ")} y él responde ${zh("没关系", "méi guānxi")}.</li>
        <li>Al salir te despides: ${zh("老师再见", "lǎoshī zàijiàn")}.</li>
      </ol>
      <p>Comprueba: cada frase usa solo palabras de la tabla y en cada una primero va quien recibe el saludo y luego la palabra. Resultado: <span class="resultado">${zh("老师好", "lǎoshī hǎo")} = «hola, profesora»</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar ${zh("您", "nín")} con tus amigos de tu edad. No es grave, pero suena demasiado formal.</p>`,
    vidaReal: `
      <p>Saludar es lo primero que haces con cualquier persona, así que estas palabras sirven en cuanto conoces a alguien que habla mandarín:</p>
      <ul>
        <li>Saludar a un profesor, a un vecino o a una persona mayor con el respeto que se espera.</li>
        <li>Dar las gracias o pedir perdón en un chat, en una videollamada o de viaje.</li>
        <li>Reconocer estas palabras en una película o en un video, aunque todavía no entiendas lo demás.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', escucha: { voz: '您', audio: a('nin2.m4a') },
        sinAudio: '<p>Se dice <strong>nín</strong>: empieza con «n», la vocal «i» sube desde la mitad hasta arriba (segundo tono) y termina en «n».</p>',
        enunciado: '<p>Escucha la palabra. ¿Cuál es?</p>',
        opciones: [zh('你', 'nǐ'), zh('您', 'nín'), zh('好', 'hǎo'), zh('大家', 'dàjiā')], correcta: 1,
        pista: '<p>Se oye una «n» al inicio y una «n» al final.</p>',
        solucion: `<p>Se oye ${zh("您", "nín")}, que sube. ${zh("你", "nǐ")} también empieza con «n», pero baja y sube y no termina en «n».</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Con quién usarías ${zh("您", "nín")}?</p>`,
        opciones: ['Con tu mejor amigo de la escuela', 'Con tu profesor', 'Con tu hermano pequeño', 'Con un compañero de tu edad'], correcta: 1,
        pista: '<p>Piensa en a quién le hablarías de «usted» en español.</p>',
        solucion: `<p>${zh("您", "nín")} es la forma de respeto de ${zh("你", "nǐ")}: se usa con profesores, mayores y desconocidos.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «hola a todos».</p>',
        respuesta: ['大家', '好'], pinyin: ['dàjiā', 'hǎo'], lang: 'zh-Hans',
        pista: '<p>Primero va a quién saludas.</p>',
        solucion: `<p>${zh("大家好", "dàjiā hǎo")}: primero «todos» y después ${zh("好", "hǎo")}.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe cómo se dice en voz alta ${zh("你好", "nǐ hǎo")}, con el cambio de tono de dos terceros tonos seguidos.</p>`,
        respuestas: ['ní hǎo'],
        pista: '<p>El primer tercer tono pasa a segundo tono (sube).</p>',
        solucion: `<p>Se dice <strong>ní hǎo</strong>: ${zh("你", "nǐ")} sube porque va antes de otro tercer tono.</p>` },
      { tipo: 'opciones', enunciado: `<p>Un compañero te dice ${zh("对不起", "duìbuqǐ")}. ¿Qué es lo habitual responder?</p>`,
        opciones: [zh('谢谢', 'xièxie'), zh('再见', 'zàijiàn'), zh('没关系', 'méi guānxi'), zh('不客气', 'bú kèqi')], correcta: 2,
        pista: '<p>Él pide perdón; tú le dices que no importa.</p>',
        solucion: `<p>A ${zh("对不起", "duìbuqǐ")} se responde ${zh("没关系", "méi guānxi")}, «no importa». ${zh("不客气", "bú kèqi")} responde a ${zh("谢谢", "xièxie")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '不客气', audio: a('bukeqi24.m4a') },
        sinAudio: '<p>Se dice <strong>bú kèqi</strong>: tres sílabas; la primera sube, la segunda baja de golpe y la tercera es suave.</p>',
        enunciado: '<p>Escucha la frase. ¿Qué significa?</p>',
        opciones: ['De nada', 'Lo siento', 'Adiós', 'Gracias'], correcta: 0,
        pista: '<p>Es lo que contestas cuando alguien te da las gracias.</p>',
        solucion: `<p>Se oye ${zh("不客气", "bú kèqi")}, «de nada».</p>` },
    ],
    fuentes: [
      SILABO, AUDIO, CANONNI,
      { nombre: 'Lin Hong (Central Oregon Community College, EE. UU.), Beginning Chinese, 3.1: Saying Hello, Humanities LibreTexts (en inglés)', url: 'https://human.libretexts.org/Bookshelves/Languages/Chinese/Beginning_Chinese_(Lin_Hong)_-_under_construction/03%3A_Greetings/3.01%3A_Saying_Hello_(%E6%A8%A1%E5%9D%97%E4%B8%80-_%E4%BD%A0%E5%A5%BD)' },
      { nombre: 'Western Kentucky University (EE. UU.), Chinese 101, Lesson 4 (en inglés)', url: 'https://people.wku.edu/shizhen.gao/Chinese101/Lesson4' },
      { nombre: 'Western Kentucky University (EE. UU.), Chinese 101, Lesson 2 (en inglés)', url: 'https://people.wku.edu/shizhen.gao/Chinese101/Lesson2' },
      CHINGRAM('personal-pronouns', 'Personal pronouns'),
    ],
  });

  // ------------------------------------------------------------------
  L('Presentarte: 我叫…', {
    objetivo: 'Decir cómo te llamas, preguntar el nombre de otra persona y mostrar que te alegra conocerla.',
    explicacion: `
      <p>Después de saludar, lo que sigue casi siempre es decir tu nombre. Y a quien acabas de conocer también le preguntas el suyo. Para eso hacen falta pocas palabras, pero conviene ver en qué orden van. Estas son las nueve palabras de la lección.</p>
      ${tabla([
        ['我', 'wǒ', 'yo, me', 'wo3.m4a'], ['叫', 'jiào', 'llamarse, llamar', 'jiao4.m4a'], ['什么', 'shénme', 'qué', 'shenme2.m4a'],
        ['名字', 'míngzi', 'nombre', 'mingzi2.m4a'], ['请问', 'qǐngwèn', 'permítame preguntar', 'qingwen34.m4a'], ['认识', 'rènshi', 'conocer (a alguien)', 'renshi4.m4a'],
        ['很', 'hěn', 'muy', 'hen3.m4a'], ['高兴', 'gāoxìng', 'contento', 'gaoxing14.m4a'], ['呢', 'ne', 'partícula de pregunta corta', 'ne.m4a'],
      ])}
      <h3>Cómo decir tu nombre</h3>
      <p>El orden es el mismo que en español. Para «me llamo Ana» dices ${zh("我叫 Ana", "wǒ jiào Ana")}: yo, llamo, Ana. Fíjate que el verbo ${zh("叫", "jiào")} no cambia de forma según quién hable: una universidad de EE. UU. explica que los verbos del chino no se conjugan. Por eso también se dice ${zh("你叫", "nǐ jiào")}, «tú te llamas». Aprendes una sola forma y la usas con todos. En las frases de este curso, el nombre propio se escribe con letras latinas, como en ${zh("我叫 Ana", "wǒ jiào Ana")}, para no mezclar caracteres que todavía no vemos.</p>
      <h3>Cómo preguntar el nombre</h3>
      <p>Para preguntar, en español movemos la palabra de pregunta al inicio: «¿Cómo te llamas?». En mandarín no se mueve. Según una clase de lingüística del MIT, las palabras de pregunta se quedan donde iría la respuesta. Compara las dos frases una debajo de la otra.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Frase</th><th scope="col">Quién</th><th scope="col">Verbo</th><th scope="col">Nombre</th></tr>
        <tr><td>Pregunta</td><td>${zh("你", "nǐ")}</td><td>${zh("叫", "jiào")}</td><td>${zh("什么名字", "shénme míngzi")}</td></tr>
        <tr><td>Respuesta</td><td>${zh("我", "wǒ")}</td><td>${zh("叫", "jiào")}</td><td>${zh("Ana", "Ana")}</td></tr>
      </table></div>
      <p>${zh("什么", "shénme")} («qué») ocupa el hueco del nombre, justo donde irá «Ana». La pregunta completa, ${zh("你叫什么名字", "nǐ jiào shénme míngzi")}, es literalmente «tú llamas qué nombre». Cuando preguntas por una cosa, ${zh("什么", "shénme")} suele ir en el lugar del objeto.</p>
      <h3>¿Y tú?</h3>
      <p>Una <strong>partícula</strong> es una palabra pequeña que no significa nada por sí sola, pero cambia el sentido de la frase (definición de la lección). ${zh("呢", "ne")} sirve para devolver la pregunta: si alguien dice su nombre, tú dices el tuyo y añades ${zh("你呢", "nǐ ne")}, «¿y tú?». Según una universidad de Chequia, se usa al final de una pregunta corta que se refiere a algo ya dicho. El sílabo lista otros usos de ${zh("呢", "ne")}, pero aquí solo veremos este. Un ejemplo corto: alguien te dice ${zh("我叫 Luis", "wǒ jiào Luis")} y tú no necesitas repetir toda la pregunta, basta con devolverla con ${zh("你呢", "nǐ ne")}. La partícula hace el trabajo de «y a ti, ¿qué?».</p>
      <h3>Qué gusto conocerte</h3>
      <p>Presentarse no termina con el nombre. En un encuentro normal también se dice que da gusto conocer a la otra persona, y para eso hay una frase corta y fija.</p>
      <p>${zh("认识", "rènshi")} es «conocer a alguien» y ${zh("高兴", "gāoxìng")} es «contento». Juntas dan ${zh("认识你很高兴", "rènshi nǐ hěn gāoxìng")}, «conocerte me alegra». Con un adjetivo como ${zh("高兴", "gāoxìng")} se usa ${zh("很", "hěn")} como enlace; aquí casi no hace falta traducirlo como «muy». Para empezar con cortesía, ${zh("请问", "qǐngwèn")} se pone antes de la pregunta, como «permítame preguntar» (esto último es simplificación de la lección).</p>
      <p class="nota"><strong>Trampa común:</strong> traducir palabra por palabra. ${zh("认识你很高兴", "rènshi nǐ hěn gāoxìng")} no dice «muy» ni «encantado» exactamente; es la frase fija para decir que te alegra conocer a alguien.</p>`,
    ejemplo: `
      <p>Dos personas se encuentran en una fiesta. Las frases de ejemplo de la lección usan nombres en español para no mezclar caracteres nuevos.</p>
      <ol class="pasos-ej">
        <li>Luis se acerca y abre con cortesía: ${zh("请问，你叫什么名字", "qǐngwèn, nǐ jiào shénme míngzi")}. Primero ${zh("请问", "qǐngwèn")} y después la pregunta.</li>
        <li>Ana responde con el mismo orden de la pregunta, pero con su nombre en el hueco: ${zh("我叫 Ana", "wǒ jiào Ana")}.</li>
        <li>Luis dice el suyo y devuelve la pregunta: ${zh("我叫 Luis，你呢", "wǒ jiào Luis, nǐ ne")}.</li>
        <li>Ana cierra: ${zh("认识你很高兴", "rènshi nǐ hěn gāoxìng")}.</li>
      </ol>
      <p>Comprueba: en la respuesta, ${zh("什么名字", "shénme míngzi")} fue reemplazado por el nombre y nada más cambió de lugar. Resultado: <span class="resultado">${zh("你叫什么名字", "nǐ jiào shénme míngzi")} → ${zh("我叫 Ana", "wǒ jiào Ana")}</span>.</p>
      <p class="nota"><strong>Error común:</strong> mover ${zh("什么", "shénme")} al inicio, como hacemos con «qué» en español. En chino se queda en el hueco de la respuesta.</p>`,
    vidaReal: `
      <p>Presentarte es lo primero que haces al conocer a alguien, y casi todo curso de idiomas empieza ahí:</p>
      <ul>
        <li>Decir tu nombre en un chat, en una videollamada o en un grupo de intercambio.</li>
        <li>Preguntar el nombre de alguien sin sonar brusco y devolver la pregunta.</li>
        <li>Entender, cuando escuchas a dos personas presentarse, quién dice qué.</li>
        <li>Reconocer en un diálogo de un curso o de una serie la pregunta por el nombre.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «¿cómo te llamas?» (literal: «tú llamas qué nombre»).</p>',
        respuesta: ['你', '叫', '什么', '名字'], pinyin: ['nǐ', 'jiào', 'shénme', 'míngzi'], lang: 'zh-Hans',
        pista: '<p>La palabra de pregunta ocupa el lugar del nombre, al final.</p>',
        solucion: `<p>${zh("你叫什么名字", "nǐ jiào shénme míngzi")}: ${zh("什么名字", "shénme míngzi")} se queda donde iría el nombre.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «me llamo Ana».</p>',
        respuesta: ['我', '叫', 'Ana'], pinyin: ['wǒ', 'jiào', 'Ana'], lang: 'zh-Hans',
        pista: '<p>Es igual que en español: yo, llamo, nombre.</p>',
        solucion: `<p>${zh("我叫 Ana", "wǒ jiào Ana")}: sujeto, verbo y nombre.</p>` },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas frases pregunta el nombre de alguien?</p>',
        opciones: [zh('我叫什么名字', 'wǒ jiào shénme míngzi'), zh('你叫什么名字', 'nǐ jiào shénme míngzi'), zh('什么你叫名字', 'shénme nǐ jiào míngzi'), zh('你什么叫名字', 'nǐ shénme jiào míngzi')], correcta: 1,
        pista: '<p>Pregunta por la otra persona y deja «qué» en el hueco del nombre.</p>',
        solucion: `<p>Es ${zh("你叫什么名字", "nǐ jiào shénme míngzi")}. En las otras opciones, ${zh("什么", "shénme")} sale de su hueco o el sujeto es ${zh("我", "wǒ")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '认识', audio: a('renshi4.m4a') },
        sinAudio: '<p>Se dice <strong>rènshi</strong>: la primera sílaba cae de golpe (cuarto tono) y la segunda es suave.</p>',
        enunciado: '<p>Escucha la palabra. ¿Qué significa?</p>',
        opciones: ['Conocer a alguien', 'Nombre', 'Contento', 'Llamarse'], correcta: 0,
        pista: '<p>Es el verbo que va antes de «tú» en la frase de cortesía al presentarte.</p>',
        solucion: `<p>Se oye ${zh("认识", "rènshi")}, «conocer». ${zh("名字", "míngzi")} es «nombre».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("名字", "míngzi")} («nombre»), separando las sílabas con un espacio.</p>`,
        respuestas: ['míng zi'],
        pista: '<p>La primera sílaba sube; la segunda es suave y no lleva marca.</p>',
        solucion: `<p>Es <strong>míng zi</strong>: segundo tono en «míng» y sílaba suave en «zi».</p>` },
      { tipo: 'opciones', enunciado: `<p>Ana te dice su nombre y tú quieres devolverle la pregunta con ${zh("呢", "ne")}. ¿Qué dices?</p>`,
        opciones: [zh('你呢', 'nǐ ne'), zh('我呢', 'wǒ ne'), zh('什么呢', 'shénme ne'), zh('很呢', 'hěn ne')], correcta: 0,
        pista: '<p>Quieres saber el nombre de ella, no el tuyo.</p>',
        solucion: `<p>${zh("你呢", "nǐ ne")} es «¿y tú?». ${zh("呢", "ne")} repite la pregunta que ya se hizo.</p>` },
    ],
    fuentes: [
      SILABO, AUDIO,
      CHINGRAM('interrogative-pronoun-shenme-%e4%bb%80%e4%b9%88-%e4%bb%80%e9%ba%bc-what-something-anything-any-every', 'Interrogative pronoun shénme 什么'),
      CHINGRAM('title-question-particle-ne-%e5%91%a2', 'Question particle ne 呢'),
      { nombre: 'MIT OpenCourseWare (EE. UU.), 24.900 Introduction to Linguistics, primavera 2022, transcripción de la clase sobre preguntas (en inglés)', url: 'https://ocw.mit.edu/courses/24-900-introduction-to-linguistics-spring-2022/1674PlF6St7rQdmyY6CeL9me_tAK1FYFB_transcript.pdf' },
      HAWAI_SHI,
    ],
  });

  // ------------------------------------------------------------------
  L('Pronombres personales', {
    objetivo: 'Usar yo, tú, él, ella y sus plurales en mandarín, y entender por qué «él», «ella» y «ello» suenan igual.',
    explicacion: `
      <p>Piensa en lo que dices cada día: «yo», «tú», «ella», «nosotros». Son palabras que reemplazan a una persona sin repetir su nombre. Se llaman <strong>pronombres</strong>. En mandarín son pocos y muy regulares, y casi no hay que cambiar nada al usarlos. Eso los hace una de las primeras cosas que conviene dominar. Estos son los nuevos.</p>
      ${tabla([
        ['他', 'tā', 'él', 'ta1.m4a'], ['她', 'tā', 'ella', 'ta1.m4a'], ['它', 'tā', 'ello (cosa o animal)', 'ta1.m4a'],
        ['们', 'men', 'sufijo del plural', 'men.m4a'], ['我们', 'wǒmen', 'nosotros', 'women3.m4a'], ['你们', 'nǐmen', 'ustedes, vosotros', 'nimen3.m4a'],
        ['他们', 'tāmen', 'ellos', 'tamen1.m4a'], ['她们', 'tāmen', 'ellas', 'tamen1.m4a'], ['它们', 'tāmen', 'ellos o ellas (cosas o animales)', 'tamen1.m4a'],
      ])}
      <h3>Tres pronombres base</h3>
      <p>Empecemos por lo que ya sabes, porque casi todo el resto se construye encima.</p>
      <p>Ya conoces ${zh("我", "wǒ")} («yo») y ${zh("你", "nǐ")} («tú»). El tercero es ${zh("他", "tā")}, «él». También viste ${zh("您", "nín")}, el «usted» de respeto, y ${zh("大家", "dàjiā")}, «todos». Con ${zh("我", "wǒ")}, ${zh("你", "nǐ")} y ${zh("他", "tā")} puedes hablar de casi cualquier persona.</p>
      <h3>Un sufijo para el plural</h3>
      <p>Aquí está la gran ventaja del mandarín: el plural no se aprende palabra por palabra, se arma con una sola pieza que sirve siempre.</p>
      <p>En español cambiamos la palabra entera: «yo» pasa a «nosotros». En mandarín solo pegas una pieza al final. Esa pieza es ${zh("们", "men")}, un <strong>sufijo</strong>: una parte que se añade al final de una palabra para cambiar su sentido. Según una universidad de Chequia, el plural se forma añadiendo ${zh("们", "men")} después del singular.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Singular</th><th scope="col">Plural</th></tr>
        <tr><td>${zh("我", "wǒ", { es: "yo" })}</td><td>${zh("我们", "wǒmen", { es: "nosotros" })}</td></tr>
        <tr><td>${zh("你", "nǐ", { es: "tú" })}</td><td>${zh("你们", "nǐmen", { es: "ustedes" })}</td></tr>
        <tr><td>${zh("他", "tā", { es: "él" })}</td><td>${zh("他们", "tāmen", { es: "ellos" })}</td></tr>
        <tr><td>${zh("她", "tā", { es: "ella" })}</td><td>${zh("她们", "tāmen", { es: "ellas" })}</td></tr>
        <tr><td>${zh("它", "tā", { es: "ello" })}</td><td>${zh("它们", "tāmen", { es: "ellos (cosas)" })}</td></tr>
      </table></div>
      <h3>Tres escrituras, un solo sonido</h3>
      <p>Mira las tres últimas filas de la tabla: ${zh("他", "tā")}, ${zh("她", "tā")} y ${zh("它", "tā")} se dicen igual. Según la misma universidad, los tres se pronuncian tā al hablar, y el sentido se entiende por el contexto. Solo al escribir se distinguen: ${zh("他", "tā")} es un hombre, ${zh("她", "tā")} es una mujer y ${zh("它", "tā")} es una cosa o un animal.</p>
      <p>Hay una pista visual: ${zh("她", "tā")} lleva a la izquierda el radical ${zh("女")}, que se relaciona con «mujer». Ese dato es simplificación de la lección; los radicales se ven en "Radicales: las piezas de los caracteres".</p>
      <h3>El pronombre no cambia de forma</h3>
      <p>En español, «yo» pasa a «me» o «mí» según su papel en la frase. En mandarín no: la misma palabra sirve de sujeto y de objeto, sin cambiar de forma. Por eso ${zh("我", "wǒ")} significa «yo» y también «me». Pasa lo mismo con ${zh("你", "nǐ")} y ${zh("他", "tā")}. Según la universidad de Chequia, estos pronombres funcionan como sujeto y como objeto sin cambiar de forma. Así que en ${zh("我认识他", "wǒ rènshi tā")} el último pronombre es «lo» y en ${zh("他叫 Luis", "tā jiào Luis")} ese mismo pronombre es «él».</p>
      <p class="nota"><strong>Trampa común:</strong> creer que ${zh("们", "men")} puede ir solo. ${zh("们", "men")} es una pieza que se pega a un pronombre; no se usa suelta.</p>`,
    ejemplo: `
      <p>Vamos a pasar tres frases de la lección anterior del singular al plural. Las frases de ejemplo de la lección usan solo palabras ya vistas.</p>
      <ol class="pasos-ej">
        <li>${zh("你好", "nǐ hǎo")} se dice a una persona. Para saludar a varias cambias ${zh("你", "nǐ")} por ${zh("你们", "nǐmen")}: ${zh("你们好", "nǐmen hǎo")}.</li>
        <li>${zh("我认识他", "wǒ rènshi tā")} es «lo conozco». Para decir «los conozco» pegas ${zh("们", "men")} a ${zh("他", "tā")}: ${zh("我认识他们", "wǒ rènshi tāmen")}. El objeto no cambia de forma, solo suma el sufijo.</li>
        <li>${zh("她很高兴", "tā hěn gāoxìng")} es «ella está contenta». En plural queda ${zh("她们很高兴", "tāmen hěn gāoxìng")}. El resto de la frase no se toca.</li>
      </ol>
      <p>Comprueba: en las tres frases solo se agregó ${zh("们", "men")}. Resultado: <span class="resultado">${zh("她", "tā")} + ${zh("们", "men")} = ${zh("她们", "tāmen")}</span>.</p>
      <p class="nota"><strong>Error común:</strong> intentar distinguir ${zh("他们", "tāmen")} y ${zh("她们", "tāmen")} al oír. Suenan igual; el contexto te dice quiénes son.</p>`,
    vidaReal: `
      <p>Estas palabras aparecen en casi cada frase que dices, así que sirven desde el primer día:</p>
      <ul>
        <li>Hablar de ti, de tus amigos y de tu familia sin repetir nombres.</li>
        <li>Seguir un chat o un diálogo en que se habla de «ellos» y «nosotros».</li>
        <li>Preguntarle algo a un grupo entero en vez de repetir la pregunta a cada persona.</li>
        <li>Saber por qué, al leer un mensaje, hay tres formas escritas de «él» y «ella» que suenan igual.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cómo se dice «nosotros»?</p>',
        opciones: [zh('你们', 'nǐmen'), zh('我们', 'wǒmen'), zh('他们', 'tāmen'), zh('大家', 'dàjiā')], correcta: 1,
        pista: '<p>Parte de «yo» y pega el sufijo del plural.</p>',
        solucion: `<p>${zh("我", "wǒ")} + ${zh("们", "men")} = ${zh("我们", "wǒmen")}, «nosotros».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("她们", "tāmen")} («ellas»), separando las sílabas con un espacio.</p>`,
        respuestas: ['tā men'],
        pista: '<p>La primera sílaba es tā (primer tono) y la segunda no lleva marca.</p>',
        solucion: '<p>Es <strong>tā men</strong>: igual que ellos y que las cosas en plural.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «los conozco» (literal: «yo conozco a ellos»).</p>',
        respuesta: ['我', '认识', '他们'], pinyin: ['wǒ', 'rènshi', 'tāmen'], lang: 'zh-Hans',
        pista: '<p>El orden es el mismo que en español: quién, verbo y a quién.</p>',
        solucion: `<p>${zh("我认识他们", "wǒ rènshi tāmen")}: sujeto, verbo, objeto. El pronombre no cambia de forma.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «hola a ustedes».</p>',
        respuesta: ['你们', '好'], pinyin: ['nǐmen', 'hǎo'], lang: 'zh-Hans',
        pista: '<p>Primero va a quién saludas.</p>',
        solucion: `<p>${zh("你们好", "nǐmen hǎo")}: ${zh("你们", "nǐmen")} es «ustedes».</p>` },
      { tipo: 'texto', enunciado: `<p>¿Qué significa ${zh("你们", "nǐmen")}? Escribe la palabra en español.</p>`,
        respuestas: ['ustedes', 'vosotros', 'vosotras', 'ustedes (vosotros)', 'ustedes/vosotros'],
        pista: '<p>Es el plural de «tú».</p>',
        solucion: `<p>${zh("你们", "nǐmen")} es «ustedes» o «vosotros»: ${zh("你", "nǐ")} + ${zh("们", "men")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '我们', audio: a('women3.m4a') },
        sinAudio: '<p>Se dice <strong>wǒmen</strong>: la primera sílaba baja y sube (tercer tono) y la segunda es suave.</p>',
        enunciado: '<p>Escucha la palabra. ¿Cuál es?</p>',
        opciones: [zh('我们', 'wǒmen'), zh('你们', 'nǐmen'), zh('他们', 'tāmen'), zh('我', 'wǒ')], correcta: 0,
        pista: '<p>Empieza con «wo» y tiene dos sílabas.</p>',
        solucion: `<p>Se oye ${zh("我们", "wǒmen")}. ${zh("我", "wǒ")} es solo una sílaba.</p>` },
    ],
    fuentes: [SILABO, AUDIO, CHINGRAM('personal-pronouns', 'Personal pronouns')],
  });

  // ------------------------------------------------------------------
  L('Números del 0 al 100', {
    objetivo: 'Decir y leer cualquier número del 0 al 100 en mandarín con doce palabras y una regla de armado.',
    explicacion: `
      <p>Piensa en cómo cuentas en español: «uno, dos… diez, once, doce… veinte, treinta». Hay que memorizar muchos nombres. En mandarín bastan doce palabras para llegar hasta cien, porque los números se arman como una cuenta en lugar de inventar un nombre nuevo para cada uno. Estas son las doce.</p>
      ${tabla([
        ['零', 'líng', 'cero', 'ling2.m4a'], ['一', 'yī', 'uno', 'yi1.m4a'], ['二', 'èr', 'dos', 'er4.m4a'], ['三', 'sān', 'tres', 'san1.m4a'],
        ['四', 'sì', 'cuatro', 'si4.m4a'], ['五', 'wǔ', 'cinco', 'wu3.m4a'], ['六', 'liù', 'seis', 'liu4.m4a'], ['七', 'qī', 'siete', 'qi1.m4a'],
        ['八', 'bā', 'ocho', 'ba1.m4a'], ['九', 'jiǔ', 'nueve', 'jiu3.m4a'], ['十', 'shí', 'diez', 'shi2.m4a'], ['百', 'bǎi', 'cien (centena)', 'bai3.m4a'],
      ])}
      <h3>Del 0 al 10</h3>
      <p>Estas once palabras (del cero al diez) se memorizan una por una, como en cualquier idioma. Practica diciéndolas en orden y señalando con los dedos: cuando las sepas de memoria, el resto es pura cuenta. Tres de ellas, ${zh("一", "yī")}, ${zh("二", "èr")} y ${zh("三", "sān")}, se escriben con uno, dos y tres trazos horizontales. Los trazos se ven en "Trazos y orden de trazos".</p>
      <h3>Del 11 al 99: una cuenta, no un nombre nuevo</h3>
      <p>Aquí está lo bueno. Una <strong>decena</strong> es un grupo de diez. En español, el 11 se llama «once» y el 20 «veinte»; son nombres especiales. En mandarín no hay nombres especiales: según una universidad de Chequia, del 10 al 99 la estructura es regular. ${zh("十一", "shíyī")} es «diez y uno», o sea 11. Que no haya palabras irregulares como «once» es una simplificación de la lección.</p>
      <p>La regla tiene dos casos. Del 11 al 19, dices ${zh("十", "shí")} y la unidad. Del 20 en adelante, dices cuántas decenas hay, luego ${zh("十", "shí")} y luego la unidad.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Número</th><th scope="col">Se escribe</th><th scope="col">La cuenta</th></tr>
        <tr><td>11</td><td>${zh("十一", "shíyī")}</td><td>diez-uno</td></tr>
        <tr><td>20</td><td>${zh("二十", "èrshí")}</td><td>dos-diez</td></tr>
        <tr><td>25</td><td>${zh("二十五", "èrshíwǔ")}</td><td>dos-diez-cinco</td></tr>
        <tr><td>99</td><td>${zh("九十九", "jiǔshíjiǔ")}</td><td>nueve-diez-nueve</td></tr>
        <tr><td>100</td><td>${zh("一百", "yì bǎi")}</td><td>uno-cien</td></tr>
      </table></div>
      <p>Para leer ${zh("二十五", "èrshíwǔ")}, piensa «dos decenas y cinco»: 2 × 10 + 5 = 25. Esa lectura como multiplicación es una simplificación de la lección, pero siempre funciona.</p>
      <h3>Cómo practicar con la regla</h3>
      <p>Para comprobar que entendiste, haz este juego. Elige un número de dos cifras, por ejemplo 52. La primera cifra dice cuántas decenas hay: 5, o sea ${zh("五十", "wǔshí")}. La segunda es la unidad: 2, ${zh("二", "èr")}. Pegas las dos partes y sale ${zh("五十二", "wǔshíèr")}. Si el número termina en cero, como 60, no dices la unidad: es solo ${zh("六十", "liùshí")}. Funciona con cualquier número, sin excepciones que memorizar. Es una de las razones por las que contar en mandarín se aprende rápido.</p>
      <h3>El cien</h3>
      <p>${zh("百", "bǎi")} va después de otro número: ${zh("一百", "yì bǎi")} es 100. Verás que se escribe yī pero se dice «yì», porque ${zh("一", "yī")} cambia de tono delante de ciertas sílabas, como viste en "Cambios de tono: el tercer tono, ${zh("不")} y ${zh("一")}". Los tonos de la tabla son los originales, y algunos cambian al hablar.</p>
      <p class="nota"><strong>Trampa común:</strong> decir ${zh("二十", "èrshí")} como «dos-diez» y pensar que son dos números separados. Es un solo número: 20. Otro número para «dos», ${zh("两")}, se verá en "Clasificadores: ${zh("个")} y otros".</p>`,
    ejemplo: `
      <p>Vamos a decir un número y a leer otro. Las frases de ejemplo de la lección son solo cuentas con las doce palabras.</p>
      <ol class="pasos-ej">
        <li>Para decir 47, separa las decenas de las unidades: 4 decenas y 7 unidades.</li>
        <li>Las decenas se dicen con el número y ${zh("十", "shí")}: cuatro-diez es ${zh("四十", "sìshí")}.</li>
        <li>Pega la unidad al final: ${zh("七", "qī")}. Queda ${zh("四十七", "sìshíqī")}.</li>
        <li>Ahora lee ${zh("八十三", "bāshísān")}: ocho-diez-tres. Son 8 decenas más 3: 80 + 3 = 83.</li>
        <li>Prueba al revés: para decir 90, necesitas nueve decenas y ninguna unidad, así que basta ${zh("九十", "jiǔshí")}, sin decir cero al final.</li>
      </ol>
      <p>Comprueba: leído de izquierda a derecha, cada número es una cuenta fácil. Resultado: <span class="resultado">${zh("四十七", "sìshíqī")} = 47 y ${zh("八十三", "bāshísān")} = 83</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar el ${zh("十", "shí")} del medio y decir ${zh("四七", "sìqī")}. Sin el ${zh("十", "shí")} no sabes cuántas decenas hay.</p>`,
    vidaReal: `
      <p>Los números salen en todas partes, así que son de las primeras palabras que conviene aprender:</p>
      <ul>
        <li>Leer un precio, una cantidad o un puntaje en un letrero o una tienda en línea.</li>
        <li>Decir tu edad, un número de habitación o una fecha sin tener que pensar.</li>
        <li>Entender cuando alguien te da un número de teléfono dígito por dígito.</li>
        <li>Contar objetos o personas en voz alta, por ejemplo hasta cien.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: `<p>¿Qué número es ${zh("六十八", "liùshíbā")}?</p>`, respuesta: 68,
        pista: '<p>Seis decenas y ocho unidades.</p>',
        solucion: `<p>${zh("六", "liù")}-${zh("十", "shí")}-${zh("八", "bā")}: 6 × 10 + 8 = <strong>68</strong>.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir 35 (tres decenas y cinco unidades).</p>',
        respuesta: ['三', '十', '五'], pinyin: ['sān', 'shí', 'wǔ'], lang: 'zh-Hans',
        pista: '<p>Primero cuántas decenas, luego la palabra para diez, y al final la unidad.</p>',
        solucion: `<p>${zh("三十五", "sānshíwǔ")}: tres-diez-cinco.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("八十", "bāshí")}, separando las sílabas con un espacio.</p>`,
        respuestas: ['bā shí'],
        pista: '<p>Ocho es bā, primer tono; diez es shí, segundo tono.</p>',
        solucion: `<p>Es <strong>bā shí</strong>: ocho decenas, 80.</p>` },
      { tipo: 'numero', escucha: { voz: '三十六' },
        sinAudio: '<p>Se dice <strong>sān shí liù</strong>: tres, diez, seis. Las sílabas son sān (alto y plano), shí (sube) y liù (cae).</p>',
        enunciado: '<p>Escucha el número y escríbelo con cifras.</p>', respuesta: 36,
        pista: '<p>Cuenta cuántas decenas oyes y cuál es la unidad final.</p>',
        solucion: `<p>Se oye ${zh("三十六", "sānshíliù")}: 3 decenas y 6 unidades, <strong>36</strong>.</p>` },
      { tipo: 'opciones', escucha: { voz: '七', audio: a('qi1.m4a') },
        sinAudio: '<p>Se dice <strong>qī</strong>: empieza con «q» y la vocal se mantiene alta y plana (primer tono).</p>',
        enunciado: '<p>Escucha el número. ¿Cuál es?</p>',
        opciones: [zh('一', 'yī'), zh('七', 'qī'), zh('八', 'bā'), zh('九', 'jiǔ')], correcta: 1,
        pista: '<p>Es una sola sílaba y empieza con «q».</p>',
        solucion: `<p>Se oye ${zh("七", "qī")}, 7. ${zh("一", "yī")} se parece en el tono, pero empieza con otro sonido.</p>` },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos números es 100?</p>',
        opciones: [zh('十十', 'shí shí'), zh('九十九', 'jiǔshíjiǔ'), zh('一百', 'yì bǎi'), zh('十', 'shí')], correcta: 2,
        pista: '<p>La palabra para «cien» es la última de la tabla.</p>',
        solucion: `<p>${zh("一百", "yì bǎi")} es 100. ${zh("九十九", "jiǔshíjiǔ")} es 99.</p>` },
    ],
    fuentes: [SILABO, AUDIO, CHINGRAM('numerals', 'Numerals')],
  });

  // --- Lecciones 5 a 8: segundo constructor ---
  const KAP = (ruta, nombre) => ({ nombre: `Kapiolani Community College, Univ. de Hawái (EE. UU.), CHN101 Elementary Mandarin I Textbook: ${nombre} (en inglés)`, url: 'https://human.libretexts.org/Courses/Kapiolani_Community_College/CHN101%3A_Elementary_Mandarin_I_(Polley)/Elementary_Mandarin_I_Textbook/' + ruta });
  const KAP_ESTATIVO = KAP('06%3A_At_the_Restaurant/6.07%3A_Lesson_5_Grammar_-_Simple_noun__stative_verb_sentences', 'Lesson 5 Grammar, Simple "noun + stative verb" sentences');
  const KAP_MA = KAP('03%3A_Origins_and_Language/3.08%3A_Lesson_2_Grammar_-_Yes-no_questions_with_ma', 'Lesson 2 Grammar, Yes-no questions with 吗');
  const KAP_BU = KAP('03%3A_Origins_and_Language/3.07%3A_Lesson_2_Grammar_-_Standard_negation_with__(bu)', 'Lesson 2 Grammar, Standard negation with 不');
  const KAP_DE = KAP('02%3A_First_Contact/2.07%3A_Lesson_1_Grammar_-_Expressing_Belongingwith__(de)', 'Lesson 1 Grammar, Expressing Belonging with 的');
  const KAP_CERCANA = KAP('04%3A_Family/4.07%3A_Lesson_3_Grammar_-_Expressing_close_possession_without__(de)', 'Lesson 3 Grammar, Expressing close possession without 的');
  const MIT_CHINO = { nombre: 'MIT OpenCourseWare (EE. UU.), J. K. Wheatley, Learning Chinese: A Foundation Course in Mandarin, 2011 (en inglés)', url: 'https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/res21g_003_s_11.pdf' };
  const MIT_PREGUNTAS = { nombre: 'MIT OpenCourseWare (EE. UU.), 24.900 Introduction to Linguistics, primavera 2022, transcripción de la clase sobre preguntas (en inglés)', url: 'https://ocw.mit.edu/courses/24-900-introduction-to-linguistics-spring-2022/1674PlF6St7rQdmyY6CeL9me_tAK1FYFB_transcript.pdf' };
  const CANON_ZG = { nombre: CANONNI.nombre, url: 'https://commons.wikimedia.org/wiki/File:LL-Q9192_(cmn)-CanonNi-%E4%B8%AD%E5%9B%BD.wav' };

  // ------------------------------------------------------------------
  L('El verbo 是', {
    objetivo: `Usar ${zh("是")} para decir quién eres y de dónde eres, y saber cuándo no debe ir.`,
    explicacion: `
      <p>Piensa en «soy estudiante», «eres estudiante» y «somos estudiantes». En español el verbo «ser» cambia de forma cada vez. En mandarín hay una sola palabra para todos esos casos: ${zh("是", "shì")}. Estas son las doce palabras de la lección.</p>
      ${tabla([
        ['是', 'shì', 'ser, es, soy', 'shi4.m4a'], ['学生', 'xuéshēng', 'estudiante', 'xuesheng2.m4a'], ['同学', 'tóngxué', 'compañero de clase', 'tongxue22.m4a'],
        ['朋友', 'péngyou', 'amigo, amiga', 'pengyou2.m4a'], ['医生', 'yīshēng', 'médico, médica', 'yisheng11.m4a'], ['人', 'rén', 'persona', 'ren2.m4a'],
        ['中国', 'Zhōngguó', 'China', 'zhongguo12.m4a'], ['这', 'zhè', 'esto, este', 'zhe4.m4a'], ['那', 'nà', 'eso, aquello', 'na4.m4a'],
        ['也', 'yě', 'también', 'ye3.m4a'], ['哪', 'nǎ', 'qué, cuál', 'na3.m4a'], ['国', 'guó', 'país', 'guo2.m4a'],
      ])}
      <h3>A es B</h3>
      <p>Un <strong>verbo</strong> es la palabra que dice qué se hace o qué se es. El <strong>sujeto</strong> es quien hace o es eso. ${zh("是", "shì")} une dos cosas que son lo mismo o que pertenecen a un mismo grupo, y el sílabo lo pone en el nivel 1 como la frase de «igualdad o clase». El orden es sujeto, ${zh("是", "shì")} y lo que es: ${zh("我是学生", "wǒ shì xuéshēng")}, «yo soy estudiante».</p>
      <h3>Una sola forma</h3>
      <p>Una universidad de EE. UU. explica que los verbos del chino no se conjugan: la forma del verbo es la misma sin importar quién lo haga. Por eso ${zh("是", "shì")} cubre todo lo que en español son «soy», «eres», «es», «somos» y «son».</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Frase</th><th scope="col">En español</th></tr>
        <tr><td>${zh("我是学生", "wǒ shì xuéshēng")}</td><td>soy estudiante</td></tr>
        <tr><td>${zh("你是学生", "nǐ shì xuéshēng")}</td><td>eres estudiante</td></tr>
        <tr><td>${zh("他是医生", "tā shì yīshēng")}</td><td>es médico</td></tr>
        <tr><td>${zh("我们是同学", "wǒmen shì tóngxué")}</td><td>somos compañeros</td></tr>
        <tr><td>${zh("他们是朋友", "tāmen shì péngyou")}</td><td>son amigos</td></tr>
      </table></div>
      <h3>También, esto y de dónde</h3>
      <p>${zh("也", "yě")} («también») se pone entre el sujeto y ${zh("是", "shì")}: ${zh("她也是学生", "tā yě shì xuéshēng")}. ${zh("这", "zhè")} y ${zh("那", "nà")} señalan cosas cercanas y lejanas: ${zh("那是医生", "nà shì yīshēng")}. Para preguntar el país, ${zh("哪国人", "nǎ guó rén")} es «qué país persona». Según una clase de lingüística del MIT, en chino la palabra de pregunta se queda en el lugar de la respuesta, así que ${zh("你是哪国人", "nǐ shì nǎ guó rén")} se contesta ${zh("我是中国人", "wǒ shì Zhōngguó rén")}, con ${zh("中国", "Zhōngguó")} en el hueco de ${zh("哪国", "nǎ guó")}.</p>
      <h3>Personas y profesiones</h3>
      <p>Con ${zh("人", "rén")} se forman las nacionalidades: ${zh("中国人", "Zhōngguó rén")} es «persona de China», es decir, «chino». Con ${zh("学生", "xuéshēng")}, ${zh("医生", "yīshēng")} y ${zh("朋友", "péngyou")} dices quién eres o quién es alguien, y ${zh("同学", "tóngxué")} es quien estudia contigo en la misma clase. Al hablar, la segunda sílaba de ${zh("学生", "xuéshēng")} suele sonar breve (simplificación de la lección); aquí se escribe como en el sílabo. En estas frases no aparece ningún artículo: ${zh("他是医生", "tā shì yīshēng")} puede ser «es médico» o «es un médico», y el contexto decide (simplificación de la lección).</p>
      <h3>Con adjetivos no va ${zh("是")}</h3>
      <p>Un adjetivo dice cómo es o cómo está algo, como ${zh("高兴", "gāoxìng")}. Un libro de la Universidad de Hawái llama «error clásico» poner ${zh("是", "shì")} ahí y pide usar ${zh("很", "hěn")}. Un curso del MIT dice que ${zh("很", "hěn")} es el adverbio que se pone por defecto, así que no hace falta traducirlo como «muy»: ${zh("我很高兴", "wǒ hěn gāoxìng")}, «estoy contento».</p>
      <p class="nota"><strong>Trampa común:</strong> decir ${zh("我是高兴", "wǒ shì gāoxìng")}. ${zh("是", "shì")} une cosas («A es B»); para cómo estás se usa ${zh("很", "hěn")}.</p>`,
    ejemplo: `
      <p>Las frases de ejemplo de la lección usan solo palabras ya vistas. Vamos a presentarnos en cuatro pasos.</p>
      <ol class="pasos-ej">
        <li>Dices lo que eres: ${zh("我是学生", "wǒ shì xuéshēng")}.</li>
        <li>Tu amiga es igual. Pones ${zh("也", "yě")} entre ella y ${zh("是", "shì")}: ${zh("她也是学生", "tā yě shì xuéshēng")}.</li>
        <li>Preguntas el país: ${zh("你是哪国人", "nǐ shì nǎ guó rén")}. ${zh("哪国", "nǎ guó")} se queda en su sitio.</li>
        <li>Respondes cambiando solo ese hueco: ${zh("我是中国人", "wǒ shì Zhōngguó rén")}.</li>
        <li>Ahora hablas de dos personas: ${zh("他们是同学", "tāmen shì tóngxué")}. El sujeto pasó a plural y ${zh("是", "shì")} sigue igual.</li>
      </ol>
      <p>Comprueba: ${zh("是", "shì")} no cambió en ninguna frase. Resultado: <span class="resultado">${zh("我是中国人", "wǒ shì Zhōngguó rén")} = «soy chino»</span>.</p>
      <p class="nota"><strong>Error común:</strong> poner ${zh("也", "yě")} después de ${zh("是", "shì")}, como en español «soy también». En chino va antes.</p>`,
    vidaReal: `
      <p>Decir quién eres y de dónde eres es de lo primero que te preguntan:</p>
      <ul>
        <li>Presentar a un compañero o a un amigo sin conjugar nada.</li>
        <li>Contestar cuando alguien te pregunta tu país.</li>
        <li>Entender, en un diálogo de curso, quién es qué.</li>
        <li>Decir cuál es tu ocupación o la de un amigo, sin pensar en conjugaciones.</li>
        <li>Contar de qué país es alguien al presentarlo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «yo también soy estudiante».</p>',
        respuesta: ['我', '也', '是', '学生'], pinyin: ['wǒ', 'yě', 'shì', 'xuéshēng'], lang: 'zh-Hans',
        pista: '<p>«También» va antes del verbo.</p>',
        solucion: `<p>${zh("我也是学生", "wǒ yě shì xuéshēng")}: ${zh("也", "yě")} entre el sujeto y ${zh("是", "shì")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «¿de qué país eres?» (literal: «tú eres qué país persona»).</p>',
        respuesta: ['你', '是', '哪', '国', '人'], pinyin: ['nǐ', 'shì', 'nǎ', 'guó', 'rén'], lang: 'zh-Hans',
        pista: '<p>La palabra de pregunta ocupa el lugar de la respuesta.</p>',
        solucion: `<p>${zh("你是哪国人", "nǐ shì nǎ guó rén")}: ${zh("哪国", "nǎ guó")} va donde irá el país.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres decir «estoy contento». ¿Qué frase es correcta?</p>',
        opciones: [zh('我是高兴', 'wǒ shì gāoxìng'), zh('我高兴是', 'wǒ gāoxìng shì'), zh('我很高兴', 'wǒ hěn gāoxìng'), zh('是我高兴', 'shì wǒ gāoxìng')], correcta: 2,
        pista: '<p>«Contento» es un adjetivo.</p>',
        solucion: `<p>Con adjetivos se usa ${zh("很", "hěn")}, no ${zh("是", "shì")}: ${zh("我很高兴", "wǒ hěn gāoxìng")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '学生', audio: a('xuesheng2.m4a') },
        sinAudio: '<p>Se dice <strong>xuéshēng</strong>: la primera sílaba sube (segundo tono) y la segunda, en la grabación, suena breve y suave. El sílabo la escribe con primer tono (alto y plano).</p>',
        enunciado: '<p>Escucha la palabra. ¿Qué significa?</p>',
        opciones: ['Médico', 'Amigo', 'País', 'Estudiante'], correcta: 3,
        pista: '<p>Es lo que dice ser quien dice «yo soy…» en el primer ejemplo.</p>',
        solucion: `<p>Se oye ${zh("学生", "xuéshēng")}, «estudiante». ${zh("医生", "yīshēng")} suena parecido, pero es «médico».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("中国", "Zhōngguó")}, separando las sílabas con un espacio.</p>`,
        respuestas: ['zhōng guó'],
        pista: '<p>La primera sílaba es de tono alto y plano; la segunda sube.</p>',
        solucion: '<p>Es <strong>zhōng guó</strong>: primer tono y segundo tono.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas frases dice «ella es médica»?</p>',
        opciones: [zh('她医生', 'tā yīshēng'), zh('她是医生', 'tā shì yīshēng'), zh('她也医生', 'tā yě yīshēng'), zh('是她医生', 'shì tā yīshēng')], correcta: 1,
        pista: '<p>Une las dos cosas con el verbo.</p>',
        solucion: `<p>${zh("她是医生", "tā shì yīshēng")}: sujeto, ${zh("是", "shì")} y lo que es.</p>` },
    ],
    fuentes: [SILABO, AUDIO, CANON_ZG, HAWAI_SHI, KAP_ESTATIVO, MIT_CHINO, MIT_PREGUNTAS],
  });

  // ------------------------------------------------------------------
  L('Preguntas con 吗', {
    objetivo: `Convertir una afirmación en pregunta de sí o no con ${zh("吗")} y contestarla repitiendo el verbo o el adjetivo.`,
    explicacion: `
      <p>Piensa en «¿estás ocupado?» o «¿te gusta el té?». Son preguntas que se contestan con «sí» o «no». En español las marcamos con signos y con la voz. En mandarín basta una palabra al final de la frase. Estas son las nueve de la lección.</p>
      ${tabla([
        ['吗', 'ma', 'partícula de pregunta de sí o no', 'ma.m4a'], ['忙', 'máng', 'ocupado', 'mang2.m4a'], ['冷', 'lěng', 'frío (tener frío)', 'leng3.m4a'],
        ['热', 'rè', 'caliente (tener calor)', 're4.m4a'], ['喜欢', 'xǐhuan', 'gustar, querer', 'xihuan3.m4a'], ['喝', 'hē', 'beber', 'he1.m4a'],
        ['茶', 'chá', 'té', 'cha2.m4a'], ['水', 'shuǐ', 'agua', 'shui3.m4a'], ['都', 'dōu', 'todos, todo', 'dou1.m4a'],
      ])}
      <h3>Afirmación más ${zh("吗")}</h3>
      <p>Una <strong>pregunta de sí o no</strong> es la que se contesta con «sí» o «no». Según una universidad de EE. UU., al poner ${zh("吗", "ma")} al final de una afirmación la conviertes en pregunta, y puedes pensar en ${zh("吗", "ma")} como un signo de interrogación que se dice en voz alta. La estructura es afirmación más ${zh("吗", "ma")}, y se ve que el orden de las palabras no cambia.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Afirmación</th><th scope="col">Pregunta</th><th scope="col">Respuesta corta</th></tr>
        <tr><td>${zh("你喜欢茶", "nǐ xǐhuan chá")}</td><td>${zh("你喜欢茶吗", "nǐ xǐhuan chá ma")}</td><td>${zh("喜欢", "xǐhuan")}</td></tr>
        <tr><td>${zh("你喝水", "nǐ hē shuǐ")}</td><td>${zh("你喝水吗", "nǐ hē shuǐ ma")}</td><td>${zh("喝", "hē")}</td></tr>
        <tr><td>${zh("你是学生", "nǐ shì xuéshēng")}</td><td>${zh("你是学生吗", "nǐ shì xuéshēng ma")}</td><td>${zh("是", "shì")}</td></tr>
      </table></div>
      <h3>No hay una palabra para «sí»</h3>
      <p>La misma universidad explica que se contesta un «sí» claro repitiendo el verbo de la pregunta. Si el «no» es lo que quieres decir, usas la forma negativa del verbo, que verás en "Negar con ${zh("不")}". Con un adjetivo, un curso del MIT dice que la respuesta repite el adjetivo, normalmente con un adverbio, y que el que se pone por defecto es ${zh("很", "hěn")}. Así, a ${zh("你忙吗", "nǐ máng ma")} se responde ${zh("我很忙", "wǒ hěn máng")}, y no hace falta añadir nada más.</p>
      <h3>Frío, calor y gustos</h3>
      <p>${zh("冷", "lěng")} y ${zh("热", "rè")} dicen cómo estás o cómo está algo, y se usan como los adjetivos de arriba: ${zh("你冷吗", "nǐ lěng ma")} pregunta si tienes frío, y ${zh("茶很热", "chá hěn rè")} es «el té está caliente». ${zh("喜欢", "xǐhuan")} es un verbo, así que se pone antes de lo que te gusta: ${zh("我喜欢水", "wǒ xǐhuan shuǐ")}. Su respuesta corta, por eso, es el propio verbo (simplificación de la lección).</p>
      <h3>Todos juntos con ${zh("都")}</h3>
      <p>${zh("都", "dōu")} significa «todos». En los ejemplos de la lección va entre el sujeto y el verbo: ${zh("你们都是学生吗", "nǐmen dōu shì xuéshēng ma")}, «¿todos ustedes son estudiantes?». La respuesta puede repetirla: ${zh("我们都是学生", "wǒmen dōu shì xuéshēng")}.</p>
      <h3>${zh("吗")} y ${zh("呢")}</h3>
      <p>En "Presentarte: ${zh("我叫")}…" viste ${zh("呢", "ne")} en ${zh("你呢", "nǐ ne")}. La diferencia es sencilla: ${zh("吗", "ma")} hace una pregunta nueva de sí o no, y ${zh("呢", "ne")} devuelve una que ya se hizo. Por ejemplo: ${zh("我喝茶，你呢", "wǒ hē chá, nǐ ne")}, «yo bebo té, ¿y tú?».</p>
      <p class="nota"><strong>Trampa común:</strong> usar ${zh("吗", "ma")} junto con una palabra de pregunta como ${zh("什么", "shénme")}. Esa palabra ya hace la pregunta, así que ${zh("你叫什么名字", "nǐ jiào shénme míngzi")} no lleva ${zh("吗", "ma")} (simplificación de la lección).</p>`,
    ejemplo: `
      <p>Las frases de ejemplo de la lección son nuestras. Vamos a convertir tres afirmaciones en preguntas y a responderlas.</p>
      <ol class="pasos-ej">
        <li>Tomas ${zh("你喜欢茶", "nǐ xǐhuan chá")} y añades ${zh("吗", "ma")} al final: ${zh("你喜欢茶吗", "nǐ xǐhuan chá ma")}. Respuesta: ${zh("喜欢", "xǐhuan")}.</li>
        <li>Tomas ${zh("你们都喝水", "nǐmen dōu hē shuǐ")} y queda ${zh("你们都喝水吗", "nǐmen dōu hē shuǐ ma")}. Respuesta: ${zh("我们都喝", "wǒmen dōu hē")}.</li>
        <li>Con adjetivo: ${zh("你热吗", "nǐ rè ma")}. Respuesta: ${zh("我很热", "wǒ hěn rè")}.</li>
        <li>Ofreces algo de beber: ${zh("你喝茶吗", "nǐ hē chá ma")}. Si contesta ${zh("喝", "hē")}, aceptó, porque repite el verbo.</li>
      </ol>
      <p>Comprueba: en todas las preguntas solo se añadió ${zh("吗", "ma")}; ninguna palabra cambió de lugar. Resultado: <span class="resultado">${zh("你热吗", "nǐ rè ma")} → ${zh("我很热", "wǒ hěn rè")}</span>.</p>
      <p class="nota"><strong>Error común:</strong> mover ${zh("吗", "ma")} al inicio. Siempre cierra la frase.</p>`,
    vidaReal: `
      <p>Las preguntas de sí o no son las más frecuentes al conversar:</p>
      <ul>
        <li>Ofrecer té o agua y entender si la otra persona quiere.</li>
        <li>Preguntar a un amigo si está ocupado o si tiene frío.</li>
        <li>Reconocer en un chat la partícula que marca que algo es una pregunta.</li>
        <li>Responder con una sola palabra, sin tener que armar una frase larga.</li>
        <li>Preguntar si alguien quiere té o agua en una charla de curso.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «¿te gusta el té?».</p>',
        respuesta: ['你', '喜欢', '茶', '吗'], pinyin: ['nǐ', 'xǐhuan', 'chá', 'ma'], lang: 'zh-Hans',
        pista: '<p>Afirmación primero y la partícula al final.</p>',
        solucion: `<p>${zh("你喜欢茶吗", "nǐ xǐhuan chá ma")}: la afirmación y ${zh("吗", "ma")} al final.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «¿todos ustedes son estudiantes?».</p>',
        respuesta: ['你们', '都', '是', '学生', '吗'], pinyin: ['nǐmen', 'dōu', 'shì', 'xuéshēng', 'ma'], lang: 'zh-Hans',
        pista: '<p>«Todos» va antes del verbo.</p>',
        solucion: `<p>${zh("你们都是学生吗", "nǐmen dōu shì xuéshēng ma")}: ${zh("都", "dōu")} antes de ${zh("是", "shì")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Te preguntan ${zh("你忙吗", "nǐ máng ma")}. ¿Cuál es una respuesta de «sí»?</p>`,
        opciones: [zh('我是忙', 'wǒ shì máng'), zh('吗', 'ma'), zh('我很忙', 'wǒ hěn máng'), zh('你呢', 'nǐ ne')], correcta: 2,
        pista: '<p>Repite el adjetivo con el enlace de siempre.</p>',
        solucion: `<p>${zh("我很忙", "wǒ hěn máng")} repite ${zh("忙", "máng")} con ${zh("很", "hěn")}. Con adjetivos no se usa ${zh("是", "shì")}.</p>` },
      { tipo: 'opciones', enunciado: `<p>Quieres preguntar «¿bebes agua?» a partir de ${zh("你喝水", "nǐ hē shuǐ")}. ¿Dónde va ${zh("吗", "ma")}?</p>`,
        opciones: [zh('吗你喝水', 'ma nǐ hē shuǐ'), zh('你吗喝水', 'nǐ ma hē shuǐ'), zh('你喝吗水', 'nǐ hē ma shuǐ'), zh('你喝水吗', 'nǐ hē shuǐ ma')], correcta: 3,
        pista: '<p>La partícula cierra la frase.</p>',
        solucion: `<p>${zh("你喝水吗", "nǐ hē shuǐ ma")}: ${zh("吗", "ma")} siempre va al final.</p>` },
      { tipo: 'opciones', escucha: { voz: '忙', audio: a('mang2.m4a') },
        sinAudio: '<p>Se dice <strong>máng</strong>: la vocal sube desde la mitad hasta arriba (segundo tono) y termina en «ng».</p>',
        enunciado: '<p>Escucha la palabra. ¿Qué significa?</p>',
        opciones: ['Frío', 'Ocupado', 'Caliente', 'Té'], correcta: 1,
        pista: '<p>Es el adjetivo de la primera pregunta de ejemplo con adjetivo.</p>',
        solucion: `<p>Se oye ${zh("忙", "máng")}, «ocupado».</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("喜欢", "xǐhuan")} («gustar»), separando las sílabas con un espacio.</p>`,
        respuestas: ['xǐ huan'],
        pista: '<p>La primera sílaba baja y sube; la segunda es suave y no lleva marca.</p>',
        solucion: '<p>Es <strong>xǐ huan</strong>: tercer tono y sílaba suave.</p>' },
    ],
    fuentes: [SILABO, AUDIO, KAP_MA, MIT_CHINO],
  });

  // ------------------------------------------------------------------
  L('Negar con 不', {
    objetivo: `Negar un verbo o un adjetivo con ${zh("不")}, preguntar con las dos opciones y decir ${zh("不")} con el tono correcto.`,
    explicacion: `
      <p>Piensa en «no voy», «no soy médico» o «no está ocupado». En español la palabra «no» va antes del verbo. En mandarín casi igual: una sola palabra, ${zh("不", "bù")}, hace la <strong>negación</strong>, es decir, dice que algo no es o no pasa. Estas son las nueve palabras de la lección.</p>
      ${tabla([
        ['不', 'bù', 'no', 'bu4.m4a'], ['对', 'duì', 'correcto, cierto', 'dui4.m4a'], ['知道', 'zhīdào', 'saber', 'zhidao14.m4a'],
        ['去', 'qù', 'ir', 'qu4.m4a'], ['来', 'lái', 'venir', 'lai2.m4a'], ['大', 'dà', 'grande', 'da4.m4a'],
        ['小', 'xiǎo', 'pequeño', 'xiao3.m4a'], ['新', 'xīn', 'nuevo', 'xin1.m4a'], ['太', 'tài', 'demasiado', 'tai4.m4a'],
      ])}
      <h3>Justo antes de lo que niegas</h3>
      <p>Una universidad de EE. UU. explica que la forma normal de negar un verbo es poner ${zh("不", "bù")} justo antes de él: sujeto, ${zh("不", "bù")}, verbo y objeto. Con un adjetivo la estructura es la misma. El sílabo lista ${zh("不", "bù")} entre los adverbios de negación del nivel 1.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Afirmación</th><th scope="col">Negación</th></tr>
        <tr><td>${zh("我是老师", "wǒ shì lǎoshī")}</td><td>${zh("我不是老师", "wǒ bù shì lǎoshī")}</td></tr>
        <tr><td>${zh("他很忙", "tā hěn máng")}</td><td>${zh("他不忙", "tā bù máng")}</td></tr>
        <tr><td>${zh("我去", "wǒ qù")}</td><td>${zh("我不去", "wǒ bù qù")}</td></tr>
        <tr><td>${zh("我知道", "wǒ zhīdào")}</td><td>${zh("我不知道", "wǒ bù zhīdào")}</td></tr>
      </table></div>
      <p>Mira la segunda fila: al negar un adjetivo desaparece ${zh("很", "hěn")}. Eso es lectura de la estructura «sujeto, ${zh("不", "bù")}, adjetivo», sin ${zh("很", "hěn")}. Las frases ${zh("不大", "bù dà")}, ${zh("不小", "bù xiǎo")} y ${zh("不新", "bù xīn")} se arman igual. Para decir «no muy», la lección usa ${zh("不太", "bù tài")}: ${zh("我不太忙", "wǒ bù tài máng")}, «no estoy muy ocupado» (simplificación de la lección).</p>
      <h3>Un solo carácter, dos tonos</h3>
      <p>${zh("不", "bù")} se escribe con tono cuarto, pero en "Cambios de tono: el tercer tono, ${zh("不")} y ${zh("一")}" viste que delante de otro tono cuarto se dice «bú». Por eso se escribe ${zh("不是", "bù shì")} y se dice <em>bú shì</em>. Delante de los demás tonos sigue siendo «bù». En esta unidad el pinyin conserva el tono original aunque al hablar cambie.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Palabra</th><th scope="col">Se escribe</th><th scope="col">Se dice</th></tr>
        <tr><td>${zh("不是", "bù shì")}</td><td>bù shì</td><td>bú shì</td></tr>
        <tr><td>${zh("不去", "bù qù")}</td><td>bù qù</td><td>bú qù</td></tr>
        <tr><td>${zh("不对", "bù duì")}</td><td>bù duì</td><td>bú duì</td></tr>
        <tr><td>${zh("不来", "bù lái")}</td><td>bù lái</td><td>bù lái</td></tr>
        <tr><td>${zh("不知道", "bù zhīdào")}</td><td>bù zhīdào</td><td>bù zhīdào</td></tr>
      </table></div>
      <h3>Ir, venir y decir que algo es correcto</h3>
      <p>${zh("去", "qù")} y ${zh("来", "lái")} son verbos de movimiento, «ir» y «venir», y se niegan igual que los demás: ${zh("他不来", "tā bù lái")}. ${zh("对", "duì")} dice que algo es correcto, y su negación ${zh("不对", "bù duì")} dice que no lo es. Con ${zh("知道", "zhīdào")} pasa lo mismo que con cualquier verbo: ${zh("不", "bù")} va delante y el resto de la frase no se mueve.</p>
      <h3>Preguntar con las dos opciones</h3>
      <p>Un curso del MIT explica que otra forma de preguntar sí o no es presentar el verbo y su negativo, como si ofrecieras las dos opciones. Por eso ${zh("你去不去", "nǐ qù bu qù")} es «¿vas o no vas?». Con ${zh("是", "shì")} queda ${zh("他是不是老师", "tā shì bu shì lǎoshī")}. La universidad de EE. UU. nota que ${zh("是不是", "shì bu shì")} ya es un patrón de pregunta completo, así que no lleva ${zh("吗", "ma")}. En estas preguntas «bu» suena suave, como la fuente escribe «shì bu shì».</p>
      <h3>También no</h3>
      <p>Para «tampoco», el orden de los ejemplos es ${zh("也", "yě")} y luego ${zh("不", "bù")}: ${zh("我也不去", "wǒ yě bù qù")}.</p>
      <p class="nota"><strong>Trampa común:</strong> negar con ${zh("不", "bù")} el verbo ${zh("有", "yǒu")}. Se niega con otra palabra, que verás en "Tener: ${zh("有")} y ${zh("没有")}".</p>`,
    ejemplo: `
      <p>Las frases de ejemplo de la lección usan solo palabras ya vistas. Vamos a negar tres frases y a hacer una pregunta.</p>
      <ol class="pasos-ej">
        <li>${zh("我是老师", "wǒ shì lǎoshī")}: pones ${zh("不", "bù")} antes de ${zh("是", "shì")} y queda ${zh("我不是老师", "wǒ bù shì lǎoshī")}.</li>
        <li>${zh("他很忙", "tā hěn máng")}: sale ${zh("很", "hěn")}, entra ${zh("不", "bù")} y queda ${zh("他不忙", "tā bù máng")}.</li>
        <li>${zh("我去", "wǒ qù")}: queda ${zh("我不去", "wǒ bù qù")}.</li>
        <li>Para preguntar, pones el verbo y su negativo: ${zh("你去不去", "nǐ qù bu qù")}.</li>
        <li>Si quieres decir que algo no es correcto, usas ${zh("不对", "bù duì")}.</li>
      </ol>
      <p>Comprueba: ${zh("不", "bù")} siempre quedó justo antes de lo que niega. Resultado: <span class="resultado">${zh("我不去", "wǒ bù qù")} = «no voy»</span>.</p>
      <p class="nota"><strong>Error común:</strong> decir «bù qù» al hablar. Delante de un cuarto tono suena «bú».</p>`,
    vidaReal: `
      <p>Decir «no» con claridad es tan útil como decir «sí»:</p>
      <ul>
        <li>Decir que no sabes algo o que no vas a un lugar.</li>
        <li>Decir que un dato no es correcto.</li>
        <li>Entender cuando alguien te hace la pregunta con las dos opciones.</li>
        <li>Decir que algo no es grande, pequeño o nuevo sin usar más palabras.</li>
        <li>Avisar a un amigo que no puedes ir o que no sabes algo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «yo tampoco voy» (literal: «yo también no voy»).</p>',
        respuesta: ['我', '也', '不', '去'], pinyin: ['wǒ', 'yě', 'bù', 'qù'], lang: 'zh-Hans',
        pista: '<p>«También» va primero y «no» pegado al verbo.</p>',
        solucion: `<p>${zh("我也不去", "wǒ yě bù qù")}: ${zh("也", "yě")}, ${zh("不", "bù")} y el verbo.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «él no es profesor».</p>',
        respuesta: ['他', '不', '是', '老师'], pinyin: ['tā', 'bù', 'shì', 'lǎoshī'], lang: 'zh-Hans',
        pista: '<p>La negación va justo antes del verbo.</p>',
        solucion: `<p>${zh("他不是老师", "tā bù shì lǎoshī")}: ${zh("不", "bù")} antes de ${zh("是", "shì")}.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe cómo se dice en voz alta ${zh("不是", "bù shì")}, con el cambio de tono.</p>`,
        respuestas: ['bú shì'],
        pista: '<p>Delante de otro tono cuarto, «bù» sube.</p>',
        solucion: '<p>Se dice <strong>bú shì</strong>: «bù» pasa a segundo tono.</p>' },
      { tipo: 'pinyin', enunciado: `<p>Escribe cómo se dice en voz alta ${zh("不去", "bù qù")}.</p>`,
        respuestas: ['bú qù'],
        pista: '<p>«Qù» también es de cuarto tono.</p>',
        solucion: '<p>Se dice <strong>bú qù</strong>, por el mismo cambio.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas frases es una pregunta con las dos opciones?</p>',
        opciones: [zh('你去吗', 'nǐ qù ma'), zh('你去', 'nǐ qù'), zh('你不去', 'nǐ bù qù'), zh('你去不去', 'nǐ qù bu qù')], correcta: 3,
        pista: '<p>Busca el verbo y su negativo juntos.</p>',
        solucion: `<p>${zh("你去不去", "nǐ qù bu qù")} pone ${zh("去", "qù")} y ${zh("不去", "bù qù")}. ${zh("你去吗", "nǐ qù ma")} es otra forma, con ${zh("吗", "ma")}.</p>` },
      { tipo: 'opciones', escucha: { voz: '知道', audio: a('zhidao14.m4a') },
        sinAudio: '<p>Se dice <strong>zhīdào</strong>: la primera sílaba es alta y plana (primer tono) y la segunda cae de golpe (cuarto tono).</p>',
        enunciado: '<p>Escucha la palabra. ¿Qué significa?</p>',
        opciones: ['Ir', 'Nuevo', 'Saber', 'Correcto'], correcta: 2,
        pista: `<p>Va después de ${zh("不", "bù")} en la frase «no sé».</p>`,
        solucion: `<p>Se oye ${zh("知道", "zhīdào")}, «saber».</p>` },
    ],
    fuentes: [SILABO, AUDIO, KAP_BU, KAP_MA, MIT_CHINO],
  });

  // ------------------------------------------------------------------
  L('Posesión con 的', {
    objetivo: `Decir de quién es algo con ${zh("的")}, preguntar «¿de quién?» y saber cuándo ${zh("的")} puede omitirse.`,
    explicacion: `
      <p>Piensa en «mi libro», «tu teléfono» o «el cuaderno de Ana». En español la pertenencia cambia mucho: «mi», «tu», «de Ana». En mandarín se usa siempre la misma pieza, ${zh("的", "de")}. Estas son las diez palabras de la lección.</p>
      ${tabla([
        ['的', 'de', 'partícula de pertenencia', 'de.m4a'], ['谁', 'shéi/shuí', 'quién'], ['书', 'shū', 'libro', 'shu1.m4a'],
        ['手机', 'shǒujī', 'teléfono móvil'], ['杯子', 'bēizi', 'vaso, taza', 'beizi1.m4a'], ['电脑', 'diànnǎo', 'computadora'],
        ['衣服', 'yīfu', 'ropa', 'yifu1.m4a'], ['东西', 'dōngxi', 'cosa, objeto', 'dongxi1.m4a'], ['爸爸', 'bàba', 'papá', 'baba4.m4a'], ['妈妈', 'māma', 'mamá', 'mama1.m4a'],
      ])}
      <h3>Dueño, ${zh("的")}, cosa</h3>
      <p>La <strong>posesión</strong> es la relación entre un dueño y lo que le pertenece. Una universidad de EE. UU. explica que en chino se marca con ${zh("的", "de")}, colocada después del dueño. El orden es siempre el mismo: dueño, ${zh("的", "de")} y la cosa.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Dueño</th><th scope="col">Frase</th><th scope="col">En español</th></tr>
        <tr><td>${zh("我", "wǒ")}</td><td>${zh("我的书", "wǒ de shū")}</td><td>mi libro</td></tr>
        <tr><td>${zh("你", "nǐ")}</td><td>${zh("你的手机", "nǐ de shǒujī")}</td><td>tu teléfono</td></tr>
        <tr><td>${zh("他", "tā")}</td><td>${zh("他的杯子", "tā de bēizi")}</td><td>su vaso (de él)</td></tr>
        <tr><td>${zh("我们", "wǒmen")}</td><td>${zh("我们的电脑", "wǒmen de diànnǎo")}</td><td>nuestra computadora</td></tr>
        <tr><td>${zh("谁", "shéi")}</td><td>${zh("谁的衣服", "shéi de yīfu")}</td><td>la ropa de quién</td></tr>
      </table></div>
      <p>Fíjate que en español «mi», «tu», «nuestra» son palabras distintas. Aquí solo cambia el pronombre y ${zh("的", "de")} se queda igual. También funciona con un nombre: ${zh("Ana 的书", "Ana de shū")}.</p>
      <h3>Cosas de todos los días</h3>
      <p>${zh("东西", "dōngxi")} es una palabra general para «cosa», y sirve cuando no sabes el nombre exacto: ${zh("我的东西", "wǒ de dōngxi")} son «mis cosas». ${zh("书", "shū")}, ${zh("杯子", "bēizi")}, ${zh("衣服", "yīfu")} y ${zh("电脑", "diànnǎo")} son objetos concretos. Con todos vale el mismo molde: pronombre, ${zh("的", "de")} y objeto. Aprendes una sola estructura y la repites con cualquier cosa que tengas a la mano.</p>
      <h3>Preguntar de quién</h3>
      <p>Como viste con ${zh("什么", "shénme")}, la palabra de pregunta se queda en el lugar de la respuesta. ${zh("谁", "shéi")} («quién») ocupa el hueco del dueño: ${zh("这是谁的手机", "zhè shì shéi de shǒujī")} se contesta ${zh("这是我的手机", "zhè shì wǒ de shǒujī")}. El sílabo anota ${zh("谁", "shéi")} con dos lecturas, «shéi» y «shuí».</p>
      <h3>Con la familia puede omitirse</h3>
      <p>La misma universidad enseña que con una relación personal cercana, como la familia, se puede omitir ${zh("的", "de")}. Por eso se dice ${zh("我妈妈", "wǒ māma")} y ${zh("我爸爸", "wǒ bàba")}, sin ${zh("的", "de")}.</p>
      <p>Cuando ya se sabe de qué cosa hablas, la lección permite quitar la cosa y dejar el dueño con ${zh("的", "de")}: ${zh("这是我的", "zhè shì wǒ de")}, «esto es mío». Eso es una simplificación de la lección.</p>
      <h3>Todo junto</h3>
      <p>Mira cómo se usa en un diálogo corto de la lección, con lo que ya sabes de las ocho lecciones.</p>
      <ul>
        <li>${zh("Luis：你好，我叫 Luis，你叫什么名字", "Luis: nǐ hǎo, wǒ jiào Luis, nǐ jiào shénme míngzi")}</li>
        <li>${zh("Ana：我叫 Ana，认识你很高兴", "Ana: wǒ jiào Ana, rènshi nǐ hěn gāoxìng")}</li>
        <li>${zh("Luis：你是学生吗", "Luis: nǐ shì xuéshēng ma")}</li>
        <li>${zh("Ana：是，我是学生。你呢", "Ana: shì, wǒ shì xuéshēng. nǐ ne")}</li>
        <li>${zh("Luis：我也是学生。这是你的手机吗", "Luis: wǒ yě shì xuéshēng. zhè shì nǐ de shǒujī ma")}</li>
        <li>${zh("Ana：不是，这是我妈妈的手机。再见", "Ana: bù shì, zhè shì wǒ māma de shǒujī. zàijiàn")}</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> poner la cosa primero, como ${zh("书我的", "shū wǒ de")}. El dueño va siempre antes.</p>`,
    ejemplo: `
      <p>Las frases de ejemplo de la lección usan solo palabras ya vistas. Vamos a preguntar de quién es un teléfono.</p>
      <ol class="pasos-ej">
        <li>Preguntas: ${zh("这是谁的手机", "zhè shì shéi de shǒujī")}. ${zh("谁", "shéi")} va donde irá el dueño.</li>
        <li>Respondes cambiando solo ese hueco: ${zh("这是我的手机", "zhè shì wǒ de shǒujī")}.</li>
        <li>Otro teléfono no es tuyo: ${zh("那不是我的", "nà bù shì wǒ de")}. Se omite la cosa.</li>
        <li>Con la familia, sin ${zh("的", "de")}: ${zh("我妈妈是医生", "wǒ māma shì yīshēng")}.</li>
        <li>Con un grupo: ${zh("这是我们的书", "zhè shì wǒmen de shū")}. Solo cambió el dueño.</li>
      </ol>
      <p>Comprueba: en cada frase el dueño va antes de la cosa, y ${zh("的", "de")} se queda entre los dos cuando aparece. Resultado: <span class="resultado">${zh("我的手机", "wǒ de shǒujī")} = «mi teléfono»</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar ${zh("的", "de")} con la familia cercana. Se puede omitir.</p>`,
    vidaReal: `
      <p>Saber de quién es algo sirve en cuanto hablas con alguien:</p>
      <ul>
        <li>Preguntar de quién es una cosa que encontraste.</li>
        <li>Hablar de tu familia y de tus cosas.</li>
        <li>Entender, en un diálogo de curso, quién tiene qué.</li>
        <li>Decir que algo es tuyo, de tu familia o de tu grupo con una sola estructura.</li>
        <li>Saber a quién pertenece una cosa que alguien te muestra.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «este es mi teléfono».</p>',
        respuesta: ['这', '是', '我', '的', '手机'], pinyin: ['zhè', 'shì', 'wǒ', 'de', 'shǒujī'], lang: 'zh-Hans',
        pista: `<p>Dueño, ${zh("的")}, cosa.</p>`,
        solucion: `<p>${zh("这是我的手机", "zhè shì wǒ de shǒujī")}: ${zh("我的", "wǒ de")} va antes de ${zh("手机", "shǒujī")}.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para preguntar «¿de quién es este libro?» (literal: «esto es quién de libro»).</p>',
        respuesta: ['这', '是', '谁', '的', '书'], pinyin: ['zhè', 'shì', 'shéi', 'de', 'shū'], lang: 'zh-Hans',
        pista: '<p>«Quién» ocupa el lugar del dueño.</p>',
        solucion: `<p>${zh("这是谁的书", "zhè shì shéi de shū")}: ${zh("谁的", "shéi de")} antes de ${zh("书", "shū")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas frases significa «tu libro»?</p>',
        opciones: [zh('书你的', 'shū nǐ de'), zh('的你书', 'de nǐ shū'), zh('你书的', 'nǐ shū de'), zh('你的书', 'nǐ de shū')], correcta: 3,
        pista: `<p>El dueño va primero y ${zh("的")} lo une con la cosa.</p>`,
        solucion: `<p>${zh("你的书", "nǐ de shū")}: dueño, ${zh("的", "de")} y cosa.</p>` },
      { tipo: 'opciones', escucha: { voz: '手机' },
        sinAudio: '<p>Se dice <strong>shǒujī</strong>: la primera sílaba baja y sube (tercer tono) y la segunda es alta y plana (primer tono).</p>',
        enunciado: '<p>Escucha la palabra. ¿Qué significa?</p>',
        opciones: ['Libro', 'Teléfono móvil', 'Computadora', 'Ropa'], correcta: 1,
        pista: '<p>Es el objeto de la pregunta de ejemplo sobre de quién es.</p>',
        solucion: `<p>Se oye ${zh("手机", "shǒujī")}, «teléfono móvil».</p>` },
      { tipo: 'texto', enunciado: `<p>¿Qué significa ${zh("谁", "shéi")}? Escribe la palabra en español.</p>`,
        respuestas: ['quien', 'quién', 'quien?', 'quién?'],
        pista: '<p>Es la palabra de pregunta que ocupa el lugar del dueño.</p>',
        solucion: `<p>${zh("谁", "shéi")} es «quién».</p>` },
      { tipo: 'opciones', enunciado: `<p>¿En cuál de estas frases la lección dice que ${zh("的")} puede omitirse?</p>`,
        opciones: [zh('我手机', 'wǒ shǒujī'), zh('我妈妈', 'wǒ māma'), zh('我衣服', 'wǒ yīfu'), zh('我电脑', 'wǒ diànnǎo')], correcta: 1,
        pista: '<p>Es una relación personal cercana.</p>',
        solucion: `<p>${zh("我妈妈", "wǒ māma")}: con la familia se puede omitir ${zh("的", "de")}.</p>` },
    ],
    fuentes: [SILABO, AUDIO, KAP_DE, KAP_CERCANA, MIT_PREGUNTAS],
  });
})();
