// Motor de lecciones y ejercicios estilo SQLBolt.
// Script clásico (no módulo) para funcionar en file://. También se carga en Node desde verificar.js.
(function () {
  const W = typeof window !== 'undefined' ? window : globalThis;

  // ponytail: el id de una lección sale de su título; si se renombra una lección se pierde su progreso.
  // Cambiar a ids explícitos en temario.js si los títulos empiezan a editarse seguido.
  const slug = (texto) => texto.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');

  // Prefijo que la persona puede escribir antes de su respuesta: "x =", "y =", "f(x) =", "f′(x) =", "f'(2) =".
  const PREFIJO = /^\s*[a-zA-Z][′']?\s*(\([^)]*\))?\s*=\s*/;

  // Lecciones registradas: { 'materia/slug': { materia, titulo, objetivo, ... } }
  const LECCIONES = {};
  function registrarLeccion(materia, titulo, datos) {
    LECCIONES[`${materia}/${slug(titulo)}`] = { materia, titulo, ...datos };
  }

  // Fracción apilada para usar dentro del HTML de las lecciones: ${fraccion(3, 4)}
  const fraccion = (a, b) =>
    `<span class="frac" role="img" aria-label="${a}/${b}"><span>${a}</span><span>${b}</span></span>`;

  // Gráfica de funciones y puntos como SVG en línea (sin librerías; funciona offline y al imprimir).
  // grafica({ x: [-5, 5], y: [-5, 5], funciones: [{ f: (x) => 2 * x + 1, etiqueta: 'y = 2x + 1', serie: 0 }],  // serie: color (0-2); opcional
  //           puntos: [{ x: 0, y: 1, etiqueta: '(0, 1)' }], descripcion: 'texto para lectores de pantalla' })
  // Geometría: proporcional: true (misma escala en x e y), ejes: false (sin cuadrícula) y
  //   figuras: [{ tipo: 'poligono', puntos: [[0,0],[4,0],[0,3]], relleno: true }, { tipo: 'circulo', x, y, r },
  //             { tipo: 'linea', desde: [x,y], hasta: [x,y], punteada: true }, { tipo: 'angulo', x, y, desde: 0, hasta: 60, etiqueta: '60°' },
  //             { tipo: 'texto', x, y, texto: '5 cm' }]  — todas aceptan serie (0-2) para el color.
  let idGrafica = 0;
  function grafica({ x = [-5, 5], y = [-5, 5], funciones = [], puntos = [], figuras = [], descripcion = '', proporcional = false, ejes = true, pasos = [], nombres = true }) {
    const M = 26;
    const [x0, x1] = x, [y0, y1] = y;
    let W = 400, H = 320;
    if (proporcional) {
      // Misma escala en x y en y: un cuadrado se ve cuadrado. Se limita la altura para figuras altas.
      let pw = W - 2 * M, ph = (pw * (y1 - y0)) / (x1 - x0);
      if (ph > 420) { ph = 420; pw = (ph * (x1 - x0)) / (y1 - y0); }
      W = Math.round(pw + 2 * M); H = Math.round(ph + 2 * M);
    }
    const escala = (W - 2 * M) / (x1 - x0);
    const sx = (v) => M + ((v - x0) / (x1 - x0)) * (W - 2 * M);
    const sy = (v) => H - M - ((v - y0) / (y1 - y0)) * (H - 2 * M);
    const paso = (rango) => [1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000].find((p) => rango / p <= 12) || rango / 10;
    const px = pasos[0] || paso(x1 - x0), py = pasos[1] || paso(y1 - y0); // pasos: [cada cuánto en x, en y], opcional
    const r = (n) => Math.round(n * 10) / 10;
    const id = `g${++idGrafica}`;
    const serie = (o, i = 0) => `graf-f${(o.serie ?? i) % 3}`;
    let svg = '';

    // Cuadrícula y números de los ejes
    if (ejes) {
      const ejeX = y0 <= 0 && y1 >= 0 ? sy(0) : sy(y0);
      const ejeY = x0 <= 0 && x1 >= 0 ? sx(0) : sx(x0);
      for (let v = Math.ceil(x0 / px) * px; v <= x1; v += px) {
        svg += `<line class="graf-rejilla" x1="${r(sx(v))}" y1="${M}" x2="${r(sx(v))}" y2="${H - M}"/>`;
        if (v !== 0) svg += `<text class="graf-num" x="${r(sx(v))}" y="${r(Math.min(ejeX + 14, H - 4))}" text-anchor="middle">${v}</text>`;
      }
      for (let v = Math.ceil(y0 / py) * py; v <= y1; v += py) {
        svg += `<line class="graf-rejilla" x1="${M}" y1="${r(sy(v))}" x2="${W - M}" y2="${r(sy(v))}"/>`;
        if (v !== 0) svg += `<text class="graf-num" x="${r(Math.max(ejeY - 5, 12))}" y="${r(sy(v) + 4)}" text-anchor="end">${v}</text>`;
      }
      svg += `<line class="graf-eje" x1="${M}" y1="${r(ejeX)}" x2="${W - M}" y2="${r(ejeX)}"/>`;
      svg += `<line class="graf-eje" x1="${r(ejeY)}" y1="${M}" x2="${r(ejeY)}" y2="${H - M}"/>`;
      if (nombres) { // nombres: false en gráficas de datos (barras, histogramas), donde "x" e "y" no significan nada
        svg += `<text class="graf-num graf-nombre" x="${W - M + 4}" y="${r(ejeX + 4)}">x</text>`;
        svg += `<text class="graf-num graf-nombre" x="${r(ejeY)}" y="${M - 8}" text-anchor="middle">y</text>`;
      }
    }

    // Figuras geométricas (recortadas al área de la gráfica; sus textos no se recortan)
    const textos = [];
    svg += `<clipPath id="${id}"><rect x="${M}" y="${M}" width="${W - 2 * M}" height="${H - 2 * M}"/></clipPath><g clip-path="url(#${id})">`;
    figuras.forEach((fg) => { // en figuras el color por defecto es el mismo (serie 0)
      const relleno = fg.solido ? ' graf-solido' : fg.relleno ? ' graf-relleno' : ''; // solido: barras y sectores
      if (fg.tipo === 'poligono') {
        const pts = fg.puntos.map(([a, b]) => `${r(sx(a))},${r(sy(b))}`).join(' ');
        svg += `<${fg.abierto ? 'polyline' : 'polygon'} class="graf-fig ${serie(fg)}${relleno}" points="${pts}"/>`;
      } else if (fg.tipo === 'circulo') {
        svg += `<circle class="graf-fig ${serie(fg)}${relleno}" cx="${r(sx(fg.x))}" cy="${r(sy(fg.y))}" r="${r(fg.r * escala)}"/>`;
      } else if (fg.tipo === 'linea') {
        svg += `<line class="graf-fig ${serie(fg)}${fg.punteada ? ' graf-punteada' : ''}" x1="${r(sx(fg.desde[0]))}" y1="${r(sy(fg.desde[1]))}" x2="${r(sx(fg.hasta[0]))}" y2="${r(sy(fg.hasta[1]))}"/>`;
      } else if (fg.tipo === 'angulo') {
        // Arco de ángulo en grados, medido contra las manecillas del reloj desde el eje x.
        const R = (fg.r ?? 0.7) * escala;
        const cx = sx(fg.x), cy = sy(fg.y);
        const pt = (g) => [cx + R * Math.cos((g * Math.PI) / 180), cy - R * Math.sin((g * Math.PI) / 180)];
        const [ax, ay] = pt(fg.desde), [bx, by] = pt(fg.hasta);
        const grande = ((fg.hasta - fg.desde + 360) % 360) > 180 ? 1 : 0;
        svg += `<path class="graf-angulo" d="M${r(ax)} ${r(ay)}A${r(R)} ${r(R)} 0 ${grande} 0 ${r(bx)} ${r(by)}"/>`;
        if (fg.etiqueta) {
          const medio = (fg.desde + (((fg.hasta - fg.desde + 360) % 360) / 2)) * Math.PI / 180;
          textos.push(`<text class="graf-num graf-etq" x="${r(cx + (R + 14) * Math.cos(medio))}" y="${r(cy - (R + 14) * Math.sin(medio) + 4)}" text-anchor="middle">${fg.etiqueta}</text>`);
        }
      } else if (fg.tipo === 'texto') {
        textos.push(`<text class="graf-num graf-etq" x="${r(sx(fg.x))}" y="${r(sy(fg.y) + 4)}" text-anchor="middle">${fg.texto}</text>`);
      }
    });

    svg += '</g>';

    // Funciones: se muestrean y se corta el trazo donde no existen o se salen mucho del rango.
    if (funciones.length) {
      svg += `<g clip-path="url(#${id})">`;
      funciones.forEach((fn, i) => {
        let d = '', dibujando = false;
        const alto = y1 - y0;
        for (let k = 0; k <= 400; k++) {
          const xv = x0 + ((x1 - x0) * k) / 400;
          const yv = fn.f(xv);
          if (!Number.isFinite(yv) || yv < y0 - alto || yv > y1 + alto) { dibujando = false; continue; }
          d += `${dibujando ? 'L' : 'M'}${r(sx(xv))} ${r(sy(yv))}`;
          dibujando = true;
        }
        svg += `<path class="graf-f ${serie(fn, i)}" d="${d}"/>`;
      });
      svg += '</g>';
      funciones.forEach((fn, i) => {
        if (!fn.etiqueta) return; // leyenda: muestra de color + texto neutro (la identidad no depende solo del color del texto)
        const yl = M + 16 + i * 18;
        svg += `<line class="graf-f graf-muestra ${serie(fn, i)}" x1="${M + 6}" y1="${yl - 4}" x2="${M + 22}" y2="${yl - 4}"/><text class="graf-leyenda" x="${M + 28}" y="${yl}">${fn.etiqueta}</text>`;
      });
    }
    puntos.forEach((p) => {
      svg += `<circle class="graf-p" cx="${r(sx(p.x))}" cy="${r(sy(p.y))}" r="4.5"/>`;
      if (p.etiqueta) {
        const derecha = sx(p.x) < W - 90;
        textos.push(`<text class="graf-num graf-etq" x="${r(sx(p.x) + (derecha ? 8 : -8))}" y="${r(sy(p.y) - 8)}" text-anchor="${derecha ? 'start' : 'end'}">${p.etiqueta}</text>`);
      }
    });
    svg += textos.join('');
    return `<span class="grafica"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${descripcion.replace(/"/g, '&quot;')}">${svg}</svg></span>`;
  }

  // --- Otro idioma: caracteres chinos + pinyin + botón de audio ---

  const ALTAVOZ = '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
  const attr = (t) => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const datosAudio = (voz, audio) => `data-oir="${attr(voz || '')}"${audio ? ` data-audio="${attr(audio)}"` : ''}`;

  // Texto en chino para el HTML de una lección: ${zh('你好', 'nǐ hǎo', { es: 'hola' })}
  // Pone el lang correcto a los caracteres y al pinyin, y un botón que lo pronuncia.
  // Opciones: es (significado), audio (ruta de una grabación dentro del proyecto; si falla se usa la voz del sistema)
  // y voz (qué decir si no son los caracteres; para sílabas sueltas: zh('', 'mā', { voz: '妈' })).
  // Sin pinyin (zh('氵')) devuelve solo el carácter con su lang: para radicales y trazos que no se leen solos.
  function zh(hanzi, pinyin, { es, audio, voz } = {}) {
    const dice = voz || hanzi;
    if (!pinyin) return `<span class="zh__han" lang="zh-Hans">${hanzi}</span>`; // pieza que no se pronuncia sola (un radical): sin pinyin ni botón
    return '<span class="zh">' +
      (hanzi ? `<span class="zh__han" lang="zh-Hans">${hanzi}</span> ` : '') +
      `<span class="pinyin" lang="zh-Latn-pinyin">${pinyin}</span>` +
      (dice || audio ? `<button type="button" class="oir" ${datosAudio(dice, audio)} aria-label="${attr(`${W.TEXTOS?.escuchar ?? ''} ${pinyin}`)}">${ALTAVOZ}</button>` : '') +
      (es ? ` <span class="zh__es">${es}</span>` : '') + '</span>';
  }

  // Audio: un solo listener para todos los botones [data-oir]. Primero la grabación (data-audio), si no la voz del sistema.
  if (W.document) {
    // Mandarín: zh-CN, zh-TW o cmn. zh-HK y yue son cantonés.
    const vozChina = () => (W.speechSynthesis ? W.speechSynthesis.getVoices() : [])
      .filter((v) => /^(zh|cmn)/i.test(v.lang) && !/HK|yue/i.test(v.lang))
      .sort((a, b) => /CN|cmn/i.test(b.lang) - /CN|cmn/i.test(a.lang))[0];
    if (W.speechSynthesis) W.speechSynthesis.getVoices(); // algunos navegadores cargan las voces al primer pedido
    const hablar = (boton) => {
      const voz = vozChina();
      if (!voz || !boton.dataset.oir) {
        const tras = boton.closest('.zh') || boton; // después del significado, para no partir la frase
        if (!tras.nextElementSibling?.classList.contains('oir__aviso')) {
          tras.insertAdjacentHTML('afterend', ` <span class="oir__aviso" role="status">${W.TEXTOS.sinVoz}</span>`);
        }
        return;
      }
      const u = new SpeechSynthesisUtterance(boton.dataset.oir);
      u.voice = voz; u.lang = voz.lang; u.rate = 0.8;
      W.speechSynthesis.cancel();
      W.speechSynthesis.speak(u);
    };
    W.document.addEventListener('click', (e) => {
      const boton = e.target.closest ? e.target.closest('[data-oir]') : null;
      if (!boton) return;
      if (boton.dataset.audio) new Audio(boton.dataset.audio).play().catch(() => hablar(boton));
      else hablar(boton);
    });
    // Al imprimir no hay audio: se abre la alternativa escrita de cada ejercicio de escucha.
    W.addEventListener('beforeprint', () => W.document.querySelectorAll('details.sin-audio').forEach((d) => { d.open = true; }));
  }

  // --- Validación ---

  // Convierte lo que escribió la persona en los números que pudo haber querido decir.
  // Acepta: 0.5  .5  0,5  1/2  1 1/2  -3  −3  25%  1,000  1 000  3e5  3×10^5  3×10⁵
  // "1,500" es ambiguo (1.5 o 1500): se devuelven ambos y basta con que uno sea correcto.
  function normalizarNumero(texto) {
    let s = String(texto).trim().replace(/[−–]/g, '-').replace(PREFIJO, '').replace(/%$/, '').trim()
      // Exponentes en superíndice (10⁻¹⁹) se leen como 10^-19.
      .replace(/[⁺⁻]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => '^' + [...m].map((c) => (c === '⁻' ? '-' : c === '⁺' ? '' : '⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c))).join(''));
    if (!s) return [];

    const mixto = s.match(/^(-?)(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
    if (mixto) {
      const [, signo, entero, num, den] = mixto;
      if (+den === 0) return [];
      const v = +entero + num / den;
      return [signo ? -v : v];
    }

    s = s.replace(/\s+/g, '');
    const cientifica = s.match(/^(.+?)[x×*·]10\^?\(?(-?\d+)\)?$/i);
    if (cientifica) return normalizarNumero(cientifica[1]).map((m) => m * 10 ** +cientifica[2]);

    const frac = s.match(/^(-?[\d.,]+)\/(-?[\d.,]+)$/);
    if (frac) {
      const [n] = normalizarNumero(frac[1]);
      const [d] = normalizarNumero(frac[2]);
      return n === undefined || d === undefined || d === 0 ? [] : [n / d];
    }

    if (!/^[-+]?[\d.,]*\d[\d.,]*(e[-+]?\d+)?$/i.test(s)) return [];
    const candidatos = new Set();
    const ultimoPunto = s.lastIndexOf('.');
    const ultimaComa = s.lastIndexOf(',');
    if (ultimoPunto > -1 && ultimaComa > -1) {
      // El separador que va al final es el decimal: 1,234.5 o 1.234,5
      const decimal = ultimoPunto > ultimaComa ? '.' : ',';
      const miles = decimal === '.' ? ',' : '.';
      candidatos.add(Number(s.split(miles).join('').replace(decimal, '.')));
    } else if (ultimaComa > -1) {
      if (s.split(',').length === 2) candidatos.add(Number(s.replace(',', '.'))); // coma decimal
      if (/^[-+]?\d{1,3}(,\d{3})+$/.test(s)) candidatos.add(Number(s.replace(/,/g, ''))); // coma de miles
    } else if (s.split('.').length > 2 && /^[-+]?\d{1,3}(\.\d{3})+$/.test(s)) {
      candidatos.add(Number(s.replace(/\./g, ''))); // 1.000.000
    } else {
      candidatos.add(Number(s));
      if (/^[-+]?\d{1,3}\.\d{3}$/.test(s)) candidatos.add(Number(s.replace('.', ''))); // 1.500 puede ser mil quinientos
    }
    return [...candidatos].filter(Number.isFinite);
  }

  const normalizarTexto = (texto) => String(texto).normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/\s+/g, ' ').trim().replace(/[.。]$/, '').trim();

  // Pinyin con tonos. Separa las letras de los tonos: { letras: 'nihao', tonos: { 1: 3, 4: 3 } } (índice de letra: tono).
  // Acepta marcas (nǐ) y números (ni3); ü, v y u: son la misma letra. El tono neutro no lleva nada (o 5 o 0).
  const MARCAS = { '\u0304': 1, '\u0301': 2, '\u030C': 3, '\u0306': 3, '\u0300': 4 };
  function leerPinyin(texto) {
    let letras = '';
    const tonos = {};
    for (const c of String(texto).normalize('NFD').toLowerCase().replace(/u\u0308|u:/g, 'v')) {
      if (/[a-z]/.test(c)) letras += c;
      else if (MARCAS[c] || /[1-4]/.test(c)) tonos[letras.length - 1] = MARCAS[c] || +c;
    }
    return { letras, tonos };
  }
  // ponytail: las sílabas de `esperado` van separadas por espacio ('nǐ hǎo'); así se sabe a qué sílaba toca cada tono
  // sin un segmentador de pinyin. verificar.js exige ese formato en las respuestas.
  function pinyinIgual(escrito, esperado) {
    const silabas = String(esperado).trim().split(/[\s'’]+/).map(leerPinyin);
    const u = leerPinyin(escrito);
    if (u.letras !== silabas.map((s) => s.letras).join('')) return false;
    let inicio = 0;
    return silabas.every((s) => {
      const fin = inicio + s.letras.length;
      const escritos = Object.keys(u.tonos).filter((i) => i >= inicio && i < fin).map((i) => u.tonos[i]);
      inicio = fin;
      const esperados = Object.values(s.tonos);
      return escritos.length === esperados.length && escritos[0] === esperados[0];
    });
  }

  // Orden fijo (no aleatorio) en que se muestran las piezas de un ejercicio "ordenar": impares y luego pares al revés.
  // Nunca coincide con el orden correcto si hay 2 piezas o más.
  const barajar = (n) => [...Array(n).keys()].filter((i) => i % 2).concat([...Array(n).keys()].filter((i) => i % 2 === 0).reverse());

  // Convierte una expresión algebraica escrita por la persona en una función evaluable.
  // Sin eval: parser de descenso recursivo. Acepta + - * / ^ × · − ÷, paréntesis, x², coma decimal
  // y multiplicación implícita (2x, 3(x+1), (x+1)(x-1), xy). Devuelve null si no se puede interpretar.
  function parsearExpresion(texto, variables = ['x']) {
    const s = String(texto).replace(PREFIJO, '') // acepta "y = 3x + 2" o "f′(x) = 6x"
      .replace(/[−–]/g, '-').replace(/[×·]/g, '*').replace(/÷/g, '/')
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (c) => '^' + [...c].map((d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(d)).join('')).replace(/(\d),(\d)/g, '$1.$2').replace(/\s+/g, '');
    if (!s) return null;
    const tokens = s.match(/\d+\.?\d*|\.\d+|[a-zA-Z]|[-+*/^()]|./g);
    let i = 0;
    const ver = () => tokens[i];
    const tomar = () => tokens[i++];

    function expr() {
      let izq = termino();
      while (ver() === '+' || ver() === '-') {
        const op = tomar(); const a = izq; const b = termino();
        izq = op === '+' ? (v) => a(v) + b(v) : (v) => a(v) - b(v);
      }
      return izq;
    }
    function termino() {
      let izq = unario();
      for (;;) {
        const t = ver();
        if (t === '*' || t === '/') {
          tomar(); const a = izq; const b = unario();
          izq = t === '*' ? (v) => a(v) * b(v) : (v) => a(v) / b(v);
        } else if (t === '(' || (t && variables.includes(t))) {
          const a = izq; const b = potencia(); // multiplicación implícita
          izq = (v) => a(v) * b(v);
        } else return izq;
      }
    }
    function unario() {
      if (ver() === '-') { tomar(); const a = unario(); return (v) => -a(v); }
      if (ver() === '+') { tomar(); return unario(); }
      return potencia();
    }
    function potencia() {
      const base = atomo();
      if (ver() !== '^') return base;
      tomar(); const exp = unario();
      return (v) => Math.pow(base(v), exp(v));
    }
    function atomo() {
      const t = tomar();
      if (t === undefined) throw 0;
      if (/^(\d|\.\d)/.test(t)) { const n = Number(t); return () => n; }
      if (variables.includes(t)) return (v) => v[t];
      if (t === '(') { const e = expr(); if (tomar() !== ')') throw 0; return e; }
      throw 0;
    }
    try {
      const f = expr();
      return i === tokens.length ? f : null;
    } catch { return null; }
  }

  // ponytail: compara el VALOR de dos expresiones en puntos fijos, no su forma.
  // "x^2+2x+1" y "(x+1)^2" cuentan igual; para evaluar la forma (factorizar), preguntar por una pieza.
  const PUNTOS = [1.3, -2.7, 0.41, 3.9, -0.83, 2.2];
  function expresionesIguales(escrita, esperada, variables = ['x']) {
    const f = parsearExpresion(escrita, variables);
    const g = parsearExpresion(esperada, variables);
    if (!f || !g) return false;
    let validos = 0;
    for (let p = 0; p < PUNTOS.length; p++) {
      const v = {};
      variables.forEach((nombre, j) => { v[nombre] = PUNTOS[(p + 2 * j) % PUNTOS.length] + j * 0.17; });
      const esperado = g(v);
      if (!Number.isFinite(esperado)) continue; // punto fuera del dominio (p. ej. denominador cero)
      const obtenido = f(v);
      if (!Number.isFinite(obtenido) || Math.abs(obtenido - esperado) > 1e-9 * Math.max(1, Math.abs(esperado))) return false;
      validos++;
    }
    return validos >= 3;
  }

  // Para ejercicios de "simplifica / desarrolla": la respuesta no puede tener más números y letras
  // que la esperada, ni paréntesis si la esperada no los tiene. Evita que copiar el enunciado cuente como correcto.
  const piezas = (s) => (String(s).replace(PREFIJO, '').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, '^2').match(/\d+[.,]?\d*|[a-zA-Z]/g) || []).length;
  const formaSimplificada = (escrita, esperada) =>
    piezas(escrita) <= piezas(esperada) && (/[()]/.test(esperada) || !/[()]/.test(String(escrita).replace(PREFIJO, '')));

  function esCorrecta(ej, valor) {
    if (ej.tipo === 'expresion') {
      return expresionesIguales(valor, ej.respuesta, ej.variables) && (!ej.simplificar || formaSimplificada(valor, ej.respuesta));
    }
    if (ej.tipo === 'numero') {
      const tolerancia = ej.tolerancia ?? Math.max(1, Math.abs(ej.respuesta)) * 1e-9;
      return normalizarNumero(valor).some((n) => Math.abs(n - ej.respuesta) <= tolerancia);
    }
    if (ej.tipo === 'opciones') return Number(valor) === ej.correcta;
    if (ej.tipo === 'texto') return ej.respuestas.some((r) => normalizarTexto(r) === normalizarTexto(valor));
    if (ej.tipo === 'pinyin') return ej.respuestas.some((r) => pinyinIgual(valor, r));
    if (ej.tipo === 'ordenar') return [ej.respuesta, ...(ej.alternativas || [])].some((r) => r.join('|') === String(valor));
    return false;
  }

  // --- Interfaz ---

  // Dibuja los ejercicios dentro de `contenedor`. Llama a alCompletar() cuando todos están resueltos.
  function montar(contenedor, ejercicios, T, alCompletar) {
    const resueltos = new Set();
    contenedor.innerHTML = ejercicios.map((ej, i) => {
      const id = `ej${i}`;
      const ayuda = { expresion: T.ayudaExpresion, pinyin: T.ayudaPinyin }[ej.tipo];
      const campo = ej.tipo === 'opciones'
        ? `<fieldset class="opciones" aria-describedby="${id}-e ${id}-r"><legend class="oculto">${T.tuRespuesta}</legend>${ej.opciones.map((o, j) => `
            <label class="opcion"><input type="radio" name="${id}" value="${j}"> <span>${o}</span></label>`).join('')}
          </fieldset>`
        : ej.tipo === 'ordenar'
        ? `<div class="ordenar" role="group" aria-label="${T.tuRespuesta}" aria-describedby="${id}-e ${id}-a ${id}-r">
            <div class="ordenar__frase" aria-live="polite"></div>
            <div class="ordenar__piezas">${barajar(ej.respuesta.length).map((k) => `
              <button type="button" class="pieza" data-v="${attr(ej.respuesta[k])}"><span${ej.lang ? ` lang="${ej.lang}"` : ''}>${ej.respuesta[k]}</span>${ej.pinyin ? `<span class="pinyin" lang="zh-Latn-pinyin">${ej.pinyin[k]}</span>` : ''}</button>`).join('')}
            </div>
            <small id="${id}-a">${T.ayudaOrdenar}</small>
          </div>`
        : `<label class="campo"><span>${T.tuRespuesta}</span>
            <input type="text" name="${id}" autocomplete="off" autocapitalize="off" spellcheck="false" ${ej.tipo === 'numero' ? 'inputmode="decimal"' : ''}
              aria-describedby="${id}-e${ayuda ? ` ${id}-a` : ''} ${id}-r">
            ${ayuda ? `<small id="${id}-a">${ayuda}</small>` : ''}</label>`;
      // Ejercicio de escucha: botón de audio y, para quien no puede oírlo, la misma información por escrito.
      const escucha = ej.escucha ? `
          <p class="escucha"><button type="button" class="boton boton--secundario" ${datosAudio(ej.escucha.voz, ej.escucha.audio)}>${ALTAVOZ} ${T.escuchar}</button></p>
          <details class="ayuda sin-audio"><summary>${T.noPuedoEscuchar}</summary><div>${ej.sinAudio}</div></details>` : '';
      return `
        <article class="ejercicio" data-i="${i}" aria-labelledby="${id}-t">
          <h3 id="${id}-t">${T.ejercicio} ${i + 1}</h3>
          <div class="enunciado" id="${id}-e">${ej.enunciado}</div>${escucha}
          <div class="linea-respuesta" aria-hidden="true"></div>
          <form novalidate>
            ${campo}
            <button type="submit" class="boton">${T.comprobar}</button>
          </form>
          <p class="retro" id="${id}-r" aria-live="polite"></p>
          <details class="ayuda"><summary>${T.verPista}</summary><div>${ej.pista}</div></details>
          <details class="ayuda solucion" hidden><summary>${T.verSolucion}</summary><div>${ej.solucion}</div></details>
        </article>`;
    }).join('');

    contenedor.querySelectorAll('.ejercicio').forEach((art) => {
      const i = +art.dataset.i;
      const ej = ejercicios[i];
      const form = art.querySelector('form');
      const retro = art.querySelector('.retro');
      const control = form.querySelector('fieldset, .ordenar') || form.querySelector('input');
      // Ordenar: cada pieza es un botón que pasa del banco a la respuesta y de vuelta (sirve con teclado, sin arrastrar).
      const frase = form.querySelector('.ordenar__frase');
      if (frase) control.addEventListener('click', (e) => {
        const pieza = e.target.closest('.pieza');
        if (!pieza) return;
        (pieza.parentElement === frase ? form.querySelector('.ordenar__piezas') : frase).appendChild(pieza);
        pieza.focus();
      });
      // aria-live solo habla si el texto cambia: vaciarlo primero hace que se anuncie también un segundo "Todavía no".
      const avisar = (clase, texto) => {
        retro.className = clase;
        retro.textContent = '';
        requestAnimationFrame(() => { retro.textContent = texto; });
      };
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const valor = ej.tipo === 'opciones'
          ? form.querySelector('input:checked')?.value
          : frase ? [...frase.querySelectorAll('.pieza')].map((p) => p.dataset.v).join('|')
          : form.querySelector('input').value;
        if (valor === undefined || String(valor).trim() === '') {
          avisar('retro', T.escribeRespuesta);
          return;
        }
        const bien = esCorrecta(ej, valor);
        art.classList.toggle('correcto', bien);
        art.classList.toggle('incorrecto', !bien);
        control.setAttribute('aria-invalid', String(!bien));
        const soloForma = !bien && ej.tipo === 'expresion' && expresionesIguales(valor, ej.respuesta, ej.variables);
        avisar(`retro ${bien ? 'retro--bien' : 'retro--mal'}`,
          bien ? T.correcto : `${soloForma ? T.faltaSimplificar : T.incorrecto} ${T.solucionDisponible}`);
        if (!bien) art.querySelector('.solucion').hidden = false;
        if (bien && !resueltos.has(i)) {
          resueltos.add(i);
          if (resueltos.size === ejercicios.length) alCompletar();
        }
      });
    });
  }

  W.slug = slug;
  W.LECCIONES = LECCIONES;
  W.registrarLeccion = registrarLeccion;
  W.fraccion = fraccion;
  W.grafica = grafica;
  W.zh = zh;
  W.Ejercicios = { normalizarNumero, normalizarTexto, parsearExpresion, expresionesIguales, pinyinIgual, barajar, esCorrecta, montar };
})();
