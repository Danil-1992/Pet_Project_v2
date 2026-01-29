import { z } from 'zod';

export const responseSchems = z.object({
  id: z.number(),
  comment: z.string(),
  user_id: z.number(),
  good_id: z.number(),
  createdAt: z.string(),
  User: z.object({
    name: z.string(),
    createdAt: z.string(),
  }),
});

export type responseType = z.infer<typeof responseSchems>;

export const responseArraySchema = z.array(responseSchems);

export type responseArrayType = z.infer<typeof responseArraySchema>;

export const responseByUserSchema = z.object({
  comment: z.string(),
  good_id: z.number(),
  user_id: z.number(),
  createdAt: z.string(),
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

export type responseByUserType = z.infer<typeof responseByUserSchema>;

export const responseArrayByUserSchema = z.array(responseByUserSchema);

export type responseArrayByUserType = z.infer<typeof responseArrayByUserSchema>;
