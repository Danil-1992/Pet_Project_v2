const OrderService = require('../services/order.service');
const RabbitInit = require('../services/rabbitInit');

class OrderController {
  static async addOrder(req, res) {
    try {
      const { user } = res.locals;
      const { goods, price } = req.body;
      const order = await new Promise((resolve) => {
        setTimeout(async () => {
          const result = await OrderService.addOrder(user.id, price);
          resolve(result);
        }, 5000);
      });
      const channel1 = await RabbitInit.initChannel('order-service', 'fastChannel');
      await channel1.assertExchange('order', 'direct', { durable: true });
      channel1.publish(
        'order',
        'created',
        Buffer.from(JSON.stringify({ orderId: order.id, userId: user.id, goods })),
        { persistent: true },
      );
      console.log('Отправлено');
      res.json(order);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка при создании заказа' });
    }
  }
}

module.exports = OrderController;
