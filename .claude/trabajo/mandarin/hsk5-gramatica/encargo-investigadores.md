# Encargo para los investigadores · Mandarín, unidad 13 (HSK 5 · Gramática)

Lee antes: `plan.md` (esta carpeta), `.claude/docs/fuentes.md` (formato de la ficha, sitios bloqueados y los que funcionan en Mandarín) y `.claude/docs/materias/mandarin.md` (sección «Cómo se cita cada palabra y cada frase"). Modelo de ficha ya aprobada: `.claude/trabajo/mandarin/hsk3-comunicacion/ficha-a.md`.

## Qué entrega cada uno
Tu archivo `ficha-<letra>.md` en esta carpeta, con:

1. **F del sílabo** (url y nombre exactos como en el modelo). Un dato por palabra de tus lecciones, con su línea copiada de `lineas-silabo.txt` (esta carpeta; ya comprobada contra la caché de `citas.js`). Formato:
   `- Dn: Lección «<título>», punto: vocabulario (palabra k): 连, línea 1469 del 词汇大纲 de nivel 4 (China, 2025).`
   `  > 1469 4(5) 连 lián 介、(动、副)`
   (la cita es lo que va después de `=>`, tal cual).
2. **Gramática del 语法大纲 de nivel 5**, un dato por punto de tus lecciones (columnas «Lección» y «Punto extra» de `plan.md`). La sección empieza en «hsk(五级)语法» de la caché del sílabo (`$TMPDIR/citas-cache/091e6fef37d6196feda5d9504c7b7dde4ba3966c.json`, campo `texto`). Copia un trozo contiguo de 5 piezas o más, tal cual, sin la marca de agua «汉考国际». Ejemplos: `一旦...... ,就...... 假如...... ,(就)......`, `承接复句 ...... ,便...... 选择复句`, `让步复句 哪怕...... ,也...... 递进复句`, `不但不/不但没有...... ,反而......`, `连接分句或句子 从而、可见、假如、总之`, `(1)动词/形容词+得+动词短语 状态补语2`, `程度补语2 形容词/心理动词+得+不得了`, `趋向补语3 趋向补语的引申用法:表示状态意义:动词/`, `语气副词 毕竟、居然、反正、根本、果然、简直、`, `其他助词 似的`, `情态副词 似乎、仿佛`. Comprueba cada trozo con `citas.js`.
3. **Uso, de fuente universitaria**: al menos **tres datos por lección**, sobre todo de los puntos de gramática: (a) qué significa; (b) forma y posición (orden, qué lo acompaña, negación); (c) un ejemplo de la fuente con su traducción. Diferencias con lo ya enseñado (再 frente a 重新/再次, 可能 frente a 也许/恐怕, 很 frente a 死了, 为了, 也/又, 因为…所以) son bienvenidas. El vocabulario del tema solo necesita su línea del sílabo.
   - Fuentes que funcionan (ver `fuentes.md`, sección Mandarín): **primero Dartmouth «Snapshots of China»** (`sites.dartmouth.edu/snapshotsofchina`, ~28 lecciones con notas de gramática y glosarios; la 26 en `/new-2/`) y **Oxford CTCFL** (`www.ctcfl.ox.ac.uk`, notas de gramática y ejercicios); luego MIT OCW (PDF de Wheatley `res21g_003_s_11.pdf`), ChinGram (`chingram.upol.cz`; su API `wp-json/wp/v2/search?subtype=grammar&per_page=100&page=N` lista las páginas), Yale Chinese Exchange (`campuspress.yale.edu/exchange/`), Princeton (glosas), MSU openbooks, Kapiolani CC en LibreTexts.
   - **Apoyo aceptado por el usuario**: Chinese Grammar Wiki (AllSet Learning, `resources.allsetlearning.com/chinese/grammar/`, lista en `Special:AllPages`) solo para puntos de gramática sin regla universitaria; nombre «Chinese Grammar Wiki (AllSet Learning), fuente de apoyo no universitaria: <título>»; si el chino sale con espacios, cita el pinyin o el inglés. **No** sirven: copias de AllSet (`ci.ioe.ac.uk`), China Daily, blogs, academias comerciales, Wikipedia (solo apoyo).
   - Los ejemplos de las fuentes con palabras fuera de nivel: cópialos igual; el Director decide.
4. Lo que no encuentres: escríbelo como «no encontrado: <qué>» al final de tu ficha. No lo rellenes con memoria.

## Reglas de trabajo
- Rangos para no chocar: **A**: F1–F29 y D1–D299. **B**: F30–F59 y D300–D599. **C**: F60–F89 y D600–D899. Cada uno pone su propio F del sílabo dentro de su rango (el Director los une).
- Guarda la ficha **por partes** (tras cada lección), no al final: si te cortan, lo hecho queda.
- Al terminar corre `node .claude/herramientas/citas.js .claude/trabajo/mandarin/hsk5-gramatica/ficha-<letra>.md` y deja todo en OK (corrige citas que no aparecen; si un sitio bloquea, cambia de fuente y anótalo).
- Responde al Director con: fuentes usadas por lección, cuántos datos de uso por lección y la lista de «no encontrado». Breve.
