const jwt = require('jsonwebtoken');

module.exports = assignToken = (user, isDemoUser) => {
  return new Promise((resolve, reject) => {
    // Create JWT Payload
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      isDemoUser,
      avatar: isDemoUser ? process.env.demoAvatar || require('../config/keys').demoAvatar : user.avatar || '',
    };

    // Create token
    jwt.sign(
      payload,
      process.env.JWTkeys || require('../config/keys').secretOrKey,
      {
        expiresIn: isDemoUser ? 3600 : 31556926, // 1 hour and 1 year in seconds respectively
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
