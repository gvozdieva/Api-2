const JwtModel = require('models/jwt');
const jwt = require('jsonwebtoken');
// const fs = require('fs');

const header = {
    "alg": "HS256",
    "typ": "JWT"
};

const payload = {
    "sub": "3210", 
    "name": "Karl Kek",
};

const token = jwt.sign( header, payload, 'kek' );

module.exports.getList = getList;
module.exports.create = create;
module.exports.token = token; 