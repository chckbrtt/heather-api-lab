const express = require('express');
const path = require('path');
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
    const fetchOpts = {
      method: method || 'GET',
      headers: headers || {}
    };
    if (body) {
      fetchOpts.body = typeof body === 'string' ? body : new URLSearchParams(body).toString();
    }
    
    const resp = await fetch(url, fetchOpts);
    const contentType = resp.headers.get('content-type') || '';
    let data;
    if (contentType.includes('json')) {
      data = await resp.json();
    } else {
      data = await resp.text();
    }
    
    res.status(resp.status).json({ status: resp.status, contentType, data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/ask', (req, res) => {
  const { topic, question, email } = req.body;
  console.log('QUESTION:', JSON.stringify({ topic, question, email, timestamp: new Date().toISOString() }));
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Heather's API Lab running on port ${PORT}`));
