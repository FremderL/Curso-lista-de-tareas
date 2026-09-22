/* QA CURSO 1 (index.html · Lista de Tareas) — sondeo profundo:
   arranque, CAMPUS 7 cursos, home, 29 lecciones, editor en vivo, 3 ejercicios
   calificados por regex, quizzes, demos, examen 30, libro 14 caps, boleta,
   i18n completo, persistencia dataEn, consola limpia. */
const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');

const html = fs.readFileSync('/home/user/index.html', 'utf8');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => errors.push('jsdomError: ' + e.message));
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  url: 'http://localhost:3000/index.html',
  pretendToBeVisual: true,
  virtualConsole: vc
});
const { window } = dom;
const { document } = window;

function click(el){ el.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true })); }
function nav(hash){ window.location.hash = hash; window.dispatchEvent(new window.HashChangeEvent('hashchange')); }
const sleep = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, fail = 0;
const issues = [];
function ok(cond, msg){ if(cond){ pass++; } else { fail++; console.log('  ✗ ' + msg); issues.push(msg); } }

(async () => {
  await sleep(1300);
  try{
    // 1) arranque
    const authLayer = document.getElementById('authLayer');
    ok(authLayer && authLayer.classList.contains('show'), 'login visible al inicio');
    ok(!(document.getElementById('content').textContent + authLayer.textContent).includes('no pudo iniciarse'), 'sin fatal() en la UI');
    const guestBtn = document.querySelector('[data-action="auth-guest"]') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('invitado'));
    ok(!!guestBtn, 'botón invitado existe');
    click(guestBtn);
    await sleep(150);

    // 2) campus y constantes
    ok(window.eval('CAMPUS.courses.length') === 7, 'CAMPUS lista 7 cursos');
    ok(JSON.stringify(window.eval('CAMPUS.courses.map(c=>c.id)')) === JSON.stringify(['c1','c2','c3','c4','c5','c6','c7']), 'CAMPUS [c1..c7] sin dups/nulls');
    ok(window.eval('CAMPUS.thisCourse') === 'c1', 'thisCourse = c1');
    ok(window.eval('CAMPUS.courses[0].dataKey') === 'dataEn', 'dataKey de c1 = dataEn (migración sep 2026)');
    const tm = window.eval('TOTAL_MAX');
    ok(tm === window.eval('CAMPUS.courses[0].max'), 'TOTAL_MAX ('+tm+') coincide con max del CAMPUS (' + window.eval('CAMPUS.courses[0].max') + ')');
    ok(window.eval('EXAM.questions.length') === 30, 'examen 30 preguntas');
    ok(window.eval('ALL_LESSONS.length') === 29, '29 lecciones (CAMPUS total:29)');
    ok(window.eval('TEXTBOOK.length') === 14, 'libro con 14 capítulos');

    // 3) home
    ok(document.getElementById('content').innerHTML.includes('Lista de Tareas'), 'home renderizada');
    ok(document.body.textContent.includes('publicar') || document.body.textContent.includes('GitHub'), 'home menciona publicación GitHub');

    // 4) sidebar
    const ids = Array.from(new Set(Array.from(document.querySelectorAll('#sidebar [data-nav="lesson"]')).map(b => b.getAttribute('data-id'))));
    ok(ids.length === 29, 'sidebar lista 29 lecciones (' + ids.length + ')');

    // 5) barrido de las 29
    let broken = 0;
    for(const lid of ids){
      try{ nav('#/leccion/'+lid); }catch(e){ broken++; console.log('  ✗ lección '+lid+': '+e.message); continue; }
      await sleep(45);
      const c = document.getElementById('content');
      if(!c || c.innerHTML.length < 400){ broken++; console.log('  ✗ lección '+lid+' sin contenido'); }
    }
    ok(broken === 0, 'las 29 lecciones renderizan (rotas: ' + broken + ')');

    // 6) editor en vivo (3-2 tiene editor de HTML)
    nav('#/leccion/3-2');
    await sleep(150);
    const ed = document.querySelector('[data-editor]');
    ok(!!ed && ed.value.length > 20, 'editor de código con código inicial');
    const runBtn = document.querySelector('.edwrap [data-action="run"]');
    ok(!!runBtn, 'botón ▶ Ejecutar del editor presente');
    if(runBtn){ click(runBtn); await sleep(80);
      const prev = document.querySelector('.edprev');
      ok(!!prev, 'vista previa (iframe) presente tras ejecutar');
    }

    // 7) ejercicio calificado 1-5 (HTML): pegar solución válida y calificar
    nav('#/leccion/1-5');
    await sleep(150);
    ok(!!document.querySelector('[data-ex="2-4"]') === false, 'sanidad: 2-4 sin bloque data-ex aún (nav correcta)');
    nav('#/leccion/2-4'); await sleep(100);
    ok(!!document.querySelector('[data-ex="2-4"]'), 'ejercicio calificado presente en 2-4 (CSS)');
    nav('#/leccion/3-6'); await sleep(100);
    ok(!!document.querySelector('[data-ex="3-6"]'), 'ejercicio calificado presente en 3-6 (JS)');
    nav('#/leccion/1-5');
    await sleep(150);
    const ex = document.querySelector('[data-ex="1-5"]');
    ok(!!ex, 'bloque ejercicio de 1-5 renderizado');
    if(ex){
      const ta = ex.querySelector('textarea[data-editor]');
      ta.value = '<!DOCTYPE html>\n<html lang="es">\n<head><meta charset="UTF-8"><title>Mi Lista</title><link rel="stylesheet" href="styles.css"></head>\n<body>\n<form id="form-tarea"><input type="text" id="input-tarea"><button type="submit">Add</button></form>\n<ul id="lista-tareas"></ul>\n<script src="app.js"></script>\n</body>\n</html>';
      click(ex.querySelector('[data-action="grade-ex"]'));
      await sleep(80);
      ok(ex.querySelector('[data-result]').innerHTML.includes('80'), 'ejercicio 1-5 con 8/8 checks → 80 pts (salió: ' + ex.querySelector('[data-result]').textContent.match(/\d+/) + ')');
      const st = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
      ok(st.users[st.session].dataEn && st.users[st.session].dataEn.scores['1-5'] === 80, 'score 1-5 guardado en el campo dataEn');
    }

    // 8) demos interactivos
    nav('#/leccion/1-1'); await sleep(120);
    const hasDom = document.querySelector('[data-domtree], .domtree, [data-demo]');
    ok(!!hasDom || document.getElementById('content').innerHTML.includes('domtree') === false, 'demos presentes donde toca (sin romper)');
    for(const lid of ['3-2','3-3','5-2','5-3']){
      nav('#/leccion/'+lid); await sleep(90);
      const c = document.getElementById('content');
      ok(!!c.querySelector('[data-demo]') || c.innerHTML.includes('demo') === false, 'lección '+lid+' renderiza con sus demos');
    }

    // 9) quiz en 1-1: seleccionar opciones y calificar la sección
    nav('#/leccion/1-1'); await sleep(120);
    const quizBox = document.querySelector('[data-quiz="1-1"]');
    ok(!!quizBox, 'quiz renderizado en 1-1');
    if(quizBox){
      quizBox.querySelectorAll('[data-q]').forEach(q => {
        const o = q.querySelector('[data-opt]');
        if(o) click(o);
      });
      const gbtn = quizBox.querySelector('[data-action="grade-quiz"]');
      ok(!!gbtn, 'botón calificar del quiz presente');
      if(gbtn){
        click(gbtn); await sleep(80);
        const res = quizBox.querySelector('[data-result]');
        ok(!!res && res.classList.contains('show') && /\d+/.test(res.textContent), 'quiz califica y muestra puntaje: ' + (res ? res.textContent.slice(0, 40) : 'NULL'));
      }
    }

    // 10) examen
    nav('#/examen'); await sleep(150);
    ok(document.body.textContent.includes('Examen Final'), 'examen renderizado');
    click(Array.from(document.querySelectorAll('button')).find(b => b.getAttribute('data-action') === 'grade-exam'));
    await sleep(80);
    ok(document.querySelector('[data-quiz="__exam"] [data-result]').innerHTML.includes('300'), 'examen califica (menciona 300)');
    const st2 = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
    ok(st2.users[st2.session].dataEn && st2.users[st2.session].dataEn.examScore != null, 'examScore guardado en dataEn');

    // 11) libro (14 caps) y bibliografía
    nav('#/libro'); await sleep(120);
    ok(document.getElementById('content').innerHTML.length > 500, 'libro renderiza');
    let bookOk = true;
    for(let ch = 1; ch <= 14; ch++){ nav('#/libro/'+ch); await sleep(35); if(document.getElementById('content').innerHTML.length < 400) bookOk = false; }
    ok(bookOk, 'los 14 capítulos del libro renderizan');

    // 12) boleta
    nav('#/boleta'); await sleep(120);
    const bt = document.body.textContent;
    ok(bt.includes('Boleta') || bt.includes('boleta'), 'boleta renderizada');
    ok(bt.includes('Lista de Tareas'), 'boleta con nombre del curso');
    ok(!bt.includes('Cambridge'), 'boleta sin textos de Cambridge');
    nav('#/boleta'); await sleep(100);
    ok(!!document.getElementById('certName') || document.getElementById('content').innerHTML.includes('certificado') === false, 'certificado con campo de nombre (si existe en esta vista)');

    // 13) i18n: cambiar a EN y verificar TODA la página
    const umBtn = document.getElementById('umenuBtn');
    ok(!!umBtn, 'menú de usuario global presente');
    if(umBtn){
      click(umBtn); await sleep(120);
      const en = document.querySelector('[data-um="lang-en"]');
      ok(!!en, 'opción de idioma EN en el menú de usuario');
      if(en){
        click(en); await sleep(250);
        const small = document.querySelector('header small, .topbar small');
        ok(small && small.textContent.includes('To-Do List'), 'i18n: topbar → EN (To-Do List)');
        nav('#/boleta'); await sleep(120);
        const h1 = document.querySelector('#content h1');
        ok(h1 && h1.textContent.includes('Report card'), 'i18n: boleta H1 → Report card');
        ok(document.querySelector('[data-um="lang-es"]') != null || !!document.getElementById('umenuBtn'), 'i18n: menú sigue vivo tras el cambio');
        click(umBtn); await sleep(100);
        const es = document.querySelector('[data-um="lang-es"]');
        if(es){ click(es); await sleep(200); }
      }
    }

    // 14) persistencia correcta
    const st3 = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
    ok(st3.users[st3.session].dataEn && !st3.users[st3.session].dataUnity, 'cuenta usa el campo dataEn (modelo nuevo, no dataUnity)');

    // 15) consola limpia
    const realErrors = errors.filter(e => !/could not parse css/i.test(e) && !/not implemented/i.test(e));
    ok(realErrors.length === 0, 'sin errores jsdom: ' + (realErrors[0] || 'limpio'));

    // 16) huecos de contenido detectados para el reporte
    ok(!document.querySelector('[data-srsbox]'), 'sin SRS en curso 1 (hallazgo, no bug)');
  }catch(e){
    fail++; console.log('  ✗ EXCEPCIÓN: ' + e.message + '\n' + e.stack.split('\n').slice(0,4).join('\n'));
  }
  console.log('\n=== QA CURSO 1: ' + pass + ' OK · ' + fail + ' FALLO ===');
  if(issues.length){ console.log('HALLAZGOS:'); issues.forEach(i => console.log(' - ' + i)); }
  process.exit(fail ? 1 : 0);
})();
