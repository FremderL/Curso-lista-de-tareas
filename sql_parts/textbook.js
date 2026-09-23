/* ============================================================
   CURSO SQL · LIBRO DE TEXTO (9 capítulos)
   Bibliografía verificada: ver capítulo 9.
   ============================================================ */
const TEXTBOOK = [
  { n:1, emoji:'🧭', short:'Qué es una base de datos', title:'Bases de datos: la historia y la idea', time:'10 min', blocks:[
    {t:'p', h:'Una <b>base de datos relacional</b> guarda información en <b>tablas</b> que se relacionan entre sí. La idea formalizó <b>Edgar F. Codd</b> en su artículo <i>«A Relational Model of Data for Large Shared Data Banks»</i> (Communications of the ACM, 1970). IBM lo llevó a la práctica con System R y el lenguaje SEQUEL, que acabaría llamándose <b>SQL</b> (Structured Query Language). Oracle lanzó el primer producto comercial en 1979 y desde entonces SQL gobierna el mundo de los datos.'},
    {t:'table', head:['Año','Hito','Por qué importa'], rows:[
      ['1970','Codd publica el modelo relacional','Los datos dejan de depender de la estructura física del almacenamiento'],
      ['1974-79','System R y SEQUEL (IBM)','Nace SQL: un lenguaje declarativo y legible'],
      ['1979','Oracle V2','Primera base de datos comercial SQL'],
      ['1986','SQL se vuelve estándar ANSI (ISO en 1987)','Portabilidad del conocimiento entre motores'],
      ['2000','SQLite (D. Hipp)','El motor más desplegado del mundo: vive en tu teléfono, tu navegador y este curso'],
      ['2008-2012','PostgreSQL 8.4+, ventanas y CTEs estándar','SQL moderno: analítica sin salir del lenguaje']
    ]},
    {t:'info', title:'ℹ️ Declarativo: dices QUÉ, no CÓMO', h:'En JS dices <i>cómo</i> recorrer un arreglo paso a paso. En SQL dices <i>qué</i> quieres («los títulos de los libros de 1967 ordenados por precio») y el motor decide el camino. Esta inversión es la razón de que una consulta de 3 líneas reemplace decenas de líneas de código imperativo.'},
    {t:'p', h:'En este curso usas un <b>mini-motor SQL escrito en JavaScript</b> que corre dentro de la página: nada que instalar, nada que conectar. Sus errores son en español y su dialecto sigue de cerca a <b>SQLite</b>, la base de datos más usada del planeta.'}
  ]},

  { n:2, emoji:'🔑', short:'Tablas, llaves e integridad', title:'El modelo relacional: llaves y reglas', time:'12 min', blocks:[
    {t:'p', h:'Cada tabla es una <b>entidad</b> (libros, clientes, ventas…). Cada fila, un registro. Cada columna, un atributo con un <b>tipo de dato</b>. Y dos tipos de llave sostienen todo el edificio:'},
    {t:'table', head:['Concepto','Definición','En la Librería Esperanza'], rows:[
      ['<b>Llave primaria (PK)</b>','Columna que identifica cada fila: única y sin NULL','libros.id, clientes.id, ventas.id'],
      ['<b>Llave foránea (FK)</b>','Columna que apunta a la PK de otra tabla','ventas.libro_id → libros.id'],
      ['<b>Unicidad (UNIQUE)</b>','Valor que no puede repetirse aunque no sea PK','clientes.email'],
      ['<b>Integridad referencial</b>','No existe FK que apunte a una fila inexistente','Toda venta apunta a un libro real']
    ]},
    {t:'p', h:'Las relaciones posibles son tres: <b>1 a muchos</b> (un autor, varios libros — la FK vive en la tabla del lado «muchos»), <b>muchos a muchos</b> (requiere tabla puente, como ventas entre libros y clientes) y <b>1 a 1</b> (rara: una FK con UNIQUE). En el capítulo 6 y en el Módulo 4 del curso practicas cada una.'},
    {t:'code', lang:'sql', title:'DDL: las reglas se escriben al crear la tabla', code:`CREATE TABLE clientes (
  id     INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  ciudad TEXT,
  email  TEXT UNIQUE
);`},
    {t:'warn', title:'⚠️ La integridad es un seguro gratis', h:'NOT NULL, UNIQUE, CHECK y FOREIGN KEY parecen burocracia hasta el día en que un bug intenta guardar un email duplicado o un precio negativo: la base lo rechaza y te salva. Las reglas se definen UNA vez y se aplican SIEMPRE — no confíes en que «el programa validará».'}
  ]},

  { n:3, emoji:'🔍', short:'SELECT de la A a la Z', title:'SELECT: la consulta completa', time:'15 min', blocks:[
    {t:'p', h:'Toda consulta SELECT tiene hasta 7 cláusulas, y el motor las evalúa en un orden FIJO que no es el orden en que se escriben. Memoriza este orden lógico y las consultas complejas dejan de ser magia:'},
    {t:'table', head:['Orden lógico','Cláusula','Para qué sirve','Ejemplo'], rows:[
      ['1','FROM','de qué tabla(s) parto','FROM libros'],
      ['2','WHERE','filtra filas','WHERE precio > 300'],
      ['3','GROUP BY','forma grupos','GROUP BY categoria'],
      ['4','HAVING','filtra grupos','HAVING COUNT(*) > 2'],
      ['5','SELECT','elige y calcula columnas','SELECT categoria, COUNT(*)'],
      ['6','ORDER BY','ordena el resultado','ORDER BY COUNT(*) DESC'],
      ['7','LIMIT/OFFSET','recorta filas','LIMIT 5']
    ]},
    {t:'code', lang:'sql', title:'la plantilla maestra', code:`SELECT   categoria, COUNT(*) AS titulos, ROUND(AVG(precio),2) AS promedio
FROM     libros
WHERE    anio IS NOT NULL
GROUP BY categoria
HAVING   COUNT(*) >= 2
ORDER BY titulos DESC
LIMIT    10;`},
    {t:'list', items:[
      '<b>Alias</b>: <code>AS</code> renombra columnas (precio_medio) y tablas (libros l) — mejora legibilidad y es obligatorio en los JOIN serios.',
      '<b>DISTINCT</b> elimina filas repetidas del resultado: <code>SELECT DISTINCT categoria FROM libros</code>.',
      '<b>ORDEN de texto</b>: por defecto es binario («Z» va antes que «á»). No asumas alfabeto español salvo que configures collation.',
      '<b>LIMIT a, b</b> y <code>OFFSET</code> son la base de la paginación.'
    ]},
    {t:'info', title:'ℹ️ ORDER BY con empates', h:'Entre filas con el MISMO valor de orden, el estándar no garantiza ningún orden. Si necesitas orden estable y determinista (reportes, pruebas), agrega un desempate: <code>ORDER BY precio, titulo</code>.'}
  ]},

  { n:4, emoji:'🧯', short:'WHERE, LIKE y NULL', title:'Filtros y patrones: dominar el WHERE', time:'12 min', blocks:[
    {t:'p', h:'El WHERE se evalúa fila por fila con lógica de tres valores (verdadero / falso / <b>desconocido</b>). Operadores: <code>= &lt;&gt; &lt; &gt; &lt;= &gt;=</code>, combinables con <code>AND / OR / NOT</code> (paréntesis para aclarar prioridad), rangos con <code>BETWEEN … AND …</code>, listas con <code>IN (…)</code> y patrones de texto con <code>LIKE</code>.'},
    {t:'table', head:['Patrón LIKE','Coincide con','Ejemplo que sí'], rows:[
      ['\'El %\'','empieza con "El "','El Aleph'],
      ['\'%ez\'','termina con "ez"','Ramírez'],
      ['\'%a_o%\'','"a", cualquier carácter, "o"','Paulo'],
      ['\'%Cien%\'','contiene "Cien"','Cien años de soledad']
    ]},
    {t:'warn', title:'⚠️ NULL no es ni verdadero ni falso', h:'<code>email = NULL</code> y <code>email &lt;&gt; NULL</code> devuelven «desconocido»: cero filas. Un NULL no es ni igual ni distinto de nada, ni siquiera de otro NULL. Para encontrarlos: <code>IS NULL</code> / <code>IS NOT NULL</code>. Para sustituirlos al mostrar: <code>COALESCE(email, \'sin email\')</code>. Y OJO: COUNT(col) los excluye del conteo; COUNT(*) no.'},
    {t:'code', lang:'sql', title:'filtros del mundo real', code:`-- ventas de enero con cliente, de mayor a menor total
SELECT id, total FROM ventas
WHERE fecha >= '2025-01-01' AND fecha < '2025-02-01'
  AND cliente_id IS NOT NULL
ORDER BY total DESC;

-- clientes de CDMX o GDL cuyo nombre empieza con A o C
SELECT nombre, ciudad FROM clientes
WHERE ciudad IN ('Ciudad de México','Guadalajara')
  AND (nombre LIKE 'A%' OR nombre LIKE 'C%');`}
  ]},

  { n:5, emoji:'📊', short:'Agregación y reportes', title:'Agregación: de miles de filas al número gerencial', time:'14 min', blocks:[
    {t:'p', h:'Los cinco agregados — <code>COUNT, SUM, AVG, MIN, MAX</code> — colapsan muchas filas en un valor. Con <b>GROUP BY</b> lo hacen POR GRUPO: una fila por categoría, por mes, por cliente. Con <b>HAVING</b> filtras los grupos ya calculados (WHERE filtra filas ANTES de agrupar: es la confusión #1 de los principiantes).'},
    {t:'code', lang:'sql', title:'reporte de dirección en 6 líneas', code:`SELECT   SUBSTR(fecha,6,2)          AS mes,
         COUNT(*)                   AS ventas,
         ROUND(SUM(total),2)        AS ingreso,
         ROUND(AVG(total),2)        AS ticket_promedio
FROM     ventas
GROUP BY mes
ORDER BY ingreso DESC;`},
    {t:'table', head:['Pregunta de negocio','Consulta'], rows:[
      ['¿Cuánto vendimos en total?','<code>SELECT SUM(total) FROM ventas</code>'],
      ['¿Qué mes vendió más?','agrupar por mes + <code>ORDER BY SUM(total) DESC LIMIT 1</code>'],
      ['¿Quiénes son clientes VIP?','agrupar por cliente + <code>HAVING SUM(total) &gt; 800</code>'],
      ['¿Cuántos clientes hay por ciudad?','<code>GROUP BY ciudad</code> + COUNT'],
      ['¿Qué categorías no venden?','LEFT JOIN + <code>WHERE v.id IS NULL</code>']
    ]},
    {t:'info', title:'ℹ️ AVG, NULLs y redondeo', h:'AVG ignora NULLs (promedia solo los valores presentes) y puede dar decimales larguísimos: envuélvelo en <code>ROUND(x, 2)</code> para reportes. La librería promedia 236.63 por libro — un número que el motor calcula pero que NUNCA deberías guardar redondeado en la tabla: se calcula al vuelo, siempre fresco.'}
  ]},

  { n:6, emoji:'🔗', short:'JOINs y normalización', title:'JOINs y el arte de diseñar bien', time:'15 min', blocks:[
    {t:'p', h:'Los datos normalizados viven en tablas separadas; los reportes los reunen con <b>JOIN</b>. El <b>INNER JOIN</b> devuelve solo las parejas que coinciden; el <b>LEFT JOIN</b> conserva TODAS las filas de la izquierda (con NULL a la derecha donde no hay pareja) y es la herramienta para las preguntas «¿qué no tiene qué?».'},
    {t:'code', lang:'sql', title:'el trío que resuelve el 95% de los casos', code:`-- catálogo con autor
SELECT l.titulo, a.nombre AS autor
FROM libros l INNER JOIN autores a ON l.autor_id = a.id;

-- cada cliente y cuántas compras lleva (incluye a los de cero)
SELECT c.nombre, COUNT(v.id) AS compras
FROM clientes c LEFT JOIN ventas v ON c.id = v.cliente_id
GROUP BY c.nombre ORDER BY compras DESC;

-- libros que NUNCA se han vendido (anti-join)
SELECT l.titulo
FROM libros l LEFT JOIN ventas v ON l.id = v.libro_id
WHERE v.id IS NULL;`},
    {t:'p', h:'El otro pilar es la <b>normalización</b>: 1FN (valores atómicos), 2FN (sin dependencias parciales de la llave) y 3FN (sin dependencias transitivas: nada depende de columnas que no son llave). El costo es hacer JOINs para reunir lo que estaba partido; el beneficio, que cada hecho vive UNA sola vez y la inconsistencia se vuelve imposible.'},
    {t:'info', title:'ℹ️ Columnas ambiguas', h:'En un JOIN, «id» existe en ambas tablas: califícalo siempre (<code>l.id</code>, <code>a.id</code>). El motor del curso te avisa en español cuando una columna existe en varias tablas; los motores reales hacen lo propio. La práctica profesional: alias cortos consistentes y TODAS las columnas calificadas.'}
  ]},

  { n:7, emoji:'✏️', short:'DML, DDL y transacciones', title:'Modificar datos y definir el esquema', time:'14 min', blocks:[
    {t:'p', h:'Cuatro verbos cambian el mundo: <b>INSERT</b> agrega filas, <b>UPDATE</b> las modifica, <b>DELETE</b> las borra (los tres con WHERE obligatorio en la mente) y <b>CREATE TABLE</b> define la estructura con sus reglas. El ritual de seguridad del administrador: escribes el WHERE, lo pruebas con un SELECT equivalente, y solo entonces ejecutas el cambio.'},
    {t:'code', lang:'sql', title:'cambios con red de seguridad', code:`BEGIN;                                        -- abre la transacción
UPDATE libros SET stock = stock - 1 WHERE id = 5;
INSERT INTO ventas (libro_id, cliente_id, fecha, cantidad, total)
VALUES (5, 1, '2025-05-21', 1, 210);
-- ¿todo bien?  COMMIT;      ¿algo salió mal?  ROLLBACK;
COMMIT;`},
    {t:'table', head:['Herramienta','Para qué','Nota clave'], rows:[
      ['CREATE TABLE','definir estructura + reglas','PK, NOT NULL, UNIQUE, DEFAULT, CHECK, REFERENCES'],
      ['CREATE INDEX','acelerar búsquedas por columna','PK y UNIQUE ya traen el suyo; indexa lo que FILTRAS'],
      ['BEGIN/COMMIT','atomicidad: todo o nada','el "deshacer" del DELETE sin WHERE'],
      ['ROLLBACK','deshacer desde el BEGIN','tu paracaídas:BEGIN antes de cambios bravos']
    ]},
    {t:'warn', title:'⚠️ DELETE sin WHERE', h:'Borra TODAS las filas (la tabla queda vacía, la estructura vive). En un motor real solo lo recuperas de un respaldo o con ROLLBACK si estaba en transacción. En el playground del curso puedes atreverte: el botón «Restaurar base de ejemplo» devuelve todo.'}
  ]},

  { n:8, emoji:'🚀', short:'SQL avanzado', title:'Subconsultas, vistas y funciones de ventana', time:'15 min', blocks:[
    {t:'p', h:'Tres saltos de nivel: <b>subconsultas</b> (un SELECT dentro de otro: escalar para comparar contra un valor, de lista para IN, correlacionada que se evalúa por fila), <b>vistas</b> (consultas guardadas con nombre que se consultan como tablas) y <b>funciones de ventana</b> (ROW_NUMBER, RANK, DENSE_RANK sobre OVER(PARTITION BY … ORDER BY …): rankings sin colapsar filas).'},
    {t:'code', lang:'sql', title:'el patrón top-N-por-grupo', code:`-- el libro más caro de CADA categoría
SELECT * FROM (
  SELECT titulo, categoria,
         ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY precio DESC) AS rk
  FROM libros
) WHERE rk = 1;`},
    {t:'p', h:'Las funciones de ventana son estándar ISO SQL:2011 y hoy existen en PostgreSQL, MySQL 8+, SQL Server, Oracle y SQLite 3.25+ (2018). Junto con las CTE (<code>WITH</code>, no soportadas por este mini-motor pero sí por todos los motores reales), forman el corazón de la analítica moderna en SQL.'},
    {t:'info', title:'ℹ️ ¿Qué NO hace este mini-motor?', h:'Por diseño didáctico: <code>WITH</code> (CTEs), <code>FULL OUTER JOIN</code>, <code>HAVING</code> sin GROUP BY sobre el total, y funciones específicas de otros motores (NOW(), CONCAT(), IFNULL anidado ilimitado…). El 90% del trabajo diario no las necesita, y lo que aprendes aquí traslada 1 a 1 a SQLite, PostgreSQL y MySQL.'}
  ]},

  { n:9, emoji:'📚', short:'Bibliografía y siguientes pasos', title:'Bibliografía verificada y tu ruta de especialización', time:'8 min', blocks:[
    {t:'p', h:'Terminaste el curso: ya consultas, unes, agregas, modificas y diseñas. Esta bibliografía — verificada contra catálogos de las editoriales — es el siguiente escalón, ordenada de lo práctico a lo teórico:'},
    {t:'table', head:['Obra','Autor / Editorial','Para qué'], rows:[
      ['<i>Learning SQL: Generate, Manipulate, and Retrieve Data</i>, 3.ª ed. (2020)','Alan Beaulieu · O\'Reilly','La mejor segunda pasada: sólida, práctica, con ejercicios'],
      ['<i>SQL Cookbook</i>, 2.ª ed. (2020)','Anthony Molinaro y Robert de Graaf · O\'Reilly','Recetas de consultas difíciles: el gimnasio de nivel 2'],
      ['<i>Database System Concepts</i>, 7.ª ed. (2019)','Silberschatz, Korth y Sudarshan · McGraw-Hill','La teoría seria: transacciones, concurrencia, recuperación'],
      ['<i>Use The Index, Luke!</i> (gratis online)','Markus Winand · use-the-index-luke.com','Indexación y planes de ejecución sin mitos'],
      ['SQLite docs · MySQL docs · PostgreSQL docs','sqlite.org/docs · dev.mysql.com/doc · postgresql.org/docs','La referencia definitiva de cada motor']
    ]},
    {t:'list', items:[
      '<b>Instala SQLite</b> (sqlite.org/download: un binario de 1 MB) y repite los ejercicios del curso contra la base real.',
      '<b>PostgreSQL</b> vía Docker o instalador local: el motor profesional open source más querido.',
      'Practica consultas reales en <b>SQLBolt</b> (sqlbolt.com), <b>SQLZoo</b> (sqlzoo.net) y <b>pgexercises.com</b>.',
      'Rutas de especialización: <b>Analítica</b> (ventanas, CTEs, optimización), <b>Backend</b> (SQL desde Node/Python/PHP) o <b>DBA</b> (administración, respaldos, réplicas).',
      'El siguiente curso del campus es <b>Python</b>: SQL para consultar los datos, Python para procesarlos y visualizarlos. Combinación ganadora.'
    ]},
    {t:'milestone', title:'🎓 Cierre', h:'SQL tiene 50 años y sigue siendo LA habilidad de datos: ni las modas de NoSQL ni los LLMs lo reemplazan — lo usan por dentro. Dominaste SELECT, JOINs, agregación, DML/DDL, transacciones y ventanas sobre un motor real. Lo que sigue es práctica: miles de consultas más. ¡Nos vemos en Python!'}
  ]}
];
