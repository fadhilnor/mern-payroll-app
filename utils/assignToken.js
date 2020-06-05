const jwt = require('jsonwebtoken');

module.exports = assignToken = (user, isDemoUser) => {
  return new Promise((resolve, reject) => {
    // Create JWT Payload
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      isDemoUser,
    };

    // Create token
    jwt.sign(
      payload,
      process.env.JWTkeys || require('../config/keys').secretOrKey,
      {
        expiresIn: 31556926, // 1 year in seconds
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};
