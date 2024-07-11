const express = require('express');
const { verifyAccessToken } = require('../middlewares/verifyToken');
const { Basket } = require('../../db/models');

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
        estimatedDate
      });
    }

    res.status(200).json({ message: 'Entries updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;