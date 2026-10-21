// Aprobación del plan de una unidad. Sin modelo.
// Un plan aprobado se marca con un archivo APROBADO en la carpeta de trabajo de la unidad.
// El archivo guarda el hash del plan: si el plan cambia después de aprobarse, la aprobación
// caduca y el gate vuelve a bloquear la construcción.
//
// Uso:
//   node .claude/herramientas/plan.js estado
//   node .claude/herramientas/plan.js aprobar <materia>/<unidad> [quien]
//   node .claude/herramientas/plan.js hook-requiere   (stdin: JSON de un hook de Claude Code)
//   node .claude/herramientas/plan.js hook-prompt     (stdin: JSON de un hook de Claude Code)
//   node .claude/herramientas/plan.js requiere <ruta> (exit 2 = bloqueado)
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const RAIZ = path.resolve(__dirname, '../..');
const TRABAJO = path.join(RAIZ, '.claude', 'trabajo');
const PLAN = 'plan.md';
const APROBADO = 'APROBADO';

const hash = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex').slice(0, 16);

function unidadDe(ruta) {
  const rel = path.resolve(ruta).startsWith(RAIZ) ? path.relative(RAIZ, path.resolve(ruta)) : ruta;
  // lecciones/<materia>/<unidad>.js
  let m = rel.match(/(?:^|\/)lecciones\/([^/]+)\/([^/]+)\.js$/);
  if (m) return { dir: `${m[1]}/${m[2]}`, carpeta: path.join(TRABAJO, m[1], m[2]) };
  // .claude/trabajo/<materia>/<unidad>/ficha*.md
  m = rel.match(/(?:^|\/)\.claude\/trabajo\/([^/]+)\/([^/]+)\/(ficha[^/]*)\.md$/);
  if (m) return { dir: `${m[1]}/${m[2]}`, carpeta: path.join(TRABAJO, m[1], m[2]) };
  return null;
}

function planDe(carpeta) {
  const p = path.join(carpeta, PLAN);
  return fs.existsSync(p) ? p : null;
}

// Sin plan no hay gate: son unidades viejas, escritas antes del flujo, y se editan directo.
function estado(carpeta) {
  const plan = planDe(carpeta);
  if (!plan) return { plan: null, aprobado: false, motivo: 'sin plan: unidad fuera del flujo' };
  const marca = path.join(carpeta, APROBADO);
  if (!fs.existsSync(marca)) return { plan, aprobado: false, motivo: 'plan sin aprobar' };
  let guardado = null;
  try { guardado = JSON.parse(fs.readFileSync(marca, 'utf8')); } catch {}
  if (!guardado || guardado.hash !== hash(plan)) {
    return { plan, aprobado: false, motivo: 'el plan cambió después de aprobarse' };
  }
  return { plan, aprobado: true, marca: guardado };
}

function unidadActual() {
  const f = path.join(RAIZ, 'ESTADO.md');
  if (!fs.existsSync(f)) return null;
  const m = fs.readFileSync(f, 'utf8').match(/^-?\s*Unidad:\s*(\S+)/m);
  return m ? m[1] : null;
}

function aprobar(dir, quien) {
  const [materia, unidad] = dir.split('/');
  if (!materia || !unidad) return { ok: false, error: 'indica <materia>/<unidad>' };
  const carpeta = path.join(TRABAJO, materia, unidad);
  const plan = planDe(carpeta);
  if (!plan) return { ok: false, error: `no hay ${PLAN} en ${carpeta}` };
  fs.writeFileSync(path.join(carpeta, APROBADO), JSON.stringify({
    plan: `${materia}/${unidad}`,
    hash: hash(plan),
    quien: quien || 'el usuario',
    cuando: new Date().toISOString(),
  }, null, 2) + '\n');
  return { ok: true, dir };
}

// El hook recibe un path y solo bloquea si ese path pertenece a una unidad con plan.
function requiere(ruta) {
  const u = unidadDe(ruta);
  if (!u) return { ok: true };
  const e = estado(u.carpeta);
  if (e.aprobado) return { ok: true };
  if (!e.plan) return { ok: true };
  return {
    ok: false,
    error: `el plan de ${u.dir} no está aprobado (${e.motivo}). Pide al usuario que apruebe el plan `
      + `(comando /aprobar-plan ${u.dir}) antes de investigar o construir.`,
  };
}

function leerStdin() {
  try { return fs.readFileSync(0, 'utf8'); } catch { return ''; }
}

const [, , cmd, ...args] = process.argv;

if (cmd === 'estado') {
  const u = unidadActual();
  if (!u) { console.log('ESTADO.md no dice ninguna unidad en curso.'); process.exit(0); }
  const e = estado(path.join(TRABAJO, ...u.split('/')));
  console.log(`unidad ${u}: ${e.aprobado ? 'plan APROBADO' : 'plan sin aprobar (' + e.motivo + ')'}`);
  process.exit(0);
}

if (cmd === 'aprobar') {
  const r = aprobar(args[0], args[1]);
  if (!r.ok) { console.error(r.error); process.exit(1); }
  console.log(`plan de ${r.dir} aprobado. Ya puedes investigar y construir.`);
  process.exit(0);
}

if (cmd === 'requiere') {
  const r = requiere(path.resolve(RAIZ, args[0]));
  if (!r.ok) { console.error(r.error); process.exit(2); }
  process.exit(0);
}

if (cmd === 'hook-requiere') {
  const datos = JSON.parse(leerStdin() || '{}');
  const archivo = datos.tool_input?.file_path || datos.tool_input?.path || '';
  const r = requiere(path.resolve(RAIZ, archivo));
  if (!r.ok) { console.error(r.error); process.exit(2); }
  process.exit(0);
}

if (cmd === 'hook-prompt') {
  const datos = JSON.parse(leerStdin() || '{}');
  const texto = String(datos.prompt || '');
  if (/aprueb\w*\s+(el\s+)?plan/i.test(texto)) {
    const u = unidadActual();
    if (u) {
      const r = aprobar(u, 'el usuario');
      if (r.ok) console.log(`Plan de ${r.dir} aprobado por el usuario.`);
    }
  }
  process.exit(0);
}

console.error('Uso: plan.js estado | aprobar <materia>/<unidad> | requiere <ruta> | hook-requiere | hook-prompt');
process.exit(1);
