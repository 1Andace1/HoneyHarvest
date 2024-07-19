const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Basket, Transaction, Product, Order } = require('../../db/models');
const { Op } = require('sequelize');
// const { verifyAccessToken } = require("../middlewares/verifyToken");
// ^ добавляю малтера для возможности загрузок фото
const upload = require('../middlewares/uploadPhotos');
// const multer = require("multer");
// const storageConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });
// const upload = multer({ storage: storageConfig });

// * Роут для обновления профиля пользователя
// ? из ручки был удален verifyAccessToken
router.put('/users/:id', upload.single('profilePhoto'), async (req, res) => {
  const { username, email, password, telephone, userCity } = req.body;
  const profilePhoto = req.file; // доступ к загруженному файлу

  console.log('PROFILE =============req.body', req.body);
  console.log('PROFILE =============username', username);
  console.log('PROFILE =============email', email);
  console.log('PROFILE =============password', password);
  console.log('PROFILE =============profilePhoto', profilePhoto);
  console.log('PROFILE =============telephone', telephone);
  console.log('PROFILE =============userCity', userCity);

  if (!(username && email)) {
    return res
      .status(400)
      .json({ message: 'Введение имени и почты обязательно' });
  }

  try {
    const user = await User.findByPk(req.params.id);
    // let photoPath = 'uploads/no-photo.jpg'; // ^ new

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const updatedData = {
      username,
      email,
      telephone,
      userCity,
    };

    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    if (profilePhoto) {
      // user.profilePhoto = `/${profilePhoto.filename}`; // ! для загрузки фото тут должен быть полностью прямой путь папка-статичная-> и название фото и все!
      // await user.save();
      // photoPath = profilePhoto.path; // ^ new
      // photoPath = profilePhoto.originalname;
      // console.log('🟧 =============profilePhoto',  profilePhoto);
      // console.log('🟧 =============profilePhoto',  photoPath);
      // updatedData.profilePhoto = photoPath
      updatedData.photo = `${profilePhoto.filename}`;
    }

    //! надо перезаписать все юзера и потом сделать было save!
    // user.username = updatedData.username;
    // user.password = updatedData.password;
    // user.email = updatedData.email;
    // user.telephone = updatedData.telephone;
    // user.userCity = updatedData.userCity;
    // await user.update(updatedData); // ^ new
    // await user.save(); // ? было это, подумать

    // ^ new Обновление полей пользователя
    Object.assign(user, updatedData);
    await user.save();

    const plainUser = user.get();
    delete plainUser.password;
    console.log('plainUser from profile.api.router', plainUser);

    res.json({ user: plainUser, profilePhoto: user.profilePhoto });
  } catch (error) {
    console.error('Ошибка в обновление пользователя:', error);
    return res
      .status(500)
      .json({ message: 'Server Error with updating profile' });
  }
});
// 5. Просмотр заказов пользователя
// * Роут для доступа к спискам заказов и статусам
router.get('/orders/:userId', async (req, res) => {
  try {
    const orders = await Basket.findAll({
      where: { UserId: req.params.userId },
    });
    console.log('✅orders from /orders/:userId', orders);
    res.json(orders);
  } catch (error) {
    console.error('Ошибка при получении заказов:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// 5. Просмотр заказов пользователя
// Роут для получения деталей заказа:
router.get('/order-details/:orderId', async (req, res) => {
  // console.log('✅ЗАШЛИ');
  const orderId = req.params.orderId;

  try {
    console.log('✅Получение деталей заказа для orderId:', req.params.orderId);
     const orderDetail = await Order.findByPk(orderId, {
      include: [
        {
          model: Transaction,
          as: 'transactions',
          include: [
            { model: Product, as: 'product' },
            { model: Basket, as: 'basket' },
          ],
        },
      ],
    });
    console.log(JSON.stringify(orderDetail, null, 2));
res.json(orderDetail)
  } catch (error) {
    console.error('Ошибка при получении деталей заказа:', error);
    res.status(500).json({ error: 'Не удалось получить детали заказа' });
  }
});

// ^ Роут для получения истории покупок пользователя
router.get('/purchase-history/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const transactions = await Transaction.findAll({
      where: { UserId: userId },
    });
    // console.log('✅ FROM /achievements/ =======transactions ', transactions);

    const ordersCount = transactions.length;
    const totalSpent = transactions.reduce((total, transaction) => {
      return total + transaction.quantity * transaction.currentPrice;
    }, 0);
    // console.log('✅ FROM /achievements/ =======ordersCount', ordersCount);
    // console.log('✅ FROM /achievements/ =======totalSpent', totalSpent);

    res.json({
      ordersCount,
      totalSpent, // это общая сумма покупок

    });
  } catch (error) {
    console.error('Ошибка при получении истории покупок пользователя:', error);
    res.status(500).json({
      message: 'Ошибка сервера при получении истории покупок пользователя',
    });
  }
});
router.get('/achievements/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // console.log('✅ FROM /achievements/ =======userId', userId);

    const transactions = await Transaction.findAll({
      where: { UserId: userId },
    });

    // подсчет количество заказов и общую сумму покупок
    const ordersCount = transactions.length;
    const totalSpent = transactions.reduce((total, transaction) => {
      return total + transaction.quantity * transaction.currentPrice;
    }, 0);
    // console.log('✅ FROM /achievements/ =======ordersCount', ordersCount);
    // console.log('✅ FROM /achievements/ =======totalSpent', totalSpent);

    const reviewsCount = 0;

    res.json({
      ordersCount,
      totalSpent, // это общая сумма покупок
      reviewsCount,
      // localProductsPurchased: localProductsPurchasedCount > 0,
    });
  } catch (error) {
    console.error('Ошибка при получении достижений пользователя:', error);
    res.status(500).json({
      message: 'Ошибка сервера при получении достижений пользователя',
    });
  }
});

module.exports = router;
