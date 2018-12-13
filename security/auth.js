const jwt = require('jsonwebtoken');
const config = require('../config/config');

function isAuthenticated(req, res, next) {
  console.log("JWT: ", req.headers.cookie);
  if (!req.headers.cookie) {
    res.status(401).send("Not Authorized");
    return;
  }

  jwt.verify(req.headers.cookie, config.security.jwtSecret, (err, decoded) => {
    if (err) {
      res.clearCookie('jwt');
      res.status(401).send("Authentication error");
      return;
    }
    console.log("DECODED: ", decoded);
    next();
  })
};

module.exports = isAuthenticated;