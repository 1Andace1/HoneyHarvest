'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate({}) {}
  }
  Rating.init(
    {
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      stars: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Rating',
    }
  );
  return Rating;
};
