const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    duty: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Duty = mongoose.model('Duty', UserSchema);

module.exports = Duty;
