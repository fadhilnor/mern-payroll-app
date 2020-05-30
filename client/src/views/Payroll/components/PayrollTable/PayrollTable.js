import React, { useEffect, useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import PropTypes from 'prop-types';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Button, InputLabel, Select, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

const PayrollTable = (props) => {
  const { payroll, employee } = props;
  let [payrolls, setPayrolls] = useState(payroll);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    empId: '',
    month: new Date(),
  });

  useEffect(() => {
    setPayrolls(payroll);
  }, [payroll]);

  const state = {
    columns: [
      { title: 'Id', field: '_id', hidden: true },
      { title: 'Payroll Id', field: 'payId', width: 60 },
      {
        title: 'Month',
        field: 'month',
        width: 60,
        render: (rowData) => rowData && rowData.month && <p>{new Date(rowData.month).toDateString()}</p>,
        customSort: (a, b) => {
          var a1 = new Date(a.month).getTime();
          var b1 = new Date(b.month).getTime();
          if (a1 < b1) return 1;
          else if (a1 > b1) return -1;
          else return 0;
        },
      },
      { title: 'Employee Id', field: 'empId', width: 60 },
      { title: 'First Name', field: 'firstName', hidden: true },
      { title: 'Last Name', field: 'lastName', hidden: true },
      {
        title: 'Name',
        field: 'name',
        width: 150,
        render: (rowData) =>
          rowData && rowData.firstName && rowData.lastName && <p>{rowData.firstName + ' ' + rowData.lastName}</p>,
      },
      {
        title: 'Last updated',
        field: 'updatedAt',
        width: 40,
        editable: 'never',
        render: (rowData) => rowData && rowData.updatedAt && <p>{new Date(rowData.updatedAt).toDateString()}</p>,
        customSort: (a, b) => {
          var a1 = new Date(a.updatedAt).getTime();
          var b1 = new Date(b.updatedAt).getTime();
          if (a1 < b1) return 1;
          else if (a1 > b1) return -1;
          else return 0;
        },
      },
    ],
  };

  const handleAddNew = () => {
    console.log(values);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (date) => {
    setValues({
      ...values,
      month: date,
    });
  };

  return (
    <MaterialTable
      title=""
      columns={state.columns}
      data={payrolls}
      options={{
        headerStyle: { backgroundColor: '#5c6bc0', color: 'white' },
      }}
      components={{
        Toolbar: (props) => (
          <div>
            <MTableToolbar {...props} />
            <div style={{ padding: '10px 10px' }}>
              <Button color="primary" variant="outlined" onClick={handleOpen}>
                Add new payroll
              </Button>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add New Payroll</DialogTitle>
                <DialogContent>
                  <InputLabel id="empIdLabel">Employee Name</InputLabel>
                  <Select native label="Name" name="empId" value={values.empId} onLoad={handleChange} onChange={handleChange}>
                    <option></option>
                    {employee.map((e, key) => (
                      <option value={e.empId} key={key}>
                        {e.firstName} {e.lastName} ({e.empId})
                      </option>
                    ))}
                  </Select>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <InputLabel id="monthLabel">Payroll Month</InputLabel>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MMMM yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      value={values.month}
                      onChange={handleDateChange}
                    />
                  </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleAddNew} color="primary" disabled={!values.empId}>
                    Add
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        ),
      }}
    />
  );
};

PayrollTable.propTypes = {
  payroll: PropTypes.array,
};

export default PayrollTable;
