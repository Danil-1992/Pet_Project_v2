import { z } from 'zod';

export const favoritSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  good_id: z.number(),
});

export type favoriteType = z.infer<typeof favoritSchema>;

export const favoritArraySchema = z.array(favoritSchema);

export type favoritArrayType = z.infer<typeof favoritArraySchema>;
