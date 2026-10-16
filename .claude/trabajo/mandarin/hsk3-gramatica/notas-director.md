# Notas del Director · Mandarín, unidad 7 (para los constructores y los auditores)

`citas.js` da OK en las 27 fuentes. Las 144 palabras del plan están en el sílabo, nivel 3. ChinGram no respondió desde esta red durante la investigación: varias lecciones se apoyan en MIT OCW (Wheatley), el CTCFL de Oxford, Kapiolani CC, MSU, Princeton y USC.

## Audio y vocabulario
- Solo voz del sistema. Ningún `audio:`.
- **Una sola** tabla de vocabulario por lección, con el helper `tabla` (genera `<table class="vocabulario">`): la exige `verificar.js` y alimenta el botón «Vocabulario». Cualquier otra tabla, con `cuadro`.
- La primera lección dice una vez que esta unidad enseña una selección de las palabras de nivel 3 y enlaza el sílabo.

## Cambios al plan (mandan sobre él)
- **Lección 1**: 到 = obtener o llegar a un punto (F10, Oxford; ChinGram y MIT); 住 = quedar fijo (记住 / 没记住). **上 como «cerrar o unir» no tiene regla en ninguna fuente**: solo el ejemplo 关上 (MIT). Úsalo en una frase de ejemplo, marcado «simplificación de la lección», sin ejercicio que dependa de esa regla.
- **Lección 2**: el sentido figurado general (起来 = empezar, 下去 = seguir) solo tiene una página de Kapiolani que copia de un sitio no universitario. Enséñalo con los ejemplos que sí tienen respaldo (想起来, 站起来, 写下来, 记下来; y los que traiga la ficha), y presenta la idea general en una frase como «simplificación de la lección». Ningún ejercicio basado solo en esa idea general. 下来 = «queda registrado» vale solo con verbos de registrar (写, 记).
- **Lección 3**: verbo + 得/不 + resultado o dirección (F10, MIT); 没看懂 es «no lo entendí» (hecho), 看不懂 es «no puedo entenderlo». Ninguna fuente lo enuncia como regla de contraste: preséntalo con el par de ejemplos de la fuente, sin una regla general nueva.
- **Lección 5, negación de 被**: no encontrada en fuente universitaria. No enseñes 没被 como regla ni hagas ejercicios de negación con 被.
- **Lección 6**: los ejemplos de la fuente con 就 usan 要是, y el de 如果 usa 那 en la consecuencia. La lección enseña 如果…就… (está en el sílabo, F20) y puede mencionar que también se oye 要是 (es de nivel 4: solo mencionarlo, sin tabla ni ejercicio).
- **Lección 7**: Oxford (F44) lo formula como **condición difícil de lograr** (只有…才…) frente a **condición fácil o mínima** (只要…就…), con 才/就 antes del verbo. Usa esa formulación, no «única / suficiente».
- **Lección 8**: 不但 y 而且 van antes del sujeto o antes del verbo según el énfasis, con uno o dos sujetos (F41, F44). **No digas que la segunda parte «pesa más»**: sin fuente. 而且 puede cambiarse por 也 (F41).
- **Lección 9**: 一边…一边… con la estructura sujeto + 一边 + verbo + 一边 + verbo (MSU, F42); «mismo sujeto» como regla es «simplificación de la lección».
- **Lección 10**: 越来越 + adjetivo, con ejemplos sin 很 (Oxford, Princeton). Que no lleva 很 no está escrito como regla: muéstralo con los ejemplos y, si lo dices, márcalo «simplificación de la lección».
- **Lección 11**: 或者 en afirmaciones y 还是 en preguntas (ChinGram en caché, Kapiolani). 或者…或者… solo tiene la línea del sílabo: una frase, sin ejercicio.
- **Lección 12**: palabra de pregunta + 都 = «todo, cualquiera»; con negación = «nada, ninguno» (ChinGram 什么 en caché, Oxford). La negación se enseña con 什么 y 哪儿 (respaldadas); 谁都 solo en afirmativo (谁都喜欢). 咱们, 别人, 别的, 其他 y el molde 一…也/都 + 不/没: solo tabla o mención, sin reglas propias.

## Ejemplos de las fuentes que NO se copian
Los ejemplos de MIT, Oxford y USC usan muchas palabras de nivel 4 o más (激烈, 要是, 作业 sí es nivel 3, 酒, 偷, 钱包…). Antes de usar un ejemplo, comprueba que cada palabra sea de nivel 1, 2 o 3 y esté enseñada; si no, rehazlo.

## Pinyin y niveles
- Pinyin de cada palabra nueva: el de su línea del sílabo en la ficha, carácter por carácter. Palabras de unidades anteriores: con el pinyin del sílabo (las fichas de `.claude/trabajo/mandarin/*/ficha.md`). No teclees pinyin de memoria.
- 才 es la línea 544 (`才1`, adverbio de tiempo «recién, apenas»); en 只有…才… es el mismo carácter: la lección puede decir que aquí indica «solo entonces», como «simplificación de la lección» si la fuente no lo dice así.
- 不 y 一 sueltos: tono original y aviso; palabras cuyo pinyin del sílabo ya trae el cambio (不但 búdàn, 不用 búyòng, 一定 yídìng, 一共 yígòng, 一边 yìbiān…): como el sílabo.
- **Palabras permitidas**: las 500 de HSK 1 y 2 (ya todas enseñadas en las unidades 2 a 6) más las de esta unidad que ya aparecieron en lecciones anteriores de la unidad. Nada de nivel 4 o superior.
- Nombres propios en letras latinas.

## Formato y extensión
- Explicación de 480 a 560 palabras (tope 650); ejemplo 125 a 180; vida real 65 a 90. 6 ejercicios por lección.
- «Vida real»: 4 o 5 viñetas distintas, frases completas, sin caracteres ni términos aún no definidos.
- Modelo de cabecera, helpers (`tabla`, `cuadro`, `p`, `txt`, `lin`, `barras`) y estilo: `lecciones/mandarin/hsk2-situaciones.js` (lee la cabecera y una lección).
- Todo carácter con `zh()`, también en títulos citados y en `cuadro`; dentro de `${…}` comillas dobles. `descripcion` de gráficas sin caracteres.
- `ordenar`: 3 piezas o más, `pinyin` paralelo, `lang: 'zh-Hans'`, órdenes válidos en `alternativas` (en 把/被 cuidado con dónde puede ir el tiempo; en 不但…而且… las dos posiciones según el sujeto). `opciones`: una sola correcta.
- `escucha`: `voz` siempre, `sinAudio` obligatorio; ni enunciado ni pista revelan lo que se oye.
- Frases de ejemplo entre «», declaradas «frases de ejemplo de la lección». Lo propio: «simplificación de la lección» o «recomendación de la lección».

## Tras los constructores (para los auditores)
- **No añadas reglas que estas notas vetan.** Si falta texto, un mini-ejemplo con palabras permitidas o un paso intermedio.
- **Nivel por palabra, no por carácter**: comprueba con un script que ninguna frase china use palabras de nivel 4 o más, ni de nivel 3 que no estén en el plan de esta unidad (por ejemplo 高铁, 作业, 常常, 地图, 要是 no valen). Cuidado: un carácter permitido puede formar una palabra no permitida.
- **不 dentro de un complemento de posibilidad** (听不懂, 看不见): el constructor lo escribió en tono neutro (`bu`), como MIT y Oxford. Déjalo así, con un aviso de una frase si la lección no lo explica; 不 suelto, `bù`.
- **Lección 5**: 汽车被司机开走了 no es claramente algo no deseado; si la lección dice que 被 «suele» indicar algo malo, la frase debe tener un contexto que lo justifique o cambiarse. Sin negación de 被.
- **Lecciones 6 y 7**: 就 y 才 explicados como «simplificación de la lección»; la formulación de 只有/只要 es la de Oxford (difícil / fácil o mínima).
- **Lección 10**: la gráfica de barras no se revisó a ojo: comprueba su `descripcion` contra los datos del código y ábrela en el navegador si puedes.
- **Lección 12**: 谁都 solo en afirmativo; negación con 什么 y 哪儿.
- Rangos bajos que hay que subir un poco: ejemplo de L6 (124) y L10 (120), ejemplo de L11 (124), vida real de L7 (64), L10 (64) y L11 (61). Sin relleno ni viñetas repetidas.
- Script de pinyin contra las fichas de todas las unidades (`.claude/trabajo/mandarin/*/ficha.md`).
