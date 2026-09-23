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

  const demoLog = '<div class="bplog demo"><div class="bplog-head">Output Log</div><pre>Salida del programa: Hola, Unreal!\nLlama al evento y regresa\nOrden: dos, uno, inicio</pre></div>';
  const nodesDemo = '<pre class="pydemo-code">Event BeginPlay ▶→ Print String\n                       ↑ magenta: "Hola, Unreal!"\n\nCall "Rutina" ▶→ imprime y REGRESA\n\nBranch ◇ Condición: vida &gt; 0 (bool rojo)\n   ├─ True ▶→ "Sigue jugando"\n   └─ False ▶→ "Game Over"</pre>';

  return '<div class="view">'+
    '<div class="hero">'+
    '<h1>Unreal Engine desde cero: programa videojuegos con Blueprints 🎮</h1>'+
    '<p>Curso 100% interactivo en español con un <b>editor de Blueprints dentro de tu navegador</b>: arrastras nodos, conectas cables (flechas blancas de ejecución, cables de color para datos) y ejecutas grafos de verdad con un Output Log como el del editor. Basado en <b>UE 5.8</b>, la versión estable actual. Del primer Print String a un juego por turnos completo.</p>'+
    '<div class="hero-ctas">'+
    (nextId ? '<button class="btn" data-nav="lesson" data-id="'+nextId+'">▶ '+(done>0?'Continuar':'Comenzar')+' el curso</button>'
            : '<button class="btn" data-nav="report">🎓 Ver mi boleta final</button>')+
    '<button class="btn ghost" data-nav="project">🛝 Playground de Blueprints</button>'+
    '<button class="btn ghost" data-nav="book">📘 '+t('sb_book')+'</button>'+
    '<a class="btn ghost" href="python.html">🐍 Curso 5: Python</a>'+
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

    '<h2 class="home-sec">🧩 Programar con nodos: flechas blancas y cables de color</h2>'+
    '<p class="lead-text">En Blueprints las <b>flechas blancas</b> deciden el orden de ejecución y los <b>cables de color</b> llevan los datos (bool rojo, int teal, float verde, string magenta). Así se ve la gramática que dominarás:</p>'+
    nodesDemo+
    '<h2 class="home-sec">🗺️ El mapa del curso</h2>'+
    '<div class="modules-grid">'+modulesHtml+'</div>'+
    '<h2 class="home-sec">🧭 ¿Cómo funciona?</h2>'+
    boxHtml('info','📖 Lecciones explicadas','Cada concepto llega con grafos de ejemplo ejecutables, analogías del mundo de los videojuegos y las trampas típicas (el ForLoop inclusivo, int/int que trunca, los índices desde 0).')+
    boxHtml('tip','🧪 Ejercicios calificados por salida','Construyes el grafo en el editor (arrastrar, conectar, editar valores), lo ejecutas con ▶ y calificas con ✓: tu Output Log se compara línea por línea. Pistas y soluciones cuando las necesites.')+
    boxHtml('milestone','🏅 Puntos, boleta y examen','Las tareas suman puntos que alimentan tu calificación global. El Examen Final (30 preguntas · 300 pts) se aprueba con 210 (70%) y cierra tu boleta.')+
    boxHtml('warn','💾 Tu progreso se guarda solo','Todo vive en localStorage con las cuentas del campus. Si la vista previa integrada lo bloquea, descarga el archivo y ábrelo en tu navegador: funciona sin internet.')+
    '</div>';
}
