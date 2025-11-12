import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import indexRouter from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { apiRateLimiter } from './middlewares/rateLimiter.js';
import requestLogger from './middlewares/logger.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

// Security middlewares
app.use(helmet());
// Allow everything (CORS permissive) per request
app.use(cors({ origin: '*' }));

// Logging
app.use(requestLogger);

// Rate limiter applied globally
app.use(apiRateLimiter);

app.use('/api', indexRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('AI-Assistant Backend: Hello world');
});

// Centralized error handler
app.use(errorHandler);

const __filename = fileURLToPath(import.meta.url);
// If this file is the main module executed (not imported), start the server.
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
