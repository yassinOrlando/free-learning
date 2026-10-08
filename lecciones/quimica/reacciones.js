// Química · Unidad 6: Reacciones químicas.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
(function () {
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

  // ------------------------------------------------------------------
  const agua = (x, y) => [...atomo(x, y, 'O'), ...atomo(x - 0.45, y - 0.3, 'H'), ...atomo(x + 0.45, y - 0.3, 'H')];
  const PARTICULAS = diagrama([-0.6, 6.6], [-1.4, 2], [
    ...atomo(0, 1.4, 'H'), ...atomo(0.5, 1.4, 'H'), ...atomo(0, 0.4, 'H'), ...atomo(0.5, 0.4, 'H'),
    txt(1.3, 0.9, '+'),
    ...atomo(2, 0.9, 'O'), ...atomo(2.5, 0.9, 'O'),
    ...flecha([3.2, 0.9], [4.4, 0.9]),
    ...agua(5.5, 1.5), ...agua(5.5, 0.5),
    txt(0.25, -0.35, '2 H₂'), txt(2.25, -0.35, 'O₂'), txt(5.5, -0.35, '2 H₂O'),
    txt(1.25, -1, '4 H y 2 O'), txt(5.5, -1, '4 H y 2 O'),
  ], 'La ecuación 2H₂ + O₂ → 2H₂O dibujada con bolitas rotuladas. A la izquierda, dos moléculas de hidrógeno, cada una con dos bolitas H, más una molécula de oxígeno con dos bolitas O. Debajo dice: 4 H y 2 O. Una flecha apunta a la derecha, a dos moléculas de agua, cada una con una bolita O y dos bolitas H. Debajo dice también: 4 H y 2 O.');

  L('Ecuaciones químicas', {
    objetivo: 'Leer una ecuación química, distinguir reactivos y productos, y contar los átomos de cada lado.',
    explicacion: `
      <p>Una receta dice algo como "2 tazas de harina + 1 huevo → 1 pastel". En una línea te cuenta qué entra, qué sale y cuánto de cada cosa. Los químicos escriben las reacciones de la misma forma.</p>
      <h3>La receta de una reacción</h3>
      <p>Una <strong>ecuación química</strong> es la forma de escribir una reacción con fórmulas y símbolos. Por ejemplo, cuando el hidrógeno arde, se junta con el oxígeno y forma agua:</p>
      <p>2H₂ + O₂ → 2H₂O</p>
      <p>Se lee "dos moléculas de hidrógeno más una de oxígeno dan dos moléculas de agua". La flecha quiere decir "se convierten en" o "dan".</p>
      <p>Lo que está a la izquierda de la flecha son los <strong>reactivos</strong>: las sustancias que tienes al principio y que van a reaccionar. Lo que está a la derecha son los <strong>productos</strong>: las sustancias nuevas que se forman. En la receta, la harina y el huevo serían los reactivos, y el pastel, el producto.</p>
      <h3>Los otros símbolos</h3>
      <ul>
        <li>El signo + separa una sustancia de otra del mismo lado, y se lee "y además".</li>
        <li>A veces, junto a cada fórmula, va su estado entre paréntesis: (s) para sólido, (l) para líquido, (g) para gas y (ac) para algo disuelto en agua.</li>
      </ul>
      <p>Por ejemplo, Zn(s) + 2HCl(ac) → ZnCl₂(ac) + H₂(g) dice que un trozo de zinc sólido, metido en ácido clorhídrico disuelto en agua, forma una sal disuelta y burbujas de hidrógeno.</p>
      <h3>Dos clases de números</h3>
      <p>En una ecuación hay números pequeños abajo y números grandes adelante, y no significan lo mismo.</p>
      <p>El subíndice, el número pequeño de abajo, ya lo conoces: dice cuántos átomos hay dentro de una molécula. H₂O tiene 2 hidrógenos y 1 oxígeno. Solo afecta al átomo que tiene a su izquierda.</p>
      <p>El número grande de adelante se llama coeficiente, y dice cuántas moléculas completas hay. 2H₂O quiere decir dos moléculas de agua. El coeficiente multiplica a toda la fórmula. Si no hay coeficiente, vale 1.</p>
      <p>Para contar los átomos de un elemento, multiplica el coeficiente por el subíndice. En 2H₂O hay 2 × 2 = 4 hidrógenos y 2 × 1 = 2 oxígenos.</p>
      ${PARTICULAS}
      <p>Fíjate en el dibujo: de los dos lados hay 4 hidrógenos y 2 oxígenos. No es casualidad. En la Unidad 1 viste que en un cambio químico la masa se conserva, porque los átomos no se crean ni se destruyen: solo se reacomodan. Por eso una ecuación bien escrita tiene los mismos átomos de cada lado.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que el coeficiente solo afecta al primer átomo. En 3CO₂, el 3 multiplica todo: hay 3 carbonos y 6 oxígenos.</p>`,
    ejemplo: `
      <p>En la estufa, el gas metano arde así: CH₄ + 2O₂ → CO₂ + 2H₂O. Comprueba que haya los mismos átomos de cada lado.</p>
      <ol class="pasos-ej">
        <li>Primero identifica las partes: los reactivos son el metano y el oxígeno; los productos, el dióxido de carbono y el agua.</li>
        <li>Cuenta los reactivos. CH₄ no tiene coeficiente, así que vale 1: 1 carbono y 4 hidrógenos. 2O₂ tiene 2 × 2 = 4 oxígenos.</li>
        <li>Cuenta los productos. CO₂ tiene 1 carbono y 2 oxígenos. 2H₂O tiene 2 × 2 = 4 hidrógenos y 2 × 1 = 2 oxígenos.</li>
        <li>Suma los oxígenos de los productos, porque aparecen en dos sustancias: 2 + 2 = 4.</li>
        <li>Compara: carbono 1 y 1, hidrógeno 4 y 4, oxígeno 4 y 4.</li>
      </ol>
      <p>Resultado: <span class="resultado">los dos lados tienen 1 C, 4 H y 4 O</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar sumar los átomos de un elemento que aparece en dos productos, como el oxígeno aquí.</p>`,
    vidaReal: `
      <p>Escribir lo que pasa en una reacción, como si fuera una receta, sirve para muchas cosas:</p>
      <ul>
        <li>Las fábricas de medicinas saben qué ingredientes mezclar y qué van a obtener.</li>
        <li>Los mecánicos entienden qué gases salen del escape de un coche.</li>
        <li>Los panaderos pueden explicar por qué la levadura infla el pan.</li>
        <li>Puedes entender las etiquetas de seguridad de los productos de limpieza.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Cuántos átomos de hidrógeno hay en 3H₂O?</p>', respuesta: 3 * 2,
        pista: '<p>Multiplica el coeficiente por el subíndice del hidrógeno.</p>',
        solucion: '<p>3 × 2 = <strong>6 hidrógenos</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>En la ecuación Zn + 2HCl → ZnCl₂ + H₂, ¿cuáles son los reactivos?</p>',
        opciones: ['Zn y HCl', 'ZnCl₂ y H₂', 'Zn y H₂'], correcta: 0,
        pista: '<p>Los reactivos están a la izquierda de la flecha.</p>',
        solucion: '<p>El <strong>zinc y el ácido clorhídrico</strong>, que están antes de la flecha. ZnCl₂ y H₂ son los productos.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos átomos de oxígeno hay en 2CO₂?</p>', respuesta: 2 * 2,
        pista: '<p>El coeficiente multiplica a toda la fórmula.</p>',
        solucion: '<p>2 × 2 = <strong>4 oxígenos</strong>, además de 2 carbonos.</p>' },
      { tipo: 'opciones', enunciado: '<p>En una ecuación, ¿qué significa (ac) junto a una fórmula, como en NaCl(ac)?</p>',
        opciones: ['Que es un ácido', 'Que está en estado sólido', 'Que está disuelto en agua'], correcta: 2,
        pista: '<p>Viene de "acuoso", que tiene que ver con el agua.</p>',
        solucion: '<p>Que está <strong>disuelto en agua</strong>. NaCl(ac) es sal disuelta, no un ácido.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántos átomos en total hay en 4NH₃?</p>', respuesta: 4 * (1 + 3),
        pista: '<p>Primero cuenta los átomos de una molécula de NH₃ y luego multiplica por el coeficiente.</p>',
        solucion: '<p>Cada NH₃ tiene 1 + 3 = 4 átomos, y hay 4 moléculas: 4 × 4 = <strong>16 átomos</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Al calentar la piedra caliza pasa esto: CaCO₃ → CaO + CO₂. ¿Cuál de estas sustancias es un producto?</p>',
        opciones: ['CaCO₃', 'CO₂', 'O₂'], correcta: 1,
        pista: '<p>Los productos están a la derecha de la flecha.</p>',
        solucion: '<p>El <strong>CO₂</strong>, junto con el CaO. El CaCO₃ es el reactivo, y el O₂ no aparece en la ecuación.</p>' },
    ],
    fuentes: [
      OSC('4-1-writing-and-balancing-chemical-equations', 'Writing and Balancing Chemical Equations'),
      WIKI('Ecuación_química', 'Ecuación química'),
      WIKI('Reacción_química', 'Reacción química'),
      PHET('reactants-products-and-leftovers', 'Reactivos, productos y sobrantes'),
    ],
  });

  // ------------------------------------------------------------------
  L('Balanceo por tanteo', {
    objetivo: 'Balancear ecuaciones químicas sencillas cambiando los coeficientes, y comprobar que haya los mismos átomos de cada lado.',
    explicacion: `
      <p>Imagina una báscula de dos platos. Si de un lado pones 4 canicas, del otro tienes que poner 4 para que quede pareja. En una ecuación química pasa lo mismo con los átomos: los que entran tienen que ser los mismos que salen.</p>
      <h3>¿Qué es balancear?</h3>
      <p>Una <strong>ecuación balanceada</strong> es la que tiene el mismo número de átomos de cada elemento a los dos lados de la flecha. Tiene que ser así porque, como viste en la Unidad 1, los átomos no aparecen ni desaparecen en una reacción.</p>
      <p>Muchas veces, al escribir las fórmulas, la ecuación no queda pareja. Si escribes H₂ + O₂ → H₂O, a la izquierda hay 2 oxígenos y a la derecha solo 1. Para arreglarlo cambias los <strong>coeficientes</strong>, los números grandes que van delante de cada fórmula y dicen cuántas moléculas hay.</p>
      <h3>La regla de oro</h3>
      <p>Solo puedes cambiar coeficientes, nunca subíndices. ¿Por qué? Porque el subíndice dice qué sustancia es. Si al H₂O le cambias el subíndice del oxígeno y escribes H₂O₂, ya no es agua: es agua oxigenada, otra sustancia. El coeficiente, en cambio, solo dice cuántas moléculas de agua hay.</p>
      <h3>Probar y corregir</h3>
      <p>El método más sencillo es el <strong>balanceo por tanteo</strong>: pruebas un coeficiente, cuentas, y corriges hasta que todo cuadre. Para no dar vueltas, conviene seguir este orden:</p>
      <ol>
        <li>Primero los metales.</li>
        <li>Después los no metales, menos el hidrógeno y el oxígeno.</li>
        <li>Luego el hidrógeno.</li>
        <li>Al final el oxígeno, que suele aparecer en varias sustancias.</li>
        <li>Por último, cuenta todo otra vez para comprobar.</li>
      </ol>
      <p>Mira cómo queda la combustión del metano. Sin balancear es CH₄ + O₂ → CO₂ + H₂O. El carbono ya está parejo: 1 y 1. Hay 4 hidrógenos a la izquierda y 2 a la derecha, así que pones un 2 delante del agua: 2H₂O. Ahora a la derecha hay 2 + 2 = 4 oxígenos, así que pones un 2 delante del O₂.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Elemento</th><th>Antes: izquierda</th><th>Antes: derecha</th><th>Balanceada: izquierda</th><th>Balanceada: derecha</th></tr>
        <tr><th>C</th><td>1</td><td>1</td><td>1</td><td>1</td></tr>
        <tr><th>H</th><td>4</td><td>2</td><td>4</td><td>4</td></tr>
        <tr><th>O</th><td>2</td><td>3</td><td>4</td><td>4</td></tr>
      </table></div>
      <p>La ecuación balanceada es CH₄ + 2O₂ → CO₂ + 2H₂O. Hacer una tablita así, elemento por elemento, es la forma más segura de no equivocarte.</p>
      <p>Si al final todos los coeficientes se pueden dividir entre el mismo número, divídelos. Siempre se usan los enteros más pequeños posibles.</p>
      <p class="nota"><strong>Trampa común:</strong> arreglar un elemento y olvidar que eso cambió otro. Cada vez que pongas un coeficiente, vuelve a contar todos los átomos de esa fórmula.</p>`,
    ejemplo: `
      <p>Balancea la formación de la herrumbre: Fe + O₂ → Fe₂O₃.</p>
      <ol class="pasos-ej">
        <li>Empieza por el metal: a la derecha hay 2 hierros y a la izquierda 1. Por ahora pon un 2 delante del Fe.</li>
        <li>Sigue con el oxígeno: a la izquierda viene de 2 en 2 y a la derecha de 3 en 3. El número más pequeño al que llegan los dos es 6. Para tener 6 oxígenos, pon 3O₂ a la izquierda y 2Fe₂O₃ a la derecha.</li>
        <li>Al poner 2Fe₂O₃ cambiaron los hierros de la derecha: ahora son 2 × 2 = 4. Corrige la izquierda: 4Fe.</li>
        <li>Comprueba con la tabla: hierro 4 y 4, oxígeno 6 y 6.</li>
      </ol>
      <p>Resultado: <span class="resultado">4Fe + 3O₂ → 2Fe₂O₃</span>.</p>
      <p class="nota"><strong>Error común:</strong> escribir Fe + O₃ → FeO₃ para que "cuadre". Eso cambia los subíndices y las sustancias: el oxígeno del aire es O₂ y la herrumbre es Fe₂O₃.</p>`,
    vidaReal: `
      <p>Que lo que entra en una reacción sea igual a lo que sale tiene consecuencias prácticas:</p>
      <ul>
        <li>Las fábricas calculan cuánta materia prima necesitan para no desperdiciar nada.</li>
        <li>Los ingenieros saben cuánto aire necesita un motor para quemar bien la gasolina.</li>
        <li>Sirve para calcular cuánto gas contaminante sale al quemar combustible.</li>
        <li>Es la misma lógica que revisar que una receta para el doble de personas lleve el doble de todo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Qué coeficiente va delante del H₂ para balancear N₂ + __H₂ → 2NH₃?</p>', respuesta: 3,
        pista: '<p>Cuenta los hidrógenos de la derecha: 2 × 3. ¿Cuántas moléculas de H₂ hacen falta para tenerlos?</p>',
        solucion: '<p>A la derecha hay 2 × 3 = 6 hidrógenos, y cada H₂ aporta 2: hacen falta <strong>3</strong>. N₂ + 3H₂ → 2NH₃.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Qué coeficiente va delante del H₂O para balancear 2H₂ + O₂ → __H₂O?</p>', respuesta: 2,
        pista: '<p>A la izquierda hay 2 oxígenos y 4 hidrógenos.</p>',
        solucion: '<p>Con <strong>2</strong>H₂O hay 2 oxígenos y 4 hidrógenos, igual que a la izquierda.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Por qué al balancear no se pueden cambiar los subíndices?</p>',
        opciones: ['Porque los subíndices siempre deben ser 1', 'Porque cambiaría la masa de cada átomo', 'Porque se volvería otra sustancia: H₂O₂ ya no es agua'], correcta: 2,
        pista: '<p>¿Qué dice el subíndice de una fórmula?</p>',
        solucion: '<p>Porque el subíndice dice qué sustancia es: <strong>cambiarlo da otra sustancia</strong>. H₂O₂ es agua oxigenada, no agua.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Qué coeficiente va delante del Na para balancear __Na + Cl₂ → 2NaCl?</p>', respuesta: 2,
        pista: '<p>Cuenta los sodios de la derecha.</p>',
        solucion: '<p>A la derecha hay 2 sodios, así que van <strong>2</strong>: 2Na + Cl₂ → 2NaCl.</p>' },
      { tipo: 'numero', enunciado: '<p>El gas de los tanques de cocina, el propano, arde así: C₃H₈ + __O₂ → 3CO₂ + 4H₂O. ¿Qué coeficiente va delante del O₂?</p>', respuesta: (3 * 2 + 4 * 1) / 2,
        pista: '<p>Cuenta los oxígenos de la derecha: los del CO₂ más los del agua. Cada O₂ aporta 2.</p>',
        solucion: '<p>A la derecha hay 3 × 2 + 4 × 1 = 10 oxígenos. Cada O₂ aporta 2, así que hacen falta <strong>5</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas ecuaciones está balanceada?</p>',
        opciones: ['H₂ + O₂ → H₂O', '2H₂ + O₂ → 2H₂O', 'H₂ + O₂ → 2H₂O'], correcta: 1,
        pista: '<p>Cuenta los hidrógenos y los oxígenos de cada lado en cada opción.</p>',
        solucion: '<p><strong>2H₂ + O₂ → 2H₂O</strong>: 4 hidrógenos y 2 oxígenos de cada lado. En las otras, el hidrógeno o el oxígeno no cuadran.</p>' },
    ],
    fuentes: [
      OSC('4-1-writing-and-balancing-chemical-equations', 'Writing and Balancing Chemical Equations'),
      KHAN('chemical-reactions-stoichiome/balancing-chemical-equations', 'Balanceo de ecuaciones químicas'),
      WIKI('Ecuación_química', 'Ecuación química'),
      PHET('balancing-chemical-equations', 'Balanceo de ecuaciones químicas'),
    ],
  });

  // ------------------------------------------------------------------
  // Una fila del diagrama de patrones: grupos de letras (moléculas), '+' y '→'.
  const fila = (y, partes, titulo) => {
    let x = 0;
    const figuras = [txt(-1.9, y, titulo)];
    partes.forEach((p) => {
      if (p === '+') { figuras.push(txt(x + 0.1, y, '+')); x += 0.6; }
      else if (p === '→') { figuras.push(...flecha([x, y], [x + 0.8, y])); x += 1.2; }
      else { [...p].forEach((letra, i) => figuras.push(...atomo(x + 0.27 + 0.5 * i, y, letra))); x += 0.54 + 0.5 * (p.length - 1) + 0.4; }
    });
    return figuras;
  };
  const PATRONES = diagrama([-3.9, 8], [-0.6, 4.6], [
    ...fila(4, ['A', '+', 'B', '→', 'AB'], 'síntesis'),
    ...fila(2.7, ['AB', '→', 'A', '+', 'B'], 'descomposición'),
    ...fila(1.4, ['A', '+', 'BC', '→', 'AC', '+', 'B'], 'sustitución simple'),
    ...fila(0.1, ['AB', '+', 'CD', '→', 'AD', '+', 'CB'], 'sustitución doble'),
  ], 'Cuatro patrones de reacción, dibujados con bolitas rotuladas con letras; dos bolitas pegadas son un compuesto. Síntesis: A más B da AB. Descomposición: AB da A más B. Sustitución simple: A más BC da AC más B; A toma el lugar de B. Sustitución doble: AB más CD da AD más CB; las dos parejas intercambian compañeros.');

  L('Tipos de reacciones', {
    objetivo: 'Reconocer las reacciones de síntesis, descomposición, sustitución y combustión por la forma de su ecuación.',
    explicacion: `
      <p>Piensa en un baile. A veces dos personas sueltas se juntan en pareja. A veces una pareja se separa. A veces alguien llega y le quita la pareja a otro, y a veces dos parejas intercambian compañeros. Los átomos hacen movimientos muy parecidos, y reconocerlos te ayuda a predecir qué va a salir de una reacción.</p>
      ${PATRONES}
      <h3>Juntarse y separarse</h3>
      <p>En una reacción de <strong>síntesis</strong>, dos o más sustancias se juntan y forman una sola. "Síntesis" quiere decir unir. Así se fabrica el amoniaco para los fertilizantes: N₂ + 3H₂ → 2NH₃. Fíjate en la forma: varias cosas a la izquierda y una sola a la derecha.</p>
      <p>La <strong>descomposición</strong> es lo contrario: una sustancia se rompe en dos o más. Casi siempre hace falta calor, luz o electricidad. Al calentar la piedra caliza se obtiene la cal: CaCO₃ → CaO + CO₂. Y el agua oxigenada que burbujea sobre una herida se está descomponiendo: 2H₂O₂ → 2H₂O + O₂. Aquí la forma es una sola cosa a la izquierda y varias a la derecha.</p>
      <h3>Cambiar de pareja</h3>
      <p>En las sustituciones, alguien toma el lugar de otro:</p>
      <div class="tabla-wrap"><table>
        <tr><th>Tipo</th><th>Patrón</th><th>Ejemplo</th></tr>
        <tr><th>Sustitución simple</th><td>A + BC → AC + B</td><td>Zn + 2HCl → ZnCl₂ + H₂</td></tr>
        <tr><th>Sustitución doble</th><td>AB + CD → AD + CB</td><td>AgNO₃ + NaCl → AgCl + NaNO₃</td></tr>
      </table></div>
      <p>En la sustitución simple, un elemento suelto desplaza a otro de su compuesto: el zinc le quita el cloro al hidrógeno, y el hidrógeno queda libre como gas. En la sustitución doble, dos compuestos intercambian compañeros. La neutralización que viste en la lección de sales, HCl + NaOH → NaCl + H₂O, es una sustitución doble.</p>
      <h3>Arder</h3>
      <p>Una <strong>combustión</strong> es una reacción rápida de una sustancia con oxígeno que suelta calor y, casi siempre, luz. Cuando lo que arde tiene carbono e hidrógeno, como el gas, la gasolina o la cera de una vela, los productos son dióxido de carbono y agua. El gas de la estufa arde así: CH₄ + 2O₂ → CO₂ + 2H₂O.</p>
      <p>Para reconocer una combustión, busca O₂ entre los reactivos. Si lo que arde tiene carbono e hidrógeno, busca además CO₂ y H₂O entre los productos. Si falta oxígeno, se forma también monóxido de carbono, el gas venenoso que viste en la lección de óxidos.</p>
      <p>Para clasificar cualquier reacción, cuenta cuántas sustancias hay de cada lado y fíjate quién termina con quién. Esa forma es la que delata el tipo.</p>
      <p class="nota"><strong>Trampa común:</strong> clasificar por cuántas fórmulas hay sin mirar quién se junta con quién. Zn + 2HCl → ZnCl₂ + H₂ tiene dos sustancias de cada lado, igual que una sustitución doble, pero el zinc entra solo: es simple.</p>`,
    ejemplo: `
      <p>¿Qué tipo de reacción es la de una vela encendida? La cera es una mezcla de sustancias con carbono e hidrógeno. ¿Qué productos se forman?</p>
      <ol class="pasos-ej">
        <li>Fíjate en lo que necesita la vela para arder: si la tapas con un vaso, se apaga, porque se acaba el oxígeno. Entonces el O₂ es un reactivo.</li>
        <li>Mira lo que suelta: calor y luz, y lo hace rápido. Una reacción rápida con oxígeno que suelta calor y luz es una combustión.</li>
        <li>Como la cera tiene carbono e hidrógeno, el carbono termina en CO₂ y el hidrógeno en H₂O.</li>
        <li>Comprueba el agua: si sostienes un vaso frío sobre la flama unos segundos, se empaña con gotitas.</li>
      </ol>
      <p>Resultado: <span class="resultado">es una combustión y forma dióxido de carbono y agua</span>.</p>
      <p class="nota"><strong>Error común:</strong> decir que la cera "desaparece". No desaparece: se convierte en gases que se van al aire.</p>`,
    vidaReal: `
      <p>Saber qué tipo de cambio ocurre te ayuda a entender lo que pasa a tu alrededor:</p>
      <ul>
        <li>La estufa, el boiler y el motor del coche funcionan quemando un combustible.</li>
        <li>El agua oxigenada hace espuma en una herida porque se rompe en agua y en un gas.</li>
        <li>Los fertilizantes que alimentan los cultivos se fabrican con el nitrógeno del aire.</li>
        <li>Nunca hay que usar un anafre en un cuarto cerrado, porque sin aire suficiente suelta un gas venenoso.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Qué tipo de reacción es 2Na + Cl₂ → 2NaCl?</p>',
        opciones: ['Descomposición', 'Sustitución doble', 'Combustión', 'Síntesis'], correcta: 3,
        pista: '<p>¿Cuántas sustancias distintas hay a cada lado?</p>',
        solucion: '<p><strong>Síntesis</strong>: el sodio y el cloro se juntan en una sola sustancia, la sal.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué tipo de reacción es CaCO₃ → CaO + CO₂?</p>',
        opciones: ['Síntesis', 'Sustitución simple', 'Descomposición'], correcta: 2,
        pista: '<p>Una sola sustancia a la izquierda, dos a la derecha.</p>',
        solucion: '<p><strong>Descomposición</strong>: la caliza se rompe en cal y dióxido de carbono.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué tipo de reacción es Zn + 2HCl → ZnCl₂ + H₂?</p>',
        opciones: ['Sustitución simple', 'Sustitución doble', 'Síntesis'], correcta: 0,
        pista: '<p>Un elemento entra solo y otro sale solo.</p>',
        solucion: '<p><strong>Sustitución simple</strong>: el zinc toma el lugar del hidrógeno, que sale libre.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué tipo de reacción es la neutralización HCl + NaOH → NaCl + H₂O?</p>',
        opciones: ['Combustión', 'Descomposición', 'Sustitución doble'], correcta: 2,
        pista: '<p>Dos compuestos intercambian compañeros.</p>',
        solucion: '<p><strong>Sustitución doble</strong>: el H del ácido se va con el OH, y el Na con el Cl.</p>' },
      { tipo: 'opciones', enunciado: '<p>Cuando se quema un combustible que tiene carbono e hidrógeno, con suficiente oxígeno, ¿qué productos se forman?</p>',
        opciones: ['Dióxido de carbono y agua', 'Oxígeno e hidrógeno', 'Solo humo, sin sustancias nuevas'], correcta: 0,
        pista: '<p>El carbono termina con oxígeno, y el hidrógeno también.</p>',
        solucion: '<p><strong>Dióxido de carbono y agua.</strong> Es lo que pasa en la estufa, en el motor y en una vela.</p>' },
      { tipo: 'numero', enunciado: '<p>En la descomposición del agua oxigenada, 2H₂O₂ → 2H₂O + O₂, ¿cuántos productos distintos se forman?</p>', respuesta: 2,
        pista: '<p>Cuenta las fórmulas distintas a la derecha de la flecha, no los coeficientes.</p>',
        solucion: '<p>Se forman <strong>2</strong>: agua y oxígeno. Ese oxígeno es la espuma que ves en una herida.</p>' },
    ],
    fuentes: [
      OSC('4-2-classifying-chemical-reactions', 'Classifying Chemical Reactions'),
      WIKI('Reacción_química', 'Reacción química'),
      WIKI('Combustión', 'Combustión'),
      KHAN('chemical-reactions-stoichiome', 'Reacciones químicas y estequiometría'),
    ],
  });

  // ------------------------------------------------------------------
  const ZINC_COBRE = diagrama([-0.8, 8.6], [-1.2, 1.8], [
    txt(0, 1.2, 'Zn'), ...flecha([0.6, 1.2], [2.2, 1.2]), txt(2.9, 1.2, 'Zn²⁺'), txt(6.2, 1.2, 'pierde 2 e⁻: se oxida'),
    txt(0, -0.6, 'Cu²⁺'), ...flecha([0.6, -0.6], [2.2, -0.6]), txt(2.9, -0.6, 'Cu'), txt(6.2, -0.6, 'gana 2 e⁻: se reduce'),
    ...flecha([1.4, 0.95], [1.4, -0.3]), txt(2.1, 0.3, '2 e⁻'),
  ], 'Dos filas. Arriba: un átomo de zinc, Zn, se convierte en el ion Zn²⁺; pierde 2 electrones y se oxida. Abajo: el ion de cobre, Cu²⁺, se convierte en un átomo de cobre, Cu; gana 2 electrones y se reduce. Una flecha vertical rotulada "2 e⁻" va de la fila del zinc a la del cobre: los electrones que pierde el zinc son los que gana el cobre.');

  L('Oxidación y reducción', {
    objetivo: 'Reconocer en una reacción qué se oxida y qué se reduce, usando los electrones y los números de oxidación.',
    explicacion: `
      <p>Una manzana partida se pone café. Un clavo se cubre de herrumbre. La pila de tu control remoto da corriente. Parecen cosas sin relación, pero en las tres está pasando lo mismo: unos átomos le pasan electrones a otros.</p>
      <h3>Perder y ganar electrones</h3>
      <p>Cuando un átomo pierde electrones, se dice que se oxida. A ese cambio se le llama <strong>oxidación</strong>. El nombre viene del oxígeno, porque el ejemplo más conocido es el del hierro, que le entrega electrones al oxígeno del aire. Pero no siempre hace falta oxígeno: cualquier pérdida de electrones es una oxidación.</p>
      <p>Cuando un átomo gana electrones, se dice que se reduce. A ese cambio se le llama <strong>reducción</strong>. Parece raro que "ganar" se llame "reducir", pero tiene sentido si miras la carga: al ganar electrones, que son negativos, el número de oxidación baja. Se reduce.</p>
      <p>Para no confundirlos, recuerda esta frase: "Oxidación Pierde, Reducción Gana".</p>
      <h3>Siempre van juntas</h3>
      <p>Los electrones no se pierden en el aire: si un átomo los suelta, otro los recoge. Por eso la oxidación y la reducción siempre ocurren a la vez. A una reacción en la que unos átomos pasan electrones a otros se le llama <strong>reacción redox</strong>, de "reducción" y "oxidación".</p>
      ${ZINC_COBRE}
      <p>Al que se oxida y le da los electrones a otro se le llama agente reductor, porque hace que el otro se reduzca. Al que se reduce se le llama agente oxidante. En el dibujo, el zinc es el reductor y el cobre, el oxidante.</p>
      <h3>Seguir la pista con números</h3>
      <p>No siempre se ven los electrones, pero los números de oxidación de la Unidad 5 los delatan. Hace falta una regla más: un elemento solo, sin combinar, como el Fe de un clavo o el O₂ del aire, tiene número de oxidación 0, porque no ha ganado ni perdido nada.</p>
      <ul>
        <li>Si el número de oxidación de un átomo sube, perdió electrones: se oxidó.</li>
        <li>Si baja, ganó electrones: se redujo.</li>
      </ul>
      <p>Mira la herrumbre: 4Fe + 3O₂ → 2Fe₂O₃. El hierro empieza en 0 y termina en +3: se oxidó. El oxígeno empieza en 0 y termina en −2: se redujo.</p>
      <p>Las combustiones también son redox: el combustible se oxida y el oxígeno se reduce. Hasta tu cuerpo funciona así: al respirar, oxidas el azúcar de la comida para sacar energía.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que "reducción" quiere decir perder algo. En química, reducirse es ganar electrones; lo que se reduce es el número de oxidación.</p>`,
    ejemplo: `
      <p>Si metes una lámina de zinc en una disolución azul de sulfato de cobre, la lámina se cubre de cobre rojizo: Zn + CuSO₄ → ZnSO₄ + Cu. ¿Quién se oxida y quién se reduce?</p>
      <ol class="pasos-ej">
        <li>Primero busca el número de oxidación del zinc. Al principio está solo: 0. En el ZnSO₄ forma el ion Zn²⁺: +2.</li>
        <li>Pasó de 0 a +2: subió, así que perdió 2 electrones. El zinc se oxidó.</li>
        <li>Ahora el cobre. En el CuSO₄ es el ion Cu²⁺: +2. Al final queda solo, como metal: 0.</li>
        <li>Pasó de +2 a 0: bajó, así que ganó 2 electrones. El cobre se redujo.</li>
        <li>Comprueba que cuadre: el zinc pierde 2 electrones y el cobre gana 2. Son los mismos.</li>
      </ol>
      <p>Resultado: <span class="resultado">el zinc se oxida y el cobre se reduce</span>. El sulfato, SO₄²⁻, no cambia: solo acompaña.</p>
      <p class="nota"><strong>Error común:</strong> pensar que el cobre se oxidó porque "apareció". Apareció porque ganó electrones: se redujo.</p>`,
    vidaReal: `
      <p>El paso de electrones de unos átomos a otros explica cosas que ves seguido:</p>
      <ul>
        <li>La manzana o el aguacate partidos se ponen cafés al contacto con el aire.</li>
        <li>Las pilas y las baterías de tu celular dan corriente gracias a eso.</li>
        <li>Las rejas se pintan para que el aire húmedo no las eche a perder.</li>
        <li>Tu cuerpo obtiene energía de la comida con una reacción de este tipo.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>¿Qué número de oxidación tiene el hierro en la herrumbre, Fe₂O₃?</p>', respuesta: 3,
        pista: '<p>El oxígeno tiene −2 y todo suma cero: 2 × hierro + 3 × (−2) = 0.</p>',
        solucion: '<p>2 × hierro = 6, así que el hierro tiene <strong>+3</strong>. Empezó en 0, así que se oxidó.</p>' },
      { tipo: 'opciones', enunciado: '<p>En 2Mg + O₂ → 2MgO, ¿qué se oxida?</p>',
        opciones: ['El oxígeno', 'El magnesio', 'Ninguno de los dos'], correcta: 1,
        pista: '<p>El magnesio pasa de 0 a +2. ¿Sube o baja?</p>',
        solucion: '<p>El <strong>magnesio</strong>: pasa de 0 a +2, pierde 2 electrones. El oxígeno pasa de 0 a −2 y se reduce.</p>' },
      { tipo: 'numero', enunciado: '<p>Cuando un átomo de sodio se convierte en el ion Na⁺, ¿cuántos electrones pierde?</p>', respuesta: 1,
        pista: '<p>Su carga pasa de 0 a +1.</p>',
        solucion: '<p>Pierde <strong>1 electrón</strong>: se oxida.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cómo se llama el cambio en el que un átomo gana electrones?</p>',
        opciones: ['Reducción', 'Oxidación', 'Combustión'], correcta: 0,
        pista: '<p>"Oxidación Pierde, Reducción Gana".</p>',
        solucion: '<p><strong>Reducción</strong>: al ganar electrones, el número de oxidación baja.</p>' },
      { tipo: 'numero', enunciado: '<p>En la reacción del zinc con el sulfato de cobre, el zinc pasa de 0 a +2. ¿En cuánto sube su número de oxidación?</p>', respuesta: 2 - 0,
        pista: '<p>Resta el número inicial al final.</p>',
        solucion: '<p>Sube <strong>2</strong>, que son los 2 electrones que pierde.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Qué número de oxidación tiene el oxígeno en el O₂ del aire?</p>', respuesta: 0,
        pista: '<p>Está solo, sin combinar con otro elemento.</p>',
        solucion: '<p><strong>0</strong>. Un elemento sin combinar no ha ganado ni perdido electrones.</p>' },
    ],
    fuentes: [
      OSC('4-2-classifying-chemical-reactions', 'Classifying Chemical Reactions'),
      WIKI('Reducción-oxidación', 'Reducción-oxidación'),
      KHAN('oxidation-reduction', 'Oxidación y reducción'),
    ],
  });

  // ------------------------------------------------------------------
  const RAPIDEZ = G({ x: [0, 30], y: [0, 100], pasos: [5, 20], funciones: [
    { f: (t) => 100 * (1 - Math.exp(-0.2 * t)), etiqueta: 'a 30 °C', serie: 0 },
    { f: (t) => 100 * (1 - Math.exp(-0.1 * t)), etiqueta: 'a 20 °C', serie: 1 },
  ], puntos: [{ x: 10, y: 86.5, etiqueta: '30 °C: 86%' }, { x: 10, y: 63.2, etiqueta: '20 °C: 63%' }],
  descripcion: 'Gráfica del porcentaje de reactivo que ya se convirtió en producto, de 0 a 100%, contra el tiempo, de 0 a 30 minutos. Hay dos curvas que empiezan en 0 y suben cada vez más despacio hacia el 100%. La curva "a 30 °C" sube más rápido: a los 10 minutos va en 86%. La curva "a 20 °C" va en 63% a los 10 minutos, y llega a 86% hasta los 20 minutos.' });

  L('Velocidad de reacción', {
    objetivo: 'Explicar por qué unas reacciones son más rápidas que otras y cómo influyen la temperatura, la concentración, la superficie y los catalizadores.',
    explicacion: `
      <p>La leche dura una semana en el refrigerador, pero afuera se echa a perder en unas horas. Un clavo tarda meses en oxidarse, mientras que el gas de la estufa arde en un instante. Todas son reacciones químicas, pero unas son lentas y otras rapidísimas.</p>
      <h3>¿Qué tan rápido?</h3>
      <p>A qué tan rápido se gastan los reactivos o se forman los productos se le llama <strong>velocidad de reacción</strong>. Se calcula como cuánto cambió una cantidad entre el tiempo que tardó:</p>
      <p>velocidad = cantidad que cambió ÷ tiempo</p>
      <p>Si una pastilla efervescente suelta 30 mL de gas en 10 segundos, la velocidad es 30 ÷ 10 = 3 mL por segundo.</p>
      <h3>Chocar con fuerza</h3>
      <p>Para reaccionar, las partículas tienen que chocar. Pero no basta cualquier choque: tienen que pegarse con suficiente fuerza para romper sus enlaces. A esa energía mínima se le llama <strong>energía de activación</strong>. Es como el empujón que necesita un carrito para subir una lomita antes de rodar solo. Por eso el gas de la estufa no arde hasta que acercas el cerillo: el cerillo da el empujón inicial.</p>
      <p>Todo lo que haga que haya más choques, o choques más fuertes, acelera la reacción. Hay cuatro factores:</p>
      <ul>
        <li>La temperatura. Más calor hace que las partículas se muevan más rápido, choquen más y con más fuerza. En muchas reacciones comunes, una regla aproximada es que la velocidad se duplica por cada 10 °C más. Por eso el refrigerador conserva la comida.</li>
        <li>La concentración. Si hay más partículas en el mismo espacio, chocan más seguido. Una brasa casi apagada se aviva si le soplas, porque le llega aire fresco con más oxígeno que el que ya se gastó a su alrededor.</li>
        <li>La superficie. Solo reaccionan las partículas de la orilla. Si partes un sólido en pedacitos, queda más orilla expuesta. Las astillas prenden más rápido que un tronco, y una pastilla molida actúa antes que una entera.</li>
        <li>Los catalizadores. Un <strong>catalizador</strong> es una sustancia que acelera una reacción sin gastarse, porque le abre un camino con menos energía de activación. Tu cuerpo usa catalizadores llamados enzimas para digerir la comida, y los coches llevan uno en el escape, llamado convertidor catalítico, que transforma gases dañinos en otros menos dañinos.</li>
      </ul>
      ${RAPIDEZ}
      <p>La gráfica muestra la misma reacción a dos temperaturas. El eje horizontal es el tiempo, en minutos, y el vertical, qué porcentaje del reactivo ya se convirtió en producto. A 30 °C, a los 10 minutos ya se convirtió el 86%; a 20 °C, apenas el 63%. Eso encaja con la regla de duplicar: a 30 °C la reacción va al doble de rápido, así que llega en 10 minutos a lo que a 20 °C le toma 20. Fíjate también en que las dos curvas se van aplanando: al gastarse los reactivos, quedan menos partículas para chocar y la reacción se frena.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar que el catalizador es un reactivo más. Al final de la reacción queda igual que al principio y se puede volver a usar.</p>`,
    ejemplo: `
      <p>Una pastilla efervescente en agua a 20 °C suelta 30 mL de gas en 10 segundos. ¿Cuál es la velocidad? ¿Y qué esperas en agua a 30 °C?</p>
      <ol class="pasos-ej">
        <li>Usa la definición: velocidad = cantidad que cambió ÷ tiempo. La cantidad es el gas que salió, 30 mL, y el tiempo, 10 s.</li>
        <li>Divide: 30 ÷ 10 = 3 mL por segundo.</li>
        <li>Ahora el agua está 10 °C más caliente. Las partículas se mueven más rápido, chocan más seguido y con más fuerza.</li>
        <li>Con la regla aproximada, 10 °C más duplican la velocidad: 3 × 2 = 6 mL por segundo.</li>
        <li>Comprueba con lo que ya sabes: las pastillas efervescentes burbujean mucho más en agua tibia que en agua fría.</li>
      </ol>
      <p>Resultado: <span class="resultado">3 mL/s a 20 °C y unos 6 mL/s a 30 °C</span>.</p>
      <p class="nota"><strong>Error común:</strong> dividir el tiempo entre la cantidad, 10 ÷ 30. La velocidad dice cuánto cambia en cada segundo, así que la cantidad va arriba.</p>`,
    vidaReal: `
      <p>Controlar qué tan rápido pasa un cambio químico es parte de la vida diaria:</p>
      <ul>
        <li>El refrigerador hace que la comida tarde más en echarse a perder.</li>
        <li>La olla exprés cocina más rápido porque el agua adentro se calienta más de 100 °C.</li>
        <li>Para prender una fogata se empieza con ramitas y papel, no con troncos.</li>
        <li>Los detergentes con enzimas, unas sustancias que aceleran la limpieza de las manchas de comida, funcionan incluso en agua fría.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Por qué la comida dura más en el refrigerador?</p>',
        opciones: ['Porque a menor temperatura las reacciones son más lentas', 'Porque el frío mata todas las bacterias', 'Porque el refrigerador quita el oxígeno'], correcta: 0,
        pista: '<p>Piensa en cómo se mueven las partículas cuando hace frío.</p>',
        solucion: '<p>Porque <strong>a menor temperatura las reacciones son más lentas</strong>: las partículas se mueven menos y chocan menos y con menos fuerza.</p>' },
      { tipo: 'opciones', enunciado: '<p>Una pastilla de antiácido molida hace efecto más rápido que una entera. ¿Qué factor explica esto?</p>',
        opciones: ['La temperatura', 'Un catalizador', 'La superficie'], correcta: 2,
        pista: '<p>Al molerla, ¿qué aumenta?</p>',
        solucion: '<p><strong>La superficie</strong>: molida, queda mucha más orilla expuesta y reaccionan más partículas a la vez.</p>' },
      { tipo: 'numero', enunciado: '<p>Una reacción produce 60 mL de gas en 20 segundos. ¿Cuál es su velocidad, en mL por segundo?</p>', respuesta: 60 / 20,
        pista: '<p>Divide la cantidad entre el tiempo.</p>',
        solucion: '<p>60 ÷ 20 = <strong>3 mL por segundo</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es un catalizador?</p>',
        opciones: ['Un reactivo que se gasta por completo', 'Una sustancia que acelera la reacción y no se gasta', 'Una sustancia que siempre detiene la reacción'], correcta: 1,
        pista: '<p>Al final de la reacción queda igual que al principio.</p>',
        solucion: '<p>Es <strong>una sustancia que acelera la reacción sin gastarse</strong>, porque baja la energía de activación.</p>' },
      { tipo: 'numero', enunciado: '<p>A 20 °C, una reacción produce 5 mL de gas por minuto. Con la regla aproximada de que la velocidad se duplica cada 10 °C, ¿cuántos mL por minuto esperas a 30 °C?</p>', respuesta: 5 * 2,
        pista: '<p>¿Cuántas veces subiste 10 °C?</p>',
        solucion: '<p>Subiste 10 °C una vez, así que la velocidad se duplica: 5 × 2 = <strong>10 mL por minuto</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos ejemplos muestra el efecto de la concentración?</p>',
        opciones: ['La leche dura más en el refrigerador', 'Las astillas prenden más rápido que un tronco', 'Una brasa se aviva cuando le soplas más aire'], correcta: 2,
        pista: '<p>Busca el caso en el que hay más partículas de un reactivo en el mismo espacio.</p>',
        solucion: '<p><strong>La brasa que se aviva</strong>: al soplar llega más oxígeno, y los choques son más frecuentes. Los otros ejemplos son de temperatura y de superficie.</p>' },
    ],
    fuentes: [
      OSC('12-1-chemical-reaction-rates', 'Chemical Reaction Rates'),
      OSC('12-2-factors-affecting-reaction-rates', 'Factors Affecting Reaction Rates'),
      WIKI('Velocidad_de_reacción', 'Velocidad de reacción'),
      WIKI('Catalizador', 'Catalizador'),
      PHET('reactions-and-rates', 'Reacciones y tasas'),
    ],
  });
})();
