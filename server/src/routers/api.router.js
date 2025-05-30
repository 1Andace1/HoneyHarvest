const router = require('express').Router();
const authRouter = require('./auth.api.router');
const tokensRouter = require('./tokens.api.router');
// const mainRouter = require('./main.api.router');
const profileRouter = require('./profile.api.router');
const basketRouter = require('./basket.api.router'); 
const catalogRouter = require('./catalog.api.router'); 
const commentRouter = require('./comment.api.router'); 
const orderRouter = require('./order.api.router'); 

const messagesRouter = require('./messages.router');
router.use('/tokens', tokensRouter);
router.use('/auth', authRouter);
// router.use('/main', mainRouter);
router.use('/profile', profileRouter);
router.use('/basket', basketRouter); 
router.use('/catalog', catalogRouter); 
router.use('/comment', commentRouter); 
router.use('/order', orderRouter); 

router.use('/messages', messagesRouter);
module.exports = router;
