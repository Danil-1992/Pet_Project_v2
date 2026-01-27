const { Order } = require('../../db/models');

class OrderService {
  static async addOrder(user_id, totalPrice) {
    const res = await Order.create({ user_id, totalPrice });
    return res
    
  }
}

module.exports = OrderService