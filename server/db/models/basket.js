"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    static associate({ User, Transaction, Product }) {
      this.belongsTo(User, { foreignKey: "UserId", as: "user" });
      this.hasMany(Transaction, { foreignKey: "basketId", as: "transactions" });
      this.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
    }
  }
  Basket.init(
    {
      UserId: DataTypes.INTEGER,
      productId:DataTypes.INTEGER,
      numberBasket: DataTypes.INTEGER,
      status: DataTypes.STRING,
      commentUser: DataTypes.STRING,
      totalBasketPrice:  DataTypes.INTEGER,
      deliveryAddress:  DataTypes.STRING,
      date: DataTypes.DATE,// добавила
      estimatedDate: DataTypes.STRING,// добавила
    },
    {
      sequelize,
      modelName: "Basket",
    }
  );
  return Basket;
};
