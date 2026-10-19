# Notas del Director · Mandarín, unidad 15 (para el constructor y el auditor)

`citas.js` da OK en las 47 fuentes de `ficha.md`. Las 90 palabras están en el sílabo, nivel 5 (`lineas-silabo.txt`). Es la última unidad de HSK 5: la lección 6 lo cierra (qué sabe hacer el lector, selección de vocabulario, sílabo enlazado con `encodeURI`).

## Fuentes de apoyo y vetos
- **AllSet**, **Wikcionario**, **Wikisource** (texto chino de clásicos), la lista de St. John's (F44, copia de Wikipedia): solo apoyo, nombrados así.
- **MOE de Taiwán 《成语典》**: diccionario oficial, en tradicional: en la lección, simplificado.
- **Wikisource da los clásicos en tradicional**: pásalos a simplificado (己所不欲，勿施于人; 见贤思齐焉，见不贤而内自省也; 知人者智，自知者明; 千里之行，始于足下).
- **No se copian**: el ejemplo de 刚好 con una bomba (Wikcionario, línea 271 de la ficha); detalles de armas de la pólvora (D883: basta «se usó también en la guerra a fines de la dinastía Tang», sin cañones). Leyendas: resumen propio y amable para el lector de 10–12 años (el arquero que derriba soles, el elixir), sin violencia gráfica.
- Punto de gramática sin ninguna fuente de uso: **sílabo + frases propias marcadas** (decisión del usuario) o mención.
- 成语, leyendas y citas clásicas: cultura (pinyin y significado, fuera de la tabla, se evalúan solo por significado); pueden tener caracteres fuera de nivel. No repetir los 成语 ni las frases del 《论语》 de la unidad 12.

## Por lección (R regla / E ejemplos / S sílabo + frases propias / M mención)
- **1 · 成语**: 4 成语 con significado y origen (MOE: 画蛇添足, 守株待兔, 对牛弹琴, 自相矛盾; cita la obra de origen tal como la da la fuente). Remite a la lección «Refranes y frases célebres» (unidad 12) para qué es un 成语 (no repitas su definición larga). Gramática: A来A去 R (AllSet); 没A没B E (没完没了, MIT); **说A就A S**.
- **2 · Leyendas populares**: 牛郎织女 (UCSD: personajes, separación, reencuentro el día 7 del mes 7, Qixi, Vega y Altair) y 嫦娥奔月 (embajada, con el Medio Otoño; remite a «Festividades y cultura china», unidad 8). Gramática: A着A着 R (AllSet, 走着走着); 白 «en vano» R (AllSet); 早晚 y 刚好 E (Wikcionario de apoyo); 匹 E (MIT: para caballos).
- **3 · Confucio y Laozi**: Confucio 551–479 a. C. (SEP); 《论语》 «conversaciones recopiladas», reunidas por discípulos (Eno); Laozi: según la tradición, contemporáneo mayor de Confucio; los dichos circulaban en el s. IV a. C. (SEP); 《道德经》 81 capítulos, «texto de cinco mil caracteres» (SEP). Dos frases de cada uno (ver arriba) con traducción de Eno (redactada en español). Sin juicios ni «la filosofía china es…». Gramática: 本 R (AllSet; distínguelo de 本 clasificador, ChinGram); 动词+什么(就)是什么 R (AllSet, MIT 喜欢吃什么就点什么); **不管怎样说 S**.
- **4 · Artes tradicionales**: caligrafía china, UNESCO 2009, cinco estilos; grabado de sellos, UNESCO 2009; pintura china (国画) casi sin cambios desde la dinastía Song (Cal State Fullerton) y técnica del pincel (museo de San Francisco). Gramática: 副 y 支 E (MIT, AllSet); 册 E de apoyo; **A的A，B的B y 真有你的: S**.
- **5 · Inventos**: papel (dinastía Han; Cai Lun lo mejora, año 105 según Columbia), imprenta (xilografía en la Tang; tipos móviles de Bi Sheng, Song del Norte, 1041–1049 según Columbia), brújula (sinan en los Reinos Combatientes; aguja imantada en la Song; uso en navegación poco antes de 1125), pólvora (Sui–Tang; uso militar a fines de la Tang, sin detalles). Cada fecha con su fuente en la frase. Tabla con `cuadro`. Gramática: 用不着 E (Dartmouth); 可 enfático R (AllSet: 可…了, 可别…); 架 E (Oxford); **-头 S** (木头 ya está en la tabla como ejemplo del sílabo).
- **6 · Leer textos de opinión**: estructura de un texto argumentativo (tesis, razones o pruebas, contraargumento, conclusión) según Illinois y Texas A&M; remite a Lectura («Pensamiento crítico» y «Leer textos de opinión» si existen en el temario: compruébalo). Un texto de opinión propio, tema neutro (p. ej. leer en papel o en pantalla), con preguntas que se responden con él. Gramática: X来X去 ya en L1 (recordar); X也不是，Y也不是 E (Dartmouth); **不X白不X, X什么X, 什么X不X的, X着也是X着, X是它Y也是它: S**; 白 base de 不X白不X (L2). 时刻: palabra. Cierre de HSK 5.

## Pinyin, nivel y formato
- Pinyin del sílabo; MOE para los 成语 (simplificado; regla de 不/一 de `mandarin.md`: tono original aunque la fuente marque el cambio). Clásicos: pinyin propio coherente con el sílabo para los caracteres que estén en él; los demás, del MOE o Wikcionario.
- `node .claude/trabajo/mandarin/hsk5-cultura/nivel.js lecciones/mandarin/hsk5-cultura.js`: cada aviso a mano; 成语, leyendas, clásicos y palabras de función de su punto valen.
- Explicación 480–560 (tope 650), ejemplo 125–180, **vida real 65–90**, 6 ejercicios, una tabla `vocabulario` de 15. Modelo: `lecciones/mandarin/hsk5-sociedad.js` y `hsk4-cultura.js` (tablas de cultura con `cuadro`).
- Todo carácter con `zh()`, también títulos citados y celdas; nunca en celdas de significado ni en `href`. `ordenar` con todos los órdenes válidos; `opciones` con una sola correcta.

## Dudas del constructor, revisadas por el Director
- L5 «Vida real» 60: súbela a 65–90.
- SCIO en https: se deja (por http responde 200; el fallo de curl es de la cadena de certificado). UNESCO 00217: la página es la del grabado de sellos (el sitio resuelve por número); se deja.
- 省 en 内自省: xǐng, correcto.
- Papel: SCIO (Han Occidental) frente a Columbia (año 105, Cai Lun): «inventado en la Han Occidental y mejorado por Cai Lun», cada dato con su fuente. Bien.
- 可 y 不用 (nivel 3) en L5: 可 es el punto de gramática; 不用 solo en el contraste con 用不着 de Dartmouth. Valen. 马, 眼镜, 玫瑰, 钢琴: ejemplos de la fuente para clasificadores; valen.
- L1 en 648 palabras: no subas más; recorta si añades algo.
