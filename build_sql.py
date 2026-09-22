# -*- coding: utf-8 -*-
"""Ensambla sql.html a partir de ingles.html (patrón probado) + piezas del curso SQL."""
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

# ---------- 1) HEAD: título, meta, favicon ----------
src = rep(src, '<title>Curso interactivo · Inglés B1 Preliminary</title>',
                '<title>Curso interactivo · Bases de datos SQL</title>')
src = rep(src, 'content="Curso interactivo de inglés en español: prepara el B1 Preliminary de Cambridge con lectura, escritura, escucha, speaking y flashcards SRS."',
                'content="Curso interactivo de SQL en español: SELECT, JOINs, agregación, subconsultas, DML/DDL, transacciones y funciones de ventana con un mini-motor SQL 100% en tu navegador."')
src = rep(src, "<text y='.9em' font-size='90'>📝</text>", "<text y='.9em' font-size='90'>🗄️</text>")

# ---------- 2) SHELL: topbar ----------
src = rep(src, '<span class="logo-mark">🇬🇧</span>', '<span class="logo-mark">🗄️</span>')
src = rep(src, '<small>Curso interactivo · Inglés B1 Preliminary</small>', '<small>Curso interactivo · Bases de datos SQL</small>')

# ---------- 3) Región de contenido: MODULES..TEXTBOOK -> curso SQL ----------
i0 = src.index('const MODULES = [];')
i1 = src.index('/* ============================ EXTRAS DEL CURSO DE INGLÉS')

ca = read('sql_parts/content_a.js')
lines = ca.split('\n')
for k, ln in enumerate(lines):
    if ln.strip().startswith('const MODULES'):
        del lines[k]; break
ca = '\n'.join(lines)
cb = read('sql_parts/content_b.js')
eng = read('sql_parts/sql_engine.js')
db = read('sql_parts/db.js')
tb = read('sql_parts/textbook.js')

header = """
'use strict';
/* ============================================================
   CURSO 4 · BASES DE DATOS SQL DESDE CERO
   Plataforma compartida con los cursos 1-3 (misma base de cuentas)
   Mini-motor SQLE + base «Librería Esperanza» + 30 lecciones
   ============================================================ */
"""
region = header + ca.rstrip() + '\n\n' + cb.rstrip() + '\n\n' + eng.rstrip() + '\n\n' + db.rstrip() + '\n\n' + tb.rstrip() + '\n\n'
src = src[:i0] + 'const MODULES = [];\n' + region + src[i1:]

# ---------- 4) SRS_DECKS -> mazo SQL ----------
i0 = src.index('const SRS_DECKS = {')
i1 = src.index('const SRS_INTERVALS')
src = src[:i0] + read('sql_parts/srs.js').rstrip() + '\n' + src[i1:]

# ---------- 5) campo de datos dataEn -> dataSql ----------
n = src.count('dataEn')
assert n == 8, 'dataEn inesperado: %d' % n
src = src.replace('dataEn', 'dataSql')
src = rep(src, "dataSql:'codecamp-en-v1'", "dataSql:'codecamp-sql-v1'")

# ---------- 6) blankData: campos SQL ----------
src = rep(src, "function blankData(){ return { scores:{}, examScore:null, name:'', lastLesson:'0-1', srs:{} }; }",
                "function blankData(){ return { scores:{}, examScore:null, name:'', lastLesson:'0-1', srs:{}, sqlCode:{}, sqlOk:{}, play:'' }; }")

# ---------- 7) lessonMax: sumar tareas sqlex ----------
src = rep(src, "if(b.t==='exercise'){ b.checks.forEach(function(c){ max += (c.pts||10); }); }",
                "if(b.t==='exercise'){ b.checks.forEach(function(c){ max += (c.pts||10); }); }\n    if(b.t==='sqlex'){ (b.tasks||[]).forEach(function(tk){ max += (tk.pts||10); }); }")

# ---------- 8) blockHtml: casos sqlex / srs / er ----------
src = rep(src, "    case 'appdemo': return appDemoHtml();\n    default: return '';",
                "    case 'appdemo': return appDemoHtml();\n    case 'sqlex': return sqlExBlockHtml(b, lessonId);\n    case 'srs': return srsHtml(b);\n    case 'er': return erHtml(b);\n    default: return '';")

# ---------- 9) CAMPUS: este curso + lista de cursos ----------
src = rep(src, "thisCourse:'c3',", "thisCourse:'c4',")
src = rep(src, "tagline:{ es:'Curso interactivo · Inglés B1 Preliminary', en:'Interactive course · English B1 Preliminary' }",
                "tagline:{ es:'Curso interactivo · Bases de datos SQL', en:'Interactive course · SQL Databases' }")
src = rep(src, "{ id:'c3', file:'ingles.html',     emoji:'🇬🇧', name:{es:'Inglés B1', en:'English B1'},         total:34, max:4329, examMax:300, dataKey:'dataSql' }",
                "{ id:'c3', file:'ingles.html',     emoji:'🇬🇧', name:{es:'Inglés B1', en:'English B1'},         total:34, max:4329, examMax:300, dataKey:'dataEn' },\n    { id:'c4', file:'sql.html',        emoji:'🗄️', name:{es:'Bases de datos SQL', en:'SQL Databases'}, total:30, max:TOTAL_MAX, examMax:300, dataKey:'dataSql' }")

# ---------- 10) I18N + etiquetas ----------
src = rep(src, "sb_project:'Proyecto final (código)', sb_report:'Boleta de calificaciones',",
                "sb_project:'Playground SQL', sb_report:'Boleta de calificaciones',")
src = rep(src, "sb_project:'Final project (code)', sb_report:'Report card',",
                "sb_project:'SQL Playground', sb_report:'Report card',")
src = rep(src, """function __ccLabelOverrides(){
  I18N.es.sb_project = 'Plan de estudio + recursos';
  I18N.en.sb_project = 'Study plan + resources';
  I18N.es.sb_exam = 'Examen preliminar';
  I18N.en.sb_exam = 'Preliminary exam';
}""", """function __ccLabelOverrides(){
  I18N.es.sb_project = '🛝 Playground SQL';
  I18N.en.sb_project = '🛝 SQL Playground';
  I18N.es.sb_exam = 'Examen final';
  I18N.en.sb_exam = 'Final exam';
}""")
src = rep(src, "h += '<button class=\"sextra\" data-nav=\"project\">📦 '+t('sb_project')+'</button>';",
                "h += '<button class=\"sextra\" data-nav=\"project\">🛝 '+t('sb_project')+'</button>';")
src = rep(src, "(pct >= 70 ? '<button class=\"btn small green\" data-nav=\"project\">📦 Ir por el código del proyecto</button>",
                "(pct >= 70 ? '<button class=\"btn small green\" data-nav=\"project\">🛝 Ir al Playground</button>")

# ---------- 11) sidebar: módulo abierto por defecto ----------
src = rep(src, "(route.view !== 'lesson' && route.view !== 'home' && m.id === 'm6')",
                "(route.view !== 'lesson' && route.view !== 'home' && m.id === 'm4')")

# ---------- 12) viewExam: textos ----------
src = rep(src, '30 preguntas de TODO el curso (Módulos 1–6).', '30 preguntas de TODO el curso (Módulos 0–7).')
src = rep(src, 'data-nav=\"lesson\" data-id=\"6-2\">← Repasar la última lección',
                'data-nav=\"lesson\" data-id=\"7-2\">← Repasar la última lección')

# ---------- 13) viewReport: mensajes ----------
src = rep(src, "if(pct >= 90) msg = '🏆 Nivel: Desarrollador Web Destacado. ¡Dominio total!';",
                "if(pct >= 90) msg = '🏆 Nivel: Analista de Datos Destacado. ¡Dominio total!';")
src = rep(src, "else if(pct >= 70) msg = '🎉 ¡APROBADO! Ya sabes construir y publicar una aplicación web completa.';",
                "else if(pct >= 70) msg = '🎉 ¡APROBADO! Ya sabes consultar, modificar y diseñar bases de datos con SQL.';")
src = rep(src, "Tu progreso oficial del curso «Inglés B1 · Cambridge Preliminary». Cada quiz y ejercicio aprobado suma; tu mejor intento siempre cuenta.",
                "Tu progreso oficial del curso «Bases de datos SQL desde cero · CodeCamp». Cada quiz, tarea SQL y ejercicio aprobado suma; tu mejor intento siempre cuenta.")
src = rep(src, "'<h2>Inglés Nivel B1 (Cambridge Preliminary)</h2>'+\n    '<div style=\"font-size:13px;color:var(--muted)\">Reading · Writing · Listening · Speaking · Vocabulario SRS</div>'+",
                "'<h2>Bases de datos SQL desde cero</h2>'+\n    '<div style=\"font-size:13px;color:var(--muted)\">SELECT · JOINs · Agregación · Subconsultas · DML/DDL · Funciones de ventana</div>'+")

# ---------- 14) viewHome -> versión SQL ----------
i0, i1 = cut(src, 'function viewHome(){', '\nfunction viewLesson(id){')
VIEW_HOME = read('sql_parts/view_home.js').rstrip()
src = src[:i0] + VIEW_HOME + '\n' + src[i1:]

# ---------- 15) viewProject -> Playground (se define en app_sql.js): borrar el viejo ----------
i0, i1 = cut(src, 'function viewProject(){', '\nfunction viewBook(chapId){')
src = src[:i0] + src[i1+1:]
# y la REASIGNACIÓN tardía del inglés (viewProject = function(){...plan de estudio...})
i0, i1 = cut(src, "/* ---------- vista de proyecto → plan de estudio (solo inglés) ---------- */",
                    "\n/* ---------- demo de la portada: flashcards ---------- */")
src = src[:i0] + src[i1:]

# ---------- 16) inyectar capa SQL de la app ----------
src = rep(src, 'function blockHtml(b, lessonId){',
                read('sql_parts/app_sql.js').rstrip() + '\n\nfunction blockHtml(b, lessonId){')

# ---------- 17) CSS del curso SQL (primera ocurrencia: el </style> real) ----------
CSS = read('sql_parts/sql.css').rstrip()
k = src.index('</style>')
src = src[:k] + '\n' + CSS + '\n' + src[k:]

io.open('sql.html', 'w', encoding='utf-8').write(src)
print('sql.html generado:', len(src), 'bytes')
