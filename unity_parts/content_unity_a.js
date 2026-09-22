/* ============================================================
   CURSO 7 UNITY (C#) — CONTENIDO parte A (Módulos 0–2)
   Tareas ucs: {q, hint?, stdin?, wantVars?, check:{lines, vars?}, solution, pts}
   Las soluciones corren con UCS (mini-interpreter C#) y se califican por salida.
   ============================================================ */
MODULES.push({
  id:'m0', emoji:'🎮', name:'Despega con Unity y C#', color:'#14b8a6',
  desc:'Qué es Unity 6.3 LTS, qué papel juega C# y tu primer programa con Debug.Log.',
  lessons:[

  /* -------- 0-1 -------- */
  { id:'0-1', title:'¿Qué es Unity y por qué C#?', time:'12 min', blocks:[
    {t:'p', h:'<b>Unity</b> es el motor de videojuegos más usado del mundo para proyectos indie y móviles: con él se hicieron <i>Hollow Knight</i>, <i>Cuphead</i>, <i>Among Us</i> y <i>Genshin Impact</i>. Un motor te da gráficos, física, sonido y despliegue a PC, consola y celular; <b>tú escribes la lógica del juego</b>… y el lenguaje oficial de esa lógica es <b>C#</b> (se pronuncia «si sharp»), un lenguaje moderno de Microsoft.'},
    {t:'table', head:['¿Quién hace qué?','Motor (Unity 6.3 LTS)','Tu código (C#)'], rows:[
      ['Gráficos y cámara','Renderiza escenas y luces','Dices dónde nace cada objeto'],
      ['Física','Colisiones y gravedad','Decides qué pasa al chocar'],
      ['Audio','Mezcla y espacialización','Disparas el sonido correcto'],
      ['Lógica del juego','—','Vida, daño, turnos, oleadas: TODO lo divertido']
    ]},
    {t:'p', h:'La versión de referencia de este curso es <b>Unity 6.3 LTS</b> (diciembre 2025, con soporte hasta diciembre de 2027): LTS significa <i>Long Term Support</i>, la versión que Unity recomienda para producción. Pero <b>aquí no instalas nada</b>: escribimos C# real en un mini-interpreter dentro de tu navegador, igual que hiciste con Python y Blueprints. La diferencia con Unreal: allá conectabas <b>nodos</b>; aquí <b>escribes texto</b> con reglas muy estrictas de puntuación.'},
    {t:'code', lang:'csharp', title:'hola.cs — tu primer programa', code:`using UnityEngine;

Debug.Log("¡Hola, Unity!");
Console.WriteLine("Vengo del curso de Blueprints");`},
    {t:'info', title:'ℹ️ Debug.Log y Console.WriteLine', h:'En el editor real de Unity se usa <code>Debug.Log("…")</code>, que imprime en la pestaña Console del editor. En programas de consola se usa <code>Console.WriteLine("…")</code>. Nuestro laboratorio acepta ambos y los trata igual: imprimen una línea. En Unity también existen <code>Debug.LogWarning</code> y <code>Debug.LogError</code> para advertencias y errores.'},
    {t:'quiz', questions:[
      {type:'mc', q:'El lenguaje en el que se programa la lógica de Unity es…', options:['Blueprints','C#','Python','GDScript'], correct:1, pts:10, explain:'Unreal usa Blueprints (¡eso fue el curso anterior!); Unity usa C#.'},
      {type:'mc', q:'¿Qué imprime <code>Debug.Log("HOLA")</code> en el laboratorio?', options:['Nada, solo lo guarda','HOLA','debug: HOLA','Error'], correct:1, pts:10, explain:'Debug.Log imprime su argumento como una línea, igual que Console.WriteLine.'},
      {type:'tf', q:'Unity 6.3 LTS es la versión recomendada para proyectos que van en serio.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'LTS = Long Term Support: soporte hasta dic 2027. Las versiones Update (6.5/6.6) son para probar novedades.'},
      {type:'mc', q:'¿Qué ganaste del curso 6 que te sirve aquí?', options:['Nada, empiezas de cero','Pensar en estados, oleadas y turnos — ahora lo escribes en texto','Un editor de nodos','SQL'], correct:1, pts:10, explain:'La lógica de juego (la batalla de la Librería Esperanza) regresa, pero escrita en C#.'}
    ]},
    {t:'pyex', title:'🧪 Tus primeros 3 programas', tasks:[
      {q:'Imprime exactamente: <code>¡Hola, Unity!</code> usando <code>Debug.Log</code>.', check:{lines:['¡Hola, Unity!']}, solution:'Debug.Log("¡Hola, Unity!");', pts:20},
      {q:'Imprime dos líneas usando Console.WriteLine:<br><code>Curso 7: C#</code><br><code>Unity 6.3 LTS</code>', hint:'Dos WriteLine, dos líneas.', check:{lines:['Curso 7: C#','Unity 6.3 LTS']}, solution:'Console.WriteLine("Curso 7: C#");\nConsole.WriteLine("Unity 6.3 LTS");', pts:20},
      {q:'Imprime el resultado de sumar 7 + 25 (que C# lo calcule, no lo escribas tú).', hint:'Console.WriteLine(7 + 25);', check:{lines:['32']}, solution:'Console.WriteLine(7 + 25);', pts:20}
    ]}
  ]},

  /* -------- 0-2 -------- */
  { id:'0-2', title:'El laboratorio: ejecutar y leer errores CS', time:'12 min', blocks:[
    {t:'p', h:'En este curso el editor corre un mini-interpreter de C# en tu navegador: escribes el programa, presionas <b>▶ Ejecutar</b> y ves la salida real. Los ejercicios se califican por <b>SALIDA</b>: tu programa debe imprimir exactamente lo pedido, línea por línea. Y cuando algo falla, el motor te habla <b>en español, con número de línea y con el código de error CS real</b> que daría el compilador de Visual Studio.'},
    {t:'code', lang:'txt', title:'anatomía de un error C#', code:`⚠️ Línea 3 · CS0103: el nombre «mensage» no existe en este contexto
¿Lo escribiste bien? ¿Lo declaraste antes de usarlo?`},
    {t:'table', head:['Código','Causa típica','Arreglo'], rows:[
      ['<b>CS1002</b>','Falta el punto y coma <code>;</code> al final de la línea','En C# CADA instrucción termina con <code>;</code>'],
      ['<b>CS0103</b>','Usas un nombre que no existe','Revisa mayúsculas: <code>Vida</code> ≠ <code>vida</code>'],
      ['<b>CS1525</b>','Expresión incompleta (paréntesis o llave abierta)','Cierra lo que abriste'],
      ['<b>CS1061</b>','Llamas a un miembro que el objeto no tiene','Revisa el nombre del método o campo']
    ]},
    {t:'warn', title:'⚠️ C# es Case Sensitive', h:'<code>Console</code> con C mayúscula funciona; <code>console</code> lanza CS0103. Los nombres de variables también distinguen: <code>oro</code> y <code>Oro</code> son dos variables distintas. Cuando veas CS0103, lo primero es comparar letra por letra.'},
    {t:'p', h:'Un detalle que delata a los recién llegados de Python: en C# el final de instrucción es obligatorio. Si vienes del curso 5, tu dedo buscaba el Enter; ahora debe buscar el <b>punto y coma</b>.'},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>Console.WriteLine("Hola")</code> sin punto y coma lanza…', options:['CS0103','CS1002','CS1525','Nada, compila'], correct:1, pts:10, explain:'CS1002: falta «;». Es el error #1 de quien viene de Python.'},
      {type:'mc', q:'Escribes <code>console.WriteLine("x")</code> con c minúscula. El error es…', options:['CS1002','CS1525','CS0103: console no existe','Funciona igual'], correct:2, pts:10, explain:'C# distingue mayúsculas: la clase es Console.'},
      {type:'tf', q:'<code>Vida</code> y <code>vida</code> son la misma variable.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: son DOS variables distintas (case sensitive).'},
      {type:'mc', q:'CS1061 significa…', options:['Falta un ;','El miembro que llamas no existe en ese objeto','Variable no declarada','Llave sin cerrar'], correct:1, pts:10, explain:'CS1061: «List<int> no contiene una definición para Addd» — typo clásico.'}
    ]},
    {t:'pyex', title:'🧪 Rompe cosas a propósito', tasks:[
      {q:'Ejecuta este programa tal cual y observa el error:<br><code>Console.WriteLine(oro);</code><br>Luego arréglalo declarando <code>int oro = 100;</code> ANTES de imprimirlo. El programa final debe imprimir <code>100</code>.', hint:'Primero declara, luego imprime.', check:{lines:['100']}, solution:'int oro = 100;\nConsole.WriteLine(oro);', pts:20},
      {q:'Este programa tiene un error CS1002. Encuéntralo y haz que imprima <code>Listo</code>:<br><code>Debug.Log("Listo")</code>', hint:'Falta el ; al final.', check:{lines:['Listo']}, solution:'Debug.Log("Listo");', pts:20},
      {q:'Imprime tres líneas:<br><code>a</code>, <code>b</code>, <code>c</code> — pero usa UN solo WriteLine con "\\n" en el texto.', hint:'Console.WriteLine("a\\nb\\nc"); — \\n dentro del string es salto de línea.', check:{lines:['a','b','c']}, solution:'Console.WriteLine("a\\nb\\nc");', pts:20},
      {q:'Declara el string <code>nombre</code> con tu nombre de héroe (el que quieras) y haz que el programa imprima EXACTAMENTE:<br><code>Bienvenido, Ada</code><br>(puede ser cualquier nombre, pero el formato debe ser ese).', hint:'Console.WriteLine("Bienvenido, " + nombre);', check:{lines:['Bienvenido, Ada']}, solution:'string nombre = "Ada";\nConsole.WriteLine("Bienvenido, " + nombre);', pts:20}
    ]},
    {t:'srs', deck:'cscore', sub:'Empieza a fijar los nombres y errores base de C# con repetición espaciada.'}
  ]}
]});

MODULES.push({
  id:'m1', emoji:'🔢', name:'Datos y variables', color:'#0ea5e9',
  desc:'Tipos exactos, aritmética con semántica C#, strings con superpoderes y entrada del jugador.',
  lessons:[

  /* -------- 1-1 -------- */
  { id:'1-1', title:'WriteLine, Write y el formato de salida', time:'12 min', blocks:[
    {t:'p', h:'<code>Console.WriteLine(x)</code> imprime <code>x</code> y <b>salta de línea</b>; <code>Console.Write(x)</code> imprime <b>sin saltar</b>. Los textos van entre comillas dobles <code>"…"</code> (en C# las comillas simples son para UN carácter: <code>\'a\'</code>). Los números van sin comillas y C# calcula antes de imprimir.'},
    {t:'code', lang:'csharp', title:'salida.cs', code:`Console.Write("Vida: ");
Console.Write(100);
Console.WriteLine();            // solo el salto de línea
Console.WriteLine("Oro: " + 250);   // + concatena y salta`},
    {t:'info', title:'ℹ️ True y False con mayúscula', h:'Los booleanos en C# se imprimen <b>True</b> y <b>False</b> (con mayúscula inicial), no true/false como en Python o Java. Si tu juego imprime el estado de una bandera, la salida será <code>Vivo: True</code>. ¡No lo olvides en los ejercicios!'},
    {t:'code', lang:'csharp', title:'bools en pantalla', code:`Console.WriteLine(10 > 3);      // True
Console.WriteLine(2 == 3);      // False`},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué imprime <code>Console.Write("A"); Console.Write("B");</code>?', options:['A\\nB','AB','A B','Error'], correct:1, pts:10, explain:'Write no salta de línea: las dos salidas se pegan en la misma línea.'},
      {type:'mc', q:'¿Qué imprime <code>Console.WriteLine(true);</code>?', options:['true','True','TRUE','1'], correct:1, pts:10, explain:'C# imprime los bools capitalizados: True.'},
      {type:'tf', q:'En C# los textos van entre comillas simples.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: comillas DOBLES. Las simples son para un solo char: \'a\'.'},
      {type:'mc', q:'¿Cuántas líneas imprime <code>Console.WriteLine();</code>?', options:['Cero','Una línea vacía','Dos','Error CS'], correct:1, pts:10, explain:'Sin argumento, WriteLine solo emite el salto de línea: una línea en blanco.'}
    ]},
    {t:'pyex', title:'🧪 Practica la salida', tasks:[
      {q:'Imprime <code>Vida: 100</code> en UNA sola línea usando dos <code>Console.Write</code> (sin WriteLine).', hint:'Write("Vida: "); Write(100); y al final un WriteLine vacío para cerrar la línea.', check:{lines:['Vida: 100']}, solution:'Console.Write("Vida: ");\nConsole.Write(100);\nConsole.WriteLine();', pts:20},
      {q:'Imprime estas dos líneas:<br><code>True</code><br><code>False</code> — con comparaciones, no escribiendo el texto.', hint:'Console.WriteLine(3 > 1);', check:{lines:['True','False']}, solution:'Console.WriteLine(3 > 1);\nConsole.WriteLine(3 < 1);', pts:20},
      {q:'Imprime exactamente:<br><code>Oro: 250</code><br><code>Gemas: 12</code>', hint:'Dos WriteLine; une texto y número con +.', check:{lines:['Oro: 250','Gemas: 12']}, solution:'Console.WriteLine("Oro: " + 250);\nConsole.WriteLine("Gemas: " + 12);', pts:20}
    ]}
  ]},

  /* -------- 1-2 -------- */
  { id:'1-2', title:'Variables y tipos: int, float, bool, string, var', time:'14 min', blocks:[
    {t:'p', h:'En C# <b>cada variable declara su tipo</b>: el compilador reserva el espacio exacto y te protege de mezclar peras con manzanas. La declaración es <code>tipo nombre = valor;</code> y después de eso la variable es de ese tipo para siempre.'},
    {t:'code', lang:'csharp', title:'tipos.cs', code:`int vida = 100;             // enteros
float velocidad = 2.5f;     // decimales (¡sufijo f!)
bool vivo = true;           // verdadero/falso
string nombre = "Ada";      // texto
var oro = 50;               // var: el compilador INFIERE el tipo (aquí int)

vida = vida - 30;           // reasignar (mismo tipo)
Console.WriteLine(nombre + " tiene " + vida + " de vida");`},
    {t:'table', head:['Tipo','Guarda','Ejemplo literal','Nota'], rows:[
      ['<code>int</code>','Enteros','42, -7','La división entre ints trunca (lo ves en 1-3)'],
      ['<code>float</code>','Decimales','2.5f','El sufijo <code>f</code> es OBLIGATORIO en literales'],
      ['<code>bool</code>','Lógica','true, false','Se imprime True/False'],
      ['<code>string</code>','Texto','"Ada"','Con comillas dobles'],
      ['<code>var</code>','Lo que infiera','var x = 5;','Solo para declarar e inicializar a la vez']
    ]},
    {t:'warn', title:'⚠️ El sufijo f de los float', h:'<code>float v = 2.5;</code> lanza error (el literal 2.5 es double). Escribe <code>2.5f</code>. En el laboratorio también aceptamos <code>double d = 2.5;</code> sin sufijo: double es el decimal grande de C#. Regla práctica para Unity: <code>float</code> con su <code>f</code>.'},
    {t:'p', h:'Puedes declarar varias variables de un tirón: <code>int x = 1, y = 2;</code>. Y los números literales también pueden llevar separador visual: no, eso es de otros lenguajes — en C# es <code>1_000_000</code>… pero para el curso basta con números normales.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué línea declara bien un float?', options:['float v = 2.5;','float v = 2.5f;','float v = f2.5;','float = 2.5f;'], correct:1, pts:10, explain:'El sufijo f va pegado al número: 2.5f.'},
      {type:'mc', q:'<code>var oro = 50;</code> — ¿de qué tipo es oro?', options:['float','string','int: var lo infiere','No tiene tipo'], correct:2, pts:10, explain:'var no es «sin tipo»: es «tú deduce el tipo». 50 es int.'},
      {type:'tf', q:'<code>bool vivo = 1;</code> es válido.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: bool solo acepta true/false. En C# no hay ints que hagan de bool (a diferencia de C).'},
      {type:'mc', q:'Después de <code>int vida = 100;</code>, la línea <code>vida = "llena";</code>…', options:['Cambia el tipo de vida','Lanza error: no puedes asignar string a int','Concatena','Imprime "llena"'], correct:1, pts:10, explain:'Los tipos son fijos: error CS0029 de conversión imposible.'}
    ]},
    {t:'pyex', title:'🧪 Declara como en Unity', tasks:[
      {q:'Declara <code>float velocidad = 2.5f;</code> e imprime <code>2.5</code>.', hint:'Console.WriteLine(velocidad);', check:{lines:['2.5']}, solution:'float velocidad = 2.5f;\nConsole.WriteLine(velocidad);', pts:20},
      {q:'Declara <code>bool jefeDerrotado = false;</code> e imprime su valor (recuerda la mayúscula).', check:{lines:['False']}, solution:'bool jefeDerrotado = false;\nConsole.WriteLine(jefeDerrotado);', pts:20},
      {q:'Declara <code>var enemigos = 8;</code>, réstale 3 e imprime <code>5</code>.', hint:'enemigos = enemigos - 3;', check:{lines:['5']}, solution:'var enemigos = 8;\nenemigos = enemigos - 3;\nConsole.WriteLine(enemigos);', pts:20},
      {q:'Usa UNA línea para declarar dos ints: <code>int oro = 40, plata = 15;</code> e imprime el total <code>55</code>.', hint:'Console.WriteLine(oro + plata);', check:{lines:['55']}, solution:'int oro = 40, plata = 15;\nConsole.WriteLine(oro + plata);', pts:20}
    ]}
  ]},

  /* -------- 1-3 -------- */
  { id:'1-3', title:'Aritmética C#: int/int trunca, % y casts', time:'14 min', blocks:[
    {t:'p', h:'La aritmética de C# tiene una regla que sorprende a los que vienen de Python: <b>int entre int da int</b>. Los decimales se descartan (trunca hacia cero): <code>10 / 4</code> es <code>2</code>, no <code>2.5</code>. Si quieres decimales, uno de los dos debe ser float: <code>10 / 4.0f</code> sí es <code>2.5</code>.'},
    {t:'code', lang:'csharp', title:'divisones.cs', code:`Console.WriteLine(10 / 4);      // 2  (int/int trunca)
Console.WriteLine(10 / 4.0f);   // 2.5 (hay un float)
Console.WriteLine(-7 / 2);      // -3 (trunca hacia CERO)
Console.WriteLine(10 % 3);      // 1  (% = resto)
Console.WriteLine(10 / 4 * 1.0f); // ¡ojo! 2 — el truncado ya pasó`},
    {t:'warn', title:'⚠️ DivideByZeroException', h:'En Python, <code>10/0</code> lanza ZeroDivisionError. En C#: dividir <b>enteros</b> entre cero lanza <code>DivideByZeroException</code>. Pero dividir <b>floats</b> entre cero NO lanza: da Infinity (¡como en matemáticas de motor!). Prueba en el playground: <code>Console.WriteLine(10 / 0.0f);</code>'},
    {t:'p', h:'El operador <code>%</code> (módulo) devuelve el <b>resto</b> de la división y es el rey de los juegos: <code>turno % 2 == 0</code> para turnos alternos, <code>i % 10 == 0</code> para «cada 10 enemigos suelta un cofre». Con negativos conserva el signo del dividendo: <code>-7 % 3</code> es <code>-1</code>.'},
    {t:'p', h:'Para convertir entre tipos se usan <b>casts</b>: <code>(int)3.9</code> trunca hacia cero y da <code>3</code>; <code>(float)7</code> convierte el entero a decimal. El cast de float→int <b>no redondea: corta</b>.'},
    {t:'code', lang:'csharp', title:'casts.cs', code:`float vida = 97.6f;
int corazoncitos = (int)(vida / 10);   // 9 — el cast corta, no redondea
Console.WriteLine(corazoncitos);
int x = (int)-3.9;
Console.WriteLine(x);                   // -3 (hacia cero)`},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué imprime <code>Console.WriteLine(7 / 2);</code>?', options:['3.5','3','4','Error'], correct:1, pts:10, explain:'int/int trunca: 3.5 se corta a 3.'},
      {type:'mc', q:'¿Y <code>Console.WriteLine(7 / 2.0f);</code>?', options:['3','3.5','4','CS1002'], correct:1, pts:10, explain:'Hay un float en la operación: división real, 3.5.'},
      {type:'mc', q:'<code>17 % 5</code> vale…', options:['3','2','3.4','0'], correct:1, pts:10, explain:'17 = 5×3 + 2: el resto es 2.'},
      {type:'tf', q:'<code>(int)2.9</code> da 3.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: el cast TRUNCA (corta): da 2. Para redondear, Math.Round.'}
    ]},
    {t:'pyex', title:'🧪 La aritmética del motor', tasks:[
      {q:'Imprime el resultado de repartir 25 monedas de oro entre 4 héroes con división entera (<code>6</code>).', hint:'Console.WriteLine(25 / 4);', check:{lines:['6']}, solution:'Console.WriteLine(25 / 4);', pts:20},
      {q:'Imprime el resto de repartir 25 monedas entre 4 (<code>1</code>).', hint:'El operador %.', check:{lines:['1']}, solution:'Console.WriteLine(25 % 4);', pts:20},
      {q:'Calcula el promedio real de 10 y 7 con decimales (<code>8.5</code>).', hint:'Algo debe ser float: (10 + 7) / 2.0f', check:{lines:['8.5']}, solution:'Console.WriteLine((10 + 7) / 2.0f);', pts:20},
      {q:'Declara <code>float vida = 55.9f;</code> y muestra cuántos «corazones» completos de 10 puntos tiene (<code>5</code>), usando un cast.', hint:'(int)(vida / 10) — el cast corta.', check:{lines:['5']}, solution:'float vida = 55.9f;\nConsole.WriteLine((int)(vida / 10));', pts:20}
    ]}
  ]},

  /* -------- 1-4 -------- */
  { id:'1-4', title:'Strings e interpolación $\"…\"', time:'14 min', blocks:[
    {t:'p', h:'Unir texto con <code>+</code> funciona, pero se vuelve ilegible: <code>"Vida: " + vida + " de " + maximo</code>. C# tiene algo mejor: la <b>interpolación</b>. Pones <code>$</code> antes de las comillas y dentro usas llaves: <code>$"Vida: {vida}"</code>. Es el equivalente a los f-strings de Python, y en Unity se usa TODO el tiempo en logs de depuración.'},
    {t:'code', lang:'csharp', title:'interpolacion.cs', code:`string nombre = "Ada";
int oro = 250;
float precio = 3.5f;
Console.WriteLine($"La héroe {nombre} tiene {oro} monedas");
Console.WriteLine($"Cuesta {precio:F2}");   // F2 = 2 decimales fijos → 3.50`},
    {t:'info', title:'ℹ️ Formatos F0–F3 y el redondeo', h:'Dentro de las llaves puedes pedir decimales fijos: <code>{precio:F0}</code>, <code>{precio:F1}</code>, <code>{precio:F2}</code>, <code>{precio:F3}</code>. Para los puntos medios, el formato F redondea <b>alejándose de cero</b> (1234.5 con F0 → 1235). ¡Ojo! Eso NO es lo que hace <code>Math.Round</code>, que usa el redondeo bancario (al par) — ya lo verás en el módulo 5.'},
    {t:'p', h:'Los strings también tienen métodos útiles: <code>s.ToUpper()</code> mayúsculas, <code>s.ToLower()</code> minúsculas, <code>s.Length</code> longitud, <code>s.Contains("x")</code> ¿contiene?, <code>s.Replace("a","b")</code> reemplazar y <code>s.Substring(0, 4)</code> rebanar. Y puedes indexar letras: <code>s[0]</code> es el primer carácter.'},
    {t:'code', lang:'csharp', title:'metodos de string', code:`string s = "Libreria Esperanza";
Console.WriteLine(s.ToUpper());        // LIBRERIA ESPERANZA
Console.WriteLine(s.Length);           // 17 (¡los espacios cuentan!)
Console.WriteLine(s.Contains("Esperanza"));  // True
Console.WriteLine(s.Replace("Libreria", "Torre"));  // Torre Esperanza
Console.WriteLine(s[0]);               // L`},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué imprime <code>Console.WriteLine($"x{2+3}y");</code>?', options:['x{2+3}y','x5y','x2+3y','Error CS'], correct:1, pts:10, explain:'Dentro de las llaves hay una EXPRESIÓN: se evalúa. x5y.'},
      {type:'mc', q:'<code>precio = 3.5f</code> — ¿qué imprime <code>$"{precio:F2}"</code>?', options:['3.5','3.50','3,50','F2'], correct:1, pts:10, explain:'F2 fuerza DOS decimales: 3.50.'},
      {type:'tf', q:'<code>"AB".Length</code> vale 2.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Length cuenta caracteres: A y B, dos.'},
      {type:'mc', q:'¿Qué imprime <code>$"{1234.5:F0}"</code>?', options:['1234','1235','1234.5','1234,5'], correct:1, pts:10, explain:'El formato F redondea midpoints alejándose de cero: 1235.'}
    ]},
    {t:'pyex', title:'🧪 Textos con poder', tasks:[
      {q:'Con <code>string nombre = "Esperanza";</code> imprime exactamente:<br><code>La librería se llama Esperanza</code> usando interpolación.', hint:'Console.WriteLine($"La librería se llama {nombre}");', check:{lines:['La librería se llama Esperanza']}, solution:'string nombre = "Esperanza";\nConsole.WriteLine($"La librería se llama {nombre}");', pts:20},
      {q:'Imprime <code>ESPERANZA</code> (mayúsculas) a partir de la variable del ejercicio anterior.', hint:'ToUpper()', check:{lines:['ESPERANZA']}, solution:'string nombre = "Esperanza";\nConsole.WriteLine(nombre.ToUpper());', pts:20},
      {q:'Con <code>float xp = 12.5f;</code> imprime <code>XP ganada: 12.50</code> usando interpolación con formato.', hint:'$"...{xp:F2}"', check:{lines:['XP ganada: 12.50']}, solution:'float xp = 12.5f;\nConsole.WriteLine($"XP ganada: {xp:F2}");', pts:20},
      {q:'Muestra cuántas letras tiene <code>"Libreria Esperanza"</code> con el formato:<br><code>Letras: 18</code> (que C# cuente con Length).', hint:'$"Letras: {s.Length}"', check:{lines:['Letras: 18']}, solution:'string s = "Libreria Esperanza";\nConsole.WriteLine($"Letras: {s.Length}");', pts:20}
    ]}
  ]},

  /* -------- 1-5 -------- */
  { id:'1-5', title:'ReadLine: el jugador escribe', time:'14 min', blocks:[
    {t:'p', h:'Los programas de consola leen texto del jugador con <code>Console.ReadLine()</code>: pausa el programa, espera un Enter y devuelve <b>lo tecleado como string</b>. En el laboratorio, cada ejercicio trae una «entrada simulada» (como una cola de teclas): la primera llamada a ReadLine consume la primera línea, la segunda la segunda, etc.'},
    {t:'code', lang:'csharp', title:'saludo.cs', code:`Console.Write("¿Cómo te llamas? ");
string nombre = Console.ReadLine();
Console.WriteLine($"¡Hola, {nombre}!");`},
    {t:'warn', title:'⚠️ ReadLine SIEMPRE da texto', h:'Si el jugador teclea <code>25</code>, ReadLine devuelve el STRING <code>"25"</code>, no el número. Para operar aritmética debes convertirlo: <code>int.Parse(texto)</code> o <code>Convert.ToInt32(texto)</code>. Si el texto no es un número válido (<code>"abc"</code>, <code>""</code>, <code>"3.5"</code> para int), <code>int.Parse</code> lanza <code>FormatException</code> — por eso existe try/catch (módulo 6).'},
    {t:'code', lang:'csharp', title:'conversiones.cs', code:`string texto = Console.ReadLine();     // el jugador teclea 21
int n = int.Parse(texto);
Console.WriteLine(n * 2);              // 42

float f = float.Parse("3.5");          // también existe para float
int m = Convert.ToInt32("7");          // otra forma de convertir`},
    {t:'p', h:'En Unity consola pura casi no se usa, pero este patrón «leer texto → convertir → validar» es idéntico al de leer un input field de UI: <code>int.Parse(miInput.text)</code> es literalmente el código que escribirás en un menú de opciones del juego.'},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>Console.ReadLine()</code> devuelve…', options:['Un int','Un float','Un string','Un bool'], correct:2, pts:10, explain:'SIEMPRE string, aunque el jugador teclee números.'},
      {type:'mc', q:'El jugador teclea <code>abc</code> y haces <code>int.Parse("abc")</code>. Resultado…', options:['0','null','FormatException','Compila pero nada'], correct:2, pts:10, explain:'int.Parse lanza FormatException ante texto no numérico.'},
      {type:'tf', q:'<code>int.Parse("42") + 1</code> vale 43.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Parse convierte "42" a int 42; la suma da 43.'},
      {type:'mc', q:'Dos ReadLine seguidos con entradas ["oro","plata"]…', options:['Ambos dan "oro"','El 1º da "oro", el 2º "plata"','El 2º da null','Error'], correct:1, pts:10, explain:'Cada ReadLine consume la siguiente línea de la cola.'}
    ]},
    {t:'pyex', title:'🧪 Escucha al jugador', tasks:[
      {q:'Lee el nombre del jugador con ReadLine (la entrada es <code>Ada</code>) e imprime <code>¡Bienvenida, Ada!</code>', hint:'string nombre = Console.ReadLine();', stdin:['Ada'], check:{lines:['¡Bienvenida, Ada!']}, solution:'string nombre = Console.ReadLine();\nConsole.WriteLine($"¡Bienvenida, {nombre}!");', pts:20},
      {q:'Lee un número (entrada: <code>15</code>) e imprime su doble: <code>30</code>.', hint:'int n = int.Parse(Console.ReadLine());', stdin:['15'], check:{lines:['30']}, solution:'int n = int.Parse(Console.ReadLine());\nConsole.WriteLine(n * 2);', pts:20},
      {q:'Lee DOS números en líneas separadas (entradas: <code>7</code> y <code>5</code>) e imprime su suma: <code>12</code>.', hint:'Dos ReadLine, dos parses.', stdin:['7','5'], check:{lines:['12']}, solution:'int a = int.Parse(Console.ReadLine());\nint b = int.Parse(Console.ReadLine());\nConsole.WriteLine(a + b);', pts:20},
      {q:'Lee el nombre (entrada: <code>hero</code>) e imprime en DOS líneas:<br><code>Jugador: hero</code><br><code>Nivel: 1</code> — el nivel es un int que declares y sumes 0 + 1 (no lo escribas directo).', hint:'Declarar int nivel = 0; luego nivel = nivel + 1; o nivel++;', stdin:['hero'], check:{lines:['Jugador: hero','Nivel: 1']}, solution:'string nombre = Console.ReadLine();\nint nivel = 0;\nnivel++;\nConsole.WriteLine($"Jugador: {nombre}");\nConsole.WriteLine($"Nivel: {nivel}");', pts:20}
    ]}
  ]}
]});

MODULES.push({
  id:'m2', emoji:'🔀', name:'Decisiones y ciclos', color:'#f59e0b',
  desc:'if/else, while, do-while, for, break y continue: el flujo de todo gameplay.',
  lessons:[

  /* -------- 2-1 -------- */
  { id:'2-1', title:'Comparaciones y lógica && || !', time:'12 min', blocks:[
    {t:'p', h:'Las decisiones se apoyan en expresiones que dan <code>true</code> o <code>false</code>. Los comparadores son <code>==</code> igual, <code>!=</code> distinto, <code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code>. Para combinar condiciones: <code>&amp;&amp;</code> (Y — las dos), <code>||</code> (O — alguna), <code>!</code> (NO — invierte). Igual que en casi todos los lenguajes serios.'},
    {t:'code', lang:'csharp', title:'logica.cs', code:`int vida = 50;
bool enVeneno = true;
Console.WriteLine(vida > 0 && vida < 100);   // True
Console.WriteLine(!enVeneno);                // False
Console.WriteLine(vida <= 0 || enVeneno);    // True (basta una)`},
    {t:'info', title:'ℹ️ Cortocircuito: && y || son perezosos', h:'En <code>a &amp;&amp; b</code>, si <code>a</code> ya es false, <code>b</code> <b>ni se evalúa</b>. En <code>a || b</code>, si <code>a</code> es true, pasa lo mismo. Esto NO es un detalle teórico: <code>n != 0 &amp;&amp; 100 / n &gt; 5</code> es seguro aunque n sea 0, porque la división jamás se ejecuta. Úsalo como guarda.'},
    {t:'p', h:'Cuidado con el clásico: <code>=</code> asigna, <code>==</code> compara. <code>if (vida = 0)</code> no compila en C# (el if exige bool, y una asignación de int no lo es) — el compilador te salva, pero en otros lenguajes es una bomba silenciosa.'},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>vida &gt; 0 &amp;&amp; vida &lt;= 100</code> con vida = 100 vale…', options:['true','false','Error','100'], correct:0, pts:10, explain:'100 > 0 ✓ y 100 <= 100 ✓: true && true = true.'},
      {type:'mc', q:'¿Qué operador es «O lógico» en C#?', options:['&amp;','|','||','or'], correct:2, pts:10, explain:'|| (doble barra). | existe pero no cortocircuita.'},
      {type:'tf', q:'En <code>false &amp;&amp; (10 / 0 > 1)</code> la división se ejecuta y lanza excepción.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: && cortocircuita; el lado derecho ni se mira.'},
      {type:'mc', q:'<code>!(3 &gt; 5)</code> vale…', options:['true','false','3','Error'], correct:0, pts:10, explain:'3 > 5 es false; !false = true.'}
    ]},
    {t:'pyex', title:'🧪 Lógica de guardia', tasks:[
      {q:'Con <code>int vida = 30;</code> imprime si está en «zona segura» (vida mayor o igual a 30): <code>True</code>.', hint:'Console.WriteLine(vida >= 30);', check:{lines:['True']}, solution:'int vida = 30;\nConsole.WriteLine(vida >= 30);', pts:20},
      {q:'Declara <code>bool llave = true;</code> y <code>bool puerta = false;</code>. Imprime si puede pasar (las dos a la vez): <code>False</code>.', hint:'llave && puerta', check:{lines:['False']}, solution:'bool llave = true;\nbool puerta = false;\nConsole.WriteLine(llave && puerta);', pts:20},
      {q:'Con <code>int n = 0;</code> imprime <code>Seguro</code> SOLO si el cociente seguro <code>100 / n</code> no explota — usando la técnica de cortocircuito en una condición if. Es decir: si n es 0 imprime <code>Seguro</code>; si no, imprime el cociente (aquí n=0 → imprime Seguro).', hint:'if (n == 0) Console.WriteLine("Seguro"); — o con guarda: if (n != 0 && …) else …', check:{lines:['Seguro']}, solution:'int n = 0;\nif (n == 0) Console.WriteLine("Seguro");', pts:20}
    ]}
  ]},

  /* -------- 2-2 -------- */
  { id:'2-2', title:'if / else if / else', time:'13 min', blocks:[
    {t:'p', h:'La estructura de decisión universal: <code>if (condición) { … } else if (…) { … } else { … }</code>. Las condiciones van <b>entre paréntesis obligatorios</b> y los bloques entre llaves (si es una sola instrucción puedes omitir las llaves, pero en este curso las usaremos siempre: evita el bug clásico de «añadí una línea y ya no está dentro del if»).'},
    {t:'flow', flow:'ifelse', h:'El mismo diagrama de Branch que ya conoces de Blueprints, ahora en texto.'},
    {t:'code', lang:'csharp', title:'estados.cs', code:`int vida = 85;

if (vida >= 90) {
  Console.WriteLine("Impecable");
} else if (vida >= 50) {
  Console.WriteLine("Herido");
} else {
  Console.WriteLine("¡Crítico!");
}
// imprime: Herido`},
    {t:'warn', title:'⚠️ El orden de las condiciones importa', h:'C# evalúa de arriba hacia abajo y entra al PRIMERO que cumpla. Si pones <code>vida &gt;= 50</code> antes que <code>vida &gt;= 90</code>, un 95 caería en «Herido» y jamás llegaría a «Impecable». Regla: de la condición más estricta a la más laxa.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Con vida = 85 en el ejemplo, ¿qué imprime?', options:['Impecable','Herido','¡Crítico!','Nada'], correct:1, pts:10, explain:'85 >= 90 no; 85 >= 50 sí: entra ahí y ya no revisa el resto.'},
      {type:'mc', q:'¿Qué falta en <code>if vida > 10 { }</code>?', options:['Un ;','Los paréntesis de la condición','else','Nada'], correct:1, pts:10, explain:'En C# la condición SIEMPRE entre paréntesis: if (vida > 10).'},
      {type:'tf', q:'Si dos condiciones del if/else if se cumplen, se ejecutan los dos bloques.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Solo entra al PRIMERO que cumple; el resto se salta.'},
      {type:'mc', q:'<code>else</code> sin condición sirve para…', options:['Repetir el if','El caso «todo lo demás»','Terminar el programa','Nada, es opcional y sobra'], correct:1, pts:10, explain:'else captura cuando ninguna condición anterior se cumplió.'}
    ]},
    {t:'pyex', title:'🧪 Ramas del juego', tasks:[
      {q:'Declara <code>int nivel = 7;</code> y usa if/else para imprimir <code>Pro</code> si nivel &gt;= 10, o <code>Aprendiz</code> en caso contrario.', check:{lines:['Aprendiz']}, solution:'int nivel = 7;\nif (nivel >= 10) {\n  Console.WriteLine("Pro");\n} else {\n  Console.WriteLine("Aprendiz");\n}', pts:20},
      {q:'Con <code>int oro = 120;</code>: imprime <code>Rica</code> si oro &gt; 100, <code>Normal</code> si &gt; 50, y <code>Pobre</code> en cualquier otro caso. (120 → Rica)', hint:'De estricta a laxa: > 100, luego > 50, luego else.', check:{lines:['Rica']}, solution:'int oro = 120;\nif (oro > 100) {\n  Console.WriteLine("Rica");\n} else if (oro > 50) {\n  Console.WriteLine("Normal");\n} else {\n  Console.WriteLine("Pobre");\n}', pts:20},
      {q:'Lee un número (entrada: <code>-5</code>) e imprime <code>Positivo</code>, <code>Cero</code> o <code>Negativo</code> según corresponda.', stdin:['-5'], hint:'Tres ramas: n > 0, n == 0, else.', check:{lines:['Negativo']}, solution:'int n = int.Parse(Console.ReadLine());\nif (n > 0) {\n  Console.WriteLine("Positivo");\n} else if (n == 0) {\n  Console.WriteLine("Cero");\n} else {\n  Console.WriteLine("Negativo");\n}', pts:20},
      {q:'Lee una edad (entrada: <code>15</code>). Si es 13 o más imprime <code>Acceso TEEN</code>; si no, <code>Solo E</code>.', stdin:['15'], check:{lines:['Acceso TEEN']}, solution:'int edad = int.Parse(Console.ReadLine());\nif (edad >= 13) {\n  Console.WriteLine("Acceso TEEN");\n} else {\n  Console.WriteLine("Solo E");\n}', pts:20}
    ]}
  ]},

  /* -------- 2-3 -------- */
  { id:'2-3', title:'while y do-while', time:'13 min', blocks:[
    {t:'p', h:'<code>while (condición) { … }</code> repite el bloque <b>mientras</b> la condición sea verdadera. Es el ciclo natural cuando <b>no sabes cuántas vueltas</b> harás: «mientras el slime viva, golpéalo». La condición se revisa ANTES de cada vuelta.'},
    {t:'code', lang:'csharp', title:'while.cs', code:`int vidaSlime = 20;
int golpes = 0;

while (vidaSlime > 0) {
  vidaSlime -= 7;
  golpes++;
  Console.WriteLine($"Golpe {golpes}: vida del slime {vidaSlime}");
}
Console.WriteLine($"Tardó {golpes} golpes");`},
    {t:'info', title:'ℹ️ do-while: primero actúa, luego pregunta', h:'<code>do { … } while (cond);</code> ejecuta el bloque <b>al menos una vez</b> y revisa la condición al final. Es el ciclo perfecto para menús: «muestra el menú, lee opción, ¿repetir?». Un menú siempre debe verse al menos una vez aunque el usuario quiera salir de inmediato.'},
    {t:'code', lang:'csharp', title:'dowhile.cs', code:`int intentos = 0;
do {
  intentos++;
  Console.WriteLine($"Intento {intentos}");
} while (intentos < 3);
// imprime Intento 1, 2, 3`},
    {t:'warn', title:'⚠️ El ciclo infinito', h:'Si nada dentro del while cambia la condición, el ciclo corre para siempre: <code>while (true)</code> sin <code>break</code> o <code>while (i &lt; 5)</code> sin <code>i++</code>. El laboratorio lo detecta y corta el programa con un aviso; el editor real de Unity se congela y hay que matar el proceso (¡todos lo hemos vivido!). Regla: identifica SIEMPRE qué línea acerca el ciclo al final.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Cuántas veces imprime <code>int i = 0; while (i &lt; 3) { Console.WriteLine(i); i++; }</code>?', options:['2','3','4','Infinitas'], correct:1, pts:10, explain:'i vale 0, 1, 2 → tres vueltas. Con i=3 la condición ya no se cumple.'},
      {type:'mc', q:'La diferencia de do-while es que…', options:['Nunca termina','El bloque corre al menos una vez','Revisa la condición dos veces','Es más rápido'], correct:1, pts:10, explain:'La condición se evalúa DESPUÉS: primera vuelta garantizada.'},
      {type:'tf', q:'Olvidar i++ dentro de un while con i &lt;= 5 produce ciclo infinito.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'La condición nunca cambia: while eterno (el laboratorio lo corta, Unity se congela).'},
      {type:'mc', q:'¿Cuántas líneas imprime <code>int i = 10; do { Console.WriteLine(i); i++; } while (i &lt; 3);</code>?', options:['Cero','Una (el 10)','Tres','Infinitas'], correct:1, pts:10, explain:'do-while corre una vez aunque la condición ya sea falsa: imprime 10.'}
    ]},
    {t:'pyex', title:'🧪 Ciclos que deciden solos', tasks:[
      {q:'Con <code>int vida = 30;</code> imprime la cuenta regresiva de vida de 10 en 10 hasta llegar a 0 inclusive:<br><code>30, 20, 10, 0</code> (una por línea, solo números).', hint:'while (vida >= 0) { imprime; vida -= 10; }', check:{lines:['30','20','10','0']}, solution:'int vida = 30;\nwhile (vida >= 0) {\n  Console.WriteLine(vida);\n  vida -= 10;\n}', pts:20},
      {q:'Con un do-while imprime exactamente:<br><code>Menu</code><br><code>Listo</code> — el bloque corre una vez, y la condición de repetición es falsa.', hint:'do { WriteLine("Menu"); } while (false); WriteLine("Listo");', check:{lines:['Menu','Listo']}, solution:'do {\n  Console.WriteLine("Menu");\n} while (false);\nConsole.WriteLine("Listo");', pts:20},
      {q:'Un slime tiene 25 de vida y cada golpe le quita 8. Con un while, imprime la vida que queda tras CADA golpe (25→17→9→1, una por línea) y al final <code>Derrotado</code>.', hint:'while (vida > 0) { vida -= 8; imprime; } — ojo: 1 > 0 da otra vuelta... usa vida > 0 y verás 17, 9, 1 y -7. Mejor: imprime mientras vida > 0 PERO corta si vida <= 0 tras restar.', check:{lines:['17','9','1','Derrotado']}, solution:'int vida = 25;\nwhile (vida > 0) {\n  vida -= 8;\n  if (vida > 0) Console.WriteLine(vida);\n}\nConsole.WriteLine("Derrotado");', pts:20},
      {q:'Lee números (entradas: <code>3, 1, 4, 0</code>) y súmalos mientras sean distintos de 0; al leer el 0 imprime el total: <code>8</code> (patrón centinela).', hint:'while (true) { n = Parse(ReadLine()); if (n == 0) break; total += n; }', stdin:['3','1','4','0'], check:{lines:['8']}, solution:'int total = 0;\nwhile (true) {\n  int n = int.Parse(Console.ReadLine());\n  if (n == 0) break;\n  total += n;\n}\nConsole.WriteLine(total);', pts:20}
    ]}
  ]},

  /* -------- 2-4 -------- */
  { id:'2-4', title:'for: el ciclo del gameplay', time:'13 min', blocks:[
    {t:'p', h:'Cuando sabes CUÁNTAS vueltas quieres (10 enemigos, 3 oleadas, 60 frames), el <code>for</code> es tu ciclo. Tiene tres partes separadas por <code>;</code>: <code>for (inicio; condición; paso) { … }</code>. La variable del ciclo nace y muere dentro del for.'},
    {t:'code', lang:'csharp', title:'oleadas.cs', code:`for (int i = 1; i <= 3; i++) {
  Console.WriteLine($"Oleada {i} llega");
}
// Oleada 1 llega / Oleada 2 llega / Oleada 3 llega`},
    {t:'flow', flow:'forloop', h:'init → ¿condición? → cuerpo → paso → repetir. Exactamente como ForLoop de Blueprints con first/last index.'},
    {t:'info', title:'ℹ️ Cuenta regresiva y pasos de 2', h:'El paso puede ser cualquiera: <code>for (int i = 10; i &gt; 0; i--)</code> cuenta hacia atrás (el clásico «3, 2, 1, ¡lucha!»); <code>for (int i = 0; i &lt; 10; i += 2)</code> va de 2 en 2. Y las tres partes pueden estar casi vacías: <code>for (;;)</code> es un while(true) disfrazado.'},
    {t:'code', lang:'csharp', title:'regresivo.cs', code:`for (int i = 3; i >= 1; i--) {
  Console.WriteLine(i);
}
Console.WriteLine("¡Lucha!");`},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué imprime <code>for (int i = 0; i &lt; 3; i++) Console.WriteLine(i);</code>?', options:['1 2 3','0 1 2','0 1 2 3','3 líneas con 3'], correct:1, pts:10, explain:'Empieza en 0 y para ANTES de 3: 0, 1, 2.'},
      {type:'mc', q:'<code>for (int i = 2; i &lt;= 6; i += 2)</code> hace…', options:['2 vueltas','3 vueltas (2, 4, 6)','6 vueltas','Infinitas'], correct:1, pts:10, explain:'i = 2, 4, 6: tres vueltas con paso 2.'},
      {type:'tf', q:'La variable i declarada dentro del for puede usarse después del ciclo.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: su ámbito es el for. Fuera, CS0103.'},
      {type:'mc', q:'Cuenta regresiva de 3 a 1: la condición correcta es…', options:['i &gt; 0','i &gt;= 0','i &lt; 3','i &gt;= 3'], correct:0, pts:10, explain:'Con i &gt; 0: imprime 3, 2, 1 y para en 0.'}
    ]},
    {t:'pyex', title:'🧪 Vueltas contadas', tasks:[
      {q:'Imprime los números del 1 al 5, uno por línea, con un for.', check:{lines:['1','2','3','4','5']}, solution:'for (int i = 1; i <= 5; i++) {\n  Console.WriteLine(i);\n}', pts:20},
      {q:'Con un for, imprime la cuenta regresiva 3, 2, 1 y luego <code>¡Lucha!</code>.', hint:'for (int i = 3; i >= 1; i--)', check:{lines:['3','2','1','¡Lucha!']}, solution:'for (int i = 3; i >= 1; i--) {\n  Console.WriteLine(i);\n}\nConsole.WriteLine("¡Lucha!");', pts:20},
      {q:'Imprime la tabla de daño del 3: <code>3x1=3</code>, <code>3x2=6</code>, <code>3x3=9</code> (una por línea, con interpolación).', hint:'$"{3}x{i}={3*i}"', check:{lines:['3x1=3','3x2=6','3x3=9']}, solution:'for (int i = 1; i <= 3; i++) {\n  Console.WriteLine($"3x{i}={3 * i}");\n}', pts:20},
      {q:'Suma con un for los números del 1 al 10 e imprime solo el total: <code>55</code> (el acumulador va FUERA del for).', hint:'int total = 0; for… total += i;', check:{lines:['55']}, solution:'int total = 0;\nfor (int i = 1; i <= 10; i++) {\n  total += i;\n}\nConsole.WriteLine(total);', pts:20}
    ]}
  ]},

  /* -------- 2-5 -------- */
  { id:'2-5', title:'break, continue y centinelas', time:'13 min', blocks:[
    {t:'p', h:'Dos palabras controlan el flujo DENTRO de un ciclo: <code>break</code> lo <b>abandona de inmediato</b> (salta al código después del ciclo) y <code>continue</code> <b>salta a la siguiente vuelta</b> sin terminar la actual. Son la pareja con la que escribes reglas como «para al primer enemigo muerto» o «ignora los turns nulos».'},
    {t:'code', lang:'csharp', title:'breakcontinue.cs', code:`for (int i = 1; i <= 5; i++) {
  if (i == 3) continue;     // la vuelta 3 se salta
  if (i == 5) break;        // al llegar a 5, fuera
  Console.WriteLine(i);
}
// imprime 1, 2, 4`},
    {t:'info', title:'ℹ️ El patrón centinela', h:'<code>while (true) { … if (condición de salida) break; … }</code> se llama <b>centinela</b>: un ciclo «infinito» vigilado por una salida explícita. Es la forma más limpia de leer entradas hasta un valor especial (un 0, una palabra clave) y de los game loops: «while (true) { procesar input; actualizar; si quit → break; }».'},
    {t:'code', lang:'csharp', title:'busqueda.cs', code:`int[] cofres = { 5, 0, 12, 7 };
for (int i = 0; i < cofres.Length; i++) {
  if (cofres[i] == 0) continue;   // cofre vacío: siguiente
  if (cofres[i] >= 12) {
    Console.WriteLine($"¡Jackpot en el cofre {i}!");
    break;                        // ya lo encontré, no sigo
  }
}`},
    {t:'quiz', questions:[
      {type:'mc', q:'En el primer ejemplo, ¿por qué no imprime el 3?', options:['Porque 3 es impar','Por continue salta esa vuelta','Porque break lo cortó','Error de sintaxis'], correct:1, pts:10, explain:'continue abandona la vuelta actual: la línea de abajo nunca corre con i=3.'},
      {type:'mc', q:'Después de <code>break</code>, la ejecución continúa…', options:['En la siguiente vuelta del ciclo','En la línea siguiente AL ciclo','En el inicio del ciclo','El programa termina'], correct:1, pts:10, explain:'break sale del ciclo completo; lo que va después del ciclo sí corre.'},
      {type:'tf', q:'<code>continue</code> termina el programa.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Falso: solo salta a la siguiente vuelta.'},
      {type:'mc', q:'En el ejemplo de cofres, si NINGÚN cofre tuviera 12+, el programa…', options:['Imprime Jackpot igual','Recorre todo y no imprime nada','Lanza error','Se cicla'], correct:1, pts:10, explain:'El for termina normalmente sin entrar al if: no hay salida.'}
    ]},
    {t:'pyex', title:'🧪 Domina las salidas', tasks:[
      {q:'Imprime los números del 1 al 6 pero SALTANDO el 4, usando continue.', hint:'if (i == 4) continue;', check:{lines:['1','2','3','5','6']}, solution:'for (int i = 1; i <= 6; i++) {\n  if (i == 4) continue;\n  Console.WriteLine(i);\n}', pts:20},
      {q:'Con un while(true) y break: imprime <code>1</code>, <code>2</code>, <code>3</code> y sale.', hint:'int i = 1; while (true) { imprime; if (i == 3) break; i++; }', check:{lines:['1','2','3']}, solution:'int i = 1;\nwhile (true) {\n  Console.WriteLine(i);\n  if (i == 3) break;\n  i++;\n}', pts:20},
      {q:'Lee números (entradas: <code>5, 9, 2, -1</code>) hasta leer un negativo; al leerlo imprime <code>Fin</code>. NO imprimas los números.', hint:'while(true) { n = Parse(ReadLine()); if (n < 0) { WriteLine("Fin"); break; } }', stdin:['5','9','2','-1'], check:{lines:['Fin']}, solution:'while (true) {\n  int n = int.Parse(Console.ReadLine());\n  if (n < 0) {\n    Console.WriteLine("Fin");\n    break;\n  }\n}', pts:20},
      {q:'Suma los números pares del 1 al 10 (usa % o continue) e imprime el total: <code>30</code>.', hint:'2+4+6+8+10 = 30. if (i % 2 != 0) continue;', check:{lines:['30']}, solution:'int total = 0;\nfor (int i = 1; i <= 10; i++) {\n  if (i % 2 != 0) continue;\n  total += i;\n}\nConsole.WriteLine(total);', pts:20}
    ]}
  ]}
]});
