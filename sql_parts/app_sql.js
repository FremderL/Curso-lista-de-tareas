/* ============================================================
   CURSO SQL · capa de aplicación
   Ejercicios sqlex (motor + calificación por resultado),
   Playground con estado, diagrama ER y mazo SRS ya en srs.js
   Requiere: SQLE (motor), SQLE_DB_FRESH (base), LESSONS_BY_ID,
   state/saveState/updateChrome/renderSidebar/confetti/esc/$/$$
   ============================================================ */

/* ---------- catálogo de trabajo del playground ---------- */
var SQL_CAT = null;
function sqlCat(){ if(!SQL_CAT) SQL_CAT = SQLE_DB_FRESH(); return SQL_CAT; }

/* ---------- calificación por resultado (idéntica al validador) ---------- */
function sqlColsMatch(spec, gotCols){
  if(spec.length !== gotCols.length) return 'Tu consulta devuelve '+gotCols.length+' columna(s) ('+gotCols.join(', ')+'); se esperaban '+spec.length+' ('+spec.map(function(s){ return Array.isArray(s)?s[0]:s; }).join(', ')+').';
  for(var i=0;i<spec.length;i++){
    var alts = Array.isArray(spec[i]) ? spec[i] : [spec[i]];
    var gl = String(gotCols[i]).toLowerCase().trim();
    var okn = alts.some(function(a2){ return String(a2).toLowerCase().trim() === gl; });
    if(!okn) return 'La columna '+(i+1)+' debía llamarse «'+(Array.isArray(spec[i])?spec[i][0]:spec[i])+'» y se llamó «'+gotCols[i]+'».';
  }
  return true;
}
function sqlGradeTask(check, got){
  if(!got) return {ok:false, why:'Tu consulta no produjo resultados.'};
  if(typeof check.rows === 'number'){
    if(got.rows.length !== check.rows) return {ok:false, why:'Tu consulta devuelve '+got.rows.length+' fila(s); se esperaban '+check.rows+'.'};
    if(check.cols){ var c = sqlColsMatch(check.cols, got.cols); if(c !== true) return {ok:false, why:c}; }
    return {ok:true};
  }
  if(Array.isArray(check.rows)){
    if(check.cols){ var c2 = sqlColsMatch(check.cols, got.cols); if(c2 !== true) return {ok:false, why:c2}; }
    return SQLE.gradeResult({cols: got.cols, rows: check.rows}, got, {orderInsensitive: check.orderInsensitive !== false});
  }
  return {ok:false, why:'Tarea mal configurada.'};
}

/* ---------- render de resultados ---------- */
function sqlValueTd(v){
  if(v === null || v === undefined) return '<td class="nulld"><i>NULL</i></td>';
  return '<td>'+esc(String(v))+'</td>';
}
function sqlResultTableHtml(cols, rows){
  var MAXR = 50;
  if(!rows.length) return '<div class="sql-empty">✅ Consulta ejecutada. Resultado: <b>0 filas</b>.</div>';
  var h = '<div class="sql-twrap"><table class="sqlrt"><thead><tr>';
  cols.forEach(function(c){ h += '<th>'+esc(String(c))+'</th>'; });
  h += '</tr></thead><tbody>';
  rows.slice(0, MAXR).forEach(function(r){
    h += '<tr>' + r.map(sqlValueTd).join('') + '</tr>';
  });
  h += '</tbody></table></div>';
  h += rows.length > MAXR
    ? '<p class="sql-note">Mostrando 50 de '+rows.length+' filas.</p>'
    : '<p class="sql-note">'+rows.length+' fila'+(rows.length===1?'':'s')+'.</p>';
  return h;
}
function sqlErrorHtml(msg){ return '<div class="sqlerr">'+esc(String(msg||'Error desconocido'))+'</div>'; }
function sqlMultiResultHtml(r){
  var h = '';
  (r.messages||[]).forEach(function(m){ h += '<div class="sqlmsg">'+esc(m)+'</div>'; });
  (r.results||[]).forEach(function(res, i){
    if((r.results||[]).length > 1) h += '<p class="sql-note" style="font-weight:800">Resultado '+(i+1)+'</p>';
    h += sqlResultTableHtml(res.cols, res.rows);
  });
  if(!h) h = '<div class="sql-empty">✅ Comando ejecutado.</div>';
  return h;
}

/* ---------- ejercicios sqlex ---------- */
function sqlTaskKey(lessonId, ti){ return lessonId + '#' + ti; }
function sqlTaskSolved(lessonId, ti){ return !!(state.sqlOk && state.sqlOk[sqlTaskKey(lessonId, ti)]); }
function sqlFindBlock(lessonId){
  var l = LESSONS_BY_ID[lessonId];
  if(!l) return null;
  var blocks = l.blocks || [];
  for(var i=0;i<blocks.length;i++){ if(blocks[i].t === 'sqlex') return blocks[i]; }
  return null;
}
/* puntos resueltos de una lección → score de lección */
function sqlLessonScore(lessonId){
  var b = sqlFindBlock(lessonId);
  if(!b) return null;
  var total = 0;
  (b.tasks||[]).forEach(function(tk, ti){ if(sqlTaskSolved(lessonId, ti)) total += (tk.pts || 10); });
  return total;
}
function sqlExBlockHtml(b, lessonId){
  var h = '<section class="sqlex" data-sqlex="'+lessonId+'">';
  h += '<h3 class="quiz-title">'+(b.title||'🧪 Practica en el playground SQL')+'</h3>';
  var solvedCount = 0;
  (b.tasks||[]).forEach(function(tk, ti){ if(sqlTaskSolved(lessonId, ti)) solvedCount++; });
  h += '<p class="quiz-sub">Escribe tu consulta, ejecútala con <b>▶ Ejecutar</b> y cuando el resultado te convenza presiona <b>✓ Calificar</b>. Cada tarea parte de la base limpia: tus consultas NO arruinan los datos de práctica.</p>';
  (b.tasks||[]).forEach(function(tk, ti){
    var saved = (state.sqlCode && state.sqlCode[sqlTaskKey(lessonId, ti)]) || '';
    var solved = sqlTaskSolved(lessonId, ti);
    h += '<div class="sqltask'+(solved?' solved':'')+'" data-task="'+lessonId+'#'+ti+'">';
    h += '<div class="sqlq"><span class="tnum">'+(ti+1)+'</span><span class="tq">'+tk.q+'</span><span class="qpts">'+(tk.pts||10)+' pts</span><span class="tst">'+(solved?'✓ resuelta':'')+'</span></div>';
    if(tk.hint) h += '<details class="sqlhint"><summary>💡 Ver pista</summary><p>'+tk.hint+'</p></details>';
    h += '<textarea class="sqlta" id="sqlta-'+lessonId+'-'+ti+'" spellcheck="false" autocomplete="off" placeholder="SELECT …">'+esc(saved)+'</textarea>';
    h += '<div class="sqlbtns">'+
      '<button type="button" class="btn small" data-sqlaction="run" data-lesson="'+lessonId+'" data-ti="'+ti+'">▶ Ejecutar</button>'+
      '<button type="button" class="btn small good" data-sqlaction="grade" data-lesson="'+lessonId+'" data-ti="'+ti+'">✓ Calificar</button>'+
      '<button type="button" class="btn ghost small" data-sqlaction="clear" data-lesson="'+lessonId+'" data-ti="'+ti+'">↺ Vaciar</button>'+
      '</div>';
    h += '<div class="sqlout" data-out></div>';
    h += '<details class="sqlsol"><summary>🔎 Ver solución (intenta primero de verdad)</summary><pre class="sqlsolcode">'+esc(tk.solution)+'</pre></details>';
    h += '</div>';
  });
  h += '<div class="sqlscore" data-sqlscore>'+solvedCount+' de '+(b.tasks||[]).length+' tareas resueltas</div>';
  h += '</section>';
  return h;
}
function sqlTaskOut(taskEl, html){
  var out = taskEl.querySelector('[data-out]');
  if(out) out.innerHTML = html;
}
function sqlGetTa(lessonId, ti){ return document.getElementById('sqlta-'+lessonId+'-'+ti); }
/* ejecuta y devuelve {cat, r, code} — siempre sobre base fresca */
function sqlRunTaskCode(lessonId, ti){
  var ta = sqlGetTa(lessonId, ti);
  var code = ta ? ta.value.trim() : '';
  if(!code) return { empty:true };
  if(!state.sqlCode) state.sqlCode = {};
  state.sqlCode[sqlTaskKey(lessonId, ti)] = ta.value;
  saveState();
  var r = SQLE.exec(SQLE_DB_FRESH(), code);
  return { empty:false, code:code, r:r };
}
function sqlActionRun(el){
  var lessonId = el.getAttribute('data-lesson'), ti = Number(el.getAttribute('data-ti'));
  var taskEl = el.closest('.sqltask');
  var run = sqlRunTaskCode(lessonId, ti);
  if(run.empty){ sqlTaskOut(taskEl, '<div class="sqlmsg">✍️ Escribe tu consulta primero.</div>'); return; }
  sqlTaskOut(taskEl, run.r.ok ? sqlMultiResultHtml(run.r) : sqlErrorHtml(run.r.error));
}
function sqlActionGrade(el){
  var lessonId = el.getAttribute('data-lesson'), ti = Number(el.getAttribute('data-ti'));
  var taskEl = el.closest('.sqltask');
  var block = sqlFindBlock(lessonId);
  var tk = block && block.tasks ? block.tasks[ti] : null;
  if(!tk){ return; }
  var run = sqlRunTaskCode(lessonId, ti);
  if(run.empty){ sqlTaskOut(taskEl, '<div class="sqlmsg">✍️ Escribe tu consulta primero.</div>'); return; }
  var r = run.r;
  var ok = false, why = '';
  if(tk.check && tk.check.expectError){
    if(!r.ok && String(r.error).indexOf(tk.check.expectError) >= 0){ ok = true; why = 'La base rechazó la operación con el error correcto. Eso era exactamente lo que había que provocar.'; }
    else if(!r.ok){ why = 'Falló, pero con OTRO error: '+r.error; }
    else { why = 'Tu comando se ejecutó SIN error… pero la tarea pedía provocar uno ('+tk.check.expectError+').'; }
  } else if(tk.check && tk.check.expectMessage){
    if(r.ok && (r.messages||[]).join(' ').indexOf(tk.check.expectMessage) >= 0){ ok = true; why = 'Mensaje esperado recibido.'; }
    else if(!r.ok){ why = 'Tu comando falló: '+r.error; }
    else { why = 'Se ejecutó, pero sin el mensaje esperado ('+tk.check.expectMessage+').'; }
  } else {
    if(!r.ok){ why = 'Tu consulta falló: '+r.error; }
    else { var g = sqlGradeTask(tk.check, r.results[r.results.length-1]); ok = !!g.ok; why = g.why || ''; }
  }
  if(ok){
    if(!state.sqlOk) state.sqlOk = {};
    state.sqlOk[sqlTaskKey(lessonId, ti)] = 1;
    var sc = sqlLessonScore(lessonId);
    if(sc != null && (state.scores[lessonId] == null || sc > state.scores[lessonId])) state.scores[lessonId] = sc;
    saveState(); updateChrome(); renderSidebar(parseHash());
    taskEl.classList.add('solved');
    var tst = taskEl.querySelector('.tst'); if(tst) tst.textContent = '✓ resuelta';
    var allOk = (block.tasks||[]).every(function(_, i){ return sqlTaskSolved(lessonId, i); });
    sqlTaskOut(taskEl, '<div class="sqlok">✅ ¡Correcto! '+(why?'('+why+')':'')+(allOk?' <b>¡Lección completada! 🎉</b>':'')+'</div>');
    try{ confetti(taskEl); }catch(e){}
    var sec = taskEl.closest('[data-sqlex]');
    if(sec){
      var solved = (block.tasks||[]).filter(function(_, i){ return sqlTaskSolved(lessonId, i); }).length;
      var sp = sec.querySelector('[data-sqlscore]');
      if(sp) sp.textContent = solved+' de '+(block.tasks||[]).length+' tareas resueltas';
    }
  } else {
    sqlTaskOut(taskEl, '<div class="sqlno">❌ Todavía no. '+esc(why)+'<br>Presiona «▶ Ejecutar» para ver tu resultado y compara con lo pedido. Puedes corregir y volver a calificar: no hay castigo.</div>');
  }
}

/* ---------- playground ---------- */
function sqlSchemaHtml(){
  var cat = sqlCat();
  var h = '<div class="pgschema">';
  Object.keys(cat.tables).forEach(function(tn){
    var t = cat.tables[tn];
    h += '<details class="pgtable"><summary>🗃️ '+esc(tn)+' <small>('+t.rows.length+' filas)</small></summary><ul>';
    t.cols.forEach(function(c){
      var d = t.defs ? (t.defs[c] || {}) : {};
      var tags = [];
      if(d.pk) tags.push('PK');
      if(d.notNull) tags.push('NOT NULL');
      if(d.unique) tags.push('UNIQUE');
      h += '<li><code>'+esc(c)+'</code>'+(tags.length?' <small>'+tags.join(' · ')+'</small>':'')+'</li>';
    });
    h += '</ul></details>';
  });
  if(cat.views && Object.keys(cat.views).length){
    Object.keys(cat.views).forEach(function(vn){ h += '<p class="pgview">🔭 vista: <code>'+esc(vn)+'</code></p>'; });
  }
  h += '</div>';
  return h;
}
function pgDefaultQuery(){
  return "SELECT l.titulo, a.nombre AS autor, l.precio\nFROM libros l\nJOIN autores a ON l.autor_id = a.id\nORDER BY l.precio DESC\nLIMIT 5;";
}
function pgRenderOut(){
  var out = document.getElementById('pgOut');
  if(!out) return;
  var ta = document.getElementById('pgEditor');
  var code = ta ? ta.value : '';
  if(!state.play || state.play !== code){ state.play = code; saveState(); }
  if(!code.trim()){ out.innerHTML = '<div class="sqlmsg">✍️ Escribe una consulta y presiona ▶ Ejecutar.</div>'; return; }
  var r = SQLE.exec(sqlCat(), code);
  out.innerHTML = r.ok ? sqlMultiResultHtml(r) : sqlErrorHtml(r.error);
}
function viewProject(){
  EDITOR_CODES = [];
  if(!state.play) state.play = pgDefaultQuery();
  var chips = [
    'SELECT * FROM libros;',
    'SELECT * FROM clientes;',
    'SELECT * FROM ventas;',
    'SELECT COUNT(*) FROM ventas;',
    "SELECT categoria, COUNT(*) FROM libros GROUP BY categoria;"
  ];
  return '<div class="view">'+
    '<h1 style="font-size:28px">🛝 Playground SQL</h1>'+
    '<p class="lead-text">Tu laboratorio libre: consulta y modifica la <b>Librería Esperanza</b> (5 tablas, 58 filas). Los cambios que hagas aquí (INSERT/UPDATE/DELETE/CREATE) viven durante esta sesión; el botón <b>🗄️ Restaurar</b> devuelve la base original. Tu consulta guardada persiste en tu cuenta.</p>'+
    '<div class="pgwrap">'+
      '<div class="pgleft">'+
        '<textarea id="pgEditor" class="sqlta pgta" spellcheck="false" autocomplete="off">'+esc(state.play)+'</textarea>'+
        '<div class="sqlbtns">'+
          '<button type="button" class="btn" data-sqlaction="pg-run">▶ Ejecutar</button>'+
          '<button type="button" class="btn ghost" data-sqlaction="pg-reset">🗄️ Restaurar base de ejemplo</button>'+
        '</div>'+
        '<div class="pgchips">'+chips.map(function(c){ return '<button type="button" class="chipq" data-sqlaction="pg-chip" data-q="'+esc(c)+'">'+esc(c.replace(/\s+/g,' ').slice(0,34))+'…</button>'; }).join('')+'</div>'+
        '<div id="pgOut"></div>'+
      '</div>'+
      '<div class="pgright">'+
        '<h3 class="quiz-title">🗂️ Esquema: Librería Esperanza</h3>'+
        '<div id="pgSchema">'+sqlSchemaHtml()+'</div>'+
        '<h3 class="quiz-title">📋 Chuleta rápida</h3>'+
        '<div class="pgcheat">'+
        '<p><code>SELECT c1, c2 FROM t WHERE cond ORDER BY c LIMIT n;</code></p>'+
        '<p><code>JOIN / LEFT JOIN t2 ON a.x = t2.id</code></p>'+
        '<p><code>GROUP BY … HAVING … · COUNT/SUM/AVG/MIN/MAX</code></p>'+
        '<p><code>LIKE \'a%\' · IN (…) · BETWEEN a AND b · IS NULL</code></p>'+
        '<p><code>COALESCE · UPPER · LENGTH · SUBSTR · ROUND · CASE WHEN…END</code></p>'+
        '<p><code>INSERT INTO t (…) VALUES (…) · UPDATE t SET … WHERE · DELETE FROM t WHERE</code></p>'+
        '<p><code>CREATE TABLE t (id INTEGER PRIMARY KEY, …) · CREATE VIEW</code></p>'+
        '<p><code>BEGIN · COMMIT · ROLLBACK · ROW_NUMBER() OVER (…)</code></p>'+
        '</div>'+
        '<details class="pgnote"><summary>ℹ️ ¿Cómo funciona este motor?</summary><p>Es un mini-motor SQL escrito en JavaScript que corre 100% en tu navegador (dialecto cercano a SQLite). Si algo no está soportado te lo dice en español. Los ejercicios de las lecciones usan una copia LIMPIA de la base en cada ejecución: aquí puedes experimentar sin miedo.</p></details>'+
      '</div>'+
    '</div>'+
    '<div class="navbtns">'+
    '<button class="btn ghost" data-nav="lesson" data-id="0-2">← Lección: motores y playground</button>'+
    '<button class="btn" data-nav="report">📄 Ver mi boleta →</button></div>'+
    '</div>';
}

/* ---------- diagrama ER ---------- */
function erHtml(b){
  var svg = '<svg viewBox="0 0 780 470" class="ersvg" role="img" aria-label="Diagrama entidad-relación de la Librería Esperanza">'
  + '<defs><marker id="erar" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#64748b"/></marker></defs>'
  + '<style>.ert{font:600 13px system-ui,sans-serif;fill:#0f172a}.erh{font:800 14px system-ui,sans-serif;fill:#fff}.erc{font:11.5px ui-monospace,monospace;fill:#334155}.erp{font:700 11px ui-monospace,monospace;fill:#4338ca}.erf{font:700 11px ui-monospace,monospace;fill:#b45309}.erl{font:700 12px system-ui;fill:#64748b}</style>'
  + '<rect x="20" y="30" width="200" height="100" rx="12" fill="#eef2ff" stroke="#6366f1" stroke-width="2"/><title>autores: 9 filas</title>'
  + '<rect x="20" y="30" width="200" height="26" rx="12" fill="#6366f1"/><text x="120" y="48" text-anchor="middle" class="erh">autores</text>'
  + '<text x="34" y="76" class="erp">id</text><text x="90" y="76" class="erc">PK</text>'
  + '<text x="34" y="94" class="erc">nombre</text><text x="34" y="112" class="erc">pais</text>'
  + '<rect x="300" y="20" width="220" height="140" rx="12" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/><title>libros: 16 filas</title>'
  + '<rect x="300" y="20" width="220" height="26" rx="12" fill="#10b981"/><text x="410" y="38" text-anchor="middle" class="erh">libros</text>'
  + '<text x="314" y="66" class="erp">id</text><text x="360" y="66" class="erc">PK</text>'
  + '<text x="314" y="84" class="erc">titulo · categoria</text>'
  + '<text x="314" y="102" class="erf">autor_id</text><text x="380" y="102" class="erc">FK → autores.id</text>'
  + '<text x="314" y="120" class="erc">precio · stock · anio</text>'
  + '<rect x="20" y="300" width="200" height="110" rx="12" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/><title>clientes: 8 filas</title>'
  + '<rect x="20" y="300" width="200" height="26" rx="12" fill="#ef4444"/><text x="120" y="318" text-anchor="middle" class="erh">clientes</text>'
  + '<text x="34" y="346" class="erp">id</text><text x="90" y="346" class="erc">PK</text>'
  + '<text x="34" y="364" class="erc">nombre · ciudad · email</text>'
  + '<rect x="480" y="290" width="280" height="140" rx="12" fill="#fffbeb" stroke="#f59e0b" stroke-width="2"/><title>ventas: 22 filas (tabla puente)</title>'
  + '<rect x="480" y="290" width="280" height="26" rx="12" fill="#f59e0b"/><text x="620" y="308" text-anchor="middle" class="erh">ventas (tabla puente)</text>'
  + '<text x="494" y="336" class="erp">id</text><text x="540" y="336" class="erc">PK</text>'
  + '<text x="494" y="354" class="erf">libro_id</text><text x="560" y="354" class="erc">FK → libros.id</text>'
  + '<text x="494" y="372" class="erf">cliente_id</text><text x="570" y="372" class="erc">FK → clientes.id</text>'
  + '<text x="494" y="390" class="erc">fecha · cantidad · total</text>'
  + '<rect x="540" y="30" width="220" height="90" rx="12" fill="#f8fafc" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 4"/><title>proveedores: 3 filas (aún sin relación)</title>'
  + '<rect x="540" y="30" width="220" height="26" rx="12" fill="#94a3b8"/><text x="650" y="48" text-anchor="middle" class="erh">proveedores</text>'
  + '<text x="554" y="76" class="erp">id</text><text x="600" y="76" class="erc">PK</text>'
  + '<text x="554" y="94" class="erc">nombre · contacto</text>'
  + '<line x1="220" y1="80" x2="300" y2="80" stroke="#64748b" stroke-width="2" marker-end="url(#erar)"/>'
  + '<text x="243" y="70" class="erl">1:N</text><text x="238" y="100" class="erl">escribe</text>'
  + '<line x1="500" y1="160" x2="580" y2="290" stroke="#64748b" stroke-width="2" marker-end="url(#erar)"/>'
  + '<text x="512" y="225" class="erl">1:N</text><text x="508" y="245" class="erl">se vende en</text>'
  + '<line x1="220" y1="360" x2="480" y2="360" stroke="#64748b" stroke-width="2" marker-end="url(#erar)"/>'
  + '<text x="330" y="350" class="erl">1:N</text><text x="322" y="380" class="erl">compra en</text>'
  + '<text x="20" y="450" class="erl">Regla de oro: la llave foránea vive SIEMPRE en la tabla del lado «muchos» (N).</text>'
  + '</svg>';
  return '<div class="erwrap">'+svg+(b && b.h ? '<p class="sql-note">'+b.h+'</p>' : '')+'</div>';
}

/* ---------- eventos delegados del módulo SQL ---------- */
document.addEventListener('click', function(ev){
  var el = ev.target.closest ? ev.target.closest('[data-sqlaction]') : null;
  if(!el) return;
  var act = el.getAttribute('data-sqlaction');
  try{
    if(act === 'run') sqlActionRun(el);
    else if(act === 'grade') sqlActionGrade(el);
    else if(act === 'clear'){
      var lessonId = el.getAttribute('data-lesson'), ti = Number(el.getAttribute('data-ti'));
      var ta = sqlGetTa(lessonId, ti);
      if(ta){ ta.value = ''; ta.focus(); }
      var taskEl = el.closest('.sqltask'); if(taskEl) sqlTaskOut(taskEl, '');
    }
    else if(act === 'pg-run'){ pgRenderOut(); }
    else if(act === 'pg-reset'){
      SQL_CAT = SQLE_DB_FRESH();
      var sch = document.getElementById('pgSchema'); if(sch) sch.innerHTML = sqlSchemaHtml();
      var out = document.getElementById('pgOut');
      if(out) out.innerHTML = '<div class="sqlmsg">🗄️ Base «Librería Esperanza» restaurada a su estado original (5 tablas · 58 filas).</div>';
    }
    else if(act === 'pg-chip'){
      var ta2 = document.getElementById('pgEditor');
      if(ta2){ ta2.value = el.getAttribute('data-q') || ''; pgRenderOut(); }
    }
  }catch(e){ try{ console.error('[sql]', e); }catch(e2){} }
});
