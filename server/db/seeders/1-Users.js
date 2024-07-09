"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Администратор",
          email: "1@1",
          telephone: 123456789,
          userCity: "<Барнаул>",
          password:
            "$2b$10$WVs8fPAheiyRUMGp1HXkoe9AwZ9GYqkPNw/ekfxDmVG5k3ekwdowu",
          cashAccount: 0,
          isAdmin: true,
          photo: "________________",
        },
        {
          username: "Иван Петров",
          email: "qwe@qwe.qwe",
          telephone: 123456789,
          userCity: "Москва",
          password:
            "$2b$10$Su526nfL/UNhu5lCWInAJ.o0mUUpERYM6YxPxJmk77ZwxRqiRMz.y",
          cashAccount: 700,
          isAdmin: false,
          photo: "________________",
        },
        {
          username: "Олег Семенов",
          email: "1@2",
          telephone: 123456789,
          userCity: "Рязань",
          password:
            "$2b$10$WVs8fPAheiyRUMGp1HXkoe9AwZ9GYqkPNw/ekfxDmVG5k3ekwdowu",
          cashAccount: 0,
          isAdmin: false,
          photo: "________________",
        },
        {
          username: "spyder",
          email: "1@3",
          telephone: 123456789,
          userCity: "Краснодар",
          password:
            "$2b$10$yrZyQ3ym.FdyNfLD2bTYn./gutBJx48.2zryzBiUipfXjvVG6woea",
          cashAccount: 0,
          isAdmin: false,
          photo: "________________",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
