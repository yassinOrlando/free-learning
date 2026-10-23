# Plan · ofimatica · Unidad 2: Procesador de textos

- Archivo destino: `lecciones/ofimatica/procesador-de-textos.js` (materia `ofimatica`).
- Ficha: `.claude/trabajo/ofimatica/procesador-de-textos/ficha.md`.
- 9 lecciones, 6 ejercicios cada una (54 ejercicios). Escritura en **3 fragmentos** de 3 lecciones: L1–L3, L4–L6, L7–L9 (un constructor nuevo por fragmento; cada uno **añade** al final del archivo, nunca reescribe).
- Reglas de la materia: borrador en `.claude/trabajo/ofimatica/computadora/reglas-materia.md` (el Director no puede editar `.claude/docs/`; el usuario copiará ese borrador a `.claude/docs/materias/ofimatica.md`).
- Unidad anterior ya escrita: `lecciones/ofimatica/computadora.js` (U1, 7 lecciones), con su `archivo:` en el temario.
- Títulos exactos de `js/temario.js` (no se cambian sin que el usuario lo pida):
  1. Crear, guardar y abrir documentos
  2. Formato de texto y de párrafo
  3. Estilos y títulos
  4. Listas y tablas
  5. Imágenes en el documento
  6. Encabezados, pies de página y numeración
  7. Índice automático
  8. Ortografía, comentarios y control de cambios
  9. Exportar a PDF e imprimir

## Cortes con las demás unidades y materias

| Lo que hay en esta unidad | Lo que NO se toca aquí |
|---|---|
| Guardar y abrir (L1) | La unidad 1 («Archivos y carpetas») ya explicó qué es un archivo, su extensión y dónde se guarda. Aquí solo el gesto dentro del programa. |
| Formato y estilos (L2–L3) | Las reglas de escritura (acentuación, puntuación, estructura de un texto) son de Lectura («Acentuación», «Puntuación», «Estructura de un texto»): aquí solo la herramienta que las aplica, no las reglas. |
| Tablas (L4) | Una tabla de datos con fórmulas, filtros y gráficos es de la U3 («Celdas, filas y columnas», «Fórmulas básicas»). Aquí una tabla para ordenar información dentro de un texto. |
| Imágenes (L5) | Insertar y dar formato a imágenes en una presentación es de la U4. Aquí, en un documento de texto. |
| Encabezados y pies (L6) | Los comentarios de la U5 no se tocan: aquí son los de una hoja impresa, no los de un chat. |
| Índice automático (L7) | Depende de L3: el índice se construye con los estilos de título. |
| Ortografía y control de cambios (L8) | Las reglas de tildes y signos son de Lectura. Aquí: el corrector, los comentarios y el control de cambios. |
| PDF e impresión (L9) | Imprimir no es guardar en PDF: son dos cosas distintas (el archivo en el equipo frente al papel). |
| Remisiones que sí se usan | L1 → «Crear, guardar y abrir documentos» (U2, esta misma) y «Archivos y carpetas» (U1). L3 → «Estructura de un texto» (Lectura). L8 → «Acentuación», «Puntuación» (Lectura), «Escribir un correo formal» (Inglés). L9 y L6 → «Exportar a PDF e imprimir» (esta unidad). Guardar en la nube → «Almacenamiento en la nube» (U5). Colaborar con otras personas → «Documentos compartidos y colaboración» (U5). Libre y ofimática → «Ofimática, internet y comunicación libres» (autosuficiencia). |

## 1. Crear, guardar y abrir documentos

- **Apertura**: escribes tres líneas, apagas el equipo y al volver no está. La pregunta es qué hace falta para que el trabajo quede a salvo.
- **Términos (máximo 3 en negritas)**:
  - **documento** (<span lang="en">document</span>): el archivo de texto que estás editando;
  - **formato** (<span lang="en">file format</span>): el tipo de archivo, que decide qué programa lo abre;
  - **copia de seguridad** (<span lang="en">backup</span>): una copia aparte de tu archivo, por si el original se daña o se borra.
- **Idea central**: un procesador de textos es un programa donde escribes y el texto vive en la memoria hasta que lo guardas. Guardar es volcar el texto al disco: hasta ese momento, nada está a salvo. Y hay tres comandos que se confundan: **guardar** (sustituye el archivo que ya tiene el mismo nombre, en el sitio donde está) y **guardar como** (crea un archivo nuevo, con el nombre y el sitio que elijas). El nombre del archivo importa: «carta sin título» es un nombre, y un nombre se cambia. El formato importa más: un archivo de texto plano (`.txt`) se abre en cualquier parte; un documento con estilos e imágenes (`.odt` en LibreOffice, `.docx` en los programas de Microsoft) necesita un programa que lo entienda; y el PDF es un formato de solo lectura, pensado para verse igual en cualquier dispositivo. Y una costumbre que evita sorpresas: guardar cada pocos minutos, poner un nombre que describa el contenido, y hacer una copia de seguridad de vez en cuando (o activar el autoguardado).
- **Visual**: diagrama del ciclo «crear → escribir → guardar → cerrar → abrir» con flechas; más una tabla «comando / qué hace / cuándo usarlo» con `<th scope="row">`: nuevo, abrir, guardar, guardar como, cerrar.
- **Ejemplo resuelto**: crear un documento, escribir tres líneas y guardarlo bien, paso a paso (nuevo → escribir → guardar como → elegir la carpeta y un nombre con sentido → guardar → cerrar → abrir de nuevo para comprobar). Se termina comprobando que el texto sigue ahí y que el archivo aparece en la carpeta con el nombre elegido.
- **Remisiones**: «Archivos y carpetas» (U1: qué es un archivo y su extensión), «Almacenamiento en la nube» (U5: la otra forma de guardar).
- **Fuentes a buscar**: ayuda de LibreOffice Writer en español (crear, abrir, guardar, guardar como, formatos ODF y el aviso de formato), y como apoyo Wikipedia «Formato de archivo», «Documento» y «Portable Document Format».
- **Ejercicios (6)**: `opciones` ×3 (diferencia entre guardar y guardar como; qué formato sirve para compartir y ver igual; qué pasa si no guardas), `texto` (definición de «copia de seguridad» o «formato»), `ordenar` (los pasos para guardar un documento nuevo con nombre y carpeta) y `numero` (cuántos comandos tiene la tabla).

## 2. Formato de texto y de párrafo

- **Apertura**: un texto sin formato es un muro de letras iguales. La pregunta es cómo hacer que el lector encuentre lo importante.
- **Términos (máximo 3 en negritas)**:
  - **negrita** (<span lang="en">bold</span>): las letras más marcadas, para lo que de verdad importa;
  - **cursiva** (<span lang="en">italic</span>): las letras inclinadas, para palabras, títulos de obras o énfasis puntual;
  - **alineación** (<span lang="en">alignment</span>): la posición de la línea dentro de la página.
- **Idea central**: el formato tiene dos niveles. El del **carácter** (las letras: negrita, cursiva, subrayado, tamaño, color, mayúsculas) y el del **párrafo** (el bloque: alineación, interlineado, sangría, espacio antes y después). El orden importa: si no hay estilos, se aplica formato a mano letra por letra, y el resultado es un documento con cada línea distinta. Y la idea que ordena todo: el formato se aplica **a lo seleccionado**, y si no hay nada seleccionado, se aplica al punto donde estás o al párrafo completo. La alineación se elige según el uso: a la izquierda para textos largos (es la más cómoda de leer), centrada para títulos, justificada para que los bordes queden rectos, a la derecha para números o firmas. Y una trampa: la negrita para todo no dice nada. Si todo está destacado, no hay nada destacado.
- **Visual**: tabla «cambio / para qué sirve / cuándo se usa» con `<th scope="row">`: negrita, cursiva, subrayado, tamaño de letra, color, alineación, interlineado, sangría; más un diagrama con cuatro bloques de texto, uno por alineación (izquierda, centrada, justificada, derecha), con su `descripcion`.
- **Ejemplo resuelto**: dar forma a una carta de tres párrafos, paso a paso (título centrado y en negrita; cuerpo alineado a la izquierda; una palabra en cursiva; interlineado con aire; se comprueba con la vista previa y con la vista de «sin formato» del programa, que quita el formato para ver la estructura real).
- **Remisiones**: «Estilos y títulos» (esta unidad: la forma rápida de dar formato), «Estructura de un texto» (Lectura: la estructura que el formato tiene que acompañar).
- **Fuentes a buscar**: ayuda de LibreOffice Writer (formato de carácter y de párrafo, alineación, interlineado) y como apoyo Wikipedia «Tipografía» y «Párrafo».
- **Ejercicios (6)**: `opciones` ×3 (qué formato es de carácter o de párrafo; para qué sirve la alineación justificada; a qué se aplica el formato), `texto` (definición de «negrita» o «alineación»), `ordenar` (pasos para dar formato a un texto) y `numero` (cuántas alineaciones hay en el diagrama).

## 3. Estilos y títulos

- **Apertura**: aplicaste negrita a tres títulos, y al cambiar uno tienes que volver a cambiarlo todo. La pregunta es cómo se hace una sola vez.
- **Términos (máximo 3 en negritas)**:
  - **estilo** (<span lang="en">style</span>): un nombre que guarda un conjunto de formatos y se aplica de un golpe;
  - **título** (<span lang="en">heading</span>): el estilo que marca las secciones y su orden;
  - **nivel** (<span lang="en">level</span>): la jerarquía de los títulos (el primero, el segundo, el tercero).
- **Idea central**: un estilo es un formato con nombre. En vez de dar formato letra por letra, escribes «esto es un título de nivel 1» y el programa ya sabe cómo se ve un título de nivel 1. Eso da tres cosas: se cambia el aspecto de todo el documento cambiando el estilo una vez; el documento queda ordenado, y por eso se puede generar un índice (L7) y saltar de una sección a otra con el panel de navegación; y dos personas que trabajan en el mismo documento mantienen el mismo aspecto. Los estilos de título son los más importantes: título 1, título 2, título 3, y cada uno marca un nivel. El cuerpo del texto tiene su propio estilo (párrafo de texto). Y una regla de Oro: el título se aplica al párrafo entero, no a unas letras sueltas, porque si no el índice y la estructura se rompen.
- **Visual**: diagrama de la jerarquía (Título 1 → Título 2 → Título 3 → Texto del cuerpo) con flechas y `descripcion`; más una tabla «estilo / qué cambia / cuándo se usa» con `<th scope="row">`: título 1, título 2, título 3, texto del cuerpo, cita, lista.
- **Ejemplo resuelto**: convertir un texto plano en un documento con estructura, paso a paso (escribir tres secciones → aplicar «Título 1» a la primera y «Título 2» a la subsección → aplicar el estilo de texto al cuerpo → cambiar el estilo «Título 1» una vez y ver cómo cambian las dos secciones). Se comprueba con el panel de navegación: aparecen los títulos en orden.
- **Remisiones**: L2 (el formato manual que el estilo sustituye), «Estructura de un texto» (Lectura), «Índice automático» (esta unidad: el índice se construye con estos estilos).
- **Fuentes a buscar**: ayuda de LibreOffice Writer (estilos de párrafo, estilos de título, modificar un estilo) y como apoyo Wikipedia «Estilo (tipografía)» y «Jerarquía».
- **Ejercicios (6)**: `opciones` ×3 (qué es un estilo; para qué sirve un título 2; qué se rompe si el título se aplica a unas letras sueltas), `texto` (definición de «estilo»), `ordenar` (pasos para dar estructura a un documento) y `numero` (cuántos niveles tiene la jerarquía del diagrama).

## 4. Listas y tablas

- **Apertura**: cinco instrucciones para montar un mueble, todas en un solo bloque. La pregunta es cómo se ordenan en dos columnas.
- **Términos (máximo 3 en negritas)**:
  - **viñeta** (<span lang="en">bullet</span>): la marca que precedes cada elemento de una lista sin orden;
  - **numeración** (<span lang="en">numbering</span>): la lista cuyos elementos van numerados porque el orden importa;
  - **tabla** (<span lang="en">table</span>): la rejilla de filas y columnas para comparar cosas.
- **Idea central**: una lista es un bloque de elementos parecidos: con viñeta cuando el orden no importa (ingredientes, pasos sueltos) y con numeración cuando el orden importa (pasos, pasos de una receta, prioridades). Y las listas se pueden anidar: una lista dentro de otra, con sangrías, para organizar en niveles. La tabla es para comparar: filas y columnas, con una fila de encabezado que dice de qué es cada columna. Y tres cosas prácticas de la tabla: mover y copiar filas y columnas enteras, ajustar el ancho de una columna sin romper el resto, y la fila de encabezado que se puede repetir en cada página si la tabla es larga. Y el aviso: una tabla no es una hoja de cálculo (los cálculos van en la U3).
- **Visual**: diagrama de una lista con viñetas junto a una lista numerada y una tabla de tres filas y dos columnas, con `descripcion`; más una tabla «elemento / para qué sirve» con `<th scope="row">`: viñeta, numeración, sangría, fila de encabezado, mover una fila.
- **Ejemplo resuelto**: convertir un bloque de texto en una lista y en una tabla, paso a paso (seleccionar las líneas → aplicar viñeta o numeración → anidar el subpunto con la sangría → seleccionar las partes que se comparan → insertar una tabla de dos columnas → escribir los encabezados → mover una fila). Se comprueba contando filas y columnas.
- **Remisiones**: L3 (la jerarquía de títulos también se apoya en listas), «Celdas, filas y columnas» (U3: la tabla como hoja de cálculo).
- **Fuentes a buscar**: ayuda de LibreOffice Writer (listas con viñetas y numeradas, tablas: insertar, mover filas, encabezado) y como apoyo Wikipedia «Lista» y «Tabla».
- **Ejercicios (6)**: `opciones` ×3 (cuándo usar viñeta y cuándo numeración; qué es la fila de encabezado; qué se puede mover en una tabla), `texto` (definición de «numeración» o «tabla»), `ordenar` (pasos para pasar un bloque de texto a lista) y `numero` (cuántas filas y columnas tiene la tabla del diagrama).

## 5. Imágenes en el documento

- **Apertura**: metes una foto y el texto se descuadra; la estiras y sale deformada. La pregunta es cómo colocar una imagen sin romper el documento.
- **Términos (máximo 3 en negritas)**:
  - **anclaje** (<span lang="en">anchor</span>): el punto del documento al que queda pegada la imagen;
  - **redimensionar** (<span lang="en">resize</span>): cambiar el tamaño de la imagen;
  - **texto alternativo** (<span lang="en">alt text</span>): la descripción que se guarda con la imagen y leen los lectores de pantalla.
- **Idea central**: insertar una imagen es fácil; lo difícil es colocarla. La imagen va **anclada** a algo: a un párrafo, a un carácter o a la página, y de eso depende que se mueva con el texto o que se quede quieta. Al redimensionar hay que conservar las **proporciones**: si cambias el ancho y el alto por separado, la foto sale estirada. Y hay dos formas de meter texto alrededor: el texto fluye en paralelo (la imagen ocupa su sitio y el texto la rodea) o la imagen está delante o detrás del texto. Y hay un detalle de accesibilidad que no es opcional en un sitio que se quiere leer con lector de pantalla: la **imagen necesita texto alternativo**, que es la descripción de lo que se ve. Para un gráfico de datos, esa descripción es la que le da sentido a quien no ve la imagen; para una foto decorativa, se marca como decorativa y se deja vacía.
- **Visual**: diagrama con tres casos de anclaje (a un párrafo, a un carácter, a la página) dibujados sobre un bloque de texto, con `descripcion`; más una tabla «ajuste / qué hace» con `<th scope="row">`: mantener proporciones, ajustar al ancho, contorno del texto, texto alternativo.
- **Ejemplo resuelto**: insertar una foto y colocarla bien, paso a paso (insertar → redimensionar manteniendo la proporción → elegir el anclaje y el contorno del texto → escribir el texto alternativo → guardar y comprobar que el texto sigue en su sitio). Se comprueba con el documento abierto en otro tamaño de pantalla.
- **Remisiones**: U4 «Imágenes y gráficos en presentaciones» (la misma idea en otro programa), «Leer gráficas e infografías» (Lectura: qué información debe llevar una imagen de datos).
- **Fuentes a buscar**: ayuda de LibreOffice Writer (insertar imágenes, anclar, ajustar tamaño y proporciones, texto alternativo) y como apoyo Wikipedia «Texto alternativo» y «Formato de imagen».
- **Ejercicios (6)**: `opciones` ×3 (qué es el anclaje; qué pasa si se estira sin mantener proporciones; para qué sirve el texto alternativo), `texto` (definición de «anclaje» o «texto alternativo»), `ordenar` (pasos para insertar y colocar una imagen) y `numero` (cuántos casos de anclaje hay en el diagrama).

## 6. Encabezados, pies de página y numeración

- **Apertura**: al imprimir diez páginas, ninguna dice qué es ni en cuál estás. La pregunta es cómo se rotula cada hoja.
- **Términos (máximo 3 en negritas)**:
  - **encabezado** (<span lang="en">header</span>): la franja de arriba de cada página;
  - **pie de página** (<span lang="en">footer</span>): la franja de abajo de cada página;
  - **numeración de páginas** (<span lang="en">page numbering</span>): el número que se imprime en cada hoja.
- **Idea central**: el documento se compone de un cuerpo (lo que escribes) y de zonas que se repiten en todas las páginas: el encabezado arriba y el pie abajo. En el encabezado suele ir el título del documento o el nombre del autor; en el pie, el número de página y a veces la fecha. Y hay un detalle que sorprende: el encabezado y el pie pueden ser **distintos en la primera página** (para no repetir el título en la portada) y **distintos en páginas pares e impares** (para libros a doble cara). La numeración de páginas puede empezar en 1 o continuar desde otra, y puede estar en el centro, a la izquierda o a la derecha. Y una diferencia importante entre los dos: el encabezado se escribe en el área superior de la página, dentro del margen; el pie, en la inferior; el texto del cuerpo nunca invade esas zonas.
- **Visual**: diagrama de una página con las tres zonas (encabezado, cuerpo, pie) y los márgenes dibujados, con `descripcion`; más una tabla «elemento / para qué sirve / dónde se cambia» con `<th scope="row">`: encabezado, pie, primera página distinta, números de página, márgenes.
- **Ejemplo resuelto**: rotular un documento de cinco páginas, paso a paso (activar el encabezado → escribir el título → activar el pie → insertar la numeración de páginas → dejar la primera página sin encabezado → imprimir la vista previa de dos páginas). Se comprueba que la numeración va de 1 a 5 y que el pie no choca con el texto.
- **Remisiones**: L9 (el PDF y la impresión de lo que sale aquí), «Escribir un correo formal» (Inglés: el mismo cuidado con las cabeceras de una carta formal).
- **Fuentes a buscar**: ayuda de LibreOffice Writer (encabezados y pies, primera página distinta, números de página, márgenes) y como apoyo Wikipedia «Encabezado» y «Margen».
- **Ejercicios (6)**: `opciones` ×3 (dónde va el número de página; para qué sirve dejar la primera página distinta; qué zona no usa el cuerpo del texto), `texto` (definición de «pie de página»), `ordenar` (pasos para rotular el documento) y `numero` (cuántas zonas tiene el diagrama de la página).

## 7. Índice automático

- **Apertura**: un documento de veinte páginas sin índice es un laberinto. La pregunta es cómo se arma uno que se actualiza solo.
- **Términos (máximo 3 en negritas)**:
  - **índice** (<span lang="en">table of contents</span>): la lista de las secciones del documento con su página;
  - **campo** (<span lang="en">field</span>): el hueco del documento que el programa rellena solo (el índice es uno);
  - **actualizar** (<span lang="en">update</span>): pedirle al programa que vuelva a calcular un campo.
- **Idea central**: un índice automático no se escribe a mano: el programa lo construye. Y para eso necesita dos cosas: que las secciones estén marcadas con los estilos de título (L3) y que el índice se inserte como un **campo**, un hueco que el programa rellena con la lista de títulos y sus páginas. La consecuencia importante: si escribes un título nuevo, el índice **no se actualiza solo**: hay que actualizarlo, y hasta entonces está viejo (por eso el índice manual se queda desfasado y se vuelve un problema). También: se puede elegir qué niveles entran (solo título 1, o hasta título 2), se puede cambiar el texto de los títulos sin que se rompa la lista, y se puede quitar el índice sin tocar el documento. Y el orden de las operaciones: primero se escribe el texto con sus estilos, al final se inserta el índice y se actualiza.
- **Visual**: diagrama con tres cajas: «Títulos con estilos» → «Índice (campo)» → «Páginas», con `descripcion`; más una tabla «paso / qué pasa» con `<th scope="row">`: insertar el índice, actualizar, cambiar los niveles, quitar el índice.
- **Ejemplo resuelto**: montar el índice de un documento de tres capítulos, paso a paso (marcar los capítulos con título 1 y las subsecciones con título 2 → colocar el cursor donde va el índice → insertarlo → revisarlo → añadir un capítulo nuevo → ver que el índice sigue igual → actualizarlo). Se comprueba que el capítulo nuevo aparece con su número de página.
- **Remisiones**: L3 (los estilos de título, requisito para todo esto), «Hacer un resumen» (Lectura: el índice y el resumen cumplen funciones distintas), L1 (el índice es un campo: no se edita a mano).
- **Fuentes a buscar**: ayuda de LibreOffice Writer (índice, tabla de contenido, actualizar el índice, niveles) y como apoyo Wikipedia «Índice (documento)» y «Campo (documentación)».
- **Ejercicios (6)**: `opciones` ×3 (qué es un campo; por qué el índice queda viejo; qué necesita el índice para construirse), `texto` (definición de «índice» o «campo»), `ordenar` (los pasos: estilos → insertar → actualizar) y `numero` (cuántos capítulos tiene el ejemplo).

## 8. Ortografía, comentarios y control de cambios

- **Apertura**: en un trabajo de grupo, tres personas escribieron a la vez y nadie sabe qué cambió. La pregunta es cómo revisar sin pisarse.
- **Términos (máximo 3 en negritas)**:
  - **comentario** (<span lang="en">comment</span>): una nota al margen, anclada a un texto, que no forma parte del documento;
  - **control de cambios** (<span lang="en">track changes</span>): el modo en el que el programa anota y guarda cada cambio;
  - **autocorrección** (<span lang="en">autocorrect</span>): el corrector que cambia las palabras mientras escribes.
- **Idea central**: son tres herramientas distintas y a veces se confunden. La **autocorrección** actúa mientras escribes: capitaliza la primera letra, cambia dos mayúsculas por una, corrige un par de palabras. Se puede ajustar o desactivar, y conviene saber que existe, porque a veces corrige lo que no debía. El **corrector ortográfico** marca las palabras que no reconoce (con el color y la wavy line roja) y propone corregir; se acepta una por una o todas. Y para trabajar con otra persona, el **control de cambios**: con el modo activado, cada palabra que se añade, se borra o se cambia queda marcada y con el nombre de quien la hizo, y el documento original se conserva; después se acepta o se rechaza cada cambio uno a uno. El **comentario** es la otra vía: no cambia el texto, solo deja una nota al lado (por eso no hay que aceptar ni rechazar nada). Y el orden de trabajo: se revisa con control de cambios activado, se deja un comentario donde haga falta una explicación, y al final se aceptan los cambios y se borran los comentarios.
- **Visual**: tabla «herramienta / qué hace / qué se ve» con `<th scope="row">`: autocorrección, corrector ortográfico, control de cambios, comentario, aceptar o rechazar un cambio; más un diagrama de un párrafo con texto tachado, texto añadido y una nota al margen, con `descripcion`.
- **Ejemplo resuelto**: revisar el trabajo de un compañero, paso a paso (activar el control de cambios → corregir dos frases → dejar un comentario preguntando por una afirmación → desactivar el control de cambios → aceptar un cambio y rechazar otro → borrar el comentario). Se comprueba que el texto final es el que uno quiere.
- **Remisiones**: «Acentuación» y «Puntuación» (Lectura: las reglas que el corrector no sabe), «Escribir un ensayo argumentativo» (Lectura: el texto que se revisa), «Documentos compartidos y colaboración» (U5: trabajar a la vez en la nube es otra cosa).
- **Fuentes a buscar**: ayuda de LibreOffice Writer (autocorrección, corrector ortográfico, control de cambios, comentarios, aceptar y rechazar) y como apoyo Wikipedia «Control de cambios» y «Corrector ortográfico».
- **Ejercicios (6)**: `opciones` ×3 (qué hace el control de cambios; diferencia entre comentario y cambio; qué puede cambiar la autocorrección), `texto` (definición de «comentario» o «control de cambios»), `ordenar` (pasos para revisar el trabajo de un compañero) y `numero` (cuántas herramientas tiene la tabla).

## 9. Exportar a PDF e imprimir

- **Apertura**: mandas un documento y al otro lado se ve distinto, con las imágenes movidas. La pregunta es cómo mandarlo igual y cómo llevarlo al papel.
- **Términos (máximo 3 en negritas)**:
  - **PDF** (<span lang="en">PDF</span>): el formato que fija el aspecto del documento tal como se ve en pantalla;
  - **exportar** (<span lang="en">export</span>): crear una copia del documento en otro formato;
  - **vista previa** (<span lang="en">print preview</span>): la vista que muestra cómo va a quedar al imprimir.
- **Idea central**: **exportar a PDF** crea una copia del documento en un formato que se ve igual en cualquier dispositivo y en cualquier programa, y que no se puede alterar por accidente. No es lo mismo que imprimir: el PDF es un archivo que queda en el equipo y se manda; la impresión es el papel. Para el PDF conviene decidir el **formato de papel** (A4, Carta), la orientación (vertical o horizontal) y si se imprime el texto o el fondo. Y al imprimir, la **vista previa** muestra lo que va a salir, cuántas páginas son y cómo van a salir en el papel: es el último control antes de gastar hojas y tinta. Con las opciones de impresión se puede cambiar el número de copias, imprimir un rango de páginas (solo la 3 y la 4), o poner dos páginas en cada hoja para ahorrar papel. Y dos avisos: el PDF se puede leer con un programa que solo lee (no se edita), y si el documento tiene cambios sin guardar, hay que guardarlos antes de exportar.
- **Visual**: diagrama «documento → exportar → PDF (archivo, se ve igual)» y «documento → imprimir → papel», con `descripcion`; más una tabla «opción / para qué sirve» con `<th scope="row">`: formato de papel, orientación, número de copias, rango de páginas, dos páginas por hoja.
- **Ejemplo resuelto**: dejar un documento listo para entregar, paso a paso (guardar → exportar a PDF → elegir formato A4 → abrir el PDF en otro dispositivo y comprobar que se ve igual → volver al programa, abrir la vista previa de impresión → imprimir solo las páginas 1 y 2 en una copia). Se comprueba que el PDF tiene las mismas páginas que el documento.
- **Remisiones**: L1 (el PDF es un formato de archivo, como los de L1), L6 (el encabezado y el pie también salen en el PDF).
- **Fuentes a buscar**: ayuda de LibreOffice Writer (exportar a PDF, opciones de PDF, imprimir, vista previa) y como apoyo Wikipedia «Portable Document Format» y «Impresión».
- **Ejercicios (6)**: `opciones` ×3 (diferencia entre exportar e imprimir; para qué sirve la vista previa; qué formato fija el aspecto), `texto` (definición de «exportar» o «vista previa»), `ordenar` (los pasos: guardar → exportar → comprobar → vista previa → imprimir) y `numero` (cuántos formatos de salida tiene el diagrama).

## Reglas de la unidad

- **Términos en inglés**: la primera vez, el término en español y el original en `<span lang="en">`. Si la palabra es igual en español y en inglés, el paréntesis sobra y no se pone.
- **Máximo 3 `<strong>` por lección** en la explicación. Todo lo que haya que memorizar y no quepa en las tres negritas va en tabla con `<th scope="row">`.
- **Extensión**: `explicacion` 400–650 palabras · `ejemplo` 120–180 · `vidaReal` 60–90. Frases completas y conectadas, una idea por párrafo.
- **Estructura**: objetivo → «¿para qué sirve en la vida real?» (obligatorio, se lee antes y sin usar términos no definidos) → explicación → ejemplo resuelto paso a paso → ejercicios → fuentes.
- **Tono**: español neutro, tuteo, «fíjate»/«imagina». Sin signos de exclamación, sin «simplemente», sin emojis, iconos solo SVG. No se juzga a quien se equivoca: el error va en la nota de «Error común». No se asume el género del lector.
- **Ejercicios**: 6 por lección, tipos `numero`, `opciones`, `texto` y `ordenar`. Respuestas numéricas como operación. Índices `correcta:` repartidos. Los `texto` aceptan con y sin artículo y con sinónimos.
- **Visuales**: diagramas con el helper `diagrama` (cajas, flechas, `txt`), lienzo proporcional y `descripcion` obligatoria; tablas con `<th>` dentro de `.tabla-wrap`; toda gráfica con `descripcion`. Revisar con `render.js` que ningún texto se solape.
- **Sin capturas de pantalla**: los «pantallazos» son tablas HTML y diagramas SVG, con el texto describiendo lo que se ve.
- **Programa de referencia**: LibreOffice Writer, con la regla de que primero va el concepto genérico (estilo, encabezado, índice) y después el nombre del comando en el programa, para que el lector lo encuentre en el suyo aunque se llame distinto. No se nombran programas de Microsoft.
- **Formatos**: se enseñan los nombres (`.txt`, `.odt`, `.docx`, `.pdf`) y el aviso que aparece al guardar en formato de otro programa.
- **Datos por país**: casi nada en esta unidad; si aparece algo de la ayuda oficial, con su año. Las cifras de los ejemplos son de ejemplo y se dicen.
- **Remisiones**: los títulos citados entre comillas tienen que existir en `js/temario.js`; los títulos de unidad no valen como remisión.
- **Prohibido repetir**: no se repiten las reglas de escritura de Lectura («Acentuación», «Puntuación», «Estructura de un texto») ni la explicación de archivos de la U1.
- **Cero instalación**: nada de `import`, `fetch()`, `.json`, `<script type="module">`, CDN ni dependencias.

## Decisiones tomadas por el usuario (2026-10-22)

1. **Programa de referencia**: LibreOffice Writer como ejemplo principal (es libre, su ayuda oficial en español está verificada y la materia ya menciona «Ofimática, internet y comunicación libres»). Regla: primero el concepto genérico (estilo, encabezado, índice) y después el nombre del comando, para que el lector lo encuentre en el suyo aunque se llame distinto. No se nombran programas de Microsoft.
2. **Formatos**: sí se enseñan los nombres de formato (`.txt`, `.odt`, `.docx`, `.pdf`) y el aviso que aparece al guardar en formato de otro programa.
3. **Lección-proyecto**: no. La unidad tiene las 9 lecciones del temario, sin añadir una décima.

## Pendiente al implementar

- Añadir a `.claude/trabajo/ofimatica/computadora/reglas-materia.md` (borrador de las reglas de la materia) las reglas que fija esta unidad.
