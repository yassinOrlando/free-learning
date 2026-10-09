# Graph Report - .  (2026-10-08)

## Corpus Check
- 15 files · ~531,468 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 325 nodes · 455 edges · 62 communities (60 shown, 2 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.82)
- Token cost: 59,331 input · 0 output

## Community Hubs (Navigation)
- UI search core (skill)
- Design system generator
- Data validation scripts
- Free Learning project spec
- Design system class
- UI/UX Pro Max rules
- BM25 search ranking
- Lesson verifier (verificar.js)
- App routing and progress
- Exercise engine
- Reasoning decision rules
- Editorial style and PDF
- i18n texts
- Packaging script

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
- `Por que existe (gratis, para cualquiera, offline, confiable)` --semantically_similar_to--> `Local-first, frontend-only`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `index.html SPA shell` --conceptually_related_to--> `Accessibility rules (WCAG, contrast, focus, reduced motion)`  [INFERRED]
  index.html → .claude/skills/ui-ux-pro-max/references/quick-reference.md
- `Temario status table (307 lessons ready in five subjects)` --shares_data_with--> `js/temario.js (window.TEMARIO, single source of truth)`  [INFERRED]
  README.md → CLAUDE.md
- `Free Learning README` --references--> `Fuentes fiables y gratuitas (Khan Academy, OpenStax, CK-12, PhET)`  [INFERRED]
  README.md → CLAUDE.md
- `LEEME.txt usage instructions` --references--> `index.html SPA shell`  [EXTRACTED]
  LEEME.txt → index.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Lesson quality pipeline (write, verify, audit, package)** — claude_lecciones_unit_files, claude_verificar_js, claude_auditoria_unidad, claude_empaquetar_sh [EXTRACTED 1.00]
- **Classic-script runtime under file:// (window globals loaded in order)** — claude_index_html, claude_js_textos, claude_js_temario, claude_js_ejercicios, claude_js_app [EXTRACTED 1.00]
- **index.html classic script bundle** — index_html_js_textos, index_html_js_temario, index_html_js_ejercicios, index_html_js_app [EXTRACTED 1.00]
- **UI/UX Pro Max skill documentation set** — claude_skills_ui_ux_pro_max_skill, claude_skills_ui_ux_pro_max_references_pro_rules, claude_skills_ui_ux_pro_max_references_quick_reference [EXTRACTED 1.00]

## Communities (62 total, 2 thin omitted)

### Community 0 - "UI search core (skill)"
Cohesion: 0.07
Nodes (54): _contains_phrase(), detect_domain(), _domain_keywords(), _exact_match_diagnostic(), _exact_row_identity(), _exact_stack_identifier(), _file_signature(), _get_bm25() (+46 more)

### Community 1 - "Design system generator"
Cohesion: 0.06
Nodes (47): ansi_ljust(), _button_outline_text_color(), _contrast_ratio(), _derive_dark_palette(), _detect_page_type(), format_ascii_box(), format_markdown(), format_master_md() (+39 more)

### Community 2 - "Data validation scripts"
Cohesion: 0.10
Nodes (41): _catalog_date(), _check_app_interface_contract(), _check_catalog_contract(), _check_catalog_summary(), _check_chart_contract(), _check_color_contract(), _check_core_data_contract(), _check_file() (+33 more)

### Community 3 - "Free Learning project spec"
Cohesion: 0.11
Nodes (25): Accesibilidad (AA, foco visible, h3, lang, speechSynthesis fallback), Auditoria obligatoria por unidad (subagente Sonnet), Cero instalacion (file:// protocol), Como explicar (lector de 10 a 12 anos), empaquetar.sh (builds descargar/free-learning.zip), Estructura de una leccion (objetivo, vida real, explicacion, ejemplo, ejercicios, fuentes), Exercise type expresion (custom parser, no eval, simplificar), Free Learning (project spec) (+17 more)

### Community 4 - "Design system class"
Cohesion: 0.12
Nodes (13): DesignSystemGenerator, _filter_anti_patterns_for_mode(), Drop "avoid dark mode" advice once dark mode is the resolved answer., Generates design system recommendations from aggregated searches., Load reasoning rules from CSV., Execute searches across multiple domains., Find matching reasoning rule for a category., Apply reasoning rules to search results. (+5 more)

### Community 5 - "UI/UX Pro Max rules"
Cohesion: 0.14
Nodes (15): Pro Rules and Pre-Delivery Checklist, Light/Dark Mode Contrast rules, No emoji as structural icons (use SVG), Quick Reference Full Rule Set, Accessibility rules (WCAG, contrast, focus, reduced motion), UI/UX Pro Max Skill, Design System Generation (MASTER.md + page overrides), Rule Categories by Priority (10 categories) (+7 more)

### Community 6 - "BM25 search ranking"
Cohesion: 0.22
Nodes (6): BM25, BM25 ranking algorithm for text search, Lowercase, normalize synonyms, split, remove punctuation, filter stopwords, Build BM25 index from documents, Score all documents against query, All indexed terms, for suggestion/typo-recovery purposes.

### Community 7 - "Lesson verifier (verificar.js)"
Cohesion: 0.22
Nodes (7): acepta(), assert, enTemario, fig, path, rechaza(), svg

### Community 8 - "App routing and progress"
Cohesion: 0.33
Nodes (8): cargarMateria(), completar(), dibujar(), leer(), vistaComoUsar(), vistaInicio(), vistaLeccion(), vistaMateria()

### Community 9 - "Exercise engine"
Cohesion: 0.43
Nodes (5): esCorrecta(), expresionesIguales(), montar(), normalizarNumero(), parsearExpresion()

### Community 10 - "Reasoning decision rules"
Cohesion: 0.38
Nodes (6): apply_decision_rules(), _object_without_duplicates(), parse_decision_rules(), Return deterministic mutations and an audit trail; never execute data., Parse the canonical condition -> action-array representation., _validate_action()

### Community 12 - "Editorial style and PDF"
Cohesion: 0.67
Nodes (3): Estilo visual editorial (Crimson Pro, Atkinson Hyperlegible, ocre), estilos.css (tokens, dark theme, print), PDF export via window.print + @media print

## Knowledge Gaps
- **22 isolated node(s):** `empaquetar.sh script`, `enTemario`, `fig`, `path`, `svg` (+17 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DesignSystemGenerator` connect `Design system class` to `Design system generator`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `search()` connect `UI search core (skill)` to `Design system generator`, `Design system class`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `parse_decision_rules()` connect `Reasoning decision rules` to `Design system generator`, `Data validation scripts`, `Design system class`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **What connects `empaquetar.sh script`, `enTemario`, `fig` to the rest of the system?**
  _22 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI search core (skill)` be split into smaller, more focused modules?**
  _Cohesion score 0.07077922077922078 - nodes in this community are weakly interconnected._
- **Should `Design system generator` be split into smaller, more focused modules?**
  _Cohesion score 0.06294326241134751 - nodes in this community are weakly interconnected._
- **Should `Data validation scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.10452961672473868 - nodes in this community are weakly interconnected._