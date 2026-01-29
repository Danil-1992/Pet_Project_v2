import { z } from 'zod';

export const favoritSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  good_id: z.number(),
});

export type favoriteType = z.infer<typeof favoritSchema>;

export const favoritArraySchema = z.array(favoritSchema);

export type favoritArrayType = z.infer<typeof favoritArraySchema>;

export const favoritsSchema = z.object({
  id: z.number(),
  good_id: z.number(),
  user_id: z.number(),
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

export type favoritType = z.infer<typeof favoritsSchema>;

export const favoritsArraySchema = z.array(favoritsSchema);

export type favoritsArraType = z.infer<typeof favoritsArraySchema>;
