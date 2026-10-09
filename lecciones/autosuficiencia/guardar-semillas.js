// Autosuficiencia · Unidad 6: Guardar tus propias semillas.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Seguridad: semillas tratadas (NPIC), gorgojo en congelador (OSU), papa de semilla certificada (Iowa).
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('autosuficiencia', titulo, datos);
  // Flecha: línea hasta la base de la punta + triángulo sólido como punta.
  const flecha = (desde, hasta, serie = 0, escala = 1) => {
    const dx = hasta[0] - desde[0], dy = hasta[1] - desde[1], largo = Math.hypot(dx, dy);
    const ux = dx / largo, uy = dy / largo, h = 0.35 * escala, w = 0.17 * escala;
    const base = [hasta[0] - h * ux, hasta[1] - h * uy];
    return [
      { tipo: 'linea', desde, hasta: base, serie },
      { tipo: 'poligono', puntos: [hasta, [base[0] - w * uy, base[1] + w * ux], [base[0] + w * uy, base[1] - w * ux]], solido: true, serie },
    ];
  };
  const txt = (x, y, texto) => ({ tipo: 'texto', x, y, texto });
  const diagrama = (x, y, figuras, descripcion) => G({ x, y, figuras, descripcion, proporcional: true, ejes: false });
  const elipse = (cx, cy, rx, ry, relleno = false) => ({ tipo: 'poligono', relleno, puntos: Array.from({ length: 36 }, (_, i) => [cx + rx * Math.cos((i * Math.PI) / 18), cy + ry * Math.sin((i * Math.PI) / 18)]) });
  // Gráfica de barras de una sola serie (como en matematicas/estadistica.js): etiquetas abajo, valor encima.
  function barras({ etiquetas, valores, max, paso, descripcion, sufijo = '' }) {
    const n = valores.length;
    const figuras = valores.flatMap((v, i) => [
      { tipo: 'poligono', puntos: [[i + 0.15, 0], [i + 0.85, 0], [i + 0.85, v], [i + 0.15, v]], solido: true },
      txt(i + 0.5, -max * 0.07, etiquetas[i]),
      txt(i + 0.5, v + max * 0.05, `${v}${sufijo}`),
    ]);
    return G({ x: [0, n], y: [-max * 0.12, max * 1.1], pasos: [1e9, paso], nombres: false, figuras, descripcion });
  }

  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const IOWA = (ruta, nombre) => ({ nombre: `Extensión de la Universidad Estatal de Iowa: ${nombre} (en inglés)`, url: `https://yardandgarden.extension.iastate.edu/how-to/${ruta}` });
  const ILLSAVE = { nombre: 'Extensión de la Universidad de Illinois: How to Save Seeds (en inglés, PDF)', url: 'https://extension.illinois.edu/sites/default/files/how_to_save_seeds_062021.pdf' };
  const ILLGERM = { nombre: 'Extensión de la Universidad de Illinois: Are my seeds still good? Testing seed germination (en inglés)', url: 'https://extension.illinois.edu/blogs/good-growing/2023-01-20-are-my-seeds-still-good-testing-seed-germination' };
  const OSUSEM = { nombre: 'Servicio de Extensión de la Universidad Estatal de Oregon: Collecting and storing seeds from your garden (en inglés)', url: 'https://extension.oregonstate.edu/es/node/100476/printable/print' };
  const BIOV = { nombre: 'Bioversity International: Bancos comunitarios de semillas, concepto y práctica. Manual para el facilitador', url: 'https://cgspace.cgiar.org/items/9267554e-55cb-4bd3-bef5-8636d3a9b438' };
  const CROPTRUST = { nombre: 'Crop Trust: Svalbard Global Seed Vault (en inglés)', url: 'https://croptrust.org/our-work/svalbard-global-seed-vault/' };
  const SSE = { nombre: 'Seed Savers Exchange: Isolation Methods (en inglés)', url: 'https://www.seedsavers.org/isolation-distances' };
  const UCMGUIA = { nombre: 'Guía para la recolección de semillas de los vegetales más comunes (traducción de The Seed Savers’ Handbook, PDF)', url: 'https://www.ucm.es/data/cont/media/www/pag-56047/Guia_de_semillas.pdf' };
  const NPIC = { nombre: 'Centro Nacional de Información de Pesticidas (NPIC): Treated Seeds (en inglés)', url: 'https://npic.orst.edu/ingred/ptype/treated-seed.html' };

  // ------------------------------------------------------------------
  L('Por qué guardar tus propias semillas', {
    objetivo: 'Explicar qué ganas al guardar tus propias semillas, de qué plantas conviene guardarlas y por qué es un trabajo que se hace en comunidad.',
    explicacion: `
      <p>Cada fruto que cosechas trae dentro la siguiente cosecha. Un solo jitomate tiene decenas de semillas; una mazorca, cientos. Durante miles de años, las familias campesinas no compraron semilla: la guardaron de lo mejor de su cosecha. Esta unidad te enseña a hacer lo mismo.</p>
      <h3>Qué ganas</h3>
      <p>La Extensión de la Universidad de Illinois resume las razones para guardar semillas:</p>
      <ul>
        <li>Ahorras dinero, porque ya no necesitas comprar sobres de semilla ni plántulas cada temporada.</li>
        <li>Ganas autosuficiencia: si un año no hay semilla en la tienda o sube de precio, tú tienes la tuya.</li>
        <li>Ayudas a conservar la diversidad genética, es decir, la gran variedad de plantas distintas que existen.</li>
        <li>Conoces el ciclo completo de la planta, de semilla a semilla.</li>
        <li>Al compartir semillas con otras personas, se fortalece tu comunidad.</li>
      </ul>
      <h3>Semillas que se adaptan a tu lugar</h3>
      <p>Hay otra ganancia que no se ve el primer año. Una <strong>variedad</strong> es un grupo de plantas de la misma especie con rasgos que las distinguen, como un maíz azul o un jitomate de bola. Cuando cada año siembras tu semilla y guardas la de las plantas que mejor crecieron en tu huerto, esa variedad se va acostumbrando a tu clima, a tu suelo y a tus plagas. A ese proceso se le llama <strong>adaptación</strong>. Es exactamente lo que hicieron las comunidades con el maíz criollo, como viste en "Tipos de semilla". Una semilla comprada viene de otro lugar; la tuya, poco a poco, se vuelve de aquí.</p>
      <h3>De qué plantas sí y de cuáles no</h3>
      <p>No todas las semillas sirven para guardar. Como viste en "Tipos de semilla", la de un híbrido F1 no da plantas iguales a su madre. La Extensión de Illinois recomienda guardar semilla de variedades de polinización abierta y criollas, porque tienen rasgos estables, y dejar los híbridos.</p>
      <p>Algunas plantas, además, son mucho más fáciles que otras. Illinois señala que el chícharo, el frijol, la lechuga y el jitomate son ideales para empezar: no necesitan que las separes de otras variedades y bastan pocas plantas para obtener buena semilla. En las siguientes lecciones verás por qué.</p>
      <h3>Lo que vas a aprender</h3>
      <p>Guardar semillas tiene cuatro pasos, y cada uno tiene su lección en esta unidad:</p>
      <ol>
        <li>Evitar que tus plantas se crucen con otras variedades, en "Polinización".</li>
        <li>Elegir las mejores plantas, en "Elegir las mejores plantas para sacar semilla".</li>
        <li>Cosechar, limpiar y secar la semilla, según el tipo de planta.</li>
        <li>Guardarla bien y saber cuánto dura.</li>
      </ol>
      <p>Al final verás cómo compartir semillas en tu comunidad.</p>
      <h3>Empieza pequeño</h3>
      <p>Como viste en la primera unidad, conviene empezar por un paso que puedas sostener. Elige una planta fácil, como el frijol o el jitomate, de una variedad que te guste y que no sea híbrida. Este año, guarda su semilla. El próximo año, siémbrala y compara. Cuando domines esa, agrega otra.</p>
      <p class="nota"><strong>Trampa común:</strong> guardar semilla de un jitomate híbrido comprado en el mercado y esperar que salga igual. Sus hijas saldrán distintas; empieza con variedades de polinización abierta.</p>`,
    ejemplo: `
      <p>Cada año compras 4 sobres de semilla de $35 cada uno: frijol, jitomate, lechuga y chile. Si guardas tu propia semilla y solo compras los 4 sobres el primer año, ¿cuánto ahorras en 5 años?</p>
      <ol class="pasos-ej">
        <li>Primero calcula lo que gastas en un año: 4 × 35 = $140.</li>
        <li>Si compraras todos los años, en 5 años gastarías 140 × 5 = $700.</li>
        <li>Guardando semilla, solo pagas el primer año: $140.</li>
        <li>El ahorro es la diferencia: 700 − 140 = $560.</li>
        <li>Comprueba: los 4 años que no compras son 4 × 140 = $560, lo mismo.</li>
      </ol>
      <p>Resultado: <span class="resultado">ahorras $560 en 5 años</span>, y además tus semillas se van adaptando a tu huerto. Si un año no consigues semilla en la tienda, ese ahorro se vuelve algo todavía más valioso: tener qué sembrar.</p>
      <p class="nota"><strong>Error común:</strong> restar los 5 años completos. El primer año sí compras.</p>`,
    vidaReal: `
      <p>Guardar tus semillas cambia tu relación con el huerto:</p>
      <ul>
        <li>Dejas de depender de que la tienda tenga la semilla que necesitas.</li>
        <li>Conservas la variedad de frijol o de maíz que tu familia siembra desde hace años.</li>
        <li>Puedes regalar o intercambiar semillas con tus vecinos.</li>
        <li>Tus plantas se van acostumbrando a tu clima con cada temporada.</li>
        <li>Aprendes a observar tus plantas de principio a fin, de la semilla a la semilla.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Gastas $120 al año en semillas. Si guardas las tuyas y solo compras el primer año, ¿cuánto ahorras en 4 años?</p>', respuesta: 120 * 3,
        pista: '<p>Solo dejas de comprar los años después del primero.</p>',
        solucion: '<p>Dejas de comprar 3 años: 3 × 120 = <strong>$360</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un jitomate tiene unas 80 semillas. Si guardas las de 3 jitomates, ¿cuántas semillas obtienes, más o menos?</p>', respuesta: 80 * 3,
        pista: '<p>Multiplica las semillas por el número de jitomates.</p>',
        solucion: '<p>80 × 3 = <strong>240 semillas</strong>, mucho más de lo que necesitas para un huerto.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿De qué plantas conviene guardar semilla?</p>',
        opciones: ['De híbridos F1', 'De variedades de polinización abierta y criollas', 'De cualquier planta, da igual'], correcta: 1,
        pista: '<p>Recuerda cuáles salen iguales a su madre.</p>',
        solucion: '<p><strong>De variedades de polinización abierta y criollas</strong>, que tienen rasgos estables.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Illinois, ¿cuál de estas plantas es buena para empezar a guardar semillas?</p>',
        opciones: ['El frijol', 'La zanahoria', 'La cebolla'], correcta: 0,
        pista: '<p>Busca la que no necesita separarse de otras variedades.</p>',
        solucion: '<p><strong>El frijol.</strong> Se poliniza solo y bastan pocas plantas. La zanahoria y la cebolla son más difíciles.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué significa que una variedad se adapte a tu huerto?</p>',
        opciones: ['Que crece más rápido el primer año', 'Que ya no necesita agua', 'Que, guardando cada año la semilla de las mejores plantas, se acostumbra a tu clima y tu suelo'], correcta: 2,
        pista: '<p>Es un proceso de varios años.</p>',
        solucion: '<p><strong>Que se acostumbra a tu clima y tu suelo</strong> año con año.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama un grupo de plantas de la misma especie con rasgos que las distinguen, como un maíz azul?</p>',
        respuestas: ['variedad', 'una variedad', 'la variedad', 'variedades', 'cultivar'],
        pista: '<p>Empieza con "var".</p>',
        solucion: '<p>Una <strong>variedad</strong>.</p>' },
    ],
    fuentes: [ILLSAVE, IOWA('how-harvest-and-store-seeds', 'How to Harvest and Store Seeds'), WIKI('Semilla', 'Semilla')],
  });

  // ------------------------------------------------------------------
  L('Polinización: cómo evitar que tus semillas se crucen', {
    objetivo: 'Distinguir las plantas que se polinizan solas de las que se cruzan, y usar el tiempo, las barreras o la distancia para que tus semillas salgan iguales a su madre.',
    explicacion: `
      <p>Siembras dos variedades de calabaza una junto a otra: una calabacita y una calabaza de Castilla. Este año cosechas frutos normales de las dos. Guardas semillas, y el año siguiente nacen calabazas raras, que no se parecen a ninguna. ¿Qué pasó? Las abejas llevaron polen de una a la otra, y las semillas salieron mezcladas.</p>
      <h3>Polinizarse solas o cruzarse</h3>
      <p>La Extensión de la Universidad de Illinois distingue dos grupos de plantas:</p>
      <ul>
        <li>Las de <strong>autopolinización</strong> reciben el polen de la misma flor o de la misma planta. Muchas tienen flores que se fecundan antes de abrirse, así que casi no se cruzan con otras. Ejemplos: frijol, chícharo, lechuga y jitomate.</li>
        <li>Las de <strong>polinización cruzada</strong> reciben el polen de otras plantas, llevado por los insectos o el viento. Ejemplos: maíz, calabaza, pepino, cebolla y zanahoria.</li>
      </ul>
      <p>Las primeras son las más fáciles para guardar semilla. Con las segundas hay que tener cuidado.</p>
      <h3>¿Quién se cruza con quién?</h3>
      <p>Illinois aclara una idea equivocada muy común: plantas de la misma familia, como el pepino, la calabaza y la sandía, no se cruzan entre sí. Solo se cruzan variedades de la misma especie. La Extensión de la Universidad Estatal de Iowa da un ejemplo: la calabacita, la calabaza de Castilla y algunos guajes son de la misma especie, <span lang="la">Cucurbita pepo</span>, y se cruzan entre ellas; el melón y el pepino son especies distintas y no se cruzan.</p>
      <p>Iowa explica también algo que confunde: el cruce no cambia el fruto de este año, solo las semillas que lleva dentro. Por eso la calabaza se ve normal, pero sus hijas salen distintas, como viste en Herencia. El maíz es una excepción: como viste en "Cultivar maíz", el grano que recibe polen de otro maíz cambia ese mismo año.</p>
      <h3>Tres formas de aislar</h3>
      <p>El <strong>aislamiento</strong> es impedir que tus plantas reciban polen de otra variedad. Illinois describe tres formas:</p>
      <ul>
        <li>Por tiempo: siembra las variedades en fechas distintas, para que no florezcan al mismo tiempo.</li>
        <li>Con barreras: cubre las flores o la planta con una bolsa de papel, tela de malla o una cubierta flotante. Después polinizas a mano, pasando el polen con un hisopo o un pincel de la flor correcta.</li>
        <li>Por distancia: siembra las variedades lejos una de otra.</li>
      </ul>
      <p>Iowa añade la forma más sencilla: sembrar una sola variedad de cada especie por temporada.</p>
      <h3>¿Qué tan lejos?</h3>
      <p>Illinois publica estas distancias recomendadas por Seed Savers Exchange, una organización que guarda semillas:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Planta</th><th>Cómo se poliniza</th><th>Distancia recomendada</th></tr>
        <tr><th>Frijol, chícharo, lechuga</th><td>Sola</td><td>3 a 6 m</td></tr>
        <tr><th>Jitomate</th><td>Sola o con insectos</td><td>3 a 15 m</td></tr>
        <tr><th>Chile</th><td>Sola o con insectos</td><td>91 a 488 m</td></tr>
        <tr><th>Calabaza, pepino, cebolla, zanahoria</th><td>Insectos</td><td>244 a 805 m</td></tr>
        <tr><th>Maíz</th><td>Viento</td><td>244 a 805 m</td></tr>
        <tr><th>Espinaca, betabel</th><td>Viento</td><td>244 m a 1.6 km</td></tr>
      </table></div>
      <p>Fíjate en el patrón: las que se polinizan solas necesitan pocos metros; las que dependen del viento o de los insectos, cientos. Si no tienes esa distancia, usa el tiempo o las barreras.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que el pepino se cruza con la calabaza. Solo se cruzan variedades de la misma especie.</p>`,
    ejemplo: `
      <p>Tienes un huerto de 20 m de largo y quieres guardar semilla de dos variedades de jitomate y de dos de chile. ¿Para cuáles alcanza la distancia?</p>
      <ol class="pasos-ej">
        <li>Primero busca el jitomate en la tabla: necesita de 3 a 15 m. Si siembras una variedad en cada extremo del huerto, quedan unos 20 m entre ellas, más que 15. Sí alcanza.</li>
        <li>Ahora el chile: necesita de 91 a 488 m. Tus 20 m no alcanzan ni el mínimo.</li>
        <li>Para el chile usa otra forma de aislar: siembra una variedad este año y la otra el próximo, o cubre algunas flores con tela de malla.</li>
        <li>Comprueba la diferencia: 91 ÷ 20 ≈ 4.5, es decir, el chile necesita más de 4 veces el largo de tu huerto.</li>
      </ol>
      <p>Resultado: <span class="resultado">alcanza para el jitomate, no para el chile</span>.</p>
      <p class="nota"><strong>Error común:</strong> usar la misma distancia para todas las plantas. Cada una se poliniza distinto.</p>`,
    vidaReal: `
      <p>Saber cómo se polinizan tus plantas te ahorra sorpresas:</p>
      <ul>
        <li>Tus semillas salen iguales a la variedad que te gustó.</li>
        <li>Puedes tener varias variedades en un huerto pequeño, sembrándolas en épocas distintas.</li>
        <li>Si te salen calabazas raras, sabes por qué pasó.</li>
        <li>Puedes ponerte de acuerdo con tus vecinos para no cruzar sus variedades.</li>
        <li>Eliges qué cultivos guardar según el espacio que tienes.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Según la tabla, la calabaza necesita al menos 244 m de aislamiento. Si tu huerto mide 40 m, ¿cuántos metros más necesitarías?</p>', respuesta: 244 - 40,
        pista: '<p>Resta lo que tienes de lo que necesitas.</p>',
        solucion: '<p>244 − 40 = <strong>204 metros</strong> más. Mejor usa el tiempo o las barreras.</p>' },
      { tipo: 'numero', enunciado: '<p>La lechuga necesita de 3 a 6 m de aislamiento. Si siembras dos variedades separadas 8 m, ¿cuántos metros te sobran respecto al máximo?</p>', respuesta: 8 - 6,
        pista: '<p>Compara 8 m con el valor mayor del rango.</p>',
        solucion: '<p>8 − 6 = <strong>2 metros</strong> de sobra.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Se cruza el pepino con la calabaza?</p>',
        opciones: ['Sí, son de la misma familia', 'Solo si están a menos de 1 m', 'No, porque son especies distintas'], correcta: 2,
        pista: '<p>Illinois dice que solo se cruzan variedades de la misma especie.</p>',
        solucion: '<p><strong>No.</strong> Son especies distintas, aunque sean de la misma familia.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tu calabacita se cruzó con una calabaza de Castilla. ¿Qué notas este año?</p>',
        opciones: ['Nada en el fruto; el cambio aparece en las plantas que nazcan de sus semillas', 'Los frutos salen mezclados de inmediato', 'La planta se seca'], correcta: 0,
        pista: '<p>Iowa explica que el cruce no cambia el fruto de este año.</p>',
        solucion: '<p><strong>Nada en el fruto.</strong> El cambio aparece en la siguiente generación.</p>' },
      { tipo: 'opciones', enunciado: '<p>Solo tienes espacio para un huerto pequeño. ¿Cómo evitas que dos variedades de maíz se crucen?</p>',
        opciones: ['Sembrándolas juntas', 'Sembrándolas en temporadas distintas', 'Regándolas menos'], correcta: 1,
        pista: '<p>Si no hay distancia, usa el tiempo.</p>',
        solucion: '<p><strong>Sembrándolas en temporadas distintas</strong>, para que no florezcan al mismo tiempo.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama impedir que tus plantas reciban polen de otra variedad?</p>',
        respuestas: ['aislamiento', 'aislar', 'el aislamiento', 'aislarlas'],
        pista: '<p>Viene de "aislar".</p>',
        solucion: '<p>El <strong>aislamiento</strong>.</p>' },
    ],
    fuentes: [ILLSAVE, IOWA('cross-pollination-between-vine-crops', 'Cross-Pollination Between Vine Crops'), IOWA('how-harvest-and-store-seeds', 'How to Harvest and Store Seeds'), SSE],
  });

  // ------------------------------------------------------------------
  L('Elegir las mejores plantas para sacar semilla', {
    objetivo: 'Escoger de qué plantas guardar semilla, quitar a tiempo las que no son típicas de la variedad y guardar semilla de suficientes plantas para no perder diversidad.',
    explicacion: `
      <p>Imagina que guardas la semilla de la primera lechuga que se espigó en tu huerto, porque fue la primera en dar semillas. El próximo año, tus lechugas se espigan todavía más rápido. Sin querer, elegiste justo lo que no querías. Elegir de qué plantas guardar semilla es tan importante como guardarla bien.</p>
      <h3>Qué es seleccionar</h3>
      <p>La <strong>selección</strong> es elegir, a propósito, de qué plantas guardar semilla para la siguiente siembra. Como las hijas se parecen a sus madres, cada año que eliges bien, tu variedad mejora un poco; si eliges mal, empeora. Así es como, durante miles de años, las comunidades convirtieron plantas silvestres en los cultivos de hoy, como viste con el maíz en "Tipos de semilla".</p>
      <h3>Qué buscar</h3>
      <p>La Extensión de la Universidad Estatal de Iowa recomienda guardar semilla de las plantas que mejor se dieron, fijándose en el color, el sabor, la forma, cómo crece la planta y su resistencia a las enfermedades. La guía para guardar semillas de Seed Savers añade que hay que mirar la planta completa, no solo su mejor fruto. Una gran calabaza en una planta enferma no es buena candidata; una planta sana que aguantó una sequía o que no tuvo plagas cuando las demás sí, lo es.</p>
      <p>Algunos ejemplos de qué elegir:</p>
      <ul>
        <li>En la lechuga, las plantas que tardan más en espigarse, porque así tus lechugas darán hojas por más tiempo.</li>
        <li>En el frijol y el ejote, plantas sanas que dieron muchas vainas.</li>
        <li>En el jitomate, frutos con el sabor y la forma típicos de la variedad, de plantas sanas.</li>
        <li>En el maíz, mazorcas bien llenas de plantas fuertes, que no se cayeron con el viento.</li>
      </ul>
      <h3>Quitar las plantas fuera de tipo</h3>
      <p>A veces aparece una planta que no se parece a las demás de su variedad: más alta, de otro color, de hojas distintas. Es una <strong>planta fuera de tipo</strong>. La guía de Seed Savers recomienda quitarla antes de que florezca, para que su polen no llegue a las plantas que elegiste. Con las plantas de polinización cruzada, como el maíz o la calabaza, esto es muy importante.</p>
      <h3>Marca tus plantas y no te las comas</h3>
      <p>Cuando elijas una planta para semilla, márcala con un listón o una estaca, para que nadie la coseche por error. La misma guía advierte un error común: ir cortando ejotes de todas las plantas y dejar para semilla solo las vainas que sobraron. Es mejor dejar las mejores plantas sin tocar hasta que sus vainas se sequen, y comer las de las demás.</p>
      <h3>¿De cuántas plantas?</h3>
      <p>Guardar semilla de una sola planta, aunque sea la mejor, tiene un riesgo: se pierde diversidad. La guía de Seed Savers explica:</p>
      <ul>
        <li>En las plantas que se polinizan solas, como el frijol, el jitomate o la lechuga, bastan pocas plantas.</li>
        <li>En las cucurbitáceas, como la calabaza, conviene juntar semilla de al menos media docena de frutos y mezclarla.</li>
        <li>En el maíz, el girasol y la cebolla hace falta guardar semilla de muchas plantas; si eliges muy pocas, la variedad pierde rasgos para siempre, como algún color del maíz o su resistencia a ciertas plagas.</li>
      </ul>
      <p>Como viste en Herencia, la variedad dentro de una población es lo que le permite adaptarse a los cambios.</p>
      <p class="nota"><strong>Trampa común:</strong> guardar semilla de la primera planta que da fruto o se espiga. En la lechuga, eso premia justo a las que se espigan antes.</p>`,
    ejemplo: `
      <p>Tienes 30 matas de frijol. Quieres dejar para semilla el 20% de las mejores y comer los ejotes de las demás. ¿Cuántas matas marcas y de cuántas comes?</p>
      <ol class="pasos-ej">
        <li>Primero calcula el 20% de 30: el 10% es 3, así que el 20% es 6 matas.</li>
        <li>Las demás son para comer: 30 − 6 = 24 matas.</li>
        <li>Marca las 6 matas con un listón y no les cortes ejotes; deja que sus vainas se sequen en la planta.</li>
        <li>Comprueba: 6 + 24 = 30, todas las matas.</li>
      </ol>
      <p>Resultado: <span class="resultado">marcas 6 matas para semilla y comes de 24</span>. Como el frijol se poliniza solo, 6 matas bastan para tener buena semilla.</p>
      <p class="nota"><strong>Error común:</strong> cosechar ejotes de todas y dejar para semilla las vainas olvidadas. Esas no son las de las mejores plantas.</p>`,
    vidaReal: `
      <p>Elegir bien tus plantas madre mejora tu huerto año con año:</p>
      <ul>
        <li>Tus lechugas tardan más en espigarse cada temporada.</li>
        <li>Tus plantas aguantan mejor las plagas y la sequía de tu región.</li>
        <li>No pierdes los colores ni los sabores de tu variedad favorita.</li>
        <li>Toda tu familia sabe qué plantas no se deben cosechar.</li>
        <li>Conservas la diversidad que hace fuerte a tu variedad ante los cambios del clima.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Tienes 40 plantas de lechuga y quieres dejar para semilla el 10% que tardó más en espigarse. ¿Cuántas plantas dejas?</p>', respuesta: 40 * 10 / 100,
        pista: '<p>El 10% es dividir entre 10.</p>',
        solucion: '<p>40 ÷ 10 = <strong>4 plantas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Juntas semilla de 6 calabazas con unas 150 semillas cada una. ¿Cuántas semillas tienes en total?</p>', respuesta: 6 * 150,
        pista: '<p>Multiplica el número de calabazas por las semillas de cada una.</p>',
        solucion: '<p>6 × 150 = <strong>900 semillas</strong>, mezcladas de varias plantas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es mejor candidata para semilla?</p>',
        opciones: ['La calabaza más grande, de una planta enferma', 'Una planta sana que aguantó la sequía y dio buenos frutos', 'La primera planta que dio fruto'], correcta: 1,
        pista: '<p>Mira la planta completa, no solo el fruto.</p>',
        solucion: '<p><strong>La planta sana que aguantó la sequía.</strong> Sus hijas pueden heredar esa resistencia.</p>' },
      { tipo: 'opciones', enunciado: '<p>Aparece una mata de maíz de otro color y mucho más alta que las demás de tu variedad. ¿Qué haces?</p>',
        opciones: ['La quitas antes de que florezca', 'Guardas su semilla', 'La dejas y guardas semilla de todas'], correcta: 0,
        pista: '<p>Es una planta fuera de tipo.</p>',
        solucion: '<p><strong>La quitas antes de que florezca</strong>, para que su polen no llegue a las demás.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué no conviene guardar semilla de una sola planta de maíz?</p>',
        opciones: ['Porque el maíz no da semillas', 'Porque una mazorca tiene muy pocas semillas', 'Porque la variedad pierde diversidad y puede perder rasgos para siempre'], correcta: 2,
        pista: '<p>Piensa en la variedad dentro de una población.</p>',
        solucion: '<p><strong>Porque pierde diversidad</strong>, como colores o resistencia a plagas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama elegir a propósito de qué plantas guardar semilla?</p>',
        respuestas: ['seleccion', 'la seleccion', 'seleccionar', 'seleccion de semilla'],
        pista: '<p>Viene de "seleccionar".</p>',
        solucion: '<p>La <strong>selección</strong>.</p>' },
    ],
    fuentes: [IOWA('how-harvest-and-store-seeds', 'How to Harvest and Store Seeds'), UCMGUIA, ILLSAVE],
  });

  // ------------------------------------------------------------------
  L('Semillas secas: maíz, frijol, trigo y arroz', {
    objetivo: 'Cosechar en el punto justo las semillas que se secan en la planta, como el maíz, el frijol, el trigo y el arroz, y protegerlas del gorgojo.',
    explicacion: `
      <p>Las semillas más fáciles de guardar son las que la planta seca por ti: el grano de maíz, el frijol dentro de su vaina, el trigo y el arroz en su espiga. Si las cosechas a tiempo y las proteges de la humedad y de los bichos, pueden durar años.</p>
      <h3>Que se sequen en la planta</h3>
      <p>La Extensión de la Universidad Estatal de Iowa explica que la semilla se cosecha cuando ya maduró por completo, y que las semillas dentro de vainas o cascarillas se dejan secar en la planta. Si el clima se pone muy húmedo o frío antes de que terminen, recomienda arrancar la planta entera y colgarla bajo techo para que termine de madurar.</p>
      <h3>Frijol</h3>
      <p>La <strong>vaina</strong> es la cubierta alargada donde crecen los frijoles. La Extensión de la Universidad Estatal de Oregon indica dejar las vainas en la planta hasta que estén tan secas que suenen al sacudirlas, y vigilarlas, porque algunas variedades se abren y tiran sus semillas. Las vainas se cortan, se terminan de secar en un lugar ventilado y después se desgranan. Como viste en "Cultivar frijol", se poliniza solo, así que basta con separar 3 a 6 metros las variedades.</p>
      <h3>El gorgojo</h3>
      <p>El <strong>gorgojo</strong> es un escarabajo muy pequeño que pone sus huevos en los granos; sus larvas se comen el frijol por dentro y lo dejan lleno de agujeros. Oregon recomienda meter las semillas de frijol en el congelador de 24 a 30 horas para matar los huevos o larvas que pudieran traer. Sácalas, deja que vuelvan a la temperatura del cuarto dentro de su frasco cerrado, para que no se humedezcan, y guárdalas.</p>
      <h3>Maíz</h3>
      <p>Para semilla, la mazorca se deja en la planta hasta que el grano esté duro y seco. Después se terminan de secar colgadas, con las hojas abiertas hacia atrás, en un lugar ventilado. Recuerda dos cosas que viste antes:</p>
      <ul>
        <li>El maíz se cruza con el viento; para que tu semilla salga fiel, aísla tu variedad, como viste en "Polinización".</li>
        <li>Guarda semilla de muchas mazorcas de plantas distintas, no de una sola, para no perder diversidad, como viste en "Elegir las mejores plantas".</li>
      </ul>
      <p>Una forma común es desgranar solo la parte central de cada mazorca, porque los granos de las puntas suelen ser más irregulares.</p>
      <h3>Trigo y arroz</h3>
      <p>Para el trigo y el arroz se siguen los mismos pasos que viste en "Cultivar trigo": cortar las espigas cuando el grano está duro, terminar de secarlas, trillar y aventar. Para semilla, elige las espigas más llenas de las plantas más sanas. Iowa recomienda cribar o aventar varias veces para quitar la mayor parte de la paja.</p>
      <h3>¿Ya está seco?</h3>
      <p>Una semilla seca está dura y suena al moverla en el frasco. Si al apretarla con la uña queda marcada o se siente blanda, todavía tiene humedad y se puede enmohecer guardada. Más detalles de cómo secar y guardar los verás en "Limpiar y secar las semillas" y en "Almacenar semillas".</p>
      <p class="nota"><strong>Trampa común:</strong> guardar el frijol en cuanto se desgrana, sin congelarlo ni secarlo bien. Semanas después, el frasco está lleno de gorgojos o de moho.</p>`,
    ejemplo: `
      <p>Quieres sembrar 2 surcos de frijol de 5 m, y a cada semilla le das 10 cm de surco, y tu semilla germina al 90%. Si cada vaina trae unos 5 frijoles, ¿cuántas vainas secas necesitas guardar?</p>
      <ol class="pasos-ej">
        <li>Primero calcula las plantas que quieres: 5 m son 500 cm, y 500 ÷ 10 = 50 por surco; en 2 surcos, 100 plantas.</li>
        <li>Con 90% de germinación, como viste en "Prueba de germinación", necesitas 100 ÷ 0.9 ≈ 111 semillas.</li>
        <li>Si cada vaina trae 5 frijoles: 111 ÷ 5 ≈ 22.2, así que necesitas 23 vainas.</li>
        <li>Guarda unas cuantas de más por si alguna sale dañada: con 30 vainas vas sobrado.</li>
      </ol>
      <p>Resultado: <span class="resultado">al menos 23 vainas, mejor unas 30</span>. Congélalas un día después de desgranarlas y guárdalas bien secas.</p>
      <p class="nota"><strong>Error común:</strong> redondear 22.2 hacia abajo. Con 22 vainas te faltarían semillas.</p>`,
    vidaReal: `
      <p>Guardar granos para semilla es de lo más sencillo y útil:</p>
      <ul>
        <li>Tu maíz y tu frijol se pueden sembrar año tras año sin comprar semilla.</li>
        <li>Evitas que el gorgojo se coma tu reserva.</li>
        <li>Puedes intercambiar mazorcas o frijoles de colores con otras familias.</li>
        <li>Sabes cuántas vainas guardar según lo que piensas sembrar.</li>
        <li>Tu reserva de semilla dura años si la proteges bien.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Necesitas 150 semillas de frijol. Si cada vaina trae unos 6, ¿cuántas vainas guardas como mínimo?</p>', respuesta: 150 / 6,
        pista: '<p>Divide las semillas que necesitas entre las de cada vaina.</p>',
        solucion: '<p>150 ÷ 6 = <strong>25 vainas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Oregon recomienda congelar los frijoles de 24 a 30 horas. ¿Cuántos días son 30 horas? Escribe la respuesta como número decimal.</p>', respuesta: 30 / 24,
        pista: '<p>Un día tiene 24 horas.</p>',
        solucion: '<p>30 ÷ 24 = <strong>1.25 días</strong>, es decir, un día y 6 horas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuándo se cosechan las vainas de frijol para semilla?</p>',
        opciones: ['Cuando tienen el grosor de un lápiz', 'Cuando están tan secas que suenan al sacudirlas', 'Cuando aparecen las flores'], correcta: 1,
        pista: '<p>Las del grosor de un lápiz son ejotes para comer.</p>',
        solucion: '<p><strong>Cuando suenan al sacudirlas.</strong> Así la semilla ya maduró.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué se meten los frijoles al congelador antes de guardarlos?</p>',
        opciones: ['Para que germinen más rápido', 'Para que no se pongan negros', 'Para matar los huevos o larvas de gorgojo'], correcta: 2,
        pista: '<p>Es una plaga que se come el grano por dentro.</p>',
        solucion: '<p><strong>Para matar los huevos o larvas de gorgojo</strong>, según Oregon.</p>' },
      { tipo: 'opciones', enunciado: '<p>Llueve mucho y tus mazorcas para semilla no terminan de secarse. Según Iowa, ¿qué haces?</p>',
        opciones: ['Arrancas la planta entera y la cuelgas bajo techo', 'Las desgranas aunque estén húmedas', 'Las metes al horno'], correcta: 0,
        pista: '<p>Necesitan terminar de madurar sin mojarse.</p>',
        solucion: '<p><strong>Las cuelgas bajo techo</strong> para que terminen de madurar y secarse.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el pequeño escarabajo cuyas larvas se comen los frijoles por dentro?</p>',
        respuestas: ['gorgojo', 'el gorgojo', 'gorgojos', 'gorgojo del frijol'],
        pista: '<p>Empieza con "gor".</p>',
        solucion: '<p>El <strong>gorgojo</strong>.</p>' },
    ],
    fuentes: [OSUSEM, IOWA('how-harvest-and-store-seeds', 'How to Harvest and Store Seeds'), UCMGUIA, ILLSAVE],
  });

  // ------------------------------------------------------------------
  const FRASCO = diagrama([-5, 5], [0, 7.6], [
    { tipo: 'poligono', abierto: true, puntos: [[-1.8, 6.4], [-1.8, 0.4], [1.8, 0.4], [1.8, 6.4]] },
    { tipo: 'linea', desde: [-1.8, 5.2], hasta: [1.8, 5.2], punteada: true },
    elipse(-0.8, 4.9, 0.45, 0.2, true), elipse(0.5, 4.95, 0.5, 0.2, true), elipse(1.2, 4.85, 0.3, 0.15, true),
    ...[-1.2, -0.6, 0, 0.6, 1.2, -0.9, -0.3, 0.3, 0.9].map((x, i) => elipse(x, i < 5 ? 0.7 : 1.05, 0.22, 0.13, true)),
    txt(-3.6, 5.6, 'pulpa y'), txt(-3.6, 5.1, 'semillas vanas'), ...flecha([-2.4, 5], [-1.3, 4.9], 0, 1),
    txt(3.5, 1.4, 'semillas'), txt(3.5, 0.9, 'buenas'), ...flecha([2.6, 1], [1.5, 0.8], 0, 1),
    txt(0, 7, 'agua'),
  ], 'Un frasco con agua. Arriba, flotando bajo la superficie, unos pedazos rotulados "pulpa y semillas vanas". En el fondo, varias semillas pequeñas rotuladas "semillas buenas".');

  L('Semillas de frutos carnosos: jitomate, chile y calabaza', {
    objetivo: 'Sacar, fermentar, lavar y secar las semillas de los frutos carnosos, como el jitomate, el chile y la calabaza, y elegir los frutos en el punto de madurez correcto.',
    explicacion: `
      <p>Un jitomate, un chile o una calabaza tienen sus semillas rodeadas de pulpa jugosa. Ese tipo de fruto, que guarda sus semillas en una carne húmeda, se llama <strong>fruto carnoso</strong>. Para guardar esas semillas hay que sacarlas, limpiarlas de la pulpa y secarlas rápido, antes de que se pudran.</p>
      <h3>El punto de madurez</h3>
      <p>Para comer, muchos frutos se cortan antes de tiempo. Para semilla, en cambio, hay que esperar la madurez de semilla, que viste en "Cosechar en el momento justo". La Extensión de la Universidad Estatal de Oregon da estas indicaciones:</p>
      <ul>
        <li>Jitomate: el fruto completamente maduro.</li>
        <li>Chile: déjalo en la planta hasta que se ponga completamente rojo, o del color final de su variedad.</li>
        <li>Calabaza: el fruto debe estar muy maduro, con la cáscara dura, para que sus semillas germinen bien.</li>
      </ul>
      <h3>Jitomate: fermentar</h3>
      <p>Cada semilla de jitomate está envuelta en una gelatina que frena su germinación. La forma recomendada de quitarla es la <strong>fermentación</strong>: dejar que microbios inofensivos descompongan esa gelatina, como cuando se agria algo. La Extensión de la Universidad de Illinois explica los pasos:</p>
      <ol>
        <li>Saca las semillas con su jugo, o aplasta el fruto, y ponlas en un frasco con un poco de agua.</li>
        <li>Déjalo fermentar de 2 a 4 días, revolviendo una vez al día. Se forma una capa de nata o moho en la superficie: es normal.</li>
        <li>Las semillas buenas se hunden; la pulpa y las semillas vanas flotan. Tira el agua de arriba con todo lo que flota.</li>
        <li>Enjuaga las semillas del fondo en un colador y ponlas a secar.</li>
      </ol>
      ${FRASCO}
      <p>Fíjate en la prueba que trae el método: una semilla que flota casi siempre está vacía. Por eso el agua separa sola las buenas de las malas.</p>
      <h3>Chile</h3>
      <p>Las semillas del chile no tienen gelatina, así que no hace falta fermentarlas. Oregon indica sacarlas del chile maduro y ponerlas sobre una toalla o una malla hasta que se sequen por completo. Recuerda lo que viste en "Cultivar chile": usa guantes si son picosos y no te toques los ojos. El chile, además, se puede cruzar con otras variedades, así que conviene aislarlo, como viste en "Polinización".</p>
      <h3>Calabaza</h3>
      <p>La calabaza es más difícil, porque se cruza con facilidad con otras variedades de su misma especie. Oregon explica cómo polinizar a mano: la tarde antes de que abran, cierras una flor macho y una flor hembra con un clip o una liga; a la mañana siguiente, frotas el polen de la macho en el centro de la hembra y la vuelves a cerrar para que no entren abejas, y la marcas. Ese fruto marcado es el que guardas para semilla.</p>
      <p>Para sacar la semilla, la Extensión de la Universidad Estatal de Iowa indica separar las semillas de la pulpa en un recipiente con agua; las de calabaza se pueden remojar un rato para soltar la pulpa, sin fermentar. Lávalas y sécalas bien. Recuerda juntar semilla de varios frutos, como viste en "Elegir las mejores plantas".</p>
      <p class="nota"><strong>Trampa común:</strong> asustarse por el moho que sale al fermentar el jitomate y tirar todo. Es parte del proceso; las semillas del fondo están bien.</p>`,
    ejemplo: `
      <p>Fermentas las semillas de 4 jitomates. Al tercer día, cuentas 180 semillas en el fondo y 20 flotando. ¿Qué porcentaje de semillas es bueno?</p>
      <ol class="pasos-ej">
        <li>Primero calcula el total de semillas: 180 + 20 = 200.</li>
        <li>Las buenas son las que se hundieron: 180.</li>
        <li>Divide las buenas entre el total: 180 ÷ 200 = 0.9, es decir, 90%.</li>
        <li>Comprueba con las que flotan: 20 ÷ 200 = 0.1, el 10%. Y 90% + 10% = 100%.</li>
      </ol>
      <p>Resultado: <span class="resultado">90% de las semillas son buenas</span>. Aun así, haz una prueba de germinación antes de sembrar, como viste en "Prueba de germinación", porque una semilla que se hunde puede estar llena pero no viva. Con 180 semillas buenas tienes semilla de jitomate para varias temporadas.</p>
      <p class="nota"><strong>Error común:</strong> guardar también las semillas que flotan. Casi siempre están vacías.</p>`,
    vidaReal: `
      <p>Guardar semillas de tus frutos favoritos es fácil una vez que conoces el método:</p>
      <ul>
        <li>Un solo jitomate de buena variedad te da semilla para muchos años.</li>
        <li>El agua te dice qué semillas están vacías antes de sembrarlas.</li>
        <li>Puedes guardar el chile que da tu planta más sana.</li>
        <li>Sabes por qué una calabaza guardada puede salir rara y cómo evitarlo.</li>
        <li>Aprovechas los frutos que ya ibas a comer para sacar su semilla.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Al fermentar, 135 semillas se hunden y 15 flotan. ¿Qué porcentaje son buenas?</p>', respuesta: 135 / (135 + 15) * 100,
        pista: '<p>Divide las que se hundieron entre el total.</p>',
        solucion: '<p>El total es 150; 135 ÷ 150 = 0.9, es decir, <strong>90%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Empiezas a fermentar un lunes y lo dejas 3 días. Si el lunes es el día 1, ¿qué número de día terminas?</p>', respuesta: 1 + 3,
        pista: '<p>Suma los días de fermentación al día en que empiezas.</p>',
        solucion: '<p>1 + 3 = <strong>4</strong>, es decir, el jueves.</p>' },
      { tipo: 'opciones', enunciado: '<p>Al fermentar semillas de jitomate, ¿cuáles guardas?</p>',
        opciones: ['Las que flotan', 'Las que se hunden', 'Todas'], correcta: 1,
        pista: '<p>Una semilla vacía pesa poco.</p>',
        solucion: '<p><strong>Las que se hunden.</strong> Las que flotan suelen estar vacías.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué se fermentan las semillas de jitomate?</p>',
        opciones: ['Para quitarles la gelatina que las envuelve', 'Para que sepan mejor', 'Para que no se crucen'], correcta: 0,
        pista: '<p>Cada semilla viene envuelta en algo.</p>',
        solucion: '<p><strong>Para quitarles la gelatina</strong>, que frena su germinación.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Oregon, ¿cuándo se sacan las semillas de un chile?</p>',
        opciones: ['Cuando está verde y tierno', 'Cuando apenas florece', 'Cuando se puso completamente rojo o de su color final'], correcta: 2,
        pista: '<p>Para semilla se espera la madurez completa.</p>',
        solucion: '<p><strong>Cuando está completamente maduro</strong>, rojo o de su color final.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el proceso en que microbios inofensivos descomponen la gelatina de las semillas de jitomate?</p>',
        respuestas: ['fermentacion', 'la fermentacion', 'fermentar', 'fermentado'],
        pista: '<p>Es el mismo proceso que agria el pulque o el yogur.</p>',
        solucion: '<p>La <strong>fermentación</strong>.</p>' },
    ],
    fuentes: [ILLSAVE, OSUSEM, IOWA('how-harvest-and-store-seeds', 'How to Harvest and Store Seeds')],
  });

  // ------------------------------------------------------------------
  L('Semillas de lechuga, cebolla y otras hortalizas', {
    objetivo: 'Guardar semilla de hortalizas de hoja y de raíz, como la lechuga, la cebolla, la zanahoria o el cilantro, y entender por qué algunas tardan dos años.',
    explicacion: `
      <p>Muchas hortalizas se cosechan antes de que florezcan: la lechuga, la cebolla, la zanahoria. Por eso casi nunca vemos sus flores ni sus semillas. Para guardar su semilla hay que hacer algo que en el huerto normal se evita: dejar que la planta termine su vida.</p>
      <h3>Lechuga</h3>
      <p>La lechuga es de las más fáciles: como viste en "Polinización", se poliniza sola y basta separar las variedades de 3 a 6 metros. La Extensión de la Universidad Estatal de Oregon explica cómo:</p>
      <ol>
        <li>Deja una o dos plantas sin cosechar para que se espiguen y echen su tallo floral.</li>
        <li>Después de florecer, cada flor se convierte en una cabecita esponjosa, como la del diente de león.</li>
        <li>Junta esas cabecitas y frota las semillas con los dedos para separarlas de las pelusas.</li>
      </ol>
      <p>Recuerda elegir para semilla las plantas que tardaron más en espigarse, como viste en "Elegir las mejores plantas". Las semillas no maduran todas el mismo día; puedes sacudir el tallo dentro de una bolsa de papel cada pocos días.</p>
      <h3>Plantas que tardan dos años</h3>
      <p>Algunas hortalizas son <strong>bianuales</strong>: viven dos temporadas. En la primera forman su raíz, su bulbo o su cabeza, que es lo que comemos; en la segunda, después de pasar un invierno, florecen y dan semilla. Son bianuales la zanahoria, el betabel, la cebolla y las coles, según Oregon.</p>
      <p>Oregon reconoce que guardar su semilla cuesta trabajo, porque hay que conservar la planta de un año al otro:</p>
      <ul>
        <li>Zanahoria y betabel: elige las mejores raíces, guárdalas frescas y húmedas durante el invierno, por ejemplo enterradas en arena, y vuélvelas a plantar al principio de la primavera, con espacio, porque crecen mucho.</li>
        <li>Cebolla: guarda los bulbos frescos y secos durante el invierno y plántalos al principio de la primavera. Cuando las cabezas de flores estén bien secas, junta las semillas antes de que caigan y termina de secarlas.</li>
      </ul>
      <p>En lugares donde no hiela, algunas bianuales no reciben el frío que necesitan para florecer, o florecen de forma irregular; pregunta a quienes guardan semilla en tu región.</p>
      <h3>Cuidado con los cruces</h3>
      <p>La cebolla y la zanahoria se polinizan con insectos y necesitan de 244 a 805 metros de aislamiento; las coles también dependen de los insectos. Oregon advierte, además, que la zanahoria se cruza con la zanahoria silvestre, y que las coles se cruzan entre ellas y con mostazas y rábanos silvestres. Si hay de esas plantas cerca, tu semilla puede salir mezclada.</p>
      <h3>Umbelas: zanahoria, cilantro y eneldo</h3>
      <p>La zanahoria, el cilantro y el eneldo tienen sus flores en <strong>umbela</strong>: muchas florecitas cuyos tallos salen del mismo punto, como las varillas de un paraguas abierto. Sus semillas maduran poco a poco. La Extensión de la Universidad de Illinois recomienda cortar las cabezas de semillas pequeñas y ligeras justo antes de que se sequen por completo, para no perderlas, y terminar de secarlas en una malla o en una bolsa de papel. El cilantro es anual: florece el mismo año, y sus semillas secas son el cilantro en grano de la cocina.</p>
      <p class="nota"><strong>Trampa común:</strong> arrancar la planta de zanahoria en cuanto florece porque "ya no sirve". Si quieres semilla, apenas está empezando.</p>`,
    ejemplo: `
      <p>Quieres guardar semilla de cebolla. Siembras en marzo del año 1; la cosechas en agosto; guardas los bulbos y los vuelves a plantar en marzo del año 2; las semillas maduran en agosto del año 2. ¿Cuántos meses pasan desde la siembra hasta la semilla?</p>
      <ol class="pasos-ej">
        <li>Primero cuenta de marzo del año 1 a marzo del año 2: son 12 meses.</li>
        <li>Luego, de marzo a agosto del año 2: abril, mayo, junio, julio y agosto, 5 meses.</li>
        <li>Suma: 12 + 5 = 17 meses.</li>
        <li>Comprueba de otra forma: de marzo a agosto del año 1 hay 5 meses; de agosto del año 1 a agosto del año 2, otros 12. En total, 5 + 12 = 17.</li>
      </ol>
      <p>Resultado: <span class="resultado">unos 17 meses</span>; por eso las bianuales piden paciencia y un lugar para guardar los bulbos.</p>
      <p class="nota"><strong>Error común:</strong> comerse los mejores bulbos y plantar los que sobraron. Para semilla, se guardan los mejores.</p>`,
    vidaReal: `
      <p>Guardar semillas de hortalizas de hoja y raíz te da independencia en cultivos que casi siempre se compran:</p>
      <ul>
        <li>La semilla de lechuga es de las más fáciles y te dura varios años.</li>
        <li>Puedes tener cilantro en grano para cocinar y para sembrar.</li>
        <li>Sabes por qué nunca habías visto la flor de una zanahoria.</li>
        <li>Entiendes por qué producir semilla de cebolla lleva tanto tiempo y trabajo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Plantas zanahoria en abril del año 1 y su semilla madura en julio del año 2. ¿Cuántos meses pasan?</p>', respuesta: 12 + 3,
        pista: '<p>Cuenta un año completo y luego de abril a julio.</p>',
        solucion: '<p>De abril a abril son 12 meses, y de abril a julio, 3 más: 12 + 3 = <strong>15 meses</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Dejas 2 plantas de lechuga para semilla y cada una da unas 2 000 semillas. ¿Cuántas semillas obtienes?</p>', respuesta: 2 * 2000,
        pista: '<p>Multiplica las plantas por las semillas de cada una.</p>',
        solucion: '<p>2 × 2 000 = <strong>4 000 semillas</strong>, mucho más de lo que necesitas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es una planta bianual?</p>',
        opciones: ['Una que da dos cosechas al año', 'Una que solo vive dos meses', 'Una que forma su raíz o bulbo el primer año y da semilla el segundo'], correcta: 2,
        pista: '<p>"Bi" quiere decir dos.</p>',
        solucion: '<p><strong>Una que da semilla en su segunda temporada</strong>, como la cebolla y la zanahoria.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Oregon, ¿con qué planta silvestre se cruza la zanahoria?</p>',
        opciones: ['Con la zanahoria silvestre', 'Con el diente de león', 'Con la hierbabuena'], correcta: 0,
        pista: '<p>Es una pariente de su misma especie.</p>',
        solucion: '<p><strong>Con la zanahoria silvestre.</strong> Si hay cerca, tu semilla puede salir mezclada.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cómo se juntan las semillas de lechuga?</p>',
        opciones: ['Arrancando la planta cuando está tierna', 'Juntando las cabecitas esponjosas y frotando las semillas con los dedos', 'Fermentándolas en agua'], correcta: 1,
        pista: '<p>Oregon las compara con el diente de león.</p>',
        solucion: '<p><strong>Juntando las cabecitas y frotándolas</strong> para separar las semillas de las pelusas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la forma de flor de la zanahoria y el cilantro, con muchas florecitas que salen del mismo punto como un paraguas?</p>',
        respuestas: ['umbela', 'la umbela', 'umbelas', 'en umbela'],
        pista: '<p>Viene del latín "umbella", sombrilla.</p>',
        solucion: '<p>Una <strong>umbela</strong>.</p>' },
    ],
    fuentes: [OSUSEM, ILLSAVE, UCMGUIA, WIKI('Umbela', 'Umbela')],
  });

  // ------------------------------------------------------------------
  L('Limpiar y secar las semillas', {
    objetivo: 'Separar las semillas de la paja o de la pulpa y secarlas rápido y sin calor excesivo, para que se guarden sin enmohecerse.',
    explicacion: `
      <p>Una semilla húmeda guardada en un frasco es como ropa mojada guardada en un cajón: en pocos días huele a moho. La Extensión de la Universidad Estatal de Iowa lo dice claro: secar bien las semillas es el paso más importante para guardarlas con éxito. Antes de secarlas, además, hay que limpiarlas, porque los restos de paja y de pulpa guardan humedad y atraen plagas.</p>
      <h3>Limpieza en seco</h3>
      <p>Las semillas de frutos secos, como la lechuga, el rábano, los granos, el frijol, el chícharo y las coles, se limpian en seco. Iowa describe los pasos:</p>
      <ul>
        <li>Separar la semilla de la cabeza, la cascarilla o la vaina: trillando, aplastando o desgranando, como viste en "Cultivar trigo".</li>
        <li><strong>Cribar</strong>: pasar la mezcla por un colador o una malla con agujeros del tamaño justo, para que la semilla pase y la paja se quede, o al revés.</li>
        <li>Aventar: dejar caer la mezcla frente a un ventilador para que la paja ligera se vuele y la semilla, más pesada, caiga.</li>
      </ul>
      <p>Iowa aclara que casi siempre hay que cribar o aventar varias veces para quitar la mayor parte de la paja.</p>
      <h3>Limpieza en húmedo</h3>
      <p>Las semillas de frutos carnosos, como el jitomate, el chile, la calabaza y el melón, se limpian en agua, como viste en la lección anterior. Iowa resume: se corta el fruto, se sacan las semillas, se ponen en un recipiente con agua y se agitan; la pulpa, los restos y las semillas vanas flotan y se tiran; se repite hasta que el agua quede casi clara. El jitomate se fermenta y la calabaza se remoja un rato. Al final se enjuagan en un colador.</p>
      <h3>El secado</h3>
      <p>El <strong>secado</strong> es quitarle a la semilla la humedad que le sobra, sin dañar el embrión que lleva dentro. Iowa da estas recomendaciones:</p>
      <ul>
        <li>Secar rápido y con buena ventilación, porque el aire que circula seca más que el calor.</li>
        <li>Extender las semillas sobre mallas, filtros de café, charolas o tablas, en una sola capa.</li>
        <li>No usar papel ni cartón, porque las semillas húmedas se pegan.</li>
        <li>No pasar de 35 °C ni dejarlas al sol directo.</li>
        <li>No usar deshidratador de alimentos, porque suele calentarse demasiado y daña las semillas.</li>
      </ul>
      <p>La Extensión de la Universidad de Illinois sugiere, para las semillas de cabezas secas, terminar de secarlas en una malla en un lugar fresco y ventilado, o dentro de bolsas de papel para no perderlas.</p>
      <h3>¿Ya están secas?</h3>
      <p>Las semillas grandes tardan más en secarse que las pequeñas. Una semilla bien seca está dura y no se dobla; en las semillas grandes, si al apretarla con la uña queda una marca, todavía tiene humedad. Revuelve las semillas una vez al día para que se sequen parejas. Según el tamaño y el clima, pueden tardar desde unos días hasta un par de semanas. En días muy húmedos, Iowa propone terminar el secado en un frasco cerrado con gel de sílice, como verás en la siguiente lección.</p>
      <p>Mientras se secan, etiqueta cada charola con el nombre de la planta y la variedad. Muchas semillas se parecen, y es fácil confundirlas.</p>
      <p class="nota"><strong>Trampa común:</strong> secar las semillas al sol o en el horno "para que sea más rápido". El calor puede matar el embrión, aunque la semilla se vea igual.</p>`,
    ejemplo: `
      <p>Iowa recomienda no secar las semillas a más de 95 °F. ¿Cuántos grados Celsius son? Usa la fórmula °C = (°F − 32) ÷ 1.8.</p>
      <ol class="pasos-ej">
        <li>Primero resta 32, porque la escala Fahrenheit empieza a contar desde otro punto: 95 − 32 = 63.</li>
        <li>Luego divide entre 1.8, porque cada grado Celsius equivale a 1.8 grados Fahrenheit: 63 ÷ 1.8 = 35.</li>
        <li>Así, el máximo es 35 °C, la temperatura de un día muy caluroso.</li>
        <li>Comprueba al revés: 35 × 1.8 + 32 = 63 + 32 = 95 °F.</li>
      </ol>
      <p>Resultado: <span class="resultado">35 °C como máximo</span>. Un auto cerrado al sol o un horno pasan de esa temperatura con facilidad. Una sombra con buena corriente de aire seca las semillas sin ese riesgo.</p>
      <p class="nota"><strong>Error común:</strong> dividir primero entre 1.8 y restar después. El orden importa: primero se resta 32.</p>`,
    vidaReal: `
      <p>Limpiar y secar bien tus semillas evita perder el trabajo de toda una temporada:</p>
      <ul>
        <li>Tus semillas no se enmohecen dentro del frasco.</li>
        <li>Separas las semillas vanas antes de guardarlas.</li>
        <li>Sabes por qué no conviene secar semillas en el horno ni en el carro.</li>
        <li>Un colador y un ventilador bastan para limpiar granos y semillas pequeñas.</li>
        <li>Etiquetas bien tus semillas y no las confundes después.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿A cuántos grados Celsius equivalen 86 °F? Usa °C = (°F − 32) ÷ 1.8.</p>', respuesta: (86 - 32) / 1.8,
        pista: '<p>Primero resta 32 y luego divide entre 1.8.</p>',
        solucion: '<p>86 − 32 = 54, y 54 ÷ 1.8 = <strong>30 °C</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Avientas una mezcla de 500 g y te quedan 380 g de semilla limpia. ¿Cuántos gramos eran paja?</p>', respuesta: 500 - 380,
        pista: '<p>Resta lo que quedó de lo que tenías.</p>',
        solucion: '<p>500 − 380 = <strong>120 gramos</strong> de paja.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es el mejor lugar para secar semillas?</p>',
        opciones: ['Dentro de un auto cerrado al sol', 'En un lugar ventilado, a la sombra, sobre una malla', 'En el horno, a fuego bajo'], correcta: 1,
        pista: '<p>Iowa recomienda buena ventilación y no pasar de 35 °C.</p>',
        solucion: '<p><strong>En un lugar ventilado y a la sombra</strong>, sobre una malla.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué semillas se limpian en húmedo?</p>',
        opciones: ['Las de jitomate y calabaza', 'Las de frijol y trigo', 'Las de lechuga'], correcta: 0,
        pista: '<p>Son las de frutos carnosos.</p>',
        solucion: '<p><strong>Las de jitomate y calabaza</strong>, que vienen en pulpa.</p>' },
      { tipo: 'opciones', enunciado: '<p>Aprietas una semilla de calabaza con la uña y queda marcada. ¿Qué significa?</p>',
        opciones: ['Que está lista para guardar', 'Que está vacía', 'Que todavía tiene humedad y necesita secarse más'], correcta: 2,
        pista: '<p>Una semilla seca está dura.</p>',
        solucion: '<p><strong>Que todavía tiene humedad.</strong> Déjala secar más antes de guardarla.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama pasar la mezcla de semillas y paja por un colador o una malla para separarlas?</p>',
        respuestas: ['cribar', 'cribado', 'el cribado', 'tamizar', 'cernir', 'colar'],
        pista: '<p>Una "criba" es un colador grande.</p>',
        solucion: '<p><strong>Cribar</strong>.</p>' },
    ],
    fuentes: [IOWA('how-harvest-and-store-seeds', 'How to Harvest and Store Seeds'), ILLSAVE, UCMGUIA],
  });

  // ------------------------------------------------------------------
  L('Almacenar semillas: frío, oscuridad y poca humedad', {
    objetivo: 'Guardar las semillas en las condiciones que las mantienen vivas más tiempo, usando un frasco, un secante y un lugar fresco, y manejar con cuidado las semillas tratadas.',
    explicacion: `
      <p>Una semilla guardada no está muerta: está dormida, respirando muy despacio y gastando poco a poco su reserva. El calor y la humedad la despiertan y le hacen gastar esa reserva más rápido. Por eso una semilla guardada en una cocina calurosa dura mucho menos que la misma semilla en un lugar fresco y seco.</p>
      <h3>Fresco y seco</h3>
      <p>La Extensión de la Universidad de Illinois recomienda guardar las semillas frescas y secas, de preferencia a menos de 45 °F, que son unos 7 °C. Propone una regla práctica: la temperatura en grados Fahrenheit más el porcentaje de <strong>humedad relativa</strong> debe sumar menos de 100. La humedad relativa dice qué tan cargado de vapor de agua está el aire, en porcentaje: 30% es aire seco y 90% es aire muy húmedo, como antes de llover.</p>
      <p>Fíjate en lo que dice la regla: si el lugar es más caliente, necesitas aire más seco, y si el aire es más húmedo, necesitas un lugar más frío. Por ejemplo, a 50 °F (10 °C), la humedad debe ser menor de 50%.</p>
      <h3>El recipiente</h3>
      <p>La Extensión de la Universidad Estatal de Iowa recomienda frascos de vidrio cerrados, que no dejan pasar la humedad ni a los ratones ni a los insectos. Illinois sugiere poner las semillas en sobres de papel dentro del frasco, y etiquetar cada sobre con el nombre de la planta, la variedad y la fecha. Iowa sugiere guardar los frascos en un lugar fresco y seco, como un clóset, un sótano o el refrigerador.</p>
      <h3>Un secante</h3>
      <p>Un <strong>secante</strong> es algo que absorbe la humedad del aire dentro del frasco. Iowa propone poner, junto a los sobres de semillas, un sobre aparte con la misma cantidad de gel de sílice, las bolsitas que vienen en las cajas de zapatos (no se comen; mantenlas lejos de niños y mascotas), cerrar el frasco y quitarlo después de una o dos semanas. La Extensión de la Universidad Estatal de Oregon sugiere otra opción casera: una bolsita de tela con media taza de leche en polvo seca, de un paquete recién abierto, en el fondo del frasco. Oregon añade que, para guardar a largo plazo, el frasco bien cerrado se puede meter al refrigerador o al congelador.</p>
      <p>Si sacas un frasco del refrigerador, deja que llegue a la temperatura del cuarto antes de abrirlo; si no, el aire tibio se condensa como gotitas sobre las semillas frías.</p>
      <h3>Semillas tratadas</h3>
      <p>Algunas semillas compradas vienen teñidas de colores brillantes, como rosa, azul o verde. El Centro Nacional de Información de Pesticidas (NPIC) explica que esas semillas están cubiertas con un plaguicida contra hongos o insectos, y que el color sirve de advertencia. Sus recomendaciones:</p>
      <ul>
        <li>Nunca comas semillas tratadas ni se las des a los animales.</li>
        <li>Guárdalas lejos de los niños, a quienes atraen sus colores, y lejos de tu comida y de tus semillas para comer.</li>
        <li>Manéjalas con el mismo cuidado que cualquier plaguicida, y no las quemes ni las eches a la composta.</li>
        <li>Si alguien se las traga, llama de inmediato al centro de toxicología o al número de emergencias de tu país, con el empaque a la mano.</li>
      </ul>
      <p>Tus propias semillas no vienen tratadas; por eso conviene etiquetar todo y no mezclarlas con las compradas.</p>
      <p class="nota"><strong>Trampa común:</strong> guardar las semillas en una bolsa de plástico en la cocina, junto a la estufa. El calor y la humedad las envejecen en pocos meses.</p>`,
    ejemplo: `
      <p>Tu alacena está a 70 °F (unos 21 °C) y la humedad relativa es de 40%. ¿Cumple la regla de Illinois? ¿Y el refrigerador, a 40 °F con 50% de humedad?</p>
      <ol class="pasos-ej">
        <li>Primero suma los números de la alacena: 70 + 40 = 110. Es mayor que 100, así que no cumple.</li>
        <li>Ahora el refrigerador: 40 + 50 = 90. Es menor que 100, así que sí cumple.</li>
        <li>Para que la alacena cumpliera a 70 °F, la humedad tendría que ser menor de 100 − 70 = 30%.</li>
        <li>Comprueba: con 29% de humedad, 70 + 29 = 99, menor que 100.</li>
      </ol>
      <p>Resultado: <span class="resultado">el refrigerador cumple y la alacena no</span>. Si no tienes refrigerador, busca el lugar más fresco de la casa y usa un secante.</p>
      <p class="nota"><strong>Error común:</strong> sumar los grados Celsius en lugar de los Fahrenheit. La regla de Illinois usa grados Fahrenheit.</p>`,
    vidaReal: `
      <p>Guardar bien las semillas multiplica cuánto te duran:</p>
      <ul>
        <li>Tus semillas siguen germinando bien años después.</li>
        <li>Un frasco de vidrio y una bolsita de sílice reciclada bastan para protegerlas.</li>
        <li>Evitas que los ratones o los gorgojos se coman tu reserva.</li>
        <li>Sabes reconocer y manejar con cuidado las semillas tratadas que compras.</li>
        <li>Proteges a niñas, niños y mascotas de las semillas con plaguicida.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un cuarto está a 60 °F. Según la regla de Illinois, ¿por debajo de qué porcentaje debe estar la humedad relativa?</p>', respuesta: 100 - 60,
        pista: '<p>La suma de los dos números debe ser menor que 100.</p>',
        solucion: '<p>100 − 60 = <strong>40%</strong>. La humedad debe ser menor que eso.</p>' },
      { tipo: 'numero', enunciado: '<p>Illinois recomienda guardar las semillas a menos de 45 °F. ¿Cuántos grados Celsius son? Usa °C = (°F − 32) ÷ 1.8 y redondea a un decimal.</p>', respuesta: (45 - 32) / 1.8, tolerancia: 0.06,
        pista: '<p>Primero resta 32 y luego divide entre 1.8.</p>',
        solucion: '<p>45 − 32 = 13, y 13 ÷ 1.8 ≈ <strong>7.2 °C</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es el mejor recipiente para guardar semillas?</p>',
        opciones: ['Una bolsa de plástico abierta', 'Una caja de cartón en el patio', 'Un frasco de vidrio bien cerrado, con las semillas en sobres etiquetados'], correcta: 2,
        pista: '<p>Busca el que no deja pasar humedad ni plagas.</p>',
        solucion: '<p><strong>El frasco de vidrio cerrado</strong>, con sobres etiquetados.</p>' },
      { tipo: 'opciones', enunciado: '<p>Unas semillas compradas vienen teñidas de rosa brillante. Según el NPIC, ¿qué significa?</p>',
        opciones: ['Que están cubiertas con un plaguicida y no se deben comer', 'Que son de una variedad rosa', 'Que ya germinaron'], correcta: 0,
        pista: '<p>El color brillante es una advertencia.</p>',
        solucion: '<p><strong>Que están tratadas con un plaguicida.</strong> No se comen ni se dan a los animales.</p>' },
      { tipo: 'opciones', enunciado: '<p>Sacas un frasco de semillas del refrigerador. ¿Qué haces antes de abrirlo?</p>',
        opciones: ['Lo abres de inmediato', 'Esperas a que llegue a la temperatura del cuarto', 'Lo pones al sol'], correcta: 1,
        pista: '<p>Piensa en las gotitas que se forman en un vaso frío.</p>',
        solucion: '<p><strong>Esperas a que se entibie</strong>, para que no se condense agua sobre las semillas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama algo que se pone en el frasco para absorber la humedad del aire, como el gel de sílice?</p>',
        respuestas: ['secante', 'un secante', 'desecante', 'un desecante', 'el secante'],
        pista: '<p>Viene de "secar".</p>',
        solucion: '<p>Un <strong>secante</strong>.</p>' },
    ],
    fuentes: [ILLGERM, ILLSAVE, IOWA('how-harvest-and-store-seeds', 'How to Harvest and Store Seeds'), OSUSEM, NPIC],
  });

  // ------------------------------------------------------------------
  const DURACION = barras({
    etiquetas: ['cebolla', 'maíz', 'frijol', 'zanahoria', 'lechuga', 'jitomate'], valores: [2, 2, 3, 3, 5, 5], max: 5, paso: 1e9, sufijo: ' años',
    descripcion: 'Gráfica de barras de cuántos años suelen durar, más o menos, las semillas bien guardadas (cifras redondeadas de las listas de Illinois y Oregon). Cebolla: 2 años. Maíz: 2 años. Frijol: 3 años. Zanahoria: 3 años. Lechuga: 5 años. Jitomate: 5 años.',
  });

  L('Cuánto duran las semillas y cómo renovarlas', {
    objetivo: 'Saber cuánto tiempo suelen durar vivas las semillas de cada cultivo, comprobar si todavía sirven y renovarlas sembrando antes de que se pierdan.',
    explicacion: `
      <p>En el fondo de un cajón aparece un frasco con semillas de cebolla de hace cuatro años y otro con semillas de jitomate de la misma fecha. Siembras las dos. El jitomate brota casi entero; la cebolla, casi nada. No es mala suerte: cada semilla tiene su propio tiempo de vida.</p>
      <h3>Viabilidad</h3>
      <p>La <strong>viabilidad</strong> es la capacidad de una semilla de germinar y dar una planta. Con los años, como viste en "Prueba de germinación", las semillas gastan su reserva y la viabilidad baja: primero germinan menos, después tardan más y dan plantas más débiles, y al final ya no germinan.</p>
      <h3>Cuánto dura cada una</h3>
      ${DURACION}
      <p>La Extensión de la Universidad Estatal de Oregon y la de la Universidad de Illinois dan listas parecidas para semillas bien guardadas:</p>
      <ul>
        <li>Duran poco, de 1 a 2 años: cebolla, maíz, perejil y chirivía. Oregon incluye también el chile.</li>
        <li>Duran un tiempo intermedio, unos 3 años: frijol, zanahoria y chícharo. Oregon añade la espinaca, el brócoli y el apio, con 3 a 4 años.</li>
        <li>Duran más, de 4 a 5 años: lechuga, jitomate, pepino, calabaza, rábano, betabel, acelga, coles y sandía.</li>
      </ul>
      <p>Fíjate que las fuentes no coinciden en todo, como en el chile: Illinois le da unos 3 años y Oregon de 1 a 2. Son promedios; una semilla muy bien guardada puede durar más, y una mal guardada, mucho menos, como viste en "Almacenar semillas".</p>
      <h3>Comprobar antes de sembrar</h3>
      <p>No hace falta adivinar. La Extensión de la Universidad Estatal de Iowa recomienda hacer una prueba de germinación un mes antes de sembrar, con el método de la toalla que viste en "Prueba de germinación". Oregon sugiere usar de 25 a 50 semillas cuando tienes muchas, para que el resultado sea más confiable. Con el porcentaje que obtengas decides cuántas semillas sembrar o si conviene renovar el lote.</p>
      <h3>Renovar</h3>
      <p>La única forma de tener semilla fresca de una variedad es sembrarla y volver a guardar su semilla. Por eso, quien guarda muchas variedades organiza un calendario: cada año siembra para semilla las que están por vencer. El manual de bancos comunitarios de semillas de Bioversity International explica que estos bancos regeneran sus semillas cada año, sembrándolas.</p>
      <p>Un calendario sencillo para tu huerto:</p>
      <ul>
        <li>Las semillas que duran 1 a 2 años, como la cebolla y el maíz, se renuevan casi cada año.</li>
        <li>Las de 3 años, como el frijol, cada 2 o 3 años.</li>
        <li>Las de 4 a 5 años, como la lechuga o el jitomate, cada 3 o 4 años.</li>
      </ul>
      <p>Así nunca se te mueren todas las semillas de una variedad que te importa.</p>
      <p class="nota"><strong>Trampa común:</strong> guardar semilla de cebolla por cinco años "para cuando la necesite". Para entonces, casi no germina.</p>`,
    ejemplo: `
      <p>Guardaste semilla de 6 cultivos en 2026: cebolla (2 años), maíz (2), frijol (3), zanahoria (3), lechuga (5) y jitomate (5). Si quieres renovar cada una un año antes de que se venza, ¿qué cultivos siembras para semilla en 2027?</p>
      <ol class="pasos-ej">
        <li>Primero calcula cuándo vence cada una sumando su duración a 2026: cebolla y maíz en 2028; frijol y zanahoria en 2029; lechuga y jitomate en 2031.</li>
        <li>Renovar un año antes quiere decir restar 1: cebolla y maíz en 2027; frijol y zanahoria en 2028; lechuga y jitomate en 2030.</li>
        <li>En 2027 te tocan la cebolla y el maíz.</li>
        <li>Comprueba con la cebolla: 2026 + 2 − 1 = 2027.</li>
      </ol>
      <p>Resultado: <span class="resultado">en 2027 siembras para semilla la cebolla y el maíz</span>.</p>
      <p class="nota"><strong>Error común:</strong> esperar a que la semilla ya no germine para renovarla. Para entonces quizá no tengas con qué.</p>`,
    vidaReal: `
      <p>Saber cuánto duran tus semillas te ayuda a no perder variedades valiosas:</p>
      <ul>
        <li>No pierdes una temporada sembrando semillas que ya no sirven.</li>
        <li>Sabes cuáles guardar varios años y cuáles renovar pronto.</li>
        <li>Organizas qué sembrar para semilla cada año.</li>
        <li>Puedes decirle a quien te regala semillas cuánto le durarán.</li>
        <li>Ahorras espacio guardando solo lo que vas a usar antes de que se venza.</li>
        <li>Revisas tu frasco de semillas cada año y sabes qué hay que sembrar.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Guardaste semilla de lechuga en 2025 y dura unos 5 años. ¿Hasta qué año, más o menos, sirve?</p>', respuesta: 2025 + 5,
        pista: '<p>Suma la duración al año en que la guardaste.</p>',
        solucion: '<p>2025 + 5 = <strong>2030</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Haces una prueba con 40 semillas viejas de zanahoria y germinan 22. ¿Qué porcentaje germinó?</p>', respuesta: 22 / 40 * 100,
        pista: '<p>Divide las que germinaron entre las que probaste y multiplica por 100.</p>',
        solucion: '<p>22 ÷ 40 = 0.55, es decir, <strong>55%</strong>. Conviene renovarla pronto.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Oregon e Illinois, ¿cuál de estas semillas dura menos?</p>',
        opciones: ['Jitomate', 'Lechuga', 'Cebolla'], correcta: 2,
        pista: '<p>Está en el grupo de 1 a 2 años.</p>',
        solucion: '<p><strong>La cebolla</strong>, que dura de 1 a 2 años.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Iowa, ¿cuándo conviene hacer la prueba de germinación?</p>',
        opciones: ['Un mes antes de sembrar', 'El mismo día de la siembra', 'Después de la cosecha'], correcta: 0,
        pista: '<p>Necesitas tiempo para conseguir otra semilla si sale mal.</p>',
        solucion: '<p><strong>Un mes antes de sembrar</strong>, para tener tiempo de reaccionar.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál es la única forma de tener semilla fresca de una variedad que ya tienes?</p>',
        opciones: ['Meterla al congelador', 'Sembrarla y volver a guardar su semilla', 'Remojarla un día'], correcta: 1,
        pista: '<p>Los bancos comunitarios lo hacen cada año.</p>',
        solucion: '<p><strong>Sembrarla y guardar su semilla nueva.</strong> A eso se le llama renovar o regenerar.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la capacidad de una semilla de germinar y dar una planta?</p>',
        respuestas: ['viabilidad', 'la viabilidad', 'poder germinativo', 'germinacion', 'vigor'],
        pista: '<p>Empieza con "via".</p>',
        solucion: '<p>La <strong>viabilidad</strong>.</p>' },
    ],
    fuentes: [OSUSEM, ILLGERM, IOWA('how-harvest-and-store-seeds', 'How to Harvest and Store Seeds'), BIOV],
  });

  // ------------------------------------------------------------------
  L('Guardar semillas de papa, ajo y otros tubérculos', {
    objetivo: 'Decidir qué papas, dientes de ajo y camotes guardar para la siguiente siembra, cómo conservarlos y por qué en la papa conviene la semilla certificada.',
    explicacion: `
      <p>Las plantas que se multiplican sin semilla, como viste en "Esquejes, tubérculos y otras formas de multiplicar plantas", se guardan de otra manera: no en un frasco, sino como papas, cabezas de ajo o camotes vivos que hay que mantener sanos hasta la siguiente siembra. Y tienen un riesgo que las semillas casi no tienen: las enfermedades viajan dentro de ellos.</p>
      <h3>Clones que heredan todo</h3>
      <p>Como una papa o un diente de ajo es un clon de la planta madre, como viste en esa lección, la planta nueva hereda todo de ella, incluidas sus enfermedades. Muchas plantas sufren <strong>virus</strong>, unos microbios diminutos que viste en Ciencias naturales, en "Microorganismos". En una semilla verdadera, muchos de esos virus se quedan atrás; en un tubérculo, pasan a la siguiente planta.</p>
      <h3>Papa</h3>
      <p>La Extensión de la Universidad Estatal de Iowa advierte que la papa sufre varias enfermedades graves, y que las papas guardadas de la cosecha anterior pueden traer enfermedades que no se ven. Por eso recomienda comprar papa de <strong>semilla certificada</strong>: papa revisada por una autoridad agrícola para asegurar que está libre de enfermedades. Iowa explica que con ella se obtienen los mejores resultados.</p>
      <p>Si aun así guardas tus propias papas para sembrar:</p>
      <ul>
        <li>Guarda solo papas de plantas que crecieron sanas, sin manchas ni hojas enroscadas o amarillas.</li>
        <li>Elige papas firmes, sin golpes ni podredumbre; las pequeñas se pueden sembrar enteras, como viste en "Esquejes, tubérculos y otras formas de multiplicar plantas".</li>
        <li>Cúralas como viste en "Cultivar papa" y guárdalas en un lugar fresco, oscuro y ventilado. Recuerda que con la luz se ponen verdes, y las verdes no se comen.</li>
        <li>Si un año las plantas salen débiles o enfermas, cambia a semilla certificada.</li>
      </ul>
      <h3>Ajo</h3>
      <p>El ajo se guarda como cabezas enteras, sin separar los dientes hasta poco antes de sembrar, para que no se sequen. Iowa explica que los rendimientos más altos se obtienen con los dientes más grandes, sembrados en otoño. Por eso, al cosechar, aparta para semilla las cabezas más grandes y sanas, no las que sobran después de cocinar. Iowa añade que el ajo de cuello blando, el más común en las tiendas, se guarda mejor que el de cuello duro. Guárdalo seco, en un lugar fresco y ventilado, como viste en "Cultivar cebolla y ajo".</p>
      <h3>Camote y otros</h3>
      <p>Para el camote, guarda algunos camotes sanos de tu cosecha en un lugar templado y seco; en la siguiente temporada los pones a brotar, como viste en "Esquejes". La yuca se guarda como estacas de tallo, que se cortan al cosechar.</p>
      <h3>Revisa seguido</h3>
      <p>Un tubérculo podrido contagia a los que están junto. Revisa tu reserva cada pocas semanas y retira los que estén blandos, con moho o con mal olor.</p>
      <p class="nota"><strong>Trampa común:</strong> sembrar las papas más pequeñas y feas "porque no sirven para comer". Si vienen de plantas enfermas, solo multiplicas el problema.</p>`,
    ejemplo: `
      <p>Quieres sembrar 40 dientes de ajo el próximo otoño. Tus cabezas más grandes tienen unos 8 dientes cada una, y conviene guardar un 25% más por si alguno se echa a perder. ¿Cuántas cabezas apartas?</p>
      <ol class="pasos-ej">
        <li>Primero calcula cuántos dientes guardar con el margen: el 25% de 40 es 10, así que 40 + 10 = 50 dientes.</li>
        <li>Divide entre los dientes de cada cabeza: 50 ÷ 8 = 6.25.</li>
        <li>No se puede guardar un cuarto de cabeza, así que redondeas hacia arriba: 7 cabezas.</li>
        <li>Comprueba: 7 × 8 = 56 dientes, más de los 50 que necesitas.</li>
      </ol>
      <p>Resultado: <span class="resultado">7 cabezas de las más grandes</span>, guardadas enteras hasta poco antes de sembrar. Las cabezas medianas y chicas se quedan para la cocina.</p>
      <p class="nota"><strong>Error común:</strong> separar los dientes semanas antes de sembrar. Sueltos se secan más rápido.</p>`,
    vidaReal: `
      <p>Guardar bien tus tubérculos para sembrar te ahorra dinero y problemas:</p>
      <ul>
        <li>Aprovechas tus mejores cabezas de ajo para tener ajo más grande cada año.</li>
        <li>Sabes por qué conviene comprar papa certificada de vez en cuando.</li>
        <li>No contagias tu huerto con enfermedades escondidas en los tubérculos.</li>
        <li>Revisas tu reserva y tiras a tiempo lo que se está pudriendo.</li>
        <li>Usas tu cosecha para sembrar el año siguiente sin depender de la tienda.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Quieres 60 dientes de ajo para sembrar y tus cabezas tienen unos 10 dientes. ¿Cuántas cabezas necesitas, sin margen?</p>', respuesta: 60 / 10,
        pista: '<p>Divide los dientes entre los de cada cabeza.</p>',
        solucion: '<p>60 ÷ 10 = <strong>6 cabezas</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Quieres sembrar 30 papas y guardas un 20% más por si alguna se pudre. ¿Cuántas papas guardas?</p>', respuesta: 30 * 1.2,
        pista: '<p>Calcula el 20% de 30 y súmalo.</p>',
        solucion: '<p>El 20% de 30 es 6, así que guardas 30 + 6 = <strong>36 papas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Iowa, ¿por qué conviene sembrar papa de semilla certificada?</p>',
        opciones: ['Porque es más barata', 'Porque crece sin agua', 'Porque está revisada y libre de enfermedades que no se ven'], correcta: 2,
        pista: '<p>Las papas guardadas pueden traer algo escondido.</p>',
        solucion: '<p><strong>Porque está libre de enfermedades</strong> que no se ven a simple vista.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué dientes de ajo conviene guardar para sembrar?</p>',
        opciones: ['Los más grandes de las cabezas más sanas', 'Los más pequeños', 'Los que sobraron de cocinar'], correcta: 0,
        pista: '<p>Iowa dice que dan los rendimientos más altos.</p>',
        solucion: '<p><strong>Los más grandes</strong>, de cabezas sanas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué las enfermedades pasan con más facilidad en las papas guardadas que en las semillas?</p>',
        opciones: ['Porque las papas son más grandes', 'Porque la papa es un clon y hereda los virus de la planta madre', 'Porque las papas se guardan en la oscuridad'], correcta: 1,
        pista: '<p>Recuerda qué es la reproducción vegetativa.</p>',
        solucion: '<p><strong>Porque es un clon</strong> y lleva dentro los virus de su madre.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la papa para sembrar revisada por una autoridad agrícola para asegurar que no trae enfermedades?</p>',
        respuestas: ['semilla certificada', 'papa certificada', 'certificada', 'papa de semilla certificada', 'semilla de papa certificada'],
        pista: '<p>Lleva un "certificado".</p>',
        solucion: '<p>La <strong>semilla certificada</strong>.</p>' },
    ],
    fuentes: [IOWA('growing-potatoes-home-garden', 'Growing Potatoes in the Home Garden'), IOWA('growing-garlic-home-garden', 'Growing Garlic in the Home Garden'), WIKI('Fitovirus', 'Fitovirus')],
  });

  // ------------------------------------------------------------------
  L('Bancos e intercambio comunitario de semillas', {
    objetivo: 'Explicar qué es un banco comunitario de semillas, cómo funciona un préstamo de semillas y cómo empezar a intercambiar semillas en tu comunidad.',
    explicacion: `
      <p>Una familia pierde su cosecha por una sequía y se queda sin semilla para el próximo año. En muchos pueblos, la respuesta no es comprarla lejos: es pedirla prestada a los vecinos, que la devuelven después de cosechar. Esa costumbre tan antigua es la base de los bancos comunitarios de semillas.</p>
      <h3>¿Qué es un banco comunitario de semillas?</h3>
      <p>El manual de Bioversity International, una organización internacional de investigación agrícola, explica que un <strong>banco comunitario de semillas</strong> es, por lo general, una organización informal, gobernada y manejada por la propia comunidad, cuya función central es guardar semillas para uso local. Existen desde hace unos 30 años y se dedican sobre todo, aunque no solo, a las variedades locales.</p>
      <h3>Para qué sirven</h3>
      <p>El mismo manual describe tres funciones principales:</p>
      <ul>
        <li>Conservación: guardan las variedades locales, incluidas las raras y las heredadas de las familias, y ayudan a recuperar variedades que se habían perdido.</li>
        <li>Acceso y disponibilidad: ofrecen semilla adaptada al lugar a bajo costo, fomentan el intercambio y, cuando tienen suficiente, ayudan a responder a sequías, desastres o escasez de semilla.</li>
        <li>Soberanía alimentaria y de semillas: la comunidad mantiene el control sobre sus semillas y comparte el conocimiento sobre ellas.</li>
      </ul>
      <p>Bioversity aclara que estos bancos regeneran su semilla cada año, sembrándola, como viste en "Cuánto duran las semillas".</p>
      <h3>Cómo funciona un préstamo de semillas</h3>
      <p>Según Bioversity, algunos bancos venden la semilla a un precio justo y otros la prestan. En el préstamo, quien recibe la semilla debe devolver, después de cosechar, una cantidad mayor que la que recibió: entre 50% y 100% más. Así el banco crece cada temporada y puede prestar a más familias. Las reglas las fijan entre todos los miembros.</p>
      <h3>Del pueblo al mundo</h3>
      <p>Además de los bancos comunitarios, existen bancos de semillas nacionales e internacionales, llamados <strong>bancos de germoplasma</strong>, que guardan semillas por décadas a temperaturas muy bajas. El más famoso es la Bóveda Global de Semillas de Svalbard, en una isla de Noruega cerca del Polo Norte. Según Crop Trust, la organización que la apoya, guarda copias de más de 1.4 millones de muestras de semillas de 134 instituciones, con semillas de casi todos los países, a −18 °C, dentro de una montaña con suelo congelado todo el año. Funciona como una caja de seguridad: cada institución sigue siendo dueña de sus semillas.</p>
      <h3>Empezar en tu comunidad</h3>
      <ol>
        <li>Junta a unas cuantas personas que guarden semillas, aunque sea de pocas variedades.</li>
        <li>Pónganse de acuerdo en reglas sencillas: qué semillas reciben, cómo se presta y cuánto se devuelve.</li>
        <li>Lleven un registro: variedad, quién la dio, cuándo se cosechó y su porcentaje de germinación.</li>
        <li>Guarden la semilla como viste en "Almacenar semillas" y regeneren cada año.</li>
        <li>Organicen un intercambio o una feria de semillas al empezar la temporada de siembra.</li>
      </ol>
      <p>También hay redes más grandes, como Seed Savers Exchange en Estados Unidos, donde personas de distintos lugares intercambian semillas de variedades tradicionales.</p>
      <p class="nota"><strong>Trampa común:</strong> recibir semillas sin anotar de dónde vienen ni qué tan viejas son. Sin registro, no sabes qué estás sembrando ni si todavía germina.</p>`,
    ejemplo: `
      <p>Un banco comunitario presta 2 kg de semilla de frijol a una familia, con la regla de devolver 50% más. Si la familia cosecha 40 kg, ¿cuánto devuelve y cuánto le queda?</p>
      <ol class="pasos-ej">
        <li>Primero calcula el 50% de 2 kg: la mitad de 2 es 1 kg.</li>
        <li>Lo que devuelve es lo prestado más ese 50%: 2 + 1 = 3 kg.</li>
        <li>Le queda su cosecha menos lo devuelto: 40 − 3 = 37 kg.</li>
        <li>Comprueba la ganancia del banco: prestó 2 kg y recibe 3, así que ahora tiene 1 kg más para prestar a otra familia.</li>
      </ol>
      <p>Resultado: <span class="resultado">devuelve 3 kg y le quedan 37 kg</span>.</p>
      <p class="nota"><strong>Error común:</strong> devolver solo el 50%, es decir, 1 kg. La regla es devolver lo prestado más el 50%.</p>`,
    vidaReal: `
      <p>Compartir semillas fortalece a toda la comunidad:</p>
      <ul>
        <li>Si pierdes tu cosecha, hay a quién pedirle semilla.</li>
        <li>Conoces variedades nuevas sin gastar dinero.</li>
        <li>Las variedades de tu región no se pierden cuando alguien deja de sembrarlas.</li>
        <li>Aprendes de la experiencia de otras personas que siembran cerca de ti.</li>
        <li>Puedes organizar una feria de semillas en tu escuela o colonia.</li>
        <li>Ayudas a que ninguna familia se quede sin semilla después de un mal año.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un banco presta 4 kg de semilla de maíz con la regla de devolver 100% más. ¿Cuántos kilos se devuelven?</p>', respuesta: 4 * 2,
        pista: '<p>100% más es el doble.</p>',
        solucion: '<p>4 + 4 = <strong>8 kg</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Un banco presta 5 kg de frijol a 6 familias y cada una devuelve 7.5 kg. ¿Cuántos kilos gana el banco en total?</p>', respuesta: (7.5 - 5) * 6,
        pista: '<p>Calcula la ganancia de cada préstamo y multiplica por las familias.</p>',
        solucion: '<p>Cada préstamo deja 7.5 − 5 = 2.5 kg, y 2.5 × 6 = <strong>15 kg</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Quién maneja un banco comunitario de semillas?</p>',
        opciones: ['Una empresa de semillas', 'La propia comunidad', 'El gobierno de otro país'], correcta: 1,
        pista: '<p>Bioversity dice que son organizaciones locales.</p>',
        solucion: '<p><strong>La propia comunidad</strong>, con sus propias reglas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Para qué regeneran cada año sus semillas los bancos comunitarios?</p>',
        opciones: ['Para venderlas más caras', 'Para cambiar de variedad', 'Para que siempre haya semilla fresca que germine bien'], correcta: 2,
        pista: '<p>Recuerda cuánto duran las semillas.</p>',
        solucion: '<p><strong>Para tener semilla fresca</strong> que todavía germine bien.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es la Bóveda Global de Semillas de Svalbard?</p>',
        opciones: ['Un banco de germoplasma que guarda copias de semillas de todo el mundo a −18 °C', 'Una tienda de semillas', 'Un banco comunitario de un pueblo de México'], correcta: 0,
        pista: '<p>Está en Noruega, cerca del Polo Norte.</p>',
        solucion: '<p><strong>Un banco de germoplasma</strong> que guarda más de 1.4 millones de muestras.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama una organización manejada por la comunidad que guarda semillas para uso local y las presta a las familias?</p>',
        respuestas: ['banco comunitario de semillas', 'banco de semillas', 'banco comunitario', 'el banco comunitario de semillas', 'un banco comunitario de semillas'],
        pista: '<p>Funciona como un banco, pero de semillas, y es de la comunidad.</p>',
        solucion: '<p>Un <strong>banco comunitario de semillas</strong>.</p>' },
    ],
    fuentes: [BIOV, CROPTRUST, SSE],
  });
})();
