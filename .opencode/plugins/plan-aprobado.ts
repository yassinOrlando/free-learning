// Gate de aprobación del plan (opencode, plugin v2).
//
// Orden del flujo: primero el plan, luego el usuario lo aprueba, y solo después
// se investiga y se construye. Eso se hace cumplir aquí, no por confianza:
//
//   - el plan todavía no se aprobó -> no se escribe la unidad ni la ficha;
//   - el plan cambió después de aprobarse -> la aprobación caducó.
//
// Aplica a la herramienta de escritura y también al shell, porque un agente que
// ve bloqueado `write` puede escribir el archivo con `>` y colarse por ahí.
//
// Las unidades sin plan no se tocan: son las escritas antes del flujo, que se editan directo.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const PLAN = "plan.md";
const MARCA = "APROBADO";

const hash = (p) => crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex").slice(0, 16);

// Raíz del proyecto: el directorio más cercano hacia arriba que tiene .claude/trabajo.
function raizProyecto(dir) {
  for (let i = 0; i < 8; i++) {
    if (fs.existsSync(path.join(dir, ".claude", "trabajo"))) return dir;
    const padre = path.dirname(dir);
    if (padre === dir) break;
    dir = padre;
  }
  return null;
}

// { dir, trabajo } de la unidad a la que pertenece el archivo, o null si no es de una unidad.
function unidadDe(raiz, archivo) {
  if (!raiz) return null;
  const abs = path.isAbsolute(archivo) ? archivo : path.join(raiz, archivo);
  const rel = path.relative(raiz, abs).split(path.sep).join("/");

  // lecciones/<materia>/<unidad>.js
  let m = rel.match(/^lecciones\/([^/]+)\/([^/]+)\.js$/);
  if (m) return { dir: `${m[1]}/${m[2]}`, trabajo: path.join(raiz, ".claude", "trabajo", m[1], m[2]) };

  // .claude/trabajo/<materia>/<unidad>/ficha*.md
  m = rel.match(/^\.claude\/trabajo\/([^/]+)\/([^/]+)\/(ficha[^/]*)\.md$/);
  if (m) return { dir: `${m[1]}/${m[2]}`, trabajo: path.join(raiz, ".claude", "trabajo", m[1], m[2]) };

  return null;
}

function estado(carpeta) {
  const plan = path.join(carpeta, PLAN);
  if (!fs.existsSync(plan)) return { ok: true, sinPlan: true };
  const marca = path.join(carpeta, MARCA);
  if (!fs.existsSync(marca)) return { ok: false, motivo: "el plan todavía no está aprobado" };
  let guardado = null;
  try { guardado = JSON.parse(fs.readFileSync(marca, "utf8")); } catch {}
  if (!guardado || guardado.hash !== hash(plan)) {
    return { ok: false, motivo: "el plan cambió después de aprobarse: hay que volver a aprobarlo" };
  }
  return { ok: true };
}

// Rutas de una unidad bloqueada que aparecen en un comando de shell.
function rutasBloqueadas(raiz, comando) {
  const encontradas = [];
  for (const m of comando.matchAll(/[^\s'"]*lecciones\/[^\s'"]*\.js/g)) {
    const u = unidadDe(raiz, m[0]);
    if (u && !estado(u.trabajo).ok) encontradas.push(u);
  }
  for (const m of comando.matchAll(/[^\s'"]*\.claude\/trabajo\/[^\s'"]*ficha[^\s'"]*\.md/g)) {
    const u = unidadDe(raiz, m[0]);
    if (u && !estado(u.trabajo).ok) encontradas.push(u);
  }
  return encontradas;
}

// El comando escribe en el archivo si redirige, copia, mueve o deja algo con tee/sed.
const ESCRIBE = /(^|\s)(>>?|tee\b|sed\s+-i|cp\b|mv\b|dd\b|install\b)/;

export default {
  id: "plan-aprobado",
  async setup(ctx) {
    const raiz = raizProyecto(ctx?.location?.directory || process.cwd());

    await ctx.tool.hook("execute.before", (event) => {
      const entrada = event.input || {};
      const herramienta = String(event.tool || "").toLowerCase();
      if (!["write", "edit", "patch", "multiedit"].includes(herramienta)) return;
      const archivo = entrada.filePath || entrada.path || entrada.file || "";
      if (!archivo || typeof archivo !== "string") return;
      const u = unidadDe(raiz, archivo);
      if (!u) return;
      const r = estado(u.trabajo);
      if (r.ok) return;
      throw new Error(
        `bloqueado: ${u.dir} — ${r.motivo}. El plan se aprueba con el comando /aprobar-plan ${u.dir} ` +
        `(o con "apruebo el plan" en el chat). Hasta entonces no se investiga ni se construye.`,
      );
    });

    await ctx.shell.hook("create.before", (event) => {
      const comando = String(event?.command || "");
      if (!comando || !ESCRIBE.test(comando)) return;
      const bloqueadas = rutasBloqueadas(raiz, comando);
      if (!bloqueadas.length) return;
      const u = bloqueadas[0];
      const r = estado(u.trabajo);
      throw new Error(
        `bloqueado: ${u.dir} — ${r.motivo}. El plan se aprueba con el comando /aprobar-plan ${u.dir} ` +
        `(o con "apruebo el plan" en el chat). Hasta entonces no se investiga ni se construye.`,
      );
    });
  },
};
