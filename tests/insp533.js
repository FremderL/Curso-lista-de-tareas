const fs=require('fs');
const code=fs.readFileSync('/home/user/ingles.html','utf8').match(/<script>\n?([\s\S]*)/)[1];
const i0=code.indexOf('const MODULES');
const i1=code.indexOf('/* ============================================================\n   APLICACI');
const seg=code.slice(i0,i1);
let M; eval(seg+';M=MODULES;');
const l=M.flatMap(m=>m.lessons).find(l=>l.id==='5-3');
l.blocks.filter(b=>b.t==='quiz').forEach(b=>{
  b.questions.forEach((q,i)=>{
    if(q.type!=='mc') return;
    const nn=q.options.map(s=>String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim());
    const dup=nn.filter((x,ix)=>nn.indexOf(x)!==ix);
    if(dup.length){
      console.log('PREGUNTA', i, '·', q.q);
      q.options.forEach((o,oi)=>console.log('  ', ('ABCD'[oi]||'?'), '·', o));
      console.log('correct:', q.correct, '→', q.options[q.correct]);
    }
  });
});
