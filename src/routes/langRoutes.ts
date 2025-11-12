import { Router } from 'express';
import { getLanguage, setLanguage } from '../controllers/langController.js';
import validate from '../middlewares/validate.js';
import { langSchema } from '../utils/validators.js';

const router = Router();

// GET /api/lang -> current language
router.get('/', getLanguage);
// POST /api/lang -> set language { language: 'tr'|'en'|'de'|'es' }
router.post('/', validate(langSchema, 'body'), setLanguage);

export default router;
