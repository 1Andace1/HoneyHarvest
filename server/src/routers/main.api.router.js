const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares/verifyToken");
const { Book } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
