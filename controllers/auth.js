const config = require('config');
const bcrypt = require('bcrypt');


// const userModel = require('models/user');
const authModel = require('models/auth');

/* userModel.create({
    name: 'Ваня'
}) */

const hashPwd = async (pwd) => {
  const saltRounds = config.get('auth:strategies:local:saltRounds');
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(pwd, salt);
};

const run = async () => {
  const password = await hashPwd('123');
  /* console.log('password', password);

  authModel.create({ // Схема
    strategy: 'local',
    data: {
      token: 'kek',
      password,
    },
    user: '5ee39f880fe38b8a4c7a48d4',
  }); */

// ObjectId('5ee39f880fe38b8a4c7a48d4');
};

/* const password = hashPwd('123');
console.log(password); */

// run();


const login = async (login, pwd) => {
/*   const query1 = {
    strategy: 'local',
    'data.login': login,
  }; */

  console.log(login);

  const query = {
    strategy: 'local',
    'data.token': login,
  };

  const userAuth = await authModel.findOne(query);
  if (!userAuth) {
    console.log('no_user');
    return { status: 'no_user' };
  }
  console.log('userAuth', userAuth);

  const { password: hashedPwd } = userAuth.data;
  console.log('hashedPwd:', hashedPwd, ',', 'pwd:', pwd);
  const match = await bcrypt.compare(pwd, hashedPwd);
  console.log(match);

  if (!match) {
    console.log('bad password');
    return { status: 'bad_password' };
  }

  const uid = userAuth.id;
  return { status: 'ok', uid };
};

const logout = () => {

};

module.exports = {
  login,
  logout,
};
