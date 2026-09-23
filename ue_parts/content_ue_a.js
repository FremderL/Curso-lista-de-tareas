/* ============================================================
   CURSO 6 UNREAL — CONTENIDO parte A (Módulos 0–3)
   Tareas bpex: {q, hint?, start?, check:{lines, vars?, requireNodes?}, solution, pts}
   start/solution = grafos BPX {nodes, wires}. Las soluciones corren
   con BPX.run y se califican por salida (gradeOutput).
   Helpers de grafo (prefijo b· para no chocar con el shell):
   bN nodo · bG grafo · bE BeginPlay · bP print · bI/bF/bS/bB literales
   bBr branch · bAr aritmética · bCmp comparar · bLog lógica · bCat concat
   bSet/bGet variables · bFor/bWhile/bEach/bSeq/bFF flujo · bArr/bLen/bGetEl/bAdd arrays
   bTos/bToi/bTof conversiones · bCev/bCall custom events
   ============================================================ */
function bN(id, type, props){ return { id:String(id), type:type, props:(props||{}), x:0, y:0 }; }
function bG(nodes, wires){ return { nodes:nodes, wires:(wires||[]).map(function(w){ return { from:w[0], to:w[1] }; }) }; }
function bE(id){ return bN(id,'event_beginplay'); }
function bP(id){ return bN(id,'print'); }
function bI(id,v){ return bN(id,'lit_int',{value:v}); }
function bF(id,v){ return bN(id,'lit_float',{value:v}); }
function bS(id,v){ return bN(id,'lit_string',{value:v}); }
function bB(id,v){ return bN(id,'lit_bool',{value:v}); }
function bBr(id){ return bN(id,'branch'); }
function bAr(id,op){ return bN(id,'arith',{op:op}); }
function bCmp(id,op){ return bN(id,'compare',{op:op}); }
function bLog(id,op){ return bN(id,'logic',{op:op}); }
function bCat(id){ return bN(id,'concat'); }
function bSet(id,name,type){ return bN(id,'setvar',{name:name,type:(type||'int')}); }
function bGet(id,name,type){ return bN(id,'getvar',{name:name,type:(type||'int')}); }
function bFor(id){ return bN(id,'forloop'); }
function bWhile(id){ return bN(id,'whileloop'); }
function bEach(id){ return bN(id,'foreach'); }
function bSeq(id){ return bN(id,'sequence'); }
function bFF(id){ return bN(id,'flipflop'); }
function bArr(id,items){ return bN(id,'make_array',{items:items}); }
function bLen(id){ return bN(id,'array_len'); }
function bGetEl(id){ return bN(id,'array_get'); }
function bAdd(id){ return bN(id,'array_add'); }
function bTos(id){ return bN(id,'to_string'); }
function bToi(id){ return bN(id,'to_int'); }
function bTof(id){ return bN(id,'to_float'); }
function bCev(id,name){ return bN(id,'event_custom',{name:name}); }
function bCall(id,name){ return bN(id,'call_custom',{target:name}); }

/* ---------- demos reutilizables (bloque t:'bp', g:'clave') ---------- */
DEMO_BP.demo_hola = bG([bE(1),bP(2),bS(3,'Hola, Unreal!')],[['1.then','2.in'],['3.value','2.text']]);
DEMO_BP.demo_pines = bG([bE(1),bBr(2),bP(3),bP(4),bB(5,true),bS(6,'Sigue jugando'),bS(7,'Game Over'),bI(8,100),bCmp(9,'>')],
  [['1.then','2.in'],['2.true','3.in'],['2.false','4.in'],['5.value','2.cond'],['6.value','3.text'],['7.value','4.text'],['8.value','9.a'],['9.result','2.cond']]);
  // nota: 9.b sin conectar daría error al ejecutar; este demo es SOLO visual (no corre)
DEMO_BP.demo_vars = bG([bE(1),bSet(2,'oro'),bGet(3,'oro'),bP(4),bI(5,50)],
  [['1.then','2.in'],['5.value','2.value'],['2.then','4.in'],['3.value','4.text']]);
DEMO_BP.demo_branch = bG([bE(1),bSet(2,'vida'),bBr(3),bP(4),bP(5),bCmp(6,'>'),bGet(7,'vida'),bI(8,20),bI(9,0),bS(10,'Vive'),bS(11,'KO')],
  [['1.then','2.in'],['9.value','2.value'],['2.then','3.in'],['6.result','3.cond'],['7.value','6.a'],['9.value','6.b'],['3.true','4.in'],['3.false','5.in'],['10.value','4.text'],['11.value','5.text']]);
DEMO_BP.demo_while = bG([bE(1),bSet(2,'n'),bWhile(3),bP(4),bSet(5,'n'),bGet(6,'n'),bCmp(7,'<='),bAr(8,'+'),bI(9,1),bI(10,0),bI(11,4),bI(12,1)],
  [['1.then','2.in'],['10.value','2.value'],['2.then','3.in'],['7.result','3.cond'],['6.value','7.a'],['10.value','7.b'],['3.body','4.in'],['6.value','4.text'],['3.body','5.in'],['6.value','8.a'],['12.value','8.b'],['8.result','5.value']]);

MODULES.push({
  id:'m0', emoji:'🎮', name:'Despega con Unreal', color:'#3b82f6',
  desc:'Qué es UE 5.8, qué son los Blueprints y tu primer grafo ejecutándose.',
  lessons:[
  { id:'0-1', title:'¿Qué es Unreal y qué son los Blueprints?', time:'12 min', blocks:[
    {t:'p', h:'<b>Unreal Engine</b> es el motor con el que se hacen videojuegos AAA (Fortnite, Black Myth: Wukong) y también películas, arquitectura y simuladores. La versión estable actual es la <b>5.8</b> (junio 2026) — y aquí viene lo bueno: para programar la lógica de tu juego NO necesitas escribir C++ de entrada. Se usa <b>Blueprints</b>: programación visual con nodos y cables, como conectar circuitos.'},
    {t:'p', h:'Un Blueprint es un <b>grafo</b>: cajas (nodos) conectadas por cables. Las <b>flechas blancas</b> dicen en qué orden se ejecuta todo, igual que las líneas de un programa. Los <b>cables de colores</b> llevan datos: números, textos, verdadero/falso. En este curso construirás esos grafos en un simulador dentro del navegador y los ejecutarás de verdad.'},
    {t:'bp', g:'demo_hola', h:'Tu primer Blueprint: al iniciar el juego (Event BeginPlay), se imprime «Hola, Unreal!» en el Output Log.'},
    {t:'info', title:'ℹ️ ¿Y UE6 no mata los Blueprints?', h:'UE6 está en camino (Early Access a fines de 2027) y migrará el gameplay al lenguaje Verse, pero Epic ha dicho que Blueprints convivirá durante TODA la transición, con herramientas de conversión. Todo lo que aprendes aquí te sirve hoy en 5.8 y te dará el mapa mental para Verse mañana.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Los Blueprints son…', options:['Un lenguaje de texto como C++','Programación visual con nodos y cables','Una herramienta de modelado 3D','Un editor de imágenes'], correct:1, pts:10, explain:'Son visual scripting: la lógica se construye conectando nodos, sin escribir código.'},
      {type:'mc', q:'Las flechas blancas entre nodos indican…', options:['El flujo de datos','El orden de ejecución','Una amistad entre nodos','Un error de conexión'], correct:1, pts:10, explain:'Los pines de ejecución definen QUÉ se ejecuta y en qué orden; los de color llevan datos.'},
      {type:'tf', q:'Para seguir este curso necesitas instalar Unreal Engine en tu computadora.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'El simulador del curso corre en tu navegador. En la lección 6-4 verás cómo instalar el editor real si quieres dar el salto.'},
      {type:'mc', q:'¿Cuál versión de Unreal es la estable de producción hoy?', options:['UE 4.27','UE 5.8','UE 6.0','UE 5.9'], correct:1, pts:10, explain:'UE 5.8 (junio 2026) es la última gran versión de la rama 5 y la recomendada; UE6 apenas entra a Early Access en 2027.'}
    ]},
    {t:'bpex', title:'🧪 Tus primeros grafos', tasks:[
      {q:'Conecta el grafo: <b>Event BeginPlay → Print String</b>, y el literal <code>Hola, Unreal!</code> al pin <b>Text</b> del print. Luego ejecuta con ▶ y califica con ✓.', hint:'Arrastra desde el pin de salida (derecha) hasta el pin de entrada (izquierda). Primero la flecha blanca, luego el cable magenta.', start:bG([bE(1),bP(2),bS(3,'Hola, Unreal!')],[]), check:{lines:['Hola, Unreal!']}, solution:bG([bE(1),bP(2),bS(3,'Hola, Unreal!')],[['1.then','2.in'],['3.value','2.text']]), pts:20},
      {q:'Imprime el mensaje de arranque en DOS líneas: primero <code>Player 1</code> y después <code>Listos para jugar</code>. Los prints se conectan en cadena: el pin Then del primero sigue con el segundo.', hint:'BeginPlay → Print 1 → (pin Then de Print 1) → Print 2.', start:bG([bE(1),bP(2),bP(3),bS(4,'Player 1'),bS(5,'Listos para jugar')],[]), check:{lines:['Player 1','Listos para jugar']}, solution:bG([bE(1),bP(2),bP(3),bS(4,'Player 1'),bS(5,'Listos para jugar')],[['1.then','2.in'],['2.then','3.in'],['4.value','2.text'],['5.value','3.text']]), pts:20},
      {q:'Cuenta regresiva de lanzamiento: imprime <code>3</code>, <code>2</code>, <code>1</code> en ese orden. Los literales ya están conectados a cada print: tú solo ordenas las flechas blancas.', hint:'El orden lo dan los pines de ejecución, no los cables de datos.', start:bG([bE(1),bP(2),bP(3),bP(4),bI(5,3),bI(6,2),bI(7,1)],[['5.value','2.text'],['6.value','3.text'],['7.value','4.text']]), check:{lines:['3','2','1']}, solution:bG([bE(1),bP(2),bP(3),bP(4),bI(5,3),bI(6,2),bI(7,1)],[['1.then','2.in'],['2.then','3.in'],['3.then','4.in'],['5.value','2.text'],['6.value','3.text'],['7.value','4.text']]), pts:20}
    ]}
  ]},

  { id:'0-2', title:'El editor: pines exec, pines de datos y el Output Log', time:'12 min', blocks:[
    {t:'p', h:'Cada nodo tiene <b>pines de entrada</b> (izquierda) y <b>pines de salida</b> (derecha). Los pines de ejecución se ven como flechas blancas: <code>in</code> entra la orden, <code>then</code> sale «y después…». Los pines de datos tienen color según el tipo de valor que llevan. El <b>Output Log</b> de abajo es tu consola: ahí cae todo lo que imprimas.'},
    {t:'table', head:['Pin','Color','Qué lleva','Ejemplo'], rows:[
      ['Ejecución','⚪ flecha blanca','La orden «ejecuta lo que sigue»','Then de BeginPlay → In de Print'],
      ['bool','🔴 rojo','Verdadero / falso','La condición de un Branch'],
      ['int','🟢 teal','Enteros: 42, -7','Puntos, vidas, oleadas'],
      ['float','🟩 verde','Decimales: 3.5','Porcentajes, tiempos'],
      ['string','🟣 magenta','Texto','Mensajes, nombres']
    ]},
    {t:'bp', g:'demo_pines', h:'Un grafo con todo mezclado (es solo una ilustración: no todos sus cables bastan para ejecutarse). Mira los colores de cada pin.'},
    {t:'warn', title:'⚠️ El editor te cuida', h:'Si intentas conectar un cable int a un pin bool, el editor lo rechaza (igual que UE). Y si ejecutas un grafo con una entrada sin conectar, el motor te dice QUÉ nodo y QUÉ pin falta, en español. Leer el error es parte del oficio.'},
    {t:'quiz', questions:[
      {type:'mc', q:'El pin <b>Text</b> de Print String es de color…', options:['Rojo (bool)','Verde (float)','Magenta (string)','Blanco (exec)'], correct:2, pts:10, explain:'Text recibe texto: cable magenta. Los números se convierten solos al llegar a un pin de texto.'},
      {type:'mc', q:'Si ejecutas un Print sin conectar su Text…', options:['Explota el navegador','Imprime una línea vacía','No se ejecuta nada','Marca el grafo como inválido'], correct:1, pts:10, explain:'Text tiene un valor por defecto (vacío): imprime una línea en blanco, sin error.'},
      {type:'tf', q:'A un pin de entrada de datos le puedes conectar varios cables a la vez.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Cada entrada recibe UN solo cable (igual que en UE). Una SALIDA sí puede alimentar varias entradas.'}
    ]},
    {t:'bpex', title:'🧪 Un print para cada color', tasks:[
      {q:'Imprime el número <code>42</code>: conecta el literal int al pin Text (¡el int entra solo a un pin de texto, UE lo convierte!).', hint:'No necesitas nodo de conversión para imprimir números.', start:bG([bE(1),bP(2),bI(3,42)],[]), check:{lines:['42']}, solution:bG([bE(1),bP(2),bI(3,42)],[['1.then','2.in'],['3.value','2.text']]), pts:20},
      {q:'Imprime el float <code>5</code>. Spoiler: en UE los floats imprimen con decimal: verás <code>5.0</code>.', hint:'El literal float ya sabe que es float: el motor lo imprime con su decimal.', start:bG([bE(1),bP(2),bF(3,5)],[]), check:{lines:['5.0']}, solution:bG([bE(1),bP(2),bF(3,5)],[['1.then','2.in'],['3.value','2.text']]), pts:20},
      {q:'Imprime el bool <code>true</code>.', hint:'Los bools se imprimen como true/false, en minúsculas.', start:bG([bE(1),bP(2),bB(3,true)],[]), check:{lines:['true']}, solution:bG([bE(1),bP(2),bB(3,true)],[['1.then','2.in'],['3.value','2.text']]), pts:20},
      {q:'Personaliza: cambia el valor del literal int a <code>25</code> (doble clic o edita dentro del nodo) y ejecuta. Debe imprimir <code>25</code>.', hint:'Edita el número DENTRO del nodo literal y ejecuta de nuevo.', start:bG([bE(1),bP(2),bI(3,42)],[['1.then','2.in'],['3.value','2.text']]), check:{lines:['25']}, solution:bG([bE(1),bP(2),bI(3,25)],[['1.then','2.in'],['3.value','2.text']]), pts:20}
    ]}
  ]}
]});

MODULES.push({
  id:'m1', emoji:'🧩', name:'El lienzo y los nodos', color:'#0ea5e9',
  desc:'Print, literales, cables de datos y nodos de conversión: la gramática del lienzo.',
  lessons:[
  { id:'1-1', title:'Print String: tu ventana al juego', time:'12 min', blocks:[
    {t:'p', h:'<b>Print String</b> es el nodo más usado del mundo Unreal: escribe un mensaje en pantalla/log para saber qué está pasando. En el editor real puedes darle color y duración; aquí cada print escribe <b>una línea</b> en el Output Log. Cuando algo no funciona, los programadores llenan el grafo de prints para ver hasta dónde llega la ejecución.'},
    {t:'info', title:'ℹ️ Depurar con prints', h:'¿Tu personaje no salta? Pon un print antes y otro después del Branch que lo permite. Si aparece el primero y no el segundo, tu condición falla. Esta técnica se llama «print debugging» y la usarás toda la carrera.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Cada Print String imprime…', options:['Todo en la misma línea','Una línea en el Output Log','Una ventana emergente','Un archivo de texto'], correct:1, pts:10, explain:'Cada print ocupa su propia línea: así se lee el orden de ejecución.'},
      {type:'mc', q:'Si conectas BeginPlay → Print A → Print B (en cadena), el orden de impresión es…', options:['B y luego A','A y luego B','Aleatorio','Solo A'], correct:1, pts:10, explain:'Las flechas blancas marcan la secuencia: primero A, después B.'},
      {type:'tf', q:'Los prints sirven para depurar: ver por dónde pasa la ejecución y qué valores tienen tus variables.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Es EL uso diario de Print String incluso en estudios profesionales.'}
    ]},
    {t:'bpex', title:'🧪 Domina la cadena de prints', tasks:[
      {q:'Imprime el nombre de nuestra tienda-juego: <code>Librería Esperanza</code>.', hint:'Escribe el texto DENTRO del nodo literal string.', start:bG([bE(1),bP(2),bS(3,'Librería Esperanza')],[]), check:{lines:['Librería Esperanza']}, solution:bG([bE(1),bP(2),bS(3,'Librería Esperanza')],[['1.then','2.in'],['3.value','2.text']]), pts:20},
      {q:'Menú de inicio en 4 líneas: <code>MENÚ</code>, <code>1. Jugar</code>, <code>2. Tienda</code>, <code>3. Salir</code>.', hint:'Cuatro prints en cadena: BeginPlay → 1 → 2 → 3 → 4.', start:bG([bE(1),bP(2),bP(3),bP(4),bP(5),bS(6,'MENÚ'),bS(7,'1. Jugar'),bS(8,'2. Tienda'),bS(9,'3. Salir')],[]), check:{lines:['MENÚ','1. Jugar','2. Tienda','3. Salir']}, solution:bG([bE(1),bP(2),bP(3),bP(4),bP(5),bS(6,'MENÚ'),bS(7,'1. Jugar'),bS(8,'2. Tienda'),bS(9,'3. Salir')],[['1.then','2.in'],['2.then','3.in'],['3.then','4.in'],['4.then','5.in'],['6.value','2.text'],['7.value','3.text'],['8.value','4.text'],['9.value','5.text']]), pts:25},
      {q:'Imprime una línea <b>vacía</b> (un Print sin nada conectado a su Text).', hint:'No conectes nada al Text: el print imprime su valor por defecto.', start:bG([bE(1),bP(2)],[]), check:{lines:['']}, solution:bG([bE(1),bP(2)],[['1.then','2.in']]), pts:15},
      {q:'Separador bonito: imprime <code>====</code>, luego <code>Inventario</code>, y otra vez <code>====</code>.', hint:'El mismo literal «====» puede alimentar a DOS prints a la vez (fan-out).', start:bG([bE(1),bP(2),bP(3),bP(4),bS(5,'===='),bS(6,'Inventario')],[]), check:{lines:['====','Inventario','====']}, solution:bG([bE(1),bP(2),bP(3),bP(4),bS(5,'===='),bS(6,'Inventario')],[['1.then','2.in'],['2.then','3.in'],['3.then','4.in'],['5.value','2.text'],['6.value','3.text'],['5.value','4.text']]), pts:25}
    ]}
  ]},

  { id:'1-2', title:'Literales: los valores directos', time:'12 min', blocks:[
    {t:'p', h:'Un <b>literal</b> es un valor escrito directo en el grafo: el <code>100</code> de la vida inicial, el <code>"Game Over"</code> del cartel final. En Blueprints cada tipo tiene su nodo literal y su color: int (teal), float (verde), string (magenta), bool (rojo). Puedes editar el valor dentro del nodo, sin cables.'},
    {t:'table', head:['Tipo','Literal de ejemplo','Para qué se usa en un juego'], rows:[
      ['int','100','Vidas, monedas, oleadas, daño'],
      ['float','0.75','Velocidades, porcentajes, tiempos'],
      ['string','Game Over','Mensajes, nombres, diálogos'],
      ['bool','true','¿Está vivo? ¿Terminó el nivel?']
    ]},
    {t:'warn', title:'⚠️ 5 no es lo mismo que 5.0', h:'Para el jugador es el mismo número, pero para el motor NO: <code>5</code> es int (teal) y <code>5.0</code> es float (verde). Al imprimir, el float siempre luce con su decimal: <code>5.0</code>. Elegir el tipo correcto desde el inicio evita sorpresas.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Cuál literal es un float?', options:['42','-7','0.5','"0.5"'], correct:2, pts:10, explain:'0.5 lleva punto decimal → float. "0.5" con comillas sería texto.'},
      {type:'mc', q:'La vida del jugador (100, 99, 42…) se modela mejor como…', options:['float','bool','int','string'], correct:2, pts:10, explain:'Los enteros son ideales para conteos: vidas, balas, monedas.'},
      {type:'tf', q:'El literal true es de tipo bool y su pin es rojo.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'true/false son bools: el pin rojo de las condiciones.'}
    ]},
    {t:'bpex', title:'🧪 Un literal por tipo', tasks:[
      {q:'Imprime la temperatura de la escena: <code>-15</code> (int negativo).', hint:'Escribe el signo menos dentro del literal.', start:bG([bE(1),bP(2),bI(3,-15)],[]), check:{lines:['-15']}, solution:bG([bE(1),bP(2),bI(3,-15)],[['1.then','2.in'],['3.value','2.text']]), pts:15},
      {q:'Imprime la velocidad: <code>3.5</code> (float). Debe verse exactamente «3.5».', hint:'Literal float con punto decimal.', start:bG([bE(1),bP(2),bF(3,3.5)],[]), check:{lines:['3.5']}, solution:bG([bE(1),bP(2),bF(3,3.5)],[['1.then','2.in'],['3.value','2.text']]), pts:15},
      {q:'Cartel de fin: <code>Game Over</code>.', hint:'Literal string.', start:bG([bE(1),bP(2),bS(3,'Game Over')],[]), check:{lines:['Game Over']}, solution:bG([bE(1),bP(2),bS(3,'Game Over')],[['1.then','2.in'],['3.value','2.text']]), pts:15},
      {q:'Estado del boss: imprime <code>false</code> (bool) — aún no fue derrotado.', hint:'Literal bool en false.', start:bG([bE(1),bP(2),bB(3,false)],[]), check:{lines:['false']}, solution:bG([bE(1),bP(2),bB(3,false)],[['1.then','2.in'],['3.value','2.text']]), pts:15}
    ]}
  ]},

  { id:'1-3', title:'Cables de datos: una salida, varias entradas', time:'12 min', blocks:[
    {t:'p', h:'Un cable de datos <b>lleva el mismo valor a donde lo conectes</b>. Y aquí viene una regla de oro de Blueprints: una <b>salida puede alimentar varias entradas</b> (fan-out), pero una <b>entrada solo recibe un cable</b>. Es como un enchufe: un tomacorriente, muchas lámparas desde la misma línea.'},
    {t:'info', title:'ℹ️ ¿Cuándo conviene repetir cable?', h:'Si dos prints muestran el mismo texto, conéctalos AL MISMO literal: si mañana cambias el texto, cambias UN nodo y ambos prints se actualizan. Conectar bien es dejar mantenimiento barato.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Cuántos cables puede recibir una entrada de datos?', options:['Los que quieras','Máximo 2','Solo 1','4 si son del mismo color'], correct:2, pts:10, explain:'Una entrada, un cable. Si conectas otro, reemplaza al anterior (en UE y en este curso).'},
      {type:'mc', q:'Una salida de datos puede…', options:['Recibir un cable','Alimentar varias entradas','Solo conectarse a prints','Nada de lo anterior'], correct:1, pts:10, explain:'Fan-out: una salida, muchas entradas. Así reutilizas un valor en todo el grafo.'},
      {type:'tf', q:'Conectar dos literales distintos al mismo pin Text es un error: el segundo reemplaza al primero.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'La entrada queda conectada al ÚLTIMO cable; el primero se desconecta.'}
    ]},
    {t:'bpex', title:'🧪 Practica el fan-out', tasks:[
      {q:'Con UN solo literal <code>Esperanza</code>, imprime el nombre DOS veces (dos líneas iguales).', hint:'Del mismo pin value salen dos cables: uno a cada print.', start:bG([bE(1),bP(2),bP(3),bS(4,'Esperanza')],[]), check:{lines:['Esperanza','Esperanza']}, solution:bG([bE(1),bP(2),bP(3),bS(4,'Esperanza')],[['1.then','2.in'],['2.then','3.in'],['4.value','2.text'],['4.value','3.text']]), pts:20},
      {q:'El literal int <code>7</code> debe verse dos veces: <code>7</code> y <code>7</code>.', hint:'Los ints también entran solos a los pines de texto.', start:bG([bE(1),bP(2),bP(3),bI(4,7)],[]), check:{lines:['7','7']}, solution:bG([bE(1),bP(2),bP(3),bI(4,7)],[['1.then','2.in'],['2.then','3.in'],['4.value','2.text'],['4.value','3.text']]), pts:20},
      {q:'Imprime el precio con decimal: <code>2.5</code> (float).', hint:'El float se imprime tal cual: 2.5.', start:bG([bE(1),bP(2),bF(3,2.5)],[]), check:{lines:['2.5']}, solution:bG([bE(1),bP(2),bF(3,2.5)],[['1.then','2.in'],['3.value','2.text']]), pts:15},
      {q:'Re-cablea: el print está conectado al literal <code>viejo</code>. Desconéctalo (clic sobre el cable o el pin) y conéctalo al literal <code>nuevo</code>. Resultado: <code>nuevo</code>.', hint:'Clic en el pin Text desconecta el cable actual; luego conecta el literal nuevo.', start:bG([bE(1),bP(2),bS(3,'viejo'),bS(4,'nuevo')],[['1.then','2.in'],['3.value','2.text']]), check:{lines:['nuevo']}, solution:bG([bE(1),bP(2),bS(3,'viejo'),bS(4,'nuevo')],[['1.then','2.in'],['4.value','2.text']]), pts:20}
    ]}
  ]},

  { id:'1-4', title:'Conversión: To String, To Int, To Float', time:'12 min', blocks:[
    {t:'p', h:'Muchas veces un dato llega de un tipo y lo necesitas en otro: un float que debe ser int, un int que quieres pegar en un mensaje. Para eso existen los <b>nodos de conversión</b>: <b>To String</b>, <b>To Int (Truncate)</b> y <b>To Float</b>. Hacia texto y hacia float la conversión es automática (implícita); hacia int UE te exige el nodo — y trunca hacia cero.'},
    {t:'table', head:['Conversión','Entrada → Salida','Resultado'], rows:[
      ['To String','9.5 → "9.5"','Todo se puede volver texto'],
      ['To Float','7 → 7.0','Promueve a decimal'],
      ['To Int (Truncate)','3.9 → 3 · -3.9 → -3','Corta el decimal HACIA CERO']
    ]},
    {t:'warn', title:'⚠️ Truncar no es redondear', h:'To Int (Truncate) NO redondea: 3.9 queda en 3 (no en 4) y -3.9 queda en -3 (no en -4). Siempre corta hacia el cero. Si necesitas redondeo de verdad, se hace con matemática extra antes de truncar.'},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>To Int</code> aplicado a 7.8 da…', options:['8','7','7.8','Error'], correct:1, pts:10, explain:'Trunca hacia cero: se queda con la parte entera 7. No redondea.'},
      {type:'mc', q:'¿Qué conversión SÍ es automática (implícita) al conectar cables?', options:['float → int','int → float','bool → int','array → string'], correct:1, pts:10, explain:'Un int entra sin problemas donde va un float. Al revés exige To Int.'},
      {type:'tf', q:'To Int (Truncate) de -2.5 da -3.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: trunca hacia CERO, da -2. (En Python floor daría -3: cuidado con mezclar lenguajes.)'}
    ]},
    {t:'bpex', title:'🧪 Convierte con intención', tasks:[
      {q:'El precio sale con decimal: imprime <code>9</code> usando To Int sobre el float <code>9.99</code>.', hint:'To Int (Truncate): su pin result entra al Text del print (int→texto es automático).', start:bG([bE(1),bP(2),bF(3,9.99),bToi(4)],[]), check:{lines:['9']}, solution:bG([bE(1),bP(2),bF(3,9.99),bToi(4)],[['1.then','2.in'],['3.value','4.value'],['4.result','2.text']]), pts:20},
      {q:'Temperatura bajo cero: To Int de <code>-2.7</code> → imprime <code>-2</code>.', hint:'Hacia cero: -2.7 → -2.', start:bG([bE(1),bP(2),bF(3,-2.7),bToi(4)],[]), check:{lines:['-2']}, solution:bG([bE(1),bP(2),bF(3,-2.7),bToi(4)],[['1.then','2.in'],['3.value','4.value'],['4.result','2.text']]), pts:20},
      {q:'Promueve el int <code>8</code> con To Float e imprime: debe salir <code>8.0</code>.', hint:'To Float marca el valor como decimal aunque sea redondo.', start:bG([bE(1),bP(2),bI(3,8),bTof(4)],[]), check:{lines:['8.0']}, solution:bG([bE(1),bP(2),bI(3,8),bTof(4)],[['1.then','2.in'],['3.value','4.value'],['4.result','2.text']]), pts:20},
      {q:'Convierte el int <code>5</code> a texto EXPLÍCITAMENTE con To String e imprime <code>5</code>. El grafo debe incluir el nodo To String.', hint:'Usa requireNodes… digo: el calificador verificará que exista un nodo to_string en tu grafo.', check:{lines:['5'], requireNodes:['to_string']}, solution:bG([bE(1),bP(2),bI(3,5),bTos(4)],[['1.then','2.in'],['3.value','4.value'],['4.result','2.text']]), pts:20}
    ]}
  ]}
]});

MODULES.push({
  id:'m2', emoji:'🔢', name:'Datos y variables', color:'#10b981',
  desc:'Variables Get/Set, aritmética estilo UE, comparaciones y lógica booleana.',
  lessons:[
  { id:'2-1', title:'Variables: Get y Set', time:'12 min', blocks:[
    {t:'p', h:'Una <b>variable</b> es una caja con nombre que guarda un valor durante el juego: la vida, el oro, el nivel. En Blueprints se mueve con dos nodos: <b>Set</b> (escribe un valor en la caja; tiene pines de ejecución) y <b>Get</b> (lee el valor; es una bolita flotante sin flechas — solo datos).'},
    {t:'bp', g:'demo_vars', h:'Set guarda 50 en «oro»; después un Get lee la variable para imprimirla. Fíjate: el Get no necesita cables blancos, flota y solo ofrece su valor.'},
    {t:'warn', title:'⚠️ Get antes de Set = error', h:'Si lees una variable que nadie ha escrito aún, el motor te lo dice en español: «la variable aún no tiene valor, conecta un Set antes del Get». En UE real las variables tienen valor por defecto en el panel Details; aquí las inicializamos SIEMPRE con un Set al inicio del BeginPlay: buena costumbre.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué nodo escribe un valor en una variable?', options:['Get','Set','Print','Branch'], correct:1, pts:10, explain:'Set guarda y sigue la cadena de ejecución. Get solo lee.'},
      {type:'mc', q:'El nodo Get Variable…', options:['Tiene pines de ejecución','Es solo un dato: no participa en la cadena blanca','Imprime la variable','Borra la variable'], correct:1, pts:10, explain:'Get es un nodo de solo datos: flota y entrega su valor donde lo conectes.'},
      {type:'tf', q:'El pin Value de un Set Variable también puede leerse como salida, para pasar el valor directo al siguiente nodo.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Set expone el valor escrito: útil para encadenar sin otro Get.'}
    ]},
    {t:'bpex', title:'🧪 Tu primera variable de juego', tasks:[
      {q:'Crea la variable <code>oro</code> con valor <code>50</code> (Set) y luego imprímela leyéndola con Get. Salida: <code>50</code>.', hint:'Exec: BeginPlay → Set. El Get flota libre y su value va al Text del print.', start:bG([bE(1),bSet(2,'oro'),bGet(3,'oro'),bP(4),bI(5,50)],[]), check:{lines:['50'], vars:{oro:50}}, solution:bG([bE(1),bSet(2,'oro'),bGet(3,'oro'),bP(4),bI(5,50)],[['1.then','2.in'],['5.value','2.value'],['2.then','4.in'],['3.value','4.text']]), pts:25},
      {q:'Variable de texto: <code>nombre</code> = <code>Esperanza</code>, impresa al final.', hint:'Los literales string van directo al Set (mismo tipo).', start:bG([bE(1),bSet(2,'nombre','string'),bGet(3,'nombre','string'),bP(4),bS(5,'Esperanza')],[]), check:{lines:['Esperanza'], vars:{nombre:'Esperanza'}}, solution:bG([bE(1),bSet(2,'nombre','string'),bGet(3,'nombre','string'),bP(4),bS(5,'Esperanza')],[['1.then','2.in'],['5.value','2.value'],['2.then','4.in'],['3.value','4.text']]), pts:25},
      {q:'Reasigna: primero <code>oro</code> = 100, después <code>oro</code> = 200, y al final imprime. Debe salir <code>200</code> (el último Set gana).', hint:'Dos Sets en cadena: BeginPlay → Set 100 → Set 200 → Print.', start:bG([bE(1),bSet(2,'oro'),bSet(3,'oro'),bGet(4,'oro'),bP(5),bI(6,100),bI(7,200)],[]), check:{lines:['200'], vars:{oro:200}}, solution:bG([bE(1),bSet(2,'oro'),bSet(3,'oro'),bGet(4,'oro'),bP(5),bI(6,100),bI(7,200)],[['1.then','2.in'],['2.then','3.in'],['3.then','5.in'],['6.value','2.value'],['7.value','3.value'],['4.value','5.text']]), pts:25},
      {q:'Mensaje compuesto: imprime <code>Vida: 100</code>. Usa Concat: <code>"Vida: "</code> + el Get de <code>vida</code> (Seteada en 100).', hint:'Concat A ← "Vida: ", Concat B ← Get vida. El resultado va al Text del print.', check:{lines:['Vida: 100'], requireNodes:['concat']}, solution:bG([bE(1),bSet(2,'vida'),bGet(3,'vida'),bCat(4),bP(5),bI(6,100),bS(7,'Vida: ')],[['1.then','2.in'],['6.value','2.value'],['2.then','5.in'],['7.value','4.a'],['3.value','4.b'],['4.result','5.text']]), pts:30}
    ]}
  ]},

  { id:'2-2', title:'Aritmética estilo UE: int/int trunca', time:'12 min', blocks:[
    {t:'p', h:'El nodo <b>Aritmética</b> suma, resta, multiplica, divide y saca módulo (residuo). Elige la operación dentro del nodo. OJO con la división de enteros: como el motor está escrito en C++, <code>10 / 4</code> con dos ints da <code>2</code> — <b>trunca hacia cero</b>. Si quieres decimales, al menos un lado debe ser float.'},
    {t:'table', head:['Operación','Con ints','Con un float'], rows:[
      ['10 / 4','2 (trunca)','2.5'],
      ['-7 / 2','-3 (hacia cero)','-3.5'],
      ['7 % 3','1 (residuo)','1.0'],
      ['-7 % 3','-1 (signo del dividendo)','-1.0']
    ]},
    {t:'info', title:'ℹ️ ¿Y si vengo del curso de Python?', h:'Aquí está la gran diferencia: en Python <code>10/4</code> da <code>2.5</code> y <code>-7//2</code> da <code>-4</code> (piso). En Unreal/C++ la división entera trunca hacia cero (<code>-3</code>). Mismo problema, convención distinta: saber cuál usa cada lenguaje te convierte en bilingüe de verdad.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Con dos ints, <code>7 / 2</code> en Unreal da…', options:['3.5','4','3','Error'], correct:2, pts:10, explain:'int/int trunca hacia cero: 3. Con 7.0/2.0 daría 3.5.'},
      {type:'mc', q:'<code>-7 / 2</code> (ints) da…', options:['-3.5','-4','-3','-2'], correct:2, pts:10, explain:'Trunca HACIA CERO: -3. (El redondeo piso -4 es cosa de Python //.)'},
      {type:'tf', q:'El módulo (%) de -7 % 3 en Unreal da -1.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'El residuo toma el signo del dividendo: -1. (Python daría 2.)'}
    ]},
    {t:'bpex', title:'🧪 La matemática del motor', tasks:[
      {q:'División entera: imprime <code>10 / 4</code> con dos literales int → <code>2</code>.', hint:'Nodo Aritmética con op /: ambos lados literales int.', start:bG([bE(1),bP(2),bI(3,10),bI(4,4),bAr(5,'/')],[]), check:{lines:['2']}, solution:bG([bE(1),bP(2),bI(3,10),bI(4,4),bAr(5,'/')],[['1.then','2.in'],['3.value','5.a'],['4.value','5.b'],['5.result','2.text']]), pts:20},
      {q:'División real: <code>10.0 / 4.0</code> (floats) → <code>2.5</code>.', hint:'Ambos literales float: el resultado sale con decimal.', start:bG([bE(1),bP(2),bF(3,10.0),bF(4,4.0),bAr(5,'/')],[]), check:{lines:['2.5']}, solution:bG([bE(1),bP(2),bF(3,10.0),bF(4,4.0),bAr(5,'/')],[['1.then','2.in'],['3.value','5.a'],['4.value','5.b'],['5.result','2.text']]), pts:20},
      {q:'Truncado negativo: <code>-7 / 2</code> → <code>-3</code>.', hint:'Hacia cero, no hacia abajo.', start:bG([bE(1),bP(2),bI(3,-7),bI(4,2),bAr(5,'/')],[]), check:{lines:['-3']}, solution:bG([bE(1),bP(2),bI(3,-7),bI(4,2),bAr(5,'/')],[['1.then','2.in'],['3.value','5.a'],['4.value','5.b'],['5.result','2.text']]), pts:20},
      {q:'Precedencia con dos nodos: calcula <code>(2 + 3) * 4</code> → <code>20</code>. El resultado de la suma entra al pin A de la multiplicación.', hint:'Nodo + → su result al pin a del nodo *; el literal 4 al pin b.', start:bG([bE(1),bP(2),bI(3,2),bI(4,3),bI(5,4),bAr(6,'+'),bAr(7,'*')],[]), check:{lines:['20']}, solution:bG([bE(1),bP(2),bI(3,2),bI(4,3),bI(5,4),bAr(6,'+'),bAr(7,'*')],[['1.then','2.in'],['3.value','6.a'],['4.value','6.b'],['6.result','7.a'],['5.value','7.b'],['7.result','2.text']]), pts:25}
    ]}
  ]},

  { id:'2-3', title:'Comparaciones: fabricar bools', time:'12 min', blocks:[
    {t:'p', h:'El nodo <b>Comparar</b> toma dos valores y responde verdadero/falso: <code>==</code> (igual), <code>!=</code> (distinto), <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>. Su salida es un bool rojo: exactamente lo que un Branch necesita. Comparar es el puente entre los datos y las decisiones.'},
    {t:'table', head:['Operador','Pregunta que hace','10 ? 3'], rows:[
      ['==','¿Son iguales?','false'],
      ['!=','¿Son distintos?','true'],
      ['>','¿Es mayor?','true'],
      ['<=','¿Es menor o igual?','false']
    ]},
    {t:'info', title:'ℹ️ == con textos y floats', h:'Comparar también funciona con strings ("oro" == "plata" → false) y entre int y float (5 == 5.0 → true: el motor los iguala numéricamente). Ojo: para bools usa la lógica booleana (AND/OR/NOT), no comparaciones.'},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>10 >= 10</code> da…', options:['true','false','10','Error'], correct:0, pts:10, explain:'>= incluye la igualdad: 10 sí es mayor O IGUAL que 10.'},
      {type:'mc', q:'La salida de un nodo Comparar es…', options:['Un int','Un string','Un bool','Un exec'], correct:2, pts:10, explain:'Siempre true/false: el cable rojo de las decisiones.'},
      {type:'tf', q:'5 == 5.0 evalúa true (int y float se comparan numéricamente).', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Para el motor ambos son el número 5: la comparación numérica da true.'}
    ]},
    {t:'bpex', title:'🧪 Fábrica de decisiones', tasks:[
      {q:'Imprime el resultado de <code>10 > 3</code>: debe salir <code>true</code>.', hint:'Comparar op > ; el result al Text del print (bool entra solo).', start:bG([bE(1),bP(2),bI(3,10),bI(4,3),bCmp(5,'>')],[]), check:{lines:['true']}, solution:bG([bE(1),bP(2),bI(3,10),bI(4,3),bCmp(5,'>')],[['1.then','2.in'],['3.value','5.a'],['4.value','5.b'],['5.result','2.text']]), pts:20},
      {q:'¿Ganó el premio gordo? Imprime <code>"oro" == "plata"</code> → <code>false</code>.', hint:'Dos literales string al Comparar.', start:bG([bE(1),bP(2),bS(3,'oro'),bS(4,'plata'),bCmp(5,'==')],[]), check:{lines:['false']}, solution:bG([bE(1),bP(2),bS(3,'oro'),bS(4,'plata'),bCmp(5,'==')],[['1.then','2.in'],['3.value','5.a'],['4.value','5.b'],['5.result','2.text']]), pts:20},
      {q:'Igualdad numérica: <code>5 == 5.0</code> → <code>true</code> (int contra float).', hint:'Un literal int y uno float al mismo Comparar.', start:bG([bE(1),bP(2),bI(3,5),bF(4,5.0),bCmp(5,'==')],[]), check:{lines:['true']}, solution:bG([bE(1),bP(2),bI(3,5),bF(4,5.0),bCmp(5,'==')],[['1.then','2.in'],['3.value','5.a'],['4.value','5.b'],['5.result','2.text']]), pts:20},
      {q:'¿Puede entrar al contenido maduro? <code>edad(15) >= 18</code> → imprime <code>false</code>.', hint:'Literal 15, literal 18, Comparar >=, print.', start:bG([bE(1),bP(2),bI(3,15),bI(4,18),bCmp(5,'>=')],[]), check:{lines:['false']}, solution:bG([bE(1),bP(2),bI(3,15),bI(4,18),bCmp(5,'>=')],[['1.then','2.in'],['3.value','5.a'],['4.value','5.b'],['5.result','2.text']]), pts:20}
    ]}
  ]},

  { id:'2-4', title:'Lógica booleana: AND, OR, XOR, NOT', time:'12 min', blocks:[
    {t:'p', h:'Las decisiones reales combinan condiciones: «puedo comprar la espada si tengo oro <b>Y</b> nivel ≥ 3». El nodo <b>Lógica booleana</b> une dos bools (o niega uno, con NOT) y entrega otro bool. La tabla de verdad es corta pero conviene saberla de memoria.'},
    {t:'table', head:['A','B','A AND B','A OR B','A XOR B'], rows:[
      ['true','true','true','true','false'],
      ['true','false','false','true','true'],
      ['false','true','false','true','true'],
      ['false','false','false','false','false']
    ]},
    {t:'info', title:'ℹ️ XOR y NOT', h:'XOR («o exclusivo») es true cuando AMBOS difieren: útil para alternar estados (lámpara que se enciende/apaga). NOT invierte un bool y solo usa el pin A (un solo cable). En UE estos son los nodos AND Boolean, OR Boolean, NOT Boolean.'},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>true AND false</code> da…', options:['true','false','1','Error'], correct:1, pts:10, explain:'AND exige ambos verdaderos: con uno solo false, el resultado es false.'},
      {type:'mc', q:'El jugador tiene llave (true) pero la puerta está cerrada con llave... Para «abrir con llave O con ganzúa» usas…', options:['AND','OR','XOR','NOT'], correct:1, pts:10, explain:'OR basta con que UNA condición sea verdadera.'},
      {type:'tf', q:'<code>true XOR true</code> da true.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: XOR es true solo cuando los dos bools DIFIEREN. true XOR true = false.'}
    ]},
    {t:'bpex', title:'🧪 Combina condiciones', tasks:[
      {q:'¿Puede entrar al cofre? <code>tieneLlave AND nivelAlto</code> con true y false → imprime <code>false</code>.', hint:'Dos bools literales al nodo Lógica op and.', start:bG([bE(1),bP(2),bB(3,true),bB(4,false),bLog(5,'and')],[]), check:{lines:['false']}, solution:bG([bE(1),bP(2),bB(3,true),bB(4,false),bLog(5,'and')],[['1.then','2.in'],['3.value','5.a'],['4.value','5.b'],['5.result','2.text']]), pts:20},
      {q:'Reintento con piedad: <code>false OR true</code> → <code>true</code>.', hint:'OR basta con un true.', start:bG([bE(1),bP(2),bB(3,false),bB(4,true),bLog(5,'or')],[]), check:{lines:['true']}, solution:bG([bE(1),bP(2),bB(3,false),bB(4,true),bLog(5,'or')],[['1.then','2.in'],['3.value','5.a'],['4.value','5.b'],['5.result','2.text']]), pts:20},
      {q:'Invierte la señal: <code>NOT true</code> → <code>false</code>.', hint:'En NOT conecta SOLO el pin A (un solo cable).', start:bG([bE(1),bP(2),bB(3,true),bLog(4,'not')],[]), check:{lines:['false']}, solution:bG([bE(1),bP(2),bB(3,true),bLog(4,'not')],[['1.then','2.in'],['3.value','4.a'],['4.result','2.text']]), pts:20},
      {q:'¿Empate dramático? <code>true XOR true</code> → <code>false</code>.', hint:'XOR con dos valores IGUALES siempre da false.', start:bG([bE(1),bP(2),bB(3,true),bB(4,true),bLog(5,'xor')],[]), check:{lines:['false']}, solution:bG([bE(1),bP(2),bB(3,true),bB(4,true),bLog(5,'xor')],[['1.then','2.in'],['3.value','5.a'],['4.value','5.b'],['5.result','2.text']]), pts:20}
    ]}
  ]}
]});

MODULES.push({
  id:'m3', emoji:'🔀', name:'Flujo de ejecución', color:'#8b5cf6',
  desc:'Branch, Sequence, ForLoop, WhileLoop y FlipFlop: el corazón del gameplay.',
  lessons:[
  { id:'3-1', title:'Branch: la decisión', time:'14 min', blocks:[
    {t:'p', h:'<b>Branch</b> es el «si… entonces… si no» de los videojuegos. Entra una flecha blanca y una condición bool; salen DOS flechas: <b>True</b> y <b>False</b>. La ejecución sigue solo una. Con Branches se decide todo: ¿hay vida?, ¿alcanza el oro?, ¿ganó la partida?'},
    {t:'bp', g:'demo_branch', h:'Set vida = 0, Branch con (vida > 0): por True se imprime «Vive», por False «KO». Sigue las flechas blancas: solo un camino se ejecuta.'},
    {t:'info', title:'ℹ️ La condición no se negocia', h:'El pin Condition SOLO acepta bool. Si conectas un int (por ejemplo la vida directa), el editor lo rechaza: primero conviértela en pregunta con un Comparar (vida > 0). En Python las cosas eran más laxas; en UE la disciplina de tipos es estricta — y eso evita bugs.'},
    {t:'quiz', questions:[
      {type:'mc', q:'El pin Condition de un Branch recibe…', options:['Un int','Un string','Un bool','Lo que sea'], correct:2, pts:10, explain:'Solo bool rojo. Para pasar de número a bool: nodo Comparar.'},
      {type:'mc', q:'Un Branch tiene… salidas de ejecución.', options:['1','2 (True y False)','3','0'], correct:1, pts:10, explain:'True y False: la ejecución toma exactamente una.'},
      {type:'tf', q:'Si la condición es false y NO conectaste el pin False, simplemente no pasa nada por esa rama.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Un pin de salida sin cable es un callejón sin salida: el flujo termina ahí, sin error.'}
    ]},
    {t:'bpex', title:'🧪 Decide como un juego', tasks:[
      {q:'Conecta el Branch: condición <code>true</code> (literal bool) → imprime <code>Sigue viva</code> por True.', hint:'LB → Condition; Branch True → Print.', start:bG([bE(1),bBr(2),bP(3),bB(4,true),bS(5,'Sigue viva')],[]), check:{lines:['Sigue viva']}, solution:bG([bE(1),bBr(2),bP(3),bB(4,true),bS(5,'Sigue viva')],[['1.then','2.in'],['2.true','3.in'],['4.value','2.cond'],['5.value','3.text']]), pts:20},
      {q:'Condición fabricada: <code>vida(100) > 0</code> → imprime <code>Hay vida</code>.', hint:'Comparar > con 100 y 0; su result al Condition.', start:bG([bE(1),bBr(2),bP(3),bI(4,100),bI(5,0),bCmp(6,'>'),bS(7,'Hay vida')],[]), check:{lines:['Hay vida']}, solution:bG([bE(1),bBr(2),bP(3),bI(4,100),bI(5,0),bCmp(6,'>'),bS(7,'Hay vida')],[['1.then','2.in'],['2.true','3.in'],['4.value','6.a'],['5.value','6.b'],['6.result','2.cond'],['7.value','3.text']]), pts:25},
      {q:'Tienda: si <code>oro(50) >= 50</code> imprime <code>Compra exitosa</code>; si no, <code>Te falta oro</code>. Conecta AMBAS salidas del Branch.', hint:'Comparar >= con 50 y 50 → true: saldrá por True, pero conecta ambas ramas.', start:bG([bE(1),bBr(2),bP(3),bP(4),bI(5,50),bI(6,50),bCmp(7,'>='),bS(8,'Compra exitosa'),bS(9,'Te falta oro')],[]), check:{lines:['Compra exitosa']}, solution:bG([bE(1),bBr(2),bP(3),bP(4),bI(5,50),bI(6,50),bCmp(7,'>='),bS(8,'Compra exitosa'),bS(9,'Te falta oro')],[['1.then','2.in'],['2.true','3.in'],['2.false','4.in'],['5.value','7.a'],['6.value','7.b'],['7.result','2.cond'],['8.value','3.text'],['9.value','4.text']]), pts:30},
      {q:'Derrota: con <code>vida(0) <= 0</code> imprime <code>Game Over</code> por la rama True. Tu grafo debe incluir un Branch.', hint:'Comparar <=: 0 <= 0 es true → Game Over.', check:{lines:['Game Over'], requireNodes:['branch']}, solution:bG([bE(1),bBr(2),bP(3),bI(4,0),bI(5,0),bCmp(6,'<='),bS(7,'Game Over')],[['1.then','2.in'],['2.true','3.in'],['4.value','6.a'],['5.value','6.b'],['6.result','2.cond'],['7.value','3.text']]), pts:25}
    ]}
  ]},

  { id:'3-2', title:'Sequence: orden sin enredos', time:'12 min', blocks:[
    {t:'p', h:'Cuando un nodo necesita disparar VARIAS cadenas en un orden exacto, el nodo <b>Sequence</b> las numera: primero ejecuta todo <b>Then 0</b>, completo, y después <b>Then 1</b>. Es la alternativa limpia a los cables que se cruzan: el orden queda explícito en la pantalla.'},
    {t:'info', title:'ℹ️ ¿Por qué no simplemente encadenar?', h:'Muchas veces sí: A → B → C en cadena. Pero si B y C son DOS sistemas distintos (música + spawn de enemigos), Sequence separa las responsabilidades: cada pin Then alimenta su propio sistema. En UE el nodo Sequence acepta los pines que agregues (Then 2, Then 3…); aquí trabajamos con dos.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Un Sequence ejecuta…', options:['Then 1 y luego Then 0','Then 0 y luego Then 1','Ambos a la vez','Al azar'], correct:1, pts:10, explain:'Los índices son el orden: 0 primero, 1 después. Por eso existe la numeración.'},
      {type:'mc', q:'¿Cuándo conviene un Sequence?', options:['Para comparar números','Para ordenar varias cadenas independientes sin cables cruzados','Para repetir acciones','Para imprimir'], correct:1, pts:10, explain:'Es un organizador de flujo: cada Then es un subsistema con su orden claro.'},
      {type:'tf', q:'Si la cadena del Then 0 imprime tres cosas, el Then 1 espera a que terminen las tres.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Sequence es estricto: termina TODO Then 0 antes de arrancar Then 1.'}
    ]},
    {t:'bpex', title:'🧪 Ordena tu orquesta', tasks:[
      {q:'Sequence básico: Then 0 imprime <code>A</code>, Then 1 imprime <code>B</code>.', hint:'BeginPlay → Sequence; Then 0 → Print A; Then 1 → Print B.', start:bG([bE(1),bSeq(2),bP(3),bP(4),bS(5,'A'),bS(6,'B')],[]), check:{lines:['A','B']}, solution:bG([bE(1),bSeq(2),bP(3),bP(4),bS(5,'A'),bS(6,'B')],[['1.then','2.in'],['2.then0','3.in'],['2.then1','4.in'],['5.value','3.text'],['6.value','4.text']]), pts:20},
      {q:'Carga del nivel: imprime <code>Cargando…</code>, luego el Sequence con <code>Spawneando enemigos</code> (Then 0) y <code>Nivel listo</code> (Then 1).', hint:'BeginPlay → Print → Sequence → dos prints.', start:bG([bE(1),bP(2),bSeq(3),bP(4),bP(5),bS(6,'Cargando…'),bS(7,'Spawneando enemigos'),bS(8,'Nivel listo')],[]), check:{lines:['Cargando…','Spawneando enemigos','Nivel listo']}, solution:bG([bE(1),bP(2),bSeq(3),bP(4),bP(5),bS(6,'Cargando…'),bS(7,'Spawneando enemigos'),bS(8,'Nivel listo')],[['1.then','2.in'],['2.then','3.in'],['3.then0','4.in'],['3.then1','5.in'],['6.value','2.text'],['7.value','4.text'],['8.value','5.text']]), pts:25},
      {q:'Pantalla de inicio: <code>Título</code> (Then 0) y <code>Presiona Start</code> (Then 1). Tu grafo debe incluir un sequence.', hint:'El calificador pide el nodo sequence.', check:{lines:['Título','Presiona Start'], requireNodes:['sequence']}, solution:bG([bE(1),bSeq(2),bP(3),bP(4),bS(5,'Título'),bS(6,'Presiona Start')],[['1.then','2.in'],['2.then0','3.in'],['2.then1','4.in'],['5.value','3.text'],['6.value','4.text']]), pts:20}
    ]}
  ]},

  { id:'3-3', title:'ForLoop: repetir N veces', time:'14 min', blocks:[
    {t:'p', h:'El nodo <b>ForLoop</b> repite su cuerpo un número fijo de vueltas: desde <b>First</b> hasta <b>Last</b>, <b>INCLUYENDO el último</b>. En cada vuelta expone el número actual por su pin <b>Index</b> (disponible SOLO dentro del cuerpo). Al terminar, dispara <b>Completed</b>. Es el rey de las oleadas, los turnos y los conteos.'},
    {t:'warn', title:'⚠️ Inclusivo: de 1 a 5 son 5 vueltas', h:'ForLoop 1..5 ejecuta el cuerpo con Index = 1, 2, 3, 4, 5. Cinco vueltas. Si vienes de Python, range(1,5) eran solo 4: aquí el límite superior SÍ se incluye. Y si First > Last (5..1), el cuerpo no se ejecuta ni una vez: va directo a Completed.'},
    {t:'srs', deck:'uecore', sub:'Fija ForLoop, Branch y Sequence: los tres nodos de flujo que usarás en TODO juego.'},
    {t:'quiz', questions:[
      {type:'mc', q:'ForLoop de First=1 a Last=5 ejecuta el cuerpo…', options:['4 veces (1..4)','5 veces (1..5)','6 veces','0 veces'], correct:1, pts:10, explain:'El Last es INCLUSIVO: 1,2,3,4,5 — cinco vueltas.'},
      {type:'mc', q:'El pin Index del ForLoop…', options:['Se puede leer en todo el grafo','Solo se puede leer DENTRO del cuerpo del loop','Es un string','Cuenta desde 0 siempre'], correct:1, pts:10, explain:'Index es contextual: existe solo durante cada vuelta, dentro del cuerpo.'},
      {type:'tf', q:'ForLoop con First=5 y Last=1 ejecuta el cuerpo una vez.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: no itera ninguna vez y salta directo a Completed.'}
    ]},
    {t:'bpex', title:'🧪 Oleadas y conteos', tasks:[
      {q:'ForLoop de 1 a 5 imprimiendo el Index: salen <code>1</code> a <code>5</code> (una por línea).', hint:'Index → Text del print dentro del cuerpo (int→texto automático).', start:bG([bE(1),bFor(2),bP(3)],[]), check:{lines:['1','2','3','4','5']}, solution:bG([bE(1),bFor(2),bP(3)],[['1.then','2.in'],['2.body','3.in'],['2.index','3.text']]), pts:25},
      {q:'Índices de array: ForLoop de <code>0</code> a <code>3</code> → <code>0,1,2,3</code>.', hint:'Literales int a First y Last.', start:bG([bE(1),bFor(2),bP(3),bI(4,0),bI(5,3)],[]), check:{lines:['0','1','2','3']}, solution:bG([bE(1),bFor(2),bP(3),bI(4,0),bI(5,3)],[['1.then','2.in'],['4.value','2.first'],['5.value','2.last'],['2.body','3.in'],['2.index','3.text']]), pts:25},
      {q:'Rango vacío: ForLoop de <code>5</code> a <code>1</code> con <code>Completed</code> conectado a un print <code>Sin vueltas</code>.', hint:'El cuerpo no se ejecuta: solo suena Completed.', start:bG([bE(1),bFor(2),bP(3),bI(4,5),bI(5,1),bS(6,'Sin vueltas')],[]), check:{lines:['Sin vueltas']}, solution:bG([bE(1),bFor(2),bP(3),bI(4,5),bI(5,1),bS(6,'Sin vueltas')],[['1.then','2.in'],['4.value','2.first'],['5.value','2.last'],['2.completed','3.in'],['6.value','3.text']]), pts:25},
      {q:'Oleadas con etiqueta: ForLoop 1..3 imprimiendo <code>Oleada 1</code>, <code>Oleada 2</code>, <code>Oleada 3</code> (Concat: "Oleada " + Index).', hint:'Concat A ← "Oleada ", Concat B ← To String del Index. Result → Text.', check:{lines:['Oleada 1','Oleada 2','Oleada 3'], requireNodes:['concat']}, solution:bG([bE(1),bFor(2),bCat(3),bP(4),bS(5,'Oleada '),bTos(6),bI(7,1),bI(8,3)],[['1.then','2.in'],['7.value','2.first'],['8.value','2.last'],['2.body','4.in'],['5.value','3.a'],['2.index','6.value'],['6.result','3.b'],['3.result','4.text']]), pts:30}
    ]}
  ]},

  { id:'3-4', title:'WhileLoop: repetir mientras', time:'14 min', blocks:[
    {t:'p', h:'<b>WhileLoop</b> repite su cuerpo MIENTRAS la condición sea verdadera; la revisa ANTES de cada vuelta. A diferencia del ForLoop, aquí no sabes cuántas vueltas serán: depende de los datos. Regla de supervivencia: algo dentro del cuerpo debe, tarde o temprano, hacer falsa la condición — si no, ciclo infinito.'},
    {t:'bp', g:'demo_while', h:'n empieza en 1; mientras n <= 4 se imprime n y se le suma 1. Salida: 1, 2, 3, 4, y al final Completed.'},
    {t:'info', title:'ℹ️ El guardián anti-infinitos', h:'Este simulador detecta ciclos que no terminan (después de miles de pasos te avisa: «el WhileLoop no termina nunca»). En UE real un ciclo infinito congela el juego y toca matar el proceso: aprecia el guardián. Patrones seguros: contadores que suben, vidas que bajan, banderas que cambian.'},
    {t:'quiz', questions:[
      {type:'mc', q:'WhileLoop revisa su condición…', options:['Al final de todas las vueltas','ANTES de cada vuelta','Nunca, entra directo','Cada 2 vueltas'], correct:1, pts:10, explain:'Primero pregunta, después ejecuta. Si es false de entrada, el cuerpo jamás corre.'},
      {type:'mc', q:'¿Cuándo prefieres WhileLoop sobre ForLoop?', options:['Cuando sabes el número exacto de vueltas','Cuando NO sabes cuántas vueltas harán falta','Para imprimir más rápido','Siempre: es más moderno'], correct:1, pts:10, explain:'Sabes N → ForLoop. No sabes N (esperar un evento, vaciar una cola) → While.'},
      {type:'tf', q:'Un WhileLoop cuya condición nunca se vuelve falsa, en UE real congela el juego.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'El hilo del juego se queda atrapado: por eso siempre algo del cuerpo debe cambiar la condición.'}
    ]},
    {t:'bpex', title:'🧪 Mientras haya juego', tasks:[
      {q:'Cuenta regresiva: <code>vida</code> empieza en 3; mientras <code>vida > 0</code>: imprime <code>vida</code> y réstale 1. Salida: <code>3,2,1</code> y vida termina en 0.', hint:'Set vida=3 → While (cond: Comparar vida > 0). Cuerpo: print (Get vida) y Set vida = vida - 1.', start:bG([bE(1),bSet(2,'vida'),bWhile(3),bP(4),bSet(5,'vida'),bGet(6,'vida'),bCmp(7,'>'),bAr(8,'-'),bI(9,3),bI(10,1),bI(11,0)],[]), check:{lines:['3','2','1'], vars:{vida:0}}, solution:bG([bE(1),bSet(2,'vida'),bWhile(3),bP(4),bSet(5,'vida'),bGet(6,'vida'),bCmp(7,'>'),bAr(8,'-'),bI(9,3),bI(10,1),bI(11,0)],[['1.then','2.in'],['9.value','2.value'],['2.then','3.in'],['7.result','3.cond'],['6.value','7.a'],['11.value','7.b'],['3.body','4.in'],['6.value','4.text'],['3.body','5.in'],['6.value','8.a'],['10.value','8.b'],['8.result','5.value']]), pts:30},
      {q:'El que nunca entra: condición <code>false</code> desde el inicio; conecta <code>Completed</code> a un print <code>Fuera</code>.', hint:'La condición false ni una vez ejecuta el cuerpo.', start:bG([bE(1),bWhile(2),bP(3),bB(4,false),bS(5,'Fuera')],[]), check:{lines:['Fuera']}, solution:bG([bE(1),bWhile(2),bP(3),bB(4,false),bS(5,'Fuera')],[['1.then','2.in'],['4.value','2.cond'],['2.completed','3.in'],['5.value','3.text']]), pts:20},
      {q:'Contador clásico: <code>n</code> empieza en 1; mientras <code>n <= 4</code>: imprime <code>n</code> y súmale 1. Salida: <code>1,2,3,4</code>.', hint:'Igual que la cuenta regresiva pero con <= y suma.', start:bG([bE(1),bSet(2,'n'),bWhile(3),bP(4),bSet(5,'n'),bGet(6,'n'),bCmp(7,'<='),bAr(8,'+'),bI(9,1),bI(10,0),bI(11,4),bI(12,1)],[]), check:{lines:['1','2','3','4'], vars:{n:5}}, solution:bG([bE(1),bSet(2,'n'),bWhile(3),bP(4),bSet(5,'n'),bGet(6,'n'),bCmp(7,'<='),bAr(8,'+'),bI(9,1),bI(10,0),bI(11,4),bI(12,1)],[['1.then','2.in'],['12.value','2.value'],['2.then','3.in'],['7.result','3.cond'],['6.value','7.a'],['11.value','7.b'],['3.body','4.in'],['6.value','4.text'],['3.body','5.in'],['6.value','8.a'],['12.value','8.b'],['8.result','5.value']]), pts:30},
      {q:'Oro que se agota: <code>oro</code> = 5; mientras <code>oro > 0</code>: imprime <code>oro</code> y réstale 2. Salida: <code>5,3,1</code>. Debe incluir un whileloop.', hint:'5 → 3 → 1 → (5-2-2-2 = -1, la condición se vuelve falsa y se detiene). El calificador pide el nodo whileloop.', check:{lines:['5','3','1'], requireNodes:['whileloop']}, solution:bG([bE(1),bSet(2,'oro'),bWhile(3),bP(4),bSet(5,'oro'),bGet(6,'oro'),bCmp(7,'>'),bAr(8,'-'),bI(9,5),bI(10,2),bI(11,0)],[['1.then','2.in'],['9.value','2.value'],['2.then','3.in'],['7.result','3.cond'],['6.value','7.a'],['11.value','7.b'],['3.body','4.in'],['6.value','4.text'],['3.body','5.in'],['6.value','8.a'],['10.value','8.b'],['8.result','5.value']]), pts:30}
    ]}
  ]},

  { id:'3-5', title:'FlipFlop: alternar estados', time:'12 min', blocks:[
    {t:'p', h:'<b>FlipFlop</b> es el interruptor de dos posiciones: la primera vez que lo ejecutas dispara la salida <b>A</b>, la siguiente la <b>B</b>, luego otra vez <b>A</b>… Además expone el bool <b>Is A</b> (¿toca la de A?). Es perfecto para alternar: luces que parpadean, turnos que rotan, puertas que abren/cierran.'},
    {t:'info', title:'ℹ️ Turnos con FlipFlop', h:'Un FlipFlop dentro de un ForLoop crea turnos alternados: A = «Turno del héroe», B = «Turno del monstruo». Con el pin Is A conectado a un Branch puedes además tratar cada caso de forma distinta sin duplicar la lógica.'},
    {t:'srs', deck:'uecore', sub:'Refuerza variables, Branch y los ciclos: repaso espaciado de 2 minutos.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Ejecutas un FlipFlop 3 veces. ¿Qué salidas se disparan, en orden?', options:['A, A, A','A, B, A','B, A, B','A, B, se detiene'], correct:1, pts:10, explain:'Alterna: primera A, segunda B, tercera A otra vez.'},
      {type:'mc', q:'El pin «Is A» de un FlipFlop es…', options:['Un exec','Un bool que dice si esta vuelta tocó A','Un string con el nombre','Un int contador'], correct:1, pts:10, explain:'Is A es true si esta ejecución fue por A, false si fue por B: ideal para un Branch.'},
      {type:'tf', q:'FlipFlop recuerda su estado entre ejecuciones dentro de la misma partida.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Ese es su superpoder: guarda la alternancia mientras el juego vive.'}
    ]},
    {t:'bpex', title:'🧪 Alterna como pro', tasks:[
      {q:'Dentro de un ForLoop 1..4, un FlipFlop imprime <code>A</code> y <code>B</code> alternados: <code>A,B,A,B</code>.', hint:'ForLoop body → FlipFlop; A → print "A"; B → print "B".', start:bG([bE(1),bFor(2),bFF(3),bP(4),bP(5),bS(6,'A'),bS(7,'B')],[]), check:{lines:['A','B','A','B']}, solution:bG([bE(1),bFor(2),bFF(3),bP(4),bP(5),bS(6,'A'),bS(7,'B'),bI(8,1),bI(9,4)],[['1.then','2.in'],['8.value','2.first'],['9.value','2.last'],['2.body','3.in'],['3.a','4.in'],['3.b','5.in'],['6.value','4.text'],['7.value','5.text']]), pts:25},
      {q:'Día y noche: BeginPlay → FlipFlop; A imprime <code>Día</code>, B imprime <code>Noche</code>.', hint:'Dos ejecuciones del FlipFlop (el BeginPlay corre una vez: conecta A y B para ver ambas… truco: con un solo arranque solo sale una). Usa ForLoop 1..2 para las dos vueltas.', start:bG([bE(1),bFor(2),bFF(3),bP(4),bP(5),bS(6,'Día'),bS(7,'Noche')],[]), check:{lines:['Día','Noche']}, solution:bG([bE(1),bFor(2),bFF(3),bP(4),bP(5),bS(6,'Día'),bS(7,'Noche'),bI(8,1),bI(9,2)],[['1.then','2.in'],['8.value','2.first'],['9.value','2.last'],['2.body','3.in'],['3.a','4.in'],['3.b','5.in'],['6.value','4.text'],['7.value','5.text']]), pts:25},
      {q:'Turnos etiquetados: ForLoop 1..4 → FlipFlop → Branch con <code>Is A</code>: True imprime <code>Turno par</code>, False <code>Turno impar</code>.', hint:'FlipFlop Is A → Branch Condition; ambas salidas del FlipFlop entran al mismo Branch.', check:{lines:['Turno par','Turno impar','Turno par','Turno impar'], requireNodes:['branch']}, solution:bG([bE(1),bFor(2),bFF(3),bBr(4),bP(5),bP(6),bS(7,'Turno par'),bS(8,'Turno impar'),bI(9,1),bI(10,4)],[['1.then','2.in'],['9.value','2.first'],['10.value','2.last'],['2.body','3.in'],['3.a','4.in'],['3.b','4.in'],['3.isA','4.cond'],['4.true','5.in'],['4.false','6.in'],['7.value','5.text'],['8.value','6.text']]), pts:30}
    ]}
  ]}
]});
