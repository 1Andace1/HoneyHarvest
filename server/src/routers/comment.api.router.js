const router = require('express').Router();
const { verifyAccessToken } = require('../middlewares/verifyToken');
const { Product, Comment, Like, Rating } = require('../../db/models');
const { where } = require('sequelize');

router
.get('/allcomments', async (req, res) => {
    try {
      const entries = await Comment.findAll({ where: { productId }});
      const allComments = entries.map((el) => el.get({ plain: true }));
      // console.log('allComments-------------++', allComments);
      res.json(allComments);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  })
  .get('/commentsoncard/:id', async (req, res) => {
    const { id: productId } = req.params;
    try {
      const entries = await Comment.findAll({ where: { productId }});
      const allCommentsOnOneCard = entries.map((el) => el.get({ plain: true }));
      // console.log('AllCommentsOnOneCard-------------++', allCommentsOnOneCard);
      res.json(allCommentsOnOneCard);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  })
  .delete('/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    try {
      const comment = await Comment.findByPk(id);
      // if (res.locals.user.id === product.userId) {  // здесь сделать сравнение с id юзера и id админа (предварительно осуществить поиск всех админов в БД)
      comment.destroy();
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
    const {  userId,  productId,  text } = req.body.inputs;
    // console.log('typeof userId', typeof userId, userId);
    // console.log('typeof productId', typeof productId, productId);
    // console.log('typeof text', typeof text, text);
      try {
      console.log('++-------Зашли в TRY в ручке NEW в catalog.api.router.js----------++');
      const entry = await Comment.create({userId, productId, text});
      res.json(entry);
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

    console.log('typeof price', typeof price, price);
    console.log('typeof title', typeof title, title);
    console.log('typeof price', typeof price, price);
    console.log('typeof discountRatio', typeof discountRatio, discountRatio);
    console.log('typeof category', typeof category, category);
    console.log('typeof sort', typeof sort, sort);
    console.log('typeof description', typeof description, description);
    console.log('typeof yearOfHarvest', typeof yearOfHarvest, yearOfHarvest);
    // console.log('typeof picture', typeof picture, picture);
    console.log('typeof location', typeof location, location);



    try {
      console.log('++-------Зашли в TRY в ручке PUT в catalog.api.router.js----------++');
      await Product.update({
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
    { where: { id }});
    const updatedEntry = await Product.findByPk(id)
      res.send(updatedEntry);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })

module.exports = router;
