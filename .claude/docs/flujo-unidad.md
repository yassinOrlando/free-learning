# Flujo para escribir una unidad (Director)

El Director es la sesión principal. **No lee fuentes ni escribe lecciones**: planea, despacha agentes, revisa reportes y diffs, y decide. Carpeta de trabajo: `.claude/trabajo/<materia>/<unidad>/` (por ejemplo `.claude/trabajo/ia/que-es/`).

| Paso | Quién | Modelo | Entrega |
|---|---|---|---|
| 1. Plan | Director | sesión | `plan.md`, aprobado por el usuario |
| 2. Investigación | `investigador` | Haiku | `ficha.md` con citas textuales |
| 3. Comprobar citas | `citas.js` | sin modelo | OK / FALLA / BLOQUEADA |
| 4. Escritura | `constructor`, uno nuevo por unidad | Sonnet | `lecciones/<materia>/<unidad>.js` + `archivo:` en el temario |
| 5. Auditoría | `auditor`, uno nuevo por unidad | Sonnet | cambios aplicados + reporte |
| 6. Cierre | Director | sesión | diff revisado, verificar, empaquetar, resumen |

## 1. Plan
- Lee la unidad en `js/temario.js`, `.claude/docs/materias/<id>.md` y, si hace falta, `.claude/docs/contenido.md`.
- Busca remisiones en otras materias con grep sobre `js/temario.js` (no abras archivos de lecciones completos).
- Escribe `plan.md`. Por lección: título exacto, términos nuevos (máximo 3), idea central, visual (diagrama, gráfica o tabla), ejemplo resuelto, remisiones y tipo de fuente buscada.
- Muestra el plan al usuario en pocas líneas y **espera su aprobación**. Si un título del temario parece mal planteado, propón el cambio y espera.

## 2. Investigación
Lanza `investigador` con: ruta de `plan.md`, ruta destino de `ficha.md` y la materia. Nada más; las reglas están en su definición.

## 3. Comprobar citas
`node .claude/herramientas/citas.js .claude/trabajo/<materia>/<unidad>/ficha.md`. Si hay FALLA o BLOQUEADA, manda las líneas que fallaron al mismo investigador con SendMessage (corto) y repite.

## 4. Escritura
Lanza un `constructor` **nuevo** con: rutas de `plan.md` y `ficha.md`, archivo destino y materia. Si la unidad tiene más de 8 lecciones y el constructor se queda sin contexto, divide las lecciones en dos constructores en serie sobre el mismo archivo.

## 5. Auditoría
`cp lecciones/<materia>/<unidad>.js .claude/trabajo/<materia>/<unidad>/antes-auditoria.js` y lanza un `auditor` **nuevo** con: archivo, rutas de `plan.md` y `ficha.md`, y la materia. Nunca reutilices un auditor de otra unidad (arrastra su historial).

## 6. Cierre
- `diff -u .claude/trabajo/<materia>/<unidad>/antes-auditoria.js lecciones/<materia>/<unidad>.js` y el reporte del auditor. Revisa que cada cambio tenga respaldo en la ficha; comprueba al azar 1 o 2 datos.
- `node verificar.js` y `./empaquetar.sh`. **No hagas commit salvo que el usuario lo pida.**
- Resumen al usuario: qué se hizo, qué cambió la auditoría y decisiones pendientes (datos por país, palabras regionales, dudas del auditor).

## Si algo falla
- Un agente se corta por límite de uso: reenvíale la tarea con SendMessage y pídele que reporte lo que dejó a medias.
- Un agente no puede editar: debe decirlo al inicio y entregar el texto antes/después.
- Para unidades de rutina, la sesión principal puede correr con `/model sonnet`.
