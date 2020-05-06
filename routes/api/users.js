const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let User = require('../../models/Users');
const assignToken = require('../../utils/assignToken');

// Get all user
router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
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
                // Assign token to new user
                assignToken(user)
                  .then((token) => {
                    return res.json({
                      success: true,
                      token: 'Bearer ' + token,
                    });
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
  const { email, password } = req.body;
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
        assignToken(user)
          .then((token) => {
            return res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          })
          .catch((err) => res.status(400).json({ error: err }));
      });
    })(req, res, next);
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
