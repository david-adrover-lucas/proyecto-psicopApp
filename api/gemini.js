export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    res.status(500).json({
      error: 'GEMINI_API_KEY no está configurada en el despliegue.'
    });
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body
        }
      );

      const responseText = await response.text();
      res.status(response.status);
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(responseText);
    } catch (error) {
      res.status(500).json({
        error: error.message || 'Error al contactar con Gemini.'
      });
    }
  });
}
