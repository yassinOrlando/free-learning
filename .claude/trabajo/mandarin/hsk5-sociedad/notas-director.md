# Notas del Director · Mandarín, unidad 14 (para el constructor y el auditor)

`citas.js` da OK en las 55 fuentes de `ficha.md`. Las 105 palabras están en el sílabo, nivel 5 (`lineas-silabo.txt`). Lecciones temáticas: el tema da vocabulario y situación; la gramática de la columna del plan se enseña con lo que respalda la ficha.

## Fuentes de apoyo, decisiones y vetos
- **AllSet**: apoyo para puntos sin regla universitaria. **Wikcionario** (较): solo apoyo.
- **Punto sin ninguna fuente de uso**: como decidió el usuario en la unidad 13, se enseña con su línea del sílabo y **frases propias marcadas «simplificación de la lección»**, sin matices ni comparaciones; o se menciona si es secundario.
- **No se copian**: D382 (frase militar), D393 (改革开放), cualquier cifra económica real; frases de política, religión o pareja. Lección 1: solo lenguaje, **ningún consejo médico ni de salud mental** (no digas qué hacer si alguien no duerme, etc.); describe situaciones.
- Pinyin de AllSet, MIT, Dartmouth y Oxford: nunca se copia.

## Por lección (R = regla con fuente; E = ejemplos de la fuente, «se usa así»; S = sílabo + frases propias; M = mención)
- **1 · Salud y bienestar emocional**: 相当 E/R (Dartmouth); 格外 R (AllSet); 老是 R (AllSet, Dartmouth: «siempre», a menudo con queja); 通常 E (Dartmouth); **过于, 极其, 时常: S** (grado alto / frecuencia, sin diferencias entre ellos ni con 太/非常/常常); complemento potencial V得/V不 R (Dartmouth, Oxford) — **吃不得 «no se debe»: S** (el sílabo lista 动词+得/不得), 舍不得 como ejemplo conocido (Dartmouth).
- **2 · Consumo y compras**: comparación con cantidad R (ChinGram: 你比我大三岁, 比你的贵五百元; la forma A+adj+B+cantidad del sílabo, p. ej. 他大我两岁: S); 把 con 一下/verbo repetido R (Oxford, Dartmouth) y 把+O1+V+给+O2 R (AllSet, Dartmouth 交给); **把…告诉… sin 给 y 把+O+一+V: S**; **较: S + Wikcionario de apoyo** («más… que», escrito).
- **3 · Hablar de educación**: 被/叫/让 + agente + 给 + verbo R (Oxford; repaso de unidades 7 y 10); 曾经 R (AllSet, Dartmouth: con o sin 过; negación con 没); 早已 E (Dartmouth); 亲自 E (Oxford); **届: S** (clasificador de promociones o ediciones: 第一届).
- **4 · Empresa y trabajo en equipo**: 彼此 R (Dartmouth, MIT, AllSet); 替 R («en lugar de / para», Dartmouth, MIT); orden de varios modificadores R (AllSet, MIT, ChinGram 跟: tiempo, lugar, manera…); verbos en serie R (MIT, AllSet; la relación de causa o condición del sílabo: S); 立刻 R (como 马上, ChinGram); 急忙 E (Dartmouth); **连忙, 尽快: palabras**; **同 preposición: S** («con», paralelo a 跟, dilo así). Sin diferencias entre 立刻/连忙/急忙/尽快.
- **5 · Ciudad y campo**: 朝 R (AllSet: dirección, frente a 往 con destino); (自)…以来 R (AllSet, Dartmouth); 沿 E (glosa de MIT «a lo largo de»); 有着 E (Dartmouth, otra frase); **V+有 (写有), 由…组成, 群 (clasificador): S**.
- **6 · Economía y comercio**: 据 R (Dartmouth, Oxford, AllSet frente a 根据); 凭 R (AllSet); 以及 R de apoyo (AllSet; contraste con 和, ChinGram); 即将 S con contraste (ChinGram (就)要…了: «pronto»); 从…来看 E (Dartmouth 从 + sustantivo); **依据, 没有…就没有…, 批: S** (AllSet (如果)没有…就… como pariente: dilo así). Gráfica de barras con datos de ejemplo (dichos así), `descripcion` sin caracteres.
- **7 · Naturaleza y recursos**: 始终 R (Dartmouth, contraste con 一直, ChinGram); 或是 E (Dartmouth; ChinGram 或者 como base); clasificadores 朵, 束, 根 R (Oxford), 颗 E (MIT); 如此 E (MIT, Oxford 如此看来); **或是…或是…, 不…不… (不见不散): S**. Cierre de la unidad: texto corto que mezcla puntos de varias lecciones, con preguntas que se responden con él.

## Pinyin, nivel y formato
- Pinyin del sílabo; regla de 不/一 de `mandarin.md`.
- Permitidas: HSK 1–2; HSK 3 de unidades 7–8; nivel 4 de 9–12; nivel 5 de 13–14. `node .claude/trabajo/mandarin/hsk5-sociedad/nivel.js lecciones/mandarin/hsk5-sociedad.js`, cada aviso a mano; palabras de función de su punto valen.
- Explicación 480–560 (tope 650), ejemplo 125–180, **vida real 65–90**, 6 ejercicios, una tabla `vocabulario` de 15. Modelo: `lecciones/mandarin/hsk5-gramatica.js` (cabecera, `tabla`, `cuadro`; `barras` de `hsk4-vida.js` para la gráfica).
- Todo carácter con `zh()`, también en títulos citados y celdas; nunca en celdas de significado ni en `href`.
- `ordenar` con todos los órdenes válidos; `opciones` con una sola correcta (gemelos: 过于/太, 立刻/马上, 据/根据, 以及/和, 始终/一直, 或是/或者).
- Frases de ejemplo entre «»; lo propio, «simplificación de la lección» o «recomendación de la lección».
- Dudas del constructor 1, revisadas por el Director:
  - 较: el sílabo lo lista dos veces: 较1 adverbio de grado («bastante, relativamente»: 这家店的东西较便宜) y 较2 preposición («en comparación con»). La lección debe distinguir ambos usos solo con eso (S), sin más matices.
  - «Unidades anteriores ya vieron 被»: cita las lecciones por título («La voz pasiva con 被», unidad 7; «La pasiva con 叫 y 让», unidad 10).
  - 有事找我 como verbos en serie: frase propia marcada, vale.
  - Explicaciones de 592–619: bajo el tope; recorta solo repeticiones.
  - Avisos de nivel 老是, 舍不得/不得, 同, 没: dentro de su punto, valen.
- Dudas del constructor 2, revisadas por el Director:
  - 根据 y 向 (nivel 3) solo como contraste con 据 y 朝 (AllSet): valen. 由, 自, 有着, 据说: dentro de su punto.
  - 不见不散 (散 nivel 6): ejemplo fijo de 不…不…, como expresión hecha con pinyin y significado; vale.
  - L6 凭/依据/即将 y L7 如此/或是…或是…/不…不…: S, marcados; bien.
  - Texto de cierre de L7 con datos ficticios: que lo diga.
