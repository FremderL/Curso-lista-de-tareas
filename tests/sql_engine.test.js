// Pruebas intensivas del mini-motor SQL
const SQLE = require('/home/user/sql_parts/sql_engine.js');
const freshDb = require('/home/user/sql_parts/db.js');
let pass=0, fail=0;
function cat(){ const c=freshDb(); c.views={}; return c; }
function q(sql){ const r=SQLE.exec(cat(), sql); if(!r.ok) throw new Error('SQL ERROR: '+r.error+' :: '+sql); return r.results[0]; }
function qErr(sql){ const r=SQLE.exec(cat(), sql); if(r.ok) throw new Error('esperaba error pero OK :: '+sql); return r.error; }
function T(name, cond, extra){ if(cond){ pass++; } else { fail++; console.log('✗', name, extra||''); } }
function rowsEq(a,b){ return JSON.stringify(a)===JSON.stringify(b); }

try{
  // 1. SELECT básico
  let r=q('SELECT titulo, precio FROM libros');
  T('SELECT cols', r.cols.join(',')==='titulo,precio' && r.rows.length===16 && r.rows[0][0]==='Cien años de soledad');
  r=q('SELECT * FROM autores WHERE pais = \'Argentina\'');
  T('WHERE =', r.rows.length===3 && r.rows[0][1]==='Jorge Luis Borges');
  r=q('SELECT titulo FROM libros WHERE precio > 300 ORDER BY precio');
  T('ORDER asc', rowsEq(r.rows.map(x=>x[0]), ['La casa de los espíritus','Cien años de soledad','Rayuela']));
  r=q('SELECT titulo FROM libros ORDER BY precio DESC LIMIT 2');
  T('ORDER DESC LIMIT', rowsEq(r.rows.map(x=>x[0]), ['Rayuela','Cien años de soledad']));
  r=q('SELECT DISTINCT categoria FROM libros ORDER BY categoria');
  T('DISTINCT', rowsEq(r.rows.map(x=>x[0]), ['Cuentos','Memorias','Novela','Poesía','Realismo mágico','Romance']));
  // 2. Operadores
  r=q('SELECT titulo FROM libros WHERE categoria = \'Cuentos\' AND precio < 200');
  T('AND', rowsEq(r.rows.map(x=>x[0]), ['El Aleph','Bestiario']));
  r=q('SELECT titulo FROM libros WHERE categoria = \'Poesía\' OR stock = 0');
  T('OR', r.rows.length===2);
  r=q('SELECT titulo FROM libros WHERE NOT (precio < 300) AND anio > 1980');
  T('NOT+paréntesis', rowsEq(r.rows.map(x=>x[0]), ['La casa de los espíritus']));
  r=q('SELECT titulo FROM libros WHERE anio BETWEEN 1940 AND 1950');
  T('BETWEEN', rowsEq(r.rows.map(x=>x[0]), ['Ficciones','El Aleph','El túnel']));
  r=q('SELECT nombre FROM clientes WHERE ciudad IN (\'Mérida\', \'Puebla\')');
  T('IN', rowsEq(r.rows.map(x=>x[0]), ['Lucía Herrera','Jorge Medina']));
  r=q('SELECT titulo FROM libros WHERE titulo LIKE \'La %\'');
  T('LIKE %', r.rows.length===4); // La casa de los espíritus, La ciudad y los perros, La casa verde, La hora de la estrella
  r=q('SELECT titulo FROM libros WHERE titulo LIKE \'%de%\'');
  T('LIKE %x%', r.rows.length===6); // Cien años de soledad, El amor...del cólera, La casa de los espíritus, De amor y de sombras, La casa verde, La hora de la estrella
  r=q('SELECT titulo FROM libros WHERE titulo LIKE \'_l %\'');
  T('LIKE _', rowsEq(r.rows.map(x=>x[0]), ['El amor en los tiempos del cólera','El Aleph','El túnel']));
  // 3. NULL
  r=q('SELECT titulo FROM libros WHERE anio IS NULL');
  T('IS NULL', rowsEq(r.rows.map(x=>x[0]), ['Antología poética']));
  r=q('SELECT nombre FROM clientes WHERE email IS NOT NULL');
  T('IS NOT NULL', r.rows.length===5);
  r=q('SELECT COUNT(*) FROM clientes WHERE email IS NULL');
  T('COUNT nulos', r.rows[0][0]===3);
  r=q('SELECT titulo FROM libros WHERE anio = NULL');
  T('= NULL → 0 filas', r.rows.length===0);
  // 4. Funciones
  r=q('SELECT UPPER(nombre) FROM autores WHERE id = 1');
  T('UPPER', r.rows[0][0]==='GABRIEL GARCÍA MÁRQUEZ');
  r=q('SELECT LENGTH(titulo) FROM libros WHERE id = 6');
  T('LENGTH', r.rows[0][0]===8);
  r=q('SELECT SUBSTR(fecha,1,7) FROM ventas WHERE id = 1');
  T('SUBSTR mes', r.rows[0][0]==='2025-01');
  r=q('SELECT titulo || \' — \' || categoria FROM libros WHERE id = 5');
  T('|| concat', r.rows[0][0]==='Ficciones — Cuentos');
  r=q('SELECT ROUND(AVG(precio),2) FROM libros');
  T('ROUND(AVG)', Math.abs(r.rows[0][0]-236.63)<0.01);
  r=q('SELECT COALESCE(email, \'sin email\') FROM clientes WHERE id = 3');
  T('COALESCE', r.rows[0][0]==='sin email');
  r=q('SELECT IFNULL(email,\'—\') FROM clientes WHERE id = 5');
  T('IFNULL', r.rows[0][0]==='—');
  r=q('SELECT NULLIF(5,5), NULLIF(5,7)');
  T('NULLIF', r.rows[0][0]===null && r.rows[0][1]===5);
  r=q('SELECT strftime(\'%Y\', fecha) FROM ventas WHERE id = 1');
  T('strftime año', r.rows[0][0]==='2025');
  r=q('SELECT CAST(precio AS INTEGER) FROM libros WHERE id = 1');
  T('CAST', r.rows[0][0]===320);
  // 5. CASE
  r=q('SELECT titulo, CASE WHEN precio < 200 THEN \'barato\' WHEN precio < 300 THEN \'medio\' ELSE \'caro\' END FROM libros WHERE id IN (13, 10, 7) ORDER BY precio');
  T('CASE', rowsEq(r.rows, [['La hora de la estrella','barato'],['La ciudad y los perros','medio'],['Rayuela','caro']]));
  // 6. Agregación + GROUP BY + HAVING
  r=q('SELECT COUNT(*), SUM(cantidad), AVG(total) FROM ventas');
  T('agregados globales', r.rows[0][0]===22 && r.rows[0][1]===30 && Math.abs(r.rows[0][2]-334.43)<0.02);
  r=q('SELECT categoria, COUNT(*) AS n FROM libros GROUP BY categoria HAVING COUNT(*) >= 2 ORDER BY n DESC, categoria');
  T('GROUP+HAVING', rowsEq(r.rows, [['Novela',7],['Cuentos',3],['Realismo mágico',2],['Romance',2]]));
  r=q('SELECT COUNT(*) FROM libros GROUP BY categoria');
  T('COUNT por grupo', rowsEq(r.rows.map(x=>x[0]), [2,2,7,3,1,1]));
  r=q('SELECT categoria, COUNT(*) n FROM libros GROUP BY categoria HAVING n > 1 ORDER BY n DESC, categoria');
  T('HAVING alias', rowsEq(r.rows, [['Novela',7],['Cuentos',3],['Realismo mágico',2],['Romance',2]]));
  r=q('SELECT COUNT(*) FROM libros WHERE precio > 999');
  T('COUNT vacío = 0', r.rows[0][0]===0);
  r=q('SELECT SUM(total) FROM ventas WHERE 1 = 0');
  T('SUM vacío = NULL', r.rows[0][0]===null);
  // 7. JOINs
  r=q('SELECT l.titulo, a.nombre FROM libros l JOIN autores a ON l.autor_id = a.id WHERE a.pais = \'Chile\' ORDER BY l.titulo');
  T('INNER JOIN', rowsEq(r.rows, [['De amor y de sombras','Isabel Allende'],['La casa de los espíritus','Isabel Allende'],['Paula','Isabel Allende']]));
  r=q('SELECT l.titulo FROM libros l LEFT JOIN ventas v ON l.id = v.libro_id WHERE v.id IS NULL ORDER BY l.titulo');
  T('LEFT JOIN huérfanos', rowsEq(r.rows.map(x=>x[0]), ['Antología poética','La casa verde']));
  r=q('SELECT c.nombre, COUNT(v.id) n FROM clientes c LEFT JOIN ventas v ON c.id = v.cliente_id GROUP BY c.nombre ORDER BY n DESC, c.nombre LIMIT 3');
  T('LEFT JOIN+GROUP', rowsEq(r.rows, [['Ana Torres',3],['Luis Ramírez',3],['María Fernanda López',3]]));
  r=q('SELECT l.titulo, a.nombre, v.cantidad FROM ventas v JOIN libros l ON v.libro_id = l.id JOIN autores a ON l.autor_id = a.id WHERE v.fecha LIKE \'2025-01%\' ORDER BY v.id');
  T('JOIN 3 tablas', rowsEq(r.rows, [['Cien años de soledad','Gabriel García Márquez',1],['Ficciones','Jorge Luis Borges',2],['Como agua para chocolate','Laura Esquivel',1],['El Aleph','Jorge Luis Borges',1]]));
  // 8. Subconsultas
  r=q('SELECT titulo FROM libros WHERE precio > (SELECT AVG(precio) FROM libros) ORDER BY precio');
  T('subconsulta escalar', rowsEq(r.rows.map(x=>x[0]), ['De amor y de sombras','La casa verde','El amor en los tiempos del cólera','La ciudad y los perros','La casa de los espíritus','Cien años de soledad','Rayuela']));
  r=q('SELECT nombre FROM clientes WHERE id IN (SELECT cliente_id FROM ventas WHERE total > 500) ORDER BY nombre');
  T('IN subconsulta', rowsEq(r.rows.map(x=>x[0]), ['Carlos Sánchez','Pedro Álvarez']));
  r=q('SELECT titulo FROM libros l WHERE EXISTS (SELECT 1 FROM ventas v WHERE v.libro_id = l.id AND v.cantidad >= 3) ORDER BY l.titulo');
  T('EXISTS correlacionada', rowsEq(r.rows.map(x=>x[0]), ['La hora de la estrella']));
  r=q('SELECT c.nombre, (SELECT COUNT(*) FROM ventas v WHERE v.cliente_id = c.id) AS compras FROM clientes c ORDER BY compras DESC, c.nombre LIMIT 2');
  T('subconsulta en SELECT', rowsEq(r.rows, [['Ana Torres',3],['Luis Ramírez',3]]));
  r=q('SELECT t.mes, t.ventas FROM (SELECT strftime(\'%m\', fecha) AS mes, COUNT(*) AS ventas FROM ventas GROUP BY mes) t ORDER BY t.ventas DESC LIMIT 1');
  T('FROM derivada', rowsEq(r.rows, [['03',6]]));
  // 9. UNION
  r=q('SELECT ciudad FROM clientes WHERE ciudad = \'Monterrey\' UNION SELECT ciudad FROM clientes WHERE ciudad = \'Mérida\' ORDER BY ciudad');
  T('UNION dedupe', rowsEq(r.rows.map(x=>x[0]), ['Monterrey','Mérida'])); // orden binario como SQLite: é(233) > o(111)
  r=q('SELECT ciudad FROM clientes UNION ALL SELECT ciudad FROM clientes');
  T('UNION ALL', r.rows.length===16);
  // 10. Ventanas
  r=q('SELECT titulo, ROW_NUMBER() OVER (ORDER BY precio DESC) AS rk FROM libros WHERE categoria = \'Novela\' ORDER BY rk LIMIT 3');
  T('ROW_NUMBER', rowsEq(r.rows, [['Rayuela',1],['La ciudad y los perros',2],['La casa verde',3]]));
  r=q('SELECT ciudad, ROW_NUMBER() OVER (PARTITION BY ciudad ORDER BY nombre) rn FROM clientes WHERE ciudad = \'Guadalajara\'');
  T('PARTITION BY', rowsEq(r.rows, [['Guadalajara',1],['Guadalajara',2]]));
  // 11. DML + CREATE
  {
    const c=cat();
    let rr=SQLE.exec(c, "CREATE TABLE prueba (id INTEGER PRIMARY KEY, nombre TEXT NOT NULL, precio REAL DEFAULT 10)");
    T('CREATE TABLE', rr.ok && rr.messages[0].includes('creada'));
    rr=SQLE.exec(c, "INSERT INTO prueba (nombre) VALUES ('lapicera')");
    T('INSERT default+pk auto', rr.ok);
    rr=SQLE.exec(c, "SELECT * FROM prueba");
    T('INSERT values', rowsEq(rr.results[0].rows, [[1,'lapicera',10]]));
    rr=SQLE.exec(c, "INSERT INTO prueba (nombre) VALUES (NULL)");
    T('NOT NULL viola', !rr.ok && rr.error.includes('NOT NULL'));
    rr=SQLE.exec(c, "UPDATE prueba SET precio = 25 WHERE id = 1");
    T('UPDATE', rr.ok);
    rr=SQLE.exec(c, "SELECT precio FROM prueba");
    T('UPDATE valor', rr.results[0].rows[0][0]===25);
    rr=SQLE.exec(c, "DELETE FROM prueba WHERE id = 1");
    T('DELETE', rr.ok && SQLE.exec(c,'SELECT COUNT(*) FROM prueba').results[0].rows[0][0]===0);
    rr=SQLE.exec(c, "UPDATE libros SET stock = -5 WHERE id = 1");
    T('CHECK viola', !rr.ok && rr.error.includes('CHECK'));
    rr=SQLE.exec(c, "INSERT INTO clientes (id, nombre, ciudad, email) VALUES (1,'X','Y','z@z.com')");
    T('PK duplicada viola UNIQUE', !rr.ok && rr.error.includes('UNIQUE'));
    // transacciones
    rr=SQLE.exec(c, "BEGIN");
    rr=SQLE.exec(c, "UPDATE libros SET precio = 999 WHERE id = 1");
    rr=SQLE.exec(c, "ROLLBACK");
    rr=SQLE.exec(c, "SELECT precio FROM libros WHERE id = 1");
    T('BEGIN/ROLLBACK', rr.results[0].rows[0][0]===320.5);
  }
  // 12. Vistas
  {
    const c=cat();
    SQLE.exec(c, "CREATE VIEW baratos AS SELECT titulo, precio FROM libros WHERE precio < 200");
    const rr=SQLE.exec(c, "SELECT * FROM baratos ORDER BY precio DESC");
    T('CREATE VIEW + SELECT', rr.ok && rr.results[0].rows.length===6 && rr.results[0].rows[0][0]==='El Aleph');
  }
  // 13. Errores en español
  T('tabla inexistente', qErr('SELECT * FROM inventario').includes('no existe'));
  T('columna inexistente', qErr('SELECT xanadu FROM libros').includes('no existe'));
  T('sintaxis', qErr('SELECT titulo FROM libros WHERE titulo LIKE').includes('inesperada'));
  T('comilla abierta', qErr("SELECT 'abc FROM libros").includes('comilla'));
  T('múltiples statements', (function(){ const c=cat(); const r=SQLE.exec(c,"SELECT 1; SELECT 2"); return r.ok && r.results.length===2; })());
  T('SELECT sin FROM', SQLE.exec(cat(),'SELECT 1+1').results[0].rows[0][0]===2);
  T('comentario --', SQLE.exec(cat(),'SELECT titulo -- comentario\nFROM libros LIMIT 1').ok);
  T('ORDER BY 2', SQLE.exec(cat(),'SELECT categoria, COUNT(*) FROM libros GROUP BY categoria ORDER BY 2 DESC LIMIT 1').results[0].rows[0][0]==='Novela');
  T('columna ambigua', qErr('SELECT id FROM libros l JOIN autores a ON l.autor_id = a.id').includes('varias tablas'));
  T('calificada ok', SQLE.exec(cat(),'SELECT l.id FROM libros l JOIN autores a ON l.autor_id = a.id LIMIT 1').ok);
  T('RIGHT JOIN', (function(){ const r=q('SELECT a.nombre FROM autores a RIGHT JOIN libros l ON l.autor_id = a.id GROUP BY a.nombre'); return r.rows.length>=8; })());
}catch(e){ fail++; console.log('✗ EXCEPCIÓN:', e.message); }

console.log('\n=== RESULTADO: '+pass+' pruebas OK · '+fail+' fallas ===');
process.exit(fail?1:0);
