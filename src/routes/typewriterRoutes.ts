import { Router } from 'express';
import { framesHandler, streamHandler } from '../controllers/typewriterController.js';
import validate from '../middlewares/validate.js';
import { typewriterSchema } from '../utils/validators.js';
import createRouteLimiter from '../middlewares/routeRateLimiter.js';

const router = Router();

// POST limiter for typewriter endpoints (20 req / min)
const twLimiter = createRouteLimiter({ windowMs: 60 * 1000, max: 20 });

// GET/POST /api/typewriter/frames -> { text, speed, unit } -> returns frames array
router.get('/frames', framesHandler);
router.post('/frames', twLimiter, validate(typewriterSchema, 'body'), framesHandler);

// GET/POST /api/typewriter/stream -> SSE stream of frames
router.get('/stream', streamHandler);
router.post('/stream', twLimiter, validate(typewriterSchema, 'body'), streamHandler);

export default router;
