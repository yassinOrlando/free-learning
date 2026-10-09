# Graph Report - .  (2026-10-09)

## Corpus Check
- 18 files · ~625,465 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 412 nodes · 541 edges · 74 communities (73 shown, 1 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.83)
- Token cost: 70,945 input · 0 output

## Community Hubs (Navigation)
- Design system formatter
- UI skill search core
- Skill data validation
- Project mission and temario
- Agent workflow and docs
- Design system generator
- revisar.js checker
- UI/UX rules checklist
- citas.js fact checker
- BM25 text search
- Lesson verifier
- render.js renderer
- App routing and views
- Exercise engine
- Por que existe (gratis, para cualquiera, offline, confiable) lessons

## God Nodes (most connected - your core abstractions)
1. `search()` - 20 edges
2. `Free Learning` - 16 edges
3. `DesignSystemGenerator` - 15 edges
4. `Temario (tabla de materias y estado)` - 14 edges
5. `_normalize()` - 12 edges
6. `search_stack()` - 12 edges
7. `validate()` - 12 edges
8. `_check_core_data_contract()` - 11 edges
9. `_search_csv_detailed()` - 10 edges
10. `BM25` - 9 edges

## Surprising Connections (you probably didn't know these)
- `CLAUDE.md Free Learning (proyecto)` --semantically_similar_to--> `Sitio: arquitectura, UI y accesibilidad`  [INFERRED] [semantically similar]
  CLAUDE.md → .claude/docs/sitio.md
- `CLAUDE.md Free Learning (proyecto)` --semantically_similar_to--> `Auditoria de una unidad`  [INFERRED] [semantically similar]
  CLAUDE.md → .claude/docs/auditoria.md
- `CLAUDE.md Free Learning (proyecto)` --semantically_similar_to--> `Contenido de una leccion (tono y como explicar)`  [INFERRED] [semantically similar]
  CLAUDE.md → .claude/docs/contenido.md
- `CLAUDE.md Free Learning (proyecto)` --semantically_similar_to--> `Formato de una leccion (codigo)`  [INFERRED] [semantically similar]
  CLAUDE.md → .claude/docs/formato-leccion.md
- `index.html SPA shell` --conceptually_related_to--> `Accessibility rules (WCAG, contrast, focus, reduced motion)`  [INFERRED]
  index.html → .claude/skills/ui-ux-pro-max/references/quick-reference.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Pipeline de escritura de unidad (investigador, constructor, auditor)** — claude_agents_investigador, claude_agents_constructor, claude_agents_auditor, concept_director, claude_docs_flujo_unidad [EXTRACTED 1.00]
- **Reglas de contenido de lecciones** — claude_docs_contenido, claude_docs_formato_leccion, claude_docs_auditoria, claude_docs_fuentes [INFERRED 0.85]
- **index.html classic script bundle** — index_html_js_textos, index_html_js_temario, index_html_js_ejercicios, index_html_js_app [EXTRACTED 1.00]
- **Flujo de entrega de cambios** — claude, verificar, empaquetar [EXTRACTED 1.00]
- **Fuentes fiables citadas** — readme_khan_academy, readme_openstax, readme_ck_12, readme_phet, readme_oms, readme_medlineplus [EXTRACTED 1.00]
- **Principios del proyecto (por qué existe)** — readme_gratis_para_siempre, readme_lector_objetivo_10_12, readme_funciona_sin_internet, readme_contenido_confiable [EXTRACTED 1.00]
- **UI/UX Pro Max skill documentation set** — claude_skills_ui_ux_pro_max_skill, claude_skills_ui_ux_pro_max_references_pro_rules, claude_skills_ui_ux_pro_max_references_quick_reference [EXTRACTED 1.00]

## Communities (74 total, 1 thin omitted)

### Community 0 - "Design system formatter"
Cohesion: 0.05
Nodes (54): ansi_ljust(), _button_outline_text_color(), _contrast_ratio(), _derive_dark_palette(), _detect_page_type(), format_ascii_box(), format_markdown(), format_master_md() (+46 more)

### Community 1 - "UI skill search core"
Cohesion: 0.07
Nodes (54): _contains_phrase(), detect_domain(), _domain_keywords(), _exact_match_diagnostic(), _exact_row_identity(), _exact_stack_identifier(), _file_signature(), _get_bm25() (+46 more)

### Community 2 - "Skill data validation"
Cohesion: 0.10
Nodes (41): _catalog_date(), _check_app_interface_contract(), _check_catalog_contract(), _check_catalog_summary(), _check_chart_contract(), _check_color_contract(), _check_core_data_contract(), _check_file() (+33 more)

### Community 3 - "Project mission and temario"
Cohesion: 0.06
Nodes (35): CLAUDE.md, Ejercicios interactivos estilo SQLBolt, empaquetar.sh script, Autosuficiencia (112 lecciones), Carta de amor a la humanidad, Ciencias naturales (39 lecciones), CK-12, Contenido confiable con fuentes citadas (+27 more)

### Community 4 - "Agent workflow and docs"
Cohesion: 0.12
Nodes (27): Agente auditor (Sonnet), Agente constructor (Sonnet), Agente investigador (Haiku), Auditoria de una unidad, Contenido de una leccion (tono y como explicar), Flujo para escribir una unidad (Director), Formato de una leccion (codigo), Fuentes: verificacion y bloqueadas (+19 more)

### Community 5 - "Design system generator"
Cohesion: 0.12
Nodes (12): DesignSystemGenerator, _filter_anti_patterns_for_mode(), Drop "avoid dark mode" advice once dark mode is the resolved answer., Generates design system recommendations from aggregated searches., Load reasoning rules from CSV., Execute searches across multiple domains., Find matching reasoning rule for a category., Select best matching result based on priority keywords. (+4 more)

### Community 6 - "revisar.js checker"
Cohesion: 0.14
Nodes (12): antes, archivo, claves, fs, limpiar(), palabras(), path, PROHIBIDOS (+4 more)

### Community 7 - "UI/UX rules checklist"
Cohesion: 0.14
Nodes (15): Pro Rules and Pre-Delivery Checklist, Light/Dark Mode Contrast rules, No emoji as structural icons (use SVG), Quick Reference Full Rule Set, Accessibility rules (WCAG, contrast, focus, reduced motion), UI/UX Pro Max Skill, Design System Generation (MASTER.md + page overrides), Rule Categories by Priority (10 categories) (+7 more)

### Community 8 - "citas.js fact checker"
Cohesion: 0.18
Nodes (10): CACHE, crypto, ENTIDADES, { execFileSync }, fs, fuentes, normalizar(), os (+2 more)

### Community 9 - "BM25 text search"
Cohesion: 0.22
Nodes (6): BM25, BM25 ranking algorithm for text search, Lowercase, normalize synonyms, split, remove punctuation, filter stopwords, Build BM25 index from documents, Score all documents against query, All indexed terms, for suggestion/typo-recovery purposes.

### Community 10 - "Lesson verifier"
Cohesion: 0.22
Nodes (7): acepta(), assert, enTemario, fig, path, rechaza(), svg

### Community 11 - "render.js renderer"
Cohesion: 0.20
Nodes (9): antes, archivo, { execFileSync }, fs, os, path, raiz, salida (+1 more)

### Community 12 - "App routing and views"
Cohesion: 0.33
Nodes (8): cargarMateria(), completar(), dibujar(), leer(), vistaComoUsar(), vistaInicio(), vistaLeccion(), vistaMateria()

### Community 13 - "Exercise engine"
Cohesion: 0.43
Nodes (5): esCorrecta(), expresionesIguales(), montar(), normalizarNumero(), parsearExpresion()

## Knowledge Gaps
- **72 isolated node(s):** `CK-12`, `Khan Academy`, `MedlinePlus`, `Organización Mundial de la Salud`, `OpenStax` (+67 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Free Learning` connect `Project mission and temario` to `Lesson verifier`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `DesignSystemGenerator` connect `Design system generator` to `Design system formatter`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `search()` connect `UI skill search core` to `Design system formatter`, `Design system generator`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `CK-12`, `Khan Academy`, `MedlinePlus` to the rest of the system?**
  _72 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Design system formatter` be split into smaller, more focused modules?**
  _Cohesion score 0.05325814536340852 - nodes in this community are weakly interconnected._
- **Should `UI skill search core` be split into smaller, more focused modules?**
  _Cohesion score 0.07077922077922078 - nodes in this community are weakly interconnected._
- **Should `Skill data validation` be split into smaller, more focused modules?**
  _Cohesion score 0.10452961672473868 - nodes in this community are weakly interconnected._