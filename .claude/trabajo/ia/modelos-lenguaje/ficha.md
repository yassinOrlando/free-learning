# Ficha: ia · Unidad 3: Modelos de lenguaje (LLMs)

## F1 · IBM: Qué son los modelos de lenguaje grandes
- url: https://www.ibm.com/think/topics/large-language-models
- nombre: IBM (en inglés), What are large language models (LLMs)?
- idioma: en
- año: 2021
- lecciones: Qué es un modelo de lenguaje; Cómo genera texto: predecir la siguiente palabra

- D1: Un LLM es un tipo de modelo de aprendizaje profundo entrenado con cantidades inmensas de datos, capaz de entender y generar lenguaje natural y otros contenidos (IBM, Estados Unidos, página publicada en 2021 y actualizada)
  > Large language models (LLMs) are a category of deep learning models trained on immense amounts of data, making them capable of understanding and generating natural language and other types of content to perform a wide range of tasks.
- D2: El entrenamiento empieza con una cantidad enorme de datos: miles de millones o billones de palabras de libros, artículos, sitios web, código y otros textos (IBM, Estados Unidos)
  > Training starts with a massive amount of data—billions or trillions of words from books, articles, websites, code and other text sources.
- D4: Los LLM se construyen sobre una arquitectura de red neuronal llamada transformer, buena para manejar secuencias de palabras (IBM, Estados Unidos)
  > LLMs are built on a type of neural network architecture called a transformer which excels at handling sequences of words and capturing patterns in text.
- D6: Los tokens son unidades pequeñas como palabras, subpalabras o caracteres (IBM, Estados Unidos)
  > Tokens are smaller units such as words, subwords or characters.
- D11: Los LLM funcionan como máquinas de predicción estadística que predicen una y otra vez la siguiente palabra de una secuencia (IBM, Estados Unidos)
  > LLMs work as giant statistical prediction machines that repeatedly predict the next word in a sequence.

## F2 · Wikipedia en español: Modelo de lenguaje de gran tamaño
- url: https://es.wikipedia.org/wiki/Modelo_de_lenguaje_grande
- nombre: Wikipedia, Modelo de lenguaje de gran tamaño
- idioma: es
- año: 2026
- lecciones: Qué es un modelo de lenguaje

- D5: Los LLM pueden generar, resumir, traducir y analizar texto (Wikipedia en español, 2026). Responder preguntas no aparece en esta frase; solo en IBM como "question answering" dentro de asistentes
  > Los LLM pueden generar, resumir, traducir y analizar texto en numerosos contextos.

## F3 · Hugging Face: Procesamiento del lenguaje natural y LLM
- url: https://huggingface.co/learn/llm-course/chapter1/2
- nombre: Hugging Face (en inglés), LLM Course: Natural Language Processing and Large Language Models
- idioma: en
- año: 2026
- lecciones: Qué es un modelo de lenguaje

- D3: "Grande" se refiere a la escala: los LLM tienen millones, miles de millones o cientos de miles de millones de parámetros (Hugging Face, 2026); los datos enormes se respaldan en D2
  > They contain millions, billions, or even hundreds of billions of parameters

## F4 · Hugging Face: Tokenizadores
- url: https://huggingface.co/learn/llm-course/chapter2/4
- nombre: Hugging Face (en inglés), LLM Course: Tokenizers
- idioma: en
- año: 2026
- lecciones: Tokens: cómo "lee" un LLM

- D7: El primer paso de la codificación es dividir el texto en palabras o partes de palabras, que suelen llamarse tokens (Hugging Face, 2026)
  > the first step is to split the text into words (or parts of words, punctuation symbols, etc.), usually called tokens .
- D8: El segundo paso es convertir esos tokens en números usando el vocabulario del tokenizador (Hugging Face, 2026)
  > The second step is to convert those tokens into numbers, so we can build a tensor out of them and feed them to the model.

## F5 · Google Gemini API: Entender y contar tokens
- url: https://ai.google.dev/gemini-api/docs/tokens
- nombre: Google, Gemini API: Comprender y contar tokens
- idioma: es
- año: 2026
- lecciones: Tokens: cómo "lee" un LLM

- D9: Regla aproximada para los modelos Gemini: 1 token son unos 4 caracteres y 100 tokens son unas 60 a 80 palabras en inglés (Google, página actualizada el 23 de septiembre de 2026). Nota: la fuente dice entre 60 y 80 palabras por cada 100 tokens, no exactamente 3/4
  > En el caso de los modelos de Gemini, un token equivale a alrededor de 4 caracteres. 100 tokens equivalen a entre 60 y 80 palabras en inglés.

## F6 · arXiv: Los tokenizadores introducen injusticia entre idiomas
- url: https://arxiv.org/abs/2305.15425
- nombre: Petrov, La Malfa, Torr y Bibi (en inglés), arXiv 2305.15425 (NeurIPS 2023): Language Model Tokenizers Introduce Unfairness Between Languages
- idioma: en
- año: 2023
- lecciones: Tokens: cómo "lee" un LLM

- D10: El mismo texto traducido a distintos idiomas puede tener longitudes de tokenización muy distintas, hasta 15 veces en algunos casos (Petrov et al., Reino Unido, 2023)
  > The same text translated into different languages can have drastically different tokenization lengths, with differences up to 15 times in some cases.

## F7 · Hugging Face: Inferencia de texto con LLM
- url: https://huggingface.co/learn/llm-course/chapter1/8
- nombre: Hugging Face (en inglés), LLM Course: Deep dive into Text Generation Inference with LLMs
- idioma: en
- año: 2026
- lecciones: Cómo genera texto: predecir la siguiente palabra

- D12: Al elegir el siguiente token, el modelo parte de probabilidades en bruto (logits) para cada palabra de su vocabulario (Hugging Face, 2026)
  > When the model needs to choose the next token, it starts with raw probabilities (called logits) for every word in its vocabulary.
- D13: El modelo genera un token a la vez, en un proceso autorregresivo en que cada token nuevo depende de todos los anteriores (Hugging Face, 2026). No dice literalmente "lo agrega a la entrada"
  > The model generates one token at a time in what we call an autoregressive process (where each new token depends on all previous tokens).

## F8 · IBM: Qué es la temperatura de un LLM
- url: https://www.ibm.com/think/topics/llm-temperature
- nombre: IBM (en inglés), What is LLM temperature?
- idioma: en
- año: 2026
- lecciones: Cómo genera texto: predecir la siguiente palabra

- D14: La temperatura controla qué tan aleatorio es el texto que genera un LLM (IBM, Estados Unidos, 2026)
  > Temperature controls the randomness of text that is generated by LLMs during inference.

## F9 · Anthropic: Glosario
- url: https://docs.anthropic.com/en/docs/about-claude/glossary
- nombre: Anthropic (en inglés), Claude Platform Docs: Glossary
- idioma: en
- año: 2026
- lecciones: Cómo genera texto: predecir la siguiente palabra

- D15: Con temperaturas más altas hay más variedad: varias formas de redactar y, en ficción, variación en las respuestas (Anthropic, Estados Unidos, 2026)
  > Higher temperatures lead to more creative and diverse outputs, allowing for multiple variations in phrasing and, in the case of fiction, variation in answers as well.

## F10 · IBM: Qué es una ventana de contexto
- url: https://www.ibm.com/think/topics/context-window
- nombre: IBM (en inglés), What is a context window?
- idioma: en
- año: 2024
- lecciones: Contexto y memoria

- D16: La ventana de contexto de un LLM es la cantidad de texto, en tokens, que el modelo puede considerar a la vez (IBM, Estados Unidos)
  > The context window (or “context length”) of a large language model (LLM) is the amount of text, in tokens , that the model can consider or “remember” at any one time.
- D18: Si una conversación o documento excede la ventana de contexto, hay que truncarlo o resumirlo para que el modelo continúe (IBM, Estados Unidos)
  > When a prompt, conversation, document or code base exceeds an artificial intelligence model’s context window, it must be truncated or summarized for the model to proceed.
- D20: Ejemplo de crecimiento a abril de 2024: Llama pasó de 2 048 tokens a 4 096 (Llama 2) y a unos 8 000 (Llama 3); IBM da cifras "a octubre de 2024" (IBM, Estados Unidos, 2024)
  > The original Llama models had a maximum context length of 2,048 tokens, which was doubled to 4,096 tokens for Llama 2 . During their launch in April 2024, Llama 3 models offered a context window of roughly 8,000 tokens.

## F11 · Anthropic: Ventanas de contexto
- url: https://docs.anthropic.com/en/docs/build-with-claude/context-windows
- nombre: Anthropic (en inglés), Claude Platform Docs: Context windows
- idioma: en
- año: 2026
- lecciones: Contexto y memoria

- D17: Todo lo de la solicitud cuenta para la ventana de contexto, y también cuenta lo que el modelo genera como respuesta (Anthropic, Estados Unidos, 2026)
  > Everything in the request counts toward the context window: the system prompt, every message in messages (including tool results, images, and documents), and your tool definitions. The output Claude generates for the turn, including its extended thinking, counts too.

## F12 · Anthropic: Uso de la API de mensajes
- url: https://docs.anthropic.com/en/api/messages-examples
- nombre: Anthropic (en inglés), Claude Platform Docs: Using the Messages API
- idioma: en
- año: 2026
- lecciones: Contexto y memoria

- D19: La API de mensajes no guarda estado (stateless): quien la usa debe enviar siempre el historial completo de la conversación (Anthropic, Estados Unidos, 2026)
  > The Messages API is stateless, which means that you always send the full conversational history to the API.


## F20 · IBM: What are AI hallucinations
- url: https://www.ibm.com/think/topics/ai-hallucinations
- nombre: IBM, What are AI hallucinations? (en inglés)
- idioma: en
- año: 2026
- lecciones: Alucinaciones: cuando la IA inventa

- D21: Las alucinaciones de la IA son salidas que suenan plausibles pero son falsas, irrelevantes o completamente inventadas (IBM, 2026).
  > AI hallucinations are instances where an AI system produces outputs that sound plausible but are factually wrong, irrelevant or entirely fabricated.
- D22: Causa: la IA generativa predice salidas plausibles a partir de patrones de sus datos de entrenamiento y no "sabe" qué es verdadero o falso (IBM, 2026).
  > AI hallucinations happen because generative AI works by predicting plausible outputs based on patterns it observes in its training data
- D23: La alucinación es un tipo de error en que el sistema genera información falsa con confianza (IBM, 2026).
  > AI hallucinations are a specific type of mistake where the system confidently generates false or fabricated information.
- D25: Recomendación: tratar la IA generativa como asistente de borrador e investigación, no como autoridad, con mentalidad de verificación (IBM, 2026).
  > This approach encourages teams to treat generative AI as a drafting and research assistant (not an authority) and instills a mindset of verification rather than blind trust.

## F21 · Wikipedia: Mata v. Avianca, Inc.
- url: https://en.wikipedia.org/wiki/Mata_v._Avianca,_Inc.
- nombre: Wikipedia, Mata v. Avianca, Inc. (en inglés)
- idioma: en
- año: 2023
- lecciones: Alucinaciones: cuando la IA inventa

- D24: Caso Mata contra Avianca, tribunal federal del Distrito Sur de Nueva York, Estados Unidos; decidido el 22 de junio de 2023. Los abogados del demandante usaron ChatGPT y presentaron casos legales falsos con citas inventadas (Wikipedia en inglés; el año y el tribunal salen del encabezado del artículo).
  > Attorneys sanctioned for using fake case law citations generated by ChatGPT

## F22 · IBM: What are large language models
- url: https://www.ibm.com/think/topics/large-language-models
- nombre: IBM, What are large language models (LLMs)? (en inglés)
- idioma: en
- año: 2026
- lecciones: Qué puede y qué no puede hacer

- D26: Los LLM sirven para generar texto (correos, artículos), resumir, traducir y responder preguntas (IBM, 2026).
  > Text summarization : LLMs can summarize long articles, news stories, research reports, corporate documentation and customer history into thorough texts tailored in length to a desired output format and style.
- D28: Los LLM pueden reflejar y amplificar sesgos presentes en sus datos de entrenamiento (IBM, 2026).
  > LLMs can also reflect and amplify biases present in their training data, producing outputs that are unfair or offensive.

## F23 · IBM: What are AI agents
- url: https://www.ibm.com/think/topics/ai-agents
- nombre: IBM, What are AI agents? (en inglés)
- idioma: en
- año: 2026
- lecciones: Qué puede y qué no puede hacer

- D30: Los agentes de IA usan herramientas externas como conjuntos de datos, búsquedas web, APIs e incluso otros agentes (IBM, 2026).
  > they turn to available tools such as external datasets, web searches, APIs and even other agents.

## F24 · Wikipedia: Knowledge cutoff
- url: https://en.wikipedia.org/wiki/Knowledge_cutoff
- nombre: Wikipedia, Knowledge cutoff (en inglés)
- idioma: en
- año: 2026
- lecciones: Qué puede y qué no puede hacer

- D27: La fecha de corte es el momento a partir del cual un modelo de lenguaje ya no fue entrenado con datos nuevos (Wikipedia en inglés, 2026).
  > is the point in time beyond which a large language model has not been trained on new data.

## F25 · Wikipedia: Jev (modelo de IA)
- url: https://es.wikipedia.org/wiki/Jev_(modelo_de_IA)
- nombre: Wikipedia, Jev (modelo de IA)
- idioma: es
- año: 2026
- lecciones: Modelos de decisión: IA que elige en lugar de escribir

- D31: Jev es un modelo de IA propietario de TypeSafe AI, empresa de San Francisco (Estados Unidos) fundada en 2024 (Wikipedia, 2026).
  > Jev es un modelo de inteligencia artificial propietario desarrollado por TypeSafe AI, una empresa con sede en San Francisco fundada en 2024.
- D35: Es propietario y se lanzó en acceso anticipado limitado el 15 de septiembre de 2026 (Wikipedia, 2026; una sola referencia, no confirmado por TypeSafe).
  > Fue lanzado en acceso anticipado limitado el 15 de septiembre de 2026, junto con el anuncio de una ronda de financiación inicial de 40 millones de dólares liderada por DCVC.

## F26 · TypeSafe AI: documentación, Introduction
- url: https://docs.typesafe.ai/introduction
- nombre: TypeSafe AI, documentación: Introduction (en inglés)
- idioma: en
- año: 2026
- lecciones: Modelos de decisión: IA que elige en lugar de escribir

- D32: Jev responde preguntas de tipo "elegir una opción de una lista", "puntuar según una regla" o "verdadero/falso" (TypeSafe, 2026).
  > Choice Choose an option from a list choice , probabilities , confidence Score Score the state on a rubric score , probabilities , confidence Noul Is this statement true? noul (0–1)
- D33: Devuelve valores tipados y distribuciones de probabilidad que el código puede usar (TypeSafe, 2026).
  > You get typed values and probability distributions that your code can branch on, sort by, and route with.

## F27 · TypeSafe AI: página principal
- url: https://typesafe.ai/
- nombre: TypeSafe AI, página principal (en inglés)
- idioma: en
- año: 2026
- lecciones: Modelos de decisión: IA que elige en lugar de escribir

- D34: TypeSafe llama "modelos de Sistema Uno" a una nueva clase de modelos hechos para decisiones dentro de software (TypeSafe, 2026).
  > System One Models are a new class of AI model built for decisions inside software.

## F28 · TypeSafe AI: blog, Introducing System One Models & Jev
- url: https://typesafe.ai/blog/introducing-system-one-models-and-jev
- nombre: TypeSafe AI, blog: Introducing System One Models & Jev (en inglés)
- idioma: en
- año: 2026
- lecciones: Modelos de decisión: IA que elige en lugar de escribir

- D37: Según TypeSafe, con sus propias pruebas, Jev responde en 70 a 500 milisegundos, entre 40 y 200 veces más rápido que los modelos de frontera (afirmación de la empresa, 2026).
  > End-to-end response time is 70ms-500ms for TypeSafe. This can range from 40x-200x faster for the same levels of frontier intelligence for System One shaped queries.

## F29 · Hugging Face: convaiinnovations/laya
- url: https://huggingface.co/convaiinnovations/laya
- nombre: Hugging Face, convaiinnovations/laya (en inglés)
- idioma: en
- año: 2026
- lecciones: Modelos de decisión: IA que elige en lugar de escribir

- D36: Laya es un modelo de decisión de pesos abiertos con licencia Apache 2.0 (Convai Innovations); la ficha del modelo lo compara con Jev, de API cerrada (2026).
  > Weights closed API Apache 2.0 Open weights, on-premise capable
