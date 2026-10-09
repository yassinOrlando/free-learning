# Formato de una lección (código)

Lo lee quien escribe o audita una unidad. Plantilla de cabecera (helpers `flecha`, `txt`, `diagrama`, `caja`, `barras` y constantes de fuentes): las primeras ~50 líneas de `lecciones/finanzas-personales/crisis.js`. No hay módulos compartidos: cada archivo copia los helpers que usa.

# Formato de lección (código)
1. En `js/temario.js`, la unidad declara su archivo: `{ titulo, archivo: 'lecciones/matematicas/aritmetica.js', lecciones: [...] }`. Una unidad sin `archivo` muestra "Próximamente".
2. En ese archivo, cada lección se registra con el **título exacto del temario**:
```js
L('Porcentajes', {
  objetivo: 'texto',
  explicacion: `HTML`, ejemplo: `HTML`, vidaReal: `HTML`,
  ejercicios: [
    { tipo: 'numero', enunciado, respuesta: 450 * 40 / 15, pista, solucion },   // tolerancia opcional
    { tipo: 'opciones', enunciado, opciones: ['…'], correcta: 1, pista, solucion },
    { tipo: 'texto', enunciado, respuestas: ['…'], pista, solucion },
    { tipo: 'expresion', enunciado, respuesta: 'x^2 + 6x + 9', variables: ['x'], simplificar: true, pista, solucion },
  ],
  fuentes: [{ nombre, url }],
});
```
3. Escribir las respuestas numéricas como la operación (`450 * 40 / 15`) en vez del resultado, para que no haya errores de cálculo.
4. Usar `${F(3, 4)}` para fracciones apiladas. Para exponentes, preferir los caracteres Unicode (`x²`, `x³`, `10⁶`), que los lectores de pantalla leen bien ("x al cuadrado"); usar `<sup>` solo cuando no exista el carácter, como en `x<sup>n</sup>`. Clases útiles en el HTML: `.nota`, `.pasos-ej`, `.resultado`, `.tabla-wrap`.
5. Las respuestas `numero` aceptan cualquier valor equivalente (`0,5`, `1/2`, `3×10^5`). Si lo que se evalúa es la *forma* (por ejemplo, una fracción simplificada), preguntar por un dato concreto (el numerador) en lugar del valor.
6. **`expresion`** compara el *valor* de la expresión escrita contra `respuesta` en varios puntos (parser propio, sin `eval`). Así, `3x+5`, `5 + 3*x` y `x·3+5` valen lo mismo. `variables` es `['x']` por defecto. Con `simplificar: true`, la respuesta además no puede tener más números o letras que la esperada, ni paréntesis si la esperada no los tiene; así, copiar el enunciado no cuenta como correcto. Usar esta opción en todo ejercicio de "simplifica", "desarrolla" o "multiplica". Las respuestas `numero` y `expresion` pueden llevar un prefijo como `x =`, `y =`, `f(x) =`, `f′(x) =` o `f′(2) =` (constante `PREFIJO` en `js/ejercicios.js`).
7. **Gráficas**: `${G({ x: [-5, 5], y: [-5, 5], funciones: [{ f: (x) => 2 * x + 1, etiqueta: 'y = 2x + 1', serie: 0 }], puntos: [{ x: 0, y: 1, etiqueta: '(0, 1)' }], descripcion: '…' })}`, con `const G = window.grafica`. Genera un SVG en línea: funciona offline, respeta el tema y sale en blanco y negro al imprimir. `descripcion` es obligatoria, porque es lo que leen los lectores de pantalla. `serie` (0 a 2) fija el color; úsala para que dos trazos de la misma curva compartan estilo. Las gráficas se pueden poner dentro de `opciones` y en enunciados, y la clase `.dos-graficas` pone dos lado a lado.
   Para figuras geométricas: `proporcional: true` (misma escala en x e y, así un cuadrado se ve cuadrado), `ejes: false` (sin cuadrícula) y `figuras: [...]` con `{ tipo: 'poligono', puntos, abierto?, relleno? }`, `{ tipo: 'circulo', x, y, r }`, `{ tipo: 'linea', desde, hasta, punteada? }` (aristas ocultas, alturas), `{ tipo: 'angulo', x, y, desde, hasta, r?, etiqueta? }` (arco en grados, contra las manecillas del reloj) y `{ tipo: 'texto', x, y, texto }`. Las figuras usan un solo color salvo que se indique `serie`, y se recortan al área de la gráfica (los textos no). Para curvas con tramos verticales (hipérbola, circunferencia como función) es mejor una polilínea paramétrica (`poligono` con `abierto: true`) que `funciones`. Ver los helpers `fig`, `raya`, `oculta` y `txt` en `lecciones/matematicas/geometria.js`.
   Gráficas de datos: ver los helpers `barras`, `histograma` y `pastel` en `lecciones/matematicas/estadistica.js` (figuras con `solido: true` y `nombres: false`). Colores de series: tokens `--serie-1/2/3` en `estilos.css` (paleta categórica validada con la skill dataviz para el tema oscuro). Máximo 3 series o sectores; si hay más, usar barras o agrupar en "Otros". Las leyendas usan texto neutro con una muestra de color, y los valores se rotulan directamente.
   En ejercicios con π, usar `tolerancia` del 0.2% (π ≈ 3.14 desvía solo 0.05%; deja margen para redondear a un decimal).
8. **Accesibilidad del contenido** (además de lo que ya resuelve el motor):
   - Dentro de `explicacion`, `ejemplo` y `vidaReal`, solo subtítulos `<h3>`, nunca `<h2>` ni `<h4>`, para no romper el orden de encabezados.
   - Toda gráfica lleva una `descripcion` que diga lo que muestra (los valores o la forma), no solo "una gráfica".
   - El significado nunca depende solo del color: nombra cada curva o serie ("la recta y = 2x + 1"), no "la azul".
   - Las tablas llevan `<th>` en la fila o columna de encabezado.
   - Texto en otro idioma: `<span lang="en">` o `<span lang="zh">`.
   - No poner enlaces internos `href="#algo"`, porque el ruteo por hash los toma como página. Los enlaces externos (fuentes) sí van.
   - Sin emojis, ni como íconos ni como decoración.
9. Comprobar las URLs de las fuentes (deben responder 200) y ejecutar `node verificar.js`.

## Trampas conocidas
- `${F(...)}` o `${G(...)}` dentro de comillas simples no se interpola: usa comillas invertidas.
- Exponentes con Unicode (`x²`, `10⁹`); `<sup>` solo si no existe el carácter.
- `texto` quita acentos y mayúsculas, pero no superíndices: agrega variantes razonables (sinónimos, con y sin artículo, el término en inglés si aplica, palabras regionales).
- "Vida real" se lee antes de la explicación: no puede usar términos que la lección aún no ha definido.
- Cada viñeta es una frase completa. Máximo 3 términos nuevos en negritas por lección (no cuentan "Trampa común", "Error común" ni las líneas de fórmula).
- `opciones`: exactamente una correcta, sin distractores absurdos, y los índices `correcta:` repartidos (no todos en 0).
- Respuestas numéricas como la operación, con `tolerancia` cuando haya redondeo.
- Etiquetas de ejes con 4 o más dígitos se recortan: usa unidades escaladas ("en miles").
- No dupliques datos entre lecciones: remite ("como viste en \"Título exacto\"").
- Títulos citados entre comillas deben existir en `js/temario.js`.
