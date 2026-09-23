/* ============================================================
   UCS — mini-interpreter de C# para el curso «Unity desde cero»
   ------------------------------------------------------------
   Subconjunto docente de C# moderno (top-level statements):
   · tipos int/float/bool/string/var (+ double→float, char→string)
   · aritmética C#: int/int trunca hacia cero, DivideByZeroException
   · interpolación $"…{expr:F2}…", operadores, casts (int)/(float)
   · if/else, while, do-while, for, foreach, break/continue, return
   · arrays new int[]{…}/new int[n], .Length; List<T> Add/Count/…
   · métodos (default params, recursión), clases (campos, ctor, métodos)
   · Console.WriteLine/Write/ReadLine · Debug.Log · int.Parse
   · Math.* (Round bancario) y Mathf.* (Round aleja de cero)
   · Random.InitState / Random.Range (INCLUSIVO, estilo Unity) / .value
   · Vector3 (+ - * , magnitude, ToString «(1.0, 0.0, -2.0)»)
   · try/catch/finally, throw, excepciones con nombre real
   Errores SIEMPRE en español con línea: «⚠️ Línea 4 · CS0103: …»
   API: UCS.run(src,{stdin,wantVars,maxSteps}) → {ok,output,vars}|{ok:false,error}
        UCS.gradeOutput(esperadas, obtenidas, {trim}) → {ok,why}
   ============================================================ */
var UCS = (function(){
'use strict';

/* ============================ utilidades ============================ */
function err(line, msg){ var e = new Error('⚠️ Línea ' + (line || 0) + ' · ' + msg); e.ucs = true; return e; }
function isIntV(v){ return typeof v === 'number' && isFinite(v) && Math.floor(v) === v; }
function isNumV(v){ return typeof v === 'number' && isFinite(v); }
function fmtNum(v){ return String(+(v.toPrecision(12))); }
function f1(v){ return (Math.round(v * 10) / 10).toFixed(1); }
function v3(x, y, z){ return { __v3:[x, y, z] }; }
function v3ToString(a){ return '(' + f1(a.__v3[0]) + ', ' + f1(a.__v3[1]) + ', ' + f1(a.__v3[2]) + ')'; }
function toStr(v){
  if(v === null || v === undefined) return '';
  if(typeof v === 'boolean') return v ? 'True' : 'False';
  if(typeof v === 'number') return fmtNum(v);
  if(typeof v === 'string') return v;
  if(v && v.__v3) return v3ToString(v);
  if(v && v.__ex) return v.msg || '';
  throw new Error('No se puede convertir una colección a texto');
}
function V(x){ return { __bfn:x }; }          /* función builtin */

/* ============================ lexer ============================ */
var KEYWORDS = { int:1, float:1, double:1, bool:1, string:1, var:1, void:1, if:1, else:1, while:1, do:1,
  for:1, foreach:1, in:1, return:1, break:1, continue:1, new:1, true:1, false:1, null:1, static:1,
  class:1, public:1, private:1, protected:1, internal:1, this:1, try:1, catch:1, finally:1, throw:1,
  using:1, char:1, object:1 };
var OPS2 = ['==','!=','<=','>=','&&','||','+=','-=','*=','/=','%=','++','--'];
var OPS1 = '+-*/%=<>!(){}[];, .?:';

function lex(src){
  var toks = [], i = 0, line = 1;
  while(i < src.length){
    var c = src[i];
    if(c === '\n'){ line++; i++; continue; }
    if(c === ' ' || c === '\t' || c === '\r'){ i++; continue; }
    if(c === '/' && src[i+1] === '/'){ while(i < src.length && src[i] !== '\n') i++; continue; }
    if(c === '/' && src[i+1] === '*'){
      i += 2;
      while(i < src.length && !(src[i] === '*' && src[i+1] === '/')){ if(src[i] === '\n') line++; i++; }
      i += 2; continue;
    }
    if(c === '"'){
      var s = '', sl = line; i++;
      while(i < src.length && src[i] !== '"'){
        if(src[i] === '\\'){ var e2 = src[i+1]; s += (e2 === 'n' ? '\n' : e2 === 't' ? '\t' : e2); i += 2; }
        else { if(src[i] === '\n') line++; s += src[i]; i++; }
      }
      i++; toks.push({k:'str', v:s, line:sl}); continue;
    }
    if(c === '$' && src[i+1] === '"'){
      var parts = [], sl2 = line; i += 2;
      var buf = '';
      while(i < src.length && src[i] !== '"'){
        if(src[i] === '{'){
          if(src[i+1] === '{'){ buf += '{'; i += 2; continue; }
          if(buf){ parts.push({lit:buf}); buf = ''; }
          var depth = 1, expr = ''; i++;
          while(i < src.length && depth > 0){
            if(src[i] === '{') depth++;
            else if(src[i] === '}'){ depth--; if(depth === 0) break; }
            expr += src[i]; i++;
          }
          i++;
          var spec = null, ci = expr.indexOf(':');
          if(ci >= 0){ spec = expr.slice(ci+1).trim(); expr = expr.slice(0, ci); }
          parts.push({expr:expr.trim(), spec:spec});
          continue;
        }
        if(src[i] === '}' && src[i+1] === '}'){ buf += '}'; i += 2; continue; }
        if(src[i] === '\\'){ var e3 = src[i+1]; buf += (e3 === 'n' ? '\n' : e3 === 't' ? '\t' : e3); i += 2; continue; }
        if(src[i] === '\n') line++;
        buf += src[i]; i++;
      }
      i++;
      if(buf) parts.push({lit:buf});
      toks.push({k:'interp', v:parts, line:sl2}); continue;
    }
    if(c === "'"){
      var chv = '', cl4 = line; i++;
      if(i < src.length && src[i] === '\\'){ i++; chv += (src[i] === 'n') ? '\n' : (src[i] === 't') ? '\t' : src[i]; i++; }
      else if(i < src.length){ chv += src[i]; i++; }
      if(src[i] !== "'") throw err(cl4, 'CS1012: un literal char solo puede contener UN carácter');
      i++;
      toks.push({ k:'char', v:chv, line:cl4 }); continue;
    }
    if(/[0-9]/.test(c)){
      var n2 = '', sl3 = line, isF = false;
      while(i < src.length && /[0-9]/.test(src[i])){ n2 += src[i]; i++; }
      if(src[i] === '.' && /[0-9]/.test(src[i+1] || '')){ isF = true; n2 += '.'; i++; while(i < src.length && /[0-9]/.test(src[i])){ n2 += src[i]; i++; } }
      if(src[i] === 'f' || src[i] === 'F' || src[i] === 'd' || src[i] === 'D' || src[i] === 'm' || src[i] === 'M'){ isF = true; i++; }
      toks.push({k:'num', v:parseFloat(n2), isF:isF, line:sl3}); continue;
    }
    if(/[A-Za-z_]/.test(c)){
      var id = '', sl4 = line;
      while(i < src.length && /[A-Za-z0-9_]/.test(src[i])){ id += src[i]; i++; }
      toks.push({k: KEYWORDS[id] ? 'kw' : 'id', v:id, line:sl4}); continue;
    }
    var two = src.substr(i, 2);
    if(OPS2.indexOf(two) >= 0){ toks.push({k:'op', v:two, line:line}); i += 2; continue; }
    if(OPS1.indexOf(c) >= 0){ toks.push({k:'op', v:c, line:line}); i++; continue; }
    throw err(line, 'CS1056: carácter inesperado «' + c + '»');
  }
  toks.push({k:'eof', v:'', line:line});
  return toks;
}

/* ============================ parser ============================ */
var MODS = { public:1, private:1, protected:1, internal:1, static:1 };
var BUILTIN_TYPES = { int:'int', float:'float', double:'float', bool:'bool', string:'string', var:'var', char:'string', object:'var', void:'void' };

function parseProgram(toks){
  var p = 0;
  function peek(o){ return toks[p + (o || 0)]; }
  function at(v){ var t = peek(); return (t.k === 'op' || t.k === 'kw') && t.v === v; }
  function next(){ return toks[p++]; }
  function expect(v, msg){
    if(at(v)) return next();
    var t = peek();
    throw err(t.line, 'CS1003: se esperaba «' + v + '»' + (msg ? ', ' + msg : ''));
  }
  function expectSemi(){
    if(at(';')){ next(); return; }
    var t = peek();
    throw err(t.line, 'CS1002: se esperaba «;»');
  }
  function isTypeTok(t){ return (t.k === 'kw' && BUILTIN_TYPES[t.v]) || t.k === 'id'; }

  function parseType(){
    var t = peek();
    if(t.k === 'kw' && BUILTIN_TYPES[t.v]){
      if(t.v === 'void') throw err(t.line, 'CS1525: void solo puede ser tipo de retorno de un método');
      next(); var name = BUILTIN_TYPES[t.v]; return finishType(name);
    }
    if(t.k === 'id'){ next(); return finishType(t.v); }
    throw err(t.line, 'CS1525: se esperaba un tipo');
  }
  function finishType(name){
    if(at('<')){
      next();
      var inner = parseType();
      expect('>');
      if(name !== 'List') throw err(peek().line, 'CS0246: el tipo genérico «' + name + '» no está disponible en este curso (solo List<T>)');
      return 'List<' + inner + '>';
    }
    if(at('[')){ next(); expect(']'); return name + '[]'; }
    return name;
  }
  function isDeclStart(){
    var t = peek();
    if(t.k === 'kw' && BUILTIN_TYPES[t.v] && t.v !== 'void'){
      var t1 = peek(1);
      if(t1.k === 'id') return true;
      if(t1.k === 'op' && t1.v === '[' && peek(2).v === ']' && peek(3).k === 'id') return true;
      return false;
    }
    if(t.k !== 'id') return false;
    var t1 = peek(1);
    if(t1.k === 'id') return true;                                 /* Clase nombre */
    if(t1.k === 'op' && t1.v === '<') return true;                 /* List<int> x */
    if(t1.k === 'op' && t1.v === '[' && peek(2).v === ']' && peek(3).k === 'id') return true;
    return false;
  }
  function isMethodStart(){
    var t = peek();
    if(t.k === 'kw' && t.v === 'void') return peek(1).k === 'id' && peek(2).v === '(';
    if(!isTypeTok(t)) return false;
    return peek(1).k === 'id' && peek(2).v === '(';
  }

  function parseProgramNodes(){
    var nodes = [];
    while(peek().k !== 'eof'){
      if(peek().k === 'kw' && peek().v === 'using'){ while(!at(';') && peek().k !== 'eof') next(); expectSemi(); continue; }
      var sawMod = false;
      while(peek().k === 'kw' && MODS[peek().v]){ next(); sawMod = true; }
      if(peek().k === 'kw' && peek().v === 'class'){ nodes.push(parseClass()); continue; }
      if(isMethodStart()){ nodes.push(parseMethod()); continue; }
      if(sawMod){
        var t0 = peek();
        throw err(t0.line, 'CS0116: esto parece un miembro suelto: los campos y métodos viven DENTRO de una clase (o quita «static» y escribe la instrucción directamente)');
      }
      if(isDeclStart()){ nodes.push(parseDeclaration()); continue; }
      nodes.push(parseStatement());
    }
    return nodes;
  }

  function parseClass(){
    var line = peek().line;
    expect('class');
    var nameTok = peek();
    if(nameTok.k !== 'id') throw err(nameTok.line, 'CS1001: se esperaba el nombre de la clase');
    next();
    var cls = { t:'class', line:line, name:nameTok.v, fields:[], methods:{}, ctor:null };
    expect('{', 'para abrir el cuerpo de la clase');
    while(!at('}') && peek().k !== 'eof'){
      while(peek().k === 'kw' && MODS[peek().v]) next();
      if(peek().k === 'eof') break;
      var mline = peek().line;
      /* constructor: Nombre(...) */
      if(peek().k === 'id' && peek().v === nameTok.v && peek(1).v === '('){
        next();
        var params = parseParams();
        var body = parseBlock();
        cls.ctor = { params:params, body:body, line:mline };
        continue;
      }
      var isVoidMethod = peek().k === 'kw' && peek().v === 'void' && peek(1).k === 'id' && peek(2).v === '(';
      if(!isTypeTok(peek()) && !isVoidMethod){ var bad = peek(); throw err(bad.line, 'CS1525: miembro de clase no válido'); }
      if(isVoidMethod) next();
      var ftype = isVoidMethod ? 'void' : parseType();
      var fname = peek();
      if(fname.k !== 'id') throw err(fname.line, 'CS1001: se esperaba el nombre del miembro');
      next();
      if(at('(')){
        var ps = parseParams();
        var b = parseBlock();
        cls.methods[fname.v] = { name:fname.v, params:ps, body:b, line:mline };
      } else {
        var init = null;
        if(at('=')){ next(); init = parseAssignment(); }
        expectSemi();
        cls.fields.push({ name:fname.v, type:ftype, init:init, line:mline });
      }
    }
    expect('}');
    return cls;
  }

  function parseParams(){
    expect('(');
    var ps = [];
    while(!at(')')){
      while(peek().k === 'kw' && MODS[peek().v]) next();
      var pt = parseType();
      var pn = peek();
      if(pn.k !== 'id') throw err(pn.line, 'CS1001: se esperaba el nombre del parámetro');
      next();
      var def = null;
      if(at('=')){ next(); def = parseAssignment(); }
      ps.push({ name:pn.v, type:pt, def:def });
      if(at(',')){ next(); continue; }
      break;
    }
    expect(')');
    return ps;
  }

  function parseMethod(){
    var line = peek().line;
    if(peek().k === 'kw' && peek().v === 'void') next();   /* void Nombre(...) */
    else parseType();                   /* tipo de retorno */
    var nameTok = next();
    if(nameTok.k !== 'id') throw err(nameTok.line, 'CS1001: se esperaba el nombre del método');
    var params = parseParams();
    var body = parseBlock();
    return { t:'method', line:line, name:nameTok.v, params:params, body:body };
  }

  function parseBlock(){
    var t = peek();
    if(!at('{')) throw err(t.line, 'CS1513: se esperaba «{»');
    next();
    var stmts = [];
    while(!at('}') && peek().k !== 'eof') stmts.push(parseStatement());
    expect('}');
    return { t:'block', stmts:stmts, line:t.line };
  }

  function parseDeclaration(){
    var line = peek().line;
    var type = parseType();
    var decls = [];
    do {
      var nt = peek();
      if(nt.k !== 'id') throw err(nt.line, 'CS1001: se esperaba el nombre de la variable');
      next();
      var init = null;
      if(at('=')){
        next();
        if(peek().k === 'op' && peek().v === '{' && /\[\]$/.test(type)){
          next();
          var items = [];
          if(!(peek().k === 'op' && peek().v === '}')){
            items.push(parseAssignment());
            while(at(',')){ next(); items.push(parseAssignment()); }
          }
          expect('}');
          init = { t:'newarr', line:line, items:items };
        } else init = parseAssignment();
      }
      decls.push({ name:nt.v, init:init });
    } while(at(',') && next());
    expectSemi();
    return { t:'decl', line:line, type:type, decls:decls };
  }

  function parseStatement(){
    var t = peek();
    if(t.k === 'op' && t.v === '{') return parseBlock();
    if(t.k === 'kw'){
      switch(t.v){
        case 'if': {
          next(); expect('(');
          var cond = parseExpr();
          expect(')');
          var then = parseStatement();
          var els = null;
          if(at('else')){ next(); els = parseStatement(); }
          return { t:'if', line:t.line, cond:cond, then:then, els:els };
        }
        case 'while': {
          next(); expect('(');
          var c = parseExpr();
          expect(')');
          return { t:'while', line:t.line, cond:c, body:parseStatement() };
        }
        case 'do': {
          next();
          var b = parseStatement();
          if(!(peek().k === 'kw' && peek().v === 'while')) throw err(peek().line, 'CS1003: se esperaba «while» después de do');
          next(); expect('(');
          var cd = parseExpr(); expect(')'); expectSemi();
          return { t:'dowhile', line:t.line, body:b, cond:cd };
        }
        case 'for': {
          next(); expect('(');
          var init = null;
          if(!at(';')){
            if(isDeclStart()) init = parseDeclaration();
            else { init = { t:'exprstmt', line:t.line, expr:parseExpr() }; expectSemi(); }
          } else next();
          var cond2 = at(';') ? null : parseExpr();
          expectSemi();
          var upd = at(')') ? null : parseExpr();
          expect(')');
          return { t:'for', line:t.line, init:init, cond:cond2, upd:upd, body:parseStatement() };
        }
        case 'foreach': {
          next(); expect('(');
          if(isDeclStart()) parseType();
          var vn = peek();
          if(vn.k !== 'id') throw err(vn.line, 'CS1001: se esperaba el nombre de la variable del foreach');
          next();
          if(!(peek().k === 'kw' && peek().v === 'in')) throw err(peek().line, 'CS1003: se esperaba «in» en el foreach');
          next();
          var seq = parseExpr();
          expect(')');
          return { t:'foreach', line:t.line, varName:vn.v, seq:seq, body:parseStatement() };
        }
        case 'return': {
          next();
          var rv = at(';') ? null : parseExpr();
          expectSemi();
          return { t:'return', line:t.line, value:rv };
        }
        case 'break': next(); expectSemi(); return { t:'break', line:t.line };
        case 'continue': next(); expectSemi(); return { t:'continue', line:t.line };
        case 'throw': {
          next();
          var ev = at(';') ? null : parseExpr();
          expectSemi();
          return { t:'throw', line:t.line, value:ev };
        }
        case 'try': {
          next();
          var tb = parseBlock();
          var catches = [];
          while(peek().k === 'kw' && peek().v === 'catch'){
            var cl = peek().line; next();
            var ct = 'Exception', cv = null;
            if(peek().k === 'op' && peek().v === '('){
              next();
              ct = parseType();
              if(peek().k === 'id'){ cv = next().v; }
              expect(')');
            }
            catches.push({ type:ct, varName:cv, block:parseBlock(), line:cl });
          }
          var fin = null;
          if(peek().k === 'kw' && peek().v === 'finally'){ next(); fin = parseBlock(); }
          return { t:'try', line:t.line, body:tb, catches:catches, fin:fin };
        }
      }
    }
    if(isDeclStart()) return parseDeclaration();
    var ex = parseExpr();
    expectSemi();
    return { t:'exprstmt', line:t.line, expr:ex };
  }

  /* ---------- expresiones ---------- */
  function parseExpr(){ return parseAssignment(); }
  function mark(n){ return n; }
  function line0(){ return peek().line; }

  function parseAssignment(){
    var left = parseTernary();
    var t = peek();
    if(t.k === 'op' && ['=','+=','-=','*=','/=','%='].indexOf(t.v) >= 0){
      next();
      var right = parseAssignment();
      return { t:'assign', line:t.line, op:t.v, target:left, value:right };
    }
    return left;
  }
  function parseTernary(){
    var c = parseOr();
    if(at('?')){
      var q = next();
      var a = parseAssignment();
      expect(':');
      var b = parseAssignment();
      return { t:'ternary', line:q.line, cond:c, a:a, b:b };
    }
    return c;
  }
  function binSub(nextLvl, ops){
    return function(){
      var left = nextLvl.call(this);
      while(true){
        var t = peek();
        if(t.k === 'op' && ops.indexOf(t.v) >= 0){
          next();
          var right = nextLvl.call(this);
          left = { t:'bin', line:t.line, op:t.v, l:left, r:right };
        } else break;
      }
      return left;
    };
  }
  var parseOr = binSub(function(){ return parseAnd(); }, ['||']);
  var parseAnd = binSub(function(){ return parseEq(); }, ['&&']);
  var parseEq = binSub(function(){ return parseRel(); }, ['==','!=']);
  var parseRel = binSub(function(){ return parseAdd(); }, ['<','>','<=','>=']);
  var parseAdd = binSub(function(){ return parseMul(); }, ['+','-']);
  var parseMul = binSub(function(){ return parseUnary(); }, ['*','/','%']);

  function parseUnary(){
    var t = peek();
    if(t.k === 'op' && t.v === '!'){ next(); return { t:'not', line:t.line, e:parseUnary() }; }
    if(t.k === 'op' && t.v === '-'){ next(); return { t:'neg', line:t.line, e:parseUnary() }; }
    if(t.k === 'op' && t.v === '+'){ next(); return parseUnary(); }
    if(t.k === 'op' && t.v === '++' || t.k === 'op' && t.v === '--'){
      next();
      var tgt = parseUnary();
      return { t:'assign', line:t.line, op:t.v === '++' ? '+=' : '-=', target:tgt, value:{ t:'num', line:t.line, v:1 } };
    }
    /* casts (int)x, (float)x */
    if(t.k === 'op' && t.v === '(' && peek(1).k === 'kw' && BUILTIN_TYPES[peek(1).v] && peek(2).v === ')'){
      var cl = t.line, ct = BUILTIN_TYPES[peek(1).v];
      next(); next(); next();
      return { t:'cast', line:cl, type:ct, e:parseUnary() };
    }
    return parsePostfix();
  }
  function parsePostfix(){
    var e = parsePrimary();
    while(true){
      var t = peek();
      if(t.k === 'op' && t.v === '.'){
        next();
        var nm = peek();
        if(nm.k !== 'id' && !(nm.k === 'kw')) throw err(nm.line, 'CS1001: se esperaba el nombre del miembro');
        next();
        e = { t:'member', line:t.line, obj:e, name:nm.v };
      } else if(t.k === 'op' && t.v === '['){
        next();
        var ix = parseExpr();
        expect(']');
        e = { t:'index', line:t.line, obj:e, index:ix };
      } else if(t.k === 'op' && t.v === '('){
        var args = parseArgs();
        e = { t:'call', line:t.line, callee:e, args:args };
      } else if(t.k === 'op' && (t.v === '++' || t.v === '--')){
        next();
        e = { t:'assign', line:t.line, op:t.v === '++' ? '+=' : '-=', target:e, value:{ t:'num', line:t.line, v:1 }, postfix:true };
      } else break;
    }
    return e;
  }
  function parseArgs(){
    expect('(');
    var args = [];
    while(!at(')')){
      args.push(parseAssignment());
      if(at(',')){ next(); continue; }
      break;
    }
    expect(')');
    return args;
  }
  function parsePrimary(){
    var t = peek();
    if(t.k === 'num'){ next(); return { t:'num', line:t.line, v:t.v, isF:t.isF === true }; }
    if(t.k === 'char'){ next(); return { t:'str', line:t.line, v:t.v }; }
    if(t.k === 'str'){ next(); return { t:'str', line:t.line, v:t.v }; }
    if(t.k === 'interp'){
      next();
      var parts = t.v.map(function(pt){
        if(pt.lit !== undefined) return { lit:pt.lit };
        var sub = UCS_parseExprSource(pt.expr, t.line);
        return { expr:sub, spec:pt.spec };
      });
      return { t:'interp', line:t.line, parts:parts };
    }
    if(t.k === 'kw'){
      if(t.v === 'true' || t.v === 'false'){ next(); return { t:'bool', line:t.line, v:(t.v === 'true') }; }
      if(t.v === 'null'){ next(); return { t:'null', line:t.line }; }
      if(t.v === 'new'){ return parseNew(); }
      if(t.v === 'this'){ next(); return { t:'this', line:t.line }; }
      if(BUILTIN_TYPES[t.v] && peek(1) && peek(1).k === 'op' && peek(1).v === '.'){
        next();
        return { t:'name', line:t.line, name:t.v };
      }
    }
    if(t.k === 'op' && t.v === '('){
      next();
      var e = parseExpr();
      expect(')');
      return e;
    }
    if(t.k === 'id'){
      next();
      if(at('<') && t.v === 'List'){ /* List<int> en expresión no válida aquí */ }
      return { t:'name', line:t.line, name:t.v };
    }
    throw err(t.line, 'CS1525: expresión no válida');
  }
  function parseNew(){
    var t = next(); /* new */
    var tn = peek();
    if(!(tn.k === 'id' || tn.k === 'kw')) throw err(tn.line, 'CS1526: se esperaba un tipo después de new');
    var type;
    if(tn.k === 'kw' && BUILTIN_TYPES[tn.v]){ next(); type = BUILTIN_TYPES[tn.v]; }
    else { next(); type = tn.v; }
    if(at('<')){
      next();
      var inner = parseType();
      expect('>');
      type = 'List<' + inner + '>';
    }
    if(at('[')){
      next();
      if(at(']')){
        next();
        expect('{');
        var items = [];
        while(!at('}')){ items.push(parseAssignment()); if(at(',')){ next(); continue; } break; }
        expect('}');
        return { t:'newarr', line:t.line, items:items };
      }
      var len = parseExpr();
      expect(']');
      return { t:'newarrlen', line:t.line, type:type, len:len };
    }
    if(at('(')){
      var args = parseArgs();
      return { t:'newobj', line:t.line, type:type, args:args };
    }
    throw err(peek().line, 'CS1526: new requiere paréntesis «(…)» o corchetes «[…]»');
  }

  var program = parseProgramNodes();
  return program;
}

/* parse de sub-expresiones para interpolación */
function UCS_parseExprSource(src, line){
  var toks = lex(src);
  toks.push({k:'eof', v:'', line:line});
  var p = 0;
  function peek(){ return toks[p]; }
  function at(v){ var t = peek(); return (t.k === 'op' || t.k === 'kw') && t.v === v; }
  function next(){ return toks[p++]; }
  function parseAssignment(){
    var left = parseTernary();
    var t = peek();
    if(t.k === 'op' && ['=','+=','-=','*=','/=','%='].indexOf(t.v) >= 0){
      next(); var right = parseAssignment();
      return { t:'assign', line:t.line, op:t.v, target:left, value:right };
    }
    return left;
  }
  function parseTernary(){
    var c = parseOr();
    if(at('?')){
      var q = next(); var a = parseAssignment(); /* ':' */ next(); var b = parseAssignment();
      return { t:'ternary', line:q.line, cond:c, a:a, b:b };
    }
    return c;
  }
  function binSub(nl, ops){
    return function(){
      var left = nl();
      while(true){
        var t = peek();
        if(t.k === 'op' && ops.indexOf(t.v) >= 0){ next(); left = { t:'bin', line:t.line, op:t.v, l:left, r:nl() }; }
        else break;
      }
      return left;
    };
  }
  var parseOr = binSub(function(){ return parseAnd(); }, ['||']);
  var parseAnd = binSub(function(){ return parseEq(); }, ['&&']);
  var parseEq = binSub(function(){ return parseRel(); }, ['==','!=']);
  var parseRel = binSub(function(){ return parseAdd(); }, ['<','>','<=','>=']);
  var parseAdd = binSub(function(){ return parseMul(); }, ['+','-']);
  var parseMul = binSub(function(){ return parseUnary(); }, ['*','/','%']);
  function parseUnary(){
    var t = peek();
    if(t.k === 'op' && t.v === '!'){ next(); return { t:'not', line:t.line, e:parseUnary() }; }
    if(t.k === 'op' && t.v === '-'){ next(); return { t:'neg', line:t.line, e:parseUnary() }; }
    if(t.k === 'op' && t.v === '(' && peek(1).k === 'kw' && BUILTIN_TYPES[peek(1).v] && peek(2).v === ')'){
      var cl = t.line, ct = BUILTIN_TYPES[peek(1).v]; next(); next(); next();
      return { t:'cast', line:cl, type:ct, e:parseUnary() };
    }
    return parsePostfix();
  }
  function parsePostfix(){
    var e = parsePrimary();
    while(true){
      var t = peek();
      if(t.k === 'op' && t.v === '.'){ next(); var nm = next(); e = { t:'member', line:t.line, obj:e, name:nm.v }; }
      else if(t.k === 'op' && t.v === '['){ next(); var ix = parseAssignment(); /*']'*/ next(); e = { t:'index', line:t.line, obj:e, index:ix }; }
      else if(t.k === 'op' && t.v === '('){
        next();
        var args = [];
        while(!at(')')){ args.push(parseAssignment()); if(at(',')){ next(); continue; } break; }
        next();
        e = { t:'call', line:t.line, callee:e, args:args };
      }
      else break;
    }
    return e;
  }
  function parsePrimary(){
    var t = peek();
    if(t.k === 'num'){ next(); return { t:'num', line:t.line, v:t.v, isF:t.isF === true }; }
    if(t.k === 'char'){ next(); return { t:'str', line:t.line, v:t.v }; }
    if(t.k === 'str'){ next(); return { t:'str', line:t.line, v:t.v }; }
    if(t.k === 'kw'){
      if(t.v === 'true' || t.v === 'false'){ next(); return { t:'bool', line:t.line, v:(t.v === 'true') }; }
      if(t.v === 'null'){ next(); return { t:'null', line:t.line }; }
      if(t.v === 'new'){ return parseNew(); }
    }
    if(t.k === 'op' && t.v === '('){ next(); var e = parseAssignment(); next(); return e; }
    if(t.k === 'id'){ next(); return { t:'name', line:t.line, name:t.v }; }
    throw err(line, 'CS1525: expresión no válida dentro de la interpolación');
  }
  function parseNew(){
    var t = next();
    var tn = next();
    var type = (tn.k === 'kw') ? BUILTIN_TYPES[tn.v] : tn.v;
    if(at('<')){ next(); /*inner*/ next(); next(); /*>*/ type = 'List<' + 'x' + '>'; }
    var args = [];
    if(at('(')){
      next();
      while(!at(')')){ args.push(parseAssignment()); if(at(',')){ next(); continue; } break; }
      next();
    }
    return { t:'newobj', line:t.line, type:type, args:args };
  }
  var e2 = parseAssignment();
  return e2;
}

/* ============================ ejecutor ============================ */
function Scope(parent){
  this.vars = {};
  this.parent = parent;
  this.thisObj = null;
}
Scope.prototype.find = function(name){
  var s = this;
  while(s){ if(Object.prototype.hasOwnProperty.call(s.vars, name)) return s; s = s.parent; }
  return null;
};

var RNG = { state:987654321 };
function rngNext(){
  RNG.state |= 0; RNG.state = (RNG.state + 0x6D2B79F5) | 0;
  var t = Math.imul(RNG.state ^ (RNG.state >>> 15), 1 | RNG.state);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function run(src, opts){
  opts = opts || {};
  var maxSteps = opts.maxSteps || 400000;
  var steps = 0;
  var outBuf = [], curLine = '';
  var stdin = (opts.stdin || []).slice();
  var callDepth = 0;
  var globals = new Scope(null);
  var classes = {}, methods = {};

  function tick(line){
    if(++steps > maxSteps) throw err(line, 'Tu programa tardó demasiado: posible ciclo infinito (revisa while/for).');
  }
  function write(s){ curLine += s; }
  function writeLine(s){ outBuf.push(curLine + s); curLine = ''; }
  function readLine(line){
    if(stdin.length) return String(stdin.shift());
    throw err(line, 'Console.ReadLine: no quedan más entradas (revisa cuántas ReadLine haces).');
  }

  /* ---------- señales de control ---------- */
  function Sig(kind, v){ this.__sig = kind; this.v = v; }

  /* ---------- errores de runtime con tipo de excepción ---------- */
  function rtex(line, type, msg){
    var e = new Error('⚠️ Línea ' + line + ' · ' + type + ': ' + msg);
    e.ucs = true; e.exType = type; e.exMsg = msg; e.line = line;
    return e;
  }

  /* ---------- valores ---------- */
  function defaultFor(type){
    if(type === 'int' || type === 'float') return 0;
    if(type === 'bool') return false;
    if(type === 'string') return '';
    if(type === 'int[]' || type.indexOf('[]') >= 0) return null;
    return null;
  }
  function typeName(v){
    if(v === null || v === undefined) return 'null';
    if(typeof v === 'number') return isIntV(v) ? 'int' : 'float';
    if(typeof v === 'boolean') return 'bool';
    if(typeof v === 'string') return 'string';
    if(Array.isArray(v)) return v.__list ? 'List' : 'array';
    if(v.__v3) return 'Vector3';
    if(v.__obj) return v.__obj.cls.name;
    return 'object';
  }

  /* ---------- resolución de nombres ---------- */
  var NAMESPACES = { Console:1, Debug:1, Mathf:1, Math:1, Random:1, Convert:1, Vector3:1, int:1, float:1, string:1, bool:1 };
  function resolveName(name, scope, line){
    if(NAMESPACES[name]) return { __ns:name };
    var s = scope.find(name);
    if(s) return s.vars[name];
    if(scope.thisObj){
      var o = scope.thisObj;
      if(Object.prototype.hasOwnProperty.call(o.__obj.fields, name)) return o.__obj.fields[name];
      if(o.__obj.cls.methods[name]) return { __m:{ m:o.__obj.cls.methods[name], obj:o } };
    }
    if(methods[name]) return { __m:{ m:methods[name], obj:null } };
    if(classes[name]) return { __cls:classes[name] };
    throw err(line, 'CS0103: el nombre «' + name + '» no existe en este contexto (¿está bien escrito? ¿se declaró antes?)');
  }
  function assignName(name, v, scope, line){
    var s = scope.find(name);
    if(s){ s.vars[name] = v; return; }
    if(scope.thisObj){
      var o = scope.thisObj;
      var hasField = o.__obj.cls.fields.some(function(f){ return f.name === name; });
      if(hasField){ o.__obj.fields[name] = v; return; }
    }
    throw err(line, 'CS0103: el nombre «' + name + '» no existe en este contexto (decláralo con su tipo: int ' + name + ' = …)');
  }

  /* ---------- llamadas ---------- */
  function callUserMethod(m, args, thisObj, line){
    if(callDepth > 900) throw rtex(line, 'StackOverflowException', 'recursión demasiado profunda (¿falta un caso base?)');
    var sc = new Scope(globals);
    sc.thisObj = thisObj;
    for(var i = 0; i < m.params.length; i++){
      var pm = m.params[i];
      if(i < args.length) sc.vars[pm.name] = args[i];
      else if(pm.def !== null) sc.vars[pm.name] = evalExpr(pm.def, sc);
      else throw err(line, 'CS7036: falta un argumento para el parámetro requerido «' + pm.name + '» de «' + m.name + '»');
    }
    callDepth++;
    try{
      execBlock(m.body, sc);
    } catch(sig){
      if(sig && sig.__sig === 'return'){ callDepth--; return sig.v; }
      callDepth--; throw sig;
    }
    callDepth--;
    return null;
  }
  function callBuiltin(bfn, args, line){
    return bfn.__bfn(args, line);
  }

  /* ---------- builtins ---------- */
  function makeStrMethods(s){
    return {
      Length: s.length,
      ToUpper: V(function(){ return s.toUpperCase(); }),
      ToLower: V(function(){ return s.toLowerCase(); }),
      Trim: V(function(){ return s.trim(); }),
      Substring: V(function(a){ return argumentsFix(a, s); }),
      IndexOf: V(function(a){ return s.indexOf(toStr(a[0])); }),
      Contains: V(function(a){ return s.indexOf(toStr(a[0])) >= 0; }),
      Replace: V(function(a){ return s.split(toStr(a[0])).join(toStr(a[1])); }),
      Split: V(function(a){ return s.split(toStr(a[0])); }),
      ToString: V(function(){ return s; })
    };
    function argumentsFix(a, str){
      var start = a[0] | 0;
      if(start < 0 || start > str.length) throw rtex(0, 'ArgumentOutOfRangeException', 'Substring: inicio ' + start + ' fuera de la cadena (largo ' + str.length + ')');
      if(a.length > 1){ var len = a[1] | 0; if(len < 0 || start + len > str.length) throw rtex(0, 'ArgumentOutOfRangeException', 'Substring: longitud ' + len + ' inválida'); return str.substr(start, len); }
      return str.slice(start);
    }
  }
  function makeArrMethods(a){
    var fns = {
      Length: a.length,
      Count: a.__list ? a.length : null,
      Add: V(function(as){ if(!a.__list) throw rtex(0, 'CS1061', 'los arrays no tienen Add: usa una List<T>'); a.push(as[0]); return null; }),
      Remove: V(function(as){ if(!a.__list) throw rtex(0, 'CS1061', 'los arrays no tienen Remove'); var i = a.indexOf(as[0]); if(i >= 0) a.splice(i, 1); return i >= 0; }),
      RemoveAt: V(function(as){ if(!a.__list) throw rtex(0, 'CS1061', 'los arrays no tienen RemoveAt'); var ix = as[0]; if(!isIntV(ix) || ix < 0 || ix >= a.length) throw rtex(0, 'ArgumentOutOfRangeException', 'RemoveAt: índice ' + ix + ' inválido'); a.splice(ix, 1); return null; }),
      Contains: V(function(as){ return a.indexOf(as[0]) >= 0; }),
      IndexOf: V(function(as){ return a.indexOf(as[0]); }),
      Clear: V(function(){ a.length = 0; return null; }),
      ToString: V(function(){ throw rtex(0, 'InvalidOperationException', 'no se puede imprimir una colección completa: recórrela con foreach'); })
    };
    return fns;
  }
  function evalMemberFn(obj, name, line){
    if(obj && obj.__ns){
      var ns = obj.__ns;
      if(ns === 'Console'){
        if(name === 'WriteLine') return V(function(a){ writeLine(a.length ? toStr(a[0]) : ''); return null; });
        if(name === 'Write') return V(function(a){ write(a.length ? toStr(a[0]) : ''); return null; });
        if(name === 'ReadLine') return V(function(){ return readLine(line); });
      }
      if(ns === 'Debug'){
        if(name === 'Log' || name === 'LogWarning' || name === 'LogError') return V(function(a){ writeLine(a.length ? toStr(a[0]) : ''); return null; });
      }
      if(ns === 'Math' || ns === 'Mathf'){
        var m = {
          Abs: V(function(a){ return Math.abs(a[0]); }),
          Max: V(function(a){ return Math.max(a[0], a[1]); }),
          Min: V(function(a){ return Math.min(a[0], a[1]); }),
          Floor: V(function(a){ return Math.floor(a[0]); }),
          Sqrt: V(function(a){ return Math.sqrt(a[0]); }),
          Pow: V(function(a){ return Math.pow(a[0], a[1]); }),
          Sign: V(function(a){ return Math.sign(a[0]); }),
          Clamp: V(function(a){ return Math.min(Math.max(a[0], a[1]), a[2]); })
        };
        if(ns === 'Math'){
          m.Ceiling = V(function(a){ return Math.ceil(a[0]); });
          m.Round = V(function(a){ /* bancario: al par */ var f = Math.floor(a[0]), d = a[0] - f;
            if(d === 0.5) return (f % 2 === 0) ? f : f + 1; return Math.round(a[0]); });
        } else {
          m.Ceil = V(function(a){ return Math.ceil(a[0]); });
          m.Round = V(function(a){ return Math.round(a[0]); }); /* Mathf: aleja de cero */
          m.CeilToInt = V(function(a){ return Math.ceil(a[0]); });
          m.FloorToInt = V(function(a){ return Math.floor(a[0]); });
          m.RoundToInt = V(function(a){ return Math.round(a[0]); });
        }
        if(m[name]) return m[name];
        throw err(line, 'CS0117: «' + ns + '.' + name + '» no existe (revisa la chuleta de Mathf/Math)');
      }
      if(ns === 'Random'){
        if(name === 'InitState') return V(function(a){ RNG.state = ((a[0] | 0) || 1) >>> 0; return null; });
        if(name === 'Range') return V(function(a){
          var x = a[0], y = a[1];
          if(!isNumV(x) || !isNumV(y)) throw rtex(line, 'ArgumentException', 'Random.Range espera números');
          if(isIntV(x) && isIntV(y)) return x + Math.floor(rngNext() * (y - x + 1));   /* INCLUSIVO */
          return x + rngNext() * (y - x);
        });
        if(name === 'value') return rngNext();
        throw err(line, 'CS0117: «Random.' + name + '» no existe (usa Range, InitState o value)');
      }
      if(ns === 'Convert'){
        if(name === 'ToInt32' || name === 'ToDouble'){
          return V(function(a){
            var v = a[0];
            if(typeof v === 'number'){ if(!isNumV(v)) throw rtex(line, 'FormatException', 'Convert: valor no numérico'); return name === 'ToInt32' ? Math.round(v) : v; }
            var s2 = String(v == null ? '' : v).trim();
            if(!/^[+-]?\d+$/.test(s2)) throw rtex(line, 'FormatException', 'la cadena «' + s2 + '» no tiene el formato correcto para int');
            return parseInt(s2, 10);
          });
        }
      }
      if(ns === 'Vector3'){
        if(name === 'Zero') return v3(0, 0, 0);
        if(name === 'One') return v3(1, 1, 1);
        if(name === 'Up') return v3(0, 1, 0);
        if(name === 'Right') return v3(1, 0, 0);
        if(name === 'Forward') return v3(0, 0, 1);
        if(name === 'Distance') return V(function(a){ var p = a[0], q = a[1]; if(!p.__v3 || !q.__v3) throw rtex(line, 'ArgumentException', 'Vector3.Distance espera dos Vector3'); var dx = p.__v3[0]-q.__v3[0], dy = p.__v3[1]-q.__v3[1], dz = p.__v3[2]-q.__v3[2]; return Math.sqrt(dx*dx + dy*dy + dz*dz); });
        throw err(line, 'CS0117: «Vector3.' + name + '» no existe');
      }
      if(ns === 'int' && name === 'Parse'){
        return V(function(a){
          var s2 = String(a[0] == null ? '' : a[0]).trim();
          if(!/^[+-]?\d+$/.test(s2)) throw rtex(line, 'FormatException', 'la cadena «' + s2 + '» no tiene el formato correcto para int');
          return parseInt(s2, 10);
        });
      }
      if(ns === 'float' && name === 'Parse'){
        return V(function(a){
          var s2 = String(a[0] == null ? '' : a[0]).trim().replace(/f$|F$|d$|D$/, '');
          if(!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(s2)) throw rtex(line, 'FormatException', 'la cadena «' + s2 + '» no tiene el formato correcto para float');
          return parseFloat(s2);
        });
      }
      if(ns === 'int' || ns === 'float' || ns === 'string' || ns === 'bool'){
        throw err(line, 'CS0117: «' + ns + '.' + name + '» no existe (los tipos básicos solo tienen Parse)');
      }
      throw err(line, 'CS0103: espacio de nombres «' + ns + '» desconocido');
    }
    if(typeof obj === 'string'){
      var sm = makeStrMethods(obj);
      if(name in sm) return sm[name];
      throw err(line, 'CS1061: «string» no tiene un miembro «' + name + '»');
    }
    if(Array.isArray(obj)){
      var am = makeArrMethods(obj);
      if(name in am && am[name] !== null) return am[name];
      if(name === 'Length' || name === 'Count') return am[name];
      throw err(line, 'CS1061: la colección no tiene un miembro «' + name + '»');
    }
    if(obj && obj.__v3){
      if(name === 'x') return obj.__v3[0];
      if(name === 'y') return obj.__v3[1];
      if(name === 'z') return obj.__v3[2];
      if(name === 'magnitude'){ var c = obj.__v3; return Math.sqrt(c[0]*c[0] + c[1]*c[1] + c[2]*c[2]); }
      if(name === 'sqrMagnitude'){ var c2 = obj.__v3; return c2[0]*c2[0] + c2[1]*c2[1] + c2[2]*c2[2]; }
      if(name === 'normalized'){ var c3 = obj.__v3, mg = Math.sqrt(c3[0]*c3[0]+c3[1]*c3[1]+c3[2]*c3[2]) || 1; return v3(c3[0]/mg, c3[1]/mg, c3[2]/mg); }
      if(name === 'ToString') return V(function(){ return v3ToString(obj); });
      throw err(line, 'CS1061: «Vector3» no tiene un miembro «' + name + '»');
    }
    if(obj && obj.__ex){
      if(name === 'Message') return obj.__ex.msg;
      if(name === 'ToString') return V(function(){ return obj.__ex.type + ': ' + obj.__ex.msg; });
      throw err(line, 'CS1061: la excepción no tiene un miembro «' + name + '»');
    }
    if(obj && obj.__obj){
      var io = obj.__obj;
      if(Object.prototype.hasOwnProperty.call(io.fields, name)) return io.fields[name];
      if(io.cls.methods[name]) return { __m:{ m:io.cls.methods[name], obj:obj } };
      throw err(line, 'CS1061: «' + io.cls.name + '» no tiene un miembro «' + name + '»');
    }
    if(typeof obj === 'number' || typeof obj === 'boolean'){
      if(name === 'ToString') return V(function(){ return toStr(obj); });
    }
    if(obj === null || obj === undefined){
      throw rtex(line, 'NullReferenceException', 'estás usando algo que vale null (¿se inicializó con new?)');
    }
    throw err(line, 'CS1061: este valor no tiene un miembro «' + name + '»');
  }

  /* ---------- evaluación ---------- */
  function evalExpr(n, sc){
    tick(n.line || 0);
    switch(n.t){
      case 'num': return n.v;
      case 'str': return n.v;
      case 'bool': return n.v;
      case 'null': return null;
      case 'this':
        if(sc.thisObj) return sc.thisObj;
        throw err(n.line, 'CS0026: this solo está disponible dentro de un método de instancia');
      case 'name': return resolveName(n.name, sc, n.line);
      case 'interp': {
        var s = '';
        for(var i = 0; i < n.parts.length; i++){
          var pt = n.parts[i];
          if(pt.lit !== undefined){ s += pt.lit; continue; }
          var v = evalExpr(pt.expr, sc);
          s += fmtWithSpec(v, pt.spec, n.line);
        }
        return s;
      }
      case 'ternary': return evalExpr(n.cond, sc) ? evalExpr(n.a, sc) : evalExpr(n.b, sc);
      case 'not': return !truthy(evalExpr(n.e, sc), n.line);
      case 'neg': {
        var nv = evalExpr(n.e, sc);
        if(nv && nv.__v3) return v3(-nv.__v3[0], -nv.__v3[1], -nv.__v3[2]);
        if(!isNumV(nv)) throw rtex(n.line, 'CS0029', 'no se puede negar un ' + typeName(nv));
        return -nv;
      }
      case 'cast': {
        var cv = evalExpr(n.e, sc);
        if(n.type === 'int'){
          if(!isNumV(cv)) throw rtex(n.line, 'CS0030: no se puede convertir ' + typeName(cv) + ' a int');
          return Math.trunc(cv);
        }
        if(n.type === 'float'){ if(!isNumV(cv)) throw rtex(n.line, 'CS0030: no se puede convertir ' + typeName(cv) + ' a float'); return cv; }
        if(n.type === 'string') return toStr(cv);
        return cv;
      }
      case 'bin': return evalBin(n, sc);
      case 'assign': return evalAssign(n, sc);
      case 'member': {
        var mo = evalExpr(n.obj, sc);
        return evalMemberFn(mo, n.name, n.line);
      }
      case 'index': {
        var io2 = evalExpr(n.obj, sc);
        var iiv = evalExpr(n.index, sc);
        if(typeof io2 === 'string'){
          if(!isIntV(iiv)) throw rtex(n.line, 'CS0029', 'el índice debe ser entero');
          if(iiv < 0 || iiv >= io2.length) throw rtex(n.line, 'IndexOutOfRangeException', 'índice ' + iiv + ' fuera de la cadena (0..' + (io2.length-1) + ')');
          return io2[iiv];
        }
        if(Array.isArray(io2)){
          if(!isIntV(iiv)) throw rtex(n.line, 'CS0029', 'el índice debe ser entero');
          if(iiv < 0 || iiv >= io2.length) throw rtex(n.line, 'IndexOutOfRangeException', 'índice ' + iiv + ' fuera del array (0..' + (io2.length-1) + ')');
          return io2[iiv];
        }
        throw rtex(n.line, 'CS0021: este valor no se puede indexar');
      }
      case 'newarr': {
        var items = [];
        for(var ii = 0; ii < n.items.length; ii++) items.push(evalExpr(n.items[ii], sc));
        return items;
      }
      case 'newarrlen': {
        var ln = evalExpr(n.len, sc);
        if(!isIntV(ln)) throw rtex(n.line, 'CS0029', 'el tamaño del array debe ser entero');
        if(ln < 0) throw rtex(n.line, 'OverflowException', 'tamaño de array negativo');
        var arr = new Array(ln);
        for(var f = 0; f < ln; f++) arr[f] = (n.type === 'int' || n.type === 'float') ? 0 : (n.type === 'bool' ? false : (n.type === 'string' ? '' : null));
        return arr;
      }
      case 'newobj': return evalNew(n, sc);
      case 'call': return evalCall(n, sc);
    }
    throw err(n.line || 0, 'CS1525: expresión no soportada: ' + n.t);
  }

  function fmtWithSpec(v, spec, line){
    if(!spec) return toStr(v);
    var mm = /^F(\d)?$/.exec(spec);
    if(mm){
      var d = mm[1] === undefined ? 2 : parseInt(mm[1], 10);
      if(typeof v !== 'number') throw rtex(line, 'FormatException', 'el formato F solo aplica a números');
      var negv = v < 0, sav = Math.abs(v).toFixed(d);
      return negv ? '-' + sav : sav;
    }
    throw rtex(line, 'FormatException', 'formato «' + spec + '» no soportado (usa F0, F1, F2…)');
  }

  function truthy(v, line){
    if(typeof v === 'boolean') return v;
    throw rtex(line, 'CS0029: no se puede convertir ' + typeName(v) + ' a bool (las condiciones C# exigen true/false explícitos)'.replace('CS0029: ', ''));
  }

  function evalBin(n, sc){
    if(n.op === '&&'){
      var l = evalExpr(n.l, sc);
      if(!truthy(l, n.line)) return false;
      return truthy(evalExpr(n.r, sc), n.line);
    }
    if(n.op === '||'){
      var l2 = evalExpr(n.l, sc);
      if(truthy(l2, n.line)) return true;
      return truthy(evalExpr(n.r, sc), n.line);
    }
    var a = evalExpr(n.l, sc), b = evalExpr(n.r, sc);
    switch(n.op){
      case '+':
        if(typeof a === 'string' || typeof b === 'string') return toStr(a) + toStr(b);
        if(a && a.__v3 && b && b.__v3) return v3(a.__v3[0]+b.__v3[0], a.__v3[1]+b.__v3[1], a.__v3[2]+b.__v3[2]);
        if(!isNumV(a) || !isNumV(b)) throw rtex(n.line, 'CS0019: el operador + no aplica entre ' + typeName(a) + ' y ' + typeName(b));
        return a + b;
      case '-':
        if(a && a.__v3 && b && b.__v3) return v3(a.__v3[0]-b.__v3[0], a.__v3[1]-b.__v3[1], a.__v3[2]-b.__v3[2]);
        if(!isNumV(a) || !isNumV(b)) throw rtex(n.line, 'CS0019: el operador - no aplica entre ' + typeName(a) + ' y ' + typeName(b));
        return a - b;
      case '*':
        if(a && a.__v3 && isNumV(b)) return v3(a.__v3[0]*b, a.__v3[1]*b, a.__v3[2]*b);
        if(b && b.__v3 && isNumV(a)) return v3(b.__v3[0]*a, b.__v3[1]*a, b.__v3[2]*a);
        if(!isNumV(a) || !isNumV(b)) throw rtex(n.line, 'CS0019: el operador * no aplica entre ' + typeName(a) + ' y ' + typeName(b));
        return a * b;
      case '/': {
        if(!isNumV(a) || !isNumV(b)) throw rtex(n.line, 'CS0019: el operador / no aplica entre ' + typeName(a) + ' y ' + typeName(b));
        var fL = nodeFloatish(n.l, sc), fR = nodeFloatish(n.r, sc);
        if(!fL && !fR && isIntV(a) && isIntV(b)){
          if(b === 0) throw rtex(n.line, 'DivideByZeroException', 'división entera entre cero');
          return Math.trunc(a / b);
        }
        if(isIntV(a) && isIntV(b) && b === 0) return a > 0 ? Infinity : (a < 0 ? -Infinity : NaN);
        return a / b;
      }
      case '%':
        if(!isNumV(a) || !isNumV(b)) throw rtex(n.line, 'CS0019: el operador % no aplica entre ' + typeName(a) + ' y ' + typeName(b));
        if(isIntV(a) && isIntV(b) && !nodeFloatish(n.l, sc) && !nodeFloatish(n.r, sc)){
          if(b === 0) throw rtex(n.line, 'DivideByZeroException', 'módulo entero entre cero');
          return a % b;
        }
        return a % b;
      case '==':
        if(typeof a === 'string' || typeof b === 'string') return a === b;
        if(typeof a === 'boolean' || typeof b === 'boolean') return a === b;
        if(a && a.__v3 && b && b.__v3) return a.__v3[0]===b.__v3[0] && a.__v3[1]===b.__v3[1] && a.__v3[2]===b.__v3[2];
        if(isNumV(a) && isNumV(b)) return a === b;
        if(a === null || b === null) return a === b;
        return a === b;
      case '!=':
        if(typeof a === 'string' || typeof b === 'string') return a !== b;
        if(typeof a === 'boolean' || typeof b === 'boolean') return a !== b;
        if(a && a.__v3 && b && b.__v3) return !(a.__v3[0]===b.__v3[0] && a.__v3[1]===b.__v3[1] && a.__v3[2]===b.__v3[2]);
        if(isNumV(a) && isNumV(b)) return a !== b;
        if(a === null || b === null) return a !== b;
        return a !== b;
      case '<': case '>': case '<=': case '>=':
        if(isNumV(a) && isNumV(b)){
          if(n.op === '<') return a < b;
          if(n.op === '>') return a > b;
          if(n.op === '<=') return a <= b;
          return a >= b;
        }
        if(typeof a === 'string' && typeof b === 'string'){
          if(n.op === '<') return a < b;
          if(n.op === '>') return a > b;
          if(n.op === '<=') return a <= b;
          return a >= b;
        }
        throw rtex(n.line, 'CS0019: el operador ' + n.op + ' no aplica entre ' + typeName(a) + ' y ' + typeName(b));
    }
    throw err(n.line, 'CS0019: operador desconocido ' + n.op);
  }

  function lvalueGet(target, sc){
    if(target.t === 'name') return { get:function(){ return resolveName(target.name, sc, target.line); }, set:function(v){ assignName(target.name, v, sc, target.line); } };
    if(target.t === 'index'){
      var obj = evalExpr(target.obj, sc);
      var ix = evalExpr(target.index, sc);
      if(Array.isArray(obj)){
        if(!isIntV(ix)) throw rtex(target.line, 'CS0029', 'el índice debe ser entero');
        if(ix < 0 || ix >= obj.length) throw rtex(target.line, 'IndexOutOfRangeException', 'índice ' + ix + ' fuera del array (0..' + (obj.length-1) + ')');
        return { get:function(){ return obj[ix]; }, set:function(v){ obj[ix] = v; } };
      }
      throw rtex(target.line, 'CS0021: este valor no se puede indexar');
    }
    if(target.t === 'member'){
      var mo = evalExpr(target.obj, sc);
      if(mo && mo.__obj){
        var io = mo.__obj;
        var has = io.cls.fields.some(function(f){ return f.name === target.name; });
        if(has) return { get:function(){ return io.fields[target.name]; }, set:function(v){ io.fields[target.name] = v; } };
        throw err(target.line, 'CS1061: «' + io.cls.name + '» no tiene un campo «' + target.name + '»');
      }
      if(mo && mo.__v3 && ['x','y','z'].indexOf(target.name) >= 0){
        var vi = { x:0, y:1, z:2 }[target.name];
        return { get:function(){ return mo.__v3[vi]; }, set:function(v){ mo.__v3[vi] = v; } };
      }
      throw err(target.line, 'CS1612: no se puede asignar a este miembro');
    }
    throw err(target.line || 0, 'CS0131: el lado izquierdo de la asignación debe ser una variable, campo o posición');
  }

  function evalAssign(n, sc){
    var lv = lvalueGet(n.target, sc);
    var v;
    if(n.op === '='){ v = evalExpr(n.value, sc); }
    else {
      var cur = lv.get();
      var rv = evalExpr(n.value, sc);
      v = applyBin(n.op[0], cur, rv, n.line);
    }
    if(n.postfix){ lv.set(v); return cur; }
    lv.set(v);
    return v;
  }
  function nodeFloatish(nd, sc){
    if(!nd) return false;
    if(nd.t === 'num') return nd.isF === true;
    if(nd.t === 'cast') return nd.type === 'float' || nd.type === 'double';
    if(nd.t === 'name'){
      var s2 = sc;
      while(s2){ if(s2.types && s2.types[nd.name]) return s2.types[nd.name] === 'float' || s2.types[nd.name] === 'double'; s2 = s2.parent || null; }
    }
    return false;
  }
  function applyBin(op, a, b, line){
    if(op === '+'){
      if(typeof a === 'string' || typeof b === 'string') return toStr(a) + toStr(b);
      if(a && a.__v3 && b && b.__v3) return v3(a.__v3[0]+b.__v3[0], a.__v3[1]+b.__v3[1], a.__v3[2]+b.__v3[2]);
      return a + b;
    }
    if(op === '-') return (a && a.__v3 && b && b.__v3) ? v3(a.__v3[0]-b.__v3[0], a.__v3[1]-b.__v3[1], a.__v3[2]-b.__v3[2]) : a - b;
    if(op === '*') return a * b;
    if(op === '/'){
      if(isIntV(a) && isIntV(b)){ if(b === 0) throw rtex(line, 'DivideByZeroException', 'división entera entre cero'); return Math.trunc(a / b); }
      return a / b;
    }
    if(op === '%'){
      if(isIntV(a) && isIntV(b)){ if(b === 0) throw rtex(line, 'DivideByZeroException', 'módulo entero entre cero'); return a % b; }
      return a % b;
    }
    throw err(line, 'CS0019: operador compuesto desconocido');
  }

  function evalNew(n, sc){
    var type = n.type;
    if(type === 'List' + '<' + 'x' + '>'){ /* interpolación */
      var la = [];
      la.__list = true;
      return la;
    }
    var lm = /^List<(.+)>$/.exec(type);
    if(lm){
      var args = [];
      for(var i = 0; i < n.args.length; i++) args.push(evalExpr(n.args[i], sc));
      var lst = args.slice();
      lst.__list = true;
      return lst;
    }
    if(type === 'Vector3'){
      var va = [];
      for(var k = 0; k < 3; k++) va.push(n.args[k] !== undefined ? evalExpr(n.args[k], sc) : 0);
      if(va.length < 3) va = va.concat([0,0,0]).slice(0,3);
      if(!va.every(isNumV)) throw rtex(n.line, 'CS1503: Vector3 espera números (x, y, z)');
      return v3(va[0], va[1], va[2]);
    }
    if(type === 'Random'){ RNG.state = 987654321; return { __ns:'SystemRandom' }; }
    if(/^Exception$|Exception$/.test(type)){
      var msg = n.args.length ? toStr(evalExpr(n.args[0], sc)) : 'Exception of type \'' + type + '\' was thrown.';
      return { __ex:{ type:type, msg:msg } };
    }
    var cls = classes[type];
    if(!cls) throw err(n.line, 'CS0246: el tipo «' + type + '» no existe (¿se declaró la clase? ¿está bien escrito?)');
    var inst = { __obj:{ cls:cls, fields:{} } };
    cls.fields.forEach(function(f){
      inst.__obj.fields[f.name] = (f.init !== null) ? evalExpr(f.init, sc) : defaultFor(f.type);
    });
    var cargs = [];
    for(var c2 = 0; c2 < n.args.length; c2++) cargs.push(evalExpr(n.args[c2], sc));
    if(cls.ctor){
      var sc2 = new Scope(globals);
      sc2.thisObj = inst;
      for(var p2 = 0; p2 < cls.ctor.params.length; p2++){
        var pm = cls.ctor.params[p2];
        if(p2 < cargs.length) sc2.vars[pm.name] = cargs[p2];
        else if(pm.def !== null) sc2.vars[pm.name] = evalExpr(pm.def, sc2);
        else throw err(n.line, 'CS7036: el constructor de «' + type + '» requiere el argumento «' + pm.name + '»');
      }
      callDepth++;
      try{ execBlock(cls.ctor.body, sc2); } catch(sig){ if(sig && sig.__sig === 'return'){ /* ctor no regresa valor */ } else { callDepth--; throw sig; } }
      callDepth--;
    } else if(cargs.length){
      throw err(n.line, 'CS1729: «' + type + '» no tiene un constructor que reciba ' + cargs.length + ' argumento(s)');
    }
    return inst;
  }

  function evalCall(n, sc){
    var cal = evalExpr(n.callee, sc);
    var args = [];
    for(var i = 0; i < n.args.length; i++) args.push(evalExpr(n.args[i], sc));
    if(cal && cal.__m) return callUserMethod(cal.__m.m, args, cal.__m.obj, n.line);
    if(cal && cal.__bfn) return callBuiltin(cal, args, n.line);
    throw err(n.line, 'CS0149: se esperaba un nombre de método para llamar con ( )');
  }

  /* ---------- ejecución de sentencias ---------- */
  function execBlock(block, sc){
    var stmts = block.stmts || block;
    for(var i = 0; i < stmts.length; i++) execStmt(stmts[i], sc);
  }
  function execStmt(n, sc){
    tick(n.line || 0);
    switch(n.t){
      case 'block': execBlock(n, sc); return;
      case 'class': return;                        /* ya registrada */
      case 'method': return;                       /* ya registrado */
      case 'decl': {
        if(!sc.types) sc.types = {};
        for(var i = 0; i < n.decls.length; i++){
          var d = n.decls[i];
          sc.types[d.name] = n.type;
          sc.vars[d.name] = (d.init !== null) ? evalExpr(d.init, sc) : defaultFor(n.type);
        }
        return;
      }
      case 'exprstmt': evalExpr(n.expr, sc); return;
      case 'if':
        if(truthy(evalExpr(n.cond, sc), n.line)) execStmt(n.then, sc);
        else if(n.els) execStmt(n.els, sc);
        return;
      case 'while':
        while(truthy(evalExpr(n.cond, sc), n.line)){
          tick(n.line);
          try{ execStmt(n.body, sc); }
          catch(sig){ if(sig && sig.__sig === 'break') break; if(sig && sig.__sig === 'continue') continue; throw sig; }
        }
        return;
      case 'dowhile':
        do {
          tick(n.line);
          try{ execStmt(n.body, sc); }
          catch(sig){ if(sig && sig.__sig === 'break') break; if(sig && sig.__sig === 'continue') continue; throw sig; }
        } while(truthy(evalExpr(n.cond, sc), n.line));
        return;
      case 'for': {
        if(n.init) execStmt(n.init, sc);
        while(n.cond === null || truthy(evalExpr(n.cond, sc), n.line)){
          tick(n.line);
          try{ execStmt(n.body, sc); }
          catch(sig){
            if(sig && sig.__sig === 'break') break;
            if(!(sig && sig.__sig === 'continue')) throw sig;
          }
          if(n.upd) evalExpr(n.upd, sc);
        }
        return;
      }
      case 'foreach': {
        var seq = evalExpr(n.seq, sc);
        var items;
        if(Array.isArray(seq)) items = seq.slice();
        else if(typeof seq === 'string') items = seq.split('');
        else throw rtex(n.line, 'CS1579: foreach no puede iterar sobre ' + typeName(seq));
        for(var f2 = 0; f2 < items.length; f2++){
          tick(n.line);
          sc.vars[n.varName] = items[f2];
          try{ execStmt(n.body, sc); }
          catch(sig){
            if(sig && sig.__sig === 'break') break;
            if(!(sig && sig.__sig === 'continue')) throw sig;
          }
        }
        return;
      }
      case 'return': throw new Sig('return', n.value ? evalExpr(n.value, sc) : null);
      case 'break': throw new Sig('break');
      case 'continue': throw new Sig('continue');
      case 'throw': {
        var tv = n.value ? evalExpr(n.value, sc) : null;
        if(tv && tv.__ex) throw rtex(n.line, tv.__ex.type, tv.__ex.msg);
        throw rtex(n.line, 'Exception', toStr(tv));
      }
      case 'try': {
        try{
          execBlock(n.body, sc);
        } catch(e){
          if(!(e && e.ucs && e.exType)) throw e;
          var handled = false;
          for(var c3 = 0; c3 < n.catches.length; c3++){
            var ct = n.catches[c3];
            var wants = ct.type === 'Exception' || ct.type === 'SystemException';
            if(wants || ct.type === e.exType){
              var sc2 = new Scope(sc);
              if(ct.varName) sc2.vars[ct.varName] = { __ex:{ type:e.exType, msg:e.exMsg } };
              execBlock(ct.block, sc2);
              handled = true;
              break;
            }
          }
          if(!handled && !n.fin) throw e;
        } finally {
          /* finally se ejecuta siempre */
          if(n.fin) execBlock(n.fin, sc);
        }
        return;
      }
    }
    throw err(n.line || 0, 'CS1026: sentencia no soportada: ' + n.t);
  }

  /* ---------- arranque ---------- */
  try{
    var program = parseProgram(lex(src));
    /* registrar declaraciones primero (como C# compila todo antes de correr) */
    var stmts = [];
    for(var i = 0; i < program.length; i++){
      var nd = program[i];
      if(nd.t === 'class'){ classes[nd.name] = nd; continue; }
      if(nd.t === 'method'){ methods[nd.name] = nd; continue; }
      stmts.push(nd);
    }
    var mainScope = new Scope(null);
    globals = mainScope;
    for(var s2 = 0; s2 < stmts.length; s2++){
      if(stmts[s2].t === 'decl'){
        for(var d2 = 0; d2 < stmts[s2].decls.length; d2++){
          var dd = stmts[s2].decls[d2];
          mainScope.vars[dd.name] = (dd.init !== null) ? evalExpr(dd.init, mainScope) : defaultFor(stmts[s2].type);
        }
        continue;
      }
      execStmt(stmts[s2], mainScope);
    }
    flushLine();
    var vars = {};
    var want = opts.wantVars || [];
    if(want.length){
      for(var w = 0; w < want.length; w++){
        if(Object.prototype.hasOwnProperty.call(mainScope.vars, want[w])) vars[want[w]] = mainScope.vars[want[w]];
      }
    }
    return { ok:true, output:outBuf.join('\n') + (outBuf.length ? '\n' : ''), vars:vars };
  } catch(e){
    try{ flushLine(); } catch(e2){}
    if(e && e.ucs) return { ok:false, error:e.message };
    if(e instanceof Sig) return { ok:false, error:'⚠️ «break»/«continue»/«return» fuera de su lugar' };
    return { ok:false, error:'⚠️ ' + (e && e.message ? e.message : 'Error inesperado') };
  }

  function flushLine(){ if(curLine !== ''){ outBuf.push(curLine); curLine = ''; } }
}

/* ---------- calificación por salida (idéntica a PYE) ---------- */
function gradeOutput(expected, got, opts){
  opts = opts || {};
  var E = (expected || []).slice(), G = String(got == null ? '' : got).split('\n');
  if(G.length && G[G.length-1] === '') G.pop();
  if(opts.trim){ E = E.map(function(l){ return l.trim(); }); G = G.map(function(l){ return l.trim(); }); }
  for(var i = 0; i < Math.max(E.length, G.length); i++){
    var e = E[i], g = G[i];
    if(e === undefined) return { ok:false, why:'Tu programa imprimió líneas de más. La primera sobrante fue «' + g + '» (línea ' + (i+1) + ').' };
    if(g === undefined) return { ok:false, why:'A tu programa le faltaron líneas: esperaba «' + e + '» en la línea ' + (i+1) + ' y ahí se terminó la salida.' };
    if(e !== g) return { ok:false, why:'En la línea ' + (i+1) + ' esperaba «' + e + '» y salió «' + g + '».' };
  }
  return { ok:true };
}

return { run:run, gradeOutput:gradeOutput };
})();
if(typeof module !== 'undefined' && module.exports) module.exports = UCS;
