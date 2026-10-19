# Notas del Director · Mandarín, unidad 18 (para el constructor y el auditor)

Las 90 palabras están en el sílabo, nivel 6 (`lineas-silabo.txt`). **Es la última unidad de la materia**: la lección 6 cierra HSK 6 y Mandarín (qué sabe hacer el lector, aviso de que el vocabulario fue una selección, sílabo enlazado con `encodeURI`). Nada de nivel 7–9.

## Fuentes de apoyo y vetos
- Apoyo, nombrado así: Wikisource (texto de 静夜思, en tradicional: pásalo a simplificado), el blog East Asia Student (F5, solo para el número en los 300 poemas y la rima; **la traducción del poema es propia**, «traducción de la lección», sin copiar la del blog), Chinese Grammar Wiki (índice de patrones), Ministerio de Educación de Taiwán (diccionarios; en tradicional: pásalo a simplificado).
- **四字格 左A右B y A这A那: sin regla de uso** → sílabo + frases propias marcadas (decisión del usuario). 左思右想: significado del MOE («pensar una y otra vez»).
- Sin juicios ni política: dinastías solo con nombre y fechas de Columbia (Tang 618–906, como dice la fuente; Qin 221–206 a. C.; Han 206 a. C.–220 d. C.; Song 960–1279; Yuan 1279–1368; Ming 1368–1644; Qing 1644–1912; la República desde 1912 solo como fin de la lista). Nada sobre guerras, conquistas ni gobiernos.
- Dialectos: sin cifras de hablantes salvo el «cerca del 70 % de los han» del norte (Universidad Normal de Henan, 2010), con su fuente y año en la frase. No digas «idiomas distintos» ni juicios sobre cuál es mejor.
- Estética: «simetría» no aparece literal en la fuente; di «los edificios se reparten a ambos lados de un eje central» (Museo del Palacio).

## Por lección
- **1 · Poema Tang**: 静夜思 en simplificado (床前明月光，疑是地上霜。举头望明月，低头思故乡。), Li Bai 701–762, Tang como edad de oro de la poesía, verso regulado de 5 o 7 sílabas, jueju (NVCC). Traducción propia marcada. Pinyin del poema con la regla de la materia (sílabo para las palabras que estén; el resto, coherente con Wikcionario/MOE). 左思右想: S. El poema y los nombres son cultura (fuera de la tabla, se evalúan por significado).
- **2 · Dinastías**: tabla con `cuadro` (dinastía, fechas) de Columbia; repaso de 于, 自…以来, 由…组成 (unidades 14 y 16) en frases propias sobre la tabla. Nombres de dinastías: cultura, con pinyin (秦 Qín, 汉 Hàn, 唐 Táng, 宋 Sòng, 元 Yuán, 明 Míng, 清 Qīng).
- **3 · Belleza**: Princeton (espacio vacío en la pintura, armonía con la naturaleza, montaña y agua como yin-yang), Museo del Palacio (eje central; Salón de la Armonía Suprema, 太和殿, refleja el ideal de armonía). Repaso de -性/-化 y 所 (unidad 16) en frases propias.
- **4 · Dialectos**: concepto de dialecto y diferencia con 普通话 sobre todo en la pronunciación; 普通话 se basa en el mandarín del norte (Shanghai Jiao Tong, 2008); grupos Wu, Yue, Min, Xiang, Gan, Hakka y el norte (Henan, 2010); escritura común y habla distinta (Kenyon). A这A那: S. Repaso de 至于.
- **5 · Leer un artículo**: estrategias de McGill (título, encabezados y primera línea de cada párrafo, conclusión, preguntas desde palabras clave, parafrasear); conectores 然而 y 由于…因此 (Dartmouth, ya vistos en la unidad 9). Un artículo corto propio (tema neutro) con preguntas que se responden con él. **由此可见: no** (sin fuente). Remite a Lectura «Comprensión lectora».
- **6 · Escribir un texto de opinión**: estructura (Illinois, Texas A&M, UNC: tesis, un párrafo por idea con pruebas, contraargumento, conceder o rechazar, conclusión que no repite la tesis); 议论文 chino: 论点, 论据, 论证 (Oficina de Educación de Hong Kong; MOE Taiwán), en simplificado, como **términos explicados** (no en la tabla si no son de nivel 6; se evalúan por significado). Modelo de texto propio (tema neutro) y ejercicios de ordenar partes y elegir conectores; nada de teclear caracteres. Remite a Lectura «Hechos y opiniones» y «Cómo se construye un argumento». Cierre de la materia.

## Pinyin, nivel y formato
- Pinyin del sílabo; regla de 不/一 de `mandarin.md` (también en el poema y 成语).
- Permitidas: HSK 1–2; HSK 3 de unidades 7–8; nivel 4 de 9–12; nivel 5 de 13–15; nivel 6 de 16–18. `node .claude/trabajo/mandarin/hsk6-cultura/nivel.js lecciones/mandarin/hsk6-cultura.js`, cada aviso a mano; cultura (poema, dinastías, nombres, términos del 议论文) vale.
- Explicación 480–560 (tope 650), ejemplo 125–180, **vida real 65–90**, 6 ejercicios, una tabla `vocabulario` de 15. Modelo: `lecciones/mandarin/hsk5-cultura.js` y `hsk6-temas.js`.
- Todo carácter con `zh()`; nunca en celdas de significado ni en `href`; nunca pinyin sin su carácter. Opciones en español con solo el carácter marcado.
- `ordenar` con todos los órdenes válidos; `opciones` con una sola correcta.

## Dudas del constructor, revisadas por el Director
- L5 explicación en 449 palabras: **súbela a 480–560** (por ejemplo, alarga el artículo propio o añade un paso de lectura de McGill), con palabras permitidas.
- L1 en 646: no subas más.
- Orden de las estrategias de McGill en el ejemplo de L5: márcalo «recomendación de la lección».
- «Un carácter es una sílaba», 对称 para el eje central y la equivalencia del modelo con 起承转合: márcalos «simplificación de la lección» o quítalos si no aportan.
- 这个古迹历经了很多朝代: revisa naturalidad; si dudas, usa 历经 con un periodo concreto de la tabla de Columbia.
- Ordenar de L6 con piezas en español y con 「首先，」 pegado a la coma: comprueba que el ejercicio se pueda resolver y que `verificar.js` lo acepte (ya da OK).
- Remisiones a Lectura («Idea principal e ideas secundarias», «Hacer un resumen», «Hechos y opiniones», «Cómo se construye un argumento»): existen.
