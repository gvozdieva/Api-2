// модуль запускает WS сервер
const { init } = require('wsServ');

const port = require('config').get('server:wsPort');

module.exports = async (server) => {
  await init(server);
  console.log(` - - ws server listening on ${port}`);
};
