/* ============================ MÓDULO 3: CLASES Y POO ============================ */
MODULES.push({
  id:'m3', emoji:'🏛️', name:'Clases y POO', color:'#7c3aed',
  desc:'Los 4 fundamentos: abstracción, encapsulamiento, herencia y polimorfismo.',
  lessons:[

  /* -------- 3.1 -------- */
  { id:'3-1', title:'Clases: el molde para crear cartas', time:'15 min', blocks:[
    {t:'p', h:'Hasta ahora cada carta era un objeto literal escrito a mano. Pero si todas comparten la misma <b>forma</b> y la misma <b>lógica</b>, lo profesional es definir un <b>molde</b>: una <b>clase</b>. Piensa en un molde de galletas 🍪: una sola clase, infinitas galletas (objetos) con la misma forma pero su propio betún. A cada galleta producida se le llama <b>instancia</b>.'},
    {t:'code', lang:'js', title:'anatomía de una clase', code:
`class Carta {
  constructor(emoji) {
    // se ejecuta AL CREAR cada carta con "new"
    this.emoji = emoji;
    this.volteada = false;
    this.encontrada = false;
  }

  // métodos: lo que la carta SABE hacer
  voltear() {
    this.volteada = !this.volteada;
  }

  revelar() {
    this.volteada = true;
    this.encontrada = true;
  }
}

// "new" fabrica instancias:
const c1 = new Carta('🎃');
const c2 = new Carta('👻');
c1.voltear();
console.log(c1.volteada);  // true
console.log(c2.volteada);  // false (cada una tiene SU estado)`},
    {t:'table', head:['Pieza','Qué hace'], rows:[
      ['<code>class Carta {…}</code>','Declara el molde (el nombre va en MayúsculaPorConvención).'],
      ['<code>constructor(...)</code>','Se ejecuta una vez al crear el objeto: coloca las propiedades iniciales.'],
      ['<code>this</code>','“Este objeto concreto”: <code>c1.voltear()</code> → this es c1.'],
      ['<code>new Carta(...)</code>','Fabrica una instancia nueva.'],
      ['métodos','Funciones que viven dentro de la clase y las comparten TODAS las instancias.']
    ]},
    {t:'info', title:'🔑 Detrás de cámara: prototipos', h:'JavaScript no tenía clases al nacer: usa <b>prototipos</b>. <code>class</code> (ES6, 2015) es azúcar sintáctica: los métodos no se copian en cada objeto, viven una sola vez en <code>Carta.prototype</code> y todos los objetos los comparten por delegación. Eficiente y elegante — el <code>class</code> es la forma moderna de escribirlo. (El libro de texto de este curso tiene el capítulo completo.)'},
    {t:'p', h:'¿Y por qué clases y no objetos sueltos? Tres razones que verás en carne propia: 1) <b>menos errores</b> — el constructor garantiza que toda carta nazca con sus propiedades correctas; 2) <b>un solo lugar para cambiar</b> la lógica; 3) <b>legibilidad</b>: leer <code>new Carta("👻")</code> comunica la intención al instante.'},
    {t:'editor', file:'practica-clase.html', height:270, code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Practica: clases</title></head>
<body>
  <p id="salida"></p>
  <script>
    class Carta {
      constructor(emoji) {
        this.emoji = emoji;
        this.volteada = false;
      }
      voltear() {
        this.volteada = !this.volteada;
        return this;   // devolver this permite encadenar: c.voltear().voltear()
      }
    }

    const c1 = new Carta('🎃');
    const c2 = new Carta('👻');

    c1.voltear();
    c2.voltear().voltear();   // doble volteo = como al inicio

    console.log('c1 volteada:', c1.volteada);  // true
    console.log('c2 volteada:', c2.volteada);  // false
    console.log('¿Son el mismo objeto?', c1 === c2);  // false

    document.getElementById('salida').textContent = 'Mira la consola (F12)';
  <\/script>
</body>
</html>
`},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Para qué sirve el <code>constructor</code>?', options:['Para destruir el objeto','Para inicializar las propiedades al crear con new','Para nombrar la clase','Es obligatorio en todas las clases'], correct:1, pts:10, explain:'Es el método de arranque: recibe los datos y coloca el estado inicial del objeto.'},
      {type:'mc', q:'<code>c1.voltear()</code> — dentro del método, <code>this</code> es…', options:['la clase Carta','el objeto c1','undefined siempre','una variable global'], correct:1, pts:10, explain:'this es la instancia que llama: por eso c1 y c2 tienen estados independientes.'},
      {type:'fill', q:'Palabra clave para fabricar una instancia de una clase:', accept:['new'], re:'^\\s*new\\s*$', show:'const c1 = new Carta("🎃")', pts:10, hint:'En inglés: “nuevo”.'},
      {type:'mc', q:'¿Dónde viven realmente los métodos de una clase para compartirse?', options:['Se copian en cada objeto','En Carta.prototype, compartidos por delegación','En el localStorage','En el constructor'], correct:1, pts:10, explain:'Una copia por clase (no por objeto): eficiente y por eso las clases funcionan bien con miles de instancias.'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 9 · Tu primera clase: Jugador',
      sub:'Crea la clase <code>Jugador</code> (para la tabla de récords): constructor con nombre y puntos, método <code>sumarPunto()</code>, método <code>presentar()</code> que devuelva un texto, y fabrica dos jugadores independientes. ▶ Ejecuta y califica.',
      file:'ejercicio-9.html', height:330,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 9</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12).</p>
  <script>
    // TODO: define la clase Jugador
    class Jugador {
      // 1. constructor(nombre): guarda nombre y puntos = 0
      ...

      // 2. sumarPunto(): aumenta this.puntos en 1
      ...

      // 3. presentar(): devuelve "Ana tiene 2 puntos"
      ...
    }

    // ===== Pruebas (no tocar) =====
    const ana = new Jugador('Ana');
    const beto = new Jugador('Beto');
    ana.sumarPunto();
    ana.sumarPunto();
    beto.sumarPunto();
    console.log(ana.presentar());     // Ana tiene 2 puntos
    console.log(beto.presentar());    // Beto tiene 1 punto
    console.log('¿Instancias distintas?', ana !== beto); // true
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'Declara <code>class Jugador</code>', re:'class\\s+Jugador', pts:20},
        {label:'El constructor recibe <code>nombre</code> y asigna <code>this.nombre</code>', re:'constructor\\s*\\(\\s*nombre[^)]*\\)[\\s\\S]{0,40}this\\.\\s*nombre\\s*=', pts:20},
        {label:'<code>sumarPunto()</code> incrementa <code>this.puntos</code>', re:'this\\.\\s*puntos\\s*(\\+=|\\+\\+|=\\s*this\\.\\s*puntos\\s*\\+\\s*1)', pts:20},
        {label:'<code>presentar()</code> devuelve texto con nombre y puntos', re:'presentar\\s*\\(\\s*\\)\\s*\\{[\\s\\S]*return[\\s\\S]*(this\\.\\s*nombre[\\s\\S]*this\\.\\s*puntos|this\\.\\s*puntos[\\s\\S]*this\\.\\s*nombre)', pts:25},
        {label:'Crea al menos una instancia con <code>new Jugador(...)</code>', re:'new\\s+Jugador\\s*\\(', pts:15}
      ]}
  ]},

  /* -------- 3.2 -------- */
  { id:'3-2', title:'Encapsulamiento: campos privados con #', time:'15 min', blocks:[
    {t:'p', h:'Primer pilar de la POO: <b>encapsulamiento</b> — cada objeto cuida SUS datos y no permite que otros los ensucien. En JS moderno se logra con <b>campos privados</b>: el símbolo <code>#</code>. Lo privado solo lo toca la propia clase; el resto del mundo usa <b>getters y setters</b> (puertas con vigilante 🚪).'},
    {t:'code', lang:'js', title:'#privado + get/set', code:
`class Carta {
  #emoji;        // campo privado: solo la clase lo ve
  #volteada = false;

  constructor(emoji) {
    this.#emoji = emoji;
  }

  get emoji() {          // lectura vigilada
    return this.#emoji;
  }

  get volteada() {
    return this.#volteada;
  }

  voltear() {            // el cambio SOLO pasa por aquí
    this.#volteada = !this.#volteada;
  }
}

const c = new Carta('🦇');
console.log(c.emoji);        // '🦇'  (vía getter — sin paréntesis)
c.#emoji = '💀';             // ❌ SyntaxError: es privado
c.voltear();
console.log(c.volteada);     // true (vía getter)`},
    {t:'info', title:'🔑 ¿Por qué tanto protocolo?', h:'Sin privacidad, cualquier código puede hacer <code>carta.encontrada = true</code> y hacer trampa (o romper el juego por accidente). Con encapsulamiento, la única forma de cambiar el estado es <code>voltear()</code> o <code>revelar()</code>: si hay un bug de estado, está en UN lugar. Así se construyen programas confiables.'},
    {t:'h', h:'Setters: puertas con validación'},
    {t:'code', lang:'js', title:'el setter decide QUÉ entra', code:
`class Jugador {
  #nombre;
  #puntos = 0;

  constructor(nombre) { this.nombre = nombre; }  // usa el setter

  get nombre() { return this.#nombre; }
  set nombre(valor) {
    valor = String(valor).trim();
    if (valor.length < 2) throw new Error('Nombre demasiado corto');
    this.#nombre = valor;
  }

  get puntos() { return this.#puntos; }
}

const j = new Jugador('Ana');
j.nombre = 'Ana M.';   // ✓ pasa la puerta
j.nombre = '   ';      // 💥 Error: la validación lo rechaza
console.log(j.puntos); // getter: 0`},
    {t:'table', head:['Pilar','En este curso','Ejemplo'], rows:[
      ['<b>1. Abstracción</b>','Modelar lo esencial, esconder lo irrelevante','La clase Carta: solo importa emoji y estado'],
      ['<b>2. Encapsulamiento</b>','Datos protegidos + acceso controlado','<code>#volteada</code> + <code>voltear()</code>'],
      ['<b>3. Herencia</b>','Clases hijas reutilizan y extienden','<code>extends</code> (lección siguiente)'],
      ['<b>4. Polimorfismo</b>','Mismo mensaje, comportamientos distintos','Sobrescribir métodos (lección siguiente)']
    ]},
    {t:'quiz', questions:[
      {type:'mc', q:'El encapsulamiento consiste en…', options:['comprimir el código','proteger los datos del objeto y controlar su acceso con métodos','copiar objetos con spread','envolver el HTML'], correct:1, pts:10, explain:'Los campos privados (#) + getters/setters garantizan que el estado solo cambie por las puertas que TÚ defines.'},
      {type:'mc', q:'<code>c.#emoji = "💀"</code> desde FUERA de la clase…', options:['funciona bien','crea una propiedad nueva','lanza un SyntaxError porque #emoji es privado','convierte la clase en objeto'], correct:2, pts:10, explain:'Acceder a un campo privado desde fuera es error de sintaxis: la protección es real.'},
      {type:'fill', q:'Símbolo que marca un campo como privado en las clases de JS:', accept:['#','hash','numeral'], re:'^\\s*#\\s*$', show:'#volteada', pts:10, hint:'Se usa para los temas…'},
      {type:'mc', q:'Un <code>set nombre(valor)</code> con validación sirve para…', options:['leer el nombre','decidir qué valores son aceptables antes de guardarlos','borrar el nombre','renombrar la clase'], correct:1, pts:10, explain:'El setter es el aduana del dato: puede rechazar, limpiar o normalizar antes de asignar.'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 10 · La Billetera blindada',
      sub:'Modela una <code>Billetera</code> con el saldo PRIVADO: solo puede cambiar por <code>depositar()</code> y <code>retirar()</code> (que valida que alcance). ▶ Ejecuta y califica.',
      file:'ejercicio-10.html', height:340,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 10</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12).</p>
  <script>
    class Billetera {
      // TODO 1: campo privado #saldo que inicie en 0
      ...

      // TODO 2: getter get saldo() que devuelva el campo privado
      ...

      // TODO 3: depositar(monto): si monto > 0, súmalo al saldo
      ...

      // TODO 4: retirar(monto): SOLO resta si monto > 0 Y hay saldo
      // suficiente. Devuelve true si pudo, false si no.
      ...
    }

    // ===== Pruebas (no tocar) =====
    const b = new Billetera();
    b.depositar(100);
    b.depositar(-50);          // no debe afectar
    console.log(b.saldo);      // 100
    console.log(b.retirar(30));  // true
    console.log(b.retirar(999)); // false (no alcanza)
    console.log(b.saldo);      // 70
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'Declara el campo privado <code>#saldo = 0</code>', re:'#saldo\\s*=\\s*0', pts:20},
        {label:'Define <code>get saldo()</code>', re:'get\\s+saldo\\s*\\(\\s*\\)', pts:20},
        {label:'<code>depositar</code> valida que el monto sea positivo', re:'depositar[\\s\\S]{0,80}(monto\\s*>\\s*0|monto\\s*>=?)', pts:20},
        {label:'<code>retirar</code> valida que haya saldo suficiente', re:'retirar[\\s\\S]{0,120}(saldo|<)', pts:20},
        {label:'<code>retirar</code> devuelve true/false', re:'retirar[\\s\\S]*return\\s+true[\\s\\S]*return\\s+false|retirar[\\s\\S]*return\\s+false[\\s\\S]*return\\s+true', pts:20}
      ]}
  ]},

  /* -------- 3.3 -------- */
  { id:'3-3', title:'Herencia y polimorfismo: extends y super', time:'15 min', blocks:[
    {t:'p', h:'Tercer y cuarto pilar. <b>Herencia</b>: una clase hija <b>extiende</b> a una padre y recibe gratis sus propiedades y métodos, agregando los suyos. <b>Polimorfismo</b>: “muchas formas” — objetos distintos responden al MISMO método cada uno a su manera. Juntos son la razón por la que las apps grandes no se convierten en spaghetti.'},
    {t:'code', lang:'js', title:'herencia con extends y super', code:
`class Carta {                        // clase padre
  constructor(emoji) {
    this.emoji = emoji;
    this.volteada = false;
  }
  voltear() {
    this.volteada = !this.volteada;
  }
  descripcion() {
    return 'Carta ' + this.emoji;
  }
}

class CartaComodin extends Carta {   // clase hija
  constructor(emoji, poder) {
    super(emoji);        // llama al constructor del PADRE (obligatorio)
    this.poder = poder;  // lo nuevo de la hija
  }
  usarPoder() {
    console.log('✨ Poder: ' + this.poder);
  }
  // POLIMORFISMO: sobrescribimos el método del padre
  descripcion() {
    return 'COMODÍN ' + this.emoji + ' (' + this.poder + ')';
  }
}

const normal = new Carta('🎃');
const comodin = new CartaComodin('🃏', 'voltea todas');

normal.descripcion();    // 'Carta 🎃'
comodin.descripcion();   // 'COMODÍN 🃏 (voltea todas)'
comodin.voltear();       // heredado del padre, funciona igual
comodin.usarPoder();     // solo la hija lo tiene
comodin instanceof CartaComodin  // true
comodin instanceof Carta         // true (¡también!)`},
    {t:'info', title:'🔑 super y la cadena de prototipos', h:'<code>super(...)</code> invoca al constructor padre — debe ir primero en el constructor de la hija. Tras <code>extends</code>, <code>instanceof</code> confirma la cadena: un comodín ES una carta. Polimorfismo real: puedes recorrer un array mixto de cartas y llamar <code>descripcion()</code> a todas; cada una responde a su modo.'},
    {t:'code', lang:'js', title:'el superpoder: un array mixto', code:
`const mazo = [new Carta('🎃'), new CartaComodin('🃏', 'doble turno'), new Carta('👻')];

mazo.forEach(c => console.log(c.descripcion()));
// Carta 🎃
// COMODÍN 🃏 (doble turno)   ← cada clase respondió a SU manera
// Carta 👻
// No importó el tipo: el mismo "mensaje" descripción(), respuestas distintas.`},
    {t:'warn', title:'⚠️ Herencia con moderación', h:'La herencia es poderosa pero fácil de abusar (jerarquías gigantes imposibles de mantener). Regla práctica: hereda solo cuando la hija ES genuinamente una versión del padre (“un comodín ES una carta”). Para reusar comportamiento sin parentesco, la industria prefiere <b>composición</b> (armar objetos con partes).'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué hace <code>super(emoji)</code> en el constructor de la hija?', options:['Crea una superclase','Llama al constructor de la clase padre','Reinicia la clase','Nada, es decorativo'], correct:1, pts:10, explain:'Delega al padre la inicialización que le corresponde; debe ejecutarse antes de usar this.'},
      {type:'mc', q:'Si CartaComodin define su propio <code>descripcion()</code>, las instancias de la hija…', options:['dan error','usan la versión del padre siempre','usan SU versión: eso es polimorfismo','pierden los métodos heredados'], correct:2, pts:10, explain:'Sobrescribir métodos es el corazón del polimorfismo: mismo mensaje, respuesta según la clase real.'},
      {type:'fill', q:'Palabra clave para que una clase herede de otra:', accept:['extends'], re:'^\\s*extends\\s*$', show:'class Hija extends Padre', pts:10, hint:'En inglés: “extiende”.'},
      {type:'tf', q:'Después de <code>class Comodin extends Carta</code>, un <code>new Comodin()</code> también es <code>instanceof Carta</code>.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Verdadero: la cadena de herencia lo confirma. Todo comodín es, además, una carta.'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 11 · El zoológico polimórfico',
      sub:'Clásico de entrevistas y perfecto para fijar los dos pilares: <code>Animal</code> (padre), <code>Perro</code> y <code>Gato</code> (hijas) que sobrescriben <code>hablar()</code>. Al final, recorre el array mixto. ▶ Califica.',
      file:'ejercicio-11.html', height:340,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 11</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12).</p>
  <script>
    // TODO 1: clase Animal con constructor(nombre) y metodo hablar()
    // que devuelva "nombre hace un sonido"
    class Animal {
      ...
    }

    // TODO 2: clase Perro extends Animal:
    // su constructor llama super(nombre); hablar() devuelve "Guau"
    class Perro {
      ...
    }

    // TODO 3: clase Gato extends Animal con hablar() -> "Miau"
    class Gato {
      ...
    }

    // ===== Pruebas (no tocar) =====
    const animales = [new Perro('Rocco'), new Gato('Misu'), new Animal('Bicho')];
    animales.forEach(a => console.log(a.hablar()));
    // Rocco hace Guau · Misu hace Miau · Bicho hace un sonido
    console.log(new Perro('Rocco') instanceof Animal); // true
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'Declara <code>class Animal</code> con constructor y <code>hablar()</code>', re:'class\\s+Animal[\\s\\S]*hablar\\s*\\(\\s*\\)', pts:20},
        {label:'<code>Perro extends Animal</code>', re:'class\\s+Perro\\s+extends\\s+Animal', pts:20},
        {label:'El constructor de Perro llama a <code>super(nombre)</code>', re:'class\\s+Perro[\\s\\S]{0,80}super\\s*\\(\\s*\\w+\\s*\\)', pts:20},
        {label:'Perro y Gato sobrescriben <code>hablar()</code> (polimorfismo)', re:'class\\s+Perro[\\s\\S]*hablar[\\s\\S]*class\\s+Gato[\\s\\S]*hablar', pts:20},
        {label:'Recorre el array mixto llamando <code>hablar()</code> a cada uno', re:'forEach[\\s\\S]*hablar\\s*\\(\\s*\\)|for[\\s\\S]*hablar\\s*\\(\\s*\\)', pts:20}
      ]}
  ]},

  /* -------- 3.4 -------- */
  { id:'3-4', title:'Abstracción: diseñando la clase JuegoMemoria', time:'14 min', blocks:[
    {t:'p', h:'Cuarto pilar: <b>abstracción</b> — decidir QUÉ debe saber y QUÉ debe saber hacer un objeto, sin ensuciarlo con detalles. Antes de escribir el juego, diseñamos. Es lo que hace un ingeniero antes de teclear 📐: primero el plano, después el edificio.'},
    {t:'h', h:'El plano de nuestra clase principal'},
    {t:'table', head:['Parte de JuegoMemoria','Tipo','Responsabilidad'], rows:[
      ['<code>#mazo</code>','propiedad privada','El array de cartas (objetos Carta).'],
      ['<code>#primera</code> / <code>#segunda</code>','propiedades privadas','Las cartas volteadas en el turno actual.'],
      ['<code>#bloqueado</code>','propiedad privada','true mientras se resuelve un par (evita clics locos).'],
      ['<code>#intentos</code>','propiedad privada','Cuántos pares de volteos ha hecho el jugador.'],
      ['<code>constructor(emojis)</code>','método','Crea y baraja el mazo.'],
      ['<code>voltearCarta(id)</code>','método','La acción central: valida el turno y reporta qué pasó.'],
      ['<code>resolver()</code>','método','Compara el par: coinciden → revelar; no → voltear de nuevo.'],
      ['<code>estaResuelto()</code>','método','¿Ya se encontraron todas?'],
      ['<code>#crearMazo(emojis)</code>','método PRIVADO','Detalle interno: fabricar y barajar.']
    ]},
    {t:'code', lang:'js', title:'el esqueleto (lo llenaremos en el Módulo 5)', code:
`class JuegoMemoria {
  #mazo = [];
  #primera = null;
  #segunda = null;
  #bloqueado = false;
  #intentos = 0;

  constructor(emojis) {
    this.#mazo = this.#crearMazo(emojis);
  }

  #crearMazo(emojis) {
    // método privado: detalle interno del juego
    return barajar([...emojis, ...emojis].map((e, i) => new Carta(e)));
  }

  voltearCarta(id) {
    if (this.#bloqueado) return 'bloqueado';   // regla de negocio
    // ... lógica del turno (Módulo 5)
  }

  estaResuelto() {
    return this.#mazo.every(c => c.encontrada);
  }
}`},
    {t:'info', title:'🔑 Métodos privados también existen', h:'<code>#crearMazo()</code> es un <b>método privado</b>: detalle interno que el mundo exterior no debe llamar. La abstracción define una <b>interfaz pública</b> mínima (voltearCarta, resolver, estaResuelto) y esconde todo lo demás. Menos superficie = menos bugs.'},
    {t:'h', h:'La separación modelo ↔ interfaz'},
    {t:'p', h:'Fíjate en la decisión de diseño más importante del juego: <code>voltearCarta()</code> <b>no toca el DOM</b>. Se limita a cambiar el estado y <b>devolver un reporte</b> ("primera", "segunda", "bloqueado"). Quien pinta es el código de la vista. Esta separación (modelo = reglas, vista = pantalla) hace el juego testeable, reutilizable y fácil de depurar. Es la misma idea estado→render que ya aplicaste en la Lista de Tareas, ahora con clase propia.'},
    {t:'tip', title:'💡 Regla de oro del diseño', h:'Si un dato o método empieza a usarse desde fuera, no lo hagas público por flojera: pregúntate “¿tiene sentido en la interfaz de mi objeto?”. Los buenos objetos son como buenos empleados: haces el pedido, no revisas sus bolsillos.'},
    {t:'quiz', questions:[
      {type:'mc', q:'La abstracción significa que la clase…', options:['tiene el máximo de métodos públicos','expone solo lo esencial y esconde los detalles internos','no puede tener propiedades','es siempre la más larga'], correct:1, pts:10, explain:'Interfaz pública mínima + detalles privados: así se piensa un sistema grande.'},
      {type:'mc', q:'¿Por qué <code>#bloqueado</code> como estado del juego?', options:['Para decorar','Para ignorar clics mientras se resuelve un par (evita voltear 5 cartas a la vez)','Porque JS lo exige','Para guardar récords'], correct:1, pts:10, explain:'Es la regla “solo 2 cartas abiertas”: mientras comparas, el tablero está bloqueado.'},
      {type:'mc', q:'<code>estaResuelto()</code> se implementa elegantemente con…', options:['un bucle infinito','mazo.every(c => c.encontrada)','mazo.push()','un setTimeout'], correct:1, pts:10, explain:'every devuelve true solo si TODAS las cartas están encontradas: la condición de victoria en una línea.'},
      {type:'tf', q:'Según la separación modelo↔vista, voltearCarta() debería actualizar directamente el HTML de las cartas.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: el modelo cambia el estado y REPORTA; la vista (render) decide cómo pintarlo.'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 12 · Diseña el plano (sin código de juego)',
      sub:'Practica el diseño abstracto: crea la clase <code>Temporizador</code> con interfaz pública mínima y estados privados — el componente que usará el cronómetro del juego. ▶ Califica.',
      file:'ejercicio-12.html', height:340,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 12</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12).</p>
  <script>
    class Temporizador {
      // TODO 1: campos privados #segundos = 0 y #corriendo = false
      ...

      // TODO 2: getter get segundos()
      ...

      // TODO 3: getter get corriendo() (¿está activo?)
      ...

      // TODO 4: tick(): si está corriendo, suma 1 segundo
      ...

      // TODO 5: detener(): pone #corriendo en false
      ...

      // TODO 6: reiniciar(): cero segundos Y detenido
      ...
    }

    // ===== Pruebas (no tocar) =====
    const t = new Temporizador();
    t.tick();                       // no corre: no suma
    console.log(t.segundos);        // 0
    console.log(t.corriendo);       // false
    t.reiniciar();
    console.log('Listo para el Módulo 5');
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'Campos privados <code>#segundos</code> y <code>#corriendo</code>', re:'#segundos[\\s\\S]*#corriendo|#corriendo[\\s\\S]*#segundos', pts:20},
        {label:'Getters <code>get segundos()</code> y <code>get corriendo()</code>', re:'get\\s+segundos\\s*\\(\\s*\\)[\\s\\S]*get\\s+corriendo\\s*\\(\\s*\\)', pts:20},
        {label:'<code>tick()</code> solo suma si <code>#corriendo</code> es true', re:'tick[\\s\\S]{0,120}#corriendo', pts:20},
        {label:'<code>detener()</code> apaga <code>#corriendo</code>', re:'detener[\\s\\S]{0,80}#corriendo\\s*=\\s*false', pts:20},
        {label:'<code>reiniciar()</code> pone segundos en cero', re:'reiniciar[\\s\\S]{0,120}#segundos\\s*=\\s*0', pts:20}
      ]}
  ]},

  /* -------- 3.5 -------- */
  { id:'3-5', title:'🛠️ Proyecto del módulo: la clase Carta completa', time:'17 min', blocks:[
    {t:'exercise', title:'🛠️ Proyecto · clase Carta con encapsulamiento',
      sub:'Escribe la clase Carta con campos privados, constructor, getters para emoji/volteada/encontrada, método voltear() y método revelar(). Es LA clase que usará el juego final. ▶ Prueba y califica. Puedes apoyarte en las lecciones 3.1 y 3.2.',
      file:'proyecto-3.html', height:380,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Proyecto 3: clase Carta</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12).</p>
  <script>
    // TODO: completa la clase Carta
    class Carta {
      // 1. campos privados: #emoji, #volteada (false) y #encontrada (false)


      constructor(id, emoji) {
        // 2. guarda id (público) y emoji (privado)
        this.id = id;
        ...
      }

      // 3. getters: get emoji(), get volteada(), get encontrada()


      // 4. voltear(): alterna #volteada


      // 5. revelar(): volteada = true y encontrada = true


      // 6. ocultar(): volteada = false (para los pares fallidos)
      ...
    }

    // ===== Pruebas (no tocar) =====
    const c = new Carta(7, '🧙');
    console.log('id:', c.id, '· emoji:', c.emoji);   // 7 · 🧙
    console.log('inicial:', c.volteada);             // false
    c.voltear();
    console.log('tras voltear:', c.volteada);        // true
    c.revelar();
    console.log('encontrada:', c.encontrada);        // true
    c.ocultar();
    console.log('tras ocultar (sigue encontrada):', c.volteada, c.encontrada); // false true
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'Declara campos privados con <code>#</code>', re:'#emoji[\\s\\S]*#volteada|#volteada[\\s\\S]*#emoji', pts:20},
        {label:'El constructor guarda el emoji privado', re:'this\\.\\s*#emoji\\s*=', pts:15},
        {label:'Define getter <code>get emoji()</code>', re:'get\\s+emoji\\s*\\(\\s*\\)', pts:15},
        {label:'<code>voltear()</code> alterna el estado (usa <code>!</code> o if/else)', re:'!\\s*this\\.\\s*#volteada|#volteada\\s*=\\s*!', pts:20},
        {label:'<code>revelar()</code> marca volteada y encontrada', re:'#encontrada\\s*=\\s*true', pts:15},
        {label:'Define el campo/campo-getter <code>encontrada</code>', re:'#encontrada|get\\s+encontrada', pts:15}
      ]}
  ]}
]});

/* ============================ MÓDULO 4: DOM Y EVENTOS DEL JUEGO ============================ */
MODULES.push({
  id:'m4', emoji:'🎮', name:'DOM y eventos', color:'#f59e0b',
  desc:'Del array al tablero: render, clics, animaciones de volteo y la lógica del match.',
  lessons:[

  /* -------- 4.1 -------- */
  { id:'4-1', title:'Renderizar el tablero: del array al DOM', time:'15 min', blocks:[
    {t:'p', h:'Ya tienes el mazo en memoria. Ahora lo <b>pintamos</b>: por cada carta, crear un elemento en el tablero. El patrón es el mismo de tu lista de tareas (recuerda <code>createElement + appendChild</code>), pero multiplicado por 16 — y hay una forma más eficiente de hacerlo en lote: el <b>DocumentFragment</b>.'},
    {t:'code', lang:'js', title:'render del tablero con DocumentFragment', code:
`const tablero = document.getElementById('tablero');

function renderizar(juego) {
  tablero.innerHTML = '';            // limpiamos el tablero

  const fragmento = document.createDocumentFragment();

  juego.mazo.forEach(function (carta) {
    const div = document.createElement('div');
    div.className = 'carta' + (carta.volteada ? ' volteada' : '');
    div.dataset.id = carta.id;       // ← guardamos el id en el HTML
    div.innerHTML =
      '<div class="carta-interior">' +
      '  <div class="carta-frente">?</div>' +
      '  <div class="carta-atras">' + carta.emoji + '</div>' +
      '</div>';
    fragmento.appendChild(div);
  });

  tablero.appendChild(fragmento);    // UN solo golpe de render
}`},
    {t:'info', title:'🔑 ¿Por qué DocumentFragment?', h:'Cada <code>appendChild</code> al documento puede provocar recálculos de pantalla. El <b>fragmento</b> es un contenedor invisible en memoria: armas las 16 cartas ahí y las insertas <b>de una sola vez</b>. Con 16 cartas casi no se nota; con 500, marca la diferencia. Es la técnica estándar de render por lotes.'},
    {t:'info', title:'🔑 dataset: metadatos en el HTML', h:'<code>div.dataset.id = carta.id</code> crea el atributo <code>data-id="3"</code>. Luego, en el clic, <code>el.dataset.id</code> te devuelve "3" (texto). Es el puente oficial entre el DOM y tu modelo de datos — sin variables globales ni trucos raros.'},
    {t:'warn', title:'⚠️ innerHTML + datos del usuario = peligro (repaso)', h:'Aquí usamos <code>innerHTML</code> con estructura FIJA de la app y el emoji del mazo (nuestro propio dato, controlado). Con texto de USUARIOS, la regla del curso anterior sigue vigente: <code>textContent</code> siempre. Más detalles en el libro de texto (capítulo DOM, sección XSS).'},
    {t:'editor', file:'practica-tablero.html', height:300, code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Practica: tablero</title>
<style>
  #tablero { display: grid; grid-template-columns: repeat(4, 70px);
             gap: 8px; justify-content: center; margin-top: 14px; }
  .carta { width: 70px; height: 70px; background: #6366f1; color: #fff;
           border-radius: 10px; display: grid; place-items: center;
           font-size: 32px; cursor: pointer; }
  .carta.volteada { background: #fff; border: 2px solid #6366f1; }
</style>
</head>
<body>
  <div id="tablero"></div>
  <script>
    const EMOJIS = ['🎃', '👻', '🦇', '🕷️'];
    const tablero = document.getElementById('tablero');

    const fragmento = document.createDocumentFragment();
    EMOJIS.forEach(function (emoji, i) {
      const div = document.createElement('div');
      div.className = 'carta';
      div.dataset.id = i;
      div.textContent = '?';
      div.addEventListener('click', function () {
        div.textContent = emoji;
        div.classList.add('volteada');
      });
      fragmento.appendChild(div);
    });
    tablero.appendChild(fragmento);
  <\/script>
</body>
</html>
`},
    {t:'p', h:'▶ Ejecuta y haz clic en las cartas: se “voltean”. (En las próximas lecciones lo haremos con animación 3D, un solo listener y la lógica de pares.)'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué ventaja tiene <code>DocumentFragment</code> frente a 16 appendChild al documento?', options:['Es más bonito','Agrupa el render: una sola inserción visible en lugar de 16','Funciona sin JavaScript','Borra el tablero'], correct:1, pts:10, explain:'Render por lotes: menos recálculos de pantalla. Técnica estándar para listas grandes.'},
      {type:'mc', q:'<code>div.dataset.id = 3</code> crea en el HTML…', options:['id="3" del elemento','el atributo data-id="3"','una variable JS','una clase llamada 3'], correct:1, pts:10, explain:'dataset.x ↔ data-x. Luego lo lees con el.dataset.id (y es un STRING).'},
      {type:'fill', q:'Propiedad para vaciar el tablero antes de redibujar: <code>tablero.________ = ""</code>:', accept:['innerhtml'], re:'^\\s*inner\\s*html\\s*$', show:'tablero.innerHTML = ""', pts:10, hint:'HTML interno…'},
      {type:'tf', q:'El DocumentFragment es visible en la pantalla mientras le agregas elementos.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: es invisible en memoria. Solo se pinta al insertarlo (con todo su contenido) al documento.'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 13 · Renderiza un tablero de colores',
      sub:'Mismo patrón del juego, más simple: del array <code>colores</code> genera una rejilla de casillas con <code>data-*</code> usando fragmento + forEach. ▶ Ejecuta (haz clic en las casillas) y califica.',
      file:'ejercicio-13.html', height:340,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 13</title>
<style>
  #tablero { display: grid; grid-template-columns: repeat(3, 60px); gap: 8px; margin-top: 10px; }
  .casilla { width: 60px; height: 60px; border-radius: 10px; border: 2px dashed #94a3b8; cursor: pointer; }
</style>
</head>
<body>
  <div id="tablero"></div>
  <script>
    const colores = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#f97316'];
    const tablero = document.getElementById('tablero');

    // TODO 1: crea el fragmento con document.createDocumentFragment()
    const fragmento = ...;

    // TODO 2: forEach de colores -> crea un div.casilla por color:
    //  - div.className = 'casilla'
    //  - div.dataset.color = color
    //  - al hacer clic: div.style.background = div.dataset.color
    //  - agrégalo AL FRAGMENTO (no al tablero)
    ...

    // TODO 3: inserta el fragmento completo en el tablero (una sola vez)
    ...
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'Crea el <code>DocumentFragment</code>', re:'createDocumentFragment\\s*\\(\\s*\\)', pts:20},
        {label:'Recorre con <code>forEach</code>', re:'\\.\\s*forEach\\s*\\(', pts:15},
        {label:'Crea elementos con <code>createElement</code>', re:'createElement\\s*\\(\\s*[\'"]div[\'"]\\s*\\)', pts:15},
        {label:'Guarda datos con <code>dataset.color</code>', re:'dataset\\.\\s*color\\s*=', pts:20},
        {label:'Agrega al FRAGMENTO y al final inserta en el tablero', re:'fragmento\\.\\s*appendChild[\\s\\S]*tablero\\.\\s*appendChild|tablero\\.\\s*appendChild[\\s\\S]*fragmento', pts:20},
        {label:'En el clic usa el dataset para pintar (<code>style.background</code>)', re:'style\\.\\s*(background|backgroundColor)\\s*=', pts:10}
      ]}
  ]},

  /* -------- 4.2 -------- */
  { id:'4-2', title:'Clic en las cartas: turnos y setTimeout', time:'15 min', blocks:[
    {t:'p', h:'La mecánica de turno, en pseudocódigo de ingeniero — fíjate en que SIEMPRE hay tres preguntas antes de actuar: ¿puedo jugar? ¿la carta es válida? ¿qué fase del turno es?'},
    {t:'steps', items:[
      'Si el juego está <b>bloqueado</b> (resolviendo un par) o la carta ya está volteada/encontrada → ignorar el clic.',
      'Voltear la carta y guardarla: si no había <code>primera</code>, esta es la primera; si sí, es la <code>segunda</code>.',
      'Si ya hay dos volteadas → <b>bloquear</b> el tablero y <b>comparar</b>… pero con un pequeño retraso para que el jugador vea ambas.'
    ]},
    {t:'code', lang:'js', title:'el corazón del turno', code:
`let primera = null;
let segunda = null;
let bloqueado = false;

tablero.addEventListener('click', function (evento) {
  const el = evento.target.closest('.carta');
  if (!el || bloqueado) return;

  const carta = mazo.find(c => c.id === Number(el.dataset.id));
  if (!carta || carta.volteada || carta.encontrada) return;

  carta.volteada = true;
  el.classList.add('volteada');

  if (!primera) {
    primera = carta;                 // turno incompleto
  } else {
    segunda = carta;                 // turno completo
    bloqueado = true;                // cerramos el portón
    setTimeout(comparar, 700);       // milisegundos para VER ambas
  }
});

function comparar() {
  if (primera.emoji === segunda.emoji) {
    primera.encontrada = true;
    segunda.encontrada = true;
  } else {
    primera.volteada = false;
    segunda.volteada = false;
  }
  primera = null;
  segunda = null;
  bloqueado = false;
}`},
    {t:'info', title:'🔑 setTimeout: “llámame en 700 ms”', h:'<code>setTimeout(fn, ms)</code> agenda el callback sin congelar la página (no hay “sleep” en JS). Durante esos 700 ms el juego sigue vivo — pero nuestro flag <code>bloqueado</code> impide que el jugador haga clics locos. Este patrón (estado + temporizador) es la base de toda la lógica de turnos.'},
    {t:'warn', title:'⚠️ dataset devuelve TEXTO', h:'<code>el.dataset.id</code> es <code>"3"</code>, no <code>3</code>. Por eso el <code>Number(...)</code> antes de comparar con <code>c.id</code>. Si comparas <code>"3" === 3</code> da false — un bug clásico y silencioso que puede tener media tarde buscando.'},
    {t:'table', head:['Estado del turno','primera','segunda','bloqueado'], rows:[
      ['Reposo','null','null','false'],
      ['Una carta abierta','carta A','null','false'],
      ['Resolviendo par','carta A','carta B','true (700 ms)'],
      ['Vuelve al reposo','null','null','false']
    ]},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Para qué sirve la variable <code>bloqueado</code>?', options:['Para que el tablero sea gris','Para ignorar clics mientras se resuelve un par','Para contar intentos','Para guardar el récord'], correct:1, pts:10, explain:'Es el “cerrado por comparación”: sin él, el jugador voltearía 4+ cartas durante el setTimeout.'},
      {type:'mc', q:'<code>Number(el.dataset.id)</code> es necesario porque dataset…', options:['devuelve strings','devuelve números','solo funciona con arrays','es asíncrono'], correct:0, pts:10, explain:'Todos los atributos HTML son texto; convertimos para comparar con === contra c.id numérico.'},
      {type:'fill', q:'Función que agenda un callback para ejecutarse después de N milisegundos:', accept:['settimeout'], re:'^\\s*set\\s*time\\s*out\\s*$', show:'setTimeout(comparar, 700)', pts:10, hint:'set + Time + out.'},
      {type:'mc', q:'En el estado “Resolviendo par”, ¿qué valores tiene el turno?', options:['null, null, false','cartaA, cartaB, true','cartaA, null, true','null, null, true'], correct:1, pts:10, explain:'Dos cartas abiertas y el bloqueo activo mientras el setTimeout espera.'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 14 · El portón del turno',
      sub:'Implementa <code>abrirCarta(carta)</code> con las reglas completas del turno usando las variables <code>primera/segunda/bloqueado</code>. Debe devolver qué fase resultó. ▶ Califica.',
      file:'ejercicio-14.html', height:340,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 14</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12).</p>
  <script>
    let primera = null;
    let segunda = null;
    let bloqueado = false;

    // Devuelve: 'bloqueado' | 'invalida' | 'primera' | 'segunda'
    function abrirCarta(carta) {
      // TODO 1: si bloqueado es true -> devuelve 'bloqueado'
      ...

      // TODO 2: si la carta no existe, o ya está volteada
      // o ya está encontrada -> devuelve 'invalida'
      // (una sola línea con || une las tres condiciones)
      ...

      // TODO 3: voltea la carta (carta.volteada = true)
      ...

      // TODO 4: si NO hay primera, esta es la primera
      // y devuelve 'primera'
      ...

      // TODO 5: si ya había primera: esta es la segunda,
      // activa bloqueado y devuelve 'segunda'
      ...
    }

    // ===== Pruebas (no tocar) =====
    const c1 = { id: 1, emoji: '👻', volteada: false, encontrada: false };
    const c2 = { id: 2, emoji: '🎃', volteada: false, encontrada: false };
    console.log(abrirCarta(c1));               // 'primera'
    console.log(abrirCarta(c1));               // 'invalida' (ya volteada)
    console.log(abrirCarta(c2));               // 'segunda'
    console.log(abrirCarta(c2));               // 'bloqueado'
    primera = null; segunda = null; bloqueado = false;
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'Regresa <code>bloqueado</code> cuando el juego está bloqueado', re:'bloqueado[\\s\\S]{0,60}return[\\s\\S]{0,20}[\'"]bloqueado[\'"]', pts:20},
        {label:'Valida carta nula, volteada o encontrada (devuelve <code>invalida</code>)', re:'(\\|\\|[\\s\\S]{0,80}){2,}[\\s\\S]{0,40}[\'"]invalida[\'"]', pts:20},
        {label:'Voltea la carta (<code>volteada = true</code>)', re:'\\.\\s*volteada\\s*=\\s*true', pts:20},
        {label:'Fase 1: asigna <code>primera</code> y devuelve <code>primera</code>', re:'primera\\s*=\\s*carta[\\s\\S]{0,60}[\'"]primera[\'"]', pts:20},
        {label:'Fase 2: asigna <code>segunda</code>, activa bloqueo y devuelve <code>segunda</code>', re:'segunda\\s*=\\s*carta[\\s\\S]{0,120}[\'"]segunda[\'"]', pts:20}
      ]}
  ]},

  /* -------- 4.3 -------- */
  { id:'4-3', title:'Comparar, resolver y celebrar la victoria', time:'14 min', blocks:[
    {t:'p', h:'La comparación del Memoria es engañosamente simple — <code>a.emoji === b.emoji</code> — pero alrededor hay detalles de calidad: actualizar el DOM coherente con el estado, contar intentos, dar feedback y detectar la victoria.'},
    {t:'code', lang:'js', title:'comparar con todo lo necesario', code:
`function comparar() {
  intentos++;                      // un intento = voltear dos cartas
  document.getElementById('intentos').textContent = intentos;

  const elA = tablero.querySelector('[data-id="' + primera.id + '"]');
  const elB = tablero.querySelector('[data-id="' + segunda.id + '"]');

  if (primera.emoji === segunda.emoji) {
    primera.encontrada = true;
    segunda.encontrada = true;
    elA.classList.add('encontrada');
    elB.classList.add('encontrada');
  } else {
    primera.volteada = false;
    segunda.volteada = false;
    elA.classList.remove('volteada');
    elB.classList.remove('volteada');
  }

  primera = null;
  segunda = null;
  bloqueado = false;               // abrimos el portón otra vez

  if (mazo.every(c => c.encontrada)) {
    setTimeout(celebrar, 300);     // pequeña pausa dramática 🎉
  }
}

function celebrar() {
  document.getElementById('mensaje').textContent =
    '🎉 ¡Ganaste en ' + intentos + ' intentos!';
}`},
    {t:'info', title:'🔑 querySelector con atributo', h:'<code>tablero.querySelector("[data-id=\'7\']")</code> busca por atributo — así conectas estado (la carta del mazo) con su representación visual (el div) sin guardar referencias sueltas. Alternativa pro: al crear cada div, guarda <code>div.dataset.ref</code> o usa un mapa <code>id → elemento</code>.'},
    {t:'tip', title:'💡 Sincronía estado ↔ pantalla', h:'La regla que ya aplicaste en la lista de tareas: <b>primero el estado, luego el DOM</b>. Cada función del juego: 1) actualiza cartas, 2) refleja en clases/atributos, 3) revisa la condición de victoria. Si un bug dice “la carta se ve volteada pero no cuenta”, es que uno de los dos mundos quedó desincronizado.'},
    {t:'quiz', questions:[
      {type:'mc', q:'El selector <code>[data-id="7"]</code> encuentra…', options:['el elemento con id HTML = 7','el elemento cuyo atributo data-id vale "7"','la séptima carta del mazo','un elemento con clase 7'], correct:1, pts:10, explain:'Los corchetes en querySelector seleccionan por atributo. Ojo: el valor se compara como texto.'},
      {type:'mc', q:'La victoria se detecta con…', options:['un contador que llega a 8 manualmente','mazo.every(c => c.encontrada)','cuando intentos === 16','aleatoriamente'], correct:1, pts:10, explain:'every sobre el estado: una sola línea que siempre refleja la realidad del mazo.'},
      {type:'mc', q:'¿Qué orden garantiza una app sin bugs de sincronía?', options:['DOM primero, estado después','Estado primero, DOM después','Da igual el orden','Solo DOM, sin estado'], correct:1, pts:10, explain:'El estado es la verdad; el DOM es su reflejo. Primero modelas, luego pintas.'},
      {type:'fill', q:'Método para buscar dentro del tablero el elemento con data-id 7: <code>tablero.________("[data-id=\'7\']")</code>:', accept:['queryselector'], re:'^\\s*query\\s*selector\\s*$', show:'querySelector', pts:10, hint:'“consultar selector”…'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 15 · Contador de victoria',
      sub:'Funciones de estadística del juego: contar encontradas, calcular porcentaje y decidir si hay victoria. ▶ Califica.',
      file:'ejercicio-15.html', height:330,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 15</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12).</p>
  <script>
    const mazo = [
      { emoji: '🎃', encontrada: true  },
      { emoji: '🎃', encontrada: true  },
      { emoji: '👻', encontrada: false },
      { emoji: '👻', encontrada: false },
      { emoji: '🦇', encontrada: true  },
      { emoji: '🦇', encontrada: false }
    ];

    // TODO 1: contarEncontradas(mazo) -> filter + length
    function contarEncontradas(mazo) {
      ...
    }

    // TODO 2: porcentaje(mazo) -> encontradas * 100 / total
    // (redondea con Math.round)
    function porcentaje(mazo) {
      ...
    }

    // TODO 3: hayVictoria(mazo) -> every
    function hayVictoria(mazo) {
      ...
    }

    // ===== Pruebas (no tocar) =====
    console.log('Encontradas:', contarEncontradas(mazo)); // 3
    console.log('Porcentaje:', porcentaje(mazo) + '%');   // 50%
    console.log('¿Victoria?:', hayVictoria(mazo));        // false
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'<code>contarEncontradas</code> usa <code>filter(...).length</code>', re:'filter[\\s\\S]{0,40}encontrada[\\s\\S]{0,20}length|length[\\s\\S]{0,40}filter[\\s\\S]{0,40}encontrada', pts:25},
        {label:'<code>porcentaje</code> divide entre el total y multiplica por 100', re:'\\*\\s*100|100\\s*\\*', pts:25},
        {label:'El porcentaje usa <code>Math.round</code> (o toFixed)', re:'Math\\.\\s*round|toFixed\\s*\\(', pts:20},
        {label:'<code>hayVictoria</code> usa <code>every</code>', re:'\\.\\s*every\\s*\\([\\s\\S]{0,40}encontrada', pts:30}
      ]}
  ]},

  /* -------- 4.4 -------- */
  { id:'4-4', title:'Delegación de eventos: un listener para todo el tablero', time:'14 min', blocks:[
    {t:'p', h:'En el editor de la lección 4.1 pusimos un listener POR CARTA (16 listeners). Hay una forma superior: <b>delegación</b> — un solo listener en el <code>&lt;div id="tablero"&gt;</code> que atiende los clics de todas las cartas, actuales y futuras. Funciona gracias al <b>bubbling</b>: los eventos “suben” desde el elemento clicado hasta sus ancestros, como una burbuja 🫧 que sube del fondo del mar.'},
    {t:'code', lang:'js', title:'delegación con closest()', code:
`tablero.addEventListener('click', function (evento) {
  // ¿En qué carta cayó el clic (aunque cliques un hijo)?
  const el = evento.target.closest('.carta');
  if (!el) return;                       // clic en el hueco del tablero

  const id = Number(el.dataset.id);
  juego.voltearCarta(id);
});

// evento.target → lo que recibió el clic (puede ser el "frente" de la carta)
// closest('.carta') → sube hasta encontrar el elemento carta completo
// Un solo listener. 0 listeners por carta. Y las cartas nuevas
// (al reiniciar el juego) ya funcionan solas.`},
    {t:'table', head:['Enfoque','Listeners','Recomendación'], rows:[
      ['Uno por carta','16 al crear + 16 al reiniciar','Aceptable para juegos chicos'],
      ['<b>Delegación</b>','<b>1 en el contenedor</b>','✅ Estándar profesional: menos memoria, dinámico por defecto']
    ]},
    {t:'info', title:'🔑 Las tres preguntas de la delegación', h:'1) <code>evento.target</code> — ¿quién originó el clic? 2) <code>closest(selector)</code> — ¿a qué carta pertenece? 3) ¿el juego permite actuar ahora? Si dominas estas tres, dominas cualquier app con listas dinámicas (tableros, chats, feeds…).'},
    {t:'info', title:'ℹ️ target vs currentTarget (confusión común)', h:'<code>evento.target</code> es donde ORIGINÓ el clic (quizás el div interno “frente”). <code>evento.currentTarget</code> es donde ESTÁ el listener (el tablero). Con delegación casi siempre trabajas con target + closest, nunca con currentTarget.'},
    {t:'quiz', questions:[
      {type:'mc', q:'La delegación de eventos funciona gracias a…', options:['el localStorage','el bubbling: los eventos suben por los ancestros','los iframes','el CSS'], correct:1, pts:10, explain:'El clic en la carta “burbujea” hasta el tablero, cuyo único listener lo captura.'},
      {type:'mc', q:'<code>evento.target.closest(".carta")</code> sirve para…', options:['borrar la carta','encontrar el elemento .carta más cercano hacia arriba desde donde clickearon','crear una carta','detener el evento'], correct:1, pts:10, explain:'El clic puede caer en un hijo de la carta; closest encuentra la carta contenedora (o null).'},
      {type:'tf', q:'Con delegación, las cartas creadas DESPUÉS de registrar el listener no necesitan listeners propios.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Verdadero: el listener vive en el contenedor, no en las cartas. Es la gran ventaja.'},
      {type:'mc', q:'Si el usuario hace clic sobre el div interno “carta-frente”, <code>evento.target</code> es…', options:['el tablero','el div carta-frente','null','la clase .carta'], correct:1, pts:10, explain:'target es el punto exacto del clic; closest(".carta") sube desde ahí hasta la carta completa.'}
    ]},
    {t:'exercise', title:'🛠️ Ejercicio 16 · Un listener para gobernarlos a todos',
      sub:'Monta la delegación completa sobre una rejilla dinámica: un listener en el contenedor que identifique la casilla, lea su data-color y la pinte. Agrega casillas nuevas y verifica que funcionan solas. ▶ Califica.',
      file:'ejercicio-16.html', height:340,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Ejercicio 16</title>
<style>
  #zona { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; min-height: 60px; }
  .casilla { width: 54px; height: 54px; border: 2px dashed #94a3b8; border-radius: 9px; cursor: pointer; }
  #agregar { margin-top: 10px; padding: 8px 14px; border: none; border-radius: 8px;
             background: #4f46e5; color: #fff; cursor: pointer; font-weight: 700; }
</style>
</head>
<body>
  <div id="zona"></div>
  <button id="agregar">+ casilla</button>
  <script>
    const zona = document.getElementById('zona');
    let n = 0;

    // TODO 1: UN listener de click en ZONA (delegación):
    //  - const el = evento.target.closest('.casilla');
    //  - si hay el: el.style.background = el.dataset.color;
    ...

    // (Esto ya está hecho: agrega casillas nuevas con data-color)
    document.getElementById('agregar').addEventListener('click', function () {
      n++;
      const d = document.createElement('div');
      d.className = 'casilla';
      d.dataset.color = ['#ef4444','#3b82f6','#22c55e','#eab308'][n % 4];
      zona.appendChild(d);
    });
    document.getElementById('agregar').click();
    document.getElementById('agregar').click();
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'UN listener en la zona (<code>zona.addEventListener("click", ...)</code>)', re:'zona\\.\\s*addEventListener\\s*\\(\\s*[\'"]click[\'"]', pts:25},
        {label:'Usa <code>evento.target</code> (o e.target)', re:'\\.\\s*target', pts:20},
        {label:'Localiza la casilla con <code>closest(".casilla")</code>', re:'closest\\s*\\(\\s*[\'"]\\.casilla[\'"]\\s*\\)', pts:25},
        {label:'Lee el dato con <code>dataset.color</code> y lo aplica al estilo', re:'dataset\\.\\s*color[\\s\\S]{0,60}style|style[\\s\\S]{0,60}dataset\\.\\s*color', pts:20},
        {label:'Ignora los clics fuera de las casillas (if (!el) return…)', re:'if\\s*\\(\\s*!\\s*el\\s*\\)\\s*return', pts:10}
      ]}
  ]},

  /* -------- 4.5 -------- */
  { id:'4-5', title:'🛠️ Proyecto del módulo: resolverTurno()', time:'16 min', blocks:[
    {t:'exercise', title:'🛠️ Proyecto · la lógica del par',
      sub:'Completa <code>resolverTurno(a, b)</code>: si coinciden → marcar ambas como encontradas; si no → voltearlas de nuevo. En ambos casos debe reiniciar primera/segunda y desbloquear. ▶ Prueba y califica.',
      file:'proyecto-4.html', height:380,
      code:
`<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Proyecto 4: resolverTurno</title></head>
<body>
  <p style="font-family:system-ui">Abre la consola (F12).</p>
  <script>
    // Estado del turno (ya implementado en el juego):
    let primera = null;
    let segunda = null;
    let bloqueado = true;   // llegamos aquí con 2 cartas volteadas

    function resolverTurno(a, b) {
      // TODO 1: si los emojis coinciden -> marca ambas encontrada = true
      // TODO 2: si NO coinciden -> volteada = false en ambas
      // (pista: if (a.emoji === b.emoji) { ... } else { ... })


      // TODO 3: reinicia el turno: primera = null; segunda = null;


      // TODO 4: desbloquea el tablero
      bloqueado = ...;

      // TODO 5: devuelve true si el par fue correcto, false si no
      return ...;
    }

    // ===== Pruebas (no tocar) =====
    const c1 = { id: 1, emoji: '👻', volteada: true, encontrada: false };
    const c2 = { id: 2, emoji: '👻', volteada: true, encontrada: false };
    console.log('par correcto?:', resolverTurno(c1, c2), c1.encontrada, c2.encontrada);
    const c3 = { id: 3, emoji: '🎃', volteada: true, encontrada: false };
    console.log('par mal?:', !resolverTurno(c1, c3), c1.volteada, c3.volteada);
  <\/script>
</body>
</html>
`,
      checks:[
        {label:'Compara los emojis con <code>===</code>', re:'\\.\\s*emoji\\s*===', pts:20},
        {label:'Marca <code>encontrada = true</code> cuando coinciden', re:'encontrada\\s*=\\s*true', pts:20},
        {label:'Devuelve <code>volteada = false</code> cuando no coinciden', re:'volteada\\s*=\\s*false', pts:20},
        {label:'Reinicia primera y segunda a <code>null</code>', re:'primera\\s*=\\s*null[\\s\\S]*segunda\\s*=\\s*null', pts:15},
        {label:'Desbloquea (<code>bloqueado = false</code>)', re:'bloqueado\\s*=\\s*false', pts:15},
        {label:'Devuelve true/false según el resultado', re:'return\\s+(true|\\w+\\s*===\\s*\\w+)|return\\s+sonPar|return\\s+correcto|return\\s+match', pts:10}
      ]}
  ]}
]});
