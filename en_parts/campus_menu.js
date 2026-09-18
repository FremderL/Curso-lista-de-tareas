
/* ============================ CAMPUS: menú de usuario · perfil · idioma ============================ */
const CAMPUS = /*__CAMPUS_CONFIG__*/{
  thisCourse:'c1',
  tagline:{ es:'Curso interactivo', en:'Interactive course' },
  courses:[
    { id:'c1', file:'index.html',      emoji:'📝', name:{es:'Lista de Tareas', en:'To-Do List'},      total:29, max:1300, examMax:300, dataKey:'data'   },
    { id:'c2', file:'javascript.html', emoji:'🎮', name:{es:'Juego de Memoria', en:'Memory Game'},    total:26, max:3715, examMax:300, dataKey:'dataJs' },
    { id:'c3', file:'ingles.html',     emoji:'🇬🇧', name:{es:'Inglés B1', en:'English B1'},            total:34, max:4329, examMax:300, dataKey:'dataEn' }
  ]
};

const I18N = {
  es:{
    auth_login:'Ingresar', auth_create:'Crear cuenta', auth_user:'Usuario',
    auth_pin:'PIN o contraseña', auth_pin2:'PIN o contraseña (mínimo 4 caracteres)',
    auth_name:'Tu nombre (para el certificado)', auth_guest:'👤 Entrar como invitado',
    auth_accounts:'👥 Cuentas en este dispositivo: ',
    auth_note:'🔒 Cuenta <b>educativa y local</b>: tus datos se guardan solo en este navegador (ideal para computadoras compartidas de clase: cada quien tiene su progreso). No uses una contraseña real.',
    auth_reset:'¿Problemas para entrar? Restablece solo los datos de este curso',
    sb_home:'Inicio del curso', sb_exam:'Examen final', sb_book:'Libro de texto',
    sb_project:'Proyecto final (código)', sb_report:'Boleta de calificaciones',
    grade_none:'Calificación: —', grade_label:'Calificación: ', pct_course:'% del curso',
    menu_profile:'👤 Ver mi perfil', menu_courses:'📚 Cursos del campus', menu_session:'🔑 Sesión',
    menu_login:'🔓 Iniciar sesión', menu_logout:'🚪 Cerrar sesión', menu_lang:'🌐 Idioma / Language',
    menu_current:'● curso actual', menu_local:'Datos locales de este navegador',
    prof_title:'Mi perfil', prof_since:'Miembro desde', prof_progress:'Tu progreso por curso',
    prof_lessons:'lecciones', prof_pts:'pts', prof_exam:'examen', prof_empty:'Sin progreso aún',
    prof_note:'Los cursos comparten tu cuenta, pero cada uno guarda su propio progreso.',
    lang_es:'🇪🇸 Español', lang_en:'🇬🇧 English'
  },
  en:{
    auth_login:'Log in', auth_create:'Create account', auth_user:'Username',
    auth_pin:'PIN or password', auth_pin2:'PIN or password (4+ characters)',
    auth_name:'Your name (for the certificate)', auth_guest:'👤 Continue as guest',
    auth_accounts:'👥 Accounts on this device: ',
    auth_note:'🔒 Educational, local-only account: your data stays in this browser (great for shared classroom computers). Do not use a real password.',
    auth_reset:'Trouble signing in? Reset only this course’s data',
    sb_home:'Course home', sb_exam:'Final exam', sb_book:'Textbook',
    sb_project:'Final project (code)', sb_report:'Report card',
    grade_none:'Grade: —', grade_label:'Grade: ', pct_course:'% of course',
    menu_profile:'👤 View my profile', menu_courses:'📚 Campus courses', menu_session:'🔑 Session',
    menu_login:'🔓 Sign in', menu_logout:'🚪 Sign out', menu_lang:'🌐 Language / Idioma',
    menu_current:'● current course', menu_local:'Local data on this browser',
    prof_title:'My profile', prof_since:'Member since', prof_progress:'Your progress per course',
    prof_lessons:'lessons', prof_pts:'pts', prof_exam:'exam', prof_empty:'No progress yet',
    prof_note:'Courses share your account, but each one keeps its own progress.',
    lang_es:'🇪🇸 Español', lang_en:'🇬🇧 English'
  }
};
function langPref(){
  try{
    const u = sessionUser();
    if(u && DB.users[u] && DB.users[u].lang) return DB.users[u].lang;
    const saved = localStorage.getItem('codecamp-lang');
    if(saved === 'en' || saved === 'es') return saved;
  }catch(e){}
  return 'es';
}
function t(key){
  const L = I18N[langPref()] || I18N.es;
  return (L[key] != null) ? L[key] : (I18N.es[key] != null ? I18N.es[key] : key);
}
function setLang(lang){
  try{
    const u = sessionUser();
    if(u && DB.users[u]){ DB.users[u].lang = lang; saveDB(); }
    else localStorage.setItem('codecamp-lang', lang);
  }catch(e){ try{ localStorage.setItem('codecamp-lang', lang); }catch(e2){} }
  applyLang();
}
function applyLang(){
  try{ document.documentElement.setAttribute('lang', langPref() === 'en' ? 'en' : 'es'); }catch(e){}
  try{
    const small = document.querySelector('.brand-text small');
    if(small) small.textContent = (CAMPUS.tagline[langPref()] || CAMPUS.tagline.es);
  }catch(e){}
  try{ updateUserMenu(); }catch(e){}
  try{ renderSidebar(CURRENT); }catch(e){}
  try{ updateChrome(); }catch(e){}
  try{
    const layer = document.getElementById('authLayer');
    if(layer && layer.classList.contains('show')) showAuth();
  }catch(e){}
  try{
    const pl = document.getElementById('profileLayer');
    if(pl && pl.classList.contains('show')) renderProfileContent();
  }catch(e){}
  try{ if(typeof render==='function') render(); }catch(e){}
}

/* ---------- progreso por curso (lee la DB compartida) ---------- */
function courseProgress(course){
  try{
    const u = sessionUser();
    const rec = (u && DB.users[u]) ? DB.users[u] : null;
    const d = (rec && rec[course.dataKey]) || {};
    const scores = d.scores || {};
    let pts = 0, done = 0;
    Object.keys(scores).forEach(function(k){ done++; pts += (scores[k] || 0); });
    const pct = course.max ? Math.min(100, Math.round(pts / course.max * 100)) : 0;
    return { done:done, total:course.total, pts:pts, pct:pct, exam:(d.examScore != null ? d.examScore : null), examMax:course.examMax };
  }catch(e){ return { done:0, total:course.total, pts:0, pct:0, exam:null, examMax:course.examMax }; }
}

/* ---------- menú de usuario (topbar derecha) ---------- */
let UMENU = null;
function buildUserMenuShell(){
  if(document.getElementById('umenuBtn')){ UMENU = document.querySelector('.umenu'); updateUserMenu(); window.__ccMenuReady = true; return; }
  const topUser = document.getElementById('topUser');
  UMENU = document.createElement('div');
  UMENU.className = 'umenu';
  UMENU.innerHTML =
    '<button type="button" class="umenu-btn" id="umenuBtn" title="Mi cuenta · cursos · idioma">👤 ▾</button>' +
    '<div class="umenu-panel" id="umenuPanel" style="display:none"></div>';
  const tb = document.getElementById('topbar');
  if(tb && tb.appendChild){ tb.appendChild(UMENU); } else { document.body.appendChild(UMENU); }
  if(topUser && topUser.parentNode){ topUser.remove(); }
  window.__ccMenuReady = true;
  updateUserMenu();
}
function updateUserMenu(){
  if(!UMENU) return;
  const btn = UMENU.querySelector('#umenuBtn');
  const panel = UMENU.querySelector('#umenuPanel');
  if(!btn || !panel) return;
  const u = sessionUser();
  const name = (u && DB.users[u] && DB.users[u].name) ? DB.users[u].name : (langPref()==='en' ? 'Guest' : 'Invitado');
  btn.textContent = '👤 ' + name + ' ▾';
  if(panel.style.display === 'none') return;   // solo botón si está cerrado
  const me = CAMPUS.courses.filter(function(c){ return c.id === CAMPUS.thisCourse; })[0];
  const others = CAMPUS.courses.filter(function(c){ return c.id !== CAMPUS.thisCourse; });
  const L = langPref();
  let h = '<div class="um-head"><span class="um-avatar">' + esc((name[0] || '?').toUpperCase()) + '</span>' +
    '<div><b>' + esc(name) + '</b>' +
    (u && u !== '__guest' ? '<small>@' + esc(u) + ' · ' + t('prof_since') + ' ' + userSince(u) + '</small>' : '<small>' + t('menu_local') + '</small>') +
    '</div></div>';
  h += '<button type="button" class="um-item" data-um="profile">' + t('menu_profile') + '</button>';
  h += '<div class="um-div">' + t('menu_courses') + '</div>';
  h += '<div class="um-course um-now"><span>' + me.emoji + ' ' + (me.name[L] || me.name.es) + '</span><small>' + t('menu_current') + '</small></div>';
  others.forEach(function(c){
    h += '<a class="um-course" href="' + c.file + '"><span>' + c.emoji + ' ' + (c.name[L] || c.name.es) + '</span><small>' + courseProgress(c).pct + '%</small></a>';
  });
  h += '<div class="um-div">' + t('menu_session') + '</div>';
  h += u
    ? '<button type="button" class="um-item" data-um="logout">' + t('menu_logout') + '</button>'
    : '<button type="button" class="um-item" data-um="login">' + t('menu_login') + '</button>';
  h += '<div class="um-div">' + t('menu_lang') + '</div>';
  h += '<div class="um-langs">' +
    '<button type="button" class="um-lang' + (L === 'es' ? ' on' : '') + '" data-um="lang-es">' + t('lang_es') + '</button>' +
    '<button type="button" class="um-lang' + (L === 'en' ? ' on' : '') + '" data-um="lang-en">' + t('lang_en') + '</button></div>';
  panel.innerHTML = h;
}
function userSince(u){
  try{
    const rec = DB.users[u];
    if(rec && rec.created) return new Date(rec.created).toLocaleDateString(langPref() === 'en' ? 'en-US' : 'es-MX', { month:'short', year:'numeric' });
  }catch(e){}
  return '';
}
function toggleUmenu(force){
  const panel = UMENU && UMENU.querySelector('#umenuPanel');
  if(!panel) return;
  const open = (force != null) ? force : panel.style.display === 'none';
  panel.style.display = open ? 'block' : 'none';
  if(open) updateUserMenu();
}

/* ---------- perfil ---------- */
function ensureProfileLayer(){
  if(document.getElementById('profileLayer')) return;
  const pl = document.createElement('div');
  pl.id = 'profileLayer'; pl.className = 'pmodal';
  pl.innerHTML = '<div class="pmodal-back" data-um="close-profile"></div>' +
    '<div class="pmodal-card" id="profileCard"></div>';
  document.body.appendChild(pl);
}
function renderProfileContent(){
  const card = document.getElementById('profileCard');
  if(!card) return;
  const u = sessionUser();
  const name = (u && DB.users[u] && DB.users[u].name) ? DB.users[u].name : (langPref()==='en' ? 'Guest' : 'Invitado');
  let h = '<button type="button" class="pmodal-x" data-um="close-profile">✕</button>';
  h += '<div class="um-head"><span class="um-avatar big">' + esc((name[0] || '?').toUpperCase()) + '</span>' +
    '<div><b>' + esc(name) + '</b>' +
    (u && u !== '__guest' ? '<small>@' + esc(u) + ' · ' + t('prof_since') + ' ' + userSince(u) + '</small>' : '<small>' + t('menu_local') + '</small>') +
    '<small>' + t('menu_lang') + ': <b>' + (langPref() === 'en' ? 'English' : 'Español') + '</b></small></div></div>';
  h += '<h4 class="um-div" style="margin-top:14px">' + t('prof_progress') + '</h4>';
  CAMPUS.courses.forEach(function(c){
    const p = courseProgress(c);
    const now = c.id === CAMPUS.thisCourse;
    h += '<div class="pcourse' + (now ? ' now' : '') + '">' +
      '<div class="prow"><span>' + c.emoji + ' ' + (c.name[langPref()] || c.name.es) + (now ? ' <small>(' + t('menu_current') + ')</small>' : '') + '</span>' +
      '<a class="pgo" href="' + c.file + '">→</a></div>' +
      '<div class="pbar"><div style="width:' + p.pct + '%"></div></div>' +
      '<small>' + (p.done ? (p.done + '/' + p.total + ' ' + t('prof_lessons') + ' · ' + p.pts + '/' + c.max + ' ' + t('prof_pts') + (p.exam != null ? ' · ' + t('prof_exam') + ' ' + p.exam + '/' + p.examMax : '')) : t('prof_empty')) + '</small>' +
      '</div>';
  });
  h += '<p class="um-note">' + t('prof_note') + '</p>';
  card.innerHTML = h;
}
function openProfile(){ ensureProfileLayer(); renderProfileContent(); document.getElementById('profileLayer').classList.add('show'); toggleUmenu(false); }
function closeProfile(){ const pl = document.getElementById('profileLayer'); if(pl) pl.classList.remove('show'); }

/* ---------- delegación de clics del campus ---------- */
document.addEventListener('click', function(e){
  const tgt = e.target;
  const um = tgt.closest ? tgt.closest('[data-um]') : null;
  const btn = tgt.closest ? tgt.closest('#umenuBtn') : null;
  if(btn){ e.preventDefault(); toggleUmenu(); return; }
  if(um){
    const act = um.getAttribute('data-um');
    if(act === 'profile') openProfile();
    else if(act === 'close-profile') closeProfile();
    else if(act === 'login'){ toggleUmenu(false); try{ showAuth(); }catch(err){} }
    else if(act === 'logout'){ toggleUmenu(false); try{ if(sessionUser()) doLogout(); else showAuth(); }catch(err){} }
    else if(act === 'lang-es') setLang('es');
    else if(act === 'lang-en') setLang('en');
    return;
  }
  if(UMENU && !UMENU.contains(tgt)) toggleUmenu(false);
});
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){ toggleUmenu(false); closeProfile(); }
});


/* ---------- calificación tolerante de respuestas escritas ---------- */
(function(){
  const __norm = norm;
  norm = function(s){ return __norm(s).replace(/[;:,.\s]+$/,''); };
})();
(function(){
  const __fillOk = fillOk;
  fillOk = function(q, val){
    const v = String(val||'').trim();
    if(v === '') return false;
    try{ if(q.re && new RegExp(q.re,'i').test(v)) return true; }catch(e){}
    const nv = norm(v).replace(/[<>]/g,'');
    if((q.accept||[]).some(function(a){ return norm(a).replace(/[<>]/g,'') === nv; })) return true;
    // la respuesta modelo (q.show) siempre es válida: comparación laxa sin símbolos
    try{
      if(q.show){
        const loose = function(s){ return norm(s).replace(/[^a-z0-9]/g,''); };
        if(loose(v) !== '' && loose(v) === loose(q.show)) return true;
      }
    }catch(e){}
    return false;
  };
})();

/* ---------- i18n de la interfaz completa (chrome de las vistas) ---------- */
const CHROME_I18N = [
  ['📝 Ponte a prueba','📝 Test yourself'],
  ['Responde y presiona «Calificar». Puedes repetir el quiz todas las veces que quieras: se guarda tu <b>mejor calificación</b>.','Answer and press “Grade”. You can retake the quiz as many times as you like: your <b>best score</b> is kept.'],
  ['✅ Calificar mis respuestas','✅ Grade my answers'],
  ['🧮 Calificar mi código','🧮 Grade my code'],
  ['✅ Calificar mi actividad','✅ Grade my activity'],
  ['🏁 Calificar examen','🏁 Grade exam'],
  ['Respondidas: ','Answered: '],
  ['▶ Ejecutar','▶ Run'],
  ['↺ Restablecer','↺ Reset'],
  ['📋 Copiar','📋 Copy'],
  ['🔄 Intentar de nuevo','🔄 Try again'],
  ['¡Excelente! Dominas esta lección.','Excellent! You mastered this lesson.'],
  ['¡Muy bien! Lección aprobada.','Well done! Lesson passed.'],
  ['Vas por buen camino. Repasa y vuelve a intentar.','Good progress — review and try again.'],
  ['No te rindas: rele la lección e inténtalo de nuevo.','Don’t give up: re-read the lesson and try again.'],
  ['</b>módulos</span>','</b>modules</span>'],
  ['</b>lecciones</span>','</b>lessons</span>'],
  ['</b>puntos en juego</span>','</b>points at stake</span>'],
  ['</b>completadas</span>','</b>completed</span>'],
  ['📝 Examen Final</h1>','📝 Final Exam</h1>'],
  ['Cada pregunta vale 10 puntos: <b>300 en total</b>. Se aprueba con <b>210/300 (70%)</b>.','Each question is worth 10 points: <b>300 in total</b>. Pass mark: <b>210/300 (70%)</b>.'],
  ['Puedes presentarlo las veces que quieras: se guarda tu mejor nota. ¡Mucha suerte! 🍀','Take it as many times as you like: your best score is kept. Good luck! 🍀'],
  ['📄 Boleta de calificaciones','📄 Report card'],
  ['lecciones completadas','lessons completed'],
  [' · examen: ',' · exam: '],
  ['🎓 Tu certificado','🎓 Your certificate'],
  ['Escribe tu nombre para personalizarlo (se guarda automáticamente):','Type your name to personalize it (saved automatically):'],
  ['💾 Guardar nombre','💾 Save name'],
  ['Imprimir/_guardar PDF','Print/Save PDF'],
  ['Certificado de finalización · CodeCamp','Certificate of completion · CodeCamp'],
  ['Calificación final:','Final grade:'],
  ['✓ CURSO APROBADO','✓ COURSE PASSED'],
  ['Completa el 70% de los puntos para aprobar','Reach 70% of the points to pass'],
  ['🗑️ Borrar todo mi progreso','🗑️ Erase all my progress'],
  ['Modo de recuperación','Recovery mode'],
  ['⚠️ El curso no pudo iniciarse','⚠️ The course failed to start'],
  ['tus cuentas y tu progreso siguen guardados en este navegador','your accounts and progress are still saved in this browser'],
  ['🔄 Reintentar','🔄 Retry'],
  ['👤 Entrar como invitado','👤 Continue as guest'],
  ['🧹 Reiniciar datos de este curso','🧹 Reset this course data'],
  ['🏭 Restablecer todo','🏭 Reset everything'],
  ['Detalle técnico (clic para ver)','Technical details (click to view)'],
  ['▶ Repasar ahora','▶ Review now'],
  ['▶ Repasar (','▶ Review ('],
  [' pendientes)',' pending)'],
  ['🆕 Nuevas:','🆕 New:'],
  ['🔁 Por repasar:','🔁 Due:'],
  ['👀 Ver respuesta','👀 Reveal answer'],
  ['😎 Lo sabía','😎 I knew it'],
  ['😕 Otra vez','😕 Again'],
  ['🎧 Escuchar','🎧 Listen'],
  ['✅ ¡Sesión lista!','✅ Session complete!'],
  ['Correctas: <b>','Correct: <b>'],
  ['A repasar: <b>','To review: <b>']
];
function i18nChrome(html){
  if(langPref() !== 'en') return html;
  let h = String(html);
  CHROME_I18N.forEach(function(p){ h = h.split(p[0]).join(p[1]); });
  return h;
}
(function(){
  const __r = render;
  render = function(){
    const r = __r();
    try{
      if(langPref()==='en'){
        const c = document.getElementById('content');
        if(c && c.innerHTML) c.innerHTML = i18nChrome(c.innerHTML);
      }
    }catch(e){ try{ console.error('[campus] i18n render:', e); }catch(e2){} }
    return r;
  };
})();
(function(){
  const __f = fatal;
  fatal = function(e){
    __f(e);
    try{
      if(langPref()==='en'){
        ['authLayer','content'].forEach(function(id){
          const el = document.getElementById(id);
          if(el && el.innerHTML) el.innerHTML = i18nChrome(el.innerHTML);
        });
      }
    }catch(e2){}
  };
})();
(function(){
  if(typeof updateRemain !== 'function') return;
  const __u = updateRemain;
  updateRemain = function(section, questions){
    __u(section, questions);
    try{
      if(langPref()==='en'){
        const sp = section.querySelector('[data-respondidas]');
        if(sp) sp.textContent = sp.textContent.replace('Respondidas:','Answered:');
      }
    }catch(e){}
  };
})();
(function(){
  if(typeof actAnswered !== 'function') return;
  const __a = actAnswered;
  actAnswered = function(section){
    __a(section);
    try{
      if(langPref()==='en'){
        const sp = section.querySelector('[data-act-respondidas]');
        if(sp) sp.textContent = sp.textContent.replace('Respondidas:','Answered:');
      }
    }catch(e){}
  };
})();

/* ---------- arranque del campus (menú + estilos) ---------- */
function __ccCampusInit(){
  try{
    const st = document.createElement('style');
    st.textContent = `
.umenu{position:relative;display:inline-block;margin-left:auto;flex:none;margin-right:2px}
.umenu-btn{cursor:pointer;font-weight:800;font-size:13px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;border:none;border-radius:99px;padding:9px 15px;box-shadow:0 4px 14px rgba(79,70,229,.4);letter-spacing:.01em;white-space:nowrap;flex:none}
.umenu-btn:hover{filter:brightness(1.1)}
.umenu-panel{position:absolute;right:0;top:calc(100% + 12px);width:292px;max-width:calc(100vw - 24px);background:#fff;border:1px solid #e2e8f0;border-radius:16px;box-shadow:0 18px 50px rgba(15,23,42,.28);padding:10px;z-index:135;text-align:left;color:#1e293b}
.um-head{display:flex;gap:10px;align-items:center;padding:6px 6px 10px;border-bottom:1px solid #eef2f7;margin-bottom:6px}
.um-avatar{width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;display:grid;place-items:center;font-weight:800;font-size:18px;flex:none}
.um-avatar.big{width:56px;height:56px;font-size:24px}
.um-head b{display:block;font-size:15px}
.um-head small{display:block;color:#64748b;font-size:11.5px;margin-top:2px}
.um-item{display:block;width:100%;text-align:left;background:none;border:none;padding:9px 10px;border-radius:10px;font-size:13.5px;font-weight:600;color:#334155;cursor:pointer}
.um-item:hover{background:#f1f5f9}
.um-div{font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8;font-weight:800;padding:10px 6px 4px}
.um-course{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 10px;border-radius:10px;color:#334155;text-decoration:none;font-size:13.5px;font-weight:600}
a.um-course:hover{background:#f1f5f9}
.um-course small{color:#94a3b8;font-weight:700}
.um-now{background:#eef2ff;color:#4338ca}
.um-now small{color:#6366f1}
.um-langs{display:flex;gap:6px;padding:2px 0 4px}
.um-lang{flex:1;border:1px solid #e2e8f0;background:#fff;border-radius:10px;padding:8px 4px;font-size:12.5px;font-weight:700;cursor:pointer;color:#475569}
.um-lang.on{border-color:#4f46e5;background:#eef2ff;color:#4338ca}
.um-note{font-size:11px;color:#94a3b8;margin:8px 4px 2px}
.pmodal{position:fixed;inset:0;z-index:120;display:none;align-items:center;justify-content:center;padding:16px}
.pmodal.show{display:flex}
.pmodal-back{position:absolute;inset:0;background:rgba(15,23,42,.55)}
.pmodal-card{position:relative;width:min(480px,100%);max-height:86vh;overflow:auto;background:#fff;border-radius:20px;padding:22px;box-shadow:0 24px 70px rgba(0,0,0,.35);color:#1e293b}
.pmodal-x{position:absolute;top:10px;right:12px;border:none;background:#f1f5f9;width:32px;height:32px;border-radius:10px;font-size:14px;cursor:pointer;font-weight:800;color:#475569}
.pcourse{border:1px solid #eef2f7;border-radius:14px;padding:12px 14px;margin-bottom:10px}
.pcourse.now{border-color:#c7d2fe;background:#f8faff}
.prow{display:flex;justify-content:space-between;align-items:center;font-weight:700;font-size:14px;margin-bottom:8px}
.prow small{color:#94a3b8;font-weight:600}
.pgo{font-size:18px;text-decoration:none;color:#4f46e5;font-weight:800}
.pbar{height:9px;background:#eef2f7;border-radius:99px;overflow:hidden;margin-bottom:6px}
.pbar>div{height:100%;background:linear-gradient(90deg,#4f46e5,#7c3aed);border-radius:99px}
.pcourse small{color:#64748b}
.campus-nav{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:5;display:flex;gap:8px;flex-wrap:wrap;justify-content:center;background:rgba(255,255,255,.96);border:1px solid #e2e8f0;border-radius:99px;padding:8px 14px;box-shadow:0 10px 30px rgba(15,23,42,.25);font-size:13px;font-weight:700}
.campus-nav a{color:#4f46e5;text-decoration:none;white-space:nowrap}
.campus-nav a:hover{text-decoration:underline}
.campus-nav .cn-now{color:#94a3b8;white-space:nowrap}
.campus-nav .cn-t{color:#94a3b8;font-weight:800;margin-right:2px}
.qsec{font-weight:800;color:#334155;margin:18px 0 4px;padding:8px 12px;background:#f8fafc;border-left:4px solid #4f46e5;border-radius:8px;font-size:13.5px}
.matchrow{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 12px;border:1px dashed #e2e8f0;border-radius:10px;margin:6px 0;font-size:13.5px}
.matchrow select{border:1px solid #cbd5e1;border-radius:8px;padding:6px 8px;font-size:13px;background:#fff;max-width:55%}
.chk{display:flex;gap:10px;align-items:flex-start;padding:9px 12px;border:1px solid #eef2f7;border-radius:10px;margin:6px 0;cursor:pointer;font-size:13.5px}
.chk input{margin-top:2px;transform:scale(1.25)}
.chk .qpts{margin-left:auto}
.writebox textarea{width:100%;min-height:170px;border:1px solid #cbd5e1;border-radius:12px;padding:12px;font:13px ui-monospace,monospace;resize:vertical}
.wordcount{font-size:12px;color:#64748b;font-weight:700;margin-top:4px}
.audiobox{display:flex;flex-wrap:wrap;gap:8px;align-items:center;background:#fdf4ff;border:1px solid #f5d0fe;border-radius:12px;padding:10px 12px;margin:8px 0}
.audiobox .saybtn{border:none;border-radius:9px;padding:8px 13px;font-weight:700;font-size:12.5px;cursor:pointer;background:#a21caf;color:#fff}
.audiobox .saybtn.slow{background:#7e22ce}
.audiobox .saybtn:disabled{background:#d8d4e8;cursor:not-allowed}
.audiobox .anote{font-size:11.5px;color:#86198f}
.tscript{margin:6px 0;font-size:12.5px}
.tscript summary{cursor:pointer;color:#7c3aed;font-weight:700}
.tscript p{margin:6px 0;padding:10px 12px;background:#faf5ff;border-radius:10px;border:1px dashed #e9d5ff}
.srsbox{border:1px solid #bbf7d0;background:#f0fdf4;border-radius:16px;padding:16px;margin:16px 0}
.srs-stats{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 12px}
.srs-chip{background:#dcfce7;color:#166534;border-radius:99px;padding:4px 12px;font-size:12px;font-weight:800}
.srs-card{background:#fff;border:2px solid #16a34a;border-radius:16px;padding:22px;text-align:center;min-height:150px;display:flex;flex-direction:column;justify-content:center;gap:6px}
.srs-card .front{font-size:26px;font-weight:800;color:#14532d}
.srs-card .es{color:#4d7c0f;font-size:14px;font-weight:700}
.srs-card .back{font-size:15px;color:#1e293b;line-height:1.5}
.srs-actions{display:flex;gap:8px;justify-content:center;margin-top:12px;flex-wrap:wrap}
.srs-actions button{border:none;border-radius:10px;padding:10px 16px;font-weight:800;cursor:pointer;font-size:13px}
.srs-actions .good{background:#16a34a;color:#fff}
.srs-actions .again{background:#fee2e2;color:#b91c1c}
.srs-actions .hear{background:#e0f2fe;color:#0369a1}
.srs-prog{font-size:12px;color:#166534;font-weight:800;margin-top:10px}
`;
    document.head.appendChild(st);
  }catch(e){}
  try{ if(typeof __ccLabelOverrides === 'function') __ccLabelOverrides(); }catch(e){ try{ console.error('[campus] overrides:', e); }catch(e2){} }
  try{ buildUserMenuShell(); }catch(e){ try{ console.error('[campus] menú:', e); }catch(e2){} }
  try{ applyLang(); }catch(e){ try{ console.error('[campus] idioma:', e); }catch(e2){} }
}

/* ---------- barra de cursos bajo el login (acceso sin menú) ---------- */
(function(){
  const __origShowAuth = showAuth;
  showAuth = function(msg, vals){
    const r = __origShowAuth(msg, vals);
    try{
      const layer = document.getElementById('authLayer');
      if(layer && layer.classList.contains('show') && !layer.querySelector('.campus-nav')){
        const L = langPref();
        const nav = document.createElement('div');
        nav.className = 'campus-nav';
        nav.innerHTML = '<span class="cn-t">' + t('menu_courses') + ':</span>' + CAMPUS.courses.map(function(c){
          if(c.id === CAMPUS.thisCourse) return '<span class="cn-now">' + c.emoji + ' ' + (c.name[L] || c.name.es) + '</span>';
          return '<a href="' + c.file + '">' + c.emoji + ' ' + (c.name[L] || c.name.es) + '</a>';
        }).join('');
        layer.appendChild(nav);
      }
    }catch(e){ try{ console.error('[campus] nav login:', e); }catch(e2){} }
    return r;
  };
})();
