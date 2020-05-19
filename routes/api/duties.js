const router = require('express').Router();

const Duty = require('../../models/Duties');
const verifyToken = require('../../utils/verifyToken');

// Get all duty
router.route('/getAll').post((req, res) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  verifyToken(token)
    .then(() => {
      Duty.find()
        .then((duty) => {
          return res.json(duty);
        })
        .catch((err) => {
          return res.status(400).json('Error: ' + err);
        });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

// Add new duty
router.route('/add').post((req, res) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  verifyToken(token)
    .then(() => {
      const { description, duty } = req.body;
      let errorMessage = '';

      // User validation
      if (!duty || !description) {
        errorMessage = 'Please enter all fields';
        return res.status(400).json(errorMessage);
      }

      // Save if passed validation
      Duty.findOne({ duty: duty }).then((duties) => {
        if (duties) {
          errorMessage = `duty ${duty} already exist`;
          return res.status(400).json(errorMessage);
        } else {
          const newDuty = new Duty({
            duty,
            description,
          });

          newDuty
            .save()
            .then((duties) => {
              return res.json({ msg: `duty ${duty} created successful!`, duties });
            })
            .catch((err) => {
              console.log(err);
              errorMessage = 'Duty could not be updated at the moment. Please try again.';
              return res.status(400).json(errorMessage);
            });
        }
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

module.exports = router;
