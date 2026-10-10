# Ficha: ia · Unidad 5: LLMs locales: IA en tu propio equipo

## F1 · LM Studio: documentación de bienvenida
- url: https://lmstudio.ai/docs/app
- nombre: Documentación de una herramienta local (LM Studio, en inglés), Welcome to LM Studio Docs!
- idioma: en
- año: 2026
- lecciones: Qué es un LLM local y por qué usarlo

- D1: Un modelo local se descarga y se ejecuta en el propio equipo con un programa de escritorio (LM Studio, consultado en octubre de 2026)
  > Download and run local LLMs like gpt-oss or Llama, Qwen

## F2 · LM Studio: funcionamiento sin conexión
- url: https://lmstudio.ai/docs/app/offline
- nombre: Documentación de una herramienta local (LM Studio, en inglés), Offline Operation
- idioma: en
- año: 2026
- lecciones: Qué es un LLM local y por qué usarlo

- D2: Con el modelo ya descargado, la herramienta puede funcionar completamente sin conexión; buscar y descargar modelos sí exige internet (LM Studio, consultado en octubre de 2026)
  > LM Studio can operate entirely offline, just make sure to get some model files first.
- D3: Lo que escribes al chatear con un modelo descargado no sale del dispositivo (LM Studio, consultado en octubre de 2026)
  > Nothing you enter into LM Studio when chatting with LLMs leaves your device.

## F3 · IBM: Qué es la computación en la nube
- url: https://www.ibm.com/think/topics/cloud-computing
- nombre: IBM (en inglés), What Is Cloud Computing?
- idioma: en
- año: 2026
- lecciones: Qué es un LLM local y por qué usarlo

- D4: Servicios en la nube significan usar, por internet, servidores remotos en grandes centros de datos (IBM, Estados Unidos). Respalda en parte: habla de la nube en general, no de modelos de lenguaje.
  > accessing remote servers, powerful mainframe computers housed in large data centers, through the internet.

## F4 · LM Studio: requisitos del sistema
- url: https://lmstudio.ai/docs/app/system-requirements
- nombre: Documentación de una herramienta local (LM Studio, en inglés), System Requirements
- idioma: en
- año: 2026
- lecciones: Qué es un LLM local y por qué usarlo; Qué necesita tu equipo: memoria, procesador y tarjeta gráfica

- D5: Los modelos de lenguaje pueden consumir mucha RAM; la documentación recomienda al menos 16 GB en Windows (LM Studio, consultado en octubre de 2026)
  > LLMs can consume a lot of RAM. At least 16GB of RAM is recommended.
- D15: Requisitos en Mac (consultado en octubre de 2026, revisa la información vigente): chip Apple Silicon, macOS 14.0 o más nuevo y 16 GB o más de RAM recomendados; en Mac de 8 GB, modelos pequeños (LM Studio)
  > Chip: Apple Silicon (M1/M2/M3/M4). macOS 14.0 or newer is required. 16GB+ RAM recommended. You may still be able to use LM Studio on 8GB Macs, but stick to smaller models and modest context sizes.

## F5 · OSI: Definición de IA de Código Abierto 1.0
- url: https://opensource.org/ai/open-source-ai-definition
- nombre: Open Source Initiative (en inglés), The Open Source AI Definition 1.0
- idioma: en
- año: 2024
- lecciones: Modelos abiertos: qué significa que se puedan descargar

- D7: La definición de la OSI (versión 1.0, 2024) dice que un modelo o unos pesos de código abierto deben incluir la información de los datos y el código usados para obtener los parámetros
  > must include the data information and code used to derive those parameters.

## F6 · OSI: Pesos abiertos
- url: https://opensource.org/ai/open-weights
- nombre: Open Source Initiative (en inglés), Open Weights: not quite what you've been told
- idioma: en
- año: 2025
- lecciones: Modelos abiertos: qué significa que se puedan descargar

- D6: Los pesos abiertos son los pesos y sesgos finales de una red neuronal ya entrenada (OSI, Estados Unidos)
  > Open Weights refer to the final weights and biases of a trained neural network.

## F7 · Hugging Face: tarjetas de modelo
- url: https://huggingface.co/docs/hub/model-cards
- nombre: Hugging Face (en inglés), Model Cards
- idioma: en
- año: 2026
- lecciones: Modelos abiertos: qué significa que se puedan descargar

- D9: Una ficha de modelo es un archivo que acompaña al modelo y debe describir sus usos previstos y sus posibles limitaciones (Hugging Face, consultado en octubre de 2026)
  > The model card should describe: the model its intended uses & potential limitations, including biases and ethical considerations

## F8 · Hugging Face: licencias OpenRAIL
- url: https://huggingface.co/blog/open_rail
- nombre: Hugging Face (en inglés), OpenRAIL: Towards open and responsible AI licensing frameworks
- idioma: en
- año: 2022
- lecciones: Modelos abiertos: qué significa que se puedan descargar

- D10: Algunas licencias de modelos abiertos (familia OpenRAIL) incluyen restricciones de uso en escenarios críticos, así que no todas permiten todo (Hugging Face, 2022)
  > OpenRAIL licenses embed a specific set of restrictions for the use of the licensed AI artifact in identified critical scenarios.

## F9 · Hugging Face: Laya
- url: https://huggingface.co/convaiinnovations/laya
- nombre: Hugging Face (en inglés), convaiinnovations/laya
- idioma: en
- año: 2026
- lecciones: Modelos abiertos: qué significa que se puedan descargar

- D11: Laya aparece con pesos abiertos, licencia Apache 2.0 y capacidad de ejecutarse en equipos propios (on-premise), frente a un modelo cerrado que se usa por API (Hugging Face, consultado en octubre de 2026)
  > Weights closed API Apache 2.0 Open weights, on-premise capable

## F10 · IBM: Qué es una GPU
- url: https://www.ibm.com/think/topics/gpu
- nombre: IBM (en inglés), What is a GPU?
- idioma: en
- año: 2026
- lecciones: Qué necesita tu equipo: memoria, procesador y tarjeta gráfica

- D12: Las GPU hacen muchos cálculos simultáneos y por eso sirven para aprendizaje profundo y de IA (IBM, Estados Unidos)
  > High-performance GPUs are well suited for deep learning or AI applications because they can handle a large volume of calculations in multiple cores with large amounts of available memory.
- D13: La GPU tiene su propia memoria RAM, pensada para grandes volúmenes de datos, incluida la IA (IBM, Estados Unidos). Respalda en parte: no usa la sigla VRAM.
  > A GPU has its own random access memory (RAM), an electronic memory used to store code and data that the chip can access and alter as needed.

## F11 · Apple: presentación del chip M1
- url: https://www.apple.com/newsroom/2020/11/apple-unleashes-m1/
- nombre: Apple (en inglés), Apple unleashes M1
- idioma: en
- año: 2020
- lecciones: Qué necesita tu equipo: memoria, procesador y tarjeta gráfica

- D14: En los chips de Apple la memoria unificada es un solo conjunto de memoria al que acceden todos los componentes del chip sin copiar datos (Apple, Estados Unidos, 2020)
  > M1 also features a unified memory architecture that brings together high-bandwidth, low-latency memory into a single pool within a custom package.

## F12 · Ollama: guía de inicio
- url: https://docs.ollama.com/quickstart
- nombre: Documentación de una herramienta local (Ollama, en inglés), Quickstart
- idioma: en
- año: 2026
- lecciones: Qué necesita tu equipo: memoria, procesador y tarjeta gráfica

- D16: Para un modelo de ejemplo de unos 7,2 GB de descarga se recomiendan 8 GB de VRAM disponible (o memoria unificada en Mac); con menos VRAM puede usar la RAM del sistema (Ollama, consultado en octubre de 2026). Respalda en parte: es una orientación para un modelo, no una tabla por tamaños.
  > The model download is about 7.2 GB. We recommend 8 GB of available VRAM, or unified memory on a Mac. Larger context windows need more memory.

## F13 · Hugging Face: optimizar LLM en velocidad y memoria
- url: https://huggingface.co/docs/transformers/llm_tutorial_optimization
- nombre: Hugging Face (en inglés), Optimizing LLMs for Speed and Memory
- idioma: en
- año: 2026
- lecciones: Tamaño de un modelo: parámetros y cuánta memoria ocupa

- D17: Cargar los pesos de un modelo de X miles de millones de parámetros en float32 requiere unos 4 × X GB (Hugging Face, transformers)
  > Loading the weights of a model having X billion parameters requires roughly 4 * X GB of VRAM in float32 precision
- D18: En bfloat16 o float16 se necesitan unos 2 × X GB (Hugging Face, transformers)
  > Loading the weights of a model having X billion parameters requires roughly 2 * X GB of VRAM in bfloat16/float16 precision
- D21: Guardar el caché de claves y valores puede costar mucha memoria con entradas largas o chats de varios turnos (Hugging Face, transformers)
  > holding the key-value cache in memory can become very memory expensive for long input sequences or multi-turn chat.

## F14 · Wikipedia: Byte
- url: https://es.wikipedia.org/wiki/Byte
- nombre: Wikipedia, Byte
- idioma: es
- año: 2026
- lecciones: Tamaño de un modelo: parámetros y cuánta memoria ocupa

- D19: Un byte es una unidad de información compuesta por ocho bits (Wikipedia en español, contrastada con ISO/IEC 80000-13 que la propia página cita)
  > es la unidad de información de base utilizada en computación y en telecomunicaciones, y está compuesta por un conjunto ordenado de ocho bits


## F20 · Hugging Face Optimum: Quantization
- url: https://huggingface.co/docs/optimum/concept_guides/quantization
- nombre: Hugging Face, documentación de Optimum: Quantization (en inglés)
- idioma: en
- año: 2026
- lecciones: Cuantización: modelos más ligeros a cambio de un poco de calidad

- D22: Cuantizar es representar los pesos y las activaciones con tipos de datos de baja precisión (por ejemplo enteros de 8 bits en vez de decimales de 32 bits). Fuente: Hugging Face, documentación vigente consultada en octubre de 2026.
  > Quantization is a technique to reduce the computational and memory costs of running inference by representing the weights and activations with low-precision data types like 8-bit integer ( int8 ) instead of the usual 32-bit floating point ( float32 ).
- D23: Con menos bits el modelo ocupa menos memoria y las multiplicaciones de matrices pueden ser mucho más rápidas con aritmética de enteros. Hugging Face, octubre de 2026.
  > Reducing the number of bits means the resulting model requires less memory storage, consumes less energy (in theory), and operations like matrix multiplication can be performed much faster with integer arithmetic.

## F21 · LM Studio: Download an LLM
- url: https://lmstudio.ai/docs/app/basics/download-model
- nombre: LM Studio, documentación: Download an LLM (en inglés)
- idioma: en
- año: 2026
- lecciones: Cuantización: modelos más ligeros a cambio de un poco de calidad

- D24: La cuantización comprime el archivo del modelo a cambio de perder algo de calidad (la cita es de la documentación de LM Studio, no de Hugging Face). Consultada en octubre de 2026.
  > The Q represents a technique called "Quantization", which roughly means compressing model files in size, while giving up some degree of quality.

## F22 · Hugging Face Hub: GGUF
- url: https://huggingface.co/docs/hub/gguf
- nombre: Hugging Face, documentación del Hub: GGUF (en inglés)
- idioma: en
- año: 2026
- lecciones: Cuantización: modelos más ligeros a cambio de un poco de calidad

- D25: GGUF es un formato con tipos de cuantización; por ejemplo Q4_K es de 4 bits por peso nominales y resulta en 4.5 bits por peso con la escala por bloques. Hugging Face, octubre de 2026.
  > Q4_K GH 4-bit quantization ( q ). Super-blocks with 8 blocks, each block has 32 weights. Weight formula: w = q * block_scale(6-bit) + block_min(6-bit) , resulting in 4.5 bits-per-weight.

## F23 · Wikipedia: Nibble
- url: https://es.wikipedia.org/wiki/Nibble
- nombre: Wikipedia (es), Nibble
- idioma: es
- año: 2026
- lecciones: Cuantización: modelos más ligeros a cambio de un poco de calidad

- D26: Un nibble o cuarteto, de cuatro bits, es medio byte (medio octeto), así que 4 bits son 0.5 bytes por parámetro.
  > En arquitectura de computadoras , se conoce como nibble , semiocteto , cuarteto o medio- byte a un conjunto de cuatro dígitos binarios ( bits ) o medio octeto .

## F24 · IBM Think: instruction tuning
- url: https://www.ibm.com/think/topics/instruction-tuning
- nombre: IBM Think, What Is Instruction Tuning? (en inglés)
- idioma: en
- año: 2026
- lecciones: Elegir un modelo según tu equipo y tu tarea

- D27: Un modelo preentrenado (base) no está optimizado para conversar ni seguir instrucciones: solo continúa el texto. El ajuste por instrucciones lo hace más útil.
  > pre-trained LLMs are not optimized for conversations or instruction following. In a literal sense, LLMs do not answer a prompt: they only append text to it.
- D30: Existen variantes especializadas de un mismo modelo, por ejemplo para diálogo y para programar (ejemplo de Llama 2, 2023).
  > Meta’s Llama 2 model family is offered (in multiple sizes) as a base model, as a variant fine-tuned for dialogue ( Llama-2-chat ) and as a variant fine-tuned for coding ( Code Llama ).

## F25 · Ollama: Quickstart
- url: https://docs.ollama.com/quickstart
- nombre: Ollama, documentación: Quickstart (en inglés)
- idioma: en
- año: 2026
- lecciones: Elegir un modelo según tu equipo y tu tarea; Instalar y usar Ollama

- D28: Con poca VRAM, Ollama puede usar la memoria RAM del sistema, pero las respuestas pueden ir más lentas (Ollama, octubre de 2026; solo menciona la RAM del sistema, no dice "CPU").
  > With less VRAM, Ollama can use system RAM, but responses may be slower.
- D32: Instalación en macOS, Windows o Linux: descargar Ollama desde la página oficial y abrir la app o escribir ollama en la terminal (Ollama, macOS y Windows, octubre de 2026).
  > Download Ollama for macOS, Windows, or Linux. Open the app, or get started from your terminal:
- D34: ollama run descarga el modelo y abre un chat en tu computadora (Ollama, octubre de 2026; ejemplo con gemma4:e2b).
  > Download Ollama , then run: ollama run gemma4:e2b Ollama downloads the model and starts a chat on your computer.

## F26 · Ollama: biblioteca, etiquetas de llama3.1
- url: https://ollama.com/library/llama3.1/tags
- nombre: Ollama, biblioteca de modelos: llama3.1, etiquetas (en inglés)
- idioma: en
- año: 2026
- lecciones: Elegir un modelo según tu equipo y tu tarea; Cuantización: modelos más ligeros a cambio de un poco de calidad

- D29: En la biblioteca de Ollama, la versión llama3.1:8b-instruct-fp16 (8 mil millones de parámetros, 16 bits) pesa 16 GB, a octubre de 2026. En la misma página, q8_0 pesa 8.5 GB y q4_0 pesa 4.7 GB (no tienen cita propia).
  > llama3.1:8b-instruct-fp16 4aacac419454 • 16GB • 128K context window • Text input • 2 years ago

## F27 · Hugging Face: Laya
- url: https://huggingface.co/convaiinnovations/laya
- nombre: Hugging Face, convaiinnovations/laya (en inglés)
- idioma: en
- año: 2026
- lecciones: Elegir un modelo según tu equipo y tu tarea

- D31: Laya tiene pesos abiertos, licencia Apache 2.0 y puede alojarse en tus propios equipos (on-premise), según su ficha, octubre de 2026.
  > Weights closed API Apache 2.0 Open weights, on-premise capable

## F28 · Ollama: Linux
- url: https://docs.ollama.com/linux
- nombre: Ollama, documentación: Linux (en inglés)
- idioma: en
- año: 2026
- lecciones: Instalar y usar Ollama

- D33: Comando de instalación en Linux, textual (Ollama, Linux, consultado en octubre de 2026): curl -fsSL https://ollama.com/install.sh | sh
  > To install Ollama, run the following command: curl -fsSL https://ollama.com/install.sh | sh

## F29 · Ollama: CLI Reference
- url: https://docs.ollama.com/cli
- nombre: Ollama, documentación: CLI Reference (en inglés)
- idioma: en
- año: 2026
- lecciones: Instalar y usar Ollama

- D35: ollama pull descarga un modelo, ollama rm lo elimina y ollama ls lista los modelos (la doc dice "ollama ls", no "ollama list"). Ollama, octubre de 2026.
  > Download a model ollama pull gemma4 Remove a model ollama rm gemma4 List models ollama ls

## F30 · Ollama: Windows
- url: https://docs.ollama.com/windows
- nombre: Ollama, documentación: Windows (en inglés)
- idioma: en
- año: 2026
- lecciones: Instalar y usar Ollama

- D36: La API local de Ollama se sirve en http://localhost:11434 (Windows, octubre de 2026).
  > As usual the Ollama API will be served on http://localhost:11434 .

## F31 · Ollama: licencia en GitHub
- url: https://raw.githubusercontent.com/ollama/ollama/main/LICENSE
- nombre: GitHub, ollama/ollama: LICENSE (en inglés)
- idioma: en
- año: 2026
- lecciones: Instalar y usar Ollama

- D37: Ollama se publica con la licencia MIT (GitHub, octubre de 2026).
  > MIT License Copyright (c) Ollama Permission is hereby granted, free of charge, to any person obtaining a copy of this software

## F32 · LM Studio: System Requirements
- url: https://lmstudio.ai/docs/app/system-requirements
- nombre: LM Studio, documentación: System Requirements (en inglés)
- idioma: en
- año: 2026
- lecciones: Instalar y usar LM Studio

- D38: LM Studio funciona en Mac, Windows y Linux (con los chips y arquitecturas indicados); octubre de 2026.
  > Supported CPU, GPU types for LM Studio on Mac (M1/M2/M3/M4), Windows (x64/ARM), and Linux (x64/ARM64)

## F33 · LM Studio: Get started
- url: https://lmstudio.ai/docs/app/basics
- nombre: LM Studio, documentación: Get started with LM Studio (en inglés)
- idioma: en
- año: 2026
- lecciones: Instalar y usar LM Studio

- D39: En LM Studio se buscan y descargan modelos desde la pestaña Discover de la propia app (octubre de 2026, todos los sistemas).
  > Head over to the Discover tab to download models. Pick one of the curated options or search for models by search query
- D40: Cargar un modelo es reservar memoria en la RAM para sus pesos; una vez cargado, se conversa en la pestaña Chat (octubre de 2026).
  > allocating memory to be able to accommodate the model's weights and other parameters in your computer's RAM. Chat! Once the model is loaded, you can start a back-and-forth conversation with the model in the Chat tab.

## F34 · LM Studio: lms load
- url: https://lmstudio.ai/docs/cli/local-models/load
- nombre: LM Studio, documentación: lms load (en inglés)
- idioma: en
- año: 2026
- lecciones: Instalar y usar LM Studio

- D41: Se puede indicar cuánto del modelo pasa a la GPU (GPU offload); 0.5 reparte la mitad de las capas a la GPU (octubre de 2026).
  > Control GPU memory usage with the --gpu flag: lms load < model_ke y > --gpu 0.5 # Offload 50% of layers to GPU lms load < model_ke y > --gpu max # Offload all layers to GPU

## F35 · LM Studio: Offline Operation
- url: https://lmstudio.ai/docs/app/offline
- nombre: LM Studio, documentación: Offline Operation (en inglés)
- idioma: en
- año: 2026
- lecciones: Instalar y usar LM Studio

- D43: LM Studio puede funcionar como servidor local (localhost o red local) (octubre de 2026).
  > LM Studio can be used as a server to provide LLM inferencing on localhost or the local network.
- D44: LM Studio puede funcionar totalmente sin conexión una vez que hay archivos de modelo (octubre de 2026).
  > LM Studio can operate entirely offline, just make sure to get some model files first.

## F36 · LM Studio: Terms of Service
- url: https://lmstudio.ai/terms
- nombre: LM Studio, App Terms of Service (en inglés)
- idioma: en
- año: 2026
- lecciones: Instalar y usar LM Studio

- D42: Los términos de uso de LM Studio permiten usar el programa para fines personales o internos de una empresa (octubre de 2026; revisa los términos vigentes).
  > Company grants to You a non-exclusive, non-transferable license to use the Software solely for Your personal and / or internal business purposes and solely in accordance with the Documentation.


## F40 · Google AI Edge Gallery (repositorio oficial)
- url: https://github.com/google-ai-edge/gallery
- nombre: Google AI Edge, repositorio google-ai-edge/gallery en GitHub (en inglés)
- idioma: en
- año: 2026
- lecciones: Correr un modelo en el celular

- D45: Estados Unidos, consultado en octubre de 2026: el repositorio oficial de Google AI Edge Gallery dice que los modelos se ejecutan en el hardware del dispositivo y que no se necesita internet.
  > All model inferences happen directly on your device hardware. No internet is required, ensuring total privacy for your prompts, images, and sensitive data.
- D46: Estados Unidos, consultado en octubre de 2026: la app pide Android 12 o superior, o iOS 17 o superior.
  > Android 12 and up, and iOS 17 and up

## F41 · Google AI for Developers: Gemma 3n
- url: https://ai.google.dev/gemma/docs/gemma-3n
- nombre: Google AI for Developers, Descripción general del modelo Gemma 3n
- idioma: es
- año: 2026
- lecciones: Correr un modelo en el celular

- D47: Estados Unidos, consultado en octubre de 2026: la documentación oficial de Gemma 3n lo describe como un modelo optimizado para dispositivos cotidianos como teléfonos, laptops y tablets.
  > Gemma 3n es un modelo de IA generativa optimizado para su uso en dispositivos cotidianos, como teléfonos, laptops y tablets.

## F42 · Hugging Face Hub: Pickle Scanning
- url: https://huggingface.co/docs/hub/security-pickle
- nombre: Hugging Face, documentación del Hub: Pickle Scanning (en inglés)
- idioma: en
- año: 2026
- lecciones: Descargar modelos de forma segura: fuentes y licencias

- D49: Estados Unidos, consultado en octubre de 2026: cargar un archivo pickle puede permitir ataques que ejecutan código arbitrario.
  > There are dangerous arbitrary code execution attacks that can be perpetrated when you load a pickle file.

## F43 · Safetensors (documentación de Hugging Face)
- url: https://huggingface.co/docs/safetensors/index
- nombre: Hugging Face, documentación de Safetensors (en inglés)
- idioma: en
- año: 2026
- lecciones: Descargar modelos de forma segura: fuentes y licencias

- D50: Estados Unidos, consultado en octubre de 2026: safetensors es un formato simple para guardar tensores de forma segura, en contraste con pickle. La cita no dice textualmente que no ejecute código.
  > Safetensors is a new simple format for storing tensors safely (as opposed to pickle) and that is still fast (zero-copy).

## F44 · Hugging Face Hub: Malware Scanning
- url: https://huggingface.co/docs/hub/security-malware
- nombre: Hugging Face, documentación del Hub: Malware Scanning (en inglés)
- idioma: en
- año: 2026
- lecciones: Descargar modelos de forma segura: fuentes y licencias

- D51: Estados Unidos, consultado en octubre de 2026: Hugging Face pasa por un escáner de malware cada archivo de los repositorios menor de 2 GB, en cada commit (no los archivos más grandes).
  > We run every file of your repositories that is smaller than 2 GB through a malware scanner

## F45 · Hugging Face Hub: Licenses
- url: https://huggingface.co/docs/hub/repositories-licenses
- nombre: Hugging Face, documentación del Hub: Licenses (en inglés)
- idioma: en
- año: 2026
- lecciones: Descargar modelos de forma segura: fuentes y licencias

- D53: Estados Unidos, consultado en octubre de 2026: la licencia de un repositorio indica a los demás qué permisos se otorgan sobre el código o los datos, y hay que respetarla.
  > to let other users know about the permissions that you want to attribute to your code or data.

## F46 · Wikipedia: Suma de verificación
- url: https://es.wikipedia.org/wiki/Suma_de_verificaci%C3%B3n
- nombre: Wikipedia, Suma de verificación
- idioma: es
- año: 2025
- lecciones: Descargar modelos de forma segura: fuentes y licencias

- D52: una suma de verificación detecta cambios accidentales en los datos para proteger su integridad. El artículo menciona SHA-256 solo en otra frase, para detectar modificaciones intencionadas.
  > es una función de redundancia que tiene como propósito principal detectar cambios accidentales en una secuencia de datos para proteger la integridad de estos

## F47 · Hugging Face transformers: Optimizing LLMs for Speed and Memory
- url: https://huggingface.co/docs/transformers/llm_tutorial_optimization
- nombre: Hugging Face, documentación de Transformers: Optimizing LLMs for Speed and Memory (en inglés)
- idioma: en
- año: 2026
- lecciones: Velocidad y calidad: qué esperar de un modelo local

- D56: Estados Unidos, consultado en octubre de 2026: al generar texto, el ancho de banda de memoria necesario para recargar datos puede ser un cuello de botella serio de tiempo.
  > For auto-regressive decoding, the required memory bandwidth for the constant reloading can become a serious time bottleneck.

## F48 · Hugging Face TGI: Streaming
- url: https://huggingface.co/docs/text-generation-inference/conceptual/streaming
- nombre: Hugging Face, documentación de Text Generation Inference: Streaming (en inglés)
- idioma: en
- año: 2026
- lecciones: Velocidad y calidad: qué esperar de un modelo local

- D55: Estados Unidos, consultado en octubre de 2026: la velocidad de generación se expresa en tokens por segundo (el ejemplo es de 100 tokens por segundo, no una regla general).
  > For example, a system can generate 100 tokens per second. If the system generates 1000 tokens, with the non-streaming setup, users need to wait 10 seconds to get results.

## F49 · IBM Think: CPU vs. GPU for Machine Learning
- url: https://www.ibm.com/think/topics/cpu-vs-gpu-machine-learning
- nombre: IBM Think, CPU vs. GPU for Machine Learning (en inglés)
- idioma: en
- año: 2026
- lecciones: Velocidad y calidad: qué esperar de un modelo local

- D57: IBM: las GPU pueden dar más velocidad y eficiencia que las CPU en aprendizaje automático intensivo, porque resuelven partes de un problema a la vez. Habla de aprendizaje automático en general, no de modelos locales.
  > gpus can offer improved speed and efficiency in intensive machine learning applications.

## F50 · arXiv: Scaling Laws for Neural Language Models (Kaplan et al., 2020)
- url: https://arxiv.org/abs/2001.08361
- nombre: Kaplan et al. (OpenAI y Universidad Johns Hopkins, 2020), Scaling Laws for Neural Language Models, arXiv (en inglés)
- idioma: en
- año: 2020
- lecciones: Velocidad y calidad: qué esperar de un modelo local

- D58: Estados Unidos, 2020: la pérdida (el error) de un modelo de lenguaje baja siguiendo una ley de potencia al aumentar el tamaño del modelo, los datos y el cómputo.
  > The loss scales as a power-law with model size, dataset size, and the amount of compute used for training, with some trends spanning more than seven orders of magnitude.

## F51 · Hugging Face: Leaderboards and Evaluations
- url: https://huggingface.co/docs/leaderboards/index
- nombre: Hugging Face, documentación de Leaderboards and Evaluations (en inglés)
- idioma: en
- año: 2026
- lecciones: Velocidad y calidad: qué esperar de un modelo local

- D59: Estados Unidos, consultado en octubre de 2026: el Hub tiene tablas de clasificación y evaluaciones de modelos, con resultados de conjuntos de datos de referencia (benchmarks).
  > The Hub contains leaderboards and evaluations for machine learning models, including LLMs, chatbots, and more.

## F52 · Ollama: Usage (API)
- url: https://docs.ollama.com/api/usage
- nombre: Ollama, documentación: Usage (en inglés)
- idioma: en
- año: 2026
- lecciones: Velocidad y calidad: qué esperar de un modelo local

- D60: Ollama, consultado en octubre de 2026: sus respuestas incluyen métricas como cuánto tardó el modelo en cargarse (load_duration) y en generar los tokens.
  > load_duration : how long the model took to load

## F53 · IBM Think: Retrieval Augmented Generation (RAG)
- url: https://www.ibm.com/think/topics/retrieval-augmented-generation
- nombre: IBM Think, What is RAG (Retrieval Augmented Generation)? (en inglés)
- idioma: en
- año: 2026
- lecciones: Usar un modelo local con tus propios documentos

- D61: IBM, actualizado el 2 de octubre de 2026: RAG es una arquitectura que mejora un modelo de IA conectándolo con bases de conocimiento externas.
  > Retrieval augmented generation, or RAG, is an architecture for optimizing the performance of an artificial intelligence (AI) model by connecting it with external knowledge bases.
- D62: IBM, 2026: los documentos se dividen en fragmentos (chunks) para que los embeddings no desborden la ventana de contexto del modelo.
  > Chunking a document into smaller sizes helps ensure that the resulting embeddings will not overwhelm the context window of the LLM in the RAG system.
- D64: IBM, 2026: el sistema RAG arma una instrucción aumentada con el contexto recuperado de la base de conocimiento.
  > The RAG system engineers an augmented prompt to the LLM with enhanced context from the retrieved data.
- D66: IBM, 2026: RAG puede reducir el riesgo de alucinaciones, pero no hace al modelo infalible.
  > While RAG can reduce the risk of hallucinations, it cannot make a model error-proof.

## F54 · IBM Think: Vector Embedding
- url: https://www.ibm.com/think/topics/vector-embedding
- nombre: IBM Think, What is Vector Embedding? (en inglés)
- idioma: en
- año: 2024
- lecciones: Usar un modelo local con tus propios documentos

- D63: IBM, 2024: un embedding convierte un dato no estructurado en una lista de números que conserva su significado original.
  > Vector embedding is a way to convert an unstructured data point into an array of numbers that still expresses that data's original meaning.

## F55 · LM Studio: Offline Operation
- url: https://lmstudio.ai/docs/app/offline
- nombre: LM Studio, documentación: Offline Operation (en inglés)
- idioma: en
- año: 2026
- lecciones: Usar un modelo local con tus propios documentos

- D65: LM Studio, consultado en octubre de 2026: al chatear con un documento o usar RAG, el documento se queda en tu máquina y se procesa localmente.
  > When you drag and drop a document into LM Studio to chat with it or perform RAG, that document stays on your machine. All document processing is done locally

