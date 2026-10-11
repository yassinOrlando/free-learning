// Revisión automática del sitio. Ejecutar con: node verificar.js
// Comprueba el validador de respuestas y que cada lección esté completa y sea coherente con el temario.
const assert = require('assert');
const path = require('path');
const fs = require('fs');
globalThis.window = globalThis;
require('./js/textos.js');
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
// --- Pinyin con tonos (no usa normalizarTexto: ahí "ma" y "mā" valen lo mismo) ---
const py = (esperado, escrito) => E.esCorrecta({ tipo: 'pinyin', respuestas: [esperado] }, escrito);
[['mā', 'ma1'], ['mā', 'MĀ'], ['nǐ hǎo', 'ni3hao3'], ['nǐ hǎo', 'nǐhǎo'], ['nǐ hǎo', 'ni3 hao3'], ['lǜ', 'lv4'], ['lǜ', 'lu:4'], ['nǚ', 'nü3'],
 ['mā ma', 'māma'], ['mā ma', 'ma1ma'], ['mā ma', 'ma1 ma5'], ['nǐ', 'nĭ'], ["xī ān", "xī'ān"]]
  .forEach(([e, s]) => assert(py(e, s), `"${s}" debería valer el pinyin ${e}`));
[['mā', 'ma'], ['mā', 'má'], ['mā', 'ma4'], ['nǐ hǎo', 'ni hao'], ['nǐ hǎo', 'ni3hao'], ['mā ma', 'mama1'], ['lǜ', 'lu4'], ['mā', '']]
  .forEach(([e, s]) => assert(!py(e, s), `"${s}" no debería valer el pinyin ${e}`));
assert(E.esCorrecta({ tipo: 'texto', respuestas: ['mā'] }, 'ma'), 'normalizarTexto sigue quitando acentos en las demás materias');
// --- Ordenar ---
const frase = { tipo: 'ordenar', respuesta: ['我', '是', '学生'], alternativas: [['学生', '是', '我']] };
assert(E.esCorrecta(frase, '我|是|学生') && E.esCorrecta(frase, '学生|是|我') && !E.esCorrecta(frase, '是|我|学生') && !E.esCorrecta(frase, '我|是'), 'ordenar');
[2, 3, 4, 7].forEach((n) => assert(E.barajar(n).length === n && new Set(E.barajar(n)).size === n && E.barajar(n).some((k, i) => k !== i), `barajar(${n})`));
// --- Chino: zh() ---
const han = globalThis.zh('你好', 'nǐ hǎo', { es: 'hola', audio: 'audio/zh/x.m4a' });
assert(han.includes('<span class="zh__han" lang="zh-Hans">你好</span>') && han.includes('lang="zh-Latn-pinyin">nǐ hǎo<') && han.includes('data-oir="你好"')
  && han.includes('data-audio="audio/zh/x.m4a"') && han.includes('aria-label="Escuchar nǐ hǎo"') && han.includes('<svg aria-hidden="true"'), 'zh() con lang, audio y etiqueta');
assert(globalThis.zh('氵') === '<span class="zh__han" lang="zh-Hans">氵</span>', 'zh() sin pinyin: solo el carácter');
assert(!globalThis.zh('', 'a').includes('<button') && globalThis.zh('', 'mā', { voz: '妈' }).includes('data-oir="妈"'), 'zh() sin caracteres');
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
const audios = new Set();
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
    } else if (ej.tipo === 'pinyin') {
      // Cada sílaba separada por espacio y con un tono como máximo: así el motor sabe a qué sílaba toca cada tono.
      if (!ej.respuestas?.length) falla(`${d}: sin respuestas`);
      (ej.respuestas || []).forEach((r) => {
        const malas = r.trim().split(/\s+/).filter((s) => (s.normalize('NFD').match(/[\u0300\u0301\u0304\u030C]|[1-4]/g) || []).length > 1);
        if (malas.length || !E.esCorrecta(ej, r)) falla(`${d}: pinyin "${r}" debe llevar las sílabas separadas por espacio`);
      });
    } else if (ej.tipo === 'ordenar') {
      const listas = [ej.respuesta, ...(ej.alternativas || [])];
      if (!listas.every((l) => Array.isArray(l) && l.length >= 2 && l.every((p) => typeof p === 'string' && p && !p.includes('|')))) falla(`${d}: piezas inválidas`);
      else {
        const piezas = (l) => [...l].sort().join('|');
        if (listas.some((l) => piezas(l) !== piezas(ej.respuesta))) falla(`${d}: una alternativa usa piezas distintas`);
        if (listas.some((l) => l.join('|') === E.barajar(ej.respuesta.length).map((k) => ej.respuesta[k]).join('|'))) falla(`${d}: el orden inicial ya es una respuesta correcta`);
        if (ej.pinyin && ej.pinyin.length !== ej.respuesta.length) falla(`${d}: "pinyin" debe tener una entrada por pieza`);
        if (/\p{Script=Han}/u.test(ej.respuesta.join('')) && ej.lang !== 'zh-Hans') falla(`${d}: piezas en chino sin lang: 'zh-Hans'`);
      }
    } else falla(`${d}: tipo desconocido "${ej.tipo}"`);
    // Escucha: nada depende solo del audio.
    if (ej.escucha && (!(ej.escucha.voz || ej.escucha.audio) || typeof ej.sinAudio !== 'string' || ej.sinAudio.trim().length < 10)) falla(`${d}: "escucha" necesita voz o audio, y "sinAudio" con la alternativa escrita`);
    if (ej.escucha?.audio) audios.add(ej.escucha.audio);
  });
  const html = [L.objetivo, L.explicacion, L.ejemplo, L.vidaReal, ...(L.ejercicios || []).flatMap((e) => [e.enunciado, e.pista, e.solucion, e.sinAudio, ...(e.opciones || [])])].join('\n');
  for (const [, ruta] of html.matchAll(/data-audio="([^"]+)"/g)) audios.add(ruta);
  // Todo carácter chino va dentro de lang="zh-Hans" (lo pone zh()), para que el lector de pantalla cambie de voz.
  if (/\p{Script=Han}/u.test(html.replace(/<span[^>]*lang="zh-Hans"[^>]*>[^<]*<\/span>/g, '').replace(/(data-oir|aria-label)="[^"]*"/g, ''))) falla(`${donde}: caracteres chinos fuera de zh()`);
}

// --- Grabaciones: existen, tienen crédito y no engordan el zip ---
for (const ruta of audios) {
  const creditos = path.join(__dirname, path.dirname(ruta), 'CREDITOS.md');
  if (!fs.existsSync(path.join(__dirname, ruta))) falla(`audio: no existe ${ruta}`);
  else if (!fs.existsSync(creditos) || !fs.readFileSync(creditos, 'utf8').includes(path.basename(ruta))) falla(`audio: ${ruta} sin crédito en ${path.dirname(ruta)}/CREDITOS.md`);
}
const peso = (dir) => !fs.existsSync(dir) ? 0 : fs.readdirSync(dir, { withFileTypes: true })
  .reduce((n, f) => n + (f.isDirectory() ? peso(path.join(dir, f.name)) : fs.statSync(path.join(dir, f.name)).size), 0);
if (peso(path.join(__dirname, 'audio')) > 2 * 1024 * 1024) falla('audio/: pasa de 2 MB');

if (errores) { console.error(`\n${errores} problema(s).`); process.exit(1); }
console.log(`✓ Validador OK · ${Object.keys(LECCIONES).length} lecciones revisadas sin problemas.`);
