/* Smoke de python.html con jsdom: carga, rutas, pyex run/grade con stdin, playground, examen, libro, boleta, menú global */
const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');

const html = fs.readFileSync('/home/user/python.html', 'utf8');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => errors.push('jsdomError: ' + e.message));
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  url: 'http://localhost:3000/python.html',
  pretendToBeVisual: true,
  virtualConsole: vc
});
const { window } = dom;
const { document } = window;

function click(el){ el.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true })); }
function nav(hash){ window.location.hash = hash; window.dispatchEvent(new window.HashChangeEvent('hashchange')); }
let pass = 0, fail = 0;
function ok(cond, msg){ if(cond){ pass++; } else { fail++; console.log('  ✗ ' + msg); } }

setTimeout(() => {
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
    ok(document.getElementById('content').innerHTML.includes('Python desde cero'), 'home Python renderizada');
    ok(document.body.textContent.includes('Librería Esperanza'), 'menciona la Librería Esperanza');
    ok(window.eval('CAMPUS.courses.length') === 7, 'CAMPUS lista 7 cursos');
    ok(window.eval('CAMPUS.thisCourse') === 'c5', 'thisCourse = c5');

    // 3) lección 1-1 con pyex: solución real del contenido → ejecutar → calificar
    const sol = window.eval('LESSONS_BY_ID["1-1"].blocks.filter(function(b){return b.t==="pyex";})[0].tasks[0].solution');
    ok(typeof sol === 'string' && sol.length > 5, 'solución de 1-1 t0 accesible');
    nav('#/leccion/1-1');
    const ta = document.getElementById('pyta-1-1-0');
    ok(!!ta, 'textarea pyex 1-1 t0 existe');
    ta.value = sol;
    const runBtn = document.querySelector('[data-pyaction="run"][data-lesson="1-1"][data-ti="0"]');
    ok(!!runBtn, 'botón Ejecutar existe');
    click(runBtn);
    let out = document.querySelector('[data-task="1-1#0"] [data-out]');
    ok(out && out.innerHTML.includes('Salida del programa'), 'ejecutar muestra la salida');
    const gradeBtn = document.querySelector('[data-pyaction="grade"][data-lesson="1-1"][data-ti="0"]');
    click(gradeBtn);
    out = document.querySelector('[data-task="1-1#0"] [data-out]');
    ok(out && out.innerHTML.includes('✅'), 'calificar tarea correcta → ✅');
    const st = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
    const u = st.session;
    ok(u && st.users[u].dataPy && st.users[u].dataPy.scores['1-1'] > 0, 'score de lección 1-1 guardado');
    ok(st.users[u].dataPy.pyOk && st.users[u].dataPy.pyOk['1-1#0'] === 1, 'pyOk guardado');

    // calificar con código MALO
    ta.value = "print('algo distinto')";
    click(document.querySelector('[data-pyaction="grade"][data-lesson="1-1"][data-ti="0"]'));
    out = document.querySelector('[data-task="1-1#0"] [data-out]');
    ok(out && out.innerHTML.includes('❌'), 'salida incorrecta → ❌');

    // error en español con línea
    ta.value = "print(1 +";
    click(document.querySelector('[data-pyaction="run"][data-lesson="1-1"][data-ti="0"]'));
    out = document.querySelector('[data-task="1-1#0"] [data-out]');
    ok(out && out.innerHTML.includes('Línea'), 'error con número de línea visible');

    // 4) tarea con stdin (1-5): la solución corre con las entradas de la tarea
    const sol15 = window.eval('LESSONS_BY_ID["1-5"].blocks.filter(function(b){return b.t==="pyex";})[0].tasks[0].solution');
    nav('#/leccion/1-5');
    const ta15 = document.getElementById('pyta-1-5-0');
    ok(!!ta15, 'textarea pyex 1-5 t0 existe');
    ok(!!document.getElementById('pystdin-1-5-0'), 'cuadro de ENTRADAS visible en tarea con input()');
    ta15.value = sol15;
    click(document.querySelector('[data-pyaction="grade"][data-lesson="1-5"][data-ti="0"]'));
    out = document.querySelector('[data-task="1-5#0"] [data-out]');
    ok(out && out.innerHTML.includes('✅'), 'tarea con stdin califica ✅: ' + (out ? out.innerHTML.slice(0,120) : 'NULL'));

    // 5) diagramas de flujo (2-1 y 2-3) + SRS pycore (2-3)
    nav('#/leccion/2-2');
    ok(document.querySelector('.flowsvg'), 'diagrama de flujo if/else en 2-2');
    nav('#/leccion/2-3');
    ok(!!document.querySelector('.flowsvg'), 'diagrama de flujo while en 2-3');
    const srsBox = document.querySelector('[data-srsbox="pycore"]');
    ok(!!srsBox, 'bloque SRS del mazo pycore renderizado');
    if(srsBox){
      click(srsBox.querySelector('[data-srs="start"]'));
      ok(!!srsBox.querySelector('.srs-card'), 'SRS sesión inicia y muestra tarjeta');
    }

    // 6) playground
    nav('#/proyecto');
    const pg = document.getElementById('pgEditor');
    ok(!!pg, 'playground editor existe');
    pg.value = 'for i in range(3):\n    print(i)';
    click(document.querySelector('[data-pyaction="pg-run"]'));
    let pgOut = document.getElementById('pgOut').textContent;
    ok(pgOut.includes('0') && pgOut.includes('1') && pgOut.includes('2'), 'playground ejecuta ciclo');
    // stdin del playground
    pg.value = 'n = int(input())\nprint(n * 2)';
    document.getElementById('pgStdin').value = '21';
    click(document.querySelector('[data-pyaction="pg-run"]'));
    ok(document.getElementById('pgOut').textContent.includes('42'), 'playground con input() → 42');
    // persistencia del código
    const st4 = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
    ok(st4.users[u].dataPy.play && st4.users[u].dataPy.play.includes('n * 2'), 'código del playground persiste en dataPy');
    // error en español
    pg.value = "x = int('hola')";
    click(document.querySelector('[data-pyaction="pg-run"]'));
    ok(document.getElementById('pgOut').innerHTML.includes('ValueError'), 'ValueError mostrado en playground');

    // 7) examen: responder y calificar (resultados en pantalla + persistencia)
    nav('#/examen');
    ok(document.body.textContent.includes('Examen Final'), 'examen renderizado');
    ok(window.eval('EXAM.questions.length') === 30, 'examen con 30 preguntas');
    click(Array.from(document.querySelectorAll('button')).find(b => b.getAttribute('data-action') === 'grade-exam'));
    ok(document.querySelector('[data-quiz="__exam"] [data-result]').innerHTML.includes('300'), 'examen califica (menciona 300 pts)');
    const st2 = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
    ok(st2.users[st2.session].dataPy.examScore != null, 'examScore guardado');

    // 8) libro y boleta
    nav('#/libro');
    ok(document.body.textContent.includes('Python Crash Course'), 'libro con bibliografía (Python Crash Course)');
    ok(document.body.textContent.includes('Automate the Boring Stuff'), 'bibliografía (Automate the Boring Stuff)');
    nav('#/boleta');
    ok(document.body.textContent.includes('Boleta') || document.body.textContent.includes('boleta'), 'boleta renderizada');
    ok(!document.body.textContent.includes('Desarrollador Web'), 'sin textos del curso web');

    // 9) menú global: los 5 cursos presentes
    const bodyTxt = document.body.textContent;
    ok(bodyTxt.includes('Python desde cero'), 'curso Python en menú/portada');
    ok(bodyTxt.includes('Bases de datos SQL'), 'curso SQL accesible desde python.html');
    const st3 = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
    ok(st3.users[st3.session].dataPy && !st3.users[st3.session].dataEn, 'campo dataPy (no dataEn)');

    // 10) barrido: TODAS las lecciones renderizan sin excepción
    let broken = 0, visited = 0;
    const ids = Array.from(new Set(Array.from(document.querySelectorAll('#sidebar [data-nav="lesson"]')).map(b => b.getAttribute('data-id'))));
    for(const lid of ids){
      visited++;
      try{ nav('#/leccion/'+lid); }catch(e){ broken++; console.log('  ✗ lección '+lid+': '+e.message); continue; }
      const c = document.getElementById('content');
      if(!c || c.innerHTML.length < 400){ broken++; console.log('  ✗ lección '+lid+' sin contenido'); }
    }
    ok(visited >= 30 && broken === 0, 'las '+visited+' lecciones renderizan (rotas: '+broken+')');

    // 11) capítulos del libro
    let bookOk = true;
    for(let ch = 1; ch <= 9; ch++){ nav('#/libro/'+ch); if(document.getElementById('content').innerHTML.length < 500) bookOk = false; }
    ok(bookOk, 'los 9 capítulos del libro renderizan');

    // 12) sin errores de consola graves
    const realErrors = errors.filter(e => !/could not parse css/i.test(e) && !/not implemented/i.test(e));
    ok(realErrors.length === 0, 'sin errores jsdom: ' + (realErrors[0] || 'limpio'));
  }catch(e){
    fail++; console.log('  ✗ EXCEPCIÓN: ' + e.message + '\n' + e.stack.split('\n').slice(0,4).join('\n'));
  }
  console.log('\n=== SMOKE PYTHON: ' + pass + ' OK · ' + fail + ' FALLO ===');
  process.exit(fail ? 1 : 0);
}, 1200);
