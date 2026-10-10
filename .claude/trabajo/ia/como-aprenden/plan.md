# Plan · ia · Unidad 2: Cómo aprenden las máquinas

Se copiará tal cual a `.claude/trabajo/ia/como-aprenden/plan.md` al aprobarse (más `ficha.md` y `antes-auditoria.js` después).

## Contexto
- Archivo destino: `lecciones/ia/como-aprenden.js`; hay que agregar `archivo: 'lecciones/ia/como-aprenden.js'` a la unidad 2 en `js/temario.js`. Los 4 títulos ya son los del temario; no se propone ningún cambio.
- 4 lecciones, 6 ejercicios cada una (como la U1). Reglas de materia en `.claude/docs/materias/ia.md`.
- Lector de 10 a 12 años. Ni bombo ni miedo. Términos en inglés una vez en `<span lang="en">`. Sin marcas ni "mejor modelo".
- No repetir de la U1: aprender a partir de ejemplos, ImageNet, AlexNet (2012). Remitir a "Breve historia de la IA" y a "Qué es la inteligencia artificial".
- Pendiente de decidir antes de lanzar: modelo del investigador (Haiku o Sonnet).

## Cambios al flujo (aprendido en la U1)
1. En este plan, cada lección trae la **lista cerrada de datos** (D-xx) con fuente sugerida. El investigador no añade datos ni sustituye uno por otro: si no encuentra el dato, lo reporta como "no encontrado".
2. Tras `citas.js` OK, el Director corre `grep "^- D" -A1 ficha.md` y revisa cada par dato/cita (que la cita diga lo mismo que el dato). Devuelve los que no corresponden al investigador con SendMessage, **antes** del constructor.
3. Fuentes que se sabe que funcionan: Parlamento Europeo, IBM, arXiv, Wikipedia en español. Bloqueadas: Elements of AI, UNESDOC. Candidatas nuevas por verificar con `citas.js`: Google for Developers "Machine Learning Crash Course" (en inglés), Wikipedia en español de cada tema, IBM "Think".

## 1. Los datos
- **Apertura**: para que un programa reconozca gatos hacen falta miles de fotos de gatos y de no gatos. ¿De dónde salen y qué tienen que tener?
- **Términos (3)**: **dato**/**conjunto de datos** (<span lang="en">dataset</span>), **característica** y **etiqueta**.
- **Idea central**: un modelo solo conoce lo que hay en sus datos. Cantidad, variedad y calidad importan; datos pobres o desparejos dan resultados pobres. Con etiqueta (la respuesta correcta) o sin ella. Remite hacia adelante a "Sesgos en la IA" (U6) y a "Privacidad: qué no compartir" (U6). Remite atrás a "Recolectar y organizar datos" (Matemáticas).
- **Visual**: tabla con `<th>`: 6 filas de ejemplos (característica 1, característica 2, etiqueta), p. ej. frutas por peso y color.
- **Ejemplo resuelto**: conjunto de 100 fotos con 90 de un tipo y 10 de otro; calcular porcentajes y ver por qué un modelo que siempre dice "el tipo mayoritario" acierta 90 % sin aprender nada. Cifras de ejemplo.
- **Datos cerrados**:
  - D1: definición de datos/conjunto de datos de entrenamiento y su papel (IBM o Google ML Crash Course).
  - D2: qué es una etiqueta y qué es una característica (Google ML Crash Course, en inglés).
  - D3: datos con etiqueta frente a datos sin etiqueta (IBM, "supervised learning" o Wikipedia es).
  - D4: la calidad o representatividad de los datos afecta los resultados del modelo (IBM o Google ML Crash Course).
  - D5: un conjunto desbalanceado tiene muchos más ejemplos de una clase que de otra (Google ML Crash Course, en inglés).

## 2. Aprendizaje automático
- **Apertura**: el modelo no recibe reglas, recibe ejemplos y ajusta algo hasta equivocarse menos. ¿Qué es ese "algo"?
- **Términos (3)**: **aprendizaje automático** (<span lang="en">machine learning</span>), **aprendizaje supervisado**, **aprendizaje no supervisado**. El aprendizaje por refuerzo se menciona sin negritas.
- **Idea central**: tres maneras de aprender según los datos (con etiqueta, sin etiqueta, por premio y castigo). Un modelo sencillo ajusta una recta a puntos: empieza con una recta cualquiera y la mueve para reducir el error. Remite a "Función lineal y pendiente" (Matemáticas). No repetir el aprender de ejemplos de la U1.
- **Visual**: gráfica de puntos (horas de estudio frente a calificación) con la recta inicial y la ajustada (`grafica()`), y una tabla corta con los tres tipos de aprendizaje.
- **Ejemplo resuelto**: con 4 puntos, calcular el error de una recta con pendiente 1 y de otra con pendiente 2 (restas y suma de diferencias, números enteros) y decidir cuál ajusta mejor.
- **Datos cerrados**:
  - D6: definición de aprendizaje automático como rama de la IA que aprende de datos (IBM o Wikipedia es).
  - D7: el aprendizaje supervisado usa datos etiquetados para predecir (IBM).
  - D8: el no supervisado encuentra patrones o grupos en datos sin etiquetar (IBM).
  - D9: el aprendizaje por refuerzo aprende por recompensas y castigos al interactuar (IBM o Wikipedia es).
  - D10: ejemplo real de cada tipo (p. ej. filtro de correo, agrupar clientes) en la misma fuente de D7 y D8.

## 3. Redes neuronales explicadas sin fórmulas
- **Apertura**: el cerebro tiene neuronas conectadas; las redes artificiales solo se inspiran en esa idea. No son un cerebro.
- **Términos (3)**: **red neuronal**, **capa** y **peso**.
- **Idea central**: una neurona artificial suma sus entradas multiplicadas por pesos y decide si "se activa". Muchas neuronas en capas detectan primero cosas simples y luego combinaciones. Aprender es mover los pesos. "Aprendizaje profundo" = muchas capas (sin repetir AlexNet). Remite hacia adelante a "Tamaño de un modelo: parámetros…" (U5).
- **Visual**: diagrama de red con 3 capas (entrada, oculta, salida) con cajas y flechas, y una neurona con 3 entradas y sus pesos.
- **Ejemplo resuelto**: una neurona decide "¿salgo con paraguas?" con 3 entradas 0/1 (nubes, pronóstico, viento) y pesos enteros; sumar productos y comparar con el umbral; cambiar un peso y ver cómo cambia la decisión.
- **Datos cerrados**:
  - D11: definición de red neuronal artificial inspirada en el cerebro (IBM o Wikipedia es).
  - D12: está formada por capas de nodos: entrada, ocultas y salida (IBM).
  - D13: cada conexión tiene un peso y el entrenamiento los ajusta (IBM).
  - D14: el aprendizaje profundo usa redes con muchas capas ocultas (IBM o Wikipedia es).
  - D15: no son una copia del cerebro; es una analogía/simplificación (Wikipedia es o IBM; si no se encuentra, se omite).

## 4. Entrenar y evaluar un modelo
- **Apertura**: aprobar un examen con las preguntas que ya te sabías no prueba que sepas. Con los modelos pasa igual.
- **Términos (3)**: **entrenamiento**, **conjunto de prueba** (<span lang="en">test set</span>) y **sobreajuste** (<span lang="en">overfitting</span>).
- **Idea central**: los datos se separan en entrenamiento y prueba; se mide con ejemplos que el modelo nunca vio. Si acierta mucho en entrenamiento y poco en prueba, memorizó. La exactitud (aciertos entre total) no lo cuenta todo; un modelo no es "bueno" en general, es bueno para una tarea y unos datos. Remite a "Porcentajes" y a "Probabilidad: qué tan posible es algo" (Matemáticas). Remite hacia adelante a "Alucinaciones" y "Verificar lo que te responde".
- **Visual**: diagrama de flujo: datos → separar (80 % / 20 %) → entrenar → probar → ajustar; y tabla con exactitud en entrenamiento y en prueba de dos modelos.
- **Ejemplo resuelto**: 200 ejemplos, 160 de entrenamiento y 40 de prueba; el modelo A acierta 38 de 40, el B acierta 100 % en entrenamiento y 28 de 40 en prueba; calcular porcentajes y decidir cuál generaliza mejor. Cifras de ejemplo.
- **Datos cerrados**:
  - D16: se divide el conjunto de datos en entrenamiento y prueba (Google ML Crash Course, en inglés).
  - D17: probar con datos que el modelo no vio sirve para saber si generaliza (Google ML Crash Course o IBM).
  - D18: definición de sobreajuste (IBM o Wikipedia es).
  - D19: definición de exactitud (aciertos entre predicciones totales) (Google ML Crash Course, en inglés).
  - D20: un modelo entrenado se evalúa y se vuelve a ajustar en ciclos (IBM).

## Reglas de la unidad
- Máximo 3 términos en negritas por lección; los demás, sin negritas.
- Todas las cifras de los ejemplos son inventadas y se dicen "de ejemplo".
- Nada de fórmulas con letras. Las cuentas son sumas, productos de enteros y porcentajes.
- Ejercicios sin instalación ni texto libre: opciones, ordenar, clasificar y cálculo con tolerancia.

## Verificación
1. `node .claude/herramientas/citas.js .claude/trabajo/ia/como-aprenden/ficha.md` todo OK; revisión manual de pares dato/cita.
2. `node .claude/herramientas/revisar.js lecciones/ia/como-aprenden.js` y `render.js` (gráficas).
3. `node verificar.js` y `./empaquetar.sh`; diff `antes-auditoria.js` frente al archivo final. Sin commit.
