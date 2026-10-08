// Ciencias naturales · Unidad 3: Salud.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Temas de salud: solo OMS y MedlinePlus como fuentes de salud; sin diagnósticos ni dosis; siempre cuándo pedir ayuda.
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('ciencias-naturales', titulo, datos);
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
  const caja = (x0, y0, x1, y1, relleno = false) => ({ tipo: 'poligono', puntos: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], relleno });
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
  const OMS = (ficha, nombre) => ({ nombre: `Organización Mundial de la Salud: ${nombre}`, url: `https://www.who.int/es/news-room/fact-sheets/detail/${ficha}` });

  // ------------------------------------------------------------------
  const PLATO = diagrama([0.2, 5.8], [0.2, 5.8], [
    { tipo: 'circulo', x: 3, y: 3, r: 2.6 },
    { tipo: 'linea', desde: [3, 0.4], hasta: [3, 5.6] },
    { tipo: 'linea', desde: [3, 3], hasta: [5.6, 3] },
    txt(1.75, 3.25, 'verduras'), txt(1.75, 2.75, 'y frutas'),
    txt(4.2, 4.1, 'cereales'), txt(4.2, 1.9, 'proteínas'),
  ], 'Un plato redondo dividido en tres partes. La mitad izquierda dice verduras y frutas. La mitad derecha está partida en dos cuartos: arriba, cereales; abajo, proteínas.');

  L('Nutrición y alimentación equilibrada', {
    objetivo: 'Saber qué necesita tu cuerpo además de energía y armar una comida equilibrada con las metas de la OMS.',
    explicacion: `
      <p>Un coche no funciona solo con gasolina. También necesita aceite, agua y líquido de frenos, cada cosa en su medida. Si le sobra gasolina pero le falta aceite, el motor se daña. Con tu cuerpo pasa algo parecido.</p>
      <p>En Química viste que la comida tiene tres grandes nutrientes, carbohidratos, proteínas y grasas, que dan energía medida en kilocalorías. Pero comer bien no es solo comer suficiente energía. También es darle a tu cuerpo todas las piezas que necesita, en la proporción correcta.</p>
      <h3>Las piezas pequeñas</h3>
      <p>Las <strong>vitaminas</strong> son sustancias que tu cuerpo necesita en cantidades muy pequeñas y que casi nunca puede fabricar por sí mismo. No dan energía, pero sin ellas muchas tareas se detienen. La vitamina C, de la naranja, la guayaba y el chile, ayuda a cicatrizar las heridas. La vitamina A, de la zanahoria, ayuda a ver con poca luz.</p>
      <p>Los <strong>minerales</strong> son elementos químicos, como los de la tabla periódica, que tu cuerpo también necesita en poca cantidad. En Huesos y músculos viste que el calcio forma los huesos. El hierro, que hay en los frijoles, las lentejas, la carne y las verduras de hoja verde, ayuda a la sangre a llevar oxígeno; cuando falta, te cansas con facilidad.</p>
      <p>Además necesitas agua, porque más de la mitad de tu cuerpo es agua, y fibra, la parte de las plantas que no digieres pero que ayuda a tu intestino.</p>
      <h3>¿Qué es comer equilibrado?</h3>
      <p>Una <strong>dieta equilibrada</strong> es la que te da toda la energía y todas las piezas que necesitas, sin que sobre ni falte nada. Aquí "dieta" no significa comer menos, sino lo que comes normalmente. Ningún alimento lo tiene todo, y por eso la clave es la variedad. Una forma práctica de lograrlo, que usan muchas guías, es pensar en tu plato:</p>
      ${PLATO}
      <ul>
        <li>La mitad del plato son verduras y frutas, que aportan vitaminas, minerales y fibra.</li>
        <li>Un cuarto son cereales, como tortilla, arroz o pan, que dan energía; mejor si son integrales.</li>
        <li>El otro cuarto son proteínas, como frijoles, huevo, pescado o pollo.</li>
        <li>Para beber, lo mejor es agua simple.</li>
      </ul>
      <h3>Tres metas de la OMS</h3>
      <p>La Organización Mundial de la Salud propone metas sencillas:</p>
      <ul>
        <li>A partir de los 10 años, come al menos 400 gramos de frutas y verduras al día, más o menos cinco porciones.</li>
        <li>Los azúcares libres, que son los que se agregan a la comida más los de los jugos y la miel, deben ser menos del 10% de la energía del día.</li>
        <li>Un adulto debe comer menos de 5 gramos de sal al día, más o menos una cucharadita, y los niños, todavía menos.</li>
      </ul>
      <p>¿Por qué importan? El exceso de azúcar daña los dientes y, con los años, aumenta el riesgo de enfermedades como la diabetes. El exceso de sal sube la presión de la sangre, lo que cansa al corazón.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que un jugo de fruta cuenta igual que la fruta entera. Al hacer jugo se pierde casi toda la fibra y el azúcar queda suelto, por eso la OMS recomienda limitarlo.</p>`,
    ejemplo: `
      <p>Una persona come 2 000 kcal al día. Según la meta de la OMS, ¿cuántos gramos de azúcares libres puede comer como máximo?</p>
      <ol class="pasos-ej">
        <li>Primero calcula el 10% de la energía. El 10% es dividir entre 10: 2 000 ÷ 10 = 200 kcal.</li>
        <li>Ahora pasa esas kilocalorías a gramos. En Química viste que cada gramo de azúcar da 4 kcal, así que divides: 200 ÷ 4 = 50 gramos.</li>
        <li>Comprueba al revés: 50 gramos × 4 = 200 kcal, que es justo el 10% de 2 000.</li>
      </ol>
      <p>Resultado: <span class="resultado">50 gramos de azúcar al día, como máximo</span>, unas 12 cucharaditas. Fíjate que un solo refresco grande puede traer más que eso.</p>
      <p class="nota"><strong>Error común:</strong> dividir entre 9 en lugar de entre 4. El 9 es para las grasas; el azúcar es un carbohidrato y da 4 kcal por gramo.</p>`,
    vidaReal: `
      <p>Lo que eliges comer se nota en tu día a día:</p>
      <ul>
        <li>Comer variado te da energía para estudiar, jugar y trabajar sin cansarte tan rápido.</li>
        <li>Elegir agua en lugar de refresco cuida tus dientes y tu corazón.</li>
        <li>Las frutas y verduras de temporada suelen ser más baratas y más sabrosas.</li>
        <li>Cocinar en casa te deja controlar cuánta sal y cuánta azúcar comes.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una persona come 1 800 kcal al día. ¿Cuántos gramos de azúcares libres puede comer como máximo para no pasar del 10%?</p>', respuesta: 1800 * 10 / 100 / 4,
        pista: '<p>Saca el 10% de 1 800 kcal y luego divide entre las 4 kcal que da cada gramo de azúcar.</p>',
        solucion: '<p>El 10% de 1 800 es 180 kcal, y 180 ÷ 4 = <strong>45 gramos</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Hoy comiste una manzana de 150 g, una zanahoria de 80 g y un plátano de 120 g. ¿Cuántos gramos de frutas y verduras te faltan para llegar a los 400 g de la OMS?</p>', respuesta: 400 - (150 + 80 + 120),
        pista: '<p>Suma lo que ya comiste y réstalo de 400.</p>',
        solucion: '<p>Ya llevas 150 + 80 + 120 = 350 g, así que te faltan 400 − 350 = <strong>50 g</strong>, por ejemplo, un jitomate pequeño.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué mineral ayuda a la sangre a llevar oxígeno?</p>',
        opciones: ['El calcio', 'El hierro', 'El sodio'], correcta: 1,
        pista: '<p>Está en los frijoles, las lentejas y las verduras de hoja verde.</p>',
        solucion: '<p>El <strong>hierro</strong>. El calcio forma los huesos, y el sodio viene sobre todo de la sal.</p>' },
      { tipo: 'opciones', enunciado: '<p>En el plato de la explicación, ¿qué ocupa la mitad?</p>',
        opciones: ['Los cereales', 'Las proteínas', 'Las verduras y frutas'], correcta: 2,
        pista: '<p>Son las que aportan más vitaminas, minerales y fibra.</p>',
        solucion: '<p><strong>Las verduras y frutas</strong>. Los cereales y las proteínas ocupan un cuarto cada uno.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas opciones es mejor para la meta de frutas y verduras?</p>',
        opciones: ['Una naranja entera', 'Un vaso de jugo de naranja de caja', 'Un caramelo sabor naranja'], correcta: 0,
        pista: '<p>Piensa en qué se pierde al hacer jugo.</p>',
        solucion: '<p><strong>La naranja entera</strong>, porque conserva su fibra. El jugo tiene el azúcar suelto, y el caramelo es casi solo azúcar.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llaman las sustancias que tu cuerpo necesita en cantidades muy pequeñas, que no dan energía y que casi nunca puede fabricar, como la C de la naranja?</p>',
        respuestas: ['vitamina', 'vitaminas', 'las vitaminas'],
        pista: '<p>Se nombran con letras: A, C, D...</p>',
        solucion: '<p>Las <strong>vitaminas</strong>.</p>' },
    ],
    fuentes: [
      OMS('healthy-diet', 'Alimentación saludable'),
      OMS('salt-reduction', 'Reducción de la ingesta de sodio'),
      MEDLINE('nutrition.html', 'Nutrición'),
      MEDLINE('vitamins.html', 'Vitaminas'),
      MEDLINE('minerals.html', 'Minerales en la dieta'),
      WIKI('Alimentación_saludable', 'Alimentación saludable'),
    ],
  });

  // ------------------------------------------------------------------
  L('Cómo leer una etiqueta nutricional', {
    objetivo: 'Leer la etiqueta de un alimento empacado para saber cuánto comes de verdad y comparar dos productos.',
    explicacion: `
      <p>En el súper ves dos cajas de cereal. Una tiene el dibujo de un deportista y dice "con vitaminas"; la otra casi no dice nada. ¿Cuál conviene más? Lo del frente de la caja es publicidad. La respuesta está atrás, en letras pequeñas.</p>
      <p>La etiqueta nutricional es la tabla que dice qué tiene un alimento empacado. En Química aprendiste a calcular las kilocalorías a partir de los gramos de cada nutriente. Ahora vas a usar la etiqueta para decidir.</p>
      <h3>Primero, la porción</h3>
      <p>Una <strong>porción</strong> es la cantidad de alimento a la que se refieren los números de la etiqueta. No es lo que debes comer ni el paquete completo: es una medida de referencia que escoge el fabricante. Una bolsa de papitas puede decir "130 kcal por porción" y traer 3 porciones. Si te comes la bolsa entera, comes 3 × 130 = 390 kcal. Por eso lo primero que miras es el tamaño de la porción y cuántas porciones trae el envase.</p>
      <h3>Una etiqueta de ejemplo</h3>
      <p>Esta es la etiqueta de un cereal inventado, que trae 10 porciones por caja:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Dato</th><th>Por porción (30 g)</th><th>% del valor diario</th></tr>
        <tr><th>Energía</th><td>120 kcal</td><td>6%</td></tr>
        <tr><th>Grasas</th><td>1 g</td><td>1%</td></tr>
        <tr><th>Carbohidratos</th><td>26 g</td><td>9%</td></tr>
        <tr><th>de ellos, azúcares</th><td>12 g</td><td>sin dato</td></tr>
        <tr><th>Proteínas</th><td>2 g</td><td>4%</td></tr>
        <tr><th>Fibra</th><td>1 g</td><td>4%</td></tr>
        <tr><th>Sodio</th><td>150 mg</td><td>7%</td></tr>
      </table></div>
      <p>El <strong>valor diario</strong> dice qué parte de lo que necesita en un día una persona promedio aporta una porción, calculado sobre 2 000 kcal. Un truco útil: 5% o menos es poco, y 20% o más es mucho. Úsalo para buscar mucho de lo bueno, como la fibra, y poco de lo que conviene limitar, como el sodio. Este cereal tiene poca fibra, y casi la mitad de sus carbohidratos son azúcar.</p>
      <h3>La lista de ingredientes</h3>
      <p>La <strong>lista de ingredientes</strong> nombra todo lo que tiene el producto, ordenado de mayor a menor cantidad. Si el azúcar aparece primero, es lo que más hay. Fíjate también en los otros nombres del azúcar, como jarabe de maíz, glucosa, fructosa o dextrosa. Si tienes alguna alergia, ahí revisas si el producto contiene lo que te la causa.</p>
      <p>En algunos países, como México, Chile o Argentina, los productos llevan además sellos negros de advertencia, como "exceso de azúcares" o "exceso de sodio". Son un atajo: entre dos productos parecidos, el que tiene menos sellos suele ser mejor opción.</p>
      <h3>Comparar dos productos</h3>
      <p>Para comparar de forma justa, usa la misma cantidad de los dos, porque las porciones cambian de una marca a otra. Muchas etiquetas traen una columna "por 100 g", que sirve justo para eso. Si no la traen, puedes calcularla con una regla de tres.</p>
      <p class="nota"><strong>Trampa común:</strong> creerle a las frases del frente, como "natural", "light" o "con vitaminas". Un producto "light" solo tiene menos de algo que su versión normal, y puede seguir teniendo mucha azúcar o sal. Lo que cuenta es la tabla.</p>`,
    ejemplo: `
      <p>El cereal A trae 12 g de azúcar en una porción de 30 g. El cereal B trae 14 g en una porción de 40 g. ¿Cuál tiene menos azúcar?</p>
      <ol class="pasos-ej">
        <li>Por porción, A parece mejor: 12 g contra 14 g. Pero las porciones son distintas, así que esa comparación no es justa.</li>
        <li>Calcula el azúcar en 100 g de A con una regla de tres: 12 ÷ 30 × 100 = 40 g.</li>
        <li>Haz lo mismo con B: 14 ÷ 40 × 100 = 35 g.</li>
        <li>Comprueba A al revés: si en 100 g hay 40 g de azúcar, en 30 g hay 0.4 × 30 = 12 g, justo lo que dice su etiqueta.</li>
      </ol>
      <p>Resultado: <span class="resultado">el cereal B tiene menos azúcar</span>, 35 g por cada 100 g contra 40 g del A, aunque su porción traiga más.</p>
      <p class="nota"><strong>Error común:</strong> comparar por porción. Si las porciones no pesan lo mismo, primero llévalas a la misma cantidad.</p>`,
    vidaReal: `
      <p>Leer bien un empaque te ahorra sorpresas:</p>
      <ul>
        <li>Saber cuántas veces "cabe" lo que dice la tabla en el paquete evita que comas el triple sin darte cuenta.</li>
        <li>Comparar dos marcas parecidas te ayuda a elegir la que tiene menos azúcar o sal por el mismo precio.</li>
        <li>Las personas con alergias revisan lo que contiene un producto antes de comerlo.</li>
        <li>Desconfiar de la publicidad del frente te evita pagar por frases bonitas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un paquete de galletas dice 140 kcal por porción y trae 4 porciones. ¿Cuántas kilocalorías tiene el paquete completo?</p>', respuesta: 140 * 4,
        pista: '<p>Multiplica las kilocalorías de una porción por el número de porciones.</p>',
        solucion: '<p>140 × 4 = <strong>560 kcal</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>La etiqueta de un refresco dice 10.6 g de azúcar por cada 100 mL. ¿Cuántos gramos de azúcar tiene la botella de 600 mL?</p>', respuesta: 10.6 * 600 / 100, tolerancia: 0.1,
        pista: '<p>¿Cuántas veces caben 100 mL en 600 mL?</p>',
        solucion: '<p>600 mL son 6 veces 100 mL: 10.6 × 6 = <strong>63.6 g</strong>, más que los 50 g que la OMS pone como límite diario con 2 000 kcal.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una lista de ingredientes dice: "harina de trigo, azúcar, aceite vegetal, cacao, sal". ¿De qué hay más?</p>',
        opciones: ['Harina de trigo', 'Azúcar', 'Sal'], correcta: 0,
        pista: '<p>Los ingredientes van de mayor a menor cantidad.</p>',
        solucion: '<p>De <strong>harina de trigo</strong>, porque va primero. La sal, al final, es lo que menos hay.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una sopa instantánea dice "sodio: 25% del valor diario" por porción. ¿Qué significa?</p>',
        opciones: ['Que tiene poco sodio', 'Que tiene mucho sodio', 'Que no tiene sodio'], correcta: 1,
        pista: '<p>Recuerda el truco: 5% o menos es poco, 20% o más es mucho.</p>',
        solucion: '<p>Que tiene <strong>mucho sodio</strong>: una sola porción da la cuarta parte de lo de todo un día.</p>' },
      { tipo: 'numero', enunciado: '<p>Un yogur trae 18 g de azúcar en un vaso de 150 g. ¿Cuántos gramos de azúcar tiene por cada 100 g?</p>', respuesta: 18 / 150 * 100,
        pista: '<p>Divide el azúcar entre el peso del vaso y multiplica por 100.</p>',
        solucion: '<p>18 ÷ 150 × 100 = <strong>12 g</strong> por cada 100 g.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos es otro nombre del azúcar en una lista de ingredientes?</p>',
        opciones: ['Fibra', 'Sodio', 'Jarabe de maíz'], correcta: 2,
        pista: '<p>Busca el que es dulce.</p>',
        solucion: '<p>El <strong>jarabe de maíz</strong>. La fibra no se digiere, y el sodio viene de la sal.</p>' },
    ],
    fuentes: [
      MEDLINE('foodlabeling.html', 'Etiquetado de alimentos'),
      OMS('healthy-diet', 'Alimentación saludable'),
      WIKI('Información_nutricional', 'Información nutricional'),
    ],
  });

  // ------------------------------------------------------------------
  const SUENO = barras({ etiquetas: ['6 a 12 años', '13 a 18 años', 'adultos'], valores: [9, 8, 7], max: 10, paso: 2,
    descripcion: 'Gráfica de barras con el mínimo de horas de sueño recomendadas por noche según la edad. De 6 a 12 años: 9 horas. De 13 a 18 años: 8 horas. Adultos: 7 horas.' });

  L('Sueño y actividad física', {
    objetivo: 'Entender por qué tu cuerpo necesita dormir y moverse, y cuánto recomiendan los expertos según tu edad.',
    explicacion: `
      <p>Piensa en un día después de dormir mal. Te cuesta concentrarte, te enojas por cualquier cosa y hasta se te antoja más la comida chatarra. Una sola noche corta se nota. ¿Qué hace tu cuerpo mientras duermes que es tan importante?</p>
      <h3>Lo que pasa mientras duermes</h3>
      <p>Dormir no es apagarse. Tu cerebro pasa la noche en ciclos de unos 90 minutos, y en cada uno hay etapas distintas. En el <strong>sueño profundo</strong>, la respiración y el corazón van lentos, es muy difícil despertarte y el cuerpo aprovecha para reparar los músculos y, en niños y jóvenes, para crecer. En otra etapa, llamada sueño REM, se tienen los sueños más vivos, y el cerebro ordena y guarda lo que aprendiste en el día.</p>
      <p>Por eso dormir bien te ayuda a aprender, a estar de buen humor y a defenderte de las infecciones.</p>
      <h3>¿Cuánto hay que dormir?</h3>
      ${SUENO}
      <p>Las horas que necesitas cambian con la edad. Según MedlinePlus, de los 6 a los 12 años se necesitan de 9 a 12 horas; de los 13 a los 18, de 8 a 10; y los adultos, de 7 a 9. La gráfica muestra el mínimo de cada grupo. En la adolescencia, el reloj interno se recorre: te da sueño más tarde, pero la escuela empieza igual de temprano. Por eso es común dormir menos de lo necesario.</p>
      <p>Algunos hábitos ayudan: acostarte y levantarte a la misma hora, evitar el café y los refrescos con cafeína en la tarde, y dejar las pantallas un rato antes de dormir, porque su luz le dice a tu cerebro que todavía es de día.</p>
      <h3>Moverse</h3>
      <p>La <strong>actividad física moderada</strong> es la que acelera tu corazón y tu respiración, pero todavía te deja platicar: caminar rápido, andar en bici, bailar o nadar. Si ya no puedes hablar sin jadear, es intensa, como correr o jugar un partido de fútbol.</p>
      <p>La OMS recomienda que los niños y jóvenes de 5 a 17 años hagan, en promedio, 60 minutos diarios de actividad física moderada o intensa. Para los adultos, recomienda de 150 a 300 minutos de actividad moderada a la semana.</p>
      <p>Moverte fortalece el corazón y los músculos, ayuda a los huesos a guardar calcio, mejora el humor y hasta te ayuda a dormir mejor. Lo contrario es el <strong>sedentarismo</strong>: pasar muchas horas sentado y moverse poco. Por eso la OMS también recomienda limitar el tiempo frente a pantallas por diversión y levantarte con frecuencia.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que puedes reponer el fin de semana todo el sueño que perdiste entre semana. Dormir de más ayuda un poco, pero no borra los efectos de varias noches cortas, y además desordena tu reloj interno. Si duermes mal durante semanas aunque cuides tus hábitos, coméntalo con el personal de salud.</p>`,
    ejemplo: `
      <p>Tienes 12 años, te acuestas a las 22:30 y te levantas a las 6:30. ¿Duermes lo recomendado?</p>
      <ol class="pasos-ej">
        <li>Parte la noche en dos tramos, porque pasa por la medianoche. De las 22:30 a las 24:00 hay 1.5 horas.</li>
        <li>De las 0:00 a las 6:30 hay 6.5 horas.</li>
        <li>Suma los dos tramos: 1.5 + 6.5 = 8 horas.</li>
        <li>Compara con lo recomendado para tu edad, de 9 a 12 horas. Te falta al menos 1 hora; para dormir 9, tendrías que acostarte a las 21:30.</li>
        <li>Comprueba al revés: si a las 6:30 le quitas 8 horas, llegas a las 22:30, la hora en que te acostaste.</li>
      </ol>
      <p>Resultado: <span class="resultado">duermes 8 horas, 1 menos que el mínimo recomendado</span>.</p>
      <p class="nota"><strong>Error común:</strong> restar las horas directamente, 22.5 − 6.5 = 16. Cuando la noche cruza la medianoche, hay que partirla en dos.</p>`,
    vidaReal: `
      <p>Dormir y moverte son dos hábitos que se notan en todo:</p>
      <ul>
        <li>Dormir bien antes de un examen ayuda más que desvelarte estudiando.</li>
        <li>Caminar o ir en bici a la escuela suma minutos de movimiento sin esfuerzo extra.</li>
        <li>Apagar el celular un rato antes de acostarte te ayuda a conciliar el sueño más rápido.</li>
        <li>Levantarte a estirarte cada hora alivia la espalda cuando pasas mucho rato estudiando o trabajando en una silla.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Andas en bici 30 minutos al día durante 5 días. ¿Cuántos minutos son a la semana?</p>', respuesta: 30 * 5,
        pista: '<p>Multiplica los minutos de cada día por el número de días.</p>',
        solucion: '<p>30 × 5 = <strong>150 minutos</strong>, justo el mínimo semanal que la OMS recomienda a un adulto.</p>' },
      { tipo: 'numero', enunciado: '<p>Te acuestas a las 21:00 y te levantas a las 7:00. ¿Cuántas horas duermes?</p>', respuesta: (24 - 21) + 7,
        pista: '<p>Parte la noche en dos tramos: antes y después de la medianoche.</p>',
        solucion: '<p>De las 21:00 a las 24:00 hay 3 horas, y de las 0:00 a las 7:00, 7 más: <strong>10 horas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas actividades es moderada?</p>',
        opciones: ['Caminar rápido mientras platicas', 'Ver una película', 'Correr tan rápido que no puedes hablar'], correcta: 0,
        pista: '<p>La actividad moderada acelera el corazón pero todavía te deja platicar.</p>',
        solucion: '<p><strong>Caminar rápido mientras platicas</strong>. Ver una película no es actividad física, y correr sin poder hablar es actividad intensa.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué pasa durante el sueño profundo?</p>',
        opciones: ['Te despiertas con cualquier ruido', 'El cuerpo repara los músculos y, en los jóvenes, crece', 'El corazón late más rápido que de día'], correcta: 1,
        pista: '<p>En esta etapa todo va más lento.</p>',
        solucion: '<p><strong>El cuerpo repara los músculos y, en los jóvenes, crece</strong>. El corazón y la respiración van lentos, y es muy difícil despertarte.</p>' },
      { tipo: 'numero', enunciado: '<p>Un adulto quiere hacer 150 minutos de actividad moderada a la semana, repartidos en 5 días iguales. ¿Cuántos minutos debe moverse cada día?</p>', respuesta: 150 / 5,
        pista: '<p>Reparte los 150 minutos en 5 partes iguales.</p>',
        solucion: '<p>150 ÷ 5 = <strong>30 minutos</strong> al día.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué conviene dejar las pantallas un rato antes de dormir?</p>',
        opciones: ['Porque gastan mucha electricidad', 'Porque calientan el cuarto', 'Porque su luz le dice a tu cerebro que todavía es de día'], correcta: 2,
        pista: '<p>Piensa en tu reloj interno.</p>',
        solucion: '<p>Porque <strong>su luz le dice a tu cerebro que todavía es de día</strong>, y así tarda más en darte sueño.</p>' },
    ],
    fuentes: [
      MEDLINE('healthysleep.html', 'Dormir bien'),
      MEDLINE('exerciseforchildren.html', 'Ejercicio para niños'),
      OMS('physical-activity', 'Actividad física'),
      WIKI('Sueño', 'Sueño'),
    ],
  });

  // ------------------------------------------------------------------
  L('Salud mental', {
    objetivo: 'Reconocer que la salud mental es parte de tu salud, entender qué es el estrés y saber cuándo y cómo pedir ayuda.',
    explicacion: `
      <p>Mañana tienes un examen importante. Esta noche te cuesta dormir, el estómago se te revuelve y te sudan las manos. No es que algo ande mal: tu cuerpo y tu mente reaccionan a algo que te importa. Así como cuidas tu cuerpo, también puedes cuidar cómo te sientes y cómo piensas.</p>
      <p>La <strong>salud mental</strong> es el bienestar de tu forma de sentir, de pensar y de relacionarte con los demás. Según la OMS, es lo que te permite enfrentar las presiones normales de la vida, aprender, trabajar y aportar a tu comunidad. Como la salud del cuerpo, tiene días buenos y días difíciles.</p>
      <h3>Las emociones son señales</h3>
      <p>Una <strong>emoción</strong> es una reacción de tu cuerpo y tu mente ante algo que pasa, como la alegría, la tristeza, el miedo o el enojo. Todas son normales y todas sirven. El miedo te hace tener cuidado ante un peligro. La tristeza te ayuda a darte cuenta de lo que te importa y a buscar apoyo. El enojo te avisa que algo te parece injusto.</p>
      <p>No se trata de dejar de sentir, sino de reconocer lo que sientes, ponerle nombre y decidir qué hacer. Decir "siento enojo porque..." ya ayuda a calmarte.</p>
      <h3>El estrés</h3>
      <p>El <strong>estrés</strong> es la reacción del cuerpo ante un reto o una presión. Tu sistema nervioso te prepara para actuar: el corazón late más rápido, respiras más deprisa y tus músculos se tensan. Un poco de estrés por poco tiempo puede ayudarte a concentrarte en un examen o a reaccionar rápido ante un peligro.</p>
      <p>El problema es cuando el estrés no se va durante semanas. Entonces cansa al cuerpo, afecta el sueño y hace más difícil aprender. Algunas cosas ayudan a bajarlo: dormir bien, moverte, respirar despacio, hacer una lista de pendientes en lugar de pensar en todo a la vez y, sobre todo, hablar con alguien de confianza.</p>
      <h3>Cuándo pedir ayuda</h3>
      <p>Según la OMS, uno de cada siete adolescentes de 10 a 19 años vive con algún problema de salud mental, como la ansiedad o la depresión. Son problemas de salud, como el asma: no son culpa de nadie, no son falta de ganas y se pueden tratar. Conviene pedir ayuda si, durante varias semanas:</p>
      <ul>
        <li>Sientes tristeza, preocupación o vacío casi todos los días.</li>
        <li>Dejas de disfrutar lo que antes te gustaba o te alejas de tus amistades.</li>
        <li>Duermes o comes mucho más o mucho menos que antes.</li>
      </ul>
      <p>Pedir ayuda es una señal de fuerza, no de debilidad. Puedes empezar con un adulto de confianza, un maestro o el personal de salud, que pueden acompañarte con un especialista, como un psicólogo.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que un problema de salud mental se arregla "echándole ganas". Igual que no le pedirías eso a alguien con una pierna rota, estos problemas necesitan apoyo y, a veces, tratamiento.</p>
      <p class="nota"><strong>Si hay peligro:</strong> si tienes pensamientos de hacerte daño o de quitarte la vida, o alguien te cuenta que los tiene, no esperes. Habla ahora mismo con un adulto de confianza o llama al número de emergencias de tu país. No tienes que enfrentarlo sin compañía: hay ayuda, y con apoyo estos pensamientos suelen pasar y la persona se siente mejor.</p>`,
    ejemplo: `
      <p>En un salón hay 35 estudiantes de entre 10 y 19 años. Si se cumple la cifra de la OMS, ¿cuántos podrían estar viviendo con un problema de salud mental?</p>
      <ol class="pasos-ej">
        <li>"Uno de cada siete" quiere decir que, de cada grupo de 7, en promedio uno lo vive. Por eso divides el total entre 7: 35 ÷ 7 = 5.</li>
        <li>Pásalo a porcentaje para compararlo con otras cifras: 1 ÷ 7 ≈ 0.143, es decir, alrededor del 14.3%.</li>
        <li>Comprueba: el 14.3% de 35 es 0.143 × 35 ≈ 5. Coincide.</li>
      </ol>
      <p>Resultado: <span class="resultado">alrededor de 5 estudiantes</span>. Fíjate lo que significa: en casi cualquier salón hay alguien pasándola mal, aunque no se note. Tratar a los demás con amabilidad sí hace diferencia.</p>
      <p class="nota"><strong>Error común:</strong> pensar que "uno de cada siete" significa exactamente uno en cada grupo de siete. Es un promedio: en un grupo puede no haber nadie, y en otro, varios.</p>`,
    vidaReal: `
      <p>Cuidar cómo te sientes es parte de cuidarte:</p>
      <ul>
        <li>Ponerle nombre a lo que sientes te ayuda a calmarte y a explicarlo a otras personas.</li>
        <li>Saber qué te tranquiliza, como caminar o platicar con alguien, te sirve en los días difíciles.</li>
        <li>Notar cuándo alguien de tu grupo la está pasando mal te permite acompañarle y avisar a un adulto.</li>
        <li>Pedir ayuda a tiempo evita que un problema pequeño se haga grande.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En una escuela hay 42 adolescentes. Según la cifra de la OMS, uno de cada siete, ¿cuántos podrían estar viviendo con un problema de salud mental?</p>', respuesta: 42 / 7,
        pista: '<p>Divide el total entre 7.</p>',
        solucion: '<p>42 ÷ 7 = <strong>6 adolescentes</strong>, en promedio.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Qué porcentaje es "uno de cada siete"? Redondea a un decimal.</p>', respuesta: 100 / 7, tolerancia: 0.1,
        pista: '<p>Divide 1 entre 7 y multiplica por 100.</p>',
        solucion: '<p>1 ÷ 7 ≈ 0.143, que es el <strong>14.3%</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas es una buena forma de bajar el estrés?</p>',
        opciones: ['Hablar con alguien de confianza', 'Dormir menos para adelantar tareas', 'Guardarte todo para no molestar'], correcta: 0,
        pista: '<p>Busca la que cuida tu cuerpo y te acerca a otras personas.</p>',
        solucion: '<p><strong>Hablar con alguien de confianza</strong>. Dormir menos aumenta el estrés, y guardarte todo lo hace más pesado.</p>' },
      { tipo: 'opciones', enunciado: '<p>Alguien de tu salón te cuenta que lleva semanas muy triste y sin ganas de nada. ¿Qué es lo mejor que puedes hacer?</p>',
        opciones: ['Decirle que ya se le pasará', 'Escuchar sin juzgar y proponerle hablar juntos con un adulto de confianza', 'Contar su secreto a todo el salón'], correcta: 1,
        pista: '<p>Lleva semanas así: necesita compañía y ayuda de un adulto.</p>',
        solucion: '<p><strong>Escuchar sin juzgar y buscar juntos a un adulto de confianza</strong>. Si alguna vez menciona hacerse daño, avisa a un adulto de inmediato, aunque te haya pedido guardar el secreto.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas afirmaciones sobre las emociones es correcta?</p>',
        opciones: ['La tristeza y el enojo deben esconderse siempre', 'Solo la alegría es sana', 'Todas las emociones son normales y dan información útil'], correcta: 2,
        pista: '<p>Piensa para qué sirve el miedo.</p>',
        solucion: '<p><strong>Todas las emociones son normales y dan información útil</strong>. Lo importante es reconocerlas y decidir qué hacer con ellas.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la reacción del cuerpo ante un reto o una presión, que acelera el corazón y tensa los músculos?</p>',
        respuestas: ['estres', 'el estres'],
        pista: '<p>Lo sientes, por ejemplo, la noche antes de un examen.</p>',
        solucion: '<p>El <strong>estrés</strong>.</p>' },
    ],
    fuentes: [
      OMS('adolescent-mental-health', 'La salud mental de los adolescentes'),
      OMS('mental-health-strengthening-our-response', 'Salud mental'),
      MEDLINE('teenmentalhealth.html', 'Salud mental del adolescente'),
      MEDLINE('childmentalhealth.html', 'Salud mental del niño'),
      MEDLINE('stress.html', 'Estrés'),
    ],
  });

  // ------------------------------------------------------------------
  const MUERTES = barras({ etiquetas: ['tabaco', 'alcohol'], valores: [7, 2.6], max: 8, paso: 2,
    descripcion: 'Gráfica de barras de las muertes al año, en millones de personas, según la OMS. Tabaco: más de 7 millones. Alcohol: 2.6 millones, dato de 2019.' });

  L('Adicciones', {
    objetivo: 'Entender cómo se forma una adicción, por qué el cerebro joven es más vulnerable y dónde buscar ayuda, sin juzgar a nadie.',
    explicacion: `
      <p>Abres una red social "solo cinco minutos" y, sin darte cuenta, pasa una hora. O abres una bolsa de papitas para probar una y se acaba la bolsa. Esa fuerza que te empuja a "solo uno más" viene de tu cerebro, y entenderla ayuda a explicar las adicciones.</p>
      <h3>El sistema de recompensa</h3>
      <p>Tu cerebro tiene un sistema de recompensa. Cuando haces algo que te ayuda a vivir, como comer o convivir con tus amigos, suelta una sustancia llamada dopamina que te hace sentir bien y te da ganas de repetirlo. Es útil: así aprendes qué te conviene.</p>
      <p>Algunas sustancias, como la nicotina del tabaco, el alcohol y otras drogas, activan ese sistema con mucha más fuerza que las cosas de todos los días. Algunas actividades, como los videojuegos o las apuestas, también pueden hacerlo en ciertas personas. Poco a poco, el cerebro aprende a buscarlas por encima de casi todo.</p>
      <h3>¿Qué es una adicción?</h3>
      <p>Una <strong>adicción</strong> es cuando una persona siente una necesidad muy fuerte de consumir una sustancia o de hacer una actividad, y no puede dejarla aunque le esté haciendo daño en su salud, sus estudios, su trabajo o sus relaciones. Es una enfermedad que cambia el cerebro, no un defecto de carácter, y tiene tratamiento. Suele avanzar con dos cambios:</p>
      <ul>
        <li>La <strong>tolerancia</strong> es cuando el cuerpo se acostumbra y necesita cada vez más cantidad para sentir lo mismo.</li>
        <li>La <strong>abstinencia</strong> es el malestar que aparece al dejar de consumir, como nervios, irritabilidad, problemas para dormir o dolor. Muchas personas vuelven a consumir solo para quitarse ese malestar.</li>
      </ul>
      <h3>¿Por qué importa la edad?</h3>
      <p>El cerebro sigue madurando hasta pasados los 20 años, y la parte que frena los impulsos y piensa en las consecuencias es de las últimas en terminar. Por eso, mientras más joven empieza alguien a consumir, más fácil es que desarrolle una adicción.</p>
      <p>Los daños son enormes. Según la OMS, el tabaco mata a más de 7 millones de personas al año, entre ellas más de 1.6 millones de personas que no fumaban pero respiraban el humo de otros. El alcohol causó unos 2.6 millones de muertes en 2019.</p>
      ${MUERTES}
      <h3>Cómo protegerte y a quién acudir</h3>
      <p>Decir "no, gracias" a algo que te ofrecen es válido, aunque insistan tus amigos; también puedes poner una excusa o irte. Si te preocupa tu consumo o el de alguien cercano, habla con un adulto de confianza o con el personal de salud. Hay tratamientos y grupos de apoyo, y pedir ayuda no es motivo de vergüenza. Dejar de golpe algunas sustancias, como el alcohol, puede ser peligroso, así que hazlo siempre con ayuda médica.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que los cigarros electrónicos o vapeadores son inofensivos. La mayoría tiene nicotina, que es muy adictiva, y la OMS advierte que también dañan la salud.</p>
      <p class="nota"><strong>Cuándo es una emergencia:</strong> si alguien bebió o consumió algo y no despierta, respira con dificultad o tiene convulsiones, llama de inmediato al número de emergencias y no le dejes sin compañía. Si vomita, ponle de lado para que no se ahogue.</p>`,
    ejemplo: `
      <p>Una persona fuma una cajetilla al día, y cada cajetilla cuesta $80. ¿Cuánto gasta en un año?</p>
      <ol class="pasos-ej">
        <li>Fuma todos los días, así que cuenta los días del año: 365.</li>
        <li>Multiplica el precio por los días: 80 × 365 = 29 200.</li>
        <li>Comprueba con una cuenta aproximada: un mes son unos 30 días, 30 × 80 = 2 400 al mes, y 2 400 × 12 = 28 800 al año. Se parece a 29 200, así que el resultado es razonable.</li>
      </ol>
      <p>Resultado: <span class="resultado">$29 200 al año</span>. Es dinero que se va en algo que además daña los pulmones, el corazón y a quienes respiran el humo.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar por 12, como si fumara una cajetilla al mes. El precio es por día, así que hay que multiplicar por los días del año.</p>`,
    vidaReal: `
      <p>Entender por qué cuesta tanto dejar algo te protege:</p>
      <ul>
        <li>Saber por qué cuesta soltar el celular te ayuda a ponerte límites de tiempo.</li>
        <li>Saber decir "no, gracias" ante la presión de otros protege tu salud.</li>
        <li>Reconocer cuándo alguien necesita ayuda te permite apoyarle sin juzgar.</li>
        <li>No fumar ni beber te ahorra dinero que puedes usar en lo que te gusta.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Una cajetilla cuesta $65 y alguien fuma una al día. ¿Cuánto gasta en 30 días?</p>', respuesta: 65 * 30,
        pista: '<p>Multiplica el precio por el número de días.</p>',
        solucion: '<p>65 × 30 = <strong>$1 950</strong> en un mes.</p>' },
      { tipo: 'numero', enunciado: '<p>Según la OMS, el tabaco causa unos 7 millones de muertes al año y el alcohol, 2.6 millones. ¿Cuántas veces más muertes causa el tabaco? Redondea a un decimal.</p>', respuesta: 7 / 2.6, tolerancia: 0.05,
        pista: '<p>Divide las muertes por tabaco entre las muertes por alcohol.</p>',
        solucion: '<p>7 ÷ 2.6 ≈ <strong>2.7 veces</strong>, casi el triple.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una persona necesita beber cada vez más alcohol para sentir lo mismo que antes. ¿Cómo se llama eso?</p>',
        opciones: ['Abstinencia', 'Tolerancia', 'Recompensa'], correcta: 1,
        pista: '<p>El cuerpo se acostumbra.</p>',
        solucion: '<p><strong>Tolerancia</strong>. La abstinencia es el malestar que aparece al dejar de consumir.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué empezar a consumir alcohol o tabaco de joven es más riesgoso?</p>',
        opciones: ['Porque el cerebro todavía está madurando, sobre todo la parte que frena los impulsos', 'Porque los jóvenes no tienen sistema de recompensa', 'Porque el cuerpo joven no desarrolla tolerancia'], correcta: 0,
        pista: '<p>Piensa en hasta qué edad sigue madurando el cerebro.</p>',
        solucion: '<p>Porque <strong>el cerebro todavía está madurando</strong>, y la parte que frena los impulsos es de las últimas en terminar. Por eso es más fácil desarrollar una adicción.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el malestar que aparece cuando una persona con adicción deja de consumir?</p>',
        respuestas: ['abstinencia', 'la abstinencia', 'sindrome de abstinencia', 'el sindrome de abstinencia'],
        pista: '<p>Por ese malestar, muchas personas vuelven a consumir.</p>',
        solucion: '<p>La <strong>abstinencia</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Alguien bebió mucho alcohol, no despierta y respira con dificultad. ¿Qué haces?</p>',
        opciones: ['Dejarle dormir para que se le pase', 'Darle café para despertarle', 'Llamar a emergencias y no dejarle sin compañía'], correcta: 2,
        pista: '<p>No despierta y le cuesta respirar: es una emergencia.</p>',
        solucion: '<p><strong>Llamar a emergencias y quedarte a su lado</strong>. El café no quita el efecto del alcohol, y dejarle solo es peligroso.</p>' },
    ],
    fuentes: [
      OMS('tobacco', 'Tabaco y nicotina'),
      OMS('alcohol', 'Alcohol'),
      MEDLINE('drugabuse.html', 'Consumo de drogas y la adicción'),
      MEDLINE('substanceabuseproblems.html', 'Consumo de sustancias y sus trastornos'),
      MEDLINE('smoking.html', 'Fumar'),
    ],
  });

  // ------------------------------------------------------------------
  const PASOS = [['proteger', 'revisa que', 'sea seguro'], ['avisar', 'llama a', 'emergencias'], ['socorrer', 'ayuda a', 'la persona']];
  const PAS = diagrama([-0.5, 10.1], [-1.3, 1.3], PASOS.flatMap(([paso, l1, l2], i) => {
    const x = 3.5 * i;
    return [
      caja(x, 0, x + 2.6, 0.8), txt(x + 1.3, 0.4, `${i + 1}. ${paso}`),
      txt(x + 1.3, -0.4, l1), txt(x + 1.3, -0.9, l2),
      ...(i < 2 ? flecha([x + 2.6, 0.4], [x + 3.5, 0.4], 0, 0.8) : []),
    ];
  }), 'Tres cajas unidas por flechas de izquierda a derecha. 1. Proteger: revisa que sea seguro. 2. Avisar: llama a emergencias. 3. Socorrer: ayuda a la persona.');

  L('Primeros auxilios básicos', {
    objetivo: 'Saber qué hacer en los primeros minutos de una emergencia: protegerte, pedir ayuda y atender a la persona mientras llega la ayuda profesional.',
    explicacion: `
      <p>Vas por la calle y una persona se desploma frente a ti. Mucha gente se queda mirando sin saber qué hacer. Los primeros minutos pueden cambiarlo todo, y no hace falta ser médico para ayudar.</p>
      <p>Los <strong>primeros auxilios</strong> son la ayuda inmediata que le das a alguien que se lastimó o se enfermó de repente, mientras llega la ayuda profesional. No sustituyen al médico: buscan mantener a la persona con vida, evitar que empeore y conseguir ayuda rápido.</p>
      <h3>Proteger, avisar, socorrer</h3>
      ${PAS}
      <p>En cualquier emergencia sigue tres pasos, en este orden:</p>
      <ol>
        <li>Proteger. Antes de acercarte, mira si hay peligro, como coches, fuego, cables o humo. Si tú también te lastimas, ya no podrás ayudar y habrá dos personas que rescatar.</li>
        <li>Avisar. Llama al número de emergencias, o pide a una persona concreta que lo haga: "Usted, la persona de la playera roja, llame a emergencias". En muchos países de América es el 911 y en Europa, el 112; apréndete el de tu país. Di dónde estás y qué pasó, y no cuelgues hasta que te lo indiquen.</li>
        <li>Socorrer. Atiende a la persona con lo que sabes y sigue las indicaciones de quien te atiende por teléfono.</li>
      </ol>
      <h3>¿Responde? ¿Respira?</h3>
      <p>Háblale en voz alta y tócale los hombros. Si responde, quédate a su lado y no la muevas, sobre todo si pudo golpearse la espalda o el cuello. Si no responde, mira durante unos segundos si su pecho sube y baja con normalidad.</p>
      <p>Si no responde pero respira y no crees que se haya golpeado el cuello o la espalda, ponla en <strong>posición lateral de seguridad</strong>: de lado, con la pierna de arriba doblada para que no se voltee y la cabeza un poco hacia atrás. Así, si vomita, el vómito sale por la boca en lugar de tapar el paso del aire.</p>
      <p>Si no responde y no respira, o solo da bocanadas raras, necesita <strong>RCP</strong>, que quiere decir reanimación cardiopulmonar: empujar fuerte y rápido en el centro del pecho para que la sangre siga llevando oxígeno al cerebro. En un adulto se hunde el pecho unos 5 cm, de 100 a 120 veces por minuto, sin parar hasta que llegue la ayuda. En niños pequeños y bebés la técnica cambia, así que sigue las indicaciones de emergencias. Quien atiende la llamada de emergencias te puede guiar. Lo ideal es aprender RCP en un curso; muchas organizaciones los dan gratis.</p>
      <h3>Atragantamiento</h3>
      <p>Si alguien se atraganta pero tose con fuerza, anímale a seguir tosiendo: la tos es la mejor forma de sacar lo que estorba. Si no puede toser, hablar ni respirar, es una emergencia: pide ayuda de inmediato. Quien sepa hacerlo debe dar compresiones en el abdomen, la llamada maniobra de Heimlich.</p>
      <p>Las heridas y las quemaduras las verás con detalle en la materia de Autosuficiencia. Por ahora, recuerda dos reglas: una herida que sangra se aprieta con un trapo limpio, y una quemadura se enfría con agua corriente fresca, no helada, durante al menos 10 minutos, sin ponerle hielo, pasta de dientes ni mantequilla. Si la herida sangra mucho o la quemadura es grande, llama a emergencias.</p>
      <p class="nota"><strong>Trampa común:</strong> darle agua o comida a una persona que no está bien despierta. Puede ahogarse. Lo urgente es avisar y vigilar que respire.</p>`,
    ejemplo: `
      <p>La ambulancia tardará 8 minutos. Mientras, una persona da RCP. ¿Cuántas compresiones dará, como mínimo y como máximo, si va al ritmo recomendado?</p>
      <ol class="pasos-ej">
        <li>El ritmo recomendado es de 100 a 120 compresiones por minuto. Calcula primero el mínimo: 100 × 8 = 800 compresiones.</li>
        <li>Luego el máximo: 120 × 8 = 960 compresiones.</li>
        <li>Ponlo en segundos para imaginarlo: 100 por minuto son casi 2 por segundo. Es un ritmo rápido, como el de una canción animada.</li>
        <li>Comprueba: 800 ÷ 8 = 100 y 960 ÷ 8 = 120, los dos extremos del ritmo recomendado.</li>
      </ol>
      <p>Resultado: <span class="resultado">entre 800 y 960 compresiones</span>. Es muy cansado, por eso, si hay otra persona que sepa hacerlo, conviene turnarse cada 2 minutos, sin dejar pausas largas.</p>
      <p class="nota"><strong>Error común:</strong> ir despacio o empujar suave por miedo a lastimar. Para que la sangre circule, hay que empujar fuerte y rápido.</p>`,
    vidaReal: `
      <p>Unos pocos conocimientos pueden salvar una vida:</p>
      <ul>
        <li>Saber el número de emergencias de tu país te permite pedir ayuda en segundos.</li>
        <li>En un accidente de tránsito, fijarte primero en los coches evita que haya más heridos.</li>
        <li>Si alguien se atraganta durante la comida, saber que la tos ayuda te permite actuar con calma.</li>
        <li>Apretar una herida con un trapo limpio puede evitar que alguien pierda mucha sangre.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Si das 100 compresiones por minuto, ¿cuántas das en 30 segundos?</p>', respuesta: 100 / 2,
        pista: '<p>30 segundos son medio minuto.</p>',
        solucion: '<p>100 ÷ 2 = <strong>50 compresiones</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿En qué orden van los tres pasos ante una emergencia?</p>',
        opciones: ['Avisar, proteger, socorrer', 'Socorrer, avisar, proteger', 'Proteger, avisar, socorrer'], correcta: 2,
        pista: '<p>Lo primero es no ponerte en peligro tú.</p>',
        solucion: '<p><strong>Proteger, avisar, socorrer</strong>. Si te lastimas al acercarte, ya no puedes ayudar.</p>' },
      { tipo: 'opciones', enunciado: '<p>Alguien se atraganta durante la comida, pero tose con fuerza. ¿Qué haces?</p>',
        opciones: ['Animarle a seguir tosiendo y vigilar', 'Darle agua de inmediato', 'Meterle los dedos en la boca'], correcta: 0,
        pista: '<p>La tos es la mejor forma de sacar lo que estorba.</p>',
        solucion: '<p><strong>Animarle a seguir tosiendo y vigilar</strong>. Si deja de poder toser, hablar o respirar, pide ayuda de inmediato.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una persona no responde, pero respira con normalidad. Ya llamaste a emergencias y no se golpeó el cuello ni la espalda. ¿Qué haces mientras llega la ayuda?</p>',
        opciones: ['Darle agua para que reaccione', 'Ponerla en posición lateral de seguridad y vigilar que respire', 'Empezar a presionar su pecho'], correcta: 1,
        pista: '<p>Respira, así que no necesita RCP, pero podría vomitar.</p>',
        solucion: '<p><strong>Ponerla de lado en posición lateral de seguridad</strong> y vigilar que siga respirando. La RCP es para quien no respira.</p>' },
      { tipo: 'numero', enunciado: '<p>Das RCP a 120 compresiones por minuto durante 5 minutos. ¿Cuántas compresiones das?</p>', respuesta: 120 * 5,
        pista: '<p>Multiplica el ritmo por los minutos.</p>',
        solucion: '<p>120 × 5 = <strong>600 compresiones</strong>.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cuál es el número de emergencias que se usa en Europa?</p>', respuestas: ['112', 'el 112'],
        pista: '<p>Lo dice la explicación, en el paso de avisar.</p>',
        solucion: '<p>El <strong>112</strong>. En muchos países de América es el 911. Apréndete el de tu país.</p>' },
    ],
    fuentes: [
      MEDLINE('firstaid.html', 'Primeros auxilios'),
      MEDLINE('cpr.html', 'RCP, reanimación cardiopulmonar'),
      MEDLINE('ency/article/000013.htm', 'RCP en adultos y niños después del inicio de la pubertad'),
      MEDLINE('ency/article/000049.htm', 'Asfixia en adulto o niño mayor de 1 año'),
      OMS('burns', 'Quemaduras'),
    ],
  });
})();
