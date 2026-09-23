/* Batería del motor BPX (Blueprints) — Curso 6 Unreal Engine */
const BPX = require('/home/user/ue_parts/bpx_engine.js');

let pass = 0, fail = 0;
function ok(cond, msg){ if(cond){ pass++; } else { fail++; console.log('  ✗ ' + msg); } }
function N(id, type, props){
  var o = {};
  if(props) (Array.isArray(props) ? props : [props]).forEach(function(p){ for(var k in p) o[k] = p[k]; });
  return { id:String(id), type:type, props:o, x:0, y:0 };
}
function P(id, type, props){ return N(id, type, props); }
function G(nodes, wires){ return { nodes:nodes, wires:(wires||[]).map(w => ({ from:w[0], to:w[1] })) }; }
function prop(name, value){ var o = {}; o[name] = value; return o; }
/* helpers de grafo frecuentes */
function litInt(id, v){ return N(id, 'lit_int', [prop('value', v)]); }
function litFloat(id, v){ return N(id, 'lit_float', [prop('value', v)]); }
function litStr(id, v){ return N(id, 'lit_string', [prop('value', v)]); }
function litBool(id, v){ return N(id, 'lit_bool', [prop('value', v)]); }
function print(id){ return N(id, 'print'); }
function mk(id, items){ return P(id, 'make_array', [prop('items', items)]); }
function begin(id){ return N(id, 'event_beginplay'); }
function run(nodes, wires, opts){ return BPX.run(G(nodes, wires), opts); }
function lines(r){ return r.output.split('\n').filter((l,i,a) => !(i === a.length-1 && l === '')); }

/* ---------- 1. Impresión básica ---------- */
(() => {
  let r = run([begin(1), print(2)], [['1.then','2.in']]);
  ok(r.ok, 'beginplay→print corre: ' + (r.ok ? '' : r.error));
  ok(r.output === '\n', 'print sin texto → línea vacía');
  r = run([begin(1), print(2), litStr(3, 'Hola mundo')], [['1.then','2.in'],['3.value','2.text']]);
  ok(r.ok && r.output === 'Hola mundo\n', 'print de literal string: ' + JSON.stringify(r.output));
  r = run([begin(1), print(2), litInt(3, 7)], [['1.then','2.in'],['3.value','2.text']]);
  ok(r.ok && r.output === '7\n', 'print de int con conversión implícita → «7»');
  r = run([begin(1), print(2), litFloat(3, 5)], [['1.then','2.in'],['3.value','2.text']]);
  ok(r.ok && r.output === '5.0\n', 'float 5 se imprime «5.0»');
  r = run([begin(1), print(2), litBool(3, true)], [['1.then','2.in'],['3.value','2.text']]);
  ok(r.ok && r.output === 'true\n', 'bool true se imprime «true»');
  // cadena de 2 prints, orden
  r = run([begin(1), print(2), print(3), litStr(4,'A'), litStr(5,'B')], [['1.then','2.in'],['2.then','3.in'],['4.value','2.text'],['5.value','3.text']]);
  ok(r.ok && r.output === 'A\nB\n', 'orden de la cadena exec');
  // sin beginplay
  r = run([print(2)], []);
  ok(!r.ok && r.error.includes('Event BeginPlay'), 'sin BeginPlay → error claro');
  // fan-out de un exec out (varios cables): se ejecutan en orden de cables
  r = run([begin(1), print(2), print(3), litStr(4,'X'), litStr(5,'Y')], [['1.then','2.in'],['1.then','3.in'],['4.value','2.text'],['5.value','3.text']]);
  ok(r.ok && r.output === 'X\nY\n', 'fan-out exec en orden de cables');
  // dos BeginPlay: orden por id
  r = run([begin(9), begin(2), N('9p','print'), N('2p','print'), litStr('l1','nueve'), litStr('l2','dos')],
    [['9.then','9p.in'],['2.then','2p.in'],['l1.value','9p.text'],['l2.value','2p.text']]);
  ok(r.ok && r.output === 'dos\nnueve\n', 'dos BeginPlay en orden de id (2 antes que 9)');
})();

/* ---------- 2. Sequence, conversiones, formato ---------- */
(() => {
  let r = run([begin(1), N(2,'sequence'), N(3,'print'), N(4,'print'), litStr(5,'Then0'), litStr(6,'Then1')],
    [['1.then','2.in'],['2.then0','3.in'],['2.then1','4.in'],['5.value','3.text'],['6.value','4.text']]);
  ok(r.ok && r.output === 'Then0\nThen1\n', 'Sequence respeta Then0 → Then1');

  r = run([begin(1), print(2), litInt(3,5), P(4,'to_string')], [['1.then','2.in'],['3.value','4.value'],['4.result','2.text']]);
  ok(r.ok && r.output === '5\n', 'to_string explícito');
  r = run([begin(1), print(2), litFloat(3,3.9), P(4,'to_int')], [['1.then','2.in'],['3.value','4.value'],['4.result','2.text']]);
  ok(r.ok && r.output === '3\n', 'to_int trunca 3.9 → 3');
  r = run([begin(1), print(2), litFloat(3,-3.9), P(4,'to_int')], [['1.then','2.in'],['3.value','4.value'],['4.result','2.text']]);
  ok(r.ok && r.output === '-3\n', 'to_int trunca -3.9 → -3 (hacia cero)');
  r = run([begin(1), print(2), litInt(3,5), P(4,'to_float')], [['1.then','2.in'],['3.value','4.value'],['4.result','2.text']]);
  ok(r.ok && r.output === '5.0\n', 'to_float promueve');

  // formato float: 0.1+0.2 → 0.3 ; 10/4 → 2.5
  r = run([begin(1), print(2), litFloat(3,0.1), litFloat(4,0.2), P(5,'arith',[prop('op','+')])],
    [['1.then','2.in'],['3.value','5.a'],['4.value','5.b'],['5.result','2.text']]);
  ok(r.ok && r.output === '0.3\n', '0.1+0.2 se imprime «0.3» (toPrecision 12)');
  r = run([begin(1), print(2), litInt(3,10), litInt(4,4), P(5,'arith',[prop('op','/')])],
    [['1.then','2.in'],['3.value','5.a'],['4.value','5.b'],['5.result','2.text']]);
  ok(r.ok && r.output === '2\n', '10/4 con ints → int/int trunca a 2');
})();

/* ---------- 3. Aritmética estilo UE ---------- */
(() => {
  function arith(a, b, op, aInt, bInt){
    if(bInt === undefined) bInt = aInt;
    const nodes = [begin(1), print(2), aInt ? litInt(3, a) : litFloat(3, a), bInt ? litInt(4, b) : litFloat(4, b), P(5, 'arith', [prop('op', op)])];
    return run(nodes, [['1.then','2.in'],['3.value','5.a'],['4.value','5.b'],['5.result','2.text']]);
  }
  let r = arith(10, 4, '/', true);
  ok(r.ok && r.output === '2\n', 'int/int trunca: 10/4 → 2, salió ' + JSON.stringify(r.output));
  r = arith(7, 2, '/', true);  ok(r.ok && r.output === '3\n', '7/2 → 3');
  r = arith(-7, 2, '/', true); ok(r.ok && r.output === '-3\n', '-7/2 → -3 (trunca hacia cero, NO piso)');
  r = arith(7, 3, '%', true);  ok(r.ok && r.output === '1\n', '7%3 → 1');
  r = arith(-7, 3, '%', true); ok(r.ok && r.output === '-1\n', '-7%3 → -1 (signo del dividendo)');
  r = arith(10, 4, '/', false); ok(r.ok && r.output === '2.5\n', '10.0/4.0 → 2.5');
  r = arith(5, 0, '/', true);  ok(!r.ok && r.error.includes('división entre cero'), 'división entre cero → error');
  r = arith(5, 0, '%', true);  ok(!r.ok && r.error.includes('módulo entre cero'), 'módulo entre cero → error');
  r = arith(5, 2.5, '*', true, false); ok(r.ok && r.output === '12.5\n', 'int*float → float');
})();

/* ---------- 4. Comparaciones y lógica ---------- */
(() => {
  function cmp(a, b, op){
    return run([begin(1), print(2), litInt(3, a), litInt(4, b), P(5, 'compare', [prop('op', op)])],
      [['1.then','2.in'],['3.value','5.a'],['4.value','5.b'],['5.result','2.text']]);
  }
  ok(cmp(10, 3, '>').output === 'true\n', '10 > 3 → true');
  ok(cmp(3, 3, '==').output === 'true\n', '3 == 3');
  ok(cmp(3, 4, '!=').output === 'true\n', '3 != 4');
  ok(cmp(4, 4, '<=').output === 'true\n', '4 <= 4');
  // comparar strings
  let r = run([begin(1), print(2), litStr(3,'oro'), litStr(4,'oro'), P(5,'compare',[prop('op','==')])],
    [['1.then','2.in'],['3.value','5.a'],['4.value','5.b'],['5.result','2.text']]);
  ok(r.ok && r.output === 'true\n', '«oro»==«oro»');
  // int vs float
  r = run([begin(1), print(2), litInt(3,5), litFloat(4,5.0), P(5,'compare',[prop('op','==')])],
    [['1.then','2.in'],['3.value','5.a'],['4.value','5.b'],['5.result','2.text']]);
  ok(r.ok && r.output === 'true\n', '5 == 5.0');
  // lógica
  function logic(op, av, bv, notSingle){
    const nodes = [begin(1), print(2), litBool(3,av), litBool(4,bv), P(5,'logic',[prop('op',op)])];
    const wires = [['1.then','2.in'],['3.value','5.a'],['4.value','5.b'],['5.result','2.text']];
    if(notSingle){ nodes.splice(3,1); wires.splice(2,1); }
    return run(nodes, wires);
  }
  ok(logic('and', true, false).output === 'false\n', 'true AND false → false');
  ok(logic('or', true, false).output === 'true\n', 'true OR false → true');
  ok(logic('xor', true, false).output === 'true\n', 'true XOR false → true');
  ok(logic('xor', true, true).output === 'false\n', 'true XOR true → false');
  ok(logic('not', false, null, true).output === 'true\n', 'NOT false → true');
  ok(logic('not', true, null, true).output === 'false\n', 'NOT true → false');
})();

/* ---------- 5. Branch ---------- */
(() => {
  let r = run([begin(1), N(2,'branch'), print(3), print(4), litBool(5,true), litStr(6,'Vivo'), litStr(7,'Derrota')],
    [['1.then','2.in'],['2.true','3.in'],['2.false','4.in'],['5.value','2.cond'],['6.value','3.text'],['7.value','4.text']]);
  ok(r.ok && r.output === 'Vivo\n', 'Branch true → ✓');
  r = run([begin(1), N(2,'branch'), print(3), print(4), litBool(5,false), litStr(6,'Vivo'), litStr(7,'Derrota')],
    [['1.then','2.in'],['2.true','3.in'],['2.false','4.in'],['5.value','2.cond'],['6.value','3.text'],['7.value','4.text']]);
  ok(r.ok && r.output === 'Derrota\n', 'Branch false → ✗');
  // cond con compare
  r = run([begin(1), N(2,'branch'), print(3), print(4), litInt(5,10), litInt(6,3), P(7,'compare',[prop('op','>')]), litStr(8,'Mayor'), litStr(9,'Menor')],
    [['1.then','2.in'],['2.true','3.in'],['2.false','4.in'],['5.value','7.a'],['6.value','7.b'],['7.result','2.cond'],['8.value','3.text'],['9.value','4.text']]);
  ok(r.ok && r.output === 'Mayor\n', 'Branch con compare 10>3');
  // cond de int → error de validación
  r = run([begin(1), N(2,'branch'), print(3), litInt(4,1), litStr(5,'x')], [['1.then','2.in'],['2.true','3.in'],['4.value','2.cond'],['5.value','3.text']]);
  ok(!r.ok && r.error.includes('bool'), 'int → cond bool: error de runtime pidiendo bool: ' + (r.ok ? 'OK?!' : r.error));
  // cond sin conectar
  r = run([begin(1), N(2,'branch'), print(3), litStr(4,'x')], [['1.then','2.in'],['2.true','3.in'],['4.value','3.text']]);
  ok(!r.ok && r.error.includes('Condición') && r.error.includes('no está conectada'), 'Branch sin condición → error en español');
})();

/* ---------- 6. Variables ---------- */
(() => {
  let set = (id, name, val) => P(id, 'setvar', [prop('name', name), prop('type','int')]);
  let get = (id, name) => P(id, 'getvar', [prop('name', name), prop('type','int')]);
  let r = run([begin(1), set(2,'puntaje',0), print(3), litInt(4,42), litStr(5,'Puntos: ')],
    [['1.then','2.in'],['2.then','3.in'],['4.value','2.value'],['5.value','3.text']]);
  ok(r.ok && r.vars && r.vars.puntaje === 42, 'setvar guarda en vars');
  ok(r.output === 'Puntos: \n', 'print tras Set imprime su texto');
  // Set → Get → print + vars finales
  r = run([begin(1), set(2,'oro',0), get(3,'oro'), print(4), P(5,'arith',[prop('op','+')]), litInt(6,10)],
    [['1.then','2.in'],['2.then','4.in'],['6.value','2.value'],['3.value','5.a'],['6.value','5.b'],['5.result','4.text']]);
  ok(r.ok && r.output === '20\n' && r.vars.oro === 10, 'get(10)+10 → 20, vars.oro=10: ' + (r.ok ? r.output : r.error));
  // encadenar Sets: vida 100 → set daño → get
  r = run([begin(1), set(2,'vida',0), set(3,'vida',0), get(4,'vida'), print(5), litInt(6,100), litInt(7,60)],
    [['1.then','2.in'],['2.then','3.in'],['3.then','5.in'],['6.value','2.value'],['7.value','3.value'],['4.value','5.text']]);
  ok(r.ok && r.output === '60\n' && r.vars.vida === 60, 're-asignación de variable: ' + (r.ok ? r.output : r.error));
  // getvar sin set → error
  r = run([begin(1), print(2), get(3,'oro')], [['1.then','2.in'],['3.value','2.text']]);
  ok(!r.ok && r.error.includes('no tiene valor'), 'Get sin Set → error claro');
  // variable string
  let sets = P(2,'setvar',[prop('name','nombre'),prop('type','string')]);
  r = run([begin(1), sets, get(3,'nombre'), print(4), litStr(5,'Esperanza')],
    [['1.then','2.in'],['2.then','4.in'],['5.value','2.value'],['3.value','4.text']]);
  ok(r.ok && r.output === 'Esperanza\n' && r.vars.nombre === 'Esperanza', 'variable de string: ' + (r.ok ? r.output : r.error));
  // set float en var int → rechazado (To Int requerido)
  r = run([begin(1), P(2,'setvar',[prop('name','x'),prop('type','int')]), litFloat(3,2.5)],
    [['1.then','2.in'],['3.value','2.value']]);
  ok(!r.ok && r.error.includes('To Int'), 'Set int recibe float → exige To Int');
})();

/* ---------- 7. ForLoop ---------- */
(() => {
  // 1..5 inclusivo con Index
  let r = run([begin(1), N(2,'forloop'), print(3)],
    [['1.then','2.in'],['2.body','3.in'],['2.index','3.text']]);
  ok(r.ok && r.output === '1\n2\n3\n4\n5\n', 'ForLoop 1..5 INCLUSIVO con Index: ' + JSON.stringify(r.output));
  // first/last por cables
  r = run([begin(1), N(2,'forloop'), print(3), litInt(4,0), litInt(5,3)],
    [['1.then','2.in'],['4.value','2.first'],['5.value','2.last'],['2.body','3.in'],['2.index','3.text']]);
  ok(r.ok && r.output === '0\n1\n2\n3\n', 'ForLoop 0..3 por cables');
  // first > last → solo completed
  r = run([begin(1), N(2,'forloop'), print(4), litInt(5,5), litInt(6,1), litStr(7,'Fin')],
    [['1.then','2.in'],['2.completed','4.in'],['5.value','2.first'],['6.value','2.last'],['7.value','4.text']]);
  ok(r.ok && r.output === 'Fin\n', 'ForLoop 5..1 no itera → completed');
  // Index fuera del cuerpo → error
  r = run([begin(1), N(2,'forloop'), print(3), print(4)],
    [['1.then','2.in'],['2.body','3.in'],['2.completed','4.in'],['2.index','4.text']]);
  ok(!r.ok && r.error.includes('dentro del cuerpo'), 'Index fuera del cuerpo → error');
  // first float → error
  r = run([begin(1), N(2,'forloop'), litFloat(3,1.5)],
    [['1.then','2.in'],['3.value','2.first']]);
  ok(!r.ok && r.error.includes('To Int'), 'ForLoop first float → exige To Int');
  // defaults 1..5 sin conectar
  r = run([begin(1), N(2,'forloop'), print(3)], [['1.then','2.in'],['2.body','3.in'],['2.index','3.text']]);
  ok(r.ok && r.output === '1\n2\n3\n4\n5\n', 'ForLoop con defaults (1..5)');
})();

/* ---------- 8. WhileLoop ---------- */
(() => {
  // cuenta regresiva: vida 3 → while vida>0: print vida; set vida = vida-1
  let r = run([begin(1), P(2,'setvar',[prop('name','vida'),prop('type','int')]), N(3,'whileloop'), print(4),
               P(5,'setvar',[prop('name','vida'),prop('type','int')]), P(6,'getvar',[prop('name','vida'),prop('type','int')]),
               P(7,'compare',[prop('op','>')]), P(8,'arith',[prop('op','-')]), litInt(9,3), litInt(10,1), litInt(11,0)],
    [['1.then','2.in'],['2.then','3.in'],['9.value','2.value'],
     ['7.result','3.cond'],['6.value','7.a'],['11.value','7.b'],
     ['3.body','4.in'],['6.value','4.text'],['3.body','5.in'],
     ['6.value','8.a'],['10.value','8.b'],['8.result','5.value']]);
  ok(r.ok && r.output === '3\n2\n1\n', 'WhileLoop cuenta regresiva 3,2,1: ' + JSON.stringify(r.output));
  ok(r.vars.vida === 0, 'vida termina en 0');
  // ciclo infinito detectado
  r = run([begin(1), P(2,'setvar',[prop('name','x'),prop('type','int')]), N(3,'whileloop'), litBool(4,true), litInt(5,1)],
    [['1.then','2.in'],['2.then','3.in'],['5.value','2.value'],['4.value','3.cond'],['3.body','2.in']]);
  ok(!r.ok && (r.error.includes('no termina nunca') || r.error.includes('posible ciclo infinito')), 'WhileLoop infinito detectado');
  // while que nunca entra
  r = run([begin(1), N(2,'whileloop'), print(3), print(4), litBool(5,false), litStr(6,'Fuera')],
    [['1.then','2.in'],['5.value','2.cond'],['2.body','3.in'],['2.completed','4.in'],['6.value','4.text']]);
  ok(r.ok && r.output === 'Fuera\n', 'WhileLoop cond false de entrada → completed');
})();

/* ---------- 9. Arrays y ForEach ---------- */
(() => {
  let mk = (id, items) => P(id, 'make_array', [prop('items', items)]);
  let r = run([begin(1), N(2,'foreach'), print(3), mk(4, [10,20,30])],
    [['1.then','2.in'],['4.array','2.array'],['2.body','3.in'],['2.element','3.text']]);
  ok(r.ok && r.output === '10\n20\n30\n', 'ForEach imprime elementos');
  r = run([begin(1), N(2,'foreach'), print(3), mk(4,['oro','plata','bronce'])],
    [['1.then','2.in'],['4.array','2.array'],['2.body','3.in'],['2.array_index','3.text']]);
  ok(r.ok && r.output === '0\n1\n2\n', 'ForEach Array Index');
  r = run([begin(1), N(2,'foreach'), print(3), print(4), mk(5,[]), litStr(6,'Fin')],
    [['1.then','2.in'],['5.array','2.array'],['2.body','3.in'],['2.completed','4.in'],['6.value','4.text']]);
  ok(r.ok && r.output === 'Fin\n', 'ForEach vacío → completed');
  // Array Length
  r = run([begin(1), print(2), P(3,'array_len'), mk(4,['a','b','c'])],
    [['1.then','2.in'],['4.array','3.array'],['3.length','2.text']]);
  ok(r.ok && r.output === '3\n', 'Array Length = 3');
  // Get por índice
  r = run([begin(1), print(2), P(3,'array_get'), mk(4,['oro','plata']), litInt(5,1)],
    [['1.then','2.in'],['4.array','3.array'],['5.value','3.index'],['3.value','2.text']]);
  ok(r.ok && r.output === 'plata\n', 'Get Array Elem índice 1');
  r = run([begin(1), print(2), P(3,'array_get'), mk(4,['a']), litInt(5,5)],
    [['1.then','2.in'],['4.array','3.array'],['5.value','3.index'],['3.value','2.text']]);
  ok(!r.ok && r.error.includes('fuera de rango'), 'índice fuera de rango → error');
  // Array Add + Set (inventario crece)
  let setInv = P(2,'setvar',[prop('name','inv'),prop('type','array')]);
  let getInv = P(6,'getvar',[prop('name','inv'),prop('type','array')]);
  r = run([begin(1), setInv, N(7,'foreach'), print(3), P(8,'array_add'), getInv, mk(4,['espada']), litStr(9,'pocion')],
    [['1.then','2.in'],['4.array','2.value'],['2.then','8.in'],['8.then','7.in'],
     ['8.result','2.value'], // array_add → set (segunda escritura del mismo set: OJO)
     ['4.array','7.array'],['7.body','3.in'],['7.element','3.text']]);
  // Este grafo es raro (set dos veces); simplifico: probamos array_add puro
  r = run([begin(1), print(2), P(3,'array_len'), P(4,'array_add'), mk(5,['espada']), litStr(6,'pocion')],
    [['1.then','2.in'],['5.array','4.array'],['6.value','4.item'],['4.result','3.array'],['3.length','2.text']]);
  ok(r.ok && r.output === '2\n', 'Array Add devuelve array con +1 → Length 2');
})();

/* ---------- 10. FlipFlop ---------- */
(() => {
  let r = run([begin(1), N(2,'forloop'), litInt(9,1), litInt(10,4), N(3,'flipflop'), print(4), print(5), litStr(6,'A'), litStr(7,'B')],
    [['1.then','2.in'],['9.value','2.first'],['10.value','2.last'],
     ['2.body','3.in'],['3.a','4.in'],['3.b','5.in'],['6.value','4.text'],['7.value','5.text']]);
  ok(r.ok && r.output === 'A\nB\nA\nB\n', 'FlipFlop alterna A B A B: ' + JSON.stringify(r.output));
  // pin Is A
  r = run([begin(1), N(2,'forloop'), litInt(9,1), litInt(10,2), N(3,'flipflop'), print(4), N(11,'branch'), print(12), print(13), litStr(14,'esA'), litStr(15,'esB')],
    [['1.then','2.in'],['9.value','2.first'],['10.value','2.last'],
     ['2.body','3.in'],['3.a','11.in'],['3.b','11.in'],['11.true','12.in'],['11.false','13.in'],['3.isA','11.cond'],['14.value','12.text'],['15.value','13.text']]);
  ok(r.ok && r.output === 'esA\nesB\n', 'FlipFlop Is A pin');
})();

/* ---------- 11. Custom Events ---------- */
(() => {
  let r = run([begin(1), print(2), N(3,'call_custom',[prop('target','Saludo')]), print(4), N(5,'event_custom',[prop('name','Saludo')]), print(6), print(7), litStr(8,'A'), litStr(9,'C'), litStr(10,'B'), litStr(11,'D')],
    [['1.then','2.in'],['2.then','3.in'],['3.then','4.in'],['5.then','6.in'],['6.then','7.in'],
     ['8.value','2.text'],['9.value','4.text'],['10.value','6.text'],['11.value','7.text']]);
  ok(r.ok && r.output === 'A\nB\nD\nC\n', 'Call salta al evento y REGRESA: A,B,D,C: ' + JSON.stringify(r.output));
  r = run([begin(1), N(2,'call_custom',[prop('target','NoExiste')])], [['1.then','2.in']]);
  ok(!r.ok && r.error.includes('NoExiste'), 'Call a evento inexistente → error');
  // evento que llama a otro evento
  r = run([begin(1), N(2,'call_custom',[prop('target','Uno')]), N(3,'event_custom',[prop('name','Uno')]), N(4,'call_custom',[prop('target','Dos')]), N(5,'event_custom',[prop('name','Dos')]), print(6), print(7), print(8), litStr(9,'inicio'), litStr(10,'uno'), litStr(11,'dos')],
    [['1.then','2.in'],['2.then','6.in'],['3.then','4.in'],['4.then','7.in'],['5.then','8.in'],
     ['9.value','6.text'],['10.value','7.text'],['11.value','8.text']]);
  ok(r.ok && r.output === 'dos\nuno\ninicio\n', 'llamadas anidadas (el interno termina primero): ' + (r.ok ? r.output : r.error));
})();

/* ---------- 12. Validación y errores ---------- */
(() => {
  let v = BPX.validate(G([begin(1), begin(1)], []));
  ok(!v.ok && v.error.includes('mismo id'), 'ids duplicados rechazados');
  v = BPX.validate(G([begin(1), N(2,'print')], [['1.then','2.noexiste']]));
  ok(!v.ok && v.error.includes('no es una entrada'), 'pin inexistente rechazado');
  v = BPX.validate(G([begin(1), N(2,'print')], [['1.then','2.then']]));
  ok(!v.ok, 'cable hacia salida rechazado');
  v = BPX.validate(G([begin(1), N(2,'print'), litInt(3,1)], [['3.value','1.cond']]));
  ok(!v.ok, 'pin inexistente en origen rechazado');
  v = BPX.validate(G([begin(1), print(2), print(3), litStr(4,'x'), litStr(5,'y')], [['1.then','2.in'],['1.then','3.in'],['4.value','2.text'],['5.value','2.text']]));
  ok(!v.ok && v.error.includes('más de un cable'), 'dos cables a una misma entrada rechazados');
  let r = run([begin(1), print(2), litInt(3,1)], [['1.then','2.in'],['3.value','2.cond']]);
  ok(!r.ok, 'tipo incompatible detectado');
  // nodo inexistente en cable
  v = BPX.validate(G([begin(1)], [['1.then','99.in']]));
  ok(!v.ok && v.error.includes('no existe'), 'cable a nodo inexistente');
})();

/* ---------- 13. gradeOutput ---------- */
(() => {
  ok(BPX.gradeOutput(['a','b'], 'a\nb').ok === true, 'gradeOutput idéntico');
  let g = BPX.gradeOutput(['a','b'], 'a\nc');
  ok(!g.ok && g.why.includes('línea 2') && g.why.includes('«b»') && g.why.includes('«c»'), 'diff señala línea y valores: ' + g.why);
  g = BPX.gradeOutput(['a','b','c'], 'a\nb');
  ok(!g.ok && g.why.includes('faltaron líneas'), 'faltan líneas');
  g = BPX.gradeOutput(['a'], 'a\nb');
  ok(!g.ok && g.why.includes('líneas de más'), 'sobra una línea');
  g = BPX.gradeOutput(['Hola mundo'], 'Hola mundo ');
  ok(!g.ok, 'espacio final sin trim → difiere');
  g = BPX.gradeOutput(['Hola mundo'], 'Hola mundo ', {trim:true});
  ok(g.ok === true, 'trim tolera espacios finales');
  g = BPX.gradeOutput(['1','2'], '01\n2');
  ok(!g.ok, 'no confunde «01» con «1»');
})();

/* ---------- 14. Proyecto integrador (mini: oleadas) ---------- */
(() => {
  // BeginPlay: set oleadas 2 → forloop 1..oleadas → print "Oleada N" → foreach slimes → print "Slime xN"
  let r = run([
    begin(1),
    P(2,'setvar',[prop('name','oleadas'),prop('type','int')]),
    N(3,'forloop'),
    print(4), P(5,'concat'), litStr(6,'Oleada '), litStr(7,' '), P(8,'to_string'),
    N(9,'foreach'), print(10), P(11,'concat'), litStr(12,'Slime '), P(13,'to_string'),
    mk(14, [1,2,3]),
    litInt(15,2),
    P(16,'getvar',[prop('name','oleadas'),prop('type','int')])
  ], [
    ['1.then','2.in'], ['15.value','2.value'],
    ['2.then','3.in'],
    ['16.value','3.last'],
    ['3.body','4.in'], ['6.value','5.a'], ['8.result','5.b'], ['3.index','8.value'], ['5.result','4.text'],
    ['3.body','9.in'], ['14.array','9.array'],
    ['9.body','10.in'], ['12.value','11.a'], ['13.result','11.b'], ['9.array_index','13.value'], ['11.result','10.text']
  ]);
  ok(r.ok, 'grafo integrador corre: ' + (r.ok ? '' : r.error));
  if(r.ok){
    ok(r.output === 'Oleada 1\nSlime 0\nSlime 1\nSlime 2\nOleada 2\nSlime 0\nSlime 1\nSlime 2\n',
       'salida del proyecto mini exacta:\n' + r.output);
    ok(r.vars.oleadas === 2, 'vars.oleadas = 2');
  }
})();

/* ---------- 15. coercible / fmtVal expuestos ---------- */
(() => {
  ok(BPX.coercible('int','float') === true, 'int → float implícito');
  ok(BPX.coercible('float','int') === false, 'float → int NO implícito');
  ok(BPX.coercible('int','string') === true, 'int → string implícito (print/append)');
  ok(BPX.coercible('bool','int') === false, 'bool → int NO');
  ok(BPX.fmtVal(5) === '5' && BPX.fmtVal(new Number(5)) === '5.0' && BPX.fmtVal(2.5) === '2.5' && BPX.fmtVal(true) === 'true', 'fmtVal (primitivo entero vs float caja)');
  ok(BPX.fmtVal(0.1+0.2) === '0.3', 'fmtVal limpia flotantes');
})();

console.log('\n=== BPX: ' + pass + ' OK · ' + fail + ' FALLO ===');
process.exit(fail ? 1 : 0);
