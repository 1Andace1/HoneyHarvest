const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const generateToken = require('../utils/generateToken');
const cookiesConfig = require('../configs/cookiesConfig');
const { where } = require('sequelize');

// ^ добавляю малтера для возможности загрузок фото
const multer = require('multer'); 
const storage = multer.memoryStorage();
const upload = multer({ storage });

//  ПЕРВЫЙ РУТ для Регистрации нового пользователя (POST запроса /signup)
router
  .post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const profilePhoto = req.file; // доступ к загруженному файлу

    if (!(username && email && password)) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // const [user, created] = await User.findOrCreate({
      //   where: { email },
      //   defaults: {
      //     username,
      //     email,
      //     password: await bcrypt.hash(password, 10),
      //     profilePhoto: profilePhoto
      //       ? profilePhoto.buffer.toString('base64')
      //       : null, // преобразование фото в base64
      //   },
      // });

      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username,
          email,
          password: await bcrypt.hash(password, 10)
        }
      });

      // NEW обновление профиля пользователя с фото
      if (profilePhoto) {
        user.profilePhoto = profilePhoto.buffer.toString("base64");
        await user.save();
      }

      if (!created) {
        return res.status(403).json({ message: 'User already exists' });
      }

      const plainUser = user.get();
      delete plainUser.password;
      console.log('plainUser from auth.api.router', plainUser);

      //! Генерируем access и refresh
      const { accessToken, refreshToken } = generateToken({ user: plainUser });

      //! Устанавливаем cookie с access токеном
      res
        .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
        .json({ user: plainUser, accessToken });
    } catch (error) {
      console.error('Error during signup:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  })
  //  ВТОРОЙ РУТ для Авторизации существующего пользователя
  .post('/signin', async (req, res) => {
    const { email, password } = req.body;

    console.log('=============req.body', req.body);
    console.log('=============email', email);
    console.log('=============password', password);

    if (!(email && password)) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'Incorrect user or password' });
      }

      //  проверка правильности пароля
      const correctPass = await bcrypt.compare(password, user.password);
      if (!correctPass) {
        return res.status(401).json({ message: 'Incorrect user or password' });
      }

      const plainUser = user.get();
      delete plainUser.password;

      const { accessToken, refreshToken } = generateToken({ user: plainUser });

      res
        .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
        .status(200)
        .json({ user: plainUser, accessToken });
    } catch (error) {
      console.log('Ошибка catch в .post("/signin"', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  })
  // ТРЕТИЙ РУТ Выход пользователя (GET запроса /logout):
  // выход + очищение куки с refresh токеном
  // Сервер должен очищать куки в браузере, а клиент должен очищать access токен из переменной.
  .get('/logout', (req, res) => {
    try {
      // Очистка cookie с refreshToken
      res.clearCookie('refreshToken').sendStatus(200);
    } catch (error) {
      console.log('Ошибка в удалении .get("/logout', error);
      return res.sendStatus(500);
    }
  });

module.exports = router;
