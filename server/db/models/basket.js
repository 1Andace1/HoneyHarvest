"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    static associate({}) {}
  }
  Basket.init(
    {
      UserId: DataTypes.INTEGER,
      productId:DataTypes.INTEGER,
      numberBasket: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Basket",
    }
  );
  return Basket;
};
