'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ User, Product }) {
      this.belongsTo(User, { foreignKey: "userId" });
      this.belongsTo(Product, { foreignKey: "productId" });
    }
  }
  Comment.init(
    {
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      text: DataTypes.TEXT,
      isVerified: DataTypes.BOOLEAN,
      likesQuantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comment',
    }
  );
  return Comment;
};
