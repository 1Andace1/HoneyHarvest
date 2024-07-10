module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Baskets', [
        {
          UserId: 1,
          productId: 1,
          numberBasket: 2,
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          UserId: 2,
          productId: 2,
          numberBasket: 1,
          status: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          UserId: 1,
          productId: 3,
          numberBasket: 5,
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Baskets', null, {});
    }
  };