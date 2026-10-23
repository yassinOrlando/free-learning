# Plan · ofimatica · Unidad 1: La computadora

- Archivo destino: `lecciones/ofimatica/computadora.js` (materia `ofimatica`).
- Ficha: `.claude/trabajo/ofimatica/computadora/ficha.md`.
- 7 lecciones, 6 ejercicios cada una (42 ejercicios). Escritura en 2 fragmentos: L1–L4 y L5–L7 (un constructor nuevo por fragmento; el segundo **añade** al final del archivo).
- Reglas propias de la materia: todavía no están en `.claude/docs/materias/ofimatica.md` (el Director no puede editar `.claude/docs/`). El borrador irá en `.claude/trabajo/ofimatica/reglas-materia.md`: constructor y auditor lo leen y lo siguen.
- Unidades siguientes ya planeadas en el temario: U2 Procesador de textos (9), U3 Hojas de cálculo (12), U4 Presentaciones (4), U5 Trabajo en la nube (3).
- Título exacto de L7 en `js/temario.js`: «Seguridad digital: contraseñas y fraudes en línea».

## Cortes con las demás unidades y materias

| Lo que hay en esta unidad | Lo que NO se toca aquí |
|---|---|
| Hardware y software (L1) | No se comparan ni se eligen programas de ofimática; no se habla de redes ni servidores. |
| El sistema operativo (L2) | No se instala nada ni se habla de licencias: eso es de «Qué es el software libre» y «Linux: un sistema operativo libre» (autosuficiencia). |
| Archivos y carpetas (L3) | Guardar y abrir un documento de un procesador de textos es de U2 «Crear, guardar y abrir documentos»; los formatos de hoja de cálculo, de U3. |
| Atajos (L4) | Los atajos propios de un programa se ven en su unidad (imprimir, de U2 «Exportar a PDF e imprimir»). Aquí, los que sirven en cualquier parte. |
| Internet y navegador (L5) | La nube es de U5 «Almacenamiento en la nube»; no se configuran navegadores ni se instalan extensiones. |
| Correo electrónico (L6) | Mandar archivos pesados y compartir documentos, de U5; redactar un correo formal, de la materia de Inglés («Escribir un correo formal», «Escribir un correo informal»). |
| Seguridad digital (L7) | El catálogo de fraudes financieros es de «Fraudes comunes y cómo evitarlos» y «Banca en línea y pagos digitales» (finanzas personales); el contenido falso generado con IA, de «Deepfakes y contenido falso» (ia); el Massive o engañoso, de «Verificar noticias y detectar desinformación» (lectura). |
| Remisiones que sí se usan | L1–L2 → «Linux: un sistema operativo libre», «Qué es el software libre» (autosuficiencia). L3–L4 → «Leer instructivos y manuales» (lectura). L5 → «Cómo leer estadísticas en las noticias sin que te engañen» (matemáticas), «Verificar noticias y detectar desinformación» y «Lectura rápida y escaneo» (lectura). L6 → «Leer contratos y letras pequeñas» (lectura), «Escribir un correo informal» y «Escribir un correo formal» (inglés). L7 → «Fraudes comunes y cómo evitarlos», «Banca en línea y pagos digitales» (finanzas personales), «Deepfakes y contenido falso» (ia). |

## 1. Partes de una computadora

- **Apertura**: la pantalla, el teclado, el ratón y la torre que tienes delante. La pregunta es qué hace cada pieza y por qué hace falta la caja de al lado.
- **Términos (máximo 3 en negritas)**:
  - **hardware** (<span lang="en">hardware</span>): las piezas físicas que se pueden tocar;
  - **software** (<span lang="en">software</span>): los programas que le dicen a la máquina qué tiene que hacer;
  - **periférico** (<span lang="en">peripheral</span>): el dispositivo que se conecta al equipo y hace de entrada, de salida o de las dos cosas.
- **Idea central**: una computadora es un cuerpo y un conjunto de instrucciones. El cuerpo es el hardware; las instrucciones son el software, y sin software el hardware no hace nada (es una lámpara apagada). El trabajo de la máquina tiene cuatro momentos: **entrada** (teclado, ratón, micrófono), **procesamiento** (el procesador hace los cálculos y la memoria de trabajo guarda lo que está abierto ahora), **salida** (la pantalla, la impresora, las bocinas) y **almacenamiento** (el disco guarda lo que cierras y lo apagas). Todo lo que se enchufa es un periférico: hay de entrada (el ratón solo puede mandar datos), de salida (la impresora solo puede recibirlos) y de las dos (una pantalla táctil).
- **Visual**: diagrama con cuatro cajas y flechas: entrada → procesamiento → salida → almacenamiento; más una tabla «pieza / qué hace» con `<th scope="row">`: torre o caja (el procesador), memoria de trabajo (lo que está abierto), disco (lo que queda guardado), teclado, ratón, pantalla, impresora, bocinas.
- **Ejemplo resuelto**: qué pasa desde que escribes una palabra hasta que la ves, paso a paso (teclear → el procesador la procesa con la memoria de trabajo → la pantalla la muestra → al guardar, el archivo pasa al disco). Se termina comprobando: si la palabra sale mal, el problema está en la entrada; si la pantalla se congela, en el procesamiento; si al reiniciar perdiste lo que no guardaste, en el almacenamiento.
- **Remisiones**: «Leer instructivos y manuales» (lectura: el manual del equipo), «Qué es el software libre» y «Linux: un sistema operativo libre» (autosuficiencia: no todo el software es igual).
- **Fuentes a buscar**: documentación oficial del fabricante (qué es el equipo y qué hace cada parte, en `support.microsoft.com/es-es` o `support.apple.com/es-es`), y como apoyo Wikipedia en español «Hardware», «Periférico» y «Unidad central». Cada dato con su URL y cita textual.
- **Ejercicios (6)**: `opciones` ×3 (qué hace el procesador, si un dispositivo es de entrada o de salida, hardware o software), `texto` (definición de «hardware» o «periférico», con y sin artículo), `ordenar` (los cuatro momentos: teclear, procesar, mostrar, guardar) y `numero` (cuántos periféricos de salida hay en la tabla).

## 2. El sistema operativo

- **Apertura**: enciendes el equipo y aparece un escritorio con iconos. La pregunta es quién puso eso ahí y por qué no sale igual en todas las máquinas.
- **Términos (máximo 3 en negritas)**:
  - **sistema operativo** (<span lang="en">operating system</span>): el programa base que administra el equipo;
  - **ventana** (<span lang="en">window</span>): el marco donde trabaja cada programa abierto;
  - **proceso** (<span lang="en">process</span>): un programa en funcionamiento, el que se puede cerrar si se queda colgado.
- **Idea central**: el sistema operativo es el administrador que está entre las personas y el hardware: enciende la máquina, reconoce el teclado y la pantalla, abre y cierra programas, guarda los archivos, conecta a internet y separa las cuentas de cada persona. Lo que se ve (escritorio, iconos, barra de tareas o menú, bandeja del reloj) es su interfaz. Y hay una diferencia que hay que tener clara: el sistema operativo es la base, y un programa como el procesador de textos o el navegador es una aplicación que trabaja encima, cada una en su ventana. También: el equipo puede tener varias cuentas de usuario, cada una con su escritorio y sus archivos; las actualizaciones del sistema hay que instalarlas (arreglan fallos y tapan huecos de seguridad); y cuando un programa no responde, se termina su proceso (con el gestor de tareas o la salida forzada) y se vuelve a abrir.
- **Visual**: diagrama en capas, de abajo arriba: hardware → sistema operativo → aplicaciones → la persona; más una tabla «elemento de la pantalla / para qué sirve» con `<th scope="row">`: escritorio, iconos, barra de tareas o menú, ventana, bandeja del reloj.
- **Ejemplo resuelto**: abrir un programa, verlo colgado y salir de ahí, paso a paso (doble clic en el icono → aparece una ventana → si no responde, abrir el gestor de tareas o la salida forzada → finalizar el proceso → volver a abrir). Se comprueba que la ventana desapareció y se recuerda que lo que no se guardó se perdió (por eso el atajo de guardar, de L4).
- **Remisiones**: L1 (hardware y software), «Linux: un sistema operativo libre», «Qué es el software libre» y «Por qué usar software libre» (autosuficiencia), U2 (la aplicación es el procesador de textos).
- **Fuentes a buscar**: `support.microsoft.com/es-es` (qué es Windows, el gestor de tareas, las actualizaciones) y `support.apple.com/es-es` (macOS, forzar salida), `help.libreoffice.org/latest/es/` (una aplicación sobre el sistema), y como apoyo Wikipedia «Sistema operativo» y «Interfaz gráfica».
- **Ejercicios (6)**: `opciones` ×3 (qué hace el sistema operativo, qué elemento es la barra de tareas, qué hacer con un programa que no responde), `texto` (definición de «sistema operativo» o «proceso»), `ordenar` (los pasos para salir de un programa colgado) y `numero` (cuántas ventanas hay con tres programas abiertos).

## 3. Archivos y carpetas

- **Apertura**: el escritorio con cuarenta cosas encima y la duda de dónde quedó el archivo del mes pasado.
- **Términos (máximo 3 en negritas)**:
  - **archivo** (<span lang="en">file</span>): el contenedor con nombre que guarda información;
  - **carpeta** (<span lang="en">folder</span>): el cajón que guarda archivos y otras carpetas;
  - **extensión** (<span lang="en">file extension</span>): las últimas letras del nombre del archivo, que dicen de qué tipo es.
- **Idea central**: un archivo tiene nombre, extensión, contenido y fecha. Su nombre son dos cosas: el nombre que tú eliges y la extensión (`.txt`, `.pdf`, `.docx`, `.jpg`, `.mp3`), que es la que dice qué programa lo abre. Las carpetas ordenan en árbol: dentro hay archivos y otras carpetas, y cada carpeta tiene su sitio (Documentos, Descargas, Escritorio). La **ruta** es el camino completo (Documentos → Trabajo → Plan → plan.docx) y es lo que hay que saber para encontrar algo. Y cuatro cosas prácticas: el escritorio es el peor sitio para trabajar; al borrar, el archivo va a la papelera y no se borra hasta que se vacía la papelera; el tamaño importa (un video pesa mucho más que un texto); y una extensión desconocida o un archivo que llega de alguien que no esperabas es una señal de alarma (L7).
- **Visual**: diagrama del árbol de carpetas (Documentos → Trabajo → Plan de estudios → plan.docx) con cajas y flechas; más una tabla «extensión / qué guarda / con qué se abre» con `<th scope="row">`: .txt, .pdf, .docx, .jpg, .mp3, .xlsx.
- **Ejemplo resuelto**: encontrar un archivo guardado hace un mes, paso a paso (piensa en la palabra del nombre → revisa donde se guardó: Documentos, Descargas, Escritorio → mira la extensión para saber qué es → si no aparece, búscalo por tipo o por fecha → comprueba la fecha de modificación). Se termina con la nota de «Error común»: vaciar la papelera sin mirar, y luego lamentarlo.
- **Remisiones**: U2 «Crear, guardar y abrir documentos» (ahí se guarda de verdad), L2 (la ventana de archivos), «Leer instructivos y manuales» (lectura: los manuales vienen en archivo).
- **Fuentes a buscar**: `support.microsoft.com/es-es` (carpetas y el explorador de archivos), `support.apple.com/es-es` (Finder), `help.libreoffice.org/latest/es/` (guardar y abrir) y como apoyo Wikipedia «Sistema de archivos».
- **Ejercicios (6)**: `opciones` ×3 (qué extensión corresponde a un texto, qué dice la ruta, qué pasa al vaciar la papelera), `texto` (definición de «extensión» o «carpeta»), `ordenar` (los pasos para encontrar un archivo) y `numero` (cuántas carpetas hay en la ruta del ejemplo).

## 4. Atajos de teclado esenciales

- **Apertura**: el ratón de un lado y la otra mano siempre en el teclado. La pregunta es si hay manera de pedirle a la máquina las cosas sin soltar el teclado.
- **Términos (máximo 3 en negritas)**:
  - **atajo de teclado** (<span lang="en">keyboard shortcut</span>): la combinación de teclas que hace una acción sin ratón;
  - **portapapeles** (<span lang="en">clipboard</span>): el lugar temporal donde queda lo que copias;
  - **deshacer** (<span lang="en">undo</span>): volver atrás en los cambios que acabas de hacer.
- **Idea central**: un atajo es la manera corta de pedir algo. Los que sirven en cualquier programa son: Ctrl+C copiar, Ctrl+X cortar, Ctrl+V pegar, Ctrl+Z deshacer, Ctrl+Y rehacer, Ctrl+A seleccionar todo, Ctrl+S guardar, Ctrl+F buscar, Ctrl+P imprimir y Alt+Tab para cambiar de ventana. Y el porqué de cada uno: copiar y cortar dejaban la selección en el portapapeles, y pegar la toma de ahí; deshacer funciona porque el programa recuerda los últimos cambios y por eso se puede deshacer varias veces seguidas; y el atajo de guardar (Ctrl+S) es el que más te va a salvar, porque una computadora apagada no guardó nada. Además: la tecla que en un teclado se llama Ctrl cumple ese papel en todos los programas; en los equipos de Apple la misma tecla se llama Cmd y se escribe ⌘.
- **Visual**: tabla «teclas / qué hace / para qué te sirve» con `<th scope="row">` por atajo (10 filas); más un diagrama pequeño de las zonas del teclado (letras, Enter, Shift, Ctrl y Alt, espacio) con la posición de Ctrl y Alt marcada, que es donde se ve el Alt+Tab.
- **Ejemplo resuelto**: mover un dato de un correo a un documento sin soltar el teclado, paso a paso (seleccionar con Ctrl+A o arrastrar → Ctrl+C → cambiar de ventana → Ctrl+V → si te equivocaste, Ctrl+Z). Se comprueba que el dato aparece una sola vez y que al deshacer desaparece.
- **Remisiones**: L3 (guardar es lo que hace Ctrl+S), U2 «Crear, guardar y abrir documentos» y «Exportar a PDF e imprimir» (Ctrl+P).
- **Fuentes a buscar**: `support.microsoft.com/es-es` (atajos de teclado de Windows), `support.apple.com/es-es` (atajos de teclado de Mac), `help.libreoffice.org/latest/es/` (atajos de LibreOffice) y como apoyo Wikipedia «Atajo de teclado».
- **Ejercicios (6)**: `opciones` ×3 (qué hace cada atajo, con qué tecla se guarda, cuál atajo cambia de ventana), `texto` (definición de «atajo de teclado» o «portapapeles»), `ordenar` (los pasos: seleccionar, copiar, pegar, deshacer) y `numero` (cuántos pasos tiene la secuencia del ejemplo).

## 5. Internet y el navegador

- **Apertura**: se abre el navegador y aparecen veinte pestañas. La pregunta es qué es internet y qué es exactamente la ventana que tienes delante.
- **Términos (máximo 3 en negritas)**:
  - **navegador** (<span lang="en">web browser</span>): el programa que pide las páginas y las dibuja;
  - **URL** (<span lang="en">URL</span>): la dirección de una página, la que se escribe en la barra de direcciones;
  - **pestaña** (<span lang="en">tab</span>): cada página abierta dentro de la ventana del navegador.
- **Idea central**: internet es una red de computadoras conectadas que se pasan la información en trozos (paquetes). El navegador es el programa que usa esa red: pide una página, la recibe y la dibuja. La URL tiene tres partes: el protocolo (`https://`), el nombre del sitio (el dominio, que es lo que hay que mirar) y el camino dentro del sitio. Cada página abierta es una pestaña, y por eso se acumulan tan rápido. Y cuatro cosas que hay que mirar antes de escribir datos en una página: la dirección completa (no solo el título, que se puede inventar), el candado del cifrado (habla del cifrado, no de si el sitio es honesto: L7), la fecha de la información y quién la escribió (lectura: «Verificar noticias y detectar desinformación» y «Cómo leer estadísticas en las noticias sin que te engañen»). Y una curiosidad, sin convertirla en término: los nombres de los sitios (como `ejemplo.org`) se traducen a números antes de viajar por la red; eso lo hace el DNS.
- **Visual**: diagrama de la ventana del navegador con las partes rotuladas (barra de direcciones, atrás, adelante, recargar, pestañas, botón de inicio, la página y el aviso de descarga); más una tabla «elemento / para qué sirve» con `<th scope="row">`.
- **Ejemplo resuelto**: buscar información y comprobar de dónde viene, paso a paso (abrir el navegador → escribir la dirección o la pregunta → mirar los tres primeros resultados y leer el dominio, no el título → abrir y comprobar la fecha y la autoría → volver atrás). Se termina comprobando que el dominio es el que se esperaba.
- **Remisiones**: «Verificar noticias y detectar desinformación» y «Lectura rápida y escaneo» (lectura), «Cómo leer estadísticas en las noticias sin que te engañen» (matemáticas), U5 «Almacenamiento en la nube» (aquí no se explica la nube).
- **Fuentes a buscar**: `support.microsoft.com/es-es` y `support.apple.com/es-es` (qué es un navegador, cómo se usa la barra de direcciones, el aviso de descarga), y como apoyo Wikipedia «Navegador web», «DNS» y «Caché».
- **Ejercicios (6)**: `opciones` ×3 (qué es el navegador, qué parte es la barra de direcciones, qué se revisa antes de escribir datos), `texto` (definición de «URL» o «pestaña»), `ordenar` (los pasos para buscar y comprobar una fuente) y `numero` (cuántas partes tiene una URL).

## 6. Correo electrónico

- **Apertura**: para avisarle a alguien que está lejos hace falta un buzón con llave y una dirección. Así funciona el correo.
- **Términos (máximo 3 en negritas)**:
  - **remitente** (<span lang="en">sender</span>): quien envía el mensaje;
  - **adjunto** (<span lang="en">attachment</span>): el archivo que viaja pegado al mensaje;
  - **correo no deseado** (<span lang="en">spam</span>): el mensaje que no pediste, sobre todo publicidad y cadenas.
- **Idea central**: el correo electrónico es un buzón con llave: cada persona tiene una dirección con el signo «@», y el servidor de correo lleva el mensaje hasta el buzón del destinatario. Un mensaje tiene cinco cosas: remitente, destinatario, asunto, cuerpo y adjuntos. Los adjuntos pueden ser documentos o imágenes, y hay que mirar el nombre y el tamaño antes de mandarlos. El correo no deseado se marca y se borra, y la regla de oro es no pedir nunca datos por correo. Y dos costumbres: contestar (un correo que no se contesta se queda sin respuesta) y no reenviar cadenas: casi siempre son falsas y solo estorban. Si el archivo pesa mucho, el camino es otro (U5, «Almacenamiento en la nube»).
- **Visual**: diagrama de la anatomía del mensaje (remitente, destinatario, asunto, cuerpo, archivo adjunto) rotulado; más una tabla «parte del mensaje / para qué sirve / qué conviene revisar» con `<th scope="row">` para las cinco partes.
- **Ejemplo resuelto**: responder a un correo y mandar un archivo, paso a paso (abrir el mensaje → leer remitente y asunto → responder, que conserva el hilo → escribir el texto → adjuntar el archivo y mirar su nombre y su tamaño → enviar → comprobar en la carpeta de enviados). Se cierra con la nota de «Error común»: mandar a todos los destinatarios o adjuntar el archivo equivocado.
- **Remisiones**: L7 (los fraudes llegan por correo), «Leer contratos y letras pequeñas» (lectura: por correo llegan avisos legales), «Escribir un correo informal» y «Escribir un correo formal» (inglés).
- **Fuentes a buscar**: `support.microsoft.com/es-es` (Outlook: adjuntos, carpeta de enviados, correo no deseado), `support.apple.com/es-es` (Mail), y como apoyo Wikipedia «Correo electrónico» y «Correo no deseado».
- **Ejercicios (6)**: `opciones` ×3 (qué parte es el asunto, qué es un adjunto, qué se hace con el correo no deseado), `texto` (definición de «remitente» o «adjunto»), `ordenar` (las partes del mensaje en orden) y `numero` (cuántas partes tiene un mensaje de correo).

## 7. Seguridad digital: contraseñas y fraudes en línea

- **Apertura**: hay tres cosas que no le dices a un desconocido: tu nombre, tu número de tarjeta y tu contraseña. Esta lección es sobre las tres, y sobre el mensaje que viene a pedirlas.
- **Términos (máximo 3 en negritas)**:
  - **contraseña** (<span lang="en">password</span>): la clave que abre una cuenta;
  - **gestor de contraseñas** (<span lang="en">password manager</span>): el programa que guarda tus contraseñas y solo tú abres con una;
  - **suplantación** (<span lang="en">phishing</span>): el fraude en el que se hacen pasar por alguien de confianza para robarte datos.
- **Idea central**: tres cosas. Primero, la contraseña: larga, distinta en cada sitio y que no se comparte. La longitud importa más que los símbolos: una frase de varias palabras es más fácil de recordar y más difícil de adivinar. Y no se reutiliza, porque si filtran la contraseña de un sitio prueban la misma en todos los demás. Segundo, el gestor de contraseñas: guarda una contraseña distinta y larga para cada sitio y tú solo recuerdas una, la que abre el gestor. Tercero, la suplantación: el mensaje que llega con urgencia («ganaste un premio», «tu cuenta será bloqueada», «confirma tus datos») y con un enlace que apunta a otro sitio. La regla es: si el mensaje te pide datos o dinero, no se hace clic, no se responde, se marca como correo no deseado y se denuncia en el organismo de protección al consumidor o en la policía de tu país. Y si ya hiciste clic, se cambia la contraseña, se avisa al banco y se guardan pruebas. Y un aviso: el candado del navegador dice que la conexión está cifrada, no que el sitio sea honesto.
- **Visual**: diagrama de la cadena de la suplantación (mensaje → enlace → sitio falso → tus datos) con el punto de corte marcado; más una tabla «señal de alerta / qué hacer» con `<th scope="row">`: urgencia, premio o amenaza, enlaces que apuntan a otro sitio, remitente que no coincide, petición de datos o dinero; y una tabla corta «contraseña débil / contraseña fuerte».
- **Ejemplo resuelto**: llegó un correo que dice que ganaste un premio. Se revisa en cinco pasos: (1) quién dice venir (el remitente y el dominio); (2) qué pide (datos, dinero, hacer clic); (3) si hay urgencia; (4) a dónde apunta el enlace, sin pulsarlo; (5) si el asunto es genérico. Se decide no hacer clic, se marca como correo no deseado, se denuncia y, si ya se habían escrito datos, se cambia la contraseña. Se comprueba que el dominio del enlace no es el del remitente.
- **Remisiones**: L6 (el correo es donde llegan los fraudes), «Fraudes comunes y cómo evitarlos» y «Banca en línea y pagos digitales» (finanzas personales: el catálogo de fraudes financieros no se repite aquí), «Deepfakes y contenido falso» (ia), «Verificar noticias y detectar desinformación» (lectura).
- **Fuentes a buscar**: NIST (EE. UU.) sobre contraseñas (SP 800-63B), CISA (EE. UU.) sobre contraseñas robustas y suplantación, StaySafeOnline (EE. UU.) sobre contraseñas y phishing, `support.microsoft.com/es-es` y `support.apple.com/es-es` (gestor de contraseñas y verificación en dos pasos). Los datos norteamericanos llevan país y año; la recomendación de dónde denunciar va con «revisa el organismo de tu país».
- **Ejercicios (6)**: `opciones` ×3 (cuál contraseña es más fuerte y por qué, cuál es una señal de suplantación, qué hacer después de hacer clic en el enlace), `texto` (definición de «gestor de contraseñas» o «suplantación»), `ordenar` (los cinco pasos de revisión del mensaje) y `numero` (cuántas señales de alerta hay en la tabla).

## Reglas de la unidad

- **Términos en inglés**: la primera vez, el término en español y el original en `<span lang="en">`. La lista completa está en cada lección arriba (20 términos en total, ninguno repetido).
- **Máximo 3 `<strong>` por lección** en la explicación (lo cuenta `.claude/herramientas/revisar.js`). Todo lo que haya que memorizar y no quepa en las tres negritas va en tabla con `<th scope="row">`.
- **Extensión**: `explicacion` 400–650 palabras · `ejemplo` 120–180 · `vidaReal` 60–90. Frases completas y conectadas, una idea por párrafo; nada de fragmentos tipo telegrama.
- **Estructura**: objetivo → «¿para qué sirve en la vida real?» (obligatorio, se lee antes y sin usar términos no definidos) → explicación → ejemplo resuelto paso a paso → ejercicios → fuentes.
- **Tono**: español neutro, tuteo, frases cortas, «fíjate»/«imagina». Sin signos de exclamación, sin «simplemente», sin emojis, iconos solo SVG. No se juzga a quien se equivoca: el error va en la nota de «Error común». No se asume el género del lector.
- **Ejercicios**: 6 por lección, tipos `numero`, `opciones`, `texto` y `ordenar` (el motor no admite texto libre que no se pueda corregir). Respuestas numéricas escritas como la operación (`2 + 2`). Índices `correcta:` repartidos. Los `texto` aceptan con y sin artículo y con sinónimos; el `texto` quita tildes y mayúsculas.
- **Visuales**: diagramas con el helper `diagrama` (cajas, flechas, `txt`), lienzo proporcional y `descripcion` obligatoria; tablas con `<th>` y dentro de `.tabla-wrap`; toda gráfica con `descripcion`. Comprobar con `render.js` que ningún texto se solapa.
- **Sin capturas de pantalla**: los «pantallazos» son tablas HTML y diagramas SVG, con el texto describiendo lo que se ve.
- **Marcas**: regla pendiente del visto bueno (abajo).
- **Datos por país**: los datos de organismos oficiales norteamericanos (NIST, CISA, StaySafeOnline) van con su país y su año; las cifras de los ejemplos son de ejemplo y se dicen.
- **Remisiones**: los títulos citados entre comillas tienen que existir en `js/temario.js` (los títulos de unidad no valen como remisión).
- **Prohibido repetir**: no repetir lo de otras materias («Cómo leer una etiqueta nutricional» de ciencias naturales, «Cómo leer tu recibo de sueldo» y «Leer un presupuesto» de finanzas personales, «Cómo leer estadísticas en las noticias sin que te engañen» de matemáticas y «Deepfakes y contenido falso» de ia): eso se remite, no se explica dos veces.
- **Cero instalación**: nada de `import`, `fetch()`, `.json`, `<script type="module">`, CDN ni dependencias; los datos en `.js` clásicos.

## Decisiones tomadas por el usuario (2026-10-21)

1. **Nombres concretos de sistemas y navegadores**: sí, como ejemplos, con la regla «primero el concepto genérico (ventana, icono, carpeta, pestaña) y después el nombre propio donde la diferencia importa» (Windows, macOS, Linux; Chrome, Firefox, Edge). Sin recomendar marcas ni productos, sin buscador con nombre.
2. **Dónde denunciar el fraude**: texto neutral («el organismo de protección al consumidor o la policía de tu país»). Los datos de NIST, CISA y StaySafeOnline van con su país (EE. UU.) y su año.
3. **El candado del navegador (HTTPS)**: en ambos. En L5 aparece como elemento visible de la barra de direcciones (fila de tabla, sin término nuevo); en L7 va la explicación de qué garantiza y qué no (que el sitio sea honesto).

## Pendiente al implementar

- `.claude/docs/materias/ofimatica.md` no lo puede escribir el Director: el borrador irá a `.claude/trabajo/ofimatica/reglas-materia.md` y lo copia el usuario al cerrar la unidad.
