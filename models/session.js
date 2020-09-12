const path = require('path');
const mongoose = require('mongoose');

require('models/user');

const { Schema } = mongoose;

const generalSchema = new Schema({ // Схема
  uid: {
    type: Schema.Types.Object,
    ref: 'user',
  },
  data: {
    type: Schema.Types.Mixed,
  },
}, { timestamps: true }); // Настройки схемы, в данном случае добавить поле createdAt, updatedAt (когда создали документ, когда обновили документ)


const modelname = path.basename(__filename, '.js'); // Название модели совпадает с названием файла модели. Тут мы получаем имя файла без расширения .js
const model = mongoose.model(modelname, generalSchema); // собственно создаем модель
module.exports = model;
