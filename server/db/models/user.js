"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Basket, Transaction }) { // добавила связь Один  ко многим
      this.hasMany(Basket, { foreignKey: "UserId", as: "baskets" });
      this.hasMany(Transaction, { foreignKey: "UserId", as: "transactions" });
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
