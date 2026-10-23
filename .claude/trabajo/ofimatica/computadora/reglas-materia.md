# Reglas de la materia: Ofimática (borrador)

> Borrador de `.claude/docs/materias/ofimatica.md`. El Director no puede editar `.claude/docs/`: lo copia el usuario al cerrar la unidad.
> Materia: `ofimatica` — «Usar la computadora, documentos, hojas de cálculo y presentaciones con confianza».
> Unidades: 1 La computadora (7) · 2 Procesador de textos (9) · 3 Hojas de cálculo (12) · 4 Presentaciones (4) · 5 Trabajo en la nube (3).
> Nace de la unidad 1 (`.claude/trabajo/ofimatica/computadora/plan.md` y `ficha.md`).

## Tono y lector

- Español neutro, tuteo, frases cortas y conectadas. Lector de 10 a 12 años o adulto que nunca vio el tema.
- Sin signos de exclamación, sin «simplemente», sin emojis (íconos solo SVG). No se asume el género del lector («tener que», «prepararte»).
- No se juzga a quien se equivoca: el error va en la nota de «Error común», nunca en un reproche.
- Nada de fragmentos tipo telegrama: frases completas, una idea por párrafo.
- Límites de `.claude/herramientas/revisar.js`: `explicacion` 400–650 palabras · `ejemplo` 120–180 · `vidaReal` 60–90. Máx. 3 `<strong>` por lección.

## Estructura de cada lección

Objetivo → «¿para qué sirve en la vida real?» (obligatorio; se lee antes, no usa términos no definidos) → explicación → ejemplo resuelto paso a paso → 6 ejercicios → fuentes.

## Términos y tablas

- Máximo 3 términos nuevos por lección, en negritas, con el equivalente en inglés la primera vez: `<strong>término</strong> (<span lang="en">term</span>)`. Si la palabra es igual en español y en inglés (hardware, software, URL), el paréntesis sobra y no se pone.
- Todo lo demás que haya que memorizar va en tabla con `<th scope="row">`. Tablas con `<th>` y dentro de `.tabla-wrap`.

## Marcas y nombres propios

- Se nombran sistemas operativos y navegadores concretos (Windows, macOS, Linux; Chrome, Firefox, Edge) **como ejemplos**, con la regla: primero el concepto genérico (ventana, icono, carpeta, pestaña, barra de tareas) y después el nombre propio donde la diferencia importa (por ejemplo, la tecla de atajo se llama Cmd en los equipos de Apple).
- No se recomienda ninguna marca ni producto, no se da consejos de compra, y no se nombran servicios concretos de una empresa (nada de «Windows Update»: se dice «el servicio de actualizaciones del sistema»).
- Sin buscador con nombre. El gestor de contraseñas se explica en general, sin nombres.
- `.claude/docs/contenido.md` prohíbe nombres de productos salvo que el temario los pida; en Ofimática la excepción la aprobó el usuario (2026-10-21) para sistemas y navegadores, nada más.

## Datos, países y cifras

- Los datos de organismos oficiales norteamericanos (NIST, CISA, StaySafeOnline) van con su país y su año: «(EE. UU., 2017)».
- Dónde denunciar un fraude: texto neutral, «el organismo de protección al consumidor o la policía de tu país». No se fija ningún país.
- Las cifras de los ejemplos son de ejemplo y se dicen.
- Un dato sin respaldo en la ficha no se afirma: se recorta la frase o se marca en el texto como criterio propio de la lección (así se hizo con los tres pasos posteriores a hacer clic en un fraude).

## Reglas propias de la materia

- Sin capturas de pantalla: los «pantallazos» son tablas HTML y diagramas SVG, con el texto describiendo lo que se ve.
- Nada de instalar ni de configurar: la unidad 1 enseña a usar y a reconocer.
- Cortes con otras materias: no se repiten los catálogos de otras materias, se remiten. Remisiones que ya funcionan: «Fraudes comunes y cómo evitarlos» y «Banca en línea y pagos digitales» (finanzas personales), «Deepfakes y contenido falso» (ia), «Verificar noticias y detectar desinformación», «Leer contratos y letras pequeñas» y «Leer instructivos y manuales» (lectura), «Cómo leer estadísticas en las noticias sin que te engañen» (matemáticas), «Linux: un sistema operativo libre», «Qué es el software libre» y «Por qué usar software libre» (autosuficiencia), «Escribir un correo informal» y «Escribir un correo formal» (inglés).
- Los títulos citados entre comillas tienen que existir en `js/temario.js`; los títulos de unidad no valen como remisión.

## Fuentes

- Principal: documentación oficial (`support.microsoft.com/es-es`, `support.apple.com/es-es`, `help.libreoffice.org/latest/es/`) y organismos oficiales (NIST, CISA, StaySafeOnline).
- Apoyo: Wikipedia en español, nunca como única fuente de un dato.
- Bloqueadas comprobadas: `support.mozilla.org` (desafío de bot), `rae.es` y `dle.rae.es` (403), `bne.es` (403), `cervantes.es` (500), `educ.ar` (inestable), `readingrockets.org`, `ies.ed.gov`, `britannica.com`, `oecd.org`, `incibe.org`, `osi.es`.
- El buscador web de esta sesión devuelve 0 resultados: se usa `webfetch` y `curl` sobre URLs directas.

## Pendiente para las unidades 2 a 5

- Sección de cortes entre unidades, con lo que se sepa de cada una al escribirla.
- Fuentes que funcionaron y bloqueadas nuevas, para `.claude/docs/fuentes.md`.

## Reglas que fija la unidad 2 (Procesador de textos)

- Programa de referencia: **LibreOffice Writer**. Regla de redacción: primero el concepto genérico (estilo, encabezado, índice, vista previa) y después el nombre del comando en el programa, para que el lector lo encuentre en el suyo aunque se llame distinto. No se nombran programas de Microsoft.
- Formatos: se enseñan los nombres (`.txt`, `.odt`, `.docx`, `.pdf`) y el aviso que aparece al guardar en formato de otro programa.
- La unidad tiene las 9 lecciones del temario: no se añade lección-proyecto (la U3 ya trae la suya).
- Cortes con otras materias: las reglas de escritura (acentuación, puntuación, estructura de un texto) son de Lectura; aquí solo la herramienta que las aplica. Una tabla de datos con fórmulas es de la U3.
- 9 lecciones → 3 fragmentos de 3 (L1-L3, L4-L6, L7-L9), un constructor nuevo por fragmento, cada uno añade al final del archivo.

## Lo que se aprendió en la unidad 2 (lo que faltaba)

- **Formato de los ejercicios**: el `pista` y el `solucion` se escriben como `<p>…</p>` con la etiqueta cerrada. Los tres constructores de la U2 los dejaron sin cerrar (282 casos) y lo corrigió el auditor. `verificar.js` no lo detecta: hay que revisarlo a mano.
- **Fuente de la ayuda de LibreOffice**: la ayuda en línea (`help.libreoffice.org/latest/es-ES/…`) se dibuja con JavaScript y su HTML no trae el texto, así que `citas.js` no puede verificar citas ahí. El texto plano oficial está en el repositorio `raw.githubusercontent.com/LibreOffice/help` (archivos `.xhp`). Se cita con el nombre «LibreOffice (en inglés), Help: …» y su URL; la versión española en línea existe para el lector, pero no sirve como fuente verificable.
- **Huecos de la ficha (U2)**: no hay cita para el aviso de formato al guardar, ni para mover o copiar filas y columnas de una tabla, ni para mantener las proporciones al redimensionar una imagen, ni para la herramienta de comentarios. Donde hacen falta, van como criterio de la lección y marcados como tales.
- **Diagramas de la U2**: 9 diagramas SVG (ciclo de guardado, alineaciones, jerarquía de títulos, listas y tablas, tres casos de anclaje, zonas de la página, cadena del índice, revisión con cambios, dos salidas del documento), todos con `descripcion`.
