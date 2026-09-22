/* ============================================================
   CURSO 6 UNREAL · SRS — mazo «uecore» (tarjetas {f, es, ex})
   f: frente (concepto) · es: explicación · ex: ejemplo visual/texto
   ============================================================ */
const SRS_DECKS = {
  uecore: {
    name: 'Conceptos de Blueprints esenciales',
    emoji: '🎮',
    cards: [
      { f: '¿Qué son los Blueprints?', es: 'Programación VISUAL de Unreal: la lógica se construye conectando nodos con cables, sin escribir código.', ex: 'BeginPlay → Print String: dos cajas y dos cables.' },
      { f: 'Pin de ejecución (exec)', es: 'Flecha blanca que indica el ORDEN de ejecución. Entra por «in», sale por «then».', ex: 'BeginPlay.then → Print.in' },
      { f: 'Pin de datos', es: 'Cable de COLOR que lleva un valor. Cada tipo tiene su color fijo.', ex: 'bool rojo · int teal · float verde · string magenta' },
      { f: 'Regla de los cables', es: 'Una SALIDA puede alimentar varias entradas; una ENTRADA recibe un solo cable.', ex: 'Un literal «====» → dos prints a la vez (fan-out).' },
      { f: 'Event BeginPlay', es: 'Se dispara UNA vez al iniciar el juego: el punto de entrada de tu lógica.', ex: 'Sin BeginPlay, nada se ejecuta.' },
      { f: 'Print String', es: 'Escribe una línea en el Output Log. El nodo #1 para depurar.', ex: 'Depurar = prints antes y después del Branch dudoso.' },
      { f: 'Colores al imprimir', es: 'Los ints salen limpios (7) y los floats SIEMPRE con decimal (5.0).', ex: 'Un literal float 5 imprime «5.0», no «5».' },
      { f: 'To Int (Truncate)', es: 'Convierte float→int CORTANDO hacia cero. No redondea.', ex: '3.9 → 3 · -3.9 → -3' },
      { f: 'Conversión implícita', es: 'int→float y (num)→string entran solos. float→int EXIGE el nodo To Int.', ex: 'Un int puede conectar directo a un pin de texto.' },
      { f: 'Get Variable', es: 'Lee el valor de una variable. Es solo un dato: no tiene pines de ejecución.', ex: 'Get «oro» → pin del print.' },
      { f: 'Set Variable', es: 'Escribe un valor en la variable y sigue la cadena exec. Su pin Value también expone lo guardado.', ex: 'Set «vida» ← 100 → Print «Vida: 100».' },
      { f: 'int / int en Unreal', es: 'División entera estilo C++: TRUNCA hacia cero. Distinta de Python.', ex: '10/4 → 2 · -7/2 → -3 (y -7%3 → -1)' },
      { f: 'Nodo Comparar', es: 'Toma dos valores (==, !=, <, >, <=, >=) y fabrica un bool.', ex: '«vida > 0» → cable rojo al Branch.' },
      { f: 'Lógica booleana', es: 'AND exige ambos; OR basta uno; XOR pide que DIFIERAN; NOT invierte (solo pin A).', ex: 'true XOR true → false' },
      { f: 'Branch', es: 'La decisión: con un bool elige entre las flechas True y False.', ex: 'vida <= 0 ? Game Over : Sigue jugando' },
      { f: 'Sequence', es: 'Ejecuta Then 0 COMPLETO y después Then 1: orden explícito sin cables cruzados.', ex: 'Música por Then 0, spawn de enemigos por Then 1.' },
      { f: 'ForLoop', es: 'Repite de First a Last INCLUSIVO y expone Index (solo dentro del cuerpo).', ex: '1..5 = 5 vueltas (¡no 4 como range de Python!)' },
      { f: 'WhileLoop', es: 'Repite MIENTRAS la condición sea true (se revisa antes de cada vuelta).', ex: 'Algo del cuerpo debe hacer falsa la condición o: ciclo infinito.' },
      { f: 'ForEachLoop', es: 'Recorre un array: una vuelta por elemento, con Element y Array Index (desde 0).', ex: '["oro","plata"] → oro (index 0), plata (index 1).' },
      { f: 'Make Array / Array Length', es: 'Make Array crea una lista literal; Length cuenta sus elementos.', ex: 'Length(["a","b","c"]) → 3 · array vacío → 0' },
      { f: 'Get Array Elem', es: 'Lee UN elemento por índice (desde 0). Fuera de rango = error con rango válido.', ex: 'Último elemento = Get(Length − 1)' },
      { f: 'Array Add', es: 'Devuelve un array NUEVO con el elemento al final. Guárdalo con Set o se pierde.', ex: 'Set inv = Add(Get inv, "poción")' },
      { f: 'Custom Event', es: 'Tu propio nodo con nombre: lógica definida una vez, invocada N veces con Call.', ex: 'MostrarMenu, TurnoJugador, PantallaFinal…' },
      { f: 'Orden de los Call', es: 'El Call ejecuta el evento COMPLETO y regresa. La llamada más profunda termina primero.', ex: 'Begin→Uno→Dos imprime: lo de Dos, lo de Uno, lo de Begin.' },
      { f: 'El acumulador', es: 'Variable en 0 + Set(total = total + algo) DENTRO del ciclo + print en Completed.', ex: 'Botín [5,10,20] → total 35.' },
      { f: 'Máquina de estados', es: 'Branches encadenados deciden el estado (jugando/victoria/derrota); cada pantalla vive en su Custom Event.', ex: 'monedas >= 50 → Call PantallaVictoria' }
    ]
  }
};
