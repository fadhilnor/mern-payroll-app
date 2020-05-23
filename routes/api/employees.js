const router = require('express').Router();

const Employee = require('../../models/Employees');
const verifyToken = require('../../utils/verifyToken');

// Get all employee
router.route('/getAll').post((req, res) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  verifyToken(token)
    .then(() => {
      Employee.find()
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
      const { firstName, lastName, position } = req.body;
      let errorMessage = '';

      // User validation
      if (!firstName || !lastName || !position) {
        errorMessage = 'Please enter all fields';
        return res.status(400).json(errorMessage);
      }

      // Save if passed validation
      const newEmployee = new Employee({
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

module.exports = router;