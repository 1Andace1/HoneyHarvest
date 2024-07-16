const router = require('express').Router();
const { verifyAccessToken } = require('../middlewares/verifyToken');
const { Product, Comment, Like, Rating } = require('../../db/models');

router
  .get('/', async (req, res) => {
    try {
      const entries = await Product.findAll();
      const catalog = entries.map((el) => el.get({ plain: true }));
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
      // проверка пользователя на наличие у него статуса админа:
      if (res.locals.user.isAdmin) {
        product.destroy();
        res.sendStatus(200);
      } else {
        res.sendStatus(403);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  })
  .post('/new', verifyAccessToken, async (req, res) => {
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
    } = req.body.inputs;
    try {
      const entry = await Product.create({
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
      });
      const response = entry.get({ plain: true });
      res.json(response);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })

  .put('/put', verifyAccessToken, async (req, res) => {
    const {
      id,
      title,
      priceString,
      discountRatioString,
      category,
      sort,
      description,
      yearOfHarvestString,
      availableQuantityString,
      // picture,
      location,
    } = req.body;
    const price = Number(priceString);
    const discountRatio = Number(discountRatioString);
    const yearOfHarvest = Number(yearOfHarvestString);
    const availableQuantity = Number(availableQuantityString);

    try {
      await Product.update(
        {
          title,
          price,
          discountRatio,
          category,
          sort,
          description,
          yearOfHarvest,
          availableQuantity,
          // picture,
          location,
        },
        { where: { id } }
      );
      const updatedEntry = await Product.findByPk(id);
      res.send(updatedEntry);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  });

module.exports = router;
