const router = require('express').Router();
const { verifyAccessToken } = require('../middlewares/verifyToken');
const { Product, Comment, Like, Rating } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const entries = await Product.findAll();
    const catalog = entries.map((el) => el.get({ plain: true }));

// console.log('catalog-------------++', catalog);

    res.json(catalog);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
