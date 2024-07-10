"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Baskets",
      [
        {
          UserId: 2, // Иван Петров
          totalBasketPrice: 3000,
          deliveryAddress: "ул. Ленина, д. 10, Барнаул",
          status: 1, // например, статус "в обработке"
          comment: "Срочная доставка",
          date: new Date(), // текущая дата
          estimatedDate: new Date(new Date().setDate(new Date().getDate() + 10)), // через 3 дня
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserId: 2, // Иван Петров
          totalBasketPrice: 4500,
          deliveryAddress: "ул. Тверская, д. 15, Москва",
          status: 2, // например, статус "доставляется"
          comment: "Доставка в офис",
          date: new Date(),
          estimatedDate: new Date(new Date().setDate(new Date().getDate() + 5)), // через 5 дней
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserId: 3, // Олег Семенов
          totalBasketPrice: 1500,
          deliveryAddress: "ул. Пушкина, д. 20, Рязань",
          status: 3, // например, статус "доставлено"
          comment: "Без комментариев",
          date: new Date(),
          estimatedDate: new Date(new Date().setDate(new Date().getDate() + 7)), // через 7 дней
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserId: 4, // spyder
          totalBasketPrice: 2500,
          deliveryAddress: "ул. Красная, д. 30, Краснодар",
          status: 1, // например, статус "в обработке"
          comment: "Доставка в пункт выдачи",
          date: new Date(),
          estimatedDate: new Date(new Date().setDate(new Date().getDate() + 4)), // через 4 дня
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Baskets", null, {});
  },
};