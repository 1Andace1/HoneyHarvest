'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({ User, Transaction }) {
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      this.hasMany(Transaction, { foreignKey: 'orderId', as: 'transactions' });
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      totalOrderPrice: DataTypes.INTEGER,
      deliveryAddress: DataTypes.STRING,
      status: DataTypes.STRING,
      commentUser: DataTypes.STRING,
      date: DataTypes.DATE,
      estimatedDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};