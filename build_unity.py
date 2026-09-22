# -*- coding: utf-8 -*-
"""Ensambla unity.html a partir de ingles.html (patrón probado) + piezas del curso Unity (C#)."""
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
                '<title>Curso interactivo · Unity desde cero (C#)</title>')
src = rep(src, 'content="Curso interactivo de inglés en español: prepara el B1 Preliminary de Cambridge con lectura, escritura, escucha, speaking y flashcards SRS."',
                'content="Curso interactivo de Unity 6.3 LTS en español: aprende C# desde cero con un mini-interpreter en tu navegador — WriteLine, ciclos, clases, List, Vector3, Random con semilla y un juego final calificado por salida."')
src = rep(src, "<text y='.9em' font-size='90'>📝</text>", "<text y='.9em' font-size='90'>🕹️</text>")

# ---------- 2) SHELL: topbar ----------
src = rep(src, '<span class="logo-mark">🇬🇧</span>', '<span class="logo-mark">🕹️</span>')
src = rep(src, '<small>Curso interactivo · Inglés B1 Preliminary</small>', '<small>Curso interactivo · Unity desde cero</small>')

# ---------- 3) Región de contenido: MODULES..TEXTBOOK -> curso Unity ----------
i0 = src.index('const MODULES = [];')
i1 = src.index('/* ============================ EXTRAS DEL CURSO DE INGLÉS')

ca = read('unity_parts/content_unity_a.js')
lines = ca.split('\n')
for k, ln in enumerate(lines):
    if ln.strip().startswith('const MODULES'):
        del lines[k]; break
ca = '\n'.join(lines)
cb = read('unity_parts/content_unity_b.js')
cc = read('unity_parts/content_unity_c.js')
eng = read('unity_parts/ucs_engine.js')
tb = read('unity_parts/textbook_unity.js')

header = """
'use strict';
/* ============================================================
   CURSO 7 · UNITY DESDE CERO (C#)
   Plataforma compartida con los cursos 1-6 (misma base de cuentas)
   Mini-interpreter UCS + 30 lecciones + examen 30×300
   ============================================================ */
"""
region = header + ca.rstrip() + '\n\n' + cb.rstrip() + '\n\n' + cc.rstrip() + '\n\n' + eng.rstrip() + '\n\n' + tb.rstrip() + '\n\n'
src = src[:i0] + 'const MODULES = [];\n' + region + src[i1:]

# ---------- 4) SRS_DECKS -> mazo C# ----------
i0 = src.index('const SRS_DECKS = {')
i1 = src.index('const SRS_INTERVALS')
src = src[:i0] + read('unity_parts/srs_unity.js').rstrip() + '\n' + src[i1:]

# ---------- 5) campo de datos dataEn -> dataUnity (la entrada c3 del CAMPUS se queda) ----------
src = rep(src, "dataEn:'codecamp-en-v1'", "dataUnity:'codecamp-unity-v1'")
src = rep(src, "if(cursoVacio(rec.dataEn)){ const o = legacyData(LEGACY_ALL.dataEn); if(o){ rec.dataEn = Object.assign(blankData(), o); movido = true; } }",
                "if(cursoVacio(rec.dataUnity)){ const o = legacyData(LEGACY_ALL.dataUnity); if(o){ rec.dataUnity = Object.assign(blankData(), o); movido = true; } }")
src = rep(src, "if(u){ base = Object.assign(base, DB.users[u].dataEn || {}); }",
                "if(u){ base = Object.assign(base, DB.users[u].dataUnity || {}); }")
src = rep(src, "if(u){ DB.users[u].dataEn = state; saveDB(); }",
                "if(u){ DB.users[u].dataUnity = state; saveDB(); }")
src = rep(src, "DB.users[u].dataEn = blankData(); saveDB();",
                "DB.users[u].dataUnity = blankData(); saveDB();")
n = src.count('dataEn')
assert n == 1, 'dataEn residual: %d (esperaba solo el del CAMPUS c3)' % n

# ---------- 6) blankData: campos Unity ----------
src = rep(src, "function blankData(){ return { scores:{}, examScore:null, name:'', lastLesson:'0-1', srs:{} }; }",
                "function blankData(){ return { scores:{}, examScore:null, name:'', lastLesson:'0-1', srs:{}, ucsCode:{}, ucsOk:{}, play:'', playIn:'' }; }")

# ---------- 7) lessonMax: sumar tareas ucs (pyex) ----------
src = rep(src, "if(b.t==='exercise'){ b.checks.forEach(function(c){ max += (c.pts||10); }); }",
                "if(b.t==='exercise'){ b.checks.forEach(function(c){ max += (c.pts||10); }); }\n    if(b.t==='pyex'){ (b.tasks||[]).forEach(function(tk){ max += (tk.pts||10); }); }")

# ---------- 8) blockHtml: casos pyex / srs / flow ----------
src = rep(src, "    case 'appdemo': return appDemoHtml();\n    default: return '';",
                "    case 'appdemo': return appDemoHtml();\n    case 'pyex': return pyExBlockHtml(b, lessonId);\n    case 'srs': return srsHtml(b);\n    case 'flow': return flowHtml(b);\n    default: return '';")

# ---------- 9) CAMPUS: este curso + lista de cursos ----------
src = rep(src, "thisCourse:'c3',", "thisCourse:'c7',")
src = rep(src, "  { id:'c6', file:'unreal.html',     emoji:'🎮', name:{es:'Unreal Engine desde cero', en:'Unreal Engine from scratch'}, total:30, max:4055, examMax:300, dataKey:'dataUnreal' }",
                "  { id:'c6', file:'unreal.html',     emoji:'🎮', name:{es:'Unreal Engine desde cero', en:'Unreal Engine from scratch'}, total:30, max:4055, examMax:300, dataKey:'dataUnreal' },\n  { id:'c7', file:'unity.html',      emoji:'🕹️', name:{es:'Unity desde cero (C#)', en:'Unity from scratch (C#)'}, total:30, max:TOTAL_MAX, examMax:300, dataKey:'dataUnity' }")

# ---------- 10) I18N + etiquetas ----------
src = rep(src, "sb_project:'Proyecto final (código)', sb_report:'Boleta de calificaciones',",
                "sb_project:'Playground C#', sb_report:'Boleta de calificaciones',")
src = rep(src, "sb_project:'Final project (code)', sb_report:'Report card',",
                "sb_project:'C# Playground', sb_report:'Report card',")
src = rep(src, """function __ccLabelOverrides(){
  I18N.es.sb_project = 'Plan de estudio + recursos';
  I18N.en.sb_project = 'Study plan + resources';
  I18N.es.sb_exam = 'Examen preliminar';
  I18N.en.sb_exam = 'Preliminary exam';
}""", """function __ccLabelOverrides(){
  I18N.es.sb_project = '🛝 Playground C#';
  I18N.en.sb_project = '🛝 C# Playground';
  I18N.es.sb_exam = 'Examen final';
  I18N.en.sb_exam = 'Final exam';
}""")
src = rep(src, """h += '<button class="sextra" data-nav="project">📦 '+t('sb_project')+'</button>';""",
                """h += '<button class="sextra" data-nav="project">🛝 '+t('sb_project')+'</button>';""")
src = rep(src, """(pct >= 70 ? '<button class="btn small green" data-nav="project">📦 Ir por el código del proyecto</button>""",
                """(pct >= 70 ? '<button class="btn small green" data-nav="project">🛝 Ir al Playground</button>""")

# ---------- 11) sidebar: módulo abierto por defecto (el examen vive en m7) ----------
src = rep(src, "(route.view !== 'lesson' && route.view !== 'home' && m.id === 'm6')",
                "(route.view !== 'lesson' && route.view !== 'home' && m.id === 'm7')")

# ---------- 12) viewExam: textos ----------
src = rep(src, '30 preguntas de TODO el curso (Módulos 1–6).', '30 preguntas de TODO el curso (Módulos 0–7).')
src = rep(src, 'data-nav="lesson" data-id="6-2">← Repasar la última lección',
                'data-nav="lesson" data-id="7-2">← Repasar la última lección')

# ---------- 13) viewReport: mensajes ----------
src = rep(src, "if(pct >= 90) msg = '🏆 Nivel: Desarrollador Web Destacado. ¡Dominio total!';",
                "if(pct >= 90) msg = '🏆 Nivel: Game Developer Destacado. ¡Dominio total!';")
src = rep(src, "else if(pct >= 70) msg = '🎉 ¡APROBADO! Ya sabes construir y publicar una aplicación web completa.';",
                "else if(pct >= 70) msg = '🎉 ¡APROBADO! Ya sabes escribir programas completos en C#: datos, ciclos, clases y manejo de errores. La puerta a Unity está abierta.';")
src = rep(src, "Tu progreso oficial del curso «Inglés B1 · Cambridge Preliminary». Cada quiz y ejercicio aprobado suma; tu mejor intento siempre cuenta.",
                "Tu progreso oficial del curso «Unity desde cero · CodeCamp». Cada quiz y cada ejercicio calificado por salida suma; tu mejor intento siempre cuenta.")
src = rep(src, "'<h2>Inglés Nivel B1 (Cambridge Preliminary)</h2>'+\n    '<div style=\"font-size:13px;color:var(--muted)\">Reading · Writing · Listening · Speaking · Vocabulario SRS</div>'+",
                "'<h2>Unity desde cero (C#)</h2>'+\n    '<div style=\"font-size:13px;color:var(--muted)\">C# · Tipos exactos · Ciclos · Clases · List · Vector3 · Mathf · Random · Proyecto</div>'+")

# ---------- 14) viewHome -> versión Unity ----------
i0, i1 = cut(src, 'function viewHome(){', '\nfunction viewLesson(id){')
VIEW_HOME = read('unity_parts/view_home_unity.js').rstrip()
src = src[:i0] + VIEW_HOME + '\n' + src[i1:]

# ---------- 15) viewProject -> Playground (se define en app_unity.js): borrar el viejo ----------
i0, i1 = cut(src, 'function viewProject(){', '\nfunction viewBook(chapId){')
src = src[:i0] + src[i1+1:]
i0, i1 = cut(src, "/* ---------- vista de proyecto → plan de estudio (solo inglés) ---------- */",
                    "\n/* ---------- demo de la portada: flashcards ---------- */")
src = src[:i0] + src[i1:]

# ---------- 16) inyectar capa Unity de la app ----------
src = rep(src, 'function blockHtml(b, lessonId){',
                read('unity_parts/app_unity.js').rstrip() + '\n\nfunction blockHtml(b, lessonId){')

# ---------- 17) CSS (sql compartido + python: estilos pyex/playground) en el primer </style> ----------
CSS = read('sql_parts/sql.css').rstrip() + '\n\n' + read('python_parts/python.css').rstrip()
k = src.index('</style>')
src = src[:k] + '\n' + CSS + '\n' + src[k:]

io.open('unity.html', 'w', encoding='utf-8').write(src)
print('unity.html generado:', len(src), 'bytes')
