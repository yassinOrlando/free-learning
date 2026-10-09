# Contenido de una lección

Lo lee quien planea, escribe o audita lecciones. El formato del código está en `formato-leccion.md`.

## Estructura de una lección
Cada lección sigue el mismo orden:

1. **Objetivo**: qué sabrás hacer al terminar (una o dos frases).
2. **¿Para qué sirve en la vida real?**: aplicaciones concretas y cercanas, para motivar antes de aprender. Ej.: para qué sirve el trinomio cuadrado perfecto (calcular áreas, simplificar cálculos mentales, optimizar costos, etc.). Obligatorio en todas las lecciones. Como se lee *antes* de la explicación, no usa símbolos ni términos que la lección todavía no ha definido.
3. **Explicación**: el concepto, de lo simple a lo complejo, con lenguaje cotidiano y sin dar por sabido nada que no se haya visto en lecciones previas.
4. **Ejemplo resuelto** paso a paso.
5. **Ejercicios interactivos** (estilo SQLBolt).
6. **Fuentes**: enlaces a los recursos usados.

Las lecciones de un tema van en orden progresivo; cada una declara sus prerrequisitos.

## Tono y redacción del contenido
- Español neutro, tuteo, frases cortas.
- Definir cada término nuevo la primera vez que aparece.
- Preferir ejemplos cotidianos (compras, cocina, transporte, sueldo) sobre ejemplos abstractos.
- Nunca asumir que el lector "ya debería saber" algo.

# Cómo explicar
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

# Lecciones de referencia
El estándar de calidad lo fijan **"Porcentajes"** (`lecciones/matematicas/aritmetica.js`) y **"Función lineal y pendiente"** (`lecciones/matematicas/funciones.js`). Antes de escribir o reescribir una lección, léelas y sigue sus técnicas:
- **Primero la experiencia, después el nombre**: algo concreto que el lector pueda imaginar (100 cuadritos de chocolate, el taxímetro). Luego una tabla o unos números pequeños que muestren el patrón. Al final, "a esto se le llama…" y la fórmula.
- **El símbolo con su significado en palabras**: cada letra de una fórmula se presenta con una frase simple en negritas ("b es **con cuánto empiezas**") y después su nombre técnico ("Se llama ordenada al origen"). Luego se conecta con el ejemplo del inicio ("En el taxi, b = 10").
- **Varias formas de ver lo mismo**: fracción, decimal y porcentaje; la tabla, la fórmula y la gráfica. Explica qué tienen en común.
- **Atajos con su razón**: "10% es dividir entre 10; por eso basta con recorrer el punto".
- **Subtítulos `<h3>` que son preguntas o tareas** ("¿Qué porcentaje es?", "Pendiente a partir de dos puntos"). Cada uno abre con la situación en la que lo necesitas ("A veces la pregunta es al revés…").
- **Comparaciones del mundo real** para las ideas abstractas: las rectas paralelas, "como los rieles del tren"; leer la gráfica de izquierda a derecha, "como cuando lees un libro".
- **Una `.nota` de "Trampa común"** en la explicación y otra de "Error común" en el ejemplo, cuando el tema la tenga.
- **El ejemplo resuelto narra cada paso** ("Primero calcula cuánto te descuentan…") y termina comprobando el resultado por otro camino.

## Ejercicios estilo SQLBolt
- La explicación y el ejercicio conviven en la misma página; el usuario practica justo después de leer.
- Cada ejercicio tiene: enunciado, entrada del usuario, validación inmediata, pista opcional y botón "ver solución".
- Validación tolerante: aceptar respuestas equivalentes (p. ej. `0.5`, `.5`, `1/2`; espacios y mayúsculas).
- Tipos de ejercicio esperados: respuesta numérica, opción múltiple, completar el paso faltante, ordenar pasos y, en ofimática, fórmulas de hoja de cálculo.
- Una lección se marca como completada al resolver todos sus ejercicios.

## Temas sensibles (dinero, salud, seguridad, ley)
- Sin consejo personalizado: describe opciones y criterios, no le digas a nadie qué hacer con su caso.
- Sin productos, marcas, bancos, apps o empresas por su nombre, salvo que el temario los pida (por ejemplo, Ollama y LM Studio en IA). Los organismos oficiales sí se nombran.
- Leyes, tasas, límites, edades y precios van con país, año y "revisa el dato vigente en tu país". Las cifras que no vienen de una fuente se presentan como ejemplo ("Las cifras son de ejemplo").
- Fraudes, préstamos abusivos y estafas: solo fuentes oficiales, y siempre di dónde denunciar ("el organismo de protección al consumidor financiero de tu país", o el que corresponda).
- Deudas, crisis, salud y temas que pesan en el ánimo: sin dramatismo, sin culpar al lector, y di que pedir ayuda está bien.
- No asumas el género del lector ("listo", "obligado", "preparado"): reformula ("tener que", "prepararte").
