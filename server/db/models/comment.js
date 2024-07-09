'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({}) {}
  }
  Comment.init(
    {
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      text: DataTypes.STRING,
      likesQuantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comment',
    }
  );
  return Comment;
};
