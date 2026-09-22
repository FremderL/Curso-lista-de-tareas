// ============================================================
// server.js — servidor del campus CodeCamp (4 cursos)
// Sirve los archivos estáticos del campus:
//   index.html      ← Curso 1: Lista de Tareas
//   javascript.html ← Curso 2: JavaScript + Juego de Memoria
//   ingles.html     ← Curso 3: Inglés B1 Preliminary
//   sql.html        ← Curso 4: Bases de datos SQL
// Ejecutar local: npm start  ·  En Render: Web Service o Static Site
// ============================================================
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.md':   'text/markdown; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.yaml': 'text/yaml; charset=utf-8',
  '.yml':  'text/yaml; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.txt':  'text/plain; charset=utf-8'
};

const server = http.createServer(function (req, res) {
  try{
    let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if(urlPath === '/' || urlPath === '') urlPath = '/index.html';

    // resolver dentro de la carpeta del proyecto (sin escaparse)
    const filePath = path.normalize(path.join(ROOT, urlPath));
    if(!filePath.startsWith(ROOT)){
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('403 Prohibido');
    }

    fs.stat(filePath, function(err, st){
      if(err || !st.isFile()){
        // ruta desconocida → portada del campus
        const home = path.join(ROOT, 'index.html');
        res.writeHead(200, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-cache' });
        return fs.createReadStream(home).pipe(res);
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Cache-Control': 'no-cache'
      });
      fs.createReadStream(filePath).pipe(res);
    });
  }catch(e){
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('500 Error: ' + e.message);
  }
});

server.listen(PORT, function () {
  console.log('✅ Campus CodeCamp corriendo en http://localhost:' + PORT);
  console.log('   📝 Curso 1 · Lista de Tareas   → /');
  console.log('   🎮 Curso 2 · Juego de Memoria  → /javascript.html');
  console.log('   🇬🇧 Curso 3 · Inglés B1        → /ingles.html');
});
