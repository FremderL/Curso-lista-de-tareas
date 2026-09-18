
/* ============================ EXTRAS DEL CURSO DE INGLÉS ============================ */

/* ---------- Web Speech API (con degradación elegante) ---------- */
function speechAvailable(){ try{ return typeof window.speechSynthesis !== 'undefined' && typeof window.SpeechSynthesisUtterance !== 'undefined'; }catch(e){ return false; } }
function sayText(text, rate){
  if(!speechAvailable() || !text) return;
  try{
    window.speechSynthesis.cancel();
    const u = new window.SpeechSynthesisUtterance(String(text));
    u.lang = 'en-GB'; u.rate = rate || 1; u.pitch = 1;
    try{
      const vs = window.speechSynthesis.getVoices() || [];
      const v = vs.filter(function(x){ return (x.lang || '').indexOf('en-GB') === 0; })[0]
             || vs.filter(function(x){ return (x.lang || '').indexOf('en') === 0; })[0];
      if(v) u.voice = v;
    }catch(e){}
    window.speechSynthesis.speak(u);
  }catch(e){}
}
function audioBtnsHtml(text){
  if(!speechAvailable()){
    return '<div class="audiobox"><span class="anote">🔊 Audio no disponible en este visor: usa la 📄 transcripción (o abre el curso en Chrome/Edge para escuchar).</span></div>';
  }
  return '<div class="audiobox">' +
    '<button type="button" class="saybtn" data-say="' + esc(text) + '" data-rate="1">▶ Escuchar</button>' +
    '<button type="button" class="saybtn slow" data-say="' + esc(text) + '" data-rate="0.72">🐢 Lento</button>' +
    '<button type="button" class="saybtn" data-say=" " data-rate="1" title="Detener" style="background:#e2e8f0;color:#475569">⏹</button>' +
    '</div>';
}
function transcriptHtml(text){
  if(!text) return '';
  return '<details class="tscript"><summary>📄 Transcripción</summary><p>' + esc(text) + '</p></details>';
}

/* ---------- mazos SRS ---------- */
const SRS_DECKS = {
  verbs:{ name:'Verbos irregulares', emoji:'⚡', desc:'Las 3 formas + 3.ª persona + -ing de los 45 verbos B1.',
    cards:[
      {f:'be', es:'ser/estar', b:'was/were', pp:'been', s:'is', ing:'being'},
      {f:'become', es:'convertirse', b:'became', pp:'become', s:'becomes', ing:'becoming'},
      {f:'begin', es:'empezar', b:'began', pp:'begun', s:'begins', ing:'beginning'},
      {f:'break', es:'romper', b:'broke', pp:'broken', s:'breaks', ing:'breaking'},
      {f:'bring', es:'traer', b:'brought', pp:'brought', s:'brings', ing:'bringing'},
      {f:'build', es:'construir', b:'built', pp:'built', s:'builds', ing:'building'},
      {f:'buy', es:'comprar', b:'bought', pp:'bought', s:'buys', ing:'buying'},
      {f:'catch', es:'atrapar', b:'caught', pp:'caught', s:'catches', ing:'catching'},
      {f:'choose', es:'elegir', b:'chose', pp:'chosen', s:'chooses', ing:'choosing'},
      {f:'come', es:'venir', b:'came', pp:'come', s:'comes', ing:'coming'},
      {f:'do', es:'hacer', b:'did', pp:'done', s:'does', ing:'doing'},
      {f:'drink', es:'beber', b:'drank', pp:'drunk', s:'drinks', ing:'drinking'},
      {f:'drive', es:'manejar', b:'drove', pp:'driven', s:'drives', ing:'driving'},
      {f:'eat', es:'comer', b:'ate', pp:'eaten', s:'eats', ing:'eating'},
      {f:'fall', es:'caerse', b:'fell', pp:'fallen', s:'falls', ing:'falling'},
      {f:'feel', es:'sentir', b:'felt', pp:'felt', s:'feels', ing:'feeling'},
      {f:'find', es:'encontrar', b:'found', pp:'found', s:'finds', ing:'finding'},
      {f:'fly', es:'volar', b:'flew', pp:'flown', s:'flies', ing:'flying'},
      {f:'forget', es:'olvidar', b:'forgot', pp:'forgotten', s:'forgets', ing:'forgetting'},
      {f:'get', es:'obtener/ponerse', b:'got', pp:'got/gotten', s:'gets', ing:'getting'},
      {f:'give', es:'dar', b:'gave', pp:'given', s:'gives', ing:'giving'},
      {f:'go', es:'ir', b:'went', pp:'gone', s:'goes', ing:'going'},
      {f:'have', es:'tener/haber', b:'had', pp:'had', s:'has', ing:'having'},
      {f:'hear', es:'oír', b:'heard', pp:'heard', s:'hears', ing:'hearing'},
      {f:'keep', es:'guardar', b:'kept', pp:'kept', s:'keeps', ing:'keeping'},
      {f:'know', es:'saber/conocer', b:'knew', pp:'known', s:'knows', ing:'knowing'},
      {f:'leave', es:'dejar/irse', b:'left', pp:'left', s:'leaves', ing:'leaving'},
      {f:'lose', es:'perder', b:'lost', pp:'lost', s:'loses', ing:'losing'},
      {f:'make', es:'hacer/fabricar', b:'made', pp:'made', s:'makes', ing:'making'},
      {f:'meet', es:'conocer/reunirse', b:'met', pp:'met', s:'meets', ing:'meeting'},
      {f:'pay', es:'pagar', b:'paid', pp:'paid', s:'pays', ing:'paying'},
      {f:'put', es:'poner', b:'put', pp:'put', s:'puts', ing:'putting'},
      {f:'read', es:'leer', b:'read', pp:'read', s:'reads', ing:'reading'},
      {f:'run', es:'correr', b:'ran', pp:'run', s:'runs', ing:'running'},
      {f:'say', es:'decir', b:'said', pp:'said', s:'says', ing:'saying'},
      {f:'see', es:'ver', b:'saw', pp:'seen', s:'sees', ing:'seeing'},
      {f:'sell', es:'vender', b:'sold', pp:'sold', s:'sells', ing:'selling'},
      {f:'send', es:'enviar', b:'sent', pp:'sent', s:'sends', ing:'sending'},
      {f:'sit', es:'sentarse', b:'sat', pp:'sat', s:'sits', ing:'sitting'},
      {f:'sleep', es:'dormir', b:'slept', pp:'slept', s:'sleeps', ing:'sleeping'},
      {f:'speak', es:'hablar', b:'spoke', pp:'spoken', s:'speaks', ing:'speaking'},
      {f:'take', es:'tomar/llevar', b:'took', pp:'taken', s:'takes', ing:'taking'},
      {f:'teach', es:'enseñar', b:'taught', pp:'taught', s:'teaches', ing:'teaching'},
      {f:'tell', es:'contar', b:'told', pp:'told', s:'tells', ing:'telling'},
      {f:'think', es:'pensar', b:'thought', pp:'thought', s:'thinks', ing:'thinking'},
      {f:'understand', es:'entender', b:'understood', pp:'understood', s:'understands', ing:'understanding'},
      {f:'write', es:'escribir', b:'wrote', pp:'written', s:'writes', ing:'writing'}
    ]},
  vocab:{ name:'Vocabulario B1', emoji:'🗂️', desc:'Palabras de alta frecuencia por tema, con ejemplo.',
    cards:[
      {f:'achieve', es:'lograr', ex:'She achieved her goal.'},
      {f:'afford', es:'poder pagar', ex:'I can’t afford a new laptop.'},
      {f:'apply for', es:'postularse a', ex:'I applied for the job.'},
      {f:'abroad', es:'al extranjero', ex:'We’re going abroad this summer.'},
      {f:'book (v.)', es:'reservar', ex:'Let’s book a table.'},
      {f:'boring', es:'aburrido', ex:'The film was so boring I fell asleep.'},
      {f:'borrow', es:'prestarse (tomar prestado)', ex:'Can I borrow your pen?'},
      {f:'bring', es:'traer', ex:'Bring your dictionary tomorrow.'},
      {f:'cheap', es:'barato', ex:'It was the cheapest flight.'},
      {f:'crowded', es:'llenó de gente', ex:'The bus was crowded this morning.'},
      {f:'decide', es:'decidir', ex:'We decided to stay home.'},
      {f:'delay', es:'retraso', ex:'The flight had a two-hour delay.'},
      {f:'depend on', es:'depender de', ex:'It depends on the weather.'},
      {f:'describe', es:'describir', ex:'Describe the photo in detail.'},
      {f:'deadline', es:'fecha límite', ex:'The deadline is on Friday.'},
      {f:'empty', es:'vacío', ex:'The fridge is empty.'},
      {f:'especially', es:'especialmente', ex:'I love fruit, especially mangoes.'},
      {f:'experience', es:'experiencia', ex:'She has a lot of work experience.'},
      {f:'fit', es:'quedar (de talla)', ex:'These shoes don’t fit me.'},
      {f:'guest', es:'invitado', ex:'We invited ten guests.'},
      {f:'hurry', es:'apresurarse', ex:'Hurry up, we’re late!'},
      {f:'improve', es:'mejorar', ex:'My English is improving.'},
      {f:'instead of', es:'en lugar de', ex:'We walked instead of taking the bus.'},
      {f:'join', es:'unirse', ex:'Do you want to join us?'},
      {f:'keep', es:'mantener/guardar', ex:'Keep the receipt.'},
      {f:'lend', es:'prestar (dar)', ex:'Can you lend me five euros?'},
      {f:'look forward to', es:'esperar con ganas', ex:'I look forward to seeing you.'},
      {f:'miss', es:'extrañar/perder (un tren)', ex:'I missed the last train.'},
      {f:'noise', es:'ruido', ex:'Don’t make so much noise.'},
      {f:'pass', es:'aprobar', ex:'She passed her exam with 85%.'},
      {f:'practise', es:'practicar', ex:'I practise English every day.'},
      {f:'quiet', es:'tranquilo/silencioso', ex:'The library is quiet.'},
      {f:'receive', es:'recibir', ex:'I received your email.'},
      {f:'refund', es:'reembolso', ex:'Can I get a refund?'},
      {f:'rent', es:'rentar/alquilar', ex:'We rent a small flat.'},
      {f:'repair', es:'reparar', ex:'He repaired my bike.'},
      {f:'seem', es:'parecer', ex:'They seem very happy.'},
      {f:'spend', es:'gastar/pasar (tiempo)', ex:'I spend too much time online.'},
      {f:'suggest', es:'sugerir', ex:'I suggest starting early.'},
      {f:'travelling', es:'viajar (gerundio UK)', ex:'Travelling by train is relaxing.'},
      {f:'useful', es:'útil', ex:'That app is really useful.'},
      {f:'waste', es:'desperdiciar', ex:'Don’t waste your time.'}
    ]}
};
const SRS_INTERVALS = [1, 2, 4, 8, 16];
function srsStore(){ try{ if(!state.srs) state.srs = {}; return state.srs; }catch(e){ const f={}; try{ state = blankData(); state.srs = f; }catch(e2){} return f; } }
function srsDueCards(deck){
  const st = srsStore(), now = Date.now(), due = [];
  (SRS_DECKS[deck].cards || []).forEach(function(c, i){
    const key = deck + '-' + i;
    const rec = st[key];
    if(!rec || !rec.due || rec.due <= now) due.push(i);
  });
  return due;
}
function srsCounts(deck){
  const st = srsStore(), now = Date.now();
  let total = (SRS_DECKS[deck].cards || []).length, newc = 0, review = 0;
  (SRS_DECKS[deck].cards || []).forEach(function(c, i){
    const rec = st[deck + '-' + i];
    if(!rec) newc++;
    else if(rec.due <= now) review++;
  });
  return { total:total, nuevas:newc, repaso:review };
}
let SRS_SESSION = null;
function srsStartSession(deck){
  const due = srsDueCards(deck);
  const st = srsStore();
  const nuevas = due.filter(function(i){ return !st[deck + '-' + i]; }).slice(0, 10);
  const repaso = due.filter(function(i){ return st[deck + '-' + i]; }).slice(0, 10);
  SRS_SESSION = { deck:deck, queue:nuevas.concat(repaso), i:0, good:0, again:0, revealed:false };
}
function srsCardHtml(){
  const s = SRS_SESSION;
  const deck = SRS_DECKS[s.deck];
  if(!s.queue.length){
    return '<div class="srs-card"><div class="front">🎉</div><div class="es">No hay tarjetas para hoy de este mazo. ¡Vuelve mañana!</div></div>' +
      '<div class="srs-actions"><button type="button" class="hear" data-srs="exit">Volver</button></div>';
  }
  if(s.i >= s.queue.length){
    saveState();
    return '<div class="srs-card"><div class="front">✅ ¡Sesión lista!</div><div class="back">Correctas: <b>' + s.good + '</b> · A repasar: <b>' + s.again + '</b><br>Tu progreso quedó guardado en tu cuenta.</div></div>' +
      '<div class="srs-actions"><button type="button" class="hear" data-srs="exit">Volver</button></div>';
  }
  const idx = s.queue[s.i];
  const c = deck.cards[idx];
  let body;
  if(s.deck === 'verbs'){
    body = s.revealed
      ? '<div class="back"><b>' + esc(c.f) + '</b> → pasado: <b>' + esc(c.b) + '</b> · participio: <b>' + esc(c.pp) + '</b><br>3.ª pers.: ' + esc(c.s) + ' · -ing: ' + esc(c.ing) + '</div>'
      : '<div class="front">' + esc(c.f) + '</div><div class="es">' + esc(c.es) + '</div><div class="es" style="color:#94a3b8">¿Recuerdas las 5 formas? Toca «Ver respuesta».</div>';
  } else {
    body = s.revealed
      ? '<div class="back"><b>' + esc(c.f) + '</b> = ' + esc(c.es) + '<br><i>“' + esc(c.ex) + '”</i></div>'
      : '<div class="front">' + esc(c.f) + '</div><div class="es" style="color:#94a3b8">¿Qué significa? Toca «Ver respuesta».</div>';
  }
  const hearText = s.deck === 'verbs' ? (c.f + '. ' + c.b + '. ' + c.pp) : (c.f + '. ' + (c.ex || c.es));
  return '<div class="srs-card">' + body + '</div>' +
    '<div class="srs-actions">' +
    (speechAvailable() ? '<button type="button" class="hear" data-say="' + esc(hearText) + '" data-rate="0.9">🎧 Escuchar</button>' : '') +
    (s.revealed
      ? '<button type="button" class="good" data-srs="good">😎 Lo sabía</button>' +
        '<button type="button" class="again" data-srs="again">😕 Otra vez</button>'
      : '<button type="button" class="good" data-srs="reveal">👀 Ver respuesta</button>') +
    '</div>' +
    '<div class="srs-prog">Tarjeta ' + (s.i + 1) + ' de ' + s.queue.length + ' · Caja ' + ((srsStore()[s.deck + '-' + idx] || {}).box != null ? (srsStore()[s.deck + '-' + idx].box + 1) : 1) + '/5</div>';
}
function srsHtml(b){
  const deck = SRS_DECKS[b.deck];
  if(!deck) return '';
  const c = srsCounts(b.deck);
  return '<div class="srsbox" data-srsbox="' + b.deck + '">' +
    '<h3 class="quiz-title">🃏 ' + deck.emoji + ' ' + deck.name + '</h3>' +
    '<p class="quiz-sub">' + (b.sub || deck.desc) + '</p>' +
    '<div class="srs-stats"><span class="srs-chip">🆕 Nuevas: ' + c.nuevas + '</span>' +
    '<span class="srs-chip">🔁 Por repasar: ' + c.repaso + '</span>' +
    '<span class="srs-chip">📚 Total: ' + c.total + '</span></div>' +
    '<div class="srs-zone">' + (SRS_SESSION && SRS_SESSION.deck === b.deck ? srsCardHtml() :
      '<button type="button" class="btn" data-srs="start" data-deck="' + b.deck + '">▶ Repasar (' + (c.nuevas + c.repaso) + ' pendientes)</button>') + '</div>' +
    '</div>';
}
function srsAction(el){
  const act = el.getAttribute('data-srs');
  const box = el.closest('[data-srsbox]');
  const deck = box ? box.getAttribute('data-srsbox') : (el.getAttribute('data-deck') || (SRS_SESSION && SRS_SESSION.deck));
  if(act === 'start'){ srsStartSession(deck); }
  else if(act === 'exit'){ SRS_SESSION = null; saveState(); }
  else if(!SRS_SESSION) return;
  else if(act === 'reveal'){ SRS_SESSION.revealed = true; }
  else if(act === 'good' || act === 'again'){
    const s = SRS_SESSION;
    const idx = s.queue[s.i];
    const st = srsStore();
    const rec = st[deck + '-' + idx] || { box:0, due:0 };
    if(act === 'good'){ rec.box = Math.min(4, (rec.box || 0) + 1); s.good++; }
    else { rec.box = 0; s.again++; if(s.queue.indexOf(idx) === s.queue.lastIndexOf(idx)) s.queue.push(idx); }
    rec.due = Date.now() + SRS_INTERVALS[rec.box] * 86400000;
    st[deck + '-' + idx] = rec;
    SRS_SESSION.i++;
    SRS_SESSION.revealed = false;
    saveState();
  } else return;
  if(box){ const zone = box.querySelector('.srs-zone'); if(zone) zone.innerHTML = srsCardHtml(); }
  try{ renderSidebar(CURRENT); }catch(e){}
}

/* ---------- actividades calificadas ---------- */
function activityItemHtml(it, i, b){
  if(it.sec && !it.type) return '<div class="qsec">' + it.sec + '</div>';
  const pts = it.pts || 10;
  const audio = it.audio ? audioBtnsHtml(it.audio) : '';
  const tscript = it.transcript ? transcriptHtml(it.transcript) : '';
  let body = '';
  if(it.type === 'mc'){
    body = '<div class="opts">' + (it.options || []).map(function(o, oi){
      return '<button type="button" class="opt" data-ao="' + oi + '"><span class="ol">' + String.fromCharCode(65 + oi) + '</span><span>' + o + '</span></button>';
    }).join('') + '</div>';
  } else if(it.type === 'gap'){
    body = '<div class="fillwrap"><input type="text" data-gap="' + i + '" autocomplete="off" spellcheck="false" placeholder="Escribe tu respuesta…"><span class="hint">' + (it.hint || '') + '</span></div>';
  }
  return '<div class="qcard" data-qi="' + i + '">' +
    '<div class="qq">' + it.q + '</div><span class="qpts">' + pts + ' pts</span>' + audio + body + tscript +
    '<div class="afb" data-fb></div></div>';
}
function activityHtml(b, lessonId){
  const items = b.items || [];
  let h = '<section class="quiz" data-activity="' + lessonId + '">' +
    '<h3 class="quiz-title">' + (b.title || '✏️ Actividad') + '</h3>' +
    '<p class="quiz-sub">' + (b.sub || '') + '</p>';
  if(b.prompt){
    h += '<div class="audiobox" style="background:#f5f3ff;border-color:#ddd6fe"><b>📋 Tarea:</b> ' + esc(b.prompt) + '</div>';
    if(b.notes && b.notes.length){
      h += '<div class="qsec">Notas a cubrir</div><ul class="nice">' + b.notes.map(function(n){ return '<li>' + n + '</li>'; }).join('') + '</ul>';
    }
    h += '<div class="writebox"><textarea data-write spellcheck="false" placeholder="Escribe aquí tu respuesta en inglés…"></textarea>' +
      '<div class="wordcount"><span data-wc>0</span> palabras' + (b.minWords ? ' (mínimo recomendado: ' + b.minWords + ')' : '') + '</div></div>';
  }
  h += items.map(function(it, i){ return activityItemHtml(it, i, b); }).join('');
  if(b.rubricTitle || b.checklist){
    h += '<div class="qsec">' + (b.rubricTitle || 'Rúbrica de autoevaluación (sé honesto)') + '</div>';
    (b.checklist || []).forEach(function(c, i){
      h += '<label class="chk"><input type="checkbox" data-chk="' + i + '"><span>' + c.label + '</span><span class="qpts">' + (c.pts || 10) + ' pts</span></label>';
    });
  }
  h += '<div class="quiz-actions"><button type="button" class="btn" data-action="grade-activity" data-lesson="' + lessonId + '">✅ Calificar mi actividad</button>' +
    '<span class="quiz-remain" data-act-respondidas></span></div>' +
    '<div class="quiz-result" data-result></div></section>';
  return h;
}
function actAnswered(section){
  let n = 0, total = 0;
  section.querySelectorAll('.qcard[data-qi]').forEach(function(q){
    total++;
    const gap = q.querySelector('input[data-gap]');
    if(gap && gap.value.trim() !== '') n++;
    if(q.querySelector('.opt.sel')) n++;
  });
  const w = section.querySelector('[data-write]');
  if(w){ total++; if(w.value.trim().split(/\s+/).filter(Boolean).length > 0) n++; }
  const chks = section.querySelectorAll('input[data-chk]');
  if(chks.length){ total += chks.length; chks.forEach(function(c){ if(c.checked) n++; }); }
  const span = section.querySelector('[data-act-respondidas]');
  if(span) span.textContent = 'Respondidas: ' + n + '/' + total;
}
function gradeActivity(section){
  const lessonId = section.getAttribute('data-activity');
  const lesson = LESSONS_BY_ID[lessonId];
  if(!lesson) return;
  const actBlock = lesson.blocks.filter(function(b){ return b.t === 'activity'; })[0];
  if(!actBlock) return;
  let earned = 0, max = 0;
  const items = actBlock.items || [];
  section.querySelectorAll('.qcard[data-qi]').forEach(function(q){
    const i = parseInt(q.getAttribute('data-qi'), 10);
    const it = items[i];
    if(!it || !it.type) return;
    const pts = it.pts || 10;
    max += pts;
    let ok = false;
    if(it.type === 'mc'){
      const sel = q.querySelector('.opt.sel');
      ok = sel && parseInt(sel.getAttribute('data-ao'), 10) === it.correct;
    } else if(it.type === 'gap'){
      const inp = q.querySelector('input[data-gap]');
      ok = inp ? fillOk(it, inp.value) : false;
    }
    q.classList.remove('okp', 'failp');
    q.classList.add(ok ? 'okp' : 'failp');
    const fb = q.querySelector('[data-fb]');
    if(fb) fb.innerHTML = '<span class="' + (ok ? 'okm' : 'nom') + '">' + (ok ? '✓' : '✗') + '</span>' + (it.explain ? ' ' + it.explain : '');
    if(ok) earned += pts;
  });
  const chks = section.querySelectorAll('input[data-chk]');
  if(chks.length){
    (actBlock.checklist || []).forEach(function(c, i){
      const pts = c.pts || 10;
      max += pts;
      const el = section.querySelector('input[data-chk="' + i + '"]');
      if(el && el.checked) earned += pts;
    });
  }
  const w = section.querySelector('[data-write]');
  let note = '';
  if(w && actBlock.minWords){
    const words = w.value.trim().split(/\s+/).filter(Boolean).length;
    if(words > 0 && words < actBlock.minWords){
      earned = Math.round(earned / 2);
      note = '<p style="color:#b45309;font-weight:700;font-size:13px">⚠️ Escribiste ' + words + ' palabras (mínimo ' + actBlock.minWords + '): la calificación quedó a la mitad. Completa tu texto y vuelve a intentar.</p>';
    }
  }
  const result = section.querySelector('[data-result]');
  if(result){
    result.innerHTML = note + resultBoxHtml(earned, max, true);
    result.classList.add('show');
    const pct = max ? Math.round(earned / max * 100) : 0;
    if(pct >= 70) try{ confetti(result); }catch(e){}
  }
  const prev = state.scores[lessonId];
  if(prev == null || earned > prev) state.scores[lessonId] = earned;
  saveState();
  updateChrome();
  renderSidebar(parseHash());
}

/* ---------- envolturas del motor: bloques nuevos + rutas ---------- */
(function(){
  const __origBlockHtml = blockHtml;
  blockHtml = function(b, lessonId){
    if(b.t === 'audio'){
      return '<div class="audiowrap">' + audioBtnsHtml(b.text || '') +
        (b.title ? '<p class="quiz-sub" style="margin-top:6px">' + b.title + '</p>' : '') +
        (b.transcript ? transcriptHtml(b.transcript) : '') + '</div>';
    }
    if(b.t === 'activity') return activityHtml(b, lessonId);
    if(b.t === 'srs') return srsHtml(b);
    return __origBlockHtml(b, lessonId);
  };
  const __origLessonMax = lessonMax;
  lessonMax = function(l){
    let max = __origLessonMax(l);
    (l.blocks || []).forEach(function(b){
      if(b.t === 'activity'){
        (b.items || []).forEach(function(it){ if(it.type) max += (it.pts || 10); });
        (b.checklist || []).forEach(function(c){ max += (c.pts || 10); });
      }
    });
    return max;
  };
  const __origUpdateUserChip = updateUserChip;
  updateUserChip = function(){
    try{ if(window.__ccMenuReady) updateUserMenu(); }catch(e){}
    return __origUpdateUserChip();
  };
  const __origRenderSidebar = renderSidebar;
  renderSidebar = function(route){
    __origRenderSidebar(route);
    const side = document.getElementById('sidebar');
    if(!side) return;
    let due = 0;
    Object.keys(SRS_DECKS).forEach(function(k){ due += srsCounts(k).nuevas + srsCounts(k).repaso; });
    side.insertAdjacentHTML('beforeend',
      '<button class="sextra" data-um-nav="srs">🃏 Repaso del día' + (due ? '<span class="sscore" style="margin-left:auto">' + due + '</span>' : '') + '</button>');
  };
  const __origParseHash = parseHash;
  parseHash = function(){
    try{
      const h = (location.hash || '').replace(/^#\/?/, '');
      if(h === 'repaso') return { view:'srs' };
    }catch(e){}
    return __origParseHash();
  };
  const __origRouteHash = routeHash;
  routeHash = function(r){ if(r && r.view === 'srs') return '#/repaso'; return __origRouteHash(r); };
  const __origRender = render;
  render = function(){
    if(CURRENT && CURRENT.view === 'srs'){
      const content = document.getElementById('content');
      EDITOR_CODES = [];
      content.innerHTML = viewSRS();
      try{ initDemos(content); }catch(e){}
      renderSidebar(CURRENT);
      updateChrome();
      try{ window.scrollTo({ top:0, left:0, behavior:'instant' }); }catch(e){ window.scrollTo(0, 0); }
      try{ content.scrollTop = 0; }catch(e){}
      return;
    }
    return __origRender();
  };
})();

function viewSRS(){
  let h = '<div class="view"><h2 style="font-size:26px;letter-spacing:-.02em">🃏 Repaso del día <small style="color:#64748b;font-size:14px;font-weight:600">repetición espaciada (SRS)</small></h2>' +
    '<p class="lead-text">Cinco minutos al día aquí valen más que dos horas el domingo: repasa cada tarjeta justo antes de olvidarla. Aciertas → la tarjeta sube de caja (1→2→4→8→16 días). Falls → vuelve a la caja 1, sin culpa.</p>';
  Object.keys(SRS_DECKS).forEach(function(k){
    const d = SRS_DECKS[k], c = srsCounts(k);
    h += '<div class="srsbox" data-srsbox="' + k + '"><h3 class="quiz-title" style="margin:0">' + d.emoji + ' ' + d.name + '</h3>' +
      '<p class="quiz-sub">' + d.desc + '</p>' +
      '<div class="srs-stats"><span class="srs-chip">🆕 Nuevas: ' + c.nuevas + '</span><span class="srs-chip">🔁 Por repasar: ' + c.repaso + '</span><span class="srs-chip">📚 Total: ' + c.total + '</span></div>' +
      '<button type="button" class="btn" data-srs="start" data-deck="' + k + '">▶ Repasar ahora</button> ' +
      '<button type="button" class="btn ghost" data-nav="lesson" data-id="' + (k === 'verbs' ? '5-3' : '5-2') + '">📘 Lección relacionada</button>' +
      '<div class="srs-zone" style="margin-top:10px">' + (SRS_SESSION && SRS_SESSION.deck === k ? srsCardHtml() : '') + '</div></div>';
  });
  h += '<div class="box info"><span class="box-title">🧠 ¿Cómo funciona?</span>Es el sistema Leitner: cada tarjeta vive en una caja con su intervalo de repaso (1, 2, 4, 8 y 16 días). Al acertar sube; al fallar regresa a la caja 1. Tu progreso se guarda en tu cuenta. La tabla completa de verbos está en el 📘 <button type="button" class="linkbtn" data-nav="book" data-id="3">Libro de texto · capítulo 3</button>.</div></div>';
  return h;
}

/* ---------- vista de proyecto → plan de estudio (solo inglés) ---------- */
viewProject = function(){
  let h = '<div class="view">' +
    '<h2 style="font-size:26px">🗓️ Tu plan de estudio + recursos</h2>' +
    '<p class="lead-text">De este curso al certificado real: un calendario de 12 semanas con metas medibles. Combínalo con <b>Repaso del día (5–10 min, SIEMPRE)</b>.</p>' +
    '<h3 class="sec">📅 Las 12 semanas</h3>' +
    '<table class="ctable"><thead><tr><th>Semanas</th><th>Foco</th><th>Meta medible</th></tr></thead><tbody>' +
    '<tr><td><b>1–2</b></td><td>Flashcards diarias + 1 simulacro de Reading</td><td>85%+ en Partes 1–2</td></tr>' +
    '<tr><td><b>3–4</b></td><td>Writing: 2 emails + 1 artículo por semana</td><td>Checklist completa en cada tarea</td></tr>' +
    '<tr><td><b>5–6</b></td><td>Listening diario (audios del curso o podcasts B1)</td><td>90% en huecos de números/fechas</td></tr>' +
    '<tr><td><b>7–8</b></td><td>Speaking: 2 simulacros por semana</td><td>Rúbrica 70%+ · 1 min de foto sin trabarte</td></tr>' +
    '<tr><td><b>9–10</b></td><td>Mock completo cronometrado ×2</td><td>Escala estimada 150+</td></tr>' +
    '<tr><td><b>11–12</b></td><td>Corregir errores específicos + descanso</td><td>Registro del examen hecho ✔</td></tr>' +
    '</tbody></table>' +
    '<h3 class="sec">🧰 Recursos</h3>' +
    '<ul class="nice">' +
    '<li><b>Muestras oficiales gratis</b> (formato exacto + audios): cambridgeenglish.org → B1 Preliminary → Sample tests.</li>' +
    '<li><b>Tabla de los 45 verbos irregulares</b> con las 5 formas: 📘 <button type="button" class="linkbtn" data-nav="book" data-id="3">Libro de texto, capítulo 3</button> — y como mazo en 🃏 Repaso del día.</li>' +
    '<li><b>Gramática esencial</b> (las 12 estructuras con trampas): 📘 <button type="button" class="linkbtn" data-nav="book" data-id="2">capítulo 2</button>.</li>' +
    '<li><b>Listening diario:</b> “6 Minute English” (BBC) con transcripción; series con subtítulos en inglés.</li>' +
    '<li><b>Registrar el examen:</b> centros autorizados de Cambridge en tu país (cambridgeenglish.org). Modalidad papel o computadora: mismo certificado.</li>' +
    '</ul>' +
    '<div class="box tip"><span class="box-title">💡 Regla de las cadenas</span>Nunca falles dos días seguidos. Fallar uno es humano; dos rompen el hábito. Imprime este plan y marca cada semana lograda ✅.</div>' +
    '<div class="navbtns"><button class="btn ghost" data-nav="home">← Inicio</button><button class="btn" data-nav="report">📄 Ver mi boleta →</button></div>' +
    '</div>';
  return h;
};

/* ---------- demo de la portada: flashcards ---------- */
appDemoHtml = function(){
  const demo = '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Flashcards B1</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:system-ui,'+'Segoe UI'+',sans-serif;background:#f0fdf4;color:#14532d;min-height:100vh;display:grid;place-items:center;padding:16px}.w{width:100%;max-width:380px;text-align:center}h1{font-size:20px;margin-bottom:4px}.s{color:#4d7c0f;font-size:12.5px;margin-bottom:14px}.card{background:#fff;border:2px solid #16a34a;border-radius:18px;padding:30px 18px;min-height:190px;display:flex;flex-direction:column;justify-content:center;gap:8px;cursor:pointer;box-shadow:0 10px 30px rgba(22,163,74,.15)}.front{font-size:30px;font-weight:800}.back{font-size:15px;line-height:1.5;color:#1e293b;display:none}.hint{color:#94a3b8;font-size:12px}.stats{font-size:12.5px;font-weight:800;color:#166534;margin-top:12px}.btns{display:flex;gap:8px;justify-content:center;margin-top:12px}button{border:none;border-radius:10px;padding:10px 16px;font-weight:800;cursor:pointer;font-size:13px}.good{background:#16a34a;color:#fff}.again{background:#fee2e2;color:#b91c1c}.next{background:#e0f2fe;color:#0369a1}</style></head><body><div class="w"><h1>🃏 Flashcards B1</h1><p class="s">Vista previa del sistema de repetición espaciada del curso</p><div class="card" id="card" onclick="flip()"><div class="front" id="front"></div><div class="back" id="back"></div></div><p class="hint">Toca la tarjeta para voltearla</p><div class="btns"><button class="again" onclick="mark(0)" id="bAgain" style="display:none">😕 Otra vez</button><button class="good" onclick="mark(1)" id="bGood" style="display:none">😎 Lo sabía</button></div><div class="stats" id="stats"></div></div><script>(function(){var D=[{f:"achieve",es:"lograr",ex:"She achieved her goal."},{f:"afford",es:"poder pagar",ex:"I can\\u2019t afford it."},{f:"delay",es:"retraso",ex:"The flight had a two-hour delay."},{f:"borrow",es:"tomar prestado",ex:"Can I borrow your pen?"},{f:"refund",es:"reembolso",ex:"Can I get a refund?"},{f:"miss",es:"extrañar / perder",ex:"I missed the last train."},{f:"improve",es:"mejorar",ex:"My English is improving."},{f:"quiet",es:"tranquilo",ex:"The library is quiet."}];var i=0,ok=0,no=0,shown=false;function f(){return D[i]}function render(){var c=f();document.getElementById("front").textContent=c.f;document.getElementById("back").innerHTML="<b>"+c.f+"</b> = "+c.es+"<br><i>\\u201C"+c.ex+"\\u201D</i>";document.getElementById("back").style.display="none";document.getElementById("bGood").style.display="none";document.getElementById("bAgain").style.display="none";document.getElementById("stats").textContent="Tarjeta "+(i+1)+" de "+D.length+" · ✔ "+ok+" · ✘ "+no;shown=false}window.flip=function(){if(shown)return;shown=true;document.getElementById("back").style.display="block";document.getElementById("bGood").style.display="";document.getElementById("bAgain").style.display=""};window.mark=function(g){if(g)ok++;else no++;i++;if(i>=D.length){document.getElementById("front").textContent="🎉";document.getElementById("back").style.display="block";document.getElementById("back").innerHTML="¡Sesión lista!<br>Correctas: <b>"+ok+"</b> · A repasar: <b>"+no+"</b><br>En el curso real, tus cajas SRS guardan tu progreso.";document.getElementById("bGood").style.display="none";document.getElementById("bAgain").style.display="none";document.getElementById("stats").textContent="Repite mañana: las falladas vuelven primero.";return}render()};render()})();<\/script></body></html>';
  return '<div class="appframe-wrap" data-demo="app">' +
    '<div class="appframe-bar"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i>' +
    '<span class="url">flashcards · repaso del día</span></div>' +
    '<iframe class="appframe" title="Demo de flashcards" srcdoc="' + esc(demo) + '"></iframe></div>' +
    '<p class="frame-note">💡 Si este recuadro se ve vacío, tu visor está bloqueando las vistas embebidas: descarga <code>ingles.html</code> y ábrelo en tu navegador.</p>';
};

/* ---------- delegación: audio, actividades, SRS, navegación de repaso ---------- */
document.addEventListener('click', function(e){
  const tgt = e.target;
  const say = tgt.closest ? tgt.closest('[data-say]') : null;
  if(say){ sayText(say.getAttribute('data-say') || ' ', parseFloat(say.getAttribute('data-rate') || '1')); return; }
  const srs = tgt.closest ? tgt.closest('[data-srs]') : null;
  if(srs){ srsAction(srs); return; }
  const navSrs = tgt.closest ? tgt.closest('[data-um-nav="srs"]') : null;
  if(navSrs){
    try{ if(location.hash !== '#/repaso') location.hash = '#/repaso'; else { CURRENT = parseHash(); render(); } }catch(err){}
    const sb = document.getElementById('sidebar'); if(sb) sb.classList.remove('open');
    return;
  }
  const act = tgt.closest ? tgt.closest('[data-action="grade-activity"]') : null;
  if(act){
    const section = act.closest('[data-activity]');
    if(section) gradeActivity(section);
    return;
  }
  const opt = tgt.closest ? tgt.closest('[data-activity] .opt') : null;
  if(opt){
    const card = opt.closest('.qcard');
    card.querySelectorAll('.opt').forEach(function(o){ o.classList.remove('sel'); });
    opt.classList.add('sel');
    actAnswered(opt.closest('[data-activity]'));
    return;
  }
});
document.addEventListener('input', function(e){
  const tgt = e.target;
  if(tgt.matches && tgt.matches('[data-write]')){
    const box = tgt.closest('.writebox');
    const wc = box ? box.querySelector('[data-wc]') : null;
    if(wc) wc.textContent = tgt.value.trim().split(/\s+/).filter(Boolean).length;
    const section = tgt.closest('[data-activity]');
    if(section) actAnswered(section);
  }
  if(tgt.matches && tgt.matches('input[data-gap]')){
    const section = tgt.closest('[data-activity]');
    if(section) actAnswered(section);
  }
});
document.addEventListener('change', function(e){
  const tgt = e.target;
  if(tgt.matches && tgt.matches('select[data-match]')){
    const section = tgt.closest('[data-activity]');
    if(section) actAnswered(section);
  }
});
