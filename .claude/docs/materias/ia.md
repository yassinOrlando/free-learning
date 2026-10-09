# Materia: Inteligencia artificial (`ia`)

6 unidades, 36 lecciones (títulos en `js/temario.js`). Archivos: `lecciones/ia/<unidad>.js`.

## Reglas propias
- Lector de 10 a 12 años sin conocimientos técnicos. Ni bombo ni miedo: la IA es una herramienta útil que se equivoca. Explica lo técnico con comparaciones cotidianas (el autocompletado del celular para "predecir la siguiente palabra").
- Términos en inglés: usa el término en español y presenta una vez el original en `<span lang="en">` (instrucción, <span lang="en">prompt</span>; token; aprendizaje automático, <span lang="en">machine learning</span>).
- Datos que cambian rápido (modelos, tamaños, precios, requisitos, versiones, leyes): siempre con fecha ("a octubre de 2026") y "revisa la información vigente". No afirmes cuál es "el mejor modelo".
- Marcas: Ollama y LM Studio solo en sus lecciones (el temario lo pide). Fuera de ellas no recomiendes productos ni empresas; nombres de modelos o servicios solo como ejemplo, con fecha y sin juicio de calidad.
- Lecciones de instalación (unidad 5): pasos y comandos copiados de la documentación oficial vigente y citados; indica el sistema (Windows, macOS, Linux); advierte que la interfaz puede cambiar. Los ejercicios no pueden depender de tener nada instalado: lectura de comandos, orden de pasos o cálculos.
- Memoria y cuantización: la fórmula (parámetros × bytes por parámetro) sale de una fuente (p. ej. documentación de Hugging Face). Respuestas como la operación, con tolerancia.
- Privacidad, deepfakes, sesgos y derechos de autor: solo fuentes oficiales; di dónde reportar ("el organismo de protección de datos o la policía cibernética de tu país"). Leyes con país y año.
- "Usar IA para estudiar sin hacer trampa": sin sermón ni culpa; criterios claros entre el uso que ayuda a aprender y el que lo reemplaza.
- Ejercicios de "escribir instrucciones": no se puede validar texto libre; usa `opciones` (elige la mejor instrucción) u ordenar pasos.

## Remisiones a otras materias (no repetir)
- Matemáticas, "Estadística y probabilidad": "Recolectar y organizar datos", "Media, mediana y moda", "Probabilidad: qué tan posible es algo", "Cómo leer estadísticas en las noticias sin que te engañen".
- Matemáticas: "Función lineal y pendiente" (un modelo que ajusta una recta), "Porcentajes".
- Autosuficiencia, "Software libre": "Qué es el software libre", "Linux: un sistema operativo libre", "Instalar software libre con seguridad" (licencias y descargas seguras en la unidad 5).
- Finanzas personales, "Bancos y seguridad": "Fraudes comunes y cómo evitarlos" (deepfakes, voz clonada).
- Física: "Electricidad y magnetismo", "Trabajo y energía" (watts, kWh, impacto ambiental).

## Fuentes candidatas (por verificar)
UNESCO (guía de IA generativa en educación), Elements of AI (Universidad de Helsinki, tiene español), NIST (en inglés), Comisión Europea / EUR-Lex (Ley de IA), AEPD e INCIBE (España: privacidad, deepfakes), OMPI/WIPO (derechos de autor), OIT (trabajo), Agencia Internacional de la Energía (centros de datos), documentación de Hugging Face (modelos abiertos, cuantización, licencias), documentación oficial de Ollama y LM Studio, artículos originales en arXiv como apoyo.

## Modelos de decisión (Jev, Laya) · lección final de la U3
- Clase de modelo: en vez de escribir texto, elige entre opciones dadas (elección, puntuación, sí/no) y devuelve probabilidades y confianza; su salida la usan otros programas. TypeSafe AI los llama "modelos de Sistema Uno".
- Jev (TypeSafe AI, propietario, acceso anticipado desde el 15 de septiembre de 2026) es el ejemplo, con fecha. Laya es una alternativa abierta; se retoma en la U5 como modelo local.
- Las cifras de velocidad y costo son afirmaciones de la empresa ("según TypeSafe…", con sus propias pruebas), nunca hechos.
- Fuentes: Wikipedia "Jev (modelo de IA)" (artículo de septiembre de 2026, con una sola referencia: contrástalo) y, si pasan `citas.js`, el sitio oficial de TypeSafe y el repositorio y la licencia de Laya. Los blogs no valen como fuente única.
