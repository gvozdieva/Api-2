// Найтройки веб сервера

// Normalize a port into a number, string, or false.
const normalizePort = (val) => {
  if (typeof val === 'undefined') {
    return false;
  }

  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    throw new Error(`Port ${val} incorect`);
  }

  if (port >= 0) {
    // port number
    return port;
  }

  throw new Error(`Port ${val} incorect`);
};

// если порт передали в process.env.PORT - нормализируй и используй, иначе порт по умолчанию
const httpPort = normalizePort(process.env.PORT) || 8000;
const wsPort = normalizePort(process.env.WS_PORT) || 8080;

if (httpPort === wsPort) {
  console.log('\x1b[41m\x1b[30m Порт WS и HTTP серверов не должны совпадать! \x1b[0m');

  throw new Error('failed run config');
};

module.exports = {
  server: {
    httpPort,
    wsPort,
  },
};
