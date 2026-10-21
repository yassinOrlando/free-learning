---
description: Retoma el trabajo de Free Learning donde lo dejó otro agente, leyendo ESTADO.md.
agent: director
model: opencode/minimax-m3.1-flash-free
---

Retoma el trabajo de Free Learning donde lo dejó el agente anterior.

1. Lee `ESTADO.md` (raíz) y `AGENTS.md`.
2. Si `ESTADO.md` no dice nada útil, deduce el estado mirando `.claude/trabajo/<materia>/<unidad>/` (¿hay `plan.md`? ¿`ficha.md`? ¿`antes-auditoria.js`?), el estado de git y los archivos de `lecciones/<materia>/`; luego escribe `ESTADO.md`.
3. Dime en pocas líneas: unidad, paso del flujo, qué falta y qué vas a hacer ahora.
4. Continúa desde ese punto siguiendo `.claude/docs/flujo-unidad.md` y el flujo de la tabla de `AGENTS.md`:
   - **Paso 1 (plan)**: solo sigue si `ESTADO.md` dice que el plan está aprobado. Si no lo dice, muestra el plan y **para ahí**: no hagas nada más hasta que el usuario lo apruebe. Nunca digas que un plan está aprobado si no lo está.
   - Si toca investigar, lanza el subagente `investigador`.
   - Si toca escribir, lanza subagentes `constructor` nuevos por fragmento de 2–3 lecciones y revisa cada diff.
   - Si toca auditar, lanza un subagente `auditor` nuevo.
5. Mantén `ESTADO.md` al día al terminar cada paso y cada fragmento. **No hagas commit salvo que el usuario lo pida.**
