import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  description: z.string(),
  price: z.number(),
});

export type Product = z.infer<typeof ProductSchema>;

export const PersonSchema = z.object({
  id: z.number(),
  name: z.object({ first: z.string(), last: z.string() }),
  email: z.string().optional(),
});

export type Person = z.infer<typeof PersonSchema>;
