/* Batería del motor UCS (C# para Unity) — Curso 7 */
const UCS = require('/home/user/unity_parts/ucs_engine.js');

let pass = 0, fail = 0;
function ok(cond, msg){ if(cond){ pass++; } else { fail++; console.log('  ✗ ' + msg); } }
function run(src, opts){ return UCS.run(src, opts); }
function out(src, opts){ return run(src, opts); }

/* ---------- 1. Salida básica ---------- */
(() => {
  let r = run('Console.WriteLine("Hola, Unity!");');
  ok(r.ok && r.output === 'Hola, Unity!\n', 'WriteLine básico');
  r = run('using System;\nusing UnityEngine;\nConsole.WriteLine("con usings");');
  ok(r.ok && r.output === 'con usings\n', 'using se ignora');
  r = run('Debug.Log("por Debug");');
  ok(r.ok && r.output === 'por Debug\n', 'Debug.Log como WriteLine');
  r = run('Console.Write("sin salto");\nConsole.Write("!");\nConsole.WriteLine("");');
  ok(r.ok && r.output === 'sin salto!\n', 'Write acumula sin salto de línea');
  r = run('Console.WriteLine();');
  ok(r.ok && r.output === '\n', 'WriteLine vacío imprime línea en blanco');
  r = run('// comentario\nConsole.WriteLine(1); /* bloque\nmultilínea */ Console.WriteLine(2);');
  ok(r.ok && r.output === '1\n2\n', 'comentarios de línea y bloque');
  r = run('var nombre = "Esperanza";\nConsole.WriteLine(nombre);');
  ok(r.ok && r.output === 'Esperanza\n', 'var infiere string');
})();

/* ---------- 2. Tipos y declaraciones ---------- */
(() => {
  let r = run('int a = 10, b = 4;\nConsole.WriteLine(a + b);');
  ok(r.ok && r.output === '14\n', 'declaración múltiple en una línea');
  r = run('float x = 2.5f;\nConsole.WriteLine(x);', {wantVars:['x']});
  ok(r.ok && r.vars.x === 2.5, 'literal float con f');
  r = run('bool vivo = true;\nConsole.WriteLine(vivo);');
  ok(r.ok && r.output === 'True\n', 'bool se imprime True (¡mayúscula!)');
  r = run('bool muerto = false;\nConsole.WriteLine(muerto);');
  ok(r.ok && r.output === 'False\n', 'false se imprime False');
  r = run('double d = 1.5;\nConsole.WriteLine(d);');
  ok(r.ok && r.output === '1.5\n', 'double se acepta como float');
  r = run('int vida;\nvida = 100;\nConsole.WriteLine(vida);');
  ok(r.ok && r.output === '100\n', 'declarar y asignar después');
  r = run('int oro = 50;\noro += 25;\noro -= 10;\noro *= 2;\nConsole.WriteLine(oro);');
  ok(r.ok && r.output === '130\n', 'asignación compuesta');
  r = run('int n = 5;\nn++;\nConsole.WriteLine(n);\nn--;\nConsole.WriteLine(n);');
  ok(r.ok && r.output === '6\n5\n', '++ y --');
  r = run('int i = 0;\nConsole.WriteLine(i++);\nConsole.WriteLine(i);');
  ok(r.ok && r.output === '0\n1\n', 'postfix ++ devuelve el valor previo');
  r = run('Console.WriteLine(0.1 + 0.2);');
  ok(r.ok && r.output === '0.3\n', 'flotantes se limpian (0.1+0.2 → 0.3)');
  r = run('Console.WriteLine(5);\nConsole.WriteLine(5.0f);');
  ok(r.ok && r.output === '5\n5\n', 'en C# el float 5f imprime «5»');
})();

/* ---------- 3. Aritmética C# ---------- */
(() => {
  let r = run('Console.WriteLine(10 / 4);');
  ok(r.ok && r.output === '2\n', 'int/int trunca: 10/4 → 2');
  r = run('Console.WriteLine(-7 / 2);');
  ok(r.ok && r.output === '-3\n', '-7/2 trunca hacia cero → -3');
  r = run('Console.WriteLine(7 % 3);\nConsole.WriteLine(-7 % 3);');
  ok(r.ok && r.output === '1\n-1\n', '% con signo del dividendo');
  r = run('Console.WriteLine(10 / 4.0f);');
  ok(r.ok && r.output === '2.5\n', 'con un float la división es real');
  r = run('Console.WriteLine(2 + 3 * 4);');
  ok(r.ok && r.output === '14\n', 'precedencia');
  r = run('Console.WriteLine((2 + 3) * 4);');
  ok(r.ok && r.output === '20\n', 'paréntesis');
  r = run('int x = 5;\nConsole.WriteLine(-x);');
  ok(r.ok && r.output === '-5\n', 'menos unario');
  r = run('int a = 1;\nint c = a / 0;');
  ok(!r.ok && r.error.includes('DivideByZeroException'), 'división entera entre cero → excepción');
  r = run('int a = 5;\nint c = a % 0;');
  ok(!r.ok && r.error.includes('DivideByZeroException'), 'módulo entero entre cero → excepción');
  r = run('int x = (int)3.9;\nConsole.WriteLine(x);');
  ok(r.ok && r.output === '3\n', 'cast (int) trunca hacia cero');
  r = run('int x = (int)-3.9;\nConsole.WriteLine(x);');
  ok(r.ok && r.output === '-3\n', 'cast (int) de negativo → -3');
  r = run('float f = (float)7;\nConsole.WriteLine(f);');
  ok(r.ok && r.output === '7\n', 'cast (float) de int');
  r = run('string s = 5 + " monedas";\nConsole.WriteLine(s);');
  ok(r.ok && r.output === '5 monedas\n', 'concatenación número+string');
})();

/* ---------- 4. Comparaciones y lógica ---------- */
(() => {
  let r = run('Console.WriteLine(10 > 3);\nConsole.WriteLine(2 == 2);\nConsole.WriteLine(2 != 2);\nConsole.WriteLine("oro" == "oro");');
  ok(r.ok && r.output === 'True\nTrue\nFalse\nTrue\n', 'comparaciones y == de strings por valor');
  r = run('int vida = 50;\nConsole.WriteLine(vida >= 50 && vida < 100);');
  ok(r.ok && r.output === 'True\n', 'AND');
  r = run('Console.WriteLine(false || true);');
  ok(r.ok && r.output === 'True\n', 'OR');
  r = run('Console.WriteLine(!true);');
  ok(r.ok && r.output === 'False\n', 'NOT');
  r = run('int n = 0;\nif (n != 0 && 10 / n > 1) Console.WriteLine("x");\nConsole.WriteLine("corto-circuito salió");');
  ok(r.ok && r.output === 'corto-circuito salió\n', '&& cortocircuito evita división entre cero');
  r = run('Console.WriteLine(5 > 3 ? "sí" : "no");');
  ok(r.ok && r.output === 'sí\n', 'ternario');
})();

/* ---------- 5. Strings e interpolación ---------- */
(() => {
  let r = run('string nombre = "esperanza";\nConsole.WriteLine(nombre.ToUpper());\nConsole.WriteLine(nombre.Length);');
  ok(r.ok && r.output === 'ESPERANZA\n9\n', 'ToUpper y Length');
  r = run('string s = "Hola Mundo";\nConsole.WriteLine(s.Substring(0, 4));\nConsole.WriteLine(s.Contains("Mundo"));\nConsole.WriteLine(s.Replace("Mundo", "Unity"));');
  ok(r.ok && r.output === 'Hola\nTrue\nHola Unity\n', 'Substring/Contains/Replace');
  r = run('string s = "a,b,c";\nstring[] partes = s.Split(",");\nConsole.WriteLine(partes[1]);\nConsole.WriteLine(partes.Length);');
  ok(r.ok && r.output === 'b\n3\n', 'Split devuelve array');
  r = run('int oro = 25;\nfloat precio = 3.5f;\nConsole.WriteLine($"Tienes {oro} monedas y cuesta {precio:F2}");');
  ok(r.ok && r.output === 'Tienes 25 monedas y cuesta 3.50\n', 'interpolación con formato F2');
  r = run('Console.WriteLine($"{"a"}{"b"}");');
  ok(r.ok && r.output === 'ab\n', 'interpolación con literales');
  r = run('string nombre = "Ada";\nConsole.WriteLine($"¡Hola, {nombre}!");');
  ok(r.ok && r.output === '¡Hola, Ada!\n', 'interpolación básica');
  r = run('double v = 1234.5;\nConsole.WriteLine($"{v:F0} y {v:F1}");');
  ok(r.ok && r.output === '1235 y 1234.5\n', 'formatos F0 y F1 (midpoint se aleja de cero)');
  r = run('string s = "Unity";\nConsole.WriteLine(s[0]);');
  ok(r.ok && r.output === 'U\n', 'indexar string da un carácter');
  r = run('int contador = 0;\nforeach (char c in "hola") contador++;\nConsole.WriteLine(contador);');
  ok(r.ok && r.output === '4\n', 'foreach sobre string cuenta caracteres');
})();

/* ---------- 6. Control de flujo ---------- */
(() => {
  let r = run('int n = 7;\nif (n > 10) Console.WriteLine("alto");\nelse if (n > 5) Console.WriteLine("medio");\nelse Console.WriteLine("bajo");');
  ok(r.ok && r.output === 'medio\n', 'if / else if / else');
  r = run('int i = 0;\nwhile (i < 3) { Console.WriteLine(i); i++; }');
  ok(r.ok && r.output === '0\n1\n2\n', 'while con bloque');
  r = run('int i = 10;\ndo { Console.WriteLine(i); i++; } while (i < 3);');
  ok(r.ok && r.output === '10\n', 'do-while corre al menos una vez');
  r = run('for (int i = 1; i <= 3; i++) Console.WriteLine(i);');
  ok(r.ok && r.output === '1\n2\n3\n', 'for clásico');
  r = run('for (int i = 0; i < 5; i++) { if (i == 2) continue; if (i == 4) break; Console.WriteLine(i); }');
  ok(r.ok && r.output === '0\n1\n3\n', 'break y continue');
  r = run('int total = 0;\nfor (int i = 1; i <= 10; i++) total += i;\nConsole.WriteLine(total);');
  ok(r.ok && r.output === '55\n', 'acumulador en for');
  r = run('int i = 0;\nwhile (true) { i++; if (i >= 3) break; }\nConsole.WriteLine(i);');
  ok(r.ok && r.output === '3\n', 'while(true) con break');
  r = run('while (true) Console.WriteLine("infinito");');
  ok(!r.ok && r.error.includes('tardó demasiado'), 'while infinito detectado');
})();

/* ---------- 7. Arrays y List ---------- */
(() => {
  let r = run('int[] puntajes = new int[]{10, 20, 30};\nConsole.WriteLine(puntajes.Length);\nConsole.WriteLine(puntajes[2]);\npuntajes[0] = 99;\nConsole.WriteLine(puntajes[0]);');
  ok(r.ok && r.output === '3\n30\n99\n', 'array literal: Length, lectura, escritura');
  r = run('int[] ceros = new int[3];\nConsole.WriteLine(ceros[1]);\nConsole.WriteLine(ceros.Length);');
  ok(r.ok && r.output === '0\n3\n', 'new int[n] llena de ceros');
  r = run('int[] a = new int[2];\nConsole.WriteLine(a[5]);');
  ok(!r.ok && r.error.includes('IndexOutOfRangeException'), 'índice fuera de rango → excepción real');
  r = run('string[] inventario = {"espada", "pocion"};\nforeach (string it in inventario) Console.WriteLine(it);');
  ok(r.ok && r.output === 'espada\npocion\n', 'array literal corto y foreach');
  r = run('var lista = new List<int>();\nlista.Add(5);\nlista.Add(7);\nConsole.WriteLine(lista.Count);\nConsole.WriteLine(lista[0]);\nlista[1] = 9;\nConsole.WriteLine(lista[1]);');
  ok(r.ok && r.output === '2\n5\n9\n', 'List: Add, Count, indexar');
  r = run('var l = new List<string>();\nl.Add("a"); l.Add("b"); l.Add("a");\nConsole.WriteLine(l.Contains("b"));\nConsole.WriteLine(l.Remove("a"));\nConsole.WriteLine(l.Count);\nl.RemoveAt(0);\nConsole.WriteLine(l.Count);');
  ok(r.ok && r.output === 'True\nTrue\n2\n1\n', 'List: Contains/Remove/RemoveAt');
  r = run('int suma = 0;\nvar nums = new List<int>();\nnums.Add(3); nums.Add(1); nums.Add(2);\nforeach (int n in nums) suma += n;\nConsole.WriteLine(suma);\nConsole.WriteLine(nums.Count);');
  ok(r.ok && r.output === '6\n3\n', 'acumulador con foreach sobre List');
})();

/* ---------- 8. Entrada por teclado ---------- */
(() => {
  let r = run('string nombre = Console.ReadLine();\nConsole.WriteLine($"Hola, {nombre}!");', {stdin:['Esperanza']});
  ok(r.ok && r.output === 'Hola, Esperanza!\n', 'ReadLine');
  r = run('int n = int.Parse(Console.ReadLine());\nConsole.WriteLine(n * 2);', {stdin:['21']});
  ok(r.ok && r.output === '42\n', 'int.Parse de ReadLine');
  r = run('int n = int.Parse("abc");');
  ok(!r.ok && r.error.includes('FormatException'), 'int.Parse inválido → FormatException');
  r = run('float f = float.Parse("3.5");\nConsole.WriteLine(f + 1);');
  ok(r.ok && r.output === '4.5\n', 'float.Parse');
  r = run('int n = Convert.ToInt32("42");\nConsole.WriteLine(n + 1);');
  ok(r.ok && r.output === '43\n', 'Convert.ToInt32');
  r = run('Console.ReadLine();\nConsole.ReadLine();', {});
  ok(!r.ok && r.error.includes('ReadLine'), 'ReadLine sin entradas → error claro');
})();

/* ---------- 9. Métodos ---------- */
(() => {
  let r = run('static int Sumar(int a, int b) { return a + b; }\nConsole.WriteLine(Sumar(2, 3));');
  ok(r.ok && r.output === '5\n', 'método static con return');
  r = run('void Saludar(string quien) { Console.WriteLine($"Hola, {quien}"); }\nSaludar("Ada");');
  ok(r.ok && r.output === 'Hola, Ada\n', 'método void (sin static)');
  r = run('int Doble(int x) { return x * 2; }\nint Cuadrado(int x) { return Doble(x) * Doble(x) / 4; }\nConsole.WriteLine(Cuadrado(6));');
  ok(r.ok && r.output === '36\n', 'métodos que llaman métodos');
  r = run('int Factorial(int n) { if (n <= 1) return 1; return n * Factorial(n - 1); }\nConsole.WriteLine(Factorial(6));');
  ok(r.ok && r.output === '720\n', 'recursión: factorial');
  r = run('int Fact(int n) { return n <= 1 ? 1 : n * Fact(n - 1); }\nConsole.WriteLine(Fact(0));\nConsole.WriteLine(Fact(5));');
  ok(r.ok && r.output === '1\n120\n', 'recursión con ternario y caso base 0');
  r = run('int Fact(int n) { return Fact(n); }\nFact(3);');
  ok(!r.ok && r.error.includes('StackOverflow'), 'recursión infinita → StackOverflow');
  r = run('int Potencia(int b, int e = 2) { int r = 1; for (int i = 0; i < e; i++) r *= b; return r; }\nConsole.WriteLine(Potencia(3));\nConsole.WriteLine(Potencia(3, 3));');
  ok(r.ok && r.output === '9\n27\n', 'parámetro con valor default');
  r = run('int x = 1;\nvoid Cambia() { x = 99; }\nCambia();\nConsole.WriteLine(x);');
  ok(r.ok && r.output === '99\n', 'el método ve y cambia variables globales');
  r = run('Sumar(1, 2);');
  ok(!r.ok && r.error.includes('CS0103'), 'llamar método inexistente → CS0103');
})();

/* ---------- 10. Clases ---------- */
(() => {
  let r = run('class Slime {\n  public int Vida;\n  public string Nombre;\n}\nvar s = new Slime();\ns.Vida = 30;\ns.Nombre = "Burbuja";\nConsole.WriteLine(s.Vida);\nConsole.WriteLine(s.Nombre);');
  ok(r.ok && r.output === '30\nBurbuja\n', 'clase con campos, new y acceso con punto');
  r = run('class Slime {\n  public int Vida;\n  public Slime(int v) { Vida = v; }\n}\nvar a = new Slime(30);\nvar b = new Slime(50);\nb.Vida -= 20;\nConsole.WriteLine(a.Vida);\nConsole.WriteLine(b.Vida);');
  ok(r.ok && r.output === '30\n30\n', 'constructor + instancias independientes');
  r = run('class Heroe {\n  public int Vida;\n  public Heroe(int v) { Vida = v; }\n  public void Golpear(int d) { Vida -= d; }\n  public bool Vivo() { return Vida > 0; }\n}\nvar h = new Heroe(50);\nh.Golpear(30);\nh.Golpear(30);\nConsole.WriteLine(h.Vida);\nConsole.WriteLine(h.Vivo());');
  ok(r.ok && r.output === '-10\nFalse\n', 'métodos de instancia que mutan y devuelven');
  r = run('class Slime { public int Vida; }\nvar s = new Slime(5);');
  ok(!r.ok && r.error.includes('CS1729'), 'new sin ctor que tome args → CS1729');
  r = run('class Slime {\n  public int Vida = 10;\n  public string Nombre = "slime";\n}\nvar s = new Slime();\nConsole.WriteLine(s.Vida);\nConsole.WriteLine(s.Nombre);');
  ok(r.ok && r.output === '10\nslime\n', 'campos con valor inicial');
  r = run('class Mochila {\n  public List<string> Items = new List<string>();\n  public void Guardar(string it) { Items.Add(it); }\n}\nvar m = new Mochila();\nm.Guardar("pocion");\nm.Guardar("llave");\nConsole.WriteLine(m.Items.Count);\nforeach (string it in m.Items) Console.WriteLine(it);');
  ok(r.ok && r.output === '2\npocion\nllave\n', 'campo List + método que muta la colección');
  r = run('class A { public int X; }\nvar a = new A();\nConsole.WriteLine(a.Y);');
  ok(!r.ok && r.error.includes('CS1061'), 'campo inexistente → CS1061');
})();

/* ---------- 11. Vector3 y Mathf ---------- */
(() => {
  let r = run('var v = new Vector3(1, 0, -2);\nConsole.WriteLine(v);\nConsole.WriteLine(v.x);\nConsole.WriteLine(v.z);');
  ok(r.ok && r.output === '(1.0, 0.0, -2.0)\n1\n-2\n', 'Vector3: ToString de Unity y componentes');
  r = run('var a = new Vector3(1, 2, 3);\nvar b = new Vector3(1, 1, 1);\nvar c = a + b;\nConsole.WriteLine(c);\nConsole.WriteLine(a - b);\nConsole.WriteLine(a * 2);');
  ok(r.ok && r.output === '(2.0, 3.0, 4.0)\n(0.0, 1.0, 2.0)\n(2.0, 4.0, 6.0)\n', 'Vector3: suma, resta, escala');
  r = run('var v = new Vector3(3, 4, 0);\nConsole.WriteLine(v.magnitude);');
  ok(r.ok && r.output === '5\n', 'magnitude = 5 (pitágoras)');
  r = run('Console.WriteLine(Vector3.Up);\nConsole.WriteLine(Vector3.Zero);');
  ok(r.ok && r.output === '(0.0, 1.0, 0.0)\n(0.0, 0.0, 0.0)\n', 'Vector3.Up y Zero');
  r = run('var p = new Vector3(0, 0, 0);\nvar q = new Vector3(3, 0, 4);\nConsole.WriteLine(Vector3.Distance(p, q));');
  ok(r.ok && r.output === '5\n', 'Vector3.Distance');
  r = run('Console.WriteLine(Mathf.Floor(3.7f));\nConsole.WriteLine(Mathf.Ceil(3.2f));\nConsole.WriteLine(Mathf.Abs(-5));\nConsole.WriteLine(Mathf.Max(2, 9));\nConsole.WriteLine(Mathf.Sqrt(16f));\nConsole.WriteLine(Mathf.Pow(2, 5));');
  ok(r.ok && r.output === '3\n4\n5\n9\n4\n32\n', 'Mathf: Floor/Ceil/Abs/Max/Sqrt/Pow');
  r = run('Console.WriteLine(Mathf.Round(2.5f));\nConsole.WriteLine(Math.Round(2.5));');
  ok(r.ok && r.output === '3\n2\n', 'Mathf.Round aleja de cero; Math.Round bancario (al par)');
  r = run('Console.WriteLine(Mathf.Clamp(150, 0, 100));\nConsole.WriteLine(Mathf.CeilToInt(2.1f));');
  ok(r.ok && r.output === '100\n3\n', 'Clamp y CeilToInt');
})();

/* ---------- 12. Random de Unity ---------- */
(() => {
  let r = run('Random.InitState(1);\nConsole.WriteLine(Random.Range(1, 10));\nConsole.WriteLine(Random.Range(1, 10));\nConsole.WriteLine(Random.Range(1, 10));', {});
  ok(r.ok && r.output === '7\n1\n6\n', 'Random.Range con semilla 1 → canónico 7,1,6');
  r = run('Random.InitState(7);\nConsole.WriteLine(Random.Range(1, 4));\nConsole.WriteLine(Random.Range(1, 4));\nConsole.WriteLine(Random.Range(1, 4));');
  ok(r.ok && r.output === '1\n1\n4\n', 'semilla 7 → 1,1,4 (rango INCLUSIVO)');
  r = run('Random.InitState(3);\nConsole.WriteLine(Random.Range(0, 5));\nConsole.WriteLine(Random.Range(0, 5));\nConsole.WriteLine(Random.Range(0, 5));');
  ok(r.ok && r.output === '4\n0\n2\n', 'semilla 3 → 4,0,2');
  r = run('Random.InitState(1);\nConsole.WriteLine(Random.value);');
  ok(r.ok && r.output === '0.627073940588\n', 'Random.value canónico con semilla 1');
  r = run('Random.InitState(2);\nint caras = 0;\nfor (int i = 0; i < 3; i++) { if (Random.Range(1, 6) == 6) caras++; }', {wantVars:['caras']});
  ok(r.ok && r.vars.caras === 0, 'semilla 2: de 5,2,2 → ninguna cara 6');
  r = run('Random.InitState(5);\nfloat f = Random.Range(0.5f, 2.5f);\nConsole.WriteLine(f > 0.5f && f <= 2.5f);');
  ok(r.ok && r.output === 'True\n', 'Range con floats → rango continuo');
})();

/* ---------- 13. try/catch y errores ---------- */
(() => {
  let r = run('try { int x = int.Parse("x"); Console.WriteLine("nunca"); } catch (FormatException e) { Console.WriteLine("atrapado: " + e.Message); } finally { Console.WriteLine("finally"); }');
  ok(r.ok && r.output === 'atrapado: la cadena «x» no tiene el formato correcto para int\nfinally\n', 'try/catch/finally completo');
  r = run('try { int[] a = new int[2]; a[5] = 1; } catch (IndexOutOfRangeException e) { Console.WriteLine("fuera de rango"); }');
  ok(r.ok && r.output === 'fuera de rango\n', 'catch de IndexOutOfRange');
  r = run('try { throw new Exception("boom"); } catch (Exception e) { Console.WriteLine(e.Message); }');
  ok(r.ok && r.output === 'boom\n', 'throw manual atrapado');
  r = run('try { int x = int.Parse("x"); } catch { Console.WriteLine("genérico"); }');
  ok(r.ok && r.output === 'genérico\n', 'catch genérico sin tipo');
  r = run('try { int x = 1; } finally { Console.WriteLine("pasa igual"); }');
  ok(r.ok && r.output === 'pasa igual\n', 'finally sin excepción');
  r = run('int x = 1;\nint y = x / 0;');
  ok(!r.ok && r.error.includes('Línea 2'), 'el error dice la línea');
  r = run('Console.WriteLine(vida);');
  ok(!r.ok && r.error.includes('CS0103') && r.error.includes('vida'), 'CS0103 con el nombre exacto');
  r = run('int x = 5');
  ok(!r.ok && r.error.includes('CS1002'), 'falta ; → CS1002');
  r = run('class Slime { public int Vida = ; }');
  ok(!r.ok && r.error.includes('CS1525'), 'expresión rota → CS1525');
  r = run('string s = null;\nConsole.WriteLine(s.Length);');
  ok(!r.ok && r.error.includes('NullReferenceException'), 'null.Length → NullReferenceException');
})();

/* ---------- 14. gradeOutput ---------- */
(() => {
  ok(UCS.gradeOutput(['a','b'], 'a\nb').ok === true, 'gradeOutput idéntico');
  let g = UCS.gradeOutput(['1','2'], '1\n3');
  ok(!g.ok && g.why.includes('línea 2') && g.why.includes('«2»'), 'diff señala línea: ' + g.why);
  g = UCS.gradeOutput(['a'], 'a\nb');
  ok(!g.ok && g.why.includes('de más'), 'detecta líneas de más');
  g = UCS.gradeOutput(['a','b'], 'a');
  ok(!g.ok && g.why.includes('faltaron líneas'), 'detecta líneas faltantes');
  g = UCS.gradeOutput(['Hola'], ' Hola', {trim:true});
  ok(g.ok === true, 'trim tolera espacios');
})();

/* ---------- 15. Proyecto integrador (mini batalla) ---------- */
(() => {
  const src = `
class Slime {
  public int Vida;
  public string Nombre;
  public Slime(string nombre, int vida) { Nombre = nombre; Vida = vida; }
  public bool Vivo() { return Vida > 0; }
}
class Heroe {
  public int Vida = 30;
  public int Danio() { return Random.Range(4, 8); }
}
Random.InitState(2);
var heroe = new Heroe();
var slimes = new List<Slime>();
slimes.Add(new Slime("Burbuja", 10));
slimes.Add(new Slime("Viscoso", 12));
int ronda = 0;
foreach (Slime s in slimes) {
  ronda++;
  while (s.Vivo()) {
    int d = heroe.Danio();
    s.Vida -= d;
    Console.WriteLine($"Ronda {ronda}: {heroe.Danio()*0 + 0} {s.Nombre} recibe {d}, vida del slime: {s.Vida}");
  }
}
Console.WriteLine($"Batalla terminada en {ronda} rondas. Vida del héroe: {heroe.Vida}");`;
  let r = run(src, {wantVars:['ronda']});
  ok(r.ok, 'batalla integrada corre: ' + (r.ok ? '' : r.error));
  if(r.ok){
    ok(r.vars.ronda === 2, 'dos slimes → 2 rondas');
    ok(r.output.includes('Batalla terminada en 2 rondas'), 'línea final del log');
    ok(r.output.split('\n').length >= 5, 'log de batalla con varias líneas');
  }
})();

/* ---------- 16. vars snapshot ---------- */
(() => {
  let r = run('int oro = 55;\nfloat vida = 3.5f;\nstring nom = "Ada";', {wantVars:['oro','vida','nom','noexiste']});
  ok(r.ok && r.vars.oro === 55 && r.vars.vida === 3.5 && r.vars.nom === 'Ada' && !('noexiste' in r.vars), 'wantVars captura solo lo pedido');
})();

console.log('\n=== UCS: ' + pass + ' OK · ' + fail + ' FALLO ===');
process.exit(fail ? 1 : 0);
