const path = require('path');
const mongoose = require('mongoose');

require('models/user');

const { Schema } = mongoose;

const generalSchema = new Schema({ // Схема
  title: {
    type: Schema.Types.String,
    default: '',
    minLength: 0,
    maxLength: 255,
  },
  content: {
    type: Schema.Types.String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
}, { timestamps: true }); // Настройки схемы, в данном случае добавить поле createdAt, updatedAt (когда создали документ, когда обновили документ)


const modelname = path.basename(__filename, '.js'); // Название модели совпадает с названием файла модели. Тут мы получаем имя файла без расширения .js
const model = mongoose.model(modelname, generalSchema); // собственно создаем модель
module.exports = model;
