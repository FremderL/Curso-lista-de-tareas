/* Batería del mini-interpreter PYE (Curso 5 · Python) */
const PYE = require('/home/user/python_parts/py_engine.js');

let ok = 0, bad = 0; const fails = [];
function check(name, cond, extra){
  if(cond){ ok++; } else { bad++; fails.push(name + (extra ? ' → ' + extra : '')); }
}
function out(name, src, expected, opts){
  const r = PYE.run(src, opts||{});
  check(name, r.ok && r.output === expected + (expected.endsWith('\n')||expected==='' ? '' : '\n'),
    r.ok ? ('output=' + JSON.stringify(r.output)) : r.error);
  return r;
}
function outLines(name, src, lines, opts){
  const r = PYE.run(src, opts||{});
  const g = PYE.gradeOutput(lines, r.output);
  check(name, r.ok && g.ok, r.ok ? g.why + ' | output=' + JSON.stringify(r.output) : r.error);
  return r;
}
function err(name, src, kind, fragment, opts){
  const r = PYE.run(src, opts||{});
  check(name, !r.ok && r.error.includes(kind) && (!fragment || r.error.includes(fragment)),
    'error=' + (r.error || 'SIN ERROR (ok=true)'));
  return r;
}

/* ---------- 1. print y literales ---------- */
out('print simple', "print('hola mundo')", 'hola mundo');
out('print múltiples args', 'print(1, 2, 3)', '1 2 3');
out('print sep', "print(1, 2, sep='-')", '1-2');
out('print end', "print('a', end=''); print('b')", 'ab');
out('comentarios', '# nada\nprint(1) # tráiler', '1');
out('int', 'print(42)', '42');
out('negativo', 'print(-7)', '-7');
out('float entero → 5.0', 'print(5.0)', '5.0');
out('decimales', 'print(3.14)', '3.14');
out('True/False/None', "print(True, False, None)", 'True False None');
out('str comillas dobles', 'print("hola")', 'hola');
out('escape \\n', "print('a\\nb')", 'a\nb');

/* ---------- 2. aritmética con semántica Python ---------- */
out('división real → 5.0', 'print(10 / 2)', '5.0');
out('división decimal', 'print(7 / 2)', '3.5');
out('piso //', 'print(10 // 3)', '3');
out('piso // negativo', 'print(-7 // 2)', '-4');
out('módulo', 'print(10 % 3)', '1');
out('módulo negativo (signo de Python)', 'print(-7 % 2)', '1');
out('potencia', 'print(2 ** 10)', '1024');
out('potencia exp. negativo', 'print(2 ** -1)', '0.5');
out('precedencia', 'print(2 + 3 * 4)', '14');
out('paréntesis', 'print((2 + 3) * 4)', '20');
out('float+int', 'print(1.5 + 1)', '2.5');
out('0.1+0.2 igual que Python', 'print(0.1 + 0.2)', '0.30000000000000004');
out('str * int', "print('ab' * 3)", 'ababab');
out('concat', "print('a' + 'b' + 'c')", 'abc');

/* ---------- 3. variables, tipos, conversión ---------- */
out('variables', 'x = 5\ny = x + 2\nprint(y)', '7');
out('reasignar', 'x = 1\nx = x + 1\nprint(x)', '2');
out('augmented', 'x = 10\nx += 5\nx *= 2\nprint(x)', '30');
out('augmented //', 'x = 17\nx //= 5\nprint(x)', '3');
out('type()', "print(type(1), type(1.0), type('a'), type(True))", "<class 'int'> <class 'float'> <class 'str'> <class 'bool'>");
out('int(str)', "print(int('42') + 1)", '43');
out('int trunca float', 'print(int(3.9))', '3');
out('float(str)', "print(float('2.5') * 2)", '5.0');
out('str()', 'print(str(12) + "x")', '12x');
err('mensaje int ValueError', "int('abc')", 'ValueError', 'no pudo convertir');
out('bool()', "print(bool(0), bool(3), bool(''), bool('a'))", 'False True False True');
err('sumar str+int → TypeError', "x = 'a' + 1", 'TypeError', 'f-string');

/* ---------- 4. f-strings ---------- */
out('f-string básica', "n = 3\nprint(f'n={n}')", 'n=3');
out('f-string expr', 'a = 2\nb = 3\nprint(f"{a}x{b}={a*b}")', '2x3=6');
out('f-string :.2f', 'x = 10 / 3\nprint(f"{x:.2f}")', '3.33');
out('f-string literal con llaves', "print(f'{{literal}}')", '{literal}');
out('f-string anidada llamada', "print(f'total={round(2.567, 2)}')", 'total=2.57');
out('f-string ancho >', 'print(f"{5:>4}")', '   5');
err('f-string con error interno', 'print(f"{no_existe}")', 'NameError', 'no_existe');

/* ---------- 5. comparaciones y lógica ---------- */
out('comparaciones', 'print(3 > 2, 3 < 2, 3 == 3, 3 != 3)', 'True False True False');
out('>= <=', 'print(3 >= 3, 2 <= 1)', 'True False');
out('comparación encadenada', 'x = 5\nprint(0 < x < 10, 10 < x < 20)', 'True False');
out('and/or/not', 'print(True and False, True or False, not True)', 'False True False');
out('in str', "print('a' in 'gato', 'z' in 'gato')", 'True False');
out('is None', 'x = None\nprint(x is None, x is not None)', 'True False');
out('str cmp', "print('ana' < 'beto')", 'True');

/* ---------- 6. if/elif/else ---------- */
outLines('if/else', 'edad = 20\nif edad >= 18:\n    print("mayor")\nelse:\n    print("menor")', ['mayor']);
outLines('if/elif/else', 'n = 7\nif n > 10:\n    print("alto")\nelif n > 5:\n    print("medio")\nelse:\n    print("bajo")', ['medio']);
outLines('if sin else', 'if 1 > 2:\n    print("no")\nprint("fin")', ['fin']);
outLines('if anidado', 'x = 15\nif x > 10:\n    if x > 20:\n        print("muy alto")\n    else:\n        print("alto")', ['alto']);
outLines('suite en una línea', 'if 2 > 1: print("una línea")', ['una línea']);
err('IndentationError falta bloque', 'if 1 > 0:\nprint(1)', 'IndentationError', 'bloque indentado');

/* ---------- 7. while / for ---------- */
outLines('while acumulador', 'i = 1\ntotal = 0\nwhile i <= 10:\n    total += i\n    i += 1\nprint(total)', ['55']);
outLines('while break', 'i = 0\nwhile True:\n    i += 1\n    if i >= 3:\n        break\nprint(i)', ['3']);
outLines('continue', 'for i in range(5):\n    if i % 2 == 0:\n        continue\n    print(i)', ['1', '3']);
outLines('for range', 'for i in range(3):\n    print(i)', ['0', '1', '2']);
outLines('range(a,b)', 'for i in range(2, 5):\n    print(i)', ['2', '3', '4']);
outLines('range paso', 'for i in range(0, 10, 3):\n    print(i)', ['0', '3', '6', '9']);
outLines('range regresivo', 'for i in range(3, 0, -1):\n    print(i)', ['3', '2', '1']);
outLines('for str', "for c in 'hola':\n    print(c)", ['h', 'o', 'l', 'a']);
outLines('while-else (sin break)', 'i = 0\nwhile i < 2:\n    i += 1\nelse:\n    print("completo", i)', ['completo 2']);
err('while infinito → TimeoutError', 'while True:\n    x = 1', 'TimeoutError', 'ciclo infinito');
err('break fuera de ciclo', 'break', 'SyntaxError', 'ciclo');

/* ---------- 8. listas ---------- */
out('lista index', 'a = [10, 20, 30]\nprint(a[0], a[2], a[-1])', '10 30 30');
out('len lista', 'print(len([1, 2, 3]))', '3');
err('IndexError mensaje', 'a = [1, 2]\nprint(a[9])', 'IndexError', 'fuera de rango');
outLines('append/pop', 'a = [1, 2]\na.append(3)\nprint(a)\nx = a.pop()\nprint(x, a)', ['[1, 2, 3]', '3 [1, 2]']);
outLines('insert/remove', 'a = [1, 2, 3]\na.insert(1, 99)\nprint(a)\na.remove(2)\nprint(a)', ['[1, 99, 2, 3]', '[1, 99, 3]']);
outLines('sort/reverse', 'a = [3, 1, 2]\na.sort()\nprint(a)\na.reverse()\nprint(a)', ['[1, 2, 3]', '[3, 2, 1]']);
outLines('sort reverse=True', 'a = [3, 1, 2]\na.sort(reverse=True)\nprint(a)', ['[3, 2, 1]']);
out('slicing básico', 'a = [0,1,2,3,4,5]\nprint(a[1:3])', '[1, 2]');
out('slicing [:2] [2:]', 'a = [0,1,2,3,4]\nprint(a[:2], a[2:])', '[0, 1] [2, 3, 4]');
out('slicing paso', 'a = [0,1,2,3,4,5]\nprint(a[::2], a[::-1])', '[0, 2, 4] [5, 4, 3, 2, 1, 0]');
out('slicing negativos', 'a = [0,1,2,3,4]\nprint(a[-2:], a[:-1])', '[3, 4] [0, 1, 2, 3]');
out('slicing str', "print('programación'[0:3], 'hola'[::-1])", 'pro aloh');
out('lista + lista', 'print([1] + [2, 3])', '[1, 2, 3]');
out('lista * 2', 'print([1, 2] * 2)', '[1, 2, 1, 2]');
out('lista anidada', 'm = [[1, 2], [3, 4]]\nprint(m[1][0])', '3');
out('sum/min/max', 'print(sum([1,2,3]), min([4,2,9]), max([4,2,9]))', '6 2 9');
out('min/max str', "print(min('beto', 'ana'), max('beto', 'ana'))", 'ana beto');
out('sorted', 'print(sorted([3,1,2]), sorted([3,1,2], reverse=True))', '[1, 2, 3] [3, 2, 1]');
out('in lista', 'print(2 in [1,2,3], 9 in [1,2,3])', 'True False');
outLines('setIndex lista', 'a = [1, 2, 3]\na[1] = 99\nprint(a)', ['[1, 99, 3]']);
outLines('extend/count/index/copy', 'a = [1, 2]\na.extend([3])\nprint(a, a.count(1), a.index(3))\nb = a.copy()\nb.append(9)\nprint(a, b)', ['[1, 2, 3] 1 2', '[1, 2, 3] [1, 2, 3, 9]']);
err('remove inexistente → ValueError', '[1,2].remove(9)', 'ValueError', 'no está en la lista');
err('str inmutable → TypeError', "s = 'abc'\ns[0] = 'X'", 'TypeError', 'inmutables');

/* ---------- 9. diccionarios ---------- */
outLines('dict básico', 'd = {"a": 1, "b": 2}\nprint(d["a"])\nd["c"] = 3\nprint(d)\nd["a"] = 99\nprint(d)', ['1', "{'a': 1, 'b': 2, 'c': 3}", "{'a': 99, 'b': 2, 'c': 3}"]);
out('dict get', 'd = {"a": 1}\nprint(d.get("a"), d.get("z"), d.get("z", 0))', '1 None 0');
out('dict in', 'd = {"a": 1}\nprint("a" in d, "z" in d)', 'True False');
outLines('dict keys/values/items', 'd = {"a": 1, "b": 2}\nprint(len(d))\nprint(d.keys())\nprint(d.values())\nprint(d.items())', ['2', "['a', 'b']", '[1, 2]', "[('a', 1), ('b', 2)]"]);
outLines('for k,v in items', 'd = {"x": 1, "y": 2}\nfor k, v in d.items():\n    print(k, v)', ['x 1', 'y 2']);
err('KeyError mensaje', 'd = {"a": 1}\nprint(d["z"])', 'KeyError', "no existe");
outLines('dict pop', 'd = {"a": 1, "b": 2}\nv = d.pop("a")\nprint(v, d)\nprint(d.pop("z", 0))', ['1 {\'b\': 2}', '0']);
out('int/float misma clave dict', 'd = {1: "a"}\nd[1.0] = "b"\nprint(len(d), d[True])', '1 b');

/* ---------- 10. tuplas y desempaque ---------- */
outLines('swap', 'a = 1\nb = 2\na, b = b, a\nprint(a, b)', ['2 1']);
out('tupla', 't = (1, 2, 3)\nprint(t, t[1], len(t))', '(1, 2, 3) 2 3');
out('tupla 1 elemento', 't = (5,)\nprint(t)', '(5,)');
outLines('desempaque 3', 'x, y, z = 1, 2, 3\nprint(x + y + z)', ['6']);
outLines('desempaque en for', 'puntos = [(1, 2), (3, 4)]\nfor x, y in puntos:\n    print(x * y)', ['2', '12']);
err('desempaque mal → ValueError', 'a, b = [1, 2, 3]', 'ValueError', 'desempacar');

/* ---------- 11. funciones ---------- */
outLines('def/return', 'def suma(a, b):\n    return a + b\nprint(suma(3, 4))', ['7']);
outLines('return None implícito', 'def f():\n    pass\nprint(f())', ['None']);
outLines('default param', 'def saluda(nombre, saludo="Hola"):\n    return saludo + ", " + nombre\nprint(saluda("Ana"))\nprint(saluda("Luis", "Buenos días"))', ['Hola, Ana', 'Buenos días, Luis']);
outLines('kwargs por nombre', 'def area(base, altura=2):\n    return base * altura\nprint(area(3, 4), area(5), area(altura=3, base=4))', ['12 10 12']);
outLines('recursión factorial', 'def fact(n):\n    if n <= 1:\n        return 1\n    return n * fact(n - 1)\nprint(fact(5))', ['120']);
outLines('fibonacci', 'def fib(n):\n    if n < 2:\n        return n\n    return fib(n-1) + fib(n-2)\nprint(fib(10))', ['55']);
outLines('composición', 'def doble(x):\n    return 2 * x\ndef cuadrado(x):\n    return x * x\nprint(doble(cuadrado(3)))', ['18']);
err('return fuera de función', 'return 1', 'SyntaxError', 'return');
err('falta argumento', 'def f(a, b):\n    return a\nf(1)', 'TypeError', 'falta el argumento');
err('recursión infinita → RecursionError', 'def f(n):\n    return f(n+1)\nf(0)', 'RecursionError', 'recursión');

/* ---------- 12. métodos de cadenas ---------- */
out('upper/lower', "print('hola'.upper(), 'ADIOS'.lower())", 'HOLA adios');
out('title/capitalize', "print('hola mundo'.title(), 'hOLA'.capitalize())", 'Hola Mundo Hola');
out('strip', "print('   hola   '.strip() + '|')", 'hola|');
out('replace', "print('2025-03-15'.replace('-', '/'))", '2025/03/15');
out('replace con conteo', "print('aaa'.replace('a', 'b', 2))", 'bba');
out('split', "print('a,b,c'.split(','))", "['a', 'b', 'c']");
out('split sin sep', "print('  hola  mundo '.split())", "['hola', 'mundo']");
out('join', "print('-'.join(['a', 'b', 'c']))", 'a-b-c');
out('startswith/endswith', "print('hola.py'.startswith('ho'), 'hola.py'.endswith('.py'))", 'True True');
out('find/count', "print('banana'.find('na'), 'banana'.count('an'))", '2 2');
out('isdigit/isalpha', "print('123'.isdigit(), 'abc'.isalpha(), 'a1'.isdigit())", 'True True False');
out('cadena indexada', "print('hola'[0], 'hola'[-1], len('hola'))", 'h a 4');
outLines('input().strip() encadenado', "nombre = input().strip().upper()\nprint('¡HOLA', nombre + '!')", ['¡HOLA ANA!'], {stdin: ['  ana ']});

/* ---------- 13. input() ---------- */
outLines('input simple', "nombre = input()\nprint('Hola,', nombre)", ['Hola, Ana'], {stdin: ['Ana']});
outLines('input con prompt', "edad = input('Edad: ')\nprint(edad)", ['Edad: 33'], {stdin: ['33']});
outLines('dos inputs', "a = input()\nb = input()\nprint(int(a) + int(b))", ['30'], {stdin: ['10', '20']});
err('input sin datos → EOFError', 'x = input()', 'EOFError', 'líneas de entrada');
err('int(input inválido)', "n = int(input())\nprint(n)", 'ValueError', 'int() no pudo convertir', {stdin:['abc']});
/* ---------- 14. try/except ---------- */
outLines('try/except ValueError', "try:\n    n = int('abc')\n    print('no llega')\nexcept ValueError:\n    print('atrapado')", ['atrapado']);
outLines('try sin error', 'try:\n    print("ok")\nexcept ValueError:\n    print("no")', ['ok']);
outLines('except múltiple', "try:\n    x = 1 / 0\nexcept (ValueError, ZeroDivisionError):\n    print('división o valor')", ['división o valor']);
outLines('bare except', "try:\n    x = [1][5]\nexcept:\n    print('cualquier error')", ['cualquier error']);
outLines('finally', "try:\n    print('adentro')\nfinally:\n    print('siempre')", ['adentro', 'siempre']);
outLines('finally con excepción no atrapada', "try:\n    try:\n        x = 1/0\n    finally:\n        print('limpieza')\nexcept ZeroDivisionError:\n    print('atrapado afuera')", ['limpieza', 'atrapado afuera']);
outLines('as e', "try:\n    int('xyz')\nexcept ValueError as e:\n    print('Error capturado')", ['Error capturado']);
outLines('error no atrapado sigue', 'try:\n    print(1)\nexcept ValueError:\n    print("no")\nprint(2)', ['1', '2']);

/* ---------- 15. módulos ---------- */
outLines('math.sqrt/pi/floor', 'import math\nprint(math.sqrt(16))\nprint(math.pi)\nprint(math.floor(3.7))\nprint(math.ceil(3.2))', ['4.0', '3.141592653589793', '3', '4']);
outLines('from math import', 'from math import sqrt, pi\nprint(sqrt(9), round(pi, 2))', ['3.0 3.14']);
out('math.factorial', 'import math\nprint(math.factorial(5))', '120');
outLines('random determinista', 'import random\nrandom.seed(1)\na = random.randint(1, 10)\nrandom.seed(1)\nb = random.randint(1, 10)\nprint(a == b, a)', ['True 7']);
outLines('random.choice', "import random\nrandom.seed(7)\nprint(random.choice(['a', 'b', 'c']))", ['a']);
outLines('random.shuffle', 'import random\nrandom.seed(3)\na = [1, 2, 3, 4, 5]\nrandom.shuffle(a)\nprint(a)', ['[3, 5, 2, 1, 4]']);
err('módulo no disponible', 'import os', 'ImportError', 'no está disponible');

/* ---------- 16. round y misceláneos ---------- */
out('round banker 2.5→2', 'print(round(2.5))', '2');
out('round banker 3.5→4', 'print(round(3.5))', '4');
out('round 2 decimales', 'print(round(2.567, 2))', '2.57');
out('round int con nd', 'print(round(5, 2))', '5');
out('abs', 'print(abs(-5), abs(-2.5))', '5 2.5');
out('enumerate', 'for i, c in enumerate("ab"):\n    print(i, c)', '0 a\n1 b');
out('enumerate inicio', 'for i, c in enumerate(["x"], 1):\n    print(i, c)', '1 x');
out('zip', 'for a, b in zip([1, 2, 3], ["a", "b"]):\n    print(a, b)', '1 a\n2 b');
out('paso a paso límites de rangos grandes no explotan', 'print(sum(range(101)))', '5050');
out('isinstance', 'print(isinstance(1, int), isinstance(1.0, int), isinstance("a", str))', 'True False True');
out('repr escapes', "print(repr(\"a'b\"))", '\'a\\\'b\'');
out('punto y coma', 'x = 1; y = 2; print(x + y)', '3');
out('multi-línea con paréntesis', 'a = (1 +\n     2)\nprint(a)', '3');
out('lista multi-línea', 'a = [\n  1,\n  2,\n]\nprint(a)', '[1, 2]');

/* ---------- 17. errores en español con línea ---------- */
err('NameError con línea', 'x = 1\nprint(y)', 'NameError', 'Línea 2');
err('sintaxis cerca de', 'x = (1 +', 'SyntaxError', 'cerrar');
err('tabulador', 'if 1:\n\tprint(1)', 'IndentationError', 'espacios');
err('soporte didáctico class', 'class A:\n    pass', 'SyntaxError', 'no está soportado');
err('AttributeError método', "'a'.noexiste()", 'AttributeError', 'no tiene ningún método');

/* ---------- 18. gradeOutput ---------- */
{
  const g1 = PYE.gradeOutput(['Hola', '3'], 'Hola\n3');
  check('gradeOutput ok', g1.ok);
  const g2 = PYE.gradeOutput(['Hola', '3'], 'Hola\n4');
  check('gradeOutput diff', !g2.ok && g2.why.includes('línea 2') && g2.why.includes('«3»') && g2.why.includes('«4»'), g2.why);
  const g3 = PYE.gradeOutput(['a', 'b'], 'a');
  check('gradeOutput conteo', !g3.ok && g3.why.includes('1 línea'), g3.why);
  const g4 = PYE.gradeOutput(['a'], 'a  \n');
  check('gradeOutput tolera espacios finales y línea vacía', g4.ok, g4.why);
  const r = PYE.run('total = 7\nnombre = "Ana"', { wantVars: ['total', 'nombre'] });
  check('wantVars', r.ok && r.vars.total === 7 && r.vars.nombre === 'Ana', JSON.stringify(r.vars));
}

/* ---------- 19. programa integrador estilo proyecto final ---------- */
{
  const src = `
inventario = [
    {"nombre": "Cien años de soledad", "precio": 320.5, "stock": 4},
    {"nombre": "El Aleph", "precio": 210, "stock": 0},
    {"nombre": "Rayuela", "precio": 340, "stock": 2},
]
def con_stock(lista):
    total = 0
    for lib in lista:
        if lib["stock"] > 0:
            total += 1
    return total
def valor_inventario(lista):
    acc = 0
    for lib in lista:
        acc += lib["precio"] * lib["stock"]
    return round(acc, 2)
print("Disponibles:", con_stock(inventario))
print(f"Valor del inventario: {valor_inventario(inventario):.2f}")
for lib in inventario:
    if lib["stock"] == 0:
        estado = "AGOTADO"
    else:
        estado = "OK"
    print(f"{lib['nombre']:<22} {estado}")
`;
  const r = PYE.run(src, {});
  const g = PYE.gradeOutput([
    'Disponibles: 2',
    'Valor del inventario: 1962.00',
    'Cien años de soledad   OK',
    'El Aleph               AGOTADO',
    'Rayuela                OK'
  ], r.output);
  check('programa integrador (inventario)', r.ok && g.ok, r.ok ? g.why + ' | ' + JSON.stringify(r.output) : r.error);
}
{
  /* comprensión de listas NO soportada → mensaje claro */
  const r = PYE.run('x = [i for i in range(3)]', {});
  check('comprensión de listas → mensaje claro (no crash interno)', !r.ok && /Sintaxis|no se esperaba|for/i.test(r.error), r.error || 'ok inesperado');
}

console.log('\n=== PYE: ' + ok + ' OK · ' + bad + ' FALLO ===');
fails.forEach(f => console.log('  ✗ ' + f));
process.exit(bad ? 1 : 0);
