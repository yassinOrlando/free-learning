// Finanzas personales · Unidad 7: Bancos y seguridad.
// Formato de cada lección: ver CLAUDE.md ("Formato de lección (código)"). Revisar con: node verificar.js
// Sin consejos personalizados ni productos, bancos, apps o marcas por su nombre.
// Fraudes y pirámides: solo fuentes oficiales, sin culpar a las víctimas y siempre a dónde acudir.
(function () {
  const G = window.grafica;
  const L = (titulo, datos) => window.registrarLeccion('finanzas-personales', titulo, datos);
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

  const REV = (ruta, nombre) => ({ nombre: `CONDUSEF (México), Revista Proteja su Dinero: ${nombre}`, url: `https://revista.condusef.gob.mx/${ruta}/` });
  const BDE = (ruta, nombre) => ({ nombre: `Banco de España, Portal del Cliente Bancario: ${nombre}`, url: `https://clientebancario.bde.es/pcb/es/${ruta}` });
  const REV_CUENTAS = REV('ahorro-general/ahorro-formal/2021/02/cuentas-de-ahorro', 'Cuentas de ahorro');
  const REV_IPAB = REV('usuario-inteligente/sabias-que/2022/09/ya-conoces-al-ipab', '¿Ya conoces al IPAB?');
  const REV_BANCA = REV('usuario-inteligente/sabias-que/2022/10/banca-en-linea-y-banca-movil', '¿Banca en línea y banca móvil?');
  const REV_MOVIL = REV('usuario-inteligente/tu-bolsillo/2017/08/banca-movil', 'Banca móvil');
  const REV_FRAUDES = REV('usuario-inteligente/primer-plano/2023/11/fraude-financieros-el-terror-de-tu-cartera', 'Fraudes financieros, el terror de tu cartera');
  const REV_CONVENCE = REV('usuario-inteligente/a-tu-favor/2026/01/el-fraude-ya-no-roba-convence', 'El fraude ya no roba: convence');
  const REV_PIRAMIDES = REV('usuario-inteligente/a-tu-favor/2016/06/piramides', 'Pirámides');
  const BDE_CUENTAS = BDE('menu-horizontal/productosservici/cuentasdepositos/cuentascorriente/', 'Cuentas corrientes, depósitos a la vista y libretas de ahorro');
  const BDE_PLAZO = BDE('menu-horizontal/productosservici/cuentasdepositos/depositosplazo/', 'Depósitos a plazo');
  const BDE_PHISHING = BDE('blog/que-es-el-phishing-y-como-evitarlo.html', '¿Qué es el phishing y cómo evitarlo?');
  const BDE_QR = BDE('blog/qrishing--ten-cuidado-con-los-codigos-qr-fraudulentos.html', 'Cuidado con los códigos QR fraudulentos');
  const BDE_CHIRINGUITO = BDE('blog/consejos-de-la-policia-para-reconocer-un-chiringuito-financiero.html', 'Consejos de la Policía para reconocer un chiringuito financiero');
  const FGD = { nombre: 'Fondo de Garantía de Depósitos de Entidades de Crédito (España)', url: 'https://www.fgd.es/es/' };
  const SFC_TIPS = { nombre: 'Superintendencia Financiera de Colombia: Tips para identificar los esquemas ilegales', url: 'https://www.superfinanciera.gov.co/10115319' };
  const SFC_PIRAMIDES = { nombre: 'Superintendencia Financiera de Colombia: Pirámides y captación ilegal', url: 'https://www.superfinanciera.gov.co/10115308' };

  // ------------------------------------------------------------------
  L('Tipos de cuentas bancarias', {
    objetivo: 'Distinguir las cuentas a la vista de los depósitos a plazo, revisar sus comisiones y entender qué protege el seguro de depósitos y con qué límites.',
    explicacion: `
      <p>El día de pago, tu sueldo llega a una cuenta del banco. En otra puedes guardar tu fondo de emergencia, y en otra, dejar un dinero quieto durante unos meses a cambio de intereses. No todas las cuentas sirven para lo mismo.</p>
      <h3>Cuentas para el día a día</h3>
      <p>Una <strong>cuenta a la vista</strong> es una cuenta de la que puedes sacar tu dinero cuando quieras, sin esperar ningún plazo. El Banco de España agrupa aquí las cuentas corrientes, los depósitos a la vista y las libretas de ahorro; en México, la CONDUSEF, el organismo que protege a los usuarios de servicios financieros, menciona las cuentas de cheques, las de ahorro y las cuentas ligadas a una tarjeta de débito. La cuenta donde te depositan el sueldo suele ser de este tipo.</p>
      <p>Su gran ventaja es la liquidez que viste en "Fondo de emergencia": el dinero está disponible en cualquier momento. A cambio, pagan pocos intereses. El Banco de España señala que hoy su remuneración suele ser muy baja o nula, y la CONDUSEF dice que las cuentas de ahorro dan poco rendimiento, pero son de las más flexibles.</p>
      <h3>Dinero que se queda quieto un tiempo</h3>
      <p>Un <strong>depósito a plazo</strong> es un producto en el que entregas tu dinero al banco durante un tiempo fijo y, al terminar, recibes lo que depositaste más los intereses acordados. Así lo define el Banco de España. Suele pagar más que una cuenta a la vista, porque te comprometes a no tocar el dinero, pero por eso no sirve para el fondo de emergencia. Para saber cuánto ganas de verdad, recuerda "Tasa nominal y tasa real".</p>
      <div class="tabla-wrap"><table>
        <tr><th>Pregunta</th><th>Cuenta a la vista</th><th>Depósito a plazo</th></tr>
        <tr><th>¿Cuándo puedo sacar el dinero?</th><td>Cuando quiera</td><td>Al terminar el plazo</td></tr>
        <tr><th>¿Cuánto paga?</th><td>Poco o nada</td><td>Más, a cambio de esperar</td></tr>
        <tr><th>¿Para qué sirve?</th><td>Sueldo, pagos y fondo de emergencia</td><td>Dinero que no vas a necesitar pronto</td></tr>
      </table></div>
      <h3>Lo que te cobran</h3>
      <p>Algunas cuentas cobran comisiones, por ejemplo por mantenerla abierta, y otras piden un saldo mínimo. El Banco de España pone la comisión de mantenimiento entre las más comunes, y la CONDUSEF recuerda que hay cuentas que no cobran por manejo ni piden saldo mínimo. En la Unión Europea existe además la cuenta de pago básica, pensada para que cualquier persona pueda tener una. Antes de abrir una cuenta, compara como en "El costo total de un crédito": una comisión pequeña cada mes puede comerse los intereses.</p>
      <h3>Si el banco quiebra</h3>
      <p>¿Qué pasa con tu dinero si el banco tiene problemas y no puede devolverlo? Muchos países tienen un <strong>seguro de depósitos</strong>: una protección pública que te devuelve tu dinero, hasta un límite, si el banco no puede hacerlo. Por eso, como viste en "Por qué ahorrar", el ahorro formal está más protegido que el dinero guardado en casa.</p>
      <ul>
        <li>En México lo administra el IPAB. Según la CONDUSEF, se activa de forma automática y gratuita al abrir una cuenta en un banco, y cubre hasta 400 mil UDIs por persona y por banco. Las UDIs son una unidad que sube con los precios; en 2022, ese límite equivalía a más de 3 millones de pesos.</li>
        <li>En España lo administra el Fondo de Garantía de Depósitos, que en general garantiza, según su página consultada en 2026, hasta 100 000 euros por titular y por entidad.</li>
      </ul>
      <p>Los límites y las instituciones protegidas cambian según el país y con el tiempo, así que revisa el dato vigente en el tuyo. Para saber si tu cuenta está protegida, la CONDUSEF sugiere buscar en el contrato o en el estado de cuenta la leyenda del seguro de depósitos, o preguntarle directamente al banco.</p>
      <p class="nota"><strong>Trampa común:</strong> creer que cualquier lugar que "guarda dinero" está protegido. El seguro cubre a instituciones autorizadas y ciertos productos; una tanda o una empresa no autorizada no lo tiene.</p>`,
    ejemplo: `
      <p>Tienes $20 000 que no vas a usar en 6 meses. Un depósito a plazo te paga 8% anual. Una cuenta a la vista te paga 1% anual, pero cobra $30 al mes de comisión. Las cifras son de ejemplo. ¿Cuánto ganas con cada una?</p>
      <ol class="pasos-ej">
        <li>Depósito a plazo, con interés simple como en "Interés simple": 20 000 × 0.08 × 0.5 = $800.</li>
        <li>Cuenta a la vista: 20 000 × 0.01 × 0.5 = $100 de interés.</li>
        <li>Resta las comisiones de la cuenta: 30 × 6 = $180, y 100 − 180 = −80. En lugar de ganar, pierdes $80.</li>
        <li>Compara: el depósito te deja 800 − (−80) = $880 más.</li>
        <li>Pero recuerda: el dinero del depósito no está disponible esos 6 meses. Si fuera tu fondo de emergencia, convendría una cuenta a la vista, de preferencia sin comisión.</li>
      </ol>
      <p>Resultado: <span class="resultado">el depósito gana $800; la cuenta con comisión te hace perder $80</span>.</p>
      <p class="nota"><strong>Error común:</strong> comparar solo las tasas y olvidar restar las comisiones.</p>`,
    vidaReal: `
      <p>Elegir bien tus cuentas te ahorra dinero y sustos:</p>
      <ul>
        <li>Decides dónde recibir tu sueldo y dónde guardar tu ahorro.</li>
        <li>Antes de abrir una cuenta, preguntas qué cobra y si pide un saldo mínimo.</li>
        <li>Sabes que tu dinero para emergencias debe estar disponible, y que tu ahorro de largo plazo puede esperar.</li>
        <li>Puedes revisar si tu dinero está protegido en caso de que el banco tenga problemas.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Depositas $15 000 a plazo durante un año, al 6% anual. ¿Cuánto interés ganas?</p>', respuesta: 15000 * 0.06 * 1,
        pista: '<p>Usa I = C × i × t, con t = 1 año.</p>',
        solucion: '<p>15 000 × 0.06 × 1 = <strong>$900</strong>.</p>' },
      { tipo: 'numero', enunciado: '<p>Una cuenta cobra $45 al mes de comisión de mantenimiento. ¿Cuánto pagas en un año?</p>', respuesta: 45 * 12,
        pista: '<p>Multiplica por los 12 meses.</p>',
        solucion: '<p>45 × 12 = <strong>$540</strong> al año.</p>' },
      { tipo: 'numero', enunciado: '<p>Una cuenta te paga $200 de interés al año, pero cobra $25 al mes de comisión. ¿Cuánto ganas o pierdes en el año? (Si pierdes, escribe un número negativo.)</p>', respuesta: 200 - 25 * 12,
        pista: '<p>Calcula las comisiones del año y réstalas del interés.</p>',
        solucion: '<p>Las comisiones suman 25 × 12 = 300, y 200 − 300 = <strong>−100</strong>: pierdes $100 al año.</p>' },
      { tipo: 'numero', enunciado: '<p>En España tienes 130 000 euros en un banco cubierto por el Fondo de Garantía de Depósitos. Con el límite general, ¿cuántos euros quedarían sin garantía?</p>', respuesta: 130000 - 100000,
        pista: '<p>El límite general es de 100 000 euros por titular y por entidad.</p>',
        solucion: '<p>130 000 − 100 000 = <strong>30 000 euros</strong> sin garantía.</p>' },
      { tipo: 'opciones', enunciado: '<p>¿Dónde conviene guardar tu fondo de emergencia?</p>',
        opciones: ['En una cuenta a la vista, porque puedes sacar el dinero cuando quieras', 'En un depósito a plazo de cinco años, porque paga más', 'En una tanda, porque es más fácil'], correcta: 0,
        pista: '<p>Recuerda la liquidez.</p>',
        solucion: '<p><strong>En una cuenta a la vista.</strong> El depósito a plazo te impide sacar el dinero a tiempo, y la tanda no está protegida.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama la protección pública que te devuelve tu dinero, hasta un límite, si el banco no puede hacerlo?</p>',
        respuestas: ['seguro de depósitos', 'el seguro de depósitos', 'seguro de depósito', 'garantía de depósitos', 'fondo de garantía de depósitos', 'seguro de depósitos bancarios'],
        pista: '<p>Son tres palabras: "seguro de…".</p>',
        solucion: '<p>El <strong>seguro de depósitos</strong>.</p>' },
    ],
    fuentes: [BDE_CUENTAS, BDE_PLAZO, REV_CUENTAS, REV_IPAB, FGD],
  });

  // ------------------------------------------------------------------
  const PASOS = diagrama([0, 12], [0, 5], [
    caja(0.3, 3.2, 4.3, 4.7), txt(2.3, 4.2, '1. revisa la cuenta'), txt(2.3, 3.6, 'que recibe'),
    caja(7.7, 3.2, 11.7, 4.7), txt(9.7, 4.2, '2. revisa'), txt(9.7, 3.6, 'el monto'),
    caja(7.7, 0.3, 11.7, 1.8), txt(9.7, 1.3, '3. confirma'), txt(9.7, 0.7, 'con tu código'),
    caja(0.3, 0.3, 4.3, 1.8, true), txt(2.3, 1.3, '4. guarda el'), txt(2.3, 0.7, 'comprobante'),
    ...flecha([4.4, 3.95], [7.6, 3.95], 0, 1.2), ...flecha([9.7, 3.15], [9.7, 1.85], 0, 1.2), ...flecha([7.6, 1.05], [4.4, 1.05], 0, 1.2),
  ], 'Cuatro cajas numeradas unidas por flechas, con los pasos de una transferencia segura: 1, revisa la cuenta que recibe; 2, revisa el monto; 3, confirma con tu código; 4, en una caja sombreada, guarda el comprobante.');

  L('Banca en línea y pagos digitales', {
    objetivo: 'Explicar qué son la banca en línea y la banca móvil, hacer transferencias y pagos con cuidado, y usar las alertas para detectar movimientos extraños.',
    explicacion: `
      <p>Antes, pagar la luz significaba ir a una ventanilla, hacer fila y regresar. Hoy mucha gente lo hace desde el teléfono en un minuto. Eso ahorra tiempo y dinero, pero también pide algunos cuidados nuevos.</p>
      <h3>Dos formas de usar tu banco sin ir al banco</h3>
      <p>La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, distingue dos servicios. La <strong>banca en línea</strong> es el uso de tu banco a través de su sitio de internet, desde una computadora o una tableta. La <strong>banca móvil</strong> es el uso de tu banco a través de su aplicación en el teléfono. En la práctica se parecen mucho.</p>
      <p>Según la CONDUSEF, con ellas puedes consultar tu saldo y tus movimientos, ver tus estados de cuenta, pagar servicios como la luz o el teléfono, pagar tu tarjeta y mandar dinero a otras cuentas, del mismo banco o de otros. La aplicación funciona a cualquier hora, todos los días del año. En México, según la Encuesta Nacional de Inclusión Financiera de 2021 que cita la CONDUSEF, el 52% de las personas con cuenta prefería consultar sus movimientos desde la aplicación.</p>
      <h3>Transferencias y pagos</h3>
      <p>Una transferencia es enviar dinero de tu cuenta a otra sin usar efectivo. Para hacerla necesitas los datos de la cuenta que lo recibe y el monto. La CONDUSEF explica que, para confirmar una transferencia, la aplicación te pide un segundo paso de seguridad, y recomienda guardar el comprobante de cada operación por si necesitas hacer una aclaración.</p>
      ${PASOS}
      <p>También hay pagos con códigos QR: escaneas un código con el teléfono y te lleva a pagar. El Banco de España advierte que los delincuentes pueden pegar un código falso encima del verdadero, por ejemplo en un comercio, o enviar multas falsas con un código. Antes de pagar, revisa a qué dirección te lleva, y si te piden datos, entra tú directamente desde la aplicación o escribiendo la dirección completa.</p>
      <h3>Tu banco te avisa</h3>
      <p>Las <strong>alertas</strong> son avisos que tu banco te manda, por notificación, correo o mensaje, cuando hay un retiro, una compra, una transferencia o un cambio en tus datos. Según la CONDUSEF, se pueden configurar en la aplicación. Si te llega una alerta de algo que no hiciste, te enteras en minutos y no hasta el estado de cuenta.</p>
      <h3>Cuidados básicos</h3>
      <ul>
        <li>Usa solo la aplicación oficial de tu banco. La CONDUSEF advierte que las aplicaciones de origen no seguro son la principal fuente de virus en los teléfonos.</li>
        <li>No compartas tus claves con nadie, y usa una distinta para cada cuenta.</li>
        <li>Cierra tu sesión al terminar y pon un bloqueo a tu teléfono.</li>
        <li>Revisa tus movimientos con frecuencia, como viste en "Registrar y revisar tus gastos".</li>
      </ul>
      <p class="nota"><strong>Trampa común:</strong> entrar a tu banco desde un enlace que te llegó por mensaje. Entra siempre desde la aplicación oficial o escribiendo tú la dirección; lo verás en "Fraudes comunes y cómo evitarlos".</p>`,
    ejemplo: `
      <p>Cada mes pagas tres servicios en ventanilla, en tres viajes distintos. Cada viaje te cuesta $15 de ida y $15 de vuelta, y una hora. Las cifras son de ejemplo. ¿Cuánto ahorras en un año si los pagas en línea?</p>
      <ol class="pasos-ej">
        <li>Calcula el costo de un viaje: 15 + 15 = $30.</li>
        <li>Al mes, tres viajes: 3 × 30 = $90 y 3 horas.</li>
        <li>Al año: 90 × 12 = $1 080 y 3 × 12 = 36 horas.</li>
        <li>En línea no pagas pasaje y cada pago toma unos minutos. Si tu banco cobra comisión por pagar en línea, réstala del ahorro.</li>
        <li>Comprueba de otra forma: son 36 viajes al año, y 36 × 30 = 1 080.</li>
      </ol>
      <p>Resultado: <span class="resultado">ahorras unos $1 080 y 36 horas al año</span>.</p>
      <p class="nota"><strong>Error común:</strong> no revisar si hay comisiones por pagar en línea o por transferir. Pregúntalo antes de usar el servicio.</p>`,
    vidaReal: `
      <p>Usar tu banco desde el teléfono, con cuidado, simplifica el día a día:</p>
      <ul>
        <li>Pagas tus servicios a tiempo, sin hacer filas ni gastar en pasajes.</li>
        <li>Te enteras en minutos si alguien usa tu tarjeta sin permiso.</li>
        <li>Mandas dinero a tu familia sin cargar efectivo ni ir a una sucursal.</li>
        <li>Guardas tus comprobantes y puedes reclamar si algún pago o envío sale mal.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>Cada mes vas dos veces a pagar en persona, y cada viaje de ida y vuelta te cuesta $36. ¿Cuánto gastas en pasajes al año?</p>', respuesta: 2 * 36 * 12,
        pista: '<p>Calcula lo de un mes y multiplícalo por 12.</p>',
        solucion: '<p>2 × 36 = 72 al mes, y 72 × 12 = <strong>$864</strong> al año.</p>' },
      { tipo: 'numero', enunciado: '<p>En ventanilla te cobran $8 por cada pago de servicio, y en línea no te cobran nada. Si pagas 4 servicios al mes, ¿cuánto ahorras al mes pagando en línea?</p>', respuesta: 4 * 8,
        pista: '<p>Multiplica la comisión por el número de pagos.</p>',
        solucion: '<p>4 × 8 = <strong>$32</strong> al mes.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la CONDUSEF, ¿qué diferencia hay entre la banca en línea y la banca móvil?</p>',
        opciones: ['La banca en línea se usa en el sitio de internet del banco; la móvil, en su aplicación del teléfono', 'La banca móvil solo sirve para consultar el saldo', 'La banca en línea no necesita ninguna clave'], correcta: 0,
        pista: '<p>Piensa en desde dónde entras a cada una.</p>',
        solucion: '<p><strong>Una se usa en el sitio de internet y la otra en la aplicación.</strong> Las dos permiten consultas, pagos y transferencias, y las dos piden claves.</p>' },
      { tipo: 'opciones', enunciado: '<p>Te llega una alerta de una compra que no hiciste. ¿Qué haces?</p>',
        opciones: ['Esperas a que llegue el estado de cuenta', 'Contactas de inmediato a tu banco por su número o su aplicación oficial', 'Respondes el mensaje con tus datos para aclarar'], correcta: 1,
        pista: '<p>Para eso sirven las alertas: para actuar rápido.</p>',
        solucion: '<p><strong>Contactas de inmediato a tu banco por un canal oficial.</strong> Nunca respondas con tus datos a un mensaje.</p>' },
      { tipo: 'opciones', enunciado: '<p>En un comercio te piden pagar escaneando un código QR pegado en el mostrador. ¿Qué es lo más prudente?</p>',
        opciones: ['Escanearlo y pagar sin mirar, porque todos los códigos son seguros', 'Pagar dos veces para asegurarte de que llegue', 'Revisar a qué dirección te lleva antes de pagar'], correcta: 2,
        pista: '<p>Recuerda lo que advierte el Banco de España sobre los códigos pegados encima.</p>',
        solucion: '<p><strong>Revisar a qué dirección te lleva antes de pagar.</strong> Alguien pudo pegar un código falso encima del verdadero.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llaman los avisos que te manda el banco cada vez que hay un movimiento en tu cuenta?</p>',
        respuestas: ['alertas', 'las alertas', 'alerta', 'alertas bancarias', 'notificaciones'],
        pista: '<p>Te "alertan" de lo que pasa en tu cuenta.</p>',
        solucion: '<p>Las <strong>alertas</strong>.</p>' },
    ],
    fuentes: [REV_BANCA, REV_MOVIL, BDE_QR],
  });

  // ------------------------------------------------------------------
  const ALTO = diagrama([0, 12], [0, 3.2], [
    caja(0.2, 0.7, 3.6, 2.5), txt(1.9, 1.9, 'alto: no abras'), txt(1.9, 1.3, 'ni respondas'),
    caja(4.3, 0.7, 7.7, 2.5), txt(6, 1.9, 'verifica por'), txt(6, 1.3, 'el canal oficial'),
    caja(8.4, 0.7, 11.8, 2.5, true), txt(10.1, 1.9, 'reporta a'), txt(10.1, 1.3, 'tu banco'),
    ...flecha([3.65, 1.6], [4.25, 1.6], 0, 1.2), ...flecha([7.75, 1.6], [8.35, 1.6], 0, 1.2),
  ], 'Tres cajas unidas por flechas: "alto: no abras ni respondas", "verifica por el canal oficial" y, sombreada, "reporta a tu banco".');

  L('Fraudes comunes y cómo evitarlos', {
    objetivo: 'Reconocer los fraudes financieros más comunes y sus señales, aplicar la regla de oro de las claves y saber qué hacer y a dónde acudir si caes en uno.',
    explicacion: `
      <p>Te llega un mensaje: "Tu cuenta fue bloqueada. Entra a este enlace para desbloquearla". Tiene el logotipo de tu banco y suena urgente. Antes de tocar nada, detente: así empiezan muchos fraudes.</p>
      <h3>Qué es un fraude financiero</h3>
      <p>Un <strong>fraude financiero</strong> es una acción con la que alguien busca un beneficio propio a costa de dañar la economía de otra persona. Así lo define la CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, y agrega que la mayoría de quienes cometen fraudes buscan conseguir tus datos. También explica que hoy el fraude ya no roba por la fuerza, sino que convence: usa la prisa, la confianza y el cansancio para que actúes rápido y pienses poco. Por eso cualquiera puede caer, aunque sepa usar bien el teléfono.</p>
      <h3>Los más comunes</h3>
      <p>Muchos fraudes usan la <strong>suplantación</strong>: alguien se hace pasar por tu banco, una tienda, una autoridad o un familiar. Según la CONDUSEF y el Banco de España, estos son de los más frecuentes:</p>
      <ul>
        <li>El <strong><span lang="en">phishing</span></strong> llega por correo: un mensaje que parece de tu banco te lleva a una página falsa para que escribas tus claves. Su nombre viene de una palabra en inglés que suena como "pescar".</li>
        <li>El <span lang="en">smishing</span> es lo mismo, pero por mensaje de texto.</li>
        <li>El <span lang="en">vishing</span> llega por llamada: alguien que dice trabajar en tu banco te alarma con un cargo extraño y te pide datos.</li>
        <li>Con inteligencia artificial se pueden imitar voces que suenan igual que un familiar o un empleado del banco, según la CONDUSEF.</li>
        <li>En algunos cajeros colocan aparatos que copian los datos de tu tarjeta.</li>
        <li>Los créditos exprés falsos piden un depósito por adelantado y luego desaparecen. Otros préstamos de riesgo los viste en "Préstamos abusivos, gota a gota y cobranza ilegal".</li>
      </ul>
      <h3>La regla de oro</h3>
      <p>El Banco de España lo dice claro: tu banco nunca te pedirá por correo ni por mensaje tus claves de acceso ni los datos de tus tarjetas. La CONDUSEF agrega que tampoco te las pide por teléfono, y que un crédito legítimo no pide pagos por adelantado. Si alguien te las pide, es una señal de fraude, aunque el mensaje se vea oficial.</p>
      <p>Las señales se repiten: urgencia, como "tu cuenta será bloqueada hoy"; premios o devoluciones inesperadas; enlaces o archivos adjuntos, y presión para que no cuelgues. La defensa es hacer una pausa: no abras el enlace, cuelga y verifica tú por un canal oficial.</p>
      ${ALTO}
      <h3>Si ya caíste</h3>
      <p>No es tu culpa: estos engaños están hechos para convencer. Lo importante es actuar rápido. La CONDUSEF recomienda:</p>
      <ol>
        <li>Llamar de inmediato a tu banco, por su número oficial, para cancelar la tarjeta o el servicio afectado y pedir una alerta de fraude.</li>
        <li>Cambiar tus contraseñas, con una distinta para cada cuenta.</li>
        <li>Reclamar ante el organismo de protección al consumidor financiero de tu país; en México, ante la CONDUSEF.</li>
        <li>Denunciar ante la policía, y ante la policía cibernética si existe en tu país.</li>
        <li>Revisar tu historial crediticio, por si alguien pidió un crédito a tu nombre, como viste en "Historial crediticio".</li>
      </ol>
      <p class="nota"><strong>Trampa común:</strong> pensar "a mí no me va a pasar". Según la CONDUSEF, hoy caen incluso quienes tienen mucha experiencia digital, porque los engaños imitan casi a la perfección las páginas y las voces reales.</p>`,
    ejemplo: `
      <p>Te llega este mensaje: "Detectamos un cargo de $4 999 en su cuenta. Si no lo reconoce, entre en las próximas 2 horas a este enlace y escriba su clave". ¿Cuántas señales de fraude tiene y qué haces?</p>
      <ol class="pasos-ej">
        <li>Busca urgencia: "en las próximas 2 horas". Primera señal.</li>
        <li>Busca la alarma: un cargo que no reconoces, para que reacciones con miedo. Segunda señal.</li>
        <li>Busca un enlace: te pide entrar a una dirección. Tercera señal.</li>
        <li>Busca qué te pide: tu clave. Cuarta señal, y la más clara, porque tu banco nunca te la pide así.</li>
        <li>Decide: no abras el enlace. Entra a la aplicación oficial o llama al número oficial de tu banco para revisar si el cargo existe.</li>
      </ol>
      <p>Resultado: <span class="resultado">tiene 4 señales; es casi seguro un fraude</span>.</p>
      <p class="nota"><strong>Error común:</strong> abrir el enlace "solo para ver". El Banco de España recomienda no abrir los enlaces ni descargar los archivos de estos mensajes.</p>`,
    vidaReal: `
      <p>Conocer los engaños más comunes te protege a ti y a tu familia:</p>
      <ul>
        <li>Reconoces un mensaje falso antes de tocar el enlace que trae.</li>
        <li>Si alguien llama diciendo que es de tu banco, sabes colgar y llamar tú.</li>
        <li>Puedes avisar a tus familiares mayores de los engaños más comunes.</li>
        <li>Si te pasa, sabes exactamente qué pasos seguir y a quién acudir.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'opciones', enunciado: '<p>¿Cuál de estas cosas nunca te pedirá tu banco por correo o por mensaje?</p>',
        opciones: ['Que acudas a la sucursal a actualizar tus datos', 'Que escribas tu clave de acceso en un enlace', 'Que revises tus movimientos en la aplicación oficial'], correcta: 1,
        pista: '<p>Recuerda la regla de oro del Banco de España.</p>',
        solucion: '<p><strong>Que escribas tu clave en un enlace.</strong> Tu banco nunca te pide tus claves por correo, mensaje o teléfono.</p>' },
      { tipo: 'opciones', enunciado: '<p>Te llama alguien que dice ser de tu banco y te pide el código que te acaba de llegar por mensaje. ¿Qué haces?</p>',
        opciones: ['Cuelgas y llamas tú al número oficial de tu banco', 'Se lo das, porque ya conoce tus datos', 'Le pides que te vuelva a llamar más tarde'], correcta: 0,
        pista: '<p>Verifica siempre por un canal que tú elijas.</p>',
        solucion: '<p><strong>Cuelgas y llamas tú al número oficial.</strong> Que conozca algunos de tus datos no prueba que sea del banco.</p>' },
      { tipo: 'opciones', enunciado: '<p>Un supuesto crédito exprés te pide $1 500 por adelantado para aprobarlo. ¿Qué es?</p>',
        opciones: ['Un trámite normal de cualquier crédito', 'Un seguro que siempre se paga antes', 'Una señal de fraude: un crédito legítimo no pide pagos por adelantado'], correcta: 2,
        pista: '<p>Recuerda lo que dice la CONDUSEF sobre los anticipos.</p>',
        solucion: '<p><strong>Una señal de fraude.</strong> Según la CONDUSEF, un crédito legítimo no pide anticipos.</p>' },
      { tipo: 'numero', enunciado: '<p>Ya diste $1 500 por adelantado a un falso crédito, y ahora te piden $800 más para "liberarlo". Si pagaras, ¿cuánto habrías perdido en total?</p>', respuesta: 1500 + 800,
        pista: '<p>Suma los dos pagos.</p>',
        solucion: '<p>1 500 + 800 = <strong>$2 300</strong>. Lo mejor es no pagar más y denunciar.</p>' },
      { tipo: 'numero', enunciado: '<p>Un mensaje te da un plazo de una hora, trae un enlace y te pide tu clave. ¿Cuántas señales de alerta tiene?</p>', respuesta: 3,
        pista: '<p>Cuenta: urgencia, enlace y petición de clave.</p>',
        solucion: '<p><strong>3 señales</strong>: urgencia, un enlace y la petición de tu clave.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el fraude por correo en el que alguien se hace pasar por tu banco para robar tus claves?</p>',
        respuestas: ['phishing', 'el phishing', 'fishing', 'suplantación de identidad'],
        pista: '<p>Es una palabra en inglés que suena como "pescar".</p>',
        solucion: '<p>El <strong><span lang="en">phishing</span></strong>.</p>' },
    ],
    fuentes: [REV_FRAUDES, REV_CONVENCE, BDE_PHISHING],
  });

  // ------------------------------------------------------------------
  const NIVELES = [1, 2, 4, 8];
  const PIRAMIDE = diagrama([0, 12], [0, 5.4], [
    ...NIVELES.flatMap((n, nivel) => {
      const y0 = 4.0 - nivel * 1.2, ancho = 0.9, hueco = 0.25, total = n * ancho + (n - 1) * hueco, x0 = 7.3 - total / 2;
      return [
        ...Array.from({ length: n }, (_, i) => caja(x0 + i * (ancho + hueco), y0, x0 + i * (ancho + hueco) + ancho, y0 + 0.8, nivel === 0)),
        txt(1.3, y0 + 0.4, `nivel ${nivel}: ${n}`),
      ];
    }),
  ], 'Una pirámide de cuatro filas de cuadros. Arriba, en el nivel 0, un cuadro sombreado: quien está en la cima. Debajo, nivel 1: 2 cuadros; nivel 2: 4; nivel 3: 8. Cada fila tiene el doble que la anterior.');

  L('Esquemas piramidales y promesas de dinero fácil', {
    objetivo: 'Explicar cómo funcionan los esquemas piramidales y Ponzi, calcular por qué siempre se rompen y reconocer sus señales para no caer y saber dónde denunciar.',
    explicacion: `
      <p>Una persona conocida te invita a un grupo: aportas $1 000 y en unas semanas recibes $8 000, "sin riesgo", solo por invitar a otras personas. Le llaman "flor de la abundancia" o "rueda de la amistad", y en redes sociales todos parecen ganar. Antes de entrar, vale la pena hacer una cuenta.</p>
      <h3>Cómo funciona</h3>
      <p>Un <strong>esquema piramidal</strong> es un falso negocio en el que lo que ganan los de arriba sale del dinero de quienes van entrando, no de una actividad real. La CONDUSEF, el organismo de México que protege a los usuarios de servicios financieros, lo describe así: quien está en la punta invita a dos personas, que a su vez invitan a otras dos, y así sucesivamente. Las aportaciones van a quien está en la cima, y los demás suben de nivel con la esperanza de llegar arriba y cobrar. A veces se disfraza con la venta de un producto que no vale nada o que ni siquiera existe.</p>
      ${PIRAMIDE}
      <h3>Por qué siempre se rompe</h3>
      <p>Fíjate en la cuenta. Si cada persona invita a dos, en cada nivel hace falta el doble de gente que en el anterior: 1, 2, 4, 8, 16… En el nivel n hacen falta 2ⁿ personas, como viste en "Función exponencial: crecimiento y decaimiento". En el nivel 10 ya son 1 024; en el nivel 20, más de un millón, y en el nivel 30, más de mil millones.</p>
      <p>Por eso la CONDUSEF explica que estos sistemas necesitan seguir captando dinero de gente nueva hasta que se vuelven insostenibles, y que cuando la cadena se rompe, quienes aportaron no pueden recuperar su dinero. Fíjate además en esto: como cada nivel tiene el doble que el anterior, el último nivel tiene más personas que todos los de arriba juntos. Siempre son más los que pierden que los que cobran.</p>
      <h3>El esquema Ponzi</h3>
      <p>Una variante es el <strong>esquema Ponzi</strong>, que no pide reclutar: promete ganancias muy altas por "invertir" y paga a los primeros con el dinero de los que llegan después. Lleva el nombre de Carlo Ponzi, que, según la CONDUSEF, prometía en Estados Unidos ganancias de 40% en 90 días con un negocio de cupones postales que nunca hizo. Funciona igual que la pirámide: mientras entra dinero nuevo parece real, y cuando deja de entrar, se derrumba.</p>
      <h3>Señales de alerta</h3>
      <p>La Superintendencia Financiera de Colombia y la CONDUSEF coinciden en señales como estas:</p>
      <ul>
        <li>Prometen ganancias muy altas en poco tiempo, muy por encima de lo que ofrecen las instituciones autorizadas.</li>
        <li>Te piden reclutar a más personas para poder cobrar.</li>
        <li>Muestran testimonios de éxito o figuras públicas, sin explicar de dónde sale la ganancia.</li>
        <li>Usan palabras como "ayuda mutua", "solidaridad" o "colaboración" para parecer legales.</li>
        <li>Usan contratos o palabras técnicas para dar apariencia de seguridad.</li>
      </ul>
      <h3>Qué hacer</h3>
      <p>Antes de dar dinero, revisa si quien lo pide está autorizado en el registro oficial de tu país: la CONDUSEF tiene uno en México, y en España el Banco de España recomienda revisar el registro y las advertencias de la CNMV, el organismo que vigila los mercados de inversión. La CONDUSEF advierte que no puede defenderte si pierdes dinero en una pirámide, porque no es una institución financiera. Si te invitan a una, o ya entraste, denúncialo ante la policía y ante el organismo que vigila el sistema financiero de tu país; en Colombia, la Superintendencia Financiera recibe estas denuncias. En la unidad Inversión verás por qué una ganancia alta nunca viene sin riesgo.</p>
      <p class="nota"><strong>Trampa común:</strong> confiar porque quien te invita es alguien conocido o porque "a otras personas sí les pagaron". Los primeros cobran con el dinero de los nuevos; que a alguien le hayan pagado no prueba que el negocio sea real.</p>`,
    ejemplo: `
      <p>En una "flor" de ejemplo, para que tú cobres $8 000 tienen que entrar debajo de ti 8 personas nuevas que aporten $1 000 cada una. Y para que cada una de ellas cobre, tienen que entrar otras 8 por cada una. ¿Cuántas personas nuevas hacen falta en cada ronda?</p>
      <ol class="pasos-ej">
        <li>Para que tú cobres: 8 personas, porque 8 × 1 000 = 8 000.</li>
        <li>Para que esas 8 cobren: 8 × 8 = 64 personas nuevas.</li>
        <li>Para que esas 64 cobren: 64 × 8 = 512.</li>
        <li>En la siguiente ronda: 512 × 8 = 4 096. Cada ronda multiplica por 8, así que en seis rondas harían falta 8⁶ = 262 144 personas nuevas.</li>
        <li>Fíjate: en cualquier momento, la mayoría de quienes aportaron todavía no ha cobrado. Si dejan de entrar personas nuevas, esa mayoría pierde sus $1 000.</li>
      </ol>
      <p>Resultado: <span class="resultado">cada ronda necesita 8 veces más gente, y muy pronto ya no hay a quién invitar</span>.</p>
      <p class="nota"><strong>Error común:</strong> pensar que, si tú cobraste, el sistema funciona. Cobraste con el dinero de personas que muy probablemente lo van a perder.</p>`,
    vidaReal: `
      <p>Hacer la cuenta a tiempo te protege de perder tu dinero y el de tus cercanos:</p>
      <ul>
        <li>Cuando te inviten a un grupo que promete multiplicar tu dinero, sabes hacer la cuenta.</li>
        <li>Reconoces las señales aunque le cambien el nombre al grupo.</li>
        <li>Puedes explicarle a tu familia por qué esos grupos terminan mal.</li>
        <li>Antes de entregar dinero, revisas si quien lo recibe está autorizado.</li>
      </ul>`,
    ejercicios: [
      { tipo: 'numero', enunciado: '<p>En una pirámide, cada persona invita a 2. ¿Cuántas personas hacen falta en el nivel 10?</p>', respuesta: 2 ** 10,
        pista: '<p>En el nivel n hacen falta 2ⁿ personas.</p>',
        solucion: '<p>2¹⁰ = <strong>1 024</strong> personas.</p>' },
      { tipo: 'numero', enunciado: '<p>¿Cuántas personas hay en total en los niveles 0, 1, 2 y 3 de la pirámide del diagrama?</p>', respuesta: 1 + 2 + 4 + 8,
        pista: '<p>Suma las personas de cada nivel.</p>',
        solucion: '<p>1 + 2 + 4 + 8 = <strong>15</strong>. Fíjate que el nivel 3, con 8, tiene más que los otros tres juntos.</p>' },
      { tipo: 'numero', enunciado: '<p>Un esquema Ponzi promete 40% en 90 días, como el de Carlo Ponzi. Si entregas $5 000, ¿cuánto te dicen que recibirás?</p>', respuesta: 5000 * 1.4,
        pista: '<p>Subir 40% es multiplicar por 1.40.</p>',
        solucion: '<p>5 000 × 1.40 = <strong>$7 000</strong>. Una promesa así, en tan poco tiempo, es una señal de alerta.</p>' },
      { tipo: 'opciones', enunciado: '<p>En una pirámide, ¿de dónde sale lo que cobran los de arriba?</p>',
        opciones: ['De un negocio real que vende productos', 'Del dinero que aportan las personas que van entrando', 'De los intereses que paga un banco'], correcta: 1,
        pista: '<p>Recuerda cómo la describe la CONDUSEF.</p>',
        solucion: '<p><strong>Del dinero de las personas que van entrando.</strong> Por eso necesita reclutar sin parar y termina por romperse.</p>' },
      { tipo: 'opciones', enunciado: '<p>Según la Superintendencia Financiera de Colombia, ¿cuál de estas es una señal de un esquema ilegal?</p>',
        opciones: ['Ofrecen ganancias muy altas en poco tiempo', 'Están autorizados y te explican los riesgos por escrito', 'Te advierten que una ganancia alta trae más riesgo'], correcta: 0,
        pista: '<p>Busca la promesa que suena demasiado buena.</p>',
        solucion: '<p><strong>Ofrecer ganancias muy altas en poco tiempo.</strong> Las otras dos son propias de una institución seria.</p>' },
      { tipo: 'texto', enunciado: '<p>¿Cómo se llama el fraude que paga a los primeros con el dinero de los que llegan después, sin pedirles que recluten?</p>',
        respuestas: ['esquema ponzi', 'ponzi', 'un esquema ponzi', 'el esquema ponzi', 'fraude ponzi', 'estafa ponzi'],
        pista: '<p>Lleva el apellido de un famoso estafador italiano.</p>',
        solucion: '<p>Un <strong>esquema Ponzi</strong>.</p>' },
    ],
    fuentes: [REV_PIRAMIDES, REV_FRAUDES, SFC_TIPS, SFC_PIRAMIDES, BDE_CHIRINGUITO],
  });
})();
