---
description: Escribe una unidad de Free Learning de principio a fin (plan, investigación, escritura, auditoría) con subagentes y modelos libres.
agent: director
model: opencode/minimax-m3.1-flash-free
---

Escribe la unidad `$ARGUMENTS` de Free Learning, de principio a fin, siguiendo el flujo de `.claude/docs/flujo-unidad.md`.

Recuerda: eres el Director. No lees fuentes ni escribes lecciones: planifica, despachas subagentes, revisas diffs y decides.

1. **Estado**: lee `ESTADO.md`. Si ya hay una unidad en curso, no empieces otra: retómala.
2. **Plan**: escribe `.claude/trabajo/<materia>/<unidad>/plan.md` con la unidad de `js/temario.js` y `.claude/docs/materias/<id>.md`. Muestra el plan al usuario en pocas líneas y **espera su aprobación antes de seguir**. No avances al paso 2 sin esa aprobación, y no anotes en `ESTADO.md` que el plan está aprobado si el usuario no lo aprobó.
3. **Investigación**: lanza el subagente `investigador` con la ruta de `plan.md`, la ruta destino de `ficha.md` y la materia.
4. **Citas**: `node .claude/herramientas/citas.js .claude/trabajo/<materia>/<unidad>/ficha.md`. Si hay FALLA o BLOQUEADA, relanza al `investigador` con las líneas que fallaron y repite.
5. **Escritura**: lanza subagentes `constructor` **nuevos**, uno por fragmento de 2–3 lecciones, con las rutas de `plan.md` y `ficha.md`, el archivo destino y la materia. Entre fragmentos revisa el diff y actualiza `ESTADO.md`.
6. **Auditoría**: `cp lecciones/<materia>/<unidad>.js .claude/trabajo/<materia>/<unidad>/antes-auditoria.js` y lanza un subagente `auditor` **nuevo** con el archivo, las rutas de `plan.md` y `ficha.md`, y la materia.
7. **Cierre**: revisa el diff contra `antes-auditoria.js` y el reporte del auditor; comprueba al azar 1 o 2 datos; `node verificar.js` y `./empaquetar.sh`; actualiza `ESTADO.md`; resumen al usuario. **No hagas commit salvo que el usuario lo pida.**
