import { NextFunction, Request, Response } from 'express';
import { ZodSchema, ZodFormattedError, ZodError } from 'zod';

type Location = 'body' | 'query' | 'params';

export const validate = (schema: ZodSchema, location: Location = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = location === 'body' ? req.body : location === 'query' ? req.query : req.params;
      const result = schema.parse(input);
      // write parsed values back (useful for coercions)
      if (location === 'body') req.body = result as any;
      if (location === 'query') req.query = result as any;
      if (location === 'params') req.params = result as any;
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        const formatted = e.format();
        return res.status(400).json({ error: 'Validation error', details: formatted });
      }
      next(e);
    }
  };
};

export default validate;
