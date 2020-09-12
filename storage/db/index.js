const mongoose = require('mongoose');

// Прагины
const toClientPlugin = require('./plugin/toClient');
mongoose.plugin(toClientPlugin);

const db = mongoose.connection;

module.exports = db;
