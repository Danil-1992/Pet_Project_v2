const { Good } = require('../../db/models');

class GoodService {
  static getAllGoods() {
    return Good.findAll();
  }

  static async addToBacket(id) {
    const good = await Good.findByPk(id);
    if (good.quantity > 0) {
      good.quantity -= 1;
      await good.save();
      await good.reload();
      return good;
    }
    throw new Error('Недостаточное количество для резерва');
  }

  static async deleteFromBacket(id) {
    const good = await Good.findByPk(id);
    good.quantity += 1;
    await good.save();
    await good.reload();
    return good;
  }
}
module.exports = GoodService;
