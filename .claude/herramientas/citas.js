// Verifica una ficha de hechos sin modelo. Uso: node .claude/herramientas/citas.js .claude/trabajo/<materia>/<unidad>/ficha.md
// Por cada fuente (## F1 · …, línea "- url:") descarga la página, comprueba el código 200 y el <title>, y busca cada
// cita (línea "> …") en el texto. Formato de la ficha: .claude/docs/fuentes.md. Sale con código 1 si algo falla.
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const ficha = process.argv[2];
if (!ficha || !fs.existsSync(ficha)) { console.error('Uso: node .claude/herramientas/citas.js ficha.md'); process.exit(2); }
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';
const CACHE = path.join(os.tmpdir(), 'citas-cache');
fs.mkdirSync(CACHE, { recursive: true });

// Fuentes: { id, url, datos: [{ id, cita }] }
const fuentes = [];
let dato = null;
for (const linea of fs.readFileSync(ficha, 'utf8').split('\n')) {
  let m;
  if ((m = linea.match(/^##\s+(F\d+)/))) fuentes.push({ id: m[1], url: '', datos: [] });
  else if ((m = linea.match(/^-\s*url:\s*(\S+)/)) && fuentes.length) fuentes.at(-1).url = m[1];
  else if ((m = linea.match(/^-\s*(D\d+)\s*:/)) && fuentes.length) fuentes.at(-1).datos.push(dato = { id: m[1], cita: '' });
  else if ((m = linea.match(/^\s*>\s?(.*)$/)) && dato) dato.cita += ' ' + m[1];
}

const ENTIDADES = { amp: '&', nbsp: ' ', quot: '"', apos: "'", lt: '<', gt: '>', laquo: '«', raquo: '»', ndash: '–', mdash: '—', hellip: '…' };
const entidades = (s) => s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) => e[0] === '#'
  ? String.fromCodePoint(parseInt(e[1] === 'x' || e[1] === 'X' ? e.slice(2) : e.slice(1), e[1] === 'x' || e[1] === 'X' ? 16 : 10))
  : ENTIDADES[e.toLowerCase()] ?? m);
const normalizar = (s) => entidades(s).normalize('NFKC').toLowerCase()
  .replace(/[­​]/g, '').replace(/[‘’‚′`´]/g, "'").replace(/[“”„«»]/g, '"').replace(/[‐‑‒–—−]/g, '-')
  .replace(/\s+/g, ' ').trim();

async function pagina(url) {
  const cache = path.join(CACHE, crypto.createHash('sha1').update(url).digest('hex') + '.json');
  if (fs.existsSync(cache)) return JSON.parse(fs.readFileSync(cache, 'utf8'));
  let r;
  try { r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'es,en;q=0.8' }, redirect: 'follow', signal: AbortSignal.timeout(30000) }); }
  catch (e) { return { estado: 0, titulo: '', texto: '', error: e.message }; }
  const tipo = r.headers.get('content-type') || '';
  let titulo = '', texto = '';
  if (/pdf/i.test(tipo) || /\.pdf($|\?)/i.test(url)) {
    const pdf = cache.replace(/\.json$/, '.pdf');
    fs.writeFileSync(pdf, Buffer.from(await r.arrayBuffer()));
    try {
      texto = execFileSync('osascript', ['-l', 'JavaScript', '-e', 'ObjC.import("PDFKit"); function run(a){return $.PDFDocument.alloc.initWithURL($.NSURL.fileURLWithPath(a[0])).string.js}', pdf], { encoding: 'utf8', maxBuffer: 64 << 20 });
    } catch { texto = ''; }
    titulo = '(PDF)';
  } else {
    const html = await r.text();
    titulo = entidades((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1]).replace(/\s+/g, ' ').trim();
    texto = html.replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ');
  }
  const res = { estado: r.status, titulo, texto: normalizar(texto) };
  if (r.status === 200) fs.writeFileSync(cache, JSON.stringify(res));
  return res;
}

(async () => {
  let fallas = 0;
  for (const f of fuentes) {
    if (!f.url) { fallas++; console.log(`${f.id} FALLA: sin "- url:"`); continue; }
    const p = await pagina(f.url);
    const reto = /just a moment|captcha|access denied|attention required/i.test(p.titulo);
    if ([401, 403, 429, 503].includes(p.estado) || reto) { fallas++; console.log(`${f.id} BLOQUEADA (${p.estado} "${p.titulo}") ${f.url}`); continue; }
    if (p.estado !== 200) { fallas++; console.log(`${f.id} FALLA: código ${p.estado || p.error} ${f.url}`); continue; }
    if (/not found|no encontrad|404|no existe/i.test(p.titulo)) { fallas++; console.log(`${f.id} FALLA: parece un 404 suave ("${p.titulo}")`); continue; }
    console.log(`${f.id} OK 200 "${p.titulo.slice(0, 70)}"`);
    for (const d of f.datos) {
      const cita = normalizar(d.cita);
      if (!cita) { fallas++; console.log(`  ${f.id}·${d.id} FALLA: sin cita`); }
      else if (cita.split(' ').length < 8) { fallas++; console.log(`  ${f.id}·${d.id} FALLA: cita de menos de 8 palabras (no prueba el dato): "${d.cita.trim()}"`); }
      else if (p.texto.includes(cita)) console.log(`  ${f.id}·${d.id} OK`);
      else { fallas++; console.log(`  ${f.id}·${d.id} FALLA: la cita no aparece en la página: "${d.cita.trim().slice(0, 80)}…"`); }
    }
  }
  console.log(fallas ? `\n${fallas} falla(s).` : `\n✓ ${fuentes.length} fuentes y todas sus citas verificadas.`);
  process.exit(fallas ? 1 : 0);
})();
