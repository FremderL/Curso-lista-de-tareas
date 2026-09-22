/* Validador de contenido: ejecuta cada solución sqlex contra db fresca
   y califica con SQLE.gradeResult. También valida el EXAMEN (30q/300pts). */
const fs = require('fs'), path = require('path'), vm = require('vm');
const SQLE = require('/home/user/sql_parts/sql_engine.js');
const SQLE_DB_FRESH = require('/home/user/sql_parts/db.js');

const a = fs.readFileSync('/home/user/sql_parts/content_a.js', 'utf8');
const b = fs.readFileSync('/home/user/sql_parts/content_b.js', 'utf8');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(a + '\n' + b + '\n;globalThis.__OUT={MODULES, EXAM};', ctx);
const { MODULES, EXAM } = ctx.__OUT;

let pass = 0, fail = 0; const fails = [];
const log = s => console.log(s);

/* ---- gradeTask: envoltorio EXACTO que usará sql.html ---- */
function colsMatch(spec, gotCols){
  if(spec.length !== gotCols.length) return 'Tu consulta devuelve '+gotCols.length+' columna(s) ('+gotCols.join(', ')+'); se esperaban '+spec.length+' ('+spec.map(s=>Array.isArray(s)?s[0]:s).join(', ')+').';
  for(let i=0;i<spec.length;i++){
    const alts = Array.isArray(spec[i]) ? spec[i] : [spec[i]];
    const gl = String(gotCols[i]).toLowerCase().trim();
    if(!alts.some(a2 => String(a2).toLowerCase().trim() === gl)) return 'La columna '+(i+1)+' debía llamarse «'+(Array.isArray(spec[i])?spec[i][0]:spec[i])+'» y se llamó «'+gotCols[i]+'».';
  }
  return true;
}
function gradeTask(check, got){
  if(!got) return {ok:false, why:'Tu consulta no produjo resultados.'};
  if(typeof check.rows === 'number'){
    if(got.rows.length !== check.rows) return {ok:false, why:'Tu consulta devuelve '+got.rows.length+' fila(s); se esperaban '+check.rows+'.'};
    if(check.cols){ const c=colsMatch(check.cols, got.cols); if(c!==true) return {ok:false, why:c}; }
    return {ok:true};
  }
  if(Array.isArray(check.rows)){
    if(check.cols){ const c=colsMatch(check.cols, got.cols); if(c!==true) return {ok:false, why:c}; }
    return SQLE.gradeResult({cols: got.cols, rows: check.rows}, got, {orderInsensitive: check.orderInsensitive !== false});
  }
  return {ok:false, why:'Tarea mal configurada (rows).'};
}

function runTask(mod, les, t, ti, task) {
  const cat = SQLE_DB_FRESH();
  const r = SQLE.exec(cat, task.solution);
  if (task.check && task.check.expectError) {
    if (r.ok) { fail++; fails.push(`${mod}/${les} t${ti+1}: esperaba ERROR(${task.check.expectError}) pero OK`); return; }
    if (!r.error.includes(task.check.expectError)) { fail++; fails.push(`${mod}/${les} t${ti+1}: error distinto → "${r.error}" (esperaba contener "${task.check.expectError}")`); return; }
    pass++; return;
  }
  if (task.check && task.check.expectMessage) {
    if (!r.ok) { fail++; fails.push(`${mod}/${les} t${ti+1}: esperaba mensaje pero error → ${r.error}`); return; }
    const msg = (r.messages || []).join(' ');
    if (!msg.includes(task.check.expectMessage)) { fail++; fails.push(`${mod}/${les} t${ti+1}: mensajes=${JSON.stringify(r.messages)} no contiene "${task.check.expectMessage}"`); return; }
    pass++; return;
  }
  if (!r.ok) { fail++; fails.push(`${mod}/${les} t${ti+1}: SOLUTION FALLA → ${r.error}`); return; }
  const last = r.results[r.results.length - 1];
  const g = gradeTask(task.check, last);
  if (g.ok) pass++;
  else {
    fail++;
    const exp = task.check && task.check.rows;
    let expS = '';
    if (Array.isArray(exp)) expS = (exp.length <= 4 ? JSON.stringify(exp) : `${exp.length} filas: ` + JSON.stringify(exp.slice(0, 2)) + '…');
    else expS = String(exp);
    fails.push(`${mod}/${les} t${ti+1}: GRADE ${g.why} | esperado=${expS} | obtenido=${last.rows.length <= 4 ? JSON.stringify(last.rows) : last.rows.length + ' filas: ' + JSON.stringify(last.rows.slice(0, 2)) + '…'} | cols=${JSON.stringify(last.cols)}`);
  }
}

log('=== TAREAS SQLEX ===');
let nTasks = 0, nQuiz = 0;
for (const m of MODULES) for (const l of m.lessons) {
  for (const b of (l.blocks || [])) {
    if (b.t === 'quiz') nQuiz += (b.questions || []).length;
    if (b.t === 'sqlex') (b.tasks || []).forEach((task, i) => { nTasks++; runTask(m.id, l.id, b, i, task); });
  }
}
log(`sqlex: ${pass} OK, ${fail} FALLO de ${nTasks} tareas · quiz: ${nQuiz} preguntas`);
fails.forEach(f => log('  ✗ ' + f));

log('\n=== EXAMEN ===');
if (!EXAM) { log('  ✗ EXAM no accesible'); process.exit(1); }
const q = EXAM.questions;
const pts = q.reduce((s, x) => s + (x.pts || 0), 0);
log(`preguntas=${q.length} pts=${pts}`);
if (q.length !== 30) log('  ✗ deben ser 30');
if (pts !== 300) log('  ✗ deben sumar 300');
const types = {}; q.forEach(x => types[x.type] = (types[x.type] || 0) + 1);
log(`tipos=${JSON.stringify(types)}`);
q.forEach((x, i) => {
  if (x.type === 'mc' && (!x.options || x.options.length < 2 || x.correct == null || x.correct >= x.options.length)) log(`  ✗ q${i + 1} mc mal formada`);
  if (x.type === 'tf' && (!x.options || x.options.length !== 2)) log(`  ✗ q${i + 1} tf sin 2 opciones`);
  if (x.type === 'fill' && (!x.accept || !x.accept.length)) log(`  ✗ q${i + 1} fill sin accept`);
  if (!x.explain || !x.pts) log(`  ✗ q${i + 1} sin explain/pts`);
});

log('\n=== COBERTURA ===');
MODULES.forEach(m => log(`${m.id} ${m.name}: ${m.lessons.length} lecciones`));
