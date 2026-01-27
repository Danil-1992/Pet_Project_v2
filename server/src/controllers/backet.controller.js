const BacketService = require('../services/backet.service');

class BacketController {
  static async getGoodsByUserId(req, res) {
    try {
      const { user } = res.locals;
      const result = await BacketService.getGoodsByUserId(user.id);
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
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка при удалении товара из корзины' });
    }
  }

  static async deleteGoodsFromBacket(req, res) {
    try {
      const { user } = res.locals;
      const { goods } = req.body;
    } catch (error) {
      console.log(error);
    }
  }

  static async clearBacket(req, res) {
    try {
      const data = req.body;
      const { user } = res.locals;
      console.log(data);

      const result = await Promise.allSettled(
        data.map((good) => BacketService.clearBacket(good.good_id, user.id)),
      );
      console.log(result);
      res.json({ message: 'Успешно' });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({
          message: 'Ошибка при удалении товаров из корзины во время создания заказа',
        });
    }
  }
}

module.exports = BacketController;
