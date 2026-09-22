# 🗄️ Plan de lecciones · Curso: Bases de datos SQL desde cero

> Plan de diseño para el siguiente curso del campus (`sql.html`). Documento vivo: aquí se define
> la estructura pedagógica antes de programar. Referencia: el estándar **SQL (ISO/IEC 9075)** y
> la práctica con **SQLite** (el motor más usado del mundo: vive en cada celular), con notas de
> diferencias para **MySQL**, **PostgreSQL** y **SQL Server**.

---

## 1. Por qué este curso

- **SQL es la habilidad de datos más pedida** en empleos de desarrollo, análisis y administración.
- Se enseña con un **mini-motor SQL integrado en el propio curso**: escribes consultas reales,
  presionas ▶ Ejecutar y ves la tabla de resultados — **sin instalar nada y sin internet**.
- La calificación es por **RESULTADO de la consulta** (las filas que obtienes), no por el texto
  exacto: como en la vida real, hay muchas formas correctas de escribir la misma consulta.

## 2. Enfoque del curso

- **Una base de datos jugable de ejemplo desde la lección 1**: la tienda «Librería Esperanza»
  (libros, autores, clientes, ventas) con datos realistas y conflictivos a propósito (nulos,
  duplicados, ventas sin cliente…).
- **Leer antes que escribir**: primero consultas (SELECT), después diseño (CREATE), por último
  administración. Igual que aprendemos a hablar antes que a escribir gramática.
- **Todo calificado automáticamente** con el mini-motor; el examen final de 30 preguntas (300 pts).
- **Progreso persistente** con la cuenta compartida del campus (`codecamp-db-v2`, campo `dataSql`).
- **Flashcards SRS** de conceptos y palabras clave (JOIN vs LEFT JOIN, PRIMARY KEY, HAVING…).

## 3. Mapa del curso (8 módulos · 30 lecciones · 30 ejercicios)

### Módulo 0 · Conoce las bases de datos (2 lecciones) 🧭
| # | Lección | Ejercicio (calificado) |
|---|---|---|
| 0-1 | ¿Qué es una base de datos? Tablas, filas, columnas; DBMS vs archivo de Excel; cuándo SÍ y cuándo NO usar una BD | Quiz: conceptos base |
| 0-2 | SQLite vs MySQL vs PostgreSQL vs SQL Server: quién usa qué; el playground integrado del curso | Explora el playground: 4 mini-consultas guiadas |

### Módulo 1 · Tus primeras consultas (5 lecciones) 🔍
| # | Lección | Ejercicio |
|---|---|---|
| 1-1 | Anatomía de una consulta: SELECT … FROM …; elegir columnas y `*`; comentarios | 6 consultas sobre libros |
| 1-2 | WHERE: =, <>, <, >, <=, >=; combinar con AND/OR/NOT y paréntesis | 6 filtros sobre clientes |
| 1-3 | ORDER BY (ASC/DESC, varias columnas) y LIMIT; DISTINCT y alias AS | Top 10 de ventas |
| 1-4 | LIKE con % y _; IN y BETWEEN; buscar por patrón | 6 búsquedas de catálogo |
| 1-5 | NULL y IS NULL: el valor que no existe; por qué NULL = NULL no funciona | Caza de nulos en ventas |

### Módulo 2 · Transformar y enriquecer (4 lecciones) 🧪
| # | Lección | Ejercicio |
|---|---|---|
| 2-1 | Funciones de texto: UPPER, LOWER, LENGTH, SUBSTR, TRIM, `||` concatenar | Normaliza el catálogo |
| 2-2 | Funciones numéricas y de fecha: ROUND, ABS, CAST; fechas en SQLite vs MySQL | Reporte de precios redondeados |
| 2-3 | COALESCE, IFNULL, NULLIF: valores por defecto y limpieza | Arregla el reporte con nulos |
| 2-4 | CASE WHEN: lógica condicional dentro del SELECT (etiquetas, categorías) | Clasifica libros por precio |

### Módulo 3 · Agregación: contar y resumir (4 lecciones) 📊
| # | Lección | Ejercicio |
|---|---|---|
| 3-1 | COUNT, SUM, AVG, MIN, MAX: los cinco agregados | KPIs de la librería |
| 3-2 | GROUP BY: resumir por categoría/autor/mes; qué columnas pueden ir fuera del grupo | Ventas por categoría |
| 3-3 | HAVING: filtrar grupos (no filas); la diferencia con WHERE | Categorías con ventas > X |
| 3-4 | Reporte de negocio: combinar todo (WHERE + GROUP BY + HAVING + ORDER BY + LIMIT) | Dashboard en una consulta |

### Módulo 4 · Varias tablas: JOINs y diseño (5 lecciones) 🔗
| # | Lección | Ejercicio |
|---|---|---|
| 4-1 | Llaves primarias y foráneas; por qué se parte la información en tablas | Quiz: llaves |
| 4-2 | INNER JOIN: cruzar libros con autores; tabla puente muchos-a-muchos | Consulta con JOIN |
| 4-3 | LEFT JOIN y RIGHT JOIN: incluir a quien no tiene coincidencias; encontrar huérfanos con IS NULL | Clientes sin compras |
| 4-4 | Normalización 1FN/2FN/3FN con ejemplos malos→buenos; diagrama entidad-relación | Normaliza una tabla rota |
| 4-5 | JOIN de 3+ tablas y self-join; el diagrama ER completo de la Librería Esperanza | Reporte multi-tabla |

### Módulo 5 · Modificar datos y diseño físico (4 lecciones) ✏️
| # | Lección | Ejercicio |
|---|---|---|
| 5-1 | INSERT INTO (filas simples y múltiples); valores faltantes | Puebla las tablas |
| 5-2 | UPDATE y DELETE con WHERE (¡y el DELETE sin WHERE!); subconsulta en UPDATE | Corrige precios |
| 5-3 | CREATE TABLE con tipos de datos y constraints: PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, CHECK, DEFAULT | Diseña la tabla «préstamos» |
| 5-4 | Transacciones (BEGIN/COMMIT/ROLLBACK) e índices: atomicidad y velocidad | Rescue la transferencia fallida |

### Módulo 6 · SQL avanzado (3 lecciones) 🚀
| # | Lección | Ejercicio |
|---|---|---|
| 6-1 | Subconsultas: en WHERE, en FROM y correlacionadas | Empleados sobre promedio |
| 6-2 | VIEWS y UNION/UNION ALL: consultas reutilizables y uniones de reportes | Crea 2 vistas |
| 6-3 | Funciones de ventana: ROW_NUMBER, RANK, OVER (PARTITION BY … ORDER BY …) | Top venta por mes |

### Módulo 7 · Proyecto final y examen (3 lecciones) 🏆
| # | Lección | Ejercicio |
|---|---|---|
| 7-1 | **Proyecto: «Librería Esperanza completa»** — diseña el esquema desde cero (5 tablas) y puebla datos | Esquema + datos calificados |
| 7-2 | Proyecto parte 2: las 10 consultas de negocio (inventario bajo, ventas por mes, clientes VIP…) | Consultas calificadas por resultado |
| 7-3 | **Examen final**: 30 preguntas (10 pts c/u = 300; aprueba con 210) — incluye leer consultas y predecir resultados | Examen calificado |

## 4. Tecnología del curso (para `sql.html`)

- **Mini-motor SQL en JavaScript** (parser + ejecutor) integrado en el curso, soportando:
  `SELECT (columnas, *, alias, DISTINCT) … FROM … [JOIN/LEFT JOIN … ON] [WHERE …] [GROUP BY …]
  [HAVING …] [ORDER BY …] [LIMIT n]`, `INSERT/UPDATE/DELETE`, `CREATE TABLE`, agregados,
  subconsultas y funciones más usadas. Las tablas de ejemplo precargadas y el playground
  del alumno persisten en su cuenta (`localStorage`), **sin servidor y sin internet**.
- **Editor con ▶ Ejecutar** que muestra la tabla de resultados renderizada + errores claros
  en español (como los del curso 1: «no puede iniciarse» → nunca fatal).
- **Calificación por resultado**: el ejercicio compara las filas obtenidas contra las esperadas
  (orden insensitive cuando corresponde), mostrando diff visual. Fallback por texto normalizado.
- **Diagrama ER interactivo** (SVG inline) para el módulo de diseño.
- SRS de conceptos SQL; libro de texto con 9 capítulos; boleta y certificado estándar del campus.

## 5. Bibliografía real (verificada)

- Beaulieu, A. — *Learning SQL: Generate, Manipulate, and Retrieve Data*, 3.ª ed., O'Reilly (2020).
- Molinaro, A. & de Graaf, R. — *SQL Cookbook*, 2.ª ed., O'Reilly (2020).
- Silberschatz, A., Korth, H. & Sudarshan, S. — *Database System Concepts*, 7.ª ed., McGraw-Hill (2019).
- Winand, M. — *Use The Index, Luke!* (use-the-index-luke.com, gratis) — indexación y rendimiento.
- Documentación oficial gratuita: sqlite.org/docs · dev.mysql.com/doc · postgresql.org/docs.

## 6. Criterios de éxito del curso

- [ ] 30 lecciones con ejercicio calificado; consultas evaluadas por RESULTADO con el mini-motor.
- [ ] Playground persistente por cuenta sin dependencias externas (funciona offline).
- [ ] JOINs, GROUP BY/HAVING, subconsultas y CASE cubiertos con casos reales.
- [ ] Proyecto de esquema completo + 10 consultas de negocio calificadas.
- [ ] Examen 30×10=300 con 70% para aprobar; boleta y certificado integrados.
