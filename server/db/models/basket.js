"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    static associate({ User, Transaction }) {
      this.belongsTo(User, { foreignKey: "UserId", as: "user" });
      this.hasMany(Transaction, { foreignKey: "basketId", as: "transactions" });
    }
  }
  Basket.init(
    {
      UserId: DataTypes.INTEGER,
      productId:DataTypes.INTEGER,
      numberBasket: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      commentUser: DataTypes.STRING,
      totalBasketPrice:  DataTypes.INTEGER,
      deliveryAddress:  DataTypes.STRING,
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
