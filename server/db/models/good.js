'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Good extends Model {
    static associate({ Category, Brand }) {
      this.belongsTo(Category, { foreignKey: 'category_id' });
      this.belongsTo(Brand, { foreignKey: 'brand_id' });
    }
  }
  Good.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      sku: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      brand_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      image: DataTypes.STRING,
      features: DataTypes.JSONB,
    },
    {
      sequelize,
      modelName: 'Good',
    },
  );
  return Good;
};
