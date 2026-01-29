'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    static associate({ Good }) {
      this / this.belongsTo(Good, { foreignKey: 'good_id' });
    }
  }
  OrderItems.init(
    {
      quantity: DataTypes.INTEGER,
      size: DataTypes.STRING,
      order_id: DataTypes.INTEGER,
      good_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'OrderItems',
    },
  );
  return OrderItems;
};
