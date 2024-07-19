'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Basket, Transaction, Comment,Order }) {
      // добавила связь Один  ко многим
      this.hasMany(Basket, { foreignKey: 'UserId', as: 'baskets' });
      this.hasMany(Transaction, { foreignKey: 'UserId', as: 'transactions' });
      this.hasMany(Comment, { foreignKey: 'userId' });
      this.hasMany(Order, { foreignKey: 'userId', as: 'orders' });  // ! МАША нвоое от 15.07
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
        type: DataTypes.INTEGER,
        defaultValue: 0, 
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
