const router = require('express').Router();

const Payroll = require('../../models/Payrolls');
const verifyToken = require('../../utils/verifyToken');

// Get all payroll
router.route('/getAll').post((req, res) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  verifyToken(token)
    .then(() => {
      Payroll.find()
        .then((payroll) => {
          return res.json(payroll);
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
