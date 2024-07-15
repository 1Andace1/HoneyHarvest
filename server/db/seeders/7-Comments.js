'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Comments',
      [
        {
          userId: 6,
          productId: 1,
          text: 'Мне понравился, очень вкусный',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 2,
          productId: 1,
          text: 'вкусный и свежий. обязательно куплю ещё',
          isVerified: false,
          likesQuantity: 2,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 3,
          productId: 1,
          text: 'вот вкус настоящего мёда',
          isVerified: true,
          likesQuantity: 1,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 6,
          productId: 1,
          text: 'Мне понравился, очень вкусный',
          isVerified: true,
          likesQuantity: 2,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 2,
          productId: 1,
          text: 'вкусный и свежий. обязательно куплю ещё',
          isVerified: true,
          likesQuantity: 1,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 3,
          productId: 1,
          text: 'вот вкус настоящего мёда',
          isVerified: true,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 3,
          productId: 4,
          text: 'Классный медок. Сделайте мне персональную скидку и я еще куплю',
          isVerified: false,
          likesQuantity: 2,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 5,
          productId: 4,
          text: 'Продам курсы по обучению професси курьера. Научу также лёгкому трудоустройству после окончания курсов. Самая востребованная профессия, что подтверждается последними социологическими исследованиями. Высокие зарплаты. Звоните в любое время суток: +7123456789',
          isVerified: false,
          likesQuantity: 0,
          createdAt: Sequelize.fn('NOW'),
        },
        {
          userId: 6,
          productId: 3,
          text: 'Спасибо этой пасеке за вкусный свежий мёд. Быстрая доставка. Цены в этом интернет-магазине лучше, чем в супермаркете',
          isVerified: true,
          likesQuantity: 5,
          createdAt: '2023-08-05 09:18:23.802 +0500',
        },
        {
          userId: 2,
          productId: 3,
          text: 'вот вкус настоящего мёда',
          isVerified: true,
          likesQuantity: 3,
          createdAt: '2023-09-10 11:02:12.802 +0500',
        },
        {
          userId: 3,
          productId: 3,
          text: 'вкусный и свежий. обязательно куплю ещё такого мёда',
          isVerified: true,
          likesQuantity: 0,
          createdAt: '2023-10-25 19:35:48.802 +0500',
        },
        {
          userId: 4,
          productId: 3,
          text: 'Это НАСТОЯЩИЙ МЁЁЁД!!! Хочу ЕЩЁЁЁ!!!',
          isVerified: true,
          likesQuantity: 3,
          createdAt: '2023-10-25 19:35:48.802 +0500',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  },
};
