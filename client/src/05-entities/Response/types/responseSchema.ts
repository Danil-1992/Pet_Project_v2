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
