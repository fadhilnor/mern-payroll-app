const mongoose = require('mongoose');

const PayrollEmployeeSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    payId: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    empId: {
      type: String,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    duty: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PayrollEmployee = mongoose.model('PayrollEmployee', PayrollEmployeeSchema);

module.exports = PayrollEmployee;
