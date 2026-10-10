# Free learning

Sitio local-first y frontend-only con lecciones de lo que todo el mundo debería aprender (matemáticas, física, química, finanzas, ofimática, lectura…), con ejercicios interactivos al estilo [SQLBolt](https://sqlbolt.com/). Gratis para siempre, sin cuentas, sin anuncios ni rastreo: una carta de amor a la humanidad que explica los conceptos de forma ordenada, simple y clara para que cualquiera los entienda.

## Alcance
- Educación básica y media; educación superior queda fuera.
- Idiomas que se enseñan: solo Inglés (A1 a B1 del MCER) y Mandarín (nuevo HSK 3.0, niveles 1 a 3). Pronunciación con `speechSynthesis`; sin voz del sistema, el ejercicio sigue siendo usable (pinyin o transcripción).
- Interfaz y contenido solo en español por ahora. La i18n está planeada: todo texto visible sale de `js/textos.js` o `js/temario.js`, nunca hardcodeado.
- Materias: Autosuficiencia, Finanzas personales, Finanzas y economía, Inteligencia artificial, Matemáticas, Física, Química, Ciencias naturales, Ofimática, Lectura, Inglés, Mandarín.
- El temario (materias, unidades y lecciones en orden) vive solo en `js/temario.js`, la única fuente de verdad. No duplicarlo.

## Reglas que no se rompen
- **Cero instalación**: el sitio se usa abriendo `index.html` (`file://`). HTML, CSS y JS puro, sin frameworks, dependencias, servidor ni build.
- Bajo `file://`: nada de `<script type="module">`, `import`, `fetch()` ni `.json`. Los datos van en `.js` clásicos que asignan a `window`, cargados con `<script src>` en orden. Nada de CDN: fuentes, imágenes y librerías van dentro del proyecto.
- Accesibilidad AA, `lang` en el texto de otro idioma, íconos SVG y nunca emojis.
- Tras cualquier cambio: `node verificar.js` y `./empaquetar.sh` (regenera `descargar/free-learning.zip`; excluye `.claude/`, `descargar/` y `graphify-out/`).
- **No hacer commit salvo que el usuario lo pida.**

## Mapa
- `index.html` (ruteo por hash: `#/`, `#/materia/<id>`, `#/leccion/<materia>/<idLeccion>`, `#/como-usar`), `estilos.css`, `tipografia/`.
- `js/textos.js` (textos de la UI), `js/temario.js`, `js/ejercicios.js` (`slug()`, `registrarLeccion()`, `fraccion()`, `grafica()` y motor de ejercicios), `js/app.js` (vistas, carga diferida, progreso).
- `lecciones/<materia>/<unidad>.js`: contenido de una unidad, declarado con `archivo:` en el temario.
- `verificar.js`: valida el motor y que cada lección esté completa, coincida con el temario y acepte sus propias respuestas.
- `.claude/herramientas/`, scripts sin modelo:
  - `revisar.js <unidad.js>`: palabras, negritas, greps y títulos citados.
  - `render.js <unidad.js>`: gráficas a PNG.
  - `citas.js <ficha.md>`: URLs y citas de la ficha.
- `.claude/agents/`: `investigador` (Sonnet), `constructor` y `auditor` (Sonnet).
- `.claude/trabajo/<materia>/<unidad>/`: `plan.md`, `ficha.md` y `antes-auditoria.js` de cada unidad.

## Qué leer según la tarea (carga solo lo que necesites)
| Si vas a… | Lee |
|---|---|
| Escribir, rehacer o ampliar una unidad (Director) | `.claude/docs/flujo-unidad.md` |
| Reglas propias de una materia | `.claude/docs/materias/<id>.md` (si existe) |
| Redactar contenido: estructura, tono, cómo explicar, extensión, lecciones de referencia, temas sensibles | `.claude/docs/contenido.md` |
| Código de una lección: tipos de ejercicio, gráficas, accesibilidad, trampas conocidas | `.claude/docs/formato-leccion.md` |
| Auditar una unidad | `.claude/docs/auditoria.md` |
| Buscar o verificar fuentes, sitios bloqueados, formato de la ficha | `.claude/docs/fuentes.md` |
| Cambiar la UI, CSS o JS del sitio (progreso, PDF, accesibilidad de la UI, estilo editorial) | `.claude/docs/sitio.md` |
