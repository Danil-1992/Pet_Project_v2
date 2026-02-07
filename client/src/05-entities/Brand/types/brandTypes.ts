import { z } from 'zod';

export const brandSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  logo: z.string(),
  website: z.string(),
  country: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
});

export type brandType = z.infer<typeof brandSchema>;

export const brandArraySchema = z.array(brandSchema);

export type brandArrayType = z.infer<typeof brandArraySchema>;
