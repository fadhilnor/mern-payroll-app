const router = require('express').Router();

const Payroll = require('../../models/Payrolls');
const Employee = require('../../models/Employees');
const PayrollEmployee = require('../../models/PayrollEmployee');
const verifyToken = require('../../utils/verifyToken');

// Get all payroll
router.route('/getAll').post((req, res) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  verifyToken(token)
    .then(() => {
      Payroll.find()
        .sort({ payId: -1 })
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

// Add new payroll
router.route('/add').post((req, res) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  verifyToken(token)
    .then(() => {
      const { empId, month } = req.body;
      let errorMessage = '';

      // User validation
      if (!empId || !month) {
        errorMessage = 'Please enter all fields';
        return res.status(400).json(errorMessage);
      }

      // Check if payroll already exist for employee
      Payroll.findOne({ empId: empId, month: month }).then((payrolls) => {
        if (payrolls) {
          errorMessage = `Payroll for the month already exist`;
          return res.status(400).json(errorMessage);
        } else {
          // Get employee info
          Employee.findOne({ empId: empId })
            .then((employee) => {
              if (employee) {
                const newPayroll = new Payroll({
                  empId,
                  month,
                  firstName: employee.firstName,
                  lastName: employee.lastName,
                });

                // Save new payroll
                newPayroll
                  .save()
                  .then((payrolls) => {
                    // Save employee payroll
                    const daysInMonth = getDaysInMonth(month.substring(0, 1), month.substring(month.length - 4));
                    const newPayrollEmployee = Array(daysInMonth)
                      .fill()
                      .map((v, i) => ({
                        day: ++i,
                        payId: payrolls.payId,
                        empId: empId,
                        duty: 'None',
                        amount: 0,
                      }));

                    PayrollEmployee.insertMany(newPayrollEmployee)
                      .then((empPayroll) => {
                        return res.json({
                          msg: `Payroll for ${newPayroll.firstName} ${newPayroll.lastName} created successful!`,
                          payrolls,
                        });
                      })
                      .catch((err) => {
                        errorMessage = 'This payroll could not be created at the moment. Please try again.';
                        return res.status(400).json(errorMessage);
                      });
                  })
                  .catch((err) => {
                    errorMessage = 'This payroll could not be created at the moment. Please try again.';
                    return res.status(400).json(errorMessage);
                  });
              } else {
                errorMessage = 'This payroll could not be created at the moment. Please try again.';
                return res.status(400).json(errorMessage);
              }
            })
            .catch((err) => {
              errorMessage = 'This payroll could not be created at the moment. Please try again.';
              return res.status(400).json(errorMessage);
            });
        }
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

module.exports = router;
