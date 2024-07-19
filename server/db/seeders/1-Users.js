'use strict';

// добавила это, чтобы понимать, какие пароли вводить
const bcrypt = require('bcrypt');
const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // функция для генерации хэшированных паролей
    const generateHashedPassword = async (plainPassword) => {
      return await bcrypt.hash(plainPassword, saltRounds);
    };

    // генерация хэшированных паролей
    const adminPassword = await generateHashedPassword('111');
    const userPassword = await generateHashedPassword('222');

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'Администратор',
          email: '2@2',
          telephone: '123456789',
          userCity: 'Барнаул',
          password: adminPassword,
          cashAccount: 0,
          isAdmin: true,
          photo: 'no-photo.jpg', // заглушка для фото
        },
        {
          username: 'Админ из Чемала',
          email: 'admin@admin.admin',
          telephone: '4848785148',
          userCity: 'Чемал',
          password:
            '$2b$10$8twGfMWhatr.wNpizjqfOuEek5w381Wr7kaPEW1PpVDJkGUoMEswy',
          cashAccount: 0,
          isAdmin: true,
          photo: 'admin.jpeg',
        },
        {
          username: 'администратор Роман',
          email: 'admin@admin',
          telephone: '79876543219',
          userCity: 'Москва',
          password:
            '$2b$10$pmcbMD8DnKluY9jHa1uHnON7DglG9I2BaExYh3nfKNWvhavsqc5Bq',
          cashAccount: 0,
          isAdmin: true,
          photo: 'newadmin.jpeg',
        },
        {
          username: 'администратор Роман',
          email: 'admin@honey.com',
          telephone: '79876543210',
          userCity: 'Москва',
          password:
            '$2b$10$pmcbMD8DnKluY9jHa1uHnON7DglG9I2BaExYh3nfKNWvhavsqc5Bq',
          cashAccount: 0,
          isAdmin: true,
          photo: 'newadmin.jpeg',
        },
        {
          username: 'администратор Роман',
          email: 'admin@admin.com',
          telephone: '89876543210',
          userCity: 'Москва',
          password:
            '$2b$10$pmcbMD8DnKluY9jHa1uHnON7DglG9I2BaExYh3nfKNWvhavsqc5Bq',
          cashAccount: 0,
          isAdmin: true,
          photo: 'newadmin.jpeg',
        },
        {
          username: 'Гриша Табачков',
          email: 'grisha@grisha.com',
          telephone: '89865432107',
          userCity: 'Москва',
          password:
            '$2b$10$pmcbMD8DnKluY9jHa1uHnON7DglG9I2BaExYh3nfKNWvhavsqc5Bq',
          cashAccount: 0,
          isAdmin: false,
          photo: 'no-photo.jpeg', // заглушка для фото
        },
        {
          username: 'Максим Кошеутов',
          email: 'max@max.com',
          telephone: '89543210786',
          userCity: 'Москва',
          password:
            '$2b$10$pmcbMD8DnKluY9jHa1uHnON7DglG9I2BaExYh3nfKNWvhavsqc5Bq',
          cashAccount: 0,
          isAdmin: false,
          photo: 'no-photo.jpeg', // заглушка для фото
        },
        {
          username: 'Антон Атнагулов',
          email: 'anton@anton.com',
          telephone: '89843210765',
          userCity: 'Москва',
          password:
            '$2b$10$pmcbMD8DnKluY9jHa1uHnON7DglG9I2BaExYh3nfKNWvhavsqc5Bq',
          cashAccount: 0,
          isAdmin: false,
          photo: 'no-photo.jpeg',
        },
        {
          username: 'Денис Образцов',
          email: 'denis@denis.com',
          telephone: '89862107543',
          userCity: 'Москва',
          password:
            '$2b$10$pmcbMD8DnKluY9jHa1uHnON7DglG9I2BaExYh3nfKNWvhavsqc5Bq',
          cashAccount: 0,
          isAdmin: false,
          photo: 'no-photo.jpeg',
        },
        {
          username: 'Света Корейша',
          email: 'sveta@sveta.com',
          telephone: '89846532107',
          userCity: 'Москва',
          password:
            '$2b$10$pmcbMD8DnKluY9jHa1uHnON7DglG9I2BaExYh3nfKNWvhavsqc5Bq',
          cashAccount: 0,
          isAdmin: false,
          photo: 'no-photo.jpeg',
        },
        {
          username: 'Иван Петров',
          email: '1@1',
          telephone: '123456790',
          userCity: 'Москва',
          password: userPassword,
          cashAccount: 700,
          isAdmin: false,
          photo: 'no-photo.jpg',
        },
        {
          username: 'Олег Семенов',
          email: '1@2',
          telephone: '123456791',
          userCity: 'Рязань',
          password: userPassword,
          cashAccount: 0,
          isAdmin: false,
          photo: 'no-photo.jpg',
        },
        {
          username: 'spyder',
          email: '1@3',
          telephone: '123456792',
          userCity: 'Краснодар',
          password: userPassword,
          cashAccount: 0,
          isAdmin: false,
          photo: 'no-photo.jpg',
        },
        {
          username: 'Иван Кузнецов',
          email: 'qwe@qwe.qwe',
          telephone: '14818165656',
          userCity: 'Петропавловск-Камчатский',
          password:
            '$2b$10$EGdL7CMHrH4ULizl8YJ8me.dDUY5VRDmtYH1edkkZjdq0iK9.iZs.',
          cashAccount: 1000,
          isAdmin: false,
          photo: 'img-02.jpeg',
        },
        {
          username: 'Иван Петров',
          email: 'hnfng@qnhfnhgnhgnh',
          telephone: '1231561456790',
          userCity: 'Москва',
          password:
            '$2b$10$Su526nfL/UNhu5lCWInAJ.o0mUUpERYM6YxPxJmk77ZwxRqiRMz.y',
          cashAccount: 700,
          isAdmin: false,
          photo: 'no-photo.jpg',
        },
        {
          username: 'Олег Семенов',
          email: 'gnhgtyhtnfhnd@tmjy,yjjnghn',
          telephone: '1234547866791',
          userCity: 'Рязань',
          password:
            '$2b$10$WVs8fPAheiyRUMGp1HXkoe9AwZ9GYqkPNw/ekfxDmVG5k3ekwdowu',
          cashAccount: 0,
          isAdmin: false,
          photo: 'no-photo.jpg',
        },
        {
          username: 'Оля Расторгуева',
          email: 'vrjuy@hyoij;hrt',
          telephone: '123454915966256792',
          userCity: 'Краснодар',
          password:
            '$2b$10$yrZyQ3ym.FdyNfLD2bTYn./gutBJx48.2zryzBiUipfXjvVG6woea',
          cashAccount: 0,
          isAdmin: false,
          photo: 'no-photo.jpg',
        },
      ],
      // [
      //   {
      //     username: "Администратор",
      //     email: "2@2",
      //     telephone: "123456789", // ! используем тип STRING для telephone, тк конвертация автоматич идет секвалайза и постресс в строки
      //     userCity: "Барнаул",
      //     password:
      //       "$2b$10$WVs8fPAheiyRUMGp1HXkoe9AwZ9GYqkPNw/ekfxDmVG5k3ekwdowu",
      //     cashAccount: 0,
      //     isAdmin: true,
      //     photo: "no-photo.jpg", // заглушка для фото
      //   },
      // ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
