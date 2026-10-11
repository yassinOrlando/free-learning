# Plan: Mandarín · Unidad 3: HSK 1 · Vida diaria

## Contexto
Unidades 1 y 2 cerradas (15 lecciones, 86 grabaciones, 1.09 MB en `audio/`). Sigue la unidad 3 con `flujo-unidad.md` y el mismo patrón de la unidad 2: tabla de palabras, frases de ejemplo de la lección, `ordenar`, `pinyin`, `escucha`.

- Archivo destino: `lecciones/mandarin/vida-diaria.js`. Carpeta de trabajo: `.claude/trabajo/mandarin/vida-diaria/`.
- 9 lecciones (títulos exactos de `js/temario.js`), 102 palabras nuevas, todas de nivel 1; ya comprobé cada una en la lista del sílabo (número de línea entre paréntesis).
- **Decisión del usuario sobre audio**: máximo 6 grabaciones humanas por lección; el resto de la tabla, voz del sistema. Tope de 2 MB se mantiene. Unidad 3 suma unas 54 grabaciones (cerca de 0.65 MB): `audio/` quedaría en unos 1.75 MB. La unidad 2 no se recorta. Aviso: la unidad 4 ya no cabría entera; se decide al llegar.

## Lecciones
En cada lista, las palabras con ▸ son las 6 que llevan grabación (si existe; si no, pasa la siguiente de la lista).

### 1. La familia
- Términos: **parentesco**.
- Idea central: el chino tiene una palabra distinta para hermano mayor y hermano menor, y otra para hermana mayor y menor: la edad va dentro de la palabra. 和 une dos personas o cosas («y»), no dos frases.
- Palabras (11): ▸家 (86), 家人 (87), ▸哥哥 (59), ▸姐姐 (92), ▸弟弟 (32), ▸妹妹 (123), 儿子 (48), 女儿 (153), 孩子 (68), ▸和 (78), 爱 (1). Repasa 爸爸 y 妈妈.
- Visual: árbol familiar sencillo en SVG con `G()` (figuras `linea` y `texto`, sin ejes) o tabla mayor / menor × hombre / mujer; tabla de palabras.
- Ejemplo resuelto: presentar a la familia en 4 frases (这是我哥哥; 我爱我家人; 我爸爸和我妈妈都是老师).
- Ejercicios: `opciones`, `ordenar` (2), `escucha`, `pinyin`, `texto`.
- Remisión: "Posesión con 的" (omitir 的 con la familia).

### 2. Fechas y días de la semana
- Términos: **fecha**.
- Idea central: la fecha va de lo grande a lo pequeño (año, mes, día) y casi todo se arma con números: los meses son número + 月 y los días de lunes a sábado son 星期 + número.
- Palabras (12): ▸年 (149), ▸月 (269), 日 (172), ▸号 (76), ▸星期 (243), 星期天 (245), 星期日 (244), ▸今天 (94), ▸明天 (129), 昨天 (297), 今年 (93), 明年 (128).
- Visual: tabla de los 7 días; tabla de armado de una fecha (2026年10月10号) frente al orden en español.
- Ejemplo resuelto: decir «hoy es sábado 10 de octubre» y preguntar 今天星期几 (几 se presenta aquí solo como pregunta por el número y remite a la lección 6).
- Ejercicios: `ordenar` (2), `numero` (qué mes es 八月), `opciones`, `escucha`, `pinyin`.
- Remisión: "Números del 0 al 100".

### 3. La hora
- Términos: **momento del día**.
- Idea central: la hora es número + 点, y los minutos número + 分. La palabra de tiempo va antes del verbo, nunca al final. Para las dos se dice 两点, no 二点.
- Palabras (12): ▸点 (33), ▸分 (55), ▸半 (7), ▸现在 (232), ▸早上 (275), 上午 (178), 中午 (291), 下午 (230), ▸晚上 (217), 时候 (185), 两 (111), 起床 (161).
- Visual: cuatro relojes en SVG con `G()` (círculo y dos manecillas) con su hora en chino; línea del día (早上 → 上午 → 中午 → 下午 → 晚上).
- Ejemplo resuelto: 现在几点 → 现在七点半; 我早上七点起床 (dónde va la hora en la frase).
- Ejercicios: `ordenar` (2), `opciones` con reloj, `numero`, `escucha`, `pinyin`.
- Remisiones: "Números del 0 al 100"; 两 se amplía en "Clasificadores: 个 y otros".

### 4. Tener: 有 y 没有
- Términos: (ninguno nuevo; repasa **negación**).
- Idea central: 有 es «tener» y también «haber». Es el único verbo que no se niega con 不: su negación es 没有.
- Palabras (10): ▸有 (263), ▸没有 (122), ▸猫 (119), ▸狗 (64), 车 (20), ▸钱 (164), 时间 (186), 问题 (220), ▸事 (187), 没事 (121).
- Visual: tabla afirmación / negación / pregunta (有 / 没有 / 有吗 / 有没有) frente a la de 是 (不是).
- Ejemplo resuelto: 你有哥哥吗 → 我没有哥哥, 我有姐姐; 你有没有时间.
- Ejercicios: `ordenar` (2), `opciones` (不 o 没), `escucha`, `pinyin`, `opciones`.
- Remisiones: "Negar con 不", "Preguntas con 吗".
- Nota: «Trampa común»: 不有.

### 5. Clasificadores: 个 y otros
- Términos: **clasificador**.
- Idea central: entre el número y la cosa va siempre una palabra de medida, como en español «tres hojas de papel» o «dos vasos de agua», pero para todo. 个 es el de uso general. Con clasificador, «dos» es 两.
- Palabras (12): ▸个 (60), ▸本 (10), ▸口 (104), ▸只 (287), ▸件 (89), ▸这个 (281), 那个 (138), 这些 (284), 那些 (141), 一些 (262), 椅子 (260), 桌子 (295).
- Visual: esquema número + clasificador + cosa; tabla de clasificadores con lo que cuentan (个 personas y general, 本 libros, 口 miembros de la familia, 只 animales, 件 ropa y asuntos) y un ejemplo.
- Ejemplo resuelto: 三个人, 两本书, 一只猫, 我家有四口人; 这个 / 那个 frente a 这 / 那.
- Ejercicios: `opciones` (elige el clasificador, 2), `ordenar` (2), `escucha`, `pinyin`.
- Remisiones: "Números del 0 al 100", "La familia".
- Nota: «Trampa común»: 二个 y 三书.

### 6. Preguntar cantidades: 几 y 多少
- Términos: (ninguno nuevo).
- Idea central: 几 pregunta por cantidades pequeñas y lleva clasificador; 多少 pregunta por cualquier cantidad y puede ir sin él. La respuesta pone el número en el lugar de la palabra de pregunta.
- Palabras (10): ▸几 (85), ▸多少 (47), ▸岁 (199), ▸多 (46), ▸少 (180), ▸电话 (35), 千 (162), 房间 (52), 学校 (250), 课 (103).
- Visual: tabla pregunta → respuesta alineadas (你家有几口人 / 我家有四口人; 你几岁 / 我十一岁).
- Ejemplo resuelto: preguntar la edad, cuántas personas hay en la familia y cuántos alumnos tiene la escuela.
- Ejercicios: `opciones` (几 o 多少, 2), `ordenar` (2), `numero`, `escucha`.
- Remisiones: "Presentarte: 我叫…" (palabra de pregunta en su sitio), "Clasificadores: 个 y otros".

### 7. Dónde está algo: 在
- Términos: **lugar**.
- Idea central: 在 es «estar en»: persona o cosa + 在 + lugar. No se usa 是 para decir dónde está algo. 哪儿 y 哪里 preguntan lo mismo.
- Palabras (12): ▸在 (271), ▸哪儿 (134), 哪里 (133), ▸这儿 (283), 这里 (282), ▸那儿 (140), 那里 (139), ▸医院 (257), 商店 (174), 公司 (62), ▸住 (294), 超市 (19).
- Visual: tabla aquí / allí / dónde en sus dos formas (儿 / 里); esquema sujeto + 在 + lugar.
- Ejemplo resuelto: 你在哪儿 → 我在学校; 我爸爸在医院; 你住在哪儿.
- Ejercicios: `ordenar` (2), `opciones` (是 o 在), `escucha`, `pinyin`, `opciones`.
- Remisión: "El verbo 是". Arriba, abajo, dentro y fuera quedan para la unidad 4.

### 8. Comprar: 多少钱
- Términos: **precio**.
- Idea central: el precio se pregunta con 多少钱 y se responde con número + 块. 块 es la palabra hablada y 元 la escrita en etiquetas. La frase del precio no lleva verbo.
- Palabras (10): ▸买 (116), 卖 (117), ▸块 (105), 元 (268), ▸贵 (65), ▸便宜 (157), ▸水果 (193), ▸苹果 (159), 店 (34), 书店 (191).
- Visual: tabla de una compra en 4 turnos; etiqueta de precio (元) frente a lo que se dice (块).
- Ejemplo resuelto: 这个多少钱 → 二十块 → 太贵 / 很便宜 → 我买两个.
- Ejercicios: `ordenar` (2), `numero` (cuánto cuestan 3 a 15 块), `opciones`, `escucha`, `pinyin`.
- Remisiones: "Preguntar cantidades: 几 y 多少", "Clasificadores: 个 y otros". Sin productos ni marcas; precios «de ejemplo».

### 9. Comida y bebida: 想 y 要
- Términos: (ninguno nuevo).
- Idea central: 想 + verbo es «tener ganas de»; 要 + cosa o verbo es «querer» con decisión, y es lo que se usa para pedir. Para decir que no quieres, lo suave es 不想.
- Palabras (12): ▸想 (233), ▸要 (252), ▸吃 (21), ▸饭 (50), 米饭 (125), 面条儿 (127), ▸饺子 (90), 包子 (8), 鸡蛋 (84), ▸牛奶 (151), 菜 (16), 好吃 (72). Repasa 喝, 茶, 水.
- Visual: tabla 想 / 要 con ejemplo; tabla de comidas y bebidas.
- Ejemplo resuelto: pedir en un comedor: 你想吃什么 → 我想吃饺子 → 你要喝什么 → 我要一杯茶 (杯 como medida, remite a clasificadores).
- Cierre de unidad: mini-diálogo que junta familia, hora, lugar, precio y comida.
- Ejercicios: `ordenar` (2), `opciones` (想 o 要), `escucha`, `pinyin`, `opciones`.

## Datos (lista cerrada)
- **Palabras**: una línea del 词汇大纲 por palabra (102).
- **Gramática del sílabo, nivel 1** (语法大纲, una línea cada uno): frase con 有 («表示领有»); 没(有); clasificadores (专用名量词: 本、个、家、口、块、件、只、元; 借用: 杯); medidas de tiempo (日、号、岁、点、分、年、天); 二/两; pronombres interrogativos (几, 多少, 哪儿, 哪里); demostrativos (这儿, 那儿, 这里, 那里, 这些, 那些, 这个, 那个); preposición y verbo 在; expresión de fechas y días; expresión de la hora; expresión de cantidades de dinero; verbos auxiliares 想 y 要; conjunción 和; tiempo y lugar como circunstancia antes del verbo.
- **Temas y tareas del sílabo, nivel 1**: familia, fecha y hora, compras, comida (para «vida real»).
- **Uso, con fuente de universidad** (ChinGram de la Univ. Palacký, Kapiolani CC, MIT OCW, WKU u otra):
  1. Hermanos mayores y menores tienen palabras distintas.
  2. 和 une sustantivos, no frases.
  3. Orden de la fecha: año, mes, día.
  4. Meses = número + 月; días de la semana = 星期 + número; domingo con 天 o 日.
  5. 号 es lo hablado y 日 lo escrito.
  6. Hora con 点, minutos con 分, media con 半.
  7. La expresión de tiempo va antes del verbo.
  8. 两 (no 二) ante clasificador y en 两点.
  9. 有 se niega con 没, no con 不.
  10. Entre número y sustantivo va un clasificador; 个 es el general.
  11. 几 para cantidades pequeñas, con clasificador; 多少 para cualquiera, clasificador opcional.
  12. Sujeto + 在 + lugar.
  13. 哪儿 y 哪里 significan lo mismo (uso regional).
  14. 块 hablado y 元 escrito.
  15. 多少钱 para preguntar el precio.
  16. 想 + verbo (deseo) frente a 要 (querer, pedir).
  17. 不想 como negativa habitual de «querer».
- Opcionales: 口 como clasificador de miembros de la familia; 你几岁 solo para niños.
- Lo que no aparezca se reporta «no encontrado»; nunca una cita parecida.

## Reparto (4 investigadores en paralelo, Sonnet)
- A → `ficha-a.md`, F1–F19, D1–D199: lecciones 1 a 3, usos 1 a 8.
- B → `ficha-b.md`, F20–F39, D200–D399: lecciones 4 a 6, usos 9 a 11.
- C → `ficha-c.md`, F40–F59, D400–D599: lecciones 7 a 9, usos 12 a 17.
- D → `ficha-d.md`, F60 en adelante, D600+: grabaciones solo de las palabras ▸ (54) y, de respaldo, las dos siguientes de cada lista. Wikimedia Commons (Shtooka `Zh-<pinyin>.ogg`, preferencia Wei Gao; Lingua Libre solo si la página declara hablante nativo de mandarín). CC0, CC BY o CC BY-SA. Pausas de 4 s.
- Todos copian las citas de la caché de `citas.js`; D solo con números.

## Fuentes abreviadas
- **Sílabo** = «HSK 考试大纲» 2025 (URL en `.claude/docs/fuentes.md`, sección Mandarín). Cada palabra: su línea del 词汇大纲 copiada tal cual desde la caché (`> 59 1 哥哥 gēge 名`); el número entre paréntesis de cada lección es el número de línea.
- **Univ.** = material abierto de una universidad (lista de las que funcionan en `fuentes.md`, sección Mandarín). Wikipedia solo de apoyo.
- El pinyin de las lecciones sale siempre del sílabo, nunca de otra fuente ni de memoria.
