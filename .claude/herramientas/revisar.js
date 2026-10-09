// Revisión rápida de un archivo de unidad, sin modelo. Uso: node .claude/herramientas/revisar.js lecciones/<materia>/<unidad>.js
// Imprime por lección palabras por sección, términos en negritas, ejercicios y reparto de `correcta:`, y busca
// los errores de formato comunes. Sale con código 1 si algo marca ✗ (los ⚠ son avisos para revisar a mano).
const fs = require('fs');
const path = require('path');
const raiz = path.resolve(__dirname, '../..');
globalThis.window = globalThis;
require(path.join(raiz, 'js/temario.js'));
require(path.join(raiz, 'js/ejercicios.js'));
const archivo = path.resolve(process.argv[2] || '');
if (!fs.existsSync(archivo)) { console.error('Uso: node .claude/herramientas/revisar.js lecciones/<materia>/<unidad>.js'); process.exit(2); }
const antes = new Set(Object.keys(LECCIONES));
require(archivo);
const claves = Object.keys(LECCIONES).filter((k) => !antes.has(k));

const RANGOS = { explicacion: [400, 650], ejemplo: [120, 180], vidaReal: [60, 90] };
const titulos = new Set(TEMARIO.flatMap((m) => m.unidades.flatMap((u) => u.lecciones)));
const limpiar = (h) => h.replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ');
const palabras = (h) => limpiar(h).split(/\s+/).filter((w) => /[\p{L}\d]/u.test(w)).length;
// Términos nuevos: <strong> fuera de las notas ("Trampa común", "Error común") y de las líneas que son solo una fórmula.
const terminos = (h) => (h.replace(/<p class="nota">[\s\S]*?<\/p>/g, '').replace(/<p>\s*<strong>[^<]*<\/strong>\s*<\/p>/g, '').match(/<strong>/g) || []).length;
const PROHIBIDOS = [[/<sup>|<sub>/, 'usa exponentes Unicode'], [/<h2|<h4/, 'solo <h3> dentro de las secciones'], [/NaN/, 'NaN en el HTML'],
  [/simplemente/i, '"simplemente"'], [/¡/, 'signo ¡'], [/href="#/, 'enlace interno #']];

let errores = 0;
const mal = (msg) => { errores++; return `✗ ${msg}`; };
for (const k of claves) {
  const L = LECCIONES[k];
  const partes = Object.entries(RANGOS).map(([campo, [min, max]]) => {
    const n = palabras(L[campo]);
    return n < min || n > max ? mal(`${campo} ${n} (${min}–${max})`) : `${campo} ${n}`;
  });
  const t = terminos(L.explicacion);
  partes.push(t > 3 ? mal(`términos ${t} (máx. 3)`) : `términos ${t}`);
  const correctas = L.ejercicios.filter((e) => e.tipo === 'opciones').map((e) => e.correcta);
  partes.push(`ejercicios ${L.ejercicios.length}`, `correctas [${correctas.join(',')}]`);
  console.log(`${k}\n  ${partes.join(' · ')}`);

  const html = [L.objetivo, L.explicacion, L.ejemplo, L.vidaReal, ...L.ejercicios.flatMap((e) => [e.enunciado, e.pista, e.solucion, ...(e.opciones || [])])].join('\n');
  for (const [re, msg] of PROHIBIDOS) if (re.test(html)) console.log('  ' + mal(msg));
  if (correctas.length > 2 && new Set(correctas).size === 1) console.log(`  ⚠ todas las opciones correctas en el índice ${correctas[0]}`);
  for (const [, cita] of limpiar(html).matchAll(/"([A-ZÁÉÍÓÚÑ¿][^"]{3,90})"/g))
    if (!titulos.has(cita) && /\s/.test(cita)) console.log(`  ⚠ ¿título citado? "${cita}" no está en el temario`);
}
const texto = fs.readFileSync(archivo, 'utf8');
texto.split('\n').forEach((linea, i) => {
  if (/'[^'`\n]*\$\{[^'`\n]*'/.test(linea)) console.log(mal(`línea ${i + 1}: \${…} dentro de comillas simples no se interpola`));
});
if (!claves.length) console.log(mal('el archivo no registró ninguna lección nueva'));
console.log(errores ? `\n${errores} problema(s).` : `\n✓ ${claves.length} lecciones sin problemas de formato.`);
process.exit(errores ? 1 : 0);
