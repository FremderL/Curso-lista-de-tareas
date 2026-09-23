/* Validador de contenido Unreal: corre cada solución bpex con BPX y califica por salida.
   También valida grafos start, quizzes y del examen (30×300). */
const fs = require('fs'), vm = require('vm');
const BPX = require('/home/user/ue_parts/bpx_engine.js');

const a = fs.readFileSync('/home/user/ue_parts/content_ue_a.js', 'utf8');
const b = fs.readFileSync('/home/user/ue_parts/content_ue_b.js', 'utf8');
const ctx = {};
vm.createContext(ctx);
vm.runInContext('const MODULES = [];\nconst DEMO_BP = {};\n' + a + '\n' + b + '\n;globalThis.__OUT={MODULES, EXAM, DEMO_BP};', ctx);
const { MODULES, EXAM, DEMO_BP } = ctx.__OUT;

let pass = 0, fail = 0; const fails = [];
let nTasks = 0, nQuiz = 0, maxTotal = 0;

function clone(g){ return JSON.parse(JSON.stringify(g)); }

function runTask(modId, lesId, task, ti){
  nTasks++;
  maxTotal += (task.pts || 10);
  if(!task.solution || !task.check){ fail++; fails.push(`${modId}/${lesId} t${ti+1}: sin solution o check`); return; }
  // los grafos start deben ser estructuralmente válidos (aunque no ejecutables aún)
  if(task.start){
    const v = BPX.validate(task.start);
    if(!v.ok){ fail++; fails.push(`${modId}/${lesId} t${ti+1}: START inválido → ${v.error}`); return; }
  }
  const r = BPX.run(clone(task.solution));
  if(!r.ok){ fail++; fails.push(`${modId}/${lesId} t${ti+1}: SOLUTION FALLA → ${r.error}`); return; }
  const g = BPX.gradeOutput(task.check.lines || [], r.output);
  if(!g.ok){
    fail++;
    const got = r.output.split('\n');
    fails.push(`${modId}/${lesId} t${ti+1}: ${g.why} | obtenido=${JSON.stringify(got.slice(0, 6))}`);
    return;
  }
  if(task.check.vars){
    for(const k of Object.keys(task.check.vars)){
      const got = r.vars[k], exp = task.check.vars[k];
      const same = (typeof exp === 'number') ? (got === exp) : JSON.stringify(got) === JSON.stringify(exp);
      if(!same){ fail++; fails.push(`${modId}/${lesId} t${ti+1}: var ${k} esperaba ${JSON.stringify(exp)} y hubo ${JSON.stringify(got)}`); return; }
    }
  }
  if(task.check.requireNodes){
    for(const t of task.check.requireNodes){
      if(!task.solution.nodes.some(n => n.type === t)){
        fail++; fails.push(`${modId}/${lesId} t${ti+1}: solution no contiene nodo requerido ${t}`); return;
      }
    }
  }
  pass++;
}

console.log('=== TAREAS BPEX ===');
for(const m of MODULES){
  for(const l of m.lessons){
    for(const bl of (l.blocks || [])){
      if(bl.t === 'quiz') nQuiz += (bl.questions || []).length;
      if(bl.t === 'bpex') (bl.tasks || []).forEach((tk, i) => runTask(m.id, l.id, tk, i));
    }
  }
}
console.log(`bpex: ${pass} OK, ${fail} FALLO de ${nTasks} tareas · quiz: ${nQuiz} preguntas · max=${maxTotal}`);
fails.forEach(f => console.log('  ✗ ' + f));

console.log('\n=== EXAMEN ===');
const q = EXAM.questions;
const pts = q.reduce((s, x) => s + (x.pts || 0), 0);
const types = {}; q.forEach(x => types[x.type] = (types[x.type] || 0) + 1);
console.log(`preguntas=${q.length} pts=${pts} tipos=${JSON.stringify(types)}`);
if(q.length !== 30) console.log('  ✗ deben ser 30');
if(pts !== 300) console.log('  ✗ deben sumar 300');
if(types.mc !== 20) console.log('  ✗ deben ser 20 mc');
if(types.fill !== 7) console.log('  ✗ deben ser 7 fill');
if(types.tf !== 3) console.log('  ✗ deben ser 3 tf');
q.forEach((x, i) => {
  if(x.type === 'mc' && (!x.options || x.options.length < 2 || x.correct == null || x.correct >= x.options.length)) console.log(`  ✗ q${i+1} mc mal formada`);
  if(x.type === 'tf' && (!x.options || x.options.length !== 2)) console.log(`  ✗ q${i+1} tf sin 2 opciones`);
  if(x.type === 'fill' && (!x.accept || !x.accept.length || !x.re)) console.log(`  ✗ q${i+1} fill sin accept/re`);
  if(!x.explain || !x.pts) console.log(`  ✗ q${i+1} sin explain/pts`);
});

console.log('\n=== COBERTURA ===');
MODULES.forEach(m => console.log(`${m.id} ${m.name}: ${m.lessons.length} lecciones`));
const total = MODULES.reduce((s, m) => s + m.lessons.length, 0);
console.log('total lecciones:', total);
if(total !== 30) console.log('  ✗ deben ser 30 lecciones');
const srs = MODULES.reduce((s, m) => s + m.lessons.reduce((s2, l) => s2 + (l.blocks||[]).filter(x => x.t === 'srs').length, 0), 0);
console.log('bloques SRS:', srs);
// demos referenciados existen
let demosOk = true;
for(const m of MODULES) for(const l of m.lessons) for(const bl of (l.blocks||[])){
  if(bl.t === 'bp' && !DEMO_BP[bl.g]){ demosOk = false; console.log(`  ✗ demo inexistente: ${bl.g} (${l.id})`); }
}
console.log('demos bp:', Object.keys(DEMO_BP).length, demosOk ? 'todas las referencias OK' : '✗ referencias rotas');

console.log('\n=== RESULTADO: ' + pass + ' tareas OK · ' + fail + ' fallas ===');
process.exit(fail ? 1 : 0);
