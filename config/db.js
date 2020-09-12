// конфигурация базы данных
module.exports = {
  db: {
    uri: 'mongodb://localhost:27017/articleTest',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
