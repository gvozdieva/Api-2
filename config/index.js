// благодаря этому файлу работают конфиги. Не надо его менять, чтобыпоменять конфиги.
const nconf = require('nconf');
const path = require('path');
const fs = require('fs-extra');

// ранее переменные окружения (process.env) были чатью конфига, раскоментируйте ниже если хотите снова включить это
// nconf.env();

// найдем все файлы в папке конфигов, кроме этого(кроме index.js)
const configFiles = fs.readdirSync(__dirname).filter((file) => {
  if (path.extname(file) !== '.js' || path.basename(file) === 'index.js') {
    return false;
  }

  return true;
});

// построим полный путь к файлу и добавим в конфиг
configFiles.forEach((filename) => {
  // построим полный путь
  const configName = path.basename(filename, '.js');
  const filepath = path.resolve(__dirname, filename);
  const store = require(filepath);

  // добавим в конфиг
  nconf.add(configName, {
    type: 'literal',
    store,
  });
});

module.exports = nconf;
