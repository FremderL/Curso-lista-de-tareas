/* ============================================================
   CURSO SQL · MAZOS SRS (repetición espaciada, sistema Leitner)
   Tarjetas {f: frente, es: significado, ex: ejemplo}
   ============================================================ */
const SRS_DECKS = {
  sqlcore:{ name:'Conceptos SQL esenciales', emoji:'🗄️', desc:'Las palabras clave y conceptos que debes recordar sin pensar: de PRIMARY KEY a ROW_NUMBER.',
    cards:[
      {f:'PRIMARY KEY', es:'Identifica cada fila: única, sin NULL', ex:'id INTEGER PRIMARY KEY'},
      {f:'FOREIGN KEY', es:'Columna que apunta a la PK de otra tabla', ex:'ventas.libro_id → libros.id'},
      {f:'SELECT', es:'Elige columnas de un resultado', ex:'SELECT titulo, precio FROM libros;'},
      {f:'WHERE', es:'Filtra FILAS antes de agrupar', ex:'WHERE precio > 300'},
      {f:'ORDER BY', es:'Ordena el resultado (ASC por defecto)', ex:'ORDER BY precio DESC, titulo'},
      {f:'LIMIT', es:'Recorta cuántas filas devolver', ex:'LIMIT 5 OFFSET 10'},
      {f:'DISTINCT', es:'Elimina filas repetidas del resultado', ex:'SELECT DISTINCT categoria FROM libros;'},
      {f:'LIKE', es:'Patrones de texto: % = lo que sea, _ = un carácter', ex:"WHERE titulo LIKE 'El %'"},
      {f:'IS NULL', es:'La ÚNICA forma de encontrar nulos (= NULL nunca funciona)', ex:'WHERE email IS NULL'},
      {f:'COALESCE(a,b)', es:'Devuelve el primer argumento NO nulo', ex:"COALESCE(email, 'sin email')"},
      {f:'COUNT(*) vs COUNT(col)', es:'* cuenta filas; col ignora las que tienen NULL', ex:'COUNT(cliente_id) excluye ventas de mostrador'},
      {f:'GROUP BY', es:'Parte filas en grupos y agrega por grupo', ex:'GROUP BY categoria + COUNT(*)'},
      {f:'HAVING', es:'Filtra GRUPOS después de agregar', ex:'HAVING COUNT(*) >= 3'},
      {f:'INNER JOIN', es:'Solo las parejas que coinciden en el ON', ex:'libros l JOIN autores a ON l.autor_id = a.id'},
      {f:'LEFT JOIN', es:'TODAS las filas de la izquierda; NULL donde no hay pareja', ex:'…WHERE v.id IS NULL  ← libros nunca vendidos'},
      {f:'UNION vs UNION ALL', es:'Une resultados; ALL conserva duplicados (más rápido)', ex:'SELECT … UNION SELECT …'},
      {f:'Vista (VIEW)', es:'Consulta guardada con nombre; no duplica datos', ex:'CREATE VIEW baratos AS SELECT …'},
      {f:'Transacción', es:'BEGIN … COMMIT/ROLLBACK: todo o nada', ex:'BEGIN; DELETE…; ROLLBACK;'},
      {f:'Índice (INDEX)', es:'Acelera lecturas; encarece escrituras', ex:'CREATE INDEX idx ON ventas(fecha);'},
      {f:'ROW_NUMBER() OVER', es:'Numera filas; PARTITION reinicia por grupo', ex:'OVER (PARTITION BY categoria ORDER BY precio DESC)'}
    ]}
};
