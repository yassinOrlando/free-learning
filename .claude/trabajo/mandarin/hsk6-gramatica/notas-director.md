# Notas del Director · Mandarín, unidad 16 (para el constructor y el auditor)

Las 120 palabras están en el sílabo, nivel 6 (`lineas-silabo.txt`). Empieza HSK 6: la lección 1 lo dice (selección de vocabulario, sílabo enlazado con `encodeURI`). **Nunca se enseña nivel 7–9.**

## Fuentes de apoyo y decisión del usuario
- AllSet y Wikcionario: apoyo, nombrados así. Oxford CTCFL (notas de lectura de prensa) es la mejor fuente universitaria de esta unidad.
- **Punto sin fuente de uso, aunque esté en el título** (明明 en L4, 未必 en L5, 到…为止 en L7): como decidió el usuario en la unidad 13, se enseña con su línea del sílabo y **frases propias marcadas «simplificación de la lección»**, sin matices ni comparaciones (未必 frente a 不一定: solo «significa "no necesariamente"», sin regla de diferencia, salvo el par coloquial/formal de AllSet como apoyo).
- No se copian ejemplos de política, religión, guerra o pareja (p. ej. los de -化 de Oxford: 四个现代化, 深化改革; usa ejemplos propios como 简化, 绿化, 数字化).

## Por lección (R regla / E ejemplos / S sílabo + frases propias / M mención)
- **1 · Formar palabras**: -化 y -性 R (Oxford, Dartmouth, AllSet); 超- E (glosa Dartmouth: 超人, 超级, 超自然); **反-, 无-, 多-, 准-, 亚-, -式, -型: S** (con palabras de la tabla: 反思, 无所谓, 多元, 型号…; 准-/亚-/-式 solo M).
- **2 · 所**: 所 + V + 的 + sustantivo R (Oxford: el énfasis cae en el sustantivo); 所 + verbo bisilábico (Dartmouth, 所面临); 之所以 R de apoyo (AllSet); **众所周知: S**; 人家 R de apoyo (AllSet: «otros», «yo», «él/ella»).
- **3 · 于 y 至于**: 于 R (Oxford: lugar y tiempo ≈ 在; comparativo; Dartmouth: tras el verbo con lugar, origen, tiempo, dirección, finalidad); 出于 R (Oxford); 至于 R (Oxford, Dartmouth, AllSet); 因 y 因…而… R (Oxford); 除 R (Oxford, como 除了…以外). Sin regla de 于 frente a 从/对 (solo «parecido a 在»).
- **4 · Matices**: 干脆, 倒是/倒, 总算, 一向 R de apoyo (AllSet); 恰好 E (registro formal, AllSet); **明明: S**; **不禁, 特地/特意, 偷偷, 赶忙, 仍旧/依旧: palabras** (significado en la tabla, una frase propia si cabe, sin regla).
- **5 · 未必**: **未必: S** + par coloquial/formal de AllSet (apoyo); 一再/再三 R de apoyo (AllSet); 不料, 较为 E de apoyo (pares de AllSet); **特, 异常: palabras**. Contraste con 不一定, 居然, 果然: solo como recuerdo de significados, sin regla nueva.
- **6 · 嘛 y 啦**: 啦 = 了 + 啊 y para enumerar R (Dartmouth L19, L14); 嘛 R de apoyo (AllSet: final de frase y tras el tema); 算了 E (MIT «Forget about it!», Dartmouth); 得了 E (diálogo de MIT); 那倒(也)是 R de apoyo; 好(不)容易 R de apoyo (AllSet); **也好: S**. Las frases de esta lección son diálogos cortos y amables.
- **7 · 到…为止**: **到…为止: S** (+ Wikcionario de apoyo); 要么…要么 R (Dartmouth L20); 虽…但/却 R (Dartmouth L1); 除非, 凡是, 就算, 以便, 以免 R de apoyo (AllSet). 以便 en el sílabo: cita parcial por la marca de agua (D634), basta.
- **8 · Lengua hablada y escrita**: registro R (MIT: escrito frente a hablado, tabla 以前/之前/前, 跟/和, 于 literaria; Oxford: sílabas equilibradas, 因/因为, 将/把, 未/还没有, 至于/对…来说, 来自; ChinGram: 但是 más formal, 可是/不过 más habladas; AllSet tabla formal/informal de apoyo: 虽然/虽, 但是/然而, 因为/由于, 把/将). Un texto corto en versión hablada y escrita (propio), con los pares de la ficha. **在/于 y 跟/与 como par: solo lo que dicen las fuentes** (于 literaria ≈ 在). 透了 E (Dartmouth 糟透了); 一时 R de apoyo (AllSet); **一时…一时…: S**; 串 E (MIT); **番, 滴, 净: S**; 一同, 大都, 不时: palabras (Wikcionario de apoyo). Remite a Lectura cuando aplique. 

## Pinyin, nivel y formato
- Pinyin del sílabo; regla de 不/一 de `mandarin.md`. 啦 `la`, 嘛 `ma` (neutros, como el sílabo).
- Permitidas: HSK 1–2; HSK 3 de unidades 7–8; nivel 4 de 9–12; nivel 5 de 13–15; nivel 6 de esta unidad (lección actual o anteriores). `node .claude/trabajo/mandarin/hsk6-gramatica/nivel.js lecciones/mandarin/hsk6-gramatica.js`, cada aviso a mano; palabras de función de su punto y ejemplos de la fuente valen.
- Explicación 480–560 (tope 650), ejemplo 125–180, **vida real 65–90**, 6 ejercicios, una tabla `vocabulario` de 15. Modelo: `lecciones/mandarin/hsk5-gramatica.js`.
- Todo carácter con `zh()`, también títulos citados y celdas; nunca en celdas de significado ni en `href`. Opciones en español con solo el carácter marcado como chino.
- `ordenar` con todos los órdenes válidos; `opciones` con una sola correcta (gemelos: 于/在, 因/因为, 虽/虽然, 特地/特意, 一再/再三, 仍旧/依旧, 嘛/吧).
- Dudas del constructor 1, revisadas por el Director:
  - Morfemas de L1 (超, 反, 无, 化, 性, 型, 亚, 准, 式) y 所: avisos válidos, son el tema.
  - Palabras de ejemplos de la fuente (超级, 自然, 面临, 大会, 英国, 以外, 在乎, 旅行, 可是, 不过, 终于, 一直, 正好): valen si aparecen dentro del ejemplo citado o del contraste que da la fuente; si alguna está en una frase propia, cámbiala por una permitida.
  - 重要性, 历史性 (Oxford) y 简单化 (Dartmouth): ejemplos de la fuente, valen.
  - 因…而… (Oxford): 而 solo dentro del patrón, vale.
  - 倒是 en la tabla: el significado debe seguir a AllSet (concesión: «sí…, pero…»; imperativo con impaciencia), sin inventar más.
  - Pistas de tono de 总算 (zǒngsuàn: 3.º y 4.º) y 至于 (zhìyú: 4.º y 2.º): correctas si coinciden con el sílabo.
- Dudas del constructor 2, revisadas por el Director:
  - **不见得 (nivel 7) en L5: quítalo** (la materia nunca enseña nivel 7–9); deja el par de AllSet solo con lo que sea de nivel 6 o menos, o menciona «hay una forma más hablada» sin escribirla.
  - Ejemplos de AllSet reconstruidos desde el pinyin (安全第一, 孩子嘛…, 好不容易才…, 老师再三强调…, 放慢了语速): comprueba caracteres y que el pinyin coincida; preséntalos como «adaptado de AllSet» si no son literales.
  - 也好 y 好不 sin significado con fuente: S, marcados; bien.
  - L6, 随便吃一点儿得了: traducción propia marcada; vale.
  - L8: «quitar 你» en la versión escrita y el uso de 然而: márcalos «simplificación de la lección».
  - Palabras de ejemplos de la fuente (杯, 果汁, 会员, 老板, 加薪, 仍然, 语速, 安全, 正常…): valen dentro del ejemplo citado/adaptado; en frases propias, cámbialas por permitidas.
