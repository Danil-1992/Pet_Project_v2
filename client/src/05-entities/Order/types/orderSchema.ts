import { z } from 'zod';

export const orderSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  totalPrice: z.number(),
});

export type orderType = z.infer<typeof orderSchema>;

export const orderArraySchema = z.array(orderSchema);

export type orderArrayType = z.infer<typeof orderArraySchema>;

export const datesForAddNewOrder = z.array(
  z.union([
    z.object({
      quantity: z.number(),
      priceAtTime: z.number(),
      goodId: z.number(),
    }),
    z.object({
      summ: z.number(),
    }),
  ]),
);

export type datesForAddNewOrderType = z.infer<typeof datesForAddNewOrder>;

export const orderSchemaWithOrIt = z.array(
  z.object({
    id: z.number(),
    user_id: z.number(),
    totalPrice: z.number(),
    createdAt: z.string(),
    OrderItems: z.array(
      z.object({
        quantity: z.number(),
        order_id: z.number(),
        good_id: z.number(),
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
          images: z.string().optional(),
          features: z.object({
            care: z.string(),
            color: z.string(),
            sizes: z.array(z.string()),
            material: z.string(),
          }),
        }),
      }),
    ),
  }),
);
export type orderSchemaWithOrItType = z.infer<typeof orderSchemaWithOrIt>;
