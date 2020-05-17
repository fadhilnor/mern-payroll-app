const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Position = mongoose.model('Position', UserSchema);

module.exports = Position;
