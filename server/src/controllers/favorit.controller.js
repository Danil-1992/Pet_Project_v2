const FavoritService = require('../services/favorit.service');

class FavoritControoler {
  static async getFavorits(req, res) {
    try {
      const { user } = res.locals;
      const result = await FavoritService.getFavorits(user.id);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка при получении избранных товаров' });
    }
  }

  static async addLike(req, res) {
    try {
      const { user } = res.locals;
      const { goodId } = req.params;
      const result = await FavoritService.addLike(user.id, goodId);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка при добавлении в избранное' });
    }
  }

  static async deleteLike(req, res) {
    try {
      const { user } = res.locals;
      const { goodId } = req.params;
      const result = await FavoritService.deleteLike(user.id, goodId);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка при удалении из избранного' });
    }
  }
}

module.exports = FavoritControoler;
