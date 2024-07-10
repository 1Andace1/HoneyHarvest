"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Basket }) { // добавила связь Один  ко многим
      this.hasMany(Basket, { foreignKey: "UserId", as: "baskets" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      telephone: DataTypes.INTEGER,
      userCity: DataTypes.STRING,
      password: DataTypes.STRING,
      cashAccount: DataTypes.INTEGER,
      isAdmin: DataTypes.BOOLEAN,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
