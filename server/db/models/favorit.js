'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorit extends Model {
    static associate({ Good }) {
      this.belongsTo(Good, { foreignKey: 'good_id' });
    }
  }
  Favorit.init(
    {
      user_id: DataTypes.INTEGER,
      good_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Favorit',
    },
  );
  return Favorit;
};
