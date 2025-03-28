const router = require('express').Router();
const { verifyAccessToken } = require('../middlewares/verifyToken');
const { Product, Comment, User, Like, Rating } = require('../../db/models');
const { where } = require('sequelize');
const { response } = require('express');

router
  .get('/all', async (req, res) => {
    try {
      const entries = await Comment.findAll({
        include: {
          model: User,
          attributes: ['username'],
        },
      });
      const allComments = entries.map((el) => el.get({ plain: true }));
      res.json(allComments);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  })
  // .get('/commentsoncard/:id', async (req, res) => {
  //   const { id: productId } = req.params;
  //   try {
  //     const entries = await Comment.findAll({ where: { productId } });
  //     const allCommentsOnOneCard = entries.map((el) => el.get({ plain: true }));
  //     // console.log('AllCommentsOnOneCard------------->', allCommentsOnOneCard);
  //     res.json(allCommentsOnOneCard);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send(error.message);
  //   }
  // })
  .delete('/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    try {
      const comment = await Comment.findByPk(id);
      // проверка пользователя на наличие у него статуса админа или на авторство ранее созданного комментария:
      if (res.locals.user.isAdmin || res.locals.user.id === comment.userId) {
        comment.destroy();
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
    const { userId, productId, text } = req.body.inputs;
    // console.log('typeof userId', typeof userId, userId);
    // console.log('typeof productId', typeof productId, productId);
    // console.log('typeof text', typeof text, text);
    try {
      console.log(
        '++-----Зашли в TRY в ручке NEW в comment.api.router.js--------++'
      );
      const entry = await Comment.create({ userId, productId, text });
      const response = entry.get({ plain: true });
      res.json(response);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .put('/put', verifyAccessToken, async (req, res) => {
    const { id, userId, productId, text } = req.body;
    // console.log('typeof id', typeof id, id);
    // console.log('typeof userId', typeof userId, userId);
    // console.log('typeof productId', typeof productId, productId);
    // console.log('typeof text', typeof text, text);
    try {
      console.log(
        '++-----Зашли в TRY в ручке PUT в comment.api.router.js--------++'
      );
      const comment = await Comment.findByPk(id);
      // проверка юзера на авторство ранее созданного комментария:
      if (res.locals.user.id === comment.userId) {
        await comment.update({ userId, productId, text });
        const response = comment.get({ plain: true });
        res.send(response);
      } else {
        res.sendStatus(403);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .put('/putisverified', verifyAccessToken, async (req, res) => {
    // сделать мидлварку на проверку прав админа
    const { id, isVerified } = req.body;
    // console.log('typeof id', typeof id, id);
    // console.log('typeof isVerified', typeof isVerified, isVerified);
    try {
      // console.log('++-----Зашли в TRY-- в ручке PUTIsVerified в comment.api.router.js--------++');
      await Comment.update({ isVerified }, { where: { id } });
      const updatedEntry = await Product.findByPk(id);
      const response = updatedEntry.get({ plain: true });
      res.send(response);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })

  .put('/putlike/:id', verifyAccessToken, async (req, res) => {
    console.log('Мы зашли в ручку редактирования лайков');
    const { id } = req.params;
    const { userId } = req.body;
    const commentId = id;
    try {
      // const likeEntry = await Like.findOne({
      //   where: {
      //     commentId,
      //     userId
      //   }
      // });

// console.log('likeEntry', likeEntry);



      const entry = await Comment.findByPk(id);
      const newLikeCount = entry.likesQuantity + 1;
      // console.log('entry------->', entry);
      // console.log('newLikeCount------->', newLikeCount);
      await entry.update({
        likesQuantity: newLikeCount,
      });
      // console.log('Новая запись', entry);
      const response = { newLikeCount };
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  });

module.exports = router;
