# Plan · finanzas · Unidad 1: Conceptos de economía

- Archivo destino: `lecciones/finanzas/conceptos-economia.js` (materia `finanzas`).
- Ficha: `.claude/trabajo/finanzas/conceptos-economia/ficha.md`.
- 4 lecciones, 5 o 6 ejercicios cada una.
- No hay reglas propias de la materia (`.claude/docs/materias/finanzas.md` no existe): mandan `.claude/docs/contenido.md` y `.claude/docs/formato-leccion.md`.
- Es la primera unidad de "Finanzas y economía": no hay lecciones previas de la materia, así que nada técnico se da por sabido.
- Puente con la materia ya escrita "Finanzas personales": el lector llega con lo del presupuesto y el ahorro, y aquí lo ve desde el lado de la economía en general.

## 1. Escasez y costo de oportunidad

- **Apertura**: un fin de semana con 8 horas libres y dos planes (ir a un curso extra o trabajar un turno): siempre se renuncia a algo.
- **Términos (máximo 3 en negritas)**:
  - **escasez**: no hay suficientes recursos para todas las cosas que queremos;
  - **costo de oportunidad**: lo que dejas de tener por elegir una cosa;
  - **toma de decisiones**: elegir entre alternativas.
- **Idea central**: todo el tiempo escasea el tiempo, el dinero y la atención. Elegir no es solo ganar: es renunciar a la mejor alternativa (no a todas). El costo de oportunidad no aparece en la cuenta del banco, pero es real. Por eso "no me alcanza" casi nunca significa "no tengo suficiente", sino "tengo que elegir".
- **Visual**: diagrama con cajas y flechas (`caja`, `flecha`, `txt`): "Elijo A" → "Pierdo la mejor alternativa B" y una tabla de dos opciones con lo que ganas y lo que renuncias.
- **Ejemplo resuelto**: un fin de semana. Turno de 8 h que paga $40 (cifra de ejemplo) o estudiar 4 h para un examen. Se comparan las dos opciones y se calcula el costo de oportunidad de elegir una; cierre: comprobar que el costo de oportunidad es la alternativa que se dejó, no "todo lo demás".
- **Remisiones**: "Necesidades y deseos" y "Hacer tu primer presupuesto" (Finanzas personales); "Porcentajes" (Matemáticas) para comparar con el mismo denominador.
- **Fuentes a buscar**: Khan Academy en español (microeconomía: escasez y costo de oportunidad), CORE Economics (traducción en español de *The Economy*, unidad 1: recursos limitados), OpenStax *Principles of Economics* (solo apoyo, en inglés) y un organismo público que explique scarcity en lenguaje sencillo.

## 2. Oferta y demanda

- **Apertura**: por qué el tomate baja de precio en temporada y sube en invierno, y por qué el concert se encarece cuando todos lo quieren el mismo día.
- **Términos**:
  - **oferta**: lo que los vendedores quieren poner a la venta;
  - **demanda**: lo que los compradores quieren comprar;
  - **equilibrio**: el punto en que la cantidad que se ofrece y la que se demanda se emparejan.
- **Idea central**: el precio no lo decide nadie: sube cuando hay más compradores que vendedores y baja cuando sobra producto. El equilibrio se alcanza solo, con el precio como señal. Si el precio está por encima, sobra oferta y baja; si está por debajo, falta y sube.
- **Visual**: gráfica con `G` de `js/ejercicios.js`: curva de demanda bajando y curva de oferta subiendo, con el punto de equilibrio marcado y rotulado ("precio de equilibrio"). Debajo, una tabla de 3 precios con cuántos quieren comprar y cuántos quieren vender.
- **Ejemplo resuelto**: un puesto de limonada en una feria. Se prueban 3 precios ($1, $2, $3) y se identifica el precio de equilibrio ($2, 5 compradores y 5 vendedores); se comprueba que en ese precio las cantidades coinciden. La tabla debe coincidir con las curvas dibujadas: a $1 compran 8 y venden 2; a $2 compran 5 y venden 5; a $3 compran 2 y venden 8.
- **Remisiones**: "El plano cartesiano y las gráficas" (Matemáticas) para leer la gráfica; hacia adelante: "Mercados y formación de precios".
- **Fuentes a buscar**: Khan Academy en español (oferta y demanda, curvas), CORE Economics (unidades de "La economía en un mundo de recursos limitados" sobre mercados y precios), OpenStax (capítulos 3 y 4, apoyo en inglés).

## 3. Mercados y formación de precios

- **Apertura**: por qué el mismo producto cuesta distinto en el barrio que en el centro, y por qué a veces no hay nada a la venta.
- **Términos**:
  - **mercado**: el conjunto de compradores y vendedores que se encuentran para intercambiar;
  - **exceso de demanda**: más compradores que lo que hay para vender, el precio sube;
  - **exceso de oferta**: más producto del que se compra, el precio baja.
- **Idea central**: el precio se forma por el choque entre lo que la gente quiere y lo que se produce, y por lo que cuesta producir (con remisión a "Cómo fijar un precio de venta", unidad 4). Los excesos empujan el precio hacia el equilibrio. Si alguien fija un tope de precio (alquiler, entradas), aparece el exceso de demanda y surge el mercado informal; si fija un suelo, aparece el exceso de oferta. Nadie controla un mercado entero: por eso hay precios distintos en cada lugar.
- **Visual**: diagrama de dos flechas que empujan (demanda empuja el precio hacia arriba, oferta hacia abajo) hacia un punto de equilibrio, más una tabla "Qué pasa si el precio es alto / bajo" (qué pasa con compradores, vendedores, precio).
- **Ejemplo resuelto**: la fruta de un mercado. Con 100 cajas y 150 personas que quieren comprar, el precio sube y quedan menos cajas; con 100 cajas y 60 personas, sobra fruta y el precio baja. Se calcula el cambio y se comprueba con la regla del exceso.
- **Remisiones**: "Inflación: por qué todo sube de precio" (Finanzas personales): la inflación es un exceso de demanda agregado; hacia adelante: "Competencia y monopolios" y "El sistema financiero".
- **Fuentes a buscar**: CORE Economics (mercado y formación de precios; precios y oferta), Khan Academy en español (mercado, precios y control de precios), OpenStax (capítulos 3 y 4, apoyo) y, si se puede, un banco central o organismo público que explique cómo los precios suben en la economía real.

## 4. Competencia y monopolios

- **Apertura**: en tu ciudad hay diez tiendas de alimentación y una sola empresa de internet o de agua: ¿por qué no todas compiten?
- **Términos**:
  - **competencia**: varias empresas vendiendo lo mismo, así que pelean por el cliente;
  - **monopolio**: un solo vendedor en un mercado, sin rival directo;
  - **monopolio natural**: el que aparece cuando una sola empresa es más barata que varias (redes de agua, luz, vías).
- **Idea central**: la competencia empuja el precio a la baja y obliga a mejorar el servicio. El monopolio, sin rival, puede subir precios; por eso muchos países lo regulan. Pero a veces el monopolio es el resultado de algo útil: una sola red es más eficiente que tres, y por eso "monopolio" no es siempre "malo" ni "bueno": depende de si hay un regulador que vigile el precio. Se explica también que entrar en un mercado no es fácil (barreras de entrada) y que hay mercados con pocas empresas grandes (oligopolio), sin tratarlo como término nuevo en negritas.
- **Visual**: tabla comparativa "Con competencia / Con un solo vendedor" (precio, calidad, poder de negociación, quién puede entrar) y un diagrama con los dos casos (varias flechas hacia el cliente frente a una sola).
- **Ejemplo resuelto**: tres tiendas de alimentación de un pueblo: dos compiten y una es la única que vende un producto (cifras de ejemplo). Se calcula el precio promedio de las que compiten y se compara con el de la única; se concluye qué le pasa al consumidor y a la empresa con monopolio. Cierre: por qué un tope de precio a un monopolio no funciona como con la competencia.
- **Remisiones**: hacia adelante: "Qué es una empresa", "Ingresos, costos y utilidad" y "Cómo fijar un precio de venta" (unidad "Empresas"); "Porcentajes" (Matemáticas) para el promedio de precios del ejemplo. No hay remisión a "Bancos y seguridad": es título de unidad y no trata de monopolios de servicios.
- **Fuentes a buscar**: Khan Academy en español (monopolio, competencia, barreras de entrada), CORE Economics (competencia y empresas, unidad de monopoly), OpenStax (capítulos 10 a 12, apoyo en inglés) y un organismo de competencia o consumo (CONDUSEF, SERNAC, CNMV o equivalente) sobre por qué se regulan los monopolios.

## Reglas de la unidad

- **Términos en inglés**: la primera vez, el término en español y el original en `<span lang="en">`: escasez (<span lang="en">scarcity</span>), costo de oportunidad (<span lang="en">opportunity cost</span>), oferta (<span lang="en">supply</span>), demanda (<span lang="en">demand</span>), monopolio (<span lang="en">monopoly</span>).
- **Cifras**: las cantidades y precios de los ejemplos son de ejemplo y se dicen ("cifras de ejemplo"). Si una fuente da un dato real, va con país y año, y con "revisa el dato vigente en tu país".
- **Sin marcas ni empresas**: ni tiendas, ni bancos, ni países concretos en los ejemplos. Los organismos oficiales sí se nombran.
- **Remisiones**: los títulos citados entre comillas tienen que existir en `js/temario.js`.
- **Gráficas**: la de oferta y demanda se dibuja con `G` (`window.grafica`), con `descripcion` obligatoria y los ejes rotulados en palabras ("precio", "cantidad"), sin depender del color.
- **Ejercicios**: `numero`, `opciones`, `texto` y `ordenar`. Respuestas numéricas escritas como operación, con `tolerancia` cuando haya redondeo.
