'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate({}) {}
  }
  Like.init(
    {
      userId: DataTypes.INTEGER,
      commentId: DataTypes.INTEGER,
      isLiked: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Like',
    }
  );
  return Like;
};
