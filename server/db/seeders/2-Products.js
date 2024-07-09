'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          title: 'Липовый мёд',
          price: 1000,
          discountRatio: 0.9,
          category: 'мёд',
          sort: 'липовый',
          description:
            'Вкуснейший липовый мёд собран в экологически чистой горной местности, вдали от промышленных производств, городов и шоссейных дорог',
          yearOfHarvest: 2023,
          availableQuantity: 100,
          picture: './productsPhoto/101.jpeg',
          location: 'Башкирия',
          starsRating: 4,
        },
        {
          title: 'Бортевый липовый мёд',
          price: 1500,
          discountRatio: 1,
          category: 'мёд',
          sort: 'липовый',
          description:
            'Липовый мёд собран бурзянской пчелой в естественных условиях обитания (в бортях) в экологически чистом районе',
          yearOfHarvest: 2023,
          availableQuantity: 20,
          picture: './productsPhoto/102.jpeg',
          location: 'Башкирия',
          starsRating: 5,
        },
        {
          title: 'Цветочный мёд',
          price: 800,
          discountRatio: 0.8,
          category: 'мёд',
          sort: 'цветочный',
          description: '___________описание____________',
          yearOfHarvest: 2023,
          availableQuantity: 100,
          picture: './productsPhoto/103.jpeg',
          location: 'Алтай',
          starsRating: 3,
        },
        {
          title: 'Таволговый мёд',
          price: 800,
          discountRatio: 0.8,
          category: 'мёд',
          sort: 'таволговый',
          description: '__________описание_____________',
          yearOfHarvest: 2023,
          availableQuantity: 100,
          picture: './productsPhoto/104.jpeg',
          location: 'Алтай',
          starsRating: 4,
        },
        {
          title: 'Акациевый мёд',
          price: 1200,
          discountRatio: 1,
          category: 'мёд',
          sort: 'акациевый',
          description: '___________описание____________',
          yearOfHarvest: 2023,
          availableQuantity: 60,
          picture: './productsPhoto/105.jpeg',
          location: 'Кавказ',
          starsRating: 5,
        },
        {
          title: 'Цветочный мёд',
          price: 900,
          discountRatio: 0.6,
          category: 'мёд',
          sort: 'цветочный',
          description: '__________описание_____________',
          yearOfHarvest: 2022,
          availableQuantity: 4,
          picture: './productsPhoto/106.jpeg',
          location: 'Кавказ',
          starsRating: 3,
        },
        {
          title: 'Кипрейный мёд',
          price: 800,
          discountRatio: 0.8,
          category: 'мёд',
          sort: 'кипрейный',
          description: '___________описание____________',
          yearOfHarvest: 2022,
          availableQuantity: 4,
          picture: './productsPhoto/107.jpeg',
          location: 'Башкирия',
          starsRating: 3,
        },
        {
          title: 'Перга',
          price: 10000,
          discountRatio: 0.9,
          category: 'перга',
          sort: 'гранулированная',
          description: '_____________описание__________',
          yearOfHarvest: 2023,
          availableQuantity: 10,
          picture: './productsPhoto/401.jpeg',
          location: 'Кавказ',
          starsRating: 0,
        },
        {
          title: 'Прополис',
          price: 12000,
          discountRatio: 0.9,
          category: 'прополис',
          sort: 'прополис',
          description: '__________описание_____________',
          yearOfHarvest: 2023,
          availableQuantity: 50,
          picture: './productsPhoto/301.jpeg',
          location: 'Алтай',
          starsRating: 4,
        },
        {
          title: 'Воск',
          price: 3000,
          discountRatio: 1,
          category: 'воск',
          sort: 'пчелиный',
          description:
            `Чистый и высококачественный воск-капанец без посторонных примесей. 
            Получен путём сухой вытопки с использованием солнечных воскотопок. 
            Пригоден для производства натуральной косметики и свечей`,
          yearOfHarvest: 2023,
          availableQuantity: 50,
          picture: './productsPhoto/203.jpeg',
          location: 'Кавказ',
          starsRating: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
