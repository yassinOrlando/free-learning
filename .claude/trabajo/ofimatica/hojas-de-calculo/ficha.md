# Ficha: ofimatica · Unidad 3: Hojas de cálculo

## F1 · LibreOffice Help: Entering Values
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/cell_enter.xhp
- nombre: LibreOffice (en inglés), Help: Entering Values
- idioma: en
- año: 2026
- lecciones: Celdas, filas y columnas

- D1: La hoja de cálculo permite introducir datos en múltiples celdas y cambiar ajustes según preferencias.
  > calc can simplify entering data and values into multiple cells. you can change some settings to conform to your preferences.
- D2: Se avanza de celda en celda con Tab y al final de fila con Enter; Calc posiciona el cursor al inicio del bloque.
  > in the row below a heading row, you can advance from one cell to the next with the tab key. after you enter the value into the last cell in the current row, press enter. calc positions the cursor below the first cell of the current block.

## F2 · LibreOffice Help: Navigating Through Sheet Tabs
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/multi_tables.xhp
- nombre: LibreOffice (en inglés), Help: Navigating Through Sheet Tabs
- idioma: en
- año: 2026
- lecciones: Celdas, filas y columnas

- D3: Por defecto hay una hoja "Sheet1"; se añaden hojas con el botón (+) y se cambia entre ellas con las pestañas.
  > by default %productname displays one sheet "sheet1" in each new spreadsheet document. you can add sheets using the (+) button at the bottom of the screen and switch between sheets in a spreadsheet using the sheet tabs.
- D4: Los botones de navegación permiten ir a la primera, última o desplazar pestañas cuando hay muchas hojas.
  > use the navigation buttons to display all the sheets belonging to your document. clicking the button on the far left or the far right displays, respectively, the first or last sheet tab.

## F3 · LibreOffice Help: Copying to Multiple Sheets
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/edit_multitables.xhp
- nombre: LibreOffice (en inglés), Help: Copying to Multiple Sheets
- idioma: en
- año: 2026
- lecciones: Celdas, filas y columnas

- D5: Al seleccionar varias pestañas, lo que se escriba en la hoja activa se copia a la misma celda en las demás hojas seleccionadas.
  > in $[officename] calc, you can insert values, text or formulas that are simultaneously copied to other selected sheets of your document. select all desired sheets by holding down the command ctrl key and clicking the corresponding register tabs that are still gray at the bottom margin of the workspace. all selected register tabs are now white. you can use shift + command ctrl + page up or page down to select multiple sheets using the keyboard. now when you insert values, text or formulas into the active sheet, they will also appear in the identical positions in the other selected sheets.

## F4 · LibreOffice Help: Calculating With Dates and Times
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/calc_date.xhp
- nombre: LibreOffice (en inglés), Help: Calculating With Dates and Times
- idioma: en
- año: 2026
- lecciones: Tipos de datos

- D6: Tras restar fechas (=NOW()-A1) el resultado sale en formato fecha; hay que cambiar el formato a número para ver días.
  > after pressing the enter key you will see the result in date format. since the result should show the difference between two dates as a number of days, you must format cell a3 as a number.
- D7: El formato "General" muestra fechas; para ver el número se aplica formato "-1,234" en el diálogo Formato de celdas.
  > the format is set to "general", which causes the result of a calculation containing date entries to be displayed as a date. to display the result as a number, set the number format to "-1,234" and close the dialog with the ok button.

## F5 · LibreOffice Help: Formatting Numbers With Decimals
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/format_value.xhp
- nombre: LibreOffice (en inglés), Help: Formatting Numbers With Decimals
- idioma: en
- año: 2026
- lecciones: Tipos de datos

- D8: El formato solo redondea la visualización; internamente el número conserva todos sus decimales.
  > only the display in the document will be rounded off; internally, the number retains all four decimal places after the decimal point.

## F6 · LibreOffice Help: Displaying Formulas or Values
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/formula_value.xhp
- nombre: LibreOffice (en inglés), Help: Displaying Formulas or Values
- idioma: en
- año: 2026
- lecciones: Tipos de datos; Fórmulas básicas

- D9: En Opciones - Ver, marcando "Fórmulas" se muestran fórmulas (=SUMA(A1:B5)) en lugar de resultados.
  > if you want to display the formulas in the cells, for example in the form =sum(a1:b5), proceed as follows: choose %productname - preferences tools - options - %productname calc - view . in the display area mark the formulas box. click ok. if you want to view the calculation results instead of the formula, do not mark the formulas box.

## F7 · LibreOffice Help: Converting Text to Numbers
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/numbers_text.xhp
- nombre: LibreOffice (en inglés), Help: Converting Text to Numbers
- idioma: en
- año: 2026
- lecciones: Tipos de datos; Funciones: SUMA, PROMEDIO, MIN, MAX y CONTAR

- D10: SUMA ignora texto en rangos; la conversión solo ocurre en operaciones escalares, no en funciones de rango.
  > the formula =sum(a1:a2) , returns 101 instead of 201 because the conversion does not occur in a range, only for single scalar values. here, '1e2 is treated as string which is ignored for the sum function.
- D11: Las funciones que iteran secuencias (como SUMA) verifican el tipo y devuelven #VALOR! si hay texto no convertible.
  > because sum() and some others that iterate over number sequences explicitly check the argument type.

## F8 · LibreOffice Help: Entering Formulas
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/formula_enter.xhp
- nombre: LibreOffice (en inglés), Help: Entering Formulas
- idioma: en
- año: 2026
- lecciones: Fórmulas básicas

- D12: Las fórmulas deben comenzar siempre con el signo igual.
  > formulas must always begin with an equals sign.
- D13: Al clicar el icono Fórmula en la barra, aparece un signo igual en la línea de entrada para teclear la fórmula.
  > click the formula icon on the formula bar. you will now see an equals sign in the input line and you can begin to input the formula.

## F9 · LibreOffice Help: Calculating in Spreadsheets
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/calculate.xhp
- nombre: LibreOffice (en inglés), Help: Calculating in Spreadsheets
- idioma: en
- año: 2026
- lecciones: Fórmulas básicas

- D14: Al escribir una fórmula (=A3*A4/100) y pulsar Enter, el resultado aparece y se recalcula solo al editar.
  > type in a formula, for example, =a3 * a4 / 100. press enter. the result of the formula appears in the cell. if you want, you can edit the formula in the input line of the formula bar. when you edit a formula, the new result is calculated automatically.

## F10 · LibreOffice Help: Calculating With Formulas
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/formulas.xhp
- nombre: LibreOffice (en inglés), Help: Calculating With Formulas
- idioma: en
- año: 2026
- lecciones: Fórmulas básicas; Funciones: SUMA, PROMEDIO, MIN, MAX y CONTAR; La función SI

- D15: Los operadores + - * / respetan la jerarquía (multiplicación y división antes que suma y resta); paréntesis cambian el orden.
  > remember that the basic arithmetic operators (+, -, *, /) can be used in formulas using the "multiplication and division before addition and subtraction" rule. instead of writing =sum(a1:b1) you can write =a1+b1. parentheses can also be used. the result of the formula =(1+2)*3 produces a different result than =1+2*3.
- D16: Las funciones usan separador punto y coma o coma según configuración; ejemplos: =REDONDEAR(A1;1), =INTERES.EFECTIVO(5%;12).
  > =round(a1;1) displays the contents of cell a1 rounded to one decimal place. =effective(5%;12) calculates the effective interest for 5% annual nominal interest with 12 payments a year.
- D17: SUMA suma un rango; =B8-SUMA(B10:B14) resta la suma de un rango a una celda.
  > =b8-sum(b10:b14) calculates b8 minus the sum of the cells b10 to b14. =sum(b8;sum(b10:b14)) calculates the sum of cells b10 to b14 and adds the value to b8.

## F11 · LibreOffice Help: Copying Formulas
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/formula_copy.xhp
- nombre: LibreOffice (en inglés), Help: Copying Formulas
- idioma: en
- año: 2026
- lecciones: Fórmulas básicas; Referencias relativas y absolutas

- D18: El tirador de relleno (esquina inferior derecha) arrastra la fórmula copiándola y ajustando referencias automáticamente.
  > position the mouse on the bottom right of the highlighted border of the cell, and continue holding down the mouse button until the pointer changes to a cross-hair symbol. with the mouse button pressed, drag it down or to the right over all the cells into which you want to copy the formula. when you release the mouse button, the formula will be copied into the cells and automatically adjusted.
- D19: Manteniendo Ctrl al arrastrar se evita el ajuste en valores y textos, pero las fórmulas siempre se ajustan.
  > if you do not want values and texts to be automatically adjusted, then hold down the command ctrl key when dragging. formulas, however, are always adjusted accordingly.

## F12 · LibreOffice Help: Automatically Calculating Series
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/calc_series.xhp
- nombre: LibreOffice (en inglés), Help: Automatically Calculating Series
- idioma: en
- año: 2026
- lecciones: Fórmulas básicas

- D20: El tirador de relleno genera series ascendentes; si se seleccionan dos celdas con números distintos, reconoce el patrón aritmético.
  > drag the fill handle in the bottom right corner of the cell across the cells that you want to fill, and release the mouse button. the cells are filled with ascending numbers. to quickly create a list of consecutive days, enter monday in a cell, and drag the fill handle. hold down command ctrl if you do not want to fill the cells with different values. if you select two or more adjacent cells that contain different numbers, and drag, the remaining cells are filled with the arithmetic pattern that is recognized in the numbers.

## F13 · LibreOffice Help: Referencing a Cell in Another Sheet
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/cellreferences.xhp
- nombre: LibreOffice (en inglés), Help: Referencing a Cell in Another Sheet
- idioma: en
- año: 2026
- lecciones: Celdas, filas y columnas; Referencias relativas y absolutas

- D21: Una referencia a otra hoja usa =Hoja2.A1; cambios en la hoja origen se reflejan en la fórmula.
  > by way of example, enter the following formula in cell a1 of sheet1: =sheet2.a1 click the sheet 2 tab at the bottom of the spreadsheet. set the cursor in cell a1 there and enter text or a number. if you switch back to sheet1, you will see the same content in cell a1 there.

## F14 · LibreOffice Help: Addresses and References, Absolute and Relative
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/relativ_absolut_ref.xhp
- nombre: LibreOffice (en inglés), Help: Addresses and References, Absolute and Relative
- idioma: en
- año: 2026
- lecciones: Celdas, filas y columnas; Referencias relativas y absolutas

- D22: Una celda se identifica por columna (letra) y fila (número); el rango A1:B2 son las cuatro celdas de la esquina superior izquierda.
  > the cell in column a, row 1 is addressed as a1. you can address a range of adjacent cells by first entering the coordinates of the upper left cell of the area, then a colon followed by the coordinates of the lower right cell. for example, the square formed by the first four cells in the upper left corner is addressed as a1:b2.
- D23: La referencia relativa se ajusta al copiar; la absoluta pone $ delante de letra y número ($A$1:$B$2) y no se mueve.
  > by addressing an area in this way, you are making a relative reference to a1:b2. relative here means that the reference to this area will be adjusted automatically when you copy the formulas. absolute addressing absolute referencing is the opposite of relative addressing. a dollar sign is placed before each letter and number in an absolute reference, for example, $a$1:$b$2.
- D24: Pulsando F4 se alterna entre relativa, absoluta ($A$1), solo fila absoluta (A$1), solo columna absoluta ($A1) y vuelta a relativa.
  > $[officename] can convert the current reference, in which the cursor is positioned in the input line, from relative to absolute and vice versa by pressing f4 . if you start with a relative address such as a1, the first time you press this key combination, both row and column are set to absolute references ($a$1). the second time, only the row (a$1), and the third time, only the column ($a1). if you press the key combination once more, both column and row references are switched back to relative (a1) $[officename] calc shows the references to a formula.
- D25: Al copiar una fórmula, solo las referencias relativas se ajustan; las absolutas ($B$1) se quedan fijas —error típico si falta el $.
  > but be careful if you are copying a formula since in that case only the relative references will be adjusted, not the absolute references. absolute references are used when a calculation refers to one specific cell in your sheet. if a formula that refers to exactly this cell is copied relatively to a cell below the original cell, the reference will also be moved down if you did not define the cell coordinates as absolute.

## F15 · LibreOffice Help: Sorting Data
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/database_sort.xhp
- nombre: LibreOffice (en inglés), Help: Sorting Data
- idioma: en
- año: 2026
- lecciones: Ordenar y filtrar

- D26: Clic en base de datos o selección; si hay rango solo ese se ordena, si no, toda la base de datos; Datos - Ordenar.
  > click in a database range. if you select a range of cells, only these cells will get sorted. if you just click one cell without selecting, then the whole database range will get sorted. choose data - sort . the range of cells that will get sorted is shown in inverted colors. select the sort options that you want.

## F16 · LibreOffice Help: Filtering Cell Ranges
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/database_filter.xhp
- nombre: LibreOffice (en inglés), Help: Filtering Cell Ranges
- idioma: en
- año: 2026
- lecciones: Ordenar y filtrar

- D27: El filtro automático pone flechas en encabezados; al elegir valor, solo se muestran filas que cumplen el criterio.
  > choose data - autofilter . an arrow button is added to the head of each column in the database range. click the arrow button in the column that contains the value or string that you want to set as the filter criteria. select the value or string that you want to use as the filter criteria. the records that match the filter criteria that you selected are shown.

## F17 · LibreOffice Help: Applying AutoFilter
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/autofilter.xhp
- nombre: LibreOffice (en inglés), Help: Applying AutoFilter
- idioma: en
- año: 2026
- lecciones: Ordenar y filtrar

- D28: Los filtros se combinan en varias columnas; filas filtradas no se borran y SUMA las cuenta salvo que se use SUBTOTALES.
  > when you apply an additional autofilter on another column of a filtered data range, then the other combo boxes list only the filtered data. to display all records again, select the all entry in the autofilter combo box. if you choose standard , the standard filter dialog appears, allowing you to set up a standard filter. choose "top 10" to display the highest 10 values only. to stop using autofilter, reselect all cells selected in step 1 and once again choose data - autofilter . to assign different autofilters to different sheets, you must first define a database range on each sheet. the arithmetic functions also take account of the cells that are not visible due to an applied filter. for example, a sum of an entire column will also total the values in the filtered cells. apply the subtotal function if only the cells visible after the application of a filter are to be taken into account.

## F18 · LibreOffice Help: Applying Filters
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/filters.xhp
- nombre: LibreOffice (en inglés), Help: Applying Filters
- idioma: en
- año: 2026
- lecciones: Ordenar y filtrar

- D29: Filtro estándar conecta condiciones con Y/O; avanzado admite hasta ocho criterios en la hoja; quitar filtro: Datos - Filtro - Restablecer.
  > in the standard filter dialog, you can also define ranges which contain the values in particular data fields. you can use the standard filter to connect the conditions with either a logical and or a logical or operator. the advanced filter allows up to a total of eight filter conditions. with advanced filters you enter the conditions directly into the sheet. to remove a filter, so that you see all cells again, click inside the area where the filter was applied, then choose data - filter - reset filter .

## F19 · LibreOffice Help: Applying Conditional Formatting
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/cellstyle_conditional.xhp
- nombre: LibreOffice (en inglés), Help: Applying Conditional Formatting
- idioma: en
- año: 2026
- lecciones: Formato condicional

- D30: Formato condicional resalta valores según condición (ej. mayor que la media) y se actualiza solo al cambiar datos.
  > with conditional formatting, you can, for example, highlight the totals that exceed the average value of all totals. if the totals change, the formatting changes correspondingly, without having to apply other styles manually.
- D31: Reglas por valor (menor que, mayor o igual), por texto, duplicados, escala de color y barras; formato manual encima puede tapar la regla.
  > define the condition as follows: if cell value is less than $j$14, format with cell style "below", and if cell value is greater than or equal to $j$14, format with cell style "above". step 5: copy cell style to apply the conditional formatting to other cells later: click one of the cells that has been assigned conditional formatting. copy the cell to the clipboard. select the cells that are to receive this same formatting.

## F20 · LibreOffice Help: Using AutoFormat for Tables
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/autoformat.xhp
- nombre: LibreOffice (en inglés), Help: Using AutoFormat for Tables
- idioma: en
- año: 2026
- lecciones: Formato condicional

- D32: AutoFormat aplica estilos a rangos mínimos 3x3 desde Formato - Estilos de AutoFormato; se eligen propiedades a aplicar.
  > use the autoformat feature to quickly apply a format to a selected cell range. applying an autoformat to a selected cell range select the range of cells to which the autoformat style is to be applied. the range must be at least 3 columns and 3 rows in size. go to format - autoformat styles to open the autoformat dialog. in the format list choose the autoformat style to apply. in the formatting section choose which properties from the autoformat style to apply to the selected cell range.

## F21 · LibreOffice Help: Pivot Table
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/datapilot.xhp
- nombre: LibreOffice (en inglés), Help: Pivot Table
- idioma: en
- año: 2026
- lecciones: Tablas dinámicas

- D33: Tabla dinámica (antes DataPilot) combina, compara y analiza grandes cantidades; permite ver resúmenes y crear informes.
  > the pivot table (formerly known as datapilot ) allows you to combine, compare, and analyze large amounts of data. you can view different summaries of the source data, you can display the details of areas of interest, and you can create reports.

## F22 · LibreOffice Help: Creating Pivot Tables
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/datapilot_createtable.xhp
- nombre: LibreOffice (en inglés), Help: Creating Pivot Tables
- idioma: en
- año: 2026
- lecciones: Tablas dinámicas

- D34: Se crea con cursor en tabla origen, Insertar - Tabla dinámica, arrastrando campos a cuatro zonas: Filtros, Campos de columna, Campos de fila, Campos de datos.
  > position the cursor within a range of cells containing values, row and column headings. choose insert - pivot table . the select source dialog appears. choose current selection and confirm with ok . the table headings are shown as buttons in the pivot table dialog. drag these buttons as required and drop them into the layout areas "filters", "column fields", "row fields" and "data fields".
- D35: En Campos de datos se elige función de resumen (suma, promedio, cuenta); la tabla se actualiza al cambiar el origen.
  > if the button is dropped in the data fields area it will be given a caption that also shows the formula that will be used to calculate the data. by double-clicking on one of the fields in the data fields area you can call up the data field dialog. use the data field dialog to select the calculations to be used for the data. to make a multiple selection, press the command ctrl key while clicking the desired calculation.

## F23 · LibreOffice Help: Editing Pivot Tables
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/datapilot_edittable.xhp
- nombre: LibreOffice (en inglés), Help: Editing Pivot Tables
- idioma: en
- año: 2026
- lecciones: Tablas dinámicas

- D36: Se edita arrastrando botones (cambiar orden, mover columna a fila); botón derecho - Propiedades abre diálogo de diseño.
  > click one of the buttons in the pivot table and hold the mouse button down. a special symbol will appear next to the mouse pointer. by dragging the button to a different position in the same row you can alter the order of the columns. if you drag a button to the left edge of the table into the row headings area, you can change a column into a row. in the pivot table dialog, you can drag a button to the filters area to create a button and a listbox on top of the pivot table. the listbox can be used to filter the pivot table by the contents of the selected item. you can use drag-and-drop within the pivot table to use another page field as a filter. to remove a button from the table, just drag it out of the pivot table. release the mouse button when the mouse pointer positioned within the sheet has become a 'not allowed' icon. the button is deleted. to edit the pivot table, click a cell inside the pivot table and open the context menu. in the context menu you find the command properties , which displays the pivot table layout dialog for the current pivot table.

## F24 · LibreOffice Help: Pivot Chart
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/pivotchart.xhp
- nombre: LibreOffice (en inglés), Help: Pivot Chart
- idioma: en
- año: 2026
- lecciones: Gráficos; Tablas dinámicas

- D37: Gráfico dinámico usa datos y series de tabla dinámica; ajusta rango y series automáticamente al cambiar la tabla.
  > a pivot chart is a chart with data range and data series of a pivot table . different from static sized tables, where the number of rows and columns are constant, pivot tables can have varying dimensions, depending on the pivot table settings and its data source contents. pivot charts track the changes in the data issued from a pivot table and adjust the data series and data range accordingly.

## F25 · LibreOffice Help: Creating Pivot Charts
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/guide/pivotchart_create.xhp
- nombre: LibreOffice (en inglés), Help: Creating Pivot Charts
- idioma: en
- año: 2026
- lecciones: Gráficos

- D38: Para crear gráfico: clic en tabla dinámica, Insertar - Gráfico; asistente detecta tabla y permite elegir tipo y elementos.
  > to create a pivot chart proceed as below: click inside the pivot table that you want to present in your chart. choose insert - chart or click in the insert chart icon insert chart icon in the main toolbar. %productname calc automatically detects the pivot table and opens the pivot chart wizard. select the chart type for the data in the chart wizard. the data range and the data series pages of the chart wizard are not enabled. they are controlled by the pivot table. select the chart elements of the pivot chart in the wizard. click ok to close the wizard and create the pivot chart.

## F26 · Wikipedia: Hoja de cálculo
- url: https://es.wikipedia.org/wiki/Hoja_de_c%C3%A1lculo
- nombre: Wikipedia, Hoja de cálculo
- idioma: es
- año: 2026
- lecciones: Celdas, filas y columnas; Tipos de datos

- D39: Una hoja de cálculo organiza datos en matriz de filas y columnas; la celda es la unidad básica donde se insertan valores y fórmulas.
  > una hoja de cálculo es un tipo de documento que permite manipular datos numéricos y alfanuméricos dispuestos en forma de tablas compuestas por celdas, las cuales se suelen organizar en una matriz de filas y columnas. [ 1 ] la celda es la unidad básica de información en la hoja de cálculo, [ 2 ] donde se insertan los valores y las fórmulas que realizan los cálculos.

## F27 · Wikipedia: Tabla dinámica
- url: https://es.wikipedia.org/wiki/Tabla_din%C3%A1mica
- nombre: Wikipedia, Tabla dinámica
- idioma: es
- año: 2026
- lecciones: Tablas dinámicas

- D40: La tabla dinámica agrupa datos de una tabla mayor y clasifica, cuenta, totaliza o promedia automáticamente; muestra resultados en cuadro resumido.
  > una tabla dinámica (también llamada tabla pivote , pivot table , en inglés) es una tabla-resumen (datos dispuestos en filas y columnas) que agrupa datos procedentes de otra tabla o base de datos de mayor tamaño. se usa como herramienta para el procesamiento de grandes cantidades de datos. las tablas dinámicas son capaces de clasificar, contar, totalizar o dar la media de forma automática de los datos almacenados en una tabla (base de datos) o una hoja de cálculo , entre otras funciones estadísticas. los resultados se muestran en un segundo cuadro de información (la propia tabla dinámica) que muestra los datos resumidos y ordenados de forma efectiva y comprensible.

## F28 · Wikipedia: Gráfico
- url: https://es.wikipedia.org/wiki/Gr%C3%A1fico
- nombre: Wikipedia, Gráfico
- idioma: es
- año: 2026
- lecciones: Gráficos

- D41: Un gráfico representa visualmente datos cuantitativos para manifestar correlaciones estadísticas; usa ejes, series y leyenda.
  > una gráfica , una representación gráfica o un gráfico es un tipo de representación de datos , generalmente cuantitativos, mediante recursos visuales ( líneas , vectores , superficies o símbolos ), para que se manifieste visualmente) la relación matemática o correlación estadística que guardan entre sí.

## F29 · Wikipedia: Diagrama de barras
- url: https://es.wikipedia.org/wiki/Diagrama_de_barras
- nombre: Wikipedia, Diagrama de barras
- idioma: es
- año: 2026
- lecciones: Gráficos

- D42: El gráfico de barras compara cantidades mediante barras rectangulares de longitud proporcional; barras horizontales o verticales.
  > un diagrama de barras , gráfico de barras o gráfico de columnas es una forma de representar gráficamente un conjunto de datos o valores mediante barras rectangulares de longitud proporcional a los valores representados. los gráficos de barras pueden ser usados para comparar cantidades de una variable en diferentes momentos o diferentes variables para el mismo momento.

## F30 · Wikipedia: Tipo de dato
- url: https://es.wikipedia.org/wiki/Tipo_de_dato
- nombre: Wikipedia, Tipo de dato
- idioma: es
- año: 2026
- lecciones: Tipos de datos

- D43: El tipo de dato indica la clase de valores y qué operaciones se pueden realizar; incluye enteros, decimales, cadenas, y restringe valores permitidos.
  > en ciencias de la computación , un tipo de dato informático o simplemente tipo es un atributo de los datos que indica al programador sobre la clase de datos que se va a manejar. esto incluye imponer restricciones en los datos, como qué valores pueden tomar y qué operaciones se pueden realizar.

## F31 · Wikipedia: Presupuesto
- url: https://es.wikipedia.org/wiki/Presupuesto
- nombre: Wikipedia, Presupuesto
- idioma: es
- año: 2026
- lecciones: Proyecto: tu presupuesto personal en una hoja de cálculo

- D44: El presupuesto es la planificación anticipada de ingresos y gastos en términos financieros para un periodo; permite establecer prioridades y evaluar objetivos.
  > es el cálculo, la planificación y la formulación anticipada de los ingresos y gastos de una actividad económica . es un plan de acción dirigido a cumplir con un objetivo previsto, expresado en términos financieros, el cual debe cumplirse en determinado tiempo, por lo general anual o mensual y en ciertas condiciones.

## F32 · Wikipedia: Balance (contabilidad)
- url: https://es.wikipedia.org/wiki/Balance_(contabilidad)
- nombre: Wikipedia, Balance (contabilidad)
- idioma: es
- año: 2026
- lecciones: Proyecto: tu presupuesto personal en una hoja de cálculo

- D45: El saldo (balance) refleja la situación financiera restando obligaciones (pasivo) de lo que se posee (activo); en hoja personal: ingresos menos gastos.
  > el balance general , balance de situación o estado de situación patrimonial es un informe financiero contable que refleja la situación económica y financiera de una empresa en un momento determinado. [ 1 ] el estado de situación financiera se estructura a través de tres conceptos patrimoniales, el activo , el pasivo y el patrimonio neto , desarrollados cada uno de ellos en grupos de cuentas que representan los diferentes elementos patrimoniales. el activo incluye todas aquellas cuentas que reflejan los valores de los que dispone la entidad. todos los elementos del activo son susceptibles de traer dinero a la empresa en el futuro, bien sea mediante su uso, su venta o su cambio. por el contrario, el pasivo: muestra todas las obligaciones ciertas del ente y las contingencias que deben registrarse.

## F33 · LibreOffice Help: VLOOKUP and HLOOKUP
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/01/04060109.xhp
- nombre: LibreOffice (en inglés), Help: VLOOKUP and HLOOKUP
- idioma: en
- año: 2026
- lecciones: Buscar datos: BUSCARV y BUSCARX

- D46: BUSCARV busca un valor en la primera columna de un rango y devuelve el valor de la misma fila en la columna indicada por el argumento Índice.
  > This function checks if a specific value is contained in the first column of an array. The function then returns the value in the same row of the column named by Index .
- D47: El argumento CoincidenciaExacta (SortedRangeLookup) en BUSCARV: si es FALSE o 0, exige coincidencia exacta y devuelve #N/A si no se encuentra; si se omite o es TRUE, asume datos ordenados y devuelve el valor menor más próximo.
  > If the SortedRangeLookup parameter is omitted or set to TRUE or one, it is assumed that the data is sorted in ascending order. In this case, if the exact Lookup is not found, the last value that is smaller than the criterion will be returned. If SortedRangeLookup is set to FALSE or zero, an exact match must be found, otherwise the error Error: Value Not Available will be the result.
- D48: BUSCARH busca un valor en la primera fila de un rango y devuelve el valor de la misma columna en la fila indicada por el argumento Índice (columnas y filas intercambiadas respecto a BUSCARV).
  > This function verifies if the first row of an array contains a certain value. The function returns then the value in a row of the array, named in the Index , in the same column. HLOOKUP(Lookup; Array; Index [; SortedRangeLookup]) For an explanation on the parameters, see: VLOOKUP (columns and rows are exchanged)
- D49: La sintaxis de BUSCARV es =BUSCARV(ValorBuscado; Matriz; Índice; [CoincidenciaExacta]); la de BUSCARH es =BUSCARH(ValorBuscado; Matriz; Índice; [CoincidenciaExacta]).
  > =VLOOKUP(Lookup; Array; Index [; SortedRangeLookup]) Lookup is the value of any type looked for in the first column of the array. Array is the reference, which is to comprise at least as many columns as the number passed in Index argument. Index is the number of the column in the array that contains the value to be returned. The first column has the number 1.

## F34 · LibreOffice Help: XLOOKUP Function
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/01/func_xlookup.xhp
- nombre: LibreOffice (en inglés), Help: XLOOKUP Function
- idioma: en
- año: 2026
- lecciones: Buscar datos: BUSCARV y BUSCARX

- D50: BUSCARX busca un valor en un vector (fila o columna) y devuelve el resultado de otro vector del mismo tamaño; no requiere que la tabla esté ordenada.
  > Searches for a value in an array and returns a reference to a cell or range of cells. XLOOKUP function is a modern and flexible replacement for older functions like VLOOKUP , HLOOKUP , and LOOKUP . XLOOKUP supports approximate and exact matching, wildcards (* ?) or regular expressions for partial matches, and lookups in vertical or horizontal ranges.
- D51: La sintaxis de BUSCARX es =BUSCARX(ValorBuscado; VectorBúsqueda; VectorResultado; [SiNoEncontrado]; [ModoCoincidencia]; [ModoBúsqueda]).
  > XLOOKUP( [Search criterion] ; Search Array ; Result Array [ ; [ Result if not found ] [ ; [Match Mode] [ ; Search Mode ] ] ] )
- D52: El argumento SiNoEncontrado permite devolver un valor personalizado en lugar de #N/A cuando no hay coincidencia; si se omite y no hay coincidencia, devuelve #N/A.
  > Result if not found : a text or cell content to return if the Lookup value is not found. If a valid match is not found and Result if not found is omitted, the function returns the #N/A error.
- D53: El ModoCoincidencia 0 (predeterminado) exige coincidencia exacta; -1 devuelve el siguiente menor si no hay exacta; 1 devuelve el siguiente mayor; 2 permite comodines (* ? ~).
  > 0 : exact match (default). If Search criterion value is not found and Result if not found text is omitted, then return the #N/A error. -1 : attempt exact match. If Search criterion value is not found, then return the next smaller item. 1 : attempt exact match. If Search criterion value is not found, then return the next larger item. 2 : a wildcard match where characters * (multiple characters), ? (single character), and ~ have special meanings.
- D54: El ModoBúsqueda 1 (predeterminado) busca de primero a último; -1 busca en reversa (de último a primero); 2 y -2 usan búsqueda binaria requiriendo datos ordenados ascendente o descendente respectivamente.
  > 1 : returns the first occurrence starting from the first item of Search Array (default). -1 : reverse search. Returns the first occurrence starting from the last item of Search Array . 2 : binary search that relies on Search Array being sorted in ascending order. If not sorted, invalid results will be returned. -2 : binary search that relies on Search Array being sorted in descending order. If not sorted, invalid results will be returned.

## F35 · LibreOffice Help: IF Function
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/01/04060105.xhp
- nombre: LibreOffice (en inglés), Help: IF Function
- idioma: en
- año: 2026
- lecciones: La función SI

- D55: La función SI evalúa una prueba lógica y devuelve un valor si es verdadera y otro si es falsa; sintaxis: =SI(Prueba; [ValorVerdadero]; [ValorFalso]).
  > IF(Test [; [ThenValue] [; [OtherwiseValue]]]) Test is any value or expression that can be TRUE or FALSE. ThenValue (optional) is the value that is returned if the logical test is TRUE. OtherwiseValue (optional) is the value that is returned if the logical test is FALSE.
- D56: La prueba puede comparar números (ej. A1>5) o texto (ej. A1="pagado"); el texto en la comparación va entre comillas rectas.
  > =IF(A1>5;100;"too small") If the value in A1 is greater than 5 , the value 100 is returned; otherwise, the text too small is returned.
- D57: Si falta el argumento ValorVerdadero o ValorFalso, se trata como 0; si la prueba es verdadera y ValorVerdadero está vacío, devuelve 0; si es falsa y ValorFalso está vacío, devuelve 0.
  > =IF(A1>5;;"too small") If the value in A1 is greater than 5 , the value 0 is returned because empty parameters are considered to be 0 ; otherwise, the text too small is returned. =IF(A1>5;100;) If the value in A1 is less than 5 , the value 0 is returned because the empty OtherwiseValue is interpreted as 0 ; otherwise 100 is returned.

## F36 · LibreOffice Help: COUNT Function
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/01/04060181.xhp
- nombre: LibreOffice (en inglés), Help: COUNT Function
- idioma: en
- año: 2026
- lecciones: Funciones: SUMA, PROMEDIO, MIN, MAX y CONTAR

- D58: CONTAR cuenta cuántos números hay en la lista de argumentos; ignora las entradas de texto.
  > Counts how many numbers are in the list of arguments. Text entries are ignored.
- D59: Ejemplo: =CONTAR(2;4;6;"ocho") devuelve 3 porque solo cuenta los tres números y omite el texto "ocho".
  > =COUNT(2;4;6;"eight") = 3. The count of numbers is therefore 3.

## F37 · LibreOffice Help: AVERAGE, MIN, MAX Functions
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/01/04060184.xhp
- nombre: LibreOffice (en inglés), Help: AVERAGE, MIN, MAX Functions
- idioma: en
- año: 2026
- lecciones: Funciones: SUMA, PROMEDIO, MIN, MAX y CONTAR

- D60: PROMEDIO devuelve el promedio (media aritmética) de los argumentos; sintaxis: =PROMEDIO(Argumento1; Argumento2; ...).
  > Returns the average of the arguments. AVERAGE( ) =AVERAGE(A1:A50)
- D61: MÁX devuelve el valor máximo de una lista de argumentos; ignora las celdas de texto; si no hay valores numéricos devuelve 0.
  > Returns the maximum value in a list of arguments. Returns 0 if no numeric value and no error was encountered in the cell range(s) passed as cell reference(s). Text cells are ignored by MIN() and MAX().
- D62: MÍN devuelve el valor mínimo de una lista de argumentos; ignora las celdas de texto; si no hay valores numéricos devuelve 0.
  > Returns the minimum value in a list of arguments. Returns 0 if no numeric value and no error was encountered in the cell range(s) passed as cell reference(s). Text cells are ignored by MIN() and MAX().

## F38 · LibreOffice Help: Select Function (AutoSum)
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/02/06030000.xhp
- nombre: LibreOffice (en inglés), Help: Select Function (AutoSum)
- idioma: en
- año: 2026
- lecciones: Funciones: SUMA, PROMEDIO, MIN, MAX y CONTAR

- D63: El botón Σ (Suma automática / Seleccionar función) inserta una función sobre un rango de celdas; al clicar la flecha se eligen variantes: Suma, Promedio, Mín, Máx, Contar, ContarA, Producto, DesvEst, DesvEstP, Var, VarP.
  > Inserts a function of a cell range into the current cell. Click in a cell, click this icon, select the function in the drop down list and optionally adjust the cell range. Alternatively, select some cells into which the function value will be inserted, then click the icon. The function result is added at the bottom of the range. Icon Select Function Select Function Functions for the selected range: Function Inserted function Sum = (...) Average = (...) Min = (...) Max = (...) Count = (...) CountA = (...) Product = (...) Stdev = (...) StdevP = (...) Var = (...) VarP = (...)
- D64: Si se selecciona un rango antes de pulsar Σ, el resultado se coloca al final del rango (abajo si hay varias filas, a la derecha si es una sola fila).
  > When the selected range has two or more rows, the function is calculated for each column. The results are placed in empty cells on the first available row below the range, one result per column. When the selected range has one row, the function result is placed in the first available cell on the right of the selected range.

## F39 · LibreOffice Help: Inserting Charts
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/shared/guide/chart_insert.xhp
- nombre: LibreOffice (en inglés), Help: Inserting Charts
- idioma: en
- año: 2026
- lecciones: Gráficos

- D65: Para insertar un gráfico en Calc: 1) clic dentro del rango de datos, 2) clic en el icono Insertar gráfico en la barra Estándar, 3) seguir el Asistente de gráfico.
  > Chart in a Calc spreadsheet Click inside the cell range that you want to present in your chart. Click the Insert Chart icon on the Standard toolbar. You see a chart preview and the Chart Wizard. Follow the instructions in the Chart Wizard to create the chart.
- D66: Los gráficos basados en datos de Calc se actualizan automáticamente cuando cambian los datos de origen.
  > Insert a chart based on data from cells in Calc or Writer. These charts update automatically when the source data changes.

## F40 · LibreOffice Help: Chart Wizard - Chart Type
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/schart/01/wiz_chart_type.xhp
- nombre: LibreOffice (en inglés), Help: Chart Wizard - Chart Type
- idioma: en
- año: 2026
- lecciones: Gráficos

- D67: En el Asistente de gráfico se elige el tipo básico: Columnas, Barras, Pastel, Líneas, etc.; cada tipo ofrece variantes (apiladas, 3D, etc.).
  > Choose a basic chart type : click any of the entries labeled Column, Bar, Pie, and so on. The contents on the right side will change to offer more options depending on the basic chart type.

## F41 · LibreOffice Help: Chart Wizard - Data Range
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/schart/01/wiz_data_range.xhp
- nombre: LibreOffice (en inglés), Help: Chart Wizard - Data Range
- idioma: en
- año: 2026
- lecciones: Gráficos

- D68: En la página Rango de datos del Asistente se selecciona el rango (ej. $Sheet1.$B$3:$B$14); se elige si las series están en filas o en columnas.
  > On this page of the Chart Wizard you can select one single source of data range. This range may consist of more than one rectangular range of cells. context menu Data Ranges Use the Chart Wizard - Data Series page if you need more control over the data ranges. This dialog is only available for charts based on a Calc or Writer table. To specify a data range Select the data range. Do one of the following: Enter the data range in the text box. In Calc, an example data range would be "$Sheet1.$B$3:$B$14" . Note that a data range may consist of more than one region in a spreadsheet, e.g. "$Sheet1.A1:A5;$Sheet1.D1:D5" is also a valid data range.
- D69: Las casillas "Primera fila como etiqueta" y "Primera columna como etiqueta" usan los encabezados para nombres de series y categorías; si no se marcan, todas las filas/columnas son series de datos.
  > First row as label For data series in columns: The first row in the range is used as names for data series. For data series in rows: The first row in the range is used as categories. The remaining rows comprise the data series. If this check box is not selected, all rows are data series. first column as label First column as label For data series in columns: The first column in the range is used as names for data series. For data series in rows: The first column in the range is used as categories. The remaining columns comprise the data columns. If this check box is not selected, all columns are data columns.

## F42 · LibreOffice Help: Chart Wizard - Chart Elements
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/schart/01/wiz_chart_elements.xhp
- nombre: LibreOffice (en inglés), Help: Chart Wizard - Chart Elements
- idioma: en
- año: 2026
- lecciones: Gráficos

- D70: En la página Elementos del gráfico se añaden título, subtítulo, etiquetas de ejes (eje X horizontal, eje Y vertical, eje Z en 3D) y leyenda (con posiciones: izquierda, arriba, derecha, abajo).
  > Enter a title for your chart. subtitle Enter a subtitle for your chart. x axis Enter a label for the x-axis (horizontal). y axisx axis Enter a label for the y-axis (vertical). z axis Enter a label for the z-axis. This option is only available for three-dimensional charts. legend --> Displays a legend in your chart. legend left --> Positions the legend to the left of the chart. top --> Positions the legend to the top of the chart. right --> Positions the legend to the right of the chart. bottom --> Positions the legend to the bottom of the chart. grid x axis Displays grid lines that are perpendicular to the x-axis. y axis Displays grid lines that are perpendicular to the y-axis. z axis Displays grid lines that are perpendicular to the z-axis. This option is only available for three-dimensional charts.
- D71: La leyenda muestra automáticamente las etiquetas de la primera fila o columna; si no hay etiquetas, muestra "Fila 1, Fila 2..." o "Columna A, Columna B..."; no se puede editar el texto directamente.
  > The legend displays the labels from the first row or column, or from the range that you have set in the Data Series dialog. If your chart does not contain labels, the legend displays text like "Row 1, Row 2, ...", or "Column A, Column B, ..." according to the row number or column letter of the chart data. You cannot enter the text directly, it is automatically generated from the Name cell range.

## F43 · LibreOffice Help: Conditional Formatting Dialog
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/01/05120000.xhp
- nombre: LibreOffice (en inglés), Help: Conditional Formatting Dialog
- idioma: en
- año: 2026
- lecciones: Formato condicional

- D72: El formato condicional aplica estilos de celda según condiciones evaluadas en orden; la primera condición verdadera determina el formato; se requieren AutoCalcular activado.
  > Use Conditional Formatting to define range-based conditions that determine which cell style will be applied to each cell in a given range based on its contents. The cell style corresponding to the first condition that evaluates to true is applied. Cell styles applied through Conditional Formatting override cell styles applied manually using the Formatting Bar or the Styles sidebar . You can enter several conditions that query the cell values or results of formulas. The conditions are evaluated from first to the last. If Condition 1 is true based on the current cell contents, the corresponding cell style is applied. Otherwise, Condition 2 is evaluated to determine if its corresponding style will be applied. If none of the conditions match cell contents, then no changes are made to the cell
- D73: Los formatos condicionales no sobrescriben los estilos de celda ni el formato directo aplicado manualmente; permanecen guardados como propiedades de la celda y se aplican cuando no hay condiciones coincidentes.
  > Conditional formats do not overwrite cell styles and direct formatting applied manually. They remain saved as cell properties and are applied when the cell matches no conditions or when you remove all conditional formats.
- D74: Las condiciones se evalúan de la primera a la última; si la Condición 1 es verdadera se aplica su estilo; si no, se evalúa la Condición 2, etc.; si ninguna coincide, no cambia el formato.
  > You can enter several conditions that query the cell values or results of formulas. The conditions are evaluated from first to the last. If Condition 1 is true based on the current cell contents, the corresponding cell style is applied. Otherwise, Condition 2 is evaluated to determine if its corresponding style will be applied. If none of the conditions match cell contents, then no changes are made to the cell format.

## F44 · LibreOffice Help: Conditional Formatting - Color Scale and Data Bar
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/01/05120400.xhp
- nombre: LibreOffice (en inglés), Help: Conditional Formatting - Color Scale and Data Bar
- idioma: en
- año: 2026
- lecciones: Formato condicional

- D75: La escala de color aplica un gradiente bicolor o tricolor al rango según el valor de cada celda; usa mínimo, máximo, percentil, porcentaje o fórmula como umbrales.
  > Applies a color scale to a range consisting of displaying a bicolor or tricolor gradient on this range depending on the value of each cell. Conditions The calculation of the color scale depends on 2 or 3 conditions, defined as follows: Min (Max) : calculates using the minimum (maximum) values in the range. Value : a fixed value. Enter the value in the text box. Percentile : A percentile is each of the 99 values which divide the sorted data in 100 equal parts, so that each part represents 1/100 of the sample population. A percentile return the value for a data series going from the smallest to the largest value in a set of data. For P = 25, the percentile means the first quartile. P = 50 is also the MEDIAN of the data set. Enter the percentile value in the text box. Valid values are from 0 to 100. Percent : a fixed value representing the percentage of the minimum (maximum) of the length defined by minimum and maximum values in the range. A minimum of 10% selects the values below 10% of the segment [Min,Max]. A maximum of 80% select values above 80% of the segment [Min,Max]. Valid values are from 0 (zero) to 100. Do not enter a percent (%) sign. Formula : A formula expression starting with the equal sign (=) that calculates a numeric value. Values can be numbers, dates or time. Enter the formula expression in the text box.
- D76: Las barras de datos rellenan la celda con color sólido o degradado proporcional al valor numérico; opciones: mínimo/máximo automático o fijo, colores para positivo/negativo, relleno degradado o sólido, eje automático/central/ninguno, longitud mínima/máxima, mostrar solo barras.
  > Data bar option fills the cell with solid or gradient color corresponding to the numeric value in the cell. Conditions The calculation of the bar area fill is based on the conditions below: Automatic : calculates using the minimum and maximum values in the range. Min (Max) : calculates using the minimum (maximum) values in the range. More Options The Data Bar dialog opens to add details on the display of data bars. Entry values Same as the conditions above. Bar Colors Choose the color for positive and negative values. Fill Gradient : set a color scale between the color of positive (negative) values and white. Color : use the positive (negative) color for the entire data bar, no fade out gradient. Axis Set the position of the vertical axis for the data bar. Values are Automatic: position the vertical axis in the middle of the maximum and minimum values. Middle: set the vertical axis in the middle of the column. None: do not display a vertical axis. Bar Lengths Sets the minimum (maximum) length of the data bars, as a percentage of the column width. Display bars only Do not display values in the cell, only the data bars.

## F45 · LibreOffice Help: Error Codes in Calc
- url: https://raw.githubusercontent.com/LibreOffice/help/master/source/text/scalc/05/02140000.xhp
- nombre: LibreOffice (en inglés), Help: Error Codes in Calc
- idioma: en
- año: 2026
- lecciones: Tipos de datos

- D77: El error #N/A significa "Valor no disponible"; ocurre cuando un resultado no está disponible (ej. búsqueda sin coincidencia en BUSCARV/BUSCARX).
  > #N/A Value not Available A result for the formula expression is not available.
- D78: El error #¡DIV/0! (código 532) significa "División por cero"; ocurre al dividir entre cero o en funciones como VARP, DESVESTP con pocos argumentos.
  > 532 #DIV/0! Division by zero Division operator / if the denominator is 0 Some more functions return this error, for example: VARP with less than 1 argument STDEVP with less than 1 argument VAR with less than 2 arguments STDEV with less than 2 arguments STANDARDIZE with stdev=0 NORMDIST with stdev=0
- D79: El error #VALOR! (código 519) significa "Sin valor"; ocurre cuando una fórmula produce un valor que no corresponde a la definición o una celda referenciada contiene texto en lugar de número.
  > 519 #VALUE! No value (instead of Err:519 cell displays #VALUE!) The formula yields a value that does not correspond to the definition; or a cell that is referenced in the formula contains text instead of a number.
- D80: Los errores se propagan: una celda que referencia a otra con error heredará ese error (o mostrará el suyo propio si la fórmula lo genera).
  > Status Bar . ### error message invalid references; error messages error messages;invalid references invalid names; error messages #REF error message #N/A error message #NAME error message #SPILL error message error codes;list of Error Code Message Explanation ### none The cell is not wide enough to display the contents. #FMT none This value is outside of limits valid for this format #N/A Value not Available A result for the formula expression is not available.