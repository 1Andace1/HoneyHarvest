"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Baskets",
      [
        {
          UserId: 2, // Иван Петров
          orderId: 1, // ! МАША ДОБАВИЛА // связываем с первым заказом
          productId: 1,
          numberBasket: "2",
          status: "1", // например, статус "в обработке"
          commentUser: "Срочная доставка",
          totalBasketPrice: "3000",
          deliveryAddress: "ул. Ленина, д. 10, Барнаул",
          date: new Date(), // текущая дата
          estimatedDate: new Date(new Date().setDate(new Date().getDate() + 10)), // через 3 дня
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserId: 2, // Иван Петров
          orderId: 2, // ! МАША ДОБАВИЛА // связываем со вторым заказом
          productId: 2,
          numberBasket: "1",
          status: "2", // например, статус "доставляется"
          commentUser: "Доставка в офис",
          totalBasketPrice: "4500",
          deliveryAddress: "ул. Тверская, д. 15, Москва",
          date: new Date(),
          estimatedDate: new Date(new Date().setDate(new Date().getDate() + 5)), // через 5 дней
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserId: 3, // Олег Семенов
          orderId: 3, // ! МАША ДОБАВИЛА  // связываем с третьим заказом
          productId: 3,
          numberBasket: "5",
          status: "3", // например, статус "доставлено"
          commentUser: "Без комментариев",
          totalBasketPrice: "1500",
          deliveryAddress: "ул. Пушкина, д. 20, Рязань",
          date: new Date(),
          estimatedDate: new Date(new Date().setDate(new Date().getDate() + 7)), // через 7 дней
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserId: 4, // spyder
          orderId: 4, // ! МАША ДОБАВИЛА // связываем с четвертым заказом
          productId: 3,
          numberBasket: "5",
          status: "1", // например, статус "в обработке"
          commentUser: "Доставка в пункт выдачи",
          totalBasketPrice: "2500",
          deliveryAddress: "ул. Красная, д. 30, Краснодар",
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