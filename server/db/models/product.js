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
      picture: DataTypes.STRING,
      location: DataTypes.STRING,
      starsRating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
