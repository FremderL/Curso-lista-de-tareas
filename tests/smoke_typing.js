const fs = require('fs');
const { JSDOM } = require('jsdom');
(async function(){
  const dom=new JSDOM(fs.readFileSync('/home/user/index.html','utf8'),{runScripts:'dangerously',url:'https://example.com/',pretendToBeVisual:true});
  const w=dom.window, d=w.document;
  const click=(el)=>el.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
  const nav=(h)=>{ w.location.hash=h; w.dispatchEvent(new w.Event('hashchange')); };
  await new Promise(r=>setTimeout(r,150));
  click(d.querySelector('[data-mode="guest"]'));
  await new Promise(r=>setTimeout(r,80));
  nav('#/leccion/2-2');
  await new Promise(r=>setTimeout(r,60));
  const quiz=d.querySelector('[data-quiz="2-2"]');
  const correctas=w.eval('MODULES.flatMap(m=>m.lessons).find(l=>l.id==="2-2").blocks.filter(b=>b.t==="quiz").flatMap(b=>b.questions.map(q=>q.correct))');
  // responder las de opciones (flujo real: el usuario hace clic en las opciones)
  quiz.querySelectorAll('[data-q]').forEach((q,i)=>{
    const opts=q.querySelectorAll('.opt'); if(opts.length && opts[correctas[i]]) click(opts[correctas[i]]);
  });
  const inp=quiz.querySelector('input[data-fill]');
  const gradeBtn=quiz.querySelector('[data-action="grade-quiz"]');
  const variantes=[
    'text-align: center;',      // la respuesta modelo
    'text-align:center;',       // sin espacio
    'text-align: center',       // sin punto y coma
    'TEXT-ALIGN: CENTER;',      // mayúsculas
    'Text-align: center;',      // capitalizada
    'text - align : center ;',  // espacios extraños
    '  text-align: center;  ',  // espacios alrededor
    'text\u00A0align: center;', // espacio invisible (NBSP en el guion… ver abajo)
    'text-align:\u00A0center;', // NBSP tras los dos puntos (teclados reales)
    'text–align: center;',      // guion "inteligente" (autocorrector)
    'text-align:  center  ;',   // dobles espacios
    'textalign: center;'        // sin guion (case límite)
  ];
  for(const v of variantes){
    inp.value=v;
    inp.dispatchEvent(new w.Event('input',{bubbles:true}));
    click(gradeBtn);
    const res=quiz.querySelector('[data-result]').textContent.replace(/\s+/g,' ');
    const ok=res.includes('30 de 30');
    console.log((ok?'✓':'✗'), JSON.stringify(v), '→', res.slice(0,34));
    // limpiar el estado de resultado para la siguiente iteración
    nav('#/'); nav('#/leccion/2-2');
    await new Promise(r=>setTimeout(r,40));
    const q2=d.querySelector('[data-quiz="2-2"]');
    q2.querySelectorAll('[data-q]').forEach((q,i)=>{ const o=q.querySelectorAll('.opt'); if(o.length&&o[correctas[i]]) click(o[correctas[i]]); });
  }
})().catch(e=>{console.error('MAIN ERR',e);process.exit(1);});
