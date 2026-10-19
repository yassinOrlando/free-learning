# Notas del Director · Mandarín, unidad 17 (para el constructor y el auditor)

Las 105 palabras están en el sílabo, nivel 6 (`lineas-silabo.txt`). Lecciones temáticas: el tema da vocabulario y situación; la gramática de la columna del plan se enseña con lo que respalda la ficha. **Nunca nivel 7–9.**

## Decisiones y vetos
- Casi todos los 固定格式 de esta unidad **no tienen fuente de uso** (ni universidad ni AllSet). Como decidió el usuario (unidad 13): **sílabo + frases propias marcadas «simplificación de la lección»**, sin matices ni comparaciones. Explica qué expresa cada molde en una frase y da un ejemplo propio.
- **No se copian**: el ejemplo de Oxford de 看你X的 con bares y alcohol (D334–D336: usa solo la regla y el tono); el de Dartmouth sobre gastos médicos y familias pobres (D5x, 把 con sujeto no animado: usa solo la forma); frases de política, religión, finanzas reales o salud con consejo.
- **Lección 2**: solo lenguaje del dinero, ningún consejo de ahorro o inversión; remite a Finanzas personales (comprueba el título exacto en `js/temario.js`; `mandarin.md` sugiere «ahorro e inversión»). **Lección 5**: sin consejos médicos ni de dieta; describe situaciones. Datos reales: no; datos de ejemplo dichos así.

## Por lección (R regla / E ejemplos / S sílabo + frases propias / M mención)
- **1 · Noticias**: 把 R (Oxford: significado, verbo con complemento, orden, negación 没有/别; repaso de unidades 7 y 10). 把字句4 con sujeto no animado: **E** (Dartmouth L24, solo la forma; USC: la 把 canónica lleva sujeto animado) + frase propia (这场大雨把路冲坏了). 把 + quien hace la acción: **E** (USC: 他把我们哭得都烦死了, con su traducción; Dartmouth L19). Una «noticia» corta inventada, dicha así.
- **2 · Dinero**: **X归X，Y归Y y 放着X不Y: S**. Glosas de 储蓄, 投资, 股票 (Dartmouth) para la tabla.
- **3 · Tecnología de la información**: **早(也)不X，晚(也)不X y X了就X了，(没)有…: S**.
- **4 · Energía y desastres**: **东一A，西一A y A一+clasificador，B一+clasificador: S**; AllSet «一+clasificador+一+clasificador» («uno a uno») como pariente, dicho así. Gráfica de barras con datos de ejemplo (dichos así), `descripcion` sin caracteres.
- **5 · Alimentos y salud**: 看你X的 R (Oxford: reproche, forma 你看你…); **瞧他X的 y 这也不X，那也不Y: S**.
- **6 · Voluntariado**: 扇 y 枝 R (Oxford: 扇 para cosas verticales y planas como puertas y ventanas; 枝 para objetos como ramitas, 一枝钢笔); **卷: S** (el sílabo lo da como verbo, sustantivo y clasificador); 不X不…，一X… **E** (Iowa: 不看不知道，一看吓一跳); **好你个X: S**.
- **7 · Debates sobre educación**: **X到Y头上来了 y 看/瞧+把+O+X得: S**. Texto de debate propio (dos posturas, tema neutro, p. ej. ¿clases particulares o tiempo libre?) con preguntas que se responden con él; remite a Lectura («Hechos y opiniones», «Cómo se construye un argumento»: comprueba en el temario). Cierre de la unidad.

## Pinyin, nivel y formato
- Pinyin del sílabo; regla de 不/一 de `mandarin.md`.
- Permitidas: HSK 1–2; HSK 3 de unidades 7–8; nivel 4 de 9–12; nivel 5 de 13–15; nivel 6 de 16–17. `node .claude/trabajo/mandarin/hsk6-temas/nivel.js lecciones/mandarin/hsk6-temas.js`, cada aviso a mano; en frases propias, solo palabras permitidas.
- Explicación 480–560 (tope 650), ejemplo 125–180, **vida real 65–90**, 6 ejercicios, una tabla `vocabulario` de 15. Modelo: `lecciones/mandarin/hsk6-gramatica.js` y `hsk5-sociedad.js` (gráfica con `barras`).
- Todo carácter con `zh()`, también títulos citados y celdas; nunca en celdas de significado ni en `href`. Opciones en español con solo el carácter marcado.
- `ordenar` con todos los órdenes válidos; `opciones` con una sola correcta.
- Dudas del constructor 1, revisadas por el Director:
  - 股 suelto: el Director puso `zh("股", "gǔ")` (es parte de 股票, de la tabla; nunca pinyin sin carácter).
  - 老师把我们说得都笑了 (把 + quien hace la acción): revisa naturalidad; si dudas, usa el ejemplo de USC (他把我们哭得都烦死了) con su traducción y atribución.
  - Explicación de USC frente al sílabo (施事): que la lección no contradiga a USC; si hay dudas, «simplificación de la lección».
  - Significados de A一…，B一… y 东一A，西一A: S, marcados.
  - Remisión de L2 a «Ahorro» e «Inversión» (Finanzas personales): existen en el temario.
- Dudas del constructor 2, revisadas por el Director:
  - 他说到我头上来了 suena forzado: cambia el verbo por uno permitido que encaje con «llegar a afectar incluso a Y», p. ej. 批评 (unidad 10): «他批评到我头上来了», marcado S.
  - 看你X的: Oxford dice «reproche»; quita «de broma» o márcalo S.
  - 卷 «cosas enrolladas»: significado propio (S), vale.
  - 瞧他把老师问得笑了: revisa naturalidad; si dudas, usa un ejemplo más simple con 瞧把你高兴得 (molde del sílabo), marcado S.
  - Vida real de L6 y L7 al límite (67 y 65): súbelas un poco.
  - WAKE en https: bien.
