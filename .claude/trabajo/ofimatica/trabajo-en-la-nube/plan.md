# Plan · ofimatica · Unidad 5: Trabajo en la nube

- Archivo destino: `lecciones/ofimatica/trabajo-en-la-nube.js` (materia `ofimatica`).
- Ficha: `.claude/trabajo/ofimatica/trabajo-en-la-nube/ficha.md`.
- 3 lecciones, 6 ejercicios cada una (18 ejercicios). **Un solo constructor** para las tres lecciones (caben en un fragmento); añade al final la línea `archivo: 'lecciones/ofimatica/trabajo-en-la-nube.js'` a `js/temario.js`.
- Reglas de la materia: `.claude/trabajo/ofimatica/computadora/reglas-materia.md` (borrador de `.claude/docs/materias/ofimatica.md`; el Director no puede editar `.claude/docs/`).
- Es la última unidad de la materia: al cerrarla, Ofimática queda completa (5 unidades).
- Títulos exactos de `js/temario.js` (no se cambian sin que el usuario lo pida):
  1. Almacenamiento en la nube
  2. Documentos compartidos y colaboración
  3. Videollamadas

## Cortes con las demás unidades y materias

| Lo que hay en esta unidad | Lo que NO se toca aquí |
|---|---|
| Qué es la nube y cómo se sincroniza (L1) | Archivos y carpetas, y qué es un archivo, ya están en la U1 («Archivos y carpetas»): aquí solo su copia remota. |
| Compartir y colaborar (L2) | Los estilos, los comentarios y el control de cambios del documento son de la U2 («Ortografía, comentarios y control de cambios»): aquí quién puede entrar y qué puede hacer. |
| Videollamadas (L3) | Las contraseñas, la verificación en dos pasos y los fraudes son de la U1 («Seguridad digital: contraseñas y fraudes en línea»): aquí solo el enlace de la reunión y quién entra. |
| Remisiones que sí se usan | L1 → «Archivos y carpetas» y «Seguridad digital: contraseñas y fraudes en línea» (U1). L2 → «Ortografía, comentarios y control de cambios» (U2), «Correo electrónico» (U1). L3 → «Seguridad digital: contraseñas y fraudes en línea» (U1), «Deepfakes y contenido falso» (IA), «Banca en línea y pagos digitales» (Finanzas personales). |

## 1. Almacenamiento en la nube

- **Apertura**: el mismo archivo en la computadora del trabajo, en el teléfono y en la de casa. La pregunta es dónde está de verdad.
- **Términos (máximo 3 en negritas)**:
  - **nube** (<span lang="en">cloud</span>): el conjunto de servidores de otra empresa donde se guardan tus archivos y a los que llegas por internet;
  - **sincronización** (<span lang="en">sync</span>): mantener la misma versión de un archivo en todos tus equipos;
  - **copia de seguridad** (<span lang="en">backup</span>): una copia aparte, que sobrevive aunque borres el original.
- **Idea central**: «la nube» no es un lugar abstracto: es un disco de otra empresa al que llegas por internet. Eso da dos ventajas (lo ves desde cualquier equipo y no se pierde si se rompe el tuyo) y una responsabilidad (tu cuenta es la puerta). La **sincronización** hace que la carpeta sea la misma en todos los equipos, y ahí está la trampa más común: si borras un archivo en un equipo, desaparece de los demás, y si un programa lo sobrescribe, se sobrescribe en todas partes. Por eso sincronizar no es hacer una **copia de seguridad**: la copia de seguridad es aparte, no se sincroniza y sobrevive al borrado. Y la puerta: contraseña larga y distinta, verificación en dos pasos, y cuidado con lo que se sube (un documento con datos de otras personas no va a una carpeta compartida por enlace). Y dos costumbres: compartir por persona antes que por enlace abierto, y saber qué pasa cuando no hay conexión (algunos archivos se pueden marcar para usarlos sin internet, y se actualizan al volver).
- **Visual**: diagrama de un archivo en dos equipos y el servidor en medio, con una flecha de borrado que se propaga a los tres, y al lado una copia de seguridad aparte que no se entera; tabla «sincronizar / respaldar» con `<th scope="row">`.
- **Ejemplo resuelto**: ordenar las carpetas de una cuenta, paso a paso (decidir qué va a la nube y qué no → crear la carpeta → comprobar que aparece en los dos equipos → borrar un archivo de prueba y ver que desaparece del otro → recuperarlo desde la papelera del servicio → programar una copia aparte en un disco externo).
- **Remisiones**: «Archivos y carpetas» (U1), «Seguridad digital: contraseñas y fraudes en línea» (U1).
- **Fuentes a buscar**: guías oficiales de seguridad en la nube (NIST, CISA, NCSC del Reino Unido o FTC), documentación oficial sobre sincronización y papelera, y Wikipedia «Computación en la nube» y «Copia de seguridad» como apoyo.
- **Ejercicios (6)**: `opciones` ×3 (qué pasa al borrar un archivo sincronizado; qué diferencia hay entre sincronizar y respaldar; qué permiso se da al compartir por enlace), `texto` (definición de «nube» o «sincronización»), `ordenar` (los pasos para guardar y comprobar un archivo en la nube) y `numero` (cuántas copias existen si hay 2 equipos sincronizados y 1 copia de seguridad).

## 2. Documentos compartidos y colaboración

- **Apertura**: tres personas escriben el mismo informe y nadie sabe cuál es la versión buena. La pregunta es cómo trabajar sobre un solo documento.
- **Términos (máximo 3 en negritas)**:
  - **permiso** (<span lang="en">permission</span>): lo que cada persona puede hacer con el documento (verlo, comentarlo o editarlo);
  - **edición simultánea** (<span lang="en">real-time editing</span>): varias personas escribiendo en el mismo documento a la vez y viendo los cambios al momento;
  - **historial de versiones** (<span lang="en">version history</span>): la lista de cambios guardados, que permite volver a una versión anterior.
- **Idea central**: un documento compartido tiene dos decisiones antes de escribirlo: quién entra y qué puede hacer. Los permisos se reparten en tres niveles: ver, comentar y editar, y hay que dar el mínimo que la persona necesita. Compartir con personas concretas es más seguro que un enlace abierto, que cualquiera con la dirección puede usar y que a veces se reenvía sin querer. Con eso resuelto, la **edición simultánea** cambia la forma de trabajar: ya no se mandan copias por correo con «versión final», sino que cada uno escribe en el mismo archivo y ve los cambios de los demás. Y para no pisarse, dos herramientas: los comentarios (para discutir sin tocar el texto) y el control de cambios o las sugerencias (para proponer sin imponer). Y el **historial de versiones** es la red de seguridad: si alguien borra un párrafo entero, se recupera. Y dos costumbres que evitan problemas: revisar la lista de personas con acceso cada tanto y quitar a quien ya no participa, y no dejar en un enlace público nada con datos de otras personas.
- **Visual**: tabla de permisos con `<th scope="row">` (ver, comentar, editar, propietario) y diagrama de dos personas en el mismo documento con el historial a un lado y una versión anterior recuperada.
- **Ejemplo resuelto**: organizar el informe de tres personas, paso a paso (crear el documento → invitar a dos personas con permiso de comentar → escribir cada uno su parte cuando le dan permiso de editar → dejar un comentario en la frase dudosa → resolver el comentario → abrir el historial y volver a la versión de antes del borrado → revisar la lista de accesos y quitar a quien ya no está).
- **Remisiones**: «Ortografía, comentarios y control de cambios» (U2), «Correo electrónico» (U1).
- **Fuentes a buscar**: documentación oficial de permisos, edición simultánea e historial de versiones (sin nombrar el servicio en las lecciones), y Wikipedia «Software colaborativo» y «Control de versiones» como apoyo.
- **Ejercicios (6)**: `opciones` ×3 (qué permiso hace falta para solo leer; qué permite el historial; por qué el enlace abierto es riesgoso), `texto` (definición de «permiso» o «edición simultánea»), `ordenar` (los pasos para compartir un documento con dos personas) y `numero` (cuántos niveles de permiso tiene la tabla).

## 3. Videollamadas

- **Apertura**: la reunión empieza y el micrófono no suena, la cámara enfoca el techo y hay eco. La pregunta es qué se prepara antes.
- **Términos (máximo 3 en negritas)**:
  - **videollamada** (<span lang="en">video call</span>): una conversación con imagen y sonido por internet;
  - **compartir pantalla** (<span lang="en">screen sharing</span>): mostrar tu pantalla, o una ventana, a las demás personas de la llamada;
  - **ancho de banda** (<span lang="en">bandwidth</span>): la capacidad de tu conexión, que decide cuánta imagen y sonido caben a la vez.
- **Idea central**: una videollamada se prepara en dos minutos: probar el micrófono y la cámara, mirar la luz (de frente, no detrás), elegir un fondo simple y silenciar las notificaciones. Durante la llamada, la regla es sencilla: el micrófono se abre cuando hablas y se cierra cuando no, y el **ancho de banda** manda: si la imagen se congela, apagar el video suele arreglarlo, porque el sonido ocupa mucho menos. **Compartir pantalla** es útil y peligroso a la vez: se comparte la ventana que hace falta, no el escritorio entero, y se cierran antes las pestañas y ventanas con datos privados. Y la parte de convivencia: pedir turnos, usar el chat para los enlaces, no hablar encima de otra persona, y si se graba, avisar y pedir permiso a todos antes. Y la puerta: el enlace de la reunión es una llave; no se publica en abierto, se usa la sala de espera para admitir a cada persona y, si entra alguien que no debe, se le expulsa y se cambia el enlace. Y accesibilidad: los subtítulos automáticos y la transcripción ayudan a quien no oye bien o no es su idioma.
- **Visual**: diagrama de la ventana de una llamada con sus controles rotulados (micrófono, cámara, compartir, chat, salir) y tabla «problema / qué hacer» con `<th scope="row">` (no se oye, se congela la imagen, hay eco, entra alguien desconocido).
- **Ejemplo resuelto**: preparar una reunión de cuatro personas, paso a paso (enviar el enlace a cada persona, no a un grupo abierto → activar la sala de espera → probar micrófono y cámara antes → silenciar al entrar → compartir solo la ventana del documento → activar los subtítulos → cerrar la ventana compartida antes de abrir otra cosa → terminar y cerrar la sala).
- **Remisiones**: «Seguridad digital: contraseñas y fraudes en línea» (U1), «Deepfakes y contenido falso» (IA), «Banca en línea y pagos digitales» (Finanzas personales).
- **Sensitive**: grabar pide consentimiento; los datos que se ven en pantalla son de personas, y se dice sin dramatismo. Nada de consejo legal por país.
- **Fuentes a buscar**: documentación oficial de videollamadas (silenciar, compartir pantalla, sala de espera, grabar), W3C para subtítulos, y Wikipedia «Videoconferencia» como apoyo.
- **Ejercicios (6)**: `opciones` ×3 (qué se hace si la imagen se congela; qué se comparte al compartir pantalla; qué se hace antes de grabar), `texto` (definición de «compartir pantalla» o «ancho de banda»), `ordenar` (los pasos para entrar bien a una reunión) y `numero` (cuántos controles tiene la ventana del diagrama).

## Reglas de la unidad

- **Sin nombres de servicios**: ni de almacenamiento, ni de ofimática en línea, ni de videollamadas. Se dice «el servicio», «la aplicación de videollamadas», «el programa». No hay programa de referencia en esta unidad, porque son servicios web; lo que se enseña es el concepto y el gesto común.
- **Términos en inglés**: la primera vez, el término en español y el original en `<span lang="en">`; si la palabra es igual, el paréntesis sobra.
- **Máximo 3 `<strong>` por lección**; lo demás que haya que memorizar va en tabla con `<th scope="row">`, dentro de `.tabla-wrap`.
- **Extensión**: `explicacion` 400–650 · `ejemplo` 120–180 · `vidaReal` 60–90. Frases completas y conectadas.
- **Estructura**: objetivo → «¿para qué sirve en la vida real?» (antes, sin términos no definidos) → explicación → ejemplo paso a paso → 6 ejercicios → fuentes.
- **Tono**: español neutro, tuteo, sin exclamaciones, sin «simplemente», sin emojis, sin asumir el género del lector; el error va en «Error común», nunca como reproche.
- **Ejercicios**: `numero`, `opciones`, `texto` y `ordenar`; respuestas numéricas como operación; `correcta:` repartidos; cada `pista` y cada `solucion` con `<p>…</p>` cerrado.
- **Visuales**: diagramas con `descripcion` obligatoria; tablas con `<th>`; revisar con `render.js` que no se solape el texto.
- **Sin capturas de pantalla**, sin CDN, sin `import`/`fetch`/`.json`.
- **Datos**: sin cifras con país; los números de los ejemplos son inventados y se dicen.
- **Remisiones**: títulos exactos de `js/temario.js`; los títulos de unidad no valen.

## Decisiones tomadas (2026-10-22)

1. **Sin nombrar ningún servicio** (ni siquiera como ejemplo), coherente con U2–U4.
2. **Grabar una videollamada**: se trata el consentimiento en dos frases, sin consejo legal por país.
3. «Sincronizar no es hacer copia de seguridad»: es la idea central de la L1 y se sostiene con fuente, no como opinión.
4. Accesibilidad: subtítulos y transcripción en la L3.

## Pendiente al implementar

- Añadir a `.claude/trabajo/ofimatica/computadora/reglas-materia.md` lo que esta unidad fije: sin nombres de servicios en la nube, y el consentimiento al grabar.
