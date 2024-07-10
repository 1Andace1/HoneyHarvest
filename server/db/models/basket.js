"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    static associate({User}) {
      this.belongsTo(User, { foreignKey: "UserId", as: "user" });
    }
  }
  Basket.init(
    {
      UserId: DataTypes.INTEGER,
      productId:DataTypes.INTEGER,
      numberBasket: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      date: DataTypes.DATE,// добавила
      estimatedDate: DataTypes.INTEGER,// добавила
    },
    {
      sequelize,
      modelName: "Basket",
    }
  );
  return Basket;
};
