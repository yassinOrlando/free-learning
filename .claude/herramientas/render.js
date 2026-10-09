// Convierte las gráficas de una unidad en PNG para revisarlas a ojo. Uso: node .claude/herramientas/render.js lecciones/<materia>/<unidad>.js [carpeta]
// Usa qlmanage (macOS). En el PNG el relleno negro y el color único vienen de que qlmanage no aplica el CSS: no son errores.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const raiz = path.resolve(__dirname, '../..');
globalThis.window = globalThis;
require(path.join(raiz, 'js/temario.js'));
require(path.join(raiz, 'js/ejercicios.js'));
const archivo = path.resolve(process.argv[2] || '');
if (!fs.existsSync(archivo)) { console.error('Uso: node .claude/herramientas/render.js lecciones/<materia>/<unidad>.js [carpeta]'); process.exit(2); }
const salida = path.resolve(process.argv[3] || path.join(os.tmpdir(), 'render-' + path.basename(archivo, '.js')));
fs.rmSync(salida, { recursive: true, force: true });
fs.mkdirSync(salida, { recursive: true });
const antes = new Set(Object.keys(LECCIONES));
require(archivo);
const css = '<style>text{font:11px sans-serif;fill:#ddd}.graf-etq{font-weight:700;fill:#fff}line,path,polygon,circle{stroke:#e0a040}.graf-rejilla{stroke:#444}rect{fill:#1c1a17}</style>';
const svgs = [];
for (const [k, L] of Object.entries(LECCIONES)) {
  if (antes.has(k)) continue;
  const html = [L.explicacion, L.ejemplo, ...L.ejercicios.flatMap((e) => [e.enunciado, ...(e.opciones || [])])].join('\n');
  (html.match(/<svg[\s\S]*?<\/svg>/g) || []).forEach((s) => {
    const n = String(svgs.length + 1).padStart(2, '0');
    const f = path.join(salida, `d${n}.svg`);
    fs.writeFileSync(f, s.replace(/<svg([^>]*)>/, (m, a) => `<svg xmlns="http://www.w3.org/2000/svg"${a} style="background:#1c1a17">${css}`).replace(/var\(--[^)]+\)/g, '#e0a040'));
    svgs.push([f, k]);
  });
}
if (svgs.length) execFileSync('qlmanage', ['-t', '-s', '900', '-o', salida, ...svgs.map(([f]) => f)], { stdio: 'ignore' });
svgs.forEach(([f, k]) => console.log(`${f}.png  (${k})`));
console.log(`${svgs.length} gráfica(s). Relleno negro o color único = qlmanage, no es error.`);
