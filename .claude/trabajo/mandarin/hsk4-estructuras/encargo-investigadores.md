# Encargo para los investigadores · Mandarín, unidad 10 (HSK 4 · Estructuras)

Lee antes: `plan.md` (esta carpeta), `.claude/docs/fuentes.md` (formato de la ficha, sitios bloqueados y los que funcionan en Mandarín) y `.claude/docs/materias/mandarin.md` (sección «Cómo se cita cada palabra y cada frase"). Modelo de ficha ya aprobada: `.claude/trabajo/mandarin/hsk3-comunicacion/ficha-a.md`.

## Qué entrega cada uno
Tu archivo `ficha-<letra>.md` en esta carpeta, con:

1. **F del sílabo** (url y nombre exactos como en el modelo). Un dato por palabra de tus lecciones, con su línea copiada de `lineas-silabo.txt` (esta carpeta; ya comprobada contra la caché de `citas.js`). Formato:
   `- Dn: Lección «<título>», punto: vocabulario (palabra k): 连, línea 1469 del 词汇大纲 de nivel 4 (China, 2025).`
   `  > 1469 4(5) 连 lián 介、(动、副)`
   (la cita es lo que va después de `=>`, tal cual).
2. **Gramática del 语法大纲 de nivel 4**, un dato por patrón de tus lecciones. Copia un trozo contiguo de la caché (5 piezas o más, tal cual, con los `......`). Trozos que existen: `(1)主语+把+宾语+动词(+一/了)+动词 (2)主语+把+宾语+动词+了` y `(3)主语+把+宾语+动词+动量补语/时量补语 (4)主语+把+宾语+状语+动词` (把字句2); `被动句2 主语+叫/让+宾语+动词+其他成分`; `(3)表致使:主语+使/让+人称代词+动词短` (兼语句2; también `(1)表爱憎义:主语+表扬/批评+宾语1+动词`); `比较句3 双重否定句 用双重否定表示强调` y `(1)a不如b(+形容词) (2)跟......相比`; `可能补语2 动词+得/不+了 难道......吗? 句类 反问句2 由疑问代词构成的反问句`; `用"大约、左右、前后"表示概数 小数、分数、百分数、倍数的表示法` y `概数表示法3:数词+来+量词`. Si un trozo no pasa `citas.js`, busca el corte exacto en la caché (marca de agua «汉考国际» o «汉» intercalada: evítala).
3. **Uso, de fuente universitaria**: al menos **tres datos por lección**, cada uno con cita textual: (a) qué significa la estructura; (b) forma y posición (orden de las palabras, qué es obligatorio, negación); (c) un ejemplo de la fuente con su traducción. Diferencias con lo ya enseñado (把 y 被 de la unidad 7, 比 y 没有 de la unidad 5, 能/可以, complemento de resultado, 不是…吗 de la unidad 8) son datos muy bienvenidos.
   - Fuentes que funcionan (ver `fuentes.md`, sección Mandarín): **primero Dartmouth «Snapshots of China»** (`sites.dartmouth.edu/snapshotsofchina`, ~28 lecciones; la 26 en `/new-2/`) y **Yale Chinese Exchange** (`campuspress.yale.edu/exchange/`, lista de entradas con la API de WordPress); luego MIT OCW (PDF de Wheatley `res21g_003_s_11.pdf`: 把 en 9.7, 被 en 10.10), ChinGram (`chingram.upol.cz`; su API `wp-json/wp/v2/search?subtype=grammar&per_page=100&page=N` lista las páginas), Oxford CTCFL (`www.ctcfl.ox.ac.uk`), MSU openbooks, Kapiolani CC en LibreTexts.
   - **No** sirven: Chinese Grammar Wiki / AllSet (ni copias, como el PDF de `ci.ioe.ac.uk`), blogs, academias comerciales, Wikipedia (solo apoyo).
   - Los ejemplos de las fuentes con palabras fuera de nivel: cópialos igual; el Director decide.
4. Lo que no encuentres: escríbelo como «no encontrado: <qué>» al final de tu ficha. No lo rellenes con memoria.

## Reglas de trabajo
- Rangos para no chocar: **A**: F1–F29 y D1–D299. **B**: F30–F59 y D300–D599. **C**: F60–F89 y D600–D899. Cada uno pone su propio F del sílabo dentro de su rango (el Director los une).
- Guarda la ficha **por partes** (tras cada lección), no al final: si te cortan, lo hecho queda.
- Al terminar corre `node .claude/herramientas/citas.js .claude/trabajo/mandarin/hsk4-estructuras/ficha-<letra>.md` y deja todo en OK (corrige citas que no aparecen; si un sitio bloquea, cambia de fuente y anótalo).
- Responde al Director con: fuentes usadas por lección, cuántos datos de uso por lección y la lista de «no encontrado». Breve.
