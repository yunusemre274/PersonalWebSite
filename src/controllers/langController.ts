import { Request, Response } from 'express';
import { readSettings, writeSettings } from '../utils/store.js';

const SUPPORTED: string[] = ['tr', 'en', 'de', 'es'];

export const getLanguage = async (req: Request, res: Response) => {
  const settings = await readSettings();
  res.json({ language: settings.language });
};

export const setLanguage = async (req: Request, res: Response) => {
  const { language } = req.body as { language?: string };
  if (!language || typeof language !== 'string' || !SUPPORTED.includes(language)) {
    return res.status(400).json({ error: `Invalid language. Supported: ${SUPPORTED.join(', ')}` });
  }

  const lang = language as 'tr' | 'en' | 'de' | 'es';
  const updated = await writeSettings({ language: lang });
  res.json({ language: updated.language });
};
