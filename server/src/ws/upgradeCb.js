//! === 2 === websocket server
const cookieParser = require('cookie-parser');
const { WebSocketServer } = require('ws');
const jwt = require('jsonwebtoken');

require('dotenv').config();

//! WSS
//* clientTracking: false - сами отслеживаем клиентов
//* noServer: true - отдельный порт не нужен (будет на том же, что и сервер)

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

const upgradeCb = (request, socket, head) => {
  socket.on('error', (err) => console.log(err));

  cookieParser()(request, {}, () => {
    try {
      const token = request.cookies.refreshToken;

      const { user } = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

      //* убираем слушатель ошибки, тк мы в блоке try И соединение установлено
      socket.removeListener('error', () => {});

      wss.handleUpgrade(request, socket, head, (ws) => {
        //* испускаем событие 'connection' и прокидываем юзера
        //* теперь в server.js прослушивается событие 'connection'
        wss.emit('connection', ws, request, user);
      });
    } catch (error) {
      console.log(error);
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
    }
  });
};

module.exports = { upgradeCb, wss };
