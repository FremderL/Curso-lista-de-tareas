/* ============================================================
   CURSO 6 UNREAL · LIBRO DE TEXTO (9 capítulos)
   Bibliografía verificada: ver capítulo 9.
   ============================================================ */
const TEXTBOOK = [
  { n:1, emoji:'🎮', short:'Unreal y los Blueprints', title:'Unreal Engine: el motor y su lenguaje visual', time:'10 min', blocks:[
    {t:'p', h:'Unreal Engine nació en 1998 con el shooter <b>Unreal</b> y tres décadas después es el motor de los blockbusters: Fortnite, Rocket League, Final Fantasy VII Remake y miles más. La versión estable actual es la <b>5.8</b> (junio 2026), última gran versión de la rama 5 antes de que UE6 tome el relevo (Early Access a fines de 2027).'},
    {t:'table', head:['Año','Hito','Por qué importa'], rows:[
      ['1998','Unreal Engine 1','Nace el motor + editor unificados'],
      ['2006','UE3 + Kismet','El antepasado de Blueprints (scripting visual)'],
      ['2014','UE4: Blueprints','Visual scripting moderno para TODOS'],
      ['2022','UE5: Nanite + Lumen','Geometría e iluminación de película'],
      ['2026','UE 5.8','Última gran versión 5; MegaLights y PCG listos'],
      ['2027','UE6 (Early Access)','Editor unificado; Verse convive con Blueprints']
    ]},
    {t:'info', title:'ℹ️ ¿Por qué nodos y no código?', h:'Los Blueprints ejecutan casi igual de rápido que C++ y se iteran AL INSTANTE (sin compilar). Los diseñadores programan mecánicas completas; los programadores C++ crean nodos base que los diseñadores extienden. Esa colaboración es la razón del éxito del sistema.'},
    {t:'p', h:'Un Blueprint es un <b>grafo dirigido</b>: cajas (nodos) unidas por cables. Las flechas blancas son el control de flujo (QUÉ se ejecuta y en qué orden); los cables de color son el flujo de datos (QUÉ valores se llevan de un nodo a otro). Este curso entrena exactamente esas dos ideas.'}
  ]},

  { n:2, emoji:'🧭', short:'UE real en tu computadora', title:'Del navegador al editor real', time:'12 min', blocks:[
    {t:'p', h:'El simulador de este curso replica la gramática de Blueprints; el editor real añade el mundo 3D alrededor. Instalarlo es gratis y el conocimiento traslada 1 a 1.'},
    {t:'list', items:[
      '<b>1.</b> Cuenta gratis de Epic Games + <b>Epic Games Launcher</b> (epicgames.com).',
      '<b>2.</b> Pestaña Unreal Engine → instala la serie <b>5.8</b> (~60 GB; computadora media basta para aprender).',
      '<b>3.</b> Nuevo proyecto: plantilla <b>Blank</b> (vacío) o <b>Third Person</b> (personaje listo).',
      '<b>4.</b> Abre un Blueprint → pestaña <b>Event Graph</b>: el lienzo gemelo del de este curso.',
      '<b>5.</b> Clic derecho = buscar nodos; arrastra pines = cables; <b>Compile</b> valida; <b>Play</b> ejecuta (PIE: Play In Editor).'
    ]},
    {t:'table', head:['En este curso','En el editor real'], rows:[
      ['▶ Ejecutar','Play (PIE)'],
      ['Output Log','Output Log + mensajes en pantalla'],
      ['Palette de nodos','Clic derecho → búsqueda con filtros'],
      ['⚠️ errores en español','Errores rojos del Compile + Output Log'],
      ['Variables del ejercicio','Panel My Blueprint → Variables']
    ]},
    {t:'warn', title:'⚠️ Qué AÑADE el editor real', h:'Vectores (posición X,Y,Z), rotaciones, actores, componentes, físicas y miles de nodos más. Nada de eso invalida lo aprendido: flujo, variables, ciclos y eventos son la base sobre la que todo eso se construye.'}
  ]},

  { n:3, emoji:'🧩', short:'Nodos y tipos: referencia', title:'Referencia rápida: nodos, pines y tipos', time:'12 min', blocks:[
    {t:'table', head:['Familia','Nodos estrella','Nota clave'], rows:[
      ['Eventos','Event BeginPlay, Custom Event','BeginPlay corre una vez; los custom los llamas tú'],
      ['Flujo','Branch, Sequence, ForLoop, WhileLoop, ForEach, FlipFlop','Las flechas blancas mandan'],
      ['Datos','Literales int/float/string/bool, Make Array','Un literal se edita dentro del nodo'],
      ['Variables','Get, Set','Get flota (solo dato); Set vive en la cadena exec'],
      ['Matemática','Aritmética (+ − * / %), Comparar, Lógica','int/int trunca hacia cero'],
      ['Arrays','Length, Get, Add','Add devuelve un array NUEVO: guárdalo con Set'],
      ['Conversión','To String, To Int (Truncate), To Float','float→int exige nodo y corta hacia cero']
    ]},
    {t:'table', head:['Tipo','Color del pin','Ejemplo'], rows:[
      ['exec','⚪ flecha blanca','Then → In'],
      ['bool','🔴 rojo','true · false'],
      ['int','🟢 teal','42 · -7'],
      ['float','🟩 verde','3.5 · 5.0'],
      ['string','🟣 magenta','"Game Over"'],
      ['array','🫒 oliva','["espada","poción"]']
    ]},
    {t:'info', title:'ℹ️ El nombre exacto importa', h:'En UE real los nodos se buscan por nombre (clic derecho): «Print String», «ForLoop», «Get Array Elem». Aprender los nombres oficiales de este curso te hace productivo en el editor desde el primer día.'}
  ]},

  { n:4, emoji:'🔀', short:'Flujo: patrones madre', title:'Los patrones de flujo que todo juego usa', time:'13 min', blocks:[
    {t:'p', h:'Cuatro combinaciones cubren el 90% del gameplay. Apréndelas como recetas, no como nodos sueltos:'},
    {t:'list', items:[
      '<b>Decisión:</b> Comparar → Branch → dos ramas. (¿vida &lt;= 0? Game Over : Continuar)',
      '<b>Oleadas fijas:</b> ForLoop 1..N → cuerpo con Print/daño → Completed con el resumen.',
      '<b>Colección:</b> ForEach → cuerpo por elemento (Element + Index) → Completed.',
      '<b>Acumulador:</b> Set total=0 ANTES del ciclo → Set(total = total + algo) DENTRO del cuerpo → print del total en Completed.'
    ]},
    {t:'info', title:'ℹ️ ¿ForLoop o WhileLoop?', h:'Sabes cuántas vueltas (3 oleadas, 5 enemigos) → ForLoop. No lo sabes (mientras haya vida, hasta que la pila se vacíe) → WhileLoop — y algo dentro del cuerpo DEBE empujar la condición hacia false, o tienes un cuelgue. Regla mnemotécnica: FOR cuenta, WHILE espera.'},
    {t:'p', h:'Y para alternancia pura (turnos, luces, estados sí/no), el <b>FlipFlop</b> evita escribir la lógica de «¿qué tocaba?» a mano: guarda su posición y expone el bool <b>Is A</b> por si quieres tratar cada lado distinto.'}
  ]},

  { n:5, emoji:'📦', short:'Colecciones', title:'Arrays: la memoria del juego', time:'13 min', blocks:[
    {t:'p', h:'Los arrays son las estructuras que recuerdan: inventarios, colas de enemigos, puntajes por ronda. Tres números gobiernan su vida: <b>Length</b> (cuántos hay), <b>índice</b> (posición, desde 0) y <b>último índice</b> (Length − 1). Confundirlos es el origen del error «fuera de rango» más común del mundo.'},
    {t:'table', head:['Operación','Nodo','Detalle'], rows:[
      ['Crear literal','Make Array','Edita elementos dentro del nodo; puede ser vacío'],
      ['Contar','Array Length','Devuelve int: 7 elementos → 7'],
      ['Leer','Get Array Elem','Índice int; el 0 es el primero'],
      ['Agregar','Array Add','Devuelve array NUEVO (con Set para persistir)'],
      ['Recorrer','ForEachLoop','Element y Array Index por vuelta; Completed al final']
    ]},
    {t:'warn', title:'⚠️ No se imprimen enteros', h:'Un array no cabe en un print: recórrelo. Y Get Array Elem exige que el índice exista: con Length 3, los índices válidos son 0, 1 y 2. El patrón Length−1 te da SIEMPRE el último sin adivinar.'},
    {t:'info', title:'ℹ️ Add + Set: por qué se separan', h:'En este curso Array Add devuelve un array nuevo para que VEO que sin Set el cambio se pierde (inmutabilidad didáctica). En el editor real los arrays de variables se modifican por referencia; el patrón mental que aprendiste te sirve igual: cada cambio de inventario es una decisión explícita.'}
  ]},

  { n:6, emoji:'🛡️', short:'Eventos y organización', title:'Custom Events: arquitectura para humanos', time:'12 min', blocks:[
    {t:'p', h:'Un grafo de 80 nodos seguidos es un nido de cables imposible. La solución profesional: partir la lógica en <b>Custom Events</b> con nombres que documentan la intención — <code>SpawnOleada</code>, <code>AplicarDanio</code>, <code>MostrarMenu</code>. El BeginPlay queda como un índice de llamadas; cada evento es una habitación ordenada.'},
    {t:'list', items:[
      '<b>Regla 1:</b> si un bloque necesita un comentario para explicarse, merece ser un evento.',
      '<b>Regla 2:</b> los nombres describen QUÉ hacen (PantallaVictoria), no CÓMO (CosasDeLabels).',
      '<b>Regla 3:</b> el orden de ejecución con llamadas es el de las funciones: la más profunda termina primero.',
      '<b>Regla 4:</b> los eventos leen las variables del juego directamente (vida, monedas): no hace falta pasarlas por cables.'
    ]},
    {t:'info', title:'ℹ️ Del evento a la función', h:'Un Custom Event es la versión visual de una función sin parámetros. Cuando pases a UE6/Verse (o a C++ con BlueprintCallable), la correspondencia es directa: cada evento será una función o método. Lo que entrenas aquí es pensamiento modular, transferible a cualquier motor.'}
  ]},

  { n:7, emoji:'🕹️', short:'Patrones de juego', title:'Vida, oleadas, estados: el esqueleto del gameplay', time:'13 min', blocks:[
    {t:'p', h:'Bajo cada género hay el mismo esqueleto: <b>estado</b> (variables), <b>ciclos</b> (oleadas, turnos), <b>decisiones</b> (Branch con Comparar) y <b>pantallas</b> (eventos finales). El proyecto del curso — Defensa de la Librería Esperanza — recorre el esqueleto completo:'},
    {t:'table', head:['Sistema','Patrón','Nodos'], rows:[
      ['Estado inicial','Set de vida/monedas en BeginPlay','Set + literales'],
      ['Oleadas','ForLoop 1..2 con ataques dentro','ForLoop + ForEach + aritmética'],
      ['Economía','Acumulador de monedas por slime','Set(total = total + x) en el cuerpo'],
      ['Bonus','Decisión al final del ciclo','Branch + Comparar >='],
      ['Derrota','Condición de vida','Branch vida <= 0'],
      ['Pantallas','Eventos con nombre + Call','Custom Events']
    ]},
    {t:'info', title:'ℹ️ Del esqueleto al género', h:'¿Roguelike? El mismo esqueleto con ciclos de salas. ¿Puzzle? Estados con Branch encadenados. ¿Tower defense? Acumuladores + ForEach de enemigos. Los gráficos cambian; la lógica que escribiste en el proyecto es la misma para siempre.'}
  ]},

  { n:8, emoji:'🐛', short:'Depuración', title:'Depurar grafos sin miedo', time:'12 min', blocks:[
    {t:'p', h:'El flujo de depuración es SIEMPRE el mismo: <b>reproduce el error → lee el mensaje → forma una hipótesis → prueba con prints</b>. Los mensajes de este curso dicen nodo y pin exactos (en español); los del editor real marcan el nodo en rojo y escriben en el Output Log. Misma disciplina.'},
    {t:'table', head:['Síntoma','Causa probable','Primer reflejo'], rows:[
      ['«la entrada X no está conectada»','Pin vacío','Sigue el cable que falta; usa un literal o Comparar'],
      ['«esperaba un entero… To Int»','float donde va int','Inserta To Int (Truncate) en el cable'],
      ['«la variable aún no tiene valor»','Get antes que Set','Sube el Set al inicio del BeginPlay'],
      ['«no termina nunca»','WhileLoop sin salida','Que el cuerpo cambie la condición'],
      ['«no existe ningún Custom Event…»','Nombre mal escrito','Compara letra por letra (mayúsculas incluidas)'],
      ['«fuera de rango (0..N)»','Índice >= Length','Usa Length − 1 para el último']
    ]},
    {t:'info', title:'ℹ️ Prints estratégicos', h:'No imprimas todo: imprime en las BIFURCACIONES (antes del Branch: ¿con qué valor entra?) y en las FRONTERAS de ciclos (Completed: ¿con qué valor salió?). Tres prints bien puestos valen más que veinte al azar — y acuérdate de borrarlos al terminar: hasta eso hace como un profesional.'}
  ]},

  { n:9, emoji:'📚', short:'Bibliografía y siguientes pasos', title:'Bibliografía verificada y tu ruta', time:'8 min', blocks:[
    {t:'p', h:'Terminaste el curso: piensas en flujo, datos, colecciones, eventos y estados — el corazón de Blueprints. Esta bibliografía, verificada contra catálogos de las editoriales, es el siguiente escalón:'},
    {t:'table', head:['Obra','Autor / Editorial','Para qué'], rows:[
      ['<i>Blueprints Visual Scripting for Unreal Engine 5</i>, 3.ª ed. (2022)','Marcos Romero & Brenden Sewell · Packt (568 pp)','El libro de referencia de Blueprints: de FPS a IA, UI y VR'],
      ['<i>Game Development Patterns with Unreal Engine 5</i> (2024)','Stuart Butler & Tom Oliver · Packt','Patrones profesionales (Blueprint ↔ C++) para proyectos serios'],
      ['<i>Unreal Engine 5 Best Practices</i> (dic 2025)','Tyson Butler-Boschma · Packt','Iluminación, entornos y cinemática con estándares de industria'],
      ['Documentación oficial de Blueprints','dev.epicgames.com/documentation','Referencia definitiva, mantenida por Epic Games'],
      ['Rutas de aprendizaje gratuitas','dev.epicgames.com/learn','Cursos oficiales por nivel y disciplina']
    ]},
    {t:'list', items:[
      '<b>Instala UE 5.8</b> y reconstruye el proyecto Defensa de la Librería Esperanza en un Blueprint real de la plantilla Third Person.',
      'Reto semanal: una mecánica nueva en Blueprints (puertas con llave, tienda, jefe con fases) en un proyecto propio.',
      'Rutas: <b>Gameplay</b> (Blueprints → C++), <b>Ambientes</b> (Lumen, PCG, MegaLights), <b>UEFN/Verse</b> (el puente hacia UE6).',
      'El campus sigue con más cursos: la lógica que ya dominas es la misma en cualquier motor.'
    ]},
    {t:'milestone', title:'🎓 Cierre', h:'Pasaste de «¿qué es un nodo?» a un juego por turnos completo con oleadas, economía y pantallas. Ese salto — de jugar juegos a PROGRAMARLOS — es el que separa a los jugadores de los creadores. Nos vemos en el examen. 🎮'}
  ]}
];
