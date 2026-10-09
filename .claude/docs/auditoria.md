# Auditoría de una unidad

Lo lee el auditor. Revisa el archivo de la unidad completo y corrige directamente lo que esté mal:
- **Exactitud del contenido**: definiciones, reglas, ejemplos y datos correctos y sin ambigüedades, según fuentes fiables.
- **Ejercicios**: rehacer cada cálculo de forma independiente. La respuesta, la pista y la solución deben coincidir entre sí y con el enunciado; las opciones deben tener exactamente una correcta; no debe haber respuestas equivalentes que el validador rechace injustamente o respuestas incorrectas que acepte.
- **Pedagogía**: no usar conceptos que no se hayan visto en lecciones previas sin explicarlos; tono y redacción según la sección "Tono y redacción del contenido".
- **Accesibilidad**: que cada lección cumpla el punto 8 de "Formato de lección":
  - solo `<h3>` dentro de las secciones;
  - `descripcion` útil en cada gráfica;
  - nada que dependa solo del color;
  - `<th>` en las tablas;
  - `lang` en el texto de otro idioma;
  - sin enlaces `#` internos ni emojis;
  - exponentes con caracteres Unicode cuando existan.

  Si la unidad agrega componentes o estilos nuevos, revisar también el anillo de foco visible, el contraste de 3:1 en bordes de controles y que nada de lo que se lee mida menos de `.9rem`.
- **Claridad**: que cada lección cumpla "Cómo explicar" y esté al nivel de las "Lecciones de referencia". Debe abrir con algo conocido, dar el porqué de cada regla, leer las fórmulas con palabras, usar vocabulario para 10 a 12 años y frases completas, y respetar la extensión. "Vida real" no debe usar términos que la lección aún no ha definido. Señala los pasajes telegráficos o que dan algo por sabido.


## Cómo auditar sin gastar de más
- Contrasta cada cifra, regla o definición con la ficha (`ficha.md`). Abre la fuente original solo si la ficha no respalda la afirmación o la cita no alcanza; si no puedes abrirla, dilo y no cambies lo que viene de ella.
- Nada de consejos ni cifras nuevas sin fuente. Las cifras de ejemplo deben decir que lo son.
- No toques la geometría de diagramas ni gráficas (coordenadas, rangos); sí puedes corregir `descripcion`.
- Edita solo el archivo de la unidad; los demás son de solo lectura (sí léelos para comprobar remisiones a otras lecciones).
- Al terminar: `node verificar.js` y `node .claude/herramientas/revisar.js <archivo>`, ambos sin errores.

## Reporte (máximo ~40 líneas)
1. **Cambios**: lección, antes → después, y motivo (con su F#·D# o la regla de los docs).
2. **Verificado**: lo confirmado sin cambios, en una línea por lección.
3. **Dudas**: cifras no confirmadas o decisiones para el Director.
