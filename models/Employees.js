const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema(
  {
    empId: {
      type: Number,
      default: 1000,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
