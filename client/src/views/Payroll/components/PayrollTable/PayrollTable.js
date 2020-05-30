import React, { useEffect, useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import { AddNewDialog } from '../../components';

const PayrollTable = (props) => {
  const { payroll, employee } = props;
  let [payrolls, setPayrolls] = useState(payroll);
  const [open, setOpen] = useState(false);

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              <AddNewDialog open={open} onHandleClose={handleClose} employee={employee} />
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
