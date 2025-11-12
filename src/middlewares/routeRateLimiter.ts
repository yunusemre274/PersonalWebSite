import rateLimit from 'express-rate-limit';

export function createRouteLimiter(options?: Partial<{ windowMs: number; max: number }>): ReturnType<typeof rateLimit> {
  const windowMs = options?.windowMs ?? 60 * 1000; // default 1 minute
  const max = options?.max ?? 10; // default 10 requests per window

  return rateLimit({
    windowMs,
    max,
    message: 'Too many requests to this endpoint, please slow down.'
  });
}

export default createRouteLimiter;
