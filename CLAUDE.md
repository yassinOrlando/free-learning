# Free learning

Sitio web local-first y frontend-only dedicado a lecciones sobre temas que todo el mundo debería aprender para su desarrollo como ser humano pensante: matemáticas, física, química, finanzas, ofimática, lectura, etc. Se aprende por medio de ejercicios interactivos al estilo [SQLBolt](https://sqlbolt.com/).

El sitio será gratis para siempre, y cualquier persona podrá usarlo con total libertad para aprender. Sin cuentas, sin anuncios, sin rastreo.

Esta es una carta de amor a la humanidad: en un mundo en el que la educación es un privilegio, este sitio explica los conceptos de forma ordenada, simple y clara para que cualquiera los pueda entender.

## Alcance
- Se cubren temas de educación básica y media. Temas de educación superior quedan fuera.
- Idiomas: solo Inglés (niveles A1 a B1 del MCER) y Mandarín (nivel elemental del nuevo HSK 3.0: niveles 1 a 3). Otros idiomas o niveles superiores quedan fuera.
- Idioma de la interfaz y del contenido: solo español por ahora. La internacionalización está planeada, así que todo texto visible debe salir de archivos de traducción/contenido, nunca hardcodeado en componentes.

## Materias
El temario completo (materias, unidades y lecciones en orden) vive en `js/temario.js`, que es la única fuente de verdad: el sitio se dibuja a partir de él. No duplicarlo en otros archivos.

Materias: Autosuficiencia, Finanzas personales, Finanzas y economía, Inteligencia artificial, Matemáticas, Física, Química, Ciencias naturales, Ofimática, Lectura, Inglés, Mandarín.

Para pronunciación en Inglés y Mandarín usar la API nativa `speechSynthesis` (voces del sistema, funciona sin internet en la mayoría de equipos) en lugar de grabar audios. Si el equipo no tiene voz para ese idioma, el ejercicio debe seguir siendo usable sin audio (mostrar pinyin o transcripción). <!-- TODO: aclarar qué significa "JEV" (venía junto a "IA y LLMs") -->

## Requerimientos
- **Cero instalación**: cualquier persona, sin conocimientos técnicos, debe poder usar el sitio con solo abrir `index.html` (doble clic, protocolo `file://`). Sin servidor, sin Node, sin build.
- Laptop first, pero usable en teléfono.
- Dark theme (tema principal).
- Exportar lección a PDF para imprimirla.
- Registro del progreso del usuario, con opción de resetearlo.
- Local-first y frontend-only: sin backend, sin base de datos remota, sin login. Funciona sin internet.
- Botón para descargar el sitio completo en `.zip`, más instrucciones de cómo abrirlo (página `#/como-usar` y `LEEME.txt`).
- Ejercicios interactivos estilo SQLBolt.
- La información se toma de recursos fiables y gratuitos de internet.
- Diseño de UI: usar la skill `ui-ux-pro-max` (instalada en `.claude/skills/ui-ux-pro-max`).
- Estilo visual **editorial**: oscuro cálido y plano, títulos en serif (Crimson Pro) y texto en Atkinson Hyperlegible, una sola tinta de acento (ocre), líneas finas en lugar de tarjetas. Evitar sombras, degradados, colores por materia, etiquetas en mayúsculas espaciadas, "píldoras" y efectos de elevación al pasar el cursor. Solo los ejercicios van enmarcados.

## Decisiones técnicas
HTML, CSS y JavaScript puro. Preferir siempre la opción nativa o más simple; nada de frameworks ni dependencias.

Restricciones de `file://` (no romperlas):
- Nada de `<script type="module">`, `import`, `fetch()` ni archivos `.json`: los navegadores los bloquean al abrir un archivo local. Los datos van en archivos `.js` clásicos que asignan a `window` (p. ej. `window.TEMARIO = [...]`), cargados con `<script src>` en orden.
- Nada de CDN ni recursos externos: todo (fuentes, imágenes, librerías) se guarda dentro del proyecto para que funcione offline.

Estructura:
- `index.html`: única página. Ruteo por hash: `#/`, `#/materia/<id>`, `#/leccion/<materia>/<idLeccion>`, `#/como-usar`.
- `estilos.css`: tokens de color en `:root`, tema oscuro, `@media print` para PDF.
- `js/textos.js`: todos los textos de la interfaz (`window.TEXTOS`).
- `js/temario.js`: temario (`window.TEMARIO`).
- `js/ejercicios.js`: `slug()`, `registrarLeccion()`, `fraccion()` y el motor de ejercicios (validación y UI).
- `js/app.js`: ruteo, vistas, carga diferida de lecciones y progreso.
- `lecciones/<materia>/<unidad>.js`: contenido de una unidad. Se carga al entrar a la materia.
- `verificar.js`: revisión automática (`node verificar.js`). Prueba el validador de respuestas y que cada lección esté completa, coincida con el temario y acepte sus propias respuestas. `empaquetar.sh` lo ejecuta antes de generar el zip.
- `tipografia/`: Atkinson Hyperlegible (fuente diseñada para máxima legibilidad), en local.
- `empaquetar.sh`: regenera `descargar/free-learning.zip`. **Ejecutarlo tras cualquier cambio** para que el botón de descarga entregue la versión actual. Excluye `.claude/` y `descargar/`.

Detalles:
- **Progreso**: `localStorage`, clave `free-learning:progreso:v1`, forma `{ idMateria: [idLeccion, ...] }`. El id de una lección es el slug de su título. Lecturas/escrituras dentro de `try/catch`; si falla, el sitio sigue sin progreso. API: `window.Progreso.completar(idMateria, idLeccion)`.
- **PDF**: `window.print()` + `@media print` (fondo claro, sin navegación). Sin librerías.
- **Fórmulas**: HTML y Unicode (`x²`, `√`, `·`, `<sup>`, `<sub>`). Si alguna vez hace falta KaTeX, copiarlo dentro del proyecto, nunca por CDN.
- **i18n**: textos en `js/textos.js` y `js/temario.js`. Otro idioma = otra copia traducida de esos archivos.
- **Accesibilidad**: navegación con teclado, foco visible, contraste AA, objetivos táctiles de 44px o más, `prefers-reduced-motion`, `lang="es"`, textos alternativos. Íconos en SVG, nunca emojis.
  - Bordes de campos y botones con contraste de 3:1 o más (token `--borde-control`). Nada que deba leerse por debajo de `.9rem`.
  - Encabezados sin saltos: H1 título, H2 secciones (los pone `app.js`) y, dentro de `explicacion`, `ejemplo` y `vidaReal`, solo `<h3>`.
  - En fórmulas clave, preferir `x²`/`x³` (Unicode, se leen "al cuadrado") sobre `<sup>`, o dar la lectura con `aria-label`.
  - Texto en otro idioma dentro de una lección (Inglés, Mandarín): envolverlo en `<span lang="en">` o `<span lang="zh">` para que el lector de pantalla use la voz correcta.
  - Ejercicios: cada campo se describe con su enunciado (`aria-describedby`), marca `aria-invalid` al fallar y la retroalimentación se reanuncia aunque el texto se repita. No enlazar a `#id` dentro de la página: el ruteo por hash lo tomaría como ruta.

## Estructura de una lección
Cada lección sigue el mismo orden:

1. **Objetivo**: qué sabrás hacer al terminar (una o dos frases).
2. **¿Para qué sirve en la vida real?**: aplicaciones concretas y cercanas, para motivar antes de aprender. Ej.: para qué sirve el trinomio cuadrado perfecto (calcular áreas, simplificar cálculos mentales, optimizar costos, etc.). Obligatorio en todas las lecciones. Como se lee *antes* de la explicación, no usa símbolos ni términos que la lección todavía no ha definido.
3. **Explicación**: el concepto, de lo simple a lo complejo, con lenguaje cotidiano y sin dar por sabido nada que no se haya visto en lecciones previas.
4. **Ejemplo resuelto** paso a paso.
5. **Ejercicios interactivos** (estilo SQLBolt).
6. **Fuentes**: enlaces a los recursos usados.

Las lecciones de un tema van en orden progresivo; cada una declara sus prerrequisitos.

### Formato de lección (código)
1. En `js/temario.js`, la unidad declara su archivo: `{ titulo, archivo: 'lecciones/matematicas/aritmetica.js', lecciones: [...] }`. Una unidad sin `archivo` muestra "Próximamente".
2. En ese archivo, cada lección se registra con el **título exacto del temario**:
```js
L('Porcentajes', {
  objetivo: 'texto',
  explicacion: `HTML`, ejemplo: `HTML`, vidaReal: `HTML`,
  ejercicios: [
    { tipo: 'numero', enunciado, respuesta: 450 * 40 / 15, pista, solucion },   // tolerancia opcional
    { tipo: 'opciones', enunciado, opciones: ['…'], correcta: 1, pista, solucion },
    { tipo: 'texto', enunciado, respuestas: ['…'], pista, solucion },
    { tipo: 'expresion', enunciado, respuesta: 'x^2 + 6x + 9', variables: ['x'], simplificar: true, pista, solucion },
  ],
  fuentes: [{ nombre, url }],
});
```
3. Escribir las respuestas numéricas como la operación (`450 * 40 / 15`) en vez del resultado, para que no haya errores de cálculo.
4. Usar `${F(3, 4)}` para fracciones apiladas. Para exponentes, preferir los caracteres Unicode (`x²`, `x³`, `10⁶`), que los lectores de pantalla leen bien ("x al cuadrado"); usar `<sup>` solo cuando no exista el carácter, como en `x<sup>n</sup>`. Clases útiles en el HTML: `.nota`, `.pasos-ej`, `.resultado`, `.tabla-wrap`.
5. Las respuestas `numero` aceptan cualquier valor equivalente (`0,5`, `1/2`, `3×10^5`). Si lo que se evalúa es la *forma* (por ejemplo, una fracción simplificada), preguntar por un dato concreto (el numerador) en lugar del valor.
6. **`expresion`** compara el *valor* de la expresión escrita contra `respuesta` en varios puntos (parser propio, sin `eval`). Así, `3x+5`, `5 + 3*x` y `x·3+5` valen lo mismo. `variables` es `['x']` por defecto. Con `simplificar: true`, la respuesta además no puede tener más números o letras que la esperada, ni paréntesis si la esperada no los tiene; así, copiar el enunciado no cuenta como correcto. Usar esta opción en todo ejercicio de "simplifica", "desarrolla" o "multiplica". Las respuestas `numero` y `expresion` pueden llevar un prefijo como `x =`, `y =`, `f(x) =`, `f′(x) =` o `f′(2) =` (constante `PREFIJO` en `js/ejercicios.js`).
7. **Gráficas**: `${G({ x: [-5, 5], y: [-5, 5], funciones: [{ f: (x) => 2 * x + 1, etiqueta: 'y = 2x + 1', serie: 0 }], puntos: [{ x: 0, y: 1, etiqueta: '(0, 1)' }], descripcion: '…' })}`, con `const G = window.grafica`. Genera un SVG en línea: funciona offline, respeta el tema y sale en blanco y negro al imprimir. `descripcion` es obligatoria, porque es lo que leen los lectores de pantalla. `serie` (0 a 2) fija el color; úsala para que dos trazos de la misma curva compartan estilo. Las gráficas se pueden poner dentro de `opciones` y en enunciados, y la clase `.dos-graficas` pone dos lado a lado.
   Para figuras geométricas: `proporcional: true` (misma escala en x e y, así un cuadrado se ve cuadrado), `ejes: false` (sin cuadrícula) y `figuras: [...]` con `{ tipo: 'poligono', puntos, abierto?, relleno? }`, `{ tipo: 'circulo', x, y, r }`, `{ tipo: 'linea', desde, hasta, punteada? }` (aristas ocultas, alturas), `{ tipo: 'angulo', x, y, desde, hasta, r?, etiqueta? }` (arco en grados, contra las manecillas del reloj) y `{ tipo: 'texto', x, y, texto }`. Las figuras usan un solo color salvo que se indique `serie`, y se recortan al área de la gráfica (los textos no). Para curvas con tramos verticales (hipérbola, circunferencia como función) es mejor una polilínea paramétrica (`poligono` con `abierto: true`) que `funciones`. Ver los helpers `fig`, `raya`, `oculta` y `txt` en `lecciones/matematicas/geometria.js`.
   Gráficas de datos: ver los helpers `barras`, `histograma` y `pastel` en `lecciones/matematicas/estadistica.js` (figuras con `solido: true` y `nombres: false`). Colores de series: tokens `--serie-1/2/3` en `estilos.css` (paleta categórica validada con la skill dataviz para el tema oscuro). Máximo 3 series o sectores; si hay más, usar barras o agrupar en "Otros". Las leyendas usan texto neutro con una muestra de color, y los valores se rotulan directamente.
   En ejercicios con π, usar `tolerancia` del 0.2% (π ≈ 3.14 desvía solo 0.05%; deja margen para redondear a un decimal).
8. **Accesibilidad del contenido** (además de lo que ya resuelve el motor):
   - Dentro de `explicacion`, `ejemplo` y `vidaReal`, solo subtítulos `<h3>`, nunca `<h2>` ni `<h4>`, para no romper el orden de encabezados.
   - Toda gráfica lleva una `descripcion` que diga lo que muestra (los valores o la forma), no solo "una gráfica".
   - El significado nunca depende solo del color: nombra cada curva o serie ("la recta y = 2x + 1"), no "la azul".
   - Las tablas llevan `<th>` en la fila o columna de encabezado.
   - Texto en otro idioma: `<span lang="en">` o `<span lang="zh">`.
   - No poner enlaces internos `href="#algo"`, porque el ruteo por hash los toma como página. Los enlaces externos (fuentes) sí van.
   - Sin emojis, ni como íconos ni como decoración.
9. Comprobar las URLs de las fuentes (deben responder 200) y ejecutar `node verificar.js`.

### Auditoría obligatoria al terminar cada unidad
Al terminar de crear una unidad, lanzar un subagente con el modelo **Sonnet** (más barato) que audite el archivo de la unidad completo:
- **Exactitud del contenido**: definiciones, reglas, ejemplos y datos correctos y sin ambigüedades, según fuentes fiables.
- **Ejercicios**: rehacer cada cálculo de forma independiente. La respuesta, la pista y la solución deben coincidir entre sí y con el enunciado; las opciones deben tener exactamente una correcta; no debe haber respuestas equivalentes que el validador rechace injustamente o respuestas incorrectas que acepte.
- **Pedagogía**: no usar conceptos que no se hayan visto en lecciones previas sin explicarlos; tono y redacción según la sección "Tono y redacción del contenido".
- **Accesibilidad**: que cada lección cumpla el punto 8 de "Formato de lección":
  - solo `<h3>` dentro de las secciones;
  - `descripcion` útil en cada gráfica;
  - nada que dependa solo del color;
  - `<th>` en las tablas;
  - `lang` en el texto de otro idioma;
  - sin enlaces `#` internos ni emojis;
  - exponentes con caracteres Unicode cuando existan.

  Si la unidad agrega componentes o estilos nuevos, revisar también el anillo de foco visible, el contraste de 3:1 en bordes de controles y que nada de lo que se lee mida menos de `.9rem`.
- **Claridad**: que cada lección cumpla "Cómo explicar" y esté al nivel de las "Lecciones de referencia". Debe abrir con algo conocido, dar el porqué de cada regla, leer las fórmulas con palabras, usar vocabulario para 10 a 12 años y frases completas, y respetar la extensión. "Vida real" no debe usar términos que la lección aún no ha definido. Señala los pasajes telegráficos o que dan algo por sabido.

El subagente corrige directamente lo que esté mal y reporta cada cambio. Después ejecutar `node verificar.js` y `./empaquetar.sh`.

## Ejercicios estilo SQLBolt
- La explicación y el ejercicio conviven en la misma página; el usuario practica justo después de leer.
- Cada ejercicio tiene: enunciado, entrada del usuario, validación inmediata, pista opcional y botón "ver solución".
- Validación tolerante: aceptar respuestas equivalentes (p. ej. `0.5`, `.5`, `1/2`; espacios y mayúsculas).
- Tipos de ejercicio esperados: respuesta numérica, opción múltiple, completar el paso faltante, ordenar pasos y, en ofimática, fórmulas de hoja de cálculo.
- Una lección se marca como completada al resolver todos sus ejercicios.

## Fuentes de contenido
Usar solo recursos fiables y de acceso gratuito, y citarlos en cada lección. Ejemplos:
- Khan Academy (español)
- OpenStax
- CK-12
- PhET (simulaciones de física y química, Universidad de Colorado)
- Wikipedia (solo como apoyo, contrastada con otra fuente)
- Sitios oficiales de educación financiera de bancos centrales y organismos públicos

No copiar texto literal: redactar con palabras propias y respetar las licencias (muchas son CC BY, que exige atribución).

## Tono y redacción del contenido
- Español neutro, tuteo, frases cortas.
- Definir cada término nuevo la primera vez que aparece.
- Preferir ejemplos cotidianos (compras, cocina, transporte, sueldo) sobre ejemplos abstractos.
- Nunca asumir que el lector "ya debería saber" algo.

### Cómo explicar
El texto debe sentirse como un buen maestro sentado a tu lado: amable y claro, sin saltarse nada esencial pero sin divagar.
- **Lector objetivo: alguien de 10 a 12 años** (o un adulto que nunca vio el tema). Usa palabras de todos los días y frases cortas. Antes de dar un nombre técnico, muestra un ejemplo concreto. Traduce el vocabulario académico ("razón de cambio", "valor inicial") a palabras simples ("cuánto sube cada vez", "con cuánto empiezas") antes de usarlo.
- **Parte de algo conocido.** Abre con una situación o pregunta cotidiana que haga necesario el concepto, y luego ponle nombre. Una o dos frases, no una historia.
- **El porqué antes del cómo.** Cada regla o atajo va acompañado de su razón en una frase: por qué funciona o de dónde sale. Nada de reglas "porque sí".
- **Lee las fórmulas en voz alta.** Después de cada fórmula, di con palabras qué calcula y qué significa cada letra.
- **Frases completas que se conectan.** Usa párrafos con transiciones ("Por eso…", "Fíjate que…", "Ahora bien…"). Usa listas solo para cosas de verdad paralelas (tipos, pasos), y cada elemento debe ser una frase completa, no un telegrama.
- **Una idea por párrafo**, de lo simple a lo complejo. Introduce a lo mucho 2 o 3 términos nuevos por lección.
- **Ejemplo resuelto con el porqué de cada paso.** Di qué se hace y por qué. Cierra con cómo comprobar el resultado y, si existe, el error más común (en una `.nota`).
- **La pista orienta y la solución enseña.** La `pista` señala el primer paso sin dar la respuesta. La `solucion` explica el razonamiento en 1 a 3 frases, no solo la operación.
- **Extensión justa**: explicación de unas **500 palabras de media** (entre 400 y 650), ejemplo de 120 a 180 y "vida real" de 60 a 90. El espacio extra es para pasos intermedios, comparaciones y mini-ejemplos con números pequeños, no para relleno. Quita lo que no ayude a entender: "como ya sabes", repeticiones y datos históricos que no expliquen nada.
- **Tono cálido y cercano, sin infantilizar.** Habla como a un adulto que nunca aprendió el tema: "tú", "fíjate", "imagina". Sin signos de exclamación, sin "¡es fácil!" y sin "simplemente".

### Lecciones de referencia
El estándar de calidad lo fijan **"Porcentajes"** (`lecciones/matematicas/aritmetica.js`) y **"Función lineal y pendiente"** (`lecciones/matematicas/funciones.js`). Antes de escribir o reescribir una lección, léelas y sigue sus técnicas:
- **Primero la experiencia, después el nombre**: algo concreto que el lector pueda imaginar (100 cuadritos de chocolate, el taxímetro). Luego una tabla o unos números pequeños que muestren el patrón. Al final, "a esto se le llama…" y la fórmula.
- **El símbolo con su significado en palabras**: cada letra de una fórmula se presenta con una frase simple en negritas ("b es **con cuánto empiezas**") y después su nombre técnico ("Se llama ordenada al origen"). Luego se conecta con el ejemplo del inicio ("En el taxi, b = 10").
- **Varias formas de ver lo mismo**: fracción, decimal y porcentaje; la tabla, la fórmula y la gráfica. Explica qué tienen en común.
- **Atajos con su razón**: "10% es dividir entre 10; por eso basta con recorrer el punto".
- **Subtítulos `<h3>` que son preguntas o tareas** ("¿Qué porcentaje es?", "Pendiente a partir de dos puntos"). Cada uno abre con la situación en la que lo necesitas ("A veces la pregunta es al revés…").
- **Comparaciones del mundo real** para las ideas abstractas: las rectas paralelas, "como los rieles del tren"; leer la gráfica de izquierda a derecha, "como cuando lees un libro".
- **Una `.nota` de "Trampa común"** en la explicación y otra de "Error común" en el ejemplo, cuando el tema la tenga.
- **El ejemplo resuelto narra cada paso** ("Primero calcula cuánto te descuentan…") y termina comprobando el resultado por otro camino.
