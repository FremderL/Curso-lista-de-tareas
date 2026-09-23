# -*- coding: utf-8 -*-
"""Ensambla unreal.html a partir de ingles.html (patrón probado) + piezas del curso Unreal."""
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

# ---------- 0) sanea dataKey duplicado heredado (tolerante) ----------
if src.count("dataKey:'dataEn', dataKey:'dataEn' }") == 1:
    src = src.replace("dataKey:'dataEn', dataKey:'dataEn' }", "dataKey:'dataEn' }")

# ---------- 1) HEAD: título, meta, favicon ----------
src = rep(src, '<title>Curso interactivo · Inglés B1 Preliminary</title>',
                '<title>Curso interactivo · Unreal Engine desde cero</title>')
src = rep(src, 'content="Curso interactivo de inglés en español: prepara el B1 Preliminary de Cambridge con lectura, escritura, escucha, speaking y flashcards SRS."',
                'content="Curso interactivo de Unreal Engine 5.8 en español: Blueprints con un editor de nodos en tu navegador — Branch, ForLoop, arrays, Custom Events y un juego final calificado por salida."')
src = rep(src, "<text y='.9em' font-size='90'>📝</text>", "<text y='.9em' font-size='90'>🎮</text>")

# ---------- 2) SHELL: topbar ----------
src = rep(src, '<span class="logo-mark">🇬🇧</span>', '<span class="logo-mark">🎮</span>')
src = rep(src, '<small>Curso interactivo · Inglés B1 Preliminary</small>', '<small>Curso interactivo · Unreal Engine desde cero</small>')

# ---------- 3) Región de contenido: MODULES..TEXTBOOK -> curso Unreal ----------
i0 = src.index('const MODULES = [];')
i1 = src.index('/* ============================ EXTRAS DEL CURSO DE INGLÉS')

ca = read('ue_parts/content_ue_a.js')
lines = ca.split('\n')
for k, ln in enumerate(lines):
    if ln.strip().startswith('const MODULES'):
        del lines[k]; break
ca = '\n'.join(lines)
cb = read('ue_parts/content_ue_b.js')
eng = read('ue_parts/bpx_engine.js')
srs = read('ue_parts/srs_ue.js')
tb = read('ue_parts/textbook_ue.js')

header = """
'use strict';
/* ============================================================
   CURSO 6 · UNREAL ENGINE DESDE CERO (Blueprints)
   Plataforma compartida con los cursos 1-5 (misma base de cuentas)
   Motor BPX (simulador de Blueprints) + 30 lecciones + examen 30×300
   ============================================================ */
"""
region = header + 'const MODULES = [];\nconst DEMO_BP = {};\n\n' + eng.rstrip() + '\n\n' + ca.rstrip() + '\n\n' + cb.rstrip() + '\n\n' + tb.rstrip() + '\n\n'
src = src[:i0] + region + src[i1:]

# ---------- 4) SRS_DECKS -> mazo uecore ----------
i0 = src.index('const SRS_DECKS = {')
i1 = src.index('const SRS_INTERVALS')
src = src[:i0] + read('ue_parts/srs_ue.js').rstrip() + '\n' + src[i1:]

# ---------- 5) campo de datos dataEn -> dataUnreal (la entrada c3 del CAMPUS se queda) ----------
src = rep(src, "dataEn:'codecamp-en-v1'", "dataUnreal:'codecamp-ue-v1'")
src = rep(src, "if(cursoVacio(rec.dataEn)){ const o = legacyData(LEGACY_ALL.dataEn); if(o){ rec.dataEn = Object.assign(blankData(), o); movido = true; } }",
                "if(cursoVacio(rec.dataUnreal)){ const o = legacyData(LEGACY_ALL.dataUnreal); if(o){ rec.dataUnreal = Object.assign(blankData(), o); movido = true; } }")
src = rep(src, "if(u){ base = Object.assign(base, DB.users[u].dataEn || {}); }",
                "if(u){ base = Object.assign(base, DB.users[u].dataUnreal || {}); }")
src = rep(src, "if(u){ DB.users[u].dataEn = state; saveDB(); }",
                "if(u){ DB.users[u].dataUnreal = state; saveDB(); }")
src = rep(src, "DB.users[u].dataEn = blankData(); saveDB();",
                "DB.users[u].dataUnreal = blankData(); saveDB();")
n = src.count('dataEn')
assert n == 1, 'dataEn residual: %d (esperaba solo el del CAMPUS c3)' % n

# ---------- 6) blankData: campos Unreal ----------
src = rep(src, "function blankData(){ return { scores:{}, examScore:null, name:'', lastLesson:'0-1', srs:{} }; }",
                "function blankData(){ return { scores:{}, examScore:null, name:'', lastLesson:'0-1', srs:{}, ueCode:{}, ueOk:{}, playG:'' }; }")

# ---------- 7) lessonMax: sumar tareas bpex ----------
src = rep(src, "if(b.t==='exercise'){ b.checks.forEach(function(c){ max += (c.pts||10); }); }",
                "if(b.t==='exercise'){ b.checks.forEach(function(c){ max += (c.pts||10); }); }\n    if(b.t==='bpex'){ (b.tasks||[]).forEach(function(tk){ max += (tk.pts||10); }); }")

# ---------- 8) blockHtml: casos bpex / bp / nav / srs ----------
src = rep(src, "    case 'appdemo': return appDemoHtml();\n    default: return '';",
                "    case 'appdemo': return appDemoHtml();\n    case 'bpex': return ueExBlockHtml(b, lessonId);\n    case 'bp': return bpDemoHtml(b);\n    case 'nav': return ueNavHtml(b);\n    case 'srs': return srsHtml(b);\n    default: return '';")

# ---------- 9) CAMPUS: este curso + lista de cursos ----------
src = rep(src, "thisCourse:'c3',", "thisCourse:'c6',")
src = rep(src, "tagline:{ es:'Curso interactivo · Inglés B1 Preliminary', en:'Interactive course · English B1 Preliminary' }",
                "tagline:{ es:'Curso interactivo · Unreal Engine desde cero', en:'Interactive course · Unreal Engine from scratch' }")
src = rep(src, "  { id:'c5', file:'python.html',     emoji:'🐍', name:{es:'Python desde cero', en:'Python from scratch'}, total:30, max:4014, examMax:300, dataKey:'dataPy' }",
                "  { id:'c5', file:'python.html',     emoji:'🐍', name:{es:'Python desde cero', en:'Python from scratch'}, total:30, max:4014, examMax:300, dataKey:'dataPy' },\n  { id:'c6', file:'unreal.html',     emoji:'🎮', name:{es:'Unreal Engine desde cero', en:'Unreal Engine from scratch'}, total:30, max:TOTAL_MAX, examMax:300, dataKey:'dataUnreal' }")

# ---------- 10) I18N + etiquetas ----------
src = rep(src, "sb_project:'Proyecto final (código)', sb_report:'Boleta de calificaciones',",
                "sb_project:'Playground Unreal', sb_report:'Boleta de calificaciones',")
src = rep(src, "sb_project:'Final project (code)', sb_report:'Report card',",
                "sb_project:'Blueprints Playground', sb_report:'Report card',")
src = rep(src, """function __ccLabelOverrides(){
  I18N.es.sb_project = 'Plan de estudio + recursos';
  I18N.en.sb_project = 'Study plan + resources';
  I18N.es.sb_exam = 'Examen preliminar';
  I18N.en.sb_exam = 'Preliminary exam';
}""", """function __ccLabelOverrides(){
  I18N.es.sb_project = '🛝 Playground Unreal';
  I18N.en.sb_project = '🛝 Blueprints Playground';
  I18N.es.sb_exam = 'Examen final';
  I18N.en.sb_exam = 'Final exam';
}""")
src = rep(src, """h += '<button class="sextra" data-nav="project">📦 '+t('sb_project')+'</button>';""",
                """h += '<button class="sextra" data-nav="project">🛝 '+t('sb_project')+'</button>';""")
src = rep(src, """(pct >= 70 ? '<button class="btn small green" data-nav="project">📦 Ir por el código del proyecto</button>""",
                """(pct >= 70 ? '<button class="btn small green" data-nav="project">🛝 Ir al Playground</button>""")

# ---------- 11) sidebar: módulo abierto por defecto (m6 existe en este curso) ----------

# ---------- 12) viewExam: textos ----------
src = rep(src, '30 preguntas de TODO el curso (Módulos 1–6).', '30 preguntas de TODO el curso (Módulos 0–7).')
src = rep(src, 'data-nav="lesson" data-id="6-2">← Repasar la última lección',
                'data-nav="lesson" data-id="7-3">← Repasar la última lección')

# ---------- 13) viewReport: mensajes ----------
src = rep(src, "if(pct >= 90) msg = '🏆 Nivel: Desarrollador Web Destacado. ¡Dominio total!';",
                "if(pct >= 90) msg = '🏆 Nivel: Unreal Developer Destacado. ¡Dominio total!';")
src = rep(src, "else if(pct >= 70) msg = '🎉 ¡APROBADO! Ya sabes construir y publicar una aplicación web completa.';",
                "else if(pct >= 70) msg = '🎉 ¡APROBADO! Ya piensas en nodos: flujo, variables, arrays, Custom Events y un juego completo por turnos.';")
src = rep(src, "Tu progreso oficial del curso «Inglés B1 · Cambridge Preliminary». Cada quiz y ejercicio aprobado suma; tu mejor intento siempre cuenta.",
                "Tu progreso oficial del curso «Unreal Engine desde cero · CodeCamp». Cada quiz y cada tarea de Blueprints calificada por salida suma; tu mejor intento siempre cuenta.")
src = rep(src, "'<h2>Inglés Nivel B1 (Cambridge Preliminary)</h2>'+\n    '<div style=\"font-size:13px;color:var(--muted)\">Reading · Writing · Listening · Speaking · Vocabulario SRS</div>'+",
                "'<h2>Unreal Engine desde cero</h2>'+\n    '<div style=\"font-size:13px;color:var(--muted)\">Blueprints · Nodos y flujo · Variables · Arrays · Custom Events · Proyecto</div>'+")

# ---------- 14) viewHome -> versión Unreal ----------
i0, i1 = cut(src, 'function viewHome(){', '\nfunction viewLesson(id){')
VIEW_HOME = read('ue_parts/view_home_ue.js').rstrip()
src = src[:i0] + VIEW_HOME + '\n' + src[i1:]

# ---------- 15) viewProject -> Playground (se define en app_ue.js): borrar el viejo ----------
i0, i1 = cut(src, 'function viewProject(){', '\nfunction viewBook(chapId){')
src = src[:i0] + src[i1+1:]
i0, i1 = cut(src, "/* ---------- vista de proyecto → plan de estudio (solo inglés) ---------- */",
                    "\n/* ---------- demo de la portada: flashcards ---------- */")
src = src[:i0] + src[i1:]

# ---------- 16) inyectar capa Unreal de la app ----------
src = rep(src, 'function blockHtml(b, lessonId){',
                read('ue_parts/app_ue.js').rstrip() + '\n\nfunction blockHtml(b, lessonId){')

# ---------- 17) CSS (sql compartido + unreal) en el primer </style> ----------
CSS = read('sql_parts/sql.css').rstrip() + '\n\n' + read('ue_parts/unreal.css').rstrip()
k = src.index('</style>')
src = src[:k] + '\n' + CSS + '\n' + src[k:]

io.open('unreal.html', 'w', encoding='utf-8').write(src)
print('unreal.html generado:', len(src), 'bytes')
