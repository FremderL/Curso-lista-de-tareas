// Mide cuántas veces render() se ejecuta por cada acción del usuario
const fs = require('fs');
const { JSDOM } = require('jsdom');
(async function(){
  const dom=new JSDOM(fs.readFileSync('/home/user/ingles.html','utf8'),{runScripts:'dangerously',url:'https://example.com/',pretendToBeVisual:true});
  const w=dom.window, d=w.document;
  const click=(el)=>el.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
  const nav=(h)=>{ w.location.hash=h; w.dispatchEvent(new w.Event('hashchange')); };
  await new Promise(r=>setTimeout(r,150));
  click(d.querySelector('[data-mode="guest"]'));
  await new Promise(r=>setTimeout(r,80));
  // instrumentar render
  w.eval('window.__rn=0; (function(){ const o=render; render=function(){ window.__rn++; return o.apply(this,arguments); }; })()');
  const cuenta=(et)=>{ const n=w.eval('window.__rn'); console.log(et.padEnd(28), n, n>2?'⚠️':'✓'); w.eval('window.__rn=0'); };
  nav('#/leccion/0-2');                 cuenta('nav a lección:');
  const opt=d.querySelector('.opt'); if(opt) click(opt); cuenta('click en opción quiz:');
  nav('#/repaso');                      cuenta('nav a repaso:');
  click(d.querySelector('[data-srs="start"][data-deck="verbs"]')); cuenta('SRS iniciar sesión:');
  click(d.querySelector('[data-srsbox="verbs"] [data-srs="reveal"]')); cuenta('SRS revelar:');
  click(d.querySelector('[data-srsbox="verbs"] [data-srs="good"]'));   cuenta('SRS acertar:');
  click(d.getElementById('umenuBtn'));  cuenta('abrir menú usuario:');
  click(d.getElementById('umenuBtn'));  cuenta('cerrar menú usuario:');
  nav('#/examen');                      cuenta('nav a examen:');
  const o2=d.querySelector('[data-q="0"] .opt'); if(o2) click(o2); cuenta('click opción examen:');
})();
