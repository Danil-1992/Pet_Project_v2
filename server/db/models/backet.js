'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Backet extends Model {
    static associate({ Good }) {
      this.belongsTo(Good, { foreignKey: 'good_id' });
    }
  }
  Backet.init(
    {
      user_id: DataTypes.INTEGER,
      good_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Backet',
    },
  );
  return Backet;
};
