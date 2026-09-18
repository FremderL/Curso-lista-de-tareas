'use strict';
const MODULES = [];

/* ============================ MÓDULO 1: ARRAYS ============================ */
MODULES.push({
  id:'m1', emoji:'📦', name:'Arrays a fondo', color:'#4f46e5',
  desc:'La caja con tus 16 cartas: crear, acceder, mutar, transformar, ordenar y mezclar — y cómo funcionan por dentro.',
  lessons:[

  /* -------- 1.1 -------- */
  { id:'1-1', title:'Tu segundo proyecto: el juego de Memoria 🃏', time:'14 min', blocks:[
    {t:'p', h:'En el curso anterior construiste una app con estado y persistencia. Ahora subimos de nivel: un <b>juego de Memoria</b> completo — el clásico de voltear cartas y encontrar pares 🎯. Va a parecer “solo un juego”, pero para programarlo necesitarás exactamente las herramientas de un desarrollador profesional: <b>arrays, objetos, clases, los 4 pilares de la POO, DOM y eventos</b>. Este curso los enseña todos, uno por uno, y cada lección termina con su <b>ejercicio calificado</b>.'},
    {t:'h', h:'Las reglas (primero piensa como diseñador)'},
    {t:'list', items:[
      'Hay un tablero con cartas <b>boca abajo</b> (8 pares de símbolos en el modo clásico).',
      'El jugador voltea <b>una carta</b>… y luego <b>otra</b>.',
      'Si los símbolos <b>coinciden</b>: quedan descubiertas para siempre. ✅',
      'Si <b>no</b> coinciden: se voltean de nuevo tras un instante. ❌',
      'El juego termina cuando <b>todos los pares</b> están encontrados.'
    ]},
    {t:'p', h:'▶ <b>Juega ahora la versión final</b> (es el proyecto de este curso). Nota los ingredientes: un mazo que se mezcla, un tablero, reglas de turno, contador de intentos, cronómetro y récords guardados. Cada lección construye una pieza:'},
    {t:'appdemo'},
    {t:'steps', items:[
      '<b>Módulo 1</b>: arrays — el mazo y el tablero son listas (incluida una lección sobre cómo funcionan POR DENTRO).',
      '<b>Módulo 2</b>: objetos y funciones — cada carta es un objeto con datos y comportamiento.',
      '<b>Módulo 3</b>: clases y los 4 pilares de la POO — <code>Carta</code> y <code>JuegoMemoria</code>.',
      '<b>Módulo 4</b>: DOM y eventos — dibujar el tablero y reaccionar a los clics.',
      '<b>Módulo 5</b>: el juego completo con CSS 3D, cronómetro y récords.',
      '<b>Módulo 6</b>: publicación, rúbrica de entrega y roadmap.'
    ]},
    {t:'info', title:'🔑 Requisitos', h:'Este curso asume lo que aprendiste en el de la Lista de Tareas: variables, funciones, <code>getElementById</code>, <code>addEventListener</code>, <code>createElement/appendChild</code>, <code>classList</code> y <code>localStorage</code>. Si algo se te olvidó, el <a href="index.html#/libro">libro de texto del curso 1</a> y su examen te refrescan en minutos.'},
    {t:'tip', title:'💡 Cómo estudiar este curso', h:'1) Lee la lección con calma (hay analogías a propósito). 2) Ejecuta los ejemplos y <b>rompe</b> cosas en los editores. 3) Haz el ejercicio final SIN mirar la solución. 4) Repite el quiz hasta 100. La constancia diaria de 20 minutos le gana a una maratón de 4 horas.'},
    {t:'quiz', questions:[
      {type:'mc', q:'En el juego de Memoria, ¿qué estructura guarda mejor las 16 cartas del tablero?', options:['Un número','Un array de cartas','Un string enorme','Una sola variable por carta'], correct:1, pts:10, explain:'16 cartas relacionadas entre sí = un array. Es la estructura natural para “muchos elementos iguales”.'},
      {type:'mc', q:'¿Qué debe pasar cuando dos cartas NO coinciden?', options:['Se quedan volteadas','Se recarga la página','Se voltean de nuevo tras un instante (con un temporizador)','Ganas automáticamente'], correct:2, pts:10, explain:'El jugador necesita verlas un momento: setTimeout las voltea de nuevo después de ~700 ms.'},
      {type:'mc', q:'¿Cuándo termina el juego?', options:['Al primer par encontrado','Cuando todas las cartas están marcadas como encontradas','A los 5 minutos','Cuando se acaban los intentos'], correct:1, pts:10, explain:'La condición de victoria: todos los pares encontrados, es decir, todas las cartas con encontrado = true.'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 1 · Declara el material del juego',
      sub:'Todo juego empieza definiendo sus datos. En el editor: 1) crea la constante <code>EMOJIS</code> con exactamente 8 emojis, 2) imprime cuántos hay usando <code>length</code>, 3) imprime el primero y el último. ▶ Ejecuta y califica.',
      file:'ejercicio-1.html', height:300,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 1</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12) para ver los resultados.</p>
  <script>
    // TODO 1: crea la constante EMOJIS con 8 emojis de tu elección
    // (ej: '🎃', '👻', '🦇', '🕷️', '🍬', '🧙', '💀', '🕸️')


    // TODO 2: imprime cuántos emojis hay (usa .length)
    console.log('Total de emojis: ', ...);

    // TODO 3: imprime el PRIMERO y el ÚLTIMO
    // (pista: el último está en la posición length - 1)
    console.log('Primero: ', ...);
    console.log('Último: ', ...);
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'Declara <code>const EMOJIS</code> como array', re:'const\\s+EMOJIS\\s*=\\s*\\[', pts:20},
        {label:'El array tiene al menos 8 elementos (comas)', re:'\\[\\s*[\'"][^\'"]+[\'"]\\s*(,\\s*[\'"][^\'"]+[\'"]\\s*){7,}\\]', pts:20},
        {label:'Usa <code>.length</code> para contar', re:'EMOJIS\\s*\\.\\s*length|\\.length', pts:15},
        {label:'Accede al primer elemento con índice <code>0</code>', re:'EMOJIS\\s*\\[\\s*0\\s*\\]', pts:15},
        {label:'Accede al último con <code>length - 1</code> (o pop)', re:'length\\s*-\\s*1|\\.pop\\s*\\(\\s*\\)', pts:20},
        {label:'Usa <code>console.log</code> para mostrar resultados', re:'console\\.log', pts:10}
      ]}
  ]},

  /* -------- 1.2 -------- */
  { id:'1-2', title:'Arrays: crear, acceder y modificar', time:'16 min', blocks:[
    {t:'p', h:'Un <b>array</b> es una lista ordenada de valores dentro de una sola variable. Piensa en un <b>tren de vagones</b> 🚂: cada vagón tiene un número de posición (índice) y el array sabe cuántos vagones tiene (<code>length</code>). <b>Detalle crucial: las posiciones empiezan en 0</b>, no en 1. El programador que olvida esto le paga con bugs.'},
    {t:'code', lang:'js', title:'anatomía de un array', code:
`const emojis = ['🎃', '👻', '🦇', '🕷️'];
//               índice 0   1     2     3

emojis.length      // 4  (cuántos hay)
emojis[0]          // '🎃'  (el primero)
emojis[3]          // '🕷️'  (el último = length - 1)
emojis[4]          // undefined (¡la posición 4 NO existe!)

// Leer una posición que no existe NO da error:
// devuelve undefined. Es un bug silencioso clásico.`},
    {t:'h', h:'Los métodos que modifican el array (mutadores)'},
    {t:'table', head:['Método','Qué hace','Devuelve'], rows:[
      ['<code>push(x)</code>','Agrega x al FINAL','la nueva longitud'],
      ['<code>pop()</code>','Quita el ÚLTIMO','el elemento quitado'],
      ['<code>unshift(x)</code>','Agrega x al PRINCIPIO','la nueva longitud'],
      ['<code>shift()</code>','Quita el PRIMERO','el elemento quitado'],
      ['<code>splice(i, n)</code>','Quita/reemplaza n elementos desde la posición i','array con lo quitado'],
      ['<code>sort(cmp)</code>','Ordena EN EL SITIO (muta)','el mismo array ordenado'],
      ['<code>reverse()</code>','Invierte EN EL SITIO (muta)','el mismo array invertido']
    ]},
    {t:'h', h:'Los métodos que NO modifican (lectura y copias)'},
    {t:'table', head:['Método','Qué hace','Devuelve'], rows:[
      ['<code>includes(x)</code>','¿Contiene x?','true / false'],
      ['<code>indexOf(x)</code>','Posición de x (-1 si no está)','número'],
      ['<code>slice(a, b)</code>','Copia del índice a hasta b (b no incluido)','array NUEVO'],
      ['<code>concat(arr)</code>','Une dos arrays','array NUEVO'],
      ['<code>join(sep)</code>','Convierte a texto separando con sep','string'],
      ['<code>[...arr]</code>','Spread: copia superficial completa','array NUEVO']
    ]},
    {t:'info', title:'🔑 La distinción más importante del módulo', h:'<b>Mutar</b> = cambiar el array original (push, pop, sort…). <b>No mutar</b> = obtener resultados nuevos sin tocarlo (slice, concat, spread). Los mutadores son cómodos pero peligrosos: si dos partes de tu programa comparten el mismo array y una lo ordena, la otra lo sufre. Los profesionales prefieren copiar-antes-de-cambiar.'},
    {t:'code', lang:'js', title:'todo junto con el mazo', code:
`const mazo = ['🎃', '👻', '🦇'];

mazo.push('🕷️');            // agrega al final
console.log(mazo);           // ['🎃','👻','🦇','🕷️']

const ultima = mazo.pop();   // saca '🕷️'
console.log(ultima, mazo);   // '🕷️'  ['🎃','👻','🦇']

console.log(mazo.includes('👻'));   // true
console.log(mazo.indexOf('🦇'));    // 2
console.log(mazo.slice(0, 2));      // ['🎃','👻'] (nuevo array)
console.log(mazo);                  // intacto ✓

const dobleMazo = mazo.concat(mazo); // 6 cartas (nuevo array)
console.log(dobleMazo.join(' · '));  // '🎃 · 👻 · 🦇 · 🎃 · 👻 · 🦇'`},
    {t:'warn', title:'⚠️ const y arrays: la aparente contradicción', h:'<code>const mazo = [...]</code> NO congela el contenido: significa “el nombre mazo no puede apuntar a otra cosa”. Por eso <code>mazo.push(...)</code> funciona pero <code>mazo = otraCosa</code> da error. Es como un armario cerrado con llave: puedes cambiar lo que hay dentro, no la puerta.'},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>const cartas = [\'A\',\'B\',\'C\']</code>. ¿Qué devuelve <code>cartas[1]</code>?', options:['\'A\'','\'B\'','\'C\'','undefined'], correct:1, pts:10, explain:'Los índices empiezan en 0: la posición 1 es el segundo elemento, B.'},
      {type:'fill', q:'Propiedad del array que dice cuántos elementos tiene:', accept:['length'], re:'^\\s*length\\s*$', show:'array.length', pts:10, hint:'En inglés: “longitud”.'},
      {type:'mc', q:'¿Qué método agrega un elemento AL FINAL?', options:['shift()','unshift()','push()','pop()'], correct:2, pts:10, explain:'push = empujar al final. pop saca del final; shift/unshift trabajan al inicio.'},
      {type:'mc', q:'<code>lista.slice(0, 2)</code> sobre <code>[1,2,3,4]</code> devuelve…', options:['[1,2] y modifica lista','[1,2] sin modificar lista','[2,3]','un error'], correct:1, pts:10, explain:'slice COPIA (del índice 0 incluido al 2 excluido) y el original queda intacto.'},
      {type:'tf', q:'Con <code>const lista = [1,2]</code>, ejecutar <code>lista.push(3)</code> lanza un error.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: const protege la REFERENCIA (el nombre), no el contenido. push muta el contenido y es válido.'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 2 · Manipula la mano de cartas',
      sub:'Practica índices y mutadores en <code>mano</code> (las cartas de un jugador): elimina la última, agrega dos nuevas, consulta posiciones y copia las primeras. ▶ Ejecuta y califica.',
      file:'ejercicio-2.html', height:320,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 2</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12).</p>
  <script>
    const mano = ['🎃', '👻', '🦇', '🕷️', '🍬'];

    // TODO 1: quita la ÚLTIMA carta con pop() y guárdala en descartada
    const descartada = ...;
    console.log('Descartada:', descartada);

    // TODO 2: agrega '🧙' al FINAL y '💀' al PRINCIPIO
    // (usa push y unshift)


    // TODO 3: ¿contiene '👻'? (includes) ¿en qué posición está '🦇'? (indexOf)
    console.log('¿Tiene 👻?: ', ...);
    console.log('Posición de 🦇: ', ...);

    // TODO 4: copia las PRIMERAS 2 cartas en primeras2 con slice
    const primeras2 = ...;
    console.log('Primeras dos:', primeras2);

    // TODO 5: imprime el total final con length
    console.log('Mano final:', mano, '· total:', ...);
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'Usa <code>pop()</code> para descartar', re:'\\.\\s*pop\\s*\\(\\s*\\)', pts:15},
        {label:'Agrega al final con <code>push()</code>', re:'\\.\\s*push\\s*\\(', pts:15},
        {label:'Agrega al inicio con <code>unshift()</code>', re:'\\.\\s*unshift\\s*\\(', pts:15},
        {label:'Consulta con <code>includes()</code>', re:'\\.\\s*includes\\s*\\(', pts:15},
        {label:'Consulta con <code>indexOf()</code>', re:'\\.\\s*indexOf\\s*\\(', pts:15},
        {label:'Copia con <code>slice()</code>', re:'\\.\\s*slice\\s*\\(', pts:15},
        {label:'Muestra el total con <code>length</code>', re:'\\.\\s*length', pts:10}
      ]}
  ]},

  /* -------- 1.3 -------- */
  { id:'1-3', title:'¿Cómo funcionan los arrays por dentro? 🧠', time:'17 min', blocks:[
    {t:'p', h:'Ya sabes USAR arrays. Ahora vamos un nivel más profundo: <b>cómo funcionan</b>. Entender esto explica el 80% de los bugs raros que verás en tu carrera — y es el tipo de pregunta de entrevista que separa a quien copia código de quien lo entiende.'},
    {t:'h', h:'1) Un array es un objeto con posiciones numeradas'},
    {t:'p', h:'En JavaScript, <code>typeof []</code> devuelve <code>"object"</code>: un array <b>es un objeto</b> cuyas claves son índices (0, 1, 2…) más la propiedad especial <code>length</code>. Por eso funcionan ambas formas de acceder: <code>lista[0]</code> y <code>lista["0"]</code>. Y por eso un array admite cualquier mezcla de tipos:'},
    {t:'code', lang:'js', title:'arrays heterogéneos (posibles, no recomendados)', code:
`const raro = ['👻', 42, true, null, { id: 1 }, [1, 2]];
console.log(raro[1] + 8);         // 50
console.log(typeof raro);         // 'object'
console.log(Array.isArray(raro)); // true  ← la forma correcta de preguntar

// En nuestro juego evitamos la mezcla: todas las cartas
// del mazo son objetos del MISMO tipo (mismo formato).
// Regla profesional: un array, un solo tipo de dato.`},
    {t:'h', h:'2) El secreto: los arrays se copian POR REFERENCIA'},
    {t:'p', h:'Esta es LA lección. Cuando asignas un array a otra variable, <b>no se copia el contenido</b>: se copia la <b>dirección</b> (la referencia) hacia el MISMO array en memoria. Es como compartir el enlace de una carpeta de Google Drive 📁: dos personas “ven” la misma carpeta; si una borra un archivo, también desaparece para la otra.'},
    {t:'code', lang:'ascii', title:'qué pasa en la memoria', code:
`let a = ['🎃', '👻'];

let b = a;          // b apunta AL MISMO array (no hay copia)

//  Memoria:      a ──┐
//                    ├──► ['🎃', '👻']   (un solo array)
//                b ──┘

b.push('🦇');       // cambio a través de b...

console.log(a);     // ['🎃', '👻', '🦇']  ¡a también cambió!`},
    {t:'info', title:'🔑 Copia superficial vs copia profunda', h:'<code>const copia = [...a]</code> (o <code>a.slice()</code>, o <code>a.concat()</code>) crea un array <b>nuevo con los mismos elementos</b> — es una copia <b>superficial</b>: si los elementos fueran objetos, ambos arrays compartirían esos objetos. Para duplicar TODO en profundidad (objetos incluidos) existe <code>structuredClone(a)</code>. En el juego: barajamos con copia superficial (los objetos carta pueden compartirse: solo cambiamos el ORDEN).'},
    {t:'code', lang:'js', title:'las tres formas de copiar y cuándo usarlas', code:
`const mazo = [{ id: 1, emoji: '🎃' }, { id: 2, emoji: '👻' }];

// 1. Copia superficial del array (los objetos SON compartidos):
const copia1 = [...mazo];

// 2. Copia profunda (objetos duplicados también):
const copia2 = structuredClone(mazo);
copia2[0].emoji = '💀';
console.log(mazo[0].emoji);   // '🎃'  (el original está a salvo)

// 3. Copiar un OBJETO (una carta) con spread:
const carta = { id: 1, emoji: '🎃', volteada: false };
const volteada = { ...carta, volteada: true };
console.log(carta.volteada);  // false (el original NO cambió)`},
    {t:'h', h:'3) Rendimiento: no todas las operaciones cuestan lo mismo'},
    {t:'table', head:['Operación','Costo','Por qué (el tren 🚂)'], rows:[
      ['<code>push / pop</code>','Rápido (O(1))','Enganchar o soltar el último vagón no mueve a nadie.'],
      ['<code>unshift / shift</code>','Lento en listas grandes (O(n))','Quitar la locomotora obliga a mover TODOS los vagones una posición.'],
      ['<code>indexOf / includes</code>','O(n)','Hay que revisar vagón por vagón.'],
      ['<code>slice</code>','O(n)','Copia: recorre y duplica.']
    ]},
    {t:'p', h:'Con 16 cartas no notarás diferencia; con 100,000 elementos sí. La regla: <b>construye al final (push), no al principio (unshift)</b> cuando trabajas con listas grandes.'},
    {t:'h', h:'4) Recorrer: for clásico vs for…of'},
    {t:'code', lang:'js', title:'dos bucles para dos necesidades', code:
`const cartas = ['🎃', '👻', '🦇'];

// for...of: cuando solo necesitas los VALORES
for (const carta of cartas) {
  console.log(carta);
}

// for clásico: cuando necesitas el ÍNDICE (o recorrer al revés)
for (let i = 0; i < cartas.length; i++) {
  console.log(i, cartas[i]);
}

// Recorrer al revés (Fisher-Yates lo hace):
for (let i = cartas.length - 1; i >= 0; i--) {
  console.log('del final: ', cartas[i]);
}`},
    {t:'warn', title:'⚠️ Dos trampas conocidas', h:'1) <b>Huecos</b>: <code>lista[10] = "x"</code> sobre un array de 2 elementos crea huecos (length salta a 11 con undefined en medio). Nunca hagas eso; usa push. 2) <b>Borrar con delete</b>: <code>delete lista[1]</code> deja un hueco (no reordena). Para QUITAR elementos usa <code>splice(i, 1)</code> o <code>pop/shift</code>.'},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>const b = a</code> (siendo a un array) hace que…', options:['b sea una copia independiente','a y b apunten al MISMO array en memoria','b sea undefined','se duplique la memoria'], correct:1, pts:10, explain:'Los arrays se asignan por referencia: dos nombres, un solo objeto. Cambiar por uno se ve por el otro.'},
      {type:'fill', q:'Operador que crea una copia superficial de un array: <code>[...a]</code>. Escribe los 3 puntos:', accept:['...','spread'], re:'^\\s*\\.{3}\\s*$', show:'...  (spread)', pts:10, hint:'Tres puntos.'},
      {type:'mc', q:'¿Cuál par de métodos es el LENTO en arrays gigantes?', options:['push y pop','unshift y shift','slice y concat','includes e indexOf'], correct:1, pts:10, explain:'Mover el “frente del tren” obliga a reindexar todos los vagones: O(n).'},
      {type:'mc', q:'<code>const copia = [...mazo]</code> y luego <code>copia.push("x")</code>. El mazo original…', options:['también recibe "x"','no cambia: la copia es un array nuevo','se borra','se ordena'], correct:1, pts:10, explain:'Spread crea un array NUEVO: push sobre la copia no afecta al original.'},
      {type:'mc', q:'¿Cómo preguntas con certeza si algo es un array?', options:['typeof x === "array"','x.isArray()','Array.isArray(x)','x.type === "list"'], correct:2, pts:10, explain:'typeof devuelve "object" para arrays; Array.isArray(x) es la respuesta oficial.'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 3 · El experimento de las referencias',
      sub:'Demuestra con tus propias manos que asignar copia la referencia y que spread crea un array nuevo. Completa el experimento, predice los resultados en comentarios y ejecuta. ▶ Califica.',
      file:'ejercicio-3.html', height:330,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 3</title></head>
<body>
  <p style="font-family:system-ui">Predice ANTES de ejecutar: ¿qué imprimirá cada línea?</p>
  <script>
    const original = ['🎃', '👻'];

    // TODO 1: asigna original a alias (const alias = original)
    const alias = ...;

    // TODO 2: agrega '🦇' AL FINAL del alias (push)
    ...

    // TODO 3: imprime original. ¿Cambi? (sí: comparten referencia)
    console.log('original:', original);

    // TODO 4: crea copiaReal con spread a partir de original
    const copiaReal = ...;

    // TODO 5: agrega '🕷️' al final de copiaReal
    ...

    // TODO 6: imprime original otra vez: debe SEGUIR con 3 cartas
    console.log('original tras copia:', original);
    console.log('copiaReal:', copiaReal);

    // TODO 7: imprime si son el mismo array:
    // console.log(alias === original);        // true
    // console.log(copiaReal === original);    // false
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'Crea el alias con asignación directa (<code>= original</code>)', re:'=\\s*original\\b', pts:15},
        {label:'Muta con <code>push()</code>', re:'\\.\\s*push\\s*\\(', pts:15},
        {label:'Crea la copia real con spread <code>[...original]</code> (o slice/concat)', re:'\\.\\.\\.\\s*original|\\.\\s*slice\\s*\\(\\s*\\)|\\.\\s*concat\\s*\\(', pts:20},
        {label:'Compara identidades con <code>===</code>', re:'===\\s*original', pts:20},
        {label:'Imprime resultados con <code>console.log</code>', re:'console\\.log', pts:15},
        {label:'Predice en comentarios qué imprimirá (comenta tu predicción)', re:'//\\s*(s[íi]|no|true|false|3|4)', pts:15}
      ]}
  ]},

  /* -------- 1.4 -------- */
  { id:'1-4', title:'Recorrer y transformar: forEach, map, filter y find', time:'16 min', blocks:[
    {t:'p', h:'Recorrer arrays es el pan de cada día. JS moderno te da <b>herramientas declarativas</b>: en vez de decir “cómo” contar pasos, dices <b>qué quieres</b> y el método hace el bucle. La diferencia se nota (y se agradece) al leer código ajeno — y al escribir el tuyo tres semanas después.'},
    {t:'code', lang:'js', title:'la misma tarea, imperativa vs declarativa', code:
`const emojis = ['🎃', '👻', '🦇'];

// Imperativa: TÚ manages el bucle paso a paso
for (let i = 0; i < emojis.length; i++) {
  console.log(i, emojis[i]);
}

// Declarativa: LES ENCIENDAS la intención
emojis.forEach(function (emoji, i) {
  console.log(i, emoji);
});
// Ambas funcionan; la segunda comunica mejor "para cada carta, imprímela".`},
    {t:'table', head:['Método','Qué hace','Devuelve'], rows:[
      ['<code>forEach(fn)</code>','Ejecuta fn por cada elemento','undefined (no devuelve nada)'],
      ['<code>map(fn)</code>','Transforma cada elemento','UN array nuevo (mismo tamaño)'],
      ['<code>filter(fn)</code>','Deja pasar los que cumplen la condición','Array nuevo (igual o más chico)'],
      ['<code>find(fn)</code>','Busca el PRIMERO que cumple','El elemento o undefined'],
      ['<code>findIndex(fn)</code>','Posición del primero que cumple','Índice o -1'],
      ['<code>some(fn)</code>','¿Hay ALGUNO que cumpla?','true / false'],
      ['<code>every(fn)</code>','¿CUMPLEN TODOS?','true / false']
    ]},
    {t:'code', lang:'js', title:'las cuatro herramientas estrella', code:
`const emojis = ['🎃', '👻', '🦇', '🕷️', '🍬'];

// map: TRANSFORMA cada elemento (nuevo array del mismo tamaño)
const etiquetas = emojis.map(function (e, i) {
  return 'Carta ' + (i + 1) + ': ' + e;
});

// filter: SELECCIONA los que cumplen
const sinFantasmas = emojis.filter(function (e) { return e !== '👻'; });

// find: el PRIMERO que cumple (y findIndex: su posición)
const murcielago = emojis.find(function (e) { return e === '🦇'; });
const posicion = emojis.findIndex(function (e) { return e === '🦇'; });

// every/some: preguntas de sí/no
const todosTienenLetra = emojis.every(function (e) { return e.length >= 1; });
const hayDulce = emojis.some(function (e) { return e === '🍬'; });`},
    {t:'info', title:'🔑 map y filter siempre devuelven arrays NUEVOS', h:'No modifican el original: devuelven otro. Ese estilo (evitar mutar) se llama <b>programación inmutable</b> y es la base de frameworks como React. En el juego lo usarás para contar cartas encontradas: <code>cartas.filter(c => c.encontrada).length</code>.'},
    {t:'code', lang:'js', title:'el poder de encadenar (chaining)', code:
`const numeros = [5, 12, 8, 130, 44, 3];

const resultado = numeros
  .filter(function (n) { return n > 7; })   // [12, 8, 130, 44]
  .map(function (n) { return n * 2; })      // [24, 16, 260, 88]
  .sort(function (a, b) { return a - b; }); // [16, 24, 88, 260]

console.log(resultado);
// Cada eslabón recibe y devuelve arrays: la cinta transportadora
// de la fábrica 🏭. Leerlo en voz alta ayuda:
// "filtra los grandes, doblalos, ordénalos".`},
    {t:'warn', title:'⚠️ forEach no es map', h:'Si necesitas el RESULTADO de la transformación, usa <code>map</code> (forEach devuelve undefined y serías incapaz de guardarlo). Regla rápida: ¿quieres hacer algo con cada elemento sin producir datos? forEach. ¿Quieres construir un array nuevo? map.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Quieres un array NUEVO con el doble de cada número. Usas…', options:['forEach','map','filter','find'], correct:1, pts:10, explain:'map transforma cada elemento y devuelve un array nuevo del mismo tamaño.'},
      {type:'mc', q:'Quieres saber si ALGUNA carta está volteada. Usas…', options:['every','some','filter','map'], correct:1, pts:10, explain:'some pregunta “¿hay alguno?”. every pregunta “¿todos?”.'},
      {type:'fill', q:'Método que devuelve el PRIMER elemento que cumple una condición (o undefined):', accept:['find'], re:'^\\s*find\\s*$', show:'cartas.find(c => c.id === 7)', pts:10, hint:'En inglés: “encontrar”.'},
      {type:'mc', q:'¿Cuántas cartas devuelve <code>cartas.filter(c => c.encontrada)</code> si 5 de 16 están encontradas?', options:['16','5','0','un booleano'], correct:1, pts:10, explain:'filter deja pasar solo las que cumplen: un array con esas 5 cartas.'},
      {type:'mc', q:'¿Qué método devuelve la POSICIÓN del primer elemento que cumple (o -1)?', options:['find()','findIndex()','indexOf() solo funciona con valores exactos','search()'], correct:1, pts:10, explain:'findIndex acepta condiciones complejas; indexOf solo busca valores exactos.'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 4 · La fábrica de estadísticas',
      sub:'Del array <code>puntos</code> obtén: dobles (map), grandes (filter), el primero menor que 6 (find), si todos son positivos (every) y una suma con forEach. ▶ Ejecuta y califica.',
      file:'ejercicio-4.html', height:330,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 4</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12).</p>
  <script>
    const puntos = [10, 5, 20, 8, 15, 3];

    // TODO 1: dobles = map que multiplica cada punto x2
    const dobles = ...;
    console.log('Dobles:', dobles);

    // TODO 2: grandes = filter con los puntos >= 10
    const grandes = ...;
    console.log('Grandes:', grandes);

    // TODO 3: chico = find del primer punto menor que 6
    const chico = ...;
    console.log('Primero menor que 6:', chico);

    // TODO 4: positivos = every ¿todos > 0?
    const positivos = ...;
    console.log('¿Todos positivos?:', positivos);

    // TODO 5: suma total recorriendo con forEach y un acumulador
    let suma = 0;
    ...
    console.log('Suma total:', suma);
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'Usa <code>.map()</code> para los dobles', re:'\\.\\s*map\\s*\\(', pts:20},
        {label:'Usa <code>.filter()</code> con la condición >= 10', re:'\\.\\s*filter\\s*\\([\\s\\S]{0,40}>=\\s*10', pts:20},
        {label:'Usa <code>.find()</code> con la condición < 6', re:'\\.\\s*find\\s*\\([\\s\\S]{0,40}<\\s*6', pts:20},
        {label:'Usa <code>.every()</code> para los positivos', re:'\\.\\s*every\\s*\\(', pts:15},
        {label:'Acumula la suma con <code>forEach</code> (suma += …)', re:'forEach[\\s\\S]*suma\\s*(\\+=|=\\s*suma\\s*\\+)', pts:15}
      ]}
  ]},

  /* -------- 1.5 -------- */
  { id:'1-5', title:'Ordenar y mezclar: sort y el algoritmo Fisher-Yates', time:'16 min', blocks:[
    {t:'p', h:'Dos necesidades opuestas del juego: <b>ordenar</b> (récords de menor a mayor) y <b>mezclar</b> (que las cartas salgan desordenadas). La primera es fácil; la segunda tiene trampa 😏 — y resolverla bien te deja un algoritmo famoso en el currículum.'},
    {t:'h', h:'sort: ordena… con reglas'},
    {t:'code', lang:'js', title:'sort necesita comparador para números', code:
`// CUIDADO: sort por defecto convierte a TEXTO
[10, 9, 100].sort();               // [10, 100, 9]  ¡mal!

// Con comparador numérico:
[10, 9, 100].sort(function (a, b) { return a - b; }); // [9, 10, 100]

// Regla del comparador:
// resultado negativo → a va ANTES que b
// resultado positivo → b va antes que a
// cero → empatan (deja como esté)

// Descendente: invierte la resta
[10, 9, 100].sort(function (a, b) { return b - a; }); // [100, 10, 9]

// Y ordena récords de mejor a peor:
records.sort(function (a, b) { return a.intentos - b.intentos; });`},
    {t:'warn', title:'⚠️ sort MUTA el array original', h:'A diferencia de map/filter, <code>sort</code> cambia el array que lo llama (y también lo devuelve). Si necesitas conservar el orden original: <code>const ordenado = [...records].sort(comparador)</code> — copia primero, ordena después.'},
    {t:'h', h:'Mezclar: el error famoso y la forma correcta'},
    {t:'warn', title:'⚠️ La “mezcla ingenua” está sesgada', h:'En internet verás <code>cartas.sort(() => Math.random() - 0.5)</code>. <b>No la uses</b>: es una mezcla sesgada (algunas posiciones salen mucho más a menudo) porque sort asume un comparador CONSISTENTE y uno aleatorio viola esa regla. Para un juego (y para aprender) existe el algoritmo correcto y sencillo: <b>Fisher-Yates</b>.'},
    {t:'info', title:'🔑 ¿Cómo funciona Fisher-Yates?', h:'Recorre el array del final hacia el principio; en cada paso elige un índice aleatorio <b>entre 0 y la posición actual</b>, e intercambia ambos elementos. Como cada posición ya “cerrada” nunca vuelve a tocarse, TODAS las permutaciones terminan con exactamente la misma probabilidad: es la mezcla que usan los casinos digitales. Con 16 cartas hay 20,922,789,888,000 órdenes posibles — y Fisher-Yates los trata a todos por igual.'},
    {t:'code', lang:'js', title:'Fisher-Yates (la usaremos en el juego)', code:
`function barajar(array) {
  const copia = [...array];                  // no tocamos el original
  for (let i = copia.length - 1; i > 0; i--) {  // del final al inicio
    const j = Math.floor(Math.random() * (i + 1)); // j aleatorio en [0, i]
    [copia[i], copia[j]] = [copia[j], copia[i]];   // intercambio
  }
  return copia;
}

// Nota moderna: [a, b] = [b, a] es "destructuring de arrays":
// intercambia dos valores sin variable temporal. La forma clásica:
// const temp = copia[i]; copia[i] = copia[j]; copia[j] = temp;`},
    {t:'table', head:['Herramienta','Qué da'], rows:[
      ['<code>Math.random()</code>','Decimal aleatorio entre 0 (incluido) y 1 (excluido): 0…0.999…'],
      ['<code>Math.random() * n</code>','Decimal entre 0 y n'],
      ['<code>Math.floor(x)</code>','Redondea hacia abajo: entero entre 0 y n-1'],
      ['<code>[...array]</code>','Spread: copia superficial del array']
    ]},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>[3, 25, 100].sort()</code> (sin comparador) devuelve…', options:['[3, 25, 100]','[100, 25, 3]','[3, 100, 25]','[10, 25, 100]'], correct:2, pts:10, explain:'Sin comparador, sort ordena como TEXTO: “100” < “25” < “3”. Por eso los números necesitan comparador.'},
      {type:'mc', q:'¿Por qué NO usar sort(() => Math.random() - 0.5) para barajar?', options:['Porque es muy lento','Porque la mezcla es sesgada: algunas órdenes salen más que otras','Porque modifica el array','Porque Math.random está prohibido'], correct:1, pts:10, explain:'La comparación aleatoria rompe las garantías de sort: la distribución de resultados no es uniforme. Fisher-Yates sí es justo.'},
      {type:'mc', q:'<code>Math.floor(Math.random() * 16)</code> genera…', options:['un decimal entre 0 y 16','un entero entre 0 y 15','exactamente 8','un entero entre 1 y 16'], correct:1, pts:10, explain:'random da [0,1), al multiplicar [0,16) y con floor: enteros 0…15. Perfecto para índices.'},
      {type:'tf', q:'<code>sort()</code> muta el array original (a diferencia de map y filter).', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Verdadero: sort ordena EN EL SITIO. Copia antes ([...lista].sort(...)) si necesitas conservar el original.'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 5 · Récords ordenados y baraja justa',
      sub:'Dos retos en uno: 1) ordena <code>records</code> por intentos (ascendente) SIN modificar el original; 2) completa la función <code>barajar()</code> con el corazón de Fisher-Yates. ▶ Califica.',
      file:'ejercicio-5.html', height:340,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 5</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12).</p>
  <script>
    const records = [
      { jugador: 'Ana', intentos: 12 },
      { jugador: 'Beto', intentos: 8 },
      { jugador: 'Cami', intentos: 15 }
    ];

    // TODO 1: ordenados = copia de records ([...records])
    // ordenada por intentos ASCENDENTE con sort y comparador
    const ordenados = ...;
    console.log('Mejor jugador:', ordenados[0].jugador); // Beto

    // TODO 2: completa barajar con Fisher-Yates
    function barajar(array) {
      const copia = [...array];
      for (let i = copia.length - 1; i > 0; i--) {
        // elige j aleatorio entre 0 e i (inclusive)
        const j = ...;
        // intercambia copia[i] y copia[j]
        ...
      }
      return copia;
    }

    console.log('Baraja 1:', barajar([1,2,3,4,5,6,7,8]));
    console.log('Baraja 2:', barajar([1,2,3,4,5,6,7,8]));
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'Copia antes de ordenar (<code>[...records]</code> o slice)', re:'\\.\\.\\.\\s*records|\\.\\s*slice\\s*\\(\\s*\\)', pts:15},
        {label:'Ordena con <code>.sort()</code> y comparador <code>a.intentos - b.intentos</code>', re:'\\.\\s*sort\\s*\\([\\s\\S]{0,60}intentos\\s*-\\s*\\w+\\.\\s*intentos|\\.\\s*sort\\s*\\(\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*\\)\\s*=>\\s*\\w+\\s*-\\s*\\w+', pts:20},
        {label:'Fisher-Yates: <code>Math.random() * (i + 1)</code> con <code>Math.floor</code>', re:'Math\\.\\s*floor\\s*\\(\\s*Math\\.\\s*random\\s*\\(\\s*\\)\\s*\\*\\s*\\(\\s*i\\s*\\+\\s*1\\s*\\)\\s*\\)', pts:20},
        {label:'Intercambia elementos (destructuring o variable temporal)', re:'\\[\\s*copia\\[\\s*i\\s*\\]\\s*,\\s*copia\\[\\s*j\\s*\\]\\s*\\]\\s*=|const\\s+temp\\s*=', pts:20},
        {label:'La función devuelve la copia barajada', re:'return\\s+copia', pts:15}
      ]}
  ]},

  /* -------- 1.6 -------- */
  { id:'1-6', title:'🛠️ Proyecto del módulo: crearMazo()', time:'18 min', blocks:[
    {t:'p', h:'Integrador del Módulo 1: tu primera función REAL del juego. <code>crearMazo()</code> debe producir un array de <b>16 cartas</b>: los 8 emojis duplicados en pares y <b>barajados con Fisher-Yates</b>. Combina todo lo practicado: arrays, spread, barajar y console.log para verificar.'},
    {t:'info', title:'🔑 El patrón duplicar-y-barajar', h:'<code>[...EMOJIS, ...EMOJIS]</code> expande el array dos veces seguidas: cada emoji queda en parejas. Barajar DESPUÉS de duplicar garantiza que los pares existan y queden distribuidos al azar por todo el mazo. Si barajaras primero y duplicaras después, los pares quedarían pegados (¡imposible perder!).'},
    {t:'exercise', title:'🛠️ Proyecto · crearMazo(): la primera pieza del juego',
      sub:'Completa la función del editor (busca los TODO): duplica los emojis, baraja con Fisher-Yates y devuelve el mazo de 16. Presiona ▶ Ejecutar para probar y luego «Calificar mi código».',
      file:'proyecto-1.html', height:380,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Proyecto 1: crearMazo</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12). Debe imprimir 16 cartas.</p>
  <script>
    const EMOJIS = ['🎃', '👻', '🦇', '🕷️', '🍬', '🧙', '💀', '🕸️'];

    function barajar(array) {
      const copia = [...array];
      for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
      }
      return copia;
    }

    function crearMazo() {
      // TODO 1: duplica EMOJIS en un nuevo array llamado pares
      // (pista: [...EMOJIS, ...EMOJIS] o EMOJIS.concat(EMOJIS))
      const pares = ...;

      // TODO 2: baraja los pares con la función de arriba
      const mazo = ...;

      // TODO 3: devuelve el mazo
      return ...;
    }

    // Prueba:
    const mazo = crearMazo();
    console.log('Cartas:', mazo.length);   // debe ser 16
    console.log(mazo);
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'Duplica los emojis (spread <code>...</code> o <code>concat</code>)', re:'\\.\\.\\.\\s*EMOJIS\\s*,\\s*\\.\\.\\.\\s*EMOJIS|EMOJIS\\.concat\\(EMOJIS\\)', pts:20},
        {label:'Baraja llamando a <code>barajar(...)</code>', re:'barajar\\s*\\(', pts:20},
        {label:'Usa Fisher-Yates (bucle hacia atrás con <code>Math.random</code>)', re:'for\\s*\\([^)]*-\\s*1[^)]*\\)|Math\\.random', pts:15},
        {label:'Intercambia con destructuring o variable temporal', re:'\\[copia\\[i\\],\\s*copia\\[j\\]\\]\\s*=\\s*\\[copia\\[j\\],\\s*copia\\[i\\]\\]|const\\s+temp\\s*=', pts:15},
        {label:'La función devuelve el mazo (<code>return</code>)', re:'return\\s+mazo', pts:15},
        {label:'El mazo resultante tiene 16 cartas (mira la consola)', re:'length', pts:15}
      ]}
  ]}
]});

/* ============================ MÓDULO 2: OBJETOS Y FUNCIONES ============================ */
MODULES.push({
  id:'m2', emoji:'🧩', name:'Objetos y funciones', color:'#0891b2',
  desc:'Cada carta es un objeto: propiedades, métodos, arrow functions y callbacks.',
  lessons:[

  /* -------- 2.1 -------- */
  { id:'2-1', title:'Objetos: cada carta es una ficha', time:'15 min', blocks:[
    {t:'p', h:'Un array guarda una lista de cosas “sueltas”. Pero una carta del juego tiene VARIOS datos que viajan juntos: su símbolo, si está volteada, si ya fue encontrada… Cuando los datos van juntos y tienen nombres, usamos un <b>objeto</b>: una ficha de registro 📇 con propiedades. A la colección de propiedades de un objeto se le llama su <b>estado</b>.'},
    {t:'code', lang:'js', title:'anatomía de un objeto', code:
`const carta = {
  id: 7,               // propiedad: valor
  emoji: '👻',
  volteada: false,
  encontrada: false,
  voltear: function () {   // método: función dentro del objeto
    this.volteada = !this.volteada;
  }
};

carta.emoji            // '👻'   (acceso con punto)
carta['emoji']         // '👻'   (acceso con corchetes: útil si la clave viene en una variable)
carta.voltear();       // ejecuta el método
carta.volteada         // true

carta.usuario = 'ana'; // agregar propiedad nueva al vuelo
delete carta.usuario;  // y borrarla (existe, pero úsalo poco)`},
    {t:'info', title:'🔑 this: “yo mismo”', h:'Dentro de un método, <code>this</code> es el objeto dueño de la llamada. <code>carta.voltear()</code> → dentro del método, <code>this</code> es <code>carta</code>. Por eso cada carta voltea SU estado y no el de otra. Verás la versión completa de this en el Módulo 3.'},
    {t:'h', h:'Dos superpoderes modernos: spread y destructuring'},
    {t:'code', lang:'js', title:'copiar y extraer', code:
`// SPREAD: copiar objetos (copia superficial)
const copia = { ...carta, volteada: true };
// objeto nuevo igual + volteada cambiada; el original NO cambia
// (nota cómo spread va ANTES de la propiedad que quieres sobrescribir)

// DESTRUCTURING: extraer propiedades a variables de un golpe
const { emoji, encontrada } = carta;
console.log(emoji);      // '👻'

// Destructuring con rename:
const { emoji: simbolo } = carta;
console.log(simbolo);    // '👻'

// Destructuring de arrays (visto en Fisher-Yates):
const [x, y] = [1, 2];   // x=1, y=2`},
    {t:'warn', title:'⚠️ Copia superficial vs profunda', h:'<code>{...objeto}</code> copia las propiedades del primer nivel. Si una propiedad es otro objeto/array, se copia la <b>referencia</b> (ambos objetos la comparten — misma idea del Drive compartido 📁 de la lección 1.3). Para copias totales: <code>structuredClone(objeto)</code>.'},
    {t:'table', head:['Pregunta','Arrays','Objetos'], rows:[
      ['¿Para qué sirven?','Listas ordenadas de cosas iguales','Describir UNA cosa con varias propiedades'],
      ['¿Cómo accedo?','por posición: <code>lista[0]</code>','por nombre: <code>carta.emoji</code>'],
      ['¿Cómo sé cuántos hay?','<code>length</code>','(no aplica: <code>Object.keys(obj).length</code>)'],
      ['En el juego…','el mazo, la tabla de récords','cada carta, cada récord']
    ]},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Cómo lees la propiedad emoji del objeto <code>carta</code>?', options:['carta.emoji','carta(emoji)','emoji.carta','carta->emoji'], correct:0, pts:10, explain:'Con punto (o con corchetes: carta["emoji"]). El punto es lo usual.'},
      {type:'mc', q:'Dentro de <code>carta.voltear()</code>, ¿qué es <code>this</code>?', options:['Un nuevo objeto','El objeto carta que llamó al método','La ventana del navegador','Una variable global'], correct:1, pts:10, explain:'this apunta al objeto dueño del método: cada carta modifica su propio estado.'},
      {type:'fill', q:'Operador que copia un objeto en uno nuevo: <code>{ ...carta }</code>. Escribe los 3 puntos:', accept:['...','spread'], re:'^\\s*\\.{3}\\s*$', show:'...  (spread)', pts:10, hint:'Tres puntos.'},
      {type:'mc', q:'<code>const { emoji } = carta</code> crea…', options:['un nuevo objeto','la variable emoji con el valor de carta.emoji','un array','un error'], correct:1, pts:10, explain:'Es destructuring: extrae propiedades a variables del mismo nombre en una línea.'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 6 · La ficha del jugador',
      sub:'Modela a un jugador como objeto: propiedades, un método que usa <code>this</code>, destructuring y una copia con spread. ▶ Ejecuta y califica.',
      file:'ejercicio-6.html', height:330,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 6</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12).</p>
  <script>
    // TODO 1: crea el objeto jugador con: nombre 'Ana', puntos 0, partidas 0,
    // y un método sumarPunto() que aumente this.puntos en 1
    const jugador = {
      ...
    };

    // TODO 2: llama sumarPunto() DOS veces e imprime jugador.puntos (debe dar 2)
    ...
    console.log('Puntos:', jugador.puntos);

    // TODO 3: extrae nombre y puntos con destructuring en una línea
    const { ... } = jugador;
    console.log(nombre, puntos);

    // TODO 4: crea jugadorPremiado con spread: igual pero puntos = 100
    const jugadorPremiado = ...;
    console.log('Premiado:', jugadorPremiado);
    console.log('Original sin cambios:', jugador.puntos); // 2
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'Crea el objeto con <code>nombre</code> y <code>puntos</code>', re:'nombre\\s*:|puntos\\s*:', pts:15},
        {label:'Define el método <code>sumarPunto</code> dentro del objeto', re:'sumarPunto\\s*:', pts:20},
        {label:'El método usa <code>this.puntos</code>', re:'this\\.\\s*puntos', pts:20},
        {label:'Extrae con destructuring <code>const { ... } = jugador</code>', re:'const\\s*\\{[^}]+\\}\\s*=\\s*jugador', pts:20},
        {label:'Copia con spread y sobrescribe puntos', re:'\\.\\.\\.\\s*jugador[\\s\\S]{0,30}puntos\\s*:', pts:20}
      ]}
  ]},

  /* -------- 2.2 -------- */
  { id:'2-2', title:'Funciones avanzadas: arrow functions y callbacks', time:'15 min', blocks:[
    {t:'p', h:'Ya sabes crear funciones. Ahora, las formas modernas y — más importante — el concepto que hace posible TODO JavaScript moderno: las funciones son <b>valores</b>. Se guardan en variables, se pasan como argumentos y se devuelven como resultados. Eso se llama <b>funciones de primera clase</b>.'},
    {t:'code', lang:'js', title:'las 3 caras de una misma función', code:
`// 1. Función clásica (declaración)
function duplicar(n) { return n * 2; }

// 2. Expresión de función (la función es un VALOR guardado)
const triplicar = function (n) { return n * 3; };

// 3. Arrow function (ES6): misma idea, sintaxis compacta
const cuadruplicar = (n) => { return n * 4; };
const quintuplicar = n => n * 5;        // 1 parámetro + 1 línea:
                                        // sin () ni {} ni return
cartas.forEach(c => console.log(c.emoji));  // por eso las verás siempre`},
    {t:'code', lang:'js', title:'callbacks: funciones que se pasan como argumentos', code:
`// Ya las usas sin saberlo:
cartas.forEach(function (carta) { ... });
//               ^^^^^^^^^^^^^^^^^^^ una función DENTRO de otra llamada

// Otro clásico: setTimeout ejecuta "después"
setTimeout(function () {
  console.log('Pasaron 700 ms');
}, 700);

// Y addEventListener:
tablero.addEventListener('click', function (e) { ... });

// Los callbacks son contratos: "toma esta función y llámala
// cuando toque". Tú no la ejecutas: la ENTREGAS.`},
    {t:'table', head:['Concepto','Detalle clave'], rows:[
      ['<code>function declarada</code>','Se puede usar antes de definirse (hoisting).'],
      ['<code>arrow function</code>','Compacta; NO define su propio <code>this</code> (hereda el del entorno).'],
      ['<code>parámetros por defecto</code>','<code>function saludo(nombre = "amigo")</code>'],
      ['<code>callback</code>','Función que se entrega a otra para que la llame cuando toque.']
    ]},
    {t:'info', title:'🔑 ¿Por qué importa para el juego?', h:'La lógica del Memoria es 90% callbacks: <code>setTimeout</code> para voltear de nuevo, <code>addEventListener</code> para los clics, <code>forEach/map/filter</code> para el mazo. Dominar “funciones como valores” es dominar JavaScript.'},
    {t:'warn', title:'⚠️ this en arrows', h:'Una función clásica crea su propio <code>this</code>; una arrow <b>hereda</b> el this del lugar donde fue escrita. En los métodos de clases usaremos funciones clásicas (para tener el this correcto) y en los callbacks de arrays, arrows. Esa combinación es la práctica estándar.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Cuál es una arrow function con un parámetro que devuelve el triple?', options:['const f = n => n * 3;','const f = (n) { return 3; };','function => n * 3','arrow f(n) * 3'], correct:0, pts:10, explain:'Un solo parámetro no necesita paréntesis; una sola expresión no necesita {} ni return.'},
      {type:'mc', q:'La función que pasas a <code>setTimeout</code> es…', options:['una variable','un callback: JS la llamará más tarde','un objeto','un evento'], correct:1, pts:10, explain:'Le entregas la función y el navegador la ejecuta cuando pase el tiempo.'},
      {type:'tf', q:'Las arrow functions crean su propio <code>this</code>, como las funciones clásicas.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: las arrows NO tienen this propio; heredan el del contexto donde se escriben.'},
      {type:'fill', q:'En <code>function saludo(nombre = "amigo")</code>, ¿cómo se llama el mecanismo del = "amigo"?:', accept:['parametros por defecto','parametro por defecto','valor por defecto','default'], re:'por\\s+defecto|default', show:'parámetros por defecto', pts:10, hint:'Permite llamar saludo() sin argumentos…'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 7 · Moderniza tus funciones',
      sub:'Convierte funciones clásicas a arrows de una línea y usa un callback con setTimeout. ▶ Ejecuta y califica.',
      file:'ejercicio-7.html', height:330,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 7</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12).</p>
  <script>
    // TODO 1: convierte a ARROW FUNCTION de una línea
    // function duplicar(n) { return n * 2; }
    const duplicar = ...;

    console.log(duplicar(21)); // 42

    // TODO 2: crea areaCirculo como arrow con DOS parámetros no,
    // uno solo: radio. Devuelve 3.1416 * radio * radio
    const areaCirculo = ...;
    console.log(areaCirculo(2)); // ~12.5664

    // TODO 3: usa setTimeout para imprimir '¡700 ms después!'
    // después de 700 milisegundos (pásale una arrow function)
    ...

    // TODO 4: saluda(nombre = 'amigo') como arrow CON parámetro por defecto
    const saluda = ...;
    console.log(saluda());        // 'Hola, amigo'
    console.log(saluda('Ana'));   // 'Hola, Ana'
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'<code>duplicar</code> es arrow de una línea (<code>=></code>)', re:'duplicar\\s*=\\s*\\(?\\s*\\w+\\s*\\)?\\s*=>', pts:20},
        {label:'<code>areaCirculo</code> calcula con <code>radio</code>', re:'areaCirculo\\s*=\\s*[\\s\\S]{0,60}radio', pts:20},
        {label:'Usa <code>setTimeout</code> con un callback', re:'setTimeout\\s*\\(', pts:20},
        {label:'<code>saluda</code> tiene parámetro por defecto', re:'=\\s*[\'"]amigo[\'"]', pts:20},
        {label:'Hay al menos una arrow con <code>=></code> y sin llaves (retorno implícito)', re:'=>\\s*[^{\\n]{2,}', pts:20}
      ]}
  ]},

  /* -------- 2.3 -------- */
  { id:'2-3', title:'Arrays de objetos: el mazo real del juego', time:'15 min', blocks:[
    {t:'p', h:'Ahora combinas todo: <b>un array cuyos elementos son objetos</b>. Es LA estructura de datos de la web moderna: productos de una tienda, usuarios de una app, mensajes de un chat… y las cartas de nuestro mazo. Dominar “array de objetos + map/filter/find” es dominar el 70% del trabajo diario de un desarrollador.'},
    {t:'code', lang:'js', title:'de emoji a carta', code:
`const EMOJIS = ['🎃', '👻', '🦇', '🕷️', '🍬', '🧙', '💀', '🕸️'];

const mazo = EMOJIS.map(function (emoji, i) {
  return { id: i, emoji: emoji, volteada: false, encontrada: false };
});

/* Resultado:
[
  { id:0, emoji:'🎃', volteada:false, encontrada:false },
  { id:1, emoji:'👻', ... },
  ...
] */`},
    {t:'code', lang:'js', title:'consultas sobre el mazo (con arrows)', code:
`// ¿Ya terminó el juego? (todas encontradas)
const gano = mazo.every(c => c.encontrada);

// ¿Cuántas están encontradas?
const encontradas = mazo.filter(c => c.encontrada).length;

// Buscar una carta por su id
const carta7 = mazo.find(c => c.id === 7);

// ¿En qué posición está? (para reemplazarla: mazo[pos] = nueva)
const pos = mazo.findIndex(c => c.id === 7);

// Nombres de las volteadas (transformación de array de objetos a array de strings)
const visibles = mazo
  .filter(c => c.volteada)
  .map(c => c.emoji);

// Ordenar por id (comparador numérico)
mazo.sort((a, b) => a.id - b.id);`},
    {t:'info', title:'🔑 El patrón índice-para-actualizar', h:'<code>findIndex</code> + asignación (<code>mazo[pos] = {...}</code>) era la forma clásica de actualizar un elemento. La forma inmutable moderna — la que usarás con spread — es: <code>mazo.map(c => c.id === 7 ? { ...c, volteada: true } : c)</code>. Lee el operador ternario así: “si su id es 7, dame una copia volteada; si no, déjala igual”.'},
    {t:'editor', file:'practica-mazo.html', height:280, code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Practica: mazo</title></head>
<body>
  <p id="salida"></p>
  <script>
    const EMOJIS = ['🎃', '👻', '🦇', '🕷️'];

    // 1. Crea el mazo: map a objetos
    let mazo = EMOJIS.map((emoji, i) => (
      { id: i, emoji: emoji, volteada: false, encontrada: false }
    ));

    // 2. Voltea la carta 1 y encuentra la 2 (forma inmutable con ternario)
    mazo = mazo.map(c =>
      c.id === 1 ? { ...c, volteada: true }
      : c.id === 2 ? { ...c, encontrada: true }
      : c
    );

    // 3. Consultas
    console.log('Volteadas:', mazo.filter(c => c.volteada).length);
    console.log('¿Ganó?:', mazo.every(c => c.encontrada));
    console.log('Carta del fantasma:', mazo.find(c => c.emoji === '👻'));

    document.getElementById('salida').textContent = 'Mira la consola (F12)';
  <\/script>
</body>
</html>
`},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>EMOJIS.map((e, i) => ({ id: i, emoji: e }))</code> produce…', options:['un número','un array de objetos con id y emoji','un string','un error de sintaxis'], correct:1, pts:10, explain:'map transforma cada emoji en un objeto; el resultado es el mazo con el que trabajará el juego.'},
      {type:'mc', q:'Contar las cartas encontradas se hace con…', options:['mazo.length','mazo.filter(c => c.encontrada).length','mazo.find(c => c.encontrada)','mazo.forEach(c => c.encontrada)'], correct:1, pts:10, explain:'filter selecciona y .length cuenta. Es el patrón estándar.'},
      {type:'fill', q:'Método para saber si TODAS las cartas ya fueron encontradas:', accept:['every'], re:'^\\s*every\\s*$', show:'mazo.every(c => c.encontrada)', pts:10, hint:'“todos” en inglés…'},
      {type:'mc', q:'¿Qué devuelve <code>c.id === 7 ? { ...c, volteada: true } : c</code> cuando c.id vale 5?', options:['una copia volteada','el mismo c, sin cambios','undefined','un error'], correct:1, pts:10, explain:'El ternario: si NO coincide, devuelve el elemento tal cual. Así map “solo toca” a la carta elegida.'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 8 · Consultas sobre el mazo',
      sub:'Dado un mazo de objetos, responde las preguntas típicas del juego: contar, buscar, verificar victoria y actualizar inmutablemente. ▶ Ejecuta y califica.',
      file:'ejercicio-8.html', height:340,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 8</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12).</p>
  <script>
    const mazo = [
      { id: 0, emoji: '🎃', volteada: true,  encontrada: true  },
      { id: 1, emoji: '👻', volteada: false, encontrada: true  },
      { id: 2, emoji: '🦇', volteada: true,  encontrada: false },
      { id: 3, emoji: '🕷️', volteada: false, encontrada: false }
    ];

    // TODO 1: ¿cuántas están encontradas? (filter + length)
    const encontradas = ...;
    console.log('Encontradas:', encontradas); // 2

    // TODO 2: busca la carta del murciélago ('🦇') con find
    const murcielago = ...;
    console.log('Carta 🦇:', murcielago);

    // TODO 3: ¿ya ganó? (every)
    const gano = ...;
    console.log('¿Victoria?:', gano); // false

    // TODO 4: lista los emojis de las cartas VOLTEADAS (filter + map)
    const visibles = ...;
    console.log('Visibles:', visibles); // ['🎃','🦇']

    // TODO 5: crea mazoActualizado: igual, pero la carta id 3
    // queda volteada:true (map + ternario + spread, SIN mutar)
    const mazoActualizado = ...;
    console.log('id 3 actualizada:', mazoActualizado[3]);
    console.log('original intacto:', mazo[3].volteada); // false
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'Cuenta con <code>filter(...).length</code>', re:'\\.\\s*filter\\s*\\([\\s\\S]{0,50}\\)\\s*\\.\\s*length', pts:20},
        {label:'Busca con <code>find</code> por emoji 🦇', re:'\\.\\s*find\\s*\\(', pts:15},
        {label:'Verifica victoria con <code>every</code>', re:'\\.\\s*every\\s*\\(', pts:15},
        {label:'Encadena <code>filter(...).map(...)</code> para los visibles', re:'\\.\\s*filter\\s*\\([\\s\\S]*?\\.\\s*map\\s*\\(', pts:20},
        {label:'Actualiza inmutablemente con map + ternario + spread', re:'\\.\\s*map\\s*\\([\\s\\S]{0,80}\\?\\s*[\\s\\S]{0,40}\\.\\.\\.', pts:20}
      ]}
  ]},

  /* -------- 2.4 -------- */
  { id:'2-4', title:'🛠️ Proyecto del módulo: el mazo de objetos', time:'18 min', blocks:[
    {t:'p', h:'Integrador del Módulo 2: la versión REAL de <code>crearMazo()</code> — la que usará el juego. Cada carta será un objeto con <code>id</code> único, <code>emoji</code>, <code>volteada</code> y <code>encontrada</code>, todo barajado con Fisher-Yates.'},
    {t:'info', title:'🔑 ¿Por qué cada carta necesita un id?', h:'El DOM y el mazo se comunican por el id: al hacer clic, el elemento HTML te dirá <code>data-id="7"</code> y tú buscarás la carta 7 en el mazo. Sin id único, sería imposible saber qué carta física corresponde a qué dato.'},
    {t:'exercise', title:'🛠️ Proyecto · el mazo de objetos',
      sub:'Une las piezas: <code>crearMazo()</code> debe generar los 8 pares como OBJETOS con id único, emoji, volteada y encontrada, barajados con Fisher-Yates. ▶ Ejecuta, revisa la consola y califica.',
      file:'proyecto-2.html', height:400,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Proyecto 2: mazo de objetos</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12). Debe imprimir 16 objetos.</p>
  <script>
    const EMOJIS = ['🎃', '👻', '🦇', '🕷️', '🍬', '🧙', '💀', '🕸️'];

    function barajar(array) {
      const copia = [...array];
      for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
      }
      return copia;
    }

    function crearMazo() {
      // TODO 1: crea el array duplicando los emojis:
      // const emojisDuplicados = [...EMOJIS, ...EMOJIS];


      // TODO 2: transforma (map) ese array en objetos de carta:
      // { id: n, emoji: e, volteada: false, encontrada: false }
      // (puedes usar el índice del map como id)
      const cartas = ...;


      // TODO 3: baraja las cartas y devuélvelas
      return ...;
    }

    const mazo = crearMazo();
    console.log('Total:', mazo.length);            // 16
    console.log('Primeras 3:', mazo.slice(0, 3));
    console.log('Pares de 👻:', mazo.filter(c => c.emoji === '👻').length); // 2
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'Duplica los emojis (spread o concat)', re:'\\.\\.\\.\\s*EMOJIS\\s*,\\s*\\.\\.\\.\\s*EMOJIS|EMOJIS\\.concat\\(EMOJIS\\)', pts:20},
        {label:'Usa <code>.map()</code> para crear los objetos', re:'\\.\\s*map\\s*\\(', pts:20},
        {label:'Cada carta tiene <code>emoji</code>, <code>volteada</code> y <code>encontrada</code>', re:'emoji[\\s\\S]*volteada[\\s\\S]*encontrada|encontrada[\\s\\S]*volteada[\\s\\S]*emoji', pts:25},
        {label:'Usa <code>false</code> como estado inicial', re:'volteada\\s*:\\s*false|volteada\\s*=\\s*false', pts:10},
        {label:'Baraja antes de devolver (<code>barajar(...)</code>)', re:'return\\s+barajar\\s*\\(|barajar\\s*\\(', pts:25}
      ]}
  ]}
]});
