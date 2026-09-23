function viewHome(){
  const done = ALL_LESSONS.filter(function(l){ return state.scores[l.id] != null; }).length;
  let nextId = '0-1';
  const pending = ALL_LESSONS.filter(function(l){ return state.scores[l.id] == null; });
  if(pending.length) nextId = pending[0].id;
  else if(state.examScore == null) nextId = null;

  let modulesHtml = '';
  MODULES.forEach(function(m){
    const max = m.lessons.reduce(function(a,l){ return a + lessonMax(l); }, 0);
    const pts = m.lessons.reduce(function(a,l){ return a + (state.scores[l.id]||0); }, 0);
    const pct = max ? Math.round(pts/max*100) : 0;
    const firstPending = m.lessons.filter(function(l){ return state.scores[l.id] == null; })[0];
    const target = firstPending ? firstPending.id : m.lessons[0].id;
    modulesHtml += '<div class="mcard"><div class="mce">'+m.emoji+'</div><h4>'+m.name+'</h4><p>'+m.desc+'</p>'+
      '<div class="mprog"><div style="width:'+pct+'%"></div></div>'+
      '<span class="mlinks">'+m.lessons.length+' lecciones · '+pct+'% completado</span>'+
      '<button class="btn small" data-nav="lesson" data-id="'+target+'">'+(pct>0 && !firstPending ? 'Repasar →' : 'Entrar →')+'</button></div>';
  });

  const demoTable = sqlResultTableHtml(['titulo','autor','precio'], [
    ['Cien años de soledad','Gabriel García Márquez',320.5],
    ['Rayuela','Julio Cortázar',340],
    ['La casa de los espíritus','Isabel Allende',310],
    ['El Aleph','Jorge Luis Borges',210],
    ['Como agua para chocolate','Laura Esquivel',230]
  ]);

  return '<div class="view">'+
    '<div class="hero">'+
    '<h1>Bases de datos SQL: habla el idioma de los datos 🗄️</h1>'+
    '<p>Curso 100% interactivo en español con un <b>mini-motor SQL real dentro de tu navegador</b>: escribes consultas, las ejecutas y se califican por su <b>RESULTADO</b> (como en una base verdadera). De <code>SELECT</code> básico a JOINs, agregación, subconsultas, transacciones y funciones de ventana, todo sobre la base de práctica «Librería Esperanza».</p>'+
    '<div class="hero-ctas">'+
    (nextId ? '<button class="btn" data-nav="lesson" data-id="'+nextId+'">▶ '+(done>0?'Continuar':'Comenzar')+' el curso</button>'
            : '<button class="btn" data-nav="report">🎓 Ver mi boleta final</button>')+
    '<button class="btn ghost" data-nav="project">🛝 Playground SQL</button>'+
    '<button class="btn ghost" data-nav="book">📘 '+t('sb_book')+'</button>'+
    '<a class="btn ghost" href="ingles.html">🇬🇧 Curso 3: Inglés B1</a>'+
    '<a class="btn ghost" href="javascript.html">🎮 Curso 2: Juego de Memoria</a>'+
    '<a class="btn ghost" href="index.html">📝 Curso 1: Lista de Tareas</a>'+
    '</div>'+
    '<div class="hero-stats">'+
    '<span class="stat"><b>'+MODULES.length+'</b>módulos</span>'+
    '<span class="stat"><b>'+ALL_LESSONS.length+'</b>lecciones</span>'+
    '<span class="stat"><b>'+TOTAL_MAX+'</b>puntos en juego</span>'+
    '<span class="stat"><b>'+done+'/'+ALL_LESSONS.length+'</b>completadas</span>'+
    '</div></div>'+

    '<h2 class="home-sec">🗄️ Trabajarás con datos reales</h2>'+
    '<p class="lead-text">Cada ejercicio se califica comparando TU resultado contra el esperado, fila por fila. Así se ve una consulta correcta en el curso:</p>'+
    demoTable+
    '<h2 class="home-sec">🗺️ El mapa del curso</h2>'+
    '<div class="modules-grid">'+modulesHtml+'</div>'+
    '<h2 class="home-sec">🧭 ¿Cómo funciona?</h2>'+
    boxHtml('info','📖 Lecciones explicadas','Cada lección explica el concepto con analogías, muestra las consultas con botón de copiar y te advierte de los errores típicos (incluido el clásico <code>= NULL</code> que no encuentra nada).')+
    boxHtml('tip','🧪 Ejercicios calificados por resultado','Escribes tu consulta, la ejecutas con ▶ Ejecutar (siempre sobre una copia limpia de la base) y calificas con ✓: el motor compara tus filas con las esperadas. Hay pistas, y la solución aparece cuando la necesitas.')+
    boxHtml('milestone','🏅 Puntos, boleta y examen','Lecciones y quizzes suman puntos que alimentan tu calificación global. El Examen Final (30 preguntas · 300 pts) se aprueba con 210 (70%) y cierra tu boleta del curso.')+
    boxHtml('warn','💾 Tu progreso se guarda solo','Todo vive en localStorage con las cuentas del campus: tu avance persiste al recargar. Si la vista previa integrada lo bloquea, descarga el archivo y ábrelo en tu navegador.')+
    '</div>';
}
