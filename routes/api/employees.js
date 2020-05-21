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

module.exports = router;
