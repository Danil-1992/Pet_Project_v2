import { z } from 'zod';

export const backetSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  good_id: z.number(),
  quantity: z.number(),
  Good: z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    price: z.number(),
    sku: z.string(),
    category_id: z.number(),
    brand_id: z.number(),
    quantity: z.number(),
    image: z.string(),
    features: z.object({
      care: z.string(),
      color: z.string(),
      sizes: z.array(z.string()),
      material: z.string(),
    }),
  }),
});

export type backetType = z.infer<typeof backetSchema>;

export const backetArraySchema = z.array(backetSchema);

export type backetArrayType = z.infer<typeof backetArraySchema>;

export const respSchema = z.object({
  message: z.string(),
});
