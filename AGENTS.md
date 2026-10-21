# Free learning

Sitio local-first y frontend-only con lecciones de lo que todo el mundo debería aprender (matemáticas, física, química, finanzas, ofimática, lectura…), con ejercicios interactivos al estilo [SQLBolt](https://sqlbolt.com/). Gratis para siempre, sin cuentas, sin anuncios ni rastreo: una carta de amor a la humanidad que explica los conceptos de forma ordenada, simple y clara para que cualquiera los entienda.

## Alcance
- Educación básica y media; educación superior queda fuera.
- Idiomas que se enseñan: solo Inglés (A1 a B1 del MCER) y Mandarín (HSK 3.0, niveles 1 a 6, según el sílabo oficial de 2025). En Mandarín, pinyin con marcas de tono siempre junto a los caracteres. Pronunciación con `speechSynthesis` y, donde exista, una grabación dentro del proyecto (`audio/`); sin audio, el ejercicio sigue siendo usable (pinyin o transcripción).
- Interfaz y contenido solo en español por ahora. La i18n está planeada: todo texto visible sale de `js/textos.js` o `js/temario.js`, nunca hardcodeado.
- Materias: Autosuficiencia, Finanzas personales, Finanzas y economía, Inteligencia artificial, Matemáticas, Física, Química, Ciencias naturales, Ofimática, Lectura, Inglés, Mandarín.
- El temario (materias, unidades y lecciones en orden) vive solo en `js/temario.js`, la única fuente de verdad. No duplicarlo.

## Reglas que no se rompen
- **Cero instalación**: el sitio se usa abriendo `index.html` (`file://`). HTML, CSS y JS puro, sin frameworks, dependencias, servidor ni build.
- Bajo `file://`: nada de `<script type="module">`, `import`, `fetch()` ni `.json`. Los datos van en `.js` clásicos que asignan a `window`, cargados con `<script src>` en orden. Nada de CDN: fuentes, imágenes y librerías van dentro del proyecto.
- Accesibilidad AA, `lang` en el texto de otro idioma, íconos SVG y nunca emojis.
- Tras cualquier cambio: `node verificar.js` y `./empaquetar.sh` (regenera `descargar/free-learning.zip`; excluye `.claude/`, `.opencode/`, `descargar/`, `graphify-out/`, `AGENTS.md`, `CLAUDE.md` y `ESTADO.md`).
- **No hacer commit salvo que el usuario lo pida.**

## Mapa
- `index.html` (ruteo por hash: `#/`, `#/materia/<id>`, `#/leccion/<materia>/<idLeccion>`, `#/como-usar`), `estilos.css`, `tipografia/`.
- `js/textos.js` (textos de la UI), `js/temario.js`, `js/ejercicios.js` (`slug()`, `registrarLeccion()`, `fraccion()`, `grafica()`, `zh()` y motor de ejercicios), `js/app.js` (vistas, carga diferida, progreso).
- `lecciones/<materia>/<unidad>.js`: contenido de una unidad, declarado con `archivo:` en el temario.
- `audio/<idioma>/`: grabaciones de pronunciación con su `CREDITOS.md` (2 MB como máximo en total).
- `verificar.js`: valida el motor y que cada lección esté completa, coincida con el temario y acepte sus propias respuestas.
- `.claude/herramientas/`, scripts sin modelo:
  - `revisar.js <unidad.js>`: palabras, negritas, greps y títulos citados.
  - `render.js <unidad.js>`: gráficas a PNG.
  - `citas.js <ficha.md>`: URLs y citas de la ficha.
- `.claude/docs/`: reglas del proyecto, escritas en Markdown, para cualquier agente.
- `.claude/agents/`: definiciones de `investigador`, `constructor` y `auditor` para Claude Code (Sonnet).
- `.opencode/agents/`: los mismos tres roles para opencode, con modelos libres (ver «Modelos por rol»).
- `.claude/trabajo/<materia>/<unidad>/`: `plan.md`, `ficha.md` y `antes-auditoria.js` de cada unidad.
- `ESTADO.md`: unidad en curso, paso del flujo y pendientes. Es el punto de traspaso entre agentes.

## Qué leer según la tarea (carga solo lo que necesites)
| Si vas a… | Lee |
|---|---|
| Escribir, rehacer o ampliar una unidad (Director) | `.claude/docs/flujo-unidad.md` |
| Reglas propias de una materia | `.claude/docs/materias/<id>.md` (si existe) |
| Redactar contenido: estructura, tono, cómo explicar, extensión, lecciones de referencia, temas sensibles | `.claude/docs/contenido.md` |
| Código de una lección: tipos de ejercicio, gráficas, accesibilidad, trampas conocidas | `.claude/docs/formato-leccion.md` |
| Auditar una unidad | `.claude/docs/auditoria.md` |
| Buscar o verificar fuentes, sitios bloqueados, formato de la ficha | `.claude/docs/fuentes.md` |
| Cambiar la UI, CSS o JS del sitio (progreso, PDF, accesibilidad de la UI, estilo editorial) | `.claude/docs/sitio.md` |

## El Director
El Director es la sesión principal. **No lee fuentes ni escribe lecciones**: planea, despacha subagentes, revisa reportes y diffs, y decide.

- En Claude Code, el flujo paso a paso está en `.claude/docs/flujo-unidad.md` y los subagentes en `.claude/agents/`.
- En opencode, el Director es el agente `.opencode/agents/director.md` y los comandos `/unidad`, `/continuar` y `/estado` ejecutan el mismo flujo.

- Antes de empezar o retomar: lee `ESTADO.md`. Si no existe o está vacío, deduce el estado del trabajo mirando `.claude/trabajo/<materia>/<unidad>/` y `git status`, y escribe `ESTADO.md`.
- Después de cada paso (y de cada fragmento de escritura) actualiza `ESTADO.md`.
- El plan de una unidad se hace con **el modelo de la sesión principal** (el que el usuario tiene delante), se aprueba con el usuario y solo entonces se investiga y se construye. Los modelos libres son para los pasos 2, 4 y 5, que están acotados por la ficha y por los gates.
- **El plan aprobado se marca**: `node .claude/herramientas/plan.js aprobar <materia>/<unidad>`, o el comando `/aprobar-plan <materia>/<unidad>`. Un gate bloquea la escritura de la unidad y de la ficha mientras el plan no esté aprobado, así que la investigación y la construcción no pueden adelantarse al plan. Si el plan cambia después de aprobarse, la aprobación caduca y hay que volver a pedirla.

## Estados y traspaso
`ESTADO.md` (raíz) tiene esta forma:

```
# Estado

- Unidad: <materia>/<unidad>   (archivo: lecciones/<materia>/<unidad>.js)
- Paso: 1 plan | 2 investigación | 3 citas | 4 escritura | 5 auditoría | 6 cierre
- Fragmento: <n/N>   (solo en el paso 4)
- Hecho: <una línea>
- Pendiente: <una línea>
- Decisiones: <una línea, o "ninguna">
- Sin commitear: <resumen de git status>
```

Reglas:
- Quien empieza una sesión lo lee primero y continúa donde quedó.
- Se escribe al terminar cada paso y cada fragmento de escritura, para que un cambio de agente no pierda trabajo.
- No se commitea (está en `.gitignore`): es estado de trabajo, no código.

## Modelos por rol
En el flujo con modelos libres (opencode) cada rol usa un modelo distinto, y el auditor **no** comparte familia con el constructor para que los errores no se repitan:

| Rol | 1ª opción | Alternativas |
|---|---|---|
| Director | `opencode/minimax-m3.1-flash-free` | `opencode/beam-free` · `opencode/nemotron-3-ultra-free` |
| Investigador | `opencode/beam-free` | `opencode/nemotron-3-ultra-free` · `opencode/longcat-2.5-preview-free` |
| Constructor | `opencode/minimax-m3.1-flash-free` | `opencode/beam-free` · `opencode/longcat-2.5-preview-free` |
| Auditor | `opencode/deepseek-v4.1-flash-free` | `opencode/glm-5.3-flash-free` · `opencode/mimo-v2.6-flash-free` |

- Solo modelos `opencode/*-free`. Los modelos locales `ollama/*` (1.5B–7B) sirven para tareas mecánicas, no para prosa.
- Si un modelo se agota o da error 429: usa la siguiente alternativa de la fila y anótalo en `ESTADO.md`. Si ninguna funciona, para y deja la unidad en el estado registrado.
- Escribe en fragmentos de 2–3 lecciones por invocación, con subagente nuevo cada vez: un modelo confundido o limitado cuesta un fragmento, no una unidad.
- Un fragmento que no llega a la barra de calidad se marca en `ESTADO.md` como `pendiente de Claude` y no se entrega.

## Estilo del código
- La solución más pequeña que resuelve el problema. Nada de abstracciones, envoltorios, opciones ni infraestructura que nadie pidió.
- Reutiliza lo que ya existe: `js/ejercicios.js` (`slug()`, `registrarLeccion()`, `fraccion()`, `grafica()`, `zh()`), los helpers de cada archivo de lección, los tokens de `estilos.css`.
- Sin dependencias nuevas, sin frameworks, sin build. HTML, CSS y JS puros.
- Sigue el estilo del archivo que tocas: mismo lenguaje, mismo formato, mismos nombres.
- Comentarios solo para el «por qué» que el código no puede mostrar.
- Si un atajo tiene un límite conocido, anótalo en el código: `shortcut: <límite>, <cuándo subirlo>`.

## Estilo del texto de las lecciones
El modo terso (caveman, ponytail) sirve para hablar y para los reportes: frases cortas, sin relleno. **No aplica al texto de las lecciones**, que es contenido para leer y para aprender.

- Las explicaciones, los ejemplos y la vida real van con frases completas y conectadas, como manda `.claude/docs/contenido.md`: nada de fragmentos tipo telegrama, nada de sinónimos atropellados, nada de estructura de código.
- Cuando escribas o audites una lección, ignora cualquier regla de estilo terso para el texto que vas a escribir. El estilo terso vuelve solo en tu reporte final.
- Un fragmento de 3 o 4 palabras es un error de contenido, no un atajo de estilo. `.claude/herramientas/revisar.js` mide la prosa de cada lección (palabras por frase y proporción de frases cortas) y avisa cuando una lección sale demasiado seca: esa es la red de seguridad, y no depende de que el modelo obedezca.

## Diseño de UI
Para tocar `index.html`, `estilos.css` o `js/` del sitio:
- Usa la skill `ui-ux-pro-max` (`.claude/skills/ui-ux-pro-max`) y su script de búsqueda. El comando real, con la ruta que funciona en cualquier agente:
  `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<consulta>" --domain ux`
  (el archivo de la skill usa `${CLAUDE_PLUGIN_ROOT}`, que no está definido en ningún agente: usa la ruta de arriba).
  Para una página nueva: `--design-system`. Para iconos: `--domain icons`. Para tipografía: `--domain typography`.
- Las reglas del proyecto mandan sobre los genéricos de la skill: `.claude/docs/sitio.md` fija el estilo editorial (oscuro cálido y plano, títulos en serif Crimson Pro, texto en Atkinson Hyperlegible, una sola tinta de acento, líneas finas en lugar de tarjetas, sin sombras ni degradados, íconos SVG y nunca emojis, objetivos táctiles de 44px o más, foco visible, contraste AA, `prefers-reduced-motion`).

## Verificación
- Después de cualquier cambio: `node verificar.js` y `./empaquetar.sh`. Los dos deben salir limpios.
- `node .claude/herramientas/revisar.js <unidad.js>` y `node .claude/herramientas/citas.js <ficha.md>` para las unidades y las fichas.
- `node .claude/herramientas/render.js <unidad.js>` y mirar cada PNG con la herramienta de lectura: corrige textos encimados, cortados o fuera de su caja.
- No hacer commit salvo que el usuario lo pida.
