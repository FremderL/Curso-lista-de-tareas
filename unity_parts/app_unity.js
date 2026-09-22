/* ============================================================
   CURSO 7 UNITY (C#) · capa de aplicación
   Ejercicios ucs (interpreter C# + calificación por salida),
   Playground persistente y diagramas de flujo.
   Requiere: UCS, LESSONS_BY_ID, state/saveState/updateChrome/
   renderSidebar/confetti/esc/$/$$
   ============================================================ */

/* ---------- calificación por salida ---------- */
function ucsGradeTask(check, r){
  if(!r) return {ok:false, why:'No hubo resultado.'};
  var g = UCS.gradeOutput(check.lines || [], r.output, {});
  if(!g.ok) return g;
  if(check.vars){
    for(var k in check.vars){
      var exp = check.vars[k], got = r.vars ? r.vars[k] : undefined;
      var same = (typeof exp === 'number') ? (got === exp) : JSON.stringify(got) === JSON.stringify(exp);
      if(!same) return {ok:false, why:'La variable '+k+' debía valer '+JSON.stringify(exp)+' y valió '+JSON.stringify(got)+'.'};
    }
  }
  return {ok:true};
}

/* ---------- render de salida ---------- */
function pyOutHtml(output){
  if(!output) return '<div class="pyout pyout-empty">(sin salida en pantalla)</div>';
  return '<div class="pyout"><div class="pyout-head">Salida del programa</div><pre>'+esc(output.replace(/\n$/,''))+'</pre></div>';
}
function pyErrorHtml(msg){ return '<div class="pyerr">'+esc(String(msg||'Error desconocido'))+'</div>'; }

/* ---------- ejercicios ucs ---------- */
function pyTaskKey(lessonId, ti){ return lessonId + '#' + ti; }
function pyTaskSolved(lessonId, ti){ return !!(state.ucsOk && state.ucsOk[pyTaskKey(lessonId, ti)]); }
function pyFindBlock(lessonId){
  var l = LESSONS_BY_ID[lessonId];
  if(!l) return null;
  var blocks = l.blocks || [];
  for(var i=0;i<blocks.length;i++){ if(blocks[i].t === 'pyex') return blocks[i]; }
  return null;
}
function pyLessonScore(lessonId){
  var b = pyFindBlock(lessonId);
  if(!b) return null;
  var total = 0;
  (b.tasks||[]).forEach(function(tk, ti){ if(pyTaskSolved(lessonId, ti)) total += (tk.pts || 10); });
  return total;
}
function pyExBlockHtml(b, lessonId){
  var h = '<section class="pyex" data-pyex="'+lessonId+'">';
  h += '<h3 class="quiz-title">'+(b.title||'🧪 Practica en el laboratorio C#')+'</h3>';
  var solvedCount = 0;
  (b.tasks||[]).forEach(function(tk, ti){ if(pyTaskSolved(lessonId, ti)) solvedCount++; });
  h += '<p class="quiz-sub">Escribe tu programa, dale <b>▶ Ejecutar</b> (con las entradas indicadas) y cuando la salida te convenza presiona <b>✓ Calificar</b>: se compara tu SALIDA con la esperada, línea por línea.</p>';
  (b.tasks||[]).forEach(function(tk, ti){
    var saved = (state.ucsCode && state.ucsCode[pyTaskKey(lessonId, ti)]) || '';
    var solved = pyTaskSolved(lessonId, ti);
    var stdinTxt = (tk.stdin || []).join('\n');
    h += '<div class="pytask'+(solved?' solved':'')+'" data-task="'+lessonId+'#'+ti+'">';
    h += '<div class="pyq"><span class="tnum">'+(ti+1)+'</span><span class="tq">'+tk.q+'</span><span class="qpts">'+(tk.pts||10)+' pts</span><span class="tst">'+(solved?'✓ resuelta':'')+'</span></div>';
    if(tk.hint) h += '<details class="pyhint"><summary>💡 Ver pista</summary><p>'+tk.hint+'</p></details>';
    h += '<textarea class="pyta" id="pyta-'+lessonId+'-'+ti+'" spellcheck="false" autocomplete="off" placeholder="// tu programa C# aquí…">'+esc(saved)+'</textarea>';
    if((tk.stdin || []).length){
      h += '<div class="pystdin-wrap"><label class="pystdin-label">⌨️ Entradas (una por línea, se las entrega Console.ReadLine en orden):</label>'+
           '<textarea class="pystdin" id="pystdin-'+lessonId+'-'+ti+'" spellcheck="false" rows="'+Math.max(2, Math.min(6, tk.stdin.length))+'" readonly>'+esc(stdinTxt)+'</textarea></div>';
    }
    h += '<div class="sqlbtns">'+
      '<button type="button" class="btn small" data-ucsaction="run" data-lesson="'+lessonId+'" data-ti="'+ti+'">▶ Ejecutar</button>'+
      '<button type="button" class="btn small good" data-ucsaction="grade" data-lesson="'+lessonId+'" data-ti="'+ti+'">✓ Calificar</button>'+
      '<button type="button" class="btn ghost small" data-ucsaction="clear" data-lesson="'+lessonId+'" data-ti="'+ti+'">↺ Vaciar</button>'+
      '</div>';
    h += '<div class="sqlout" data-out></div>';
    h += '<details class="sqlsol"><summary>🔎 Ver solución (intenta primero de verdad)</summary><pre class="sqlsolcode">'+esc(tk.solution)+'</pre></details>';
    h += '</div>';
  });
  h += '<div class="sqlscore" data-pyscore>'+solvedCount+' de '+(b.tasks||[]).length+' tareas resueltas</div>';
  h += '</section>';
  return h;
}
function pyTaskOut(taskEl, html){
  var out = taskEl.querySelector('[data-out]');
  if(out) out.innerHTML = html;
}
function pyGetTa(lessonId, ti){ return document.getElementById('pyta-'+lessonId+'-'+ti); }
/* lee las entradas del textarea; si no existe usa las de la tarea */
function pyTaskInputs(lessonId, ti, task, forGrade){
  var box = document.getElementById('pystdin-'+lessonId+'-'+ti);
  if(forGrade || !box) return (task.stdin || []).slice();
  var txt = box.value.replace(/\r/g,'');
  if(txt === '' ) return [];
  return txt.split('\n');
}
function pyRunTaskCode(lessonId, ti, forGrade){
  var l = LESSONS_BY_ID[lessonId];
  var task = null;
  (l.blocks||[]).forEach(function(b){ if(b.t==='pyex') task = (b.tasks||[])[ti]; });
  if(!task) return {empty:true};
  var ta = pyGetTa(lessonId, ti);
  var code = ta ? ta.value.trim() : '';
  if(!code) return {empty:true};
  if(!state.ucsCode) state.ucsCode = {};
  state.ucsCode[pyTaskKey(lessonId, ti)] = ta.value;
  saveState();
  var inputs = pyTaskInputs(lessonId, ti, task, forGrade);
  var wantVars = task.wantVars || Object.keys((task.check && task.check.vars) || {});
  var r = UCS.run(code, { stdin: inputs, wantVars: wantVars });
  return { empty:false, task:task, r:r };
}
function pyActionRun(el){
  var lessonId = el.getAttribute('data-lesson'), ti = Number(el.getAttribute('data-ti'));
  var taskEl = el.closest('.pytask');
  var run = pyRunTaskCode(lessonId, ti, false);
  if(run.empty){ pyTaskOut(taskEl, '<div class="sqlmsg">✍️ Escribe tu programa primero.</div>'); return; }
  var r = run.r;
  if(!r.ok){ pyTaskOut(taskEl, pyErrorHtml(r.error) + (r.output ? pyOutHtml(r.output) : '')); return; }
  pyTaskOut(taskEl, pyOutHtml(r.output));
}
function pyActionGrade(el){
  var lessonId = el.getAttribute('data-lesson'), ti = Number(el.getAttribute('data-ti'));
  var taskEl = el.closest('.pytask');
  var run = pyRunTaskCode(lessonId, ti, true);
  if(run.empty){ pyTaskOut(taskEl, '<div class="sqlmsg">✍️ Escribe tu programa primero.</div>'); return; }
  var task = run.task, r = run.r;
  var ok = false, why = '';
  if(task.check && task.check.expectError){
    if(!r.ok && String(r.error).indexOf(task.check.expectError) >= 0){ ok = true; why = 'El programa falló con la excepción pedida: así se aprende a leer errores.'; }
    else if(!r.ok){ why = 'Falló, pero con OTRO error: '+r.error; }
    else { why = 'Tu programa corrió SIN error… y la tarea pide provocar '+task.check.expectError+'.'; }
  } else if(!r.ok){
    why = 'Tu programa lanzó un error: '+r.error;
  } else {
    var g = ucsGradeTask(task.check, r);
    ok = !!g.ok;
    why = g.why || '';
  }
  if(ok){
    if(!state.ucsOk) state.ucsOk = {};
    state.ucsOk[pyTaskKey(lessonId, ti)] = 1;
    var sc = pyLessonScore(lessonId);
    if(sc != null && (state.scores[lessonId] == null || sc > state.scores[lessonId])) state.scores[lessonId] = sc;
    saveState(); updateChrome(); renderSidebar(parseHash());
    taskEl.classList.add('solved');
    var tst = taskEl.querySelector('.tst'); if(tst) tst.textContent = '✓ resuelta';
    var block = pyFindBlock(lessonId);
    var allOk = (block.tasks||[]).every(function(_, i){ return pyTaskSolved(lessonId, i); });
    pyTaskOut(taskEl, '<div class="sqlok">✅ ¡Salida exacta! '+(allOk?' <b>¡Lección completada! 🎉</b>':'')+'</div>');
    try{ confetti(taskEl); }catch(e){}
    var sec = taskEl.closest('[data-pyex]');
    if(sec){
      var solved = (block.tasks||[]).filter(function(_, i){ return pyTaskSolved(lessonId, i); }).length;
      var sp = sec.querySelector('[data-pyscore]');
      if(sp) sp.textContent = solved+' de '+(block.tasks||[]).length+' tareas resueltas';
    }
  } else {
    pyTaskOut(taskEl, '<div class="sqlno">❌ Aún no. '+esc(why)+' Compara tu salida con lo pedido y corrige: no hay castigo.</div>' + ((r && r.ok) ? pyOutHtml(r.output) : (r && r.output ? pyOutHtml(r.output) : '')));
  }
}

/* ---------- playground ---------- */
function pgDefaultCode(){
  return "// Tu laboratorio C# para Unity\nvar heroe = \"Ada\";\nfor (int i = 1; i <= 3; i++) {\n  Console.WriteLine($\"{i}. ¡Hola, {heroe}!\");\n}\n\nRandom.InitState(1);\nint oro = Random.Range(5, 20);\nConsole.WriteLine($\"Botín del cofre: {oro} monedas\");";
}
function pyRenderOut(){
  var out = document.getElementById('pgOut');
  if(!out) return;
  var ta = document.getElementById('pgEditor');
  var code = ta ? ta.value : '';
  if(state.play !== code){ state.play = code; saveState(); }
  var inBox = document.getElementById('pgStdin');
  if(inBox && state.playIn !== inBox.value){ state.playIn = inBox.value; saveState(); }
  if(!code.trim()){ out.innerHTML = '<div class="sqlmsg">✍️ Escribe un programa y presiona ▶ Ejecutar.</div>'; return; }
  var inputs = [];
  if(inBox && inBox.value.trim() !== '') inputs = inBox.value.replace(/\r/g,'').split('\n');
  var r = UCS.run(code, { stdin: inputs });
  out.innerHTML = r.ok ? pyOutHtml(r.output) : pyErrorHtml(r.error) + (r.output ? pyOutHtml(r.output) : '');
}
function viewProject(){
  EDITOR_CODES = [];
  if(!state.play) state.play = pgDefaultCode();
  var chips = [
    'Debug.Log("¡Hola, Unity!");',
    'for (int i = 0; i < 5; i++) {\n  Console.WriteLine(i * i);\n}',
    'int n = int.Parse(Console.ReadLine());\nConsole.WriteLine($"Tu nivel: {n}");',
    'var inv = new List<string>();\ninv.Add("pocion");\ninv.Add("llave");\nConsole.WriteLine(inv.Count);',
    'Random.InitState(7);\nfor (int i = 0; i < 3; i++) {\n  Console.WriteLine(Random.Range(1, 6));\n}'
  ];
  return '<div class="view">'+
    '<h1 style="font-size:28px">🛝 Playground C#</h1>'+
    '<p class="lead-text">Tu laboratorio libre: un <b>mini-interpreter de C#</b> corriendo en tu navegador. Escribe programas completos (ciclos, métodos, clases, List, Vector3, Random con semilla), dales entradas con el cuadro ⌨️ y ejecuta. Tu código guardado persiste en tu cuenta.</p>'+
    '<div class="pgwrap">'+
      '<div class="pgleft">'+
        '<textarea id="pgEditor" class="pyta pgta" spellcheck="false" autocomplete="off">'+esc(state.play)+'</textarea>'+
        '<div class="pystdin-wrap"><label class="pystdin-label">⌨️ Entradas (una por línea, para Console.ReadLine):</label>'+
        '<textarea id="pgStdin" class="pystdin" spellcheck="false" rows="2">'+esc(state.playIn||'')+'</textarea></div>'+
        '<div class="sqlbtns">'+
          '<button type="button" class="btn" data-ucsaction="pg-run">▶ Ejecutar</button>'+
          '<button type="button" class="btn ghost" data-ucsaction="pg-clear">🧹 Limpiar salida</button>'+
        '</div>'+
        '<div class="pgchips">'+chips.map(function(c){ return '<button type="button" class="chipq" data-ucsaction="pg-chip" data-q="'+esc(c)+'">'+esc(c.replace(/\s+/g,' ').slice(0,30))+'…</button>'; }).join('')+'</div>'+
        '<div id="pgOut"></div>'+
      '</div>'+
      '<div class="pgright">'+
        '<h3 class="quiz-title">📋 Chuleta rápida</h3>'+
        '<div class="pgcheat">'+
        '<p><code>Console.WriteLine("texto") · Debug.Log(x)</code></p>'+
        '<p><code>int n = int.Parse(Console.ReadLine());</code></p>'+
        '<p><code>if (cond) { … } else if (…) { … } else { … }</code></p>'+
        '<p><code>while (cond) { … } · for (int i = 0; i &lt; 5; i++) { … }</code></p>'+
        '<p><code>break · continue</code></p>'+
        '<p><code>int[] a = {1,2,3} · a[0] · a.Length</code></p>'+
        '<p><code>var l = new List&lt;int&gt;(); l.Add(x); l.Count</code></p>'+
        '<p><code>int Doble(int x) { return x * 2; }</code></p>'+
        '<p><code>class Slime { public int Vida; … }</code></p>'+
        '<p><code>$"Vida: {v:F2}"</code></p>'+
        '<p><code>try { … } catch (FormatException e) { … } finally { … }</code></p>'+
        '<p><code>Random.InitState(7); Random.Range(1, 6)</code></p>'+
        '</div>'+
        '<details class="pgnote"><summary>ℹ️ ¿Cómo funciona este interpreter?</summary><p>Es un mini-interpreter de C# escrito en JavaScript: lee tu programa, lo parsea (llaves, punto y coma, tipos) y lo ejecuta paso a paso. Errores en español con número de línea y código CS real (CS1002, CS0103…), excepciones con nombre real (FormatException, NullReferenceException, StackOverflowException…) y detector de ciclos infinitos. Cubre lo del curso: top-level statements, arrays, List&lt;T&gt;, métodos, clases, Vector3, Mathf, Random y try/catch. No soporta: LINQ, generics propios, interfaces, async.</p></details>'+
      '</div>'+
    '</div>'+
    '<div class="navbtns">'+
    '<button class="btn ghost" data-nav="lesson" data-id="0-2">← Lección: el laboratorio</button>'+
    '<button class="btn" data-nav="report">📄 Ver mi boleta →</button></div>'+
    '</div>';
}

/* ---------- diagramas de flujo ---------- */
var FLOWS = {
  ifelse: { title:'Flujo de un if / else if / else', svg:
    '<svg viewBox="0 0 300 380" class="flowsvg" role="img" aria-label="Diagrama de flujo de if/else if/else">'
    + '<defs><marker id="arrU1" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#64748b"/></marker></defs>'
    + '<rect x="105" y="10" width="90" height="34" rx="10" fill="#eef2ff" stroke="#6366f1" stroke-width="2"/><text x="150" y="32" text-anchor="middle" font-size="13" font-weight="700" fill="#3730a3">llega al if</text>'
    + '<line x1="150" y1="44" x2="150" y2="66" stroke="#64748b" stroke-width="2" marker-end="url(#arrU1)"/>'
    + '<polygon points="150,70 235,105 150,140 65,105" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/><text x="150" y="110" text-anchor="middle" font-size="12.5" font-weight="700" fill="#713f12">¿condición 1?</text>'
    + '<line x1="235" y1="105" x2="282" y2="105" stroke="#64748b" stroke-width="2" marker-end="url(#arrU1)"/>'
    + '<rect x="230" y="88" width="66" height="34" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="263" y="110" text-anchor="middle" font-size="11.5" font-weight="700" fill="#14532d">bloque 1</text>'
    + '<text x="253" y="82" text-anchor="middle" font-size="11" fill="#16a34a" font-weight="800">Verdadero</text>'
    + '<line x1="150" y1="140" x2="150" y2="166" stroke="#64748b" stroke-width="2" marker-end="url(#arrU1)"/>'
    + '<text x="163" y="160" font-size="11" fill="#64748b" font-weight="800">Falso</text>'
    + '<polygon points="150,170 235,205 150,240 65,205" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/><text x="150" y="210" text-anchor="middle" font-size="12.5" font-weight="700" fill="#713f12">¿condición 2?</text>'
    + '<line x1="235" y1="205" x2="282" y2="205" stroke="#64748b" stroke-width="2" marker-end="url(#arrU1)"/>'
    + '<rect x="230" y="188" width="66" height="34" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="263" y="210" text-anchor="middle" font-size="11.5" font-weight="700" fill="#14532d">bloque 2</text>'
    + '<text x="253" y="182" text-anchor="middle" font-size="11" fill="#16a34a" font-weight="800">Verdadero</text>'
    + '<line x1="150" y1="240" x2="150" y2="266" stroke="#64748b" stroke-width="2" marker-end="url(#arrU1)"/>'
    + '<text x="163" y="260" font-size="11" fill="#64748b" font-weight="800">Falso</text>'
    + '<rect x="98" y="270" width="104" height="34" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/><text x="150" y="292" text-anchor="middle" font-size="12" font-weight="700" fill="#7f1d1d">else: bloque final</text>'
    + '<line x1="150" y1="304" x2="150" y2="330" stroke="#64748b" stroke-width="2" marker-end="url(#arrU1)"/>'
    + '<rect x="88" y="334" width="124" height="32" rx="10" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/><text x="150" y="355" text-anchor="middle" font-size="12" font-weight="700" fill="#334155">sigue el programa</text>'
    + '</svg>' },
  forloop: { title:'Flujo de un for (init; condición; paso)', svg:
    '<svg viewBox="0 0 300 400" class="flowsvg" role="img" aria-label="Diagrama de flujo de un ciclo for">'
    + '<defs><marker id="arrU2" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#64748b"/></marker></defs>'
    + '<rect x="90" y="10" width="120" height="34" rx="10" fill="#eef2ff" stroke="#6366f1" stroke-width="2"/><text x="150" y="32" text-anchor="middle" font-size="12.5" font-weight="700" fill="#3730a3">init (int i = 0)</text>'
    + '<line x1="150" y1="44" x2="150" y2="70" stroke="#64748b" stroke-width="2" marker-end="url(#arrU2)"/>'
    + '<polygon points="150,74 245,114 150,154 55,114" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/><text x="150" y="120" text-anchor="middle" font-size="12.5" font-weight="700" fill="#713f12">¿i &lt; 3 ?</text>'
    + '<line x1="245" y1="114" x2="285" y2="114" stroke="#64748b" stroke-width="2" marker-end="url(#arrU2)"/>'
    + '<text x="252" y="100" text-anchor="middle" font-size="11" fill="#dc2626" font-weight="800">Falso</text>'
    + '<rect x="235" y="97" width="62" height="34" rx="8" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/><text x="266" y="119" text-anchor="middle" font-size="11.5" font-weight="700" fill="#334155">se sale</text>'
    + '<line x1="150" y1="154" x2="150" y2="186" stroke="#64748b" stroke-width="2" marker-end="url(#arrU2)"/>'
    + '<text x="163" y="176" font-size="11" fill="#16a34a" font-weight="800">Verdadero</text>'
    + '<rect x="88" y="190" width="124" height="44" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="150" y="210" text-anchor="middle" font-size="12" font-weight="700" fill="#14532d">cuerpo del ciclo</text><text x="150" y="226" text-anchor="middle" font-size="11" fill="#166534">(imprime, acumula, golpea…)</text>'
    + '<line x1="150" y1="234" x2="150" y2="266" stroke="#64748b" stroke-width="2" marker-end="url(#arrU2)"/>'
    + '<rect x="90" y="270" width="120" height="34" rx="10" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/><text x="150" y="292" text-anchor="middle" font-size="12.5" font-weight="700" fill="#075985">paso (i++)</text>'
    + '<path d="M 150 304 L 150 334 L 38 334 L 38 114 L 51 114" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrU2)"/>'
    + '<text x="28" y="228" text-anchor="middle" font-size="11" fill="#64748b" font-weight="800">vuelve a la condición</text>'
    + '<path d="M 266 131 L 266 362 L 216 362" fill="none" stroke="#64748b" stroke-width="2" marker-end="url(#arrU2)"/>'
    + '<rect x="88" y="346" width="124" height="32" rx="10" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/><text x="150" y="367" text-anchor="middle" font-size="12" font-weight="700" fill="#334155">sigue el programa</text>'
    + '</svg>' }
};
function flowHtml(b){
  var f = FLOWS[b.flow];
  if(!f) return '';
  return '<div class="erwrap">'+f.svg+'<p class="sql-note">'+(b.h||f.title)+'</p></div>';
}

/* ---------- eventos delegados del módulo Unity ---------- */
document.addEventListener('click', function(ev){
  var el = ev.target.closest ? ev.target.closest('[data-ucsaction]') : null;
  if(!el) return;
  var act = el.getAttribute('data-ucsaction');
  try{
    if(act === 'run') pyActionRun(el);
    else if(act === 'grade') pyActionGrade(el);
    else if(act === 'clear'){
      var lessonId = el.getAttribute('data-lesson'), ti = Number(el.getAttribute('data-ti'));
      var ta = pyGetTa(lessonId, ti);
      if(ta){ ta.value = ''; ta.focus(); }
      var taskEl = el.closest('.pytask'); if(taskEl) pyTaskOut(taskEl, '');
    }
    else if(act === 'pg-run'){ pyRenderOut(); }
    else if(act === 'pg-clear'){
      var out = document.getElementById('pgOut');
      if(out) out.innerHTML = '<div class="sqlmsg">🧹 Salida limpia. Ejecuta de nuevo cuando quieras.</div>';
    }
    else if(act === 'pg-chip'){
      var ta2 = document.getElementById('pgEditor');
      if(ta2){ ta2.value = el.getAttribute('data-q') || ''; pyRenderOut(); }
    }
  }catch(e){ try{ console.error('[ucs]', e); }catch(e2){} }
});
