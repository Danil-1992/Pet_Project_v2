'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Response extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Response.init(
    {
      comment: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      good_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Response',
    },
  );
  return Response;
};
