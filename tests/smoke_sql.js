/* Smoke de sql.html con jsdom: carga, rutas, sqlex run/grade, playground, examen, libro, boleta */
const fs = require('fs'), path = require('path');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('/home/user/sql.html', 'utf8');
const errors = [];
const vc = new (require('jsdom').VirtualConsole)();
vc.on('jsdomError', e => errors.push('jsdomError: ' + e.message));
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  url: 'http://localhost:3000/sql.html',
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
    ok(document.getElementById('content').innerHTML.includes('Bases de datos SQL'), 'home SQL renderizada');
    ok(document.body.textContent.includes('Librería Esperanza'), 'menciona la Librería Esperanza');

    // 3) lección 1-1 con sqlex: ejecutar y calificar tarea 1
    nav('#/leccion/1-1');
    const ta = document.getElementById('sqlta-1-1-0');
    ok(!!ta, 'textarea sqlex 1-1 t0 existe');
    ta.value = 'SELECT titulo, anio FROM libros;';
    const runBtn = document.querySelector('[data-sqlaction="run"][data-lesson="1-1"][data-ti="0"]');
    ok(!!runBtn, 'botón Ejecutar existe');
    click(runBtn);
    let out = document.querySelector('[data-task="1-1#0"] [data-out]');
    ok(out && out.innerHTML.includes('<table'), 'ejecutar muestra tabla de resultados');
    ok(out && out.innerHTML.includes('16 filas'), 'resultado con 16 filas');

    const gradeBtn = document.querySelector('[data-sqlaction="grade"][data-lesson="1-1"][data-ti="0"]');
    click(gradeBtn);
    out = document.querySelector('[data-task="1-1#0"] [data-out]');
    ok(out && out.innerHTML.includes('✅'), 'calificar tarea correcta → ✅');
    const st = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
    const u = st.session;
    ok(u && st.users[u].dataSql && st.users[u].dataSql.scores['1-1'] > 0, 'score de lección 1-1 guardado');
    ok(st.users[u].dataSql.sqlOk && st.users[u].dataSql.sqlOk['1-1#0'] === 1, 'sqlOk guardado');

    // calificar con respuesta MALA
    nav('#/leccion/1-2');
    const ta2 = document.getElementById('sqlta-1-2-0');
    ta2.value = 'SELECT x FROM libros;';
    click(document.querySelector('[data-sqlaction="grade"][data-lesson="1-2"][data-ti="0"]'));
    out = document.querySelector('[data-task="1-2#0"] [data-out]');
    ok(out && out.innerHTML.includes('❌'), 'respuesta incorrecta → ❌ (con error del motor). out=' + (out ? out.innerHTML.slice(0,200) : 'NULL'));
    ok(out && out.innerHTML.includes('no existe'), 'mensaje de error en español visible');

    // 4) lección con ER (4-5)
    nav('#/leccion/4-5');
    ok(document.querySelector('.ersvg'), 'diagrama ER SVG renderizado en 4-5');

    // 5) SRS en 4-4
    nav('#/leccion/5-4');
    const srsBox = document.querySelector('[data-srsbox="sqlcore"]');
    ok(!!srsBox, 'bloque SRS del mazo sqlcore renderizado');
    if(srsBox){
      const startBtn = srsBox.querySelector('[data-srs="start"]');
      click(startBtn);
      ok(!!srsBox.querySelector('.srs-card'), 'SRS sesión inicia y muestra tarjeta');
    }

    // 6) playground
    nav('#/proyecto');
    const pg = document.getElementById('pgEditor');
    ok(!!pg, 'playground editor existe');
    pg.value = 'SELECT COUNT(*) AS total FROM ventas;';
    click(document.querySelector('[data-sqlaction="pg-run"]'));
    ok(document.getElementById('pgOut').innerHTML.includes('22'), 'playground ejecuta y muestra 22');
    // INSERT + restaurar
    pg.value = "INSERT INTO autores (nombre, pais) VALUES ('Test', 'X'); SELECT COUNT(*) FROM autores;";
    click(document.querySelector('[data-sqlaction="pg-run"]'));
    ok(document.getElementById('pgOut').innerHTML.includes('10'), 'INSERT en playground → 10 autores');
    click(document.querySelector('[data-sqlaction="pg-reset"]'));
    pg.value = 'SELECT COUNT(*) FROM autores;';
    click(document.querySelector('[data-sqlaction="pg-run"]'));
    ok(document.getElementById('pgOut').innerHTML.includes('9'), 'restaurar devuelve 9 autores');
    // error en español
    pg.value = 'SELECT noexiste FROM libros;';
    click(document.querySelector('[data-sqlaction="pg-run"]'));
    ok(document.getElementById('pgOut').innerHTML.includes('no existe'), 'error en español en playground');

    // 7) examen con fill: responder todo mal excepto un fill correcto
    nav('#/examen');
    ok(document.body.textContent.includes('Examen Final'), 'examen renderizado');
    const fillInput = document.querySelector('input[data-fill="2"]');
    ok(!!fillInput, 'pregunta fill del examen renderizada');
    fillInput.value = 'select';
    click(Array.from(document.querySelectorAll('button')).find(b => b.getAttribute('data-action') === 'grade-exam'));
    ok(document.querySelector('[data-quiz="__exam"] [data-result]').innerHTML.includes('30'), 'examen califica (menciona 300/pts)');
    const st2 = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
    ok(st2.users[st2.session].dataSql.examScore != null, 'examScore guardado');

    // 8) libro y boleta
    nav('#/libro');
    ok(document.body.textContent.includes('Learning SQL'), 'libro con bibliografía (Learning SQL)');
    nav('#/boleta');
    ok(document.body.textContent.includes('Boleta') || document.body.textContent.includes('boleta'), 'boleta renderizada');
    ok(!document.body.textContent.includes('Desarrollador Web'), 'sin textos del curso web');

    // 9) menú de campus
    const c4 = document.body.textContent.includes('Bases de datos SQL');
    ok(c4, 'nombre del curso en el menú/perfil');
    const st3 = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
    ok(st3.users[st3.session].dataSql && !st3.users[st3.session].dataEn, 'campo dataSql (no dataEn)');

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
  console.log('\n=== SMOKE SQL: ' + pass + ' OK · ' + fail + ' FALLO ===');
  process.exit(fail ? 1 : 0);
}, 1200);
