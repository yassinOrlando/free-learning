# Graph Report - .  (2026-10-07)

## Corpus Check
- 13 files · ~344,911 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 298 nodes · 446 edges · 41 communities (39 shown, 2 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.78)
- Token cost: 50,000 input · 8,959 output

## Community Hubs (Navigation)
- Design System Rendering
- UI Skill Search Core
- UI Skill Data Validation
- Project Scope & Pedagogy
- Design System Generator
- UI/UX Pro Max Rules
- BM25 Search
- Verificador del sitio
- App Runtime & Progress
- Motor de ejercicios
- Estilo visual editorial
- Packaging Script

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
- `Por que existe (free forever, for anyone, offline, reliable)` --semantically_similar_to--> `Local-first, frontend-only`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `Como es una leccion` --semantically_similar_to--> `Lesson structure (objetivo, vida real, explicacion, ejemplo, ejercicios, fuentes)`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `index.html SPA shell` --conceptually_related_to--> `Accessibility rules (WCAG, contrast, focus, reduced motion)`  [INFERRED]
  index.html → .claude/skills/ui-ux-pro-max/references/quick-reference.md
- `Autosuficiencia subject` --conceptually_related_to--> `Materias list (11 subjects)`  [AMBIGUOUS]
  README.md → CLAUDE.md
- `LEEME.txt usage instructions` --references--> `index.html SPA shell`  [EXTRACTED]
  LEEME.txt → index.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Verify and package flow** — claude_auditoria_unidad, claude_verificar_js, claude_empaquetar_sh [EXTRACTED 1.00]
- **Classic window-assigned data scripts under file://** — claude_zero_install_file_protocol, claude_temario_single_source, claude_textos_i18n, claude_hash_routing_app [INFERRED 0.85]
- **index.html classic script bundle** — index_html_js_textos, index_html_js_temario, index_html_js_ejercicios, index_html_js_app [EXTRACTED 1.00]
- **UI/UX Pro Max skill documentation set** — claude_skills_ui_ux_pro_max_skill, claude_skills_ui_ux_pro_max_references_pro_rules, claude_skills_ui_ux_pro_max_references_quick_reference [EXTRACTED 1.00]

## Communities (41 total, 2 thin omitted)

### Community 0 - "Design System Rendering"
Cohesion: 0.05
Nodes (54): ansi_ljust(), _button_outline_text_color(), _contrast_ratio(), _derive_dark_palette(), _detect_page_type(), format_ascii_box(), format_markdown(), format_master_md() (+46 more)

### Community 1 - "UI Skill Search Core"
Cohesion: 0.07
Nodes (54): _contains_phrase(), detect_domain(), _domain_keywords(), _exact_match_diagnostic(), _exact_row_identity(), _exact_stack_identifier(), _file_signature(), _get_bm25() (+46 more)

### Community 2 - "UI Skill Data Validation"
Cohesion: 0.10
Nodes (41): _catalog_date(), _check_app_interface_contract(), _check_catalog_contract(), _check_catalog_summary(), _check_chart_contract(), _check_color_contract(), _check_core_data_contract(), _check_file() (+33 more)

### Community 3 - "Project Scope & Pedagogy"
Cohesion: 0.09
Nodes (28): Accessibility standards, Mandatory unit audit by Sonnet subagent, Tone and 'Como explicar' writing guide (reader 10-12 years), SQLBolt-style interactive exercises, empaquetar.sh zip packaging, Lesson structure (objetivo, vida real, explicacion, ejemplo, ejercicios, fuentes), Free Learning (project rules), Trusted free content sources (Khan Academy, OpenStax, CK-12, PhET, Wikipedia) (+20 more)

### Community 4 - "Design System Generator"
Cohesion: 0.12
Nodes (12): DesignSystemGenerator, _filter_anti_patterns_for_mode(), Drop "avoid dark mode" advice once dark mode is the resolved answer., Generates design system recommendations from aggregated searches., Load reasoning rules from CSV., Execute searches across multiple domains., Find matching reasoning rule for a category., Select best matching result based on priority keywords. (+4 more)

### Community 5 - "UI/UX Pro Max Rules"
Cohesion: 0.14
Nodes (15): Pro Rules and Pre-Delivery Checklist, Light/Dark Mode Contrast rules, No emoji as structural icons (use SVG), Quick Reference Full Rule Set, Accessibility rules (WCAG, contrast, focus, reduced motion), UI/UX Pro Max Skill, Design System Generation (MASTER.md + page overrides), Rule Categories by Priority (10 categories) (+7 more)

### Community 6 - "BM25 Search"
Cohesion: 0.22
Nodes (6): BM25, BM25 ranking algorithm for text search, Lowercase, normalize synonyms, split, remove punctuation, filter stopwords, Build BM25 index from documents, Score all documents against query, All indexed terms, for suggestion/typo-recovery purposes.

### Community 7 - "Verificador del sitio"
Cohesion: 0.22
Nodes (7): acepta(), assert, enTemario, fig, path, rechaza(), svg

### Community 8 - "App Runtime & Progress"
Cohesion: 0.33
Nodes (8): cargarMateria(), completar(), dibujar(), leer(), vistaComoUsar(), vistaInicio(), vistaLeccion(), vistaMateria()

### Community 9 - "Motor de ejercicios"
Cohesion: 0.43
Nodes (5): esCorrecta(), expresionesIguales(), montar(), normalizarNumero(), parsearExpresion()

## Ambiguous Edges - Review These
- `Materias list (11 subjects)` → `Autosuficiencia subject`  [AMBIGUOUS]
  README.md · relation: conceptually_related_to

## Knowledge Gaps
- **21 isolated node(s):** `enTemario`, `fig`, `path`, `svg`, `empaquetar.sh script` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Materias list (11 subjects)` and `Autosuficiencia subject`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `DesignSystemGenerator` connect `Design System Generator` to `Design System Rendering`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Why does `search()` connect `UI Skill Search Core` to `Design System Rendering`, `Design System Generator`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `parse_decision_rules()` connect `Design System Rendering` to `UI Skill Data Validation`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **What connects `enTemario`, `fig`, `path` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Design System Rendering` be split into smaller, more focused modules?**
  _Cohesion score 0.05325814536340852 - nodes in this community are weakly interconnected._
- **Should `UI Skill Search Core` be split into smaller, more focused modules?**
  _Cohesion score 0.07077922077922078 - nodes in this community are weakly interconnected._