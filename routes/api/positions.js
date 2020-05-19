const router = require('express').Router();

const Position = require('../../models/Positions');
const verifyToken = require('../../utils/verifyToken');

// Get all position
router.route('/getAll').post((req, res) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  verifyToken(token)
    .then(() => {
      Position.find()
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
      const { description, position } = req.body;
      let errorMessage = '';

      // User validation
      if (!position || !description) {
        errorMessage = 'Please enter all fields';
        return res.status(400).json(errorMessage);
      }

      // Save if passed validation
      Position.findOne({ position: position }).then((positions) => {
        if (positions) {
          errorMessage = `Position ${position} already exist`;
          return res.status(400).json(errorMessage);
        } else {
          const newPosition = new Position({
            position,
            description,
          });

          newPosition
            .save()
            .then((positions) => {
              return res.json({ msg: `Position ${position} created successful!`, positions });
            })
            .catch((err) => {
              console.log(err);
              errorMessage = 'Position could not be updated at the moment. Please try again.';
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
      const { description, _id } = req.body;
      let errorMessage = '';

      // Description validation
      if (!description) {
        errorMessage = 'Please enter the description';
        return res.status(400).json(errorMessage);
      }

      // Update if passed validation
      Position.findByIdAndUpdate({ _id: _id }, { $set: { description: description } }, { new: true }, (err, doc) => {
        if (err) {
          errorMessage = 'Description could not be updated at the moment. Please try again.';
          return res.status(400).json(errorMessage);
        } else {
          Position.findOne({ _id: _id })
            .then((position) => {
              return res.json({ msg: 'Description update successful!', position });
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
