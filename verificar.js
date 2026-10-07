// Revisión automática del sitio. Ejecutar con: node verificar.js
// Comprueba el validador de respuestas y que cada lección esté completa y sea coherente con el temario.
const assert = require('assert');
const path = require('path');
globalThis.window = globalThis;
require('./js/temario.js');
require('./js/ejercicios.js');
const { Ejercicios: E, TEMARIO, LECCIONES, slug } = globalThis;

// --- Validador de números ---
const acepta = (respuesta, ...escritos) => escritos.forEach((s) =>
  assert(E.esCorrecta({ tipo: 'numero', respuesta }, s), `"${s}" debería valer ${respuesta}`));
const rechaza = (respuesta, ...escritos) => escritos.forEach((s) =>
  assert(!E.esCorrecta({ tipo: 'numero', respuesta }, s), `"${s}" no debería valer ${respuesta}`));
acepta(0.5, '0.5', '.5', '0,5', '1/2', ' 1 / 2 ', '2/4');
acepta(1.5, '1 1/2', '1,5', '3/2');
acepta(-3, '-3', '−3', '-6/2');
acepta(25, '25', '25%', '25 %');
acepta(1500, '1500', '1,500', '1.500', '1 500');
acepta(1234567.5, '1,234,567.5', '1.234.567,5');
acepta(300000, '3e5', '3x10^5', '3 × 10^5', '3·10^5');
acepta(0.00042, '4.2×10^-4', '4,2 x 10^(-4)', '4.2×10⁻⁴', '4,2 · 10⁻⁴');
acepta(9e16, '9×10¹⁶', '9 x 10⁺¹⁶');
rechaza(9e16, '9×10¹⁵', '9¹⁶');
rechaza(0.5, '', 'abc', '1/0', '0.55', '5');
rechaza(25, '2.5', '250');
acepta(4, 'x = 4', 'x=4', 'y = 4');
// --- Validador de expresiones ---
const expr = (esperada, escrita, vars) => E.esCorrecta({ tipo: 'expresion', respuesta: esperada, variables: vars }, escrita);
[['3x+5', '5 + 3*x'], ['3x+5', '5+3x'], ['(x+1)^2', 'x^2+2x+1'], ['x^2', 'x²'], ['2(x-3)', '2x − 6'],
 ['(x+2)(x-2)', 'x^2-4'], ['x/2', '0,5x'], ['-x^2+1', '1 - x^2'], ['1/(x+2)', '1/(2+x)'], ['x^3', 'x·x·x']]
  .forEach(([e, s]) => assert(expr(e, s), `"${s}" debería equivaler a ${e}`));
assert(expr('2x+3y', '3y + 2x', ['x', 'y']), 'dos variables');
assert(expr('3x+2', 'y = 2 + 3x') && expr('3x+2', 'Y=3x+2'), 'acepta el prefijo y =');
assert(expr('6x+4', 'f(x) = 6x+4') && expr('6x+4', "f'(x)=4+6x") && expr('6x+4', 'f′(x) = 6x + 4'), 'acepta f(x) = y f′(x) =');
acepta(7, "f'(2) = 7", 'f′(2)=7');
assert(expr('x^2y', 'y·x²', ['x', 'y']), 'implícita con dos variables');
['3x+4', 'alert(1)', '', '3x+', 'x^2+2x', '(x+1', 'a+5'].forEach((s) =>
  assert(!expr('3x+5', s), `"${s}" no debería equivaler a 3x+5`));
const simp = (esperada, escrita) => E.esCorrecta({ tipo: 'expresion', respuesta: esperada, simplificar: true }, escrita);
assert(simp('x^2 + 6x + 9', '9 + 6x + x²'), 'desarrollo reordenado aceptado');
assert(simp('3x + 2', 'y = 2 + 3x'), 'prefijo y = con simplificar');
assert(simp('6x + 4', 'f′(x) = 4 + 6x'), 'prefijo f′(x) = con simplificar');
assert(!simp('x^2 + 6x + 9', '(x+3)^2'), 'copiar el enunciado no debe valer');
assert(!simp('x^6', 'x^5*x^3/x^2'), 'sin simplificar no debe valer');
assert(simp('3/(2x)', '3/(2*x)') && simp('4x + 13', '13+4x'), 'formas simplificadas equivalentes');
assert(E.esCorrecta({ tipo: 'texto', respuestas: ['Máximo común divisor'] }, '  maximo  COMUN divisor. '));
// --- Gráficas ---
const svg = globalThis.grafica({ funciones: [{ f: (x) => Math.log(x) }], puntos: [{ x: 1, y: 0, etiqueta: 'A' }], descripcion: 'prueba "x"' });
assert(svg.includes('<svg') && /<path[^>]+d="M[\d.]/.test(svg) && svg.includes('aria-label="prueba &quot;x&quot;"') && !svg.includes('NaN'), 'grafica() debe generar un SVG válido');
const fig = globalThis.grafica({ x: [0, 4], y: [0, 3], proporcional: true, ejes: false, descripcion: 'triángulo',
  figuras: [{ tipo: 'poligono', puntos: [[0, 0], [4, 0], [0, 3]], relleno: true }, { tipo: 'circulo', x: 2, y: 1, r: 1 },
    { tipo: 'angulo', x: 0, y: 0, desde: 0, hasta: 90, etiqueta: '90°' }, { tipo: 'linea', desde: [0, 0], hasta: [2, 2], punteada: true }, { tipo: 'texto', x: 2, y: 0, texto: '4 cm' }] });
assert(fig.includes('viewBox="0 0 400 313"') && fig.includes('<polygon') && fig.includes('<circle') && fig.includes('A') && !fig.includes('NaN') && !fig.includes('graf-rejilla'), 'figuras con proporcional y sin ejes');
assert(E.esCorrecta({ tipo: 'opciones', correcta: 2 }, '2'));
assert(!E.esCorrecta({ tipo: 'opciones', correcta: 2 }, '1'));

// --- Lecciones ---
let errores = 0;
const falla = (msg) => { errores++; console.error('✗ ' + msg); };
const enTemario = new Set();

for (const m of TEMARIO) {
  for (const u of m.unidades) {
    u.lecciones.forEach((t) => enTemario.add(`${m.id}/${slug(t)}`));
    if (!u.archivo) continue;
    require(path.join(__dirname, u.archivo));
    u.lecciones.forEach((t) => {
      if (!LECCIONES[`${m.id}/${slug(t)}`]) falla(`${u.archivo}: falta la lección "${t}"`);
    });
  }
}

for (const [clave, L] of Object.entries(LECCIONES)) {
  const donde = `${clave}`;
  if (!enTemario.has(clave)) falla(`${donde}: el título no coincide con ninguna lección del temario`);
  for (const campo of ['objetivo', 'explicacion', 'ejemplo', 'vidaReal']) {
    if (typeof L[campo] !== 'string' || L[campo].trim().length < 20) falla(`${donde}: falta "${campo}"`);
  }
  if (!Array.isArray(L.fuentes) || !L.fuentes.length) falla(`${donde}: sin fuentes`);
  (L.fuentes || []).forEach((f) => { if (!f.nombre || !/^https:\/\//.test(f.url)) falla(`${donde}: fuente inválida ${JSON.stringify(f)}`); });
  if (!Array.isArray(L.ejercicios) || L.ejercicios.length < 3) falla(`${donde}: menos de 3 ejercicios`);
  (L.ejercicios || []).forEach((ej, i) => {
    const d = `${donde} ejercicio ${i + 1}`;
    if (!ej.enunciado || !ej.pista || !ej.solucion) falla(`${d}: falta enunciado, pista o solución`);
    if (ej.tipo === 'numero') {
      if (!Number.isFinite(ej.respuesta)) falla(`${d}: respuesta no numérica`);
      else if (!E.esCorrecta(ej, String(ej.respuesta))) falla(`${d}: no acepta su propia respuesta`);
    } else if (ej.tipo === 'opciones') {
      if (!(ej.opciones?.length >= 2) || !(ej.correcta >= 0 && ej.correcta < ej.opciones.length)) falla(`${d}: opciones o índice correcto inválidos`);
    } else if (ej.tipo === 'expresion') {
      if (typeof ej.respuesta !== 'string' || !E.parsearExpresion(ej.respuesta, ej.variables)) falla(`${d}: expresión de respuesta no se puede interpretar`);
      else if (!E.esCorrecta(ej, ej.respuesta)) falla(`${d}: no acepta su propia respuesta`);
    } else if (ej.tipo === 'texto') {
      if (!ej.respuestas?.length || !E.esCorrecta(ej, ej.respuestas[0])) falla(`${d}: respuestas inválidas`);
    } else falla(`${d}: tipo desconocido "${ej.tipo}"`);
  });
}

if (errores) { console.error(`\n${errores} problema(s).`); process.exit(1); }
console.log(`✓ Validador OK · ${Object.keys(LECCIONES).length} lecciones revisadas sin problemas.`);
