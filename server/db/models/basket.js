"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    static associate({ User, Transaction, Product, Order }) {
      this.belongsTo(User, { foreignKey: "UserId", as: "user" });
      this.hasMany(Transaction, { foreignKey: "basketId", as: "transactions" });
      this.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
      this.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });  // ! МАША ДОБАВИЛА
    }
  }
  Basket.init(
    {
      UserId: DataTypes.INTEGER,
      productId:DataTypes.INTEGER,
      orderId: DataTypes.INTEGER,  // ! МАША ДОБАВИЛА
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
