// Auditoría global de preguntas escritas: replica la lógica de calificación
// (con el blindaje unicode) y prueba variantes de tecleo real sobre TODAS las
// preguntas fill/gap de quizzes y examen en los 3 cursos.
const fs=require('fs');
function norm(s){ return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim(); }
function normN(s){ return norm(s).replace(/[;:,.]+$/,'').trim(); }
function limpiar(s){ return String(s).replace(/[\u00A0\u2000-\u200B\uFEFF]/g,' ').replace(/[\u2013\u2014\u2212]/g,'-').replace(/[\u2018\u2019\u201B]/g,"'").replace(/[\u201C\u201D]/g,'"').replace(/\s+/g,' ').trim(); }
function loose(s){ return norm(s).replace(/[^a-z0-9]/g,''); }
function fillOk(q,val){ const v=String(val||'').trim(); if(v==='')return false;
  const v2=limpiar(v);
  try{ if(q.re && (new RegExp(q.re,'i').test(v)||new RegExp(q.re,'i').test(v2))) return true; }catch(e){}
  const nv=normN(v2).replace(/[<>]/g,'');
  if((q.accept||[]).some(a=>normN(a).replace(/[<>]/g,'')===nv)) return true;
  try{ if(q.show && loose(v2)!=='' && loose(v2)===loose(q.show)) return true; }catch(e){}
  return false; }

for(const file of ['index.html','javascript.html','ingles.html']){
  const html=fs.readFileSync('/home/user/'+file,'utf8');
  const code=html.match(/<script>\n?([\s\S]*)/)[1];
  const i0=code.indexOf('const MODULES');
  let cuts=[code.indexOf('/* ============================================================\n   APLICACI'), code.indexOf('/* ============================ EXTRAS DEL CURSO')].filter(x=>x>=0);
  if(!cuts.length){ console.log('['+file+'] sin marcador de corte'); continue; }
  const seg=code.slice(i0,Math.min.apply(null,cuts));
  const rows=[];
  try{ eval(seg + '; __OUT(MODULES, EXAM);'); }catch(e){ console.log('['+file+'] EVAL ERR', e.message); continue; }
  function __OUT(M,E){
    M.forEach(mo=>mo.lessons.forEach(l=>l.blocks.forEach(b=>{ if(b.t==='quiz') b.questions.forEach(q=>{ if(q.type==='fill'||q.type==='gap') rows.push({where:l.id,q}); }); })));
    (E.questions||[]).forEach(q=>{ if(q.type==='fill'||q.type==='gap') rows.push({where:'EXAM',q}); });
  }
  let mal=0;
  rows.forEach(({where,q})=>{
    const base=(q.accept&&q.accept[0])||'';
    if(!base) return;
    const cands=[base, base+';', base+'.', ' '+base+' ', base.toUpperCase()];
    if(q.show){ const sh=q.show;
      cands.push(sh, sh.replace(/;$/,''), sh.toUpperCase());
      if(sh.includes(': ')) cands.push(sh.replace(': ', ':\u00A0'));           // NBSP tras dos puntos
      if(sh.includes('-'))  cands.push(sh.replace(/-/g,'\u2013'));             // guion inteligente
    }
    const fails=cands.filter(c=>!fillOk(q,c));
    if(fails.length){ mal++; console.log('['+file+'] '+where+' ✗ '+String(q.q||'').slice(0,50)); console.log('    fallan:',JSON.stringify(fails)); }
  });
  console.log('['+file+'] preguntas escritas revisadas:', rows.length, '· con fallos:', mal, mal===0?'✓':'✗');
}
