# Revisión ortográfica del contenido EN del curso de inglés:
# extrae strings del script, filtra frases en inglés, las pasa por diccionario
# EN y descarta lo que es español válido (dic ES), código o nombres propios.
import io, re, json
from spellchecker import SpellChecker

en = SpellChecker(language='en')
es = SpellChecker(language='es')

s = io.open('/home/user/ingles.html', encoding='utf-8').read()
script = s[s.index('<script>')+8 : s.rindex('</script>')]

# extraer literales '...' y "..." (con escapes) que parezcan frases
lits = []
for m in re.finditer(r"'((?:[^'\\]|\\.)*)'", script):
    lits.append(m.group(1))
for m in re.finditer(r'"((?:[^"\\]|\\.)*)"', script):
    lits.append(m.group(1))

MARKERS = set('''the you your yours what when where which please should would could must
they them their there this that these those with have has had will about after before
between under over from into very more most than then because don doesn didn isn aren
wasn weren time people today tomorrow morning afternoon evening night water house'''.split())

def dec(lit):
    return lit.replace("\\'", "'").replace('\\"','"').replace('\\\\','\\').replace('\\n','\n')

def es_frase_en(t):
    toks = re.findall(r"[A-Za-z']{2,}", t.lower())
    return len(set(toks) & MARKERS) >= 2

# permitir: nombres propios y términos del curso
ALLOW = set('''ana luis carlos maria mérida monterrey guadalajara toluca puebla
cambridge english preliminary reading writing listening speaking
email ok no yes wifi saturday sunday monday tuesday wednesday thursday friday
january february march april may june july august september october november december
monday's speaker's sarah's tom's anna's emma's john's lucy's mr mrs ms dr
b uk usa id api url html css js sql json csv pdf q a app
lumen nanite unity unreal python javascript
levenshtein leitner domino rrd
piccadilly oxford london england britain british american
classroom timetable timetable's
hola gracias por favor墨西哥'''.split())

issues = {}
checked = 0
for lit in lits:
    t = dec(lit)
    if len(t) < 8 or ' ' not in t.strip():  continue
    if not es_frase_en(t):                   continue
    checked += 1
    for tok in re.finditer(r"[A-Za-z][A-Za-z''-]*", t):
        w = tok.group(0)
        wl = w.lower().replace('\u2019', "'")
        if len(wl) <= 2 or wl in ALLOW:      continue
        if w.isupper() and len(w) <= 4:      continue   # siglas
        # contracciones: partir en partes y revisar cada una
        parts = [p for p in re.split(r"['']", wl) if p]
        bad = []
        for p in parts:
            if p in en or p in ALLOW:  continue
            if p in es:                continue   # es español legítimo
            bad.append(p)
        if bad:
            issues.setdefault(' '.join(bad), []).append(t[:90])

print('frases EN revisadas:', checked)
if issues:
    print('\n== palabras sospechosas (candidatas a typo) ==')
    for w, ctxs in sorted(issues.items()):
        print('•', w)
        for c in sorted(set(ctxs))[:2]:
            print('   …', c, '…')
else:
    print('✓ cero desconocidas')
