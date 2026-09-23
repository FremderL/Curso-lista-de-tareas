/* ============================================================
   CURSO 5 PYTHON — CONTENIDO parte B (Módulos 4–7) + EXAMEN
   ============================================================ */
MODULES.push({
  id:'m4', emoji:'🧵', name:'Texto como profesional', color:'#d946ef',
  desc:'Métodos de cadenas, f-strings con formato y validación de entradas.',
  lessons:[

  /* -------- 4-1 -------- */
  { id:'4-1', title:'Métodos de cadenas: el kit completo', time:'14 min', blocks:[
    {t:'p', h:'Los <b>métodos de cadenas</b> transforman y analizan texto. OJO: como las cadenas son inmutables, TODOS devuelven una cadena NUEVA (el original queda intacto) — por eso se encadenan: <code>input().strip().upper()</code>.'},
    {t:'code', lang:'python', title:'el kit esencial', code:`s = 'Hola Mundo'
print(s.upper())       # HOLA MUNDO
print(s.lower())       # hola mundo
print('  x  '.strip()) # 'x'  quita espacios de los bordes
print(s.replace('Mundo', 'Python'))  # Hola Python
print('a,b,c'.split(','))            # ['a', 'b', 'c']
print('-'.join(['2025', '06', '19'])) # 2025-06-19
print('python.pdf'.endswith('.pdf')) # True
print('banana'.count('a'))           # 3
print('banana'.find('na'))           # 2 (índice; -1 si no está)`},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>s = \'abc\'</code> y luego <code>s.upper()</code> — ¿vale s?', options:['ABC','abc','Error','NoneType'], correct:1, pts:10, explain:'Los métodos devuelven NUEVAS cadenas: s sigue siendo \'abc\'. Para cambiarlo: s = s.upper().'},
      {type:'mc', q:'<code>\'a-b-c\'.split(\'-\')</code> da…', options:['[\'a\',\'b\',\'c\']','\'abc\'','(\'a\',\'b\',\'c\')','[\'a-b-c\']'], correct:0, pts:10, explain:'split corta por el separador y devuelve LISTA.'},
      {type:'mc', q:'<code>\'-\'.join([\'x\',\'y\'])</code> da…', options:['[\'x\',\'y\']','\'xy\'','\'x-y\'','Error'], correct:2, pts:10, explain:'join UNE una lista de textos con el separador indicado.'}
    ]},
    {t:'pyex', title:'🧪 Transforma texto', tasks:[
      {q:'Con la entrada <code>  Ana López  </code>: imprime el nombre limpio de bordes y EN MAYÚSCULAS (encadena strip y upper).', stdin:['  Ana López  '], check:{lines:['ANA LÓPEZ']}, solution:'nombre = input().strip().upper()\nprint(nombre)', pts:25},
      {q:'Normaliza la fecha: imprime <code>19/06/2025</code> a partir del texto <code>\'19-06-2025\'</code> con replace.', check:{lines:['19/06/2025']}, solution:"print('19-06-2025'.replace('-', '/'))", pts:25},
      {q:'Cuenta palabras: con la entrada <code>el perro persigue al gato</code>, imprime cuántas palabras tiene (split + len).', stdin:['el perro persigue al gato'], check:{lines:['5']}, solution:'frase = input()\nprint(len(frase.split()))', pts:25},
      {q:'Arma un correo: con las entradas <code>ana</code> y <code>gmail.com</code>, imprime <code>ana@gmail.com</code> usando join (o suma).', stdin:['ana','gmail.com'], check:{lines:['ana@gmail.com']}, solution:'u = input()\nd = input()\nprint(\'@\'.join([u, d]))', pts:25}
    ]}
  ]},

  /* -------- 4-2 -------- */
  { id:'4-2', title:'f-strings con formato: :.2f, anchos y alineación', time:'13 min', blocks:[
    {t:'p', h:'Después de la expresión, dos puntos activan el <b>formato</b>: <code>{precio:.2f}</code> fuerza 2 decimales (dinero), <code>{texto:&gt;10}</code> alinea a la derecha en 10 caracteres (tablas), <code>{x:^8}</code> centra. Es la diferencia entre «datos» y un reporte presentable.'},
    {t:'code', lang:'python', title:'reportes bonitos', code:`print(f'{10 / 3:.2f}')          # 3.33
print(f'Total: \${1234.5:.2f}')   # Total: $1234.50
print(f'|{\'pan\':>10}|')          # |       pan|
print(f'|{\'pan\':<10}|')          # |pan       |
print(f'|{\'pan\':^10}|')          # |   pan    |

productos = [('café', 95.5), ('té matcha', 210)]
for nombre, precio in productos:
    print(f'{nombre:<12} \${precio:>8.2f}')
# café          $   95.50
# té matcha     $  210.00`},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>f\'{2.567:.2f}\'</code> produce…', options:['2.56','2.57','2.5','2.567'], correct:1, pts:10, explain:'Redondeo a 2 decimales: 2.57.'},
      {type:'mc', q:'<code>{\'hi\':&gt;6}</code> produce…', options:['hi    ','    hi','hihihi','hi'], correct:1, pts:10, explain:'&gt; alinea a la DERECHA rellenando a la izquierda hasta 6.'},
      {type:'tf', q:'<code>{n:.2f}</code> funciona solo con números.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Con texto lanza TypeError: el formato f es para floats.'}
    ]},
    {t:'pyex', title:'🧪 Formato de reportes', tasks:[
      {q:'Imprime la división <code>7 / 3</code> con 2 decimales usando f-string.', check:{lines:['2.33']}, solution:'print(f"{7 / 3:.2f}")', pts:25},
      {q:'Con las entradas <code>Camiseta</code> y <code>499.5</code>: imprime <code>Camiseta: $499.50</code> (formato :.2f).', stdin:['Camiseta','499.5'], check:{lines:['Camiseta: $499.50']}, solution:'prod = input()\nprecio = float(input())\nprint(f"{prod}: ${precio:.2f}")', pts:25},
      {q:'Tabla mini: para <code>[(\'pan\', 42.5), (\'café\', 95)]</code> imprime dos líneas alineadas con <code>{nombre:&lt;8}${precio:&gt;7.2f}</code>:', stdin:[], check:{lines:['pan     $  42.50','café    $  95.00']}, solution:"datos = [('pan', 42.5), ('café', 95)]\nfor nombre, precio in datos:\n    print(f'{nombre:<8}${precio:>7.2f}')", pts:25},
      {q:'Porcentaje: con la entrada <code>0.853</code> imprime <code>85.3%</code> (multiplica por 100 y un decimal).', stdin:['0.853'], check:{lines:['85.3%']}, solution:'p = float(input())\nprint(f"{p * 100:.1f}%")', pts:25}
    ]}
  ]},

  /* -------- 4-3 -------- */
  { id:'4-3', title:'Validar antes de confiar', time:'13 min', blocks:[
    {t:'p', h:'El usuario (y los archivos) traen datos sucios. Antes de convertir o procesar: <code>.isdigit()</code> pregunta si el texto son dígitos, <code>.startswith()</code>/<code>.endswith()</code> revisan prefijos/sufijos y <code>in</code> la membresía. Validar ANTES evita el <b>ValueError</b> de <code>int()</code>.'},
    {t:'code', lang:'python', title:'validación clásica', code:`dato = input()
if dato.isdigit():
    print('Número:', int(dato) * 2)
else:
    print('No es un número entero')

archivo = 'reporte.pdf'
print(archivo.endswith('.pdf'))  # True
print(archivo.startswith('rep')) # True`},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>\'-5\'.isdigit()</code> devuelve…', options:['True','False','5','Error'], correct:1, pts:10, explain:'El signo - no es dígito: False (por eso hay que validar con cuidado los negativos).'},
      {type:'mc', q:'Para revisar si el texto termina en «.com»…', options:['\'.com\' in texto','texto.endswith(\'.com\')','texto.find(\'.com\')','texto.upper()'], correct:1, pts:10, explain:'endswith es exactamente para eso (in también funciona, pero endswith es más claro).'},
      {type:'tf', q:'Validar la entrada ANTES de int() evita ValueError.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Precisamente: isdigit() → True garantiza que int() pueda convertir.'}
    ]},
    {t:'pyex', title:'🧪 Validadores', tasks:[
      {q:'Con la entrada <code>42</code>: imprime <code>es número</code> o <code>no es número</code> con isdigit.', stdin:['42'], check:{lines:['es número']}, solution:'dato = input()\nif dato.isdigit():\n    print("es número")\nelse:\n    print("no es número")', pts:25},
      {q:'Misma validación pero con la entrada <code>4x2</code> — ahora debe salir <code>no es número</code>.', stdin:['4x2'], check:{lines:['no es número']}, solution:'dato = input()\nif dato.isdigit():\n    print("es número")\nelse:\n    print("no es número")', pts:25},
      {q:'Solo si es número, duplícalo: entrada <code>21</code> → <code>42</code>; y tu programa también debe funcionar con <code>hola</code> imprimiendo <code>entrada inválida</code>.', stdin:['21'], check:{lines:['42']}, solution:'dato = input()\nif dato.isdigit():\n    print(int(dato) * 2)\nelse:\n    print("entrada inválida")', pts:25},
      {q:'Filtro de archivos: imprime cuáles de <code>[\'a.pdf\', \'b.txt\', \'c.pdf\', \'d.doc\']</code> terminan en <code>.pdf</code> (una por línea).', check:{lines:['a.pdf','c.pdf']}, solution:"archivos = ['a.pdf', 'b.txt', 'c.pdf', 'd.doc']\nfor f in archivos:\n    if f.endswith('.pdf'):\n        print(f)", pts:25}
    ]}
  ]}
]});

MODULES.push({
  id:'m5', emoji:'🛠️', name:'Funciones', color:'#f59e0b',
  desc:'def y return, parámetros con defaults, ámbito y la recursión sin miedo.',
  lessons:[

  /* -------- 5-1 -------- */
  { id:'5-1', title:'def y return: empaqueta tu lógica', time:'14 min', blocks:[
    {t:'p', h:'Una <b>función</b> es un bloque con nombre que puedes llamar mil veces: <code>def nombre(parametros):</code> + cuerpo indentado. <b>return</b> entrega el resultado a quien llamó (y termina la función). Sin return, la función devuelve <code>None</code> — como un procedimiento que solo «hace» (imprime, modifica).'},
    {t:'code', lang:'python', title:'la anatomía', code:`def area_rectangulo(base, altura):
    return base * altura

a = area_rectangulo(3, 4)   # a vale 12
print(a, area_rectangulo(5, 2))  # 12 10

def saluda(nombre):          # función sin return → None
    print(f'¡Hola, {nombre}!')

resultado = saluda('Ada')    # imprime ¡Hola, Ada!
print(resultado)             # None`},
    {t:'srs', deck:'pycore', sub:'Anatomía de las funciones: def, return, parámetros y None implícito.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Una función sin <code>return</code> devuelve…', options:['0','\'\'','None','Error'], correct:2, pts:10, explain:'El return implícito de Python es None.'},
      {type:'mc', q:'<code>return</code> dentro de una función…', options:['Imprime el valor','Entrega el valor y TERMINA la función','Reinicia la función','Nada'], correct:1, pts:10, explain:'Devuelve el control con el valor: nada después de return se ejecuta.'},
      {type:'tf', q:'Definir una función con def la ejecuta inmediatamente.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'def solo la REGISTRA: se ejecuta al llamarla con ().'}
    ]},
    {t:'pyex', title:'🧪 Define y llama', tasks:[
      {q:'Define <code>saluda(nombre)</code> que DEVUELVA (return) el texto <code>¡Hola, NOMBRE!</code>; llama con <code>\'Ada\'</code> e imprime el resultado.', check:{lines:['¡Hola, Ada!']}, solution:"def saluda(nombre):\n    return f'¡Hola, {nombre}!'\nprint(saluda('Ada'))", pts:25},
      {q:'Define <code>area(base, altura)</code> y usa UNA sola llamada para imprimir <code>El área es 60</code> (base 12, altura 5).', check:{lines:['El área es 60']}, solution:'def area(base, altura):\n    return base * altura\nprint(f"El área es {area(12, 5)}")', pts:25},
      {q:'Define <code>es_par(n)</code> que devuelva True/False; imprime <code>es_par(10)</code> y <code>es_par(7)</code> en dos líneas.', check:{lines:['True','False']}, solution:'def es_par(n):\n    return n % 2 == 0\nprint(es_par(10))\nprint(es_par(7))', pts:25},
      {q:'Define <code>precio_final(precio)</code> que aplique 16% de IVA y redondee a 2 decimales; imprime el resultado para 100 (formato :.2f → <code>116.00</code>).', hint:'return round(precio * 1.16, 2)', check:{lines:['116.00']}, solution:'def precio_final(precio):\n    return round(precio * 1.16, 2)\nprint(f"{precio_final(100):.2f}")', pts:25}
    ]}
  ]},

  /* -------- 5-2 -------- */
  { id:'5-2', title:'Parámetros con defaults y por nombre', time:'13 min', blocks:[
    {t:'p', h:'Los parámetros pueden tener <b>valor por omisión</b>: <code>def saluda(nombre, saludo=\'Hola\')</code> — quien llame puede omitir <code>saludo</code>. Y en la llamada puedes nombrar los argumentos (<code>potencia(exp=3, base=2)</code>) para leer mejor y saltarte los intermedios.'},
    {t:'code', lang:'python', title:'flexibilidad en las llamadas', code:`def saluda(nombre, saludo='Hola', signo='!'):
    return f'{saludo}, {nombre}{signo}'

print(saluda('Ada'))                        # Hola, Ada!
print(saluda('Alan', 'Buenos días'))        # Buenos días, Alan!
print(saluda('Grace', signo='??'))          # Hola, Grace??
print(saluda('Linus', signo='.', saludo='Ey'))  # Ey, Linus.

def potencia(base, exp=2):
    return base ** exp
print(potencia(9), potencia(2, 10), potencia(exp=3, base=5))  # 81 1024 125`},
    {t:'warn', title:'⚠️ Los defaults con lista mutable son una trampa', h:'<code>def f(lista=[])</code> comparte LA MISMA lista entre llamadas (los append se acumulan) — bug legendario de Python. Patrón seguro: default None y dentro: <code>if lista is None: lista = []</code>.'},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>def f(a, b=10):</code> — ¿qué llamada es INVÁLIDA?', options:['f(1)','f(1, 2)','f()','f(a=1)'], correct:2, pts:10, explain:'a no tiene default: falta obligatoriamente.'},
      {type:'mc', q:'<code>f(b=3, a=1)</code> con <code>def f(a, b)</code>…', options:['Error: orden invertido','Funciona: por nombre no importa el orden','f recibe a=3','SyntaxError'], correct:1, pts:10, explain:'Los kwargs se casan por nombre, no por posición.'},
      {type:'tf', q:'Un parámetro con default puede omitirse en la llamada.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Esa es su función: valor de reserva.'}
    ]},
    {t:'pyex', title:'🧪 Defaults y kwargs', tasks:[
      {q:'Define <code>saluda(nombre, saludo=\'Hola\')</code> que devuelva <code>saludo + \', \' + nombre + \'!\'</code>; imprime <code>saluda(\'Ana\')</code> y <code>saluda(\'Luis\', \'Buenos días\')</code> en dos líneas.', check:{lines:['Hola, Ana!','Buenos días, Luis!']}, solution:"def saluda(nombre, saludo='Hola'):\n    return saludo + ', ' + nombre + '!'\nprint(saluda('Ana'))\nprint(saluda('Luis', 'Buenos días'))", pts:25},
      {q:'Define <code>potencia(base, exp=2)</code>; imprime <code>potencia(6)</code>, <code>potencia(2, 8)</code> y <code>potencia(exp=4, base=3)</code> en una línea.', check:{lines:['36 256 81']}, solution:'def potencia(base, exp=2):\n    return base ** exp\nprint(potencia(6), potencia(2, 8), potencia(exp=4, base=3))', pts:25},
      {q:'Ticket con IVA configurable: <code>total(monto, iva=0.16)</code> devuelve monto*(1+iva) redondeado a 2 decimales; imprime <code>total(500)</code> y <code>total(500, 0.0)</code> (usa :.2f): <code>580.00</code> y <code>500.00</code>.', check:{lines:['580.00','500.00']}, solution:'def total(monto, iva=0.16):\n    return round(monto * (1 + iva), 2)\nprint(f"{total(500):.2f}")\nprint(f"{total(500, 0.0):.2f}")', pts:25},
      {q:'Repite con separator configurable: <code>linea(n, char=\'-\')</code> devuelve n caracteres char; imprime <code>linea(5)</code> y <code>linea(3, \'=\')</code> en dos líneas.', check:{lines:['-----','===']}, solution:"def linea(n, char='-'):\n    return char * n\nprint(linea(5))\nprint(linea(3, '='))", pts:25}
    ]}
  ]},

  /* -------- 5-3 -------- */
  { id:'5-3', title:'Ámbito: lo que pasa en la función…', time:'12 min', blocks:[
    {t:'p', h:'Las variables creadas DENTRO de una función son <b>locales</b>: nacen y mueren con cada llamada, invisibles desde fuera. Las creadas fuera son <b>globales</b>: la función puede LEERLAS (útil para constantes como IVA), pero asignarlas dentro crearía una local nueva — por eso las funciones profesionales reciben todo por parámetros y devuelven resultados con return.'},
    {t:'code', lang:'python', title:'local vs global', code:`IVA = 0.16            # global: constante de configuración

def total(precio):
    extra = precio * IVA   # extra es LOCAL
    return precio + extra

print(total(100))   # 116.0
print(extra)        # NameError: extra no existe aquí fuera

x = 10
def prueba():
    x = 99          # esta x es LOCAL (no toca la global)
prueba()
print(x)            # 10: la global sigue intacta`},
    {t:'quiz', questions:[
      {type:'mc', q:'Una variable local…', options:['Existe durante todo el programa','Solo existe dentro de su función','Se puede leer desde cualquier parte','Es siempre global'], correct:1, pts:10, explain:'Nace con la llamada y muere al terminar: encapsulación gratis.'},
      {type:'mc', q:'Dentro de una función, leer <code>IVA</code> global…', options:['NameError','Funciona: se puede leer','Crea una local','Error de sintaxis'], correct:1, pts:10, explain:'Leer globals es válido; asignar crearía una variable local nueva.'},
      {type:'tf', q:'El estilo profesional: funciones que reciben parámetros y devuelven return, evitando depender de globales.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Entradas por parámetros, salida por return, globales solo para constantes.'}
    ]},
    {t:'pyex', title:'🧪 Prueba el ámbito', tasks:[
      {q:'Declara la constante global <code>IVA = 0.16</code> y la función <code>total(precio)</code> que lea IVA y devuelva precio*(1+IVA); imprime <code>total(250)</code> → <code>290.0</code>.', check:{lines:['290.0']}, solution:'IVA = 0.16\ndef total(precio):\n    return precio * (1 + IVA)\nprint(total(250))', pts:25},
      {q:'Demuestra que lo local no sale: define <code>f()</code> que cree <code>secreto = 1</code>; llama f() y luego imprime <code>type(secreto)</code>… no: imprime directamente <code>\'terminó\'</code> tras capturar el error — mejor: define f() que cree secreto e imprima secreto DENTRO; fuera imprime <code>\'fin\'</code>. Salida: <code>1</code> y <code>fin</code>.', hint:'def f():\n    secreto = 1\n    print(secreto)\nf()\nprint(\'fin\')', check:{lines:['1','fin']}, solution:'def f():\n    secreto = 1\n    print(secreto)\nf()\nprint("fin")', pts:25},
      {q:'Sombra local: <code>x = 10</code> global; <code>def cambia(): x = 99</code> (local); llama cambia() e imprime x — la global sigue <code>10</code>.', check:{lines:['10']}, solution:'x = 10\ndef cambia():\n    x = 99\ncambia()\nprint(x)', pts:25},
      {q:'Buenas prácticas: calcula el total de 3 precios [100, 250, 75] CON una función <code>suma(precios)</code> que reciba la lista y devuelva sum(precios); imprime el total. Sin globales en la lógica.', check:{lines:['425']}, solution:'def suma(precios):\n    return sum(precios)\nprint(suma([100, 250, 75]))', pts:25}
    ]}
  ]},

  /* -------- 5-4 -------- */
  { id:'5-4', title:'Composición y recursión', time:'14 min', blocks:[
    {t:'p', h:'Las funciones se combinan como piezas de Lego: una puede llamar a otra (y a otra…) — es la <b>composición</b>, la base de los programas grandes. Y una función puede llamarse A SÍ MISMA: la <b>recursión</b>. Toda recursión necesita un <b>caso base</b> (cuándo parar) o explota en RecursionError.'},
    {t:'code', lang:'python', title:'factores en cadena', code:`# composición
def doble(x):  return x * 2
def cuadrado(x): return x * x
print(doble(cuadrado(3)))   # 18: primero cuadrado, luego doble

# recursión: n! = n × (n-1)!
def factorial(n):
    if n <= 1:          # caso base: cuándo parar
        return 1
    return n * factorial(n - 1)   # se llama a sí misma

print(factorial(5))   # 120`},
    {t:'info', title:'ℹ️ ¿Cómo se desenvuelve factorial(5)?', h:'factorial(5) pregunta a factorial(4), que pregunta al 3… hasta el caso base (1). Entonces las respuestas SUBEN: 1→2→6→24→120. Cada llamada pendiente ocupa memoria; sin caso base: <b>RecursionError</b> (el motor te lo avisa en español).'},
    {t:'quiz', questions:[
      {type:'mc', q:'La recursión necesita SIEMPRE…', options:['Un while','Un caso base','Una lista','print'], correct:1, pts:10, explain:'Sin caso base la recursión es infinita → RecursionError.'},
      {type:'mc', q:'<code>doble(cuadrado(4))</code> con doble=×2 y cuadrado=x² vale…', options:['64','16','32','8'], correct:2, pts:10, explain:'cuadrado(4)=16; doble(16)=32. La interna va primero.'},
      {type:'tf', q:'Cualquier ciclo while puede reescribirse con recursión (y viceversa).', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Son equivalentes en poder; se elige por claridad (ciclos para repetir, recursión para estructuras anidadas).'}
    ]},
    {t:'pyex', title:'🧪 Funciones que se componen', tasks:[
      {q:'Define <code>doble(x)</code> y <code>cuadrado(x)</code>; imprime <code>doble(cuadrado(5))</code> → <code>50</code>.', check:{lines:['50']}, solution:'def doble(x):\n    return x * 2\ndef cuadrado(x):\n    return x * x\nprint(doble(cuadrado(5)))', pts:25},
      {q:'Factorial recursivo: define <code>factorial(n)</code> con caso base e imprime <code>factorial(6)</code> → <code>720</code>.', check:{lines:['720']}, solution:'def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\nprint(factorial(6))', pts:25},
      {q:'Fibonacci recursivo: <code>fib(n)</code> con casos base 0 y 1; imprime <code>fib(10)</code> → <code>55</code>.', check:{lines:['55']}, solution:'def fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\nprint(fib(10))', pts:25},
      {q:'Pipeline comercial: <code>con_descuento(monto, pct)</code> devuelve monto*(1-pct/100); <code>con_envio(monto)</code> suma 150 si monto &lt; 1000 (si no, 0). Imprime el total FINAL de 800 con 10% de descuento y su envío → <code>870.0</code>.', hint:'total = con_envio(con_descuento(800, 10))', check:{lines:['870.0']}, solution:'def con_descuento(monto, pct):\n    return monto * (1 - pct / 100)\ndef con_envio(monto):\n    if monto < 1000:\n        return monto + 150\n    return monto\nprint(con_envio(con_descuento(800, 10)))', pts:25}
    ]}
  ]}
]});

MODULES.push({
  id:'m6', emoji:'🛡️', name:'Robustez y módulos', color:'#14b8a6',
  desc:'try/except para errores reales, math/random, y retos que integran todo.',
  lessons:[

  /* -------- 6-1 -------- */
  { id:'6-1', title:'try/except: el programa no se rompe', time:'14 min', blocks:[
    {t:'p', h:'Los usuarios escribirán «abc» donde va un número. <b>try/except</b> ejecuta el bloque riesgoso y, si lanza la excepción esperada, salta al <b>except</b> en vez de caer. Es la diferencia entre un programa que muere y uno que pregunta de nuevo. <b>finally</b> se ejecuta SIEMPRE (limpieza).'},
    {t:'code', lang:'python', title:'la red de seguridad', code:`try:
    edad = int(input('Edad: '))
    print(f'Tendrás {edad + 1}')
except ValueError:
    print('Escribe un número entero, por favor')

try:
    a = int(input()); b = int(input())
    print(a / b)
except ZeroDivisionError:
    print('No se puede dividir entre cero')
finally:
    print('Operación terminada')   # siempre corre`},
    {t:'warn', title:'⚠️ except desnudo: solo en emergencias', h:'<code>except:</code> a secas atrapa TODO (hasta tus propios bugs silenciosos). Profesional: atrapa excepciones ESPECÍFICAS — <code>except ValueError:</code>, <code>except KeyError:</code>, o una tupla: <code>except (ValueError, TypeError):</code>.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Si dentro de try NO hay error…', options:['except se ejecuta igual','except se salta','El programa termina','finally no corre'], correct:1, pts:10, explain:'except solo entra cuando su excepción ocurre.'},
      {type:'mc', q:'<code>int(\'abc\')</code> lanza…', options:['TypeError','SyntaxError','ValueError','KeyError'], correct:2, pts:10, explain:'El valor no puede convertirse: ValueError.'},
      {type:'tf', q:'finally se ejecuta aunque haya excepción no atrapada.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Para eso existe: limpieza garantizada pase lo que pase.'},
      {type:'mc', q:'¿Cuál atrapa ValueError y TypeError a la vez?', options:['except ValueError, TypeError:','except (ValueError, TypeError):','except ValueError or TypeError:','except ambas:'], correct:1, pts:10, explain:'Tupla de excepciones entre paréntesis.'}
    ]},
    {t:'pyex', title:'🧪 Programas a prueba de usuarios', tasks:[
      {q:'Con la entrada <code>abc</code>: intenta <code>n = int(input())</code> dentro de try y ante ValueError imprime <code>Entrada no válida</code>.', stdin:['abc'], check:{lines:['Entrada no válida']}, solution:'try:\n    n = int(input())\n    print(n)\nexcept ValueError:\n    print("Entrada no válida")', pts:25},
      {q:'División segura: con las entradas <code>10</code> y <code>0</code>, imprime el resultado… o <code>No se puede dividir entre cero</code> ante ZeroDivisionError.', stdin:['10','0'], check:{lines:['No se puede dividir entre cero']}, solution:'try:\n    a = int(input())\n    b = int(input())\n    print(a / b)\nexcept ZeroDivisionError:\n    print("No se puede dividir entre cero")', pts:25},
      {q:'Con la entrada <code>8</code> (divisor 2): imprime <code>4.0</code> y ADEMÁS <code>listo</code> desde un finally (dos líneas).', stdin:['8','2'], check:{lines:['4.0','listo']}, solution:'try:\n    a = int(input())\n    b = int(input())\n    print(a / b)\nfinally:\n    print("listo")', pts:25},
      {q:'Clave protegida: con <code>stock = {\'pan\': 3}</code> intenta imprimir <code>stock[\'café\']</code> dentro de try; ante KeyError imprime <code>Producto inexistente</code>.', check:{lines:['Producto inexistente']}, solution:"stock = {'pan': 3}\ntry:\n    print(stock['café'])\nexcept KeyError:\n    print('Producto inexistente')", pts:25}
    ]}
  ]},

  /* -------- 6-2 -------- */
  { id:'6-2', title:'Módulos: math y random', time:'13 min', blocks:[
    {t:'p', h:'Un <b>módulo</b> es una caja de herramientas que se importa: <code>import math</code> trae <code>math.sqrt()</code>, <code>math.pi</code>… Con <code>from math import sqrt</code> importas solo piezas. El módulo <b>random</b> genera azar — y con <code>random.seed(n)</code> fijas la semilla para que los «dados» den SIEMPRE lo mismo: indispensable en este curso para calificar tus ejercicios.'},
    {t:'code', lang:'python', title:'matemáticas y azar controlado', code:`import math
print(math.sqrt(144))   # 12.0
print(math.pi)          # 3.141592653589793
print(math.floor(3.9), math.ceil(3.1))  # 3 4

import random
random.seed(7)          # la misma semilla → la misma secuencia
x = random.randint(1, 100)
random.seed(7)
y = random.randint(1, 100)
print(x == y)           # True: determinista con semilla
dado = random.randint(1, 6)
print(1 <= dado <= 6)   # True: siempre en rango`},
    {t:'info', title:'ℹ️ En Python real hay miles de módulos', h:'Este mini-motor trae math y random (los didácticos). Python real añade os, sys, json, csv, datetime… y el universo PyPI (pandas, requests, Flask). La mecánica — import y punto — es idéntica: lo que aprendes aquí traslada directo.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Después de <code>import math</code>, la raíz de 16 es…', options:['sqrt(16)','math.sqrt(16)','math.sqrt 16','16.sqrt()'], correct:1, pts:10, explain:'Con import completo: módulo.función.'},
      {type:'mc', q:'<code>random.seed(3)</code> sirve para…', options:['Borrar el azar','Que la secuencia aleatoria sea repetible','Acelerar el programa','Generar más números'], correct:1, pts:10, explain:'Misma semilla → misma secuencia: reproducibilidad.'},
      {type:'tf', q:'<code>from math import sqrt</code> permite llamar sqrt(9) sin el prefijo math.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'from importa funciones sueltas: sin prefijo.'}
    ]},
    {t:'pyex', title:'🧪 Cajas de herramientas', tasks:[
      {q:'Con math: imprime la raíz cuadrada de 225, math.floor(7.8) y math.pi redondeado a 2 decimales (3 líneas).', check:{lines:['15.0','7','3.14']}, solution:'import math\nprint(math.sqrt(225))\nprint(math.floor(7.8))\nprint(round(math.pi, 2))', pts:25},
      {q:'Determinismo: con seed(5), genera <code>x = random.randint(1, 1000)</code>, vuelve a sembrar seed(5), genera <code>y</code> igual e imprime <code>x == y</code>.', check:{lines:['True']}, solution:'import random\nrandom.seed(5)\nx = random.randint(1, 1000)\nrandom.seed(5)\ny = random.randint(1, 1000)\nprint(x == y)', pts:25},
      {q:'Dado justo: con seed(42), tira un dado (<code>randint(1, 6)</code>) e imprime si está en rango: <code>1 <= dado <= 6</code>.', check:{lines:['True']}, solution:'import random\nrandom.seed(42)\ndado = random.randint(1, 6)\nprint(1 <= dado <= 6)', pts:25},
      {q:'Elección segura: con seed(9) elige <code>random.choice([\'piedra\', \'papel\', \'tijera\'])</code> e imprime si la elección pertenece a la lista (in).', check:{lines:['True']}, solution:"import random\nrandom.seed(9)\nejecutada = random.choice(['piedra', 'papel', 'tijera'])\nprint(ejecutada in ['piedra', 'papel', 'tijera'])", pts:25}
    ]}
  ]},

  /* -------- 6-3 -------- */
  { id:'6-3', title:'Retos integradores', time:'18 min', blocks:[
    {t:'p', h:'Cuatro retos clásicos que combinan TODO lo del curso: ciclos, condicionales, funciones, acumuladores y formatos. Son exactamente el tipo de problemas de entrevistas junior y de la vida real. Tómate tu tiempo: piensa el algoritmo en español primero, luego tradúcelo.'},
    {t:'pyex', title:'🧪 Los 4 retos', tasks:[
      {q:'RETO FizzBuzz: del 1 al 15, una por línea: múltiplos de 3 → <code>Fizz</code>, de 5 → <code>Buzz</code>, de ambos → <code>FizzBuzz</code>, resto → el número.', hint:'if n % 15 == 0 primero (el más específico), luego % 3, % 5…', check:{lines:['1','2','Fizz','4','Buzz','Fizz','7','8','Fizz','Buzz','11','Fizz','13','14','FizzBuzz']}, solution:'for n in range(1, 16):\n    if n % 15 == 0:\n        print("FizzBuzz")\n    elif n % 3 == 0:\n        print("Fizz")\n    elif n % 5 == 0:\n        print("Buzz")\n    else:\n        print(n)', pts:34},
      {q:'RETO Suma de dígitos: con la entrada <code>4937</code>, imprime la suma de sus dígitos (→ <code>23</code>). Pista: convierte a texto y recorre, o usa // y % con 10.', stdin:['4937'], check:{lines:['23']}, solution:'n = int(input())\ntotal = 0\nwhile n > 0:\n    total += n % 10\n    n //= 10\nprint(total)', pts:33},
      {q:'RETO Primos: imprime los números primos hasta 20 (una por línea). Pista: para cada n, prueba divisores desde 2 hasta n-1 con una bandera.', check:{lines:['2','3','5','7','11','13','17','19']}, solution:'for n in range(2, 21):\n    es_primo = True\n    for d in range(2, n):\n        if n % d == 0:\n            es_primo = False\n            break\n    if es_primo:\n        print(n)', pts:33},
      {q:'RETO Menú simulado: con las entradas <code>agregar</code>, <code>café</code>, <code>agregar</code>, <code>té</code>, <code>listar</code>, <code>salir</code>: agrega los productos a una lista y al listar imprime <code>1. café</code> y <code>2. té</code> (con enumerate), luego <code>¡Adiós!</code>.', hint:'while True con la orden en input(); if orden == "agregar": lista.append(input()) …', stdin:['agregar','café','agregar','té','listar','salir'], check:{lines:['1. café','2. té','¡Adiós!']}, solution:'productos = []\nwhile True:\n    orden = input()\n    if orden == "salir":\n        break\n    if orden == "agregar":\n        productos.append(input())\n    elif orden == "listar":\n        for i, p in enumerate(productos, 1):\n            print(f"{i}. {p}")\nprint("¡Adiós!")', pts:34}
    ]},
    {t:'srs', deck:'pycore', sub:'Repaso final del mazo antes del proyecto: 2 minutos que valen oro.'}
  ]}
]});

MODULES.push({
  id:'m7', emoji:'🏆', name:'Proyecto final y examen', color:'#eab308',
  desc:'El inventario de la Librería Esperanza en Python: funciones, menús y reportes.',
  lessons:[

  /* -------- 7-1 -------- */
  { id:'7-1', title:'Proyecto I: el inventario como datos', time:'18 min', blocks:[
    {t:'p', h:'Cerramos el círculo con el Curso 4: la Librería Esperanza ahora vive en PYTHON. El inventario es una <b>lista de diccionarios</b> (como filas de una tabla SQL). Primero lo exploras con funciones: contar disponibles, valor total, el más caro y una tabla formateada. Cada tarea es UN programa autocontenido con los datos ya incluidos.'},
    {t:'code', lang:'python', title:'los datos del proyecto (usa esto en TODAS las tareas)', code:`inventario = [
    {'titulo': 'Cien años de soledad', 'precio': 320.5, 'stock': 4},
    {'titulo': 'El Aleph',             'precio': 210,   'stock': 0},
    {'titulo': 'Rayuela',              'precio': 340,   'stock': 2},
]`},
    {t:'pyex', title:'🧪 Explora el inventario', tasks:[
      {q:'1/5 · Con los datos del proyecto: imprime cuántos títulos hay (<code>len</code>) y cuántos tienen stock mayor que 0 (cuenta con un for), en dos líneas: <code>3</code> y <code>2</code>.', check:{lines:['3','2']}, solution:"inventario = [\n    {'titulo': 'Cien años de soledad', 'precio': 320.5, 'stock': 4},\n    {'titulo': 'El Aleph', 'precio': 210, 'stock': 0},\n    {'titulo': 'Rayuela', 'precio': 340, 'stock': 2},\n]\nprint(len(inventario))\ndisponibles = 0\nfor lib in inventario:\n    if lib['stock'] > 0:\n        disponibles += 1\nprint(disponibles)", pts:20},
      {q:'2/5 · Valor del inventario: suma precio*stock de todos los títulos e imprime con 2 decimales: <code>Valor: 1962.00</code>.', hint:'1282.0 + 0 + 680 = 1962.0', check:{lines:['Valor: 1962.00']}, solution:"inventario = [\n    {'titulo': 'Cien años de soledad', 'precio': 320.5, 'stock': 4},\n    {'titulo': 'El Aleph', 'precio': 210, 'stock': 0},\n    {'titulo': 'Rayuela', 'precio': 340, 'stock': 2},\n]\ntotal = 0\nfor lib in inventario:\n    total += lib['precio'] * lib['stock']\nprint(f'Valor: {total:.2f}')", pts:20},
      {q:'3/5 · El más caro: recorre e imprime SOLO el título del libro con mayor precio: <code>Rayuela</code> (sin max(), con un for que compare).', check:{lines:['Rayuela']}, solution:"inventario = [\n    {'titulo': 'Cien años de soledad', 'precio': 320.5, 'stock': 4},\n    {'titulo': 'El Aleph', 'precio': 210, 'stock': 0},\n    {'titulo': 'Rayuela', 'precio': 340, 'stock': 2},\n]\nmejor = inventario[0]\nfor lib in inventario:\n    if lib['precio'] > mejor['precio']:\n        mejor = lib\nprint(mejor['titulo'])", pts:20},
      {q:'4/5 · Tabla con estado: imprime para cada libro <code>{titulo:&lt;20}{estado}</code> donde estado es <code>AGOTADO</code> (stock 0) o <code>OK</code>:', stdin:[], check:{lines:['Cien años de soledadOK','El Aleph            AGOTADO','Rayuela             OK']}, solution:"inventario = [\n    {'titulo': 'Cien años de soledad', 'precio': 320.5, 'stock': 4},\n    {'titulo': 'El Aleph', 'precio': 210, 'stock': 0},\n    {'titulo': 'Rayuela', 'precio': 340, 'stock': 2},\n]\nfor lib in inventario:\n    if lib['stock'] == 0:\n        estado = 'AGOTADO'\n    else:\n        estado = 'OK'\n    print(f\"{lib['titulo']:<20}{estado}\")", pts:20},
      {q:'5/5 · Búsqueda con función: define <code>buscar(titulo)</code> que devuelva el dict del libro o None si no existe; busca <code>\'Rayuela\'</code> e imprime <code>Rayuela: 2 en stock</code>, y busca <code>\'Don Quijote\'</code> imprimiendo <code>No encontrado</code> (usa el None).', hint:'for lib in inventario: if lib["titulo"] == titulo: return lib / return None al final', check:{lines:['Rayuela: 2 en stock','No encontrado']}, solution:"inventario = [\n    {'titulo': 'Cien años de soledad', 'precio': 320.5, 'stock': 4},\n    {'titulo': 'El Aleph', 'precio': 210, 'stock': 0},\n    {'titulo': 'Rayuela', 'precio': 340, 'stock': 2},\n]\ndef buscar(titulo):\n    for lib in inventario:\n        if lib['titulo'] == titulo:\n            return lib\n    return None\nr = buscar('Rayuela')\nif r is not None:\n    print(f\"{r['titulo']}: {r['stock']} en stock\")\nelse:\n    print('No encontrado')\nr2 = buscar('Don Quijote')\nif r2 is not None:\n    print(f\"{r2['titulo']}: {r2['stock']} en stock\")\nelse:\n    print('No encontrado')", pts:20}
    ]}
  ]},

  /* -------- 7-2 -------- */
  { id:'7-2', title:'Proyecto II: altas, ventas y reportes', time:'20 min', blocks:[
    {t:'p', h:'Segunda mitad del proyecto: el inventario SE MUEVE. Funciones para agregar libros, registrar ventas (descontando stock con control) y un reporte de ventas con total e item más vendido. Los programas ya traen datos de arranque: tu trabajo es la lógica.'},
    {t:'pyex', title:'🧪 El sistema completo', tasks:[
      {q:'1/5 · Alta: parte de la lista con 2 libros (Rayuela y El Aleph del proyecto) y agrega <code>{\'titulo\': \'Ficciones\', \'precio\': 210, \'stock\': 5}</code>; imprime la nueva longitud y el título del último con índice negativo: <code>3</code> y <code>Ficciones</code>.', check:{lines:['3','Ficciones']}, solution:"inventario = [\n    {'titulo': 'Rayuela', 'precio': 340, 'stock': 2},\n    {'titulo': 'El Aleph', 'precio': 210, 'stock': 0},\n]\ninventario.append({'titulo': 'Ficciones', 'precio': 210, 'stock': 5})\nprint(len(inventario))\nprint(inventario[-1]['titulo'])", pts:20},
      {q:'2/5 · Venta con control: Rayuela (stock 2) recibe una venta de 1 unidad → imprime <code>Rayuela: 1 en stock</code>; luego otra venta de 5 unidades → como no hay suficiente, imprime <code>Stock insuficiente</code> y el stock se queda en 1 (verifícalo imprimiéndolo).', stdin:[], check:{lines:['Rayuela: 1 en stock','Stock insuficiente','1']}, solution:"inventario = [\n    {'titulo': 'Rayuela', 'precio': 340, 'stock': 2},\n]\ndef vender(titulo, cantidad):\n    for lib in inventario:\n        if lib['titulo'] == titulo:\n            if lib['stock'] >= cantidad:\n                lib['stock'] -= cantidad\n                return True\n            return False\n    return False\n\nif vender('Rayuela', 1):\n    pass\nfor lib in inventario:\n    if lib['titulo'] == 'Rayuela':\n        print(f\"Rayuela: {lib['stock']} en stock\")\n\nif vender('Rayuela', 5):\n    pass\nelse:\n    print('Stock insuficiente')\nfor lib in inventario:\n    if lib['titulo'] == 'Rayuela':\n        print(lib['stock'])", pts:20},
      {q:'3/5 · Registro de ventas: con <code>ventas = [(\'Rayuela\', 2, 680.0), (\'El Aleph\', 3, 630.0), (\'Rayuela\', 1, 340.0)]</code> (título, cantidad, importe): imprime el total facturado <code>Total: 1650.0</code> y cuántos ejemplares de Rayuela se vendieron <code>Rayuela: 3</code>.', check:{lines:['Total: 1650.0','Rayuela: 3']}, solution:"ventas = [('Rayuela', 2, 680.0), ('El Aleph', 3, 630.0), ('Rayuela', 1, 340.0)]\ntotal = 0\nrayuela = 0\nfor titulo, cant, importe in ventas:\n    total += importe\n    if titulo == 'Rayuela':\n        rayuela += cant\nprint(f'Total: {total}')\nprint(f'Rayuela: {rayuela}')", pts:20},
      {q:'4/5 · Top vendedor: con las mismas ventas del 3/5, calcula con un DICT cuántos ejemplares se vendieron por título e imprime el título líder: <code>Rayuela</code> (empates: el primero que llegue a la cima).', hint:'acumula en un dict con if titulo in conteo… y luego busca el máximo con un for.', check:{lines:['Rayuela']}, solution:"ventas = [('Rayuela', 2, 680.0), ('El Aleph', 3, 630.0), ('Rayuela', 1, 340.0)]\nconteo = {}\nfor titulo, cant, importe in ventas:\n    if titulo in conteo:\n        conteo[titulo] += cant\n    else:\n        conteo[titulo] = cant\nmejor = None\nmejor_n = -1\nfor titulo in conteo:\n    if conteo[titulo] > mejor_n:\n        mejor_n = conteo[titulo]\n        mejor = titulo\nprint(mejor)", pts:20},
      {q:'5/5 · Reporte gerencial: imprime estas 3 líneas usando ventas e inventario (del 3/5 y 7-1):<br><code>Facturado: $1650.00</code><br><code>Títulos distintos vendidos: 2</code><br><code>Valor del inventario restante: 1962.00</code> (asume que las ventas del registro NO descontaron el stock).', hint:'Necesitas: sum de importes con :.2f, un set manual de títulos (lista sin repetidos), y precio*stock del inventario completo.', check:{lines:['Facturado: $1650.00','Títulos distintos vendidos: 2','Valor del inventario restante: 1962.00']}, solution:"ventas = [('Rayuela', 2, 680.0), ('El Aleph', 3, 630.0), ('Rayuela', 1, 340.0)]\ninventario = [\n    {'titulo': 'Cien años de soledad', 'precio': 320.5, 'stock': 4},\n    {'titulo': 'El Aleph', 'precio': 210, 'stock': 0},\n    {'titulo': 'Rayuela', 'precio': 340, 'stock': 2},\n]\ntotal = 0\nvistos = []\nfor titulo, cant, importe in ventas:\n    total += importe\n    if titulo not in vistos:\n        vistos.append(titulo)\nprint(f'Facturado: ${total:.2f}')\nprint(f'Títulos distintos vendidos: {len(vistos)}')\nvalor = 0\nfor lib in inventario:\n    valor += lib['precio'] * lib['stock']\nprint(f'Valor del inventario restante: {valor:.2f}')", pts:20}
    ]}
  ]},

  /* -------- 7-3 -------- */
  { id:'7-3', title:'Estrategia del examen y siguientes pasos', time:'10 min', blocks:[
    {t:'p', h:'El examen son <b>30 preguntas de 10 puntos (300 en total)</b>: se aprueba con <b>210 (70%)</b>. Tipos: opción múltiple, verdadero/falso y <b>completar la palabra clave</b> (el corrector tolera mayúsculas). Cubre todo: print/input, tipos, ciclos, listas/dicts, funciones, try/except y lectura de programas.'},
    {t:'list', items:[
      'En las de completar piensa en la PALABRA: print, input, def, return, while, break…',
      'Para «¿qué imprime este programa?»: ejecuta mentalmente línea por línea (lleva el estado de las variables).',
      'Cuidado con las trampas vistas: 10/2 → 5.0, -7//2 → -4, sort() devuelve None, input() es texto.',
      'Puedes presentarlo todas las veces que quieras: se guarda tu MEJOR calificación.'
    ]},
    {t:'milestone', title:'🎓 Y después de Python…', h:'Ya programas: datos, decisiones, ciclos, estructuras y funciones — el 80% de la programación diaria. Siguientes pasos naturales: instalar Python real y correr tus programas en tu computadora (python.org), luego el universo de librerías según tu rumbo: datos (pandas), web (Flask) o automatización (Automate the Boring Stuff, gratis online). El siguiente curso del campus es Unity (videojuegos): otra forma de pensar, misma base lógica.'}
  ]}
]});

/* ============================================================
   EXAMEN FINAL — 30 preguntas × 10 pts = 300
   ============================================================ */
const EXAM = {
  timeMin: 40,
  questions: [
    {type:'mc',   q:'M0 · Python es especialmente famoso en…', options:['Edición de video','Datos, IA y automatización','Diseño arquitectónico','Contabilidad manual'], correct:1, pts:10, explain:'Es el estándar de facto en datos, IA, ciencia y automatización.'},
    {type:'fill', q:'M0 · Escribe la función que muestra texto en pantalla:', accept:['print'], re:'^\\s*print\\s*;?\\s*$', pts:10, explain:'print() es la función de salida básica.'},
    {type:'mc',   q:'M0 · Un programa Python se ejecuta…', options:['Todo a la vez','Línea por línea, en orden','De abajo hacia arriba','Aleatoriamente'], correct:1, pts:10, explain:'Interpretado: de arriba hacia abajo, línea a línea.'},
    {type:'mc',   q:'M1 · ¿Qué imprime <code>print(10 / 2)</code>?', options:['5','5.0','10','2'], correct:1, pts:10, explain:'/ siempre produce float: 5.0.'},
    {type:'mc',   q:'M1 · El residuo de <code>-7 % 2</code> en Python es…', options:['-1','1','0','3.5'], correct:1, pts:10, explain:'El % toma el signo del divisor: 1.'},
    {type:'fill', q:'M1 · Completa para leer del teclado: nombre = ___()', accept:['input'], re:'^\\s*input\\s*;?\\s*$', pts:10, explain:'input() lee una línea y SIEMPRE devuelve texto.'},
    {type:'mc',   q:'M1 · <code>int(\'42\')</code> devuelve…', options:['\'42\'','42 (entero)','42.0','ValueError'], correct:1, pts:10, explain:'Convierte texto de entero a int. \'3.7\' NO se puede: ValueError.'},
    {type:'mc',   q:'M1 · ¿Qué imprime <code>x = 2<br>x += 3<br>print(x ** 2)</code>?', options:['25','10','16','4'], correct:0, pts:10, explain:'x=5; 5**2 = 25.'},
    {type:'tf',   q:'M1 · Una variable puede apuntar a un int y luego a un texto.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Las variables no tienen tipo fijo: apuntan al último valor.'},
    {type:'mc',   q:'M2 · ¿Qué imprime <code>print(0 <= 5 < 10)</code>?', options:['SyntaxError','True','False','0'], correct:1, pts:10, explain:'Comparación encadenada: 0<=5 y 5<10 → True.'},
    {type:'fill', q:'M2 · Palabra clave para la alternativa «si no, si…» en una cadena de decisiones:', accept:['elif'], re:'^\\s*elif\\s*;?\\s*$', pts:10, explain:'elif = else if: se evalúa en orden y entra al primero que cumpla.'},
    {type:'mc',   q:'M2 · <code>for i in range(1, 6):</code> — i toma…', options:['1..6','0..5','1..5','0..6'], correct:2, pts:10, explain:'range(inicio, fin): fin NO incluido → 1,2,3,4,5.'},
    {type:'mc',   q:'M2 · Un <code>while</code> cuya condición nunca se vuelve falsa…', options:['No ejecuta nada','Corre una vez','Ciclo infinito (TimeoutError aquí)','Lanza SyntaxError'], correct:2, pts:10, explain:'Algo dentro del ciclo debe acercarlo a la salida.'},
    {type:'fill', q:'M2 · Palabra clave que TERMINA un ciclo inmediatamente:', accept:['break'], re:'^\\s*break\\s*;?\\s*$', pts:10, explain:'break sale del ciclo; continue solo salta la vuelta.'},
    {type:'mc',   q:'M2 · <code>continue</code>…', options:['Termina el ciclo','Salta a la siguiente vuelta','Termina el programa','Reinicia el ciclo'], correct:1, pts:10, explain:'Abandona la iteración actual y sigue con la siguiente.'},
    {type:'mc',   q:'M3 · <code>[10, 20, 30][-1]</code> es…', options:['10','Error','30','20'], correct:2, pts:10, explain:'Índice negativo: cuenta desde el final. -1 es el último.'},
    {type:'mc',   q:'M3 · <code>[0, 1, 2, 3, 4][1:4]</code> es…', options:['[1, 2, 3, 4]','[0, 1, 2]','[1, 2, 3]','[2, 3]'], correct:2, pts:10, explain:'Slicing: desde índice 1 hasta 4 SIN incluirlo.'},
    {type:'mc',   q:'M3 · ¿Qué hace <code>a.append(5)</code>?', options:['Ordena a','Agrega 5 al final','Inserta 5 al inicio','Quita los 5'], correct:1, pts:10, explain:'append agrega al final (muta la lista, devuelve None).'},
    {type:'tf',   q:'M3 · <code>b = a.sort()</code> deja la lista ordenada en b.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'sort() devuelve None: ordena en su lugar. Para copia ordenada: sorted(a).'},
    {type:'mc',   q:'M3 · En <code>d = {\'a\': 1}</code>, <code>d.get(\'z\', 0)</code> devuelve…', options:['KeyError','None','0','\'z\''], correct:2, pts:10, explain:'get() devuelve el default (0) cuando la clave no existe.'},
    {type:'fill', q:'M3 · Método que entrega los pares (clave, valor) de un diccionario para recorrerlo: d.___()', accept:['items'], re:'^\\s*items\\s*;?\\s*$', pts:10, explain:'d.items() + desempaque: for k, v in d.items():'},
    {type:'mc',   q:'M3 · <code>a, b = b, a</code> sirve para…', options:['Borrar a y b','Comparar','Intercambiar valores','Duplicar'], correct:2, pts:10, explain:'El swap de Python con desempaque de tuplas, sin variable auxiliar.'},
    {type:'fill', q:'M4 · Palabra clave para DEFINIR una función:', accept:['def'], re:'^\\s*def\\s*;?\\s*$', pts:10, explain:'def nombre(parametros): + cuerpo indentado.'},
    {type:'mc',   q:'M4 · Una función sin <code>return</code> devuelve…', options:['0','None','\'\'','El último print'], correct:1, pts:10, explain:'Return implícito: None.'},
    {type:'mc',   q:'M5 · <code>def f(a, b=5):</code> — ¿cuál llamada falla?', options:['f(1)','f(1, 2)','f()','f(a=1, b=2)'], correct:2, pts:10, explain:'a es obligatorio: sin él hay TypeError.'},
    {type:'mc',   q:'M6 · <code>int(\'abc\')</code> lanza…', options:['TypeError','ValueError','KeyError','No lanza nada'], correct:1, pts:10, explain:'El TIPO es correcto (texto) pero el VALOR no se puede convertir: ValueError.'},
    {type:'fill', q:'M6 · Bloque que ATRAPA la excepción: ___ ValueError:', accept:['except'], re:'^\\s*except\\s*;?\\s*$', pts:10, explain:'try: … except ValueError: — el plan B sin morir.'},
    {type:'mc',   q:'M6 · <code>random.seed(7)</code> antes de dos tandas de randint…', options:['Produce números distintos siempre','Hace que la secuencia sea idéntica (reproducible)','Borra la memoria','Lanza error'], correct:1, pts:10, explain:'Misma semilla → misma secuencia: clave para probar y calificar.'},
    {type:'tf',   q:'M7 · <code>finally</code> se ejecuta solo si no hubo excepción.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'finally se ejecuta SIEMPRE: para eso existe.'},
    {type:'mc',   q:'M7 · En el proyecto, el inventario (varios libros con título/precio/stock) se modela mejor como…', options:['Un string largo','Una lista de diccionarios','Un int','Cinco variables sueltas'], correct:1, pts:10, explain:'Cada libro es un dict (registro con campos); el inventario es la lista de registros: como filas de una tabla SQL.'}
  ]
};
