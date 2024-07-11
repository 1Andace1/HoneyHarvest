"use strict";

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
      "Users",
      [
        {
          username: "Администратор",
          email: "2@2",
          telephone: "123456789",
          userCity: "Барнаул",
          password: adminPassword,
          cashAccount: 0,
          isAdmin: true,
          photo: "no-photo.jpg",
        },
        {
          username: "Иван Петров",
          email: "1@1",
          telephone: "123456790",
          userCity: "Москва",
          password: userPassword,
          cashAccount: 700,
          isAdmin: false,
          photo: "no-photo.jpg",
        },
        {
          username: "Олег Семенов",
          email: "1@2",
          telephone: "123456791",
          userCity: "Рязань",
          password: userPassword,
          cashAccount: 0,
          isAdmin: false,
          photo: "no-photo.jpg",
        },
        {
          username: "spyder",
          email: "1@3",
          telephone: "123456792",
          userCity: "Краснодар",
          password: userPassword,
          cashAccount: 0,
          isAdmin: false,
          photo: "no-photo.jpg",
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
      //   {
      //     username: "Иван Петров",
      //     email: "qwe@qwe.qwe",
      //     telephone: "123456790", 
      //     userCity: "Москва",
      //     password:
      //       "$2b$10$Su526nfL/UNhu5lCWInAJ.o0mUUpERYM6YxPxJmk77ZwxRqiRMz.y",
      //     cashAccount: 700,
      //     isAdmin: false,
      //     photo: "no-photo.jpg", // заглушка для фото
      //   },
      //   {
      //     username: "Олег Семенов",
      //     email: "1@2",
      //     telephone: "123456791",
      //     userCity: "Рязань",
      //     password:
      //       "$2b$10$WVs8fPAheiyRUMGp1HXkoe9AwZ9GYqkPNw/ekfxDmVG5k3ekwdowu",
      //     cashAccount: 0,
      //     isAdmin: false,
      //     photo: "no-photo.jpg", // заглушка для фото
      //   },
      //   {
      //     username: "spyder",
      //     email: "1@3",
      //     telephone: "123456792", 
      //     userCity: "Краснодар",
      //     password:
      //       "$2b$10$yrZyQ3ym.FdyNfLD2bTYn./gutBJx48.2zryzBiUipfXjvVG6woea",
      //     cashAccount: 0,
      //     isAdmin: false,
      //     photo: "no-photo.jpg", // заглушка для фото
      //   },
      // ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};