/* ============================================================
   CURSO SQL — CONTENIDO parte B (Módulos 4–7) + EXAMEN
   ============================================================ */
MODULES.push({
  id:'m4', emoji:'🔗', name:'Varias tablas: JOINs y diseño', color:'#f59e0b',
  desc:'Llaves, INNER/LEFT JOIN, normalización y consultas de tres o más tablas.',
  lessons:[

  /* -------- 4-1 -------- */
  { id:'4-1', title:'Llaves primarias y foráneas: cómo se conectan las tablas', time:'12 min', blocks:[
    {t:'p', h:'La <b>llave primaria (PRIMARY KEY)</b> identifica cada fila: única, no nula, inmutable (el <code>id</code>). La <b>llave foránea (FOREIGN KEY)</b> es una columna que apunta a la llave primaria de OTRA tabla: <code>ventas.libro_id</code> apunta a <code>libros.id</code>. Con estas dos piezas se construyen todas las relaciones del mundo:'},
    {t:'table', head:['Relación','Ejemplo','Cómo se implementa'], rows:[
      ['<b>Uno a muchos</b> (1:N)','Un autor escribe varios libros','FK <code>libros.autor_id</code> hacia <code>autores.id</code>'],
      ['<b>Muchos a muchos</b> (N:M)','Libros y ventas por ticket… o alumnos y materias','Una tabla puente con dos FK (<code>ventas</code> une libros y clientes)'],
      ['<b>Uno a uno</b> (1:1)','Un país y su capital','FK con restricción UNIQUE']
    ]},
    {t:'p', h:'¿Por qué NO guardar el nombre del autor dentro de la tabla de libros? Porque «Gabriel García Márquez» se escribiría 2 veces con riesgo de escribirse distinto (¿con acento? ¿con segunda s?), y cambiar su nombre sería editar fila por fila. <b>Se guarda el id y los datos viven UNA sola vez</b> — ese principio se llama normalización y es la lección 4-4.'},
    {t:'quiz', questions:[
      {type:'mc', q:'La columna <code>ventas.libro_id</code> es…', options:['La llave primaria de ventas','Una llave foránea hacia libros.id','Un índice de rendimiento','Un dato decorativo'], correct:1, pts:10, explain:'Apunta a la PK de otra tabla: es llave foránea.'},
      {type:'mc', q:'¿Qué NO puede hacer una llave primaria?', options:['Ser un número','Repetirse en dos filas','Ser llamada id','Ser generada automáticamente'], correct:1, pts:10, explain:'Su esencia es la unicidad: dos filas jamás comparten PK.'},
      {type:'mc', q:'Libros y ventas: un libro aparece en muchas ventas y una venta tiene un libro. La relación es…', options:['1:1','1:N','N:M','Ninguna'], correct:1, pts:10, explain:'Un libro → muchas ventas: uno a muchos, implementada con la FK en ventas.'},
      {type:'tf', q:'Guardar el nombre del autor dentro de cada libro es buena práctica.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Duplica texto y crea inconsistencias: se guarda el id (normalización).'},
      {type:'mc', q:'Una tabla puente (como <code>ventas</code> entre libros y clientes) existe para…', options:['Hacer la base más lenta','Modelar relaciones muchos-a-muchos','Guardar contraseñas','Reemplazar al WHERE'], correct:1, pts:10, explain:'N:M se implementa con una tabla intermedia que lleva dos llaves foráneas.'}
    ]}
  ]},

  /* -------- 4-2 -------- */
  { id:'4-2', title:'INNER JOIN: cruzar dos tablas', time:'15 min', blocks:[
    {t:'p', h:'<b>JOIN</b> combina filas de dos tablas usando una condición (<b>ON</b>). El <b>INNER JOIN</b> devuelve solo las parejas que coinciden: cada libro junto a los datos de su autor. Las tablas reciben <b>alias cortos</b> (<code>libros l</code>, <code>autores a</code>) y las columnas se califican <code>l.titulo</code>, <code>a.nombre</code> — el programa profesional escribe SIEMPRE los alias.'},
    {t:'code', lang:'sql', title:'el patrón de unión universal', code:`SELECT l.titulo, a.nombre AS autor, l.precio
FROM libros l
INNER JOIN autores a ON l.autor_id = a.id;

-- equivalente sin la palabra INNER (JOIN a secas = INNER JOIN)
SELECT l.titulo, a.nombre FROM libros l JOIN autores a ON l.autor_id = a.id;`},
    {t:'info', title:'ℹ️ ¿Por qué calificar las columnas?', h:'<code>id</code> existe en libros Y en autores: sin calificar, el motor no sabe cuál quieres (y te lo dice en español). Calificar (<code>l.id</code>, <code>a.id</code>) elimina la ambigüedad y documenta la intención. En el playground, una columna ambigua produce el error «existe en varias tablas: califícala».'},
    {t:'sqlex', title:'🧪 Practica INNER JOIN', tasks:[
      {q:'Título y autor de cada libro: <code>l.titulo</code> y <code>a.nombre</code> como <code>autor</code>.', check:{cols:['titulo','autor'], rows:16}, solution:'SELECT l.titulo, a.nombre AS autor FROM libros l JOIN autores a ON l.autor_id = a.id ORDER BY l.titulo;', pts:25},
      {q:'Título, autor y país del autor, SOLO de los autores chilenos: <code>WHERE a.pais = \'Chile\'</code>.', check:{rows:3}, solution:'SELECT l.titulo, a.nombre AS autor, a.pais FROM libros l JOIN autores a ON l.autor_id = a.id WHERE a.pais = \'Chile\' ORDER BY l.titulo;', pts:25},
      {q:'Fecha, título y cantidad de cada venta: <code>v.fecha</code>, <code>l.titulo</code>, <code>v.cantidad</code>, de las ventas con cantidad 2 o más.', check:{rows:7}, solution:'SELECT v.fecha, l.titulo, v.cantidad FROM ventas v JOIN libros l ON v.libro_id = l.id WHERE v.cantidad >= 2 ORDER BY v.fecha, l.titulo;', pts:25},
      {q:'Cuántas veces se vendió cada autor (por unidades): <code>a.nombre</code> como <code>autor</code> y <code>SUM(v.cantidad)</code> como <code>unidades</code>, ordenado por unidades descendente.', hint:'Ventas → libros → autores: dos JOIN. Agrupa por autor.', check:{rows:9}, solution:'SELECT a.nombre AS autor, SUM(v.cantidad) AS unidades FROM ventas v JOIN libros l ON v.libro_id = l.id JOIN autores a ON l.autor_id = a.id GROUP BY a.nombre ORDER BY unidades DESC, autor;', pts:25}
    ]}
  ]},

  /* -------- 4-3 -------- */
  { id:'4-3', title:'LEFT JOIN: incluir a quien no tiene pareja', time:'15 min', blocks:[
    {t:'p', h:'El <b>LEFT JOIN</b> mantiene TODAS las filas de la tabla izquierda; si no hay coincidencia, las columnas de la derecha se llenan con NULL. Es la herramienta para preguntas del tipo «¿qué X NO tiene Y?»: libros que nunca se han vendido, clientes sin compras. El truco: <code>LEFT JOIN … WHERE derecha.id IS NULL</code>.'},
    {t:'code', lang:'sql', title:'los tres usos de oro', code:`-- 1) todo el inventario con sus ventas (o NULL si no tuvo)
SELECT l.titulo, v.fecha, v.total
FROM libros l LEFT JOIN ventas v ON l.id = v.libro_id;

-- 2) libros NUNCA vendidos
SELECT l.titulo
FROM libros l LEFT JOIN ventas v ON l.id = v.libro_id
WHERE v.id IS NULL;

-- 3) clientes con contador de compras (incluye a los de cero)
SELECT c.nombre, COUNT(v.id) AS compras
FROM clientes c LEFT JOIN ventas v ON c.id = v.cliente_id
GROUP BY c.nombre ORDER BY compras DESC;`},
    {t:'warn', title:'⚠️ COUNT(*) vs COUNT(v.id) con LEFT JOIN', h:'En la consulta 3, <code>COUNT(*)</code> contaría también la fila «fantasma» del cliente sin compras y diría 1 en vez de 0. Por eso se cuenta la columna de la derecha: <code>COUNT(v.id)</code>, que vale NULL cuando no hubo coincidencia.'},
    {t:'sqlex', title:'🧪 Practica LEFT JOIN', tasks:[
      {q:'Libros NUNCA vendidos: <code>titulo</code>.', check:{rows:[['Antología poética'],['La casa verde']]}, solution:'SELECT l.titulo FROM libros l LEFT JOIN ventas v ON l.id = v.libro_id WHERE v.id IS NULL ORDER BY l.titulo;', pts:25},
      {q:'Cada cliente con su número de compras (incluye a quien no ha comprado): <code>c.nombre</code> y <code>COUNT(v.id)</code> como <code>compras</code>, ordenado por compras descendente y nombre ascendente.', check:{rows:[['Ana Torres',3],['Luis Ramírez',3],['María Fernanda López',3],['Carlos Sánchez',2],['Jorge Medina',2],['Lucía Herrera',2],['Sofía Castro',2],['Pedro Álvarez',1]]}, solution:'SELECT c.nombre, COUNT(v.id) AS compras FROM clientes c LEFT JOIN ventas v ON c.id = v.cliente_id GROUP BY c.nombre ORDER BY compras DESC, c.nombre;', pts:25},
      {q:'Autores sin libros en el catálogo… primero averigua si existen: corre <code>SELECT a.nombre FROM autores a LEFT JOIN libros l ON l.autor_id = a.id WHERE l.id IS NULL;</code> (si devuelve 0 filas, todos los autores tienen libros).', check:{rows:0}, solution:'SELECT a.nombre FROM autores a LEFT JOIN libros l ON l.autor_id = a.id WHERE l.id IS NULL;', pts:25},
      {q:'Título del libro y fecha de su venta, INCLUYENDO los libros sin ventas (la fecha saldrá NULL): <code>l.titulo</code> y <code>v.fecha</code>, solo de la categoría «Novela».', check:{rows:10}, solution:'SELECT l.titulo, v.fecha FROM libros l LEFT JOIN ventas v ON l.id = v.libro_id WHERE l.categoria = \'Novela\' ORDER BY l.titulo, v.fecha;', pts:25}
    ]}
  ]},

  /* -------- 4-4 -------- */
  { id:'4-4', title:'Normalización: de tabla- Frankenstein a diseño limpio', time:'15 min', blocks:[
    {t:'p', h:'La <b>normalización</b> es el arte de partir los datos en tablas para que cada hecho viva UNA sola vez. Las tres primeras formas normales (1FN, 2FN, 3FN) cubren el 99% del trabajo práctico:'},
    {t:'table', head:['Forma','Regla','Violación típica'], rows:[
      ['<b>1FN</b>','Valores atómicos: una celda, un dato','Una columna «autores» con "Borges, Cortázar"'],
      ['<b>2FN</b>','Sin dependencias parciales: cada columna depende de TODA la PK','En <code>ventas(libro_id, fecha)</code> guardar el título del libro (solo depende de libro_id)'],
      ['<b>3FN</b>','Sin dependencias transitivas: nada depende de columnas que no son llave','Guardar <code>pais_autor</code> en libros (depende del autor, no del libro)']
    ]},
    {t:'code', lang:'sql', title:'la misma información, mal y bien', code:`-- ❌ tabla única (1FN violada, redundancia total)
-- pedidos(id, cliente, ciudad, libros: "Ficciones, El Aleph", total)

-- ✅ normalizada (así está diseñada la Librería Esperanza)
-- clientes(id, nombre, ciudad, email)
-- libros(id, titulo, autor_id, categoria, precio)
-- ventas(id, libro_id, cliente_id, fecha, cantidad, total)`},
    {t:'p', h:'El costo de la normalización es el JOIN: para reconstruir «venta con nombre de cliente y título» debes unir 2-3 tablas. Vale la pena: sin redundancia no hay inconsistencias, y los JOIN son baratos. La <b>desnormalización controlada</b> (guardar un total calculado, por ejemplo) existe, pero es una decisión tardía y consciente — nunca el punto de partida.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Una columna «telefonos» con "555-1234, 555-5678" viola…', options:['2FN','3FN','1FN: los valores deben ser atómicos','Ninguna forma normal'], correct:2, pts:10, explain:'1FN exige valores atómicos: una celda, un dato. Los teléfonos múltiples van en tabla aparte.'},
      {type:'mc', q:'Guardar <code>titulo_libro</code> dentro de <code>ventas</code> viola…', options:['1FN','2FN: el título depende solo de libro_id, no de toda la llave','3FN por transitividad','Nada, es correcto'], correct:1, pts:10, explain:'El título depende del libro, no de la venta completa: dependencia parcial = viola 2FN.'},
      {type:'mc', q:'Guardar <code>pais_autor</code> en la tabla <code>libros</code> viola…', options:['1FN','2FN','3FN: el país depende del autor (transitivo), no del libro','Nada'], correct:2, pts:10, explain:'pais_autor depende de autor_id, que no es llave de libros: dependencia transitiva.'},
      {type:'mc', q:'¿Cuál es el "precio" de normalizar?', options:['Consultas más lentas siempre','Necesitas JOINs para reconstruir la información','Perdes datos históricos','Requiere pagar licencias'], correct:1, pts:10, explain:'Los datos quedan partidos: los JOIN los vuelven a juntar (rápido y barato).'},
      {type:'tf', q:'La Librería Esperanza está normalizada: por eso ventas guarda ids y no textos.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'ventas lleva libro_id y cliente_id: referencias, no copias. Por eso hacemos JOINs.'}
    ]}
  ]},

  /* -------- 4-5 -------- */
  { id:'4-5', title:'JOIN de 3+ tablas y el mapa completo', time:'15 min', blocks:[
    {t:'er', h:'Mapa visual de la Librería Esperanza: pasa el cursor por cada tabla. La llave foránea vive en la tabla del lado «muchos».'},
    {t:'p', h:'Los reportes reales cruzan 3 o más tablas encadenando JOINs: venta → libro → autor, o venta → cliente. Cada JOIN añade una tabla con su <code>ON</code>. La regla de supervivencia: <b>define el camino</b> (¿qué tabla conecta con cuál?) y usa alias cortos consistentes. El mapa de la Librería Esperanza:'},
    {t:'code', lang:'txt', title:'diagrama entidad-relación (texto)', code:`autores (id, nombre, pais)
    ▲ 1
    │ N
libros (id, titulo, autor_id, categoria, precio, stock, anio)
    ▲ 1                                  proveedores (id, nombre, contacto)
    │ N
ventas (id, libro_id, cliente_id, fecha, cantidad, total)
    ▲ N
    │ N:1
clientes (id, nombre, ciudad, email)`},
    {t:'sqlex', title:'🧪 Reportes multi-tabla', tasks:[
      {q:'Boleta de venta: <code>v.id</code>, <code>l.titulo</code>, <code>c.nombre</code> como <code>cliente</code> y <code>v.total</code>, solo ventas CON cliente, de las 5 más caras.', hint:'ventas → libros y ventas → clientes: dos JOIN desde ventas.', check:{rows:[[12,'Cien años de soledad','Pedro Álvarez',641],[5,'La casa de los espíritus','Carlos Sánchez',620],[15,'Paula','Carlos Sánchez',460],[18,'Como agua para chocolate','Sofía Castro',450],[2,'Ficciones','Luis Ramírez',420]]}, solution:'SELECT v.id, l.titulo, c.nombre AS cliente, v.total FROM ventas v JOIN libros l ON v.libro_id = l.id JOIN clientes c ON v.cliente_id = c.id ORDER BY v.total DESC LIMIT 5;', pts:34},
      {q:'Ingresos por PAÍS del autor: <code>a.pais</code> y <code>ROUND(SUM(v.total),2)</code> como <code>ingreso</code>, ordenado por ingreso descendente.', check:{rows:[['Argentina',2040.5],['Chile',1640],['Colombia',1562],['México',865],['Brasil',660],['Perú',590]]}, solution:'SELECT a.pais, ROUND(SUM(v.total),2) AS ingreso FROM ventas v JOIN libros l ON v.libro_id = l.id JOIN autores a ON l.autor_id = a.id GROUP BY a.pais ORDER BY ingreso DESC;', pts:33},
      {q:'¿Qué clientes compraron libros de «Realismo mágico»? <code>nombre</code> sin repetir (usa DISTINCT con los 3 JOINs).', check:{rows:[['Ana Torres'],['Carlos Sánchez'],['Jorge Medina'],['María Fernanda López'],['Pedro Álvarez']]}, solution:'SELECT DISTINCT c.nombre FROM clientes c JOIN ventas v ON v.cliente_id = c.id JOIN libros l ON v.libro_id = l.id WHERE l.categoria = \'Realismo mágico\' ORDER BY c.nombre;', pts:33}
    ]}
  ]}
]});

MODULES.push({
  id:'m5', emoji:'✏️', name:'Modificar datos y diseño físico', color:'#fb7185',
  desc:'INSERT, UPDATE, DELETE (con respeto), CREATE TABLE con reglas, transacciones e índices.',
  lessons:[

  /* -------- 5-1 -------- */
  { id:'5-1', title:'INSERT: agregar filas', time:'15 min', blocks:[
    {t:'p', h:'<b>INSERT INTO tabla (columnas) VALUES (valores)</b> agrega filas. Nombrar las columnas explícitamente es la forma profesional: la tabla puede cambiar de orden o ganar columnas y tu INSERT sigue funcionando. Se pueden insertar varias filas de un golpe separando grupos de VALUES con comas. Las columnas omitidas toman su valor DEFAULT o NULL.'},
    {t:'code', lang:'sql', title:'insertar bien', code:`INSERT INTO autores (nombre, pais) VALUES ('Octavio Paz', 'México');

INSERT INTO clientes (nombre, ciudad, email) VALUES
  ('Rocío Vargas', 'Oaxaca', 'rocio@mail.com'),
  ('Iker Méndez', 'Veracruz', NULL);

-- INTEGER PRIMARY KEY se auto-numera si la omites (comportamiento SQLite)
SELECT * FROM autores WHERE nombre LIKE 'Octavio%';`},
    {t:'info', title:'ℹ️ ¿Y si repito una PK o violo UNIQUE?', h:'El motor TE DETIENE con un error (en el playground, en español). Eso es la integridad trabajando para ti: es infinitamente mejor que un dato duplicado en silencio. <code>INSERT OR IGNORE</code> (SQLite) o <code>ON CONFLICT</code> / <code>ON DUPLICATE KEY</code> permiten decidir qué hacer en esos choques.'},
    {t:'sqlex', title:'🧪 Practica INSERT (cada tarea parte de la base fresca)', tasks:[
      {q:'Inserta un autor: <code>INSERT INTO autores (nombre, pais) VALUES (\'Octavio Paz\', \'México\');</code> y luego devuelve su fila completa con SELECT.', hint:'Son DOS statements separados por ;', check:{rows:1}, solution:'INSERT INTO autores (nombre, pais) VALUES (\'Octavio Paz\', \'México\'); SELECT * FROM autores WHERE nombre = \'Octavio Paz\';', pts:25},
      {q:'Inserta DOS clientes de un solo statement: Rocío Vargas (Oaxaca, rocio@mail.com) e Iker Méndez (Veracruz, sin email), y cuenta cuántos clientes hay ahora.', check:{cols:[['COUNT(*)','count(*)']], rows:[[10]]}, solution:'INSERT INTO clientes (nombre, ciudad, email) VALUES (\'Rocío Vargas\', \'Oaxaca\', \'rocio@mail.com\'), (\'Iker Méndez\', \'Veracruz\', NULL); SELECT COUNT(*) FROM clientes;', pts:25},
      {q:'Inserta el libro «Piedra de sol» del autor 10 (Octavio Paz tras tu insert anterior NO existe: usa autor_id 1), categoría «Poesía», precio 185, stock 4, año 1957; y muestra su fila.', check:{rows:1}, solution:'INSERT INTO libros (titulo, autor_id, categoria, precio, stock, anio) VALUES (\'Piedra de sol\', 1, \'Poesía\', 185, 4, 1957); SELECT * FROM libros WHERE titulo = \'Piedra de sol\';', pts:25},
      {q:'Intenta insertar un cliente con el email repetido: <code>INSERT INTO clientes (nombre, email) VALUES (\'Duplicado\', \'ana.torres@mail.com\');</code> — la tarea se califica cuando tu statement FALLA con el error de UNIQUE (así se aprende que la base te protege).', check:{expectError:'UNIQUE'}, solution:'INSERT INTO clientes (nombre, email) VALUES (\'Duplicado\', \'ana.torres@mail.com\');', pts:25}
    ]}
  ]},

  /* -------- 5-2 -------- */
  { id:'5-2', title:'UPDATE y DELETE: con gran poder…', time:'15 min', blocks:[
    {t:'p', h:'<b>UPDATE tabla SET col = valor, … WHERE condición</b> modifica filas existentes; <b>DELETE FROM tabla WHERE condición</b> las borra. Ambos actúan sobre TODAS las filas que cumplan el WHERE — y si olvidas el WHERE, actúan sobre TODAS. La regla de seguridad profesional: escribes el WHERE PRIMERO, lo pruebas con un SELECT equivalente, y solo entonces cambias a UPDATE/DELETE.'},
    {t:'code', lang:'sql', title:'el ritual de seguridad', code:`-- 1) ¿QUÉ filas van a ser tocadas? (SELECT con el mismo WHERE)
SELECT titulo, precio FROM libros WHERE categoria = 'Poesía';

-- 2) ahora sí, modifica
UPDATE libros SET precio = precio * 1.10 WHERE categoria = 'Poesía';

-- 3) verifica el resultado
SELECT titulo, precio FROM libros WHERE categoria = 'Poesía';`},
    {t:'warn', title:'⚠️ Historia de terror (y por qué las transacciones existen)', h:'<code>DELETE FROM ventas;</code> sin WHERE borra las 22 ventas. Sin respaldo, no hay deshacer. Por eso la siguiente lección enseña transacciones: BEGIN antes, y si algo sale mal, ROLLBACK devuelve todo. Los DBMS serios además exigen confirmaciones y mantienen bitácora (log) — pero tu primer instinto siempre debe ser el SELECT de verificación.'},
    {t:'sqlex', title:'🧪 Practica UPDATE/DELETE', tasks:[
      {q:'Sube 10% el precio de los libros de «Poesía» y muestra sus <code>titulo</code> y <code>precio</code> actualizados.', hint:'Antología poética (150 → 165) y… ¿hay más? Corre un SELECT primero para saberlo.', check:{rows:[['Antología poética',165]]}, solution:'UPDATE libros SET precio = ROUND(precio * 1.10, 2) WHERE categoria = \'Poesía\'; SELECT titulo, precio FROM libros WHERE categoria = \'Poesía\';', pts:25},
      {q:'Renombra la categoría «Realismo mágico» a «Realismo mágico clásico» y cuenta cuántos libros quedaron con la nueva etiqueta.', check:{cols:[['COUNT(*)','count(*)']], rows:[[2]]}, solution:'UPDATE libros SET categoria = \'Realismo mágico clásico\' WHERE categoria = \'Realismo mágico\'; SELECT COUNT(*) FROM libros WHERE categoria = \'Realismo mágico clásico\';', pts:25},
      {q:'Borra las ventas de mostrador (sin cliente) y verifica cuántas ventas quedan.', check:{cols:[['COUNT(*)','count(*)']], rows:[[18]]}, solution:'DELETE FROM ventas WHERE cliente_id IS NULL; SELECT COUNT(*) FROM ventas;', pts:25},
      {q:'Peligro controlado: <code>DELETE FROM proveedores;</code> sin WHERE y cuenta cuántas filas quedan en la tabla.', check:{cols:[['COUNT(*)','count(*)']], rows:[[0]]}, solution:'DELETE FROM proveedores; SELECT COUNT(*) FROM proveedores;', pts:25}
    ]}
  ]},

  /* -------- 5-3 -------- */
  { id:'5-3', title:'CREATE TABLE: diseño con reglas de integridad', time:'15 min', blocks:[
    {t:'p', h:'<b>CREATE TABLE</b> define una tabla nueva: columnas con su <b>tipo de dato</b> (INTEGER, TEXT, REAL…) y <b>constraints</b> que la base hace cumplir por ti: <code>PRIMARY KEY</code> (identidad única), <code>NOT NULL</code> (obligatorio), <code>UNIQUE</code> (sin repetidos), <code>DEFAULT</code> (valor por omisión), <code>CHECK</code> (condición que debe cumplirse) y <code>FOREIGN KEY … REFERENCES</code> (la relación).'},
    {t:'code', lang:'sql', title:'una tabla bien nacida', code:`CREATE TABLE prestamos (
  id        INTEGER PRIMARY KEY,
  libro_id  INTEGER NOT NULL REFERENCES libros(id),
  cliente_id INTEGER NOT NULL REFERENCES clientes(id),
  fecha     TEXT    NOT NULL,
  devuelto  INTEGER NOT NULL DEFAULT 0 CHECK (devuelto IN (0, 1))
);

INSERT INTO prestamos (libro_id, cliente_id, fecha)
VALUES (5, 1, '2025-05-20');      -- id y devuelto se resuelven solos`},
    {t:'info', title:'ℹ️ ¿Por qué devuelto INTEGER y no BOOLEAN?', h:'SQLite no tiene tipo BOOLEAN: se usa INTEGER 0/1 (la convención universal). PostgreSQL sí tiene BOOLEAN; MySQL usa TINYINT(1). Tipos clave para empezar: INTEGER enteros, TEXT texto, REAL decimales — ¡y el dinero como REAL/DECIMAL con redondeo explícito, nunca "a ojo"!'},
    {t:'sqlex', title:'🧪 Diseña y prueba tu propia tabla', tasks:[
      {q:'Crea la tabla <code>prestamos</code> del ejemplo de arriba (id PK, libro_id NOT NULL, cliente_id NOT NULL, fecha TEXT NOT NULL, devuelto INTEGER NOT NULL DEFAULT 0 con CHECK en (0,1)). El mensaje debe confirmar la creación.', check:{expectMessage:'creada'}, solution:'CREATE TABLE prestamos (id INTEGER PRIMARY KEY, libro_id INTEGER NOT NULL, cliente_id INTEGER NOT NULL, fecha TEXT NOT NULL, devuelto INTEGER NOT NULL DEFAULT 0 CHECK (devuelto IN (0,1)));', pts:25},
      {q:'Con tu tabla ya creada (incluye el CREATE otra vez si ejecutas desde cero), inserta un préstamo del libro 5 al cliente 1 hoy: <code>fecha \'2025-05-20\'</code> — SIN mencionar id ni devuelto — y muestra su fila (devuelto debe salir 0 solo).', check:{rows:1}, solution:'CREATE TABLE prestamos (id INTEGER PRIMARY KEY, libro_id INTEGER NOT NULL, cliente_id INTEGER NOT NULL, fecha TEXT NOT NULL, devuelto INTEGER NOT NULL DEFAULT 0 CHECK (devuelto IN (0,1))); INSERT INTO prestamos (libro_id, cliente_id, fecha) VALUES (5, 1, \'2025-05-20\'); SELECT * FROM prestamos;', pts:25},
      {q:'Demuestra el CHECK: intenta insertar <code>devuelto = 2</code> — la tarea se califica cuando falle con error de CHECK.', check:{expectError:'CHECK'}, solution:'CREATE TABLE prestamos (id INTEGER PRIMARY KEY, libro_id INTEGER NOT NULL, cliente_id INTEGER NOT NULL, fecha TEXT NOT NULL, devuelto INTEGER NOT NULL DEFAULT 0 CHECK (devuelto IN (0,1))); INSERT INTO prestamos (libro_id, cliente_id, fecha, devuelto) VALUES (5, 1, \'2025-05-20\', 2);', pts:25},
      {q:'Demuestra NOT NULL: intenta insertar un préstamo sin fecha — debe fallar mencionando NOT NULL.', check:{expectError:'NOT NULL'}, solution:'CREATE TABLE prestamos (id INTEGER PRIMARY KEY, libro_id INTEGER NOT NULL, cliente_id INTEGER NOT NULL, fecha TEXT NOT NULL, devuelto INTEGER NOT NULL DEFAULT 0 CHECK (devuelto IN (0,1))); INSERT INTO prestamos (libro_id, cliente_id) VALUES (5, 1);', pts:25}
    ]}
  ]},

  /* -------- 5-4 -------- */
  { id:'5-4', title:'Transacciones e índices: seguridad y velocidad', time:'15 min', blocks:[
    {t:'p', h:'Una <b>transacción</b> agrupa varios cambios como una sola unidad: <code>BEGIN</code> abre, los cambios se ensayan, y decides <code>COMMIT</code> (confirmar) o <code>ROLLBACK</code> (deshacer TODO). Es el "deshacer" que te salva del DELETE sin WHERE. El ejemplo canónico es transferir dinero: restar de una cuenta y sumar en otra — si falla la mitad, el dinero desaparece; en transacción, ROLLBACK devuelve el mundo a su estado previo.'},
    {t:'code', lang:'sql', title:'el paracaídas del administrador', code:`BEGIN;
UPDATE libros SET stock = stock - 1 WHERE id = 5;
INSERT INTO ventas (libro_id, cliente_id, fecha, cantidad, total)
VALUES (5, 1, '2025-05-21', 1, 210);
-- todo bien → COMMIT;   algo salió mal → ROLLBACK;
COMMIT;`},
    {t:'p', h:'Un <b>índice</b> (CREATE INDEX) es la estructura que hace las búsquedas rápidas: en vez de leer la tabla completa fila por fila (full scan), el motor consulta el índice como el índice de un libro. Se crean solos para las PRIMARY KEY y UNIQUE; se agregan a mano para columnas muy filtradas (<code>CREATE INDEX idx_ventas_fecha ON ventas(fecha);</code>). El costo: cada INSERT/UPDATE actualiza el índice — no indexes todo, indexa lo que buscas.'},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>ROLLBACK</code> sirve para…', options:['Borrar la tabla','Deshacer todos los cambios desde BEGIN','Guardar los cambios','Crear un respaldo en disco'], correct:1, pts:10, explain:'ROLLBACK deshace todo lo hecho desde el BEGIN de la transacción.'},
      {type:'mc', q:'La transferencia bancaria (restar aquí, sumar allá) debe ejecutarse…', options:['En dos transacciones separadas','Sin transacción, es más rápido','En UNA transacción: o los dos pasos o ninguno','Con DELETE previo'], correct:2, pts:10, explain:'Atomicidad: la unidad de trabajo es la transferencia completa.'},
      {type:'tf', q:'Un índice acelera las lecturas pero encarece las escrituras.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Cada INSERT/UPDATE debe actualizar los índices: por eso se indexa con criterio.'},
      {type:'mc', q:'¿Qué columnas merecen índice desde el diseño?', options:['Todas, por si acaso','Las llaves primarias (ya las traen) y las muy consultadas','Solo las de texto','Ninguna: los índices son de Oracle'], correct:1, pts:10, explain:'PK y UNIQUE ya crean su índice; agrega más solo donde el WHERE/JOIN lo pida.'},
      {type:'mc', q:'Después de <code>BEGIN;</code> <code>DELETE FROM ventas;</code> … te arrepientes. ¿Qué ejecutas?', options:['COMMIT;','ROLLBACK;','DELETE otra vez','SELECT * FROM ventas;'], correct:1, pts:10, explain:'ROLLBACK deshace el DELETE: las filas vuelven.'}
    ]},
    {t:'srs', deck:'sqlcore', sub:'Conceptos de modificación de datos y diseño físico para no olvidar.'}
  ]}
]});

MODULES.push({
  id:'m6', emoji:'🚀', name:'SQL avanzado', color:'#818cf8',
  desc:'Subconsultas, vistas, UNION y funciones de ventana: el salto a analista.',
  lessons:[

  /* -------- 6-1 -------- */
  { id:'6-1', title:'Subconsultas: consultas dentro de consultas', time:'15 min', blocks:[
    {t:'p', h:'Una <b>subconsulta</b> es un SELECT dentro de otro. Tres formas que cubren casi todo: <b>escalar</b> (produce un valor: <code>WHERE precio &gt; (SELECT AVG(precio)…)</code>), <b>de lista</b> (produce valores para IN: <code>WHERE id IN (SELECT libro_id…)</code>) y <b>correlacionada</b> (referencia columnas de la consulta externa: se evalúa fila por fila — potente pero cara en tablas enormes).'},
    {t:'code', lang:'sql', title:'las tres formas', code:`-- escalar: ¿qué libros están por encima del promedio?
SELECT titulo, precio FROM libros
WHERE precio > (SELECT AVG(precio) FROM libros);

-- de lista: ¿quiénes compraron algo caro (> 500)?
SELECT nombre FROM clientes
WHERE id IN (SELECT cliente_id FROM ventas WHERE total > 500);

-- correlacionada: ventas de cada cliente vs su propio promedio
SELECT v.id, v.total FROM ventas v
WHERE v.total > (SELECT AVG(v2.total) FROM ventas v2 WHERE v2.cliente_id = v.cliente_id);`},
    {t:'sqlex', title:'🧪 Practica subconsultas', tasks:[
      {q:'Libros con precio MAYOR al promedio general: <code>titulo</code> y <code>precio</code>, ordenados por precio descendente.', check:{rows:[['Rayuela',340],['Cien años de soledad',320.5],['La casa de los espíritus',310],['La ciudad y los perros',295],['El amor en los tiempos del cólera',280],['La casa verde',270],['De amor y de sombras',250]]}, solution:'SELECT titulo, precio FROM libros WHERE precio > (SELECT AVG(precio) FROM libros) ORDER BY precio DESC;', pts:25},
      {q:'Clientes que compraron ALGO con total mayor a 500: <code>nombre</code> sin repetir, con IN.', check:{rows:[['Carlos Sánchez'],['Pedro Álvarez']]}, solution:'SELECT nombre FROM clientes WHERE id IN (SELECT cliente_id FROM ventas WHERE total > 500) ORDER BY nombre;', pts:25},
      {q:'El libro más caro SIN usar ORDER BY: <code>titulo</code> y <code>precio</code>, con subconsulta escalar de MAX.', check:{rows:[['Rayuela',340]]}, solution:'SELECT titulo, precio FROM libros WHERE precio = (SELECT MAX(precio) FROM libros);', pts:25},
      {q:'Por cada venta, el total y el promedio de SUS compras como cliente: <code>v.id</code>, <code>v.total</code> y la subconsulta correlacionada <code>(SELECT ROUND(AVG(v2.total),2) FROM ventas v2 WHERE v2.cliente_id = v.cliente_id)</code> como <code>su_promedio</code> — solo ventas del cliente 1.', check:{rows:[[1,320.5,333.5],[7,340,333.5],[20,340,333.5]]}, solution:'SELECT v.id, v.total, (SELECT ROUND(AVG(v2.total),2) FROM ventas v2 WHERE v2.cliente_id = v.cliente_id) AS su_promedio FROM ventas v WHERE v.cliente_id = 1 ORDER BY v.id;', pts:25}
    ]}
  ]},

  /* -------- 6-2 -------- */
  { id:'6-2', title:'VIEWS y UNION: reutilizar y unir', time:'15 min', blocks:[
    {t:'p', h:'Una <b>VISTA (VIEW)</b> es una consulta guardada con nombre: <code>CREATE VIEW ventas_grandes AS SELECT …</code> — después la consultas como si fuera una tabla (<code>SELECT * FROM ventas_grandes</code>). No duplica datos: ejecuta su SELECT cada vez. Ideal para reportes recurrentes y para dar a cada equipo "su" versión de los datos sin exponer tablas completas.'},
    {t:'p', h:'<b>UNION</b> apila resultados de dos consultas (mismas columnas): <code>UNION</code> quita duplicados, <code>UNION ALL</code> los mantiene (más rápido). Úsalo para reportes combinados: ventas de mostrador y ventas con cliente en una sola lista, o "activos" + "archivados".'},
    {t:'code', lang:'sql', title:'vistas y uniones', code:`CREATE VIEW catalogo_barato AS
  SELECT titulo, precio FROM libros WHERE precio < 200;

SELECT * FROM catalogo_barato ORDER BY precio;

SELECT nombre, 'con email' AS canal FROM clientes WHERE email IS NOT NULL
UNION ALL
SELECT nombre, 'sin email' FROM clientes WHERE email IS NULL;`},
    {t:'sqlex', title:'🧪 Practica vistas y UNION', tasks:[
      {q:'Crea la vista <code>catalogo_barato</code> (títulos y precios menores a 200) y muestra su contenido ordenado por precio.', check:{rows:6}, solution:'CREATE VIEW catalogo_barato AS SELECT titulo, precio FROM libros WHERE precio < 200; SELECT * FROM catalogo_barato ORDER BY precio;', pts:34},
      {q:'Une en una lista las ciudades de clientes y los países de autores (una columna <code>lugar</code>), SIN repetir, ordenada.', check:{rows:11}, solution:'SELECT ciudad AS lugar FROM clientes UNION SELECT pais AS lugar FROM autores ORDER BY lugar;', pts:33},
      {q:'Con UNION ALL cuenta cuántas filas suman clientes + autores en una sola consulta: <code>SELECT COUNT(*) FROM (…unión…)</code> como <code>total</code>.', hint:'Usa la subconsulta en FROM: SELECT COUNT(*) FROM (SELECT … UNION ALL SELECT …).', check:{cols:[['total']], rows:[[17]]}, solution:'SELECT COUNT(*) AS total FROM (SELECT nombre FROM clientes UNION ALL SELECT nombre FROM autores);', pts:33}
    ]}
  ]},

  /* -------- 6-3 -------- */
  { id:'6-3', title:'Funciones de ventana: ranking sin romperse la cabeza', time:'15 min', blocks:[
    {t:'p', h:'Las <b>funciones de ventana</b> calculan algo sobre un conjunto de filas SIN colapsarlas (a diferencia de GROUP BY). Las básicas: <code>ROW_NUMBER() OVER (ORDER BY …)</code> numera 1,2,3…; <code>RANK()</code> igual pero con empates que comparten puesto y saltan; <code>DENSE_RANK()</code> empates sin saltos. Con <code>PARTITION BY</code> el ranking SE REINICIA por grupo — el clásico "el más vendido DE CADA mes".'},
    {t:'code', lang:'sql', title:'ranking y top-por-grupo', code:`-- ranking de libros por precio
SELECT titulo, precio,
       ROW_NUMBER() OVER (ORDER BY precio DESC) AS posicion
FROM libros;

-- el más caro DE CADA categoría (patrón top-N-per-group)
SELECT * FROM (
  SELECT titulo, categoria,
         ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY precio DESC) AS rk
  FROM libros
) WHERE rk = 1;`},
    {t:'info', title:'ℹ️ Soporte por motor', h:'Las funciones de ventana son estándar ISO SQL:2011 y existen en PostgreSQL, MySQL 8+, SQL Server, Oracle y SQLite 3.25+ (2018). Si algún día tocas MySQL 5.x, no existen: se simulan con variables de usuario — motivo más para usar motores modernos.'},
    {t:'sqlex', title:'🧪 Practica ventanas', tasks:[
      {q:'Ranking de libros por precio (mayor a menor): <code>titulo</code>, <code>precio</code> y <code>ROW_NUMBER() OVER (ORDER BY precio DESC)</code> como <code>pos</code> — muestra solo los 3 primeros.', check:{rows:[['Rayuela',340,1],['Cien años de soledad',320.5,2],['La casa de los espíritus',310,3]]}, solution:'SELECT titulo, precio, ROW_NUMBER() OVER (ORDER BY precio DESC) AS pos FROM libros ORDER BY pos LIMIT 3;', pts:34},
      {q:'Libros numerados DENTRO de su categoría por precio descendente: <code>titulo</code>, <code>categoria</code> y <code>ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY precio DESC)</code> como <code>rk</code> — solo categoría «Cuentos».', check:{rows:[['Ficciones','Cuentos',1],['El Aleph','Cuentos',2],['Bestiario','Cuentos',3]]}, solution:'SELECT titulo, categoria, ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY precio DESC) AS rk FROM libros WHERE categoria = \'Cuentos\' ORDER BY rk;', pts:33},
      {q:'El libro más caro de CADA categoría con el patrón top-N-per-group (subconsulta en FROM + rk = 1): <code>titulo</code>, <code>categoria</code>, <code>precio</code> ordenado por categoría.', check:{rows:6}, solution:'SELECT titulo, categoria, precio FROM (SELECT titulo, categoria, precio, ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY precio DESC) AS rk FROM libros) WHERE rk = 1 ORDER BY categoria;', pts:33}
    ]},
    {t:'srs', deck:'sqlcore', sub:'El mazo completo de conceptos SQL: 2 minutos al día y no se te olvida ninguno.'}
  ]}
]});

MODULES.push({
  id:'m7', emoji:'🏆', name:'Proyecto final y examen', color:'#fbbf24',
  desc:'Diseña el esquema completo de una librería real y demuestra todo en el examen.',
  lessons:[

  /* -------- 7-1 -------- */
  { id:'7-1', title:'Proyecto final I: diseña el esquema de la librería', time:'20 min', blocks:[
    {t:'p', h:'Momento de volar solo. Vas a crear el esquema de una <b>biblioteca escolar</b> desde cero: <code>alumnos</code>, <code>libros_bib</code> y <code>prestamos</code> (tabla puente). Aplica todo: tipos correctos, llaves, NOT NULL donde toca, DEFAULT y CHECK. Después la poblarás y en la siguiente lección harás sus reportes.'},
    {t:'list', items:[
      '<code>alumnos(id PK, nombre TEXT NOT NULL, grado INTEGER CHECK entre 1 y 6)</code>',
      '<code>libros_bib(id PK, titulo TEXT NOT NULL, disponible INTEGER NOT NULL DEFAULT 1)</code>',
      '<code>prestamos(id PK, alumno_id NOT NULL, libro_id NOT NULL, fecha TEXT NOT NULL, entregado DEFAULT 0)</code>',
      'Nombra las tablas EXACTAMENTE así (el calificador las busca).'
    ]},
    {t:'sqlex', title:'🧪 El esquema', tasks:[
      {q:'Crea las 3 tablas en un solo statement múltiple y crea 1 alumno de prueba (<code>(\'Ana\', 3)</code>). Verificación: <code>SELECT nombre FROM alumnos;</code> debe devolver a Ana.', check:{rows:[['Ana']]}, solution:'CREATE TABLE alumnos (id INTEGER PRIMARY KEY, nombre TEXT NOT NULL, grado INTEGER CHECK (grado BETWEEN 1 AND 6)); CREATE TABLE libros_bib (id INTEGER PRIMARY KEY, titulo TEXT NOT NULL, disponible INTEGER NOT NULL DEFAULT 1); CREATE TABLE prestamos (id INTEGER PRIMARY KEY, alumno_id INTEGER NOT NULL, libro_id INTEGER NOT NULL, fecha TEXT NOT NULL, entregado INTEGER NOT NULL DEFAULT 0); INSERT INTO alumnos (nombre, grado) VALUES (\'Ana\', 3); SELECT nombre FROM alumnos;', pts:34},
      {q:'Con el esquema completo otra vez: inserta 2 libros (<code>\'Matemáticas 3\'</code> y <code>\'Historia universal\'</code>) y verifica con <code>SELECT COUNT(*) FROM libros_bib;</code>', check:{cols:[['COUNT(*)','count(*)']], rows:[[2]]}, solution:'CREATE TABLE alumnos (id INTEGER PRIMARY KEY, nombre TEXT NOT NULL, grado INTEGER CHECK (grado BETWEEN 1 AND 6)); CREATE TABLE libros_bib (id INTEGER PRIMARY KEY, titulo TEXT NOT NULL, disponible INTEGER NOT NULL DEFAULT 1); CREATE TABLE prestamos (id INTEGER PRIMARY KEY, alumno_id INTEGER NOT NULL, libro_id INTEGER NOT NULL, fecha TEXT NOT NULL, entregado INTEGER NOT NULL DEFAULT 0); INSERT INTO libros_bib (titulo) VALUES (\'Matemáticas 3\'), (\'Historia universal\'); SELECT COUNT(*) FROM libros_bib;', pts:33},
      {q:'Con el esquema completo: registra un préstamo (alumno 1, libro 1, fecha \'2025-05-21\') y marca el libro como NO disponible (UPDATE disponible = 0). Verifica: <code>SELECT disponible FROM libros_bib WHERE id = 1;</code> → 0.', check:{cols:[['disponible']], rows:[[0]]}, solution:'CREATE TABLE alumnos (id INTEGER PRIMARY KEY, nombre TEXT NOT NULL, grado INTEGER CHECK (grado BETWEEN 1 AND 6)); CREATE TABLE libros_bib (id INTEGER PRIMARY KEY, titulo TEXT NOT NULL, disponible INTEGER NOT NULL DEFAULT 1); CREATE TABLE prestamos (id INTEGER PRIMARY KEY, alumno_id INTEGER NOT NULL, libro_id INTEGER NOT NULL, fecha TEXT NOT NULL, entregado INTEGER NOT NULL DEFAULT 0); INSERT INTO libros_bib (titulo) VALUES (\'Matemáticas 3\'); INSERT INTO prestamos (alumno_id, libro_id, fecha) VALUES (1, 1, \'2025-05-21\'); UPDATE libros_bib SET disponible = 0 WHERE id = 1; SELECT disponible FROM libros_bib WHERE id = 1;', pts:33}
    ]}
  ]},

  /* -------- 7-2 -------- */
  { id:'7-2', title:'Proyecto final II: los 5 reportes de negocio', time:'20 min', blocks:[
    {t:'p', h:'La dirección de la Librería Esperanza pidió sus reportes de mayo. Son EXACTAMENTE las consultas que un analista junior escribe su primera semana. Cada tarea parte de la base fresca — lee bien qué columnas pide cada uno.'},
    {t:'sqlex', title:'🧪 Los reportes de la dirección', tasks:[
      {q:'REPORT 1 · Ventas por mes: <code>SUBSTR(fecha,6,2)</code> como <code>mes</code>, <code>COUNT(*)</code> como <code>ventas</code> y <code>ROUND(SUM(total),2)</code> como <code>ingreso</code>, ordenado por mes.', check:{rows:[['01',4,1161],['02',5,2030],['03',6,2076],['04',5,1605],['05',2,485.5]]}, solution:'SELECT SUBSTR(fecha,6,2) AS mes, COUNT(*) AS ventas, ROUND(SUM(total),2) AS ingreso FROM ventas GROUP BY mes ORDER BY mes;', pts:20},
      {q:'REPORT 2 · El top 3 de libros por INGRESO (suma de totales vendidos): <code>l.titulo</code> y <code>ROUND(SUM(v.total),2)</code> como <code>ingreso</code>, orden descendente.', check:{rows:[['Cien años de soledad',1282],['La casa de los espíritus',930],['Rayuela',680]]}, solution:'SELECT l.titulo, ROUND(SUM(v.total),2) AS ingreso FROM ventas v JOIN libros l ON v.libro_id = l.id GROUP BY l.titulo ORDER BY ingreso DESC LIMIT 3;', pts:20},
      {q:'REPORT 3 · Clientes VIP (gasto total mayor a 800): <code>c.nombre</code> y <code>ROUND(SUM(v.total),2)</code> como <code>gasto</code>, descendente por gasto.', check:{rows:[['Carlos Sánchez',1080],['Ana Torres',1000.5],['Sofía Castro',810]]}, solution:'SELECT c.nombre, ROUND(SUM(v.total),2) AS gasto FROM ventas v JOIN clientes c ON v.cliente_id = c.id GROUP BY c.nombre HAVING SUM(v.total) > 800 ORDER BY gasto DESC;', pts:20},
      {q:'REPORT 4 · Inventario crítico: libros con stock menor a 5: <code>titulo</code>, <code>stock</code> (incluye agotados), ordenado por stock ascendente.', check:{rows:[['El Aleph',0],['Antología poética',0],['El túnel',2],['La casa verde',3],['De amor y de sombras',4]]}, solution:'SELECT titulo, stock FROM libros WHERE stock < 5 ORDER BY stock, titulo;', pts:20},
      {q:'REPORT 5 · Título más caro por categoría (ventanas): <code>categoria</code>, <code>titulo</code> y <code>precio</code> del más caro de cada una, ordenado por categoría.', check:{rows:6}, solution:'SELECT categoria, titulo, precio FROM (SELECT categoria, titulo, precio, ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY precio DESC) AS rk FROM libros) WHERE rk = 1 ORDER BY categoria;', pts:20},
      {q:'REPORT 6 · Porcentaje de ventas de mostrador (sin cliente): <code>ROUND(100.0 * SUM(CASE WHEN cliente_id IS NULL THEN 1 ELSE 0 END) / COUNT(*), 1)</code> con alias <code>pct</code>.', hint:'CASE dentro de SUM cuenta las filas sin cliente; divídelo entre COUNT(*).', check:{cols:[['pct']], rows:[[18.2]]}, solution:'SELECT ROUND(100.0 * SUM(CASE WHEN cliente_id IS NULL THEN 1 ELSE 0 END) / COUNT(*), 1) AS pct FROM ventas;', pts:20},
      {q:'REPORT 7 · Los 3 libros más vendidos por UNIDADES: <code>l.titulo</code> y <code>SUM(v.cantidad)</code> como <code>unidades</code>, descendente (desempate alfabético).', check:{rows:[['Cien años de soledad',4],['La hora de la estrella',4],['Como agua para chocolate',3]]}, solution:'SELECT l.titulo, SUM(v.cantidad) AS unidades FROM ventas v JOIN libros l ON v.libro_id = l.id GROUP BY l.titulo ORDER BY unidades DESC, titulo LIMIT 3;', pts:20}
    ]}
  ]},

  /* -------- 7-3 -------- */
  { id:'7-3', title:'Estrategia del examen final', time:'10 min', blocks:[
    {t:'p', h:'El examen son <b>30 preguntas de 10 puntos (300 en total)</b>: se aprueba con <b>210 (70%)</b>. Hay de tres tipos: opción múltiple, verdadero/falso y <b>completar</b> (escribir la palabra clave SQL — el corrector tolera mayúsculas y espacios). Cubre TODO el curso, con énfasis en: SELECT/WHERE, JOINs, GROUP BY/HAVING, subconsultas y lectura de resultados.'},
    {t:'list', items:[
      '<b>Léelo entero primero</b>: las preguntas se vuelven más concretas conforme avanzan.',
      'En las de completar, piensa en la PALABRA CLAVE (WHERE, HAVING, LEFT, ON, DISTINCT…).',
      'Para "¿qué devuelve esta consulta?": ejecuta mentalmente el orden lógico (FROM→WHERE→GROUP→HAVING→SELECT→ORDER→LIMIT).',
      'Puedes presentarlo todas las veces que quieras: se guarda tu MEJOR calificación.',
      'El playground sigue disponible durante el examen — pero el tiempo real de un analista es cronometrado; practica sin mirar soluciones primero.'
    ]},
    {t:'milestone', title:'🎓 Después del examen', h:'Con este curso tienes el corazón de SQL. Siguientes pasos naturales: práctica en SQLite/PostgreSQL reales con la bibliografía del libro de texto (Learning SQL, SQL Cookbook), y luego módulos especializados: modelado avanzado, optimización con EXPLAIN, o el camino de analítica (ventanas, CTEs). El siguiente curso del campus (Python) se complementa perfecto: SQL para los datos, Python para el procesamiento.'}
  ]}
]});

/* ============================================================
   EXAMEN FINAL — 30 preguntas × 10 pts = 300
   ============================================================ */
const EXAM = {
  timeMin: 40,
  questions: [
    {type:'mc',  q:'M0 · Una tabla relacional guarda los datos en…', options:['Párrafos de texto','Filas y columnas','Carpetas y archivos','Objetos JSON'], correct:1, pts:10, explain:'Filas (registros) y columnas (campos): la estructura básica.'},
    {type:'mc',  q:'M0 · ¿Qué par forma la conexión entre dos tablas?', options:['Índice y vista','Llave foránea → llave primaria','Trigger y procedimiento','Usuario y contraseña'], correct:1, pts:10, explain:'La FK de una tabla referencia la PK de otra.'},
    {type:'fill', q:'M1 · Escribe la palabra clave que selecciona columnas:', accept:['select'], re:'^\\s*select\\s*;?\\s*$', pts:10, explain:'SELECT define qué columnas verás.'},
    {type:'fill', q:'M1 · Completa: SELECT titulo FROM libros ___ precio > 300 (una palabra):', accept:['where'], re:'^\\s*where\\s*;?\\s*$', pts:10, explain:'WHERE filtra filas por condición.'},
    {type:'mc',  q:'M1 · ¿Qué devuelve WHERE email = NULL?', options:['Las filas con email vacío','Siempre cero filas: se usa IS NULL','Todas las filas','Un error de sintaxis'], correct:1, pts:10, explain:'Comparar con NULL da NULL (ni V ni F): solo IS NULL encuentra nulos.'},
    {type:'tf',  q:'M1 · El patrón LIKE \'%ez\' encuentra textos que TERMINAN con "ez".', options:['Verdadero','Falso'], correct:0, pts:10, explain:'El % inicial acepta cualquier cosa antes: termina con "ez".'},
    {type:'fill', q:'M1 · Palabra clave para eliminar duplicados del resultado:', accept:['distinct'], re:'^\\s*distinct\\s*;?\\s*$', pts:10, explain:'SELECT DISTINCT devuelve filas únicas.'},
    {type:'mc',  q:'M1 · ¿Cuántas filas devuelve SELECT nombre FROM clientes WHERE ciudad = \'Guadalajara\'?', options:['1','2','3','4'], correct:1, pts:10, explain:'Luis Ramírez y Sofía Castro: dos clientes guadalajarenses.'},
    {type:'mc',  q:'M2 · ¿Qué función da el MES de una fecha ISO como \'2025-03-15\'?', options:['MONTH() en todos los motores','SUBSTR(fecha,6,2) en ISO','YEAR(fecha) partida','No se puede'], correct:1, pts:10, explain:'En ISO el mes son los caracteres 6-7: SUBSTR(fecha,6,2) (o MONTH() en MySQL/SQL Server).'},
    {type:'mc',  q:'M2 · COALESCE(email, ciudad, \'N/D\') devuelve…', options:['Siempre \'N/D\'','El primer valor NO nulo de la lista','La suma de los tres','Un error'], correct:1, pts:10, explain:'COALESCE recorre la lista y devuelve el primer no-NULL.'},
    {type:'fill', q:'M2 · Completa la cláusula que asigna \'barato\' o \'caro\': CASE WHEN precio < 200 THEN \'barato\' ___ \'caro\' END:', accept:['else'], re:'^\\s*else\\s*;?\\s*$', pts:10, explain:'ELSE captura los casos que no cumplieron los WHEN.'},
    {type:'mc',  q:'M3 · ¿Diferencia entre COUNT(*) y COUNT(col)?', options:['No hay diferencia','COUNT(col) ignora las filas donde col es NULL','COUNT(*) ignora nulos','COUNT(col) cuenta caracteres'], correct:1, pts:10, explain:'COUNT(col) solo cuenta valores no nulos; COUNT(*) cuenta filas.'},
    {type:'mc',  q:'M3 · Ingreso por mes se obtiene con…', options:['ORDER BY mes','GROUP BY mes + SUM(total)','DISTINCT mes','LIMIT por mes'], correct:1, pts:10, explain:'Agrupar por mes y sumar: el patrón de reporte más común.'},
    {type:'fill', q:'M3 · Palabra clave que FILTRA GRUPOS (después de agrupar):', accept:['having'], re:'^\\s*having\\s*;?\\s*$', pts:10, explain:'HAVING filtra sobre agregados; WHERE filtra filas.'},
    {type:'mc',  q:'M3 · SELECT categoria, AVG(precio) FROM libros GROUP BY categoria — devuelve…', options:['Un solo renglón','Una fila por categoría con su promedio','Todas las filas de libros','Error de sintaxis'], correct:1, pts:10, explain:'Una fila por grupo: 6 categorías, 6 filas.'},
    {type:'mc',  q:'M4 · INNER JOIN devuelve…', options:['Todas las filas de ambas tablas','Solo las parejas que cumplen el ON','Las filas sin coincidencia','Solo la primera tabla'], correct:1, pts:10, explain:'INNER = intersección: solo coincidencias.'},
    {type:'fill', q:'M4 · Tipo de JOIN que conserva TODAS las filas de la tabla izquierda:', accept:['left join','left'], re:'^\\s*left\\s*(\\s+join)?\\s*$', pts:10, explain:'LEFT JOIN mantiene toda la izquierda y NULLs a la derecha donde no hay pareja.'},
    {type:'mc',  q:'M4 · ¿Qué encuentra WHERE v.id IS NULL tras un LEFT JOIN de libros a ventas?', options:['Ventas sin libro','Libros nunca vendidos','Libros duplicados','Nada: es un error'], correct:1, pts:10, explain:'El clásico anti-join: filas de la izquierda sin pareja en la derecha.'},
    {type:'mc',  q:'M4 · Guardar el país del autor dentro de libros viola…', options:['1FN','2FN','3FN','Nada'], correct:2, pts:10, explain:'Depende del autor (transitivo), no del libro: 3FN.'},
    {type:'fill', q:'M5 · Palabra clave para AGREGAR filas a una tabla:', accept:['insert'], re:'^\\s*insert\\s*;?\\s*$', pts:10, explain:'INSERT INTO … VALUES …'},
    {type:'mc',  q:'M5 · ¿Qué hace DELETE FROM ventas sin WHERE?', options:['Nada: exige WHERE','Borra TODAS las filas','Borra la tabla completa con sus columnas','Solo borra la primera fila'], correct:1, pts:10, explain:'Todas las filas (la estructura queda). Por eso: WHERE primero, siempre.'},
    {type:'fill', q:'M5 · Restricción que garantiza un valor no vacío en una columna:', accept:['not null'], re:'^\\s*not\\s+null\\s*;?\\s*$', pts:10, explain:'NOT NULL rechaza insertar la columna vacía.'},
    {type:'mc',  q:'M5 · INSERT con INTEGER PRIMARY KEY omitida en SQLite…', options:['Da error','Se auto-numera con el siguiente número','Guarda NULL','Guarda 0'], correct:1, pts:10, explain:'Comportamiento rowid de SQLite: max+1.'},
    {type:'mc',  q:'M5 · BEGIN … ROLLBACK …', options:['Confirma los cambios','Deshace los cambios desde BEGIN','Borra la tabla','Crea índice'], correct:1, pts:10, explain:'ROLLBACK regresa al estado previo al BEGIN.'},
    {type:'mc',  q:'M6 · Una subconsulta escalar…', options:['Devuelve una tabla completa','Devuelve UN valor y puede compararse con = o >','Solo funciona en FROM','Requiere JOIN'], correct:1, pts:10, explain:'Un solo valor: precio > (SELECT AVG(precio) …).'},
    {type:'mc',  q:'M6 · Una VIEW…', options:['Copia los datos a una tabla nueva','Guarda una consulta con nombre que se ejecuta al consultarla','Acelera los INSERT automáticamente','Es un respaldo'], correct:1, pts:10, explain:'La vista es la consulta guardada, no los datos.'},
    {type:'fill', q:'M6 · Palabra clave que UNE resultados de dos consultas SIN duplicados:', accept:['union'], re:'^\\s*union\\s*;?\\s*$', pts:10, explain:'UNION deduplica; UNION ALL conserva todo.'},
    {type:'mc',  q:'M6 · ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY precio DESC) numera…', options:['Toda la tabla 1..N','Por categoría: 1..n en cada una, del más caro al más barato','Solo la primera fila de cada grupo','Aleatoriamente'], correct:1, pts:10, explain:'PARTITION reinicia la numeración por grupo; ORDER define el orden interno.'},
    {type:'mc',  q:'M7 · El orden lógico de ejecución es…', options:['SELECT→FROM→WHERE','FROM→WHERE→GROUP BY→HAVING→SELECT→ORDER BY→LIMIT','WHERE→SELECT→FROM','LIMIT→ORDER→WHERE'], correct:1, pts:10, explain:'El motor filtra, agrupa, calcula, ordena y recorta — en ese orden lógico.'},
    {type:'tf',  q:'M7 · En la Librería Esperanza, <code>SELECT SUM(total) FROM ventas</code> da el ingreso TOTAL del año.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'SUM colapsa los 22 totales en un solo número: 7357.5.'}
  ]
};
