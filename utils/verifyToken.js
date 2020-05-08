const jwt = require('jsonwebtoken');

module.exports = verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    if (!token) reject('Token is not valid');

    // Remove Bearer from string
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    } else {
      reject('Token is not valid');
    }

    // Verify token
    if (token) {
      jwt.verify(token, process.env.JWTkeys || require('../config/keys').secretOrKey, (err, decoded) => {
        if (err) {
          reject('Token is not valid');
        } else {
          resolve(decoded);
        }
      });
    }
  });
};
