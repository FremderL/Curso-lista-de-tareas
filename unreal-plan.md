# 🎮 Plan de lecciones · Curso 6: Unreal Engine desde cero (Blueprints)

## 1. Por qué este curso

Unreal Engine 5 es el motor AAA más usado de la industria y **Blueprints es su superpoder**: programación visual por nodos que permite construir mecánicas completas sin escribir C++. La versión estable actual es **UE 5.8 (junio 2026, última gran versión de la rama 5)**; UE6 llegará en Early Access a fines de 2027 y **Blueprints seguirá vivo durante toda la transición** (Epic prometió herramientas de conversión), así que aprender Blueprints hoy es la puerta correcta. El alumno llega del Curso 5 sabiendo pensar en variables, ciclos y condiciones — aquí los convierte en **lógica de videojuegos real**.

## 2. Enfoque del curso

- **Motor BPX: simulador de Blueprints 100% en el navegador** (`ue_parts/bpx_engine.js`): un editor de nodos con pines de **ejecución** (flechas blancas) y pines de **datos** (colores estilo UE: bool rojo, int verde-azulado, float verde, string magenta), cables que se conectan con clics, y **▶ Ejecutar** que recorre el grafo y muestra la salida en un **Output Log** (como el de UE).
- Subconjunto honesto de Blueprints: Event BeginPlay, Print String, literales, variables Get/Set, aritmética con semántica de UE (`int/int` trunca hacia cero, distinta de Python: momento «¡ajá!»), comparaciones, lógica booleana, **Branch, Sequence, ForLoop (inclusivo), WhileLoop, ForEachLoop, FlipFlop**, Make Array + Array Len/Get/Add, conversiones To String/To Int/To Float, y **Custom Events + Call** (la puerta a la comunicación entre Blueprints).
- **Calificación por SALIDA**: cada ejercicio corre el grafo del alumno y compara las líneas del Output Log (`gradeOutput`), con chequeos opcionales de variables finales y de nodos requeridos (`requireNodes`: «usa un Branch»). Errores **en español, con el nodo culpable**: `⚠️ Nodo Branch #4: la entrada «Condición» no está conectada`.
- Sin instalación: el simulador vive en el navegador (funciona offline); cada lección indica cómo se hace lo mismo en el editor real de UE 5.8 (clic derecho → búsqueda de nodos, arrastrar pines, Compile + Play).
- Mismos estándares del campus: examen 30×10=300 (70% aprueba), SRS de conceptos (mazo `uecore`), libro de texto con 9 capítulos y bibliografía real verificada, playground persistente por cuenta (`dataUnreal`), boleta/certificado, menú global del campus (6 cursos), i18n.
- **Proyecto final: «Defensa de la Librería Esperanza»** (continuidad narrativa del campus): el jugador defiende la librería de slimes invasores — oleadas con ForLoop, vida y monedas con variables, inventario con arrays, derrota/victoria con Branch, y menú de turno con Custom Events.

## 3. Mapa del curso (8 módulos · 30 lecciones · ~95 ejercicios)

### Módulo 0 · Despega con Unreal (2 lecciones) 🎮
| # | Lección | Ejercicio |
|---|---------|-----------|
| 0-1 | Qué es UE5.8 y qué son los Blueprints (nodos vs código) | 3 grafos de impresión |
| 0-2 | El editor del curso: pines exec vs datos, cables, Output Log | 4 grafos guiados |

### Módulo 1 · El lienzo y los nodos (4 lecciones) 🧩
| # | Lección | Ejercicio |
|---|---------|-----------|
| 1-1 | Print String y el Output Log (orden de ejecución) | 4 |
| 1-2 | Literales: int, float, string, bool (colores de pines) | 4 |
| 1-3 | Cables de datos: conectar y reutilizar una salida | 4 |
| 1-4 | Nodos de conversión: To String / To Int / To Float | 4 |

### Módulo 2 · Datos y variables (4 lecciones) 🔢
| # | Lección | Ejercicio |
|---|---------|-----------|
| 2-1 | Variables Get/Set (mi primera variable de juego) | 4 |
| 2-2 | Aritmética estilo UE: int vs float, división que trunca, % | 4 |
| 2-3 | Comparaciones (== != < > <= >=) → pines bool | 4 |
| 2-4 | Lógica booleana: AND, OR, NOT, XOR | 4 |

### Módulo 3 · Flujo de ejecución (5 lecciones) 🔀
| # | Lección | Ejercicio |
|---|---------|-----------|
| 3-1 | Branch: la decisión (if/else visual) | 4 |
| 3-2 | Sequence y el orden de las flechas blancas | 4 |
| 3-3 | ForLoop: repetir N veces (¡rango inclusivo!) + pin Index | 4 |
| 3-4 | WhileLoop: repetir mientras (+ detector de ciclos infinitos) | 4 |
| 3-5 | FlipFlop y alternancia de estados | 3 |

### Módulo 4 · Colecciones (4 lecciones) 📦
| # | Lección | Ejercicio |
|---|---------|-----------|
| 4-1 | Make Array y Array Len | 4 |
| 4-2 | ForEachLoop: recorrer inventarios (Element, Array Index) | 4 |
| 4-3 | Array Get por índice (y errores de rango) | 4 |
| 4-4 | Array Add + Set: inventarios que crecen | 4 |

### Módulo 5 · Comunicación y robustez (3 lecciones) 🛡️
| # | Lección | Ejercicio |
|---|---------|-----------|
| 5-1 | Custom Events: divide y vencerás (tu primera «función» visual) | 4 |
| 5-2 | Llamadas entre grafos: Call + el patrón menú → acción | 4 |
| 5-3 | Leer errores del editor: cables sueltos, tipos que no cuadran, ciclos | 4 |

### Módulo 6 · Patrones de juego (4 lecciones) 🕹️
| # | Lección | Ejercicio |
|---|---------|-----------|
| 6-1 | Vida y daño: contadores con Branch de derrota | 4 |
| 6-2 | Oleadas: ForLoop + acumuladores de monedas | 4 |
| 6-3 | Estados de partida: victoria/derrota con cadenas de Branch | 4 |
| 6-4 | Del simulador al editor real de UE 5.8 (ruta de instalación) | quiz |

### Módulo 7 · Proyecto final y examen (4 lecciones) 🏆
| # | Lección | Ejercicio |
|---|---------|-----------|
| 7-1 | «Defensa de la Librería Esperanza» I: vida, slimes y oleadas | 5 |
| 7-2 | Proyecto II: monedas, botín y reporte de ronda (ForEach + Branch) | 5 |
| 7-3 | Proyecto III: menú de turno con Custom Events + pantalla final | 5 |
| 7-4 | Estrategia del examen + cierre (el horizonte UE6/Verse) | — |

## 4. Tecnología del curso (para `unreal.html`)

- **`BPX`** (`ue_parts/bpx_engine.js`): grafo `{nodes:[{id,type,x,y,props}], wires:[{from:'n1.then', to:'n2.in'}]}`; ejecución por pines exec con paso a paso y `maxSteps` (detecta ciclos infinitos); evaluación perezosa de pines de datos con coerción UE (int→float implícito; float→int exige To Int; bool estricto; números/string→string implícito en Print/Append). Devuelve `{ok, output, vars}`.
- **Editor visual**: lienzo con nodos arrastrables, paleta por categorías, conexión clic-pin→clic-pin, cables SVG con curvas, 🗑️ por nodo, ▶ Ejecutar + Output Log, botón «↺ Grafo inicial» por ejercicio. Soluciones guardadas por cuenta (`dataUnreal.bp`).
- **Calificación por salida** + `requireNodes` (estructura mínima) + chequeo de `vars` finales.
- Diagramas SVG (flujo de Branch/While) y «capturas» ilustrativas del editor real en las lecciones conceptuales (4-6: instalación, Epic Games Launcher, plantillas).

## 5. Bibliografía real (verificada)

- Romero, M. & Sewell, B. — *Blueprints Visual Scripting for Unreal Engine 5*, 3.ª ed., Packt (mayo 2022, 568 pp, ISBN 9781801811583).
- Butler, S. & Oliver, T. — *Game Development Patterns with Unreal Engine 5*, Packt (enero 2024, 254 pp) — el siguiente paso, patrones Blueprint↔C++.
- Butler-Boschma, T. — *Unreal Engine 5 Best Practices*, Packt (diciembre 2025) — iluminación, entornos y cinemática.
- Documentación oficial: dev.epicgames.com/documentation (Blueprints Visual Scripting, en español parcial).
- Ruta oficial gratuita de aprendizaje: dev.epicgames.com/learn (antes Unreal Learning Library).
- Nota de versión: **UE 5.8 (23 de junio de 2026) es la última gran versión planeada de la rama 5**; UE6 apunta a Early Access a fines de 2027 (State of Unreal, junio 2026); Blueprints convivirá con Verse durante la transición.

## 6. Criterios de éxito del curso

- [ ] Motor BPX verde en batería propia (~80 pruebas): exec/data, coerción, loops inclusivos, flipflop, arrays, custom events, ciclos infinitos.
- [ ] 30 lecciones con ~95 ejercicios calificados por salida en el editor de nodos.
- [ ] Proyecto final completo (3 lecciones) calificado por salida.
- [ ] Playground persistente por cuenta (`dataUnreal`), sin dependencias externas.
- [ ] Examen 30×10=300 con 70% para aprobar; SRS `uecore`; libro 9 capítulos con biblia real.
- [ ] Menú global del campus con los 6 cursos (nuevo campo `dataUnreal`, entrada c6 en TODOS los html).
