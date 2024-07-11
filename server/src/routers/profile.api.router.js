const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Basket, Transaction, Product } = require('../../db/models');
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
  const { username, email, password } = req.body;
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
    };

    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    if (profilePhoto) {
      // user.profilePhoto = `/${profilePhoto.filename}`; // ! для загрузки фото тут должен быть полностью прямой путь папка-статичная-> и название фото и все!
      // await user.save();
      photoPath = profilePhoto.path; // ^ new
    }

    //! надо перезаписать все юзера и потом сделать было save!
    user.username = updatedData.username;
    user.password = updatedData.password;
    user.email = updatedData.email;
    await user.update(updatedData); // ^ new
    // await user.save(); // ? было это, подумать

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
// * Роут для допступа к спискам заказов и статусам
router.get('/orders/:userId', async (req, res) => {
  try {
    const orders = await Basket.findAll({
      where: { UserId: req.params.userId },
    });
    res.json(orders)
  } catch (error) {
    console.error("Ошибка при получении заказов:", error);
    res.status(500).json({message: 'Ошибка сервера'})
  }
});

// Роут для получения деталей заказа:
router.get('/profile/order-details/:orderId', async (req, res) => {
  try {
    const orderDetails = await Transaction.findAll({
      where: { basketId: req.params.orderId },
      include: [{ model: Product, attributes: ['title', 'picture'] }]
    });
    res.json(orderDetails);
  } catch (error) {
    res.status(500).json({ error: 'Не удалось получить детали заказа' });
  }
});

module.exports = router;
