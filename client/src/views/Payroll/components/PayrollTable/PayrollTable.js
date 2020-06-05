import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MaterialTable, { MTableToolbar } from 'material-table';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button } from '@material-ui/core';

import { AddNewDialog } from '../../components';
import { getPayrollEmployees } from '../../../../services/payrollEmployeeServices';

const PayrollTable = (props) => {
  const { payroll, employee, user, onHandleToggle } = props;
  const dispatch = useDispatch();
  let [payrolls, setPayrolls] = useState(payroll);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setPayrolls(payroll);
  }, [payroll]);

  const state = {
    columns: [
      { title: 'Id', field: '_id', hidden: true },
      {
        title: 'Payroll Id',
        field: 'payId',
        width: 30,
        render: (rowData) => (
          <a href={rowData.payId} onClick={handleClick(rowData.payId, rowData.empId)}>
            {rowData.payId}
          </a>
        ),
      },
      {
        title: 'Month',
        field: 'month',
        width: 40,
        render: (rowData) =>
          rowData &&
          rowData.month && (
            <p>
              {moment(
                new Date(rowData.month.substring(rowData.month.length - 4) + '-' + rowData.month.substring(0, 1) + '-1')
              ).format('MMMM yyyy')}
            </p>
          ),
        customSort: (a, b) => {
          var a1 = new Date(a.month.substring(a.month.length - 4) + '-' + a.month.substring(0, 1) + '-1').getTime();
          var b1 = new Date(b.month.substring(b.month.length - 4) + '-' + b.month.substring(0, 1) + '-1').getTime();
          if (a1 < b1) return 1;
          else if (a1 > b1) return -1;
          else return 0;
        },
      },
      { title: 'Employee Id', field: 'empId', width: 30 },
      { title: 'First Name', field: 'firstName', width: 30 },
      { title: 'Last Name', field: 'lastName', width: 30 },
      {
        title: 'Created On',
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

  const handleClick = (payId, empId) => (e) => {
    e.preventDefault();
    const newPayroll = {
      payId,
      empId,
    };
    dispatch(getPayrollEmployees(newPayroll));
    onHandleToggle();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSetPayrolls = (data) => {
    setPayrolls([data, ...payrolls]);
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
              <AddNewDialog
                open={open}
                onHandleClose={handleClose}
                onHandleSetPayrolls={handleSetPayrolls}
                employee={employee}
                user={user}
              />
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
