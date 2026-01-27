const { OrderItems } = require('../../db/models');

class OrderItemsService {
  static addOrderItem(data) {
    // console.log(data)
    return OrderItems.create(data);
  }
}

module.exports = OrderItemsService