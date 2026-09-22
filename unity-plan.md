# 🎮 Plan de lecciones · Curso 7: Unity desde cero (C#)

## 1. Por qué este curso

Unity es el motor más usado del mundo para juegos indie y móviles, y su lenguaje es **C#**. La versión de referencia es **Unity 6.3 LTS** (dic 2025, soporte hasta dic 2027) — la recomendada para producción; las Update (6.5, 6.6) son para pre-producción. El alumno llega del Curso 6 sabiendo PENSAR en juego (estados, oleadas, turnos con Blueprints); aquí aprende a ESCRIBIRLO en un lenguaje de texto real, que además es la puerta a cualquier carrera de programación profesional (.NET, backend, juegos AAA).

## 2. Enfoque del curso

- **Motor UCS: mini-interpreter de C# 100% en el navegador** (`unity_parts/ucs_engine.js`), mismo espíritu que PYE (Python) y BPX (Blueprints): programas completos de consola con `Console.WriteLine` / `Debug.Log`, ejecutados paso a paso, **errores en español con línea y código CS real** (`⚠️ Línea 4 · CS0103: el nombre «vida» no existe en este contexto`).
- Subconjunto honesto de C# moderno (top-level statements, como los ejemplos de la doc oficial): `using X;` (se ignora), variables tipadas y `var`, `int/float/bool/string`, aritmética con semántica C# (int/int trunca hacia cero, DivideByZeroException con ints), comparaciones y lógica cortocircuitada, `if/else`, `while`, `do-while`, `for`, `foreach`, `break/continue`, **arrays** (`new int[]{…}`, `.Length`), **`List<T>`** (Add, Count, Contains, Remove, RemoveAt), **métodos** (estáticos o no, parámetros con default, recursión), **clases** (campos, constructores, métodos de instancia, `new`), **string interpolation** `$"Hola {nombre}, tienes {oro:F2} monedas"` (con formato F0-F3), **Vector3** (suma, resta, escala, magnitude, ToString de Unity `(1.0, 0.0, -2.0)`), **Mathf** (Floor/Ceil/Round/Abs/Max/Min/Sqrt/Pow) y **Random.Range con semilla** (`Random.InitState`) — la variante Unity (rango inclusivo), contrastada con Python y con UE.
- **Calificación por SALIDA**: cada ejercicio corre con una cola de `Console.ReadLine` simulada y compara las líneas impresas (`gradeOutput`), con chequeos de variables finales. Detalles auténticos: bools se imprimen `True/False` (¡con mayúscula!), `int.Parse` lanza `FormatException`, los arrays lanzan `IndexOutOfRangeException`.
- Sin instalación: el simulador vive en el navegador; la lección 6-3 enseña el salto real (Unity Hub → Editor 6.3 LTS, MonoBehaviour, Start/Update, Debug.Log en Console).
- Mismos estándares del campus: examen 30×10=300 (70% aprueba), SRS (mazo `cscore`), libro de texto 9 capítulos con bibliografía real, playground persistente por cuenta (`dataUnity`), boleta/certificado, menú global (7 cursos), i18n.
- **Proyecto final: «La batalla de la Librería Esperanza»** (continuidad narrativa con el curso 6): el juego de defensa de slimes renace en C# por turnos — clases `Slime` y `Heroe`, oleadas con `for`, log de batalla con interpolación, inventario con `List<string>` y Random con semilla para el daño.

## 3. Mapa del curso (8 módulos · 30 lecciones · ~100 ejercicios)

### Módulo 0 · Despega con Unity y C# (2 lecciones) 🎮
| # | Lección | Ejercicio |
|---|---------|-----------|
| 0-1 | Qué es Unity 6.3 LTS y qué es C#; tu primer `Debug.Log` | 3 programas de impresión |
| 0-2 | El laboratorio: `Console.WriteLine`, errores CS y cómo leerlos | 4 exploraciones guiadas |

### Módulo 1 · Datos y variables (5 lecciones) 🔢
| # | Lección | Ejercicio |
|---|---------|-----------|
| 1-1 | WriteLine/Write, comentarios y el formato de salida | 3 |
| 1-2 | Variables y tipos: int, float, bool, string, var | 4 |
| 1-3 | Aritmética C#: int/int trunca, %, casting (int)/(float) | 4 |
| 1-4 | Strings e interpolación `$"…{expr:F2}…"` | 4 |
| 1-5 | `Console.ReadLine` + `int.Parse` (FormatException) | 4 |

### Módulo 2 · Decisiones y ciclos (5 lecciones) 🔀
| # | Lección | Ejercicio |
|---|---------|-----------|
| 2-1 | Comparaciones y lógica `&& || !` (cortocircuito) | 3 |
| 2-2 | if / else if / else | 4 |
| 2-3 | while y do-while | 4 |
| 2-4 | for (el ciclo del gameplay) | 4 |
| 2-5 | break, continue y centinelas | 4 |

### Módulo 3 · Colecciones y azar (5 lecciones) 📦
| # | Lección | Ejercicio |
|---|---------|-----------|
| 3-1 | Arrays: `new int[]{…}`, `.Length`, índices | 4 |
| 3-2 | `List<T>`: Add, Count, Remove | 4 |
| 3-3 | foreach: recorrer todo | 4 |
| 3-4 | Agregados: acumuladores, max/min a mano | 4 |
| 3-5 | Random.Range con semilla (la versión Unity, inclusiva) | 4 |

### Módulo 4 · Métodos (3 lecciones) 🛠️
| # | Lección | Ejercicio |
|---|---------|-----------|
| 4-1 | Métodos: void, return y parámetros | 4 |
| 4-2 | Parámetros con default y llamadas | 3 |
| 4-3 | Ámbito y recursión (factorial, Fibonacci) | 4 |

### Módulo 5 · Clases y objetos (4 lecciones) 🧱
| # | Lección | Ejercicio |
|---|---------|-----------|
| 5-1 | Tu primera clase: campos y `new` | 4 |
| 5-2 | Constructores: objetos listos al nacer | 4 |
| 5-3 | Métodos de instancia: el objeto actúa | 4 |
| 5-4 | Vector3 y Mathf: matemática de juego | 4 |

### Módulo 6 · Robustez y estilo Unity (3 lecciones) 🛡️
| # | Lección | Ejercicio |
|---|---------|-----------|
| 6-1 | try/catch/finally: FormatException e IndexOutOfRange | 4 |
| 6-2 | Patrones de juego: acumuladores, estados, daño | 4 |
| 6-3 | Del laboratorio al editor real (Unity Hub, MonoBehaviour) | quiz |

### Módulo 7 · Proyecto final y examen (3 lecciones) 🏆
| # | Lección | Ejercicio |
|---|---------|-----------|
| 7-1 | «La batalla de la Librería Esperanza» I: clases Slime y Heroe | 5 |
| 7-2 | Proyecto II: la batalla por turnos con log e inventario | 5 |
| 7-3 | Proyecto III: reporte final + estrategia del examen | 4 |

## 4. Tecnología del curso (para `unity.html`)

- **`UCS`** (`unity_parts/ucs_engine.js`): lexer (con strings interpoladas como tokens compuestos), parser descendente con `{}` (sin sensibilidad a indentación) y ejecutor con entorno por método, guardián de recursión (StackOverflowException) y límite de pasos (detecta while infinitos). API idéntica a PYE: `UCS.run(src,{stdin,wantVars,maxSteps}) → {ok,output,vars}|{ok:false,error}`, `UCS.gradeOutput(esperadas, obtenidas,{trim})`.
- Errores: `⚠️ Línea N · CSxxxx: mensaje en español` (CS1002 falta «;», CS0103 nombre inexistente, CS0266 float→int necesita cast…); excepciones de runtime con nombre real: FormatException, DivideByZeroException, IndexOutOfRangeException, NullReferenceException, StackOverflowException.
- Editor + ▶ Ejecutar + stdin simulada (igual que Python); calificación por salida con diff de la primera línea que difiere.
- Playground persistente en la cuenta (`dataUnity`).
- El «code demo» de las lecciones usa el MISMO runner: botón «▶ Probar» en los ejemplos de código (sin calificación).

## 5. Bibliografía real (verificada)

- Joseph Hocking — *Unity in Action*, 3.ª ed., Manning (2022). El libro estándar de Unity con C#.
- Unity 6.3 LTS: dic 2025, soporte hasta dic 2027 (LTS recomendada para producción); Updates 6.5/6.6 para pre-producción (unity.com/releases/unity-6/support; sep 2026).
- Documentación oficial de scripting C#: docs.unity3d.com (Scripting API) y learn.unity.com (rutas gratuitas: Creative Core, Junior Programmer).
- Microsoft Learn — fundamentos de C# (learn.microsoft.com/dotnet/csharp), gratis y oficial.
- Nota de versión: C# 13/.NET 9 vigentes en 2026; el curso usa el subconjunto común a todas las versiones modernas.

## 6. Criterios de éxito del curso

- [ ] Motor UCS verde en batería propia (~100 pruebas): tipado, interpolación, arrays/Lists, métodos, clases, Vector3, Mathf, Random con semilla, try/catch, errores CS con línea.
- [ ] 30 lecciones con ~100 ejercicios calificados por salida.
- [ ] Proyecto final completo (3 lecciones): batalla por turnos con clases, calificado por salida.
- [ ] Playground persistente por cuenta (`dataUnity`), sin dependencias externas.
- [ ] Examen 30×10=300 con 70% para aprobar; SRS `cscore`; libro 9 capítulos con biblia real.
- [ ] Menú global del campus con los 7 cursos (nuevo campo `dataUnity`, entrada c7 en TODOS los html).
