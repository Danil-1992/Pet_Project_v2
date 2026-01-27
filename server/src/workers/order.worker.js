const OrderItemsService = require('../services/orderItems.service');
const RabbitInit = require('../services/rabbitInit');

class CreatedOrder {
  static async create() {
    const channel1 = await RabbitInit.initChannel('order-service', 'fastChannel');
    await channel1.assertExchange('order', 'direct', { durable: true });
    await channel1.assertQueue('makeOrder', { durable: true });
    const purged = await channel1.purgeQueue('makeOrder');
    console.log(`Очищено ${purged.messageCount} сообщений из очереди makeOrder`);
    await channel1.bindQueue('makeOrder', 'order', 'created');

    await channel1.assertExchange('sent_notify', 'direct', { durable: true });

    channel1.consume('makeOrder', async (msg) => {
      try {
        const data = await JSON.parse(msg.content.toString());
        const { orderId } = data;
        const { userId } = data;

        await Promise.all(
          data.goods.map((el) =>
            OrderItemsService.addOrderItem({
              quantity: el.quantity,
              size: el.Good.sizes?.[0] ?? 'default-size',
              order_id: orderId,
              good_id: el.good_id,
            }),
          ),
        );
        channel1.publish(
          'sent_notify',
          'create',
          Buffer.from(JSON.stringify({ userId })),
          {
            persistent: true,
          },
        );

        channel1.ack(msg);
      } catch (error) {
        console.log(error);
        channel1.nack(msg, false, true);
      }
    });
  }
}

module.exports = CreatedOrder;
