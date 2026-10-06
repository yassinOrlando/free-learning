# Graph Report - .  (2026-10-06)

## Corpus Check
- 8 files · ~219,137 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 281 nodes · 469 edges · 15 communities (14 shown, 1 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.78)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Búsqueda UI-UX (core)
- Formato del design system
- Validación de datos de la skill
- Instrucciones y estándar de redacción
- Reglas técnicas y de contenido
- Clase DesignSystemGenerator
- Reglas de diseño de la skill
- Ranking BM25
- App: rutas, vistas y progreso
- Contrato de razonamiento de la skill
- Accesibilidad

## God Nodes (most connected - your core abstractions)
1. `search()` - 20 edges
2. `DesignSystemGenerator` - 15 edges
3. `_normalize()` - 12 edges
4. `search_stack()` - 12 edges
5. `validate()` - 12 edges
6. `_check_core_data_contract()` - 11 edges
7. `_search_csv_detailed()` - 10 edges
8. `BM25` - 9 edges
9. `persist_design_system()` - 8 edges
10. `parse_decision_rules()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Gráficas SVG en línea (window.grafica, figuras, series)` --implements--> `grafica()`  [EXTRACTED]
  CLAUDE.md → js/ejercicios.js
- `index.html SPA shell` --conceptually_related_to--> `Accessibility rules (WCAG, contrast, focus, reduced motion)`  [INFERRED]
  index.html → .claude/skills/ui-ux-pro-max/references/quick-reference.md
- `LEEME.txt usage instructions` --references--> `index.html SPA shell`  [EXTRACTED]
  LEEME.txt → index.html
- `_generate_intelligent_overrides()` --calls--> `search()`  [EXTRACTED]
  .claude/skills/ui-ux-pro-max/scripts/design_system.py → .claude/skills/ui-ux-pro-max/scripts/core.py
- `_check_reasoning_contract()` --calls--> `parse_decision_rules()`  [EXTRACTED]
  .claude/skills/ui-ux-pro-max/scripts/validate_data.py → .claude/skills/ui-ux-pro-max/scripts/reasoning_contract.py

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Lesson writing standard** — claude_como_explicar, claude_reference_lessons, claude_tone, claude_audit_claridad [EXTRACTED 0.95]
- **Unit authoring and audit loop** — claude_lesson_format, claude_audit, verificar, empaquetar [EXTRACTED 0.95]
- **index.html classic script bundle** — index_html_js_textos, index_html_js_temario, index_html_js_ejercicios, index_html_js_app [EXTRACTED 1.00]
- **UI/UX Pro Max skill documentation set** — claude_skills_ui_ux_pro_max_skill, claude_skills_ui_ux_pro_max_references_pro_rules, claude_skills_ui_ux_pro_max_references_quick_reference [EXTRACTED 1.00]
- **Lesson data loading pipeline** — js_temario, lecciones_unit_files, js_ejercicios_registrarleccion, js_app [INFERRED 0.85]

## Communities (15 total, 1 thin omitted)

### Community 0 - "Búsqueda UI-UX (core)"
Cohesion: 0.07
Nodes (54): _contains_phrase(), detect_domain(), _domain_keywords(), _exact_match_diagnostic(), _exact_row_identity(), _exact_stack_identifier(), _file_signature(), _get_bm25() (+46 more)

### Community 1 - "Formato del design system"
Cohesion: 0.06
Nodes (47): ansi_ljust(), _button_outline_text_color(), _contrast_ratio(), _derive_dark_palette(), _detect_page_type(), format_ascii_box(), format_markdown(), format_master_md() (+39 more)

### Community 2 - "Validación de datos de la skill"
Cohesion: 0.10
Nodes (41): _catalog_date(), _check_app_interface_contract(), _check_catalog_contract(), _check_catalog_summary(), _check_chart_contract(), _check_color_contract(), _check_core_data_contract(), _check_file() (+33 more)

### Community 3 - "Instrucciones y estándar de redacción"
Cohesion: 0.08
Nodes (23): CLAUDE.md (Free learning project instructions), Auditoría obligatoria al terminar cada unidad (subagente Sonnet), Criterio de auditoría: Claridad, Cómo explicar (writing guide, lector de 10 a 12 años), Free learning (local-first educational site), i18n (texts from translation files), Lecciones de referencia (estándar de calidad), Técnicas de las lecciones de referencia (experiencia antes del nombre, símbolo en palabras, etc.) (+15 more)

### Community 4 - "Reglas técnicas y de contenido"
Cohesion: 0.09
Nodes (23): Fuentes de contenido (Khan, OpenStax, CK-12, PhET), Estilo visual editorial, Tipos de ejercicio (numero, opciones, texto, expresion), Validación de expresion (parser propio, simplificar), Restricciones de file:// (no modules, fetch, JSON, CDN), Fórmulas HTML/Unicode (KaTeX only local), Gráficas SVG en línea (window.grafica, figuras, series), Formato de lección (código) L(...) (+15 more)

### Community 5 - "Clase DesignSystemGenerator"
Cohesion: 0.12
Nodes (13): DesignSystemGenerator, _filter_anti_patterns_for_mode(), Drop "avoid dark mode" advice once dark mode is the resolved answer., Generates design system recommendations from aggregated searches., Load reasoning rules from CSV., Execute searches across multiple domains., Find matching reasoning rule for a category., Apply reasoning rules to search results. (+5 more)

### Community 6 - "Reglas de diseño de la skill"
Cohesion: 0.14
Nodes (15): Pro Rules and Pre-Delivery Checklist, Light/Dark Mode Contrast rules, No emoji as structural icons (use SVG), Quick Reference Full Rule Set, Accessibility rules (WCAG, contrast, focus, reduced motion), UI/UX Pro Max Skill, Design System Generation (MASTER.md + page overrides), Rule Categories by Priority (10 categories) (+7 more)

### Community 7 - "Ranking BM25"
Cohesion: 0.22
Nodes (6): BM25, BM25 ranking algorithm for text search, Lowercase, normalize synonyms, split, remove punctuation, filter stopwords, Build BM25 index from documents, Score all documents against query, All indexed terms, for suggestion/typo-recovery purposes.

### Community 8 - "App: rutas, vistas y progreso"
Cohesion: 0.33
Nodes (8): cargarMateria(), completar(), dibujar(), leer(), vistaComoUsar(), vistaInicio(), vistaLeccion(), vistaMateria()

### Community 9 - "Contrato de razonamiento de la skill"
Cohesion: 0.38
Nodes (6): apply_decision_rules(), _object_without_duplicates(), parse_decision_rules(), Return deterministic mutations and an audit trail; never execute data., Parse the canonical condition -> action-array representation., _validate_action()

## Knowledge Gaps
- **20 isolated node(s):** `empaquetar.sh script`, `enTemario`, `fig`, `path`, `svg` (+15 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DesignSystemGenerator` connect `Clase DesignSystemGenerator` to `Formato del design system`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `search()` connect `Búsqueda UI-UX (core)` to `Formato del design system`, `Clase DesignSystemGenerator`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `parse_decision_rules()` connect `Contrato de razonamiento de la skill` to `Formato del design system`, `Validación de datos de la skill`, `Clase DesignSystemGenerator`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `empaquetar.sh script`, `enTemario`, `fig` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Búsqueda UI-UX (core)` be split into smaller, more focused modules?**
  _Cohesion score 0.07077922077922078 - nodes in this community are weakly interconnected._
- **Should `Formato del design system` be split into smaller, more focused modules?**
  _Cohesion score 0.06294326241134751 - nodes in this community are weakly interconnected._
- **Should `Validación de datos de la skill` be split into smaller, more focused modules?**
  _Cohesion score 0.10452961672473868 - nodes in this community are weakly interconnected._