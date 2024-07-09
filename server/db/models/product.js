"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate({}) {}
  }
  Product.init(
    {
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      discountRatio: DataTypes.INTEGER,
      category: DataTypes.STRING,
      sort: DataTypes.STRING,
      description: DataTypes.STRING,
      yearOfHarvest: DataTypes.INTEGER,
      availableQuantity: DataTypes.INTEGER,
      pictures: DataTypes.STRING,
      location: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
