/* ============================================================
   CURSO 6 UNREAL · capa de aplicación
   Editor de nodos BPX (arrastrar, cables, ejecutar, calificar),
   demos estáticos, playground persistente.
   Requiere: BPX, LESSONS_BY_ID, state/saveState/updateChrome/
   renderSidebar/confetti/esc/$/$$
   ============================================================ */

/* ---------- ajuste de SPEC: el tipo de variable es editable ---------- */
(function(){
  BPX.SPEC.setvar.props[1] = { k:'type', def:'int', choices:['int','float','bool','string','array'], label:'Tipo' };
  BPX.SPEC.getvar.props[1] = { k:'type', def:'int', choices:['int','float','bool','string','array'], label:'Tipo' };
})();

/* ---------- registro de grafos en vivo ---------- */
var WORKING_GRAPHS = {};
var PENDING_PIN = null;   /* {key, node, pin} */
var DEMO_SEQ = 0;

function cloneG(g){ return JSON.parse(JSON.stringify(g)); }
function ueNodeById(g, id){ for(var i=0;i<g.nodes.length;i++) if(String(g.nodes[i].id) === String(id)) return g.nodes[i]; return null; }
function ueNextId(g){ var mx = 0; g.nodes.forEach(function(n){ var v = parseInt(n.id,10); if(!isNaN(v) && v > mx) mx = v; }); return String(mx+1); }
function ueVarType(n){ var t = (n.props && n.props.type) || 'int'; return ['int','float','bool','string','array'].indexOf(t)>=0 ? t : 'int'; }
function uePinKind(node, pin, dir){
  var s = BPX.SPEC[node.type]; if(!s) return null;
  if(dir === 'in'){
    if(s.execIn === pin) return 'exec';
    if(s.dIn && Object.prototype.hasOwnProperty.call(s.dIn, pin)) return s.dIn[pin]==='auto' ? ueVarType(node) : s.dIn[pin];
    return null;
  }
  if(s.execOut && s.execOut.indexOf(pin) >= 0) return 'exec';
  if(s.dOut && Object.prototype.hasOwnProperty.call(s.dOut, pin)) return s.dOut[pin]==='auto' ? ueVarType(node) : s.dOut[pin];
  if(s.ctxOut){ for(var ep in s.ctxOut){ if(Object.prototype.hasOwnProperty.call(s.ctxOut[ep], pin)) return s.ctxOut[ep][pin]; } }
  return null;
}
var PIN_LABEL_IN = { in:'ejecutar', cond:'Condición', text:'Texto', a:'A', b:'B', first:'Primero', last:'Último', array:'Array', index:'Índice', value:'Valor', item:'Elemento' };
var PIN_LABEL_OUT = { then:'Entonces', true:'True', false:'False', then0:'Then 0', then1:'Then 1', body:'Cuerpo', completed:'Completado', a:'A', b:'B', value:'Valor', result:'Resultado', length:'Length', array:'Array', isA:'Is A', index:'Index', element:'Element', array_index:'Array Index' };

/* ---------- auto-layout por capas BFS ---------- */
function ueAutoLayout(g){
  var adj = {}, depth = {}, queue = [];
  g.nodes.forEach(function(n){ depth[n.id] = null; });
  g.wires.forEach(function(w){
    var fp = String(w.from).split('.'), tp = String(w.to).split('.');
    var fo = uePinKind(ueNodeById(g,fp[0]), fp[1], 'out');
    if(fo === 'exec'){ (adj[fp[0]] = adj[fp[0]] || []).push(tp[0]); }
  });
  g.nodes.forEach(function(n){ if(n.type === 'event_beginplay' || n.type === 'event_custom'){ depth[n.id] = 0; queue.push(n.id); } });
  while(queue.length){
    var cur = queue.shift();
    (adj[cur] || []).forEach(function(nx){
      if(depth[nx] == null || depth[nx] < depth[cur] + 1){ depth[nx] = depth[cur] + 1; queue.push(nx); }
    });
  }
  var mx = 0, row = {};
  g.nodes.forEach(function(n){ if(depth[n.id] == null) depth[n.id] = -1; });
  g.nodes.forEach(function(n){ if(depth[n.id] > mx) mx = depth[n.id]; });
  g.nodes.forEach(function(n){
    var d = depth[n.id] === -1 ? mx + 1 : depth[n.id];
    n.x = 16 + d * 232;
    n.y = 16 + (row[d] || 0) * 148; row[d] = (row[d] || 0) + 1;
  });
  return g;
}

/* ---------- render de un nodo ---------- */
function escAttr(v){ return esc(String(v == null ? '' : v)).replace(/"/g,'&quot;'); }
function uePinHtml(node, pin, dir){
  var kind = uePinKind(node, pin, dir);
  var label = (dir === 'in' ? PIN_LABEL_IN : PIN_LABEL_OUT)[pin] || pin;
  if(kind === 'exec') return '<span class="bppin exec" data-pin="'+node.id+'.'+pin+':'+dir+'" title="'+label+'"></span><span class="bpplabel">'+label+'</span>';
  var col = BPX.PIN_COLORS[kind] || '#cbd5e1';
  return '<span class="bppin data" data-pin="'+node.id+'.'+pin+':'+dir+'" style="background:'+col+'" title="'+kind+'"></span><span class="bpplabel">'+label+'</span>';
}
function uePropEditor(node, p){
  var v = (node.props[p.k] !== undefined) ? node.props[p.k] : p.def;
  var d = 'data-node-id="'+node.id+'" data-prop="'+p.k+'"';
  if(p.hidden) return '';
  if(p.choices){
    var opts = p.choices.map(function(c){ return '<option value="'+escAttr(c)+'"'+(String(v)===String(c)?' selected':'')+'>'+esc(c)+'</option>'; }).join('');
    return '<label class="bpped"><span>'+esc(p.label||p.k)+'</span><select class="bpinput" '+d+'>'+opts+'</select></label>';
  }
  if(p.kind === 'bool'){
    return '<label class="bpped"><span>'+esc(p.label||p.k)+'</span><select class="bpinput" '+d+'><option value="true"'+(v===true?' selected':'')+'>true</option><option value="false"'+(v===false?' selected':'')+'>false</option></select></label>';
  }
  if(p.kind === 'array'){
    var txt = (Array.isArray(v) ? v : []).map(function(x){ return String(x); }).join(', ');
    return '<label class="bpped"><span>elementos (coma)</span><input class="bpinput" type="text" '+d+' value="'+escAttr(txt)+'" placeholder="a, b, c"></label>';
  }
  var type = (p.kind === 'int' || p.kind === 'float') ? 'number step="any"' : 'text';
  return '<label class="bpped"><span>'+esc(p.label||p.k)+'</span><input class="bpinput" type="'+type+'" '+d+' value="'+escAttr(v)+'"></label>';
}
function ueNodeHtml(node, interactive){
  var s = BPX.SPEC[node.type];
  var h = '<div class="bpnode" data-node-id="'+escAttr(node.id)+'" style="left:'+Math.round(node.x||16)+'px;top:'+Math.round(node.y||16)+'px">';
  h += '<div class="bpn-head">'+(s.emoji||'▪️')+' <span>'+esc(s.title)+'</span>';
  if(interactive) h += ' <button type="button" class="bpdel" data-bpx="del" data-node-id="'+escAttr(node.id)+'" title="Eliminar nodo">🗑️</button>';
  h += '</div>';
  var editors = interactive ? s.props.map(function(p){ return uePropEditor(node, p); }).join('') : '';
  if(editors) h += '<div class="bpn-body">'+editors+'</div>';
  else if(s.desc) h += '<div class="bpn-desc">'+esc(s.desc)+'</div>';
  /* pines */
  var inPins = [], outPins = [];
  if(s.execIn) inPins.push(uePinHtml(node, s.execIn, 'in'));
  Object.keys(s.dIn || {}).forEach(function(k){ inPins.push(uePinHtml(node, k, 'in')); });
  (s.execOut || []).forEach(function(k){ outPins.push(uePinHtml(node, k, 'out')); });
  Object.keys(s.dOut || {}).forEach(function(k){ outPins.push(uePinHtml(node, k, 'out')); });
  if(s.ctxOut){ Object.keys(s.ctxOut).forEach(function(ep){ Object.keys(s.ctxOut[ep]).forEach(function(k){ outPins.push(uePinHtml(node, k, 'out')); }); }); }
  h += '<div class="bpn-pins"><div class="bpn-col">'+inPins.map(function(x){ return '<div class="bpprow in">'+x+'</div>'; }).join('')+'</div>'+
       '<div class="bpn-col right">'+outPins.map(function(x){ return '<div class="bpprow out">'+x+'</div>'; }).join('')+'</div></div>';
  h += '</div>';
  return h;
}

/* ---------- render del lienzo ---------- */
function ueCanvasInner(g, interactive){
  return '<svg class="bpwires" width="100%" height="100%"></svg>' +
    g.nodes.map(function(n){ return ueNodeHtml(n, interactive); }).join('');
}
function ueMountCanvas(container, key, g, interactive){
  WORKING_GRAPHS[key] = g;
  var el = container.querySelector('.bpcanvas');
  el.dataset.canvas = key;
  el.classList.toggle('bpstatic', !interactive);
  el.style.height = Math.max(210, g.nodes.reduce(function(m,n){ return Math.max(m, (n.y||0) + 170); }, 0)) + 'px';
  el.innerHTML = ueCanvasInner(g, interactive);
  ueDrawWires(el);
  return el;
}
function ueDrawWires(canvasEl){
  var key = canvasEl.dataset.canvas, g = WORKING_GRAPHS[key];
  var svg = canvasEl.querySelector('.bpwires');
  if(!g || !svg) return;
  var cr = canvasEl.getBoundingClientRect();
  svg.setAttribute('width', canvasEl.offsetWidth); svg.setAttribute('height', canvasEl.offsetHeight);
  var paths = '';
  g.wires.forEach(function(w){
    var fp = String(w.from).split('.'), tp = String(w.to).split('.');
    var pe = canvasEl.querySelector('[data-pin="'+escAttr(w.from)+':out"]');
    var pi = canvasEl.querySelector('[data-pin="'+escAttr(w.to)+':in"]');
    if(!pe || !pi) return;
    var a = pe.getBoundingClientRect(), b = pi.getBoundingClientRect();
    var x1 = a.left + a.width/2 - cr.left, y1 = a.top + a.height/2 - cr.top;
    var x2 = b.left + b.width/2 - cr.left, y2 = b.top + b.height/2 - cr.top;
    var fo = uePinKind(ueNodeById(g,fp[0]), fp[1], 'out');
    var col = fo === 'exec' ? '#e2e8f0' : (BPX.PIN_COLORS[fo] || '#cbd5e1');
    var dx = Math.max(40, Math.abs(x2-x1)/2);
    paths += '<path d="M '+x1+' '+y1+' C '+(x1+dx)+' '+y1+', '+(x2-dx)+' '+y2+', '+x2+' '+y2+'" fill="none" stroke="'+col+'" stroke-width="2.5" opacity="0.9"/>';
  });
  if(PENDING_PIN && PENDING_PIN.key === key){
    var pe2 = canvasEl.querySelector('[data-pin="'+PENDING_PIN.node+'.'+PENDING_PIN.pin+':out"]');
    if(pe2){ pe2.classList.add('pending'); }
  }
  svg.innerHTML = paths;
}

/* ---------- tareas bpex ---------- */
function ueTaskKey(lessonId, ti){ return lessonId + '#' + ti; }
function ueTaskSolved(lessonId, ti){ return !!(state.ueOk && state.ueOk[ueTaskKey(lessonId, ti)]); }
function ueFindBlock(lessonId){
  var l = LESSONS_BY_ID[lessonId]; if(!l) return null;
  var blocks = l.blocks || [];
  for(var i=0;i<blocks.length;i++){ if(blocks[i].t === 'bpex') return blocks[i]; }
  return null;
}
function ueLessonScore(lessonId){
  var b = ueFindBlock(lessonId); if(!b) return null;
  var total = 0;
  (b.tasks||[]).forEach(function(tk, ti){ if(ueTaskSolved(lessonId, ti)) total += (tk.pts||10); });
  return total;
}
function ueDefaultGraph(){ return { nodes:[{id:'1',type:'event_beginplay',props:{},x:16,y:16}], wires:[] }; }
function ueExBlockHtml(b, lessonId){
  var h = '<section class="bpex" data-bpex="'+lessonId+'">';
  h += '<h3 class="quiz-title">'+(b.title||'🧪 Practica en el editor de Blueprints')+'</h3>';
  var solvedCount = 0;
  (b.tasks||[]).forEach(function(tk, ti){ if(ueTaskSolved(lessonId, ti)) solvedCount++; });
  h += '<p class="quiz-sub">Construye el grafo: arrastra nodos, conecta pines (clic en salida → clic en entrada) y dale <b>▶ Ejecutar</b>. Cuando la salida te convenza presiona <b>✓ Calificar</b>: se compara tu <b>salida</b> línea por línea.</p>';
  (b.tasks||[]).forEach(function(tk, ti){
    var solved = ueTaskSolved(lessonId, ti);
    h += '<div class="bptask'+(solved?' solved':'')+'" data-task="'+lessonId+'#'+ti+'">';
    h += '<div class="pyq"><span class="tnum">'+(ti+1)+'</span><span class="tq">'+tk.q+'</span><span class="qpts">'+(tk.pts||10)+' pts</span><span class="tst">'+(solved?'✓ resuelta':'')+'</span></div>';
    if(tk.hint) h += '<details class="pyhint"><summary>💡 Ver pista</summary><p>'+tk.hint+'</p></details>';
    h += '<details class="bppalette"><summary>➕ Añadir nodo (paleta)</summary><div class="bppalette-grid">'+
      Object.keys(BPX.SPEC).map(function(t){ return '<button type="button" class="chipq" data-bpx="add" data-type="'+t+'" data-lesson="'+lessonId+'" data-ti="'+ti+'">'+BPX.SPEC[t].emoji+' '+esc(BPX.SPEC[t].title)+'</button>'; }).join('')+
      '</div></details>';
    h += '<div class="bpcanvas-wrap" data-cwrap="'+lessonId+'#'+ti+'"><div class="bpcanvas"></div></div>';
    h += '<div class="sqlbtns">'+
      '<button type="button" class="btn small" data-bpx="run" data-lesson="'+lessonId+'" data-ti="'+ti+'">▶ Ejecutar</button>'+
      '<button type="button" class="btn small good" data-bpx="grade" data-lesson="'+lessonId+'" data-ti="'+ti+'">✓ Calificar</button>'+
      '<button type="button" class="btn ghost small" data-bpx="reset" data-lesson="'+lessonId+'" data-ti="'+ti+'">↺ Grafo inicial</button>'+
      '</div>';
    h += '<div class="sqlout" data-out></div>';
    h += '<details class="sqlsol"><summary>🔎 Ver solución (intenta primero de verdad)</summary><div class="bpcanvas-wrap"><div class="bpcanvas bpstatic-sol"></div></div></details>';
    h += '</div>';
  });
  h += '<div class="sqlscore" data-bpscore>'+solvedCount+' de '+(b.tasks||[]).length+' tareas resueltas</div>';
  h += '</section>';
  return h;
}
/* montar los lienzos de una lección tras insertar el HTML */
function ueMountLesson(lessonId){
  var b = ueFindBlock(lessonId); if(!b) return;
  document.querySelectorAll('[data-bpex="'+lessonId+'"] .bptask').forEach(function(taskEl){
    var ti = Number((taskEl.dataset.task||'').split('#')[1]);
    var task = (b.tasks||[])[ti]; if(!task) return;
    var key = ueTaskKey(lessonId, ti);
    var saved = (state.ueCode && state.ueCode[key]) ? JSON.parse(state.ueCode[key]) : null;
    var g = saved || cloneG(task.start || ueDefaultGraph());
    var wrap = taskEl.querySelector('[data-cwrap]');
    ueMountCanvas(wrap, key, g, true);
    var sol = taskEl.querySelector('.bpstatic-sol');
    if(sol){ ueMountCanvas(sol.parentElement, key + '::sol' + ti + '_' + (++DEMO_SEQ), cloneG(task.solution), false); }
  });
}
function ueTaskGraph(lessonId, ti){
  var key = ueTaskKey(lessonId, ti);
  return WORKING_GRAPHS[key] || null;
}
function ueRequireNodesMsg(graph, req){
  for(var i=0;i<req.length;i++){
    var found = graph.nodes.some(function(n){ return n.type === req[i]; });
    if(!found) return 'Tu grafo debe incluir un nodo «'+ (BPX.SPEC[req[i]] ? BPX.SPEC[req[i]].title : req[i]) +'».';
  }
  return null;
}
function ueRunGraph(graph){
  return BPX.run(graph);
}
function ueLogHtml(output){
  var lines = String(output == null ? '' : output).split('\n');
  if(lines.length && lines[lines.length-1] === '') lines.pop();
  var body = lines.length ? esc(lines.join('\n')) : '(sin salida)';
  return '<div class="bplog"><div class="bplog-head">Output Log</div><pre>'+body+'</pre></div>';
}
function ueActionRun(el){
  var lessonId = el.getAttribute('data-lesson'), ti = Number(el.getAttribute('data-ti'));
  var taskEl = el.closest('.bptask');
  var g = ueTaskGraph(lessonId, ti);
  if(!g || !g.nodes.length){ ueTaskOut(taskEl, '<div class="sqlmsg">🧩 Añade nodos con la paleta primero.</div>'); return; }
  var r = ueRunGraph(g);
  ueTaskOut(taskEl, r.ok ? ueLogHtml(r.output) : '<div class="bperr">'+esc(r.error)+'</div>');
}
function ueTaskOut(taskEl, html){
  var out = taskEl.querySelector('[data-out]');
  if(out) out.innerHTML = html;
}
function ueActionGrade(el){
  var lessonId = el.getAttribute('data-lesson'), ti = Number(el.getAttribute('data-ti'));
  var taskEl = el.closest('.bptask');
  var l = LESSONS_BY_ID[lessonId], task = null;
  (l.blocks||[]).forEach(function(b){ if(b.t==='bpex') task = (b.tasks||[])[ti]; });
  if(!task) return;
  var g = ueTaskGraph(lessonId, ti);
  if(!g || !g.nodes.length){ ueTaskOut(taskEl, '<div class="sqlmsg">🧩 Construye tu grafo primero.</div>'); return; }
  var ok = false, why = '', extra = '';
  var r = ueRunGraph(g);
  if(!r.ok){
    why = 'Tu grafo falló al ejecutar. ';
    extra = '<div class="bperr">'+esc(r.error)+'</div>';
  } else {
    var gr = BPX.gradeOutput(task.check.lines || [], r.output, {});
    if(!gr.ok){ why = gr.why || ''; extra = ueLogHtml(r.output); }
    else {
      var vn = task.check.requireNodes ? ueRequireNodesMsg(g, task.check.requireNodes) : null;
      var badVar = null;
      if(!vn && task.check.vars){
        Object.keys(task.check.vars).some(function(k){
          var exp = task.check.vars[k], got = r.vars ? r.vars[k] : undefined;
          var same = (typeof exp === 'number') ? (got === exp) : JSON.stringify(got) === JSON.stringify(exp);
          if(!same){ badVar = 'La variable '+k+' debía valer '+JSON.stringify(exp)+' y valió '+JSON.stringify(got)+'.'; return true; }
          return false;
        });
      }
      if(vn){ why = vn; extra = ueLogHtml(r.output); }
      else if(badVar){ why = badVar; extra = ueLogHtml(r.output); }
      else { ok = true; extra = ueLogHtml(r.output); }
    }
  }
  if(ok){
    if(!state.ueOk) state.ueOk = {};
    state.ueOk[ueTaskKey(lessonId, ti)] = 1;
    var sc = ueLessonScore(lessonId);
    if(sc != null && (state.scores[lessonId] == null || sc > state.scores[lessonId])) state.scores[lessonId] = sc;
    saveState(); updateChrome(); renderSidebar(parseHash());
    taskEl.classList.add('solved');
    var tst = taskEl.querySelector('.tst'); if(tst) tst.textContent = '✓ resuelta';
    var block = ueFindBlock(lessonId);
    var allOk = (block.tasks||[]).every(function(_, i){ return ueTaskSolved(lessonId, i); });
    ueTaskOut(taskEl, '<div class="sqlok">✅ ¡Salida exacta! '+extra+(allOk?' <b>¡Lección completada! 🎉</b>':'')+'</div>');
    try{ confetti(taskEl); }catch(e){}
    var sec = taskEl.closest('[data-bpex]');
    if(sec){
      var solved = (block.tasks||[]).filter(function(_, i){ return ueTaskSolved(lessonId, i); }).length;
      var sp = sec.querySelector('[data-bpscore]');
      if(sp) sp.textContent = solved+' de '+(block.tasks||[]).length+' tareas resueltas';
    }
  } else {
    ueTaskOut(taskEl, '<div class="sqlno">❌ Aún no. '+esc(why)+' Compara tu Output Log con lo pedido: no hay castigo.</div>' + extra);
  }
}
function ueActionReset(el){
  var lessonId = el.getAttribute('data-lesson'), ti = Number(el.getAttribute('data-ti'));
  var taskEl = el.closest('.bptask');
  var l = LESSONS_BY_ID[lessonId], task = null;
  (l.blocks||[]).forEach(function(b){ if(b.t==='bpex') task = (b.tasks||[])[ti]; });
  if(!task) return;
  var key = ueTaskKey(lessonId, ti);
  var g = cloneG(task.start || ueDefaultGraph());
  ueMountCanvas(taskEl.querySelector('[data-cwrap]'), key, g, true);
  delete (state.ueCode || {})[key];
  saveState();
  ueTaskOut(taskEl, '<div class="sqlmsg">↺ Grafo inicial restaurado.</div>');
}

/* ---------- demo estático (bloque t:'bp') ---------- */
function bpDemoHtml(b){
  var key = '_demo' + (++DEMO_SEQ);
  var g = (typeof DEMO_BP !== 'undefined' && DEMO_BP[b.g]) ? DEMO_BP[b.g] : null;
  if(!g) return '';
  return '<div class="erwrap"><div class="bpcanvas-wrap" data-demo="'+key+'"><div class="bpcanvas"></div></div>'+
    (b.h ? '<p class="sql-note">'+b.h+'</p>' : '')+'</div>';
}
function ueMountDemos(root){
  root.querySelectorAll('[data-demo]').forEach(function(wrap){
    var g = DEMO_BP[wrap.dataset.demo] || DEMO_BP[Object.keys(DEMO_BP)[0]];
    /* los demos guardan su grafo con clave temporal */
    var key = wrap.dataset.demo;
    WORKING_GRAPHS[key] = cloneG(g);
    var el = wrap.querySelector('.bpcanvas');
    el.dataset.canvas = key;
    el.classList.add('bpstatic');
    el.style.height = Math.max(190, g.nodes.reduce(function(m,n){ return Math.max(m, (n.y||0) + 170); }, 0)) + 'px';
    el.innerHTML = ueCanvasInner(g, false);
    ueDrawWires(el);
  });
}

/* ---------- vista nav (botón hacia el examen) ---------- */
function ueNavHtml(b){
  return '<div class="navbtns"><button class="btn" data-nav="'+esc(b.lesson||'exam')+'">'+esc(b.label||'Continuar →')+'</button></div>';
}

/* ---------- playground ---------- */
var PG_KEY = '::playground';
function ueDefaultPlayGraph(){
  return { nodes:[
    {id:'1',type:'event_beginplay',props:{},x:16,y:16},
    {id:'2',type:'print',props:{},x:248,y:16},
    {id:'3',type:'lit_string',props:{value:'¡Hola desde el playground!'},x:16,y:150}
  ], wires:[{from:'1.then',to:'2.in'},{from:'3.value',to:'2.text'}] };
}
function viewProject(){
  EDITOR_CODES = [];
  if(!state.playG){
    try{ ueAutoLayout(ueDefaultPlayGraph()); }catch(e){}
    state.playG = JSON.stringify(ueDefaultPlayGraph());
    saveState();
  }
  var g;
  try{ g = JSON.parse(state.playG); }catch(e){ g = ueDefaultPlayGraph(); }
  var chips = [
    { t:'Branch que decide', g:JSON.stringify({nodes:[{id:'1',type:'event_beginplay',props:{}},{id:'2',type:'branch',props:{}},{id:'3',type:'print',props:{}},{id:'4',type:'print',props:{}},{id:'5',type:'lit_bool',props:{value:true}},{id:'6',type:'lit_string',props:{value:'Sí'}},{id:'7',type:'lit_string',props:{value:'No'}}],wires:[{from:'1.then',to:'2.in'},{from:'2.true',to:'3.in'},{from:'2.false',to:'4.in'},{from:'5.value',to:'2.cond'},{from:'6.value',to:'3.text'},{from:'7.value',to:'4.text'}]}) },
    { t:'ForLoop 1..5', g:JSON.stringify({nodes:[{id:'1',type:'event_beginplay',props:{}},{id:'2',type:'forloop',props:{}},{id:'3',type:'print',props:{}}],wires:[{from:'1.then',to:'2.in'},{from:'2.body',to:'3.in'},{from:'2.index',to:'3.text'}]}) },
    { t:'ForEach de inventario', g:JSON.stringify({nodes:[{id:'1',type:'event_beginplay',props:{}},{id:'2',type:'foreach',props:{}},{id:'3',type:'print',props:{}},{id:'4',type:'make_array',props:{items:['espada','poción']}}],wires:[{from:'1.then',to:'2.in'},{from:'4.array',to:'2.array'},{from:'2.body',to:'3.in'},{from:'2.element',to:'3.text'}]}) },
    { t:'Custom Event', g:JSON.stringify({nodes:[{id:'1',type:'event_beginplay',props:{}},{id:'2',type:'call_custom',props:{target:'Saludo'}},{id:'3',type:'print',props:{}},{id:'4',type:'event_custom',props:{name:'Saludo'}},{id:'5',type:'print',props:{}},{id:'6',type:'lit_string',props:{value:'Dentro del evento'}},{id:'7',type:'lit_string',props:{value:'Fuera'}}],wires:[{from:'1.then',to:'2.in'},{from:'2.then',to:'3.in'},{from:'4.then',to:'5.in'},{from:'6.value',to:'5.text'},{from:'7.value',to:'3.text'}]}) }
  ];
  return '<div class="view">'+
    '<h1 style="font-size:28px">🛝 Playground de Blueprints</h1>'+
    '<p class="lead-text">Tu laboratorio libre: un <b>editor de Blueprints</b> en el navegador. Añade nodos con la paleta, conéctalos (clic en pin de salida → clic en pin de entrada; clic en un pin de entrada lo desconecta), arrastra los nodos y ejecuta. Tu grafo se guarda en tu cuenta.</p>'+
    '<div class="pgwrap"><div class="pgleft">'+
      '<details class="bppalette open"><summary>➕ Añadir nodo (paleta)</summary><div class="bppalette-grid">'+
      Object.keys(BPX.SPEC).map(function(t){ return '<button type="button" class="chipq" data-bpx="pg-add" data-type="'+t+'">'+BPX.SPEC[t].emoji+' '+esc(BPX.SPEC[t].title)+'</button>'; }).join('')+
      '</div></details>'+
      '<div class="bpcanvas-wrap"><div class="bpcanvas" id="pgCanvas"></div></div>'+
      '<div class="sqlbtns">'+
        '<button type="button" class="btn" data-bpx="pg-run">▶ Ejecutar</button>'+
        '<button type="button" class="btn ghost" data-bpx="pg-clear">🧹 Limpiar salida</button>'+
        '<button type="button" class="btn ghost" data-bpx="pg-reset">↺ Grafo de ejemplo</button>'+
      '</div>'+
      '<div class="pgchips">'+chips.map(function(c,i){ return '<button type="button" class="chipq" data-bpx="pg-chip" data-g="'+escAttr(c.g)+'">'+esc(c.t)+'</button>'; }).join('')+'</div>'+
      '<div id="pgOut"></div>'+
    '</div><div class="pgright">'+
      '<h3 class="quiz-title">📋 Chuleta rápida</h3>'+
      '<div class="pgcheat">'+
      '<p><b>⚪ flechas blancas</b> = orden de ejecución</p>'+
      '<p><b>🔴 bool</b> · <b>🟢 int</b> · <b>🟩 float</b> · <b>🟣 string</b></p>'+
      '<p>Conectar: clic en pin de <b>salida</b> → clic en pin de <b>entrada</b></p>'+
      '<p>Desconectar: clic sobre el pin de entrada conectado</p>'+
      '<p>ForLoop de 1 a 5 = <b>5 vueltas</b> (inclusivo)</p>'+
      '<p>10 / 4 con ints = <b>2</b> (trunca hacia cero)</p>'+
      '<p>Índices de array <b>desde 0</b>; último = Length − 1</p>'+
      '<p>Array Add devuelve un array nuevo → <b>guárdalo con Set</b></p>'+
      '<p>El Call ejecuta el evento y <b>regresa</b></p>'+
      '</div>'+
      '<details class="pgnote"><summary>ℹ️ ¿Cómo funciona este simulador?</summary><p>El motor BPX recorre tus flechas blancas paso a paso (con límite de pasos: detecta ciclos infinitos), evalúa los cables de datos y muestra los errores en español con el nodo culpable. Cubre el subconjunto de Blueprints del curso: eventos, flujo, variables, matemática, arrays y Custom Events.</p></details>'+
    '</div></div>'+
    '<div class="navbtns">'+
    '<button class="btn ghost" data-nav="lesson" data-id="0-2">← Lección: el editor</button>'+
    '<button class="btn" data-nav="report">📄 Ver mi boleta →</button></div>'+
    '</div>';
}
function ueMountPlayground(){
  var canvas = document.getElementById('pgCanvas');
  if(!canvas) return;
  var g;
  try{ g = JSON.parse(state.playG || 'null') || ueDefaultPlayGraph(); }catch(e){ g = ueDefaultPlayGraph(); }
  if(!g.nodes.length) g = ueDefaultPlayGraph();
  ueMountCanvas(canvas.parentElement || canvas, PG_KEY, g, true);
}
function ueSavePlay(){
  var g = WORKING_GRAPHS[PG_KEY];
  if(g){ state.playG = JSON.stringify(g); saveState(); }
}

/* ---------- eventos: clics ---------- */
function ueSaveCanvas(canvasEl){
  var key = canvasEl.dataset.canvas;
  if(!key || key.charAt(0) === '_' || key.indexOf('::') >= 0) return;
  var g = WORKING_GRAPHS[key]; if(!g) return;
  if(key === PG_KEY){ ueSavePlay(); return; }
  if(!state.ueCode) state.ueCode = {};
  state.ueCode[key] = JSON.stringify(g);
  saveState();
}
document.addEventListener('click', function(ev){
  var t = ev.target;
  var pinEl = t.closest ? t.closest('.bppin') : null;
  if(pinEl){
    var canvasEl = pinEl.closest('.bpcanvas');
    if(canvasEl && !canvasEl.classList.contains('bpstatic')){
      var parts = pinEl.getAttribute('data-pin').split(':');
      var np = parts[0].split('.'), dir = parts[1];
      var key = canvasEl.dataset.canvas, g = WORKING_GRAPHS[key];
      if(dir === 'out'){
        if(PENDING_PIN && PENDING_PIN.key === key && PENDING_PIN.node === np[0] && PENDING_PIN.pin === np[1]){ PENDING_PIN = null; ueDrawWires(canvasEl); return; }
        PENDING_PIN = { key:key, node:np[0], pin:np[1] };
        ueDrawWires(canvasEl);
        var hint = canvasEl.parentElement.parentElement.querySelector('.sqlmsg-hint');
        return;
      }
      /* pin de entrada */
      if(PENDING_PIN && PENDING_PIN.key === key){
        var fromNode = ueNodeById(g, PENDING_PIN.node);
        var toNode = ueNodeById(g, np[0]);
        var fo = fromNode ? uePinKind(fromNode, PENDING_PIN.pin, 'out') : null;
        var fi = toNode ? uePinKind(toNode, np[1], 'in') : null;
        if(!fromNode || !toNode){ PENDING_PIN = null; return; }
        var msg = null;
        if(fo === 'exec' && fi !== 'exec') msg = 'Una flecha de ejecución solo conecta con otra flecha blanca.';
        else if(fo !== 'exec' && fi === 'exec') msg = 'Un cable de datos no puede entrar a una flecha de ejecución.';
        else if(fo !== 'exec' && fi !== 'exec' && !BPX.coercible(fo, fi)) msg = 'Un pin '+fo+' no puede conectarse a un pin '+fi+(fi==='int'?' (usa To Int)':'')+'.';
        if(msg){
          ueCanvasHint(canvasEl, '⚠️ ' + msg);
        } else {
          /* reemplaza el cable previo de esa entrada */
          g.wires = g.wires.filter(function(w){ return w.to !== np[0]+'.'+np[1]; });
          g.wires.push({ from: PENDING_PIN.node+'.'+PENDING_PIN.pin, to: np[0]+'.'+np[1] });
          ueSaveCanvas(canvasEl);
          ueCanvasHint(canvasEl, null);
        }
        PENDING_PIN = null;
        ueDrawWires(canvasEl);
        return;
      }
      /* sin pendiente: desconectar si tiene cable */
      var before = g.wires.length;
      g.wires = g.wires.filter(function(w){ return w.to !== np[0]+'.'+np[1]; });
      if(g.wires.length !== before){ ueSaveCanvas(canvasEl); }
      ueDrawWires(canvasEl);
      return;
    }
  }
  var el = t.closest ? t.closest('[data-bpx]') : null;
  if(!el) return;
  var act = el.getAttribute('data-bpx');
  try{
    if(act === 'run') ueActionRun(el);
    else if(act === 'grade') ueActionGrade(el);
    else if(act === 'reset') ueActionReset(el);
    else if(act === 'del'){
      var canvasE = el.closest('.bpcanvas');
      var g2 = WORKING_GRAPHS[canvasE.dataset.canvas];
      var nid = el.getAttribute('data-node-id');
      g2.nodes = g2.nodes.filter(function(n){ return String(n.id) !== String(nid); });
      g2.wires = g2.wires.filter(function(w){ return String(w.from).split('.')[0] !== String(nid) && String(w.to).split('.')[0] !== String(nid); });
      if(PENDING_PIN && PENDING_PIN.node === nid) PENDING_PIN = null;
      canvasE.innerHTML = ueCanvasInner(g2, !canvasE.classList.contains('bpstatic'));
      ueDrawWires(canvasE);
      ueSaveCanvas(canvasE);
    }
    else if(act === 'add' || act === 'pg-add'){
      var canvasE2 = (act === 'pg-add') ? document.getElementById('pgCanvas') : el.closest('.bptask').querySelector('.bpcanvas');
      var key2 = canvasE2.dataset.canvas;
      var g3 = WORKING_GRAPHS[key2];
      var type = el.getAttribute('data-type');
      var id = ueNextId(g3);
      g3.nodes.push({ id:id, type:type, props:{}, x:24 + (g3.nodes.length % 5) * 26, y:24 + (g3.nodes.length % 5) * 24 });
      canvasE2.innerHTML = ueCanvasInner(g3, true);
      ueDrawWires(canvasE2);
      ueSaveCanvas(canvasE2);
    }
    else if(act === 'pg-run'){
      var out = document.getElementById('pgOut');
      var g4 = WORKING_GRAPHS[PG_KEY];
      if(!g4 || !g4.nodes.length){ out.innerHTML = '<div class="sqlmsg">🧩 Añade un Event BeginPlay y algún nodo.</div>'; return; }
      var r4 = BPX.run(g4);
      out.innerHTML = r4.ok ? ueLogHtml(r4.output) : '<div class="bperr">'+esc(r4.error)+'</div>';
    }
    else if(act === 'pg-clear'){
      var o2 = document.getElementById('pgOut');
      if(o2) o2.innerHTML = '<div class="sqlmsg">🧹 Salida limpia. Ejecuta de nuevo cuando quieras.</div>';
    }
    else if(act === 'pg-reset'){
      var canvasE3 = document.getElementById('pgCanvas');
      var g5 = ueDefaultPlayGraph();
      ueMountCanvas(canvasE3.parentElement, PG_KEY, g5, true);
      ueSavePlay();
      var o3 = document.getElementById('pgOut');
      if(o3) o3.innerHTML = '<div class="sqlmsg">↺ Grafo de ejemplo restaurado.</div>';
    }
    else if(act === 'pg-chip'){
      var canvasE4 = document.getElementById('pgCanvas');
      try{
        var g6 = JSON.parse(el.getAttribute('data-g'));
        ueMountCanvas(canvasE4.parentElement, PG_KEY, g6, true);
        ueSavePlay();
        var o4 = document.getElementById('pgOut');
        if(o4) o4.innerHTML = '<div class="sqlmsg">📋 Ejemplo cargado: pulsa ▶ Ejecutar.</div>';
      }catch(e){}
    }
  }catch(e){ try{ console.error('[bpx]', e); }catch(e2){} }
});
function ueCanvasHint(canvasEl, msg){
  var bar = canvasEl.parentElement.querySelector('.bphintbar');
  if(!bar){
    bar = document.createElement('div');
    bar.className = 'bphintbar';
    canvasEl.parentElement.insertBefore(bar, canvasEl);
  }
  bar.textContent = msg || '';
  bar.style.display = msg ? 'block' : 'none';
}

/* ---------- eventos: arrastrar nodos ---------- */
var DRAG = null;
document.addEventListener('mousedown', function(e){
  var head = e.target.closest ? e.target.closest('.bpn-head') : null;
  if(!head || e.target.closest('button,input,select')) return;
  var nodeEl = head.closest('.bpnode');
  var canvasEl = nodeEl.closest('.bpcanvas');
  if(!canvasEl || canvasEl.classList.contains('bpstatic')) return;
  var g = WORKING_GRAPHS[canvasEl.dataset.canvas];
  if(!g) return;
  var n = ueNodeById(g, nodeEl.dataset.nodeId);
  if(!n) return;
  DRAG = { canvasEl:canvasEl, nodeEl:nodeEl, n:n, sx:e.clientX, sy:e.clientY, ox:n.x||0, oy:n.y||0 };
  e.preventDefault();
});
document.addEventListener('mousemove', function(e){
  if(!DRAG) return;
  DRAG.n.x = Math.max(0, Math.round(DRAG.ox + e.clientX - DRAG.sx));
  DRAG.n.y = Math.max(0, Math.round(DRAG.oy + e.clientY - DRAG.sy));
  DRAG.nodeEl.style.left = DRAG.n.x + 'px';
  DRAG.nodeEl.style.top = DRAG.n.y + 'px';
  ueDrawWires(DRAG.canvasEl);
});
document.addEventListener('mouseup', function(){
  if(DRAG){ var c = DRAG.canvasEl; DRAG = null; ueSaveCanvas(c); }
});

/* ---------- eventos: edición de props ---------- */
document.addEventListener('change', function(e){
  var t = e.target;
  if(!t.matches || !t.matches('[data-prop]')) return;
  var canvasEl = t.closest('.bpcanvas'); if(!canvasEl) return;
  var g = WORKING_GRAPHS[canvasEl.dataset.canvas]; if(!g) return;
  var n = ueNodeById(g, t.getAttribute('data-node-id')); if(!n) return;
  var k = t.getAttribute('data-prop');
  var s = BPX.SPEC[n.type];
  var spec = (s.props || []).filter(function(p){ return p.k === k; })[0];
  var v = t.value;
  if(spec && spec.choices){
    if(spec.kind === 'bool') v = (v === 'true');
    else v = v;
  }
  else if(spec && spec.kind === 'bool') v = (v === 'true');
  else if(spec && spec.kind === 'array'){
    v = String(v).split(',').map(function(x){ x = x.trim(); if(/^-?\d+$/.test(x)) return parseInt(x,10); if(/^-?\d*\.\d+$/.test(x)) return parseFloat(x); return x; }).filter(function(x){ return x !== ''; });
  }
  else if(spec && (spec.kind === 'int')) v = (v === '' ? 0 : parseInt(v, 10));
  else if(spec && (spec.kind === 'float')) v = (v === '' ? 0 : parseFloat(v));
  n.props[k] = v;
  canvasEl.innerHTML = ueCanvasInner(g, !canvasEl.classList.contains('bpstatic'));
  ueDrawWires(canvasEl);
  ueSaveCanvas(canvasEl);
});

/* ---------- hook: montar lienzos al renderizar lecciones/playground ---------- */
(function(){
  var pending = null;
  function schedule(){ if(pending) clearTimeout(pending); pending = setTimeout(ueAfterRender, 40); }
  function init(){
    var c = document.getElementById('content');
    if(c && typeof MutationObserver !== 'undefined'){
      new MutationObserver(function(muts){
        for(var i=0;i<muts.length;i++){ if(muts[i].addedNodes.length || muts[i].removedNodes.length){ schedule(); break; } }
      }).observe(c, { childList:true, subtree:false });
    }
    schedule();
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
function ueAfterRender(){
  try{
    var route = parseHash();
    if(route && route.view === 'lesson' && route.id){ ueMountLesson(route.id); }
    if(route && route.view === 'project'){ ueMountPlayground(); }
    var content = document.getElementById('content');
    if(content) ueMountDemos(content);
    PENDING_PIN = null;
  }catch(e){ try{ console.error('[bpx-mount]', e); }catch(e2){} }
}
