/* ============================================================
   CURSO SQL — CONTENIDO parte A (Módulos 0–3)
   Se ejecuta tras definir SQLE_DB_FRESH y SQLE (motor).
   ============================================================ */
const MODULES = [];
MODULES.push({
  id:'m0', emoji:'🧭', name:'Conoce las bases de datos', color:'#64748b',
  desc:'Qué es una base de datos relacional, quién usa qué motor y tu primer contacto con el playground.',
  lessons:[

  /* -------- 0-1 -------- */
  { id:'0-1', title:'¿Qué es una base de datos y por qué no vives sin ellas?', time:'12 min', blocks:[
    {t:'p', h:'Una <b>base de datos relacional</b> guarda información en <b>tablas</b>: cada tabla es una cuadrícula de <b>filas</b> (un registro: un libro, un cliente) y <b>columnas</b> (un dato: título, precio). Lo «relacional» significa que las tablas se conectan entre sí por llaves: una venta apunta al cliente que la hizo y al libro vendido. WhatsApp, tu banco, Netflix y la app del súper viven sobre este modelo.'},
    {t:'table', head:['Concepto','Equivale a','Ejemplo en el curso'], rows:[
      ['<b>Tabla</b> (tabla)','Una hoja de Excel','<code>libros</code>'],
      ['<b>Fila</b> (registro)','Una línea de la hoja','El libro «Ficciones»'],
      ['<b>Columna</b> (campo)','Una columna con encabezado','<code>precio</code>'],
      ['<b>Llave primaria</b>','El número de boleta: único e irrepetible','<code>libros.id</code>'],
      ['<b>Llave foránea</b>','Una referencia a otra tabla','<code>ventas.libro_id</code> → <code>libros.id</code>'],
      ['<b>NULL</b>','«Este dato no se sabe / no aplica»','Un cliente sin email']
    ]},
    {t:'p', h:'¿Por qué no una hoja de Excel? Tres razones que vivirás en este curso: <b>1)</b> integridad — la base se NEGOCIA a guardar un cliente duplicado o una venta sin fecha; <b>2)</b> consultas — «las 10 categorías más vendidas en marzo» es una línea de SQL, no tres horas de copiar-pegar; <b>3)</b> concurrencia — miles de personas escriben a la vez sin pisarse. Excel gana para una lista personal; la base de datos gana en cuanto hay reglas, volumen o varias personas.'},
    {t:'info', title:'ℹ️ DBMS: el software que manda', h:'La base de datos es la información; el <b>DBMS</b> (Database Management System) es el programa que la guarda y la protege: SQLite, MySQL, PostgreSQL, SQL Server u Oracle. Tú hablas con todos ellos en el MISMO idioma: <b>SQL</b> (Structured Query Language), creado en los años 70 en IBM y estándar ISO desde 1987.'},
    {t:'quiz', questions:[
      {type:'mc', q:'En una tabla relacional, ¿qué es una «fila»?', options:['Una columna con encabezado','Un registro completo: un libro, un cliente','El programa que guarda los datos','Una consulta guardada'], correct:1, pts:10, explain:'Cada fila es un registro: una unidad completa de la información.'},
      {type:'mc', q:'¿Cuál es la diferencia entre la base de datos y el DBMS?', options:['Son lo mismo con dos nombres','La base es la información; el DBMS es el software que la administra','El DBMS es la hardware y la base el software','La base es para leer y el DBMS para borrar'], correct:1, pts:10, explain:'Información vs. programa que la administra: SQLite/MySQL/PostgreSQL son DBMS.'},
      {type:'tf', q:'Una hoja de Excel es siempre mejor opción que una base de datos.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Excel brilla para listas personales; con reglas de integridad, volumen o usuarios concurrentes, gana la base de datos.'},
      {type:'mc', q:'¿Qué significa NULL en una columna?', options:['Cero','Texto vacío','Que el dato no se conoce o no aplica','Un error del sistema'], correct:2, pts:10, explain:'NULL es «ausencia de dato»: distinto de 0 y de cadena vacía. Le dedicaremos una lección completa.'},
      {type:'mc', q:'Una venta guarda <code>cliente_id</code> que apunta a <code>clientes.id</code>. Esa columna es…', options:['Una llave primaria','Una llave foránea','Un índice','Una vista'], correct:1, pts:10, explain:'Es llave foránea: referencia la llave primaria de otra tabla. Así se conectan los datos.'}
    ]}
  ]},

  /* -------- 0-2 -------- */
  { id:'0-2', title:'Los motores SQL y tu playground integrado', time:'12 min', blocks:[
    {t:'p', h:'Todos los motores hablan SQL, pero cada uno tiene su acento. En este curso practicas con <b>SQLite</b> (el motor del playground integrado: vive en cada celular del planeta) y cada lección señala las diferencias con MySQL, PostgreSQL y SQL Server para el mundo real.'},
    {t:'table', head:['Motor','Dónde brilla','Dato curioso'], rows:[
      ['<b>SQLite</b>','Apps móviles, navegadores, dispositivos embebidos','Es la base de datos más desplegada de la historia: está en tu teléfono ahora mismo.'],
      ['<b>MySQL</b>','Web clásica: WordPress, tiendas, paneles','Motor del LAMP; dueño actual: Oracle.'],
      ['<b>PostgreSQL</b>','Apps serias, datos geográficos, analítica','Open source, extremadamente riguroso con el estándar.'],
      ['<b>SQL Server</b>','Empresas Microsoft, banca, gobierno','Se administra con SSMS; dialecto T-SQL.']
    ]},
    {t:'p', h:'El <b>playground</b> de este curso (menú lateral → 🧪 Playground) trae precargada la base de la <b>Librería Esperanza</b>: autores, libros, clientes, ventas y proveedores. Escribe cualquier consulta, presiona <b>▶ Ejecutar</b> y verás la tabla de resultados. Tu texto se guarda en tu cuenta. Este curso entero se practica sobre esos datos.'},
    {t:'code', lang:'sql', title:'tu primera consulta — cópiala en el playground', code:`-- Todo comentario va así: el motor lo ignora
SELECT titulo, precio FROM libros;`},
    {t:'sqlex', title:'🧪 Calienta el playground', intro:'Cada tarea se califica ejecutando TU consulta sobre una copia fresca de la Librería Esperanza. Lo que importa es el RESULTADO (las filas), no el texto exacto.', tasks:[
      {q:'Muestra todas las columnas de la tabla <code>autores</code>.', hint:'El asterisco significa «todas las columnas».', check:{rows:9}, solution:'SELECT * FROM autores;', pts:25},
      {q:'Muestra solo <code>nombre</code> y <code>pais</code> de los autores.', hint:'Enumera las dos columnas separadas por coma.', check:{cols:['nombre','pais'], rows:9}, solution:'SELECT nombre, pais FROM autores;', pts:25},
      {q:'Cuenta cuántos libros hay: <code>SELECT COUNT(*) FROM libros;</code>', hint:'Debe devolver una fila con el número 16.', check:{cols:[['COUNT(*)','count(*)']], rows:[[16]]}, solution:'SELECT COUNT(*) FROM libros;', pts:25},
      {q:'Prueba una consulta sin tabla: <code>SELECT 5 + 3;</code> (SQL también hace aritmética).', hint:'El resultado es una fila con el valor 8.', check:{rows:[[8]]}, solution:'SELECT 5 + 3;', pts:25}
    ]}
  ]}
]});

MODULES.push({
  id:'m1', emoji:'🔍', name:'Tus primeras consultas', color:'#38bdf8',
  desc:'SELECT, WHERE, ORDER BY, LIMIT, LIKE, IN, BETWEEN y el famoso NULL.',
  lessons:[

  /* -------- 1-1 -------- */
  { id:'1-1', title:'SELECT … FROM: elegir columnas de una tabla', time:'15 min', blocks:[
    {t:'p', h:'Toda consulta de lectura empieza con <b>SELECT</b> (qué columnas quiero) y <b>FROM</b> (de qué tabla). El orden de las palabras es FIJO: <code>SELECT … FROM …;</code> y cierra con punto y coma. Puedes pedir columnas en cualquier orden e incluso repetirlas; el resultado las muestra como las pidas.'},
    {t:'code', lang:'sql', title:'las tres formas de pedir columnas', code:`SELECT titulo FROM libros;              -- una sola columna
SELECT titulo, precio, stock FROM libros; -- varias, en el orden que pidas
SELECT * FROM libros;                    -- todas (útil para explorar)`},
    {t:'list', items:[
      '<b>Alias de columna:</b> <code>SELECT precio AS precio_mxn</code> renombra el encabezado del resultado (no cambia la tabla). El <code>AS</code> es opcional en la mayoría de motores, pero escríbelo: se lee mejor.',
      '<b>Texto y cálculo:</b> <code>SELECT titulo, precio * 1.16 AS con_iva</code> — SQL calcula columna a columna.',
      '<b>Explorar una tabla desconocida:</b> empieza con <code>SELECT * FROM tabla LIMIT 5;</code> para ver su forma sin volcarte miles de filas.'
    ]},
    {t:'warn', title:'⚠️ SELECT * en producción', h:'En el playground es perfecto para explorar. En código profesional pide las columnas que necesitas: el <code>*</code> transporta datos de más (ancho de banda, memoria) y tu código se rompe en silencio si alguien agrega una columna a la tabla.'},
    {t:'sqlex', title:'🧪 Practica SELECT', tasks:[
      {q:'Muestra <code>titulo</code> y <code>anio</code> de todos los libros.', check:{cols:['titulo','anio'], rows:16}, solution:'SELECT titulo, anio FROM libros;', pts:20},
      {q:'Muestra <code>nombre</code> de los clientes con el encabezado renombrado a <code>cliente</code> (usa AS).', check:{cols:[['cliente']], rows:8}, solution:'SELECT nombre AS cliente FROM clientes;', pts:20},
      {q:'Muestra <code>titulo</code> y el precio con un 10% de descuento, con alias <code>oferta</code>. Pista: <code>precio * 0.9</code>.', check:{cols:['titulo','oferta'], rows:16}, solution:'SELECT titulo, precio * 0.9 AS oferta FROM libros;', pts:30},
      {q:'Muestra TODO el contenido de la tabla <code>ventas</code>.', check:{rows:22}, solution:'SELECT * FROM ventas;', pts:15},
      {q:'¿Cuántas columnas tiene la tabla <code>libros</code>? Averígualo con <code>SELECT * FROM libros LIMIT 1;</code> y cuenta… luego responde aquí cuántas son (escribe el número).', hint:'id, titulo, autor_id, categoria, precio, stock, anio…', check:{rows:[[7]]}, solution:'SELECT 7;', pts:15}
    ]}
  ]},

  /* -------- 1-2 -------- */
  { id:'1-2', title:'WHERE: filtrar filas con condiciones', time:'15 min', blocks:[
    {t:'p', h:'<b>WHERE</b> filtra filas: solo pasan las que cumplen la condición. Los comparadores: <code>=</code> igual, <code>&lt;&gt;</code> o <code>!=</code> distinto, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>. Combina condiciones con <b>AND</b> (todas), <b>OR</b> (cualquiera) y <b>NOT</b> (niega); usa paréntesis para dejar claro el orden — como en matemáticas.'},
    {t:'code', lang:'sql', title:'WHERE en acción', code:`SELECT titulo, precio FROM libros WHERE precio > 300;

SELECT titulo FROM libros
WHERE categoria = 'Cuentos' AND precio < 200;

SELECT titulo FROM libros
WHERE (categoria = 'Novela' OR categoria = 'Cuentos') AND stock > 5;

SELECT titulo FROM libros WHERE NOT (anio < 1980);`},
    {t:'warn', title:'⚠️ Un solo = para comparar', h:'SQL usa UN signo igual para comparar (<code>precio = 200</code>), no doble igual como JavaScript. Y los textos van SIEMPRE entre comillas simples: <code>WHERE ciudad = \'Mérida\'</code> — las comillas dobles quedan para identificadores en algunos motores.'},
    {t:'sqlex', title:'🧪 Practica WHERE', tasks:[
      {q:'Los libros con precio mayor a 300: muestra <code>titulo</code> y <code>precio</code>.', check:{rows:[['Rayuela',340],['Cien años de soledad',320.5],['La casa de los espíritus',310]]}, solution:'SELECT titulo, precio FROM libros WHERE precio > 300 ORDER BY titulo;', pts:20},
      {q:'Los clientes de «Ciudad de México»: muestra su <code>nombre</code>.', check:{rows:[['Ana Torres'],['Carlos Sánchez']]}, solution:'SELECT nombre FROM clientes WHERE ciudad = \'Ciudad de México\' ORDER BY nombre;', pts:20},
      {q:'Libros de categoría «Novela» con stock mayor a 5: <code>titulo</code> y <code>stock</code>.', check:{rows:[['La ciudad y los perros',10],['La hora de la estrella',14],['Rayuela',6]]}, solution:'SELECT titulo, stock FROM libros WHERE categoria = \'Novela\' AND stock > 5 ORDER BY titulo;', pts:20},
      {q:'Ventas con total entre 300 y 500 inclusive: <code>id</code> y <code>total</code>. Pista: AND con dos comparaciones.', check:{rows:10}, solution:'SELECT id, total FROM ventas WHERE total >= 300 AND total <= 500 ORDER BY id;', pts:20},
      {q:'Autores que NO sean de Argentina: <code>nombre</code> y <code>pais</code>.', check:{rows:6}, solution:'SELECT nombre, pais FROM autores WHERE pais <> \'Argentina\' ORDER BY nombre;', pts:20}
    ]}
  ]},

  /* -------- 1-3 -------- */
  { id:'1-3', title:'ORDER BY, LIMIT y DISTINCT: ordenar, recortar, uniqüizar', time:'15 min', blocks:[
    {t:'p', h:'<b>ORDER BY</b> ordena el resultado: <code>ASC</code> ascendente (el default) o <code>DESC</code> descendente. Puedes ordenar por varias columnas: <code>ORDER BY categoria ASC, precio DESC</code> — agrupa por categoría y dentro de cada una deja el más caro primero. <b>LIMIT n</b> recorta el resultado a n filas (con <code>OFFSET m</code> salta las primeras m: la base de la paginación).'},
    {t:'code', lang:'sql', title:'el top N clásico', code:`-- los 3 libros más caros
SELECT titulo, precio FROM libros ORDER BY precio DESC LIMIT 3;

-- paginación: "página 3" de 10 en 10
SELECT titulo FROM libros ORDER BY titulo LIMIT 10 OFFSET 20;

-- ordenar por posición de columna (1 = la primera del SELECT)
SELECT titulo, precio FROM libros ORDER BY 2 DESC LIMIT 2;`},
    {t:'p', h:'<b>DISTINCT</b> elimina filas duplicadas del resultado: <code>SELECT DISTINCT categoria FROM libros</code> da el catálogo de categorías sin repetir. Ojo: DISTINCT considera TODA la fila; <code>SELECT DISTINCT ciudad, pais</code> solo quita pares ciudad+pais repetidos.'},
    {t:'sqlex', title:'🧪 Practica orden y recorte', tasks:[
      {q:'Los 5 libros más baratos: <code>titulo</code> y <code>precio</code>, del más barato al más caro.', check:{rows:[['Antología poética',150],['La hora de la estrella',165],['El túnel',175],['Bestiario',180],['Hasta no verte Jesús mío',190]]}, solution:'SELECT titulo, precio FROM libros ORDER BY precio ASC LIMIT 5;', pts:25},
      {q:'Las categorías de libros SIN repetir, alfabéticamente.', check:{rows:[['Cuentos'],['Memorias'],['Novela'],['Poesía'],['Realismo mágico'],['Romance']]}, solution:'SELECT DISTINCT categoria FROM libros ORDER BY categoria;', pts:25},
      {q:'La venta con el total más alto: <code>id</code> y <code>total</code> (una sola fila).', check:{rows:[[12,641]]}, solution:'SELECT id, total FROM ventas ORDER BY total DESC LIMIT 1;', pts:25},
      {q:'Clientes ordenados por ciudad (A→Z) y dentro de cada ciudad por nombre (Z→A). Muestra <code>ciudad</code> y <code>nombre</code>.', check:{rows:8, orderInsensitive:false}, solution:'SELECT ciudad, nombre FROM clientes ORDER BY ciudad ASC, nombre DESC;', pts:25}
    ]}
  ]},

  /* -------- 1-4 -------- */
  { id:'1-4', title:'LIKE, IN y BETWEEN: filtrar por patrones y rangos', time:'15 min', blocks:[
    {t:'p', h:'<b>LIKE</b> compara contra un patrón: <code>%</code> reemplaza CUALQUIER cadena (inclusive vacía) y <code>_</code> reemplaza UN carácter exacto. <code>\'La %\'</code> = empieza con «La »; <code>\'%de%\'</code> = contiene «de»; <code>\'_l %\'</code> = segunda letra «l». <b>IN</b> compara contra una lista de valores: <code>ciudad IN (\'Mérida\',\'Puebla\')</code> equivale a dos OR pero se lee mejor y escala. <b>BETWEEN a AND b</b> = rango inclusivo de números o fechas.'},
    {t:'code', lang:'sql', title:'patrones que usarás siempre', code:`SELECT titulo FROM libros WHERE titulo LIKE 'La %';      -- empieza con "La "
SELECT titulo FROM libros WHERE titulo LIKE '%de%';      -- contiene "de"
SELECT email  FROM clientes WHERE email LIKE '%@mail.com';
SELECT titulo FROM libros WHERE anio BETWEEN 1940 AND 1950;
SELECT titulo FROM libros WHERE categoria IN ('Cuentos', 'Poesía');`},
    {t:'info', title:'ℹ️ LIKE distingue mayúsculas… según el motor', h:'En SQLite y MySQL (colación por defecto), LIKE NO distingue mayúsculas/minúsculas para letras ASCII. En PostgreSQL sí distingue (usa <code>ILIKE</code> para ignorarlas) y en SQL Server depende de la «collation» de la columna. En caso de duda, normaliza: <code>WHERE UPPER(titulo) LIKE \'LA%\'</code>.'},
    {t:'sqlex', title:'🧪 Practica patrones y rangos', tasks:[
      {q:'Los libros cuyo título EMPIEZA con «El »: muestra <code>titulo</code>.', check:{rows:[['El amor en los tiempos del cólera'],['El Aleph'],['El túnel']]}, solution:'SELECT titulo FROM libros WHERE titulo LIKE \'El %\' ORDER BY titulo;', pts:20},
      {q:'Los clientes cuyo email termina en <code>.com</code>: muestra <code>email</code> sin repetir.', check:{rows:5}, solution:'SELECT DISTINCT email FROM clientes WHERE email LIKE \'%.com\' ORDER BY email;', pts:20},
      {q:'Libros publicados entre 1960 y 1979 (inclusive): <code>titulo</code> y <code>anio</code> ordenados por año.', check:{rows:6, orderInsensitive:false}, solution:'SELECT titulo, anio FROM libros WHERE anio BETWEEN 1960 AND 1979 ORDER BY anio;', pts:20},
      {q:'Ventas de los libros 1, 3 y 7: <code>id</code>, <code>libro_id</code> y <code>total</code>. Usa IN.', check:{rows:7}, solution:'SELECT id, libro_id, total FROM ventas WHERE libro_id IN (1, 3, 7) ORDER BY id;', pts:20},
      {q:'Clientes de Guadalajara O Monterrey cuyo nombre empiece con «L» o «S»: <code>nombre</code> y <code>ciudad</code>.', check:{rows:[['Luis Ramírez','Guadalajara'],['Sofía Castro','Guadalajara']]}, solution:'SELECT nombre, ciudad FROM clientes WHERE (ciudad = \'Guadalajara\' OR ciudad = \'Monterrey\') AND (nombre LIKE \'L%\' OR nombre LIKE \'S%\') ORDER BY nombre;', pts:20}
    ]}
  ]},

  /* -------- 1-5 -------- */
  { id:'1-5', title:'NULL: el valor que no existe', time:'15 min', blocks:[
    {t:'p', h:'<b>NULL</b> significa «aquí no hay dato»: no es cero, no es cadena vacía, es AUSENCIA. Y tiene una regla que rompe cabezas: <b>cualquier comparación con NULL da NULL</b> (ni verdadero ni falso). Por eso <code>WHERE email = NULL</code> devuelve CERO filas siempre, y <code>NULL = NULL</code> tampoco es verdadero. Para preguntar por NULL existen operadores propios: <b>IS NULL</b> y <b>IS NOT NULL</b>.'},
    {t:'code', lang:'sql', title:'la forma correcta (y la trampa)', code:`SELECT nombre FROM clientes WHERE email IS NULL;      -- ✅ sin email
SELECT nombre FROM clientes WHERE email = NULL;       -- ❌ 0 filas SIEMPRE
SELECT COUNT(*) FROM ventas WHERE cliente_id IS NULL; -- ventas de mostrador

-- COALESCE da un valor cuando hay NULL (lección 2-3)
SELECT nombre, COALESCE(email, 'sin email') FROM clientes;`},
    {t:'info', title:'ℹ️ ¿Por qué tantas reglas raras?', h:'NULL representa LO DESCONOCIDO. ¿Es el email desconocido igual al email desconocido de otro cliente? Filosóficamente no lo sabes — por eso SQL dice que las comparaciones con desconocidos son «desconocidas» (NULL). Funciona igual en TODOS los motores serios: es parte del estándar.'},
    {t:'sqlex', title:'🧪 Practica NULL', tasks:[
      {q:'Clientes SIN email: <code>nombre</code> y <code>ciudad</code>.', check:{rows:[['María Fernanda López','Monterrey'],['Lucía Herrera','Mérida'],['Pedro Álvarez','Monterrey']]}, solution:'SELECT nombre, ciudad FROM clientes WHERE email IS NULL ORDER BY nombre;', pts:25},
      {q:'Cuántas ventas fueron «de mostrador» (sin cliente registrado): usa COUNT con IS NULL.', check:{cols:[['COUNT(*)','count(*)']], rows:[[4]]}, solution:'SELECT COUNT(*) FROM ventas WHERE cliente_id IS NULL;', pts:25},
      {q:'Libros CON año de publicación conocido y stock igual a 0: <code>titulo</code>.', check:{rows:[['El Aleph']]}, solution:'SELECT titulo FROM libros WHERE anio IS NOT NULL AND stock = 0;', pts:25},
      {q:'Ventas CON cliente registrado cuyo total fue menor a 250: <code>id</code> y <code>total</code>.', check:{rows:[[3,225],[11,175],[13,190],[16,210],[21,165]]}, solution:'SELECT id, total FROM ventas WHERE cliente_id IS NOT NULL AND total < 250 ORDER BY id;', pts:25}
    ]}
  ]}
]});

MODULES.push({
  id:'m2', emoji:'🧪', name:'Transformar y enriquecer', color:'#a78bfa',
  desc:'Funciones de texto, números, fechas, limpieza de nulos y lógica condicional con CASE.',
  lessons:[

  /* -------- 2-1 -------- */
  { id:'2-1', title:'Funciones de texto: UPPER, LOWER, LENGTH, SUBSTR, TRIM', time:'15 min', blocks:[
    {t:'p', h:'SQL trae una caja de herramientas para transformar texto <b>dentro de la consulta</b> — sin tocar los datos originales. <code>UPPER(x)</code> mayúsculas, <code>LOWER(x)</code> minúsculas, <code>LENGTH(x)</code> longitud, <code>TRIM(x)</code> quita espacios de los extremos, <code>SUBSTR(x, inicio, cuántos)</code> corta un pedazo (¡cuenta desde 1!), <code>REPLACE(x, busca, cambia)</code> sustituye, y <code>||</code> concatena (pega) textos.'},
    {t:'code', lang:'sql', title:'texto en acción', code:`SELECT UPPER(nombre) FROM clientes;                    -- ANA TORRES
SELECT LOWER(email) FROM clientes WHERE email IS NOT NULL;
SELECT titulo, LENGTH(titulo) AS letras FROM libros;
SELECT SUBSTR(fecha, 1, 7) AS mes FROM ventas;         -- '2025-03'
SELECT nombre || ' (' || ciudad || ')' AS etiqueta FROM clientes;`},
    {t:'info', title:'ℹ️ Diferencias entre motores', h:'<code>||</code> es el estándar y funciona en SQLite/PostgreSQL/Oracle; MySQL (sin configurar) usa <code>CONCAT(a, b)</code>; SQL Server usa <code>+</code> o <code>CONCAT</code>. <code>SUBSTR</code> se llama <code>SUBSTRING</code> en varios motores. La idea es la misma en todos: transformar texto en la consulta.'},
    {t:'sqlex', title:'🧪 Practica funciones de texto', tasks:[
      {q:'Los nombres de los autores EN MAYÚSCULAS, con alias <code>autor</code>.', check:{cols:['autor'], rows:9}, solution:'SELECT UPPER(nombre) AS autor FROM autores ORDER BY nombre;', pts:20},
      {q:'El MES de cada venta (2 caracteres, ejemplo «03»): usa SUBSTR sobre <code>fecha</code>, sin repetir meses, ordenados.', check:{rows:[['01'],['02'],['03'],['04'],['05']]}, solution:'SELECT DISTINCT SUBSTR(fecha, 6, 2) FROM ventas ORDER BY 1;', pts:30},
      {q:'Longitud del título de cada libro: <code>titulo</code> y <code>LENGTH(titulo)</code> como <code>letras</code>, solo los de 20+ letras.', hint:'WHERE con la función directamente: WHERE LENGTH(titulo) >= 20', check:{rows:8}, solution:'SELECT titulo, LENGTH(titulo) AS letras FROM libros WHERE LENGTH(titulo) >= 20 ORDER BY titulo;', pts:25},
      {q:'Etiqueta de cliente: <code>nombre || \' — \' || ciudad</code> con alias <code>etiqueta</code>, solo para clientes CON email.', check:{rows:5}, solution:'SELECT nombre || \' — \' || ciudad AS etiqueta FROM clientes WHERE email IS NOT NULL ORDER BY etiqueta;', pts:25}
    ]}
  ]},

  /* -------- 2-2 -------- */
  { id:'2-2', title:'Números, redondeo y fechas', time:'15 min', blocks:[
    {t:'p', h:'Para números: <code>ROUND(x, decimales)</code> redondea, <code>ABS(x)</code> valor absoluto, y la aritmética de siempre (<code>+ - * /</code>). Cuidado con la división entera: en algunos motores <code>7/2</code> da <code>3</code> (SQLite con enteros trunca; con decimales, no). Si dudas, fuerza decimales: <code>7 * 1.0 / 2</code>.'},
    {t:'p', h:'Las fechas en este curso (y en SQLite) se guardan como texto <b>\'YYYY-MM-DD\'</b> — y ese formato es un superpoder: el orden alfabético ES el orden cronológico, y <code>SUBSTR(fecha, 1, 7)</code> te da el mes «gratis». SQLite además trae <code>strftime(\'%Y\', fecha)</code> para extraer partes; MySQL usa <code>YEAR(fecha)</code>, <code>MONTH(fecha)</code>; SQL Server <code>YEAR()</code>/<code>FORMAT()</code>.'},
    {t:'code', lang:'sql', title:'redondeo y fechas', code:`SELECT ROUND(AVG(precio), 2) FROM libros;             -- 236.63
SELECT titulo, ROUND(precio * 1.16, 2) AS con_iva FROM libros;

SELECT strftime('%Y', fecha) AS anio FROM ventas;     -- 2025
SELECT SUBSTR(fecha, 1, 7) AS mes FROM ventas;        -- 2025-03

SELECT titulo FROM libros WHERE anio >= 1980;         -- fechas/años se comparan normal`},
    {t:'sqlex', title:'🧪 Practica números y fechas', tasks:[
      {q:'Precio con IVA (16%) de cada libro, REDONDEADO a 2 decimales: <code>titulo</code> y <code>con_iva</code>.', check:{cols:['titulo','con_iva'], rows:16}, solution:'SELECT titulo, ROUND(precio * 1.16, 2) AS con_iva FROM libros ORDER BY titulo;', pts:25},
      {q:'Ventas del primer trimestre (enero a marzo de 2025): <code>id</code> y <code>fecha</code>. Pista: las fechas ISO se comparan como texto.', check:{rows:15}, solution:'SELECT id, fecha FROM ventas WHERE fecha BETWEEN \'2025-01-01\' AND \'2025-03-31\' ORDER BY id;', pts:25},
      {q:'El año de cada venta con strftime: <code>strftime(\'%Y\', fecha)</code> como <code>anio</code>, sin repetir.', check:{cols:['anio'], rows:[[2025]]}, solution:'SELECT DISTINCT strftime(\'%Y\', fecha) AS anio FROM ventas;', pts:25},
      {q:'Cuánto valdría reponer TODO el stock al precio actual: <code>ROUND(SUM(precio * stock), 2)</code> con alias <code>repo</code>.', hint:'SUM del producto precio*stock, redondeado a 2 decimales.', check:{cols:[['repo']], rows:[[27086]]}, solution:'SELECT ROUND(SUM(precio * stock), 2) AS repo FROM libros;', pts:25}
    ]}
  ]},

  /* -------- 2-3 -------- */
  { id:'2-3', title:'COALESCE, IFNULL y NULLIF: domar los nulos', time:'15 min', blocks:[
    {t:'p', h:'Tres funciones para que los NULL no arruinen tus reportes: <b>COALESCE(a, b, c…)</b> devuelve el PRIMER valor que no sea NULL (acepta varios argumentos, es estándar ISO); <b>IFNULL(a, b)</b> es la versión de 2 argumentos de SQLite/MySQL; <b>NULLIF(a, b)</b> devuelve NULL si a y b son iguales (útil para evitar divisiones entre cero: <code>total / NULLIF(cantidad, 0)</code>).'},
    {t:'code', lang:'sql', title:'reportes sin agujeros', code:`SELECT nombre, COALESCE(email, 'sin email') AS contacto FROM clientes;

-- el email o, en su defecto, la ciudad como contacto alterno
SELECT nombre, COALESCE(email, ciudad) AS contacto FROM clientes;

-- precio con etiqueta cuando falta
SELECT titulo, COALESCE(precio, 0) AS precio FROM libros;`},
    {t:'sqlex', title:'🧪 Practica limpieza de nulos', tasks:[
      {q:'<code>nombre</code> y el email de cada cliente, mostrando <code>\'sin email\'</code> cuando falte (alias <code>contacto</code>).', check:{cols:['nombre','contacto'], rows:8}, solution:'SELECT nombre, COALESCE(email, \'sin email\') AS contacto FROM clientes ORDER BY nombre;', pts:25},
      {q:'Ventas de mostrador etiquetadas: <code>id</code> y <code>COALESCE(cliente_id, 0)</code> como <code>cliente</code>, solo las que NO tienen cliente.', check:{cols:['id','cliente'], rows:[[4,0],[8,0],[14,0],[19,0]]}, solution:'SELECT id, COALESCE(cliente_id, 0) AS cliente FROM ventas WHERE cliente_id IS NULL ORDER BY id;', pts:25},
      {q:'Contacto alterno: el email del cliente o, si no tiene, su ciudad (alias <code>contacto</code>), ordenado por contacto.', check:{rows:8, orderInsensitive:false}, solution:'SELECT nombre, COALESCE(email, ciudad) AS contacto FROM clientes ORDER BY contacto;', pts:25},
      {q:'Precio del libro 16 («Antología poética», sin año) mostrando <code>COALESCE(anio, 0)</code> como <code>anio</code>. Debe dar 0.', check:{cols:['anio'], rows:[[0]]}, solution:'SELECT COALESCE(anio, 0) AS anio FROM libros WHERE id = 16;', pts:25}
    ]}
  ]},

  /* -------- 2-4 -------- */
  { id:'2-4', title:'CASE WHEN: lógica condicional en la consulta', time:'15 min', blocks:[
    {t:'p', h:'<b>CASE</b> es el «if» de SQL: crea valores según condiciones, fila por fila. Dos formas: con condiciones (<code>CASE WHEN condición THEN resultado … ELSE otro END</code>) o comparando un valor contra opciones (<code>CASE estatus WHEN \'A\' THEN \'Activo\' END</code>). SIEMPRE cierra con <b>END</b> y conviene ponerle alias al resultado.'},
    {t:'code', lang:'sql', title:'etiquetas y categorías al vuelo', code:`SELECT titulo, precio,
  CASE
    WHEN precio < 200 THEN 'económico'
    WHEN precio < 300 THEN 'medio'
    ELSE 'premium'
  END AS rango
FROM libros;

SELECT nombre,
  CASE WHEN email IS NULL THEN 'capturar email' ELSE 'ok' END AS pendiente
FROM clientes;`},
    {t:'sqlex', title:'🧪 Practica CASE', tasks:[
      {q:'<code>titulo</code> y rango de precio: <code>\'económico\'</code> si cuesta menos de 200, <code>\'medio\'</code> si menos de 300, y <code>\'premium\'</code> el resto (alias <code>rango</code>).', check:{cols:['titulo','rango'], rows:16}, solution:'SELECT titulo, CASE WHEN precio < 200 THEN \'económico\' WHEN precio < 300 THEN \'medio\' ELSE \'premium\' END AS rango FROM libros ORDER BY titulo;', pts:25},
      {q:'Clientes con su estado de contacto: <code>\'ok\'</code> si tienen email y <code>\'capturar\'</code> si no (alias <code>estado</code>).', check:{cols:['nombre','estado'], rows:8}, solution:'SELECT nombre, CASE WHEN email IS NULL THEN \'capturar\' ELSE \'ok\' END AS estado FROM clientes ORDER BY nombre;', pts:25},
      {q:'Ventas de marzo etiquetadas: <code>id</code> y <code>\'mostrador\'</code> si no hay cliente o <code>\'cliente\'</code> si hay (alias <code>canal</code>).', check:{rows:[[10,'cliente'],[11,'cliente'],[12,'cliente'],[13,'cliente'],[14,'mostrador'],[15,'cliente']]}, solution:'SELECT id, CASE WHEN cliente_id IS NULL THEN \'mostrador\' ELSE \'cliente\' END AS canal FROM ventas WHERE fecha LIKE \'2025-03%\' ORDER BY id;', pts:25},
      {q:'Semáforo de stock: <code>titulo</code> y <code>\'agotado\'</code> si stock = 0, <code>\'bajo\'</code> si es 5 o menos, <code>\'ok\'</code> el resto (alias <code>sem</code>).', check:{cols:['titulo','sem'], rows:16}, solution:'SELECT titulo, CASE WHEN stock = 0 THEN \'agotado\' WHEN stock <= 5 THEN \'bajo\' ELSE \'ok\' END AS sem FROM libros ORDER BY titulo;', pts:25}
    ]}
  ]}
]});

MODULES.push({
  id:'m3', emoji:'📊', name:'Agregación: contar y resumir', color:'#34d399',
  desc:'COUNT, SUM, AVG, MIN, MAX, GROUP BY y HAVING: de miles de filas a un reporte.',
  lessons:[

  /* -------- 3-1 -------- */
  { id:'3-1', title:'Los cinco agregados: COUNT, SUM, AVG, MIN, MAX', time:'15 min', blocks:[
    {t:'p', h:'Un <b>agregado</b> colapsa muchas filas en UN valor. Los cinco que usas el 95% del tiempo: <code>COUNT(*)</code> cuenta filas, <code>COUNT(col)</code> cuenta filas donde col NO es NULL, <code>SUM(col)</code> suma, <code>AVG(col)</code> promedia (ignorando NULLs), <code>MIN</code>/<code>MAX</code> extremos (funcionan también con texto y fechas).'},
    {t:'code', lang:'sql', title:'el pulso del negocio en una consulta', code:`SELECT COUNT(*)    AS ventas,
       SUM(total)    AS ingreso,
       AVG(total)    AS ticket_promedio,
       MIN(total)    AS venta_menor,
       MAX(total)    AS venta_mayor
FROM ventas;`},
    {t:'warn', title:'⚠️ COUNT(*) vs COUNT(col)', h:'<code>COUNT(*)</code> cuenta TODAS las filas. <code>COUNT(cliente_id)</code> solo cuenta las que tienen cliente (los NULL no cuentan). En nuestra tabla: COUNT(*) = 22 ventas, COUNT(cliente_id) = 18 con cliente. La diferencia ES información: son las 4 ventas de mostrador.'},
    {t:'sqlex', title:'🧪 Practica agregados', tasks:[
      {q:'KPIs del catálogo en una fila: <code>COUNT(*)</code> como <code>libros</code>, <code>ROUND(AVG(precio),2)</code> como <code>precio_medio</code>, <code>MIN(precio)</code> como <code>minimo</code> y <code>MAX(precio)</code> como <code>maximo</code>.', check:{cols:[['COUNT(*)','libros'],'precio_medio','minimo','maximo'], rows:[[16,236.63,150,340]]}, solution:'SELECT COUNT(*) AS libros, ROUND(AVG(precio),2) AS precio_medio, MIN(precio) AS minimo, MAX(precio) AS maximo FROM libros;', pts:25},
      {q:'Ingreso total del año: <code>ROUND(SUM(total),2)</code> como <code>ingreso</code> de todas las ventas.', check:{cols:[['ingreso']], rows:[[7357.5]]}, solution:'SELECT ROUND(SUM(total), 2) AS ingreso FROM ventas;', pts:25},
      {q:'¿Cuántas ventas tienen cliente registrado? Usa COUNT de la columna (no *).', check:{cols:[['COUNT(cliente_id)','count(cliente_id)']], rows:[[18]]}, solution:'SELECT COUNT(cliente_id) FROM ventas;', pts:25},
      {q:'La venta más pequeña y la más grande: <code>MIN(total)</code> como <code>menor</code> y <code>MAX(total)</code> como <code>mayor</code> en una fila.', check:{cols:[['min','menor'],['max','mayor']], rows:[[165,641]]}, solution:'SELECT MIN(total) AS menor, MAX(total) AS mayor FROM ventas;', pts:25}
    ]}
  ]},

  /* -------- 3-2 -------- */
  { id:'3-2', title:'GROUP BY: resumir por grupos', time:'15 min', blocks:[
    {t:'p', h:'<b>GROUP BY</b> parte las filas en grupos y aplica los agregados <b>por grupo</b>: <code>SELECT categoria, COUNT(*) FROM libros GROUP BY categoria</code> da una fila por categoría con su número de libros. La columna que agrupa va en el SELECT tal cual; las demás columnas solo pueden aparecer DENTRO de un agregado — si pides una columna suelta que no agrupa, el resultado no tiene sentido (MySQL viejo lo permitía y era fuente de bugs legendarios).'},
    {t:'code', lang:'sql', title:'reportes agrupados', code:`SELECT categoria, COUNT(*) AS titulos, ROUND(AVG(precio),2) AS precio_medio
FROM libros
GROUP BY categoria;

-- ingresos por mes (SUBSTR crea el grupo)
SELECT SUBSTR(fecha, 1, 7) AS mes, SUM(total) AS ingreso
FROM ventas
GROUP BY mes
ORDER BY mes;`},
    {t:'info', title:'ℹ️ Agrupar por alias', h:'SQLite y MySQL permiten <code>GROUP BY mes</code> usando el alias definido en el SELECT. El estándar SQL solo permite columnas o expresiones (<code>GROUP BY SUBSTR(fecha,1,7)</code>). PostgreSQL es estricto: usa la expresión completa. En el playground ambos funcionan.'},
    {t:'sqlex', title:'🧪 Practica GROUP BY', tasks:[
      {q:'Cuántos libros hay por categoría: <code>categoria</code> y <code>COUNT(*)</code> como <code>titulos</code>, ordenado por titulos descendente.', check:{rows:[['Novela',7],['Cuentos',3],['Realismo mágico',2],['Romance',2],['Memorias',1],['Poesía',1]]}, solution:'SELECT categoria, COUNT(*) AS titulos FROM libros GROUP BY categoria ORDER BY titulos DESC, categoria;', pts:25},
      {q:'Autores por país: <code>pais</code> y cuántos autores (alias <code>cuantos</code>), orden alfabético por país.', check:{rows:[['Argentina',3],['Brasil',1],['Colombia',1],['Chile',1],['México',2],['Perú',1]]}, solution:'SELECT pais, COUNT(*) AS cuantos FROM autores GROUP BY pais ORDER BY pais;', pts:25},
      {q:'Ingreso por mes de 2025: <code>SUBSTR(fecha,6,2)</code> como <code>mes</code> y <code>ROUND(SUM(total),2)</code> como <code>ingreso</code>, ordenado por mes.', check:{rows:[['01',1161],['02',2030],['03',2076],['04',1605],['05',485.5]]}, solution:'SELECT SUBSTR(fecha,6,2) AS mes, ROUND(SUM(total),2) AS ingreso FROM ventas GROUP BY mes ORDER BY mes;', pts:25},
      {q:'Cuántas compras hizo cada cliente: <code>cliente_id</code> y <code>COUNT(*)</code> como <code>compras</code>, solo ventas con cliente, del mayor al menor número de compras.', check:{rows:[[1,3],[2,3],[3,3],[4,2],[5,2],[6,2],[7,2],[8,1]]}, solution:'SELECT cliente_id, COUNT(*) AS compras FROM ventas WHERE cliente_id IS NOT NULL GROUP BY cliente_id ORDER BY compras DESC, cliente_id;', pts:25}
    ]}
  ]},

  /* -------- 3-3 -------- */
  { id:'3-3', title:'HAVING: filtrar grupos (no filas)', time:'15 min', blocks:[
    {t:'p', h:'<b>WHERE</b> filtra FILAS antes de agrupar; <b>HAVING</b> filtra GRUPOS después de agregar. ¿Qué categorías tienen más de 2 libros? ¿Qué clientes compraron más de 2 veces? Eso es HAVING, porque la condición usa un agregado que solo existe tras agrupar. Regla mnemotécnica: <b>WHERE es antes del horno, HAVING es después de cocinar</b>.'},
    {t:'code', lang:'sql', title:'WHERE + GROUP BY + HAVING juntos', code:`SELECT cliente_id, COUNT(*) AS compras, SUM(total) AS gastado
FROM ventas
WHERE cliente_id IS NOT NULL     -- filtra FILAS (antes de agrupar)
GROUP BY cliente_id
HAVING COUNT(*) >= 3             -- filtra GRUPOS (después de agregar)
ORDER BY gastado DESC;`},
    {t:'sqlex', title:'🧪 Practica HAVING', tasks:[
      {q:'Categorías con más de 2 libros: <code>categoria</code> y <code>COUNT(*)</code> como <code>titulos</code>.', check:{rows:[['Novela',7],['Cuentos',3]]}, solution:'SELECT categoria, COUNT(*) AS titulos FROM libros GROUP BY categoria HAVING COUNT(*) > 2 ORDER BY titulos DESC;', pts:25},
      {q:'Clientes con 3 o más compras: <code>cliente_id</code> y <code>COUNT(*)</code> como <code>compras</code> (ignora ventas sin cliente).', check:{rows:[[1,3],[2,3],[3,3]]}, solution:'SELECT cliente_id, COUNT(*) AS compras FROM ventas WHERE cliente_id IS NOT NULL GROUP BY cliente_id HAVING COUNT(*) >= 3 ORDER BY cliente_id;', pts:25},
      {q:'Países con más de un autor: <code>pais</code> y cuántos (alias <code>cuantos</code>).', check:{rows:[['Argentina',3],['México',2]]}, solution:'SELECT pais, COUNT(*) AS cuantos FROM autores GROUP BY pais HAVING COUNT(*) > 1 ORDER BY cuantos DESC, pais;', pts:25},
      {q:'Meses cuyo ingreso superó 2000: <code>SUBSTR(fecha,6,2)</code> como <code>mes</code> y <code>ROUND(SUM(total),2)</code> como <code>ingreso</code>.', check:{rows:[['02',2030],['03',2076]]}, solution:'SELECT SUBSTR(fecha,6,2) AS mes, ROUND(SUM(total),2) AS ingreso FROM ventas GROUP BY mes HAVING SUM(total) > 2000 ORDER BY mes;', pts:25}
    ]},
    {t:'srs', deck:'sqlcore', sub:'Fija los conceptos de agregación (COUNT vs GROUP BY vs HAVING) con repetición espaciada.'}
  ]},

  /* -------- 3-4 -------- */
  { id:'3-4', title:'El orden completo de una consulta', time:'15 min', blocks:[
    {t:'p', h:'Ya conoces todas las piezas de lectura. Este es su orden ESCRITO (fijo) y su orden de EJECUCIÓN lógico (lo que el motor hace por dentro). Memorizarlo explica por qué un alias del SELECT sirve en ORDER BY pero el WHERE no lo ve aún, y por qué HAVING va después de GROUP BY.'},
    {t:'table', head:['Se escribe','Ejecución lógica','Para qué'], rows:[
      ['1. <code>SELECT …</code>','5. calcula columnas','qué columnas mostrar (aquí nacen los alias)'],
      ['2. <code>FROM / JOIN</code>','1. fuente de filas','de dónde salen los datos'],
      ['3. <code>WHERE</code>','2. filtra filas','condiciones por fila'],
      ['4. <code>GROUP BY</code>','3. agrupa','bolsas de filas'],
      ['5. <code>HAVING</code>','4. filtra grupos','condiciones con agregados'],
      ['6. <code>ORDER BY</code>','6. ordena','usa columnas y alias ya calculados'],
      ['7. <code>LIMIT</code>','7. recorta','las primeras n filas']
    ]},
    {t:'code', lang:'sql', title:'la consulta completa del curso', code:`SELECT SUBSTR(fecha, 6, 2)          AS mes,
       COUNT(*)                     AS ventas,
       ROUND(SUM(total), 2)         AS ingreso
FROM ventas
WHERE cliente_id IS NOT NULL
GROUP BY mes
HAVING COUNT(*) >= 4
ORDER BY ingreso DESC
LIMIT 5;`},
    {t:'sqlex', title:'🧪 Integradora: el reporte completo', tasks:[
      {q:'Ejecuta la consulta completa de la teoría y comprueba que corre. Luego edítala para que el HAVING sea <code>COUNT(*) >= 3</code>. Reporte: mes, ventas e ingreso de meses con 3+ ventas CON cliente, ordenado por ingreso descendente.', check:{rows:[['03',5,1826],['02',4,1535],['04',4,1310],['01',3,965.5]]}, solution:'SELECT SUBSTR(fecha,6,2) AS mes, COUNT(*) AS ventas, ROUND(SUM(total),2) AS ingreso FROM ventas WHERE cliente_id IS NOT NULL GROUP BY mes HAVING COUNT(*) >= 3 ORDER BY ingreso DESC;', pts:34},
      {q:'Top 2 de categorías por precio promedio: <code>categoria</code> y <code>ROUND(AVG(precio),2)</code> como <code>promedio</code>, ordenadas por promedio descendente, solo las 2 primeras.', check:{rows:[['Realismo mágico',315.25],['Romance',252.5]]}, solution:'SELECT categoria, ROUND(AVG(precio),2) AS promedio FROM libros GROUP BY categoria ORDER BY promedio DESC LIMIT 2;', pts:33},
      {q:'Reporte de stock: <code>categoria</code>, <code>SUM(stock)</code> como <code>piezas</code>, solo categorías con stock total mayor a 10, ordenadas por piezas descendente.', check:{rows:[['Novela',44],['Cuentos',26],['Realismo mágico',21],['Romance',15]]}, solution:'SELECT categoria, SUM(stock) AS piezas FROM libros GROUP BY categoria HAVING SUM(stock) > 10 ORDER BY piezas DESC;', pts:33}
    ]}
  ]}
]});
