/* Smoke de unreal.html con jsdom: carga, rutas, editor bpex (conectar pines → ejecutar → calificar),
   demos, SRS, playground, examen, libro, boleta, menú global de 6 cursos */
const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');

const html = fs.readFileSync('/home/user/unreal.html', 'utf8');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => errors.push('jsdomError: ' + e.message));
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  url: 'http://localhost:3000/unreal.html',
  pretendToBeVisual: true,
  virtualConsole: vc
});
const { window } = dom;
const { document } = window;

function click(el){ el.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true })); }
function nav(hash){ window.location.hash = hash; window.dispatchEvent(new window.HashChangeEvent('hashchange')); }
const sleep = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, fail = 0;
function ok(cond, msg){ if(cond){ pass++; } else { fail++; console.log('  ✗ ' + msg); } }

(async () => {
  await sleep(1300);
  try{
    // 1) arranque sin fatal
    const authLayer = document.getElementById('authLayer');
    ok(authLayer && authLayer.classList.contains('show'), 'debe mostrar login al inicio (sin sesión)');
    const fatalTxt = (document.getElementById('content').textContent + authLayer.textContent);
    ok(!fatalTxt.includes('no pudo iniciarse'), 'sin fatal() real en la UI');

    // 2) login como invitado
    const guestBtn = document.querySelector('[data-action="auth-guest"]') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('invitado'));
    ok(!!guestBtn, 'botón invitado existe');
    click(guestBtn);
    await sleep(150);
    ok(document.getElementById('content').innerHTML.includes('Unreal Engine'), 'home Unreal renderizada');
    ok(document.body.textContent.includes('Librería Esperanza'), 'menciona la Librería Esperanza');
    ok(window.eval('CAMPUS.courses.length') === 7, 'CAMPUS lista 7 cursos');
    ok(window.eval('CAMPUS.thisCourse') === 'c6', 'thisCourse = c6');
    ok(window.eval('TOTAL_MAX') === 4055, 'TOTAL_MAX = 4055 (3755 + examen), salió ' + window.eval('TOTAL_MAX'));

    // 3) lección 0-1 con demo + bpex: conectar pines de verdad
    nav('#/leccion/0-1');
    await sleep(200);
    ok(document.querySelectorAll('.bpcanvas.bpstatic').length >= 1, 'demo bp estático renderizado con SVG');
    ok(document.querySelector('.bpwires path'), 'cables del demo dibujados');
    const canvas = document.querySelector('.bptask .bpcanvas');
    ok(!!canvas, 'canvas del editor montado en tarea 1');
    ok(canvas.querySelectorAll('.bpnode').length === 3, 'starter con 3 nodos (BeginPlay, Print, literal)');
    ok(canvas.querySelectorAll('.bpwires path').length === 0, 'starter sin cables: el alumno conecta');
    // conectar: BeginPlay.then → Print.in, literal → Print.text
    click(canvas.querySelector('[data-pin="1.then:out"]'));
    click(canvas.querySelector('[data-pin="2.in:in"]'));
    click(canvas.querySelector('[data-pin="3.value:out"]'));
    click(canvas.querySelector('[data-pin="2.text:in"]'));
    await sleep(60);
    const g0 = window.eval('WORKING_GRAPHS["0-1#0"]');
    ok(g0 && g0.wires.length === 2, 'dos cables creados con clics en pines');
    click(document.querySelector('[data-bpx="run"][data-lesson="0-1"][data-ti="0"]'));
    await sleep(50);
    let out = document.querySelector('[data-task="0-1#0"] [data-out]');
    ok(out && out.innerHTML.includes('Output Log') && out.innerHTML.includes('Hola, Unreal!'), '▶ Ejecutar muestra «Hola, Unreal!» en el Output Log');
    click(document.querySelector('[data-bpx="grade"][data-lesson="0-1"][data-ti="0"]'));
    await sleep(50);
    out = document.querySelector('[data-task="0-1#0"] [data-out]');
    ok(out && out.innerHTML.includes('✅'), 'calificar tarea correcta → ✅');
    const st = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
    const u = st.session;
    ok(u && st.users[u].dataUnreal && st.users[u].dataUnreal.scores['0-1'] > 0, 'score de lección 0-1 guardado');
    ok(st.users[u].dataUnreal.ueOk && st.users[u].dataUnreal.ueOk['0-1#0'] === 1, 'ueOk guardado');
    ok(st.users[u].dataUnreal.ueCode && JSON.parse(st.users[u].dataUnreal.ueCode['0-1#0']).wires.length === 2, 'grafo del alumno persiste en dataUnreal');

    // calificar con grafo MALO (sin cable exec)
    window.eval('WORKING_GRAPHS["0-1#0"].wires = [WORKING_GRAPHS["0-1#0"].wires[1]]');
    click(document.querySelector('[data-bpx="grade"][data-lesson="0-1"][data-ti="0"]'));
    await sleep(50);
    out = document.querySelector('[data-task="0-1#0"] [data-out]');
    ok(out && out.innerHTML.includes('❌'), 'grafo sin flecha de BeginPlay → ❌ (salida incompleta)');

    // error del motor visible (Branch sin condición en 3-1)
    nav('#/leccion/3-1');
    await sleep(200);
    const g31 = window.eval('JSON.parse(JSON.stringify(LESSONS_BY_ID["3-1"].blocks.filter(b=>b.t==="bpex")[0].tasks[0].solution))');
    g31.wires = g31.wires.filter(w => !w.to.endsWith('2.cond'));
    window.eval('WORKING_GRAPHS["3-1#0"] = ' + JSON.stringify(g31));
    click(document.querySelector('[data-bpx="run"][data-lesson="3-1"][data-ti="0"]'));
    await sleep(50);
    out = document.querySelector('[data-task="3-1#0"] [data-out]');
    ok(out && out.innerHTML.includes('Condición') && out.innerHTML.includes('no está conectada'), 'error en español: entrada Condición sin conectar');

    // 4) tarea con vars + requireNodes (3-4 t4: whileloop con líneas)
    nav('#/leccion/3-4');
    await sleep(200);
    const sol34 = window.eval('JSON.stringify(LESSONS_BY_ID["3-4"].blocks.filter(b=>b.t==="bpex")[0].tasks[3].solution)');
    window.eval('WORKING_GRAPHS["3-4#3"] = ' + sol34);
    click(document.querySelector('[data-bpx="grade"][data-lesson="3-4"][data-ti="3"]'));
    await sleep(50);
    out = document.querySelector('[data-task="3-4#3"] [data-out]');
    ok(out && out.innerHTML.includes('✅') && out.textContent.includes('5'), 'whileloop con vars: 5,3,1 → ✅');

    // requireNodes: tarea 3-3 t4 exige concat; grafo sin concat → ❌ explicativo
    nav('#/leccion/3-3');
    await sleep(200);
    // requireNodes: el mecanismo avisa el nodo faltante por su nombre en el editor
    const rn = window.eval('ueRequireNodesMsg({nodes:[{type:"branch",props:{}}]}, ["concat"])');
    ok(!!rn && rn.includes('Append'), 'requireNodes detecta falta de Append: ' + rn);
    const rn2 = window.eval('ueRequireNodesMsg({nodes:[{type:"concat",props:{}},{type:"branch",props:{}}]}, ["concat","branch"])');
    ok(rn2 === null, 'requireNodes pasa cuando los nodos existen');

    // 5) SRS uecore
    nav('#/leccion/3-3');
    await sleep(150);
    const srsBox = document.querySelector('[data-srsbox="uecore"]');
    ok(!!srsBox, 'bloque SRS del mazo uecore renderizado');
    if(srsBox){
      click(srsBox.querySelector('[data-srs="start"]'));
      ok(!!srsBox.querySelector('.srs-card'), 'SRS sesión inicia y muestra tarjeta');
    }

    // 6) playground
    nav('#/proyecto');
    await sleep(200);
    const pg = document.getElementById('pgCanvas');
    ok(!!pg && pg.querySelectorAll('.bpnode').length >= 3, 'playground con grafo de ejemplo montado');
    click(document.querySelector('[data-bpx="pg-run"]'));
    await sleep(50);
    ok(document.getElementById('pgOut').innerHTML.includes('¡Hola desde el playground!'), 'playground ejecuta el grafo de ejemplo');
    // añadir nodo con la paleta
    const nodesBefore = window.eval('WORKING_GRAPHS["::playground"].nodes.length');
    click(document.querySelector('[data-bpx="pg-add"][data-type="branch"]'));
    await sleep(50);
    ok(window.eval('WORKING_GRAPHS["::playground"].nodes.length') === nodesBefore + 1, 'paleta añade nodo Branch');
    // chip de ejemplo
    click(document.querySelector('[data-bpx="pg-chip"]'));
    await sleep(50);
    ok(window.eval('WORKING_GRAPHS["::playground"].nodes.length') === 7, 'chip carga ejemplo Branch completo');
    click(document.querySelector('[data-bpx="pg-run"]'));
    await sleep(50);
    ok(document.getElementById('pgOut').textContent.includes('Sí'), 'chip ejecuta → «Sí»');
    const st4 = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
    ok(st4.users[u].dataUnreal.playG && st4.users[u].dataUnreal.playG.includes('branch'), 'grafo del playground persiste en dataUnreal');

    // 7) examen
    nav('#/examen');
    await sleep(150);
    ok(document.body.textContent.includes('Examen Final'), 'examen renderizado');
    ok(window.eval('EXAM.questions.length') === 30, 'examen con 30 preguntas');
    click(Array.from(document.querySelectorAll('button')).find(b => b.getAttribute('data-action') === 'grade-exam'));
    await sleep(80);
    ok(document.querySelector('[data-quiz="__exam"] [data-result]').innerHTML.includes('300'), 'examen califica (menciona 300 pts)');
    const st2 = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
    ok(st2.users[st2.session].dataUnreal.examScore != null, 'examScore guardado');

    // 8) libro y boleta
    nav('#/libro');
    await sleep(120);
    ok(document.body.textContent.includes('Blueprints Visual Scripting'), 'libro con bibliografía (Romero & Sewell)');
    ok(document.body.textContent.includes('Game Development Patterns'), 'bibliografía (Butler & Oliver)');
    nav('#/boleta');
    await sleep(120);
    ok(document.body.textContent.includes('Boleta') || document.body.textContent.includes('boleta'), 'boleta renderizada');
    ok(!document.body.textContent.includes('Desarrollador Web'), 'sin textos del curso web');

    // 9) menú global: 6 cursos
    const bodyTxt = document.body.textContent;
    ok(bodyTxt.includes('Unreal Engine desde cero'), 'curso Unreal en menú/portada');
    ok(bodyTxt.includes('Python desde cero'), 'curso Python accesible desde unreal.html');
    ok(bodyTxt.includes('Bases de datos SQL'), 'curso SQL accesible');
    const st3 = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
    ok(st3.users[st3.session].dataUnreal && !st3.users[st3.session].dataEn, 'campo dataUnreal (no dataEn)');

    // 10) barrido: TODAS las lecciones renderizan sin excepción
    let broken = 0, visited = 0;
    const ids = Array.from(new Set(Array.from(document.querySelectorAll('#sidebar [data-nav="lesson"]')).map(b => b.getAttribute('data-id'))));
    for(const lid of ids){
      visited++;
      try{ nav('#/leccion/'+lid); }catch(e){ broken++; console.log('  ✗ lección '+lid+': '+e.message); continue; }
      await sleep(60);
      const c = document.getElementById('content');
      if(!c || c.innerHTML.length < 400){ broken++; console.log('  ✗ lección '+lid+' sin contenido'); }
    }
    ok(visited >= 30 && broken === 0, 'las '+visited+' lecciones renderizan (rotas: '+broken+')');

    // 11) capítulos del libro
    let bookOk = true;
    for(let ch = 1; ch <= 9; ch++){ nav('#/libro/'+ch); await sleep(40); if(document.getElementById('content').innerHTML.length < 500) bookOk = false; }
    ok(bookOk, 'los 9 capítulos del libro renderizan');

    // 12) sin errores de consola graves
    const realErrors = errors.filter(e => !/could not parse css/i.test(e) && !/not implemented/i.test(e));
    ok(realErrors.length === 0, 'sin errores jsdom: ' + (realErrors[0] || 'limpio'));
  }catch(e){
    fail++; console.log('  ✗ EXCEPCIÓN: ' + e.message + '\n' + e.stack.split('\n').slice(0,4).join('\n'));
  }
  console.log('\n=== SMOKE UNREAL: ' + pass + ' OK · ' + fail + ' FALLO ===');
  process.exit(fail ? 1 : 0);
})();
