"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate({ User, Basket, Product, Order }) {
      this.belongsTo(User, { foreignKey: "UserId", as: "user" });
      this.belongsTo(Basket, { foreignKey: "basketId", as: "basket" });
      this.belongsTo(Product, { foreignKey: "productId", as: "product" });
      this.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
    }
  }
  Transaction.init(
    {
      UserId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      titleOfProduct: DataTypes.STRING,
      deliveryAddress: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      currentPrice: DataTypes.INTEGER,
      currentDiscountRatio: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      commentAdmin: DataTypes.STRING,
      basketId: DataTypes.INTEGER,
      orderId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
