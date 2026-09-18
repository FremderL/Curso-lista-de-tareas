
/* ============================ EXAMEN FINAL (30 preguntas · 300 pts) ============================ */
const EXAM = {
  questions:[
    /* ---- Módulo 1: Arrays ---- */
    {type:'mc', q:'M1 · <code>const mazo = [\'A\',\'B\',\'C\']</code>. ¿Qué devuelve <code>mazo[mazo.length - 1]</code>?', options:['\'A\'','\'B\'','\'C\'','undefined'], correct:2, pts:10, explain:'length - 1 es siempre el índice del último elemento: C.'},
    {type:'mc', q:'M1 · ¿Qué método quita y DEVUELVE el último elemento?', options:['push()','pop()','shift()','slice()'], correct:1, pts:10, explain:'pop() saca del final; shift() del inicio; push agrega al final.'},
    {type:'mc', q:'M1 · <code>cartas.filter(c => c.encontrada)</code> devuelve…', options:['un booleano','un array nuevo solo con las encontradas','el número de encontradas','undefined'], correct:1, pts:10, explain:'filter selecciona los que cumplen y devuelve un array nuevo (para contar: .length).'},
    {type:'fill', q:'M1 · Método que crea un array NUEVO transformando cada elemento:', accept:['map'], re:'^\\s*map\\s*$', show:'mazo.map(c => new Carta(c))', pts:10, hint:'“mapear”.'},
    {type:'mc', q:'M1 · <code>[10, 9, 100].sort()</code> sin comparador devuelve…', options:['[9, 10, 100]','[10, 100, 9]','[100, 10, 9]','[9, 100, 10]'], correct:1, pts:10, explain:'Ordena como texto: “10” < “100” < “9”. Números necesitan comparador (a, b) => a - b.'},
    {type:'mc', q:'M1 · Dos variables apuntan al mismo array. Si una hace push, la otra…', options:['no ve el cambio','ve el cambio: comparten la referencia en memoria','recibe una copia automática','lanza error'], correct:1, pts:10, explain:'La asignación copia la dirección, no el contenido: es el experimento de la lección 1.3.'},
    /* ---- Módulo 2: Objetos y funciones ---- */
    {type:'mc', q:'M2 · <code>const { emoji } = carta</code> es…', options:['un error','destructuring: crea la variable emoji con carta.emoji','un spread','un método'], correct:1, pts:10, explain:'El destructuring extrae propiedades a variables con la misma sintaxis de llaves.'},
    {type:'mc', q:'M2 · Dentro de un método, <code>this</code> apunta a…', options:['la clase','el objeto que llamó al método','window siempre','un callback'], correct:1, pts:10, explain:'c1.voltear() → this es c1. Cada instancia cuida su propio estado.'},
    {type:'mc', q:'M2 · ¿Cuál es una arrow function válida que duplica n?', options:['const f = n => n * 2;','const f = n { return n * 2 };','arrow n * 2','const f => (n) * 2;'], correct:0, pts:10, explain:'Un parámetro sin paréntesis + expresión sin llaves ni return.'},
    {type:'fill', q:'M2 · Operador que copia propiedades de un objeto en otro nuevo: <code>{ ...carta }</code>:', accept:['...','spread'], re:'^\\s*\\.{3}\\s*$', show:'... (spread)', pts:10, hint:'Tres puntos.'},
    {type:'mc', q:'M2 · La función que pasas a <code>setTimeout</code> se llama…', options:['constructor','callback','getter','método privado'], correct:1, pts:10, explain:'Se la entregas al navegador para que la llame cuando toque: función de primera clase en acción.'},
    {type:'mc', q:'M2 · Para contar cartas encontradas:', options:['mazo.push().length','mazo.filter(c => c.encontrada).length','mazo.find(c => c.encontrada)','mazo.forEach(c => c.encontrada)'], correct:1, pts:10, explain:'filter + length: el patrón estándar de conteo condicional.'},
    /* ---- Módulo 3: Clases y POO ---- */
    {type:'mc', q:'M3 · ¿Qué pilar protege los datos del objeto para que solo cambien por sus métodos?', options:['Abstracción','Encapsulamiento','Herencia','Polimorfismo'], correct:1, pts:10, explain:'Encapsulamiento: campos privados (#) + getters/setters/métodos como única puerta.'},
    {type:'mc', q:'M3 · Modelar solo lo esencial (Carta: emoji y estado) es el pilar de…', options:['herencia','abstracción','polimorfismo','encapsulamiento'], correct:1, pts:10, explain:'Abstracción: decidir qué importa y esconder el detalle irrelevante.'},
    {type:'mc', q:'M3 · <code>class Comodin extends Carta</code> significa que…', options:['Comodin reemplaza a Carta','Comodin hereda propiedades y métodos de Carta','Carta se vuelve privada','son la misma clase'], correct:1, pts:10, explain:'extends crea la relación padre→hija: la hija recibe todo del padre y agrega lo suyo.'},
    {type:'fill', q:'M3 · Palabra clave que llama al constructor de la clase padre:', accept:['super'], re:'^\\s*super\\s*$', show:'super(emoji)', pts:10, hint:'Va primero en el constructor de la hija.'},
    {type:'mc', q:'M3 · Definir <code>descripcion()</code> en la hija con otro comportamiento que en el padre es…', options:['herencia','sobrescribir métodos: polimorfismo','encapsulamiento','un error de sintaxis'], correct:1, pts:10, explain:'Mismo mensaje, respuesta distinta según la clase real: polimorfismo.'},
    {type:'mc', q:'M3 · <code>new Carta("👻")</code>…', options:['ejecuta el constructor y devuelve una instancia','renombra la clase','borra el prototipo','devuelve un string'], correct:0, pts:10, explain:'new fabrica el objeto, corre el constructor con this apuntando a él y lo devuelve.'},
    {type:'mc', q:'M3 · ¿Por qué usar <code>#bloqueado</code> en JuegoMemoria?', options:['Por estilo','Para que solo los métodos de la clase cambien el estado del turno (encapsulamiento)','Porque JS exige un bloqueado','Para ahorrar RAM'], correct:1, pts:10, explain:'El estado crítico es privado: nadie desde fuera puede “desbloquear” a traición el tablero.'},
    /* ---- Módulo 4: DOM y eventos ---- */
    {type:'mc', q:'M4 · <code>div.dataset.id = 3</code> crea el atributo…', options:['id="3"','data-id="3"','class="3"','name="3"'], correct:1, pts:10, explain:'dataset.x ↔ data-x: el puente oficial entre DOM y datos.'},
    {type:'mc', q:'M4 · <code>el.dataset.id</code> devuelve "3" (texto). Para compararlo con un id numérico usas…', options:['==="3"','Number(el.dataset.id)','parseInt solo si es par','no se puede'], correct:1, pts:10, explain:'Los atributos son strings; convierte antes de comparar con === o tendrás bugs silenciosos.'},
    {type:'mc', q:'M4 · La delegación de eventos funciona gracias al…', options:['localStorage','bubbling: el evento sube desde el target por sus ancestros','CSS grid','setTimeout'], correct:1, pts:10, explain:'Un listener en el contenedor captura los clics de todas las cartas, presentes y futuras.'},
    {type:'mc', q:'M4 · <code>evento.target.closest(".carta")</code> devuelve…', options:['siempre null','el ancestro .carta más cercano desde el punto del clic (o null si no hay)','la primera carta del mazo','un template string'], correct:1, pts:10, explain:'Es la forma robusta de saber “a qué carta le dieron” aunque el clic caiga en un hijo.'},
    {type:'fill', q:'M4 · Contenedor invisible para armar muchas cartas e insertarlas de una sola vez: <code>document.________()</code>:', accept:['createdocumentfragment'], re:'^\\s*create\\s*document\\s*fragment\\s*$', show:'document.createDocumentFragment()', pts:10, hint:'“crear fragmento de documento”…'},
    {type:'mc', q:'M4 · ¿Para qué el retraso (setTimeout) antes de resolver el par?', options:['Para que el jugador vea la segunda carta antes de que se volte','Para cargar el CSS','Es obligatorio','Para barajar de nuevo'], correct:0, pts:10, explain:'UX pura: sin pausa, la carta desaparece antes de verse y el jugador se siente estafado.'},
    /* ---- Módulo 5 y 6: Juego completo y publicación ---- */
    {type:'mc', q:'M5 · ¿Qué combinación produce el volteo 3D de una carta?', options:['display:flex + gap','transform: rotateY(180deg) + perspective + backface-visibility: hidden','position:absolute + z-index','animation-delay'], correct:1, pts:10, explain:'perspective da profundidad, rotateY gira y backface-visibility oculta la cara opuesta.'},
    {type:'mc', q:'M5 · El cronómetro del juego usa setInterval. Al ganar DEBES…', options:['nada, se detiene solo','llamar clearInterval(id) o seguirá corriendo','crear otro interval','borrar el localStorage'], correct:1, pts:10, explain:'Los intervalos viven hasta que los cancelas: el bug clásico del cronómetro que no para.'},
    {type:'mc', q:'M5 · La condición de victoria más limpia es…', options:['intentos === 8','mazo.every(c => c.encontrada)','contar manualmente los clics','un setTimeout de 60 s'], correct:1, pts:10, explain:'every consulta el estado real: imposible desincronizarse.'},
    {type:'fill', q:'M5 · Función que convierte un objeto a texto para guardarlo: <code>JSON.________(récord)</code>:', accept:['stringify'], re:'^\\s*stringify\\s*$', show:'JSON.stringify(récord)', pts:10, hint:'“convertir en cadena”…'},
    {type:'mc', q:'M6 · Para publicar tu juego gratis con HTTPS y despliegue automático:', options:['Render Static Site o GitHub Pages','un servidor casero sin dominio','enviarlo por WhatsApp','imprimirlo'], correct:0, pts:10, explain:'push → deploy: los dos servicios del campus lo hacen gratis y con HTTPS.'},
  ]
};

/* ============================ LIBRO DE TEXTO (JS) ============================ */
const TEXTBOOK = [
  { n:1, emoji:'🔀', short:'Algoritmos del juego', title:'Algoritmos del juego: mezclar, comparar y ganar', time:'15 min', blocks:[
    {t:'p', h:'Tu juego usa tres algoritmos que vale la pena entender “por dentro”. <b>1) Fisher-Yates</b> (mezcla uniforme): cada permutación del mazo tiene probabilidad exacta 1/16! — es la misma idea que usan mazos digitales de casinos y plataformas de cartas. La versión ingenua <code>sort(() => Math.random() - 0.5)</code> está <b>sesgada</b>, porque sort asume un comparador consistente y uno aleatorio viola esa suposición (algunos navegadores incluso pueden comportarse distinto entre ejecuciones).'},
    {t:'code', lang:'js', title:'Fisher-Yates anotado', code:
`function barajar(array) {
  const copia = [...array];                 // 1. no mutar el original
  for (let i = copia.length - 1; i > 0; i--) {  // 2. del final al inicio
    const j = Math.floor(Math.random() * (i + 1)); // 3. j en [0, i]
    [copia[i], copia[j]] = [copia[j], copia[i]];   // 4. intercambio
  }
  return copia;
}
// ¿Por qué j en [0, i] y no [0, n-1]? Porque intercambiar con el
// futuro rompería la uniformidad (variante "naive" sesgada).`},
    {t:'p', h:'<b>2) Búsqueda lineal con find</b>: <code>mazo.find(c => c.id === id)</code> recorre hasta 16 elementos. Para tableros chicos es perfecto. Si tuvieras millones de cartas usarías un <b>Map</b> (diccionario id→carta) con búsqueda O(1). <b>3) Detección de victoria</b>: <code>every</code> corta en el primer false (evaluación de cortocircuito): no recorre más de lo necesario.'},
    {t:'table', head:['Concepto','Notación','En tu juego'], rows:[
      ['Búsqueda lineal','O(n)','find del id en el mazo'],
      ['Mezcla Fisher-Yates','O(n)','barajar()'],
      ['Comparación de par','O(1)','a.emoji === b.emoji'],
      ['Verificación de victoria','O(n) con cortocircuito','every(encontrada)']
    ]},
    {t:'info', title:'📚 Para profundizar', h:'Marijn Haverbeke, <i>Eloquent JavaScript</i>, 4.ª ed. (No Starch Press, 2024; gratuita en eloquentjavascript.net), caps. de estructuras de datos · Aditya Bhargava, <i>Grokking Algorithms</i> (Manning, 2.ª ed. 2024): algoritmos ilustrados para principiantes.'}
  ]},
  { n:2, emoji:'⏱️', short:'Timers y event loop', title:'setTimeout, setInterval y el event loop a fondo', time:'15 min', blocks:[
    {t:'p', h:'Tu cronómetro y la pausa de 700 ms usan <b>timers</b>. Detalle clave: JavaScript es de un solo hilo, así que <code>setTimeout(fn, 700)</code> NO garantiza ejecución exactamente a los 700 ms — garantiza <b>al menos</b> 700 ms. La función entra a una cola y se ejecuta cuando el hilo queda libre. Si tu página está calculando algo pesado, el timer espera.'},
    {t:'code', lang:'js', title:'el orden sorprendente', code:
`console.log('A');
setTimeout(() => console.log('B'), 0);
console.log('C');
// Imprime A, C, B: los timers SIEMPRE esperan a que
// termine el código sincrono, aunque pidan 0 ms.

let id;
function iniciar() { id = setInterval(tic, 1000); }
function detener() { clearInterval(id); }   // pareja inseparable
// Tip: si un timer puede lanzarse dos veces, guarda y limpia antes:
if (id) clearInterval(id); id = setInterval(tic, 1000);`},
    {t:'p', h:'Para animaciones suaves (juegos con movimiento continuo), el estándar no es setInterval sino <b>requestAnimationFrame</b>: sincroniza con el refresco de pantalla (~60 veces por segundo) y se pausa si la pestaña no está visible. Tu Memoria es por turnos, así que transition CSS + setTimeout bastan; para tu próximo arcade, rAF es el camino.'},
    {t:'table', head:['Herramienta','Úsala para','Cuidado'], rows:[
      ['<code>setTimeout</code>','Pausas puntuales (voltear de nuevo)','El tiempo es “mínimo”, no exacto'],
      ['<code>setInterval</code>','Relojes y repetición fija','SIEMPRE limpiar con clearInterval'],
      ['<code>requestAnimationFrame</code>','Animación fluida por fotogramas','Se detiene en pestañas ocultas (bien!)']
    ]},
    {t:'info', title:'📚 Para profundizar', h:'MDN: <i>Concurrency model and the event loop</i> · David Flanagan, <i>JavaScript: The Definitive Guide</i>, 7.ª ed. (O’Reilly, 2020), cap. 13 · Jake Archibald, <i>Tasks, microtasks, queues and schedules</i> (web.dev).'}
  ]},
  { n:3, emoji:'🏛️', short:'POO y estilo de código', title:'POO en JavaScript: clases, prototipos y buen estilo', time:'16 min', blocks:[
    {t:'p', h:'Las clases ES6 son azúcar sobre <b>prototipos</b>: <code>Carta.prototype.voltear</code> existe de verdad y todos los objetos creados con <code>new Carta()</code> delegan en él. Conocer esto te ahorrará confusiones cuando leas código antiguo (<code>function Carta(){...}; Carta.prototype.voltear = ...</code>) y te prepara para preguntas de entrevista.'},
    {t:'code', lang:'js', title:'la misma clase, dos eras', code:
`// Estilo clásico (pre-2015) — lo verás en tutoriales viejos:
function Carta(emoji) {
  this.emoji = emoji;
  this.volteada = false;
}
Carta.prototype.voltear = function () {
  this.volteada = !this.volteada;
};

// Estilo moderno (ES6+) — el que aprendiste:
class Carta {
  constructor(emoji) { this.emoji = emoji; this.volteada = false; }
  voltear() { this.volteada = !this.volteada; }
}
// Ambas crean objetos con el mismo prototipo por debajo.`},
    {t:'h', h:'Checklist de estilo profesional'},
    {t:'list', items:[
      '<b>const por defecto</b>, let solo si la variable cambia; var, nunca más.',
      '<b>Nombres que cuentan</b>: <code>resolverTurno()</code> > <code>func2()</code>. Una función = una responsabilidad.',
      '<b>Inmutabilidad razonable</b>: copia antes de transformar (<code>[...mazo]</code>, <code>{...carta}</code>).',
      '<b>Estado privado</b> (<code>#</code>) para lo interno; interfaz pública mínima.',
      '<b>Separación modelo/UI</b>: la clase decide, el render pinta (lo que hiciste con JuegoMemoria).',
      '<b>Comenta el POR QUÉ</b>, no el qué (el qué ya lo dice el código).'
    ]},
    {t:'info', title:'📚 Para profundizar', h:'Kyle Simpson, <i>You Don’t Know JS Yet: Objects & Classes</i>, 2.ª ed. (O’Reilly/GitHub, 2020, gratuita) · Addy Osmani, <i>Learning JavaScript Design Patterns</i>, 2.ª ed. (O’Reilly, gratuita online) · Eric Elliott, artículos sobre composición vs herencia (Medium/JavaScript Scene).'}
  ]},
  { n:4, emoji:'📚', short:'Bibliografía JS', title:'Bibliografía y recursos de JavaScript', time:'8 min', blocks:[
    {t:'p', h:'Libros reales para continuar (el orden sugerido es el listado):'},
    {t:'table', head:['Obra','Autor · Editorial · Año','Para qué'], rows:[
      ['<i>Eloquent JavaScript</i>, 4.ª ed.','Marijn Haverbeke · No Starch Press · 2024','El mejor siguiente libro: gratis en eloquentjavascript.net, con ejercicios interactivos.'],
      ['<i>JavaScript: The Definitive Guide</i>, 7.ª ed.','David Flanagan · O’Reilly · 2020','La referencia exhaustiva del lenguaje (“la biblia”).'],
      ['<i>You Don’t Know JS Yet</i>, 2.ª ed.','Kyle Simpson · O’Reilly/GitHub · 2020+','Serie gratuita que desarma closures, this, prototipos y clases.'],
      ['<i>JavaScript & jQuery</i>','Jon Duckett · Wiley · 2014','Visual y amable: refuerza DOM y eventos con ilustraciones.'],
      ['<i>Learning JavaScript Design Patterns</i>, 2.ª ed.','Addy Osmani · O’Reilly','Patrones profesionales (módulo, observador, estado…) gratis online.'],
      ['<i>Grokking Algorithms</i>, 2.ª ed.','Aditya Bhargava · Manning · 2024','Algoritmos ilustrados: mezclas, búsquedas, Big-O sin dolor.']
    ]},
    {t:'list', items:[
      '<b>MDN Web Docs</b> — la referencia oficial de cada método de array/objeto/clase.',
      '<b>javascript.info</b> — el tutorial moderno de JS (muy completo, traducido al español).',
      '<b>web.dev/learn/javascript</b> — curso de Google centrado en la plataforma.',
      '<b>Exercism / Codewars</b> — retos de JS para practicar arrays y lógica con evaluación automática.'
    ]},
    {t:'tip', title:'💡 El hábito que acelera todo', h:'Lee UN capítulo de Eloquent JavaScript por semana y reescribe un ejercicio en tu editor del navegador. 12 semanas después programarás con otra confianza. Constancia > intensidad.'}
  ]}
];

/* ============================ PROYECTO FINAL: ARCHIVOS ============================ */
const FINAL_FILES = [
  { name:'index.html', lang:'html', code:
`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Juego de Memoria 🃏</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <main class="contenedor">
    <h1>🃏 Juego de Memoria</h1>
    <p class="sub">Encuentra los 8 pares con el menor número de intentos</p>

    <div class="panel">
      <span>Intentos: <b id="intentos">0</b></span>
      <span>Tiempo: <b id="tiempo">00:00</b></span>
      <span>Récord: <b id="record">—</b></span>
      <select id="nivel" aria-label="Nivel de dificultad">
        <option value="facil">Fácil (6 pares)</option>
        <option value="normal" selected>Normal (8 pares)</option>
        <option value="dificil">Difícil (12 pares)</option>
      </select>
      <button id="reiniciar" class="btn-reiniciar">↺ Reiniciar</button>
    </div>

    <p id="mensaje" aria-live="polite"></p>

    <!-- Las cartas se generan con JavaScript -->
    <div id="tablero" aria-label="Tablero de juego"></div>
  </main>

  <script src="js/game.js"><\/script>
</body>
</html>
`},
  { name:'css/styles.css', lang:'css', code:
`/* ===== Juego de Memoria · estilos ===== */
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: system-ui, -apple-system, sans-serif;
  background: #eef2f7;
  color: #1e293b;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 16px;
}

.contenedor { width: 100%; max-width: 560px; text-align: center; }

h1 { color: #4f46e5; letter-spacing: -0.02em; }
.sub { color: #64748b; font-size: 14px; margin: 4px 0 14px; }

.panel {
  display: flex; flex-wrap: wrap; gap: 10px;
  justify-content: center; align-items: center;
  background: #fff; border: 1px solid #e2e8f0;
  border-radius: 12px; padding: 10px 14px; font-size: 14px;
}

.panel select, .btn-reiniciar {
  border: none; border-radius: 8px; padding: 6px 12px;
  font-size: 13px; cursor: pointer; font-weight: 600;
}
.btn-reiniciar { background: #4f46e5; color: #fff; }
.btn-reiniciar:hover { background: #4338ca; }

#mensaje { min-height: 22px; font-weight: 700; margin: 8px 0; }
#mensaje.ok { color: #16a34a; }
#mensaje.error { color: #dc2626; }

/* ===== El tablero: rejilla 4 columnas ===== */
#tablero {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

/* ===== La carta con volteo 3D ===== */
.carta {
  aspect-ratio: 1 / 1;
  perspective: 800px;
  cursor: pointer;
}

.carta-interior {
  position: relative;
  width: 100%; height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.4s;
}

.carta.volteada .carta-interior { transform: rotateY(180deg); }

.carta-frente, .carta-atras {
  position: absolute;
  width: 100%; height: 100%;
  display: grid; place-items: center;
  border-radius: 12px;
  backface-visibility: hidden;
  font-size: clamp(26px, 8vw, 40px);
  user-select: none;
}

.carta-frente {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #fff;
  font-size: 22px;
}

.carta-atras {
  background: #fff;
  border: 2px solid #e2e8f0;
  transform: rotateY(180deg);
}

.carta.encontrada .carta-atras {
  border-color: #16a34a;
  background: #f0fdf4;
  animation: pulso 0.5s;
}

@keyframes pulso {
  50% { transform: rotateY(180deg) scale(1.1); }
}
`},
  { name:'js/game.js', lang:'js', code:
`// =====================================================
// Juego de Memoria · js/game.js
// Curso: JavaScript y el Juego de Memoria
// Arquitectura: clases Carta/JuegoMemoria (modelo) +
// render y eventos (vista). Estado -> render -> verificar.
// =====================================================

const EMOJIS = ['🎃','👻','🦇','🕷️','🍬','🧙','💀','🕸️','🐲','🍄','🌈','⚡'];
const NIVELES = {
  facil:   { pares: 6,  columnas: 4 },
  normal:  { pares: 8,  columnas: 4 },
  dificil: { pares: 12, columnas: 6 }
};
const CLAVE_RECORD = 'memoria-record-v1';

// ============ Modelo: la carta ============
class Carta {
  #emoji;
  #volteada = false;
  #encontrada = false;

  constructor(id, emoji) {
    this.id = id;
    this.#emoji = emoji;
  }

  get emoji() { return this.#emoji; }
  get volteada() { return this.#volteada; }
  get encontrada() { return this.#encontrada; }

  voltear() { this.#volteada = !this.#volteada; }
  revelar() { this.#volteada = true; this.#encontrada = true; }
  ocultar() { this.#volteada = false; }
}

// ============ Modelo: el juego ============
class JuegoMemoria {
  #mazo = [];
  #primera = null;
  #segunda = null;
  #bloqueado = false;
  #intentos = 0;

  constructor(emojis) { this.#mazo = this.#crearMazo(emojis); }

  get mazo() { return this.#mazo; }
  get intentos() { return this.#intentos; }

  #crearMazo(emojis) {
    const duplicados = [...emojis, ...emojis];
    // Fisher-Yates: mezcla uniforme
    for (let i = duplicados.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [duplicados[i], duplicados[j]] = [duplicados[j], duplicados[i]];
    }
    return duplicados.map((emoji, i) => new Carta(i, emoji));
  }

  // Devuelve: 'invalida' | 'bloqueado' | 'primera' | 'segunda'
  voltearCarta(id) {
    if (this.#bloqueado) return 'bloqueado';
    const carta = this.#mazo.find(c => c.id === id);
    if (!carta || carta.volteada || carta.encontrada) return 'invalida';

    carta.voltear();
    if (!this.#primera) {
      this.#primera = carta;
      return 'primera';
    }
    this.#segunda = carta;
    this.#intentos++;
    this.#bloqueado = true;
    return 'segunda';
  }

  // Resuelve el par. Devuelve true si fue acierto.
  resolver() {
    const a = this.#primera, b = this.#segunda;
    const acierto = !!(a && b && a.emoji === b.emoji);
    if (acierto) { a.revelar(); b.revelar(); }
    else { a.ocultar(); b.ocultar(); }
    this.#primera = null;
    this.#segunda = null;
    this.#bloqueado = false;
    return acierto;
  }

  estaResuelto() {
    return this.#mazo.every(c => c.encontrada);
  }
}

// ============ Vista: render y eventos ============
const tablero  = document.getElementById('tablero');
const elIntent = document.getElementById('intentos');
const elTiempo = document.getElementById('tiempo');
const elRecord = document.getElementById('record');
const elMensaje = document.getElementById('mensaje');

let juego = null;
let segundos = 0;
let idCronometro = null;

function renderizar() {
  tablero.innerHTML = '';
  const frag = document.createDocumentFragment();
  juego.mazo.forEach(carta => {
    const div = document.createElement('div');
    div.className = 'carta'
      + (carta.volteada || carta.encontrada ? ' volteada' : '')
      + (carta.encontrada ? ' encontrada' : '');
    div.dataset.id = carta.id;
    div.innerHTML = '<div class="carta-interior">'
      + '<div class="carta-frente">🎴</div>'
      + '<div class="carta-atras">' + carta.emoji + '</div></div>';
    frag.appendChild(div);
  });
  tablero.appendChild(frag);
  elIntent.textContent = juego.intentos;
}

// ===== Delegación de eventos: UN listener para todo =====
tablero.addEventListener('click', function (evento) {
  const el = evento.target.closest('.carta');
  if (!el) return;

  const resultado = juego.voltearCarta(Number(el.dataset.id));
  if (resultado === 'invalida' || resultado === 'bloqueado') return;

  renderizar();

  if (resultado === 'segunda') {
    setTimeout(function () {
      const acierto = juego.resolver();
      renderizar();
      mostrarMensaje(acierto ? '¡Par! 🎯' : 'Casi…', acierto ? 'ok' : 'error');
      if (juego.estaResuelto()) celebrar();
    }, 700);
  }
});

// ===== Cronómetro =====
function iniciarCronometro() {
  detenerCronometro();
  segundos = 0;
  elTiempo.textContent = '00:00';
  idCronometro = setInterval(function () {
    segundos++;
    const min = String(Math.floor(segundos / 60)).padStart(2, '0');
    const seg = String(segundos % 60).padStart(2, '0');
    elTiempo.textContent = min + ':' + seg;
  }, 1000);
}
function detenerCronometro() {
  if (idCronometro) { clearInterval(idCronometro); idCronometro = null; }
}

// ===== Récords con localStorage =====
function obtenerRecord() {
  try {
    const datos = localStorage.getItem(CLAVE_RECORD);
    return datos ? JSON.parse(datos) : null;
  } catch (e) { return null; }
}
function guardarRecord(intentos, segundos) {
  const actual = obtenerRecord();
  const mejor = !actual
    || intentos < actual.intentos
    || (intentos === actual.intentos && segundos < actual.segundos);
  if (mejor) {
    try {
      localStorage.setItem(CLAVE_RECORD, JSON.stringify({
        intentos: intentos, segundos: segundos,
        fecha: new Date().toLocaleDateString('es-MX')
      }));
    } catch (e) { /* storage lleno o bloqueado */ }
  }
  return mejor;
}
function mostrarRecord() {
  const r = obtenerRecord();
  elRecord.textContent = r ? r.intentos + ' intentos' : '—';
}

// ===== Mensajes y victoria =====
let idMensaje = null;
function mostrarMensaje(texto, tipo) {
  clearTimeout(idMensaje);
  elMensaje.textContent = texto;
  elMensaje.className = tipo || '';
  idMensaje = setTimeout(function () {
    elMensaje.textContent = ''; elMensaje.className = '';
  }, 1200);
}

function celebrar() {
  detenerCronometro();
  const recordPrevio = obtenerRecord();
  const esRecord = guardarRecord(juego.intentos, segundos);
  mostrarRecord();
  mostrarMensaje(
    (esRecord ? '🎉 ¡Nuevo récord! ' : '🎉 ¡Ganaste! ')
    + juego.intentos + ' intentos · ' + elTiempo.textContent
    + (recordPrevio && !esRecord ? ' (récord: ' + recordPrevio.intentos + ')' : ''),
    'ok'
  );
}

// ===== Nuevo juego / reinicio =====
function nuevoJuego(nivel) {
  const config = NIVELES[nivel] || NIVELES.normal;
  tablero.style.gridTemplateColumns = 'repeat(' + config.columnas + ', 1fr)';
  juego = new JuegoMemoria(EMOJIS.slice(0, config.pares));
  detenerCronometro();
  iniciarCronometro();
  elMensaje.textContent = '';
  renderizar();
}

document.getElementById('reiniciar').addEventListener('click', function () {
  nuevoJuego(document.getElementById('nivel').value);
});
document.getElementById('nivel').addEventListener('change', function (e) {
  nuevoJuego(e.target.value);
});

// ===== Arranque =====
mostrarRecord();
nuevoJuego('normal');
`},
  { name:'README.md', lang:'txt', code:
`# 🃏 Juego de Memoria

Proyecto final del curso "JavaScript y el Juego de Memoria" (CodeCamp).

## Cómo jugar
- Voltea 2 cartas por turno (clic o toque).
- Los pares iguales quedan descubiertos.
- Gana quien encuentre los 8 pares con menos intentos.
- 3 niveles de dificultad y récord guardado en tu navegador.

## Ejecutar
- Doble clic en index.html, o
- npx serve .   (recomendado)

## Publicar
- GitHub Pages: Settings -> Pages -> main -> Save
- Render: Static Site -> Publish Directory "."

## Conceptos aplicados
Arrays · objetos · arrow functions · callbacks · clases y POO
(los 4 pilares) · Fisher-Yates · DOM por lotes (DocumentFragment) ·
delegación de eventos · dataset · setTimeout/setInterval · localStorage.
`}
];

/* Demo del juego final (todo en un archivo para la vista previa) */
const FINAL_DEMO = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Juego de Memoria — Proyecto Final</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,Segoe UI,sans-serif;background:#eef2f7;color:#1e293b;min-height:100vh;display:grid;place-items:center;padding:14px}
.contenedor{width:100%;max-width:540px;text-align:center}
h1{color:#4f46e5;font-size:26px;letter-spacing:-.02em}
.sub{color:#64748b;font-size:13px;margin:4px 0 12px}
.panel{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:9px 13px;font-size:13.5px}
.panel select,.btn-reiniciar{border:none;border-radius:8px;padding:6px 11px;font-size:12.5px;cursor:pointer;font-weight:600}
.btn-reiniciar{background:#4f46e5;color:#fff}
#mensaje{min-height:20px;font-weight:700;margin:8px 0;font-size:14px}
#mensaje.ok{color:#16a34a}#mensaje.error{color:#dc2626}
#tablero{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}
.carta{aspect-ratio:1/1;perspective:800px;cursor:pointer}
.carta-interior{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .4s}
.carta.volteada .carta-interior{transform:rotateY(180deg)}
.carta-frente,.carta-atras{position:absolute;width:100%;height:100%;display:grid;place-items:center;border-radius:11px;backface-visibility:hidden;font-size:clamp(24px,7vw,36px);user-select:none}
.carta-frente{background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;font-size:20px}
.carta-atras{background:#fff;border:2px solid #e2e8f0;transform:rotateY(180deg)}
.carta.encontrada .carta-atras{border-color:#16a34a;background:#f0fdf4;animation:pulso .5s}
@keyframes pulso{50%{transform:rotateY(180deg) scale(1.1)}}
</style>
</head>
<body>
<div class="contenedor">
  <h1>🃏 Juego de Memoria</h1>
  <p class="sub">Proyecto final · encuentra los pares con menos intentos</p>
  <div class="panel">
    <span>Intentos: <b id="intentos">0</b></span>
    <span>Tiempo: <b id="tiempo">00:00</b></span>
    <span>Récord: <b id="record">—</b></span>
    <select id="nivel" aria-label="Dificultad">
      <option value="facil">Fácil (6 pares)</option>
      <option value="normal" selected>Normal (8 pares)</option>
      <option value="dificil">Difícil (12 pares)</option>
    </select>
    <button class="btn-reiniciar" id="reiniciar">↺ Reiniciar</button>
  </div>
  <p id="mensaje" aria-live="polite"></p>
  <div id="tablero" aria-label="Tablero de juego"></div>
</div>
<script>
(function(){
  var EMOJIS = ['🎃','👻','🦇','🕷️','🍬','🧙','💀','🕸️','🐲','🍄','🌈','⚡'];
  var NIVELES = { facil:{pares:6,columnas:4}, normal:{pares:8,columnas:4}, dificil:{pares:12,columnas:6} };
  var CLAVE_RECORD = 'memoria-record-v1';

  var db;
  try { localStorage.setItem('__t','1'); localStorage.removeItem('__t'); db = localStorage; }
  catch (e) { var mem = {}; db = { setItem:function(k,v){mem[k]=String(v);}, getItem:function(k){return (k in mem)?mem[k]:null;} }; }

  class Carta {
    #emoji; #volteada = false; #encontrada = false;
    constructor(id, emoji){ this.id = id; this.#emoji = emoji; }
    get emoji(){ return this.#emoji; }
    get volteada(){ return this.#volteada; }
    get encontrada(){ return this.#encontrada; }
    voltear(){ this.#volteada = !this.#volteada; }
    revelar(){ this.#volteada = true; this.#encontrada = true; }
    ocultar(){ this.#volteada = false; }
  }

  class JuegoMemoria {
    #mazo = []; #primera = null; #segunda = null; #bloqueado = false; #intentos = 0;
    constructor(emojis){ this.#mazo = this.#crearMazo(emojis); }
    get mazo(){ return this.#mazo; }
    get intentos(){ return this.#intentos; }
    #crearMazo(emojis){
      var dup = emojis.slice();
      dup = dup.concat(dup);
      for (var i = dup.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = dup[i]; dup[i] = dup[j]; dup[j] = t;
      }
      return dup.map(function(e, i){ return new Carta(i, e); });
    }
    voltearCarta(id){
      if (this.#bloqueado) return 'bloqueado';
      var carta = null;
      for (var k = 0; k < this.#mazo.length; k++) { if (this.#mazo[k].id === id) { carta = this.#mazo[k]; break; } }
      if (!carta || carta.volteada || carta.encontrada) return 'invalida';
      carta.voltear();
      if (!this.#primera) { this.#primera = carta; return 'primera'; }
      this.#segunda = carta; this.#intentos++; this.#bloqueado = true;
      return 'segunda';
    }
    resolver(){
      var a = this.#primera, b = this.#segunda;
      var acierto = !!(a && b && a.emoji === b.emoji);
      if (acierto) { a.revelar(); b.revelar(); } else { a.ocultar(); b.ocultar(); }
      this.#primera = null; this.#segunda = null; this.#bloqueado = false;
      return acierto;
    }
    estaResuelto(){
      return this.#mazo.every(function(c){ return c.encontrada; });
    }
  }

  var tablero = document.getElementById('tablero');
  var elIntent = document.getElementById('intentos');
  var elTiempo = document.getElementById('tiempo');
  var elRecord = document.getElementById('record');
  var elMensaje = document.getElementById('mensaje');
  var juego = null, segundos = 0, idCron = null, idMsg = null;

  function renderizar(){
    tablero.innerHTML = '';
    var frag = document.createDocumentFragment();
    juego.mazo.forEach(function(carta){
      var div = document.createElement('div');
      div.className = 'carta' + ((carta.volteada || carta.encontrada) ? ' volteada' : '') + (carta.encontrada ? ' encontrada' : '');
      div.dataset.id = carta.id;
      div.innerHTML = '<div class="carta-interior"><div class="carta-frente">🎴</div><div class="carta-atras">' + carta.emoji + '</div></div>';
      frag.appendChild(div);
    });
    tablero.appendChild(frag);
    elIntent.textContent = juego.intentos;
  }

  tablero.addEventListener('click', function(evento){
    var el = evento.target.closest('.carta');
    if (!el) return;
    var resultado = juego.voltearCarta(Number(el.dataset.id));
    if (resultado === 'invalida' || resultado === 'bloqueado') return;
    renderizar();
    if (resultado === 'segunda') {
      setTimeout(function(){
        var acierto = juego.resolver();
        renderizar();
        mostrarMensaje(acierto ? '¡Par! 🎯' : 'Casi…', acierto ? 'ok' : 'error');
        if (juego.estaResuelto()) celebrar();
      }, 700);
    }
  });

  function iniciarCronometro(){
    detenerCronometro();
    segundos = 0; elTiempo.textContent = '00:00';
    idCron = setInterval(function(){
      segundos++;
      var min = String(Math.floor(segundos/60)).padStart(2,'0');
      var seg = String(segundos % 60).padStart(2,'0');
      elTiempo.textContent = min + ':' + seg;
    }, 1000);
  }
  function detenerCronometro(){ if (idCron) { clearInterval(idCron); idCron = null; } }

  function obtenerRecord(){
    try { var d = db.getItem(CLAVE_RECORD); return d ? JSON.parse(d) : null; }
    catch (e) { return null; }
  }
  function guardarRecord(intentos, segs){
    var actual = obtenerRecord();
    var mejor = !actual || intentos < actual.intentos || (intentos === actual.intentos && segs < actual.segundos);
    if (mejor) { try { db.setItem(CLAVE_RECORD, JSON.stringify({ intentos:intentos, segundos:segs })); } catch(e){} }
    return mejor;
  }
  function mostrarRecord(){
    var r = obtenerRecord();
    elRecord.textContent = r ? (r.intentos + ' intentos') : '—';
  }

  function mostrarMensaje(texto, tipo){
    if (idMsg) clearTimeout(idMsg);
    elMensaje.textContent = texto; elMensaje.className = tipo || '';
    idMsg = setTimeout(function(){ elMensaje.textContent = ''; elMensaje.className = ''; }, 1500);
  }

  function celebrar(){
    detenerCronometro();
    var previo = obtenerRecord();
    var esRecord = guardarRecord(juego.intentos, segundos);
    mostrarRecord();
    mostrarMensaje((esRecord ? '🎉 ¡Nuevo récord! ' : '🎉 ¡Ganaste! ') + juego.intentos + ' intentos · ' + elTiempo.textContent, 'ok');
  }

  function nuevoJuego(nivel){
    var config = NIVELES[nivel] || NIVELES.normal;
    tablero.style.gridTemplateColumns = 'repeat(' + config.columnas + ', 1fr)';
    juego = new JuegoMemoria(EMOJIS.slice(0, config.pares));
    detenerCronometro(); iniciarCronometro();
    elMensaje.textContent = '';
    renderizar();
  }

  document.getElementById('reiniciar').addEventListener('click', function(){
    nuevoJuego(document.getElementById('nivel').value);
  });
  document.getElementById('nivel').addEventListener('change', function(e){
    nuevoJuego(e.target.value);
  });

  mostrarRecord();
  nuevoJuego('normal');
})();
<\/script>
</body>
</html>`;
