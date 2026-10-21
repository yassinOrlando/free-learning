---
description: Aprueba el plan de la unidad en curso. Se ejecuta antes de investigar o construir.
agent: director
---

Aprobación del plan de la unidad en curso.

1. Lee `ESTADO.md` y di qué unidad es y qué paso del flujo va.
2. Muestra el resumen del plan de esa unidad (las lecciones, los términos nuevos y las fuentes previstas) en pocas líneas.
3. Si el usuario ya dijo que lo aprueba, ejecuta:
   `node .claude/herramientas/plan.js aprobar <materia>/<unidad>`
   y confirma que quedó aprobado.
4. Si el usuario no lo ha aprobado todavía, **para ahí**: no investigues, no escribas la unidad y no lances subagentes de trabajo. Espera su respuesta.

El plan aprobado queda marcado en `.claude/trabajo/<materia>/<unidad>/APROBADO`. Si el plan cambia después, la aprobación caduca y hay que volver a aprobarlo.
