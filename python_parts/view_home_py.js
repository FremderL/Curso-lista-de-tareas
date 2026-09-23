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

  const demoOut = '<div class="pyout demo"><div class="pyout-head">Salida del programa</div><pre>Disponibles: 2\nValor del inventario: 1962.00\nCien años de soledad OK\nRayuela             OK</pre></div>';
  const demoCode = '<pre class="pydemo-code">inventario = [\n    {"titulo": "Cien años de soledad", "precio": 320.5, "stock": 4},\n    {"titulo": "El Aleph", "precio": 210, "stock": 0},\n    {"titulo": "Rayuela", "precio": 340, "stock": 2},\n]\ndisponibles = 0\nvalor = 0\nfor lib in inventario:\n    if lib["stock"] > 0:\n        disponibes += 0  # ¡encuentra el bug! 😉\n\nprint("Disponibles:", disponibles)\nprint(f"Valor: {valor:.2f}")</pre>';

  return '<div class="view">'+
    '<div class="hero">'+
    '<h1>Python desde cero: programas de verdad, desde tu navegador 🐍</h1>'+
    '<p>Curso 100% interactivo en español con un <b>mini-interpreter de Python dentro de tu navegador</b>: escribes programas completos (ciclos, funciones, listas, diccionarios), los ejecutas con entradas reales y se califican por su <b>SALIDA</b> — línea por línea, como lo haría Python en tu computadora. Del primer <code>print</code> a un sistema de inventario completo.</p>'+
    '<div class="hero-ctas">'+
    (nextId ? '<button class="btn" data-nav="lesson" data-id="'+nextId+'">▶ '+(done>0?'Continuar':'Comenzar')+' el curso</button>'
            : '<button class="btn" data-nav="report">🎓 Ver mi boleta final</button>')+
    '<button class="btn ghost" data-nav="project">🛝 Playground Python</button>'+
    '<button class="btn ghost" data-nav="book">📘 '+t('sb_book')+'</button>'+
    '<a class="btn ghost" href="sql.html">🗄️ Curso 4: SQL</a>'+
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

    '<h2 class="home-sec">🐍 Se califica por SALIDA, como en la vida real</h2>'+
    '<p class="lead-text">Tu programa corre con las entradas que le des y se compara lo impreso con lo esperado. Así se ve un ejercicio del curso (las salidas reales del inventario de la Librería Esperanza):</p>'+
    demoOut+
    '<h2 class="home-sec">🗺️ El mapa del curso</h2>'+
    '<div class="modules-grid">'+modulesHtml+'</div>'+
    '<h2 class="home-sec">🧭 ¿Cómo funciona?</h2>'+
    boxHtml('info','📖 Lecciones explicadas','Cada concepto llega con analogías, código real listo para copiar, diagramas de flujo en los ciclos y las trampas típicas (10/2 → 5.0, el -7//2 que sorprende, el sort() que devuelve None…).')+
    boxHtml('tip','🧪 Ejercicios calificados por salida','Escribes el programa, lo ejecutas con ▶ (el interpreter muestra errores en español con número de línea y detecta ciclos infinitos) y calificas con ✓: tu salida se compara línea por línea. Pistas y soluciones cuando las necesites.')+
    boxHtml('milestone','🏅 Puntos, boleta y examen','Lecciones y ejercicios suman puntos que alimentan tu calificación global. El Examen Final (30 preguntas · 300 pts) se aprueba con 210 (70%) y cierra tu boleta.')+
    boxHtml('warn','💾 Tu progreso se guarda solo','Todo vive en localStorage con las cuentas del campus. Si la vista previa integrada lo bloquea, descarga el archivo y ábrelo en tu navegador: funciona sin internet.')+
    '</div>';
}
