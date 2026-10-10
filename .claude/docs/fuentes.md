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
OCDE, FMI, CNMV, CFPB, BLS, Banxico, Banrep (captcha), FAO (salvo la portada), CDC, Texas A&M AgriLife, Extensión de la Universidad de Minnesota, gob.mx/ipab y varias páginas de gob.mx. UNESDOC (`unesdoc.unesco.org`). Elements of AI (`course.elementsofai.com`) responde 200 pero se dibuja con JavaScript: su HTML no trae texto y no se puede verificar. OpenAI (`help.openai.com`, `platform.openai.com`), `pub.towardsai.net`, RAE (`dle.rae.es`, Cloudflare) y `news.stanford.edu` (Cloudflare). `unesco.org` corta la conexión tras varias peticiones seguidas: para notas de UNESCO usa Noticias ONU (`news.un.org/es`). EUR-Lex devuelve un cascarón vacío o un desafío: para leyes de la UE usa el DOUE en el BOE (`boe.es/buscar/doc.php?id=DOUE-L-...` o `boe.es/doue/...pdf`). INCIBE y osi.es rechazan a `citas.js` ("Request Rejected"). WEF (`weforum.org`), `epale.ec.europa.eu` y `unep.org/es` dan 403 (UNEP en inglés funciona). En IBM Think, un tema que no existe responde 200 con el título genérico "Think Topics" (404 suave). Agrega aquí los nuevos que encuentres.

## Funcionan bien (comprobadas en 2026)
- Finanzas: Revista CONDUSEF (`revista.condusef.gob.mx`), Finanzas para todos (Banco de España y CNMV), Portal del Cliente Bancario (Banco de España), BCE, SERNAC, BCRA, FGD, Superintendencia Financiera de Colombia, CMF Chile, argentina.gob.ar, Agencia Tributaria, SEC Investor.gov, Federal Reserve History, NBER, World Bank Findex, extensiones de Illinois, Wisconsin y NDSU.
- Salud y emergencias: MedlinePlus en español, OMS (`who.int/es`; el título no viene en el HTML, revisa el texto), ready.gov/es, OPS (PDF).
- IA: Parlamento Europeo, IBM Think (`ibm.com/think/topics/...`), arXiv, Wikipedia, Google ML Crash Course y `ai.google.dev` (pide `?hl=en` para inglés), Hugging Face (`huggingface.co/learn` y `/docs`), documentación de Anthropic (`docs.anthropic.com`, redirige a `platform.claude.com`), docs de Ollama (`docs.ollama.com`, `ollama.com`) y LM Studio (`lmstudio.ai/docs`), OSI (`opensource.org`), Apple Newsroom. En GitHub, `github.com/.../blob/...` responde 429 tras varias peticiones: usa `raw.githubusercontent.com`.
- IA y sociedad: AEPD (`aepd.es`), NIST, FTC (`consumer.ftc.gov`; curl recibe 404 falso, pero `citas.js` funciona), OMPI (`wipo.int/es`), U.S. Copyright Office, OIT (`ilo.org/es`), AIE (`iea.org`), UNEP en inglés.
- Educación: Noticias ONU (`news.un.org/es`), INTEF (PDF en `intef.es`), The Stanford Daily (`stanforddaily.com`).
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
