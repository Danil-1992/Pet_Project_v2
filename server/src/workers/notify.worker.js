const RabbitInit = require('../services/rabbitInit');
const { getIO } = require('../socket/socket');

class NotifyService {
  static async sendNotify() {
    const io = getIO();
    const channel1 = await RabbitInit.initChannel('order-service', 'fastChannel');
    await channel1.assertExchange('sent_notify', 'direct', { durable: true });
    await channel1.assertQueue('notify', { durable: true });
    await channel1.bindQueue('notify', 'sent_notify', 'create');

    channel1.consume('notify', (msg) => {
      try {
        const message = JSON.parse(msg.content.toString());
        io.to(`user-${message.userId}`).emit('waitNotify', {
          message: 'Заказ успешно создан',
        });
        channel1.ack(msg);
      } catch (error) {
        console.log(error);
        channel1.nack(msg, false, true);
      }
    });
  }
}

module.exports = NotifyService;
