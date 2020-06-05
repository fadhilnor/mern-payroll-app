const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const EmployeeSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
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

EmployeeSchema.plugin(AutoIncrement, { inc_field: 'empId', start_seq: 1000 });
const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
