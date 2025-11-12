import { Request, Response } from 'express';

type TypewriterOptions = {
  text: string;
  speed?: number; // ms per step
  unit?: 'char' | 'word';
};

// Return frames array: cumulative strings per step
export const framesHandler = (req: Request, res: Response) => {
  const { text = '', speed = 50, unit = 'char' } = (req.method === 'GET' ? req.query : req.body) as any;
  const s = String(text);
  const spd = Number(speed) || 50;
  const u = unit === 'word' ? 'word' : 'char';

  const frames: string[] = [];
  if (u === 'char') {
    for (let i = 1; i <= s.length; i++) frames.push(s.slice(0, i));
  } else {
    const parts = s.split(/\s+/);
    for (let i = 1; i <= parts.length; i++) frames.push(parts.slice(0, i).join(' '));
  }

  res.json({ frames, speed: spd, unit: u });
};

// SSE stream: sends incremental frames as `data:` events
export const streamHandler = (req: Request, res: Response) => {
  const { text = '', speed = 50, unit = 'char' } = (req.method === 'GET' ? req.query : req.body) as any;
  const s = String(text);
  const spd = Number(speed) || 50;
  const u = unit === 'word' ? 'word' : 'char';

  res.writeHead(200, {
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
  });

  let steps: string[] = [];
  if (u === 'char') {
    for (let i = 1; i <= s.length; i++) steps.push(s.slice(0, i));
  } else {
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
    const frame = steps[i++];
    res.write(`data: ${frame}\n\n`);
  }, spd);
};
