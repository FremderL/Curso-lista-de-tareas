/* ============================================================
   SQLE — mini-motor SQL para el curso "Bases de datos SQL"
   Parser + ejecutor en JavaScript puro. Soporta:
   SELECT [DISTINCT] cols FROM t [alias] [JOIN|LEFT JOIN t ON..]
     [WHERE..] [GROUP BY..] [HAVING..] [ORDER BY..] [LIMIT n [OFFSET m]]
   Subconsultas (escalar, IN, EXISTS, FROM derivada), UNION [ALL],
   INSERT/UPDATE/DELETE, CREATE TABLE/VIEW, BEGIN/COMMIT/ROLLBACK,
   funciones de texto/número/agregados, CASE, LIKE, IN, BETWEEN,
   ROW_NUMBER() OVER (PARTITION BY.. ORDER BY..) y RANK().
   Errores SIEMPRE en español.
   ============================================================ */
var SQLE = (function(){

/* ---------- utilidades ---------- */
function norm(s){ return String(s||'').toLowerCase().replace(/\s+/g,' ').trim(); }
function isNum(v){ return typeof v === 'number' && isFinite(v); }
function toNum(v){ if(typeof v==='number') return v; if(typeof v==='string' && v.trim()!=='' && !isNaN(Number(v))) return Number(v); return null; }
function isNull(v){ return v===null || v===undefined; }
function disp(v){ if(isNull(v)) return 'NULL'; if(typeof v==='number') return (Math.round(v*100)/100).toString(); return String(v); }
function typeName(v){ return isNull(v)?'NULL':(typeof v==='number'?'number':'text'); }
function valuesEq(a,b){
  if(isNull(a)&&isNull(b)) return true;
  if(isNull(a)||isNull(b)) return false;
  if(typeof a==='number'&&typeof b==='number') return a===b;
  const na=toNum(a), nb=toNum(b);
  if(na!==null&&nb!==null&&typeof a!=='boolean'&&typeof b!=='boolean') return na===nb;
  return String(a)===String(b);
}
function cmpVals(a,b){
  if(isNull(a)&&isNull(b)) return 0;
  if(isNull(a)) return -1;
  if(isNull(b)) return 1;
  const na=toNum(a), nb=toNum(b);
  if(na!==null&&nb!==null) return na<nb?-1:(na>nb?1:0);
  const sa=String(a), sb=String(b);
  return sa<sb?-1:(sa>sb?1:0);
}
function fmtErr(msg){ return new Error('⚠️ ' + msg); }

/* ---------- tokenizador ---------- */
const KEYWORDS = new Set(['select','from','where','group','by','having','order','limit','offset',
  'as','distinct','and','or','not','in','is','null','like','between','join','inner','left','right',
  'outer','on','union','all','insert','into','values','update','set','delete','create','table','view',
  'primary','key','foreign','references','unique','default','check','autoincrement','begin','commit',
  'rollback','transaction','case','when','then','else','end','asc','desc','over','partition','exists',
  'true','false','cast','integer','int','text','varchar','char','real','float','double','numeric','blob']);
function tokenize(sql){
  const toks=[]; let i=0;
  const isD=c=>/[A-Za-zÁÉÍÓÚÑáéíóúñ_]/.test(c), isDg=c=>/[0-9]/.test(c);
  while(i<sql.length){
    const c=sql[i];
    if(/\s/.test(c)){ i++; continue; }
    if(c==='-'&&sql[i+1]==='-'){ while(i<sql.length&&sql[i]!=='\n')i++; continue; }
    if(c==='/'&&sql[i+1]==='*'){ i+=2; while(i<sql.length&&!(sql[i]==='*'&&sql[i+1]==='/'))i++; i+=2; continue; }
    if(c==="'"){ let j=i+1, s=''; while(j<sql.length){ if(sql[j]==="'"&&sql[j+1]==="'"){ s+="'"; j+=2; } else if(sql[j]==="'"){ break; } else { s+=sql[j]; j++; } } if(j>=sql.length) throw fmtErr('Falta la comilla de cierre en el texto: '+s.slice(0,20)+'…'); toks.push({t:'str',v:s}); i=j+1; continue; }
    if(isDg(c)||(c==='.'&&isDg(sql[i+1]))){ let j=i; while(j<sql.length&&/[0-9.]/.test(sql[j]))j++; const num=parseFloat(sql.slice(i,j)); if(isNaN(num)) throw fmtErr('Número inválido: '+sql.slice(i,j)); toks.push({t:'num',v:num}); i=j; continue; }
    if(isD(c)){ let j=i; while(j<sql.length&&(isD(sql[j])||isDg(sql[j])))j++; const w=sql.slice(i,j); toks.push({t:KEYWORDS.has(w.toLowerCase())?'kw':'id',v:w}); i=j; continue; }
    const two=sql.substr(i,2);
    if(['<>','<=','>=','!=','||'].includes(two)){ toks.push({t:'op',v:two==='!='?'<>':two}); i+=2; continue; }
    if('=<>+-*/%(),.;'.includes(c)){ toks.push({t:'op',v:c}); i++; continue; }
    throw fmtErr('Carácter no válido: "'+c+'"');
  }
  return toks;
}

/* ---------- parser (descenso recursivo) ---------- */
function Parser(toks){ this.t=toks; this.p=0; }
Parser.prototype={
  peek(){ return this.t[this.p]; },
  next(){ return this.t[this.p++]; },
  isKw(w){ const k=this.peek(); return k&&k.t==='kw'&&k.v.toLowerCase()===w; },
  eatKw(w){ if(this.isKw(w)){ this.p++; return true; } return false; },
  expectKw(w){ if(!this.eatKw(w)) throw fmtErr('Se esperaba '+w.toUpperCase()+' cerca de «'+(this.peek()?this.peek().v:'fin')+'»'); },
  isOp(v){ const k=this.peek(); return k&&k.t==='op'&&k.v===v; },
  eatOp(v){ if(this.isOp(v)){ this.p++; return true; } return false; },
  expectOp(v){ if(!this.eatOp(v)) throw fmtErr('Se esperaba «'+v+'» cerca de «'+(this.peek()?this.peek().v:'fin')+'»'); },
  ident(){ const k=this.peek(); if(k&&k.t==='id'){ this.p++; return k.v; } if(k&&k.t==='kw'){ this.p++; return k.v; } throw fmtErr('Se esperaba un nombre cerca de «'+(k?k.v:'fin')+'»'); },

  parseStatements(){
    const sts=[];
    while(this.p<this.t.length){ if(this.eatOp(';'))continue; sts.push(this.parseStatement()); if(!this.eatOp(';')) break; }
    return sts;
  },
  parseStatement(){
    if(this.isKw('select')) return this.parseSelect();
    if(this.isKw('insert')) return this.parseInsert();
    if(this.isKw('update')) return this.parseUpdate();
    if(this.isKw('delete')) return this.parseDelete();
    if(this.isKw('create')) return this.parseCreate();
    if(this.isKw('begin'))  { this.p++; this.eatKw('transaction'); return {type:'begin'}; }
    if(this.isKw('commit')) { this.p++; return {type:'commit'}; }
    if(this.isKw('rollback')){ this.p++; return {type:'rollback'}; }
    throw fmtErr('Comando no reconocido: «'+(this.peek()?this.peek().v:'')+'». Empieza con SELECT, INSERT, UPDATE, DELETE o CREATE.');
  },
  parseSelect(){
    this.expectKw('select');
    const q={type:'select', distinct:false, cols:[], from:null, joins:[], where:null, groupBy:[], having:null, orderBy:[], limit:null, offset:null, unions:[]};
    if(this.eatKw('distinct')) q.distinct=true;
    do{
      if(this.isOp('*')){ this.p++; q.cols.push({expr:{f:'star'}, alias:null}); }
      else{
        const e=this.parseExpr();
        let alias=null;
        if(this.eatKw('as')) alias=this.ident();
        else if(this.peek()&&this.peek().t==='id') alias=this.ident();
        q.cols.push({expr:e, alias:alias});
      }
    } while(this.eatOp(','));
    if(this.eatKw('from')) q.from=this.parseTableRef();
    while(this.isKw('join')||this.isKw('inner')||this.isKw('left')||this.isKw('right')){
      let kind='inner';
      if(this.eatKw('inner')) kind='inner';
      else if(this.eatKw('left')){ this.eatKw('outer'); kind='left'; }
      else if(this.eatKw('right')){ this.eatKw('outer'); kind='right'; }
      this.expectKw('join');
      const t=this.parseTableRef();
      this.expectKw('on');
      const on=this.parseExpr();
      q.joins.push({kind:kind, table:t, on:on});
    }
    if(this.eatKw('where')) q.where=this.parseExpr();
    if(this.eatKw('group')){ this.expectKw('by'); do{ q.groupBy.push(this.parseExpr()); } while(this.eatOp(',')); }
    if(this.eatKw('having')) q.having=this.parseExpr();
    if(this.eatKw('union')){
      const all=this.eatKw('all');
      const rest=this.parseSelect();
      q.unions.push({all:all, select:rest});
    }
    if(this.eatKw('order')){ this.expectKw('by');
      do{ const e=this.parseExpr(); let dir='asc'; if(this.isKw('asc')){this.p++;} else if(this.isKw('desc')){this.p++;dir='desc';} q.orderBy.push({expr:e, dir:dir}); } while(this.eatOp(','));
    }
    if(this.eatKw('limit')){ const a=this.parseExpr(); if(this.eatOp(',')){ q.offset=a; q.limit=this.parseExpr(); } else { q.limit=a; if(this.eatKw('offset')) q.offset=this.parseExpr(); } }
    return q;
  },
  parseTableRef(){
    if(this.isOp('(')){ this.p++; const sub=this.parseSelect(); this.expectOp(')'); let alias=null; if(this.eatKw('as')) alias=this.ident(); else if(this.peek()&&this.peek().t==='id') alias=this.ident(); return {sub:sub, alias:alias||'_sub'}; }
    const name=this.ident();
    let alias=null;
    if(this.eatKw('as')) alias=this.ident();
    else if(this.peek()&&this.peek().t==='id') alias=this.ident();
    return {name:name, alias:alias||name};
  },

  parseExpr(){ return this.parseOr(); },
  parseOr(){ let l=this.parseAnd(); while(this.isKw('or')){ this.p++; l={f:'or',a:l,b:this.parseAnd()}; } return l; },
  parseAnd(){ let l=this.parseNot(); while(this.isKw('and')){ this.p++; l={f:'and',a:l,b:this.parseNot()}; } return l; },
  parseNot(){ if(this.isKw('not')){ this.p++; return {f:'not',a:this.parseNot()}; } return this.parseCmp(); },
  parseCmp(){
    let l=this.parseAdd();
    for(;;){
      if(this.isKw('is')){ this.p++; const neg=this.eatKw('not'); this.expectKw('null'); l={f:neg?'isnotnull':'isnull',a:l}; continue; }
      if(this.isKw('in')){ this.p++; this.expectOp('(');
        if(this.isKw('select')){ const s=this.parseSelect(); this.expectOp(')'); l={f:'in', a:l, sub:s}; }
        else{ const items=[this.parseExpr()]; while(this.eatOp(',')) items.push(this.parseExpr()); this.expectOp(')'); l={f:'in', a:l, list:items}; }
        continue; }
      if(this.isKw('like')){ this.p++; const p=this.parseAdd(); l={f:'like',a:l,b:p}; continue; }
      if(this.isKw('between')){ this.p++; const a=this.parseAdd(); this.expectKw('and'); const b=this.parseAdd(); l={f:'between',a:l,lo:a,hi:b}; continue; }
      if(this.isOp('=')||this.isOp('<>')||this.isOp('<')||this.isOp('>')||this.isOp('<=')||this.isOp('>=')){ const op=this.next().v; l={f:'cmp',op:op,a:l,b:this.parseAdd()}; continue; }
      break;
    }
    return l;
  },
  parseAdd(){ let l=this.parseMul(); for(;;){ if(this.isOp('+')||this.isOp('-')||this.isOp('||')){ const op=this.next().v; l={f:'bin',op:op,a:l,b:this.parseMul()}; } else break; } return l; },
  parseMul(){ let l=this.parseUnary(); for(;;){ if(this.isOp('*')||this.isOp('/')||this.isOp('%')){ const op=this.next().v; l={f:'bin',op:op,a:l,b:this.parseUnary()}; } else break; } return l; },
  parseUnary(){
    if(this.isOp('-')){ this.p++; return {f:'neg',a:this.parseUnary()}; }
    if(this.isKw('not')){ this.p++; return {f:'not',a:this.parseUnary()}; }
    return this.parsePrimary();
  },
  parsePrimary(){
    const k=this.peek();
    if(!k) throw fmtErr('La consulta termina de forma inesperada');
    if(k.t==='num'){ this.p++; return {f:'lit', v:k.v}; }
    if(k.t==='str'){ this.p++; return {f:'lit', v:k.v}; }
    if(k.t==='kw'){
      const w=k.v.toLowerCase();
      if(w==='null'){ this.p++; return {f:'lit', v:null}; }
      if(w==='true'){ this.p++; return {f:'lit', v:1}; }
      if(w==='false'){ this.p++; return {f:'lit', v:0}; }
      if(w==='case'){ return this.parseCase(); }
      if(w==='cast'){ this.p++; this.expectOp('('); const e=this.parseExpr(); this.expectKw('as'); const ty=this.ident(); this.expectOp(')'); return {f:'cast', a:e, ty:ty}; }
      if(w==='exists'){ this.p++; this.expectOp('('); const s=this.parseSelect(); this.expectOp(')'); return {f:'exists', sub:s}; }
      if(w==='select'){ throw fmtErr('Subconsulta inesperada: envuélvela entre paréntesis'); }
    }
    if(this.isOp('(')){ this.p++;
      if(this.isKw('select')){ const s=this.parseSelect(); this.expectOp(')'); return {f:'scalar', sub:s}; }
      const e=this.parseExpr(); this.expectOp(')'); return e;
    }
    if(this.isOp('*')){ this.p++; return {f:'star'}; }
    // función o columna
    if(k.t==='id'||k.t==='kw'){
      const name=k.v; this.p++;
      if(this.isOp('(')){ this.p++;
        const args=[]; let star=false;
        if(this.isOp('*')){ this.p++; star=true; }
        else if(!this.isOp(')')){ do{ args.push(this.parseExpr()); } while(this.eatOp(',')); }
        this.expectOp(')');
        let over=null;
        if(this.eatKw('over')){
          this.expectOp('(');
          over={partition:[], order:[]};
          if(this.eatKw('partition')){ this.expectKw('by'); do{ over.partition.push(this.parseExpr()); } while(this.eatOp(',')); }
          if(this.eatKw('order')){ this.expectKw('by'); do{ const e=this.parseExpr(); let dir='asc'; if(this.isKw('asc'))this.p++; else if(this.isKw('desc')){this.p++;dir='desc';} over.order.push({expr:e,dir:dir}); } while(this.eatOp(',')); }
          this.expectOp(')');
        }
        return {f:'fn', name:name.toLowerCase(), args:args, star:star, over:over};
      }
      if(this.isOp('.')){ this.p++; const col=this.ident(); return {f:'col', table:name, name:col}; }
      return {f:'col', name:name};
    }
    throw fmtErr('Expresión no válida cerca de «'+k.v+'»');
  },
  parseCase(){
    this.expectKw('case');
    const base=this.isKw('when')?null:this.parseExpr();
    const whens=[];
    while(this.eatKw('when')){ const c=this.parseExpr(); this.expectKw('then'); const r=this.parseExpr(); whens.push({cond:c, res:r}); }
    let els=null;
    if(this.eatKw('else')) els=this.parseExpr();
    this.expectKw('end');
    return {f:'case', base:base, whens:whens, els:els};
  },

  parseInsert(){
    this.expectKw('insert'); this.expectKw('into');
    const table=this.ident();
    let cols=null;
    if(this.isOp('(')){ this.p++; cols=[this.ident()]; while(this.eatOp(',')) cols.push(this.ident()); this.expectOp(')'); }
    this.expectKw('values');
    const rows=[];
    do{ this.expectOp('('); const vals=[this.parseExpr()]; while(this.eatOp(',')) vals.push(this.parseExpr()); this.expectOp(')'); rows.push(vals); } while(this.eatOp(','));
    return {type:'insert', table:table, cols:cols, rows:rows};
  },
  parseUpdate(){
    this.expectKw('update');
    const table=this.ident();
    this.expectKw('set');
    const sets=[];
    do{ const col=this.ident(); this.expectOp('='); sets.push({col:col, expr:this.parseExpr()}); } while(this.eatOp(','));
    let where=null; if(this.eatKw('where')) where=this.parseExpr();
    return {type:'update', table:table, sets:sets, where:where};
  },
  parseDelete(){
    this.expectKw('delete'); this.expectKw('from');
    const table=this.ident();
    let where=null; if(this.eatKw('where')) where=this.parseExpr();
    return {type:'delete', table:table, where:where};
  },
  parseCreate(){
    this.expectKw('create');
    if(this.eatKw('view')){ const name=this.ident(); this.expectKw('as'); const q=this.parseSelect(); return {type:'createview', name:name, select:q}; }
    this.expectKw('table');
    const name=this.ident();
    this.expectOp('(');
    const cols=[]; 
    do{
      const cn=this.ident(); const ty=this.ident().toLowerCase();
      const col={name:cn, type:ty, notNull:false, unique:false, pk:false, def:null, check:null, autoinc:false};
      for(;;){
        if(this.eatKw('primary')){ this.expectKw('key'); col.pk=true; if(this.eatKw('autoincrement')) col.autoinc=true; }
        else if(this.eatKw('not')){ this.expectKw('null'); col.notNull=true; }
        else if(this.eatKw('unique')) col.unique=true;
        else if(this.eatKw('default')) col.def=this.parseExpr();
        else if(this.eatKw('check')){ this.expectOp('('); col.check=this.parseExpr(); this.expectOp(')'); }
        else if(this.eatKw('references')){ this.ident(); if(this.eatOp('(')) this.ident(); while(!this.eatOp(')')){ if(this.p>=this.t.length) throw fmtErr('Se esperaba «)» en REFERENCES'); } }
        else break;
      }
      cols.push(col);
    } while(this.eatOp(','));
    this.expectOp(')');
    return {type:'createtable', name:name, cols:cols};
  }
};

/* ---------- evaluación de expresiones ---------- */
const AGGS = new Set(['count','sum','avg','min','max']);
function exprHasAgg(e){
  if(!e||typeof e!=='object') return false;
  if(e.f==='fn'&&AGGS.has(e.name)) return true;
  for(const k of ['a','b','lo','hi']){ if(e[k]&&exprHasAgg(e[k])) return true; }
  if(e.args) for(const x of e.args){ if(exprHasAgg(x)) return true; }
  if(e.whens) for(const w of e.whens){ if(exprHasAgg(w.cond)||exprHasAgg(w.res)) return true; }
  if(e.els&&exprHasAgg(e.els)) return true;
  if(e.list) for(const x of e.list){ if(exprHasAgg(x)) return true; }
  return false;
}
function exprHasWindow(e){
  if(!e||typeof e!=='object') return false;
  if(e.f==='fn'&&e.over) return true;
  for(const k of ['a','b','lo','hi']){ if(e[k]&&exprHasWindow(e[k])) return true; }
  if(e.args) for(const x of e.args){ if(exprHasWindow(x)) return true; }
  return false;
}
function likeToRegex(p){
  let r=''; for(const ch of String(p)){ if(ch==='%') r+='[\\s\\S]*'; else if(ch==='_') r+='.'; else r+=ch.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }
  return new RegExp('^'+r+'$','i');
}
/* ctx: {cat, tables:{alias:{cols,row}}, outer:ctx|null, group:null|{rows:[rowCtx], keyVals:Map}, aliasMap:{name→expr}} */
function evalExpr(e, ctx){
  switch(e.f){
    case 'lit': return e.v;
    case 'star': throw fmtErr('«*» solo puede usarse en COUNT(*) o en la lista de columnas');
    case 'col': return resolveCol(e, ctx);
    case 'neg': { const v=evalExpr(e.a,ctx); return isNull(v)?null:-v; }
    case 'not': { const v=evalExpr(e.a,ctx); return isNull(v)?null:(truthy(v)?0:1); }
    case 'and': { const a=evalExpr(e.a,ctx), b=evalExpr(e.b,ctx); if(!isNull(a)&&!truthy(a)) return 0; if(!isNull(b)&&!truthy(b)) return 0; if(isNull(a)||isNull(b)) return null; return 1; }
    case 'or':  { const a=evalExpr(e.a,ctx), b=evalExpr(e.b,ctx); if(!isNull(a)&&truthy(a)) return 1; if(!isNull(b)&&truthy(b)) return 1; if(isNull(a)||isNull(b)) return null; return 0; }
    case 'cmp': {
      const a=evalExpr(e.a,ctx), b=evalExpr(e.b,ctx);
      if(isNull(a)||isNull(b)) return null;
      const c=cmpVals(a,b);
      switch(e.op){ case '=':return c===0?1:0; case '<>':return c!==0?1:0; case '<':return c<0?1:0; case '>':return c>0?1:0; case '<=':return c<=0?1:0; case '>=':return c>=0?1:0; }
      return null;
    }
    case 'bin': {
      const a=evalExpr(e.a,ctx), b=evalExpr(e.b,ctx);
      if(e.op==='||'){ return isNull(a)||isNull(b)?null:String(a)+String(b); }
      if(isNull(a)||isNull(b)) return null;
      const na=toNum(a), nb=toNum(b);
      if(na===null||nb===null) throw fmtErr('No se puede operar matemáticamente con texto: «'+disp(a)+' '+e.op+' '+disp(b)+'». Usa CAST si necesitas convertir.');
      switch(e.op){ case '+':return na+nb; case '-':return na-nb; case '*':return na*nb; case '/':return nb===0?null:na/nb; case '%':return nb===0?null:na%nb; }
      return null;
    }
    case 'isnull': { const v=evalExpr(e.a,ctx); return isNull(v)?1:0; }
    case 'isnotnull': { const v=evalExpr(e.a,ctx); return isNull(v)?0:1; }
    case 'like': { const a=evalExpr(e.a,ctx), p=evalExpr(e.b,ctx); if(isNull(a)||isNull(p)) return null; return likeToRegex(p).test(String(a))?1:0; }
    case 'between': { const v=evalExpr(e.a,ctx), lo=evalExpr(e.lo,ctx), hi=evalExpr(e.hi,ctx); if(isNull(v)||isNull(lo)||isNull(hi)) return null; return (cmpVals(v,lo)>=0&&cmpVals(v,hi)<=0)?1:0; }
    case 'in': {
      const v=evalExpr(e.a,ctx);
      let items=null;
      if(e.list) items=e.list.map(x=>evalExpr(x,ctx));
      else { const r=runSub(e.sub, ctx); items=r.results[0].rows.map(row=>row[0]); }
      if(isNull(v)) return null;
      let sawNull=false;
      for(const it of items){ if(isNull(it)){ sawNull=true; continue; } if(valuesEq(v,it)) return 1; }
      return sawNull?null:0;
    }
    case 'exists': { const r=runSub(e.sub, ctx); return r.results[0].rows.length>0?1:0; }
    case 'scalar': { const r=runSub(e.sub, ctx); const rows=r.results[0].rows; return rows.length?(rows[0][0]===undefined?null:rows[0][0]):null; }
    case 'case': {
      if(e.base===null||e.base===undefined){
        for(const w of e.whens){ if(truthy(evalExpr(w.cond,ctx))) return evalExpr(w.res,ctx); }
      } else {
        const b=evalExpr(e.base,ctx);
        for(const w of e.whens){ if(valuesEq(b, evalExpr(w.cond,ctx))) return evalExpr(w.res,ctx); }
      }
      return e.els?evalExpr(e.els,ctx):null;
    }
    case 'cast': {
      const v=evalExpr(e.a,ctx); if(isNull(v)) return null;
      const t=e.ty.toLowerCase();
      if(t.startsWith('int')){ const n=toNum(v); return n===null?0:Math.trunc(n); }
      if(t.startsWith('real')||t.startsWith('float')||t.startsWith('double')||t.startsWith('num')||t.startsWith('dec')){ const n=toNum(v); return n===null?0:n; }
      return String(v);
    }
    case 'fn': return evalFn(e, ctx);
  }
  throw fmtErr('Expresión no soportada');
}
function truthy(v){ if(isNull(v)) return false; if(typeof v==='number') return v!==0; const n=toNum(v); return n===null?String(v).toLowerCase()==='true':n!==0; }
function resolveCol(e, ctx){
  const wantT = e.table ? e.table.toLowerCase() : null;
  const wantC = e.name.toLowerCase();
  let c=ctx;
  while(c){
    if(c.tables){
      let found=null, foundSet=false, amb=false;
      for(const alias of Object.keys(c.tables)){
        if(wantT && alias.toLowerCase()!==wantT) continue;
        const tb=c.tables[alias];
        for(let i=0;i<tb.cols.length;i++){
          if(tb.cols[i].toLowerCase()===wantC){
            if(wantT) return tb.row[i];
            if(!foundSet){ found=tb.row[i]; foundSet=true; } else amb=true;
          }
        }
        if(wantT) throw fmtErr('La columna «'+e.name+'» no existe en la tabla «'+alias+'»');
      }
      if(amb) throw fmtErr('La columna «'+e.name+'» existe en varias tablas: califícala (tabla.columna)');
      if(foundSet) return found;
    }
    if(c.aliasMap && c.aliasMap[wantC]!==undefined) return c.aliasMap[wantC];
    if(c.group && c.group.exprVals && c.group.exprVals.has(exprKey({f:'col',name:e.name,table:e.table}))) return c.group.exprVals.get(exprKey({f:'col',name:e.name,table:e.table}));
    c=c.outer;
  }
  throw fmtErr('La columna «'+(e.table?e.table+'.':'')+e.name+'» no existe. Revisa el nombre o el FROM');
}
function exprKey(e){ return JSON.stringify(e, (k,v)=>k==='ctx'?undefined:v); }
function runSub(q, ctx){ return execQuery(q, ctx ? ctx.cat : (ctx&&ctx.cat), ctx); }

function evalFn(e, ctx){
  const n=e.name;
  if(AGGS.has(n)){
    if(!ctx.group) throw fmtErr('La función '+n.toUpperCase()+'() necesita GROUP BY (o úsala en un SELECT de resumen)');
    return aggValue(e, ctx.group);
  }
  if(e.over) throw fmtErr('La función de ventana '+n.toUpperCase()+'() se evalúa automáticamente; no la envuelvas en agregados');
  const a=e.args.map(x=>evalExpr(x,ctx));
  switch(n){
    case 'upper': return isNull(a[0])?null:String(a[0]).toUpperCase();
    case 'lower': return isNull(a[0])?null:String(a[0]).toLowerCase();
    case 'length': return isNull(a[0])?null:String(a[0]).length;
    case 'trim': return isNull(a[0])?null:String(a[0]).trim();
    case 'ltrim': return isNull(a[0])?null:String(a[0]).replace(/^\s+/,'');
    case 'rtrim': return isNull(a[0])?null:String(a[0]).replace(/\s+$/,'');
    case 'replace': return isNull(a[0])||isNull(a[1])||isNull(a[2])?null:String(a[0]).split(String(a[1])).join(String(a[2]));
    case 'substr': case 'substring': {
      if(isNull(a[0])||isNull(a[1])) return null;
      const s=String(a[0]); let st=Math.trunc(toNum(a[1])||1); const len=a[2]===undefined?null:toNum(a[2]);
      if(st<0) st=Math.max(1, s.length+st+1);
      const from=st-1;
      return len===null? s.slice(from) : s.slice(from, from+Math.max(0,Math.trunc(len)));
    }
    case 'round': { if(isNull(a[0])) return null; const d=a[1]===undefined?0:Math.trunc(toNum(a[1])||0); const m=Math.pow(10,d); return Math.round((toNum(a[0])||0)*m)/m; }
    case 'abs': { if(isNull(a[0])) return null; const x=toNum(a[0]); return x===null?null:Math.abs(x); }
    case 'coalesce': { for(const v of a){ if(!isNull(v)) return v; } return null; }
    case 'ifnull': return isNull(a[0])?a[1]:a[0];
    case 'nullif': return (a[0]!==null&&a[1]!==null&&valuesEq(a[0],a[1]))?null:a[0];
    case 'max': return a.reduce((m,v)=>isNull(v)?m:(m===null||cmpVals(v,m)>0?v:m), null);
    case 'min': return a.reduce((m,v)=>isNull(v)?m:(m===null||cmpVals(v,m)<0?v:m), null);
    case 'date': return isNull(a[0])?null:String(a[0]).slice(0,10);
    case 'strftime': {
      if(isNull(a[1])) return null;
      const s=String(a[1]); const f=String(a[0]);
      return f.replace('%Y',s.slice(0,4)).replace('%m',s.slice(5,7)).replace('%d',s.slice(8,10));
    }
    case 'typeof': return typeName(a[0]);
  }
  throw fmtErr('Función no soportada: '+n.toUpperCase()+'(). Consulta la Referencia del curso.');
}
function aggValue(e, group){
  const n=e.name;
  if(n==='count'){
    if(e.star) return group.rows.length;
    if(e.args.length!==1) throw fmtErr('COUNT necesita un argumento o *');
    let c=0; for(const rc of group.rows){ const v=evalExpr(e.args[0], rc); if(!isNull(v)) c++; }
    return c;
  }
  if(e.star||e.args.length!==1) throw fmtErr(n.toUpperCase()+' necesita exactamente un argumento');
  let sum=0, cnt=0, minv=null, maxv=null;
  for(const rc of group.rows){
    const v=evalExpr(e.args[0], rc);
    if(isNull(v)) continue;
    if(n==='sum'||n==='avg'){ const x=toNum(v); if(x===null) throw fmtErr(n.toUpperCase()+' esperaba números y encontró «'+disp(v)+'»'); sum+=x; cnt++; }
    if(n==='min'){ if(minv===null||cmpVals(v,minv)<0) minv=v; }
    if(n==='max'){ if(maxv===null||cmpVals(v,maxv)>0) maxv=v; }
  }
  if(n==='sum') return cnt?sum:null;
  if(n==='avg') return cnt?sum/cnt:null;
  if(n==='min') return minv;
  if(n==='max') return maxv;
  return null;
}

/* ---------- ejecución de consultas ---------- */
function getTable(cat, ref){
  if(ref.sub) return null;
  const key=Object.keys(cat.tables).find(k=>k.toLowerCase()===ref.name.toLowerCase());
  if(!key) throw fmtErr('La tabla «'+ref.name+'» no existe. Tablas disponibles: '+Object.keys(cat.tables).join(', '));
  const t=cat.tables[key];
  return {alias:ref.alias, cols:t.cols.slice(), rows:t.rows};
}
function rowsFromRef(ref, ctx){
  if(ref.sub){
    const r=execQuery(ref.sub, ctx.cat, ctx.outer||ctx);
    return {alias:ref.alias, cols:r.results[0].cols, rows:r.results[0].rows};
  }
  return getTable(ctx.cat, ref);
}
function makeCtx(cat, tables, outer){
  return {cat:cat, tables:tables, outer:outer||null, group:null, aliasMap:null};
}
function execQuery(q, cat, outerCtx){
  // FROM + JOINs → filas combinadas
  let baseRows=[];
  let baseCols=[];
  if(q.from){
    const first=rowsFromRef(q.from, {cat:cat, outer:outerCtx});
    baseCols=[{alias:first.alias, cols:first.cols}];
    for(const r of first.rows) baseRows.push({[first.alias]:{cols:first.cols, row:r}});
    for(const j of q.joins){
      const t2=rowsFromRef(j.table, {cat:cat, outer:outerCtx});
      baseCols.push({alias:t2.alias, cols:t2.cols});
      const out=[];
      for(const lr of baseRows){
        let matched=false;
        for(const rr of t2.rows){
          const combined=Object.assign({}, lr, {[t2.alias]:{cols:t2.cols, row:rr}});
          const ctx=makeCtx(cat, combined, outerCtx);
          if(truthy(evalExpr(j.on, ctx))){ out.push(combined); matched=true; }
        }
        if(!matched && j.kind==='left'){ out.push(Object.assign({}, lr, {[t2.alias]:{cols:t2.cols, row:t2.cols.map(()=>null)}})); }
      }
      if(j.kind==='right'){
        const leftAliases=baseCols.slice(0,baseCols.length-1).map(x=>x.alias);
        const out2=[];
        for(const rr of t2.rows){
          let matched=false;
          for(const lr of baseRows){
            const combined=Object.assign({}, lr, {[t2.alias]:{cols:t2.cols, row:rr}});
            if(truthy(evalExpr(j.on, makeCtx(cat, combined, outerCtx)))){ out2.push(combined); matched=true; }
          }
          if(!matched){
            const nullLeft={};
            for(const al of leftAliases){ const found=baseCols.find(x=>x.alias===al); nullLeft[al]={cols:found.cols, row:found.cols.map(()=>null)}; }
            out2.push(Object.assign(nullLeft, {[t2.alias]:{cols:t2.cols, row:rr}}));
          }
        }
        baseRows=out2;
      } else baseRows=out;
    }
  } else {
    baseRows.push({}); // SELECT sin FROM (SELECT 1+1)
  }

  // WHERE
  let rows=baseRows;
  if(q.where) rows=rows.filter(combined=>truthy(evalExpr(q.where, makeCtx(cat, combined, outerCtx))));

  // expansión de * en la lista de columnas
  const selCols=[];
  for(const c of q.cols){
    if(c.expr.f==='star'){
      if(!q.from) throw fmtErr('«*» requiere un FROM');
      for(const g of baseCols) for(const cn of g.cols) selCols.push({expr:{f:'col',table:g.alias,name:cn}, alias:cn});
    } else selCols.push(c);
  }

  // ¿agregados o GROUP BY?
  const grouped = q.groupBy.length>0 || selCols.some(c=>exprHasAgg(c.expr)) || (q.having&&exprHasAgg(q.having));

  let outPairs=[]; // {out:[valores], ctx:evaluador para ORDER/HAVING}
  const nullRow={};
  if(q.from) for(const g of baseCols){ nullRow[g.alias]={cols:g.cols, row:g.cols.map(()=>null)}; }

  if(grouped){
    // GROUP BY puede referir alias del SELECT (mes, ventas…): reescritura previa
    let groupExprs=q.groupBy;
    if(q.groupBy.length && rows.length){
      const probeCtx=makeCtx(cat, rows[0], outerCtx);
      groupExprs=q.groupBy.map(ge=>{
        if(ge.f==='col'&&!ge.table){
          try{ resolveCol(ge, probeCtx); return ge; }            // columna real: gana
          catch(err){
            const hit=selCols.find(c=>c.alias&&c.alias.toLowerCase()===ge.name.toLowerCase());
            if(hit) return hit.expr;                              // alias del SELECT
          }
        }
        return ge;
      });
    }
    let groups=[];
    if(groupExprs.length){
      const map=new Map();
      for(const combined of rows){
        const ctx=makeCtx(cat, combined, outerCtx);
        const key=JSON.stringify(groupExprs.map(e=>evalExpr(e,ctx)));
        if(!map.has(key)) map.set(key, {key:key, rows:[], sample:combined});
        map.get(key).rows.push(makeCtx(cat, combined, outerCtx));
      }
      groups=[...map.values()];
    } else {
      if(rows.length===0 && selCols.some(c=>exprHasAgg(c.expr)) && !q.having){
        groups.push({rows:[], sample:nullRow}); // COUNT(*) sin filas = 0
      } else if(rows.length){
        groups.push({rows:rows.map(combined=>makeCtx(cat, combined, outerCtx)), sample:rows[0]});
      } else groups.push({rows:[], sample:nullRow});
    }
    for(const g of groups){
      const gctx=makeCtx(cat, g.sample||nullRow, outerCtx);
      gctx.group=g;
      // valores de las expresiones de group by, para resolver columnas agrupadas en HAVING/SELECT
      gctx.group.exprVals=new Map();
      if(groupExprs.length){ for(const ge of groupExprs){ gctx.group.exprVals.set(exprKey(ge), evalExpr(ge, gctx)); } }
      // alias del SELECT disponibles en HAVING y ORDER BY (estilo MySQL, útil para enseñar)
      const aliasMap={};
      selCols.forEach((c,i)=>{ if(c.alias){ try{ aliasMap[c.alias.toLowerCase()]=evalExpr(c.expr, gctx); }catch(err){} } });
      gctx.aliasMap=aliasMap;
      if(q.having && !truthy(evalExpr(q.having, gctx))) continue;
      const out=selCols.map(c=>evalExpr(c.expr, gctx));
      outPairs.push({out:out, ctx:gctx, cols:selCols, aliasMap:aliasMap});
    }
  } else {
    for(const combined of rows){
      const ctx=makeCtx(cat, combined, outerCtx);
      // las funciones de ventana NO se evalúan aquí: la pasada de ventanas las calcula
      const out=selCols.map(c=>exprHasWindow(c.expr)?null:evalExpr(c.expr, ctx));
      const aliasMap={};
      selCols.forEach((c,i)=>{ if(c.alias&&!exprHasWindow(c.expr)) aliasMap[c.alias.toLowerCase()]=out[i]; });
      outPairs.push({out:out, ctx:ctx, cols:selCols, aliasMap:aliasMap});
    }
  }

  // funciones de ventana (sobre filas ya filtradas)
  const hasWin = selCols.some(c=>exprHasWindow(c.expr));
  if(hasWin){
    const winExprs=[];
    selCols.forEach(c=>{ if(exprHasWindow(c.expr)) collectWins(c.expr, winExprs); });
    const vals=outPairs.map(()=>[]);
    outPairs.forEach((pair,i)=>{
      winExprs.forEach((w,wi)=>{ vals[i][wi]=null; }); // se llena en el bucle de particiones
    });
    winExprs.forEach((w,wi)=>{
      const wname=w.name;
      // particionar
      const parts=new Map();
      outPairs.forEach((pair,i)=>{
        const key=JSON.stringify(w.over.partition.map(pe=>{ try{ return evalExpr(pe, pair.ctx); }catch(err){ return null; } }));
        if(!parts.has(key)) parts.set(key,[]);
        parts.get(key).push(i);
      });
      for(const idxs of parts.values()){
        idxs.sort((ia,ib)=>{
          for(const ob of w.over.order){
            const va=winOrderVal(w.over.order, ia, vals, outPairs, ob);
            const vb=winOrderVal(w.over.order, ib, vals, outPairs, ob);
            const c=cmpVals(va,vb); if(c!==0) return ob.dir==='desc'?-c:c;
          }
          return 0;
        });
        let prevKey=null, rank=1;
        idxs.forEach((rowIdx,pos)=>{
          if(wname==='row_number') vals[rowIdx][wi]=pos+1;
          else if(wname==='rank'){
            const key=JSON.stringify(w.over.order.map(ob=>{ try{ return evalExpr(ob.expr, outPairs[rowIdx].ctx); }catch(err){ return null; } }));
            if(prevKey!==null && key!==prevKey) rank=pos+1;
            prevKey=key;
            vals[rowIdx][wi]=rank;
          } else if(wname==='dense_rank'){
            const key=JSON.stringify(w.over.order.map(ob=>{ try{ return evalExpr(ob.expr, outPairs[rowIdx].ctx); }catch(err){ return null; } }));
            if(prevKey!==null && key!==prevKey) rank++;
            prevKey=key;
            vals[rowIdx][wi]=rank;
          } else throw fmtErr('Función de ventana no soportada: '+wname.toUpperCase());
        });
      }
    });
    // reemplazar los valores de salida usando los índices de las ventanas
    outPairs=outPairs.map((pair,i)=>{
      const out=selCols.map((c,ci)=>{
        if(exprHasWindow(c.expr)) return evalWithWins(c.expr, winExprs, vals[i]);
        return pair.out[ci];
      });
      const aliasMap={};
      selCols.forEach((c,ci)=>{ if(c.alias) aliasMap[c.alias.toLowerCase()]=out[ci]; });
      return {out:out, ctx:pair.ctx, cols:selCols, aliasMap:aliasMap};
    });
  }

  let cols=selCols.map((c,i)=>c.alias||colLabel(c.expr, i));
  let resultRows=outPairs.map(p=>p.out);

  // DISTINCT
  if(q.distinct){
    const seen=new Set(); const keep=[];
    outPairs.forEach((p,i)=>{ const k=JSON.stringify(p.out); if(!seen.has(k)){ seen.add(k); keep.push(i); } });
    outPairs=keep.map(i=>outPairs[i]);
    resultRows=outPairs.map(p=>p.out);
  }

  // ORDER BY (sin UNION: aplica al resultado propio)
  if(q.orderBy.length && outPairs.length && !q.unions.length){
    const idx=outPairs.map((p,i)=>i);
    idx.sort((ia,ib)=>{
      for(const ob of q.orderBy){
        const va=orderVal(ob, outPairs[ia], cols), vb=orderVal(ob, outPairs[ib], cols);
        const c=cmpVals(va,vb);
        if(c!==0) return ob.dir==='desc'?-c:c;
      }
      return 0;
    });
    outPairs=idx.map(i=>outPairs[i]);
    resultRows=outPairs.map(p=>p.out);
  }

  // LIMIT/OFFSET (sin UNION)
  if(q.limit!==null&&q.limit!==undefined&&!q.unions.length){
    const lim=Math.trunc(evalExpr(q.limit, makeCtx(cat,{},null)))||0;
    const off=q.offset?Math.trunc(evalExpr(q.offset, makeCtx(cat,{},null)))||0:0;
    resultRows=resultRows.slice(off, off+lim);
  }

  // UNION: el ORDER BY/LIMIT del select principal aplica al conjunto combinado
  if(q.unions.length){
    let all=resultRows.map(r=>r.slice());
    for(const u of q.unions){
      const r2=execQuery(u.select, cat, outerCtx);
      all=all.concat(r2.results[0].rows.map(r=>r.slice()));
    }
    if(!q.unions[q.unions.length-1].all){
      const seen=new Set();
      all=all.filter(r=>{ const k=JSON.stringify(r); if(seen.has(k))return false; seen.add(k); return true; });
    }
    if(q.orderBy.length){
      all.sort((ra,rb)=>{
        for(const ob of q.orderBy){
          let ia=-1, va, vb;
          if(ob.expr.f==='lit'&&typeof ob.expr.v==='number'){ ia=Math.trunc(ob.expr.v)-1; if(ia<0||ia>=cols.length) throw fmtErr('ORDER BY '+ob.expr.v+' fuera de rango'); }
          else { const nm=(ob.expr.name||'').toLowerCase(); ia=cols.findIndex(c=>c.toLowerCase()===nm); }
          if(ia<0) continue;
          va=ra[ia]; vb=rb[ia];
          const c=cmpVals(va,vb);
          if(c!==0) return ob.dir==='desc'?-c:c;
        }
        return 0;
      });
    }
    if(q.limit!==null&&q.limit!==undefined){
      const lim=Math.trunc(evalExpr(q.limit, makeCtx(cat,{},null)))||0;
      const off=q.offset?Math.trunc(evalExpr(q.offset, makeCtx(cat,{},null)))||0:0;
      all=all.slice(off, off+lim);
    }
    resultRows=all;
  }
  return {ok:true, results:[{cols:cols, rows:resultRows}]};
}
function collectWins(e, acc){
  if(!e||typeof e!=='object') return;
  if(e.f==='fn'&&e.over){ if(!acc.some(x=>JSON.stringify(x)===JSON.stringify(e))) acc.push(e); }
  for(const k of ['a','b','lo','hi']){ if(e[k]) collectWins(e[k], acc); }
  if(e.args) e.args.forEach(x=>collectWins(x,acc));
  if(e.whens) e.whens.forEach(w=>{ collectWins(w.cond,acc); collectWins(w.res,acc); });
  if(e.els) collectWins(e.els, acc);
  if(e.list) e.list.forEach(x=>collectWins(x,acc));
}
function evalWithWins(e, wins, wvals){
  function rec(x){
    if(!x||typeof x!=='object') return x;
    if(x.f==='fn'&&x.over){ const i=wins.findIndex(w=>JSON.stringify(w)===JSON.stringify(x)); return wvals[i]; }
    const c=Object.assign({}, x);
    for(const k of ['a','b','lo','hi']){ if(c[k]&&typeof c[k]==='object') c[k]=rec(c[k]); }
    if(c.args) c.args=c.args.map(rec);
    if(c.whens) c.whens=c.whens.map(w=>({cond:rec(w.cond), res:rec(w.res)}));
    if(c.els) c.els=rec(c.els);
    if(c.list) c.list=c.list.map(rec);
    return c;
  }
  const r=rec(e);
  return (r&&typeof r==='object') ? evalExpr(r, {cat:{tables:{}}, tables:{}, outer:null}) : r;
}
function winOrderVal(order, pairIdx, vals, outPairs, ob){
  // valor del término de orden dentro de la ventana, para el par idx
  try{ return evalExpr(ob.expr, outPairs[pairIdx].ctx); }catch(err){ return null; }
}
function orderVal(ob, pair, cols){
  // ORDER BY 2 → columna 2; alias → valor calculado; expresión → evaluar
  if(ob.expr.f==='lit'&&typeof ob.expr.v==='number'){
    const i=Math.trunc(ob.expr.v)-1;
    if(i<0||i>=pair.out.length) throw fmtErr('ORDER BY '+ob.expr.v+' fuera de rango (hay '+pair.out.length+' columnas)');
    return pair.out[i];
  }
  if(ob.expr.f==='col'&&!ob.expr.table&&pair.aliasMap&&pair.aliasMap[ob.expr.name.toLowerCase()]!==undefined) return pair.aliasMap[ob.expr.name.toLowerCase()];
  if(ob.expr.f==='col'&&!ob.expr.table&&pair.ctx&&pair.ctx.aliasMap&&pair.ctx.aliasMap[ob.expr.name.toLowerCase()]!==undefined) return pair.ctx.aliasMap[ob.expr.name.toLowerCase()];
  try{ return evalExpr(ob.expr, pair.ctx); }catch(err){ 
    const cn=(ob.expr.name||'').toLowerCase();
    const ci=cols.findIndex(c=>c.toLowerCase()===cn);
    if(ci>=0) return pair.out[ci];
    throw err;
  }
}
function exprText(e){
  if(!e) return '?';
  switch(e.f){
    case 'col': return (e.table?e.table+'.':'')+e.name;
    case 'lit': return (typeof e.v==='string') ? "'"+e.v+"'" : String(e.v);
    case 'fn': return e.name.toUpperCase()+'('+(e.star?'*':(e.args||[]).map(exprText).join(', '))+')';
    case 'bin': return exprText(e.a)+' '+e.op+' '+exprText(e.b);
    case 'case': return 'CASE';
    case 'not': return 'NOT '+exprText(e.a);
    default: return '?';
  }
}
function colLabel(e, i){
  if(e.f==='col') return e.name;
  if(e.f==='fn') return exprText(e);
  return 'col'+(i+1);
}

/* ---------- INSERT/UPDATE/DELETE/CREATE ---------- */
function findTable(cat, name){
  const key=Object.keys(cat.tables).find(k=>k.toLowerCase()===name.toLowerCase());
  if(!key) throw fmtErr('La tabla «'+name+'» no existe. Tablas disponibles: '+Object.keys(cat.tables).join(', '));
  return cat.tables[key];
}
function execDML(st, cat){
  switch(st.type){
    case 'begin': cat.__snap=JSON.stringify(cat.tables); return {ok:true, message:'Transacción iniciada (BEGIN).'};
    case 'commit': cat.__snap=null; return {ok:true, message:'Transacción confirmada (COMMIT).'};
    case 'rollback': if(cat.__snap){ cat.tables=JSON.parse(cat.__snap); cat.__snap=null; return {ok:true, message:'Transacción revertida (ROLLBACK): los cambios se deshicieron.'}; } return {ok:true, message:'No hay transacción abierta; ROLLBACK sin efecto.'};
    case 'createview': {
      const name=st.name;
      if(cat.views[name.toLowerCase()]) throw fmtErr('La vista «'+name+'» ya existe');
      cat.views[name.toLowerCase()]={name:name, select:st.select};
      return {ok:true, message:'Vista «'+name+'» creada.'};
    }
    case 'createtable': {
      const name=st.name;
      if(Object.keys(cat.tables).some(k=>k.toLowerCase()===name.toLowerCase())) throw fmtErr('La tabla «'+name+'» ya existe');
      cat.tables[name]={cols:st.cols.map(c=>c.name), colDefs:st.cols, rows:[]};
      return {ok:true, message:'Tabla «'+name+'» creada con '+st.cols.length+' columnas.'};
    }
    case 'insert': {
      const t=findTable(cat, st.table);
      const defs=t.colDefs||t.cols.map(c=>({name:c}));
      let target=st.cols?st.cols.map(c=>{
        const d=defs.find(x=>x.name.toLowerCase()===c.toLowerCase());
        if(!d) throw fmtErr('La columna «'+c+'» no existe en «'+t.cols[0]+'…» (tabla '+st.table+')');
        return d;
      }):defs;
      let n=0;
      for(const vals of st.rows){
        if(vals.length!==target.length) throw fmtErr('INSERT: diste '+vals.length+' valores para '+target.length+' columnas');
        const row=new Array(defs.length).fill(null);
        defs.forEach((d,i)=>{ const ti=target.indexOf(d); if(ti>=0) row[i]=evalExpr(vals[ti], {cat:cat, tables:{}, outer:null}); else if(d.def!==null&&d.def!==undefined) row[i]=evalExpr(d.def, {cat:cat,tables:{},outer:null}); });
        // defaults para columnas no mencionadas
        defs.forEach((d,i)=>{ const ti=target.indexOf(d); if(ti<0) row[i]=(d.def!==null&&d.def!==undefined)?evalExpr(d.def, {cat:cat,tables:{},outer:null}):null; });
        // INTEGER PRIMARY KEY: si viene NULL u omitida, autoincrementa (comportamiento SQLite)
        defs.forEach((d,i)=>{
          if(d.pk&&!isNull(row[i])){ const n=toNum(row[i]); if(n===null) throw fmtErr('La llave primaria «'+d.name+'» debe ser un número'); row[i]=n; }
        });
        const pkDef=defs.find(d=>d.pk);
        if(pkDef){
          const vi=t.cols.findIndex(c=>c.toLowerCase()===pkDef.name.toLowerCase());
          if(isNull(row[vi])){
            let mx=0; for(const r0 of t.rows){ const v0=r0[vi]; if(!isNull(v0)){ const n0=toNum(v0); if(n0!==null&&n0>mx) mx=n0; } }
            row[vi]=mx+1;
          }
        }
        checkRow(cat, st.table, t, defs, row, null);
        t.rows.push(row); n++;
      }
      return {ok:true, message:'✔ '+n+' fila'+(n===1?'':'s')+' insertada'+(n===1?'':'s')+' en «'+st.table+'».'};
    }
    case 'update': {
      const t=findTable(cat, st.table);
      const defs=t.colDefs||t.cols.map(c=>({name:c}));
      let n=0;
      for(let i=0;i<t.rows.length;i++){
        const combined={[st.table]:{cols:t.cols, row:t.rows[i]}};
        const ctx=makeCtx(cat, combined, null);
        if(st.where&&!truthy(evalExpr(st.where, ctx))) continue;
        const newRow=t.rows[i].slice();
        for(const s of st.sets){
          const d=defs.find(x=>x.name.toLowerCase()===s.col.toLowerCase());
          if(!d) throw fmtErr('La columna «'+s.col+'» no existe en «'+st.table+'»');
          const vi=t.cols.findIndex(c=>c.toLowerCase()===d.name.toLowerCase());
          newRow[vi]=evalExpr(s.expr, ctx);
        }
        checkRow(cat, st.table, t, defs, newRow, i);
        t.rows[i]=newRow; n++;
      }
      return {ok:true, message:'✔ '+n+' fila'+(n===1?'':'s')+' actualizada'+(n===1?'':'s')+'.'};
    }
    case 'delete': {
      const t=findTable(cat, st.table);
      const before=t.rows.length;
      t.rows=t.rows.filter(row=>{
        if(!st.where) return false;
        const ctx=makeCtx(cat, {[st.table]:{cols:t.cols, row:row}}, null);
        return !truthy(evalExpr(st.where, ctx));
      });
      const n=before-t.rows.length;
      if(!st.where) return {ok:true, message:'⚠️ DELETE sin WHERE: se borraron TODAS las '+n+' filas. (Por eso siempre escribe el WHERE…)'};
      return {ok:true, message:'✔ '+n+' fila'+(n===1?'':'s')+' borrada'+(n===1?'':'s')+'.'};
    }
  }
  throw fmtErr('Comando no soportado');
}
function checkRow(cat, tname, t, defs, row, editingIdx){
  defs.forEach((d,i)=>{
    const v=row[i];
    if(d.notNull&&isNull(v)) throw fmtErr('Violación de NOT NULL: «'+d.name+'» no puede ser NULL en «'+tname+'»');
    if(d.check){ const ctx=makeCtx(cat, {[tname]:{cols:t.cols, row:row}}, null); if(!truthy(evalExpr(d.check, ctx))) throw fmtErr('Violación de CHECK en «'+d.name+'»: el valor «'+disp(v)+'» no cumple la condición'); }
    if((d.unique||d.pk)&&!isNull(v)){
      for(let r=0;r<t.rows.length;r++){ if(editingIdx!==null&&r===editingIdx) continue; const vi=t.cols.findIndex(c=>c.toLowerCase()===d.name.toLowerCase()); if(vi>=0&&valuesEq(t.rows[r][vi], v)) throw fmtErr('Violación de UNIQUE: «'+disp(v)+'» ya existe en «'+d.name+'»'); }
    }
  });
}

/* ---------- API pública ---------- */
function exec(cat, sqlText){
  try{
    const toks=tokenize(sqlText);
    if(!toks.length) return {ok:false, error:fmtErr('Escribe una consulta SQL.')};
    const sts=new Parser(toks).parseStatements();
    const results=[]; const messages=[];
    for(const st of sts){
      if(st.type==='select'){ results.push(execQuery(st, cat, null).results[0]); }
      else { messages.push(execDML(st, cat).message); }
    }
    return {ok:true, results:results, messages:messages};
  }catch(err){
    return {ok:false, error: (err && err.message ? err.message : String(err)) + ((typeof process!=='undefined' && process.env && process.env.SQLDEBUG) && err.stack ? '\n'+err.stack : '')};
  }
}
/* vista: resolver SELECT * FROM vista */
function withViews(cat){
  return {
    get tables(){ return cat.tables; },
    get views(){ return cat.views; }
  };
}
/* un FROM puede referir a una vista: integramos en getTable vía cat.views */
(function(){
  const _get=getTable;
  getTable=function(cat, ref){
    if(ref.sub) return null;
    const key=Object.keys(cat.tables).find(k=>k.toLowerCase()===ref.name.toLowerCase());
    if(key){ const t=cat.tables[key]; return {alias:ref.alias, cols:t.cols.slice(), rows:t.rows}; }
    const vk=cat.views&&Object.keys(cat.views).find(k=>k===ref.name.toLowerCase());
    if(vk){ const r=execQuery(cat.views[vk].select, cat, null); return {alias:ref.alias, cols:r.results[0].cols, rows:r.results[0].rows}; }
    throw fmtErr('La tabla «'+ref.name+'» no existe. Tablas disponibles: '+Object.keys(cat.tables).join(', ')+(cat.views&&Object.keys(cat.views).length?' · Vistas: '+Object.keys(cat.views).join(', '):''));
  };
})();

/* calificación por resultado */
function gradeResult(expected, got, opts){
  opts=opts||{};
  const e=expected, g=got;
  if(!g) return {ok:false, why:'Tu consulta produjo un error.'};
  if(opts.cols && g.cols.length!==e.cols.length) return {ok:false, why:'Tu consulta devuelve '+g.cols.length+' columna(s) ('+g.cols.join(', ')+'); se esperaban '+e.cols.length+' ('+e.cols.join(', ')+').'};
  if(g.rows.length!==e.rows.length){
    if(opts.minRows!==undefined&&g.rows.length>=opts.minRows&&opts.maxRows!==undefined&&g.rows.length<=opts.maxRows){/* rango */}
    else return {ok:false, why:'Tu consulta devuelve '+g.rows.length+' fila(s); se esperaban '+e.rows.length+'.'};
  }
  const normRow=r=>r.map(v=>isNull(v)?'∅':(typeof v==='number'?String(Math.round(v*1000)/1000):String(v).trim()));
  const eq=(ra,rb)=>{ if(ra.length!==rb.length) return false; for(let i=0;i<ra.length;i++){ if(!valuesEq(ra[i],rb[i])) return false; } return true; };
  const gotN=g.rows.map(normRow), expN=e.rows.map(normRow);
  if(opts.orderInsensitive!==false){
    const used=new Array(gotN.length).fill(false);
    for(const er of expN){
      let f=-1;
      for(let i=0;i<gotN.length;i++){ if(!used[i]&&eq(gotN[i],er)){ f=i; break; } }
      if(f<0) return {ok:false, why:'Falta o difiere una fila esperada: ('+er.map(disp).join(' · ')+'). Revisa tus condiciones.'};
      used[f]=true;
    }
  } else {
    for(let i=0;i<expN.length;i++){ if(!eq(gotN[i],expN[i])) return {ok:false, why:'La fila '+(i+1)+' no coincide. Se esperaba ('+expN[i].map(disp).join(' · ')+') y obtuviste ('+(gotN[i]||[]).map(disp).join(' · ')+'). ¿Recordaste el ORDER BY?'}; }
  }
  return {ok:true};
}

return { exec:exec, gradeResult:gradeResult, tokenize:tokenize, Parser:Parser, disp:disp, valuesEq:valuesEq };
})();
if(typeof module!=='undefined') module.exports = SQLE;
