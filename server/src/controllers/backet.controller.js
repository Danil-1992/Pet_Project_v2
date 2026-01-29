const BacketService = require('../services/backet.service');
let redis = null;

class BacketController {
  static async getGoodsByUserId(req, res) {
    try {
      const { user } = res.locals;
      const backetKey = `backet:${user.id}`;
      if (!redis) {
        const client = require('../../redis/redis');
        redis = client.getClient();
      }
      const cashedBacket = await redis.get(backetKey);
      if (cashedBacket) {
        console.log('данные из кеша');
        return res.json(JSON.parse(cashedBacket));
      }

      const result = await BacketService.getGoodsByUserId(user.id);
      await redis.setEx(backetKey, 300, JSON.stringify(result));
      console.log('💾 Корзина сохранена в Redis на 5 минут');
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка при отправке товаров' });
    }
  }

  static async addToBacket(req, res) {
    try {
      const { user } = res.locals;
      const { goodId } = req.params;
      const result = await BacketService.addToBacket(user.id, goodId);
      const backetKey = `backet:${user.id}`;

      await redis.del(backetKey);
      console.log('Ключ на добавление удален');

      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка при добавлении товара в корзину' });
    }
  }

  static async deleteFromBacket(req, res) {
    try {
      const { user } = res.locals;
      const { goodId } = req.params;
      const result = await BacketService.deleteFromBacket(user.id, goodId);
      const backetKey = `backet:${user.id}`;
      await redis.del(backetKey);
      console.log('ключ на уменьшение удален');
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка при удалении товара из корзины' });
    }
  }



  static async clearBacket(req, res) {
    try {
      const data = req.body;
      const { user } = res.locals;
      await Promise.allSettled(
        data.map((good) => BacketService.clearBacket(good.good_id, user.id)),
      );
      const backetKey = `backet:${user.id}`;
      await redis.del(backetKey);
      res.json({ message: 'Успешно' });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ошибка при удалении товаров из корзины во время создания заказа',
      });
    }
  }
}

module.exports = BacketController;
