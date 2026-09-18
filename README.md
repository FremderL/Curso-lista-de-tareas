# 🎓 CodeCamp · Campus de cursos interactivos

Plataforma web educativa, 100% en español, con **tres cursos interactivos** que
comparten cuentas (usuario + PIN) y estilo:

| Curso | Archivo | Proyecto final |
|-------|---------|----------------|
| 📝 **Curso 1: Crea tu Lista de Tareas** | `index.html` | App HTML/CSS/JS + Bootstrap + localStorage + PWA publicada |
| 🃏 **Curso 2: JavaScript y el Juego de Memoria** | `javascript.html` | Juego completo con clases, POO, animación 3D y récords |
| 🇬🇧 **Curso 3: Inglés B1 Preliminary** | `ingles.html` | Mock B1 (Reading/Writing/Listening/Speaking) + flashcards SRS + audio |

Los tres incluyen: lecciones explicadas, actividades calificadas automáticamente,
**libro de texto con bibliografía real**, login local multiusuario, boleta de
calificaciones, examen final de **30 preguntas** y certificado. Además, los tres
comparten el **menú de usuario** (arriba a la derecha): moverse entre cursos,
iniciar/cerrar sesión, ver el perfil con el progreso de cada curso y cambiar el
idioma de la interfaz (🇪🇸 Español / 🇬🇧 English, se guarda en tu cuenta).

---

## 📝 Curso 1: Crea tu Lista de Tareas con HTML, CSS y JS

Construye paso a paso una **lista de tareas real** (to-do list):
HTML → CSS → JavaScript → Bootstrap → localStorage → PWA (manifest + service worker) → publicación en GitHub Pages y Render.

### Curso 1 (29 lecciones)
- **📘 Libro de texto** con 8 capítulos técnicos de profundización y **bibliografía real**
  (Robbins, Duckett, Flanagan, Haverbeke, Meyer & Weyl, Osmani, Ater, Chacon & Straub…).

---

## 🃏 Curso 2: JavaScript y el Juego de Memoria (`javascript.html`)

- **6 módulos · 26 lecciones**: arrays a fondo —incluida **cómo funcionan por
  dentro** (referencias, copia superficial vs `structuredClone`, costos O(1)/O(n))
  —, métodos (`map/filter/find/sort`, Fisher-Yates), objetos y funciones avanzadas
  (arrows, callbacks, spread, destructuring), **clases y los 4 pilares de la POO**
  (abstracción, encapsulamiento con `#`, herencia con `extends/super`,
  polimorfismo), DOM por lotes (DocumentFragment), delegación de eventos,
  `setTimeout/setInterval`, CSS 3D y récords con localStorage.
- **26 ejercicios calificados: uno por lección**, incluidos 4 proyectos guiados
  (crearMazo, mazo de objetos, clase Carta, lógica del turno).
- **Proyecto final: Juego de Memoria jugable** (3 niveles de dificultad, volteo 3D,
  cronómetro y récords) con su demo integrada y el código completo comentado.
- **📘 Libro de texto JS**: algoritmos del juego, event loop, POO/prototipos y
  bibliografía (Haverbeke, Flanagan, Simpson, Osmani, Bhargava…).
- **🔐 Login con cuentas locales** (usuario + PIN): ideal para computadoras compartidas de
  clase — cada persona conserva su propio progreso, examen y certificado.
- **Editores de código en vivo**: escribes HTML/CSS/JS y lo ejecutas al instante.
- **Quizzes y 26 ejercicios calificados** automáticamente (puntos por pregunta).
- **Examen final de 30 preguntas** (300 puntos, se aprueba con 210), boleta de calificaciones y certificado con tu nombre.
- **Progreso guardado** en `localStorage`, **Modo de recuperación** (si algo falla,
  puedes reparar o reiniciar tú mismo sin perder acceso) y **cuenta compartida**
  con el Curso 1.
- Un solo archivo para el curso (`javascript.html`), sin dependencias: funciona **offline**.

---

## 🇬🇧 Curso 3: Inglés B1 Preliminary (`ingles.html`)

Preparación alineada al **formato oficial de Cambridge B1 Preliminary** (4 papers, 25% cada uno):

- **8 módulos · 34 lecciones · 34 actividades calificadas** (una por lección):
  Reading (6 partes reales), Writing (email, artículo, historia con rúbricas),
  Listening (con audio en tu navegador vía Web Speech API: ▶ normal y 🐢 lento,
  más transcripciones) y Speaking (técnica D-O-M-I-N-O, R-R-D, pares mínimos).
- **🃏 Repaso del día (SRS)**: flashcards con repetición espaciada (sistema Leitner,
  cajas 1→2→4→8→16 días) con dos mazos: **45 verbos irregulares** (base, pasado,
  participio, 3.ª persona, -ing) y **vocabulario B1** con ejemplos. Tu progreso
  se guarda en tu cuenta.
- **MOCK B1** con las 4 secciones y calificación estimada en la **escala Cambridge
  (140–190)**, diagnóstico inicial de 20 preguntas y plan de estudio de 12 semanas.
- **📘 Libro de texto**: guía del examen, gramática esencial, **tabla completa de
  los 45 verbos irregulares** y vocabulario + bibliografía real (Murphy, Objective
  Preliminary, Complete Preliminary, English Vocabulary in Use, English File,
  handbook oficial de Cambridge).
- **🔐 Menú de usuario global** compartido por los tres cursos (arriba a la derecha).

---

## 👤 Menú de usuario del campus (los 3 cursos)

En la esquina superior derecha vive el menú de tu cuenta, idéntico en todo el campus:

| Opción | Qué hace |
|---|---|
| 👤 **Ver mi perfil** | Tu nombre, @usuario, miembro desde y el **progreso de cada curso** (lecciones, puntos y examen), con enlaces directos |
| 📚 **Cursos** | Saltar entre 📝 Lista de Tareas · 🎮 Juego de Memoria · 🇬🇧 Inglés B1 (muestra el % de cada uno) |
| 🔑 **Sesión** | Iniciar sesión o cerrarla (cuenta compartida entre cursos) |
| 🌐 **Idioma** | 🇪🇸 Español o 🇬🇧 English: traduce menús, pantalla de acceso y controles; la preferencia **se guarda en tu cuenta** |

---

## 📁 Archivos del proyecto

```
├── index.html       ← CURSO 1 completo (Lista de Tareas)
├── javascript.html  ← CURSO 2 completo (JavaScript + Juego de Memoria)
├── ingles.html      ← CURSO 3 completo (Inglés B1 Preliminary)
├── ingles-plan.md   ← plan de diseño del curso de inglés
├── render.yaml      ← configuración para desplegar en Render (Blueprint)
├── server.js        ← servidor opcional (Web Service de Render / npm start)
├── package.json     ← define el comando npm start
└── README.md        ← este archivo
```

> 🔗 Ambos cursos se enlazan entre sí desde sus portadas, comparten el login y el
> mismo despliegue: súbelos juntos a GitHub/Render y tendrás el campus en línea.

---

## 🗺️ Siguientes pasos del campus

- **Depuración y optimización** general del código de los 3 cursos.
- **Más material educativo** por curso (p. ej. ampliar la lista de verbos irregulares
  con más columnas y ejercicios).
- El diseño pedagógico del curso de inglés quedó documentado en
  **[`ingles-plan.md`](ingles-plan.md)** (formato oficial B1: Reading 6 partes,
  Writing 2, Listening 4, Speaking 4 — 25% cada uno).

---

## 💻 Ejecutarlo en tu computadora

**Opción A — Doble clic (la más simple)**
1. Descarga la carpeta del proyecto.
2. Abre `index.html` con doble clic (Chrome, Edge o Firefox).
3. Listo: el curso funciona completo, incluso sin internet.

**Opción B — Con Node.js (recomendada, como un servidor real)**
```bash
npm start
```
Abre `http://localhost:3000` en tu navegador.

**Opción C — Con Python 3**
```bash
python3 -m http.server 8000
```
Abre `http://localhost:8000`.

**Opción D — Con VS Code**
Instala la extensión *Live Server*, clic derecho sobre `index.html` → *Open with Live Server*.

> 💡 Al ejecutarlo en tu computadora (opciones B/C/D) el progreso, los puntos y el
> certificado se guardan de forma permanente entre sesiones.

---

## ☁️ Subirlo a Render (página web pública)

Render aloja sitios estáticos **gratis**, con **HTTPS automático** y **despliegue
automático** en cada `git push`.

### Paso 1 · Sube el proyecto a GitHub
```bash
git init
git add .
git commit -m "Curso: lista de tareas"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/mi-lista-de-tareas.git
git push -u origin main
```

### Paso 2 · Crea el sitio en Render (opción fácil: Blueprint)
1. Entra a [render.com](https://render.com) y regístrate (puedes usar tu cuenta de GitHub).
2. Dashboard → **New +** → **Blueprint**.
3. Selecciona tu repositorio → **Apply**.
   Render lee `render.yaml` y configura todo solo.
4. En 1–2 minutos tu curso estará en: `https://mi-lista-de-tareas.onrender.com`

### Paso 2 alternativo · Static Site manual
1. Dashboard → **New +** → **Static Site** → conecta tu repositorio.
2. Configura así:

   | Campo             | Valor                              |
   |-------------------|------------------------------------|
   | Name              | `mi-lista-de-tareas`               |
   | Branch            | `main`                             |
   | Build Command     | *(déjalo vacío)*                   |
   | Publish Directory | `.`                                |

3. **Create Static Site** y espera el primer despliegue.

### Actualizar la página publicada
```bash
git add .
git commit -m "Mejoras al curso"
git push
```
Render redespliega automáticamente en ~1 minuto.

> ✅ Como Render sirve por **HTTPS**, tu service worker y la PWA funcionarán
> perfectamente en producción. Los **Static Sites** de Render son gratis y no se
> "duermen" (a diferencia de los Web Services gratuitos, que pausan tras 15 min
> de inactividad).

---

## 🎓 ¿Qué enseña el curso?

| Módulo | Contenido |
|--------|-----------|
| 🧱 HTML | Etiquetas, `<head>`, jerarquía de títulos, `<form>` + `<input>`, listas `<ul>` |
| 🎨 CSS | Selectores, colores, modelo de caja, `:hover`, transiciones, flexbox |
| ⚡ JavaScript | DOM, `getElementById`, eventos y `onclick`, `createElement`/`appendChild`, agregar/borrar/completar tareas |
| 💜 Bootstrap | CDN, navbar funcional, botones, cards, utilidades |
| 💾 localStorage y PWA | Guardar/cargar tareas, `manifest.json`, service worker, modo offline |
| 🚀 Publicar | Git y GitHub, GitHub Pages, **Render** |
| 📘 Libro de texto | 8 capítulos técnicos: el navegador por dentro, accesibilidad WCAG, especificidad CSS, closures/event loop, delegación y XSS, almacenamiento y estrategias de caché, Git por interno + bibliografía |

¡Feliz aprendizaje! 🚀
