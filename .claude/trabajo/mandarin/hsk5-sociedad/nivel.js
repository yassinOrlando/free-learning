// Nivel por palabra: node nivel.js <unidad.js>
// Corta cada tramo de caracteres en palabras del sílabo (la más larga primero) y avisa
// de las que no están permitidas en la unidad 9: nivel 1 y 2 siempre; nivel 3 solo si
// ya aparece en las unidades 7 y 8; nivel 4 de las unidades 9 a 12; nivel 5 de las unidades 13 y 14; nada de
// nivel 5 o más. Lo que no está en el sílabo como palabra sale con «?».
// ponytail: corte voraz; si una frase se corta mal, revisa a mano las que avisa.
const fs = require('fs'), os = require('os'), path = require('path');
const raiz = path.join(__dirname, '../../../..');
const silabo = JSON.parse(fs.readFileSync(path.join(os.tmpdir(), 'citas-cache/091e6fef37d6196feda5d9504c7b7dde4ba3966c.json'), 'utf8')).texto;
const nivel = new Map();
for (const m of silabo.matchAll(/(\d{1,5}) (\d(?:-\d)?)(?:\([\d-]+\))* ([一-鿿…]+?)\d? (?=[a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü])/g)) {
  const w = m[3], n = m[2] === '7-9' ? 7 : +m[2];
  if (!nivel.has(w) || nivel.get(w) > n) nivel.set(w, n);
}
const han = (s) => s.match(/[一-鿿]+/g) || [];
// Texto con caracteres, sin las líneas de fuentes (sus títulos no son contenido).
const texto = (f) => fs.readFileSync(f, 'utf8').split('\n').filter((l) => !/nombre:/.test(l)).join('\n');
const largo = Math.max(...[...nivel.keys()].map((w) => w.length));
const cortar = (tramo) => {
  const out = [];
  for (let i = 0; i < tramo.length;) {
    let w = null;
    for (let k = Math.min(largo, tramo.length - i); k > 0; k--) if (nivel.has(tramo.substr(i, k))) { w = tramo.substr(i, k); break; }
    out.push(w || tramo[i]); i += w ? w.length : 1;
  }
  return out;
};
const nivel3 = new Set(['hsk3-gramatica', 'hsk3-comunicacion'].flatMap((u) => han(texto(path.join(raiz, `lecciones/mandarin/${u}.js`))).flatMap(cortar)));
const nivel4 = new Set([path.join(__dirname, '../hsk4-frases/lineas-silabo.txt'), path.join(__dirname, '../hsk4-estructuras/lineas-silabo.txt'), path.join(__dirname, '../hsk4-vida/lineas-silabo.txt'), path.join(__dirname, '../hsk4-cultura/lineas-silabo.txt')].flatMap((f) => fs.readFileSync(f, 'utf8').split('\n').map((l) => l.split(' => ')[0]).filter(Boolean)));
// Palabras de nivel 4 que son parte de un patrón de gramática de la unidad (不是…就是…).
nivel4.add('就是');
const nivel5 = new Set([path.join(__dirname, '../hsk5-gramatica/lineas-silabo.txt'), path.join(__dirname, 'lineas-silabo.txt')].flatMap((f) => fs.readFileSync(f, 'utf8').split('\n').map((l) => l.split(' => ')[0]).filter(Boolean)));
const avisos = new Map();
for (const tramo of han(texto(process.argv[2]))) {
  for (const w of cortar(tramo)) {
    const n = nivel.get(w);
    if (n === undefined) avisos.set(w, '? (no está en el sílabo como palabra) en ' + tramo);
    else if (!(n <= 2 || (n === 3 && nivel3.has(w)) || (n === 4 && nivel4.has(w)) || (n === 5 && nivel5.has(w)))) avisos.set(w, `nivel ${n} en ${tramo}`);
  }
}
for (const [w, a] of avisos) console.log(w, a);
console.log(avisos.size ? `${avisos.size} avisos` : 'OK: todas las palabras permitidas');
