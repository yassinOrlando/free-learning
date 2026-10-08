// Química · Unidad 7: Estequiometría.
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
  const diagrama = (x, y, figuras, descripcion) => G({ x, y, figuras, descripcion, proporcional: true, ejes: false });
  // Átomo como bolita con su letra encima: se distingue por la letra, no por el color.
  const atomo = (x, y, letra) => [{ tipo: 'circulo', x, y, r: 0.27, relleno: true }, txt(x, y - 0.02, letra)];

  const OSC = (pagina, nombre) => ({ nombre: `OpenStax, Chemistry 2e: ${nombre} (CC BY 4.0)`, url: `https://openstax.org/books/chemistry-2e/pages/${pagina}` });
  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const KHAN = (ruta, nombre) => ({ nombre: `Khan Academy en español: ${nombre}`, url: `https://es.khanacademy.org/science/chemistry/${ruta}` });
  const PHET = (sim, nombre) => ({ nombre: `PhET, Universidad de Colorado: ${nombre}`, url: `https://phet.colorado.edu/es/simulations/${sim}` });

  const NA = 6.02e23; // número de Avogadro, con tres cifras
  const GRANDE = 0.01e24; // tolerancia para respuestas del orden de 10²⁴: acepta 1.2×10²⁴ en lugar de 1.204×10²⁴

  // ------------------------------------------------------------------
  L('El mol', {
    objetivo: 'Entender qué es un mol, por qué se usa para contar átomos y convertir entre moles y número de partículas.',
    explicacion: `
      <p>Cuando compras huevos, no los pides de uno en uno: pides una docena, y sabes que son 12. En la papelería, un paquete de hojas trae 500. Para contar cosas pequeñas y numerosas conviene usar paquetes con un número fijo. Los químicos tienen su propio paquete, pensado para átomos.</p>
      <h3>Un paquete para cosas diminutas</h3>
      <p>Los átomos son tan pequeños que en una cucharada de agua hay más de los que podrías contar en toda tu vida. Una docena de átomos no serviría de nada. Hace falta un paquete enorme.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Paquete</th><th>¿Cuántas cosas trae?</th></tr>
        <tr><th>Un par</th><td>2</td></tr>
        <tr><th>Una docena</th><td>12</td></tr>
        <tr><th>Un paquete de hojas</th><td>500</td></tr>
        <tr><th>Un mol</th><td>6.02×10²³</td></tr>
      </table></div>
      <p>Un <strong>mol</strong> es la cantidad de cualquier cosa que tiene 6.02×10²³ unidades. Así como una docena de huevos son 12 huevos, un mol de átomos de hierro son 6.02×10²³ átomos de hierro. Y un mol de moléculas de agua son 6.02×10²³ moléculas de agua.</p>
      <p>A ese número se le llama <strong>número de Avogadro</strong>, en honor al científico italiano Amedeo Avogadro. Está escrito en notación científica, que viste en Matemáticas: es un 602 seguido de 21 ceros, unos "602 mil trillones".</p>
      <h3>¿Qué tan grande es?</h3>
      <p>Es difícil imaginarlo. Si contaras un átomo cada segundo, sin parar nunca, tardarías unos 19 000 billones de años en contar un mol. Eso es más de un millón de veces la edad del universo. Y aun así, un mol de agua cabe más o menos en una cuchara sopera: son apenas 18 gramos.</p>
      <h3>De moles a partículas, y al revés</h3>
      <p>Como cada mol trae el mismo número de partículas, pasar de uno a otro es una multiplicación o una división, igual que con las docenas:</p>
      <p>partículas = moles × 6.02×10²³</p>
      <p>Se lee "el número de partículas es el número de moles por el número de Avogadro". Si tienes 3 docenas, tienes 3 × 12 huevos; si tienes 3 moles, tienes 3 × 6.02×10²³ partículas.</p>
      <p>Para ir al revés, divides:</p>
      <p>moles = partículas ÷ 6.02×10²³</p>
      <p>Fíjate en un detalle: el mol cuenta, no pesa. Un mol de átomos de oro y un mol de átomos de aluminio tienen exactamente el mismo número de átomos, aunque el de oro pese mucho más. Igual que una docena de canicas y una docena de melones son 12 cosas cada una. En la siguiente lección verás cuánto pesa un mol de cada sustancia.</p>
      <p>Cuando las partículas son moléculas, hay que fijarse en los átomos de adentro. Un mol de moléculas de agua, H₂O, tiene 2 moles de átomos de hidrógeno, porque cada molécula tiene 2.</p>
      <p class="nota"><strong>Trampa común:</strong> al multiplicar por 6.02×10²³, olvidar ajustar la potencia. Por ejemplo, 2 × 6.02×10²³ = 12.04×10²³, que se escribe mejor como 1.204×10²⁴.</p>`,
    ejemplo: `
      <p>Una pieza pequeña de hierro tiene 0.5 mol de átomos de hierro. ¿Cuántos átomos son?</p>
      <ol class="pasos-ej">
        <li>Primero identifica qué tienes y qué quieres: tienes moles y quieres partículas. Entonces multiplicas por el número de Avogadro.</li>
        <li>Haz la cuenta: 0.5 × 6.02×10²³ = 3.01×10²³ átomos.</li>
        <li>Revisa la potencia: 0.5 × 6.02 = 3.01, que ya está entre 1 y 10, así que la potencia se queda en 10²³.</li>
        <li>Comprueba al revés: 3.01×10²³ ÷ 6.02×10²³ = 0.5 mol. Coincide con lo que tenías.</li>
        <li>Comprueba que tenga sentido: medio mol debe ser la mitad del número de Avogadro, y 3.01 es la mitad de 6.02.</li>
      </ol>
      <p>Resultado: <span class="resultado">3.01×10²³ átomos de hierro</span>. Es un número enorme para una pieza tan pequeña, y así debe ser: los átomos son diminutos.</p>
      <p class="nota"><strong>Error común:</strong> dividir cuando hay que multiplicar. Si pasas de moles a partículas, el resultado tiene que ser un número enorme.</p>`,
    vidaReal: `
      <p>Contar por paquetes es algo que haces todo el tiempo, y los químicos lo usan para lo más pequeño:</p>
      <ul>
        <li>Compras huevos por docena y hojas por paquete sin contarlas una por una.</li>
        <li>Los laboratorios preparan medicinas sabiendo cuántas partículas de cada sustancia llevan.</li>
        <li>Los análisis de sangre reportan algunas sustancias contándolas así, por cada litro.</li>
        <li>Las fábricas de alimentos y fertilizantes calculan sus mezclas con este mismo paquete.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuántos átomos hay en 2 moles de hierro? Escribe tu respuesta en notación científica, por ejemplo 1.5×10^24.</p>',
        respuesta: 2 * NA, tolerancia: GRANDE,
        pista: '<p>Multiplica los moles por 6.02×10²³.</p>',
        solucion: '<p>2 × 6.02×10²³ = 12.04×10²³ = <strong>1.204×10²⁴ átomos</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos moles son 3.01×10²³ moléculas de agua?</p>', respuesta: 3.01e23 / NA,
        pista: '<p>Divide el número de moléculas entre 6.02×10²³.</p>',
        solucion: '<p>3.01×10²³ ÷ 6.02×10²³ = <strong>0.5 mol</strong>: es justo la mitad del número de Avogadro.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos átomos de hidrógeno hay en 1 mol de moléculas de agua, H₂O? Escribe tu respuesta en notación científica.</p>',
        respuesta: 2 * NA, tolerancia: GRANDE,
        pista: '<p>Cada molécula tiene 2 hidrógenos. ¿Cuántos moles de hidrógeno hay en 1 mol de agua?</p>',
        solucion: '<p>Hay 2 moles de átomos de hidrógeno: 2 × 6.02×10²³ = <strong>1.204×10²⁴ átomos</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es un mol?</p>',
        opciones: ['Una unidad para medir la masa de un átomo', 'Una cantidad fija de partículas: 6.02×10²³', 'El volumen que ocupa un litro de gas'], correcta: 1,
        pista: '<p>Piensa en la docena: ¿mide masa o cuenta cosas?</p>',
        solucion: '<p>Un mol es <strong>una cantidad fija de partículas</strong>, 6.02×10²³, igual que una docena son 12 cosas.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos moles son 1.806×10²⁴ átomos de carbono?</p>', respuesta: 1.806e24 / NA,
        pista: '<p>Divide entre 6.02×10²³. Ojo con las potencias: 10²⁴ ÷ 10²³ = 10.</p>',
        solucion: '<p>1.806×10²⁴ ÷ 6.02×10²³ = 18.06×10²³ ÷ 6.02×10²³ = <strong>3 moles</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Dónde hay más átomos, en 1 mol de oro o en 1 mol de aluminio?</p>',
        opciones: ['En el de oro, porque pesa más', 'En el de aluminio, porque sus átomos son más ligeros', 'En los dos hay el mismo número de átomos'], correcta: 2,
        pista: '<p>¿Una docena de melones tiene más cosas que una docena de canicas?</p>',
        solucion: '<p><strong>En los dos hay el mismo número</strong>: 6.02×10²³ átomos. El mol cuenta, no pesa.</p>' },
    ],
    fuentes: [
      OSC('3-1-formula-mass-and-the-mole-concept', 'Formula Mass and the Mole Concept'),
      WIKI('Mol', 'Mol'),
      WIKI('Constante_de_Avogadro', 'Constante de Avogadro'),
    ],
  });

  // ------------------------------------------------------------------
  const MAPA = diagrama([-1, 10.4], [-1.3, 1.3], [
    txt(0, 0, 'gramos'), txt(4.5, 0, 'moles'), txt(9, 0, 'partículas'),
    ...flecha([1, 0.35], [3.6, 0.35]), txt(2.3, 0.8, '÷ masa molar'),
    ...flecha([3.6, -0.35], [1, -0.35]), txt(2.3, -0.85, '× masa molar'),
    ...flecha([5.4, 0.35], [7.8, 0.35]), txt(6.6, 0.8, '× 6.02×10²³'),
    ...flecha([7.8, -0.35], [5.4, -0.35]), txt(6.6, -0.85, '÷ 6.02×10²³'),
  ], 'Un mapa de conversiones con tres palabras en fila: gramos, moles y partículas. De gramos a moles, una flecha dice "÷ masa molar"; de regreso, de moles a gramos, otra dice "× masa molar". De moles a partículas, una flecha dice "× 6.02×10²³"; de regreso, de partículas a moles, otra dice "÷ 6.02×10²³". Los moles quedan en medio: para pasar de gramos a partículas siempre se pasa por los moles.');

  L('Masa molar', {
    objetivo: 'Calcular la masa molar de una sustancia con su fórmula y convertir entre gramos, moles y partículas.',
    explicacion: `
      <p>Una docena de canicas y una docena de bolas de boliche son 12 cosas cada una, pero no pesan lo mismo ni de lejos. Con los moles pasa igual: un mol de hidrógeno y un mol de hierro tienen el mismo número de átomos, pero pesan muy distinto. Como en el laboratorio nadie cuenta átomos, sino que los pesa, hace falta saber cuánto pesa un mol de cada cosa.</p>
      <h3>El truco de los mismos números</h3>
      <p>En la Unidad 2 viste que la masa atómica del carbono es 12 u. El número de Avogadro se eligió justo para que pasara algo muy cómodo: un mol de átomos de carbono pesa 12 gramos. El mismo número, pero en gramos.</p>
      <p>A la masa de un mol de una sustancia se le llama <strong>masa molar</strong>, y se mide en gramos por mol (g/mol). La del carbono es 12 g/mol; la del hierro, 56 g/mol. Para cada elemento, basta con leer la masa atómica de la tabla periódica y ponerle "gramos por mol".</p>
      <div class="tabla-wrap"><table>
        <tr><th>Elemento</th><th>Masa molar (g/mol, redondeada)</th></tr>
        <tr><th>Hidrógeno (H)</th><td>1</td></tr>
        <tr><th>Carbono (C)</th><td>12</td></tr>
        <tr><th>Nitrógeno (N)</th><td>14</td></tr>
        <tr><th>Oxígeno (O)</th><td>16</td></tr>
        <tr><th>Sodio (Na)</th><td>23</td></tr>
        <tr><th>Cloro (Cl)</th><td>35.5</td></tr>
        <tr><th>Calcio (Ca)</th><td>40</td></tr>
        <tr><th>Hierro (Fe)</th><td>56</td></tr>
      </table></div>
      <h3>La masa molar de un compuesto</h3>
      <p>Para un compuesto, suma las masas de todos los átomos de la fórmula, multiplicando por los subíndices. Una molécula de agua, H₂O, tiene 2 hidrógenos y 1 oxígeno:</p>
      <p>H₂O: 2 × 1 + 1 × 16 = 18 g/mol</p>
      <p>Se lee "dos hidrógenos de 1 más un oxígeno de 16 dan 18 gramos por mol". Un mol de agua pesa 18 g, más o menos lo que cabe en una cuchara sopera. Para el dióxido de carbono, CO₂: 12 + 2 × 16 = 44 g/mol.</p>
      <h3>De gramos a moles</h3>
      <p>Si sabes cuánto pesa un mol, puedes saber cuántos moles hay en cualquier cantidad que peses:</p>
      <p>moles = ${F('masa en gramos', 'masa molar')}</p>
      <p>Se lee "los moles son la masa entre la masa molar". Es como saber cuántas docenas hay: si una docena de huevos pesa 600 g y tienes 1 800 g de huevos, tienes 1 800 ÷ 600 = 3 docenas. Para ir al revés, de moles a gramos, multiplicas: masa = moles × masa molar.</p>
      <p>Con esto ya puedes ir de lo que pesas en una báscula hasta el número de partículas, pasando siempre por los moles:</p>
      ${MAPA}
      <p class="nota"><strong>Trampa común:</strong> olvidar multiplicar por los subíndices. La masa molar del CO₂ no es 12 + 16 = 28, sino 12 + 2 × 16 = 44, porque tiene dos oxígenos.</p>`,
    ejemplo: `
      <p>Un vaso de agua tiene 180 g. ¿Cuántos moles de agua son? ¿Y cuántas moléculas?</p>
      <ol class="pasos-ej">
        <li>Primero calcula la masa molar del agua: 2 × 1 + 16 = 18 g/mol.</li>
        <li>Pasa de gramos a moles dividiendo entre la masa molar, porque quieres saber cuántos "paquetes" de 18 g caben en 180 g: 180 ÷ 18 = 10 mol.</li>
        <li>Pasa de moles a moléculas multiplicando por el número de Avogadro: 10 × 6.02×10²³ = 6.02×10²⁴ moléculas.</li>
        <li>Comprueba al revés: 10 mol × 18 g/mol = 180 g, justo lo que pesa el agua. Y fíjate que el resultado tiene sentido: si un mol cabe en una cuchara sopera, en un vaso caben unas diez cucharas.</li>
      </ol>
      <p>Resultado: <span class="resultado">10 mol, que son 6.02×10²⁴ moléculas de agua</span>.</p>
      <p class="nota"><strong>Error común:</strong> multiplicar 180 × 18 en el segundo paso. De gramos a moles se divide: el resultado debe ser menor que la masa.</p>`,
    vidaReal: `
      <p>Pasar de lo que pesas a lo que cuentas es útil en muchos lugares:</p>
      <ul>
        <li>Los farmacéuticos pesan los ingredientes de una medicina para que lleve justo lo necesario.</li>
        <li>En la cocina, una receta escrita en gramos se puede repetir igual en cualquier casa.</li>
        <li>Los laboratorios clínicos convierten lo que miden en tu sangre a cantidades que el médico puede comparar.</li>
        <li>Puedes saber cuántas moléculas de agua hay en el vaso que te estás tomando.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuál es la masa molar del dióxido de carbono, CO₂, en g/mol? Usa C = 12 y O = 16.</p>', respuesta: 12 + 2 * 16,
        pista: '<p>Suma un carbono y dos oxígenos.</p>',
        solucion: '<p>12 + 2 × 16 = <strong>44 g/mol</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos moles hay en 36 g de agua? La masa molar del agua es 18 g/mol.</p>', respuesta: 36 / 18,
        pista: '<p>Divide la masa entre la masa molar.</p>',
        solucion: '<p>36 ÷ 18 = <strong>2 mol</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos gramos pesan 0.5 mol de sal, NaCl? Usa Na = 23 y Cl = 35.5.</p>', respuesta: 0.5 * (23 + 35.5),
        pista: '<p>Primero calcula la masa molar del NaCl y luego multiplícala por los moles.</p>',
        solucion: '<p>La masa molar es 23 + 35.5 = 58.5 g/mol, y 0.5 × 58.5 = <strong>29.25 g</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuál es la masa molar del carbonato de calcio, CaCO₃, en g/mol? Usa Ca = 40, C = 12 y O = 16.</p>', respuesta: 40 + 12 + 3 * 16,
        pista: '<p>Tiene un calcio, un carbono y tres oxígenos.</p>',
        solucion: '<p>40 + 12 + 3 × 16 = <strong>100 g/mol</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas moléculas hay en 18 g de agua? Escribe tu respuesta en notación científica.</p>', respuesta: (18 / 18) * NA, tolerancia: GRANDE,
        pista: '<p>Primero pasa los gramos a moles; luego, los moles a moléculas.</p>',
        solucion: '<p>18 g ÷ 18 g/mol = 1 mol, que son <strong>6.02×10²³ moléculas</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas sustancias tiene la mayor masa molar? Usa H = 1, C = 12 y O = 16.</p>',
        opciones: ['El dióxido de carbono, CO₂', 'El agua, H₂O', 'El metano, CH₄'], correcta: 0,
        pista: '<p>Calcula las tres: suma las masas de sus átomos.</p>',
        solucion: '<p>El <strong>dióxido de carbono</strong>, con 44 g/mol. El agua tiene 18 y el metano 16.</p>' },
    ],
    fuentes: [
      OSC('3-1-formula-mass-and-the-mole-concept', 'Formula Mass and the Mole Concept'),
      WIKI('Masa_molar', 'Masa molar'),
      WIKI('Mol', 'Mol'),
    ],
  });

  // ------------------------------------------------------------------
  L('Cálculos estequiométricos', {
    objetivo: 'Usar una ecuación balanceada para calcular cuánto producto se forma o cuánto reactivo se necesita.',
    explicacion: `
      <p>Una receta de hot cakes dice: 2 tazas de harina, 1 huevo y 1 taza de leche rinden 8 hot cakes. Si quieres 24, triplicas todo. Si solo tienes medio huevo, haces la mitad. La receta te dice en qué proporción va cada ingrediente, y con eso calculas cualquier cantidad.</p>
      <h3>La ecuación como receta</h3>
      <p>Una ecuación balanceada es la receta de una reacción. Los coeficientes no solo cuentan moléculas: también cuentan moles, porque si multiplicas todo por 6.02×10²³ la proporción no cambia. Así, 2H₂ + O₂ → 2H₂O se puede leer "2 moles de hidrógeno reaccionan con 1 mol de oxígeno y dan 2 moles de agua".</p>
      <p>A esa proporción entre los moles de dos sustancias de una ecuación se le llama <strong>relación molar</strong>. En el ejemplo, la relación entre el hidrógeno y el agua es de 2 a 2, o sea, de 1 a 1: por cada mol de hidrógeno sale un mol de agua. Y la del oxígeno con el agua es de 1 a 2: cada mol de oxígeno da 2 de agua.</p>
      <p>Al cálculo de cuánto reactivo se necesita o cuánto producto se forma, usando las relaciones de una ecuación, se le llama <strong>estequiometría</strong>. La palabra suena difícil, pero quiere decir "medir los elementos".</p>
      <h3>El camino de siempre</h3>
      <p>En el laboratorio las cosas se pesan, pero la ecuación habla en moles. Por eso casi todos los cálculos siguen tres pasos:</p>
      <ol>
        <li>Pasa los gramos que tienes a moles, dividiendo entre la masa molar.</li>
        <li>Usa la relación molar de la ecuación para pasar a moles de la sustancia que buscas.</li>
        <li>Pasa esos moles a gramos, multiplicando por la masa molar de la sustancia que buscas.</li>
      </ol>
      <p>El paso 2 es una regla de tres, como las que viste en Matemáticas. Si 1 mol de oxígeno da 2 moles de agua, entonces 3 moles de oxígeno dan 6. Puedes escribirlo así:</p>
      <p>moles de agua = moles de oxígeno × ${F('2', '1')}</p>
      <p>Se lee "los moles de agua son los moles de oxígeno por la relación 2 entre 1". El número de arriba es el coeficiente de lo que buscas, y el de abajo, el de lo que tienes.</p>
      <h3>Un mini ejemplo</h3>
      <p>¿Cuántos moles de oxígeno hacen falta para quemar 3 moles de metano? La ecuación es CH₄ + 2O₂ → CO₂ + 2H₂O. Por cada mol de metano van 2 de oxígeno, así que 3 moles de metano necesitan 3 × 2 = 6 moles de oxígeno. No hizo falta pasar por gramos, porque ya tenías moles.</p>
      <p class="nota"><strong>Trampa común:</strong> saltarse los moles y usar la relación de la ecuación directamente con gramos. Los coeficientes cuentan partículas, no gramos: 2 g de hidrógeno no reaccionan con 1 g de oxígeno.</p>`,
    ejemplo: `
      <p>¿Cuántos gramos de agua se forman al quemar 8 g de hidrógeno? La ecuación es 2H₂ + O₂ → 2H₂O. Usa H = 1 y O = 16.</p>
      <ol class="pasos-ej">
        <li>Pasa los gramos a moles. La masa molar del H₂ es 2 g/mol, así que 8 ÷ 2 = 4 mol de hidrógeno.</li>
        <li>Usa la relación molar: 2 moles de H₂ dan 2 de agua, de 1 a 1. Entonces 4 mol de H₂ dan 4 mol de agua.</li>
        <li>Pasa a gramos. La masa molar del agua es 18 g/mol: 4 × 18 = 72 g.</li>
        <li>Comprueba con la conservación de la masa. Los 4 mol de H₂ necesitan 2 mol de O₂, que pesan 2 × 32 = 64 g. Reactivos: 8 + 64 = 72 g. Productos: 72 g. Coinciden.</li>
      </ol>
      <p>Resultado: <span class="resultado">72 g de agua</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que 8 g de hidrógeno dan 8 g de agua. El agua también lleva el oxígeno que se le juntó, por eso pesa más.</p>`,
    vidaReal: `
      <p>Calcular cuánto sale de una mezcla, antes de hacerla, ahorra dinero y evita accidentes:</p>
      <ul>
        <li>Las fábricas de medicinas saben cuánto de cada ingrediente comprar para producir mil pastillas.</li>
        <li>Los ingenieros calculan cuánto aire necesita un motor para quemar toda la gasolina.</li>
        <li>Las bolsas de aire de los coches llevan la cantidad justa de sustancia para inflarse sin reventar.</li>
        <li>Es la misma cuenta que haces al ajustar una receta para más o menos personas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En la reacción N₂ + 3H₂ → 2NH₃, ¿cuántos moles de amoniaco se forman con 3 moles de hidrógeno?</p>', respuesta: 3 * 2 / 3,
        pista: '<p>La relación es de 3 moles de H₂ por cada 2 de NH₃.</p>',
        solucion: '<p>3 mol de H₂ × 2/3 = <strong>2 mol de NH₃</strong>. Justo los coeficientes de la ecuación.</p>' },
      { tipo: 'numero', enunciado: '<p>En la combustión CH₄ + 2O₂ → CO₂ + 2H₂O, ¿cuántos moles de oxígeno hacen falta para quemar 1 mol de metano?</p>', respuesta: 2,
        pista: '<p>Lee los coeficientes del metano y del oxígeno.</p>',
        solucion: '<p>Por cada mol de metano van <strong>2 moles de oxígeno</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con la misma ecuación, CH₄ + 2O₂ → CO₂ + 2H₂O, ¿cuántos gramos de CO₂ se forman al quemar 16 g de metano? Usa C = 12, H = 1 y O = 16.</p>', respuesta: (16 / 16) * 44,
        pista: '<p>Pasa los 16 g de metano a moles; la relación metano y CO₂ es de 1 a 1.</p>',
        solucion: '<p>La masa molar del CH₄ es 16 g/mol: 16 g son 1 mol. Se forma 1 mol de CO₂, que pesa 12 + 32 = <strong>44 g</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con la misma ecuación, ¿cuántos gramos de agua se forman al quemar 16 g de metano?</p>', respuesta: (16 / 16) * 2 * 18,
        pista: '<p>1 mol de metano da 2 moles de agua. ¿Cuánto pesan?</p>',
        solucion: '<p>16 g de metano son 1 mol, que da 2 mol de agua: 2 × 18 = <strong>36 g</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>En una ecuación balanceada, ¿qué dicen los coeficientes?</p>',
        opciones: ['Los gramos de cada sustancia', 'El orden en que se mezclan los reactivos', 'En qué proporción de moles reacciona o se forma cada sustancia'], correcta: 2,
        pista: '<p>Recuerda la receta: los coeficientes cuentan, no pesan.</p>',
        solucion: '<p>Dicen <strong>en qué proporción de moles</strong> participa cada sustancia. Para hablar de gramos hay que usar la masa molar.</p>' },
      { tipo: 'numero', enunciado: '<p>En 2H₂ + O₂ → 2H₂O, ¿cuántos gramos de oxígeno hacen falta para reaccionar con 4 g de hidrógeno? Usa H = 1 y O = 16.</p>', respuesta: (4 / 2) / 2 * 32,
        pista: '<p>Pasa los gramos de H₂ a moles. Por cada 2 moles de H₂ va 1 de O₂.</p>',
        solucion: '<p>4 g de H₂ son 2 mol, que necesitan 1 mol de O₂: <strong>32 g</strong>.</p>' },
    ],
    fuentes: [
      OSC('4-3-reaction-stoichiometry', 'Reaction Stoichiometry'),
      WIKI('Estequiometría', 'Estequiometría'),
      KHAN('chemical-reactions-stoichiome/stoichiometry-ideal', 'Estequiometría'),
    ],
  });

  // ------------------------------------------------------------------
  const agua = (x, y) => [...atomo(x, y, 'O'), ...atomo(x - 0.45, y - 0.3, 'H'), ...atomo(x + 0.45, y - 0.3, 'H')];
  const h2 = (x, y) => [...atomo(x, y, 'H'), ...atomo(x + 0.5, y, 'H')];
  const SOBRANTE = diagrama([-0.6, 11.4], [-1.1, 2.4], [
    ...[0, 1.4].flatMap((x) => [2, 1, 0].flatMap((y) => h2(x, y))),
    txt(2.6, 1, '+'),
    ...[1.5, 0.5].flatMap((y) => [...atomo(3.3, y, 'O'), ...atomo(3.8, y, 'O')]),
    ...flecha([4.6, 1], [5.7, 1]),
    ...agua(6.8, 1.6), ...agua(8.5, 1.6), ...agua(6.8, 0.4), ...agua(8.5, 0.4),
    ...h2(10, 1.5), ...h2(10, 0.5),
    txt(0.95, -0.7, '6 H₂'), txt(3.55, -0.7, '2 O₂'), txt(7.65, -0.7, '4 H₂O'), txt(10.25, -0.7, 'sobran 2 H₂'),
  ], 'A la izquierda, 6 moléculas de hidrógeno, cada una con dos bolitas H, más 2 moléculas de oxígeno, cada una con dos bolitas O. Una flecha apunta a la derecha, donde hay 4 moléculas de agua, con una O y dos H cada una, y aparte 2 moléculas de hidrógeno que no reaccionaron, rotuladas "sobran 2 H₂". El oxígeno se acabó primero.');

  L('Reactivo limitante y rendimiento', {
    objetivo: 'Encontrar el reactivo limitante de una reacción, calcular cuánto producto se puede formar y calcular el rendimiento.',
    explicacion: `
      <p>Quieres hacer sándwiches de 2 rebanadas de pan y 1 de jamón. Tienes 10 rebanadas de pan y 3 de jamón. El pan alcanza para 5 sándwiches, pero el jamón solo para 3. Haces 3, se acaba el jamón y te sobran 4 rebanadas de pan. El jamón decidió cuántos sándwiches salieron.</p>
      <h3>El que se acaba primero</h3>
      <p>En una reacción pasa lo mismo. Casi nunca se mezclan los reactivos en la proporción exacta de la ecuación, y uno se acaba antes que el otro. Al reactivo que se acaba primero, y que por eso decide cuánto producto se forma, se le llama <strong>reactivo limitante</strong>. Al que sobra se le llama <strong>reactivo en exceso</strong>.</p>
      ${SOBRANTE}
      <p>En el dibujo, 6 moléculas de hidrógeno se encuentran con 2 de oxígeno. La ecuación es 2H₂ + O₂ → 2H₂O: cada oxígeno necesita 2 hidrógenos. Los 2 oxígenos usan 4 hidrógenos y forman 4 aguas. El oxígeno se acabó: es el limitante. Sobran 2 hidrógenos: es el reactivo en exceso.</p>
      <h3>Cómo encontrarlo</h3>
      <p>Con muchas moléculas no puedes dibujarlas, pero puedes hacer la cuenta:</p>
      <ol>
        <li>Pasa las cantidades de los dos reactivos a moles.</li>
        <li>Toma uno de ellos y calcula, con la relación molar, cuánto necesitaría del otro.</li>
        <li>Si tienes menos de lo que necesita, ese otro es el limitante. Si tienes más, el limitante es el primero.</li>
        <li>Calcula el producto a partir del limitante, nunca del que sobra.</li>
      </ol>
      <h3>Lo que sale en la vida real</h3>
      <p>La cantidad que calculas con la ecuación se llama rendimiento teórico: es lo máximo que podría salir si todo funcionara perfecto. En la práctica casi siempre sale menos. Parte del producto se queda pegado en el recipiente o se pierde al pasarlo de un frasco a otro, a veces no todo el reactivo alcanza a reaccionar, y a veces se forman otras sustancias que no querías.</p>
      <p>Para decir qué tan bien salió, se calcula el <strong>rendimiento</strong>: qué porcentaje del producto teórico obtuviste de verdad.</p>
      <p>rendimiento = ${F('lo que obtuviste', 'lo que debía salir')} × 100</p>
      <p>Se lee "el rendimiento es lo que obtuviste entre lo que debía salir, por cien". Es el mismo cálculo de "¿qué porcentaje es?" que viste en Matemáticas. Si debían salir 50 g y obtuviste 40 g, el rendimiento es 40 ÷ 50 × 100 = 80%.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que el limitante es el reactivo del que hay menos gramos o menos moles. Depende de la relación de la ecuación. Con 6 rebanadas de pan y 4 de jamón hay menos jamón, pero el que se acaba primero es el pan, porque cada sándwich lleva 2 de pan y solo 1 de jamón.</p>`,
    ejemplo: `
      <p>Mezclas 6 mol de hidrógeno con 2 mol de oxígeno: 2H₂ + O₂ → 2H₂O. ¿Cuál es el limitante? ¿Cuánta agua debería salir? Si obtienes 60 g, ¿cuál es el rendimiento?</p>
      <ol class="pasos-ej">
        <li>Calcula cuánto hidrógeno necesitan los 2 mol de oxígeno: la relación es de 2 a 1, así que 2 × 2 = 4 mol. Tienes 6, así que sobra hidrógeno y el oxígeno es el limitante.</li>
        <li>Calcula el agua a partir del limitante: 1 mol de O₂ da 2 de agua, así que 2 mol dan 4 mol de agua.</li>
        <li>Pasa a gramos: 4 × 18 = 72 g. Ese es el rendimiento teórico.</li>
        <li>Calcula el rendimiento: 60 ÷ 72 × 100 = 83.3%.</li>
        <li>Comprueba que tenga sentido: es menor que 100%, como casi siempre pasa en la realidad.</li>
      </ol>
      <p>Resultado: <span class="resultado">el limitante es el oxígeno; deberían salir 72 g y el rendimiento es 83.3%</span>.</p>
      <p class="nota"><strong>Error común:</strong> calcular el agua a partir de los 6 mol de hidrógeno. Daría 6 mol de agua, pero no hay oxígeno suficiente para formarlos.</p>`,
    vidaReal: `
      <p>Saber qué ingrediente se acaba primero, y cuánto se pierde en el camino, importa mucho:</p>
      <ul>
        <li>En la cocina, si te faltan huevos, no importa cuánta harina tengas: harás menos pastel.</li>
        <li>Las fábricas ponen un poco de más del ingrediente barato para que el caro se aproveche completo.</li>
        <li>Los motores mal ajustados desperdician gasolina porque no les llega aire suficiente.</li>
        <li>Las empresas comparan cuánto producto sacan con lo que debería salir para detectar pérdidas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Cada sándwich lleva 2 rebanadas de pan y 1 de jamón. Tienes 12 rebanadas de pan y 5 de jamón. ¿Cuántos sándwiches puedes hacer?</p>', respuesta: Math.min(12 / 2, 5),
        pista: '<p>Calcula para cuántos alcanza el pan y para cuántos alcanza el jamón.</p>',
        solucion: '<p>El pan alcanza para 6 y el jamón para 5. Salen <strong>5 sándwiches</strong>: el jamón es el limitante.</p>' },
      { tipo: 'opciones', enunciado: '<p>Mezclas 10 mol de hidrógeno con 2 mol de oxígeno: 2H₂ + O₂ → 2H₂O. ¿Cuál es el reactivo limitante?</p>',
        opciones: ['El hidrógeno', 'El oxígeno', 'Ninguno: los dos se gastan completos'], correcta: 1,
        pista: '<p>¿Cuánto hidrógeno necesitan 2 mol de oxígeno?</p>',
        solucion: '<p>El <strong>oxígeno</strong>: 2 mol de O₂ solo necesitan 4 mol de H₂, y tienes 10. Sobran 6 mol de hidrógeno.</p>' },
      { tipo: 'numero', enunciado: '<p>En N₂ + 3H₂ → 2NH₃ mezclas 2 mol de N₂ con 3 mol de H₂. ¿Cuántos moles de amoniaco se forman?</p>', respuesta: 3 * 2 / 3,
        pista: '<p>Los 2 mol de N₂ necesitarían 6 mol de H₂. ¿Los tienes? Calcula el producto con el limitante.</p>',
        solucion: '<p>No alcanza el hidrógeno: es el limitante. 3 mol de H₂ dan 3 × 2/3 = <strong>2 mol de NH₃</strong>, y sobra 1 mol de N₂.</p>' },
      { tipo: 'numero', enunciado: '<p>Debían salir 50 g de producto y obtuviste 45 g. ¿Cuál es el rendimiento, en porcentaje?</p>', respuesta: 45 / 50 * 100,
        pista: '<p>Divide lo que obtuviste entre lo que debía salir y multiplica por 100.</p>',
        solucion: '<p>45 ÷ 50 × 100 = <strong>90%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una reacción debería dar 50 g de producto y su rendimiento es del 80%. ¿Cuántos gramos obtienes?</p>', respuesta: 50 * 80 / 100,
        pista: '<p>Calcula el 80% de 50.</p>',
        solucion: '<p>50 × 0.80 = <strong>40 g</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué el rendimiento de una reacción casi nunca llega al 100%?</p>',
        opciones: ['Porque parte del producto se pierde y no todo reacciona como se esperaba', 'Porque en las reacciones la masa no se conserva', 'Porque el reactivo limitante se multiplica'], correcta: 0,
        pista: '<p>Piensa en lo que se queda pegado en los frascos.</p>',
        solucion: '<p>Porque <strong>se pierde algo de producto</strong> y no todo reacciona como se esperaba. La masa sí se conserva, pero no todo termina en el frasco.</p>' },
    ],
    fuentes: [
      OSC('4-4-reaction-yields', 'Reaction Yields'),
      WIKI('Reactivo_limitante', 'Reactivo limitante'),
      WIKI('Rendimiento_químico', 'Rendimiento químico'),
      KHAN('chemical-reactions-stoichiome/limiting-reagent-stoichiometry', 'Reactivo limitante'),
      PHET('reactants-products-and-leftovers', 'Reactivos, productos y sobrantes'),
    ],
  });
})();
