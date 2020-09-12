const path = require('path');
const createError = require('http-errors');
const helmet = require('helmet');
const logger = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const sassMiddleware = require('node-sass-middleware');

// Роуты
const indexRouter = require('httpRoutes/index');
const articleRouter = require('httpRoutes/article');
const authRouter = require('httpRoutes/auth');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(sassMiddleware({
  src: path.join(__dirname, 'pablic'),
  dest: path.join(__dirname, 'pablic'),
  indentedSyntax: false, // false = .scss and true = .sass
  sourceMp: true,
}));


// это специальный мидл вейр, который выключает роуты. Используеться раннером чтобы роуты не стали доступны раньше времени.
let isRoutesEnabled = false;
app.use((req, res, next) => {
  if (isRoutesEnabled) {
    next();
    return;
  }

  next(createError(503)); // код 503 это "сервис временно недоступен", другими словами - сервер живой, но занят чем-то другим, постучите позже.
});

// Routes prefix
app.use('/', indexRouter);
app.use('/article', articleRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler. Don`t remove 'next' attribute
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500);
  res.end();
});

// Включатель роутов
const enableRoutes = () => {
  if (isRoutesEnabled === true) {
    console.log('Routes already enabled');
    return;
  }

  isRoutesEnabled = true;
};

module.exports = app;
module.exports.enableRoutes = enableRoutes;
