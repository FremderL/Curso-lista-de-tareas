/* Verificación de contenido Unity: TODAS las soluciones corren con UCS y
   califican contra su check (líneas + vars). También valida estructura. */
global.MODULES = []; global.__result = null;
const fs = require('fs');
const UCS = require('/home/user/unity_parts/ucs_engine.js');

eval(
  fs.readFileSync('unity_parts/content_unity_a.js','utf-8') + '\n' +
  fs.readFileSync('unity_parts/content_unity_b.js','utf-8') + '\n' +
  fs.readFileSync('unity_parts/content_unity_c.js','utf-8') + '\n' +
  '__result = { M: MODULES, E: EXAM };'
);
const M = __result.M, EXAM = __result.E;

let pass = 0, fail = 0;
function ok(cond, msg){ if(cond){ pass++; } else { fail++; console.log('  ✗ ' + msg); } }
function grade(check, r){
  const g = UCS.gradeOutput(check.lines || [], r.output, {});
  if(!g.ok) return g;
  if(check.vars){
    for(const k in check.vars){
      const exp = check.vars[k], got = r.vars ? r.vars[k] : undefined;
      if(got !== exp) return { ok:false, why:'var ' + k + ' debía ser ' + exp + ' y fue ' + got };
    }
  }
  return { ok:true };
}

/* estructura */
ok(M.length === 8, '8 módulos');
let totalLessons = 0, totalTasks = 0, quizQ = 0;
M.forEach(m => {
  ok(!!m.id && !!m.name && !!m.color && m.lessons.length > 0, 'módulo con datos: ' + m.id);
  m.lessons.forEach(l => {
    totalLessons++;
    ok(!!l.id && !!l.title && Array.isArray(l.blocks) && l.blocks.length > 0, 'lección con bloques: ' + l.id);
    l.blocks.forEach(b => {
      if(b.t === 'pyex'){
        ok(b.tasks.length > 0, 'pyex con tareas: ' + l.id);
        b.tasks.forEach((tk, ti) => {
          totalTasks++;
          ok(!!tk.q && !!tk.solution && tk.check && Array.isArray(tk.check.lines) && tk.pts > 0, 'tarea completa ' + l.id + '#' + ti);
          if(tk.check.vars && !tk.wantVars && /Random/.test(tk.solution) === false){
            /* las vars exigen wantVars implícito del app: el app usa Object.keys(check.vars) */
          }
        });
      }
      if(b.t === 'quiz') b.questions.forEach(q => quizQ++);
    });
  });
});
ok(totalLessons === 30, '30 lecciones, hay ' + totalLessons);
ok(quizQ === 120, '120 preguntas de quiz, hay ' + quizQ);
ok(EXAM.questions.length === 30, 'examen de 30');
const ecnt = {};
EXAM.questions.forEach(q => ecnt[q.type] = (ecnt[q.type]||0)+1);
ok(ecnt.mc === 20 && ecnt.fill === 7 && ecnt.tf === 3, 'examen 20mc/7fill/3tf: ' + JSON.stringify(ecnt));
ok(EXAM.questions.reduce((a,q)=>a+q.pts,0) === 300, 'examen 300 pts');
EXAM.questions.forEach((q, i) => {
  ok(!!q.q && q.pts === 10 && !!q.explain, 'examen pregunta completa #' + i);
  if(q.type === 'mc' || q.type === 'tf') ok(Array.isArray(q.options) && q.correct >= 0 && q.correct < q.options.length, 'examen opciones #' + i);
  if(q.type === 'fill') ok(Array.isArray(q.accept) && !!q.re, 'examen fill completa #' + i);
});

/* TODAS las soluciones corren y califican */
M.forEach(m => m.lessons.forEach(l => (l.blocks||[]).forEach(b => {
  if(b.t !== 'pyex') return;
  b.tasks.forEach((tk, ti) => {
    const stdin = tk.stdin || [];
    const wantVars = tk.check.vars ? Object.keys(tk.check.vars) : [];
    const r = UCS.run(tk.solution, { stdin: stdin, wantVars: wantVars });
    ok(r.ok, 'corre ' + l.id + '#' + ti + ': ' + (r.error || '').slice(0, 90));
    if(r.ok){
      const g = grade(tk.check, r);
      ok(g.ok, 'califica ' + l.id + '#' + ti + (g.why ? ' → ' + g.why + ' (salida: ' + JSON.stringify(r.output.slice(0, 120)) + ')' : ''));
    }
  });
})));

/* las 5 tareas con stdin tienen stdin y sus soluciones la consumen */
M.forEach(m => m.lessons.forEach(l => (l.blocks||[]).forEach(b => {
  if(b.t !== 'pyex') return;
  b.tasks.forEach((tk, ti) => {
    const usaReadline = /ReadLine/.test(tk.solution);
    ok(usaReadline === Array.isArray(tk.stdin), 'stdin coherente ' + l.id + '#' + ti);
  });
})));

/* SRS y flujos referenciados existen */
const decks = new Set(['cscore']);
M.forEach(m => m.lessons.forEach(l => (l.blocks||[]).forEach(b => {
  if(b.t === 'srs') ok(decks.has(b.deck), 'deck existe: ' + b.deck);
})));

/* hitos del proyecto */
const m7 = M.find(m => m.id === 'm7');
ok(m7 && m7.lessons.length === 3, 'proyecto de 3 lecciones');
ok(/Burbuja/.test(JSON.stringify(m7)) && /Viscoso/.test(JSON.stringify(m7)), 'continuidad narrativa (slimes del curso 6)');

console.log('\n=== CONTENIDO UNITY: ' + pass + ' OK · ' + fail + ' FALLO ===');
process.exit(fail ? 1 : 0);
