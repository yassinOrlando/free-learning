# Materia: Mandarín (`mandarin`)

18 unidades, 140 lecciones (títulos en `js/temario.js`). Archivos: `lecciones/mandarin/<unidad>.js`. Niveles 1 a 6 del HSK 3.0. **Materia completa** (2026-10-19): las 18 unidades tienen archivo; el vocabulario de las tablas suma 1811 palabras. Nunca se enseña el nivel 7–9 del sílabo.

## Referencia
- La referencia es el sílabo oficial **«HSK 考试大纲»** (Centro de Educación y Cooperación Lingüística, CLEC; publicado en noviembre de 2025, en vigor desde julio de 2026). Trae por nivel: tareas (任务大纲), temas (话题大纲), vocabulario (词汇大纲), caracteres (汉字大纲) y gramática (语法大纲). URL y cómo leerlo: `fuentes.md`.
- El estándar GF0025-2021 (国际中文教育中文水平等级标准) es el marco del que sale el sílabo. Sus cifras por nivel son otras (500 palabras en el nivel 1, no 300): no las mezcles. Si se cita, se dice que es el estándar de 2021.
- Palabras acumuladas por nivel según el sílabo: 300, 500, 1000, 2000, 3600 y 5400. Cualquier cifra que aparezca en una lección es un dato de la ficha con su cita.
- Un punto de gramática o una palabra solo entra en una unidad si el sílabo lo pone en ese nivel o en uno anterior. Si el título de una lección de HSK 4 a 6 no cuadra con el sílabo, el Director propone el cambio en el `plan.md` y espera.

## Reglas propias
- Lector de 10 a 12 años que habla español y nunca vio chino. Compara un sonido con el español solo si una fuente lo respalda; lo propio se marca «simplificación de la lección».
- Caracteres **simplificados**. Los tradicionales solo se mencionan en "Qué es el mandarín y cómo se escribe".
- **Pinyin siempre con marcas de tono** (`nǐ hǎo`) junto a los caracteres, en toda la materia y en todos los niveles. Nunca pinyin solo con números ni caracteres sin pinyin. El pinyin se copia del sílabo tal cual (`bàba`, sin espacio y sin corregir).
- **不 y 一**: en frases propias van con su tono original (`bù tài`, `yī gè`) y la unidad avisa una vez de cómo se pronuncian; las palabras del sílabo que ya traen el cambio se escriben como el sílabo (`búguò`, `búyào`, `yìqǐ`, `yígòng`, `yìdiǎnr`). Lo mismo en 成语 y citas clásicas, aunque la fuente marque el cambio.
- Todo carácter chino sale de `zh()` (ver `formato-leccion.md`, punto 10), que pone `lang="zh-Hans"` a los caracteres y `lang="zh-Latn-pinyin"` al pinyin. `verificar.js` falla si hay un carácter fuera de `zh()`. Los títulos del temario no se tocan: los marca `app.js`.
- **Carga por lección**: HSK 1 y 2, hasta 12 palabras nuevas y 8 caracteres nuevos. HSK 3, hasta 15 palabras. HSK 4 a 6, hasta 20 palabras, sin tope de caracteres. La unidad 1 (sonidos y escritura) casi no enseña palabras: enseña el sistema.
- Las palabras nuevas van en **una** tabla de vocabulario (`table class="vocabulario"`, la pone el helper `tabla`; ver `formato-leccion.md`, punto 10), que alimenta el botón «Vocabulario» de la lección y de la materia (carácter, pinyin, significado) dentro de `.tabla-wrap`, con `<th>`. No van en `<strong>`: los 3 términos en negritas son para conceptos (tono, radical, clasificador).
- **Cobertura honesta**: HSK 1 y 2 cubren casi toda su lista de palabras. De HSK 3 a 6 se enseña toda la gramática y todos los temas, con una selección de palabras. La primera lección de cada unidad de HSK 3 a 6 lo dice y enlaza el sílabo.
- **Audio**: cada palabra nueva lleva su botón (lo pone `zh()`), que usa la voz del sistema. Nada depende solo del audio: todo ejercicio con `escucha` lleva `sinAudio` con el pinyin y la descripción del tono ("empieza alto y se mantiene"). Di una vez por unidad que la voz depende del dispositivo y que el pinyin manda.
- **Grabaciones** (`audio/zh/`): **desde la unidad 4, solo voz del sistema; no se descargan más grabaciones** (decisión del usuario, 2026-10-10). Las lecciones nuevas no llevan `audio:` en `zh()` ni en `escucha`. Las 134 grabaciones existentes se conservan en las unidades 1 a 3 (sílabas de la unidad 1, tabla completa en la unidad 2, 6 por lección en la unidad 3), con su crédito en `audio/zh/CREDITOS.md`. Si alguna vez se retoma: voz humana nativa de mandarín (Proyecto Shtooka; Lingua Libre solo si el hablante declara mandarín como lengua materna).
- **Ejercicios**: tonos con `pinyin` u `opciones` con `escucha`; orden de la frase con `ordenar` (con `pinyin` y `lang: 'zh-Hans'`); significado con `opciones`. No pidas escribir caracteres (no todos tienen teclado chino) ni traducir frases al español en `texto`; una palabra suelta en `texto` sí, con sus variantes.
- Frases de ejemplo entre «», nunca entre comillas rectas (`revisar.js` las toma por títulos).
- Cultura, historia y política de China: solo hechos con fuente, sin juicios. Datos de población, hablantes o países, con año.

## Decisiones del usuario sobre fuentes (desde la unidad 9)
- **Chinese Grammar Wiki (AllSet)** se acepta como fuente de apoyo (nombrada «fuente de apoyo no universitaria») para puntos de gramática sin regla universitaria (aceptado en la unidad 9 para una lección y luego para unidades enteras desde la 11). Wikipedia, Wikcionario y Wikisource, solo apoyo.
- **Punto sin ninguna fuente de uso**, aunque esté en el título de la lección (decisión de la unidad 13): se enseña con su línea del sílabo y frases propias marcadas «simplificación de la lección», sin matices ni comparaciones; si es secundario, solo se menciona.
- 成语, poemas, citas clásicas, nombres de dinastías y dialectos: cultura (pinyin y significado, fuera de la tabla, se evalúan por significado); pueden tener caracteres fuera de nivel. Textos clásicos de fuentes en tradicional, pasados a simplificado.
- Ejemplos de fuentes con política, religión, guerra, alcohol, pareja o violencia: no se copian. Lecciones de dinero y salud: solo lenguaje, sin consejos.

## Cómo se cita cada palabra y cada frase
- **Palabra y pinyin**: un dato de la ficha por palabra, con la línea del 词汇大纲 como cita, copiada de la caché de `citas.js`: `> 3 1 爸爸 bàba 名` (número, nivel, palabra, pinyin, categoría). `citas.js` acepta citas de 5 piezas si llevan caracteres chinos.
- **Significado en español**: redacción propia. Si se consulta CC-CEDICT (CC BY-SA 4.0), se cita en `fuentes` con su licencia; nunca se copia una definición larga.
- **Patrón gramatical**: dato de la ficha con la línea del 语法大纲 de su nivel.
- **Frases de ejemplo**: son propias, hechas solo con palabras y gramática ya citadas en la ficha, y la lección lo dice una vez ("las frases de ejemplo son de la lección"). El constructor no inventa palabras fuera de la ficha.
- **Tonos, trazos, radicales y cambios de tono**: fuente con cita (el sílabo, GF0025-2021, o una universidad); Wikipedia solo de apoyo.

## Auditoría (además de `auditoria.md`)
- Revisa uno por uno: cada `correcta`, cada pinyin contra la ficha (marca de tono y vocal donde va), cada `respuesta` y `alternativas` de `ordenar`, y que cada `sinAudio` diga lo mismo que el audio.
- Revisa que ninguna palabra o estructura sea de un nivel superior al de la unidad.

## Remisiones a otras materias (no repetir)
- Inglés: comparar el orden de la frase (sujeto, verbo, objeto) cuando esas lecciones existan.
- Lectura: "Comprensión lectora" y "Pensamiento crítico" para las lecciones de leer textos y textos de opinión.
- Matemáticas: "Porcentajes" y fracciones, en "Decimales, fracciones y porcentajes en chino".
- Finanzas personales: ahorro e inversión, en "Dinero: ahorro, inversión y consumo en chino".

## Fuentes candidatas (por verificar)
Sílabo «HSK 考试大纲» de 2025 (CLEC, comprobado), chinesetest.cn, GF0025-2021 (Ministerio de Educación de China), CC-CEDICT (MDBG, CC BY-SA 4.0), Instituto Cervantes e Institutos Confucio de universidades hispanohablantes, cursos abiertos de universidades (MIT OpenCourseWare en inglés), Wikimedia Commons y Lingua Libre (grabaciones y orden de trazos, licencia por archivo), Shtooka «Congcong» (CC BY).
