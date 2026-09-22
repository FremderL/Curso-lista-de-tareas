/* ============================================================
   CURSO 7 UNITY (C#) · LIBRO DE TEXTO (9 capítulos)
   Bibliografía verificada: ver capítulo 9.
   ============================================================ */
const TEXTBOOK = [
  { n:1, emoji:'🎮', short:'Qué es Unity y C#', title:'Unity, C# y por qué son la pareja perfecta', time:'10 min', blocks:[
    {t:'p', h:'<b>Unity</b> nació en 2005 en Dinamarca con una idea democrática: que hacer un juego no exigiera un estudio gigante. Hoy es el motor más usado del mundo en indie y móvil: <i>Hollow Knight</i>, <i>Cuphead</i>, <i>Among Us</i>, <i>Subway Surfers</i>, <i>Genshin Impact</i>. Su lenguaje de scripting es <b>C#</b> (Anders Hejlsberg, Microsoft, 2000): un lenguaje moderno, rápido, con tipos exactos y el ecosistema .NET detrás.'},
    {t:'table', head:['Año','Hito','Por qué importa'], rows:[
      ['2000','Microsoft presenta C# y .NET','Un lenguaje «serio» pero accesible'],
      ['2005','Unity 1.0 elige C#','El indie mundial gana un motor'],
      ['2010s','Explosión móvil (iOS/Android)','Unity domina el mercado móvil'],
      ['2021','Unity en bolsa (NYSE: U)','Consolidación como plataforma'],
      ['dic 2025','Unity 6.3 LTS','La versión recomendada para producción (soporte hasta dic 2027)']
    ]},
    {t:'info', title:'ℹ️ LTS vs Update', h:'Unity libera versiones <b>LTS</b> (Long Term Support: estables, soportadas ~2 años) y versiones <b>Update</b> (novedades cada pocos meses, para pre-producción). Para aprender y para lanzar juegos: la LTS. En septiembre de 2026 la LTS vigente es <b>6.3</b> (6000.3.x). Las versiones de este curso y sus ejemplos funcionan en cualquier Unity 6.'},
    {t:'p', h:'En este curso C# se escribe <b>como texto</b> (¡por fin un lenguaje de texto en el campus!). El mini-interpreter del laboratorio ejecuta un subconjunto honesto de C# moderno: todo lo que practiques aquí compilará casi igual en el editor real. Lo que cambia en Unity no es el lenguaje: es QUE tu clase hereda de MonoBehaviour y Unity la llama por ti.'}
  ]},

  { n:2, emoji:'🖥️', short:'Instala el editor real', title:'De este laboratorio a Unity Hub', time:'12 min', blocks:[
    {t:'p', h:'El día que quieras construir de verdad, instalar Unity toma ~20 minutos (descarga mediante) y todo lo aprendido traslada 1 a 1.'},
    {t:'list', items:[
      '<b>1. Unity Hub:</b> descárgalo de <code>unity.com/download</code>. Es el gestor de instalaciones, licencias y proyectos.',
      '<b>2. Instala el editor:</b> en Hub → Installs → Install Editor → elige la versión <b>6.3 LTS</b> (la que dice LTS).',
      '<b>3. Crea un proyecto:</b> Hub → New Project → plantilla «Universal 2D» o «Universal 3D».',
      '<b>4. Tu primer script:</b> en el Project, clic derecho → Create → Scripting → MonoBehaviour Script → nómbralo <code>MiPrimerScript</code> (el nombre del archivo DEBE coincidir con el de la clase).',
      '<b>5. Pégalo en el mundo:</b> arrastra el script sobre un GameObject en la jerarquía y presiona <b>Play</b>. Los <code>Debug.Log</code> aparecen en la pestaña Console.'
    ]},
    {t:'code', lang:'csharp', title:'MiPrimerScript.cs — así se ve un componente real', code:`using UnityEngine;

public class MiPrimerScript : MonoBehaviour {
  public int vida = 100;             // ¡este campo aparece en el Inspector!

  void Start() {
    Debug.Log("¡Nací! Vida inicial: " + vida);
  }

  void Update() {
    if (Input.GetKeyDown(KeyCode.Space)) {
      vida -= 10;
      Debug.Log("Salto con daño. Vida: " + vida);
    }
  }
}`},
    {t:'warn', title:'⚠️ Con un error de compilación, Unity no da Play', h:'La Console del editor muestra los mismos CS del laboratorio (CS1002, CS0103…) con archivo y línea. Doble clic en el error abre Visual Studio en la línea exacta. Ventaja: aquí ya sabes leerlos — son los mismos que rompiste a propósito en la lección 0-2.'},
    {t:'p', h:'El campo <code>public int vida</code> aparece EDITABLE en el Inspector de Unity: esa es la magia del [Inspector] — los campos públicos de un MonoBehaviour son los «knobs» del componente. Por eso este curso insiste en campos públicos con nombres claros.'}
  ]},

  { n:3, emoji:'🔢', short:'Tipos y operadores', title:'Referencia rápida: tipos y operadores', time:'12 min', blocks:[
    {t:'table', head:['Tipo','Ejemplo literal','Notas'], rows:[
      ['<code>int</code>','42, -7','Enteros; int/int TRUNCA hacia cero'],
      ['<code>float</code>','2.5f','El sufijo f es obligatorio en literales'],
      ['<code>double</code>','2.5','Decimal grande (sin f); en Unity casi siempre float'],
      ['<code>bool</code>','true, false','Se imprime True/False'],
      ['<code>string</code>','"Ada"','Comillas dobles; indexable s[0]'],
      ['<code>char</code>',"'a'","UN carácter con comillas SIMPLES"],
      ['<code>var</code>','var x = 5;','El compilador infiere (int aquí)']
    ]},
    {t:'table', head:['Operador','Nombre','Detalle que sorprende'], rows:[
      ['<code>/</code>','división','int/int trunca: 10/4 → 2 · con float: real'],
      ['<code>%</code>','módulo','Resto con signo del dividendo: -7 % 3 → -1'],
      ['<code>==  !=</code>','comparación','strings se comparan por VALOR: "a" == "a" → True'],
      ['<code>&amp;&amp; ||</code>','lógica','Cortocircuito: el lado derecho ni se evalúa si sobra'],
      ['<code>+= -= *=</code>','compuestos','oro += 25 equivale a oro = oro + 25'],
      ['<code>++ --</code>','incremento','i++ devuelve el valor ANTES de sumar (postfijo)'],
      ['<code>(int)</code>','cast','Corta decimales: (int)3.9 → 3, (int)-3.9 → -3']
    ]},
    {t:'info', title:'ℹ️ Formato de números en pantalla', h:'Interpolación con especificador: <code>$"{x:F2}"</code> fuerza 2 decimales (F0 a F3). En los puntos medios el formato F redondea alejándose de cero (1234.5 con F0 → 1235). Los floats enteros se imprimen sin .0 en el laboratorio (5f → 5) y los Vector3 SIEMPRE con un decimal por componente: (1.0, 0.0, -2.0).'},
    {t:'p', h:'Conversión texto→número: <code>int.Parse("42")</code>, <code>float.Parse("3.5")</code>, <code>Convert.ToInt32("7")</code>. Texto inválido → <code>FormatException</code>. Y al revés, cualquier cosa concatena a string con <code>+</code> o entra en interpolación.'}
  ]},

  { n:4, emoji:'🔀', short:'Control de flujo', title:'Referencia rápida: decisiones y ciclos', time:'11 min', blocks:[
    {t:'code', lang:'csharp', title:'chuleta de flujo', code:`// decisión
if (vida >= 90) { } else if (vida >= 50) { } else { }

// ciclos
while (vida > 0) { vida -= 10; }              // condición ANTES
do { Comer(); } while (hambre > 0);           // al menos UNA vez
for (int i = 0; i < 10; i++) { }              // N vueltas
foreach (int d in danios) { suma += d; }      // toda la colección

// escapes
break;        // sale del ciclo ya
continue;     // salta a la siguiente vuelta
return x;     // sale del método con valor (o return; en void)`},
    {t:'info', title:'ℹ️ Las tres reglas de oro', h:'1) La condición del if/while va SIEMPRE entre paréntesis. 2) <code>else if</code> se evalúa en orden: pon las condiciones de más estricta a más laxa. 3) Un ciclo necesita una línea que acerque su fin (paso, break o cambio de estado) — si no: infinito.'},
    {t:'table', head:['Patrón','Forma','Uso en juegos'], rows:[
      ['Centinela','<code>while (true) { … if (salir) break; }</code>','Leer entrada hasta un valor especial'],
      ['Acumulador','<code>total += x;</code> fuera del ciclo','Suma de danios, oro recolectado'],
      ['Contador','<code>if (cond) n++;</code>','Cuántos cumplen (críticos, muertos)'],
      ['Corredor de máx','<code>if (x > max) max = x;</code>','Mejor puntaje, enemigo más fuerte'],
      ['Turno alternado','<code>turno % 2</code>','Por turnos: jugador / enemigo']
    ]},
    {t:'p', h:'El operador ternario <code>cond ? a : b</code> es un if en una expresión: <code>Console.WriteLine(slime.Vivo() ? "Sigue" : "Cayó");</code>. Úsalo para asignaciones cortas, nunca para lógica anidada.'}
  ]},

  { n:5, emoji:'📦', short:'Colecciones', title:'Referencia rápida: arrays, List y strings', time:'12 min', blocks:[
    {t:'table', head:['Colección','Crear','Tamaño','Agregar/Quitar'], rows:[
      ['Array','<code>int[] a = {1,2};</code> · <code>new int[3]</code>','<code>.Length</code>','Nada (tamaño fijo)'],
      ['<code>List&lt;T&gt;</code>','<code>new List&lt;int&gt;()</code>','<code>.Count</code>','Add / Remove / RemoveAt / Clear'],
      ['String','"texto" (inmutable)','<code>.Length</code>','Rebanar con Substring']
    ]},
    {t:'code', lang:'csharp', title:'chuleta de colecciones', code:`int[] a = { 40, 85, 12 };
Console.WriteLine(a[a.Length - 1]);       // 12 — el último

var l = new List<string>();
l.Add("pocion"); l.Add("llave");
Console.WriteLine(l.Contains("llave"));   // True
l.RemoveAt(0);                            // quita por índice
foreach (string it in l) Console.WriteLine(it);

string s = "Libreria Esperanza";
Console.WriteLine(s.ToUpper());           // LIBRERIA ESPERANZA
Console.WriteLine(s.Substring(9));        // Esperanza
Console.WriteLine(s.Replace("Libreria", "Torre"));
string[] partes = s.Split(" ");           // ["Libreria", "Esperanza"]`},
    {t:'warn', title:'⚠️ Length vs Count', h:'Arrays usan <code>.Length</code>; List usa <code>.Count</code>. Mezclarlos es CS1061 y es el error de colección más común del campus de Unity. Truco mental: la List es «viva» (cuenta sus elementos, Count) y el array es «una tabla» (tiene un largo fabricado, Length).'},
    {t:'info', title:'ℹ️ ¿Array o List?', h:'<b>Array</b> para datos fijos del diseño: waypoints de una ruta, sonidos de un enemigo, las 8 direcciones. <b>List</b> para lo que el jugador cambia: inventario, oleadas vivas, puntajes de la sesión. Regla del curso: si alguna vez necesitas Add o Remove, es List.'}
  ]},

  { n:6, emoji:'🧱', short:'Clases y objetos', title:'Referencia rápida: clases, objetos y encapsulación', time:'12 min', blocks:[
    {t:'code', lang:'csharp', title:'anatomía de una clase', code:`class Slime {
  // campos (los datos)
  public string Nombre;
  public int Vida = 20;                 // valor inicial "de fábrica"

  // constructor (el nacimiento)
  public Slime(string nombre, int vida) {
    Nombre = nombre;
    Vida = vida;
  }

  // métodos de instancia (el comportamiento)
  public void Recibir(int d) { Vida -= d; }
  public bool Vivo() { return Vida > 0; }
  public override string ToString() { return Nombre + ":" + Vida; }  // en C# real
}`},
    {t:'table', head:['Concepto','Regla','Error típico'], rows:[
      ['<code>new</code>','Crea el objeto y corre el constructor','Llamar new Slime() cuando el ctor exige args (CS1729)'],
      ['Campos públicos','Visibles con punto desde afuera','Buscar un campo inexistente (CS1061)'],
      ['Constructor','Mismo nombre que la clase, SIN retorno','Ponerle void (deja de ser constructor)'],
      ['Métodos de instancia','Usan los campos de ESTE objeto (this)','Esperar que dos objetos compartan vida'],
      ['Encapsulación','La clase calcula lo suyo (Estado(), Vivo())','Duplicar la lógica fuera de la clase']
    ]},
    {t:'info', title:'ℹ️ Referencias y null', h:'Una variable de clase NO contiene el objeto: contiene una <b>referencia</b> (la dirección). Dos variables pueden apuntar al MISMO slime — y bajarle la vida desde cualquiera. Y si una referencia vale <code>null</code> (nadie, todavía), usar el punto revienta: <code>NullReferenceException</code>, el error más publicado de la historia de Unity. Antes de usar, pregunta: <code>if (objetivo != null)</code>.'},
    {t:'p', h:'Del curso 6 recuerda la lógica de estados y oleadas: aquí los modelas con clases (cada slime un objeto con su vida) en vez de variables de Blueprint. El proyecto final del curso hace exactamente ese traslado con la Batalla de la Librería Esperanza.'}
  ]},

  { n:7, emoji:'📐', short:'Matemática de Unity', title:'Vector3, Mathf y Random: la matemática del motor', time:'12 min', blocks:[
    {t:'code', lang:'csharp', title:'chuleta Vector3', code:`var v = new Vector3(1, 2, 3);
var paso = new Vector3(0, 1, 0);
Console.WriteLine(v + paso);        // (1.0, 3.0, 3.0) — componente a componente
Console.WriteLine(v - paso);
Console.WriteLine(v * 2);           // (2.0, 4.0, 6.0) — escala
Console.WriteLine(v.magnitude);     // raíz(x²+y²+z²)
Console.WriteLine(v.y);             // 3 (componentes en minúscula)
Console.WriteLine(Vector3.Up);      // (0.0, 1.0, 0.0)
Vector3.Distance(a, b);             // largo entre dos puntos`},
    {t:'table', head:['Mathf / Math','Qué hace','Nota fina'], rows:[
      ['<code>Floor / Ceil</code>','Piso / techo','Floor(3.7)=3 · Ceil(3.2)=4'],
      ['<code>Round</code>','Redondeo','Mathf aleja de cero (2.5→3); Math bancario (2.5→2)'],
      ['<code>Abs / Max / Min</code>','Valor absoluto / mayor / menor','Max(2, 9) = 9'],
      ['<code>Sqrt / Pow</code>','Raíz / potencia','Pow(2, 5) = 32'],
      ['<code>Clamp(v, min, max)</code>','Acota al rango','La vida nunca se pasa'],
      ['<code>CeilToInt / FloorToInt</code>','Techo/piso a int','Para contadores desde floats']
    ]},
    {t:'warn', title:'⚠️ Random de Unity: inclusivo', h:'<code>Random.Range(1, 6)</code> con ENTEROS devuelve 1 a 6, AMBOS incluidos (un dado honesto). Con floats, <code>Range(0.5f, 2.5f)</code> es continuo (el max no incluido) y <code>Random.value</code> va de 0.0 a 1.0. Python se comporta distinto (randint sí incluye; range no) — no mezcles los hábitos.'},
    {t:'p', h:'La semilla manda: <code>Random.InitState(7)</code> reinicia el generador y vuelve la secuencia IDÉNTICA. Con ella se prueban juegos (el mismo mapa cada vez) y se califican los ejercicios de este curso. Sin semilla, cada partida es irrepetible — que en producción es lo que quieres, y aquí es lo que NO.'}
  ]},

  { n:8, emoji:'🛡️', short:'Excepciones y depuración', title:'Cuando algo sale mal: leer errores y defenderte', time:'11 min', blocks:[
    {t:'table', head:['Excepción','Causa','Defensa'], rows:[
      ['<code>FormatException</code>','Parse de texto no numérico','try/catch o validar antes'],
      ['<code>DivideByZeroException</code>','División ENTERA entre 0','Guardar el divisor (if n != 0)'],
      ['<code>IndexOutOfRangeException</code>','Índice fuera de array/string','Recorrer con i &lt; Length'],
      ['<code>NullReferenceException</code>','Usar un objeto null','if (x != null) antes del punto'],
      ['<code>StackOverflowException</code>','Recursión sin caso base','Revisar el freno del método']
    ]},
    {t:'code', lang:'csharp', title:'la red de seguridad completa', code:`try {
  int nivel = int.Parse(Console.ReadLine());
  Console.WriteLine($"Nivel {nivel}");
} catch (FormatException e) {
  Console.WriteLine("Teclea un número. " + e.Message);
} catch (Exception e) {
  Console.WriteLine("Algo más pasó: " + e.Message);
} finally {
  Console.WriteLine("Listo");     // SIEMPRE corre
}`},
    {t:'info', title:'ℹ️ Depurar en el editor real', h:'En Unity, <code>Debug.Log</code> imprime en Console; <code>Debug.LogWarning</code> en amarillo y <code>Debug.LogError</code> en rojo (con stack trace). El hábito profesional: log de entrada y salida de las decisiones importantes («el slime recibe 12, queda en 18») — exactamente el log de batalla que construiste en el proyecto. Visual Studio añade breakpoints: F5 y el juego se PAUSA en tu línea.'},
    {t:'p', h:'Los códigos CS que aprendiste (CS1002, CS0103, CS1061, CS1525, CS1012, CS1729…) son los mismos que emitirá Roslyn, el compilador real de C#. Buscar «CS1061» en internet te lleva directo a la explicación oficial de Microsoft — ese código ES la documentación.'}
  ]},

  { n:9, emoji:'📚', short:'Bibliografía', title:'Para seguir aprendiendo (fuentes verificadas)', time:'8 min', blocks:[
    {t:'list', items:[
      '<b>Joseph Hocking — <i>Unity in Action</i>, 3.ª edición</b>, Manning, 2022 (416 págs., ISBN 9781617299339). «Multiplatform game development in C#»: EL libro estándar para pasar de scripts sueltos a juegos completos en Unity con C#. Cubre movimiento, IA de enemigos, audio y despliegue.',
      '<b>Documentación oficial de C#</b> — Microsoft Learn: <code>learn.microsoft.com/dotnet/csharp</code>. Gratis, en español, y con la especificación de todo lo que este curso enseña (top-level statements incluidos).',
      '<b>Scripting API de Unity</b> — <code>docs.unity3d.com</code>. La referencia de MonoBehaviour, Vector3, Mathf, Random y todo el motor: cada clase del laboratorio vive aquí en su versión completa.',
      '<b>Unity Learn</b> — <code>learn.unity.com</code>. Rutas gratuitas oficiales (Creative Core, Junior Programmer); las rutas se ofrecen sobre versiones LTS como la 6.3.',
      '<b>Estado de versiones</b> — <code>unity.com/releases/unity-6/support</code> y eosl.date: calendario de soporte LTS/Update (6.3 LTS soportada hasta dic 2027).'
    ]},
    {t:'p', h:'Ruta recomendada tras este curso: (1) instala el editor (capítulo 2) y portea tu batalla a un MonoBehaviour real; (2) sigue <i>Unity in Action</i> desde el capítulo 2 — su estructura de proyecto encaja con lo que ya sabes; (3) cuando un ejemplo use algo nuevo (corutinas, eventos), la Scripting API te dará el detalle exacto.'},
    {t:'info', title:'ℹ️ Sobre las ediciones', h:'La 3.ª edición de <i>Unity in Action</i> (2022) actualiza a la interfaz y el pipeline modernos y añade el toolkit XR (realidad virtual y aumentada). Las ediciones 1.ª (2015) y 2.ª (2018) siguen siendo útiles pero enseñan con versiones viejas del editor. Verifica siempre el ISBN al comprar: 9781617299339 (impreso) / 9781638350576 (eBook).'}
  ]}
];
