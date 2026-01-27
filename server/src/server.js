const server = require('./app');
const NotifyService = require('./workers/notify.worker');

const CreatedOrder = require('./workers/order.worker');
require('dotenv').config();
const port = process.env.DB_PORT || 3000;
server.listen(port, async () => {
  console.log(`🚀 Сервер запущен на порту ${port}`);

  try {
    // Запускаем Rabbit consumer в фоне
    await CreatedOrder.create();
    await NotifyService.sendNotify();
    console.log('✅ RabbitMQ worker запущен');
  } catch (error) {
    console.error('❌ Не удалось запустить worker:', error);
    // НЕ падаем! Сервер продолжает работать
  }
});
