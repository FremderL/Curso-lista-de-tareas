/* Validador de contenido Python: corre cada solución pyex con PYE y califica por salida.
   También valida estructura de quizzes y del examen (30×300). */
const fs = require('fs'), vm = require('vm');
const PYE = require('/home/user/python_parts/py_engine.js');

const a = fs.readFileSync('/home/user/python_parts/content_a.js', 'utf8');
const b = fs.readFileSync('/home/user/python_parts/content_b.js', 'utf8');
const ctx = {};
vm.createContext(ctx);
vm.runInContext('const MODULES = [];\n' + a + '\n' + b + '\n;globalThis.__OUT={MODULES, EXAM};', ctx);
const { MODULES, EXAM } = ctx.__OUT;

let pass = 0, fail = 0; const fails = [];
let nTasks = 0, nQuiz = 0;

function runTask(modId, lesId, task, ti){
  nTasks++;
  const wantVars = task.wantVars || Object.keys((task.check && task.check.vars) || {});
  const r = PYE.run(task.solution, { stdin: task.stdin || [], wantVars });
  if (task.check && task.check.expectError){
    if (r.ok){ fail++; fails.push(`${modId}/${lesId} t${ti+1}: esperaba ERROR(${task.check.expectError}) pero corrió OK`); return; }
    if (!r.error.includes(task.check.expectError)){ fail++; fails.push(`${modId}/${lesId} t${ti+1}: error distinto → ${r.error}`); return; }
    pass++; return;
  }
  if (!r.ok){ fail++; fails.push(`${modId}/${lesId} t${ti+1}: SOLUTION FALLA → ${r.error}`); return; }
  const g = PYE.gradeOutput(task.check.lines, r.output);
  if (!g.ok){
    fail++;
    const got = r.output.split('\n');
    fails.push(`${modId}/${lesId} t${ti+1}: ${g.why} | obtenido=${JSON.stringify(got.slice(0, 6))}`);
    return;
  }
  if (task.check && task.check.vars){
    for (const k of Object.keys(task.check.vars)){
      const got = r.vars[k], exp = task.check.vars[k];
      const same = (typeof exp === 'number') ? (got === exp) : JSON.stringify(got) === JSON.stringify(exp);
      if (!same){ fail++; fails.push(`${modId}/${lesId} t${ti+1}: var ${k} esperaba ${JSON.stringify(exp)} y hubo ${JSON.stringify(got)}`); return; }
    }
  }
  pass++;
}

console.log('=== TAREAS PYEX ===');
for (const m of MODULES){
  for (const l of m.lessons){
    for (const bl of (l.blocks || [])){
      if (bl.t === 'quiz') nQuiz += (bl.questions || []).length;
      if (bl.t === 'pyex') (bl.tasks || []).forEach((tk, i) => runTask(m.id, l.id, tk, i));
    }
  }
}
console.log(`pyex: ${pass} OK, ${fail} FALLO de ${nTasks} tareas · quiz: ${nQuiz} preguntas`);
fails.forEach(f => console.log('  ✗ ' + f));

console.log('\n=== EXAMEN ===');
const q = EXAM.questions;
const pts = q.reduce((s, x) => s + (x.pts || 0), 0);
const types = {}; q.forEach(x => types[x.type] = (types[x.type] || 0) + 1);
console.log(`preguntas=${q.length} pts=${pts} tipos=${JSON.stringify(types)}`);
if (q.length !== 30) console.log('  ✗ deben ser 30');
if (pts !== 300) console.log('  ✗ deben sumar 300');
q.forEach((x, i) => {
  if (x.type === 'mc' && (!x.options || x.options.length < 2 || x.correct == null || x.correct >= x.options.length)) console.log(`  ✗ q${i+1} mc mal formada`);
  if (x.type === 'tf' && (!x.options || x.options.length !== 2)) console.log(`  ✗ q${i+1} tf sin 2 opciones`);
  if (x.type === 'fill' && (!x.accept || !x.accept.length || !x.re)) console.log(`  ✗ q${i+1} fill sin accept/re`);
  if (!x.explain || !x.pts) console.log(`  ✗ q${i+1} sin explain/pts`);
});

console.log('\n=== COBERTURA ===');
MODULES.forEach(m => console.log(`${m.id} ${m.name}: ${m.lessons.length} lecciones`));
const total = MODULES.reduce((s, m) => s + m.lessons.length, 0);
console.log('total lecciones:', total);
const srs = MODULES.reduce((s, m) => s + m.lessons.reduce((s2, l) => s2 + (l.blocks||[]).filter(x => x.t === 'srs').length, 0), 0);
console.log('bloques SRS:', srs);
