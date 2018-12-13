const jwt = require('jsonwebtoken');
const config = require('../config/config').security;

let token = jwt.sign(
  {
    role: 'developer'
  },
  config.jwtSecret
);

console.log("JSON WEB TOKEN: ", token);