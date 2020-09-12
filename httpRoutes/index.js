const express = require('express');

const router = express.Router();
// const articleController = require('controllers/article');
const uniqid = require('uniqid');

const sessionModel = require('models/session');

const sessionStore = {};

router.get('/', async (req, res, next) => {
  if (!req.cookies.sid) {
    const model = new sessionModel();
    const doc = model.save();
    // const sid = uniqid();

    // sessionStore[sid] = {};
    // sessionStore[sid].name = 'Valera';
    const sid = doc.id;
    res.cookie('sid', sid);
  }

  const { sid } = req.cookies;

  const user = sessionStore[sid];
  console.log(user);

  res.render('index');
});


module.exports = router;
