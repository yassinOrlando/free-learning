# Notas del Director · Mandarín, unidad 8 (para el constructor y el auditor)

`citas.js` da OK en las 30 fuentes. Las 75 palabras del plan están en el sílabo, nivel 3. ChinGram volvió a responder y cubre las lecciones 1, 2 y 5; las 3 y 4 se apoyan sobre todo en MIT OCW (Wheatley) y MSU.

## Audio y vocabulario
- Solo voz del sistema. Ningún `audio:`.
- **Una sola** tabla de vocabulario por lección con el helper `tabla` (`<table class="vocabulario">`), 15 palabras. Otras tablas, con `cuadro`.

## Cambios al plan (mandan sobre él)
- **Lección 1, 刚 y 刚才**: 刚 está en la gramática de nivel 3 (adverbio, antes del verbo); 刚才 solo en el vocabulario de nivel 3 como sustantivo (línea 642, F1·D34). Enseña 刚 como regla y 刚才 como palabra («hace un momento»), con el contraste que da ChinGram. Agrega 刚才 a la tabla de la lección 1 (pasa a 16 palabras: vale).
- **Lección 1, 又**: repetición ya ocurrida (ChinGram; MSU F45·D474); 再 para lo que aún no ocurre (unidad 6, "Hablar por teléfono").
- **Lección 2, 除了…以外**: solo Oxford (F10): con 还/也 = «además»; con 都 = «excepto». Sin segunda fuente: enséñalo tal como Oxford.
- **Lección 2, 离**: no se investigó; puedes repasarlo con lo de la unidad 6 ("Transporte y direcciones"), sin datos nuevos.
- **Lección 3, fiestas**: Año Nuevo: primer día del primer mes lunar, entre finales de enero y febrero (las fuentes dan «21 de enero a 19 o 20 de febrero»: di «entre el 21 de enero y el 20 de febrero, según el Museo Lam» o «a finales de enero o en febrero»); petardos, visitas a familiares, dumplings (饺子), sobres rojos (F27–F29). Se llama Festival de Primavera aunque sea invierno (D303). Medio Otoño: día 15 del octavo mes lunar; las familias se reúnen, miran la luna llena y comparten pasteles de luna; marca la cosecha (F30 gov.cn, F31, F32). La fecha de 2024 (17 de septiembre) solo como ejemplo con su año. Sin juicios culturales ni «los chinos siempre…».
- **Lección 3, gramática**: 对…来说 y 极了 tienen MIT y MSU. **在…看来 solo tiene la línea del sílabo**: menciónalo en una frase, sin regla ni ejercicio. 坏了 y 得很 (otras formas del 程度补语1) solo en el sílabo: no las enseñes.
- **Lección 4**: 看起来 (MIT) sí; **看上去 solo sílabo**: una mención. 认为 frente a 以为 (MIT: 以为 = creía algo que resultó falso). 先, 然后, 后来 (ChinGram distingue 然后 de 后来) y 最后 (solo en un diálogo de MSU): preséntalos como «palabras que ordenan un relato», sin una regla de 最后 más allá del ejemplo. 不是…吗: la fuente lo da como pregunta negativa «¿no es…?»; no la llames «retórica» como regla, di que sirve para pedir que el otro confirme («simplificación de la lección»). El texto de lectura es de la lección (inventado con palabras permitidas) y las preguntas de comprensión se responden con él.
- **Lección 5**: 又…又… (dos cualidades a la vez; con negación «ni… ni…») y 一点儿也不 + adjetivo («nada») de ChinGram. Modelos de mensaje de MSU (F44 carta, F45 correo): toma solo la **estructura** (saludo, cuerpo, despedida, firma, fecha; en el correo, remitente, destinatario y asunto). **No copies sus fórmulas** (亲爱的, 此致敬礼, 祝好, 发件人, 收件人, 主题): no son de los niveles 1 a 3. Usa 你好, 好久不见, 谢谢, 再见. El chino se teclea con un método de entrada de pinyin que muestra caracteres candidatos (F46, Miami University): una frase. Ningún ejercicio pide teclear caracteres.
- **Lección 5, cierre de HSK 3**: qué sabe hacer el lector y aviso de que HSK 3 fue una selección del nivel (unas 220 palabras de 500 en las unidades 7 y 8: no des la cifra; di «una selección»), con el sílabo en `fuentes`.

## Ejemplos y pinyin
- Las citas de MIT vienen de un PDF a dos columnas y mezclan pinyin e inglés: **nunca copies pinyin de ahí**. El pinyin de cada palabra sale de su línea del sílabo (fichas de todas las unidades en `.claude/trabajo/mandarin/*/ficha.md`).
- Ejemplos de las fuentes con palabras fuera de nivel: no se copian; se rehacen. Comprueba **por palabra** con un script contra el sílabo (caché de `citas.js`).
- 不 y 一 sueltos: tono original y aviso; palabras cuyo pinyin del sílabo ya trae el cambio (不见 bújiàn, 一定, 一样 yíyàng…): como el sílabo. 关系 es `3(4)` en el sílabo: vale.
- **Palabras permitidas**: las 500 de HSK 1 y 2, las 144 de la unidad 7 (plan de `.claude/trabajo/mandarin/hsk3-gramatica/plan.md`) y las de esta unidad en lecciones anteriores o la actual. Nada de nivel 4 o más, ni de nivel 3 fuera de esas listas.

## Formato y extensión
- Explicación de 480 a 560 palabras (tope 650); ejemplo 125 a 180; vida real 65 a 90. 6 ejercicios por lección.
- «Vida real»: 4 o 5 viñetas distintas, frases completas, sin caracteres ni términos aún no definidos, sin consejos.
- Modelo de cabecera, helpers y estilo: `lecciones/mandarin/hsk3-gramatica.js` (lee la cabecera y una lección).
- Todo carácter con `zh()`, también en títulos citados (sin pinyin dentro del título citado) y en `cuadro`; dentro de `${…}` comillas dobles. `descripcion` de la rosa de los vientos sin caracteres.
- `ordenar`: 3 piezas o más, `pinyin` paralelo, `lang: 'zh-Hans'`, órdenes válidos en `alternativas`. `opciones`: una sola correcta, sin distractores también válidos.
- `escucha`: `voz` siempre, `sinAudio` obligatorio; ni enunciado ni pista revelan lo que se oye.
- Frases de ejemplo entre «», declaradas «frases de ejemplo de la lección». Lo propio: «simplificación de la lección» o «recomendación de la lección».

## Tras el constructor (para el auditor)
- **No añadas reglas que estas notas vetan.** Si falta texto, un mini-ejemplo con palabras permitidas.
- **不**: la convención de la materia es el tono original en el pinyin mostrado (`bù shì`) y aviso de cómo se dice; la unidad 7 ya se corrigió así (salvo palabras del sílabo como 不但 búdàn). Las sílabas sueltas `zh("", "bú", { voz: '不' })` de la lección 4 son demostraciones de «se dice»: déjalas solo si el texto dice expresamente que es la pronunciación.
- **Nombres de las fiestas**: el constructor no usó 春节, 中秋节, 月饼 ni 红包 (fuera de nivel): está bien; las fiestas se nombran en español.
- **Hechos culturales** de la lección 3: compáralos uno por uno con F27–F32 (fecha del Año Nuevo según el Museo Lam, costumbres, Medio Otoño el día 15 del octavo mes lunar).
- **Lección 4**: cada pregunta de comprensión se responde con el texto de lectura de la lección; ningún distractor también correcto.
- **Explicaciones de 572, 565 y 579 palabras** (lecciones 1, 2 y 5): bajo el tope de 650; recorta solo si hay repeticiones.
- Script de pinyin contra las fichas de todas las unidades y script de nivel por palabra contra el sílabo.
