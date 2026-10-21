# Plan · finanzas · Unidad 2: El sistema financiero

- Archivo destino: `lecciones/finanzas/sistema-financiero.js` (materia `finanzas`).
- Ficha: `.claude/trabajo/finanzas/sistema-financiero/ficha.md`.
- 4 lecciones, 6 ejercicios cada una.
- No hay reglas propias de la materia (`.claude/docs/materias/finanzas.md` no existe): mandan `.claude/docs/contenido.md` y `.claude/docs/formato-leccion.md`, más las reglas de la unidad que están al final de este plan.
- Segunda unidad de "Finanzas y economía": la unidad 1 ("Conceptos de economía") ya está escrita y da por sabidos escasez, costo de oportunidad, oferta, demanda, precio de equilibrio y monopolio.

## Cuts con el material ya escrito (esto es lo importante de esta unidad)

Tres de las cuatro lecciones pisan temas que ya existen en "Finanzas personales" o en la unidad 1. Cada lección declara qué NO repite y a qué lección remite:

| Lección de esta unidad | Ya está escrito en | Corte |
|---|---|---|
| 1. Breve historia del dinero | "Qué es el dinero" (finanzas-personales: las tres tareas del dinero), "Trueque y ayuda mutua" (autosuficiencia) | Aquí va **la forma del dinero a lo largo del tiempo**, no qué es el dinero ni sus funciones. El trueque se menciona en una frase y se remite. |
| 2. Qué hacen los bancos | "Qué es un crédito", "Tipos de cuentas bancarias", "Bancos y seguridad" (finanzas-personales) | Aquí va el banco **como intermediario de la economía** y el hecho de que **al prestar crea el depósito**. No las piezas de un crédito de consumo, ni cuentas, ni comisiones, ni fraude. |
| 3. Bancos centrales y política monetaria | nada (0 apariciones en todo el repo) | Terreno libre. |
| 4. Tasas de interés y su efecto en la economía | "Interés simple" e "Interés compuesto: la fuerza del tiempo" (finanzas-personales: las fórmulas C, i, t) | Aquí va el **efecto sobre la economía**: la tasa oficial move el crédito, el gasto y los precios. Las fórmulas ya están escritas y no se repiten: se usan y se remite a ellas. |

## 1. Breve historia del dinero

- **Apertura**: por qué se dice "salario" si lo que recibían los soldados romanos era sal, y por qué un billete de papel vale algo si nadie lo garantiza con oro.
- **Términos (máximo 3 en negritas)**:
  - **moneda**: piece de metal con valor marcado, la primera forma de dinero que la gente aceptaba en todas partes;
  - **billete**: papel que vale dinero porque alguien lo garantiza;
  - **salario**: la palabra viene de la sal, que se usaba como pago.
- **Idea central**: cada forma de dinero nació de un problema. El trueque atascaba (remisión a "Trueque y ayuda mutua"), así que se usaron objetos difíciles de hacer pasar por otros (sal, cacao, conchas); luego las monedas, para que el valor fuera el mismo en todas partes; luego el papel, que era fácil de llevar y de imprimir, pero fácil de falsificar; y por esa falsificación nacieron los bancos centrales, que son el tema de la lección 3. La lección recorre el camino y termina en el dinero digital, sin explicar qué es el dinero (eso ya está en "Qué es el dinero").
- **Visual**: línea de tiempo con `caja`, `flecha` y `txt`: trueque → moneda → papel → digital, con una línea bajo cada etapa que dice qué problema resolvía y qué problema nuevo-traía.
- **Ejemplo resuelto**: la sal. En un lugar sin campos de sal, la sal era tan valiosa que se usaba como pago y de ahí "salario"; después se cuenta el problema siguiente: cuando las monedas escasearon en una guerra, el papel resolvió el transporte pero abrió la falsificación. Cierre: por qué "lo que vale" y "lo que se acepta" no siempre son lo mismo.
- **Remisiones**: "Trueque y ayuda mutua" (autosuficiencia) y "Qué es el dinero" (finanzas personales).
- **Fuentes a buscar**: revista CONDUSEF *Una breve historia del dinero* y *La historia de México contada a través del dinero*; CORE Econ capítulo 10 (qué es el dinero y el dinero de curso legal); Wikipedia en español *Historia del dinero* (solo apoyo).

## 2. Qué hacen los bancos

- **Apertura**: si en un banco hay mil personas con $100 en cuentas y solo dos piden prestado, ¿qué hace el banco con los $800 que quedan?
- **Términos**:
  - **intermediación**: poner en contacto a quien tiene dinero y quien lo necesita, a cambio de una comisión;
  - **mercado de crédito**: el conjunto de los créditos que se otorgan y se pagan;
  - **creación de dinero**: el hecho de que el crédito nuevo se convierte en un depósito nuevo en el banco del prestatario.
- **Idea central**: un banco no es una caja fuerte: mueve dinero de quien sobra a quien falta, cobra más de lo que paga y por eso gana. Y lo más sorprendente: cuando el banco presta, el dinero de la cuenta del prestatario aparece de nuevo: **el crédito crea el depósito**. Por eso "dinero en el banco" no es lo mismo que "dinero guardado por la gente". El riesgo del otro lado: si el prestatario no paga, el banco pierde (remisión a "Qué es un crédito", que explica el crédito desde el lado del que lo pide).
- **Visual**: diagrama de flujo con `caja` y `flecha`: ahorrante → (depósito) → banco → (préstamo) → prestatario, con la nota de que la flecha del préstamo vuelve como depósito nuevo; al lado, una tabla "qué gana cada uno" (ahorrante, banco, prestatario) y "qué pasa si el prestatario no paga".
- **Ejemplo resuelto**: un banco con $1.000 de depósitos y $800 de préstamos (cifras de ejemplo). Se calcula cuánto cobra el banco de los $800, cuánto paga a los $1.000 y cuánto gana; se muestra que con los $200 que le quedan puede prestar más; y se comprueba que en la cuenta de cada prestatario hay $100 nuevos que antes no existían en ningún sitio.
- **Remisiones**: "Qué es un crédito" y "Por qué ahorrar" (finanzas personales).
- **Fuentes a buscar**: CORE Econ capítulo 10 (bancos, crédito, creación de dinero en forma de depósitos, dinero de curso legal); SERNAC *Educación financiera* (PDF: dinero bancario, emisión de billetes, el Banco Central prestando a los bancos); revista CONDUSEF *Día Internacional de los Bancos*; Wikipedia en español *Banco* (solo apoyo).

## 3. Bancos centrales y política monetaria

- **Apertura**: dos países, dos bancos centrales; uno sube la tasa y el otro la baja en el mismo mes. ¿Por qué no pueden hacer lo mismo que una empresa y subir precios cuando quieren?
- **Términos**:
  - **banco central**: la institución que emite el dinero y vigila que los bancos del país jueguen bien;
  - **política monetaria**: el conjunto de decisiones sobre el dinero y las tasas que usa para cuidar la economía;
  - **objetivo de inflación**: la meta de precios que se fija, por ejemplo mantener la inflación cerca de un 2 %.
- **Idea central**: el banco central es el único que puede crear el dinero base y emitir billetes; presta a los bancos a la **tasa oficial** que él mismo fija, y los bancos cobran más de lo que paga. Su trabajo no es el precio de las tiendas: es la salud del dinero y de los precios. La herramienta es la tasa: subirla enfría el gasto y la inflación, bajarla empuja el gasto. Y tiene límites: no controla el clima ni el gasto del gobierno. Nació de las crisis: donde el dinero dejó de ser confiable, se creó un banco central para devolverle la confianza (ejemplo: México 1925, tras la inflación de la Revolución).
- **Visual**: diagrama con `caja` y `flecha`: banco central → (tasa oficial) → bancos → empresas y familias; al lado, la cadena "tasa oficial sube → los bancos cobran más → se pide menos prestado → baja la presión sobre los precios", y su inversa.
- **Ejemplo resuelto**: un banco central que sube la tasa oficial del 3 % al 6 %. Se calcula lo que cambia para un banco prestador (presta al 8 % en vez del 5 %) y para una familia que pide $1.000 (paga $60 de interés en vez de $30); se explica que esa es la vía por la que una decisión de un banco central llega al bolsillo. Contraste: el caso de México en 1925, con la ruta país + año y "revisa el dato vigente en tu país".
- **Remisiones**: "Inflación: por qué todo sube de precio" (finanzas personales) y "Escasez y costo de oportunidad" (unidad 1, para el mismo gesto de elegir entre alternativas).
- **Fuentes a buscar**: revista CONDUSEF *¿Por qué se crea un Banco Central?*, *¿Para qué queremos un Banco Central?* y *Autonomía del Banco de México*; CORE Econ capítulo 10 (banco central, dinero de curso legal) y capítulo 15 (política monetaria, objetivos de inflación).

## 4. Tasas de interés y su efecto en la economía

- **Apertura**: dos cartridge idénticos, uno comprado antes de que los precios subieran y otro después. ¿En cuál fuiste más listo?
- **Términos**:
  - **tasa oficial**: la tasa que fija el banco central y a la que los bancos sePrestan entre sí;
  - **demanda agregada**: la suma de todo lo que se quiere comprar en un país;
  - **tasa real**: lo que te pagan menos lo que suben los precios: lo que el dinero compra de verdad.
- **Idea central**: la tasa que ves en tu crédito y la que fija el banco central no son la misma, pero están unidas por una cadena: la tasa oficial mueve la de los bancos, la de los bancos mueve la tuya, y la tuya mueve el gasto, la inversión y los precios. Si la tasa oficial sube, se pide menos prestado y la presión sobre los precios baja; si baja, pasa lo contrario. Y hay un detalle que casi nadie explica: **la tasa real**, que descuenta la inflación. Un 6 % con inflación del 4 % es un 2 % real: tu dinero compró menos de lo que parecía.
- **Visual**: gráfica con `G` (`window.grafica`): dos curvas de demanda agregada, la original y la desplazada cuando sube la tasa, con los ejes rotulados en palabras ("cantidad", "precio") y `descripcion` obligatoria; al lado, una tabla "qué pasa cuando la tasa oficial sube / cuando baja" (crédito, gasto, inversión, precios, empleo).
- **Ejemplo resuelto**: un crédito de $1.000 al 6 % con una inflación del 4 % (cifras de ejemplo). Se calcula el interés, se calcula la tasa real (6 % − 4 % = 2 %) y se compara con un depósito al 2 %: si la inflación es del 4 %, ese depósito pierde poder de compra aunque el banco pague. Se cierra con el criterio: una tasa que parece buena puede no serlo si los precios suben más.
- **Remisiones**: "Oferta y demanda" (unidad 1 de esta misma materia, para leer las curvas), "Interés simple" e "Interés compuesto: la fuerza del tiempo" (finanzas personales, para las fórmulas que aquí no se repiten), "Proteger tu dinero de la inflación y la devaluación" (finanzas personales).
- **Fuentes a buscar**: CORE Econ capítulo 15 (política monetaria, objetivos de inflación, demanda agregada, tasa de interés real); revista CONDUSEF *¿Por qué todo es más caro?*, *El dinero y la inflación* y *¿La inflación afecta mi crédito?*; SERNAC *Educación financiera* (PDF: la tasa de interés como incentivo para pedir prestado).

## Reglas de la unidad

- **Términos en inglés**: la primera vez, el término en español y el original en `<span lang="en">`: moneda (<span lang="en">coin</span>), billete (<span lang="en">banknote</span>), intermediación (<span lang="en">financial intermediation</span>), creación de dinero (<span lang="en">money creation</span>), banco central (<span lang="en">central bank</span>), política monetaria (<span lang="en">monetary policy</span>), objetivo de inflación (<span lang="en">inflation target</span>), tasa oficial (<span lang="en">policy rate</span>), demanda agregada (<span lang="en">aggregate demand</span>), tasa real (<span lang="en">real interest rate</span>).
- **Cifras**: las cantidades y precios de los ejemplos son de ejemplo y se dicen ("cifras de ejemplo"). Si una fuente da un dato real (por ejemplo el banco central de México en 1925), va con país y año, y con "revisa el dato vigente en tu país".
- **Sin marcas ni empresas**: ni bancos, ni tiendas, ni países concretos en los ejemplos. Los organismos oficiales sí se nombran.
- **Remisiones**: los títulos citados entre comillas tienen que existir en `js/temario.js`. Los títulos de unidad ("Bancos y seguridad") no valen como remisión.
- **Gráficas**: la de la lección 4 se dibuja con `G` (`window.grafica`), con `descripcion` obligatoria y los ejes rotulados en palabras ("cantidad", "precio"), sin depender del color.
- **Ejercicios**: `numero`, `opciones`, `texto` y `ordenar`. Respuestas numéricas escritas como operación, con `tolerancia` cuando haya redondeo.
- **Prohibido repetir**: no volver a explicar qué es el dinero ni sus tres funciones (remisión a "Qué es el dinero"), ni el trueque (remisión a "Trueque y ayuda mutua"), ni las piezas de un crédito de consumo (remisión a "Qué es un crédito"), ni las fórmulas de interés simple y compuesto (remisión a "Interés simple").
