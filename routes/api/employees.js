const router = require('express').Router();

const Employee = require('../../models/Employees');
const verifyToken = require('../../utils/verifyToken');

// Get all employee
router.route('/getAll').post((req, res) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  verifyToken(token)
    .then(() => {
      const { userId } = req.body;
      Employee.find({ userId: userId })
        .then((employee) => {
          return res.json(employee);
        })
        .catch((err) => {
          return res.status(400).json('Error: ' + err);
        });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

// Add new employee
router.route('/add').post((req, res) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  verifyToken(token)
    .then(() => {
      const { userId, firstName, lastName, position } = req.body;
      let errorMessage = '';

      // Employee validation
      if (!firstName || !lastName || !position) {
        errorMessage = 'Please enter all fields';
        return res.status(400).json(errorMessage);
      }

      // Save if passed validation
      const newEmployee = new Employee({
        userId,
        firstName,
        lastName,
        position,
      });

      newEmployee
        .save()
        .then((employees) => {
          return res.json({ msg: `Employee ${firstName} ${lastName} created successful!`, employees });
        })
        .catch((err) => {
          errorMessage = 'This employee could not be updated at the moment. Please try again.';
          return res.status(400).json(errorMessage);
        });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

// Update employee info
router.route('/update').post((req, res) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  verifyToken(token)
    .then(() => {
      const { firstName, lastName, position, _id } = req.body;
      let errorMessage = '';

      // Employee validation
      if (!firstName || !lastName || !position) {
        errorMessage = 'Please enter all fields';
        return res.status(400).json(errorMessage);
      }

      // Update if passed validation
      Employee.findByIdAndUpdate(
        { _id: _id },
        { $set: { firstName: firstName, lastName: lastName, position: position } },
        { new: true },
        (err, doc) => {
          if (err) {
            errorMessage = 'This employee could not be updated at the moment. Please try again.';
            return res.status(400).json(errorMessage);
          } else {
            Employee.findOne({ _id: _id })
              .then((employees) => {
                return res.json({ msg: `Employee ${firstName} ${lastName} update successful!`, employee: employees });
              })
              .catch((err) => {
                return res.status(400).json(err);
              });
          }
        }
      );
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

module.exports = router;
