const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../db/models");
// const { verifyAccessToken } = require("../middlewares/verifyToken");

const multer = require("multer");

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storageConfig });

// роут-эндпойнт для обновления профиля пользователя
// ? из ручки был удален verifyAccessToken
router.put("/users/:id", upload.single("profilePhoto"), async (req, res) => {
  const { username, email, password } = req.body;
  const profilePhoto = req.file;

  if (!(username && email)) {
    return res
      .status(400)
      .json({ message: "Введение имени и почты обязательно" });
  }

  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const updatedData = {
      username,
      email,
    };

    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    if (profilePhoto) {
      user.profilePhoto = `/${profilePhoto.filename}`; // ! для загрузки фото тут должен быть полностью прямой путь папка-статичная-> и название фото и все!
      await user.save();
    }

    //! надо перезаписать все юзера и потом сделать было save!
    user.username = updatedData.username;
    user.password = updatedData.password;
    user.email = updatedData.email;
    await user.save();

    const plainUser = user.get();
    delete plainUser.password;

    res.json({ user: plainUser, profilePhoto: user.profilePhoto });
  } catch (error) {
    console.error("Ошибка в обновление пользователя:", error);
    return res
      .status(500)
      .json({ message: "Server Error with updating profile" });
  }
});

module.exports = router;
