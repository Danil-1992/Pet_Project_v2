import { z } from 'zod';

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  image: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
});

export type categoryType = z.infer<typeof categorySchema>;

export const categoryArraySchema = z.array(categorySchema);

export type categoryArrayType = z.infer<typeof categoryArraySchema>;
