# Notas del Director · Mandarín, unidad 1 (para el constructor y el auditor)

`citas.js` da OK en las 50 fuentes. Estas notas dicen qué datos la cita respalda solo en parte y qué decisiones ya están tomadas.

## Datos con respaldo parcial: escribe solo lo que la cita dice
- **Aspiración (F10·D13)**: la cita solo habla del par b/p. Explica la aspiración con b/p y di que d/t y g/k forman pares del mismo tipo como «simplificación de la lección».
- **j, q, x (F10·D14 y D351)**: solo van seguidas de i o de u escrita, que ahí suena ü. La comparación con el inglés «yield» no sirve al lector: no la uses.
- **Las 21 iniciales (F9·D12)** y **las 6 vocales (F10·D18)** vienen de universidades, no del Esquema. Cítalas así.
- **Número de finales (F9·D19)**: la fuente dice 36; otras cuentan 35 o 38. Si das la cifra, di «unas 36, según cómo se cuenten» o no la des.
- **Finales nasales (F9·D23)**: la fuente solo las lista. La diferencia entre -n y -ng (dónde toca la lengua) es «simplificación de la lección».
- **Sílabas distintas (F5·D25)**: «menos de 1000» contando tonos, según la fuente. No uses «400».
- **ISO 7098 (F11·D7)**: solo «en 1982 la ISO adoptó el pinyin». No digas cuál es la versión vigente.
- **Esquema de pinyin (F11 y F25)**: es el texto oficial de 1958 transcrito en Wikisource. En `fuentes` nómbralo «Esquema del pinyin (1958), texto en Wikisource (en chino)».
- **Tono neutro (F22·D32)**: la fuente dice «breve» y sin marca; no dice «ligero».
- **Medio tercer tono (F27·D35 y F63·D351)**: ante cualquier tono que no sea el tercero, el tercer tono se queda en la parte baja (214 pasa a 21). Respaldado.
- **一 con primer tono (F64·D373)**: solo Wikipedia, de apoyo: al final de una palabra o como número ordinal. Di «cuando va al final o sola» como «simplificación de la lección».
- **Significados de mā, má, mǎ, mà (F38·D311)**: Wikipedia de apoyo (madre, cáñamo, caballo, regañar); los caracteres salen del Esquema (F25·D31).
- **Números de tono (F39·D33)**: Wikipedia de apoyo. Basta una frase.
- **Trazos 点, 折 y 钩 (F31·D403)**: Wikipedia de apoyo. Los cinco de Princeton (横, 竖, 撇, 捺, 提) son la base de la tabla.
- **Reglas de orden de trazos (F30)**: son del Ministerio de Educación de Taiwán. Usa solo las generales de la ficha (izquierda antes que derecha, arriba antes que abajo, fuera antes que dentro, horizontal antes que vertical, cerrar al final) y solo con 十, 三, 人 y 口, que se escriben igual en simplificado. Di «reglas generales», no «todas las reglas».
- **Número de trazos (F35, F36, F37, F60 a F62)**: Wikipedia y Wikcionario. Son hechos contables: 一 1, 二 2, 三 3, 十 2, 人 2, 大 3, 口 3, 中 4.
- **Radicales (F33)**: 女 mujer, 口 boca, 亻 persona, 氵 agua, 讠 palabra. La fuente da 没 para 氵 y 课 para 讠.
- **Cerca del 80 % (F32·D47)**: es «cerca del 80 %» de los caracteres, según Princeton.
- **«Unos 200 radicales» (F32·D45)**: en la mayoría de los diccionarios. No digas 201 ni 214.
- **Excepción 给 (F34·D50)**: opcional. No comprobé que 给 esté en el nivel 1: si lo usas, es solo un ejemplo y se dice así.

## Niveles
- 妈, 好, 姐, 叫, 汉, 没 y 中 están en la lista de **caracteres de lectura** del nivel 1, pero no son palabras sueltas de nivel 1 (中 como palabra es de nivel 3). Úsalos como caracteres dentro de palabras de nivel 1 (妈妈, 你好, 姐姐, 汉语, 没有, 中国) o di «el carácter».
- 麻, 马 y 骂 no son de nivel 1: son solo la demostración de los tonos.
- 好 figura como `1(2)(4)` y 对 como `1(4)`: son de nivel 1.

## Grabaciones (`audio/zh/`, ya descargadas)
Nueve archivos de una sola voz (Wei Gao, Pekín; Proyecto Shtooka en Wikimedia Commons; CC BY 2.0 FR), con crédito en `audio/zh/CREDITOS.md`:
`ma3.m4a` (mǎ), `pa4.m4a` (pà), `da4.m4a` (dà), `ta1.m4a` (tā), `ji1.m4a` (jī), `shi4.m4a` (shì), `xi1.m4a` (xī), `nv3.m4a` (nǚ), `lv4.m4a` (lǜ).
- Úsalos en «Pinyin: iniciales» y «Pinyin: finales» con `zh('', 'dà', { voz: '大', audio: 'audio/zh/da4.m4a' })` o en `escucha: { voz: '大', audio: 'audio/zh/da4.m4a' }`. `voz` es obligatoria igual: es el respaldo si el archivo falla.
- Los cuatro tonos de «ma» van **solo con la voz del sistema** (sin `audio`), los cuatro: no existe mā con licencia libre y mezclar voces confunde al comparar tonos. `ma3.m4a` no se usa en esa tabla.
- Cada lección que use un archivo lo cita en `fuentes`: `{ nombre: 'Grabaciones: Wei Gao y Vion Nicolas, Proyecto Shtooka, en Wikimedia Commons (CC BY 2.0 FR)', url: 'https://commons.wikimedia.org/wiki/File:Zh-dà.ogg' }` (la URL de uno de los archivos usados).
- No uses archivos de `ficha-c` que no estén en esta lista.

## Formato
- Un dato se nombra con su fuente (F9·D12): los números D se repiten entre fuentes.
- Todo carácter chino con `zh()`, también en opciones, pistas y soluciones. `verificar.js` falla si no.
- Sílabas sin carácter: `zh('', 'má', { voz: '麻' })`. `voz` debe ser un carácter que se lea con esa sílaba y ese tono.
- En ejercicios `pinyin`, las `respuestas` llevan las sílabas separadas por espacio (`'nǐ hǎo'`).
- Cambios de tono: el pinyin se escribe con el tono original (como el sílabo) y la lección avisa cómo se pronuncia; va marcado «recomendación de la lección». En el ejercicio «cómo se dice 不是», la respuesta es `'bú shì'`.
- Ejercicios con `escucha`: `sinAudio` obligatorio. El enunciado no muestra lo que se va a oír.
- Frases de ejemplo entre «». Decimales con punto. Sin `<strong>` para palabras de vocabulario.
- Di una vez en la unidad (lección 1) que la voz depende del dispositivo y que el pinyin manda.
- `revisar.js` cuenta palabras con los rangos de siempre (explicación 400 a 650). Las tablas cuentan.

## Tras el constructor (para el auditor)
- Pinyin que el constructor puso de memoria y que el Director ya comprobó en el sílabo: 姐姐 jiějie (92), 叫 jiào (91), 没有 méiyǒu (122), 汉语 Hànyǔ (69), 女 nǚ (152), 谁 shéi/shuí (181), 们 men (124), 说 shuō (196), 请 qǐng (165), 给 gěi (61, nivel 1). Usados como carácter suelto, 姐 jiě, 没 méi y 汉 hàn son la primera sílaba de esas palabras.
- Caracteres usados solo en `voz` (no se muestran): 怕 pà, 鸡 jī, 西 xī, 发 fā, 绿 lǜ, 麻 má. Son de nivel 3 o más; valen porque solo los lee la voz. Revisa que cada `voz` se lea con la sílaba y el tono que dice su pinyin y su `sinAudio`.
- `zh("氵")` sin pinyin dibuja solo el carácter, sin botón: es lo correcto para radicales y para la columna de caracteres de la tabla de tonos.
- Revisa con cuidado: lección 1, «forma oficial» del pinyin (F7·D6 dice «adoptado oficialmente» en 1958: vale); lección 3, «menos de 1000 sílabas» debe decir que la cifra cuenta los tonos; lección 3, el ejercicio de «qu» (¿se entiende sin ver la respuesta?); lección 7, la afirmación de que 吗 toma su sonido de 马 (la ficha solo respalda 妈 = 女 + 马: si no hay respaldo, quítala o cámbiala por 妈); lección 4, la regla de la marca en «hǎo».
- Explicaciones en el borde inferior (400 a 408 palabras): si quitas texto, repón para no bajar de 400.

## Cambio pedido por el usuario (2026-10-10): más grabaciones y lecciones más largas
Esto **sustituye** la regla de arriba de «los cuatro tonos de ma solo con la voz del sistema».
- El usuario prefiere grabaciones aunque sean de voces distintas: oír varias voces ayuda al oído. Hay 13 archivos en `audio/zh/` (ver `CREDITOS.md`): los 9 de Wei Gao más `ma2.m4a` (má), `ma4.m4a` (mà), `ba4.m4a` (bà), de Yue Tan (CC BY-SA 3.0 US), y `zhi1.m4a` (zhī), de Xudong Yang (CC BY 2.0).
- Tabla y ejercicios de los tonos de «ma»: má → `ma2.m4a`, mǎ → `ma3.m4a`, mà → `ma4.m4a`. **mā no existe grabada**: va con la voz del sistema, y la lección lo dice en una frase (tres grabaciones de dos personas y una voz del aparato).
- Usa `ba4.m4a` donde aparezca bà suelta (par bà/pà en iniciales) y `zhi1.m4a` donde aparezca zhī (par zhī/jī).
- `fuentes` de cada lección que use grabaciones: una entrada por autor usado. Wei Gao: la que ya existe (`AUDIO`). Yue Tan: `{ nombre: 'Grabaciones: Yue Tan, Proyecto Shtooka, en Wikimedia Commons (CC BY-SA 3.0 US)', url: 'https://commons.wikimedia.org/wiki/File:Zh-má.ogg' }`. Xudong Yang: `{ nombre: 'Grabación: Xudong Yang, Proyecto Shtooka, en Wikimedia Commons (CC BY 2.0)', url: 'https://commons.wikimedia.org/wiki/File:Zh-zhī.ogg' }`.
- Extensión: ninguna explicación por debajo de unas 480 palabras; apunta a 480–560 (el promedio pedido es 500). Agrega solo contenido que ayude a entender y que salga de la ficha: pasos intermedios, un mini-ejemplo más, una comparación. Nada de relleno ni datos sin cita.
- «Cambios de tono: el tercer tono, 不 y 一» es la que más hay que llenar. Material de la ficha aún poco usado: medio tercer tono con su recorrido 214 → 21 (F27·D35, F63·D351) y un ejemplo con palabras de nivel 1; que la marca escrita no cambia (F23·D38); las tres formas de 一 con un ejemplo cada una (F23·D37, D371; F28·D372; F64·D373 de apoyo); 不 ante cuarto tono con dos ejemplos y un contraejemplo (F28·D36). Un mini-procedimiento en pasos («mira el tono de la sílaba que sigue») es bienvenido, marcado «recomendación de la lección». Solo palabras de nivel 1 con su línea en la ficha.

## Segunda pasada del constructor (para el auditor 2)
- Combinaciones propias de la lección 5, hechas con palabras de nivel 1: 很大, 五天, 不对, 不去, 不忙, 一人, 一口. Son demostraciones de tono, se dicen «frases de ejemplo de la lección». Comprueba el tono de cada sílaba y que el cambio aplicado sea el de la regla.
- 一人 y 一口 suenan poco naturales como frases (falta el clasificador). Cámbialas por 一年 (yī nián, se dice yì nián) y 一百 (yī bǎi, se dice yì bǎi). El Director comprobó ambas en el sílabo: `149 1 年 nián 名、量` y `6 1 百 bǎi 数` (no están en la ficha; valen con esta comprobación). También comprobó: 大 (25), 对 (44), 忙 (118), 去 (167), 天 (207), 五 (223), todas de nivel 1.
- El 13.26 % de la lección 7 (F34·D50): es «de los caracteres del chino moderno» que la fuente llama opacos (sin relación con su radical), según un estudio de 1992 citado en 2017. Que la lección no diga más que eso.
