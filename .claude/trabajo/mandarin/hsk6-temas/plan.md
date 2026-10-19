# Plan: Mandarín · Unidad 17: HSK 6 · Temas actuales

## Contexto
Unidad 16 cerrada (127 de 140). La unidad 17 tiene 7 lecciones temáticas de HSK 6 (títulos del temario sin cambios). Como en las unidades 11, 14: el tema da vocabulario y situación, y cada lección reparte gramática de nivel 6 que aún no tiene lección (comprobada en el 语法大纲 de nivel 6): "把"字句4 (sujeto no animado; 把 + quien hace la acción), clasificadores 扇, 枝, 卷, y 固定格式 de nivel 6. Los 四字格 (a这a那, 左a右b) y el resto de 固定格式 quedan para la unidad 18. Nada de nivel 7–9.

- Archivo `lecciones/mandarin/hsk6-temas.js`. Trabajo `.claude/trabajo/mandarin/hsk6-temas/` (`nivel.js`: nivel 6 de unidades 16–17).
- 105 palabras de nivel 6, 15 por lección (comprobadas; ninguna repetida con la unidad 16).
- Mismas reglas: AllSet de apoyo; sin fuente, sílabo + frases propias marcadas (tu decisión) o mención; regla de 不/一. Temas sin juicios ni política; cifras reales solo con fuente y año (mejor, datos de ejemplo dichos así). Lección 2: solo lenguaje, sin consejos financieros; remite a Finanzas personales. Lección 5: sin consejos médicos.

## Lecciones

| # | Lección | Gramática de nivel 6 | Palabras (15) |
|---|---|---|---|
| 1 | Noticias y temas de actualidad | "把"字句4: sujeto no animado + 把 (这场雨把…); 把 + quien hace la acción | 报刊 3629, 报社 3632, 公众 4067, 热点 4688, 热议 4693, 新媒体 5064, 频道 4592, 稿件 4039, 主播 5345, 透露 4924, 焦点 4271, 真相 5277, 证实 5291, 评论 4602, 民众 4522 |
| 2 | Dinero: ahorro, inversión y consumo en chino | X归X，Y归Y; 放着X不Y | 理财 4431, 储蓄 3798, 贷款 3858, 利息 4442, 投资 4921, 股票 4077, 基金 4208, 收益 4811, 金融 4303, 货币 4201, 汇款 4192, 余额 5207, 账单 5268, 财产 3694, 诚信 3766 |
| 3 | Ciencia y tecnología de la información | 早(也)不X，晚(也)不X; X了就X了，(没)有… | 人工智能 4694, 病毒 3661, 点击 3896, 链接 4446, 联网 4444, 浏览器 4456, 扫描 4732, 文档 4986, 多媒体 3938, 存储 3830, 输出 4818, 识别 4783, 远程 5226, 隐私 5183, 漏洞 4462 |
| 4 | Energía y desastres naturales | 东一A，西一A; A一+clasificador，B一+clasificador | 能源 4554, 新能源 5066, 太阳能 4860, 石油 4791, 天然气 4891, 发电 3951, 电力 3901, 洪水 4151, 旱灾 4126, 台风 4857, 灾害 5240, 救援 4338, 排放 4567, 低碳 3888, 节能 4287 |
| 5 | Seguridad de los alimentos y salud | 这也不X，那也不Y; 看你X的 / 瞧他X的 | 添加 4889, 消毒 5046, 细菌 5009, 中毒 5330, 农产品 4560, 有机 5203, 维生素 4973, 蛋白质 3865, 脂肪 5298, 食欲 4792, 检测 4251, 监督 4244, 违规 4968, 症状 5293, 免疫 4510 |
| 6 | Voluntariado y vida en comunidad | clasificadores 扇, 枝, 卷; 不X不…，一X… (不看不知道，一看…); 好你个X | 公益 4063, 捐款 4351, 捐赠 4352, 互助 4161, 关爱 4089, 奉献 3996, 救助 4340, 养老院 5123, 残疾 3708, 福利 4003, 团结 4936, 协助 5059, 扇 4742, 枝 5295, 卷 4353 |
| 7 | Debates sobre educación | X到Y头上来了; 看/瞧 + 把 + O + X得 | 必修 3653, 选修 5088, 补习 3677, 辅导 4005, 升学 4774, 招生 5271, 学位 5090, 素质 4846, 导师 3879, 文科 4988, 理科 4432, 考核 4377, 评估 4601, 竞赛 4328, 学问 5091 |

Por lección: situación (texto o diálogo propio, p. ej. un titular y una noticia corta inventados en la lección 1), puntos con su fuente, tabla, 6 ejercicios. Lección 4: una gráfica de barras con datos de ejemplo. Lección 7: texto de debate (dos posturas) y cierre de la unidad, con preguntas que se responden con él; remite a Lectura.

## Datos (lista cerrada)
- Palabras: 105 líneas del 词汇大纲. Gramática: línea del 语法大纲 de nivel 6.
- Uso: al menos 3 datos por lección (Oxford CTCFL, MIT, Dartmouth, ChinGram, Yale; AllSet de apoyo). Datos reales del tema (si se usan): fuente oficial o universitaria con año.

## Reparto
- 3 investigadores: A (1–3), B (4–5), C (6–7).
- 2 constructores en serie (1–4 y 5–7); 2 auditores en serie (1–4 y 5–7).
- Permitidas: HSK 1–2, HSK 3 de unidades 7–8, nivel 4 de 9–12, nivel 5 de 13–15, nivel 6 de 16–17.

## Pasos
1. Carpeta: `plan.md`, `lineas-silabo.txt`, `encargo-investigadores.md`, `nivel.js`.
2. Investigadores; `ficha.md`, `citas.js`, revisión, `notas-director.md`.
3. Constructores; `antes-auditoria.js`; auditores.
4. Cierre: `verificar.js`, 7 lecciones en el headless shell, modal (+105), `./empaquetar.sh`, `README.md` (134 de 140), `fuentes.md`. Sin commit.

## Verificación
- `citas.js`, `verificar.js`, `revisar.js`, `render.js` (gráfica de la lección 4), `nivel.js`.
- Headless: 6 ejercicios, 1 tabla de vocabulario, 0 `data-audio`, sin `undefined`/`NaN`.
- Modal: la unidad nueva con 105 palabras.
