# 🐍 Plan de lecciones · Curso 5: Python desde cero

## 1. Por qué este curso

Python es EL lenguaje para empezar a programar en serio: sintaxis limpia, sin punctuación ruidosa, y el estándar de facto en datos, IA, automatización y backend. Es además el complemento natural del Curso 4: SQL consulta los datos, **Python los procesa**. El alumno llega aquí ya sabiendo pensar en variables, ciclos y condiciones (los usó en SQL); este curso los convierte en PROGRAMAS completos: lógica de menús, funciones reutilizables, estructuras de datos ricas y manejo de errores.

## 2. Enfoque del curso

- **Mini-interpreter de Python 100% en el navegador** (`PYE`, escrito en JavaScript, igual que el motor SQL del curso anterior): tokenizer con INDENT/DEDENT reales, parser y ejecutor paso a paso. **Sin instalar nada y sin internet.**
- Subconjunto honesto de Python 3 (sintaxis real, no pseudocódigo): `print/input`, variables y tipos (`int/float/str/bool/None`), operadores con semántica Python (`10/2 → 5.0`, `//`, `%` con signo de Python, `**`), f-strings con formato `:.2f`, `if/elif/else`, `while`, `for` + `range`, `break/continue`, listas, tuplas con desempaque, diccionarios, métodos de cadenas, **funciones con `def`** (parámetros con default, recursión), `try/except/finally`, módulos `math` y `random` (con semilla para ejercicios deterministas), `enumerate/zip/sorted/sum/min/max/round` (redondeo bancario real de Python).
- **Calificación por SALIDA**: cada ejercicio corre el programa del alumno con una cola de `input()` simulada y compara las líneas impresas contra las esperadas (`gradeOutput`), con chequeos opcionales de variables finales. El editor muestra los errores **en español, con número de línea** (y el nombre real de la excepción de Python, para que aprendan a leer tracebacks).
- Mismos estándares del campus: examen 30×10=300 (70% aprueba), SRS de conceptos (mazo `pycore`), libro de texto con 9 capítulos y bibliografía real verificada, playground persistente por cuenta (`dataPy`), boleta/certificado, menú global del campus (5 cursos), i18n.
- Proyecto final: **sistema de inventario de la Librería Esperanza en Python** (continuidad narrativa con el Curso 4): menú CRUD sobre listas/diccionarios + reportes con funciones.

## 3. Mapa del curso (8 módulos · 30 lecciones · ~100 ejercicios)

### Módulo 0 · Despega con Python (2 lecciones) 🐍
| # | Lección | Ejercicio calificado |
|---|---------|----------------------|
| 0-1 | Qué es Python y para qué sirve; tu primer `print` | 3 programas de impresión |
| 0-2 | El playground del curso y cómo leer errores (tracebacks en español) | 4 exploraciones guiadas |

### Módulo 1 · Datos y variables (5 lecciones) 🔢
| # | Lección | Ejercicio |
|---|---------|-----------|
| 1-1 | `print`, comentarios y separadores (`sep`, `end`) | 3 |
| 1-2 | Variables y asignación (nombres legales, reasignación) | 4 |
| 1-3 | Tipos: int, float, str, bool, None; `type()` y conversión `int()/float()/str()` | 4 |
| 1-4 | Números: `/ // % **`, precedencia, redondeo con `round()` | 4 |
| 1-5 | `input()`: programas que conversan + f-strings básicas | 4 |

### Módulo 2 · Decisiones y ciclos (5 lecciones) 🔀
| # | Lección | Ejercicio |
|---|---------|-----------|
| 2-1 | Comparaciones encadenadas y lógicos `and/or/not` | 3 |
| 2-2 | `if / elif / else` | 4 |
| 2-3 | `while`: contadores y acumuladores | 4 |
| 2-4 | `for` + `range` (con paso y cuenta regresiva) | 4 |
| 2-5 | `break/continue`, banderas y centinelas | 4 |

### Módulo 3 · Estructuras de datos (5 lecciones) 📦
| # | Lección | Ejercicio |
|---|---------|-----------|
| 3-1 | Listas I: crear, indexar (negativos), `len` | 4 |
| 3-2 | Listas II: `append/insert/remove/pop/sort`, slicing | 4 |
| 3-3 | Recorrer listas: `for`, `enumerate`, `sum/min/max`, `in` | 4 |
| 3-4 | Diccionarios: crear, `get`, `in`, agregar y borrar claves | 4 |
| 3-5 | Tuplas, desempaque (incluido swap) y recorrer `.items()` | 4 |

### Módulo 4 · Texto como profesional (3 lecciones) 🧵
| # | Lección | Ejercicio |
|---|---------|-----------|
| 4-1 | Métodos de cadenas: `upper/lower/strip/split/join/replace` | 4 |
| 4-2 | f-strings con formato: `:.2f`, anchos y alineación | 3 |
| 4-3 | Validar entrada: `isdigit`, `startswith`, membresía `in` | 3 |

### Módulo 5 · Funciones (4 lecciones) 🛠️
| # | Lección | Ejercicio |
|---|---------|-----------|
| 5-1 | `def` y `return` (y el `None` implícito) | 4 |
| 5-2 | Parámetros con valores por omisión; llamadas con orden | 4 |
| 5-3 | Ámbito: variables locales vs globales | 3 |
| 5-4 | Composición: funciones que llaman funciones; recursión suave (factorial) | 4 |

### Módulo 6 · Robustez y módulos (3 lecciones) 🛡️
| # | Lección | Ejercicio |
|---|---------|-----------|
| 6-1 | `try/except/finally`: ValueError, ZeroDivisionError | 4 |
| 6-2 | Módulos `math` y `random` (semilla determinista) | 4 |
| 6-3 | Mini-retos integradores (descuentos, tablas, menús) | 4 |

### Módulo 7 · Proyecto final y examen (3 lecciones) 🏆
| # | Lección | Ejercicio |
|---|---------|-----------|
| 7-1 | Proyecto I: datos del inventario + menú con `while` | 5 |
| 7-2 | Proyecto II: altas/bajas/cambios con funciones + reporte de ventas | 5 |
| 7-3 | Estrategia del examen + cierre | — |

## 4. Tecnología del curso (para `python.html`)

- **`PYE`** (python_parts/py_engine.js): mini-interpreter con lexer de indentación real, parser descendente y ejecutor con límite de pasos (detecta `while` infinitos: «Tu programa tardó demasiado…»). Errores SIEMPRE en español con línea: `⚠️ Línea 4 · ValueError: int() no pudo convertir «abc» a número entero`.
- **Editor + ▶ Ejecutar + stdin simulada**: cuadro de «Entradas (una por línea)» que alimenta `input()`; salida real debajo. Cada ejercicio corre en un entorno limpio.
- **Calificación por salida**: `PYE.gradeOutput(esperadas, obtenidas)` compara línea a línea (tolerando espacios finales); diff claro de la primera línea que difiere. Chequeos opcionales de variables (`wantVars`).
- **Playground persistente** en la cuenta (`dataPy`): código, entradas guardadas y botón «Limpiar salida».
- Diagramas de flujo SVG inline en las lecciones de ciclos y decisiones (análogo al ER del curso SQL).

## 5. Bibliografía real (verificada)

- Matthes, E. — *Python Crash Course*, 3.ª ed., No Starch Press (2023).
- Sweigart, A. — *Automate the Boring Stuff with Python*, 3.ª ed., No Starch Press (2025; gratis en automatetheboringstuff.com).
- Documentación oficial en español: docs.python.org/es/3 (tutorial + referencia).
- Severance, C. — *Python for Everybody* (gratis en py4e.com, con ejercicios y videos).
- Nota de versión: la serie 3.14 es la estable actual (devguide.python.org); 3.15 en desarrollo.

## 6. Criterios de éxito del curso

- [ ] 30 lecciones con ~100 ejercicios calificados por salida con el mini-interpreter.
- [ ] Playground persistente por cuenta, sin dependencias externas (funciona offline).
- [ ] Ciclos, funciones, listas/dicts y try/except cubiertos con casos reales.
- [ ] Proyecto final: menú CRUD de inventario + reportes, calificado por salida.
- [ ] Examen 30×10=300 con 70% para aprobar; boleta y certificado integrados.
- [ ] Menú global del campus con los 5 cursos (nuevo campo `dataPy`).
