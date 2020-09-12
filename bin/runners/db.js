// ранер отвечающий за коннект к бд
const mongoose = require('mongoose');
const db = require('storage/db');

// тянем настройки с конфига
const uri = require('config').get('db:uri');
const options = require('config').get('db:options');

// сам раннер
const init = () => new Promise((resolve, reject) => {
  mongoose.connect(uri, options);

  db.once('error', (err) => {
    reject(err);
  });

  db.once('open', () => {
    console.log('Connected to DB');

    resolve();
  });

  db.once('close', () => {
    console.log('Close connected to DB');
  });
});

module.exports = init;
