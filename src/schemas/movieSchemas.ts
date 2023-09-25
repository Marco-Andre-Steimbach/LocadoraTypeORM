import { z } from 'zod';

const movieSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).optional(),
  duration: z.number().int().refine(value => value > 0, {
    message: "Number must be greater than 0"
  }),
  price: z.number().int().min(1),
});

export const movieSchemaPatch = z.object({
  name: z.string().min(1).max(50).optional(),
  description: z.string().min(1).optional(),
  duration: z.number().int().refine(value => value > 0, {
    message: "Number must be greater than 0"
  }).optional(),
  price: z.number().int().min(1).optional(),
});

export default movieSchema;
