/* ============================================================
   CURSO 7 UNITY (C#) · MAZOS SRS (repetición espaciada, Leitner)
   ============================================================ */
const SRS_DECKS = {
  cscore:{ name:'C# para Unity esencial', emoji:'🎮', desc:'Las palabras y reglas de C# que debes recordar sin pensar: de WriteLine a Vector3.',
    cards:[
      {f:'Console.WriteLine(x)', es:'Imprime x y salta de línea (Debug.Log es el primo de Unity)', ex:'WriteLine("Hola") · WriteLine() → línea vacía'},
      {f:'True / False', es:'Los bools se imprimen CON mayúscula inicial', ex:'WriteLine(10 > 3) → True'},
      {f:'CS1002', es:'Falta el punto y coma ; (el error #1 de los que vienen de Python)', ex:'WriteLine("x"); ← cada instrucción la lleva'},
      {f:'CS0103', es:'El nombre no existe: revisa mayúsculas (Console, no console)', ex:'C# es case sensitive: Vida ≠ vida'},
      {f:'int / float / bool / string', es:'Tipos exactos; el float lleva sufijo f', ex:'float v = 2.5f; · var infiere el tipo'},
      {f:'10 / 4', es:'int/int TRUNCA hacia cero → 2 (¡no 2.5!)', ex:'10 / 4.0f → 2.5 · -7/2 → -3'},
      {f:'% (módulo)', es:'Resto de la división; signo del dividendo', ex:'-7 % 3 → -1 · turno % 2 para alternar'},
      {f:'(int)3.9', es:'Cast: corta hacia cero, NO redondea → 3', ex:'(int)-3.9 → -3'},
      {f:'DivideByZeroException', es:'Dividir ENTEROS entre cero lanza excepción', ex:'10 / 0.0f → Infinity (floats no lanzan)'},
      {f:'$"texto {x:F2}"', es:'Interpolación: {expresión} y formato F0–F3', ex:'$"{precio:F2}" → 3.50'},
      {f:'int.Parse / Convert.ToInt32', es:'Convierte texto a número; texto inválido → FormatException', ex:'int.Parse("42") + 1 → 43'},
      {f:'&& / || / !', es:'Y / O / NO — con cortocircuito (b ni se evalúa si a decide)', ex:'n != 0 && 100/n > 5 es seguro'},
      {f:'if / else if / else', es:'Entra al PRIMERO que cumpla: orden de estricto a laxo', ex:'la condición va SIEMPRE entre paréntesis'},
      {f:'while / do-while', es:'Repite mientras… / corre al menos UNA vez', ex:'sin i++ dentro → ciclo infinito'},
      {f:'for (init; cond; paso)', es:'N vueltas contadas; i vive solo dentro', ex:'for (int i = 0; i < 3; i++) → 0,1,2'},
      {f:'break / continue', es:'Sale del ciclo / salta a la siguiente vuelta', ex:'while (true) { if (salir) break; }'},
      {f:'int[] a = {1, 2}', es:'Array: fila fija; índices 0..Length-1', ex:'a[0] · a.Length · new int[3] llena de ceros'},
      {f:'IndexOutOfRangeException', es:'Índice fuera del array/string', ex:'a[3] con Length 3 → excepción'},
      {f:'List<T>', es:'Colección que crece: Add, Remove, RemoveAt, Contains', ex:'var l = new List<int>(); l.Add(5);'},
      {f:'lista.Count', es:'Tamaño de una List (Length es de ARRAYS)', ex:'mezclarlos → CS1061'},
      {f:'foreach (T x en col)', es:'Visita cada elemento sin índices', ex:'foreach (char c in "Unity") …'},
      {f:'Random.InitState(n)', es:'Fija la semilla: secuencia reproducible', ex:'misma semilla → misma partida'},
      {f:'Random.Range(1, 6)', es:'CON ENTEROS es INCLUSIVO: 1 a 6 (¡ojo vs Python!)', ex:'Range(0.5f, 2.5f) float continuo · value: 0..1'},
      {f:'void / return', es:'Método que no devuelve / devuelve y termina', ex:'return corta el método aunque queden líneas'},
      {f:'parámetro default', es:'Valor opcional SIEMPRE al final de la firma', ex:'int P(int b, int e = 2) → P(3) = 9'},
      {f:'recursión', es:'Método que se llama a sí mismo; SIN caso base → StackOverflowException', ex:'if (n <= 1) return 1;'},
      {f:'class / new', es:'El molde y el nacimiento del objeto', ex:'class Slime { … } · var s = new Slime("B", 30);'},
      {f:'constructor', es:'Mismo nombre que la clase, sin retorno; deja el objeto listo', ex:'definirlo elimina el new sin args (CS1729)'},
      {f:'objeto.campo / this', es:'Acceso con punto; this = «este objeto»', ex:'s.Vida -= d; dentro: Vida o this.Vida'},
      {f:'NullReferenceException', es:'Usar una referencia null: EL error de Unity', ex:'s.Nombre con s = null → boom'},
      {f:'try / catch / finally', es:'Rodea el riesgo / atrapa el tipo / SIEMPRE corre', ex:'catch (FormatException e) { e.Message }'},
      {f:'Vector3', es:'(x, y, z): +, -, *escala, magnitude, .x .y .z', ex:'new Vector3(3, 4, 0).magnitude → 5'},
      {f:'Mathf.Clamp(v, min, max)', es:'Acota un valor al rango (vida, volumen…)', ex:'Clamp(250, 0, 100) → 100'},
      {f:'Mathf.Round vs Math.Round', es:'Mathf aleja de cero los midpoints; Math usa bancario (al par)', ex:'2.5 → Mathf 3 · Math 2'},
      {f:'Start() / Update()', es:'En el editor real: una vez al nacer / cada frame', ex:'public class X : MonoBehaviour { … }'}
    ]}
};
