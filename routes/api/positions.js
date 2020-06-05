const router = require('express').Router();

const Position = require('../../models/Positions');
const verifyToken = require('../../utils/verifyToken');

// Get all position
router.route('/getAll').post((req, res) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  verifyToken(token)
    .then(() => {
      const { userId } = req.body;
      Position.find({ userId: userId })
        .then((position) => {
          return res.json(position);
        })
        .catch((err) => {
          return res.status(400).json('Error: ' + err);
        });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

// Add new position
router.route('/add').post((req, res) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  verifyToken(token)
    .then(() => {
      const { userId, description, position, rate } = req.body;
      let errorMessage = '';

      // User validation
      if (!position || !description || !rate) {
        errorMessage = 'Please enter all fields';
        return res.status(400).json(errorMessage);
      }

      // Save if passed validation
      Position.findOne({ userId: userId, position: position }).then((positions) => {
        if (positions) {
          errorMessage = `Position ${position} already exist`;
          return res.status(400).json(errorMessage);
        } else {
          const newPosition = new Position({
            userId,
            position,
            description,
            rate,
          });

          newPosition
            .save()
            .then((positions) => {
              return res.json({ msg: `Position ${position} created successful!`, positions });
            })
            .catch((err) => {
              console.log(err);
              errorMessage = 'This position could not be updated at the moment. Please try again.';
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
      const { position, description, rate, _id } = req.body;
      let errorMessage = '';

      // Description validation
      if (!description || !rate) {
        errorMessage = 'Please enter all fields';
        return res.status(400).json(errorMessage);
      }

      // Update if passed validation
      Position.findByIdAndUpdate({ _id: _id }, { $set: { description: description, rate: rate } }, { new: true }, (err, doc) => {
        if (err) {
          errorMessage = 'This position could not be updated at the moment. Please try again.';
          return res.status(400).json(errorMessage);
        } else {
          Position.findOne({ _id: _id })
            .then((positions) => {
              return res.json({ msg: `Position ${position} update successful!`, position: positions });
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
