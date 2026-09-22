const fs=require('fs'); const { JSDOM }=require('jsdom');
(async function(){
  const dom=new JSDOM(fs.readFileSync('/home/user/ingles.html','utf8'),{runScripts:'dangerously',url:'https://example.com/',pretendToBeVisual:true});
  const w=dom.window,d=w.document;
  const click=(el)=>el.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
  const nav=(h)=>{ w.location.hash=h; w.dispatchEvent(new w.Event('hashchange')); };
  await new Promise(r=>setTimeout(r,150));
  click(d.querySelector('[data-mode="guest"]')); await new Promise(r=>setTimeout(r,80));
  // localizar la lección que contiene la pregunta QUEUE
  const lid=w.eval('MODULES.flatMap(m=>m.lessons).filter(l=>l.blocks.some(b=>((b.questions||b.items||[]).some(q=>String(q.q||q.text||"").includes("QUEUE"))))).map(l=>l.id)[0]');
  nav('#/leccion/'+lid); await new Promise(r=>setTimeout(r,60));
  const ok=d.querySelector('.view').textContent.includes('QUEUE HERE');
  // responder la pregunta correctamente: opción correct:1
  const qi=w.eval('MODULES.flatMap(m=>m.lessons).find(l=>l.id==="'+lid+'").blocks.findIndex(b=>(b.questions||b.items||[]).some(q=>String(q.q||q.text||"").includes("QUEUE")))');
  console.log('pregunta QUEUE en lección', lid, '· renderizada:', ok);
  // la tarjeta SRS nueva
  nav('#/repaso'); await new Promise(r=>setTimeout(r,50));
  const enMazo=w.eval('DECKS.vocab.cards.some(c=>c.f==="queue")');
  console.log('tarjeta queue en mazo vocab:', enMazo, '· total tarjetas vocab:', w.eval('DECKS.vocab.cards.length'));
})();
