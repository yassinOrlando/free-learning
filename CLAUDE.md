# Free learning

@AGENTS.md

## Claude Code

- La sesión principal es el **Director**: planifica, despacha subagentes, revisa diffs y decide. No lee fuentes ni escribe lecciones.
- Subagentes: `.claude/agents/investigador.md` (Sonnet), `.claude/agents/constructor.md` y `.claude/agents/auditor.md` (Sonnet), uno nuevo por unidad.
- Flujo paso a paso: `.claude/docs/flujo-unidad.md`.
- Si un subagente se corta por límite de uso: reenvíale la tarea con SendMessage y pídele que reporte lo que dejó a medias.
- Para unidades de rutina, la sesión principal puede correr con `/model sonnet`.
- Antes de empezar o retomar una sesión, lee `ESTADO.md`; después de cada paso, actualízalo.
