# Plan: Mandarín · Unidad 6: HSK 2 · Situaciones

## Contexto
Unidades 1 a 5 cerradas (42 lecciones). La unidad 6 cierra HSK 2 con situaciones de uso y con las palabras de nivel 1 y 2 que aún no se enseñaron.

**Decisión del usuario**: agregar 2 lecciones a la unidad para completar la lista de HSK 1 y 2. La unidad pasa de 6 a 8 lecciones y Mandarín de 138 a 140.

- Archivo destino: `lecciones/mandarin/hsk2-situaciones.js`. Carpeta de trabajo: `.claude/trabajo/mandarin/hsk2-situaciones/`.
- 96 palabras nuevas: 33 de nivel 1 pendientes (marcadas °) y 63 de nivel 2. Todas comprobadas en la lista del sílabo (número de línea entre paréntesis).
- Tras esta unidad quedan sin tabla propia solo unas pocas palabras gramaticales de nivel 2 (地, 面, 点 como «un poco», 那样…); la última lección las nombra con honestidad.
- Audio: solo voz del sistema. Ningún `audio:`.

## Cambio en `js/temario.js` (lo hace el Director antes de lanzar constructores)
Unidad «HSK 2 · Situaciones», lecciones en este orden:
1. Transporte y direcciones
2. El clima
3. En la tienda
4. En el médico
5. Pasatiempos
6. Hablar por teléfono
7. **La gente: familia y nombres** (nueva)
8. **Un día completo: repaso de HSK 2** (nueva)

También: `README.md` y `.claude/docs/materias/mandarin.md` pasan de 138 a 140 lecciones.

## Lecciones

### 1. Transporte y direcciones
- Términos: **dirección**, **distancia**.
- Idea central: para decir qué tan lejos queda algo se usa 离 (A 离 B 很近). Para indicar el camino, 往 + lado + 走. Izquierda y derecha funcionan como las demás palabras de posición.
- Palabras (12): 路 (392), 路上 (393), 离 (389), 左 (499), 右 (481), 左边 (500), 右边 (482), 旁边 (413), 前面 (419), 后面 (356), 到° (29), 分钟° (56).
- Visual: plano sencillo con `G()` (dos calles, escuela, estación, flechas) rotulado en pinyin y español; tabla de posiciones.
- Ejemplo resuelto: 请问, 地铁站怎么走 → 往前走, 到路口… (sin 路口: 往前走, 到商店往左走); 学校离我家很近, 走路十分钟.
- Ejercicios: `ordenar` (2), `opciones` con plano, `numero`, `escucha`, `pinyin`.
- Remisiones: "Destacar cuándo, dónde y cómo: 是…的" (medios de transporte), "Arriba, abajo, dentro y fuera…".

### 2. El clima
- Términos: (ninguno nuevo).
- Idea central: se pregunta con 怎么样 y se responde con un adjetivo o con lo que pasa (下雨了). 还 añade «todavía» o «además». Sirve para comparar hoy con ayer usando 比.
- Palabras (12): 晴 (420), 阴 (475), 天° (207), 白天° (5), 怎么样° (277), 还° (67), 外面 (447), 里面 (390), 上面 (426), 下面 (459), 花 (357), 鸟 (411).
- Visual: tabla de cuatro climas con su frase; gráfica de barras con `G()` de temperaturas de ejemplo de tres días.
- Ejemplo resuelto: 今天天气怎么样 → 今天晴天, 比昨天热 → 外面还在下雨.
- Ejercicios: `opciones`, `ordenar` (2), `numero` (leer la gráfica), `escucha`, `pinyin`.
- Remisiones: "Algo cambió: 了 al final de la frase", "Comparar con 比".

### 3. En la tienda
- Términos: (ninguno nuevo; repasa **precio**).
- Idea central: pedir ver algo (给我看一下), opinar (好看, 漂亮), preguntar y regatear con lo ya sabido. 万 es una unidad propia: diez mil.
- Palabras (12): 商场 (424), 票 (416), 门票 (402), 花 (358), 万 (449), 条 (443), 包 (307), 手表 (434), 好看° (73), 漂亮° (158), 给° (61), 一半° (258).
- Visual: tabla de un diálogo de compra; tabla de números grandes (千, 万) con su lectura.
- Ejemplo resuelto: 这条裤子多少钱 → 太贵了 → 我花了一百块; leer 两万 como 20 000.
- Ejercicios: `numero` (2: 三万; mitad de precio), `ordenar` (2), `opciones`, `escucha`.
- Remisiones: "Comprar: 多少钱", "Clasificadores: 个 y otros".

### 4. En el médico
- Términos: **consejo**.
- Idea central: decir qué te pasa y entender lo que te indican. 别 + verbo es «no hagas»; 让 dice que alguien pide o deja que otro haga algo; el tiempo que dura algo va después del verbo (睡了八个小时).
- Palabras (12): 看病° (100), 眼睛 (467), 坏 (360), 睡° (194), 小时° (236), 别 (311), 让 (422), 起来 (418), 动 (338), 不要° (15), 有些° (266), 周 (492).
- Visual: tabla síntoma → consejo; esquema verbo + 了 + duración.
- Ejemplo resuelto: 你哪儿不舒服 → 我头疼, 眼睛也有些疼 → 别看手机, 多休息 → 医生让我休息一周.
- Ejercicios: `ordenar` (2), `opciones` (别 o 不), `numero` (horas), `escucha`, `pinyin`.
- Remisiones: "Causa y efecto: 因为…所以…" (salud), "Poder y saber…". Sin consejos médicos reales: las frases son de ejemplo y lo dicen.

### 5. Pasatiempos
- Términos: **afición**.
- Idea central: hablar de lo que te gusta hacer y con qué frecuencia. 有的…有的… reparte un grupo («unos… otros…»); 哪些 pregunta por varias cosas.
- Palabras (12): 爱好 (302), 饭馆 (339), 早饭° (274), 晚饭° (216), 面包° (126), 有的° (264), 哪些° (135), 哪个° (132), 这样 (489), 那样 (407), 啊 (301), 飞 (340).
- Visual: tabla de aficiones con verbo ya conocido (唱歌, 跳舞, 游泳, 踢足球, 画); tabla de frecuencia (每天, 经常, 有时).
- Ejemplo resuelto: 你有什么爱好 → 我喜欢游泳, 每周游两次 → 我们有的喜欢唱歌, 有的喜欢跳舞.
- Ejercicios: `ordenar` (2), `opciones`, `escucha`, `pinyin`, `texto`.
- Remisiones: "Complemento de grado: 得", "En cuanto: 一…就…".

### 6. Hablar por teléfono
- Términos: (ninguno nuevo).
- Idea central: una llamada tiene frases fijas: 喂 para contestar, 请问 para preguntar por alguien, 位 para referirse a una persona con respeto y 吧 para proponer. Para quedar: lugar + 见.
- Palabras (12): 喂° (218), 先生° (231), 女士° (155), 位 (453), 见° (88), 再° (270), 吧° (4), 不好意思 (313), 门口 (401), 过去 (350), 上去 (427), 下来 (458).
- Visual: diálogo de llamada en tabla de turnos; tabla de fórmulas (contestar, pedir repetir, despedirse).
- Ejemplo resuelto: 喂, 请问王先生在吗 se evita (王 no está en la lista): 喂, 请问老师在吗 → 不好意思, 请再说一次 → 我们在学校门口见吧 → 我一会儿过去.
- Ejercicios: `ordenar` (2), `opciones` (respuesta adecuada, 2), `escucha`, `pinyin`.
- Remisiones: "Saludar: 你好", "Ir y venir tras el verbo: 来 y 去".

### 7. La gente: familia y nombres (nueva)
- Términos: **apellido**.
- Idea central: en chino el apellido va primero y se pregunta con el verbo 姓. Las palabras de persona se arman con 男 y 女 delante.
- Palabras (12): 爷爷 (470), 奶奶 (409), 丈夫 (487), 妻子 (417), 男° (142), 女° (152), 男孩儿 (410), 女孩儿 (412), 男朋友° (143), 女朋友° (154), 姓 (464), 姓名 (465).
- Visual: árbol familiar con `G()` de tres generaciones; tabla 男 / 女 + palabra.
- Ejemplo resuelto: 您贵姓 se evita si la fuente no lo respalda: 你姓什么 → 我姓… (apellido en letras latinas) → 这是我爷爷, 那是我奶奶.
- Ejercicios: `opciones`, `ordenar` (2), `escucha`, `pinyin`, `texto`.
- Remisiones: "La familia", "Presentarte: 我叫…".

### 8. Un día completo: repaso de HSK 2 (nueva)
- Términos: (ninguno nuevo).
- Idea central: un texto corto de un día entero que junta las situaciones y la gramática de HSK 2, con las últimas palabras de la lista. La lección enseña a leer un párrafo: primero quién, cuándo y dónde; después qué pasa.
- Palabras (12): 本子 (308), 笔 (310), 间 (366), 洗手间 (457), 名 (404), 些° (239), 小孩儿 (461), 小朋友° (235), 过 (347), 游 (477), 时 (431), 正 (491).
- Visual: el texto en tres bloques (mañana, tarde, noche) con preguntas de comprensión; tabla «gramática de HSK 2 que aparece».
- Ejemplo resuelto: leer el primer bloque paso a paso.
- Cierre de HSK 2: qué sabe hacer ya el lector; aviso honesto de las pocas palabras gramaticales de nivel 2 que no tuvieron tabla, con el sílabo en `fuentes`.
- Ejercicios: `opciones` de comprensión (3), `ordenar` (2), `pinyin`.
- Remisión: Lectura, "Comprensión lectora" (cuando exista).

## Datos (lista cerrada)
- **Palabras**: una línea del 词汇大纲 por palabra (96).
- **Gramática del sílabo, niveles 1 y 2** (语法大纲): 方位名词 左、右 y sufijo 面 · 介词 往 y 从 · 祈使句 con 别 · 兼语句1 (请/叫/让) · 数量补语2 (duración) · 量词 条、位、间、名 · 数词 万 · 语气助词 吧 y 啊 · 指示代词 这样、那样 · 疑问代词 怎么样、哪些 · 副词 还、再 · 有的…有的…
- **Temas del sílabo, nivel 2**: transporte, clima, compras, salud, aficiones, comunicación, familia.
- **Uso, con fuente de universidad** (ChinGram primero; Kapiolani CC, MIT OCW, MSU):
  1. A 离 B + 近/远. 2. 往 + dirección + verbo. 3. Posiciones con 边 o 面 (左边, 前面).
  4. 怎么样 pregunta cómo es o cómo está algo. 5. 还: «todavía» y «además».
  6. 给 como «dar» y como «a/para» alguien. 7. 万 = diez mil; números grandes se cuentan de cuatro en cuatro cifras. 8. 条 para cosas largas (pantalones, caminos, peces).
  9. 别 + verbo: prohibir o aconsejar no hacer. 10. 让 + persona + verbo. 11. Duración después del verbo.
  12. 有的…有的…: «unos… otros…». 13. 哪些 para preguntar por varios.
  14. 吧 para proponer o suavizar. 15. 位 como clasificador de respeto. 16. 再: otra vez, para algo que aún no ocurre.
  17. El apellido va antes del nombre. 18. 姓 como verbo (我姓…).
- Lo que no aparezca se reporta «no encontrado» y esa afirmación sale de la lección; nunca una cita parecida.

## Reparto (3 investigadores en paralelo, Sonnet; sin audio)
- A → `ficha-a.md`, F1–F19, D1–D199: lecciones 1 a 3, usos 1 a 8.
- B → `ficha-b.md`, F20–F39, D200–D399: lecciones 4 a 6, usos 9 a 16.
- C → `ficha-c.md`, F40–F59, D400–D599: lecciones 7 y 8, usos 17 y 18, más las líneas del sílabo de las palabras de nivel 2 que quedan sin tabla (para el aviso final).
- Se les pide desde el inicio al menos tres datos de uso por lección (en la unidad 5 una ficha llegó corta).

## Fuentes abreviadas
- **Sílabo** = «HSK 考试大纲» 2025 (URL en `.claude/docs/fuentes.md`, sección Mandarín). Cada palabra: su línea del 词汇大纲 copiada tal cual desde la caché; el número entre paréntesis de cada lección es el número de línea. Las palabras marcadas con ° son de nivel 1; las demás, de nivel 2.
- **Univ.** = material abierto de una universidad (lista de las que funcionan en `fuentes.md`, sección Mandarín). Wikipedia solo de apoyo.
- El pinyin de las lecciones sale siempre del sílabo, nunca de otra fuente ni de memoria.
