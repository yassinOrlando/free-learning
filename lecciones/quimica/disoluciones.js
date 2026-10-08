// Química · Unidad 8: Disoluciones, ácidos y bases.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
  const F = window.fraccion;
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('quimica', titulo, datos);
  // Flecha de un vector: línea hasta la base de la punta + triángulo sólido como punta.
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
  const raya = (...puntos) => ({ tipo: 'poligono', puntos, abierto: true });
  const diagrama = (x, y, figuras, descripcion) => G({ x, y, figuras, descripcion, proporcional: true, ejes: false });
  const punto = (x, y, r = 0.1) => ({ tipo: 'circulo', x, y, r, solido: true });
  // Interpola en línea recta entre puntos medidos [[x, y], ...].
  const tramos = (datos) => (x) => {
    for (let i = 1; i < datos.length; i++) {
      const [x0, y0] = datos[i - 1], [x1, y1] = datos[i];
      if (x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    }
    return datos[datos.length - 1][1];
  };

  const OSC = (pagina, nombre) => ({ nombre: `OpenStax, Chemistry 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/chemistry-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = (ruta, nombre) => ({ nombre: `Khan Academy en español: ${nombre}`, url: `https://es.khanacademy.org/science/chemistry/${ruta}` });
  const PHET = (sim, nombre) => ({ nombre: `PhET, Universidad de Colorado: ${nombre}`, url: `https://phet.colorado.edu/es/simulations/${sim}` });

  // ------------------------------------------------------------------
  const AZUCAR = [[0, 179], [20, 204], [40, 238], [60, 287], [80, 362], [100, 487]];
  const SAL = [[0, 35.7], [20, 35.9], [100, 39.2]];
  const SOLUBILIDAD = G({ x: [0, 100], y: [0, 500], pasos: [20, 100], funciones: [
    { f: tramos(AZUCAR), etiqueta: 'azúcar', serie: 0 },
    { f: tramos(SAL), etiqueta: 'sal de mesa', serie: 1 },
  ], puntos: [{ x: 20, y: 204, etiqueta: 'azúcar, 20 °C: 204 g' }, { x: 100, y: 487, etiqueta: '487 g' }, { x: 60, y: 37.5, etiqueta: 'sal: unos 37 g' }],
  descripcion: 'Gráfica de cuántos gramos se disuelven en 100 g de agua, de 0 a 500 g, contra la temperatura del agua, de 0 a 100 °C. La curva del azúcar sube cada vez más: 179 g a 0 °C, 204 g a 20 °C, 287 g a 60 °C y 487 g a 100 °C. La curva de la sal de mesa es casi plana, cerca del piso: de 36 g a 0 °C a 39 g a 100 °C.' });

  L('Soluto y disolvente', {
    objetivo: 'Reconocer el soluto y el disolvente de una disolución, entender qué es la solubilidad y qué la cambia.',
    explicacion: `
      <p>Echas una cucharada de azúcar al café, revuelves y desaparece. Pero el café sabe dulce: el azúcar sigue ahí, repartida en partículas tan pequeñas que no se ven. En la Unidad 1 viste que eso es una mezcla homogénea. Ahora vas a ver cómo se llama cada parte y cuánto se puede disolver.</p>
      <h3>Quién disuelve a quién</h3>
      <p>A una mezcla homogénea en la que una sustancia se reparte en otra se le llama <strong>disolución</strong>. El café con azúcar, el agua de mar y el aire son disoluciones.</p>
      <p>Una disolución tiene dos partes. El <strong>soluto</strong> es lo que se disuelve, casi siempre lo que hay en menor cantidad: el azúcar. El <strong>disolvente</strong> es lo que disuelve, lo que hay en mayor cantidad: el agua del café. El agua disuelve tantas cosas que se le llama "el disolvente universal", aunque no lo disuelve todo.</p>
      <h3>Lo parecido disuelve a lo parecido</h3>
      <p>¿Por qué el agua disuelve la sal y el azúcar, pero no el aceite? En la Unidad 4 viste que el agua es polar: un lado es un poco negativo y el otro un poco positivo. Las partículas de agua rodean a los iones de la sal y a las moléculas del azúcar, que también tienen partes con carga, y los jalan hacia el agua. El aceite no es polar, así que el agua no tiene de dónde jalarlo y prefiere quedarse pegada a sí misma. Por eso se dice que lo parecido disuelve a lo parecido: el agua disuelve sustancias polares, y las grasas se disuelven en otras grasas o en gasolina.</p>
      <h3>¿Cuánto cabe?</h3>
      <p>Si sigues echando azúcar a un vaso de agua fría, llega un momento en que ya no se disuelve y se queda en el fondo. A la cantidad máxima de soluto que se disuelve en cierta cantidad de disolvente, a una temperatura dada, se le llama solubilidad. Cuando una disolución ya tiene todo el soluto que admite, se dice que está saturada; si todavía admite más, está insaturada.</p>
      ${SOLUBILIDAD}
      <p>La gráfica muestra cuántos gramos se disuelven en 100 g de agua. A 20 °C caben 204 g de azúcar, más del doble que el agua, pero solo unos 36 g de sal.</p>
      <h3>Qué cambia la solubilidad</h3>
      <ul>
        <li>La temperatura cambia la solubilidad de los sólidos. En casi todos, más calor permite disolver más: a 100 °C caben 487 g de azúcar. La sal casi no cambia.</li>
        <li>Con los gases pasa al revés: se disuelven menos en un líquido caliente. Por eso un refresco tibio pierde el gas más rápido que uno frío.</li>
      </ul>
      <p>Revolver o moler el soluto no cambia cuánto cabe: solo hace que se disuelva más rápido, porque acerca agua nueva a las partículas.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que revolver más hace que quepa más azúcar. Revolver acelera, pero el límite lo pone la temperatura.</p>`,
    ejemplo: `
      <p>¿Cuánto azúcar se puede disolver, como máximo, en 250 g de agua a 20 °C?</p>
      <ol class="pasos-ej">
        <li>Lee la gráfica: a 20 °C se disuelven 204 g de azúcar en cada 100 g de agua.</li>
        <li>Fíjate cuántas veces cabe 100 g en 250 g: 250 ÷ 100 = 2.5 veces.</li>
        <li>Si el agua es 2.5 veces más, cabe 2.5 veces más azúcar: 204 × 2.5 = 510 g.</li>
        <li>Comprueba con una regla de tres: si 100 g de agua disuelven 204 g, entonces 250 g disuelven 250 × 204 ÷ 100 = 510 g. Coincide.</li>
      </ol>
      <p>Resultado: <span class="resultado">510 g de azúcar</span>. Si echas más, la disolución queda saturada y el resto se va al fondo.</p>
      <p class="nota"><strong>Error común:</strong> responder 204 g sin fijarte en que el dato es por cada 100 g de agua, no por toda el agua que tienes.</p>`,
    vidaReal: `
      <p>Que unas cosas se mezclen con el agua y otras no explica mucho de lo que haces en casa:</p>
      <ul>
        <li>El agua sola no quita una mancha de grasa, pero con jabón sí.</li>
        <li>El azúcar se deshace mejor en el té caliente que en el agua helada.</li>
        <li>Un refresco abierto se queda sin gas más rápido si no lo guardas en el refrigerador.</li>
        <li>En el mar flotas un poco más, porque el agua lleva mucha sal disuelta.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>En un vaso de agua con sal, ¿cuál es el soluto?</p>',
        opciones: ['El agua', 'La sal', 'Los dos son disolventes'], correcta: 1,
        pista: '<p>El soluto es lo que se disuelve.</p>',
        solucion: '<p>El soluto es <strong>la sal</strong>, que se reparte en el agua. El agua es el disolvente.</p>' },
      { tipo: 'numero', enunciado: '<p>Disuelves 20 g de sal en 180 g de agua. ¿Cuál es la masa de la disolución, en gramos?</p>', respuesta: 20 + 180,
        pista: '<p>La disolución es el soluto más el disolvente.</p>',
        solucion: '<p>20 + 180 = <strong>200 g</strong>. La sal no desaparece: su masa sigue contando.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas sustancias se disuelve en agua?</p>',
        opciones: ['El aceite de cocina', 'El azúcar', 'La cera de una vela', 'La arena'], correcta: 1,
        pista: '<p>Lo parecido disuelve a lo parecido: busca una sustancia polar.</p>',
        solucion: '<p>El <strong>azúcar</strong>: sus moléculas tienen partes polares que el agua puede jalar. El aceite y la cera no son polares, y la arena no se disuelve.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es una disolución saturada?</p>',
        opciones: ['Una que tiene muy poco soluto', 'Una que está hirviendo', 'Una que ya no puede disolver más soluto a esa temperatura'], correcta: 2,
        pista: '<p>Piensa en el azúcar que ya no se deshace y se queda en el fondo.</p>',
        solucion: '<p>Es <strong>una que ya no puede disolver más soluto</strong> a esa temperatura: lo que agregues se queda sin disolver.</p>' },
      { tipo: 'numero', enunciado: '<p>A 20 °C se disuelven 204 g de azúcar en 100 g de agua. ¿Cuántos gramos se disuelven en 50 g de agua?</p>', respuesta: 204 * 50 / 100,
        pista: '<p>50 g de agua es la mitad de 100 g.</p>',
        solucion: '<p>Con la mitad del agua cabe la mitad del azúcar: 204 ÷ 2 = <strong>102 g</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué un refresco tibio pierde el gas más rápido que uno frío?</p>',
        opciones: ['Porque los gases se disuelven menos en un líquido caliente', 'Porque el calor fabrica más gas', 'Porque el azúcar se evapora con el calor'], correcta: 0,
        pista: '<p>Con los gases, la temperatura funciona al revés que con los sólidos.</p>',
        solucion: '<p>Porque <strong>los gases se disuelven menos en un líquido caliente</strong>: el gas que ya no cabe se escapa en burbujas.</p>' },
    ],
    fuentes: [
      OSC('11-1-the-dissolution-process', 'The Dissolution Process'),
      OSC('11-3-solubility', 'Solubility'),
      WIKI('Disolución', 'Disolución'),
      WIKI('Solubilidad', 'Solubilidad'),
    ],
  });

  // ------------------------------------------------------------------
  const vaso = (x0) => raya([x0, 3], [x0, 0], [x0 + 2.4, 0], [x0 + 2.4, 3]);
  const DILUIDA = [[0.6, 0.6], [1.7, 1.2], [0.8, 2.0], [1.9, 2.3]];
  const CONCENTRADA = [[0.4, 0.4], [1.0, 0.6], [1.6, 0.4], [2.0, 0.9], [0.6, 1.1], [1.3, 1.3], [0.4, 1.8], [1.9, 1.6], [1.0, 2.0], [1.6, 2.2], [0.6, 2.5], [2.0, 2.5]];
  const VASOS = diagrama([-0.6, 6.4], [-1.5, 3.3], [
    vaso(0), vaso(3.4),
    ...DILUIDA.map(([x, y]) => punto(x, y)), ...CONCENTRADA.map(([x, y]) => punto(x + 3.4, y)),
    txt(1.2, -0.4, 'diluida'), txt(4.6, -0.4, 'concentrada'),
    txt(2.9, -1.1, 'puntos: partículas de soluto'),
  ], 'Dos vasos del mismo tamaño con la misma cantidad de líquido. El de la izquierda, rotulado "diluida", tiene 4 puntos, que son partículas de soluto. El de la derecha, rotulado "concentrada", tiene 12 puntos en el mismo espacio.');

  L('Concentración: porcentaje y molaridad', {
    objetivo: 'Calcular la concentración de una disolución como porcentaje en masa y como molaridad, y usarla para preparar disoluciones.',
    explicacion: `
      <p>Un agua de jamaica puede quedar "cargada" o "aguada". Las dos tienen jamaica y agua; lo que cambia es cuánta jamaica hay en cada vaso. En química hay que decirlo con números, porque un medicamento demasiado aguado no sirve y uno demasiado cargado puede hacer daño.</p>
      <h3>Cuánto soluto hay en cada porción</h3>
      <p>A la cantidad de soluto que hay en cierta cantidad de disolución se le llama <strong>concentración</strong>. Una disolución con poco soluto se dice diluida, y una con mucho, concentrada.</p>
      ${VASOS}
      <p>Fíjate que no importa el tamaño del recipiente. Si sirves un vaso de una jarra, el vaso tiene la misma concentración que la jarra, aunque tenga menos jamaica en total. La concentración es una proporción, no una cantidad.</p>
      <h3>En porcentaje</h3>
      <p>La forma más sencilla de decirlo es el <strong>porcentaje en masa</strong>: cuántos gramos de soluto hay en cada 100 g de disolución.</p>
      <p>porcentaje en masa = ${F('masa del soluto', 'masa de la disolución')} × 100</p>
      <p>Se lee "la masa del soluto entre la masa de toda la disolución, por cien". Es el mismo cálculo que viste en la Unidad 1. El suero que ponen en los hospitales tiene 0.9% de sal: 0.9 g de sal en cada 100 g de suero. Ojo: abajo va la disolución completa, soluto más disolvente, no solo el agua.</p>
      <p>Con los líquidos también se usa el porcentaje en volumen. El alcohol del botiquín dice "70%": de cada 100 mL, 70 son alcohol.</p>
      <h3>En moles</h3>
      <p>Los químicos prefieren contar partículas, porque las reacciones ocurren partícula por partícula. Por eso usan la <strong>molaridad</strong>: cuántos moles de soluto hay en cada litro de disolución. Se escribe con la letra M.</p>
      <p>molaridad = ${F('moles de soluto', 'litros de disolución')}</p>
      <p>Se lee "los moles de soluto entre los litros de disolución". Una disolución 1 M, que se lee "uno molar", tiene 1 mol de soluto en cada litro. Si disuelves 58.5 g de sal, que es 1 mol, y completas con agua hasta tener 1 litro, obtienes sal 1 M.</p>
      <p>Para usarla al revés, multiplica: moles = molaridad × litros. Medio litro de una disolución 2 M tiene 2 × 0.5 = 1 mol de soluto.</p>
      <h3>Diluir: más agua, mismo soluto</h3>
      <p>Cuando le agregas agua a una disolución, la cantidad de soluto no cambia: solo se reparte en más espacio. Si tienes 1 litro de sal 2 M, tienes 2 moles de sal. Si le agregas agua hasta tener 2 litros, sigues teniendo 2 moles, pero ahora en el doble de volumen: 2 ÷ 2 = 1 M. Al duplicar el volumen, la concentración baja a la mitad. Es lo que haces al rebajar un jugo concentrado.</p>
      <p class="nota"><strong>Trampa común:</strong> en la molaridad, usar los mililitros como si fueran litros. Antes de dividir, pasa los mililitros a litros: 250 mL son 0.25 L.</p>`,
    ejemplo: `
      <p>Quieres preparar 500 mL de agua con sal 2 M. ¿Cuántos gramos de sal necesitas? Usa 58.5 g/mol para la sal.</p>
      <ol class="pasos-ej">
        <li>Primero pasa el volumen a litros, porque la molaridad está en moles por litro: 500 mL son 0.5 L.</li>
        <li>Calcula los moles que necesitas: moles = molaridad × litros = 2 × 0.5 = 1 mol de sal.</li>
        <li>Pasa los moles a gramos con la masa molar: 1 × 58.5 = 58.5 g.</li>
        <li>Para prepararla, disuelve los 58.5 g en un poco de agua y luego completa hasta llegar a 500 mL de disolución.</li>
        <li>Comprueba: 1 mol entre 0.5 L da 1 ÷ 0.5 = 2 M.</li>
      </ol>
      <p>Resultado: <span class="resultado">58.5 g de sal</span>.</p>
      <p class="nota"><strong>Error común:</strong> agregar la sal a 500 mL de agua. La sal ocupa lugar, y el volumen final se pasaría un poco. Se completa hasta 500 mL de disolución.</p>`,
    vidaReal: `
      <p>Saber qué tan cargada está una mezcla es cuestión de salud y de dinero:</p>
      <ul>
        <li>Las etiquetas del cloro y del vinagre dicen qué porcentaje del producto sirve de verdad.</li>
        <li>Los jarabes para niños indican cuántos miligramos de medicina hay en cada cucharadita.</li>
        <li>El suero que ponen en los hospitales lleva justo la cantidad de sal que tiene tu sangre.</li>
        <li>Al diluir un limpiador concentrado, rinde más y gastas menos.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Disuelves 10 g de azúcar y obtienes 200 g de disolución. ¿Cuál es el porcentaje en masa del azúcar?</p>', respuesta: 10 / 200 * 100,
        pista: '<p>Divide la masa del soluto entre la masa de la disolución y multiplica por 100.</p>',
        solucion: '<p>10 ÷ 200 × 100 = <strong>5%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>El suero de los hospitales tiene 0.9% de sal. ¿Cuántos gramos de sal hay en 500 g de suero?</p>', respuesta: 500 * 0.9 / 100,
        pista: '<p>Calcula el 0.9% de 500.</p>',
        solucion: '<p>500 × 0.009 = <strong>4.5 g</strong> de sal.</p>' },
      { tipo: 'numero', enunciado: '<p>Hay 2 moles de sal disueltos en 4 litros de disolución. ¿Cuál es la molaridad?</p>', respuesta: 2 / 4,
        pista: '<p>Divide los moles entre los litros.</p>',
        solucion: '<p>2 ÷ 4 = <strong>0.5 M</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos moles de soluto hay en 250 mL de una disolución 2 M?</p>', respuesta: 2 * 0.25,
        pista: '<p>Pasa los mililitros a litros y multiplica por la molaridad.</p>',
        solucion: '<p>250 mL = 0.25 L, y 2 × 0.25 = <strong>0.5 mol</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos gramos de sal (58.5 g/mol) hacen falta para preparar 1 litro de disolución 0.5 M?</p>', respuesta: 0.5 * 1 * 58.5,
        pista: '<p>Primero calcula los moles; luego pásalos a gramos.</p>',
        solucion: '<p>0.5 × 1 = 0.5 mol, y 0.5 × 58.5 = <strong>29.25 g</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas disoluciones está más concentrada?</p>',
        opciones: ['20 g de sal en 400 g de disolución', '10 g de sal en 100 g de disolución', '20 g de sal en 100 g de disolución'], correcta: 2,
        pista: '<p>Calcula el porcentaje en masa de cada una.</p>',
        solucion: '<p><strong>20 g en 100 g</strong>, que es 20%. Las otras son 5% y 10%.</p>' },
    ],
    fuentes: [
      OSC('3-3-molarity', 'Molarity'),
      OSC('3-4-other-units-for-solution-concentrations', 'Other Units for Solution Concentrations'),
      WIKI('Molaridad', 'Molaridad'),
      PHET('molarity', 'Molaridad'),
    ],
  });

  // ------------------------------------------------------------------
  const FUERTE_DEBIL = diagrama([-0.5, 8.3], [-1.8, 3.3], [
    raya([0, 3], [0, 0], [3.4, 0], [3.4, 3]), raya([4.4, 3], [4.4, 0], [7.8, 0], [7.8, 3]),
    txt(0.6, 2.3, 'H⁺'), txt(1.6, 2.4, 'Cl⁻'), txt(1.9, 1.4, 'H⁺'), txt(2.8, 1.0, 'Cl⁻'), txt(0.8, 0.5, 'H⁺'), txt(2.2, 0.4, 'Cl⁻'), txt(0.7, 1.4, 'Cl⁻'), txt(2.8, 2.2, 'H⁺'),
    txt(5.0, 2.3, 'HA'), txt(6.9, 2.2, 'HA'), txt(5.3, 0.6, 'HA'), txt(7.0, 0.8, 'HA'), txt(5.6, 1.5, 'H⁺'), txt(6.6, 1.4, 'A⁻'),
    txt(1.7, -0.5, 'ácido fuerte:'), txt(1.7, -1.1, 'todo se separa'),
    txt(6.1, -0.5, 'ácido débil:'), txt(6.1, -1.1, 'casi nada se separa'),
  ], 'Dos vasos. El de la izquierda tiene un ácido fuerte, ácido clorhídrico: dentro solo hay iones separados, cuatro H⁺ y cuatro Cl⁻; todo se separó. El de la derecha tiene un ácido débil, escrito HA: hay cuatro moléculas HA enteras y solo un par separado, un H⁺ y un A⁻.');

  L('Ácidos y bases', {
    objetivo: 'Reconocer ácidos y bases por sus propiedades, distinguir un ácido fuerte de uno débil y usar indicadores para identificarlos.',
    explicacion: `
      <p>El limón es agrio y hace que se te arrugue la cara. El jabón, si te cae en la boca por accidente, sabe amargo, y entre los dedos se siente resbaloso. Son dos familias opuestas de sustancias: los ácidos y las bases. Una advertencia antes de seguir: en un laboratorio nunca se prueba ni se toca nada para saber qué es. Muchos ácidos y bases queman.</p>
      <h3>Lo que hacen en el agua</h3>
      <p>En la Unidad 5 viste que los ácidos sueltan iones H⁺ en el agua y que los hidróxidos tienen iones OH⁻. Ahora puedes verlos como dos equipos contrarios. Un ácido es una sustancia que cede H⁺. Una base es una sustancia que los recibe; los hidróxidos lo hacen con su OH⁻, que atrapa al H⁺ y forma agua. Por eso, cuando se juntan, se neutralizan, como viste en la lección de sales:</p>
      <p>H⁺ + OH⁻ → H₂O</p>
      <p>Se lee "un ion hidrógeno más un ion hidróxido dan una molécula de agua". Para neutralizar un ácido hace falta la misma cantidad de OH⁻ que de H⁺.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Propiedad</th><th>Ácidos</th><th>Bases</th></tr>
        <tr><th>Sabor</th><td>Agrio, como el limón</td><td>Amargo, como el jabón</td></tr>
        <tr><th>Al tacto</th><td>Pueden quemar</td><td>Resbalosas; pueden quemar</td></tr>
        <tr><th>Con metales como el zinc</th><td>Sueltan hidrógeno</td><td>Casi nunca reaccionan</td></tr>
        <tr><th>Papel tornasol</th><td>Lo vuelven rojo</td><td>Lo vuelven azul</td></tr>
      </table></div>
      <h3>Fuertes y débiles</h3>
      <p>No todos los ácidos sueltan sus H⁺ igual. Un <strong>ácido fuerte</strong> se separa por completo en iones al disolverse: cada molécula de HCl suelta su H⁺. Un <strong>ácido débil</strong> casi no se separa: la mayoría de sus moléculas se quedan enteras y solo unas pocas sueltan su H⁺. El ácido del vinagre y el del limón son débiles; por eso te los puedes comer.</p>
      ${FUERTE_DEBIL}
      <p>Con las bases pasa lo mismo: la sosa cáustica, NaOH, es una base fuerte, y el bicarbonato es una base débil.</p>
      <h3>Cómo saber cuál es</h3>
      <p>Un <strong>indicador</strong> es una sustancia que cambia de color según esté en un ácido o en una base. El más conocido es el papel tornasol: se pone rojo con los ácidos y azul con las bases. Puedes hacer uno en casa con agua de col morada: se pone roja con un ácido, se queda morada si es neutra, y se pone verde o amarilla con una base.</p>
      <p class="nota"><strong>Trampa común:</strong> confundir "fuerte" con "concentrado". Fuerte quiere decir que se separa por completo; concentrado, que hay mucho en poca agua. Un ácido fuerte muy diluido puede ser menos peligroso que un ácido débil muy concentrado.</p>`,
    ejemplo: `
      <p>Tienes una disolución con 2 mol de HCl. ¿Cuántos moles de NaOH necesitas para neutralizarla? ¿Cómo sabrías que ya está neutra?</p>
      <ol class="pasos-ej">
        <li>Primero cuenta los H⁺: el HCl es un ácido fuerte, así que cada molécula suelta uno. Hay 2 mol de H⁺.</li>
        <li>Cada OH⁻ neutraliza un H⁺, y cada NaOH aporta un OH⁻. Entonces necesitas 2 mol de NaOH.</li>
        <li>Escribe la ecuación para comprobar: HCl + NaOH → NaCl + H₂O. Es de 1 a 1, así que 2 mol de HCl van con 2 mol de NaOH.</li>
        <li>Para saber cuándo terminar, agrega unas gotas de agua de col morada. Mientras haya ácido de sobra se verá roja; cuando la mezcla quede neutra, se verá morada.</li>
      </ol>
      <p>Resultado: <span class="resultado">2 mol de NaOH</span>. Lo que queda es agua con sal.</p>
      <p class="nota"><strong>Error común:</strong> agregar NaOH de más "para asegurarse". Entonces sobra base, y la mezcla deja de ser neutra.</p>`,
    vidaReal: `
      <p>Los sabores agrios y las cosas resbalosas tienen más que ver contigo de lo que parece:</p>
      <ul>
        <li>Un antiácido calma el ardor de estómago porque contrarresta parte de lo que lo causa.</li>
        <li>El bicarbonato con vinagre burbujea porque son sustancias opuestas que reaccionan.</li>
        <li>Con agua de col morada puedes saber en casa qué productos son agrios y cuáles no, por el color que toman.</li>
        <li>Los limpiadores de hornos queman la piel, por eso se usan con guantes.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas sustancias es una base?</p>',
        opciones: ['El jugo de limón', 'El vinagre', 'El hidróxido de sodio, NaOH', 'El ácido clorhídrico, HCl'], correcta: 2,
        pista: '<p>Busca la que tiene iones OH⁻.</p>',
        solucion: '<p>El <strong>hidróxido de sodio</strong>: su OH⁻ atrapa los H⁺. Los otros tres son ácidos.</p>' },
      { tipo: 'opciones', enunciado: '<p>Mojas un papel tornasol en un líquido y se pone rojo. ¿Qué es el líquido?</p>',
        opciones: ['Un ácido', 'Una base', 'Agua pura'], correcta: 0,
        pista: '<p>El tornasol se pone rojo con unos y azul con otros.</p>',
        solucion: '<p>Es <strong>un ácido</strong>. Una base lo pondría azul.</p>' },
      { tipo: 'opciones', enunciado: '<p>El ácido clorhídrico, HCl, se separa por completo en iones al disolverse en agua. ¿Qué tipo de ácido es?</p>',
        opciones: ['Un ácido débil', 'Un ácido fuerte', 'Una base débil'], correcta: 1,
        pista: '<p>Fíjate en la palabra "por completo".</p>',
        solucion: '<p>Es <strong>un ácido fuerte</strong>: todas sus moléculas sueltan su H⁺.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos moles de NaOH hacen falta para neutralizar 3 mol de HCl?</p>', respuesta: 3,
        pista: '<p>Cada OH⁻ neutraliza un H⁺.</p>',
        solucion: '<p>La reacción es de 1 a 1: hacen falta <strong>3 mol</strong> de NaOH.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿De qué color se pone el agua de col morada al mezclarla con una base?</p>',
        opciones: ['Roja', 'Se queda morada', 'Verde o amarilla'], correcta: 2,
        pista: '<p>Roja es para los ácidos y morada para lo neutro.</p>',
        solucion: '<p>Se pone <strong>verde o amarilla</strong>. Con un ácido se pondría roja.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué hace un antiácido en tu estómago?</p>',
        opciones: ['Neutraliza parte del ácido del estómago', 'Agrega más ácido para digerir mejor', 'Disuelve la comida en lugar del ácido'], correcta: 0,
        pista: '<p>Los antiácidos son bases, como la leche de magnesia.</p>',
        solucion: '<p><strong>Neutraliza parte del ácido</strong>: la base atrapa los H⁺ y forma agua y una sal.</p>' },
    ],
    fuentes: [
      OSC('14-1-bronsted-lowry-acids-and-bases', 'Brønsted-Lowry Acids and Bases'),
      WIKI('Base_(química)', 'Base (química)'),
      WIKI('Indicador_de_pH', 'Indicador de pH'),
      PHET('acid-base-solutions', 'Soluciones ácido-base'),
    ],
  });

  // ------------------------------------------------------------------
  const MARCAS = Array.from({ length: 15 }, (_, i) => i);
  const ESCALA = diagrama([-0.8, 14.8], [-2, 2.7], [
    { tipo: 'linea', desde: [0, 0], hasta: [14, 0] },
    ...MARCAS.flatMap((v) => [{ tipo: 'linea', desde: [v, -0.15], hasta: [v, 0.15] }, txt(v, -0.5, String(v))]),
    ...[[2, 'limón'], [5, 'café'], [7.4, 'sangre'], [10, 'jabón'], [12.5, 'cloro']].flatMap(([v, n]) => [punto(v, 0, 0.12), txt(v, 0.6, n)]),
    ...[[3, 'vinagre'], [7, 'agua pura'], [11, 'amoniaco']].flatMap(([v, n]) => [punto(v, 0, 0.12), txt(v, -1.1, n)]),
    ...flecha([6, 1.5], [0.4, 1.5], 0, 2), txt(3.2, 2.0, 'más ácido'),
    ...flecha([8, 1.5], [13.6, 1.5], 0, 2), txt(10.8, 2.0, 'más básico'),
  ], 'Una recta numerada del 0 al 14, la escala de pH. Arriba de la recta están el limón en 2, el café en 5, la sangre en 7.4, el jabón en 10 y el cloro en 12.5. Abajo están el vinagre en 3, el agua pura en 7 y el amoniaco en 11. Una flecha hacia la izquierda dice "más ácido" y otra hacia la derecha dice "más básico".');

  L('El pH', {
    objetivo: 'Usar la escala de pH para saber si algo es ácido, neutro o básico, y entender por qué cada número es diez veces más ácido que el siguiente.',
    explicacion: `
      <p>Quien tiene una alberca o un acuario mete una tirita de papel en el agua, la compara con una tabla de colores y lee un número. Ese número dice qué tan ácida o básica está el agua, y si no está en su rango, los peces se enferman o el cloro deja de funcionar. Es el pH.</p>
      <h3>Una escala del 0 al 14</h3>
      <p>El <strong>pH</strong> es un número que dice qué tan ácida o básica es una disolución. Se mide en la <strong>escala de pH</strong>, que en la vida diaria va del 0 al 14:</p>
      <ul>
        <li>Por debajo de 7, la disolución es ácida. Entre más bajo el número, más ácida.</li>
        <li>Justo en 7 es <strong>neutra</strong>: ni ácida ni básica, como el agua pura.</li>
        <li>Por encima de 7, es básica. Entre más alto el número, más básica.</li>
      </ul>
      ${ESCALA}
      <div class="tabla-wrap"><table>
        <tr><th>Sustancia</th><th>pH aproximado</th></tr>
        <tr><th>Jugo de tu estómago</th><td>2</td></tr>
        <tr><th>Limón</th><td>2</td></tr>
        <tr><th>Vinagre</th><td>3</td></tr>
        <tr><th>Café</th><td>5</td></tr>
        <tr><th>Lluvia normal</th><td>5.6</td></tr>
        <tr><th>Agua pura</th><td>7</td></tr>
        <tr><th>Sangre</th><td>7.4</td></tr>
        <tr><th>Bicarbonato en agua</th><td>8.3</td></tr>
        <tr><th>Jabón</th><td>10</td></tr>
        <tr><th>Amoniaco para limpiar</th><td>11</td></tr>
        <tr><th>Cloro para limpiar</th><td>12.5</td></tr>
      </table></div>
      <h3>Cada número es diez veces</h3>
      <p>El pH no sube de uno en uno como una regla: cada paso es diez veces. El número sale de la concentración de iones H⁺. Cuando hay 10⁻ⁿ moles de H⁺ por litro, el pH es n. Con pH 2 hay 10⁻² = 0.01 mol de H⁺ por litro; con pH 3, 10⁻³ = 0.001. El pH es el exponente, sin el signo menos. En Matemáticas, a ese "buscar el exponente" se le llama logaritmo, pero aquí basta con las potencias de 10.</p>
      <p>Fíjate en lo que eso significa. Bajar un punto de pH quiere decir 10 veces más H⁺. Bajar dos puntos, 10 × 10 = 100 veces más. Por eso el vinagre, con pH 3, es 100 veces más ácido que el café, con pH 5, aunque los números parezcan cercanos.</p>
      <h3>El pH en tu vida</h3>
      <p>Tu sangre se mantiene entre 7.35 y 7.45, apenas un poco básica, y tu cuerpo trabaja todo el tiempo para que no se mueva de ahí. La lluvia normal ya es un poco ácida, 5.6, porque el dióxido de carbono del aire forma ácido carbónico al disolverse en ella. Cuando el humo de fábricas y coches suma otros óxidos, la lluvia baja de 5.6: es la lluvia ácida, que daña bosques, lagos y edificios.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que pH 2 es "el doble de ácido" que pH 4. Son dos pasos de diez: es 100 veces más ácido.</p>`,
    ejemplo: `
      <p>¿Cuántas veces más ácido es el jugo de limón, con pH 2, que el café, con pH 5?</p>
      <ol class="pasos-ej">
        <li>Primero calcula cuántos pasos de pH los separan: 5 − 2 = 3 pasos.</li>
        <li>Cada paso es 10 veces más ácido, así que multiplicas 10 tres veces: 10 × 10 × 10 = 10³ = 1 000.</li>
        <li>Comprueba con las concentraciones. El limón tiene 10⁻² = 0.01 mol de H⁺ por litro, y el café 10⁻⁵ = 0.00001.</li>
        <li>Divide para ver cuántas veces cabe una en la otra: 0.01 ÷ 0.00001 = 1 000. Coincide con el resultado anterior.</li>
      </ol>
      <p>Resultado: <span class="resultado">el limón es 1 000 veces más ácido que el café</span>. Por eso el limón sabe mucho más agrio que el café.</p>
      <p class="nota"><strong>Error común:</strong> responder 3 veces porque la diferencia de pH es 3. La diferencia dice cuántas veces multiplicas por 10, no el resultado.</p>`,
    vidaReal: `
      <p>Medir qué tan agria o resbalosa es el agua de algo se hace todo el tiempo:</p>
      <ul>
        <li>Las albercas y los acuarios se revisan con tiritas de papel para que el agua esté sana.</li>
        <li>Los agricultores miden la tierra para saber qué cultivos se darán bien en ella.</li>
        <li>Los shampoos para bebé están hechos para no irritar los ojos.</li>
        <li>Tu cuerpo mantiene tu sangre en un rango muy estrecho; si se sale, te enfermas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuántas veces más ácida es una disolución con pH 3 que una con pH 5?</p>', respuesta: 10 ** (5 - 3),
        pista: '<p>¿Cuántos pasos de pH hay entre ellas? Cada paso es 10 veces.</p>',
        solucion: '<p>Hay 2 pasos: 10 × 10 = <strong>100 veces</strong> más ácida.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una disolución tiene pH 9. ¿Cómo es?</p>',
        opciones: ['Ácida', 'Neutra', 'Básica'], correcta: 2,
        pista: '<p>Compara con 7.</p>',
        solucion: '<p>Es <strong>básica</strong>, porque 9 es mayor que 7.</p>' },
      { tipo: 'numero', enunciado: '<p>Una disolución tiene pH 3. ¿Cuántos moles de H⁺ hay por litro? Escríbelo como número decimal.</p>', respuesta: 10 ** -3,
        pista: '<p>Con pH n hay 10⁻ⁿ mol de H⁺ por litro.</p>',
        solucion: '<p>10⁻³ = <strong>0.001 mol por litro</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una disolución tiene 10⁻⁴ mol de H⁺ por litro. ¿Cuál es su pH?</p>', respuesta: 4,
        pista: '<p>El pH es el exponente, sin el signo menos.</p>',
        solucion: '<p>El exponente es −4, así que el pH es <strong>4</strong>: es ácida.</p>' },
      { tipo: 'opciones', enunciado: '<p>Tu sangre tiene un pH de 7.4. ¿Cómo es?</p>',
        opciones: ['Ligeramente ácida', 'Ligeramente básica', 'Muy ácida'], correcta: 1,
        pista: '<p>¿7.4 está arriba o abajo de 7? ¿Por mucho?</p>',
        solucion: '<p>Es <strong>ligeramente básica</strong>: apenas un poco por encima de 7.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué se llama lluvia ácida?</p>',
        opciones: ['La lluvia con pH menor que 5.6, el de la lluvia normal', 'Cualquier lluvia con pH menor que 7', 'La lluvia con pH mayor que 7'], correcta: 0,
        pista: '<p>La lluvia normal ya es un poco ácida.</p>',
        solucion: '<p>La que tiene <strong>pH menor que 5.6</strong>. La lluvia normal ya tiene 5.6 por el dióxido de carbono del aire; la ácida tiene además óxidos del humo de fábricas y coches.</p>' },
    ],
    fuentes: [
      OSC('14-2-ph-and-poh', 'pH and pOH'),
      WIKI('PH', 'pH'),
      KHAN('acids-and-bases-topic', 'Ácidos y bases'),
      PHET('ph-scale', 'Escala de pH'),
    ],
  });
})();
