/* ============================================================
   CURSO 5 PYTHON — CONTENIDO parte A (Módulos 0–3)
   Tareas pyex: {q, hint?, stdin?, wantVars?, check:{lines, vars?, expectError?}, solution, pts}
   Las soluciones corren con PYE y se califican por salida (gradeOutput).
   ============================================================ */
MODULES.push({
  id:'m0', emoji:'🐍', name:'Despega con Python', color:'#22c55e',
  desc:'Qué es Python, tu primer programa y cómo leer los errores sin miedo.',
  lessons:[

  /* -------- 0-1 -------- */
  { id:'0-1', title:'¿Qué es Python y tu primer programa?', time:'12 min', blocks:[
    {t:'p', h:'<b>Python</b> es el lenguaje más recomendado para empezar a programar: se lee casi como español, no necesitas punto y coma ni llaves, y es el estándar en <b>datos, IA, automatización y backend</b>. Es el complemento perfecto del curso anterior: SQL consulta los datos, <b>Python los procesa y les da superpoderes</b>.'},
    {t:'table', head:['¿Para qué se usa?','Ejemplo real','Librerías estrella'], rows:[
      ['Automatizar tareas','Renombrar 500 archivos en 3 segundos','Módulos estándar (os, shutil)'],
      ['Datos y análisis','Ventas del mes, gráficas, predicciones','pandas, numpy'],
      ['Inteligencia artificial','Chatbots, visión por computadora','PyTorch, scikit-learn'],
      ['Web y APIs','El servidor que recibe las consultas','Flask, Django, FastAPI']
    ]},
    {t:'p', h:'La línea más famosa del mundo en Python muestra texto en pantalla. <code>print()</code> es una <b>función</b>: recibe lo que le pases entre paréntesis y lo imprime. Los textos van entre comillas (<code>\'…\'</code> o <code>"…"</code>, da igual cuál):'},
    {t:'code', lang:'python', title:'hola.py — tu primer programa', code:`print('¡Hola, mundo!')
print('SQL + Python = poder')
print(2 + 3)          # también imprime números: 5`},
    {t:'info', title:'ℹ️ Python se ejecuta línea por línea', h:'A diferencia de una receta que se lee toda antes, Python ejecuta CADA línea en orden, de arriba hacia abajo. Si la línea 3 tiene un error, las líneas 1 y 2 ya se ejecutaron. Ese orden te sirve para razonar: ¿qué imprime la pantalla en este punto del programa?'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué imprime <code>print(2 + 3)</code>?', options:['2 + 3','5','23','Nada'], correct:1, pts:10, explain:'print evalúa la expresión primero: 2+3=5, imprime 5.'},
      {type:'mc', q:'Los textos en Python van entre…', options:['Paréntesis','Comillas simples o dobles','Llaves','No hace falta nada'], correct:1, pts:10, explain:'\'texto\' o "texto": ambas valen, solo sé consistente.'},
      {type:'tf', q:'Python ejecuta las líneas en orden, de arriba hacia abajo.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Es un lenguaje interpretado: línea a línea, en orden.'},
      {type:'mc', q:'¿Cuál de estos NO es un uso típico de Python?', options:['Automatizar tareas repetitivas','Analizar datos y hacer gráficas','Diseñar el logotipo de una empresa','Construir el servidor de una app'], correct:2, pts:10, explain:'El diseño gráfico no se programa: lo demás es territorio Python.'}
    ]},
    {t:'pyex', title:'🧪 Tus primeros 3 programas', tasks:[
      {q:'Imprime exactamente: <code>Hola, Python!</code> (sin acento en Hola, con signo de exclamación).', check:{lines:['Hola, Python!']}, solution:"print('Hola, Python!')", pts:20},
      {q:'Imprime tu resultado favorito: la suma de 7 + 25 (que Python la calcule, no la escribas tú).', hint:'print(7 + 25)', check:{lines:['32']}, solution:'print(7 + 25)', pts:20},
      {q:'Imprime estas DOS líneas:<br><code>Curso 5</code><br><code>Python desde cero</code>', hint:'Dos print, dos líneas.', check:{lines:['Curso 5','Python desde cero']}, solution:"print('Curso 5')\nprint('Python desde cero')", pts:20}
    ]}
  ]},

  /* -------- 0-2 -------- */
  { id:'0-2', title:'El laboratorio: ejecutar, equivocarse y leer errores', time:'12 min', blocks:[
    {t:'p', h:'En este curso <b>no instalas nada</b>: el editor corre un mini-interpreter de Python dentro de tu navegador. Escribe el programa, dale <b>▶ Ejecutar</b> y ves la salida real. Los ejercicios se califican por <b>SALIDA</b>: tu programa debe imprimir exactamente lo que se pide.'},
    {t:'p', h:'Cuando un programa falla, el motor te dice <b>qué pasó, en español y con número de línea</b>. El formato imita los errores reales de Python para que aprender aquí te sirva allá:'},
    {t:'code', lang:'txt', title:'anatomía de un error', code:`⚠️ Línea 3 · NameError: El nombre «mensage» no está definido.
¿Se escribió bien? ¿Se definió antes de usarlo?`},
    {t:'table', head:['Error','Causa típica','Arreglo'], rows:[
      ['<b>SyntaxError</b>','Falta «:», un paréntesis o comillas','Revisa la línea que te marca (y la anterior)'],
      ['<b>IndentationError</b>','La sangría del bloque no cuadra','4 espacios exactos por nivel'],
      ['<b>NameError</b>','Usas una variable que no existe','Revisa el nombre o defínela antes'],
      ['<b>TypeError</b>','Mezclas tipos: \'a\' + 1','Convierte con str() o int()'],
      ['<b>ValueError</b>','int(\'abc\') no se puede convertir','Valida la entrada antes'],
      ['<b>TimeoutError</b>','Ciclo infinito: while que nunca termina','Revisa la condición de salida']
    ]},
    {t:'warn', title:'⚠️ Los errores son el entrenamiento', h:'Nadie escribe programas perfectos la primera vez. Los programadores profesionales VIVEN corrigiendo errores: leer el mensaje, entender la causa, arreglar. Aquí equivocarse no cuesta nada y califica igual: inténtalo todo.'},
    {t:'pyex', title:'🧪 Practica: corre, rompe y arregla', tasks:[
      {q:'Este programa tiene un typo clásico: <code>pritn(\'hola\')</code>. Ejecútalo tal cual para VER el error… y luego corrígelo para que imprima <code>hola</code>.', hint:'La función se llama print.', check:{lines:['hola']}, solution:"print('hola')", pts:25},
      {q:'Provoca a propósito un <b>NameError</b>: imprime una variable que no hayas definido, por ejemplo <code>print(mensaje)</code>. La tarea se califica cuando el programa FALLA con NameError.', check:{expectError:'NameError'}, solution:'print(mensaje)', pts:25},
      {q:'Provoca un <b>TypeError</b> de verdad: <code>print(\'5\' + 5)</code> (texto más número). Se califica cuando falla con TypeError.', check:{expectError:'TypeError'}, solution:"print('5' + 5)", pts:25},
      {q:'El clásico de los clásicos: <code>int(\'abc\')</code> lanza <b>ValueError</b>. Provócalo (por ejemplo <code>print(int(\'abc\'))</code>).', check:{expectError:'ValueError'}, solution:"print(int('abc'))", pts:25}
    ]}
  ]}
]});

MODULES.push({
  id:'m1', emoji:'🔢', name:'Datos y variables', color:'#0ea5e9',
  desc:'print con estilo, variables, tipos, aritmética de Python y programas que conversan.',
  lessons:[

  /* -------- 1-1 -------- */
  { id:'1-1', title:'print() profesional: sep, end y comentarios', time:'12 min', blocks:[
    {t:'p', h:'<code>print()</code> acepta varios valores separados por comas (los une con un espacio) y dos ajustes finos: <code>sep</code> cambia el separador y <code>end</code> cambia lo que va AL FINAL (por defecto un salto de línea <code>\\n</code>). Los <b>comentarios</b> (#) son notas para humanos: Python los ignora.'},
    {t:'code', lang:'python', title:'print a la carta', code:`print('a', 'b', 'c')          # a b c
print('a', 'b', 'c', sep='-') # a-b-c
print('sin salto', end=' ')
print('continúa')             # una sola línea
# esto es un comentario: no se ejecuta
print(1)  # también al final de una línea`},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué imprime <code>print(1, 2, sep=\'\')</code>?', options:['1 2','12','1,2','Error'], correct:1, pts:10, explain:'sep=\'\' pega los valores sin espacio: 12.'},
      {type:'mc', q:'Por defecto, cada print termina con…', options:['Un espacio','Un punto','Un salto de línea','Nada'], correct:2, pts:10, explain:'end=\'\\n\': por eso cada print imprime en su propia línea.'},
      {type:'tf', q:'Los comentarios (# …) ralentizan mucho los programas.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Python los ignora por completo: son documentación gratis.'}
    ]},
    {t:'pyex', title:'🧪 Domina print', tasks:[
      {q:'Imprime la fecha de hoy de la clase separada con guiones: <code>2025-06-19</code> usando tres números y <code>sep=\'-\'</code>.', hint:'print(2025, 6, 19, sep=\'-\')', check:{lines:['2025-6-19']}, solution:"print(2025, 6, 19, sep='-')", pts:25},
      {q:'Imprime <code>ABRACADABRA</code> en una sola línea usando UN print por letra con <code>end=\'\'</code>.', hint:'print(\'A\', end=\'\') … así 11 veces (o dentro de un futuro ciclo 😉).', check:{lines:['ABRACADABRA']}, solution:"print('A', end='')\nprint('B', end='')\nprint('R', end='')\nprint('A', end='')\nprint('C', end='')\nprint('A', end='')\nprint('D', end='')\nprint('A', end='')\nprint('B', end='')\nprint('R', end='')\nprint('A', end='')\nprint()", pts:25},
      {q:'Con comentarios incluidos: imprime <code>Menú del día</code> y en la línea de arriba un comentario que diga <code># impresión del encabezado</code> (la salida esperada es solo la línea del menú).', check:{lines:['Menú del día']}, solution:"# impresión del encabezado\nprint('Menú del día')", pts:25},
      {q:'Imprime <code>x=10</code> y <code>y=20</code> en UNA sola línea con el formato <code>x=10 y=20</code> (un solo print, valores separados por comas).', hint:'print(\'x=10\', \'y=20\')', check:{lines:['x=10 y=20']}, solution:"print('x=10', 'y=20')", pts:25}
    ]}
  ]},

  /* -------- 1-2 -------- */
  { id:'1-2', title:'Variables: cajas con nombre', time:'12 min', blocks:[
    {t:'p', h:'Una <b>variable</b> es un nombre que apunta a un valor. Se crea con <code>nombre = valor</code> (el <code>=</code> aquí significa «asigna», no «es igual»). Python es flexible: la misma variable puede apuntar luego a otro valor de otro tipo — tú administras los nombres.'},
    {t:'code', lang:'python', title:'asignar, usar, reasignar', code:`nombre = 'Ada'
edad = 36
print(nombre, edad)   # Ada 36
edad = edad + 1       # recalcula con el valor actual
print(edad)           # 37
edad += 1             # atajo: igual que edad = edad + 1
print(edad)           # 38`},
    {t:'list', items:[
      'Nombres válidos: letras, números y <code>_</code> (sin empezar con número): <code>total_ventas</code>, <code>nombre2</code>.',
      'Convención Python: <b>snake_case</b> — minúsculas con guion bajo: <code>precio_final</code>, NO <code>precioFinal</code>.',
      'Atajos: <code>+= -= *= /= //= %= **=</code>',
      'El nombre debe describir el dato: <code>subtotal</code> mejor que <code>x2</code>.'
    ]},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Cuál nombre de variable es VÁLIDO y con buena convención?', options:['2do_precio','precio-final','PrecioFinal','precio_final'], correct:3, pts:10, explain:'snake_case, sin empezar con número, sin guiones.'},
      {type:'mc', q:'Después de <code>x = 5</code> y luego <code>x = \'hola\'</code>, x contiene…', options:['Error: no se puede cambiar el tipo','10','\'hola\'','5 y \'hola\' a la vez'], correct:2, pts:10, explain:'Las variables no tienen tipo fijo: apuntan al último valor asignado.'},
      {type:'mc', q:'<code>contador += 3</code> equivale a…', options:['contador = 3','contador = contador + 3','3 = contador','contador + 3'], correct:1, pts:10, explain:'+= suma al valor actual y reasigna.'}
    ]},
    {t:'pyex', title:'🧪 Practica variables', tasks:[
      {q:'Crea la variable <code>precio</code> con valor 150, súmale 30 con <code>+=</code> e imprímela.', check:{lines:['180']}, solution:'precio = 150\nprecio += 30\nprint(precio)', pts:25},
      {q:'Crea <code>base = 12</code> y <code>altura = 5</code>, calcula el área del rectángulo en <code>area</code> e imprime <code>area</code>.', hint:'área = base * altura', check:{lines:['60']}, solution:'base = 12\naltura = 5\narea = base * altura\nprint(area)', pts:25},
      {q:'Un cliente paga a 12 meses: crea <code>total = 8400</code> y calcula el pago mensual en <code>mensual</code> (división entera con <code>//</code>). Imprime <code>mensual</code>.', check:{lines:['700']}, solution:'total = 8400\nmensual = total // 12\nprint(mensual)', pts:25},
      {q:'Intercambia en dos pasos: empieza con <code>a = 1, b = 2</code>… y déjalas como <code>a = 2, b = 1</code> usando una variable auxiliar <code>temp</code>. Imprime <code>a, b</code> (salida: <code>2 1</code>).', hint:'temp = a; a = b; b = temp', check:{lines:['2 1']}, solution:'a = 1\nb = 2\ntemp = a\na = b\nb = temp\nprint(a, b)', pts:25}
    ]}
  ]},

  /* -------- 1-3 -------- */
  { id:'1-3', title:'Tipos de datos: int, float, str, bool, None', time:'14 min', blocks:[
    {t:'p', h:'Todo valor en Python tiene un <b>tipo</b>. Los cinco que usarás siempre: <code>int</code> (enteros), <code>float</code> (decimales), <code>str</code> (texto), <code>bool</code> (True/False) y <code>None</code> («nada», como el NULL de SQL). Con <code>type()</code> inspeccionas el tipo y con <code>int()/float()/str()</code> conviertes.'},
    {t:'code', lang:'python', title:'tipos y conversiones', code:`print(type(7), type(7.0), type('siete'), type(True))
# <class 'int'> <class 'float'> <class 'str'> <class 'bool'>

edad = input()        # input SIEMPRE devuelve texto
edad = int(edad)      # convierte el texto a entero
print(edad + 1)

print(int(3.99))      # 3  (trunca, no redondea)
print(float('2.5'))   # 2.5
print(str(12) + 'x')  # '12x'  (concatenar necesita texto)`},
    {t:'warn', title:'⚠️ \'5\' y 5 NO son lo mismo', h:'<code>\'5\' + 5</code> lanza <b>TypeError</b>: no puedes sumar texto con número. Y <code>\'5\' * 3</code> ¡sí funciona! pero repite el texto: <code>555</code>. Antes de operar, convierte: <code>int(\'5\') + 5</code> → 10.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué tipo tiene <code>3.0</code>?', options:['int','float','str','bool'], correct:1, pts:10, explain:'Con punto decimal es float, aunque valga entero.'},
      {type:'mc', q:'<code>int(\'3.7\')</code>…', options:['Devuelve 3','Devuelve 3.7','Devuelve 4','ValueError'], correct:3, pts:10, explain:'int() solo acepta texto de enteros (\'37\' sí, \'3.7\' no). Para 3.7: int(float(\'3.7\')).'},
      {type:'mc', q:'¿Qué imprime <code>print(int(9.99))</code>?', options:['10','9.99','9','Error'], correct:2, pts:10, explain:'int() TRUNCA hacia cero: 9.99 → 9 (no redondea).'},
      {type:'tf', q:'<code>input()</code> devuelve siempre texto (str), aunque el usuario escriba números.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Por eso casi siempre va envuelto: int(input()).'}
    ]},
    {t:'pyex', title:'🧪 Practica tipos', tasks:[
      {q:'Imprime el tipo de <code>17</code>, <code>17.5</code> y <code>\'17\'</code> en una línea: usa <code>type()</code> tres veces separadas por comas.', check:{lines:["<class 'int'> <class 'float'> <class 'str'>"]}, solution:"print(type(17), type(17.5), type('17'))", pts:25},
      {q:'Convierte el texto <code>\'250\'</code> a entero, súmale 50 e imprime el resultado.', check:{lines:['300']}, solution:"print(int('250') + 50)", pts:25},
      {q:'El precio <code>19.99</code> debe mostrarse como parte de un letrero: imprime <code>Total: 19.99 pesos</code> combinando str() y concatenación (sin f-strings todavía).', hint:'print(\'Total: \' + str(19.99) + \' pesos\')', check:{lines:['Total: 19.99 pesos']}, solution:"print('Total: ' + str(19.99) + ' pesos')", pts:25},
      {q:'Muestra que int() trunca: imprime el resultado de <code>int(7.999)</code>.', check:{lines:['7']}, solution:'print(int(7.999))', pts:25}
    ]}
  ]},

  /* -------- 1-4 -------- */
  { id:'1-4', title:'Aritmética de Python: / // % ** y precedencia', time:'14 min', blocks:[
    {t:'p', h:'Los 7 operadores numéricos, con DOS sorpresas para quien viene de otros lenguajes: <code>/</code> SIEMPRE da float (10/2 → 5.0) y <code>%</code> (residuo) sigue el signo del divisor (-7 % 2 → 1). El residuo es la herramienta #1 para «¿es par?», ciclos y relojes.'},
    {t:'code', lang:'python', title:'la aritmética completa', code:`print(10 / 4)    # 2.5   división real
print(10 // 4)   # 2     piso: descarta decimales
print(10 % 4)    # 2     residuo de la división
print(2 ** 8)    # 256   potencia
print(-7 // 2)   # -4    piso hacia -infinito
print(-7 % 2)    # 1     el residuo toma el signo del divisor
print(2 + 3 * 4) # 14    * y / antes que + y -
print((2 + 3) * 4) # 20  paréntesis primero`},
    {t:'table', head:['Quiero saber…','Operación','Ejemplo'], rows:[
      ['¿Es par?','<code>n % 2 == 0</code>','8 % 2 → 0 ✓'],
      ['¿Termina en 5?','<code>n % 10 == 5</code>','45 % 10 → 5 ✓'],
      ['Minutos a h:mm','<code>//</code> y <code>%</code>','130 // 60 → 2 h, 130 % 60 → 10 min'],
      ['Cada 3ro del ciclo','<code>i % 3 == 0</code>','0, 3, 6…']
    ]},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué imprime <code>print(10 / 2)</code>?', options:['5','5.0','2','Error'], correct:1, pts:10, explain:'/ siempre da float: 5.0.'},
      {type:'mc', q:'El residuo de <code>17 % 5</code> es…', options:['3','2','3.4','0'], correct:1, pts:10, explain:'17 = 5×3 + 2 → residuo 2.'},
      {type:'mc', q:'<code>2 + 3 * 2 ** 2</code> vale…', options:['20','14','100','10'], correct:0, pts:10, explain:'** primero: 3*4=12, +2 → 14… ¡ojo! ** gana: 2**2=4; 3*4=12; 2+12=14. Respuesta correcta: 14.'},
      {type:'tf', q:'<code>-7 // 2</code> da -3 en Python.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Da -4: el piso va hacia -infinito (otro lenguaje daría -3).'}
    ]},
    {t:'pyex', title:'🧪 Calcula como Python', tasks:[
      {q:'¿Cuántos minutos hay en 130 minutos expresados como horas enteras? Imprime <code>130 // 60</code> y en la segunda línea los minutos sobrantes <code>130 % 60</code>.', check:{lines:['2','10']}, solution:'print(130 // 60)\nprint(130 % 60)', pts:25},
      {q:'Imprime 2 elevado a la 10 (que Python lo calcule con **).', check:{lines:['1024']}, solution:'print(2 ** 10)', pts:25},
      {q:'Tres amigos pagan una cuenta de 1000: imprime lo que toca a cada uno con división real (saldrá 333.33…).', check:{lines:['333.3333333333333']}, solution:'print(1000 / 3)', pts:25},
      {q:'Prioridad de operadores en acción: imprime el resultado de <code>10 + 2 * 3</code> y en la segunda línea el de <code>(10 + 2) * 3</code>.', check:{lines:['16','36']}, solution:'print(10 + 2 * 3)\nprint((10 + 2) * 3)', pts:25}
    ]}
  ]},

  /* -------- 1-5 -------- */
  { id:'1-5', title:'input() y f-strings: programas que conversan', time:'14 min', blocks:[
    {t:'p', h:'<code>input()</code> pausa el programa y espera una línea del usuario (en este curso, la caja de «Entradas»). Devuelve SIEMPRE texto. Las <b>f-strings</b> incrustan valores dentro de texto con llaves: <code>f\'Hola, {nombre}\'</code> — la forma moderna y preferida de dar formato.'},
    {t:'code', lang:'python', title:'tu primer programa interactivo', code:`nombre = input('¿Cómo te llamas? ')   # el prompt se muestra
edad = int(input('¿Tu edad? '))        # convertir YA
print(f'Hola {nombre}, el próximo año tendrás {edad + 1}')`},
    {t:'info', title:'ℹ️ Ejecución con entradas', h:'En el editor del curso hay una caja «Entradas (una por línea)»: cada línea alimenta un input() en orden. Si tu programa pide 3 valores, configura 3 líneas. Si pide más de los que hay, verás <b>EOFError</b>: «ya no hay líneas de entrada».'},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>x = input()</code> con el usuario escribiendo 42 deja en x…', options:['42 (entero)','\'42\' (texto)','42.0','Nada'], correct:1, pts:10, explain:'input devuelve str. Para número: x = int(input()).'},
      {type:'mc', q:'¿Qué imprime <code>x = 3<br>print(f\'x vale {x * 2}\')</code>?', options:['x vale {x * 2}','x vale 6','x vale x*2','Error'], correct:1, pts:10, explain:'Dentro de las llaves se evalúa la expresión completa.'},
      {type:'tf', q:'El prefijo f es obligatorio para que las llaves se evalúen.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Sin f, las llaves son texto literal: sin f… {x} se imprime tal cual.'}
    ]},
    {t:'pyex', title:'🧪 Programas interactivos', tasks:[
      {q:'Con la entrada <code>Ana</code>: saluda con f-string: <code>¡Hola, Ana!</code>', stdin:['Ana'], check:{lines:['¡Hola, Ana!']}, solution:"nombre = input()\nprint(f'¡Hola, {nombre}!')", pts:25},
      {q:'Con las entradas <code>Ana</code> y <code>12</code>: imprime <code>Ana cumplirá 13</code> (suma 1 al año convertido a entero).', stdin:['Ana','12'], check:{lines:['Ana cumplirá 13']}, solution:"nombre = input()\nedad = int(input())\nprint(f'{nombre} cumplirá {edad + 1}')", pts:25},
      {q:'Con las entradas <code>8</code> y <code>5</code>: imprime su suma y su producto, cada una con formato <code>suma=13</code> y <code>producto=40</code>.', stdin:['8','5'], check:{lines:['suma=13','producto=40']}, solution:'a = int(input())\nb = int(input())\nprint(f"suma={a + b}")\nprint(f"producto={a * b}")', pts:25},
      {q:'Cajero: con la entrada <code>1350</code>, imprime cuántos billetes de 500 enteros se entregan (<code>//</code>) y cuánto sobra (<code>%</code>):<br><code>billetes=2</code><br><code>resto=350</code>', stdin:['1350'], check:{lines:['billetes=2','resto=350']}, solution:'monto = int(input())\nprint(f"billetes={monto // 500}")\nprint(f"resto={monto % 500}")', pts:25}
    ]}
  ]}
]});

MODULES.push({
  id:'m2', emoji:'🔀', name:'Decisiones y ciclos', color:'#8b5cf6',
  desc:'if/elif/else, comparaciones encadenadas, while, for con range y los saltos break/continue.',
  lessons:[

  /* -------- 2-1 -------- */
  { id:'2-1', title:'Comparaciones y lógica: True/False de verdad', time:'12 min', blocks:[
    {t:'p', h:'Las <b>comparaciones</b> producen valores booleanos: <code>==</code> (¿igual?), <code>!=</code> (¿distinto?), <code>&lt; &gt; &lt;= &gt;=</code>. Se combinan con <code>and</code>, <code>or</code> y <code>not</code> — en español, sin símbolos raros. Y Python tiene una joya: <b>comparaciones encadenadas</b> como en matemáticas: <code>0 &lt;= x &lt; 10</code>.'},
    {t:'code', lang:'python', title:'lógica legible', code:`edad = 20
saldo = 500
print(edad >= 18)          # True
print(edad >= 18 and saldo > 0)   # True y True → True
print(saldo < 100 or edad < 18)   # False or False → False
print(not (edad < 18))     # True
print(0 <= saldo <= 1000)  # encadenada: True
print('a' in 'gato')       # True: membresía en texto`},
    {t:'warn', title:'⚠️ = no es ==', h:'<code>=</code> ASIGNA (guarda), <code>==</code> COMPARA (pregunta). Confundirlos es el error clásico #1: <code>if x = 5:</code> es SyntaxError. Léelo en voz alta: «si x ES IGUAL a 5».'},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>print(5 > 3 and 3 > 7)</code> imprime…', options:['True','False','5','Error'], correct:1, pts:10, explain:'and exige ambas verdaderas: la segunda es falsa.'},
      {type:'mc', q:'<code>0 &lt;= x &lt; 10</code> equivale a…', options:['0 &lt;= x or x &lt; 10','0 &lt;= x and x &lt; 10','x == 0 and x == 10','Sintaxis inválida'], correct:1, pts:10, explain:'La cadena implica and entre ambas comparaciones.'},
      {type:'tf', q:'<code>=</code> y <code>==</code> son intercambiables.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Uno asigna, el otro compara: jamás se intercambian.'},
      {type:'mc', q:'<code>not True or True</code> vale…', options:['True (not va primero: False or True)','False','Error','None'], correct:0, pts:10, explain:'not se evalúa antes que or: False or True → True.'}
    ]},
    {t:'pyex', title:'🧪 Lógica en acción', tasks:[
      {q:'Imprime el resultado de: ¿20 es mayor o igual que 18 Y 500 mayor que 1000?', check:{lines:['False']}, solution:'print(20 >= 18 and 500 > 1000)', pts:25},
      {q:'Con la entrada <code>7</code>: imprime True o False según sea par. (Usa <code>n % 2 == 0</code>).', stdin:['7'], check:{lines:['False']}, solution:'n = int(input())\nprint(n % 2 == 0)', pts:25},
      {q:'Con la entrada <code>ana@mail.com</code>: imprime True si contiene <code>@</code> (usa <code>in</code>).', stdin:['ana@mail.com'], check:{lines:['True']}, solution:'correo = input()\nprint(\'@\' in correo)', pts:25},
      {q:'Encadenada: con la entrada <code>15</code>, imprime si está en el rango [10, 20) con UNA comparación encadenada.', stdin:['15'], check:{lines:['True']}, solution:'x = int(input())\nprint(10 <= x < 20)', pts:25}
    ]}
  ]},

  /* -------- 2-2 -------- */
  { id:'2-2', title:'if / elif / else: el programa decide', time:'14 min', blocks:[
    {t:'p', h:'<b>if</b> ejecuta su bloque SOLO si la condición es verdadera; <b>elif</b> (else if) encadena alternativas en orden; <b>else</b> es el «en cualquier otro caso». Lo que define qué pertenece al bloque es la <b>indentación</b>: 4 espacios. En Python la sangría ES la sintaxis.'},
    {t:'code', lang:'python', title:'la estructura decisoria completa', code:`calif = int(input())

if calif >= 90:
    print('Excelente')
elif calif >= 70:
    print('Aprobado')
elif calif >= 60:
    print('Suficiente')
else:
    print('Insuficiente')`},
    {t:'flow', flow:'ifelse'},
    {t:'warn', title:'⚠️ El orden de los elif importa', h:'Python evalúa de arriba hacia abajo y ENTRA AL PRIMERO que cumpla. Si pones <code>elif calif &gt;= 60</code> ANTES de <code>&gt;= 90</code>, un 95 entraría en «Suficiente» y jamás llegaría a «Excelente». Regla: condiciones de más estrictas a más laxas.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Qué imprime con <code>calif = 85</code> en el ejemplo de arriba?', options:['Excelente','Aprobado','Suficiente','Insuficiente'], correct:1, pts:10, explain:'85 &lt; 90 falla; 85 &gt;= 70 cumple → Aprobado.'},
      {type:'mc', q:'¿Cuántos bloques if/elif/else se ejecutan máximo en una cadena?', options:['Todos los que cumplan','Exactamente uno','Dos si hay else','Ninguno si no hay else'], correct:1, pts:10, explain:'Entra al primero que cumpla y sale de la cadena.'},
      {type:'tf', q:'En Python, la indentación es opcional: los bloques funcionan igual sin ella.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'La sangría define los bloques: sin ella hay IndentationError.'}
    ]},
    {t:'pyex', title:'🧪 El programa decide', tasks:[
      {q:'Con la entrada <code>15</code>: imprime <code>Mayor de edad</code> si la edad es 18+, o <code>Menor de edad</code> en otro caso.', stdin:['15'], check:{lines:['Menor de edad']}, solution:'edad = int(input())\nif edad >= 18:\n    print("Mayor de edad")\nelse:\n    print("Menor de edad")', pts:25},
      {q:'Par o impar: con la entrada <code>10</code>, imprime <code>10 es par</code> o <code>10 es impar</code> (f-string + %).', stdin:['10'], check:{lines:['10 es par']}, solution:'n = int(input())\nif n % 2 == 0:\n    print(f"{n} es par")\nelse:\n    print(f"{n} es impar")', pts:25},
      {q:'El mayor de dos: con las entradas <code>12</code> y <code>30</code>, imprime <code>El mayor es 30</code>.', stdin:['12','30'], check:{lines:['El mayor es 30']}, solution:'a = int(input())\nb = int(input())\nif a > b:\n    print(f"El mayor es {a}")\nelse:\n    print(f"El mayor es {b}")', pts:25},
      {q:'Escalera de calificación con la entrada <code>73</code>: usa EXACTAMENTE estas etiquetas: 90+ → <code>Excelente</code>, 70+ → <code>Aprobado</code>, 60+ → <code>Suficiente</code>, resto → <code>Insuficiente</code>.', stdin:['73'], check:{lines:['Aprobado']}, solution:'c = int(input())\nif c >= 90:\n    print("Excelente")\nelif c >= 70:\n    print("Aprobado")\nelif c >= 60:\n    print("Suficiente")\nelse:\n    print("Insuficiente")', pts:25}
    ]}
  ]},

  /* -------- 2-3 -------- */
  { id:'2-3', title:'while: repite mientras', time:'14 min', blocks:[
    {t:'p', h:'<b>while</b> repite su bloque MIENTRAS la condición sea verdadera. Dos piezas casi siempre presentes: un <b>contador</b> (i que crece) y un <b>acumulador</b> (total que suma). Y la regla de oro: algo dentro del ciclo debe cambiar la condición, o el ciclo NUNCA termina (loop infinito — el motor te lo avisará con TimeoutError).'},
    {t:'code', lang:'python', title:'los dos patrones madre', code:`# patrón 1: contador
i = 1
while i <= 5:
    print(i)
    i += 1        # sin esta línea: ciclo infinito

# patrón 2: acumulador
total = 0
i = 1
while i <= 10:
    total += i    # suma y guarda
    i += 1
print(total)      # 55`},
    {t:'flow', flow:'while'},
    {t:'srs', deck:'pycore', sub:'Fija los patrones de ciclos y decisiones con repetición espaciada.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Si olvidas <code>i += 1</code> dentro de un while con <code>i &lt;= 5</code>…', options:['El ciclo corre una vez','El ciclo no corre','Ciclo infinito','Error de sintaxis'], correct:2, pts:10, explain:'La condición nunca cambia: ciclo infinito (TimeoutError aquí).'},
      {type:'mc', q:'<code>total += i</code> es el patrón…', options:['Contador','Acumulador','Bandera','Centinela'], correct:1, pts:10, explain:'Acumula: total guarda la suma progresiva.'},
      {type:'tf', q:'La condición del while se evalúa ANTES de cada vuelta.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Si es falsa desde el inicio, el bloque nunca se ejecuta.'}
    ]},
    {t:'pyex', title:'🧪 Ciclos while', tasks:[
      {q:'Cuenta del 1 al 5, un número por línea (while).', check:{lines:['1','2','3','4','5']}, solution:'i = 1\nwhile i <= 5:\n    print(i)\n    i += 1', pts:25},
      {q:'Suma los números del 1 al 100 con while e imprime SOLO el total.', hint:'5050. Acumulador: total += i', check:{lines:['5050']}, solution:'total = 0\ni = 1\nwhile i <= 100:\n    total += i\n    i += 1\nprint(total)', pts:25},
      {q:'Cuenta regresiva del 3 al 1, una por línea, y al final imprime <code>¡Despegue!</code>', check:{lines:['3','2','1','¡Despegue!']}, solution:'i = 3\nwhile i >= 1:\n    print(i)\n    i -= 1\nprint("¡Despegue!")', pts:25},
      {q:'Ahorro: empiezas con <code>saldo = 100</code> y duplicas cada mes hasta superar 1000. Imprime cuántos meses tomaron (variable <code>meses</code>). Pista: while saldo &lt;= 1000.', check:{lines:['4']}, solution:'saldo = 100\nmeses = 0\nwhile saldo <= 1000:\n    saldo *= 2\n    meses += 1\nprint(meses)', pts:25}
    ]}
  ]},

  /* -------- 2-4 -------- */
  { id:'2-4', title:'for y range: repite N veces', time:'14 min', blocks:[
    {t:'p', h:'Cuando sabes CUÁNTAS veces repetir, <b>for</b> + <b>range()</b> es el camino: <code>range(5)</code> produce 0,1,2,3,4 (¡empieza en 0, el 5 no se incluye!). Con tres argumentos: <code>range(inicio, fin, paso)</code> — y el paso puede ser negativo para contar hacia atrás.'},
    {t:'code', lang:'python', title:'las 4 caras de range', code:`for i in range(3):        print(i)   # 0 1 2
for i in range(1, 4):     print(i)   # 1 2 3
for i in range(0, 10, 2): print(i)   # 0 2 4 6 8
for i in range(3, 0, -1): print(i)   # 3 2 1

# el for también recorre TEXTO letra por letra
for letra in 'hola':
    print(letra)`},
    {t:'info', title:'ℹ️ range(fin) es medio-abierto', h:'range(1, 5) → 1,2,3,4: el fin NUNCA se incluye. Es la misma lógica de los slices de listas que verás en el Módulo 3, y la razón por la que range(1, 101) suma 1..100 sin llegar a 101.'},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>range(4)</code> produce…', options:['1,2,3,4','0,1,2,3,4','0,1,2,3','4'], correct:2, pts:10, explain:'Empieza en 0 y el fin no se incluye.'},
      {type:'mc', q:'¿Cuántas veces se ejecuta <code>for i in range(2, 9):</code>?', options:['7','9','6','8'], correct:0, pts:10, explain:'2..8 inclusive: 7 vueltas.'},
      {type:'mc', q:'Para contar 10, 9, 8… 1 se usa…', options:['range(10, 0)','range(1, 10)','range(10, 0, -1)','range(-10)'], correct:2, pts:10, explain:'Paso negativo -1: desde 10 hasta llegar a 1 (0 excluido).'}
    ]},
    {t:'pyex', title:'🧪 For y range', tasks:[
      {q:'Imprime la tabla de multiplicar del 5 (del 5x1 al 5x5), una por línea, formato <code>5 x 1 = 5</code>.', check:{lines:['5 x 1 = 5','5 x 2 = 10','5 x 3 = 15','5 x 4 = 20','5 x 5 = 25']}, solution:'for i in range(1, 6):\n    print(f"5 x {i} = {5 * i}")', pts:25},
      {q:'Suma los números PARES del 2 al 98 con for+range y imprime solo el total.', hint:'range(2, 100, 2)', check:{lines:['2450']}, solution:'total = 0\nfor i in range(2, 100, 2):\n    total += i\nprint(total)', pts:25},
      {q:'Con la entrada <code>4</code>: imprime esa cantidad de asteriscos en una línea: <code>****</code> (usa print(\'*\', end=\'\') dentro del for y un print() final).', stdin:['4'], check:{lines:['****']}, solution:'n = int(input())\nfor i in range(n):\n    print("*", end="")\nprint()', pts:25},
      {q:'Cuenta regresiva con for: del 5 al 1, una por línea, y al final <code>¡Listo!</code>', check:{lines:['5','4','3','2','1','¡Listo!']}, solution:'for i in range(5, 0, -1):\n    print(i)\nprint("¡Listo!")', pts:25}
    ]}
  ]},

  /* -------- 2-5 -------- */
  { id:'2-5', title:'break, continue y centinelas', time:'14 min', blocks:[
    {t:'p', h:'Dos saltos controlan los ciclos por dentro: <b>break</b> sale del ciclo INMEDIATAMENTE; <b>continue</b> salta a la siguiente vuelta. Con ellos se escriben los patrones profesionales: «buscar el primero que cumpla» (break) y «procesar solo algunos» (continue).'},
    {t:'code', lang:'python', title:'buscar y filtrar', code:`# buscar el primer múltiplo de 7
for n in range(1, 100):
    if n % 7 == 0:
        print(n)   # 7
        break      # ya lo encontré: no sigas

# imprimir solo impares
for n in range(10):
    if n % 2 == 0:
        continue   # salta los pares
    print(n, end=' ')   # 1 3 5 7 9
print()`},
    {t:'info', title:'ℹ️ else en ciclos', h:'Los ciclos en Python admiten <b>else</b>: se ejecuta solo si el ciclo terminó SIN break. Es el patrón «búscalo y si no estaba, dímelo»: for … else: print("no encontrado"). Único en Python, útil de vez en cuando.'},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>break</code>…', options:['Reinicia el ciclo','Salta una vuelta','Termina el ciclo completo','Termina el programa'], correct:2, pts:10, explain:'Sale del ciclo; el programa sigue en la línea siguiente.'},
      {type:'mc', q:'<code>continue</code>…', options:['Termina el ciclo','Salta a la siguiente vuelta','Pausa el ciclo','Reinicia el contador'], correct:1, pts:10, explain:'Abandona la vuelta actual y sigue con la siguiente.'},
      {type:'tf', q:'break dentro de dos ciclos anidados sale de los dos.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'Solo sale del ciclo MÁS interno.'}
    ]},
    {t:'pyex', title:'🧪 Saltos inteligentes', tasks:[
      {q:'Del 1 al 100, imprime el PRIMER múltiplo de 11 y detente (una sola línea de salida).', check:{lines:['11']}, solution:'for n in range(1, 101):\n    if n % 11 == 0:\n        print(n)\n        break', pts:25},
      {q:'Imprime los números del 1 al 10 EXCEPTO el 7, uno por línea (usa continue).', check:{lines:['1','2','3','4','5','6','8','9','10']}, solution:'for n in range(1, 11):\n    if n == 7:\n        continue\n    print(n)', pts:25},
      {q:'Con la entrada <code>python</code>: imprime la palabra SIN vocales, todo en una línea (continue al encontrar vocal, print(c, end=\'\')).', stdin:['python'], check:{lines:['pythn']}, solution:'palabra = input()\nfor c in palabra:\n    if c in "aeiou":\n        continue\n    print(c, end="")\nprint()', pts:25},
      {q:'Validador: con las entradas <code>3</code>, <code>12</code>, <code>9</code>, <code>25</code>, <code>0</code>: imprime los números HASTA que aparezca un 0 (el 0 termina, no se imprime).', stdin:['3','12','9','25','0'], check:{lines:['3','12','9','25']}, solution:'for i in range(5):\n    n = int(input())\n    if n == 0:\n        break\n    print(n)', pts:25}
    ]}
  ]}
]});

MODULES.push({
  id:'m3', emoji:'📦', name:'Estructuras de datos', color:'#f97316',
  desc:'Listas con todo y slicing, diccionarios para datos reales, tuplas y desempaque.',
  lessons:[

  /* -------- 3-1 -------- */
  { id:'3-1', title:'Listas I: la estructura reina', time:'14 min', blocks:[
    {t:'p', h:'Una <b>lista</b> guarda varios valores EN ORDEN: <code>[10, 20, 30]</code>. Se numera desde <b>0</b> (como casi todo en programación) y los índices negativos cuentan desde el final (-1 es el último). <code>len()</code> da el tamaño. La lista es mutable: puedes cambiar su contenido.'},
    {t:'code', lang:'python', title:'indexar y medir', code:`ventas = [250, 480, 190, 620]
print(ventas[0])    # 250  el primero
print(ventas[2])    # 190  (¡el índice 2 es el TERCER elemento!)
print(ventas[-1])   # 620  el último
print(len(ventas))  # 4
ventas[1] = 500     # mutable: cambiar un elemento
print(ventas)       # [250, 500, 190, 620]`},
    {t:'warn', title:'⚠️ IndexError: el error más común del mundo', h:'Con 4 elementos, los índices válidos son 0, 1, 2, 3. <code>ventas[4]</code> lanza <b>IndexError</b> — y el mensaje te dice exactamente qué pasó. El último índice SIEMPRE es len(lista) - 1.'},
    {t:'quiz', questions:[
      {type:'mc', q:'En <code>[\'a\', \'b\', \'c\']</code>, ¿qué índice tiene \'c\'?', options:['3','1','2','-1 sólo'], correct:2, pts:10, explain:'Se numera desde 0: a=0, b=1, c=2 (y -1 también lo señala).'},
      {type:'mc', q:'<code>len([3, 1, 4, 1, 5])</code> vale…', options:['5','4','15','3'], correct:0, pts:10, explain:'len cuenta elementos, no suma valores.'},
      {type:'tf', q:'<code>lista[0]</code> y <code>lista[-len(lista)]</code> señalan el mismo elemento.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'-len es el primero contando desde el final: coincide con el índice 0.'}
    ]},
    {t:'pyex', title:'🧪 Indexa listas', tasks:[
      {q:'Con la lista <code>notas = [85, 90, 78]</code>: imprime la primera, la última y el tamaño, cada uno en una línea.', check:{lines:['85','78','3']}, solution:'notas = [85, 90, 78]\nprint(notas[0])\nprint(notas[-1])\nprint(len(notas))', pts:25},
      {q:'Corrige el segundo elemento: parte de <code>precios = [100, 250, 300]</code>, cambia el 250 por 275 e imprime la lista completa.', check:{lines:['[100, 275, 300]']}, solution:'precios = [100, 250, 300]\nprecios[1] = 275\nprint(precios)', pts:25},
      {q:'Suma manual: con <code>v = [10, 20, 30, 40]</code>, suma el primero + el último + el del medio usando índices (sin sum()) e imprime.', check:{lines:['80']}, solution:'v = [10, 20, 30, 40]\nprint(v[0] + v[-1] + v[2])', pts:25},
      {q:'Lista de listas: con <code>m = [[1, 2], [3, 4], [5, 6]]</code> imprime el número 4 (doble índice).', check:{lines:['4']}, solution:'m = [[1, 2], [3, 4], [5, 6]]\nprint(m[1][1])', pts:25}
    ]}
  ]},

  /* -------- 3-2 -------- */
  { id:'3-2', title:'Listas II: métodos y slicing', time:'15 min', blocks:[
    {t:'p', h:'Las listas traen <b>métodos</b> (funciones que se llaman con punto): <code>append</code> agrega al final, <code>insert</code> en posición, <code>pop</code> quita y DEVUELVE, <code>remove</code> quita por valor, <code>sort</code> ordena en su lugar. Y el <b>slicing</b> <code>a[inicio:fin:paso]</code> corta porciones (el fin no se incluye) — <code>a[::-1]</code> invierte.'},
    {t:'code', lang:'python', title:'la caja de herramientas', code:`a = [30, 10, 20]
a.append(40)      # [30, 10, 20, 40]
a.insert(0, 5)    # [5, 30, 10, 20, 40]
x = a.pop()       # quita y devuelve 40
a.remove(10)      # [5, 30, 20]
a.sort()          # [5, 20, 30]  ordena EN la lista
print(a, x)

b = [0, 1, 2, 3, 4, 5]
print(b[1:4])     # [1, 2, 3]   fin NO incluido
print(b[:3])      # [0, 1, 2]
print(b[3:])      # [3, 4, 5]
print(b[::2])     # [0, 2, 4]   paso 2
print(b[::-1])    # [5, 4, 3, 2, 1, 0]  invertida`},
    {t:'warn', title:'⚠️ sort() no devuelve la lista', h:'<code>a.sort()</code> ordena EN su lugar y devuelve None. Escribir <code>b = a.sort()</code> pone None en b. Para obtener una copia ordenada: <code>sorted(a)</code>. Misma idea: append/insert/pop también devuelven None (salvo pop).'},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>[10, 20, 30][1:3]</code> es…', options:['[10, 20]','[20, 30]','[20, 30, ...]','[10, 20, 30]'], correct:1, pts:10, explain:'Desde el índice 1 hasta el 3 SIN incluirlo: [20, 30].'},
      {type:'mc', q:'Para agregar 99 al final de <code>a</code>…', options:['a.add(99)','a.append(99)','a.insert(99)','append(a, 99)'], correct:1, pts:10, explain:'append agrega al final; insert(pos, v) necesita posición.'},
      {type:'mc', q:'<code>b = a.sort()</code> deja en b…', options:['La lista ordenada','None','Una copia de a','Error'], correct:1, pts:10, explain:'sort ordena en su lugar y devuelve None. Usa sorted(a) para copia.'},
      {type:'tf', q:'<code>[1, 2, 3, 4][::-1]</code> da [4, 3, 2, 1].', options:['Verdadero','Falso'], correct:0, pts:10, explain:'Paso -1 recorre al revés: la lista invertida.'}
    ]},
    {t:'pyex', title:'🧪 Métodos y cortes', tasks:[
      {q:'Construye <code>[\'pan\', \'leche\', \'café\']</code> empezando con una lista vacía y tres append; imprímela.', check:{lines:["['pan', 'leche', 'café']"]}, solution:"carrito = []\ncarrito.append('pan')\ncarrito.append('leche')\ncarrito.append('café')\nprint(carrito)", pts:25},
      {q:'De <code>[8, 3, 15, 1, 9]</code> obtén el TOP-3 con sorted y slicing: imprime <code>[15, 9, 8]</code> (ordenados descendente, primeros 3).', hint:'sorted(lista, reverse=True)[:3]', check:{lines:['[15, 9, 8]']}, solution:'datos = [8, 3, 15, 1, 9]\nprint(sorted(datos, reverse=True)[:3])', pts:25},
      {q:'Con <code>a = [1, 2, 3, 4, 5]</code>: quita el último con pop (guárdalo en <code>x</code>), imprime <code>x</code> y luego la lista.', check:{lines:['5','[1, 2, 3, 4]']}, solution:'a = [1, 2, 3, 4, 5]\nx = a.pop()\nprint(x)\nprint(a)', pts:25},
      {q:'Palabra al revés: con la entrada <code>libro</code>, imprime <code>orbil</code> usando slicing.', stdin:['libro'], check:{lines:['orbil']}, solution:'p = input()\nprint(p[::-1])', pts:25}
    ]}
  ]},

  /* -------- 3-3 -------- */
  { id:'3-3', title:'Recorrer listas: for, enumerate y agregados', time:'14 min', blocks:[
    {t:'p', h:'El <b>for</b> recorre la lista elemento por elemento — sin índices, directo. Si necesitas también la posición, <code>enumerate(lista)</code> entrega pares (índice, valor). Y los agregados built-in resumen sin ciclo: <code>sum</code>, <code>min</code>, <code>max</code> (con <code>in</code> preguntas si algo está).'},
    {t:'code', lang:'python', title:'tres formas de recorrer', code:`ventas = [250, 480, 190]

for v in ventas:            # directo
    print(v)

for i, v in enumerate(ventas, 1):   # con posición (desde 1)
    print(i, v)             # 1 250 / 2 480 / 3 190

print(sum(ventas), max(ventas), min(ventas))  # 920 480 190
print(480 in ventas, 999 in ventas)           # True False`},
    {t:'quiz', questions:[
      {type:'mc', q:'<code>for v in [10, 20]:</code> — en la 2.ª vuelta v vale…', options:['0','1','10','20'], correct:3, pts:10, explain:'El for entrega los VALORES: primera vuelta 10, segunda 20.'},
      {type:'mc', q:'<code>enumerate([\'a\',\'b\'])</code> entrega pares…', options:['(1,\'a\'), (2,\'b\')','(\'a\',1), (\'b\',2)','(0,\'a\'), (1,\'b\')','Solo índices'], correct:2, pts:10, explain:'(índice, valor), con índice desde 0 (salvo que pases inicio).'},
      {type:'tf', q:'<code>sum([])</code> devuelve 0.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'La suma de nada es 0 (min/max sí lanzan ValueError en vacío).'}
    ]},
    {t:'pyex', title:'🧪 Recorridos y resúmenes', tasks:[
      {q:'Con <code>ventas = [250, 480, 190]</code>: imprime cada venta multiplicada por 2, una por línea.', check:{lines:['500','960','380']}, solution:'ventas = [250, 480, 190]\nfor v in ventas:\n    print(v * 2)', pts:25},
      {q:'Con <code>notas = [7, 9, 8, 10, 6]</code>: imprime el promedio (sum / len) — saldrá 8.0.', check:{lines:['8.0']}, solution:'notas = [7, 9, 8, 10, 6]\nprint(sum(notas) / len(notas))', pts:25},
      {q:'Lista numerada: con <code>[\'pan\', \'café\']</code> usa enumerate (desde 1) e imprime <code>1. pan</code> y <code>2. café</code>.', check:{lines:['1. pan','2. café']}, solution:'items = ["pan", "café"]\nfor i, it in enumerate(items, 1):\n    print(f"{i}. {it}")', pts:25},
      {q:'¿Está?: con la entrada <code>480</code> y <code>ventas = [250, 480, 190]</code>, imprime <code>Sí está</code> o <code>No está</code> usando in.', stdin:['480'], check:{lines:['Sí está']}, solution:'ventas = [250, 480, 190]\nn = int(input())\nif n in ventas:\n    print("Sí está")\nelse:\n    print("No está")', pts:25}
    ]}
  ]},

  /* -------- 3-4 -------- */
  { id:'3-4', title:'Diccionarios: datos con nombre y apellido', time:'15 min', blocks:[
    {t:'p', h:'Un <b>diccionario</b> guarda pares <b>clave: valor</b> — como el JSON de las APIs y las filas con nombre de una tabla SQL. Accedes por clave, no por posición: <code>producto[\'precio\']</code>. Con <code>.get()</code> consultas sin riesgo de KeyError, con <code>in</code> preguntas si existe la clave, y <code>.items()</code> entrega los pares para recorrerlos.'},
    {t:'code', lang:'python', title:'el diario de un dict', code:`producto = {'nombre': 'Té verde', 'precio': 85, 'stock': 12}
print(producto['nombre'])        # Té verde
print(producto.get('caducidad')) # None (sin error)
print(producto.get('caducidad', 'N/D'))  # N/D

producto['stock'] += 5           # actualizar
producto['origen'] = 'Chiapas'   # agregar clave nueva
del producto['origen']           # borrar
print('precio' in producto)      # True (pregunta por CLAVES)

for clave, valor in producto.items():
    print(clave, '=', valor)`},
    {t:'warn', title:'⚠️ [] con clave inexistente = KeyError', h:'<code>producto[\'no_existe\']</code> lanza <b>KeyError</b>. Si no estás seguro de que la clave existe: <code>.get(clave)</code> devuelve None (o el default que le des). En el proyecto final usaremos .get() para búsquedas que pueden fallar.'},
    {t:'quiz', questions:[
      {type:'mc', q:'¿Cómo lees el precio de <code>p = {\'precio\': 85}</code>?', options:['p[0]','p(85)','p[\'precio\']','p.precio'], correct:2, pts:10, explain:'Por clave entre corchetes (no por posición: los dicts no tienen orden posicional para leer).'},
      {type:'mc', q:'<code>d.get(\'x\')</code> cuando \'x\' no existe devuelve…', options:['0','\'\'','None','KeyError'], correct:2, pts:10, explain:'None por defecto; con .get(\'x\', default) devuelve el default.'},
      {type:'mc', q:'<code>for k, v in d.items():</code> — k y v reciben…', options:['índice y valor','clave y valor','clave y posición','dos claves'], correct:1, pts:10, explain:'items() entrega pares (clave, valor): el desempaque del M3-5 en acción.'},
      {type:'tf', q:'<code>\'clave\' in d</code> pregunta si la clave existe en el diccionario.', options:['Verdadero','Falso'], correct:0, pts:10, explain:'in sobre dicts mira las CLAVES (no los valores).'}
    ]},
    {t:'pyex', title:'🧪 Domina los dicts', tasks:[
      {q:'Crea el diccionario <code>libro</code> con <code>titulo=\'El Aleph\'</code> y <code>precio=210</code>; imprime el título y el precio, cada uno en una línea.', check:{lines:['El Aleph','210']}, solution:"libro = {'titulo': 'El Aleph', 'precio': 210}\nprint(libro['titulo'])\nprint(libro['precio'])", pts:25},
      {q:'Parte de <code>stock = {\'lapiz\': 10}</code>: vende 3 lápices (resta con -=), agrega <code>pluma: 7</code> e imprime el diccionario completo.', check:{lines:["{'lapiz': 7, 'pluma': 7}"]}, solution:"stock = {'lapiz': 10}\nstock['lapiz'] -= 3\nstock['pluma'] = 7\nprint(stock)", pts:25},
      {q:'Con <code>cliente = {\'nombre\': \'Ana\', \'vip\': True}</code>: imprime <code>telefono</code> con .get() y default <code>\'no registrado\'</code> — la salida es solo esa línea.', check:{lines:['no registrado']}, solution:"cliente = {'nombre': 'Ana', 'vip': True}\nprint(cliente.get('telefono', 'no registrado'))", pts:25},
      {q:'Recorre <code>precios = {\'café\': 95, \'té\': 70}</code> con .items() e imprime <code>café cuesta 95</code> y <code>té cuesta 70</code>.', check:{lines:['café cuesta 95','té cuesta 70']}, solution:"precios = {'café': 95, 'té': 70}\nfor prod, precio in precios.items():\n    print(f'{prod} cuesta {precio}')", pts:25}
    ]}
  ]},

  /* -------- 3-5 -------- */
  { id:'3-5', title:'Tuplas, desempaque y el swap elegante', time:'13 min', blocks:[
    {t:'p', h:'Una <b>tupla</b> es como una lista pero INMUTABLE: <code>(85, 90)</code> — ideal para registros fijos (coordenadas, RGB, notas de un examen). Su superpoder es el <b>desempaque</b>: asignar varios valores de golpe — incluido el swap de una línea: <code>a, b = b, a</code>.'},
    {t:'code', lang:'python', title:'empaquetar y desempaquetar', code:`punto = (3, 4)         # tupla: paréntesis
x, y = punto           # desempaque
print(x + y)           # 7

a, b = 1, 2            # asignación múltiple
a, b = b, a            # ¡swap sin auxiliar!
print(a, b)            # 2 1

for nombre, precio in [('té', 70), ('café', 95)]:
    print(nombre, precio)   # recorrer pares`},
    {t:'info', title:'ℹ️ ¿Cuándo tupla y cuándo lista?', h:'Lista: colección que cambia (carrito, resultados que crecen). Tupla: registro fijo con sentido posicional («la posición 0 es x, la 1 es y») y protección contra modificaciones accidentales. Las claves de diccionario pueden ser tuplas, jamás listas.'},
    {t:'quiz', questions:[
      {type:'mc', q:'Diferencia clave entre tupla y lista…', options:['La tupla es más lenta','La tupla no se puede modificar','La lista no admite números','No hay diferencia'], correct:1, pts:10, explain:'Inmutabilidad: la tupla nace y muere con sus valores.'},
      {type:'mc', q:'Después de <code>a, b = 10, 20</code>…', options:['a=10, b=20','a=20, b=10','Error','a=10, b=10'], correct:0, pts:10, explain:'Asignación en paralelo: cada nombre toma su posición.'},
      {type:'tf', q:'<code>x, y = (1, 2, 3)</code> funciona sin error.', options:['Verdadero','Falso'], correct:1, pts:10, explain:'ValueError: 2 nombres para 3 valores — el desempaque exige cantidades iguales.'}
    ]},
    {t:'pyex', title:'🧪 Tuplas al poder', tasks:[
      {q:'Con <code>punto = (10, 20)</code>: desempaqueta en <code>x</code> e <code>y</code> e imprime <code>x+y=30</code> con f-string.', check:{lines:['x+y=30']}, solution:'punto = (10, 20)\nx, y = punto\nprint(f"x+y={x + y}")', pts:25},
      {q:'Swap de una línea: con <code>a = 5, b = 9</code> (asignación múltiple), intercámbialas con desempaque e imprime <code>a, b</code>.', check:{lines:['9 5']}, solution:'a, b = 5, 9\na, b = b, a\nprint(a, b)', pts:25},
      {q:'Recorre <code>ventas = [("ene", 200), ("feb", 350)]</code> con desempaque en el for e imprime <code>ene: 200</code> y <code>feb: 350</code>.', check:{lines:['ene: 200','feb: 350']}, solution:'ventas = [("ene", 200), ("feb", 350)]\nfor mes, monto in ventas:\n    print(f"{mes}: {monto}")', pts:25},
      {q:'Retorno doble: crea la función <code>minmax(nums)</code> que devuelva UNA tupla (min, max); con <code>[4, 1, 9]</code> desempaqueta e imprime <code>min=1</code> y <code>max=9</code>.', hint:'return min(nums), max(nums) — sí, un return puede devolver dos valores.', check:{lines:['min=1','max=9']}, solution:'def minmax(nums):\n    return min(nums), max(nums)\nlo, hi = minmax([4, 1, 9])\nprint(f"min={lo}")\nprint(f"max={hi}")', pts:25}
    ]},
    {t:'srs', deck:'pycore', sub:'Conceptos de estructuras de datos: repaso espaciado de listas, dicts y tuplas.'}
  ]}
]});
