# Plan · ofimatica · Unidad 3: Hojas de cálculo

- Archivo destino: `lecciones/ofimatica/hojas-de-calculo.js` (materia `ofimatica`).
- Ficha: `.claude/trabajo/ofimatica/hojas-de-calculo/ficha.md`.
- 12 lecciones, 6 ejercicios cada una (72 ejercicios). Escritura en **4 fragmentos** de 3 lecciones: L1–L3, L4–L6, L7–L9, L10–L12 (un constructor nuevo por fragmento; cada uno **añade** al final del archivo, nunca reescribe).
- Reglas de la materia: `.claude/trabajo/ofimatica/computadora/reglas-materia.md` (borrador de `.claude/docs/materias/ofimatica.md`; el Director no puede editar `.claude/docs/`).
- Unidades anteriores: U1 «La computadora» (7) y U2 «Procesador de textos» (9), ambas escritas y auditadas.
- Programa de referencia: **LibreOffice Calc**, igual que U2 con Writer. Regla: primero el concepto genérico (hoja, celda, fórmula, filtro) y después el nombre del comando o de la función.
- Títulos exactos de `js/temario.js` (no se cambian sin que el usuario lo pida):
  1. Celdas, filas y columnas
  2. Tipos de datos
  3. Fórmulas básicas
  4. Referencias relativas y absolutas
  5. Funciones: SUMA, PROMEDIO, MIN, MAX y CONTAR
  6. La función SI
  7. Buscar datos: BUSCARV y BUSCARX
  8. Ordenar y filtrar
  9. Formato condicional
  10. Gráficos
  11. Tablas dinámicas
  12. Proyecto: tu presupuesto personal en una hoja de cálculo

## Cortes con las demás unidades y materias

| Lo que hay en esta unidad | Lo que NO se toca aquí |
|---|---|
| La rejilla y las celdas (L1) | La U2 ya explicó qué es un archivo y dónde se guarda: aquí la hoja es un archivo más, y no se repite. |
| Tipos de datos (L2) | No se explica qué es un porcentaje ni una fracción: es de Matemáticas («Porcentajes», «Fechas y formatos», no: «Números decimales»). |
| Fórmulas y referencias (L3–L4) | No se explica el orden de las operaciones: es de Matemáticas («Jerarquía de operaciones»). Aquí la fórmula como objeto de la hoja. |
| Funciones (L5–L7) | La media, la mediana y la moda como conceptos son de Matemáticas («Media, mediana y moda»): aquí la función de la hoja. |
| Ordenar y filtrar (L8) | La tabla de una hoja de texto es de la U2 («Listas y tablas»): aquí hay datos que se pueden ordenar y filtrar de verdad. |
| Formato condicional (L9) | El color de un gráfico y su lectura son de Matemáticas («Gráficas: barras, pastel e histogramas») y de Lectura («Leer gráficas e infografías»). |
| Gráficos (L10) | Igual que arriba: qué dice un gráfico es de Matemáticas; aquí cómo se construye en la hoja. |
| Tablas dinámicas (L11) | No se explica el concepto de tabla de frecuencias de Matemáticas. |
| Proyecto (L12) | **El método no se explica aquí**: es de Finanzas personales («Hacer tu primer presupuesto», «La regla 50/30/20», «Ingresos y gastos», «Gastos hormiga»). Aquí solo se aplica en la hoja, con cifras de ejemplo. |
| Remisiones que sí se usan | L1 → «Archivos y carpetas» (U1). L3 → «Jerarquía de operaciones» (Matemáticas). L5 → «Media, mediana y moda» (Matemáticas). L9–L10 → «Gráficas: barras, pastel e histogramas» (Matemáticas), «Leer gráficas e infografías» (Lectura), «Cómo leer estadísticas en las noticias sin que te engañen» (Matemáticas). L12 → «Hacer tu primer presupuesto», «La regla 50/30/20», «Ingresos y gastos», «Gastos hormiga» (Finanzas personales). |

## 1. Celdas, filas y columnas

- **Apertura**: una hoja de cálculo parece una tabla gigante y vacía. La pregunta es cómo se habla de cada casilla.
- **Términos (máximo 3 en negritas)**:
  - **celda** (<span lang="en">cell</span>): cada casilla de la rejilla;
  - **hoja de cálculo** (<span lang="en">spreadsheet</span>): el archivo con la rejilla de celdas;
  - **rango** (<span lang="en">range</span>): un grupo de celdas que se escribe con dos referencias (B2:B9).
- **Idea central**: la hoja es una rejilla enorme: las columnas se nombran con letras (A, B, C…) y las filas con números (1, 2, 3…). Cada casilla es una **celda**, y se nombra con la letra de su columna y el número de su fila: B3 es la tercera fila de la segunda columna. Esa combinación es la **referencia** de la celda, y es la dirección que se usa para hablar de ella y para meterla en una fórmula. Y hay dos niveles de trabajo: una celda (el dato de hoy) y un **rango** (un bloque: B2:B9 son las ocho celdas de la columna B, desde la fila 2 hasta la 9). Y dos cosas que la gente olvida: en una hoja hay varias hojas de cálculo, cada una con su propia rejilla (una para datos, otra para el resumen), y una hoja puede tener muchísimas celdas: el límite no es un problema real. Al final, la regla que explica todo lo demás: una celda tiene un contenido, y ese contenido puede ser un dato escrito a mano o el resultado de una cuenta.
- **Visual**: diagrama de la rejilla con las letras de las columnas arriba, los números de las filas a la izquierda y una celda marcada con su referencia (B3); más una tabla «elemento / qué es» con `<th scope="row">`: columna, fila, celda, referencia, rango, hoja.
- **Ejemplo resuelto**: nombrar celdas y un rango, paso a paso (buscar la celda B3 con la letra de la columna y el número de la fila → leer su referencia → señalar el rango B2:B9 contando desde B2 hasta B9 → comprobar que el rango se escribe con dos puntos). Se termina comprobando que el programa muestra el nombre de la celda al seleccionarla.
- **Remisiones**: «Archivos y carpetas» (U1), L3 (la referencia es lo que se escribe dentro de una fórmula).
- **Fuentes a buscar**: ayuda de LibreOffice Calc (la rejilla, celdas, rangos, hojas) y como apoyo Wikipedia «Hoja de cálculo» y «Referencia de celda».
- **Ejercicios (6)**: `opciones` ×3 (qué referencia es una celda; qué significa un rango; cuántas hojas tiene un libro), `texto` (definición de «celda» o «rango»), `ordenar` (los pasos para encontrar una celda) y `numero` (cuántas celdas tiene un rango de 3 columnas por 4 filas).

## 2. Tipos de datos

- **Apertura**: escribes 12,5 en una celda y el programa lo pone a la derecha; escribes «12,5» y lo pone a la izquierda. La pregunta es por qué.
- **Términos (máximo 3 en negritas)**:
  - **número** (<span lang="en">number</span>): el tipo que se puede calcular;
  - **fecha** (<span lang="en">date</span>): el tipo con día, mes y año;
  - **error** (<span lang="en">error</span>): el valor que muestra el programa cuando una fórmula no puede calcular (#DIV/0!, #N/A, #VALOR!).
- **Idea central**: la celda guarda un **tipo** de dato, y el tipo decide qué se puede hacer con él. Los dos que más se confunden son el número y el texto: el número va alineado a la derecha y se puede sumar; el texto va a la izquierda y no se puede sumar (sumar un texto no da error, da cero, y ahí es donde se pierde un presupuesto sin que nadie se entere). Y las fechas: si escribes «3/4/25», el programa lo entiende como fecha según el formato de tu sistema, y esa ambigüedad (¿3 de abril o 4 de marzo?) es la trampa más común de las hojas. Y el **error**: cuando una fórmula no puede calcular, el programa no se calla, escribe un error (#DIV/0! al dividir entre cero, #N/A al buscar algo que no está, #VALOR! al operar con texto). Ese error se propaga a las celdas que dependen de él, así que un error pequeño se convierte en una columna entera de errores. Y dos reglas de higiene: el formato de la celda y el formato de la pantalla son cosas distintas (una celda puede mostrar 12,50 € y guardar 12,5), y cuando un total sale raro, lo primero es mirar el tipo de las celdas que suman.
- **Visual**: tabla «tipo / cómo se ve / qué se puede hacer con él» con `<th scope="row">`: número, texto, fecha, error; más un diagrama de una columna con tres celdas (número a la derecha, texto a la izquierda, error en rojo) y su `descripcion`.
- **Ejemplo resuelto**: descubrir por qué una suma da cero, paso a paso (mirar si las celdas de la columna están a la derecha o a la izquierda → ver que una está alineada a la izquierda → cambiar su tipo a número → repetir la suma → comprobar). Se termina con el aviso de las fechas ambiguas.
- **Remisiones**: L1 (la celda y su contenido), «Números decimales» (Matemáticas: cómo se escribe un decimal).
- **Fuentes a buscar**: ayuda de LibreOffice Calc (tipos de dato, formato de celda, errores en las fórmulas) y como apoyo Wikipedia «Tipo de dato» y «Error de división por cero».
- **Ejercicios (6)**: `opciones` ×3 (qué tipo tiene una celda alineada a la izquierda; qué error aparece al dividir entre cero; por qué una fecha escrita con barras es ambigua), `texto` (definición de «error» o «fecha»), `ordenar` (pasos para averiguar por qué una suma da cero) y `numero` (cuántos tipos de dato hay en la tabla).

## 3. Fórmulas básicas

- **Apertura**: en una celda escribes «=2+2» y el programa escribe 4. La pregunta es cómo se le pide una cuenta.
- **Términos (máximo 3 en negritas)**:
  - **fórmula** (<span lang="en">formula</span>): lo que se escribe para que el programa calcule;
  - **operador** (<span lang="en">operator</span>): el símbolo que une dos valores (+, −, ×, ÷, ^);
  - **barra de fórmulas** (<span lang="en">formula bar</span>): la franja de arriba donde se ve y se edita la fórmula de la celda.
- **Idea central**: una fórmula empieza por el signo igual, y a partir de ahí es una cuenta con dos tipos de ingredients: números escritos a mano o referencias a otras celdas. Escribir «=A1+A2» es pedirle al programa que sume lo que hay en esas dos celdas, y si luego cambias A1, el resultado cambia solo. Y los operadores: sumar, restar, multiplicar, dividir y elevar a una potencia, con el orden de las operaciones ya Nolan's (la multiplicación va antes que la suma). Y dos atajos que ahorran mucho: la **suma automática**, el botón Σ que pone la suma de la columna o de la fila de al lado, y el tirador de relleno, la manija de la esquina de la celda que arrastra la fórmula hacia abajo y hacia la derecha. Y la regla de oro del manejo de celdas: si copias una fórmula, las referencias viajan con ella (eso es la L4). Y dos errores que hay que reconocer: empezar la fórmula sin el signo igual (el programa cree que es texto) y olvidar que las fórmulas se recalculan solas.
- **Visual**: diagrama de la fórmula (celdas A1 y A2 → «=A1+A2» → celda A3 con el resultado) con `descripcion`; más una tabla «operador / qué hace / ejemplo» con `<th scope="row">`: +, −, ×, ÷, ^, paréntesis.
- **Ejemplo resuelto**: hacer los tres cálculos de una hoja de gastos, paso a paso (escribir el primer importe, escribir en la celda de al lado la fórmula con el signo igual → pulsar Enter → ver el resultado en la barra de fórmulas → usar la suma automática en el total → comprobar con la barra de fórmulas que la fórmula es la que se cree). Se termina explicando que al cambiar un importe, el total se corrige solo.
- **Remisiones**: L1 (la referencia de la celda), L4 (qué pasa al copiar una fórmula), «Jerarquía de operaciones» (Matemáticas).
- **Fuentes a buscar**: ayuda de LibreOffice Calc (fórmulas, operadores, barra de fórmulas, suma automática, tirador de relleno) y como apoyo Wikipedia «Fórmula (hoja de cálculo)».
- **Ejercicios (6)**: `opciones` ×3 (qué empieza una fórmula; qué hace el operador; qué se ve en la barra de fórmulas), `texto` (definición de «fórmula» o «operador»), `ordenar` (pasos para calcular un total con la suma automática) y `numero` (cuántos operadores hay en la tabla).

## 4. Referencias relativas y absolutas

- **Apertura**: copias la fórmula del total y, al pegarla una fila más abajo, el total cambia de sitio y da error. La pregunta es cómo se travels una fórmula sin que se rompa.
- **Términos (máximo 3 en negritas)**:
  - **referencia relativa** (<span lang="en">relative reference</span>): la dirección que se mueve con la fórmula;
  - **referencia absoluta** (<span lang="en">absolute reference</span>): la dirección que se queda fija;
  - **fijado** (<span lang="en">absolute reference marker</span>): el signo de dólar que convierte una referencia en absoluta.
- **Idea central**: cuando copias una fórmula, las referencias cambian: la fórmula «=A1*A2» puesta en la fila siguiente se convierte en «=A2*A3», porque la referencia es **relativa**: viaja con la fórmula. Eso es justo lo que quieres al arrastrar un total por una columna. Pero hay un caso en el que no: cuando una fórmula multiplica por un valor que está siempre en el mismo sitio (un precio, un porcentaje, un tipo de cambio). Entonces la referencia tiene que ser **absoluta**, y se escribe con el signo de dólar delante de la letra y del número: «=$B$1*A2». El signo de dólar es el **fijado**: dice «esta dirección no se mueve, aunque copies la fórmula». Y la regla práctica: si al copiar y pegar el resultado sale raro, mira si falta un signo de dólar. Y un matiz que conviene saber: en una referencia absoluta con un solo dólar («=$B1»), la columna se queda fija y la fila se mueve; con dos («=$B$1»), se quedan fijas las dos.
- **Visual**: diagrama con dos rejillas pequeñas lado a lado: la fórmula que se copia y cómo cambia la referencia (A2→A3, B2→B3) frente a la misma fórmula con la referencia fijada ($B$1 se queda); más una tabla «tipo de referencia / ejemplo / qué pasa al copiarla» con `<th scope="row">`.
- **Ejemplo resuelto**: un total con un precio único, paso a paso (escribir el precio en B1 → en la celda de la derecha, «=A2*$B$1» → comprobar que da el precio por la cantidad → copiar la fórmula hacia abajo y comprobar que el resultado sigue siendo el correcto y que el precio no se ha movido → comparar con «=A2*B1», que sí se mueve y da error en la segunda fila). Se termina comprobando el resultado en la barra de fórmulas.
- **Remisiones**: L3 (copiar una fórmula), L5 (multiplicar por un precio, el caso típico).
- **Fuentes a buscar**: ayuda de LibreOffice Calc (referencias absolutas y relativas, el signo de dólar) y como apoyo Wikipedia «Referencia absoluta» (si existe en español) y «Referencia de celda».
- **Ejercicios (6)**: `opciones` ×3 (qué referencia no se mueve; qué hace el signo de dólar; qué referencia es relativa), `texto` (definición de «referencia absoluta»), `ordenar` (pasos para dejar fija una referencia) y `numero` (cuántas referencias muestra el diagrama).

## 5. Funciones: SUMA, PROMEDIO, MIN, MAX y CONTAR

- **Apertura**: «sumar la columna» a mano es un trabajo que se repite cada mes. La pregunta es cómo se lo pides al programa una vez.
- **Términos (máximo 3 en negritas)**:
  - **función** (<span lang="en">function</span>): una operación con nombre que el programa sabe hacer;
  - **argumento** (<span lang="en">argument</span>): lo que le pasas a la función (un rango, un número, un texto);
  - **suma automática** (<span lang="en">AutoSum</span>): el botón Σ que escribe la fórmula de suma o de promedio por ti.
- **Idea central**: una **función** es una operación con nombre, y se escribe con su nombre y sus paréntesis: «=SUMA(B2:B9)». Lo que va dentro son los **argumentos**: aquí, el rango de celdas que hay que sumar. Y hay una diferencia clave con la fórmula de la L3: en una función no escribes los signos, y el separador entre argumentos puede ser punto y coma (según la configuración del programa). Las cinco funciones de la lección se reparten las preguntas que más se hacen: **SUMA** suma, **PROMEDIO** calcula la media de un rango, **MIN** y **MAX** dan el valor más pequeño y el más grande, y **CONTAR** dice cuántos números hay. Y una trampa que conviene ver pronto: CONTAR cuenta solo los números, así que una celda con texto (un espacio, una guion, la palabra «pendiente») no se cuenta, y el resultado sale más bajo de lo que parece. Y la **suma automática** (el botón Σ) escribe sola la fórmula de suma, y con la flecha del botón, la de promedio, la de mínimo, la de máximo y la de contar. Y la práctica que ahorra más tiempo: una celda de total con la función, y el tirador de relleno para llevarla a otras columnas.
- **Visual**: tabla «función / qué hace / ejemplo de fórmula» con `<th scope="row">`: SUMA, PROMEDIO, MIN, MAX, CONTAR; más un diagrama de una columna de datos con la celda de total debajo y la flecha del tirador de relleno, con `descripcion`.
- **Ejemplo resuelto**: poner cinco totales en una hoja de gastos, paso a paso (marcar el rango → pulsar la suma automática → comprobar el resultado en la barra de fórmulas → cambiar el argumento a un promedio con la flecha del botón → contar con CONTAR → comprobar que el total cambia cuando se edita un importe). Se termina explicando por qué el total no se actualiza solo si se ha escrito el rango equivocado.
- **Remisiones**: L3 (la fórmula y la barra de fórmulas), L4 (arrastrar la fórmula hacia abajo), «Media, mediana y moda» (Matemáticas: el concepto de media).
- **Fuentes a buscar**: ayuda de LibreOffice Calc (SUMA, PROMEDIO, MIN, MAX, CONTAR, la suma automática y sus variantes) y como apoyo Wikipedia «Función (hoja de cálculo)».
- **Ejercicios (6)**: `opciones` ×3 (qué función da el valor más grande; qué cuenta CONTAR; qué es un argumento), `texto` (definición de «función»), `ordenar` (pasos para poner un total con la suma automática) y `numero` (cuántas funciones hay en la tabla).

## 6. La función SI

- **Apertura**: la columna del total necesita un texto: «pendiente» si falta un dato, «al día» si está pagado. La pregunta es cómo pedir una cosa u otra según el caso.
- **Términos (máximo 3 en negritas)**:
  - **condición** (<span lang="en">condition</span>): la pregunta que se responde con verdadero o falso;
  - **valor verdadero** (<span lang="en">true value</span>): lo que se escribe si la condición se cumple;
  - **valor falso** (<span lang="en">false value</span>): lo que se escribe si no se cumple.
- **Idea central**: la función **SI** hace una pregunta y escoge una de dos respuestas. Se escribe «=SI(prueba; valor_si_verdadero; valor_si_falso)»: primero la **condición** (una comparación, como B2>100 o A2="pagado"), y después los dos resultados. Y lo que la hace útil en una hoja: se puede escribir un texto, un número o un cálculo en cada rama, así que la misma fórmula sirve para marcar un pago, para avisar de un límite o para calcular una comisión. Y dos cosas prácticas: las comas (o los puntos y coma, según el programa) van entre las partes, y el texto que se compara va entre comillas rectas, porque sin ellos el programa lo confunde con el nombre de una celda. Y un cuidado con las condiciones: si comparas texto, el programa solo lo reconoce si está escrito exactamente igual. Y la forma de leerla en voz alta: «si A2 es mayor que 100, escribe «al día»; si no, escribe «pendiente»».
- **Visual**: diagrama de la decisión (condición → dos ramas: «sí» y «no») con `descripcion`; más una tabla «parte de la función / qué es / ejemplo» con `<th scope="row">`: condición, valor verdadero, valor falso, y una fila con el separador.
- **Ejemplo resuelto**: marcar los pagos de una hoja, paso a paso (escribir la fórmula con la condición y las dos respuestas → comprobar que sale el texto esperado → cambiar el importe para ver la otra rama → escribir la condición con un texto entre comillas y comprobar que ahora funciona). Se termina con el error común: olvidar las comillas en el texto.
- **Remisiones**: L5 (las funciones y sus argumentos), L2 (el tipo de dato de la celda comparada).
- **Fuentes a buscar**: ayuda de LibreOffice Calc (la función SI, sus sintaxis, las comas y los puntos y coma) y como apoyo Wikipedia «Función condicional».
- **Ejercicios (6)**: `opciones` ×3 (qué escribe la función SI cuando la condición es falsa; qué va primero en la fórmula; para qué sirve la rama verdadera), `texto` (definición de «condición»), `ordenar` (las tres partes de la función SI en orden) y `numero` (cuántas ramas tiene el diagrama).

## 7. Buscar datos: BUSCARV y BUSCARX

- **Apertura**: tienes la lista de precios en una tabla y los nombres en otra. La pregunta es cómo cruzarlos sin mirar fila por fila.
- **Términos (máximo 3 en negritas)**:
  - **valor buscado** (<span lang="en">lookup value</span>): lo que se busca y que se escribe en la celda donde se busca;
  - **coincidencia exacta** (<span lang="en">exact match</span>): el modo en que el valor buscado tiene que ser igual al de la tabla;
  - **error #N/A** (<span lang="en">#N/A error</span>): lo que aparece cuando no se encuentra nada.
- **Idea central**: buscar en una hoja es responder una pregunta con dos tablas: la del **valor buscado** (qué quieres encontrar) y la tabla donde se busca (una columna con la clave y las columnas con los datos). **BUSCARV** busca de arriba abajo en la primera columna de la tabla y devuelve el valor de la columna que le pidas: el nombre de la función lo dice (vertical). **BUSCARX** busca en horizontal: en una fila, en la fila de arriba, y devuelve el valor de la columna que le pidas. Los dos hacen lo mismo, pero con la tabla girada, y por eso la elección depende de cómo está ordenada la tabla: si las claves están en la primera columna, BUSCARV; si están en la primera fila, BUSCARX. Y hay que activar la **coincidencia exacta** cuando el dato tiene que ser idéntico, porque si no, la búsqueda puede quedarse con un valor parecidos (un producto «Camiseta azul» puede aparecer antes que «Camiseta azul talla M»). Y el **error #N/A** es la respuesta honesta: no se encontró el valor. Y esa es una buena noticia, porque un #N/A se ve; lo peligroso es una fórmula que devuelve cero o un valor equivocado sin avisar. Y dos reglas: la tabla de búsqueda tiene que estar ordenada, y el rango se escribe con dos puntos.
- **Visual**: diagrama de la búsqueda (celda con el valor buscado → flecha a la tabla → flecha a la celda del resultado) con `descripcion`; más una tabla «función / dónde busca / qué devuelve» con `<th scope="row">`: BUSCARV, BUSCARX, coincidencia exacta, #N/A.
- **Ejemplo resuelto**: buscar el precio de un producto, paso a paso (escribir el nombre en una celda → escribir BUSCARV con el valor buscado, el rango de la tabla y el número de columna → comprobar el resultado → cambiar el nombre por uno que no está → ver el #N/A → probar con BUSCARX sobre la misma tabla puesta al revés). Se termina explicando por qué un #N/A es mejor que un cero.
- **Remisiones**: L5 (las funciones y los argumentos), L2 (el error #N/A), L6 (la función SI, para tratar el #N/A).
- **Fuentes a buscar**: ayuda de LibreOffice Calc (BUSCARV, BUSCARX o VLOOKUP/XLOOKUP según la versión, coincidencia exacta, el error #N/A) y como apoyo Wikipedia «VLOOKUP» o «Función de búsqueda». Para BUSCARX, si la ayuda de LibreOffice no la tiene (depende de la versión), buscar la documentación oficial equivalente y dejar claro en la ficha de qué fuente sale.
- **Ejercicios (6)**: `opciones` ×3 (qué función busca en horizontal; qué muestra el error cuando no se encuentra; cuándo usar coincidencia exacta), `texto` (definición de «valor buscado»), `ordenar` (los pasos para buscar un dato en una tabla) y `numero` (cuántas funciones de búsqueda hay en la tabla).

## 8. Ordenar y filtrar

- **Apertura**: una lista de 200 ventas y una pregunta: «cuáles fueron en marzo». La pregunta es cómo no tener que mirar las 200.
- **Términos (máximo 3 en negritas)**:
  - **ordenar** (<span lang="en">sort</span>): poner las filas en un orden, de mayor a menor o de menor a mayor;
  - **filtrar** (<span lang="en">filter</span>): dejar solo las filas que cumplen una condición;
  - **criterio** (<span lang="en">criterion</span>): la condición que se le pone al filtro.
- **Idea central**: con los datos guardados en una fila por dato y una columna por característica, hay dos herramientas que ahorran horas. **Ordenar** reorganiza las filas: de la A a la Z o de la Z a la A en una columna de texto, de menor a mayor o de mayor a menor en una de números, y de la fecha más antigua a la más reciente. Y hay que ordenar por la columna correcta, no por la primera: un error típico es ordenar por el nombre del cliente y creer que se ha ordenado por el importe. **Filtrar** esconde las filas que no cumplen el **criterio**: solo «marzo», solo los importes de más de 100, y se pueden combinar varios criterios. Y la diferencia que importa: ordenar no quita nada, filtra sí esconde filas. Y dos cuidados: al ordenar, el programa puede incluir la fila de encabezados si no le dices que no (y entonces esa fila se va de sitio y la tabla se descuadra), y al filtrar, las filas que están escondidas siguen ahí (no se han borrado), así que los totales pueden seguir contando lo que no se ve. Y una regla de seguridad: antes de ordenar o filtrar mucho, copia de seguridad del archivo.
- **Visual**: diagrama de una tabla con dos estados lado a lado (sin filtrar: todas las filas; filtrada: solo las de marzo, con las demás tachadas o atenuadas) con `descripcion`; más una tabla «herramienta / para qué sirve / cuidado» con `<th scope="row">`: ordenar por columna, ordenar por texto o por número, filtrar por un criterio, combinar criterios, la fila de encabezados.
- **Ejemplo resuelto**: encontrar las ventas de marzo, paso a paso (marcar la tabla → ordenar por la columna de la fecha y comprobar que el orden es cronológico → aplicar el filtro de marzo → comprobar cuántas filas quedan → quitar el filtro y ver que todo vuelve → revisar que los totales no hayan cambiado). Se termina con el error común: ordenar creyendo que se ha filtrado, o al revés.
- **Remisiones**: L1 (la estructura de filas y columnas), L2 (las fechas: cómo se ordenan), L9 (el formato condicional, que también resalta datos).
- **Fuentes a buscar**: ayuda de LibreOffice Calc (ordenar, filtros automáticos, criterios de filtro, la fila de encabezados) y como apoyo Wikipedia «Ordenamiento» (no: «Algoritmo de ordenamiento» es abstracto) o «Filtro (informática)».
- **Ejercicios (6)**: `opciones` ×3 (qué hace filtrar; qué cambia al ordenar; por qué hay que avisar de la fila de encabezados), `texto` (definición de «criterio» o «filtrar»), `ordenar` (pasos para filtrar una columna de fechas) y `numero` (cuántas herramientas tiene la tabla).

## 9. Formato condicional

- **Apertura**: 200 celdas y solo cuatro te interesan. La pregunta es cómo que el programa las encuentre y las resalte.
- **Términos (máximo 3 en negritas)**:
  - **formato condicional** (<span lang="en">conditional formatting</span>): dar un formato solo a las celdas que cumplen una condición;
  - **regla** (<span lang="en">rule</span>): la condición y el formato que se aplican juntos;
  - **escala de color** (<span lang="en">color scale</span>): la regla que colorea cada celda según su valor.
- **Idea central**: el formato condicional es formato automático: en vez de colorear a mano las celdas que superan un número, se le dice al programa «si el valor es mayor que 100, pintalo de rojo», y la regla se queda ahí, watching los datos aunque cambien. Esa es su ventaja: si corriges un importe, el color se actualiza solo. Y hay varias reglas: mayor o menor que un número, entre dos valores, el texto que contiene una palabra, la celda duplicada, y las que usan una escala: la **escala de color**, que va de un color a otro según el valor, y las barras de datos, que dibujan dentro de la celda una barra proporcional al número. Y un uso muy práctico en una hoja de dinero: resaltar en rojo los negativos o los vencimientos pasados. Y dos cuidados: las reglas se acumulan (una celda puede tener varias y se aplican en orden), y una celda con formato manual puede no obedecer la regla si tiene un formato directo puesto encima.
- **Visual**: tabla «regla / para qué sirve / qué se ve» con `<th scope="row">`: mayor que, menor que, entre dos valores, contiene un texto, valores duplicados, escala de color, barras de datos; más un diagrama de una columna de cinco números con la escala de color aplicada de claro a oscuro, con `descripcion`.
- **Ejemplo resuelto**: resaltar los gastos que se pasan del límite, paso a paso (marcar la columna → aplicar la regla de mayor que un número → escribir el límite → comprobar que solo se pintan las celdas que lo superan → cambiar un importe y ver que el color se actualiza → aplicar una escala de color para ver la distribución). Se termina con la regla de no mezclar formato manual y automático.
- **Remisiones**: L8 (filtrar para encontrar los mismos datos, en vez de resaltarlos), L10 (los gráficos muestran la misma distribución).
- **Fuentes a buscar**: ayuda de LibreOffice Calc (formato condicional, reglas, escala de color, barras de datos) y como apoyo Wikipedia «Formato condicional».
- **Ejercicios (6)**: `opciones` ×3 (qué hace la regla; para qué sirve una escala de color; qué pasa si la celda tiene formato manual), `texto` (definición de «regla» o «formato condicional»), `ordenar` (pasos para resaltar los valores que superan un número) y `numero` (cuántas reglas hay en la tabla).

## 10. Gráficos

- **Apertura**: una tabla de doce meses y un gráfico de barras lo cuenta en un segundo. La pregunta es cómo se construye.
- **Términos (máximo 3 en negritas)**:
  - **gráfico** (<span lang="en">chart</span>): la imagen que resume los datos en forma visual;
  - **serie de datos** (<span lang="en">data series</span>): el grupo de valores que se dibuja (una columna, una línea);
  - **leyenda** (<span lang="en">legend</span>): la llave que dice qué color o qué línea es cada serie.
- **Idea central**: un gráfico se hace en tres pasos: **seleccionar los datos** (la tabla de la que se va a sacar, con sus encabezados, porque de ahí salen los títulos), **elegir el tipo de gráfico** (columnas para comparar cantidades, líneas para ver cómo algo cambia a lo largo del tiempo, barras o pastel para partes de un total) e **insertarlo**. Y un gráfico tiene cuatro piezas que hay que saber mirar: el título, que dice qué se está viendo; los **ejes**, con sus etiquetas; las **series de datos**, que son los grupos de valores; y la **leyenda**, que explica qué es cada serie. Y dos decisiones que importan: el tipo de gráfico tiene que corresponder a la pregunta (una línea para la evolución, una columna para comparar categorías) y el gráfico tiene que tener título y etiquetas de los ejes, porque un gráfico sin rótulos no se puede leer. Y una regla de selección: se seleccionan la columna de las categorías y la de los valores, y también los encabezados, si no el gráfico sale sin nombres.
- **Visual**: diagrama de las piezas de un gráfico (eje vertical con sus valores, eje horizontal con las categorías, las barras, la leyenda, el título) con `descripcion`; más una tabla «tipo de gráfico / para qué sirve / ejemplo de pregunta» con `<th scope="row">`: columnas, líneas, barras, pastel.
- **Ejemplo resuelto**: hacer un gráfico de los gastos por mes, paso a paso (seleccionar la columna de meses y la de importes, con los encabezados → insertar un gráfico de columnas → poner el título y revisar las etiquetas de los ejes → comprobar la leyenda → mover el gráfico y darle tamaño). Se termina con el aviso de que un gráfico sin título no se puede leer.
- **Remisiones**: L9 (el formato condicional resalta los mismos datos), «Gráficas: barras, pastel e histogramas» (Matemáticas: qué se puede leer en cada tipo de gráfico), «Leer gráficas e infografías» (Lectura).
- **Fuentes a buscar**: ayuda de LibreOffice Calc (insertar un gráfico, tipos de gráfico, título, ejes, leyenda, rangos de datos) y como apoyo Wikipedia «Gráfico» y «Diagrama de barras».
- **Ejercicios (6)**: `opciones` ×3 (qué gráfico va mejor para una evolución; qué pieza dice qué color es cada serie; qué pasa si no se seleccionan los encabezados), `texto` (definición de «leyenda» o «serie de datos»), `ordenar` (los tres pasos para hacer un gráfico) y `numero` (cuántas piezas tiene el diagrama).

## 11. Tablas dinámicas

- **Apertura**: 400 ventas de 12 meses y 5 productos. La pregunta es cómo resumir eso en una tabla pequeña sin hacer cuentas a mano.
- **Términos (máximo 3 en negritas)**:
  - **tabla dinámica** (<span lang="en">pivot table</span>): una tabla nueva que resume los datos de otra;
  - **campo** (<span lang="en">field</span>): cada columna de los datos de origen, que se puede poner en una zona de la tabla dinámica;
  - **resumen** (<span lang="en">summary</span>): la cuenta que la tabla dinámica hace (suma, promedio, cuenta).
- **Idea central**: una tabla dinámica toma una tabla larga y la resume en otra, agrupando y contando sola. Se crea en tres pasos: señalar la tabla de origen, insertar la tabla dinámica y elegir qué va en cada zona. Las zonas son cuatro: los **campos** que quieres en las filas, los que quieres en las columnas, los campos de los que quieres un **resumen** (suma, promedio, cuenta) y los que sirven de filtro. Y el resultado: una rejilla con el cruce de lo que has pedido, con los totales al final. Y lo que hace útil esto: cambiar la disposición es rápido (mover un campo de las filas a las columnas) y los datos se actualizan solos cuando la tabla de origen crece. Y dos límites que hay que decir: la tabla dinámica no acepta fórmulas dentro de los datos de origen, y con muchos campos y muchas filas el resumen puede quedar enormouso y no servir de nada.
- **Visual**: diagrama en cuatro cajas (tabla de origen → campos → tabla dinámica con sus totales) con `descripcion`; más una tabla «zona / qué se pone ahí / qué sale» con `<th scope="row">`: filas, columnas, valores, filtros.
- **Ejemplo resuelto**: resumir las ventas por mes y por producto, paso a paso (señalar la tabla de las 400 ventas → insertar la tabla dinámica → poner el mes en las filas y el producto en las columnas → pedir la suma de los importes → leer el cruce y el total → cambiar el resumen a promedio y comparar). Se termina con el aviso de los límites.
- **Remisiones**: L8 (ordenar y filtrar una tabla larga es el paso previo), L10 (el resumen de la tabla dinámica se puede convertir en un gráfico).
- **Fuentes a buscar**: ayuda de LibreOffice Calc (tablas dinámicas, crear una, arrastrar campos, cambiar el resumen) y como apoyo Wikipedia «Tabla dinámica».
- **Ejercicios (6)**: `opciones` ×3 (qué es una tabla dinámica; qué zona lleva el resumen; qué pasa al cambiar los datos de origen), `texto` (definición de «campo» o «resumen»), `ordenar` (los pasos para crear una tabla dinámica) y `numero` (cuántas zonas tiene la tabla del diagrama).

## 12. Proyecto: tu presupuesto personal en una hoja de cálculo

- **Apertura**: el presupuesto del mes es una lista de ingresos y gastos. La pregunta es cómo pasarla de una lista en papel a una hoja que te avise.
- **Términos (máximo 3 en negritas)**:
  - **presupuesto** (<span lang="en">budget</span>): la lista de lo que entra y lo que sale en un periodo;
  - **categoría** (<span lang="en">category</span>): el grupo al que pertenece cada gasto (vivienda, comida, transporte);
  - **saldo** (<span lang="en">balance</span>): lo que queda al restar los gastos a los ingresos.
- **Idea central**: el proyecto une todo lo aprendido: una hoja con los ingresos, los gastos por **categoría** y los totales. El orden es el de siempre: primero los datos, después las fórmulas, después el resumen y al final los gráficos. Y el **saldo** se calcula con una fórmula viva (ingresos menos gastos), de modo que cambia solo cuando cambias un dato. Y luego viene lo que hace útil la hoja: un total por categoría con SUMA, una regla de formato condicional que resalte los gastos que se pasan del límite que tú has puesto, y un gráfico de barras con el gasto de cada categoría. Y una advertencia importante: la hoja calcula, pero no decide. El criterio de cómo se reparte el dinero (o sea, qué proporción va a cada tipo de gasto) está en la lección «La regla 50/30/20» de Finanzas personales, y aquí solo se aplica lo que ya sabes: tú pones los números y las reglas, la hoja cuenta. Y un cierre con el orden de trabajo: la hoja se hace al final del mes, con los datos del mes; y los datos de un mes no se cambian cuando llega el siguiente, se comparan.
- **Visual**: diagrama de la estructura de la hoja (datos a la izquierda, fórmulas y totales a la derecha, gráfico debajo) con `descripcion`; más una tabla «paso / qué haces / con qué» con `<th scope="row">`: escribir los datos, poner los totales con SUMA, calcular el saldo, resaltar con formato condicional, hacer el gráfico.
- **Ejemplo resuelto**: montar el presupuesto de un mes de ejemplo, paso a paso (escribir cinco ingresos y diez gastos con su categoría → poner el total de cada categoría con SUMA → calcular el saldo con una fórmula → aplicar una regla de formato condicional a los gastos que superen el límite → insertar un gráfico de barras por categoría → comprobar que el total del gráfico coincide con la suma de los gastos). Se termina comprobando que el saldo se recalcula al cambiar un gasto.
- **Remisiones**: «Hacer tu primer presupuesto», «La regla 50/30/20», «Ingresos y gastos», «Gastos hormiga» (Finanzas personales: el método es de allí, aquí solo la hoja), L5 (SUMA), L6 (SI), L9 (formato condicional), L10 (gráficos).
- **Fuentes a buscar**: ayuda de LibreOffice Calc (SUMA, formato condicional, gráficos, referencia entre hojas) y como apoyo Wikipedia «Presupuesto» y «Balance»; los datos del ejemplo son inventados y se dicen.
- **Ejercicios (6)**: `opciones` ×3 (qué fórmula da el saldo; qué hace la regla de formato condicional; para qué sirve el gráfico del proyecto), `texto` (definición de «categoría» o «saldo»), `ordenar` (los pasos del proyecto en orden) y `numero` (cuántos pasos tiene la tabla del proyecto).

## Reglas de la unidad

- **Términos en inglés**: la primera vez, el término en español y el original en `<span lang="en">`. Si la palabra es igual en español y en inglés, el paréntesis sobra.
- **Máximo 3 `<strong>` por lección** en la explicación. Lo demás que haya que memorizar va en tabla con `<th scope="row">`.
- **Extensión**: `explicacion` 400–650 palabras · `ejemplo` 120–180 · `vidaReal` 60–90. Frases completas y conectadas, una idea por párrafo.
- **Estructura**: objetivo → «¿para qué sirve en la vida real?» (obligatorio, se lee antes y sin usar términos no definidos) → explicación → ejemplo resuelto paso a paso → ejercicios → fuentes.
- **Tono**: español neutro, tuteo, «fíjate»/«imagina». Sin signos de exclamación, sin «simplemente», sin emojis. No se juzga a quien se equivoca: el error va en la nota de «Error común». No se asume el género del lector.
- **Ejercicios**: 6 por lección, tipos `numero`, `opciones`, `texto` y `ordenar`. Respuestas numéricas como operación. Índices `correcta:` repartidos. Los `texto` aceptan con y sin artículo y con sinónimos. Cada `pista` y cada `solucion` se escriben como `<p>…</p>` **con la etiqueta cerrada** (lo que falló en la U2). Además, en esta unidad caben ejercicios de **fórmula escrita**: un `texto` que pida la fórmula (por ejemplo «=SUMA(B2:B9)») con variantes aceptadas (con o sin «=», con «;» o con «,», con o sin espacio). Hay que mirar cómo normaliza el motor (`js/ejercicios.js`, `normalizarTexto` quita tildes y mayúsculas, pero no los espacios) y listar las variantes en `respuestas`.
- **Visuales**: diagramas con el helper `diagrama` (cajas, flechas, `txt`), lienzo proporcional y `descripcion` obligatoria; tablas con `<th>` dentro de `.tabla-wrap`; toda gráfica con `descripcion`. Revisar con `render.js` que ningún texto se solape.
- **Sin capturas de pantalla**: los «pantallazos» son tablas HTML y diagramas SVG, con el texto describiendo lo que se ve.
- **Programa de referencia**: LibreOffice Calc, con la regla de primero el concepto genérico y después el nombre del comando o de la función. No se nombran programas de Microsoft.
- **Remisiones**: los títulos citados entre comillas tienen que existir en `js/temario.js`; los títulos de unidad no valen como remisión.
- **Datos por país**: esta unidad no tiene cifras con país. Todos los datos del ejemplo son inventados y se dicen.
- **Cero instalación**: nada de `import`, `fetch()`, `.json`, `<script type="module">`, CDN ni dependencias.

## Decisiones tomadas por el usuario (2026-10-22)

1. **BUSCARX**: primero se busca en la ayuda de LibreOffice Calc; si la versión documentada no la tiene, se usa la documentación oficial equivalente de Microsoft Support (en inglés) y el nombre de la función se enseña sin nombrar programas. La ficha deja claro de qué fuente sale cada dato.
2. **Alcance del proyecto final (L12)**: solo la mecánica de la hoja (datos de ejemplo, SUMA por categoría, saldo, formato condicional y gráfico). El método (la regla 50/30/20) se remite a Finanzas personales y no se explica.
3. **Ejercicios de fórmula escrita**: sí, algunos. Van como tipo `texto` y aceptan las variantes (con o sin «=», con «;» o con «,», con o sin espacio), mirado cómo normaliza `js/ejercicios.js`.

## Pendiente al implementar

- Añadir a `.claude/trabajo/ofimatica/computadora/reglas-materia.md` (borrador de las reglas de la materia) lo que esta unidad fije.
