import { z } from 'zod';

export const goodSchema = z.object({
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
});

export type goodType = z.infer<typeof goodSchema>;

export const arrayGoodSchema = z.array(goodSchema);

export type arrayGoodType = z.infer<typeof arrayGoodSchema>;
