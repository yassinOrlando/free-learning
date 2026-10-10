# Plan · ia · Unidad 6: IA y sociedad

Al aprobarse, este plan se copia a `.claude/trabajo/ia/sociedad/plan.md`.

## Contexto
- **Archivo destino**: `lecciones/ia/sociedad.js`. Hay que agregar `archivo:` en la unidad 6 de `js/temario.js`.
- **Alcance**: 6 lecciones, con 6 ejercicios cada una. Los títulos son los del temario, sin cambios. Es la última unidad de la materia.
- **Reglas de `ia.md` para esta unidad**:
  - Privacidad, deepfakes, sesgos y derechos de autor: **solo fuentes oficiales** (organismos públicos, leyes, organismos internacionales).
  - Hay que decir dónde reportar: "el organismo de protección de datos o la policía cibernética de tu país".
  - Toda ley lleva país y año.
- **Tono**: ni bombo ni miedo. El lector tiene de 10 a 12 años.
- **Ya visto, no se repite (se remite)**:
  - U2 "Los datos": ruido y sesgo en los datos.
  - U3 "Qué puede y qué no puede hacer": los LLM reflejan sesgos.
  - U3 "Alucinaciones".
  - U4 "Verificar lo que te responde".
  - U4 "Usar IA para estudiar sin hacer trampa": plagio, ya en negritas.
  - U5 "Modelos abiertos…": licencia, ya en negritas.
  - U5 "Qué es un LLM local…": los datos no salen del equipo.
- **Remisiones a otras materias**:
  - Lectura: "Sesgos cognitivos", "Verificar noticias y detectar desinformación".
  - Finanzas personales: "Fraudes comunes y cómo evitarlos".
  - Ofimática: "Seguridad digital: contraseñas y fraudes en línea".
  - Finanzas y economía: "Empleo y desempleo".
  - Física: "Potencia eléctrica y cómo leer tu recibo de luz".
  - Ciencias naturales: "Cambio climático".
  - Matemáticas: "Porcentajes", "Cómo leer estadísticas en las noticias sin que te engañen".

## Flujo
- **Lista cerrada D1 a D35.** Cada número es un dato con su propia cita.
  - Lo marcado "(opcional)" se omite si no aparece.
  - Lo que falte se reporta como "no encontrado".
- **Dos investigadores Sonnet en paralelo.** Cada uno busca la cita en la caché de `citas.js` antes de escribirla.
  - A: lecciones 1 a 3 (D1 a D18), en `ficha-a.md`, fuentes F1 a F19.
  - B: lecciones 4 a 6 (D19 a D35), en `ficha-b.md`, fuentes desde F20.
- **Revisión del Director**: une las fichas, corre `citas.js` y revisa cada par dato/cita.
- **Escritura y auditoría**: un constructor (6 lecciones) y un auditor nuevo.
- **Fuentes oficiales candidatas**:
  - Ley de IA de la UE (Reglamento (UE) 2024/1689) y RGPD (Reglamento (UE) 2016/679), en EUR-Lex en español.
  - AEPD e INCIBE (España).
  - NIST (EE. UU.).
  - FTC (EE. UU., consumidores).
  - U.S. Copyright Office.
  - OMPI/WIPO (en español).
  - OIT (`ilo.org/es`).
  - AIE/IEA.
  - PNUMA/UNEP.
  - Noticias ONU.
  - IBM Think solo como apoyo en definiciones técnicas (sesgo), nunca como fuente única de un tema sensible.
- **Bloqueadas**: OpenAI, UNESDOC, Elements of AI, towardsai, RAE, news.stanford.edu, FMI y OCDE. `unesco.org` limita las peticiones: usar Noticias ONU.

## 1. Sesgos en la IA
- **Términos**: **sesgo** y **datos representativos**.
- **Idea central**:
  - La IA aprende patrones de sus datos (remite a "Los datos"). Si un grupo aparece poco, el modelo se equivoca más con ese grupo.
  - No es "maldad" del programa, pero sí puede causar trato injusto: en contratación, préstamos o reconocimiento facial.
  - Cómo se reduce: datos más variados, pruebas por grupo y supervisión humana.
  - Remite a "Sesgos cognitivos" (Lectura), que trata los sesgos de las personas.
- **Visual**: gráfica de barras con el porcentaje de error por grupo en un modelo **de ejemplo**, con cifras inventadas y dichas así.
- **Ejemplo resuelto**: tabla de ejemplo con aciertos de un modelo en dos grupos (180 de 200 frente a 30 de 50). Calcular los porcentajes y la diferencia, y explicar por qué el promedio general (210 de 250 = 84 %) esconde el problema.
- **Datos**:
  - D1: definición de sesgo en la IA (IBM o NIST).
  - D2: una causa son datos de entrenamiento que no representan a todos los grupos (IBM o NIST).
  - D3: NIST (EE. UU., 2019) encontró que los falsos positivos de reconocimiento facial variaban según el grupo demográfico.
  - D4 (opcional): una cifra de esa diferencia, según NIST.
  - D5: la Ley de IA de la UE (2024) exige, en sistemas de alto riesgo, examinar los datos para detectar posibles sesgos.
  - D6: medidas para mitigar el sesgo, como datos diversos, evaluación y supervisión humana (NIST o IBM).

## 2. Privacidad: qué no compartir
- **Términos**: **datos personales**, **datos sensibles** y **consentimiento**.
- **Idea central**:
  - Lo que escribes en un chatbot en la nube viaja a servidores de la empresa. Según sus políticas, puede guardarse, revisarse o usarse para entrenar.
  - No compartas: contraseñas, dirección, teléfono, datos de salud, fotos o datos de otras personas.
  - Alternativa: un modelo local (remite a la U5). También remite a "Seguridad digital".
  - Las leyes de protección de datos te dan derechos, por ejemplo el RGPD de la UE (2016).
  - Si algo sale mal: el organismo de protección de datos de tu país o la policía cibernética.
- **Visual**: tabla con tres columnas: "Puedes compartir", "Piénsalo dos veces" y "Nunca compartas".
- **Ejemplo resuelto**: 6 mensajes de ejemplo para un chatbot. Encontrar en cada uno el dato personal que sobra y reescribir el mensaje sin él (elegir la versión segura).
- **Datos**:
  - D7: definición de datos personales (RGPD, art. 4, UE, 2016).
  - D8: categorías especiales de datos, como salud o datos biométricos (RGPD, art. 9).
  - D9: edad de consentimiento para servicios en línea: 16 años, y los países pueden bajarla hasta 13 (RGPD, art. 8).
  - D10: la recomendación oficial de no compartir datos personales con chatbots o IA (AEPD o INCIBE, España).
  - D11: lo que escribes puede guardarse o usarse para entrenar o mejorar el servicio (AEPD, INCIBE o EDPB).
  - D12 (opcional): ante una vulneración de datos se puede reclamar a la autoridad de protección de datos (AEPD, España).

## 3. Deepfakes y contenido falso
- **Términos**: **deepfake** (en español, "ultrafalso"), **contenido sintético** y **voz clonada**.
- **Idea central**:
  - La IA puede crear imágenes, videos y voces que parecen reales.
  - Se usan para engañar: estafas con voz de un familiar (remite a "Fraudes comunes y cómo evitarlos") y noticias falsas (remite a "Verificar noticias…").
  - Detectarlos a simple vista es cada vez más difícil. Por eso se verifica la fuente, se llama de vuelta a un número conocido y la familia puede acordar una palabra clave.
  - La Ley de IA de la UE (2024) obliga a avisar cuando un contenido es un deepfake.
  - Si te pasa: la policía cibernética de tu país. Nunca compartir deepfakes de otras personas.
- **Visual**: diagrama de flujo: llamada o video urgente → ¿pide dinero o datos? → cuelga → llama a un número conocido → confirma.
- **Ejemplo resuelto**: 5 situaciones de ejemplo. Decidir cuál es la acción segura en cada una y contar cuántas eran señales de alerta.
- **Datos**:
  - D13: definición de ultrafalso (deepfake) en la Ley de IA de la UE (art. 3, 2024).
  - D14: la obligación de revelar que un contenido es un deepfake (Ley de IA, art. 50, UE, 2024).
  - D15: estafadores usan IA para clonar la voz de un familiar (FTC, EE. UU., 2023).
  - D16: recomendación de colgar y llamar a un número conocido para verificar (FTC).
  - D17: consejo oficial sobre deepfakes (INCIBE, España).
  - D18 (opcional): una línea oficial de ayuda en ciberseguridad (INCIBE 017, España).

## 4. Derechos de autor
- **Términos**: **derechos de autor**, **dominio público** y **obra**. "Licencia" y "plagio" no van en negritas: ya se presentaron antes.
- **Idea central**:
  - Las obras (textos, música, dibujos) están protegidas. Con el tiempo pasan al dominio público.
  - Los modelos se entrenan con muchísimas obras, y eso abrió debates y juicios.
  - ¿De quién es lo que crea la IA? En EE. UU. hace falta autoría humana para protegerlo.
  - La Ley de IA de la UE (2024) pide a los proveedores de modelos de uso general respetar los derechos de autor y publicar un resumen de sus datos de entrenamiento.
  - Remite a "Usar IA para estudiar sin hacer trampa" (plagio) y a "Modelos abiertos…" (licencias).
- **Visual**: tabla con las columnas "Situación", "¿Quién tiene derechos?" y "Qué hacer".
- **Ejemplo resuelto**: 4 casos de ejemplo (usar una canción en un video, un texto generado con IA, una imagen en dominio público, un dibujo de un compañero). Clasificarlos según los criterios de la lección.
- **Datos**:
  - D19: definición de derecho de autor (OMPI/WIPO, en español).
  - D20: definición de dominio público (OMPI/WIPO u oficina oficial).
  - D21: la U.S. Copyright Office exige autoría humana; el material generado solo por IA no se protege (EE. UU., 2023 o 2025).
  - D22: la Ley de IA de la UE (art. 53, 2024) obliga a los proveedores de modelos de uso general a tener una política de derechos de autor y publicar un resumen de los datos de entrenamiento.
  - D23: la OMPI reconoce que la relación entre IA y propiedad intelectual sigue en debate (OMPI).
  - D24 (opcional): existen demandas por usar obras protegidas para entrenar, según una fuente oficial o un documento judicial, con país y año.

## 5. IA y el futuro del trabajo
- **Términos**: **automatización** y **complementar** (aumentar), frente a sustituir.
- **Idea central**:
  - Según la OIT, la IA generativa tiende más a cambiar tareas dentro de un empleo que a eliminar empleos enteros.
  - Los trabajos de oficina y administrativos son los más expuestos.
  - Aprender a usar la IA con criterio y desarrollar habilidades humanas (pensar, comunicarse, crear) ayuda.
  - Sin miedo ni promesas. Remite a "Empleo y desempleo".
- **Visual**: gráfica de barras con el porcentaje de empleos expuestos por tipo de ocupación, si la ficha da cifras. Si no, una tabla de tareas que la IA complementa o automatiza (de ejemplo).
- **Ejemplo resuelto**: un empleo de ejemplo con 10 tareas. Clasificarlas en "la IA puede ayudar", "la IA podría hacerla" o "necesita a una persona", y calcular los porcentajes.
- **Datos**:
  - D25: la IA generativa tiene más probabilidad de complementar que de automatizar empleos (OIT, 2023).
  - D26: los trabajos administrativos o de oficina son los más expuestos (OIT, 2023).
  - D27 (opcional): la exposición es mayor para las mujeres en ciertos países (OIT).
  - D28: una cifra actualizada de la proporción de empleos expuestos (OIT, 2025).
  - D29 (opcional): una proyección de empleos creados y desplazados (WEF, Futuro del Empleo 2025), como estimación con fecha.
  - D30 (opcional): las habilidades más demandadas (WEF 2025 u OIT).

## 6. Impacto ambiental de la IA
- **Términos**: **centro de datos** y **consumo de energía** (el kWh se remite a Física, sin repetirlo).
- **Idea central**:
  - La IA corre en centros de datos que gastan electricidad y, a menudo, agua para enfriarse.
  - El consumo de los centros de datos crece con la IA, aunque todavía es una parte pequeña del total mundial.
  - Las cifras por consulta son estimaciones de las propias empresas.
  - La IA también puede ayudar a ahorrar energía.
  - Qué puedes hacer: usarla cuando aporte. El modelo local también gasta la energía de tu equipo.
  - Remite a "Potencia eléctrica y cómo leer tu recibo de luz" y a "Cambio climático".
- **Visual**: gráfica de barras con el consumo de los centros de datos en 2024 y la proyección a 2030 (AIE), en TWh.
- **Ejemplo resuelto**: con las cifras de la AIE (D31 y D32), calcular cuánto crece el consumo en porcentaje. Luego comparar con un hogar de ejemplo (cifra de ejemplo de kWh al año), con remisión a Física.
- **Datos**:
  - D31: los centros de datos consumieron unos 415 TWh en 2024, cerca del 1.5 % de la electricidad mundial (AIE, "Energy and AI", 2025).
  - D32: la proyección es de unos 945 TWh en 2030 (AIE, 2025).
  - D33: los centros de datos usan agua para enfriarse (PNUMA/UNEP, 2024, u otro organismo oficial).
  - D34 (opcional): la IA puede ayudar a la eficiencia energética (AIE).
  - D35 (opcional): una estimación de energía por consulta publicada por una empresa, con fecha y como "según la empresa".

## Reglas de la unidad
- **Términos**: máximo 3 en negritas por lección.
- **Leyes**: siempre con país o región y año. Las de la UE se presentan como ejemplo, con "revisa la ley de tu país".
- **Dónde reportar**: lo pide `ia.md`, en las L2 y L3.
- **Nombres propios**:
  - No se nombran chatbots ni empresas.
  - Los organismos (OIT, AIE, NIST, FTC, AEPD, INCIBE, OMPI) sí, en "según X".
  - Las demandas, si aparecen, sin juicio sobre quién tiene razón.
- **Cifras**: las inventadas se dicen "de ejemplo". Los datos que cambian llevan fecha y "revisa la información vigente".
- **Tono**: sin alarma ni culpa. Nunca pedir que el lector haga o comparta un deepfake, ni siquiera como ejercicio.

## Verificación
1. `citas.js` sobre `ficha.md` da OK y revisión manual de cada par dato/cita.
2. `revisar.js` y `render.js` sobre `lecciones/ia/sociedad.js`.
3. Copia en `antes-auditoria.js`, auditor nuevo, `diff -u`, `verificar.js` y `empaquetar.sh`. Sin commit.
