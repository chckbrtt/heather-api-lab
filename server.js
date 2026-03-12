const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('.'));

// Proxy endpoint for UKG API calls (avoids CORS issues)
app.post('/api/proxy', async (req, res) => {
  const { url, method, headers, body } = req.body;
  if (!url || !url.includes('saashr.com')) {
    return res.status(400).json({ error: 'Invalid target URL' });
  }
  try {
    const fetchOpts = { method: method || 'GET', headers: headers || {} };
    if (body) fetchOpts.body = typeof body === 'string' ? body : new URLSearchParams(body).toString();
    const resp = await fetch(url, fetchOpts);
    const contentType = resp.headers.get('content-type') || '';
    const data = contentType.includes('json') ? await resp.json() : await resp.text();
    res.status(resp.status).json({ status: resp.status, contentType, data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Forward questions to Duder's webhook handler
app.post('/api/ask', async (req, res) => {
  try {
    const resp = await fetch('https://webhooks.hcmnotify.com/heather/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    if (resp.ok) {
      res.json({ ok: true });
    } else {
      res.status(resp.status).json({ error: 'Failed to deliver question' });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => console.log(`Heather's API Lab running on port ${PORT}`));
