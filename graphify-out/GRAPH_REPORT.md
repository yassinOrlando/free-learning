# Graph Report - .  (2026-10-09)

## Corpus Check
- 9 files · ~609,880 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 373 nodes · 497 edges · 75 communities (74 shown, 1 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- UI skill search core
- Design system formatter
- Skill data validation
- Design system generator
- Project mission and packaging
- UI/UX rules checklist
- Temario and subjects
- BM25 text search
- Lesson verifier
- App routing and views
- Local-first architecture
- Lesson format and engine docs
- Exercise engine
- Trusted content sources
- Accessibility and writing rules
- Editorial visual style
- i18n texts

## God Nodes (most connected - your core abstractions)
1. `Free Learning` - 22 edges
2. `search()` - 20 edges
3. `DesignSystemGenerator` - 15 edges
4. `Temario (tabla de materias y estado)` - 14 edges
5. `_normalize()` - 12 edges
6. `search_stack()` - 12 edges
7. `validate()` - 12 edges
8. `_check_core_data_contract()` - 11 edges
9. `_search_csv_detailed()` - 10 edges
10. `BM25` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Por que existe (gratis, para cualquiera, offline, confiable)` --semantically_similar_to--> `Local-first, frontend-only`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `Free Learning` --references--> `Fuentes fiables y gratuitas (Khan Academy, OpenStax, CK-12, PhET)`  [INFERRED]
  README.md → CLAUDE.md
- `Temario status table (307 lessons ready in five subjects)` --shares_data_with--> `js/temario.js (window.TEMARIO, single source of truth)`  [INFERRED]
  README.md → CLAUDE.md
- `Free Learning` --references--> `Free Learning (project spec)`  [EXTRACTED]
  README.md → CLAUDE.md
- `Free Learning` --references--> `empaquetar.sh (builds descargar/free-learning.zip)`  [EXTRACTED]
  README.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Classic-script runtime under file:// (window globals loaded in order)** — claude_index_html, claude_js_textos, claude_js_temario, claude_js_ejercicios, claude_js_app [EXTRACTED 1.00]
- **index.html classic script bundle** — index_html_js_textos, index_html_js_temario, index_html_js_ejercicios, index_html_js_app [EXTRACTED 1.00]
- **Lesson quality pipeline (write, verify, audit, package)** — claude_lecciones_unit_files, claude_verificar_js, claude_auditoria_unidad, claude_empaquetar_sh [EXTRACTED 1.00]
- **Flujo de entrega de cambios** — claude, verificar, empaquetar [EXTRACTED 1.00]
- **Fuentes fiables citadas** — readme_khan_academy, readme_openstax, readme_ck_12, readme_phet, readme_oms, readme_medlineplus [EXTRACTED 1.00]
- **Principios del proyecto (por qué existe)** — readme_gratis_para_siempre, readme_lector_objetivo_10_12, readme_funciona_sin_internet, readme_contenido_confiable [EXTRACTED 1.00]
- **UI/UX Pro Max skill documentation set** — claude_skills_ui_ux_pro_max_skill, claude_skills_ui_ux_pro_max_references_pro_rules, claude_skills_ui_ux_pro_max_references_quick_reference [EXTRACTED 1.00]

## Communities (75 total, 1 thin omitted)

### Community 0 - "UI skill search core"
Cohesion: 0.07
Nodes (54): _contains_phrase(), detect_domain(), _domain_keywords(), _exact_match_diagnostic(), _exact_row_identity(), _exact_stack_identifier(), _file_signature(), _get_bm25() (+46 more)

### Community 1 - "Design system formatter"
Cohesion: 0.06
Nodes (47): ansi_ljust(), _button_outline_text_color(), _contrast_ratio(), _derive_dark_palette(), _detect_page_type(), format_ascii_box(), format_markdown(), format_master_md() (+39 more)

### Community 2 - "Skill data validation"
Cohesion: 0.10
Nodes (41): _catalog_date(), _check_app_interface_contract(), _check_catalog_contract(), _check_catalog_summary(), _check_chart_contract(), _check_color_contract(), _check_core_data_contract(), _check_file() (+33 more)

### Community 3 - "Design system generator"
Cohesion: 0.09
Nodes (19): DesignSystemGenerator, _filter_anti_patterns_for_mode(), Drop "avoid dark mode" advice once dark mode is the resolved answer., Generates design system recommendations from aggregated searches., Load reasoning rules from CSV., Execute searches across multiple domains., Find matching reasoning rule for a category., Apply reasoning rules to search results. (+11 more)

### Community 4 - "Project mission and packaging"
Cohesion: 0.15
Nodes (14): CLAUDE.md, empaquetar.sh script, Carta de amor a la humanidad, Estructura de una lección (6 secciones), Free Learning, Funciona sin internet (zip + index.html), Gratis para siempre (sin cuentas, anuncios ni rastreo), HTML, CSS y JavaScript puro sin dependencias (+6 more)

### Community 5 - "UI/UX rules checklist"
Cohesion: 0.14
Nodes (15): Pro Rules and Pre-Delivery Checklist, Light/Dark Mode Contrast rules, No emoji as structural icons (use SVG), Quick Reference Full Rule Set, Accessibility rules (WCAG, contrast, focus, reduced motion), UI/UX Pro Max Skill, Design System Generation (MASTER.md + page overrides), Rule Categories by Priority (10 categories) (+7 more)

### Community 6 - "Temario and subjects"
Cohesion: 0.14
Nodes (13): Autosuficiencia (112 lecciones), Ciencias naturales (39 lecciones), Finanzas personales (próximamente), Finanzas y economía (próximamente), Física (54 lecciones), Inglés A1-B1 (próximamente), Inteligencia artificial (próximamente), Lectura (próximamente) (+5 more)

### Community 7 - "BM25 text search"
Cohesion: 0.22
Nodes (6): BM25, BM25 ranking algorithm for text search, Lowercase, normalize synonyms, split, remove punctuation, filter stopwords, Build BM25 index from documents, Score all documents against query, All indexed terms, for suggestion/typo-recovery purposes.

### Community 8 - "Lesson verifier"
Cohesion: 0.22
Nodes (7): acepta(), assert, enTemario, fig, path, rechaza(), svg

### Community 9 - "App routing and views"
Cohesion: 0.33
Nodes (8): cargarMateria(), completar(), dibujar(), leer(), vistaComoUsar(), vistaInicio(), vistaLeccion(), vistaMateria()

### Community 10 - "Local-first architecture"
Cohesion: 0.22
Nodes (9): Cero instalacion (file:// protocol), Free Learning (project spec), index.html (single page, hash routes), js/app.js (hash routing, views, lazy lesson loading, progress), js/temario.js (window.TEMARIO, single source of truth), Local-first, frontend-only, Progreso (localStorage free-learning:progreso:v1), Por que existe (gratis, para cualquiera, offline, confiable) (+1 more)

### Community 11 - "Lesson format and engine docs"
Cohesion: 0.29
Nodes (8): empaquetar.sh (builds descargar/free-learning.zip), Estructura de una leccion (objetivo, vida real, explicacion, ejemplo, ejercicios, fuentes), Exercise type expresion (custom parser, no eval, simplificar), Fuentes fiables y gratuitas (Khan Academy, OpenStax, CK-12, PhET), js/ejercicios.js (exercise engine, slug, registrarLeccion, fraccion), lecciones/<materia>/<unidad>.js, Ejercicios estilo SQLBolt, verificar.js (automatic lesson/validator check)

### Community 12 - "Exercise engine"
Cohesion: 0.43
Nodes (5): esCorrecta(), expresionesIguales(), montar(), normalizarNumero(), parsearExpresion()

### Community 13 - "Trusted content sources"
Cohesion: 0.29
Nodes (7): CK-12, Contenido confiable con fuentes citadas, Khan Academy, MedlinePlus, Organización Mundial de la Salud, OpenStax, PhET

### Community 14 - "Accessibility and writing rules"
Cohesion: 0.40
Nodes (6): Accesibilidad (AA, foco visible, h3, lang, speechSynthesis fallback), Auditoria obligatoria por unidad (subagente Sonnet), Como explicar (lector de 10 a 12 anos), window.grafica (G) inline SVG charts, Lecciones de referencia: Porcentajes y Funcion lineal y pendiente, speechSynthesis for English/Mandarin pronunciation

### Community 16 - "Editorial visual style"
Cohesion: 0.67
Nodes (3): Estilo visual editorial (Crimson Pro, Atkinson Hyperlegible, ocre), estilos.css (tokens, dark theme, print), PDF export via window.print + @media print

## Knowledge Gaps
- **44 isolated node(s):** `empaquetar.sh script`, `enTemario`, `fig`, `path`, `svg` (+39 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DesignSystemGenerator` connect `Design system generator` to `Design system formatter`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `search()` connect `UI skill search core` to `Design system formatter`, `Design system generator`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `Free Learning` connect `Project mission and packaging` to `Temario and subjects`, `Lesson verifier`, `Local-first architecture`, `Lesson format and engine docs`, `Trusted content sources`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Free Learning` (e.g. with `Estructura de una leccion (objetivo, vida real, explicacion, ejemplo, ejercicios, fuentes)` and `Fuentes fiables y gratuitas (Khan Academy, OpenStax, CK-12, PhET)`) actually correct?**
  _`Free Learning` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `empaquetar.sh script`, `enTemario`, `fig` to the rest of the system?**
  _44 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI skill search core` be split into smaller, more focused modules?**
  _Cohesion score 0.07077922077922078 - nodes in this community are weakly interconnected._
- **Should `Design system formatter` be split into smaller, more focused modules?**
  _Cohesion score 0.06294326241134751 - nodes in this community are weakly interconnected._