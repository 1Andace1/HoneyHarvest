require("dotenv").config();
const cors = require("cors");
const apiRouter = require("./routers/api.router");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { removeHeader } = require('./middlewares/common');
const http = require('http');
const express = require("express");
const { wss, upgradeCb } = require('./ws/upgradeCb');
const connectionCb = require('./ws/connectionCb');
const app = express();
const { PORT } = process.env;

// const corsConfig = {
//   origin: ["http://localhost:5173"],
//   credentials: true,
// };

// ^ обновленный corsConfig для возможности загружать фото
const corsConfig = {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
const server = http.createServer(app);
server.on('upgrade', upgradeCb);
wss.on('connection', connectionCb);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsConfig));
app.use(removeHeader)

app.use(express.static('uploads')); // ! для загрузки фото и малтера, важно подключать через статичную папку

app.use("/api/v1", apiRouter);

// ^ меняю на отправку страницы с ошибкой 404 с фронта
// app.use("*", (req, res) => {
//   res.redirect("/");
// });
// app.use((req, res) => {
//   res.status(404).json({ message: "Страница не найдена" });
// });

server.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT} port`);
});

