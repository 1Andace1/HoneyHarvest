'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        onDelete: 'cascade',
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      commentId: {
        onDelete: 'cascade',
        references: {
          model: {
            tableName: 'Comments',
          },
          key: 'id',
        },
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      isLiked: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Likes');
  },
};
