const express = require('express');
const { verifyAccessToken } = require('../middlewares/verifyToken');
const { Basket, Product, Order, Transaction } = require('../../db/models');
const router = express.Router();

const addToBasket = async (
  userId,
  productId,
  orderId,
  numberBasket,
  status,
  commentUser,
  totalBasketPrice,
  deliveryAddress,
  date,
  estimatedDate,
) => {
  try {
    const basketItem = await Basket.create({
      userId,
      productId,
      orderId,
      numberBasket,
      status,
      commentUser,
      totalBasketPrice,
      deliveryAddress,
      date,
      estimatedDate,
    });
    return basketItem;
  } catch (error) {
    console.error('Error adding to basket:', error);
    throw error;
  }
};

async function createOrderAndAddToBasket(userData, basketItems) {
  const { userId, deliveryAddress } = userData;

  // Создание заказа
  const order = await Order.create({
    userId: userId,
    totalOrderPrice: calculateTotalOrderPrice(basketItems), // Рассчитываем общую стоимость заказа
    deliveryAddress: deliveryAddress,
    status: 'Pending', // Например, статус заказа
    // Другие поля заказа, которые необходимы
  });

  // Создание транзакций для каждого элемента корзины
  await Promise.all(
    basketItems.map(async (item) => {
      await item.update({
        orderId: order.id,
        deliveryAddress,
      });
    }),
  );

  return order;
}

// Расчет общей стоимости заказа
function calculateTotalOrderPrice(basketItems) {
  return basketItems.reduce(
    (total, item) => total + item.numberBasket * item.product.price,
    0,
  );
}

module.exports = {
  addToBasket,
  createOrderAndAddToBasket,
};
