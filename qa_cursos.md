# 🔍 QA individual de cursos · CodeCamp (7 cursos)

> Metodo: sondeo automático con jsdom (login, rutas, ejercicios reales, examen, libro,
> boleta, i18n, persistencia) + auditoría manual de contenido (preguntas fill, bibliografía,
> consistencia CAMPUS). El QA es **read-only**: no se modifica el curso analizado; los hallazgos
> se anotan aquí para decidir qué mejorar.

---

## Curso 1 · Lista de Tareas (`index.html`) — QA 20 sep 2026

**Suite automática: `tests/qa_c1.js` → 49 OK · 0 FALLO** ✅

| Área | Resultado |
|---|---|
| Arranque y login | ✅ sin fatal(); invitado funciona |
| CAMPUS | ✅ 7 cursos [c1..c7] sin dups/nulls · thisCourse c1 · TOTAL_MAX = max declarado (1300) |
| Estructura | 6 módulos · **29 lecciones** · 26 quizzes (108 preguntas: 87mc/18fill/3tf) · examen **30** (25mc/3fill/2tf) |
| Lecciones | ✅ las 29 renderizan sin excepción |
| Editor en vivo (5 bloques) | ✅ textarea + ▶ Ejecutar con iframe de vista previa |
| Ejercicios calificados (3) | ✅ regex-checks funcionan: 8/8 → 80 pts, guardado en cuenta |
| Demos interactivos | ✅ domtree/appenddemo/navdemo/storedemo renderizan |
| Examen | ✅ 30 preguntas, califica, examScore persiste |
| Libro | ✅ **14 capítulos** renderizan; bibliografía real y abundante (Duckett, Flanagan 7.ª, Haverbeke *Eloquent JS* 4.ª 2024, Meyer & Weyl, Krug, Robbins 6.ª 2025, MDN, web.dev, hpbn.co) |
| Boleta | ✅ renderiza, certificado con nombre, sin textos de Cambridge |
| i18n ES→EN | ✅ topbar, sidebar, H1 de boleta, menú usuario… **con huecos (hallazgo 2)** |
| Persistencia | ✅ campo de cuenta `data` (modelo legacy), sin contaminación de otros cursos |
| Consola | ✅ 0 errores jsdom |

### Auditorías finas

- **18 preguntas fill analizadas una a una**: justas y lenientes (norm() lowercased+acentos+espacios; regex con bandera `i`). Riesgo de «marcar mal una correcta»: bajo. La de `<link>` avisa «escribe SOLO el nombre de la etiqueta»; la de `getElementById` pide solo el método (el `document.` está fuera del hueco). ✓
- **Bibliografía**: verificable y actualizada; nada inventado a simple vista. ✓
- **Duplicado detectado**: la entrada **c3** del CAMPUS dentro de index.html tiene `dataKey:'dataEn', dataKey:'dataEn'` (línea ~4149). Benigno (JS se queda con el último) pero sucio.

### Hallazgos y mejoras propuestas (prioridad sugerida)

| # | Hallazgo | Impacto | Mejora propuesta | Prioridad |
|---|---|---|---|---|
| 1 | `dataKey` duplicado en entrada c3 del CAMPUS de index.html | Estético/robustez | Borrar el duplicado (1 línea) | 🟢 trivial |
| 2 | **i18n de la boleta incompleto**: en EN quedan chips «pendiente/completada/presentado», fila «📝 Examen final», lead-text y mensajes de nivel en español (H1 y topbar sí traducen). **SISTÉMICO: python.html (y probablemente 3,4,6,7) comparten el defecto** | Estándar del campus: «el idioma se aplica a TODA la página» | Pasar esos strings por `t()`/I18N en TODOS los html (mismo parche en cada archivo, o añadirlo al checklist del builder) | 🟠 alta |
| 3 | Campo de cuenta legacy `data` (los demás cursos: `dataEn…dataUnity`) | Homogeneidad multi-curso; futuras migraciones | Migrar a `dataEn` con fallback de lectura del `data` viejo (una vez, sin romper cuentas existentes) | 🟡 media |
| 4 | **Sin flashcards SRS** (cursos 3-7 tienen mazo; blankData de c1 ni siquiera tiene `srs:{}`) | Consistencia de estándar | Crear mazo `webcore` (~20 tarjetas HTML/CSS/JS) + bloques `srs` en lecciones clave | 🟡 media |
| 5 | Código de los editores de práctica NO persiste por cuenta (`EDITOR_CODES` en memoria); cursos 5-7 sí persisten | UX al recargar | Guardar el código del alumno en la cuenta y restaurarlo | 🟡 media |
| 6 | Solo **3 ejercicios calificados** en todo el curso (1-5, 2-4, 3-6); los cursos nuevos tienen 30-114 | Rigor de evaluación | Añadir 1 mini-ejercicio calificado por módulo (6-9 en total), mismo mecanismo de regex-checks | 🟢 opcional |
| 7 | Libro de 14 capítulos (estándar posterior: 9) | Consistencia | Dejarlo así (más contenido) o condensar; NO es bug | ⚪ decisión |
| 8 | 29 lecciones (los demás 30) | — | CAMPUS ya declara total:29 correctamente; solo observación | ⚪ ninguna |
| 9 | `fillOk` ignora `accept` cuando la pregunta tiene `re` (dejaría de ser fallback) | Robustez futura | Hacer `re \|\| accept` (OR) en el chequeo | 🟢 opcional |
| 10 | Fecha de la boleta fija `es-MX` también en EN | Detalle i18n | Usar el idioma activo en `toLocaleDateString` | 🟢 trivial |

### Decisión pendiente del usuario
- ¿Aplicar mejoras ya, o terminar el QA de los 7 cursos y decidir en bloque?
- La #2 es la más valiosa y es compartida por todos los cursos → conviene arreglarla una vez y
  replicarla en los 7 archivos durante este mismo QA.

---
_(los cursos 2–7 se agregan aquí conforme se les haga QA)_

## Curso 2 · JavaScript + Juego de Memoria (`javascript.html`) — QA 20 sep 2026

**Suite automática: `tests/qa_c2.js` → 45 OK · 0 FALLO** ✅

| Área | Resultado |
|---|---|
| Arranque y login | ✅ sin fatal(); invitado funciona |
| CAMPUS | ✅ 7 cursos [c1..c7] · thisCourse c2 · TOTAL_MAX (3715) = max declarado |
| Estructura | 6 módulos · **26 lecciones** · 22 quizzes · examen **30** (25mc/5fill) |
| Lecciones | ✅ las 26 renderizan sin excepción |
| **Ejercicios calificados** | ✅ **26 (¡uno por lección!) con 136 checks regex**: 0 regex rotos, 0 starters que ya pasan todo (hay que trabajar de verdad) |
| Ejercicio 1-1 completo | ✅ 6/6 checks → 100 pts → guardado en `dataJs` |
| Editor de práctica (3) | ✅ ▶ Ejecutar con iframe + ↺ Restablecer funciona |
| Quizzes | ✅ califican con feedback ✅/❌ |
| Examen | ✅ 30 preguntas, califica, examScore persiste |
| Libro | ✅ 9 capítulos; bibliografía real: Haverbeke *Eloquent JS* 4.ª (2024), Flanagan 7.ª (2020), Simpson *YDKJS* 2.ª, Osmani, Rauschmayer *Exploring JS*, Archibald (web.dev), MDN |
| i18n ES→EN | ✅ topbar/menú; ⚠️ hallazgo sistémico #2 (boleta) confirmado también aquí |
| Persistencia | ✅ campo moderno `dataJs` (a diferencia de c1, ya migrado) |
| Consola | ✅ 0 errores jsdom |

### Auditorías finas

- **20 preguntas fill analizadas**: justas y lenientes (aceptan `...`/`spread`, `#/hash/numeral`, `JSON.parse`/`parse`, `aspect-ratio` con espacio). ✓
- **El juego de Memoria del demo está muy bien hecho**: clase `Carta` con campos privados `#`, clase `JuegoMemoria`, mezcla Fisher-Yates, DocumentFragment, cronómetro y récords — es EL orgullo del curso.

### 🔴 Hallazgo principal (bug real, con fix verificado)

**El demo del Juego de Memoria (appdemo en lección 1-1) sale con TABLERO VACÍO.**
- Causa: `FINAL_DEMO` usa `<\/script>` (escape necesario dentro del `<script>` de la página),
  pero se inyecta tal cual en `iframe.srcdoc` → el parser del iframe no reconoce `<\/script>`
  como cierre → `SyntaxError: Unexpected token '<'` → el JS del juego muere.
- Verificado con jsdom: sin fix, 0 cartas + SyntaxError. **Con el fix de UNA línea**
  (`f.srcdoc = FINAL_DEMO.replace(/<\\\//g, '</')` en `initDemos`, línea ~4441)
  **el juego es 100% jugable**: se completó 8/8 pares, contador de intentos, cronómetro,
  «🎉 ¡Nuevo récord! 8 intentos» y récord guardado.
- Alcance: vivo solo en c2 (lección 1-1). El mismo patrón existe como **código muerto** en
  index.html (appDemoHtml sin bloque que lo use) y en los otros 5 html (solo la línea de uso,
  sin elementos). Fix preventivo de 1 línea por archivo si se quiere blindar todo el campus.
- Extra cosmético: la barra del iframe dice `…/mi-lista-de-tareas/` (herencia de c1);
  debería ser `…/juego-de-memoria/`.

### Hallazgos y mejoras propuestas

| # | Hallazgo | Impacto | Mejora propuesta | Prioridad |
|---|---|---|---|---|
| 1 | **Demo del juego con tablero vacío** (`<\/script>` en srcdoc) | El «esto es lo que construirás» de la lección 1-1 no funciona | 1 línea: des-escapar al inyectar; ya probado | 🔴 alta |
| 2 | URL decorativa del appframe: «mi-lista-de-tareas» | Detalle | Cambiar a «juego-de-memoria» | 🟢 trivial |
| 3 | Sin flashcards SRS | Consistencia de estándar (c1 igual) | Mazo `jscore` (~20 tarjetas) si se decide uniformar | 🟡 media |
| 4 | Código de los 26 editores NO persiste por cuenta (solo en memoria) | UX al recargar | Guardar en `dataJs` como hacen los cursos 5-7 | 🟡 media |
| 5 | 26 lecciones (menos que 30) | — | CAMPUS correcto; solo observación | ⚪ ninguna |
| 6 | i18n boleta (sistémico #2) | Estándar de campus | Mismo parche global | 🟠 alta (global) |
| 7 | `<\/script>` en srcdoc: patrón presente (muerto) en los otros 6 html | Robustez futura | Aplicar el fix preventivo en los 7 | 🟢 trivial |

---

## QA de los cursos 3–7 (`tests/qa_rest.js`) — 20 sep 2026

**Suite parametrizada común: 163 OK · 0 FALLO** (c3: 32 · c4: 33 · c5: 33 · c6: 32 · c7: 33) ✅

Cada curso pasó el mismo sondeo profundo: login → CAMPUS [c1..c7] → TOTAL_MAX=max declarado →
examen 30 → barrido de TODAS las lecciones → **ejercicio REAL calificado** → SRS → examen
calificado → libro 9 caps → boleta → i18n EN↔ES → persistencia por dataKey → consola limpia.

| Curso | Ejercicio real calificado | SRS | Particulares verificados |
|---|---|---|---|
| **c3 Inglés** (ingles.html) | ✅ actividad B1 completa (opciones+gaps+rúbrica+writing) → score en `dataEn` | ✅ mazo `verbs` en `#/repaso` (avanza a tarjeta 2) | 34 lecciones · `speechAvailable()` protege el listening en navegadores sin voz · EXAM 30 |
| **c4 SQL** (sql.html) | ✅ sqlex: solución real ejecutada → tabla → ✅ → score en `dataSql` | ✅ `sqlcore` | EXAM 30 · diagramas ER/str/num/op renderizan |
| **c5 Python** (python.html) | ✅ pyex: solución corrida con PYE → salida → ✅ → score en `dataPy` | ✅ `pycore` | EXAM 30 · diagramas de flujo ifelse/forloop |
| **c6 Unreal** (unreal.html) | ✅ bpex: grafo de solución cargado → Output Log → ✅ → score en `dataUnreal` | ✅ `uecore` | EXAM 30 · TOTAL_MAX 4055 |
| **c7 Unity** (unity.html) | ✅ ucs: solución C# corrida → salida → ✅ → score en `dataUnity` | ✅ `cscore` | EXAM 30 · TOTAL_MAX 3780 |

**Consistencia global verificada**: los `max` del CAMPUS son idénticos en los 7 archivos
(c1 1300 · c2 3715 · c3 4329 · c4 3040 · c5 4014 · c6 4055 · c7 3780); en el archivo propio de
c4–c7 el valor es `TOTAL_MAX` en runtime y coincide. Sin dups ni nulls en ningún archivo.

### Hallazgos en c3–c7

| # | Hallazgo | Impacto | Prioridad |
|---|---|---|---|
| A | i18n boleta (chips/lead/filas en ES cuando el idioma es EN) — **confirmado en los 7 cursos** | Estándar de campus | 🟠 alta |
| B | `FINAL_DEMO` se USA en c3–c7 pero **solo está definido en c1/c2** (código muerto: ningún bloque appdemo ni elemento `data-appframe` existe en ellos, verificado en runtime) | Latente: si algún día se añade un bloque appdemo ahí, daría ReferenceError | 🟢 baja (documentado) |
| C | Los 5 cursos tienen <5 bloques quiz tipo `t:'quiz'` en el conteo estático de c4 (4) — verificado en runtime que los ejercicios/sqlex compensan; el examen sí es 30 | — | ⚪ observación |

**Ningún problema grave en los cursos 3–7.** ✅

---

## 🔧 FIX APLICADO durante el QA (problema grave del Curso 2)

**Síntoma**: el demo del Juego de Memoria (appdemo, lección 1-1 de `javascript.html`) salía con
tablero vacío — `SyntaxError: Unexpected token '<'` porque el HTML del demo contenía `<\/script>`
(escape necesario dentro del `<script>` de la página) y se inyectaba tal cual en `iframe.srcdoc`.

**Fix (1 línea)**: des-escapar al inyectar.
`f.srcdoc = FINAL_DEMO.replace(/<\\\//g, '</')`
- `javascript.html` (línea 4441) — donde el bug estaba **vivo**.
- `index.html` (línea 3582) — mismo patrón definido (hoy muerto), parche preventivo idéntico.

**Verificación end-to-end (jsdom)**: el `srcdoc` real del iframe ya no contiene `<\/script>`;
al alimentar ese HTML a un navegador (JSDOM) el demo produce **16 cartas sin errores**; y en la
prueba de jugabilidad completa se ganó 8/8 pares con intentos, cronómetro, «🎉 ¡Nuevo récord!» y
récord persistido.

**Regresión tras el fix**: qa_c1 49/49 · qa_c2 45/45 · qa_c3–c7 163/163 · smoke_py 42 ·
smoke_ue 47 · smoke_sql 34 · smoke_unity 48 · smoke_reg OK. Cero efectos secundarios.

---

## Resumen cross-cursos FINAL (QA 1–7 completo)

| Hallazgo | c1 | c2 | c3 | c4 | c5 | c6 | c7 | Alcance |
|---|---|---|---|---|---|---|---|---|
| ~~Demo appdemo roto (`<\/script>`)~~ | patrón | **vivo** | — | — | — | — | — | **ARREGLADO** ✅ |
| ~~i18n boleta incompleta en EN~~ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **APLICADA** ✅ (21 sep) |
| ~~Sin SRS~~ | ✅ | ✅ | — | — | — | — | — | **APLICADA** ✅ mazos `webcore`/`jscore` (21 sep) |
| ~~Editores sin persistencia~~ | ✅ | ✅ | — | n/a | — | — | — | **APLICADA** ✅ `edCode` (21 sep) |
| ~~dataKey legacy `data` (vs dataXx)~~ | ✅ | — | — | — | — | — | — | **APLICADA** ✅ migrado a `dataEn` con auto-migración (21 sep) |
| ~~dataKey duplicado en entrada c3~~ | ✅ | — | — | — | — | — | — | **ARREGLADO** ✅ |
| ~~FINAL_DEMO no definido (muerto)~~ | — | — | ✅ | ✅ | ✅ | ✅ | ✅ | **ARREGLADO** ✅ |
| ~~URL decorativa appframe desactualizada~~ | — | ✅ | — | — | — | — | — | **ARREGLADO** ✅ |

**Estado**: los 7 cursos cargan, enseñan, califican de verdad, guardan progreso y pasan sus
exámenes. El único bug funcional grave de toda la campaña quedó **arreglado y verificado**.
**Todas las mejoras del QA fueron aplicadas y re-verificadas con regresión verde (21 sep 2026)** — ver la sección siguiente.

### Mejoras pendientes (decisión del usuario, ninguna es grave)
> **✅ APROBADAS Y APLICADAS el 21 sep 2026** (el usuario respondió «si»). Detalle y regresión en la sección «Mejoras aplicadas».

### ✅ Mejoras aplicadas (21 sep 2026) + regresión completa verde
1. 🟠 **i18n de boleta EN (los 7)**: chips `pending/completed/taken`, fila «Final exam», headers de tabla (Lesson/Status/Points/%), botones Presentar/Repetir examen, Playground / «Get the project code», placeholder «e.g. Jane Doe», lead-text y 4 mensajes de nivel, todo por `CHROME_I18N` + gh-info/fecha dinámicos según `langPref()`.
2. 🟡 **SRS para c1 y c2**: mazos `webcore` (17 tarjetas) y `jscore` (18), replicando el patrón de c5–c7: vista `#/repaso`, entrada «🃏 Repaso del día» en el menú lateral con badge de pendientes, cajas Leitner 1/2/4/8/16 días, sesión de 10 tarjetas/día, persistencia en `state.srs` (`dataEn.srs`/`dataJs.srs`), pares EN en `CHROME_I18N`. Bonus: arreglado un bug latente de «Volver» (exit) que también tenían c5–c7 (re-render con sesión nula).
3. 🟡 **Persistencia de editores c1/c2**: campo `edCode` en el estado; guardado con debounce (400 ms) al escribir, inmediato al «▶ Ejecutar», borrado al «↺ Restablecer»; restauración automática al volver a la lección con preview auto-cargado (patrón `pyCode` de c5).
4. 🟡 **c1 `data`→`dataEn`**: `dataKey:'dataEn'` en los 7 html; `loadState` auto-migra `data`→`dataEn` y **persiste la migración** (saveDB); registro y reset-usan `dataEn`; fallback de lectura cumplido.
5. 🟢 **Triviales**: dataKey duplicado eliminado (index.html), URL del appframe de c2 → «juego-de-memoria», línea muerta `FINAL_DEMO` borrada en c3–c7.

**Regresión post-patch (21 sep 2026, todas verdes):**
`qa_c1` **49/49** (4 aserciones actualizadas al modelo `dataEn`, cambio intencional) ·
`qa_c2` **45/45** · `qa_rest` **163/163** (c3 32 · c4 33 · c5 33 · c6 32 · c7 33) ·
`smoke_py` **42** · `smoke_ue` **47** · `smoke_sql` **34** · `smoke_unity` **48** ·
`smoke_reg` **OK** (examen C3 300/300 pts, modo recuperación OK) ·
nuevos: `test_srs_new` **23/23** (c1 y c2) · `test_ed_persist` **11/11** (c1 y c2).
Sanity: `CHROME_I18N` 76 entradas 0 malas 0 duplicados en c1/c2; server en :3000 con los 7 cursos → 200.
