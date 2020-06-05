const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let User = require('../../models/Users');
const Duty = require('../../models/Duties');
const assignToken = require('../../utils/assignToken');
const verifyToken = require('../../utils/verifyToken');

// Get all user
router.route('/').get((req, res) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  verifyToken(token)
    .then(() => {
      User.find()
        .then((users) => {
          return res.json(users);
        })
        .catch((err) => {
          return res.status(400).json('Error: ' + err);
        });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

// Register new user
router.route('/register').post((req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  let errors = [];

  // User validation
  if (!name || !email || !password || !passwordConfirm) {
    errors.push({ msg: 'Please enter all fields' });
  }

  // Password validation
  if (password !== passwordConfirm) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 5) {
    errors.push({ msg: 'Passwords must be at least 5 characters' });
  }

  // Save if passed validation
  if (errors.length > 0) {
    errors.forEach((error) => {
      console.log('Errors found: ' + error.msg);
    });
    res.status(400).json({ error: errors });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        console.log('Errors: ' + errors[0].msg);
        res.status(400).json({ error: errors });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              console.log('Error: ' + err);
              errors.push({ msg: 'Something went wrong. Please try again' });
              res.status(400).json({ error: errors });
            }
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                // Add default duty
                const newDuty = new Duty({
                  userId: user.userId,
                  duty: 'None',
                  description: 'None',
                  rate: 0,
                });

                newDuty
                  .save()
                  .then((duty) => {
                    // Assign token to new user
                    assignToken(user, false)
                      .then((token) => {
                        return res.json({
                          success: true,
                          token: 'Bearer ' + token,
                          user,
                        });
                      })
                      .catch((err) => res.status(400).json({ error: err }));
                  })
                  .catch((err) => res.status(400).json({ error: err }));
              })
              .catch((err) => res.status(400).json({ error: err }));
          });
        });
      }
    });
  }
});

// Login
router.route('/login').post((req, res, next) => {
  req.body.email = req.body.isDemoUser ? process.env.demoEmail || require('../../config/keys').demoEmail : req.body.email;
  req.body.password = req.body.isDemoUser
    ? process.env.demoPassword || require('../../config/keys').demoPassword
    : req.body.password;
  const { email, password, isDemoUser } = req.body;
  let errors = [];

  // User validation
  if (!email || !password) {
    errors.push({ msg: 'Please enter all fields' });
  }

  // Passport validation
  if (errors.length > 0) {
    return res.status(400).json({ error: errors });
  } else {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        errors.push({ msg: err });
        return res.status(400).json({ error: errors });
      }
      if (!user) {
        errors.push({ msg: 'Incorrect email or password' });
        return res.status(400).json({ error: errors });
      }
      req.logIn(user, function (err) {
        if (err) {
          errors.push({ msg: err });
          return res.status(400).json({ error: errors });
        }
        // Assign token to user
        assignToken(user, isDemoUser)
          .then((token) => {
            return res.json({
              success: true,
              token: 'Bearer ' + token,
              user,
            });
          })
          .catch((err) => res.status(400).json({ error: err }));
      });
    })(req, res, next);
  }
});

// Update user password
router.route('/updatePassword').post((req, res) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  verifyToken(token)
    .then(() => {
      const { email, password, passwordConfirm } = req.body;
      let errorMessage = '';

      // Passwords validation
      if (!password || !passwordConfirm) {
        errorMessage = 'Please enter all fields';
        return res.status(400).json(errorMessage);
      }
      if (password !== passwordConfirm) {
        errorMessage = 'Passwords do not match';
        return res.status(400).json(errorMessage);
      }
      if (password.length < 5) {
        errorMessage = 'Passwords must be at least 5 characters';
        return res.status(400).json(errorMessage);
      }

      // Update user
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            errorMessage = 'Something went wrong. Please try again';
            return res.status(400).json(errorMessage);
          }
          const newPassword = hash;
          User.findOneAndUpdate({ email: email }, { $set: { password: newPassword } }, { new: true }, (err, doc) => {
            if (err) {
              errorMessage = 'Password could not be updated at the moment. Please try again.';
              return res.status(400).json(errorMessage);
            } else {
              return res.json('Password update successful!');
            }
          });
        });
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

module.exports = router;
