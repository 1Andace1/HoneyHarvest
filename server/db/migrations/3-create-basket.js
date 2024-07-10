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
          model: {
            tableName: 'Users',
          },
          key: 'id',
      },
      },
      productId: {
        onDelete: 'cascade',
        references: {
          model: {
            tableName: 'Products',
          },
          key: 'id',
        },
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      numberBasket: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.INTEGER,
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
