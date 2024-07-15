const express = require('express');
const { verifyAccessToken } = require('../middlewares/verifyToken');
const { Basket , Product} = require('../../db/models');

const router = express.Router();

// 1. Добавление товара в корзину
router.post('/catalog', verifyAccessToken, async (req, res) => {
  const { userId, productId } = req.body;
  console.log(req.body, '+++++++++пост------------');
  console.log(userId, productId, '+++++++++++пост++++++++++');
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const entry = await Basket.create({ UserId: userId, productId, numberBasket: 1});
    res.status(201).json(entry);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

// 3. Обновление корзины (добавление/удаление товаров)
router.put('/put', verifyAccessToken, async (req, res) => {
  console.log('зашли в ручку put');
  // console.log(req.body, '++++++++++++req.body+++++++++++++');
  // const { userId, numberBasket, status, commentUser, totalBasketPrice, deliveryAddress , estimatedDate} = req.body;
  // console.log(userId, 'Я ЗАШЕЛ СЮДА В ЮЗЕР');
  // const { basketId, numberBasket } = req.body;
  const { basketId, numberBasket } = req.body;
  try {
    const basketItem = await Basket.findByPk(basketId);
    console.log(basketItem, 'Я СЮДА ЗАШЕЛ ++++++');
    if (!basketItem) {
      return res.status(404).json({ message: 'Basket item not found' });
    }

    await basketItem.update({ numberBasket });
    res.status(200).json({ message: 'Basket updated successfully' });

     } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 2. Просмотр корзины
router.get('/get', verifyAccessToken, async (req, res) => {
  const { userId } = req.query;
  console.log(req.query, '+++++++++гет------------');
  console.log(userId, '+++++++++++гет++++++++++');
  try {
    const entry = await Basket.findAll({
      where: {
        UserId: userId,
      },
      include: [
        {
          model: Product,
          as: 'product',
        },
      ],
    });    
    const totalPrice = entry.reduce((total, product) => total + product.numberBasket * (product.product.price), 0);
    console.log(entry,totalPrice, 'Я ЗАШЕЛ В ТОТАЛ ПРАЙС 2222');
    res.status(201).json({entry,totalPrice});
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});
//ручку написать для удаление из бд когда убрать нажимаешь 
router.delete('/delete/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;

  try {
    const basketItem  = await Basket.findByPk(id);
    
    if (!basketItem) {
      return res.status(404).json({ error: 'basketItem not found' });
    }
    await basketItem.destroy();
    res.status(200).json({ message: 'basketItem removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting basketItem' });
  }
});


module.exports = router;