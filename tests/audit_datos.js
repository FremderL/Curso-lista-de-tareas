// Auditoría de integridad de contenido en los 3 cursos
const fs=require('fs');
function norm(s){ return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim(); }
for(const file of ['index.html','javascript.html','ingles.html']){
  const html=fs.readFileSync('/home/user/'+file,'utf8');
  const code=html.match(/<script>\n?([\s\S]*)/)[1];
  const i0=code.indexOf('const MODULES');
  const cuts=[code.indexOf('/* ============================================================\n   APLICACI'), code.indexOf('/* ============================ EXTRAS DEL CURSO')].filter(x=>x>=0);
  const seg=code.slice(i0,Math.min.apply(null,cuts));
  const probs=[]; let nQ=0, nMC=0, nFill=0, examQ=null, lessons=null, exSum=0;
  try{ eval(seg+';__OUT(MODULES,EXAM);'); }catch(e){ console.log('['+file+'] EVAL ERR',e.message); continue; }
  function __OUT(M,E){ lessons=M; examQ=E; }
  const vistos={};
  lessons.forEach(mo=>mo.lessons.forEach(l=>{
    let grad=0;
    l.blocks.forEach(b=>{
      if(b.t==='quiz'){
        grad++;
        const loco=vistos['quiz:'+l.id]=[];
        b.questions.forEach((q,i)=>{
          nQ++;
          if(!q.q || !String(q.q).trim()) probs.push(l.id+' q'+i+' sin texto');
          if(q.type==='mc'){
            nMC++;
            if(!q.options || q.options.length<2) probs.push(l.id+' q'+i+' mc con <2 opciones');
            else{
              if(q.correct==null || q.correct<0 || q.correct>=q.options.length) probs.push(l.id+' q'+i+' correct fuera de rango ('+q.correct+' de '+q.options.length+')');
              const nn=(q.options||[]).map(norm); if(new Set(nn).size!==nn.length) probs.push(l.id+' q'+i+' opciones duplicadas');
            }
          } else if(q.type==='fill'||q.type==='gap'){
            nFill++;
            if(!((q.accept&&q.accept.length)||q.re||q.show)) probs.push(l.id+' q'+i+' fill sin accept/re/show');
          } else if(q.type==='tf'){
            nMC++;
            if(!q.options || q.options.length!==2) probs.push(l.id+' q'+i+' tf sin 2 opciones');
            else if(q.correct==null || q.correct<0 || q.correct>1) probs.push(l.id+' q'+i+' correct tf fuera de rango');
          } else probs.push(l.id+' q'+i+' tipo desconocido: '+q.type);
          const k=norm(q.q); if(k && loco.includes(k)) probs.push(l.id+' pregunta duplicada dentro del quiz: '+String(q.q).slice(0,40)); loco.push(k);
        });
      }
      if(b.t==='exercise'||b.t==='activity') grad++;
    });
    if(!grad) probs.push('lección '+l.id+' SIN bloque calificado');
  }));
  // examen
  if(examQ){
    const qs=examQ.questions||[]; const loco=[];
    qs.forEach((q,i)=>{
      if(q.type==='mc'){ if(!q.options||q.correct==null||q.correct>=q.options.length) probs.push('EXAM q'+i+' mc roto'); }
      else if(q.type==='tf'){ if(!q.options||q.options.length!==2||q.correct==null||q.correct>1) probs.push('EXAM q'+i+' tf roto'); }
      else if(q.type!=='fill') probs.push('EXAM q'+i+' tipo no permitido: '+q.type);
      const k=norm(q.q); if(loco.includes(k)) probs.push('EXAM pregunta duplicada: '+String(q.q).slice(0,40)); loco.push(k);
      exSum+=(q.pts||10);
    });
    if(qs.length!==30) probs.push('EXAM tiene '+qs.length+' preguntas (deben ser 30)');
    if(exSum!==300) probs.push('EXAM suma '+exSum+' puntos (deben ser 300)');
    const letras=qs.filter(q=>q.type==='mc').map(q=>q.options[q.correct]);
    const dist={}; letras.forEach(x=>dist[x]=(dist[x]||0)+1);
    var distExam=dist;
  }
  console.log('['+file+'] preguntas quiz:', nQ, '(mc:'+nMC+' fill:'+nFill+') · EXAM:', (examQ.questions||[]).length+'q/'+exSum+'pts');
  if(distExam) console.log('   distribución de respuestas correctas del examen:', JSON.stringify(distExam));
  console.log(probs.length?('   ✗ PROBLEMAS:\n   - '+probs.join('\n   - ')):'   ✓ sin problemas de integridad');
}
// palabras duplicadas en prosa (lecciones + libro)
console.log('\n=== posibles typos (palabras duplicadas "de de", "el el"...) ===');
for(const file of ['index.html','javascript.html','ingles.html']){
  const html=fs.readFileSync('/home/user/'+file,'utf8');
  const hits=[...html.matchAll(/\b(de|el|la|los|las|en|que|un|una|por|para|con|al|es|se|lo)\s+\1\b/gi)]
    .filter(m=>!/<|>/.test(m[0]));
  const muestra=hits.slice(0,6).map(m=>'"'+m[0]+'"@'+m.index).join(' · ');
  console.log('['+file+']', hits.length, hits.length?('→ '+muestra):'✓');
}
