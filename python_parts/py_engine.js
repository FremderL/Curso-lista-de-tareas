/* ============================================================
   PYE — mini-interpreter de Python 3 para el curso «Python desde cero»
   100% en el navegador (JavaScript puro, sin dependencias).
   Soporta: print/input, variables, int/float/str/bool/None, operadores
   con semántica Python (/ → float, //, % con signo de Python, **),
   f-strings con :.Nf y alineación, comparaciones encadenadas,
   and/or/not, in, if/elif/else, while/else, for + range + else,
   break/continue/pass, listas (métodos + slicing), tuplas y
   desempaque, diccionarios, funciones def (defaults, recursión),
   try/except/finally, import math/random (determinista),
   enumerate/zip/sorted/sum/min/max/round (banker's), type().
   Errores EN ESPAÑOL, con número de línea y excepción real de Python.
   API: PYE.run(src, {stdin, wantVars, maxSteps}) →
        {ok, output, vars} | {ok:false, error, output}
        PYE.gradeOutput(esperadas, obtenidas, opts) → {ok, why}
   ============================================================ */
var PYE = (function(){
'use strict';

/* =================== valores =================== */
var PY_NONE = { t:'none' };
function INT(n){ return { t:'int', v:n }; }
function FLT(n){ return { t:'float', v:n }; }
function BOOL(b){ return { t:'bool', v:!!b }; }
function isNum(v){ return !!v && (v.t==='int' || v.t==='float' || v.t==='bool'); }
function isInt_(v){ return v.t==='int' || v.t==='bool'; }
function numVal(v){ return v.t==='bool' ? (v.v?1:0) : v.v; }
function typeName(v){
  if(typeof v==='string') return 'str';
  if(v===null||v===undefined) return 'NoneType';
  switch(v.t){
    case 'none': return 'NoneType'; case 'int': return 'int'; case 'float': return 'float';
    case 'bool': return 'bool'; case 'str': return 'str'; case 'list': return 'list';
    case 'tuple': return 'tuple'; case 'dict': return 'dict'; case 'range': return 'range';
    case 'fn': case 'builtin': case 'bound': return 'function'; case 'module': return 'module';
    case 'type': return 'type'; default: return '?';
  }
}
function fltStr(x){
  if(x!==x) return 'nan';
  if(x===Infinity) return 'inf';
  if(x===-Infinity) return '-inf';
  if(Number.isInteger(x) && Math.abs(x)<1e16) return x.toFixed(1);
  return String(x);
}
function pyStr(v){
  if(v===null||v===undefined) return 'None';
  switch(v.t){
    case 'none': return 'None';
    case 'bool': return v.v ? 'True' : 'False';
    case 'int': return String(v.v);
    case 'float': return fltStr(v.v);
    case 'str': return v;
    case 'list': return '['+v.a.map(pyRepr).join(', ')+']';
    case 'tuple': return '('+v.a.map(pyRepr).join(', ')+(v.a.length===1?',':'')+')';
    case 'dict': return '{'+dItems(v).map(function(p){ return pyRepr(p[0])+': '+pyRepr(p[1]); }).join(', ')+'}';
    case 'range': return v.c===1 ? ('range('+v.a+', '+v.b+')') : ('range('+v.a+', '+v.b+', '+v.c+')');
    case 'fn': return '<function '+v.name+'>';
    case 'builtin': return '<built-in function '+v.name+'>';
    case 'bound': return '<built-in method '+v.name+'>';
    case 'module': return "<module '"+v.name+"'>";
    case 'type': return "<class '"+v.name+"'>";
    default: return String(v);
  }
}
function pyRepr(v){
  if(typeof v==='string') return "'"+v.replace(/\\/g,'\\\\').replace(/'/g,"\\'")+"'";
  return pyStr(v);
}
function pyEq(a, b){
  if(isNum(a) && isNum(b)) return numVal(a)===numVal(b);
  if(typeof a==='string' && typeof b==='string') return a===b;
  if((a&&a.t==='none')&&(b&&b.t==='none')) return true;
  if((a&&a.t==='none')||(b&&b.t==='none')) return false;
  if(a&&b&&a.t==='list'&&b.t==='list') return a.a.length===b.a.length && a.a.every(function(x,i){ return pyEq(x, b.a[i]); });
  if(a&&b&&a.t==='tuple'&&b.t==='tuple') return a.a.length===b.a.length && a.a.every(function(x,i){ return pyEq(x, b.a[i]); });
  return a===b;
}
function keyStr(v){
  if(isNum(v)) return 'n:'+numVal(v);
  if(typeof v==='string') return 's:'+v;
  if(v&&v.t==='none') return 'none';
  if(v&&v.t==='tuple') return 't:('+v.a.map(keyStr).join(',')+')';
  perr('TypeError', 'Las listas y los diccionarios no pueden ser claves de un diccionario (no son «hashables»)', 0);
  return '';
}
function dGet(d, k){ var e = d.m.get(keyStr(k)); return e ? e[1] : undefined; }
function dSet(d, k, v){ d.m.set(keyStr(k), [k, v]); }
function dHas(d, k){ return d.m.has(keyStr(k)); }
function dDel(d, k){ return d.m.delete(keyStr(k)); }
function dItems(d){ var out=[]; d.m.forEach(function(e){ out.push([e[0], e[1]]); }); return out; }
function dKeys(d){ return dItems(d).map(function(p){ return p[0]; }); }
function dVals(d){ return dItems(d).map(function(p){ return p[1]; }); }
function mkList(arr){ return { t:'list', a:arr }; }

/* =================== errores (en español) =================== */
function perr(kind, msg, line){
  var e = new Error(kind+': '+msg);
  e.pye = true; e.pykind = kind; e.pymsg = msg; e.pyline = line||0;
  throw e;
}

/* =================== lexer =================== */
var KEYWORDS = { 'if':1,'elif':1,'else':1,'while':1,'for':1,'in':1,'def':1,'return':1,'break':1,'continue':1,
  'pass':1,'and':1,'or':1,'not':1,'is':1,'None':1,'True':1,'False':1,'import':1,'from':1,'as':1,
  'try':1,'except':1,'finally':1,
  'class':1,'lambda':1,'del':1,'global':1,'nonlocal':1,'with':1,'assert':1,'yield':1,'raise':1 };
var UNSUPPORTED = { 'class':'las clases','lambda':'lambda (usa def)','del':'del','global':'global','nonlocal':'nonlocal',
  'with':'with','assert':'assert','yield':'yield (generadores)','raise':'raise' };

function lex(src){
  var toks=[], i=0, line=1, depth=0, atStart=true, indents=[0];
  function tok(k, v){ toks.push({ k:k, v:v, line:line }); }
  var n = src.length;
  while(i < n){
    if(atStart && depth===0){
      var j=i, col=0;
      while(j<n && (src[j]===' '||src[j]==='\t')){
        if(src[j]==='\t') perr('IndentationError','Usa espacios (4) para indentar, no tabuladores', line);
        col++; j++;
      }
      if(j>=n){ i=j; break; }
      if(src[j]==='\n'){ i=j+1; line++; continue; }
      if(src[j]==='#'){ while(j<n && src[j]!=='\n') j++; i=j; continue; }
      if(col > indents[indents.length-1]){ indents.push(col); tok('indent'); }
      else while(col < indents[indents.length-1]){ indents.pop(); tok('dedent'); }
      if(col !== indents[indents.length-1]) perr('IndentationError','La sangría no coincide con ningún nivel externo del bloque', line);
      atStart=false; i=j; continue;
    }
    var c = src[i];
    if(c==='\n'){ if(depth===0){ tok('nl'); atStart=true; } line++; i++; continue; }
    if(c===' '||c==='\t'){ i++; continue; }
    if(c==='#'){ while(i<n && src[i]!=='\n') i++; continue; }
    if(c==='\\'){ if(src[i+1]==='\n'){ i+=2; line++; continue; } perr('SyntaxError','«\\» solo se usa al final para continuar una línea', line); }
    if(c==='"'||c==="'"){ i = readStr(toks, src, i, line, ''); continue; }
    if((c==='f'||c==='F') && (src[i+1]==='"'||src[i+1]==="'")){ i = readStr(toks, src, i+1, line, 'f'); continue; }
    if(/[0-9]/.test(c) || (c==='.' && /[0-9]/.test(src[i+1]||''))){
      var st=i;
      while(i<n && /[0-9]/.test(src[i])) i++;
      var isF=false;
      if(src[i]==='.' && /[0-9]/.test(src[i+1]||'')){ isF=true; i++; while(i<n && /[0-9]/.test(src[i])) i++; }
      if(i<n && (src[i]==='e'||src[i]==='E') && (/[0-9]/.test(src[i+1]||'') || ((src[i+1]==='+'||src[i+1]==='-') && /[0-9]/.test(src[i+2]||'')))){
        isF=true; i++;
        if(src[i]==='+'||src[i]==='-') i++;
        while(i<n && /[0-9]/.test(src[i])) i++;
      }
      var txt = src.slice(st, i);
      tok('num', isF ? FLT(parseFloat(txt)) : INT(parseInt(txt,10)));
      continue;
    }
    if(/[A-Za-z_]/.test(c)){
      var st2=i;
      while(i<n && /[A-Za-z0-9_]/.test(src[i])) i++;
      var w = src.slice(st2, i);
      if(KEYWORDS[w]) tok('kw', w); else tok('name', w);
      continue;
    }
    var three = src.substr(i,3), two = src.substr(i,2);
    if(three==='**='||three==='//='){ tok('op', three); i+=3; continue; }
    if(['**','//','==','!=','<=','>=','+=','-=','*=','/=','%='].indexOf(two)>=0){ tok('op', two); i+=2; continue; }
    if('+-*/%()[]{},:.<>=;'.indexOf(c)>=0){
      if(c==='('||c==='['||c==='{') depth++;
      if(c===')'||c===']'||c==='}'){ depth--; if(depth<0) perr('SyntaxError','«'+c+'» de más: no hay nada abierto que cerrar', line); }
      tok('op', c); i++; continue;
    }
    perr('SyntaxError','Carácter no válido en Python: «'+c+'»', line);
  }
  if(depth>0) perr('SyntaxError','Falta cerrar un paréntesis o corchete que se abrió', line);
  if(toks.length && toks[toks.length-1].k!=='nl') tok('nl');
  while(indents.length>1){ indents.pop(); tok('dedent'); }
  tok('eof');
  return toks;
}
function readStr(toks, src, i, line, prefix){
  var q = src[i], j=i+1, out='';
  while(j<src.length && src[j]!==q){
    if(src[j]==='\n') perr('SyntaxError','Falta la comilla de cierre '+q+' del texto', line);
    if(src[j]==='\\'){
      var nx = src[j+1];
      if(nx==='n'){ out+='\n'; j+=2; }
      else if(nx==='t'){ out+='\t'; j+=2; }
      else if(nx==='\\'){ out+='\\'; j+=2; }
      else if(nx==='\r'){ out+='\r'; j+=2; }
      else if(nx===q){ out+=q; j+=2; }
      else { out+='\\'; j++; }
    } else { out+=src[j]; j++; }
  }
  if(j>=src.length) perr('SyntaxError','Falta la comilla de cierre '+q+' del texto', line);
  toks.push(prefix==='f' ? { k:'fstr', v:out, line:line } : { k:'str', v:out, line:line });
  return j+1;
}

/* ---- f-strings: partir en literales y expresiones ---- */
function splitF(raw, line){
  var parts=[], buf='', i=0;
  while(i<raw.length){
    var c = raw[i];
    if(c==='{'){
      if(raw[i+1]==='{'){ buf+='{'; i+=2; continue; }
      if(buf){ parts.push({ s:buf }); buf=''; }
      var d=1, k=i+1, expr='';
      while(k<raw.length && d>0){
        if(raw[k]==='{') d++;
        if(raw[k]==='}'){ d--; if(d===0) break; }
        expr+=raw[k]; k++;
      }
      if(d!==0) perr('SyntaxError','Falta «}» de cierre en la f-string', line);
      var spec=null, dd=0, ci=-1;
      for(var x=0; x<expr.length; x++){
        var ch = expr[x];
        if('([{'.indexOf(ch)>=0) dd++;
        else if(')]}'.indexOf(ch)>=0) dd--;
        else if(ch===':' && dd===0){ ci=x; break; }
      }
      if(ci>=0){ spec = expr.slice(ci+1); expr = expr.slice(0, ci); }
      if(!expr.trim()) perr('SyntaxError','f-string vacía: {} sin expresión', line);
      parts.push({ e:parseSubExpr(expr, line), spec:spec });
      i = k+1; continue;
    }
    if(c==='}'){
      if(raw[i+1]==='}'){ buf+='}'; i+=2; continue; }
      perr('SyntaxError','«}» de más en la f-string', line);
    }
    buf+=c; i++;
  }
  if(buf) parts.push({ s:buf });
  return parts;
}

/* =================== parser =================== */
function Parser(toks){ this.t=toks; this.p=0; this.loop=0; this.fn=0; }
Parser.prototype = {
  peek:function(k){ return this.t[this.p+(k||0)]; },
  next:function(){ return this.t[this.p++]; },
  isKw:function(w){ var t=this.peek(); return t.k==='kw' && t.v===w; },
  eatKw:function(w){ if(this.isKw(w)){ this.p++; return true; } return false; },
  expectKw:function(w){ if(!this.eatKw(w)) perr('SyntaxError', 'Se esperaba «'+w+'»'+this.cerca(), this.here()); },
  isOp:function(v){ var t=this.peek(); return t.k==='op' && t.v===v; },
  eatOp:function(v){ if(this.isOp(v)){ this.p++; return true; } return false; },
  expectOp:function(v){ if(!this.eatOp(v)) perr('SyntaxError', 'Se esperaba «'+v+'»'+this.cerca(), this.here()); },
  here:function(){ return this.peek().line||0; },
  cerca:function(){ var t=this.peek(); return ' cerca de «'+(t.k==='eof'?'fin':String(t.v))+'»'; },
  skipNl:function(){ while(this.peek().k==='nl') this.p++; },
  atLineEnd:function(){ var t=this.peek(); return t.k==='nl'||t.k==='eof'||t.k==='dedent'||this.isOp(';'); },

  parseProgram:function(){
    var out=[];
    this.skipNl();
    while(this.peek().k!=='eof'){
      var s = this.parseStmt();
      if(Array.isArray(s)) out.push.apply(out, s); else out.push(s);
      this.skipNl();
    }
    return out;
  },
  parseSimpleLine:function(){
    var out=[this.parseSimpleStmt()];
    while(this.eatOp(';')){
      if(this.atLineEnd()) break;
      out.push(this.parseSimpleStmt());
    }
    if(this.peek().k==='nl') this.p++;
    return out;
  },
  parseBlock:function(){
    this.expectOp(':');
    if(this.peek().k==='nl'){
      this.p++;
      if(this.peek().k!=='indent') perr('IndentationError','Después de «:» se esperaba un bloque indentado (4 espacios)', this.here());
      this.p++;
      var out=[];
      while(this.peek().k!=='dedent' && this.peek().k!=='eof'){
        var s = this.parseStmt();
        if(Array.isArray(s)) out.push.apply(out, s); else out.push(s);
        this.skipNl();
      }
      if(this.peek().k==='dedent') this.p++;
      return out;
    }
    return this.parseSimpleLine();
  },
  parseStmt:function(){
    var t = this.peek();
    if(t.k==='kw'){
      switch(t.v){
        case 'if': return this.parseIf();
        case 'while': return this.parseWhile();
        case 'for': return this.parseFor();
        case 'def': return this.parseDef();
        case 'try': return this.parseTry();
        case 'import': case 'from': return this.parseImport();
        case 'break': case 'continue': case 'pass': case 'return': return this.parseSimpleStmt();
        default:
          if(UNSUPPORTED[t.v]) perr('SyntaxError','«'+t.v+'» no está soportado en este mini-motor del curso ('+UNSUPPORTED[t.v]+' sí existen en Python real)', t.line);
      }
    }
    return this.parseSimpleLine();
  },
  parseSimpleStmt:function(){
    var t = this.peek(), line = t.line;
    if(t.k==='kw'){
      if(t.v==='break'||t.v==='continue'){
        if(this.loop===0) perr('SyntaxError','«'+t.v+'» solo funciona dentro de un ciclo (for o while)', line);
        this.p++;
        if(this.peek().k==='nl') this.p++;
        return { k:t.v, line:line };
      }
      if(t.v==='pass'){ this.p++; if(this.peek().k==='nl') this.p++; return { k:'pass', line:line }; }
      if(t.v==='return'){
        if(this.fn===0) perr('SyntaxError','«return» solo funciona dentro de una función (def)', line);
        this.p++;
        var rv = null;
        if(!this.atLineEnd()){
          rv = this.parseExpr();
          if(this.isOp(',')){
            var ritems=[rv];
            while(this.eatOp(',')){
              if(this.atLineEnd()) break;
              ritems.push(this.parseArith());
            }
            rv = { k:'tuple', items:ritems, line:line };
          }
        }
        if(this.peek().k==='nl') this.p++;
        return { k:'return', e:rv, line:line };
      }
      if(UNSUPPORTED[t.v]) perr('SyntaxError','«'+t.v+'» no está soportado en este mini-motor del curso ('+UNSUPPORTED[t.v]+' sí existen en Python real)', line);
    }
    var first = this.parseExpr();
    /* asignación con tupla desnuda como objetivo: a, b = ... */
    if(this.isOp(',')){
      var titems=[first];
      while(this.eatOp(',')){
        if(this.atLineEnd()) break;
        titems.push(this.parseArith());
      }
      var tnode = { k:'tuple', items:titems, line:line };
      if(!this.eatOp('=')) perr('SyntaxError','Después de «a, b» se esperaba «=»', line);
      this.checkTarget(tnode, line);
      var tv = this.parseTupleValue();
      if(this.eatOp('=')) perr('SyntaxError','Asignación encadenada (a = b = valor) no está soportada: asigna por partes', line);
      return { k:'assign', target:tnode, e:tv, line:line };
    }
    if(this.eatOp('=')){
      this.checkTarget(first, line);
      var val = this.parseTupleValue();
      if(this.eatOp('=')) perr('SyntaxError','Asignación encadenada (a = b = valor) no está soportada: asigna por partes', line);
      return { k:'assign', target:first, e:val, line:line };
    }
    if(this.peek().k==='op' && ['+=','-=','*=','/=','//=','%=','**='].indexOf(this.peek().v)>=0){
      var aug = this.next().v;
      this.checkTarget(first, line);
      var v = this.parseExpr();
      return { k:'aug', op:aug.slice(0, aug.indexOf('=')), target:first, e:v, line:line };
    }
    if(!this.atLineEnd()) perr('SyntaxError','Sintaxis no válida'+this.cerca()+' (¿falta «=» o «:»?)', line);
    return { k:'expr', e:first, line:line };
  },
  checkTarget:function(e, line){
    if(e.k==='name' || e.k==='index') return;
    if((e.k==='tuple'||e.k==='list') && e.items.every(function(x){ return x.k==='name'||x.k==='index'||x.k==='tuple'||x.k==='list'; })) return;
    perr('SyntaxError','Del lado izquierdo del «=» solo puede haber variables, elementos o desempaques', line);
  },
  /* valor de asignación: expr, o tupla implícita a = 1, 2 */
  parseTupleValue:function(){
    var v = this.parseExpr();
    if(this.isOp(',')){
      var items=[v];
      while(this.eatOp(',')){
        if(this.atLineEnd()) break;
        items.push(this.parseArith());
      }
      return { k:'tuple', items:items, line:this.here() };
    }
    return v;
  },
  parseIf:function(){
    var line=this.here(); this.p++;
    var clauses=[{ cond:this.parseExpr(), blk:this.parseBlock() }];
    var els=null;
    for(;;){
      var save=this.p; this.skipNl();
      if(this.isKw('elif')){ this.p++; clauses.push({ cond:this.parseExpr(), blk:this.parseBlock() }); continue; }
      if(this.isKw('else')){ this.p++; els=this.parseBlock(); break; }
      this.p=save; break;
    }
    return { k:'if', clauses:clauses, els:els, line:line };
  },
  parseWhile:function(){
    var line=this.here(); this.p++;
    var cond=this.parseExpr(), blk, els=null;
    this.loop++;
    blk=this.parseBlock();
    var save=this.p; this.skipNl();
    if(this.isKw('else')){ this.p++; els=this.parseBlock(); } else this.p=save;
    this.loop--;
    return { k:'while', cond:cond, blk:blk, els:els, line:line };
  },
  parseFor:function(){
    var line=this.here(); this.p++;
    var target=this.parseForTarget(line);
    this.expectKw('in');
    var iter=this.parseExpr(), blk, els=null;
    this.loop++;
    blk=this.parseBlock();
    var save=this.p; this.skipNl();
    if(this.isKw('else')){ this.p++; els=this.parseBlock(); } else this.p=save;
    this.loop--;
    return { k:'for', target:target, iter:iter, blk:blk, els:els, line:line };
  },
  /* objetivo de for: nombre, índice o tupla desnuda (x, y) — SIN tratar «in» como comparación */
  parseForTarget:function(line){
    var first=this.parseArith();
    if(!this.isOp(',')) return first;
    var items=[first];
    while(this.eatOp(',')){
      if(this.isKw('in')) break;
      items.push(this.parseArith());
    }
    this.checkTarget({ k:'tuple', items:items, line:line }, line);
    return { k:'tuple', items:items, line:line };
  },
  parseDef:function(){
    var line=this.here(); this.p++;
    var nt=this.peek();
    if(nt.k!=='name') perr('SyntaxError','Después de «def» va el nombre de la función', line);
    this.p++;
    this.expectOp('(');
    var params=[];
    while(!this.isOp(')')){
      var pn=this.peek();
      if(pn.k!=='name') perr('SyntaxError','Nombre de parámetro no válido en la definición', line);
      this.p++;
      var def=null;
      if(this.eatOp('=')) def=this.parseExpr();
      params.push({ name:pn.v, def:def });
      if(!this.eatOp(',')) break;
    }
    this.expectOp(')');
    if(this.isOp('->')) perr('SyntaxError','Las anotaciones de tipo (->) no están soportadas en el curso', line);
    this.fn++;
    var blk=this.parseBlock();
    this.fn--;
    return { k:'def', name:nt.v, params:params, blk:blk, line:line };
  },
  parseTry:function(){
    var line=this.here(); this.p++;
    var blk=this.parseBlock(), handlers=[], fin=null;
    for(;;){
      var save=this.p; this.skipNl();
      if(this.isKw('except')){
        this.p++;
        var h={ type:null, bind:null };
        if(this.peek().k==='name' || this.isOp('(')){
          h.type=this.parseExpr();
        }
        if(this.eatKw('as')){
          var bn=this.peek(); if(bn.k!=='name') perr('SyntaxError','Después de «as» va un nombre', line);
          this.p++; h.bind=bn.v;
        }
        h.blk=this.parseBlock();
        handlers.push(h);
        continue;
      }
      if(this.isKw('finally')){ this.p++; fin=this.parseBlock(); break; }
      this.p=save; break;
    }
    if(!handlers.length && !fin) perr('SyntaxError','try necesita al menos un except o un finally', line);
    return { k:'try', blk:blk, handlers:handlers, fin:fin, line:line };
  },
  parseImport:function(){
    var line=this.here();
    if(this.eatKw('import')){
      var mods=[];
      do{
        var nt=this.peek(); if(nt.k!=='name') perr('SyntaxError','Después de «import» va el nombre del módulo', line);
        this.p++;
        var alias=null;
        if(this.eatKw('as')){ var a=this.peek(); if(a.k!=='name') perr('SyntaxError','Después de «as» va un nombre', line); this.p++; alias=a.v; }
        mods.push({ mod:nt.v, alias:alias });
      } while(this.eatOp(','));
      if(this.peek().k==='nl') this.p++;
      return { k:'import', mods:mods, line:line };
    }
    this.p++;
    var mt=this.peek(); if(mt.k!=='name') perr('SyntaxError','Después de «from» va el nombre del módulo', line);
    this.p++;
    this.expectKw('import');
    var items=[];
    do{
      var it=this.peek(); if(it.k!=='name') perr('SyntaxError','Nombre a importar no válido', line);
      this.p++;
      var alias2=null;
      if(this.eatKw('as')){ var a2=this.peek(); if(a2.k!=='name') perr('SyntaxError','Después de «as» va un nombre', line); this.p++; alias2=a2.v; }
      items.push({ name:it.v, alias:alias2 });
    } while(this.eatOp(','));
    if(this.peek().k==='nl') this.p++;
    return { k:'fromimport', mod:mt.v, items:items, line:line };
  },

  /* ---- expresiones ---- */
  parseExpr:function(){ return this.parseOr(); },
  parseOr:function(){
    var l=this.parseAnd();
    while(this.isKw('or')){ var line=this.here(); this.p++; l={ k:'or', a:l, b:this.parseAnd(), line:line }; }
    return l;
  },
  parseAnd:function(){
    var l=this.parseNot();
    while(this.isKw('and')){ var line=this.here(); this.p++; l={ k:'and', a:l, b:this.parseNot(), line:line }; }
    return l;
  },
  parseNot:function(){
    if(this.isKw('not')){ var line=this.here(); this.p++; return { k:'not', a:this.parseNot(), line:line }; }
    return this.parseCmp();
  },
  parseCmp:function(){
    var line=this.here();
    var first=this.parseArith();
    var pairs=[];
    for(;;){
      var t=this.peek(), op=null, pl=this.here();
      if(t.k==='op' && ['==','!=','<','>','<=','>='].indexOf(t.v)>=0){ op=t.v; this.p++; }
      else if(t.k==='kw' && t.v==='in'){ op='in'; this.p++; }
      else if(t.k==='kw' && t.v==='not' && this.peek(1).k==='kw' && this.peek(1).v==='in'){ op='notin'; this.p+=2; }
      else if(t.k==='kw' && t.v==='is'){ this.p++; if(this.isKw('not')){ this.p++; op='isnot'; } else op='is'; }
      else break;
      pairs.push({ op:op, e:this.parseArith(), line:pl });
    }
    if(!pairs.length) return first;
    return { k:'cmp', first:first, pairs:pairs, line:line };
  },
  parseArith:function(){
    var l=this.parseTerm();
    for(;;){
      if(this.isOp('+')||this.isOp('-')){ var op=this.next().v; l={ k:'bin', op:op, a:l, b:this.parseTerm(), line:this.here() }; }
      else break;
    }
    return l;
  },
  parseTerm:function(){
    var l=this.parseUnary();
    for(;;){
      if(this.isOp('*')||this.isOp('/')||this.isOp('//')||this.isOp('%')){ var op=this.next().v; l={ k:'bin', op:op, a:l, b:this.parseUnary(), line:this.here() }; }
      else break;
    }
    return l;
  },
  parseUnary:function(){
    if(this.isOp('-')){ var line=this.here(); this.p++; return { k:'neg', a:this.parseUnary(), line:line }; }
    if(this.isOp('+')){ this.p++; return this.parseUnary(); }
    return this.parsePower();
  },
  parsePower:function(){
    var base=this.parsePostfix();
    if(this.isOp('**')){ var line=this.here(); this.p++; return { k:'bin', op:'**', a:base, b:this.parseUnary(), line:line }; }
    return base;
  },
  parsePostfix:function(){
    var a=this.parseAtom();
    for(;;){
      var line=this.here();
      if(this.isOp('(')){ a=this.finishCall(a, line); continue; }
      if(this.isOp('[')){ this.p++; a=this.parseSubscript(a, line); continue; }
      if(this.isOp('.')){
        this.p++;
        var nt=this.peek();
        if(nt.k!=='name') perr('SyntaxError','Después del punto va el nombre del método o atributo', line);
        this.p++;
        a={ k:'attr', obj:a, name:nt.v, line:line };
        continue;
      }
      break;
    }
    return a;
  },
  finishCall:function(fn, line){
    this.expectOp('(');
    var args=[], kwargs=[];
    while(!this.isOp(')')){
      var t=this.peek();
      if(t.k==='name' && this.peek(1).k==='op' && this.peek(1).v==='='){
        this.p+=2;
        kwargs.push({ name:t.v, e:this.parseExpr() });
      } else {
        if(t.k==='op'&&t.v==='*') perr('SyntaxError','*args en llamadas no está soportado en el curso', line);
        args.push(this.parseExpr());
      }
      if(!this.eatOp(',')) break;
    }
    this.expectOp(')');
    return { k:'call', fn:fn, args:args, kwargs:kwargs, line:line };
  },
  parseSubscript:function(obj, line){
    var start=null, end=null, step=null, sawColon=false;
    if(!this.isOp(':') && !this.isOp(']')) start=this.parseExpr();
    if(this.eatOp(':')){
      sawColon=true;
      if(!this.isOp(':') && !this.isOp(']')) end=this.parseExpr();
      if(this.eatOp(':')){ if(!this.isOp(']')) step=this.parseExpr(); }
    }
    this.expectOp(']');
    if(!sawColon){
      if(start===null) perr('SyntaxError','Índice vacío []', line);
      return { k:'index', obj:obj, idx:start, line:line };
    }
    return { k:'slice', obj:obj, start:start, end:end, step:step, line:line };
  },
  parseAtom:function(){
    var t = this.peek();
    if(t.k==='num'){ this.p++; return { k:'const', v:t.v, line:t.line }; }
    if(t.k==='str'){ this.p++; return { k:'const', v:t.v, line:t.line }; }
    if(t.k==='fstr'){ this.p++; return { k:'fstr', parts:splitF(t.v, t.line), line:t.line }; }
    if(t.k==='name'){ this.p++; return { k:'name', n:t.v, line:t.line }; }
    if(t.k==='kw'){
      if(t.v==='None'){ this.p++; return { k:'const', v:PY_NONE, line:t.line }; }
      if(t.v==='True'){ this.p++; return { k:'const', v:BOOL(true), line:t.line }; }
      if(t.v==='False'){ this.p++; return { k:'const', v:BOOL(false), line:t.line }; }
      if(UNSUPPORTED[t.v]) perr('SyntaxError','«'+t.v+'» no está soportado en este mini-motor del curso', t.line);
      perr('SyntaxError','«'+t.v+'» no puede usarse aquí', t.line);
    }
    if(t.k==='op'){
      if(t.v==='('){
        this.p++;
        if(this.eatOp(')')) return { k:'tuple', items:[], line:t.line };
        var first=this.parseExpr();
        if(this.isOp(',')){
          var items=[first];
          while(this.eatOp(',')){
            if(this.isOp(')')) break;
            items.push(this.parseExpr());
          }
          this.expectOp(')');
          return { k:'tuple', items:items, line:t.line };
        }
        this.expectOp(')');
        return { k:'group', e:first, line:t.line };
      }
      if(t.v==='['){
        this.p++;
        var its=[];
        while(!this.isOp(']')){
          its.push(this.parseExpr());
          if(!this.eatOp(',')) break;
        }
        this.expectOp(']');
        return { k:'list', items:its, line:t.line };
      }
      if(t.v==='{'){
        this.p++;
        var pairs=[];
        while(!this.isOp('}')){
          var key=this.parseExpr();
          if(!this.eatOp(':')) perr('SyntaxError','En un diccionario cada clave va seguida de «:» y su valor (los sets {1,2} no están soportados)', t.line);
          var val=this.parseExpr();
          pairs.push({ key:key, val:val });
          if(!this.eatOp(',')) break;
        }
        this.expectOp('}');
        return { k:'dict', pairs:pairs, line:t.line };
      }
    }
    perr('SyntaxError', 'No se esperaba «'+(t.k==='eof'?'fin':String(t.v))+'» aquí', t.line);
  }
};
function parseSubExpr(txt, line){
  var toks = lex(txt);
  var p = new Parser(toks);
  var e = p.parseExpr();
  p.skipNl();
  while(p.peek().k==='dedent') p.p++;
  if(p.peek().k!=='eof') perr('SyntaxError','Expresión no válida dentro de la f-string: «'+txt+'»', line);
  return e;
}

/* =================== intérprete =================== */
function Env(par){ this.v = new Map(); this.par = par || null; }
Env.prototype.get = function(n){
  var e = this;
  while(e){ if(e.v.has(n)) return e.v.get(n); e = e.par; }
  return undefined;
};
Env.prototype.set = function(n, v){ this.v.set(n, v); };

var G=null, OUT='', STDIN=[], STEPS=0, LIMIT=1500000, DEPTH=0;

function step(line){ if(++STEPS > LIMIT) perr('TimeoutError', 'Tu programa tardó demasiado: probablemente hay un ciclo infinito (revisa la condición de salida del while)', line||0); }
function out(s){ OUT += s; if(OUT.length > 400000) perr('TimeoutError','El programa imprimió demasiado texto (¿print dentro de un ciclo infinito?)', 0); }

function truthy(v){
  if(v===PY_NONE) return false;
  if(v.t==='bool') return v.v;
  if(isNum(v)) return numVal(v)!==0;
  if(typeof v==='string') return v.length>0;
  if(v.t==='list'||v.t==='tuple') return v.a.length>0;
  if(v.t==='dict') return v.m.size>0;
  if(v.t==='range') return rangeLen(v)>0;
  return true;
}
function rangeLen(r){
  if(r.c>0) return Math.max(0, Math.ceil((r.b-r.a)/r.c));
  return Math.max(0, Math.ceil((r.a-r.b)/(-r.c)));
}
function BreakSig(){}
function ContinueSig(){}
function ReturnSig(v){ this.v=v; }

function execStmts(stmts, env){
  for(var i=0;i<stmts.length;i++) execStmt(stmts[i], env);
}
function execStmt(st, env){
  step(st.line);
  switch(st.k){
    case 'expr': evalE(st.e, env); return;
    case 'assign': doAssign(st.target, evalE(st.e, env), env, st.line); return;
    case 'aug': {
      var cur = evalE(st.target, env);
      var nv = pyBin(st.op, cur, evalE(st.e, env), st.line);
      doAssign(st.target, nv, env, st.line);
      return;
    }
    case 'if': {
      for(var i=0;i<st.clauses.length;i++){
        if(truthy(evalE(st.clauses[i].cond, env))){ execStmts(st.clauses[i].blk, env); return; }
      }
      if(st.els) execStmts(st.els, env);
      return;
    }
    case 'while': {
      var brokeW=false;
      for(;;){
        step(st.line);
        if(!truthy(evalE(st.cond, env))) break;
        try{ execStmts(st.blk, env); }
        catch(e){
          if(e instanceof BreakSig){ brokeW=true; break; }
          if(e instanceof ContinueSig) continue;
          throw e;
        }
      }
      if(!brokeW && st.els) execStmts(st.els, env);
      return;
    }
    case 'for': {
      var it = iterableOf(evalE(st.iter, env), st.line);
      var broke=false;
      for(var i2=0;i2<it.length;i2++){
        step(st.line);
        doAssign(st.target, it[i2], env, st.line);
        try{ execStmts(st.blk, env); }
        catch(e){
          if(e instanceof BreakSig){ broke=true; break; }
          if(e instanceof ContinueSig) continue;
          throw e;
        }
      }
      if(!broke && st.els) execStmts(st.els, env);
      return;
    }
    case 'def':
      env.set(st.name, { t:'fn', name:st.name, params:st.params, body:st.blk, env:env });
      return;
    case 'return': throw new ReturnSig(st.e ? evalE(st.e, env) : PY_NONE);
    case 'break': throw new BreakSig();
    case 'continue': throw new ContinueSig();
    case 'pass': return;
    case 'import':
      st.mods.forEach(function(m){
        if(!MODULES[m.mod]) perr('ImportError','El módulo «'+m.mod+'» no está disponible en este curso (hay: '+Object.keys(MODULES).join(', ')+')', st.line);
        env.set(m.alias||m.mod, { t:'module', name:m.mod });
      });
      return;
    case 'fromimport':
      if(!MODULES[st.mod]) perr('ImportError','El módulo «'+st.mod+'» no está disponible en este curso (hay: '+Object.keys(MODULES).join(', ')+')', st.line);
      st.items.forEach(function(it){
        env.set(it.alias||it.name, modAttr(st.mod, it.name, st.line));
      });
      return;
    case 'try': {
      try{
        try{ execStmts(st.blk, env); }
        catch(e){
          if(e && e.pye){
            var h = null;
            for(var hi=0; hi<st.handlers.length; hi++){
              var hd = st.handlers[hi];
              if(!hd.type){ h=hd; break; }
              var names = hd.type.k==='tuple' ? hd.type.items : (hd.type.k==='group' ? [hd.type.e] : [hd.type]);
              var match = names.some(function(nm){
                if(nm.k!=='name') perr('SyntaxError','except espera un nombre de excepción (ValueError, TypeError…)', st.line);
                return nm.n===e.pykind || nm.n==='Exception';
              });
              if(match){ h=hd; break; }
            }
            if(!h) throw e;
            if(h.bind) env.set(h.bind, '⚠️ '+e.pykind+': '+e.pymsg);
            execStmts(h.blk, env);
          } else throw e;
        }
      } finally {
        if(st.fin) execStmts(st.fin, env);
      }
      return;
    }
    default: perr('SyntaxError','Instrucción no soportada: '+st.k, st.line);
  }
}

function doAssign(target, val, env, line){
  if(target.k==='name'){ env.set(target.n, val); return; }
  if(target.k==='index'){
    var obj = evalE(target.obj, env);
    var idx = evalE(target.idx, env);
    setIndex(obj, idx, val, line);
    return;
  }
  if(target.k==='tuple' || target.k==='list'){
    var items = (val && (val.t==='list'||val.t==='tuple')) ? val.a : null;
    if(!items) perr('TypeError','No se puede desempaquetar '+typeName(val)+' (se esperaba una lista o tupla de '+target.items.length+' elementos)', line);
    if(items.length!==target.items.length) perr('ValueError','Se esperaban '+target.items.length+' valores para desempacar y hubo '+items.length, line);
    for(var i=0;i<items.length;i++) doAssign(target.items[i], items[i], env, line);
    return;
  }
  perr('SyntaxError','No se puede asignar a esa expresión', line);
}

function evalE(e, env){
  step(e.line);
  switch(e.k){
    case 'const': return e.v;
    case 'group': return evalE(e.e, env);
    case 'name': {
      var v = env.get(e.n);
      if(v===undefined) perr('NameError', 'El nombre «'+e.n+'» no está definido. ¿Se escribió bien? ¿Se definió antes de usarlo?', e.line);
      return v;
    }
    case 'fstr': {
      var s='';
      for(var i=0;i<e.parts.length;i++){
        var p = e.parts[i];
        if(p.s!==undefined){ s+=p.s; continue; }
        s += fmtSpec(evalE(p.e, env), p.spec, e.line);
      }
      return s;
    }
    case 'or': { var a = evalE(e.a, env); return truthy(a) ? a : evalE(e.b, env); }
    case 'and': { var a2 = evalE(e.a, env); return truthy(a2) ? evalE(e.b, env) : a2; }
    case 'not': return BOOL(!truthy(evalE(e.a, env)));
    case 'cmp': {
      var left = evalE(e.first, env);
      for(var c=0;c<e.pairs.length;c++){
        var pr = e.pairs[c];
        var right = evalE(pr.e, env);
        if(!cmpOne(pr.op, left, right, pr.line)) return BOOL(false);
        left = right;
      }
      return BOOL(true);
    }
    case 'bin': return pyBin(e.op, evalE(e.a, env), evalE(e.b, env), e.line);
    case 'neg': {
      var x = evalE(e.a, env);
      if(!isNum(x)) perr('TypeError','Se esperaba un número después de «-» y hubo '+typeName(x), e.line);
      return isInt_(x) ? INT(-numVal(x)) : FLT(-numVal(x));
    }
    case 'tuple': return { t:'tuple', a:e.items.map(function(x){ return evalE(x, env); }) };
    case 'list': return { t:'list', a:e.items.map(function(x){ return evalE(x, env); }) };
    case 'dict': {
      var d = { t:'dict', m:new Map() };
      e.pairs.forEach(function(p2){ dSet(d, evalE(p2.key, env), evalE(p2.val, env)); });
      return d;
    }
    case 'index': return getIndex(evalE(e.obj, env), evalE(e.idx, env), e.line);
    case 'slice': return pySlice(evalE(e.obj, env), e, env, e.line);
    case 'attr': return attrGet(evalE(e.obj, env), e.name, e.line);
    case 'call': return callValue(evalE(e.fn, env), e, env);
    default: perr('SyntaxError','Expresión no soportada', e.line);
  }
}

function cmpOne(op, a, b, line){
  switch(op){
    case '==': return pyEq(a, b);
    case '!=': return !pyEq(a, b);
    case 'is': return pyEq(a, b);
    case 'isnot': return !pyEq(a, b);
    case 'in': return pyContains(b, a, line);
    case 'notin': return !pyContains(b, a, line);
  }
  if(isNum(a) && isNum(b)){ var x=numVal(a), y=numVal(b); switch(op){ case '<': return x<y; case '>': return x>y; case '<=': return x<=y; case '>=': return x>=y; } }
  if(typeof a==='string' && typeof b==='string'){ switch(op){ case '<': return a<b; case '>': return a>b; case '<=': return a<=b; case '>=': return a>=b; } }
  perr('TypeError','No se puede comparar '+typeName(a)+' con '+typeName(b)+' usando «'+op+'»', line);
}
function pyContains(container, item, line){
  if(typeof container==='string'){
    if(typeof item!=='string') perr('TypeError','Para buscar en texto se necesita otro texto', line);
    return container.indexOf(item)>=0;
  }
  if(container && container.t==='list') return container.a.some(function(x){ return pyEq(x, item); });
  if(container && container.t==='tuple') return container.a.some(function(x){ return pyEq(x, item); });
  if(container && container.t==='dict') return dHas(container, item);
  if(container && container.t==='range'){ var L=rangeLen(container); for(var i=0;i<L;i++){ if(pyEq(INT(container.a+i*container.c), item)) return true; } return false; }
  perr('TypeError','«in» no funciona con '+typeName(container), line);
}

function pyBin(op, a, b, line){
  if(op==='+'){
    if(typeof a==='string' || typeof b==='string'){
      if(typeof a!=='string' || typeof b!=='string') perr('TypeError','No se puede sumar '+typeName(a)+' con '+typeName(b)+': usa str() o una f-string para convertir', line);
      return a+b;
    }
    if(a&&b&&a.t==='list'&&b.t==='list') return { t:'list', a:a.a.concat(b.a) };
    if(a&&b&&a.t==='tuple'&&b.t==='tuple') return { t:'tuple', a:a.a.concat(b.a) };
    if(isNum(a)&&isNum(b)){ var s=numVal(a)+numVal(b); return isInt_(a)&&isInt_(b) ? INT(s) : FLT(s); }
  }
  if(op==='*'){
    if(isNum(a)&&typeof b==='string'){ if(!isInt_(a)) perr('TypeError','El texto se repite con un entero, no con un float', line); var n1=Math.max(0,numVal(a)); return b.repeat(n1); }
    if(typeof a==='string'&&isNum(b)){ if(!isInt_(b)) perr('TypeError','El texto se repite con un entero, no con un float', line); var n2=Math.max(0,numVal(b)); return a.repeat(n2); }
    if(a&&b&&a.t==='list'&&isNum(b)&&isInt_(b)){ var rep=[]; for(var i=0;i<Math.max(0,numVal(b));i++) rep=rep.concat(a.a); return { t:'list', a:rep }; }
    if(isNum(a)&&isNum(b)){ var m=numVal(a)*numVal(b); return isInt_(a)&&isInt_(b) ? INT(m) : FLT(m); }
  }
  if(isNum(a)&&isNum(b)){
    var x=numVal(a), y=numVal(b), r, fl=isInt_(a)&&isInt_(b);
    switch(op){
      case '-': r=x-y; return fl ? INT(r) : FLT(r);
      case '/':
        if(y===0) perr('ZeroDivisionError','División entre cero', line);
        return FLT(x/y);
      case '//':
        if(y===0) perr('ZeroDivisionError','División entre cero', line);
        return INT(Math.floor(x/y));
      case '%':
        if(y===0) perr('ZeroDivisionError','Módulo entre cero', line);
        r = x - y*Math.floor(x/y);
        return fl ? INT(r) : FLT(r);
      case '**':
        if(fl && y>=0){ r=Math.pow(x,y); return INT(Math.round(r)); }
        return FLT(Math.pow(x,y));
    }
  }
  if(op==='%') perr('TypeError','«%» con '+typeName(a)+' no está soportado: usa f-strings para dar formato', line);
  perr('TypeError','El operador «'+op+'» no funciona entre '+typeName(a)+' y '+typeName(b), line);
}

function needIntIdx(v, line){
  if(!isNum(v) || !isInt_(v)) perr('TypeError','El índice debe ser un número entero y hubo '+typeName(v), line);
  return numVal(v);
}
function getIndex(obj, idx, line){
  if(typeof obj==='string' || (obj && (obj.t==='list'||obj.t==='tuple'))){
    var arr = typeof obj==='string' ? obj : obj.a;
    var i = needIntIdx(idx, line);
    if(i<0) i += arr.length;
    if(i<0 || i>=arr.length) perr('IndexError','El índice '+numVal(idx)+' está fuera de rango: la '+(typeof obj==='string'?'cadena':obj.t)+' tiene '+arr.length+' elemento'+(arr.length===1?'':'s'), line);
    return typeof obj==='string' ? obj[i] : obj.a[i];
  }
  if(obj && obj.t==='dict'){
    if(dHas(obj, idx)) return dGet(obj, idx);
    perr('KeyError','La clave '+pyRepr(idx)+' no existe en el diccionario (usa .get() si no quieres error)', line);
  }
  perr('TypeError','No se puede indexar '+typeName(obj), line);
}
function setIndex(obj, idx, val, line){
  if(obj && obj.t==='list'){
    var i = needIntIdx(idx, line);
    if(i<0) i += obj.a.length;
    if(i<0 || i>=obj.a.length) perr('IndexError','El índice '+numVal(idx)+' está fuera de rango: la lista tiene '+obj.a.length+' elemento'+(obj.a.length===1?'':'s'), line);
    obj.a[i]=val; return;
  }
  if(obj && obj.t==='dict'){ dSet(obj, idx, val); return; }
  if(typeof obj==='string') perr('TypeError','Las cadenas son inmutables: no se pueden modificar. Construye una nueva (con slicing o .replace())', line);
  perr('TypeError','No se puede asignar por índice en '+typeName(obj), line);
}
function pySlice(obj, e, env, line){
  var arr = typeof obj==='string' ? obj : (obj && (obj.t==='list'||obj.t==='tuple') ? obj.a : null);
  if(arr===null) perr('TypeError','El slicing funciona con listas, tuplas y cadenas (no con '+typeName(obj)+')', line);
  var n = arr.length;
  var start = e.start ? needIntIdx(evalE(e.start, env), line) : null;
  var end = e.end ? needIntIdx(evalE(e.end, env), line) : null;
  var stp = e.step ? needIntIdx(evalE(e.step, env), line) : 1;
  if(stp===0) perr('ValueError','El paso del slicing no puede ser cero', line);
  function clamp(v, lo, hi){ return Math.min(hi, Math.max(lo, v)); }
  var res=[];
  if(stp>0){
    var s = start===null ? 0 : (start<0 ? clamp(start+n,0,n) : clamp(start,0,n));
    var en = end===null ? n : (end<0 ? clamp(end+n,0,n) : clamp(end,0,n));
    for(var i=s; i<en; i+=stp) res.push(arr[i]);
  } else {
    var s2 = start===null ? n-1 : (start<0 ? clamp(start+n,-1,n-1) : clamp(start,-1,n-1));
    var en2 = end===null ? -1 : (end<0 ? clamp(end+n,-1,n-1) : clamp(end,-1,n-1));
    for(var j=s2; j>en2; j+=stp) res.push(arr[j]);
  }
  if(typeof obj==='string') return res.join('');
  return obj.t==='tuple' ? { t:'tuple', a:res } : { t:'list', a:res };
}

/* ---- módulos ---- */
var MODULES = { 'math':1, 'random':1 };
var RNG_STATE = 987654321;
function rnd(){
  RNG_STATE |= 0; RNG_STATE = (RNG_STATE + 0x6D2B79F5) | 0;
  var t = Math.imul(RNG_STATE ^ (RNG_STATE >>> 15), 1 | RNG_STATE);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
function modAttr(mod, name, line){
  if(mod==='math'){
    switch(name){
      case 'pi': return FLT(Math.PI);
      case 'e': return FLT(Math.E);
      case 'tau': return FLT(Math.PI*2);
      case 'inf': return FLT(Infinity);
      case 'sqrt': return builtin('math.sqrt', function(args, kw, ln){ var x=oneNum(args,'sqrt',ln); if(x<0) perr('ValueError','math.sqrt() de un número negativo', ln); return FLT(Math.sqrt(x)); });
      case 'floor': return builtin('math.floor', function(args, kw, ln){ return INT(Math.floor(oneNum(args,'floor',ln))); });
      case 'ceil': return builtin('math.ceil', function(args, kw, ln){ return INT(Math.ceil(oneNum(args,'ceil',ln))); });
      case 'fabs': return builtin('math.fabs', function(args, kw, ln){ return FLT(Math.abs(oneNum(args,'fabs',ln))); });
      case 'factorial': return builtin('math.factorial', function(args, kw, ln){
        var x=oneNum(args,'factorial',ln);
        if(x<0 || Math.floor(x)!==x) perr('ValueError','math.factorial() necesita un entero ≥ 0', ln);
        var r=1; for(var i=2;i<=x;i++) r*=i; return INT(r);
      });
      case 'pow': return builtin('math.pow', function(args, kw, ln){ twoNums(args,'pow',ln); return FLT(Math.pow(numVal(args[0]), numVal(args[1]))); });
    }
    perr('AttributeError','El módulo math no tiene «'+name+'» (hay: pi, e, tau, sqrt, floor, ceil, fabs, factorial, pow)', line);
  }
  if(mod==='random'){
    switch(name){
      case 'seed': return builtin('random.seed', function(args, kw, ln){ RNG_STATE = (args.length && isNum(args[0]) ? Math.floor(numVal(args[0])) : 987654321) | 0; return PY_NONE; });
      case 'random': return builtin('random.random', function(args, kw, ln){ return FLT(rnd()); });
      case 'randint': return builtin('random.randint', function(args, kw, ln){
        twoNums(args, 'randint', ln);
        var a=Math.floor(numVal(args[0])), b=Math.floor(numVal(args[1]));
        if(b<a) perr('ValueError','random.randint(a, b) necesita que a ≤ b', ln);
        return INT(a + Math.floor(rnd()*(b-a+1)));
      });
      case 'randrange': return builtin('random.randrange', function(args, kw, ln){
        if(!args.length || args.length>3) perr('TypeError','randrange recibe 1, 2 o 3 argumentos', ln);
        args.forEach(function(v){ if(!isInt_(v)) perr('TypeError','randrange necesita enteros', ln); });
        var a=0,b=0,c=1;
        if(args.length===1) b=numVal(args[0]);
        else { a=numVal(args[0]); b=numVal(args[1]); if(args.length===3) c=numVal(args[2]); }
        if(c===0) perr('ValueError','randrange: el paso no puede ser cero', ln);
        var L = c>0 ? Math.ceil((b-a)/c) : Math.ceil((a-b)/(-c));
        if(L<=0) perr('ValueError','randrange: rango vacío', ln);
        return INT(a + Math.floor(rnd()*L)*c);
      });
      case 'choice': return builtin('random.choice', function(args, kw, ln){
        if(args.length!==1) perr('TypeError','choice recibe UNA secuencia', ln);
        var seq = args[0];
        var arr = typeof seq==='string' ? seq : (seq&&(seq.t==='list'||seq.t==='tuple')) ? seq.a : null;
        if(arr===null) perr('TypeError','choice necesita una lista, tupla o cadena', ln);
        if(!arr.length) perr('IndexError','choice de una secuencia vacía', ln);
        return arr[Math.floor(rnd()*arr.length)];
      });
      case 'shuffle': return builtin('random.shuffle', function(args, kw, ln){
        if(args.length!==1 || !args[0] || args[0].t!=='list') perr('TypeError','shuffle necesita UNA lista (la mezcla en su lugar)', ln);
        var a = args[0].a;
        for(var i=a.length-1;i>0;i--){ var j=Math.floor(rnd()*(i+1)); var tmp=a[i]; a[i]=a[j]; a[j]=tmp; }
        return PY_NONE;
      });
    }
    perr('AttributeError','El módulo random no tiene «'+name+'» (hay: seed, random, randint, randrange, choice, shuffle)', line);
  }
  perr('ImportError','Módulo desconocido', line);
}
function builtin(name, fn){ return { t:'builtin', name:name, fn:fn }; }
function oneNum(args, nm, ln){ if(args.length!==1||!isNum(args[0])) perr('TypeError', nm+'() necesita un número', ln); return numVal(args[0]); }
function twoNums(args, nm, ln){ if(args.length!==2||!isNum(args[0])||!isNum(args[1])) perr('TypeError', nm+'() necesita dos números', ln); }

/* ---- métodos de str/list/tuple/dict ---- */
function attrGet(o, name, line){
  if(typeof o==='string'){
    switch(name){
      case 'upper': return bound(name, o, function(s){ return s.toUpperCase(); });
      case 'lower': return bound(name, o, function(s){ return s.toLowerCase(); });
      case 'title': return bound(name, o, function(s){ return pyTitle(s); });
      case 'capitalize': return bound(name, o, function(s){ return s ? s[0].toUpperCase()+s.slice(1).toLowerCase() : s; });
      case 'strip': return bound(name, o, function(s){ return s.trim(); });
      case 'lstrip': return bound(name, o, function(s){ return s.replace(/^\s+/,''); });
      case 'rstrip': return bound(name, o, function(s){ return s.replace(/\s+$/,''); });
      case 'replace': return bound(name, o, function(s, args, kw, ln){
        if(args.length<2||args.length>3||typeof args[0]!=='string'||typeof args[1]!=='string') perr('TypeError','replace(viejo, nuevo) necesita dos textos', ln);
        return strReplace(s, args[0], args[1], args.length===3 ? numVal(args[2]) : -1);
      });
      case 'split': return bound(name, o, function(s, args, kw, ln){
        if(args.length===0) return mkList(s.trim().split(/\s+/).filter(function(x){ return x!==''; }));
        if(typeof args[0]!=='string') perr('TypeError','split() espera un texto como separador', ln);
        if(args[0]==='') perr('ValueError','El separador de split() no puede ser vacío', ln);
        return mkList(s.split(args[0]));
      });
      case 'join': return bound(name, o, function(s, args, kw, ln){
        if(args.length!==1) perr('TypeError','join() necesita UNA lista de textos', ln);
        var it = iterableOf(args[0], ln);
        return it.map(function(x){ if(typeof x!=='string') perr('TypeError','join() une TEXTOS: convierte con str() primero', ln); return x; }).join(s);
      });
      case 'startswith': return bound(name, o, function(s, args, kw, ln){ if(args.length!==1||typeof args[0]!=='string') perr('TypeError','startswith() necesita un texto', ln); return BOOL(args[0].length>0 && s.slice(0, args[0].length)===args[0]); });
      case 'endswith': return bound(name, o, function(s, args, kw, ln){ if(args.length!==1||typeof args[0]!=='string') perr('TypeError','endswith() necesita un texto', ln); return BOOL(args[0].length>0 && s.slice(-args[0].length)===args[0]); });
      case 'find': return bound(name, o, function(s, args, kw, ln){ if(args.length!==1||typeof args[0]!=='string') perr('TypeError','find() necesita un texto', ln); return INT(s.indexOf(args[0])); });
      case 'count': return bound(name, o, function(s, args, kw, ln){
        if(args.length!==1||typeof args[0]!=='string') perr('TypeError','count() necesita un texto', ln);
        if(args[0]==='') return INT(s.length+1);
        var c=0, p=0;
        while((p=s.indexOf(args[0], p))>=0){ c++; p+=args[0].length; }
        return INT(c);
      });
      case 'isdigit': return bound(name, o, function(s){ return BOOL(s.length>0 && /^[0-9]+$/.test(s)); });
      case 'isalpha': return bound(name, o, function(s){ return BOOL(s.length>0 && /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+$/.test(s)); });
      case 'isalnum': return bound(name, o, function(s){ return BOOL(s.length>0 && /^[0-9A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+$/.test(s)); });
      case 'islower': return bound(name, o, function(s){ return BOOL(s.toLowerCase()===s && s.toUpperCase()!==s); });
      case 'isupper': return bound(name, o, function(s){ return BOOL(s.toUpperCase()===s && s.toLowerCase()!==s); });
    }
    perr('AttributeError','«str» no tiene ningún método llamado «'+name+'»', line);
  }
  if(o && o.t==='list'){
    switch(name){
      case 'append': return bound(name, o, function(l, args, kw, ln){ if(args.length!==1) perr('TypeError','append() necesita UN elemento', ln); l.a.push(args[0]); return PY_NONE; });
      case 'insert': return bound(name, o, function(l, args, kw, ln){
        if(args.length!==2||!isInt_(args[0])) perr('TypeError','insert(indice, valor) necesita un entero y un valor', ln);
        var i=numVal(args[0]); if(i<0) i=Math.max(0, l.a.length+i);
        l.a.splice(Math.min(i, l.a.length), 0, args[1]);
        return PY_NONE;
      });
      case 'pop': return bound(name, o, function(l, args, kw, ln){
        if(args.length>1) perr('TypeError','pop() recibe índice opcional', ln);
        if(!l.a.length) perr('IndexError','pop() de una lista vacía', ln);
        var i = args.length ? numVal(args[0]) : l.a.length-1;
        if(i<0) i+=l.a.length;
        if(i<0||i>=l.a.length) perr('IndexError','pop(): índice fuera de rango', ln);
        return l.a.splice(i,1)[0];
      });
      case 'remove': return bound(name, o, function(l, args, kw, ln){
        if(args.length!==1) perr('TypeError','remove() necesita UN valor', ln);
        var idx=l.a.findIndex(function(x){ return pyEq(x, args[0]); });
        if(idx<0) perr('ValueError','remove(): '+pyRepr(args[0])+' no está en la lista', ln);
        l.a.splice(idx,1);
        return PY_NONE;
      });
      case 'index': return bound(name, o, function(l, args, kw, ln){
        if(args.length!==1) perr('TypeError','index() necesita UN valor', ln);
        var idx=l.a.findIndex(function(x){ return pyEq(x, args[0]); });
        if(idx<0) perr('ValueError','index(): '+pyRepr(args[0])+' no está en la lista', ln);
        return INT(idx);
      });
      case 'count': return bound(name, o, function(l, args, kw, ln){ if(args.length!==1) perr('TypeError','count() necesita UN valor', ln); return INT(l.a.filter(function(x){ return pyEq(x, args[0]); }).length); });
      case 'extend': return bound(name, o, function(l, args, kw, ln){ if(args.length!==1) perr('TypeError','extend() necesita UNA secuencia', ln); l.a = l.a.concat(iterableOf(args[0], ln)); return PY_NONE; });
      case 'reverse': return bound(name, o, function(l){ l.a.reverse(); return PY_NONE; });
      case 'sort': return bound(name, o, function(l, args, kw, ln){
        if(args.length) perr('TypeError','sort() no recibe argumentos posicionales (usa reverse=True)', ln);
        var rev = kwFlag(kw, 'reverse', ln);
        l.a.sort(function(x, y){ return sortCmp(x, y, ln); });
        if(rev) l.a.reverse();
        return PY_NONE;
      });
      case 'copy': return bound(name, o, function(l){ return mkList(l.a.slice()); });
      case 'clear': return bound(name, o, function(l){ l.a.length=0; return PY_NONE; });
    }
    perr('AttributeError','«list» no tiene ningún método llamado «'+name+'»', line);
  }
  if(o && o.t==='tuple'){
    switch(name){
      case 'count': return bound(name, o, function(l, args, kw, ln){ if(args.length!==1) perr('TypeError','count() necesita UN valor', ln); return INT(l.a.filter(function(x){ return pyEq(x, args[0]); }).length); });
      case 'index': return bound(name, o, function(l, args, kw, ln){ var idx=l.a.findIndex(function(x){ return pyEq(x, args[0]); }); if(idx<0) perr('ValueError','index(): valor no encontrado', ln); return INT(idx); });
    }
    perr('AttributeError','«tuple» no tiene ningún método llamado «'+name+'»', line);
  }
  if(o && o.t==='dict'){
    switch(name){
      case 'keys': return bound(name, o, function(d){ return mkList(dKeys(d)); });
      case 'values': return bound(name, o, function(d){ return mkList(dVals(d)); });
      case 'items': return bound(name, o, function(d){ return mkList(dItems(d).map(function(p){ return { t:'tuple', a:p }; })); });
      case 'get': return bound(name, o, function(d, args, kw, ln){ if(args.length<1||args.length>2) perr('TypeError','get(clave[, valor_por_omisión])', ln); return dHas(d, args[0]) ? dGet(d, args[0]) : (args.length===2 ? args[1] : PY_NONE); });
      case 'pop': return bound(name, o, function(d, args, kw, ln){
        if(args.length<1||args.length>2) perr('TypeError','pop(clave[, valor_por_omisión])', ln);
        if(dHas(d, args[0])){ var v=dGet(d, args[0]); dDel(d, args[0]); return v; }
        if(args.length===2) return args[1];
        perr('KeyError','pop(): la clave '+pyRepr(args[0])+' no existe', ln);
      });
    }
    perr('AttributeError','«dict» no tiene ningún método llamado «'+name+'»', line);
  }
  if(o && o.t==='module') return modAttr(o.name, name, line);
  perr('AttributeError','«'+typeName(o)+'» no tiene ningún método o atributo llamado «'+name+'»', line);
}
function pyTitle(s){
  var out='', prevNonAlfa=true;
  for(var i=0;i<s.length;i++){
    var ch=s[i];
    var esAlfa=/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]/.test(ch);
    if(esAlfa) out += prevNonAlfa ? ch.toUpperCase() : ch.toLowerCase();
    else out += ch;
    prevNonAlfa = !esAlfa;
  }
  return out;
}
function bound(name, obj, fn){ return { t:'bound', name:name, obj:obj, fn:fn }; }
function kwFlag(kwargs, name, ln){
  for(var i=0;i<kwargs.length;i++) if(kwargs[i].name===name) return truthy(kwargs[i].v);
  return false;
}
function strReplace(s, oldS, newS, cnt){
  if(oldS==='') return newS + s.split('').join(newS);
  if(cnt<0) return s.split(oldS).join(newS);
  var out='', pos=0, c=0;
  while(c<cnt){
    var p = s.indexOf(oldS, pos);
    if(p<0) break;
    out += s.slice(pos, p) + newS;
    pos = p + oldS.length; c++;
  }
  return out + s.slice(pos);
}
function sortCmp(a, b, line){
  if(isNum(a)&&isNum(b)){ var x=numVal(a), y=numVal(b); return x<y?-1:(x>y?1:0); }
  if(typeof a==='string'&&typeof b==='string') return a<b?-1:(a>b?1:0);
  perr('TypeError','No se puede ordenar '+typeName(a)+' junto con '+typeName(b), line);
}
function iterableOf(v, line){
  if(typeof v==='string') return v.split('');
  if(v && v.t==='list') return v.a.slice();
  if(v && v.t==='tuple') return v.a.slice();
  if(v && v.t==='dict') return dKeys(v);
  if(v && v.t==='range'){
    var L = rangeLen(v);
    if(L > 1000000) perr('TimeoutError','range() demasiado grande para este curso', line);
    var out=[]; for(var i=0;i<L;i++) out.push(INT(v.a+i*v.c));
    return out;
  }
  perr('TypeError','«'+typeName(v)+'» no es iterable (se necesita lista, tupla, cadena, diccionario o range)', line);
}

/* ---- builtins ---- */
function initBuiltins(){
  var B = {};
  B['print'] = builtin('print', function(args, kw, ln){
    var sep=' ', end='\n';
    kw.forEach(function(p){
      if(p.name==='sep'){ if(typeof p.v!=='string') perr('TypeError','sep debe ser texto', ln); sep=p.v; }
      else if(p.name==='end'){ if(typeof p.v!=='string') perr('TypeError','end debe ser texto', ln); end=p.v; }
      else perr('TypeError','print() no acepta «'+p.name+'=…»', ln);
    });
    out(args.map(function(a){ return pyStr(a); }).join(sep) + end);
    return PY_NONE;
  });
  B['input'] = builtin('input', function(args, kw, ln){
    if(args.length>1||kw.length) perr('TypeError','input() recibe a lo más un texto de prompt', ln);
    if(args.length===1) out(pyStr(args[0]));
    if(!STDIN.length) perr('EOFError','input(): ya no hay líneas de entrada configuradas para este programa', ln);
    return STDIN.shift();
  });
  B['len'] = builtin('len', function(args, kw, ln){
    if(args.length!==1) perr('TypeError','len() necesita UN argumento', ln);
    var v=args[0];
    if(typeof v==='string') return INT(v.length);
    if(v&&(v.t==='list'||v.t==='tuple')) return INT(v.a.length);
    if(v&&v.t==='dict') return INT(v.m.size);
    if(v&&v.t==='range') return INT(rangeLen(v));
    perr('TypeError','len() no funciona con '+typeName(v), ln);
  });
  B['int'] = builtin('int', function(args, kw, ln){
    if(args.length!==1) perr('TypeError','int() necesita un argumento', ln);
    var v=args[0];
    if(isNum(v)) return INT(Math.trunc(numVal(v)));
    if(typeof v==='string'){
      var t=v.trim();
      if(/^[+-]?[0-9]+$/.test(t)) return INT(parseInt(t,10));
      perr('ValueError','int() no pudo convertir '+pyRepr(v)+' a número entero', ln);
    }
    if(v===PY_NONE) perr('TypeError','int() con None no tiene sentido', ln);
    perr('TypeError','int() no puede convertir '+typeName(v), ln);
  });
  B['float'] = builtin('float', function(args, kw, ln){
    if(args.length!==1) perr('TypeError','float() necesita un argumento', ln);
    var v=args[0];
    if(isNum(v)) return FLT(numVal(v));
    if(typeof v==='string'){
      var t=v.trim();
      if(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)([eE][+-]?[0-9]+)?$/.test(t)) return FLT(parseFloat(t));
      perr('ValueError','float() no pudo convertir '+pyRepr(v)+' a número decimal', ln);
    }
    perr('TypeError','float() no puede convertir '+typeName(v), ln);
  });
  B['str'] = builtin('str', function(args, kw, ln){ if(args.length!==1) perr('TypeError','str() necesita un argumento', ln); return pyStr(args[0]); });
  B['bool'] = builtin('bool', function(args, kw, ln){ if(args.length!==1) perr('TypeError','bool() necesita un argumento', ln); return BOOL(truthy(args[0])); });
  B['type'] = builtin('type', function(args, kw, ln){ if(args.length!==1) perr('TypeError','type() necesita un argumento', ln); return { t:'type', name:typeName(args[0]) }; });
  B['abs'] = builtin('abs', function(args, kw, ln){ var x=oneNum(args,'abs',ln); return isInt_(args[0]) ? INT(Math.abs(x)) : FLT(Math.abs(x)); });
  B['round'] = builtin('round', function(args, kw, ln){
    if(args.length<1||args.length>2||!isNum(args[0])) perr('TypeError','round(número[, decimales])', ln);
    var x = numVal(args[0]);
    var nd = args.length===2 ? numVal(args[1]) : 0;
    if(!Number.isInteger(nd)) perr('TypeError','round(): los decimales deben ser enteros', ln);
    /* redondeo bancario (half-to-even), como Python 3 */
    var scale = Math.pow(10, nd);
    var y = x*scale;
    var fl = Math.floor(y), diff = y-fl, r;
    if(diff>0.5) r=fl+1;
    else if(diff<0.5) r=fl;
    else r = (fl%2===0) ? fl : fl+1;
    var v = r/scale;
    if(args.length===1) return INT(r);
    return isInt_(args[0]) ? INT(v) : FLT(v);
  });
  B['sum'] = builtin('sum', function(args, kw, ln){
    if(args.length<1||args.length>2) perr('TypeError','sum(secuencia[, inicio])', ln);
    var it = iterableOf(args[0], ln);
    var acc = args.length===2 ? args[1] : INT(0);
    if(!isNum(acc)) perr('TypeError','sum(): el inicio debe ser número', ln);
    for(var i=0;i<it.length;i++){
      if(!isNum(it[i])) perr('TypeError','sum(): encontré '+typeName(it[i])+' donde esperaba números', ln);
      acc = pyBin('+', acc, it[i], ln);
    }
    return acc;
  });
  function minmax(nm, cmpBetter){
    return builtin(nm, function(args, kw, ln){
      var it = args.length===1 ? iterableOf(args[0], ln) : args;
      if(!it.length) perr('ValueError', nm+'() de una secuencia vacía', ln);
      var best = it[0];
      for(var i=1;i<it.length;i++) if(cmpBetter(it[i], best, ln)) best = it[i];
      return best;
    });
  }
  B['min'] = minmax('min', function(x, best, ln){ return sortCmp(x, best, ln)<0; });
  B['max'] = minmax('max', function(x, best, ln){ return sortCmp(x, best, ln)>0; });
  B['sorted'] = builtin('sorted', function(args, kw, ln){
    if(args.length!==1) perr('TypeError','sorted(secuencia[, reverse=True])', ln);
    var it = iterableOf(args[0], ln);
    var rev = kwFlag(kw, 'reverse', ln);
    it.sort(function(a,b){ return sortCmp(a,b,ln); });
    if(rev) it.reverse();
    return mkList(it);
  });
  B['range'] = builtin('range', function(args, kw, ln){
    if(kw.length) perr('TypeError','range() no acepta argumentos con nombre', ln);
    if(args.length<1||args.length>3) perr('TypeError','range() recibe 1, 2 o 3 enteros', ln);
    args.forEach(function(v){ if(!isInt_(v)) perr('TypeError','range() necesita enteros', ln); });
    var a=0,b=0,c=1;
    if(args.length===1) b=numVal(args[0]);
    else { a=numVal(args[0]); b=numVal(args[1]); if(args.length===3) c=numVal(args[2]); }
    if(c===0) perr('ValueError','range(): el paso no puede ser cero', ln);
    return { t:'range', a:a, b:b, c:c };
  });
  B['enumerate'] = builtin('enumerate', function(args, kw, ln){
    if(args.length<1||args.length>2) perr('TypeError','enumerate(secuencia[, inicio])', ln);
    var start = args.length===2 ? numVal(args[1]) : 0;
    var it = iterableOf(args[0], ln);
    return mkList(it.map(function(x, i){ return { t:'tuple', a:[INT(start+i), x] }; }));
  });
  B['zip'] = builtin('zip', function(args, kw, ln){
    if(args.length<2) perr('TypeError','zip() necesita al menos dos secuencias', ln);
    var arrs = args.map(function(a){ return iterableOf(a, ln); });
    var n = Math.min.apply(null, arrs.map(function(a){ return a.length; }));
    var o=[];
    for(var i=0;i<n;i++) o.push({ t:'tuple', a:arrs.map(function(a){ return a[i]; }) });
    return mkList(o);
  });
  B['isinstance'] = builtin('isinstance', function(args, kw, ln){
    if(args.length!==2) perr('TypeError','isinstance(objeto, tipo)', ln);
    var tname = null;
    if(args[1] && args[1].t==='type') tname = args[1].name;
    else if(args[1] && args[1].t==='builtin' && ['int','float','str','bool','list','dict','tuple','range'].indexOf(args[1].name)>=0) tname = args[1].name;
    if(!tname) perr('TypeError','isinstance() espera un tipo: isinstance(x, int), isinstance(x, str)…', ln);
    if(tname==='NoneType') return BOOL(args[0]===PY_NONE);
    var real = typeName(args[0]);
    if(tname==='int' && real==='bool') return BOOL(true);
    return BOOL(real===tname);
  });
  B['repr'] = builtin('repr', function(args, kw, ln){ if(args.length!==1) perr('TypeError','repr() necesita un argumento', ln); return pyRepr(args[0]); });
  return B;
}
var BUILTINS = null;

function fmtSpec(val, spec, line){
  var s = pyStr(val);
  if(spec===null || spec===undefined || spec==='') return s;
  var m = /^([\^<>])?(\d+)?(?:\.(\d+))?(f|d|s)?$/.exec(spec);
  if(m){
    var kind = m[4];
    if(kind==='f'){
      if(!isNum(val)) perr('TypeError','El formato :'+spec+' necesita un número y hubo '+typeName(val), line);
      s = numVal(val).toFixed(m[3] ? parseInt(m[3],10) : 0);
    } else if(kind==='d'){
      if(!isInt_(val)) perr('TypeError','El formato :d necesita un entero', line);
      s = String(numVal(val));
    }
    var w = m[2] ? parseInt(m[2],10) : 0;
    if(w && s.length < w){
      var pad = ' '.repeat(w - s.length);
      var al = m[1] || '<';
      if(al==='>') s = pad + s;
      else if(al==='^'){ var lft = Math.floor((w - s.length)/2); s = ' '.repeat(lft) + s + ' '.repeat(w - s.length - lft); }
      else s = s + pad;
    }
    return s;
  }
  perr('ValueError','Formato de f-string no soportado en el curso: «:'+spec+'» (usa :.Nf y anchos como :>8)', line);
}

function callValue(fn, e, env){
  var args = e.args.map(function(a){ return evalE(a, env); });
  var kwargs = e.kwargs.map(function(p){ return { name:p.name, v:evalE(p.e, env) }; });
  var line = e.line;
  if(fn && fn.t==='builtin') return fn.fn(args, kwargs, line);
  if(fn && fn.t==='bound') return fn.fn(fn.obj, args, kwargs, line);
  if(fn && fn.t==='fn'){
    var env2 = new Env(fn.env);
    var names = fn.params.map(function(p){ return p.name; });
    var given = args.slice();
    kwargs.forEach(function(k){
      var ix = names.indexOf(k.name);
      if(ix<0) perr('TypeError', fn.name+'() no acepta un argumento llamado «'+k.name+'»', line);
      if(ix < args.length || given[ix] !== undefined) perr('TypeError', fn.name+'() recibió dos veces «'+k.name+'»', line);
      given[ix] = k.v;
    });
    if(given.length > fn.params.length) perr('TypeError', fn.name+'() recibió '+(given.length-fn.params.length)+' argumento(s) de más', line);
    for(var i=0;i<fn.params.length;i++){
      var pm = fn.params[i];
      if(given[i]===undefined){
        if(pm.def!==null && pm.def!==undefined) given[i] = evalE(pm.def, env2);
        else perr('TypeError', fn.name+'() falta el argumento «'+pm.name+'»', line);
      }
    }
    fn.params.forEach(function(pm, ix2){ env2.set(pm.name, given[ix2]); });
    if(++DEPTH > 400){ DEPTH--; perr('RecursionError','Profundidad máxima de recursión alcanzada: ¿olvidaste el caso base?', line); }
    try{ execStmts(fn.body, env2); }
    catch(ex){ DEPTH--; if(ex instanceof ReturnSig) return ex.v; throw ex; }
    DEPTH--;
    return PY_NONE;
  }
  perr('TypeError', typeName(fn)+' no es una función: no se puede llamar con ()', line);
}

/* =================== API =================== */
function run(src, opts){
  opts = opts || {};
  OUT=''; STDIN=(opts.stdin||[]).slice(); STEPS=0; LIMIT=opts.maxSteps||1500000; DEPTH=0; RNG_STATE=987654321;
  BUILTINS = BUILTINS || initBuiltins();
  G = new Env(null);
  Object.keys(BUILTINS).forEach(function(k){ G.set(k, BUILTINS[k]); });
  try{
    var toks = lex(src);
    var prog = new Parser(toks).parseProgram();
    execStmts(prog, G);
    var vars={};
    (opts.wantVars||[]).forEach(function(n){ vars[n] = toJs(G.get(n)); });
    return { ok:true, output:OUT, vars:vars };
  }catch(e){
    if(e && e.pye){
      var msg = e.pyline ? ('⚠️ Línea '+e.pyline+' · '+e.pykind+': '+e.pymsg) : ('⚠️ '+e.pykind+': '+e.pymsg);
      return { ok:false, error:msg, output:OUT };
    }
    return { ok:false, error:'⚠️ Error interno del motor Python: '+(e && e.message ? e.message : String(e))+' (repórtalo al curso)', output:OUT };
  }
}
function toJs(v){
  if(v===undefined) return undefined;
  if(v===PY_NONE) return null;
  if(isNum(v)) return numVal(v);
  if(typeof v==='string') return v;
  if(v.t==='bool') return v.v;
  if(v.t==='list'||v.t==='tuple') return v.a.map(toJs);
  if(v.t==='dict'){ var o={}; dItems(v).forEach(function(p){ o[pyStr(p[0])]=toJs(p[1]); }); return o; }
  return pyStr(v);
}
function gradeOutput(expected, got, opts){
  opts = opts || {};
  function normLines(x){
    var arr = Array.isArray(x) ? x : String(x).split('\n');
    arr = arr.map(function(l){ return String(l).replace(/\r/g,'').replace(/\s+$/,''); });
    while(arr.length && arr[arr.length-1]==='') arr.pop();
    if(opts.trim) arr = arr.map(function(l){ return l.trim(); });
    return arr;
  }
  var e = normLines(expected), g = normLines(got);
  if(e.length !== g.length) return { ok:false, why:'Tu programa imprimió '+g.length+' línea'+(g.length===1?'':'s')+' y se esperaban '+e.length+'.' };
  for(var i=0;i<e.length;i++){
    if(e[i] !== g[i]) return { ok:false, why:'La línea '+(i+1)+' debía ser «'+e[i]+'» y se imprimió «'+(g[i]===''?'(nada)':g[i])+'».' };
  }
  return { ok:true };
}

return { run:run, gradeOutput:gradeOutput, pyStr:pyStr };
})();
if(typeof module!=='undefined') module.exports = PYE;
