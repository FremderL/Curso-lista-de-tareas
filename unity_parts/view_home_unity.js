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

  const demoLog = '<div class="bplog demo"><div class="bplog-head">Salida del programa</div><pre>Hola, Unity!\\nOleada 1 llega\\nBotín del cofre: 12 monedas</pre></div>';
  const codeDemo = '<pre class="pydemo-code">class Slime {\n  public string Nombre;\n  public int Vida;\n  public Slime(string nombre, int vida) {\n    Nombre = nombre; Vida = vida;\n  }\n  public void Recibir(int d) { Vida -= d; }\n  public bool Vivo() { return Vida &gt; 0; }\n}\n\nvar s = new Slime("Burbuja", 20);\ns.Recibir(7);\nConsole.WriteLine($"{s.Nombre}: {s.Vida}");  // Burbuja: 13</pre>';

  return '<div class="view">'+
    '<div class="hero">'+
    '<h1>Unity desde cero: programa videojuegos con C# 🎮</h1>'+
    '<p>Curso 100% interactivo en español con un <b>mini-interpreter de C# dentro de tu navegador</b>: escribes programas de verdad (Console.WriteLine, ciclos, clases, List, Vector3, Random con semilla) y los ejecutas con errores en español, número de línea y códigos CS reales. Basado en <b>Unity 6.3 LTS</b> (dic 2025, soporte hasta dic 2027). Del primer Debug.Log a la batalla de la Librería Esperanza por turnos.</p>'+
    '<div class="hero-ctas">'+
    (nextId ? '<button class="btn" data-nav="lesson" data-id="'+nextId+'">▶ '+(done>0?'Continuar':'Comenzar')+' el curso</button>'
            : '<button class="btn" data-nav="report">🎓 Ver mi boleta final</button>')+
    '<button class="btn ghost" data-nav="project">🛝 Playground de C#</button>'+
    '<button class="btn ghost" data-nav="book">📘 '+t('sb_book')+'</button>'+
    '<a class="btn ghost" href="unreal.html">🎮 Curso 6: Unreal</a>'+
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

    '<h2 class="home-sec">⌨️ Tu primer lenguaje de texto: llaves y punto y coma</h2>'+
    '<p class="lead-text">Si vienes del curso 6, ya piensas en estados, oleadas y turnos. Ahora lo <b>escribes</b>: cada instrucción termina en <code>;</code> y cada bloque vive entre <code>{ }</code>. Así se ve la gramática que dominarás:</p>'+
    codeDemo+
    demoLog+
    '<h2 class="home-sec">🗺️ El mapa del curso</h2>'+
    '<div class="modules-grid">'+modulesHtml+'</div>'+
    '<h2 class="home-sec">🧭 ¿Cómo funciona?</h2>'+
    boxHtml('info','📖 Lecciones explicadas','Cada concepto llega con programas de ejemplo ejecutables, analogías de videojuegos y las trampas típicas de C# (int/int que trunca, True/False con mayúscula, Random.Range inclusivo, los índices desde 0).')+
    boxHtml('tip','🧪 Ejercicios calificados por salida','Escribes el programa en el editor (con autoguardado), lo ejecutas con ▶ y calificas con ✓: tu salida se compara línea por línea. Pistas y soluciones cuando las necesites. El azar usa semilla: todo es reproducible.')+
    boxHtml('milestone','🏅 Puntos, boleta y examen','Las tareas suman puntos que alimentan tu calificación global. El Examen Final (30 preguntas · 300 pts) se aprueba con 210 (70%) y cierra tu boleta.')+
    boxHtml('warn','💾 Tu progreso se guarda solo','Todo vive en localStorage con las cuentas del campus. Si la vista previa integrada lo bloquea, descarga el archivo y ábrelo en tu navegador: funciona sin internet.')+
    '</div>';
}
