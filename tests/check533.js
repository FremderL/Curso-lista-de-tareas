// verifica la pregunta corregida de 5-3 en vivo
const fs=require('fs'); const { JSDOM }=require('jsdom');
(async function(){
  const dom=new JSDOM(fs.readFileSync('/home/user/ingles.html','utf8'),{runScripts:'dangerously',url:'https://example.com/',pretendToBeVisual:true});
  const w=dom.window,d=w.document;
  const click=(el)=>el.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
  const nav=(h)=>{ w.location.hash=h; w.dispatchEvent(new w.Event('hashchange')); };
  await new Promise(r=>setTimeout(r,150));
  click(d.querySelector('[data-mode="guest"]')); await new Promise(r=>setTimeout(r,80));
  nav('#/leccion/5-3'); await new Promise(r=>setTimeout(r,60));
  const quiz=d.querySelector('[data-quiz="5-3"]');
  if(!quiz){ console.log('5-3 quiz: no visible (solo actividad)'); return; }
  const qs=w.eval('MODULES.flatMap(m=>m.lessons).find(l=>l.id==="5-3").blocks.filter(b=>b.t==="quiz")[0].questions');
  quiz.querySelectorAll('[data-q]').forEach((q,i)=>{
    const qq=qs[i]; const opts=q.querySelectorAll('.opt');
    if(opts.length && opts[qq.correct]) click(opts[qq.correct]);
    const inp=q.querySelector('input[data-fill]'); if(inp){ inp.value=(qq.accept&&qq.accept[0])||qq.show||'x'; }
  });
  click(quiz.querySelector('[data-action="grade-quiz"]'));
  console.log('5-3 quiz con respuestas correctas:', quiz.querySelector('[data-result]').textContent.replace(/\s+/g,' ').slice(0,30));
})();
