const multer = require('multer');
const path = require('path');

// настройка хранения файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products');
  },
  filename: (req, file, cb) => {
    // cb(null, `${Date.now()}-${file.originalname}`);
    console.log('file------------>', file)
    console.log('file.originalname------------>', file.originalname)
    // cb(null, file.originalname);
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload; 