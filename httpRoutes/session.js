const express = require('express');

const router = express.Router();
const articleController = require('controllers/article');
const uniqid = require('uniqid');

const sessionStore = {}; 

router.get('/', (req, res, next) => {
  // const sid = uniqid();
  // console.log(sid);
  if( !req.cookies.sid ) {
    const sid = uniqid();
    sessionStore[sid] = {};
    sessionStore[sid].name = 'Valera';

    res.cookie('sid', sid);
  }

  const { sid } = req.cookies; 

  const user = sessionStore[sid];
  console.log(user);

  res.render('index');
});


module.exports = router;
