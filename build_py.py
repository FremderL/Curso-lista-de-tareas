# -*- coding: utf-8 -*-
"""Ensambla python.html a partir de ingles.html (patrón probado) + piezas del curso Python."""
import io, sys

def read(p): return io.open(p, encoding='utf-8').read()
def rep(s, old, new, cnt=1):
    n = s.count(old)
    assert n == cnt, '[rep] count=%d (esperaba %d) para: %r' % (n, cnt, old[:90])
    return s.replace(old, new)
def cut(s, start, end):
    i = s.index(start); j = s.index(end, i)
    return i, j

src = read('ingles.html')

# ---------- 0) sanea dataKey duplicado heredado de un parche anterior (tolerante) ----------
if src.count("dataKey:'dataEn', dataKey:'dataEn' }") == 1:
    src = src.replace("dataKey:'dataEn', dataKey:'dataEn' }", "dataKey:'dataEn' }")

# ---------- 1) HEAD: título, meta, favicon ----------
src = rep(src, '<title>Curso interactivo · Inglés B1 Preliminary</title>',
                '<title>Curso interactivo · Python desde cero</title>')
src = rep(src, 'content="Curso interactivo de inglés en español: prepara el B1 Preliminary de Cambridge con lectura, escritura, escucha, speaking y flashcards SRS."',
                'content="Curso interactivo de Python en español: print, variables, ciclos, listas, diccionarios, funciones y try/except con un mini-interpreter 100% en tu navegador y ejercicios calificados por salida."')
src = rep(src, "<text y='.9em' font-size='90'>📝</text>", "<text y='.9em' font-size='90'>🐍</text>")

# ---------- 2) SHELL: topbar ----------
src = rep(src, '<span class="logo-mark">🇬🇧</span>', '<span class="logo-mark">🐍</span>')
src = rep(src, '<small>Curso interactivo · Inglés B1 Preliminary</small>', '<small>Curso interactivo · Python desde cero</small>')

# ---------- 3) Región de contenido: MODULES..TEXTBOOK -> curso Python ----------
i0 = src.index('const MODULES = [];')
i1 = src.index('/* ============================ EXTRAS DEL CURSO DE INGLÉS')

ca = read('python_parts/content_a.js')
lines = ca.split('\n')
for k, ln in enumerate(lines):
    if ln.strip().startswith('const MODULES'):
        del lines[k]; break
ca = '\n'.join(lines)
cb = read('python_parts/content_b.js')
eng = read('python_parts/py_engine.js')
tb = read('python_parts/textbook_py.js')

header = """
'use strict';
/* ============================================================
   CURSO 5 · PYTHON DESDE CERO
   Plataforma compartida con los cursos 1-4 (misma base de cuentas)
   Mini-interpreter PYE + 30 lecciones + examen 30×300
   ============================================================ */
"""
region = header + ca.rstrip() + '\n\n' + cb.rstrip() + '\n\n' + eng.rstrip() + '\n\n' + tb.rstrip() + '\n\n'
src = src[:i0] + 'const MODULES = [];\n' + region + src[i1:]

# ---------- 4) SRS_DECKS -> mazo Python ----------
i0 = src.index('const SRS_DECKS = {')
i1 = src.index('const SRS_INTERVALS')
src = src[:i0] + read('python_parts/srs_py.js').rstrip() + '\n' + src[i1:]

# ---------- 5) campo de datos dataEn -> dataPy (la entrada c3 del CAMPUS se queda) ----------
src = rep(src, "dataEn:'codecamp-en-v1'", "dataPy:'codecamp-py-v1'")
src = rep(src, "if(cursoVacio(rec.dataEn)){ const o = legacyData(LEGACY_ALL.dataEn); if(o){ rec.dataEn = Object.assign(blankData(), o); movido = true; } }",
                "if(cursoVacio(rec.dataPy)){ const o = legacyData(LEGACY_ALL.dataPy); if(o){ rec.dataPy = Object.assign(blankData(), o); movido = true; } }")
src = rep(src, "if(u){ base = Object.assign(base, DB.users[u].dataEn || {}); }",
                "if(u){ base = Object.assign(base, DB.users[u].dataPy || {}); }")
src = rep(src, "if(u){ DB.users[u].dataEn = state; saveDB(); }",
                "if(u){ DB.users[u].dataPy = state; saveDB(); }")
src = rep(src, "DB.users[u].dataEn = blankData(); saveDB();",
                "DB.users[u].dataPy = blankData(); saveDB();")
n = src.count('dataEn')
assert n == 1, 'dataEn residual: %d (esperaba solo el del CAMPUS c3)' % n

# ---------- 6) blankData: campos Python ----------
src = rep(src, "function blankData(){ return { scores:{}, examScore:null, name:'', lastLesson:'0-1', srs:{} }; }",
                "function blankData(){ return { scores:{}, examScore:null, name:'', lastLesson:'0-1', srs:{}, pyCode:{}, pyOk:{}, play:'', playIn:'' }; }")

# ---------- 7) lessonMax: sumar tareas pyex ----------
src = rep(src, "if(b.t==='exercise'){ b.checks.forEach(function(c){ max += (c.pts||10); }); }",
                "if(b.t==='exercise'){ b.checks.forEach(function(c){ max += (c.pts||10); }); }\n    if(b.t==='pyex'){ (b.tasks||[]).forEach(function(tk){ max += (tk.pts||10); }); }")

# ---------- 8) blockHtml: casos pyex / srs / flow ----------
src = rep(src, "    case 'appdemo': return appDemoHtml();\n    default: return '';",
                "    case 'appdemo': return appDemoHtml();\n    case 'pyex': return pyExBlockHtml(b, lessonId);\n    case 'srs': return srsHtml(b);\n    case 'flow': return flowHtml(b);\n    default: return '';")

# ---------- 9) CAMPUS: este curso + lista de cursos ----------
src = rep(src, "thisCourse:'c3',", "thisCourse:'c5',")
src = rep(src, "tagline:{ es:'Curso interactivo · Inglés B1 Preliminary', en:'Interactive course · English B1 Preliminary' }",
                "tagline:{ es:'Curso interactivo · Python desde cero', en:'Interactive course · Python from scratch' }")
src = rep(src, "  { id:'c4', file:'sql.html',        emoji:'🗄️', name:{es:'Bases de datos SQL', en:'SQL Databases'}, total:30, max:3040, examMax:300, dataKey:'dataSql' }",
                "  { id:'c4', file:'sql.html',        emoji:'🗄️', name:{es:'Bases de datos SQL', en:'SQL Databases'}, total:30, max:3040, examMax:300, dataKey:'dataSql' },\n  { id:'c5', file:'python.html',     emoji:'🐍', name:{es:'Python desde cero', en:'Python from scratch'}, total:30, max:TOTAL_MAX, examMax:300, dataKey:'dataPy' }")

# ---------- 10) I18N + etiquetas ----------
src = rep(src, "sb_project:'Proyecto final (código)', sb_report:'Boleta de calificaciones',",
                "sb_project:'Playground Python', sb_report:'Boleta de calificaciones',")
src = rep(src, "sb_project:'Final project (code)', sb_report:'Report card',",
                "sb_project:'Python Playground', sb_report:'Report card',")
src = rep(src, """function __ccLabelOverrides(){
  I18N.es.sb_project = 'Plan de estudio + recursos';
  I18N.en.sb_project = 'Study plan + resources';
  I18N.es.sb_exam = 'Examen preliminar';
  I18N.en.sb_exam = 'Preliminary exam';
}""", """function __ccLabelOverrides(){
  I18N.es.sb_project = '🛝 Playground Python';
  I18N.en.sb_project = '🛝 Python Playground';
  I18N.es.sb_exam = 'Examen final';
  I18N.en.sb_exam = 'Final exam';
}""")
src = rep(src, """h += '<button class="sextra" data-nav="project">📦 '+t('sb_project')+'</button>';""",
                """h += '<button class="sextra" data-nav="project">🛝 '+t('sb_project')+'</button>';""")
src = rep(src, """(pct >= 70 ? '<button class="btn small green" data-nav="project">📦 Ir por el código del proyecto</button>""",
                """(pct >= 70 ? '<button class="btn small green" data-nav="project">🛝 Ir al Playground</button>""")

# ---------- 11) sidebar: módulo abierto por defecto ----------
src = rep(src, "(route.view !== 'lesson' && route.view !== 'home' && m.id === 'm6')",
                "(route.view !== 'lesson' && route.view !== 'home' && m.id === 'm6')")

# ---------- 12) viewExam: textos ----------
src = rep(src, '30 preguntas de TODO el curso (Módulos 1–6).', '30 preguntas de TODO el curso (Módulos 0–7).')
src = rep(src, 'data-nav="lesson" data-id="6-2">← Repasar la última lección',
                'data-nav="lesson" data-id="7-2">← Repasar la última lección')

# ---------- 13) viewReport: mensajes ----------
src = rep(src, "if(pct >= 90) msg = '🏆 Nivel: Desarrollador Web Destacado. ¡Dominio total!';",
                "if(pct >= 90) msg = '🏆 Nivel: Pythonista Destacado. ¡Dominio total!';")
src = rep(src, "else if(pct >= 70) msg = '🎉 ¡APROBADO! Ya sabes construir y publicar una aplicación web completa.';",
                "else if(pct >= 70) msg = '🎉 ¡APROBADO! Ya sabes escribir programas completos en Python: datos, ciclos, funciones y manejo de errores.';")
src = rep(src, "Tu progreso oficial del curso «Inglés B1 · Cambridge Preliminary». Cada quiz y ejercicio aprobado suma; tu mejor intento siempre cuenta.",
                "Tu progreso oficial del curso «Python desde cero · CodeCamp». Cada quiz y cada ejercicio calificado por salida suma; tu mejor intento siempre cuenta.")
src = rep(src, "'<h2>Inglés Nivel B1 (Cambridge Preliminary)</h2>'+\n    '<div style=\"font-size:13px;color:var(--muted)\">Reading · Writing · Listening · Speaking · Vocabulario SRS</div>'+",
                "'<h2>Python desde cero</h2>'+\n    '<div style=\"font-size:13px;color:var(--muted)\">Variables · Ciclos · Estructuras de datos · Funciones · Robustez · Proyecto</div>'+")

# ---------- 14) viewHome -> versión Python ----------
i0, i1 = cut(src, 'function viewHome(){', '\nfunction viewLesson(id){')
VIEW_HOME = read('python_parts/view_home_py.js').rstrip()
src = src[:i0] + VIEW_HOME + '\n' + src[i1:]

# ---------- 15) viewProject -> Playground (se define en app_py.js): borrar el viejo ----------
i0, i1 = cut(src, 'function viewProject(){', '\nfunction viewBook(chapId){')
src = src[:i0] + src[i1+1:]
# y la REASIGNACIÓN tardía del inglés (viewProject = function(){...plan de estudio...})
i0, i1 = cut(src, "/* ---------- vista de proyecto → plan de estudio (solo inglés) ---------- */",
                    "\n/* ---------- demo de la portada: flashcards ---------- */")
src = src[:i0] + src[i1:]

# ---------- 16) inyectar capa Python de la app ----------
src = rep(src, 'function blockHtml(b, lessonId){',
                read('python_parts/app_py.js').rstrip() + '\n\nfunction blockHtml(b, lessonId){')

# ---------- 17) CSS (sql compartido + extras Python) en el primer </style> ----------
CSS = read('sql_parts/sql.css').rstrip() + '\n\n' + read('python_parts/python.css').rstrip()
k = src.index('</style>')
src = src[:k] + '\n' + CSS + '\n' + src[k:]

io.open('python.html', 'w', encoding='utf-8').write(src)
print('python.html generado:', len(src), 'bytes')
