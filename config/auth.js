// Параметры аутификации (логин,регистрация и прочее). Тут храняться пути к ключам шифрования, апикеи различных сервисов авторизации (fb, vk, google....) и прочие настройки относящиеся к аутификации.
const path = require('path');

const env = process.env.NODE_ENV;

// получаем полные пути к папке с ключами доступа.
const getKeyDir = () => {
  // По умолчанию, для тестов, в сервисе авторизации лежат дев ключи
  const devKeysDir = path.resolve(__dirname, '../../Auth/keys');
  // Но отдельным енвейроментом KEYS_DIR можно установить другую папку
  const envKeysDir = process.env.KEYS_DIR;

  // Конфиги будут напоминать что вы используете небезопасные дев ключи для тестов
  if (env === 'development' && !envKeysDir) {
    console.log('\x1b[43m\x1b[30m You use unsafe security keys for development \x1b[0m');
    return devKeysDir;
  }

  // И сильно напоминать, если и в режиме продакшена вы все еще будете использовать дев ключи для тестов
  if (!envKeysDir) {
    console.log('\x1b[41m\x1b[30m You use unsafe security keys for development in production! \x1b[0m');
    return devKeysDir;
  }

  return envKeysDir;
};

const keysDir = getKeyDir();

// Шарим в конфиге тот ключь который нужен.
// Если это ключи для JWT, то вам скорее всего нужен только публичный ключь.
const pubKeyPath = path.resolve(keysDir, 'private.key');

module.exports = {
  auth: {
    keys: {
      pub: pubKeyPath,
    },
    strategies: {
      local: { saltRounds: 2 },
    },
  },
};
