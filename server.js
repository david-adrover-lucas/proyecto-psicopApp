const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/gemini') {
    if (!GEMINI_API_KEY) {
      sendJson(res, 500, { error: 'GEMINI_API_KEY no está configurada en el servidor.' });
      return;
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const response = await fetch(`${GEMINI_URL}?key=${encodeURIComponent(GEMINI_API_KEY)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body
        });

        const responseText = await response.text();
        res.writeHead(response.status, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(responseText);
      } catch (error) {
        sendJson(res, 500, { error: error.message || 'Error al contactar a Gemini.' });
      }
    });

    return;
  }

  const requestPath = req.url === '/' ? '/index.html' : req.url;
  const safePath = path.normalize(requestPath).replace(/^\.+/, '');
  const filePath = path.join(__dirname, safePath);

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        sendJson(res, 404, { error: 'No encontrado' });
      } else {
        sendJson(res, 500, { error: 'Error interno del servidor' });
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});
