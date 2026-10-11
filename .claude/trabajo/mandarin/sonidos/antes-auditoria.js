// Mandarín · Unidad 1: HSK 1 · Sonidos y escritura.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Todo carácter chino sale de zh(). Las sílabas de demostración (ma, pa, bà...) no son vocabulario por aprender.
// Las grabaciones (audio/zh/) son de una sola voz; los cuatro tonos de «ma» usan solo la voz del sistema.
(function () {
  const G = window.grafica;
  const zh = window.zh;
  const L = (titulo, datos) => window.registrarLeccion('mandarin', titulo, datos);
  // Sílaba o letras de pinyin sin carácter: p('sh') marca el idioma; p('bà', '爸') además lleva botón de audio.
  const p = (pinyin, voz, audio) => zh('', pinyin, { voz, audio });
  const txt = (x, y, texto) => ({ tipo: 'texto', x, y, texto });

  const SILABO = { nombre: 'Centro de Educación y Cooperación Lingüística (China), «HSK 考试大纲», sílabo del HSK 3.0 (2025)', url: 'https://hsk.cn-bj.ufileos.com/3.0/新版HSK考试大纲1219.pdf' };
  const ESQUEMA = { nombre: 'Esquema del pinyin (1958), texto en Wikisource (en chino)', url: 'https://zh.wikisource.org/wiki/汉语拼音方案' };
  const AUDIO = { nombre: 'Grabaciones: Wei Gao y Vion Nicolas, Proyecto Shtooka, en Wikimedia Commons (CC BY 2.0 FR)', url: 'https://commons.wikimedia.org/wiki/File:Zh-dà.ogg' };
  const ERAU = { nombre: 'Embry-Riddle Aeronautical University (EE. UU.): Chinese Phonetic System (en inglés)', url: 'https://eaglepubs.erau.edu/cyberchinese/chapter/chinese-phonetic-system/' };
  const MIT = { nombre: 'MIT OpenCourseWare (EE. UU.): Sounds and symbols: an overview of pinyin (en inglés)', url: 'https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/01af9a25b804b7d58a26fa580691df4f_MITRES_21G_003S11_pinyin.pdf' };
  const POLYU = (ruta, nombre) => ({ nombre: `Hong Kong Polytechnic University (China), BEPTH: ${nombre} (en inglés)`, url: `https://www.polyu.edu.hk/bepth/introduction-to-phonetics/${ruta}/` });

  // Curva de un tono: altura de la voz (1 a 5) a lo largo de la sílaba.
  const tono = (nombre, puntos, descripcion) => G({
    x: [0, 1], y: [0, 6], pasos: [1, 1], nombres: false, descripcion,
    figuras: [...puntos.slice(1).map((q, i) => ({ tipo: 'linea', desde: puntos[i], hasta: q })), txt(0.5, 5.7, nombre)],
  });

  // Un trazo: número junto al punto de partida, línea (o dos líneas si hay quiebre).
  const trazo = (n, pts, num) => [
    ...pts.slice(1).map((q, i) => ({ tipo: 'linea', desde: pts[i], hasta: q })),
    txt(num[0], num[1], String(n)),
  ];
  const caracter = (trazos, descripcion) => G({ x: [-1.6, 1.6], y: [-1.5, 1.5], proporcional: true, ejes: false, descripcion, figuras: trazos.flatMap((t, i) => trazo(i + 1, t.pts, t.num)) });

  // ------------------------------------------------------------------
  L('Qué es el mandarín y cómo se escribe', {
    objetivo: 'Explicar qué es el mandarín, por qué el chino se escribe con caracteres y para qué sirve el pinyin.',
    explicacion: `
      <p>Cuando ves un letrero en español puedes leerlo en voz alta aunque no sepas qué significa, porque las letras te dicen cómo suena. En chino no es así, y esa es la primera sorpresa. Antes de aprender sonidos conviene saber qué lengua es y cómo se escribe.</p>
      <h3>¿Qué es el mandarín?</h3>
      <p>El <strong>mandarín</strong> es el nombre que damos en español al chino estándar. En China se llama ${zh("普通话", "pǔtōnghuà")}, y la ley china sobre la lengua común (del año 2000) lo declara, junto con la escritura normalizada, la lengua y la escritura comunes del país. Según el Instituto Cervantes, en 2023 tenía 920 millones de hablantes nativos. Además, el chino es uno de los seis idiomas oficiales de la ONU, junto con el árabe, el inglés, el francés, el ruso y el español.</p>
      <h3>Una escritura que no está hecha de letras</h3>
      <p>Una letra como la «b» no significa nada por sí sola: solo representa un sonido. El chino se escribe distinto. Cada <strong>carácter</strong> representa una sílaba que tiene significado, según un curso de la Universidad de California en San Diego. Por eso un carácter parece un dibujo pequeño: es la sílaba y la idea juntas.</p>
      <p>Un ejemplo con un saludo. La palabra ${zh("你好", "nǐ hǎo", { es: "hola" })} tiene dos caracteres, y cada uno se dice con una sílaba. Hay dos formas de escribir los caracteres: los simplificados, que se usan en China continental, Singapur y Malasia, y los tradicionales, que se usan en Hong Kong, Macao y Taiwán. En este curso usaremos solo los simplificados.</p>
      <h3>El pinyin: cómo suena</h3>
      <p>Si el carácter no dice cómo suena, hace falta una ayuda. El <strong>pinyin</strong> es la forma oficial de escribir el sonido del chino con las letras que tú ya conoces, más una marca sobre la vocal que indica la melodía de la voz. China lo adoptó oficialmente el 11 de febrero de 1958 y, en 1982, la Organización Internacional de Normalización (ISO) lo tomó como base de una norma para escribir el chino con letras latinas. En esta materia verás siempre los caracteres con su pinyin al lado.</p>
      <p>Aquí tienes cuatro palabras del nivel 1 del examen HSK, cada una en sus tres caras: caracteres, pinyin y significado. Pulsa el altavoz para oírlas.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Caracteres</th><th scope="col">Pinyin</th><th scope="col">Significado</th></tr>
        <tr><td>${zh("你好", "nǐ hǎo")}</td><td>nǐ hǎo</td><td>hola</td></tr>
        <tr><td>${zh("中国", "zhōngguó")}</td><td>zhōngguó</td><td>China</td></tr>
        <tr><td>${zh("汉语", "hànyǔ")}</td><td>hànyǔ</td><td>idioma chino</td></tr>
        <tr><td>${zh("汉字", "hànzì")}</td><td>hànzì</td><td>carácter chino</td></tr>
      </table></div>
      <h3>¿Qué es el HSK?</h3>
      <p>El HSK es el examen oficial de chino para quienes lo aprenden como lengua extranjera. Su sílabo, publicado en noviembre de 2025, rige desde julio de 2026. El nivel 1 pide 300 palabras: la última de su lista, la número 300, es ${zh("做饭", "zuò fàn", { es: "cocinar" })}. Este curso sigue ese sílabo.</p>
      <p class="nota"><strong>Dos avisos.</strong> La voz del botón depende de tu aparato: algunos no traen voz en chino. Si no suena, no pasa nada, porque el pinyin manda. Y las frases de ejemplo del curso son de la lección; solo las palabras vienen del sílabo.</p>`,
    ejemplo: `
      <p>Vamos a leer ${zh("你好", "nǐ hǎo", { es: "hola" })} paso a paso, como si lo vieras en un letrero.</p>
      <ol class="pasos-ej">
        <li>Cuenta los caracteres. Hay dos: ${zh("你", "nǐ")} y ${zh("好", "hǎo")}. Como cada carácter es una sílaba, la palabra se dice en dos golpes de voz.</li>
        <li>Mira el pinyin debajo: «nǐ hǎo». También son dos sílabas, una por carácter. Las letras son las del abecedario que ya conoces.</li>
        <li>Fíjate en la marca sobre la «i» y sobre la «a». Cada sílaba lleva la suya, y más adelante aprenderás qué melodía indica cada una.</li>
        <li>Busca el significado: «hola». Un carácter tiene una idea; juntos, los dos forman un saludo.</li>
      </ol>
      <p>Comprueba: dos caracteres, dos sílabas, dos marcas y un significado. Resultado: <span class="resultado">2 caracteres = 2 sílabas</span>.</p>
      <p class="nota"><strong>Error común:</strong> creer que cada carácter es una letra y que hay que «deletrear». No se deletrea: cada carácter se dice entero, como una sílaba.</p>`,
    vidaReal: `
      <p>Saber cómo se escribe el chino te sirve más de lo que parece:</p>
      <ul>
        <li>Reconocer en un letrero, una caja de producto o el nombre de una ciudad que lo escrito es chino y cuántas sílabas tiene.</li>
        <li>Escribir chino en un teléfono o una computadora con el abecedario que ya conoces, sin teclados especiales.</li>
        <li>Buscar una palabra en un diccionario o un traductor a partir de cómo suena.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué es el pinyin?</p>',
        opciones: ['Una forma de escribir cómo suena el chino con letras latinas y marcas de tono', 'El nombre de los caracteres tradicionales', 'Un idioma distinto del mandarín', 'Un examen oficial de chino'], correcta: 0,
        pista: '<p>Piensa en lo que aparece debajo de los caracteres para decirte cómo se dicen.</p>',
        solucion: '<p>El pinyin es el sistema oficial para escribir el sonido del chino con letras latinas, con una marca de tono sobre la vocal. No es un idioma ni un examen.</p>' },
      { tipo: 'numero', enunciado: `<p>La palabra ${zh("汉语", "hànyǔ", { es: "idioma chino" })} tiene dos caracteres. ¿Cuántas sílabas se pronuncian al decirla?</p>`, respuesta: 2,
        pista: '<p>Cada carácter es una sílaba.</p>',
        solucion: '<p>Un carácter representa una sílaba, así que dos caracteres son <strong>2</strong> sílabas: hàn y yǔ.</p>' },
      { tipo: 'opciones', escucha: { voz: '汉语' },
        sinAudio: '<p>Se dice <strong>hànyǔ</strong>: dos sílabas. La primera cae de alto a bajo (hàn) y la segunda baja y sube (yǔ).</p>',
        enunciado: '<p>Escucha la palabra. ¿Cuál es?</p>',
        opciones: [zh('你好', 'nǐ hǎo'), zh('中国', 'zhōngguó'), zh('汉语', 'hànyǔ'), zh('汉字', 'hànzì')], correcta: 2,
        pista: '<p>Fíjate en cómo empieza: debe sonar «han» y terminar con una sílaba que baja y sube.</p>',
        solucion: `<p>Se oye ${zh("汉语", "hànyǔ")}. ${zh("汉字", "hànzì")} también empieza con hàn, pero termina en zì, una sílaba que cae sin subir.</p>` },
      { tipo: 'numero', enunciado: '<p>Según el sílabo, ¿cuántas palabras pide el nivel 1 del HSK?</p>', respuesta: 300,
        pista: '<p>Es el número de la última palabra de la lista de nivel 1.</p>',
        solucion: '<p>La lista de nivel 1 termina en la palabra número <strong>300</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos idiomas oficiales tiene la ONU? El chino es uno de ellos.</p>', respuesta: 6,
        pista: '<p>Se cuentan el árabe, el chino, el inglés, el francés, el ruso y el español.</p>',
        solucion: '<p>La ONU tiene <strong>6</strong> idiomas oficiales.</p>' },
      { tipo: 'opciones', enunciado: '<p>Los caracteres simplificados son los que usa este curso. ¿Dónde se usan, según la fuente?</p>',
        opciones: ['En Hong Kong, Macao y Taiwán', 'En China continental, Singapur y Malasia', 'Solo en las películas', 'En ningún lugar: ya no se usan'], correcta: 1,
        pista: '<p>Los tradicionales se usan en Hong Kong, Macao y Taiwán; los simplificados, en otros lugares.</p>',
        solucion: '<p>Los simplificados se usan en China continental, Singapur y Malasia. Los tradicionales, en Hong Kong, Macao y Taiwán.</p>' },
    ],
    fuentes: [
      { nombre: 'Gobierno de China: Ley de la lengua y la escritura comunes nacionales (2000), Gaceta del Consejo de Estado 2001 (en chino)', url: 'https://www.gov.cn/gongbao/content/2001/content_61066.htm' },
      { nombre: 'Instituto Cervantes (España): El español, una lengua viva. Informe 2023', url: 'https://cvc.cervantes.es/lengua/anuario/anuario_23/informes_ic/p01.htm' },
      { nombre: 'Naciones Unidas: Idiomas oficiales', url: 'https://www.un.org/es/sections/about-un/official-languages/' },
      { nombre: 'Universidad de California en San Diego (EE. UU.): Mandarin Pronunciation (en inglés)', url: 'https://pages.ucsd.edu/~dkjordan/chin/pinyin2.html' },
      { nombre: 'Universidad de Washington en San Luis (EE. UU.): Chinese Studies, Writing system (en inglés)', url: 'https://libguides.wustl.edu/learningchinese/writingsystem' },
      { nombre: 'Comisión de Educación de Shanghái: ISO 7098, traducción oficial al chino', url: 'https://edu.sh.gov.cn/yywz_gfbz_gyhypy/20150705/0015-yywz_1998.html' },
      ESQUEMA,
      SILABO,
    ],
  });

  // ------------------------------------------------------------------
  L('Pinyin: iniciales', {
    objetivo: 'Dividir una sílaba en inicial, final y tono, y reconocer las 21 iniciales del pinyin.',
    explicacion: `
      <p>Cuando dices «pa» en español, haces dos cosas seguidas: cierras los labios para la «p» y abres la boca para la «a». El pinyin hace lo mismo con cada sílaba, pero les pone nombre a las partes.</p>
      <h3>Las tres partes de una sílaba</h3>
      <p>Una sílaba del chino se compone de una <strong>inicial</strong>, una <strong>final</strong> y un tono. La inicial es el sonido con que empieza; la final es todo lo demás, la parte de las vocales; y el tono es la melodía de la voz, que verás en otra lección. En ${p("bà", "爸")}, la inicial es «b», la final es «a» y el tono es el cuarto, el que cae.</p>
      <h3>Las 21 iniciales</h3>
      <p>El pinyin tiene 21 iniciales, que según la Universidad Embry-Riddle se agrupan en seis grupos. Pulsa cada altavoz para oír una sílaba de ejemplo; las sílabas son de demostración y no hace falta aprenderlas como palabras.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Grupo</th><th scope="col">Sílabas de ejemplo</th></tr>
        <tr><td>b p m f</td><td>${p("bà", "爸")} ${p("pà", "怕", "audio/zh/pa4.m4a")} ${p("mā", "妈")} ${p("fā", "发")}</td></tr>
        <tr><td>d t n l</td><td>${p("dà", "大", "audio/zh/da4.m4a")} ${p("tā", "他", "audio/zh/ta1.m4a")} ${p("nǚ", "女", "audio/zh/nv3.m4a")} ${p("liù", "六")}</td></tr>
        <tr><td>g k h</td><td>${p("gē", "哥")} ${p("kǒu", "口")} ${p("hē", "喝")}</td></tr>
        <tr><td>j q x</td><td>${p("jī", "鸡", "audio/zh/ji1.m4a")} ${p("qī", "七")} ${p("xī", "西", "audio/zh/xi1.m4a")}</td></tr>
        <tr><td>zh ch sh r</td><td>${p("zhōng", "中")} ${p("chī", "吃")} ${p("shì", "是", "audio/zh/shi4.m4a")} ${p("rén", "人")}</td></tr>
        <tr><td>z c s</td><td>${p("zài", "在")} ${p("cài", "菜")} ${p("sān", "三")}</td></tr>
      </table></div>
      <p>Varias se escriben con letras que ya conoces, pero no suenan igual que en español. Por eso conviene fijarse en los pares.</p>
      <h3>Con soplo y sin soplo</h3>
      <p>En el par b/p, ninguna de las dos hace vibrar la garganta, pero la «b» sale sin soplo de aire y la «p» sale con un soplo, que se llama aspiración. Como simplificación de la lección, d/t y g/k son pares del mismo tipo: la primera sin soplo, la segunda con soplo. Para notarlo, pon la mano frente a la boca: con la «p» sentirás el aire; con la «b», casi nada.</p>
      <h3>Tres grupos con la lengua en otro sitio</h3>
      <p>Las iniciales j, q y x solo van seguidas de la vocal escrita «i» o «u», y esa «u» suena como «ü», un sonido que verás en la lección de finales. En zh, ch, sh y r, la punta de la lengua se levanta hacia el paladar. En z, c y s la lengua va plana contra la parte de atrás de los dientes.</p>
      <p>Las letras y y w tampoco son iniciales: al principio de una sílaba son la forma de escribir i y u.</p>
      <p class="nota"><strong>Trampa común:</strong> leer la «b» y la «p» como en español sin notar el soplo. Simplificación de la lección: el «b» del pinyin se acerca a la «p» suave de «pato», y el «p», a una «p» con soplo.</p>`,
    ejemplo: `
      <p>Vamos a separar la sílaba ${p("bà", "爸")}, la primera de la palabra ${zh("爸爸", "bàba", { es: "papá" })}.</p>
      <ol class="pasos-ej">
        <li>Busca con qué sonido empieza: «b». Esa es la inicial, y está en el primer grupo de la tabla.</li>
        <li>Lo que queda es la final: «a». Es la parte que se alarga con la boca abierta.</li>
        <li>La marca sobre la «a» indica el tono: aquí es el cuarto, que cae de alto a bajo.</li>
        <li>Ahora compárala con ${p("pà", "怕", "audio/zh/pa4.m4a")}: la final «a» y el tono son los mismos, y solo cambia la inicial. Pon la mano frente a la boca: con la «p» sientes un soplo que con la «b» casi no está.</li>
      </ol>
      <p>Comprueba: inicial + final + tono recompone la sílaba. Resultado: <span class="resultado">bà = b + a + cuarto tono</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que la inicial es siempre una sola letra. Zh, ch y sh son una inicial cada una, aunque tengan dos letras.</p>`,
    vidaReal: `
      <p>Conocer la primera parte de cada sílaba te ayuda en situaciones cotidianas:</p>
      <ul>
        <li>Leer en voz alta nombres de ciudades y apellidos escritos con letras latinas, como Beijing, Xi'an o Zhang.</li>
        <li>Notar la diferencia entre dos palabras que solo cambian en su primer sonido, para que te entiendan.</li>
        <li>Escribir chino con el teclado de tu teléfono, tecleando las letras de cada sílaba.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>¿Cuál es la inicial de la sílaba ${p("shì")}?</p>`,
        opciones: [p('s'), p('sh'), p('h'), p('shi')], correcta: 1,
        pista: '<p>Zh, ch y sh cuentan como una sola inicial de dos letras.</p>',
        solucion: `<p>La inicial es ${p("sh")} y la final es ${p("i")}. La «h» sola no es la inicial, porque sh es una sola inicial.</p>` },
      { tipo: 'opciones', escucha: { voz: '怕', audio: 'audio/zh/pa4.m4a' },
        sinAudio: '<p>Se dice <strong>pà</strong>: inicial «p», con un soplo de aire; final «a»; cuarto tono, que cae de alto a bajo.</p>',
        enunciado: '<p>Escucha la sílaba. ¿Con qué inicial empieza?</p>',
        opciones: [p('b'), p('p'), p('m'), p('f')], correcta: 1,
        pista: '<p>Imagina la mano frente a la boca: ¿sale un soplo de aire?</p>',
        solucion: `<p>Empieza con ${p("p")}, la que lleva soplo. Si fuera ${p("b")}, casi no saldría aire.</p>` },
      { tipo: 'opciones', escucha: { voz: '鸡', audio: 'audio/zh/ji1.m4a' },
        sinAudio: '<p>Se dice <strong>jī</strong>: inicial «j», final «i», primer tono, que empieza alto y se mantiene.</p>',
        enunciado: '<p>Escucha otra sílaba. ¿Con qué inicial empieza?</p>',
        opciones: [p('zh'), p('q'), p('x'), p('j')], correcta: 3,
        pista: '<p>j, q y x van seguidas de «i» o «u». Escucha cuál de las tres suena aquí; zh no es del mismo grupo.</p>',
        solucion: `<p>Es ${p("j")}. Las otras opciones existen, pero esta sílaba se oye como jī.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe la inicial de la sílaba ${p("chī", "吃")}.</p>`, respuestas: ['ch'],
        pista: '<p>Quita la final «i» y el tono: lo que queda al principio es la inicial.</p>',
        solucion: `<p>La inicial es <strong>ch</strong>, una de las iniciales con la punta de la lengua levantada.</p>` },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos grupos se pronuncia con la lengua plana contra la parte de atrás de los dientes?</p>',
        opciones: ['zh, ch, sh, r', 'z, c, s', 'b, p, m, f', 'j, q, x'], correcta: 1,
        pista: '<p>En el otro grupo con «z», la punta de la lengua va hacia atrás; aquí, no.</p>',
        solucion: '<p>Con z, c y s la lengua va plana. En zh, ch, sh y r la punta se levanta hacia el paladar.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas iniciales tiene el pinyin?</p>', respuesta: 21,
        pista: '<p>Suma los seis grupos de la tabla: 4 + 4 + 3 + 3 + 4 + 3.</p>',
        solucion: '<p>4 + 4 + 3 + 3 + 4 + 3 = <strong>21</strong> iniciales.</p>' },
    ],
    fuentes: [
      { nombre: 'Universidad China de Hong Kong: Everyday Chinese, Phonetic knowledge (en inglés)', url: 'https://ilc.cuhk.edu.hk/chinese/re_PTHforForeigners_Phonetics1.html' },
      ERAU, MIT, AUDIO,
    ],
  });

  // ------------------------------------------------------------------
  L('Pinyin: finales', {
    objetivo: 'Reconocer los tipos de finales del pinyin y aplicar las reglas de escritura de yi, wu, ju, iu, ui y un.',
    explicacion: `
      <p>Piensa en la parte de una sílaba que puedes alargar con la boca abierta: la «a» de «pa». En chino esa parte se llama final, y ya viste en "Pinyin: iniciales" que va después de la inicial. Hay unas 36 finales, según la Universidad Embry-Riddle; otras fuentes cuentan 35 o 38, según cómo se cuenten. Se agrupan en tres tipos.</p>
      <h3>Finales simples, compuestas y nasales</h3>
      <p>Una <strong>final simple</strong> es una sola vocal. Son seis: a, o, e, i, u y ü, según el MIT. La «ü» es la «u» con los labios redondeados, como si dijeras «i» pero con la boca de «u».</p>
      <p>Una <strong>final compuesta</strong> junta dos o tres vocales en una sola sílaba. La <strong>final nasal</strong> termina en «n» o en «ng». Las nasales con «n» son an, en, in, un y ün; las que acaban en «ng» son ang, eng, ing y ong, y hay combinaciones como iang, uang, iong y ueng. Simplificación de la lección: en la «n» la punta de la lengua toca detrás de los dientes de arriba; en la «ng» sube la parte de atrás de la lengua y la punta no toca.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Tipo</th><th scope="col">Palabras de ejemplo</th></tr>
        <tr><td>Simples</td><td>${zh("八", "bā")} ${zh("喝", "hē")} ${zh("一", "yī")} ${zh("五", "wǔ")} ${zh("女儿", "nǚ'ér")}</td></tr>
        <tr><td>Compuestas</td><td>${zh("来", "lái")} ${zh("好", "hǎo")} ${zh("对", "duì")} ${zh("六", "liù")} ${zh("我", "wǒ")}</td></tr>
        <tr><td>Nasales</td><td>${zh("三", "sān")} ${zh("很", "hěn")} ${zh("忙", "máng")} ${zh("朋友", "péngyou")}</td></tr>
      </table></div>
      <h3>Reglas de escritura que cambian lo que ves</h3>
      <p>Sin inicial, la «i» se escribe «y» (yi) y la «u» se escribe «w» (wu), como en ${zh("一", "yī")} y ${zh("五", "wǔ")}. Detrás de j, q y x, la «ü» se escribe «u» sin puntos: ju, qu, xu. Con n y l conserva los puntos: nü, lü. Por último, las finales iou, uei y uen se escriben iu, ui y un cuando llevan inicial: niu, gui, lun.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Se escribe</th><th scope="col">En realidad es</th></tr>
        <tr><td>yi, wu</td><td>i, u (sin inicial)</td></tr>
        <tr><td>ju, qu, xu</td><td>jü, qü, xü</td></tr>
        <tr><td>nü, lü</td><td>nü, lü (conservan los puntos)</td></tr>
        <tr><td>liu, gui, lun</td><td>l + iou, g + uei, l + uen</td></tr>
      </table></div>
      <p>La razón de estas reglas es acortar la escritura y evitar confusiones. Por eso la «i» tras zh, ch, sh, r, z, c y s suena distinto: es una continuación «zumbada» de la consonante, como en ${p("shì", "是", "audio/zh/shi4.m4a")} o ${p("chī", "吃")}.</p>
      <p>El mandarín permite menos de 1000 sílabas distintas en sonido, según la Universidad de California en San Diego. Son pocas, y por eso los tonos importan tanto.</p>
      <p class="nota"><strong>Trampa común:</strong> teclear «qu» y pensar que suena como en «queso». En pinyin, tras q la «u» es una «ü».</p>`,
    ejemplo: `
      <p>Vamos a armar ${p("nǚ", "女", "audio/zh/nv3.m4a")}, la primera sílaba de ${zh("女儿", "nǚ'ér", { es: "hija" })}.</p>
      <ol class="pasos-ej">
        <li>Elige la inicial: «n».</li>
        <li>Elige la final: «ü», una vocal simple. Con «n» conserva sus dos puntos.</li>
        <li>Pon el tono: tercero, que baja y luego sube. La marca va sobre la vocal: nǚ.</li>
        <li>Compara con ${zh("去", "qù", { es: "ir" })}: la final también es «ü», pero con «q» se escribe «u» sin puntos. Se escribe qu y se dice qü.</li>
      </ol>
      <p>Comprueba que suena igual: la «u» de qù y la «ü» de nǚ son la misma vocal. Si la escribes en un teclado, tecleas «nv3»: la «v» hace de «ü» y el 3 marca el tono. Resultado: <span class="resultado">n + ü + tercer tono = nǚ</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir «nu» para nǚ. Con n y l hay que conservar los puntos, porque nu es otra sílaba.</p>`,
    vidaReal: `
      <p>Las finales te sirven cada vez que escribes o buscas una palabra:</p>
      <ul>
        <li>Teclear chino con letras: en muchos teclados la «ü» se escribe con la letra «v».</li>
        <li>Buscar una palabra en un diccionario, que ordena las sílabas por letras.</li>
        <li>Entender por qué una palabra se ve distinta de lo que oyes, como «gui», que esconde una vocal más.</li>
        <li>Leer en voz alta nombres de lugares escritos en pinyin, separando bien cada sílaba.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas sílabas tiene una final nasal que termina en «ng»?</p>',
        opciones: [p('sān', '三'), p('hěn', '很'), p('máng', '忙'), p('lái', '来')], correcta: 2,
        pista: '<p>Busca la sílaba que termina en dos letras, «n» y «g».</p>',
        solucion: `<p>${zh("忙", "máng")} termina en «ng». ${p("sān")} y ${p("hěn")} terminan en «n», y ${p("lái")} es compuesta.</p>` },
      { tipo: 'pinyin', escucha: { voz: '女', audio: 'audio/zh/nv3.m4a' },
        sinAudio: '<p>Se dice <strong>nǚ</strong>: inicial «n», final «ü» y tercer tono, que baja y luego sube.</p>',
        enunciado: '<p>Escucha y escribe la sílaba en pinyin, con su tono.</p>', respuestas: ['nǚ'],
        pista: '<p>La final es la vocal de los labios redondeados; con «n» conserva los puntos. También puedes teclear «v» en lugar de «ü».</p>',
        solucion: `<p>Es ${p("nǚ")}: n + ü + tercer tono. Se acepta nǚ o nv3.</p>` },
      { tipo: 'pinyin', escucha: { voz: '绿', audio: 'audio/zh/lv4.m4a' },
        sinAudio: '<p>Se dice <strong>lǜ</strong>: inicial «l», final «ü» y cuarto tono, que cae de alto a bajo.</p>',
        enunciado: '<p>Escucha otra sílaba y escríbela con su tono.</p>', respuestas: ['lǜ'],
        pista: '<p>Es una sílaba como la anterior, pero el tono cae en lugar de bajar y subir.</p>',
        solucion: `<p>Es ${p("lǜ")}: l + ü + cuarto tono. La marca va sobre la ü.</p>` },
      { tipo: 'texto', enunciado: `<p>Tras la inicial q, la «ü» se escribe sin puntos. Escribe la sílaba con q y esa vocal, sin tono.</p>`, respuestas: ['qu'],
        pista: '<p>Es la misma sílaba que ves en la palabra de ir, ' + zh('去', 'qù') + '.</p>',
        solucion: '<p>Se escribe <strong>qu</strong> y se dice «qü». No es la «u» de «queso».</p>' },
      { tipo: 'opciones', enunciado: '<p>Las finales iou, uei y uen se acortan cuando llevan inicial. ¿Cómo se escribe l + iou en la palabra del número seis?</p>',
        opciones: [p('lou'), p('lio'), p('liu'), p('liou')], correcta: 2,
        pista: '<p>Mira la tabla de reglas: iou se acorta.</p>',
        solucion: `<p>iou pasa a iu, y l + iu es ${p("liu")}, como en ${zh("六", "liù", { es: "seis" })}.</p>` },
      { tipo: 'numero', enunciado: '<p>¿Cuántas vocales simples hay?</p>', respuesta: 6,
        pista: '<p>Son a, o, e, i, u y una más con dos puntos.</p>',
        solucion: '<p>Son <strong>6</strong>: a, o, e, i, u y ü.</p>' },
    ],
    fuentes: [ERAU, MIT, ESQUEMA, AUDIO, SILABO,
      { nombre: 'Universidad de California en San Diego (EE. UU.): Mandarin Pronunciation (en inglés)', url: 'https://pages.ucsd.edu/~dkjordan/chin/pinyin2.html' },
      { nombre: 'Kapiʻolani Community College (EE. UU.), LibreTexts: The Sound System of Mandarin (en inglés)', url: 'https://human.libretexts.org/Bookshelves/Languages/Chinese/CHN101_Elementary_Mandarin_I_Textbook/01:_Introduction/1.01:_The_Sound_System_of_Mandarin' }],
  });

  // ------------------------------------------------------------------
  L('Los cuatro tonos y el tono neutro', {
    objetivo: 'Distinguir los cuatro tonos y el tono neutro, y escribir la marca de tono en la vocal correcta.',
    explicacion: `
      <p>En español, si subes la voz al final de «vienes» preguntas, y si la bajas afirmas. La palabra es la misma. En chino la melodía hace algo más fuerte: cambia la palabra entera. Esa melodía se llama tono.</p>
      <h3>Cuatro tonos y uno neutro</h3>
      <p>Un <strong>tono</strong> es la forma en que sube o baja la voz durante una sílaba. Hay cuatro tonos y un tono neutro, y el tono sirve para distinguir significados: la misma sílaba con otro tono es otra palabra. Para medir la altura de la voz se usa una escala de 1 (grave) a 5 (aguda). Los cuatro tonos son 55, 35, 214 y 51, y cada cifra es un punto de esa escala.</p>
      <div class="dos-graficas">
        ${tono("Primer tono: 55", [[0.05, 5], [0.95, 5]], "Primer tono: la voz empieza en la altura 5 y se mantiene en 5, una línea horizontal arriba.")}
        ${tono("Segundo tono: 35", [[0.05, 3], [0.95, 5]], "Segundo tono: la voz empieza en la altura 3 y sube hasta 5, una línea que sube.")}
      </div>
      <div class="dos-graficas">
        ${tono("Tercer tono: 214", [[0.05, 2], [0.4, 1], [0.95, 4]], "Tercer tono: la voz empieza en 2, baja a 1 y luego sube hasta 4.")}
        ${tono("Cuarto tono: 51", [[0.05, 5], [0.95, 1]], "Cuarto tono: la voz empieza en 5 y cae hasta 1, una línea que baja.")}
      </div>
      <p>Las cuatro marcas se parecen a la forma del tono: primer tono ˉ, segundo ˊ, tercero ˇ y cuarto ˋ. El <strong>tono neutro</strong> es breve y no lleva marca. Pulsa los altavoces de esta tabla y compara cómo cambia el significado.</p>
      <p>Para recordar la forma, como simplificación de la lección: el primer tono es como sostener una nota; el segundo, como el «¿eh?» de sorpresa; el tercero, como un «mmm» dudando, que baja y sube; y el cuarto, como una orden seca que cae. El tono neutro no tiene una altura fija, porque depende del tono de la sílaba anterior.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Tono</th><th scope="col">Sílaba</th><th scope="col">Carácter</th><th scope="col">Significado</th></tr>
        <tr><td>Primero</td><td>${p("mā", "妈")}</td><td>${zh("妈", "")}</td><td>madre</td></tr>
        <tr><td>Segundo</td><td>${p("má", "麻")}</td><td>${zh("麻", "")}</td><td>cáñamo</td></tr>
        <tr><td>Tercero</td><td>${p("mǎ", "马")}</td><td>${zh("马", "")}</td><td>caballo</td></tr>
        <tr><td>Cuarto</td><td>${p("mà", "骂")}</td><td>${zh("骂", "")}</td><td>regañar</td></tr>
        <tr><td>Neutro</td><td>${p("ma", "吗")}</td><td>${zh("吗", "")}</td><td>partícula de pregunta</td></tr>
      </table></div>
      <p>El tono neutro aparece, por ejemplo, en ${zh("妈妈", "māma", { es: "mamá" })} y ${zh("爸爸", "bàba", { es: "papá" })}: la segunda sílaba es breve y sin marca. Si no puedes escribir marcas, hay otra manera: se escribe el número del tono al final de la sílaba, como ma1.</p>
      <h3>¿En qué vocal va la marca?</h3>
      <p>Cada sílaba de más de una vocal tiene una sola marca. Si la pusieras en cualquier vocal, la persona que lee no sabría cuál es la que suena más fuerte, y la marca perdería su razón de ser. Por eso existe una regla fija, igual para todas las palabras.</p>
      <p>La marca va sobre la vocal principal, la que suena más fuerte y pide la boca más abierta. El orden de prioridad es a, o, e, i, u, ü. Si una final es iu o ui, la marca va en la segunda vocal.</p>
      <p class="nota"><strong>Trampa común:</strong> poner la marca en la primera vocal que ves. En «hao» va en la «a», no en la «h» ni en la «o».</p>`,
    ejemplo: `
      <p>Vamos a escribir ${zh("好", "hǎo", { es: "bien" })} en tercer tono. La sílaba sin marca es «hao».</p>
      <ol class="pasos-ej">
        <li>Busca las vocales: hay una «a» y una «o».</li>
        <li>Revisa el orden de prioridad: a, o, e, i, u, ü. La «a» va antes que la «o», así que la «a» gana.</li>
        <li>Pon la marca del tercer tono sobre la «a»: hǎo.</li>
        <li>Comprueba que no hay una vocal con más prioridad: antes de la «a» no queda ninguna, así que no hay duda.</li>
        <li>Prueba otro caso: «gui» en segundo tono. Es ui, así que la marca va en la segunda vocal: guí.</li>
      </ol>
      <p>Comprueba que solo hay una marca por sílaba y que está donde suena más fuerte. Resultado: <span class="resultado">hǎo</span>.</p>
      <p class="nota"><strong>Error común:</strong> marcar las dos vocales. Cada sílaba lleva una sola marca.</p>`,
    vidaReal: `
      <p>Tener claro el tono de cada sílaba evita malentendidos:</p>
      <ul>
        <li>Pedir «mamá» sin que se entienda «caballo», que solo cambia en la melodía de la voz.</li>
        <li>Notar que en español la melodía cambia la intención, como pregunta o afirmación, pero en chino cambia la palabra.</li>
        <li>Escribir o buscar una palabra en el teléfono sin equivocarte de sílaba.</li>
        <li>Entender por qué en chino se practican tanto los tonos desde el primer día.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', escucha: { voz: '他', audio: 'audio/zh/ta1.m4a' },
        sinAudio: '<p>Se dice <strong>tā</strong>: primer tono, la voz empieza alta y se mantiene.</p>',
        enunciado: '<p>Escucha la sílaba. ¿Qué tono tiene?</p>',
        opciones: ['Primer tono', 'Segundo tono', 'Tercer tono', 'Cuarto tono'], correcta: 0,
        pista: '<p>Fíjate si la voz sube, baja o se queda quieta.</p>',
        solucion: '<p>La voz se queda alta y pareja: es el <strong>primer tono</strong>.</p>' },
      { tipo: 'opciones', escucha: { voz: '麻' },
        sinAudio: '<p>Se dice <strong>má</strong>: segundo tono, la voz sube desde el medio hacia arriba.</p>',
        enunciado: '<p>Escucha otra sílaba. ¿Qué tono tiene?</p>',
        opciones: ['Primer tono', 'Tercer tono', 'Cuarto tono', 'Segundo tono'], correcta: 3,
        pista: '<p>Piensa en la voz al decir «¿eh?» con sorpresa: sube.</p>',
        solucion: '<p>La voz sube: es el <strong>segundo tono</strong>.</p>' },
      { tipo: 'pinyin', enunciado: '<p>Escribe en pinyin la sílaba «ma» en primer tono, la voz alta y pareja, que significa madre.</p>', respuestas: ['mā'],
        pista: '<p>El primer tono se marca con una rayita horizontal sobre la vocal.</p>',
        solucion: `<p>Es ${p("mā", "妈")}. También se acepta ma1.</p>` },
      { tipo: 'opciones', enunciado: '<p>La sílaba «hao» lleva tercer tono. ¿Dónde va la marca?</p>',
        opciones: [p('háo'), p('hào'), p('hǎo'), p('haǒ')], correcta: 2,
        pista: '<p>Prioridad de vocales: a, o, e, i, u, ü.</p>',
        solucion: `<p>La «a» gana: ${p("hǎo")}.</p>` },
      { tipo: 'opciones', enunciado: '<p>La sílaba «gui» lleva segundo tono. ¿Cuál es la escritura correcta?</p>',
        opciones: [p('guí'), p('gúi'), p('guì'), p('gǔi')], correcta: 0,
        pista: '<p>En ui, la marca va en la segunda vocal.</p>',
        solucion: `<p>La marca va en la «i»: ${p("guí")}.</p>` },
      { tipo: 'numero', enunciado: '<p>¿Cuántos tonos con marca tiene el mandarín, sin contar el tono neutro?</p>', respuesta: 4,
        pista: '<p>Mira las cuatro gráficas.</p>',
        solucion: '<p>Tiene <strong>4</strong> tonos con marca y, además, el tono neutro sin marca.</p>' },
    ],
    fuentes: [
      POLYU('tones/basic-tones', 'Basic Tones'), POLYU('tones/neutral-tone', 'Neutral Tone'),
      POLYU('spelling-rules-in-pinyin', 'Spelling Rules in Pinyin'),
      ESQUEMA,
      { nombre: 'Wikipedia (en inglés): Tone (linguistics), apoyo para los significados', url: 'https://en.wikipedia.org/wiki/Tone_(linguistics)' },
      { nombre: 'Wikipedia (en inglés): Pinyin, apoyo para los números de tono', url: 'https://en.wikipedia.org/wiki/Pinyin' },
      AUDIO, SILABO,
    ],
  });

  // ------------------------------------------------------------------
  L('Cambios de tono: el tercer tono, 不 y 一', {
    objetivo: 'Pronunciar los cambios de tono del tercer tono y de las palabras «no» y «uno», aunque el pinyin escrito no cambie.',
    explicacion: `
      <p>Di en español «ven aquí» muy despacio y luego rápido. Al ir rápido, las palabras se acomodan para que la frase fluya. El chino hace algo parecido con los tonos, y por eso lo que oyes a veces no coincide con lo escrito.</p>
      <h3>Dos terceros tonos seguidos</h3>
      <p>El tercer tono baja y sube, y decirlo entero dos veces seguidas es incómodo. Por eso, cuando dos terceros tonos van juntos, el primero se pronuncia como segundo tono. Así ${zh("你好", "nǐ hǎo", { es: "hola" })} se dice ní hǎo, con un tono que sube. El pinyin se sigue escribiendo igual, con la marca original. Esta es la convención de la lección, una recomendación nuestra: escribimos como en el sílabo y te avisamos cómo se pronuncia cada vez que cambia.</p>
      <p>Si el tercer tono va antes de un primero, segundo o cuarto tono, no sube al final: se queda en la parte baja. A eso se le llama <strong>medio tercer tono</strong>, y su recorrido pasa de 214 a 21. Por ejemplo, el hěn de ${zh("很忙", "hěn máng", { es: "muy ocupado" })} se queda en la parte baja.</p>
      <h3>El cambio de ${zh("不", "bù")}</h3>
      <p>La palabra ${zh("不", "bù", { es: "no" })} lleva cuarto tono, pero cuando le sigue otra sílaba de cuarto tono se pronuncia bú. Es otro modo de evitar dos caídas seguidas. Así ${zh("不是", "bù shì", { es: "no es" })} se dice bú shì. Con otros tonos no cambia: ${zh("不好", "bù hǎo", { es: "no está bien" })} se dice bù hǎo.</p>
      <h3>El cambio de ${zh("一", "yī")}</h3>
      <p>La palabra ${zh("一", "yī", { es: "uno" })} lleva primer tono. Cuando le sigue un cuarto tono se pronuncia yí, y cuando le sigue un primero, un segundo o un tercero se pronuncia yì. Cuando va sola o al final, como simplificación de la lección, se queda yī. En la tabla, el pinyin escrito va primero y la manera de decirlo, después; el altavoz usa la voz de tu aparato, que suele aplicar el cambio.</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Se escribe</th><th scope="col">Se dice</th><th scope="col">Por qué</th></tr>
        <tr><td>${zh("你好", "nǐ hǎo")}</td><td>ní hǎo</td><td>dos terceros tonos</td></tr>
        <tr><td>${zh("很好", "hěn hǎo")}</td><td>hén hǎo</td><td>dos terceros tonos</td></tr>
        <tr><td>${zh("不是", "bù shì")}</td><td>bú shì</td><td>${zh("不", "bù")} antes de cuarto tono</td></tr>
        <tr><td>${zh("不好", "bù hǎo")}</td><td>bù hǎo</td><td>no cambia: sigue un tercero</td></tr>
        <tr><td>${zh("一个", "yī gè")}</td><td>yí gè</td><td>${zh("一", "yī")} antes de cuarto tono</td></tr>
        <tr><td>${zh("一天", "yī tiān")}</td><td>yì tiān</td><td>${zh("一", "yī")} antes de primer tono</td></tr>
      </table></div>
      <p class="nota"><strong>Trampa común:</strong> escribir el pinyin con el tono que oyes. En pinyin se escribe el tono original, y solo la pronunciación cambia.</p>`,
    ejemplo: `
      <p>Vamos a decir ${zh("你好", "nǐ hǎo", { es: "hola" })} con naturalidad.</p>
      <ol class="pasos-ej">
        <li>Mira los tonos del pinyin escrito: nǐ y hǎo llevan los dos la marca del tercer tono, la que baja y sube.</li>
        <li>Dos terceros tonos seguidos es la situación de la regla. Cambia el primero.</li>
        <li>El primero se pronuncia como segundo tono, que sube. Queda ní hǎo.</li>
        <li>El segundo, hǎo, es el último y se queda en tercer tono.</li>
        <li>Di la palabra despacio y luego rápido: notarás que ní hǎo sale con más soltura.</li>
      </ol>
      <p>Comprueba con otra palabra: en ${zh("很好", "hěn hǎo")} pasa lo mismo y se dice hén hǎo. Oyes ní hǎo, lees nǐ hǎo y ambas cosas son correctas. Resultado: <span class="resultado">se escribe nǐ hǎo, se dice ní hǎo</span>.</p>
      <p class="nota"><strong>Error común:</strong> cambiar los dos tonos. Solo cambia el primero.</p>`,
    vidaReal: `
      <p>Conocer estos cambios te ayuda a sonar natural desde el primer saludo:</p>
      <ul>
        <li>Saludar con «hola» como lo dice una persona de China, y no como suena leído letra por letra.</li>
        <li>Entender por qué lo que oyes no coincide con lo que dice el texto, sin pensar que te equivocas.</li>
        <li>Decir «no es» y «uno» con la melodía correcta, dos palabras que usarás todo el tiempo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'pinyin', enunciado: `<p>Escribe cómo se dice ${zh("不是", "bù shì", { es: "no es" })}, aplicando el cambio de tono.</p>`, respuestas: ['bú shì'],
        pista: '<p>Mira el tono de la segunda sílaba: shì es de cuarto tono.</p>',
        solucion: `<p>Antes de cuarto tono, ${zh("不", "bù")} se dice bú: <strong>bú shì</strong>.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué tono toma ${zh("一", "yī")} antes de una sílaba de cuarto tono?</p>`,
        opciones: ['Cuarto tono (yì)', 'Segundo tono (yí)', 'Tercer tono (yǐ)', 'Se queda en primer tono (yī)'], correcta: 1,
        pista: `<p>Con cuarto tono delante, ${zh("一", "yī")} sube.</p>`,
        solucion: `<p>Antes de cuarto tono, ${zh("一", "yī")} se dice <strong>yí</strong>, como en yí gè.</p>` },
      { tipo: 'opciones', escucha: { voz: '你好' },
        sinAudio: '<p>Se dice <strong>ní hǎo</strong>: la primera sílaba sube (segundo tono) y la segunda baja y sube (tercero).</p>',
        enunciado: '<p>Escucha el saludo. ¿Cómo suena la primera sílaba?</p>',
        opciones: ['Cae de alto a bajo', 'Baja y sube entera', 'Se queda alta y pareja', 'Sube, como el segundo tono'], correcta: 3,
        pista: '<p>Dos terceros tonos juntos: el primero cambia.</p>',
        solucion: '<p>Sube, como el segundo tono: se dice ní hǎo, aunque se escribe nǐ hǎo.</p>' },
      { tipo: 'pinyin', enunciado: `<p>Escribe cómo se dice ${zh("一天", "yī tiān", { es: "un día" })}. Recuerda que tiān es de primer tono.</p>`, respuestas: ['yì tiān'],
        pista: `<p>Con un primer tono después, ${zh("一", "yī")} toma cuarto tono.</p>`,
        solucion: `<p>Antes de un primer tono, ${zh("一", "yī")} se dice yì: <strong>yì tiān</strong>.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿En cuál de estas palabras ${zh("不", "bù")} no cambia de tono?</p>`,
        opciones: [zh('不是', 'bù shì'), zh('不好', 'bù hǎo'), zh('不对', 'bù duì'), zh('不去', 'bù qù')], correcta: 1,
        pista: '<p>Solo cambia cuando la sílaba siguiente es de cuarto tono.</p>',
        solucion: `<p>hǎo es de tercer tono, así que ${zh("不", "bù")} se queda en bù. En las otras, la siguiente sílaba es de cuarto tono y se dice bú.</p>` },
      { tipo: 'opciones', enunciado: `<p>En ${zh("很忙", "hěn máng")}, ¿cómo se pronuncia hěn?</p>`,
        opciones: ['En la parte baja, sin subir al final (medio tercer tono)', 'Como cuarto tono', 'Como primer tono', 'Como el tercer tono entero'], correcta: 0,
        pista: '<p>Tras un tercer tono viene un segundo tono, no un tercero.</p>',
        solucion: '<p>Ante cualquier tono que no sea tercero, el tercer tono se queda en la parte baja: es el medio tercer tono.</p>' },
    ],
    fuentes: [
      POLYU('tones/tone-sandhi', 'Tone Sandhi'),
      { nombre: 'Universidad de Iowa (EE. UU.): Mastering Mandarin Sounds, Tone Sandhi (en inglés)', url: 'https://pressbooks.uiowa.edu/zheng/chapter/tone-sandhi-tone-changes-in-context' },
      { nombre: 'Universidad de California en San Diego (EE. UU.): LIGN 101, Tone in languages (en inglés)', url: 'https://wstyler.ucsd.edu/101/tone_huang.pdf' },
      { nombre: 'Chicago North Chinese School: Hanyu Pinyin, alojado en la Universidad Nacional de Taiwán (en inglés)', url: 'https://homepage.ntu.edu.tw/~karchung/phonetics/HanYuPinYin.pdf' },
      { nombre: 'Wikipedia (en inglés): Standard Chinese phonology, apoyo para 一', url: 'https://en.wikipedia.org/wiki/Standard_Chinese_phonology' },
      SILABO,
    ],
  });

  // ------------------------------------------------------------------
  L('Trazos y orden de trazos', {
    objetivo: 'Nombrar los trazos básicos, seguir el orden de trazos de un carácter y contar cuántos trazos tiene.',
    explicacion: `
      <p>Cuando aprendes a escribir tu nombre, no dibujas la «A» en cualquier orden: primero una línea, luego otra. Escribir chino también tiene sus reglas de dibujo, y siguen un orden que hace que el carácter salga bien.</p>
      <h3>Los trazos</h3>
      <p>Un carácter se dibuja con <strong>trazos</strong>, que son las líneas que haces sin levantar el lápiz. Princeton describe cinco trazos básicos, cada uno con nombre y dirección:</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Nombre</th><th scope="col">Forma</th><th scope="col">Dirección</th></tr>
        <tr><td>${zh("横", "héng")}</td><td>raya horizontal</td><td>de izquierda a derecha</td></tr>
        <tr><td>${zh("竖", "shù")}</td><td>raya vertical</td><td>de arriba abajo</td></tr>
        <tr><td>${zh("撇", "piě")}</td><td>raya inclinada a la izquierda</td><td>de arriba a la derecha hacia abajo a la izquierda</td></tr>
        <tr><td>${zh("捺", "nà")}</td><td>raya inclinada a la derecha</td><td>de arriba a la izquierda hacia abajo a la derecha</td></tr>
        <tr><td>${zh("提", "tí")}</td><td>raya que sube</td><td>de abajo a la izquierda hacia arriba a la derecha</td></tr>
      </table></div>
      <p>Hay más. El punto ${zh("点", "diǎn")} es un trazo corto que puede ir solo. Los quiebres ${zh("折", "zhé")} y los ganchos ${zh("钩", "gōu")} nunca van solos: se combinan con otros trazos.</p>
      <h3>El orden de trazos</h3>
      <p>Imagina que dibujas un cuadrado: casi todo el mundo empieza arriba a la izquierda y va en el mismo sentido. El chino hace lo mismo con cada carácter, y lo escribe siempre igual para que todos lo lean igual.</p>
      <p>El <strong>orden de trazos</strong> dice por dónde empezar y qué línea sigue. Estas son reglas generales, no todas las del idioma, y sirven para los caracteres de esta lección. Izquierda antes que derecha. Arriba antes que abajo. Horizontal antes que vertical cuando se cruzan. Lo que encierra, antes que lo de dentro, y el trazo que cierra por abajo, al final. Los cuatro caracteres de abajo se escriben igual en simplificado y en tradicional. Seguirlas hace que cada carácter salga legible y, además, permite contar sus trazos sin perderte.</p>
      <p>Aquí están cuatro caracteres con el número de cada trazo en el orden en que se dibujan:</p>
      <div class="dos-graficas">
        ${caracter([{ pts: [[-1, 0], [1, 0]], num: [-1.25, 0.1] }, { pts: [[0, 1.1], [0, -1.1]], num: [0.15, 1.3] }], "Diagrama del carácter diez: el trazo 1 es una raya horizontal de izquierda a derecha; el trazo 2 es una raya vertical que cruza el centro, de arriba abajo.")}
        ${caracter([{ pts: [[-0.8, 1], [0.8, 1]], num: [-1.05, 1] }, { pts: [[-0.5, 0], [0.5, 0]], num: [-0.75, 0] }, { pts: [[-1, -1], [1, -1]], num: [-1.25, -1] }], "Diagrama del carácter tres: tres rayas horizontales, de arriba abajo; el trazo 1 es la de arriba, el 2 la del medio y el 3 la de abajo.")}
      </div>
      <div class="dos-graficas">
        ${caracter([{ pts: [[0.1, 1.1], [-0.9, -1.1]], num: [0.3, 1.15] }, { pts: [[-0.26, 0.3], [0.9, -1.1]], num: [0.05, 0.55] }], "Diagrama del carácter persona: el trazo 1 es una raya inclinada que baja hacia la izquierda; el trazo 2 es otra que baja hacia la derecha, saliendo del medio del primero.")}
        ${caracter([{ pts: [[-0.8, 0.9], [-0.8, -0.9]], num: [-1.05, 0.9] }, { pts: [[-0.8, 0.9], [0.8, 0.9], [0.8, -0.9]], num: [0.05, 1.15] }, { pts: [[-0.8, -0.9], [0.8, -0.9]], num: [0, -1.2] }], "Diagrama del carácter boca: el trazo 1 es la raya vertical de la izquierda; el trazo 2 sale de arriba a la izquierda, va a la derecha y baja; el trazo 3 es la raya de abajo, que cierra.")}
      </div>
      <p>En orden son ${zh("十", "shí")}, ${zh("三", "sān")}, ${zh("人", "rén")} y ${zh("口", "kǒu")}. Contar trazos es contar esos números, sin saltarse ninguno: ${zh("一", "yī")} tiene 1, ${zh("二", "èr")} tiene 2, ${zh("大", "dà")} tiene 3 y ${zh("中", "zhōng")} tiene 4.</p>
      <p>Por último, el sílabo separa los caracteres que debes saber leer de los que debes saber escribir. Para los niveles 1 y 2 pide escribir 100.</p>
      <p class="nota"><strong>Trampa común:</strong> empezar por donde se te ocurre. Sin el orden, el carácter sale torcido y no puedes contar los trazos con seguridad.</p>`,
    ejemplo: `
      <p>Vamos a escribir ${zh("十", "shí", { es: "diez" })} y ${zh("口", "kǒu", { es: "boca" })}.</p>
      <ol class="pasos-ej">
        <li>Para ${zh("十", "shí")}, empieza con la raya horizontal, de izquierda a derecha. Es el primer trazo porque, cuando dos rayas se cruzan, primero va la horizontal.</li>
        <li>Después baja la raya vertical, de arriba abajo, cruzando el centro. Son 2 trazos.</li>
        <li>Para ${zh("口", "kǒu")}, empieza con la raya vertical de la izquierda, porque la izquierda va antes.</li>
        <li>Haz el segundo trazo: sale de arriba a la izquierda, va a la derecha y baja. Cierra con la raya de abajo.</li>
      </ol>
      <p>Comprueba contando: ${zh("十", "shí")} tiene 2 trazos y ${zh("口", "kǒu")} tiene 3. Resultado: <span class="resultado">${zh("十", "shí")} = 2 trazos, ${zh("口", "kǒu")} = 3 trazos</span>.</p>
      <p class="nota"><strong>Error común:</strong> cerrar ${zh("口", "kǒu")} antes de tiempo. La raya de abajo va al final.</p>`,
    vidaReal: `
      <p>Saber cómo se arman las líneas de un carácter tiene usos prácticos:</p>
      <ul>
        <li>Escribir a mano una nota o una tarea con letra que otras personas puedan leer.</li>
        <li>Buscar un carácter desconocido en un diccionario a partir de cuántas líneas tiene.</li>
        <li>Usar la escritura a mano del teléfono, que reconoce mejor lo que dibujas en el orden correcto.</li>
        <li>Escribir rápido sin que el resultado se vuelva ilegible.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: `<p>¿Cuántos trazos tiene ${zh("三", "sān")}?</p>`, respuesta: 3,
        pista: '<p>Mira el diagrama: cada raya es un trazo.</p>',
        solucion: '<p>Son 3 rayas horizontales: <strong>3</strong> trazos.</p>' },
      { tipo: 'numero', enunciado: `<p>¿Cuántos trazos tiene ${zh("中", "zhōng")}?</p>`, respuesta: 4,
        pista: '<p>Es el carácter con más trazos de los que vimos.</p>',
        solucion: '<p>Tiene <strong>4</strong> trazos, como indican los diccionarios.</p>' },
      { tipo: 'ordenar', enunciado: `<p>Ordena los pasos para escribir ${zh("口", "kǒu")}.</p>`,
        respuesta: ['Primero, la raya vertical de la izquierda, de arriba abajo', 'Después, la raya que sale de arriba a la izquierda, va a la derecha y baja', 'Al final, la raya de abajo, que cierra'],
        pista: '<p>La izquierda va antes, y lo que cierra por abajo va al final.</p>',
        solucion: '<p>Primero la raya de la izquierda, luego el trazo de arriba que baja por la derecha, y por último la raya de abajo que cierra.</p>' },
      { tipo: 'opciones', enunciado: `<p>Para escribir ${zh("十", "shí")}, ¿qué regla dice que la raya horizontal va primero?</p>`,
        opciones: ['Arriba antes que abajo', 'Horizontal antes que vertical cuando se cruzan', 'Izquierda antes que derecha', 'Lo de dentro antes que lo de fuera'], correcta: 1,
        pista: `<p>En ${zh("十", "shí")} las dos rayas se cruzan.</p>`,
        solucion: '<p>Cuando dos rayas se cruzan, primero se escribe la horizontal y luego la vertical.</p>' },
      { tipo: 'opciones', enunciado: `<p>¿Cómo se escribe el trazo ${zh("撇", "piě")}?</p>`,
        opciones: ['De izquierda a derecha, en horizontal', 'De arriba abajo, en vertical', 'De arriba a la derecha hacia abajo a la izquierda', 'De abajo a la izquierda hacia arriba'], correcta: 2,
        pista: '<p>Es una raya inclinada que baja hacia la izquierda.</p>',
        solucion: '<p>El piě va de arriba a la derecha hacia abajo a la izquierda.</p>' },
      { tipo: 'numero', enunciado: '<p>Según el sílabo, ¿cuántos caracteres hay que saber escribir en los niveles 1 y 2?</p>', respuesta: 100,
        pista: '<p>La lista de escritura de los niveles 1 y 2 termina en el número…</p>',
        solucion: '<p>La lista de escritura de los niveles 1 y 2 llega al número <strong>100</strong>.</p>' },
    ],
    fuentes: [
      { nombre: 'Princeton University (EE. UU.): Basic Chinese Characters, Basic Strokes (en inglés)', url: 'https://commons.princeton.edu/chinesecharacters/basic-strokes/' },
      { nombre: 'Ministerio de Educación de Taiwán: Learning Program for Stroke of Chinese Characters, Basic Rules of Stroke Order (en inglés)', url: 'https://stroke-order.learningweb.moe.edu.tw/page.jsp?ID=46&la=1' },
      { nombre: 'Wikipedia (en inglés): Chinese character strokes, apoyo para 点, 折 y 钩', url: 'https://en.wikipedia.org/wiki/Chinese_character_strokes' },
      { nombre: 'Wikipedia (en inglés): Kangxi radicals, número de trazos de 一, 二 y 人', url: 'https://en.wikipedia.org/wiki/Kangxi_radicals' },
      { nombre: 'Wiktionary (en inglés): 三, número de trazos', url: 'https://en.wiktionary.org/wiki/%E4%B8%89' },
      { nombre: 'Wiktionary (en inglés): 中, número de trazos', url: 'https://en.wiktionary.org/wiki/%E4%B8%AD' },
      { nombre: 'Wiktionary (en inglés): 十, número de trazos', url: 'https://en.wiktionary.org/wiki/%E5%8D%81' },
      { nombre: 'Wiktionary (en inglés): 大, número de trazos', url: 'https://en.wiktionary.org/wiki/%E5%A4%A7' },
      { nombre: 'Wiktionary (en inglés): 口, número de trazos', url: 'https://en.wiktionary.org/wiki/%E5%8F%A3' },
      SILABO,
    ],
  });

  // ------------------------------------------------------------------
  L('Radicales: las piezas de los caracteres', {
    objetivo: 'Reconocer los componentes y radicales más comunes y usarlos para adivinar el sentido de un carácter.',
    explicacion: `
      <p>Si ves la palabra «panadería», sin saber qué es adivinas que tiene que ver con el pan, por la raíz «pan». Con los caracteres pasa algo parecido: están armados con piezas que se repiten y dan pistas.</p>
      <h3>Piezas que se repiten</h3>
      <p>Un <strong>componente</strong> es una pieza que forma parte de un carácter. Los caracteres se agrupan por sus componentes más repetidos, que tradicionalmente se llaman <strong>radicales</strong>. Los diccionarios los usan para ordenar caracteres, y en la mayoría hay unos 200. Conocerlos es casi indispensable para buscar en un diccionario por radical.</p>
      <h3>Una pieza para el sentido y otra para el sonido</h3>
      <p>Piensa en cómo reconoces a un familiar: por el rostro, por la voz, por la forma de caminar. Un carácter también se reconoce por piezas, no por todo su dibujo a la vez.</p>
      <p>Muchos caracteres combinan dos piezas: una da una pista del significado y otra, del sonido. Según Princeton, cerca del 80 % de los caracteres son así. Por eso un carácter nuevo ya no es un dibujo desconocido: tiene piezas que reconoces.</p>
      <p>Estos son cinco radicales y caracteres de la lista de lectura del nivel 1 que los llevan:</p>
      <div class="tabla-wrap"><table>
        <tr><th scope="col">Radical</th><th scope="col">Significado</th><th scope="col">Caracteres de nivel 1</th></tr>
        <tr><td>${zh("女", "nǚ")}</td><td>mujer</td><td>${zh("妈", "mā")} ${zh("好", "hǎo")} ${zh("姐", "jiě")}</td></tr>
        <tr><td>${zh("口", "kǒu")}</td><td>boca</td><td>${zh("吗", "ma")} ${zh("吃", "chī")} ${zh("喝", "hē")} ${zh("叫", "jiào")}</td></tr>
        <tr><td>${zh("亻")}</td><td>persona</td><td>${zh("你", "nǐ")} ${zh("他", "tā")} ${zh("们", "men")}</td></tr>
        <tr><td>${zh("氵")}</td><td>agua</td><td>${zh("汉", "hàn")} ${zh("没", "méi")}</td></tr>
        <tr><td>${zh("讠")}</td><td>palabra</td><td>${zh("说", "shuō")} ${zh("请", "qǐng")} ${zh("谁", "shéi/shuí")}</td></tr>
      </table></div>
      <p>Fíjate en que las pistas tienen sentido: ${zh("吃", "chī", { es: "comer" })} y ${zh("喝", "hē", { es: "beber" })} llevan «boca»; ${zh("说", "shuō", { es: "decir" })} lleva «palabra». Algunos de estos caracteres no son palabras sueltas del nivel 1, sino piezas de palabras como ${zh("妈妈", "māma")} o ${zh("汉语", "hànyǔ")}.</p>
      <p>Ahora el sonido. Un carácter de este tipo se puede leer como un acertijo: la primera pieza te dice de qué tema se trata y la segunda te sopla cómo se dice. En ${zh("妈", "mā", { es: "madre" })}, la pieza ${zh("女", "nǚ")} da el significado y la pieza ${zh("马", "mǎ", { es: "caballo" })} da el sonido, parecido a mā. Lo mismo ocurre en ${zh("吗", "ma")}: el sonido viene de ${zh("马", "mǎ")}.</p>
      <p class="nota"><strong>Trampa común:</strong> tomar la pista como regla segura. El radical orienta, pero no siempre, y a veces no hay pista que valga. Un estudio con aprendices registra que el carácter ${zh("给", "gěi", { es: "dar" })} no tiene relación con su radical, el de «hilo de seda». No es de la lista de nivel 1; es solo un ejemplo.</p>`,
    ejemplo: `
      <p>Vamos a desarmar ${zh("妈", "mā", { es: "madre" })}.</p>
      <ol class="pasos-ej">
        <li>Mira el carácter y busca las dos piezas: una a la izquierda y otra a la derecha.</li>
        <li>La pieza de la izquierda es ${zh("女", "nǚ", { es: "mujer" })}. Es el radical y da una pista de significado: «mujer», que cuadra con «madre».</li>
        <li>La pieza de la derecha es ${zh("马", "mǎ", { es: "caballo" })}. Da la pista del sonido: se lee casi igual, solo cambia el tono.</li>
        <li>Junta las pistas: algo de mujer, que suena parecido a mǎ. Es mā.</li>
        <li>Fíjate en que el tono sí cambió: la pieza de sonido es de tercer tono y el carácter completo es de primer tono.</li>
      </ol>
      <p>Comprueba con ${zh("妈妈", "māma", { es: "mamá" })}: el carácter se repite. Resultado: <span class="resultado">${zh("妈", "mā")} = mujer (significado) + mǎ (sonido)</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que la pieza de sonido repite el tono. Suena parecido, pero el tono puede cambiar.</p>`,
    vidaReal: `
      <p>Reconocer estas piezas hace que leer chino sea menos intimidante:</p>
      <ul>
        <li>Adivinar de qué trata una palabra nueva, por ejemplo si tiene que ver con comer, con decir o con personas.</li>
        <li>Buscar un carácter en un diccionario, que se ordena por sus piezas.</li>
        <li>Recordar mejor lo que aprendes, porque asocias cada carácter con piezas que ya conoces.</li>
        <li>Distinguir caracteres parecidos al fijarte primero en su pieza más grande.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Los caracteres ${zh("吗", "ma")}, ${zh("吃", "chī")} y ${zh("喝", "hē")} comparten una pieza. ¿Cuál es?</p>`,
        opciones: [zh('女', 'nǚ'), zh('口', 'kǒu'), zh('氵'), zh('讠')], correcta: 1,
        pista: '<p>Piensa en lo que se hace al comer y al beber.</p>',
        solucion: `<p>Comparten ${zh("口", "kǒu", { es: "boca" })}.</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué pista da la pieza ${zh("女", "nǚ")} en ${zh("妈", "mā")}?</p>`,
        opciones: ['El significado: mujer', 'El sonido: mǎ', 'El número de trazos', 'Nada: es solo adorno'], correcta: 0,
        pista: '<p>El radical suele dar el significado.</p>',
        solucion: '<p>Da el significado: mujer. El sonido lo da la otra pieza.</p>' },
      { tipo: 'texto', enunciado: `<p>El radical ${zh("氵")} aparece en ${zh("没", "méi")}. Escribe en una palabra qué significa.</p>`, respuestas: ['agua'],
        pista: '<p>Son tres gotitas.</p>',
        solucion: '<p>Significa <strong>agua</strong>.</p>' },
      { tipo: 'opciones', enunciado: `<p>En ${zh("妈", "mā")}, ¿qué pieza da la pista del sonido?</p>`,
        opciones: [zh('马', 'mǎ'), zh('女', 'nǚ'), zh('口', 'kǒu'), zh('人', 'rén')], correcta: 0,
        pista: '<p>Se lee casi igual que el carácter completo.</p>',
        solucion: `<p>La pieza de sonido es ${zh("马", "mǎ")} (mǎ), parecida a mā.</p>` },
      { tipo: 'numero', enunciado: '<p>Según Princeton, cerca de ¿qué porcentaje de los caracteres tiene una pieza de significado y otra de sonido?</p>', respuesta: 80,
        pista: '<p>Son cuatro de cada cinco.</p>',
        solucion: '<p>Cerca del <strong>80 %</strong>.</p>' },
      { tipo: 'opciones', enunciado: `<p>Los caracteres ${zh("你", "nǐ")}, ${zh("他", "tā")} y ${zh("们", "men")} llevan el radical ${zh("亻")}. ¿Qué significa?</p>`,
        opciones: ['Agua', 'Boca', 'Persona', 'Palabra'], correcta: 2,
        pista: '<p>Piensa en las palabras tú, él y ellos.</p>',
        solucion: '<p>Significa persona: todas son palabras sobre personas.</p>' },
    ],
    fuentes: [
      { nombre: 'Princeton University (EE. UU.): Basic Chinese Characters, Radicals and components (en inglés)', url: 'https://commons.princeton.edu/chinesecharacters/radicals/' },
      { nombre: 'MIT OpenCourseWare (EE. UU.): 21G.107 Chinese I, Lesson 2 (en inglés)', url: 'https://ocw.mit.edu/courses/21g-107-chinese-i-streamlined-fall-2014/f228f6ef1a53c9a254cc2b424f70b466_MIT21G_107F14_Chars2.pdf' },
      { nombre: 'Frontiers in Psychology (Nguyen y otros, 2017): Teaching semantic radicals (en inglés)', url: 'https://www.frontiersin.org/articles/10.3389/fpsyg.2017.01846/pdf' },
      { nombre: 'Wikipedia (en inglés): Tone (linguistics), apoyo para el significado de mǎ', url: 'https://en.wikipedia.org/wiki/Tone_(linguistics)' },
      SILABO,
    ],
  });
})();
