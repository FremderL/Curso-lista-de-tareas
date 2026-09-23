/* ============================================================
   CURSO 5 PYTHON · MAZOS SRS (repetición espaciada, Leitner)
   ============================================================ */
const SRS_DECKS = {
  pycore:{ name:'Conceptos Python esenciales', emoji:'🐍', desc:'Las palabras clave y trampas que debes recordar sin pensar: de print() a try/except.',
    cards:[
      {f:'print()', es:'Muestra valores en pantalla', ex:"print('Hola', 5, sep='-')"},
      {f:'input()', es:'Lee UNA línea del teclado; siempre devuelve TEXTO', ex:'edad = int(input())'},
      {f:'int() / float() / str()', es:'Convierte entre tipos (int trunca: int(3.9)→3)', ex:"int('42') + 1 → 43"},
      {f:'10 / 2', es:'División REAL: siempre float → 5.0', ex:'10 // 2 → 5 (piso)'},
      {f:'% (módulo)', es:'Residuo; toma el signo del divisor', ex:'-7 % 2 → 1 · n % 2 == 0 → ¿par?'},
      {f:'** ', es:'Potencia', ex:'2 ** 10 → 1024'},
      {f:'f-strings', es:'Inserta valores en texto con {expr}', ex:"f'Total: ${precio:.2f}'"},
      {f:'==  vs  =', es:'== compara; = asigna. Confundirlos es SyntaxError', ex:'if x == 5:  ✓'},
      {f:'if / elif / else', es:'Entra al PRIMERO que cumpla; orden de estricto a laxo', ex:'if c>=90 … elif c>=70 …'},
      {f:'while', es:'Repite MIENTRAS la condición sea verdadera', ex:'algo debe cambiar la condición o: infinito'},
      {f:'for + range(a, b, paso)', es:'Repite N veces; el fin NO se incluye', ex:'range(1, 6) → 1,2,3,4,5'},
      {f:'break / continue', es:'Termina el ciclo / salta una vuelta', ex:'if encontrado: break'},
      {f:'lista[i] / lista[-1]', es:'Índice desde 0; negativos desde el final', ex:'[10,20,30][-1] → 30'},
      {f:'slicing a[i:j:paso]', es:'Corta porciones; j NO se incluye', ex:'[0..5][::-1] → invertida'},
      {f:'append / pop / sort', es:'Agrega al final / quita y devuelve / ordena EN SU LUGAR (None)', ex:'copia ordenada: sorted(a)'},
      {f:'dict (diccionario)', es:'Pares clave: valor; acceso por clave', ex:"d['precio'] · d.get('x', 0)"},
      {f:'d.items()', es:'Pares (clave, valor) para recorrer con desempaque', ex:'for k, v in d.items():'},
      {f:'a, b = b, a', es:'Swap con desempaque de tuplas, sin auxiliar', ex:'x, y = (3, 4) también desempaca'},
      {f:'def / return', es:'Define función / entrega el valor y termina', ex:'sin return → None'},
      {f:'try / except / finally', es:'Atrapa errores esperados; finally siempre corre', ex:'except ValueError: …'},
      {f:'random.seed(n)', es:'Fija la semilla: misma secuencia siempre', ex:'reproducibilidad para pruebas'}
    ]}
};
