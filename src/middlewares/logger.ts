import morgan from 'morgan';
import { RequestHandler } from 'express';

// Use morgan preconfigured 'tiny' format for concise logging
export const requestLogger: RequestHandler = morgan('tiny');

export default requestLogger;
