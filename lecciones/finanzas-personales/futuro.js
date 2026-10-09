// Finanzas personales · Unidad 9: Proteger tu futuro.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Sin consejos personalizados ni aseguradoras, administradoras, bancos o productos por su nombre.
// Leyes, edades, tasas y porcentajes van con su país, su año y "revisa el dato vigente en tu país".
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('finanzas-personales', titulo, datos);
  const txt = (x, y, texto) => ({ tipo: 'texto', x, y, texto });
  const diagrama = (x, y, figuras, descripcion) => G({ x, y, figuras, descripcion, proporcional: true, ejes: false });
  const caja = (x0, y0, x1, y1, relleno = false) => ({ tipo: 'poligono', puntos: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], relleno });

  const WIKI = (articulo, nombre) => ({ nombre: `Wikipedia: ${nombre}`, url: `https://es.wikipedia.org/wiki/${articulo}` });
  const FPT = (ruta, nombre) => ({ nombre: `Finanzas para todos (Banco de España y CNMV): ${nombre}`, url: `https://www.finanzasparatodos.es/${ruta}` });
  const REV = (ruta, nombre) => ({ nombre: `CONDUSEF (México), Revista Proteja su Dinero: ${nombre}`, url: `https://revista.condusef.gob.mx/${ruta}/` });
  const REV_GMM = REV('usuario-inteligente/sabias-que/2019/07/seguro-de-gastos-medicos-mayores', 'Seguro de gastos médicos mayores');
  const REV_BEF = REV('usuario-inteligente/buro-de-entidades-financieras/2023/05/consejos-del-bef-para-mama', 'Consejos del BEF para mamá');
  const REV_PENSION = REV('ahorro-general/retiro/2021/08/sabes-cuanto-dinero-recibiras-de-pension', '¿Sabes cuánto dinero recibirás de pensión?');
  const REV_AUTO = REV('usuario-inteligente/economia-joven/2024/08/cuanto-cuesta-tener-tu-primer-auto', '¿Cuánto cuesta tener tu primer auto?');
  const REV_HIPOTECA = REV('credito/hipotecario/2023/09/tu-primer-credito-hipotecario', '¿Tu primer crédito hipotecario?');
  const REV_IMPUESTOS = REV('usuario-inteligente/que-hay-de-nuevo/2023/08/las-juventudes-y-los-impuestos', 'Las juventudes y los impuestos');
  const FPT_JUBILACION = FPT('como-preparar-mi-jubilacion', '¿Cómo preparar mi jubilación?');
  const FPT_HOGAR = FPT('como-cuidar-tu-entorno-personal-y-financiero-hogar', 'El hogar: comprar o alquilar, la hipoteca');
  const FPT_FAMILIA = FPT('como-cuidar-tu-entorno-personal-y-financiero-familia', 'La familia');
  const FPT_BANCO = FPT('como-cuidar-tu-entorno-personal-y-financiero-banco-yo', 'El banco y yo');
  const AEAT = { nombre: 'Agencia Tributaria (España), Educación cívico-tributaria: Tributos e impuestos', url: 'https://sede.agenciatributaria.gob.es/Sede/educacion-civico-tributaria/programa-educacion-civico-tributaria/que-impuestos/sugerencias-uso-educacion-primaria/exposicion-profesor/tributos-impuestos.html' };
  const AEAT_IVA = { nombre: 'Agencia Tributaria (España): Tipos impositivos en el IVA 2026 (PDF)', url: 'https://sede.agenciatributaria.gob.es/static_files/Sede/Tema/IVA/IVA_reperc/Tipos_IVA_2026_26_02_2026.pdf' };
  const SEC_CARTERA = { nombre: 'Comisión de Bolsa y Valores de EE. UU. (SEC), Investor.gov: Asset Allocation and Diversification (en inglés)', url: 'https://www.investor.gov/introduction-investing/getting-started/asset-allocation' };

  // ------------------------------------------------------------------
  const SINIESTRO = diagrama([0, 12], [0, 3.4], [
    caja(0.1, 0.8, 2.7, 2.6, true), txt(1.4, 2.0, 'gasto total'), txt(1.4, 1.35, '$100 000'),
    txt(3.0, 1.7, '='),
    caja(3.3, 0.8, 5.6, 2.6), txt(4.45, 2.0, 'tu deducible'), txt(4.45, 1.35, '$10 000'),
    txt(5.9, 1.7, '+'),
    caja(6.2, 0.8, 8.6, 2.6), txt(7.4, 2.0, 'tu coaseguro'), txt(7.4, 1.35, '$9 000'),
    txt(8.9, 1.7, '+'),
    caja(9.2, 0.8, 11.9, 2.6), txt(10.55, 2.0, 'la aseguradora'), txt(10.55, 1.35, '$81 000'),
  ], 'Una suma con cajas, sin escala, del ejemplo de la lección. En una caja sombreada, el gasto total de $100 000, igual a tu deducible de $10 000, más tu coaseguro de $9 000, más lo que paga la aseguradora, $81 000.');

  L('Seguros: para qué sirven', {
    objetivo: 'Explicar cómo funciona un seguro, distinguir la prima, el deducible y el coaseguro, y saber qué revisar antes de contratar uno.',
    explicacion: `
      <p>Una noche, alguien de tu familia necesita una cirugía de emergencia que cuesta $100 000. O chocas el auto y el daño al otro vehículo es enorme. Son cosas que quizá nunca pasen, pero si pasan, pueden acabar con años de ahorro. Para eso existen los seguros.</p>
      <h3>Qué es un seguro</h3>
      <p>Un <strong>seguro</strong> es un contrato en el que pagas una cantidad pequeña y segura a una aseguradora para que ella cubra un gasto grande e inesperado, si llega a ocurrir. La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, explica por ejemplo que un seguro de gastos médicos cubre los gastos del hospital y del médico si tienes un accidente o una enfermedad, a cambio de una prima.</p>
      <p>La <strong>prima</strong> es el precio del seguro: lo que pagas, cada mes o cada año, por estar protegido. Fíjate en la idea de fondo: muchas personas pagan una prima, y con ese dinero se cubren los gastos de las pocas a las que les pasa algo. Así, nadie tiene que cargar sin ayuda con un golpe que no podría pagar.</p>
      <h3>Tipos de seguros</h3>
      <p>Según la CONDUSEF y Finanzas para todos, del Banco de España y la CNMV, algunos de los más comunes son estos:</p>
      <ul>
        <li>El seguro de vida protege a tu familia si fallecieras o quedaras incapacitado para trabajar.</li>
        <li>El seguro de gastos médicos o de salud cubre enfermedades y accidentes.</li>
        <li>El seguro de accidentes paga una cantidad si un accidente te causa una invalidez o la muerte.</li>
        <li>El seguro de auto cubre los daños de un choque; en México su cobertura básica es obligatoria por ley en la mayoría de los estados, según la CONDUSEF (revisa lo vigente en tu país).</li>
        <li>El seguro de la casa cubre daños como un incendio, una inundación o un terremoto.</li>
      </ul>
      <p>La CONDUSEF recomienda identificar primero los riesgos a los que están expuestos tú, tu familia y lo que tienes, y después buscar el seguro que mejor se ajuste a tus necesidades y a tu bolsillo.</p>
      <h3>Lo que pagas tú cuando pasa algo</h3>
      <p>Aunque tengas seguro, normalmente pagas una parte. El <strong>deducible</strong> es la cantidad que aportas tú cada vez que usas el seguro, antes de que pague la aseguradora. En los seguros de gastos médicos existe además el coaseguro: un porcentaje de los gastos que sigues pagando tú después del deducible. La CONDUSEF advierte que, como es un porcentaje, entre más caro sea el gasto, más pagas.</p>
      ${SINIESTRO}
      <h3>Antes de contratar</h3>
      <ul>
        <li>Revisa las exclusiones, que son las situaciones en las que el seguro no paga.</li>
        <li>Pregunta por las enfermedades que ya tenías antes de contratar, que la CONDUSEF llama preexistencias.</li>
        <li>Pregunta si hay periodos de carencia: según Finanzas para todos, un tiempo mínimo que debes llevar asegurado para usar ciertos servicios.</li>
        <li>Compara. Según la Encuesta Nacional de Inclusión Financiera de México de 2018, que cita la CONDUSEF, solo el 51.5% de las personas con seguro lo comparó con el de otras aseguradoras.</li>
      </ul>
      <p>Un seguro no reemplaza tu fondo de emergencia, el de "Fondo de emergencia". El fondo cubre los imprevistos de todos los días, y el seguro, los golpes tan grandes que el fondo no aguantaría. Juntos se complementan.</p>
      <p class="nota"><strong>Trampa común:</strong> elegir solo por la prima más baja. Un seguro barato con un deducible muy alto o muchas exclusiones puede dejarte pagando casi todo cuando lo necesites.</p>`,
    ejemplo: `
      <p>Tienes un seguro de gastos médicos con un deducible de $10 000 y un coaseguro de 10%. Una cirugía cuesta $100 000. Las cifras son de ejemplo. ¿Cuánto pagas tú y cuánto la aseguradora?</p>
      <ol class="pasos-ej">
        <li>Primero pagas el deducible: $10 000.</li>
        <li>Lo que queda del gasto es 100 000 − 10 000 = $90 000.</li>
        <li>De eso pagas el coaseguro: el 10% de 90 000 es 0.10 × 90 000 = $9 000.</li>
        <li>En total pagas 10 000 + 9 000 = $19 000, y la aseguradora, 100 000 − 19 000 = $81 000.</li>
        <li>Comprueba: 19 000 + 81 000 = 100 000, el costo de la cirugía.</li>
      </ol>
      <p>Resultado: <span class="resultado">tú pagas $19 000 y la aseguradora $81 000</span>.</p>
      <p class="nota"><strong>Error común:</strong> calcular el coaseguro sobre el total, el 10% de 100 000. Se calcula sobre lo que queda después del deducible.</p>`,
    vidaReal: `
      <p>Un seguro bien elegido te da tranquilidad en los peores momentos:</p>
      <ul>
        <li>Una enfermedad o un accidente no se lleva todos tus ahorros.</li>
        <li>Antes de contratar, sabes qué preguntar sobre lo que cubre y lo que no.</li>
        <li>Comparas varias opciones en lugar de quedarte con la primera.</li>
        <li>Proteges a tu familia por si a ti te pasa algo y no pudieras seguir trabajando.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un gasto médico de $50 000 tiene un deducible de $5 000 y un coaseguro de 10%. ¿Cuánto pagas tú en total?</p>', respuesta: 5000 + 0.1 * (50000 - 5000),
        pista: '<p>Paga primero el deducible y después el 10% de lo que queda.</p>',
        solucion: '<p>Quedan 50 000 − 5 000 = 45 000, y el 10% es 4 500. Pagas 5 000 + 4 500 = <strong>$9 500</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>En ese mismo caso, ¿cuánto paga la aseguradora?</p>', respuesta: 50000 - (5000 + 0.1 * (50000 - 5000)),
        pista: '<p>Resta lo que pagas tú al gasto total.</p>',
        solucion: '<p>50 000 − 9 500 = <strong>$40 500</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>La prima de tu seguro es de $450 al mes. ¿Cuánto pagas en un año?</p>', respuesta: 450 * 12,
        pista: '<p>Multiplica por 12 meses.</p>',
        solucion: '<p>450 × 12 = <strong>$5 400</strong> al año.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Qué es el deducible?</p>',
        opciones: ['Lo que pagas cada mes por estar asegurado', 'La cantidad que aportas tú cada vez que usas el seguro, antes de que pague la aseguradora', 'El porcentaje del gasto que siempre paga la aseguradora'], correcta: 1,
        pista: '<p>La CONDUSEF lo define como lo que aportas en cada siniestro.</p>',
        solucion: '<p><strong>La cantidad que aportas tú cada vez que usas el seguro.</strong> Lo que pagas cada mes es la prima.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cómo se complementan un seguro y un fondo de emergencia?</p>',
        opciones: ['El seguro cubre golpes grandes que no podrías pagar; el fondo, los imprevistos de todos los días', 'Son lo mismo, así que basta con uno', 'El seguro paga la renta y el fondo paga el auto'], correcta: 0,
        pista: '<p>Piensa en el tamaño del gasto que cubre cada uno.</p>',
        solucion: '<p><strong>El seguro, para los golpes grandes; el fondo, para los imprevistos de todos los días.</strong></p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el precio que pagas, cada mes o cada año, por estar asegurado?</p>',
        respuestas: ['prima', 'la prima', 'prima del seguro', 'la prima del seguro'],
        pista: '<p>Es una palabra corta que también significa "hija de tu tío".</p>',
        solucion: '<p>La <strong>prima</strong>.</p>' },
    ],
    fuentes: [REV_GMM, REV_BEF, REV_AUTO, FPT_FAMILIA],
  });

  // ------------------------------------------------------------------
  const acumulado = (inicio) => (edad) => (edad <= inicio ? 0 : 250 * ((1.005 ** (12 * (edad - inicio)) - 1) / 0.005) / 1000);
  const RETIRO = G({
    x: [25, 65], y: [0, 550], pasos: [10, 100], nombres: false,
    funciones: [{ f: acumulado(25), etiqueta: 'empiezas a los 25, en miles de $', serie: 0 }, { f: acumulado(35), etiqueta: 'empiezas a los 35, en miles de $', serie: 1 }],
    descripcion: 'Gráfica de lo que se junta, en miles, aportando $250 al mes con un rendimiento de ejemplo de 0.5% al mes, contra la edad, de 25 a 65 años. Quien empieza a los 25 llega a los 65 con unos 498 mil. Quien empieza a los 35 llega con unos 251 mil: diez años menos de aportar dan casi la mitad.',
  });

  L('Retiro y pensiones', {
    objetivo: 'Explicar qué es una pensión, calcular la tasa de reemplazo y cuánto faltaría para tu retiro, y entender por qué empezar pronto hace tanta diferencia.',
    explicacion: `
      <p>Un día dejarás de trabajar, por edad o por salud. El sueldo dejará de llegar, pero los gastos seguirán: comida, casa, medicinas. ¿De qué vivirás? Pensarlo desde ahora, aunque falten muchos años, es una de las decisiones que más pesan en tu futuro.</p>
      <h3>Qué es una pensión</h3>
      <p>Una <strong>pensión</strong> es un pago que recibes cada mes cuando te retiras, y que sale de lo que tú, quienes te emplearon y a veces el gobierno aportaron durante tu vida de trabajo. Cada país tiene su sistema. En México, según la CONDUSEF, el organismo que protege a los usuarios de servicios financieros, el dinero va a una cuenta individual en una administradora de fondos para el retiro, donde se suman las aportaciones obligatorias del trabajador, del patrón y del gobierno. En España, Finanzas para todos, del Banco de España y la CNMV, explica que hay una pensión pública de la Seguridad Social, y que la edad legal de jubilación será de 67 años a partir de 2027. En Argentina, como viste en "Cómo leer tu recibo de sueldo", se descuenta un porcentaje del sueldo para la jubilación. Revisa las reglas vigentes en tu país.</p>
      <h3>La pensión casi nunca alcanza sola</h3>
      <p>Para saber si una pensión alcanza, se usa la <strong>tasa de reemplazo</strong>: qué porcentaje de tu sueldo de antes del retiro representa tu pensión.</p>
      <p><strong>tasa de reemplazo = pensión ÷ sueldo antes del retiro × 100</strong></p>
      <p>Se lee "qué parte de tu sueldo sigue llegando cuando te retiras". La CONDUSEF cita datos de 2021 según los cuales, en México, quienes empezaron a trabajar después del 1 de julio de 1997 tendrán una tasa de reemplazo menor al 50%: si alguien ganaba unos 12 mil pesos al final de su vida laboral, recibiría como máximo cerca de 6 mil. Finanzas para todos dice algo parecido para España: la pensión pública solo cubre una parte de lo que ganabas, y su futuro a largo plazo es incierto, así que conviene completarla con ahorro e inversión propios.</p>
      <h3>Cuánto vas a necesitar</h3>
      <p>Finanzas para todos propone empezar por preguntarte cómo te gustaría vivir en esa etapa, dónde, con qué gastos de salud y cuántos años podría durar. Y no olvidar la inflación de "Inflación: por qué todo sube de precio": lo que hoy alcanza, dentro de 20 años alcanzará para menos.</p>
      <h3>El tiempo es tu mejor aliado</h3>
      <p>Por el interés compuesto de "Interés compuesto: la fuerza del tiempo", cada peso que apartas joven tiene más años para crecer. La CONDUSEF lo dice así: entre más temprano empiezas a ahorrar, mayores cantidades puedes lograr para tu retiro. En México, además de lo obligatorio, se pueden hacer aportaciones voluntarias a la cuenta de retiro desde $50. Es la misma idea de las aportaciones periódicas de "Invertir a largo plazo".</p>
      ${RETIRO}
      <p>Conforme se acerca el retiro, conviene que el dinero esté en inversiones menos arriesgadas, para no depender de una mala racha justo al final. La Comisión de Bolsa y Valores de Estados Unidos (SEC) explica que algunos fondos con fecha objetivo hacen ese cambio poco a poco.</p>
      <p class="nota"><strong>Trampa común:</strong> pensar "todavía falta mucho". Justamente porque falta mucho, lo que apartes hoy es lo que más puede crecer.</p>`,
    ejemplo: `
      <p>Al final de tu vida laboral ganas $12 000 al mes y te corresponde una pensión de $6 000, como en el dato que cita la CONDUSEF. Calculas que necesitarás $10 000 al mes para vivir. ¿Cuál es tu tasa de reemplazo y cuánto te faltaría?</p>
      <ol class="pasos-ej">
        <li>Tasa de reemplazo: 6 000 ÷ 12 000 × 100 = 50%.</li>
        <li>Lo que faltaría cada mes: 10 000 − 6 000 = $4 000.</li>
        <li>En un año: 4 000 × 12 = $48 000.</li>
        <li>Si el retiro durara 20 años: 48 000 × 20 = $960 000, sin contar la inflación ni lo que ese dinero pudiera rendir.</li>
        <li>Compara con la gráfica: aportar $250 al mes desde los 25 años, con el rendimiento del ejemplo, llegaría a unos $498 000 a los 65, cerca de la mitad de lo que faltaría.</li>
      </ol>
      <p>Resultado: <span class="resultado">tasa de reemplazo de 50%; faltarían $4 000 al mes, unos $960 000 en 20 años</span>.</p>
      <p class="nota"><strong>Error común:</strong> olvidar la inflación. Esos $10 000 de hoy costarán bastante más dentro de muchos años.</p>`,
    vidaReal: `
      <p>Pensar en el retiro desde joven te da más opciones al final:</p>
      <ul>
        <li>Si empiezas a trabajar, sabes preguntar adónde va el dinero que te descuentan para tu retiro.</li>
        <li>Puedes calcular si lo que recibirás alcanzará o cuánto te faltará.</li>
        <li>Entiendes por qué empezar a ahorrar joven, aunque sea poco, hace tanta diferencia.</li>
        <li>Puedes ayudar a las personas mayores de tu familia a revisar su situación.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Ganas $15 000 al mes antes de retirarte y tu pensión es de $6 000. ¿Cuál es tu tasa de reemplazo, en porcentaje?</p>', respuesta: 6000 / 15000 * 100,
        pista: '<p>Divide la pensión entre el sueldo y multiplica por 100.</p>',
        solucion: '<p>6 000 ÷ 15 000 = 0.40, es decir, <strong>40%</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con una tasa de reemplazo de 50% y un sueldo de $20 000, ¿de cuánto sería tu pensión?</p>', respuesta: 20000 * 0.5,
        pista: '<p>Saca el 50% del sueldo.</p>',
        solucion: '<p>El 50% de 20 000 es <strong>$10 000</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Necesitarás $12 000 al mes y tu pensión será de $7 000. ¿Cuánto te faltaría cada mes?</p>', respuesta: 12000 - 7000,
        pista: '<p>Resta la pensión a lo que necesitas.</p>',
        solucion: '<p>12 000 − 7 000 = <strong>$5 000</strong> al mes.</p>' },
      { tipo: 'numero', enunciado: '<p>Si te faltan $5 000 al mes durante 20 años de retiro, ¿cuánto necesitarías en total, sin contar la inflación ni los rendimientos?</p>', respuesta: 5000 * 12 * 20,
        pista: '<p>Multiplica por 12 meses y luego por 20 años.</p>',
        solucion: '<p>5 000 × 12 = 60 000 al año, y 60 000 × 20 = <strong>$1 200 000</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la CONDUSEF, ¿cuándo conviene empezar a ahorrar para el retiro?</p>',
        opciones: ['Unos cinco años antes de retirarte', 'Solo cuando ganes mucho dinero', 'Lo antes posible'], correcta: 2,
        pista: '<p>Recuerda la gráfica: ¿quién juntó más?</p>',
        solucion: '<p><strong>Lo antes posible.</strong> Entre más años tiene el dinero para crecer, más se junta.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el porcentaje de tu sueldo que representa tu pensión?</p>',
        respuestas: ['tasa de reemplazo', 'la tasa de reemplazo', 'tasa de sustitución', 'tasa de reposición'],
        pista: '<p>La pensión "reemplaza" una parte de tu sueldo.</p>',
        solucion: '<p>La <strong>tasa de reemplazo</strong>.</p>' },
    ],
    fuentes: [FPT_JUBILACION, REV_PENSION, SEC_CARTERA],
  });

  // ------------------------------------------------------------------
  L('Impuestos básicos', {
    objetivo: 'Explicar qué es un impuesto, distinguir los directos de los indirectos, calcular el IVA y entender cómo funcionan los impuestos por tramos.',
    explicacion: `
      <p>En el ticket del supermercado aparece una línea que dice "IVA". En tu recibo de sueldo hay un descuento por impuestos. ¿A dónde va ese dinero y por qué lo pagas? Entenderlo te ayuda a leer tus cuentas y a cumplir tus obligaciones sin sustos.</p>
      <h3>Qué es un impuesto</h3>
      <p>Según la Agencia Tributaria de España, un <strong>impuesto</strong> es una cantidad de dinero que las personas deben pagar de forma obligatoria para que el gobierno pueda cubrir los gastos de todos, como escuelas, hospitales y carreteras. La Agencia Tributaria explica también que los impuestos no son iguales para todos, porque no todas las personas tienen el mismo dinero: paga más quien tiene o gana más. A eso le llama capacidad económica, y se puede ver en lo que tienes, en lo que ganas o en lo que compras.</p>
      <h3>Directos e indirectos</h3>
      <p>La Agencia Tributaria los divide en dos clases:</p>
      <ul>
        <li>Un <strong>impuesto directo</strong> depende de lo que ganas o tienes, así que quien gana más paga más. El más conocido es el impuesto sobre lo que ganas, que en España se llama IRPF y que se paga, por ejemplo, sobre el sueldo.</li>
        <li>Un <strong>impuesto indirecto</strong> se paga al comprar, y es igual para todas las personas que compran lo mismo, ganen mucho o poco. El más conocido es el IVA, que se cobra en casi todo lo que compras.</li>
      </ul>
      <p>Además, existen las tasas, que se pagan por servicios concretos, como la recolección de la basura o el agua potable.</p>
      <div class="tabla-wrap"><table>
        <tr><th>Pregunta</th><th>Impuesto directo</th><th>Impuesto indirecto</th></tr>
        <tr><th>¿De qué depende?</th><td>De lo que ganas o tienes</td><td>De lo que compras</td></tr>
        <tr><th>¿Quién paga más?</th><td>Quien gana o tiene más</td><td>Quien compra más; por la misma compra, todos pagan igual</td></tr>
        <tr><th>Ejemplo</th><td>El impuesto sobre el sueldo</td><td>El IVA</td></tr>
      </table></div>
      <h3>Cómo se calcula el IVA</h3>
      <p>El IVA es un porcentaje del precio. Según la Agencia Tributaria, en España en 2026 el tipo general es de 21%, y hay tipos reducidos, como el de 10% para muchos alimentos. En otros países el porcentaje es distinto; revisa el del tuyo. Si algo cuesta $100 antes de IVA, con 21% pagas 100 × 1.21 = $121, como viste en "Porcentajes". Y al revés: si el precio con IVA es de $121, el precio sin IVA es 121 ÷ 1.21 = $100.</p>
      <h3>Por tramos</h3>
      <p>Muchos impuestos sobre lo que ganas se cobran por tramos: un porcentaje para una primera parte del dinero, otro más alto para la siguiente, y así. Por ejemplo, Finanzas para todos, del Banco de España y la CNMV, explica que en España, en 2026, los intereses de una cuenta pagan 19% por los primeros 6 000 euros, 21% por lo que va de 6 000 a 50 000 euros y 23% por lo que pasa de ahí. Fíjate que el porcentaje más alto solo se aplica a la parte que pasa del límite, no a todo. Los tramos cambian, así que revisa los vigentes en tu país.</p>
      <h3>Tus obligaciones</h3>
      <p>Cada país pide cosas distintas. En México, por ejemplo, la CONDUSEF recuerda que desde los 18 años hay que inscribirse en el registro de contribuyentes de la autoridad de impuestos. A quien tiene un sueldo, en muchos países se le descuenta el impuesto cada mes, como viste en "Cómo leer tu recibo de sueldo". Guarda tus comprobantes y, ante una duda, consulta a la autoridad de impuestos de tu país. En la materia Finanzas y economía, en "Impuestos y gasto público", verás en qué se usa lo que se recauda.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que, al pasar a un tramo más alto, pagas ese porcentaje sobre todo lo que ganas. El porcentaje mayor solo se aplica a la parte que pasa del límite.</p>`,
    ejemplo: `
      <p>Con los tramos que da Finanzas para todos para España (19% hasta 6 000 euros y 21% de 6 000 a 50 000 euros), ¿cuánto impuesto pagan 10 000 euros de intereses?</p>
      <ol class="pasos-ej">
        <li>Parte el dinero en tramos: los primeros 6 000 euros y los 10 000 − 6 000 = 4 000 euros que pasan del límite.</li>
        <li>Primer tramo: 6 000 × 0.19 = 1 140 euros.</li>
        <li>Segundo tramo: 4 000 × 0.21 = 840 euros.</li>
        <li>Suma: 1 140 + 840 = 1 980 euros de impuesto.</li>
        <li>Comprueba qué porcentaje del total es: 1 980 ÷ 10 000 = 0.198, es decir, 19.8%, entre 19% y 21%, como debe ser.</li>
      </ol>
      <p>Resultado: <span class="resultado">1 980 euros de impuesto</span>.</p>
      <p class="nota"><strong>Error común:</strong> aplicar 21% a todo: 10 000 × 0.21 = 2 100 euros. Eso cobraría de más los primeros 6 000 euros.</p>`,
    vidaReal: `
      <p>Entender los impuestos te ayuda a leer tus cuentas y tus compras:</p>
      <ul>
        <li>Sabes qué parte del precio de lo que compras se va al gobierno.</li>
        <li>Entiendes por qué te descuentan dinero del sueldo y puedes revisarlo.</li>
        <li>Guardas tus comprobantes y cumples sin sustos.</li>
        <li>Entiendes las noticias cuando se habla de subir o bajar un impuesto, y sabes a quién le afecta más.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un producto cuesta $200 antes de IVA. Con un IVA de 21%, ¿cuánto pagas?</p>', respuesta: 200 * 1.21,
        pista: '<p>Sumar 21% es multiplicar por 1.21.</p>',
        solucion: '<p>200 × 1.21 = <strong>$242</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Pagaste $363 por algo que ya incluía un IVA de 21%. ¿Cuál era el precio sin IVA?</p>', respuesta: 363 / 1.21,
        pista: '<p>Para quitar el IVA, divide entre 1.21.</p>',
        solucion: '<p>363 ÷ 1.21 = <strong>$300</strong>. Comprueba: 300 × 1.21 = 363.</p>' },
      { tipo: 'numero', enunciado: '<p>Un alimento cuesta $80 antes de IVA y tiene el tipo reducido de 10%. ¿Cuánto pagas?</p>', respuesta: 80 * 1.1,
        pista: '<p>Sumar 10% es multiplicar por 1.10.</p>',
        solucion: '<p>80 × 1.10 = <strong>$88</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con los tramos del ejemplo (19% hasta 6 000 euros y 21% de 6 000 a 50 000), ¿cuánto impuesto pagan 8 000 euros de intereses?</p>', respuesta: 6000 * 0.19 + 2000 * 0.21,
        pista: '<p>Parte los 8 000 en 6 000 y 2 000, y aplica a cada parte su porcentaje.</p>',
        solucion: '<p>6 000 × 0.19 = 1 140 y 2 000 × 0.21 = 420. En total, <strong>1 560 euros</strong>.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estos es un impuesto indirecto?</p>',
        opciones: ['El impuesto sobre tu sueldo', 'El IVA que pagas al comprar', 'El impuesto que pagan las empresas por sus ganancias'], correcta: 1,
        pista: '<p>El indirecto se paga al comprar, igual para todos.</p>',
        solucion: '<p><strong>El IVA.</strong> Los otros dos dependen de lo que se gana: son directos.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el impuesto que depende de lo que ganas o tienes, de modo que paga más quien gana más?</p>',
        respuestas: ['impuesto directo', 'el impuesto directo', 'un impuesto directo', 'directo'],
        pista: '<p>Es lo contrario del indirecto.</p>',
        solucion: '<p>Un <strong>impuesto directo</strong>.</p>' },
    ],
    fuentes: [AEAT, AEAT_IVA, FPT_BANCO, REV_IMPUESTOS, WIKI('Impuesto_progresivo', 'Progresividad'), WIKI('Impuesto_al_valor_agregado', 'Impuesto al valor agregado')],
  });

  // ------------------------------------------------------------------
  L('Grandes compras: auto y vivienda', {
    objetivo: 'Calcular el enganche y el dinero que necesitas al comprar un auto o una vivienda, comparar comprar con rentar y revisar si la cuota cabe en tu presupuesto.',
    explicacion: `
      <p>Un auto o una casa propia son de las compras más grandes que harás en tu vida. Casi nadie las paga de contado, así que casi siempre van con un crédito de muchos años. Por eso conviene pensarlas con más calma que cualquier otra compra.</p>
      <h3>El enganche</h3>
      <p>El <strong>enganche</strong> es el pago inicial que haces con tu propio dinero al comprar; el resto se paga con un crédito. Según la CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, el enganche de un auto suele ser de 10% a 20% del precio. Para una vivienda, la CONDUSEF dice que en teoría se recomienda ahorrar al menos 10% del valor, pero que lo mejor es juntar todo lo que puedas. Finanzas para todos, del Banco de España y la CNMV, explica que en España, en 2026, los bancos suelen prestar el 80% del valor de tasación, que es lo que un experto calcula que vale la vivienda, así que la entrada ronda el 20%. Entre más grande el enganche, menos pides prestado y menos intereses pagas.</p>
      <h3>El auto: lo que cuesta tenerlo</h3>
      <p>La CONDUSEF recuerda que tener un auto no es solo pagarlo. A las cuotas del crédito hay que sumar el seguro, que en México tiene una cobertura básica obligatoria por ley en la mayoría de los estados, la licencia de conducir y los impuestos y pagos anuales del vehículo, que cambian según el lugar. Y repite una regla que viste en "Cómo comparar préstamos": un plazo más corto sube la cuota pero baja los intereses, y uno más largo hace lo contrario.</p>
      <h3>La vivienda: comprar o rentar</h3>
      <p>Para comprar una casa se suele usar una <strong>hipoteca</strong>: un crédito de muchos años para comprar una vivienda, en el que la propia vivienda queda como garantía de que pagarás. La CONDUSEF explica que estos créditos suelen pagarse durante muchos años, y Finanzas para todos habla de 20 o 30.</p>
      <p>Finanzas para todos compara comprar con rentar. Comprar te obliga a ahorrar cada mes y, al final, tienes un bien de valor. Pero también ata: es más difícil mudarte, y el dueño paga seguros, impuestos, mantenimiento y otros gastos que, al rentar, suele cubrir quien te renta. Rentar no es "tirar el dinero": te da libertad para cambiarte.</p>
      <p>Al precio hay que sumar los gastos de la compra y del crédito. Finanzas para todos calcula que en España rondan, en promedio, el 10% de lo que pides prestado. Además, en los primeros años de una hipoteca pagas sobre todo intereses, y lo que debes baja muy despacio.</p>
      <h3>¿Cuánto puedes pagar?</h3>
      <p>Como viste en "Señales de que tienes demasiadas deudas", Finanzas para todos recoge que los expertos suelen pedir que todas tus cuotas de deudas no pasen del 40% de tus ingresos netos; otros expertos ponen el límite en 35%, y el de la hipoteca, en 30%. La CONDUSEF agrega dos consejos: revisa tu historial crediticio antes de pedir el crédito, como en "Historial crediticio", y compara al menos tres opciones. Todas estas cifras son de un país y un año concretos: revisa las de tu país.</p>
      <p class="nota"><strong>Trampa común:</strong> fijarte solo en si puedes pagar la cuota y olvidar el enganche y los gastos de compra, que se pagan al principio y de golpe.</p>`,
    ejemplo: `
      <p>Quieres comprar una vivienda de $1 000 000. Usa los porcentajes que da Finanzas para todos para España: entrada de 20% y gastos de alrededor de 10% de lo que pides prestado. Te ofrecen una cuota de $7 500 al mes y tu ingreso neto es de $22 000. Las cifras son de ejemplo. ¿Cuánto necesitas al principio y cabe la cuota?</p>
      <ol class="pasos-ej">
        <li>Entrada: el 20% de 1 000 000 es $200 000.</li>
        <li>Lo que pides prestado: 1 000 000 − 200 000 = $800 000.</li>
        <li>Gastos de compra y del crédito: el 10% de 800 000 es $80 000. Al principio necesitas 200 000 + 80 000 = $280 000.</li>
        <li>Revisa la cuota con el límite de 30% para la hipoteca: el 30% de 22 000 es $6 600. La cuota de $7 500 pasa de ese límite.</li>
        <li>Comprueba: 7 500 ÷ 22 000 ≈ 0.34, es decir, 34% de tu ingreso.</li>
      </ol>
      <p>Resultado: <span class="resultado">necesitas $280 000 al principio, y la cuota no cabe en el límite de 30%</span>.</p>
      <p class="nota"><strong>Error común:</strong> juntar solo la entrada y olvidar los gastos, que aquí suman $80 000 más.</p>`,
    vidaReal: `
      <p>Pensar las compras grandes con números te evita años de presión:</p>
      <ul>
        <li>Antes de comprar un auto, calculas cuánto te costará tenerlo cada mes, no solo pagarlo.</li>
        <li>Sabes cuánto dinero necesitas juntar antes de pedir un crédito para una casa.</li>
        <li>Puedes comparar con números si te conviene comprar o seguir rentando.</li>
        <li>Evitas comprometerte con una cuota que no podrías sostener durante tantos años.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Un auto cuesta $250 000 y das un enganche de 20%. ¿De cuánto es el enganche?</p>', respuesta: 250000 * 0.2,
        pista: '<p>Saca el 20% del precio.</p>',
        solucion: '<p>El 20% de 250 000 es <strong>$50 000</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Con ese enganche de $50 000, ¿cuánto tienes que pedir prestado para el auto de $250 000?</p>', respuesta: 250000 - 250000 * 0.2,
        pista: '<p>Resta el enganche al precio.</p>',
        solucion: '<p>250 000 − 50 000 = <strong>$200 000</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una vivienda cuesta $1 500 000. Con una entrada de 20% y gastos de 10% sobre lo que pides prestado, ¿cuánto dinero necesitas al principio?</p>', respuesta: 1500000 * 0.2 + 1500000 * 0.8 * 0.1,
        pista: '<p>Calcula la entrada, lo que pides prestado y el 10% de eso. Suma la entrada y los gastos.</p>',
        solucion: '<p>Entrada: 300 000. Préstamo: 1 200 000, y sus gastos, 120 000. Al principio necesitas 300 000 + 120 000 = <strong>$420 000</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Tu ingreso neto es de $25 000 al mes. Con el límite de 30% para la hipoteca, ¿cuál sería la cuota máxima?</p>', respuesta: 25000 * 0.3,
        pista: '<p>Saca el 30% de tu ingreso neto.</p>',
        solucion: '<p>El 30% de 25 000 es <strong>$7 500</strong> al mes.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según Finanzas para todos, cuando rentas, ¿quién suele pagar el mantenimiento y otros gastos de la vivienda?</p>',
        opciones: ['Quien renta la vivienda para vivir en ella', 'El dueño de la vivienda', 'El banco'], correcta: 1,
        pista: '<p>Esos gastos le tocan a quien es propietario.</p>',
        solucion: '<p><strong>El dueño de la vivienda.</strong> Por eso ser propietario tiene gastos extra además de la cuota.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el pago inicial que haces con tu propio dinero al comprar algo a crédito?</p>',
        respuestas: ['enganche', 'el enganche', 'entrada', 'la entrada', 'pago inicial', 'el pago inicial', 'anticipo', 'pie', 'cuota inicial'],
        pista: '<p>En España se le dice "entrada".</p>',
        solucion: '<p>El <strong>enganche</strong>, que en otros países se llama entrada, pie o cuota inicial.</p>' },
    ],
    fuentes: [REV_AUTO, REV_HIPOTECA, FPT_HOGAR, WIKI('Hipoteca', 'Hipoteca')],
  });
})();
