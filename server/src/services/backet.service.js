const { Backet, Good } = require('../../db/models');

class BacketService {
  static getGoodsByUserId(user_id) {
    return Backet.findAll({ where: { user_id }, include: { model: Good } });
  }

  static async addToBacket(user_id, good_id) {
    const [goods, isCreated] = await Backet.findOrCreate({
      where: { user_id, good_id },
      defaults: { quantity: 1 },
    });

    const good = await Backet.findOne({
      where: { id: goods.id },
      include: { model: Good },
    });
    if (isCreated) {
      return good;
    }
    good.quantity += 1;
    await good.save();
    await good.reload();
    return good;
  }

  static async deleteFromBacket(user_id, good_id) {
    const good = await Backet.findOne({
      where: { user_id, good_id },
      include: { model: Good },
    });
    if (!good || good.quantity <= 0) {
      throw new Error('Товара нет в корзине');
    }
    const dublicate = good.toJSON();

    good.quantity -= 1;
    if (good.quantity === 0) {
      await Backet.destroy({ where: { user_id, good_id } });
      return dublicate;
    }
    await good.save();
    await good.reload();
    return good;
  }

  static deleteAllGoodsFromBacket(id) {
    return Backet.destroy({ where: { id } });
  }

  static async clearBacket(good_id, user_id) {
    const result = await Backet.destroy({ where: { user_id, good_id } });
    return result;
  }
}

module.exports = BacketService;
