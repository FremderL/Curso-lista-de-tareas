/* QA CURSOS 3–7 (ingles, sql, python, unreal, unity) — sondeo profundo parametrizado:
   arranque, CAMPUS 7, ejercicios REALES calificados (actividad B1 / sqlex / pyex / bpex / ucs),
   SRS, examen, libro, boleta, i18n EN↔ES, persistencia por dataKey, barrido de lecciones,
   consola limpia, sin elementos appframe huérfanos. */
const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');

const COURSES = [
  { id:'c3', file:'ingles.html',  lessons:34, book:9, deck:'verbs',   srsView:'#/repaso',  dataKey:'dataEn' },
  { id:'c4', file:'sql.html',     lessons:30, book:9, deck:'sqlcore', srsView:null,        dataKey:'dataSql' },
  { id:'c5', file:'python.html',  lessons:30, book:9, deck:'pycore',  srsView:null,        dataKey:'dataPy' },
  { id:'c6', file:'unreal.html',  lessons:30, book:9, deck:'uecore',  srsView:null,        dataKey:'dataUnreal' },
  { id:'c7', file:'unity.html',   lessons:30, book:9, deck:'cscore',  srsView:null,        dataKey:'dataUnity' }
];
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function qaCourse(C){
  const html = fs.readFileSync('/home/user/' + C.file, 'utf8');
  const errors = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => errors.push('jsdomError: ' + e.message));
  vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));
  const dom = new JSDOM(html, { runScripts:'dangerously', url:'http://localhost:3000/'+C.file, pretendToBeVisual:true, virtualConsole: vc });
  const { window: win } = dom;
  const { document: doc } = win;
  function click(el){ el.dispatchEvent(new win.MouseEvent('click', { bubbles:true, cancelable:true })); }
  function nav(hash){ win.location.hash = hash; win.dispatchEvent(new win.HashChangeEvent('hashchange')); }
  let pass = 0, fail = 0;
  const issues = [];
  function ok(cond, msg){ if(cond){ pass++; } else { fail++; console.log('  ✗ [' + C.id + '] ' + msg); issues.push(msg); } }

  try{
    await sleep(1300);
    // arranque
    const authLayer = doc.getElementById('authLayer');
    ok(authLayer && authLayer.classList.contains('show'), 'login visible al inicio');
    ok(!(doc.getElementById('content').textContent + authLayer.textContent).includes('no pudo iniciarse'), 'sin fatal()');
    const guest = doc.querySelector('[data-action="auth-guest"]') || Array.from(doc.querySelectorAll('button')).find(b => b.textContent.includes('invitado'));
    ok(!!guest, 'botón invitado');
    click(guest); await sleep(160);

    // campus y constantes
    ok(win.eval('CAMPUS.courses.length') === 7, 'CAMPUS 7 cursos');
    ok(JSON.stringify(win.eval('CAMPUS.courses.map(c=>c.id)')) === JSON.stringify(['c1','c2','c3','c4','c5','c6','c7']), 'CAMPUS [c1..c7] sin dups/nulls');
    ok(win.eval('CAMPUS.thisCourse') === C.id, 'thisCourse = ' + C.id);
    const tm = win.eval('TOTAL_MAX');
    ok(tm === win.eval('(CAMPUS.courses.find(c=>c.id==="' + C.id + '")||{}).max'), 'TOTAL_MAX (' + tm + ') = max del CAMPUS');
    ok(win.eval('EXAM.questions.length') === 30, 'examen 30 preguntas (' + win.eval('EXAM.questions.length') + ')');
    ok(win.eval('ALL_LESSONS.length') === C.lessons, C.lessons + ' lecciones');
    ok(win.eval('TEXTBOOK.length') === C.book, 'libro ' + C.book + ' capítulos');
    ok(!doc.querySelector('[data-appframe]'), 'sin iframes appframe huérfanos (FINAL_DEMO muerto e inofensivo)');

    // barrido de lecciones
    const ids = Array.from(new Set(Array.from(doc.querySelectorAll('#sidebar [data-nav="lesson"]')).map(b => b.getAttribute('data-id'))));
    ok(ids.length === C.lessons, 'sidebar lista ' + C.lessons + ' lecciones');
    let broken = 0;
    for(const lid of ids){
      try{ nav('#/leccion/'+lid); }catch(e){ broken++; continue; }
      await sleep(38);
      const c = doc.getElementById('content');
      if(!c || c.innerHTML.length < 400){ broken++; console.log('  ✗ [' + C.id + '] lección ' + lid + ' sin contenido'); }
    }
    ok(broken === 0, 'las ' + C.lessons + ' lecciones renderizan (rotas: ' + broken + ')');

    // ---- probe específico por curso: ejercicio REAL ----
    if(C.id === 'c3'){
      const lid = win.eval('(ALL_LESSONS.find(l=>l.blocks.some(b=>b.t==="activity" && b.checklist && b.checklist.length))||{}).id');
      ok(!!lid, 'hay actividad calificada con rúbrica');
      const block = JSON.parse(win.eval('JSON.stringify(LESSONS_BY_ID["'+lid+'"].blocks.find(b=>b.t==="activity"))'));
      nav('#/leccion/'+lid); await sleep(200);
      const sec = doc.querySelector('[data-activity="'+lid+'"]');
      ok(!!sec, 'actividad renderizada en ' + lid);
      if(sec){
        sec.querySelectorAll('[data-q]').forEach(q => {
          const qi = Number(q.getAttribute('data-qi'));
          const it = (block.items||[])[qi];
          if(!it) return;
          if(it.type === 'gap'){
            const inp = q.querySelector('input[data-gap]');
            if(inp) inp.value = (it.accept && it.accept[0]) || (it.show || 'x');
          } else {
            const opts = q.querySelectorAll('.opt');
            if(opts[it.correct]) click(opts[it.correct]);
          }
        });
        sec.querySelectorAll('[data-chk]').forEach(c => { c.checked = true; });
        const wr = sec.querySelector('[data-write]');
        if(wr) wr.value = 'Last summer I traveled to the beach with my family. We swam every day and ate ice cream. It was amazing.';
        click(sec.querySelector('[data-action="grade-activity"]'));
        await sleep(100);
        const res = sec.querySelector('[data-result]');
        ok(!!res && res.classList.contains('show') && /\d+/.test(res.textContent), 'actividad califica: ' + (res ? res.textContent.replace(/\s+/g,' ').slice(0, 30) : 'NULL'));
        const st = JSON.parse(win.localStorage.getItem('codecamp-db-v2'));
        ok(st.users[st.session].dataEn && st.users[st.session].dataEn.scores[lid] > 0, 'score de actividad guardado en dataEn');
      }
    }
    if(C.id === 'c4'){
      const lid = win.eval('(ALL_LESSONS.find(l=>l.blocks.some(b=>b.t==="sqlex"))||{}).id');
      const sol = win.eval('LESSONS_BY_ID["'+lid+'"].blocks.filter(b=>b.t==="sqlex")[0].tasks[0].solution');
      nav('#/leccion/'+lid); await sleep(200);
      const ta = doc.getElementById('sqlta-'+lid+'-0');
      ok(!!ta, 'editor SQL de '+lid+' montado');
      ta.value = sol;
      click(doc.querySelector('[data-sqlaction="run"][data-lesson="'+lid+'"][data-ti="0"]'));
      await sleep(80);
      let out = doc.querySelector('[data-task="'+lid+'#0"] [data-out]');
      ok(!!out && out.innerHTML.length > 40, '▶ Ejecutar SQL muestra resultado');
      click(doc.querySelector('[data-sqlaction="grade"][data-lesson="'+lid+'"][data-ti="0"]'));
      await sleep(80);
      out = doc.querySelector('[data-task="'+lid+'#0"] [data-out]');
      ok(!!out && out.innerHTML.includes('✅'), 'calificar SQL → ✅');
      const st = JSON.parse(win.localStorage.getItem('codecamp-db-v2'));
      ok(st.users[st.session].dataSql && st.users[st.session].dataSql.scores[lid] > 0, 'score guardado en dataSql');
    }
    if(C.id === 'c5'){
      const lid = win.eval('(ALL_LESSONS.find(l=>l.blocks.some(b=>b.t==="pyex"))||{}).id');
      const sol = win.eval('LESSONS_BY_ID["'+lid+'"].blocks.filter(b=>b.t==="pyex")[0].tasks[0].solution');
      nav('#/leccion/'+lid); await sleep(200);
      const ta = doc.getElementById('pyta-'+lid+'-0');
      ok(!!ta, 'editor Python de '+lid+' montado');
      ta.value = sol;
      click(doc.querySelector('[data-pyaction="run"][data-lesson="'+lid+'"][data-ti="0"]'));
      await sleep(80);
      let out = doc.querySelector('[data-task="'+lid+'#0"] [data-out]');
      ok(!!out && out.innerHTML.includes('Salida del programa'), '▶ Ejecutar Python muestra salida');
      click(doc.querySelector('[data-pyaction="grade"][data-lesson="'+lid+'"][data-ti="0"]'));
      await sleep(80);
      out = doc.querySelector('[data-task="'+lid+'#0"] [data-out]');
      ok(!!out && out.innerHTML.includes('✅'), 'calificar Python → ✅');
      const st = JSON.parse(win.localStorage.getItem('codecamp-db-v2'));
      ok(st.users[st.session].dataPy && st.users[st.session].dataPy.scores[lid] > 0, 'score guardado en dataPy');
    }
    if(C.id === 'c6'){
      const lid = win.eval('(ALL_LESSONS.find(l=>l.blocks.some(b=>b.t==="bpex"))||{}).id');
      const sol = win.eval('JSON.stringify(LESSONS_BY_ID["'+lid+'"].blocks.filter(b=>b.t==="bpex")[0].tasks[0].solution)');
      nav('#/leccion/'+lid); await sleep(200);
      win.eval('WORKING_GRAPHS["'+lid+'#0"] = ' + sol);
      click(doc.querySelector('[data-bpx="run"][data-lesson="'+lid+'"][data-ti="0"]'));
      await sleep(80);
      let out = doc.querySelector('[data-task="'+lid+'#0"] [data-out]');
      ok(!!out && out.innerHTML.includes('Output Log'), '▶ Ejecutar grafo muestra Output Log');
      click(doc.querySelector('[data-bpx="grade"][data-lesson="'+lid+'"][data-ti="0"]'));
      await sleep(80);
      out = doc.querySelector('[data-task="'+lid+'#0"] [data-out]');
      ok(!!out && out.innerHTML.includes('✅'), 'calificar grafo → ✅');
      const st = JSON.parse(win.localStorage.getItem('codecamp-db-v2'));
      ok(st.users[st.session].dataUnreal && st.users[st.session].dataUnreal.scores[lid] > 0, 'score guardado en dataUnreal');
    }
    if(C.id === 'c7'){
      const lid = win.eval('(ALL_LESSONS.find(l=>l.blocks.some(b=>b.t==="pyex"))||{}).id');
      const sol = win.eval('LESSONS_BY_ID["'+lid+'"].blocks.filter(b=>b.t==="pyex")[0].tasks[0].solution');
      nav('#/leccion/'+lid); await sleep(200);
      const ta = doc.getElementById('pyta-'+lid+'-0');
      ok(!!ta, 'editor C# de '+lid+' montado');
      ta.value = sol;
      click(doc.querySelector('[data-ucsaction="run"][data-lesson="'+lid+'"][data-ti="0"]'));
      await sleep(80);
      let out = doc.querySelector('[data-task="'+lid+'#0"] [data-out]');
      ok(!!out && out.innerHTML.includes('Salida del programa'), '▶ Ejecutar C# muestra salida');
      click(doc.querySelector('[data-ucsaction="grade"][data-lesson="'+lid+'"][data-ti="0"]'));
      await sleep(80);
      out = doc.querySelector('[data-task="'+lid+'#0"] [data-out]');
      ok(!!out && out.innerHTML.includes('✅'), 'calificar C# → ✅');
      const st = JSON.parse(win.localStorage.getItem('codecamp-db-v2'));
      ok(st.users[st.session].dataUnity && st.users[st.session].dataUnity.scores[lid] > 0, 'score guardado en dataUnity');
    }

    // ---- SRS ----
    if(C.srsView){
      nav(C.srsView); await sleep(150);
      const start = doc.querySelector('[data-srs="start"][data-deck="'+C.deck+'"]');
      ok(!!start, 'SRS vista '+C.srsView+' con mazo '+C.deck);
      if(start){
        click(start); await sleep(80);
        click(doc.querySelector('[data-srsbox="'+C.deck+'"] [data-srs="reveal"]')); await sleep(40);
        click(doc.querySelector('[data-srsbox="'+C.deck+'"] [data-srs="good"]')); await sleep(40);
        ok((doc.querySelector('[data-srsbox="'+C.deck+'"] .srs-zone')||{}).textContent.includes('Tarjeta 2'), 'SRS avanza a tarjeta 2');
      }
    } else {
      const lidS = win.eval('(ALL_LESSONS.find(l=>l.blocks.some(b=>b.t==="srs"))||{}).id');
      ok(!!lidS, 'hay bloque SRS en lecciones');
      if(lidS){
        nav('#/leccion/'+lidS); await sleep(150);
        const box = doc.querySelector('[data-srsbox="'+C.deck+'"]');
        ok(!!box, 'SRS '+C.deck+' renderizado');
        if(box){
          click(box.querySelector('[data-srs="start"]')); await sleep(60);
          ok(!!box.querySelector('.srs-card'), 'SRS sesión inicia');
        }
      }
    }

    // ---- examen ----
    nav('#/examen'); await sleep(160);
    ok(doc.body.textContent.includes('Examen'), 'examen renderizado');
    click(Array.from(doc.querySelectorAll('button')).find(b => b.getAttribute('data-action') === 'grade-exam'));
    await sleep(90);
    const exRes = doc.querySelector('[data-quiz="__exam"] [data-result]');
    ok(!!exRes && exRes.innerHTML.includes('300'), 'examen califica (menciona 300)');
    const st2 = JSON.parse(win.localStorage.getItem('codecamp-db-v2'));
    ok(st2.users[st2.session][C.dataKey] && st2.users[st2.session][C.dataKey].examScore != null, 'examScore guardado en ' + C.dataKey);

    // ---- libro ----
    nav('#/libro'); await sleep(110);
    ok(doc.getElementById('content').innerHTML.length > 500, 'libro renderiza');
    let bookOk = true;
    for(let ch = 1; ch <= C.book; ch++){ nav('#/libro/'+ch); await sleep(32); if(doc.getElementById('content').innerHTML.length < 400) bookOk = false; }
    ok(bookOk, C.book + ' capítulos del libro renderizan');

    // ---- boleta + i18n ----
    nav('#/boleta'); await sleep(110);
    ok(doc.body.textContent.includes('Boleta') || doc.body.textContent.includes('boleta'), 'boleta renderiza');
    const umBtn = doc.getElementById('umenuBtn');
    ok(!!umBtn, 'menú de usuario global');
    if(umBtn){
      click(umBtn); await sleep(110);
      const en = doc.querySelector('[data-um="lang-en"]');
      ok(!!en, 'opción EN en menú');
      if(en){
        click(en); await sleep(240);
        const small = doc.querySelector('header small, .topbar small');
        ok(!!small && small.textContent.trim().length > 0, 'topbar con subtítulo');
        nav('#/boleta'); await sleep(110);
        const h1 = doc.querySelector('#content h1');
        ok(h1 && h1.textContent.includes('Report card'), 'i18n: boleta H1 → Report card');
        const chipsEs = doc.getElementById('content').innerHTML.includes('pendiente');
        if(chipsEs) console.log('  ⚠️ [' + C.id + '] hallazgo sistémico #2: chips ES en boleta EN');
        click(doc.getElementById('umenuBtn')); await sleep(90);
        const es = doc.querySelector('[data-um="lang-es"]');
        if(es){ click(es); await sleep(180); }
      }
    }

    // persistencia: campo propio, sin campos ajenos
    const st3 = JSON.parse(win.localStorage.getItem('codecamp-db-v2'));
    ok(!!st3.users[st3.session][C.dataKey], 'cuenta usa ' + C.dataKey);
    const ajenos = ['dataEn','dataSql','dataPy','dataUnreal','dataUnity'].filter(k => k !== C.dataKey && st3.users[st3.session][k]);
    ok(ajenos.length === 0, 'sin campos de otros cursos (' + ajenos.join(',') + ')');

    // consola
    const realErrors = errors.filter(e => !/could not parse css/i.test(e) && !/not implemented/i.test(e));
    ok(realErrors.length === 0, 'sin errores jsdom: ' + (realErrors[0] || 'limpio'));
  }catch(e){
    fail++; console.log('  ✗ [' + C.id + '] EXCEPCIÓN: ' + e.message + '\n' + (e.stack||'').split('\n').slice(0,4).join('\n'));
    issues.push('EXCEPCIÓN ' + e.message);
  }
  dom.window.close();
  console.log('=== QA ' + C.id + ' (' + C.file + '): ' + pass + ' OK · ' + fail + ' FALLO ===');
  return { id: C.id, pass, fail, issues };
}

(async () => {
  const results = [];
  for(const C of COURSES){ results.push(await qaCourse(C)); }
  const totalF = results.reduce((a,r) => a + r.fail, 0);
  const totalP = results.reduce((a,r) => a + r.pass, 0);
  console.log('\n=== QA CURSOS 3–7: ' + totalP + ' OK · ' + totalF + ' FALLO ===');
  results.forEach(r => { if(r.issues.length) console.log(' [' + r.id + '] ' + r.issues.join(' | ')); });
  process.exit(totalF ? 1 : 0);
})();
