/* eslint-disable max-len */
//! --- 3 ---
const { User, Message } = require('../../db/models');

//* структура данных для всех подключенных пользователей чата, тк установили флаг clientTracking: false
const map = new Map();

const connectionCb = (socket, request, userFromJWT) => {
  map.set(userFromJWT.id, { ws: socket, user: userFromJWT });

  map.forEach(({ ws }) => {
    ws.send(
      JSON.stringify({
        type: 'SET_USERS_FROM_SERVER',
        payload: [...map.values()].map(({ user }) => user),
      })
    );
  });

  socket.on('error', (err) => {
    console.log(err);
  });

  socket.on('message', async (data) => {
    const { type, payload } = JSON.parse(data);

    switch (type) {
      case 'ADD_MESSAGE_FROM_CLIENT':
        {
          const newMessage = await Message.create({
            text: payload,
            authorId: userFromJWT.id,
          });
          const messageWithUser = await Message.findByPk(newMessage.id, {
            include: { model: User, attributes: ['username', 'id'] },
          });

          map.forEach(({ ws }) => {
            ws.send(
              JSON.stringify({
                type: 'ADD_MESSAGE_FROM_SERVER',
                payload: messageWithUser,
              })
            );
          });
        }
        break;

      case 'CLIENT_TYPING':
        map.forEach(({ ws }) => {
          ws.send(
            JSON.stringify({
              type: 'CLIENT_TYPING_FROM_SERVER',
              payload: userFromJWT,
            })
          );
        });
        break;

      case 'CLIENT_STOP_TYPING':
        map.forEach(({ ws }) => {
          ws.send(
            JSON.stringify({
              type: 'TYPING_FROM_SERVER_STOP',
            })
          );
        });
        break;

      default:
        break;
    }
  });

  socket.on('close', () => {
    map.delete(userFromJWT.id);
    map.forEach(({ ws }) => {
      ws.send(
        JSON.stringify({
          type: 'SET_USERS_FROM_SERVER',
          payload: [...map.values()].map(({ user }) => user),
        })
      );
    });
  });
};

module.exports = connectionCb;

//! Идём в клиент и пишем хук useChat
