"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    static associate({}) {}
  }
  Basket.init(
    {
      UserId: DataTypes.INTEGER,
      totalBasketPrice: DataTypes.INTEGER,
      deliveryAddress: DataTypes.STRING,
      status: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Basket",
    }
  );
  return Basket;
};
