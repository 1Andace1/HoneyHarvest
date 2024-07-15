'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Orders',
      [
        {
          userId: 2, // Иван Петров
          totalOrderPrice: 3000,
          status: 'в обработке',
          deliveryAddress: 'ул. Ленина, д. 10, Барнаул',
          date: new Date(),
          estimatedDate: new Date(
            new Date().setDate(new Date().getDate() + 10),
          ),
          commentUser: 'Быстрее ребятки  =)))',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2, // Иван Петров
          totalOrderPrice: 4500,
          status: 'доставляется',
          deliveryAddress: 'ул. Тверская, д. 15, Москва',
          date: new Date(),
          estimatedDate: new Date(new Date().setDate(new Date().getDate() + 5)),
          commentUser: 'Норм ребятки  =)))',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3, // Олег Семенов
          totalOrderPrice: 1500,
          status: 'доставлено',
          deliveryAddress: 'ул. Пушкина, д. 20, Рязань',
          date: new Date(),
          estimatedDate: new Date(new Date().setDate(new Date().getDate() + 7)),
          commentUser: 'Норм ребятки  =)))',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4, // spyder
          totalOrderPrice: 2500,
          status: 'в обработке',
          deliveryAddress: 'ул. Красная, д. 30, Краснодар',
          date: new Date(),
          estimatedDate: new Date(new Date().setDate(new Date().getDate() + 4)),
          commentUser: 'Норм ребятки  =)))',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
