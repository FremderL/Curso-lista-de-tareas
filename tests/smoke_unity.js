/* Smoke de unity.html con jsdom: carga, rutas, editor ucs (escribir → ejecutar → calificar),
   stdin, SRS cscore, playground, examen, libro, boleta, menú global de 7 cursos */
const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');

const html = fs.readFileSync('/home/user/unity.html', 'utf8');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => errors.push('jsdomError: ' + e.message));
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  url: 'http://localhost:3000/unity.html',
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
    ok(document.getElementById('content').innerHTML.includes('Unity desde cero'), 'home Unity renderizada');
    ok(document.body.textContent.includes('Librería Esperanza'), 'menciona la Librería Esperanza');
    ok(window.eval('CAMPUS.courses.length') === 7, 'CAMPUS lista 7 cursos');
    ok(JSON.stringify(window.eval('CAMPUS.courses.map(c=>c.id)')) === JSON.stringify(['c1','c2','c3','c4','c5','c6','c7']), 'CAMPUS sin duplicados ni nulls: ' + JSON.stringify(window.eval('CAMPUS.courses.map(c=>c.id)')));
    ok(window.eval('CAMPUS.thisCourse') === 'c7', 'thisCourse = c7');
    ok(window.eval('TOTAL_MAX') === 3780, 'TOTAL_MAX = 3780 (3480 + examen 300), salió ' + window.eval('TOTAL_MAX'));
    ok(window.eval('UCS.run("Console.WriteLine(1+1);").output') === '2\n', 'UCS vivo dentro de la página');
    ok(window.eval('TEXTBOOK.length') === 9, 'libro con 9 capítulos');

    // 3) lección 0-1 con pyex: escribir → ejecutar → calificar
    nav('#/leccion/0-1');
    await sleep(200);
    const ta = document.getElementById('pyta-0-1-0');
    ok(!!ta, 'editor de la tarea 1 montado');
    ta.value = 'Debug.Log("¡Hola, Unity!");';
    click(document.querySelector('[data-ucsaction="run"][data-lesson="0-1"][data-ti="0"]'));
    await sleep(50);
    let out = document.querySelector('[data-task="0-1#0"] [data-out]');
    ok(out && out.innerHTML.includes('Salida del programa') && out.innerHTML.includes('¡Hola, Unity!'), '▶ Ejecutar imprime «¡Hola, Unity!»');
    click(document.querySelector('[data-ucsaction="grade"][data-lesson="0-1"][data-ti="0"]'));
    await sleep(50);
    out = document.querySelector('[data-task="0-1#0"] [data-out]');
    ok(out && out.innerHTML.includes('✅'), 'calificar tarea correcta → ✅');
    const st = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
    const u = st.session;
    ok(u && st.users[u].dataUnity && st.users[u].dataUnity.scores['0-1'] > 0, 'score de lección 0-1 guardado');
    ok(st.users[u].dataUnity.ucsOk && st.users[u].dataUnity.ucsOk['0-1#0'] === 1, 'ucsOk guardado');
    ok(st.users[u].dataUnity.ucsCode && st.users[u].dataUnity.ucsCode['0-1#0'].includes('Debug.Log'), 'código del alumno persiste en dataUnity');

    // respuesta mala → ❌ con explicación
    ta.value = 'Console.WriteLine("otra cosa");';
    click(document.querySelector('[data-ucsaction="grade"][data-lesson="0-1"][data-ti="0"]'));
    await sleep(50);
    out = document.querySelector('[data-task="0-1#0"] [data-out]');
    ok(out && out.innerHTML.includes('❌'), 'salida incorrecta → ❌ con diff');

    // error del motor visible en español (CS0103)
    nav('#/leccion/0-2');
    await sleep(200);
    const ta02 = document.getElementById('pyta-0-2-0');
    ta02.value = 'Console.WriteLine(oro);';
    click(document.querySelector('[data-ucsaction="run"][data-lesson="0-2"][data-ti="0"]'));
    await sleep(50);
    out = document.querySelector('[data-task="0-2#0"] [data-out]');
    ok(out && out.innerHTML.includes('CS0103') && out.innerHTML.includes('oro'), 'CS0103 en español con línea: «oro» no existe');

    // CS1002
    ta02.value = 'Console.WriteLine("x")';
    click(document.querySelector('[data-ucsaction="run"][data-lesson="0-2"][data-ti="0"]'));
    await sleep(50);
    out = document.querySelector('[data-task="0-2#0"] [data-out]');
    ok(out && out.innerHTML.includes('CS1002'), 'CS1002: falta punto y coma');

    // 4) tarea con stdin (1-5 t1: ReadLine)
    nav('#/leccion/1-5');
    await sleep(200);
    const sol15 = window.eval('LESSONS_BY_ID["1-5"].blocks.filter(b=>b.t==="pyex")[0].tasks[0].solution');
    const ta15 = document.getElementById('pyta-1-5-0');
    ta15.value = sol15;
    const stdinBox = document.getElementById('pystdin-1-5-0');
    ok(!!stdinBox && stdinBox.value.includes('Ada'), 'cuadro de entradas con «Ada»');
    click(document.querySelector('[data-ucsaction="run"][data-lesson="1-5"][data-ti="0"]'));
    await sleep(50);
    out = document.querySelector('[data-task="1-5#0"] [data-out]');
    ok(out && out.innerHTML.includes('¡Bienvenida, Ada!'), 'run con stdin imprime saludo');
    click(document.querySelector('[data-ucsaction="grade"][data-lesson="1-5"][data-ti="0"]'));
    await sleep(50);
    out = document.querySelector('[data-task="1-5#0"] [data-out]');
    ok(out && out.innerHTML.includes('✅'), 'stdin ReadLine califica → ✅');

    // 5) clase del proyecto corre en el navegador (7-1 t5)
    nav('#/leccion/7-1');
    await sleep(200);
    const sol71 = window.eval('LESSONS_BY_ID["7-1"].blocks.filter(b=>b.t==="pyex")[0].tasks[4].solution');
    const ta71 = document.getElementById('pyta-7-1-4');
    ta71.value = sol71;
    click(document.querySelector('[data-ucsaction="run"][data-lesson="7-1"][data-ti="4"]'));
    await sleep(50);
    out = document.querySelector('[data-task="7-1#4"] [data-out]');
    ok(out && out.innerHTML.includes('Burbuja: 20') && out.innerHTML.includes('Viscoso: 15'), 'clases Slime + List corren: Burbuja 20 / Viscoso 15');

    // 6) SRS cscore (el bloque vive en 7-3)
    nav('#/leccion/7-3');
    await sleep(200);
    const srsBox = document.querySelector('[data-srsbox="cscore"]');
    ok(!!srsBox, 'bloque SRS del mazo cscore renderizado');
    if(srsBox){
      click(srsBox.querySelector('[data-srs="start"]'));
      ok(!!srsBox.querySelector('.srs-card'), 'SRS sesión inicia y muestra tarjeta');
    }

    // 7) playground
    nav('#/proyecto');
    await sleep(200);
    const pgTa = document.getElementById('pgEditor');
    ok(!!pgTa && pgTa.value.includes('Console.WriteLine'), 'playground con código de ejemplo C#');
    click(document.querySelector('[data-ucsaction="pg-run"]'));
    await sleep(50);
    ok(document.getElementById('pgOut').innerHTML.includes('¡Hola, Ada!'), 'playground ejecuta el ejemplo');
    pgTa.value = 'var l = new List<int>();\nl.Add(5);\nConsole.WriteLine(l.Count);';
    click(document.querySelector('[data-ucsaction="pg-run"]'));
    await sleep(50);
    ok(document.getElementById('pgOut').textContent.includes('1'), 'playground acepta List<int>');
    click(document.querySelector('[data-ucsaction="pg-chip"]'));
    await sleep(50);
    ok(document.getElementById('pgOut').textContent.length > 0, 'chip de ejemplo carga y ejecuta');
    const st4 = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
    ok(st4.users[u].dataUnity.play && st4.users[u].dataUnity.play.includes('Debug.Log'), 'código del playground persiste en dataUnity');

    // 8) examen
    nav('#/examen');
    await sleep(150);
    ok(document.body.textContent.includes('Examen Final'), 'examen renderizado');
    ok(window.eval('EXAM.questions.length') === 30, 'examen con 30 preguntas');
    click(Array.from(document.querySelectorAll('button')).find(b => b.getAttribute('data-action') === 'grade-exam'));
    await sleep(80);
    ok(document.querySelector('[data-quiz="__exam"] [data-result]').innerHTML.includes('300'), 'examen califica (menciona 300 pts)');
    const st2 = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
    ok(st2.users[st2.session].dataUnity.examScore != null, 'examScore guardado');

    // 9) libro y boleta
    nav('#/libro');
    await sleep(120);
    ok(document.body.textContent.includes('Unity in Action'), 'libro con bibliografía (Hocking)');
    ok(document.body.textContent.includes('9781617299339'), 'ISBN de Hocking presente');
    nav('#/boleta');
    await sleep(120);
    ok(document.body.textContent.includes('Boleta') || document.body.textContent.includes('boleta'), 'boleta renderizada');
    ok(!document.body.textContent.includes('Desarrollador Web'), 'sin textos del curso web');
    ok(document.body.textContent.includes('Unity desde cero'), 'boleta con el nombre del curso');

    // 10) menú global: 7 cursos
    const bodyTxt = document.body.textContent;
    ok(bodyTxt.includes('Unity desde cero'), 'curso Unity en menú/portada');
    ok(bodyTxt.includes('Unreal Engine desde cero'), 'curso Unreal accesible desde unity.html');
    ok(bodyTxt.includes('Python desde cero'), 'curso Python accesible');
    ok(bodyTxt.includes('Bases de datos SQL'), 'curso SQL accesible');
    const st3 = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
    ok(st3.users[st3.session].dataUnity && !st3.users[st3.session].dataEn, 'campo dataUnity (no dataEn)');

    // 11) barrido: TODAS las lecciones renderizan sin excepción
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

    // 12) capítulos del libro
    let bookOk = true;
    for(let ch = 1; ch <= 9; ch++){ nav('#/libro/'+ch); await sleep(40); if(document.getElementById('content').innerHTML.length < 500) bookOk = false; }
    ok(bookOk, 'los 9 capítulos del libro renderizan');

    // 13) sin errores de consola graves
    const realErrors = errors.filter(e => !/could not parse css/i.test(e) && !/not implemented/i.test(e));
    ok(realErrors.length === 0, 'sin errores jsdom: ' + (realErrors[0] || 'limpio'));
  }catch(e){
    fail++; console.log('  ✗ EXCEPCIÓN: ' + e.message + '\n' + e.stack.split('\n').slice(0,4).join('\n'));
  }
  console.log('\n=== SMOKE UNITY: ' + pass + ' OK · ' + fail + ' FALLO ===');
  process.exit(fail ? 1 : 0);
})();
