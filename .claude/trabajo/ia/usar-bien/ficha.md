# Ficha: ia · Unidad 4: Usar la IA bien

## F1 · Google, estrategias de instrucciones
- url: https://ai.google.dev/gemini-api/docs/prompting-strategies
- nombre: Google AI for Developers, Gemini API: Estrategias de diseño de instrucciones
- idioma: es
- año: 2026
- lecciones: Escribir instrucciones claras; Dar contexto y ejemplos

- D3: Se puede pedir en la instrucción el formato de la respuesta, por ejemplo tabla, lista, párrafo o una oración (Google, 2026).
  > Puedes proporcionar instrucciones que especifiquen el formato de la respuesta. Por ejemplo, puedes solicitar que la respuesta tenga el formato de una tabla, una
- D4: Para tareas complejas, se divide la instrucción en componentes más simples (Google, 2026).
  > puedes ayudar al modelo a administrar esta complejidad dividiendo las instrucciones en componentes más simples.
- D6: Diseñar instrucciones es un proceso iterativo: se experimenta y se perfecciona según las respuestas observadas (Google, 2026).
  > La ingeniería de instrucciones es un proceso iterativo. Estos lineamientos y plantillas son puntos de partida. Experimenta y perfecciona el modelo en función de tus casos de uso específicos y las respuestas observadas.
- D7: Dar información que el modelo necesita, en lugar de suponer que ya la tiene, le ayuda a entender las restricciones y los detalles de lo que se pide (Google, 2026).
  > Puedes incluir instrucciones e información en una instrucción que el modelo necesita para resolver un problema, en lugar de suponer que el modelo tiene toda la información requerida.
- D9: Los ejemplos muestran al modelo el formato de respuesta que se busca (Google, 2026).
  > Uno de los objetivos principales de agregar algunos ejemplos en las instrucciones es mostrar al modelo el formato de respuesta.

## F2 · Anthropic, buenas prácticas de instrucciones
- url: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- nombre: Anthropic (en inglés), Claude Docs: Prompting best practices
- idioma: en
- año: 2026
- lecciones: Escribir instrucciones claras; Dar contexto y ejemplos

- D2: Cuanto más precisamente se explica lo que se quiere, mejor es el resultado (Anthropic, 2026).
  > the more precisely you explain what you want, the better the result.
- D5: Es más eficaz decir qué hacer que qué no hacer; en vez de "no uses markdown", pedir prosa fluida (Anthropic, 2026).
  > Tell Claude what to do instead of what not to do
- D11: Asignar un rol en las instrucciones de sistema orienta el comportamiento y el tono del modelo (Anthropic, 2026).
  > Setting a role in the system prompt focuses Claude's behavior and tone for your use case.

## F3 · IBM, few-shot prompting
- url: https://www.ibm.com/think/topics/few-shot-prompting
- nombre: IBM Think (en inglés): What is few shot prompting?
- idioma: en
- año: 2026
- lecciones: Dar contexto y ejemplos

- D8: Una instrucción con pocos ejemplos (few-shot) consiste en darle al modelo unos cuantos ejemplos de la tarea para guiar su desempeño (IBM, 2026).
  > Few-shot prompting refers to the process of providing an AI model with a few examples of a task to guide its performance.

## F4 · IBM, zero-shot prompting
- url: https://www.ibm.com/think/topics/zero-shot-prompting
- nombre: IBM Think (en inglés): What is zero-shot prompting?
- idioma: en
- año: 2026
- lecciones: Dar contexto y ejemplos

- D10: En la técnica sin ejemplos (zero-shot) no se le da al modelo ejemplos de la salida deseada, a diferencia de few-shot (IBM, 2026).
  > In contrast to other prompt engineering methods such as few-shot prompting, models aren't provided examples of output when prompting with the zero-shot technique.

## F5 · Wikipedia, Ingeniería de instrucciones
- url: https://es.wikipedia.org/wiki/Ingenier%C3%ADa_de_instrucciones
- nombre: Wikipedia (español): Ingeniería de instrucciones
- idioma: es
- año: 2026
- lecciones: Escribir instrucciones claras

- D1: Una instrucción (prompt) es un texto en lenguaje natural que describe la tarea que debe hacer una IA (Wikipedia en español, 2026).
  > Un prompt o instrucción es un texto en lenguaje natural que describe la tarea que debe realizar una IA.


## F20 · Stanford Daily, lectura lateral
- url: https://stanforddaily.com/2017/10/26/fact-checkers-more-likely-than-peer-expert-groups-to-identify-credible-information-determine-gse-researchers/
- nombre: The Stanford Daily (Universidad de Stanford, EE. UU.), sobre el estudio de Wineburg y McGrew: Fact checkers best historians, Stanford students at judging source credibility (en inglés)
- idioma: en
- año: 2017
- lecciones: Verificar lo que te responde

- D13: Lectura lateral: los verificadores de datos hojean la página y abren otros sitios en otras pestañas para buscar comparaciones y contexto (EE. UU., 2017).
  > McGrew and Wineburg found that fact checkers engaged in “lateral reading”: Although they would initially skim a webpage, they would search for comparisons and context by opening other websites in separate tabs.
- D14: Los verificadores profesionales evaluaron con más acierto la credibilidad de la información en línea que historiadores y estudiantes; estos leían "verticalmente" (Stanford, Wineburg y McGrew, EE. UU., 2017). Solo respalda en parte que sea "por" la lectura lateral: el vínculo lo da D13 en el mismo artículo.
  > Fact checkers are more likely to assess the credibility of online information accurately compared to other “expert groups,” according to a report released earlier this October by researchers in the Stanford History Education Group (SHEG).

## F21 · IBM, alucinaciones de IA
- url: https://www.ibm.com/think/topics/ai-hallucinations
- nombre: IBM Think, Qué son las alucinaciones de la IA (en inglés)
- idioma: en
- año: 2023
- lecciones: Verificar lo que te responde

- D15: Una herramienta de IA generativa puede presentar datos falsos, estudios inventados y enlaces que no existen como si fueran hechos (IBM, 2023).
  > a large language model (LLM) or other generative AI (gen AI) tool presents fake facts, invented studies, nonexistent URLs or incorrect details about real entities as factual outputs.
- D16: La supervisión humana es esencial donde las alucinaciones pueden causar daño importante: hay que revisar lo que produce la IA (IBM, 2023).
  > Human oversight is essential wherever hallucinations can cause significant harm.

## F22 · Noticias ONU, edad mínima para IA en el aula
- url: https://news.un.org/es/story/2023/09/1523892
- nombre: Noticias ONU: Un niño debe tener al menos 13 años para empezar a utilizar la inteligencia artificial en las aulas
- idioma: es
- año: 2023
- lecciones: Usar IA para estudiar sin hacer trampa

- D18: La UNESCO propone una edad mínima de 13 años para usar herramientas de IA en las aulas (UNESCO, vía Noticias ONU, septiembre de 2023).
  > Según el organismo, un niño debe tener al menos trece años para empezar a utilizar herramientas de inteligencia artificial en las aulas
- D19: Una encuesta de la UNESCO en más de 450 escuelas y universidades halló que menos del 10 % tenía políticas o guías formales sobre IA generativa (UNESCO, vía Noticias ONU, 2023).
  > De acuerdo con una encuesta hecha por la UNESCO en más de 450 escuelas y universidades, menos del 10% cuentan con políticas institucionales o directrices formales relativas al uso de aplicaciones de inteligencia artificial generativa

## F23 · Wikipedia, Plagio
- url: https://es.wikipedia.org/wiki/Plagio
- nombre: Wikipedia, Plagio
- idioma: es
- año: 2026
- lecciones: Usar IA para estudiar sin hacer trampa

- D20: Plagio: según la RAE, copiar en lo sustancial obras ajenas dándolas como propias (RAE vía Wikipedia, 2026).
  > El término plagio se define en el Diccionario de la lengua española de la Real Academia Española como la acción de «copiar en lo sustancial obras ajenas, dándolas como propias».

## F24 · Wikipedia, Testing effect
- url: https://en.wikipedia.org/wiki/Testing_effect
- nombre: Wikipedia, Testing effect (en inglés)
- idioma: en
- año: 2026
- lecciones: Usar IA para estudiar sin hacer trampa

- D21: La práctica de recuperación (efecto de prueba) sugiere que la memoria a largo plazo aumenta si parte del tiempo de estudio se dedica a recordar la información (Wikipedia, 2026).
  > suggests long-term memory is increased when part of the learning period is devoted to retrieving information from memory

## F25 · INTEF, IA en la formación del profesorado
- url: https://intef.es/wp-content/uploads/2025/06/Orientaciones-para-la-integracion-de-la-IA-en-la-formacion-docente_Actualizacion_2026.pdf
- nombre: INTEF (España), Orientaciones para la integración de la inteligencia artificial en la formación del profesorado
- idioma: es
- año: 2026
- lecciones: Usar IA para estudiar sin hacer trampa

- D22: La IA no puede reemplazar el esfuerzo personal ni el desarrollo de competencias esenciales para el aprendizaje (INTEF, España, 2026). Solo respalda en parte: el documento es para formación docente, no para estudiantes.
  > su papel no puede reemplazar el esfuerzo personal ni el desarrollo de competencias esenciales para el aprendizaje.
- D23: Es recomendable informar, citar y referenciar los contenidos generados con IA (INTEF, España, 2026).
  > Es recomendable informar, citar y referenciar los contenidos que han sido generados con IA.
