import { Request, Response } from 'express';
import { readSettings } from '../utils/store.js';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export const streamAI = async (req: Request, res: Response) => {
  const { prompt } = req.body as { prompt?: string };
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing prompt in request body' });
  }

  const key = process.env.OPENAI_API_KEY;

  // If no API key available, fall back to a simple test streamer
  if (!key) {
    // Simple SSE fallback: echo words
    res.writeHead(200, {
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
    });

    const parts = (`Echo (test mode): ${prompt}`).split(' ');
    let i = 0;
    const iv = setInterval(() => {
      if (i >= parts.length) {
        res.write('event: done\n');
        res.write('data: [DONE]\n\n');
        clearInterval(iv);
        res.end();
        return;
      }
      res.write(`data: ${parts[i++]}\n\n`);
    }, 200);
    return;
  }

  // Proxy to OpenAI with streaming
  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    const body = JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      stream: true,
    });

    const openaiRes = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!openaiRes.ok || !openaiRes.body) {
      const text = await openaiRes.text();
      res.write(`data: ${text}\n\n`);
      res.end();
      return;
    }

    const decoder = new TextDecoder();

    // The response is a stream of event-stream chunks. We'll iterate and forward.
    type AsyncChunk = AsyncIterable<Uint8Array>;
    const streamBody = openaiRes.body as unknown as AsyncChunk;
    for await (const chunk of streamBody) {
      const str = decoder.decode(chunk as Uint8Array);
      // OpenAI streams lines prefixed with "data:"
      const lines = str.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        if (line.startsWith('data:')) {
          const data = line.replace(/^data:\s*/, '');
          if (data === '[DONE]') {
            res.write('event: done\n');
            res.write('data: [DONE]\n\n');
            res.end();
            return;
          }
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              // forward incremental text as SSE data
              res.write(`data: ${delta}\n\n`);
            }
          } catch (e) {
            // not JSON — forward raw
            res.write(`data: ${data}\n\n`);
          }
        }
      }
    }

    // If the loop ends, close the SSE
    res.write('event: done\n');
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    // eslint-disable-next-line no-console
    console.error('AI stream error', msg);
    if (!res.headersSent) res.status(500).json({ error: 'AI streaming failed' });
    else res.end();
  }
};
