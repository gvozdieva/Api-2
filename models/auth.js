const path = require('path');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const generalSchema = new Schema({ // Схема
  strategy: {
    type: Schema.Types.String,
    default: 'local',
  },
  data: {
    // если авторизация local
    // type: Schema.Types.Mixed,
    // token: { type: Schema.Types.String },
    // password: { type: Schema.Types.String },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },

}, { timestamps: true }); // Настройки схемы, в данном случае добавить поле createdAt, updatedAt (когда создали документ, когда обновили документ)


const modelname = path.basename(__filename, '.js'); // Название модели совпадает с названием файла модели. Тут мы получаем имя файла без расширения .js
const model = mongoose.model(modelname, generalSchema); // собственно создаем модель
module.exports = model;
