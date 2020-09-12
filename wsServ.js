const WebSocket = require('ws');
const port = require('config').get('server:wsPort');

const init = async () => {
  const ws = new WebSocket.Server({ port });

  ws.on('connection', (socket) => {
    console.log('connect opened!');

    socket.on('message', (message) => {
      console.log('WS: ', message);
    });

    setTimeout(() => {
      socket.send('привет, я сервак!');
    });
  });

  return ws;
};

module.exports = {
  init,
};
