const { Order, Good, OrderItems } = require('../../db/models');

class OrderService {
  static async addOrder(user_id, totalPrice) {
    const res = await Order.create({ user_id, totalPrice });
    return res;
  }

  static getOrdersByUserId(user_id) {
    return Order.findAll({
      where: { user_id },
      include: { model: OrderItems, include: { model: Good } },
      order: [['createdAt', 'DESC']],
    });
  }
}

module.exports = OrderService;
