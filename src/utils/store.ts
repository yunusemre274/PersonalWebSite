import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const SETTINGS_PATH = path.join(DATA_DIR, 'settings.json');

type Settings = {
  theme: 'light' | 'dark';
  language: 'tr' | 'en' | 'de' | 'es';
};

const defaultSettings: Settings = { theme: 'light', language: 'tr' };

async function ensureSettingsFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(SETTINGS_PATH);
  } catch (e) {
    await fs.writeFile(SETTINGS_PATH, JSON.stringify(defaultSettings, null, 2), 'utf-8');
  }
}

export async function readSettings(): Promise<Settings> {
  await ensureSettingsFile();
  const raw = await fs.readFile(SETTINGS_PATH, 'utf-8');
  try {
    const parsed = JSON.parse(raw) as Settings;
    return { ...defaultSettings, ...parsed };
  } catch (e) {
    // if parse fails, restore default
    await fs.writeFile(SETTINGS_PATH, JSON.stringify(defaultSettings, null, 2), 'utf-8');
    return defaultSettings;
  }
}

export async function writeSettings(s: Partial<Settings>): Promise<Settings> {
  const current = await readSettings();
  const next = { ...current, ...s };
  await fs.writeFile(SETTINGS_PATH, JSON.stringify(next, null, 2), 'utf-8');
  return next;
}

export type { Settings };
