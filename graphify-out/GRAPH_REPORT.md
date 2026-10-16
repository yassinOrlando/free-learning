# Graph Report - .  (2026-10-15)

## Corpus Check
- 41 files · ~864,745 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 635 nodes · 881 edges · 95 communities
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 65 edges (avg confidence: 0.84)
- Token cost: 217,780 input · 0 output

## Community Hubs (Navigation)
- Buscador BM25 (skill UI)
- Mandarín U4 Acciones y lugares
- Mandarín U6-7 fuentes y lecciones
- Generador de design system
- Formato y reglas de lección
- Validación de razonamiento (skill)
- Temario y empaquetado
- DesignSystemGenerator
- verificar.js
- revisar.js
- Reglas UI/UX Pro Max
- IA U1 Qué es la IA
- IA U5 LLMs locales
- citas.js
- Motor de ejercicios
- IA U2 Cómo aprenden
- render.js
- app.js vistas y progreso
- Flujo de agentes por unidad
- Reglas materia IA
- IA U3 Modelos de lenguaje
- IA U6 IA y sociedad
- IA U4 Usar la IA bien

## God Nodes (most connected - your core abstractions)
1. `search()` - 20 edges
2. `Materia: Inteligencia artificial` - 16 edges
3. `Plan Unidad 5: HSK 2 · Gramática` - 16 edges
4. `Notas del Director U7` - 16 edges
5. `DesignSystemGenerator` - 15 edges
6. `Notas del Director U6` - 15 edges
7. `Temario (tabla de materias y estado)` - 14 edges
8. `Unidad 7: HSK 3 · Gramática (12 lecciones, 144 palabras)` - 14 edges
9. `Free Learning` - 13 edges
10. `Plan Unidad 3: HSK 1 · Vida diaria` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Por qué existe (gratis, sin internet, contenido confiable)` --semantically_similar_to--> `Cero instalación (file://, sin build)`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `index.html SPA shell` --conceptually_related_to--> `Accessibility rules (WCAG, contrast, focus, reduced motion)`  [INFERRED]
  index.html → .claude/skills/ui-ux-pro-max/references/quick-reference.md
- `LEEME.txt usage instructions` --references--> `index.html SPA shell`  [EXTRACTED]
  LEEME.txt → index.html
- `TypeSafe AI (docs, sitio y blog)` --references--> `Jev (TypeSafe AI, modelo de decisión)`  [INFERRED]
  .claude/trabajo/ia/modelos-lenguaje/ficha.md → .claude/docs/materias/ia.md
- `Agente investigador` --shares_data_with--> `Ficha · Unidad 4: Usar la IA bien`  [INFERRED]
  .claude/agents/investigador.md → .claude/trabajo/ia/usar-bien/ficha.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Flujo de unidad: plan, ficha y notas del Director** — _claude_trabajo_mandarin_sonidos_plan_plan, _claude_trabajo_mandarin_sonidos_ficha_ficha, _claude_trabajo_mandarin_sonidos_notas_director_notas, _claude_trabajo_mandarin_primeras_frases_plan_plan, _claude_trabajo_mandarin_primeras_frases_ficha_ficha, _claude_trabajo_mandarin_primeras_frases_notas_director_notas, claude_agentes_investigador_constructor_auditor [INFERRED 0.85]
- **Política de audio en Mandarín** — _claude_docs_materias_mandarin_solo_voz_del_sistema, _claude_trabajo_mandarin_sonidos_ficha_commons_grabaciones, _claude_docs_formato_leccion_tipos_ejercicio, _claude_docs_materias_mandarin_pinyin_con_tonos [INFERRED 0.75]
- **Restricciones del sitio bajo file://** — claude_cero_instalacion, _claude_docs_formato_leccion_helpers_copiados, _claude_docs_sitio_pdf_window_print, _claude_docs_sitio_progreso_localstorage [INFERRED 0.75]
- **Unidades de Mandarín HSK 1-2 con el mismo flujo plan/ficha/notas** — _claude_trabajo_mandarin_vida_diaria_plan, _claude_trabajo_mandarin_acciones_plan, _claude_trabajo_mandarin_hsk2_gramatica_plan, _claude_trabajo_mandarin_vida_diaria_ficha, _claude_trabajo_mandarin_acciones_ficha, _claude_trabajo_mandarin_hsk2_gramatica_ficha [INFERRED 0.85]
- **Reglas del Director para constructores y auditores** — _claude_trabajo_mandarin_vida_diaria_notas_director_respaldo_parcial, _claude_trabajo_mandarin_vida_diaria_notas_director_pinyin_del_silabo, _claude_trabajo_mandarin_vida_diaria_notas_director_palabras_ya_ensenadas, _claude_trabajo_mandarin_vida_diaria_notas_director_formato_extension [EXTRACTED 1.00]
- **Marcadores de aspecto: 了, 在/正在, 过, 着** — _claude_trabajo_mandarin_acciones_plan_accion_terminada_le, _claude_trabajo_mandarin_acciones_plan_accion_en_curso_zai_zhengzai, _claude_trabajo_mandarin_hsk2_gramatica_plan_experiencias_guo, _claude_trabajo_mandarin_hsk2_gramatica_plan_estado_zhe [INFERRED 0.85]
- **Fuentes universitarias de gramática china** — _claude_trabajo_mandarin_hsk2_situaciones_ficha_chingram, _claude_trabajo_mandarin_hsk2_situaciones_ficha_msu_elementary_chinese, _claude_trabajo_mandarin_hsk2_situaciones_ficha_mit_ocw_wheatley, _claude_trabajo_mandarin_hsk2_situaciones_ficha_kapiolani_chn101, _claude_trabajo_mandarin_hsk3_gramatica_ficha_oxford_ctcfl, _claude_trabajo_mandarin_hsk3_gramatica_ficha_princeton_chinese_characters, _claude_trabajo_mandarin_hsk3_gramatica_ficha_usc_li_chinese_ba [INFERRED 0.85]
- **Reglas del Director para lecciones de Mandarín** — _claude_trabajo_mandarin_hsk2_situaciones_notas_director_simplificacion_de_la_leccion, _claude_trabajo_mandarin_hsk2_situaciones_notas_director_pinyin_del_silabo, _claude_trabajo_mandarin_hsk2_situaciones_notas_director_solo_voz_del_sistema, _claude_trabajo_mandarin_hsk3_gramatica_notas_director_nivel_por_palabra [EXTRACTED 1.00]
- **Pipeline de una unidad: plan, investigación, citas, escritura, auditoría y cierre** — _claude_docs_flujo_unidad_director, _claude_agents_investigador, _claude_docs_flujo_unidad_citas_js, _claude_docs_flujo_unidad_constructor, _claude_docs_flujo_unidad_auditor, _claude_docs_flujo_unidad_antes_auditoria [EXTRACTED 1.00]
- **index.html classic script bundle** — index_html_js_textos, index_html_js_temario, index_html_js_ejercicios, index_html_js_app [EXTRACTED 1.00]
- **Reglas de contenido de la materia IA** — _claude_docs_materias_ia_lector_10_12, _claude_docs_materias_ia_datos_con_fecha, _claude_docs_materias_ia_marcas_solo_u5, _claude_docs_materias_ia_formula_memoria, _claude_docs_materias_ia_remisiones [EXTRACTED 1.00]
- **UI/UX Pro Max skill documentation set** — claude_skills_ui_ux_pro_max_skill, claude_skills_ui_ux_pro_max_references_pro_rules, claude_skills_ui_ux_pro_max_references_quick_reference [EXTRACTED 1.00]
- **Reglas de contenido de lecciones** — claude_docs_contenido, claude_docs_auditoria [INFERRED 0.85]
- **Las seis unidades de la materia IA** — _claude_trabajo_ia_que_es_plan, _claude_trabajo_ia_como_aprenden_plan, _claude_trabajo_ia_modelos_lenguaje_plan, _claude_trabajo_ia_usar_bien_plan, _claude_trabajo_ia_llms_locales_plan, _claude_trabajo_ia_sociedad_plan [INFERRED 0.95]

## Communities (95 total, 0 thin omitted)

### Community 0 - "Buscador BM25 (skill UI)"
Cohesion: 0.06
Nodes (60): BM25, _contains_phrase(), detect_domain(), _domain_keywords(), _exact_match_diagnostic(), _exact_row_identity(), _exact_stack_identifier(), _file_signature() (+52 more)

### Community 1 - "Mandarín U4 Acciones y lugares"
Cohesion: 0.06
Nodes (49): Ficha Unidad 4: HSK 1 · Acciones y lugares, Notas del Director Unidad 4: HSK 1 · Acciones y lugares, Plan Unidad 4: HSK 1 · Acciones y lugares, Acción en curso: 在 y 正在, Acción terminada: 了, Algo cambió: 了 al final de la frase, En la escuela, Poder y saber: 会, 能 y 可以 (+41 more)

### Community 2 - "Mandarín U6-7 fuentes y lecciones"
Cohesion: 0.09
Nodes (50): Ficha: Mandarín U6 HSK 2 Situaciones, ChinGram (Universidad Palacký), Sílabo HSK 考试大纲 2025 (CLEC), Kapiolani CC CHN101, MIT OCW Learning Chinese (Wheatley), MSU Elementary Chinese (openbooks), Notas del Director U6, 别 / 不要: imperativo negativo (+42 more)

### Community 3 - "Generador de design system"
Cohesion: 0.06
Nodes (47): ansi_ljust(), _button_outline_text_color(), _contrast_ratio(), _derive_dark_palette(), _detect_page_type(), format_ascii_box(), format_markdown(), format_master_md() (+39 more)

### Community 4 - "Formato y reglas de lección"
Cohesion: 0.06
Nodes (47): expresion con simplificar (parser propio sin eval), Formato de una lección (código), Helpers copiados por archivo (flecha, txt, diagrama, caja, barras), Respuestas numéricas escritas como operación, Tipos de ejercicio (numero, opciones, texto, expresion, pinyin, ordenar, escucha), Trampas conocidas, Fuentes bloqueadas (403, Cloudflare, captcha), Ficha de hechos (formato F#·D#) (+39 more)

### Community 5 - "Validación de razonamiento (skill)"
Cohesion: 0.09
Nodes (45): _object_without_duplicates(), parse_decision_rules(), Parse the canonical condition -> action-array representation., _validate_action(), _catalog_date(), _check_app_interface_contract(), _check_catalog_contract(), _check_catalog_summary() (+37 more)

### Community 6 - "Temario y empaquetado"
Cohesion: 0.06
Nodes (31): empaquetar.sh script, Autosuficiencia (112 lecciones), Carta de amor a la humanidad, Ciencias naturales (39 lecciones), CK-12, Contenido confiable con fuentes citadas, Estructura de una lección (6 secciones), Finanzas personales (próximamente) (+23 more)

### Community 7 - "DesignSystemGenerator"
Cohesion: 0.11
Nodes (15): DesignSystemGenerator, _filter_anti_patterns_for_mode(), Drop "avoid dark mode" advice once dark mode is the resolved answer., Generates design system recommendations from aggregated searches., Load reasoning rules from CSV., Execute searches across multiple domains., Find matching reasoning rule for a category., Apply reasoning rules to search results. (+7 more)

### Community 8 - "verificar.js"
Cohesion: 0.12
Nodes (12): acepta(), assert, audios, conVocab, enTemario, fig, frase, fs (+4 more)

### Community 9 - "revisar.js"
Cohesion: 0.14
Nodes (12): antes, archivo, claves, fs, limpiar(), palabras(), path, PROHIBIDOS (+4 more)

### Community 10 - "Reglas UI/UX Pro Max"
Cohesion: 0.14
Nodes (15): Pro Rules and Pre-Delivery Checklist, Light/Dark Mode Contrast rules, No emoji as structural icons (use SVG), Quick Reference Full Rule Set, Accessibility rules (WCAG, contrast, focus, reduced motion), UI/UX Pro Max Skill, Design System Generation (MASTER.md + page overrides), Rule Categories by Priority (10 categories) (+7 more)

### Community 11 - "IA U1 Qué es la IA"
Cohesion: 0.18
Nodes (14): Predecir la siguiente palabra, Ficha · Unidad 1: Qué es la IA, Attention Is All You Need (arXiv), Plan · Unidad 1: Qué es la IA, Breve historia de la IA, Qué es la inteligencia artificial, Agente auditor (Sonnet), Agente constructor (Sonnet) (+6 more)

### Community 12 - "IA U5 LLMs locales"
Cohesion: 0.21
Nodes (13): Memoria = parámetros × bytes por parámetro, Ollama y LM Studio solo en sus lecciones, Ficha · Unidad 5: LLMs locales, GGUF, Safetensors, Plan · Unidad 5: LLMs locales, Cuantización, Descargar modelos de forma segura: fuentes y licencias (+5 more)

### Community 13 - "citas.js"
Cohesion: 0.18
Nodes (10): CACHE, crypto, ENTIDADES, { execFileSync }, fs, fuentes, normalizar(), os (+2 more)

### Community 14 - "Motor de ejercicios"
Cohesion: 0.31
Nodes (7): esCorrecta(), expresionesIguales(), leerPinyin(), montar(), normalizarNumero(), parsearExpresion(), pinyinIgual()

### Community 15 - "IA U2 Cómo aprenden"
Cohesion: 0.20
Nodes (10): Remisiones a otras materias, Ficha · Unidad 2: Cómo aprenden las máquinas, Google ML Crash Course, Plan · Unidad 2: Cómo aprenden las máquinas, Aprendizaje automático (supervisado, no supervisado, refuerzo), Datos, características y etiquetas, Entrenar y evaluar un modelo (sobreajuste, división de datos), Redes neuronales sin fórmulas (+2 more)

### Community 16 - "render.js"
Cohesion: 0.20
Nodes (9): antes, archivo, { execFileSync }, fs, os, path, raiz, salida (+1 more)

### Community 17 - "app.js vistas y progreso"
Cohesion: 0.33
Nodes (8): cargarMateria(), completar(), dibujar(), leer(), vistaComoUsar(), vistaInicio(), vistaLeccion(), vistaMateria()

### Community 18 - "Flujo de agentes por unidad"
Cohesion: 0.39
Nodes (8): Agente investigador, Cita textual de 8 a 40 palabras, Flujo para escribir una unidad, antes-auditoria.js (copia previa a auditoría), Agente auditor, citas.js (comprobar citas), Agente constructor, Director (sesión principal)

### Community 19 - "Reglas materia IA"
Cohesion: 0.39
Nodes (8): Materia: Inteligencia artificial, Datos que cambian rápido siempre con fecha, Jev (TypeSafe AI, modelo de decisión), Laya (modelo abierto de decisión), Lector de 10 a 12 años, ni bombo ni miedo, Modelos de decisión / Sistema Uno, Modelos abiertos y pesos abiertos, Modelos de decisión: IA que elige en lugar de escribir

### Community 20 - "IA U3 Modelos de lenguaje"
Cohesion: 0.29
Nodes (8): Ficha · Unidad 3: Modelos de lenguaje (LLMs), Mata v. Avianca (caso de alucinación), TypeSafe AI (docs, sitio y blog), Plan · Unidad 3: Modelos de lenguaje (LLMs), Alucinaciones, Ventana de contexto y memoria, Tokens, Verificar lo que te responde (lectura lateral)

### Community 21 - "IA U6 IA y sociedad"
Cohesion: 0.29
Nodes (8): Ficha · Unidad 6: IA y sociedad, AEPD (España), Reglamento (UE) 2024/1689, Ley de IA, Plan · Unidad 6: IA y sociedad, Derechos de autor, IA y el futuro del trabajo, Impacto ambiental de la IA, Privacidad: qué no compartir

### Community 22 - "IA U4 Usar la IA bien"
Cohesion: 0.40
Nodes (5): Ficha · Unidad 4: Usar la IA bien, Plan · Unidad 4: Usar la IA bien, Dar contexto y ejemplos (few-shot), Usar IA para estudiar sin hacer trampa, Escribir instrucciones claras (prompt)

## Knowledge Gaps
- **120 isolated node(s):** `Autosuficiencia (112 lecciones)`, `Ciencias naturales (39 lecciones)`, `CK-12`, `Estructura de una lección (6 secciones)`, `Finanzas personales (próximamente)` (+115 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Free Learning` connect `Temario y empaquetado` to `verificar.js`, `Formato y reglas de lección`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `Por qué existe (gratis, sin internet, contenido confiable)` connect `Formato y reglas de lección` to `Temario y empaquetado`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `Materia: Inteligencia artificial` (e.g. with `Agente investigador` and `Plan · Unidad 2: Cómo aprenden las máquinas`) actually correct?**
  _`Materia: Inteligencia artificial` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Autosuficiencia (112 lecciones)`, `Ciencias naturales (39 lecciones)`, `CK-12` to the rest of the system?**
  _120 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Buscador BM25 (skill UI)` be split into smaller, more focused modules?**
  _Cohesion score 0.056535504296698326 - nodes in this community are weakly interconnected._
- **Should `Mandarín U4 Acciones y lugares` be split into smaller, more focused modules?**
  _Cohesion score 0.05878084179970972 - nodes in this community are weakly interconnected._
- **Should `Mandarín U6-7 fuentes y lecciones` be split into smaller, more focused modules?**
  _Cohesion score 0.08816326530612245 - nodes in this community are weakly interconnected._