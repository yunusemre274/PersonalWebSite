import rateLimit from 'express-rate-limit';

// Basic rate limiter: 100 requests per 15 minutes per IP
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests, please try again later.'
});

export default apiRateLimiter;
