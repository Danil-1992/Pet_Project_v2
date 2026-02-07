const { Op } = require('sequelize');
const { Good, Category, Brand } = require('../../db/models');

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

  static getOneCard(id) {
    return Good.findByPk(id);
  }

  static async getGoodBySearch(word) {
    if (!word | (word.trim().length === 0)) {
      return [];
    }

    const searchTerm = word.trim();

    try {
      const caseInsensitiveResult = await Good.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${searchTerm}%` } },
            { '$Category.name$': { [Op.iLike]: `%${searchTerm}%` } },
            { '$Brand.name$': { [Op.iLike]: `%${searchTerm}%` } },
          ],
        },
        include: [{ model: Category }, { model: Brand }],
      });

      return caseInsensitiveResult;
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }

  static async filterGoods(data) {
    const { category_id, brand_id, minPrice, maxPrice } = data;
    console.log(data);

    const where = {};
    if (category_id) {
      where.category_id = category_id;
    }
    if (brand_id) {
      where.brand_id = brand_id;
    }
    if (minPrice !== undefined && maxPrice !== undefined) {
      where.price = { [Op.between]: [minPrice, maxPrice] };
    } else if (minPrice) {
      where.price = { [Op.gte]: minPrice };
    } else if (maxPrice) {
      where.price = { [Op.lte]: maxPrice };
    }
    const result = await Good.findAll({ where });
    console.log(where);

    return result;
  }
}
module.exports = GoodService;
