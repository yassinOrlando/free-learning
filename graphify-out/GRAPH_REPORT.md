# Graph Report - .  (2026-10-07)

## Corpus Check
- 12 files · ~287,552 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 306 nodes · 488 edges · 23 communities (22 shown, 1 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- UI Skill Search Core
- Design System Rendering
- UI Skill Data Validation
- Project Scope & Pedagogy
- Content Accessibility Rules
- Design System Generator
- App Runtime & Progress
- UI/UX Pro Max Rules
- BM25 Search
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
- `README: lesson shape` --semantically_similar_to--> `Lesson structure (objetivo, vida real, explicacion, ejemplo, ejercicios, fuentes)`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `Why it exists: free forever, for anyone, offline, reliable content` --semantically_similar_to--> `Free forever, no accounts/ads/tracking (love letter to humanity)`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `index.html SPA shell` --conceptually_related_to--> `Accessibility rules (WCAG, contrast, focus, reduced motion)`  [INFERRED]
  index.html → .claude/skills/ui-ux-pro-max/references/quick-reference.md
- `LEEME.txt usage instructions` --references--> `index.html SPA shell`  [EXTRACTED]
  LEEME.txt → index.html
- `Why it exists: free forever, for anyone, offline, reliable content` --conceptually_related_to--> `Como explicar (teaching guidelines, reader aged 10-12)`  [INFERRED]
  README.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Accessibility rules across technical decisions, content format and audit** — claude_accesibilidad, claude_acc_contenido, claude_auditoria_accesibilidad [EXTRACTED 1.00]
- **Explanation quality standard** — claude_como_explicar, claude_lecciones_referencia, claude_auditoria_claridad [EXTRACTED 1.00]
- **Delivery flow: audit, verify, package** — claude_auditoria, verificar, empaquetar_sh [EXTRACTED 1.00]
- **index.html classic script bundle** — index_html_js_textos, index_html_js_temario, index_html_js_ejercicios, index_html_js_app [EXTRACTED 1.00]
- **UI/UX Pro Max skill documentation set** — claude_skills_ui_ux_pro_max_skill, claude_skills_ui_ux_pro_max_references_pro_rules, claude_skills_ui_ux_pro_max_references_quick_reference [EXTRACTED 1.00]

## Communities (23 total, 1 thin omitted)

### Community 0 - "UI Skill Search Core"
Cohesion: 0.07
Nodes (54): _contains_phrase(), detect_domain(), _domain_keywords(), _exact_match_diagnostic(), _exact_row_identity(), _exact_stack_identifier(), _file_signature(), _get_bm25() (+46 more)

### Community 1 - "Design System Rendering"
Cohesion: 0.06
Nodes (47): ansi_ljust(), _button_outline_text_color(), _contrast_ratio(), _derive_dark_palette(), _detect_page_type(), format_ascii_box(), format_markdown(), format_master_md() (+39 more)

### Community 2 - "UI Skill Data Validation"
Cohesion: 0.11
Nodes (40): _catalog_date(), _check_app_interface_contract(), _check_catalog_contract(), _check_catalog_summary(), _check_chart_contract(), _check_color_contract(), _check_core_data_contract(), _check_file() (+32 more)

### Community 3 - "Project Scope & Pedagogy"
Cohesion: 0.07
Nodes (31): Scope: basic and secondary education, English and Mandarin only, Spanish UI, Mandatory unit audit by Sonnet subagent, Audit criterion: Claridad, Zero install via file:// double click, Como explicar (teaching guidelines, reader aged 10-12), Lesson structure (objetivo, vida real, explicacion, ejemplo, ejercicios, fuentes), file:// restrictions (no modules, fetch, json, CDN), Free Learning project (+23 more)

### Community 4 - "Content Accessibility Rules"
Cohesion: 0.08
Nodes (27): Accesibilidad del contenido (lesson format item 8), Control borders 3:1 contrast (--borde-control), min .9rem, Graph descripcion must state values/shape; meaning not color-only, Exercise a11y: aria-describedby, aria-invalid, feedback re-announced, no # links, Heading order: H1 title, H2 sections by app.js, H3 inside content, Prefer Unicode exponents over sup (screen readers), lang attribute spans for en/zh text, Accesibilidad (technical decisions) (+19 more)

### Community 5 - "Design System Generator"
Cohesion: 0.09
Nodes (20): DesignSystemGenerator, _filter_anti_patterns_for_mode(), Drop "avoid dark mode" advice once dark mode is the resolved answer., Generates design system recommendations from aggregated searches., Load reasoning rules from CSV., Execute searches across multiple domains., Find matching reasoning rule for a category., Apply reasoning rules to search results. (+12 more)

### Community 6 - "App Runtime & Progress"
Cohesion: 0.21
Nodes (11): i18n via textos.js and temario.js copies, lecciones/<materia>/<unidad>.js, Progress in localStorage (Progreso API), cargarMateria(), completar(), dibujar(), leer(), vistaComoUsar() (+3 more)

### Community 7 - "UI/UX Pro Max Rules"
Cohesion: 0.14
Nodes (15): Pro Rules and Pre-Delivery Checklist, Light/Dark Mode Contrast rules, No emoji as structural icons (use SVG), Quick Reference Full Rule Set, Accessibility rules (WCAG, contrast, focus, reduced motion), UI/UX Pro Max Skill, Design System Generation (MASTER.md + page overrides), Rule Categories by Priority (10 categories) (+7 more)

### Community 8 - "BM25 Search"
Cohesion: 0.22
Nodes (6): BM25, BM25 ranking algorithm for text search, Lowercase, normalize synonyms, split, remove punctuation, filter stopwords, Build BM25 index from documents, Score all documents against query, All indexed terms, for suggestion/typo-recovery purposes.

## Knowledge Gaps
- **24 isolated node(s):** `empaquetar.sh script`, `js/app.js`, `js/ejercicios.js`, `js/temario.js`, `js/textos.js` (+19 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DesignSystemGenerator` connect `Design System Generator` to `Design System Rendering`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `search()` connect `UI Skill Search Core` to `Design System Rendering`, `Design System Generator`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `parse_decision_rules()` connect `Design System Generator` to `Design System Rendering`, `UI Skill Data Validation`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **What connects `empaquetar.sh script`, `js/app.js`, `js/ejercicios.js` to the rest of the system?**
  _24 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Skill Search Core` be split into smaller, more focused modules?**
  _Cohesion score 0.07077922077922078 - nodes in this community are weakly interconnected._
- **Should `Design System Rendering` be split into smaller, more focused modules?**
  _Cohesion score 0.06294326241134751 - nodes in this community are weakly interconnected._
- **Should `UI Skill Data Validation` be split into smaller, more focused modules?**
  _Cohesion score 0.1073170731707317 - nodes in this community are weakly interconnected._