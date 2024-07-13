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
  // .post('/new', verifyAccessToken, async (req, res) => {
  //   const {
  //     title,
  //     priceString,
  //     discountRatioString,
  //     category,
  //     sort,
  //     description,
  //     yearOfHarvestString,
  //     availableQuantityString,
  //     // picture,
  //     location,
  //   } = req.body.inputs;
  //   const price = Number(priceString);
  //   const discountRatio = Number(discountRatioString);
  //   const yearOfHarvest = Number(yearOfHarvestString);
  //   const availableQuantity = Number(availableQuantityString);

  //   console.log('typeof price', typeof price, price);
  //   console.log('typeof title', typeof title, title);
  //   console.log('typeof price', typeof price, price);
  //   console.log('typeof discountRatio', typeof discountRatio, discountRatio);
  //   console.log('typeof category', typeof category, category);
  //   console.log('typeof sort', typeof sort, sort);
  //   console.log('typeof description', typeof description, description);
  //   console.log('typeof yearOfHarvest', typeof yearOfHarvest, yearOfHarvest);
  //   // console.log('typeof picture', typeof picture, picture);
  //   console.log('typeof location', typeof location, location);



  //   try {
  //     console.log('++-------Зашли в TRY в ручке catalog.api.router.js----------++');
  //     const entry = await Product.create({
  //       title,
  //       price,
  //       discountRatio,
  //       category,
  //       sort,
  //       description,
  //       yearOfHarvest,
  //       availableQuantity,
  //       // picture,
  //       location,
  //     });
  //     res.json(entry);
  //   } catch (error) {
  //     console.error(error);
  //     res.sendStatus(400);
  //   }
  // })




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
    // console.log('typeof price', typeof price, price);
    // console.log('typeof title', typeof title, title);
    // console.log('typeof price', typeof price, price);
    // console.log('typeof discountRatio', typeof discountRatio, discountRatio);
    // console.log('typeof category', typeof category, category);
    // console.log('typeof sort', typeof sort, sort);
    // console.log('typeof description', typeof description, description);
    // console.log('typeof yearOfHarvest', typeof yearOfHarvest, yearOfHarvest);
    // console.log('typeof picture', typeof picture, picture);
    // console.log('typeof location', typeof location, location);
    try {
      console.log('++-------Зашли в TRY в ручке NEW в catalog.api.router.js----------++');
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
      const updatedEntry = await Product.update({
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
      res.json(updatedEntry);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })









module.exports = router;
