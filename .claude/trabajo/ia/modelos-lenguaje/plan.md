# Plan · ia · Unidad 3: Modelos de lenguaje (LLMs)

Al aprobarse se copia a `.claude/trabajo/ia/modelos-lenguaje/plan.md`.

## Contexto
- Archivo destino: `lecciones/ia/modelos-lenguaje.js`, y `archivo: 'lecciones/ia/modelos-lenguaje.js'` en la unidad 3 de `js/temario.js`. Son 7 lecciones con 6 ejercicios cada una; los títulos son los del temario y no propongo cambios.
- Reglas de la materia: `.claude/docs/materias/ia.md` (lector de 10 a 12 años, ni bombo ni miedo, inglés una vez en `<span lang="en">`, datos que cambian con fecha y "revisa la información vigente", sin "mejor modelo").
- Ya dicho en U1 y U2, no se repite (se remite):
  - U1, "Breve historia de la IA": el transformer (2017) y el chatbot público (30 de noviembre de 2022).
  - U2: datos de entrenamiento, etiqueta y desbalance ("Los datos"); aprendizaje supervisado ("Aprendizaje automático"); pesos, capas y red profunda ("Redes neuronales…"); exactitud y sobreajuste ("Entrenar y evaluar…").
- Hacia adelante (no adelantar): U4, "Escribir instrucciones claras", "Dar contexto y ejemplos" y "Verificar lo que te responde"; U5, "Tamaño de un modelo: parámetros…" y "Modelos abiertos…"; U6, "Sesgos en la IA" y "Privacidad: qué no compartir".
- Remisiones a Matemáticas: "Probabilidad: qué tan posible es algo" y "Porcentajes".

## Flujo (lo aprendido en U1 y U2)
- La lista de datos es **cerrada** (D1–D36): un número, un dato, una cita. Si no aparece, se reporta "no encontrado" con las URLs probadas; nada de citas parecidas. Los datos marcados "(opcional)" se omiten si no aparecen.
- Investigador con Sonnet. Cuando `citas.js` dé OK, el Director revisa cada par con `grep "^- D" -A1` antes de lanzar el constructor.
- Fuentes que funcionan: IBM (`ibm.com/think/topics/...`), Google ML Crash Course (`?hl=en`), Wikipedia en español, arXiv y Parlamento Europeo. Candidata nueva: documentación de Hugging Face (en inglés). Bloqueadas: Elements of AI y UNESDOC.
- Al constructor se le pasan las notas de la ficha (datos que solo respaldan una parte). Las explicaciones propias sin fuente se declaran como simplificación.

## 1. Qué es un modelo de lenguaje
- **Apertura**: escribes una pregunta y un programa responde con párrafos que suenan humanos. ¿Qué hay detrás?
- **Términos**: **modelo de lenguaje**, **modelo de lenguaje grande** (<span lang="en">large language model</span>, LLM) y **parámetro** (solo la idea: los "pesos" de U2; el detalle va en U5).
- **Idea central**:
  - Un LLM es un modelo entrenado con muchísimo texto para predecir y generar texto.
  - Se llama "grande" por la cantidad de datos y de parámetros.
  - El chatbot es la aplicación con la que conversas, y por dentro usa un LLM.
  - Usa la arquitectura transformer; remite a U1 sin repetir la historia.
- **Visual**: diagrama de flujo: mucho texto → entrenamiento → modelo → tu instrucción → respuesta.
- **Ejemplo resuelto**: cuánto tardaría una persona en leer un conjunto de texto de ejemplo (10 000 millones de palabras, a 250 palabras por minuto y 8 horas al día). Se hacen las divisiones paso a paso y se dice que las cifras son de ejemplo.
- **Datos**:
  - D1: definición de LLM (IBM "large language models" o Wikipedia es).
  - D2: se entrena con cantidades enormes de texto (IBM).
  - D3: "grande" se refiere a los datos o a la cantidad de parámetros (IBM o Wikipedia es).
  - D4: los LLM actuales se basan en la arquitectura transformer (IBM o Wikipedia es).
  - D5: tareas que hace: generar, resumir y traducir texto, y responder preguntas (IBM).

## 2. Tokens: cómo "lee" un LLM
- **Apertura**: tú lees letras y palabras. Un LLM lee trozos.
- **Términos**: **token**, **tokenización** y **vocabulario**.
- **Idea central**:
  - El texto se corta en tokens (palabras o partes de palabras) y cada token se convierte en un número.
  - Las palabras comunes suelen ser un solo token y las raras, varios.
  - Muchos idiomas distintos del inglés gastan más tokens para decir lo mismo.
  - Los límites y los precios se cuentan en tokens; se remite a "Contexto y memoria".
- **Visual**: tabla con una frase partida en tokens, con su número de ejemplo. Se aclara que cada modelo corta distinto.
- **Ejemplo resuelto**: con la regla aproximada de la fuente (D9), estimar los tokens de un texto de 300 palabras en inglés. Luego contar los tokens de una frase ya partida en la tabla.
- **Datos**:
  - D6: definición de token (Hugging Face o IBM).
  - D7: el tokenizador divide el texto en palabras o subpalabras (Hugging Face, curso de NLP).
  - D8: cada token se convierte en un número (ID) del vocabulario (Hugging Face).
  - D9: regla aproximada, 1 token ≈ 4 caracteres o ≈ ¾ de palabra en inglés (documentación de un proveedor, en inglés, con fecha).
  - D10: otros idiomas necesitan más tokens que el inglés para el mismo texto (arXiv, Petrov et al. 2023, "Language Model Tokenizers Introduce Unfairness Between Languages").

## 3. Cómo genera texto: predecir la siguiente palabra
- **Apertura**: el autocompletado del celular sugiere la siguiente palabra. Un LLM hace algo parecido, una y otra vez.
- **Términos**: **predicción**, **probabilidad** (sin repetir la lección de Matemáticas: se remite) y **temperatura**.
- **Idea central**:
  - Para cada posible siguiente token, el modelo calcula qué tan probable es.
  - Elige uno, lo agrega al texto y repite.
  - La temperatura controla cuánto se arriesga al elegir. Por eso la misma pregunta puede dar respuestas distintas.
  - Que algo sea probable no quiere decir que sea verdad; se remite a "Alucinaciones".
- **Visual**: gráfica de barras con las probabilidades de la siguiente palabra después de "El cielo es…" (azul, gris, grande, otras), con cifras de ejemplo que suman 100 %.
- **Ejemplo resuelto**:
  - Calcular la probabilidad que falta para completar 100 %.
  - Calcular la probabilidad de elegir dos palabras seguidas multiplicando (remite a "Probabilidad").
- **Datos**:
  - D11: el LLM predice el siguiente token a partir de los anteriores (IBM o Wikipedia es).
  - D12: el modelo da una probabilidad a cada token posible (Hugging Face, "generation strategies").
  - D13: genera un token a la vez y lo agrega a la entrada (Hugging Face, "Generation with LLMs").
  - D14: la temperatura controla qué tan aleatoria es la elección (Hugging Face o IBM).
  - D15: con muestreo, la misma entrada puede dar salidas distintas (Hugging Face).

## 4. Contexto y memoria
- **Apertura**: le cuentas algo a un chatbot, abres otra conversación y "no se acuerda". ¿Por qué?
- **Términos**: **contexto** y **ventana de contexto**.
- **Idea central**:
  - En cada respuesta, el modelo solo ve el texto que se le pasa en ese momento: la conversación hasta ahí.
  - La ventana tiene un límite medido en tokens y cuenta tanto lo que entra como lo que sale.
  - Si la conversación se pasa del límite, lo más viejo queda fuera.
  - Lo que algunas apps llaman "memoria" es una función de la aplicación que guarda notas y las vuelve a meter en el contexto, no del modelo. Se remite a "Privacidad" (U6) y a "Dar contexto y ejemplos" (U4).
- **Visual**: diagrama de una fila de mensajes con un recuadro (la ventana) que cubre solo los últimos.
- **Ejemplo resuelto**: con una ventana de ejemplo de 4 000 tokens y una lista de mensajes con sus tokens, sumar y decidir desde qué mensaje se sale de la ventana.
- **Datos**:
  - D16: definición de ventana de contexto: la cantidad de texto, en tokens, que el modelo considera a la vez (IBM, "context window").
  - D17: incluye la entrada y la respuesta (IBM).
  - D18: si se excede, lo anterior se recorta o se olvida (IBM).
  - D19: el modelo no guarda memoria entre conversaciones; la aplicación reenvía el historial (IBM o documentación de un proveedor).
  - D20: las ventanas de contexto han crecido con el tiempo, con una cifra y fecha de ejemplo (IBM) (opcional).

## 5. Alucinaciones: cuando la IA inventa
- **Apertura**: pides tres libros sobre un tema y uno no existe, aunque el título y el autor suenan muy reales.
- **Términos**: **alucinación** y **verificar** (solo la idea; el método completo va en U4).
- **Idea central**:
  - El modelo genera texto que suena probable, no hechos comprobados (se conecta con la lección 3).
  - Puede inventar datos, citas, fechas o fuentes, y lo dice con la misma seguridad.
  - Caso real: abogados que presentaron ante un tribunal casos inventados por un chatbot.
  - Lo importante (datos, salud, tareas) se comprueba siempre en fuentes fiables; se remite a "Verificar lo que te responde".
- **Visual**: tabla con las columnas "Lo que dijo", "¿Suena creíble?", "¿Es cierto?" y "Cómo lo compruebo".
- **Ejemplo resuelto**: una respuesta con 5 afirmaciones se contrasta con una tabla de fuentes dada. Se cuentan las inventadas y se calcula el porcentaje (remite a "Porcentajes"). Cifras de ejemplo.
- **Datos**:
  - D21: definición de alucinación de IA (IBM, "AI hallucinations").
  - D22: causas, como huecos o errores en los datos de entrenamiento y que el modelo genera lo probable (IBM).
  - D23: la respuesta inventada se presenta de forma convincente o segura (IBM).
  - D24: caso Mata contra Avianca: Nueva York, Estados Unidos, 2023. Abogados citaron casos inexistentes generados por un chatbot (Wikipedia o el documento del tribunal; con país y año).
  - D25: la recomendación de comprobar las respuestas con otras fuentes (IBM u organismo oficial).

## 6. Qué puede y qué no puede hacer
- **Apertura**: es útil para muchas cosas, pero no es un oráculo ni una persona.
- **Términos**: **fecha de corte** (<span lang="en">knowledge cutoff</span>) y **herramienta** (cuando el chatbot busca en internet o usa una calculadora).
- **Idea central**:
  - Ayuda a redactar, resumir, traducir, explicar y proponer ideas.
  - No sabe nada posterior a su fecha de corte salvo que use herramientas, y puede fallar en cuentas o en datos.
  - No sabe cuándo se equivoca ni tiene experiencias.
  - Puede reflejar sesgos (se remite a U6) y no reemplaza a un médico, un abogado o un docente.
- **Visual**: tabla de dos columnas, "Suele hacer bien" y "Ten cuidado con".
- **Ejemplo resuelto**: clasificar 6 tareas en "buena idea", "con cuidado" o "mala idea", con la razón de cada una.
- **Datos**:
  - D26: tareas que los LLM hacen bien, como redactar, resumir, traducir y responder (IBM o Parlamento Europeo).
  - D27: definición de fecha de corte del conocimiento (IBM o Wikipedia).
  - D28: los LLM pueden reproducir sesgos de sus datos (IBM).
  - D29: los LLM pueden fallar en matemáticas o en razonamiento de varios pasos (IBM o arXiv) (opcional).
  - D30: pueden usar herramientas externas como la búsqueda web (IBM, "AI agents" o "tool calling") (opcional).

## 7. Modelos de decisión: IA que elige en lugar de escribir
- **Apertura**: a veces no quieres un párrafo, sino que algo diga "sí" o "no", o que elija entre tres opciones y diga qué tan seguro está.
- **Términos**: **modelo de decisión**, **confianza** y **salida estructurada** (la que lee otro programa).
- **Idea central**:
  - En vez de escribir texto libre, este tipo de modelo elige entre opciones dadas y devuelve probabilidades o confianza.
  - Otros programas usan esa salida. Se conecta con la clasificación de U2 y con las probabilidades de la lección 3.
  - Ejemplo con fecha: Jev, de TypeSafe AI, propietario, en acceso anticipado desde el 15 de septiembre de 2026. TypeSafe los llama "modelos de Sistema Uno".
  - Laya es una alternativa abierta; se retoma en U5.
  - Las cifras de velocidad y costo van solo como "según TypeSafe, con sus propias pruebas".
  - Cierre: "revisa la información vigente". Sin juicio de calidad.
- **Visual**: diagrama comparativo en dos filas:
  - pregunta → LLM → párrafo;
  - pregunta + opciones → modelo de decisión → "opción B, confianza 0,92" → otro programa.
- **Ejemplo resuelto**: un modelo de decisión clasifica 5 mensajes con su confianza (cifras de ejemplo). Con la regla "si la confianza es menor que 0,7, lo revisa una persona", contar cuántos van a revisión y qué porcentaje es.
- **Datos** (Wikipedia "Jev (modelo de IA)" tiene una sola referencia: hay que contrastarla con el sitio de TypeSafe y el repositorio de Laya si pasan `citas.js`; un blog no vale como fuente única):
  - D31: qué es Jev y quién lo hace (Wikipedia y sitio de TypeSafe).
  - D32: elige entre opciones dadas (elección, puntuación, sí/no) en vez de generar texto (Wikipedia o TypeSafe).
  - D33: devuelve probabilidades o confianza (Wikipedia o TypeSafe).
  - D34: TypeSafe los llama "modelos de Sistema Uno" (TypeSafe o Wikipedia).
  - D35: es propietario y está en acceso anticipado desde el 15 de septiembre de 2026 (Wikipedia o TypeSafe).
  - D36: Laya es una alternativa abierta, con su licencia (repositorio de Laya).
  - D37: una afirmación de velocidad o costo, atribuida a TypeSafe (opcional).

## Reglas de la unidad
- Máximo 3 términos en negritas por lección.
- Las cifras inventadas se dicen "de ejemplo". Los datos que cambian llevan fecha ("a octubre de 2026") y "revisa la información vigente".
- No se nombran chatbots ni marcas, salvo Jev y Laya en la lección 7, como ejemplo con fecha. El proveedor de D9 se nombra solo como fuente.
- Ejercicios sin texto libre ni instalación: opciones, ordenar, clasificar y cálculo con tolerancia.
- Con 7 lecciones basta un constructor. Si se queda sin contexto, un segundo constructor escribe las lecciones 5 a 7.

## Verificación
1. `node .claude/herramientas/citas.js .claude/trabajo/ia/modelos-lenguaje/ficha.md` da OK, y se revisan a mano los pares dato/cita.
2. `revisar.js` y `render.js` sobre `lecciones/ia/modelos-lenguaje.js`.
3. Copia en `antes-auditoria.js`, auditor nuevo, `diff -u`, `node verificar.js` y `./empaquetar.sh`. Sin commit.
