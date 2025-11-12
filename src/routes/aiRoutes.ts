import { Router } from 'express';
import { streamAI } from '../controllers/aiController.js';
import createRouteLimiter from '../middlewares/routeRateLimiter.js';

const router = Router();

// Apply a stricter limiter for AI streaming (10 req / 1 minute)
const aiLimiter = createRouteLimiter({ windowMs: 60 * 1000, max: 10 });

// POST /api/ai/stream -> stream responses (proxy to OpenAI or fallback)
router.post('/stream', aiLimiter, streamAI);

export default router;
