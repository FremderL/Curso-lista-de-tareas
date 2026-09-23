/* ============================================================
   BPX — mini-motor de Blueprints (Unreal Engine 5.8) para el curso
   «Unreal Engine desde cero» · CodeCamp
   ------------------------------------------------------------
   Un grafo = { nodes:[{id,type,x,y,props}], wires:[{from,to}] }
   - from/to = 'nodeId.pin'  (from SIEMPRE es pin de salida,
     to SIEMPRE pin de entrada; igual que en UE).
   - Pines de ejecución (flechas blancas) vs pines de datos
     (colores estilo UE: bool rojo, int teal, float verde,
      string magenta, array verde-oliva).
   API: BPX.run(grafo,{maxSteps}) → {ok,output,vars}|{ok:false,error}
        BPX.gradeOutput(esperadas, obtenidas) → {ok,why}
        BPX.validate(grafo) → null | 'error'
        BPX.SPEC / BPX.fmtVal / BPX.coercible  (para la UI)
   Errores SIEMPRE en español, con el nodo culpable.
   ============================================================ */
var BPX = (function(){
'use strict';

/* ---------- especificación de nodos ---------- */
var SPEC = {
  event_beginplay:{ title:'Event BeginPlay', cat:'Eventos', emoji:'▶️',
    execOut:['then'], dIn:{}, dOut:{}, ctxOut:{}, props:[],
    desc:'Se dispara una vez, al comenzar el juego' },
  event_custom:{ title:'Custom Event', cat:'Eventos', emoji:'📌',
    execOut:['then'], dIn:{}, dOut:{}, ctxOut:{}, props:[{k:'name',def:'MiEvento',label:'Nombre'}],
    desc:'Punto de entrada con nombre; se invoca con Call' },
  call_custom:{ title:'Call Custom Event', cat:'Eventos', emoji:'📞',
    execIn:'in', execOut:['then'], dIn:{}, dOut:{}, ctxOut:{}, props:[{k:'target',def:'MiEvento',label:'Evento'}],
    desc:'Salta al Custom Event y regresa para continuar' },

  print:{ title:'Print String', cat:'Acciones', emoji:'🖨️',
    execIn:'in', execOut:['then'], dIn:{text:'string'}, dOut:{}, ctxOut:{}, props:[],
    dInDef:{text:''}, desc:'Escribe una línea en el Output Log' },

  branch:{ title:'Branch', cat:'Flujo', emoji:'🔀',
    execIn:'in', execOut:['true','false'], dIn:{cond:'bool'}, dOut:{}, ctxOut:{}, props:[],
    desc:'Si la condición es verdadera va por ✓, si no por ✗' },
  sequence:{ title:'Sequence', cat:'Flujo', emoji:'📋',
    execIn:'in', execOut:['then0','then1'], dIn:{}, dOut:{}, ctxOut:{}, props:[],
    desc:'Ejecuta primero Then 0 y después Then 1' },
  forloop:{ title:'ForLoop', cat:'Flujo', emoji:'🔁',
    execIn:'in', execOut:['body','completed'], dIn:{first:'int',last:'int'}, dOut:{},
    ctxOut:{body:{index:'int'}}, dInDef:{first:1,last:5}, props:[],
    desc:'Repite el cuerpo de first a last, INCLUSIVO; expone Index' },
  whileloop:{ title:'WhileLoop', cat:'Flujo', emoji:'🔄',
    execIn:'in', execOut:['body','completed'], dIn:{cond:'bool'}, dOut:{}, ctxOut:{}, props:[],
    desc:'Repite el cuerpo mientras la condición sea verdadera' },
  foreach:{ title:'ForEachLoop', cat:'Flujo', emoji:'🔂',
    execIn:'in', execOut:['body','completed'], dIn:{array:'array'}, dOut:{},
    ctxOut:{body:{element:'any', array_index:'int'}}, props:[],
    desc:'Recorre un array; expone Element y Array Index' },
  flipflop:{ title:'FlipFlop', cat:'Flujo', emoji:'🩴',
    execIn:'in', execOut:['a','b'], dIn:{}, dOut:{isA:'bool'}, ctxOut:{}, props:[],
    desc:'Primera vez ejecuta A, siguiente B, alternando; expone Is A' },

  getvar:{ title:'Get Variable', cat:'Variables', emoji:'📤',
    execOut:[], dIn:{}, dOut:{value:'auto'}, ctxOut:{},
    props:[{k:'name',def:'MiVar',label:'Variable'},{k:'type',def:'int',hidden:true},{k:'default',def:0,hidden:true}],
    desc:'Lee el valor actual de una variable' },
  setvar:{ title:'Set Variable', cat:'Variables', emoji:'📥',
    execIn:'in', execOut:['then'], dIn:{value:'auto'}, dOut:{value:'auto'}, ctxOut:{},
    props:[{k:'name',def:'MiVar',label:'Variable'},{k:'type',def:'int',hidden:true}],
    desc:'Guarda un valor en la variable y sigue la cadena' },

  lit_int:{ title:'Literal int', cat:'Datos', emoji:'🟢',
    execOut:[], dIn:{}, dOut:{value:'int'}, ctxOut:{}, props:[{k:'value',def:0,kind:'int'}],
    desc:'Número entero (teal en UE)' },
  lit_float:{ title:'Literal float', cat:'Datos', emoji:'🟩',
    execOut:[], dIn:{}, dOut:{value:'float'}, ctxOut:{}, props:[{k:'value',def:0.5,kind:'float'}],
    desc:'Número decimal (verde en UE)' },
  lit_string:{ title:'Literal string', cat:'Datos', emoji:'🟣',
    execOut:[], dIn:{}, dOut:{value:'string'}, ctxOut:{}, props:[{k:'value',def:'',kind:'string'}],
    desc:'Texto (magenta en UE)' },
  lit_bool:{ title:'Literal bool', cat:'Datos', emoji:'🔴',
    execOut:[], dIn:{}, dOut:{value:'bool'}, ctxOut:{}, props:[{k:'value',def:false,kind:'bool'}],
    desc:'Verdadero o falso (rojo en UE)' },

  arith:{ title:'Aritmética', cat:'Matemática', emoji:'🧮',
    execOut:[], dIn:{a:'num',b:'num'}, dOut:{result:'num'}, ctxOut:{},
    props:[{k:'op',def:'+',choices:['+','-','*','/','%']}],
    desc:'Suma, resta, multiplica, divide o módulo (int/int trunca)' },
  compare:{ title:'Comparar', cat:'Matemática', emoji:'⚖️',
    execOut:[], dIn:{a:'numstr',b:'numstr'}, dOut:{result:'bool'}, ctxOut:{},
    props:[{k:'op',def:'<',choices:['==','!=','<','>','<=','>=']}],
    desc:'Compara dos valores y da un bool' },
  logic:{ title:'Lógica booleana', cat:'Matemática', emoji:'🧠',
    execOut:[], dIn:{a:'bool',b:'bool'}, dOut:{result:'bool'}, ctxOut:{},
    props:[{k:'op',def:'and',choices:['and','or','xor','not']}],
    desc:'AND, OR, XOR o NOT (con un solo cable en NOT)' },

  concat:{ title:'Append (unir textos)', cat:'Datos', emoji:'🔗',
    execOut:[], dIn:{a:'string',b:'string'}, dOut:{result:'string'}, ctxOut:{}, props:[],
    desc:'Une dos textos (convierte números solos)' },
  make_array:{ title:'Make Array', cat:'Arrays', emoji:'🧺',
    execOut:[], dIn:{}, dOut:{array:'array'}, ctxOut:{},
    props:[{k:'items',def:[],kind:'array'}], desc:'Crea un array literal' },
  array_len:{ title:'Array Length', cat:'Arrays', emoji:'📏',
    execOut:[], dIn:{array:'array'}, dOut:{length:'int'}, ctxOut:{}, props:[],
    desc:'Cuántos elementos tiene el array' },
  array_get:{ title:'Get Array Elem', cat:'Arrays', emoji:'🎯',
    execOut:[], dIn:{array:'array',index:'int'}, dOut:{value:'any'}, ctxOut:{}, props:[],
    desc:'Lee el elemento en la posición Index (desde 0)' },
  array_add:{ title:'Array Add', cat:'Arrays', emoji:'➕',
    execOut:[], dIn:{array:'array',item:'any'}, dOut:{result:'array'}, ctxOut:{}, props:[],
    desc:'Devuelve el array con un elemento más (combínalo con Set)' },

  to_string:{ title:'To String', cat:'Conversión', emoji:'➡️',
    execOut:[], dIn:{value:'any'}, dOut:{result:'string'}, ctxOut:{}, props:[],
    desc:'Convierte cualquier valor a texto (ToString de UE)' },
  to_int:{ title:'To Int (Truncate)', cat:'Conversión', emoji:'✂️',
    execOut:[], dIn:{value:'num'}, dOut:{result:'int'}, ctxOut:{}, props:[],
    desc:'Trunca el decimal hacia cero: 3.9 → 3, -3.9 → -3' },
  to_float:{ title:'To Float', cat:'Conversión', emoji:'🌊',
    execOut:[], dIn:{value:'num'}, dOut:{result:'float'}, ctxOut:{}, props:[],
    desc:'Promueve un entero a decimal' }
};

/* ---------- utilidades ---------- */
function err(msg){ var e = new Error(msg); e.bpx = true; return e; }
function unbox(v){ return (v instanceof Number) ? v.valueOf() : v; }
function mkNum(v, isF){ v = unbox(v); return (isF && isNum(v)) ? new Number(v) : v; }
function isInt(v){ if(v instanceof Number) return false; v = unbox(v); return typeof v === 'number' && isFinite(v) && Math.floor(v) === v; }
function isNum(v){ v = unbox(v); return typeof v === 'number' && isFinite(v); }
function spec(type){ var s = SPEC[type]; if(!s) throw err('Tipo de nodo desconocido: «'+type+'»'); return s; }

/* formatea un valor como lo hace UE al imprimir */
function fmtVal(v){
  if(v instanceof Number){ var rr = +v.valueOf().toPrecision(12); return Number.isInteger(rr) ? rr + '.0' : String(rr); }
  if(typeof v === 'string') return v;
  if(typeof v === 'boolean') return v ? 'true' : 'false';
  if(isInt(v)) return String(v);
  if(isNum(v)){ var r = +v.toPrecision(12); return Number.isInteger(r) ? r + '.0' : String(r); }
  if(Array.isArray(v)) throw err('No se puede imprimir un array completo: recórrelo con ForEachLoop');
  throw err('Valor no imprimible');
}
/* ¿un cable de kindFrom puede entrar a un pin kindTo? */
function coercible(kf, kt){
  if(kf === 'auto') kf = 'any';
  if(kt === 'auto') kt = 'any';
  if(kf === kt || kt === 'any') return true;
  if(kt === 'string') return kf === 'int' || kf === 'float' || kf === 'bool'; // conversión implícita estilo Print/Append
  if(kt === 'float' || kt === 'num') return kf === 'int' || kf === 'float';
  if(kt === 'numstr') return kf === 'int' || kf === 'float' || kf === 'string';
  return false;
}
var PIN_COLORS = { exec:'#f8fafc', bool:'#ef4444', int:'#2dd4bf', float:'#4ade80', string:'#e879f9', array:'#a3a375', any:'#cbd5e1', num:'#86efac', numstr:'#fca5a5', auto:'#cbd5e1' };

/* ---------- validación estructural ---------- */
function nodeById(g, id){ for(var i=0;i<g.nodes.length;i++) if(String(g.nodes[i].id) === String(id)) return g.nodes[i]; return null; }
function pinKind(n, pin, dir){ // dir 'out'|'in' → kind de pin o null
  var s = spec(n.type);
  if(dir === 'in'){
    if(s.execIn === pin) return 'exec';
    if(s.dIn && Object.prototype.hasOwnProperty.call(s.dIn, pin)) return s.dIn[pin] === 'auto' ? varType(n) : s.dIn[pin];
    return null;
  }
  if(s.execOut && s.execOut.indexOf(pin) >= 0) return 'exec';
  if(s.dOut && Object.prototype.hasOwnProperty.call(s.dOut, pin)) return s.dOut[pin] === 'auto' ? varType(n) : s.dOut[pin];
  if(s.ctxOut){ for(var ep in s.ctxOut){ if(Object.prototype.hasOwnProperty.call(s.ctxOut[ep], pin)) return s.ctxOut[ep][pin]; } }
  return null;
}
function varType(n){
  var t = (n.props && n.props.type) || 'int';
  return (t === 'float' || t === 'bool' || t === 'string' || t === 'array') ? t : 'int';
}
function validate(g){
  if(!g || !Array.isArray(g.nodes) || !Array.isArray(g.wires)) return 'El grafo debe tener nodes[] y wires[].';
  var seen = {};
  for(var i=0;i<g.nodes.length;i++){
    var n = g.nodes[i];
    if(n.id == null || n.id === '') return 'Hay un nodo sin id.';
    var key = String(n.id);
    if(seen[key]) return 'Hay dos nodos con el mismo id: #'+key;
    seen[key] = 1;
    if(!SPEC[n.type]) return 'Nodo #'+key+': tipo desconocido «'+n.type+'».';
    if(!n.props || typeof n.props !== 'object' || Array.isArray(n.props)) n.props = {};
  }
  var inCount = {};
  for(var w=0;w<g.wires.length;w++){
    var wire = g.wires[w];
    if(!wire.from || !wire.to) return 'Hay un cable sin origen o destino.';
    var fp = String(wire.from).split('.'), tp = String(wire.to).split('.');
    var fn = nodeById(g, fp[0]), tn = nodeById(g, tp[0]);
    if(!fn) return 'El cable ' + wire.from + ' → ' + wire.to + ' apunta a un nodo que no existe.';
    if(!tn) return 'El cable ' + wire.from + ' → ' + wire.to + ' apunta a un nodo que no existe.';
    var kf = pinKind(fn, fp[1], 'out'), kt = pinKind(tn, tp[1], 'in');
    if(kf === null) return 'Nodo #'+fn.id+' ('+spec(fn.type).title+'): el pin «'+fp[1]+'» no es una salida.';
    if(kt === null) return 'Nodo #'+tn.id+' ('+spec(tn.type).title+'): el pin «'+tp[1]+'» no es una entrada.';
    if(kf === 'exec' && kt !== 'exec') return 'Nodo #'+tn.id+': una flecha de ejecución no puede entrar a un pin de datos.';
    if(kf !== 'exec' && kt === 'exec') return 'Nodo #'+tn.id+': un cable de datos no puede entrar a una flecha de ejecución.';
    if(kt !== 'exec'){
      var inKey = tn.id+'.'+tp[1];
      inCount[inKey] = (inCount[inKey]||0) + 1;
      if(inCount[inKey] > 1) return 'Nodo #'+tn.id+' ('+spec(tn.type).title+'): la entrada «'+tp[1]+'» recibe más de un cable. En UE cada entrada de datos recibe solo uno.';
    }
  }
  return null;
}

/* ---------- evaluación de datos ---------- */
function run(g, opts){
  opts = opts || {};
  var maxSteps = opts.maxSteps || 6000;
  var vErr = validate(g);
  if(vErr) return { ok:false, error:'⚠️ ' + vErr };

  var out = [], steps = 0, vars = {}, ff = {}, deferred = [];
  var outW = {}, inW = {};
  g.wires.forEach(function(w){
    var fp = String(w.from).split('.'), tp = String(w.to).split('.');
    (outW[fp[0]] = outW[fp[0]] || {})[fp[1]] = (outW[fp[0]][fp[1]] || []);
    outW[fp[0]][fp[1]].push({ n:tp[0], p:tp[1] });
    (inW[tp[0]] = inW[tp[0]] || {})[tp[1]] = { n:fp[0], p:fp[1] };
  });

  function step(){
    if(++steps > maxSteps) throw err('Tu grafo tardó demasiado ('+maxSteps+' pasos): posible ciclo infinito en un WhileLoop o ForLoop.');
  }
  function evalPin(nid, pin, ctx){
    var n = nodeById(g, nid);
    if(!n) throw err('Nodo inexistente #'+nid);
    var s = spec(n.type);
    // ¿es un pin de datos de salida de este nodo?
    if(s.dOut && Object.prototype.hasOwnProperty.call(s.dOut, pin)){
      return evalOut(n, s, pin, ctx);
    }
    var isCtx = false;
    if(s.ctxOut){ for(var ep2 in s.ctxOut){ if(Object.prototype.hasOwnProperty.call(s.ctxOut[ep2], pin)) isCtx = true; } }
    if(isCtx){
      if(ctx && String(ctx.node) === String(nid)) return ctx.values[pin];
      throw err('Nodo #'+nid+' ('+s.title+'): el pin «'+pin+'» solo puede leerse dentro del cuerpo de ese mismo nodo.');
    }
    throw err('Nodo #'+nid+' ('+s.title+'): el pin «'+pin+'» no es una salida de datos.');
  }
  function evalOut(n, s, pin, ctx){
    var t = n.type;
    var props = n.props || {};
    function prop(k, dv){ return (props[k] !== undefined) ? props[k] : dv; }
    if(t === 'lit_int' || t === 'lit_float' || t === 'lit_string' || t === 'lit_bool'){
      var v = prop('value', SPEC[t].props[0].def);
      if(t === 'lit_int' && !isInt(v)) throw err('Nodo #'+n.id+' (Literal int): el valor debe ser un entero, recibí '+JSON.stringify(v)+'.');
      if(t === 'lit_float' && !isNum(v)) throw err('Nodo #'+n.id+' (Literal float): el valor debe ser un número.');
      if(t === 'lit_bool') v = !!v;
      return (t === 'lit_float') ? mkNum(v, true) : v;
    }
    if(t === 'getvar'){
      var name = prop('name','MiVar');
      if(Object.prototype.hasOwnProperty.call(vars, name)) return vars[name];
      throw err('Nodo #'+n.id+' (Get «'+name+'»): la variable aún no tiene valor. Conecta un Set antes del Get.');
    }
    if(t === 'setvar') return readDataIn(n, 'value', ctx);
    if(t === 'make_array'){ var items = prop('items', []); return Array.isArray(items) ? items.slice() : [items]; }
    if(t === 'array_len'){ var a = readDataIn(n, 'array', ctx); return a.length; }
    if(t === 'array_get'){
      var ag = readDataIn(n, 'array', ctx), ai = readDataIn(n, 'index', ctx);
      if(!isInt(ai)) throw err('Nodo #'+n.id+' (Get Array Elem): el índice debe ser entero, recibí '+fmtVal(ai)+'.');
      if(ai < 0 || ai >= ag.length) throw err('Nodo #'+n.id+' (Get Array Elem): el índice '+ai+' está fuera de rango (0..'+(ag.length-1)+').');
      return ag[ai];
    }
    if(t === 'array_add'){
      var aa = readDataIn(n, 'array', ctx), it = readDataIn(n, 'item', ctx);
      var na = aa.slice(); na.push(it); return na;
    }
    if(t === 'arith'){
      var a = readDataIn(n, 'a', ctx), b = readDataIn(n, 'b', ctx);
      var op = prop('op','+');
      if(!isNum(a) || !isNum(b)) throw err('Nodo #'+n.id+' (Aritmética '+op+'): esperaba números, recibí '+fmtVal(a)+' y '+fmtVal(b)+'.');
      var ua = unbox(a), ub = unbox(b);
      if(op === '/') { if(ub === 0) throw err('Nodo #'+n.id+' (Aritmética /): división entre cero.'); }
      if(op === '%' && ub === 0) throw err('Nodo #'+n.id+' (Aritmética %): módulo entre cero.');
      if(isInt(a) && isInt(b)){
        switch(op){ case '+': return ua + ub; case '-': return ua - ub; case '*': return ua * ub;
          case '/': return Math.trunc(ua / ub);    // C++/UE: trunca hacia cero
          case '%': return ua % ub; }              // C++/UE: residuo con signo del dividendo
      }
      switch(op){ case '+': return mkNum(ua + ub, true); case '-': return mkNum(ua - ub, true);
        case '*': return mkNum(ua * ub, true); case '/': return mkNum(ua / ub, true); case '%': return mkNum(ua % ub, true); }
    }
    if(t === 'compare'){
      var ca = readDataIn(n, 'a', ctx), cb = readDataIn(n, 'b', ctx), cop = prop('op','<');
      ca = unbox(ca); cb = unbox(cb);
      if(isNum(ca) && isNum(cb)){ switch(cop){ case '==': return ca === cb; case '!=': return ca !== cb;
        case '<': return ca < cb; case '>': return ca > cb; case '<=': return ca <= cb; case '>=': return ca >= cb; } }
      if(typeof ca === 'string' && typeof cb === 'string'){ switch(cop){ case '==': return ca === cb; case '!=': return ca !== cb;
        case '<': return ca < cb; case '>': return ca > cb; case '<=': return ca <= cb; case '>=': return ca >= cb; } }
      if(typeof ca === 'boolean' && typeof cb === 'boolean' && (cop === '==' || cop === '!=')) return cop === '==' ? ca === cb : ca !== cb;
      throw err('Nodo #'+n.id+' (Comparar '+cop+'): no puedo comparar '+fmtVal(ca)+' con '+fmtVal(cb)+'.');
    }
    if(t === 'logic'){
      var lop = prop('op','and');
      if(lop === 'not'){ var u = readDataIn(n, 'a', ctx); if(typeof u !== 'boolean') throw err('Nodo #'+n.id+' (NOT): esperaba un bool.'); return !u; }
      var la = readDataIn(n, 'a', ctx), lb = readDataIn(n, 'b', ctx);
      if(typeof la !== 'boolean' || typeof lb !== 'boolean') throw err('Nodo #'+n.id+' (Lógica '+lop+'): esperaba dos bool.');
      if(lop === 'and') return la && lb;
      if(lop === 'or') return la || lb;
      if(lop === 'xor') return la !== lb;
    }
    if(t === 'concat'){
      var x = readDataIn(n, 'a', ctx), y = readDataIn(n, 'b', ctx);
      if(Array.isArray(x) || Array.isArray(y)) throw err('Nodo #'+n.id+' (Append): no se puede unir un array; recórrelo con ForEachLoop.');
      return fmtVal(x) + fmtVal(y);
    }
    if(t === 'to_string'){ var tv = readDataIn(n, 'value', ctx); if(Array.isArray(tv)) throw err('Nodo #'+n.id+' (To String): un array no se convierte a texto.'); return fmtVal(tv); }
    if(t === 'to_int'){ var ti = readDataIn(n, 'value', ctx); if(!isNum(ti)) throw err('Nodo #'+n.id+' (To Int): esperaba un número, recibí '+fmtVal(ti)+'.'); return Math.trunc(ti); }
    if(t === 'to_float'){ var tf = readDataIn(n, 'value', ctx); if(!isNum(tf)) throw err('Nodo #'+n.id+' (To Float): esperaba un número.'); return mkNum(tf, true); }
    if(t === 'flipflop') return !!ff[n.id];
    throw err('Nodo #'+n.id+': este nodo no produce el pin «'+pin+'».');
  }
  function readDataIn(n, pin, ctx){
    var s = spec(n.type);
    var w = inW[n.id] && inW[n.id][pin];
    if(w) return evalPin(w.n, w.p, ctx);
    var def = s.dInDef && s.dInDef[pin];
    if(def !== undefined) return def;
    var label = {text:'Texto', cond:'Condición', a:'A', b:'B', first:'Primero', last:'Último', array:'Array', index:'Índice', value:'Valor', item:'Elemento'}[pin] || pin;
    throw err('Nodo #'+n.id+' ('+s.title+'): la entrada «'+label+'» no está conectada.');
  }
  function coerce(v, kind, n, pin){
    switch(kind){
      case 'bool': if(typeof v !== 'boolean') throw err('Nodo #'+n.id+' ('+spec(n.type).title+'): la entrada esperaba un bool (true/false), recibí '+fmtVal(v)+'.'); return v;
      case 'int': if(!isInt(v)) throw err('Nodo #'+n.id+' ('+spec(n.type).title+'): la entrada esperaba un entero, recibí '+fmtVal(v)+'. Usa To Int (Truncate).'); return v;
      case 'float': if(!isNum(v)) throw err('Nodo #'+n.id+' ('+spec(n.type).title+'): la entrada esperaba un número.'); return mkNum(v, true);
      case 'num': case 'numstr': if(!isNum(v) && typeof v !== 'string') throw err('Nodo #'+n.id+' ('+spec(n.type).title+'): la entrada esperaba un número o texto.'); return v;
      case 'string': if(Array.isArray(v)) throw err('Nodo #'+n.id+' ('+spec(n.type).title+'): la entrada esperaba texto, recibí un array.'); return (typeof v === 'string') ? v : fmtVal(v);
      case 'array': if(!Array.isArray(v)) throw err('Nodo #'+n.id+' ('+spec(n.type).title+'): la entrada esperaba un array, recibí '+fmtVal(v)+'.'); return v;
      default: return v;
    }
  }
  function dataIn(n, pin, ctx){
    var s = spec(n.type);
    var kind = s.dIn[pin];
    var v = readDataIn(n, pin, ctx);
    if(kind === 'auto') kind = varType(n);
    return coerce(v, kind, n, pin);
  }

  /* ---------- ejecución de la cadena ---------- */
  function execChain(nid, pin, ctx){
    // sigue las flechas blancas desde (nid.pin) hasta un callejón
    var cur = { n:nid, p:pin };
    while(cur){
      step();
      var n = nodeById(g, cur.n);
      if(!n) throw err('Nodo inexistente #'+cur.n);
      var s = spec(n.type);
      var nextCtx = { node:n.id, pin:cur.p, values:{} };
            switch(n.type){
        case 'print': {
          var txt = dataIn(n, 'text', ctx);
          out.push(fmtVal(txt));
          cur = follow(n, 'then'); continue;
        }
        case 'setvar': {
          var name = (n.props && n.props.name) || 'MiVar';
          var val = dataIn(n, 'value', ctx);
          vars[name] = val;
          cur = follow(n, 'then'); continue;
        }
        case 'branch': {
          var c = dataIn(n, 'cond', ctx);
          cur = follow(n, c ? 'true' : 'false'); continue;
        }
        case 'sequence': {
          var t0 = advanceList(n, 'then0');
          for(var i0=0;i0<t0.length;i0++) execFrom(t0[i0].n, t0[i0].p, nextCtx);
          var t1 = advanceList(n, 'then1');
          for(var i1=0;i1<t1.length;i1++) execFrom(t1[i1].n, t1[i1].p, nextCtx);
          cur = null; continue;
        }
        case 'forloop': {
          var fi = dataIn(n, 'first', ctx), la = dataIn(n, 'last', ctx);
          if(fi > la){ cur = follow(n, 'completed'); continue; }
          var bodyList = advanceList(n, 'body');
          for(var k = fi; k <= la; k++){
            step();
            nextCtx.values = { index:k };
            for(var b=0;b<bodyList.length;b++) execFrom(bodyList[b].n, bodyList[b].p, nextCtx);
          }
          cur = follow(n, 'completed'); continue;
        }
        case 'whileloop': {
          var guard = 0;
          for(;;){
            step();
            var wc = dataIn(n, 'cond', null);
            if(!wc) break;
            var wBody = advanceList(n, 'body');
            for(var wb=0;wb<wBody.length;wb++) execFrom(wBody[wb].n, wBody[wb].p, { node:n.id, pin:'body', values:{} });
            if(++guard > maxSteps) throw err('El WhileLoop #'+n.id+' no termina nunca: su condición sigue siendo verdadera. Haz que algo dentro del cuerpo cambie la condición.');
          }
          cur = follow(n, 'completed'); continue;
        }
        case 'foreach': {
          var arr = dataIn(n, 'array', ctx);
          var fBody = advanceList(n, 'body');
          for(var e=0;e<arr.length;e++){
            step();
            nextCtx.values = { element:arr[e], array_index:e };
            for(var eb=0;eb<fBody.length;eb++) execFrom(fBody[eb].n, fBody[eb].p, nextCtx);
          }
          cur = follow(n, 'completed'); continue;
        }
        case 'flipflop': {
          if(ff[n.id] === undefined) ff[n.id] = true; else ff[n.id] = !ff[n.id];
          var isA = ff[n.id];
          cur = follow(n, isA ? 'a' : 'b'); continue;
        }
        case 'call_custom': {
          var target = (n.props && n.props.target) || 'MiEvento';
          var ev = null;
          for(var q=0;q<g.nodes.length;q++) if(g.nodes[q].type === 'event_custom' && (g.nodes[q].props && g.nodes[q].props.name) === target){ ev = g.nodes[q]; break; }
          if(!ev) throw err('Nodo #'+n.id+' (Call): no existe ningún Custom Event llamado «'+target+'». Añádelo al grafo.');
          var back = follow(n, 'then');
          execFrom(ev.id, 'then', null);      // ejecuta el evento y regresa
          if(back){ cur = back; continue; }   // luego continúa la cadena propia
          cur = null; continue;
        }
        case 'event_beginplay': case 'event_custom': {
          cur = follow(n, 'then'); continue;
        }
        default: {
          // nodo de solo datos alcanzado por exec (no debería)
          throw err('Nodo #'+n.id+' ('+s.title+'): este nodo no tiene flechas de ejecución.');
        }
      }
    }
  }
  function follow(n, pin){
    var list = advanceList(n, pin);
    if(!list.length) return null;
    for(var fi=1; fi<list.length; fi++) deferred.push(list[fi]);
    return list[0];
  }
  function flushDeferred(){
    while(deferred.length){ var d0 = deferred.shift(); execChain(d0.n, d0.p, null); }
  }
  function advanceList(n, pin){
    var l = (outW[n.id] && outW[n.id][pin]) || [];
    return l.map(function(w){ return { n:w.n, p:w.p }; });
  }
  function execFrom(nid, pin, ctx){ execChain(nid, pin, ctx); }

  /* ---------- arranque: los Event BeginPlay, en orden de id ---------- */
  try{
    var events = g.nodes.filter(function(n){ return n.type === 'event_beginplay'; })
                        .sort(function(a,b){ return Number(a.id) - Number(b.id); });
    if(!events.length) return { ok:false, error:'⚠️ Tu grafo no tiene un Event BeginPlay: sin él, nada se ejecuta al iniciar el juego.' };
    for(var i=0;i<events.length;i++){ execChain(events[i].id, 'then', null); flushDeferred(); }
    return { ok:true, output: out.join('\n') + (out.length ? '\n' : ''), vars: vars };
  }catch(e){
    if(e && e.bpx) return { ok:false, error:e.message };
    return { ok:false, error:'⚠️ ' + (e && e.message ? e.message : 'Error inesperado en el grafo.') };
  }
}

/* ---------- calificación por salida ---------- */
function gradeOutput(expected, got, opts){
  opts = opts || {};
  var E = (expected || []).slice(), G = String(got == null ? '' : got).split('\n');
  if(G.length && G[G.length-1] === '') G.pop();
  if(opts.trim){ E = E.map(function(l){ return l.trim(); }); G = G.map(function(l){ return l.trim(); }); }
  for(var i=0;i<Math.max(E.length, G.length);i++){
    var e = E[i], g = G[i];
    if(e === undefined) return { ok:false, why:'Tu grafo imprimió líneas de más. La primera sobrante fue «'+g+'» (línea '+(i+1)+').' };
    if(g === undefined) return { ok:false, why:'A tu grafo le faltaron líneas: esperaba «'+e+'» en la línea '+(i+1)+' y ahí se terminó la salida.' };
    if(e !== g) return { ok:false, why:'En la línea '+(i+1)+' esperaba «'+e+'» y salió «'+g+'».' };
  }
  return { ok:true };
}

/* ---------- API pública ---------- */
return {
  run: run,
  gradeOutput: gradeOutput,
  validate: function(g){ var e = validate(g); return e ? { ok:false, error:'⚠️ '+e } : { ok:true }; },
  SPEC: SPEC,
  fmtVal: fmtVal,
  coercible: coercible,
  PIN_COLORS: PIN_COLORS
};
})();
if(typeof module !== 'undefined' && module.exports) module.exports = BPX;
