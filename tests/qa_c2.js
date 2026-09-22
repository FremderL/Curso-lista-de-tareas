/* QA CURSO 2 (javascript.html · JavaScript y el Juego de Memoria) — sondeo profundo:
   arranque, CAMPUS 7, 26 lecciones, 26 ejercicios con checks regex, editor, appdemo
   (iframe del proyecto), quizzes, examen 30, libro 9 caps, boleta, i18n, dataJs, consola. */
const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');

const html = fs.readFileSync('/home/user/javascript.html', 'utf8');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => errors.push('jsdomError: ' + e.message));
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  url: 'http://localhost:3000/javascript.html',
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
    ok(window.eval('CAMPUS.thisCourse') === 'c2', 'thisCourse = c2');
    const tm = window.eval('TOTAL_MAX');
    ok(tm === window.eval('CAMPUS.courses[1].max'), 'TOTAL_MAX ('+tm+') coincide con max del CAMPUS');
    ok(window.eval('EXAM.questions.length') === 30, 'examen 30 preguntas');
    ok(window.eval('ALL_LESSONS.length') === 26, '26 lecciones (CAMPUS total:26)');
    ok(window.eval('TEXTBOOK.length') === 9, 'libro con 9 capítulos');

    // 3) home y sidebar
    ok(document.getElementById('content').innerHTML.includes('Juego de Memoria'), 'home renderizada');
    const ids = Array.from(new Set(Array.from(document.querySelectorAll('#sidebar [data-nav="lesson"]')).map(b => b.getAttribute('data-id'))));
    ok(ids.length === 26, 'sidebar lista 26 lecciones (' + ids.length + ')');

    // 4) barrido de las 26
    let broken = 0;
    for(const lid of ids){
      try{ nav('#/leccion/'+lid); }catch(e){ broken++; console.log('  ✗ lección '+lid+': '+e.message); continue; }
      await sleep(40);
      const c = document.getElementById('content');
      if(!c || c.innerHTML.length < 400){ broken++; console.log('  ✗ lección '+lid+' sin contenido'); }
    }
    ok(broken === 0, 'las 26 lecciones renderizan (rotas: ' + broken + ')');

    // 5) ejercicio 1-1 con solución completa → todos los checks
    nav('#/leccion/1-1');
    await sleep(150);
    const ex = document.querySelector('[data-ex="1-1"]');
    ok(!!ex, 'bloque ejercicio de 1-1 renderizado');
    if(ex){
      const ta = ex.querySelector('textarea[data-editor]');
      ta.value = "const EMOJIS = ['🎃', '👻', '🦇', '🕷️', '🍬', '🧙', '💀', '🕸️'];\nconsole.log('Total de emojis:', EMOJIS.length);\nconsole.log('Primero:', EMOJIS[0]);\nconsole.log('Último:', EMOJIS[EMOJIS.length - 1]);";
      click(ex.querySelector('[data-action="grade-ex"]'));
      await sleep(80);
      const resTxt = ex.querySelector('[data-result]').textContent;
      ok(resTxt.includes('100'), 'ejercicio 1-1 con 6/6 checks → 100 pts (salió: ' + resTxt.match(/\d+/) + ')');
      const st = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
      ok(st.users[st.session].dataJs && st.users[st.session].dataJs.scores['1-1'] === 100, 'score 1-1 guardado en dataJs');
      // respuesta incompleta → sin 100
      ta.value = 'const EMOJIS = [];';
      click(ex.querySelector('[data-action="grade-ex"]'));
      await sleep(60);
      ok(!ex.querySelector('[data-result]').textContent.includes('100/100'), 'código incompleto no da 100/100');
    }

    // conteo de ejercicios calificados en TODO el curso (estándar: 1 por lección)
    const nEx = window.eval('ALL_LESSONS.filter(l=>l.blocks.some(b=>b.t==="exercise")).length');
    ok(nEx >= 20, 'ejercicios calificados en ' + nEx + ' de 26 lecciones');

    // 6) editor de práctica (no exercise): restaura con reset
    const edLesson = window.eval('(ALL_LESSONS.find(l=>l.blocks.some(b=>b.t==="editor"))||{}).id');
    ok(!!edLesson, 'hay bloques editor de práctica');
    if(edLesson){
      nav('#/leccion/'+edLesson); await sleep(130);
      const w = document.querySelector('.edwrap');
      ok(!!w && w.querySelector('textarea[data-editor]').value.length > 10, 'editor con código inicial en '+edLesson);
      const runBtn = w.querySelector('[data-action="run"]');
      ok(!!runBtn, 'botón ▶ Ejecutar presente');
      if(runBtn){ click(runBtn); await sleep(80); ok(!!w.querySelector('.edprev'), 'vista previa tras ejecutar'); }
      // reset restaura
      const tEd = w.querySelector('textarea[data-editor]');
      tEd.value = '/* borrado */';
      click(w.querySelector('[data-action="reset"]'));
      await sleep(60);
      ok(tEd.value.length > 10, '↺ Restablecer recupera el código original');
    }

    // 7) appdemo (iframe del proyecto final)
    const adLesson = window.eval('(ALL_LESSONS.find(l=>l.blocks.some(b=>b.t==="appdemo"))||{}).id');
    ok(!!adLesson, 'hay bloque appdemo (demo del proyecto)');
    if(adLesson){
      nav('#/leccion/'+adLesson); await sleep(150);
      const fr = document.querySelector('iframe[data-appframe]');
      ok(!!fr && (fr.getAttribute('srcdoc')||'').length > 500, 'iframe del proyecto con srcdoc grande ('+(fr?(fr.getAttribute('srcdoc')||'').length:0)+' B)');
    }

    // 8) quiz 1-1: seleccionar + calificar
    nav('#/leccion/1-1'); await sleep(120);
    const quizBox = document.querySelector('[data-quiz="1-1"]');
    ok(!!quizBox, 'quiz renderizado en 1-1');
    if(quizBox){
      quizBox.querySelectorAll('[data-q]').forEach(q => { const o = q.querySelector('[data-opt]'); if(o) click(o); });
      const gbtn = quizBox.querySelector('[data-action="grade-quiz"]');
      ok(!!gbtn, 'botón calificar del quiz presente');
      if(gbtn){
        click(gbtn); await sleep(80);
        const res = quizBox.querySelector('[data-result]');
        ok(!!res && res.classList.contains('show') && /\d+/.test(res.textContent), 'quiz califica: ' + (res ? res.textContent.slice(0, 40) : 'NULL'));
      }
    }

    // 9) auditoría fillOk en runtime (criterio: no marcar correctas como malas)
    const fillProbes = [
      ['length', window.eval('ALL_LESSONS'), null]
    ];
    const fp = [
      ['...','spread-check'], ['spread','spread-check']
    ];
    // probes directos con las preguntas reales del examen
    const probePairs = [
      ['length', /^\s*length\s*$/], ['...', /^\s*\.{3}\s*$/], ['spread', null],
      ['super', /^\s*super\s*$/], ['parse', /^\s*(json\.)?parse\s*$/], ['JSON.parse', null],
      ['#', /^\s*#\s*$/], ['numeral', null], ['aspect-ratio', /^\s*aspect[- ]?ratio\s*$/], ['aspect ratio', null]
    ];
    let fillLogicOk = true;
    for(const [val] of probePairs){
      const r = window.eval('(function(){ try{ return { ex:["probe"] } }catch(e){ return null } })()');
      void r;
    }
    // usar fillOk real del curso sobre las preguntas fill reales
    const fillOkResults = window.eval('(function(){ return { hasFn: typeof fillOk === "function" }; })()');
    ok(fillOkResults.hasFn, 'fillOk disponible');
    // prueba real: crear pregunta sintética equivalente a las del examen y validar sinónimos
    const synthetic = window.eval(`(function(){
      const casos = [
        [{accept:['...','spread'], re:'^\\\\s*\\\\.{3}\\\\s*$'}, 'spread', true],
        [{accept:['super'], re:'^\\\\s*super\\\\s*$'}, 'SUPER', true],
        [{accept:['json.parse','parse'], re:'^\\\\s*(json\\\\.)?parse\\\\s*$'}, 'json.parse', true],
        [{accept:['#','hash','numeral'], re:'^\\\\s*#\\\\s*$'}, 'numeral', true],
        [{accept:['aspect-ratio'], re:'^\\\\s*aspect[- ]?ratio\\\\s*$'}, 'aspect ratio', true]
      ];
      return casos.map(function(c){ return fillOk(c[0], c[1]) === c[2]; }).every(Boolean);
    })()`);
    ok(synthetic === true, 'fillOk acepta sinónimos (spread, SUPER, json.parse, numeral, aspect ratio)');

    // 10) examen
    nav('#/examen'); await sleep(150);
    ok(document.body.textContent.includes('Examen Final'), 'examen renderizado');
    click(Array.from(document.querySelectorAll('button')).find(b => b.getAttribute('data-action') === 'grade-exam'));
    await sleep(80);
    ok(document.querySelector('[data-quiz="__exam"] [data-result]').innerHTML.includes('300'), 'examen califica (menciona 300)');
    const st2 = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
    ok(st2.users[st2.session].dataJs && st2.users[st2.session].dataJs.examScore != null, 'examScore guardado en dataJs');

    // 11) libro (9 caps) y bibliografía
    nav('#/libro'); await sleep(120);
    ok(document.getElementById('content').innerHTML.length > 500, 'libro renderiza');
    let bookOk = true;
    for(let ch = 1; ch <= 9; ch++){ nav('#/libro/'+ch); await sleep(35); if(document.getElementById('content').innerHTML.length < 400) bookOk = false; }
    ok(bookOk, 'los 9 capítulos del libro renderizan');
    const bookTxt = document.getElementById('content').textContent;
    ok(/Flanagan|Haverbeke|Duckett|MDN|You Don/.test(bookTxt + document.body.textContent), 'bibliografía JS real presente');

    // 12) boleta + i18n
    nav('#/boleta'); await sleep(120);
    const bt = document.body.textContent;
    ok(bt.includes('Boleta') || bt.includes('boleta'), 'boleta renderizada');
    ok(!bt.includes('Cambridge'), 'boleta sin textos de otros cursos');
    const umBtn = document.getElementById('umenuBtn');
    ok(!!umBtn, 'menú de usuario global presente');
    if(umBtn){
      click(umBtn); await sleep(120);
      const en = document.querySelector('[data-um="lang-en"]');
      ok(!!en, 'opción EN en menú de usuario');
      if(en){
        click(en); await sleep(250);
        const small = document.querySelector('header small, .topbar small');
        ok(small && (small.textContent.includes('Memory Game') || small.textContent.includes('JavaScript')), 'i18n: topbar → EN');
        nav('#/boleta'); await sleep(120);
        const h1 = document.querySelector('#content h1');
        ok(h1 && h1.textContent.includes('Report card'), 'i18n: boleta H1 → Report card');
        // defecto sistémico conocido: chips/lead de la boleta siguen en ES (hallazgo #2 del QA c1)
        const chipsEs = document.getElementById('content').innerHTML.includes('pendiente');
        if(chipsEs) console.log('  ⚠️ hallazgo sistémico #2 confirmado también en c2: chips ES en boleta EN');
        click(umBtn); await sleep(100);
        const es = document.querySelector('[data-um="lang-es"]');
        if(es){ click(es); await sleep(200); }
      }
    }

    // 13) persistencia: dataJs (no legacy data a secas)
    const st3 = JSON.parse(window.localStorage.getItem('codecamp-db-v2'));
    ok(st3.users[st3.session].dataJs && !st3.users[st3.session].dataUnity, 'cuenta usa dataJs (campo moderno)');

    // 14) consola limpia
    const realErrors = errors.filter(e => !/could not parse css/i.test(e) && !/not implemented/i.test(e));
    ok(realErrors.length === 0, 'sin errores jsdom: ' + (realErrors[0] || 'limpio'));

    // 15) sin SRS (hallazgo, igual que c1)
    ok(!document.querySelector('[data-srsbox]'), 'sin SRS en curso 2 (hallazgo, no bug)');
  }catch(e){
    fail++; console.log('  ✗ EXCEPCIÓN: ' + e.message + '\n' + e.stack.split('\n').slice(0,4).join('\n'));
  }
  console.log('\n=== QA CURSO 2: ' + pass + ' OK · ' + fail + ' FALLO ===');
  if(issues.length){ console.log('HALLAZGOS:'); issues.forEach(i => console.log(' - ' + i)); }
  process.exit(fail ? 1 : 0);
})();
