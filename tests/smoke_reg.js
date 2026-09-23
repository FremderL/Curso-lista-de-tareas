// Regresión core: C2 (lecciones, ejercicio, examen) · C3 (lecciones, actividad, SRS, examen) · recuperación
const fs = require('fs');
const { JSDOM } = require('jsdom');
function makeDom(file, pre){ const o={runScripts:'dangerously',url:'https://example.com/',pretendToBeVisual:true}; if(pre)o.beforeParse=pre; return new JSDOM(fs.readFileSync('/home/user/'+file,'utf8'),o); }
(async function(){
  { // C2
    const dom=makeDom('javascript.html'); const {window:w}=dom; const {document:d}=w;
    const errors=[]; w.addEventListener('error',e=>errors.push(String(e.message||e)));
    const click=(el)=>el.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
    const nav=(h)=>{ w.location.hash=h; w.dispatchEvent(new w.Event('hashchange')); };
    await new Promise(r=>setTimeout(r,150));
    click(d.querySelector('[data-mode="guest"]')); await new Promise(r=>setTimeout(r,80));
    const links=[...d.querySelectorAll('#sidebar .slesson')].length;
    nav('#/leccion/1-3');
    d.querySelector('[data-ex="1-3"] textarea').value="const original=['A']; const alias=original; alias.push('B'); console.log('original:',original); const copiaReal=[...original]; copiaReal.push('C'); console.log('original tras copia:',original); console.log(copiaReal); console.log(alias===original); console.log(copiaReal===original); // sí true no false";
    click(d.querySelector('[data-action="grade-ex"]'));
    console.log('C2 lecciones:', links, '· ej 1-3:', d.querySelector('[data-ex="1-3"] [data-result]').textContent.replace(/\s+/g,' ').slice(0,16), '· menú header:', !!d.querySelector('#topbar .umenu'));
    nav('#/examen');
    const corr=w.eval('EXAM.questions.map(q=>q.correct)');
    d.querySelectorAll('[data-q]').forEach((q,i)=>{
      const opts=q.querySelectorAll('.opt'); if(opts.length) click(opts[corr[i]]);
      const inp=q.querySelector('input[data-fill]');
      if(inp){ const m=JSON.parse(w.eval('(function(){const q=EXAM.questions['+i+'];return JSON.stringify({accept:q.accept||[],re:q.re||null,show:q.show||null});})()'));
        let pick=(m.accept&&m.accept[0])||'.';
        try{ if(!(m.re&&new RegExp(m.re,'i').test(pick))){ const hit=(m.accept||[]).filter(c=>{try{return new RegExp(m.re,'i').test(c);}catch(e){return false;}}); if(hit.length)pick=hit[0]; else if(m.re&&m.show&&pick.replace(/[^a-z0-9]/gi,'')===m.show.replace(/[^a-z0-9]/gi,''))pick=m.show; } }catch(e){}
        inp.value=pick; }
    });
    click(d.querySelector('[data-action="grade-exam"]'));
    console.log('C2 examen:', d.querySelector('[data-quiz="__exam"] [data-result]').textContent.replace(/\s+/g,' ').slice(0,22), '· errores:', errors.length?errors.slice(0,1):'ninguno');
  }
  { // C3
    const dom=makeDom('ingles.html'); const {window:w}=dom; const {document:d}=w;
    const errors=[]; w.addEventListener('error',e=>errors.push(String(e.message||e)));
    const click=(el)=>el.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
    const nav=(h)=>{ w.location.hash=h; w.dispatchEvent(new w.Event('hashchange')); };
    await new Promise(r=>setTimeout(r,150));
    click(d.querySelector('[data-mode="guest"]')); await new Promise(r=>setTimeout(r,80));
    const links=[...d.querySelectorAll('#sidebar .slesson')].length;
    nav('#/leccion/0-2');
    const sec=d.querySelector('[data-activity="0-2"]');
    const items=w.eval('MODULES.flatMap(m=>m.lessons).find(l=>l.id==="0-2").blocks.filter(b=>b.t==="activity")[0].items');
    sec.querySelectorAll('.qcard[data-qi]').forEach(q=>{
      const it=items[parseInt(q.getAttribute('data-qi'),10)]; if(!it||!it.type) return;
      if(it.type==='mc'){ const o=q.querySelectorAll('.opt'); if(o[it.correct]) click(o[it.correct]); }
      if(it.type==='gap'){ const i2=q.querySelector('input[data-gap]'); if(i2) i2.value=(it.accept&&it.accept[0])||'x'; }
    });
    click(sec.querySelector('[data-action="grade-activity"]'));
    console.log('C3 lecciones:', links, '· act 0-2:', sec.querySelector('[data-result]').textContent.replace(/\s+/g,' ').slice(0,16));
    nav('#/repaso'); await new Promise(r=>setTimeout(r,50));
    click(d.querySelector('[data-srs="start"][data-deck="verbs"]')); await new Promise(r=>setTimeout(r,60));
    click(d.querySelector('[data-srsbox="verbs"] [data-srs="reveal"]')); await new Promise(r=>setTimeout(r,30));
    click(d.querySelector('[data-srsbox="verbs"] [data-srs="good"]'));
    console.log('C3 SRS ok:', d.querySelector('[data-srsbox="verbs"] .srs-zone').textContent.includes('Tarjeta 2'));
    nav('#/examen');
    const corr=w.eval('EXAM.questions.map(q=>q.correct)');
    d.querySelectorAll('[data-q]').forEach((q,i)=>{
      const opts=q.querySelectorAll('.opt'); if(opts.length) click(opts[corr[i]]);
      const inp=q.querySelector('input[data-fill]');
      if(inp){ const m=JSON.parse(w.eval('(function(){const q=EXAM.questions['+i+'];return JSON.stringify({accept:q.accept||[],re:q.re||null,show:q.show||null});})()'));
        let pick=(m.accept&&m.accept[0])||'.';
        try{ if(!(m.re&&new RegExp(m.re,'i').test(pick))){ const hit=(m.accept||[]).filter(c=>{try{return new RegExp(m.re,'i').test(c);}catch(e){return false;}}); if(hit.length)pick=hit[0]; else if(m.re&&m.show&&pick.replace(/[^a-z0-9]/gi,'')===m.show.replace(/[^a-z0-9]/gi,''))pick=m.show; } }catch(e){}
        inp.value=pick; }
    });
    click(d.querySelector('[data-action="grade-exam"]'));
    console.log('C3 examen:', d.querySelector('[data-quiz="__exam"] [data-result]').textContent.replace(/\s+/g,' ').slice(0,22), '· errores:', errors.length?errors.slice(0,1):'ninguno');
  }
  { // recuperación C3 con DB corrupta
    const dom=makeDom('ingles.html',(w)=>{ w.localStorage.setItem('codecamp-db-v2','{ROTO'); });
    await new Promise(r=>setTimeout(r,200));
    console.log('C3 recuperación:', dom.window.document.body.textContent.includes('Modo de recuperación')?'ok':'FALLO');
  }
})().catch(e=>{console.error('MAIN ERR',e);process.exit(1);});
