"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate({}) {}
  }
  Transaction.init(
    {
      UserId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      titleOfProduct: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      currentPrice: DataTypes.INTEGER,
      currentDiscountRatio: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      basketId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
