# 📝 Curso interactivo: crea tu Lista de Tareas con HTML, CSS y JS

Página web interactiva y 100% en español que enseña, paso a paso, a construir una
**lista de tareas real** (to-do list): HTML → CSS → JavaScript → Bootstrap →
localStorage → PWA (manifest + service worker) → publicación en GitHub Pages y Render.

- **6 módulos · 29 lecciones** explicadas con analogías, ejemplos y errores comunes.
- **Editores de código en vivo**: escribes HTML/CSS/JS y lo ejecutas al instante.
- **Quizzes y 3 ejercicios calificados** automáticamente (puntos por pregunta).
- **Examen final, boleta de calificaciones y certificado** con tu nombre.
- **Progreso guardado** en `localStorage`.
- Un solo archivo para el curso (`index.html`), sin dependencias: funciona **offline**.

---

## 📁 Archivos del proyecto

```
├── index.html      ← EL CURSO COMPLETO (todo va dentro de este archivo)
├── render.yaml     ← configuración para desplegar en Render (Blueprint)
├── server.js       ← servidor opcional (Web Service de Render / npm start)
├── package.json    ← define el comando npm start
└── README.md       ← este archivo
```

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

¡Feliz aprendizaje! 🚀
