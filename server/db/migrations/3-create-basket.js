"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Baskets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: "CASCADE", // удаление корзины при удалении пользователя
        onUpdate: "CASCADE",
      },
      totalBasketPrice: {
        type: Sequelize.INTEGER,
      },
      deliveryAddress: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      comment: {
        type: Sequelize.STRING,
      },
      date: { // добавила поле даты заказа
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      estimatedDate: {// добавила поле даты предполагаемой доставки
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Baskets");
  },
};
