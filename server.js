// ============================================================
// server.js — servidor opcional para ejecutar el curso
// Úsalo si prefieres desplegar en Render como "Web Service"
// en lugar de "Static Site", o para correrlo local con: npm start
// ============================================================
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const FILE = path.join(__dirname, 'index.html');

const server = http.createServer(function (req, res) {
  // Cualquier ruta sirve el curso (usa navegación interna con #)
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-cache'
  });
  fs.createReadStream(FILE).pipe(res);
});

server.listen(PORT, function () {
  console.log('✅ Curso "Lista de Tareas" corriendo en http://localhost:' + PORT);
});
