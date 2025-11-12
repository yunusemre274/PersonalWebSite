import { Router } from 'express';
import { getTheme, setTheme } from '../controllers/themeController.js';
import validate from '../middlewares/validate.js';
import { themeSchema } from '../utils/validators.js';

const router = Router();

// GET /api/theme -> returns current theme
router.get('/', getTheme);
// POST /api/theme -> set theme { theme: 'dark' | 'light' }
router.post('/', validate(themeSchema, 'body'), setTheme);

export default router;
