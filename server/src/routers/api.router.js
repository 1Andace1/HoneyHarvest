const router = require('express').Router();
const authRouter = require('./auth.api.router');
const tokensRouter = require('./tokens.api.router');
const mainRouter = require('./main.api.router');
const basketRouter = require('./basket.api.router'); 

router.use('/tokens', tokensRouter);
router.use('/auth', authRouter);
router.use('/main', mainRouter);
router.use('/basket', basketRouter); 

module.exports = router;
