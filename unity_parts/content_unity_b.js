/* ============================================================
   CURSO 7 UNITY (C#) — CONTENIDO parte B (Módulos 3–4)
   ============================================================ */
MODULES.push({
  id:'m3', emoji:'📦', name:'Colecciones y azar', color:'#a855f7',
  desc:'Arrays, List<T>, foreach, agregados y Random.Range con semilla: el inventario del juego.',
  lessons:[

  /* -------- 3-1 -------- */
  { id:'3-1', title:'Arrays: la fila de cajas', time:'13 min', blocks:[
    {t:'p', h:'Un <b>array</b> es una fila numerada de cajas del MISMO tipo. Se crea con <code>new tipo[]{…}</code> o con la forma corta <code>{…}</code> cuando declaras e inicializas a la vez. Las cajas se numeran <b>desde 0</b>: con 3 elementos los índices son 0, 1 y 2. Intentar leer la caja 3 lanza <code>IndexOutOfRangeException</code>.'},
    {t:'code', lang:'csharp', title:'arrays.cs', code:`int[] danios = new int[]{ 12, 7, 30 };
Console.WriteLine(danios.Length);   // 3 (Length, no length ni Count)
Console.WriteLine(danios[0]);       // 12
danios[1] = 10;                     // reescribir la caja 1
Console.WriteLine(danios[1]);       // 10

int[] ceros = new int[4];           // 4 cajas llenas de 0
Console.WriteLine(ceros[2]);        // 0`},
    {t:'info', title:'ℹ️ Length: fijo como tabla', h:'Un array <b>no crece</b>: nace con N cajas y muere con N. <code>.Length</code> (¡propiedad, sin paréntesis!) te dice cuántas tiene. Para colecciones que crecen y encogen existe <code>List&lt;T&gt;</code> — siguiente lección. En Unity, arrays son perfectos para waypoints fijos, prefabs de enemigos, sonidos de un mismo tipo.'},
    {t:'warn', title:'⚠️ Índices desde 0', h:'El error clásico: <code>int[] a = new int[3]; a[3] = 1;</code> → IndexOutOfRangeException. El ÚLTIMO índice válido es <code>Length - 1</code>. El patrón seguro para recorrer: <code>for (int i = 0; i &lt; a.Length; i++)</code> — el &lt; (no &lt;=) se encarga de no pasarte.'},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>int[] x = {4, 8, 15};</code> — ¿qué imprime <code>Console.WriteLine(x[1]);</code>?', options:['4','8','15','Error'], correct:1, pts:10, explain:'Los índices empiezan en 0: x[0]=4, x[1]=8, x[2]=15.'},
      {type:'mc', q:'¿Cuál es el último índice válido de un array con Length 5?', options:['5','4','1','Length'], correct:1, pts:10, explain:'0..4: el último es Length - 1 = 4.'},
      {type:'tf', q:'<code>new int[3]</code> crea tres cajas con 0 dentro.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Los arrays numéricos nacen llenos de ceros.'},
      {type:'mc', q:'La propiedad que da el tamaño del array es…', options:['x.Count','x.size()','x.Length','x.length()'], correct:2, pts:10, explain:'Length para arrays (Count es de las List<T> — trampa clásica).'}
    ]},
    {t:'pyex', title:'🧪 Filas de cajas', tasks:[
      {q:'Crea el array <code>int[] oro = { 10, 25, 40 };</code> e imprime el total de las tres cajas: <code>75</code>.', hint:'Console.WriteLine(oro[0] + oro[1] + oro[2]);', check:{lines:['75']}, solution:'int[] oro = { 10, 25, 40 };\nConsole.WriteLine(oro[0] + oro[1] + oro[2]);', pts:20},
      {q:'Crea <code>int[] vida = new int[3];</code>, pon 50 en la caja 0 y 30 en la caja 2, e imprime la caja 0 y luego la 1 (una por línea): <code>50</code> y <code>0</code>.', hint:'La caja 1 nunca se tocó: sigue en 0.', check:{lines:['50','0']}, solution:'int[] vida = new int[3];\nvida[0] = 50;\nvida[2] = 30;\nConsole.WriteLine(vida[0]);\nConsole.WriteLine(vida[1]);', pts:20},
      {q:'Crea el array de strings <code>string[] items = { "espada", "pocion", "llave" };</code> e imprime:<br><code>Caja 0: espada</code><br><code>Caja 2: llave</code> (con interpolación).', hint:'$"Caja 0: {items[0]}"', check:{lines:['Caja 0: espada','Caja 2: llave']}, solution:'string[] items = { "espada", "pocion", "llave" };\nConsole.WriteLine($"Caja 0: {items[0]}");\nConsole.WriteLine($"Caja 2: {items[2]}");', pts:20},
      {q:'Con <code>int[] danios = { 12, 7, 30 };</code> imprime en dos líneas:<br><code>Tamaño: 3</code><br><code>Último: 30</code> — usando Length (nada escrito a mano).', hint:'danios[danios.Length - 1]', check:{lines:['Tamaño: 3','Último: 30']}, solution:'int[] danios = { 12, 7, 30 };\nConsole.WriteLine($"Tamaño: {danios.Length}");\nConsole.WriteLine($"Último: {danios[danios.Length - 1]}");', pts:20}
    ]}
  ]},

  /* -------- 3-2 -------- */
  { id:'3-2', title:'List<T>: la colección que crece', time:'14 min', blocks:[
    {t:'p', h:'Cuando el inventario debe CRECER y ENCOGER, el array se queda corto. C# trae <code>List&lt;T&gt;</code>: una lista flexible donde T es el tipo de sus elementos (<code>List&lt;int&gt;</code>, <code>List&lt;string&gt;</code>…). Se crea con <code>new List&lt;int&gt;()</code> y sus métodos clave son <code>Add</code> (agrega al final), <code>Remove</code> (quita el valor), <code>RemoveAt</code> (quita por índice) y la propiedad <code>Count</code> (¡no Length!).'},
    {t:'code', lang:'csharp', title:'inventario.cs', code:`var inventario = new List<string>();
inventario.Add("espada");
inventario.Add("pocion");
Console.WriteLine(inventario.Count);        // 2
Console.WriteLine(inventario.Contains("pocion"));  // True
inventario.Remove("espada");
Console.WriteLine(inventario.Count);        // 1
Console.WriteLine(inventario[0]);           // pocion (¡sigue indexada!)`},
    {t:'table', head:['Operación','Array','List<T>'], rows:[
      ['Tamaño','<code>.Length</code>','<code>.Count</code>'],
      ['Agregar','No puede','<code>.Add(x)</code>'],
      ['Quitar valor','No puede','<code>.Remove(x)</code> → bool'],
      ['Quitar por índice','No puede','<code>.RemoveAt(i)</code>'],
      ['¿Contiene?','A mano con for','<code>.Contains(x)</code>'],
      ['Leer/escribir caja i','<code>a[i]</code>','<code>lista[i]</code> (igual)']
    ]},
    {t:'warn', title:'⚠️ Count, no Length', h:'En una List el tamaño es <code>.Count</code>. Si escribes <code>lista.Length</code> el compilador te lanza CS1061 («List&lt;int&gt; no contiene una definición para Length»). Y al revés, en arrays es Length. Decidir mal este detalle es el error #1 al copiar código entre los dos.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Cómo agregas "llave" a la List <code>inv</code>?', options:['inv += "llave";','inv.Add("llave");','inv.push("llave");','inv[inv.Length] = "llave";'], correct:1, pts:10, explain:'Add agrega al final. push es de JavaScript/Python(appends difieren): en C# es Add.'},
      {type:'mc', q:'El tamaño de una List se lee con…', options:['Length','Count','Size','size()'], correct:1, pts:10, explain:'Count. Length es de arrays (CS1061 si lo mezclas).'},
      {type:'tf', q:'<code>Remove</code> recibe el ÍNDICE del elemento a quitar.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: Remove recibe el VALOR; RemoveAt recibe el índice.'},
      {type:'mc', q:'<code>new List<int>()</code> — ¿qué significa el &lt;int&gt;?', options:['El tamaño inicial','El tipo de los elementos','La posición de inicio','Nada'], correct:1, pts:10, explain:'List<T> es genérica: T declara de qué tipo son los elementos.'}
    ]},
    {t:'pyex', title:'🧪 El inventario flexible', tasks:[
      {q:'Crea <code>var mochila = new List<string>();</code>, agrega <code>"pocion"</code> y <code>"mapa"</code>, e imprime <code>2</code> (su Count).', hint:'mochila.Add("pocion");', check:{lines:['2']}, solution:'var mochila = new List<string>();\nmochila.Add("pocion");\nmochila.Add("mapa");\nConsole.WriteLine(mochila.Count);', pts:20},
      {q:'Crea una <code>List<int></code> con 5, 7 y 9 (con Add). Imprime <code>True</code> si contiene 7 usando Contains.', hint:'nums.Contains(7)', check:{lines:['True']}, solution:'var nums = new List<int>();\nnums.Add(5);\nnums.Add(7);\nnums.Add(9);\nConsole.WriteLine(nums.Contains(7));', pts:20},
      {q:'Crea la List <code>var fila = new List<string>();</code> con Add: "slime", "murciélago", "slime". Quita UN "slime" con Remove e imprime el Count final: <code>2</code> (y no importa el orden interno).', hint:'Remove quita el PRIMERO que encuentra.', check:{lines:['2']}, solution:'var fila = new List<string>();\nfila.Add("slime");\nfila.Add("murcielago");\nfila.Add("slime");\nfila.Remove("slime");\nConsole.WriteLine(fila.Count);', pts:20},
      {q:'Con <code>var codigos = new List<int>();</code> agrega 10, 20, 30. Quita el del MEDIO con RemoveAt (índice 1) e imprime el que quedó en la posición 1: <code>30</code>.', hint:'RemoveAt(1) deja [10, 30].', check:{lines:['30']}, solution:'var codigos = new List<int>();\ncodigos.Add(10);\ncodigos.Add(20);\ncodigos.Add(30);\ncodigos.RemoveAt(1);\nConsole.WriteLine(codigos[1]);', pts:20}
    ]}
  ]},

  /* -------- 3-3 -------- */
  { id:'3-3', title:'foreach: recorrer todo', time:'12 min', blocks:[
    {t:'p', h:'<code>foreach (tipo x in colección) { … }</code> visita <b>cada elemento</b> de un array, una List o incluso los caracteres de un string, sin que te preocupes por índices. Es el equivalente exacto del <code>for x in …</code> de Python y del Each de Blueprints.'},
    {t:'code', lang:'csharp', title:'foreach.cs', code:`string[] items = { "espada", "pocion", "llave" };

foreach (string it in items) {
  Console.WriteLine($"Tienes: {it}");
}

int total = 0;
int[] danios = { 12, 7, 30 };
foreach (int d in danios) total += d;
Console.WriteLine($"Total: {total}");   // 49`},
    {t:'info', title:'ℹ️ foreach vs for indexado', h:'Usa <b>foreach</b> cuando solo quieres leer cada elemento (90 % de los casos). Usa <b>for</b> cuando necesitas el ÍNDICE: saber la posición, escribir en el array o saltarte elementos por posición. foreach no te da la vuelta actual: si la necesitas, suma un contador a mano o cambia a for.'},
    {t:'p', h:'Y sí, un string ES una colección de caracteres: <code>foreach (char c in "Unity")</code> visita U, n, i, t, y. Es la forma más corta de contar vocales, buscar símbolos o construir textos.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué recorre <code>foreach (char c in "Hola")</code>?', options:['Las palabras','Cada carácter: H, o, l, a','Los bytes','Error: strings no se recorren'], correct:1, pts:10, explain:'Un string es una colección de char: 4 vueltas.'},
      {type:'mc', q:'Necesitas IMPRIMIR LA POSICIÓN de cada elemento. Usas…', options:['foreach','for con índice','while(true)','No se puede'], correct:1, pts:10, explain:'foreach no da el índice: for (int i = 0; i < a.Length; i++).'},
      {type:'tf', q:'foreach funciona igual sobre arrays y sobre List<T>.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Ambas son colecciones: foreach las visita igual.'},
      {type:'mc', q:'Dentro de <code>foreach (string it in items)</code>, <code>it</code> es…', options:['El índice de la vuelta','El elemento actual','La colección','Un bool'], correct:1, pts:10, explain:'it toma el valor de CADA elemento, vuelta a vuelta.'}
    ]},
    {t:'pyex', title:'🧪 Visita cada caja', tasks:[
      {q:'Con <code>string[] armas = { "hacha", "arco", "daga" };</code> imprime cada arma precedida de <code>- </code> (una por línea) usando foreach:<br><code>- hacha</code> etc.', hint:'Console.WriteLine("- " + arma);', check:{lines:['- hacha','- arco','- daga']}, solution:'string[] armas = { "hacha", "arco", "daga" };\nforeach (string arma in armas) {\n  Console.WriteLine("- " + arma);\n}', pts:20},
      {q:'Con foreach sobre la List <code>var ventas = new List<int>();</code> (agrega 4, 9, 2) imprime el total: <code>15</code>.', hint:'Acumulador fuera del foreach.', check:{lines:['15']}, solution:'var ventas = new List<int>();\nventas.Add(4);\nventas.Add(9);\nventas.Add(2);\nint total = 0;\nforeach (int v in ventas) total += v;\nConsole.WriteLine(total);', pts:20},
      {q:'Cuenta con foreach cuántas letras de <code>"Unity"</code> son exactamente \'i\' o \'t\' e imprime el total: <code>2</code>.', hint:'if (c == \'i\' || c == \'t\') contador++; — ojo: U va en MAYÚSCULA.', check:{lines:['2']}, solution:'int contador = 0;\nforeach (char c in "Unity") {\n  if (c == \'i\' || c == \'t\') contador++;\n}\nConsole.WriteLine(contador);', pts:20},
      {q:'Con <code>int[] danios = { 12, 7, 30 };</code> recorre con foreach e imprime SOLO los danios mayores a 10 (una por línea): <code>12</code> y <code>30</code>.', hint:'if (d > 10) Console.WriteLine(d);', check:{lines:['12','30']}, solution:'int[] danios = { 12, 7, 30 };\nforeach (int d in danios) {\n  if (d > 10) Console.WriteLine(d);\n}', pts:20}
    ]}
  ]},

  /* -------- 3-4 -------- */
  { id:'3-4', title:'Agregados: acumulador, máximo y mínimo', time:'14 min', blocks:[
    {t:'p', h:'Tres patrones resuelven el 80 % de los ejercicios con colecciones, y los verás en TODOS los lenguajes. <b>Acumulador</b>: una variable fuera del ciclo que suma (o multiplica) cada elemento. <b>Corredor de máximo</b>: una variable que guarda «el mejor visto hasta ahora» y se actualiza cuando aparece algo mejor. <b>Contador</b>: acumulador que suma 1 cuando algo se cumple.'},
    {t:'code', lang:'csharp', title:'patrones.cs', code:`int[] puntajes = { 40, 85, 12, 95, 60 };

int suma = 0;                 // acumulador
int maximo = puntajes[0];     // corredor: arranca con el primero
for (int i = 0; i < puntajes.Length; i++) {
  suma += puntajes[i];
  if (puntajes[i] > maximo) maximo = puntajes[i];
}
Console.WriteLine($"Suma: {suma}");       // 292
Console.WriteLine($"Máximo: {maximo}");   // 95`},
    {t:'info', title:'ℹ️ El truco del máximo que inicia en 0', h:'Si buscas el máximo y arrancas el corredor en 0, funciona… con números positivos. Pero con danios negativos o temperatures bajo cero, 0 ganaría sin ser un elemento real. La forma robusta: inicializa el corredor con el PRIMER elemento (<code>a[0]</code>) y recorre desde el índice 1. La forma perezosa pero correcta aquí: usa int.MinValue.'},
    {t:'code', lang:'csharp', title:'contador.cs', code:`int[] edades = { 15, 22, 34, 19, 28 };
int mayores = 0;
foreach (int e in edades) {
  if (e >= 18) mayores++;      // contador: suma 1 al cumplirse
}
Console.WriteLine($"{mayores} de {edades.Length} son adultos");  // 4 de 5`},
    {t:'quiz', questions:[
      {type:'mc', q:'El acumulador <code>suma</code> debe declararse…', options:['Dentro del ciclo','Fuera del ciclo, antes','Después del ciclo','No se declara'], correct:1, pts:10, explain:'Si lo declaras dentro, se reinicia en cada vuelta y solo guardas el último.'},
      {type:'mc', q:'<code>int[] x = {3, 9, 4}</code> — ¿qué imprime el corredor de máximo?', options:['3','9','4','0'], correct:1, pts:10, explain:'max arranca en 3; 9 > 3 lo actualiza; 4 no. Resultado 9.'},
      {type:'tf', q:'Contar es acumular: <code>contador++</code> es lo mismo que <code>contador += 1</code>.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Idéntico. El contador es un acumulador de pasitos de 1.'},
      {type:'mc', q:'Para el MÍNIMO de {7, 2, 9}, el corredor debe empezar en…', options:['0','9','7 (el primero)','int.MaxValue'], correct:2, pts:10, explain:'El primer elemento (o int.MaxValue): 0 fallaría si todos fueran mayores que 0.'}
    ]},
    {t:'pyex', title:'🧪 Los tres patrones', tasks:[
      {q:'Suma los elementos de <code>int[] oro = { 5, 10, 20, 40 };</code> con un ciclo e imprime <code>75</code>.', check:{lines:['75']}, solution:'int[] oro = { 5, 10, 20, 40 };\nint suma = 0;\nforeach (int g in oro) suma += g;\nConsole.WriteLine(suma);', pts:20},
      {q:'Encuentra e imprime el MÁXIMO de <code>int[] puntajes = { 40, 85, 12, 95, 60 };</code>: <code>95</code> (sin escribir el 95 en el código).', hint:'Corredor: max = puntajes[0]; y actualiza si ves algo mayor.', check:{lines:['95']}, solution:'int[] puntajes = { 40, 85, 12, 95, 60 };\nint max = puntajes[0];\nforeach (int p in puntajes) {\n  if (p > max) max = p;\n}\nConsole.WriteLine(max);', pts:20},
      {q:'Cuenta cuántos elementos de <code>int[] danios = { 12, 5, 30, 8, 15 };</code> son 10 o más e imprime <code>3</code>.', hint:'Contador con if (d >= 10) contador++;', check:{lines:['3']}, solution:'int[] danios = { 12, 5, 30, 8, 15 };\nint fuertes = 0;\nforeach (int d in danios) {\n  if (d >= 10) fuertes++;\n}\nConsole.WriteLine(fuertes);', pts:20},
      {q:'Encuentra e imprime el MÍNIMO de <code>int[] tiempos = { 45, 12, 88, 3, 27 };</code>: <code>3</code>.', hint:'min arranca en tiempos[0]; actualiza si ves algo menor.', check:{lines:['3']}, solution:'int[] tiempos = { 45, 12, 88, 3, 27 };\nint min = tiempos[0];\nforeach (int t in tiempos) {\n  if (t < min) min = t;\n}\nConsole.WriteLine(min);', pts:20}
    ]}
  ]},

  /* -------- 3-5 -------- */
  { id:'3-5', title:'Random de Unity: Range con semilla', time:'14 min', blocks:[
    {t:'p', h:'El azar de Unity vive en la clase <code>Random</code> y tiene DOS diferencias importantes con otras versiones que quizá conozcas. Primera: <code>Random.Range(min, max)</code> con enteros es <b>INCLUSIVO en ambos extremos</b>: <code>Range(1, 6)</code> puede devolver 1 Y también 6 (como un dado honesto). Segunda: <code>Random.value</code> da un float entre 0.0 y 1.0.'},
    {t:'table', head:['Llamada','Devuelve','Nota'], rows:[
      ['<code>Random.Range(1, 6)</code>','int: 1 a 6 (¡ambos incluidos!)','Diferente a Python randint(1,5)'],
      ['<code>Random.Range(0.5f, 2.5f)</code>','float continuo','Con floats el max NO se incluye'],
      ['<code>Random.value</code>','float: 0.0 a 1.0','Para probabilidades: &lt; 0.3 = 30 %'],
      ['<code>Random.InitState(7)</code>','— fija la semilla','Misma semilla → misma secuencia']
    ]},
    {t:'warn', title:'⚠️ La semilla hace TODO reproducible', h:'<code>Random.InitState(7)</code> reinicia el generador: después de fijarla, la secuencia de números es <b>idéntica siempre</b>. Es la herramienta con la que se prueban juegos: el mismo mapa, los mismos drops, la misma partida. En este curso los ejercicios con azar SIEMPRE fijan la semilla — así tu salida es exactamente la esperada. En el editor real, no fijarla = cada partida distinta.'},
    {t:'code', lang:'csharp', title:'dado.cs', code:`Random.InitState(7);
int tirada = Random.Range(1, 6);
Console.WriteLine($"El dado cayó en {tirada}");   // 1 (con semilla 7)

Random.InitState(1);
for (int i = 0; i < 2; i++) {
  Console.WriteLine(Random.Range(1, 10));         // 7, luego 1
}`},
    {t:'info', title:'ℹ️ Números canónicos de este laboratorio', h:'Con <code>InitState(1)</code>: Range(1,10) da 7, 1, 6, 10… Con <code>InitState(2)</code>: Range(1,6) da 5, 2, 2… Con <code>InitState(3)</code>: Range(0,5) da 4, 0, 2… Con <code>InitState(7)</code>: Range(1,6) da 1, 1, 4… Con <code>InitState(1)</code>, <code>Random.value</code> da 0.627073940588. Memoriza que EXISTEN, no cuáles son: en los ejercicios te diremos la semilla y podrás verificar.'},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>Random.Range(1, 6)</code> con enteros puede devolver…', options:['1 a 5','1 a 6 (ambos incluidos)','0 a 6','Solo 6'], correct:1, pts:10, explain:'El Range de Unity es inclusivo: 1, 2, 3, 4, 5 o 6. ¡Diferente a Python!'},
      {type:'mc', q:'<code>Random.InitState(7);</code> dos veces seguidas, ¿produce la misma secuencia?', options:['No, siempre varía','Sí: la semilla reinicia la secuencia','Solo si es par','Lanza error'], correct:1, pts:10, explain:'Misma semilla → misma secuencia: así se hacen partidas reproducibles.'},
      {type:'tf', q:'<code>Random.value</code> devuelve un int entre 0 y 1.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: devuelve un FLOAT continuo entre 0.0 y 1.0.'},
      {type:'mc', q:'30 % de probabilidad de drop se escribe…', options:['if (Random.value < 0.3f)','if (Random.Range(1, 30) == 30)','if (Random.value == 0.3f)','while (Random.value < 0.3f)'], correct:0, pts:10, explain:'value < 0.3 se cumple el 30 % de las veces. Clásico de loot.'}
    ]},
    {t:'pyex', title:'🧪 Azar reproducible', tasks:[
      {q:'Fija la semilla 1 con <code>Random.InitState(1);</code> e imprime UNA tirada de <code>Random.Range(1, 10)</code>: debe salir <code>7</code>.', check:{lines:['7']}, solution:'Random.InitState(1);\nConsole.WriteLine(Random.Range(1, 10));', pts:20},
      {q:'Con semilla 3 (<code>InitState(3)</code>), imprime TRES tiradas de <code>Random.Range(0, 5)</code> en líneas separadas.', hint:'Saldrá la secuencia canónica 4, 0, 2.', check:{lines:['4','0','2']}, solution:'Random.InitState(3);\nfor (int i = 0; i < 3; i++) {\n  Console.WriteLine(Random.Range(0, 5));\n}', pts:20},
      {q:'Con semilla 2: simula 3 tiradas de un dado de 6 caras (<code>Range(1, 6)</code>) y cuenta cuántas salieron 6. Imprime el conteo: <code>0</code>.', hint:'La secuencia con semilla 2 es 5, 2, 2 — ninguna es 6.', check:{lines:['0'], vars:{caras:0}}, solution:'Random.InitState(2);\nint caras = 0;\nfor (int i = 0; i < 3; i++) {\n  if (Random.Range(1, 6) == 6) caras++;\n}\nConsole.WriteLine(caras);', pts:20},
      {q:'Loot: con semilla 1, si <code>Random.value</code> es menor a 0.7 imprime <code>Cae oro</code>, si no <code>Nada</code>. (Con semilla 1, value da 0.627… → Cae oro.)', hint:'if (Random.value < 0.7f) … else …', check:{lines:['Cae oro']}, solution:'Random.InitState(1);\nif (Random.value < 0.7f) {\n  Console.WriteLine("Cae oro");\n} else {\n  Console.WriteLine("Nada");\n}', pts:20}
    ]}
  ]}
]});

MODULES.push({
  id:'m4', emoji:'🛠️', name:'Métodos', color:'#ef4444',
  desc:'Empaqueta lógica en piezas reutilizables: void, return, parámetros, defaults y recursión.',
  lessons:[

  /* -------- 4-1 -------- */
  { id:'4-1', title:'Métodos: void, return y parámetros', time:'14 min', blocks:[
    {t:'p', h:'Un <b>método</b> es una receta con nombre: escribes la lógica UNA vez y la invocas cuando quieras. La forma general: <code>tipoDeRetorno Nombre(tipos y parámetros) { cuerpo }</code>. Si el método solo <b>hace</b> (imprime, modifica), su retorno es <code>void</code>. Si <b>calcula</b> algo, devuelve con <code>return</code>.'},
    {t:'code', lang:'csharp', title:'metodos.cs', code:`void Saludar(string quien) {
  Console.WriteLine($"Hola, {quien}");
}

int Sumar(int a, int b) {
  return a + b;
}

Saludar("Ada");                 // Hola, Ada
int total = Sumar(2, 3);
Console.WriteLine(total);       // 5
Console.WriteLine(Sumar(10, 20)); // se puede usar directo: 30`},
    {t:'info', title:'ℹ️ static: la palabra que verás en Unity', h:'En archivos reales de Unity verás <code>static void Main</code> o métodos <code>static</code>. La palabra <code>static</code> significa «pertenece a la clase, no a un objeto» — en nuestro laboratorio funciona ESCRIBIRLA o NO ESCRIBIRLA: <code>static int Sumar(…)</code> y <code>int Sumar(…)</code> son lo mismo aquí. En el editor real, los métodos de tus componentes MonoBehaviour van SIN static.'},
    {t:'warn', title:'⚠️ return corta el método', h:'En cuanto el flujo llega a un <code>return</code>, el método TERMINA ahí aunque queden líneas. Por eso el patrón «guard clause» funciona: <code>if (vida &lt;= 0) return;</code> al inicio evita ejecutar todo lo demás. Un método void también puede hacer <code>return;</code> a secas para salir.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Un método que NO devuelve nada se declara con el tipo…', options:['null','empty','void','static'], correct:2, pts:10, explain:'void = «no hay retorno». Solo ejecuta su cuerpo.'},
      {type:'mc', q:'<code>int Doble(int x) { return x * 2; }</code> — ¿qué imprime <code>Console.WriteLine(Doble(Doble(3)));</code>?', options:['6','12','9','Error'], correct:1, pts:10, explain:'Doble(3)=6; Doble(6)=12. El resultado de uno entra al otro.'},
      {type:'tf', q:'Las líneas después de un return dentro del método no se ejecutan.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'return termina el método inmediatamente.'},
      {type:'mc', q:'<code>Saludar("Ada")</code> — "Ada" es…', options:['Un parámetro','Un argumento','Un retorno','Una clase'], correct:1, pts:10, explain:'El valor que ENVIAS es argumento; la variable que lo RECIBE es parámetro.'}
    ]},
    {t:'pyex', title:'🧪 Empaqueta lógica', tasks:[
      {q:'Crea el método <code>void Aviso(string msg)</code> que imprima <code>[!] </code> + msg. Llámalo con "Bajo vida" para imprimir <code>[!] Bajo vida</code>.', hint:'Console.WriteLine("[!] " + msg);', check:{lines:['[!] Bajo vida']}, solution:'void Aviso(string msg) {\n  Console.WriteLine("[!] " + msg);\n}\nAviso("Bajo vida");', pts:20},
      {q:'Crea <code>int Cuadrado(int n)</code> que devuelva n al cuadrado. Imprime <code>Cuadrado(9)</code>: <code>81</code>.', hint:'return n * n;', check:{lines:['81']}, solution:'int Cuadrado(int n) {\n  return n * n;\n}\nConsole.WriteLine(Cuadrado(9));', pts:20},
      {q:'Crea <code>int Restar(int a, int b)</code> y usa el resultado en un if: si Restar(10, 4) es mayor que 5 imprime <code>Grande</code>, si no <code>Chico</code>.', hint:'if (Restar(10, 4) > 5) …', check:{lines:['Grande']}, solution:'int Restar(int a, int b) {\n  return a - b;\n}\nif (Restar(10, 4) > 5) {\n  Console.WriteLine("Grande");\n} else {\n  Console.WriteLine("Chico");\n}', pts:20},
      {q:'Crea <code>void Estado(int vida)</code> que imprima <code>OK</code> si vida &gt; 0 y <code>KO</code> si no. Llama Estado(30) y luego Estado(0) — DOS líneas de salida.', check:{lines:['OK','KO']}, solution:'void Estado(int vida) {\n  if (vida > 0) {\n    Console.WriteLine("OK");\n  } else {\n    Console.WriteLine("KO");\n  }\n}\nEstado(30);\nEstado(0);', pts:20}
    ]}
  ]},

  /* -------- 4-2 -------- */
  { id:'4-2', title:'Parámetros con valor por defecto', time:'11 min', blocks:[
    {t:'p', h:'Un parámetro puede tener <b>valor por defecto</b>: <code>int Danio(int base_, int bonus = 2)</code>. Si al invocar no pasas el segundo, C# usa el 2. Si lo pasas, usa el tuyo. Es la forma de hacer métodos flexibles sin crear diez versiones.'},
    {t:'code', lang:'csharp', title:'defaults.cs', code:`int Danio(int base_, int bonus = 2) {
  return base_ + bonus;
}

Console.WriteLine(Danio(10));      // 12 (usa bonus=2)
Console.WriteLine(Danio(10, 5));   // 15 (bonus dado a mano)

void Perfil(string nombre, int nivel = 1) {
  Console.WriteLine($"{nombre} · nivel {nivel}");
}
Perfil("Ada");            // Ada · nivel 1
Perfil("Boris", 7);       // Boris · nivel 7`},
    {t:'info', title:'ℹ️ Orden: obligatorios primero', h:'Los parámetros con default van SIEMPRE al final: <code>(int a, int b = 1)</code> ✓; <code>(int a = 1, int b)</code> ✗ (CS1737). Es lógico: si el segundo tuviera default y el primero no, ¿cómo sabría C# a qué caja va <code>f(5)</code>?'},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>void F(int a, int b = 3)</code> — ¿cuántos argumentos puede recibir F?', options:['Exactamente 2','1 o 2','0 o 1','Exactamente 1'], correct:1, pts:10, explain:'a es obligatorio; b opcional: F(5) o F(5, 9).'},
      {type:'mc', q:'Los parámetros con default deben ir…', options:['Al inicio','En medio','Al final','Donde sea'], correct:2, pts:10, explain:'Al final (CS1737 si no). Primero los obligatorios.'},
      {type:'tf', q:'<code>Danio(10, 5)</code> con <code>Danio(int base_, int bonus = 2)</code> usa bonus = 2.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: al pasarlo explícito (5), el default se ignora.'},
      {type:'mc', q:'¿Por qué usar defaults?', options:['Para que el método sea más rápido','Para no repetir el mismo valor en cada llamada','Porque C# obliga','Para ahorrar memoria'], correct:1, pts:10, explain:'El 90 % de las llamadas usa el mismo valor: ese valor vive en la firma.'}
    ]},
    {t:'pyex', title:'🧪 Firmas flexibles', tasks:[
      {q:'Crea <code>int Pocion(int cura, int extra = 5)</code> y imprime Pocion(10): <code>15</code>.', check:{lines:['15']}, solution:'int Pocion(int cura, int extra = 5) {\n  return cura + extra;\n}\nConsole.WriteLine(Pocion(10));', pts:20},
      {q:'Con el mismo método del ejercicio anterior, imprime también Pocion(10, 1): <code>11</code>. (Dos llamadas en total, dos líneas: 15 y 11.)', hint:'Reutiliza: Pocion(10) y Pocion(10, 1).', check:{lines:['15','11']}, solution:'int Pocion(int cura, int extra = 5) {\n  return cura + extra;\n}\nConsole.WriteLine(Pocion(10));\nConsole.WriteLine(Pocion(10, 1));', pts:20},
      {q:'Crea <code>void Ficha(string nombre, string rol = "héroe")</code> que imprima <code>nombre (rol)</code> — por ejemplo <code>Ada (héroe)</code>. Llama: Ficha("Ada") y Ficha("Mago", "sanador").', hint:'$"{nombre} ({rol})"', check:{lines:['Ada (héroe)','Mago (sanador)']}, solution:'void Ficha(string nombre, string rol = "héroe") {\n  Console.WriteLine($"{nombre} ({rol})");\n}\nFicha("Ada");\nFicha("Mago", "sanador");', pts:20}
    ]}
  ]},

  /* -------- 4-3 -------- */
  { id:'4-3', title:'Ámbito y recursión', time:'14 min', blocks:[
    {t:'p', h:'Las variables nacen dentro de un <b>ámbito</b> (scope): las declaradas en el programa principal son visibles en todos los métodos que declares después; las declaradas DENTRO de un método existen solo entre las llaves de ese método. Un parámetro es una variable local más: copia del argumento.'},
    {t:'code', lang:'csharp', title:'ambito.cs', code:`int oro = 100;

void Robar() {
  oro = oro - 30;      // sí ve la variable global
}

Console.WriteLine(oro);   // 100
Robar();
Console.WriteLine(oro);   // 70`},
    {t:'info', title:'ℹ️ Recursión: un método que se llama a sí mismo', h:'La <b>recursión</b> resuelve problemas «de muñecas rusas»: factorial de n = n × factorial(n-1). Todo método recursivo necesita un <b>caso base</b> (cuándo PARAR: <code>if (n &lt;= 1) return 1;</code>) — sin él, la llamada infinita revienta la pila: <code>StackOverflowException</code>. Unity también lo lanza si tus métodos se llaman en círculo.'},
    {t:'code', lang:'csharp', title:'recursion.cs', code:`int Factorial(int n) {
  if (n <= 1) return 1;          // caso base: ¡el freno!
  return n * Factorial(n - 1);   // se llama a sí misma
}

Console.WriteLine(Factorial(5));   // 120
Console.WriteLine(Factorial(6));   // 720`},
    {t:'warn', title:'⚠️ StackOverflowException', h:'¿Qué pasa sin caso base? <code>int F(int n) { return F(n); }</code> — cada llamada apila un marco nuevo hasta agotar la pila: <code>StackOverflowException</code>. En el laboratorio el guardián corta antes (~900 llamadas) con el mismo nombre de excepción que daría .NET. El arreglo SIEMPRE es revisar: ¿mi caso base es alcanzable?'},
    {t:'quiz', questions:[
      {type:'mc', q:'Una variable declarada dentro de un método…', options:['Es global','Solo existe dentro de ese método','Existe en todo el programa','Es constante'], correct:1, pts:10, explain:'Ámbito local: nace y muere entre las llaves del método.'},
      {type:'mc', q:'Todo método recursivo necesita…', options:['Un for','Un caso base','Un array','Un parámetro float'], correct:1, pts:10, explain:'Sin caso base alcanzable: StackOverflowException.'},
      {type:'tf', q:'Factorial(0) con el caso base <code>if (n <= 1) return 1;</code> devuelve 1.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'0 <= 1 cumple el caso base: devuelve 1 sin recursar.'},
      {type:'mc', q:'En el ejemplo de Robar(), la variable oro es…', options:['Local del método','Global (declarada en el programa)','Un parámetro','Una constante'], correct:1, pts:10, explain:'Se declaró en el programa principal: los métodos posteriores la ven y pueden modificarla.'}
    ]},
    {t:'pyex', title:'🧪 Muñecas rusas', tasks:[
      {q:'Crea el método <code>void Gastar(int cantidad)</code> que reste del oro global (empieza en 200) e imprima lo que queda. Llama Gastar(50) e imprime… o mejor: imprime antes y después desde el programa: <code>200</code> y <code>150</code>.', hint:'int oro = 200; void Gastar(int cantidad) { oro -= cantidad; }', check:{lines:['200','150']}, solution:'int oro = 200;\nvoid Gastar(int cantidad) {\n  oro -= cantidad;\n}\nConsole.WriteLine(oro);\nGastar(50);\nConsole.WriteLine(oro);', pts:20},
      {q:'Crea <code>int Factorial(int n)</code> recursivo e imprime Factorial(4): <code>24</code>.', hint:'if (n <= 1) return 1; return n * Factorial(n - 1);', check:{lines:['24']}, solution:'int Factorial(int n) {\n  if (n <= 1) return 1;\n  return n * Factorial(n - 1);\n}\nConsole.WriteLine(Factorial(4));', pts:20},
      {q:'Crea <code>int Suma(int n)</code> que sume recursivamente de 1 a n (Suma(4) = 4+3+2+1 = 10) e imprime Suma(10): <code>55</code>.', hint:'if (n <= 0) return 0; return n + Suma(n - 1);', check:{lines:['55']}, solution:'int Suma(int n) {\n  if (n <= 0) return 0;\n  return n + Suma(n - 1);\n}\nConsole.WriteLine(Suma(10));', pts:20},
      {q:'Crea <code>int Doble(int x)</code> que devuelva x*2 y <code>int Cuadrado(int x)</code> que use Doble dos veces: <code>Cuadrado(3)</code> debe dar (3*2)*(3*2)/4… NO: define Cuadrado(x) como Doble(x) * Doble(x) / 4 e imprime Cuadrado(4): <code>16</code>.', hint:'Doble(4)=8; 8*8/4 = 16 (división entera de 64/4).', check:{lines:['16']}, solution:'int Doble(int x) {\n  return x * 2;\n}\nint Cuadrado(int x) {\n  return Doble(x) * Doble(x) / 4;\n}\nConsole.WriteLine(Cuadrado(4));', pts:20}
    ]}
  ]}
]});
