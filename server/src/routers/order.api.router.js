const router = require('express').Router();
const { verifyAccessToken } = require('../middlewares/verifyToken');
const { Product, Comment, Like, Rating, Order } = require('../../db/models');
const { where } = require('sequelize');
const { response } = require('express');

// 4. Создание заказа
router.post('/', verifyAccessToken, async (req, res) => {
  const { userId, deliveryAddress } = req.body;
  try {
    const basketItems = await Basket.findAll({ where: { UserId: userId }, include: [{ model: Product, as: 'product' }] });
    if (basketItems.length === 0) {
      return res.status(400).json({ message: 'Basket is empty' });
    }

    const totalOrderPrice = basketItems.reduce((total, item) => total + item.numberBasket * item.product.price, 0);
    
    const order = await Order.create({ userId, totalOrderPrice, deliveryAddress, status: 'Pending' });
    
    await Promise.all(basketItems.map(async (item) => {
      await Transaction.create({
        UserId: userId,
        productId: item.productId,
        quantity: item.numberBasket,
        currentPrice: item.product.price,
        currentDiscountRatio: item.product.discountRatio,
        orderId: order.id,
      });
      await item.destroy();
    }));
    
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

module.exports = router;