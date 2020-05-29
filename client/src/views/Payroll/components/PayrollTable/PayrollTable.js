import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';

const PayrollTable = (props) => {
  const { payroll } = props;
  let [payrolls, setPayrolls] = useState(payroll);

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
      { title: 'Last Name', field: 'LastName', hidden: true },
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

  return (
    <MaterialTable
      title=""
      columns={state.columns}
      data={payrolls}
      options={{
        headerStyle: { backgroundColor: '#5c6bc0', color: 'white' },
      }}
    />
  );
};

PayrollTable.propTypes = {
  payroll: PropTypes.array,
};

export default PayrollTable;
