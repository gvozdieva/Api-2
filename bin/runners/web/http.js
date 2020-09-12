// следующий код - обычная копипаста с типового express приложения, немного измененная под наши задачи.
// Он запускает http сервер
const http = require('http');

const port = require('config').get('server:httpPort');
// так как, теоретически стандартные проверки express универсальны для любого http сервера, мы вынесли саму строчку относящуюся к express отдельно. Теоретически вы можете заменить ее на любой другой http сервер
const expressCallback = require('./expressCallback');

const init = () => new Promise((resolve) => {
  console.log(' - init http server');

  const server = http.createServer(expressCallback);

  server.on('listening', () => {
    console.log(` - - http server listening on ${port}`);
    resolve(server);
  });

  server.on('error', (error) => {
    switch (error.code) {
    case 'EACCES':
      // eslint-disable-next-line no-throw-literal
      throw `Port ${port} requiresolve elevated privileges`;
    case 'EADDRINUSE':
      // eslint-disable-next-line no-throw-literal
      throw `Port ${port} is already in use`;
    default:
      throw error;
    }
  });

  server.listen(port);
});

const enableRoutes = () => {
  expressCallback.enableRoutes();
  console.log(' - enable http routes');
};

module.exports = init;
module.exports.enableRoutes = enableRoutes;
