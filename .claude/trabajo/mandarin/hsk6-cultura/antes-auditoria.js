// Mandarín · Unidad 18: HSK 6 · Cultura y textos.
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
  // F2
  const MOE_ZSYX = { nombre: 'Ministerio de Educación (Taiwán), 《成語典》 (2020): entrada «左思右想» (en chino)', url: 'https://dict.idioms.moe.edu.tw/idiomView.jsp?ID=7204' };
  // F3
  const NVCC = { nombre: 'Northern Virginia Community College (EE. UU.), «World Literature», capítulo «China» (en inglés)', url: 'https://pressbooks.nvcc.edu/eng255/part/china-2/' };
  // F4
  const WIKISOURCE = { nombre: 'Wikisource en chino (apoyo, dominio público), «靜夜思», versión de 《唐詩三百首》 (en chino)', url: 'https://zh.wikisource.org/wiki/%E9%9D%9C%E5%A4%9C%E6%80%9D' };
  // F5
  const EAST_ASIA = { nombre: 'East Asia Student (blog de traducciones, fuente de apoyo no universitaria): «Quiet Night Thoughts, by Li Bai» (en inglés)', url: 'https://eastasiastudent.net/china/classical/li-bai-night-thoughts' };
  // F6
  const COLUMBIA = { nombre: 'Universidad de Columbia (EE. UU.), Asia for Educators, «CHINA—Timeline of Historical Periods» (en inglés)', url: 'https://afe.easia.columbia.edu/timelines/china_timeline.htm' };
  // F31
  const PRINCETON = { nombre: 'Princeton University Art Museum (EE. UU.), «Chinese Landscape Painting during the Song Dynasty» (2021, en inglés)', url: 'https://static.artmuseum.princeton.edu/asian-art/china/resources/landscape-painting/' };
  // F32
  const PALACIO = { nombre: 'Museo del Palacio (China), «About the Palace Museum» (en inglés)', url: 'https://intl.dpm.org.cn/about_us/126.html' };
  // F33
  const PALACIO_TAIHE = { nombre: 'Museo del Palacio (China), «Hall of Supreme Harmony (Taihe dian)» (en inglés)', url: 'https://intl.dpm.org.cn/hallsinfo/374.html' };
  // F34, F35, F36, F37
  const SJTU = { nombre: 'Universidad Jiao Tong de Shanghái (China), «普通话和汉语方言» (2008, en chino)', url: 'https://news.sjtu.edu.cn/zhxw/20180405/30627.html' };
  const HENAN = { nombre: 'Universidad Normal de Henan (China), «我国汉语七大方言区» (2010, en chino)', url: 'https://www.htu.edu.cn/yw/2010/0708/c14029a31441/page.htm' };
  const KENYON = { nombre: 'Kenyon College (EE. UU.), «The Chinese Language» (en inglés)', url: 'https://www2.kenyon.edu/Depts/Religion/Fac/Adler/Reln270/ChineseLanguage.htm' };
  const ALLSET_330 = { nombre: 'Chinese Grammar Wiki (AllSet Learning), fuente de apoyo no universitaria: Reference, Common Chinese Patterns 330, solo el índice (en inglés)', url: 'https://resources.allsetlearning.com/chinese/grammar/Reference:Common_Chinese_Patterns_330_(%E6%B1%89%E8%AF%AD%E5%B8%B8%E7%94%A8%E6%A0%BC%E5%BC%8F330%E4%BE%8B)' };
  // F60 a F63
  const MCGILL = { nombre: 'Universidad McGill (Canadá), Student learning resources: Reading and note-taking (en inglés)', url: 'https://www.mcgill.ca/student-learning-resources/study-learn/reading-and-note-taking' };
  const DART_22 = { nombre: 'Dartmouth College (EE. UU.), Snapshots of China, lección 22: notas de gramática de 然而 (2023, en inglés)', url: 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e4%ba%8c%e5%8d%81%e4%ba%8c%e8%af%be-lesson-22/' };
  const DART_20 = { nombre: 'Dartmouth College (EE. UU.), Snapshots of China, lección 20: notas de gramática de 由于 (2023, en inglés)', url: 'https://sites.dartmouth.edu/snapshotsofchina/%e7%ac%ac%e4%ba%8c%e5%8d%81%e8%af%be-lesson-20/' };
  // F64 a F70
  const ILLINOIS = { nombre: 'Universidad de Illinois en Urbana-Champaign (EE. UU.), iSchool Writing Resources: How to Structure an Argument (en inglés)', url: 'https://publish.illinois.edu/ischoolwritingresources/how-to-structure-an-argument/' };
  const TEXAS = { nombre: 'Texas A&M University (EE. UU.), Open Publishing: Informed Arguments, 4.4 Basic Structure and Content of Argument (2023, en inglés)', url: 'https://odp.library.tamu.edu/informedarguments/chapter/basic-structure-and-content-of-argument' };
  const UNC = { nombre: 'Universidad de Carolina del Norte en Chapel Hill (EE. UU.), The Writing Center: Argument (en inglés)', url: 'https://writingcenter.unc.edu/tips-and-tools/argument/' };
  const HK = { nombre: 'Oficina de Educación de Hong Kong (China), Currículo de Lengua China: «評論» (議論文), recursos para primaria y secundaria (en chino, caracteres tradicionales)', url: 'https://www.edb.gov.hk/attachment/tc/curriculum-development/kla/chi-edu/resources/primary-secondary/lang/12%20pinglun.pdf' };
  const MOE_LUNDIAN = { nombre: 'Ministerio de Educación de Taiwán (China), Educación Baike: 論點 (en chino)', url: 'https://pedia.cloud.edu.tw/Entry/Detail?title=%E8%AB%96%E9%BB%9E&search=%E8%AB%96%E9%BB%9E' };
  const MOE_LUNJU = { nombre: 'Ministerio de Educación de Taiwán (China), Educación Baike: 論據 (en chino)', url: 'https://pedia.cloud.edu.tw/Entry/Detail/?title=%E8%AB%96%E6%93%9A' };
  const MOE_LUNZHENG = { nombre: 'Ministerio de Educación de Taiwán (China), Educación Baike: 論證 (en chino)', url: 'https://pedia.cloud.edu.tw/Entry/Detail/?title=%E8%AB%96%E8%AD%89&search=%E8%AB%96%E8%AD%89' };

  // ------------------------------------------------------------------
  L('Poesía clásica: leer un poema Tang', {
    objetivo: `Leer con calma un poema Tang breve, entender cómo suena y qué pinta, y reconocer el molde ${zh("左思右想", "zuǒ sī yòu xiǎng")}, junto con 15 palabras para hablar de poesía.`,
    explicacion: `
      <p>Empiezas la unidad 18, la última de la materia: cultura y textos de HSK 6. Cada lección trae una selección de 15 palabras, no toda la lista; la lista completa está en el <a href="${encodeURI(SILABO.url)}">sílabo</a>. Las frases de ejemplo son de la lección. La voz depende de tu dispositivo: si suena rara, el pinyin manda. Y ${zh("不", "bù")} y ${zh("一", "yī")} se escriben con su tono original; al hablar cambian, como viste antes.</p>
      <p>Piensa en cuatro líneas muy cortas que te dejan mirando la ventana: un buen poema dice poco y pinta mucho. Antes de leer uno, conviene tener palabras para hablar de él.</p>
      ${tabla([
        ['诗词', 'shīcí', 'poemas y versos de estilo clásico'], ['诗歌', 'shīgē', 'la poesía en general'], ['古典', 'gǔdiǎn', 'clásico, de la tradición antigua'], ['月光', 'yuèguāng', 'luz de la luna'], ['思念', 'sīniàn', 'extrañar a alguien o algún lugar'],
        ['怀念', 'huáiniàn', 'recordar con cariño algo que pasó'], ['描绘', 'miáohuì', 'pintar con palabras o con imágenes'], ['朗读', 'lǎngdú', 'leer en voz alta'], ['散文', 'sǎnwén', 'texto en prosa, sin verso ni rima'], ['节奏', 'jiézòu', 'ritmo'],
        ['音节', 'yīnjié', 'sílaba'], ['含义', 'hányì', 'lo que quiere decir algo'], ['景象', 'jǐngxiàng', 'escena, lo que se ve'], ['寂寞', 'jìmò', 'soledad, sentirse solo'], ['岁月', 'suìyuè', 'los años, el tiempo que pasa'],
      ])}
      <h3>¿Qué es la poesía Tang?</h3>
      <p>La dinastía Tang duró de 618 a 906 de nuestra era, según la Universidad de Columbia, que la describe como un tiempo de florecimiento cultural. Un capítulo de Northern Virginia Community College dice que a menudo se afirma que fue la edad de oro de la literatura china y que la poesía fue su forma más gloriosa.</p>
      <p>El capítulo explica dos formas. El <strong>verso regulado</strong> (en pinyin, lüshi) tiene ocho versos de cinco o siete sílabas que siguen patrones de tono. El <strong>jueju</strong>, «verso truncado», es su versión más corta. Simplificación de la lección: cada carácter es una sílaba, así que cinco caracteres son cinco ${zh("音节", "yīnjié")}, y esa cuenta marca el ${zh("节奏", "jiézòu")}.</p>
      <h3>¿Quién fue Li Bai?</h3>
      <p>La misma fuente considera a Du Fu (712 a 770) y a Li Bai (701 a 762) los mayores poetas de China. Li Bai, que allí aparece como «Li Bo», no tuvo un cargo alto y pasó mucho tiempo vagando.</p>
      <h3>Leer ${zh("《静夜思》", "jìng yè sī")} verso a verso</h3>
      <p>El poema, cuyo título puedes entender como «pensamiento en una noche tranquila», es el número 233 de los «300 poemas Tang», según East Asia Student, un blog de traducciones que usamos como apoyo. Aquí va en caracteres simplificados. La traducción es de la lección.</p>
      ${cuadro(['Verso', 'Traducción de la lección'], [
        [zh('床前明月光', 'chuáng qián míng yuè guāng'), 'Frente a mi cama, la luz clara de la luna;'],
        [zh('疑是地上霜', 'yí shì dì shàng shuāng'), 'creo que es escarcha sobre el suelo.'],
        [zh('举头望明月', 'jǔ tóu wàng míng yuè'), 'Levanto la cabeza y miro la luna clara;'],
        [zh('低头思故乡', 'dī tóu sī gù xiāng'), 'la bajo y pienso en mi pueblo natal.'],
      ])}
      <p>Son cuatro versos de cinco sílabas. Según el blog, la rima sigue el esquema AABA: terminan con un sonido parecido el primero, el segundo y el cuarto (guāng, shuāng, xiāng). Wikisource anota que otras ediciones traen ${zh("看月光", "kàn yuèguāng")} en el primer verso y ${zh("山月", "shān yuè")} en el tercero: un mismo poema puede cambiar un poco.</p>
      <h3>¿Qué es ${zh("左思右想", "zuǒ sī yòu xiǎng")}?</h3>
      <p>El sílabo de nivel 6 lista entre los <strong>${zh("四字格", "sì zì gé")}</strong> (frases de cuatro caracteres) el molde ${zh("左A右B", "zuǒ A yòu B")}. No hallé una regla de uso universitaria; lo que sigue es una simplificación de la lección. Los dos huecos llevan verbos parecidos, como en ${zh("左思右想", "zuǒ sī yòu xiǎng")}: ${zh("思", "sī")} y ${zh("想", "xiǎng")} significan «pensar». El diccionario de modismos del Ministerio de Educación de Taiwán lo explica como «pensar una y otra vez».</p>
      <p class="nota"><strong>Trampa común:</strong> leer ${zh("左", "zuǒ")} y ${zh("右", "yòu")} como direcciones, «izquierda» y «derecha». En este molde no hablan de lados: solo repiten la acción.</p>`,
    ejemplo: `
      <p>Lee los dos últimos versos con calma: ${zh("举头望明月，低头思故乡", "jǔ tóu wàng míng yuè, dī tóu sī gù xiāng")}. Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Parte el primer verso en acciones: ${zh("举头", "jǔ tóu")}, «levantar la cabeza», y ${zh("望明月", "wàng míng yuè")}, «mirar la luna clara».</li>
        <li>Haz lo mismo con el segundo: ${zh("低头", "dī tóu")}, «bajar la cabeza», y ${zh("思故乡", "sī gù xiāng")}, «pensar en el pueblo natal».</li>
        <li>Compara los dos versos: arriba y abajo, mirar y pensar. Están armados en paralelo, y por eso se recuerdan fácil.</li>
        <li>Une las ideas: la luz de la luna lo lleva a su casa lejana. Eso es ${zh("思念", "sīniàn")}.</li>
      </ol>
      <p>Para comprobar, lee los versos en voz alta, marca el ${zh("节奏", "jiézòu")} de cinco sílabas y revisa que tu traducción conserve el mismo orden de acciones. Resultado: <span class="resultado">levanto la cabeza y miro la luna; la bajo y pienso en mi pueblo natal.</span></p>
      <p class="nota"><strong>Error común:</strong> creer que el poeta ve escarcha de verdad. ${zh("疑是", "yí shì")} quiere decir «creo que es»: lo que ve es la luz de la luna sobre el suelo.</p>`,
    vidaReal: `
      <p>Cuando encuentres un poema en chino, ahora sabes qué mirar: cuántos caracteres tiene cada verso, qué versos suenan parecido al final y qué ${zh("景象", "jǐngxiàng")} pinta. Puedes ${zh("朗读", "lǎngdú")} un verso despacio y comparar cómo suena con su traducción. Y si alguien te cuenta que lleva días dándole vueltas a una decisión, reconocerás ${zh("左思右想", "zuǒ sī yòu xiǎng")}. Leer un solo verso con atención ya es una forma de leer ${zh("诗歌", "shīgē")}.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según el capítulo de Northern Virginia Community College, ¿qué se dice a menudo de la dinastía Tang?</p>',
        opciones: ['Que fue la edad de oro de la literatura china, con la poesía como su forma más gloriosa', 'Que en ella nació la prosa', 'Que no tuvo poetas importantes', 'Que duró de 221 a 206 antes de nuestra era'], correcta: 0,
        pista: '<p>Piensa en la frase «edad de oro».</p>',
        solucion: '<p>La fuente dice que a menudo se afirma que la dinastía Tang fue la edad de oro de la literatura china, y que la poesía fue su forma más gloriosa.</p>' },
      { tipo: 'opciones', enunciado: `<p>¿Qué significa ${zh("左思右想", "zuǒ sī yòu xiǎng")}?</p>`,
        opciones: ['Mirar a la izquierda y a la derecha', 'Pensar una y otra vez', 'Escribir con las dos manos', 'Cambiar de idea de repente'], correcta: 1,
        pista: `<p>Mira los verbos que quedan en medio: ${zh("思", "sī")} y ${zh("想", "xiǎng")}.</p>`,
        solucion: `<p>El diccionario de modismos de Taiwán lo explica como «pensar una y otra vez». ${zh("左", "zuǒ")} y ${zh("右", "yòu")} no son direcciones aquí.</p>` },
      { tipo: 'ordenar', enunciado: `<p>Ordena los cuatro versos de ${zh("《静夜思》", "jìng yè sī")} para armar el poema.</p>`,
        respuesta: ['床前明月光', '疑是地上霜', '举头望明月', '低头思故乡'], pinyin: ['chuáng qián míng yuè guāng', 'yí shì dì shàng shuāng', 'jǔ tóu wàng míng yuè', 'dī tóu sī gù xiāng'], lang: 'zh-Hans',
        pista: '<p>Empieza con la luz de la luna ante la cama; el pueblo natal cierra el poema.</p>',
        solucion: '<p>Primero la luz de la luna, luego la escarcha que cree ver, después mira la luna y al final piensa en su pueblo natal.</p>' },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("朗读")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['lǎng dú'],
        pista: '<p>La primera sílaba baja y vuelve a subir; la segunda sube.</p>',
        solucion: `<p>${zh("朗读", "lǎngdú")}: <strong>lǎng dú</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("寂寞", "jìmò")}.</p>`,
        respuestas: ['soledad', 'sentirse solo', 'solo', 'sentirse sola', 'solitario', 'la soledad', 'sola'],
        pista: '<p>Es lo que se siente cuando no hay nadie cerca.</p>',
        solucion: `<p>${zh("寂寞", "jìmò")} es «soledad, sentirse solo».</p>` },
      { tipo: 'opciones', enunciado: `<p>Según East Asia Student, la rima de ${zh("《静夜思》", "jìng yè sī")} sigue el esquema AABA. ¿Qué verso es el que no rima con los demás?</p>`,
        opciones: ['El primero', 'El segundo', 'El tercero', 'El cuarto'], correcta: 2,
        pista: '<p>Mira las tres sílabas finales que se parecen: guāng, shuāng y xiāng.</p>',
        solucion: `<p>Terminan parecido los versos primero (${zh("光", "guāng")}), segundo (${zh("霜", "shuāng")}) y cuarto (${zh("乡", "xiāng")}). El tercero termina en ${zh("月", "yuè")}.</p>` },
    ],
    fuentes: [SILABO, MOE_ZSYX, NVCC, WIKISOURCE, EAST_ASIA, COLUMBIA],
  });

  // ------------------------------------------------------------------
  L('Dinastías de China: una línea de tiempo', {
    objetivo: `Leer una línea de tiempo con las dinastías de Qin a Qing, calcular cuánto duró una y repasar ${zh("于", "yú")}, ${zh("自…以来", "zì…yǐlái")} y ${zh("由…组成", "yóu…zǔchéng")} en frases escritas, con 15 palabras de historia.`,
    explicacion: `
      <p>Imagina un árbol de familia donde cada rama tiene un nombre y unas fechas. Así se cuenta la historia antigua de China: por dinastías. Antes de mirar la línea de tiempo, estas son las 15 palabras de la lección.</p>
      ${tabla([
        ['朝代', 'cháodài', 'dinastía, periodo histórico con nombre propio'], ['皇帝', 'huángdì', 'emperador'], ['大臣', 'dàchén', 'ministro, alto funcionario'], ['将军', 'jiāngjūn', 'general'], ['公元', 'gōngyuán', 'era común, años contados desde el año 1'],
        ['历经', 'lìjīng', 'pasar por, atravesar'], ['后代', 'hòudài', 'descendientes, generaciones siguientes'], ['古人', 'gǔrén', 'la gente de la antigüedad'], ['古迹', 'gǔjì', 'sitio histórico'], ['遗址', 'yízhǐ', 'lugar donde quedan restos de algo antiguo'],
        ['文物', 'wénwù', 'objeto con valor histórico'], ['考古', 'kǎogǔ', 'arqueología; hacer excavaciones'], ['文明', 'wénmíng', 'civilización'], ['起源', 'qǐyuán', 'origen; tener origen'], ['诞生', 'dànshēng', 'nacer, surgir'],
      ])}
      <h3>¿Cómo se cuentan los años?</h3>
      <p>Los años de nuestra era se dicen con ${zh("公元", "gōngyuán")}; para los años anteriores se agrega ${zh("前", "qián")}, y queda ${zh("公元前", "gōngyuán qián")}, «antes de nuestra era» (a. C.). Por ejemplo, ${zh("公元前221年", "gōngyuán qián 221 nián")} es el año 221 a. C.</p>
      <p class="nota"><strong>Trampa común:</strong> leer las fechas a. C. al revés. Como los años antes de nuestra era se cuentan hacia atrás, 221 a. C. va antes que 206 a. C., aunque 221 sea el número más grande.</p>
      <h3>La línea de tiempo</h3>
      <p>Las fechas son de la Universidad de Columbia (EE. UU.). Cada fila es una ${zh("朝代", "cháodài")}, y los nombres de las dinastías son cultura, así que se explican fuera de la tabla de palabras.</p>
      ${cuadro(['Dinastía', 'Años'], [
        [zh('秦', 'Qín'), '221 a. C. a 206 a. C.'], [zh('汉', 'Hàn'), '206 a. C. a 220 d. C.'], [zh('唐', 'Táng'), '618 a 906'], [zh('宋', 'Sòng'), '960 a 1279'], [zh('元', 'Yuán'), '1279 a 1368'], [zh('明', 'Míng'), '1368 a 1644'], [zh('清', 'Qīng'), '1644 a 1912'],
      ])}
      <p>Columbia da más detalles. La Han tuvo una parte occidental (206 a. C. a 9 d. C.) y una oriental (25 a 220). Entre la Tang y la Song hubo el periodo de las Cinco Dinastías, de 907 a 960. La Yuan fue el reinado del imperio mongol, y la Qing, una dinastía manchú. La línea llega hasta 1912, año en que empieza la etapa de la República.</p>
      <h3>Repaso: tres moldes para escribir historia</h3>
      <p>Los textos de historia son lengua escrita, y ahí aparecen tres piezas que ya viste. Las frases son de la lección. Primero ${zh("于", "yú")}, de «Preposiciones formales: ${zh("于", "yú")} y ${zh("至于", "zhìyú")}», que va antes de un tiempo: ${zh("明朝开始于1368年", "míngcháo kāishǐ yú 1368 nián")}, «la dinastía Ming empieza en 1368».</p>
      <p>Segundo, ${zh("自…以来", "zì…yǐlái")}, de «Ciudad y campo»: va como un sándwich alrededor de un punto de partida y dice «desde entonces hasta hoy»: ${zh("自公元618年以来，已经过去了一千多年", "zì gōngyuán 618 nián yǐlái, yǐjīng guòqù le yì qiān duō nián")}, «desde el año 618 han pasado más de mil años».</p>
      <p>Tercero, ${zh("由…组成", "yóu…zǔchéng")}, de la misma lección, que pone lo que forma algo entre sus dos piezas: ${zh("这段历史由七个朝代组成", "zhè duàn lìshǐ yóu qī gè cháodài zǔchéng")}, «esta etapa de la historia está formada por siete dinastías».</p>`,
    ejemplo: `
      <p>Quieres decir en chino cuánto duró la dinastía Ming. Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Busca las dos fechas en la línea de tiempo: empieza en 1368 y termina en 1644.</li>
        <li>Resta el año de inicio al año final, porque así sabes cuántos años pasaron: 1644 − 1368 = 276.</li>
        <li>Di cuándo empezó con ${zh("于", "yú")}: ${zh("明朝开始于1368年", "míngcháo kāishǐ yú 1368 nián")}.</li>
        <li>Agrega hasta cuándo llegó, con ${zh("到…为止", "dào…wéizhǐ")} de «Hasta: ${zh("到…为止", "dào…wéizhǐ")}», y la suma, con ${zh("一共", "yígòng")}, «en total»: ${zh("到1644年为止，一共276年", "dào 1644 nián wéizhǐ, yígòng 276 nián")}.</li>
      </ol>
      <p>Para comprobar, suma de vuelta: 1368 + 276 = 1644. Resultado: <span class="resultado">${zh("明朝开始于1368年，到1644年为止，一共276年", "míngcháo kāishǐ yú 1368 nián, dào 1644 nián wéizhǐ, yígòng 276 nián")} = «la dinastía Ming empezó en 1368, llegó hasta 1644 y duró 276 años en total»</span>.</p>
      <p class="nota"><strong>Error común:</strong> restar al revés, 1368 − 1644, y obtener un número negativo. Siempre va primero el año más reciente.</p>`,
    vidaReal: `
      <p>En un museo, el cartel de un objeto suele decir la dinastía y los años. Ahora puedes ubicarlo en la línea de tiempo y leer qué ${zh("朝代", "cháodài")} fue. Si visitas un ${zh("古迹", "gǔjì")} o un ${zh("遗址", "yízhǐ")}, entenderás que los ${zh("文物", "wénwù")} que ves los estudió la ${zh("考古", "kǎogǔ")}. Y si lees que algo se ${zh("诞生", "dànshēng")} en cierta época, sabrás sumar, restar y decir cuánto tiempo pasó.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según la tabla de Columbia, ¿qué dinastía duró de 960 a 1279?</p>',
        opciones: [zh('唐', 'Táng'), zh('宋', 'Sòng'), zh('元', 'Yuán'), zh('清', 'Qīng')], correcta: 1,
        pista: '<p>Va después del periodo de las Cinco Dinastías y antes de la Yuan.</p>',
        solucion: `<p>La ${zh("宋", "Sòng")} va de 960 a 1279. La ${zh("唐", "Táng")} fue de 618 a 906.</p>` },
      { tipo: 'numero', enunciado: '<p>¿Cuántos años duró la dinastía Tang, de 618 a 906?</p>',
        respuesta: 906 - 618,
        pista: '<p>Resta el año de inicio al año final.</p>',
        solucion: '<p>906 − 618 = 288 años.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «la dinastía Qing empieza en 1644».</p>',
        respuesta: ['清朝', '开始', '于', '1644年'], pinyin: ['qīngcháo', 'kāishǐ', 'yú', '1644 nián'], lang: 'zh-Hans',
        pista: '<p>Sujeto, verbo, la partícula escrita de tiempo y el año.</p>',
        solucion: `<p>${zh("清朝开始于1644年", "qīngcháo kāishǐ yú 1644 nián")}: la dinastía, el verbo, ${zh("于", "yú")} y la fecha.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("考古")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['kǎo gǔ'],
        pista: '<p>Las dos sílabas bajan y vuelven a subir.</p>',
        solucion: `<p>${zh("考古", "kǎogǔ")}: <strong>kǎo gǔ</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("文物", "wénwù")}.</p>`,
        respuestas: ['objeto historico', 'objetos historicos', 'reliquia', 'reliquias', 'objeto con valor historico', 'objeto antiguo', 'patrimonio cultural', 'pieza historica', 'objeto cultural'],
        pista: '<p>Es lo que ves en una vitrina de museo.</p>',
        solucion: `<p>${zh("文物", "wénwù")} es un «objeto con valor histórico».</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("这段历史由七个朝代组成", "zhè duàn lìshǐ yóu qī gè cháodài zǔchéng")}?</p>`,
        opciones: ['La historia viene de una dinastía', 'La historia tiene siete libros', 'Esta etapa de la historia está formada por siete dinastías', 'Siete etapas forman una dinastía'], correcta: 2,
        pista: `<p>Mira lo que va entre ${zh("由", "yóu")} y ${zh("组成", "zǔchéng")}.</p>`,
        solucion: `<p>${zh("由…组成", "yóu…zǔchéng")} pone lo que forma algo entre sus dos piezas: aquí, ${zh("七个朝代", "qī gè cháodài")}, «siete dinastías».</p>` },
    ],
    fuentes: [SILABO, COLUMBIA],
  });

  // ------------------------------------------------------------------
  L('Ideas de belleza en el arte tradicional', {
    objetivo: `Reconocer tres ideas de belleza del arte tradicional chino (el espacio vacío, la armonía con la naturaleza y el eje central), describir un objeto o una pintura con 15 palabras y repasar ${zh("-性", "xìng")}, ${zh("-化", "huà")} y ${zh("所", "suǒ")}.`,
    explicacion: `
      <p>Mira una taza, un abanico o el techo de un templo. Casi siempre puedes decir si te gusta o no, pero cuesta explicar por qué. Estas 15 palabras te dan con qué describirlo.</p>
      ${tabla([
        ['审美', 'shěnměi', 'apreciar lo bello; sentido de la belleza'], ['美观', 'měiguān', 'bonito a la vista'], ['精美', 'jīngměi', 'fino y bello'], ['精致', 'jīngzhì', 'delicado, hecho con cuidado'], ['对称', 'duìchèn', 'simétrico'],
        ['和谐', 'héxié', 'armonioso; armonía'], ['鲜艳', 'xiānyàn', 'de colores vivos'], ['朴素', 'pǔsù', 'sencillo, sin adornos'], ['造型', 'zàoxíng', 'forma que se le da a algo'], ['图案', "tú'àn", 'dibujo o diseño que se repite'],
        ['形态', 'xíngtài', 'aspecto, forma que tiene algo'], ['元素', 'yuánsù', 'elemento, pieza de un conjunto'], ['典型', 'diǎnxíng', 'típico, que representa bien a su clase'], ['迷人', 'mírén', 'encantador, que atrapa'], ['妙', 'miào', 'ingenioso, muy bueno'],
      ])}
      <h3>¿Cuánto importa lo que no se pinta?</h3>
      <p>El Museo de Arte de la Universidad de Princeton (EE. UU.) explica la pintura de paisaje de la dinastía Song. Dice que los artistas cuidaban tanto las zonas sin pintar como las detalladas: el <strong>espacio vacío</strong> es tan importante como el pintado. Por eso un hueco en una pintura no es un olvido.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que una pintura con mucho espacio vacío está «sin terminar». Según Princeton, ese espacio cuenta tanto como lo dibujado.</p>
      <h3>¿Qué relación hay con la naturaleza?</h3>
      <p>La misma fuente cuenta que, según el daoísmo, el ser humano debe aprender a vivir en armonía con la naturaleza, y que contemplar un paisaje permitía imaginar una conexión armoniosa con ella. Añade que en las pinturas de ${zh("山水画", "shānshuǐ huà")} la montaña es dura y firme, y el agua, suave y fluida. Son opuestos que se completan, un ejemplo del <strong>yin y yang</strong>.</p>
      <h3>¿Y en la arquitectura?</h3>
      <p>El Museo del Palacio (Pekín) describe la Ciudad Prohibida así: al entrar por el sur, el visitante ve una sucesión de salones y palacios repartidos a ambos lados del <strong>eje central</strong>. Los seis palacios del este y los seis del oeste están cada uno a su lado del eje principal. Con ${zh("对称", "duìchèn")} podemos nombrar esa idea; es una descripción de la lección, porque el museo no usa esa palabra.</p>
      <p>Otro dato del museo: el salón principal se llama ${zh("太和殿", "Tàihé Diàn")}, «Salón de la Armonía Suprema», y su nombre refleja el ideal de armonía universal. Es la misma palabra ${zh("和谐", "héxié")} de la tabla, vista en un edificio.</p>
      <h3>Repaso: tres piezas para describir</h3>
      <p>Las frases son de la lección. Con ${zh("所", "suǒ")}, de «La partícula ${zh("所", "suǒ")}», conviertes un verbo en «lo que se pinta»: ${zh("他所画的山水很迷人", "tā suǒ huà de shānshuǐ hěn mírén")}, «el paisaje que él pinta es encantador».</p>
      <p>Con ${zh("-化", "huà")}, de «Formar palabras: ${zh("超", "chāo")}, ${zh("反", "fǎn")}, ${zh("无", "wú")}, ${zh("化", "huà")} y ${zh("性", "xìng")}», sale un verbo de «volver algo así»: ${zh("我们把这个图案简化了", "wǒmen bǎ zhège tú'àn jiǎnhuà le")}, «simplificamos este diseño». Y con ${zh("-性", "xìng")} sale un nombre de cualidad: ${zh("老师说了和谐的重要性", "lǎoshī shuō le héxié de zhòngyàoxìng")}, «el maestro dijo la importancia de la armonía».</p>`,
    ejemplo: `
      <p>Tienes ante ti una pintura de montañas y agua, con zonas sin pintar. Quieres describirla en una frase. Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Mira primero qué ves: pocos colores, pocos adornos y mucho espacio libre. Para eso sirve ${zh("朴素", "pǔsù")}, «sencillo».</li>
        <li>Piensa qué sientes: el paisaje y el vacío se llevan bien. Esa sensación es ${zh("和谐", "héxié")}.</li>
        <li>Pon ${zh("很", "hěn")} delante de cada adjetivo: ${zh("很朴素", "hěn pǔsù")} y ${zh("很和谐", "hěn héxié")}.</li>
        <li>Une las dos ideas con ${zh("也", "yě")}, «también»: ${zh("这幅画很朴素，也很和谐", "zhè fú huà hěn pǔsù, yě hěn héxié")}.</li>
      </ol>
      <p>Para comprobar, lee la frase y mira que cada adjetivo tenga su ${zh("很", "hěn")} y que ${zh("也", "yě")} vaya antes del segundo. Resultado: <span class="resultado">${zh("这幅画很朴素，也很和谐", "zhè fú huà hěn pǔsù, yě hěn héxié")} = «esta pintura es sencilla y también armoniosa»</span>.</p>
      <p class="nota"><strong>Error común:</strong> quitar ${zh("很", "hěn")}, como en ${zh("这幅画朴素", "zhè fú huà pǔsù")}. Sin él, la frase suena a comparación, como si faltara «que otra».</p>`,
    vidaReal: `
      <p>En un museo, una tienda de objetos hechos a mano o una foto de un templo, ahora tienes palabras para decir qué ves. Puedes preguntar si un ${zh("图案", "tú'àn")} es ${zh("精致", "jīngzhì")} o ${zh("鲜艳", "xiānyàn")}, notar si un edificio es ${zh("对称", "duìchèn")} y decir que algo es ${zh("迷人", "mírén")} con más precisión que «bonito». Así, tu ${zh("审美", "shěnměi")} se vuelve algo que puedes explicar a otros.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según el Museo de Arte de Princeton, ¿qué papel tiene el espacio vacío en una pintura de paisaje de la dinastía Song?</p>',
        opciones: ['Es un error del pintor', 'Es tan importante como las zonas pintadas', 'Solo sirve para firmar la obra', 'Se llena después con color'], correcta: 1,
        pista: '<p>La fuente compara las zonas pintadas con las que no.</p>',
        solucion: '<p>Princeton dice que los artistas cuidaban tanto las zonas sin pintar como las detalladas: el espacio vacío es tan importante como el pintado.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según el Museo del Palacio, ¿cómo están repartidos los salones y palacios de la Ciudad Prohibida?</p>',
        opciones: ['Sin ningún orden', 'En círculo alrededor de un lago', 'A ambos lados de un eje central', 'Todos en una sola fila'], correcta: 2,
        pista: '<p>Piensa en un camino que entra por el sur y tiene edificios a cada lado.</p>',
        solucion: '<p>El museo dice que, al entrar por el sur, se ve una sucesión de salones y palacios repartidos a ambos lados del eje central.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «el paisaje que él pinta es encantador».</p>',
        respuesta: ['他', '所', '画', '的', '山水', '很', '迷人'], pinyin: ['tā', 'suǒ', 'huà', 'de', 'shānshuǐ', 'hěn', 'mírén'], lang: 'zh-Hans',
        pista: '<p>Primero quien pinta, luego la pieza que marca «lo que se pinta», y al final la descripción.</p>',
        solucion: `<p>${zh("他所画的山水很迷人", "tā suǒ huà de shānshuǐ hěn mírén")}: ${zh("他所画的", "tā suǒ huà de")} es «lo que él pinta», que describe a ${zh("山水", "shānshuǐ")}.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("对称")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['duì chèn'],
        pista: '<p>Las dos sílabas bajan de golpe.</p>',
        solucion: `<p>${zh("对称", "duìchèn")}: <strong>duì chèn</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("和谐", "héxié")}.</p>`,
        respuestas: ['armonia', 'armonioso', 'armoniosa', 'armonico', 'la armonia'],
        pista: '<p>Es cuando las partes se llevan bien entre sí.</p>',
        solucion: `<p>${zh("和谐", "héxié")} es «armonioso; armonía».</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("我们把这个图案简化了", "wǒmen bǎ zhège tú'àn jiǎnhuà le")}?</p>`,
        opciones: ['Hicimos el diseño más simple', 'Rompimos el diseño', 'Copiamos el diseño de otro', 'Pintamos el diseño de rojo'], correcta: 0,
        pista: `<p>${zh("-化", "huà")} sirve para «volver algo así», y ${zh("简化", "jiǎnhuà")} es «volver simple».</p>`,
        solucion: `<p>${zh("简化", "jiǎnhuà")} es «volver simple». Con ${zh("把", "bǎ")}, la frase dice qué se hizo con el diseño.</p>` },
    ],
    fuentes: [SILABO, PRINCETON, PALACIO, PALACIO_TAIHE],
  });

  // ------------------------------------------------------------------
  L('Dialectos y variedades del chino', {
    objetivo: `Explicar qué es un ${zh("方言", "fāngyán")}, nombrar las grandes variedades del chino y su relación con el ${zh("普通话", "pǔtōnghuà")}, y usar el molde ${zh("说这说那", "shuō zhè shuō nà")}, con 15 palabras para hablar de lenguas.`,
    explicacion: `
      <p>Un mexicano, un argentino y un español hablan español, pero cada uno dice algunas palabras y suena a su manera. Pasa algo parecido en China, y con diferencias más grandes. Estas son las 15 palabras de la lección.</p>
      ${tabla([
        ['方言', 'fāngyán', 'dialecto, variedad local de una lengua'], ['母语', 'mǔyǔ', 'lengua materna'], ['地域', 'dìyù', 'región, zona'], ['区分', 'qūfēn', 'distinguir, separar'], ['差异', 'chāyì', 'diferencia'],
        ['声调', 'shēngdiào', 'tono'], ['地道', 'dìdao', 'auténtico, como lo diría alguien del lugar'], ['交际', 'jiāojì', 'comunicarse y tratar con otros'], ['本土', 'běntǔ', 'local, del propio lugar'], ['通用', 'tōngyòng', 'de uso general'],
        ['相差', 'xiāngchà', 'diferir; haber distancia entre dos cosas'], ['移民', 'yímín', 'migrar; persona que migra'], ['来往', 'láiwǎng', 'ir y venir; tratarse'], ['交谈', 'jiāotán', 'conversar'], ['一带', 'yídài', 'zona, comarca'],
      ])}
      <h3>¿Qué es un dialecto?</h3>
      <p>La Universidad Jiao Tong de Shanghái (China, 2008) explica que un ${zh("方言", "fāngyán")} es una variante local de la lengua, la que se habla en cierta ${zh("地域", "dìyù")}. La lengua común es el ${zh("普通话", "pǔtōnghuà")}, y las ${zh("差异", "chāyì")} con los dialectos están sobre todo en la pronunciación, con algunas en el vocabulario y la gramática. Las causas son las montañas y los ríos que separaban a la gente, el transporte difícil y las migraciones. La base del ${zh("普通话", "pǔtōnghuà")} es el dialecto del norte, llamado ${zh("官话", "guānhuà")}.</p>
      <h3>¿Cuáles son las grandes variedades?</h3>
      <p>Según la Universidad Normal de Henan (China, 2010), entre los han hay siete grandes zonas dialectales. La del norte la habla cerca del 70 % de los han. La Universidad Jiao Tong ubica las demás:</p>
      <ul>
        <li>El ${zh("吴语", "Wúyǔ")} (Wu) se habla en Shanghái, el sureste de Jiangsu y Zhejiang.</li>
        <li>El ${zh("粤语", "Yuèyǔ")} (yue, o cantonés) se habla en el delta del río de las Perlas, en Guangdong y Guangxi.</li>
        <li>El ${zh("闽语", "Mǐnyǔ")} (min) se habla en Fujian, Taiwán, Hainan y partes del este de Guangdong.</li>
        <li>El ${zh("湘语", "Xiāngyǔ")} (xiang) se habla en el centro de Hunan, y el ${zh("赣语", "Gànyǔ")} (gan), en Jiangxi y zonas vecinas.</li>
        <li>El ${zh("客家", "Kèjiā")} (hakka) se habla en el este de Guangdong, el oeste de Fujian, el sureste de Jiangxi y el sur de Guangxi.</li>
      </ul>
      <h3>¿Se entienden entre sí?</h3>
      <p>Kenyon College (EE. UU.) dice que el chino hablado reúne muchas variedades regionales y que, aunque comparten una <strong>escritura común</strong>, muchas no se entienden entre sí al hablar. Una misma palabra puede sonar distinta en mandarín y en cantonés, pero se escribe igual en los dos. Por eso, si no entiendes cómo habla alguien, a veces basta con escribirlo.</p>
      <h3>Repaso: ${zh("至于", "zhìyú")} y el molde ${zh("A这A那", "A zhè A nà")}</h3>
      <p>Con ${zh("至于", "zhìyú")}, de «Preposiciones formales: ${zh("于", "yú")} y ${zh("至于", "zhìyú")}», pasas a otro tema: ${zh("至于粤语，我知道得不多", "zhìyú Yuèyǔ, wǒ zhīdào de bù duō")}, «en cuanto al cantonés, sé poco». La frase es de la lección.</p>
      <p>El sílabo de nivel 6 lista entre los <strong>${zh("四字格", "sì zì gé")}</strong> el molde ${zh("A这A那", "A zhè A nà")}. No encontré una regla de uso; lo que sigue es una simplificación de la lección. Se repite un verbo, una vez con ${zh("这", "zhè")}, «esto», y otra con ${zh("那", "nà")}, «aquello». Dice que hacemos lo mismo con cosas varias: ${zh("说这说那", "shuō zhè shuō nà")}, «hablar de esto y de aquello», o sea, de todo un poco.</p>
      <p class="nota"><strong>Trampa común:</strong> decir solo ${zh("说这", "shuō zhè")} y pensar que ya es el molde. Hacen falta las dos mitades, con el mismo verbo repetido.</p>`,
    ejemplo: `
      <p>Quieres decir que, cuando tus amigos se reúnen, hablan de todo un poco. Vamos paso a paso.</p>
      <ol class="pasos-ej">
        <li>Elige el verbo de la acción, que se repetirá: ${zh("说", "shuō")}, «hablar».</li>
        <li>Pon ${zh("这", "zhè")} después del primero: ${zh("说这", "shuō zhè")}, «hablar de esto».</li>
        <li>Repite el verbo y cierra con ${zh("那", "nà")}: ${zh("说这说那", "shuō zhè shuō nà")}. Así dices que no hablan de un solo tema.</li>
        <li>Pon el molde en una frase con ${zh("交谈", "jiāotán")}, «conversar»: ${zh("朋友们在一起，交谈起来，说这说那", "péngyoumen zài yìqǐ, jiāotán qǐlái, shuō zhè shuō nà")}.</li>
      </ol>
      <p>Para comprobar, mira que el verbo aparezca dos veces y que ${zh("这", "zhè")} vaya con el primero y ${zh("那", "nà")} con el segundo. Resultado: <span class="resultado">${zh("朋友们在一起，交谈起来，说这说那", "péngyoumen zài yìqǐ, jiāotán qǐlái, shuō zhè shuō nà")} = «cuando los amigos están juntos, empiezan a conversar y hablan de todo un poco»</span>.</p>
      <p class="nota"><strong>Error común:</strong> cambiar el verbo en la segunda mitad, como ${zh("说这想那", "shuō zhè xiǎng nà")}. En este molde se repite el mismo verbo.</p>`,
    vidaReal: `
      <p>Si algún día oyes a alguien hablar y no lo entiendes, ya sabes que puede ser otra variedad: su ${zh("声调", "shēngdiào")} y su vocabulario pueden ser distintos. Sabrás que la ${zh("差异", "chāyì")} está sobre todo en la pronunciación, y que la escritura común ayuda a comunicarse. También entenderás por qué una persona ${zh("移民", "yímín")} puede conservar su ${zh("母语", "mǔyǔ")} y aprender el ${zh("普通话", "pǔtōnghuà")} para el trato diario.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: `<p>Según la Universidad Jiao Tong de Shanghái, ¿en qué se notan sobre todo las diferencias entre los dialectos y el ${zh("普通话", "pǔtōnghuà")}?</p>`,
        opciones: ['En la forma de escribir los caracteres', 'En el número de hablantes', 'En el clima de cada zona', 'En la pronunciación'], correcta: 3,
        pista: '<p>Piensa en lo que oyes cuando alguien habla.</p>',
        solucion: '<p>La fuente dice que las diferencias están sobre todo en la pronunciación, y que también hay algunas en el vocabulario y la gramática.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Kenyon College, ¿qué tienen en común las variedades del chino hablado?</p>',
        opciones: ['Una forma escrita común', 'La misma pronunciación', 'Los mismos tonos en todas', 'Una región donde nacieron todas'], correcta: 0,
        pista: '<p>La fuente dice que muchas no se entienden al hablar, pero comparten otra cosa.</p>',
        solucion: '<p>Kenyon dice que comparten una forma escrita común, aunque muchas variedades no se entiendan entre sí al hablar.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «hablamos un buen rato».</p>',
        respuesta: ['我们', '交谈', '了', '很长时间'], pinyin: ['wǒmen', 'jiāotán', 'le', 'hěn cháng shíjiān'], lang: 'zh-Hans',
        pista: '<p>Sujeto, verbo, la partícula del pasado y cuánto tiempo.</p>',
        solucion: `<p>${zh("我们交谈了很长时间", "wǒmen jiāotán le hěn cháng shíjiān")}: sujeto, verbo, ${zh("了", "le")} y la duración.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("声调")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['shēng diào'],
        pista: '<p>La primera sílaba empieza alta y se mantiene; la segunda baja de golpe.</p>',
        solucion: `<p>${zh("声调", "shēngdiào")}: <strong>shēng diào</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("方言", "fāngyán")}.</p>`,
        respuestas: ['dialecto', 'dialectos', 'variedad local', 'variedad regional', 'variante local', 'variante regional', 'variedad', 'lengua regional'],
        pista: '<p>Es la forma de hablar propia de una zona.</p>',
        solucion: `<p>${zh("方言", "fāngyán")} es «dialecto, variedad local de una lengua».</p>` },
      { tipo: 'opciones', enunciado: `<p>¿Qué quiere decir ${zh("他喜欢买这买那", "tā xǐhuan mǎi zhè mǎi nà")}?</p>`,
        opciones: ['Compra solo una cosa', 'Le gusta comprar de todo un poco', 'No quiere comprar nada', 'Compra algo para otra persona'], correcta: 1,
        pista: `<p>Mira el verbo repetido, una vez con ${zh("这", "zhè")} y otra con ${zh("那", "nà")}.</p>`,
        solucion: `<p>${zh("买这买那", "mǎi zhè mǎi nà")} repite el verbo con ${zh("这", "zhè")} y ${zh("那", "nà")}: «comprar esto y aquello», o sea, de todo un poco.</p>` },
    ],
    fuentes: [SILABO, SJTU, HENAN, KENYON, ALLSET_330],
  });

  // ------------------------------------------------------------------
  L('Leer un artículo', {
    objetivo: `Leer un artículo corto en chino con una estrategia (título, primera línea, conectores, preguntas), reconocer ${zh("然而", "rán'ér")} y ${zh("由于…因此", "yóuyú…yīncǐ")} en lengua escrita, y entender 15 palabras de libros y textos.`,
    explicacion: `
      <p>Abres un artículo y ves una pared de texto. ¿Por dónde empiezas? Leer cada palabra de corrido cansa y se pierde el hilo. Primero, las 15 palabras de la lección.</p>
      ${tabla([
        ['要点', 'yàodiǎn', 'punto clave'], ['结尾', 'jiéwěi', 'final de un texto'], ['开头', 'kāitóu', 'comienzo'], ['目录', 'mùlù', 'índice'], ['简介', 'jiǎnjiè', 'presentación breve'],
        ['系列', 'xìliè', 'serie'], ['思路', 'sīlù', 'cómo se encadenan las ideas'], ['线索', 'xiànsuǒ', 'pista, hilo de una historia'], ['解读', 'jiědú', 'interpretar, explicar el sentido'], ['书籍', 'shūjí', 'libros'],
        ['文献', 'wénxiàn', 'documentos para consultar'], ['引', 'yǐn', 'citar; atraer'], ['题材', 'tícái', 'tema de una obra'], ['情节', 'qíngjié', 'trama, lo que va pasando'], ['版本', 'bǎnběn', 'edición, versión'],
      ])}
      <h3>¿Qué haces antes de leer?</h3>
      <p>La Universidad McGill (Canadá) da varias estrategias que sirven en cualquier idioma. Antes de leer, ojea el texto: mira los encabezados, las imágenes, las palabras en negrita y la primera línea de cada párrafo, para ver el panorama. Lee el título para entender de qué trata en general y pregúntate qué esperas que diga. Convierte las palabras clave en preguntas que guíen tu lectura, y lee la conclusión para saber qué pregunta intentan responder los autores.</p>
      <p>Ya leyendo, McGill propone parar tras cada párrafo y <strong>parafrasear</strong>, es decir, decir con tus palabras lo que acabas de leer. Así evitas empezar mal y releer la misma frase una y otra vez.</p>
      <p class="nota"><strong>Trampa común:</strong> empezar por la primera palabra y no parar hasta el final. Ojear primero y parafrasear después te ahorra releer.</p>
      <h3>¿Qué dicen los conectores?</h3>
      <p>Un <strong>conector</strong> es una palabra que une dos ideas y dice cómo se relacionan. Dartmouth explica ${zh("然而", "rán'ér")}:
      une frases y abre la parte principal, que es de sentido opuesto a la anterior. Es parecido a ${zh("但是", "dànshì")} en significado y uso, pero se ve más en textos escritos. Dartmouth también dice que, tras ${zh("由于", "yóuyú")}, la cláusula siguiente suele llevar ${zh("所以", "suǒyǐ")} o ${zh("因此", "yīncǐ")}, que marcan la consecuencia. En un artículo,
      ${zh("然而", "rán'ér")} te avisa de un contraste, y ${zh("由于", "yóuyú")} te avisa de que viene una causa y, después, su efecto.</p>
      <h3>Un artículo para practicar</h3>
      <p>El siguiente texto es inventado para la lección y usa solo palabras que ya conoces. Lee el título y la primera frase antes que el resto.</p>
      <p>${zh("学校图书馆", "xuéxiào túshūguǎn")}</p>
      <p>${zh("学校图书馆里有很多书。", "xuéxiào túshūguǎn lǐ yǒu hěn duō shū.")} ${zh("同学们可以在那里看书，也可以借书。", "tóngxuémen kěyǐ zài nàlǐ kàn shū, yě kěyǐ jiè shū.")} ${zh("然而，借书的人不多。", "rán'ér, jiè shū de rén bù duō.")} ${zh("由于大家喜欢玩手机，因此很多书没有人看。", "yóuyú dàjiā xǐhuan wán shǒujī, yīncǐ hěn duō shū méiyǒu rén kàn.")} ${zh("图书馆想做一个读书活动，让更多的同学喜欢看书。", "túshūguǎn xiǎng zuò yī gè dúshū huódòng, ràng gèng duō de tóngxué xǐhuan kàn shū.")}</p>
      <p>Si quieres practicar más con esto en español, mira en Lectura las lecciones "Idea principal e ideas secundarias" y "Hacer un resumen".</p>`,
    ejemplo: `
      <p>Vamos a leer el artículo de arriba con la estrategia. Cada paso dice qué haces y por qué.</p>
      <ol class="pasos-ej">
        <li>Lee el título, ${zh("学校图书馆", "xuéxiào túshūguǎn")}, y pregúntate qué esperas: algo sobre la biblioteca de una escuela.</li>
        <li>Lee la primera frase: dice que hay muchos libros. Es el punto de partida.</li>
        <li>Busca los conectores, que te dan la forma del texto: ${zh("然而", "rán'ér")} anuncia un contraste (pocos piden libros), y ${zh("由于", "yóuyú")} con ${zh("因此", "yīncǐ")} dan la causa (el celular) y su efecto (muchos libros sin lectores).</li>
        <li>Mira el final: la biblioteca quiere hacer una actividad para que se lea más.</li>
        <li>Parafrasea: «la escuela tiene libros, pocos los piden porque prefieren el celular, y la biblioteca quiere cambiarlo».</li>
      </ol>
      <p>Para comprobar, ve si tu resumen responde las preguntas del título. Resultado: <span class="resultado">tema, contraste, causa y plan, en cuatro ideas.</span></p>
      <p class="nota"><strong>Error común:</strong> tomar el contraste como la idea principal. ${zh("然而", "rán'ér")} abre una parte importante, pero la idea central está en el título y en la conclusión.</p>`,
    vidaReal: `
      <p>Cuando te topes con un texto largo en chino, no tienes que entender todo para sacarle provecho. Mira el ${zh("开头", "kāitóu")} y el ${zh("结尾", "jiéwěi")}, busca el ${zh("目录", "mùlù")} o la ${zh("简介", "jiǎnjiè")}, y localiza los conectores. Con eso ya sigues el ${zh("思路", "sīlù")} del autor y detectas los ${zh("要点", "yàodiǎn")}. Esa misma estrategia te sirve con ${zh("书籍", "shūjí")} y artículos en español, o en cualquier otro idioma.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según McGill, ¿para qué conviene parar tras cada párrafo y decir con tus palabras lo leído?</p>',
        opciones: ['Para memorizar el texto letra por letra', 'Para terminar más rápido sin pensar', 'Para evitar empezar mal y releer la misma frase muchas veces', 'Para saltarse el título'], correcta: 2,
        pista: '<p>Piensa en qué pasa cuando lees sin procesar lo que lees.</p>',
        solucion: '<p>McGill dice que procesar la lectura y decirla con tus palabras evita falsos comienzos, como releer la misma frase una y otra vez.</p>' },
      { tipo: 'opciones', enunciado: `<p>En el artículo de la lección, ¿por qué hay muchos libros sin lectores?</p>`,
        opciones: ['Porque a muchos les gusta más el celular', 'Porque la biblioteca está cerrada', 'Porque cuestan mucho', 'Porque los libros son muy viejos'], correcta: 0,
        pista: `<p>Busca ${zh("由于", "yóuyú")} y lee lo que viene después.</p>`,
        solucion: `<p>El texto dice ${zh("由于大家喜欢玩手机，因此很多书没有人看", "yóuyú dàjiā xǐhuan wán shǒujī, yīncǐ hěn duō shū méiyǒu rén kàn")}: la causa es que a muchos les gusta el celular.</p>` },
      { tipo: 'opciones', enunciado: '<p>Quieres unir «hay muchos libros» con «pocos los piden», que son ideas opuestas. ¿Qué conector escrito usas?</p>',
        opciones: [zh('因此', 'yīncǐ'), zh('由于', 'yóuyú'), zh('也', 'yě'), zh('然而', "rán'ér")], correcta: 3,
        pista: '<p>Busca el conector que anuncia un contraste.</p>',
        solucion: `<p>${zh("然而", "rán'ér")} abre una parte de sentido opuesto a la anterior, como ${zh("但是", "dànshì")} pero más escrito.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «como hace mal tiempo, no fuimos».</p>',
        respuesta: ['由于', '天气不好', '，因此', '我们', '没去'], pinyin: ['yóuyú', 'tiānqì bù hǎo', ', yīncǐ', 'wǒmen', 'méi qù'], lang: 'zh-Hans',
        pista: '<p>Primero la causa con su conector, luego el efecto con el suyo.</p>',
        solucion: `<p>${zh("由于天气不好，因此我们没去", "yóuyú tiānqì bù hǎo, yīncǐ wǒmen méi qù")}: la causa va con ${zh("由于", "yóuyú")}, y la consecuencia empieza con ${zh("因此", "yīncǐ")}.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("开头")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['kāi tóu'],
        pista: '<p>La primera sílaba empieza alta y se mantiene; la segunda sube.</p>',
        solucion: `<p>${zh("开头", "kāitóu")}: <strong>kāi tóu</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("目录", "mùlù")}.</p>`,
        respuestas: ['indice', 'el indice', 'tabla de contenido', 'tabla de contenidos', 'contenido', 'lista de contenidos'],
        pista: '<p>Es la lista al principio de un libro que dice dónde está cada parte.</p>',
        solucion: `<p>${zh("目录", "mùlù")} es el «índice» de un libro.</p>` },
    ],
    fuentes: [SILABO, MCGILL, DART_22, DART_20],
  });

  // ------------------------------------------------------------------
  L('Escribir un texto de opinión', {
    objetivo: `Armar un texto de opinión con tesis, razones con pruebas, un contraargumento y una conclusión, usar los conectores que ya conoces y entender 15 palabras para discutir ideas.`,
    explicacion: `
      <p>Un amigo te pregunta qué opinas de algo. Decir «me gusta» o «no me gusta» no alcanza: para convencer hay que dar razones. Esas son las 15 palabras de la lección.</p>
      ${tabla([
        ['主张', 'zhǔzhāng', 'sostener; idea que se defiende'], ['立场', 'lìchǎng', 'postura, punto de vista'], ['理性', 'lǐxìng', 'razonable; razón'], ['片面', 'piànmiàn', 'que mira solo una parte'], ['质疑', 'zhìyí', 'poner en duda'],
        ['争议', 'zhēngyì', 'polémica; discutir'], ['争论', 'zhēnglùn', 'discutir, debatir'], ['赞同', 'zàntóng', 'estar de acuerdo'], ['认定', 'rèndìng', 'dar algo por cierto'], ['首要', 'shǒuyào', 'lo más importante'],
        ['要素', 'yàosù', 'elemento necesario'], ['层面', 'céngmiàn', 'nivel, aspecto'], ['借鉴', 'jièjiàn', 'aprender de un ejemplo'], ['探讨', 'tàntǎo', 'examinar un tema con calma'], ['回顾', 'huígù', 'mirar atrás, repasar'],
      ])}
      <h3>¿Qué lleva un texto de opinión?</h3>
      <p>Tres universidades de EE. UU. (Illinois, Texas A&M y Carolina del Norte) coinciden: un argumento es una idea principal, la <strong>tesis</strong>, apoyada con pruebas. Texas A&M dice que la tesis suele llamarse «afirmación» y toma postura sobre un tema discutible. Cada párrafo del cuerpo trata una sola idea, se conecta con la tesis y explica cómo y por qué la prueba la apoya (Illinois).</p>
      <p>El chino tiene sus propios nombres. La Oficina de Educación de Hong Kong dice que el texto de opinión, ${zh("议论文", "yìlùnwén")}, tiene tres elementos: el ${zh("论点", "lùndiǎn")}, la idea central; los ${zh("论据", "lùnjù")}, las pruebas que la sostienen; y el ${zh("论证", "lùnzhèng")}, el proceso de usar las pruebas para explicar la idea. Los tres eslabones no pueden faltar. Debe haber un solo ${zh("论点", "lùndiǎn")} central, con postura clara, y cada párrafo lleva una ${zh("主题句", "zhǔtíjù")}, una oración que muestra su idea principal.</p>
      <h3>¿Y si alguien piensa distinto?</h3>
      <p>Texas A&M dice que una afirmación sólida tiene al menos un <strong>contraargumento</strong> válido: una postura opuesta igual de sensata. UNC añade que anticiparlo refuerza tu argumento, y que puedes aceptar que el otro tiene algo de razón, o rechazarlo y explicar por qué se equivoca. Al resumirlo, hay que ser justo con él.</p>
      <p>Para cerrar, Illinois pide una conclusión que no repita la tesis tal cual: la retoma a la luz de las pruebas. Hong Kong cuenta que el chino tradicional lo llama ${zh("起承转合", "qǐ chéng zhuǎn hé")}: inicio, desarrollo, giro y cierre, equivalentes al párrafo de introducción, los de transición y el de conclusión.</p>
      <p class="nota"><strong>Trampa común:</strong> presentar un contraargumento tan débil que sea fácil de vencer. UNC pide presentarlo con justicia.</p>
      <h3>Un modelo con conectores</h3>
      <p>El texto es inventado para la lección, con un tema neutro. Cada línea trae el conector de su parte.</p>
      ${cuadro(['Parte', 'Texto'], [
        ['Tesis', zh('我主张学校每天都要有读书时间。', 'wǒ zhǔzhāng xuéxiào měi tiān dōu yào yǒu dúshū shíjiān.')],
        ['Primera razón', zh('首先，读书可以让我们学到很多新东西。', 'shǒuxiān, dúshū kěyǐ ràng wǒmen xuédào hěn duō xīn dōngxi.')],
        ['Segunda razón', zh('其次，每天读书会让大家有好习惯。', 'qícì, měi tiān dúshū huì ràng dàjiā yǒu hǎo xíguàn.')],
        ['Contraargumento', zh('有人说，学生的时间很少。', 'yǒu rén shuō, xuésheng de shíjiān hěn shǎo.')],
        ['Respuesta', zh('然而，读书时间不长，因此大家都有时间。', "rán'ér, dúshū shíjiān bù cháng, yīncǐ dàjiā dōu yǒu shíjiān.")],
        ['Conclusión', zh('因此，每天读书对大家都好。', 'yīncǐ, měi tiān dúshū duì dàjiā dōu hǎo.')],
      ])}
      <p>Para practicar con más detalle, mira en Lectura las lecciones "Hechos y opiniones" y "Cómo se construye un argumento".</p>
      <h3>Lo que ya sabes hacer</h3>
      <p>Con esta lección terminas HSK 6 y toda la materia. Ya puedes leer poemas, ubicar dinastías, hablar de belleza y de variedades del chino, y seguir y escribir textos con argumentos. En cada lección viste una selección de palabras, no toda la lista; el <a href="${encodeURI(SILABO.url)}">sílabo</a> completo sigue ahí para seguir explorando.</p>`,
    ejemplo: `
      <p>Vamos a descomponer el modelo de arriba para ver qué hace cada parte.</p>
      <ol class="pasos-ej">
        <li>Lee la primera línea: es la tesis. Dice qué defiende el autor y toma postura, porque empieza con ${zh("我主张", "wǒ zhǔzhāng")}, «yo sostengo».</li>
        <li>Mira las dos razones: ${zh("首先", "shǒuxiān")} y ${zh("其次", "qícì")} las ordenan, «primero» y «segundo». Cada una apoya la tesis con una idea distinta.</li>
        <li>Busca el contraargumento: ${zh("有人说", "yǒu rén shuō")}, «hay quien dice», presenta la objeción sin burlarse de ella.</li>
        <li>Mira la respuesta: ${zh("然而", "rán'ér")} cambia de dirección y ${zh("因此", "yīncǐ")} saca la consecuencia, que el tiempo alcanza.</li>
        <li>Lee el cierre: con ${zh("因此", "yīncǐ")}, retoma la idea a la luz de lo dicho, sin copiar la tesis.</li>
      </ol>
      <p>Para comprobar, mira que cada razón responda a la tesis. Resultado: <span class="resultado">tesis, dos razones, contraargumento con respuesta y conclusión.</span></p>
      <p class="nota"><strong>Error común:</strong> terminar con la misma frase del inicio. La conclusión debe sumar algo: lo que las razones demostraron.</p>`,
    vidaReal: `
      <p>Cuando te pidan tu opinión, en clase, en un grupo de mensajes o en un comentario, estos pasos te ayudan a ordenarla: una tesis clara, razones con pruebas y una respuesta a quien piensa distinto. También sirven para leer: al encontrar una ${zh("主张", "zhǔzhāng")}, puedes preguntarte cuál es la ${zh("立场", "lìchǎng")} del autor, qué pruebas da y si escucha otras ideas antes de cerrar su texto.</p>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>Según la Universidad de Illinois, ¿cómo debe ser la conclusión de un texto de opinión?</p>',
        opciones: ['Debe repetir la tesis palabra por palabra', 'Debe retomar la tesis a la luz de las pruebas dadas', 'Debe introducir una tesis nueva', 'Debe quedar vacía'], correcta: 1,
        pista: '<p>La fuente dice qué no debe hacer: copiar la tesis.</p>',
        solucion: '<p>Illinois pide una conclusión que no repita la tesis, sino que la retome a la luz de las pruebas.</p>' },
      { tipo: 'opciones', enunciado: `<p>En un ${zh("议论文", "yìlùnwén")}, ¿qué son los ${zh("论据", "lùnjù")}?</p>`,
        opciones: ['La idea central', 'El título del texto', 'Las pruebas que sostienen la idea central', 'La despedida'], correcta: 2,
        pista: `<p>Son uno de los tres elementos: ${zh("论点", "lùndiǎn")} es la idea; ${zh("论据", "lùnjù")} es lo que la apoya.</p>`,
        solucion: `<p>Hong Kong define los ${zh("论据", "lùnjù")} como los materiales y bases que prueban el ${zh("论点", "lùndiǎn")}. Sin ellos, la idea no convence.</p>` },
      { tipo: 'ordenar', enunciado: '<p>Ordena las partes de un texto de opinión.</p>',
        respuesta: ['Tesis', 'Razones con pruebas', 'Contraargumento y respuesta', 'Conclusión'],
        pista: '<p>Se empieza con la idea que se defiende y se termina cerrando.</p>',
        solucion: '<p>Primero la tesis, luego las razones con pruebas, después el contraargumento con su respuesta, y al final la conclusión.</p>' },
      { tipo: 'ordenar', enunciado: '<p>Ordena las piezas para decir «primero, leer nos deja aprender cosas nuevas».</p>',
        respuesta: ['首先，', '读书', '可以让我们', '学到很多新东西'], pinyin: ['shǒuxiān,', 'dúshū', 'kěyǐ ràng wǒmen', 'xuédào hěn duō xīn dōngxi'], lang: 'zh-Hans',
        pista: '<p>El conector que ordena va primero; luego, el tema.</p>',
        solucion: `<p>${zh("首先，读书可以让我们学到很多新东西", "shǒuxiān, dúshū kěyǐ ràng wǒmen xuédào hěn duō xīn dōngxi")}: conector, tema, «nos deja» y lo que se aprende.</p>` },
      { tipo: 'pinyin', enunciado: `<p>Escribe el pinyin de ${zh("立场")} con sus marcas de tono (separa las sílabas con un espacio).</p>`,
        respuestas: ['lì chǎng'],
        pista: '<p>La primera sílaba baja de golpe; la segunda baja y sube.</p>',
        solucion: `<p>${zh("立场", "lìchǎng")}: <strong>lì chǎng</strong>.</p>` },
      { tipo: 'texto', enunciado: `<p>Escribe en español qué significa ${zh("争论", "zhēnglùn")}.</p>`,
        respuestas: ['discutir', 'debatir', 'debate', 'discusion', 'discusión', 'polemizar', 'disputar', 'discute', 'debaten'],
        pista: '<p>Es lo que hacen dos personas que defienden ideas distintas.</p>',
        solucion: `<p>${zh("争论", "zhēnglùn")} es «discutir, debatir».</p>` },
    ],
    fuentes: [SILABO, ILLINOIS, TEXAS, UNC, HK, MOE_LUNDIAN, MOE_LUNJU, MOE_LUNZHENG],
  });
})();
