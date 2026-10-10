# Plan · ia · Unidad 5: LLMs locales: IA en tu propio equipo

Al aprobarse, este plan se copia a `.claude/trabajo/ia/llms-locales/plan.md`.

## Contexto
- **Archivo destino**: `lecciones/ia/llms-locales.js`, más `archivo:` en la unidad 5 de `js/temario.js`.
- **Tamaño**: 12 lecciones, 6 ejercicios cada una. Los títulos son los del temario, sin cambios.
- **Reglas de `ia.md` que aplican**:
  - Ollama y LM Studio solo en sus lecciones.
  - Instalación: pasos y comandos copiados de la documentación oficial vigente y citados; indicar el sistema operativo y advertir que la interfaz puede cambiar.
  - Ejercicios sin nada instalado: leer comandos, ordenar pasos o hacer cálculos.
  - Memoria: la fórmula es parámetros × bytes, con fuente de Hugging Face. La respuesta va como operación, con tolerancia.
  - Laya se retoma aquí como modelo local.
  - Datos con fecha ("a octubre de 2026") y "revisa la información vigente". Nunca "el mejor modelo".
- **Lector de 10 a 12 años**: en instalación y descargas, "pide permiso a un adulto antes de instalar programas".
  - Decidido por el usuario: una sola línea al inicio de la L7, la L8 y la L9, sin alarma.
- **Marcas** (decidido por el usuario): fuera de la L7 y la L8, el texto no nombra Ollama ni LM Studio.
  - Se dice "la documentación de una herramienta local" y se remite a su lección; la marca solo aparece en `fuentes`.
  - La L9 nombra una app oficial, con fecha y sin juicio.
- **Ya visto, no repetir (solo remitir)**:
  - U2: pesos ("Redes neuronales…").
  - U3: "parámetros" (va en negritas en "Qué es un modelo de lenguaje"), tokens, ventana de contexto, Laya (pesos abiertos, Apache 2.0) y alucinaciones.
  - U4: "Escribir instrucciones claras" y "Verificar lo que te responde".
  - "Parámetros", "token", "contexto" y "peso" no van en negritas aquí.
- **Remisiones a otras materias**:
  - Ofimática: "Partes de una computadora", "El sistema operativo", "Archivos y carpetas".
  - Autosuficiencia: "Qué es el software libre", "Instalar software libre con seguridad".
  - Matemáticas: "Notación científica", "Multiplicación y división", "Porcentajes".
  - Hacia adelante: U6 "Privacidad: qué no compartir", "Impacto ambiental de la IA".

## Flujo
- **Lista cerrada D1–D66**: un número = un dato = una cita. "(opcional)" se omite si no aparece; lo que falte se reporta como "no encontrado" con las URLs probadas.
- **Tres investigadores Sonnet en paralelo**. Cada uno busca la cita en la caché de `citas.js` antes de escribirla.

  | Investigador | Lecciones | Datos | Archivo | Fuentes |
  |---|---|---|---|---|
  | A | 1–4 | D1–D21 | `ficha-a.md` | F1–F19 |
  | B | 5–8 | D22–D44 | `ficha-b.md` | F20–F39 |
  | C | 9–12 | D45–D66 | `ficha-c.md` | F40+ |

- **El Director** une las tres fichas en `ficha.md`, corre `citas.js` y revisa los pares dato/cita a mano.
- **Constructor**: 12 lecciones son más de 8, así que van dos constructores en serie sobre el mismo archivo (L1–6 y luego L7–12). Luego un auditor nuevo.
- **Fuentes candidatas**:
  - Documentación de Hugging Face (`huggingface.co/docs/...`: transformers, hub, safetensors, GGUF, model cards).
  - Ollama: `ollama.com`, `docs.ollama.com` y el README y la licencia en GitHub.
  - LM Studio: `lmstudio.ai/docs`.
  - Open Source Initiative (`opensource.org`), IBM Think, Apple (soporte), Wikipedia es y arXiv.
  - Para el celular: el repositorio oficial de la app de ejemplo.
- **Bloqueadas**: OpenAI, UNESDOC, Elements of AI, towardsai, RAE, news.stanford.edu. `unesco.org` limita las peticiones.

## Lecciones

### 1. Qué es un LLM local y por qué usarlo
- **Términos**: **modelo local**, **en la nube**, **sin conexión**.
- **Idea**:
  - Normalmente tu pregunta viaja por internet a servidores de una empresa. Un modelo local corre en tu computadora o celular.
  - Ventajas: funciona sin internet una vez descargado, tus datos no salen del equipo y no hay cuota por uso.
  - Desventajas: necesitas equipo suficiente, los modelos que caben suelen ser más pequeños y tú te encargas de actualizarlos.
- **Visual**: diagrama en dos filas.
  - Pregunta → internet → servidor → respuesta.
  - Pregunta → tu equipo → respuesta.
- **Ejemplo resuelto**: 6 situaciones. Decidir cuándo conviene un modelo local y cuándo uno en la nube, y contar cada grupo.
- **Datos**:
  - D1: un modelo local se ejecuta en tu propio equipo (docs de LM Studio u Ollama, o Hugging Face).
  - D2: funciona sin conexión una vez descargado (docs de LM Studio, "offline").
  - D3: tus datos o mensajes no salen del equipo (docs de LM Studio, "offline").
  - D4 (opcional): en la nube, el modelo corre en servidores del proveedor (IBM).
  - D5: correr modelos localmente requiere hardware suficiente (docs de LM Studio u Ollama).

### 2. Modelos abiertos: qué significa que se puedan descargar
- **Términos**: **pesos abiertos**, **licencia**, **ficha del modelo** (<span lang="en">model card</span>).
- **Idea**:
  - "Pesos abiertos" quiere decir que puedes descargar el archivo con los pesos.
  - Eso no siempre equivale a "código abierto": la definición de la OSI pide más (datos, código, parámetros).
  - Cada modelo trae su licencia, que dice qué puedes hacer con él; unas son permisivas y otras tienen restricciones. Remite a "Qué es el software libre".
  - La ficha del modelo explica para qué sirve y cuáles son sus límites.
  - Ejemplo: Laya, que ya apareció en "Modelos de decisión".
- **Visual**: tabla con tres columnas: "Cerrado (solo por internet)", "Pesos abiertos" y "Código abierto según la OSI".
- **Ejemplo resuelto**: leer 3 licencias resumidas (de ejemplo) y decidir qué permite cada una (usar, modificar, usar con fines comerciales).
- **Datos**:
  - D6: definición de pesos abiertos (OSI, IBM o Hugging Face).
  - D7: la Definición de IA de Código Abierto de la OSI (2024) pide información de los datos, el código y los parámetros.
  - D8 (opcional): Hugging Face aloja una cantidad muy grande de modelos, con fecha.
  - D9: qué es una ficha de modelo, con sus usos y limitaciones (Hugging Face).
  - D10: las licencias de los modelos varían y algunas tienen restricciones de uso (Hugging Face, licencias).
  - D11: Laya tiene pesos abiertos y licencia Apache 2.0 (Hugging Face, la ficha de la U3).

### 3. Qué necesita tu equipo: memoria, procesador y tarjeta gráfica
- **Términos**: **memoria RAM**, **tarjeta gráfica** (<span lang="en">GPU</span>), **memoria de video** (<span lang="en">VRAM</span>).
- **Idea**:
  - El modelo se carga en la memoria. El procesador puede correrlo, pero la tarjeta gráfica hace en paralelo muchas cuentas a la vez y es más rápida.
  - La tarjeta gráfica tiene su propia memoria de video.
  - Algunas computadoras comparten la memoria entre el procesador y la gráfica.
  - Remite a "Partes de una computadora".
- **Visual**: diagrama: disco → RAM → procesador o tarjeta gráfica (con su VRAM).
- **Ejemplo resuelto**: 3 computadoras de ejemplo frente a una tabla de requisitos con fecha. ¿Cuál puede correr qué?
- **Datos**:
  - D12: la GPU acelera los cálculos en paralelo de la IA (IBM).
  - D13: la VRAM es la memoria propia de la tarjeta gráfica (IBM o Wikipedia es).
  - D14: la memoria unificada se comparte entre CPU y GPU (Apple, soporte o documentación).
  - D15: requisitos de sistema de LM Studio, con fecha.
  - D16: orientación de RAM según el tamaño del modelo, con fecha (README de Ollama u otra doc oficial).

### 4. Tamaño de un modelo: parámetros y cuánta memoria ocupa
- **Términos**: **byte**, **precisión** (cuántos bits usa cada número), **gigabyte**.
- **Idea**:
  - La memoria aproximada es parámetros × bytes por parámetro.
  - El "7B" del nombre quiere decir 7 mil millones de parámetros.
  - Además, el contexto ocupa memoria extra.
  - Remite a "Notación científica" y "Multiplicación y división".
- **Visual**: gráfica de barras con la memoria de un modelo de 7 mil millones de parámetros en 32, 16, 8 y 4 bits.
- **Ejemplo resuelto**: 7 mil millones × 2 bytes = 14 mil millones de bytes ≈ 14 GB. Después, a 4 bits: × 0.5 = 3.5 GB.
- **Datos**:
  - D17: X mil millones de parámetros ocupan unos 4X GB en float32 (docs de transformers de Hugging Face).
  - D18: unos 2X GB en bfloat16 o float16 (Hugging Face).
  - D19: 1 byte = 8 bits (Wikipedia es "Byte").
  - D20 (opcional): "B" en el nombre del modelo indica miles de millones de parámetros.
  - D21: la memoria extra del contexto (caché KV) crece con la longitud (Hugging Face).

### 5. Cuantización: modelos más ligeros a cambio de un poco de calidad
- **Términos**: **cuantización**, **bit**.
- **Idea**:
  - Guardar cada número con menos bits, como redondear decimales.
  - Ocupa menos memoria y suele ir más rápido, pero puede perder algo de calidad.
  - Los archivos GGUF traen tipos como Q8 o Q4.
- **Visual**: tabla con bits, bytes por parámetro y memoria para un modelo de 7 mil millones de parámetros (8B en el ejemplo, con cifras redondas).
- **Ejemplo resuelto**: comparar las versiones de 16, 8 y 4 bits de un mismo modelo: memoria y porcentaje de ahorro (remite a "Porcentajes").
- **Datos**:
  - D22: definición de cuantización: representar los pesos con menos precisión (Hugging Face).
  - D23: reduce la memoria y puede acelerar el uso (Hugging Face).
  - D24: puede reducir la precisión o calidad del modelo (Hugging Face).
  - D25: GGUF y sus tipos de cuantización, con los bits aproximados (Hugging Face Hub, GGUF).
  - D26: 4 bits equivalen a medio byte por parámetro (Hugging Face o Wikipedia).

### 6. Elegir un modelo según tu equipo y tu tarea
- **Términos**: **modelo base**, **modelo ajustado a instrucciones**, **margen de memoria**.
- **Idea**:
  - Para conversar conviene un modelo ajustado a instrucciones.
  - Debe caber en tu memoria con margen, porque el sistema operativo y el contexto también ocupan. Si no cabe, va lentísimo o no carga.
  - Un modelo más pequeño sirve para tareas simples, y hay modelos especializados (código, decisiones).
  - Laya es un modelo de decisión que se puede correr localmente.
- **Visual**: diagrama de decisión: ¿para qué lo quieres? → ¿cuánta memoria tienes? → tamaño y cuantización.
- **Ejemplo resuelto**: un equipo de ejemplo con 16 GB y tres modelos de ejemplo (2, 5 y 40 GB). Se elige dejando margen; "deja margen" es una recomendación de la lección.
- **Datos**:
  - D27: diferencia entre modelo base y modelo ajustado a instrucciones (Hugging Face o IBM).
  - D28: si el modelo no cabe en la memoria de la GPU, se reparte con la CPU y va más lento (docs de LM Studio u Ollama).
  - D29: los tamaños de archivo publicados de un modelo en sus versiones, con fecha (biblioteca de Ollama o Hugging Face).
  - D30 (opcional): existen modelos especializados, por ejemplo para código (Hugging Face).
  - D31: Laya puede ejecutarse en tus propios equipos, "on-premise" (Hugging Face).

### 7. Instalar y usar Ollama
- **Términos**: **terminal** (línea de comandos), **comando**.
- **Idea**:
  - Instalación por sistema operativo:
    - macOS y Windows: descargar el instalador.
    - Linux: un comando copiado de la documentación oficial.
  - Uso: `ollama run <modelo>` descarga y abre el chat; `ollama pull`, `ollama list` y `ollama rm`.
  - Advertencias:
    - Antes de pegar un comando que descarga y ejecuta un programa, comprueba que venga del sitio oficial (remite a "Instalar software libre con seguridad").
    - Pide permiso a un adulto.
    - La interfaz puede cambiar.
- **Visual**: tabla de comandos con las columnas "Comando" y "Qué hace".
- **Ejemplo resuelto**: leer una sesión de terminal de ejemplo y explicar cada línea, en el orden de los pasos.
- **Datos** (de la documentación oficial, citada):
  - D32: instalación en macOS y Windows desde la página de descarga oficial.
  - D33: el comando de instalación en Linux, textual.
  - D34: `ollama run` descarga el modelo si hace falta y lo ejecuta.
  - D35: `ollama pull`, `ollama list` y `ollama rm`.
  - D36 (opcional): API local en el puerto 11434.
  - D37: licencia de Ollama (GitHub).

### 8. Instalar y usar LM Studio
- **Términos**: **interfaz gráfica**, **cargar un modelo**.
- **Idea**:
  - Programa con ventanas: descargar de su sitio oficial, buscar un modelo dentro de la app, descargarlo, cargarlo y conversar.
  - Puede repartir el modelo entre la tarjeta gráfica y el procesador.
  - Los requisitos se vieron en la L3; aquí solo se remite.
  - La interfaz puede cambiar; pide permiso a un adulto.
- **Visual**: diagrama de pasos: descargar la app → buscar → descargar el modelo → cargar → conversar.
- **Ejemplo resuelto**: ordenar los pasos y decidir qué modelo cargar en un equipo de ejemplo usando la L4.
- **Datos**:
  - D38: descarga para macOS, Windows y Linux (docs de LM Studio).
  - D39: buscar y descargar modelos desde la app (docs).
  - D40: cargar un modelo y conversar (docs).
  - D41: ajuste de descarga a la GPU (<span lang="en">GPU offload</span>) (docs).
  - D42 (opcional): condiciones de uso, por ejemplo gratis para uso personal, con fecha.
  - D43 (opcional): servidor local (docs).
  - D44 (opcional): funciona sin conexión; si D2 ya lo cubre, se omite.

### 9. Correr un modelo en el celular
- **Términos**: **en el dispositivo** (<span lang="en">on-device</span>), **modelo ligero**.
- **Idea**:
  - Ya hay apps que descargan modelos pequeños y los corren en el teléfono sin conexión.
  - El celular tiene menos memoria, así que solo caben modelos ligeros.
  - Gasta batería.
  - App de ejemplo con fecha, sin juicio de calidad.
- **Visual**: tabla comparativa: celular frente a computadora (memoria de ejemplo, tamaño de modelo que cabe).
- **Ejemplo resuelto**: un celular de ejemplo con 8 GB de RAM, de los que la mitad está libre. Usando la L4 y la L5, ¿cabe un modelo de 3 mil millones de parámetros a 4 bits? ¿Y uno de 8 mil millones?
- **Datos**:
  - D45: existe una app oficial (repositorio de Google AI Edge Gallery u otra) que corre modelos en el dispositivo sin conexión, con fecha.
  - D46: requisitos de esa app (sistema y versión), con fecha.
  - D47: hay modelos diseñados para dispositivos móviles (documentación oficial del modelo).
  - D48 (opcional): consumo de batería o calor.

### 10. Descargar modelos de forma segura: fuentes y licencias
- **Términos**: **suma de verificación** (<span lang="en">hash</span>), **formato seguro** (<span lang="en">safetensors</span>), **fuente oficial**.
- **Idea**:
  - Algunos formatos antiguos pueden ejecutar código al abrirse; safetensors y GGUF no.
  - Descarga de la cuenta oficial del creador, no de copias (en la U3 vimos copias de Laya).
  - Compara la suma de verificación.
  - Lee la licencia antes de usar el modelo.
  - Remite a "Instalar software libre con seguridad" y "Modelos abiertos…".
- **Visual**: lista de verificación en diagrama: ¿cuenta oficial? → ¿formato seguro? → ¿hash coincide? → ¿licencia permite tu uso?
- **Ejemplo resuelto**: 4 descargas de ejemplo. Aplicar la lista y decidir cuáles se usan.
- **Datos**:
  - D49: los archivos pickle pueden ejecutar código arbitrario (Hugging Face, "pickle scanning").
  - D50: safetensors es un formato seguro que no ejecuta código (Hugging Face).
  - D51: Hugging Face escanea archivos en busca de malware (docs de Hugging Face).
  - D52: la suma de verificación (SHA256) comprueba que el archivo no cambió (Wikipedia es o Hugging Face).
  - D53: la ficha y la licencia del modelo indican los usos permitidos (Hugging Face).
  - D54 (opcional): cuentas de organización verificadas (Hugging Face).

### 11. Velocidad y calidad: qué esperar de un modelo local
- **Términos**: **tokens por segundo**, **ancho de banda de memoria**, **prueba de referencia** (<span lang="en">benchmark</span>).
- **Idea**:
  - La velocidad se mide en tokens por segundo y depende sobre todo de qué tan rápido se mueve la memoria. La tarjeta gráfica ayuda.
  - Los modelos más grandes suelen responder mejor, pero son más lentos y pesados.
  - Las pruebas de referencia comparan modelos, pero tu tarea es la mejor prueba.
  - Sin ranking ni "mejor modelo".
- **Visual**: gráfica de barras con los segundos para 300 tokens a 5, 20 y 60 tokens por segundo (de ejemplo).
- **Ejemplo resuelto**: 300 tokens a 20 tokens por segundo son 15 s, y a 5 tokens por segundo son 60 s. Comparar con la L4: ¿qué pasa si el modelo no cabe en la GPU?
- **Datos**:
  - D55: la velocidad se mide en tokens por segundo (docs de LM Studio, Ollama o Hugging Face).
  - D56: la generación está limitada por el ancho de banda de memoria (Hugging Face o arXiv).
  - D57: la GPU acelera la inferencia frente a la CPU (Hugging Face u Ollama).
  - D58: el rendimiento mejora al aumentar el tamaño del modelo (Kaplan et al. 2020, arXiv, leyes de escala).
  - D59 (opcional): qué es un benchmark o tabla de clasificación de modelos (Hugging Face).
  - D60 (opcional): el tiempo de carga del modelo o del primer token.

### 12. Usar un modelo local con tus propios documentos
- **Términos**: **generación aumentada por recuperación** (<span lang="en">RAG</span>), **fragmento**, **representación numérica** (<span lang="en">embedding</span>).
- **Idea**:
  - El modelo no conoce tus apuntes, y no caben todos en el contexto (remite a "Contexto y memoria").
  - Se cortan en fragmentos, se convierten en números que capturan el significado y, al preguntar, se buscan los fragmentos más parecidos y se agregan a la instrucción.
  - Si todo es local, tus documentos no salen del equipo.
  - Aun así puede equivocarse: remite a "Verificar lo que te responde" y a "Privacidad" (U6).
- **Visual**: diagrama de flujo: documentos → fragmentos → números → buscar los parecidos → instrucción + fragmentos → respuesta.
- **Ejemplo resuelto**: un documento de ejemplo de 12 000 tokens, en fragmentos de 500 tokens. ¿Cuántos fragmentos salen? Si se agregan los 3 más parecidos, ¿cuántos tokens entran en la instrucción y caben en una ventana de 4 000 tokens?
- **Datos**:
  - D61: definición de RAG (IBM).
  - D62: los documentos se dividen en fragmentos (IBM o Hugging Face).
  - D63: los embeddings representan el texto como números que capturan el significado (IBM).
  - D64: se recuperan los fragmentos relevantes y se agregan a la instrucción (IBM).
  - D65: con una herramienta local, los documentos no salen del equipo (docs de LM Studio, "chat with documents").
  - D66 (opcional): RAG reduce las alucinaciones, pero no las elimina (IBM).

## Reglas de la unidad
- **Negritas**: máximo 3 términos por lección.
- **Cifras y datos**:
  - Las cifras inventadas se dicen "de ejemplo".
  - Requisitos, tamaños y versiones llevan fecha y "revisa la información vigente".
  - Los cálculos de memoria son exactos y se resuelven con la operación.
- **Marcas**:
  - Ollama solo en la L7 y LM Studio solo en la L8, como lo pide el temario.
  - Fuera de ellas, lo que venga de su documentación se cita como "la documentación de una de estas herramientas" o se remite a su lección.
  - En la L9, una app con fecha y sin juicio. Laya va en las L2, L6 y L10.
- **Ejercicios**: sin instalación. Se leen comandos, se eligen pasos (no existe el tipo `ordenar`: se usan `opciones`) y se calcula.

## Verificación
1. `citas.js` sobre `ficha.md` da OK y se revisan los pares a mano.
2. `revisar.js` y `render.js` sobre `lecciones/ia/llms-locales.js`.
3. `antes-auditoria.js`, auditor nuevo, `diff -u`, `verificar.js` y `empaquetar.sh`. Sin commit.
