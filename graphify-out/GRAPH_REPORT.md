# Graph Report - .  (2026-10-09)

## Corpus Check
- 29 files · ~734,020 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 494 nodes · 652 edges · 91 communities (90 shown, 1 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 59 edges (avg confidence: 0.87)
- Token cost: 73,414 input · 0 output

## Community Hubs (Navigation)
- UI Pro Max core search
- Design system formatting
- UI data validation
- Proyecto y temario
- DesignSystemGenerator
- Flujo de unidad y agentes
- IA U1 Qué es la IA
- revisar.js
- Reglas UI/UX accesibilidad
- IA U5 LLMs locales
- Arquitectura del sitio
- IA U3 Modelos de lenguaje
- citas.js
- BM25 búsqueda
- verificar.js
- render.js
- app.js vistas
- IA U6 Sociedad
- IA U2 Cómo aprenden
- Motor de ejercicios
- Reglas materia IA
- Propósito del proyecto

## God Nodes (most connected - your core abstractions)
1. `search()` - 20 edges
2. `Materia: Inteligencia artificial` - 17 edges
3. `DesignSystemGenerator` - 15 edges
4. `Free Learning` - 15 edges
5. `Temario (tabla de materias y estado)` - 14 edges
6. `Fuentes (guía)` - 14 edges
7. `_normalize()` - 12 edges
8. `search_stack()` - 12 edges
9. `validate()` - 12 edges
10. `Agente investigador` - 12 edges

## Surprising Connections (you probably didn't know these)
- `Restricciones de file://` --semantically_similar_to--> `Cero instalación (file://)`  [INFERRED] [semantically similar]
  .claude/docs/sitio.md → CLAUDE.md
- `index.html SPA shell` --conceptually_related_to--> `Accessibility rules (WCAG, contrast, focus, reduced motion)`  [INFERRED]
  index.html → .claude/skills/ui-ux-pro-max/references/quick-reference.md
- `Sitio: arquitectura, UI y accesibilidad` --references--> `Accesibilidad AA, SVG y sin emojis`  [INFERRED]
  .claude/docs/sitio.md → CLAUDE.md
- `Director (sesión principal)` --references--> `verificar.js`  [INFERRED]
  .claude/docs/flujo-unidad.md → CLAUDE.md
- `Director (sesión principal)` --references--> `empaquetar.sh`  [INFERRED]
  .claude/docs/flujo-unidad.md → CLAUDE.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Pipeline de una unidad: plan, investigación, citas, escritura, auditoría y cierre** — _claude_docs_flujo_unidad_director, _claude_agents_investigador, _claude_docs_flujo_unidad_citas_js, _claude_docs_flujo_unidad_constructor, _claude_docs_flujo_unidad_auditor, _claude_docs_flujo_unidad_antes_auditoria [EXTRACTED 1.00]
- **Reglas de contenido de la materia IA** — _claude_docs_materias_ia_lector_10_12, _claude_docs_materias_ia_datos_con_fecha, _claude_docs_materias_ia_marcas_solo_u5, _claude_docs_materias_ia_formula_memoria, _claude_docs_materias_ia_remisiones [EXTRACTED 1.00]
- **Las seis unidades de la materia IA** — _claude_trabajo_ia_que_es_plan, _claude_trabajo_ia_como_aprenden_plan, _claude_trabajo_ia_modelos_lenguaje_plan, _claude_trabajo_ia_usar_bien_plan, _claude_trabajo_ia_llms_locales_plan, _claude_trabajo_ia_sociedad_plan [INFERRED 0.95]
- **index.html classic script bundle** — index_html_js_textos, index_html_js_temario, index_html_js_ejercicios, index_html_js_app [EXTRACTED 1.00]
- **Flujo de entrega de cambios** — claude, verificar, empaquetar [EXTRACTED 1.00]
- **Fuentes fiables citadas** — readme_khan_academy, readme_openstax, readme_ck_12, readme_phet, readme_oms, readme_medlineplus [EXTRACTED 1.00]
- **Principios del proyecto (por qué existe)** — readme_gratis_para_siempre, readme_lector_objetivo_10_12, readme_funciona_sin_internet, readme_contenido_confiable [EXTRACTED 1.00]
- **UI/UX Pro Max skill documentation set** — claude_skills_ui_ux_pro_max_skill, claude_skills_ui_ux_pro_max_references_pro_rules, claude_skills_ui_ux_pro_max_references_quick_reference [EXTRACTED 1.00]
- **Reglas de contenido de lecciones** — claude_docs_contenido, claude_docs_formato_leccion, claude_docs_auditoria, _claude_docs_fuentes [INFERRED 0.85]

## Communities (91 total, 1 thin omitted)

### Community 0 - "UI Pro Max core search"
Cohesion: 0.07
Nodes (54): _contains_phrase(), detect_domain(), _domain_keywords(), _exact_match_diagnostic(), _exact_row_identity(), _exact_stack_identifier(), _file_signature(), _get_bm25() (+46 more)

### Community 1 - "Design system formatting"
Cohesion: 0.06
Nodes (47): ansi_ljust(), _button_outline_text_color(), _contrast_ratio(), _derive_dark_palette(), _detect_page_type(), format_ascii_box(), format_markdown(), format_master_md() (+39 more)

### Community 2 - "UI data validation"
Cohesion: 0.10
Nodes (41): _catalog_date(), _check_app_interface_contract(), _check_catalog_contract(), _check_catalog_summary(), _check_chart_contract(), _check_color_contract(), _check_core_data_contract(), _check_file() (+33 more)

### Community 3 - "Proyecto y temario"
Cohesion: 0.06
Nodes (33): empaquetar.sh script, Autosuficiencia (112 lecciones), Carta de amor a la humanidad, Ciencias naturales (39 lecciones), CK-12, Contenido confiable con fuentes citadas, Estructura de una lección (6 secciones), Finanzas personales (próximamente) (+25 more)

### Community 4 - "DesignSystemGenerator"
Cohesion: 0.09
Nodes (19): DesignSystemGenerator, _filter_anti_patterns_for_mode(), Drop "avoid dark mode" advice once dark mode is the resolved answer., Generates design system recommendations from aggregated searches., Load reasoning rules from CSV., Execute searches across multiple domains., Find matching reasoning rule for a category., Apply reasoning rules to search results. (+11 more)

### Community 5 - "Flujo de unidad y agentes"
Cohesion: 0.18
Nodes (16): Agente investigador, Cita textual de 8 a 40 palabras, Flujo para escribir una unidad, antes-auditoria.js (copia previa a auditoría), Agente auditor, citas.js (comprobar citas), Agente constructor, Director (sesión principal) (+8 more)

### Community 6 - "IA U1 Qué es la IA"
Cohesion: 0.18
Nodes (15): Predecir la siguiente palabra, Ficha · Unidad 1: Qué es la IA, Attention Is All You Need (arXiv), Plan · Unidad 1: Qué es la IA, Breve historia de la IA, Qué es la inteligencia artificial, Agente auditor (Sonnet), Agente constructor (Sonnet) (+7 more)

### Community 7 - "revisar.js"
Cohesion: 0.14
Nodes (12): antes, archivo, claves, fs, limpiar(), palabras(), path, PROHIBIDOS (+4 more)

### Community 8 - "Reglas UI/UX accesibilidad"
Cohesion: 0.14
Nodes (15): Pro Rules and Pre-Delivery Checklist, Light/Dark Mode Contrast rules, No emoji as structural icons (use SVG), Quick Reference Full Rule Set, Accessibility rules (WCAG, contrast, focus, reduced motion), UI/UX Pro Max Skill, Design System Generation (MASTER.md + page overrides), Rule Categories by Priority (10 categories) (+7 more)

### Community 9 - "IA U5 LLMs locales"
Cohesion: 0.19
Nodes (14): Memoria = parámetros × bytes por parámetro, Ollama y LM Studio solo en sus lecciones, Ficha · Unidad 5: LLMs locales, GGUF, Safetensors, Plan · Unidad 5: LLMs locales, Cuantización, Descargar modelos de forma segura: fuentes y licencias (+6 more)

### Community 10 - "Arquitectura del sitio"
Cohesion: 0.22
Nodes (13): Sitio: arquitectura, UI y accesibilidad, Estilo editorial oscuro cálido, PDF con window.print y @media print, Progreso en localStorage (free-learning:progreso:v1), Restricciones de file://, Ruteo por hash en index.html, Free learning (CLAUDE.md), Accesibilidad AA, SVG y sin emojis (+5 more)

### Community 11 - "IA U3 Modelos de lenguaje"
Cohesion: 0.17
Nodes (13): Ficha · Unidad 3: Modelos de lenguaje (LLMs), Mata v. Avianca (caso de alucinación), TypeSafe AI (docs, sitio y blog), Plan · Unidad 3: Modelos de lenguaje (LLMs), Alucinaciones, Ventana de contexto y memoria, Tokens, Ficha · Unidad 4: Usar la IA bien (+5 more)

### Community 12 - "citas.js"
Cohesion: 0.18
Nodes (10): CACHE, crypto, ENTIDADES, { execFileSync }, fs, fuentes, normalizar(), os (+2 more)

### Community 13 - "BM25 búsqueda"
Cohesion: 0.22
Nodes (6): BM25, BM25 ranking algorithm for text search, Lowercase, normalize synonyms, split, remove punctuation, filter stopwords, Build BM25 index from documents, Score all documents against query, All indexed terms, for suggestion/typo-recovery purposes.

### Community 14 - "verificar.js"
Cohesion: 0.22
Nodes (7): acepta(), assert, enTemario, fig, path, rechaza(), svg

### Community 15 - "render.js"
Cohesion: 0.20
Nodes (9): antes, archivo, { execFileSync }, fs, os, path, raiz, salida (+1 more)

### Community 16 - "app.js vistas"
Cohesion: 0.33
Nodes (8): cargarMateria(), completar(), dibujar(), leer(), vistaComoUsar(), vistaInicio(), vistaLeccion(), vistaMateria()

### Community 17 - "IA U6 Sociedad"
Cohesion: 0.25
Nodes (9): BOE/DOUE en lugar de EUR-Lex, Ficha · Unidad 6: IA y sociedad, AEPD (España), Reglamento (UE) 2024/1689, Ley de IA, Plan · Unidad 6: IA y sociedad, Derechos de autor, IA y el futuro del trabajo, Impacto ambiental de la IA (+1 more)

### Community 18 - "IA U2 Cómo aprenden"
Cohesion: 0.25
Nodes (8): Remisiones a otras materias, Plan · Unidad 2: Cómo aprenden las máquinas, Aprendizaje automático (supervisado, no supervisado, refuerzo), Datos, características y etiquetas, Entrenar y evaluar un modelo (sobreajuste, división de datos), Redes neuronales sin fórmulas, Deepfakes y contenido falso, Sesgos en la IA

### Community 19 - "Motor de ejercicios"
Cohesion: 0.43
Nodes (5): esCorrecta(), expresionesIguales(), montar(), normalizarNumero(), parsearExpresion()

### Community 20 - "Reglas materia IA"
Cohesion: 0.48
Nodes (7): Materia: Inteligencia artificial, Datos que cambian rápido siempre con fecha, Jev (TypeSafe AI, modelo de decisión), Laya (modelo abierto de decisión), Lector de 10 a 12 años, ni bombo ni miedo, Modelos de decisión / Sistema Uno, Modelos de decisión: IA que elige en lugar de escribir

## Knowledge Gaps
- **88 isolated node(s):** `ENTIDADES`, `Autosuficiencia (112 lecciones)`, `Ciencias naturales (39 lecciones)`, `CK-12`, `Estructura de una lección (6 secciones)` (+83 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Free learning (CLAUDE.md)` connect `Arquitectura del sitio` to `Proyecto y temario`, `Reglas materia IA`, `Flujo de unidad y agentes`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `Free Learning` connect `Proyecto y temario` to `Arquitectura del sitio`, `verificar.js`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `Materia: Inteligencia artificial` connect `Reglas materia IA` to `Flujo de unidad y agentes`, `IA U1 Qué es la IA`, `IA U5 LLMs locales`, `Arquitectura del sitio`, `IA U3 Modelos de lenguaje`, `IA U6 Sociedad`, `IA U2 Cómo aprenden`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `Materia: Inteligencia artificial` (e.g. with `Agente investigador` and `Plan · Unidad 2: Cómo aprenden las máquinas`) actually correct?**
  _`Materia: Inteligencia artificial` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `ENTIDADES`, `Autosuficiencia (112 lecciones)`, `Ciencias naturales (39 lecciones)` to the rest of the system?**
  _88 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Pro Max core search` be split into smaller, more focused modules?**
  _Cohesion score 0.07077922077922078 - nodes in this community are weakly interconnected._
- **Should `Design system formatting` be split into smaller, more focused modules?**
  _Cohesion score 0.06294326241134751 - nodes in this community are weakly interconnected._