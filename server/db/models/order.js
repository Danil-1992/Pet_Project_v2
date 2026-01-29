'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({ OrderItems }) {
      this.hasMany(OrderItems, { foreignKey: 'order_id' });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
