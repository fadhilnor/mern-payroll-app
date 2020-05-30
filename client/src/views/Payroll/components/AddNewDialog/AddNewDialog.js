import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  InputLabel,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 40,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const AddNewDialog = (props) => {
  const classes = useStyles();
  const { open, onHandleClose, employee } = props;
  const [values, setValues] = useState({
    empId: '',
    month: new Date(),
  });

  const handleClose = () => {
    onHandleClose(false);
  };

  const handleEmployeeChange = (event) => {
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

  const handleAddNew = () => {
    console.log(values);
    onHandleClose(false);
  };

  return (
    <div>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title">
        <DialogTitle className={classes.title}>Add New Payroll</DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <InputLabel>Employee Name</InputLabel>
              <Select
                autoFocus
                value={values.empId}
                onChange={handleEmployeeChange}
                inputProps={{
                  name: 'empId',
                  id: 'empId',
                }}
              >
                {employee.map((e, key) => (
                  <MenuItem value={e.empId} key={key}>
                    {e.firstName} {e.lastName} ({e.empId})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              className={classes.formControlLabel}
              control={
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    format="MMMM yyyy"
                    margin="normal"
                    id="date-picker-dialog"
                    value={values.month}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              }
            />
          </form>
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
  );
};

export default AddNewDialog;