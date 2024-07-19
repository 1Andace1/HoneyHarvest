// & ЭТА МИДЛВАРКА ПРОВЕРЯТ корректность токена
// & если все ок, то данные добавляются в res.locals.user

const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyRefreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new Error('🔴Refresh token missing');
    }
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    res.locals.user = user;

    return next();
  } catch (error) {
    console.log('🔴Invalid refresh token');
    return res.clearCookie('refreshToken').sendStatus(401);
  }
};

const verifyAccessToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    if (!accessToken) {
      throw new Error('🔴 Access token missing');
    }
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    res.locals.user = user;

    return next();
  } catch (error) {
    console.log('🔴 Invalid access token', error);
    return res.sendStatus(403);
  }
};

module.exports = { verifyAccessToken, verifyRefreshToken };