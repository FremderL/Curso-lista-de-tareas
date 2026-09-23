/* ============================================================
   CURSO 7 UNITY (C#) — CONTENIDO parte C (Módulos 5–7) + EXAMEN
   ============================================================ */
MODULES.push({
  id:'m5', emoji:'🧱', name:'Clases y objetos', color:'#8b5cf6',
  desc:'Campos, constructores y métodos de instancia — y la matemática Vector3/Mathf de todo juego.',
  lessons:[

  /* -------- 5-1 -------- */
  { id:'5-1', title:'Tu primera clase: campos y new', time:'14 min', blocks:[
    {t:'p', h:'Una <b>clase</b> es el molde de un tipo de objeto del juego: <code>class Slime { … }</code> describe qué datos tiene (campos) y qué sabe hacer (métodos). Cada <code>new Slime()</code> crea un <b>objeto</b> (una instancia) con sus propios datos: dos slimes, dos vidas distintas.'},
    {t:'code', lang:'csharp', title:'primera clase', code:`class Slime {
  public int Vida;
  public string Nombre;
}

var a = new Slime();
a.Vida = 30;
a.Nombre = "Burbuja";

var b = new Slime();
b.Vida = 30;
b.Vida = b.Vida - 10;      // le pegan solo a b

Console.WriteLine($"{a.Nombre}: {a.Vida}");   // Burbuja: 30
Console.WriteLine($"{b.Nombre ?? "slime"}: {b.Vida}");  // el b no tiene nombre aún`},
    {t:'warn', title:'⚠️ public y el punto', h:'La palabra <code>public</code> declara que el campo es visible desde afuera (en este curso ponla siempre en los campos; en el editor real también lo harás la mayoría de las veces). El acceso es con <b>punto</b>: <code>a.Vida</code>. Si el campo no existe, CS1061; si la instancia no existe y llamas al punto sobre null, <code>NullReferenceException</code> — el error más famoso de Unity (aparece millones de veces en los foros).'},
    {t:'info', title:'ℹ️ El molde vs las galletas', h:'La clase NO guarda datos: es el plano. Los datos viven en los objetos creados con <code>new</code>. Si cambias <code>a.Vida</code>, la de <code>b</code> ni se enteran. Esta independencia es lo que hace posible una horda: 100 slimes = 100 objetos del mismo molde, cada uno con su vida, su posición y su estado.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué crea un objeto nuevo a partir de la clase?', options:['class','new','var','this'], correct:1, pts:10, explain:'new Slime() instancia el molde: nace un objeto con sus propios campos.'},
      {type:'mc', q:'<code>a.Vida</code> — el punto sirve para…', options:['Sumar','Acceder a un miembro del objeto','Terminar una línea','Comparar'], correct:1, pts:10, explain:'objeto.miembro: lee o escribe un campo, o llama un método.'},
      {type:'tf', q:'Si le pegan al slime a, la vida del slime b también baja.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: cada objeto tiene SUS datos, independientes.'},
      {type:'mc', q:'Llamar <code>a.Nombre</code> cuando «Nombre» no está en la clase lanza…', options:['CS1002','CS1061','NullReferenceException','FormatException'], correct:1, pts:10, explain:'CS1061: el miembro no existe en el tipo. (NRE sería si a mismo fuera null.)'}
    ]},
    {t:'pyex', title:'🧪 Moldea tus objetos', tasks:[
      {q:'Crea la clase <code>Heroe</code> con los campos <code>public int Vida;</code> y <code>public string Nombre;</code>. Crea un héroe, ponle 100 y "Ada", e imprime <code>Ada: 100</code>.', hint:'class Heroe { public int Vida; public string Nombre; } y luego new Heroe();', check:{lines:['Ada: 100']}, solution:'class Heroe {\n  public int Vida;\n  public string Nombre;\n}\nvar h = new Heroe();\nh.Vida = 100;\nh.Nombre = "Ada";\nConsole.WriteLine($"{h.Nombre}: {h.Vida}");', pts:20},
      {q:'Con la clase Slime de la lección: crea DOS slimes con Vida 20 cada uno, réstale 15 al primero e imprime ambas vidas en dos líneas: <code>5</code> y <code>20</code>.', hint:'Dos new, dos variables.', check:{lines:['5','20']}, solution:'class Slime {\n  public int Vida;\n}\nvar s1 = new Slime();\nvar s2 = new Slime();\ns1.Vida = 20;\ns2.Vida = 20;\ns1.Vida = s1.Vida - 15;\nConsole.WriteLine(s1.Vida);\nConsole.WriteLine(s2.Vida);', pts:20},
      {q:'Crea la clase <code>Cofre</code> con <code>public int Oro;</code>. Crea un array de 2 cofres… mejor aún: crea 3 cofres con 10, 20 y 30 de oro (tres variables c1, c2, c3) e imprime el total: <code>60</code>.', hint:'Suma los tres campos.', check:{lines:['60']}, solution:'class Cofre {\n  public int Oro;\n}\nvar c1 = new Cofre();\nvar c2 = new Cofre();\nvar c3 = new Cofre();\nc1.Oro = 10;\nc2.Oro = 20;\nc3.Oro = 30;\nConsole.WriteLine(c1.Oro + c2.Oro + c3.Oro);', pts:20},
      {q:'Crea la clase <code>Puerta</code> con <code>public bool Abierta;</code>. Crea una puerta, ábrela (<code>Abierta = true</code>) e imprime <code>True</code>. Luego imprime el estado de OTRA puerta recién creada sin tocar: <code>False</code>.', hint:'bool por defecto nace false.', check:{lines:['True','False']}, solution:'class Puerta {\n  public bool Abierta;\n}\nvar p1 = new Puerta();\np1.Abierta = true;\nConsole.WriteLine(p1.Abierta);\nvar p2 = new Puerta();\nConsole.WriteLine(p2.Abierta);', pts:20}
    ]}
  ]},

  /* -------- 5-2 -------- */
  { id:'5-2', title:'Constructores: objetos listos al nacer', time:'13 min', blocks:[
    {t:'p', h:'Poner los campos a mano tras cada <code>new</code> es tedioso y peligroso (¿y si olvidas la vida?). El <b>constructor</b> es un método especial que corre EXACTO al nacer el objeto: mismo nombre que la clase, sin tipo de retorno. Recibe los datos iniciales y deja el objeto listo.'},
    {t:'code', lang:'csharp', title:'constructor.cs', code:`class Slime {
  public int Vida;
  public string Nombre;

  public Slime(string nombre, int vida) {
    Nombre = nombre;
    Vida = vida;
  }
}

var a = new Slime("Burbuja", 30);
var b = new Slime("Viscoso", 25);
b.Vida -= 5;
Console.WriteLine($"{a.Nombre}: {a.Vida}");   // Burbuja: 30
Console.WriteLine($"{b.Nombre}: {b.Vida}");   // Viscoso: 20`},
    {t:'info', title:'ℹ️ Campos con valor inicial', h:'Además del constructor, un campo puede nacer con valor: <code>public int Vida = 10;</code> — todo objeto nuevoarranca con 10 sin que nadie lo ponga. Es perfecto para valores que casi nunca cambian. Regla práctica de Unity: constructor para lo que le da el MUNDO (posición, dueño), valor inicial para lo que es de fábrica (vida base, velocidad).'},
    {t:'warn', title:'⚠️ Si declaras constructor, el default desaparece', h:'Con <code>public Slime(string n, int v)</code> definido, la llamada <code>new Slime()</code> sin argumentos ya NO compila: CS7036/CS1729 «no hay una versión sin argumentos». El compilador solo te regala el constructor vacío si NO defines ninguno. Si quieres ambas formas, escribe las dos versiones.'},
    {t:'quiz', questions:[
      {type:'mc', q:'El constructor se reconoce porque…', options:['Devuelve void','Se llama igual que la clase','Empieza con new','Es static'], correct:1, pts:10, explain:'Mismo nombre que la clase y SIN tipo de retorno (ni siquiera void).'},
      {type:'mc', q:'Con constructor <code>Slime(int v)</code>, ¿qué pasa con <code>new Slime()</code>?', options:['Vida = 0','Lanza CS1729: no hay constructor sin args','Crea null','Funciona igual'], correct:1, pts:10, explain:'Al definir un ctor, el default desaparece: debes dar la vida.'},
      {type:'tf', q:'<code>public int Vida = 10;</code> hace que TODO objeto nuevo empiece con Vida 10.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Valor inicial de campo: se aplica en cada nacimiento.'},
      {type:'mc', q:'¿Para qué sirve el constructor?', options:['Borrar objetos','Dejar el objeto listo al nacer','Renombrar la clase','Imprimir en pantalla'], correct:1, pts:10, explain:'Garantiza invariantes: ningún slime anda por ahí sin vida asignada.'}
    ]},
    {t:'pyex', title:'🧪 Nace listo', tasks:[
      {q:'Crea la clase <code>Goblin</code> con constructor que reciba <code>(string nombre, int vida)</code> y los asigne. Crea g1 = ("Colmillo", 18) e imprime <code>Colmillo: 18</code>.', hint:'public Goblin(string nombre, int vida) { Nombre = nombre; Vida = vida; }', check:{lines:['Colmillo: 18']}, solution:'class Goblin {\n  public string Nombre;\n  public int Vida;\n  public Goblin(string nombre, int vida) {\n    Nombre = nombre;\n    Vida = vida;\n  }\n}\nvar g1 = new Goblin("Colmillo", 18);\nConsole.WriteLine($"{g1.Nombre}: {g1.Vida}");', pts:20},
      {q:'Crea la clase <code>Pila</code> con <code>public int Cantidad = 5;</code> (valor inicial, SIN constructor). Crea dos pilas y muestra ambas cantidades: <code>5</code> y <code>5</code> en dos líneas.', hint:'No hay constructor: new Pila() directo.', check:{lines:['5','5']}, solution:'class Pila {\n  public int Cantidad = 5;\n}\nvar p1 = new Pila();\nvar p2 = new Pila();\nConsole.WriteLine(p1.Cantidad);\nConsole.WriteLine(p2.Cantidad);', pts:20},
      {q:'Crea <code>class Enemigo</code> con constructor <code>(string nombre)</code> que además ponga <code>Vida = 50</code> por su cuenta (campo con valor inicial 50 no — que lo asigne el constructor). Crea e("Slime") e imprime <code>Slime: 50</code>.', hint:'El ctor recibe solo el nombre y fija Vida = 50 dentro.', check:{lines:['Slime: 50']}, solution:'class Enemigo {\n  public string Nombre;\n  public int Vida;\n  public Enemigo(string nombre) {\n    Nombre = nombre;\n    Vida = 50;\n  }\n}\nvar e = new Enemigo("Slime");\nConsole.WriteLine($"{e.Nombre}: {e.Vida}");', pts:20},
      {q:'Dos constructores… vamos con uno potente: <code>class Monstruo</code> con ctor <code>(string nombre, int vida, int danio)</code>. Crea m = ("Kraken", 90, 12) e imprime con interpolación:<br><code>Kraken · 90 HP · 12 DMG</code>', hint:'$"{m.Nombre} · {m.Vida} HP · {m.Danio} DMG"', check:{lines:['Kraken · 90 HP · 12 DMG']}, solution:'class Monstruo {\n  public string Nombre;\n  public int Vida;\n  public int Danio;\n  public Monstruo(string nombre, int vida, int danio) {\n    Nombre = nombre;\n    Vida = vida;\n    Danio = danio;\n  }\n}\nvar m = new Monstruo("Kraken", 90, 12);\nConsole.WriteLine($"{m.Nombre} · {m.Vida} HP · {m.Danio} DMG");', pts:20}
    ]}
  ]},

  /* -------- 5-3 -------- */
  { id:'5-3', title:'Métodos de instancia: el objeto actúa', time:'14 min', blocks:[
    {t:'p', h:'Los métodos dentro de una clase son <b>de instancia</b>: cada objeto los ejecuta sobre SUS propios campos. Dentro del método, los nombres de los campos se usan a secas (<code>Vida</code>), y puedes ser explícito con <code>this.Vida</code> — «la vida de ESTE objeto». Con esto las clases dejan de ser cajas de datos y empiezan a COMPORTARSE.'},
    {t:'code', lang:'csharp', title:'comportamiento', code:`class Heroe {
  public int Vida;

  public Heroe(int v) { Vida = v; }

  public void Golpear(int danio) {
    Vida -= danio;
  }

  public bool Vivo() {
    return Vida > 0;
  }

  public string Estado() {
    if (Vida >= 50) return "Entero";
    if (Vida > 0) return "Herido";
    return "Derrotado";
  }
}

var h = new Heroe(60);
h.Golpear(30);
Console.WriteLine(h.Estado());   // Herido
Console.WriteLine(h.Vivo());     // True`},
    {t:'info', title:'ℹ️ Llamar métodos: con paréntesis', h:'<code>h.Estado()</code> ejecuta y devuelve; <code>h.Estado</code> sin paréntesis es CS1061/otro error (buscas el miembro como si fuera dato). Detalle del editor real: en Unity verás <code>this.transform.position</code> — el <code>this</code> se puede omitir casi siempre; los tutoriales lo usan para dejar claro de quién es cada cosa.'},
    {t:'p', h:'Fíjate en el poder del diseño: el programa principal ya no sabe CÓMO se calcula el estado; solo pregunta <code>h.Estado()</code>. Esto se llama <b>encapsulación</b> y es la razón por la que un proyecto de 10 000 líneas no se vuelve inmanejable: cada clase cuida lo suyo.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Un método de instancia accede a los campos…', options:['Con el nombre de la clase','A secas (Vida) o con this.Vida','Con new','No puede'], correct:1, pts:10, explain:'Dentro de la clase, Vida ES la vida de la instancia que ejecuta.'},
      {type:'mc', q:'<code>h.Vivo()</code> devuelve bool. ¿Qué imprime <code>Console.WriteLine(h.Vivo())</code> si Vida = 0?', options:['true','False','0','CS1061'], correct:1, pts:10, explain:'Vida > 0 es falso: se imprime False (¡con mayúscula!).'},
      {type:'tf', q:'<code>h.Estado</code> sin paréntesis ejecuta el método.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: sin paréntesis no se llama; faltan los () del invocación.'},
      {type:'mc', q:'Que la clase calcule su propio Estado se llama…', options:['Recursión','Encapsulación','Herencia','Interpolación'], correct:1, pts:10, explain:'El objeto encapsula su lógica: el resto del programa solo pregunta.'}
    ]},
    {t:'pyex', title:'🧪 Objetos que actúan', tasks:[
      {q:'Crea <code>class Slime</code> con Vida, constructor (int) y método <code>void Golpear(int d)</code> que le reste vida. Crea un slime de 30, golpéalo con 12 e imprime su vida: <code>18</code>.', check:{lines:['18']}, solution:'class Slime {\n  public int Vida;\n  public Slime(int v) { Vida = v; }\n  public void Golpear(int d) {\n    Vida -= d;\n  }\n}\nvar s = new Slime(30);\ns.Golpear(12);\nConsole.WriteLine(s.Vida);', pts:20},
      {q:'Añade a la clase anterior el método <code>bool Vivo()</code> (vida > 0). Crea un slime de 10, golpéalo dos veces con 6 e imprime <code>Vivo(): False</code> — literalmente ese texto con interpolación.', hint:'-6 dos veces: vida -2. Vivofalse.', check:{lines:['Vivo(): False']}, solution:'class Slime {\n  public int Vida;\n  public Slime(int v) { Vida = v; }\n  public void Golpear(int d) {\n    Vida -= d;\n  }\n  public bool Vivo() {\n    return Vida > 0;\n  }\n}\nvar s = new Slime(10);\ns.Golpear(6);\ns.Golpear(6);\nConsole.WriteLine($"Vivo(): {s.Vivo()}");', pts:20},
      {q:'Crea <code>class Mochila</code> con <code>public List<string> Items = new List<string>();</code> y método <code>void Guardar(string it)</code> que agregue. Guarda "llave" y "mapa" e imprime el Count: <code>2</code>.', hint:'El campo List se inicializa en la declaración.', check:{lines:['2']}, solution:'class Mochila {\n  public List<string> Items = new List<string>();\n  public void Guardar(string it) {\n    Items.Add(it);\n  }\n}\nvar m = new Mochila();\nm.Guardar("llave");\nm.Guardar("mapa");\nConsole.WriteLine(m.Items.Count);', pts:20},
      {q:'Crea <code>class Bateria</code> con <code>public int Carga;</code> (ctor int), método <code>void Usar(int c)</code> que reste SIN bajar de 0 (if), y <code>bool Muerta()</code>. Batería de 20: usa(8), usa(15) e imprime la carga: <code>0</code>, y <code>Muerta: True</code>.', hint:'if (Carga - c < 0) Carga = 0; else Carga -= c;', check:{lines:['0','Muerta: True']}, solution:'class Bateria {\n  public int Carga;\n  public Bateria(int c) { Carga = c; }\n  public void Usar(int c) {\n    if (Carga - c < 0) {\n      Carga = 0;\n    } else {\n      Carga -= c;\n    }\n  }\n  public bool Muerta() {\n    return Carga == 0;\n  }\n}\nvar b = new Bateria(20);\nb.Usar(8);\nb.Usar(15);\nConsole.WriteLine(b.Carga);\nConsole.WriteLine($"Muerta: {b.Muerta()}");', pts:20}
    ]}
  ]},

  /* -------- 5-4 -------- */
  { id:'5-4', title:'Vector3 y Mathf: matemática de juego', time:'14 min', blocks:[
    {t:'p', h:'En Unity TODO está en un espacio 3D y la posición se guarda en <code>Vector3</code>: tres floats (x, y, z). Nuestro laboratorio lo trae: <code>new Vector3(1, 2, 3)</code>, suma y resta componente a componente, multiplicación por número (escala), la propiedad <code>magnitude</code> (largo del vector — pitágoras) y el <code>ToString</code> estilo Unity: <code>(1.0, 2.0, 3.0)</code>.'},
    {t:'code', lang:'csharp', title:'vector3.cs', code:`var pos = new Vector3(1, 2, 3);
var paso = new Vector3(0, 1, 0);    // un paso hacia arriba
var nueva = pos + paso;
Console.WriteLine(nueva);            // (1.0, 3.0, 3.0)
Console.WriteLine(nueva * 2);        // (2.0, 6.0, 6.0)
Console.WriteLine(nueva.y);          // 3
Console.WriteLine(pos.magnitude);    // raíz(1+4+9) = 3.74…

Console.WriteLine(Vector3.Up);       // (0.0, 1.0, 0.0)
Console.WriteLine(Vector3.Distance(pos, nueva));  // 1`},
    {t:'info', title:'ℹ️ magnitude = velocidad del teletransporte', h:'La magnitud mide el LARGO del vector: <code>sqrt(x² + y² + z²)</code>. Un Vector3(3, 4, 0) mide exactamente 5. En Unity se usa para velocidades («si magnitude &gt; 10, daño de caída»), distancias y direcciones normalizadas. Los componentes se escriben en minúscula: <code>v.x</code>, <code>v.y</code>, <code>v.z</code>.'},
    {t:'p', h:'Para la matemática suelta está <code>Mathf</code> (la versión Unity de Math): <code>Mathf.Floor</code>, <code>Mathf.Ceil</code>, <code>Mathf.Abs</code>, <code>Mathf.Max/Min</code>, <code>Mathf.Sqrt</code>, <code>Mathf.Pow</code>, <code>Mathf.Clamp</code> (¡el rey! acota un valor entre un mínimo y un máximo — vida, volumen, velocidad) y <code>Mathf.Round</code>. El detalle fino: <b>Mathf.Round aleja de cero los puntos medios</b> (2.5 → 3), mientras que <code>Math.Round</code> (la de .NET) usa el redondeo bancario (2.5 → 2).'},
    {t:'code', lang:'csharp', title:'mathf.cs', code:`Console.WriteLine(Mathf.Floor(3.7f));   // 3
Console.WriteLine(Mathf.Ceil(3.2f));    // 4
Console.WriteLine(Mathf.Abs(-8));       // 8
Console.WriteLine(Mathf.Clamp(150, 0, 100));  // 100 — ¡acotado!
Console.WriteLine(Mathf.Round(2.5f));   // 3 (aleja de cero)
Console.WriteLine(Math.Round(2.5));     // 2 (bancario: al par)
Console.WriteLine(Mathf.Sqrt(16f));     // 4
Console.WriteLine(Mathf.Pow(2, 5));     // 32`},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>new Vector3(1, 0, 0) + new Vector3(0, 1, 0)</code> es…', options:['(1.0, 1.0, 0.0)','(1.0, 0.0, 1.0)','(2.0, 0.0, 0.0)','Error'], correct:0, pts:10, explain:'Componente a componente: x=1, y=1, z=0.'},
      {type:'mc', q:'La magnitud de <code>new Vector3(3, 4, 0)</code> es…', options:['7','5','12','3.4'], correct:1, pts:10, explain:'sqrt(9 + 16) = sqrt(25) = 5. Pitágoras manda.'},
      {type:'tf', q:'<code>Mathf.Clamp(150, 0, 100)</code> devuelve 100.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Clamp acota: por encima del máximo → máximo.'},
      {type:'mc', q:'<code>Mathf.Round(2.5f)</code> y <code>Math.Round(2.5)</code> dan respectivamente…', options:['3 y 2','2 y 3','3 y 3','2 y 2'], correct:0, pts:10, explain:'Mathf aleja de cero (3); Math redondeo bancario al par (2).'}
    ]},
    {t:'pyex', title:'🧪 Espacio y números', tasks:[
      {q:'Crea <code>var pos = new Vector3(2, 0, -1);</code> e imprime <code>pos</code> directamente (formato Unity).', hint:'Console.WriteLine(pos);', check:{lines:['(2.0, 0.0, -1.0)']}, solution:'var pos = new Vector3(2, 0, -1);\nConsole.WriteLine(pos);', pts:20},
      {q:'Con <code>var a = new Vector3(1, 1, 1);</code> y <code>var b = new Vector3(2, 0, -1);</code>, imprime la suma y luego la resta (dos líneas).', hint:'a + b = (3.0, 1.0, 0.0); a - b = (-1.0, 1.0, 2.0)', check:{lines:['(3.0, 1.0, 0.0)','(-1.0, 1.0, 2.0)']}, solution:'var a = new Vector3(1, 1, 1);\nvar b = new Vector3(2, 0, -1);\nConsole.WriteLine(a + b);\nConsole.WriteLine(a - b);', pts:20},
      {q:'Muestra la magnitud de <code>new Vector3(3, 4, 0)</code> con el formato <code>Largo: 5</code>.', hint:'$"Largo: {v.magnitude}"', check:{lines:['Largo: 5']}, solution:'var v = new Vector3(3, 4, 0);\nConsole.WriteLine($"Largo: {v.magnitude}");', pts:20},
      {q:'La vida del jefe es 250 pero el máximo es 100: imprime <code>Mathf.Clamp(250, 0, 100)</code> y luego <code>Mathf.Abs(-42)</code> (dos líneas: <code>100</code> y <code>42</code>).', hint:'Dos WriteLine con Mathf.', check:{lines:['100','42']}, solution:'Console.WriteLine(Mathf.Clamp(250, 0, 100));\nConsole.WriteLine(Mathf.Abs(-42));', pts:20}
    ]}
  ]}
]});

MODULES.push({
  id:'m6', emoji:'🛡️', name:'Robustez y estilo Unity', color:'#f97316',
  desc:'try/catch, patrones de juego que no se rompen y el salto al editor real de Unity.',
  lessons:[

  /* -------- 6-1 -------- */
  { id:'6-1', title:'try / catch / finally', time:'14 min', blocks:[
    {t:'p', h:'Los programas reales reciben datos sucios: el jugador teclea «abc» donde iba un número, un array se queda corto, un objeto llega null. C# maneja esto con <b>excepciones</b> y el bloque <code>try { … } catch (TipoExcepcion e) { … } finally { … }</code>: el try ENCIERLA el riesgo; el catch ATRAPA el problema nombrado; el finally corre SIEMPRE, hubiera o no error.'},
    {t:'code', lang:'csharp', title:'defensa.cs', code:`try {
  int n = int.Parse("abc");       // 💥 FormatException
  Console.WriteLine("nunca llega");
} catch (FormatException e) {
  Console.WriteLine("Número inválido: " + e.Message);
} finally {
  Console.WriteLine("Fin del intento");
}`},
    {t:'table', head:['Excepción','Cuándo salta','Ejemplo'], rows:[
      ['<code>FormatException</code>','Parse de texto no numérico','<code>int.Parse("12a")</code>'],
      ['<code>DivideByZeroException</code>','División/módulo ENTERO entre cero','<code>x / 0</code> con ints'],
      ['<code>IndexOutOfRangeException</code>','Índice fuera del array/string','<code>a[10]</code> con Length 3'],
      ['<code>NullReferenceException</code>','Usar un objeto que es null','<code>s.Nombre</code> con s = null'],
      ['<code>StackOverflowException</code>','Recursión sin caso base','F(n) llama F(n) infinito']
    ]},
    {t:'info', title:'ℹ️ e.Message y el catch genérico', h:'La variable del catch (<code>e</code>) tiene <code>e.Message</code>: el mensaje exacto del error — úsalo para registrar sin esconder. Y existe el <code>catch { … }</code> sin tipo (atrapa TODO) y <code>catch (Exception e)</code>, el tipo padre de todas. Orden de conciencia: atrapa lo ESPECÍFICO primero.'},
    {t:'warn', title:'⚠️ finally: el candado', h:'<code>finally</code> se usa para «limpiar pase lo que pase»: cerrar archivos, apagar música, devolver el control a la UI. Si el catch maneja el error, el programa SIGUE después del bloque try completo — no se cae: es un airebag, no un cementerio.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué excepción lanza <code>int.Parse("hola")</code>?', options:['NullReferenceException','FormatException','CS1002','IndexOutOfRange'], correct:1, pts:10, explain:'El formato del texto no es un int: FormatException.'},
      {type:'mc', q:'El bloque que se ejecuta SIEMPRE es…', options:['try','catch','finally','return'], correct:2, pts:10, explain:'finally corre con o sin excepción: para eso existe.'},
      {type:'tf', q:'Si el catch atrapa la excepción, el programa termina.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: el error queda manejado y el programa continúa.'},
      {type:'mc', q:'<code>s.Nombre</code> con s = null lanza…', options:['FormatException','CS1061','NullReferenceException','DivideByZeroException'], correct:2, pts:10, explain:'La NRE: el error más citado de Unity. Protege tus referencias.'}
    ]},
    {t:'pyex', title:'🧪 Redes de seguridad', tasks:[
      {q:'Encierra <code>int.Parse("nope")</code> en try/catch (FormatException) e imprime en el catch <code>Entrada inválida</code>.', hint:'catch (FormatException e) { Console.WriteLine("Entrada inválida"); }', check:{lines:['Entrada inválida']}, solution:'try {\n  int n = int.Parse("nope");\n  Console.WriteLine("nunca");\n} catch (FormatException e) {\n  Console.WriteLine("Entrada inválida");\n}', pts:20},
      {q:'Igual que antes, pero el catch debe imprimir <code>Error: </code> + e.Message (el mensaje real de la excepción).', hint:'El mensaje de int.Parse empieza con «la cadena «nope» no tiene…» — imprímelo tal cual con e.Message.', check:{lines:['Error: la cadena «nope» no tiene el formato correcto para int']}, solution:'try {\n  int n = int.Parse("nope");\n} catch (FormatException e) {\n  Console.WriteLine("Error: " + e.Message);\n}', pts:20},
      {q:'Haz un try/catch/finally donde el try imprima <code>Abro cofre</code>, el catch imprima <code>Vacío</code> (provoca tú el error: divide 1/0 dentro del try) y el finally imprima <code>Cierro cofre</code>. Tres líneas de salida.', hint:'DivideByZeroException con enteros: 1 / 0.', check:{lines:['Abro cofre','Vacío','Cierro cofre']}, solution:'try {\n  Console.WriteLine("Abro cofre");\n  int x = 1 / 0;\n} catch (DivideByZeroException e) {\n  Console.WriteLine("Vacío");\n} finally {\n  Console.WriteLine("Cierro cofre");\n}', pts:20},
      {q:'Lee una línea (entrada: <code>veinte</code>) e intenta parsearla a int. Si falla, imprime <code>Nivel inválido</code>; si sale bien, imprime el nivel. Luego SIEMPRE imprime <code>Listo</code> (finally).', stdin:['veinte'], hint:'try { n = int.Parse(ReadLine()); … } finally { WriteLine("Listo"); }', check:{lines:['Nivel inválido','Listo']}, solution:'try {\n  int n = int.Parse(Console.ReadLine());\n  Console.WriteLine(n);\n} catch (FormatException e) {\n  Console.WriteLine("Nivel inválido");\n} finally {\n  Console.WriteLine("Listo");\n}', pts:20}
    ]}
  ]},

  /* -------- 6-2 -------- */
  { id:'6-2', title:'Patrones de juego: estados, daño y reglas', time:'14 min', blocks:[
    {t:'p', h:'Antes del proyecto final, ensambla los patrones que sostienen CUALQUIER juego: una <b>máquina de estados</b> (enum mental: explorando/peleando/muerto), el <b>turno alternado</b> (<code>turno % 2</code>), la <b>regla de paro</b> (mientras alguien viva) y el <b>log de eventos</b> (cada acción imprime su línea — así se depura y así se narra).'},
    {t:'code', lang:'csharp', title:'duelo.cs', code:`int vidaJugador = 40;
int vidaEnemigo = 25;
int turno = 0;

while (vidaJugador > 0 && vidaEnemigo > 0) {
  turno++;
  if (turno % 2 == 1) {
    vidaEnemigo -= 10;
    Console.WriteLine($"Turno {turno}: golpeas, enemigo en {vidaEnemigo}");
  } else {
    vidaJugador -= 8;
    Console.WriteLine($"Turno {turno}: te golpean, estás en {vidaJugador}");
  }
}
Console.WriteLine(vidaEnemigo <= 0 ? "¡Victoria!" : "Derrota…");`},
    {t:'info', title:'ℹ️ La regla de paro correcta', h:'El while pregunta <code>vidaJugador &gt; 0 &amp;&amp; vidaEnemigo &gt; 0</code>: el duelo dura mientras AMBOS vivan. Es fácil escribir la condición al revés (&amp;&amp; suena raro, tentación de ||) — piénsalo como «paro cuando este muera O este otro»: <code>!(a &gt; 0 &amp;&amp; b &gt; 0)</code> = <code>a &lt;= 0 || b &lt;= 0</code> (De Morgan en acción).'},
    {t:'p', h:'El segundo patrón clave: <b>acumular estadísticas durante la batalla</b> (danio total, golpes críticos, pociones usadas) para el reporte final del proyecto. Y el tercero: <b>los límites con Clamp</b> — la vida nunca baja de 0 ni pasa del máximo, el inventario no acepta más de N items.'},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>turno % 2 == 1</code> es verdadero en los turnos…', options:['Pares','Impares','Todos','Ninguno'], correct:1, pts:10, explain:'Resto 1 = impares: 1, 3, 5… El jugador primero.'},
      {type:'mc', q:'La condición de duelo correcta es…', options:['while (true)','while (v1 > 0 && v2 > 0)','while (v1 > 0 || v2 > 0)','for (…)'], correct:1, pts:10, explain:'Mientras AMBOS vivan. Con || seguiría peleando un muerto.'},
      {type:'tf', q:'El log de eventos ( WriteLine por acción) ayuda a depurar la batalla.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Ver el turno a turno revela exactamente dónde se rompió la lógica.'},
      {type:'mc', q:'Para que la vida nunca sea negativa al restar d…', options:['if (vida - d < 0) vida = 0; else vida -= d;','vida -= d; siempre','vida = Mathf.Max(d, vida)','No se puede'], correct:0, pts:10, explain:'O Clamp tras restar: Mathf.Clamp(vida - d, 0, max). El if es la versión a mano.'}
    ]},
    {t:'pyex', title:'🧪 Ensambla el motor de juego', tasks:[
      {q:'Simula un duelo: tú 30 HP, enemigo 20 HP; por turno (alternando, empiezas tú) le quitas 7 y te quita 4. Imprime la vida del enemigo tras CADA golpe tuyo (una por línea) y al final <code>Fin</code>. El duelo termina cuando el enemigo llegue a 0 o menos.', hint:'while (enemigo > 0) { enemigo -= 7; imprime; }', check:{lines:['13','6','-1','Fin']}, solution:'int enemigo = 20;\nwhile (enemigo > 0) {\n  enemigo -= 7;\n  Console.WriteLine(enemigo);\n}\nConsole.WriteLine("Fin");', pts:20},
      {q:'Con Clamp a mano: vida = 15, recibes un golpe de 40. Imprime la vida final SIN que sea negativa: <code>0</code>. (Usa if o Mathf.Clamp.)', hint:'Mathf.Clamp(15 - 40, 0, 100)', check:{lines:['0']}, solution:'int vida = 15;\nvida = Mathf.Clamp(vida - 40, 0, 100);\nConsole.WriteLine(vida);', pts:20},
      {q:'Con semilla 1: tira <code>Random.Range(4, 8)</code> (daño de héroe) UNA vez e imprime <code>Golpe: X</code> con el valor canónico (7).', hint:'Con InitState(1), la primera Range(4,8)… ejecuta y verifica: la salida debe decir Golpe: 7.', check:{lines:['Golpe: 7']}, solution:'Random.InitState(1);\nint d = Random.Range(4, 8);\nConsole.WriteLine($"Golpe: {d}");', pts:20},
      {q:'Máquina de estados a mano: <code>string estado = "explorar";</code>. Si estado es "pelear" imprime <code>⚔️</code>; si es "explorar" imprime <code>🌲</code> y CAMBIA el estado a "pelear" e imprime el nuevo emoji también (dos líneas).', hint:'if / else y reasignación.', check:{lines:['🌲','⚔️']}, solution:'string estado = "explorar";\nif (estado == "explorar") {\n  Console.WriteLine("🌲");\n  estado = "pelear";\n  Console.WriteLine("⚔️");\n} else {\n  Console.WriteLine("⚔️");\n}', pts:20}
    ]}
  ]},

  /* -------- 6-3 -------- */
  { id:'6-3', title:'Del laboratorio al editor real', time:'15 min', blocks:[
    {t:'p', h:'Todo lo que escribiste hasta aquí es <b>C# puro</b> — y por eso el salto a Unity es pequeño. Lo que cambia: en el editor, tu código vive dentro de <b>componentes</b> (scripts) que se pegan a GameObjects de una escena. La base es la clase <code>MonoBehaviour</code>: heredas de ella y Unity llama tus métodos en momentos exactos del ciclo de vida.'},
    {t:'code', lang:'csharp', title:'MiPrimerScript.cs — archivo real de Unity', code:`using UnityEngine;

public class MiPrimerScript : MonoBehaviour {
  void Start() {
    Debug.Log("¡Nací en la escena!");
  }

  void Update() {
    // corre UNA VEZ POR FRAME (~60 veces por segundo)
    if (Input.GetKeyDown(KeyCode.Space)) {
      Debug.Log("Salto!");
    }
  }
}`},
    {t:'info', title:'ℹ️ Start y Update: el game loop de Unity', h:'<code>Start()</code> corre UNA vez cuando el objeto aparece — ahí inicializas (como nuestros constructores). <code>Update()</code> corre CADA FRAME — ahí viven el input, el movimiento y los timers. Otros miembros del ciclo: <code>FixedUpdate</code> (física), <code>OnTriggerEnter</code> (colisiones), <code>LateUpdate</code> (cámara). El laboratorio no simula frames, pero la LÓGICA que escribiste (estados, daño, azar) es exactamente la que va dentro.'},
    {t:'p', h:'Para instalar: <b>Unity Hub</b> (unity.com/download) → Installs → instala <b>Unity 6.3 LTS</b> → New Project → plantilla 2D o 3D. El editor abre con la escena, la jerarquía (GameObjects), el inspector y la consola donde caen tus <code>Debug.Log</code>. Creas un script con clic derecho en el Project → Create → Scripting → MonoBehaviour Script, lo arrastras a un GameObject y presionas Play.'},
    {t:'warn', title:'⚠️ Los errores del editor ya los conoces', h:'Un typo en el editor → la Console muestra el MISMO formato que aprendiste: <code>CS1002: ; expected</code> en rojo con el archivo y la línea. La diferencia: con un error de compilación Unity no deja darle Play. Ventaja del laboratorio: aquí practicas leerlos sin instalar nada; cuando llegues al editor, ya serán viejos conocidos.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Los scripts de comportamiento en Unity heredan de…', options:['GameObject','MonoBehaviour','Vector3','Console'], correct:1, pts:10, explain:'public class X : MonoBehaviour — así Unity sabe que es un componente.'},
      {type:'mc', q:'El método que corre una vez al aparecer el objeto es…', options:['Update()','Start()','Main()','Init()'], correct:1, pts:10, explain:'Start(): inicialización. Update() es por frame.'},
      {type:'tf', q:'Update() corre una sola vez por partida.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: corre CADA FRAME (≈60 veces/segundo).'},
      {type:'mc', q:'Para probar en el editor real instalas…', options:['Visual Studio y nada más','Unity Hub y desde él Unity 6.3 LTS','Solo un navegador','Blender'], correct:1, pts:10, explain:'Unity Hub gestiona instalaciones y licencias; eliges la versión LTS.'}
    ]}
  ]}
]});

MODULES.push({
  id:'m7', emoji:'🏆', name:'Proyecto: la Batalla de la Librería Esperanza', color:'#22c55e',
  desc:'El juego del curso 6 renace en C#: clases, turnos, inventario y el examen final.',
  lessons:[

  /* -------- 7-1 -------- */
  { id:'7-1', title:'Proyecto I: las clases Slime y Heroe', time:'15 min', blocks:[
    {t:'p', h:'La defensa de la <b>Librería Esperanza</b> regresa: en el curso 6 era Blueprints; ahora es C#. Empezamos por el molde de los personajes. El <code>Heroe</code> guarda vida y stats; los <code>Slime</code> nacen de un constructor con nombre y vida, saben recibir golpes y saben si siguen vivos. Cada ejercicio construye una pieza del proyecto final.'},
    {t:'milestone', title:'🎯 Hito del proyecto', h:'Al terminar las 3 lecciones del módulo 7 tendrás: clases Heroe/Slime completas, una batalla por turnos con log de eventos e inventario, y un reporte final con estadísticas — todo calificado por salida, listo para mostrar.'},
    {t:'code', lang:'csharp', title:'la arquitectura del proyecto', code:`class Slime {
  public string Nombre;
  public int Vida;

  public Slime(string nombre, int vida) {
    Nombre = nombre;
    Vida = vida;
  }

  public void Recibir(int d) { Vida -= d; }
  public bool Vivo() { return Vida > 0; }
}

class Heroe {
  public int Vida = 30;
  public int Danio() { return Random.Range(4, 8); }  // 4 a 7, inclusivo
}`},
    {t:'quiz', questions:[
      {type:'mc', q:'En el proyecto, ¿quién decide el daño del héroe?', options:['El usuario lo teclea','Random.Range(4, 8) con semilla','Siempre 10','El slime'], correct:1, pts:10, explain:'Con InitState la batalla es reproducible: misma secuencia de danios siempre.'},
      {type:'mc', q:'<code>Recibir(int d)</code> es un método…', options:['Estático','De instancia (muta SU vida)','De clase','Constructor'], correct:1, pts:10, explain:'Cada slime aplica el danio a SUS campos.'},
      {type:'tf', q:'El héroe empieza con Vida = 30 por valor inicial de campo.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'public int Vida = 30; — nace listo sin constructor.'},
      {type:'mc', q:'¿Por qué Vida del héroe sin constructor y la del slime con?', options:['Al azar','El slime recibe su vida del MUNDO (oleada); la del héroe es de fábrica','Porque string obliga','No hay diferencia'], correct:1, pts:10, explain:'Valor inicial = de fábrica; constructor = lo que te da la partida.'}
    ]},
    {t:'pyex', title:'🧪 Pieza 1: los moldes', tasks:[
      {q:'Crea la clase <code>Heroe</code> con <code>public int Vida = 30;</code> y el método <code>int Danio()</code> que devuelva 5 (por ahora fijo). Imprime el danio: <code>5</code>.', hint:'int Danio() { return 5; }', check:{lines:['5']}, solution:'class Heroe {\n  public int Vida = 30;\n  public int Danio() {\n    return 5;\n  }\n}\nvar h = new Heroe();\nConsole.WriteLine(h.Danio());', pts:20},
      {q:'Crea <code>class Slime</code> con Nombre, Vida, constructor <code>(string, int)</code>, y método <code>void Recibir(int d)</code> que reste vida. Crea "Burbuja" con 20, recibe 7 e imprime <code>Burbuja: 13</code>.', check:{lines:['Burbuja: 13']}, solution:'class Slime {\n  public string Nombre;\n  public int Vida;\n  public Slime(string nombre, int vida) {\n    Nombre = nombre;\n    Vida = vida;\n  }\n  public void Recibir(int d) {\n    Vida -= d;\n  }\n}\nvar s = new Slime("Burbuja", 20);\ns.Recibir(7);\nConsole.WriteLine($"{s.Nombre}: {s.Vida}");', pts:20},
      {q:'Añade <code>bool Vivo()</code> a Slime. Crea "Viscoso" con 12, golpéalo con 15 (Recibir) e imprime <code>Viscoso vivo: False</code>.', hint:'12 - 15 = -3 → Vivo() false.', check:{lines:['Viscoso vivo: False']}, solution:'class Slime {\n  public string Nombre;\n  public int Vida;\n  public Slime(string nombre, int vida) {\n    Nombre = nombre;\n    Vida = vida;\n  }\n  public void Recibir(int d) {\n    Vida -= d;\n  }\n  public bool Vivo() {\n    return Vida > 0;\n  }\n}\nvar s = new Slime("Viscoso", 12);\ns.Recibir(15);\nConsole.WriteLine($"Viscoso vivo: {s.Vivo()}");', pts:20},
      {q:'El héroe con azar: <code>class Heroe</code> con Vida 30 y <code>int Danio()</code> que devuelva <code>Random.Range(4, 8)</code>. En el programa: <code>Random.InitState(2);</code>, crea el héroe e imprime dos llamadas a h.Danio() en dos líneas (secuencia canónica: <code>7</code> y <code>5</code>).', hint:'Con semilla 2 la secuencia de Range(4, 8) empieza 7, 5: ejecuta y verifica.', check:{lines:['7','5']}, solution:'class Heroe {\n  public int Vida = 30;\n  public int Danio() {\n    return Random.Range(4, 8);\n  }\n}\nRandom.InitState(2);\nvar h = new Heroe();\nConsole.WriteLine(h.Danio());\nConsole.WriteLine(h.Danio());', pts:20},
      {q:'La horda: con la clase Slime completa (Nombre, Vida, ctor, Recibir, Vivo), crea una <code>List<Slime></code> con "Burbuja" (20) y "Viscoso" (15). Imprime el Count: <code>2</code>, y luego la vida de cada uno con el formato <code>Burbuja: 20</code> / <code>Viscoso: 15</code> usando foreach.', hint:'foreach (Slime s in slimes) …', check:{lines:['2','Burbuja: 20','Viscoso: 15']}, solution:'class Slime {\n  public string Nombre;\n  public int Vida;\n  public Slime(string nombre, int vida) {\n    Nombre = nombre;\n    Vida = vida;\n  }\n  public void Recibir(int d) {\n    Vida -= d;\n  }\n  public bool Vivo() {\n    return Vida > 0;\n  }\n}\nvar slimes = new List<Slime>();\nslimes.Add(new Slime("Burbuja", 20));\nslimes.Add(new Slime("Viscoso", 15));\nConsole.WriteLine(slimes.Count);\nforeach (Slime s in slimes) {\n  Console.WriteLine($"{s.Nombre}: {s.Vida}");\n}', pts:20}
    ]}
  ]},

  /* -------- 7-2 -------- */
  { id:'7-2', title:'Proyecto II: la batalla por turnos', time:'16 min', blocks:[
    {t:'p', h:'Ahora la batalla completa: el héroe pelea contra UN slime hasta que alguien cae, con <b>log de eventos</b> (cada turno imprime su línea) e <b>inventario</b> (una <code>List&lt;string&gt;</code> donde guardas y usas pociones). El daño del héroe sale de <code>Random.Range</code> con semilla — batalla reproducible.'},
    {t:'code', lang:'csharp', title:'esqueleto de la batalla', code:`Random.InitState(1);

var heroe = new Heroe();                    // Vida 30
var slime = new Slime("Burbuja", 20);
var inventario = new List<string>();
inventario.Add("pocion");

int turno = 0;
while (heroe.Vida > 0 && slime.Vivo()) {
  turno++;
  int d = heroe.Danio();
  slime.Recibir(d);
  Console.WriteLine($"T{turno}: {slime.Nombre} recibe {d} (vida {slime.Vida})");
}
Console.WriteLine(slime.Vivo() ? "Derrota" : "¡La librería resiste!");`},
    {t:'info', title:'ℹ️ La poción estratégica', h:'El inventario da la capa de decisión: si la vida del héroe baja de un umbral y hay "pocion", la usa (cura 10, se elimina con <code>Remove</code>) y el turno se gasta. En este proyecto la regla es simple, pero es EXACTAMENTE la estructura de un RPG real: comprobar recursos → decidir → ejecutar → registrar en el log.'},
    {t:'warn', title:'⚠️ Cuidado con el muerto que sigue golpeando', h:'Si el slime muere a mitad del turno, NO debe devolver el golpe: revisa <code>Vivo()</code> antes del contraataque. Los bugs clásicos de turnos (el muerto que golpea, el turno que se cuenta doble) se evitan con este orden: golpeas → ¿vive? → si vive, responde.'},
    {t:'quiz', questions:[
      {type:'mc', q:'La condición del while de batalla es…', options:['while (true)','mientras el héroe viva Y el slime viva','while (turno < 10)','while (inventario.Count > 0)'], correct:1, pts:10, explain:'Ambos vivos: termina por muerte de cualquiera.'},
      {type:'mc', q:'El inventario se modela como…', options:['Un string','Un array fijo','List<string>','Un int'], correct:2, pts:10, explain:'Crece y encoge (Remove de la poción usada): List<string>.'},
      {type:'tf', q:'Después de que el slime muere, todavía devuelve el golpe del turno.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: se comprueba Vivo() antes del contraataque.'},
      {type:'mc', q:'La semilla del Random en el proyecto sirve para…', options:['Que la batalla sea distinta cada vez','Que la salida sea reproducible y calificable','Nada','Aumentar el daño'], correct:1, pts:10, explain:'Sin semilla no habría salida única: la calificación exige reproducibilidad.'}
    ]},
    {t:'pyex', title:'🧪 Pieza 2: el combate', tasks:[
      {q:'Batalla básica: héroe con Vida 30 y Danio() fijo de 6 (sin Random); slime "Burbuja" con 20. Mientras el slime viva, golpéalo e imprime <code>Golpe: vida del slime = X</code> cada vez (20→14→8→2→-4). Al final imprime <code>Victoria</code>.', hint:'while (s.Vivo()) { s.Recibir(6); Console.WriteLine($"Golpe: vida del slime = {s.Vida}"); }', check:{lines:['Golpe: vida del slime = 14','Golpe: vida del slime = 8','Golpe: vida del slime = 2','Golpe: vida del slime = -4','Victoria']}, solution:'class Slime {\n  public string Nombre;\n  public int Vida;\n  public Slime(string nombre, int vida) {\n    Nombre = nombre;\n    Vida = vida;\n  }\n  public void Recibir(int d) {\n    Vida -= d;\n  }\n  public bool Vivo() {\n    return Vida > 0;\n  }\n}\nclass Heroe {\n  public int Vida = 30;\n  public int Danio() {\n    return 6;\n  }\n}\nvar heroe = new Heroe();\nvar s = new Slime("Burbuja", 20);\nwhile (s.Vivo()) {\n  s.Recibir(heroe.Danio());\n  Console.WriteLine($"Golpe: vida del slime = {s.Vida}");\n}\nConsole.WriteLine("Victoria");', pts:20},
      {q:'Con contraataque: héroe 30 HP (danio fijo 6), slime "Viscoso" 25 HP con golpe fijo de 5. Por turno: golpeas tú e imprimes <code>T{turno}: slime en X</code>; si sigue vivo, él responde e imprime <code>T{turno}: héroe en Y</code>. El turno sube en CADA acción (empiezas tú, T1). Para cuando alguien caiga; imprime <code>Fin</code>.', hint:'while (ambos vivos) { turno++; tú golpeas; if (s.Vivo()) { imprime tú también… } — cuidado con el orden pedido.', check:{lines:['T1: slime en 19','T2: héroe en 25','T3: slime en 13','T4: héroe en 20','T5: slime en 7','T6: héroe en 15','T7: slime en 1','T8: héroe en 10','T9: slime en -5','Fin']}, solution:'class Slime {\n  public int Vida;\n  public Slime(int vida) {\n    Vida = vida;\n  }\n  public void Recibir(int d) {\n    Vida -= d;\n  }\n  public bool Vivo() {\n    return Vida > 0;\n  }\n}\nclass Heroe {\n  public int Vida = 30;\n  public int Danio() {\n    return 6;\n  }\n}\nvar heroe = new Heroe();\nvar s = new Slime(25);\nint turno = 0;\nwhile (heroe.Vida > 0 && s.Vivo()) {\n  turno++;\n  s.Recibir(heroe.Danio());\n  Console.WriteLine($"T{turno}: slime en {s.Vida}");\n  if (s.Vivo()) {\n    turno++;\n    heroe.Vida -= 5;\n    Console.WriteLine($"T{turno}: héroe en {heroe.Vida}");\n  }\n}\nConsole.WriteLine("Fin");', pts:20},
      {q:'La poción: héroe 10 HP, una List<string> con "pocion". Si la vida del héroe es menor a 15 Y el inventario contiene "pocion": imprime <code>Usa poción (+10)</code>, quítala (Remove) y súmale 10 a la vida. Imprime <code>Vida: X</code> y <code>Pociones: Y</code> al final.', hint:'if (heroe.Vida < 15 && inv.Contains("pocion")) { inv.Remove("pocion"); heroe.Vida += 10; }', check:{lines:['Usa poción (+10)','Vida: 20','Pociones: 0']}, solution:'class Heroe {\n  public int Vida = 10;\n}\nvar heroe = new Heroe();\nvar inv = new List<string>();\ninv.Add("pocion");\nif (heroe.Vida < 15 && inv.Contains("pocion")) {\n  inv.Remove("pocion");\n  heroe.Vida += 10;\n  Console.WriteLine("Usa poción (+10)");\n}\nConsole.WriteLine($"Vida: {heroe.Vida}");\nConsole.WriteLine($"Pociones: {inv.Count}");', pts:20},
      {q:'El log completo con azar: <code>Random.InitState(1)</code>, héroe (Vida 30, Danio() = Random.Range(4, 8)), slime "Burbuja" (20). Por turno: imprime <code>T{turno}: dano {d}</code> con el danio canónico. Pelea hasta que el slime muera e imprime cada turno en su línea y al final <code>Slime derrotado en N turnos</code> con N real (calculado).', hint:'Con InitState(1) la secuencia de Range(4, 8) es 7, 4, 6, 8…: el slime baja 20→13→9→3→-5.', check:{lines:['T1: dano 7','T2: dano 4','T3: dano 6','T4: dano 8','Slime derrotado en 4 turnos']}, solution:'class Slime {\n  public int Vida;\n  public Slime(int vida) {\n    Vida = vida;\n  }\n  public void Recibir(int d) {\n    Vida -= d;\n  }\n  public bool Vivo() {\n    return Vida > 0;\n  }\n}\nclass Heroe {\n  public int Vida = 30;\n  public int Danio() {\n    return Random.Range(4, 8);\n  }\n}\nRandom.InitState(1);\nvar heroe = new Heroe();\nvar s = new Slime(20);\nint turno = 0;\nwhile (s.Vivo()) {\n  turno++;\n  int d = heroe.Danio();\n  s.Recibir(d);\n  Console.WriteLine($"T{turno}: dano {d}");\n}\nConsole.WriteLine($"Slime derrotado en {turno} turnos");', pts:20},
      {q:'Dos slimes en fila: héroe (danio fijo 6, Vida 30) pelea PRIMERO a "Burbuja" (14 HP) y LUEGO a "Viscoso" (10 HP), uno a uno con un foreach. Imprime <code>{Nombre} cae</code> cuando cada uno muera. Los nombres: Burbuja y Viscoso.', hint:'foreach (Slime s in fila) { while (s.Vivo()) { s.Recibir(6); } Console.WriteLine($"{s.Nombre} cae"); }', check:{lines:['Burbuja cae','Viscoso cae']}, solution:'class Slime {\n  public string Nombre;\n  public int Vida;\n  public Slime(string nombre, int vida) {\n    Nombre = nombre;\n    Vida = vida;\n  }\n  public void Recibir(int d) {\n    Vida -= d;\n  }\n  public bool Vivo() {\n    return Vida > 0;\n  }\n}\nvar fila = new List<Slime>();\nfila.Add(new Slime("Burbuja", 14));\nfila.Add(new Slime("Viscoso", 10));\nforeach (Slime s in fila) {\n  while (s.Vivo()) {\n    s.Recibir(6);\n  }\n  Console.WriteLine($"{s.Nombre} cae");\n}', pts:20}
    ]}
  ]},

  /* -------- 7-3 -------- */
  { id:'7-3', title:'Proyecto III: el reporte final y el examen', time:'14 min', blocks:[
    {t:'p', h:'Cierre del proyecto: el <b>reporte de batalla</b>. Al terminar el combate, un buen juego cuenta lo que pasó: turnos durados, daño total infligido, golpes dados, inventario restante. El patrón: <b>acumuladores</b> alimentados durante la batalla y una impresión final formateada con interpolación.'},
    {t:'code', lang:'csharp', title:'reporte.cs', code:`// acumuladores durante la batalla
int danioTotal = 0;
int golpes = 0;

// … dentro del ciclo: danioTotal += d; golpes++;

Console.WriteLine("═══ REPORTE DE BATALLA ═══");
Console.WriteLine($"Turnos: {turno}");
Console.WriteLine($"Golpes: {golpes}");
Console.WriteLine($"Danio total: {danioTotal}");
Console.WriteLine($"Vida del héroe: {heroe.Vida}");`},
    {t:'info', title:'ℹ️ Cómo se califica esta batalla', h:'Tu batalla usa <code>Random.InitState</code>, así que la secuencia de danios es una cadena fija: 7, 6, 7… El calificador compara tu salida línea a línea con la esperada. Si tu log difiere, revisa: ¿la semilla antes de crear los objetos? ¿el orden de los turnos? ¿imprimiste la vida ANTES o DESPUÉS de restar? Es depuración de verdad.'},
    {t:'p', h:'Y la estrategia para el <b>examen final</b> (30 preguntas, 300 puntos, 70 % para aprobar): repasa las tablas de cada lección (son los resúmenes), las excepciones del módulo 6, las diferencias C# vs Python (int/int trunca, True/False con mayúscula, Range inclusivo) y los tres patrones de colecciones. Las flashcards SRS del curso (mazo «cscore») están sincronizadas con el examen.'},
    {t:'srs', deck:'cscore', sub:'Última pasada de repetición espaciada antes del examen: campos, constructores, excepciones y patrones.'},
    {t:'milestone', title:'🏅 Curso completado', h:'Si llegaste aquí: escribiste C# real — variables exactas, ciclos, clases con comportamiento, azar reproducible y manejo de errores. Siguiente parada: instalar Unity 6.3 LTS con Unity Hub y portar tu batalla a un script MonoBehaviour. La librería Esperanza está a salvo.'},
    {t:'quiz', questions:[
      {type:'mc', q:'El reporte de batalla se construye con…', options:['Un array fijo','Acumuladores durante el combate','La memoria del Random','Un for al final'], correct:1, pts:10, explain:'danioTotal, golpes, turno: se van sumando mientras ocurre la batalla.'},
      {type:'mc', q:'¿Por qué la batalla calificada lleva InitState?', options:['Para hacerla más difícil','Porque sin semilla la salida cambiaría y no sería calificable','Es obligatorio de C#','Para acelerar'], correct:1, pts:10, explain:'Reproducibilidad = calificabilidad.'},
      {type:'tf', q:'Para aprobar el examen necesitas al menos 70 % de 300 puntos.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'210 de 300: el mismo umbral de todos los cursos del campus.'},
      {type:'mc', q:'Tu salida difiere en la línea 3 del log. Primero revisas…', options:['El nombre del archivo','El orden: ¿semilla antes de tirar? ¿imprimo antes o después de restar?','El sistema operativo','Nada, es aleatorio'], correct:1, pts:10, explain:'Semilla al inicio y orden de impresión: las dos causas del 90 % de los diffs.'}
    ]},
    {t:'pyex', title:'🧪 Pieza 3: el reporte', tasks:[
      {q:'Batalla con estadísticas: héroe (danio fijo 5), slime "Gel" (12 HP). Mientras viva: golpéalo y acumula danioTotal y golpes. Al final imprime DOS líneas:<br><code>Golpes: 3</code><br><code>Danio: 15</code> (valores reales calculados).', hint:'12/5: golpes 12→7→2→-3: 3 golpes, 15 de danio.', check:{lines:['Golpes: 3','Danio: 15']}, solution:'class Slime {\n  public int Vida;\n  public Slime(int vida) {\n    Vida = vida;\n  }\n  public void Recibir(int d) {\n    Vida -= d;\n  }\n  public bool Vivo() {\n    return Vida > 0;\n  }\n}\nvar s = new Slime(12);\nint danioTotal = 0;\nint golpes = 0;\nwhile (s.Vivo()) {\n  s.Recibir(5);\n  danioTotal += 5;\n  golpes++;\n}\nConsole.WriteLine($"Golpes: {golpes}");\nConsole.WriteLine($"Danio: {danioTotal}");', pts:20},
      {q:'Reporte con azar: <code>Random.InitState(1)</code>, héroe con Danio() = Range(4,8), slime "Burbuja" (20 HP). Pelea acumulando. Al final imprime:<br><code>Turnos: 4</code> — pero calculado con interpolación, no escrito.<br>(Con semilla 1 la secuencia de Range(4, 8) es 7, 4, 6, 8.)', hint:'Igual que el log del 7-2 pero solo el total de turnos al final.', check:{lines:['Turnos: 4']}, solution:'class Slime {\n  public int Vida;\n  public Slime(int vida) {\n    Vida = vida;\n  }\n  public void Recibir(int d) {\n    Vida -= d;\n  }\n  public bool Vivo() {\n    return Vida > 0;\n  }\n}\nclass Heroe {\n  public int Vida = 30;\n  public int Danio() {\n    return Random.Range(4, 8);\n  }\n}\nRandom.InitState(1);\nvar h = new Heroe();\nvar s = new Slime(20);\nint turno = 0;\nwhile (s.Vivo()) {\n  turno++;\n  s.Recibir(h.Danio());\n}\nConsole.WriteLine($"Turnos: {turno}");', pts:20},
      {q:'Inventario final: crea una List<string> con "pocion", "llave", "mapa". Usa la poción (Remove) e imprime el inventario restante con foreach en formato <code>- item</code> (dos líneas: llave y mapa, en su orden).', hint:'inv.Remove("pocion"); foreach (string it in inv) …', check:{lines:['- llave','- mapa']}, solution:'var inv = new List<string>();\ninv.Add("pocion");\ninv.Add("llave");\ninv.Add("mapa");\ninv.Remove("pocion");\nforeach (string it in inv) {\n  Console.WriteLine("- " + it);\n}', pts:20},
      {q:'El reporte completo del héroe: vida final del héroe tras UNA batalla con danio canónico (semilla 1, héroe 30, slime 20 con contraataque fijo de 4 cada turno vivo; tú pegas con Range(4,8)). Secuencia: T1 pegas 7 (slime 13), slime pega (26); T2 pegas 6 (slime 7), pega (22); T3 pegas 7 (slime 0, muerto, NO responde). Imprime <code>Héroe: 18</code> calculado.', hint:'El contraataque solo si s.Vivo(). El slime responde en T1, T2 y T3: 30 - 4×3 = 18.', check:{lines:['Héroe: 18']}, solution:'class Slime {\n  public int Vida;\n  public Slime(int vida) {\n    Vida = vida;\n  }\n  public void Recibir(int d) {\n    Vida -= d;\n  }\n  public bool Vivo() {\n    return Vida > 0;\n  }\n}\nclass Heroe {\n  public int Vida = 30;\n  public int Danio() {\n    return Random.Range(4, 8);\n  }\n}\nRandom.InitState(1);\nvar h = new Heroe();\nvar s = new Slime(20);\nwhile (h.Vida > 0 && s.Vivo()) {\n  s.Recibir(h.Danio());\n  if (s.Vivo()) {\n    h.Vida -= 4;\n  }\n}\nConsole.WriteLine($"Héroe: {h.Vida}");', pts:20}
    ]},

    /* ===== EXAMEN FINAL ===== */
    {t:'exam'}
  ]}
]});

/* ============================================================
   EXAMEN FINAL — 30 preguntas × 10 pts = 300
   20 mc · 7 fill · 3 tf
   ============================================================ */
const EXAM = {
  questions:[
    {type:'mc',  q:'M0 · En Unity, la lógica del juego se escribe en…', options:['Blueprints','C#','Python','Lua'], correct:1, pts:10, explain:'Unity usa C#. Blueprints es de Unreal (curso 6).'},
    {type:'mc',  q:'M0 · ¿Qué imprime <code>Console.WriteLine(true)</code>?', options:['true','True','TRUE','1'], correct:1, pts:10, explain:'Los bools se imprimen con mayúscula inicial: True/False.'},
    {type:'mc',  q:'M0 · Falta el punto y coma al final de una línea. El código es…', options:['CS0103','CS1002','CS1525','CS1061'], correct:1, pts:10, explain:'CS1002: falta «;». El error más común al venir de Python.'},
    {type:'fill', q:'M1 · Tipo decimal de Unity cuyo literal exige el sufijo f: ___', accept:['float'], re:'^\\s*float\\s*;?\\s*$', pts:10, explain:'float velocidad = 2.5f; — sin la f, el literal es double.'},
    {type:'mc',  q:'M1 · <code>Console.WriteLine(9 / 2)</code> imprime…', options:['4.5','4','5','Error'], correct:1, pts:10, explain:'int/int trunca hacia cero: 4.'},
    {type:'mc',  q:'M1 · <code>Console.WriteLine(-7 % 3)</code> imprime…', options:['1','-1','2','2.33'], correct:1, pts:10, explain:'El % conserva el signo del dividendo: -1.'},
    {type:'mc',  q:'M1 · ¿Qué imprime <code>$"{3.5f:F2}"</code>?', options:['3.5','3.50','3,50','F2'], correct:1, pts:10, explain:'F2 fija dos decimales: 3.50.'},
    {type:'mc',  q:'M1 · El jugador teclea "abc" y haces int.Parse. Salta…', options:['NullReferenceException','FormatException','CS1002','DivideByZeroException'], correct:1, pts:10, explain:'Texto no numérico: FormatException.'},
    {type:'mc',  q:'M2 · En <code>a && b</code>, si a es false…', options:['b se evalúa','b NO se evalúa (cortocircuito)','Da error','Ambas se evalúan dos veces'], correct:1, pts:10, explain:'&& es perezoso: con a falso, b ni se mira.'},
    {type:'tf',   q:'M2 · <code>for (int i = 0; i < 3; i++)</code> hace exactamente 3 vueltas.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Empieza en 0, para antes de 3: 0, 1, 2.'},
    {type:'fill', q:'M2 · Palabra que sale de un ciclo de inmediato: ___', accept:['break'], re:'^\\s*break\\s*;?\\s*$', pts:10, explain:'break abandona el ciclo; continue salta a la siguiente vuelta.'},
    {type:'mc',  q:'M2 · <code>do { … } while (cond);</code> garantiza…', options:['Nunca terminar','Al menos una vuelta','Dos vueltas','Que cond sea true'], correct:1, pts:10, explain:'La condición se revisa al final: primera vuelta asegurada.'},
    {type:'mc',  q:'M3 · El tamaño de un array se lee con…', options:['Count','Length','size()','Count()'], correct:1, pts:10, explain:'Length para arrays; Count para List<T>.'},
    {type:'mc',  q:'M3 · Para quitar de una List por ÍNDICE usas…', options:['Remove','RemoveAt','Delete','Pop'], correct:1, pts:10, explain:'RemoveAt(i) por índice; Remove(valor) por valor.'},
    {type:'fill', q:'M3 · Propiedad de List<T> que da la cantidad de elementos: ___', accept:['Count'], re:'^\\s*Count\\s*;?\\s*$', pts:10, explain:'lista.Count. En arrays es Length (¡no mezclar!).'},
    {type:'mc',  q:'M3 · <code>Random.Range(1, 6)</code> con enteros en Unity…', options:['Da 1 a 5','Da 1 a 6, inclusivo','Da 0 a 5','Lanza error'], correct:1, pts:10, explain:'El Range de Unity es inclusivo en ambos extremos.'},
    {type:'mc',  q:'M3 · Antes de dos tandas iguales de Random, para que salgan IGUAL, llamas…', options:['Random.InitState(misma semilla)','Random.Clear()','Console.Clear()','Nada'], correct:0, pts:10, explain:'Misma semilla → misma secuencia: partidas reproducibles.'},
    {type:'fill', q:'M4 · Palabra que declara un método SIN valor de retorno: ___', accept:['void'], re:'^\s*void\s*;?\s*$', pts:10, explain:'void Saludar() { … } — solo ejecuta; para devolver, el tipo del valor y return.'},
    {type:'fill', q:'M4 · Palabra que devuelve un valor desde un método: ___', accept:['return'], re:'^\\s*return\\s*;?\\s*$', pts:10, explain:'return termina el método y entrega el valor.'},
    {type:'mc',  q:'M4 · <code>int P(int b, int e = 2)</code> — P(3) vale…', options:['6','8','9','Error: falta e'], correct:2, pts:10, explain:'e usa su default (2): 3² = 9.'},
    {type:'mc',  q:'M4 · La recursión sin caso base termina en…', options:['CS1002','StackOverflowException','FormatException','Un resultado 0'], correct:1, pts:10, explain:'La pila se agota: StackOverflowException.'},
    {type:'fill', q:'M5 · Palabra clave que crea (instancia) un objeto: ___ Clase()', accept:['new'], re:'^\s*new\s*;?\s*$', pts:10, explain:'new Slime("Burbuja", 30): reserva el objeto y corre el constructor.'},
    {type:'mc',  q:'M5 · El constructor se llama…', options:['como la clase','Main','Init','Cualquier nombre'], correct:0, pts:10, explain:'Mismo nombre que la clase, sin tipo de retorno.'},
    {type:'fill', q:'M5 · El error famoso de Unity al usar un objeto null: ___ ___ (dos palabras)', accept:['NullReferenceException'], re:'^\\s*NullReferenceException\\s*;?\\s*$', pts:10, explain:'NullReferenceException: la referencia no apunta a ningún objeto.'},
    {type:'mc',  q:'M5 · <code>new Vector3(3, 4, 0).magnitude</code> vale…', options:['7','5','12','25'], correct:1, pts:10, explain:'sqrt(9+16) = 5: pitágoras.'},
    {type:'tf',   q:'M3 · foreach funciona igual de bien sobre arrays y sobre List<T>.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Ambas son colecciones: foreach las visita igual.'},
    {type:'tf',   q:'M6 · El bloque finally se ejecuta solo si hubo excepción.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: SIEMPRE se ejecuta; para eso existe.'},
    {type:'mc',  q:'M6 · En un script de Unity, el método que corre cada frame es…', options:['Start()','Update()','Main()','FixedUpdate()'], correct:1, pts:10, explain:'Update(): una vez por frame. Start(): una vez al nacer.'},
    {type:'mc',  q:'M7 · En la batalla por turnos, la condición del while es…', options:['while (true)','Mientras el héroe Y el slime estén vivos','while (turno < 3)','while (inventario.Count > 0)'], correct:1, pts:10, explain:'El duelo dura mientras AMBOS vivan: termina al caer cualquiera.'},
    {type:'mc',  q:'M7 · El reporte final de la batalla se arma con…', options:['Acumuladores (danioTotal, golpes) durante el combate','Un Random extra','El array de slimes','Un catch'], correct:0, pts:10, explain:'Los acumuladores se llenan turno a turno y se imprimen al final.'}
  ]
};
