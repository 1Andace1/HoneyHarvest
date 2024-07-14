'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Basket, Transaction, Comment }) {
      // добавила связь Один  ко многим
      this.hasMany(Basket, { foreignKey: 'UserId', as: 'baskets' });
      this.hasMany(Transaction, { foreignKey: 'UserId', as: 'transactions' });
      this.hasMany(Comment, { foreignKey: 'UserId' });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      telephone: DataTypes.STRING,
      userCity: DataTypes.STRING,
      password: DataTypes.STRING,
      cashAccount: DataTypes.INTEGER,
      isAdmin: DataTypes.BOOLEAN,
      photo: DataTypes.STRING,
      totalSpent: {
        // ^ new поле для отслеживания суммы потраченной пользователем
        type: DataTypes.INTEGER,
        defaultValue: 0, //  ^ new по умолчанию сумма потраченная равна 0
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        // ^ new ХУК (можно использоватьы тут!!) для обновления totalSpent при создании новой транзакции
        async afterCreate(user) {
          try {
            const transactions = await user.getTransactions();
            const totalSpent = transactions.reduce(
              (total, transaction) => total + transaction.currentPrice,
              0,
            );
            await user.update({ totalSpent });
          } catch (error) {
            console.error(
              'Ошибка при обновлении totalSpent пользователя:',
              error,
            );
          }
        },
      },
    },
  );
  return User;
};
