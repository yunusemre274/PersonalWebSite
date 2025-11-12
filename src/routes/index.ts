import { Router } from 'express';
import healthController from '../controllers/healthController.js';
import themeRoutes from './themeRoutes.js';
import langRoutes from './langRoutes.js';
import aiRoutes from './aiRoutes.js';
import typewriterRoutes from './typewriterRoutes.js';

const router = Router();

router.get('/health', healthController);

router.use('/theme', themeRoutes);
router.use('/lang', langRoutes);
router.use('/ai', aiRoutes);
router.use('/typewriter', typewriterRoutes);

export default router;
