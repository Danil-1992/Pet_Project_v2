const GoodService = require('../services/good.service');

class GoodController {
  static async getAllGoods(req, res) {
    try {
      const result = await GoodService.getAllGoods();
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Не удалось загрузить товары"})
    }
  }

  static async addToBacket(req, res) {
    try {
      const { goodId } = req.params;
      console.log(goodId);
      const result = await GoodService.addToBacket(goodId);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка при добавлении товара в корзину' });
    }
  }

  static async deleteFromBacket(req, res) {
    try {
      const { goodId } = req.params;
      const result = await GoodService.deleteFromBacket(goodId);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Ошибка при удалении товара"})
    }
  }
}

module.exports = GoodController;
