const httpServer = require('./http');
const wsServer = require('./ws');
// Этот модуль - ранер для веб сервера. 
// Он запускает http сервер на express и ws сервер на socket.io

const init = async () => {
  console.log('Init web servers');
  // запускаем http сервер, но не включаем роуты
  const server = await httpServer();
  // запускаем ws сервер. Закоментируйте следующую стройчку, если вам не нужен ws сервер
  await wsServer(server);
  // Включаем http роуты.
  httpServer.enableRoutes();
};

module.exports = init;
