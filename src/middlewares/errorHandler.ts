import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Zod validation errors -> 400
  if (err instanceof ZodError) {
    // eslint-disable-next-line no-console
    console.warn('Validation error', err.errors);
    return res.status(400).json({ error: 'Validation error', details: err.errors });
  }

  if (typeof err === 'object' && err !== null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const e = err as any;
    // eslint-disable-next-line no-console
    console.error(e);
    const status = typeof e.status === 'number' ? e.status : 500;
    const message = typeof e.message === 'string' ? e.message : 'Internal Server Error';
    res.status(status).json({ error: message });
    return;
  }

  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
};
