# Fuentes

Lo leen el investigador (para buscar) y el auditor (para dudas).

## Fuentes de contenido
Usar solo recursos fiables y de acceso gratuito, y citarlos en cada lección. Ejemplos:
- Khan Academy (español)
- OpenStax
- CK-12
- PhET (simulaciones de física y química, Universidad de Colorado)
- Wikipedia (solo como apoyo, contrastada con otra fuente)
- Sitios oficiales de educación financiera de bancos centrales y organismos públicos

Se aceptan fuentes en otro idioma (sobre todo inglés) siempre que la fuente y la información sean fiables y de calidad: organismos oficiales, universidades públicas, servicios de extensión agrícola. Se traducen y se redactan con palabras propias, y en `fuentes` el nombre lleva "(en inglés)" para que el lector sepa en qué idioma está. Si existe una versión oficial en español, se prefiere esa.

No copiar texto literal: redactar con palabras propias y respetar las licencias (muchas son CC BY, que exige atribución).

Preferir organismos oficiales y universidades públicas; documentación oficial del proyecto para temas técnicos. Wikipedia nunca es la única fuente de una cifra.

## Cómo verificar una fuente
- Toda URL debe responder 200 **y** tener el `<title>` esperado: hay 404 "suaves" que responden 200 (Wikipedia, FAO).
- `curl -sL --max-time 25 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36" URL`
- PDF (no hay `pdftotext`): `osascript -l JavaScript -e 'ObjC.import("PDFKit"); function run(a){return $.PDFDocument.alloc.initWithURL($.NSURL.fileURLWithPath(a[0])).string.js}' archivo.pdf`
- Cada cifra se confirma en el texto de la fuente, no en el resumen de un buscador. Si las versiones en inglés y español dicen distinto, cita la que enlazas.
- `node .claude/herramientas/citas.js ficha.md` comprueba todo esto de forma automática.

## Bloqueadas (403, desafío de Cloudflare o captcha): no usar
OCDE, FMI, CNMV, CFPB, BLS, Banxico, Banrep (captcha), FAO (salvo la portada), CDC, Texas A&M AgriLife, Extensión de la Universidad de Minnesota, gob.mx/ipab y varias páginas de gob.mx. UNESDOC (`unesdoc.unesco.org`). Elements of AI (`course.elementsofai.com`) responde 200 pero se dibuja con JavaScript: su HTML no trae texto y no se puede verificar. OpenAI (`help.openai.com`, `platform.openai.com`), `pub.towardsai.net`, RAE (`dle.rae.es`, Cloudflare) y `news.stanford.edu` (Cloudflare). `unesco.org` corta la conexión tras varias peticiones seguidas: para notas de UNESCO usa Noticias ONU (`news.un.org/es`). EUR-Lex devuelve un cascarón vacío o un desafío: para leyes de la UE usa el DOUE en el BOE (`boe.es/buscar/doc.php?id=DOUE-L-...` o `boe.es/doue/...pdf`). INCIBE y osi.es rechazan a `citas.js` ("Request Rejected"). WEF (`weforum.org`), `epale.ec.europa.eu` y `unep.org/es` dan 403 (UNEP en inglés funciona). En IBM Think, un tema que no existe responde 200 con el título genérico "Think Topics" (404 suave). Mandarín: `firstyearchinese.lrc.columbia.edu` (403, validación anti-robot), `iso.org` y `open.edu/openlearn` (Cloudflare), `dragon-char.sourceforge.net` (Cloudflare), `tone.lib.msu.edu` (Tone Perfect, 403; licencia sin verificar: no usar sus audios). El PDF del Esquema de pinyin en `moe.gov.cn` es una imagen sin texto: usa la transcripción de Wikisource. `human.libretexts.org/Workbench/...` pide iniciar sesión (responde 200 con título «Sign in»). El «Introductory Chinese Grammar» de LibreTexts es de Chinese Grammar Wiki (AllSet Learning), no de una universidad: no usar como fuente universitaria. Agrega aquí los nuevos que encuentres.

## Funcionan bien (comprobadas en 2026)
- Finanzas: Revista CONDUSEF (`revista.condusef.gob.mx`), Finanzas para todos (Banco de España y CNMV), Portal del Cliente Bancario (Banco de España), BCE, SERNAC, BCRA, FGD, Superintendencia Financiera de Colombia, CMF Chile, argentina.gob.ar, Agencia Tributaria, SEC Investor.gov, Federal Reserve History, NBER, World Bank Findex, extensiones de Illinois, Wisconsin y NDSU.
- Salud y emergencias: MedlinePlus en español, OMS (`who.int/es`; el título no viene en el HTML, revisa el texto), ready.gov/es, OPS (PDF).
- IA: Parlamento Europeo, IBM Think (`ibm.com/think/topics/...`), arXiv, Wikipedia, Google ML Crash Course y `ai.google.dev` (pide `?hl=en` para inglés), Hugging Face (`huggingface.co/learn` y `/docs`), documentación de Anthropic (`docs.anthropic.com`, redirige a `platform.claude.com`), docs de Ollama (`docs.ollama.com`, `ollama.com`) y LM Studio (`lmstudio.ai/docs`), OSI (`opensource.org`), Apple Newsroom. En GitHub, `github.com/.../blob/...` responde 429 tras varias peticiones: usa `raw.githubusercontent.com`.
- IA y sociedad: AEPD (`aepd.es`), NIST, FTC (`consumer.ftc.gov`; curl recibe 404 falso, pero `citas.js` funciona), OMPI (`wipo.int/es`), U.S. Copyright Office, OIT (`ilo.org/es`), AIE (`iea.org`), UNEP en inglés.
- Educación: Noticias ONU (`news.un.org/es`), INTEF (PDF en `intef.es`), The Stanford Daily (`stanforddaily.com`).
- Mandarín (fonética, trazos, radicales): PolyU BEPTH (`polyu.edu.hk/bepth`), MIT OpenCourseWare (PDF), Princeton (`commons.princeton.edu/chinesecharacters`), UCSD, UC Berkeley, CUHK, Universidad de Iowa (Pressbooks), ERAU (`eaglepubs.erau.edu`), LibreTexts, Ministerio de Educación de Taiwán (`stroke-order.learningweb.moe.edu.tw`), `gov.cn`, `edu.sh.gov.cn`, Wikisource en chino, Wikcionario en inglés (número de trazos), CVC Cervantes (anuario). Grabaciones: Wikimedia Commons, archivos `Zh-<sílaba>.ogg` del Proyecto Shtooka (licencia por archivo; la API limita peticiones rápidas: pon User-Agent propio y pausas).
- Mandarín (gramática y uso): ChinGram de la Universidad Palacký (`chingram.upol.cz/grammar/...`), CHN101 de Kapiolani Community College en LibreTexts (`human.libretexts.org/Courses/Kapiolani_Community_College/...`), Chinese 101 de Western Kentucky University (`people.wku.edu/shizhen.gao/Chinese101`; su `<title>` es «Untitled Document»), MIT OCW (PDF del curso de Wheatley, `res21g_003_s_11.pdf`). Algunas páginas de LibreTexts traen entidades HTML sin decodificar en el pinyin (`&igrave;`): la cita se copia así, pero el pinyin de la lección sale del sílabo. Wikimedia (`upload.wikimedia.org` y la API de Commons) responde 429 tras unas decenas de peticiones seguidas: pausa de 4 s entre descargas.
- Mandarín (unidad 3): más páginas de ChinGram (`chingram.upol.cz/grammar/dates-and-times`, `measure-words-nouns`, 几 y 多少, 有, 想 y 要, dinero), Kapiolani CC CHN101 y CHN102 en LibreTexts, y Elementary Chinese I de Michigan State University (`openbooks.lib.msu.edu/chs101`, CC BY-NC: se cita, no se copia). En Commons, algunos archivos de Shtooka son `.oga`. Lingua Libre: mirar la página del usuario en Commons (`User:<nombre>?action=raw`) para saber su lengua materna; Luilui6666 es de lengua materna cantonesa (no usar), CanonNi declara chino nativo.
- Mandarín (unidad 4): ChinGram cubre 了 (las dos), 在 progresivo, 会/能/可以, 一下, palabras de posición, 有 existencial y 第; MSU Elementary Chinese I y II para vocabulario de escuela y posiciones. Ojo: los ejemplos de estas páginas usan palabras de niveles superiores y ChinGram etiqueta los niveles con el HSK antiguo; el nivel de cada palabra se decide con el sílabo de 2025. En el sílabo, las líneas del 任务大纲 traen un carácter de viñeta de uso privado que estorba al citar: para temas usa el 话题大纲.
- Mandarín: sílabo oficial «HSK 考试大纲» (CLEC, 2025-11), PDF de 406 páginas en `hsk.cn-bj.ufileos.com/3.0/` (URL con caracteres chinos: pásala codificada con `%`; el texto sale con PDFKit, quita las líneas de marca de agua «汉考国际»).
- Agua y campo: espanol.epa.gov, epa.gov, sodis.ch, twdb.texas.gov, extension.colostate.edu, un.org/es.

## Ficha de hechos (`.claude/trabajo/<materia>/<unidad>/ficha.md`)
La escribe el investigador; el constructor solo usa lo que está aquí; el auditor contrasta contra ella. Formato exacto (lo lee `citas.js`):

```
# Ficha: <materia> · Unidad N: <título de la unidad>

## F1 · <nombre corto>
- url: https://...
- nombre: <texto listo para fuentes, p. ej. "CONDUSEF (México), Revista Proteja su Dinero: Título">
- idioma: es
- año: 2025
- lecciones: Título exacto 1; Título exacto 2

- D1: <el dato con palabras propias, con país y año>
  > cita textual copiada de la página, de 8 a 40 palabras
- D2: ...
```
Una cita por dato, copiada tal cual (sin corregir ortografía ni traducir). Para fuentes en inglés, la cita va en inglés y el dato en español.
