/* ============================ MÓDULO 5: PROYECTO FINAL ============================ */
MODULES.push({
  id:'m5', emoji:'🃏', name:'El juego completo', color:'#16a34a',
  desc:'CSS 3D, el código completo, cronómetro, dificultad y récords con localStorage.',
  lessons:[

  /* -------- 5.1 -------- */
  { id:'5-1', title:'CSS del tablero: rejilla y volteo 3D', time:'15 min', blocks:[
    {t:'p', h:'El secreto visual del Memoria es el <b>volteo</b>: la carta gira sobre su eje Y mostrando el símbolo. En CSS eso se logra con tres técnicas combinadas: <b>rejilla</b> para el tablero, <b>perspective</b> para el espacio 3D y <b>backface-visibility</b> para las dos caras de la carta. Verás que el “truco de magia” es pura geometría.'},
    {t:'code', lang:'css', title:'el tablero (rejilla CSS)', code:
`#tablero {
  display: grid;
  grid-template-columns: repeat(4, 1fr);   /* 4 columnas iguales */
  gap: 10px;                               /* separación entre cartas */
  max-width: 420px;
  margin: 0 auto;
}

.carta {
  aspect-ratio: 1 / 1;          /* cuadradas aunque cambie el ancho */
  perspective: 800px;           /* profundidad 3D para el giro */
  cursor: pointer;
}`},
    {t:'code', lang:'css', title:'el volteo 3D (la magia ✨)', code:
`.carta-interior {
  position: relative;
  width: 100%; height: 100%;
  transform-style: preserve-3d;        /* respeta el espacio 3D */
  transition: transform 0.4s;          /* el giro se anima solo */
}

.carta.volteada .carta-interior {
  transform: rotateY(180deg);          /* ¡el volteo! */
}

.carta-frente, .carta-atras {
  position: absolute;
  width: 100%; height: 100%;
  display: grid; place-items: center;
  border-radius: 12px;
  backface-visibility: hidden;         /* cada cara se oculta al girar */
  font-size: 34px;
}

.carta-frente {                        /* el reverso "con dibujo" */
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #fff;
}

.carta-atras {                         /* el símbolo */
  background: #fff;
  border: 2px solid #e2e8f0;
  transform: rotateY(180deg);          /* vive volteada de fábrica */
}

.carta.encontrada .carta-interior {
  animation: pulso 0.5s;               /* mini celebración */
}
@keyframes pulso { 50% { transform: rotateY(180deg) scale(1.08); } }`},
    {t:'table', head:['Propiedad','Papel en el truco'], rows:[
      ['<code>perspective</code>','Da profundidad: el giro se ve 3D, no plano.'],
      ['<code>transform-style: preserve-3d</code>','Los hijos viven en el mismo espacio 3D que el padre.'],
      ['<code>transition: transform</code>','El navegador interpola el giro: animación gratis.'],
      ['<code>backface-visibility: hidden</code>','Cada cara desaparece cuando le da la espalda al espectador.'],
      ['<code>aspect-ratio</code>','Cartas siempre cuadradas, sin calcular alturas.']
    ]},
    {t:'info', title:'🔑 ¿Y el grid responsive?', h:'Con <code>repeat(4, 1fr)</code> las 4 columnas se reparten el ancho disponible. El <code>aspect-ratio: 1/1</code> mantiene las cartas cuadradas en cualquier pantalla. Para el modo difícil 6 columnas basta cambiar una sola propiedad por JS: <code>tablero.style.gridTemplateColumns = "repeat(6, 1fr)"</code> (lo haremos en la lección 5.3).'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué propiedad hace que la carta gire con efecto 3D?', options:['backface-visibility','transform: rotateY(180deg) con perspective en el padre','display: grid','animation: pulso'], correct:1, pts:10, explain:'rotateY gira en el eje vertical y perspective le da la profundidad; las otras acompañan.'},
      {type:'mc', q:'<code>backface-visibility: hidden</code> sirve para…', options:['ocultar el tablero','que cada cara de la carta se esconda cuando le da la espalda','hacer sombra','acelerar el juego'], correct:1, pts:10, explain:'Sin ella verías el símbolo “atravesar” la carta durante el giro.'},
      {type:'mc', q:'<code>grid-template-columns: repeat(4, 1fr)</code> significa…', options:['4 filas','4 columnas del mismo ancho','columnas de 1 pixel','un solo elemento'], correct:1, pts:10, explain:'repeat(4, 1fr) = 4 fracciones iguales del espacio: la rejilla del tablero.'},
      {type:'fill', q:'Propiedad CSS que mantiene las cartas cuadradas automáticamente:', accept:['aspect-ratio'], re:'^\\s*aspect[- ]?ratio\\s*$', show:'aspect-ratio: 1 / 1;', pts:10, hint:'“proporción” en inglés…'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 17 · Monta el volteo 3D',
      sub:'Editor con carta real de dos caras. Completa el CSS que falta: preserve-3d, transición, rotateY al voltear y backface-visibility. ▶ Ejecuta y HAZ CLIC en la carta para ver tu animación; luego califica.',
      file:'ejercicio-17.html', height:360,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 17</title>
<style>
  body { font-family: system-ui; display: grid; place-items: center;
         min-height: 90vh; background: #eef2f7; }
  .carta { width: 140px; height: 140px; perspective: 800px; cursor: pointer; }

  /* TODO 1: .carta-interior con position:relative, 100% de ancho y alto,
     transform-style: preserve-3d y transition de transform 0.4s */
  .carta-interior {
    ...
  }

  /* TODO 2: .carta.volteada .carta-interior { transform: rotateY(180deg) } */
  ...

  .cara {
    position: absolute; width: 100%; height: 100%;
    display: grid; place-items: center;
    border-radius: 14px; font-size: 60px;
  }
  .frente { background: linear-gradient(135deg, #4f46e5, #7c3aed); color: #fff; }
  .atras { background: #fff; border: 2px solid #e2e8f0; transform: rotateY(180deg); }

  /* TODO 3: backface-visibility: hidden para AMBAS caras (.cara) */
  ...
</style>
</head>
<body>
  <div class="carta" id="carta" onclick="this.classList.toggle('volteada')">
    <div class="carta-interior">
      <div class="cara frente">🎴</div>
      <div class="cara atras">👻</div>
    </div>
  </div>
</body>
</html>
`,
      checks:[
        {label:'<code>transform-style: preserve-3d</code> en el interior', re:'transform-style\\s*:\\s*preserve-3d', pts:20},
        {label:'<code>transition</code> de transform (0.4s aprox.)', re:'transition\\s*:[^;]*transform', pts:20},
        {label:'El volteo: <code>rotateY(180deg)</code> al agregar .volteada', re:'volteada[\\s\\S]{0,80}rotateY\\s*\\(\\s*180\\s*deg\\s*\\)|rotateY\\s*\\(\\s*180\\s*deg\\s*\\)', pts:20},
        {label:'<code>backface-visibility: hidden</code> en las caras', re:'backface-visibility\\s*:\\s*hidden', pts:20},
        {label:'La cara trasera nace girada (<code>.atras</code> con rotateY)', re:'atras[\\s\\S]{0,120}rotateY', pts:20}
      ]}
  ]},

  /* -------- 5.2 -------- */
  { id:'5-2', title:'El código completo del juego 🏆', time:'20 min', blocks:[
    {t:'p', h:'Momento de ensamblar todo. El proyecto final tiene 3 archivos: <code>index.html</code> (la estructura), <code>css/styles.css</code> (el look y el volteo 3D) y <code>js/game.js</code> (las clases <code>Carta</code> y <code>JuegoMemoria</code> + el render y los eventos). El código completo, comentado y listo para copiar, está en la página <b>📦 Proyecto final</b> del menú lateral. Aquí, la arquitectura y las partes clave — fíjate en cómo cada pieza proviene de una lección:'},
    {t:'code', lang:'js', title:'js/game.js — la estructura general', code:
`const EMOJIS = ['🎃','👻','🦇','🕷️','🍬','🧙','💀','🕸️'];

class Carta { /* Módulo 3: estado privado + voltear() + revelar() */ }

class JuegoMemoria {
  #mazo = []; #primera = null; #segunda = null;
  #bloqueado = false; #intentos = 0;

  constructor(emojis) { this.#mazo = this.#crearMazo(emojis); }

  #crearMazo(emojis) {
    const duplicados = [...emojis, ...emojis];
    for (let i = duplicados.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [duplicados[i], duplicados[j]] = [duplicados[j], duplicados[i]];
    }
    return duplicados.map((e, i) => new Carta(i, e));
  }

  get mazo() { return this.#mazo; }
  get intentos() { return this.#intentos; }

  voltearCarta(id) {
    if (this.#bloqueado) return 'bloqueado';
    const carta = this.#mazo.find(c => c.id === id);
    if (!carta || carta.volteada || carta.encontrada) return 'invalida';
    carta.voltear();
    if (!this.#primera) { this.#primera = carta; return 'primera'; }
    this.#segunda = carta;
    this.#intentos++;
    this.#bloqueado = true;
    return 'segunda';
  }

  resolver() {
    const a = this.#primera, b = this.#segunda;
    const acierto = a && b && a.emoji === b.emoji;
    if (acierto) { a.revelar(); b.revelar(); }
    else { a.voltear(); b.voltear(); }
    this.#primera = null; this.#segunda = null; this.#bloqueado = false;
    return acierto;
  }

  estaResuelto() { return this.#mazo.every(c => c.encontrada); }
}`},
    {t:'code', lang:'js', title:'js/game.js — render y eventos (delegación)', code:
`const juego = new JuegoMemoria(EMOJIS);
const tablero = document.getElementById('tablero');

function renderizar() {
  tablero.innerHTML = '';
  const frag = document.createDocumentFragment();
  juego.mazo.forEach(carta => {
    const div = document.createElement('div');
    div.className = 'carta' + (carta.volteada || carta.encontrada ? ' volteada' : '')
                  + (carta.encontrada ? ' encontrada' : '');
    div.dataset.id = carta.id;
    div.innerHTML = '<div class="carta-interior">'
                  + '<div class="carta-frente">🎴</div>'
                  + '<div class="carta-atras">' + carta.emoji + '</div></div>';
    frag.appendChild(div);
  });
  tablero.appendChild(frag);
}

tablero.addEventListener('click', evento => {
  const el = evento.target.closest('.carta');
  if (!el) return;
  const resultado = juego.voltearCarta(Number(el.dataset.id));
  if (resultado === 'invalida' || resultado === 'bloqueado') return;
  renderizar();
  if (resultado === 'segunda') {
    setTimeout(() => {
      const acierto = juego.resolver();
      renderizar();
      if (juego.estaResuelto()) celebrar();
    }, 700);
  }
});

renderizar();`},
    {t:'h', h:'El ciclo completo de un clic'},
    {t:'steps', items:[
      'Clic en una carta → el listener delegado la identifica (<code>closest</code> + <code>dataset</code>).',
      '<code>voltearCarta(id)</code> valida las reglas y actualiza EL ESTADO (clases Carta).',
      '<code>renderizar()</code> refleja el nuevo estado en el DOM (fragmento por lotes).',
      'Si fue la segunda carta: 700 ms de pausa → <code>resolver()</code> compara → render otra vez.',
      'Si <code>estaResuelto()</code> → celebración + récord (lección 5.4).'
    ]},
    {t:'milestone', title:'🏆 PROYECTO COMPLETADO', h:'▶ Ve a <b>📦 Proyecto final</b> (menú lateral), copia los 3 archivos a tu carpeta y ábrelo en tu navegador: es TU juego, con TU código. Cada clase, cada método y cada línea de CSS lo construimos en este curso. Juega unas partidas antes de seguir — te lo ganaste 🎉'},
    {t:'quiz', questions:[
      {type:'mc', q:'En <code>voltearCarta(id)</code>, ¿por qué se devuelven strings como "primera" o "segunda"?', options:['Para ahorrar memoria','Para que el código del render/eventos sepa qué pasó y actúe','Porque los números son lentos','Es obligatorio en las clases'], correct:1, pts:10, explain:'La clase decide (reglas) y reporta; la interfaz (render) reacciona. Separación limpia de responsabilidades.'},
      {type:'mc', q:'¿Por qué se llama <code>renderizar()</code> después de cada movimiento?', options:['Para reiniciar el juego','Para que el DOM refleje el nuevo estado de las cartas','Porque el mazo se baraja','Para guardar el récord'], correct:1, pts:10, explain:'Estado → render: el tablero se redibuja desde el mazo, siempre coherente.'},
      {type:'mc', q:'El retraso de 700 ms antes de resolver el par existe para…', options:['ahorrar batería','que el jugador alcance a ver la segunda carta','cargar el CSS','hacer trampa'], correct:1, pts:10, explain:'Sin pausa, la carta mal emparejada se voltea antes de verse: frustrante. La pausa es UX.'},
      {type:'mc', q:'¿De qué lección salió el patrón del render con DocumentFragment?', options:['Del módulo de DOM (4.1): render por lotes','Del módulo de récords','De Bootstrap','De localStorage'], correct:0, pts:10, explain:'El fragmento agrupa las 16 inserciones en una sola pintura — lección 4.1.'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 18 · Configura tu propio juego',
      sub:'Personaliza el juego: crea el objeto <code>NIVELES</code> con 3 dificultades (pares y columnas) y la función <code>emojisPorNivel(nivel)</code> que recorte el catálogo con slice. ▶ Califica.',
      file:'ejercicio-18.html', height:330,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 18</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12).</p>
  <script>
    const EMOJIS = ['🎃','👻','🦇','🕷️','🍬','🧙','💀','🕸️','🐲','🍄','🌈','⚡'];

    // TODO 1: crea NIVELES con 3 niveles:
    // facil:   { pares: 6,  columnas: 4 }
    // normal:  { pares: 8,  columnas: 4 }
    // dificil: { pares: 12, columnas: 6 }
    const NIVELES = {
      ...
    };

    // TODO 2: emojisPorNivel(nivel) -> busca el nivel en NIVELES
    // y devuelve EMOJIS.slice(0, config.pares)
    function emojisPorNivel(nivel) {
      const config = ...;
      return ...;
    }

    // ===== Pruebas (no tocar) =====
    console.log('Fácil:', emojisPorNivel('facil').length);     // 6
    console.log('Normal:', emojisPorNivel('normal').length);   // 8
    console.log('Difícil:', emojisPorNivel('dificil').length); // 12
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'<code>NIVELES</code> tiene 3 niveles con <code>pares</code> y <code>columnas</code>', re:'NIVELES\\s*=\\s*\\{[\\s\\S]*pares\\s*:[\\s\\S]*columnas\\s*:[\\s\\S]*pares\\s*:', pts:25},
        {label:'El nivel difícil tiene 12 pares y 6 columnas', re:'pares\\s*:\\s*12[\\s\\S]{0,40}columnas\\s*:\\s*6', pts:20},
        {label:'<code>emojisPorNivel</code> busca la config en NIVELES', re:'NIVELES\\s*\\[', pts:20},
        {label:'Recorta el catálogo con <code>slice(0, config.pares)</code>', re:'slice\\s*\\(\\s*0\\s*,\\s*\\w+\\.\\s*pares\\s*\\)|slice\\s*\\(\\s*0\\s*,\\s*config', pts:25}
      ]}
  ]},

  /* -------- 5.3 -------- */
  { id:'5-3', title:'Mejoras: cronómetro, dificultad y mensajes', time:'14 min', blocks:[
    {t:'p', h:'Un buen juego no termina cuando “funciona”: termina cuando se siente bien. Tres mejoras de nivel pro, todas con lo que ya sabes: cronómetro con <code>setInterval</code>, dificultad parametrizada y mensajes que dan vida.'},
    {t:'h', h:'1) Cronómetro con setInterval'},
    {t:'code', lang:'js', title:'cronómetro mm:ss', code:
`let segundos = 0;
let cronometro = null;

function iniciarCronometro() {
  detenerCronometro();            // evita timers duplicados
  segundos = 0;
  cronometro = setInterval(function () {
    segundos++;
    const min = String(Math.floor(segundos / 60)).padStart(2, '0');
    const seg = String(segundos % 60).padStart(2, '0');
    document.getElementById('tiempo').textContent = min + ':' + seg;
  }, 1000);
}

function detenerCronometro() {
  clearInterval(cronometro);   // SIEMPRE detén lo que inicias
}`},
    {t:'info', title:'🔑 setInterval y su pareja clearInterval', h:'<code>setInterval(fn, ms)</code> repite el callback cada ms; <code>clearInterval(id)</code> lo detiene. Regla de oro: guarda el id que devuelve y deténlo cuando corresponda (victoria, reinicio). Un cronómetro que sigue corriendo tras ganar es el bug #1 de los juegos caseros. Y llamar <code>detenerCronometro()</code> ANTES de iniciar uno nuevo evita que dos timers corran a la vez tras reiniciar.'},
    {t:'h', h:'2) Dificultad con parámetros'},
    {t:'code', lang:'js', title:'tablero configurable', code:
`const NIVELES = {
  facil:   { pares: 6, columnas: 4 },   // 3x4
  normal:  { pares: 8, columnas: 4 },   // 4x4  (el clásico)
  dificil: { pares: 12, columnas: 6 }   // 4x6
};

function nuevoJuego(nivel) {
  const config = NIVELES[nivel];
  const emojis = EMOJIS.slice(0, config.pares);
  tablero.style.gridTemplateColumns = 'repeat(' + config.columnas + ', 1fr)';
  juego = new JuegoMemoria(emojis);
  renderizar();
}

// Con select HTML: <select id="nivel"> <option>facil ... </select>
document.getElementById('nivel').addEventListener('change', function (e) {
  nuevoJuego(e.target.value);
});`},
    {t:'h', h:'3) Mensajes que dan vida'},
    {t:'code', lang:'js', title:'feedback inmediato', code:
`function mostrarMensaje(texto, tipo) {
  const el = document.getElementById('mensaje');
  el.textContent = texto;
  el.className = tipo;              // 'ok' | 'error' | ''
  setTimeout(() => { el.textContent = ''; el.className = ''; }, 1200);
}

// Al acertar: mostrarMensaje('¡Par! 🎯', 'ok');
// Al fallar:  mostrarMensaje('Casi…', 'error');`},
    {t:'tip', title:'💡 padStart, el detallista', h:'<code>"5".padStart(2, "0")</code> → <code>"05"</code>. Ideal para relojes y contadores: alineación perfecta sin if/else raros. Y <code>segundos % 60</code> (módulo) da los segundos “dentro del minuto”: 125 s → 2:05.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué función detiene un cronómetro creado con setInterval?', options:['stopInterval()','clearInterval(id)','break','pause()'], correct:1, pts:10, explain:'setInterval devuelve un id; clearInterval(id) cancela la repetición. Sin ello, el timer vive para siempre.'},
      {type:'fill', q:'Método que repite un callback cada N milisegundos:', accept:['setinterval'], re:'^\\s*set\\s*interval\\s*$', show:'setInterval(fn, 1000)', pts:10, hint:'Como setTimeout, pero repetitivo…'},
      {type:'mc', q:'Para un modo difícil de 12 pares, además de duplicar 12 emojis conviene…', options:['no hacer nada','cambiar el grid a 6 columnas y dar más cartas al constructor','borrar el CSS','usar más setTimeout'], correct:1, pts:10, explain:'La dificultad toca dos cosas: cuántas cartas (pares) y cómo se acomodan (columnas del grid).'},
      {type:'mc', q:'<code>125 % 60</code> vale 5. ¿Qué calcula el operador % aquí?', options:['El porcentaje','Los segundos que sobran después de quitar los minutos completos','Una potencia','La mitad'], correct:1, pts:10, explain:'El módulo da el residuo: 125 s = 2 min (120 s) + 5 s. La base de todo reloj mm:ss.'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 19 · Tu cronómetro mm:ss',
      sub:'Implementa el cronómetro del juego: iniciar (con setInterval), tic que formatee mm:ss con padStart, y detener (clearInterval). ▶ Ejecuta y califica.',
      file:'ejercicio-19.html', height:340,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 19</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12). Espera unos 3 segundos.</p>
  <script>
    let segundos = 0;
    let idTimer = null;

    // TODO 1: formatear(s) -> texto mm:ss usando padStart(2, '0')
    // (pista: minutos = Math.floor(s / 60), resto = s % 60)
    function formatear(s) {
      ...
    }

    // TODO 2: iniciar(): resetea segundos a 0, guarda en idTimer un
    // setInterval que SUME 1 segundo y lo imprima, cada 1000 ms
    function iniciar() {
      ...
    }

    // TODO 3: detener(): clearInterval(idTimer)
    function detener() {
      ...
    }

    // ===== Prueba (no tocar) =====
    iniciar();
    setTimeout(function () {
      detener();
      console.log('Detenido en:', formatear(segundos));
    }, 3200);
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'<code>formatear</code> usa <code>padStart(2, "0")</code>', re:'padStart\\s*\\(\\s*2\\s*,\\s*[\'"]0[\'"]\\s*\\)', pts:25},
        {label:'Calcula minutos con <code>Math.floor(s / 60)</code> y resto con <code>% 60</code>', re:'Math\\.\\s*floor[\\s\\S]*%\\s*60|%\\s*60[\\s\\S]*Math\\.\\s*floor', pts:25},
        {label:'<code>iniciar()</code> usa <code>setInterval(..., 1000)</code>', re:'setInterval\\s*\\([\\s\\S]{0,80}1000', pts:25},
        {label:'<code>detener()</code> llama <code>clearInterval(idTimer)</code>', re:'clearInterval\\s*\\(\\s*idTimer\\s*\\)|clearInterval\\s*\\(\\s*cronometro\\s*\\)', pts:25}
      ]}
  ]},

  /* -------- 5.4 -------- */
  { id:'5-4', title:'Récords persistentes con localStorage', time:'13 min', blocks:[
    {t:'p', h:'Ya dominaste localStorage en el curso anterior — aquí lo aplicamos a algo más divertido: la <b>tabla de récords</b> 🥇. Guardaremos el mejor resultado (menos intentos; a igualdad de intentos, menos tiempo). Es el toque que convierte un juguete en un reto.'},
    {t:'code', lang:'js', title:'guardar y leer récords', code:
`const CLAVE_RECORD = 'memoria-record';

function guardarRecord(intentos, segundos) {
  const actual = obtenerRecord();
  const mejor = !actual
    || intentos < actual.intentos
    || (intentos === actual.intentos && segundos < actual.segundos);

  if (mejor) {
    localStorage.setItem(CLAVE_RECORD, JSON.stringify({
      intentos: intentos,
      segundos: segundos,
      fecha: new Date().toLocaleDateString('es-MX')
    }));
  }
  return mejor;   // true si es nuevo récord 🎉
}

function obtenerRecord() {
  try {
    const datos = localStorage.getItem(CLAVE_RECORD);
    return datos ? JSON.parse(datos) : null;
  } catch (e) {
    return null;   // storage bloqueado o texto corrupto: sin récord
  }
}`},
    {t:'code', lang:'js', title:'en la victoria', code:
`function celebrar() {
  detenerCronometro();
  const esRecord = guardarRecord(juego.intentos, segundos);

  document.getElementById('mensaje').textContent = esRecord
    ? '🎉 ¡Nuevo récord: ' + juego.intentos + ' intentos!'
    : '🎉 ¡Ganaste en ' + juego.intentos + ' intentos! (récord: ' + obtenerRecord().intentos + ')';

  mostrarRecord();   // pinta el récord en su <p id="record">
}`},
    {t:'info', title:'🔑 try/catch al leer, siempre', h:'Tres amenazas al leer localStorage: texto corrupto (JSON.parse lanza error), storage bloqueado (modo privado/visores) y datos de otro formato. Un try/catch con fallback a <code>null</code> hace que el juego nunca se rompa: sin récord se juega igual.'},
    {t:'tip', title:'💡 Reto final (opcional)', h:'Agrega una <b>tabla top-3</b>: guarda un array de resultados, <code>push</code> el nuevo, <code>sort</code> por intentos y <code>slice(0, 3)</code>. Ya tienes todas las herramientas. ¿Lo logras? 🚀'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Por qué guardarRecord usa try/catch al LEER el récord anterior?', options:['Por estética','Porque JSON.parse puede fallar (texto corrupto) o el storage estar bloqueado','Porque localStorage es lento','Para ahorrar memoria'], correct:1, pts:10, explain:'Un storage roto no debe romper el juego: catch devuelve null y se juega sin récord.'},
      {type:'mc', q:'El criterio de récord elegido es…', options:['más intentos siempre gana','menos intentos; a igualdad, menos segundos','el más reciente','aleatorio'], correct:1, pts:10, explain:'Ordenar por dificultad real: primero intentos, desempate por tiempo. Definir criterios ES parte de programar.'},
      {type:'fill', q:'Función que convierte el texto guardado de vuelta a objeto:', accept:['json.parse','parse'], re:'^\\s*(json\\.)?parse\\s*$', show:'JSON.parse(datos)', pts:10, hint:'La inversa de JSON.stringify…'},
      {type:'tf', q:'Para guardar un objeto { intentos: 8 } directo con setItem, no hace falta JSON.stringify.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: localStorage solo guarda texto. Sin stringify guardarías "[object Object]" (como aprendiste en el curso 1).'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 20 · La tabla de récords',
      sub:'Implementa <code>esMejorQue(nuevo, actual)</code> (el criterio del récord) y <code>top3(resultados)</code> que ordene y recorte la tabla histórica. ▶ Califica.',
      file:'ejercicio-20.html', height:340,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 20</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12).</p>
  <script>
    // TODO 1: esMejorQue(nuevo, actual):
    //  - true si NO hay record actual (!actual)
    //  - o si nuevo.intentos < actual.intentos
    //  - o si empatan en intentos y nuevo.segundos < actual.segundos
    function esMejorQue(nuevo, actual) {
      ...
    }

    // TODO 2: top3(resultados): copia el array, ordena por
    // intentos ascendente y devuelve solo los primeros 3 (slice)
    function top3(resultados) {
      ...
    }

    // ===== Pruebas (no tocar) =====
    console.log(esMejorQue({ intentos: 8 }, null));                    // true
    console.log(esMejorQue({ intentos: 8 }, { intentos: 10 }));        // true
    console.log(esMejorQue({ intentos: 8 }, { intentos: 8, segundos: 99 })); // depende
    const tabla = [
      { jugador: 'Ana', intentos: 12 }, { jugador: 'Beto', intentos: 8 },
      { jugador: 'Cami', intentos: 15 }, { jugador: 'Dani', intentos: 9 },
      { jugador: 'Eva', intentos: 11 }
    ];
    console.log('Top 3:', top3(tabla));
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'<code>esMejorQue</code> contempla el caso sin récord (<code>!actual</code>)', re:'!\\s*actual', pts:20},
        {label:'Compara <code>intentos</code> a favor del nuevo', re:'intentos\\s*<\\s*\\w+\\.\\s*intentos|\\w+\\.\\s*intentos\\s*>\\s*\\w+\\.\\s*intentos', pts:25},
        {label:'Desempata por <code>segundos</code>', re:'segundos\\s*<', pts:20},
        {label:'<code>top3</code> copia antes de ordenar (<code>[...resultados]</code> o slice)', re:'\\.\\.\\.\\s*resultados|\\.\\s*slice\\s*\\(\\s*\\)', pts:20},
        {label:'<code>top3</code> ordena ascendente y recorta con <code>slice(0, 3)</code>', re:'sort[\\s\\S]{0,80}slice\\s*\\(\\s*0\\s*,\\s*3\\s*\\)', pts:15}
      ]}
  ]}
]});

/* ============================ MÓDULO 6: PUBLICACIÓN Y SIGUIENTE PASO ============================ */
MODULES.push({
  id:'m6', emoji:'🚀', name:'Publica y sigue', color:'#22c55e',
  desc:'Entrega tu juego, publícalo en Render/GitHub Pages y mira el camino que sigue.',
  lessons:[

  /* -------- 6.1 -------- */
  { id:'6-1', title:'Entrega y publicación de tu juego', time:'13 min', blocks:[
    {t:'p', h:'Tu juego merece internet. El procedimiento es el mismo que ya dominaste del curso anterior — aquí va la checklist de entrega 📋, pensada también para entregarlo en clase:'},
    {t:'steps', items:[
      'Tu carpeta debe contener: <code>index.html</code>, <code>css/styles.css</code>, <code>js/game.js</code> (y opcionalmente manifest/sw.js si la haces PWA).',
      'Repositorio en GitHub: <code>git init</code> → <code>git add .</code> → <code>git commit -m "Juego de Memoria v1"</code> → <code>git push</code> (lección 6.2 del curso 1).',
      'Publica: GitHub Pages (Settings → Pages) o Render (Static Site, Publish Directory <code>.</code>) — el <code>render.yaml</code> del curso 1 sirve igual.',
      'Prueba la versión publicada en tu CELULAR: el tablero debe verse bien (grid + aspect-ratio te lo regalan).',
      'Comparte el enlace con alguien y observa cómo juega: la retroalimentación real vale oro.'
    ]},
    {t:'table', head:['Criterio de entrega','¿Cómo se ve “aprobado”?'], rows:[
      ['Funciona','16 cartas barajadas, pares se detectan, victoria se celebra.'],
      ['Calidad de código','Clases Carta y JuegoMemoria, métodos claros, sin variables globales sueltas.'],
      ['Estados','No se puede voltear 3+ cartas; reinicio limpia todo (mazo, cronómetro, mensajes).'],
      ['Persistencia','El récord sobrevive recargas (y funciona en el celular publicado).'],
      ['Presentación','Volteo 3D suave, responsive, mensajes de feedback.']
    ]},
    {t:'tip', title:'💡 Rúbrica para el aula', h:'Si eres docente: pide el enlace del repo y el enlace del juego publicado. Con la tabla de criterios, cada estudiante puede autoevaluarse en parejas (peer review) antes de entregar: aprenden a leer código ajeno, la habilidad más subestimada.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué comando crea la primera fotografía de tu juego en Git?', options:['git push','git commit -m "Juego de Memoria v1"','git clone','git start'], correct:1, pts:10, explain:'add prepara, commit fotografía, push publica. Sin commit no hay versión que subir.'},
      {type:'mc', q:'Para publicarlo gratis con HTTPS (necesario si agregas service worker), una opción es…', options:['imprimir el juego','Render Static Site o GitHub Pages','un USB','enviarlo por correo'], correct:1, pts:10, explain:'Ambos dan HTTPS gratis y despliegue automático con cada push.'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 21 · El ritual de publicación',
      sub:'Escribe (como comentarios en el editor) la secuencia completa de Git para publicar tu juego por primera vez y actualizarlo después. ▶ Califica.',
      file:'ejercicio-21.html', height:320,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 21</title></head>
<body>
  <p style="font-family:system-ui">Escribe los comandos como comentarios:</p>
  <script>
    // TODO 1: convierte la carpeta en repositorio Git
    // git ...

    // TODO 2: prepara TODOS los archivos para la foto
    // git ...

    // TODO 3: toma la fotografía con el mensaje "Juego de Memoria v1"
    // git ...

    // TODO 4: renombra la rama principal a main
    // git ...

    // TODO 5: conecta el repo local con GitHub (remote + URL)
    // git ...

    // TODO 6: sube por primera vez la rama main
    // git ...
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'<code>git init</code> para iniciar el repositorio', re:'git\\s+init', pts:15},
        {label:'<code>git add .</code> para preparar todo', re:'git\\s+add\\s+\\.', pts:15},
        {label:'<code>git commit -m "…"</code> con mensaje', re:'git\\s+commit\\s+-m\\s+[\'"][^\'"]+[\'"]', pts:20},
        {label:'<code>git branch -M main</code>', re:'git\\s+branch\\s+(-M|-m)\\s+main', pts:15},
        {label:'<code>git remote add origin URL</code>', re:'git\\s+remote\\s+add\\s+origin', pts:20},
        {label:'<code>git push -u origin main</code> (o git push)', re:'git\\s+push', pts:15}
      ]}
  ]},

  /* -------- 6.2 -------- */
  { id:'6-2', title:'¿Qué sigue? Tu mapa de crecimiento 🗺️', time:'11 min', blocks:[
    {t:'p', h:'Terminaste dos proyectos reales: una app con estado y persistencia, y un juego con clases y POO. Esto ya no es “saber un poco de HTML”: es una base sólida de desarrollo web. ¿Hacia dónde crecer? 🧭'},
    {t:'list', items:[
      '<b>JavaScript nivel pro</b>: asincronía real (<code>fetch</code> + APIs, <code>async/await</code>), módulos (<code>import/export</code>) y manejo de errores. Con eso puedes consumir datos reales (clima, películas, Pokémon).',
      '<b>Canvas y juegos más grandes</b>: tu Memoria es por turnos; el siguiente salto es animación continua con <code>requestAnimationFrame</code> (Pong, Snake, arcade).',
      '<b>Un framework</b> (React, Vue o Svelte): ya entenderás qué problema resuelven, porque sufriste el render manual 😉.',
      '<b>Inglés técnico</b>: la documentación, los errores y las mejores respuestas de Stack Overflow están en inglés. (Spoiler: el próximo curso del campus es exactamente eso.)',
      '<b>El libro de texto</b> de este curso: algoritmos de mezcla, event loop y arquitectura — la teoría detrás de lo que acabas de construir.'
    ]},
    {t:'info', title:'📚 Tu biblioteca de cabecera', h:'Consulta la sección <b>📘 Libro de texto</b> de este curso: bibliografía real de JavaScript para seguir (Eloquent JavaScript, You Don’t Know JS, Flanagan…). Leer 20 páginas por semana cambia tu forma de programar.'},
    {t:'milestone', title:'🎓 Logro desbloqueado', h:'Completaste el segundo curso: <b>arrays (y cómo funcionan por dentro), objetos, funciones avanzadas, clases y los 4 pilares de la POO, DOM por lotes, delegación de eventos, timers y persistencia</b> — todo materializado en un juego tuyo, funcionando en internet. 26 lecciones, 26 ejercicios, un proyecto real. ¡Nos vemos en el curso de inglés! 👋'},
    {t:'quiz', questions:[
      {type:'mc', q:'Para consumir datos de una API real (clima, películas…), la herramienta de JS es…', options:['localStorage','fetch (con async/await)','appendChild','Math.random'], correct:1, pts:10, explain:'fetch pide datos a servidores; async/await hace ese proceso legible. Es el siguiente gran tema.'},
      {type:'mc', q:'¿Por qué aprender un framework será más fácil ahora?', options:['Porque los frameworks son fáciles','Porque ya viviste el problema que resuelven: sincronizar estado y DOM a mano','Porque no hace falta JavaScript','Porque son como Excel'], correct:1, pts:10, explain:'React/Vue automatizan el render que tú hiciste a mano con renderizar(). Entender el “antes” hace obvio el “después”.'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 22 · Tu ruta de aprendizaje',
      sub:'Cierra el curso planificando: crea tu array <code>miRuta</code> con al menos 3 temas que quieres aprender, recórrelo con forEach imprimiendo pasos numerados y agrega uno más con push. ▶ Califica.',
      file:'ejercicio-22.html', height:320,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 22</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12).</p>
  <script>
    // TODO 1: crea miRuta con al menos 3 temas que quieres aprender
    // (ej: 'fetch y APIs', 'Canvas y juegos', 'React', 'Inglés B1', ...)
    const miRuta = [...];

    // TODO 2: recórrela con forEach imprimiendo "Paso 1: tema", etc.
    ...

    // TODO 3: agrega un tema nuevo AL FINAL con push
    ...

    // TODO 4: imprime cuántos pasos tiene tu ruta (length)
    console.log('Mi ruta tiene', ..., 'pasos');
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'Declara el array <code>miRuta</code> con al menos 3 elementos', re:'const\\s+miRuta\\s*=\\s*\\[[\\s\\S]*,[\\s\\S]*,[\\s\\S]*\\]', pts:25},
        {label:'Recorre con <code>forEach</code>', re:'miRuta\\.\\s*forEach|\\.\\s*forEach\\s*\\(', pts:25},
        {label:'Imprime pasos numerados (usa el índice + 1 o contador)', re:'\\+\\s*1|paso|Paso|indice|i\\s*\\+', pts:20},
        {label:'Agrega un tema con <code>push()</code>', re:'miRuta\\.\\s*push\\s*\\(', pts:20},
        {label:'Muestra el total con <code>length</code>', re:'\\.\\s*length', pts:10}
      ]}
  ]}
]});
