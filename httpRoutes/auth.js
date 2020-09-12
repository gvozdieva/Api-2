const express = require('express');
const multer = require('multer');
const uid = require('uid');
const router = express.Router();

console.log('uidFirst:', uid());

const upload = multer();

const authCtrl = require('controllers/auth');

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/check', (req, res, next) => {
  const { uid } =  req.session;

  if (uid) {
    res.send(`Залогинен! id: ${uid}`);
  } else {
    req.send('Гость');
  }
});

router.post('/login', upload.none(), async (req, res, next) => {
  const { login, pwd } = req.body;
  const { login: loginUser } = authCtrl;
  const result = await loginUser(login, pwd);
  console.log(result);

  console.log('uid:', result.uid);
  if (result.status === 'ok') {
    res.session.uid = result.uid;
  }

  res.json(result);
});

module.exports = router;
