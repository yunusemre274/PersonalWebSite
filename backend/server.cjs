const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_DIR = path.resolve(process.cwd(), 'data');
const SETTINGS_PATH = path.join(DATA_DIR, 'settings.json');

function ensureSettings() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(SETTINGS_PATH)) fs.writeFileSync(SETTINGS_PATH, JSON.stringify({ theme: 'light' }, null, 2));
}

function readSettings() {
  ensureSettings();
  try {
    return JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf-8'));
  } catch (e) {
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify({ theme: 'light' }, null, 2));
    return { theme: 'light' };
  }
}

function writeSettings(s) {
  const cur = readSettings();
  const next = Object.assign({}, cur, s);
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(next, null, 2));
  return next;
}

app.get('/api/theme', (req, res) => {
  const s = readSettings();
  res.json({ theme: s.theme });
});

app.post('/api/theme', (req, res) => {
  const { theme } = req.body || {};
  if (theme !== 'dark' && theme !== 'light') {
    return res.status(400).json({ error: 'Invalid theme. Must be "dark" or "light".' });
  }
  const updated = writeSettings({ theme });
  res.json({ theme: updated.theme });
});

// Language endpoints
app.get('/api/lang', (req, res) => {
  const s = readSettings();
  res.json({ language: s.language || 'tr' });
});

app.post('/api/lang', (req, res) => {
  const { language } = req.body || {};
  const supported = ['tr', 'en', 'de', 'es'];
  if (!language || supported.indexOf(language) === -1) {
    return res.status(400).json({ error: 'Invalid language. Supported: tr,en,de,es' });
  }
  const updated = writeSettings({ language });
  res.json({ language: updated.language });
});

// AI streaming test endpoint (SSE) - placeholder for OpenAI streaming
app.post('/api/ai/stream', (req, res) => {
  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  // set SSE headers
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Access-Control-Allow-Origin': '*',
  });

  let i = 0;
  const parts = (`Echoing: ${prompt}`).split(' ');
  const iv = setInterval(() => {
    if (i >= parts.length) {
      res.write('event: done\n');
      res.write('data: [DONE]\n\n');
      clearInterval(iv);
      res.end();
      return;
    }
    const chunk = parts[i++];
    res.write(`data: ${chunk}\n\n`);
  }, 200);
});

// Typewriter endpoints on test server
app.get('/api/typewriter/frames', (req, res) => {
  const text = req.query.text || 'Typewriter demo';
  const speed = Number(req.query.speed) || 60;
  const unit = req.query.unit === 'word' ? 'word' : 'char';
  const s = String(text);
  const frames = [];
  if (unit === 'char') for (let i = 1; i <= s.length; i++) frames.push(s.slice(0, i));
  else {
    const parts = s.split(/\s+/);
    for (let i = 1; i <= parts.length; i++) frames.push(parts.slice(0, i).join(' '));
  }
  res.json({ frames, speed, unit });
});

app.post('/api/typewriter/frames', (req, res) => {
  const { text = 'Typewriter demo', speed = 60, unit = 'char' } = req.body || {};
  const s = String(text);
  const frames = [];
  if (unit === 'char') for (let i = 1; i <= s.length; i++) frames.push(s.slice(0, i));
  else {
    const parts = s.split(/\s+/);
    for (let i = 1; i <= parts.length; i++) frames.push(parts.slice(0, i).join(' '));
  }
  res.json({ frames, speed, unit });
});

app.post('/api/typewriter/stream', (req, res) => {
  const { text = 'Typewriter demo', speed = 60, unit = 'char' } = req.body || {};
  const s = String(text);
  const spd = Number(speed) || 60;
  const u = unit === 'word' ? 'word' : 'char';

  res.writeHead(200, {
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
  });

  let steps = [];
  if (u === 'char') for (let i = 1; i <= s.length; i++) steps.push(s.slice(0, i));
  else {
    const parts = s.split(/\s+/);
    for (let i = 1; i <= parts.length; i++) steps.push(parts.slice(0, i).join(' '));
  }

  let i = 0;
  const iv = setInterval(() => {
    if (i >= steps.length) {
      res.write('event: done\n');
      res.write('data: [DONE]\n\n');
      clearInterval(iv);
      res.end();
      return;
    }
    res.write(`data: ${steps[i++]}\n\n`);
  }, spd);
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Backend test server running on http://localhost:${PORT}`));
