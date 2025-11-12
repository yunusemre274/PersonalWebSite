import { z } from 'zod';

export const themeSchema = z.object({ theme: z.enum(['dark', 'light']) });

export const langSchema = z.object({ language: z.enum(['tr', 'en', 'de', 'es']) });

export const typewriterSchema = z.object({
  text: z.string().min(0).optional(),
  speed: z.number().optional(),
  unit: z.union([z.literal('char'), z.literal('word')]).optional()
});

export const aiStreamSchema = z.object({
  // keep permissive: allow any object but ensure at least a messages array if present
  model: z.string().optional(),
  messages: z.any().optional()
});

export default {
  themeSchema,
  langSchema,
  typewriterSchema,
  aiStreamSchema
};
