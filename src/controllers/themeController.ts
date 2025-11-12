import { Request, Response } from 'express';
import { readSettings, writeSettings } from '../utils/store.js';

export const getTheme = async (req: Request, res: Response) => {
  const settings = await readSettings();
  res.json({ theme: settings.theme });
};

export const setTheme = async (req: Request, res: Response) => {
  const { theme } = req.body as { theme?: string };
  if (theme !== 'dark' && theme !== 'light') {
    return res.status(400).json({ error: 'Invalid theme. Must be "dark" or "light".' });
  }

  const updated = await writeSettings({ theme });
  res.json({ theme: updated.theme });
};
