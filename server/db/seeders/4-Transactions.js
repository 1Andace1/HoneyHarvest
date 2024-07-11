'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Transactions', [
      {
        UserId: 1,
        productId: 1,
        titleOfProduct: 'Product 1',
        deliveryAddress: 'Address 1',
        quantity: 2,
        currentPrice: 100,
        currentDiscountRatio: 10,
        status: 1,
        commentAdmin: 'No comments',
        basketId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 1,
        productId: 2,
        titleOfProduct: 'Product 2',
        deliveryAddress: 'Address 2',
        quantity: 1,
        currentPrice: 50,
        currentDiscountRatio: 5,
        status: 1,
        comment: 'No comments',
        basketId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Transactions', null, {});
  }
};