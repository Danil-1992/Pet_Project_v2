import { z } from 'zod';

export const orderSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  totalPrice: z.number(),
});

export type orderType = z.infer<typeof orderSchema>;

export const orderArraySchema = z.array(orderSchema);

export type orderArrayType = z.infer<typeof orderArraySchema>;
