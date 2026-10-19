# Encargo para los investigadores · Mandarín, unidad 9 (HSK 4 · Frases complejas)

Lee antes: `plan.md` (esta carpeta), `.claude/docs/fuentes.md` (formato de la ficha, sitios bloqueados y los que funcionan en Mandarín) y `.claude/docs/materias/mandarin.md` (sección «Cómo se cita cada palabra y cada frase"). Modelo de ficha ya aprobada: `.claude/trabajo/mandarin/hsk3-comunicacion/ficha-a.md`.

## Qué entrega cada uno
Tu archivo `ficha-<letra>.md` en esta carpeta, con:

1. **F del sílabo** (url y nombre exactos como en el modelo). Un dato por palabra de tus lecciones, con su línea copiada de `lineas-silabo.txt` (esta carpeta; ya comprobada contra la caché de `citas.js`). Formato:
   `- Dn: Lección «<título>», punto: vocabulario (palabra k): 连, línea 1469 del 词汇大纲 de nivel 4 (China, 2025).`
   `  > 1469 4(5) 连 lián 介、(动、副)`
   (la cita es lo que va después de `=>`, tal cual).
2. **Gramática del 语法大纲 de nivel 4**, un dato por patrón de tus lecciones. El texto del sílabo sale así (copia un trozo contiguo de 5 piezas o más, con los `......` y la coma con espacio tal cual): `连......也/都...... , ......更......`, `不是...... ,而是...... 并列复句`, `不仅/不光...... ,还/而且...... 递进复句`, `尽管...... ,但是/可是...... ...... ,然而......`, `不管...... ,都/也...... 无论...... ,都/也......`, `即使...... ,也...... 就是......`, `既然...... ,就...... 汉 (由于)...... ,因此......` (el «汉» es marca de agua: busca un corte que no lo incluya, p. ej. `因果复句 既然...... ,就......`), `假设复句 要是...... ,就...... 要是......`, `...... ,否则...... 假设复句`, `...... ,于是...... ...... ,甚至......`. También existen en nivel 4 `不是...... ,就是......` (选择复句) y `...... ,不过......`.
3. **Uso, de fuente universitaria**: al menos **tres datos por lección**, cada uno con cita textual copiada de la página: (a) qué significa y qué une; (b) posición o pareja obligatoria (dónde va el conector frente al sujeto, qué palabra lo acompaña en la segunda parte, si se puede omitir); (c) un ejemplo de la fuente con su traducción. Si la fuente da una diferencia con el conector parecido de unidades anteriores (虽然, 因为, 如果, 不但) o con su gemelo (不管/无论/不论, 不仅/不光, 尽管/即使), es un dato más, muy bienvenido.
   - Fuentes que funcionan (ver `fuentes.md`): ChinGram de la Universidad Palacký (`chingram.upol.cz`, cubre poco HSK 4 pero prueba: tiene páginas de conectores), CTCFL de Oxford (`www.ctcfl.ox.ac.uk`, con `www.`; PDF «Elementary Chinese Grammar 2011»), MIT OCW (PDF de Wheatley `res21g_003_s_11.pdf`), MSU openbooks (`openbooks.lib.msu.edu`), Kapiolani CC en LibreTexts, Princeton, USC. Busca también cursos intermedios abiertos de otras universidades (Chinese 201/202, «intermediate Chinese grammar» en pressbooks, openbooks, `.edu`, `.ac.uk`).
   - **No** sirven como fuente universitaria: Chinese Grammar Wiki / AllSet Learning (ni sus copias en LibreTexts), blogs, academias comerciales, Wikipedia (solo apoyo).
   - Los ejemplos de las fuentes usan palabras fuera de nivel: cópialos igual en la cita; el Director decide si se usan.
4. Lo que no encuentres: escríbelo como «no encontrado: <qué>» al final de tu ficha. No lo rellenes con memoria.

## Reglas de trabajo
- Rangos para no chocar: **A**: F1–F29 y D1–D299. **B**: F30–F59 y D300–D599. **C**: F60–F89 y D600–D899. Cada uno pone su propio F del sílabo dentro de su rango (el Director los une).
- Guarda la ficha **por partes** (tras cada lección), no al final: si te cortan, lo hecho queda.
- Al terminar corre `node .claude/herramientas/citas.js .claude/trabajo/mandarin/hsk4-frases/ficha-<letra>.md` y deja todo en OK (corrige citas que no aparecen; si un sitio bloquea, cambia de fuente y anótalo).
- Responde al Director con: fuentes usadas por lección, cuántos datos de uso por lección y la lista de «no encontrado». Breve.
