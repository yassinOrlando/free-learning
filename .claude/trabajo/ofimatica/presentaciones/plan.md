# Plan · ofimatica · Unidad 4: Presentaciones

- Archivo destino: `lecciones/ofimatica/presentaciones.js` (materia `ofimatica`).
- Ficha: `.claude/trabajo/ofimatica/presentaciones/ficha.md`.
- 4 lecciones, 6 ejercicios cada una (24 ejercicios). Escritura en **2 fragmentos** de 2 lecciones: L1–L2 y L3–L4 (un constructor nuevo por fragmento; cada uno **añade** al final del archivo, nunca reescribe). El segundo fragmento añade `archivo: 'lecciones/ofimatica/presentaciones.js'` a `js/temario.js`.
- Reglas de la materia: `.claude/trabajo/ofimatica/computadora/reglas-materia.md` (borrador de `.claude/docs/materias/ofimatica.md`; el Director no puede editar `.claude/docs/`).
- Unidades anteriores de la materia: U1 «La computadora» (7), U2 «Procesador de textos» (9), U3 «Hojas de cálculo» (12), escritas y auditadas.
- Programa de referencia: **LibreOffice Impress**. Regla: primero el concepto genérico (diapositiva, plantilla, notas, vista del presentador) y después el nombre del comando en el programa. No se nombran programas de Microsoft.
- Títulos exactos de `js/temario.js` (no se cambian sin que el usuario lo pida):
  1. Diseño de diapositivas
  2. Menos texto, más ideas
  3. Imágenes y gráficos en presentaciones
  4. Cómo presentar en público
- No hay lección-proyecto: el temario no la trae y la unidad es corta. Los ejercicios de cierre de la L4 hacen de práctica integradora.

## Cortes con las demás unidades y materias

| Lo que hay en esta unidad | Lo que NO se toca aquí |
|---|---|
| Anatomía y coherencia de una diapositiva (L1) | No se enseña teoría del color ni diseño gráfico: «El color» (Física) solo se remite si hace falta, y aquí el color se trata como contraste legible. |
| Recorte del texto (L2) | Las reglas de escritura (idea principal, resumen, estructura de un texto) son de Lectura: aquí solo el recorte aplicado a una diapositiva. |
| Imágenes (L3) | La edición de imágenes (recortar, retocar, exportar) es de Autosuficiencia: aquí solo insertarlas bien y con licencia. |
| Gráficos en una diapositiva (L3) | Cómo se construye un gráfico en una hoja es de la U3 («Gráficos»); qué se puede leer en un gráfico y sus tipos son de Matemáticas y Lectura. |
| Hablar en público (L4) | No se enseña oratoria clásica ni argumentación: «Cómo se construye un argumento» y «Falacias comunes» son de Lectura. Aquí la puesta en escena con diapositivas. |
| Remisiones que sí se usan | L1 → «Atajos de teclado esenciales» (U1). L2 → «Idea principal e ideas secundarias», «Hacer un resumen», «Estructura de un texto» (Lectura). L3 → «Gráficos» (U3), «Gráficas: barras, pastel e histogramas» (Matemáticas), «Leer gráficas e infografías» (Lectura), «Diseño, foto, audio y video libres» (Autosuficiencia). L4 → «Cómo se construye un argumento» (Lectura). |

## 1. Diseño de diapositivas

- **Apertura**: dos presentaciones con el mismo contenido: una se lee sin esfuerzo y otra cansa. La pregunta es qué cambia de una a otra.
- **Términos (máximo 3 en negritas)**:
  - **diapositiva** (<span lang="en">slide</span>): cada pantalla de una presentación;
  - **plantilla** (<span lang="en">template</span>): el modelo de diseño que fija fuentes, colores y posiciones;
  - **contraste** (<span lang="en">contrast</span>): la diferencia de claridad entre el texto y el fondo que lo hace legible.
- **Idea central**: una presentación es una secuencia de pantallas, y cada pantalla tiene zonas fijas: el título arriba, el cuerpo debajo, márgenes a los lados. La coherencia es lo que la hace legible: el mismo título en el mismo sitio, la misma letra en todas las diapositivas, dos o tres colores y no diez. Eso no se hace a mano diapositiva por diapositiva, se hace con una **plantilla** y con el patrón de diapositivas, que es la hoja maestra que comparten todas. Y el **contraste** es la regla que más se incumple: texto oscuro sobre fondo claro (o al revés) y una diferencia suficiente entre los dos; la referencia práctica es la del 4.5 a 1 de las guías de accesibilidad. Y una letra tiene que verse desde el fondo de la sala: un texto de 40 puntos se lee, uno de 12 no. Y el espacio vacío no es espacio perdido: es lo que permite que los ojos encuentren el título y el cuerpo.
- **Visual**: diagrama de una diapositiva con sus zonas rotuladas (título, cuerpo, márgenes, zona libre) y `descripcion`; más una tabla «elemento / regla / por qué» con `<th scope="row">`: título, cuerpo, letra, colores, márgenes, proporción de la pantalla.
- **Ejemplo resuelto**: montar tres diapositivas coherentes a partir de una plantilla, paso a paso (elegir la plantilla → comprobar la posición del título → escribir el cuerpo → revisar el contraste de los colores → comprobar la letra desde lejos o reduciendo el zoom → duplicar la disposición en la diapositiva siguiente).
- **Remisiones**: «Atajos de teclado esenciales» (U1, para la presentación en pantalla), L2 (cuánto texto va en el cuerpo).
- **Fuentes a buscar**: ayuda de LibreOffice Impress (patrón de diapositivas, fondo, diseños, tamaño de la diapositiva) y W3C WCAG (contraste mínimo). Wikipedia como apoyo.
- **Ejercicios (6)**: `opciones` ×3 (qué hace una plantilla; qué mide el contraste; qué zona debe quedar libre), `texto` (definición de «diapositiva» o «plantilla»), `ordenar` (los pasos para dejar coherente un conjunto de diapositivas) y `numero` (cuántas zonas tiene la diapositiva del diagrama).

## 2. Menos texto, más ideas

- **Apertura**: una diapositiva con un párrafo de nueve líneas. Mientras el público lo lee, nadie escucha. La pregunta es qué deja y qué quita.
- **Términos (máximo 3 en negritas)**:
  - **guion** (<span lang="en">outline</span>): la lista ordenada de ideas que va a seguir la presentación;
  - **punto clave** (<span lang="en">key point</span>): la única idea que el público debe llevarse de una diapositiva;
  - **notas del orador** (<span lang="en">speaker notes</span>): el texto que solo ves tú mientras presentas.
- **Idea central**: una diapositiva no es un documento. El documento se lee solo; la diapositiva acompaña a alguien que está hablando, y si tiene todo el texto, el público lee y deja de escuchar. Por eso el primer paso es el **guion**: qué ideas van y en qué orden, antes de abrir el programa. Después, una diapositiva por **punto clave**, y en el cuerpo, frases cortas o palabras, no párrafos. Lo que se recorta no se pierde: se va a las **notas del orador**, que no se proyectan. Y hay tres recortes que sirven casi siempre: quitar la frase que solo sirve de introducción, convertir la enumeración larga en tres elementos y dejar los números importantes solos, en grande, en lugar de meterlos en una tabla de doce filas. Y una regla de higiene: si la diapositiva se entiende sin ti, sobra texto; si no se entiende ni contigo, falta claridad.
- **Visual**: diagrama con la misma idea en tres versiones (párrafo de 90 palabras → tres viñetas → tres palabras clave) con `descripcion`; más una tabla «qué sobra / a dónde va / ejemplo».
- **Ejemplo resuelto**: recortar un párrafo real de 90 palabras hasta una diapositiva de seis, paso a paso (leer el párrafo y marcar la idea que se queda → tachar lo que repite → pasar a tres frases → dejar palabras clave → llevar el texto completo a las notas → comprobar que el título dice la idea y no el tema).
- **Remisiones**: «Idea principal e ideas secundarias», «Hacer un resumen», «Estructura de un texto» (Lectura).
- **Fuentes a buscar**: ayuda de LibreOffice Impress (notas, vista esquema, consola del presentador) y Wikipedia como apoyo. Si no hay fuente para la «regla de las seis palabras», no se enseña como regla: la lección habla de una idea por diapositiva y del recorte.
- **Ejercicios (6)**: `opciones` ×3 (dónde va el texto que sobra; qué es un punto clave; qué pasa cuando la diapositiva lleva un párrafo), `texto` (definición de «guion» o «notas del orador»), `ordenar` (los pasos para recortar un párrafo) y `numero` (cuántas palabras quedan tras el recorte).

## 3. Imágenes y gráficos en presentaciones

- **Apertura**: la foto se ve enorme y borrosa en el proyector, y el gráfico tiene doce líneas que nadie distingue. La pregunta es cómo elegirlos y cómo ponerlos.
- **Términos (máximo 3 en negritas)**:
  - **resolución** (<span lang="en">resolution</span>): la cantidad de píxeles de una imagen, que decide si se ve nítida al agrandarla;
  - **relación de aspecto** (<span lang="en">aspect ratio</span>): la proporción entre el ancho y el alto de una imagen;
  - **texto alternativo** (<span lang="en">alt text</span>): la descripción escrita de una imagen, para quien no puede verla.
- **Idea central**: una imagen en una diapositiva tiene un trabajo: apoyar la idea, no rellenar el hueco. Si no aporta nada, se quita. Y hay dos números que la arruinan: la **resolución** (una imagen pequeña estirada hasta llenar la pantalla se ve pixelada, y el proyector lo nota más que tu monitor) y la **relación de aspecto** (si arrastras la esquina sin mantener la proporción, la imagen se deforma; se recorta o se escala con la proporción sujeta). Y el origen importa: hay imágenes de uso libre (dominio público, licencias libres) y otras con derechos; la regla práctica es comprobar la licencia, dar el crédito que pida y no usar el logo ni la foto de otra persona como si fuera propia. Y el **texto alternativo**: una frase que describe lo que se ve, y que sirve a quien usa un lector de pantalla y también a ti cuando la imagen no carga. Con los gráficos, la misma disciplina: un mensaje por gráfico, el tipo elegido según la pregunta (columnas para comparar, líneas para ver la evolución, pastel para partes de un total), etiquetas legibles, sin adornos en tres dimensiones y con la fuente del dato.
- **Visual**: diagrama de tres versiones de la misma foto (estirada y deformada, recortada, escalada con proporción) con `descripcion`; más una tabla «tipo de gráfico / pregunta que responde / cuándo no usarlo» con `<th scope="row">`.
- **Ejemplo resuelto**: arreglar una diapositiva con una foto deformada y un gráfico ilegible, paso a paso (medir la imagen y comprobar la resolución → volver a escalarla con la proporción sujeta → recortar lo que sobra → escribir el texto alternativo → sustituir la tabla de doce filas por un gráfico de columnas con el título y la fuente).
- **Remisiones**: «Gráficos» (U3), «Gráficas: barras, pastel e histogramas» (Matemáticas), «Leer gráficas e infografías» (Lectura), «Diseño, foto, audio y video libres» (Autosuficiencia).
- **Fuentes a buscar**: ayuda de LibreOffice Impress (insertar imagen, recortar, propiedades, texto alternativo), W3C (texto alternativo y contraste de gráficos) y Wikipedia como apoyo. Si no hay fuente para la licencia de imágenes, se explica como criterio de la lección sin dar cifras ni nombres de servicios.
- **Ejercicios (6)**: `opciones` ×3 (qué pasa al estirar una imagen; qué describe el texto alternativo; qué gráfico responde a una evolución), `texto` (definición de «relación de aspecto» o «resolución»), `ordenar` (los pasos para colocar bien una imagen) y `numero` (cuántos píxeles de ancho tiene una imagen de proporción 16:9 que mide 720 de alto: 720 × 16 ÷ 9).

## 4. Cómo presentar en público

- **Apertura**: la presentación está lista y aun así la noche anterior no se duerme. La pregunta es qué se puede preparar para que el momento salga bien.
- **Términos (máximo 3 en negritas)**:
  - **ensayo** (<span lang="en">rehearsal</span>): decir la presentación en voz alta antes de hacerla, con reloj;
  - **contacto visual** (<span lang="en">eye contact</span>): mirar a personas concretas del público, no a la pantalla;
  - **ritmo** (<span lang="en">pace</span>): la velocidad a la que hablas y las pausas que dejas.
- **Idea central**: hablar en público es una habilidad que se practica, no un don. La preparación empieza por el público: qué sabe ya, qué necesita saber y qué tiene que hacer al final. Con eso se arma una charla de tres partes: una apertura que diga por qué importa, un cuerpo con dos o tres ideas (una por diapositiva) y un cierre que diga qué hacer con lo escuchado. Después, el **ensayo** en voz alta y con reloj: es lo que revela si sobran diapositivas y si las frases se pueden decir. Y el día de la presentación, la mecánica: llegar antes, probar el equipo, tener una copia en otro formato por si el programa falla, y usar la vista del presentador para ver las notas sin que el público las vea. Y el cuerpo: de pie, con las manos libres, mirando a tres o cuatro personas repartidas por la sala, hablando más despacio de lo que parece normal y con pausas, que es el **ritmo**. Y los nervios: son normales, se reducen con ensayo y con respiración lenta, y si el miedo impide hablar en situaciones cotidianas, pedir ayuda es una opción razonable. Y las preguntas: repetir la pregunta en voz alta, responder corto y, cuando no se sabe, decirlo y ofrecer averiguarlo.
- **Visual**: línea de tiempo de una charla de diez minutos con sus tres partes y los minutos de cada una, con `descripcion`; más una tabla «problema / qué hacer antes / qué hacer durante» con `<th scope="row">`: el proyector no enciende, se olvida una idea, el público pregunta algo que no sabes, hablas demasiado rápido.
- **Remisiones**: L2 (el guion de la charla), L1 (la vista de la presentación), «Cómo se construye un argumento» (Lectura).
- **Sensitive**: los nervios se tratan sin dramatismo y sin consejo médico; se dice que pedir ayuda está bien. Nada de estadísticas de miedo escénico sin fuente.
- **Fuentes a buscar**: ayuda de LibreOffice Impress (presentación en pantalla, consola del presentador, ensayar intervalos, exportar a PDF) y W3C si hace falta para subtítulos. Wikipedia como apoyo.
- **Ejercicios (6)**: `opciones` ×3 (qué hacer si el proyector no funciona; qué es ensayar; a quién se mira al hablar), `texto` (definición de «ensayo» o «ritmo»), `ordenar` (los pasos de la preparación de una charla) y `numero` (cuántas diapositivas caben en 10 minutos a 2 por minuto, o el reparto de minutos).

## Reglas de la unidad

- **Términos en inglés**: la primera vez, el término en español y el original en `<span lang="en">`. Si la palabra es igual en español y en inglés, el paréntesis sobra.
- **Máximo 3 `<strong>` por lección** en la explicación. Lo demás que haya que memorizar va en tabla con `<th scope="row">`.
- **Extensión**: `explicacion` 400–650 palabras · `ejemplo` 120–180 · `vidaReal` 60–90. Frases completas y conectadas, una idea por párrafo.
- **Estructura**: objetivo → «¿para qué sirve en la vida real?» (obligatorio, se lee antes y sin usar términos no definidos) → explicación → ejemplo resuelto paso a paso → ejercicios → fuentes.
- **Tono**: español neutro, tuteo, «fíjate»/«imagina». Sin signos de exclamación, sin «simplemente», sin emojis. No se juzga a quien se equivoca: el error va en la nota de «Error común». No se asume el género del lector.
- **Ejercicios**: 6 por lección, tipos `numero`, `opciones`, `texto` y `ordenar`. Respuestas numéricas como la operación (`720 * 16 / 9`). Índices `correcta:` repartidos. Cada `pista` y cada `solucion` se escriben como `<p>…</p>` **con la etiqueta cerrada** (lo que falló en las U2 y U3).
- **Visuales**: diagramas con el helper `diagrama` (cajas, flechas, `txt`), lienzo proporcional y `descripcion` obligatoria; tablas con `<th>` dentro de `.tabla-wrap`. Revisar con `render.js` que ningún texto se solape. Ojo: los diagramas de diapositiva y de línea de tiempo llevan mucho texto corto; comprobar el ancho de las cajas antes de dar el fragmento por cerrado.
- **Sin capturas de pantalla**: los «pantallazos» son tablas HTML y diagramas SVG, con el texto describiendo lo que se ve.
- **Programa de referencia**: LibreOffice Impress, con la regla de primero el concepto genérico y después el nombre del comando. No se nombran programas de Microsoft.
- **Marcas**: no se recomiendan servicios ni se nombran plataformas de imágenes, de videollamadas ni de plantillas. Los bancos de imágenes se explican en general.
- **Remisiones**: los títulos citados entre comillas tienen que existir en `js/temario.js`; los títulos de unidad no valen como remisión.
- **Datos por país**: esta unidad no tiene cifras con país. Todos los datos de los ejemplos son inventados y se dicen.
- **Cero instalación**: nada de `import`, `fetch()`, `.json`, `<script type="module">`, CDN ni dependencias.

## Decisiones tomadas (2026-10-22)

1. Programa de referencia: **LibreOffice Impress**, igual que Writer y Calc en las unidades anteriores.
2. **Nervios y preguntas entran en la L4**, sin dramatismo y sin consejo médico; se dice que pedir ayuda está bien. No se usan estadísticas de miedo escénico sin fuente.
3. **No se enseña la «regla 6×6»** ni ninguna cifra de palabras por viñeta como regla: la lección habla de una idea por diapositiva y de recortar hasta dejar palabras clave. Si la ficha la respalda con una fuente sólida, se puede mencionar como criterio, nunca como norma.
4. **Licencias de imágenes: sí**, explicadas en general (dominio público, licencias libres, crédito), sin nombrar servicios ni dar cifras de años de copyright.
5. **Accesibilidad: sí**, con el contraste de la L1, el texto alternativo y la descripción en voz alta de la L3 y los subtítulos en la L4.

## Pendiente al implementar

- Añadir a `.claude/trabajo/ofimatica/computadora/reglas-materia.md` lo que esta unidad fije: Impress como programa de referencia, licencias de imágenes sin marcas, y el trato de los nervios.
- Comprobar en la ficha que la ayuda de Impress cubre patrón de diapositivas, notas, textos alternativos, ensayar intervalos y exportar a PDF; lo que no cubra va como criterio de la lección.
