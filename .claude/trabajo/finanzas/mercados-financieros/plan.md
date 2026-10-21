# Plan · finanzas · Unidad 5: Mercados financieros

- Archivo destino: `lecciones/finanzas/mercados-financieros.js` (materia `finanzas`).
- Ficha: `.claude/trabajo/finanzas/mercados-financieros/ficha.md`.
- 4 lecciones, 6 ejercicios cada una.
- No hay reglas propias de la materia (`.claude/docs/materias/finanzas.md` no existe): mandan `.claude/docs/contenido.md` y `.claude/docs/formato-leccion.md`, más las reglas de la unidad que están al final de este plan.
- Quinta unidad de "Finanzas y economía": las unidades 1 ("Conceptos de economía"), 2 ("El sistema financiero"), 3 ("La economía de un país") y 4 ("Empresas") ya están escritas. De la unidad 1 se dan por sabidos oferta, demanda, precio de equilibrio, intermediación, banco central, tasa oficial y tipo de cambio. De la unidad 2: que la tasa oficial mueve el crédito y los precios. De la unidad 3: el efecto de las tasas sobre la economía. De la unidad 4: qué es una empresa, ingresos, costos y utilidad, y por qué una empresa emite acciones o bonds.

## Cuts con el material ya escrito (esto es lo importante de esta unidad)

El repo ya tiene el manual de esta unidad. "Instrumentos de inversión: deuda, fondos y acciones" (finanzas personales) explica qué es una acción, un bono y un fondo, sus riesgos y cómo se gana con cada uno, y deja esta promesa textual: *"En la materia Finanzas y economía, en la unidad Mercados financieros, verás con más detalle las acciones, los bonos y la bolsa de valores"*.

| Lección de esta unidad | Ya está escrito en | Corte |
|---|---|---|
| 1. Acciones | "Instrumentos de inversión: deuda, fondos y acciones" (qué es una acción, los dividendos, vender más caro, "lo que una acción hizo en el pasado no garantiza lo que hará en el futuro") | Aquí va **de dónde sale el precio**: la empresa, las expectativas y la oferta y la demanda. Los dividendos y la venta se remiten, no se repiten. |
| 2. Bonos | la misma lección (renta fija, sus tres riesgos, letras y bonos del Tesoro) | Aquí van **las piezas del bono**: cupón, valor nominal, fecha de vencimiento y por qué su precio baja cuando suben las tasas. La renta fija como tal se remite. |
| 3. La bolsa de valores | nada (solo la promesa de arriba) | Tierra libre. |
| 4. Burbujas y crisis financieras | "Crisis históricas y lo que nos enseñaron" (1929, 1994, 2001, 2008), "Esquemas piramidales y promesas de dinero fácil", "Señales de alerta de una crisis", "Qué es una crisis económica" | Aquí va **la mecánica de la burbuja**: por qué el precio se dispara, por qué se rompe y por qué arrastra a la economía real. Las crisis ya contadas se remiten. |

Solapamientos internos a vigilar: las lecciones 1 y 2 comparten el mismo eje (los riesgos de la renta fija ya están escritos) y las lecciones 3 y 4 se tocan (un crash es una caída de la bolsa). Cada una dice qué toma de la anterior y qué añade.

## 1. Acciones

- **Apertura**: dos personas tienen acciones de la misma empresa. Una dice "esa empresa es un negocio redondo" y la otra "me dijeron que el mes que viene gana mucho". ¿Quién tiene razón? El precio de la acción no lo decide ninguno de los dos.
- **Términos (máximo 3 en negritas)**:
  - **acción**: un pedacito de una empresa, que se puede comprar y vender;
  - **dividendo**: la parte de las ganancias que la empresa reparte a sus accionistas;
  - **expectativas**: lo que la gente cree que va a pasar, y de eso depende el precio.
- **Idea central**: ser accionista es tener un pedacito de una empresa. El precio de ese pedacito no lo pone la empresa: lo pone lo que todos esperan que va a pasar. Si la empresa va bien, la acción vale más; si cambia la expectativa, el precio cae aunque la empresa no haya cerrado peor. Por eso el mercado reacciona a lo que espera, no a lo que ya pasó: una buena noticia anunciada puede hacer bajar la acción, porque ya estaba descontada.
- **Visual**: diagrama con `caja` y `flecha` de la cadena "la empresa produce → alguien compra acciones → la empresa usa ese dinero → crece o se encoge → la acción vale más o menos", más una gráfica con `G` donde la curva de demanda de la acción se desplaza cuando cambian las expectativas, con los ejes rotulados en palabras ("cantidad de acciones", "precio de la acción").
- **Ejemplo resuelto**: una panadería que quiere crecer y vende una parte de su empresa en acciones (cifras de ejemplo). Se explica quién es accionista y qué gana, cómo cambia el precio de la acción según lo que se espera del negocio, y por qué el precio puede moverse el mismo día que salen las noticias.
- **Remisiones**: "Instrumentos de inversión: deuda, fondos y acciones" (finanzas personales), "Oferta y demanda" (unidad 1), "Ingresos, costos y utilidad" (unidad 4, para el dividendo como reparto de la utilidad).
- **Fuentes a buscar**: revista CONDUSEF *Glosario de inversión para principiantes* (2022: capital, rendimiento, plazo, riesgo, y la recomendación de no poner todo el capital en un solo instrumento), revista CONDUSEF *Mejora tu futuro con acciones en el presente* (2024), CORE Econ en español capítulo 7 (la empresa que produce bienes diferenciados escoge precio y cantidad para maximizar sus beneficios, considerando la demanda), Wikipedia en español *Acción (finanzas)* (solo apoyo).

## 2. Bonos

- **Apertura**: un bono dice "te pagaré $60 al año durante cinco años y te devolveré $1 000 al final". ¿Y si dentro de dos años cambias de opinión y quieres tu dinero antes? ¿Cuánto te pagan?
- **Términos**:
  - **bono**: un préstamo con fecha de devolución y pagos periódicos;
  - **cupón**: el pago que recibes cada año por tu bono;
  - **valor nominal**: la cantidad que el bono devuelve al final.
- **Idea central**: un bono es un préstamo que le haces a un gobierno o a una empresa, con fecha de devolución y pago periódico. Y el detalle que sorprende: si vendes el bono antes de tiempo, su precio ya no es el que te pagarán. Baja cuando las tasas de interés suben, porque hay bonos nuevos que pagan más, y sube cuando bajan. Por eso "renta fija" no significa "rendimiento fijo": lo fijo es el cupón, no el precio.
- **Visual**: diagrama del flujo del dinero en el tiempo (quien emite → pagos con cupón cada año → devolución del valor nominal al final) sobre una línea de tiempo, más una gráfica con `G` de dos rectas que muestran qué pasa con el precio del bono cuando las tasas suben o bajan, con los ejes rotulados en palabras.
- **Ejemplo resuelto**: un bono de $1 000 al 6 %, con cupón de $60 al año y devolución a los cinco años (cifras de ejemplo). Se calcula lo que recibe quien lo tiene, y se muestra qué pasa si, antes de que venza, las tasas suben al 8 %: el bono nuevo paga más, así que el viejo vale menos en el mercado, y quien lo quiere vender recibe menos de lo que le devolverán al final.
- **Remisiones**: "Instrumentos de inversión: deuda, fondos y acciones" (finanzas personales), "Interés simple" (finanzas personales), "Tasas de interés y su efecto en la economía" (unidad 3).
- **Fuentes a buscar**: revista CONDUSEF *Glosario de inversión para principiantes* (2022), Wikipedia en español *Bono* (solo apoyo; el slug "Bono (economía)" da 404 y el correcto es "Bono"), CORE Econ en español capítulos 7 y 15 (los precios de los activos y las tasas), y la revista CONDUSEF o un organismo público que explique los bonos del Tesoro (busca con el buscador de la revista: `https://revista.condusef.gob.mx/?s=bonos+del+tesoro`).

## 3. La bolsa de valores

- **Apertura**: quieres vender tus acciones de una empresa y tu amigo quiere comprar. ¿Se pisan en la calle? ¿Alguien les pone un precio encima?
- **Términos**:
  - **bolsa de valores**: el mercado donde se compran y venden acciones y bonos;
  - **intermediario**: quien ejecuta las operaciones por ti;
  - **índice**: el número que resume cómo va un grupo de empresas.
- **Idea central**: la bolsa es un mercado donde se compran y venden acciones y bonos, y los precios los fija la oferta y la demanda. Pero tiene un rasgo que la vuelve distinta de un mercado cualquiera: **nadie compra directamente a otro inversionista**. Las órdenes pasan por un intermediario, y el precio que ves no es el de tu operación, sino el de la última que se hizo. Por eso hay que distinguir el precio de la acción del valor de la empresa: el primero es una expectativa compartida.
- **Visual**: diagrama del recorrido de una orden (tú → intermediario → la bolsa → quien vende) con las flechas rotuladas, más una tabla con tres preguntas: quién compra y quién vende, quién fija el precio, y qué pasa con tu orden.
- **Ejemplo resuelto**: dos amigos, uno quiere vender sus acciones de una empresa y el otro comprarlas. Ninguno de los dos puede tratar el asunto directamente: hace falta un intermediario, y el precio al que se cierra no lo decide ninguno de los dos. Se añade qué es un índice y para qué sirve: un número que resume cómo va un grupo de empresas, para no tener que mirar todas una por una.
- **Remisiones**: "Instrumentos de inversión: deuda, fondos y acciones" (finanzas personales), "Oferta y demanda" y "Mercados y formación de precios" (unidad 1).
- **Fuentes a buscar**: revista CONDUSEF *La Bolsa de Valores para Dummies* (2018: "un tipo de mercado en el que se puede vender y comprar una gran variedad de instrumentos de inversión", la fijación de precios por brokers, los ofertantes son empresas y los demandantes se vuelven accionistas, y la fluctuación depende de la oferta y la demanda), revista CONDUSEF *BIVA te explica el mercado de valores* (2023), Wikipedia en español *Bolsa de valores* (solo apoyo).

## 4. Burbujas y crisis financieras

- **Apertura**: en un pueblo, todos compran las mismas cajas de coleccionables porque "el año pasado valían el doble". Nadie las necesita para nada. ¿Por qué siguen subiendo?
- **Términos**:
  - **burbuja**: cuando el precio de algo se aleja de lo que vale y lo empuja la expectativa de que siga subiendo;
  - **burbuja especulativa**: la que se sostiene en la esperanza de vender más caro, no en el uso de la cosa;
  - **crisis financiera**: cuando el problema de los precios llega a los bancos y al trabajo de la gente.
- **Idea central**: una burbuja es cuando el precio de un activo se aleja de lo que vale en la realidad, y lo que lo empuja es la expectativa de que suba. El motor es siempre el mismo: comprar porque todos compran, lo que hace subir el precio, lo que hace subir la expectativa, lo que trae más gente. Y el que compró con dinero prestado amplifica la caída, porque tiene que vender sí o sí aunque el precio se derrumbe. Las crisis no son solo de la bolsa: cuando el dinero que financiaba la economía es el mismo que se está valorando mal, el problema salta a las calles.
- **Visual**: gráfica con `G` del precio de un activo subiendo y bajando en forma de montaña rusa, con la zona de burbuja marcada y la crista donde nadie sabe si el precio es real; al lado, un diagrama de la cadena "expectativa → compra → el precio sube → más expectativa → más compra" y su reverso cuando se rompe.
- **Ejemplo resuelto**: la mania de las cajas de coleccionables en un pueblo (cifras de ejemplo). Todos compran porque el año pasado valían el doble; quien entra con prestado compra más y empuja más el precio; cuando uno empieza a dudar, el que no puede tolerate vender tira el precio abajo. Se cierra con por qué una crisis no se queda en las cuentas de quien invirtió: los bancos que prestaron para comprar, el trabajo de la gente y el crédito de todo lo demás.
- **Remisiones**: "Crisis históricas y lo que nos enseñaron" (finanzas personales: las cuatro crisis ya contadas), "Señales de alerta de una crisis" (finanzas personales), "Esquemas piramidales y promesas de dinero fácil" (finanzas personales), "Qué es una empresa" (unidad 4, para quién emite acciones y bonds).
- **Fuentes a buscar**: CORE Econ en español capítulo 17 (La Gran Depresión, la edad de oro y la crisis financiera mundial: la burbuja inmobiliaria, el desplome de los precios de la vivienda, los bancos-PAÍS que se habían_flash_endorsed, y los países que no tuvieron burbuja y evitaron la crisis), Federal Reserve History *Stock Market Crash of 1929* y *Stock Market Crash of 1987* (en inglés), Wikipedia en español *Burbuja económica* (solo apoyo; los slugs "Burbuja financiera" y "Burbuja especulativa" dan 404 o son la misma página).

## Reglas de la unidad

- **Términos en inglés**: la primera vez, el término en español y el original en `<span lang="en">`: acción (<span lang="en">share</span>), dividendo (<span lang="en">dividend</span>), expectativas (<span lang="en">expectations</span>), bono (<span lang="en">bond</span>), cupón (<span lang="en">coupon</span>), valor nominal (<span lang="en">face value</span>), bolsa de valores (<span lang="en">stock exchange</span>), intermediario (<span lang="en">broker</span>), índice (<span lang="en">index</span>), burbuja (<span lang="en">bubble</span>), burbuja especulativa (<span lang="en">speculative bubble</span>), crisis financiera (<span lang="en">financial crisis</span>).
- **Cifras**: las cantidades y precios de los ejemplos son de ejemplo y se dicen ("cifras de ejemplo"). Si una fuente da un dato real, va con país y año, y con "revisa el dato vigente en tu país".
- **Sin marcas ni empresas**: ni bolsas, ni bancos, ni países concretos en los ejemplos. Los organismos oficiales sí se nombran.
- **Remisiones**: los títulos citados entre comillas tienen que existir en `js/temario.js`. Los títulos de unidad ("Bancos y seguridad") no valen como remisión.
- **Marcadores de país**: los datos que no son de un país o lugar concreto NO llevan marcador (nada de `(global)` ni inventos). Solo los de un país concreto llevan `(País, año)`.
- **Gráficas**: las de las lecciones 1, 2 y 4 se dibujan con `G` (`window.grafica`), con `descripcion` obligatoria y los ejes rotulados en palabras, sin depender del color.
- **Ejercicios**: `numero`, `opciones`, `texto` y `ordenar`. Respuestas numéricas escritas como operación, con `tolerancia` cuando haya redondeo.
- **Prohibido repetir**: no volver a explicar qué es una acción, un bono o un fondo, ni sus riesgos, ni los dividendos ni la venta más caro ("Instrumentos de inversión: deuda, fondos y acciones"); ni las cuatro crisis una por una ("Crisis históricas y lo que nos enseñaron"); ni la oferta y la demanda ("Oferta y demanda" y "Mercados y formación de precios"); ni las políticas monetarias de la unidad 2 ("Bancos centrales y política monetaria"); ni qué es una empresa ("Qué es una empresa").
- **Continuidad con las unidades anteriores**: esta unidad cumple la promesa que "Instrumentos de inversión: deuda, fondos y acciones" dejó escrita, así que el texto debe reconocerla sin romper el tono.
