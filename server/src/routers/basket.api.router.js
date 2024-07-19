const express = require('express');
const { verifyAccessToken } = require('../middlewares/verifyToken');
const { Basket , Product} = require('../../db/models');

const router = express.Router();

router.post('/catalog', verifyAccessToken, async (req, res) => {
  const { userId, productId } = req.body;
  console.log(req.body, '+++++++++пост------------');
  console.log(userId, productId, '+++++++++++пост++++++++++');
  try {
    const entry = await Basket.create({ UserId: userId, productId });
    res.status(201).json(entry);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.put('/put', verifyAccessToken, async (req, res) => {
  console.log('зашли в ручку put');
  console.log(req.body, '++++++++++++req.body+++++++++++++');
  const { userId, numberBasket, status, commentUser, totalBasketPrice, deliveryAddress , estimatedDate} = req.body;
  console.log(userId, 'Я ЗАШЕЛ СЮДА В ЮЗЕР');

  try {
    const entries = await Basket.findAll({ where: { UserId: userId } });
    console.log(entries, 'Я СЮДА ЗАШЕЛ ++++++');

    if (entries.length === 0) {
      return res.status(404).json({ error: 'No entries found for this userId' });
    }

    for (let entry of entries) {
      console.log(entry, 'PPPPPPPPPPPPPPPPPP');
      await entry.update({
        numberBasket,
        status,
        commentUser,
        totalBasketPrice,
        deliveryAddress,
        estimatedDate,
      
      });
    }

    res.status(200).json({ message: 'Entries updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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
    const totalPrice = entry.reduce((total, product) => total + product.productId * (product.product.price), 0);
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
    const productToDelete = await Basket.findOne({ where: { id } });
    if (!productToDelete) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await productToDelete.destroy();
    res.status(200).json({ message: 'Product removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;