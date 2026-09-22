import io, re, unicodedata
def norm(s):
    s=unicodedata.normalize('NFD',s.lower())
    s=''.join(c for c in s if unicodedata.category(c)!='Mn')
    return re.sub(r'\s+',' ',s).strip()

for f in ['index.html','javascript.html','ingles.html']:
    s=io.open('/home/user/'+f,encoding='utf-8').read()
    # cada objeto de pregunta mc: q:'...' ... options:['a','b',...] ... correct:N
    for m in re.finditer(r"\{type:'mc'[^{}]*?\}", s, re.S):
        obj=m.group(0)
        mo=re.search(r"options:\[((?:'[^']*'|\"[^\"]*\")(?:\s*,\s*(?:'[^']*'|\"[^\"]*\"))*)\]", obj)
        if not mo: continue
        opts=re.findall(r"'([^']*)'|\"([^\"]*)\"", mo.group(1))
        opts=[a or b for a,b in opts]
        nn=[norm(o) for o in opts]
        if len(set(nn))!=len(nn):
            # contexto: texto de la pregunta
            qm=re.search(r"q:'((?:[^'\\]|\\.)*)'", obj)
            print('['+f+'] ~offset', m.start())
            print('  P:', (qm.group(1)[:80] if qm else '?'))
            for i,o in enumerate(opts): print('   ', 'ABCD'[i] if i<4 else i, '·', o[:60])
            print()
