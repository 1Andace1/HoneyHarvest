'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate({ Transaction }) {
      this.hasMany(Transaction, {
        foreignKey: 'productId',
        as: 'transactions',
      }); 
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      discountRatio: DataTypes.FLOAT,
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
      modelName: 'Product',
    },
  );
  return Product;
};
