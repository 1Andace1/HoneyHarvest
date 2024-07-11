const router = require('express').Router();
const { verifyAccessToken } = require('../middlewares/verifyToken');
const { Product, Comment, Like, Rating } = require('../../db/models');

router
  .get('/', async (req, res) => {
    try {
      const entries = await Product.findAll();
      const catalog = entries.map((el) => el.get({ plain: true }));

      // console.log('catalog-------------++', catalog);

      res.json(catalog);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  })
  .delete('/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);
      // if (res.locals.user.id === product.userId) {  // здесь сделать сравнение с id админа, для чего предварительно осуществить поиск всех админов в БД
      product.destroy();
      res.sendStatus(200);
      // } else {
      // res.sendStatus(403);
      // }
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  })
  .post('/new', verifyAccessToken, async (req, res) => {

console.log('++-------Зашли в ручку catalog.api.router.js,  req.body ===', req.body);

    const {
      title,
      price,
      discountRatio,
      category,
      sort,
      description,
      yearOfHarvest,
      availableQuantity,
      picture,
      location,
      starsRating,
    } = req.body;

    console.log('req.body-------++', req.body);

    try {
      const entry = await Resume.create({
      title,
      price,
      discountRatio,
      category,
      sort,
      description,
      yearOfHarvest,
      availableQuantity,
      picture,
      location,
      starsRating,
      });
      res.json(entry);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  });

module.exports = router;
