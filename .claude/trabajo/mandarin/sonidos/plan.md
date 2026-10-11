# Plan: Mandarín · Unidad 1: HSK 1 · Sonidos y escritura

- Materia: `mandarin`. Archivo destino: `lecciones/mandarin/sonidos.js`. 7 lecciones, un constructor.
- Reglas: `.claude/docs/materias/mandarin.md`, `contenido.md`, `formato-leccion.md` (punto 10: `zh()`, `pinyin`, `ordenar`, `escucha`).
- Esta unidad enseña el sistema (sonidos, tonos, trazos, radicales), no vocabulario. Las palabras de ejemplo salen de la lista de nivel 1 del sílabo. Excepción única: las sílabas de demostración de tonos (má 麻, mǎ 马, mà 骂) y los nombres de los trazos, que se presentan como ejemplos y no como palabras por aprender.
- El sílabo HSK no trae fonética ni trazos: para eso hacen falta otras fuentes (ver cada dato).

## Reglas de la lista de datos
- La lista es cerrada: el investigador busca estos datos y nada más. Un número es un dato y una cita.
- "(opcional)": si no aparece, se omite sin problema. Lo demás, si no aparece, se reporta "no encontrado". Nunca se acepta una cita parecida.
- Antes de escribir una cita, se busca en la caché de `citas.js` (`$TMPDIR/citas-cache/<sha1 de la URL>.json`, campo `texto`) y se copia de ahí.
- Palabras del sílabo: una línea por palabra, copiada tal cual (`> 147 1 你好 nǐ hǎo`).
- Fuentes abreviadas abajo: **Sílabo** = «HSK 考试大纲» 2025 (URL en `fuentes.md`). **Esquema** = 汉语拼音方案 (Ministerio de Educación de China, moe.gov.cn) u otra copia oficial. **Univ.** = material abierto de una universidad o Instituto Confucio o Cervantes. **Wikipedia** solo de apoyo, nunca única para una cifra.

## Reparto de la investigación (3 investigadores en paralelo)
- Investigador A → `ficha-a.md`, fuentes F1 a F19: lecciones 1, 2 y 3 (D1 a D22).
- Investigador B → `ficha-b.md`, fuentes F20 a F39: lecciones 4, 5, 6 y 7 (D23 a D44).
- Investigador C → `ficha-c.md`, fuentes F40 a F49: grabaciones (A1 a A4).
- El Director las une en `ficha.md` y corre `citas.js`.

---

## 1. Qué es el mandarín y cómo se escribe
- Términos nuevos: **mandarín**, **carácter**, **pinyin**.
- Idea central: el chino se escribe con caracteres, que no son letras: cada uno es una sílaba con significado. El pinyin es la forma oficial de escribir cómo suenan, con letras latinas y una marca de tono.
- Visual: tabla «una palabra, tres caras» (caracteres, pinyin, significado) con 4 palabras de nivel 1 y su botón de audio.
- Ejemplo resuelto: leer 你好 paso a paso: dos caracteres, dos sílabas, cada una con su marca de tono, un significado.
- Vida real: reconocer letreros y nombres, escribir chino en el teclado con pinyin.
- Ejercicios: `opciones` (qué es el pinyin, cuántas sílabas tiene una palabra de 2 caracteres), `numero` (palabras del nivel 1), `opciones` con `escucha`.
- Remisiones: ninguna.
- Datos:
  - D1: el mandarín estándar (普通话, pǔtōnghuà) es la lengua oficial común de China. Fuente: ley de lengua común de China (gov.cn) o Univ.
  - D2: número de hablantes de chino mandarín, con año. Fuente: ONU, Instituto Cervantes o Univ. (opcional)
  - D3: el chino es uno de los seis idiomas oficiales de la ONU. Fuente: un.org/es.
  - D4: un carácter chino representa una sílaba con significado, no un sonido suelto como una letra. Fuente: Univ.
  - D5: caracteres simplificados y tradicionales: qué son y dónde se usa cada uno. Fuente: Univ. o Wikipedia más otra.
  - D6: el pinyin fue aprobado en China en 1958 como sistema oficial de escritura con letras latinas. Fuente: Esquema o gov.cn.
  - D7: la norma ISO 7098 adopta el pinyin para romanizar el chino. Fuente: iso.org. (opcional)
  - D8: el sílabo HSK se publicó en noviembre de 2025 y rige desde julio de 2026. Fuente: Sílabo (portada).
  - D9: el nivel 1 del HSK pide 300 palabras; cita de la última línea de nivel 1 de la lista (número 300). Fuente: Sílabo.
  - D10: líneas del sílabo de 中国, 中文, 汉语, 汉字 y 你好. Fuente: Sílabo.

## 2. Pinyin: iniciales
- Términos nuevos: **sílaba**, **inicial**, **final**.
- Idea central: cada sílaba se arma con una inicial (el sonido con que empieza), una final (el resto) y un tono. Hay 21 iniciales; varias se escriben como letras del español pero suenan distinto.
- Visual: tabla de las 21 iniciales en grupos (b p m f · d t n l · g k h · j q x · zh ch sh r · z c s), cada una con una sílaba de ejemplo y audio.
- Ejemplo resuelto: separar la sílaba de 爸 (bà) en inicial b, final a y tono; comparar b con p poniendo la mano frente a la boca.
- Vida real: leer bien nombres como Beijing, Xi'an o Zhang.
- Ejercicios: `opciones` (cuál es la inicial), `opciones` con `escucha` (b o p; zh o j), `texto` (inicial de una sílaba).
- Remisiones: "Qué es el mandarín y cómo se escribe".
- Datos:
  - D11: una sílaba del mandarín se compone de inicial, final y tono. Fuente: Univ.
  - D12: la lista de las 21 iniciales (声母). Fuente: Esquema.
  - D13: b/p, d/t y g/k se distinguen por el soplo de aire (aspiración), no por la vibración de la voz. Fuente: Univ.
  - D14: j, q y x: cómo se articulan y que solo van seguidas de i o ü. Fuente: Univ.
  - D15: zh, ch, sh y r se pronuncian con la punta de la lengua hacia atrás; z, c y s con la lengua plana. Fuente: Univ.
  - D16: y y w no son iniciales: son la forma de escribir i y u al inicio de la sílaba. Fuente: Esquema o Univ. (opcional)
  - D17: líneas del sílabo de las palabras de ejemplo: 爸爸, 妈妈, 大, 他, 哥哥, 喝, 七, 小, 中国, 吃, 是, 人, 在, 菜, 三 (las que existan en el nivel 1; reporta las que no). Fuente: Sílabo.

## 3. Pinyin: finales
- Términos nuevos: **final simple**, **final compuesta**, **final nasal**.
- Idea central: la final es la parte vocálica de la sílaba. Hay 6 vocales simples; las demás finales combinan vocales o terminan en -n o -ng. Unas pocas reglas de escritura cambian cómo se ve (yi, wu, ju).
- Visual: tabla de finales por grupo (simples, compuestas, nasales) con ejemplo y audio; tabla pequeña «se escribe / en realidad es» (yi, wu, yu, ju, jiu, gui).
- Ejemplo resuelto: armar una sílaba: inicial n + final ü + tercer tono = nǚ; y por qué en «qu» la u es ü.
- Vida real: buscar una palabra en un diccionario o escribirla en el teclado (la ü se teclea con v).
- Ejercicios: `opciones`, `pinyin` (escribe la sílaba que oyes, con `escucha`), `texto` (qué vocal suena en «xu»).
- Remisiones: "Pinyin: iniciales".
- Datos:
  - D18: las 6 vocales simples: a, o, e, i, u, ü. Fuente: Esquema.
  - D19: cuántas finales (韵母) tiene la tabla del Esquema, con la cifra tal como la da la fuente. Fuente: Esquema o Univ.
  - D20: tras j, q, x (e y), la ü se escribe u sin puntos; con n y l conserva los puntos. Fuente: Esquema.
  - D21: al inicio de sílaba, i se escribe y (o yi) y u se escribe w (o wu). Fuente: Esquema.
  - D22: iou, uei y uen se escriben iu, ui y un tras una inicial. Fuente: Esquema.
  - D23: las finales nasales terminan en -n o en -ng, y en qué se diferencian. Fuente: Univ.
  - D24: la letra i suena distinto tras z, c, s, zh, ch, sh y r. Fuente: Univ. (opcional)
  - D25: cuántas sílabas distintas (sin contar tonos) usa el mandarín, con la cifra de la fuente. Fuente: Univ. (opcional)
  - D26: líneas del sílabo de las palabras de ejemplo: 八, 我, 喝, 一, 五, 女儿, 来, 好, 口, 三, 很, 忙, 朋友, 六, 对, 去 (las que existan en el nivel 1). Fuente: Sílabo.

## 4. Los cuatro tonos y el tono neutro
- Términos nuevos: **tono**, **marca de tono**, **tono neutro**.
- Idea central: en mandarín, la melodía de la sílaba es parte de la palabra: la misma sílaba con otro tono es otra palabra. Hay cuatro tonos y uno neutro, breve y sin marca.
- Visual: cuatro gráficas pequeñas con `G()` (una por tono, en `.dos-graficas`), altura de la voz de 1 a 5 contra el tiempo, con `descripcion` que diga el recorrido. Tabla mā, má, mǎ, mà con significado y audio (grabación si la consigue el investigador C).
- Ejemplo resuelto: poner la marca en «hao» de tercer tono: regla de la vocal (a gana; si no, o o e; en iu y ui, la última).
- Vida real: evitar malentendidos (mamá y caballo); en español el tono cambia la intención (pregunta o afirmación), en chino cambia la palabra.
- Ejercicios: `opciones` con `escucha` (qué tono oyes), `pinyin` (escribe mā con su tono), `opciones` (dónde va la marca), `numero` (cuántos tonos).
- Remisiones: "Pinyin: finales".
- Datos:
  - D27: el mandarín tiene cuatro tonos y un tono neutro, y el tono distingue significados. Fuente: Univ. o Esquema.
  - D28: el recorrido de cada tono en la escala de 1 a 5: 55, 35, 214 y 51. Fuente: Univ.
  - D29: las cuatro marcas de tono (ˉ ˊ ˇ ˋ) y que el tono neutro no lleva marca. Fuente: Esquema.
  - D30: la marca va sobre la vocal principal de la sílaba; regla para elegir la vocal. Fuente: Esquema o Univ.
  - D31: el ejemplo mā (妈), má (麻), mǎ (马), mà (骂) con sus significados. Fuente: Univ.
  - D32: el tono neutro es breve y ligero; ejemplos 妈妈 māma y 爸爸 bàba con sus líneas. Fuente: Univ. y Sílabo.
  - D33: escribir el tono con números (ma1) es una alternativa de teclado a las marcas. Fuente: Univ. (opcional)

## 5. Cambios de tono: el tercer tono, 不 y 一
- Términos nuevos: **cambio de tono**, **medio tercer tono**.
- Idea central: algunos tonos cambian según el tono que sigue, para que la frase fluya. Son tres reglas cortas: dos terceros tonos seguidos, 不 antes de cuarto tono, y 一 según lo que sigue.
- Visual: tabla «se escribe / se dice» con 你好, 很好, 不是, 不好, 一个, 一天, cada una con audio (la voz del sistema ya aplica el cambio).
- Ejemplo resuelto: decir 你好: se escribe nǐ hǎo, se dice ní hǎo; por qué.
- Vida real: sonar natural desde el primer saludo; entender por qué lo que oyes no coincide con lo escrito.
- Ejercicios: `pinyin` (cómo se dice 不是), `opciones` (qué tono toma 一 antes de cuarto tono), `opciones` con `escucha`.
- Remisiones: "Los cuatro tonos y el tono neutro".
- Convención de la lección (se marca «recomendación de la lección»): el pinyin se escribe con el tono original, como en el sílabo, y la lección avisa cuándo se pronuncia distinto.
- Datos:
  - D34: dos terceros tonos seguidos: el primero se pronuncia como segundo tono. Fuente: Univ.
  - D35: el tercer tono antes de un primero, segundo o cuarto tono se queda en la parte baja (medio tercer tono). Fuente: Univ.
  - D36: 不 (bù) se pronuncia bú antes de un cuarto tono. Fuente: Univ.
  - D37: 一 (yī): yí antes de cuarto tono; yì antes de primero, segundo y tercero; yī sola o al contar. Fuente: Univ.
  - D38: en pinyin, el cambio del tercer tono no se escribe (se mantiene la marca original). Fuente: Univ. o Esquema.
  - D39: líneas del sílabo de 你好, 很, 好, 不, 是, 一, 个, 天 (las que existan en el nivel 1). Fuente: Sílabo.

## 6. Trazos y orden de trazos
- Términos nuevos: **trazo**, **orden de trazos**.
- Idea central: un carácter se dibuja con trazos, y los trazos siguen un orden fijo con pocas reglas (de arriba abajo, de izquierda a derecha). Seguirlo hace que el carácter salga legible y permite contarlo.
- Visual: diagramas con `G()` (figuras `linea` y `texto`, `ejes: false`, `proporcional: true`) de 十, 三, 人 y 口 con cada trazo numerado; tabla de trazos básicos (nombre con `zh()`, forma y dirección).
- Ejemplo resuelto: escribir 十 (horizontal y luego vertical) y 口 (tres trazos, se cierra al final).
- Vida real: escribir a mano, buscar un carácter por número de trazos, usar la escritura a mano del teléfono.
- Ejercicios: `numero` (cuántos trazos tiene 三), `ordenar` (pasos en español del orden de 十), `opciones` (qué regla aplica).
- Remisiones: "Qué es el mandarín y cómo se escribe".
- Datos:
  - D40: los trazos básicos y sus nombres: 横 héng, 竖 shù, 撇 piě, 捺 nà, 点 diǎn, 提 tí (más 折 zhé y 钩 gōu si la fuente los da). Fuente: Univ. o norma de China sobre trazos.
  - D41: las reglas del orden de trazos (arriba antes que abajo, izquierda antes que derecha, horizontal antes que vertical, fuera antes que dentro, cerrar al final), solo las que dé la fuente. Fuente: Univ.
  - D42: número de trazos de 一, 二, 三, 十, 人, 大, 口 y 中. Fuente: diccionario oficial o Univ.; Wikcionario solo de apoyo.
  - D43: el sílabo separa caracteres de lectura (认读字) y de escritura (书写字), y pide 100 de escritura para los niveles 1 y 2. Fuente: Sílabo (índice y última línea numerada de la lista).
  - D44: que estos 8 caracteres están en la lista de lectura de nivel 1. Fuente: Sílabo.

## 7. Radicales: las piezas de los caracteres
- Términos nuevos: **componente**, **radical**.
- Idea central: la mayoría de los caracteres se arma con piezas que se repiten. Una pieza suele dar una pista del significado (el radical) y otra, del sonido. Reconocerlas hace que un carácter nuevo ya no sea un dibujo desconocido.
- Visual: tabla de 5 radicales (forma, significado, caracteres de nivel 1 que lo llevan) y un diagrama «妈 = 女 + 马» (pieza de significado y pieza de sonido).
- Ejemplo resuelto: desarmar 妈: 女 (mujer) da la pista del significado, 马 (mǎ) da la del sonido (mā).
- Vida real: adivinar de qué trata un carácter nuevo y buscarlo en un diccionario.
- Ejercicios: `opciones` (qué radical comparten 吗, 吃 y 喝), `opciones` (qué pista da 女), `texto` o `numero`.
- Remisiones: "Trazos y orden de trazos".
- Datos:
  - D45: qué es un radical (部首): el componente por el que se ordenan los caracteres en un diccionario. Fuente: Univ. o norma «汉字部首表».
  - D46: la tabla oficial de China «汉字部首表» tiene 201 radicales principales. Fuente: moe.gov.cn. (opcional)
  - D47: muchos caracteres combinan un componente de significado con uno de sonido (形声字), con la proporción que dé la fuente. Fuente: Univ.
  - D48: significado de los radicales 女 (mujer), 口 (boca), 亻 (persona), 氵 (agua) y 讠 (palabra). Fuente: Univ.
  - D49: caracteres de lectura de nivel 1 con cada radical: 妈, 好, 姐 · 吗, 吃, 喝, 叫 · 你, 他, 们 · 汉, 没 · 说, 请, 谁 (los que existan en la lista). Fuente: Sílabo.
  - D50: el radical da una pista, no una regla segura (ejemplo de una excepción). Fuente: Univ. (opcional)

---

## Grabaciones (investigador C → `ficha-c.md`)
No son contenido de lección: son archivos de audio con licencia libre para `audio/zh/`. Solo CC0, CC BY o CC BY-SA; nada con NC ni ND.
- A1: una colección de sílabas del mandarín grabadas por una persona nativa, con su licencia. Candidatas: Wikimedia Commons (categoría de pronunciación del mandarín o de sílabas pinyin), Lingua Libre, Shtooka «Congcong». Cita: el texto de la licencia en la página.
- A2: URL de descarga, autor y licencia, archivo por archivo, de: ma1, ma2, ma3, ma4, ba4, pa4, da4, ta1, zhi1, ji1, shi4, xi1, nü3, lü4. Lo que no exista se reporta «no encontrado».
- A3: formato y peso de cada archivo.
- A4: Tone Perfect (Universidad Estatal de Míchigan): su licencia exacta, para saber si se puede usar. (opcional)
- Si no hay fuente válida, la unidad queda solo con la voz del sistema.

## Notas para el constructor y el auditor
- Todo carácter con `zh()`. Tablas de vocabulario, no `<strong>`, para las palabras.
- Sílabas sueltas sin carácter: `zh('', 'má', { voz: '麻' })`.
- Ejercicios de escucha: `sinAudio` obligatorio con el pinyin y la descripción del tono.
- En `pinyin`, las `respuestas` llevan las sílabas separadas por espacio.
- Las gráficas de tonos y los diagramas de trazos se revisan con `render.js`.
- Frases de ejemplo entre «». Decimales con punto.
