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

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Backend test server running on http://localhost:${PORT}`));
