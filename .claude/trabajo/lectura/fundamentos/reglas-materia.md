# Lectura · reglas de la materia (borrador para `.claude/docs/materias/lectura.md`)

El Director no puede editar `.claude/docs/` en esta sesión (permiso denegado). Este es el borrador, ya con lo aprendido en las seis unidades: cópialo a `.claude/docs/materias/lectura.md` y borra este archivo.

6 unidades, 28 lecciones (títulos en `js/temario.js`). Archivos: `lecciones/lectura/<unidad>.js`. Con la unidad 6 la materia queda completa.

## Reglas propias
- Lector de 10 a 12 años. La materia enseña a leer y a escribir con claridad, no a descifrar letras.
- Cada lección explica primero para qué sirve en la vida real, con lo que ya vive el lector. Nada de leer "por leer".
- Los términos técnicos de lectura (idea principal, inferencia, tesis, falacia, sesgo, mapa conceptual, estructura, tilde, esdrújula, punto y coma) se definen con palabras de todos los días y, la primera vez, con el término en inglés en `<span lang="en">`.
- Muestras de texto: los pasajes de ejemplo van en `<div class="nota texto-muestra">` con `<p>` dentro y una frase delante que diga qué hace el texto. La clase `texto-muestra` (filete de acento y serif) está pendiente de añadirse a `estilos.css`; hasta entonces, `nota` ya las deja legibles. Los textos inventados se marcan como inventados.
- La clasificación de tipos de texto del temario es de cuatro (narrativo, expositivo, argumentativo, instructivo) y la de géneros literarios es otra (novela, cuento, poesía, drama): son dos ejes distintos y hay que decirlo. La clasificación clásica en español de estructuras textuales tiene cinco, con el descriptivo: se enseña la nota de un tipo más y no se introduce el quinto como tipo propio.
- Límite del proyecto: máximo 3 `<strong>` por lección en la explicación. Cuando una lección tenga un conjunto de cuatro o más elementos que hay que memorizar (los tipos de texto, los cuatro elementos de la narración), van en la tabla como `<th scope="row">`: se ven en negrita sin contar como término nuevo.
- Datos de sondeos, informes y normas: con su país y su año. El CBC de Argentina se cita siempre como "(Argentina, documento sin fecha de publicación)": su PDF no trae fecha de publicación. Las cifras de los ejemplos son de ejemplo y se dicen, también dentro de los enunciados de los ejercicios.
- Fuentes: Wikipedia en español solo como apoyo, con "(apoyo)" en el nombre y sin marcador de país (no es de ningún país). Nunca puede ser la única fuente de una definición. Fuente principal: un documento oficial de un currículo de lectura (CBC de Argentina), un organismo (National Literacy Trust, ALA, BookTrust, Indecopi, SIC, AEMPS, EMA, UNESCO, Reuters Institute, Noticias ONU, Fundación del Español Urgente, Instituto Cervantes, MINAM de Perú) o el texto de una obra de dominio público (Wikisource).
- La RAE no se puede citar (rae.es y dle.rae.es devuelven 403). Para tildes y puntuación: Wikipedia, que a su vez cita a la RAE, más Fundéu o un Ministerio de Educación. Si una regla no tiene respaldo en la ficha, no se afirma, y se dice que lo mejor es consultar un diccionario.
- Solo obras y poemas de dominio público, con su fuente y su fecha. Nada de autores, obras o ediciones actuales.
- Sin marcas, sin empresas, sin emojis, sin signos de exclamación. En la unidad de literatura se pueden citar obras y autores clásicos (son obras, no marcas).
- Ejercicios: 6 por lección, de tipo `numero`, `opciones`, `texto` y `ordenar`. Cuando la respuesta sea una definición, `texto` acepta varias formas (el término, el término con artículo, la definición entera), porque el lector puede escribir cualquiera de las dos. `correcta:` repartido, nunca todo en 0. Nada de texto libre que no se pueda corregir automáticamente: en las unidades de escritura se pregunta solo con `opciones` y `ordenar`.
- Tono: no se juzga a quien se equivoca. El error va en la nota de "Error común", nunca en un reproche. Temas sensibles (contratos, datos legales, salud): sin consejo personalizado, con país y año, y diciendo dónde reclamar.
- No repetir datos entre lecciones: si un dato ya se usó, se remite ("como viste en "Por qué leer"").
- Cada unidad da por sabidas las anteriores, y lo dice al abrir. Ninguna unidad adelanta contenido de la siguiente.

## Remisiones entre unidades (las que ya existen)
- U1 → U2: el propósito y la secuencia de un texto (U1) son el material de la U2.
- U2 → U3: la idea principal y la inferencia (U2) son el material de la U3.
- U3 → U4: la verificación de fuentes (U3) es el criterio de la U4.
- U4 → U5: leer deprisa (U4) no sirve con un poema (U5).
- U5 → U6: el subtexto y el narrador (U5) son la escritura (U6).
- U2 → U6: "Hacer un resumen" (extraer) frente a "Escribir un resumen" (escribir).
- U3 → U6: "Cómo se construye un argumento" (desmontar) frente a "Escribir un ensayo argumentativo" (construir); y "Falacias comunes" como regla de lo que no hay que hacer al escribir.

## Remisiones a otras materias (no repetir)
- Matemáticas: "Cómo leer estadísticas en las noticias sin que te engañen" (las trampas de los números; la U4 enseña la anatomía del gráfico).
- Finanzas personales: "Cómo leer tu recibo de sueldo" (leer a tiempo un documento).
- Ciencias naturales: "Cómo leer una etiqueta nutricional".
- Inteligencia artificial: "Deepfakes y contenido falso".
- Inglés: "Entender noticias y podcasts".

## Bloqueadas comprobadas en 2026 (no perder tiempo)
bne.es, rae.es, dle.rae.es y dpanh.rae.es (403), cervantes.es (500), cv.cervantes.es (no resuelve), readingrockets.org, ies.ed.gov (mantenimiento), britannica.com, oecd.org, inep.gob.pe, curriculum.educ.cl, Khan Academy en español, educ.ar (inestable: alterna 200 y 000), cpsc.gov, iso.org, cec.consumo.gob.es (404), consumo.gob.es y dsca.gob.es (ECONNRESET), sic.gov.co (certificado no válido para el verificador), cima.aemps.es (404), research.rug.nl (403 en búsqueda), biblio.ugent.be (timeout), eur-lex.europa.eu (200 vacío), memoriachilena.gob.cl, unam.mx, poetryfoundation.org, circulodebellasartes.com, bibliotecanacionaldigital.gob.mx, wikipedia.org/obra/... y /buscador/ del portal de Cervantes Virtual (Cloudflare).

## Dudas abiertas
- "Esaneo" no es español estándar: para la L4 de la unidad 4 se acceptability "lectura diagonal" como alternativa; si se cambia, hay que cambiarla en el texto y en las respuestas del ejercicio.
- El "PDF del Instituto Cervantes 500 dudas" solo baja desde el espejo `files.sld.cu` porque cervantes.es devuelve 500: en `fuentes` conviene nombrar la fuente como el Instituto Cervantes y dejar claro el espejo.
- En el portal de La Celestina de la Biblioteca Virtual Miguel de Cervantes los acentos vienen como entidades (`&oacute;`) y `citas.js` no los decodifica: ahí solo valen citas sin acentos.
