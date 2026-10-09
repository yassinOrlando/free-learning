# Sitio: arquitectura, UI y accesibilidad

Lo lee quien cambia `index.html`, `estilos.css` o `js/`. Para diseño de UI usa la skill `ui-ux-pro-max` (`.claude/skills/ui-ux-pro-max`).

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

## Detalles técnicos
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

## Archivos del sitio
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
