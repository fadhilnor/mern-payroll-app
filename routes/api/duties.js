const router = require('express').Router();

const Duty = require('../../models/Duties');
const verifyToken = require('../../utils/verifyToken');

// Get all duty
router.route('/getAll').post((req, res) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  verifyToken(token)
    .then(() => {
      const { userId } = req.body;
      Duty.find({ userId: userId })
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
      const { userId, description, duty, rate } = req.body;
      let errorMessage = '';

      // User validation
      if (!duty || !description || !rate) {
        errorMessage = 'Please enter all fields';
        return res.status(400).json(errorMessage);
      }

      // Save if passed validation
      Duty.findOne({ userId: userId, duty: duty }).then((duties) => {
        if (duties) {
          errorMessage = `Duty ${duty} already exist`;
          return res.status(400).json(errorMessage);
        } else {
          const newDuty = new Duty({
            userId,
            duty,
            description,
            rate,
          });

          newDuty
            .save()
            .then((duties) => {
              return res.json({ msg: `Duty ${duty} created successful!`, duties });
            })
            .catch((err) => {
              console.log(err);
              errorMessage = 'This duty could not be updated at the moment. Please try again.';
              return res.status(400).json(errorMessage);
            });
        }
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

// Update position description
router.route('/update').post((req, res) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  verifyToken(token)
    .then(() => {
      const { duty, description, rate, _id } = req.body;
      let errorMessage = '';

      // Description validation
      if (!description || !rate) {
        errorMessage = 'Please enter all fields';
        return res.status(400).json(errorMessage);
      }

      // Update if passed validation
      Duty.findByIdAndUpdate({ _id: _id }, { $set: { description: description, rate: rate } }, { new: true }, (err, doc) => {
        if (err) {
          errorMessage = 'This duty could not be updated at the moment. Please try again.';
          return res.status(400).json(errorMessage);
        } else {
          Duty.findOne({ _id: _id })
            .then((duties) => {
              return res.json({ msg: `Duty ${duty} update successful!`, duties });
            })
            .catch((err) => {
              return res.status(400).json(err);
            });
        }
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

module.exports = router;
