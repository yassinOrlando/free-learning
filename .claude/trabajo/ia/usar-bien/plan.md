# Plan · ia · Unidad 4: Usar la IA bien

Al aprobarse, este plan se copia a `.claude/trabajo/ia/usar-bien/plan.md`.

## Contexto
- Archivo destino: `lecciones/ia/usar-bien.js`. En `js/temario.js`, añadir `archivo: 'lecciones/ia/usar-bien.js'` a la unidad 4.
- 4 lecciones, 6 ejercicios cada una. Los títulos son los del temario, sin cambios.
- Reglas de `ia.md` que aplican:
  - Ejercicios de "escribir instrucciones": `opciones` (elegir la mejor instrucción) u `ordenar`, nunca texto libre.
  - "Estudiar sin hacer trampa": sin sermón ni culpa, con criterios claros.
  - Sin marcas ni "mejor modelo".
- Ya visto, no se repite (se remite):
  - U3 "Contexto y memoria": ventana de contexto. "Contexto" ya va en negritas allí: aquí sin negritas.
  - U3 "Alucinaciones": qué son y por qué pasan, el caso Mata contra Avianca. "Verificar" ya va en negritas allí.
  - U3 "Qué puede y qué no puede hacer": fecha de corte, herramientas.
  - U3 "Modelos de decisión": salida estructurada.
- "Instrucción" (<span lang="en">prompt</span>) se presenta por primera vez aquí: no aparece en U1 a U3.
- Remisiones a otras materias:
  - Lectura: "Verificar noticias y detectar desinformación", "Hechos y opiniones", "Hacer un resumen".
  - Hacia adelante: U6 "Privacidad: qué no compartir".

## Flujo (lo aprendido en U1 a U3)
- Lista **cerrada** D1–D23. Cada número es un dato con su propia cita. Si un dato no aparece, se reporta "no encontrado" con las URLs probadas. Los marcados "(opcional)" se omiten si no aparecen.
- **Dos investigadores Sonnet en paralelo**:
  - A: lecciones 1-2 (D1–D12) → `ficha-a.md`, fuentes F1–F19.
  - B: lecciones 3-4 (D13–D23) → `ficha-b.md`, fuentes desde F20.
  - El Director las une en `ficha.md`.
- Antes de escribir cada cita, buscarla en la caché de `citas.js` (`$TMPDIR/citas-cache/<sha1 url>.json`, campo `texto`).
- El Director revisa cada par dato/cita (`grep "^- D" -A1`). Le pasa al constructor y al auditor la nota de los datos que solo se respaldan en parte.
- Fuentes que funcionan en IA: IBM Think, Google `ai.google.dev` (`citas.js` pide español: si existe, usarlo), Hugging Face, docs de Anthropic, Wikipedia, arXiv y Parlamento Europeo.
- Candidatas nuevas:
  - UNESCO (`unesco.org/es`, no UNESDOC).
  - Stanford "Civic Online Reasoning" (`cor.stanford.edu`).
  - INTEF (España).
  - RAE (`dle.rae.es`).
- Bloqueadas: OpenAI, UNESDOC, Elements of AI, towardsai.

## 1. Escribir instrucciones claras
- **Apertura**: "Háblame de volcanes" da una respuesta larga y genérica. "Explícame en 5 líneas, para sexto grado, por qué hacen erupción" da lo que necesitas.
- **Términos**: **instrucción** (<span lang="en">prompt</span>), **tarea** y **formato**.
- **Idea central**:
  - Una buena instrucción dice qué quieres, para qué o para quién, y cómo lo quieres (extensión, formato).
  - Las tareas grandes se dividen en pasos.
  - Se dice lo que sí quieres, no solo lo que no.
  - Si no sale bien, se ajusta y se vuelve a probar.
  - La IA sigue pudiendo equivocarse: remite a "Verificar lo que te responde".
- **Visual**: tabla con `<th>` en tres columnas: "Instrucción vaga", "Qué le falta" e "Instrucción clara". Cuatro filas.
- **Ejemplo resuelto**: mejorar "háblame de volcanes" en 4 pasos (tarea, público, extensión, formato) y contar cuántas piezas tiene cada versión.
- **Datos**:
  - D1: definición de instrucción o <span lang="en">prompt</span> (IBM "prompt engineering" o Google).
  - D2: las instrucciones claras y específicas dan mejores respuestas (Google "estrategias de diseño de instrucciones" o Anthropic "be clear and direct").
  - D3: conviene indicar el formato o la extensión de la respuesta (Google).
  - D4: dividir una tarea compleja en partes más simples (Google o Anthropic).
  - D5: es mejor decir qué hacer que solo qué no hacer (Google o Anthropic) (opcional).
  - D6: diseñar instrucciones es un proceso de prueba y ajuste (Google o IBM).

## 2. Dar contexto y ejemplos
- **Apertura**: el modelo solo sabe lo que le das en la conversación (remite a "Contexto y memoria"). Si no le dices para qué es, adivina.
- **Términos**: **ejemplo** (instrucción con pocos ejemplos, <span lang="en">few-shot</span>), **rol** y **público**.
- **Idea central**:
  - Dar contexto útil: para quién es, qué nivel tiene, para qué se usará y los datos que hacen falta.
  - Los ejemplos muestran el formato y el tono mejor que una descripción.
  - Asignar un rol ("actúa como un profesor de ciencias") orienta el estilo.
  - No meter datos personales ni privados (remite a "Privacidad: qué no compartir", U6).
- **Visual**: diagrama de flujo: instrucción + contexto + ejemplos → modelo → respuesta con el formato pedido.
- **Ejemplo resuelto**: pedir tarjetas de vocabulario. Comparar la versión sin ejemplos y la versión con 2 ejemplos, identificar las 4 piezas (tarea, contexto, ejemplos, formato) y elegir cuál dará el formato esperado.
- **Datos**:
  - D7: dar contexto o información relevante mejora la respuesta (Google o Anthropic).
  - D8: definición de instrucción con pocos ejemplos (<span lang="en">few-shot</span>): se incluyen ejemplos en la instrucción (IBM o Google).
  - D9: los ejemplos ayudan al modelo a seguir un formato o patrón (Google).
  - D10: sin ejemplos (<span lang="en">zero-shot</span>) frente a con ejemplos (IBM).
  - D11: dar un rol o personaje al modelo orienta sus respuestas (Google o Anthropic).
  - D12: mostrar patrones que seguir en lugar de los que hay que evitar (Google) (opcional).

## 3. Verificar lo que te responde
- **Apertura**: la respuesta suena segura y trae un enlace. ¿Basta? (remite a "Alucinaciones").
- **Términos**: **afirmación comprobable**, **lectura lateral** y **fuente fiable**.
- **Idea central**: un método corto.
  1. Separa las afirmaciones que se pueden comprobar (cifras, fechas, nombres, citas).
  2. Búscalas fuera del chat, en dos fuentes fiables e independientes. Esto es lectura lateral: abrir otras pestañas para averiguar quién respalda algo.
  3. Comprueba que los enlaces y las fuentes citadas existan y digan eso.
  4. Si no lo encuentras, no lo uses.
  - Lo que importa (salud, dinero, tareas) siempre se verifica.
  - Remite a "Verificar noticias y detectar desinformación" y "Hechos y opiniones" (Lectura).
- **Visual**: diagrama de flujo de 4 pasos con una salida "no lo uses".
- **Ejemplo resuelto**: una respuesta con 4 afirmaciones y una tabla de lo que dicen dos fuentes (cifras de ejemplo). Decidir cuáles se usan, cuáles se corrigen y cuáles se descartan, y calcular el porcentaje confirmado.
- **Datos**:
  - D13: definición de lectura lateral (Stanford COR o Wikipedia).
  - D14: los verificadores profesionales leen lateralmente y por eso evalúan mejor (Stanford, Wineburg y McGrew; país y año).
  - D15: la IA puede inventar referencias o fuentes que no existen (IBM o arXiv).
  - D16: revisar y contrastar lo que produce la IA, con supervisión humana (IBM, UNESCO o Parlamento Europeo).
  - D17: recomendación de usar fuentes oficiales o fiables para comprobar (organismo oficial) (opcional).

## 4. Usar IA para estudiar sin hacer trampa
- **Apertura**: tienes tarea de historia. Una opción es pedirle a la IA que la escriba. Otra es pedirle que te haga preguntas hasta que la entiendas. ¿Cuál te deja algo?
- **Términos**: **plagio**, **práctica de recuperación** (tratar de recordar sin mirar) e **integridad académica**.
- **Idea central**: un criterio claro, sin culpa.
  - Ayuda a aprender cuando te hace pensar: explicar de otra forma, hacerte preguntas, revisar tu borrador mientras tú corriges, o darte ejercicios.
  - Te reemplaza cuando hace el trabajo por ti y lo entregas como tuyo.
  - Prueba rápida: ¿podrías explicarlo sin la IA?
  - Sigue las reglas de tu escuela y di cuándo usaste IA.
  - Por edad: UNESCO propone 13 años como mínimo para usar estas herramientas en clase. Usarlas con un adulto o docente.
- **Visual**: tabla con dos columnas, "Te ayuda a aprender" y "Hace el trabajo por ti", con 5 filas.
- **Ejemplo resuelto**: clasificar 6 usos en "ayuda", "depende de las reglas" y "reemplaza", con la razón de cada uno. Al final se cuenta cuántos hay en cada grupo.
- **Datos**:
  - D18: UNESCO recomienda una edad mínima de 13 años para usar IA generativa en el aula (UNESCO, 2023).
  - D19: menos del 10 % de escuelas y universidades tenían orientación formal sobre IA generativa (UNESCO, encuesta de 2023).
  - D20: definición de plagio o plagiar (RAE o Wikipedia es).
  - D21: la práctica de recuperación (efecto de prueba) mejora la memoria a largo plazo (Wikipedia es "Efecto de prueba" u otra fuente fiable).
  - D22: la IA en educación debe apoyar y no reemplazar el pensamiento o la agencia del estudiante (UNESCO o INTEF).
  - D23: la recomendación de declarar o reconocer el uso de IA en los trabajos (UNESCO, INTEF o una universidad pública) (opcional).

## Reglas de la unidad
- Máximo 3 términos en negritas por lección. "Contexto" y "verificar" no van en negritas (ya se presentaron en U3).
- Las instrucciones de ejemplo son genéricas y no nombran ningún chatbot. Las cifras son de ejemplo y así se dicen.
- Ejercicios: `opciones`, `ordenar`, clasificar y cálculo exacto. Sin texto libre.
- La L4 no culpa ni da sermón: criterios, prueba rápida y reglas de la escuela.

## Verificación
1. `citas.js` sobre `ficha.md` da OK, y el Director revisa los pares dato/cita a mano.
2. `revisar.js` y `render.js` sobre `lecciones/ia/usar-bien.js`.
3. Copiar el archivo como `antes-auditoria.js`, lanzar un auditor nuevo, revisar el `diff -u` y correr `verificar.js` y `empaquetar.sh`. Sin commit.
