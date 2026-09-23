/* ============================================================
   CURSO 5 PYTHON · LIBRO DE TEXTO (9 capítulos)
   Bibliografía verificada: ver capítulo 9.
   ============================================================ */
const TEXTBOOK = [
  { n:1, emoji:'🐍', short:'Qué es Python', title:'Python: historia y por qué ganó', time:'10 min', blocks:[
    {t:'p', h:'Python nació en 1991 como el proyecto de fin de semana de <b>Guido van Rossum</b> (nombre prestado de los Monty Python). Su idea radical: un lenguaje que un humano pudiera LEER. Treinta años después es el lenguaje #1 para datos, IA y enseñanza, y el segundo «idioma oficial» de Google, Netflix, NASA e Instagram.'},
    {t:'table', head:['Año','Hito','Por qué importa'], rows:[
      ['1991','Guido publica Python 0.9','La legibilidad como filosofía'],
      ['2000','Python 2','Crecimiento masivo en la web'],
      ['2008','Python 3 (rompe compatibilidad)','Limpieza de diseño: el que aprendes aquí'],
      ['2010s','pandas, numpy, scikit-learn','El reinado en datos y ciencia'],
      ['2020s','IA generativa (PyTorch, LLMs)','El lenguaje de la IA']
    ]},
    {t:'info', title:'ℹ️ CPython: el motor real', h:'El «Python de verdad» es un programa llamado CPython que lee tu archivo línea por línea (¡igual que el mini-interpreter de este curso!), lo compila a bytecode y lo ejecuta. Existen alternativas (PyPy, MicroPython para microcontroladores), pero todas hablan el mismo lenguaje.'},
    {t:'p', h:'La filosofía del lenguaje cabe en 19 líneas que ves al ejecutar <code>import this</code> — «Beautiful is better than ugly», «Readability counts». No es poesía: es la especificación de por qué el código Python se escribe como se escribe.'}
  ]},

  { n:2, emoji:'💻', short:'Python real en tu computadora', title:'Del navegador a tu computadora', time:'12 min', blocks:[
    {t:'p', h:'El interpreter de este curso vive en tu navegador; el día que quieras dar el salto, instalar Python real toma 5 minutos y todo lo que aprendiste traslada 1 a 1.'},
    {t:'list', items:[
      '<b>1. Descarga</b> la versión 3.x desde <code>python.org/downloads</code> (marca «Add Python to PATH» en Windows).',
      '<b>2. Verifica</b> en una terminal: <code>python --version</code> (o <code>python3</code> en Mac/Linux).',
      '<b>3. Escribe</b> tu primer archivo <code>hola.py</code> con <code>print(\'Hola\')</code> y córrelo: <code>python hola.py</code>.',
      '<b>4. Editor recomendado:</b> VS Code (gratis) con la extensión oficial de Python: resaltado, autocompletado y depurador.',
      '<b>5. El REPL:</b> escribe <code>python</code> sin archivo y tendrás una consola interactiva para probar expresiones al vuelo (como el playground del curso).'
    ]},
    {t:'warn', title:'⚠️ python vs python3', h:'En Windows el comando es <code>python</code>; en Mac/Linux suele ser <code>python3</code> (porque aún existe un python 2 prehistórico del sistema). Si un tutorial dice <code>pip install</code> y no funciona, prueba <code>python -m pip install</code>.'},
    {t:'p', h:'En Python real los <b>errores aparecen como tracebacks</b>: la lista de líneas que llevaron al fallo. Aprende a leerlos de abajo hacia arriba: la última línea da el tipo y mensaje (los mismos que este curso te muestra en español), y arriba está el archivo y número de línea.'}
  ]},

  { n:3, emoji:'🔢', short:'Tipos y operadores', title:'Referencia rápida: tipos y operadores', time:'12 min', blocks:[
    {t:'table', head:['Tipo','Ejemplos','Notas'], rows:[
      ['int','42, -7, 0','Enteros ilimitados (¡sin overflow!)'],
      ['float','3.14, 2.0e3','Decimales binarios: 0.1+0.2 ≠ 0.3 exacto'],
      ['str','\'hola\', "mundo"','Inmutable; indexable; sliceable'],
      ['bool','True, False','Subclase de int: True == 1'],
      ['NoneType','None','La ausencia de valor (como NULL de SQL)'],
      ['list','[1, 2, 3]','Ordenada, mutable'],
      ['tuple','(1, 2)','Ordenada, inmutable'],
      ['dict','{\'a\': 1}','Clave→valor, insertion-ordered']
    ]},
    {t:'table', head:['Operador','Nombre','Detalle que sorprende'], rows:[
      ['/','división real','Siempre float: 10/2 → 5.0'],
      ['//','piso','Hacia -infinito: -7//2 → -4'],
      ['%','residuo','Signo del divisor: -7%2 → 1'],
      ['**','potencia','Gana sobre el menos unario: -2**2 → -4'],
      ['in','membresía','\'a\' in \'gato\' → True'],
      ['== vs is','igualdad vs identidad','== compara valores; is compara objetos (usa is solo con None)']
    ]},
    {t:'code', lang:'python', title:'conversiones seguras', code:`print(int('42'), float('2.5'), str(99))   # 42 2.5 99
print(int(3.99))      # 3  (trunca hacia cero)
print(round(2.5), round(3.5))  # 2 4  (redondeo bancario: al par)
print(round(3.14159, 2))       # 3.14`},
    {t:'info', title:'ℹ️ El redondeo bancario', h:'Python 3 redondea .5 al entero PAR más cercano (round(2.5)→2, round(3.5)→4). Elimina el sesgo acumulativo de «siempre arriba». Es estándar en finanzas; sorprende a quien viene de otros lenguajes.'}
  ]},

  { n:4, emoji:'🔀', short:'Control de flujo', title:'if, while y for: patrones madre', time:'13 min', blocks:[
    {t:'p', h:'Tres estructuras cubren todo el control de flujo que usarás el 95% del tiempo. Sus patrones canónicos:'},
    {t:'code', lang:'python', title:'los patrones que verás mil veces', code:`# 1) decisión en cadena (de más estricto a más laxo)
if n >= 90:    print('A')
elif n >= 70:  print('B')
else:          print('C')

# 2) acumulador con while (cuando la condición NO es contar)
total, i = 0, 1
while i <= 100:
    total += i
    i += 1

# 3) for para colecciones y rangos
for i in range(1, 101):     # contar es de for
    total += i
for libro in inventario:    # recorrer es de for
    print(libro['titulo'])`},
    {t:'table', head:['¿Qué usar?','Señal','Anti-patrón'], rows:[
      ['for + range','SABES cuántas vueltas','while con contador manual'],
      ['while','NO sabes cuántas (esperar un evento/valor)','for con break a mitad siempre'],
      ['if/elif','Condiciones mutuamente excluyentes','if, if, if anidados sin necesidad'],
      ['break','Buscar el primero / salir ante centinela','banderas que ya no se revisan']
    ]},
    {t:'info', title:'ℹ️ Asignación múltiple y swap', h:'<code>a, b = 1, 2</code> y el swap <code>a, b = b, a</code> funcionan por el desempaque de tuplas. También <code>x, y = y, x + y</code> (evalúa el lado derecho ANTES de asignar) — por eso los ciclos de Fibonacci en Python no necesitan auxiliar.'}
  ]},

  { n:5, emoji:'📦', short:'Estructuras de datos', title:'list, dict, tuple (y set de regalo)', time:'14 min', blocks:[
    {t:'p', h:'Elegir la estructura correcta es la mitad del diseño. Regla rápida: orden con repetidos → <b>list</b>; registro con nombre → <b>dict</b>; registro fijo posicional → <b>tuple</b>; membresía rápida sin repetidos → <b>set</b>.'},
    {t:'table', head:['Estructura','Literal','Métodos estrella','Trampa típica'], rows:[
      ['list','[1, 2]','append, pop, sort, insert, remove','a.sort() devuelve None; b = a es alias, no copia'],
      ['dict','{\'k\': v}','get, items, keys, values, pop','d[k] lanza KeyError; usa d.get(k)'],
      ['tuple','(1, 2)','count, index','un elemento: (5,) con coma'],
      ['set','{1, 2}','add, discard, union, in ultra-rápido','set() vacío ({} crea dict)']
    ]},
    {t:'code', lang:'python', title:'el dict como registro (el patrón del proyecto)', code:`libro = {'titulo': 'Rayuela', 'precio': 340, 'stock': 2}
inventario = [libro, {'titulo': 'El Aleph', 'precio': 210, 'stock': 0}]

for lib in inventario:
    estado = 'OK' if lib['stock'] > 0 else 'AGOTADO'
    print(f"{lib['titulo']:<22}{estado}")

# copia real vs alias
copia = inventario.copy()   # lista nueva (pero los dicts son compartidos)
import copy as c2; profunda = c2.deepcopy(inventario)  # en Python real`},
    {t:'warn', title:'⚠️ Alias no es copia', h:'<code>b = a</code> NO copia la lista: ambos nombres apuntan a LA MISMA lista (append en b cambia a). Copia superficial: <code>a.copy()</code> o <code>a[:]</code>. Es el bug #1 de listas en Python.'}
  ]},

  { n:6, emoji:'🛠️', short:'Funciones', title:'Funciones profesionales', time:'13 min', blocks:[
    {t:'p', h:'Las funciones son la unidad de reuso y de pensamiento. Reglas de oro del estilo profesional: UNA función = UNA tarea; entradas por parámetros, salida por <code>return</code> (nada de depender de globales); y nombres que describen qué DEVUELVEN (<code>calcular_total</code>, no <code>procesar</code>).'},
    {t:'code', lang:'python', title:'del curso a Python real', code:`def calcular_total(precios, iva=0.16):
    """Devuelve el total con IVA, redondeado a 2 decimales."""
    return round(sum(precios) * (1 + iva), 2)

# Python real añade *args / **kwargs para flexibilidad total
def reporta(*titulos, **opciones):
    for t in titulos:               # tupla de posicionales
        print('-', t)
    if opciones.get('detalle'):     # dict de con-nombre
        print('modo detalle activo')

reporta('A', 'B', detalle=True)`},
    {t:'table', head:['Concepto','Sintaxis','Para qué'], rows:[
      ['Default','<code>def f(x, n=0)</code>','Parámetro opcional'],
      ['Por nombre','<code>f(x=3, n=2)</code>','Claridad y saltar intermedios'],
      ['*args','<code>def f(*nums)</code>','Cualquier cantidad de posicionales (llegan como tupla)'],
      ['**kwargs','<code>def f(**opts)</code>','Cualquier cantidad de con-nombre (llegan como dict)'],
      ['Docstring','<code>"""…"""</code> primera línea','Documentación integrada (help(f) la muestra)']
    ]},
    {t:'info', title:'ℹ️ Recursión: cuando la definición se muerde la cola', h:'factorial(n) = n × factorial(n-1) con caso base factorial(0)=1. Toda recursión necesita UN caso base y acercarse a él en cada llamada. En Python real el límite es ~1000 llamadas (RecursionError); los ciclos suelen ser más eficientes, la recursión más clara para árboles y estructuras anidadas.'}
  ]},

  { n:7, emoji:'🛡️', short:'Errores y depuración', title:'Depurar sin miedo', time:'12 min', blocks:[
    {t:'p', h:'Depurar es leer con atención. El traceback real de Python se lee de ABAJO hacia arriba: excepción y mensaje al final; arriba, el archivo y la línea exactos. Este curso te entrena con el mismo formato, en español.'},
    {t:'table', head:['Excepción','Causa real','Primer reflejo'], rows:[
      ['SyntaxError','Falta :, paréntesis, comillas','Mira la línea marcada Y la anterior'],
      ['IndentationError','Sangría inconsistente','4 espacios uniformes, sin mezclar tabs'],
      ['NameError','Nombre mal escrito / no definido aún','Revisa ortografía y orden de ejecución'],
      ['TypeError','Mezcla de tipos (\'a\' + 1)','Convierte o corrige la operación'],
      ['ValueError','Valor imposible de convertir','Valida con isdigit() antes de int()'],
      ['IndexError / KeyError','Fuera de rango / clave ausente','len() y .get() son tus amigos'],
      ['ZeroDivisionError','División entre 0','if divisor != 0 o try/except']
    ]},
    {t:'code', lang:'python', title:'el arte del print de depuración', code:`def total_carrito(carrito):
    total = 0
    for item in carrito:
        print('DEBUG item:', item)          # ¿llegó lo que creo?
        total += item['precio'] * item['cantidad']
    print('DEBUG total antes de return:', total)
    return total
# imprime, observa, corrige, BORRA los prints de debug`},
    {t:'info', title:'ℹ️ En Python real además…', h:'<code>try/except</code> para lo esperable; <code>raise ValueError(\'mensaje\')</code> para rechazar datos malos TU mismo; el módulo <code>logging</code> para los prints profesionales; y el depurador <code>pdb</code> (o el de VS Code con F5) para inspeccionar paso a paso.'}
  ]},

  { n:8, emoji:'🌍', short:'Módulos y ecosistema', title:'La biblioteca estándar y el universo PyPI', time:'12 min', blocks:[
    {t:'p', h:'«Batteries included»: Python trae cientos de módulos listos. Los que usarás en tu primera semana real:'},
    {t:'table', head:['Módulo','Para qué','Ejemplo'], rows:[
      ['random','Azar (con seed para reproducibilidad)','random.randint(1, 6)'],
      ['math','sqrt, pi, floor, ceil…','math.sqrt(2)'],
      ['datetime','Fechas y horas de verdad','date.today().year'],
      ['json','Leer/escribir JSON (¡las APIs!)','json.load(archivo)'],
      ['csv','Tablas CSV sin sufrir','csv.DictReader(f)'],
      ['os / pathlib','Archivos y carpetas','Path(\'datos\').exists()'],
      ['sys','Argumentos y sistema','sys.argv']
    ]},
    {t:'code', lang:'python', title:'el ritual del entorno (Python real)', code:`python -m venv .venv          # ambiente aislado del proyecto
source .venv/bin/activate     # (Windows: .venv\\Scripts\\activate)
pip install pandas requests   # del universo PyPI (500k+ paquetes)
pip freeze > requirements.txt # lista para reproducir el ambiente`},
    {t:'info', title:'ℹ️ Los tres reinos de Python', h:'<b>Automatización</b> (openpyxl, selenium, shutil), <b>datos/IA</b> (pandas, numpy, scikit-learn, PyTorch) y <b>web</b> (Flask, Django, FastAPI). La base que aprendiste aquí es la misma puerta a los tres.'}
  ]},

  { n:9, emoji:'📚', short:'Bibliografía y siguientes pasos', title:'Bibliografía verificada y tu ruta', time:'8 min', blocks:[
    {t:'p', h:'Terminaste el curso: programas con datos, decisiones, ciclos, estructuras, funciones y manejo de errores. Esta bibliografía — verificada contra catálogos de las editoriales — es el siguiente escalón:'},
    {t:'table', head:['Obra','Autor / Editorial','Para qué'], rows:[
      ['<i>Python Crash Course</i>, 3.ª ed. (2023)','Eric Matthes · No Starch Press','La mejor segunda pasada: proyectos reales (juego, gráficas, app web)'],
      ['<i>Automate the Boring Stuff with Python</i>, 3.ª ed. (2025)','Al Sweigart · No Starch Press','Automatizar Excel, PDFs, web; GRATIS en automatetheboringstuff.com'],
      ['<i>Python for Everybody</i> (gratis)','Charles Severance · py4e.com','Curso libro+videos+ejercicios gratuito, ideal para consolidar'],
      ['<i>Fluent Python</i>, 2.ª ed. (2022)','Luciano Ramalho · O\'Reilly','El libro «por qué Python es así»: nivel intermedio-avanzado'],
      ['Documentación oficial en español','docs.python.org/es/3','Tutorial y referencia definitiva, mantenida por Python Software Foundation']
    ]},
    {t:'list', items:[
      '<b>Instala Python</b> y rescribe los ejercicios del curso como archivos .py (capítulo 2 del libro).',
      'Reto semanal: un programa propio (lista de compras, conversor, quiz personal) subido a GitHub.',
      'Rutas: <b>Datos</b> (pandas + gráficas), <b>Web</b> (Flask + APIs), <b>Automatización</b> (Automate the Boring Stuff completo).',
      'El siguiente curso del campus es <b>Unity</b> (videojuegos en C#): otra sintaxis, la misma lógica que ya dominas.'
    ]},
    {t:'milestone', title:'🎓 Cierre', h:'Pasaste de «¿qué es un print?» a un sistema de inventario con funciones, validación y reportes. Ese salto — de consumir programas a ESCRIBIRLOS — es el que separa a los usuarios de los creadores. Siguiente parada: videojuegos con Unity. ¡Nos vemos allí! 🎮'}
  ]}
];
