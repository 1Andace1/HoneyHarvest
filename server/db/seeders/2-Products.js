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
          // picture: './productsPhoto/107.jpeg', // !!! МАША ЭТО ПОХОЖЕ НАДО ИМЕНИТЬ!?! отчка в адресе была лишняя вначале
          picture: '/productsPhoto/107.jpeg',
          location: 'Башкирия',
          starsRating: 4,
          createdAt: Sequelize.fn("NOW"),
        },
        {
          title: 'Бортевый липовый мёд',
          price: 1500,
          discountRatio: 1,
          category: 'мёд',
          sort: 'липовый',
          description:
            'Липовый мёд собран бурзянской пчелой, обитающей в естественных условиях (в бортях), в экологически чистом районе',
          yearOfHarvest: 2023,
          availableQuantity: 20,
          picture: './productsPhoto/102.jpeg',
          location: 'Башкирия',
          starsRating: 5,
          createdAt: Sequelize.fn("NOW"),
        },
        {
          title: 'Цветочный мёд',
          price: 800,
          discountRatio: 0.8,
          category: 'мёд',
          sort: 'цветочный',
          description: 'Собран среди разнотравья на альпийских лугах Горного Алтая на высоте более 2500 метров над уровнем моря',
          yearOfHarvest: 2023,
          availableQuantity: 100,
          picture: './productsPhoto/103.jpeg',
          location: 'Алтай',
          starsRating: 3,
          createdAt: '2023-07-14 00:15:23.802 +0500',
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
          createdAt: '2023-07-14 00:15:23.802 +0500',
        },
        {
          title: 'Липовый мёд в сотах',
          price: 800,
          discountRatio: 0.8,
          category: 'мёд',
          sort: 'липовый',
          description: '___________описание____________',
          yearOfHarvest: 2022,
          availableQuantity: 4,
          picture: './productsPhoto/151.jpeg',
          location: 'Алтай',
          starsRating: 3,
          createdAt: '2023-07-14 00:15:23.802 +0500',
        },
        {
          title: 'Акациевый мёд',
          price: 1200,
          discountRatio: 1,
          category: 'мёд',
          sort: 'акациевый',
          description: 'Целительный акациевый мёд согреет Вас зимой и оздоровит',
          yearOfHarvest: 2023,
          availableQuantity: 60,
          picture: './productsPhoto/105.jpeg',
          location: 'Кавказ',
          starsRating: 5,
          createdAt: '2023-07-14 00:15:23.802 +0500',
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
          createdAt: '2023-07-14 00:15:23.802 +0500',
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
          picture: './productsPhoto/101.jpeg',
          location: 'Башкирия',
          starsRating: 3,
          createdAt: '2023-07-14 00:15:23.802 +0500',
        },
        {
          title: 'Донниковый мёд',
          price: 1200,
          discountRatio: 0.8,
          category: 'мёд',
          sort: 'донниковый',
          description: '___________описание____________',
          yearOfHarvest: 2022,
          availableQuantity: 4,
          picture: './productsPhoto/108.jpeg',
          location: 'Башкирия',
          starsRating: 3,
          createdAt: '2023-07-14 00:15:23.802 +0500',
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
          createdAt: '2023-07-14 00:15:23.802 +0500',
        },
        {
          title: 'Подсолнечный мёд',
          price: 600,
          discountRatio: 0.8,
          category: 'мёд',
          sort: 'подсолнечный',
          description: '___________описание____________',
          yearOfHarvest: 2022,
          availableQuantity: 40,
          picture: './productsPhoto/114.jpeg',
          location: 'Алтай',
          starsRating: 3,
          createdAt: '2023-07-14 00:15:23.802 +0500',
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
          createdAt: '2023-07-14 00:15:23.802 +0500',
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
          createdAt: '2023-07-14 00:15:23.802 +0500',
        },
        {
          title: 'Кипрейный мёд',
          price: 720,
          discountRatio: 1,
          category: 'мёд',
          sort: 'кипрейный',
          description: '___________описание____________',
          yearOfHarvest: 2023,
          availableQuantity: 4,
          picture: './productsPhoto/109.jpeg',
          location: 'Башкирия',
          starsRating: 3,
          createdAt: '2023-07-14 00:15:23.802 +0500',
        },
        {
          title: 'Гречишный мёд',
          price: 800,
          discountRatio: 0.9,
          category: 'мёд',
          sort: 'гречишный',
          description: '___________описание____________',
          yearOfHarvest: 2022,
          availableQuantity: 4,
          picture: './productsPhoto/110.jpeg',
          location: 'Башкирия',
          starsRating: 3,
          createdAt: '2023-07-14 00:15:23.802 +0500',
        },
        {
          title: 'Донниковый мёд',
          price: 1300,
          discountRatio: 0.7,
          category: 'мёд',
          sort: 'донниковый',
          description: '___________описание____________',
          yearOfHarvest: 2023,
          availableQuantity: 4,
          picture: './productsPhoto/111.jpeg',
          location: 'Башкирия',
          starsRating: 4,
          createdAt: '2023-07-14 00:15:23.802 +0500',
        },
        {
          title: 'Подсолнечный мёд',
          price: 800,
          discountRatio: 0.8,
          category: 'мёд',
          sort: 'подсолнечный',
          description: '___________описание____________',
          yearOfHarvest: 2022,
          availableQuantity: 4,
          picture: './productsPhoto/113.jpeg',
          location: 'Кавказ',
          starsRating: 5,
          createdAt: '2023-07-14 00:15:23.802 +0500',
        },
        {
          title: 'Цветочный мёд в сотах',
          price: 1200,
          discountRatio: 0.8,
          category: 'мёд',
          sort: 'цветочный',
          description: '___________описание____________',
          yearOfHarvest: 2024,
          availableQuantity: 12,
          picture: './productsPhoto/150.jpeg',
          location: 'Башкирия',
          starsRating: 5,
          createdAt: '2023-07-14 00:15:23.802 +0500',
        },
        {
          title: 'Гречишный мёд',
          price: 800,
          discountRatio: 0.8,
          category: 'мёд',
          sort: 'гречишный',
          description: '___________описание____________',
          yearOfHarvest: 2022,
          availableQuantity: 5,
          picture: './productsPhoto/115.jpeg',
          location: 'Башкирия',
          starsRating: 3,
          createdAt: '2023-07-14 00:15:23.802 +0500',
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
          picture: './productsPhoto/116.jpeg',
          location: 'Башкирия',
          starsRating: 3,
          createdAt: '2023-07-14 00:15:23.802 +0500',
        },
        {
          title: 'Подсолнечный мёд',
          price: 800,
          discountRatio: 0.9,
          category: 'мёд',
          sort: 'подсолнечный',
          description: '___________описание____________',
          yearOfHarvest: 2023,
          availableQuantity: 4,
          picture: './productsPhoto/112.jpeg',
          location: 'Башкирия',
          starsRating: 4,
          createdAt: '2023-07-14 00:15:23.802 +0500',
        },
        {
          title: 'Кипрейный бортевой мёд в сотах',
          price: 1300,
          discountRatio: 0.8,
          category: 'мёд',
          sort: 'кипрейный',
          description: '___________описание____________',
          yearOfHarvest: 2023,
          availableQuantity: 16,
          picture: './productsPhoto/152.jpeg',
          location: 'Башкирия',
          starsRating: 5,
          createdAt: '2023-07-14 00:15:23.802 +0500',
        },
        {
          title: 'Липовый горный мёд',
          price: 1500,
          discountRatio: 0.8,
          category: 'мёд',
          sort: 'липовый',
          description: '___________описание____________',
          yearOfHarvest: 2023,
          availableQuantity: 68,
          picture: './productsPhoto/118.jpeg',
          location: 'Башкирия',
          starsRating: 3,
          createdAt: '2023-07-14 00:15:23.802 +0500',
        },
        {
          title: 'Цветочный горный мёд',
          price: 800,
          discountRatio: 0.8,
          category: 'мёд',
          sort: 'цветочный',
          description: '___________описание____________',
          yearOfHarvest: 2022,
          availableQuantity: 4,
          picture: './productsPhoto/119.jpeg',
          location: 'Алтай',
          starsRating: 3,
          createdAt: '2023-07-14 00:15:23.802 +0500',
        },
        {
          title: 'Акациевый мёд',
          price: 800,
          discountRatio: 0.8,
          category: 'мёд',
          sort: 'акациевый',
          description: '___________описание____________',
          yearOfHarvest: 2022,
          availableQuantity: 4,
          picture: './productsPhoto/120.jpeg',
          location: 'Кавказ',
          starsRating: 3,
          createdAt: '2023-07-14 00:15:23.802 +0500',
        },
        {
          title: 'Липовый горный мёд',
          price: 800,
          discountRatio: 0.8,
          category: 'мёд',
          sort: 'липовый',
          description: '___________описание____________',
          yearOfHarvest: 2022,
          availableQuantity: 4,
          picture: './productsPhoto/121.jpeg',
          location: 'Кавказ',
          starsRating: 3,
          createdAt: '2023-07-14 00:15:23.802 +0500',
        },
        {
          title: 'Цветоный горный мёд',
          price: 800,
          discountRatio: 0.8,
          category: 'мёд',
          sort: 'цветочный',
          description: '___________описание____________',
          yearOfHarvest: 2022,
          availableQuantity: 4,
          picture: './productsPhoto/122.jpeg',
          location: 'Кавказ',
          starsRating: 3,
          createdAt: '2023-07-14 00:15:23.802 +0500',
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
          picture: './productsPhoto/123.jpeg',
          location: 'Башкирия',
          starsRating: 3,
          createdAt: '2023-07-14 00:15:23.802 +0500',
        },
        {
          title: 'Гречишный мёд',
          price: 800,
          discountRatio: 0.8,
          category: 'мёд',
          sort: 'гречишный',
          description: '___________описание____________',
          yearOfHarvest: 2022,
          availableQuantity: 4,
          picture: './productsPhoto/124.jpeg',
          location: 'Алтай',
          starsRating: 3,
          createdAt: '2023-07-14 00:15:23.802 +0500',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
