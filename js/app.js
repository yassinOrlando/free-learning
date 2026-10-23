(function () {
  const T = window.TEXTOS;
  const MATERIAS = window.TEMARIO;
  const { slug, LECCIONES, Ejercicios } = window;
  const CLAVE_PROGRESO = 'free-learning:progreso:v1';
  const principal = document.getElementById('principal');

  // Progreso: { [idMateria]: [idLeccion, ...] }. Si el navegador bloquea el almacenamiento, el sitio sigue funcionando sin progreso.
  const Progreso = {
    leer() {
      try { return JSON.parse(localStorage.getItem(CLAVE_PROGRESO)) || {}; } catch { return {}; }
    },
    completar(idMateria, idLeccion) {
      const datos = this.leer();
      const hechas = new Set(datos[idMateria] || []);
      hechas.add(idLeccion);
      datos[idMateria] = [...hechas];
      try { localStorage.setItem(CLAVE_PROGRESO, JSON.stringify(datos)); } catch {}
    },
    reiniciar() {
      try { localStorage.removeItem(CLAVE_PROGRESO); } catch {}
    },
  };

  // Carga los archivos de lecciones de una materia inyectando <script> (fetch no funciona en file://).
  const cargados = new Set();
  function cargarMateria(m, listo) {
    const pendientes = m.unidades.map((u) => u.archivo).filter((a) => a && !cargados.has(a));
    if (!pendientes.length) return listo();
    let faltan = pendientes.length;
    pendientes.forEach((archivo) => {
      cargados.add(archivo);
      const s = document.createElement('script');
      s.src = archivo;
      s.onload = s.onerror = () => { if (--faltan === 0) listo(); };
      document.body.appendChild(s);
    });
  }

  const totalLecciones = (m) => m.unidades.reduce((n, u) => n + u.lecciones.length, 0);
  // Lista plana de lecciones de una materia, en orden, para navegar anterior/siguiente.
  const leccionesDe = (m) => m.unidades.flatMap((u, iu) =>
    u.lecciones.map((titulo) => ({ titulo, id: slug(titulo), unidad: u.titulo, numUnidad: iu + 1 })));
  const hayLeccion = (m, id) => Boolean(LECCIONES[`${m.id}/${id}`]);
  // Los títulos del temario son texto plano: los caracteres chinos se marcan aquí para que el lector de pantalla cambie de voz.
  // Ojo: si el título va dentro de un contenedor flex o grid, envuélvelo en un <span>; si no, los espacios alrededor de los caracteres desaparecen.
  const conLang = (titulo) => titulo.replace(/\p{Script=Han}+/gu, '<span lang="zh-Hans">$&</span>');

  function vistaInicio() {
    const progreso = Progreso.leer();
    const tarjeta = (m) => {
      const total = totalLecciones(m);
      const hechas = (progreso[m.id] || []).length;
      const pct = Math.round((hechas / total) * 100);
      return `
        <a class="tarjeta" href="#/materia/${m.id}" style="--color:${m.color}">
          <h3>${m.nombre}</h3>
          <p>${m.descripcion}</p>
          <div class="barra" role="progressbar" aria-label="Progreso en ${m.nombre}" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><span style="width:${pct}%"></span></div>
          <span class="tarjeta__dato">${hechas} / ${total} ${T.lecciones} ${T.completadas}</span>
        </a>`;
    };
    // Las materias se agrupan por tema. Si alguna no declara `grupo`, cae en «Otras materias» para que no desaparezca.
    const grupos = [
      ...window.GRUPOS.map((g) => ({ ...g, materias: MATERIAS.filter((m) => m.grupo === g.id) })),
      { id: 'otras', nombre: 'Otras materias', materias: MATERIAS.filter((m) => !window.GRUPOS.some((g) => g.id === m.grupo)) },
    ].filter((g) => g.materias.length);
    const secciones = grupos.map((g) => `
      <section class="grupo" aria-labelledby="g-${g.id}">
        <h2 class="grupo__titulo" id="g-${g.id}">${g.nombre}</h2>
        <div class="rejilla">${g.materias.map(tarjeta).join('')}</div>
      </section>`).join('');
    return `
      <section class="portada">
        <h1>${T.lema}</h1>
        <p>${T.intro}</p>
      </section>
      ${secciones}`;
  }

  // Vocabulario de idiomas. La única fuente es la tabla con class="vocabulario" de cada explicación:
  // se leen sus filas tal cual (caracteres, pinyin y botón de audio) para el modal del botón flotante.
  const vocabDe = (L) => {
    if (!L) return [];
    const t = document.createElement('template');
    t.innerHTML = L.explicacion;
    return [...t.content.querySelectorAll('table.vocabulario tr')].filter((tr) => tr.querySelector('td')).map((tr) => tr.outerHTML);
  };
  const ICONO_LIBRO = '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
  const ICONO_X = '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
  const tablaVocab = (filas) => `<div class="tabla-wrap"><table><tr><th scope="col">${T.palabra}</th><th scope="col">${T.significado}</th></tr>${filas.join('')}</table></div>`;
  const modalVocab = (titulo, cuerpo) => `
      <button type="button" class="boton vocab-boton" id="vocab-abrir">${ICONO_LIBRO}<span>${T.vocabulario}</span></button>
      <dialog class="vocab" id="vocab" aria-labelledby="vocab-t"><div class="vocab__caja">
        <div class="vocab__cabecera"><h2 id="vocab-t">${titulo}</h2>
          <button type="button" class="vocab__cerrar" id="vocab-cerrar" aria-label="${T.cerrar}">${ICONO_X}</button></div>
        ${cuerpo}
      </div></dialog>`;

  function vistaMateria(m) {
    const hechas = new Set(Progreso.leer()[m.id] || []);
    const unidades = m.unidades.map((u, i) => `
      <section class="unidad" aria-labelledby="u${i}">
        <p class="unidad__etiqueta">${T.unidad} ${i + 1}</p>
        <h2 id="u${i}">${conLang(u.titulo)}</h2>
        <ol class="lecciones">
          ${u.lecciones.map((l) => {
            const id = slug(l);
            return `
            <li class="${hechas.has(id) ? 'hecha' : ''}">
              ${hayLeccion(m, id)
                ? `<a href="#/leccion/${m.id}/${id}"><span>${conLang(l)}</span></a>`
                : `<span><span>${conLang(l)}</span></span><span class="chip">${T.proximamente}</span>`}
            </li>`;
          }).join('')}
        </ol>
      </section>`).join('');
    // Todo el vocabulario de la materia en desplegables (<details>): unidades y, dentro, lecciones, todo cerrado.
    const vocab = m.unidades.map((u) => {
      let total = 0;
      const lecciones = u.lecciones.map((l) => {
        const filas = vocabDe(LECCIONES[`${m.id}/${slug(l)}`]);
        total += filas.length;
        return filas.length ? `<details class="vocab-grupo vocab-grupo--leccion"><summary>${conLang(l)} <span class="tenue">(${filas.length})</span></summary>${tablaVocab(filas)}</details>` : '';
      }).join('');
      return total ? `<details class="vocab-grupo"><summary>${conLang(u.titulo)} <span class="tenue">(${total} ${T.palabras})</span></summary>${lecciones}</details>` : '';
    }).join('');
    return `
      <a class="migas" href="#/">← ${T.volver}</a>
      <header class="materia__cabecera" style="--color:${m.color}">
        <h1>${m.nombre}</h1>
        <p>${m.descripcion}</p>
        <p class="tenue">${m.unidades.length} unidades · ${totalLecciones(m)} ${T.lecciones}</p>
      </header>
      <div class="unidades" style="--color:${m.color}">${unidades}</div>
      ${vocab ? modalVocab(T.vocabularioMateria, vocab) : ''}`;
  }

  function vistaLeccion(m, id) {
    const lista = leccionesDe(m);
    const pos = lista.findIndex((l) => l.id === id);
    if (pos === -1) return null;
    const info = lista[pos];
    const L = LECCIONES[`${m.id}/${id}`];
    const anterior = lista[pos - 1];
    const siguiente = lista[pos + 1];
    const enlace = (l, txt, clase) => l ? `<a class="${clase}" href="#/leccion/${m.id}/${l.id}"><small>${txt}</small><span>${conLang(l.titulo)}</span></a>` : '<span></span>';
    const navegacion = `<nav class="lec-nav" aria-label="${T.navLecciones}">${enlace(anterior, T.anterior, 'lec-nav__ant')}${enlace(siguiente, T.siguiente, 'lec-nav__sig')}</nav>`;
    const hecha = (Progreso.leer()[m.id] || []).includes(id);

    const cabecera = `
      <a class="migas" href="#/materia/${m.id}">← ${m.nombre}</a>
      <header class="materia__cabecera" style="--color:${m.color}">
        <p class="unidad__etiqueta">${T.unidad} ${info.numUnidad} · ${conLang(info.unidad)}</p>
        <h1>${conLang(info.titulo)}</h1>
        ${L ? `<p class="lec-acciones">
          <button type="button" class="boton boton--secundario" id="imprimir">${T.imprimir}</button>
          ${hecha ? `<span class="chip chip--hecha">✓ ${T.leccionHecha}</span>` : ''}
        </p>` : ''}
      </header>`;

    if (!L) return `${cabecera}<p class="tenue">${T.leccionPendiente}</p>${navegacion}`;
    const filasVocab = vocabDe(L);

    return `
      ${cabecera}
      <article class="leccion" style="--color:${m.color}">
        <section class="bloque bloque--objetivo"><h2>${T.objetivo}</h2><p>${L.objetivo}</p></section>
        <section class="bloque bloque--vida"><h2>${T.vidaReal}</h2>${L.vidaReal}</section>
        <section class="bloque"><h2>${T.explicacion}</h2>${L.explicacion}</section>
        <section class="bloque"><h2>${T.ejemplo}</h2>${L.ejemplo}</section>
        <section class="bloque"><h2>${T.practica}</h2><p class="tenue">${T.practicaIntro}</p><div id="ejercicios"></div>
          <div id="completada" class="completada" hidden tabindex="-1">
            <strong>${T.felicidades}</strong>
            ${siguiente ? `<a class="boton" href="#/leccion/${m.id}/${siguiente.id}"><span>${T.siguiente}: ${conLang(siguiente.titulo)}</span></a>` : ''}
          </div>
        </section>
        <section class="bloque bloque--fuentes"><h2>${T.fuentes}</h2>
          <ul>${L.fuentes.map((f) => `<li><a href="${f.url}" target="_blank" rel="noopener">${f.nombre}</a></li>`).join('')}</ul>
        </section>
      </article>
      ${navegacion}
      ${filasVocab.length ? modalVocab(T.vocabularioLeccion, tablaVocab(filasVocab)) : ''}`;
  }

  function dibujar() {
    // El navegador codifica los caracteres chinos del hash (不 llega como %E4%B8%8D): se decodifican para que coincidan con el id de la lección.
    const ruta = location.hash.replace(/^#\/?/, '').split('/').map((p) => { try { return decodeURIComponent(p); } catch { return p; } });
    const materia = MATERIAS.find((m) => m.id === ruta[1]);

    // Las vistas de materia y lección necesitan sus archivos de lecciones cargados.
    if (materia && (ruta[0] === 'materia' || ruta[0] === 'leccion') && materia.unidades.some((u) => u.archivo && !cargados.has(u.archivo))) {
      return cargarMateria(materia, dibujar);
    }

    let html = null;
    if (ruta[0] === '') html = vistaInicio();
    else if (ruta[0] === 'como-usar') html = vistaComoUsar();
    else if (ruta[0] === 'materia' && materia) html = vistaMateria(materia);
    else if (ruta[0] === 'leccion' && materia) html = vistaLeccion(materia, ruta[2]);
    if (html === null) html = `<h1>${T.noEncontrado}</h1><a href="#/">${T.volver}</a>`;

    principal.innerHTML = html;

    if (ruta[0] === 'leccion' && LECCIONES[`${ruta[1]}/${ruta[2]}`]) {
      document.getElementById('imprimir').addEventListener('click', () => window.print());
      Ejercicios.montar(document.getElementById('ejercicios'), LECCIONES[`${ruta[1]}/${ruta[2]}`].ejercicios, T, () => {
        Progreso.completar(ruta[1], ruta[2]);
        const aviso = document.getElementById('completada');
        aviso.hidden = false;
        aviso.focus();
      });
    }

    // Modal de vocabulario: <dialog> nativo (Esc, foco atrapado y vuelta del foco al botón los pone el navegador).
    const dlg = document.getElementById('vocab');
    if (dlg) {
      document.getElementById('vocab-abrir').addEventListener('click', () => dlg.showModal());
      document.getElementById('vocab-cerrar').addEventListener('click', () => dlg.close());
      dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); }); // clic en el fondo oscuro
    }
    principal.classList.toggle('con-vocab', Boolean(dlg));

    const titulo = principal.querySelector('h1');
    document.title = ruta[0] === '' ? T.marca : `${titulo.textContent} · ${T.marca}`;
    document.querySelectorAll('.nav > a:not(.boton)').forEach((a) => {
      const activa = a.getAttribute('href') === (ruta[0] === 'como-usar' ? '#/como-usar' : '#/');
      if (activa) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    window.scrollTo(0, 0);
    if (location.hash) principal.focus({ preventScroll: true }); // lleva lectores de pantalla y teclado al nuevo contenido
  }

  function vistaComoUsar() {
    return `
      <h1>${T.comoUsarTitulo}</h1>
      <p class="tenue" style="max-width:760px">${T.comoUsarIntro}</p>
      <p><a class="boton" href="descargar/free-learning.zip" download>${T.descargar}</a></p>
      <ol class="pasos">
        ${T.comoUsarPasos.map(([titulo, texto]) => `<li><h2>${titulo}</h2><p>${texto}</p></li>`).join('')}
      </ol>
      <h2>${T.comoUsarNotasTitulo}</h2>
      <ul class="notas">${T.comoUsarNotas.map((n) => `<li>${n}</li>`).join('')}</ul>`;
  }

  document.querySelectorAll('[data-texto]').forEach((el) => { el.textContent = T[el.dataset.texto]; });
  document.getElementById('reiniciar').addEventListener('click', () => {
    if (!confirm(T.confirmarReinicio)) return;
    Progreso.reiniciar();
    dibujar();
    alert(T.reiniciado);
  });
  // El salto no debe tocar el hash: el router lo tomaría como una ruta y borraría la lección.
  document.querySelector('.saltar').addEventListener('click', (e) => { e.preventDefault(); principal.focus(); });
  window.addEventListener('hashchange', dibujar);
  dibujar();
})();
