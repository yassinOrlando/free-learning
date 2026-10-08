// Química · Unidad 10: Química en la vida diaria.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('quimica', titulo, datos);
  const txt = (x, y, texto) => ({ tipo: 'texto', x, y, texto });
  // Interpola en línea recta entre puntos medidos [[x, y], ...].
  const tramos = (datos) => (x) => {
    for (let i = 1; i < datos.length; i++) {
      const [x0, y0] = datos[i - 1], [x1, y1] = datos[i];
      if (x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    }
    return datos[datos.length - 1][1];
  };
  // Gráfica de barras de una sola serie (como en matematicas/estadistica.js): etiquetas abajo, valor encima.
  function barras({ etiquetas, valores, max, paso, descripcion }) {
    const n = valores.length;
    const figuras = valores.flatMap((v, i) => [
      { tipo: 'poligono', puntos: [[i + 0.15, 0], [i + 0.85, 0], [i + 0.85, v], [i + 0.15, v]], solido: true },
      txt(i + 0.5, -max * 0.07, etiquetas[i]),
      txt(i + 0.5, v + max * 0.05, String(v)),
    ]);
    return G({ x: [0, n], y: [-max * 0.12, max * 1.1], pasos: [1e9, paso], nombres: false, figuras, descripcion });
  }

  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const MEDLINE = (ruta, nombre) => ({ nombre: `MedlinePlus en español: ${nombre}`, url: `https://medlineplus.gov/spanish/${ruta}` });
  const KHAN = { nombre: 'Khan Academy en español: Macromoléculas', url: 'https://es.khanacademy.org/science/biology/macromolecules' };
  const PHET = (sim, nombre) => ({ nombre: `PhET, Universidad de Colorado: ${nombre}`, url: `https://phet.colorado.edu/es/simulations/${sim}` });

  // ------------------------------------------------------------------
  const ENERGIA = barras({ etiquetas: ['carbohidratos', 'proteínas', 'grasas'], valores: [4, 4, 9], max: 10, paso: 2,
    descripcion: 'Gráfica de barras de la energía que da cada gramo de alimento, en kilocalorías. Carbohidratos: 4. Proteínas: 4. Grasas: 9, más del doble que las otras dos.' });

  L('La química de los alimentos', {
    objetivo: 'Reconocer los tres grandes nutrientes, calcular la energía de una porción con la etiqueta y entender qué cambia al cocinar y al conservar la comida.',
    explicacion: `
      <p>Cuando fríes un huevo, la clara transparente se vuelve blanca y firme. Cuando tuestas pan, se pone dorado y huele delicioso. Cuando calientas azúcar, se vuelve caramelo. Cada vez que cocinas estás haciendo química: los cambios químicos que viste en la Unidad 1.</p>
      <h3>De qué está hecha la comida</h3>
      <p>Casi toda la comida está hecha de tres tipos de sustancias orgánicas. Las tres son moléculas grandes, muchas de ellas polímeros como los que viste en la unidad anterior.</p>
      <ul>
        <li>Los <strong>carbohidratos</strong> son azúcares y cadenas de azúcares, como el almidón del pan, la tortilla y la papa. Son el combustible principal de tu cuerpo.</li>
        <li>Las <strong>proteínas</strong> son largas cadenas de piezas llamadas aminoácidos. Están en la carne, el huevo, el frijol y la leche, y tu cuerpo las usa para construir músculos y reparar tejidos.</li>
        <li>Las <strong>grasas</strong> son sustancias que no se disuelven en agua, como el aceite, la mantequilla y la grasa de la carne. Guardan energía y forman parte de tus células.</li>
      </ul>
      <h3>¿Cuánta energía da cada uno?</h3>
      <p>La energía de la comida se mide en kilocalorías (kcal): la energía que hace falta para calentar un litro de agua un grado. Cada gramo de nutriente da una cantidad fija:</p>
      ${ENERGIA}
      <p>Las grasas dan más del doble de energía por gramo, porque sus moléculas tienen muchos enlaces C–H, los mismos que hacen arder a la gasolina. Con estos números puedes leer cualquier etiqueta nutrimental:</p>
      <p>energía = 4 × carbohidratos + 4 × proteínas + 9 × grasas</p>
      <p>Se lee "cuatro por los gramos de carbohidratos, más cuatro por los de proteína, más nueve por los de grasa".</p>
      <h3>Lo que pasa en la sartén</h3>
      <p>Las proteínas están dobladas en formas muy precisas. Con el calor se desdoblan y se enredan entre sí, y ya no regresan: por eso un huevo frito no se puede "desfreír". Al dorar el pan o la carne, los azúcares reaccionan con las proteínas y forman cientos de sustancias nuevas, de color café y con mucho sabor; a esto se le llama reacción de Maillard. Y al calentar azúcar sola se rompe y se forma el caramelo.</p>
      <h3>Lo que la conserva</h3>
      <p>La comida se echa a perder por microbios y reacciones químicas. El refrigerador las frena, porque a menor temperatura las reacciones son más lentas (Unidad 6). El vinagre de los encurtidos baja el pH, y muchos microbios no sobreviven en un medio tan ácido (Unidad 8). La sal y el azúcar de los embutidos y las mermeladas les quitan a los microbios el agua que necesitan.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que lo que tiene "cero azúcar" no tiene energía. Si tiene grasa o almidón, sigue dando kilocalorías.</p>`,
    ejemplo: `
      <p>La etiqueta de un paquete de galletas dice, por porción: 10 g de grasa, 20 g de carbohidratos y 5 g de proteína. ¿Cuántas kilocalorías tiene la porción?</p>
      <ol class="pasos-ej">
        <li>Calcula la energía de cada nutriente por separado, porque cada uno da distinto. Grasas: 10 × 9 = 90 kcal.</li>
        <li>Carbohidratos: 20 × 4 = 80 kcal.</li>
        <li>Proteínas: 5 × 4 = 20 kcal.</li>
        <li>Suma todo: 90 + 80 + 20 = 190 kcal.</li>
        <li>Comprueba con la etiqueta: casi siempre trae el total ya calculado. Puede variar unas pocas kilocalorías, porque las etiquetas redondean.</li>
      </ol>
      <p>Resultado: <span class="resultado">190 kcal</span>. Fíjate que la grasa, con solo 10 de los 35 gramos, aporta casi la mitad de la energía.</p>
      <p class="nota"><strong>Error común:</strong> sumar los gramos, 10 + 20 + 5 = 35, y multiplicar todo por un solo número. Cada nutriente tiene su propio valor.</p>`,
    vidaReal: `
      <p>Entender lo que pasa con la comida te ayuda en la cocina y en la salud:</p>
      <ul>
        <li>Puedes leer la etiqueta de un producto y saber cuánta energía te da de verdad.</li>
        <li>Sabes por qué el pan tostado sabe distinto al pan recién sacado de la bolsa.</li>
        <li>Entiendes por qué la comida dura más en el refrigerador y por qué los encurtidos duran meses.</li>
        <li>Puedes comparar dos productos y elegir el que más te convenga.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una porción tiene 15 g de grasa. ¿Cuántas kilocalorías aporta esa grasa?</p>', respuesta: 15 * 9,
        pista: '<p>Cada gramo de grasa da 9 kcal.</p>',
        solucion: '<p>15 × 9 = <strong>135 kcal</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Unas tortillas tienen 24 g de carbohidratos. ¿Cuántas kilocalorías aportan esos carbohidratos?</p>', respuesta: 24 * 4,
        pista: '<p>Cada gramo de carbohidratos da 4 kcal.</p>',
        solucion: '<p>24 × 4 = <strong>96 kcal</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué nutriente da más energía por cada gramo?</p>',
        opciones: ['Los carbohidratos', 'Las proteínas', 'Las grasas'], correcta: 2,
        pista: '<p>Revisa la gráfica de barras.</p>',
        solucion: '<p><strong>Las grasas</strong>, con 9 kcal por gramo; las otras dos dan 4.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué le pasa a la clara del huevo cuando la fríes?</p>',
        opciones: ['Sus proteínas se desdoblan y se enredan, y ya no regresan: es un cambio químico', 'Solo se seca y vuelve a ser transparente al enfriarse', 'Se evapora el agua y quedan las mismas sustancias'], correcta: 0,
        pista: '<p>¿Puedes "desfreír" un huevo?</p>',
        solucion: '<p><strong>Sus proteínas cambian de forma para siempre</strong>: por eso la clara se pone blanca y firme y no regresa.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué la comida dura más en el refrigerador?</p>',
        opciones: ['Porque el frío vuelve la comida más ácida', 'Porque el frío hace más lentas las reacciones y el crecimiento de los microbios', 'Porque el refrigerador quita el agua de la comida'], correcta: 1,
        pista: '<p>Recuerda la lección de velocidad de reacción.</p>',
        solucion: '<p>Porque <strong>a menor temperatura las reacciones son más lentas</strong>, incluidas las de los microbios.</p>' },
      { tipo: 'numero', enunciado: '<p>Un yogur tiene 3 g de grasa, 12 g de carbohidratos y 6 g de proteína. ¿Cuántas kilocalorías tiene en total?</p>', respuesta: 3 * 9 + 12 * 4 + 6 * 4,
        pista: '<p>Multiplica cada nutriente por su valor (9, 4 y 4) y suma.</p>',
        solucion: '<p>3 × 9 + 12 × 4 + 6 × 4 = 27 + 48 + 24 = <strong>99 kcal</strong>.</p>' },
    ],
    fuentes: [
      WIKI('Glúcido', 'Glúcido'),
      WIKI('Proteína', 'Proteína'),
      WIKI('Lípido', 'Lípido'),
      WIKI('Reacción_de_Maillard', 'Reacción de Maillard'),
      WIKI('Desnaturalización_(bioquímica)', 'Desnaturalización'),
      KHAN,
    ],
  });

  // ------------------------------------------------------------------
  L('Productos de limpieza: cuáles nunca mezclar', {
    objetivo: 'Reconocer las mezclas de limpiadores que producen gases tóxicos, saber por qué ocurre y qué hacer si alguien los respira.',
    explicacion: `
      <p>Alguien quiere dejar el baño impecable y piensa: "si mezclo el cloro con el otro limpiador, limpiará el doble". A los pocos segundos el baño se llena de un olor picante, le arden los ojos y le cuesta respirar. Mezclar limpiadores no suma su fuerza: puede formar gases tóxicos. Cada año muchas personas terminan en el hospital por esto, y la química te dice exactamente por qué.</p>
      <h3>El cloro de la casa</h3>
      <p>El "cloro" o blanqueador que se usa para desinfectar no es cloro puro: es <strong>hipoclorito de sodio</strong>, NaOCl, disuelto en agua. Mata gérmenes porque reacciona con muchas sustancias, y justo por eso es peligroso mezclarlo. Reacciona con otros limpiadores y suelta gases que dañan los pulmones.</p>
      <h3>Las mezclas que nunca debes hacer</h3>
      <div class="tabla-wrap"><table>
        <tr><th>Mezcla</th><th>Qué se forma</th><th>Qué hace</th></tr>
        <tr><th>Cloro + amoniaco (algunos limpiavidrios y limpiadores multiusos)</th><td>Cloraminas</td><td>Irritan los ojos y los pulmones; pueden causar asfixia</td></tr>
        <tr><th>Cloro + ácidos (vinagre, quitasarro, limpiadores de baño con ácido muriático, que es ácido clorhídrico)</th><td>Gas cloro</td><td>Quema los ojos, la garganta y los pulmones</td></tr>
        <tr><th>Cloro + alcohol</th><td>Cloroformo y otras sustancias tóxicas</td><td>Mareo, daño al hígado y a los pulmones</td></tr>
        <tr><th>Agua oxigenada + vinagre</th><td>Un ácido corrosivo</td><td>Irrita la piel, los ojos y los pulmones</td></tr>
      </table></div>
      <p>Las dos primeras son las más comunes. Las <strong>cloraminas</strong> son compuestos de cloro y nitrógeno que se forman cuando el cloro reacciona con el amoniaco. El <strong>gas cloro</strong>, Cl₂, se forma cuando el hipoclorito se encuentra con un ácido. Es un gas verde amarillento, más pesado que el aire, que se queda abajo, cerca de quien está limpiando, y fue usado como arma en la Primera Guerra Mundial.</p>
      <p>Hay una mezcla que no es peligrosa, pero tampoco sirve: vinagre con bicarbonato. Hace mucha espuma, pero es una neutralización, como la de la Unidad 5. El ácido y la base se anulan, y lo que queda es agua con una sal disuelta y un gas (dióxido de carbono) que se escapa. Limpia menos que cada uno por separado. Si lo mezclas, nunca lo hagas en un envase cerrado, porque el gas puede reventarlo.</p>
      <h3>Reglas para limpiar con seguridad</h3>
      <ul>
        <li>Usa un solo producto a la vez, y enjuaga con agua antes de usar otro.</li>
        <li>Abre ventanas y puertas mientras limpias.</li>
        <li>Lee la etiqueta y respeta los dibujos de advertencia.</li>
        <li>Guarda cada producto en su envase original, bien cerrado y lejos de los niños. Nunca lo pases a una botella de refresco.</li>
      </ul>
      <p>Si alguien respira una mezcla, sácalo al aire libre de inmediato, aléjate tú también y llama a emergencias o al centro de toxicología. Si alguien se tragó un limpiador, no le provoques el vómito: llama primero.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que si algo huele más fuerte, limpia mejor. Un olor picante que no estaba antes es una señal de que se formó un gas tóxico: sal de ahí.</p>`,
    ejemplo: `
      <p>En la casa hay un limpiador de baño cuya etiqueta dice "contiene ácido clorhídrico" y un blanqueador que dice "hipoclorito de sodio". ¿Se pueden usar juntos?</p>
      <ol class="pasos-ej">
        <li>Identifica qué es cada uno: el ácido clorhídrico es un ácido, y el hipoclorito de sodio es el cloro de la casa.</li>
        <li>Busca la combinación en la tabla: cloro con ácido forma gas cloro. No se deben mezclar, ni siquiera echar uno después del otro sin enjuagar.</li>
        <li>Mira la ecuación de lo que pasaría: NaOCl + 2HCl → Cl₂ + NaCl + H₂O.</li>
        <li>Comprueba que esté balanceada, como en la Unidad 6. Cloro: 1 + 2 = 3 a la izquierda y 2 + 1 = 3 a la derecha. Hidrógeno: 2 y 2. Sodio y oxígeno: 1 y 1.</li>
      </ol>
      <p>Resultado: <span class="resultado">no se deben mezclar: forman gas cloro</span>. Usa uno, enjuaga bien y ventila antes de usar el otro.</p>
      <p class="nota"><strong>Error común:</strong> pensar que si no se mezclan en la misma cubeta no hay riesgo. Si echas uno en el excusado donde ya estaba el otro, también se mezclan.</p>`,
    vidaReal: `
      <p>Lo que hay en el armario de la limpieza merece respeto:</p>
      <ul>
        <li>Limpiar el baño o la cocina puede ser peligroso si mezclas productos sin saberlo.</li>
        <li>Leer las etiquetas te dice qué productos nunca deben usarse juntos.</li>
        <li>Guardar los limpiadores en su envase original evita que alguien se los tome por error.</li>
        <li>Saber qué hacer en una emergencia puede salvarle la vida a alguien de tu familia.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué mezcla forma cloraminas, unos gases que irritan los pulmones?</p>',
        opciones: ['Vinagre con bicarbonato', 'Cloro con amoniaco', 'Agua con jabón'], correcta: 1,
        pista: '<p>Las cloraminas tienen cloro y nitrógeno.</p>',
        solucion: '<p><strong>Cloro con amoniaco</strong>: el amoniaco aporta el nitrógeno. Por eso nunca se mezcla el cloro con limpiavidrios que tengan amoniaco.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué pasa si mezclas cloro con vinagre?</p>',
        opciones: ['Se forma gas cloro, que quema los ojos y los pulmones', 'Limpian el doble', 'No pasa nada, porque el vinagre es natural'], correcta: 0,
        pista: '<p>El vinagre es un ácido.</p>',
        solucion: '<p>Se forma <strong>gas cloro</strong>, porque el hipoclorito reacciona con cualquier ácido, aunque sea "natural" como el vinagre.</p>' },
      { tipo: 'opciones', enunciado: '<p>Alguien respiró los gases de una mezcla de limpiadores. ¿Qué es lo primero que hay que hacer?</p>',
        opciones: ['Darle leche para que se le pase', 'Echar agua en el baño para diluir el gas', 'Sacarlo al aire libre y llamar a emergencias o al centro de toxicología'], correcta: 2,
        pista: '<p>El gas sigue en el cuarto.</p>',
        solucion: '<p><strong>Sacarlo al aire libre</strong>, alejarte tú también, y llamar a emergencias o al centro de toxicología.</p>' },
      { tipo: 'numero', enunciado: '<p>En la ecuación NaOCl + 2HCl → Cl₂ + NaCl + H₂O, ¿cuántos átomos de cloro hay del lado de los reactivos?</p>', respuesta: 1 + 2,
        pista: '<p>Cuenta el cloro del NaOCl y los de las 2 moléculas de HCl.</p>',
        solucion: '<p>1 del NaOCl + 2 del 2HCl = <strong>3</strong>. A la derecha también hay 3: 2 del Cl₂ y 1 del NaCl.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué pasa al mezclar vinagre con bicarbonato para limpiar?</p>',
        opciones: ['Forman un gas tóxico', 'Se neutralizan: hacen espuma pero limpian menos que cada uno por separado', 'Forman cloro'], correcta: 1,
        pista: '<p>El vinagre es un ácido y el bicarbonato es una base.</p>',
        solucion: '<p><strong>Se neutralizan</strong>: el gas de la espuma es dióxido de carbono, que no es tóxico, pero lo que queda es agua con una sal disuelta, que casi no limpia.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas es una práctica segura al limpiar?</p>',
        opciones: ['Pasar el cloro a una botella de refresco para que sea más fácil usarlo', 'Mezclar dos limpiadores para que limpien más', 'Usar un producto a la vez, enjuagar y ventilar'], correcta: 2,
        pista: '<p>Solo una de las tres no tiene riesgo.</p>',
        solucion: '<p><strong>Usar un producto a la vez, enjuagar y ventilar.</strong> Pasar limpiadores a botellas de refresco causa intoxicaciones, sobre todo en niños.</p>' },
    ],
    fuentes: [
      WIKI('Hipoclorito_de_sodio', 'Hipoclorito de sodio'),
      WIKI('Cloramina', 'Cloramina'),
      WIKI('Lejía', 'Lejía'),
      MEDLINE('ency/article/002488.htm', 'Intoxicación con hipoclorito de sodio'),
      MEDLINE('ency/article/002491.htm', 'Intoxicación con hidróxido de amonio'),
      MEDLINE('poisoning.html', 'Envenenamiento'),
    ],
  });

  // ------------------------------------------------------------------
  const DATOS_CO2 = [[1800, 280], [1900, 296], [1960, 317], [1980, 339], [2000, 370], [2020, 414]];
  const CO2 = G({ x: [1800, 2020], y: [250, 450], pasos: [50, 50], nombres: false, funciones: [
    { f: tramos(DATOS_CO2), etiqueta: 'CO₂ en el aire (ppm)', serie: 0 },
  ], puntos: [{ x: 1800, y: 280, etiqueta: '1800: 280' }, { x: 1960, y: 317, etiqueta: '1960: 317' }, { x: 2020, y: 414, etiqueta: '2020: 414' }],
  descripcion: 'Gráfica de la cantidad de dióxido de carbono en el aire, en partes por millón, de 1800 a 2020. La línea va casi plana de 280 en 1800 a 296 en 1900, sube a 317 en 1960 y después sube cada vez más rápido: 339 en 1980, 370 en 2000 y 414 en 2020. El eje vertical empieza en 250, no en cero, para que se vea mejor el cambio.' });

  L('Química y medio ambiente', {
    objetivo: 'Entender cómo la química explica el efecto invernadero, el daño a la capa de ozono y la lluvia ácida, y qué se puede hacer.',
    explicacion: `
      <p>El aire parece infinito, y es fácil pensar que el humo de un coche o de una fábrica desaparece sin más. Pero en la Unidad 1 viste que la masa no desaparece: los gases que sueltan los motores, las fábricas y las estufas se quedan en el aire, y con los años se acumulan.</p>
      <h3>Una cobija de gases</h3>
      <p>La luz del Sol calienta la Tierra, y la Tierra devuelve ese calor hacia el espacio. Algunos gases del aire, como el dióxido de carbono (CO₂), el metano y el vapor de agua, atrapan parte de ese calor, como una cobija. A esto se le llama <strong>efecto invernadero</strong>. Es natural y necesario: sin él, la Tierra estaría congelada. El problema es que la cobija se está haciendo más gruesa.</p>
      <p>Para medir gases que están en cantidades pequeñas se usan las <strong>ppm</strong>, partes por millón: cuántas partículas de un gas hay en cada millón de partículas de aire. 280 ppm de CO₂ quiere decir 280 partículas de CO₂ en cada millón.</p>
      ${CO2}
      <p>Antes de las fábricas, el aire tenía unas 280 ppm de CO₂. En 2023 ya tenía unas 420. La mayor parte de ese aumento viene de quemar carbón, petróleo y gas: en las Unidades 6 y 9 viste que la combustión completa de un compuesto con carbono suelta CO₂. Más CO₂ atrapa más calor, y eso calienta el planeta y cambia el clima.</p>
      <h3>El escudo de ozono</h3>
      <p>Muy arriba en la atmósfera hay una capa de un gas llamado ozono, O₃, formado por tres átomos de oxígeno. Esa <strong>capa de ozono</strong> nos protege, porque absorbe buena parte de la luz ultravioleta del Sol, la que quema la piel y puede causar cáncer.</p>
      <p>A mediados del siglo XX se usaban mucho unos gases llamados CFC en aerosoles y refrigeradores. Al subir a la atmósfera, la luz del Sol los rompe y sueltan cloro, que destruye el ozono. Sobre la Antártida se abrió un "agujero". En 1987, casi todos los países firmaron el Protocolo de Montreal para dejar de usarlos, y la capa se está recuperando: se espera que sobre la Antártida vuelva a estar como antes hacia 2066. Es una prueba de que, cuando se entiende la química de un problema, se puede arreglar.</p>
      <h3>Lluvia que daña</h3>
      <p>En la Unidad 8 viste que la lluvia ácida tiene un pH menor que 5.6. Se forma cuando el dióxido de azufre (SO₂) y los óxidos de nitrógeno del humo se disuelven en el agua de las nubes y forman ácido sulfúrico y ácido nítrico, los oxácidos de la Unidad 5. Daña bosques, lagos y edificios. Los filtros de las fábricas y los convertidores catalíticos de los coches la han reducido mucho.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir el agujero de la capa de ozono con el efecto invernadero. Son problemas distintos, con gases distintos: el ozono nos protege de la luz ultravioleta, y el CO₂ atrapa calor.</p>`,
    ejemplo: `
      <p>¿Cuántos gramos de CO₂ salen al quemar 16 g de metano, el gas de la estufa? La ecuación es CH₄ + 2O₂ → CO₂ + 2H₂O.</p>
      <ol class="pasos-ej">
        <li>Pasa el metano a moles, como en la Unidad 7. Su masa molar es 12 + 4 × 1 = 16 g/mol, así que 16 g son 1 mol.</li>
        <li>Usa la relación molar: 1 mol de CH₄ da 1 mol de CO₂.</li>
        <li>Pasa a gramos: la masa molar del CO₂ es 12 + 2 × 16 = 44 g/mol: salen 44 g.</li>
        <li>Comprueba con la conservación de la masa. Reactivos: 16 g de metano + 2 × 32 = 64 g de oxígeno = 80 g. Productos: 44 g de CO₂ + 2 × 18 = 36 g de agua = 80 g. Coinciden.</li>
      </ol>
      <p>Resultado: <span class="resultado">44 g de CO₂</span>. Sale casi el triple de lo que pesaba el gas, porque el carbono se lleva consigo dos oxígenos del aire.</p>
      <p class="nota"><strong>Error común:</strong> pensar que el CO₂ no puede pesar más que el combustible. El oxígeno que se le junta también tiene masa.</p>`,
    vidaReal: `
      <p>Lo que respiras y el clima que vives dependen de lo que hay en el aire:</p>
      <ul>
        <li>Caminar, usar la bici o el transporte público reduce el humo de los coches.</li>
        <li>Los refrigeradores y aerosoles de hoy ya no llevan los gases que dañaban el cielo.</li>
        <li>Ahorrar electricidad y gas en casa reduce lo que se quema para producirlos.</li>
        <li>Entiendes por qué conviene usar protector solar: el cielo filtra parte de la luz que quema la piel, pero no toda.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>El CO₂ del aire pasó de 280 ppm a 420 ppm. ¿En qué porcentaje aumentó?</p>', respuesta: (420 - 280) / 280 * 100,
        pista: '<p>Calcula cuánto subió y divide entre el valor inicial.</p>',
        solucion: '<p>Subió 420 − 280 = 140, y 140 ÷ 280 × 100 = <strong>50%</strong>: la mitad más que antes.</p>' },
      { tipo: 'numero', enunciado: '<p>El aire tiene 420 ppm de CO₂. ¿Cuántas partículas de CO₂ hay en cada millón de partículas de aire?</p>', respuesta: 420,
        pista: '<p>ppm quiere decir partes por millón.</p>',
        solucion: '<p>Hay <strong>420</strong>. Parece poco, pero basta para atrapar mucho calor.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos gases es uno de los principales responsables del efecto invernadero?</p>',
        opciones: ['El dióxido de carbono, CO₂', 'El nitrógeno, N₂', 'El helio, He'], correcta: 0,
        pista: '<p>Es el que sale al quemar carbón, petróleo y gas.</p>',
        solucion: '<p>El <strong>dióxido de carbono</strong>, que sale de quemar carbón, petróleo y gas.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué gases dañaron la capa de ozono?</p>',
        opciones: ['El vapor de agua', 'Los CFC de aerosoles y refrigeradores', 'El oxígeno que respiramos'], correcta: 1,
        pista: '<p>Se prohibieron con el Protocolo de Montreal.</p>',
        solucion: '<p>Los <strong>CFC</strong>: al romperse sueltan cloro, que destruye el ozono.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿De dónde viene la lluvia ácida?</p>',
        opciones: ['Del CO₂ que respiramos', 'Del agua de mar que se evapora', 'Del dióxido de azufre y los óxidos de nitrógeno del humo'], correcta: 2,
        pista: '<p>Forman ácido sulfúrico y ácido nítrico.</p>',
        solucion: '<p>Del <strong>dióxido de azufre y los óxidos de nitrógeno</strong> del humo, que forman ácidos al disolverse en las nubes.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos gramos de CO₂ salen al quemar 32 g de metano? Recuerda que 16 g de metano dan 44 g de CO₂.</p>', respuesta: 32 / 16 * 44,
        pista: '<p>32 g es el doble de 16 g.</p>',
        solucion: '<p>Con el doble de metano sale el doble de CO₂: 2 × 44 = <strong>88 g</strong>.</p>' },
    ],
    fuentes: [
      WIKI('Efecto_invernadero', 'Efecto invernadero'),
      WIKI('Cambio_climático', 'Cambio climático'),
      WIKI('Agujero_de_la_capa_de_ozono', 'Agujero de la capa de ozono'),
      WIKI('Lluvia_ácida', 'Lluvia ácida'),
      PHET('greenhouse-effect', 'El efecto invernadero'),
    ],
  });
})();
